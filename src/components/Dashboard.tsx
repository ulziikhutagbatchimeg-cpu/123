import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ChemText } from './common/ChemText';
import { WebStructure } from './WebStructure';
import { courseMistakes, courseTopics } from '../data/courseScope';
import { useActivity } from '../lib/activity';
import { useLeitnerDeck } from '../lib/leitner';
import { ALEVEL_CARDS_KEY, ALEVEL_LEITNER_CARDS, alevelCourseCards } from '../data/alevelFlashcards';
import { HIGHLIGHT_HEADING } from '../lib/highlight';
import { OverviewVideo } from './OverviewVideo';
import { NoticePanel } from './NoticePanel';
import { useMyChecklist } from './MyChecklist';
import { PASS_ABOVE } from '../lib/chapterChecklist';
import { useStudyDays } from '../lib/studyTime';
import { dayKey } from '../lib/resultSync';
import { useAuthUser, useEnrollment, isTeacher } from '../lib/cloud';
import { ArrowRight, AlertCircle, Layers, CheckCircle2, Clock, ListChecks, Target, TicketCheck } from 'lucide-react';

// The home page, in the order a student needs it: a greeting, the lesson to continue (from the checklist, with what is
// left in it), four numbers, the teacher's notices, today's 40 minutes with today's goal, the mistakes to fix, then the map
// of the site and the short video tour.

const WEEKDAY_MN = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
const WEEKDAY_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// A length of time, as hours and minutes
const minutesText = (seconds: number, mn: boolean): string => {
  const m = Math.round(seconds / 60);
  if (m < 60) return mn ? `${m} мин` : `${m} min`;
  return mn ? `${Math.floor(m / 60)} ц ${m % 60} мин` : `${Math.floor(m / 60)} h ${m % 60} min`;
};

// Today's goal: how many 40-minute lessons the student chose to finish today. It is kept on this device, for that day only.
const GOAL_KEY = 'chem_today_goal';
const readTodayGoal = (): number | null => {
  try {
    const raw = window.localStorage.getItem(GOAL_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as { day?: string; lessons?: number };
    return saved.day === new Date().toDateString() && typeof saved.lessons === 'number' ? saved.lessons : null;
  } catch {
    return null;
  }
};
const writeTodayGoal = (lessons: number | null) => {
  try {
    if (lessons === null) window.localStorage.removeItem(GOAL_KEY);
    else window.localStorage.setItem(GOAL_KEY, JSON.stringify({ day: new Date().toDateString(), lessons }));
  } catch {
    // Storage can be blocked; the goal then lasts for this visit only
  }
};

// The student's own answer to whether today matched the goal: kept on this device, for that day only
const KEPT_KEY = 'chem_goal_kept';
const GOAL_ANSWERS: { id: string; en: string; mn: string }[] = [
  { id: 'yes', en: 'Yes', mn: 'Тийм' },
  { id: 'partly', en: 'Partly', mn: 'Хэсэгчлэн' },
  { id: 'no', en: 'No', mn: 'Үгүй' }
];
const readGoalKept = (): string | null => {
  try {
    const raw = window.localStorage.getItem(KEPT_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as { day?: string; answer?: string };
    return saved.day === new Date().toDateString() && saved.answer ? saved.answer : null;
  } catch {
    return null;
  }
};
const writeGoalKept = (answer: string) => {
  try {
    window.localStorage.setItem(KEPT_KEY, JSON.stringify({ day: new Date().toDateString(), answer }));
  } catch {
    // Storage can be blocked; the answer then lasts for this visit only
  }
};

export const Dashboard: React.FC = () => {
  const { mode } = useLanguage();
  const {
    setActiveTab,
    jumpToTopic,
    stats,
    mistakes,
    leitnerCards,
    programme,
    courseChoice
  } = useApp();
  const mn = mode === 'mn';

  // Everything on this page follows the programme being studied: IGCSE 0620, or the AS or A Level 9701 chosen
  const isIgcse = programme === 'igcse';
  const courseLine =
    courseChoice === 'igcse'
      ? 'Cambridge IGCSE Chemistry 0620 · 2026–2028'
      : courseChoice === 'a'
        ? 'Cambridge A Level Chemistry 9701 · 2025–2027'
        : 'Cambridge AS Level Chemistry 9701 · 2025–2027';
  const unresolvedMistakes = courseMistakes(mistakes, courseChoice).filter(m => !m.resolved);
  const activity = useActivity();
  // The greeting: the name the student gave when enrolling, else the account's name
  const { user } = useAuthUser();
  const enrollment = useEnrollment(user && !isTeacher(user) ? user.uid : undefined, courseChoice);
  const name = (enrollment?.name || user?.displayName || '').trim();
  const now = new Date();
  const dateLine = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}, ${(mn ? WEEKDAY_MN : WEEKDAY_EN)[now.getDay()]}`;
  // The checklist of the programme: its next step is the card to continue; its objectives give the self-check number
  const checklist = useMyChecklist();
  const next = checklist.next;
  const selfCheck = checklist.chapters.reduce(
    (n, ch) => ({ rated: n.rated + (ch.lo?.rated ?? 0) + (ch.kw?.rated ?? 0), total: n.total + (ch.lo?.total ?? 0) + (ch.kw?.total ?? 0) }),
    { rated: 0, total: 0 }
  );
  // The time studied in the last 7 days of this programme (lib/studyTime keeps it by day)
  const studyDays = useStudyDays();
  const weekFrom = dayKey(Date.now() - 6 * 24 * 60 * 60 * 1000);
  const weekSeconds = Object.entries(studyDays).reduce((n, [key, s]) => {
    const [course, day] = key.split('|');
    return course === courseChoice && day >= weekFrom ? n + s : n;
  }, 0);
  // The cards to review: the 0620 key words, or the 9701 key terms of the AS or A Level course
  const alevelDeck = useLeitnerDeck(ALEVEL_CARDS_KEY, ALEVEL_LEITNER_CARDS);
  const courseCards = isIgcse ? leitnerCards : alevelCourseCards(alevelDeck.cards, courseChoice);
  const dueCards = courseCards.filter(c => c.box <= 2 || c.nextReviewDate <= Date.now());

  // The topic of today's new lesson: the first topic of the chapter the checklist says to continue, so the plan below and
  // the card above point to the same place; with nothing left, the first topic not yet passed
  const nextTopicId = checklist.next?.chapter.firstTopicId;
  const currentTopic =
    (nextTopicId ? courseTopics(courseChoice).find(t => t.id === nextTopicId) : undefined) ??
    courseTopics(courseChoice).find(t => !stats.completedTopics.includes(t.id)) ??
    courseTopics(courseChoice)[0] ??
    CURRICULUM_CHAPTERS[0].topics[0];

  // Today: a 40-minute plan the student can follow alone: review 5 minutes, the lesson 25, the quick check 5 and the
  // mistake log 5. Each step shows its minutes and whether it is done, and one press takes the student there.
  // The new lesson and its quick check are the checklist's next lesson, the same as the card at the top; with no lesson left,
  // the topic's end-of-topic test decides
  const nextLesson = checklist.next?.lesson ?? null;
  const topicDone = nextLesson ? false : stats.completedTopics.includes(currentTopic.id);
  const quickDone = nextLesson ? (nextLesson.parts.find(p => p.id === 'quick')?.done ?? false) : topicDone;
  const lessonName = nextLesson
    ? `${mode === 'mn' ? nextLesson.def.code.mn : nextLesson.def.code.en}${nextLesson.def.code.en.startsWith('L') ? ` · ${mode === 'mn' ? nextLesson.def.title.mn : nextLesson.def.title.en}` : ''}`
    : `${currentTopic.syllabusRef} · ${mode === 'mn' ? currentTopic.titleMn : currentTopic.titleEn}`;
  const today = [
    {
      key: 'review',
      minutes: 5,
      done: dueCards.length === 0,
      title: mode === 'mn' ? 'Давтлага' : 'Review',
      detail:
        dueCards.length === 0
          ? (mode === 'mn' ? 'Өнөөдрийн давтлага дууссан' : 'Today’s review is done')
          : (mode === 'mn' ? `${dueCards.length} карт давтахад бэлэн` : `${dueCards.length} cards ready`),
      action: () => setActiveTab('flashcards')
    },
    {
      key: 'topic',
      minutes: 25,
      done: topicDone,
      title: mode === 'mn' ? 'Шинэ хичээл' : 'New lesson',
      detail: topicDone ? (mode === 'mn' ? 'Дууссан' : 'Done') : lessonName,
      action: () => jumpToTopic(currentTopic.id)
    },
    {
      key: 'check',
      minutes: 5,
      done: quickDone,
      title: mode === 'mn' ? 'Түргэн шалгалт' : 'Quick check',
      detail: quickDone
        ? (mode === 'mn' ? 'Дууссан' : 'Done')
        : (mode === 'mn' ? 'Хичээлийн төгсгөлийн богино шалгалт' : 'The short check at the end of the lesson'),
      action: () => jumpToTopic(currentTopic.id)
    },
    {
      key: 'mistake',
      minutes: 5,
      done: unresolvedMistakes.length === 0,
      title: mode === 'mn' ? 'Алдаагаа бүртгэх' : 'Log your mistakes',
      detail:
        unresolvedMistakes.length === 0
          ? (mode === 'mn' ? 'Засах алдаа алга' : 'No open mistakes')
          : (mode === 'mn' ? `${unresolvedMistakes.length} алдаа засахгүй байна` : `${unresolvedMistakes.length} still open`),
      action: () => setActiveTab('mistakes')
    }
  ];

  // The goal the student chose for today, and the 40-minute lessons of this course finished today
  const [goalLessons, setGoalLessons] = useState<number | null>(readTodayGoal);
  const chooseGoal = (lessons: number | null) => {
    writeTodayGoal(lessons);
    setGoalLessons(lessons);
  };
  // The task: did today match the goal? The student answers once a day.
  const [goalKept, setGoalKept] = useState<string | null>(readGoalKept);
  const judgeGoal = (answer: string) => {
    writeGoalKept(answer);
    setGoalKept(answer);
  };
  const allTopics = courseTopics(courseChoice);
  const topicsFinished = allTopics.filter(t => stats.completedTopics.includes(t.id)).length;
  const exitRecords = activity.filter(r => r.course === courseChoice && r.kind === 'exit');
  // The 40-minute lessons of this course finished today
  const lessonsToday = exitRecords.filter(r => new Date(r.takenAt).toDateString() === new Date().toDateString()).length;
  const exitAverage = exitRecords.length
    ? Math.round(exitRecords.reduce((n, r) => n + r.percent, 0) / exitRecords.length)
    : null;

  // Spaced repetition: the flashcards due today. It sits beside the Teacher area card in the web structure.
  const reviewCard = (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <span className={HIGHLIGHT_HEADING}>
          {mode === 'mn' ? 'Лейтнерийн Флаш карт' : 'Spaced Repetition'}
        </span>
        <Layers className="w-4 h-4 text-amber-500" />
      </div>

      <div className="text-sm text-slate-600 dark:text-slate-300">
        {dueCards.length === 0
          ? (mode === 'mn' ? 'Өнөөдрийн давтлага дууссан. Сайн явж байна!' : 'Today’s review is done. Well done!')
          : (mode === 'mn'
            ? `Өнөөдөр давтах ${dueCards.length} химийн нэр томьёо байна.`
            : `${dueCards.length} chemical terms are ready for review today.`)}
      </div>

      <button
        onClick={() => setActiveTab('flashcards')}
        className="mt-auto w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <span>{mode === 'mn' ? 'Флаш карт давтах' : 'Start Review Session'}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  // One of the four numbers under the card: what it counts, the number, a short note, and the page it opens
  const stat = (key: string, icon: React.ReactNode, label: string, value: string, note: string, onClick: () => void, tone = 'text-slate-900 dark:text-white') => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500/60"
    >
      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
        {icon}
        {label}
      </span>
      <span className={`text-2xl font-bold ${tone}`}>{value}</span>
      <span className="text-xs text-slate-500 dark:text-slate-400">{note}</span>
    </button>
  );

  // The lesson to continue: what is still to do in it, in order
  const nextItems = next?.lesson
    ? [
        ...next.lesson.parts.map(p => ({ key: p.id, done: p.done, text: mn ? p.label.mn : p.label.en })),
        {
          key: 'exit',
          done: next.lesson.passed,
          text:
            next.lesson.score !== null && !next.lesson.passed
              ? mn ? `Гарах билетээ ${PASS_ABOVE}%-иас дээш авах (одоо ${Math.round(next.lesson.score)}%)` : `Get the exit ticket above ${PASS_ABOVE}% (now ${Math.round(next.lesson.score)}%)`
              : mn ? `Гарах билетээ өгч ${PASS_ABOVE}%-иас дээш авах` : `Take the exit ticket and get above ${PASS_ABOVE}%`
        }
      ]
    : next
      ? [
          ...next.chapter.topics.filter(t => !t.passed).slice(0, 3).map(t => ({ key: t.id, done: false, text: mn ? `${t.label.mn} — сэдвийн шалгалт` : `${t.label.en} — end-of-topic test` })),
          ...(next.chapter.lo && next.chapter.lo.rated < next.chapter.lo.total
            ? [{ key: 'lo', done: false, text: mn ? `Сурах зорилтоо үнэлэх (${next.chapter.lo.rated}/${next.chapter.lo.total})` : `Rate the objectives (${next.chapter.lo.rated}/${next.chapter.lo.total})` }]
            : [])
        ]
      : [];
  const chapterPct = next && next.chapter.total > 0 ? Math.round((next.chapter.done / next.chapter.total) * 100) : 0;
  const coursePct = checklist.chapters.length ? Math.round((checklist.doneChapters / checklist.chapters.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-16">
      {/* The greeting, the programme and today's date */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {name ? (mn ? `Сайн уу, ${name}` : `Hello, ${name}`) : mn ? 'Сайн уу' : 'Hello'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {courseLine} · {dateLine}
        </p>
      </div>

      {/* The lesson to continue, from the checklist: what is left in it, the chapter's progress, and one press to go on */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        {next ? (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {next.blocking
                  ? mn ? `Үргэлжлүүлэх · ${next.chapter.number}-р бүлэг · дараагийн хичээл нээгдэхэд` : `Continue · chapter ${next.chapter.number} · to open the next lesson`
                  : mn ? `Дараагийн ажил · ${next.chapter.number}-р бүлэг` : `Next · chapter ${next.chapter.number}`}
              </div>
              {/* The lesson code (L3) stays plain text: the chemistry formatting would turn its number into a subscript */}
              <h2 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
                {next.lesson && <span>{mn ? next.lesson.def.code.mn : next.lesson.def.code.en} · </span>}
                <ChemText>
                  {next.lesson && next.lesson.def.code.en.startsWith('L')
                    ? mn ? next.lesson.def.title.mn : next.lesson.def.title.en
                    : mn ? next.chapter.title.mn : next.chapter.title.en}
                </ChemText>
              </h2>
              {nextItems.length > 0 && (
                <ul className="space-y-1.5">
                  {nextItems.map(item => (
                    <li key={item.key} className={`flex items-center gap-2 text-sm ${item.done ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-black ${item.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-400 bg-white text-transparent dark:bg-slate-900'}`}>
                        ✓
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-1 pt-1">
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${chapterPct}%` }} />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {mn
                    ? `${next.chapter.number}-р бүлэг ${chapterPct}% · ${checklist.chapters.length} бүлгээс ${checklist.doneChapters} дууссан (${coursePct}%)`
                    : `Chapter ${next.chapter.number} ${chapterPct}% · ${checklist.doneChapters} of ${checklist.chapters.length} chapters done (${coursePct}%)`}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
              <button
                type="button"
                onClick={() => next.chapter.firstTopicId && jumpToTopic(next.chapter.firstTopicId)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-500"
              >
                {mn ? 'Үргэлжлүүлэх' : 'Continue'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('toolkit')}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <ListChecks className="h-4 w-4" aria-hidden="true" />
                {mn ? 'Хийх ажлын хүснэгт' : 'My checklist'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-200">
            <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
            <div>
              <div className="text-lg font-bold">{mn ? 'Бүх ажил дууссан' : 'Everything is done'}</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {mn ? 'Энэ хөтөлбөрийн бүх хичээл, шалгалт, үнэлгээг хийжээ. Дадлага хэсэгт давтаарай.' : 'Every lesson, test and self-check of this programme is done. Keep practising in Practice.'}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Four numbers, each opening its page */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stat(
          'tickets',
          <TicketCheck className="h-3.5 w-3.5" aria-hidden="true" />,
          mn ? 'Гарах билетийн дундаж' : 'Exit ticket average',
          exitAverage === null ? '—' : `${exitAverage}%`,
          exitRecords.length ? (mn ? `${exitRecords.length} билет` : `${exitRecords.length} tickets`) : mn ? 'Өгөөгүй байна' : 'None yet',
          () => setActiveTab('student')
        )}
        {stat(
          'week',
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />,
          mn ? 'Энэ 7 хоногт суралцсан' : 'Studied in the last 7 days',
          weekSeconds ? minutesText(weekSeconds, mn) : '—',
          mn ? `Өнөөдөр ${lessonsToday} хичээл` : `${lessonsToday} lesson(s) today`,
          () => setActiveTab('student')
        )}
        {stat(
          'self',
          <Target className="h-3.5 w-3.5" aria-hidden="true" />,
          mn ? 'Өөрийн үнэлгээ' : 'Self-check',
          selfCheck.total ? `${Math.round((selfCheck.rated / selfCheck.total) * 100)}%` : '—',
          mn ? `${selfCheck.rated}/${selfCheck.total} зорилт, түлхүүр үг` : `${selfCheck.rated}/${selfCheck.total} objectives and key words`,
          () => setActiveTab('toolkit')
        )}
        {stat(
          'mistakes',
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />,
          mn ? 'Засах алдаа' : 'Mistakes to fix',
          String(unresolvedMistakes.length),
          mn ? 'Алдааны сангаас' : 'From the mistake notebook',
          () => setActiveTab('mistakes'),
          unresolvedMistakes.length > 0 ? 'text-rose-700 dark:text-rose-300' : 'text-slate-900 dark:text-white'
        )}
      </div>

      {/* The teacher's notices */}
      <NoticePanel />

      {/* Today: the 40-minute plan, each step with its minutes, done or still to do; one press opens the place to do it.
          Beside it, today's goal: how many lessons, and at the end of the day whether it was kept. */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className={HIGHLIGHT_HEADING}>{mn ? 'Өнөөдөр · 40 минут' : 'Today · 40 minutes'}</div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">{mn ? 'Өнөөдрийн зорилго:' : 'Today’s goal:'}</span>
            {goalLessons === null ? (
              <>
                <span className="text-slate-500 dark:text-slate-400">{mn ? 'хэдэн хичээл үзэх вэ?' : 'how many lessons?'}</span>
                {[1, 2, 3].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => chooseGoal(n)}
                    className="h-7 w-7 rounded-lg border border-slate-300 bg-white font-bold text-slate-800 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    {n}
                  </button>
                ))}
              </>
            ) : (
              <>
                <span className="font-bold text-slate-900 dark:text-white">
                  {Math.min(lessonsToday, goalLessons)} / {goalLessons} {mn ? 'хичээл' : 'lessons'}
                </span>
                <button type="button" onClick={() => chooseGoal(null)} className="font-semibold text-slate-500 hover:underline dark:text-slate-400">
                  {mn ? 'Өөрчлөх' : 'Change'}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {today.map((step, i) => (
            <button
              key={step.key}
              onClick={step.action}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition-colors hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500/60"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  step.done
                    ? 'bg-emerald-600 text-white'
                    : 'border border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                }`}
              >
                {step.done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {step.minutes} {mn ? 'мин' : 'min'}
                </span>
                <span className="block text-sm font-bold text-slate-900 dark:text-white">{step.title}</span>
                <span className="block text-xs leading-snug text-slate-600 dark:text-slate-400">{step.detail}</span>
              </span>
            </button>
          ))}
        </div>
        {/* At the end of the day: did today match the goal? */}
        {goalLessons !== null && (
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {lessonsToday >= goalLessons
                ? mn ? 'Зорилгоо биелүүллээ. Өнөөдрийн зорилгодоо нийцсэн үү?' : 'Goal reached. Did today match your goal?'
                : mn ? `${goalLessons - lessonsToday} хичээл үлдсэн. Өнөөдрийн зорилгодоо нийцсэн үү?` : `${goalLessons - lessonsToday} lesson(s) to go. Did today match your goal?`}
            </span>
            {GOAL_ANSWERS.map(a => (
              <button
                key={a.id}
                type="button"
                aria-pressed={goalKept === a.id}
                onClick={() => judgeGoal(a.id)}
                className={`rounded-lg border px-3 py-1 font-bold transition-colors ${
                  goalKept === a.id
                    ? 'border-transparent bg-emerald-600 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                }`}
              >
                {mn ? a.mn : a.en}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Needs revision: the mistakes to go over, from the mistake notebook */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <div className={HIGHLIGHT_HEADING}>{mn ? 'Давтах хэрэгтэй' : 'Needs revision'}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {mn ? 'Алдааны сангаас' : 'From your mistake notebook'}
                {unresolvedMistakes.length > 0 ? ` · ${unresolvedMistakes.length}` : ''}
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('mistakes')}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-700 hover:underline dark:text-teal-400"
          >
            <span>{mn ? 'Бүгдийг харах' : 'View all'}</span>
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>

        {unresolvedMistakes.length === 0 ? (
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
            <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>{mn ? 'Одоогоор засах алдаа алга.' : 'Nothing to fix right now.'}</span>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {unresolvedMistakes.slice(0, 2).map(m => (
              <li
                key={m.id}
                className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4 pl-5 dark:border-slate-800 dark:bg-slate-950"
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-rose-400" />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                      <span className="rounded-md border border-rose-200 bg-rose-50 px-1.5 py-0.5 font-bold text-rose-700 dark:border-rose-800/60 dark:bg-rose-950 dark:text-rose-300">
                        {m.paper}
                      </span>
                      <span>{m.syllabusRef}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      <ChemText>{mn ? m.questionTitleMn : m.questionTitleEn}</ChemText>
                    </div>
                    <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      <ChemText>{mn ? m.misconceptionDiagnosisMn : m.misconceptionDiagnosisEn}</ChemText>
                    </div>
                  </div>
                  <button
                    onClick={() => jumpToTopic(m.topicId)}
                    className="shrink-0 rounded-xl border border-rose-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-50 dark:border-rose-500/40 dark:bg-transparent dark:text-rose-300 dark:hover:bg-rose-500/10"
                  >
                    {mn ? 'Сэдвийг давтах' : 'Review concept'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* The map of the site, with the flashcards due today beside the teacher's card */}
      <WebStructure extra={reviewCard} />

      {/* The short video tour of the site; its subtitles switch between Монгол and English */}
      <OverviewVideo />
    </div>
  );
};
