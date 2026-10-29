import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { ALEVEL_QUESTIONS } from '../data/alevelQuestions';
import { alevelCourse, chapterInCourse, visibleChapters } from '../data/alevelSyllabus';
import { TeacherProgress } from './TeacherProgress';
import { EnrollmentRequests } from './EnrollmentRequests';
import { TeacherResults } from './TeacherResults';
import { ExamQuestion, PaperType, CustomTest } from '../types/chemistry';
import { 
  Users, 
  PlusCircle, 
  FileText, 
  Share2, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  Copy,
  Printer
} from 'lucide-react';

type TeacherTab = 'results' | 'enrolments' | 'progress' | 'test_builder' | 'add_question';

// The Teacher Hub sections in the order a teacher uses them: students first, then enrollment, then the tools
const TABS: { id: TeacherTab; en: string; mn: string }[] = [
  { id: 'results', en: 'Students', mn: 'Суралцагчид' },
  { id: 'enrolments', en: 'Enrollments', mn: 'Элсэлт' },
  { id: 'progress', en: 'Skills checklist', mn: 'Ур чадварын явц' },
  { id: 'test_builder', en: 'Test builder', mn: 'Тест зохиох' },
  { id: 'add_question', en: 'Add question', mn: 'Асуулт нэмэх' }
];

export const TeacherPortalView: React.FC = () => {
  const { mode } = useLanguage();
  const { customTests, createCustomTest, addCustomQuestion, customQuestions, mistakes, programme, courseChoice } = useApp();

  const [activeTab, setActiveTab] = useState<TeacherTab>('results');

  // Test Builder state
  const [testTitle, setTestTitle] = useState<string>('Term 1 Electrolysis & Practical Assessment');
  const [testPaper, setTestPaper] = useState<PaperType>('Paper 4');
  const [testDuration, setTestDuration] = useState<number>(45);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>(['q-4-p4', 'q-1-p4']);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // New Question Form State
  const [qTitleEn, setQTitleEn] = useState<string>('');
  const [qTitleMn, setQTitleMn] = useState<string>('');
  const [qSyllabusRef, setQSyllabusRef] = useState<string>('0620/4.1');
  const [qChapterId, setQChapterId] = useState<string>('');
  const [qPaper, setQPaper] = useState<PaperType>('Paper 2');
  const [qTextEn, setQTextEn] = useState<string>('');
  const [qTextMn, setQTextMn] = useState<string>('');
  const [qMarks, setQMarks] = useState<number>(1);
  const [qMisconceptionEn, setQMisconceptionEn] = useState<string>('');
  const [qMisconceptionMn, setQMisconceptionMn] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // The question bank of the chosen course: the 0620 questions, or the 9701 questions of the chosen level (AS or A Level),
  // plus the questions the teacher has added for that course
  const bankQuestions: ExamQuestion[] = courseChoice === 'igcse'
    ? CURRICULUM_CHAPTERS.flatMap(c => c.topics.flatMap(t => t.questions))
    : ALEVEL_QUESTIONS;
  const allQuestions: ExamQuestion[] = [...bankQuestions, ...customQuestions].filter(q => chapterInCourse(q.chapterId, courseChoice));

  // The chapters the new question can be filed under: those of the chosen course
  const courseChapters = courseChoice === 'igcse' ? CURRICULUM_CHAPTERS : visibleChapters(ALEVEL_CHAPTERS, alevelCourse(courseChoice));
  const formChapter = courseChapters.find(c => c.id === qChapterId) ?? courseChapters[0];

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuestionIds.length === 0) return;

    createCustomTest({
      title: testTitle,
      paper: testPaper,
      timeLimitMinutes: testDuration,
      questionIds: selectedQuestionIds
    });

    setTestTitle('');
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qTitleEn || !qTextEn) return;

    const newQ: ExamQuestion = {
      id: `q-custom-${Date.now()}`,
      topicId: formChapter?.topics[0]?.id ?? '',
      chapterId: formChapter?.id ?? '',
      syllabusRef: qSyllabusRef,
      paper: qPaper,
      totalMarks: qMarks,
      titleEn: qTitleEn,
      titleMn: qTitleMn || qTitleEn,
      questionTextEn: qTextEn,
      questionTextMn: qTextMn || qTextEn,
      type: qPaper === 'Paper 2' ? 'mcq' : 'structured',
      misconceptionDiagnosisEn: qMisconceptionEn || 'Common conceptual error.',
      misconceptionDiagnosisMn: qMisconceptionMn || 'Түгээмэл ойлголтын алдаа.',
      remediationTopicId: 'top-4-1'
    };

    addCustomQuestion(newQ);
    setSuccessMsg(mode === 'mn' ? 'Асуулт амжилттай нэмэгдлээ!' : 'Question successfully added to question bank!');
    setQTitleEn('');
    setQTitleMn('');
    setQTextEn('');
    setQTextMn('');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-sky-900 border border-white/10 shadow-md rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
              <span>Educator & Curriculum Director Console</span>
              <span>·</span>
              <span>{courseChoice === 'a' ? 'A Level 9701' : courseChoice === 'as' ? 'AS Level 9701' : 'IGCSE 0620'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {mode === 'mn' ? 'Багшийн удирдлагын хэсэг & Аналитик' : 'Teacher Hub & Assessment Architect'}
            </h2>
            {programme === 'alevel' && (
              <p className="text-xs text-amber-300 mt-2">
                {mode === 'mn'
                  ? 'Асуултын сан ба тестийн үүсгүүр одоогоор IGCSE 0620-д зориулагдсан.'
                  : 'The question bank and test generator are built for IGCSE 0620 only for now.'}
              </p>
            )}
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap items-center p-1 gap-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                aria-pressed={activeTab === t.id}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  activeTab === t.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {mode === 'mn' ? t.mn : t.en}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {mode === 'mn'
            ? 'Сурагчдын түгээмэл алдааг хянах, Paper 2, 4, 6-ийн тусгайлсан тест зохиож код эсвэл хэвлэх холбоосоор хуваалцах боломжтой.'
            : 'Track frequent cohort misconceptions, generate custom Cambridge practice papers with shareable test codes, and enrich the question bank.'}
        </p>
      </div>

      {activeTab === 'progress' && <TeacherProgress />}

      {activeTab === 'results' && <TeacherResults />}

      {activeTab === 'enrolments' && <EnrollmentRequests />}

      {activeTab === 'test_builder' && (
        /* TAB 2: TEST PAPER GENERATOR */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Builder Form (6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 border border-indigo-900/60 shadow-sm rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              {mode === 'mn' ? 'Шинэ тест үүсгэх' : 'Create Custom Assessment'}
            </h3>

            <form onSubmit={handleCreateTest} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Assessment Title:</label>
                <input
                  type="text"
                  required
                  value={testTitle}
                  onChange={e => setTestTitle(e.target.value)}
                  placeholder="e.g. Unit 4 Electrolysis Speed Drill"
                  className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Paper Type:</label>
                  <select
                    value={testPaper}
                    onChange={e => setTestPaper(e.target.value as PaperType)}
                    className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs"
                  >
                    <option value="Paper 2">Paper 2 (MCQ)</option>
                    <option value="Paper 4">Paper 4 (Theory)</option>
                    <option value="Paper 6">Paper 6 (Practical)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Time Limit (mins):</label>
                  <input
                    type="number"
                    min="10"
                    max="120"
                    value={testDuration}
                    onChange={e => setTestDuration(Number(e.target.value))}
                    className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs"
                  />
                </div>
              </div>

              {/* Question Selection Checkboxes */}
              <div>
                <label className="text-slate-400 block mb-1.5">
                  Select Questions from Bank ({selectedQuestionIds.length} selected):
                </label>
                <div className="max-h-52 overflow-y-auto space-y-1.5 border border-slate-800 p-2 rounded bg-slate-950">
                  {allQuestions.map(q => {
                    const isChecked = selectedQuestionIds.includes(q.id);
                    return (
                      <label
                        key={q.id}
                        className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-900 cursor-pointer text-slate-300"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedQuestionIds(prev => [...prev, q.id]);
                            } else {
                              setSelectedQuestionIds(prev => prev.filter(id => id !== q.id));
                            }
                          }}
                          className="accent-purple-500"
                        />
                        <span className="font-mono text-teal-400 text-[10px]">[{q.paper}]</span>
                        <span className="truncate">{q.titleEn}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={selectedQuestionIds.length === 0}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white font-bold rounded-lg transition-colors"
              >
                {mode === 'mn' ? 'Тестийг үүсгэх & Код гаргах' : 'Generate Assessment Code'}
              </button>
            </form>
          </div>

          {/* Generated Tests List (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {mode === 'mn' ? 'Үүсгэсэн сорилууд ба Хуваалцах кодууд' : 'Published Assessments & Share Codes'}
            </h3>

            <div className="space-y-3">
              {customTests.map(t => (
                <div key={t.id} className="p-4 rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 border border-indigo-900/60 shadow-sm space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-sm">{t.title}</h4>
                      <div className="flex items-center gap-2 text-slate-400 mt-1 font-mono text-[11px]">
                        <span>{t.paper}</span>
                        <span>·</span>
                        <span>{t.timeLimitMinutes} mins</span>
                        <span>·</span>
                        <span>{t.questionIds.length} Questions</span>
                      </div>
                    </div>

                    {/* Share Code badge */}
                    <div className="flex items-center gap-1.5 bg-slate-950 border border-purple-800/80 px-2.5 py-1 rounded font-mono text-purple-300">
                      <span className="font-bold">{t.shareCode}</span>
                      <button
                        onClick={() => copyToClipboard(t.shareCode)}
                        title="Copy Share Code"
                        className="text-slate-400 hover:text-white"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {copiedCode === t.shareCode && (
                    <div className="text-[11px] text-teal-400 font-mono">
                      ✔ Code copied to clipboard for students!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'add_question' && (
        /* TAB 3: ADD CUSTOM QUESTION FORM */
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 border border-indigo-900/60 shadow-sm rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            {mode === 'mn' ? 'Шинэ шалгалтын асуулт нэмэх' : 'Add Question to Question Bank'}
          </h3>

          {successMsg && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-200 text-xs rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Question Title (English):</label>
                <input
                  type="text"
                  required
                  value={qTitleEn}
                  onChange={e => setQTitleEn(e.target.value)}
                  placeholder="e.g. Products of Molten Zinc Chloride"
                  className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Question Title (Mongolian):</label>
                <input
                  type="text"
                  value={qTitleMn}
                  onChange={e => setQTitleMn(e.target.value)}
                  placeholder="Жишээ: Хайлмал цайрын хлоридын электролиз"
                  className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Paper Type:</label>
                <select
                  value={qPaper}
                  onChange={e => setQPaper(e.target.value as PaperType)}
                  className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs"
                >
                  <option value="Paper 2">Paper 2 (MCQ)</option>
                  <option value="Paper 4">Paper 4 (Theory)</option>
                  <option value="Paper 6">Paper 6 (Practical)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Chapter:</label>
                <select
                  value={formChapter?.id ?? ''}
                  onChange={e => setQChapterId(e.target.value)}
                  className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs"
                >
                  {courseChapters.map(c => (
                    <option key={c.id} value={c.id}>{c.number}. {mode === 'mn' ? c.titleMn : c.titleEn}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Syllabus Ref:</label>
                <input
                  type="text"
                  value={qSyllabusRef}
                  onChange={e => setQSyllabusRef(e.target.value)}
                  className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Total Marks:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={qMarks}
                  onChange={e => setQMarks(Number(e.target.value))}
                  className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Question Text (English):</label>
              <textarea
                rows={3}
                required
                value={qTextEn}
                onChange={e => setQTextEn(e.target.value)}
                placeholder="State the observation at the positive anode when molten ZnCl₂ is electrolysed..."
                className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Question Text (Mongolian):</label>
              <textarea
                rows={3}
                value={qTextMn}
                onChange={e => setQTextMn(e.target.value)}
                placeholder="Хайлмал ZnCl2-ийг электролиз явуулахад эерэг анод дээр ямар үзэгдэл ажиглагдах вэ..."
                className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Misconception Diagnosis (EN):</label>
                <input
                  type="text"
                  value={qMisconceptionEn}
                  onChange={e => setQMisconceptionEn(e.target.value)}
                  placeholder="Confusing chlorine color with bromine..."
                  className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Misconception Diagnosis (MN):</label>
                <input
                  type="text"
                  value={qMisconceptionMn}
                  onChange={e => setQMisconceptionMn(e.target.value)}
                  placeholder="Хлорын өнгийг бромын өнгөтэй андуурах..."
                  className="w-full bg-indigo-950/70 border border-indigo-800/60 text-white rounded p-2 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors"
            >
              {mode === 'mn' ? 'Сан руу нэмэх' : 'Save Question to Bank'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
