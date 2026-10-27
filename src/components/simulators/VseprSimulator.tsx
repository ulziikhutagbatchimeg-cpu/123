import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// A direction in 3D: x to the right, y up, z towards the viewer
type Vec = [number, number, number];

// The VSEPR chart as data: electron domains, lone pairs, the molecular shape, the bond angle and an example.
// bondDirs and lonePairDirs are the directions of the electron pairs around the central atom.
interface VseprRow {
  domains: number;
  lonePairs: number;
  shape: { en: string; mn: string };
  angle: string;
  example: string;
  effect: { en: string; mn: string };
  bondDirs: Vec[];
  lonePairDirs: Vec[];
}

// Three positions in a flat ring (the trigonal planar and equatorial positions), the two axial positions and the four tetrahedral corners
const EQUATORIAL: Vec[] = Array.from({ length: 3 }, (_, k) => {
  const a = (2 * Math.PI * k) / 3;
  return [Math.cos(a), Math.sin(a), 0];
});
const AXIAL: Vec[] = [[0, 0, 1], [0, 0, -1]];
const TETRA: Vec[] = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];

export const VSEPR_ROWS: VseprRow[] = [
  {
    domains: 2, lonePairs: 0,
    shape: { en: 'Linear', mn: 'Шугаман' },
    angle: '180°',
    example: 'CO₂',
    effect: { en: 'No lone pairs on the central atom.', mn: 'Төв атомд хосгүй электрон байхгүй.' },
    bondDirs: [[1, 0, 0], [-1, 0, 0]], lonePairDirs: []
  },
  {
    domains: 3, lonePairs: 0,
    shape: { en: 'Trigonal planar', mn: 'Гурвалжин хавтгай' },
    angle: '120°',
    example: 'BF₃',
    effect: { en: 'No lone pairs on the central atom.', mn: 'Төв атомд хосгүй электрон байхгүй.' },
    bondDirs: EQUATORIAL, lonePairDirs: []
  },
  {
    domains: 4, lonePairs: 0,
    shape: { en: 'Tetrahedral', mn: 'Тетраэдр' },
    angle: '109.5°',
    example: 'CH₄',
    effect: { en: 'No lone pairs. The shape is tetrahedral.', mn: 'Хосгүй электрон байхгүй. Хэлбэр нь тетраэдр.' },
    bondDirs: TETRA, lonePairDirs: []
  },
  {
    domains: 4, lonePairs: 1,
    shape: { en: 'Trigonal pyramidal', mn: 'Гурвалжин пирамид' },
    angle: '~107°',
    example: 'NH₃',
    effect: { en: '1 lone pair compresses the bond angles slightly.', mn: '1 хосгүй электрон холбооны өнцгийг бага зэрэг шахна.' },
    bondDirs: TETRA.slice(0, 3), lonePairDirs: TETRA.slice(3)
  },
  {
    domains: 4, lonePairs: 2,
    shape: { en: 'Bent', mn: 'Нугарсан' },
    angle: '~104.5°',
    example: 'H₂O',
    effect: { en: '2 lone pairs compress the bond angles more.', mn: '2 хосгүй электрон холбооны өнцгийг илүү шахна.' },
    bondDirs: TETRA.slice(0, 2), lonePairDirs: TETRA.slice(2)
  },
  {
    domains: 5, lonePairs: 0,
    shape: { en: 'Trigonal bipyramidal', mn: 'Гурвалжин хоёр пирамид' },
    angle: '90° / 120°',
    example: 'PCl₅',
    effect: { en: 'No lone pairs. The shape is trigonal bipyramidal.', mn: 'Хосгүй электрон байхгүй. Хэлбэр нь гурвалжин хоёр пирамид.' },
    bondDirs: [...AXIAL, ...EQUATORIAL], lonePairDirs: []
  },
  {
    domains: 5, lonePairs: 1,
    shape: { en: 'Seesaw', mn: 'Оромтой' },
    angle: '<90° / <120°',
    example: 'SF₄',
    effect: { en: '1 lone pair compresses the angles.', mn: '1 хосгүй электрон өнцгийг шахна.' },
    bondDirs: [...AXIAL, EQUATORIAL[0], EQUATORIAL[2]], lonePairDirs: [EQUATORIAL[1]]
  },
  {
    domains: 5, lonePairs: 2,
    shape: { en: 'T-shaped', mn: 'T хэлбэр' },
    angle: '<90°',
    example: 'ClF₃',
    effect: { en: '2 lone pairs compress the angles more.', mn: '2 хосгүй электрон өнцгийг илүү шахна.' },
    bondDirs: [...AXIAL, EQUATORIAL[0]], lonePairDirs: [EQUATORIAL[1], EQUATORIAL[2]]
  },
  {
    domains: 5, lonePairs: 3,
    shape: { en: 'Linear', mn: 'Шугаман' },
    angle: '180°',
    example: 'I₃⁻',
    effect: { en: '3 lone pairs leave 2 bonds opposite each other.', mn: '3 хосгүй электрон 2 холбоог эсрэг талд үлдээнэ.' },
    bondDirs: AXIAL, lonePairDirs: EQUATORIAL
  },
  {
    domains: 6, lonePairs: 0,
    shape: { en: 'Octahedral', mn: 'Октаэдр' },
    angle: '90°',
    example: 'SF₆',
    effect: { en: 'No lone pairs. The shape is octahedral.', mn: 'Хосгүй электрон байхгүй. Хэлбэр нь октаэдр.' },
    bondDirs: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], ...AXIAL], lonePairDirs: []
  }
];

const SIZE = 260;
const C = SIZE / 2;
const BOND_LENGTH = 92;
const LONE_PAIR_DISTANCE = 64;

const unit = ([x, y, z]: Vec): Vec => {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
};

// Turns a point around the vertical axis (yaw), then around the horizontal axis (pitch)
const rotate = ([x, y, z]: Vec, yaw: number, pitch: number): Vec => {
  const x1 = x * Math.cos(yaw) + z * Math.sin(yaw);
  const z1 = -x * Math.sin(yaw) + z * Math.cos(yaw);
  return [x1, y * Math.cos(pitch) - z1 * Math.sin(pitch), y * Math.sin(pitch) + z1 * Math.cos(pitch)];
};

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The molecule in 3D: it turns by itself, and it turns when dragged. Bonds are blue atoms on grey sticks,
// lone pairs are purple electron clouds with the two electrons drawn in.
const Molecule3D: React.FC<{ row: VseprRow; mn: boolean }> = ({ row, mn }) => {
  const [yaw, setYaw] = useState(0.5);
  const [pitch, setPitch] = useState(-0.35);
  const [spinning, setSpinning] = useState(() => !prefersReducedMotion());
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!spinning) return;
    let frame = 0;
    const tick = () => {
      setYaw(y => y + 0.012);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [spinning]);

  // Puts a direction on the screen. Points nearer the viewer are drawn larger.
  const place = (v: Vec, distance: number) => {
    const [x, y, z] = rotate(unit(v), yaw, pitch);
    return { x: C + x * distance, y: C - y * distance, z, size: 1 + z * 0.12 };
  };

  const parts: { z: number; node: React.ReactNode }[] = [];

  row.bondDirs.forEach((v, i) => {
    const p = place(v, BOND_LENGTH);
    parts.push({
      z: p.z,
      node: (
        <g key={`bond-${i}`}>
          <line x1={C} y1={C} x2={p.x} y2={p.y} stroke="#94a3b8" strokeWidth={7 * p.size} strokeLinecap="round" />
          <circle cx={p.x} cy={p.y} r={18 * p.size} fill="url(#vsepr-bonded)" />
        </g>
      )
    });
  });

  row.lonePairDirs.forEach((v, i) => {
    const p = place(v, LONE_PAIR_DISTANCE);
    const angle = (Math.atan2(p.y - C, p.x - C) * 180) / Math.PI;
    const rx = 34 * p.size;
    parts.push({
      z: p.z,
      node: (
        <g key={`lp-${i}`} transform={`translate(${p.x} ${p.y}) rotate(${angle})`} opacity={0.55 + 0.45 * ((p.z + 1) / 2)}>
          <ellipse rx={rx} ry={20 * p.size} fill="url(#vsepr-cloud)" stroke="#c084fc" strokeWidth={1.5}>
            <animate attributeName="rx" values={`${rx};${rx + 3};${rx}`} dur="2.4s" repeatCount="indefinite" />
          </ellipse>
          <circle cx={-10} cy={0} r={4.5} fill="#facc15" stroke="#854d0e" strokeWidth={0.8} />
          <circle cx={10} cy={0} r={4.5} fill="#facc15" stroke="#854d0e" strokeWidth={0.8} />
        </g>
      )
    });
  });

  parts.sort((a, b) => a.z - b.z);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-violet-200 dark:border-violet-900 bg-gradient-to-br from-violet-100 via-white to-sky-100 dark:from-violet-950/60 dark:via-slate-950 dark:to-sky-950/50">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-sm mx-auto block cursor-grab active:cursor-grabbing select-none pt-6"
        style={{ touchAction: 'none' }}
        role="img"
        aria-label={`${row.shape.en} ${row.example}`}
        onPointerDown={e => {
          drag.current = { x: e.clientX, y: e.clientY };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={e => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          const dy = e.clientY - drag.current.y;
          drag.current = { x: e.clientX, y: e.clientY };
          setYaw(y => y + dx * 0.01);
          setPitch(p => Math.max(-1.3, Math.min(1.3, p + dy * 0.01)));
        }}
        onPointerUp={() => { drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}
      >
        <defs>
          <radialGradient id="vsepr-bonded" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="60%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
          <radialGradient id="vsepr-central" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <radialGradient id="vsepr-cloud" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5d0fe" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#a855f7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <ellipse cx={C} cy={C + 116} rx={70} ry={10} fill="#4c1d95" opacity={0.12} />
        {parts.map(p => p.node)}
        <circle cx={C} cy={C} r={21} fill="url(#vsepr-central)" />
        <text x={C} y={C + 5} textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">X</text>
      </svg>

      <button
        onClick={() => setSpinning(s => !s)}
        aria-label={mn ? 'Эргүүлэх / зогсоох' : 'Spin / pause'}
        className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-violet-300 dark:border-violet-800 text-violet-700 dark:text-violet-300 hover:border-violet-500 transition-colors"
      >
        {spinning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
      <div className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
        {mn ? 'Чирж эргүүлнэ' : 'Drag to turn'}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-3 py-3 bg-white/70 dark:bg-slate-950/70 border-t border-violet-200 dark:border-violet-900 text-xs font-bold text-slate-700 dark:text-slate-200">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          {mn ? 'Холбогч хос (холбоонд оролцоно)' : 'Bonding pair (in a bond)'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5 w-6 h-3.5 rounded-full bg-purple-400/60 ring-1 ring-purple-500 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
          </span>
          {mn ? 'Хосгүй электрон (холбоонд оролцоогүй)' : 'Lone pair (not in a bond)'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-700" />
          {mn ? 'Төв атом' : 'Central atom'}
        </span>
      </div>
      <p className="px-3 pb-3 text-[11px] text-center text-slate-500 dark:text-slate-400">
        {mn ? 'Идеал 3D хэлбэр; өнцгүүд ойролцоо.' : 'Ideal 3D shape; angles are approximate.'}
      </p>
    </div>
  );
};

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

          <Molecule3D row={row} mn={mn} />
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
