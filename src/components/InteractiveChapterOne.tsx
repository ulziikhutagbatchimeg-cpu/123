import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useKeptAnswers } from '../lib/keptAnswers';
import { Lock } from 'lucide-react';
import { STATES_LESSONS, type Bi, type LessonStep, type QuizItem, type StatesLesson } from '../data/statesLessons';
import { LESSON_RUBRIC, LEVEL_LABELS_MN } from '../data/lessonRubric';
import { OBJECTIVES_A } from '../data/syllabusObjectivesA';
import { OBJECTIVES_B } from '../data/syllabusObjectivesB';
import { PERIODIC_LINKS, QUICK_CHECKS } from '../data/statesLessonExtras';
import { STATES_GLOSSARY, STATES_PRACTICE, type PracticeItem } from '../data/statesLessonSupport';
import { StatesGlossary } from './StatesGlossary';
import { STATES_INQUIRY, type StructuredItem } from '../data/statesInquiry';
import { StepSticker } from './StepSticker';
import { CardSort, DiffusionSim, GasPressureSim } from './simulators/StatesSims';
import { cambridgeGrade } from '../lib/grade';
import { recordActivity } from '../lib/activity';
import { useStudyTime } from '../lib/studyTime';
import { encourage } from '../lib/encourage';
import { useApp } from '../context/AppContext';
import { lessonSlides, lessonStepParts, partsKey, slideRangeLabel, STATES_STEP_MINUTES, type SlidePart } from '../data/chapterSlides';
import { SlideViewer } from './SlideViewer';
import { coversKeyWord } from '../lib/topicQuestions';

// IGCSE 0620 chapter 1, taught as four 40-minute lessons built on scientific inquiry. Five steps per lesson, and only the
// step that is open is shown. The exit ticket is submitted for a grade; above the unlock mark the next lesson opens.

const LEVEL_LABELS_EN = ['Not attempted', 'Poor', 'Adequate', 'Very good'] as const;
const CARD = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4';
const HEADING = 'text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono';

// Exit-ticket scores are kept on this browser. The next lesson opens when the score is above UNLOCK_ABOVE percent.
const PROGRESS_KEY = 'igcse-ch1-exit-scores';
const UNLOCK_ABOVE = 60;


// The five blocks of the lesson, on the minutes of the Excel timeline. steps are the indexes of the Excel steps in the block
// (the lesson's steps array), so each block shows its own steps with their minutes, activities and evidence.
const BLOCKS: Array<{ no: number; from: number; to: number; title: Bi; steps: number[] }> = [
  { no: 1, from: 0, to: 6, title: { mn: 'Асуулт, таамаглал', en: 'Question and prediction' }, steps: [0, 1, 2] },
  { no: 2, from: 6, to: 16, title: { mn: 'Туршилт (симуляци)', en: 'Test (simulation)' }, steps: [3] },
  { no: 3, from: 16, to: 26, title: { mn: 'Тайлбар', en: 'Explain' }, steps: [4] },
  { no: 4, from: 26, to: 34, title: { mn: 'Хэрэглэх, шалгах', en: 'Apply and check' }, steps: [5, 6] },
  { no: 5, from: 34, to: 40, title: { mn: 'Дүгнэлт ба өөрийн үнэлгээ', en: 'Conclude and self-assess' }, steps: [7, 8, 9] }
];

export const readScores = (): Record<string, number> => {
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
};

const writeScores = (scores: Record<string, number>) => {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(scores));
  } catch {
    // Storage can be blocked; the score then lasts only for this visit
  }
};

// The official statement text for a code such as '1.1.3'
const loText = (code: string, mn: boolean): string => {
  const ref = code.slice(0, code.lastIndexOf('.'));
  const n = Number(code.slice(code.lastIndexOf('.') + 1));
  const source = ref.startsWith('8.') ? OBJECTIVES_B : OBJECTIVES_A;
  const row = (source[ref] ?? []).find(r => r[0] === n);
  return row ? (mn ? row[2] : row[1]) : code;
};

const lessonSimulation = (lesson: StatesLesson, mn: boolean) => {
  if (lesson.id === 'states-1') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <div className="space-y-2">
          <div className="text-xs font-black text-slate-700 dark:text-slate-200">{mn ? 'Симуляци: бөөмсийн загвар' : 'Simulation: the particle model'}</div>
          {/* The particle picture here is replaced by the Virtual lab, where the simulation is kept */}
          <a
            href="#labs"
            className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-violet-300 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 hover:border-violet-500"
          >
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {mn ? 'Виртуал лабороторид очиж симуляцийг туршина' : 'Open the Virtual lab to try the simulation'}
            </span>
            <span className="text-xs font-black text-violet-700 dark:text-violet-300">{mn ? 'Очих →' : 'Open →'}</span>
          </a>
        </div>
        <div className="space-y-2">
          <div className="text-xs font-black text-slate-700 dark:text-slate-200">{mn ? 'Карт эрэмбэлэлт' : 'Card sort'}</div>
          <CardSort mn={mn} />
        </div>
      </div>
    );
  }
  if (lesson.id === 'states-2') {
    return null;
  }
  if (lesson.id === 'states-3') {
    return <GasPressureSim mn={mn} />;
  }
  return <DiffusionSim mn={mn} />;
};

// Step 1: the student writes a prediction with a reason before testing
export const PredictionBox: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [text, setText] = useState('');
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-700 dark:text-slate-200">{mn ? 'Таамаглал (шалтгаан хамт бичнэ)' : 'Prediction (write the reason)'}</div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={3}
        placeholder={mn ? 'Би бодож байгаагаар ... учир нь ...' : 'I predict that ... because ...'}
        className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-2.5 text-slate-700 dark:text-slate-200"
      />
    </div>
  );
};

// Step 4: an exam-style structured answer; the mark points are shown only when the student asks for them
export const StructuredQuestion: React.FC<{ item: StructuredItem; mn: boolean }> = ({ item, mn }) => {
  const [answer, setAnswer] = useState('');
  const [shown, setShown] = useState(false);
  return (
    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
      <div className="text-sm font-bold text-slate-900 dark:text-white">
        {mn ? item.prompt.mn : item.prompt.en} <span className="text-slate-500">[{item.total}]</span>
      </div>
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        rows={3}
        placeholder={mn ? 'Өөрийн хариултаа энд бичнэ үү' : 'Write your answer here'}
        className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-2.5 text-slate-700 dark:text-slate-200"
      />
      <button onClick={() => setShown(s => !s)} className="text-xs font-bold text-violet-700 dark:text-violet-300 hover:underline">
        {shown ? (mn ? 'Оноо авах зүйлсийг нуух' : 'Hide the mark points') : mn ? 'Оноо авах зүйлсийг харах' : 'Show the mark points'}
      </button>
      {shown && (
        <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
          {item.marks.map((m, i) => (
            <li key={i}>• {mn ? m.mn : m.en}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Steps 4 and 5: independent practice, graded by difficulty. Easy and medium items check the answer at once; hard items
// ask the student to write an answer first, and then compare it with the model answer.
// label names the lesson the set belongs to, for the result the teacher sees
export const PracticeSet: React.FC<{ items: PracticeItem[]; mn: boolean; label: { en: string; mn: string }; storageKey?: string }> = ({ items, mn, label, storageKey }) => {
  const { courseChoice } = useApp();
  const [level, setLevel] = useState<PracticeItem['level']>('easy');
  const [picked, setPicked] = useState<Record<number, number | undefined>>({});
  const [written, setWritten] = useState<Record<number, string>>({});
  const [shown, setShown] = useState<Record<number, boolean>>({});
  // The answers come back on this page, and on the student's account when signed in
  useKeptAnswers(storageKey ?? `practice_${label.en.replace(/\W+/g, '_')}`, { level, picked, written, shown }, saved => {
    setLevel(saved.level);
    setPicked(saved.picked);
    setWritten(saved.written);
    setShown(saved.shown);
  });
  const LEVELS: PracticeItem['level'][] = ['easy', 'medium', 'hard'];
  const names: Record<PracticeItem['level'], string> = mn
    ? { easy: 'Хөнгөн', medium: 'Дунд', hard: 'Хүнд' }
    : { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

  // A level is saved once, when every multiple-choice item of it is answered. Hard items have a model answer only, so they are not scored.
  const saved = useRef(new Set<PracticeItem['level']>());
  useEffect(() => {
    for (const l of ['easy', 'medium', 'hard'] as const) {
      if (saved.current.has(l)) continue;
      const choices = items.flatMap((item, i) => (item.level === l && item.options ? [{ item, i }] : []));
      if (choices.length === 0 || choices.some(({ i }) => picked[i] === undefined)) continue;
      const right = choices.filter(({ item, i }) => picked[i] === item.answer).length;
      saved.current.add(l);
      recordActivity({
        kind: 'practice',
        course: courseChoice,
        percent: Math.round((right / choices.length) * 100),
        label: { en: `${label.en} · ${names[l]} practice`, mn: `${label.mn} · ${names[l]} дасгал` }
      });
    }
  }, [picked, items, courseChoice, label, names]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {LEVELS.map(l => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            aria-pressed={level === l}
            className={`px-3 py-1.5 rounded-xl border text-xs font-black ${
              level === l
                ? 'bg-violet-600 text-white border-violet-600'
                : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            {names[l]}
          </button>
        ))}
      </div>
      {items.map((item, i) => {
        if (item.level !== level) return null;
        const choice = picked[i];
        const answered = choice !== undefined;
        return (
          <div key={i} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
            <div className="text-sm font-bold text-slate-900 dark:text-white">{mn ? item.prompt.mn : item.prompt.en}</div>
            {item.options && (
              <div className="grid grid-cols-1 gap-1.5">
                {item.options.map((opt, j) => {
                  const isRight = answered && j === item.answer;
                  const isWrong = answered && j === choice && j !== item.answer;
                  return (
                    <button
                      key={j}
                      disabled={answered}
                      onClick={() => setPicked(prev => ({ ...prev, [i]: j }))}
                      className={`text-left px-3 py-2 rounded-xl border text-xs transition-colors ${
                        isRight
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : isWrong
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
                      }`}
                    >
                      {mn ? opt.mn : opt.en}
                    </button>
                  );
                })}
              </div>
            )}
            {item.model && (
              <div className="space-y-2">
                <textarea
                  value={written[i] ?? ''}
                  onChange={e => setWritten(prev => ({ ...prev, [i]: e.target.value }))}
                  rows={3}
                  placeholder={mn ? 'Өөрийн хариултаа энд бичнэ үү' : 'Write your answer here'}
                  className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-2.5 text-slate-700 dark:text-slate-200"
                />
                <button
                  onClick={() => setShown(prev => ({ ...prev, [i]: !prev[i] }))}
                  className="text-xs font-bold text-violet-700 dark:text-violet-300 hover:underline"
                >
                  {shown[i]
                    ? mn
                      ? 'Загвар хариултыг нуух'
                      : 'Hide the model answer'
                    : mn
                      ? 'Загвар хариултыг харах'
                      : 'Show the model answer'}
                </button>
                {shown[i] && <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? item.model.mn : item.model.en}</p>}
              </div>
            )}
            {(answered || (item.model && shown[i])) && (
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{mn ? item.explanation.mn : item.explanation.en}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

// The quick check in step 4: one question at a time, the explanation shows at once. It is practice, not graded.
export const QuickCheck: React.FC<{ items: QuizItem[]; mn: boolean; storageKey?: string; resultLabel?: { en: string; mn: string }; wide?: boolean }> = ({ items, mn, storageKey, resultLabel, wide }) => {
  const { courseChoice } = useApp();
  // The answers are kept under the storage key, so the quick check shows the same answers wherever it is opened
  const [picked, setPicked] = useState<Record<number, number | undefined>>(() => {
    if (!storageKey) return {};
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as Record<number, number | undefined>) : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    if (!storageKey) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(picked));
    } catch {
      // Storage is blocked: the answers last only for this visit
    }
  }, [picked, storageKey]);
  const score = items.filter((q, i) => picked[i] === q.answer).length;
  // The questions open one step at a time: the next opens once the one on show is answered
  const firstOpen = items.findIndex((_, i) => picked[i] === undefined);
  const lastOpen = firstOpen === -1 ? items.length - 1 : firstOpen;
  // An answer is kept once, the first time it is given, as a practice result: the teacher sees it when the student's results sync
  const choose = (i: number, j: number) => {
    if (picked[i] !== undefined) return;
    setPicked(prev => ({ ...prev, [i]: j }));
    const right = j === items[i].answer;
    encourage(right ? 'correct' : 'wrong');
    if (!resultLabel) return;
    const q = items[i];
    recordActivity({
      kind: 'practice',
      course: courseChoice,
      percent: right ? 100 : 0,
      label: {
        en: `${resultLabel.en} · Quick check ${i + 1}: ${q.question.en} → ${q.options[j].en} (${right ? 'correct' : 'wrong'})`,
        mn: `${resultLabel.mn} · Түргэн шалгалт ${i + 1}: ${q.question.mn} → ${q.options[j].mn} (${right ? 'зөв' : 'буруу'})`
      }
    });
  };
  return (
    <div className="space-y-4">
      {/* On a wide page the questions sit in two columns, so the quick check fills the width beside the lesson */}
      <div className={wide ? 'grid grid-cols-1 xl:grid-cols-2 gap-4 items-start' : 'space-y-4'}>
      {items.slice(0, lastOpen + 1).map((q, i) => {
        const choice = picked[i];
        const answered = choice !== undefined;
        return (
          <div key={i} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {i + 1}. {mn ? q.question.mn : q.question.en}
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {q.options.map((opt, j) => {
                const isRight = answered && j === q.answer;
                const isWrong = answered && j === choice && j !== q.answer;
                return (
                  <button
                    key={j}
                    onClick={() => choose(i, j)}
                    disabled={answered}
                    className={`text-left px-3 py-2 rounded-xl border text-xs transition-colors ${
                      isRight
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isWrong
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
                    }`}
                  >
                    {mn ? opt.mn : opt.en}
                  </button>
                );
              })}
            </div>
            {answered && <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? q.explanation.mn : q.explanation.en}</p>}
          </div>
        );
      })}
      </div>
      {lastOpen < items.length - 1 && (
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {mn ? 'Дараагийн асуулт энэ асуултыг хариулсны дараа нээгдэнэ.' : 'The next question opens once this one is answered.'}
        </p>
      )}
      <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
        {mn ? `Оноо: ${score} / ${items.length}` : `Score: ${score} / ${items.length}`}
      </div>
    </div>
  );
};

// The exit ticket names every key word of its lesson: a question is added for each glossary word the quiz does not name. The
// right answer is the word's definition; the three wrong answers are the definitions of other words in the same lesson.
const examItems = (lesson: StatesLesson): QuizItem[] => {
  const glossary = STATES_GLOSSARY[lesson.id] ?? [];
  const quizText = JSON.stringify(lesson.quiz).toLowerCase();
  const added = glossary
    .filter(g => !coversKeyWord(quizText, g.term.en))
    .map((g, i): QuizItem => {
      const wrong = glossary.filter(o => o.term.en !== g.term.en).map(o => o.def).slice(0, 3);
      const answer = i % 4;
      const options = [...wrong];
      options.splice(answer, 0, g.def);
      return {
        question: { en: `Which statement describes "${g.term.en}"?`, mn: `"${g.term.mn}" гэж аль нь зөв тодорхойлох вэ?` },
        options,
        answer,
        explanation: g.def,
      };
    });
  return [...lesson.quiz, ...added];
};

// The exit ticket in step 5. The student answers every question and presses Submit. The score is shown as a percentage
// and as a Cambridge grade. Above UNLOCK_ABOVE the parent opens the next lesson; otherwise the student can try again.
export const ExitTest: React.FC<{ items: QuizItem[]; mn: boolean; onSubmit: (percent: number) => void; storageKey?: string }> = ({ items, mn, onSubmit, storageKey }) => {
  const [picked, setPicked] = useState<Record<number, number | undefined>>({});
  const [result, setResult] = useState<number | null>(null);
  // The answers come back on this page, and on the student's account when signed in
  useKeptAnswers(storageKey ?? 'exit_unsaved', { picked, result }, saved => {
    setPicked(saved.picked);
    setResult(saved.result);
  });
  const score = items.filter((q, i) => picked[i] === q.answer).length;
  const answered = items.filter((_, i) => picked[i] !== undefined).length;
  const complete = items.length > 0 && answered === items.length;
  const percent = items.length > 0 ? Math.round((score / items.length) * 100) : 0;
  const grade = cambridgeGrade(percent);
  const locked = result !== null;

  const submit = () => {
    setResult(percent);
    onSubmit(percent);
  };

  const retry = () => {
    setPicked({});
    setResult(null);
  };

  return (
    <div className="space-y-4">
      {items.map((q, i) => {
        const choice = picked[i];
        return (
          <div key={i} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {i + 1}. {mn ? q.question.mn : q.question.en}
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {q.options.map((opt, j) => {
                const isRight = locked && j === q.answer;
                const isWrong = locked && j === choice && j !== q.answer;
                const isChosen = !locked && j === choice;
                return (
                  <button
                    key={j}
                    disabled={locked}
                    onClick={() => setPicked(prev => ({ ...prev, [i]: j }))}
                    aria-pressed={isChosen}
                    className={`text-left px-3 py-2 rounded-xl border text-xs transition-colors ${
                      isRight
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isWrong
                          ? 'bg-rose-600 text-white border-rose-600'
                          : isChosen
                            ? 'bg-violet-600 text-white border-violet-600'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
                    }`}
                  >
                    {mn ? opt.mn : opt.en}
                  </button>
                );
              })}
            </div>
            {locked && <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? q.explanation.mn : q.explanation.en}</p>}
          </div>
        );
      })}

      {!locked ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {mn ? `Хариулсан: ${answered} / ${items.length}` : `Answered: ${answered} / ${items.length}`}
          </span>
          <button
            onClick={submit}
            disabled={!complete}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-xs font-black"
          >
            {mn ? 'Илгээх (Submit)' : 'Submit'}
          </button>
        </div>
      ) : (
        <div
          className={`p-4 rounded-2xl border space-y-2 ${
            percent > UNLOCK_ABOVE
              ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
              : 'border-rose-400 bg-rose-50 dark:bg-rose-950/40'
          }`}
        >
          <div className="text-sm font-black text-slate-900 dark:text-white">
            {mn ? 'Үнэлгээ' : 'Grade'}: {grade.num} ({grade.letter}) · {percent}% · {score} / {items.length}
          </div>
          {percent > UNLOCK_ABOVE ? (
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200">{mn ? 'Дараагийн хичээл рүү шилжиж байна…' : 'Moving to the next lesson…'}</p>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-rose-800 dark:text-rose-200">
                {mn
                  ? `${UNLOCK_ABOVE}%-иас дээш оноо авбал дараагийн хичээл нээгдэнэ.`
                  : `Score above ${UNLOCK_ABOVE}% to open the next lesson.`}
              </p>
              <button onClick={retry} className="px-3 py-1.5 rounded-xl border border-rose-400 text-xs font-black text-rose-800 dark:text-rose-200">
                {mn ? 'Дахин оролдох' : 'Try again'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// The self-assessment rubric from the assessment workbook. Each sub-criterion takes one of four levels.
const RubricPanel: React.FC<{ mn: boolean; choices: Record<string, number>; onChoose: (key: string, level: number) => void }> = ({ mn, choices, onChoose }) => {
  const total = useMemo(() => {
    let sum = 0;
    for (const phase of LESSON_RUBRIC) {
      for (const crit of phase.criteria) {
        crit.subs.forEach((sub, j) => {
          const level = choices[`${crit.no}.${j}`];
          if (level !== undefined) sum += sub.levels[level];
        });
      }
    }
    return sum;
  }, [choices]);
  const max = LESSON_RUBRIC.reduce((acc, p) => acc + p.max, 0);

  return (
    <div className="space-y-4">
      {LESSON_RUBRIC.map(phase => (
        <div key={phase.title} className="space-y-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {phase.title} · {phase.max}
          </div>
          {phase.criteria.map(crit => (
            <div key={crit.no} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {crit.no}. {crit.name} <span className="text-slate-500">({crit.max})</span>
              </div>
              {crit.subs.map((sub, j) => {
                const key = `${crit.no}.${j}`;
                return (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                    <div className="flex-1 text-[11px] text-slate-600 dark:text-slate-300">{sub.text}</div>
                    <select
                      value={choices[key] ?? -1}
                      onChange={e => onChoose(key, Number(e.target.value))}
                      className="text-[11px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-2 py-1 text-slate-700 dark:text-slate-200"
                      aria-label={sub.text}
                    >
                      <option value={-1}>{mn ? 'Сонгох' : 'Choose'}</option>
                      {sub.levels.map((pts, level) => (
                        <option key={level} value={level}>
                          {mn ? LEVEL_LABELS_MN[level] : LEVEL_LABELS_EN[level]} ({pts})
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
      <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-xs font-bold text-violet-900 dark:text-violet-200">
        {mn ? `Нийт оноо: ${total.toFixed(1)} / ${max}` : `Total: ${total.toFixed(1)} / ${max}`}
      </div>
    </div>
  );
};

// One of the five steps. It stays mounted when it is hidden, so what the student typed is kept when they move on.
export const Block: React.FC<{
  show: boolean;
  no: number;
  from: number;
  to: number;
  title: Bi;
  steps: LessonStep[];
  mn: boolean;
  slides: SlidePart[];
  children: React.ReactNode;
}> = ({ show, no, from, to, title, steps, mn, slides, children }) => (
  <section className={show ? CARD : 'hidden'}>
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <StepSticker step={no} />
        <div className={HEADING}>
          {no} · {mn ? title.mn : title.en} · {from}–{to} {mn ? 'мин' : 'min'}
        </div>
      </div>
      {/* The Excel steps of this block, each with its minutes, the teacher's and the student's activity, and the evidence */}
      <ol className="space-y-2">
        {steps.map(s => (
          <li key={s.from} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-mono font-bold text-violet-700 dark:text-violet-300">
              {s.from}–{s.to} {mn ? 'мин' : 'min'}
            </span>{' '}
            <span className="font-bold text-slate-900 dark:text-white">{mn ? s.title.mn : s.title.en}</span>
            <div>
              {mn ? 'Багш: ' : 'Teacher: '}
              {mn ? s.teacher.mn : s.teacher.en}
            </div>
            <div>
              {mn ? 'Сурагч: ' : 'Student: '}
              {mn ? s.student.mn : s.student.en}
            </div>
            <div className="italic">
              {mn ? 'Нотолгоо: ' : 'Evidence: '}
              {mn ? s.evidence.mn : s.evidence.en}
            </div>
          </li>
        ))}
      </ol>
    </div>
    {/* The slides of this step sit in front of its content, so the student watches them while they work */}
    {slides.length > 0 && <SlideViewer key={partsKey(slides)} parts={slides} mn={mn} />}
    {children}
  </section>
);

// isOpen and onNext come from the curriculum, which knows the order of every lesson in the course
export const InteractiveChapterOne: React.FC<{
  mn: boolean;
  onOpenTopic?: (id: string) => void;
  isOpen?: (lessonId: string) => boolean;
  onNext?: () => void;
}> = ({ mn, onOpenTopic, isOpen, onNext }) => {
  const [active, setActive] = useState(0);
  const [block, setBlock] = useState(0);
  // The details of the step on show: they fold away, the step tiles stay
  const [stepOpen, setStepOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>(readScores);
  const [rubrics, setRubrics] = useState<Record<string, Record<string, number>>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const { courseChoice } = useApp();

  const recordScore = (id: string, percent: number) =>
    setScores(prev => {
      if (prev[id] === percent) return prev;
      const next = { ...prev, [id]: percent };
      writeScores(next);
      return next;
    });
  const unlocked = (index: number) => {
    if (isOpen) return isOpen(STATES_LESSONS[index].id);
    return index === 0 || (scores[STATES_LESSONS[index - 1].id] ?? -1) > UNLOCK_ABOVE;
  };

  const lesson = STATES_LESSONS[active];
  const plan = STATES_INQUIRY[lesson.id];
  // The lesson's slides, shared out over its five steps by minutes
  const stepParts = lessonStepParts(lessonSlides('ch-states-of-matter', lesson.number), STATES_STEP_MINUTES);
  const stepTopRef = useRef<HTMLDivElement>(null);
  // The time with this lesson on show is counted for the teacher
  useStudyTime({ course: courseChoice, chapterId: 'ch-states-of-matter', lessonId: lesson.id, lessonTitle: lesson.title });

  // Moves to the next or previous step and brings the step list into view, so the new step's slides show from the top
  const goBlock = (b: number) => {
    setBlock(b);
    // Choosing a step opens its details, so the student sees what to do
    setStepOpen(true);
    stepTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const choices = rubrics[lesson.id] ?? {};
  const chooseLevel = (key: string, level: number) =>
    setRubrics(prev => ({ ...prev, [lesson.id]: { ...(prev[lesson.id] ?? {}), [key]: level } }));

  const chooseLesson = (index: number) => {
    setActive(index);
    setBlock(0);
    setNotice(null);
  };

  // Records the exit-ticket score. Above the unlock mark the next lesson opens at once, from its first step.
  const submitExit = (percent: number) => {
    recordScore(lesson.id, percent);
    recordActivity({
      kind: 'exit',
      course: courseChoice,
      percent,
      label: { en: `Ch1 / L${lesson.number}`, mn: `Ch1 / L${lesson.number}` }
    });
    if (percent <= UNLOCK_ABOVE) return;
    const grade = cambridgeGrade(percent);
    const next = active + 1;
    if (next < STATES_LESSONS.length) {
      setNotice(
        mn
          ? `Хичээл ${lesson.number}: ${grade.num} (${grade.letter}), ${percent}%. Хичээл ${next + 1} нээгдлээ.`
          : `Lesson ${lesson.number}: ${grade.num} (${grade.letter}), ${percent}%. Lesson ${next + 1} is open.`
      );
      setActive(next);
      setBlock(0);
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // The last lesson of this chapter: the first lesson of the next chapter is open now
      onNext?.();
      setNotice(
        mn
          ? `Бүх хичээлийг дуусгалаа. Сүүлийн үнэлгээ: ${grade.num} (${grade.letter}), ${percent}%.`
          : `All four lessons are done. Last grade: ${grade.num} (${grade.letter}), ${percent}%.`
      );
    }
  };

  return (
    <div ref={containerRef} className="relative space-y-5">

      <div className={CARD}>
        <div className="space-y-1">
          <div className={HEADING}>IGCSE 0620 · {mn ? 'Бүлэг 1' : 'Chapter 1'}</div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            {mn ? 'Бодисын төлөв: 4 хичээл, 40 минут' : 'States of matter: four 40-minute lessons'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STATES_LESSONS.map((l, i) => {
            const open = unlocked(i);
            const s = scores[l.id];
            const g = s === undefined ? null : cambridgeGrade(s);
            const scoreText = g ? `${s}% · ${g.num} (${g.letter})` : mn ? 'Өгөөгүй' : 'Not yet';
            return (
              <button
                key={l.id}
                onClick={() => {
                  if (open) chooseLesson(i);
                }}
                disabled={!open}
                aria-pressed={active === i}
                className={`flex min-w-0 flex-wrap items-start justify-between gap-x-3 gap-y-1 p-3 rounded-xl border text-left transition-colors ${
                  active === i
                    ? 'bg-violet-600 text-white border-violet-600'
                    : open
                      ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-violet-500'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span className="flex min-w-0 flex-1 basis-40 items-start gap-2">
                  {!open && <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden />}
                  <span className="min-w-0 space-y-0.5">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">
                      {mn ? `Хичээл ${l.number}` : `Lesson ${l.number}`}
                    </span>
                    <span className="block text-xs font-black leading-snug">{mn ? l.title.mn : l.title.en}</span>
                  </span>
                </span>
                <span className="text-right text-[11px] font-bold leading-snug">{scoreText}</span>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
          {mn
            ? `Гарах билетийн оноо ${UNLOCK_ABOVE}%-иас дээш бол дараагийн хичээл нээгдэнэ.`
            : `An exit-ticket score above ${UNLOCK_ABOVE}% opens the next lesson.`}
        </p>
      </div>

      {notice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-200">
          {notice}
        </div>
      )}

      {/* The key words of this lesson, before its steps */}
      <details className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <summary className="cursor-pointer px-5 py-4 text-sm font-black text-slate-900 dark:text-white">
          {mn ? 'Түлхүүр үгийн сан (glossary)' : 'Key words glossary'}
        </summary>
        <div className="px-3 pb-4">
          <StatesGlossary key={lesson.id} items={STATES_GLOSSARY[lesson.id] ?? []} mn={mn} />
        </div>
      </details>

      <div ref={stepTopRef} className={CARD}>
        <div className="flex items-center justify-between gap-3">
          <div className={HEADING}>{mn ? 'Алхам' : 'Step'}</div>
          <button
            type="button"
            onClick={() => setStepOpen(open => !open)}
            aria-expanded={stepOpen}
            className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {stepOpen ? (mn ? 'Дэлгэрэнгүйг хаах' : 'Hide details') : mn ? 'Дэлгэрэнгүйг харах' : 'Show details'}
          </button>
        </div>
        {/* The step on show is large; the others are small tiles */}
        <div className="flex flex-wrap items-stretch gap-2">
          {BLOCKS.map((b, i) => {
            const selected = block === i;
            return (
              <button
                key={b.no}
                onClick={() => setBlock(i)}
                aria-pressed={selected}
                className={`text-left rounded-xl border transition-colors ${
                  selected
                    ? 'flex-[3_1_14rem] p-4 bg-violet-600 text-white border-violet-600'
                    : 'flex-[1_1_7rem] p-2 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
                }`}
              >
                <span className="flex items-start gap-2">
                  <StepSticker step={b.no} />
                  <span className="min-w-0">
                    <span className={`block font-black ${selected ? 'text-sm' : 'text-[10px]'}`}>
                      {b.no} · {b.from}–{b.to} {mn ? 'мин' : 'min'}
                    </span>
                    <span className={`block font-bold leading-snug ${selected ? 'text-base' : 'text-[11px]'}`}>
                      {mn ? b.title.mn : b.title.en}
                    </span>
                    <span className={`block font-mono opacity-80 ${selected ? 'text-xs' : 'text-[10px]'}`}>
                      {slideRangeLabel(stepParts[i], mn)}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={stepOpen ? 'space-y-5' : 'hidden'}>
      <Block show={block === 0} no={1} from={BLOCKS[0].from} to={BLOCKS[0].to} title={BLOCKS[0].title} steps={BLOCKS[0].steps.map(i => lesson.steps[i])} mn={mn} slides={stepParts[0]}>
        <div className="p-3.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-sm font-bold text-violet-900 dark:text-violet-200">
          {mn ? plan.question.mn : plan.question.en}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {lesson.los.map(lo => (
            <span
              key={lo.code}
              className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${
                lo.core
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
              }`}
            >
              {lo.code} · {lo.core ? (mn ? 'Үндсэн (Core)' : 'Core') : mn ? 'Нэмэлт (Supplement)' : 'Supplement'}
            </span>
          ))}
        </div>
        <div className="space-y-1.5">
          {lesson.los.map(lo => (
            <p key={lo.code} className="text-xs text-slate-700 dark:text-slate-300">
              <span className="font-mono font-bold">{lo.code}</span> {loText(lo.code, mn)}
            </p>
          ))}
        </div>
        <PredictionBox key={lesson.id} mn={mn} />
      </Block>

      <Block show={block === 1} no={2} from={BLOCKS[1].from} to={BLOCKS[1].to} title={BLOCKS[1].title} steps={BLOCKS[1].steps.map(i => lesson.steps[i])} mn={mn} slides={stepParts[1]}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { label: mn ? 'Өөрчлөх хувьсагч' : 'Change (independent)', value: plan.independent },
            { label: mn ? 'Ажиглах хувьсагч' : 'Measure (dependent)', value: plan.dependent },
            { label: mn ? 'Тогтмол байлгах' : 'Keep the same (controlled)', value: plan.controlled }
          ].map(v => (
            <div key={v.label} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <div className="text-[10px] font-black uppercase tracking-wider text-violet-700 dark:text-violet-300">{v.label}</div>
              <div className="mt-1 text-xs text-slate-700 dark:text-slate-300">{mn ? v.value.mn : v.value.en}</div>
            </div>
          ))}
        </div>
        {lessonSimulation(lesson, mn)}
      </Block>

      <Block show={block === 2} no={3} from={BLOCKS[2].from} to={BLOCKS[2].to} title={BLOCKS[2].title} steps={BLOCKS[2].steps.map(i => lesson.steps[i])} mn={mn} slides={stepParts[2]}>
        <ul className="space-y-1.5">
          {lesson.keyPoints.map((kp, i) => (
            <li key={i} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              • {mn ? kp.mn : kp.en}
            </li>
          ))}
        </ul>
        {/* A small quick check straight after the theory, so the student checks the idea before moving on */}
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Түргэн шалгалт (quick check)' : 'Quick check'}</div>
          <QuickCheck key={`${lesson.id}-qc`} items={QUICK_CHECKS[lesson.id] ?? []} mn={mn} storageKey={`chem_quick_${lesson.id}`} resultLabel={lesson.title} />
        </div>
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Үелэх системийн холбоотой хэсэг (бүлэг 8)' : 'Linked Periodic Table section (8)'}</div>
          {(PERIODIC_LINKS[lesson.id] ?? []).map(link => (
            <div key={link.code} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-violet-700 dark:text-violet-300">{link.code}</span>
                <span className="text-[11px] text-slate-700 dark:text-slate-300">{loText(link.code, mn)}</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">{mn ? link.reason.mn : link.reason.en}</p>
              {onOpenTopic && (
                <button onClick={() => onOpenTopic(`s-8-${link.ref.split('.')[1]}`)} className="text-[11px] font-bold text-violet-700 dark:text-violet-300 hover:underline">
                  {mn ? 'Үелэх системийн хэсэг рүү очих →' : 'Go to this Periodic Table topic →'}
                </button>
              )}
            </div>
          ))}
        </div>
      </Block>

      <Block show={block === 3} no={4} from={BLOCKS[3].from} to={BLOCKS[3].to} title={BLOCKS[3].title} steps={BLOCKS[3].steps.map(i => lesson.steps[i])} mn={mn} slides={stepParts[3]}>
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Шалгалтын хэв маягийн асуулт' : 'Exam-style question'}</div>
          <StructuredQuestion key={lesson.id} item={plan.structured} mn={mn} />
        </div>
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Бие даан ажиллах дасгал (хүндрэлийн түвшингээр)' : 'Independent practice (by difficulty)'}</div>
          <PracticeSet
            key={lesson.id}
            items={STATES_PRACTICE[lesson.id] ?? []} storageKey={`chem_practice_${lesson.id}`}
            mn={mn}
            label={{ en: `Lesson ${lesson.number} · ${lesson.title.en}`, mn: `${lesson.number}-р хичээл · ${lesson.title.mn}` }}
          />
        </div>
      </Block>

      <Block show={block === 4} no={5} from={BLOCKS[4].from} to={BLOCKS[4].to} title={BLOCKS[4].title} steps={BLOCKS[4].steps.map(i => lesson.steps[i])} mn={mn} slides={stepParts[4]}>
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <span className="font-black">{mn ? 'Загварын хязгаар: ' : 'Limit of the model: '}</span>
          {mn ? plan.limitation.mn : plan.limitation.en}
        </div>
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Гарах билет (үнэлгээ)' : 'Exit ticket (assessment)'}</div>
          <ExitTest key={lesson.id} items={examItems(lesson)} mn={mn} onSubmit={submitExit} storageKey={`chem_exit_${lesson.id}`} />
        </div>
        <details className="space-y-3">
          <summary className="cursor-pointer text-xs font-black text-slate-900 dark:text-white">
            {mn ? 'Өөрийн үнэлгээний хуудас (33 оноо)' : 'Self-assessment sheet (33 points)'}
          </summary>
          <div className="pt-3">
            <RubricPanel mn={mn} choices={choices} onChoose={chooseLevel} />
          </div>
        </details>
      </Block>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => goBlock(Math.max(0, block - 1))}
          disabled={block === 0}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-40"
        >
          ← {mn ? 'Өмнөх алхам' : 'Previous step'}
        </button>
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
          {block + 1} / {BLOCKS.length}
        </span>
        <button
          onClick={() => goBlock(Math.min(BLOCKS.length - 1, block + 1))}
          disabled={block === BLOCKS.length - 1}
          className="px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-xs font-black"
        >
          {mn ? 'Дараагийн алхам' : 'Next step'} →
        </button>
      </div>

    </div>
  );
};
