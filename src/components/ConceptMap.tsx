import React from 'react';
import { ChemText } from './common/ChemText';

// A concept map: a centre idea with branch cards around it, and the key words underneath. The chapter map and the topic
// map use this layout. A branch with onClick is a button, so the student can open that topic.

export interface ConceptBranch {
  id: string;
  title: string;
  ref?: string;
  lines: string[];
  onClick?: () => void;
}

export const ConceptMap: React.FC<{
  label: string;
  centre: string;
  centreRef?: string;
  branches: ConceptBranch[];
  terms: string[];
  mn: boolean;
}> = ({ label, centre, centreRef, branches, terms, mn }) => (
  <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">{label}</div>

    <div className="flex flex-col items-center">
      <div className="max-w-full px-5 py-2.5 rounded-2xl bg-violet-600 text-white text-sm font-black text-center">
        {centreRef && <span className="block text-[10px] font-mono font-bold opacity-80">{centreRef}</span>}
        <ChemText>{centre}</ChemText>
      </div>
      {branches.length > 0 && <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />}
    </div>

    {branches.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {branches.map(b => {
          const card = (
            <>
              <div className="text-xs font-black text-violet-900 dark:text-violet-200">
                <ChemText>{b.title}</ChemText>
              </div>
              {b.ref && <div className="text-[10px] font-mono font-bold text-violet-700 dark:text-violet-300">{b.ref}</div>}
              {b.lines.length > 0 && (
                <ul className="space-y-1">
                  {b.lines.map((line, i) => (
                    <li key={i} className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                      • <ChemText>{line}</ChemText>
                    </li>
                  ))}
                </ul>
              )}
            </>
          );
          const box = 'rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 p-3 space-y-2 text-left';
          return b.onClick ? (
            <button key={b.id} onClick={b.onClick} className={`${box} hover:border-violet-500 transition-colors`}>
              {card}
            </button>
          ) : (
            <div key={b.id} className={box}>
              {card}
            </div>
          );
        })}
      </div>
    )}

    {terms.length > 0 && (
      <div className="space-y-2">
        <div className="text-[11px] font-black text-slate-700 dark:text-slate-200">{mn ? 'Түлхүүр үгс' : 'Key words'}</div>
        <div className="flex flex-wrap gap-1.5">
          {terms.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="px-2 py-0.5 rounded-lg border border-slate-300 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-200"
            >
              <ChemText>{t}</ChemText>
            </span>
          ))}
        </div>
      </div>
    )}
  </section>
);
