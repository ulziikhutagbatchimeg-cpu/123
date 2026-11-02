import React, { useState } from 'react';
import { ChevronDown, Volume2 } from 'lucide-react';
import type { VocabularyTerm } from '../types/chemistry';
import { ChemText } from './common/ChemText';

// The key words of a topic as a list: each word shows on its own, and a click opens its definition. The button above opens
// every definition at once, or closes them all. The speaker button reads the word aloud.
export const KeyWordList: React.FC<{
  terms: VocabularyTerm[];
  mn: boolean;
  mode: string;
  speakWord: (word: string) => void;
}> = ({ terms, mn, mode, speakWord }) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const allOpen = terms.length > 0 && terms.every(t => open[t.id]);
  const toggle = (id: string) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? {} : Object.fromEntries(terms.map(t => [t.id, true])))}
          className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {allOpen ? (mn ? 'Бүгдийг хаах' : 'Close all') : mn ? 'Бүгдийг нээх' : 'Open all'}
        </button>
      </div>

      <ul className="space-y-2">
        {terms.map(voc => {
          const isOpen = !!open[voc.id];
          return (
            <li
              key={voc.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3 py-2.5">
                <button
                  type="button"
                  onClick={() => toggle(voc.id)}
                  aria-expanded={isOpen}
                  className="flex-1 min-w-0 flex items-center justify-between gap-3 text-left"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-slate-900 dark:text-white font-mono truncate">{voc.termEn}</span>
                    <span className="block text-xs text-emerald-600 dark:text-teal-400 font-bold truncate">{voc.termMn}</span>
                  </span>
                  <span className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">{voc.phonetic}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => speakWord(voc.termEn)}
                  title="Pronounce"
                  className="p-1.5 rounded bg-slate-200 dark:bg-slate-900 hover:bg-slate-300 dark:hover:bg-slate-800 text-teal-600 dark:text-teal-400 transition-colors shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {isOpen && (
                <div className="px-3 pb-3 space-y-2">
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <ChemText>{mn ? voc.definitionMn : voc.definitionEn}</ChemText>
                  </p>
                  {mode === 'dual' && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800/60 pt-1">
                      <ChemText>{voc.definitionMn}</ChemText>
                    </p>
                  )}
                  {voc.memoryTipEn && (
                    <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-2 rounded">
                      <span className="font-semibold text-amber-700 dark:text-amber-400">Tip: </span>
                      <ChemText>{mn ? voc.memoryTipMn : voc.memoryTipEn}</ChemText>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
