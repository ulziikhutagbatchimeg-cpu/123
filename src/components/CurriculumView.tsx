import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { Topic, ExamQuestion, WorkedExample } from '../types/chemistry';
import { ChemText } from './common/ChemText';
import { LessonVisuals } from './LessonVisuals';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { InteractiveChapterOne } from './InteractiveChapterOne';
import { ChapterSlides } from './ChapterSlides';
import { ConceptMap, type ConceptBranch } from './ConceptMap';
import { AlevelSchedule } from './AlevelSchedule';
import { IgcseChapters } from './IgcseChapters';
import { TopicCheck } from './TopicCheck';
import { AlevelInquiryLesson } from './AlevelInquiryLesson';
import { ALEVEL_INQUIRY } from '../data/alevelInquiry';
import { CHANGED_KEY, EXPORTED_KEY, makeReport, downloadText, readStored, writeStored } from '../data/progressReport';
import { StudentProgressCard } from './StudentProgressCard';
import { StudentAccount } from './StudentAccount';
import { saveStudentProgress, useAuthUser } from '../lib/cloud';
import {
  Volume2, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  ChevronRight, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  Award,
  FlaskConical,
  Download,
  ChevronDown
} from 'lucide-react';

// "I can" checklist: which statements this student has ticked. Kept in this browser only.
const CHECK_KEY = 'chem_cambridge_checklist';

const readChecks = (): Record<string, boolean> => {
  try {
    const raw = localStorage.getItem(CHECK_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
};

const writeChecks = (checks: Record<string, boolean>) => {
  try {
    localStorage.setItem(CHECK_KEY, JSON.stringify(checks));
  } catch {
    // Storage can be blocked; the checklist still works for this visit
  }
};

// The name the student types once; it goes into the exported report
const NAME_KEY = 'chem_cambridge_student_name';

const readName = (): string => {
  try {
    return localStorage.getItem(NAME_KEY) ?? '';
  } catch {
    return '';
  }
};

const writeName = (name: string) => {
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch {
    // Storage can be blocked; the name is still used for this export
  }
};

// The parts of a topic: the button chosen decides which part is on the page
type TopicPart = 'objectives' | 'vocab' | 'concept' | 'example' | 'sim' | 'practice';
const TOPIC_PARTS: { id: TopicPart; en: string; mn: string }[] = [
  { id: 'objectives', en: 'Objectives', mn: 'Зорилго' },
  { id: 'vocab', en: 'Key words', mn: 'Түлхүүр үг' },
  { id: 'concept', en: 'Concepts', mn: 'Тайлбар' },
  { id: 'example', en: 'Worked example', mn: 'Жишээ' },
  { id: 'sim', en: 'Simulation', mn: 'Симуляц' },
  { id: 'practice', en: 'Practice', mn: 'Дасгал' }
];

export const CurriculumView: React.FC = () => {
  const { mode } = useLanguage();
  const { leitnerCards } = useApp();
  const [topicPart, setTopicPart] = useState<TopicPart>('objectives');
  const { 
    selectedTopicId, 
    setSelectedTopicId, 
    addMistake, 
    logExamAnswer, 
    markTopicComplete,
    jumpToSimulator,
    stats 
  } = useApp();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [topicQuizDifficulty, setTopicQuizDifficulty] = useState<'All' | 'easy' | 'medium' | 'hard'>('All');
  // Core: content for every candidate. Extended: Core plus Supplement content (grades A*–C).
  const [level, setLevel] = useState<'core' | 'extended'>('extended');
  // Which course the page shows: the programme chosen for the whole app (IGCSE 0620 or AS & A Level 9701)
  const { programme, setProgramme } = useApp();
  const [checks, setChecks] = useState<Record<string, boolean>>(readChecks);
  const [studentName, setStudentName] = useState<string>(readName);
  // When the student last ticked, and when they last saved a report for the teacher
  const [changedAt, setChangedAt] = useState<string | null>(() => readStored(CHANGED_KEY));
  const [exportedAt, setExportedAt] = useState<string | null>(() => readStored(EXPORTED_KEY));

  // Signed-in students: the teacher's copy follows every tick and name change
  const { user: authUser } = useAuthUser();
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  // Syllabus chapters the student has opened or folded. Untouched chapters open when they hold the current topic.
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const name = studentName.trim();
    if (!authUser || !name) return;
    const timer = window.setTimeout(() => {
      saveStudentProgress(authUser.uid, name, checks, stats.completedTopics)
        .then(() => {
          setSavedAt(new Date().toISOString());
          setSaveError(null);
        })
        .catch(() => setSaveError('error'));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [authUser, checks, studentName, stats.completedTopics]);

  const toggleCheck = (id: string) => {
    setChecks(prev => {
      const next = { ...prev, [id]: !prev[id] };
      writeChecks(next);
      return next;
    });
    const now = new Date().toISOString();
    writeStored(CHANGED_KEY, now);
    setChangedAt(now);
  };

  // Download this browser's checklist as a .json file for the teacher to load
  const saveReport = () => {
    writeName(studentName.trim());
    const report = makeReport(studentName, checks, stats.completedTopics);
    const file = `${report.name.replace(/[^\p{L}\p{N}]+/gu, '-')}-0620-checklist.json`;
    writeStored(EXPORTED_KEY, report.date);
    setExportedAt(report.date);
    downloadText(file, JSON.stringify(report, null, 2), 'application/json');
  };

  // Ticked / total statements for a set of topics, counting only the level being viewed
  const chapterProgress = (chTopics: Topic[]) => {
    const all = chTopics.flatMap(t => t.learningObjectives.filter(lo => level === 'extended' || lo.tier !== 'extended'));
    return { done: all.filter(lo => checks[lo.id]).length, total: all.length };
  };

  // The chapters of the programme being shown: the IGCSE 0620 chapters, or the 9701 syllabus sections
  const chapters = programme === 'alevel' ? ALEVEL_CHAPTERS : CURRICULUM_CHAPTERS;

  // Find currently selected topic
  let currentTopic: Topic | undefined;
  for (const ch of chapters) {
    const found = ch.topics.find(t => t.id === selectedTopicId);
    if (found) {
      currentTopic = found;
      break;
    }
  }

  if (!currentTopic) {
    currentTopic = chapters[0].topics[0];
  }

  const isChapterOpen = (chId: string, topics: Topic[]) =>
    chId in openChapters ? openChapters[chId] : topics.some(t => t.id === currentTopic?.id);

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (q: ExamQuestion, optionId: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers(prev => ({ ...prev, [q.id]: optionId }));
    setRevealedSolutions(prev => ({ ...prev, [q.id]: true }));

    const isCorrect = optionId === q.correctOption;
    logExamAnswer(q.id, isCorrect, q.paper);

    if (!isCorrect) {
      addMistake({
        questionId: q.id,
        topicId: q.topicId,
        syllabusRef: q.syllabusRef,
        paper: q.paper,
        questionTitleEn: q.titleEn,
        questionTitleMn: q.titleMn,
        studentAnswer: `Option ${optionId}: ${q.options?.find(o => o.id === optionId)?.textEn || ''}`,
        correctAnswer: `Option ${q.correctOption}: ${q.options?.find(o => o.id === q.correctOption)?.textEn || ''}`,
        misconceptionDiagnosisEn: q.misconceptionDiagnosisEn,
        misconceptionDiagnosisMn: q.misconceptionDiagnosisMn
      });
    }
  };

  const toggleStructuredReveal = (qId: string) => {
    setRevealedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const isCompleted = stats.completedTopics.includes(currentTopic.id);

  // Every worked example for this topic: the original one, then the ones from the revision deck
  const examples = [currentTopic.workedExample, ...(currentTopic.workedExamples ?? [])].filter(
    (e): e is WorkedExample => !!e
  );

  const visibleObjectives = currentTopic.learningObjectives.filter(lo => level === 'extended' || lo.tier !== 'extended');
  const doneCount = visibleObjectives.filter(lo => checks[lo.id]).length;

  // The lab for this topic. The lesson links to it; the lab itself lives only in the Virtual Labs tab.
  const recommendedLab = currentTopic.recommendedSimulator;

  const getTopicImage = () => {
    if (currentTopic?.chapterId === 'ch-electrochemistry') {
      return '/src/assets/images/lab_electrolysis_cell_1790320394756.jpg';
    }
    if (currentTopic?.chapterId === 'ch-acids-bases') {
      return '/src/assets/images/lab_titration_apparatus_1790320405917.jpg';
    }
    if (currentTopic?.chapterId === 'ch-rates-of-reaction') {
      return '/src/assets/images/lab_apparatus_overview_1790320384462.jpg';
    }
    return '/src/assets/images/lab_apparatus_overview_1790320384462.jpg';
  };

  // The concept maps above the lesson: the chapter (its topics), then this topic (its sections, or its learning objectives on 9701)
  const shown = currentTopic;
  const chapter = chapters.find(ch => ch.topics.some(t => t.id === shown.id)) ?? chapters[0];
  const visibleSections = shown.sections.filter(sec => level === 'extended' || sec.tier !== 'extended');
  const chapterBranches: ConceptBranch[] = chapter.topics.map(t => ({
    id: t.id,
    title: mode === 'mn' ? t.titleMn : t.titleEn,
    ref: t.syllabusRef,
    lines: t.vocabulary.length
      ? t.vocabulary.slice(0, 4).map(v => (mode === 'mn' ? v.termMn : v.termEn))
      : [mode === 'mn' ? `${t.learningObjectives.length} зорилт` : `${t.learningObjectives.length} objectives`],
    onClick: () => setSelectedTopicId(t.id)
  }));
  const topicBranches: ConceptBranch[] =
    programme === 'igcse' && visibleSections.length > 0
      ? visibleSections.map(sec => {
          const rule = mode === 'mn' ? sec.keyRuleMn : sec.keyRuleEn;
          return { id: sec.id, title: mode === 'mn' ? sec.titleMn : sec.titleEn, lines: rule ? [rule] : [] };
        })
      : visibleObjectives.map(lo => ({ id: lo.id, title: mode === 'mn' ? lo.mn : lo.en, lines: [] }));
  const topicTerms = shown.vocabulary.map(v => (mode === 'mn' ? v.termMn : v.termEn));
  // The topic after this one, in syllabus order: the end-of-topic test opens it above 60%
  const allTopics = chapters.flatMap(c => c.topics);
  const nextTopic = allTopics[allTopics.findIndex(t => t.id === shown.id) + 1];

  // The programme switch: IGCSE 0620 lessons or the AS & A Level 9701 revision
  const programmeSwitch = (
    <div className="inline-flex p-0.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold">
      {(['igcse', 'alevel'] as const).map(p => (
        <button
          key={p}
          onClick={() => setProgramme(p)}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            programme === p
              ? 'bg-violet-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {p === 'igcse' ? 'IGCSE 0620' : 'AS & A Level 9701'}
        </button>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
      <div className="lg:col-span-12">{programmeSwitch}</div>
      {/* Sidebar: Curriculum Tree & Chapter Navigation (4 cols) */}
      <div className="lg:col-span-4 space-y-4">
        <StudentAccount user={authUser} hasName={!!studentName.trim()} savedAt={savedAt} saveError={saveError} />
        <StudentProgressCard checks={checks} level={level} changedAt={changedAt} exportedAt={exportedAt} leitnerCards={leitnerCards} />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {programme === 'alevel'
                  ? (mode === 'mn' ? '9701 хөтөлбөр (AS ба A Level)' : 'Syllabus 9701 (AS & A Level)')
                  : (mode === 'mn' ? 'Кэмбрижийн Хөтөлбөр' : 'Cambridge 0620 Syllabus')}
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              {stats.completedTopics.length} / {chapters.flatMap(c => c.topics).length} {mode === 'mn' ? 'хичээл' : 'done'}
            </span>
          </div>

          {/* Chapters and Sub-Topics List */}
          <div className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {chapters.map(ch => {
              const open = isChapterOpen(ch.id, ch.topics);
              const progress = chapterProgress(ch.topics);
              const pct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;
              return (
              <div key={ch.id} className="space-y-1.5">
                <button
                  onClick={() => setOpenChapters(prev => ({ ...prev, [ch.id]: !open }))}
                  aria-expanded={open}
                  className="w-full text-left px-2.5 py-2 rounded-xl bg-slate-100/70 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="truncate">
                      {ch.number}. {mode === 'mn' ? ch.titleMn : ch.titleEn}
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono opacity-80">
                        ✓ {progress.done}/{progress.total}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? '' : '-rotate-90'}`} />
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${pct}%` }} />
                  </div>
                </button>

                {open && (
                <div className="space-y-1 pl-2">
                  {ch.topics.map(t => {
                    const isSelected = t.id === currentTopic?.id;
                    const isDone = stats.completedTopics.includes(t.id);

                    return (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTopicId(t.id)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-teal-950/70 text-emerald-800 dark:text-teal-300 font-bold border border-emerald-300 dark:border-teal-700 shadow-sm'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono text-[10px] text-slate-400">{t.syllabusRef}</span>
                          <span className="truncate">{mode === 'mn' ? t.titleMn : t.titleEn}</span>
                        </div>
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-1" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
                )}
              </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Column: 7-Step Interactive Lesson Scaffold (8 cols) */}
      <div className="lg:col-span-8 space-y-6">
        {/* The 9701 study schedule: the chapters, their key terms ticked, and the planned and late chapters */}
        {programme === 'alevel' && <AlevelSchedule mn={mode === 'mn'} />}
        {programme === 'igcse' && <IgcseChapters mn={mode === 'mn'} />}
        {/* Concept maps above the lesson. Chapter 1 (IGCSE) has its own map at the top of its lessons, so it is skipped here. */}
        {shown.chapterId !== 'ch-states-of-matter' && (
          <>
            <ConceptMap
              label={mode === 'mn' ? 'Бүлгийн концепт зураг' : 'Chapter concept map'}
              centre={mode === 'mn' ? chapter.titleMn : chapter.titleEn}
              centreRef={`${mode === 'mn' ? 'Бүлэг' : 'Chapter'} ${chapter.number}`}
              branches={chapterBranches}
              terms={[]}
              mn={mode === 'mn'}
            />
            <ConceptMap
              label={mode === 'mn' ? 'Сэдвийн концепт зураг' : 'Topic concept map'}
              centre={mode === 'mn' ? shown.titleMn : shown.titleEn}
              centreRef={shown.syllabusRef}
              branches={topicBranches}
              terms={topicTerms}
              mn={mode === 'mn'}
            />
          </>
        )}
        {/* Chapter 1 (IGCSE): the four interactive 40-minute lessons, built from its learning outcomes */}
        {programme === 'igcse' && currentTopic.chapterId === 'ch-states-of-matter' && <InteractiveChapterOne mn={mode === 'mn'} onOpenTopic={setSelectedTopicId} />}
        {programme === 'alevel' && ALEVEL_INQUIRY[currentTopic.chapterId] && (
          <AlevelInquiryLesson
            key={currentTopic.chapterId}
            chapterId={currentTopic.chapterId}
            plan={ALEVEL_INQUIRY[currentTopic.chapterId]}
            chapterTitle={{ mn: chapters.find(c => c.id === currentTopic.chapterId)?.titleMn ?? '', en: chapters.find(c => c.id === currentTopic.chapterId)?.titleEn ?? '' }}
            mn={mode === 'mn'}
          />
        )}
        <ChapterSlides chapterId={currentTopic.chapterId} mn={mode === 'mn'} />
        {/* Topic Header & Completion Action */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-teal-400 font-bold uppercase tracking-wider">
                <span>{currentTopic.syllabusRef}</span>
                <span>·</span>
                <span>Topic {currentTopic.number}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                <ChemText>{mode === 'mn' ? currentTopic.titleMn : currentTopic.titleEn}</ChemText>
              </h1>
            </div>

            <button
              onClick={() => markTopicComplete(currentTopic.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? (mode === 'mn' ? 'Судалсан ✔' : 'Completed ✔') : (mode === 'mn' ? 'Судалснаар тэмдэглэх' : 'Mark as Completed')}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <ChemText>{mode === 'mn' ? currentTopic.summaryMn : currentTopic.summaryEn}</ChemText>
          </p>

          {/* The topic is shown one part at a time: the button chosen decides which part is on the page */}
          <div className="flex flex-wrap gap-1.5 pt-4">
            {TOPIC_PARTS.map(p => (
              <button
                key={p.id}
                onClick={() => setTopicPart(p.id)}
                aria-pressed={topicPart === p.id}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                  topicPart === p.id
                    ? 'bg-violet-600 border-violet-600 text-white'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
                }`}
              >
                {mode === 'mn' ? p.mn : p.en}
              </button>
            ))}
          </div>

          <div className={topicPart === 'objectives' ? '' : 'hidden'}>
          {/* Step 1: Learning Objectives Checklist */}
          <div className="mt-5 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-mono">
                {mode === 'mn' ? 'Кэмбрижийн суралцахуйн зорилтууд:' : 'Cambridge Learning Objectives:'}
              </span>
              <div className="inline-flex p-0.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold">
                {(['core', 'extended'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    title={l === 'core' ? 'Core content for all candidates' : 'Core plus Extended (Supplement) content'}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      level === l
                        ? l === 'core' ? 'bg-emerald-600 text-white' : 'bg-violet-600 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {l === 'core' ? 'Core' : 'Extended'}
                  </button>
                ))}
              </div>
            </div>
            {/* "I can" checklist: tick each statement once you can do it */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${visibleObjectives.length ? (doneCount / visibleObjectives.length) * 100 : 0}%` }}
                />
              </div>
              <span className="text-xs font-bold font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
                {doneCount} / {visibleObjectives.length}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {mode === 'mn' ? 'Чадна гэж бодож байгаа зорилтоо тэмдэглээрэй.' : 'Tick each statement you can do: this is your "I can" checklist.'}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs">
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                maxLength={40}
                placeholder={mode === 'mn' ? 'Таны нэр' : 'Your name'}
                className="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-900 dark:text-white"
              />
              <button
                onClick={saveReport}
                disabled={!studentName.trim()}
                className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-bold whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{mode === 'mn' ? 'Багшдаа тайлан хадгалах' : 'Save report for teacher'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {mode === 'mn'
                ? 'Тайлан .json файл болж татагдана. Багш тэр файлыг өөрийн хэсэгт ачаална.'
                : 'The report downloads as a .json file. Your teacher loads it in their portal.'}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {visibleObjectives.map(lo => (
                <div
                  key={lo.id}
                  className={`p-3 rounded-xl border flex items-start gap-3 text-xs transition-colors ${
                    checks[lo.id]
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                      : 'bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!checks[lo.id]}
                    onChange={() => toggleCheck(lo.id)}
                    aria-label={mode === 'mn' ? 'Чадна' : 'I can do this'}
                    className="mt-0.5 w-4 h-4 accent-emerald-600 shrink-0 cursor-pointer"
                  />
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 dark:bg-teal-950 text-emerald-800 dark:text-teal-300 border border-emerald-200 dark:border-teal-800/60 shrink-0">
                    {lo.ao}
                  </span>
                  {lo.tier === 'extended' && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60 shrink-0">
                      Extended
                    </span>
                  )}
                  <div className="space-y-0.5">
                    <div className="text-slate-800 dark:text-slate-100 font-medium">
                      <ChemText>{mode === 'mn' ? lo.mn : lo.en}</ChemText>
                    </div>
                    {mode === 'dual' && (
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] font-normal">
                        <ChemText>{lo.mn}</ChemText>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>

        <div className={topicPart === 'vocab' ? '' : 'hidden'}>
        {/* Step 2: Key Vocabulary Flashcards */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {mode === 'mn' ? 'Түлхүүр үгс ба тодорхойлолт' : 'Key Vocabulary & Scientific Terminology'}
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              {currentTopic.vocabulary.length} terms
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentTopic.vocabulary.map(voc => (
              <div
                key={voc.id}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2 relative group hover:border-emerald-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">{voc.termEn}</span>
                      <button
                        onClick={() => speakWord(voc.termEn)}
                        title="Pronounce"
                        className="p-1 rounded bg-slate-200 dark:bg-slate-900 hover:bg-slate-300 dark:hover:bg-slate-800 text-teal-600 dark:text-teal-400 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-xs text-emerald-600 dark:text-teal-400 font-bold">{voc.termMn}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{voc.phonetic}</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                  <ChemText>{mode === 'mn' ? voc.definitionMn : voc.definitionEn}</ChemText>
                </p>

                {mode === 'dual' && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800/60 pt-1">
                    <ChemText>{voc.definitionMn}</ChemText>
                  </p>
                )}

                {voc.memoryTipEn && (
                  <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-2 rounded">
                    <span className="font-semibold text-amber-700 dark:text-amber-400">Tip: </span>
                    <ChemText>{mode === 'mn' ? voc.memoryTipMn : voc.memoryTipEn}</ChemText>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        </div>

        <div className={topicPart === 'sim' ? '' : 'hidden'}>
        {/* Step 2b: Interactive visuals — change a value and watch the chemistry respond */}
        <LessonVisuals topicId={currentTopic.id} />
        </div>

        <div className={topicPart === 'concept' ? '' : 'hidden'}>
        {/* Step 3: High-Fidelity Scientific Visual Asset */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="relative h-64 sm:h-72 w-full">
            <img
              src={getTopicImage()}
              alt="Scientific Diagram / Apparatus"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="text-xs font-mono font-semibold text-teal-300 uppercase tracking-wider block">
                Official Cambridge Laboratory Visual
              </span>
              <p className="text-sm font-semibold text-white drop-shadow">
                <ChemText>{mode === 'mn' ? currentTopic.titleMn : currentTopic.titleEn}</ChemText>
              </p>
            </div>
          </div>
        </div>

        {/* Step 4: Step-by-Step Interactive Lesson Explanations */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {mode === 'mn' ? 'Хичээлийн тайлбар' : 'Concept Breakdown'}
            </h3>
          </div>

          <div className="space-y-6">
            {currentTopic.sections.filter(sec => level === 'extended' || sec.tier !== 'extended').map(sec => (
              <div key={sec.id} className="space-y-3">
                <h4 className="text-base font-bold text-emerald-700 dark:text-teal-300 flex flex-wrap items-center gap-2">
                  <ChemText>{mode === 'mn' ? sec.titleMn : sec.titleEn}</ChemText>
                  {sec.tier === 'extended' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60">
                      Extended
                    </span>
                  )}
                </h4>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                  <ChemText>{mode === 'mn' ? sec.contentMn : sec.contentEn}</ChemText>
                </p>

                {mode === 'dual' && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-line border-l-2 border-slate-300 dark:border-slate-700 pl-3">
                    <ChemText>{sec.contentMn}</ChemText>
                  </p>
                )}

                {sec.keyRuleEn && (
                  <div className="p-3 bg-emerald-50 dark:bg-teal-950/30 border border-emerald-200 dark:border-teal-800/60 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-emerald-800 dark:text-teal-400 block font-mono">
                      {mode === 'mn' ? '💡 Алтан дүрэм / Дүгнэлт:' : '💡 Key Rule to Remember:'}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      <ChemText>{mode === 'mn' ? sec.keyRuleMn : sec.keyRuleEn}</ChemText>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        </div>

        <div className={topicPart === 'example' ? '' : 'hidden'}>
        {/* Step 5: Worked Example & Common Pitfall */}
        {examples.map(ex => (
          <React.Fragment key={ex.id}>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {mode === 'mn' ? 'Ажилласан жишээ ба Шалгагчийн зөвлөгөө' : 'Worked Example & Common Pitfalls'}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                <ChemText>{ex.titleEn}</ChemText>
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
                <ChemText>{mode === 'mn' ? ex.questionMn : ex.questionEn}</ChemText>
              </p>
            </div>

            {/* Step-by-step Solution */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-teal-400 block font-mono">
                {mode === 'mn' ? 'Алхам алхмаар бодолт:' : 'Step-by-Step Mark Scheme Working:'}
              </span>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {(mode === 'mn'
                  ? ex.stepsMn
                  : ex.stepsEn
                ).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-teal-400 font-mono">✔</span>
                    <span><ChemText>{step}</ChemText></span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">Final Answer:</span>
                <span className="text-emerald-700 dark:text-teal-300 font-bold font-mono">
                  <ChemText>{mode === 'mn' ? ex.finalAnswerMn : ex.finalAnswerEn}</ChemText>
                </span>
              </div>
            </div>

            {/* Common Mistake Warning */}
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs space-y-1">
              <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                {mode === 'mn' ? 'Сурагчдын түгээмэл алддаг зүйл:' : 'Common Examiner Warning:'}
              </span>
              <p className="text-slate-700 dark:text-slate-300">
                <ChemText>{mode === 'mn' ? ex.commonMistakeMn : ex.commonMistakeEn}</ChemText>
              </p>
            </div>

            {/* Examiner Tip */}
            {ex.examinerTipEn && (
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5 font-mono">
                  💡 {mode === 'mn' ? 'Шалгагчийн зөвлөгөө (Examiner Tip):' : 'Cambridge Examiner Tip:'}
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  <ChemText>{mode === 'mn' ? ex.examinerTipMn : ex.examinerTipEn}</ChemText>
                </p>
              </div>
            )}
          </div>
        </div>
          </React.Fragment>
        ))}

        </div>

        <div className={topicPart === 'sim' ? '' : 'hidden'}>
        {/* Step 6: link to this topic's virtual lab in the Virtual Labs tab */}
        {recommendedLab && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                {mode === 'mn' ? 'Хичээлийн интерактив симуляц' : 'Integrated Virtual Simulation'}
              </h3>
            </div>
            <button
              onClick={() => jumpToSimulator(recommendedLab)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-sm transition-colors"
            >
              <FlaskConical className="w-4 h-4" />
              <span>{mode === 'mn' ? 'Виртуал лаб нээх' : 'Launch Virtual Lab'}</span>
            </button>
          </div>
        )}

        </div>

        <div className={topicPart === 'practice' ? '' : 'hidden'}>
        {/* Step 7: Practice Exam Questions with Easy / Medium / Hard Difficulty Levels */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {mode === 'mn' ? 'Сэдвийн шалгалтын тестүүд (3 түвшин)' : 'Topic Exam Quizzes (3 Levels)'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {mode === 'mn' ? 'Easy, Medium, Hard түвшнээр ангилсан дасгалууд' : 'Graded across Easy, Medium, and Hard difficulty'}
              </p>
            </div>

            {/* Difficulty Tabs */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold">
              {(['All', 'easy', 'medium', 'hard'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => setTopicQuizDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                    topicQuizDifficulty === diff
                      ? diff === 'easy'
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : diff === 'medium'
                        ? 'bg-amber-600 text-white font-bold shadow-xs'
                        : diff === 'hard'
                        ? 'bg-rose-600 text-white font-bold shadow-xs'
                        : 'bg-slate-800 text-white font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {diff === 'All'
                    ? (mode === 'mn' ? 'Бүгд' : 'All')
                    : diff === 'easy'
                    ? (mode === 'mn' ? 'Хялбар' : 'Easy')
                    : diff === 'medium'
                    ? (mode === 'mn' ? 'Дунд' : 'Med')
                    : (mode === 'mn' ? 'Хүнд' : 'Hard')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {currentTopic.questions
              .filter(q => {
                if (topicQuizDifficulty === 'All') return true;
                const effectiveDiff = q.difficulty || (q.paper === 'Paper 2' ? 'easy' : q.paper === 'Paper 4' ? 'medium' : 'hard');
                return effectiveDiff === topicQuizDifficulty;
              })
              .map(q => {
                const selectedOption = selectedAnswers[q.id];
                const isRevealed = revealedSolutions[q.id];
                const effectiveDiff = q.difficulty || (q.paper === 'Paper 2' ? 'easy' : q.paper === 'Paper 4' ? 'medium' : 'hard');

                return (
                  <div
                    key={q.id}
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-200 dark:border-slate-800/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-emerald-700 dark:text-teal-300 font-semibold border border-slate-200 dark:border-slate-700">
                          {q.paper}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                            effectiveDiff === 'easy'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                              : effectiveDiff === 'medium'
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                              : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                          }`}
                        >
                          {effectiveDiff === 'easy' ? 'Easy / Хялбар' : effectiveDiff === 'medium' ? 'Medium / Дунд' : 'Hard / Хүнд'}
                        </span>
                        <span>{q.syllabusRef}</span>
                      </div>
                      <span className="font-bold text-slate-800 dark:text-white">[{q.totalMarks} Marks]</span>
                    </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    <ChemText>{mode === 'mn' ? q.titleMn : q.titleEn}</ChemText>
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                    <ChemText>{mode === 'mn' ? q.questionTextMn : q.questionTextEn}</ChemText>
                  </p>

                  {/* Multiple Choice Options */}
                  {q.type === 'mcq' && q.options && (
                    <div className="space-y-2 pt-2">
                      {q.options.map(opt => {
                        const isChosen = selectedOption === opt.id;
                        const isCorrectOption = opt.id === q.correctOption;

                        let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80';
                        if (isRevealed) {
                          if (isCorrectOption) {
                            style = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                          } else if (isChosen && !isCorrectOption) {
                            style = 'bg-rose-100 dark:bg-rose-950/60 border-rose-400 dark:border-rose-500 text-rose-900 dark:text-rose-200 font-medium';
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(q, opt.id)}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-3 shadow-xs ${style}`}
                          >
                            <span className="font-mono font-bold text-slate-500 shrink-0">
                              {opt.id}.
                            </span>
                            <div className="space-y-1">
                              <span className="font-medium text-slate-900 dark:text-slate-100">
                                <ChemText>{mode === 'mn' ? opt.textMn : opt.textEn}</ChemText>
                              </span>
                              {isRevealed && (
                                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                                  <ChemText>{mode === 'mn' ? opt.rationaleMn : opt.rationaleEn}</ChemText>
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Structured Theory / Paper 6 Reveal */}
                  {q.type !== 'mcq' && (
                    <div className="pt-2">
                      <button
                        onClick={() => toggleStructuredReveal(q.id)}
                        className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-700 dark:text-teal-300 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700 shadow-xs"
                      >
                        {isRevealed
                          ? (mode === 'mn' ? 'Шалгуурыг нуух' : 'Hide Mark Scheme')
                          : (mode === 'mn' ? 'Кэмбрижийн үнэлгээний шалгуурыг харах' : 'View Cambridge Mark Scheme')}
                      </button>

                      {isRevealed && q.markScheme && (
                        <div className="mt-3 p-4 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 text-xs">
                          <span className="font-mono font-bold text-emerald-700 dark:text-teal-400 block border-b border-slate-200 dark:border-slate-800 pb-1">
                            Official Cambridge Mark Scheme:
                          </span>
                          <div className="space-y-2">
                            {q.markScheme.map(ms => (
                              <div key={ms.pointIndex} className="space-y-1">
                                <div className="text-slate-800 dark:text-slate-200 font-medium flex items-start justify-between gap-2">
                                  <span><ChemText>{mode === 'mn' ? ms.criterionMn : ms.criterionEn}</ChemText></span>
                                  <span className="font-mono font-bold text-emerald-600 dark:text-teal-400 shrink-0">
                                    [{ms.marks}]
                                  </span>
                                </div>
                                {ms.examinerNoteEn && (
                                  <div className="text-[11px] text-amber-700 dark:text-amber-300/80 pl-2 border-l border-amber-500/40">
                                    Examiner note: <ChemText>{mode === 'mn' ? ms.examinerNoteMn : ms.examinerNoteEn}</ChemText>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        </div>
        {shown.chapterId !== 'ch-states-of-matter' && (
          <TopicCheck
            topic={shown}
            mn={mode === 'mn'}
            nextTopic={nextTopic}
            onOpenTopic={setSelectedTopicId}
            onNext={() => nextTopic && setSelectedTopicId(nextTopic.id)}
          />
        )}
      </div>
    </div>
  );
};
