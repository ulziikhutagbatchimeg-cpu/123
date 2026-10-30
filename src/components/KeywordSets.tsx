import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { KEYWORD_SETS } from '../data/keywordSets';

// The key words that cut across the chapters. One set is open at a time; each term shows its definition in the student's language.
export const KeywordSets: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const [openId, setOpenId] = useState<string>(KEYWORD_SETS[0].id);
  const active = KEYWORD_SETS.find(s => s.id === openId) ?? KEYWORD_SETS[0];

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
          {mn ? 'Бүлгээс гадуурх түлхүүр үгс' : 'Key words across the chapters'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          {mn ? 'Нэг багцыг сонгоод нэр томьёо бүрийн тайлбарыг уншаарай.' : 'Pick one set and read the definition of each term.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {KEYWORD_SETS.map(s => (
          <button
            key={s.id}
            onClick={() => setOpenId(s.id)}
            aria-pressed={active.id === s.id}
            className={`px-3 py-1.5 rounded-xl border text-xs font-black transition-colors ${
              active.id === s.id
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-500'
            }`}
          >
            {mn ? s.titleMn : s.titleEn}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400">{mn ? active.descMn : active.descEn}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {active.terms.map(t => (
          <div key={t.termEn} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-1">
            <div className="text-sm font-black text-slate-900 dark:text-white">{mn ? t.termMn : t.termEn}</div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{mn ? t.termEn : t.termMn}</div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? t.defMn : t.defEn}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
