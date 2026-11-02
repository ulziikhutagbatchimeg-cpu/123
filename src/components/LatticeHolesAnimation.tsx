import React from 'react';

// The three holes in an arrangement of anions, drawn in 3D: tetrahedral, octahedral and cubic. Each hole's cation pulses in
// turn, with a ring, and the radius ratio of the cation for that hole sits under it. The motion stops for reduced motion.
type Pt = [number, number, number];

// A point of the unit cube on screen. An oblique view: the back of the cube sits up and to the right of the front.
const project = (ox: number, [x, y, z]: Pt) => ({
  x: ox + (x + 0.45 * z - 0.725) * 52,
  y: 84 - (y + 0.35 * z - 0.675) * 52
});

const CORNERS: Pt[] = [0, 1].flatMap(x => [0, 1].flatMap(y => [0, 1].map(z => [x, y, z] as Pt)));
// The face centres: with the corners, the anions of a face-centred arrangement
const FACES: Pt[] = [
  [0.5, 0.5, 0],
  [0.5, 0.5, 1],
  [0.5, 0, 0.5],
  [0.5, 1, 0.5],
  [0, 0.5, 0.5],
  [1, 0.5, 0.5]
];

// The 12 edges of the cube: pairs of corners that differ in one coordinate only
const EDGES: [Pt, Pt][] = CORNERS.flatMap((a, i) =>
  CORNERS.slice(i + 1)
    .filter(b => [0, 1, 2].filter(k => a[k] !== b[k]).length === 1)
    .map(b => [a, b] as [Pt, Pt])
);

const PANELS = [
  {
    key: 'tetra',
    ox: 60,
    anions: [...CORNERS, ...FACES],
    hole: [0.25, 0.25, 0.25] as Pt,
    nameMn: 'Тетраэдр хонгил',
    nameEn: 'Tetrahedral hole',
    ratio: '22.5–41.4%'
  },
  {
    key: 'octa',
    ox: 180,
    anions: [...CORNERS, ...FACES],
    hole: [0.5, 0.5, 0.5] as Pt,
    nameMn: 'Октаэдр хонгил',
    nameEn: 'Octahedral hole',
    ratio: '41.4–73.2%'
  },
  {
    key: 'cubic',
    ox: 300,
    anions: CORNERS,
    hole: [0.5, 0.5, 0.5] as Pt,
    nameMn: 'Куб хонгил',
    nameEn: 'Cubic hole',
    ratio: '73.2–100%'
  }
];

export const LatticeHolesAnimation: React.FC<{ mn: boolean; className?: string }> = ({ mn, className }) => (
  <svg
    viewBox="0 0 360 212"
    className={className}
    role="img"
    aria-label={mn ? 'Хонгилийн гурван төрөл: тетраэдр, октаэдр, куб' : 'Three hole types: tetrahedral, octahedral and cubic'}
  >
    <style>{`
      .lh-hole { transform-box: fill-box; transform-origin: center; animation: lh-pulse 3s ease-in-out infinite; }
      .lh-ring { transform-box: fill-box; transform-origin: center; animation: lh-ring 3s ease-out infinite; }
      @keyframes lh-pulse {
        0%, 100% { transform: scale(0.8); opacity: 0.4; }
        50% { transform: scale(1.1); opacity: 1; }
      }
      @keyframes lh-ring {
        0% { transform: scale(0.5); opacity: 0.9; }
        100% { transform: scale(2.6); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .lh-hole, .lh-ring { animation: none; }
      }
    `}</style>
    <rect x="4" y="4" width="352" height="200" rx="12" className="fill-sky-50 dark:fill-slate-950" stroke="#94a3b8" strokeWidth="1.5" />
    {PANELS.map((p, i) => {
      const at = (q: Pt) => project(p.ox, q);
      const hole = at(p.hole);
      const delay = `${i}s`;
      // Back anions first, so the front ones sit on top
      const anions = [...p.anions].sort((u, v) => v[2] - u[2]);
      return (
        <g key={p.key}>
          {EDGES.map(([a, b], k) => {
            const A = at(a);
            const B = at(b);
            return <line key={k} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#94a3b8" strokeWidth="1" />;
          })}
          {anions.map((q, k) => {
            const c = at(q);
            return <circle key={k} cx={c.x} cy={c.y} r="7" fill="#7c3aed" />;
          })}
          <circle
            cx={hole.x}
            cy={hole.y}
            r="6"
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
            className="lh-ring"
            style={{ animationDelay: delay }}
          />
          <circle cx={hole.x} cy={hole.y} r="6" fill="#f97316" className="lh-hole" style={{ animationDelay: delay }} />
          <text x={p.ox} y={150} textAnchor="middle" fontSize="9" fontWeight="bold" className="fill-slate-900 dark:fill-white">
            {mn ? p.nameMn : p.nameEn}
          </text>
          <text x={p.ox} y={164} textAnchor="middle" fontSize="9" className="fill-emerald-700 dark:fill-teal-300">
            {p.ratio}
          </text>
        </g>
      );
    })}
    <circle cx="118" cy="186" r="5" fill="#7c3aed" />
    <text x="127" y="189" fontSize="8" className="fill-slate-700 dark:fill-slate-300">{mn ? 'анион' : 'anion'}</text>
    <circle cx="180" cy="186" r="5" fill="#f97316" />
    <text x="189" y="189" fontSize="8" className="fill-slate-700 dark:fill-slate-300">{mn ? 'катион' : 'cation'}</text>
    <text x="180" y="202" textAnchor="middle" fontSize="8" className="fill-slate-600 dark:fill-slate-400">
      {mn ? 'Катионы радиус анионы радиусын хувиар' : 'Cation radius as a % of the anion radius'}
    </text>
  </svg>
);
