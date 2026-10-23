import React, { useEffect, useMemo, useState } from 'react';
import { Lock } from 'lucide-react';
import { STATES_LESSONS, type Bi, type QuizItem, type StatesLesson } from '../data/statesLessons';
import { LESSON_RUBRIC, LEVEL_LABELS_MN } from '../data/lessonRubric';
import { OBJECTIVES_A } from '../data/syllabusObjectivesA';
import { OBJECTIVES_B } from '../data/syllabusObjectivesB';
import { PERIODIC_LINKS, QUICK_CHECKS } from '../data/statesLessonExtras';
import { STATES_GLOSSARY, STATES_PRACTICE, type PracticeItem } from '../data/statesLessonSupport';
import { STATES_INQUIRY, type StructuredItem } from '../data/statesInquiry';
import { StatesConceptMap } from './StatesConceptMap';
import { CardSort, DiffusionSim, GasPressureSim, HeatingCurveSim, ParticleStateSim } from './simulators/StatesSims';

// IGCSE 0620 chapter 1, taught as four 40-minute lessons built on scientific inquiry. Five blocks per lesson:
// question and prediction, a test with one changed variable, the explanation, applying and checking, and the
// conclusion with the exit ticket. The exit ticket decides whether the next lesson opens.

const LEVEL_LABELS_EN = ['Not attempted', 'Poor', 'Adequate', 'Very good'] as const;
const CARD = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4';
const HEADING = 'text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono';

// Exit-ticket scores are kept on this browser. The next lesson opens when the score is above UNLOCK_ABOVE percent.
const PROGRESS_KEY = 'igcse-ch1-exit-scores';
const UNLOCK_ABOVE = 60;

// The five blocks of the lesson, each on its own minutes. step is the lesson-plan step whose teacher prompt it uses.
const BLOCKS: Array<{ no: number; from: number; to: number; title: Bi; step: number }> = [
  { no: 1, from: 0, to: 5, title: { mn: 'Асуулт, таамаглал', en: 'Question and prediction' }, step: 0 },
  { no: 2, from: 5, to: 15, title: { mn: 'Туршилт (симуляци)', en: 'Test (simulation)' }, step: 3 },
  { no: 3, from: 15, to: 25, title: { mn: 'Тайлбар', en: 'Explain' }, step: 4 },
  { no: 4, from: 25, to: 34, title: { mn: 'Хэрэглэх, шалгах', en: 'Apply and check' }, step: 5 },
  { no: 5, from: 34, to: 40, title: { mn: 'Дүгнэлт, хязгаар', en: 'Conclude and evaluate' }, step: 8 }
];

const readScores = (): Record<string, number> => {
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
          <ParticleStateSim mn={mn} />
        </div>
        <div className="space-y-2">
          <div className="text-xs font-black text-slate-700 dark:text-slate-200">{mn ? 'Карт эрэмбэлэлт' : 'Card sort'}</div>
          <CardSort mn={mn} />
        </div>
      </div>
    );
  }
  if (lesson.id === 'states-2') {
    return <HeatingCurveSim mn={mn} />;
  }
  if (lesson.id === 'states-3') {
    return <GasPressureSim mn={mn} />;
  }
  return <DiffusionSim mn={mn} />;
};

// Block 1: the student writes a prediction with a reason before testing
const PredictionBox: React.FC<{ mn: boolean }> = ({ mn }) => {
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

// Block 4: an exam-style structured answer; the mark points are shown only when the student asks for them
const StructuredQuestion: React.FC<{ item: StructuredItem; mn: boolean }> = ({ item, mn }) => {
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

// Block 4 and 5: independent practice, graded by difficulty. Easy and medium items check the answer at once; hard items
// ask the student to write an answer first, and then compare it with the model answer.
const PracticeSet: React.FC<{ items: PracticeItem[]; mn: boolean }> = ({ items, mn }) => {
  const [level, setLevel] = useState<PracticeItem['level']>('easy');
  const [picked, setPicked] = useState<Record<number, number | undefined>>({});
  const [written, setWritten] = useState<Record<number, string>>({});
  const [shown, setShown] = useState<Record<number, boolean>>({});
  const LEVELS: PracticeItem['level'][] = ['easy', 'medium', 'hard'];
  const names: Record<PracticeItem['level'], string> = mn
    ? { easy: 'Хөнгөн', medium: 'Дунд', hard: 'Хүнд' }
    : { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

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

// A quick check or exit ticket: pick an answer, then read the explanation. onComplete reports the percentage when
// every question is answered (the exit ticket uses it to decide whether the next lesson opens).
const ExitTicket: React.FC<{ items: QuizItem[]; mn: boolean; onComplete?: (percent: number) => void }> = ({ items, mn, onComplete }) => {
  const [picked, setPicked] = useState<Record<number, number | undefined>>({});
  const score = items.filter((q, i) => picked[i] === q.answer).length;
  const answeredCount = Object.values(picked).filter(v => v !== undefined).length;
  useEffect(() => {
    if (onComplete && items.length > 0 && answeredCount === items.length) {
      onComplete(Math.round((score / items.length) * 100));
    }
  }, [answeredCount, score, items.length]);

  return (
    <div className="space-y-4">
      {items.map((q, i) => {
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
                    onClick={() => setPicked(prev => (prev[i] === undefined ? { ...prev, [i]: j } : prev))}
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
            {answered && (
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? q.explanation.mn : q.explanation.en}</p>
            )}
          </div>
        );
      })}
      <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
        {mn ? `Оноо: ${score} / ${items.length}` : `Score: ${score} / ${items.length}`}
      </div>
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

// One of the five blocks: a heading with its minutes, the teacher's prompt, then the content
const Block: React.FC<{ no: number; from: number; to: number; title: Bi; prompt: Bi; mn: boolean; children: React.ReactNode }> = ({
  no,
  from,
  to,
  title,
  prompt,
  mn,
  children
}) => (
  <section className={CARD}>
    <div className="space-y-1">
      <div className={HEADING}>
        {no} · {mn ? title.mn : title.en} · {from}–{to} {mn ? 'мин' : 'min'}
      </div>
      <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
        {mn ? 'Багшийн асуулт: ' : 'Teacher prompt: '}
        {mn ? prompt.mn : prompt.en}
      </p>
    </div>
    {children}
  </section>
);

export const InteractiveChapterOne: React.FC<{ mn: boolean; onOpenTopic?: (id: string) => void }> = ({ mn, onOpenTopic }) => {
  const [active, setActive] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>(readScores);
  const [rubrics, setRubrics] = useState<Record<string, Record<string, number>>>({});

  const recordScore = (id: string, percent: number) =>
    setScores(prev => {
      if (prev[id] === percent) return prev;
      const next = { ...prev, [id]: percent };
      writeScores(next);
      return next;
    });
  const unlocked = (index: number) => index === 0 || (scores[STATES_LESSONS[index - 1].id] ?? -1) > UNLOCK_ABOVE;

  const lesson = STATES_LESSONS[active];
  const plan = STATES_INQUIRY[lesson.id];
  const choices = rubrics[lesson.id] ?? {};
  const chooseLevel = (key: string, level: number) =>
    setRubrics(prev => ({ ...prev, [lesson.id]: { ...(prev[lesson.id] ?? {}), [key]: level } }));

  return (
    <div className="space-y-5">
      <StatesConceptMap mn={mn} onOpenTopic={onOpenTopic} />

      <div className={CARD}>
        <div className="space-y-1">
          <div className={HEADING}>IGCSE 0620 · {mn ? 'Бүлэг 1' : 'Chapter 1'}</div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            {mn ? 'Бодисын төлөв: 4 хичээл, 40 минут' : 'States of matter: four 40-minute lessons'}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {STATES_LESSONS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => {
                if (unlocked(i)) setActive(i);
              }}
              disabled={!unlocked(i)}
              aria-pressed={active === i}
              className={`px-3 py-2 rounded-xl border text-xs font-black text-left transition-colors ${
                active === i
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
              }`}
            >
              {!unlocked(i) && <Lock className="inline w-3 h-3 mr-1" aria-hidden />}
              {mn ? `Хичээл ${l.number}` : `Lesson ${l.number}`}: {mn ? l.title.mn : l.title.en}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
          <span>
            {mn
              ? `Гарах билетийн оноо ${UNLOCK_ABOVE}%-иас дээш бол дараагийн хичээл нээгдэнэ.`
              : `An exit-ticket score above ${UNLOCK_ABOVE}% opens the next lesson.`}
          </span>
          {STATES_LESSONS.map(l => (
            <span
              key={l.id}
              className={`px-2 py-1 rounded-lg border ${
                scores[l.id] === undefined
                  ? 'border-slate-300 text-slate-500'
                  : scores[l.id] > UNLOCK_ABOVE
                    ? 'border-emerald-400 text-emerald-700 dark:text-emerald-300'
                    : 'border-rose-400 text-rose-700 dark:text-rose-300'
              }`}
            >
              {mn ? `Хичээл ${l.number}` : `Lesson ${l.number}`}: {scores[l.id] === undefined ? (mn ? 'өгөөгүй' : 'not yet') : `${scores[l.id]}%`}
            </span>
          ))}
        </div>
      </div>

      <div className={CARD}>
        <div className={HEADING}>{mn ? 'Түлхүүр үгийн сан (glossary)' : 'Key words glossary'}</div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {(STATES_GLOSSARY[lesson.id] ?? []).map((g, i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <dt className="text-xs font-black text-violet-800 dark:text-violet-300">{mn ? g.term.mn : g.term.en}</dt>
              <dd className="mt-1 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? g.def.mn : g.def.en}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={CARD}>
        <div className="flex flex-wrap items-center gap-2">
          {BLOCKS.map(b => (
            <div
              key={b.no}
              title={`${b.from}–${b.to} · ${mn ? b.title.mn : b.title.en}`}
              style={{ width: `${((b.to - b.from) / 40) * 100}%` }}
              className="flex items-center justify-center h-7 rounded-lg bg-violet-600 text-[10px] font-black text-white border-r-2 border-white dark:border-slate-900"
            >
              {b.no}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-300">
          {BLOCKS.map(b => (
            <div key={b.no}>
              {b.from}–{b.to} · {mn ? b.title.mn : b.title.en}
            </div>
          ))}
        </div>
      </div>

      <Block no={1} from={0} to={5} title={BLOCKS[0].title} prompt={lesson.steps[BLOCKS[0].step].teacher} mn={mn}>
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

      <Block no={2} from={5} to={15} title={BLOCKS[1].title} prompt={lesson.steps[BLOCKS[1].step].teacher} mn={mn}>
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

      <Block no={3} from={15} to={25} title={BLOCKS[2].title} prompt={lesson.steps[BLOCKS[2].step].teacher} mn={mn}>
        <ul className="space-y-1.5">
          {lesson.keyPoints.map((kp, i) => (
            <li key={i} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              • {mn ? kp.mn : kp.en}
            </li>
          ))}
        </ul>
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

      <Block no={4} from={25} to={34} title={BLOCKS[3].title} prompt={lesson.steps[BLOCKS[3].step].teacher} mn={mn}>
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Quick check' : 'Quick check'}</div>
          <ExitTicket key={`${lesson.id}-qc`} items={QUICK_CHECKS[lesson.id] ?? []} mn={mn} />
        </div>
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Шалгалтын хэв маягийн асуулт' : 'Exam-style question'}</div>
          <StructuredQuestion key={lesson.id} item={plan.structured} mn={mn} />
        </div>
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Бие даан ажиллах дасгал (хүндрэлийн түвшингээр)' : 'Independent practice (by difficulty)'}</div>
          <PracticeSet key={lesson.id} items={STATES_PRACTICE[lesson.id] ?? []} mn={mn} />
        </div>
      </Block>

      <Block no={5} from={34} to={40} title={BLOCKS[4].title} prompt={lesson.steps[BLOCKS[4].step].teacher} mn={mn}>
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <span className="font-black">{mn ? 'Загварын хязгаар: ' : 'Limit of the model: '}</span>
          {mn ? plan.limitation.mn : plan.limitation.en}
        </div>
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Гарах билет (үнэлгээ)' : 'Exit ticket (assessment)'}</div>
          <ExitTicket key={lesson.id} items={lesson.quiz} mn={mn} onComplete={percent => recordScore(lesson.id, percent)} />
        </div>
        <details className="space-y-3">
          <summary className="cursor-pointer text-xs font-black text-slate-900 dark:text-white">
            {mn ? 'Багшийн үнэлгээ (33 оноо, eelzhit хуудас)' : 'Teacher self-assessment (33 points)'}
          </summary>
          <div className="pt-3">
            <RubricPanel mn={mn} choices={choices} onChoose={chooseLevel} />
          </div>
        </details>
      </Block>
    </div>
  );
};
