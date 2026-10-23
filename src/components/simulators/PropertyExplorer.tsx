import React, { useEffect, useMemo, useState } from 'react';
import type { PeriodicElement } from '../../data/periodicTableData';

// The colour-by modes of the periodic table, each with a graph, a simulation, and a table
export type PropertyMode = 'state' | 'electronegativity' | 'radius' | 'valence';

type StateKey = PeriodicElement['stateAtRTP'];

const PERIOD_COLOUR: Record<number, string> = {
  1: '#0ea5e9',
  2: '#10b981',
  3: '#f59e0b',
  4: '#ef4444',
  5: '#8b5cf6',
  6: '#ec4899',
  7: '#14b8a6'
};

const STATES: StateKey[] = ['solid', 'liquid', 'gas', 'unknown'];
const STATE_COLOUR: Record<StateKey, string> = { solid: '#64748b', liquid: '#0ea5e9', gas: '#10b981', unknown: '#cbd5e1' };
const STATE_LABEL: Record<StateKey, { en: string; mn: string }> = {
  solid: { en: 'Solid', mn: 'Хатуу' },
  liquid: { en: 'Liquid', mn: 'Шингэн' },
  gas: { en: 'Gas', mn: 'Хий' },
  unknown: { en: 'Unknown (predicted)', mn: 'Тодорхойгүй (тооцоолсон)' }
};

const TITLE: Record<PropertyMode, { en: string; mn: string; note: { en: string; mn: string } }> = {
  electronegativity: {
    en: 'Electronegativity (Pauling scale)',
    mn: 'Цахилгаан сөрөг чанар (Паулингийн шат)',
    note: {
      en: 'Pauling values from the Wikipedia data page. Elements with no reliable value are left out of the graph.',
      mn: 'Паулингийн утга, Wikipedia-н өгөгдлийн хүснэгтээс. Найдвартай утгагүй элементийг график дээр орхисон.'
    }
  },
  radius: {
    en: 'Calculated atomic radius (pm)',
    mn: 'Тооцоолсон атомын радиус (pm)',
    note: {
      en: 'Calculated atomic radii from the Wikipedia data page, in picometres.',
      mn: 'Wikipedia-н өгөгдлийн хүснэгтээс тооцоолсон атомын радиус, пикометрээр.'
    }
  },
  valence: {
    en: 'Outer (valence) electrons',
    mn: 'Гадаад (валент) электрон',
    note: {
      en: 'Electrons in the outermost shell, counted from the electron configuration.',
      mn: 'Хамгийн гадна бүрхүүлийн электронууд, электрон бүтцээс тоологдсон.'
    }
  },
  state: {
    en: 'State at 25 °C and 1 atm',
    mn: '25 °C, 1 атмд төлөв',
    note: {
      en: 'Standard state from the Wikipedia list of elements. Elements that are only predicted are marked unknown.',
      mn: 'Wikipedia-н элементийн жагсаалтаас стандарт төлөв. Зөвхөн тооцоолсон элементийг "тодорхойгүй" гэж тэмдэглэв.'
    }
  }
};

// The value an element has in each numeric mode, or undefined when there is none
const valueOf = (mode: PropertyMode, el: PeriodicElement): number | undefined => {
  if (mode === 'electronegativity') return el.electronegativity;
  if (mode === 'radius') return el.atomicRadiusPm;
  if (mode === 'valence') return el.electronConfig[el.electronConfig.length - 1] ?? 0;
  return undefined;
};

// Fixed axis ranges, so that two elements can be compared by eye
const AXIS = {
  electronegativity: { min: 0, max: 4, ticks: [0, 1, 2, 3, 4], unit: '' },
  radius: { min: 0, max: 300, ticks: [0, 50, 100, 150, 200, 250, 300], unit: ' pm' },
  valence: { min: 0, max: 18, ticks: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18], unit: '' }
} as const;

const W = 640;
const H = 260;
const PAD = { l: 44, r: 12, t: 12, b: 28 };
const xOf = (z: number) => PAD.l + ((z - 1) / 117) * (W - PAD.l - PAD.r);
const yOf = (v: number, min: number, max: number) => H - PAD.b - ((v - min) / (max - min)) * (H - PAD.t - PAD.b);

interface Props {
  mode: PropertyMode;
  data: PeriodicElement[];
  selectedZ: number;
  onSelect: (z: number) => void;
  mn: boolean;
}

export const PropertyExplorer: React.FC<Props> = ({ mode, data, selectedZ, onSelect, mn }) => {
  const [period, setPeriod] = useState<number | 'all'>('all');
  const [revealed, setRevealed] = useState<number>(118);
  const [playing, setPlaying] = useState(false);
  const [hoverZ, setHoverZ] = useState<number | null>(null);
  const [sortByValue, setSortByValue] = useState(false);

  // A new mode starts with every element shown
  useEffect(() => {
    setPlaying(false);
    setRevealed(118);
    setHoverZ(null);
  }, [mode]);

  // The simulation: the elements appear one at a time in order of atomic number
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setRevealed(r => Math.min(118, r + 1)), 90);
    return () => window.clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (revealed >= 118) setPlaying(false);
  }, [revealed]);

  const play = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    setRevealed(0);
    setPlaying(true);
  };

  const inPeriod = (el: PeriodicElement) => period === 'all' || el.period === period;

  // Numeric modes: the elements that have a value
  const points = useMemo(
    () =>
      data.flatMap(el => {
        const v = valueOf(mode, el);
        return v === undefined ? [] : [{ el, v }];
      }),
    [data, mode]
  );

  const axis = mode === 'state' ? null : AXIS[mode];
  const focusZ = hoverZ ?? selectedZ;
  const focus = data.find(el => el.z === focusZ);

  const stateCounts = useMemo(() => {
    const counts: Record<number, Record<StateKey, number>> = {};
    for (let p = 1; p <= 7; p++) counts[p] = { solid: 0, liquid: 0, gas: 0, unknown: 0 };
    data.forEach(el => counts[el.period][el.stateAtRTP]++);
    return counts;
  }, [data]);

  const stateTotals = useMemo(() => {
    const totals: Record<StateKey, number> = { solid: 0, liquid: 0, gas: 0, unknown: 0 };
    data.forEach(el => totals[el.stateAtRTP]++);
    return totals;
  }, [data]);

  const lowest = [...points].sort((a, b) => a.v - b.v)[0];
  const highest = [...points].sort((a, b) => b.v - a.v)[0];

  const valueText = (el: PeriodicElement) => {
    if (mode === 'state') return mn ? STATE_LABEL[el.stateAtRTP].mn : STATE_LABEL[el.stateAtRTP].en;
    const v = valueOf(mode, el);
    if (v === undefined) return mn ? 'Найдвартай утга алга' : 'No reliable value';
    return `${v}${axis ? axis.unit : ''}`;
  };

  const tableRows = useMemo(() => {
    const rows = data.filter(inPeriod).map(el => ({ el, v: valueOf(mode, el) }));
    if (sortByValue && mode !== 'state') {
      rows.sort((a, b) => (b.v ?? -1) - (a.v ?? -1));
    }
    return rows;
  }, [data, mode, period, sortByValue]);

  const title = TITLE[mode];
  const numericPoints = points.filter(p => p.el.z <= revealed);

  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-4 shadow-xs">
      <div className="space-y-1">
        <h3 className="text-sm font-black text-slate-900 dark:text-white">{mn ? title.mn : title.en}</h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{mn ? title.note.mn : title.note.en}</p>
      </div>

      {/* Period filter, and the simulation for the numeric modes */}
      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <button
          onClick={() => setPeriod('all')}
          className={`px-2.5 py-1 rounded-lg border font-bold ${period === 'all' ? 'bg-slate-900 text-white border-slate-900 dark:bg-emerald-600 dark:border-emerald-600' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
        >
          {mn ? 'Бүгд' : 'All periods'}
        </button>
        {[1, 2, 3, 4, 5, 6, 7].map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1.5 ${period === p ? 'ring-2 ring-emerald-500 bg-white dark:bg-slate-800 border-slate-400' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: PERIOD_COLOUR[p] }} />
            {mn ? `Үе ${p}` : `Period ${p}`}
          </button>
        ))}

        {mode !== 'state' && (
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={play}
              className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700"
            >
              {playing ? (mn ? 'Зогсоох' : 'Pause') : mn ? 'Тоглуулах' : 'Play'}
            </button>
            <span className="font-mono text-slate-500 dark:text-slate-400">
              Z ≤ {revealed}
            </span>
          </div>
        )}
      </div>

      {/* Graph */}
      {mode === 'state' ? (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={mn ? 'Үе тус бүрийн төлөв' : 'States by period'}>
          {[0, 8, 16, 24, 32].map(t => (
            <g key={t}>
              <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b - (t / 32) * (H - PAD.t - PAD.b)} y2={H - PAD.b - (t / 32) * (H - PAD.t - PAD.b)} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
              <text x={PAD.l - 6} y={H - PAD.b - (t / 32) * (H - PAD.t - PAD.b) + 3} textAnchor="end" fontSize="10" className="fill-slate-500">
                {t}
              </text>
            </g>
          ))}
          {[1, 2, 3, 4, 5, 6, 7].map(p => {
            const slot = (W - PAD.l - PAD.r) / 7;
            const x = PAD.l + (p - 1) * slot + slot * 0.2;
            const barW = slot * 0.6;
            let base = H - PAD.b;
            const dim = period !== 'all' && period !== p;
            return (
              <g key={p} opacity={dim ? 0.25 : 1} onClick={() => setPeriod(p)} className="cursor-pointer">
                {STATES.map(s => {
                  const n = stateCounts[p][s];
                  const h = (n / 32) * (H - PAD.t - PAD.b);
                  base -= h;
                  return <rect key={s} x={x} y={base} width={barW} height={h} fill={STATE_COLOUR[s]} />;
                })}
                <text x={x + barW / 2} y={H - 10} textAnchor="middle" fontSize="10" className="fill-slate-600 dark:fill-slate-300">
                  {mn ? `Үе ${p}` : `P${p}`}
                </text>
              </g>
            );
          })}
        </svg>
      ) : (
        axis && (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={mn ? 'Z-ээс хамаарсан график' : 'Graph against atomic number'}>
            {axis.ticks.map(t => (
              <g key={t}>
                <line x1={PAD.l} x2={W - PAD.r} y1={yOf(t, axis.min, axis.max)} y2={yOf(t, axis.min, axis.max)} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                <text x={PAD.l - 6} y={yOf(t, axis.min, axis.max) + 3} textAnchor="end" fontSize="10" className="fill-slate-500">
                  {t}
                </text>
              </g>
            ))}
            {[1, 18, 36, 54, 86, 118].map(z => (
              <text key={z} x={xOf(z)} y={H - 10} textAnchor="middle" fontSize="10" className="fill-slate-500">
                {z}
              </text>
            ))}
            {numericPoints.map(({ el, v }) => {
              const dim = period !== 'all' && el.period !== period;
              const isSel = el.z === selectedZ;
              const r = el.z === focusZ || isSel ? 6 : 4;
              return (
                <circle
                  key={el.z}
                  cx={xOf(el.z)}
                  cy={yOf(v, axis.min, axis.max)}
                  r={r}
                  fill={PERIOD_COLOUR[el.period]}
                  opacity={dim ? 0.12 : 0.95}
                  stroke={isSel ? '#0f172a' : 'none'}
                  strokeWidth={isSel ? 1.5 : 0}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoverZ(el.z)}
                  onMouseLeave={() => setHoverZ(null)}
                  onClick={() => onSelect(el.z)}
                />
              );
            })}
          </svg>
        )
      )}

      {/* What the pointer is on */}
      <p className="text-xs text-slate-700 dark:text-slate-200 min-h-[1.25rem]">
        {focus
          ? `${focus.symbol} · ${mn ? focus.nameMn : focus.nameEn} · Z ${focus.z} · ${mn ? 'Үе' : 'period'} ${focus.period} · ${valueText(focus)}`
          : mn
            ? 'Цэгийг товшвол элементийг нээнэ.'
            : 'Click a point to open the element.'}
      </p>

      {/* Summary */}
      {mode === 'state' ? (
        <div className="flex flex-wrap gap-2 text-[11px]">
          {STATES.map(s => (
            <span key={s} className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 font-mono">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: STATE_COLOUR[s] }} />
              {mn ? STATE_LABEL[s].mn : STATE_LABEL[s].en}: {stateTotals[s]}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 text-[11px] font-mono">
          {lowest && (
            <span className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
              {mn ? 'Хамгийн бага' : 'Lowest'}: {lowest.el.symbol} {lowest.v}
              {axis ? axis.unit : ''}
            </span>
          )}
          {highest && (
            <span className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
              {mn ? 'Хамгийн их' : 'Highest'}: {highest.el.symbol} {highest.v}
              {axis ? axis.unit : ''}
            </span>
          )}
          <span className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
            {mn ? 'Утгатай элемент' : 'Elements with a value'}: {points.length}
          </span>
        </div>
      )}

      {/* Table */}
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-mono text-slate-500 dark:text-slate-400">
          {tableRows.length} {mn ? 'мөр' : 'rows'}
        </span>
        {mode !== 'state' && (
          <button onClick={() => setSortByValue(s => !s)} className="font-bold text-emerald-700 dark:text-teal-400 hover:underline">
            {sortByValue ? (mn ? 'Z-ээр эрэмбэлэх' : 'Sort by Z') : mn ? 'Утгаар эрэмбэлэх' : 'Sort by value'}
          </button>
        )}
      </div>
      <div className="max-h-72 overflow-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-[11px]">
          <thead className="sticky top-0 bg-slate-50 dark:bg-slate-900 text-left text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-2 py-1.5 font-mono">Z</th>
              <th className="px-2 py-1.5">{mn ? 'Элемент' : 'Element'}</th>
              <th className="px-2 py-1.5 font-mono">{mn ? 'Үе' : 'Period'}</th>
              <th className="px-2 py-1.5 font-mono">{mn ? 'Бүлэг' : 'Group'}</th>
              <th className="px-2 py-1.5 font-mono text-right">{mode === 'state' ? (mn ? 'Төлөв' : 'State') : mn ? 'Утга' : 'Value'}</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ el }) => (
              <tr
                key={el.z}
                onClick={() => onSelect(el.z)}
                onMouseEnter={() => setHoverZ(el.z)}
                onMouseLeave={() => setHoverZ(null)}
                className={`border-t border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-800 ${el.z === selectedZ ? 'bg-emerald-50 dark:bg-slate-800' : ''}`}
              >
                <td className="px-2 py-1 font-mono">{el.z}</td>
                <td className="px-2 py-1 font-bold text-slate-900 dark:text-slate-100">
                  {el.symbol} <span className="font-normal text-slate-500 dark:text-slate-400">{mn ? el.nameMn : el.nameEn}</span>
                </td>
                <td className="px-2 py-1 font-mono">{el.period}</td>
                <td className="px-2 py-1 font-mono">{el.groupRoman === 'Transition' || el.group > 18 ? el.groupRoman : el.group}</td>
                <td className="px-2 py-1 font-mono text-right">
                  {mode === 'state' ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: STATE_COLOUR[el.stateAtRTP] }} />
                      {valueText(el)}
                    </span>
                  ) : (
                    valueText(el)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
