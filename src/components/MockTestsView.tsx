import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Play, Send, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { MOCK_TESTS } from '../data/mockTests';
import type { ExamQuestion } from '../types/chemistry';

// The course tests in the Student area. A test is timed; after it ends, every answer gets detailed feedback: the right
// option and why each option is right or wrong, the mark points to tick, and the lesson to revise.

type Phase = 'list' | 'running' | 'review';

// A chapter below this percentage is marked for revision
const REVISE_BELOW = 60;

const CARD = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4';
const HEADING = 'text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono';
const INPUT = 'w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-2.5 text-slate-700 dark:text-slate-200';

const formatTime = (ms: number) => {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const formatDate = (ms: number, mn: boolean) =>
  new Date(ms).toLocaleString(mn ? 'mn-MN' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' });

const topicTitle = (topicId: string, mn: boolean): string => {
  for (const c of CURRICULUM_CHAPTERS) {
    const t = c.topics.find(x => x.id === topicId);
    if (t) return mn ? t.titleMn : t.titleEn;
  }
  return topicId;
};

const chapterTitle = (chapterId: string, mn: boolean): string => {
  const c = CURRICULUM_CHAPTERS.find(x => x.id === chapterId);
  return c ? (mn ? c.titleMn : c.titleEn) : chapterId;
};

export const MockTestsView: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { addMistake, logExamAnswer, jumpToTopic, testAttempts, addTestAttempt } = useApp();

  const [phase, setPhase] = useState<Phase>('list');
  const [testId, setTestId] = useState<string>(MOCK_TESTS[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // Structured questions: which mark points the student ticked, in the same order as the mark scheme
  const [ticks, setTicks] = useState<Record<string, boolean[]>>({});
  const [deadline, setDeadline] = useState<number>(0);
  const [now, setNow] = useState<number>(0);
  const [saved, setSaved] = useState<boolean>(false);

  const test = MOCK_TESTS.find(t => t.id === testId) ?? MOCK_TESTS[0];

  // Countdown: when time runs out the test ends and moves to the review
  useEffect(() => {
    if (phase !== 'running') return;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (t >= deadline) setPhase('review');
    };
    const id = window.setInterval(tick, 1000);
    // Background tabs slow timers down, so check again as soon as the tab is shown
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [phase, deadline]);

  const start = (id: string) => {
    const t = Date.now();
    const selected = MOCK_TESTS.find(x => x.id === id) ?? MOCK_TESTS[0];
    setTestId(selected.id);
    setAnswers({});
    setTicks({});
    setSaved(false);
    setNow(t);
    setDeadline(t + selected.minutes * 60000);
    setPhase('running');
  };

  const pick = (questionId: string, optionId: string) => setAnswers(prev => ({ ...prev, [questionId]: optionId }));

  const toggleTick = (q: ExamQuestion, index: number) =>
    setTicks(prev => {
      const current = [...(prev[q.id] ?? [])];
      current[index] = !current[index];
      return { ...prev, [q.id]: current };
    });

  // Marks for one question: one correct option for an MCQ, or the ticked mark points for a structured question
  const earnedOf = (q: ExamQuestion): number => {
    if (q.type === 'mcq') return answers[q.id] === q.correctOption ? 1 : 0;
    return (q.markScheme ?? []).reduce((sum, point, i) => sum + (ticks[q.id]?.[i] ? point.marks : 0), 0);
  };

  const totalMarks = test.questions.reduce((sum, q) => sum + q.totalMarks, 0);
  const earned = test.questions.reduce((sum, q) => sum + earnedOf(q), 0);
  const percent = totalMarks > 0 ? Math.round((earned / totalMarks) * 100) : 0;
  const remaining = deadline - now;
  const answeredCount = test.questions.filter(q => (answers[q.id] ?? '').trim() !== '').length;

  // Marks per chapter, with the first lesson to revise where marks were lost
  const chapterRows = useMemo(() => {
    const rows = new Map<string, { chapterId: string; total: number; earned: number; revise?: string }>();
    test.questions.forEach(q => {
      const row = rows.get(q.chapterId) ?? { chapterId: q.chapterId, total: 0, earned: 0 };
      const got = earnedOf(q);
      row.total += q.totalMarks;
      row.earned += got;
      if (got < q.totalMarks && !row.revise) row.revise = q.remediationTopicId;
      rows.set(q.chapterId, row);
    });
    return Array.from(rows.values());
  }, [test, answers, ticks]);

  // Saves the results to the student's stats and mistake notebook, once per test
  const saveResults = () => {
    if (saved) return;
    test.questions.forEach(q => {
      const got = earnedOf(q);
      if (q.type === 'mcq') {
        const picked = answers[q.id];
        if (!picked) return;
        logExamAnswer(q, got);
        if (got === 0) {
          const chosen = q.options?.find(o => o.id === picked);
          const right = q.options?.find(o => o.id === q.correctOption);
          addMistake({
            questionId: q.id,
            topicId: q.topicId,
            syllabusRef: q.syllabusRef,
            paper: q.paper,
            questionTitleEn: q.titleEn,
            questionTitleMn: q.titleMn,
            studentAnswer: `Option ${picked}: ${chosen?.textEn ?? ''}`,
            correctAnswer: `Option ${q.correctOption}: ${right?.textEn ?? ''}`,
            misconceptionDiagnosisEn: q.misconceptionDiagnosisEn,
            misconceptionDiagnosisMn: q.misconceptionDiagnosisMn
          });
        }
      } else {
        if (!ticks[q.id]?.some(Boolean)) return;
        logExamAnswer(q, got);
        if (got < q.totalMarks) {
          addMistake({
            questionId: q.id,
            topicId: q.topicId,
            syllabusRef: q.syllabusRef,
            paper: q.paper,
            questionTitleEn: q.titleEn,
            questionTitleMn: q.titleMn,
            studentAnswer: `${got}/${q.totalMarks} marks (self-marked)`,
            correctAnswer: q.modelAnswerEn ?? 'See mark scheme',
            misconceptionDiagnosisEn: q.misconceptionDiagnosisEn,
            misconceptionDiagnosisMn: q.misconceptionDiagnosisMn
          });
        }
      }
    });
    // The attempt (date and score) is kept in this browser, so it can be seen in the list of tests later
    addTestAttempt({
      testId: test.id,
      earned,
      total: totalMarks,
      percent,
      chapters: Object.fromEntries(
        chapterRows.map(row => [row.chapterId, row.total > 0 ? Math.round((row.earned / row.total) * 100) : 0])
      )
    });
    setSaved(true);
  };

  // ---------------------------------------------------------------- list of tests
  if (phase === 'list') {
    return (
      <section className={CARD}>
        <div className="space-y-1">
          <div className={HEADING}>{mn ? 'Курсын шалгалт' : 'Course tests'}</div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {mn
              ? 'Хугацаатай шалгалт. Дууссаны дараа хариулт бүрийн тайлбар, оноо авах зүйлс, давтах хичээлийн холбоос гарна.'
              : 'Timed tests. After you finish, every answer comes with an explanation, the mark points, and the lesson to revise.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MOCK_TESTS.map(t => {
            const marks = t.questions.reduce((sum, q) => sum + q.totalMarks, 0);
            const last = testAttempts.find(a => a.testId === t.id);
            return (
              <div key={t.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2.5">
                <div className="text-sm font-black text-slate-900 dark:text-white">{mn ? t.titleMn : t.titleEn}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{mn ? t.descriptionMn : t.descriptionEn}</p>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {mn
                    ? `${t.questions.length} асуулт · ${marks} оноо · ${t.minutes} мин`
                    : `${t.questions.length} questions · ${marks} marks · ${t.minutes} min`}
                </div>
                {last && (
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    {mn ? 'Сүүлд: ' : 'Last: '}
                    {formatDate(last.takenAt, mn)} · {last.earned} / {last.total} ({last.percent}%)
                  </div>
                )}
                <button
                  onClick={() => start(t.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-black"
                >
                  <Play className="w-3.5 h-3.5" aria-hidden />
                  {mn ? 'Эхлүүлэх' : 'Start'}
                </button>
              </div>
            );
          })}
        </div>
        {testAttempts.length > 0 && (
          <div className="space-y-2">
            <div className={HEADING}>{mn ? 'Оролдлогын түүх' : 'Attempt history'}</div>
            <ul className="space-y-1.5">
              {testAttempts.slice(0, 10).map(a => {
                const done = MOCK_TESTS.find(x => x.id === a.testId);
                return (
                  <li
                    key={a.id}
                    className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <span className="font-bold text-slate-900 dark:text-white">{done ? (mn ? done.titleMn : done.titleEn) : a.testId}</span>
                    <span className="text-slate-600 dark:text-slate-400">{formatDate(a.takenAt, mn)}</span>
                    <span className="font-black text-slate-900 dark:text-white">
                      {a.earned} / {a.total} ({a.percent}%)
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>
    );
  }

  // ---------------------------------------------------------------- running test
  if (phase === 'running') {
    const lowTime = remaining <= 2 * 60000;
    return (
      <section className={CARD}>
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className={HEADING}>{mn ? 'Шалгалт явагдаж байна' : 'Test in progress'}</div>
            <h2 className="text-base font-black text-slate-900 dark:text-white">{mn ? test.titleMn : test.titleEn}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className={`font-mono text-sm font-black ${lowTime ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200'}`}>
              {mn ? 'Үлдсэн: ' : 'Time left: '}
              {formatTime(remaining)}
            </span>
            <button
              onClick={() => setPhase('review')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black"
            >
              <Send className="w-3.5 h-3.5" aria-hidden />
              {mn ? 'Шалгалт дуусгах' : 'Finish test'}
            </button>
          </div>
        </div>
        <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
          {mn ? `Хариулсан: ${answeredCount} / ${test.questions.length}` : `Answered: ${answeredCount} / ${test.questions.length}`}
        </div>
        {test.questions.map((q, i) => (
          <div key={q.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {i + 1}. {mn ? q.questionTextMn : q.questionTextEn} <span className="text-slate-500">[{q.totalMarks}]</span>
            </div>
            {q.type === 'mcq' && q.options && (
              <div className="grid grid-cols-1 gap-1.5">
                {q.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => pick(q.id, opt.id)}
                    aria-pressed={answers[q.id] === opt.id}
                    className={`text-left px-3 py-2 rounded-xl border text-xs transition-colors ${
                      answers[q.id] === opt.id
                        ? 'bg-violet-600 text-white border-violet-600'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
                    }`}
                  >
                    {opt.id}. {mn ? opt.textMn : opt.textEn}
                  </button>
                ))}
              </div>
            )}
            {q.type !== 'mcq' && (
              <textarea
                value={answers[q.id] ?? ''}
                onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                rows={3}
                placeholder={mn ? 'Хариултаа энд бичнэ үү' : 'Write your answer here'}
                className={INPUT}
              />
            )}
          </div>
        ))}
      </section>
    );
  }

  // ---------------------------------------------------------------- review and feedback
  return (
    <section className={CARD}>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className={HEADING}>{mn ? 'Дүгнэлт ба санал' : 'Results and feedback'}</div>
          <h2 className="text-base font-black text-slate-900 dark:text-white">{mn ? test.titleMn : test.titleEn}</h2>
        </div>
        <div className="text-sm font-black text-slate-900 dark:text-white">
          {mn ? 'Нийт оноо' : 'Total'}: {earned} / {totalMarks} ({percent}%)
        </div>
      </div>

      <div className="space-y-2">
        <div className={HEADING}>{mn ? 'Бүлэг тус бүрээр' : 'By chapter'}</div>
        {chapterRows.map(row => {
          const pct = row.total > 0 ? Math.round((row.earned / row.total) * 100) : 0;
          const weak = pct < REVISE_BELOW;
          return (
            <div key={row.chapterId} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white">{chapterTitle(row.chapterId, mn)}</div>
                <div className={`text-xs font-black ${weak ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'}`}>
                  {row.earned} / {row.total} ({pct}%)
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className={`h-full ${weak ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }} />
              </div>
              {weak && row.revise && (
                <button onClick={() => jumpToTopic(row.revise!)} className="text-[11px] font-bold text-violet-700 dark:text-violet-300 hover:underline">
                  {mn ? `Давтах: ${topicTitle(row.revise, true)} →` : `Revise: ${topicTitle(row.revise, false)} →`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <div className={HEADING}>{mn ? 'Асуулт бүрийн санал' : 'Feedback by question'}</div>
        {test.questions.map((q, i) => {
          const got = earnedOf(q);
          const full = got === q.totalMarks;
          return (
            <div key={q.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {i + 1}. {mn ? q.titleMn : q.titleEn}
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-black ${full ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                  {full ? <CheckCircle2 className="w-4 h-4" aria-hidden /> : <XCircle className="w-4 h-4" aria-hidden />}
                  {got} / {q.totalMarks}
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? q.questionTextMn : q.questionTextEn}</p>

              {q.type === 'mcq' && q.options && (
                <div className="space-y-1.5">
                  {q.options.map(opt => {
                    const isRight = opt.id === q.correctOption;
                    const isChosen = answers[q.id] === opt.id;
                    const isWrongChoice = isChosen && !isRight;
                    return (
                      <div
                        key={opt.id}
                        className={`p-2.5 rounded-xl border text-xs ${
                          isRight
                            ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                            : isWrongChoice
                              ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                              : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="font-bold">
                          {opt.id}. {mn ? opt.textMn : opt.textEn}
                          {isChosen && <span className="ml-2 text-[10px] uppercase">{mn ? '(таны сонголт)' : '(your choice)'}</span>}
                        </div>
                        {(mn ? opt.rationaleMn : opt.rationaleEn) && (
                          <div className="mt-1 text-[11px] opacity-90">{mn ? opt.rationaleMn : opt.rationaleEn}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {q.type !== 'mcq' && (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-bold">{mn ? 'Таны хариулт: ' : 'Your answer: '}</span>
                    {answers[q.id]?.trim() ? answers[q.id] : (mn ? 'хариулаагүй' : 'not answered')}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {mn ? 'Оноо авах зүйлс (тэмдэглээд оноогоо тооц):' : 'Mark points (tick the ones you got):'}
                    </div>
                    {(q.markScheme ?? []).map((point, idx) => (
                      <label key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!ticks[q.id]?.[idx]}
                          onChange={() => toggleTick(q, idx)}
                          className="mt-0.5"
                        />
                        <span>
                          {mn ? point.pointMn : point.pointEn} <span className="text-slate-500">({point.marks})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-200">
                    <span className="font-bold">{mn ? 'Загвар хариулт: ' : 'Model answer: '}</span>
                    {mn ? q.modelAnswerMn : q.modelAnswerEn}
                  </div>
                </div>
              )}

              {!full && (
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
                  <span className="font-black">{mn ? 'Анхаарах зүйл: ' : 'Watch out: '}</span>
                  {mn ? q.misconceptionDiagnosisMn : q.misconceptionDiagnosisEn}
                </div>
              )}

              {!full && (
                <button
                  onClick={() => jumpToTopic(q.remediationTopicId)}
                  className="text-[11px] font-bold text-violet-700 dark:text-violet-300 hover:underline"
                >
                  {mn ? `Холбоотой хичээл: ${topicTitle(q.remediationTopicId, true)} →` : `Related lesson: ${topicTitle(q.remediationTopicId, false)} →`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-600 dark:text-slate-400">
        {mn
          ? 'Үр дүнг хадгалсны дараа л оролдлого (огноо, оноо) түүхэд бүртгэгдэнэ.'
          : 'The attempt (date and score) is added to the history only after you save the results.'}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={saveResults}
          disabled={saved}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-slate-400 text-white text-xs font-black"
        >
          {saved ? (mn ? 'Хадгалагдсан' : 'Saved') : mn ? 'Үр дүнг хадгалах' : 'Save results'}
        </button>
        <button
          onClick={() => setPhase('list')}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
        >
          {mn ? 'Шалгалтын жагсаалт руу буцах' : 'Back to the tests'}
        </button>
      </div>
    </section>
  );
};
