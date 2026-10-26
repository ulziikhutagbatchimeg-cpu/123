import React, { useEffect, useState } from 'react';

// Heat a substance and watch its particles. A molecular substance melts and boils when the weak forces
// BETWEEN molecules are overcome; the covalent bonds INSIDE each molecule stay intact. NaCl is not molecular:
// its ions are held by strong ionic bonds throughout the giant lattice, so it melts and boils at high temperatures.

interface Substance {
  id: string;
  label: string;
  nameEn: string;
  nameMn: string;
  molecular: boolean;
  mp: number; // °C
  bp: number; // °C
  forceEn: string;
  forceMn: string;
  noteEn: string;
  noteMn: string;
  colour: string;
  alevel?: { forceEn: string; forceMn: string; noteEn?: string; noteMn?: string };
}

const SUBSTANCES: Substance[] = [
  {
    id: 'I2',
    label: 'I₂',
    nameEn: 'Iodine',
    nameMn: 'Иод',
    molecular: true,
    mp: 113.7,
    bp: 184.3,
    forceEn: 'Weak forces between I₂ molecules (the specific type is not required)',
    forceMn: 'I₂ молекулуудын хооронд сул молекул хоорондын хүч (төрлийг нь мэдэх шаардлагагүй)',
    noteEn: 'Melting and boiling overcome only the forces between molecules. The I–I bond inside each molecule stays intact, so the vapour is still I₂.',
    noteMn: 'Хайлах, буцлах үед зөвхөн молекулуудын хоорондын хүч даван туулагдана. Молекул дотрох I–I холбоо хэвээр байх тул уур нь хэвээр I₂ байна.',
    colour: '#64748b',
    alevel: {
      forceEn: 'id-id (London dispersion) forces between I₂ molecules',
      forceMn: 'I₂ молекулуудын хооронд id-id (Лондон) хүч'
    }
  },
  {
    id: 'CH4',
    label: 'CH₄',
    nameEn: 'Methane',
    nameMn: 'Метан',
    molecular: true,
    mp: -182.5,
    bp: -161.5,
    forceEn: 'Very weak forces between CH₄ molecules',
    forceMn: 'CH₄ молекулуудын хооронд маш сул молекул хоорондын хүч',
    noteEn: 'Methane melts and boils at very low temperatures because only very weak forces are overcome. The C–H bonds stay intact.',
    noteMn: 'Метан маш нам температурт хайлж буцалдаг, учир нь маш сул хүчийг л даван туулна. C–H холбоо хэвээр үлдэнэ.',
    colour: '#0ea5e9',
    alevel: {
      forceEn: 'id-id forces between CH₄ molecules (CH₄ is non-polar, so there are no pd-pd forces)',
      forceMn: 'CH₄ молекулуудын хооронд id-id хүч (CH₄ туйлгүй тул pd-pd хүч байхгүй)'
    }
  },
  {
    id: 'H2O',
    label: 'H₂O',
    nameEn: 'Water',
    nameMn: 'Ус',
    molecular: true,
    mp: 0,
    bp: 100,
    forceEn: 'Stronger forces between water molecules, so more energy is needed to separate them',
    forceMn: 'Ус молекулуудын хооронд илүү хүчтэй молекул хоорондын хүч, тиймээс тэдгээрийг салгахад илүү энерги хэрэгтэй',
    noteEn: 'Water boils much higher than I₂ or CH₄ because the forces between its molecules are stronger. The O–H bonds inside a molecule are not broken.',
    noteMn: 'Ус I₂ болон CH₄-оос хамаагүй өндөр буцалдаг, учир нь молекулуудын хоорондох хүч илүү хүчтэй. Молекул дотрох O–H холбоо эвдэрдэггүй.',
    colour: '#06b6d4',
    alevel: {
      forceEn: 'Hydrogen bonds between H₂O molecules, a special case of pd-pd forces (only where H is bonded to N, O or F)',
      forceMn: 'H₂O молекулуудын хооронд устөрөгчийн холбоо: pd-pd хүчний онцгой тохиолдол (H нь N, O эсвэл F-тэй холбогдсон)',
      noteEn: 'Water boils much higher than I₂ or CH₄ because of the hydrogen bonds between its molecules. The O–H bonds inside a molecule are not broken.',
      noteMn: 'Ус I₂ болон CH₄-оос хамаагүй өндөр буцалдаг, учир нь молекулуудын хооронд устөрөгчийн холбоо үүсдэг. Молекул дотрох O–H холбоо эвдэрдэггүй.'
    }
  },
  {
    id: 'NaCl',
    label: 'NaCl',
    nameEn: 'Sodium chloride',
    nameMn: 'Натрийн хлорид',
    molecular: false,
    mp: 801,
    bp: 1413,
    forceEn: 'Strong ionic bonds throughout a giant lattice (there are no molecules)',
    forceMn: 'Аварга торын бүх хэсэгт хүчтэй ионы холбоо (молекул байхгүй)',
    noteEn: 'NaCl has no molecules. Melting and boiling must break the strong ionic bonds, so its temperatures are high.',
    noteMn: 'NaCl-д молекул байдаггүй. Хайлах, буцлахад хүчтэй ионы холбоог эвдэх шаардлагатай тул температур өндөр.',
    colour: '#f59e0b',
    alevel: {
      forceEn: 'Strong ionic bonds (electrostatic attraction between ions) throughout a giant lattice',
      forceMn: 'Аварга торын бүх хэсэгт ионы холбоо (ионуудын хоорондох цахилгаан статик таталцал)'
    }
  }
];

const MIN_T = -200;
const MAX_T = 1500;
const ROOM_T = 25;
const GRID = 4; // a 4 x 4 block of particles
const TICK_MS = 180;

type StateKey = 'solid' | 'liquid' | 'gas';

const stateOf = (s: Substance, t: number): StateKey => (t < s.mp ? 'solid' : t < s.bp ? 'liquid' : 'gas');

// Electrical conduction needs charged particles that can move: only the ions of a molten ionic substance
// Molecules carry no overall charge, so a molecular substance never conducts
const conductivityOf = (s: Substance, state: StateKey): { en: string; mn: string } => {
  if (s.molecular) {
    return { en: 'Poor at every temperature: molecules carry no overall charge, so there are no free ions or electrons.', mn: 'Бүх температурт муу: молекул цахилгаан цэнэггүй тул чөлөөт ион, электрон байхгүй.' };
  }
  if (state === 'liquid') {
    return { en: 'Good when molten: the ions are free to move and carry the charge.', mn: 'Хайлсан үед сайн: ионууд чөлөөтэй хөдөлж цэнэгийг зөөнө.' };
  }
  if (state === 'solid') {
    return { en: 'Poor when solid: the ions are fixed in the lattice and cannot move.', mn: 'Хатуу үед муу: ионууд торонд тогтсон тул хөдөлж чадахгүй.' };
  }
  return { en: 'Poor as a gas: there are no free ions to carry the charge.', mn: 'Хийн төлөвт муу: цэнэг зөөх чөлөөт ион байхгүй.' };
};

const STATE_LABEL: Record<StateKey, { en: string; mn: string }> = {
  solid: { en: 'Solid', mn: 'Хатуу' },
  liquid: { en: 'Liquid', mn: 'Шингэн' },
  gas: { en: 'Gas', mn: 'Хий' }
};

// Particles keep their place in a solid, slide past each other in a liquid, and fly apart in a gas
const positionOf = (i: number, state: StateKey, tick: number) => {
  const col = i % GRID;
  const row = Math.floor(i / GRID);
  const gx = 70 + col * 60;
  const gy = 45 + row * 36;
  if (state === 'solid') {
    return { x: gx + 2 * Math.sin(tick * 0.6 + i * 1.7), y: gy + 2 * Math.cos(tick * 0.5 + i * 2.3) };
  }
  if (state === 'liquid') {
    return { x: gx + 9 * Math.sin(tick * 0.4 + i * 1.7), y: gy + 9 * Math.cos(tick * 0.7 + i * 2.3) };
  }
  return {
    x: 20 + ((i * 97 + tick * (5 + (i % 5))) % 280),
    y: 20 + ((i * 53 + tick * (3 + (i % 4))) % 160)
  };
};

// Neighbouring particles in the block: the forces (or the ionic bonds) that hold them together
const neighbourPairs = (): Array<[number, number]> => {
  const pairs: Array<[number, number]> = [];
  for (let i = 0; i < GRID * GRID; i++) {
    const col = i % GRID;
    const row = Math.floor(i / GRID);
    if (col < GRID - 1) pairs.push([i, i + 1]);
    if (row < GRID - 1) pairs.push([i, i + GRID]);
  }
  return pairs;
};

const PAIRS = neighbourPairs();

export const IntermolecularSim: React.FC<{ mn: boolean; programme: 'igcse' | 'alevel' }> = ({ mn, programme }) => {
  const [substanceId, setSubstanceId] = useState<string>('H2O');
  const [t, setT] = useState<number>(ROOM_T);
  const [tick, setTick] = useState<number>(0);

  // The particles move while the simulation is open
  useEffect(() => {
    const id = window.setInterval(() => setTick(v => v + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  const s = SUBSTANCES.find(x => x.id === substanceId) ?? SUBSTANCES[0];
  // The A Level course names the forces (id-id, pd-pd, hydrogen bonding); IGCSE only needs weak forces
  const text = programme === 'alevel' && s.alevel ? { ...s, ...s.alevel } : s;
  const state = stateOf(s, t);
  const label = mn ? STATE_LABEL[state].mn : STATE_LABEL[state].en;
  const positions = Array.from({ length: GRID * GRID }, (_, i) => positionOf(i, state, tick));
  // Forces are drawn as dashes that fade as the substance melts, and vanish in a gas
  const linkOpacity = state === 'solid' ? 0.9 : state === 'liquid' ? 0.35 : 0;

  return (
    <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 sm:p-6 space-y-5 shadow-xs">
      <div className="space-y-1">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/30 text-[11px] font-mono font-bold">
          {programme === 'alevel' ? (mn ? '9701 · 3.6 дэд сэдэв' : 'Syllabus 9701 · Topic 3.6') : (mn ? 'Хөтөлбөр 2.5 · Нэмэлт 5(а)' : 'Syllabus 2.5 · Supplement 5(a)')}
        </span>
        <h3 className="text-base font-black text-slate-900 dark:text-white">
          {mn ? 'Молекул хоорондын хүч: халаахад юу болох вэ' : 'Forces between molecules: what happens when you heat it'}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {SUBSTANCES.map(x => {
          const active = x.id === s.id;
          return (
            <button
              key={x.id}
              onClick={() => setSubstanceId(x.id)}
              aria-pressed={active}
              className={`px-3.5 py-2 rounded-xl border text-sm font-black transition-all ${
                active
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
              }`}
            >
              {x.label} <span className="font-normal text-xs opacity-80">{mn ? x.nameMn : x.nameEn}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="relative">
            <span className="absolute left-3 top-3 z-10 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-950/90 border border-slate-300 dark:border-slate-700 text-xs font-black text-slate-800 dark:text-slate-100">
              {label} · {t} °C
            </span>
            <svg viewBox="0 0 320 200" className="w-full h-auto select-none" role="img" aria-label={mn ? 'Тоосонцрын хөдөлгөөн' : 'Particle motion'}>
              <rect x={0} y={0} width={320} height={200} rx={14} className="fill-white dark:fill-slate-950" />
              {PAIRS.map(([a, b], k) => {
                const pa = positions[a];
                const pb = positions[b];
                if (linkOpacity === 0) return null;
                return s.molecular ? (
                  <line
                    key={`l-${k}`}
                    x1={pa.x}
                    y1={pa.y}
                    x2={pb.x}
                    y2={pb.y}
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    opacity={linkOpacity}
                    className="stroke-slate-500 dark:stroke-slate-400"
                  />
                ) : (
                  <line
                    key={`l-${k}`}
                    x1={pa.x}
                    y1={pa.y}
                    x2={pb.x}
                    y2={pb.y}
                    strokeWidth={2.5}
                    opacity={linkOpacity}
                    className="stroke-indigo-500 dark:stroke-indigo-400"
                  />
                );
              })}
              {positions.map((p, i) => (
                <g key={`p-${i}`}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={s.molecular ? 9 : 10}
                    fill={s.molecular ? s.colour : i % 2 === 0 ? '#f59e0b' : '#22c55e'}
                    className="stroke-white dark:stroke-slate-950"
                    strokeWidth={1.5}
                  />
                  {!s.molecular && (
                    <text x={p.x} y={p.y} dy="0.35em" textAnchor="middle" className="text-[7px] font-black fill-white">
                      {i % 2 === 0 ? 'Na' : 'Cl'}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
            {s.molecular && (
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-6 border-t-2 border-dashed border-slate-500" />
                {mn ? 'Молекул хоорондын хүч' : 'Forces between molecules'}
              </span>
            )}
            {!s.molecular && (
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-6 border-t-[3px] border-indigo-500" />
                {mn ? 'Ионы холбоо (ионуудын хооронд)' : 'Ionic bonds (between ions)'}
              </span>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 block">
              {mn ? 'Температур' : 'Temperature'}: {t} °C
            </label>
            <input
              type="range"
              min={MIN_T}
              max={MAX_T}
              step={1}
              value={t}
              onChange={e => setT(Number(e.target.value))}
              className="w-full accent-emerald-600"
              aria-label={mn ? 'Температур' : 'Temperature'}
            />
            <div className="flex items-center justify-between gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <span>
                {mn ? 'Хайлах' : 'Melts'} {s.mp} °C · {mn ? 'Буцлах' : 'Boils'} {s.bp} °C
              </span>
              <button onClick={() => setT(ROOM_T)} className="font-bold text-emerald-700 dark:text-teal-300 hover:underline">
                {mn ? '25 °C-т буцаах' : 'Back to 25 °C'}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 text-xs text-sky-900 dark:text-sky-200 space-y-1.5">
            <div className="font-black">{mn ? 'Ямар хүч вэ?' : 'Which force?'}</div>
            <div>{mn ? text.forceMn : text.forceEn}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 space-y-1.5">
            <div className="font-black">{mn ? 'Цахилгаан дамжуулах чадвар' : 'Electrical conductivity'}</div>
            <div>{mn ? conductivityOf(s, state).mn : conductivityOf(s, state).en}</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs leading-relaxed text-emerald-900 dark:text-emerald-200">
            {mn ? text.noteMn : text.noteEn}
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {mn ? 'Буцлах цэгийн харьцуулалт' : 'Comparing boiling points'}
            </div>
            {SUBSTANCES.map(x => {
              const width = ((x.bp - MIN_T) / (MAX_T - MIN_T)) * 100;
              return (
                <div key={x.id} className="flex items-center gap-2 text-[11px] font-mono">
                  <span className="w-12 font-black text-slate-700 dark:text-slate-200">{x.label}</span>
                  <div className="flex-1 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.max(2, width)}%`, background: x.colour }} />
                  </div>
                  <span className="w-16 text-right text-slate-600 dark:text-slate-300">{x.bp} °C</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
