import React from 'react';
import { CheckCircle2, Circle, Lock } from 'lucide-react';
import type { GateItem } from '../lib/lessonGate';
import type { GlossaryTerm } from '../data/statesLessonSupport';

type Bi = { en: string; mn: string };

// Shown in place of the exit ticket until every part of the lesson is done: what is done, what is left, and a button to the
// step of each part still to do.
export const LessonChecklist: React.FC<{ gate: GateItem[]; mn: boolean; onGo: (step: number) => void }> = ({ gate, mn, onGo }) => (
  <div className="space-y-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
    <div className="flex items-center gap-2 text-sm font-black text-amber-900 dark:text-amber-200">
      <Lock className="h-4 w-4" aria-hidden="true" />
      {mn ? 'Гарах билет эдгээрийг хийсний дараа нээгдэнэ' : 'The exit ticket opens once these are done'}
    </div>
    <ul className="space-y-2">
      {gate.map(g => (
        <li key={g.id} className="flex flex-wrap items-center gap-2 text-sm">
          {g.done ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
          ) : (
            <Circle className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          )}
          <span className={g.done ? 'text-slate-500 line-through dark:text-slate-400' : 'font-bold text-slate-900 dark:text-white'}>
            {mn ? g.label.mn : g.label.en}
          </span>
          {!g.done && (
            <button
              type="button"
              onClick={() => onGo(g.step)}
              className="rounded-lg border border-amber-400 bg-white px-2 py-0.5 text-xs font-bold text-amber-900 hover:border-amber-600 dark:bg-slate-900 dark:text-amber-200"
            >
              {mn ? `${g.step + 1}-р алхам руу →` : `Go to step ${g.step + 1} →`}
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);

// What is still left before the lesson is passed, under the step buttons all through the lesson, so the student always sees
// what keeps the next lesson closed: each part not done yet (with a button to its step, once that step is open), how many
// objectives and key words are still to rate on the chapter's last lesson, and the exit ticket with its score so far.
export const LessonTodo: React.FC<{
  gate: GateItem[];
  mn: boolean;
  onGo: (step: number) => void;
  canGo: (step: number) => boolean;
  exitStep: number; // the 0-based step that holds the exit ticket
  score: number | undefined; // the lesson's best exit-ticket score so far
  passAbove: number;
  selfLeft?: { lo: number; kw: number }; // the chapter's objectives and key words still to rate
  onSelfCheck?: () => void; // goes to the chapter's self-check, at the first row still to rate
}> = ({ gate, mn, onGo, canGo, exitStep, score, passAbove, selfLeft, onSelfCheck }) => {
  const left = gate.filter(g => !g.done);
  const goButton = (step: number, label?: string, run?: () => void) =>
    canGo(step) ? (
      <button
        type="button"
        onClick={run ?? (() => onGo(step))}
        className="rounded-lg border border-amber-400 bg-white px-2 py-0.5 text-xs font-bold text-amber-900 hover:border-amber-600 dark:bg-slate-900 dark:text-amber-200"
      >
        {label ?? (mn ? `${step + 1}-р алхам руу →` : `Go to step ${step + 1} →`)}
      </button>
    ) : (
      <span className="text-[11px] text-slate-500 dark:text-slate-400">{mn ? '(эхлээд дээрхийг хийнэ)' : '(do the one above first)'}</span>
    );
  return (
    <div className="space-y-2 rounded-2xl border border-amber-300 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
      <div className="flex flex-wrap items-center gap-2 text-sm font-black text-amber-900 dark:text-amber-200">
        <Lock className="h-4 w-4" aria-hidden="true" />
        {mn ? 'Дараагийн хичээл нээгдэхэд үлдсэн ажил' : 'Left to do before the next lesson opens'}
        <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
          {mn ? `(хийсэн ${gate.length - left.length}/${gate.length + 1})` : `(done ${gate.length - left.length} of ${gate.length + 1})`}
        </span>
      </div>
      <ol className="space-y-1.5">
        {left.map(g => (
          <li key={g.id} className="flex flex-wrap items-center gap-2 text-sm">
            <Circle className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
            <span className="font-bold text-slate-900 dark:text-white">{mn ? g.label.mn : g.label.en}</span>
            {g.id === 'selfcheck' && selfLeft && (
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                {mn
                  ? `— үлдсэн: зорилт ${selfLeft.lo}, түлхүүр үг ${selfLeft.kw}`
                  : `— left: ${selfLeft.lo} objectives, ${selfLeft.kw} key words`}
              </span>
            )}
            {g.id === 'selfcheck' && onSelfCheck
              ? goButton(g.step, mn ? 'Үнэлээгүй мөр рүү →' : 'To the first one left →', onSelfCheck)
              : goButton(g.step)}
          </li>
        ))}
        <li className="flex flex-wrap items-center gap-2 text-sm">
          <Circle className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          <span className="font-bold text-slate-900 dark:text-white">
            {mn ? `Гарах билетээс ${passAbove}%-иас дээш авах` : `Score above ${passAbove}% on the exit ticket`}
          </span>
          {score !== undefined && (
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
              {mn ? `— одоо ${score}%, дахин өгнө үү` : `— ${score}% so far, take it again`}
            </span>
          )}
          {left.length === 0 && goButton(exitStep)}
        </li>
      </ol>
    </div>
  );
};

// One line over a set of questions: which step and slides of the lesson they are about
export const AboutLine: React.FC<{ text: Bi; mn: boolean }> = ({ text, mn }) => (
  <p className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-900 dark:bg-sky-950/40 dark:text-sky-200">
    {mn ? text.mn : text.en}
  </p>
);

// The key words a question is about, under the question
export const TermChips: React.FC<{ terms: GlossaryTerm[]; mn: boolean }> = ({ terms, mn }) =>
  terms.length === 0 ? null : (
    <div className="flex flex-wrap items-center gap-1 text-[10px]">
      <span className="font-bold text-slate-500 dark:text-slate-400">{mn ? 'Холбогдох түлхүүр үг:' : 'Key words:'}</span>
      {terms.map(t => (
        <span
          key={t.term.en}
          title={mn ? t.def.mn : t.def.en}
          className="rounded-md border border-sky-200 bg-sky-50 px-1.5 py-0.5 font-bold text-sky-800 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200"
        >
          {mn ? t.term.mn : t.term.en}
        </span>
      ))}
    </div>
  );
