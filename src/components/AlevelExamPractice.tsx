import React, { useEffect, useMemo, useState } from 'react';
import { Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { ALEVEL_QUESTIONS } from '../data/alevelQuestions';
import { ALEVEL_INQUIRY } from '../data/alevelInquiry';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { alevelCourse, chapterLevel, isVisibleFor } from '../data/alevelSyllabus';
import { useKeptAnswers } from '../lib/keptAnswers';
import { recordActivity } from '../lib/activity';
import { cambridgeGrade } from '../lib/grade';
import type { ExamQuestion } from '../types/chemistry';

// Timed practice in the style of the 9701 papers, from this site's own questions (none is copied from a Cambridge paper):
//  - Paper 1 style: multiple choice from the 9701 question bank, about 1 min 50 s a question (Paper 1 is 40 questions in
//    1 h 15 min). Each wrong or unanswered question goes to the mistake notebook with its explanation.
//  - Paper 2 style (AS): the structured questions of the AS lessons, about 1 min 15 s a mark (Paper 2 is 60 marks in
//    1 h 15 min). The student writes the answers, then ticks the mark points earned against the mark scheme; each question
//    with marks lost goes to the mistake notebook with the points missed. A Level has no structured set yet.
// Every answer counts in the student's results (logExamAnswer), and the whole set as one practice result the teacher sees.

type Kind = 'p1' | 'p2';
type Bi = { en: string; mn: string };

interface Structured {
  id: string; // al-struct-<chapter id>
  chapterId: string;
  topicId: string;
  syllabusRef: string;
  prompt: Bi;
  marks: Bi[];
  total: number;
}

const P1_SECONDS = 112; // a question
const P2_SECONDS = 75; // a mark
const CARD = 'rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 space-y-5';

// The structured questions of the AS lessons, one for each chapter that has an inquiry lesson
const STRUCTURED: Structured[] = Object.entries(ALEVEL_INQUIRY).map(([chapterId, plan]) => {
  const n = chapterId.replace('al-ch-', '');
  return {
    id: `al-struct-${chapterId}`,
    chapterId,
    topicId: `al-${n}.1`,
    syllabusRef: `9701/${n}.1`,
    prompt: plan.structured.prompt,
    marks: plan.structured.marks,
    total: plan.structured.total
  };
});

const shuffle = <T,>(list: T[]): T[] => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

interface Run {
  kind: Kind | null;
  ids: string[];
  picks: Record<string, string>; // Paper 1: the option chosen
  texts: Record<string, string>; // Paper 2: the answer written
  ticks: Record<string, number[]>; // Paper 2: the mark points the student says they earned
  startedAt: number | null;
  submitted: boolean;
  saved: boolean; // the results and mistakes are recorded (once)
}
const EMPTY: Run = { kind: null, ids: [], picks: {}, texts: {}, ticks: {}, startedAt: null, submitted: false, saved: false };

export const AlevelExamPractice: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { courseChoice, addMistake, logExamAnswer } = useApp();
  const course = alevelCourse(courseChoice);
  const t = (b: Bi) => (mn ? b.mn : b.en);

  // The chapters of this level, and the questions of each kind
  const chapters = useMemo(() => ALEVEL_CHAPTERS.filter(c => isVisibleFor(chapterLevel(c.id), course)), [course]);
  const chapterIds = useMemo(() => new Set(chapters.map(c => c.id)), [chapters]);
  const mcqPool = useMemo(() => ALEVEL_QUESTIONS.filter(q => q.type === 'mcq' && chapterIds.has(q.chapterId)), [chapterIds]);
  const structuredPool = useMemo(() => STRUCTURED.filter(s => chapterIds.has(s.chapterId)), [chapterIds]);

  const [kindPick, setKindPick] = useState<Kind>('p1');
  const [chapterPick, setChapterPick] = useState('all');
  const [size, setSize] = useState(10);
  const [run, setRun] = useState<Run>(EMPTY);
  // The set in progress comes back on this page, and on the student's account when signed in
  useKeptAnswers(`alevel_paper_practice_${course}`, run, saved => setRun({ ...EMPTY, ...saved }));

  const mcqById = useMemo(() => new Map(mcqPool.map(q => [q.id, q] as const)), [mcqPool]);
  const structuredById = useMemo(() => new Map(structuredPool.map(s => [s.id, s] as const)), [structuredPool]);
  const mcqs = run.kind === 'p1' ? run.ids.map(id => mcqById.get(id)).filter((q): q is ExamQuestion => !!q) : [];
  const structured = run.kind === 'p2' ? run.ids.map(id => structuredById.get(id)).filter((s): s is Structured => !!s) : [];

  // The time: from the start, for the whole set
  const totalSeconds = run.kind === 'p1' ? mcqs.length * P1_SECONDS : structured.reduce((n, s) => n + s.total * P2_SECONDS, 0);
  const endsAt = run.startedAt === null ? null : run.startedAt + totalSeconds * 1000;
  const [clock, setClock] = useState(() => Date.now());
  useEffect(() => {
    if (endsAt === null || run.submitted) return;
    const id = window.setInterval(() => setClock(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [endsAt, run.submitted]);
  const left = endsAt === null ? null : Math.max(0, Math.ceil((endsAt - clock) / 1000));

  const start = () => {
    const inChapter = <T extends { chapterId: string }>(list: T[]) => (chapterPick === 'all' ? list : list.filter(x => x.chapterId === chapterPick));
    const ids = kindPick === 'p1' ? shuffle(inChapter(mcqPool)).slice(0, size).map(q => q.id) : shuffle(inChapter(structuredPool)).slice(0, size).map(s => s.id);
    if (ids.length === 0) return;
    setRun({ ...EMPTY, kind: kindPick, ids, startedAt: Date.now() });
  };

  // Paper 1: marked at once on submit; each wrong or unanswered question goes to the mistake notebook
  const p1Right = mcqs.filter(q => run.picks[q.id] === q.correctOption).length;
  const p1Percent = mcqs.length ? Math.round((p1Right / mcqs.length) * 100) : 0;
  const submitP1 = () => {
    if (run.saved) return;
    mcqs.forEach(q => {
      const pick = run.picks[q.id];
      const right = pick === q.correctOption;
      logExamAnswer({ ...q, paper: 'Paper 1' }, right ? 1 : 0);
      if (!right) {
        addMistake({
          questionId: q.id,
          topicId: q.topicId,
          syllabusRef: q.syllabusRef,
          paper: 'Paper 1',
          questionTitleEn: q.titleEn,
          questionTitleMn: q.titleMn,
          studentAnswer: pick ? `Option ${pick}: ${q.options?.find(o => o.id === pick)?.textEn ?? ''}` : 'No answer (time)',
          correctAnswer: `Option ${q.correctOption}: ${q.options?.find(o => o.id === q.correctOption)?.textEn ?? ''}`,
          misconceptionDiagnosisEn: q.misconceptionDiagnosisEn,
          misconceptionDiagnosisMn: q.misconceptionDiagnosisMn
        });
      }
    });
    const label = course === 'as' ? 'Paper 1 style' : 'A Level multiple choice';
    recordActivity({
      kind: 'practice',
      course: courseChoice,
      percent: p1Percent,
      label: { en: `${label} · ${mcqs.length} questions`, mn: `${course === 'as' ? 'Paper 1 хэв маягийн' : 'A Level олон сонголттой'} · ${mcqs.length} асуулт` }
    });
    setRun(r => ({ ...r, submitted: true, saved: true }));
  };

  // Paper 2: submitted first (the mark scheme opens), then the student ticks the points earned and saves
  const p2Earned = structured.reduce((n, s) => n + (run.ticks[s.id]?.length ?? 0), 0);
  const p2Total = structured.reduce((n, s) => n + s.total, 0);
  const submitP2 = () => setRun(r => ({ ...r, submitted: true }));
  // The structured paper of the level: Paper 2 for AS, Paper 4 for A Level
  const structuredPaper = course === 'as' ? 'Paper 2' : 'Paper 4';
  const saveP2 = () => {
    if (run.saved) return;
    structured.forEach(s => {
      const got = run.ticks[s.id] ?? [];
      logExamAnswer({ id: s.id, topicId: s.topicId, paper: structuredPaper, totalMarks: s.total }, got.length);
      const missed = s.marks.filter((_, k) => !got.includes(k));
      if (missed.length > 0) {
        addMistake({
          questionId: s.id,
          topicId: s.topicId,
          syllabusRef: s.syllabusRef,
          paper: structuredPaper,
          questionTitleEn: s.prompt.en.slice(0, 90),
          questionTitleMn: s.prompt.mn.slice(0, 90),
          studentAnswer: (run.texts[s.id] ?? '').trim().slice(0, 300) || 'No answer',
          correctAnswer: s.marks.map(m => m.en).join(' · '),
          misconceptionDiagnosisEn: `Marks missed (${missed.length} of ${s.total}): ${missed.map(m => m.en).join('; ')}`,
          misconceptionDiagnosisMn: `Алдсан оноо (${s.total}-аас ${missed.length}): ${missed.map(m => m.mn).join('; ')}`
        });
      }
    });
    recordActivity({
      kind: 'practice',
      course: courseChoice,
      percent: p2Total ? Math.round((p2Earned / p2Total) * 100) : 0,
      label: { en: `${structuredPaper} style · ${structured.length} questions`, mn: `${structuredPaper} хэв маягийн · ${structured.length} асуулт` }
    });
    setRun(r => ({ ...r, saved: true }));
  };

  // When the time is up, the set is submitted with the answers given so far
  useEffect(() => {
    if (left === 0 && !run.submitted && run.kind) {
      if (run.kind === 'p1') submitP1();
      else submitP2();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  const kindName = (k: Kind): Bi =>
    k === 'p1'
      ? course === 'as'
        ? { mn: 'Paper 1 хэв маягийн · олон сонголттой', en: 'Paper 1 style · multiple choice' }
        : { mn: 'Олон сонголттой · A Level бүлгүүд', en: 'Multiple choice · A Level chapters' }
      : course === 'as'
        ? { mn: 'Paper 2 хэв маягийн · бүтэцтэй', en: 'Paper 2 style · structured' }
        : { mn: 'Paper 4 хэв маягийн · бүтэцтэй', en: 'Paper 4 style · structured' };
  const sizes = kindPick === 'p1' ? [10, 20, 40] : [3, 5];
  const available = kindPick === 'p1' ? mcqPool : structuredPool;
  const inPick = chapterPick === 'all' ? available.length : available.filter(x => x.chapterId === chapterPick).length;
  const chooser = (on: boolean) =>
    `rounded-xl border-2 px-3 py-2 text-left text-sm font-bold transition-colors ${
      on ? 'border-emerald-500 bg-emerald-50 text-slate-900 dark:border-teal-500 dark:bg-teal-950/40 dark:text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
    }`;

  // Setting up a set
  if (!run.kind || run.ids.length === 0) {
    return (
      <section className={CARD}>
        <div className="space-y-1">
          <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-teal-300">9701 · {mn ? 'Цагтай дасгал' : 'Timed practice'}</div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">{mn ? 'Paper 1/2 хэв маягийн дасгал' : 'Paper 1/2-style practice'}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {mn
              ? 'Энэ сайтын өөрийн асуултууд, 9701 шалгалтын хэв маяг ба хугацаагаар. Албан ёсны шалгалт биш. Алдсан асуулт тайлбартайгаа алдааны санд орно.'
              : 'This site’s own questions, in the style and timing of the 9701 papers; not an official paper. Each question you miss goes to your mistake notebook with its explanation.'}
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {(['p1', 'p2'] as Kind[]).map(k => {
            const none = (k === 'p1' ? mcqPool : structuredPool).length === 0;
            return (
              <button
                key={k}
                type="button"
                disabled={none}
                onClick={() => {
                  setKindPick(k);
                  setSize(k === 'p1' ? 10 : 3);
                }}
                aria-pressed={kindPick === k}
                className={`${chooser(kindPick === k)} disabled:opacity-50`}
              >
                <span className="block">{t(kindName(k))}</span>
                <span className="block text-xs font-normal text-slate-500 dark:text-slate-400">
                  {none
                    ? mn ? 'A Level-ийн бүтэцтэй асуултууд A Level-ийн хичээлүүдтэй хамт нэмэгдэнэ.' : 'A Level structured questions come with the A Level lessons.'
                    : k === 'p1'
                      ? mn ? `Асуулт тутамд ~1 мин 50 сек · ${mcqPool.length} асуулт` : `About 1 min 50 s a question · ${mcqPool.length} questions`
                      : mn ? `Оноо тутамд ~1 мин 15 сек · ${structuredPool.length} асуулт` : `About 1 min 15 s a mark · ${structuredPool.length} questions`}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{mn ? 'Бүлэг' : 'Chapter'}</span>
            <select
              value={chapterPick}
              onChange={e => setChapterPick(e.target.value)}
              className="max-w-[16rem] rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-950"
            >
              <option value="all">{mn ? 'Бүх бүлэг' : 'All chapters'}</option>
              {chapters
                .filter(c => available.some(x => x.chapterId === c.id))
                .map(c => (
                  <option key={c.id} value={c.id}>
                    {c.number}. {mn ? c.titleMn : c.titleEn}
                  </option>
                ))}
            </select>
          </label>
          <span className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{mn ? 'Асуулт' : 'Questions'}</span>
            {sizes.map(n => (
              <button key={n} type="button" onClick={() => setSize(n)} aria-pressed={size === n} className={`${chooser(size === n)} px-3 py-1`}>
                {n}
              </button>
            ))}
          </span>
        </div>
        <button
          type="button"
          onClick={start}
          disabled={inPick === 0}
          className="min-h-[44px] rounded-xl bg-emerald-600 px-5 py-2 text-sm font-black text-white hover:bg-emerald-500 disabled:opacity-40"
        >
          {mn ? `Эхлэх (${Math.min(size, inPick)} асуулт)` : `Start (${Math.min(size, inPick)} questions)`}
        </button>
      </section>
    );
  }

  const timer = left !== null && !run.submitted && (
    <div className={`flex items-center gap-1.5 text-sm font-black font-mono ${left <= 60 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-100'}`}>
      <Clock className="h-4 w-4" aria-hidden="true" />
      {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
    </div>
  );
  const again = (
    <button type="button" onClick={() => setRun(EMPTY)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">
      {mn ? 'Шинэ дасгал' : 'New set'}
    </button>
  );

  return (
    <section className={CARD}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-teal-300">{t(kindName(run.kind))}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {mn ? `${run.ids.length} асуулт · ${Math.round(totalSeconds / 60)} мин` : `${run.ids.length} questions · ${Math.round(totalSeconds / 60)} min`}
          </div>
        </div>
        {timer}
      </div>

      {/* Paper 1 style: multiple choice, marked at once */}
      {run.kind === 'p1' &&
        mcqs.map((q, i) => {
          const pick = run.picks[q.id];
          return (
            <div key={q.id} className="space-y-2 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {i + 1}. {mn ? q.questionTextMn : q.questionTextEn}
              </div>
              <div className="grid gap-1.5">
                {q.options?.map(o => {
                  const right = run.submitted && o.id === q.correctOption;
                  const wrong = run.submitted && o.id === pick && o.id !== q.correctOption;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      disabled={run.submitted}
                      onClick={() => setRun(r => ({ ...r, picks: { ...r.picks, [q.id]: o.id } }))}
                      aria-pressed={pick === o.id}
                      className={`rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                        right
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : wrong
                            ? 'border-rose-600 bg-rose-600 text-white'
                            : pick === o.id
                              ? 'border-violet-600 bg-violet-600 text-white'
                              : 'border-slate-300 bg-slate-50 text-slate-800 hover:border-violet-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
                      }`}
                    >
                      {o.id}. {mn ? o.textMn : o.textEn}
                    </button>
                  );
                })}
              </div>
              {run.submitted && pick !== q.correctOption && (
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">{mn ? q.misconceptionDiagnosisMn : q.misconceptionDiagnosisEn}</p>
              )}
            </div>
          );
        })}

      {/* Paper 2 style: written answers, then the mark scheme to tick */}
      {run.kind === 'p2' &&
        structured.map((s, i) => (
          <div key={s.id} className="space-y-2 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-start justify-between gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <span>
                {i + 1}. {t(s.prompt)}
              </span>
              <span className="shrink-0 text-xs text-slate-500">[{s.total}]</span>
            </div>
            <textarea
              value={run.texts[s.id] ?? ''}
              disabled={run.submitted}
              onChange={e => setRun(r => ({ ...r, texts: { ...r.texts, [s.id]: e.target.value } }))}
              rows={4}
              placeholder={mn ? 'Хариултаа энд бич…' : 'Write your answer here…'}
              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 disabled:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            {run.submitted && (
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {mn ? 'Mark scheme: авсан оноогоо тэмдэглэ' : 'Mark scheme: tick the points you earned'}
                </div>
                {s.marks.map((m, k) => {
                  const on = (run.ticks[s.id] ?? []).includes(k);
                  return (
                    <label key={k} className="flex items-start gap-2 text-sm text-slate-800 dark:text-slate-100">
                      <input
                        type="checkbox"
                        checked={on}
                        disabled={run.saved}
                        onChange={() =>
                          setRun(r => {
                            const list = r.ticks[s.id] ?? [];
                            return { ...r, ticks: { ...r.ticks, [s.id]: on ? list.filter(x => x !== k) : [...list, k] } };
                          })
                        }
                        className="mt-1 h-4 w-4 shrink-0"
                      />
                      <span>{t(m)}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}

      {/* The foot: submit, then the score and a new set */}
      {!run.submitted ? (
        <button
          type="button"
          onClick={run.kind === 'p1' ? submitP1 : submitP2}
          className="min-h-[44px] rounded-xl bg-violet-600 px-5 py-2 text-sm font-black text-white hover:bg-violet-700"
        >
          {mn ? 'Илгээх' : 'Submit'}
        </button>
      ) : run.kind === 'p1' ? (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-violet-300 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-950/40">
          <span className="text-sm font-black text-slate-900 dark:text-white">
            {mn ? 'Оноо' : 'Score'}: {p1Right} / {mcqs.length} · {p1Percent}% · {cambridgeGrade(p1Percent).num} ({cambridgeGrade(p1Percent).letter})
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-300">
            {mcqs.length - p1Right > 0
              ? mn ? `${mcqs.length - p1Right} алдаа алдааны санд орлоо.` : `${mcqs.length - p1Right} mistake(s) went to your mistake notebook.`
              : mn ? 'Бүгд зөв.' : 'All correct.'}
          </span>
          {again}
        </div>
      ) : !run.saved ? (
        <button type="button" onClick={saveP2} className="min-h-[44px] rounded-xl bg-emerald-600 px-5 py-2 text-sm font-black text-white hover:bg-emerald-500">
          {mn ? `Оноогоо хадгалах (${p2Earned} / ${p2Total})` : `Save my marks (${p2Earned} / ${p2Total})`}
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-violet-300 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-950/40">
          <span className="text-sm font-black text-slate-900 dark:text-white">
            {mn ? 'Оноо' : 'Marks'}: {p2Earned} / {p2Total}
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-300">
            {p2Earned < p2Total
              ? mn ? 'Алдсан оноотой асуултууд алдааны санд орлоо.' : 'The questions with marks lost went to your mistake notebook.'
              : mn ? 'Бүх оноо авсан.' : 'Full marks.'}
          </span>
          {again}
        </div>
      )}
    </section>
  );
};
