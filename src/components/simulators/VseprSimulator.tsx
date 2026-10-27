import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

// The VSEPR chart as data: electron domains, lone pairs, the molecular shape, the bond angle and an example.
// bonds and lonePairs are the directions (degrees, 0 = right, 90 = up) used for the 2D sketch.
interface VseprRow {
  domains: number;
  lonePairs: number;
  shape: { en: string; mn: string };
  angle: string;
  example: string;
  effect: { en: string; mn: string };
  bonds: number[];
  lonePairDirs: number[];
}

export const VSEPR_ROWS: VseprRow[] = [
  {
    domains: 2, lonePairs: 0,
    shape: { en: 'Linear', mn: 'Шугаман' },
    angle: '180°',
    example: 'CO₂',
    effect: { en: 'No lone pairs on the central atom.', mn: 'Төв атомд хосгүй электрон байхгүй.' },
    bonds: [0, 180], lonePairDirs: []
  },
  {
    domains: 3, lonePairs: 0,
    shape: { en: 'Trigonal planar', mn: 'Гурвалжин хавтгай' },
    angle: '120°',
    example: 'BF₃',
    effect: { en: 'No lone pairs on the central atom.', mn: 'Төв атомд хосгүй электрон байхгүй.' },
    bonds: [90, 210, 330], lonePairDirs: []
  },
  {
    domains: 4, lonePairs: 0,
    shape: { en: 'Tetrahedral', mn: 'Тетраэдр' },
    angle: '109.5°',
    example: 'CH₄',
    effect: { en: 'No lone pairs. The shape is tetrahedral.', mn: 'Хосгүй электрон байхгүй. Хэлбэр нь тетраэдр.' },
    bonds: [90, 210, 330, 270], lonePairDirs: []
  },
  {
    domains: 4, lonePairs: 1,
    shape: { en: 'Trigonal pyramidal', mn: 'Гурвалжин пирамид' },
    angle: '~107°',
    example: 'NH₃',
    effect: { en: '1 lone pair compresses the bond angles slightly.', mn: '1 хосгүй электрон холбооны өнцгийг бага зэрэг шахна.' },
    bonds: [210, 330, 270], lonePairDirs: [90]
  },
  {
    domains: 4, lonePairs: 2,
    shape: { en: 'Bent', mn: 'Нугарсан' },
    angle: '~104.5°',
    example: 'H₂O',
    effect: { en: '2 lone pairs compress the bond angles more.', mn: '2 хосгүй электрон холбооны өнцгийг илүү шахна.' },
    bonds: [225, 315], lonePairDirs: [120, 60]
  },
  {
    domains: 5, lonePairs: 0,
    shape: { en: 'Trigonal bipyramidal', mn: 'Гурвалжин хоёр пирамид' },
    angle: '90° / 120°',
    example: 'PCl₅',
    effect: { en: 'No lone pairs. The shape is trigonal bipyramidal.', mn: 'Хосгүй электрон байхгүй. Хэлбэр нь гурвалжин хоёр пирамид.' },
    bonds: [0, 120, 240, 90, 270], lonePairDirs: []
  },
  {
    domains: 5, lonePairs: 1,
    shape: { en: 'Seesaw', mn: 'Оромтой' },
    angle: '<90° / <120°',
    example: 'SF₄',
    effect: { en: '1 lone pair compresses the angles.', mn: '1 хосгүй электрон өнцгийг шахна.' },
    bonds: [0, 240, 90, 270], lonePairDirs: [120]
  },
  {
    domains: 5, lonePairs: 2,
    shape: { en: 'T-shaped', mn: 'T хэлбэр' },
    angle: '<90°',
    example: 'ClF₃',
    effect: { en: '2 lone pairs compress the angles more.', mn: '2 хосгүй электрон өнцгийг илүү шахна.' },
    bonds: [0, 90, 270], lonePairDirs: [120, 240]
  },
  {
    domains: 5, lonePairs: 3,
    shape: { en: 'Linear', mn: 'Шугаман' },
    angle: '180°',
    example: 'I₃⁻',
    effect: { en: '3 lone pairs leave 2 bonds opposite each other.', mn: '3 хосгүй электрон 2 холбоог эсрэг талд үлдээнэ.' },
    bonds: [90, 270], lonePairDirs: [0, 120, 240]
  },
  {
    domains: 6, lonePairs: 0,
    shape: { en: 'Octahedral', mn: 'Октаэдр' },
    angle: '90°',
    example: 'SF₆',
    effect: { en: 'No lone pairs. The shape is octahedral.', mn: 'Хосгүй электрон байхгүй. Хэлбэр нь октаэдр.' },
    bonds: [0, 90, 180, 270], lonePairDirs: []
  }
];

const C = 130;
const BOND_LENGTH = 88;
const LONE_PAIR_LENGTH = 56;

const point = (deg: number, length: number) => ({
  x: C + length * Math.cos((deg * Math.PI) / 180),
  y: C - length * Math.sin((deg * Math.PI) / 180)
});

// A 2D sketch of one row: bonded atoms in blue, lone pairs in purple, the central atom in grey
const Sketch: React.FC<{ row: VseprRow }> = ({ row }) => (
  <svg viewBox="0 0 260 260" className="w-full max-w-xs mx-auto" role="img" aria-label={`${row.shape.en} ${row.example}`}>
    {row.bonds.map(d => {
      const p = point(d, BOND_LENGTH);
      return <line key={`bond-${d}`} x1={C} y1={C} x2={p.x} y2={p.y} stroke="#64748b" strokeWidth={4} />;
    })}
    {row.lonePairDirs.map(d => {
      const p = point(d, LONE_PAIR_LENGTH);
      return <line key={`lp-line-${d}`} x1={C} y1={C} x2={p.x} y2={p.y} stroke="#a855f7" strokeWidth={2} strokeDasharray="4 4" />;
    })}
    {row.bonds.map(d => {
      const p = point(d, BOND_LENGTH);
      return <circle key={`atom-${d}`} cx={p.x} cy={p.y} r={14} fill="#3b82f6" />;
    })}
    {row.lonePairDirs.map(d => {
      const p = point(d, LONE_PAIR_LENGTH);
      return (
        <g key={`lp-${d}`}>
          <circle cx={p.x} cy={p.y} r={13} fill="#a855f7" />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">••</text>
        </g>
      );
    })}
    <circle cx={C} cy={C} r={18} fill="#334155" />
    <text x={C} y={C + 4} textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">X</text>
  </svg>
);

export const VseprSimulator: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const [index, setIndex] = useState(0);
  const row = VSEPR_ROWS[index];
  const sameDomains = VSEPR_ROWS.filter(r => r.domains === row.domains);

  const pickDomains = (domains: number) => {
    const i = VSEPR_ROWS.findIndex(r => r.domains === domains);
    if (i >= 0) setIndex(i);
  };

  const pickLonePairs = (lonePairs: number) => {
    const i = VSEPR_ROWS.findIndex(r => r.domains === row.domains && r.lonePairs === lonePairs);
    if (i >= 0) setIndex(i);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
          {mn ? 'AS & A Level 9701 · Сэдэв 3.5' : 'AS & A Level 9701 · Topic 3.5'}
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
          {mn ? 'VSEPR: молекулын геометр' : 'VSEPR: molecular geometry'}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {mn
            ? 'Төв атомын электрон хосууд хоорондоо түлхэлцэж, молекулын хэлбэр ба холбооны өнцгийг тодорхойлно.'
            : 'Electron pairs around the central atom repel each other and set the molecular shape and bond angle.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {mn ? 'Электрон хосын тоо' : 'Electron domains'}
            </div>
            <div className="flex flex-wrap gap-2">
              {[2, 3, 4, 5, 6].map(d => (
                <button
                  key={d}
                  onClick={() => pickDomains(d)}
                  aria-pressed={row.domains === d}
                  className={`w-11 h-11 rounded-xl border text-base font-black transition-colors ${
                    row.domains === d
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {mn ? 'Хосгүй электрон' : 'Lone pairs'}
            </div>
            <div className="flex flex-wrap gap-2">
              {sameDomains.map(r => (
                <button
                  key={r.lonePairs}
                  onClick={() => pickLonePairs(r.lonePairs)}
                  aria-pressed={row.lonePairs === r.lonePairs}
                  className={`px-3 py-2 rounded-xl border text-sm font-bold transition-colors ${
                    row.lonePairs === r.lonePairs
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-purple-500'
                  }`}
                >
                  {r.lonePairs}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <Sketch row={row} />
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500" />{mn ? 'Холбогч хос' : 'Bonded pair'}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-500" />{mn ? 'Хосгүй электрон' : 'Lone pair'}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-700" />{mn ? 'Төв атом' : 'Central atom'}</span>
            </div>
            <p className="mt-2 text-[11px] text-center text-slate-500 dark:text-slate-400">
              {mn ? 'Дүрслэл нь 2D ойролцоолол; бодит 3D хэлбэр өөр байж болно.' : 'The sketch is a 2D approximation of the 3D shape.'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50/60 dark:bg-violet-950/30 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
              {mn ? 'Молекулын хэлбэр' : 'Molecular shape'}
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{mn ? row.shape.mn : row.shape.en}</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">{mn ? 'Жишээ' : 'Example'}</div>
                <div className="font-mono font-black text-slate-900 dark:text-white">{row.example}</div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">{mn ? 'Холбооны өнцөг' : 'Bond angle'}</div>
                <div className="font-mono font-black text-slate-900 dark:text-white">{row.angle}</div>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">{mn ? 'Хосгүй электроны нөлөө' : 'Lone-pair effect'}</div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? row.effect.mn : row.effect.en}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-black">{mn ? 'Гол зарчим: ' : 'Key principle: '}</span>
            {mn
              ? 'Хосгүй электрон хос нь холбогч хосоос илүү түлхэлцдэг тул холбооны өнцгийг багасгана.'
              : 'Lone pairs repel more strongly than bonding pairs, so they compress the bond angles.'}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {mn ? 'Бүх мөр (хүснэгт) — сонгож үзэх' : 'The whole chart — pick a row'}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {VSEPR_ROWS.map((r, i) => (
            <button
              key={`${r.domains}-${r.lonePairs}`}
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className={`p-2.5 rounded-xl border text-left transition-colors ${
                i === index
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-violet-500'
              }`}
            >
              <span className="block text-[11px] font-mono font-bold opacity-80">
                {r.domains} · {r.lonePairs} {mn ? 'хосгүй' : 'lone'}
              </span>
              <span className="block text-xs font-black leading-snug">{mn ? r.shape.mn : r.shape.en}</span>
              <span className="block text-[11px] font-mono mt-0.5">{r.example} · {r.angle}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
