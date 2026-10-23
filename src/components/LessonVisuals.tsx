import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { LanguageMode } from '../types/chemistry';
import { Atom, Scale, Zap, FlaskConical, Thermometer, Link2, Droplets, Ruler, Wind, Gauge, Beaker, Sparkles, ExternalLink } from 'lucide-react';

// Interactive visuals for every lesson topic. Each one lets the student change a value and
// see the chemistry respond. Numbers and examples come from the teacher's 0620 Chapter 5 and 6
// lesson decks where they exist; the rest are standard IGCSE examples.

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

// Free, openly available simulations linked from each topic (checked to load on 2026-10)
type SimLink = { titleEn: string; titleMn: string; url: string };

const SimLinks: React.FC<{ mode: LanguageMode; links: SimLink[] }> = ({ mode, links }) => {
  if (links.length === 0) return null;
  return (
    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
        <Link2 className="w-3.5 h-3.5" />
        <Bi mode={mode} en="Free interactive simulations" mn="Үнэгүй интерактив симуляц" />
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map(l => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          >
            <ExternalLink className="w-3 h-3" />
            <Bi mode={mode} en={l.titleEn} mn={l.titleMn} />
          </a>
        ))}
      </div>
      <p className="text-[10px] text-slate-400">
        {mode === 'mn'
          ? 'PhET (Колорадогийн их сургууль), iWant2Study (Сингапурын БЯ). Нийтэд нээлттэй, үнэгүй.'
          : 'PhET (University of Colorado Boulder) and iWant2Study (Singapore MOE). Free to use.'}
      </p>
    </div>
  );
};

// ------------------------------------------------------------ 1.1 heating curve
const heatToTemp = (e: number) => {
  if (e <= 20) return -20 + e; // solid warms up
  if (e <= 40) return 0; // melting: temperature stays flat
  if (e <= 80) return (e - 40) * 2.5; // liquid warms up
  return 100; // boiling: temperature stays flat
};

const phaseOf = (e: number) => (e < 20 ? 'solid' : e < 40 ? 'melting' : e < 80 ? 'liquid' : 'boiling');

export const HeatingCurve: React.FC<{ mode: LanguageMode }> = ({ mode }) => {
  const [energy, setEnergy] = useState<number>(10);
  const temp = heatToTemp(energy);
  const phase = phaseOf(energy);
  const spread = phase === 'solid' ? 0 : phase === 'melting' ? 0.4 : phase === 'liquid' ? 0.8 : 1.2;

  const points = Array.from({ length: 51 }, (_, i) => {
    const e = i * 2;
    const t = heatToTemp(e);
    const x = 20 + (e / 100) * 200;
    const y = 120 - ((t + 20) / 120) * 100;
    return `${x},${y}`;
  }).join(' ');
  const markerX = 20 + (energy / 100) * 200;
  const markerY = 120 - ((temp + 20) / 120) * 100;

  const phaseLabel = {
    solid: { en: 'Solid', mn: 'Хатуу' },
    melting: { en: 'Melting (solid + liquid)', mn: 'Хайлж байна (хатуу + шингэн)' },
    liquid: { en: 'Liquid', mn: 'Шингэн' },
    boiling: { en: 'Boiling (liquid + gas)', mn: 'Буцаж байна (шингэн + хий)' }
  }[phase];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
      <div className="space-y-3">
        <Slider label={mode === 'mn' ? 'Өгсөн дулаан (нэгж)' : 'Heat supplied (units)'} value={energy} min={0} max={100} step={1} onChange={setEnergy} />
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-slate-500">{mode === 'mn' ? 'Температур' : 'Temperature'}</div>
            <div className="font-mono text-lg font-bold text-slate-900 dark:text-white">{temp.toFixed(0)} °C</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-slate-500">{mode === 'mn' ? 'Төлөв' : 'State'}</div>
            <div className="font-bold text-slate-900 dark:text-white">
              <Bi mode={mode} en={phaseLabel.en} mn={phaseLabel.mn} />
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {mode === 'mn'
            ? 'Хайлах ба буцлах үед температур тогтмол байна: өгч буй энерги бөөмсийн холболтыг эвдэхэд зарцуулагдана (далд дулаан).'
            : 'During melting and boiling the temperature stays flat: the energy supplied breaks the forces between particles (latent heat).'}
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <svg viewBox="0 0 240 140" className="w-full max-w-sm">
          <line x1="20" y1="20" x2="20" y2="120" className="stroke-slate-400" strokeWidth={1} />
          <line x1="20" y1="120" x2="220" y2="120" className="stroke-slate-400" strokeWidth={1} />
          <polyline points={points} fill="none" className="stroke-sky-500" strokeWidth={2.5} />
          <circle cx={markerX} cy={markerY} r={5} className="fill-rose-500" />
          <text x="222" y="124" className="fill-slate-500 text-[8px]">{mode === 'mn' ? 'дулаан' : 'heat'}</text>
          <text x="4" y="22" className="fill-slate-500 text-[8px]">°C</text>
        </svg>
        <div className="relative h-20 w-full max-w-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden">
          {Array.from({ length: 16 }).map((_, i) => {
            const bx = (i % 4) * 22 + 14;
            const by = Math.floor(i / 4) * 16 + 10;
            const dx = Math.sin(i * 2.7) * 10 * spread;
            const dy = Math.cos(i * 1.9) * 6 * spread;
            return (
              <span
                key={i}
                className={`absolute w-3 h-3 rounded-full transition-transform duration-500 ${phase === 'solid' ? 'bg-slate-500' : phase === 'boiling' ? 'bg-amber-500' : 'bg-sky-500'}`}
                style={{ left: `${bx}%`, top: `${by}%`, transform: `translate(${dx}px, ${dy}px)` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------ 2.1 ionic vs covalent
export const BondingToggle: React.FC<{ mode: LanguageMode }> = ({ mode }) => {
  const [kind, setKind] = useState<'ionic' | 'covalent'>('ionic');
  const [moved, setMoved] = useState<boolean>(false);

  const ionic = kind === 'ionic';
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['ionic', 'covalent'] as const).map(k => (
          <button
            key={k}
            onClick={() => {
              setKind(k);
              setMoved(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              kind === k ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {k === 'ionic'
              ? mode === 'mn' ? 'Ионы холбоо (NaCl)' : 'Ionic bond (NaCl)'
              : mode === 'mn' ? 'Ковалент холбоо (H₂)' : 'Covalent bond (H₂)'}
          </button>
        ))}
      </div>

      <div className="relative h-44 rounded-2xl bg-gradient-to-b from-indigo-50 to-white dark:from-slate-950 dark:to-slate-900 border border-indigo-100 dark:border-slate-800 overflow-hidden">
        {ionic ? (
          <>
            <div className="absolute left-[18%] top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-indigo-200 dark:bg-indigo-900 flex items-center justify-center text-sm font-black text-indigo-900 dark:text-indigo-100 transition-all duration-700">
              {moved ? 'Na⁺' : 'Na'}
            </div>
            <div className="absolute left-[60%] top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-emerald-200 dark:bg-emerald-900 flex items-center justify-center text-sm font-black text-emerald-900 dark:text-emerald-100 transition-all duration-700">
              {moved ? 'Cl⁻' : 'Cl'}
            </div>
            <span
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-500 shadow transition-all duration-700"
              style={{ left: moved ? '60%' : '27%' }}
            />
          </>
        ) : (
          <>
            <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-sky-200 dark:bg-sky-900 flex items-center justify-center text-xs font-black text-sky-900 dark:text-sky-100">H</div>
            <div className="absolute left-[52%] top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-sky-200 dark:bg-sky-900 flex items-center justify-center text-xs font-black text-sky-900 dark:text-sky-100">H</div>
            <span className="absolute top-[42%] left-[44%] w-3 h-3 rounded-full bg-amber-500 shadow" />
            <span className="absolute top-[58%] left-[48%] w-3 h-3 rounded-full bg-amber-500 shadow" />
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
          {ionic
            ? mode === 'mn'
              ? 'Металл (Na) электроноо алдаж Na⁺ болно, бал металл (Cl) электрон авч Cl⁻ болно. Цахилгаан таталтаар тор үүснэ.'
              : 'The metal (Na) gives up an electron to become Na⁺, and the non-metal (Cl) takes it to become Cl⁻. Opposite charges attract into a lattice.'
            : mode === 'mn'
              ? 'Хоёр бал металл бус атом электрон хосыг хуваалцана. Хуваалцсан электрон хос хоёр атомыг холбоно.'
              : 'Two non-metal atoms share a pair of electrons. The shared pair holds the two atoms together.'}
        </p>
        <button
          onClick={() => setMoved(m => !m)}
          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
        >
          {mode === 'mn' ? (ionic ? 'Электроныг шилжүүлэх' : 'Хуваалцах') : ionic ? 'Transfer the electron' : 'Show the shared pair'}
        </button>
      </div>
    </div>
  );
};

// -------------------------------------------------------------- 1.2 mole map
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
              <rect x={n.x - 4} y={n.y} width={68} height={30} rx={8} className={focus === n.id ? 'fill-teal-500' : 'fill-slate-100 dark:fill-slate-800'} />
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

// ------------------------------------------------------------ 7.1 titration
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
          <path d="M60 20 L60 70 L20 175 Q18 186 30 186 L130 186 Q142 186 140 175 L100 70 L100 20 Z" className="fill-white dark:fill-slate-900 stroke-slate-400" strokeWidth={2} />
          <clipPath id="flask-clip">
            <path d="M60 20 L60 70 L20 175 Q18 186 30 186 L130 186 Q142 186 140 175 L100 70 L100 20 Z" />
          </clipPath>
          <rect x={0} y={186 - fill * 1.1} width={160} height={200} clipPath="url(#flask-clip)" style={{ fill: reached ? '#f472b6' : '#bae6fd', transition: 'all 0.4s ease' }} />
          <text x={80} y={198} textAnchor="middle" className="fill-slate-500 text-[9px]">
            {mode === 'mn' ? 'H₂SO₄ + фенолфталеин' : 'H₂SO₄ + phenolphthalein'}
          </text>
        </svg>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- 7.1 pH
export const PhScale: React.FC<{ mode: LanguageMode }> = ({ mode }) => {
  const [ph, setPh] = useState<number>(7);
  const hue = (ph / 14) * 270; // red (acid) → green (neutral) → violet (alkali), like universal indicator
  const hPlus = Math.pow(10, -ph);
  const kind = ph < 7 ? { en: 'acidic', mn: 'хүчиллэг' } : ph > 7 ? { en: 'alkaline', mn: 'шүлтлэг' } : { en: 'neutral', mn: 'саармаг' };

  return (
    <div className="space-y-3">
      <div className="h-10 rounded-xl border border-slate-200 dark:border-slate-800" style={{ background: `linear-gradient(90deg, hsl(0 90% 50%), hsl(60 90% 50%), hsl(120 80% 45%), hsl(200 85% 50%), hsl(270 80% 45%))` }}>
        <div className="h-full w-1 bg-slate-900 rounded transition-all duration-300" style={{ marginLeft: `${(ph / 14) * 100}%` }} />
      </div>
      <Slider label="pH" value={ph} min={0} max={14} step={0.5} onChange={setPh} />
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3" style={{ backgroundColor: `hsl(${hue} 85% 92%)` }}>
          <span className="w-6 h-6 rounded-full" style={{ backgroundColor: `hsl(${hue} 90% 50%)` }} />
          <span className="font-bold text-slate-800">
            <Bi mode={mode} en={kind.en} mn={kind.mn} />
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-slate-700 dark:text-slate-300">
          [H⁺] = {hPlus.toExponential(1)} mol/dm³
        </div>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400">
        {mode === 'mn'
          ? 'pH бага байх тусам [H⁺] ихэснэ. pH нэг нэгжээр буурахад [H⁺] 10 дахин өснө.'
          : 'The lower the pH, the higher [H⁺]. Each drop of one pH unit means ten times more H⁺.'}
      </p>
    </div>
  );
};

// ------------------------------------------------- 8.1 collision theory demo
export const CollisionDemo: React.FC<{ mode: LanguageMode }> = ({ mode }) => {
  const [temp, setTemp] = useState<number>(20);
  const [conc, setConc] = useState<number>(2);
  const [tick, setTick] = useState<number>(0);
  const count = 6 + conc * 4;
  const speed = 0.6 + temp / 40; // hotter particles move faster
  const threshold = 1.6; // activation energy, as a speed threshold

  // Deterministic particle paths, so the picture stays stable when a slider moves
  const parts = Array.from({ length: count }, (_, i) => {
    const seedX = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const seedY = (Math.cos(i * 78.233) * 12345.6789) % 1;
    const x = (Math.abs(seedX) * 80 + 10 + tick * speed * (i % 2 === 0 ? 1 : -1) * 6) % 100;
    const y = (Math.abs(seedY) * 80 + 10 + tick * speed * (i % 3 === 0 ? 1 : -0.5) * 4) % 100;
    return { x: Math.abs(x), y: Math.abs(y), hot: speed * (1 + (i % 4) * 0.3) > threshold };
  });
  const hotCount = parts.filter(p => p.hot).length;

  useEffect(() => {
    const id = window.setInterval(() => setTick(t => t + 1), 120);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-3">
        <Slider label={mode === 'mn' ? 'Температур' : 'Temperature'} value={temp} min={0} max={80} step={5} onChange={setTemp} unit="°C" />
        <Slider label={mode === 'mn' ? 'Концентраци (бөөмийн тоо)' : 'Concentration (particle count)'} value={conc} min={1} max={5} step={1} onChange={setConc} />
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
          <div className="font-bold text-slate-800 dark:text-slate-200">
            {mode === 'mn' ? 'Амжилттай мөргөлдөөн (orange)' : 'Successful collisions (orange)'}: {hotCount} / {count}
          </div>
          <div className="text-slate-600 dark:text-slate-400">
            {mode === 'mn'
              ? 'Температур нэмэгдэхэд илүү олон бөөм идэвхжүүлэх энергээс (Eₐ) давж, урвал хурдасна.'
              : 'Higher temperature gives more particles above the activation energy (Eₐ), so the reaction speeds up.'}
          </div>
        </div>
      </div>
      <div className="relative h-56 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden">
        {parts.map((p, i) => (
          <span
            key={i}
            className={`absolute w-3.5 h-3.5 rounded-full transition-[left,top] duration-150 ${p.hot ? 'bg-orange-500' : 'bg-sky-400'}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          />
        ))}
      </div>
    </div>
  );
};

// ------------------------------------------------------ 12.1 cation tests
const CATIONS = [
  { id: 'Cu2+', label: 'Cu²⁺', solution: '#7dd3fc', ppt: '#93c5fd', soluble: false, en: 'light blue precipitate, insoluble in excess', mn: 'цайвар цэнхэр тунадас, илүүдэлд уусахгүй' },
  { id: 'Fe2+', label: 'Fe²⁺', solution: '#d9f99d', ppt: '#4d7c0f', soluble: false, en: 'green precipitate, insoluble in excess', mn: 'ногоон тунадас, илүүдэлд уусахгүй' },
  { id: 'Fe3+', label: 'Fe³⁺', solution: '#fde68a', ppt: '#b45309', soluble: false, en: 'red-brown precipitate, insoluble in excess', mn: 'улаан-бор тунадас, илүүдэлд уусахгүй' },
  { id: 'Al3+', label: 'Al³⁺', solution: '#f8fafc', ppt: '#e2e8f0', soluble: true, en: 'white precipitate that dissolves in excess', mn: 'цагаан тунадас, илүүдэлд уусна' },
  { id: 'Zn2+', label: 'Zn²⁺', solution: '#f8fafc', ppt: '#e2e8f0', soluble: true, en: 'white precipitate that dissolves in excess', mn: 'цагаан тунадас, илүүдэлд уусна' }
];

export const CationTests: React.FC<{ mode: LanguageMode }> = ({ mode }) => {
  const { jumpToSimulator } = useApp();
  const [ionId, setIonId] = useState<string>('Cu2+');
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const ion = CATIONS.find(c => c.id === ionId) ?? CATIONS[0];

  const liquid = step === 2 && ion.soluble ? '#f8fafc' : step === 2 ? ion.solution : ion.solution;
  const precipitate = step >= 1 && !(step === 2 && ion.soluble);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {CATIONS.map(c => (
            <button
              key={c.id}
              onClick={() => {
                setIonId(c.id);
                setStep(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                ionId === c.id ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setStep(1)} className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold">
            {mode === 'mn' ? '+ NaOH(aq) нэмэх' : '+ NaOH(aq)'}
          </button>
          <button onClick={() => setStep(2)} disabled={step === 0} className="px-3 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 text-xs font-bold disabled:opacity-40">
            {mode === 'mn' ? '+ илүү NaOH' : '+ excess NaOH'}
          </button>
          <button onClick={() => setStep(0)} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold">
            {mode === 'mn' ? 'Дахин' : 'Reset'}
          </button>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
          {step === 0 && <span className="text-slate-600 dark:text-slate-400">{mode === 'mn' ? 'Эхлээд NaOH(aq) нэмнэ үү.' : 'Start by adding NaOH(aq).'}</span>}
          {step >= 1 && (
            <span className="font-bold text-slate-800 dark:text-slate-200">
              <Bi mode={mode} en={`With NaOH(aq): ${ion.en}.`} mn={`NaOH(aq)-тай: ${ion.mn}.`} />
            </span>
          )}
          {step === 2 && (
            <div className="mt-1 text-slate-700 dark:text-slate-300">
              <Bi
                mode={mode}
                en={ion.soluble ? 'Excess NaOH: the precipitate dissolves and the solution is colourless.' : 'Excess NaOH: the precipitate stays.'}
                mn={ion.soluble ? 'Илүүдэл NaOH: тунадас уусч, уусмал өнгөгүй болно.' : 'Илүүдэл NaOH: тунадас үлдэнэ.'}
              />
            </div>
          )}
        </div>
        <button
          onClick={() => jumpToSimulator('qualitative')}
          className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 hover:underline"
        >
          <Beaker className="w-3.5 h-3.5" />
          {mode === 'mn' ? 'Paper 6 лабаар бодитоор туршиж үзэх' : 'Try it in the Paper 6 lab'}
        </button>
      </div>

      <div className="flex justify-center">
        <svg viewBox="0 0 120 200" className="w-40 h-56">
          <rect x={42} y={10} width={36} height={170} rx={6} className="fill-white dark:fill-slate-900 stroke-slate-400" strokeWidth={2} />
          <clipPath id="tube-clip">
            <rect x={42} y={10} width={36} height={170} rx={6} />
          </clipPath>
          <rect x={42} y={70} width={36} height={110} clipPath="url(#tube-clip)" style={{ fill: liquid, transition: 'fill 0.6s ease' }} />
          {precipitate && (
            <rect x={42} y={150} width={36} height={30} clipPath="url(#tube-clip)" style={{ fill: ion.ppt, opacity: 0.95, transition: 'all 0.6s ease' }} />
          )}
          <text x={60} y={195} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 text-[11px] font-bold">{ion.label}</text>
        </svg>
      </div>
    </div>
  );
};

// --------------------------------------------------------- 21.1 Rf plate
export const RfPlate: React.FC<{ mode: LanguageMode }> = ({ mode }) => {
  const { jumpToSimulator } = useApp();
  const [front, setFront] = useState<number>(8);
  const [spot, setSpot] = useState<number>(3.6);
  const spotClamped = Math.min(spot, front);
  const rf = spotClamped / front;
  const baseline = 170;
  const top = 25;
  const spotY = baseline - rf * (baseline - top);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
      <div className="space-y-3">
        <Slider label={mode === 'mn' ? 'Уусгагчийн зах (суурь шугамаас)' : 'Solvent front (from baseline)'} value={front} min={4} max={10} step={0.5} onChange={setFront} unit="cm" />
        <Slider label={mode === 'mn' ? 'Толбо (суурь шугамаас)' : 'Spot (from baseline)'} value={spotClamped} min={0.5} max={10} step={0.1} onChange={setSpot} unit="cm" />
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
          <div>Rf = {spotClamped.toFixed(1)} ÷ {front.toFixed(1)} = <strong>{rf.toFixed(2)}</strong></div>
          <div className="text-slate-500">{mode === 'mn' ? 'Rf нь 0-ээс 1 хооронд байна.' : 'Rf is always between 0 and 1.'}</div>
        </div>
        <button onClick={() => jumpToSimulator('chromatography')} className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 hover:underline">
          <Ruler className="w-3.5 h-3.5" />
          {mode === 'mn' ? 'Хроматографийн лабаар туршиж үзэх' : 'Try the chromatography lab'}
        </button>
      </div>
      <div className="flex justify-center">
        <svg viewBox="0 0 120 200" className="w-40 h-56">
          <rect x={40} y={15} width={44} height={170} rx={4} className="fill-slate-100 dark:fill-slate-800 stroke-slate-400" strokeWidth={1.5} />
          <line x1={40} y1={baseline} x2={84} y2={baseline} className="stroke-slate-500" strokeWidth={1.5} strokeDasharray="3 2" />
          <text x={88} y={baseline + 3} className="fill-slate-500 text-[7px]">{mode === 'mn' ? 'суурь' : 'base'}</text>
          <line x1={40} y1={top} x2={84} y2={top} className="stroke-sky-500" strokeWidth={1.5} />
          <text x={88} y={top + 3} className="fill-sky-600 text-[7px]">{mode === 'mn' ? 'зах' : 'front'}</text>
          <circle cx={62} cy={spotY} r={5} className="fill-rose-500" style={{ transition: 'cy 0.5s ease' }} />
        </svg>
      </div>
    </div>
  );
};

// ---------------------------------------------------------- section router
const SIMS: Record<string, SimLink[]> = {
  'top-1-1': [{ titleEn: 'PhET · States of Matter', titleMn: 'PhET · Бодисын төлөв', url: 'https://phet.colorado.edu/en/simulations/states-of-matter' }],
  'top-2-1': [{ titleEn: 'PhET · Build an Atom', titleMn: 'PhET · Атом бүтээх', url: 'https://phet.colorado.edu/en/simulations/build-an-atom' }],
  'top-3-1': [
    { titleEn: 'PhET · Reactants, Products & Leftovers', titleMn: 'PhET · Урвалжид, бүтээгдэхүүн', url: 'https://phet.colorado.edu/en/simulations/reactants-products-and-leftovers' },
    { titleEn: 'PhET · Balancing Equations', titleMn: 'PhET · Тэгшитгэл тэнцүүлэх', url: 'https://phet.colorado.edu/en/simulations/balancing-chemical-equations' }
  ],
  'top-4-1': [{ titleEn: 'iWant2Study · Electrolysis Lab', titleMn: 'iWant2Study · Электролизийн лаб', url: 'https://sg.iwant2study.org/ospsg/index.php/interactive-resources/chemistry/03-chemistry-of-reactions/03-chemical-reactions/1271-electrolysis-virtual-lab-xapi' }],
  'top-7-1': [
    { titleEn: 'PhET · pH Scale', titleMn: 'PhET · pH шкал', url: 'https://phet.colorado.edu/en/simulations/ph-scale' },
    { titleEn: 'PhET · Acid-Base Solutions', titleMn: 'PhET · Хүчил-шүлтийн уусмал', url: 'https://phet.colorado.edu/en/simulations/acid-base-solutions' }
  ],
  'top-8-1': [{ titleEn: 'PhET · Reactions & Rates', titleMn: 'PhET · Урвал ба хурд', url: 'https://phet.colorado.edu/en/simulations/reactions-and-rates' }],
  'top-12-1': [],
  'top-21-1': [],
  // Sub-topics added from the syllabus (links checked to load)
  's-1-2': [{ titleEn: 'PhET · Diffusion', titleMn: 'PhET · Диффуз', url: 'https://phet.colorado.edu/en/simulations/diffusion' }],
  's-2-2': [{ titleEn: 'PhET · Build an Atom', titleMn: 'PhET · Атом бүтээх', url: 'https://phet.colorado.edu/en/simulations/build-an-atom' }],
  's-2-3': [{ titleEn: 'PhET · Isotopes & Atomic Mass', titleMn: 'PhET · Изотоп ба атомын масс', url: 'https://phet.colorado.edu/en/simulations/isotopes-and-atomic-mass' }],
  's-2-5': [{ titleEn: 'PhET · Build a Molecule', titleMn: 'PhET · Молекул бүтээх', url: 'https://phet.colorado.edu/en/simulations/build-a-molecule' }],
  's-11-1': [{ titleEn: 'PhET · Molecule Shapes', titleMn: 'PhET · Молекулын хэлбэр', url: 'https://phet.colorado.edu/en/simulations/molecule-shapes' }],
  's-6-3': [{ titleEn: 'JavaLab · Le Chatelier’s Principle', titleMn: 'JavaLab · Ле Шательегийн зарчим', url: 'https://javalab.org/en/le_chateliers_principle_pressure_en/' }],
  's-9-4': [{ titleEn: 'JavaLab · Activity Series of Metals', titleMn: 'JavaLab · Металлын идэвхийн цуврал', url: 'https://javalab.org/en/activity_series_of_metals_en/' }],
  's-11-8': [{ titleEn: 'JavaLab · Addition Polymerisation', titleMn: 'JavaLab · Нэмэлтийн полимержилт', url: 'https://javalab.org/en/addition_polymerization_en/' }],
  's-12-4': [
    { titleEn: 'JavaLab · Distillation', titleMn: 'JavaLab · Нэрэлт', url: 'https://javalab.org/en/distillation_en/' },
    { titleEn: 'JavaLab · Recrystallisation', titleMn: 'JavaLab · Дахин талстжуулалт', url: 'https://javalab.org/en/recrystallization_en/' }
  ]
};

export const LessonVisuals: React.FC<{ topicId: string }> = ({ topicId }) => {
  const { mode } = useLanguage();
  const sims = SIMS[topicId] ?? [];
  let body: React.ReactNode = null;

  if (topicId === 'top-1-1') {
    body = (
      <Card mode={mode} icon={<Thermometer className="w-4 h-4" />} titleEn="Heating curve: watch the particles and the temperature" titleMn="Халаалтын муруй: бөөмс ба температурыг харах">
        <HeatingCurve mode={mode} />
      </Card>
    );
  } else if (topicId === 'top-2-1') {
    body = (
      <Card mode={mode} icon={<Atom className="w-4 h-4" />} titleEn="Ionic or covalent? Watch how the bond forms" titleMn="Ионы эсвэл ковалент? Холбоо яаж үүсэхийг харах">
        <BondingToggle mode={mode} />
      </Card>
    );
  } else if (topicId === 'top-3-1') {
    body = (
      <div className="space-y-5">
        <Card mode={mode} icon={<Atom className="w-4 h-4" />} titleEn="Mole map: move between mass, particles, volume and concentration" titleMn="Моль зураглал: масс, бөөмийн тоо, эзлэхүүн, концентрацийн хооронд шилжих">
          <MoleMap mode={mode} />
        </Card>
        <Card mode={mode} icon={<Scale className="w-4 h-4" />} titleEn="Limiting reactant: 2H₂ + O₂ → 2H₂O" titleMn="Хязгаарлагч бодис: 2H₂ + O₂ → 2H₂O">
          <LimitingReactant mode={mode} />
        </Card>
      </div>
    );
  } else if (topicId === 'top-4-1') {
    body = (
      <Card mode={mode} icon={<Zap className="w-4 h-4" />} titleEn="Watch the ions move: predict the products" titleMn="Ионуудын хөдөлгөөнийг харах: бүтээгдэхүүнийг таамаглах">
        <ElectrolysisCell mode={mode} />
      </Card>
    );
  } else if (topicId === 'top-7-1') {
    body = (
      <div className="space-y-5">
        <Card mode={mode} icon={<FlaskConical className="w-4 h-4" />} titleEn="Titration: add NaOH and watch the end point" titleMn="Титрлэлт: NaOH нэмж төгсгөлийн цэгийг харах">
          <TitrationFlask mode={mode} />
        </Card>
        <Card mode={mode} icon={<Gauge className="w-4 h-4" />} titleEn="pH scale and hydrogen ions" titleMn="pH шкал ба устөрөгчийн ион">
          <PhScale mode={mode} />
        </Card>
      </div>
    );
  } else if (topicId === 'top-8-1') {
    body = (
      <Card mode={mode} icon={<Wind className="w-4 h-4" />} titleEn="Collision theory: change temperature and concentration" titleMn="Мөргөлдөөний онол: температур, концентрацийг өөрчлөх">
        <CollisionDemo mode={mode} />
      </Card>
    );
  } else if (topicId === 'top-12-1') {
    body = (
      <Card mode={mode} icon={<Droplets className="w-4 h-4" />} titleEn="Cation tests with NaOH(aq)" titleMn="NaOH(aq)-ээр катионы сорил">
        <CationTests mode={mode} />
      </Card>
    );
  } else if (topicId === 'top-21-1') {
    body = (
      <Card mode={mode} icon={<Sparkles className="w-4 h-4" />} titleEn="Paper chromatography: calculate Rf" titleMn="Цаасан хроматографи: Rf тооцоолох">
        <RfPlate mode={mode} />
      </Card>
    );
  }

  if (!body && sims.length === 0) return null;

  return (
    <div className="space-y-5">
      {body}
      {sims.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <SimLinks mode={mode} links={sims} />
        </div>
      )}
    </div>
  );
};
