import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { alevelCourse, visibleChapters } from '../data/alevelSyllabus';
import { courseTopics } from '../data/courseScope';
import { MOCK_TESTS } from '../data/mockTests';
import { downloadText } from '../data/progressReport';
import { classTone } from '../lib/classTone';
import {
  loadEnrollments,
  loadRecentResults,
  saveResultFeedback,
  subscribeStudentResults,
  subscribeStudentSummaries,
  type Enrollment,
  type StudentSummary
} from '../lib/cloud';
import { dayKey, type CourseSummary, type DayTally, type Mark, type StoredResult } from '../lib/resultSync';
import { buildChecklist, type Checklist } from '../lib/chapterChecklist';
import { ChapterChecklist } from './ChapterChecklist';
import { REASON_IDS, REASON_TEXT, bandLabel, calibrationOf, reflectionTotals, type ReflectionRecord, type ReflectionTotals } from '../lib/reflection';
import { GOOD_TEXT, HARD_TEXT, NEXT_TEXT, type NextId, type WeekReflection } from '../lib/weekReflection';
import type { ObjectiveGoal } from '../lib/objectiveGoal';
import { checklistPlan, type ChecklistPlan } from '../lib/igcseSchedule';

// The teacher's record of every student of the programme on screen, in one place and kept up to date:
//  1. the class list: one row per student, when they last worked and what they did in the chosen period;
//  2. one student's record: what they did and when, day by day and minute by minute, with the totals of each day and chapter.
// Everything comes from the students' own documents (the summary of each programme) and their results, read live.

type Period = 'today' | 'week' | 'month' | 'all';
type SortKey = 'active' | 'name' | 'class' | 'score';
type View = 'timeline' | 'days' | 'chapters' | 'reflect';
type KindFilter = 'all' | StoredResult['kind'];

const PERIODS: { id: Period; mn: string; en: string; days: number | null }[] = [
  { id: 'today', mn: 'Өнөөдөр', en: 'Today', days: 1 },
  { id: 'week', mn: '7 хоног', en: '7 days', days: 7 },
  { id: 'month', mn: '30 хоног', en: '30 days', days: 30 },
  { id: 'all', mn: 'Бүгд', en: 'All', days: null }
];

const KIND_LABEL: Record<StoredResult['kind'], { mn: string; en: string; tone: string }> = {
  exit: { mn: 'Гарах билет', en: 'Exit ticket', tone: 'bg-sky-100 text-sky-800 border-sky-300' },
  test: { mn: 'Тест', en: 'Test', tone: 'bg-violet-100 text-violet-800 border-violet-300' },
  practice: { mn: 'Дасгал', en: 'Practice', tone: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  question: { mn: 'Асуулт', en: 'Questions', tone: 'bg-slate-100 text-slate-700 border-slate-300' },
  game: { mn: 'Тоглоом', en: 'Game', tone: 'bg-amber-100 text-amber-800 border-amber-300' },
  escape: { mn: 'Escape room', en: 'Escape room', tone: 'bg-amber-100 text-amber-800 border-amber-300' }
};

// The kinds the teacher may write feedback on (the rules refuse it on games and the escape room)
const FEEDBACK_KINDS: StoredResult['kind'][] = ['exit', 'practice', 'question', 'test'];

const WEEKDAY_MN = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
const WEEKDAY_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_MS = 24 * 60 * 60 * 1000;
const PAGE = 500; // the results read for one student at first; "show older" reads this many more

const pad = (n: number) => String(n).padStart(2, '0');
const clock = (time: number) => {
  const d = new Date(time);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const shortDate = (time: number) => {
  const d = new Date(time);
  return `${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
};
// The date as it is written here, 2026.11.14
const fullDate = (time: number) => `${new Date(time).getFullYear()}.${shortDate(time)}`;

// A length of time, as hours and minutes
const minutes = (seconds: number, mn: boolean): string => {
  const m = Math.round(seconds / 60);
  if (m < 60) return mn ? `${m} мин` : `${m} min`;
  return mn ? `${Math.floor(m / 60)} ц ${m % 60} мин` : `${Math.floor(m / 60)} h ${m % 60} min`;
};

// How long ago a time was, in words
const ago = (time: number, mn: boolean): string => {
  const diff = Date.now() - time;
  const min = Math.floor(diff / 60000);
  if (min < 1) return mn ? 'дөнгөж сая' : 'just now';
  if (min < 60) return mn ? `${min} мин өмнө` : `${min} min ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return mn ? `${h} цагийн өмнө` : `${h} h ago`;
  const d = Math.floor(h / 24);
  return mn ? `${d} өдрийн өмнө` : `${d} days ago`;
};

// The colour of "last active": today green, this week amber, longer ago red, never grey
const activeTone = (time: number | null): string => {
  if (!time) return 'text-slate-500';
  const days = (Date.now() - time) / DAY_MS;
  if (days < 1) return 'text-emerald-700';
  if (days < 7) return 'text-amber-700';
  return 'text-rose-700';
};

// The colour of a score
const scoreTone = (p: number | null | undefined): string =>
  p === null || p === undefined
    ? 'bg-slate-100 text-slate-500'
    : p >= 80
      ? 'bg-emerald-100 text-emerald-800'
      : p >= 60
        ? 'bg-sky-100 text-sky-800'
        : p >= 40
          ? 'bg-amber-100 text-amber-800'
          : 'bg-rose-100 text-rose-800';

const pct = (v: number | null | undefined) => (v === null || v === undefined ? '—' : `${Math.round(v)}%`);

// The first day of the period (YYYY-MM-DD), or '' for all of it
const periodStart = (period: Period): string => {
  const days = PERIODS.find(p => p.id === period)?.days ?? null;
  return days === null ? '' : dayKey(Date.now() - (days - 1) * DAY_MS);
};

// The totals of the days in the period
const periodTotals = (daily: Record<string, DayTally> | undefined, from: string) => {
  const t = { lessons: 0, tests: 0, practice: 0, games: 0, questions: 0, earned: 0, max: 0, seconds: 0, days: 0 };
  Object.entries(daily ?? {}).forEach(([day, d]) => {
    if (from && day < from) return;
    t.lessons += d.lessons ?? 0;
    t.tests += d.tests ?? 0;
    t.practice += d.practice ?? 0;
    t.games += d.games ?? 0;
    t.questions += d.questions ?? 0;
    t.earned += d.earned ?? 0;
    t.max += d.max ?? 0;
    t.seconds += d.seconds ?? 0;
    if ((d.lessons ?? 0) + (d.tests ?? 0) + (d.practice ?? 0) + (d.games ?? 0) + (d.questions ?? 0) + (d.seconds ?? 0) > 0) t.days += 1;
  });
  return t;
};

// When the student last did anything in this programme: the summary says so; older summaries are read from their days and marks
const lastActiveOf = (sum: CourseSummary | undefined): number | null => {
  if (!sum) return null;
  if (sum.lastActiveAt) return sum.lastActiveAt;
  const fromMarks = Object.values(sum.marks ?? {}).reduce((n, m) => Math.max(n, m.takenAt), 0);
  const days = Object.keys(sum.daily ?? {}).sort();
  const fromDays = days.length ? Date.parse(`${days[days.length - 1]}T12:00:00`) : 0;
  const best = Math.max(fromMarks, Number.isFinite(fromDays) ? fromDays : 0);
  return best > 0 ? best : null;
};

// The self-check over the whole programme: objectives and key words rated, rated "I can", and how many there are
const selfCheckOf = (sum: CourseSummary | undefined) => {
  const all = Object.values(sum?.selfCheck ?? {});
  const add = (k: 'lo' | 'kw') =>
    all.reduce((n, c) => ({ rated: n.rated + c[k].rated, can: n.can + c[k].can, total: n.total + c[k].total }), { rated: 0, can: 0, total: 0 });
  return all.length ? { lo: add('lo'), kw: add('kw') } : null;
};

// The mean score of the assessments (lesson tickets, practice sets, tests) done in the period
const assessmentAverage = (sum: CourseSummary | undefined, fromTime: number): number | null => {
  const list = Object.values(sum?.marks ?? {}).filter(m => ['exit', 'practice', 'test'].includes(m.kind) && m.takenAt >= fromTime);
  return list.length ? list.reduce((n, m) => n + m.percent, 0) / list.length : null;
};

// The student's guesses before the exit tickets and the reasons after the tickets and topic checks (lib/reflection), within
// the period, newest first. They show how well the student judges their own score (calibration) and what they put their
// score down to (attribution); the student never sees these words.
const reflectionsIn = (sum: CourseSummary | undefined, fromTime: number): ReflectionRecord[] =>
  Object.values(sum?.reflections ?? {})
    .filter(r => r && typeof r.takenAt === 'number' && r.takenAt >= fromTime)
    .sort((a, b) => b.takenAt - a.takenAt);

const share = (part: number, whole: number) => (whole ? `${Math.round((part / whole) * 100)}%` : '—');

// The student's weekly look backs (lib/weekReflection) within the period, newest first: whether the cycle is closed, that
// is, whether what the student found in the week turns into a decision for the next one
const weeklyIn = (sum: CourseSummary | undefined, fromTime: number): WeekReflection[] =>
  Object.values(sum?.weekly ?? {})
    .filter(w => w && typeof w.at === 'number' && w.at >= fromTime)
    .sort((a, b) => b.at - a.at);

// The days the student set objectives to master (lib/objectiveGoal) within the period, newest first: a goal in knowledge,
// not only in numbers, and whether it was reached by the student's own end-of-day rating
const goalsIn = (sum: CourseSummary | undefined, fromTime: number): ObjectiveGoal[] =>
  Object.values(sum?.objectiveGoals ?? {})
    .filter(g => g && typeof g.at === 'number' && g.at >= fromTime && Array.isArray(g.items))
    .sort((a, b) => b.at - a.at);

// The objectives of those days: chosen, rated again at the end of the day, and rated I can then
const goalTotals = (goals: ObjectiveGoal[]) => {
  const items = goals.flatMap(g => g.items);
  return {
    days: goals.length,
    chosen: items.length,
    rerated: items.filter(i => i.after !== undefined).length,
    can: items.filter(i => i.after === true).length
  };
};

// Where the record reads from: Firebase, live. A test page can give its own sample data in the same shape.
export interface LogSource {
  subscribeSummaries: typeof subscribeStudentSummaries;
  loadEnrolments: typeof loadEnrollments;
  subscribeResults: typeof subscribeStudentResults;
  saveFeedback: typeof saveResultFeedback;
  loadResults?: typeof loadRecentResults; // one student's newest results, read once (for a summary sent by an older version)
}
const CLOUD: LogSource = {
  subscribeSummaries: subscribeStudentSummaries,
  loadEnrolments: loadEnrollments,
  subscribeResults: subscribeStudentResults,
  saveFeedback: saveResultFeedback,
  loadResults: loadRecentResults
};

// A summary sent by a version of the site older than the student record has neither the time of the last work nor the
// checklist, and its days count no tests or practice and it has no marks. Every result was still sent on its own and kept, so
// for such a student the record works the days, the marks and the last work out from the results themselves. A student who
// works on the site again sends a new summary, and this is no longer needed.
const isOldSummary = (sum: CourseSummary | undefined): boolean => !!sum && sum.lastActiveAt === undefined && sum.checklist === undefined;

const fromResults = (results: StoredResult[], course: StoredResult['course']): Pick<CourseSummary, 'daily' | 'marks' | 'lastActiveAt'> => {
  const daily: Record<string, DayTally> = {};
  const marks: Record<string, Mark> = {};
  let last = 0;
  results
    .filter(r => r.course === course && Number.isFinite(r.takenAt))
    .forEach(r => {
      last = Math.max(last, r.takenAt);
      const key = dayKey(r.takenAt);
      const d = (daily[key] ??= { lessons: 0, games: 0, questions: 0, earned: 0, max: 0, tests: 0, practice: 0, seconds: 0 });
      if (r.kind === 'exit') d.lessons += 1;
      else if (r.kind === 'game' || r.kind === 'escape') d.games += 1;
      else if (r.kind === 'practice') d.practice = (d.practice ?? 0) + 1;
      else if (r.kind === 'test') d.tests = (d.tests ?? 0) + 1;
      else if (r.kind === 'question') {
        d.questions += 1;
        d.earned += r.earned ?? 0;
        d.max += r.max ?? 0;
      }
      // The newest attempt of each assessment, as the newer summaries keep them
      if (r.kind !== 'question') {
        const raw = r.label as unknown;
        const name = typeof raw === 'string' ? raw : (raw as { en?: string } | undefined)?.en ?? r.testId ?? r.id;
        const markKey = `${r.kind}|${r.testId ?? name}`;
        if (!marks[markKey] || marks[markKey].takenAt < r.takenAt) {
          marks[markKey] = { id: r.id, kind: r.kind, takenAt: r.takenAt, percent: r.percent, label: r.label, testId: r.testId };
        }
      }
    });
  return { daily, marks, ...(last > 0 ? { lastActiveAt: last } : {}) };
};

// The older summary with what the results add: each day's counts from the results (the larger, in case the results read
// stop short of the oldest days), the study time the summary had, the marks and the time of the last work
const withResults = (sum: CourseSummary, extra: Pick<CourseSummary, 'daily' | 'marks' | 'lastActiveAt'>): CourseSummary => {
  const daily: Record<string, DayTally> = { ...(sum.daily ?? {}) };
  Object.entries(extra.daily ?? {}).forEach(([day, d]) => {
    const old = daily[day];
    daily[day] = old
      ? {
          lessons: Math.max(old.lessons ?? 0, d.lessons),
          games: Math.max(old.games ?? 0, d.games),
          questions: Math.max(old.questions ?? 0, d.questions),
          earned: Math.max(old.earned ?? 0, d.earned),
          max: Math.max(old.max ?? 0, d.max),
          tests: Math.max(old.tests ?? 0, d.tests ?? 0),
          practice: Math.max(old.practice ?? 0, d.practice ?? 0),
          seconds: old.seconds ?? 0
        }
      : d;
  });
  return { ...sum, daily, marks: { ...(sum.marks ?? {}), ...(extra.marks ?? {}) }, lastActiveAt: extra.lastActiveAt ?? sum.lastActiveAt };
};
const SourceContext = React.createContext<LogSource>(CLOUD);

interface Row {
  uid: string;
  name: string;
  cls: string;
  status: string; // the enrolment status, or '' for a student with results but no enrolment in this programme
  sum: CourseSummary | undefined;
  lastActive: number | null;
  totals: ReturnType<typeof periodTotals>;
  average: number | null;
  self: ReturnType<typeof selfCheckOf>;
  // The student's checklist of the programme, built from what the student's browser sent; null for a summary sent before it
  checklist: Checklist | null;
  // The guesses and reasons of the period, and their totals
  reflections: ReflectionRecord[];
  reflect: ReflectionTotals;
  // The weekly look backs of the period
  weekly: WeekReflection[];
  // The days with objectives to master, in the period
  goals: ObjectiveGoal[];
  // The 0620 study schedule the student set, against the student's checklist; null when not set (or not 0620)
  plan: ChecklistPlan | null;
  // The summary was sent by an older version of the site (the student has not opened the new one yet)
  oldVersion: boolean;
}

// Where the student is now: the lesson that comes next (🔒 when it keeps the following lesson closed), or ✅ when all is done
const whereNow = (c: Checklist | null, mn: boolean): React.ReactNode => {
  if (!c) return <span className="text-slate-400">—</span>;
  if (!c.next) return <span className="font-bold text-emerald-700">✅ {mn ? 'Бүгд дууссан' : 'All done'}</span>;
  const lesson = c.next.lesson;
  const what = lesson ? (lesson.def.code.en.startsWith('L') ? lesson.def.code.en : mn ? 'Судалгааны хичээл' : 'Inquiry') : mn ? 'шалгалт, үнэлгээ' : 'tests, self-check';
  const missing = lesson ? lesson.parts.filter(p => !p.done).length + (lesson.passed ? 0 : 1) : 0;
  return (
    <span className={`font-bold ${c.next.blocking ? 'text-amber-700' : 'text-sky-700'}`}>
      {c.next.blocking ? '🔒' : '➡️'} {mn ? `${c.next.chapter.number}-р бүлэг` : `Ch ${c.next.chapter.number}`} · {what}
      {lesson && <span className="ml-1 text-[10px] font-normal text-slate-500">({mn ? `${missing} ажил дутуу` : `${missing} to do`})</span>}
    </span>
  );
};
// The same as a hover note: each part still to do
const whereTitle = (c: Checklist | null, mn: boolean): string | undefined => {
  const lesson = c?.next?.lesson;
  if (!lesson) return undefined;
  const left = lesson.parts.filter(p => !p.done).map(p => (mn ? p.label.mn : p.label.en));
  if (!lesson.passed) left.push(mn ? 'Гарах билетээ 60%-иас дээш авах' : 'Get the exit ticket above 60%');
  return left.join(' · ');
};

// The checklist of one student, from the state in the summary, the ratings, the IGCSE track, the access and the chapters the
// teacher has opened or closed for them
const checklistOf = (course: StoredResult['course'], sum: CourseSummary | undefined, enrolment: Enrollment | undefined): Checklist | null =>
  sum?.checklist
    ? buildChecklist(
        course,
        course === 'igcse' && enrolment?.track === 'core' ? 'core' : 'extended',
        sum.checklist,
        sum.selfCheck ?? {},
        enrolment?.access === 'full',
        enrolment ? { open: enrolment.openChapters, closed: enrolment.closedChapters } : undefined
      )
    : null;

// One line of a student's timeline: one result, or a run of answered questions of one topic
type Line =
  | { type: 'result'; at: number; result: StoredResult }
  | { type: 'questions'; at: number; topicId: string; items: StoredResult[] };

// The results of one day as lines: answers to the same topic within 20 minutes of each other become one line
const linesOf = (results: StoredResult[]): Line[] => {
  const lines: Line[] = [];
  results.forEach(r => {
    const last = lines[lines.length - 1];
    if (r.kind === 'question' && last?.type === 'questions' && last.topicId === (r.topicId ?? '') &&
      Math.abs(last.items[last.items.length - 1].takenAt - r.takenAt) <= 20 * 60 * 1000) {
      last.items.push(r);
      return;
    }
    lines.push(r.kind === 'question' ? { type: 'questions', at: r.takenAt, topicId: r.topicId ?? '', items: [r] } : { type: 'result', at: r.takenAt, result: r });
  });
  return lines;
};

export const TeacherStudentLog: React.FC<{ source?: LogSource }> = ({ source = CLOUD }) => (
  <SourceContext.Provider value={source}>
    <StudentLog />
  </SourceContext.Provider>
);

const StudentLog: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode !== 'en';
  const { courseChoice } = useApp();
  const source = React.useContext(SourceContext);

  const [summaries, setSummaries] = useState<StudentSummary[] | null>(null);
  const [enrolments, setEnrolments] = useState<Enrollment[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('week');
  const [classPick, setClassPick] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('active');
  const [selected, setSelected] = useState<string | null>(null);
  // With a student picked, the list folds to that student alone (on by default), so the record sits right under it
  const [onlySelected, setOnlySelected] = useState(true);
  const tableRef = React.useRef<HTMLDivElement>(null);

  // Picks a student (or lets go of the one picked) and folds the list to them, bringing the list's top into view
  const pick = (uid: string) => {
    if (uid === selected) {
      setSelected(null);
      return;
    }
    setSelected(uid);
    setOnlySelected(true);
    window.setTimeout(() => tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  // Every student's summary, live: a result, a rating or study time a student saves shows here within seconds
  useEffect(
    () =>
      source.subscribeSummaries(
        list => {
          setSummaries(list);
          setLoadError(null);
        },
        e => setLoadError(String((e as { code?: string }).code ?? e.message))
      ),
    [source]
  );

  // The enrolments, for each student's name and class
  useEffect(() => {
    source
      .loadEnrolments()
      .then(setEnrolments)
      .catch(e => setLoadError(String((e as { code?: string }).code ?? (e as Error).message)));
  }, [source]);

  // The students whose summary of this programme was sent by an older version: their results, read once, fill it in
  const [fromOld, setFromOld] = useState<Record<string, Pick<CourseSummary, 'daily' | 'marks' | 'lastActiveAt'>>>({});
  const asked = React.useRef<Set<string>>(new Set());
  useEffect(() => {
    if (!summaries || !source.loadResults) return;
    const load = source.loadResults;
    const wanted = summaries.filter(s => isOldSummary(s.results?.[courseChoice]) && !asked.current.has(`${courseChoice}|${s.uid}`));
    if (wanted.length === 0) return;
    wanted.forEach(s => asked.current.add(`${courseChoice}|${s.uid}`));
    let alive = true;
    (async () => {
      // A few students at a time, so the reads do not all go at once
      for (let i = 0; i < wanted.length; i += 4) {
        const part = wanted.slice(i, i + 4);
        const found = await Promise.all(
          part.map(s =>
            load(s.uid)
              .then(list => [s.uid, fromResults(list, courseChoice)] as const)
              .catch(() => null)
          )
        );
        if (!alive) return;
        setFromOld(prev => {
          const next = { ...prev };
          found.forEach(f => {
            if (f) next[`${courseChoice}|${f[0]}`] = f[1];
          });
          return next;
        });
      }
    })();
    return () => {
      alive = false;
    };
  }, [summaries, courseChoice, source]);

  const from = periodStart(period);
  const fromTime = from ? Date.parse(`${from}T00:00:00`) : 0;

  // One row per student of this programme: everyone enrolled (approved or paused), and anyone else who has results in it
  const rows = useMemo<Row[]>(() => {
    const byUid = new Map<string, Row>();
    const summaryOf = new Map((summaries ?? []).map(s => [s.uid, s] as const));
    const summaryFor = (uid: string): CourseSummary | undefined => {
      const raw = summaryOf.get(uid)?.results?.[courseChoice];
      const extra = fromOld[`${courseChoice}|${uid}`];
      return raw && extra ? withResults(raw, extra) : raw;
    };
    const make = (uid: string, name: string, cls: string, status: string, enrolment?: Enrollment): Row => {
      const sum = summaryFor(uid);
      const reflections = reflectionsIn(sum, fromTime);
      const checklist = checklistOf(courseChoice, sum, enrolment);
      return {
        uid,
        name,
        cls,
        status,
        sum,
        lastActive: lastActiveOf(sum),
        totals: periodTotals(sum?.daily, from),
        average: assessmentAverage(sum, fromTime),
        self: selfCheckOf(sum),
        checklist,
        plan: courseChoice === 'igcse' && sum?.schedule?.start && sum.schedule.end && checklist ? checklistPlan(checklist, sum.schedule, Date.now()) : null,
        reflections,
        reflect: reflectionTotals(reflections),
        weekly: weeklyIn(sum, fromTime),
        goals: goalsIn(sum, fromTime),
        oldVersion: isOldSummary(summaryOf.get(uid)?.results?.[courseChoice])
      };
    };
    // Every student enrolled in this programme is always listed, with or without work: approved, paused, or still waiting
    // for the teacher's approval (only a rejected request is left out)
    enrolments
      .filter(e => e.programme === courseChoice && e.status !== 'rejected')
      .forEach(e => byUid.set(e.uid, make(e.uid, e.name || summaryOf.get(e.uid)?.name || 'Student', e.grade ?? '—', e.status, e)));
    // A student not enrolled here is listed only with work in this programme: every summary carries all three programmes,
    // so an IGCSE student would otherwise fill the AS list with empty rows
    (summaries ?? []).forEach(s => {
      if (byUid.has(s.uid) || !s.results?.[courseChoice]) return;
      if (lastActiveOf(summaryFor(s.uid)) === null) return;
      const other = enrolments.find(e => e.uid === s.uid && e.name);
      byUid.set(s.uid, make(s.uid, other?.name ?? s.name, other?.grade ?? '—', ''));
    });
    return [...byUid.values()];
  }, [summaries, enrolments, courseChoice, from, fromTime, fromOld]);

  const classes = useMemo(
    () => [...new Set(rows.map(r => r.cls))].sort((a, b) => (a === '—' ? 1 : b === '—' ? -1 : a.localeCompare(b))),
    [rows]
  );

  const shown = useMemo(() => {
    const needle = search.trim().toLowerCase();
    const list = rows.filter(r => (classPick === 'all' || r.cls === classPick) && (!needle || r.name.toLowerCase().includes(needle)));
    return list.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'class') return a.cls.localeCompare(b.cls) || a.name.localeCompare(b.name);
      if (sort === 'score') return (b.average ?? -1) - (a.average ?? -1);
      return (b.lastActive ?? 0) - (a.lastActive ?? 0);
    });
  }, [rows, classPick, search, sort]);

  // The class's guesses and reasons in the period: every student the filters keep
  const classReflect = useMemo(() => reflectionTotals(shown.flatMap(r => r.reflections)), [shown]);
  // The class's weekly look backs in the period: given or skipped, and the decisions for the next week
  const classWeekly = useMemo(() => {
    const all = shown.flatMap(r => r.weekly);
    const given = all.filter(w => !w.skipped);
    const decisions = { daily: 0, mistakes: 0, slides: 0, ask: 0 } as Record<NextId, number>;
    given.forEach(w => {
      if (w.next && w.next in decisions) decisions[w.next] += 1;
    });
    return { given: given.length, skipped: all.length - given.length, students: shown.filter(r => r.weekly.some(w => !w.skipped)).length, decisions };
  }, [shown]);
  // The class's objectives to master in the period
  const classGoals = useMemo(() => ({ ...goalTotals(shown.flatMap(r => r.goals)), students: shown.filter(r => r.goals.length > 0).length }), [shown]);
  const activeToday = shown.filter(r => r.lastActive && Date.now() - r.lastActive < DAY_MS).length;
  const idleWeek = shown.filter(r => !r.lastActive || Date.now() - r.lastActive >= 7 * DAY_MS).length;
  const current = rows.find(r => r.uid === selected) ?? null;
  // The rows on show: the picked student alone when the list is folded, else every student that the filters keep
  const listed = current && onlySelected ? [current] : shown;

  // The class list as a spreadsheet, with the period's totals
  const exportCsv = () => {
    const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const head = mn
      ? ['Нэр', 'Анги', 'Сүүлд идэвхтэй', 'Суралцсан мин', 'Идэвхтэй өдөр', 'Гарах билет', 'Тест', 'Дасгал', 'Тоглоом', 'Асуулт', 'Асуулт зөв %', 'Дундаж оноо %', 'Зорилт үнэлсэн', 'Түлхүүр үг үнэлсэн', 'Таамаглал', 'Таарсан', 'Өндөр үнэлсэн', 'Бага үнэлсэн', ...REASON_IDS.map(id => `Шалтгаан: ${REASON_TEXT[id].mn}`), '7 хоногийн эргэцүүлэл', 'Сүүлийн шийдвэр', 'Зорилт тавьсан өдөр', 'Сонгосон зорилт', '«Чадна» болсон зорилт', 'Хуваарь: хоцорсон бүлэг']
      : ['Name', 'Class', 'Last active', 'Minutes studied', 'Active days', 'Exit tickets', 'Tests', 'Practice', 'Games', 'Questions', 'Questions correct %', 'Average score %', 'Objectives rated', 'Key words rated', 'Guesses', 'Matched', 'Too high', 'Too low', ...REASON_IDS.map(id => `Reason: ${REASON_TEXT[id].en}`), 'Weekly look backs', 'Latest decision', 'Days with objectives', 'Objectives chosen', 'Objectives now I can', 'Schedule: chapters late'];
    const lines = shown.map(r =>
      [
        r.name,
        r.cls,
        r.lastActive ? `${fullDate(r.lastActive)} ${clock(r.lastActive)}` : '',
        Math.round(r.totals.seconds / 60),
        r.totals.days,
        r.totals.lessons,
        r.totals.tests,
        r.totals.practice,
        r.totals.games,
        r.totals.questions,
        r.totals.max ? Math.round((r.totals.earned / r.totals.max) * 100) : '',
        r.average === null ? '' : Math.round(r.average),
        r.self ? `${r.self.lo.rated}/${r.self.lo.total}` : '',
        r.self ? `${r.self.kw.rated}/${r.self.kw.total}` : '',
        r.reflect.predicted,
        r.reflect.match,
        r.reflect.over,
        r.reflect.under,
        ...REASON_IDS.map(id => r.reflect.reasons[id]),
        r.weekly.filter(w => !w.skipped).length,
        (() => {
          const w = r.weekly.find(x => !x.skipped && x.next);
          return w?.next ? (mn ? NEXT_TEXT[w.next].mn : NEXT_TEXT[w.next].en) : '';
        })(),
        ...(() => {
          const g = goalTotals(r.goals);
          return [g.days, g.chosen, g.can];
        })(),
        r.plan ? r.plan.late : ''
      ].map(cell).join(',')
    );
    downloadText(`students-${courseChoice}-${period}-${dayKey(Date.now())}.csv`, '﻿' + [head.map(cell).join(','), ...lines].join('\n'), 'text/csv;charset=utf-8');
  };

  const chip = (on: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
      on ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-700 border-slate-300 hover:border-violet-400'
    }`;
  const th = 'px-2 py-2 text-left text-[11px] font-bold text-slate-600 whitespace-nowrap';
  // No text colour here: the row gives the colour, so a cell with its own colour (last active) shows it
  const td = 'px-2 py-2 text-xs whitespace-nowrap';

  return (
    <div className="space-y-5">
      {/* The filters: class, period, search, and the spreadsheet */}
      <div className="bg-white border border-slate-300 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-black text-slate-900">{mn ? 'Сурагчдын бүртгэл' : 'Student record'}</h3>
            <p className="text-xs text-slate-600">
              {mn
                ? 'Сурагч бүр хэзээ, юу хийснийг шууд харуулна. Мөр дээр дарж тухайн сурагчийн бүх үйл ажиллагааг өдөр, цагаар нь харна.'
                : 'What each student did and when, kept up to date. Click a row to see everything the student did, by day and time.'}
            </p>
          </div>
          <button type="button" onClick={exportCsv} className="px-3 py-1.5 rounded-lg border border-slate-400 text-xs font-bold text-slate-800 hover:bg-slate-100">
            {mn ? 'Excel (CSV) татах' : 'Download CSV'}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase">{mn ? 'Хугацаа' : 'Period'}</span>
          {PERIODS.map(p => (
            <button key={p.id} type="button" onClick={() => setPeriod(p.id)} className={chip(period === p.id)} aria-pressed={period === p.id}>
              {mn ? p.mn : p.en}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase">{mn ? 'Анги' : 'Class'}</span>
          <button type="button" onClick={() => setClassPick('all')} className={chip(classPick === 'all')} aria-pressed={classPick === 'all'}>
            {mn ? 'Бүгд' : 'All'}
          </button>
          {classes.map(c => (
            <button key={c} type="button" onClick={() => setClassPick(c)} className={chip(classPick === c)} aria-pressed={classPick === c}>
              {c}
            </button>
          ))}
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={mn ? 'Нэрээр хайх' : 'Search by name'}
            className="ml-auto min-w-[10rem] px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
          />
        </div>
        <p className="text-xs text-slate-700">
          {mn
            ? `${shown.length} сурагч · өнөөдөр ${activeToday} идэвхтэй · 7 хоног ба түүнээс дээш идэвхгүй ${idleWeek}`
            : `${shown.length} students · ${activeToday} active today · ${idleWeek} idle for 7 days or more`}
        </p>
        {loadError && (
          <p className="text-xs font-bold text-rose-700">
            {mn ? 'Өгөгдөл ачаалахад алдаа гарлаа: ' : 'Could not load the data: '}
            <span className="font-mono">{loadError}</span>
          </p>
        )}
      </div>

      {/* The class's self-assessment in the period: how close the students' guesses were to their scores, and the reasons
          they gave. The theory's words are for the teacher only. */}
      {(classReflect.scores > 0 || classWeekly.given + classWeekly.skipped > 0 || classGoals.days > 0) && (
        <div className="bg-white border border-slate-300 rounded-2xl p-4 shadow-sm space-y-2">
          <h3 className="text-sm font-black text-slate-900">
            {mn ? 'Ангийн өөрийгөө үнэлэх байдал' : 'How the class judges its own work'}
            <span className="ml-1 text-[11px] font-normal text-slate-500">
              {mn ? '(сонгосон хугацаа, шүүлтүүрт орсон сурагчид)' : '(the period and students chosen)'}
            </span>
          </h3>
          <div className="grid gap-2 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                {mn ? 'Өнөөдөр эзэмших зорилт (мэдлэгт чиглэсэн зорилго)' : 'Objectives to master today (goals in knowledge)'}
              </div>
              {classGoals.days > 0 ? (
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-800">
                  <span>{mn ? 'Зорилт тавьсан өдөр' : 'Days with objectives'}: <b>{classGoals.days}</b> ({classGoals.students} {mn ? 'сурагч' : 'students'})</span>
                  <span>{mn ? 'Сонгосон зорилт' : 'Objectives chosen'}: <b>{classGoals.chosen}</b></span>
                  <span>{mn ? 'Дахин үнэлсэн' : 'Rated again'}: <b>{share(classGoals.rerated, classGoals.chosen)}</b></span>
                  <span className="text-emerald-700">{mn ? '«Чадна» болсон' : 'Now I can'}: <b>{classGoals.can}</b></span>
                </div>
              ) : (
                <p className="text-xs text-slate-500">{mn ? 'Зорилт хараахан тавиагүй.' : 'No objectives set yet.'}</p>
              )}
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                {mn ? 'Гарах билетийн өмнөх таамаглал (калибраци)' : 'Guess before the exit ticket (calibration)'}
              </div>
              {classReflect.predicted > 0 ? (
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-800">
                  <span>{mn ? 'Таамаглал' : 'Guesses'}: <b>{classReflect.predicted}</b></span>
                  <span className="text-emerald-700">{mn ? 'Таарсан' : 'Matched'}: <b>{share(classReflect.match, classReflect.predicted)}</b></span>
                  <span className="text-amber-700">{mn ? 'Өөрийгөө өндөр үнэлсэн' : 'Too high'}: <b>{share(classReflect.over, classReflect.predicted)}</b></span>
                  <span className="text-sky-700">{mn ? 'Бага үнэлсэн' : 'Too low'}: <b>{share(classReflect.under, classReflect.predicted)}</b></span>
                </div>
              ) : (
                <p className="text-xs text-slate-500">{mn ? 'Таамаглал хараахан алга.' : 'No guesses yet.'}</p>
              )}
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                {mn ? 'Дүнгийн шалтгаан (атрибуц)' : 'Reason for the score (attribution)'}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-800">
                {REASON_IDS.map(id => (
                  <span key={id}>
                    {mn ? REASON_TEXT[id].mn : REASON_TEXT[id].en}: <b>{classReflect.reasons[id]}</b>
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                {mn ? '7 хоногийн эргэцүүлэл (мөчлөг хаах)' : 'Weekly look back (closing the cycle)'}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-800">
                <span>{mn ? 'Бөглөсөн' : 'Given'}: <b>{classWeekly.given}</b> ({classWeekly.students} {mn ? 'сурагч' : 'students'})</span>
                <span className="text-slate-500">{mn ? 'Алгассан' : 'Skipped'}: <b>{classWeekly.skipped}</b></span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-800">
                {(Object.keys(classWeekly.decisions) as NextId[]).map(id => (
                  <span key={id}>
                    {mn ? NEXT_TEXT[id].mn : NEXT_TEXT[id].en}: <b>{classWeekly.decisions[id]}</b>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The class list */}
      {/* With a student picked: who it is, and the buttons to show everyone again or to let go of the student */}
      {current && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-violet-300 bg-violet-50 px-3 py-2">
          <span className="text-xs font-bold text-violet-900">
            {onlySelected
              ? mn ? `Зөвхөн сонгосон сурагч: ${current.name}` : `Only the student picked: ${current.name}`
              : mn ? `Сонгосон: ${current.name}` : `Picked: ${current.name}`}
          </span>
          <button
            type="button"
            onClick={() => setOnlySelected(o => !o)}
            className="ml-auto px-3 py-1 rounded-lg border border-violet-400 bg-white text-xs font-bold text-violet-800 hover:bg-violet-100"
          >
            {onlySelected ? (mn ? 'Бүх сурагчийг харуулах' : 'Show every student') : mn ? 'Зөвхөн сонгосныг харуулах' : 'Show only this student'}
          </button>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="px-3 py-1 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100"
          >
            {mn ? 'Сонголтыг цуцлах' : 'Clear the choice'}
          </button>
        </div>
      )}

      <div ref={tableRef} className="bg-white border border-slate-300 rounded-2xl shadow-sm overflow-hidden scroll-mt-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100 border-b border-slate-300">
              <tr>
                <th className={th}>#</th>
                <th className={th}>
                  <button type="button" onClick={() => setSort('name')} className={sort === 'name' ? 'underline' : ''}>{mn ? 'Нэр' : 'Name'}</button>
                </th>
                <th className={th}>
                  <button type="button" onClick={() => setSort('class')} className={sort === 'class' ? 'underline' : ''}>{mn ? 'Анги' : 'Class'}</button>
                </th>
                <th className={th}>
                  <button type="button" onClick={() => setSort('active')} className={sort === 'active' ? 'underline' : ''}>{mn ? 'Сүүлд идэвхтэй' : 'Last active'}</button>
                </th>
                <th className={th}>{mn ? 'Одоо хаана' : 'Where now'}</th>
                {courseChoice === 'igcse' && (
                  <th className={th} title={mn ? 'Сурагчийн өөрөө тавьсан хуваарьтай харьцуулсан хоцорсон бүлэг' : 'Chapters behind the schedule the student set'}>
                    {mn ? 'Хуваарь' : 'Schedule'}
                  </th>
                )}
                <th className={th}>{mn ? 'Суралцсан' : 'Studied'}</th>
                <th className={th}>{mn ? 'Гарах билет' : 'Exit tickets'}</th>
                <th className={th}>{mn ? 'Тест' : 'Tests'}</th>
                <th className={th}>{mn ? 'Дасгал' : 'Practice'}</th>
                <th className={th}>{mn ? 'Асуулт (зөв)' : 'Questions (correct)'}</th>
                <th className={th}>
                  <button type="button" onClick={() => setSort('score')} className={sort === 'score' ? 'underline' : ''}>{mn ? 'Дундаж оноо' : 'Average'}</button>
                </th>
                <th className={th}>{mn ? 'Өөрийн үнэлгээ' : 'Self-check'}</th>
                <th className={th} title={mn ? 'Гарах билетийн өмнөх таамаглал оноотой таарсан нь / нийт таамаглал' : 'Guesses that matched the score / all guesses'}>
                  {mn ? 'Таамаглал таарсан' : 'Guess matched'}
                </th>
              </tr>
            </thead>
            <tbody>
              {summaries === null && (
                <tr>
                  <td colSpan={courseChoice === 'igcse' ? 14 : 13} className="px-3 py-6 text-center text-xs text-slate-500">{mn ? 'Ачаалж байна…' : 'Loading…'}</td>
                </tr>
              )}
              {summaries !== null && shown.length === 0 && (
                <tr>
                  <td colSpan={courseChoice === 'igcse' ? 14 : 13} className="px-3 py-6 text-center text-xs text-slate-500">{mn ? 'Сурагч алга.' : 'No students.'}</td>
                </tr>
              )}
              {listed.map(r => {
                // The row's place in the whole list, kept when the list is folded to one student
                const i = shown.indexOf(r);
                const tone = classTone(r.cls);
                const t = r.totals;
                return (
                  <tr
                    key={r.uid}
                    onClick={() => pick(r.uid)}
                    className={`border-b border-slate-200 cursor-pointer text-slate-800 ${r.uid === selected ? 'bg-violet-50' : 'hover:bg-slate-50'}`}
                  >
                    <td className={`${td} text-slate-500`}>{i >= 0 ? i + 1 : '—'}</td>
                    <td className={`${td} font-bold`}>
                      {r.name}
                      {r.status === 'suspended' && <span className="ml-1 text-[10px] text-amber-700">({mn ? 'түр хаасан' : 'paused'})</span>}
                      {r.status === 'requested' && <span className="ml-1 text-[10px] text-sky-700">({mn ? 'хүсэлт хүлээж буй' : 'awaiting approval'})</span>}
                    </td>
                    <td className={td}>
                      <span className={`px-1.5 py-0.5 rounded border ${tone.bar} ${tone.head} ${tone.text} text-[11px] font-bold`}>{r.cls}</span>
                    </td>
                    <td className={`${td} ${activeTone(r.lastActive)}`}>
                      {r.lastActive ? (
                        <>
                          <span className="font-bold">{ago(r.lastActive, mn)}</span>
                          <span className="ml-1 text-[10px] text-slate-500">{shortDate(r.lastActive)} {clock(r.lastActive)}</span>
                        </>
                      ) : (
                        <span>{mn ? 'Эхлээгүй' : 'Not started'}</span>
                      )}
                    </td>
                    <td
                      className={td}
                      title={
                        r.oldVersion
                          ? mn
                            ? 'Сурагч сайтын шинэ хувилбарыг хараахан нээгээгүй тул хийх ажлын хүснэгт ирээгүй. Дүнг хадгалагдсан дүнгүүдээс тооцов.'
                            : 'The student has not opened the new version yet, so the checklist has not arrived; the totals come from the saved results.'
                          : whereTitle(r.checklist, mn)
                      }
                    >
                      {r.oldVersion && !r.checklist ? (
                        <span className="text-[11px] text-slate-500">{mn ? '— (сайтаа шинэчлээгүй)' : '— (old version)'}</span>
                      ) : (
                        whereNow(r.checklist, mn)
                      )}
                    </td>
                    {courseChoice === 'igcse' && (
                      <td className={td} title={r.plan ? `${mn ? 'Хуваарийн дагуу' : 'By schedule'} ~${r.plan.expectedPct}% · ${mn ? 'одоо' : 'now'} ${r.plan.actualPct}%` : undefined}>
                        {!r.plan ? (
                          <span className="text-slate-400">—</span>
                        ) : r.plan.late > 0 ? (
                          <span className="font-bold text-rose-700">{mn ? `${r.plan.late} бүлэг хоцорсон` : `${r.plan.late} late`}</span>
                        ) : (
                          <span className="font-bold text-emerald-700">{mn ? '✓ Хуваарийн дагуу' : '✓ On track'}</span>
                        )}
                      </td>
                    )}
                    <td className={td}>{t.seconds ? minutes(t.seconds, mn) : '—'}</td>
                    <td className={td}>{t.lessons || '—'}</td>
                    <td className={td}>{t.tests || '—'}</td>
                    <td className={td}>{t.practice || '—'}</td>
                    <td className={td}>{t.questions ? `${t.questions} (${pct(t.max ? (t.earned / t.max) * 100 : null)})` : '—'}</td>
                    <td className={td}>
                      <span className={`px-1.5 py-0.5 rounded font-bold ${scoreTone(r.average)}`}>{pct(r.average)}</span>
                    </td>
                    <td className={td}>
                      {r.self
                        ? `${mn ? 'Зорилт' : 'Obj.'} ${r.self.lo.rated}/${r.self.lo.total} · ${mn ? 'Түлхүүр үг' : 'Words'} ${r.self.kw.rated}/${r.self.kw.total}`
                        : '—'}
                    </td>
                    <td
                      className={td}
                      title={
                        r.reflect.predicted
                          ? mn
                            ? `Өндөр үнэлсэн ${r.reflect.over}, бага үнэлсэн ${r.reflect.under}`
                            : `Too high ${r.reflect.over}, too low ${r.reflect.under}`
                          : undefined
                      }
                    >
                      {r.reflect.predicted ? (
                        <>
                          <span className="font-bold">{r.reflect.match}/{r.reflect.predicted}</span>
                          {r.reflect.over > r.reflect.under && <span className="ml-1 text-[10px] text-amber-700">↑</span>}
                          {r.reflect.under > r.reflect.over && <span className="ml-1 text-[10px] text-sky-700">↓</span>}
                        </>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {current && <StudentRecord row={current} mn={mn} from={from} onClose={() => setSelected(null)} />}
    </div>
  );
};

// One student's record: tiles for the period, then the timeline, the days or the chapters
const StudentRecord: React.FC<{ row: Row; mn: boolean; from: string; onClose: () => void }> = ({ row, mn, from, onClose }) => {
  const { courseChoice } = useApp();
  const source = React.useContext(SourceContext);
  // The checklist first: what the student has done and what keeps the next lesson closed
  const [view, setView] = useState<View>('chapters');
  const [kind, setKind] = useState<KindFilter>('all');
  const [max, setMax] = useState(PAGE);
  const [results, setResults] = useState<StoredResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // The student's results, live, newest first
  useEffect(() => {
    setResults(null);
    setError(null);
    return source.subscribeResults(
      row.uid,
      max,
      list => setResults(list.filter(r => r.course === courseChoice)),
      e => setError(String((e as { code?: string }).code ?? e.message))
    );
  }, [row.uid, max, courseChoice, source]);

  // The name of every topic of the three programmes, so an answer always shows its topic by name
  const topicName = useMemo(() => {
    const map = new Map<string, string>();
    (['igcse', 'as', 'a'] as const).forEach(course =>
      courseTopics(course).forEach(t => {
        const topic = t as unknown as { id: string; number?: string; titleMn?: string; titleEn?: string };
        if (!map.has(topic.id)) map.set(topic.id, `${topic.number ?? ''} ${(mn ? topic.titleMn : topic.titleEn) ?? ''}`.trim());
      })
    );
    return map;
  }, [mn]);

  const chapters = useMemo(
    () => (courseChoice === 'igcse' ? CURRICULUM_CHAPTERS : visibleChapters(ALEVEL_CHAPTERS, alevelCourse(courseChoice))),
    [courseChoice]
  );

  const sum = row.sum;
  const t = row.totals;

  // The results grouped by day, newest day first, within the kind picked
  const byDay = useMemo(() => {
    const groups = new Map<string, StoredResult[]>();
    (results ?? [])
      .filter(r => kind === 'all' || r.kind === kind)
      .forEach(r => {
        const key = dayKey(r.takenAt);
        groups.set(key, [...(groups.get(key) ?? []), r]);
      });
    return [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [results, kind]);

  const labelOf = (r: StoredResult): string => {
    const raw = r.label as unknown;
    if (typeof raw === 'string' && raw) return raw;
    if (raw && typeof raw === 'object') {
      const text = String((mn ? (raw as { mn?: string }).mn : (raw as { en?: string }).en) ?? '');
      if (text) return text;
    }
    if (r.kind === 'test') {
      const test = MOCK_TESTS.find(x => x.id === r.testId);
      return test ? (mn ? test.titleMn : test.titleEn) : r.testId ?? '';
    }
    return '';
  };

  const dayTitle = (key: string): string => {
    const d = new Date(`${key}T12:00:00`);
    const today = dayKey(Date.now());
    const yesterday = dayKey(Date.now() - DAY_MS);
    const name = key === today ? (mn ? 'Өнөөдөр' : 'Today') : key === yesterday ? (mn ? 'Өчигдөр' : 'Yesterday') : (mn ? WEEKDAY_MN : WEEKDAY_EN)[d.getDay()];
    return `${name} · ${key.slice(5).replace('-', '.')}`;
  };

  const dayLine = (d: DayTally | undefined): string => {
    if (!d) return '';
    const parts: string[] = [];
    if (d.seconds) parts.push(`${mn ? 'суралцсан' : 'studied'} ${minutes(d.seconds, mn)}`);
    if (d.lessons) parts.push(`${d.lessons} ${mn ? 'гарах билет' : 'exit tickets'}`);
    if (d.tests) parts.push(`${d.tests} ${mn ? 'тест' : 'tests'}`);
    if (d.practice) parts.push(`${d.practice} ${mn ? 'дасгал' : 'practice'}`);
    if (d.questions) parts.push(`${d.questions} ${mn ? 'асуулт' : 'questions'} (${pct(d.max ? (d.earned / d.max) * 100 : null)})`);
    return parts.join(' · ');
  };

  const tile = (label: string, value: string) => (
    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-sm font-black text-slate-900">{value}</div>
    </div>
  );
  const tab = (id: View, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => setView(id)}
      aria-pressed={view === id}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${view === id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white border-2 border-violet-300 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-slate-900">
            {row.name} <span className="text-sm font-bold text-slate-500">· {row.cls}</span>
          </h3>
          <p className={`text-xs ${activeTone(row.lastActive)}`}>
            {row.lastActive
              ? `${mn ? 'Сүүлд идэвхтэй' : 'Last active'}: ${fullDate(row.lastActive)} ${clock(row.lastActive)} (${ago(row.lastActive, mn)})`
              : mn ? 'Одоогоор юу ч хийгээгүй' : 'Nothing done yet'}
          </p>
        </div>
        <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100">
          {mn ? 'Хаах' : 'Close'}
        </button>
      </div>

      {/* The period's totals */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {tile(mn ? 'Суралцсан' : 'Studied', t.seconds ? minutes(t.seconds, mn) : '—')}
        {tile(mn ? 'Идэвхтэй өдөр' : 'Active days', String(t.days))}
        {tile(mn ? 'Гарах билет' : 'Exit tickets', String(t.lessons))}
        {tile(mn ? 'Тест / дасгал' : 'Tests / practice', `${t.tests} / ${t.practice}`)}
        {tile(mn ? 'Асуулт (зөв)' : 'Questions (correct)', t.questions ? `${t.questions} (${pct(t.max ? (t.earned / t.max) * 100 : null)})` : '—')}
        {tile(mn ? 'Дундаж оноо' : 'Average score', pct(row.average))}
      </div>
      {row.self && (
        <p className="text-xs text-slate-700">
          {mn ? 'Өөрийн үнэлгээ (бүх бүлэг): ' : 'Self-check (all chapters): '}
          {mn ? 'сурах зорилт' : 'objectives'} {row.self.lo.rated}/{row.self.lo.total} {mn ? 'үнэлсэн' : 'rated'}, ✓{row.self.lo.can} ·{' '}
          {mn ? 'түлхүүр үг' : 'key words'} {row.self.kw.rated}/{row.self.kw.total} {mn ? 'үнэлсэн' : 'rated'}, ✓{row.self.kw.can}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {tab('chapters', mn ? 'Хийх ажил (бүлгээр)' : 'Checklist (by chapter)')}
        {tab('timeline', mn ? 'Цагийн хэлхээс' : 'Timeline')}
        {tab('days', mn ? 'Өдрөөр' : 'By day')}
        {tab('reflect', mn ? `Өөрийгөө үнэлэх (${row.reflections.length + row.weekly.length + row.goals.length})` : `Self-assessment (${row.reflections.length + row.weekly.length + row.goals.length})`)}
      </div>

      {/* Each guess beside its score, and each reason, newest first: how the student judges their own work */}
      {view === 'reflect' && (
        <div className="space-y-3">
          {/* The objectives the student set out to master each day, and their own rating before and at the end of the day */}
          <div className="text-[11px] font-black uppercase tracking-wide text-slate-500">
            {mn ? 'Өнөөдөр эзэмших зорилт' : 'Objectives to master today'}
          </div>
          {row.goals.length === 0 ? (
            <p className="text-xs text-slate-500">{mn ? 'Энэ хугацаанд зорилт тавиагүй.' : 'None in this period.'}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead className="bg-slate-100">
                  <tr>
                    {(mn ? ['Өдөр', 'Зорилт', 'Сонгохдоо', 'Өдрийн төгсгөлд'] : ['Day', 'Objective', 'When chosen', 'End of the day']).map(h => (
                      <th key={h} className="px-2 py-2 text-left font-bold text-slate-600 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {row.goals.flatMap(g =>
                    g.items.map((item, k) => {
                      const rating = (v: boolean | undefined) =>
                        v === undefined ? (
                          <span className="text-slate-400">—</span>
                        ) : v ? (
                          <span className="font-bold text-emerald-700">✓ {mn ? 'Чадна' : 'I can'}</span>
                        ) : (
                          <span className="font-bold text-amber-700">{mn ? 'Хараахан' : 'Not yet'}</span>
                        );
                      return (
                        <tr key={`${g.id}-${item.id}`} className="border-b border-slate-100">
                          <td className="px-2 py-1.5 whitespace-nowrap">{k === 0 ? g.day?.slice(5).replace('-', '.') : ''}</td>
                          <td className="px-2 py-1.5 font-mono">{item.code}</td>
                          <td className="px-2 py-1.5">{rating(item.before)}</td>
                          <td className="px-2 py-1.5">{rating(item.after)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className="pt-2 text-[11px] font-black uppercase tracking-wide text-slate-500">
            {mn ? 'Гарах билет ба сэдвийн шалгалт' : 'Exit tickets and topic checks'}
          </div>
          <p className="text-xs text-slate-700">
            {mn
              ? `Таамаглал ${row.reflect.predicted}: таарсан ${row.reflect.match}, өндөр үнэлсэн ${row.reflect.over}, бага үнэлсэн ${row.reflect.under}. Шалтгаан: `
              : `Guesses ${row.reflect.predicted}: matched ${row.reflect.match}, too high ${row.reflect.over}, too low ${row.reflect.under}. Reasons: `}
            {REASON_IDS.map(id => `${mn ? REASON_TEXT[id].mn : REASON_TEXT[id].en} ${row.reflect.reasons[id]}`).join(' · ')}
          </p>
          {row.reflections.length === 0 ? (
            <p className="text-xs text-slate-500">
              {mn ? 'Энэ хугацаанд таамаглал, шалтгаан бүртгэгдээгүй байна.' : 'No guesses or reasons in this period.'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead className="bg-slate-100">
                  <tr>
                    {(mn
                      ? ['Огноо', 'Юу', 'Таамаглал', 'Оноо', 'Таамаглал ба оноо', 'Шалтгаан']
                      : ['When', 'What', 'Guess', 'Score', 'Guess vs score', 'Reason']
                    ).map(h => (
                      <th key={h} className="px-2 py-2 text-left font-bold text-slate-600 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {row.reflections.map(r => {
                    const cal = r.predicted === undefined ? null : calibrationOf(r.predicted, r.percent);
                    return (
                      <tr key={r.id} className="border-b border-slate-100">
                        <td className="px-2 py-1.5 whitespace-nowrap">{shortDate(r.takenAt)} {clock(r.takenAt)}</td>
                        <td className="px-2 py-1.5">
                          <span className="mr-1 rounded bg-slate-100 px-1 text-[10px] font-bold text-slate-600">
                            {r.kind === 'exit' ? (mn ? 'Гарах билет' : 'Exit ticket') : mn ? 'Сэдвийн шалгалт' : 'Topic check'}
                          </span>
                          {mn ? r.label?.mn : r.label?.en}
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap">{r.predicted === undefined ? '—' : bandLabel(r.predicted)}</td>
                        <td className="px-2 py-1.5">
                          <span className={`px-1.5 py-0.5 rounded font-bold ${scoreTone(r.percent)}`}>{pct(r.percent)}</span>
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap">
                          {cal === 'match' && <span className="font-bold text-emerald-700">✓ {mn ? 'Таарсан' : 'Matched'}</span>}
                          {cal === 'over' && <span className="font-bold text-amber-700">↑ {mn ? 'Өндөр үнэлсэн' : 'Too high'}</span>}
                          {cal === 'under' && <span className="font-bold text-sky-700">↓ {mn ? 'Бага үнэлсэн' : 'Too low'}</span>}
                          {cal === null && <span className="text-slate-400">—</span>}
                        </td>
                        <td className="px-2 py-1.5">{r.reason ? (mn ? REASON_TEXT[r.reason]?.mn : REASON_TEXT[r.reason]?.en) : '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* The weekly look backs: what went well, what was hard, and the decision for the next week */}
          <div className="pt-2 text-[11px] font-black uppercase tracking-wide text-slate-500">
            {mn ? '7 хоногийн эргэцүүлэл' : 'Weekly look back'}
          </div>
          {row.weekly.length === 0 ? (
            <p className="text-xs text-slate-500">{mn ? 'Энэ хугацаанд бөглөөгүй байна.' : 'None in this period.'}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead className="bg-slate-100">
                  <tr>
                    {(mn
                      ? ['7 хоног', 'Юу сайн болов', 'Юу хэцүү байв', 'Ирэх 7 хоногт', 'Өөрийн үгээр']
                      : ['Week', 'What went well', 'What was hard', 'Next week', 'In their words']
                    ).map(h => (
                      <th key={h} className="px-2 py-2 text-left font-bold text-slate-600 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {row.weekly.map(w => {
                    const tx = (b: { mn: string; en: string } | undefined) => (b ? (mn ? b.mn : b.en) : '—');
                    return (
                      <tr key={w.id} className="border-b border-slate-100 align-top">
                        <td className="px-2 py-1.5 whitespace-nowrap">
                          {mn ? `${w.week?.slice(5).replace('-', '.')}-нд эхэлсэн` : `from ${w.week?.slice(5).replace('-', '.')}`}
                        </td>
                        {w.skipped ? (
                          <td colSpan={4} className="px-2 py-1.5 text-slate-500">{mn ? 'Алгассан' : 'Skipped'}</td>
                        ) : (
                          <>
                            <td className="px-2 py-1.5">{tx(w.good ? GOOD_TEXT[w.good] : undefined)}</td>
                            <td className="px-2 py-1.5">{w.hard === 'topic' && w.hardTopic ? tx(w.hardTopic.label) : tx(w.hard ? HARD_TEXT[w.hard] : undefined)}</td>
                            <td className="px-2 py-1.5 font-bold">{tx(w.next ? NEXT_TEXT[w.next] : undefined)}</td>
                            <td className="px-2 py-1.5">{w.note || '—'}</td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {view === 'timeline' && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {(['all', 'exit', 'test', 'practice', 'question', 'game'] as KindFilter[]).map(k => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                aria-pressed={kind === k}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${kind === k ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-700 border-slate-300'}`}
              >
                {k === 'all' ? (mn ? 'Бүгд' : 'All') : mn ? KIND_LABEL[k].mn : KIND_LABEL[k].en}
              </button>
            ))}
          </div>
          {error && (
            <p className="text-xs font-bold text-rose-700">
              {mn ? 'Дүнг уншиж чадсангүй: ' : 'Could not read the results: '}
              <span className="font-mono">{error}</span>
            </p>
          )}
          {results === null && !error && <p className="text-xs text-slate-500">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>}
          {results !== null && byDay.length === 0 && (
            <p className="text-xs text-slate-500">{mn ? 'Энэ хөтөлбөрт бүртгэгдсэн дүн алга.' : 'No results recorded in this programme.'}</p>
          )}
          {byDay.map(([day, list]) => (
            <div key={day} className="rounded-xl border border-slate-200">
              <div className="px-3 py-2 bg-slate-100 rounded-t-xl flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-xs font-black text-slate-900">{dayTitle(day)}</span>
                <span className="text-[11px] text-slate-600">{dayLine(sum?.daily?.[day])}</span>
              </div>
              <ul className="divide-y divide-slate-100">
                {linesOf(list).map(line =>
                  line.type === 'result' ? (
                    <ResultLine key={line.result.id} uid={row.uid} result={line.result} label={labelOf(line.result)} mn={mn} />
                  ) : (
                    <QuestionLine key={line.items[0].id} items={line.items} topic={topicName.get(line.topicId) ?? line.topicId} mn={mn} />
                  )
                )}
              </ul>
            </div>
          ))}
          {results !== null && results.length >= max && (
            <button type="button" onClick={() => setMax(m => m + PAGE)} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100">
              {mn ? 'Өмнөх дүнг цааш харуулах' : 'Show older results'}
            </button>
          )}
        </div>
      )}

      {view === 'days' && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead className="bg-slate-100">
              <tr>
                {(mn
                  ? ['Өдөр', 'Суралцсан', 'Гарах билет', 'Тест', 'Дасгал', 'Тоглоом', 'Асуулт', 'Зөв %']
                  : ['Day', 'Studied', 'Exit tickets', 'Tests', 'Practice', 'Games', 'Questions', 'Correct %']
                ).map(h => (
                  <th key={h} className="px-2 py-2 text-left font-bold text-slate-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(sum?.daily ?? {})
                .filter(([day]) => !from || day >= from)
                .sort((a, b) => b[0].localeCompare(a[0]))
                .map(([day, d]) => (
                  <tr key={day} className="border-b border-slate-100">
                    <td className="px-2 py-1.5 font-bold whitespace-nowrap">{dayTitle(day)}</td>
                    <td className="px-2 py-1.5">{d.seconds ? minutes(d.seconds, mn) : '—'}</td>
                    <td className="px-2 py-1.5">{d.lessons || '—'}</td>
                    <td className="px-2 py-1.5">{d.tests || '—'}</td>
                    <td className="px-2 py-1.5">{d.practice || '—'}</td>
                    <td className="px-2 py-1.5">{d.games || '—'}</td>
                    <td className="px-2 py-1.5">{d.questions || '—'}</td>
                    <td className="px-2 py-1.5">{d.max ? pct((d.earned / d.max) * 100) : '—'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {Object.keys(sum?.daily ?? {}).length === 0 && <p className="text-xs text-slate-500 p-2">{mn ? 'Өдрийн бүртгэл алга.' : 'No days recorded.'}</p>}
        </div>
      )}

      {view === 'chapters' && (
        <div className="space-y-4">
          {row.checklist ? (
            <ChapterChecklist key={row.uid} checklist={row.checklist} mn={mn} teacher />
          ) : (
            <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
              {mn
                ? 'Энэ сурагч сайтаа шинэ хувилбараар хараахан нээгээгүй тул хийх ажлын хүснэгт ирээгүй байна. Сурагч сайтаа нээхэд автоматаар гарч ирнэ.'
                : 'This student has not opened the new version of the site yet, so the checklist has not arrived. It appears by itself when they do.'}
            </p>
          )}
          <div className="text-[11px] font-black uppercase tracking-wide text-slate-500">
            {mn ? 'Бүлэг бүрийн суралцсан хугацаа ба хариулсан асуулт (тест, оношлогоо орно)' : 'Time studied and questions answered in each chapter (tests and the diagnostic included)'}
          </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead className="bg-slate-100">
              <tr>
                {(mn
                  ? ['Бүлэг', 'Суралцсан', 'Асуулт', 'Зөв %', 'Сурах зорилт', 'Түлхүүр үг']
                  : ['Chapter', 'Studied', 'Questions', 'Correct %', 'Objectives', 'Key words']
                ).map(h => (
                  <th key={h} className="px-2 py-2 text-left font-bold text-slate-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chapters.map(ch => {
                const q = sum?.chapters?.[ch.id];
                const sc = sum?.selfCheck?.[ch.id];
                const secs = sum?.study?.chapters?.[ch.id] ?? 0;
                const lessonSecs = Object.values(sum?.study?.lessons ?? {}).filter(l => l.chapterId === ch.id).reduce((n, l) => n + l.seconds, 0);
                return (
                  <tr key={ch.id} className="border-b border-slate-100">
                    <td className="px-2 py-1.5 font-bold">{ch.number}. {mn ? ch.titleMn : ch.titleEn}</td>
                    <td className="px-2 py-1.5 whitespace-nowrap">{secs + lessonSecs ? minutes(secs + lessonSecs, mn) : '—'}</td>
                    <td className="px-2 py-1.5">{q?.answered || '—'}</td>
                    <td className="px-2 py-1.5">{q?.max ? pct((q.earned / q.max) * 100) : '—'}</td>
                    <td className="px-2 py-1.5 whitespace-nowrap">{sc ? `${sc.lo.rated}/${sc.lo.total} (✓${sc.lo.can})` : '—'}</td>
                    <td className="px-2 py-1.5 whitespace-nowrap">{sc ? `${sc.kw.rated}/${sc.kw.total} (✓${sc.kw.can})` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  );
};

// One result in the timeline: the time, its kind, what it was, the score, and the teacher's feedback
const ResultLine: React.FC<{ uid: string; result: StoredResult; label: string; mn: boolean }> = ({ uid, result, label, mn }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(result.feedback ?? '');
  const [saved, setSaved] = useState<string | undefined>(result.feedback);
  const [busy, setBusy] = useState(false);
  const source = React.useContext(SourceContext);
  const k = KIND_LABEL[result.kind] ?? KIND_LABEL.question;
  const canFeedback = FEEDBACK_KINDS.includes(result.kind);

  useEffect(() => setSaved(result.feedback), [result.feedback]);

  const save = () => {
    setBusy(true);
    source
      .saveFeedback(uid, result.id, text.trim())
      .then(() => {
        setSaved(text.trim());
        setEditing(false);
      })
      .catch(() => {})
      .finally(() => setBusy(false));
  };

  return (
    <li className="px-3 py-2 space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] text-slate-500 w-10">{clock(result.takenAt)}</span>
        <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${k.tone}`}>{mn ? k.mn : k.en}</span>
        <span className="text-xs text-slate-800 flex-1 min-w-[8rem]">{label || '—'}</span>
        <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${scoreTone(result.percent)}`}>{pct(result.percent)}</span>
        {canFeedback && !editing && (
          <button type="button" onClick={() => setEditing(true)} className="text-[11px] font-bold text-violet-700 hover:underline">
            {saved ? (mn ? 'Сэтгэгдэл засах' : 'Edit feedback') : mn ? 'Сэтгэгдэл бичих' : 'Write feedback'}
          </button>
        )}
      </div>
      {saved && !editing && <p className="ml-12 text-[11px] text-violet-800">💬 {saved}</p>}
      {editing && (
        <div className="ml-12 flex flex-wrap gap-2">
          <textarea
            value={text}
            onChange={e => setText(e.target.value.slice(0, 500))}
            rows={2}
            className="flex-1 min-w-[12rem] rounded-lg border border-slate-300 p-2 text-xs"
          />
          <div className="flex flex-col gap-1">
            <button type="button" disabled={busy} onClick={save} className="px-3 py-1 rounded-lg bg-violet-600 text-white text-xs font-bold disabled:opacity-50">
              {mn ? 'Хадгалах' : 'Save'}
            </button>
            <button type="button" onClick={() => setEditing(false)} className="px-3 py-1 rounded-lg border border-slate-300 text-xs font-bold">
              {mn ? 'Болих' : 'Cancel'}
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

// A run of answered questions of one topic: how many, the marks, and each answer when opened
const QuestionLine: React.FC<{ items: StoredResult[]; topic: string; mn: boolean }> = ({ items, topic, mn }) => {
  const [open, setOpen] = useState(false);
  const earned = items.reduce((n, r) => n + (r.earned ?? 0), 0);
  const max = items.reduce((n, r) => n + (r.max ?? 0), 0);
  const first = items[items.length - 1].takenAt;
  const last = items[0].takenAt;
  const k = KIND_LABEL.question;
  return (
    <li className="px-3 py-2 space-y-1">
      <button type="button" onClick={() => setOpen(o => !o)} className="w-full flex flex-wrap items-center gap-2 text-left">
        <span className="font-mono text-[11px] text-slate-500 w-10">{clock(last)}</span>
        <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${k.tone}`}>{mn ? k.mn : k.en}</span>
        <span className="text-xs text-slate-800 flex-1 min-w-[8rem]">
          {topic || (mn ? 'Сэдэв тодорхойгүй' : 'Unknown topic')} · {items.length} {mn ? 'асуулт' : 'questions'}
          {items.length > 1 && <span className="text-slate-500"> ({clock(first)}–{clock(last)})</span>}
        </span>
        <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${scoreTone(max ? (earned / max) * 100 : null)}`}>
          {max ? `${earned}/${max} · ${pct((earned / max) * 100)}` : '—'}
        </span>
        <span className="text-[11px] text-slate-500">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul className="ml-12 space-y-0.5">
          {items.map(r => (
            <li key={r.id} className="text-[11px] text-slate-700 font-mono">
              {clock(r.takenAt)} · {r.questionId ?? ''} {r.paper ? `· ${r.paper}` : ''} · {r.earned ?? 0}/{r.max ?? 0}
              {r.feedback ? ` · 💬 ${r.feedback}` : ''}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
