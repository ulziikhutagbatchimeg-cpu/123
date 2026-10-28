import React, { useState } from 'react';
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
import { MOCK_TESTS } from '../data/mockTests';
import { CAMBRIDGE_PAST_PAPERS_2017_2024 } from '../data/pastPapersData';
import { cambridgeGrade } from '../lib/grade';
import { periodBuckets, useActivity, type ActivityRecord, type Period } from '../lib/activity';
import { useAuthUser, useStudentFeedback } from '../lib/cloud';

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

const Tile: React.FC<{
  label: string;
  value: string;
  percent: number;
  caption: string;
  tone?: MistakeLevel;
  action?: React.ReactNode;
}> = ({ label, value, percent, caption, tone, action }) => {
  const style = tone ? LEVEL_STYLE[tone] : undefined;
  return (
    <div className={`p-2.5 rounded-xl border space-y-1 ${style ? style.box : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800'}`}>
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</div>
      <div className={`text-base font-extrabold font-mono ${style ? style.text : 'text-slate-900 dark:text-white'}`}>{value}</div>
      <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div className={`h-full rounded-full ${style ? style.bar : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, Math.max(0, percent))}%` }} />
      </div>
      <div className="text-[10px] leading-snug text-slate-500 dark:text-slate-400">{caption}</div>
      {action}
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
  const [tab, setTab] = useState<Tab>('overview');
  const [period, setPeriod] = useState<Period>('day');
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

  // Full tests of this course, newest first (9701 tests are not in the app yet)
  const courseTests = alevel ? [] : [...testAttempts].sort((x, y) => y.takenAt - x.takenAt);
  const lastTest = courseTests[0] as TestAttempt | undefined;

  // Lesson exit tickets, games and the escape room of this course, newest first
  const courseRecords = activity.filter(r => r.course === courseChoice);
  const exitRecords = courseRecords.filter(r => r.kind === 'exit');
  const gameRecords = courseRecords.filter(r => r.kind !== 'exit');

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

  // The teacher's feedback on this course's results, newest first, each with what it is about
  const feedbackItems = Object.entries(feedback)
    .map(([id, f]) => {
      const record = courseRecords.find(r => r.id === id);
      if (record) return { id, text: f.text, at: f.at, label: mn ? record.label.mn : record.label.en };
      const test = courseTests.find(t => t.id === id);
      if (test) {
        const found = MOCK_TESTS.find(x => x.id === test.testId);
        return { id, text: f.text, at: f.at, label: found ? (mn ? found.titleMn : found.titleEn) : test.testId };
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
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
              tab === t.id
                ? 'bg-emerald-600 border-emerald-600 text-white dark:bg-teal-600 dark:border-teal-600'
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
          <div className="grid grid-cols-2 gap-2">
            <Tile
              label={mn ? 'Хичээлийн шалгалт' : 'Lesson tickets'}
              value={`${exitRecords.length}`}
              percent={exitAverage ?? 0}
              caption={exitAverage === null ? (mn ? 'Хичээл дуусгаагүй' : 'No lesson finished yet') : `${mn ? 'Дундаж' : 'Average'} ${exitAverage}%`}
            />
            <Tile
              label={mn ? 'Бодсон асуулт' : 'Questions answered'}
              value={`${practice.length}`}
              percent={questionAccuracy ?? 0}
              caption={questionAccuracy === null ? (mn ? 'Асуулт бодоогүй' : 'No question answered yet') : `${mn ? 'Нарийвчлал' : 'Accuracy'} ${questionAccuracy}%`}
            />
            <Tile
              label={mn ? 'Бүтэн шалгалт' : 'Full tests'}
              value={`${courseTests.length}`}
              percent={testAverage ?? 0}
              caption={
                alevel
                  ? (mn ? '9701-ийн шалгалт бэлэн биш' : 'No 9701 test yet')
                  : lastTest
                    ? `${mn ? 'Сүүлийнх' : 'Last'} ${lastTest.percent}% · ${mn ? 'дундаж' : 'average'} ${testAverage}%`
                    : (mn ? 'Шалгалт өгөөгүй байна' : 'No test taken yet')
              }
            />
            <Tile
              label={mn ? 'Тоглоом, escape room' : 'Games and escape room'}
              value={`${gameRecords.length}`}
              percent={gameAverage ?? 0}
              caption={gameAverage === null ? (mn ? 'Тоглоом тоглоогүй' : 'No game played yet') : `${mn ? 'Дундаж' : 'Average'} ${gameAverage}%`}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Tile
              label={mn ? 'Сэдэв дууссан' : 'Topics finished'}
              value={`${topicsDone} / ${topicsTotal}`}
              percent={pct(topicsDone, topicsTotal)}
              caption={mn ? 'Энэ хөтөлбөрийн сэдэв' : 'Topics in this course'}
            />
            <Tile
              label={alevel ? (mn ? '9701 түлхүүр үг' : '9701 key terms') : mn ? '0620 түлхүүр үг' : '0620 key words'}
              value={`${wordsDone} / ${wordsTotal}`}
              percent={pct(wordsDone, wordsTotal)}
              caption={alevel ? (mn ? 'Тайлбарлаж чадсан' : 'Explained') : mn ? 'Эзэмшсэн: хайрцаг 4–5' : 'Mastered: box 4–5'}
            />
            <Tile
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
            <div className={HEAD}>{mn ? 'Бүтэн шалгалтууд' : 'Full tests'}</div>
            {alevel ? (
              <div className={MUTED}>{mn ? '9701-ийн бүтэн шалгалт бэлэн биш байна' : 'No 9701 full test yet'}</div>
            ) : courseTests.length === 0 ? (
              <div className={MUTED}>{mn ? 'Шалгалт өгөөгүй байна' : 'No test taken yet'}</div>
            ) : (
              <ul className="space-y-1">
                {courseTests.slice(0, 10).map(a => {
                  const test = MOCK_TESTS.find(x => x.id === a.testId);
                  return (
                    <li key={a.id} className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="truncate text-slate-800 dark:text-slate-200">{test ? (mn ? test.titleMn : test.titleEn) : a.testId}</span>
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
            <div className={HEAD}>{mn ? 'Past paper-үүд' : 'Past papers'}</div>
            {alevel ? (
              <div className={MUTED}>{mn ? '9701-ийн past paper-үүд бэлэн биш байна' : 'No 9701 past papers yet'}</div>
            ) : pastAnswers.length === 0 ? (
              <div className={MUTED}>{mn ? 'Past paper асуулт бодоогүй байна' : 'No past paper question answered yet'}</div>
            ) : (
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-700 dark:text-slate-300">{mn ? 'Бодсон асуулт (2017–2024)' : 'Questions answered (2017–2024)'}</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {accuracyOf(pastAnswers)}% · {pastAnswers.length}
                </span>
              </div>
            )}
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
        {mn ? 'Миний явцыг харах →' : 'See my progress →'}
      </button>
    </div>
  );
};
