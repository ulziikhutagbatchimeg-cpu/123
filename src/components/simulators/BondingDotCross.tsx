import React, { useState } from 'react';

// Dot-and-cross diagrams for the bonding in the compounds of the syllabus.
// The dots belong to the first atom of each pair and the crosses to the second; a shared pair has one of each.

interface BondAtom {
  symbol: string;
  outer: number; // outer electrons drawn: before bonding (covalent) or after the transfer (ionic)
  before: string; // electron structure before bonding, e.g. "2,8,7"
  after: string; // electron structure after bonding, e.g. "2,8,8"
  x: number;
  y: number;
  charge?: '+' | '−';
}

interface BondingCompound {
  id: string;
  type: 'covalent' | 'ionic';
  atoms: BondAtom[];
  bonds: [number, number][];
  nameEn: string;
  nameMn: string;
  noteEn: string;
  noteMn: string;
}

interface Electron {
  x: number;
  y: number;
  kind: 'dot' | 'cross';
}

const COMPOUNDS: BondingCompound[] = [
  {
    id: 'H₂',
    type: 'covalent',
    atoms: [
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 130, y: 100 },
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 190, y: 100 }
    ],
    bonds: [[0, 1]],
    nameEn: 'Hydrogen (H₂)',
    nameMn: 'Устөрөгч (H₂)',
    noteEn: 'Each H shares its one electron, so each atom has 2 outer electrons (a duet), like helium.',
    noteMn: 'H бүр нэг электроноо хуваалцаж, атом бүр 2 гаднах электрон (дуэт) болно, гелийтэй адил.'
  },
  {
    id: 'Cl₂',
    type: 'covalent',
    atoms: [
      { symbol: 'Cl', outer: 7, before: '2,8,7', after: '2,8,8 (octet)', x: 130, y: 100 },
      { symbol: 'Cl', outer: 7, before: '2,8,7', after: '2,8,8 (octet)', x: 190, y: 100 }
    ],
    bonds: [[0, 1]],
    nameEn: 'Chlorine (Cl₂)',
    nameMn: 'Хлор (Cl₂)',
    noteEn: 'Each Cl shares one pair of electrons with the other, so each atom has 8 outer electrons (an octet).',
    noteMn: 'Cl бүр нэг хос электроноо нөгөөтэйгөө хуваалцаж, атом бүр 8 гаднах электрон (октет) болно.'
  },
  {
    id: 'HCl',
    type: 'covalent',
    atoms: [
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 130, y: 100 },
      { symbol: 'Cl', outer: 7, before: '2,8,7', after: '2,8,8 (octet)', x: 190, y: 100 }
    ],
    bonds: [[0, 1]],
    nameEn: 'Hydrogen chloride (HCl)',
    nameMn: 'Устөрөгчийн хлорид (HCl)',
    noteEn: 'H shares its electron with Cl: H reaches 2 outer electrons and Cl reaches 8.',
    noteMn: 'H электроноо Cl-тай хуваалцана: H 2, Cl 8 гаднах электронтой болно.'
  },
  {
    id: 'H₂O',
    type: 'covalent',
    atoms: [
      { symbol: 'O', outer: 6, before: '2,6', after: '2,8 (octet)', x: 160, y: 100 },
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 110, y: 100 },
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 210, y: 100 }
    ],
    bonds: [
      [0, 1],
      [0, 2]
    ],
    nameEn: 'Water (H₂O)',
    nameMn: 'Ус (H₂O)',
    noteEn: 'O shares one electron with each H: O has 8 outer electrons and each H has 2. The two dot-and-cross pairs left on O are lone pairs.',
    noteMn: 'O нь H бүртэй нэг электроныг хуваалцана: O 8, H бүр 2 гаднах электронтой. O дээр үлдсэн хоёр хос электрон холбоогүй хос юм.'
  },
  {
    id: 'NH₃',
    type: 'covalent',
    atoms: [
      { symbol: 'N', outer: 5, before: '2,5', after: '2,8 (octet)', x: 160, y: 100 },
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 110, y: 100 },
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 210, y: 100 },
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 160, y: 150 }
    ],
    bonds: [
      [0, 1],
      [0, 2],
      [0, 3]
    ],
    nameEn: 'Ammonia (NH₃)',
    nameMn: 'Аммиак (NH₃)',
    noteEn: 'N shares one electron with each of the 3 H: N has 8 outer electrons (one lone pair) and each H has 2.',
    noteMn: 'N нь 3 H-тай тус бүрд нэг электроноо хуваалцана: N 8 (нэг холбоогүй хос), H бүр 2 гаднах электронтой.'
  },
  {
    id: 'CH₄',
    type: 'covalent',
    atoms: [
      { symbol: 'C', outer: 4, before: '2,4', after: '2,8 (octet)', x: 160, y: 100 },
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 160, y: 50 },
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 110, y: 100 },
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 210, y: 100 },
      { symbol: 'H', outer: 1, before: '1', after: '2 (duet)', x: 160, y: 150 }
    ],
    bonds: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4]
    ],
    nameEn: 'Methane (CH₄)',
    nameMn: 'Метан (CH₄)',
    noteEn: 'C shares one electron with each of the 4 H: C has 8 outer electrons and each H has 2.',
    noteMn: 'C нь 4 H-тай тус бүрд нэг электроноо хуваалцана: C 8, H бүр 2 гаднах электронтой.'
  },
  {
    id: 'NaCl',
    type: 'ionic',
    atoms: [
      { symbol: 'Na', outer: 0, before: '2,8,1', after: '2,8 (Na⁺)', x: 100, y: 100, charge: '+' },
      { symbol: 'Cl', outer: 8, before: '2,8,7', after: '2,8,8 (Cl⁻)', x: 220, y: 100, charge: '−' }
    ],
    bonds: [],
    nameEn: 'Sodium chloride (NaCl)',
    nameMn: 'Натрийн хлорид (NaCl)',
    noteEn: 'Na gives its outer electron to Cl. Na⁺ has the structure of neon (2,8) and Cl⁻ of argon (2,8,8). The dot on Cl is the electron from Na.',
    noteMn: 'Na гаднах электроноо Cl-д өгнө. Na⁺ нь неон (2,8), Cl⁻ нь аргон (2,8,8) бүтэцтэй. Cl дээрх • нь Na-ийн электрон.'
  }
];

const SIDE_ANGLES = [-90, 0, 90, 180]; // north, east, south and west on the screen
const RADIUS = 26;

const angularDistance = (a: number, b: number) => {
  const d = Math.abs(a - b) % 360;
  return Math.min(d, 360 - d);
};

// Electrons that are not shared go on the sides that no bond uses; two on one side sit side by side
const loneElectrons = (c: BondingCompound, i: number): Electron[] => {
  const atom = c.atoms[i];
  const partners = c.bonds.filter(([a, b]) => a === i || b === i).map(([a, b]) => (a === i ? b : a));
  const bondAngles = partners.map(j => (Math.atan2(c.atoms[j].y - atom.y, c.atoms[j].x - atom.x) * 180) / Math.PI);
  const sides = SIDE_ANGLES.filter(s => bondAngles.every(b => angularDistance(b, s) > 45));
  const free = Math.max(0, atom.outer - partners.length);
  const out: Electron[] = [];
  if (sides.length === 0) return out;

  for (let k = 0; k < free; k++) {
    const sideIndex = k % sides.length;
    const pass = Math.floor(k / sides.length);
    const onSide = Math.ceil((free - sideIndex) / sides.length);
    const offset = onSide === 1 ? 0 : pass === 0 ? -4 : 4;
    const rad = (sides[sideIndex] * Math.PI) / 180;
    const ux = Math.cos(rad);
    const uy = Math.sin(rad);
    // On an ion, the last electron on the anion came from the metal, so it is drawn as a dot
    const kind = atom.charge === '−' ? (k === free - 1 ? 'dot' : 'cross') : i === 0 ? 'dot' : 'cross';
    out.push({ x: atom.x + RADIUS * ux - uy * offset, y: atom.y + RADIUS * uy + ux * offset, kind });
  }
  return out;
};

// Each shared pair is one dot from the first atom and one cross from the second, side by side on the bond
const sharedPairs = (c: BondingCompound): Electron[] =>
  c.bonds.flatMap(([i, j]) => {
    const a = c.atoms[i];
    const b = c.atoms[j];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const px = -(b.y - a.y) / len;
    const py = (b.x - a.x) / len;
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    return [
      { x: mx - px * 5, y: my - py * 5, kind: 'dot' as const },
      { x: mx + px * 5, y: my + py * 5, kind: 'cross' as const }
    ];
  });

const Cross = ({ x, y }: { x: number; y: number }) => (
  <g className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={2.2} strokeLinecap="round">
    <line x1={x - 3.6} y1={y - 3.6} x2={x + 3.6} y2={y + 3.6} />
    <line x1={x - 3.6} y1={y + 3.6} x2={x + 3.6} y2={y - 3.6} />
  </g>
);

const Electrons = ({ list, prefix }: { list: Electron[]; prefix: string }) => (
  <>
    {list.map((e, k) =>
      e.kind === 'dot' ? (
        <circle key={`${prefix}-${k}`} cx={e.x} cy={e.y} r={3.4} className="fill-sky-600 dark:fill-sky-400" />
      ) : (
        <Cross key={`${prefix}-${k}`} x={e.x} y={e.y} />
      )
    )}
  </>
);

export const BondingDotCross: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [selectedId, setSelectedId] = useState<string>('Cl₂');
  const compound = COMPOUNDS.find(c => c.id === selectedId) ?? COMPOUNDS[0];
  const lone = compound.atoms.flatMap((_, i) => loneElectrons(compound, i));
  const shared = sharedPairs(compound);
  const typeLabel = (c: BondingCompound) => (c.type === 'ionic' ? (mn ? 'ионы' : 'ionic') : mn ? 'ковалент' : 'covalent');

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-sky-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="inline-block px-3 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/30 text-[11px] font-mono font-bold">
            {mn ? 'Syllabus: ковалент ба ионы холбоо' : 'Syllabus: covalent and ionic bonding'}
          </span>
          <h3 className="text-xl sm:text-2xl font-black mt-2 text-slate-900 dark:text-white">
            {mn ? 'Холбоо: dot-and-cross диаграм' : 'Bonding: dot-and-cross diagrams'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          {mn
            ? 'Атом бүрийн гаднах электроныг хараад, хуваалцсан эсвэл шилжсэн электроныг дагаарай.'
            : 'Follow the outer-shell electrons of each atom as they are shared or transferred.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {COMPOUNDS.map(c => {
          const active = c.id === compound.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`px-3.5 py-2 rounded-xl border text-sm font-black transition-all flex items-center gap-2 ${
                active
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
              }`}
            >
              <span>{c.id}</span>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                  active
                    ? 'bg-white/20 text-white'
                    : c.type === 'ionic'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'
                      : 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300'
                }`}
              >
                {typeLabel(c)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <svg
            viewBox="0 0 320 200"
            className="w-full h-auto select-none"
            role="img"
            aria-label={mn ? `${compound.id} холбооны диаграм` : `${compound.id} bonding diagram`}
          >
            <rect x={0} y={0} width={320} height={200} rx={14} className="fill-slate-50 dark:fill-slate-900" />

            {compound.type === 'ionic' && (
              <g className="stroke-indigo-500 dark:stroke-indigo-400" strokeWidth={1.8} fill="none">
                <line x1={146} y1={100} x2={170} y2={100} />
                <path d="M 163 95 L 170 100 L 163 105" />
                <text x={158} y={88} textAnchor="middle" stroke="none" className="text-[11px] font-mono font-black fill-indigo-600 dark:fill-indigo-300">
                  e⁻
                </text>
              </g>
            )}

            {compound.atoms.map((atom, i) => (
              <g key={`atom-${i}`}>
                {atom.charge && (
                  <>
                    <rect
                      x={atom.x - 40}
                      y={atom.y - 40}
                      width={80}
                      height={80}
                      rx={10}
                      fill="none"
                      className="stroke-indigo-400 dark:stroke-indigo-500"
                      strokeWidth={2}
                    />
                    <text x={atom.x + 46} y={atom.y - 32} textAnchor="middle" className="text-sm font-black fill-rose-600 dark:fill-rose-400">
                      {atom.charge}
                    </text>
                  </>
                )}
                <circle cx={atom.x} cy={atom.y} r={20} className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth={1.5} />
                <text x={atom.x} y={atom.y} dy="0.35em" textAnchor="middle" className="text-base font-black fill-slate-900 dark:fill-white">
                  {atom.symbol}
                </text>
              </g>
            ))}

            <Electrons list={lone} prefix="lone" />
            <Electrons list={shared} prefix="shared" />
          </svg>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <circle cx="5" cy="5" r="3.4" className="fill-sky-600 dark:fill-sky-400" />
              </svg>
              {mn ? '1-р атомын электрон' : 'electron of the first atom'}
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <g className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={2} strokeLinecap="round">
                  <line x1="2" y1="2" x2="8" y2="8" />
                  <line x1="2" y1="8" x2="8" y2="2" />
                </g>
              </svg>
              {mn ? '2-р атомын электрон' : 'electron of the second atom'}
            </span>
            <span>{mn ? 'Хуваалцсан хос: нэг • ба нэг ×' : 'Shared pair: one • and one ×'}</span>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-lg font-black text-slate-900 dark:text-white">{mn ? compound.nameMn : compound.nameEn}</h4>

          <div className="space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {mn ? 'Электрон бүтэц (өмнө → дараа)' : 'Electron structure (before → after)'}
            </div>
            {compound.atoms.map((atom, i) => (
              <div
                key={`row-${i}`}
                className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs"
              >
                <span className="font-black text-slate-900 dark:text-white text-sm">
                  {atom.symbol}
                  {atom.charge && <sup className="text-rose-600 dark:text-rose-400">{atom.charge}</sup>}
                </span>
                <span className="text-slate-600 dark:text-slate-300">
                  {atom.before} <span className="text-slate-400 dark:text-slate-500">→</span> {atom.after}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs leading-relaxed">
            {mn ? compound.noteMn : compound.noteEn}
          </div>
        </div>
      </div>
    </div>
  );
};
