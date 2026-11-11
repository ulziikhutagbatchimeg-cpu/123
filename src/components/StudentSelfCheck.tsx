import React, { useState } from 'react';
import { Check, ChevronDown, Plus } from 'lucide-react';
import { useApp, Programme } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { KEY_TERMS } from '../data/alevelKeyTerms';
import { alevelCourse, chapterLevel, isVisibleFor, visibleChapters } from '../data/alevelSyllabus';
import { readMastery } from './KeyTermTracker';
import type { PaperType, TestAttempt } from '../types/chemistry';
import { analyseMistakes, LEVEL_STYLE, type MistakeLevel } from '../data/mistakeAnalysis';
import { accuracyOf, chapterExamResults, courseAttempts, courseMistakes, courseQuestions, courseTopics } from '../data/courseScope';
import { paperResults, weakTopics } from '../data/practiceAnalysis';
import { courseOfTest, testTitle, unitTestId } from '../lib/testAttempts';
import { COURSE_SOLID } from '../lib/courseColour';
import { CHAPTER_TESTS } from '../data/chapterTests';
import { CAMBRIDGE_PAST_PAPERS_2017_2024 } from '../data/pastPapersData';
import { cambridgeGrade } from '../lib/grade';
import { periodBuckets, useActivity, type ActivityRecord, type Period } from '../lib/activity';
import { useAuthUser, useEnrollment, useStudentFeedback } from '../lib/cloud';
import { chapterProgress, useSelfCheck } from '../lib/selfCheck';

// The student's own check of the course being studied. It counts every result the student has: lesson exit tickets, answered
// questions (practice, full tests and past papers), games and the escape room. The numbers count the chosen course only, so
// 0620 results never appear under 9701 and the reverse. A tile with a tone takes the colour of its level (green, amber or red).
type Tab = 'overview' | 'activity' | 'lessons' | 'exams' | 'games';
const TABS: { id: Tab; en: string; mn: string }[] = [
  { id: 'overview', en: 'Overview', mn: 'Тойм' },
  { id: 'activity', en: 'Activity', mn: 'Идэвх' },
  { id: 'lessons', en: 'Lessons', mn: 'Хичээл' },
  { id: 'exams', en: 'Exams', mn: 'Шалгалт' },
  { id: 'games', en: 'Games', mn: 'Тоглоом' }
];

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

const PAST_PAPER_IDS = new Set(CAMBRIDGE_PAST_PAPERS_2017_2024.map(q => q.id));

const pad = (n: number) => String(n).padStart(2, '0');
const dateText = (time: number) => {
  const d = new Date(time);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const bucketLabel = (start: Date, period: Period) =>
  period === 'month' ? `${start.getFullYear()}-${pad(start.getMonth() + 1)}` : `${pad(start.getMonth() + 1)}/${pad(start.getDate())}`;
const average = (values: number[]): number | null =>
  values.length ? Math.round(values.reduce((n, v) => n + v, 0) / values.length) : null;

// The tiles of the overview. The student can show all of them, or only the ones chosen, and fold each one away.
type TileId = 'lessons' | 'questions' | 'tests' | 'games' | 'topics' | 'words' | 'mistakes' | 'objectives' | 'rated';
const TILE_IDS: TileId[] = ['lessons', 'questions', 'tests', 'games', 'topics', 'words', 'mistakes', 'objectives', 'rated'];
interface TileView {
  mode: 'all' | 'chosen';
  chosen: TileId[];
  folded: TileId[];
}
// Kept on this device only, so the choice stays after a reload
const TILE_VIEW_KEY = 'chem_self_check_tiles';
const readTileView = (): TileView => {
  try {
    const raw = window.localStorage.getItem(TILE_VIEW_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<TileView>;
      const known = (list: unknown) => (Array.isArray(list) ? list.filter((id): id is TileId => TILE_IDS.includes(id)) : []);
      return {
        mode: saved.mode === 'chosen' ? 'chosen' : 'all',
        chosen: Array.isArray(saved.chosen) ? known(saved.chosen) : TILE_IDS,
        folded: known(saved.folded)
      };
    }
  } catch {
    // Storage can be blocked; the tiles then show as they are by default
  }
  return { mode: 'all', chosen: TILE_IDS, folded: [] };
};
const writeTileView = (view: TileView) => {
  try {
    window.localStorage.setItem(TILE_VIEW_KEY, JSON.stringify(view));
  } catch {
    // Storage can be blocked; the choice then lasts for this visit only
  }
};

const Tile: React.FC<{
  label: string;
  value: string;
  percent: number;
  caption: string;
  tone?: MistakeLevel;
  action?: React.ReactNode;
  folded: boolean;
  onFold: () => void;
  picking: boolean;
  picked: boolean;
  onPick: () => void;
  accent: string;
}> = ({ label, value, percent, caption, tone, action, folded, onFold, picking, picked, onPick, accent }) => {
  const style = tone ? LEVEL_STYLE[tone] : undefined;
  return (
    <div className={`p-2.5 rounded-xl border space-y-1 ${style ? style.box : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800'}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</div>
        <div className="flex shrink-0 items-center gap-1">
          {picking && (
            <button
              type="button"
              onClick={onPick}
              aria-pressed={picked}
              aria-label={picked ? 'Remove from my view' : 'Add to my view'}
              className={`inline-flex h-5 w-5 items-center justify-center rounded-md border ${
                picked
                  ? `${accent} border-transparent`
                  : 'border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400'
              }`}
            >
              {picked ? <Check className="h-3 w-3" aria-hidden="true" /> : <Plus className="h-3 w-3" aria-hidden="true" />}
            </button>
          )}
          <button
            type="button"
            onClick={onFold}
            aria-expanded={!folded}
            aria-label={folded ? 'Open' : 'Fold'}
            className="rounded p-0.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${folded ? '' : 'rotate-180'}`} aria-hidden="true" />
          </button>
        </div>
      </div>
      {!folded && (
        <>
          <div className={`text-base font-extrabold font-mono ${style ? style.text : 'text-slate-900 dark:text-white'}`}>{value}</div>
          <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div className={`h-full rounded-full ${style ? style.bar : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, Math.max(0, percent))}%` }} />
          </div>
          <div className="text-[10px] leading-snug text-slate-500 dark:text-slate-400">{caption}</div>
          {action}
        </>
      )}
    </div>
  );
};

// One saved result: what was done, when, and the score (with its Cambridge grade for a lesson ticket)
const ResultRow: React.FC<{ record: ActivityRecord; mn: boolean; grade?: boolean }> = ({ record, mn, grade }) => (
  <li className="flex items-center justify-between gap-2 text-[11px]">
    <span className="truncate text-slate-800 dark:text-slate-200">{mn ? record.label.mn : record.label.en}</span>
    <span className="shrink-0 font-mono text-slate-500 dark:text-slate-400">{dateText(record.takenAt)}</span>
    <span className={`shrink-0 font-mono font-bold ${record.percent >= 60 ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
      {record.percent}%{grade ? ` · ${cambridgeGrade(record.percent).letter}` : ''}
    </span>
  </li>
);

const PAPER_LABEL: Record<PaperType, { mn: string; en: string }> = {
  'Paper 2': { mn: 'Paper 2 · сонголттой', en: 'Paper 2 · multiple choice' },
  'Paper 4': { mn: 'Paper 4 · теори', en: 'Paper 4 · theory' },
  'Paper 6': { mn: 'Paper 6 · практик', en: 'Paper 6 · alternative to practical' }
};

const CARD = 'p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2';
const HEAD = 'text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400';
const MUTED = 'text-[11px] text-slate-500 dark:text-slate-400';

export const StudentSelfCheck: React.FC<{ mn: boolean; programme: Programme; onOpenProgress: () => void }> = ({
  mn,
  programme,
  onOpenProgress
}) => {
  const { leitnerCards, stats, testAttempts, mistakes, attempts, courseChoice, jumpToTopic } = useApp();
  const activity = useActivity();
  // The teacher's feedback on this student's results, when signed in
  const { user } = useAuthUser();
  const feedback = useStudentFeedback(user?.uid);
  // A pressed tab opens its part; pressing the same tab again folds the part away
  const [tab, setTab] = useState<Tab | null>('overview');
  const [period, setPeriod] = useState<Period>('day');
  // Which overview tiles show, and which are folded away: kept on this device
  const [tileView, setTileView] = useState<TileView>(readTileView);
  const [picking, setPicking] = useState(false);
  const saveTileView = (next: TileView) => {
    setTileView(next);
    writeTileView(next);
  };
  const tileShown = (id: TileId) => picking || tileView.mode === 'all' || tileView.chosen.includes(id);
  const showTiles = (mode: TileView['mode']) => {
    setPicking(false);
    saveTileView({ ...tileView, mode });
  };
  const toggleFold = (id: TileId) =>
    saveTileView({ ...tileView, folded: tileView.folded.includes(id) ? tileView.folded.filter(x => x !== id) : [...tileView.folded, id] });
  const togglePick = (id: TileId) =>
    saveTileView({ ...tileView, chosen: tileView.chosen.includes(id) ? tileView.chosen.filter(x => x !== id) : [...tileView.chosen, id] });
  const tileProps = (id: TileId) => ({
    folded: tileView.folded.includes(id),
    onFold: () => toggleFold(id),
    picking,
    picked: tileView.chosen.includes(id),
    onPick: () => togglePick(id),
    accent: COURSE_SOLID[courseChoice]
  });
  const viewButton = (active: boolean) =>
    `px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
      active ? `${COURSE_SOLID[courseChoice]} border-transparent` : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
    }`;
  const alevel = programme === 'alevel';
  // The chosen level only: AS topics for AS, A Level topics for A Level
  const course = alevelCourse(courseChoice);
  const visibleKeyTerms = Object.entries(KEY_TERMS).filter(([id]) => isVisibleFor(chapterLevel(id), course));

  // Topics of this course only
  const chapters = alevel ? visibleChapters(ALEVEL_CHAPTERS, course) : CURRICULUM_CHAPTERS;
  const topicIds = new Set(chapters.flatMap(c => c.topics.map(t => t.id)));
  const topicsTotal = topicIds.size;
  const topicsDone = stats.completedTopics.filter(id => topicIds.has(id)).length;

  // Key words of this course: 0620 flashcards in box 4 or 5, or 9701 key terms ticked as explained
  let wordsDone = 0;
  let wordsTotal = 0;
  if (alevel) {
    const mastery = readMastery();
    wordsTotal = visibleKeyTerms.reduce((n, [, list]) => n + list.length, 0);
    wordsDone = visibleKeyTerms.reduce((n, [id, list]) => n + (mastery[id] ?? []).filter(t => list.includes(t)).length, 0);
  } else {
    wordsTotal = leitnerCards.length;
    wordsDone = leitnerCards.filter(c => c.box >= 4).length;
  }

  // The self-check of every chapter of this course (lib/selfCheck): objectives and key words rated, and rated "I can".
  // A Core IGCSE student is counted on the Core objectives.
  const selfCheck = useSelfCheck();
  const track = useEnrollment(user?.uid, 'igcse')?.track;
  const level: 'core' | 'extended' = !alevel && track === 'core' ? 'core' : 'extended';
  const rated = chapters.reduce(
    (n, ch) => {
      const p = chapterProgress(ch.topics, selfCheck, level);
      return {
        lo: { rated: n.lo.rated + p.lo.rated, can: n.lo.can + p.lo.can, total: n.lo.total + p.lo.total },
        kw: { rated: n.kw.rated + p.kw.rated, can: n.kw.can + p.kw.can, total: n.kw.total + p.kw.total }
      };
    },
    { lo: { rated: 0, can: 0, total: 0 }, kw: { rated: 0, can: 0, total: 0 } }
  );

  // The tests of this course, newest first: chapter tests, end-of-topic checks and mock tests
  const courseTests = testAttempts.filter(t => courseOfTest(t.testId) === courseChoice).sort((x, y) => y.takenAt - x.takenAt);
  const lastTest = courseTests[0] as TestAttempt | undefined;

  // Lesson exit tickets, games and the escape room of this course, newest first
  const courseRecords = activity.filter(r => r.course === courseChoice);
  const exitRecords = courseRecords.filter(r => r.kind === 'exit');
  const gameRecords = courseRecords.filter(r => r.kind === 'game' || r.kind === 'escape');

  // Every answered question of this course: practice, full tests and past papers
  const practice = courseAttempts(attempts, courseChoice);
  const questionAccuracy = accuracyOf(practice);
  const papers = paperResults(practice);
  const weak = weakTopics(practice);
  const courseTopicList = courseTopics(courseChoice);

  // Exam results by chapter, for every chapter of the course, including those with no questions yet
  const bank = courseQuestions(courseChoice);
  const chapterResults = chapterExamResults(chapters, bank, practice);
  const chaptersAnswered = chapters.filter(ch => chapterResults[ch.id].answered > 0).length;
  const pastAnswers = practice.filter(a => PAST_PAPER_IDS.has(a.questionId));

  // The newest result of a test, by test id: an end-of-topic check (unit-<topic id>) or a chapter test
  const newestTest = (testId: string): TestAttempt | undefined => courseTests.find(t => t.testId === testId);
  const courseKey = alevel ? 'alevel' : 'igcse';
  // The chapter tests that cover a chapter, and the newest end-of-topic checks and chapter test of the chapter
  const chapterTestsOf = (chapterId: string) =>
    CHAPTER_TESTS.filter(t => t.course === courseKey && t.chapterIds.includes(chapterId));
  const chapterTestLine = (ch: { id: string; topics: { id: string }[] }) => {
    const checks = ch.topics.map(t => newestTest(unitTestId(t.id))).filter((t): t is TestAttempt => !!t);
    const average = checks.length ? Math.round(checks.reduce((n, t) => n + t.percent, 0) / checks.length) : null;
    const chapterTest = chapterTestsOf(ch.id).flatMap(t => {
      const attempt = newestTest(t.id);
      return attempt ? [attempt] : [];
    })[0];
    return { checks, average, chapterTest, topics: ch.topics.length, hasChapterTest: chapterTestsOf(ch.id).length > 0 };
  };

  // The past paper answers by the year of the paper, every year from 2017 to 2026, oldest first. A year with no answer yet is null.
  const pastYear = new Map(CAMBRIDGE_PAST_PAPERS_2017_2024.map(q => [q.id, q.year ?? 0]));
  const PAST_YEARS = Array.from({ length: 10 }, (_, i) => 2017 + i);
  const pastByYear = PAST_YEARS.map(year => {
    const list = pastAnswers.filter(a => pastYear.get(a.questionId) === year);
    return { year, questions: list.length, percent: list.length ? accuracyOf(list) : null };
  });

  // The teacher's feedback on this course's results, newest first, each with what it is about
  const feedbackItems = Object.entries(feedback)
    .map(([id, f]) => {
      const record = courseRecords.find(r => r.id === id);
      if (record) return { id, text: f.text, at: f.at, label: mn ? record.label.mn : record.label.en };
      const test = courseTests.find(t => t.id === id);
      if (test) {
        const title = testTitle(test.testId);
        return { id, text: f.text, at: f.at, label: mn ? title.mn : title.en };
      }
      const answer = practice.find(a => a.id === id);
      if (answer) {
        const q = bank.find(x => x.id === answer.questionId);
        return { id, text: f.text, at: f.at, label: q ? (mn ? q.titleMn : q.titleEn) : answer.questionId };
      }
      return null;
    })
    .filter((item): item is { id: string; text: string; at: string; label: string } => item !== null)
    .sort((a, b) => b.at.localeCompare(a.at));

  // The activity graph counts each lesson ticket, each answered question and each game, by day, week or month
  const chartEvents: { takenAt: number; kind: ChartKind }[] = [
    ...exitRecords.map(r => ({ takenAt: r.takenAt, kind: 'lesson' as const })),
    ...practice.map(a => ({ takenAt: a.takenAt, kind: 'question' as const })),
    ...gameRecords.map(r => ({ takenAt: r.takenAt, kind: 'game' as const }))
  ];
  const buckets = periodBuckets(chartEvents, period, CHART_KINDS.map(k => k.id));
  const busiest = Math.max(1, ...buckets.map(b => b.total));
  const chartTotal = buckets.reduce((n, b) => n + b.total, 0);
  const activeBuckets = buckets.filter(b => b.total > 0).length;
  const labelEvery = period === 'day' ? 5 : 2;

  // Open mistakes, grouped by topic: a topic missed twice or more is a repeated error
  const analysis = analyseMistakes(courseMistakes(mistakes, courseChoice));
  const worstTopic = analysis.topics[0];
  const mistakeCaption = analysis.level === 'clear'
    ? (mn ? 'Нээлттэй алдаа алга' : 'None open')
    : analysis.level === 'repeat'
      ? `${mn ? 'Тогтмол алддаг' : 'Keeps missing'}: ${worstTopic.syllabusRef}`
      : `${mn ? 'Цөөн алдсан' : 'A few misses'}: ${analysis.topics.length} ${mn ? 'сэдэв' : 'topics'}`;
  const pct = (done: number, total: number) => (total ? Math.round((done / total) * 100) : 0);

  const exitAverage = average(exitRecords.map(r => r.percent));
  const testAverage = average(courseTests.map(t => t.percent));
  const gameAverage = average(gameRecords.map(r => r.percent));

  return (
    <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-slate-950 border border-emerald-200/80 dark:border-slate-800 space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-extrabold text-slate-900 dark:text-white">{mn ? 'Өөрийгөө хянах' : 'Self-check'}</span>
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-white dark:bg-slate-900 border border-emerald-300 dark:border-teal-500/40 text-emerald-800 dark:text-teal-300">
          {alevel ? (course === 'a' ? 'A Level 9701' : 'AS Level 9701') : 'IGCSE 0620'}
        </span>
      </div>

      {/* One tab at a time: the others stay closed until chosen */}
      <div className="flex gap-1 overflow-x-auto pb-0.5">
        {TABS.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(tab === t.id ? null : t.id)}
            aria-pressed={tab === t.id}
            className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
              tab === t.id
                ? `${COURSE_SOLID[courseChoice]} border-transparent`
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {mn ? t.mn : t.en}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-2">
          {feedbackItems.length > 0 && (
            <div className={CARD}>
              <div className={HEAD}>{mn ? 'Багшийн санал' : 'Teacher feedback'}</div>
              <ul className="space-y-2">
                {feedbackItems.slice(0, 10).map(f => (
                  <li key={f.id} className="space-y-0.5">
                    <div className="flex justify-between gap-2 text-[11px]">
                      <span className="truncate text-slate-800 dark:text-slate-200">{f.label}</span>
                      <span className="shrink-0 font-mono text-slate-500 dark:text-slate-400">{f.at.slice(0, 10)}</span>
                    </div>
                    <div className="text-[11px] italic text-slate-700 dark:text-slate-300">{f.text}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-1.5">
            <button type="button" onClick={() => showTiles('all')} aria-pressed={!picking && tileView.mode === 'all'} className={viewButton(!picking && tileView.mode === 'all')}>
              {mn ? 'Бүгдийг харах' : 'Show all'}
            </button>
            <button type="button" onClick={() => showTiles('chosen')} aria-pressed={!picking && tileView.mode === 'chosen'} className={viewButton(!picking && tileView.mode === 'chosen')}>
              {mn ? 'Сонгосноо харах' : 'Show chosen'}
            </button>
            <button type="button" onClick={() => setPicking(p => !p)} aria-pressed={picking} className={viewButton(picking)}>
              {mn ? 'Сонгох' : 'Choose'}
            </button>
          </div>
          {!picking && tileView.mode === 'chosen' && tileView.chosen.length === 0 && (
            <div className={MUTED}>{mn ? 'Сонгосон хэсэг алга. "Сонгох" дээр дарж сонгоно уу.' : 'Nothing chosen yet. Press "Choose" to pick.'}</div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {tileShown('lessons') && (
              <Tile
                {...tileProps('lessons')}
                label={mn ? 'Хичээлийн шалгалт' : 'Lesson tickets'}
                value={`${exitRecords.length}`}
                percent={exitAverage ?? 0}
                caption={exitAverage === null ? (mn ? 'Хичээл дуусгаагүй' : 'No lesson finished yet') : `${mn ? 'Дундаж' : 'Average'} ${exitAverage}%`}
              />
            )}
            {tileShown('questions') && (
              <Tile
                {...tileProps('questions')}
                label={mn ? 'Бодсон асуулт' : 'Questions answered'}
                value={`${practice.length}`}
                percent={questionAccuracy ?? 0}
                caption={questionAccuracy === null ? (mn ? 'Асуулт бодоогүй' : 'No question answered yet') : `${mn ? 'Нарийвчлал' : 'Accuracy'} ${questionAccuracy}%`}
              />
            )}
            {tileShown('tests') && (
              <Tile
                {...tileProps('tests')}
                label={mn ? 'Шалгалт' : 'Tests'}
                value={`${courseTests.length}`}
                percent={testAverage ?? 0}
                caption={
                  lastTest
                    ? `${mn ? 'Сүүлийнх' : 'Last'} ${lastTest.percent}% · ${mn ? 'дундаж' : 'average'} ${testAverage}%`
                    : (mn ? 'Шалгалт өгөөгүй байна' : 'No test taken yet')
                }
              />
            )}
            {tileShown('games') && (
              <Tile
                {...tileProps('games')}
                label={mn ? 'Тоглоом, escape room' : 'Games and escape room'}
                value={`${gameRecords.length}`}
                percent={gameAverage ?? 0}
                caption={gameAverage === null ? (mn ? 'Тоглоом тоглоогүй' : 'No game played yet') : `${mn ? 'Дундаж' : 'Average'} ${gameAverage}%`}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {tileShown('topics') && (
              <Tile
                {...tileProps('topics')}
                label={mn ? 'Сэдэв дууссан' : 'Topics finished'}
                value={`${topicsDone} / ${topicsTotal}`}
                percent={pct(topicsDone, topicsTotal)}
                caption={mn ? 'Энэ хөтөлбөрийн сэдэв' : 'Topics in this course'}
              />
            )}
            {tileShown('words') && (
              <Tile
                {...tileProps('words')}
                label={alevel ? (mn ? '9701 түлхүүр үг' : '9701 key terms') : mn ? '0620 түлхүүр үг' : '0620 key words'}
                value={`${wordsDone} / ${wordsTotal}`}
                percent={pct(wordsDone, wordsTotal)}
                caption={alevel ? (mn ? 'Тайлбарлаж чадсан' : 'Explained') : mn ? 'Эзэмшсэн: хайрцаг 4–5' : 'Mastered: box 4–5'}
              />
            )}
            {tileShown('objectives') && (
              <Tile
                {...tileProps('objectives')}
                label={mn ? 'Сурах зорилт: «Чадна»' : 'Objectives: I can'}
                value={`${rated.lo.can} / ${rated.lo.total}`}
                percent={pct(rated.lo.can, rated.lo.total)}
                caption={mn ? `Үнэлсэн ${rated.lo.rated} / ${rated.lo.total}` : `Rated ${rated.lo.rated} / ${rated.lo.total}`}
              />
            )}
            {tileShown('rated') && (
              <Tile
                {...tileProps('rated')}
                label={mn ? 'Түлхүүр үг: «Чадна»' : 'Key words: I can'}
                value={`${rated.kw.can} / ${rated.kw.total}`}
                percent={pct(rated.kw.can, rated.kw.total)}
                caption={mn ? `Үнэлсэн ${rated.kw.rated} / ${rated.kw.total}` : `Rated ${rated.kw.rated} / ${rated.kw.total}`}
              />
            )}
            {tileShown('mistakes') && (
              <Tile
                {...tileProps('mistakes')}
                label={mn ? 'Засах алдаа' : 'Mistakes to fix'}
                value={`${analysis.open}`}
                percent={analysis.logged ? Math.round(((analysis.logged - analysis.open) / analysis.logged) * 100) : 100}
                caption={mistakeCaption}
                tone={analysis.level}
                action={analysis.level === 'clear' ? undefined : (
                  <button
                    onClick={() => jumpToTopic(worstTopic.topicId)}
                    className="text-left text-[10px] font-bold text-emerald-700 dark:text-teal-300 hover:underline"
                  >
                    {mn ? 'Давтах →' : 'Review →'}
                  </button>
                )}
              />
            )}
          </div>
        </div>
      )}

      {tab === 'activity' && (
        <div className={CARD}>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className={HEAD}>{mn ? 'Ажилласан хугацаа' : 'Work done over time'}</div>
            <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800">
              {PERIODS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPeriod(p.id)}
                  aria-pressed={period === p.id}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    period === p.id ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {mn ? p.mn : p.en}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-[10px] text-slate-600 dark:text-slate-400">
            {CHART_KINDS.map(k => (
              <span key={k.id} className="inline-flex items-center gap-1">
                <span className={`w-2.5 h-2.5 rounded-sm ${k.bar}`} />
                {mn ? k.mn : k.en}
              </span>
            ))}
          </div>
          <div className="flex items-end gap-1 h-40">
            {buckets.map(b => (
              <div
                key={b.start.getTime()}
                className="flex-1 min-w-0 h-full flex flex-col justify-end"
                title={`${bucketLabel(b.start, period)}: ${b.total}`}
              >
                <div className="flex flex-col-reverse w-full overflow-hidden rounded-t" style={{ height: `${(b.total / busiest) * 100}%` }}>
                  {CHART_KINDS.map(k =>
                    b.counts[k.id] > 0 ? (
                      <div key={k.id} className={k.bar} style={{ height: `${(b.counts[k.id] / b.total) * 100}%` }} />
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* A label may run past its own column, so it is placed over the columns it needs and not cut short */}
          <div className="flex gap-1">
            {buckets.map((b, i) => (
              <div key={b.start.getTime()} className="relative flex-1 min-w-0 h-3">
                {i % labelEvery === 0 && (
                  <span className="absolute left-0 top-0 whitespace-nowrap text-[9px] font-mono text-slate-500 dark:text-slate-400">
                    {bucketLabel(b.start, period)}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className={MUTED}>
            {mn ? `Нийт: ${chartTotal} · идэвхтэй: ${activeBuckets}` : `Total: ${chartTotal} · active: ${activeBuckets}`}
          </div>
        </div>
      )}

      {tab === 'lessons' && (
        <div className={CARD}>
          <div className={HEAD}>{mn ? 'Хичээлийн шалгалт' : 'Lesson exit tickets'}</div>
          <div className={MUTED}>
            {mn ? '60%-иас дээш бол дараагийн хичээл нээгдэнэ.' : 'Above 60% opens the next lesson.'}
          </div>
          {exitRecords.length === 0 ? (
            <div className={MUTED}>{mn ? 'Хичээлийн шалгалт өгөөгүй байна' : 'No lesson ticket done yet'}</div>
          ) : (
            <>
              <div className={MUTED}>
                {mn ? `Дуусгасан: ${exitRecords.length} · дундаж ${exitAverage}%` : `Done: ${exitRecords.length} · average ${exitAverage}%`}
              </div>
              <ul className="space-y-1">
                {exitRecords.slice(0, 30).map(r => (
                  <ResultRow key={r.id} record={r} mn={mn} grade />
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {tab === 'exams' && (
        <div className="space-y-2.5">
          <div className={CARD}>
            <div className={HEAD}>{mn ? 'Шалгалтууд' : 'Tests'}</div>
            {courseTests.length === 0 ? (
              <div className={MUTED}>{mn ? 'Шалгалт өгөөгүй байна' : 'No test taken yet'}</div>
            ) : (
              <ul className="space-y-1">
                {courseTests.slice(0, 10).map(a => {
                  const title = testTitle(a.testId);
                  return (
                    <li key={a.id} className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="truncate text-slate-800 dark:text-slate-200">{mn ? title.mn : title.en}</span>
                      <span className={`shrink-0 font-mono font-bold ${a.percent >= 60 ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                        {a.earned}/{a.total} · {a.percent}%
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className={CARD}>
            <div className={HEAD}>{mn ? 'Дасгалын нарийвчлал' : 'Accuracy by paper'}</div>
            {papers.length === 0 ? (
              <div className={MUTED}>
                {mn ? 'Асуулт бодоогүй байна. Бодсон асуулт бүр энд тооцогдоно.' : 'No questions answered yet. Each one you answer is counted here.'}
              </div>
            ) : (
              <div className="space-y-1.5">
                {papers.map(p => (
                  <div key={p.paper} className="space-y-0.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-700 dark:text-slate-300">{PAPER_LABEL[p.paper][mn ? 'mn' : 'en']}</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{p.percent}% · {p.questions}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${p.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={CARD}>
            <div className={HEAD}>{mn ? 'Бүлгээр' : 'By chapter'}</div>
            <div className={MUTED}>
              {mn
                ? `${chapters.length} бүлгийн ${chaptersAnswered} нь бодогдсон`
                : `${chaptersAnswered} of ${chapters.length} chapters answered`}
            </div>
            <ul className="space-y-1.5">
              {chapters.map(ch => {
                const r = chapterResults[ch.id];
                const good = (r.percent ?? 0) >= 60;
                const s = chapterTestLine(ch);
                return (
                  <li key={ch.id} className="space-y-0.5">
                    <div className="flex justify-between gap-2 text-[11px]">
                      <span className="truncate text-slate-700 dark:text-slate-300">
                        {ch.number}. {mn ? ch.titleMn : ch.titleEn}
                      </span>
                      {r.bank === 0 ? (
                        <span className="shrink-0 italic text-slate-400 dark:text-slate-500">{mn ? 'Асуулт бэлэн биш' : 'No questions yet'}</span>
                      ) : r.answered === 0 ? (
                        <span className="shrink-0 text-slate-500 dark:text-slate-400">{mn ? 'Өгөөгүй' : 'Not done yet'}</span>
                      ) : (
                        <span className={`shrink-0 font-mono font-bold ${good ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                          {r.percent}% · {r.answered}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400">
                      {mn ? 'Сэдвийн шалгалт' : 'End-of-topic checks'}: {s.checks.length}/{s.topics}
                      {s.average !== null ? ` · ${s.average}%` : ''}
                      {s.hasChapterTest && (
                        <>
                          {' · '}
                          {mn ? 'Бүлгийн шалгалт' : 'Chapter test'}: {s.chapterTest ? `${s.chapterTest.percent}%` : (mn ? 'өгөөгүй' : 'not taken')}
                        </>
                      )}
                    </div>
                    {r.bank > 0 && (
                      <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div className={`h-full rounded-full ${good ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${r.percent ?? 0}%` }} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={CARD}>
            <div className={HEAD}>{mn ? 'Давтах сэдвүүд' : 'Topics to review'}</div>
            {weak.length === 0 ? (
              <div className={MUTED}>
                {mn
                  ? 'Нэг сэдэвт 2 ба түүнээс дээш асуулт бодсоны дараа сул сэдэв энд харагдана.'
                  : 'A topic appears here once you have answered 2 or more questions on it.'}
              </div>
            ) : (
              <ul className="space-y-1">
                {weak.map(w => {
                  const t = courseTopicList.find(x => x.id === w.topicId);
                  return (
                    <li key={w.topicId} className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="truncate text-slate-800 dark:text-slate-200">
                        {t ? `${t.syllabusRef} ${mn ? t.titleMn : t.titleEn}` : w.topicId}
                      </span>
                      <span className="shrink-0 font-mono font-bold text-rose-700 dark:text-rose-300">{w.percent}% · {w.questions}</span>
                      <button
                        onClick={() => jumpToTopic(w.topicId)}
                        className="shrink-0 text-[10px] font-bold text-emerald-700 dark:text-teal-300 hover:underline"
                      >
                        {mn ? 'Давтах →' : 'Review →'}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className={CARD}>
            <div className={HEAD}>{mn ? 'Past paper-ийн үр дүн' : 'Past paper results'}</div>
            {alevel ? (
              <div className={MUTED}>{mn ? '9701-ийн past paper-үүд бэлэн биш байна' : 'No 9701 past papers yet'}</div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-700 dark:text-slate-300">{mn ? 'Бүгд (2017–2026)' : 'All papers (2017–2026)'}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {pastAnswers.length ? `${accuracyOf(pastAnswers)}% · ${pastAnswers.length}` : (mn ? 'Өгөөгүй' : 'Not done')}
                  </span>
                </div>
                {pastByYear.map(y => (
                  <div key={y.year} className="space-y-0.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-700 dark:text-slate-300">{y.year}</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {y.percent === null ? (mn ? 'Өгөөгүй' : 'Not done') : `${y.percent}% · ${y.questions}`}
                      </span>
                    </div>
                    {y.percent !== null && (
                      <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${y.percent}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'games' && (
        <div className={CARD}>
          <div className={HEAD}>{mn ? 'Тоглоом ба escape room' : 'Games and escape room'}</div>
          <div className={MUTED}>{mn ? 'Энд зөвхөн тоглосон үр дүн харагдана.' : 'Only the results are shown here.'}</div>
          {gameRecords.length === 0 ? (
            <div className={MUTED}>{mn ? 'Тоглоом тоглоогүй байна' : 'No game played yet'}</div>
          ) : (
            <>
              <div className={MUTED}>
                {mn ? `Тоглосон: ${gameRecords.length} · дундаж ${gameAverage}%` : `Played: ${gameRecords.length} · average ${gameAverage}%`}
              </div>
              <ul className="space-y-1">
                {gameRecords.slice(0, 30).map(r => (
                  <ResultRow key={r.id} record={r} mn={mn} />
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <button
        onClick={onOpenProgress}
        className="w-full px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-teal-300 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-teal-500/40 hover:bg-emerald-100 dark:hover:bg-slate-800"
      >
        {mn ? 'Хичээл рүү очих →' : 'Go to the lessons →'}
      </button>
    </div>
  );
};
