import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ChemText } from './common/ChemText';
import { WebStructure } from './WebStructure';
import { courseMistakes, courseTopics } from '../data/courseScope';
import {
  ArrowRight,
  AlertCircle,
  Layers,
  Sparkles,
  CheckCircle2,
  FlaskConical,
  Award,
  Flame,
  BookOpen
} from 'lucide-react';

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
  const dueCards = leitnerCards.filter(c => c.box <= 2 || c.nextReviewDate <= Date.now());

  // The lesson to continue: IGCSE keeps its electrochemistry chapter; 9701 continues with the first topic not yet passed
  const igcseChapter = CURRICULUM_CHAPTERS.find(c => c.id === 'ch-electrochemistry') || CURRICULUM_CHAPTERS[0];
  const currentTopic = isIgcse
    ? igcseChapter.topics[0]
    : (courseTopics(courseChoice).find(t => !stats.completedTopics.includes(t.id)) ?? courseTopics(courseChoice)[0]);

  return (
    <div className="space-y-8 pb-16">
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
