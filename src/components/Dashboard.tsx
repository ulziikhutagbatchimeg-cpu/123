import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ChemText } from './common/ChemText';
import { WebStructure } from './WebStructure';
import { RewardStrip } from './RewardStrip';
import { courseMistakes, courseTopics } from '../data/courseScope';
import { useActivity } from '../lib/activity';
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

  const goalDone = today.filter(s => s.done).length;
  const allTopics = courseTopics(courseChoice);
  const topicsFinished = allTopics.filter(t => stats.completedTopics.includes(t.id)).length;
  const exitRecords = activity.filter(r => r.course === courseChoice && r.kind === 'exit');
  const exitAverage = exitRecords.length
    ? Math.round(exitRecords.reduce((n, r) => n + r.percent, 0) / exitRecords.length)
    : null;

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
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-teal-400 font-mono pr-8">
            {mode === 'mn' ? 'Таны явц' : 'Your progress'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{mode === 'mn' ? 'Сэдэв дууссан' : 'Topics finished'}</div>
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
              <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{mode === 'mn' ? 'Хичээлийн шалгалтын дундаж' : 'Lesson ticket average'}</div>
              <div className="text-base font-extrabold font-mono text-slate-900 dark:text-white">
                {exitAverage === null ? '—' : `${exitAverage}%`}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                {exitRecords.length === 0
                  ? (mode === 'mn' ? 'Хичээлийн шалгалт өгөөгүй байна' : 'No lesson ticket yet')
                  : (mode === 'mn' ? `${exitRecords.length} шалгалт` : `${exitRecords.length} tickets`)}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{mode === 'mn' ? 'Өнөөдрийн зорилго' : 'Today’s goal'}</div>
              <div className="text-base font-extrabold font-mono text-slate-900 dark:text-white">{goalDone} / {today.length}</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                {goalDone === today.length
                  ? (mode === 'mn' ? 'Бүгдийг хийсэн. Сайн байна!' : 'All done. Well done!')
                  : (mode === 'mn' ? 'Доорх 3 алхамаас хийх' : 'Work through the 3 steps below')}
              </div>
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
            src="/src/assets/images/hero_igcse_chemistry_1790320382350.jpg"
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
              ? 'Бүлэг бүрт 40 минутын шинжилгээний хичээл, алхам бүрээр бодсон тооцооны жишээ, шалгагчийн зөвлөмж, слайд show, концепт зураг, алдааны бүртгэл.'
              : 'A 40-minute inquiry lesson for every chapter, worked calculations with each step shown, examiner tips, slide shows, concept maps and mistake tracking.'}
          </p>

        </div>
      </div>

      {/* Today: the three steps, each done or still to do, and one press opens the place to do it */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-teal-400 font-mono">
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
                <span className="block text-xs font-bold text-slate-900 dark:text-white">{step.title}</span>
                <span className="block text-[11px] text-slate-600 dark:text-slate-400 leading-snug">{step.detail}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <WebStructure />

      {/* Main Dashboard 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Continue Topic, Mistake Callouts, Lab Shortcuts */}
        <div className="space-y-6 lg:col-span-8">
          {/* Active / Continue Learning Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <span className="text-xs font-bold text-emerald-700 dark:text-teal-400 uppercase tracking-wider font-mono">
                {mode === 'mn' ? 'Үргэлжлүүлэх хичээл' : 'Next Up in Your Syllabus'}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Syllabus: {currentTopic.syllabusRef}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                <ChemText>{mode === 'mn' ? currentTopic.titleMn : currentTopic.titleEn}</ChemText>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <ChemText>{mode === 'mn' ? currentTopic.summaryMn : currentTopic.summaryEn}</ChemText>
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => jumpToTopic(currentTopic.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700 shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-teal-400" />
                <span>{mode === 'mn' ? 'Хичээл үзэх' : 'Study Lesson'}</span>
              </button>

              {isIgcse && (
              <button
                onClick={() => jumpToSimulator('electrolysis')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-teal-950/60 hover:bg-emerald-100 dark:hover:bg-teal-900/80 text-emerald-800 dark:text-teal-300 text-xs font-semibold transition-colors border border-emerald-200 dark:border-teal-700/60"
              >
                <FlaskConical className="w-3.5 h-3.5 text-emerald-600 dark:text-teal-400" />
                <span>{mode === 'mn' ? 'Электролизийн симуляц хийх' : 'Run Electrolysis Simulation'}</span>
              </button>
              )}

              <button
                onClick={() => jumpToTopic(currentTopic.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
              >
                <span>{mode === 'mn' ? 'Paper асуултууд бодох' : 'Practice Exam Questions'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Mistakes to Review */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {mode === 'mn' ? 'Алдсан сэдвүүд (Алдааны сан)' : 'Needs Revision (Mistake Notebook)'}
                </span>
              </div>
              <button
                onClick={() => setActiveTab('mistakes')}
                className="text-xs text-emerald-700 dark:text-teal-400 hover:underline font-bold flex items-center gap-1"
              >
                <span>{mode === 'mn' ? 'Бүгдийг харах' : 'View All'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {unresolvedMistakes.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-500">
                {mode === 'mn' ? 'Одоогоор шийдэгдээгүй алдаа алга байна! Маш сайн.' : 'No active mistakes logged! Keep up the good work.'}
              </div>
            ) : (
              <div className="space-y-3">
                {unresolvedMistakes.slice(0, 2).map(m => (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-rose-200 dark:border-rose-900/30 hover:border-rose-300 dark:hover:border-rose-800/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                        <span className="px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 font-bold">
                          {m.paper}
                        </span>
                        <span>{m.syllabusRef}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">
                        <ChemText>{mode === 'mn' ? m.questionTitleMn : m.questionTitleEn}</ChemText>
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                        <ChemText>{mode === 'mn' ? m.misconceptionDiagnosisMn : m.misconceptionDiagnosisEn}</ChemText>
                      </div>
                    </div>

                    <button
                      onClick={() => jumpToTopic(m.topicId)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/20 dark:hover:bg-rose-500/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/40 text-xs font-semibold transition-colors shrink-0"
                    >
                      {mode === 'mn' ? 'Сэдвийг давтах' : 'Review Concept'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): word review. 0620 opens its flashcards; 9701 opens its own key terms (Words & games). */}
        <div className="lg:col-span-4 space-y-6">
          {/* Flashcard Due Today widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                {mode === 'mn' ? 'Лейтнерийн Флаш карт' : 'Spaced Repetition'}
              </span>
              <Layers className="w-4 h-4 text-amber-500" />
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300">
              {isIgcse
                ? (mode === 'mn'
                  ? `Өнөөдөр давтах ёстой ${dueCards.length} химийн нэр томьёо байна.`
                  : `${dueCards.length} chemical terms are ready for review today.`)
                : (mode === 'mn'
                  ? '9701-ийн түлхүүр үгсийг карт, тоглоомоор давтана.'
                  : 'Review the 9701 key terms with cards and a game.')}
            </div>

            <button
              onClick={() => setActiveTab(isIgcse ? 'flashcards' : 'games')}
              className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>{mode === 'mn' ? 'Флаш карт давтах' : 'Start Review Session'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
