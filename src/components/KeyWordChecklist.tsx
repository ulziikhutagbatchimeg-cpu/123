import React, { useState } from 'react';
import type { VocabularyTerm } from '../types/chemistry';

// The key-word checklist of one IGCSE topic: the student ticks each key word they can explain. The ticks stay in this browser.
const KEY = 'chem_igcse_keyword_ticks';

// Topic id -> the ids of the key words ticked in it
type Ticks = Record<string, string[]>;

const readTicks = (): Ticks => {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Ticks) : {};
  } catch {
    return {};
  }
};

const writeTicks = (ticks: Ticks) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ticks));
  } catch {
    // Storage can be blocked; the ticks then last only for this visit
  }
};

export const KeyWordChecklist: React.FC<{ topicId: string; terms: VocabularyTerm[]; mn: boolean }> = ({ topicId, terms, mn }) => {
  const [ticks, setTicks] = useState<Ticks>(readTicks);
  if (terms.length === 0) return null;

  const done = new Set(ticks[topicId] ?? []);
  const toggle = (id: string) => {
    const next = new Set(done);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    const updated = { ...ticks, [topicId]: [...next] };
    setTicks(updated);
    writeTicks(updated);
  };

  return (
    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2.5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-black text-slate-900 dark:text-white">{mn ? 'Түлхүүр үгийн checklist' : 'Key words checklist'}</div>
        <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
          {done.size} / {terms.length}
        </span>
      </div>
      <p className="text-[11px] text-slate-600 dark:text-slate-400">
        {mn ? 'Тайлбарлаж чадах үгээ тэмдэглээрэй.' : 'Tick each key word you can explain.'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
        {terms.map(t => (
          <label key={t.id} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={done.has(t.id)}
              onChange={() => toggle(t.id)}
              className="w-3.5 h-3.5 accent-emerald-600 shrink-0"
            />
            <span>{mn ? t.termMn : t.termEn}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
