import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import {
  REPORT_KEY,
  ChapterCount,
  Level,
  StudentReport,
  downloadText,
  statementRates,
  chapterCounts,
  statementsAt,
  studentStats
} from '../data/progressReport';
import { Download, Trash2, User } from 'lucide-react';
import { isTeacher, loadEnrollments, loadStudentReports, signInTeacher, signOutUser, subscribeStudentReports, useAuthUser } from '../lib/cloud';
import { classTone } from '../lib/classTone';
import { TeacherSurveys } from './TeacherSurveys';
import { useApp } from '../context/AppContext';
import { isFirebaseConfigured } from '../lib/firebase';

const readReports = (): StudentReport[] => {
  try {
    const raw = localStorage.getItem(REPORT_KEY);
    return raw ? (JSON.parse(raw) as StudentReport[]) : [];
  } catch {
    return [];
  }
};

const writeReports = (list: StudentReport[]) => {
  try {
    localStorage.setItem(REPORT_KEY, JSON.stringify(list));
  } catch {
    // Storage can be blocked; the reports then last only until the page is closed
  }
};

// One report per student: by account when the report came from Firebase, else by name (an imported file). The newest
// replaces older ones. Keying by account keeps two students apart even when both still have the placeholder name.
const mergeReports = (current: StudentReport[], incoming: StudentReport[]): StudentReport[] => {
  const byKey = new Map<string, StudentReport>();
  const keyOf = (r: StudentReport) => (r.uid ? `uid:${r.uid}` : `name:${r.name}`);
  [...current, ...incoming].forEach(r => {
    const prev = byKey.get(keyOf(r));
    if (!prev || r.date >= prev.date) byKey.set(keyOf(r), r);
  });
  return [...byKey.values()].sort((a, b) => a.name.localeCompare(b.name));
};

const pctOf = (c: ChapterCount): number | null => (c.total ? Math.round((c.done / c.total) * 100) : null);

const STALE_DAYS = 7;

// A report older than STALE_DAYS, or with no date, may no longer match the student's ticks
const isStale = (iso: string) => !iso || Date.now() - new Date(iso).getTime() > STALE_DAYS * 86400000;

const toneBar = (pct: number) => (pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500');

const toneCell = (pct: number | null) => {
  if (pct === null) return 'bg-slate-100 text-slate-500';
  if (pct >= 75) return 'bg-emerald-600/70 text-white';
  if (pct >= 50) return 'bg-amber-500/60 text-slate-900';
  return 'bg-rose-600/60 text-white';
};

const segment = (active: boolean) =>
  `px-3 py-1.5 rounded-md font-bold transition-colors ${
    active ? 'bg-purple-600 text-white' : 'text-slate-600 hover:text-slate-900'
  }`;

const csvCell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

// One row per student, 1 or 0 for each statement at this level. The BOM lets Excel read Mongolian names.
const classCsv = (reports: StudentReport[], level: Level): string => {
  const rows = statementsAt(level);
  const header = ['Student', 'Overall %', ...rows.map(s => s.id)];
  const lines = reports.map(r => {
    const st = studentStats(r, level);
    return [r.name, st.pct, ...rows.map(s => (r.checks[s.id] ? 1 : 0))].map(csvCell).join(',');
  });
  return '﻿' + [header.map(csvCell).join(','), ...lines].join('\n');
};

const chapterLabel = (ch: { number: number; titleEn: string; titleMn: string }, mn: boolean) =>
  `${ch.number}. ${mn ? ch.titleMn : ch.titleEn}`;

const StatCard: React.FC<{ label: string; value: string; sub?: string; tone: string }> = ({ label, value, sub, tone }) => (
  <div className="p-5 rounded-xl bg-slate-200 border border-slate-400">
    <span className="text-xs font-mono text-slate-600 block mb-1">{label}</span>
    <span className={`text-2xl font-bold font-mono ${tone}`}>{value}</span>
    {sub && <span className="text-[11px] text-slate-500 block mt-1">{sub}</span>}
  </div>
);

const Bar: React.FC<{ pct: number | null }> = ({ pct }) => (
  <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
    <div
      className={`h-full transition-all duration-300 ${pct === null ? '' : toneBar(pct)}`}
      style={{ width: `${pct ?? 0}%` }}
    />
  </div>
);

export const TeacherProgress: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  // Every loaded report, and the class tab picked: only the students of that class are shown
  const [allReports, setAllReports] = useState<StudentReport[]>(readReports);
  const [classPick, setClassPick] = useState<string>('all');
  // Each student's class, from the enrolment of the programme on screen, by account id
  const [grades, setGrades] = useState<Record<string, string>>({});
  const { courseChoice } = useApp();
  const reports = useMemo(
    () => allReports.filter(r => classPick === 'all' || (r.uid ? grades[r.uid] : undefined) === classPick),
    [allReports, classPick, grades]
  );
  const [view, setView] = useState<'student' | 'class' | 'chapter' | 'survey'>('class');
  // The chapter the chapter view shows: every student's ticks for its statements
  const [chapterNo, setChapterNo] = useState<number>(CURRICULUM_CHAPTERS[0]?.number ?? 1);
  const [level, setLevel] = useState<Level>('extended');
  const [selected, setSelected] = useState<string>('');

  const save = (next: StudentReport[]) => {
    setAllReports(next);
    writeReports(next);
  };

  const removeStudent = (name: string) => save(allReports.filter(r => r.name !== name));

  const { user, ready } = useAuthUser();
  const [cloudNotice, setCloudNotice] = useState<string | null>(null);

  // Teacher only: pull every student's saved progress from Firebase into this view
  const loadFromCloud = async () => {
    try {
      const cloud = await loadStudentReports();
      save(mergeReports(allReports, cloud));
      setCloudNotice(mn ? `Firebase-аас ${cloud.length} сурагч ачаалагдлаа` : `Loaded ${cloud.length} student(s) from Firebase`);
    } catch {
      setCloudNotice(mn ? 'Firebase-аас ачаалж чадсангүй' : 'Could not load from Firebase');
    }
  };

  // Teacher only: every student's checklist, kept up to date, so a rating a student saves shows here at once
  // Each student is shown under the name from the enrolment form, which the student's own document may not have yet.
  useEffect(() => {
    if (!isTeacher(user)) return;
    let alive = true;
    let stop = () => {};
    loadEnrollments()
      .catch(() => [] as Awaited<ReturnType<typeof loadEnrollments>>)
      .then(list => {
        if (!alive) return;
        const names = new Map<string, string>();
        list.forEach(e => {
          if (e.uid && e.name && e.name !== 'Student') names.set(e.uid, e.name);
        });
        let first = true;
        stop = subscribeStudentReports(
          cloud => {
            const named = cloud.map(r => ({ ...r, name: (r.uid ? names.get(r.uid) : undefined) ?? r.name }));
            setAllReports(prev => {
              const next = mergeReports(prev, named);
              writeReports(next);
              return next;
            });
            if (first) {
              first = false;
              setCloudNotice(mn ? `Firebase-аас ${cloud.length} сурагч ачаалагдлаа` : `Loaded ${cloud.length} student(s) from Firebase`);
            }
          },
          () => setCloudNotice(mn ? 'Firebase-аас ачаалж чадсангүй' : 'Could not load from Firebase')
        );
      });
    return () => {
      alive = false;
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!isTeacher(user)) return;
    // The class of each student who is enrolled in the programme on screen
    loadEnrollments()
      .then(list => {
        const map: Record<string, string> = {};
        list.forEach(e => {
          if (e.programme === courseChoice && e.grade && (e.status === 'approved' || e.status === 'suspended')) map[e.uid] = e.grade;
        });
        setGrades(map);
      })
      .catch(() => setGrades({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, courseChoice]);

  const teacherSignIn = () => {
    signInTeacher().catch(() => setCloudNotice(mn ? 'Нэвтрэх цонх хаагдлаа' : 'Sign-in was cancelled'));
  };

  const clearAll = () => {
    if (window.confirm(mn ? 'Бүх тайланг устгах уу?' : 'Delete all loaded reports?')) save([]);
  };

  const current = reports.find(r => r.name === selected) ?? reports[0];
  const currentStats = current ? studentStats(current, level) : null;
  const doneChapters = currentStats
    ? Object.values(currentStats.byChapter).filter(c => c.total > 0 && c.done === c.total).length
    : 0;

  const perStudent = useMemo(() => reports.map(r => studentStats(r, level)), [reports, level]);
  const rates = useMemo(() => statementRates(reports, level), [reports, level]);

  const classAvg = perStudent.length
    ? Math.round(perStudent.reduce((sum, s) => sum + s.pct, 0) / perStudent.length)
    : 0;
  const fullCount = perStudent.filter(s => s.pct === 100).length;
  const chapterAverages = CURRICULUM_CHAPTERS.map(ch => {
    const pcts = perStudent.map(s => pctOf(s.byChapter[ch.number])).filter((p): p is number => p !== null);
    return { ch, avg: pcts.length ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : null };
  });

  const fmtDate = (iso: string) => (iso ? new Date(iso).toLocaleDateString(mn ? 'mn-MN' : 'en-GB') : '—');

  const exportCsv = () =>
    downloadText(`class-0620-${level}.csv`, classCsv(reports, level), 'text/csv;charset=utf-8');

  const emptyState = (
    <div className="bg-slate-200 border border-dashed border-slate-400 rounded-2xl p-8 text-sm text-slate-700 space-y-3">
      <p className="font-bold text-slate-900">
        {mn ? 'Одоохондоо тайлан ачаалагдаагүй байна' : 'No reports loaded yet'}
      </p>
      <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-600">
        <li>
          {mn
            ? 'Сурагч "Суралцахуйн зорилтууд" хэсэгт нэрээ оруулаад "Багшдаа тайлан хадгалах" дарна.'
            : 'The student types their name in the lesson checklist and clicks "Save report for teacher".'}
        </li>
        <li>
          {mn
            ? 'Нэг сурагч эсвэл бүх ангийн дүнг график, хүснэгтээр харна.'
            : 'View one student or the whole class as charts and tables.'}
        </li>
      </ol>
      <p className="text-[11px] text-slate-500">
        {mn
          ? 'Өгөгдөл зөвхөн таны браузерт хадгалагдана, ямар ч серверт илгээгдэхгүй.'
          : 'Data stays in this browser only. Nothing is sent to a server.'}
      </p>
    </div>
  );

  const studentView = current && currentStats && (
    <div className="bg-slate-100 border border-slate-400 rounded-2xl p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <User className="w-4 h-4 text-purple-700" />
        <select
          value={current.name}
          onChange={e => setSelected(e.target.value)}
          className="bg-slate-200 border border-slate-400 text-slate-900 rounded-lg px-3 py-1.5 text-sm"
        >
          {reports.map(r => (
            <option key={r.name} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
        <span className="text-[11px] font-mono text-slate-500">
          {mn ? 'Экспорт:' : 'Exported:'} {fmtDate(current.date)}
        </span>
        <button
          onClick={() => removeStudent(current.name)}
          className="ml-auto flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-700"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{mn ? 'Устгах' : 'Remove'}</span>
        </button>
      </div>

      {isStale(current.date) && (
        <p className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-500 rounded-lg px-3 py-2">
          {mn
            ? `Тайлан ${STALE_DAYS}-с дээш хоногийн өмнөх байна. Сурагчаас шинэ тайлан авна уу.`
            : `This report is older than ${STALE_DAYS} days. Ask the student for a new one.`}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label={mn ? 'Нийт явц' : 'Overall progress'}
          value={`${currentStats.pct}%`}
          sub={`${currentStats.done} / ${currentStats.total}`}
          tone="text-teal-700"
        />
        <StatCard
          label={mn ? 'Бүрэн бүлэг' : 'Chapters complete'}
          value={`${doneChapters} / ${CURRICULUM_CHAPTERS.length}`}
          tone="text-purple-700"
        />
        <StatCard
          label={mn ? 'Тэмдэглээгүй' : 'Not ticked yet'}
          value={`${currentStats.missing.length}`}
          sub={mn ? 'зорилт' : 'statements'}
          tone="text-amber-400"
        />
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{mn ? 'Бүлгээр' : 'By chapter'}</h4>
        {CURRICULUM_CHAPTERS.map(ch => {
          const c = currentStats.byChapter[ch.number];
          return (
            <div key={ch.id} className="flex items-center gap-3 text-xs">
              <span className="w-44 sm:w-64 truncate text-slate-700" title={chapterLabel(ch, mn)}>
                {chapterLabel(ch, mn)}
              </span>
              <Bar pct={pctOf(c)} />
              <span className="w-14 text-right font-mono text-slate-600">
                {c.done}/{c.total}
              </span>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          {mn ? 'Тэмдэглээгүй зорилтууд' : 'Statements not ticked yet'} ({currentStats.missing.length})
        </h4>
        {currentStats.missing.length === 0 && (
          <p className="text-xs text-emerald-700">
            {mn ? 'Энэ түвшний бүх зорилтыг тэмдэглэсэн байна.' : 'All statements at this level are ticked.'}
          </p>
        )}
        {CURRICULUM_CHAPTERS.map(ch => {
          const rows = currentStats.missing.filter(s => s.chapterNo === ch.number);
          if (rows.length === 0) return null;
          return (
            <div key={ch.id} className="space-y-1.5">
              <div className="text-[11px] font-mono text-slate-500">{chapterLabel(ch, mn)}</div>
              {rows.map(s => (
                <div
                  key={s.id}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-200 border border-slate-400 text-xs"
                >
                  <span className="font-mono text-[10px] text-teal-700 shrink-0 pt-0.5">{s.id}</span>
                  <span className="text-slate-700">{mn ? s.mn : s.en}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );

  const staleCount = reports.filter(r => isStale(r.date)).length;

  // The students shown (after the class tab), by account id, for the survey view and its names
  const shownUids = reports.flatMap(r => (r.uid ? [r.uid] : []));
  const shownNames: Record<string, string> = Object.fromEntries(reports.flatMap(r => (r.uid ? [[r.uid, r.name] as const] : [])));

  // One tab per class of the students loaded, as in the journal; All shows every class
  const classNames = [...new Set(allReports.map(r => (r.uid ? grades[r.uid] : undefined)).filter((g): g is string => !!g))].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
  const classTabs = classNames.length > 0 && (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 text-xs font-bold text-slate-600">{mn ? 'Анги' : 'Class'}</span>
      {classNames.map(g => {
        const tone = classTone(g);
        const on = classPick === g;
        const count = allReports.filter(r => r.uid && grades[r.uid] === g).length;
        return (
          <button
            key={g}
            type="button"
            onClick={() => setClassPick(g)}
            aria-pressed={on}
            className={`inline-flex items-center justify-center min-w-[3.5rem] px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
              on ? `${tone.head} ${tone.text} ${tone.bar}` : 'text-slate-700 border-slate-400 hover:bg-slate-300'
            }`}
          >
            {g} <span className="font-normal opacity-80">· {count}</span>
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => setClassPick('all')}
        aria-pressed={classPick === 'all'}
        className={`inline-flex items-center justify-center min-w-[3.5rem] px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
          classPick === 'all' ? 'bg-emerald-600 text-white border-emerald-500' : 'text-slate-700 border-slate-400 hover:bg-slate-300'
        }`}
      >
        {mn ? 'Бүгд' : 'All'}
      </button>
    </div>
  );

  // The chapter view: one chapter, with each statement and every student's tick for it, and the chapter's result per student
  const chapterInfo = CURRICULUM_CHAPTERS.find(c => c.number === chapterNo);
  const chapterStatements = statementsAt(level).filter(s => s.chapterNo === chapterNo);
  const chapterView = reports.length > 0 && (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-20 shrink-0 text-xs font-bold text-slate-600">{mn ? 'Бүлэг' : 'Chapter'}</span>
        {CURRICULUM_CHAPTERS.map(ch => {
          const on = ch.number === chapterNo;
          return (
            <button
              key={ch.number}
              type="button"
              onClick={() => setChapterNo(ch.number)}
              aria-pressed={on}
              className={`inline-flex items-center justify-center min-w-[3.5rem] px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                on ? 'bg-emerald-600 text-white border-emerald-500' : 'text-slate-700 border-slate-400 hover:bg-slate-300'
              }`}
            >
              {ch.number}
            </button>
          );
        })}
      </div>
      <div className="bg-slate-100 border border-slate-400 rounded-2xl p-6 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          {chapterInfo ? chapterLabel(chapterInfo, mn) : ''}
        </h4>
        {chapterStatements.length === 0 ? (
          <p className="text-xs text-slate-600">{mn ? 'Энэ түвшинд энэ бүлгийн зорилт байхгүй.' : 'No statements in this chapter at this level.'}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="text-xs border-separate border-spacing-1">
              <thead>
                <tr className="text-slate-600 font-mono">
                  <th className="sticky left-0 z-10 bg-slate-100 text-left font-normal pr-3 whitespace-nowrap">{mn ? 'Зорилт' : 'Statement'}</th>
                  {reports.map(r => (
                    <th key={r.name} className="font-normal text-center px-2 whitespace-nowrap">{r.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chapterStatements.map(s => (
                  <tr key={s.id}>
                    <td className="sticky left-0 z-10 bg-slate-100 pr-3 text-slate-700 whitespace-nowrap">
                      <span className="font-mono text-[10px] text-teal-700 mr-2">{s.id}</span>
                      {mn ? s.mn : s.en}
                    </td>
                    {reports.map(r => (
                      <td
                        key={r.name}
                        className={`text-center font-mono rounded px-2 py-1 ${
                          r.checks[s.id] ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {r.checks[s.id] ? '✓' : '—'}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="sticky left-0 z-10 bg-slate-100 pr-3 font-bold text-slate-900 whitespace-nowrap">
                    {mn ? 'Бүлгийн дүн' : 'Chapter result'}
                  </td>
                  {reports.map(r => {
                    const c = chapterCounts(r.checks, level)[chapterNo] ?? { done: 0, total: 0 };
                    const pct = c.total > 0 ? Math.round((c.done / c.total) * 100) : 0;
                    return (
                      <td key={r.name} className="text-center font-mono font-bold text-slate-900">
                        {c.done} / {c.total} · {pct}%
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const classView = reports.length > 0 && (
    <div className="space-y-4">
      {staleCount > 0 && (
        <p className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-500 rounded-lg px-3 py-2">
          {mn
            ? `${staleCount} сурагчийн тайлан ${STALE_DAYS}-с дээш хоногийн өмнөх байна.`
            : `${staleCount} student report(s) are older than ${STALE_DAYS} days.`}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label={mn ? 'Сурагчдын тоо' : 'Students'} value={`${reports.length}`} tone="text-indigo-700" />
        <StatCard label={mn ? 'Ангийн дундаж' : 'Class average'} value={`${classAvg}%`} tone="text-teal-700" />
        <StatCard
          label={mn ? 'Бүрэн (100%)' : 'Fully complete'}
          value={`${fullCount}`}
          sub={mn ? 'сурагч' : 'students'}
          tone="text-purple-700"
        />
      </div>

      <div className="bg-slate-100 border border-slate-400 rounded-2xl p-6 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          {mn ? 'Бүлгээр дундаж' : 'Average by chapter'}
        </h4>
        {chapterAverages.map(({ ch, avg }) => (
          <div key={ch.id} className="flex items-center gap-3 text-xs">
            <span className="w-44 sm:w-64 truncate text-slate-700" title={chapterLabel(ch, mn)}>
              {chapterLabel(ch, mn)}
            </span>
            <Bar pct={avg} />
            <span className="w-12 text-right font-mono text-slate-600">{avg === null ? '—' : `${avg}%`}</span>
          </div>
        ))}
      </div>

      <div className="bg-slate-100 border border-slate-400 rounded-2xl p-6 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          {mn ? 'Сурагч × бүлгийн хүснэгт' : 'Student × chapter table'}
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-separate border-spacing-1">
            <thead>
              <tr className="text-slate-600 font-mono">
                <th className="text-left font-normal pr-2 whitespace-nowrap">{mn ? 'Сурагч' : 'Student'}</th>
                {CURRICULUM_CHAPTERS.map(ch => (
                  <th key={ch.id} title={chapterLabel(ch, mn)} className="font-normal w-8 text-center">
                    {ch.number}
                  </th>
                ))}
                <th className="font-normal text-right pl-2">{mn ? 'Нийт' : 'Total'}</th>
                <th className="font-normal text-right pl-2">{mn ? 'Огноо' : 'Date'}</th>
              </tr>
            </thead>
            <tbody>
              {perStudent.map(s => (
                <tr key={s.name}>
                  <td className="pr-2 text-slate-800 whitespace-nowrap">{s.name}</td>
                  {CURRICULUM_CHAPTERS.map(ch => {
                    const pct = pctOf(s.byChapter[ch.number]);
                    return (
                      <td
                        key={ch.id}
                        title={`${s.name}: ${chapterLabel(ch, mn)} — ${pct === null ? '—' : `${pct}%`}`}
                        className={`rounded text-center font-mono py-1.5 ${toneCell(pct)}`}
                      >
                        {pct === null ? '—' : pct}
                      </td>
                    );
                  })}
                  <td className="pl-2 text-right font-mono font-bold text-slate-900">{s.pct}%</td>
                  <td
                    className={`pl-2 text-right font-mono whitespace-nowrap ${
                      isStale(s.date) ? 'text-amber-700' : 'text-slate-600'
                    }`}
                  >
                    {fmtDate(s.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500">
          {mn
            ? 'Өнгө: ногоон ≥75%, шар 50–74%, улаан <50%'
            : 'Colours: green 75%+, amber 50–74%, red below 50%'}
        </p>
      </div>

      <div className="bg-slate-100 border border-slate-400 rounded-2xl p-6 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          {mn ? 'Хамгийн бага тэмдэглэгдсэн 10 зорилт' : '10 least-ticked statements'}
        </h4>
        {rates.slice(0, 10).map(s => (
          <div key={s.id} className="p-3 rounded-lg bg-slate-200 border border-slate-400 space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="font-mono text-[10px] text-teal-700 shrink-0 pt-0.5">{s.id}</span>
              <span className="text-slate-700">{mn ? s.mn : s.en}</span>
            </div>
            <div className="flex items-center gap-3">
              <Bar pct={s.rate} />
              <span className="w-28 text-right font-mono text-slate-600">
                {s.ticked}/{reports.length} · {s.rate}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Course material and class data are for the teacher account only */}
      {isTeacher(user) && (
        <div className="flex justify-end">
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{mn ? 'Ангийн хүснэгт (CSV) татах' : 'Download class table (CSV)'}</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {isFirebaseConfigured && (
        <div className="bg-slate-100 border border-slate-400 rounded-2xl p-4 flex flex-wrap items-center gap-3 text-xs">
          {!ready ? null : isTeacher(user) ? (
            <>
              <span className="text-slate-700">
                {mn ? 'Багшаар нэвтэрсэн:' : 'Signed in as teacher:'} {user?.email}
              </span>
              <button
                onClick={() => loadFromCloud()}
                className="px-3 py-1.5 rounded-lg border border-slate-400 text-slate-700 hover:text-slate-900"
              >
                {mn ? 'Дахин ачаалах' : 'Reload from Firebase'}
              </button>
              <button onClick={() => signOutUser()} className="ml-auto text-slate-600 hover:text-slate-900">
                {mn ? 'Гарах' : 'Sign out'}
              </button>
            </>
          ) : user ? (
            <>
              <span className="text-amber-700">
                {mn ? 'Энэ бүртгэл багшийн эрхгүй байна.' : 'This account does not have teacher access.'}
              </span>
              <button onClick={() => signOutUser()} className="ml-auto text-slate-600 hover:text-slate-900">
                {mn ? 'Гарах' : 'Sign out'}
              </button>
            </>
          ) : (
            <button
              onClick={teacherSignIn}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold"
            >
              {mn ? 'Багшаар Google-ээр нэвтрэх' : 'Sign in as teacher with Google'}
            </button>
          )}
          {cloudNotice && <p className="w-full text-teal-700">{cloudNotice}</p>}
        </div>
      )}
      <div className="bg-slate-100 border border-slate-400 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {mn ? 'Сурагчдын явц' : 'Student progress'}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {mn ? `Ачаалсан тайлан: ${reports.length} сурагч` : `Loaded reports: ${reports.length} student(s)`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {reports.length > 0 && (
              <button
                onClick={clearAll}
                className="px-3 py-2 rounded-lg border border-slate-400 text-xs text-slate-700 hover:text-slate-900"
              >
                {mn ? 'Бүгдийг устгах' : 'Clear all'}
              </button>
            )}
          </div>
        </div>

        {reports.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="inline-flex p-0.5 bg-slate-200 border border-slate-400 rounded-lg">
              <button onClick={() => setView('class')} className={segment(view === 'class')}>
                {mn ? 'Бүх анги' : 'Whole class'}
              </button>
              <button onClick={() => setView('student')} className={segment(view === 'student')}>
                {mn ? 'Нэг сурагч' : 'One student'}
              </button>
              <button onClick={() => setView('chapter')} className={segment(view === 'chapter')}>
                {mn ? 'Бүлгээр' : 'By chapter'}
              </button>
              <button onClick={() => setView('survey')} className={segment(view === 'survey')}>
                {mn ? 'Санал асуулга' : 'Survey'}
              </button>
            </div>
            <div className="inline-flex p-0.5 bg-slate-200 border border-slate-400 rounded-lg">
              {(['core', 'extended'] as const).map(l => (
                <button key={l} onClick={() => setLevel(l)} className={segment(level === l)}>
                  {l === 'core' ? 'Core' : 'Extended'}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-600">
              {mn
                ? 'Core = бүх сурагчид; Extended = Core + нэмэлт (A*–C)'
                : 'Core = all candidates; Extended = Core + supplement (A*–C)'}
            </span>
          </div>
        )}

      </div>

      {classTabs}
      {view === 'survey' ? (
        <TeacherSurveys uids={shownUids} names={shownNames} mn={mn} />
      ) : reports.length === 0 ? (
        emptyState
      ) : view === 'class' ? (
        classView
      ) : view === 'student' ? (
        studentView
      ) : (
        chapterView
      )}
    </div>
  );
};
