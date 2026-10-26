import React, { useState } from 'react';
import { KEY_TERMS } from '../data/alevelKeyTerms';
import { ALEVEL_GLOSSARY } from '../data/alevelGlossary';
import { useApp } from '../context/AppContext';

// The key-term checklist of one 9701 chapter: the terms the coursebook sets in bold, and the count of the glossary the app
// holds for the chapter. The student ticks each term they can explain. The ticks stay in this browser, and the schedule
// (AlevelSchedule) reads them.
export const MASTERY_KEY = 'alevel-keyterm-mastery';
export const MASTERY_EVENT = 'alevel-keyterm-change';

export type Mastery = Record<string, string[]>;

export const readMastery = (): Mastery => {
  try {
    const raw = window.localStorage.getItem(MASTERY_KEY);
    return raw ? (JSON.parse(raw) as Mastery) : {};
  } catch {
    return {};
  }
};

const writeMastery = (m: Mastery) => {
  try {
    window.localStorage.setItem(MASTERY_KEY, JSON.stringify(m));
  } catch {
    // Storage can be blocked; the ticks then last only for this visit
  }
};

export const KeyTermTracker: React.FC<{ chapterId: string; mn: boolean }> = ({ chapterId, mn }) => {
  const terms = KEY_TERMS[chapterId] ?? [];
  const [mastery, setMastery] = useState<Mastery>(readMastery);
  const { setActiveTab } = useApp();
  if (terms.length === 0) return null;

  const done = new Set(mastery[chapterId] ?? []);
  const doneCount = terms.filter(t => done.has(t)).length;
  const pct = Math.round((doneCount / terms.length) * 100);
  const glossaryCount = ALEVEL_GLOSSARY[chapterId]?.length ?? 0;

  const toggle = (term: string) => {
    const next = new Set(done);
    if (next.has(term)) next.delete(term);
    else next.add(term);
    const updated = { ...mastery, [chapterId]: [...next] };
    setMastery(updated);
    writeMastery(updated);
    // The schedule on the page reads the ticks too, so it is told that they changed
    window.dispatchEvent(new Event(MASTERY_EVENT));
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
        {mn ? 'Түлхүүр үгийн явц' : 'Key-term progress'}
      </div>
      <p className="text-[11px] text-slate-600 dark:text-slate-400">
        {mn
          ? `Номын түлхүүр үг: ${terms.length} · Глоссарийн үг: ${glossaryCount}. Тайлбарлаж чадсан үгээ тэмдэглээрэй.`
          : `Key terms in the book: ${terms.length} · Glossary entries: ${glossaryCount}. Tick each term you can explain.`}
      </p>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-bold font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
          {doneCount} / {terms.length} · {pct}%
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {terms.map(t => (
          <label
            key={t}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer ${
              done.has(t)
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <input type="checkbox" checked={done.has(t)} onChange={() => toggle(t)} className="w-3.5 h-3.5 accent-emerald-600 shrink-0" />
            <span>{t}</span>
          </label>
        ))}
      </div>

      {/* Play the chapter's key terms in the Game Arena: the term is shown by its definition, the student picks the word */}
      <button
        onClick={() => {
          try {
            localStorage.setItem('chem_game_focus', chapterId);
          } catch {
            // Storage can be blocked; the Game Arena then opens on all topics
          }
          setActiveTab('games');
        }}
        className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-black"
      >
        {mn ? 'Тоглож цээжлэх →' : 'Play to memorise →'}
      </button>
    </section>
  );
};
