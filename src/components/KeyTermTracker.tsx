import React from 'react';
import { KEY_TERMS } from '../data/alevelKeyTerms';
import { ALEVEL_GLOSSARY } from '../data/alevelGlossary';
import { useApp } from '../context/AppContext';
import { useSelfCheck, wordRating, type WordItem } from '../lib/selfCheck';
import { WordRows } from './SelfCheckList';

// The key-term checklist of one 9701 chapter: the terms the coursebook sets in bold, and the count of the glossary the app
// holds for the chapter. The student ticks each term they can explain. The ticks stay in this browser, and the 9701 schedule
// in Lessons (lib/alevelSchedule) reads them.
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

// Each term is rated I can or not yet (lib/selfCheck); the "I can" ones are the ticks the schedule reads
export const KeyTermTracker: React.FC<{ chapterId: string; mn: boolean }> = ({ chapterId, mn }) => {
  const terms = KEY_TERMS[chapterId] ?? [];
  const sc = useSelfCheck();
  const { setActiveTab } = useApp();
  if (terms.length === 0) return null;

  const words: WordItem[] = terms.map(t => ({ scope: 'chapter', owner: chapterId, key: t, en: t, mn: t }));
  const ratings = words.map(w => wordRating(sc, w));
  const doneCount = ratings.filter(v => v === true).length;
  const tally = { rated: ratings.filter(v => v !== undefined).length, can: doneCount, total: terms.length };
  const pct = Math.round((doneCount / terms.length) * 100);
  const glossaryCount = ALEVEL_GLOSSARY[chapterId]?.length ?? 0;

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
        {mn ? 'Түлхүүр үгийн явц' : 'Key-term progress'}
      </div>
      <p className="text-[11px] text-slate-600 dark:text-slate-400">
        {mn
          ? `Номын түлхүүр үг: ${terms.length} · Глоссарийн үг: ${glossaryCount}. Үг бүрийг «Чадна» эсвэл «Хараахан» гэж үнэлнэ; бүгдийг үнэлсний дараа гарах билет нээгдэнэ.`
          : `Key terms in the book: ${terms.length} · Glossary entries: ${glossaryCount}. Rate every term I can or not yet; the exit ticket opens once all are rated.`}
      </p>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-bold font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
          {doneCount} / {terms.length} · {pct}%
        </span>
      </div>

      <WordRows words={words} mn={mn} t={tally} />

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
