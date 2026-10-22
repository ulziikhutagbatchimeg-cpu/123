import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageMode } from '../types/chemistry';
import { Atom, Scale, Zap, FlaskConical } from 'lucide-react';

// Interactive visuals built from the 0620 Chapter 5 and 6 lessons (mole map, limiting
// reactant, electrolysis cells, titration). Each one lets the student change a value
// and see the chemistry respond.

// Shows English, Mongolian or both, depending on the language mode
const Bi: React.FC<{ mode: LanguageMode; en: string; mn: string; className?: string }> = ({ mode, en, mn, className }) => (
  <span className={className}>
    {mode === 'mn' ? mn : mode === 'dual' ? (
      <>
        {en}
        <span className="block text-[11px] font-normal text-slate-500 dark:text-slate-400">{mn}</span>
      </>
    ) : en}
  </span>
);

const Card: React.FC<{ mode: LanguageMode; icon: React.ReactNode; titleEn: string; titleMn: string; children: React.ReactNode }> = ({
  mode,
  icon,
  titleEn,
  titleMn,
  children
}) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
    <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
      <span className="text-emerald-600 dark:text-teal-400">{icon}</span>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
        <Bi mode={mode} en={titleEn} mn={titleMn} />
      </h3>
    </div>
    {children}
  </div>
);

const Slider: React.FC<{ label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; unit?: string }> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit
}) => (
  <label className="block space-y-1">
    <span className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
      <span>{label}</span>
      <span className="font-mono text-emerald-700 dark:text-teal-300">
        {value}
        {unit ? ` ${unit}` : ''}
      </span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(parseFloat(e.target.value))}
      className="w-full accent-emerald-600"
    />
  </label>
);

// ------------------------------------------------------------------ mole map
const MOLAR_MASS_CHOICES = [
  { label: 'CO₂ (44)', value: 44 },
  { label: 'CaCO₃ (100)', value: 100 },
  { label: 'H₂O (18)', value: 18 }
];

export const MoleMap: React.FC<{ mode: LanguageMode }> = ({ mode }) => {
  const [moles, setMoles] = useState<number>(0.1);
  const [mr, setMr] = useState<number>(44);
  const [volDm3, setVolDm3] = useState<number>(0.25);
  const [focus, setFocus] = useState<'mass' | 'particles' | 'volume' | 'conc'>('mass');

  const mass = moles * mr;
  const particles = moles * 6.02e23;
  const gasVol = moles * 24;
  const conc = moles / volDm3;

  const nodes = [
    { id: 'mass' as const, x: 40, y: 50, en: 'Mass (g)', mn: 'Масс (г)', value: `${mass.toFixed(2)} g`, formula: 'm = n × Mᵣ' },
    { id: 'particles' as const, x: 160, y: 50, en: 'Particles', mn: 'Бөөмийн тоо', value: particles.toExponential(2), formula: 'N = n × 6.02 × 10²³' },
    { id: 'volume' as const, x: 40, y: 150, en: 'Gas volume (dm³)', mn: 'Хийн эзлэхүүн (дм³)', value: `${gasVol.toFixed(2)} dm³`, formula: 'V = n × 24  (r.t.p.)' },
    { id: 'conc' as const, x: 160, y: 150, en: 'Concentration', mn: 'Концентраци', value: `${conc.toFixed(3)} mol/dm³`, formula: 'c = n ÷ V' }
  ];
  const current = nodes.find(n => n.id === focus) ?? nodes[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-3">
        <Slider label={mode === 'mn' ? 'Молийн тоо, n' : 'Amount of substance, n'} value={moles} min={0.1} max={2} step={0.1} onChange={setMoles} unit="mol" />
        <div className="flex flex-wrap gap-1.5">
          {MOLAR_MASS_CHOICES.map(c => (
            <button
              key={c.value}
              onClick={() => setMr(c.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                mr === c.value
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <Slider label={mode === 'mn' ? 'Уусмалын эзлэхүүн' : 'Solution volume'} value={volDm3} min={0.05} max={1} step={0.05} onChange={setVolDm3} unit="dm³" />
      </div>

      <div className="space-y-3">
        <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
          {nodes.map(n => (
            <line key={`l-${n.id}`} x1={100} y1={100} x2={n.x + 30} y2={n.y + 15} stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" />
          ))}
          <circle cx={100} cy={100} r={26} className="fill-emerald-600" />
          <text x={100} y={97} textAnchor="middle" className="fill-white text-[11px] font-bold">n</text>
          <text x={100} y={111} textAnchor="middle" className="fill-white text-[9px]">mol</text>
          {nodes.map(n => (
            <g key={n.id} onClick={() => setFocus(n.id)} className="cursor-pointer">
              <rect
                x={n.x - 4}
                y={n.y}
                width={68}
                height={30}
                rx={8}
                className={focus === n.id ? 'fill-teal-500' : 'fill-slate-100 dark:fill-slate-800'}
              />
              <text x={n.x + 30} y={n.y + 19} textAnchor="middle" className={`text-[9px] font-bold ${focus === n.id ? 'fill-white' : 'fill-slate-700 dark:fill-slate-200'}`}>
                {mode === 'mn' ? n.mn : n.en}
              </text>
            </g>
          ))}
        </svg>
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs">
          <div className="font-bold text-emerald-900 dark:text-emerald-200">
            <Bi mode={mode} en={current.en} mn={current.mn} />
          </div>
          <div className="font-mono text-slate-600 dark:text-slate-300 mt-1">
            {current.formula} → <strong>{current.value}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------- limiting reactant
export const LimitingReactant: React.FC<{ mode: LanguageMode }> = ({ mode }) => {
  const [h2, setH2] = useState<number>(2);
  const [o2, setO2] = useState<number>(1.5);

  // 2H₂ + O₂ → 2H₂O: divide each amount by its coefficient, the smallest value limits the reaction
  const perH2 = h2 / 2;
  const perO2 = o2 / 1;
  const extent = Math.min(perH2, perO2);
  const limiting = Math.abs(perH2 - perO2) < 1e-9 ? 'both' : perH2 < perO2 ? 'H2' : 'O2';
  const water = 2 * extent;
  const h2Left = h2 - 2 * extent;
  const o2Left = o2 - extent;
  const max = 4;
  const bar = (v: number) => `${Math.max(0, Math.min(100, (v / max) * 100))}%`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Slider label="H₂ (mol)" value={h2} min={0} max={4} step={0.5} onChange={setH2} />
        <Slider label="O₂ (mol)" value={o2} min={0} max={4} step={0.5} onChange={setO2} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'H₂', start: h2, left: h2Left, color: 'bg-sky-500' },
          { name: 'O₂', start: o2, left: o2Left, color: 'bg-rose-500' },
          { name: 'H₂O', start: 0, left: water, color: 'bg-emerald-500' }
        ].map(b => (
          <div key={b.name} className="space-y-1.5">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{b.name}</div>
            <div className="relative h-28 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className={`absolute bottom-0 left-0 right-0 ${b.color} opacity-30 transition-all duration-500`} style={{ height: bar(b.start) }} />
              <div className={`absolute bottom-0 left-0 right-0 ${b.color} transition-all duration-500`} style={{ height: bar(b.left) }} />
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              {b.name === 'H₂O' ? `${water.toFixed(1)} mol formed` : `${b.left.toFixed(1)} mol left`}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1.5 text-xs">
        <div className="font-mono text-slate-700 dark:text-slate-300">
          H₂: {h2} ÷ 2 = {perH2.toFixed(2)} &nbsp;&nbsp; O₂: {o2} ÷ 1 = {perO2.toFixed(2)}
        </div>
        <div className="font-bold text-amber-900 dark:text-amber-200">
          {limiting === 'both'
            ? <Bi mode={mode} en="Both reactants run out together — no limiting reactant." mn="Хоёулаа зэрэг дуусна — хязгаарлагч бодис байхгүй." />
            : <Bi
                mode={mode}
                en={`Limiting reactant: ${limiting === 'H2' ? 'H₂' : 'O₂'}. Products formed: ${water.toFixed(1)} mol H₂O.`}
                mn={`Хязгаарлагч бодис: ${limiting === 'H2' ? 'H₂' : 'O₂'}. Үүссэн: ${water.toFixed(1)} моль H₂O.`}
              />}
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------------- electrolysis cell
type Ion = { symbol: string; toward: 'cathode' | 'anode'; color: string };

const CELLS: {
  id: string;
  nameEn: string;
  nameMn: string;
  ions: Ion[];
  cathodeEn: string;
  cathodeMn: string;
  anodeEn: string;
  anodeMn: string;
  productEn: string;
  productMn: string;
}[] = [
  {
    id: 'pbbr2',
    nameEn: 'Molten lead(II) bromide',
    nameMn: 'Хайлсан хар тугалга(II) бромид',
    ions: [
      { symbol: 'Pb²⁺', toward: 'cathode', color: 'bg-slate-500' },
      { symbol: 'Br⁻', toward: 'anode', color: 'bg-amber-700' }
    ],
    cathodeEn: 'Pb²⁺ + 2e⁻ → Pb (liquid lead collects at the cathode)',
    cathodeMn: 'Pb²⁺ + 2e⁻ → Pb (шингэн хар тугалга катодод цугларна)',
    anodeEn: '2Br⁻ → Br₂ + 2e⁻ (brown bromine vapour at the anode)',
    anodeMn: '2Br⁻ → Br₂ + 2e⁻ (анодод бор хүрэн уурыг бүрдүүлнэ)',
    productEn: 'Cathode: lead · Anode: bromine',
    productMn: 'Катод: хар тугалга · Анод: бром'
  },
  {
    id: 'h2so4',
    nameEn: 'Dilute sulfuric acid',
    nameMn: 'Шингэрүүлсэн хүхрийн хүчил',
    ions: [
      { symbol: 'H⁺', toward: 'cathode', color: 'bg-sky-500' },
      { symbol: 'SO₄²⁻', toward: 'anode', color: 'bg-violet-500' }
    ],
    cathodeEn: '2H⁺ + 2e⁻ → H₂ (hydrogen, 2 volumes)',
    cathodeMn: '2H⁺ + 2e⁻ → H₂ (устөрөгч, 2 эзлэхүүн)',
    anodeEn: '2H₂O → O₂ + 4H⁺ + 4e⁻ (oxygen, 1 volume)',
    anodeMn: '2H₂O → O₂ + 4H⁺ + 4e⁻ (хүчилтөрөгч, 1 эзлэхүүн)',
    productEn: 'Cathode: hydrogen · Anode: oxygen (2 : 1)',
    productMn: 'Катод: устөрөгч · Анод: хүчилтөрөгч (2 : 1)'
  },
  {
    id: 'brine',
    nameEn: 'Concentrated sodium chloride (brine)',
    nameMn: 'Өтгөрүүлсэн натрийн хлорид (ханасан давс)',
    ions: [
      { symbol: 'Na⁺', toward: 'cathode', color: 'bg-indigo-500' },
      { symbol: 'Cl⁻', toward: 'anode', color: 'bg-green-600' }
    ],
    cathodeEn: '2H₂O + 2e⁻ → H₂ + 2OH⁻ (hydrogen; Na⁺ stays in solution)',
    cathodeMn: '2H₂O + 2e⁻ → H₂ + 2OH⁻ (устөрөгч; Na⁺ уусмалд үлдэнэ)',
    anodeEn: '2Cl⁻ → Cl₂ + 2e⁻ (chlorine at the anode)',
    anodeMn: '2Cl⁻ → Cl₂ + 2e⁻ (анодод хлор)',
    productEn: 'Cathode: hydrogen · Anode: chlorine',
    productMn: 'Катод: устөрөгч · Анод: хлор'
  }
];

export const ElectrolysisCell: React.FC<{ mode: LanguageMode }> = ({ mode }) => {
  const [cellId, setCellId] = useState<string>('pbbr2');
  const cell = CELLS.find(c => c.id === cellId) ?? CELLS[0];
  const dots = [0, 1, 2, 3, 4];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CELLS.map(c => (
          <button
            key={c.id}
            onClick={() => setCellId(c.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              cellId === c.id
                ? 'bg-teal-600 border-teal-600 text-white'
                : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Bi mode={mode === 'dual' ? 'en' : mode} en={c.nameEn} mn={c.nameMn} />
          </button>
        ))}
      </div>

      <div className="relative h-56 rounded-2xl bg-gradient-to-b from-sky-50 to-sky-100 dark:from-slate-950 dark:to-slate-900 border border-sky-200 dark:border-slate-800 overflow-hidden">
        {/* Cathode (−) on the left, anode (+) on the right */}
        <div className="absolute left-[18%] top-6 bottom-6 w-3 rounded bg-slate-500" />
        <div className="absolute right-[18%] top-6 bottom-6 w-3 rounded bg-slate-700" />
        <div className="absolute left-[18%] -translate-x-1/2 top-1 text-xs font-black text-sky-700 dark:text-sky-300">−</div>
        <div className="absolute right-[18%] translate-x-1/2 top-1 text-xs font-black text-rose-600">+</div>

        {cell.ions.map((ion, idx) =>
          dots.map(d => {
            // Cations start near the middle and drift left to the cathode; anions drift right to the anode
            const left = ion.toward === 'cathode' ? 26 + d * 3 : 60 + d * 3;
            const dx = ion.toward === 'cathode' ? '-60px' : '60px';
            const style = {
              left: `${left + idx * 4}%`,
              top: `${20 + ((d * 17 + idx * 29) % 55)}%`,
              animationDelay: `${d * 0.3}s`,
              '--lesson-dx': dx
            } as React.CSSProperties;
            return (
              <span
                key={`${ion.symbol}-${idx}-${d}`}
                className={`lesson-ion absolute w-7 h-7 rounded-full ${ion.color} text-[9px] font-bold text-white flex items-center justify-center shadow`}
                style={style}
              >
                {d === 0 ? ion.symbol : ''}
              </span>
            );
          })
        )}

        <div className="absolute bottom-2 left-0 right-0 text-center text-[11px] font-semibold text-slate-600 dark:text-slate-400">
          {mode === 'mn' ? 'Катод (−) ← → Анод (+)' : 'Cathode (−) ← → Anode (+)'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">{mode === 'mn' ? 'Катод' : 'Cathode'}</div>
          <Bi mode={mode} en={cell.cathodeEn} mn={cell.cathodeMn} className="font-mono text-slate-700 dark:text-slate-200" />
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">{mode === 'mn' ? 'Анод' : 'Anode'}</div>
          <Bi mode={mode} en={cell.anodeEn} mn={cell.anodeMn} className="font-mono text-slate-700 dark:text-slate-200" />
        </div>
      </div>
      <div className="text-xs font-bold text-teal-800 dark:text-teal-300">
        <Bi mode={mode} en={cell.productEn} mn={cell.productMn} />
      </div>
    </div>
  );
};

// --------------------------------------------------------------- titration
const ACID_MOL_PER_DM3 = 0.2; // H₂SO₄
const ACID_DM3 = 0.025; // 25.0 cm³
const BASE_MOL_PER_DM3 = 0.4; // NaOH

export const TitrationFlask: React.FC<{ mode: LanguageMode }> = ({ mode }) => {
  const [added, setAdded] = useState<number>(10);

  // H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O
  const nAcid = ACID_MOL_PER_DM3 * ACID_DM3;
  const nBase = 2 * nAcid;
  const endpointCm3 = (nBase / BASE_MOL_PER_DM3) * 1000;
  const reached = added >= endpointCm3 - 1e-9;
  const fill = Math.min(100, (added / 50) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
      <div className="space-y-3">
        <Slider label={mode === 'mn' ? 'Нэмсэн NaOH' : 'NaOH added'} value={added} min={0} max={50} step={0.5} onChange={setAdded} unit="cm³" />
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
          <div>n(H₂SO₄) = 0.200 × 0.0250 = {nAcid.toFixed(5)} mol</div>
          <div>n(NaOH) = 2 × {nAcid.toFixed(5)} = {nBase.toFixed(4)} mol</div>
          <div>V = {nBase.toFixed(4)} ÷ 0.400 = {(endpointCm3 / 1000).toFixed(4)} dm³ = {endpointCm3.toFixed(1)} cm³</div>
        </div>
        <div
          className={`p-3 rounded-xl border text-xs font-bold ${
            reached
              ? 'bg-pink-50 dark:bg-pink-950/30 border-pink-300 dark:border-pink-800 text-pink-800 dark:text-pink-200'
              : 'bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-200'
          }`}
        >
          <Bi
            mode={mode}
            en={reached ? `End point reached (${endpointCm3.toFixed(1)} cm³). Phenolphthalein turns pink.` : 'Still acidic — phenolphthalein stays colourless.'}
            mn={reached ? `Төгсгөлийн цэг (${endpointCm3.toFixed(1)} cm³). Фенолфталеин ягаан болно.` : 'Хүчиллэг хэвээр — фенолфталеин өнгөгүй.'}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <svg viewBox="0 0 160 200" className="w-48 h-60">
          {/* Conical flask */}
          <path d="M60 20 L60 70 L20 175 Q18 186 30 186 L130 186 Q142 186 140 175 L100 70 L100 20 Z" className="fill-white dark:fill-slate-900 stroke-slate-400" strokeWidth={2} />
          <clipPath id="flask-clip">
            <path d="M60 20 L60 70 L20 175 Q18 186 30 186 L130 186 Q142 186 140 175 L100 70 L100 20 Z" />
          </clipPath>
          <rect
            x={0}
            y={186 - fill * 1.1}
            width={160}
            height={200}
            clipPath="url(#flask-clip)"
            style={{ fill: reached ? '#f472b6' : '#bae6fd', transition: 'all 0.4s ease' }}
          />
          <text x={80} y={198} textAnchor="middle" className="fill-slate-500 text-[9px]">
            {mode === 'mn' ? 'H₂SO₄ + фенолфталеин' : 'H₂SO₄ + phenolphthalein'}
          </text>
        </svg>
      </div>
    </div>
  );
};

// ---------------------------------------------------------- section router
export const LessonVisuals: React.FC<{ topicId: string }> = ({ topicId }) => {
  const { mode } = useLanguage();

  if (topicId === 'top-3-1') {
    return (
      <div className="space-y-5">
        <Card mode={mode} icon={<Atom className="w-4 h-4" />} titleEn="Mole map: move between mass, particles, volume and concentration" titleMn="Моль зураглал: масс, бөөмийн тоо, эзлэхүүн, концентрацийн хооронд шилжих">
          <MoleMap mode={mode} />
        </Card>
        <Card mode={mode} icon={<Scale className="w-4 h-4" />} titleEn="Limiting reactant: 2H₂ + O₂ → 2H₂O" titleMn="Хязгаарлагч бодис: 2H₂ + O₂ → 2H₂O">
          <LimitingReactant mode={mode} />
        </Card>
      </div>
    );
  }

  if (topicId === 'top-4-1') {
    return (
      <Card mode={mode} icon={<Zap className="w-4 h-4" />} titleEn="Watch the ions move: predict the products" titleMn="Ионуудын хөдөлгөөнийг харах: бүтээгдэхүүнийг таамаглах">
        <ElectrolysisCell mode={mode} />
      </Card>
    );
  }

  if (topicId === 'top-7-1') {
    return (
      <Card mode={mode} icon={<FlaskConical className="w-4 h-4" />} titleEn="Titration: add NaOH and watch the end point" titleMn="Титрлэлт: NaOH нэмж төгсгөлийн цэгийг харах">
        <TitrationFlask mode={mode} />
      </Card>
    );
  }

  return null;
};
