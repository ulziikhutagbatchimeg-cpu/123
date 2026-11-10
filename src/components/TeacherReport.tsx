import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ClipboardCopy, Printer } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp, COURSE_CHOICES, type CourseChoice } from '../context/AppContext';
import { courseChapters, courseTopics } from '../data/courseScope';
import { loadEnrollments, loadStudentSummaries, type Enrollment, type StudentSummary } from '../lib/cloud';
import { HARDEST_OPTIONS, LIKED_OPTIONS, loadSurveysOf, type SavedSurvey } from '../lib/sectionSurvey';
import { loadSelfRatingsOf, type CloudSelfRating } from '../lib/selfRatingCloud';
import { ITEMS as RATING_ITEMS } from './SelfRating';
import type { CourseSummary, Tally } from '../lib/resultSync';

// The teacher's work report for one programme (and one class, or all): who is enrolled and active, the lesson tickets, tests
// and questions done and how well, the time spent, each class and chapter, the weekly activity, how the students' own
// ratings moved, and the web survey. It is read live from the site's data. Names are hidden unless the teacher shows them,
// so the report can be shown to others. "Print / PDF" opens it alone in a new window; "Copy as text" copies a short summary.

const CARD = 'rounded-xl border border-slate-300 bg-white p-4 space-y-2 break-inside-avoid';
const HEAD = 'text-xs font-bold uppercase tracking-wider text-slate-600';
const TD = 'py-1.5 pr-3';

const pad = (n: number) => String(n).padStart(2, '0');
const dayKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const daysAgo = (n: number) => dayKey(new Date(Date.now() - n * 86400000));
const pctOf = (earned: number, max: number): number | null => (max > 0 ? Math.round((earned / max) * 100) : null);
const show = (v: number | null, unit = '%') => (v === null ? '—' : `${v}${unit}`);
const avg1 = (values: number[]): number | null => (values.length ? Math.round((values.reduce((n, v) => n + v, 0) / values.length) * 10) / 10 : null);
// An average weighted by how many results each student has
const weighted = (parts: { count: number; avg: number | null }[]): number | null => {
  const used = parts.filter(p => p.avg !== null && p.count > 0);
  const n = used.reduce((s, p) => s + p.count, 0);
  return n ? Math.round(used.reduce((s, p) => s + (p.avg as number) * p.count, 0) / n) : null;
};

interface Row {
  uid: string;
  name: string;
  grade: string;
  sum: CourseSummary | undefined;
  studySec: number;
  lastDay: string;
}

const emptyTally = (): Tally => ({ answered: 0, earned: 0, max: 0 });
const addTally = (a: Tally, b?: Tally): Tally => (b ? { answered: a.answered + b.answered, earned: a.earned + b.earned, max: a.max + b.max } : a);
const studyOf = (sum?: CourseSummary) => Object.values(sum?.study?.chapters ?? {}).reduce((n, s) => n + s, 0);

export const TeacherReport: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { courseChoice } = useApp();
  const [course, setCourse] = useState<CourseChoice>(courseChoice);
  const [cls, setCls] = useState<string>('all');
  const [names, setNames] = useState(false);
  const [copied, setCopied] = useState(false);
  const [enrolments, setEnrolments] = useState<Enrollment[] | null>(null);
  const [summaries, setSummaries] = useState<StudentSummary[]>([]);
  const [surveys, setSurveys] = useState<SavedSurvey[]>([]);
  const [ratings, setRatings] = useState<CloudSelfRating[]>([]);
  const [failed, setFailed] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    Promise.all([loadEnrollments(), loadStudentSummaries()])
      .then(([list, sums]) => {
        if (!alive) return;
        setEnrolments(list);
        setSummaries(sums);
        const uids = [...new Set(list.filter(e => e.status === 'approved' || e.status === 'suspended').map(e => e.uid))];
        return Promise.all([loadSurveysOf(uids).catch(() => []), loadSelfRatingsOf(uids).catch(() => [])]).then(([sv, rt]) => {
          if (!alive) return;
          setSurveys(sv);
          setRatings(rt);
        });
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  const label = COURSE_CHOICES.find(c => c.id === course)?.labelEn ?? course;
  const enrolled = useMemo(
    () => (enrolments ?? []).filter(e => e.programme === course && (e.status === 'approved' || e.status === 'suspended')),
    [enrolments, course]
  );
  const classes = useMemo(() => [...new Set(enrolled.map(e => e.grade ?? '—'))].sort(), [enrolled]);
  const waiting = (enrolments ?? []).filter(e => e.programme === course && e.status === 'requested').length;

  // One row per enrolled student of the class shown
  const rows: Row[] = useMemo(() => {
    const byUid = new Map(summaries.map(s => [s.uid, s]));
    return enrolled
      .filter(e => cls === 'all' || (e.grade ?? '—') === cls)
      .map(e => {
        const sum = byUid.get(e.uid)?.results?.[course];
        const days = Object.keys(sum?.daily ?? {}).sort();
        return { uid: e.uid, name: e.name, grade: e.grade ?? '—', sum, studySec: studyOf(sum), lastDay: days[days.length - 1] ?? '' };
      })
      .sort((a, b) => a.grade.localeCompare(b.grade) || a.name.localeCompare(b.name));
  }, [enrolled, summaries, course, cls]);
  const uidSet = useMemo(() => new Set(rows.map(r => r.uid)), [rows]);

  // The totals of a group of students
  const totals = (list: Row[]) => {
    const d7 = daysAgo(6), d30 = daysAgo(29);
    const q = list.reduce((t, r) => addTally(t, r.sum?.questions), emptyTally());
    return {
      students: list.length,
      active7: list.filter(r => r.lastDay >= d7).length,
      active30: list.filter(r => r.lastDay >= d30).length,
      lessons: list.reduce((n, r) => n + (r.sum?.lessons.count ?? 0), 0),
      lessonAvg: weighted(list.map(r => ({ count: r.sum?.lessons.count ?? 0, avg: r.sum?.lessons.avg ?? null }))),
      tests: list.reduce((n, r) => n + (r.sum?.tests.count ?? 0), 0),
      testAvg: weighted(list.map(r => ({ count: r.sum?.tests.count ?? 0, avg: r.sum?.tests.avg ?? null }))),
      games: list.reduce((n, r) => n + (r.sum?.games.count ?? 0), 0),
      questions: q.answered,
      accuracy: pctOf(q.earned, q.max),
      studySec: list.reduce((n, r) => n + r.studySec, 0)
    };
  };
  const all = totals(rows);
  const byClass = classes.filter(c => cls === 'all' || c === cls).map(c => ({ cls: c, t: totals(rows.filter(r => r.grade === c)) }));

  // Each chapter of the programme: questions answered and right, and the time spent on it
  const chapterRows = courseChapters(course).map(ch => {
    const c = ch as unknown as { id: string; number?: number | string; titleMn?: string; titleEn?: string };
    const t = rows.reduce((acc, r) => addTally(acc, r.sum?.chapters?.[c.id]), emptyTally());
    const sec = rows.reduce((n, r) => n + (r.sum?.study?.chapters?.[c.id] ?? 0), 0);
    return { id: c.id, title: `${c.number ?? ''}. ${(mn ? c.titleMn : c.titleEn) ?? c.id}`, t, sec };
  }).filter(r => r.t.answered > 0 || r.sec > 0);

  // The last eight weeks: lesson tickets, games and questions done, and the students active in each week
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const from = daysAgo(7 * (7 - i) + 6), to = daysAgo(7 * (7 - i));
    let acts = 0; let active = 0;
    rows.forEach(r => {
      let any = false;
      Object.entries(r.sum?.daily ?? {}).forEach(([day, d]) => {
        if (day >= from && day <= to) { acts += d.lessons + d.games + d.questions; any = true; }
      });
      if (any) active++;
    });
    return { label: to.slice(5), acts, active };
  });
  const maxActs = Math.max(1, ...weeks.map(w => w.acts));

  // The students' own ratings (1–5): the first and the latest of each student, item by item
  const ratingPairs = useMemo(() => {
    const mine = ratings.filter(r => r.courseId === course && uidSet.has(r.uid)).sort((a, b) => a.savedAt.localeCompare(b.savedAt));
    const first = new Map<string, CloudSelfRating>(), last = new Map<string, CloudSelfRating>();
    mine.forEach(r => { if (!first.has(r.uid)) first.set(r.uid, r); last.set(r.uid, r); });
    return { first: [...first.values()], last: [...last.values()], again: [...last.values()].filter(r => first.get(r.uid) !== r).length };
  }, [ratings, course, uidSet]);

  // The web survey after each section, for the programme's sections
  const topicIds = useMemo(() => new Set(courseTopics(course).map(t => t.id)), [course]);
  const sv = surveys.filter(s => topicIds.has(s.topicId) && uidSet.has(s.uid));
  const countOf = (opts: { id: string; en: string; mn: string }[], key: 'hardest' | 'liked') =>
    opts.map(o => ({ label: mn ? o.mn : o.en, n: sv.filter(s => s[key] === o.id).length })).filter(o => o.n > 0).sort((a, b) => b.n - a.n);

  const time = (s: number) => (s >= 3600 ? `${(s / 3600).toFixed(1)} ${mn ? 'цаг' : 'h'}` : `${Math.round(s / 60)} ${mn ? 'мин' : 'min'}`);
  const today = dayKey(new Date());
  const scope = cls === 'all' ? (mn ? 'Бүх анги' : 'All classes') : cls;
  const title = `${mn ? 'Ажлын тайлан' : 'Work report'} · ${label} · ${scope} · ${today}`;
  const studentName = (r: Row, i: number) => (names ? r.name : `${mn ? 'Сурагч' : 'Student'} ${i + 1}`);

  const firstAvg = avg1(ratingPairs.first.flatMap(r => RATING_ITEMS.map(it => r.ratings[it.id]).filter((v): v is number => typeof v === 'number')));
  const lastAvg = avg1(ratingPairs.last.flatMap(r => RATING_ITEMS.map(it => r.ratings[it.id]).filter((v): v is number => typeof v === 'number')));

  // The report alone in a new window, with the site's styles, ready to print or save as PDF
  const print = () => {
    const node = reportRef.current;
    const w = window.open('', '_blank');
    if (!node || !w) return;
    const styles = [...document.querySelectorAll('style')].map(s => s.outerHTML).join('') +
      [...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')].map(l => `<link rel="stylesheet" href="${l.href}">`).join('');
    w.document.write(`<!doctype html><html lang="${mn ? 'mn' : 'en'}"><head><meta charset="utf-8"><title>${title}</title>${styles}<style>@page{margin:14mm}body{background:#fff}</style></head><body class="bg-white p-6">${node.outerHTML}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
  };

  // A short summary as plain text, to paste into a letter or a report
  const copyText = async () => {
    const lines = [
      title,
      `${mn ? 'Элссэн сурагч' : 'Enrolled students'}: ${all.students} · ${mn ? 'сүүлийн 7 хоногт идэвхтэй' : 'active in the last 7 days'}: ${all.active7} · ${mn ? '30 хоногт' : '30 days'}: ${all.active30}`,
      `${mn ? 'Хичээлийн шалгалт' : 'Lesson tickets'}: ${all.lessons} · ${mn ? 'дундаж' : 'average'} ${show(all.lessonAvg)}`,
      `${mn ? 'Бүтэн тест' : 'Full tests'}: ${all.tests} · ${mn ? 'дундаж' : 'average'} ${show(all.testAvg)}`,
      `${mn ? 'Асуулт' : 'Questions'}: ${all.questions} · ${mn ? 'зөв' : 'right'} ${show(all.accuracy)}`,
      `${mn ? 'Суралцсан нийт хугацаа' : 'Total study time'}: ${time(all.studySec)}`,
      ...byClass.map(b => `${b.cls}: ${b.t.students} ${mn ? 'сурагч' : 'students'}, ${mn ? 'хичээлийн шалгалт' : 'lesson tickets'} ${b.t.lessons} (${show(b.t.lessonAvg)}), ${mn ? 'асуулт зөв' : 'questions right'} ${show(b.t.accuracy)}, ${time(b.t.studySec)}`),
      ratingPairs.last.length ? `${mn ? 'Өөрийн үнэлгээ (1–5)' : 'Self-rating (1–5)'}: ${mn ? 'эхэнд' : 'first'} ${firstAvg ?? '—'} → ${mn ? 'одоо' : 'latest'} ${lastAvg ?? '—'} (${ratingPairs.last.length} ${mn ? 'сурагч' : 'students'})` : '',
      sv.length ? `${mn ? 'Санал асуулга' : 'Survey'}: ${new Set(sv.map(s => s.uid)).size} ${mn ? 'сурагч' : 'students'}, ${mn ? 'ойлгосон' : 'understood'} ${avg1(sv.map(s => s.understood)) ?? '—'}/5, ${mn ? 'санал болгох' : 'would recommend'} ${avg1(sv.map(s => s.recommend)) ?? '—'}/5` : ''
    ].filter(Boolean);
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // The clipboard can be blocked; the report can still be printed
    }
  };

  const chip = (on: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${on ? 'bg-emerald-600 text-white border-emerald-600' : 'text-slate-700 border-slate-400 hover:bg-slate-200'}`;

  if (failed) return <p className="text-sm text-rose-700">{mn ? 'Тайлангийн өгөгдлийг ачаалж чадсангүй. Багшаар нэвтэрсэн эсэхээ шалгана уу.' : 'Could not load the report data. Check that you are signed in as the teacher.'}</p>;
  if (enrolments === null) return <p className="text-sm text-slate-600">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>;

  const tiles = [
    { k: mn ? 'Элссэн сурагч' : 'Enrolled', v: `${all.students}` },
    { k: mn ? '7 хоногт идэвхтэй' : 'Active, 7 days', v: `${all.active7}` },
    { k: mn ? '30 хоногт идэвхтэй' : 'Active, 30 days', v: `${all.active30}` },
    { k: mn ? 'Хичээлийн шалгалт' : 'Lesson tickets', v: `${all.lessons}`, s: `${mn ? 'дундаж' : 'avg'} ${show(all.lessonAvg)}` },
    { k: mn ? 'Бүтэн тест' : 'Full tests', v: `${all.tests}`, s: `${mn ? 'дундаж' : 'avg'} ${show(all.testAvg)}` },
    { k: mn ? 'Асуулт' : 'Questions', v: `${all.questions}`, s: `${mn ? 'зөв' : 'right'} ${show(all.accuracy)}` },
    { k: mn ? 'Тоглоом' : 'Games', v: `${all.games}` },
    { k: mn ? 'Суралцсан хугацаа' : 'Study time', v: time(all.studySec) }
  ];

  return (
    <div className="bg-slate-100 border border-slate-400 rounded-2xl p-6 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-slate-900">{mn ? 'Тайлан' : 'Report'}</h2>
        <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
          {mn
            ? 'Сурагчдын ажлын үр дүн, идэвх, өөрийн үнэлгээ, санал асуулгын дүн. Сайтын өгөгдлөөс шууд гарна. Бусдад үзүүлэхдээ нэрийг нуусан хэвээр нь хэвлэнэ үү.'
            : 'The students’ results, activity, self-ratings and survey, read live from the site. Keep the names hidden when you show it to others.'}
        </p>
      </div>

      {/* The controls stay out of the printed report */}
      <div className="flex flex-wrap items-center gap-2">
        {COURSE_CHOICES.map(c => (
          <button key={c.id} type="button" onClick={() => { setCourse(c.id); setCls('all'); }} aria-pressed={course === c.id} className={chip(course === c.id)}>
            {c.labelEn}
          </button>
        ))}
        <select value={cls} onChange={e => setCls(e.target.value)} className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-900 border border-slate-400" aria-label={mn ? 'Анги' : 'Class'}>
          <option value="all">{mn ? 'Бүх анги' : 'All classes'}</option>
          {classes.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <input type="checkbox" checked={names} onChange={e => setNames(e.target.checked)} />
          {mn ? 'Сурагчдын нэрийг харуулах' : 'Show student names'}
        </label>
        <button type="button" onClick={print} className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-600 text-white hover:bg-violet-500">
          <Printer className="h-3.5 w-3.5" aria-hidden="true" /> {mn ? 'Хэвлэх / PDF' : 'Print / PDF'}
        </button>
        <button type="button" onClick={copyText} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-400 text-slate-800 hover:bg-slate-200">
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <ClipboardCopy className="h-3.5 w-3.5" aria-hidden="true" />}
          {copied ? (mn ? 'Хуулсан' : 'Copied') : mn ? 'Текстээр хуулах' : 'Copy as text'}
        </button>
      </div>

      <div ref={reportRef} className="space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
          {waiting > 0 && <p className="text-xs text-slate-600">{mn ? `Хүлээгдэж буй элсэлтийн хүсэлт: ${waiting}` : `Enrolment requests waiting: ${waiting}`}</p>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {tiles.map(t => (
            <div key={t.k} className="rounded-xl border border-slate-300 bg-white p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t.k}</div>
              <div className="text-xl font-extrabold text-slate-900">{t.v}</div>
              {t.s && <div className="text-[11px] text-slate-600">{t.s}</div>}
            </div>
          ))}
        </div>

        {byClass.length > 0 && (
          <div className={CARD}>
            <div className={HEAD}>{mn ? 'Ангиар' : 'By class'}</div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className={TD}>{mn ? 'Анги' : 'Class'}</th><th className={TD}>{mn ? 'Сурагч' : 'Students'}</th>
                    <th className={TD}>{mn ? '30 хоногт идэвхтэй' : 'Active, 30 d'}</th><th className={TD}>{mn ? 'Хичээлийн шалгалт' : 'Lesson tickets'}</th>
                    <th className={TD}>{mn ? 'Дундаж' : 'Average'}</th><th className={TD}>{mn ? 'Тест дундаж' : 'Test avg'}</th>
                    <th className={TD}>{mn ? 'Асуулт зөв' : 'Questions right'}</th><th className={TD}>{mn ? 'Хугацаа' : 'Time'}</th>
                  </tr>
                </thead>
                <tbody>
                  {byClass.map(b => (
                    <tr key={b.cls} className="border-t border-slate-200 text-slate-800">
                      <td className={`${TD} font-bold`}>{b.cls}</td><td className={TD}>{b.t.students}</td><td className={TD}>{b.t.active30}</td>
                      <td className={TD}>{b.t.lessons}</td><td className={TD}>{show(b.t.lessonAvg)}</td><td className={TD}>{show(b.t.testAvg)}</td>
                      <td className={TD}>{show(b.t.accuracy)}</td><td className={TD}>{time(b.t.studySec)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className={CARD}>
          <div className={HEAD}>{mn ? 'Сүүлийн 8 долоо хоногийн идэвх' : 'Activity in the last 8 weeks'}</div>
          <div className="flex items-end gap-2 h-32">
            {weeks.map(w => (
              <div key={w.label} className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
                <span className="text-[10px] font-mono text-slate-700">{w.acts}</span>
                <div className="w-full rounded-t bg-emerald-500" style={{ height: `${(w.acts / maxActs) * 75}%`, minHeight: w.acts > 0 ? 3 : 0 }} />
                <span className="text-[10px] font-mono text-slate-500">{w.label}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-600">
            {mn ? 'Долоо хоног бүрт хийсэн хичээлийн шалгалт, тоглоом, асуултын тоо (огноо нь долоо хоногийн сүүлийн өдөр).' : 'Lesson tickets, games and questions done each week (the date is the week’s last day).'}
            {' '}{mn ? 'Идэвхтэй сурагч:' : 'Active students:'} {weeks.map(w => w.active).join(' · ')}
          </p>
        </div>

        {chapterRows.length > 0 && (
          <div className={CARD}>
            <div className={HEAD}>{mn ? 'Бүлгээр' : 'By chapter'}</div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className={TD}>{mn ? 'Бүлэг' : 'Chapter'}</th><th className={TD}>{mn ? 'Асуулт' : 'Questions'}</th>
                    <th className={TD}>{mn ? 'Зөв' : 'Right'}</th><th className={TD}>{mn ? 'Хугацаа' : 'Time'}</th>
                  </tr>
                </thead>
                <tbody>
                  {chapterRows.map(c => (
                    <tr key={c.id} className="border-t border-slate-200 text-slate-800">
                      <td className={TD}>{c.title}</td><td className={TD}>{c.t.answered}</td><td className={TD}>{show(pctOf(c.t.earned, c.t.max))}</td><td className={TD}>{time(c.sec)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {ratingPairs.last.length > 0 && (
          <div className={CARD}>
            <div className={HEAD}>{mn ? 'Сурагчдын өөрийн үнэлгээ (1–5): эхэнд ба одоо' : 'Students’ self-rating (1–5): first and latest'}</div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-slate-500"><th className={TD}>{mn ? 'Асуулт' : 'Question'}</th><th className={TD}>{mn ? 'Эхэнд' : 'First'}</th><th className={TD}>{mn ? 'Одоо' : 'Latest'}</th></tr>
              </thead>
              <tbody>
                {RATING_ITEMS.map(it => {
                  const f = avg1(ratingPairs.first.map(r => r.ratings[it.id]).filter((v): v is number => typeof v === 'number'));
                  const l = avg1(ratingPairs.last.map(r => r.ratings[it.id]).filter((v): v is number => typeof v === 'number'));
                  return (
                    <tr key={it.id} className="border-t border-slate-200 text-slate-800">
                      <td className={TD}>{mn ? it.mn : it.en}</td><td className={TD}>{f ?? '—'}</td>
                      <td className={`${TD} font-bold`}>{l ?? '—'}{f !== null && l !== null && l !== f ? ` (${l > f ? '+' : ''}${(l - f).toFixed(1)})` : ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-[11px] text-slate-600">
              {mn
                ? `${ratingPairs.last.length} сурагч үнэлсэн; ${ratingPairs.again} нь дахин үнэлсэн. Дундаж: эхэнд ${firstAvg ?? '—'} → одоо ${lastAvg ?? '—'}.`
                : `${ratingPairs.last.length} students rated themselves; ${ratingPairs.again} did again later. Average: first ${firstAvg ?? '—'} → latest ${lastAvg ?? '—'}.`}
            </p>
          </div>
        )}

        {sv.length > 0 && (
          <div className={CARD}>
            <div className={HEAD}>{mn ? 'Хэсэг бүрийн дараах санал асуулга' : 'The survey after each section'}</div>
            <p className="text-xs text-slate-800">
              {mn
                ? `${new Set(sv.map(s => s.uid)).size} сурагч, ${sv.length} хариулт. Ойлгосон ${avg1(sv.map(s => s.understood)) ?? '—'}/5 · өөрөө судлах ${avg1(sv.map(s => s.selfStudy)) ?? '—'}/5 · бусдад санал болгох ${avg1(sv.map(s => s.recommend)) ?? '—'}/5.`
                : `${new Set(sv.map(s => s.uid)).size} students, ${sv.length} answers. Understood ${avg1(sv.map(s => s.understood)) ?? '—'}/5 · self-study ${avg1(sv.map(s => s.selfStudy)) ?? '—'}/5 · would recommend ${avg1(sv.map(s => s.recommend)) ?? '—'}/5.`}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div>
                <div className="font-bold text-slate-700">{mn ? 'Хамгийн их таалагдсан' : 'Liked most'}</div>
                <ul className="mt-1 space-y-0.5 text-slate-800">{countOf(LIKED_OPTIONS, 'liked').map(o => <li key={o.label}>{o.label}: {o.n}</li>)}</ul>
              </div>
              <div>
                <div className="font-bold text-slate-700">{mn ? 'Хамгийн хүндэвтэр' : 'Hardest'}</div>
                <ul className="mt-1 space-y-0.5 text-slate-800">{countOf(HARDEST_OPTIONS, 'hardest').map(o => <li key={o.label}>{o.label}: {o.n}</li>)}</ul>
              </div>
            </div>
          </div>
        )}

        {rows.length > 0 && (
          <div className={CARD}>
            <div className={HEAD}>{mn ? 'Сурагч бүрээр' : 'By student'}{!names && (mn ? ' (нэр нуусан)' : ' (names hidden)')}</div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className={TD}>{mn ? 'Сурагч' : 'Student'}</th><th className={TD}>{mn ? 'Анги' : 'Class'}</th>
                    <th className={TD}>{mn ? 'Хичээлийн шалгалт' : 'Lesson tickets'}</th><th className={TD}>{mn ? 'Тест' : 'Tests'}</th>
                    <th className={TD}>{mn ? 'Асуулт зөв' : 'Questions right'}</th><th className={TD}>{mn ? 'Хугацаа' : 'Time'}</th><th className={TD}>{mn ? 'Сүүлд' : 'Last active'}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.uid} className="border-t border-slate-200 text-slate-800">
                      <td className={TD}>{studentName(r, i)}</td><td className={TD}>{r.grade}</td>
                      <td className={TD}>{r.sum?.lessons.count ?? 0} · {show(r.sum?.lessons.avg ?? null)}</td>
                      <td className={TD}>{r.sum?.tests.count ?? 0} · {show(r.sum?.tests.avg ?? null)}</td>
                      <td className={TD}>{show(r.sum ? pctOf(r.sum.questions.earned, r.sum.questions.max) : null)}</td>
                      <td className={TD}>{time(r.studySec)}</td><td className={`${TD} font-mono`}>{r.lastDay || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
