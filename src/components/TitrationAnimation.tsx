import React from 'react';

// Acid-alkali titration, drawn small and animated. Acid drips from the burette into the flask; the level in the burette falls,
// and the pink of the alkali with phenolphthalein turns colourless at the end point. The motion stops for reduced motion.
export const TitrationAnimation: React.FC<{ mn: boolean; className?: string }> = ({ mn, className }) => (
  <svg
    viewBox="0 0 240 200"
    className={className}
    role="img"
    aria-label={
      mn
        ? 'Хүчил-суурийн титрлэлт: бүреттээс дусаах хүчил, колбонд өнгө алга болно'
        : 'Acid-alkali titration: acid drips from the burette, and the flask turns colourless'
    }
  >
    {/* The stand */}
    <rect x="50" y="186" width="140" height="6" rx="2" className="fill-slate-400 dark:fill-slate-600" />
    <rect x="114" y="6" width="5" height="180" rx="2" className="fill-slate-400 dark:fill-slate-600" />

    {/* The burette and the acid in it, which falls as the titration goes on */}
    <rect x="100" y="8" width="20" height="92" rx="3" className="fill-white dark:fill-slate-900" stroke="#94a3b8" strokeWidth="1.5" />
    <rect x="102" y="12" width="16" height="84" rx="2" fill="#bae6fd" className="ti-level" />
    <path d="M110 100 V110" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
    <circle cx="110" cy="116" r="3" fill="#bae6fd" stroke="#38bdf8" className="ti-drop" />

    {/* The conical flask: the alkali with phenolphthalein, pink at first */}
    <path
      d="M96 118 H124 L150 176 Q152 182 144 182 H76 Q68 182 70 176 Z"
      className="fill-white dark:fill-slate-900"
      stroke="#94a3b8"
      strokeWidth="1.5"
    />
    <path d="M86 152 H134 L148 178 Q150 182 144 182 H76 Q70 182 72 178 Z" className="ti-colour" />

    {/* Labels */}
    <text x="120" y="22" textAnchor="start" fontSize="8" className="fill-slate-600 dark:fill-slate-300">
      {mn ? 'Бүретт: хүчил' : 'Burette: acid'}
    </text>
    <text x="120" y="164" textAnchor="middle" fontSize="8" className="fill-slate-600 dark:fill-slate-300">
      {mn ? 'Колба: суурь + фенолфталейн' : 'Flask: alkali + phenolphthalein'}
    </text>
    <text x="120" y="198" textAnchor="middle" fontSize="7.5" className="fill-slate-700 dark:fill-slate-200">
      {mn ? 'Ягаан өнгө алга болвол төгсгөлийн цэг' : 'The pink fades at the end point'}
    </text>
  </svg>
);
