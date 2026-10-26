import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_QUESTIONS } from '../data/alevelQuestions';
import { CAMBRIDGE_PAST_PAPERS_2017_2024 } from '../data/pastPapersData';
import { ExamQuestion, PaperType } from '../types/chemistry';
import { ChemText } from './common/ChemText';
import { Timer, Play, Send, RotateCcw, CheckCircle2, XCircle, Search } from 'lucide-react';

type Phase = 'setup' | 'running' | 'review';
type Source = 'random' | 'custom';
type MarkPoint = NonNullable<ExamQuestion['markScheme']>[number];

const PAPERS: { id: PaperType; labelEn: string; labelMn: string }[] = [
  { id: 'Paper 2', labelEn: 'Paper 2 · MCQ', labelMn: 'Paper 2 · MCQ' },
  { id: 'Paper 4', labelEn: 'Paper 4 · Theory', labelMn: 'Paper 4 · Онолын' },
  { id: 'Paper 6', labelEn: 'Paper 6 · Practical', labelMn: 'Paper 6 · Практик' }
];

// Typical Cambridge timings: Paper 2 is 45 min, Paper 4 is 1 h 15 min, Paper 6 is 1 h.
const DEFAULT_MINUTES: Record<PaperType, number> = { 'Paper 2': 45, 'Paper 4': 75, 'Paper 6': 60 };

const marksOf = (q: ExamQuestion) => (q.type === 'mcq' ? 1 : q.totalMarks);

const clampMarks = (raw: string | undefined, max: number) => {
  const v = parseInt(raw ?? '', 10);
  if (Number.isNaN(v)) return 0;
  return Math.min(Math.max(v, 0), max);
};

const shuffle = <T,>(items: T[]): T[] => {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const formatTime = (ms: number) => {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const inputClass =
  'bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-amber-500';

export const ExamModeView: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { addMistake, logExamAnswer, customQuestions } = useApp();

  const pool: ExamQuestion[] = useMemo(() => {
    const curriculumQs = CURRICULUM_CHAPTERS.flatMap(c => c.topics.flatMap(t => t.questions));
    const map = new Map<string, ExamQuestion>();
    [...CAMBRIDGE_PAST_PAPERS_2017_2024, ...curriculumQs, ...ALEVEL_QUESTIONS, ...(customQuestions || [])].forEach(q => {
      if (!map.has(q.id)) map.set(q.id, q);
    });
    return Array.from(map.values());
  }, [customQuestions]);

  // Setup state
  const [phase, setPhase] = useState<Phase>('setup');
  const [source, setSource] = useState<Source>('random');
  const [paper, setPaper] = useState<PaperType>('Paper 2');
  const [count, setCount] = useState<number>(10);
  const [minutes, setMinutes] = useState<number>(DEFAULT_MINUTES['Paper 2']);
  const [customIds, setCustomIds] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');

  // Running state
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selfMarks, setSelfMarks] = useState<Record<string, string>>({});
  const [deadline, setDeadline] = useState<number>(0);
  const [now, setNow] = useState<number>(0);
  const [timedOut, setTimedOut] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  // Countdown: ticks every second and ends the exam when time runs out
  useEffect(() => {
    if (phase !== 'running') return;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (t >= deadline) {
        setTimedOut(true);
        setPhase('review');
      }
    };
    const id = window.setInterval(tick, 1000);
    // Browsers slow timers in background tabs, so re-check as soon as the tab is shown again
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [phase, deadline]);

  const candidates = useMemo(() => {
    const q = search.trim().toLowerCase();
    return pool
      .filter(x => x.paper === paper)
      .filter(x => !q || x.titleEn.toLowerCase().includes(q) || x.titleMn.toLowerCase().includes(q) || x.syllabusRef.toLowerCase().includes(q))
      .slice(0, 80);
  }, [pool, paper, search]);

  const changePaper = (p: PaperType) => {
    setPaper(p);
    setMinutes(DEFAULT_MINUTES[p]);
    setCustomIds([]);
  };

  const toggleCustom = (id: string) => {
    setCustomIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const startExam = () => {
    const chosen =
      source === 'custom'
        ? pool.filter(q => customIds.includes(q.id))
        : shuffle(pool.filter(q => q.paper === paper)).slice(0, Math.max(1, count));
    if (chosen.length === 0 || minutes <= 0) return;
    const t = Date.now();
    setQuestions(chosen);
    setAnswers({});
    setSelfMarks({});
    setSaved(false);
    setTimedOut(false);
    setNow(t);
    setDeadline(t + minutes * 60000);
    setPhase('running');
  };

  const mcqQs = questions.filter(q => q.type === 'mcq');
  const writtenQs = questions.filter(q => q.type !== 'mcq');
  const mcqCorrect = mcqQs.filter(q => answers[q.id] === q.correctOption).length;
  const writtenMarks = writtenQs.reduce((sum, q) => sum + clampMarks(selfMarks[q.id], q.totalMarks), 0);
  const totalMarks = questions.reduce((sum, q) => sum + marksOf(q), 0);
  const earned = mcqCorrect + writtenMarks;
  const answeredCount = questions.filter(q => (answers[q.id] ?? '').trim() !== '').length;
  const remaining = deadline - now;
  const lowTime = phase === 'running' && remaining <= 2 * 60000;

  // Saves answers to the student's stats and mistake notebook. Runs once.
  const saveResults = () => {
    if (saved) return;
    mcqQs.forEach(q => {
      const picked = answers[q.id];
      if (!picked) return;
      const ok = picked === q.correctOption;
      logExamAnswer(q, ok ? 1 : 0);
      if (!ok) {
        addMistake({
          questionId: q.id,
          topicId: q.topicId,
          syllabusRef: q.syllabusRef,
          paper: q.paper,
          questionTitleEn: q.titleEn,
          questionTitleMn: q.titleMn,
          studentAnswer: `Option ${picked}: ${q.options?.find(o => o.id === picked)?.textEn || ''}`,
          correctAnswer: `Option ${q.correctOption}: ${q.options?.find(o => o.id === q.correctOption)?.textEn || ''}`,
          misconceptionDiagnosisEn: q.misconceptionDiagnosisEn,
          misconceptionDiagnosisMn: q.misconceptionDiagnosisMn
        });
      }
    });
    writtenQs.forEach(q => {
      if (selfMarks[q.id] === undefined || selfMarks[q.id] === '') return;
      const got = clampMarks(selfMarks[q.id], q.totalMarks);
      const full = got === q.totalMarks;
      logExamAnswer(q, got);
      if (!full) {
        addMistake({
          questionId: q.id,
          topicId: q.topicId,
          syllabusRef: q.syllabusRef,
          paper: q.paper,
          questionTitleEn: q.titleEn,
          questionTitleMn: q.titleMn,
          studentAnswer: `${got}/${q.totalMarks} marks (self-marked)`,
          correctAnswer: q.modelAnswerEn || 'See mark scheme',
          misconceptionDiagnosisEn: q.misconceptionDiagnosisEn,
          misconceptionDiagnosisMn: q.misconceptionDiagnosisMn
        });
      }
    });
    setSaved(true);
  };

  const markText = (p: MarkPoint) => (mn ? (p.criterionMn ?? p.pointMn) : (p.criterionEn ?? p.pointEn)) ?? '';

  // ---------------------------------------------------------------- setup
  if (phase === 'setup') {
    const canStart = source === 'custom' ? customIds.length > 0 : pool.some(q => q.paper === paper);
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Timer className="w-5 h-5 text-emerald-600 dark:text-teal-400" />
            {mn ? 'Шалгалтын горим (цагтай)' : 'Exam Mode (timed)'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {mn
              ? 'Цагаа сонгоод шалгалтаа эхлүүлнэ. Цаг дуусахад шалгалт автоматаар дуусч, хариултаа шалгана.'
              : 'Choose a time, start the paper and the exam ends automatically when time runs out. Then mark it.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'random' as Source, en: 'Random paper', mn: 'Санамсаргүй шалгалт' },
            { id: 'custom' as Source, en: 'Build my own test', mn: 'Өөрийн тест зохиох' }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setSource(s.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                source === s.id ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {mn ? s.mn : s.en}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {PAPERS.map(p => (
            <button
              key={p.id}
              onClick={() => changePaper(p.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                paper === p.id
                  ? 'bg-teal-600 border-teal-600 text-white'
                  : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {mn ? p.labelMn : p.labelEn}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {source === 'random' && (
            <label className="space-y-1.5 block">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                {mn ? 'Асуултын тоо' : 'Number of questions'}
              </span>
              <input
                type="number"
                min={1}
                max={40}
                value={count}
                onChange={e => setCount(Math.min(40, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                className={`w-full ${inputClass}`}
              />
            </label>
          )}
          <label className="space-y-1.5 block">
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
              {mn ? 'Хугацаа (минут)' : 'Time limit (minutes)'}
            </span>
            <input
              type="number"
              min={1}
              max={180}
              value={minutes}
              onChange={e => setMinutes(Math.min(180, Math.max(1, parseInt(e.target.value, 10) || 1)))}
              className={`w-full ${inputClass}`}
            />
          </label>
        </div>

        {source === 'custom' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="relative flex-1 min-w-[12rem]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={mn ? 'Хайх: сэдэв эсвэл 1.2' : 'Search topic or syllabus ref'}
                  className={`w-full pl-8 ${inputClass}`}
                />
              </div>
              <span className="text-xs font-mono text-slate-500">
                {mn ? `${customIds.length} сонгосон` : `${customIds.length} selected`}
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
              {candidates.length === 0 && (
                <div className="p-4 text-xs text-slate-500">{mn ? 'Асуулт олдсонгүй.' : 'No questions found.'}</div>
              )}
              {candidates.map(q => (
                <label key={q.id} className="flex items-start gap-3 p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60">
                  <input
                    type="checkbox"
                    checked={customIds.includes(q.id)}
                    onChange={() => toggleCustom(q.id)}
                    className="mt-1"
                  />
                  <span className="flex-1 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-mono text-slate-400 mr-2">{q.syllabusRef}</span>
                    <ChemText>{mn ? q.titleMn : q.titleEn}</ChemText>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                    {marksOf(q)} {mn ? 'оноо' : 'marks'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={startExam}
            disabled={!canStart || minutes <= 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors"
          >
            <Play className="w-4 h-4" />
            {mn ? 'Шалгалтыг эхлүүлэх' : 'Start exam'}
          </button>
          <span className="text-xs text-slate-500">
            {source === 'random'
              ? mn
                ? `${pool.filter(q => q.paper === paper).length} асуултаас санамсаргүйгээр сонгоно.`
                : `Picked at random from ${pool.filter(q => q.paper === paper).length} questions.`
              : mn
                ? 'Сонгосон асуултуудаар тест зохионо.'
                : 'The test uses the questions you select.'}
          </span>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- running
  if (phase === 'running') {
    return (
      <div className="space-y-5 pb-20">
        <div className="sticky top-2 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className={`flex items-center gap-2 font-mono text-2xl font-extrabold ${lowTime ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
            <Timer className="w-5 h-5" />
            {formatTime(remaining)}
          </div>
          <div className="text-xs font-mono text-slate-500">
            {mn ? 'Хариулсан' : 'Answered'}: {answeredCount}/{questions.length}
          </div>
          <button
            onClick={() => setPhase('review')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white text-xs font-bold"
          >
            <Send className="w-3.5 h-3.5" />
            {mn ? 'Шалгалтыг дуусгах' : 'Finish exam'}
          </button>
        </div>

        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Q{idx + 1} · {q.syllabusRef} · {q.paper}</span>
              <span>{marksOf(q)} {mn ? 'оноо' : marksOf(q) === 1 ? 'mark' : 'marks'}</span>
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white"><ChemText>{mn ? q.titleMn : q.titleEn}</ChemText></div>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"><ChemText>{mn ? q.questionTextMn : q.questionTextEn}</ChemText></div>
            {q.practicalContext && (
              <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 rounded-xl p-3">
                <ChemText>{mn ? q.practicalContext.apparatusMn : q.practicalContext.apparatusEn}</ChemText>
              </div>
            )}

            {q.type === 'mcq' && q.options ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map(opt => {
                  const picked = answers[q.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                      className={`text-left p-3 rounded-xl border text-xs transition-colors ${
                        picked
                          ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-500 text-teal-900 dark:text-teal-200 font-bold'
                          : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-mono font-bold mr-2">{opt.id}</span>
                      <ChemText>{mn ? opt.textMn : opt.textEn}</ChemText>
                    </button>
                  );
                })}
              </div>
            ) : (
              <textarea
                rows={4}
                value={answers[q.id] ?? ''}
                onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                placeholder={mn ? 'Хариултаа энд бичнэ үү (шалгалтын дараа өөрөө оноолно)' : 'Write your answer here (you mark it yourself after the exam)'}
                className={`w-full ${inputClass}`}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  // ---------------------------------------------------------------- review
  const pct = totalMarks > 0 ? Math.round((earned / totalMarks) * 100) : 0;
  return (
    <div className="space-y-5 pb-20">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 space-y-4 shadow-sm">
        {timedOut && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs font-bold text-amber-800 dark:text-amber-300">
            {mn ? 'Цаг дууслаа. Шалгалт автоматаар дууслаа.' : "Time is up. The exam was submitted automatically."}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60">
            <div className="text-[11px] font-mono font-bold uppercase text-teal-700 dark:text-teal-400">{mn ? 'Нийт оноо' : 'Total score'}</div>
            <div className="text-2xl font-extrabold font-mono text-teal-900 dark:text-teal-200">{earned} / {totalMarks}</div>
            <div className="text-xs font-mono text-slate-500">{pct}%</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] font-mono font-bold uppercase text-slate-500">{mn ? 'MCQ зөв' : 'MCQ correct'}</div>
            <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">{mcqCorrect} / {mcqQs.length}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] font-mono font-bold uppercase text-slate-500">{mn ? 'Өөрөө оноосон оноо' : 'Self-marked marks'}</div>
            <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">{writtenMarks} / {writtenQs.reduce((s, q) => s + q.totalMarks, 0)}</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={saveResults}
            disabled={saved}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {saved ? (mn ? 'Хадгалагдсан' : 'Saved') : mn ? 'Оноог ахиц дээр хадгалах' : 'Save score to my progress'}
          </button>
          <button
            onClick={() => setPhase('setup')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {mn ? 'Шинэ шалгалт' : 'New exam'}
          </button>
        </div>
        <p className="text-[11px] text-slate-500">
          {mn
            ? 'Бичгийн хариултуудын оноог mark scheme-тэй харьцуулж өөрөө оруулна уу. Бүрэн оноогүй хариулт алдааны дэвтэрт орно.'
            : 'Compare written answers with the mark scheme and enter your marks. Answers that are not full marks go to your Mistake Notebook.'}
        </p>
      </div>

      {questions.map((q, idx) => {
        const picked = answers[q.id];
        const isMcq = q.type === 'mcq' && !!q.options;
        return (
          <div key={q.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Q{idx + 1} · {q.syllabusRef} · {q.paper}</span>
              <span>{marksOf(q)} {mn ? 'оноо' : marksOf(q) === 1 ? 'mark' : 'marks'}</span>
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white"><ChemText>{mn ? q.titleMn : q.titleEn}</ChemText></div>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"><ChemText>{mn ? q.questionTextMn : q.questionTextEn}</ChemText></div>

            {isMcq && q.options && (
              <div className="space-y-2">
                {q.options.map(opt => {
                  const isRight = opt.id === q.correctOption;
                  const isPicked = opt.id === picked;
                  return (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                        isRight
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                          : isPicked
                            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200'
                            : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="font-mono font-bold">{opt.id}</span>
                      <span className="flex-1"><ChemText>{mn ? opt.textMn : opt.textEn}</ChemText></span>
                      {isRight && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {isPicked && !isRight && <XCircle className="w-4 h-4 text-rose-600" />}
                    </div>
                  );
                })}
                <div className="text-xs font-bold">
                  {picked === q.correctOption ? (
                    <span className="text-emerald-700 dark:text-emerald-400">{mn ? 'Зөв' : 'Correct'}</span>
                  ) : picked ? (
                    <span className="text-rose-700 dark:text-rose-400">{mn ? 'Буруу' : 'Incorrect'}</span>
                  ) : (
                    <span className="text-slate-500">{mn ? 'Хариулаагүй' : 'Not answered'}</span>
                  )}
                </div>
              </div>
            )}

            {!isMcq && (
              <div className="space-y-3">
                {answers[q.id] && (
                  <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 rounded-xl p-3 whitespace-pre-wrap">{answers[q.id]}</div>
                )}
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  {mn ? 'Миний оноо' : 'My mark'}
                  <input
                    type="number"
                    min={0}
                    max={q.totalMarks}
                    value={selfMarks[q.id] ?? ''}
                    onChange={e => setSelfMarks(prev => ({ ...prev, [q.id]: e.target.value }))}
                    disabled={saved}
                    className={`w-20 ${inputClass}`}
                  />
                  <span className="font-mono text-slate-400">/ {q.totalMarks}</span>
                </label>
                <details className="text-xs">
                  <summary className="cursor-pointer font-bold text-teal-700 dark:text-teal-400">{mn ? 'Mark scheme харах' : 'Show mark scheme'}</summary>
                  <div className="mt-2 space-y-1.5">
                    {(q.markScheme ?? []).map((p, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300">
                        <ChemText>{markText(p)}</ChemText>
                      </div>
                    ))}
                    {q.modelAnswerEn && (
                      <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200">
                        <ChemText>{mn ? q.modelAnswerMn ?? '' : q.modelAnswerEn}</ChemText>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
