import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ChemText } from './common/ChemText';
import { WebStructure } from './WebStructure';
import { RewardStrip } from './RewardStrip';
import { courseMistakes, courseTopics } from '../data/courseScope';
import { useActivity } from '../lib/activity';
import heroImage from '../assets/images/hero_igcse_chemistry_1790320382350.jpg';
import { TitrationAnimation } from './TitrationAnimation';
import { ParticleAnimation } from './ParticleAnimation';
import { LatticeHolesPicture } from './LatticeHolesPicture';
import { AtomPicture } from './AtomPicture';
import { HIGHLIGHT_HEADING } from '../lib/highlight';
import { COURSE_SOLID } from '../lib/courseColour';
import { ElectrolysisAnimation } from './ElectrolysisAnimation';
import {
  ArrowRight,
  AlertCircle,
  Layers,
  Sparkles,
  CheckCircle2,
  FlaskConical,
  Award,
  Flame,
  BookOpen,
  X
} from 'lucide-react';

// The progress card closes for the rest of the visit; the next visit shows it again
const CLOSED_KEY = 'chem_progress_card_closed';
const readClosed = (): boolean => {
  try {
    return window.sessionStorage.getItem(CLOSED_KEY) === '1';
  } catch {
    return false;
  }
};
const writeClosed = () => {
  try {
    window.sessionStorage.setItem(CLOSED_KEY, '1');
  } catch {
    // Storage can be blocked; the card then shows again on reload
  }
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
    jumpToSimulator,
    stats,
    mistakes,
    leitnerCards,
    programme,
    courseChoice
  } = useApp();

  // Everything on this page follows the programme being studied: IGCSE 0620, or the AS or A Level 9701 chosen
  // The page has the same parts for all three courses; a part with no material yet opens that course's "not ready" note
  const isIgcse = programme === 'igcse';
  const heroTitle = isIgcse
    ? { mn: 'Кэмбрижийн химийн бэлтгэл: IGCSE 0620 ба AS & A Level 9701', en: 'Cambridge Chemistry: IGCSE 0620 & AS & A Level 9701' }
    : courseChoice === 'a'
      ? { mn: 'Кэмбрижийн химийн бэлтгэл: A Level 9701', en: 'Cambridge Chemistry: A Level 9701' }
      : { mn: 'Кэмбрижийн химийн бэлтгэл: AS Level 9701', en: 'Cambridge Chemistry: AS Level 9701' };
  const unresolvedMistakes = courseMistakes(mistakes, courseChoice).filter(m => !m.resolved);
  // The progress card: the topics finished, the lesson ticket average, and today's goal. The cross closes it.
  const [progressClosed, setProgressClosed] = useState<boolean>(readClosed);
  const activity = useActivity();
  const dueCards = leitnerCards.filter(c => c.box <= 2 || c.nextReviewDate <= Date.now());

  // The lesson to continue: IGCSE keeps its electrochemistry chapter; 9701 continues with the first topic not yet passed
  const igcseChapter = CURRICULUM_CHAPTERS.find(c => c.id === 'ch-electrochemistry') || CURRICULUM_CHAPTERS[0];
  const currentTopic = isIgcse
    ? igcseChapter.topics[0]
    : (courseTopics(courseChoice).find(t => !stats.completedTopics.includes(t.id)) ?? courseTopics(courseChoice)[0]);

  // Today: three steps the student can take alone. Each shows whether it is done, and one press takes the student there.
  const topicDone = stats.completedTopics.includes(currentTopic.id);
  const today = [
    {
      key: 'topic',
      done: topicDone,
      title: mode === 'mn' ? 'Шинэ сэдэв' : 'New topic',
      detail: topicDone
        ? (mode === 'mn' ? 'Дууссан' : 'Done')
        : `${currentTopic.syllabusRef} · ${mode === 'mn' ? currentTopic.titleMn : currentTopic.titleEn}`,
      action: () => jumpToTopic(currentTopic.id)
    },
    {
      key: 'review',
      done: dueCards.length === 0,
      title: mode === 'mn' ? 'Давтах' : 'Review',
      detail:
        dueCards.length === 0
          ? (mode === 'mn' ? 'Өнөөдрийн давтлага дууссан' : 'Today’s review is done')
          : (mode === 'mn' ? `${dueCards.length} карт давтахад бэлэн` : `${dueCards.length} cards ready`),
      action: () => setActiveTab(isIgcse ? 'flashcards' : 'games')
    },
    {
      key: 'mistake',
      done: unresolvedMistakes.length === 0,
      title: mode === 'mn' ? 'Алдаа засах' : 'Fix a mistake',
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
        {isIgcse
          ? (dueCards.length === 0
            ? (mode === 'mn' ? 'Өнөөдрийн давтлага дууссан. Сайн явж байна!' : 'Today’s review is done. Well done!')
            : (mode === 'mn'
              ? `Өнөөдөр давтах ${dueCards.length} химийн нэр томьёо байна.`
              : `${dueCards.length} chemical terms are ready for review today.`))
          : (mode === 'mn'
            ? '9701-ийн түлхүүр үгсийг карт, тоглоомоор давтана.'
            : 'Review the 9701 key terms with cards and a game.')}
      </div>

      <button
        onClick={() => setActiveTab(isIgcse ? 'flashcards' : 'games')}
        className="mt-auto w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <span>{mode === 'mn' ? 'Флаш карт давтах' : 'Start Review Session'}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  return (
    <div className="space-y-8 pb-16">
      <RewardStrip />
      {/* Progress card: shown when the web is opened, closed with the cross */}
      {!progressClosed && (
        <section className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
          <button
            onClick={() => {
              writeClosed();
              setProgressClosed(true);
            }}
            aria-label={mode === 'mn' ? 'Хаах' : 'Close'}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
          <div className={`${HIGHLIGHT_HEADING} pr-8`}>
            {mode === 'mn' ? 'Таны явц' : 'Your progress'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400">{mode === 'mn' ? 'Сэдэв дууссан' : 'Topics finished'}</div>
              <div className="text-base font-extrabold font-mono text-slate-900 dark:text-white">
                {topicsFinished} / {allTopics.length}
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${allTopics.length ? Math.round((topicsFinished / allTopics.length) * 100) : 0}%` }}
                />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400">{mode === 'mn' ? 'Хичээлийн шалгалтын дундаж' : 'Lesson ticket average'}</div>
              <div className="text-base font-extrabold font-mono text-slate-900 dark:text-white">
                {exitAverage === null ? '—' : `${exitAverage}%`}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {exitRecords.length === 0
                  ? (mode === 'mn' ? 'Хичээлийн шалгалт өгөөгүй байна' : 'No lesson ticket yet')
                  : (mode === 'mn' ? `${exitRecords.length} шалгалт` : `${exitRecords.length} tickets`)}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400">{mode === 'mn' ? 'Өнөөдрийн зорилго' : 'Today’s goal'}</div>
                {goalLessons !== null && (
                  <button
                    type="button"
                    onClick={() => chooseGoal(null)}
                    className="text-xs font-bold text-slate-500 hover:underline dark:text-slate-400"
                  >
                    {mode === 'mn' ? 'Өөрчлөх' : 'Change'}
                  </button>
                )}
              </div>
              {goalLessons === null ? (
                <>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {mode === 'mn' ? 'Өнөөдөр хэдэн хичээл (40 минут) үзэх вэ?' : 'How many 40-minute lessons today?'}
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => chooseGoal(n)}
                        className="flex-1 rounded-lg border border-slate-300 bg-white py-1.5 text-xs font-bold text-slate-800 transition-colors hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-teal-500/60"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-base font-extrabold font-mono text-slate-900 dark:text-white">
                    {Math.min(lessonsToday, goalLessons)} / {goalLessons}
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${Math.min(100, Math.round((lessonsToday / goalLessons) * 100))}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {lessonsToday >= goalLessons
                      ? (mode === 'mn' ? 'Зорилгоо биелүүллээ! Сайн байна.' : 'Goal reached. Well done!')
                      : (mode === 'mn'
                        ? `${goalLessons - lessonsToday} хичээл үлдсэн`
                        : `${goalLessons - lessonsToday} lesson(s) to go`)}
                  </div>
                  <div className="space-y-1.5 border-t border-slate-200 pt-2 dark:border-slate-800">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {mode === 'mn' ? 'Өнөөдрийн зорилгодоо нийцсэн үү?' : 'Did today match your goal?'}
                    </div>
                    <div className="flex gap-1.5">
                      {GOAL_ANSWERS.map(a => (
                        <button
                          key={a.id}
                          type="button"
                          aria-pressed={goalKept === a.id}
                          onClick={() => judgeGoal(a.id)}
                          className={`flex-1 rounded-lg border py-1 text-xs font-bold transition-colors ${
                            goalKept === a.id
                              ? 'border-transparent bg-emerald-600 text-white'
                              : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                          }`}
                        >
                          {mode === 'mn' ? a.mn : a.en}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                writeClosed();
                setProgressClosed(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{mode === 'mn' ? 'Ойлголоо' : 'Got it'}</span>
            </button>
          </div>
        </section>
      )}

      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
        {/* Background Image with Measured Scrim */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Cambridge Chemistry Laboratory"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-20 dark:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-10 max-w-3xl space-y-4">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="" className="w-14 h-14" />
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-teal-400 font-bold tracking-wider uppercase">
            <span>Cambridge Assessment International Education</span>
            <span>·</span>
            <span>{isIgcse ? '0620 (2026–2028)' : '9701 (2025–2027)'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {mode === 'mn' 
              ? heroTitle.mn 
              : heroTitle.en}
          </h1>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {mode === 'mn'
              ? 'Сонгосон хөтөлбөрийн хичээл, алхам бүрээр бодсон жишээ, шалгагчийн зөвлөмж, слайд, концепт зураг, алдааны бүртгэл, давтлага.'
              : 'Lessons, worked examples with every step shown, examiner tips, slides, concept maps, mistake tracking and review for the course you chose.'}
          </p>

        </div>
      </div>

      {/* Today: the three steps, each done or still to do, and one press opens the place to do it */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
        <div className={HIGHLIGHT_HEADING}>
          {mode === 'mn' ? 'Өнөөдөр' : 'Today'}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {today.map((step, i) => (
            <button
              key={step.key}
              onClick={step.action}
              className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-emerald-400 dark:hover:border-teal-500/60 text-left transition-colors"
            >
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step.done
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                {step.done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-slate-900 dark:text-white">{step.title}</span>
                <span className="block text-xs text-slate-600 dark:text-slate-400 leading-snug">{step.detail}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <WebStructure extra={reviewCard} />

      {/* The lower part: one full-width column, so the cards keep their width on every screen */}
      <div className="space-y-6">
        {/* Next step: the topic to study next. The text sits on a clean panel; its picture is a calm side panel. */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex">
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-teal-950/60 dark:text-teal-300">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  {mode === 'mn' ? 'Таны дараагийн алхам' : 'Your next step'}
                </span>
                <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">{currentTopic.syllabusRef}</span>
              </div>
              <h3 className="text-xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-2xl">
                <ChemText>{mode === 'mn' ? currentTopic.titleMn : currentTopic.titleEn}</ChemText>
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <ChemText>{mode === 'mn' ? currentTopic.summaryMn : currentTopic.summaryEn}</ChemText>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => jumpToTopic(currentTopic.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow-sm transition hover:opacity-90 ${COURSE_SOLID[courseChoice]}`}
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{mode === 'mn' ? 'Хичээл үзэх' : 'Study lesson'}</span>
              </button>
            </div>
          </div>

          <div className="relative h-32 shrink-0 sm:h-auto sm:w-52 lg:w-56">
            <div className="flex h-full w-full items-center justify-center bg-slate-50 p-3 dark:bg-slate-950">
              {currentTopic.chapterId === 'ch-electrochemistry' ? (
                <ElectrolysisAnimation mn={mode === 'mn'} className="h-32 w-auto sm:h-40" />
              ) : currentTopic.chapterId === 'ch-acids-bases' ? (
                <TitrationAnimation mn={mode === 'mn'} className="h-32 w-auto sm:h-40" />
              ) : currentTopic.chapterId === 'al-ch-1' ? (
                <AtomPicture mn={mode === 'mn'} className="h-32 w-auto max-w-full sm:h-auto sm:w-full sm:scale-110" />
              ) : currentTopic.chapterId === 'al-ch-23' ? (
                <LatticeHolesPicture mn={mode === 'mn'} only="tetra" className="h-24 w-auto max-w-full sm:h-auto sm:w-full" />
              ) : (
                <ParticleAnimation mn={mode === 'mn'} className="h-32 w-auto sm:h-40" />
              )}
            </div>
          </div>
        </div>

        {/* Needs revision: the mistakes to go over, from the mistake notebook */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <div className={HIGHLIGHT_HEADING}>
                  {mode === 'mn' ? 'Давтах хэрэгтэй' : 'Needs revision'}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {mode === 'mn' ? 'Алдааны сангаас' : 'From your mistake notebook'}
                  {unresolvedMistakes.length > 0 ? ` · ${unresolvedMistakes.length}` : ''}
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('mistakes')}
              className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-700 hover:underline dark:text-teal-400"
            >
              <span>{mode === 'mn' ? 'Бүгдийг харах' : 'View all'}</span>
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>

          {unresolvedMistakes.length === 0 ? (
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{mode === 'mn' ? 'Одоогоор засах алдаа алга. Сайн явж байна!' : 'Nothing to fix right now. Great work!'}</span>
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
                        <ChemText>{mode === 'mn' ? m.questionTitleMn : m.questionTitleEn}</ChemText>
                      </div>
                      <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        <ChemText>{mode === 'mn' ? m.misconceptionDiagnosisMn : m.misconceptionDiagnosisEn}</ChemText>
                      </div>
                    </div>
                    <button
                      onClick={() => jumpToTopic(m.topicId)}
                      className="shrink-0 rounded-xl border border-rose-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-50 dark:border-rose-500/40 dark:bg-transparent dark:text-rose-300 dark:hover:bg-rose-500/10"
                    >
                      {mode === 'mn' ? 'Сэдвийг давтах' : 'Review concept'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};
