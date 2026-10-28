import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { alevelCourse, visibleChapters } from '../data/alevelSyllabus';
import { courseQuestions } from '../data/courseScope';
import { MOCK_TESTS } from '../data/mockTests';
import { cambridgeGrade } from '../lib/grade';
import { periodBuckets, type Period } from '../lib/activity';
import { loadRecentResults, loadStudentSummaries, saveResultFeedback, type StudentSummary } from '../lib/cloud';
import type { CourseSummary, DayTally, StoredResult, Tally } from '../lib/resultSync';

// The teacher writes feedback on lesson tickets, full tests and answered questions. Games and the escape room show results only.
const FEEDBACK_KINDS: StoredResult['kind'][] = ['exit', 'question', 'test'];

type ChartKind = 'lesson' | 'question' | 'game';
const CHART_KINDS: { id: ChartKind; en: string; mn: string; bar: string }[] = [
  { id: 'lesson', en: 'Lesson tickets', mn: 'Хичээлийн шалгалт', bar: 'bg-sky-500' },
  { id: 'question', en: 'Questions', mn: 'Асуулт', bar: 'bg-emerald-500' },
  { id: 'game', en: 'Games', mn: 'Тоглоом', bar: 'bg-amber-400' }
];

const PERIODS: { id: Period; en: string; mn: string }[] = [
  { id: 'day', en: 'Day', mn: 'Өдөр' },
  { id: 'week', en: 'Week', mn: 'Долоо хоног' },
  { id: 'month', en: 'Month', mn: 'Сар' }
];

type Filter = 'all' | 'lesson' | 'question' | 'test' | 'game';
const FILTERS: { id: Filter; en: string; mn: string }[] = [
  { id: 'all', en: 'All', mn: 'Бүгд' },
  { id: 'lesson', en: 'Lessons', mn: 'Хичээл' },
  { id: 'question', en: 'Questions', mn: 'Асуулт' },
  { id: 'test', en: 'Full tests', mn: 'Бүтэн шалгалт' },
  { id: 'game', en: 'Games', mn: 'Тоглоом' }
];

const matchesFilter = (r: StoredResult, f: Filter): boolean => {
  if (f === 'all') return true;
  if (f === 'lesson') return r.kind === 'exit';
  if (f === 'game') return r.kind === 'game' || r.kind === 'escape';
  return r.kind === f;
};

const HEAD = 'text-[10px] font-bold uppercase tracking-wider text-slate-400';
const CARD = 'p-3 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2.5';

const pad = (n: number) => String(n).padStart(2, '0');
const dateText = (time: number) => {
  const d = new Date(time);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const bucketLabel = (start: Date, period: Period) =>
  period === 'month' ? `${start.getFullYear()}-${pad(start.getMonth() + 1)}` : `${pad(start.getMonth() + 1)}/${pad(start.getDate())}`;
const percentOf = (t: Tally): number | null => (t.max > 0 ? Math.round((t.earned / t.max) * 100) : null);

// A day's counts as events at noon of that day, so the period buckets of the student's own activity graph apply to them
const dailyEvents = (daily: Record<string, DayTally>): { takenAt: number; kind: ChartKind }[] => {
  const events: { takenAt: number; kind: ChartKind }[] = [];
  for (const [key, day] of Object.entries(daily)) {
    const [y, m, d] = key.split('-').map(Number);
    const at = new Date(y, m - 1, d, 12).getTime();
    for (let i = 0; i < day.lessons; i++) events.push({ takenAt: at, kind: 'lesson' });
    for (let i = 0; i < day.questions; i++) events.push({ takenAt: at, kind: 'question' });
    for (let i = 0; i < day.games; i++) events.push({ takenAt: at, kind: 'game' });
  }
  return events;
};

// The teacher's comment on one result. Each result is saved on its own.
const FeedbackBox: React.FC<{ item: StoredResult; mn: boolean; onSave: (text: string) => Promise<void> }> = ({ item, mn, onSave }) => {
  const [text, setText] = useState(item.feedback ?? '');
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const save = () => {
    setBusy(true);
    setFailed(false);
    onSave(text.trim())
      .catch(() => setFailed(true))
      .finally(() => setBusy(false));
  };

  return (
    <div className="space-y-1.5">
      <textarea
        rows={2}
        maxLength={500}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={mn ? 'Сурагчид санал бичих...' : 'Write feedback for the student...'}
        className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-2 text-xs"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={save}
          disabled={busy || !text.trim() || text.trim() === (item.feedback ?? '')}
          className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold"
        >
          {mn ? 'Хадгалах' : 'Save feedback'}
        </button>
        {failed && <span className="text-[11px] text-rose-400">{mn ? 'Хадгалж чадсангүй' : 'Could not save'}</span>}
      </div>
    </div>
  );
};

// Totals of one student in the programme: lessons, questions, full tests and games, each with its average or accuracy
const Totals: React.FC<{ summary: CourseSummary; mn: boolean }> = ({ summary, mn }) => {
  const tiles = [
    {
      label: mn ? 'Хичээлийн шалгалт' : 'Lesson tickets',
      value: `${summary.lessons.count}`,
      caption: summary.lessons.avg === null ? (mn ? 'Дуусгаагүй' : 'None yet') : `${mn ? 'Дундаж' : 'Average'} ${summary.lessons.avg}%`
    },
    {
      label: mn ? 'Бодсон асуулт' : 'Questions answered',
      value: `${summary.questions.answered}`,
      caption: percentOf(summary.questions) === null ? (mn ? 'Бодоогүй' : 'None yet') : `${mn ? 'Нарийвчлал' : 'Accuracy'} ${percentOf(summary.questions)}%`
    },
    {
      label: mn ? 'Бүтэн шалгалт' : 'Full tests',
      value: `${summary.tests.count}`,
      caption: summary.tests.avg === null ? (mn ? 'Өгөөгүй' : 'None yet') : `${mn ? 'Дундаж' : 'Average'} ${summary.tests.avg}%`
    },
    {
      label: mn ? 'Тоглоом, escape room' : 'Games and escape room',
      value: `${summary.games.count}`,
      caption: summary.games.avg === null ? (mn ? 'Тоглоогүй' : 'None yet') : `${mn ? 'Дундаж' : 'Average'} ${summary.games.avg}%`
    }
  ];
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
      {tiles.map(t => (
        <div key={t.label} className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-0.5">
          <div className={HEAD}>{t.label}</div>
          <div className="text-base font-extrabold font-mono text-white">{t.value}</div>
          <div className="text-[10px] text-slate-400">{t.caption}</div>
        </div>
      ))}
    </div>
  );
};

// The student's activity by day, week or month, stacked by kind, from the daily counts the sync sends
const ActivityGraph: React.FC<{ daily: Record<string, DayTally>; mn: boolean }> = ({ daily, mn }) => {
  const [period, setPeriod] = useState<Period>('day');
  const buckets = periodBuckets(dailyEvents(daily), period, CHART_KINDS.map(k => k.id));
  const busiest = Math.max(1, ...buckets.map(b => b.total));
  const total = buckets.reduce((n, b) => n + b.total, 0);
  const active = buckets.filter(b => b.total > 0).length;
  const labelEvery = period === 'day' ? 5 : 2;

  return (
    <div className={CARD}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className={HEAD}>{mn ? 'Идэвх' : 'Activity'}</div>
        <div className="inline-flex p-0.5 rounded-lg bg-slate-800">
          {PERIODS.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id)}
              aria-pressed={period === p.id}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${period === p.id ? 'bg-slate-950 text-white' : 'text-slate-400'}`}
            >
              {mn ? p.mn : p.en}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 text-[10px] text-slate-400">
        {CHART_KINDS.map(k => (
          <span key={k.id} className="inline-flex items-center gap-1">
            <span className={`w-2.5 h-2.5 rounded-sm ${k.bar}`} />
            {mn ? k.mn : k.en}
          </span>
        ))}
      </div>
      <div className="flex items-end gap-1 h-36">
        {buckets.map(b => (
          <div key={b.start.getTime()} className="flex-1 min-w-0 h-full flex flex-col justify-end" title={`${bucketLabel(b.start, period)}: ${b.total}`}>
            <div className="flex flex-col-reverse w-full overflow-hidden rounded-t" style={{ height: `${(b.total / busiest) * 100}%` }}>
              {CHART_KINDS.map(k =>
                b.counts[k.id] > 0 ? <div key={k.id} className={k.bar} style={{ height: `${(b.counts[k.id] / b.total) * 100}%` }} /> : null
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        {buckets.map((b, i) => (
          <div key={b.start.getTime()} className="relative flex-1 min-w-0 h-3">
            {i % labelEvery === 0 && (
              <span className="absolute left-0 top-0 whitespace-nowrap text-[9px] font-mono text-slate-400">{bucketLabel(b.start, period)}</span>
            )}
          </div>
        ))}
      </div>
      <div className="text-[11px] text-slate-400">{mn ? `Нийт: ${total} · идэвхтэй: ${active}` : `Total: ${total} · active: ${active}`}</div>
    </div>
  );
};

// Every chapter of the programme with the student's answers in it; a chapter with no questions yet shows as missing
const ChapterList: React.FC<{
  chapters: { id: string; number: number; titleEn: string; titleMn: string }[];
  summary: CourseSummary;
  bankCount: Record<string, number>;
  mn: boolean;
}> = ({ chapters, summary, bankCount, mn }) => {
  const answered = chapters.filter(ch => (summary.chapters?.[ch.id]?.answered ?? 0) > 0).length;
  return (
    <div className={CARD}>
      <div className={HEAD}>{mn ? 'Шалгалт бүлгээр' : 'Exams by chapter'}</div>
      <div className="text-[11px] text-slate-400">
        {mn ? `${chapters.length} бүлгийн ${answered} нь бодогдсон` : `${answered} of ${chapters.length} chapters answered`}
      </div>
      <ul className="space-y-1.5">
        {chapters.map(ch => {
          const t = summary.chapters?.[ch.id];
          const count = t?.answered ?? 0;
          const pct = t ? percentOf(t) : null;
          return (
            <li key={ch.id} className="space-y-0.5">
              <div className="flex justify-between gap-2 text-xs">
                <span className="truncate text-slate-300">
                  {ch.number}. {mn ? ch.titleMn : ch.titleEn}
                </span>
                {bankCount[ch.id] === 0 ? (
                  <span className="shrink-0 italic text-slate-500">{mn ? 'Асуулт бэлэн биш' : 'No questions yet'}</span>
                ) : count === 0 ? (
                  <span className="shrink-0 text-slate-500">{mn ? 'Өгөөгүй' : 'Not done yet'}</span>
                ) : (
                  <span className={`shrink-0 font-mono font-bold ${(pct ?? 0) >= 60 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {pct}% · {count}
                  </span>
                )}
              </div>
              {bankCount[ch.id] > 0 && (
                <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full ${(pct ?? 0) >= 60 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${pct ?? 0}%` }} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// The student's results of the programme, newest first, with the filter chosen and the feedback box where it applies
const ResultsList: React.FC<{
  results: StoredResult[] | undefined;
  filter: Filter;
  onFilter: (f: Filter) => void;
  label: (r: StoredResult) => string;
  onSave: (r: StoredResult, text: string) => Promise<void>;
  mn: boolean;
}> = ({ results, filter, onFilter, label, onSave, mn }) => {
  const shown = (results ?? []).filter(r => matchesFilter(r, filter));
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className={HEAD}>{mn ? 'Үр дүн' : 'Results'}</div>
        <div className="flex flex-wrap gap-1">
          {FILTERS.map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => onFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                filter === f.id ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'text-slate-400 border-slate-700 hover:bg-slate-800'
              }`}
            >
              {mn ? f.mn : f.en}
            </button>
          ))}
        </div>
      </div>
      {!results ? (
        <p className="text-xs text-slate-400">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>
      ) : shown.length === 0 ? (
        <p className="text-xs text-slate-400">{mn ? 'Энэ ангилалд үр дүн алга.' : 'No results in this group.'}</p>
      ) : (
        <ul className="space-y-3">
          {shown.map(r => (
            <li key={r.id} className="space-y-1.5 pb-3 border-b border-slate-800 last:border-0">
              <div className="flex justify-between gap-2 text-xs">
                <span className="truncate text-slate-200">{label(r)}</span>
                <span className="shrink-0 font-mono text-slate-400">
                  {dateText(r.takenAt)} · {r.percent}%{r.kind === 'exit' ? ` · ${cambridgeGrade(r.percent).letter}` : ''}
                </span>
              </div>
              {FEEDBACK_KINDS.includes(r.kind) ? (
                <FeedbackBox item={r} mn={mn} onSave={text => onSave(r, text)} />
              ) : (
                <div className="text-[11px] text-slate-500">{mn ? 'Зөвхөн үр дүн' : 'Results only'}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// The teacher's monitor of every student in the programme on screen: a list to search, and for the chosen student the totals,
// the activity by period, every chapter's exam results, and all results with feedback.
export const TeacherResults: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { courseChoice } = useApp();
  const [students, setStudents] = useState<StudentSummary[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [recent, setRecent] = useState<Record<string, StoredResult[]>>({});

  useEffect(() => {
    loadStudentSummaries()
      .then(list => setStudents(list))
      .catch(() => setFailed(true));
  }, []);

  const bank = useMemo(() => courseQuestions(courseChoice), [courseChoice]);
  const chapters = useMemo(
    () => (courseChoice === 'igcse' ? CURRICULUM_CHAPTERS : visibleChapters(ALEVEL_CHAPTERS, alevelCourse(courseChoice))),
    [courseChoice]
  );
  // The questions the app holds for each chapter; a chapter with none is shown as missing
  const bankCount = useMemo(
    () =>
      Object.fromEntries(
        chapters.map(ch => {
          const ids = new Set(ch.topics.map(t => t.id));
          return [ch.id, bank.filter(q => ids.has(q.topicId)).length];
        })
      ),
    [chapters, bank]
  );

  // The students who have sent results for this programme, the most recently active first, filtered by the search
  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (students ?? [])
      .filter(s => s.results[courseChoice])
      .filter(s => !needle || s.name.toLowerCase().includes(needle))
      .sort((a, b) => b.resultsAt.localeCompare(a.resultsAt));
  }, [students, courseChoice, query]);

  const detail = (students ?? []).find(s => s.uid === selected) ?? null;

  const choose = (uid: string) => {
    setSelected(uid);
    setFilter('all');
    if (!recent[uid]) {
      loadRecentResults(uid)
        .then(list => setRecent(prev => ({ ...prev, [uid]: list })))
        .catch(() => setRecent(prev => ({ ...prev, [uid]: [] })));
    }
  };

  const saveFeedback = (uid: string, item: StoredResult, text: string) =>
    saveResultFeedback(uid, item.id, text).then(() =>
      setRecent(prev => ({
        ...prev,
        [uid]: (prev[uid] ?? []).map(r => (r.id === item.id ? { ...r, feedback: text, feedbackAt: new Date().toISOString() } : r))
      }))
    );

  const resultLabel = (r: StoredResult): string => {
    if (r.label) return mn ? r.label.mn : r.label.en;
    if (r.kind === 'test') {
      const test = MOCK_TESTS.find(t => t.id === r.testId);
      return test ? (mn ? test.titleMn : test.titleEn) : r.testId ?? '';
    }
    if (r.kind === 'question') {
      const q = bank.find(x => x.id === r.questionId);
      return q ? (mn ? q.titleMn : q.titleEn) : r.questionId ?? '';
    }
    return r.kind;
  };

  const lastActive = (s: StudentSummary) => {
    const days = Object.keys(s.results[courseChoice]?.daily ?? {}).sort();
    return days.length ? days[days.length - 1] : s.resultsAt ? dateText(Date.parse(s.resultsAt)) : '';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">{mn ? 'Суралцагчдын хяналт' : 'Student monitor'}</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          {mn
            ? 'Хөтөлбөр дээрх сурагч бүрийн бүх үйл ажиллагаа: хичээлийн шалгалт, асуулт, бүтэн шалгалт, тоглоом, идэвх, бүлгээр шалгалт. Хичээлийн шалгалт, бүтэн шалгалт, асуултад санал бичнэ. Тоглоом, escape room-д зөвхөн үр дүн харагдана.'
            : 'Everything each student does in the programme on screen: lesson tickets, questions, full tests, games, activity over time, and exams by chapter. Feedback goes on lesson tickets, full tests and answered questions; games and the escape room show results only.'}
        </p>
      </div>

      {failed && <p className="text-sm text-rose-400">{mn ? 'Үр дүнг ачаалж чадсангүй.' : 'Could not load the results.'}</p>}

      {!failed && students === null ? (
        <p className="text-sm text-slate-400">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>
      ) : !failed && rows.length === 0 && !query ? (
        <p className="text-sm text-slate-400">{mn ? 'Одоогоор үр дүн илгээсэн сурагч алга.' : 'No student has sent results yet.'}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[17rem_minmax(0,1fr)] gap-4 items-start">
          <div className="space-y-2">
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={mn ? 'Нэрээр хайх…' : 'Search by name…'}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs"
            />
            <div className="text-[11px] text-slate-500">{mn ? `${rows.length} сурагч` : `${rows.length} students`}</div>
            <ul className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
              {rows.map(s => {
                const sum = s.results[courseChoice];
                const on = s.uid === selected;
                return (
                  <li key={s.uid}>
                    <button
                      type="button"
                      onClick={() => choose(s.uid)}
                      aria-pressed={on}
                      className={`w-full text-left p-2.5 rounded-xl border space-y-1 ${
                        on ? 'border-purple-500/50 bg-purple-500/10' : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white truncate">{s.name}</span>
                        <span className="shrink-0 text-[10px] font-mono text-slate-500">{lastActive(s)}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {sum.lessons.count} · {sum.questions.answered} · {sum.games.count}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-w-0">
            {!detail ? (
              <p className="text-sm text-slate-400">{mn ? 'Сурагч сонгоно уу.' : 'Choose a student to see their activity.'}</p>
            ) : (
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-white">{detail.name}</h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    {mn ? 'Сүүлд идэвхтэй: ' : 'Last active: '}
                    {lastActive(detail)}
                  </span>
                </div>
                <Totals summary={detail.results[courseChoice]} mn={mn} />
                <ActivityGraph daily={detail.results[courseChoice].daily ?? {}} mn={mn} />
                <ChapterList chapters={chapters} summary={detail.results[courseChoice]} bankCount={bankCount} mn={mn} />
                <ResultsList
                  results={recent[detail.uid]}
                  filter={filter}
                  onFilter={setFilter}
                  label={resultLabel}
                  onSave={(r, text) => saveFeedback(detail.uid, r, text)}
                  mn={mn}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
