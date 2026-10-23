import React, { useMemo, useState } from 'react';
import { CAMBRIDGE_PERIODIC_TABLE, PeriodicElement } from '../../data/periodicTableData';

// A student activity: the student copies the values from the periodic table into a table. When the table is full the graph appears,
// then the student predicts the trend, checks it, and writes a conclusion. Every correct value and answer is worked out from the element data.

type SeriesKey = 'period2' | 'period3' | 'group1' | 'group17';
type Dir = 'increases' | 'decreases' | 'same';
type Reason = 'shells' | 'charge' | 'outer';
type Entry = { radius: string; en: string };
type CellState = 'empty' | 'ok' | 'wrong';

const SERIES: Record<SeriesKey, { en: string; mn: string; zs: number[]; kind: 'period' | 'group' }> = {
  period2: { en: 'Period 2 (Li → Ne)', mn: 'Үе 2 (Li → Ne)', zs: [3, 4, 5, 6, 7, 8, 9, 10], kind: 'period' },
  period3: { en: 'Period 3 (Na → Ar)', mn: 'Үе 3 (Na → Ar)', zs: [11, 12, 13, 14, 15, 16, 17, 18], kind: 'period' },
  group1: { en: 'Group 1 (Li → Cs)', mn: 'Бүлэг 1 (Li → Cs)', zs: [3, 11, 19, 37, 55], kind: 'group' },
  group17: { en: 'Group 17 (F → I)', mn: 'Бүлэг 17 (F → I)', zs: [9, 17, 35, 53], kind: 'group' }
};

const DIR_LABEL: Record<Dir, { en: string; mn: string }> = {
  increases: { en: 'increases', mn: 'нэмэгдэнэ' },
  decreases: { en: 'decreases', mn: 'багасна' },
  same: { en: 'stays the same', mn: 'өөрчлөгдөхгүй' }
};

const REASON_LABEL: Record<Reason, { en: string; mn: string }> = {
  shells: {
    en: 'a new electron shell is added, so the outer electrons sit further from the nucleus',
    mn: 'шинэ электрон бүрхүүл нэмэгдэж, гадна электрон цөмөөс холдоно'
  },
  charge: {
    en: 'the shell stays the same but there are more protons, so the nucleus pulls the electrons harder',
    mn: 'бүрхүүл ижил боловч протон нэмэгдэж, цөм электроныг илүү хүчтэй татна'
  },
  outer: {
    en: 'more electrons go into the outer shell, so the atom gets bigger',
    mn: 'гадна бүрхүүлд электрон нэмэгдэж атом томорно'
  }
};

// What to type when the periodic table has no value for an element
const NO_VALUE = ['-', '—', 'none', 'n/a'];

const byZ = (z: number): PeriodicElement => {
  const el = CAMBRIDGE_PERIODIC_TABLE.find(e => e.z === z);
  if (!el) throw new Error(`No element with Z = ${z}`);
  return el;
};

// The direction of a trend, from the first and the last element that have a value
const trendOf = (values: Array<number | undefined>): Dir => {
  const known = values.filter((v): v is number => v !== undefined);
  if (known.length < 2) return 'same';
  const first = known[0];
  const last = known[known.length - 1];
  if (last > first) return 'increases';
  if (last < first) return 'decreases';
  return 'same';
};

// Check one typed value against the element data
const cellState = (typed: string, expected: number | undefined, tolerance: number): CellState => {
  const text = typed.trim();
  if (text === '') return 'empty';
  if (expected === undefined) return NO_VALUE.includes(text.toLowerCase()) ? 'ok' : 'wrong';
  const value = Number(text);
  if (Number.isNaN(value)) return 'wrong';
  return Math.abs(value - expected) <= tolerance ? 'ok' : 'wrong';
};

const CELL_CLASS: Record<CellState, string> = {
  empty: 'border-slate-300 dark:border-slate-700',
  ok: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
  wrong: 'border-rose-500 bg-rose-50 dark:bg-rose-950/40'
};

interface Props {
  mn: boolean;
}

export const TrendActivity: React.FC<Props> = ({ mn }) => {
  const [series, setSeries] = useState<SeriesKey>('period3');
  const [entries, setEntries] = useState<Record<number, Entry>>({});
  const [answers, setAnswers] = useState<{ radius?: Dir; en?: Dir; reason?: Reason }>({});
  const [checked, setChecked] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [conclusion, setConclusion] = useState('');

  const info = SERIES[series];
  const els = useMemo(() => info.zs.map(byZ), [info]);

  const states = els.map(el => {
    const entry = entries[el.z] ?? { radius: '', en: '' };
    return {
      el,
      radius: cellState(entry.radius, el.atomicRadiusPm, 0),
      en: cellState(entry.en, el.electronegativity, 0.01)
    };
  });
  const filled = states.every(s => s.radius !== 'empty' && s.en !== 'empty');
  const cellsRight = states.reduce((n, s) => n + (s.radius === 'ok' ? 1 : 0) + (s.en === 'ok' ? 1 : 0), 0);

  const correct = useMemo(
    () => ({
      radius: trendOf(els.map(e => e.atomicRadiusPm)),
      en: trendOf(els.map(e => e.electronegativity)),
      reason: (info.kind === 'period' ? 'charge' : 'shells') as Reason
    }),
    [els, info.kind]
  );

  const withRadius = els.filter(e => e.atomicRadiusPm !== undefined);
  const withEn = els.filter(e => e.electronegativity !== undefined);
  const score = [answers.radius === correct.radius, answers.en === correct.en, answers.reason === correct.reason].filter(Boolean).length;
  const readyToCheck = answers.radius !== undefined && answers.en !== undefined && answers.reason !== undefined;

  const reset = (next: SeriesKey) => {
    setSeries(next);
    setEntries({});
    setAnswers({});
    setChecked(false);
    setShowModel(false);
    setConclusion('');
  };

  const setCell = (z: number, field: keyof Entry, value: string) => {
    setEntries(prev => {
      const base: Entry = prev[z] ?? { radius: '', en: '' };
      return { ...prev, [z]: { ...base, [field]: value } };
    });
  };

  const modelText = () => {
    const first = withRadius[0];
    const last = withRadius[withRadius.length - 1];
    const firstEn = withEn[0];
    const lastEn = withEn[withEn.length - 1];
    if (mn) {
      return `${info.mn}-д атомын радиус ${DIR_LABEL[correct.radius].mn}: ${first?.symbol} (${first?.atomicRadiusPm} pm) → ${last?.symbol} (${last?.atomicRadiusPm} pm). Учир нь ${REASON_LABEL[correct.reason].mn}. Цахилгаан сөрөг чанар ${DIR_LABEL[correct.en].mn}: ${firstEn?.symbol} (${firstEn?.electronegativity}) → ${lastEn?.symbol} (${lastEn?.electronegativity}).`;
    }
    return `In ${info.en}, the atomic radius ${DIR_LABEL[correct.radius].en}: ${first?.symbol} (${first?.atomicRadiusPm} pm) → ${last?.symbol} (${last?.atomicRadiusPm} pm). This is because ${REASON_LABEL[correct.reason].en}. Electronegativity ${DIR_LABEL[correct.en].en}: ${firstEn?.symbol} (${firstEn?.electronegativity}) → ${lastEn?.symbol} (${lastEn?.electronegativity}).`;
  };

  const choiceClass = (active: boolean) =>
    `px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
      active
        ? 'bg-emerald-600 text-white border-emerald-600'
        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
    }`;

  const DirChoices: React.FC<{ value?: Dir; onPick: (d: Dir) => void }> = ({ value, onPick }) => (
    <div className="flex flex-wrap gap-2">
      {(['increases', 'decreases', 'same'] as Dir[]).map(d => (
        <button key={d} disabled={checked} onClick={() => onPick(d)} className={choiceClass(value === d)}>
          {mn ? DIR_LABEL[d].mn : DIR_LABEL[d].en}
        </button>
      ))}
    </div>
  );

  return (
    <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-6 shadow-xs">
      <div className="space-y-1">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          {mn ? 'Зүй тогтлыг өөрөө олох' : 'Discover the trend yourself'}
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {mn
            ? 'Үелэх хүснэгтээс утгыг хараад хүснэгтэд бичнэ. Хүснэгт бүтэн болоход график гарч ирнэ. Дараа нь таамаглаж, шалгаад, өөрийн дүгнэлтээ бичнэ.'
            : 'Read the values on the periodic table and type them into the table. When the table is full the graph appears. Then predict, check, and write your conclusion.'}
        </p>
      </div>

      {/* Choose a series */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(SERIES) as SeriesKey[]).map(k => (
          <button key={k} onClick={() => reset(k)} className={choiceClass(series === k)}>
            {mn ? SERIES[k].mn : SERIES[k].en}
          </button>
        ))}
      </div>

      {/* Step 1: the table the student fills in */}
      <div className="space-y-3 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-black text-slate-900 dark:text-white">{mn ? '1. Хүснэгтийг бөглөх' : '1. Fill in the table'}</span>
          <span className="font-mono text-slate-500">
            {cellsRight} / {els.length * 2} {mn ? 'зөв' : 'correct'}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {mn
            ? 'Үелэх хүснэгтээс элемент бүрийн атомын радиус (pm) ба цахилгаан сөрөг чанарыг хараад бичнэ. Утга байхгүй бол "-" гэж бич.'
            : 'Look up each element\'s atomic radius (pm) and electronegativity on the periodic table and type them in. If there is no value, type "-".'}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-left text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-1.5 pr-3 font-mono">Z</th>
                <th className="py-1.5 pr-3">{mn ? 'Элемент' : 'Element'}</th>
                <th className="py-1.5 pr-3">{mn ? 'Атомын радиус (pm)' : 'Atomic radius (pm)'}</th>
                <th className="py-1.5 pr-3">{mn ? 'Цахилгаан сөрөг чанар' : 'Electronegativity'}</th>
              </tr>
            </thead>
            <tbody>
              {states.map(({ el, radius, en }) => (
                <tr key={el.z} className="border-t border-slate-200 dark:border-slate-800">
                  <td className="py-1.5 pr-3 font-mono">{el.z}</td>
                  <td className="py-1.5 pr-3 font-bold text-slate-900 dark:text-slate-100">
                    {el.symbol} <span className="font-normal text-slate-500 dark:text-slate-400">{mn ? el.nameMn : el.nameEn}</span>
                  </td>
                  <td className="py-1.5 pr-3">
                    <input
                      value={entries[el.z]?.radius ?? ''}
                      onChange={e => setCell(el.z, 'radius', e.target.value)}
                      inputMode="decimal"
                      placeholder="pm"
                      className={`w-24 rounded-lg border px-2 py-1 font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 ${CELL_CLASS[radius]}`}
                    />
                  </td>
                  <td className="py-1.5 pr-3">
                    <input
                      value={entries[el.z]?.en ?? ''}
                      onChange={e => setCell(el.z, 'en', e.target.value)}
                      inputMode="decimal"
                      placeholder="0.00"
                      className={`w-24 rounded-lg border px-2 py-1 font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 ${CELL_CLASS[en]}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Step 2: the graph, drawn from the table once it is full */}
      {filled ? (
        <div className="space-y-2 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="text-xs font-black text-slate-900 dark:text-white">{mn ? '2. Таны хүснэгтээс график' : '2. Graph from your table'}</div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-sky-500" />{mn ? 'Атомын радиус (pm)' : 'Atomic radius (pm)'}</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" />{mn ? 'Цахилгаан сөрөг чанар' : 'Electronegativity'}</span>
          </div>
          <svg viewBox="0 0 640 220" className="w-full h-auto">
            {states.map(({ el, radius, en }, i) => {
              const x = 40 + (i * 560) / Math.max(1, els.length - 1);
              const typedR = Number(entries[el.z]?.radius);
              const typedE = Number(entries[el.z]?.en);
              const barH = Number.isFinite(typedR) && entries[el.z]?.radius.trim() !== '' ? (typedR / 300) * 150 : 0;
              return (
                <g key={el.z}>
                  <rect x={x - 10} y={180 - barH} width={20} height={Math.max(0, barH)} fill={radius === 'wrong' ? '#f43f5e' : '#0ea5e9'} opacity={0.85} />
                  {Number.isFinite(typedE) && entries[el.z]?.en.trim() !== '' && (
                    <circle cx={x} cy={180 - (typedE / 4) * 150} r={5} fill={en === 'wrong' ? '#f43f5e' : '#f59e0b'} />
                  )}
                  <text x={x} y={200} textAnchor="middle" fontSize="11" className="fill-slate-600 dark:fill-slate-300">
                    {el.symbol}
                  </text>
                </g>
              );
            })}
            <line x1={30} x2={610} y1={180} y2={180} stroke="#94a3b8" />
          </svg>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {mn ? 'Улаан цэг эсвэл баганы утга буруу бичигдсэн байна.' : 'A red bar or point means that value was typed wrongly.'}
          </p>
        </div>
      ) : (
        <p className="text-xs text-slate-500">
          {mn ? 'Хүснэгтийг бүтэн бөглөхөд график энд гарна.' : 'The graph appears here once the table is full.'}
        </p>
      )}

      {/* Step 3: predict, unlocked once the table is full */}
      <div className={`space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 ${filled ? '' : 'opacity-50'}`}>
        <div className="text-xs font-black text-slate-900 dark:text-white">{mn ? '3. Таамаглал' : '3. Predict'}</div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {mn ? `Атомын радиус ${info.kind === 'period' ? 'үед зүүнээс баруун тийш' : 'бүлэгт дээрээс доош'} ...` : `The atomic radius, ${info.kind === 'period' ? 'left to right' : 'down the group'}, ...`}
          </p>
          <DirChoices value={answers.radius} onPick={d => setAnswers(a => ({ ...a, radius: d }))} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {mn ? `Цахилгаан сөрөг чанар ${info.kind === 'period' ? 'үед зүүнээс баруун тийш' : 'бүлэгт дээрээс доош'} ...` : `Electronegativity, ${info.kind === 'period' ? 'left to right' : 'down the group'}, ...`}
          </p>
          <DirChoices value={answers.en} onPick={d => setAnswers(a => ({ ...a, en: d }))} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{mn ? 'Учир нь ...' : 'Because ...'}</p>
          <div className="flex flex-col gap-2">
            {(['shells', 'charge', 'outer'] as Reason[]).map(r => (
              <button key={r} disabled={checked} onClick={() => setAnswers(a => ({ ...a, reason: r }))} className={`text-left ${choiceClass(answers.reason === r)}`}>
                {mn ? REASON_LABEL[r].mn : REASON_LABEL[r].en}
              </button>
            ))}
          </div>
        </div>
        {!checked && (
          <button
            disabled={!filled || !readyToCheck}
            onClick={() => setChecked(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black disabled:opacity-40"
          >
            {mn ? 'Шалгах' : 'Check'}
          </button>
        )}
      </div>

      {/* Step 4: the result and the student's own conclusion */}
      {checked && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2">
            <div className="text-xs font-black text-slate-900 dark:text-white">
              {mn ? '4. Үр дүн' : '4. Result'}: {score} / 3
            </div>
            <ul className="text-xs space-y-1">
              <li>{answers.radius === correct.radius ? '✔' : '✘'} {mn ? 'Атомын радиус' : 'Atomic radius'}: {mn ? DIR_LABEL[correct.radius].mn : DIR_LABEL[correct.radius].en}</li>
              <li>{answers.en === correct.en ? '✔' : '✘'} {mn ? 'Цахилгаан сөрөг чанар' : 'Electronegativity'}: {mn ? DIR_LABEL[correct.en].mn : DIR_LABEL[correct.en].en}</li>
              <li>{answers.reason === correct.reason ? '✔' : '✘'} {mn ? 'Учир нь' : 'Because'}: {mn ? REASON_LABEL[correct.reason].mn : REASON_LABEL[correct.reason].en}</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 text-xs text-slate-800 dark:text-slate-100 leading-relaxed">
            <div className="font-black mb-1">{mn ? 'Зөв үр дүн' : 'The correct result'}</div>
            {modelText()}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-900 dark:text-white">{mn ? '5. Өөрийн дүгнэлт' : '5. Your conclusion'}</label>
            <textarea
              value={conclusion}
              onChange={e => setConclusion(e.target.value)}
              rows={4}
              placeholder={mn ? 'Энэ зүй тогтлыг өөрийн үгээр бич...' : 'Write the trend in your own words...'}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button onClick={() => setShowModel(s => !s)} className={choiceClass(showModel)}>
              {mn ? 'Загвар дүгнэлтийг харах' : 'Show a model conclusion'}
            </button>
            {showModel && <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{modelText()}</p>}
          </div>

          <button onClick={() => reset(series)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
            {mn ? 'Дахин оролдох' : 'Try again'}
          </button>
        </div>
      )}
    </section>
  );
};
