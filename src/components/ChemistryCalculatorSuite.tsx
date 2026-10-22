import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CAMBRIDGE_PERIODIC_TABLE } from '../data/periodicTableData';
import {
  Atom,
  Scale,
  Wind,
  Beaker,
  FlaskConical,
  Percent,
  Sigma,
  Ruler,
  Flame,
  Calculator,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Chemistry helpers
// ---------------------------------------------------------------------------

/** Relative atomic masses exactly as printed on the Cambridge 0620 data sheet. */
const AR: Record<string, number> = Object.fromEntries(
  CAMBRIDGE_PERIODIC_TABLE.filter(e => !Number.isNaN(parseFloat(e.atomicMass))).map(e => [
    e.symbol,
    parseFloat(e.atomicMass)
  ])
);

const ELEMENT_NAMES: Record<string, { en: string; mn: string }> = Object.fromEntries(
  CAMBRIDGE_PERIODIC_TABLE.map(e => [e.symbol, { en: e.nameEn, mn: e.nameMn }])
);

const MOLAR_GAS_VOLUME = 24; // dm³/mol at r.t.p.

const SUBSCRIPT_DIGITS = '₀₁₂₃₄₅₆₇₈₉';

const toSubscript = (s: string) => s.replace(/\d/g, d => SUBSCRIPT_DIGITS[Number(d)]);

const normaliseFormula = (raw: string) =>
  raw
    .trim()
    .replace(/[₀-₉]/g, c => String(SUBSCRIPT_DIGITS.indexOf(c)))
    .replace(/[·•∙*]/g, '.')
    .replace(/\s+/g, '');

type Composition = Record<string, number>;

class FormulaError extends Error {}

/** Parses formulae such as CuSO4.5H2O, Ca(OH)2, (NH4)2SO4 or Fe2(SO4)3 into atom counts. */
const parseFormula = (raw: string): Composition => {
  const formula = normaliseFormula(raw);
  if (!formula) throw new FormulaError('empty');

  const total: Composition = {};
  for (const part of formula.split('.')) {
    if (!part) throw new FormulaError('syntax');
    const coeffMatch = part.match(/^(\d+)(.*)$/);
    const coeff = coeffMatch ? parseInt(coeffMatch[1], 10) : 1;
    const body = coeffMatch ? coeffMatch[2] : part;

    let i = 0;
    const readNumber = () => {
      let digits = '';
      while (i < body.length && /\d/.test(body[i])) digits += body[i++];
      return digits ? parseInt(digits, 10) : 1;
    };
    const parseGroup = (closing?: string): Composition => {
      const comp: Composition = {};
      const add = (sym: string, n: number) => (comp[sym] = (comp[sym] ?? 0) + n);
      while (i < body.length) {
        const ch = body[i];
        if (ch === '(' || ch === '[') {
          i++;
          const inner = parseGroup(ch === '(' ? ')' : ']');
          const mult = readNumber();
          for (const [s, n] of Object.entries(inner)) add(s, n * mult);
        } else if (ch === ')' || ch === ']') {
          if (ch !== closing) throw new FormulaError('brackets');
          i++;
          return comp;
        } else if (/[A-Z]/.test(ch)) {
          let sym = ch;
          i++;
          while (i < body.length && /[a-z]/.test(body[i])) sym += body[i++];
          if (!(sym in AR)) throw new FormulaError(`unknown:${sym}`);
          add(sym, readNumber());
        } else {
          throw new FormulaError('syntax');
        }
      }
      if (closing) throw new FormulaError('brackets');
      return comp;
    };

    const comp = parseGroup();
    if (Object.keys(comp).length === 0) throw new FormulaError('syntax');
    for (const [s, n] of Object.entries(comp)) total[s] = (total[s] ?? 0) + n * coeff;
  }
  return total;
};

const formulaMass = (comp: Composition) =>
  Object.entries(comp).reduce((sum, [s, n]) => sum + AR[s] * n, 0);

/** Returns Mr for a formula, or null if it cannot be parsed. */
const tryMr = (formula: string): number | null => {
  try {
    return formulaMass(parseFormula(formula));
  } catch {
    return null;
  }
};

/** Cambridge mark schemes expect 3 significant figures unless told otherwise. */
const sf3 = (x: number) => {
  if (!Number.isFinite(x)) return '—';
  if (x === 0) return '0';
  return String(Number(x.toPrecision(3)));
};

const num = (s: string) => {
  const v = parseFloat(s);
  return Number.isFinite(v) ? v : NaN;
};

// ---------------------------------------------------------------------------
// Small UI building blocks
// ---------------------------------------------------------------------------

const inputClass =
  'w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-amber-500';

const Field: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  placeholder?: string;
  type?: 'number' | 'text';
}> = ({ label, value, onChange, unit, placeholder, type = 'number' }) => (
  <label className="space-y-1.5 block">
    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
      {label}
      {unit && <span className="text-slate-400 font-normal"> ({unit})</span>}
    </span>
    <input
      type={type}
      step="any"
      inputMode={type === 'number' ? 'decimal' : undefined}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      className={inputClass}
    />
  </label>
);

const Result: React.FC<{ label: string; value: string; unit?: string; working?: string; tone?: 'amber' | 'teal' | 'cyan' | 'rose' }> = ({
  label,
  value,
  unit,
  working,
  tone = 'amber'
}) => {
  const tones = {
    amber: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200',
    teal: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60 text-teal-900 dark:text-teal-200',
    cyan: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/60 text-cyan-900 dark:text-cyan-200',
    rose: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200'
  };
  return (
    <div className={`p-4 rounded-2xl border space-y-1 ${tones[tone]}`}>
      <div className="text-[11px] font-mono font-bold uppercase opacity-80">{label}</div>
      <div className="text-2xl font-mono font-extrabold break-all">
        {value}
        {unit && value !== '—' && <span className="text-base font-bold"> {unit}</span>}
      </div>
      {working && <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 break-words">{working}</div>}
    </div>
  );
};

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{children}</p>
);

const SegButtons = <T extends string>({
  options,
  value,
  onChange
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) => (
  <div className="inline-flex flex-wrap p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold gap-1">
    {options.map(o => (
      <button
        key={o.id}
        onClick={() => onChange(o.id)}
        className={`px-3 py-1.5 rounded-lg transition-colors ${
          value === o.id ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        {o.label}
      </button>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Individual calculators
// ---------------------------------------------------------------------------

const FORMULA_PRESETS = ['H2O', 'CO2', 'NaCl', 'CaCO3', 'H2SO4', 'Ca(OH)2', '(NH4)2SO4', 'CuSO4.5H2O', 'C6H12O6', 'Fe2(SO4)3'];

const MrCalculator: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [formula, setFormula] = useState('CuSO4.5H2O');

  const parsed = useMemo(() => {
    try {
      const comp = parseFormula(formula);
      return { comp, mr: formulaMass(comp), error: null as string | null };
    } catch (e) {
      const code = e instanceof FormulaError ? e.message : 'syntax';
      let error: string;
      if (code === 'empty') error = mn ? 'Томьёо оруулна уу.' : 'Enter a formula.';
      else if (code.startsWith('unknown:'))
        error = mn ? `"${code.slice(8)}" гэсэн элемент байхгүй. Том, жижиг үсгээ шалгана уу (жишээ нь Co ба CO).` : `Unknown element "${code.slice(8)}". Check capital letters (e.g. Co vs CO).`;
      else if (code === 'brackets') error = mn ? 'Хаалт таарахгүй байна.' : 'Brackets do not match.';
      else error = mn ? 'Томьёог уншиж чадсангүй.' : 'Could not read this formula.';
      return { comp: null, mr: NaN, error };
    }
  }, [formula, mn]);

  return (
    <div className="space-y-4">
      <Field
        type="text"
        label={mn ? 'Химийн томьёо' : 'Chemical formula'}
        value={formula}
        onChange={setFormula}
        placeholder="CuSO4.5H2O"
      />
      <div className="flex flex-wrap gap-1.5">
        {FORMULA_PRESETS.map(f => (
          <button
            key={f}
            onClick={() => setFormula(f)}
            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          >
            {toSubscript(f).replace('.', '·')}
          </button>
        ))}
      </div>
      <Note>
        {mn
          ? 'Талст ус: CuSO4.5H2O эсвэл CuSO4·5H2O. Хаалт: Ca(OH)2. Том, жижиг үсгийг зөв бичнэ үү. Ar утгууд Кэмбрижийн 0620 өгөгдлийн хүснэгтээс.'
          : 'Water of crystallisation: CuSO4.5H2O or CuSO4·5H2O. Brackets: Ca(OH)2. Use correct capitals. Ar values from the Cambridge 0620 data sheet.'}
      </Note>

      {parsed.error ? (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-sm text-rose-700 dark:text-rose-300">
          {parsed.error}
        </div>
      ) : (
        parsed.comp && (
          <>
            <Result
              label={mn ? 'Харьцангуй молекул масс, Mᵣ' : 'Relative formula mass, Mᵣ'}
              value={String(Number(parsed.mr.toFixed(2)))}
              working={Object.entries(parsed.comp)
                .map(([s, n]) => `${n > 1 ? `${n}×` : ''}${AR[s]} (${s})`)
                .join(' + ')}
            />
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs font-mono">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500">
                  <tr>
                    <th className="text-left px-3 py-2">{mn ? 'Элемент' : 'Element'}</th>
                    <th className="text-right px-3 py-2">{mn ? 'Атомын тоо' : 'Atoms'}</th>
                    <th className="text-right px-3 py-2">Aᵣ</th>
                    <th className="text-right px-3 py-2">{mn ? 'Масс' : 'Mass'}</th>
                    <th className="text-right px-3 py-2">{mn ? 'Массын %' : '% by mass'}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(parsed.comp).map(([s, n]) => (
                    <tr key={s} className="border-t border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                      <td className="px-3 py-2">
                        <span className="font-bold">{s}</span>{' '}
                        <span className="text-slate-400">{mn ? ELEMENT_NAMES[s]?.mn : ELEMENT_NAMES[s]?.en}</span>
                      </td>
                      <td className="text-right px-3 py-2">{n}</td>
                      <td className="text-right px-3 py-2">{AR[s]}</td>
                      <td className="text-right px-3 py-2">{Number((AR[s] * n).toFixed(2))}</td>
                      <td className="text-right px-3 py-2 font-bold">{sf3((AR[s] * n * 100) / parsed.mr)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      )}
    </div>
  );
};

/** Mr input that can be filled automatically from a formula. */
const MrInput: React.FC<{ mn: boolean; mr: string; setMr: (v: string) => void }> = ({ mn, mr, setMr }) => {
  const [formula, setFormula] = useState('');
  const auto = formula ? tryMr(formula) : null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field
        type="text"
        label={mn ? 'Томьёо (заавал биш)' : 'Formula (optional)'}
        value={formula}
        placeholder="CaCO3"
        onChange={v => {
          setFormula(v);
          const m = tryMr(v);
          if (m !== null) setMr(String(Number(m.toFixed(2))));
        }}
      />
      <Field label="Mᵣ" unit="g/mol" value={mr} onChange={setMr} />
      {formula && auto === null && (
        <span className="text-[11px] text-rose-500 sm:col-span-2">{mn ? 'Томьёо буруу байна — Mᵣ-ийг гараар оруулна уу.' : 'Formula not recognised — type Mᵣ by hand.'}</span>
      )}
    </div>
  );
};

const MolesCalculator: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [find, setFind] = useState<'n' | 'm' | 'mr'>('n');
  const [m, setM] = useState('10');
  const [mr, setMr] = useState('100');
  const [n, setN] = useState('0.5');

  let result = NaN;
  let working = '';
  if (find === 'n') {
    result = num(m) / num(mr);
    working = `n = m ÷ Mᵣ = ${m} ÷ ${mr}`;
  } else if (find === 'm') {
    result = num(n) * num(mr);
    working = `m = n × Mᵣ = ${n} × ${mr}`;
  } else {
    result = num(m) / num(n);
    working = `Mᵣ = m ÷ n = ${m} ÷ ${n}`;
  }

  return (
    <div className="space-y-4">
      <SegButtons
        value={find}
        onChange={setFind}
        options={[
          { id: 'n', label: mn ? 'Моль (n) олох' : 'Find moles (n)' },
          { id: 'm', label: mn ? 'Масс (m) олох' : 'Find mass (m)' },
          { id: 'mr', label: mn ? 'Mᵣ олох' : 'Find Mᵣ' }
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {find !== 'm' && <Field label={mn ? 'Масс, m' : 'Mass, m'} unit="g" value={m} onChange={setM} />}
        {find !== 'n' && <Field label={mn ? 'Моль, n' : 'Moles, n'} unit="mol" value={n} onChange={setN} />}
      </div>
      {find !== 'mr' && <MrInput mn={mn} mr={mr} setMr={setMr} />}
      <Result
        label={find === 'n' ? (mn ? 'Молийн тоо' : 'Amount of substance') : find === 'm' ? (mn ? 'Масс' : 'Mass') : 'Mᵣ'}
        value={sf3(result)}
        unit={find === 'n' ? 'mol' : find === 'm' ? 'g' : 'g/mol'}
        working={working}
      />
    </div>
  );
};

const GasCalculator: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [find, setFind] = useState<'v' | 'n'>('v');
  const [n, setN] = useState('0.25');
  const [v, setV] = useState('600');
  const [unit, setUnit] = useState<'cm3' | 'dm3'>('cm3');

  const vDm3 = unit === 'cm3' ? num(v) / 1000 : num(v);
  const resultV = num(n) * MOLAR_GAS_VOLUME;
  const resultN = vDm3 / MOLAR_GAS_VOLUME;

  return (
    <div className="space-y-4">
      <SegButtons
        value={find}
        onChange={setFind}
        options={[
          { id: 'v', label: mn ? 'Эзлэхүүн олох' : 'Find volume' },
          { id: 'n', label: mn ? 'Моль олох' : 'Find moles' }
        ]}
      />
      {find === 'v' ? (
        <>
          <Field label={mn ? 'Хийн моль, n' : 'Moles of gas, n'} unit="mol" value={n} onChange={setN} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Result label="V (dm³)" value={sf3(resultV)} unit="dm³" working={`V = n × 24 = ${n} × 24`} tone="teal" />
            <Result label="V (cm³)" value={sf3(resultV * 1000)} unit="cm³" working={`V = n × 24 000 = ${n} × 24 000`} tone="teal" />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
            <Field label={mn ? 'Хийн эзлэхүүн, V' : 'Gas volume, V'} value={v} onChange={setV} />
            <SegButtons
              value={unit}
              onChange={setUnit}
              options={[
                { id: 'cm3', label: 'cm³' },
                { id: 'dm3', label: 'dm³' }
              ]}
            />
          </div>
          <Result
            label={mn ? 'Хийн моль' : 'Moles of gas'}
            value={sf3(resultN)}
            unit="mol"
            working={unit === 'cm3' ? `n = V ÷ 24 000 = ${v} ÷ 24 000` : `n = V ÷ 24 = ${v} ÷ 24`}
            tone="teal"
          />
        </>
      )}
      <Note>
        {mn
          ? 'Өрөөний температур, даралтад (r.t.p.) аливаа хийн 1 моль 24 dm³ (24 000 cm³) эзэлхүүнтэй.'
          : 'One mole of any gas occupies 24 dm³ (24 000 cm³) at room temperature and pressure (r.t.p.).'}
      </Note>
    </div>
  );
};

const ConcentrationCalculator: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [find, setFind] = useState<'c' | 'n' | 'v'>('c');
  const [n, setN] = useState('0.0250');
  const [vCm3, setVCm3] = useState('250');
  const [c, setC] = useState('0.100');
  const [mr, setMr] = useState('40');

  const vDm3 = num(vCm3) / 1000;
  let result = NaN;
  let working = '';
  let unit = '';
  if (find === 'c') {
    result = num(n) / vDm3;
    working = `c = n ÷ V = ${n} ÷ (${vCm3} ÷ 1000)`;
    unit = 'mol/dm³';
  } else if (find === 'n') {
    result = num(c) * vDm3;
    working = `n = c × V = ${c} × (${vCm3} ÷ 1000)`;
    unit = 'mol';
  } else {
    result = (num(n) / num(c)) * 1000;
    working = `V = n ÷ c = ${n} ÷ ${c} (× 1000 → cm³)`;
    unit = 'cm³';
  }
  const conc = find === 'c' ? result : num(c);

  return (
    <div className="space-y-4">
      <SegButtons
        value={find}
        onChange={setFind}
        options={[
          { id: 'c', label: mn ? 'Концентраци олох' : 'Find concentration' },
          { id: 'n', label: mn ? 'Моль олох' : 'Find moles' },
          { id: 'v', label: mn ? 'Эзлэхүүн олох' : 'Find volume' }
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {find !== 'n' && <Field label={mn ? 'Моль, n' : 'Moles, n'} unit="mol" value={n} onChange={setN} />}
        {find !== 'v' && <Field label={mn ? 'Уусмалын эзлэхүүн, V' : 'Solution volume, V'} unit="cm³" value={vCm3} onChange={setVCm3} />}
        {find !== 'c' && <Field label={mn ? 'Концентраци, c' : 'Concentration, c'} unit="mol/dm³" value={c} onChange={setC} />}
      </div>
      <Result label={mn ? 'Хариу' : 'Answer'} value={sf3(result)} unit={unit} working={working} tone="cyan" />

      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {mn ? 'mol/dm³ → g/dm³ хөрвүүлэх' : 'Convert mol/dm³ → g/dm³'}
        </div>
        <MrInput mn={mn} mr={mr} setMr={setMr} />
        <Result
          label={mn ? 'Массын концентраци' : 'Mass concentration'}
          value={sf3(conc * num(mr))}
          unit="g/dm³"
          working={`${sf3(conc)} mol/dm³ × ${mr} g/mol`}
          tone="cyan"
        />
      </div>
    </div>
  );
};

/** Largest set of titres that agree within 0.10 cm³. */
const concordantSet = (titres: number[]) => {
  const sorted = [...titres].sort((a, b) => a - b);
  let best: number[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const window = sorted.filter(t => t >= sorted[i] && t - sorted[i] <= 0.1 + 1e-9);
    if (window.length > best.length) best = window;
  }
  return best;
};

const TitrationCalculator: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [titres, setTitres] = useState<string[]>(['25.40', '24.60', '24.55', '24.65']);
  const [roughFirst, setRoughFirst] = useState(true);
  const [cKnown, setCKnown] = useState('0.100');
  const [ratioKnown, setRatioKnown] = useState('2');
  const [ratioUnknown, setRatioUnknown] = useState('1');
  const [vUnknown, setVUnknown] = useState('25.0');

  const values = titres.map(num).filter(Number.isFinite);
  const usable = roughFirst ? values.slice(1) : values;
  const concordant = concordantSet(usable);
  const mean = concordant.length >= 2 ? concordant.reduce((a, b) => a + b, 0) / concordant.length : NaN;

  const nKnown = num(cKnown) * (mean / 1000);
  const nUnknown = (nKnown * num(ratioUnknown)) / num(ratioKnown);
  const cUnknown = nUnknown / (num(vUnknown) / 1000);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {mn ? '1. Бюреткийн титрийн үр дүн (cm³)' : '1. Burette titres (cm³)'}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {titres.map((t, i) => (
            <div key={i} className="relative">
              <input
                type="number"
                step="any"
                inputMode="decimal"
                value={t}
                onChange={e => setTitres(prev => prev.map((p, j) => (j === i ? e.target.value : p)))}
                className={`${inputClass} pr-8 ${
                  roughFirst && i === 0
                    ? 'opacity-60'
                    : concordant.includes(num(t)) && concordant.length >= 2
                      ? 'border-emerald-500 dark:border-emerald-500'
                      : ''
                }`}
                aria-label={`${mn ? 'Титр' : 'Titre'} ${i + 1}`}
              />
              {titres.length > 2 && (
                <button
                  onClick={() => setTitres(prev => prev.filter((_, j) => j !== i))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500"
                  aria-label={mn ? 'Устгах' : 'Remove'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <span className="absolute -top-2 left-2 px-1 text-[9px] font-mono bg-white dark:bg-slate-900 text-slate-400">
                {roughFirst && i === 0 ? (mn ? 'ойролцоо' : 'rough') : `${mn ? 'Туршилт' : 'Run'} ${roughFirst ? i : i + 1}`}
              </span>
            </div>
          ))}
          {titres.length < 6 && (
            <button
              onClick={() => setTitres(prev => [...prev, ''])}
              className="flex items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Plus className="w-3.5 h-3.5" />
              {mn ? 'Нэмэх' : 'Add'}
            </button>
          )}
        </div>
        <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <input type="checkbox" checked={roughFirst} onChange={e => setRoughFirst(e.target.checked)} />
          {mn ? 'Эхний үр дүн нь ойролцоо (rough) — дундажид оруулахгүй' : 'First titre is the rough titre — exclude it from the mean'}
        </label>
        <Result
          label={mn ? 'Конкордант дундаж титр' : 'Mean of concordant titres'}
          value={sf3(mean)}
          unit="cm³"
          working={
            concordant.length >= 2
              ? `(${concordant.join(' + ')}) ÷ ${concordant.length}`
              : mn
                ? '0.10 cm³ дотор тохирох хоёр үр дүн хэрэгтэй.'
                : 'Need two titres within 0.10 cm³ of each other.'
          }
          tone="rose"
        />
      </div>

      <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {mn ? '2. Үл мэдэгдэх концентрацийг олох' : '2. Find the unknown concentration'}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label={mn ? 'Бюретка дахь уусмалын c' : 'Concentration in burette'} unit="mol/dm³" value={cKnown} onChange={setCKnown} />
          <Field label={mn ? 'Колбо дахь уусмалын V' : 'Volume in flask (pipette)'} unit="cm³" value={vUnknown} onChange={setVUnknown} />
          <Field label={mn ? 'Тэгшитгэлд: бюреткийн бодисын коэффициент' : 'Equation coefficient: burette substance'} value={ratioKnown} onChange={setRatioKnown} />
          <Field label={mn ? 'Тэгшитгэлд: колбоны бодисын коэффициент' : 'Equation coefficient: flask substance'} value={ratioUnknown} onChange={setRatioUnknown} />
        </div>
        <Note>
          {mn
            ? 'Жишээ: 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O. Бюреткад NaOH байвал коэффициентүүд 2 ба 1.'
            : 'Example: 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O. With NaOH in the burette the coefficients are 2 and 1.'}
        </Note>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Result label={mn ? 'Бюреткийн бодисын моль' : 'Moles from burette'} value={sf3(nKnown)} unit="mol" working={`${cKnown} × ${sf3(mean)} ÷ 1000`} />
          <Result
            label={mn ? 'Колбоны бодисын моль' : 'Moles in flask'}
            value={sf3(nUnknown)}
            unit="mol"
            working={`${sf3(nKnown)} × ${ratioUnknown} ÷ ${ratioKnown}`}
          />
          <Result
            label={mn ? 'Үл мэдэгдэх концентраци' : 'Unknown concentration'}
            value={sf3(cUnknown)}
            unit="mol/dm³"
            working={`${sf3(nUnknown)} ÷ (${vUnknown} ÷ 1000)`}
            tone="rose"
          />
        </div>
      </div>
    </div>
  );
};

const YieldCalculator: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [actual, setActual] = useState('4.2');
  const [theoretical, setTheoretical] = useState('5.6');
  const [pure, setPure] = useState('8.5');
  const [sample, setSample] = useState('10.0');

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{mn ? 'Гарцын хувь' : 'Percentage yield'}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label={mn ? 'Бодит гарц' : 'Actual yield'} unit="g" value={actual} onChange={setActual} />
          <Field label={mn ? 'Онолын гарц' : 'Theoretical yield'} unit="g" value={theoretical} onChange={setTheoretical} />
        </div>
        <Result
          label={mn ? 'Гарцын хувь' : 'Percentage yield'}
          value={sf3((num(actual) / num(theoretical)) * 100)}
          unit="%"
          working={`${actual} ÷ ${theoretical} × 100`}
        />
      </div>
      <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{mn ? 'Цэвэршлийн хувь' : 'Percentage purity'}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label={mn ? 'Цэвэр бодисын масс' : 'Mass of pure substance'} unit="g" value={pure} onChange={setPure} />
          <Field label={mn ? 'Дээжийн нийт масс' : 'Total mass of sample'} unit="g" value={sample} onChange={setSample} />
        </div>
        <Result
          label={mn ? 'Цэвэршлийн хувь' : 'Percentage purity'}
          value={sf3((num(pure) / num(sample)) * 100)}
          unit="%"
          working={`${pure} ÷ ${sample} × 100`}
          tone="teal"
        />
      </div>
    </div>
  );
};

interface EmpiricalRow {
  symbol: string;
  amount: string;
}

const EmpiricalCalculator: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [rows, setRows] = useState<EmpiricalRow[]>([
    { symbol: 'C', amount: '85.7' },
    { symbol: 'H', amount: '14.3' }
  ]);
  const [mrGiven, setMrGiven] = useState('56');

  const calc = useMemo(() => {
    const items = rows
      .map(r => ({ symbol: r.symbol.trim(), amount: num(r.amount) }))
      .filter(r => r.symbol && Number.isFinite(r.amount) && r.amount > 0);
    if (items.length < 2) return null;
    if (items.some(r => !(r.symbol in AR))) return { error: true as const };

    const moles = items.map(r => r.amount / AR[r.symbol]);
    const smallest = Math.min(...moles);
    const ratios = moles.map(m => m / smallest);
    let multiplier = 1;
    for (let k = 1; k <= 6; k++) {
      if (ratios.every(r => Math.abs(r * k - Math.round(r * k)) < 0.1)) {
        multiplier = k;
        break;
      }
    }
    const whole = ratios.map(r => Math.round(r * multiplier));
    const empirical = items.map((r, i) => `${r.symbol}${whole[i] > 1 ? whole[i] : ''}`).join('');
    const empiricalMr = items.reduce((sum, r, i) => sum + AR[r.symbol] * whole[i], 0);
    const k = Math.round(num(mrGiven) / empiricalMr);
    const molecular =
      Number.isFinite(k) && k >= 1 ? items.map((r, i) => `${r.symbol}${whole[i] * k > 1 ? whole[i] * k : ''}`).join('') : null;
    return { error: false as const, items, moles, ratios, multiplier, whole, empirical, empiricalMr, k, molecular };
  }, [rows, mrGiven]);

  return (
    <div className="space-y-4">
      <Note>
        {mn
          ? 'Элемент бүрийн масс (г) эсвэл массын хувийг (%) оруулна. Хоёулаа ижил аргаар бодогдоно.'
          : 'Enter the mass (g) or percentage by mass of each element — both work the same way.'}
      </Note>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-[6rem_1fr_auto] gap-2 items-center">
            <input
              value={r.symbol}
              onChange={e => setRows(prev => prev.map((p, j) => (j === i ? { ...p, symbol: e.target.value } : p)))}
              className={inputClass}
              placeholder="C"
              aria-label={mn ? 'Элементийн тэмдэг' : 'Element symbol'}
            />
            <input
              type="number"
              step="any"
              inputMode="decimal"
              value={r.amount}
              onChange={e => setRows(prev => prev.map((p, j) => (j === i ? { ...p, amount: e.target.value } : p)))}
              className={inputClass}
              placeholder={mn ? 'Масс эсвэл %' : 'Mass or %'}
              aria-label={mn ? 'Масс эсвэл хувь' : 'Mass or percentage'}
            />
            <button
              onClick={() => setRows(prev => prev.filter((_, j) => j !== i))}
              disabled={rows.length <= 2}
              className="p-2 text-slate-400 hover:text-rose-500 disabled:opacity-30"
              aria-label={mn ? 'Устгах' : 'Remove'}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {rows.length < 5 && (
          <button
            onClick={() => setRows(prev => [...prev, { symbol: '', amount: '' }])}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Plus className="w-3.5 h-3.5" />
            {mn ? 'Элемент нэмэх' : 'Add element'}
          </button>
        )}
      </div>
      <Field label={mn ? 'Mᵣ (молекул томьёонд, заавал биш)' : 'Mᵣ (for molecular formula, optional)'} value={mrGiven} onChange={setMrGiven} />

      {calc?.error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-sm text-rose-700 dark:text-rose-300">
          {mn ? 'Элементийн тэмдгийг шалгана уу (жишээ нь C, H, O, Cl).' : 'Check the element symbols (e.g. C, H, O, Cl).'}
        </div>
      )}
      {calc && !calc.error && (
        <>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs font-mono">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500">
                <tr>
                  <th className="text-left px-3 py-2">{mn ? 'Элемент' : 'Element'}</th>
                  <th className="text-right px-3 py-2">{mn ? 'Моль = масс ÷ Aᵣ' : 'Moles = mass ÷ Aᵣ'}</th>
                  <th className="text-right px-3 py-2">{mn ? '÷ хамгийн бага' : '÷ smallest'}</th>
                  <th className="text-right px-3 py-2">{mn ? 'Бүхэл харьцаа' : 'Whole-number ratio'}</th>
                </tr>
              </thead>
              <tbody>
                {calc.items.map((r, i) => (
                  <tr key={i} className="border-t border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                    <td className="px-3 py-2 font-bold">{r.symbol}</td>
                    <td className="text-right px-3 py-2">
                      {r.amount} ÷ {AR[r.symbol]} = {sf3(calc.moles[i])}
                    </td>
                    <td className="text-right px-3 py-2">{calc.ratios[i].toFixed(2)}</td>
                    <td className="text-right px-3 py-2 font-bold">{calc.whole[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {calc.multiplier > 1 && (
            <Note>
              {mn
                ? `Харьцаа бүхэл тоо биш тул бүгдийг ${calc.multiplier}-аар үржүүлсэн.`
                : `Ratios were not whole numbers, so all were multiplied by ${calc.multiplier}.`}
            </Note>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Result
              label={mn ? 'Эмпирик томьёо' : 'Empirical formula'}
              value={toSubscript(calc.empirical)}
              working={`${mn ? 'Эмпирик Mᵣ' : 'Empirical Mᵣ'} = ${Number(calc.empiricalMr.toFixed(2))}`}
            />
            <Result
              label={mn ? 'Молекул томьёо' : 'Molecular formula'}
              value={calc.molecular ? toSubscript(calc.molecular) : '—'}
              working={calc.molecular ? `${mrGiven} ÷ ${Number(calc.empiricalMr.toFixed(2))} = ${calc.k}` : undefined}
              tone="teal"
            />
          </div>
        </>
      )}
    </div>
  );
};

const RfCalculator: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [spot, setSpot] = useState('3.6');
  const [front, setFront] = useState('8.0');
  const rf = num(spot) / num(front);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label={mn ? 'Суурь шугамаас толбо хүртэл' : 'Baseline to centre of spot'} unit="cm" value={spot} onChange={setSpot} />
        <Field label={mn ? 'Суурь шугамаас уусгагчийн зах хүртэл' : 'Baseline to solvent front'} unit="cm" value={front} onChange={setFront} />
      </div>
      <Result label="Rf" value={rf > 1 ? '—' : sf3(rf)} working={`Rf = ${spot} ÷ ${front}`} tone="teal" />
      {rf > 1 && (
        <Note>{mn ? 'Толбо уусгагчийн захаас хол явах боломжгүй — утгаа шалгана уу.' : 'A spot cannot travel further than the solvent front — check your values.'}</Note>
      )}
      <Note>{mn ? 'Rf нь нэгжгүй бөгөөд үргэлж 0-оос 1-ийн хооронд байна.' : 'Rf has no units and is always between 0 and 1.'}</Note>
    </div>
  );
};

const RateCalculator: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [amount, setAmount] = useState('60');
  const [time, setTime] = useState('30');
  const [unit, setUnit] = useState('cm³');
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label={mn ? 'Үүссэн бүтээгдэхүүн / зарцуулсан урвалж' : 'Product formed / reactant used'} value={amount} onChange={setAmount} />
        <label className="space-y-1.5 block">
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">{mn ? 'Нэгж' : 'Unit'}</span>
          <select value={unit} onChange={e => setUnit(e.target.value)} className={inputClass}>
            <option>cm³</option>
            <option>g</option>
            <option>mol</option>
          </select>
        </label>
        <Field label={mn ? 'Хугацаа' : 'Time taken'} unit="s" value={time} onChange={setTime} />
      </div>
      <Result
        label={mn ? 'Дундаж хурд' : 'Mean rate of reaction'}
        value={sf3(num(amount) / num(time))}
        unit={`${unit}/s`}
        working={`${amount} ÷ ${time}`}
        tone="teal"
      />
      <Note>
        {mn
          ? 'Тодорхой агшин дахь хурдыг олохдоо графикт шүргэгч татаж налууг нь олно: налуу = босоо өөрчлөлт ÷ хэвтээ өөрчлөлт.'
          : 'For the rate at a specific time, draw a tangent to the curve and find its gradient: change in y ÷ change in x.'}
      </Note>
    </div>
  );
};

const EnergyCalculator: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [broken, setBroken] = useState('2640');
  const [made, setMade] = useState('3462');
  const dH = num(broken) - num(made);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label={mn ? 'Тасрах холбоонуудын энергийн нийлбэр' : 'Total energy of bonds broken'} unit="kJ/mol" value={broken} onChange={setBroken} />
        <Field label={mn ? 'Үүсэх холбоонуудын энергийн нийлбэр' : 'Total energy of bonds made'} unit="kJ/mol" value={made} onChange={setMade} />
      </div>
      <Result
        label="ΔH"
        value={Number.isFinite(dH) ? `${dH > 0 ? '+' : ''}${Number(dH.toFixed(1))}` : '—'}
        unit="kJ/mol"
        working={`ΔH = ${broken} − ${made}`}
        tone={dH < 0 ? 'rose' : 'cyan'}
      />
      {Number.isFinite(dH) && dH !== 0 && (
        <Note>
          {dH < 0
            ? mn
              ? 'ΔH сөрөг → экзотерм урвал: үүсэх холбоонд ялгарах энерги их.'
              : 'ΔH is negative → exothermic: more energy is released making bonds than is taken in breaking them.'
            : mn
              ? 'ΔH эерэг → эндотерм урвал: холбоо таслахад зарцуулах энерги их.'
              : 'ΔH is positive → endothermic: more energy is taken in breaking bonds than is released making them.'}
        </Note>
      )}
      <Note>
        {mn
          ? 'Жишээ (CH₄ + 2O₂ → CO₂ + 2H₂O): тасрах = 4(C–H 412) + 2(O=O 496) = 2640, үүсэх = 2(C=O 805) + 4(O–H 463) = 3462.'
          : 'Example (CH₄ + 2O₂ → CO₂ + 2H₂O): broken = 4(C–H 412) + 2(O=O 496) = 2640, made = 2(C=O 805) + 4(O–H 463) = 3462.'}
      </Note>
    </div>
  );
};

const ScientificCalculator: React.FC<{ mn: boolean }> = ({ mn }) => (
  <div className="space-y-3">
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white">
      <iframe
        src="https://www.desmos.com/scientific"
        title="Desmos Scientific Calculator"
        className="w-full h-[520px]"
        loading="lazy"
      />
    </div>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Note>
        {mn
          ? 'Desmos шинжлэх ухааны тооцоолуур: log, 10ˣ, зэрэг, стандарт хэлбэр (×10ⁿ).'
          : 'Desmos scientific calculator: logs, powers and standard form (×10ⁿ).'}
      </Note>
      <a
        href="https://www.desmos.com/scientific"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 hover:underline"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        {mn ? 'Шинэ цонхонд' : 'New tab'}
      </a>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

type ToolId = 'mr' | 'moles' | 'gas' | 'conc' | 'titration' | 'yield' | 'empirical' | 'rf' | 'rate' | 'energy' | 'sci';

const TOOLS: {
  id: ToolId;
  icon: React.ReactNode;
  titleEn: string;
  titleMn: string;
  ref: string;
  formula: string;
}[] = [
  { id: 'mr', icon: <Atom className="w-4 h-4" />, titleEn: 'Mᵣ & % composition', titleMn: 'Mᵣ ба массын хувь', ref: 'Topic 3', formula: 'Mᵣ = Σ Aᵣ' },
  { id: 'moles', icon: <Scale className="w-4 h-4" />, titleEn: 'Moles, mass & Mᵣ', titleMn: 'Моль, масс, Mᵣ', ref: 'Topic 3', formula: 'n = m ÷ Mᵣ' },
  { id: 'gas', icon: <Wind className="w-4 h-4" />, titleEn: 'Gas volume (r.t.p.)', titleMn: 'Хийн эзлэхүүн', ref: 'Topic 3', formula: 'V = n × 24' },
  { id: 'conc', icon: <Beaker className="w-4 h-4" />, titleEn: 'Concentration', titleMn: 'Концентраци', ref: 'Topic 3', formula: 'c = n ÷ V' },
  { id: 'titration', icon: <FlaskConical className="w-4 h-4" />, titleEn: 'Titration', titleMn: 'Титрлэлт', ref: 'Topic 3 / 12', formula: 'c₁V₁ → c₂' },
  { id: 'yield', icon: <Percent className="w-4 h-4" />, titleEn: '% yield & % purity', titleMn: 'Гарц ба цэвэршил', ref: 'Topic 3', formula: '× 100' },
  { id: 'empirical', icon: <Sigma className="w-4 h-4" />, titleEn: 'Empirical formula', titleMn: 'Эмпирик томьёо', ref: 'Topic 3', formula: 'CₓHᵧ' },
  { id: 'rf', icon: <Ruler className="w-4 h-4" />, titleEn: 'Rf value', titleMn: 'Rf утга', ref: 'Topic 12', formula: 'Rf = a ÷ b' },
  { id: 'rate', icon: <Wind className="w-4 h-4" />, titleEn: 'Rate of reaction', titleMn: 'Урвалын хурд', ref: 'Topic 6', formula: 'Δ ÷ t' },
  { id: 'energy', icon: <Flame className="w-4 h-4" />, titleEn: 'Bond energy ΔH', titleMn: 'Холбооны энерги ΔH', ref: 'Topic 5', formula: 'ΔH = B − M' },
  { id: 'sci', icon: <Calculator className="w-4 h-4" />, titleEn: 'Scientific calculator', titleMn: 'Шинжлэх ухааны тооцоолуур', ref: 'Desmos', formula: 'log, xⁿ' }
];

export const ChemistryCalculatorSuite: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const [tool, setTool] = useState<ToolId>('mr');
  const current = TOOLS.find(t => t.id === tool)!;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-sm">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {mn ? 'IGCSE 0620 химийн онлайн тооцоолуур' : 'IGCSE 0620 Online Chemistry Calculator'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {mn
            ? 'Хөтөлбөрийн бүх тооцоот бодлогыг алхам алхмаар бодно. Хариуг Кэмбрижийн шаардлагын дагуу 3 чухал оронтойгоор харуулна.'
            : 'Every calculation type on the syllabus, with working shown. Answers are given to 3 significant figures, as Cambridge expects.'}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {TOOLS.map(t => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`p-2.5 rounded-2xl border text-left transition-all ${
              tool === t.id
                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 ring-2 ring-amber-500/30'
                : 'bg-white dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
              {t.icon}
              <span className="text-[9px] font-mono text-slate-400">{t.ref}</span>
            </div>
            <div className="mt-1.5 text-xs font-bold text-slate-900 dark:text-white leading-tight">{mn ? t.titleMn : t.titleEn}</div>
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{t.formula}</div>
          </button>
        ))}
      </div>

      <div>
        <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-4">{mn ? current.titleMn : current.titleEn}</h4>
        {tool === 'mr' && <MrCalculator mn={mn} />}
        {tool === 'moles' && <MolesCalculator mn={mn} />}
        {tool === 'gas' && <GasCalculator mn={mn} />}
        {tool === 'conc' && <ConcentrationCalculator mn={mn} />}
        {tool === 'titration' && <TitrationCalculator mn={mn} />}
        {tool === 'yield' && <YieldCalculator mn={mn} />}
        {tool === 'empirical' && <EmpiricalCalculator mn={mn} />}
        {tool === 'rf' && <RfCalculator mn={mn} />}
        {tool === 'rate' && <RateCalculator mn={mn} />}
        {tool === 'energy' && <EnergyCalculator mn={mn} />}
        {tool === 'sci' && <ScientificCalculator mn={mn} />}
      </div>
    </div>
  );
};
