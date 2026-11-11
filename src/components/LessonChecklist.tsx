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
