import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ChemText } from './common/ChemText';
import { courseMistakes, courseTopics } from '../data/courseScope';
import { useActivity } from '../lib/activity';
import { useLeitnerDeck } from '../lib/leitner';
import { ALEVEL_CARDS_KEY, ALEVEL_LEITNER_CARDS, alevelCourseCards } from '../data/alevelFlashcards';
import { NoticePanel } from './NoticePanel';
import { useMyChecklist } from './MyChecklist';
import { WeekDecision, WeeklyReflectionCard } from './WeekReflection';
import { TodayObjectives } from './TodayObjectives';
import { todayGoalOf, useObjectiveGoals } from '../lib/objectiveGoal';
import { topicItems } from '../lib/selfCheck';
import type { LearningObjective } from '../types/chemistry';
import { PASS_ABOVE } from '../lib/chapterChecklist';
import { useStudyDays } from '../lib/studyTime';
import { dayKey } from '../lib/resultSync';
import { useAuthUser, useEnrollment, isTeacher } from '../lib/cloud';
import { ArrowRight, Check, CheckCircle2, ChevronDown, Clock, ListChecks, Target, TicketCheck } from 'lucide-react';

// The home page is today's cycle of self-directed study, the same on every programme: 1 Plan (the week's decision, how
// many lessons, the objectives to master, the 40 minutes as a plan), 2 Do and monitor (the lesson to continue with what is
// left in it, the review due and the time studied: the places to act), 3 Evaluate (did today match the goal, the
// objectives rated again, three numbers, the week's questions and the mistakes). Each step is one fold; the step to do now
// is open, and it moves on by itself. On the first visit three sentences say what this means. Nothing is said twice: the
// teacher's notices are in the bell (a new one shows in one line above the cycle), and the guide and the video tour are on
// How to study here, named in one help line at the foot. The page is one calm column, with one green button for the main action.

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
  // Monitor is done today once the student has studied this programme for 5 minutes today (or taken an exit ticket)
  const todaySeconds = studyDays[`${courseChoice}|${dayKey(Date.now())}`] ?? 0;
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
  // Today's goal in knowledge (lib/objectiveGoal): 1 to 3 objectives of the chapter on screen, for this student's level
  const objectiveGoals = useObjectiveGoals();
  const objectivesChosen = !!todayGoalOf(objectiveGoals, courseChoice);
  const level = courseChoice === 'igcse' && enrollment?.track === 'core' ? 'core' : 'extended';
  const chapterObjectives: LearningObjective[] = [
    ...new Map(
      courseTopics(courseChoice)
        .filter(t => t.chapterId === currentTopic.chapterId)
        .flatMap(t => topicItems(t, level).los)
        .map(lo => [lo.id, lo] as const)
    ).values()
  ];
  const goalSet = goalLessons !== null || objectivesChosen;
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
  const studiedToday = todaySeconds >= 300 || lessonsToday > 0;
  const exitAverage = exitRecords.length
    ? Math.round(exitRecords.reduce((n, r) => n + r.percent, 0) / exitRecords.length)
    : null;

  // One of the four numbers in step 3: what it counts, the number, a short note, and the page it opens
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

  // The lesson to continue: what is still to do in it, in order (the bonus work is not required, so it is not listed)
  const nextItems = next?.lesson
    ? [
        ...next.lesson.parts.filter(p => !p.bonus).map(p => ({ key: p.id, done: p.done, text: mn ? p.label.mn : p.label.en })),
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

  // Today's cycle: Plan → Do and monitor → Evaluate. Each step is done by what the student did today; the step to do now is
  // the first one not done, and it is the one open on the page.
  const objectivesCount = todayGoalOf(objectiveGoals, courseChoice)?.items.length ?? 0;
  const planDone = goalSet;
  const doDone = goalLessons !== null ? lessonsToday >= goalLessons : lessonsToday > 0;
  const evalDone = goalKept !== null;
  const stepsDone = [planDone, doDone, evalDone];
  const nowStep = stepsDone.findIndex(d => !d) + 1; // 1 to 3; 0 once all three are done
  const [openStep, setOpenStep] = useState<number>(nowStep);
  // When a step is done, the next one opens by itself
  useEffect(() => setOpenStep(nowStep), [nowStep]);
  const toggleStep = (n: number) => setOpenStep(open => (open === n ? 0 : n));
  const stepState = (n: number): StepState => (stepsDone[n - 1] ? 'done' : n === nowStep ? 'now' : 'later');
  const [intro, dismissIntro] = useHomeIntro();
  const goalAnswer = GOAL_ANSWERS.find(a => a.id === goalKept);
  const t = (en: string, m: string) => (mn ? m : en);

  return (
    <div className="mx-auto max-w-4xl space-y-4 pb-16">
      {/* The greeting, the programme and today's date */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {name ? (mn ? `Сайн уу, ${name}` : `Hello, ${name}`) : mn ? 'Сайн уу' : 'Hello'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {courseLine} · {dateLine}
        </p>
      </div>

      {/* The first visit: what self-directed study means here, in three sentences, until "Got it" is pressed */}
      {intro && (
        <div className="space-y-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-slate-800 dark:border-teal-800 dark:bg-teal-950/40 dark:text-slate-100 sm:p-5">
          <p className="font-bold">{t('Here you study on your own.', 'Энд чи өөрөө суралцана.')}</p>
          <p>
            {t(
              'Every day has three steps: plan what you will learn, do the lesson and check what you understood, then judge whether you reached your goal and decide what comes next.',
              'Өдөр бүр гурван алхам: юу сурахаа төлөвлөнө, хичээлээ хийж ойлгосноо шалгана, эцэст нь зорилгодоо хүрсэн эсэхээ өөрөө үнэлж, дараагийн алхмаа шийднэ.'
            )}
          </p>
          <p>
            {t(
              'A step ticks itself once it is done and the next one opens. Your teacher sees your progress and helps when you need it.',
              'Хийсэн алхам өөрөө ✓ болж, дараагийн алхам нээгдэнэ. Багш чинь явцыг чинь харж, хэрэгтэй үед тусална.'
            )}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={dismissIntro}
              className="rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 hover:border-emerald-500 dark:border-teal-700 dark:bg-slate-900 dark:text-teal-200"
            >
              {t('Got it', 'Ойлголоо')}
            </button>
            <button type="button" onClick={() => setActiveTab('help')} className="text-xs font-bold text-emerald-800 hover:underline dark:text-teal-200">
              {t('Watch the 2-minute tour →', '2 минутын видео үзэх →')}
            </button>
          </div>
        </div>
      )}

      {/* The teacher's newest unread notice, in one line; all the notices are in the bell at the top */}
      <NoticePanel />

      {/* Where the student is in today's cycle */}
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {nowStep === 0
          ? t('Today’s three steps are done. Well done!', 'Өнөөдрийн гурван алхам дууслаа. Сайн байна!')
          : t(`Today: step ${nowStep} of 3`, `Өнөөдөр: 3 алхмаас ${nowStep}-р алхам`)}
      </p>

      {/* 1. Plan: the week's decision, how many lessons, the objectives to master and the 40 minutes */}
      <CycleStep
        no={1}
        mn={mn}
        title={t('Plan', 'Төлөвлөх')}
        line={t('Choose what you will learn today, and how much.', 'Өнөөдөр юу, хэр их сурахаа сонго.')}
        summary={
          planDone
            ? [
                goalLessons !== null ? t(`${goalLessons} lesson(s)`, `${goalLessons} хичээл`) : '',
                objectivesCount ? t(`${objectivesCount} objective(s)`, `${objectivesCount} зорилт`) : ''
              ]
                .filter(Boolean)
                .join(' · ')
            : t('Today’s goal is not set yet', 'Өнөөдрийн зорилгоо хараахан тавиагүй')
        }
        state={stepState(1)}
        open={openStep === 1}
        onToggle={() => toggleStep(1)}
      >
        <WeekDecision mn={mn} />
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-slate-800 dark:text-slate-200">{t('How many lessons today?', 'Өнөөдөр хэдэн хичээл хийх вэ?')}</span>
          {goalLessons === null ? (
            [1, 2, 3].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => chooseGoal(n)}
                className="h-8 w-8 rounded-lg border border-slate-300 bg-white font-bold text-slate-800 hover:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {n}
              </button>
            ))
          ) : (
            <>
              <span className="font-bold text-slate-900 dark:text-white">
                {Math.min(lessonsToday, goalLessons)} / {goalLessons} {t('lessons', 'хичээл')}
              </span>
              <button type="button" onClick={() => chooseGoal(null)} className="text-xs font-semibold text-slate-500 hover:underline dark:text-slate-400">
                {t('Change', 'Өөрчлөх')}
              </button>
            </>
          )}
        </div>
        {/* Beside the number of lessons, today's goal in knowledge: the objectives to master, rated again in step 3 */}
        <TodayObjectives mn={mn} candidates={chapterObjectives} rerate={false} />
        {/* The 40 minutes as a plan: each part with its minutes, ticked once done. The places to do them are in step 2. */}
        <div className="space-y-2">
          <div className={SUBHEAD}>{t('Today’s 40 minutes', 'Өнөөдрийн 40 минут')}</div>
          <ol className="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
            {today.map((step, i) => (
              <li key={step.key} className="flex items-start gap-2.5 text-sm">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    step.done ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                  }`}
                  aria-hidden="true"
                >
                  {step.done ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                <span className="min-w-0">
                  <span className={`font-semibold ${step.done ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                    {step.title}
                  </span>{' '}
                  <span className="text-slate-500 dark:text-slate-400">· {step.minutes} {t('min', 'мин')}</span>
                  <span className="block text-xs leading-snug text-slate-600 dark:text-slate-400">{step.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </CycleStep>

      {/* 2. Do and monitor: the lesson to continue with what is left in it, today's review and the time studied */}
      <CycleStep
        no={2}
        mn={mn}
        title={t('Do and monitor', 'Хийх, хянах')}
        line={t('Do the lesson step by step and check what you understood with the quick check.', 'Хичээлээ алхам алхмаар хийж, ойлгосноо түргэн шалгалтаар шалга.')}
        summary={
          next
            ? `${next.lesson ? `${mn ? next.lesson.def.code.mn : next.lesson.def.code.en} · ` : ''}${
                next.lesson && next.lesson.def.code.en.startsWith('L')
                  ? mn ? next.lesson.def.title.mn : next.lesson.def.title.en
                  : mn ? next.chapter.title.mn : next.chapter.title.en
              } · ${t('today', 'өнөөдөр')} ${minutesText(todaySeconds, mn)}`
            : t('Everything is done', 'Бүх ажил дууссан')
        }
        state={stepState(2)}
        open={openStep === 2}
        onToggle={() => toggleStep(2)}
      >
        {next ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {next.blocking
                  ? t(`Chapter ${next.chapter.number} · to open the next lesson`, `${next.chapter.number}-р бүлэг · дараагийн хичээл нээгдэхэд`)
                  : t(`Next · chapter ${next.chapter.number}`, `Дараагийн ажил · ${next.chapter.number}-р бүлэг`)}
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
                  {t(
                    `Chapter ${next.chapter.number} ${chapterPct}% · ${checklist.doneChapters} of ${checklist.chapters.length} chapters done (${coursePct}%)`,
                    `${next.chapter.number}-р бүлэг ${chapterPct}% · ${checklist.chapters.length} бүлгээс ${checklist.doneChapters} дууссан (${coursePct}%)`
                  )}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-2">
              <button
                type="button"
                onClick={() => next.chapter.firstTopicId && jumpToTopic(next.chapter.firstTopicId)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-500"
              >
                {t('Continue', 'Үргэлжлүүлэх')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('toolkit')}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <ListChecks className="h-4 w-4" aria-hidden="true" />
                {t('My checklist', 'Хийх ажлын хүснэгт')}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-200">
            <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
            <div>
              <div className="text-base font-bold">{t('Everything is done', 'Бүх ажил дууссан')}</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {t('Every lesson, test and self-check of this programme is done. Keep practising in Practice.', 'Энэ хөтөлбөрийн бүх хичээл, шалгалт, үнэлгээг хийжээ. Дадлага хэсэгт давтаарай.')}
              </div>
            </div>
          </div>
        )}
        {/* Watching how it goes: the review due today and the time studied today */}
        <div className="grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 text-sm dark:border-slate-800 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setActiveTab('flashcards')}
            className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2 text-left hover:border-emerald-400 dark:border-slate-800"
          >
            <span>
              <span className="block font-semibold text-slate-900 dark:text-white">{t('Review with flashcards', 'Флаш картаар давтах')}</span>
              <span className="block text-xs text-slate-600 dark:text-slate-400">
                {dueCards.length === 0 ? t('Today’s review is done', 'Өнөөдрийн давтлага дууссан') : t(`${dueCards.length} cards ready`, `${dueCards.length} карт бэлэн`)}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-800">
            <Clock className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
            <span>
              <span className="block font-semibold text-slate-900 dark:text-white">
                {t('Studied today', 'Өнөөдөр суралцсан')}: {minutesText(todaySeconds, mn)}
              </span>
              <span className="block text-xs text-slate-600 dark:text-slate-400">
                {goalLessons !== null
                  ? t(`${Math.min(lessonsToday, goalLessons)} of ${goalLessons} lesson(s) of your goal`, `Зорилгын ${goalLessons} хичээлээс ${Math.min(lessonsToday, goalLessons)}`)
                  : t(`${lessonsToday} lesson(s) today`, `Өнөөдөр ${lessonsToday} хичээл`)}
              </span>
            </span>
          </div>
        </div>
      </CycleStep>

      {/* 3. Evaluate: did today match the goal, today's objectives rated again, the numbers, the week and the mistakes */}
      <CycleStep
        no={3}
        mn={mn}
        title={t('Evaluate', 'Үнэлэх')}
        line={t('Judge whether you reached your goal, fix your mistakes and decide your next step.', 'Зорилгодоо хүрсэн эсэхээ үнэлж, алдаагаа засаад дараагийн алхмаа шийд.')}
        summary={
          goalAnswer
            ? t(`Did today match your goal: ${goalAnswer.en}`, `Зорилгодоо нийцсэн үү: ${goalAnswer.mn}`)
            : unresolvedMistakes.length > 0
              ? t(`${unresolvedMistakes.length} mistake(s) to fix · judge your day after the lesson`, `${unresolvedMistakes.length} алдаа засах · хичээлийн дараа өдрөө үнэлнэ`)
              : t('After the lesson, judge your day here', 'Хичээлийн дараа энд өдрөө үнэлнэ')
        }
        state={stepState(3)}
        open={openStep === 3}
        onToggle={() => toggleStep(3)}
      >
        {goalSet ? (
          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {goalLessons === null
                ? t('Did today match your goal?', 'Өнөөдөр зорилгодоо нийцсэн үү?')
                : lessonsToday >= goalLessons
                  ? t('Goal reached. Did today match your goal?', 'Зорилгоо биелүүллээ. Өнөөдөр зорилгодоо нийцсэн үү?')
                  : t(`${goalLessons - lessonsToday} lesson(s) to go. Did today match your goal?`, `${goalLessons - lessonsToday} хичээл үлдсэн. Өнөөдөр зорилгодоо нийцсэн үү?`)}
            </div>
            <div className="flex flex-wrap gap-2">
              {GOAL_ANSWERS.map(a => (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={goalKept === a.id}
                  onClick={() => judgeGoal(a.id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-bold transition-colors ${
                    goalKept === a.id
                      ? 'border-transparent bg-emerald-600 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                  }`}
                >
                  {mn ? a.mn : a.en}
                </button>
              ))}
            </div>
            {/* Once that is answered: today's objectives rated again, I can or not yet, into the self-check */}
            {goalKept !== null && <TodayObjectives mn={mn} candidates={chapterObjectives} rerate />}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span>{t('You judge the day against its goal: set today’s goal first.', 'Өдрөө зорилготой нь харьцуулж үнэлнэ: эхлээд өнөөдрийн зорилгоо тавь.')}</span>
            <button type="button" onClick={() => setOpenStep(1)} className="font-bold text-emerald-700 hover:underline dark:text-teal-300">
              {t('Step 1 →', '1-р алхам руу →')}
            </button>
          </div>
        )}
        {/* Three numbers, each opening its page (the mistakes are listed below, not counted again) */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {stat(
            'tickets',
            <TicketCheck className="h-3.5 w-3.5" aria-hidden="true" />,
            t('Exit ticket average', 'Гарах билетийн дундаж'),
            exitAverage === null ? '—' : `${exitAverage}%`,
            exitRecords.length ? t(`${exitRecords.length} tickets`, `${exitRecords.length} билет`) : t('None yet', 'Өгөөгүй байна'),
            () => setActiveTab('student')
          )}
          {stat(
            'week',
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />,
            t('Last 7 days', 'Сүүлийн 7 хоног'),
            weekSeconds ? minutesText(weekSeconds, mn) : '—',
            t('time studied', 'суралцсан хугацаа'),
            () => setActiveTab('student')
          )}
          {stat(
            'self',
            <Target className="h-3.5 w-3.5" aria-hidden="true" />,
            t('Self-check', 'Өөрийн үнэлгээ'),
            selfCheck.total ? `${Math.round((selfCheck.rated / selfCheck.total) * 100)}%` : '—',
            t(`${selfCheck.rated}/${selfCheck.total} rated`, `${selfCheck.rated}/${selfCheck.total} үнэлсэн`),
            () => setActiveTab('toolkit')
          )}
        </div>
        {/* Once a week: three short questions on the week gone by (lib/weekReflection); nothing shows when it is not due */}
        <WeeklyReflectionCard mn={mn} />
        {/* The mistakes to go over, from the mistake notebook */}
        {unresolvedMistakes.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className={SUBHEAD}>{t('Needs revision', 'Давтах хэрэгтэй')}</div>
              <button type="button" onClick={() => setActiveTab('mistakes')} className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline dark:text-teal-400">
                {t('Mistake notebook', 'Алдааны сан')}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
            <ul className="space-y-2">
              {unresolvedMistakes.slice(0, 2).map(m => (
                <li key={m.id} className="flex flex-col gap-2 rounded-xl border border-slate-200 border-l-4 border-l-rose-400 p-3 dark:border-slate-800 dark:border-l-rose-400 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-0.5">
                    <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {m.paper} · {m.syllabusRef}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      <ChemText>{mn ? m.questionTitleMn : m.questionTitleEn}</ChemText>
                    </div>
                    <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      <ChemText>{mn ? m.misconceptionDiagnosisMn : m.misconceptionDiagnosisEn}</ChemText>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToTopic(m.topicId)}
                    className="shrink-0 self-start rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:text-slate-200"
                  >
                    {t('Review the topic', 'Сэдвийг давтах')}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CycleStep>

      {/* Help, in one line: the full guide and the 2-minute tour are on How to study here (the menus are at the top) */}
      <p className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
        {t('Help:', 'Тусламж:')}{' '}
        <button type="button" onClick={() => setActiveTab('help')} className="font-semibold text-emerald-700 hover:underline dark:text-teal-300">
          {t('How to study here', 'Хэрхэн суралцах вэ')}
        </button>
        {' · '}
        <button type="button" onClick={() => setActiveTab('help')} className="font-semibold text-emerald-700 hover:underline dark:text-teal-300">
          {t('the 2-minute tour', '2 минутын видео')}
        </button>
      </p>
    </div>
  );
};

// One step of today's cycle, as one fold: its number (✓ once done), its name and one line, the summary while folded.
// The step to do now has a green border.
type StepState = 'done' | 'now' | 'later';
const CycleStep: React.FC<{
  no: number;
  mn: boolean;
  title: string;
  line: string;
  summary: string;
  state: StepState;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ no, mn, title, line, summary, state, open, onToggle, children }) => (
  <section
    aria-current={state === 'now' ? 'step' : undefined}
    className={`rounded-2xl border bg-white shadow-sm dark:bg-slate-900 ${
      state === 'now' ? 'border-emerald-500 dark:border-teal-500' : 'border-slate-200 dark:border-slate-800'
    }`}
  >
    <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5">
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          state === 'done'
            ? 'bg-emerald-600 text-white'
            : state === 'now'
              ? 'border-2 border-emerald-600 text-emerald-700 dark:border-teal-400 dark:text-teal-300'
              : 'border border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400'
        }`}
      >
        {state === 'done' ? <Check className="h-4 w-4" /> : no}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
          {no}. {title}
          {state === 'now' && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-teal-950 dark:text-teal-300">
              {mn ? 'Одоо' : 'Now'}
            </span>
          )}
          <span className="sr-only">{state === 'done' ? (mn ? ' (хийсэн)' : ' (done)') : ''}</span>
        </span>
        <span className="block truncate text-xs text-slate-600 dark:text-slate-400">{open ? line : summary}</span>
      </span>
      <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
    </button>
    {open && <div className="space-y-4 border-t border-slate-100 px-4 pb-5 pt-4 dark:border-slate-800 sm:px-5">{children}</div>}
  </section>
);

// The small heading inside a step
const SUBHEAD = 'text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400';

// The three sentences on self-directed study: shown until "Got it" is pressed, on this device
const HOME_INTRO_KEY = 'chem_home_cycle_intro_v1';
const useHomeIntro = (): [boolean, () => void] => {
  const [show, setShow] = useState(() => {
    try {
      return window.localStorage.getItem(HOME_INTRO_KEY) !== 'done';
    } catch {
      return true;
    }
  });
  const dismiss = () => {
    setShow(false);
    try {
      window.localStorage.setItem(HOME_INTRO_KEY, 'done');
    } catch {
      // Storage can be blocked; the sentences then show again on the next visit, which is harmless
    }
  };
  return [show, dismiss];
};
