import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { ALEVEL_QUESTIONS } from '../data/alevelQuestions';
import { alevelCourse, chapterInCourse, visibleChapters } from '../data/alevelSyllabus';
import { TeacherProgress } from './TeacherProgress';
import { EnrollmentRequests } from './EnrollmentRequests';
import { SiteAddresses } from './SiteAddresses';
import { TeacherNotices } from './TeacherNotices';
import { TeacherResults } from './TeacherResults';
import { TeacherSurveyAnswers } from './TeacherSurveyAnswers';
import { useWaitingEnrollments } from '../lib/waitingEnrollments';
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
  Printer,
  Trash2
} from 'lucide-react';

type TeacherTab = 'results' | 'enrolments' | 'progress' | 'surveys' | 'test_builder' | 'add_question' | 'notices';

// The Teacher Hub sections in the order a teacher uses them: students first, then enrollment, then the tools
const TABS: { id: TeacherTab; en: string; mn: string }[] = [
  { id: 'results', en: 'Students', mn: 'Суралцагчид' },
  { id: 'enrolments', en: 'Enrollments', mn: 'Элсэлт' },
  { id: 'progress', en: 'Skills checklist', mn: 'Ур чадварын явц' },
  { id: 'surveys', en: 'Survey answers', mn: 'Асуулгын хариу' },
  { id: 'test_builder', en: 'Test builder', mn: 'Тест зохиох' },
  { id: 'add_question', en: 'Add question', mn: 'Асуулт нэмэх' },
  { id: 'notices', en: 'Notices', mn: 'Мэдэгдэл' }
];

export const TeacherPortalView: React.FC = () => {
  const { mode } = useLanguage();
  const { customTests, createCustomTest, deleteCustomTest, addCustomQuestion, customQuestions, mistakes, programme, courseChoice } = useApp();

  const [activeTab, setActiveTab] = useState<TeacherTab>('results');
  // The enrolment requests waiting for the teacher, live: a badge on the Enrollments tab and a banner on the others
  const waiting = useWaitingEnrollments();
  // The test whose delete is waiting for a second click (no browser pop-up is used for it)
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
      <SiteAddresses />
      {/* Top Banner */}
      <div className="bg-indigo-100 border border-slate-400 shadow-md rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-400 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-semibold uppercase tracking-wider">
              <span>Educator & Curriculum Director Console</span>
              <span>·</span>
              <span>{courseChoice === 'a' ? 'A Level 9701' : courseChoice === 'as' ? 'AS Level 9701' : 'IGCSE 0620'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {mode === 'mn' ? 'Багшийн удирдлагын хэсэг & Аналитик' : 'Teacher Hub & Assessment Architect'}
            </h2>
            {programme === 'alevel' && (
              <p className="text-xs text-amber-700 mt-2">
                {mode === 'mn'
                  ? 'Асуултын сан ба тестийн үүсгүүр одоогоор IGCSE 0620-д зориулагдсан.'
                  : 'The question bank and test generator are built for IGCSE 0620 only for now.'}
              </p>
            )}
          </div>

          {/* Tab selector: students and their results first (4), then the tools and notices (3), in an even grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 w-full sm:w-[34rem] bg-slate-200 border border-slate-400 rounded-lg text-xs">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                aria-pressed={activeTab === t.id}
                className={`px-3 py-1.5 rounded font-medium text-center whitespace-nowrap transition-colors ${
                  activeTab === t.id
                    ? 'bg-purple-200 text-purple-800 border border-purple-500/40'
                    : 'text-slate-600 hover:text-slate-900 border border-transparent'
                }`}
              >
                {mode === 'mn' ? t.mn : t.en}
                {/* The number of waiting requests, small, beside the tab's name */}
                {t.id === 'enrolments' && waiting.length > 0 && (
                  <sup className="ml-0.5 rounded-full bg-rose-500 px-1 text-[9px] font-bold leading-none text-white align-super">
                    {waiting.length}
                  </sup>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* New enrolment requests: a banner on every tab but Enrollments, with one press to go there */}
        {waiting.length > 0 && activeTab !== 'enrolments' && (
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-rose-400 bg-rose-50 px-4 py-3">
            <span className="text-sm font-bold text-rose-800">
              {mode === 'mn' ? `🔔 ${waiting.length} элсэлтийн хүсэлт таны шийдвэрийг хүлээж байна` : `🔔 ${waiting.length} enrolment request(s) waiting for you`}
            </span>
            <span className="text-xs text-rose-700">
              {waiting.slice(0, 3).map(e => `${e.name}${e.grade ? ` (${e.grade})` : ''}`).join(', ')}
              {waiting.length > 3 ? ' …' : ''}
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('enrolments')}
              className="ml-auto rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-500"
            >
              {mode === 'mn' ? 'Элсэлт рүү очих' : 'Go to Enrollments'}
            </button>
          </div>
        )}

        <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed">
          {mode === 'mn'
            ? 'Сурагчдын түгээмэл алдааг хянах, Paper 2, 4, 6-ийн тусгайлсан тест зохиож код эсвэл хэвлэх холбоосоор хуваалцах боломжтой.'
            : 'Track frequent cohort misconceptions, generate custom Cambridge practice papers with shareable test codes, and enrich the question bank.'}
        </p>
      </div>

      {activeTab === 'progress' && <TeacherProgress />}
      {activeTab === 'surveys' && <TeacherSurveyAnswers />}
      {activeTab === 'notices' && <TeacherNotices />}

      {activeTab === 'results' && <TeacherResults />}

      {activeTab === 'enrolments' && <EnrollmentRequests />}

      {activeTab === 'test_builder' && (
        /* TAB 2: TEST PAPER GENERATOR */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Builder Form (6 cols) */}
          <div className="lg:col-span-6 bg-slate-100 border border-slate-400/70 shadow-sm rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-400 pb-2">
              {mode === 'mn' ? 'Шинэ тест үүсгэх' : 'Create Custom Assessment'}
            </h3>

            <form onSubmit={handleCreateTest} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-600 block mb-1">Assessment Title:</label>
                <input
                  type="text"
                  required
                  value={testTitle}
                  onChange={e => setTestTitle(e.target.value)}
                  placeholder="e.g. Unit 4 Electrolysis Speed Drill"
                  className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1">Paper Type:</label>
                  <select
                    value={testPaper}
                    onChange={e => setTestPaper(e.target.value as PaperType)}
                    className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs"
                  >
                    <option value="Paper 2">Paper 2 (MCQ)</option>
                    <option value="Paper 4">Paper 4 (Theory)</option>
                    <option value="Paper 6">Paper 6 (Practical)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-600 block mb-1">Time Limit (mins):</label>
                  <input
                    type="number"
                    min="10"
                    max="120"
                    value={testDuration}
                    onChange={e => setTestDuration(Number(e.target.value))}
                    className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs"
                  />
                </div>
              </div>

              {/* Question Selection Checkboxes */}
              <div>
                <label className="text-slate-600 block mb-1.5">
                  Select Questions from Bank ({selectedQuestionIds.length} selected):
                </label>
                <div className="max-h-52 overflow-y-auto space-y-1.5 border border-slate-400 p-2 rounded bg-slate-200">
                  {allQuestions.map(q => {
                    const isChecked = selectedQuestionIds.includes(q.id);
                    return (
                      <label
                        key={q.id}
                        className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-200 cursor-pointer text-slate-700"
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
                        <span className="font-mono text-teal-700 text-[10px]">[{q.paper}]</span>
                        <span className="truncate">{q.titleEn}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={selectedQuestionIds.length === 0}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-100 text-white font-bold rounded-lg transition-colors"
              >
                {mode === 'mn' ? 'Тестийг үүсгэх & Код гаргах' : 'Generate Assessment Code'}
              </button>
            </form>
          </div>

          {/* Generated Tests List (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {mode === 'mn' ? 'Үүсгэсэн сорилууд ба Хуваалцах кодууд' : 'Published Assessments & Share Codes'}
            </h3>

            <div className="space-y-3">
              {customTests.map(t => (
                <div key={t.id} className="p-4 rounded-xl bg-slate-100 border border-slate-400/70 shadow-sm space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.title}</h4>
                      <div className="flex items-center gap-2 text-slate-600 mt-1 font-mono text-[11px]">
                        <span>{t.paper}</span>
                        <span>·</span>
                        <span>{t.timeLimitMinutes} mins</span>
                        <span>·</span>
                        <span>{t.questionIds.length} Questions</span>
                      </div>
                    </div>

                    {/* Share Code badge */}
                    <div className="flex items-center gap-1.5 bg-slate-200 border border-purple-400 px-2.5 py-1 rounded font-mono text-purple-800">
                      <span className="font-bold">{t.shareCode}</span>
                      <button
                        onClick={() => copyToClipboard(t.shareCode)}
                        title="Copy Share Code"
                        className="text-slate-600 hover:text-slate-900"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {copiedCode === t.shareCode && (
                    <div className="text-[11px] text-teal-700 font-mono">
                      ✔ Code copied to clipboard for students!
                    </div>
                  )}

                  {/* Delete: the first click asks, the second removes the test and its share code */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-400/70">
                    {deleteId === t.id ? (
                      <>
                        <span className="text-rose-800 font-bold mr-auto">
                          {mode === 'mn' ? 'Энэ сорилыг устгах уу?' : 'Delete this assessment?'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            deleteCustomTest(t.id);
                            setDeleteId(null);
                          }}
                          className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold"
                        >
                          {mode === 'mn' ? 'Тийм, устга' : 'Yes, delete'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(null)}
                          className="px-3 py-1 rounded-lg border border-slate-400 text-slate-800 font-bold hover:bg-slate-300"
                        >
                          {mode === 'mn' ? 'Болих' : 'Cancel'}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteId(t.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-rose-500/60 text-rose-800 font-bold hover:bg-rose-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        {mode === 'mn' ? 'Устгах' : 'Delete'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'add_question' && (
        /* TAB 3: ADD CUSTOM QUESTION FORM */
        <div className="bg-slate-100 border border-slate-400/70 shadow-sm rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-400 pb-2">
            {mode === 'mn' ? 'Шинэ шалгалтын асуулт нэмэх' : 'Add Question to Question Bank'}
          </h3>

          {successMsg && (
            <div className="p-3 bg-emerald-100 border border-emerald-800 text-emerald-900 text-xs rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 block mb-1">Question Title (English):</label>
                <input
                  type="text"
                  required
                  value={qTitleEn}
                  onChange={e => setQTitleEn(e.target.value)}
                  placeholder="e.g. Products of Molten Zinc Chloride"
                  className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Question Title (Mongolian):</label>
                <input
                  type="text"
                  value={qTitleMn}
                  onChange={e => setQTitleMn(e.target.value)}
                  placeholder="Жишээ: Хайлмал цайрын хлоридын электролиз"
                  className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-slate-600 block mb-1">Paper Type:</label>
                <select
                  value={qPaper}
                  onChange={e => setQPaper(e.target.value as PaperType)}
                  className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs"
                >
                  <option value="Paper 2">Paper 2 (MCQ)</option>
                  <option value="Paper 4">Paper 4 (Theory)</option>
                  <option value="Paper 6">Paper 6 (Practical)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Chapter:</label>
                <select
                  value={formChapter?.id ?? ''}
                  onChange={e => setQChapterId(e.target.value)}
                  className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs"
                >
                  {courseChapters.map(c => (
                    <option key={c.id} value={c.id}>{c.number}. {mode === 'mn' ? c.titleMn : c.titleEn}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Syllabus Ref:</label>
                <input
                  type="text"
                  value={qSyllabusRef}
                  onChange={e => setQSyllabusRef(e.target.value)}
                  className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Total Marks:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={qMarks}
                  onChange={e => setQMarks(Number(e.target.value))}
                  className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-600 block mb-1">Question Text (English):</label>
              <textarea
                rows={3}
                required
                value={qTextEn}
                onChange={e => setQTextEn(e.target.value)}
                placeholder="State the observation at the positive anode when molten ZnCl₂ is electrolysed..."
                className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-slate-600 block mb-1">Question Text (Mongolian):</label>
              <textarea
                rows={3}
                value={qTextMn}
                onChange={e => setQTextMn(e.target.value)}
                placeholder="Хайлмал ZnCl2-ийг электролиз явуулахад эерэг анод дээр ямар үзэгдэл ажиглагдах вэ..."
                className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 block mb-1">Misconception Diagnosis (EN):</label>
                <input
                  type="text"
                  value={qMisconceptionEn}
                  onChange={e => setQMisconceptionEn(e.target.value)}
                  placeholder="Confusing chlorine color with bromine..."
                  className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Misconception Diagnosis (MN):</label>
                <input
                  type="text"
                  value={qMisconceptionMn}
                  onChange={e => setQMisconceptionMn(e.target.value)}
                  placeholder="Хлорын өнгийг бромын өнгөтэй андуурах..."
                  className="w-full bg-slate-200/70 border border-slate-400/70 text-slate-900 rounded p-2 text-xs"
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
