import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import type { GlossaryTerm } from '../data/statesLessonSupport';

// The order the definitions are shown in: the indices of the terms, shuffled, so a definition is not beside its own term
const shuffled = (n: number): number[] => {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
};

// One matching button: green once matched, red for a moment after a wrong pair, violet while selected
const tile = (done: boolean, selected: boolean, wrong: boolean, bold: boolean) =>
  `w-full flex items-start gap-1.5 text-left p-2.5 rounded-xl border text-[12px] leading-snug transition-colors disabled:cursor-default ${
    bold ? 'font-black' : ''
  } ${
    done
      ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
      : wrong
        ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
        : selected
          ? 'border-violet-600 bg-violet-600 text-white'
          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 hover:border-violet-500'
  }`;

interface StatesGlossaryProps {
  items: GlossaryTerm[];
  mn: boolean;
}

// A lesson's key words, read as a list of terms with their definitions, or as a matching exercise
export const StatesGlossary: React.FC<StatesGlossaryProps> = ({ items, mn }) => {
  const [mode, setMode] = useState<'read' | 'match'>('read');
  const [seed, setSeed] = useState(0);
  const order = useMemo(() => shuffled(items.length), [items.length, seed]);
  const [termPick, setTermPick] = useState<number | null>(null);
  const [defPick, setDefPick] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrong, setWrong] = useState<{ term: number; def: number } | null>(null);

  // A wrong pair shows red for a moment, then both can be picked again
  useEffect(() => {
    if (!wrong) return;
    const timer = window.setTimeout(() => setWrong(null), 900);
    return () => window.clearTimeout(timer);
  }, [wrong]);

  // Picks one term and one definition; a matching pair is kept, a wrong pair is shown red
  const choose = (side: 'term' | 'def', index: number) => {
    if (matched.includes(index)) return;
    const term = side === 'term' ? index : termPick;
    const def = side === 'def' ? index : defPick;
    if (side === 'term') setTermPick(index);
    else setDefPick(index);
    if (term === null || def === null) return;
    if (term === def) setMatched(prev => [...prev, term]);
    else setWrong({ term, def });
    setTermPick(null);
    setDefPick(null);
  };

  const restart = () => {
    setMatched([]);
    setTermPick(null);
    setDefPick(null);
    setWrong(null);
    setSeed(s => s + 1);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex p-0.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-bold">
          {(['read', 'match'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                mode === m
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {m === 'read' ? (mn ? 'Тайлбар' : 'Read') : mn ? 'Харгалзуулах' : 'Match'}
            </button>
          ))}
        </div>
        {mode === 'match' && (
          <button
            onClick={restart}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {mn ? 'Дахин эхлүүлэх' : 'Start again'}
          </button>
        )}
      </div>

      {mode === 'read' ? (
        <dl className="divide-y divide-slate-200 dark:divide-slate-800">
          {items.map((g, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 py-2.5">
              <dt className="text-xs font-black text-violet-800 dark:text-violet-300">{mn ? g.term.mn : g.term.en}</dt>
              <dd className="text-[12px] leading-relaxed text-slate-700 dark:text-slate-300">{mn ? g.def.mn : g.def.en}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
            <span>{mn ? `Харгалзуулсан: ${matched.length} / ${items.length}` : `Matched: ${matched.length} / ${items.length}`}</span>
            <span className="text-slate-500 dark:text-slate-400">
              {mn ? 'Нэр томьёо, дараа нь тохирох тайлбарыг сонгоно уу' : 'Pick a term, then its definition'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              {items.map((g, i) => {
                const done = matched.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => choose('term', i)}
                    disabled={done}
                    className={tile(done, termPick === i, wrong?.term === i, true)}
                  >
                    {done && <CheckCircle2 className="w-3.5 h-3.5 mt-px shrink-0" />}
                    <span>{mn ? g.term.mn : g.term.en}</span>
                  </button>
                );
              })}
            </div>
            <div className="space-y-2">
              {order.map(i => {
                const done = matched.includes(i);
                const g = items[i];
                return (
                  <button
                    key={i}
                    onClick={() => choose('def', i)}
                    disabled={done}
                    className={tile(done, defPick === i, wrong?.def === i, false)}
                  >
                    {done && <CheckCircle2 className="w-3.5 h-3.5 mt-px shrink-0" />}
                    <span>{mn ? g.def.mn : g.def.en}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {matched.length === items.length && items.length > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-200">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {mn ? 'Бүх түлхүүр үгийг зөв харгалзуулсан!' : 'All key words matched correctly!'}
            </div>
          )}
        </>
      )}
    </div>
  );
};
