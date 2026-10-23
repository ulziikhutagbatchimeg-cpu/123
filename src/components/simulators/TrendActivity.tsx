import React, { useMemo, useState } from 'react';
import { CAMBRIDGE_PERIODIC_TABLE, PeriodicElement } from '../../data/periodicTableData';

// A student activity that follows the steps of scientific inquiry:
// question → collect data → hypothesis → analyse the data → conclusion → evaluate.
// Each answer is checked at once, and a step opens only when the step before it is right.
// Every correct value and answer is worked out from the element data.

type SeriesKey = 'period2' | 'period3' | 'group1' | 'group17';
type Dir = 'increases' | 'decreases' | 'same';
type Reason = 'shells' | 'charge' | 'outer';
type Entry = { radius: string; en: string };
type Answers = { radius?: Dir; en?: Dir; reason?: Reason };
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

const choiceClass = (active: boolean, tone: 'neutral' | 'right' | 'wrong' = 'neutral') => {
  if (tone === 'right') return 'px-3 py-1.5 rounded-xl border text-xs font-bold bg-emerald-600 text-white border-emerald-600';
  if (tone === 'wrong') return 'px-3 py-1.5 rounded-xl border text-xs font-bold bg-rose-500 text-white border-rose-500';
  return `px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
    active
      ? 'bg-emerald-600 text-white border-emerald-600'
      : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
  }`;
};

// A choice shows at once whether it is right, once the step asks for a check
const ChoiceRow = <T extends string>({
  options,
  value,
  correctValue,
  labelOf,
  onPick,
  showCheck
}: {
  options: T[];
  value?: T;
  correctValue: T;
  labelOf: (v: T) => string;
  onPick: (v: T) => void;
  showCheck: boolean;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map(o => {
      const isPicked = value === o;
      const tone = showCheck && isPicked ? (o === correctValue ? 'right' : 'wrong') : 'neutral';
      return (
        <button key={o} onClick={() => onPick(o)} className={choiceClass(isPicked, tone)}>
          {labelOf(o)}
        </button>
      );
    })}
  </div>
);


const StepCard: React.FC<{ mn: boolean; n: number; title: string; done: boolean; open: boolean; children: React.ReactNode }> = ({ mn, n, title, done, open, children }) => (
  <div className={`space-y-3 rounded-2xl border p-4 ${open ? 'border-slate-200 dark:border-slate-800' : 'border-dashed border-slate-300 dark:border-slate-700 opacity-60'}`}>
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-black text-slate-900 dark:text-white">
        {n}. {title}
      </span>
      <span className={`text-[11px] font-bold ${done ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
        {done ? (mn ? '✔ Дууссан' : '✔ Done') : open ? (mn ? 'Одоо хийнэ' : 'Your turn') : mn ? 'Түгжээтэй' : 'Locked'}
      </span>
    </div>
    {open && children}
  </div>
);


interface Props {
  mn: boolean;
}

export const TrendActivity: React.FC<Props> = ({ mn }) => {
  const [series, setSeries] = useState<SeriesKey>('period3');
  const [entries, setEntries] = useState<Record<number, Entry>>({});
  const [hypo, setHypo] = useState<Answers>({});
  const [analysis, setAnalysis] = useState<{ radius: string; en: string }>({ radius: '', en: '' });
  const [concl, setConcl] = useState<Answers>({});
  const [reflection, setReflection] = useState('');

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
  const firstR = withRadius[0];
  const lastR = withRadius[withRadius.length - 1];
  const firstE = withEn[0];
  const lastE = withEn[withEn.length - 1];
  const radiusChange = (lastR.atomicRadiusPm ?? 0) - (firstR.atomicRadiusPm ?? 0);
  const enChange = Math.round(((lastE.electronegativity ?? 0) - (firstE.electronegativity ?? 0)) * 100) / 100;

  // Analysis: the student works out the change from the first and the last value
  const typedRadiusChange = analysis.radius.trim() === '' ? undefined : Number(analysis.radius);
  const typedEnChange = analysis.en.trim() === '' ? undefined : Number(analysis.en);
  const analysisState = {
    radius: typedRadiusChange === undefined ? 'empty' : typedRadiusChange === radiusChange ? 'ok' : 'wrong',
    en: typedEnChange === undefined ? 'empty' : Math.abs(typedEnChange - enChange) <= 0.01 ? 'ok' : 'wrong'
  } as const;

  const hypoDone = hypo.radius !== undefined && hypo.en !== undefined && hypo.reason !== undefined;
  const analysisDone = analysisState.radius === 'ok' && analysisState.en === 'ok';
  const conclDone = concl.radius === correct.radius && concl.en === correct.en && concl.reason === correct.reason;

  const reset = (next: SeriesKey) => {
    setSeries(next);
    setEntries({});
    setHypo({});
    setAnalysis({ radius: '', en: '' });
    setConcl({});
    setReflection('');
  };

  const setCell = (z: number, field: keyof Entry, value: string) => {
    setEntries(prev => {
      const base: Entry = prev[z] ?? { radius: '', en: '' };
      return { ...prev, [z]: { ...base, [field]: value } };
    });
  };

  const modelText = () => {
    if (mn) {
      return `${info.mn}-д атомын радиус ${DIR_LABEL[correct.radius].mn}: ${firstR.symbol} (${firstR.atomicRadiusPm} pm) → ${lastR.symbol} (${lastR.atomicRadiusPm} pm). Учир нь ${REASON_LABEL[correct.reason].mn}. Цахилгаан сөрөг чанар ${DIR_LABEL[correct.en].mn}: ${firstE.symbol} (${firstE.electronegativity}) → ${lastE.symbol} (${lastE.electronegativity}).`;
    }
    return `In ${info.en}, the atomic radius ${DIR_LABEL[correct.radius].en}: ${firstR.symbol} (${firstR.atomicRadiusPm} pm) → ${lastR.symbol} (${lastR.atomicRadiusPm} pm). This is because ${REASON_LABEL[correct.reason].en}. Electronegativity ${DIR_LABEL[correct.en].en}: ${firstE.symbol} (${firstE.electronegativity}) → ${lastE.symbol} (${lastE.electronegativity}).`;
  };

  const dirOptions: Dir[] = ['increases', 'decreases', 'same'];
  const reasonOptions: Reason[] = ['shells', 'charge', 'outer'];
  const dirLabel = (d: Dir) => (mn ? DIR_LABEL[d].mn : DIR_LABEL[d].en);
  const reasonLabel = (r: Reason) => (mn ? REASON_LABEL[r].mn : REASON_LABEL[r].en);

  return (
    <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-5 shadow-xs">
      <div className="space-y-1">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          {mn ? 'Зүй тогтлыг шинжлэх ухааны аргаар олох' : 'Find the trend the scientific way'}
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {mn
            ? 'Асуулт → өгөгдөл → таамаглал → шинжилгээ → дүгнэлт → үнэлгээ. Алхам бүрийг тэр дор нь шалгана, дараагийн алхам зөв хариултаас хойш нээгдэнэ.'
            : 'Question → data → hypothesis → analysis → conclusion → evaluation. Each step is checked at once, and the next one opens when the one before is right.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(SERIES) as SeriesKey[]).map(k => (
          <button key={k} onClick={() => reset(k)} className={choiceClass(series === k)}>
            {mn ? SERIES[k].mn : SERIES[k].en}
          </button>
        ))}
      </div>

      {/* 1. The question */}
      <StepCard mn={mn} n={1} title={mn ? 'Асуулт' : 'Question'} done open>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
          {mn
            ? `${info.mn} дээр атомын радиус болон цахилгаан сөрөг чанар ${info.kind === 'period' ? 'зүүнээс баруун тийш' : 'бүлгийн доош'} хэрхэн өөрчлөгдөх вэ?`
            : `How do the atomic radius and electronegativity change ${info.kind === 'period' ? 'from left to right' : 'down the group'} in ${info.en}?`}
        </p>
      </StepCard>

      {/* 2. Collect data: the table, and the graph once it is full */}
      <StepCard mn={mn} n={2} title={mn ? 'Өгөгдөл цуглуулах' : 'Collect data'} done={filled} open>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {mn
            ? 'Үелэх хүснэгтээс утгыг хараад бичнэ. Утга байхгүй бол "-" гэж бич.'
            : 'Look up each value on the periodic table and type it in. If there is no value, type "-".'}
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
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
          <span>
            {cellsRight} / {els.length * 2} {mn ? 'зөв' : 'correct'}
          </span>
        </div>
        {filled ? (
          <svg viewBox="0 0 640 220" className="w-full h-auto">
            {states.map(({ el, radius, en }, i) => {
              const x = 40 + (i * 560) / Math.max(1, els.length - 1);
              const typedR = Number(entries[el.z]?.radius);
              const typedE = Number(entries[el.z]?.en);
              const hasR = (entries[el.z]?.radius ?? '').trim() !== '' && Number.isFinite(typedR);
              const hasE = (entries[el.z]?.en ?? '').trim() !== '' && Number.isFinite(typedE);
              const barH = hasR ? (typedR / 300) * 150 : 0;
              return (
                <g key={el.z}>
                  <rect x={x - 10} y={180 - barH} width={20} height={Math.max(0, barH)} fill={radius === 'wrong' ? '#f43f5e' : '#0ea5e9'} opacity={0.85} />
                  {hasE && <circle cx={x} cy={180 - (typedE / 4) * 150} r={5} fill={en === 'wrong' ? '#f43f5e' : '#f59e0b'} />}
                  <text x={x} y={200} textAnchor="middle" fontSize="11" className="fill-slate-600 dark:fill-slate-300">
                    {el.symbol}
                  </text>
                </g>
              );
            })}
            <line x1={30} x2={610} y1={180} y2={180} stroke="#94a3b8" />
          </svg>
        ) : (
          <p className="text-[11px] text-slate-500">{mn ? 'Хүснэгтийг бүтэн бөглөхөд график энд гарна.' : 'The graph appears here once the table is full.'}</p>
        )}
        {filled && (
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-sky-500" />{mn ? 'Атомын радиус' : 'Atomic radius'}</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" />{mn ? 'Цахилгаан сөрөг чанар' : 'Electronegativity'}</span>
            <span className="text-rose-500">{mn ? 'Улаан = буруу утга' : 'Red = wrong value'}</span>
          </div>
        )}
      </StepCard>

      {/* 3. Hypothesis */}
      <StepCard mn={mn} n={3} title={mn ? 'Таамаглал' : 'Hypothesis'} done={hypoDone} open={filled}>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {mn ? 'Өгөгдлийг харахаас өмнө та юу гэж бодож байна вэ? Таамаглалаа сонго.' : 'Before you analyse, what do you think will happen? Choose your hypothesis.'}
        </p>
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{mn ? 'Атомын радиус ...' : 'The atomic radius ...'}</p>
          <ChoiceRow options={dirOptions} value={hypo.radius} correctValue={correct.radius} labelOf={dirLabel} onPick={d => setHypo(h => ({ ...h, radius: d }))} showCheck={false} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{mn ? 'Цахилгаан сөрөг чанар ...' : 'Electronegativity ...'}</p>
          <ChoiceRow options={dirOptions} value={hypo.en} correctValue={correct.en} labelOf={dirLabel} onPick={d => setHypo(h => ({ ...h, en: d }))} showCheck={false} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{mn ? 'Учир нь ...' : 'Because ...'}</p>
          <div className="flex flex-col gap-2">
            {reasonOptions.map(r => (
              <button key={r} onClick={() => setHypo(h => ({ ...h, reason: r }))} className={`text-left ${choiceClass(hypo.reason === r)}`}>
                {reasonLabel(r)}
              </button>
            ))}
          </div>
        </div>
      </StepCard>

      {/* 4. Analysis: work out the change from the table */}
      <StepCard mn={mn} n={4} title={mn ? 'Өгөгдөл шинжлэх' : 'Analyse the data'} done={analysisDone} open={hypoDone}>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {mn
            ? `Хамгийн эхний утгаас хамгийн сүүлийн утгыг хас: ${firstR.symbol} → ${lastR.symbol} (радиус), ${firstE.symbol} → ${lastE.symbol} (сөрөг чанар).`
            : `Subtract the first value from the last one: ${firstR.symbol} → ${lastR.symbol} (radius), ${firstE.symbol} → ${lastE.symbol} (electronegativity).`}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {mn ? 'Радиусын өөрчлөлт (pm)' : 'Change in radius (pm)'} = {lastR.atomicRadiusPm} − {firstR.atomicRadiusPm}
            </span>
            <input
              value={analysis.radius}
              onChange={e => setAnalysis(a => ({ ...a, radius: e.target.value }))}
              inputMode="decimal"
              placeholder="?"
              className={`w-full rounded-lg border px-2 py-1.5 font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 ${CELL_CLASS[analysisState.radius]}`}
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {mn ? 'Сөрөг чанарын өөрчлөлт' : 'Change in electronegativity'} = {lastE.electronegativity} − {firstE.electronegativity}
            </span>
            <input
              value={analysis.en}
              onChange={e => setAnalysis(a => ({ ...a, en: e.target.value }))}
              inputMode="decimal"
              placeholder="?"
              className={`w-full rounded-lg border px-2 py-1.5 font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 ${CELL_CLASS[analysisState.en]}`}
            />
          </label>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {mn ? 'Хасах үед + эсвэл − тэмдгийг анхаараарай: сөрөг тоо гарвал утга буурсан гэсэн үг.' : 'Watch the sign: a negative result means the value went down.'}
        </p>
      </StepCard>

      {/* 5. Conclusion: a sentence built from the answers, each part checked at once */}
      <StepCard mn={mn} n={5} title={mn ? 'Дүгнэлт' : 'Conclusion'} done={conclDone} open={analysisDone}>
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{mn ? 'Атомын радиус ...' : 'The atomic radius ...'}</p>
          <ChoiceRow options={dirOptions} value={concl.radius} correctValue={correct.radius} labelOf={dirLabel} onPick={d => setConcl(c => ({ ...c, radius: d }))} showCheck />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{mn ? 'Цахилгаан сөрөг чанар ...' : 'Electronegativity ...'}</p>
          <ChoiceRow options={dirOptions} value={concl.en} correctValue={correct.en} labelOf={dirLabel} onPick={d => setConcl(c => ({ ...c, en: d }))} showCheck />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{mn ? 'Учир нь ...' : 'Because ...'}</p>
          <div className="flex flex-col gap-2">
            {reasonOptions.map(r => {
              const tone = concl.reason === r ? (r === correct.reason ? 'right' : 'wrong') : 'neutral';
              return (
                <button key={r} onClick={() => setConcl(c => ({ ...c, reason: r }))} className={`text-left ${choiceClass(concl.reason === r, tone)}`}>
                  {reasonLabel(r)}
                </button>
              );
            })}
          </div>
        </div>
      </StepCard>

      {/* 6. Evaluate: compare the hypothesis with the data, then reflect */}
      <StepCard mn={mn} n={6} title={mn ? 'Үнэлгээ' : 'Evaluate'} done={conclDone && reflection.trim() !== ''} open={conclDone}>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-2 text-xs">
          <div className="font-black text-slate-900 dark:text-white">
            {mn ? 'Таны таамаглал ба өгөгдөл' : 'Your hypothesis against the data'}
          </div>
          <div>
            {hypo.radius === correct.radius ? '✔' : '✘'} {mn ? 'Атомын радиус' : 'Atomic radius'}: {mn ? 'таамаглал' : 'hypothesis'} {hypo.radius ? dirLabel(hypo.radius) : '—'}, {mn ? 'өгөгдөл' : 'data'} {dirLabel(correct.radius)}
          </div>
          <div>
            {hypo.en === correct.en ? '✔' : '✘'} {mn ? 'Цахилгаан сөрөг чанар' : 'Electronegativity'}: {mn ? 'таамаглал' : 'hypothesis'} {hypo.en ? dirLabel(hypo.en) : '—'}, {mn ? 'өгөгдөл' : 'data'} {dirLabel(correct.en)}
          </div>
          <div>
            {hypo.reason === correct.reason ? '✔' : '✘'} {mn ? 'Учир нь' : 'Because'}: {hypo.reason === correct.reason ? (mn ? 'таамаглал зөв' : 'the hypothesis was right') : mn ? 'таамаглал буруу' : 'the hypothesis was wrong'}
          </div>
        </div>
        <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3 text-xs text-slate-800 dark:text-slate-100 leading-relaxed">
          <div className="font-black mb-1">{mn ? 'Зөв үр дүн' : 'The correct result'}</div>
          {modelText()}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {mn ? 'Юу сурав? Таамаглал буруу байсан бол яагаад гэдгийг бич.' : 'What did you learn? If your hypothesis was wrong, why?'}
          </label>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            rows={3}
            placeholder={mn ? 'Өөрийн үгээр бич...' : 'Write in your own words...'}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </StepCard>

      {(hypoDone || analysisDone || conclDone) && (
        <button onClick={() => reset(series)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
          {mn ? 'Дахин эхлэх' : 'Start again'}
        </button>
      )}
    </section>
  );
};
