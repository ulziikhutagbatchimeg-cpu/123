import React, { useMemo, useState } from 'react';
import { STATES_LESSONS, type QuizItem, type StatesLesson } from '../data/statesLessons';
import { LESSON_RUBRIC, LEVEL_LABELS_MN } from '../data/lessonRubric';
import { OBJECTIVES_A } from '../data/syllabusObjectivesA';
import { OBJECTIVES_B } from '../data/syllabusObjectivesB';
import { PERIODIC_LINKS, QUICK_CHECKS } from '../data/statesLessonExtras';
import { StatesConceptMap } from './StatesConceptMap';
import { CardSort, DiffusionSim, GasPressureSim, HeatingCurveSim, ParticleStateSim } from './simulators/StatesSims';

// IGCSE 0620 chapter 1, taught as four 40-minute lessons. Each lesson has its learning outcomes, the teacher's
// timeline (from the lesson plan), an interactive simulation, an exit ticket and the lesson self-assessment rubric.

const LEVEL_LABELS_EN = ['Not attempted', 'Poor', 'Adequate', 'Very good'] as const;

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

// The exit ticket: pick an answer, then read the explanation
const ExitTicket: React.FC<{ items: QuizItem[]; mn: boolean }> = ({ items, mn }) => {
  const [picked, setPicked] = useState<Record<number, number | undefined>>({});
  const score = items.filter((q, i) => picked[i] === q.answer).length;

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

export const InteractiveChapterOne: React.FC<{ mn: boolean; onOpenTopic?: (id: string) => void }> = ({ mn, onOpenTopic }) => {
  const [active, setActive] = useState(0);
  const [rubrics, setRubrics] = useState<Record<string, Record<string, number>>>({});
  const lesson = STATES_LESSONS[active];
  const choices = rubrics[lesson.id] ?? {};

  const chooseLevel = (key: string, level: number) =>
    setRubrics(prev => ({
      ...prev,
      [lesson.id]: { ...(prev[lesson.id] ?? {}), [key]: level }
    }));

  const card = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4';
  const heading = 'text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono';

  return (
    <div className="space-y-5">
      <StatesConceptMap mn={mn} onOpenTopic={onOpenTopic} />
      <div className={card}>
        <div className="space-y-1">
          <div className={heading}>IGCSE 0620 · {mn ? 'Бүлэг 1' : 'Chapter 1'}</div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            {mn ? 'Бодисын төлөв: интерактив хичээлүүд (4 × 40 мин)' : 'States of matter: interactive lessons (4 × 40 min)'}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {STATES_LESSONS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`px-3 py-2 rounded-xl border text-xs font-black text-left transition-colors ${
                active === i
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
              }`}
            >
              {mn ? `Хичээл ${l.number}` : `Lesson ${l.number}`}: {mn ? l.title.mn : l.title.en}
            </button>
          ))}
        </div>
      </div>

      <div className={card}>
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
        <div className="space-y-2">
          {lesson.los.map(lo => (
            <p key={lo.code} className="text-xs text-slate-700 dark:text-slate-300">
              <span className="font-mono font-bold">{lo.code}</span> {loText(lo.code, mn)}
            </p>
          ))}
        </div>
        <div className="space-y-2">
          <div className={heading}>{mn ? 'Үелэх системийн холбоотой хэсэг (бүлэг 8)' : 'Linked Periodic Table section (8)'}</div>
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
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200">
          <span className="font-black">{mn ? 'Зорилго: ' : 'Objective: '}</span>
          {mn ? lesson.objective.mn : lesson.objective.en}
        </div>
        <div className="space-y-2">
          <div className={heading}>{mn ? 'Самбарын гол санаа' : 'Key ideas for the board'}</div>
          <ul className="space-y-1.5">
            {lesson.keyPoints.map((kp, i) => (
              <li key={i} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                • {mn ? kp.mn : kp.en}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={card}>
        <div className={heading}>{mn ? 'Хичээлийн 40 минутын хуваарь' : 'The 40-minute timeline'}</div>
        <div className="flex w-full h-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
          {lesson.steps.map((s, i) => (
            <div
              key={i}
              title={`${s.from}–${s.to} · ${mn ? s.title.mn : s.title.en}`}
              style={{ width: `${((s.to - s.from) / 40) * 100}%` }}
              className={`flex items-center justify-center text-[9px] font-black text-white border-r border-white/40 ${
                s.phase === 'start' ? 'bg-sky-500' : s.phase === 'core' ? 'bg-violet-600' : 'bg-emerald-600'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-[10px] font-bold text-slate-600 dark:text-slate-300">
          <span>
            <span className="inline-block w-3 h-3 rounded bg-sky-500 align-middle" /> {mn ? 'Эхлэл (0–6 мин)' : 'Start (0–6 min)'}
          </span>
          <span>
            <span className="inline-block w-3 h-3 rounded bg-violet-600 align-middle" /> {mn ? 'Өрнөл (6–31 мин)' : 'Core (6–31 min)'}
          </span>
          <span>
            <span className="inline-block w-3 h-3 rounded bg-emerald-600 align-middle" /> {mn ? 'Төгсгөл (31–40 мин)' : 'End (31–40 min)'}
          </span>
        </div>
        <div className="space-y-2">
          {lesson.steps.map((s, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <div className="md:col-span-3 space-y-0.5">
                <div className="text-[10px] font-mono font-bold text-slate-500">
                  {s.from}–{s.to} {mn ? 'мин' : 'min'} · {i + 1}
                </div>
                <div className="text-xs font-black text-slate-900 dark:text-white">{mn ? s.title.mn : s.title.en}</div>
              </div>
              <div className="md:col-span-3 text-[11px] text-slate-700 dark:text-slate-300">
                <span className="font-bold">{mn ? 'Багш: ' : 'Teacher: '}</span>
                {mn ? s.teacher.mn : s.teacher.en}
              </div>
              <div className="md:col-span-3 text-[11px] text-slate-700 dark:text-slate-300">
                <span className="font-bold">{mn ? 'Сурагч: ' : 'Student: '}</span>
                {mn ? s.student.mn : s.student.en}
              </div>
              <div className="md:col-span-3 text-[11px] text-emerald-800 dark:text-emerald-300">
                <span className="font-bold">{mn ? 'Нотолгоо: ' : 'Evidence: '}</span>
                {mn ? s.evidence.mn : s.evidence.en}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={card}>
        <div className={heading}>{mn ? 'Интерактив симуляци' : 'Interactive simulation'}</div>
        {lessonSimulation(lesson, mn)}
      </div>

      <div className={card}>
        <div className={heading}>{mn ? 'Quick check: хичээлийг шалгах' : 'Quick check'}</div>
        <ExitTicket key={`${lesson.id}-qc`} items={QUICK_CHECKS[lesson.id] ?? []} mn={mn} />
      </div>

      <div className={card}>
        <div className={heading}>{mn ? 'Гарах билет (exit ticket)' : 'Exit ticket'}</div>
        <ExitTicket key={lesson.id} items={lesson.quiz} mn={mn} />
      </div>

      <details className={card}>
        <summary className="cursor-pointer text-sm font-black text-slate-900 dark:text-white">
          {mn ? 'Багшийн үнэлгээ (eelzhit хичээлийн үнэлгээний хуудас, 33 оноо)' : 'Teacher self-assessment (lesson rubric, 33 points)'}
        </summary>
        <div className="pt-4">
          <RubricPanel mn={mn} choices={choices} onChoose={chooseLevel} />
        </div>
      </details>
    </div>
  );
};
