import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChemText } from '../common/ChemText';
import { TrendActivity } from './TrendActivity';
import { SuccessiveIEActivity } from './SuccessiveIEActivity';
import { ConceptNetwork } from './ConceptNetwork';
import { BondingDotCross } from './BondingDotCross';
import {
  PERIOD_2_TRENDS,
  PERIOD_3_TRENDS,
  GROUP_1_TRENDS,
  GROUP_7_TRENDS,
  MASTER_TREND_RULES,
  TrendDataPoint,
  TrendRuleSummary
} from '../../data/periodicTrendsData';
import {
  Sparkles,
  Zap,
  TrendingUp,
  CircleDot,
  Flame,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  Activity,
  Droplets,
  Layers,
  FlaskConical,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sliders,
  Eye,
  Info,
  Compass
} from 'lucide-react';

type SubViewType = 'activity' | 'theory' | 'physical' | 'chemical';

// The lab has two tabs: the practice, and the theory and properties, whose three parts are chosen under the tab
const NAV_ITEMS: Array<{ key: 'activity' | 'theory'; en: string; mn: string; active: string; Icon: React.ComponentType<{ className?: string }> }> = [
  { key: 'activity', en: 'Practice: find the trend', mn: 'Дасгал: зүй тогтлыг олох', active: 'from-amber-500 to-rose-500', Icon: Sparkles },
  { key: 'theory', en: 'Theory and properties', mn: 'Онол ба шинж чанар', active: 'from-emerald-600 to-teal-600', Icon: Compass }
];

// The three parts of the theory and properties tab
const THEORY_PARTS: Array<{ key: SubViewType; en: string; mn: string; Icon: React.ComponentType<{ className?: string }> }> = [
  { key: 'theory', en: 'Trend network', mn: 'Зүй тогтлын сүлжээ', Icon: Compass },
  { key: 'physical', en: 'Physical', mn: 'Физик', Icon: CircleDot },
  { key: 'chemical', en: 'Chemical', mn: 'Хими', Icon: FlaskConical }
];

// The end labels of the top row, per rule: the elements at the start and the end of the period
const PERIOD_ENDS: Record<string, { startEn: string; startMn: string; endEn: string; endMn: string }> = {
  atomic_radius: { startEn: 'Start: Li, Na', startMn: 'Эхлэл: Li, Na', endEn: 'End: Ne, Ar', endMn: 'Төгсгөл: Ne, Ar' },
  electronegativity: { startEn: 'Start: Li, Na', startMn: 'Эхлэл: Li, Na', endEn: 'End: F', endMn: 'Төгсгөл: F' },
  ionization_energy: { startEn: 'Start: Li, Na', startMn: 'Эхлэл: Li, Na', endEn: 'End: He, Ne, Ar', endMn: 'Төгсгөл: He, Ne, Ar' },
  metallic_character: { startEn: 'Start: Li, Na', startMn: 'Эхлэл: Li, Na', endEn: 'End: F, Cl', endMn: 'Төгсгөл: F, Cl' },
  nonmetallic_reactivity: { startEn: 'Start: C, N, O', startMn: 'Эхлэл: C, N, O', endEn: 'End: F, Cl', endMn: 'Төгсгөл: F, Cl' }
};

// The key words under each reasoning card, so they match the rule shown
const REASONING_KEYWORDS: Record<string, { periodEn: string; periodMn: string; groupEn: string; groupMn: string }> = {
  atomic_radius: {
    periodEn: 'Nuclear charge (+Z) ↑ · Same electron shell · Shielding constant · Stronger pull',
    periodMn: 'Цөмийн цэнэг (+Z) ↑ · Ижил бүрхүүл · Халхлал тогтмол · Татах хүч ↑',
    groupEn: 'New electron shell added · Atomic radius ↑ · Shielding ↑ · Outer electron further',
    groupMn: 'Шинэ бүрхүүл нэмэгдэнэ · Атомын радиус ↑ · Халхлал ↑ · Гадаад электрон холдоно'
  },
  electronegativity: {
    periodEn: 'Nuclear charge (+Z) ↑ · Radius ↓ · Bonding pair pulled closer · Electronegativity ↑',
    periodMn: 'Цөмийн цэнэг (+Z) ↑ · Радиус ↓ · Холбооны хос электрон ойртоно · Цахилгаан сөрөг чанар ↑',
    groupEn: 'New shell added · Shielding ↑ · Bonding pair further away · Electronegativity ↓',
    groupMn: 'Шинэ бүрхүүл · Халхлал ↑ · Холбооны хос электрон холдоно · Цахилгаан сөрөг чанар ↓'
  },
  ionization_energy: {
    periodEn: 'Nuclear charge (+Z) ↑ · Radius ↓ · Stronger pull on valence electron · IE₁ ↑',
    periodMn: 'Цөмийн цэнэг (+Z) ↑ · Радиус ↓ · Валент электронд татах хүч ↑ · IE₁ ↑',
    groupEn: 'New shell added · Shielding ↑ · Valence electron further away · IE₁ ↓',
    groupMn: 'Шинэ бүрхүүл · Халхлал ↑ · Валент электрон холдоно · IE₁ ↓'
  },
  metallic_character: {
    periodEn: 'IE₁ ↑ · Electron gain favoured · Metallic character ↓',
    periodMn: 'IE₁ ↑ · Электрон авах хандлага ↑ · Металл шинж ↓',
    groupEn: 'IE₁ ↓ · Electron loss easier · Metallic character ↑',
    groupMn: 'IE₁ ↓ · Электрон алдах хялбар · Металл шинж ↑'
  },
  nonmetallic_reactivity: {
    periodEn: '7 valence e⁻ · Nuclear charge (+Z) ↑ · Electron gain favoured · Strong pull',
    periodMn: '7 валент e⁻ · Цөмийн цэнэг (+Z) ↑ · Электрон авах хандлага ↑ · Татах хүч ↑',
    groupEn: 'New shell added · Atomic radius ↑ · Attraction weaker · Reactivity ↓',
    groupMn: 'Шинэ бүрхүүл · Атомын радиус ↑ · Татах хүч буурна · Идэвх ↓'
  }
};

// Round the y-axis to steps of 1, 2, 2.5 or 5 times a power of ten, so the ticks read 350, 400, 450 and not 358, 403
const niceScale = (lo: number, hi: number, count = 4) => {
  const raw = Math.max((hi - lo) / count, 1e-9);
  const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map(f => f * magnitude).find(s => s >= raw) ?? magnitude * 10;
  const min = Math.floor(lo / step) * step;
  const max = Math.ceil(hi / step) * step;
  const ticks: number[] = [];
  for (let v = min; v <= max + step / 2; v += step) ticks.push(Number(v.toFixed(6)));
  return { min, max, ticks };
};

export const PeriodicTrendsLab: React.FC = () => {
  const { mode } = useLanguage();
  const [activeSubView, setActiveSubView] = useState<SubViewType>('activity');
  const [practice, setPractice] = useState<'trend' | 'ie'>('trend');

  // Master Diagram State
  const [selectedRuleId, setSelectedRuleId] = useState<string>('atomic_radius');

  // Graph State
  const [graphMode, setGraphMode] = useState<'period' | 'group'>('period');
  const [selectedPeriod, setSelectedPeriod] = useState<2 | 3 | 'both'>(3);
  const [selectedGroup, setSelectedGroup] = useState<'group1' | 'group7'>('group1');
  const [selectedMetric, setSelectedMetric] = useState<'atomicRadiusPm' | 'electronegativity' | 'firstIonizationEnergy' | 'meltingPointC'>('atomicRadiusPm');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<TrendDataPoint | null>(null);

  // Simulation 1: Atomic Contraction State
  const [contractionIndex, setContractionIndex] = useState<number>(0); // 0 = Na, 7 = Ar
  const activeContractionEl = PERIOD_3_TRENDS[contractionIndex];

  // Simulation 2: Group 1 Water Reaction State
  const [selectedG1Metal, setSelectedG1Metal] = useState<number>(11); // Na default
  const [reactionStage, setReactionStage] = useState<'idle' | 'reacting' | 'finished'>('idle');
  const [reactionProgress, setReactionProgress] = useState<number>(0);
  const [indicatorAdded, setIndicatorAdded] = useState<boolean>(true);

  // Simulation 3: Group 7 Halogen Displacement State
  const [selectedHalide, setSelectedHalide] = useState<'KCl' | 'KBr' | 'KI'>('KBr');
  const [addedHalogen, setAddedHalogen] = useState<'none' | 'Cl2' | 'Br2' | 'I2'>('none');
  const [halogenSublimation, setHalogenSublimation] = useState<boolean>(false);
  const [previewHalogen, setPreviewHalogen] = useState<'F2' | 'Cl2' | 'Br2' | 'I2'>('Br2');

  // Simulation 4: Electronegativity & Bond Polarity
  const [elementA, setElementA] = useState<string>('Na');
  const [elementB, setElementB] = useState<string>('Cl');

  // Master Rule selected object
  const activeRule = MASTER_TREND_RULES.find(r => r.id === selectedRuleId) || MASTER_TREND_RULES[0];
  const periodEnds = PERIOD_ENDS[activeRule.id] ?? PERIOD_ENDS.atomic_radius;
  const keywords = REASONING_KEYWORDS[activeRule.id] ?? REASONING_KEYWORDS.atomic_radius;

  // Handle Group 1 Reaction Animation
  useEffect(() => {
    let timer: any;
    if (reactionStage === 'reacting') {
      const interval = setInterval(() => {
        setReactionProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setReactionStage('finished');
            return 100;
          }
          return prev + 2.5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [reactionStage]);

  const handleStartG1Reaction = () => {
    setReactionProgress(0);
    setReactionStage('reacting');
  };

  const handleResetG1Reaction = () => {
    setReactionProgress(0);
    setReactionStage('idle');
  };

  const currentG1Data = GROUP_1_TRENDS.find(m => m.z === selectedG1Metal) || GROUP_1_TRENDS[1];

  // Metric label metadata
  const metricMeta = {
    atomicRadiusPm: {
      labelEn: 'Atomic Radius (pm)',
      labelMn: 'Атомын радиус (пм)',
      unit: 'pm',
      color: '#3b82f6',
      badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    electronegativity: {
      labelEn: 'Electronegativity (Pauling)',
      labelMn: 'Цахилгаан сөрөг чанар (Полинг)',
      unit: '',
      color: '#f59e0b',
      badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    firstIonizationEnergy: {
      labelEn: '1st Ionization Energy (kJ/mol)',
      labelMn: 'Иончлолын 1-р энерги (кЖ/моль)',
      unit: 'kJ/mol',
      color: '#a855f7',
      badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    },
    meltingPointC: {
      labelEn: 'Melting Point (°C)',
      labelMn: 'Хайлах температур (°C)',
      unit: '°C',
      color: '#ef4444',
      badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
    }
  };

  const inTheory = activeSubView !== 'activity';

  return (
    <div className="space-y-6">
      {/* Subview Navigation Bar with Vibrant Accents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        {NAV_ITEMS.map(item => (
          <button
            key={item.key}
            onClick={() => setActiveSubView(item.key === 'activity' ? 'activity' : inTheory ? activeSubView : 'theory')}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs min-w-0 text-left ${
              (item.key === 'activity' ? activeSubView === 'activity' : inTheory)
                ? `bg-gradient-to-r ${item.active} text-white shadow-md ring-2 ring-white/60`
                : 'bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <item.Icon className="w-4 h-4 shrink-0" />
            <span>{mode === 'mn' ? item.mn : item.en}</span>
          </button>
        ))}
      </div>

      {inTheory && (
        <div className="flex flex-wrap gap-2">
          {THEORY_PARTS.map(part => (
            <button
              key={part.key}
              onClick={() => setActiveSubView(part.key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                activeSubView === part.key
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
              }`}
            >
              <part.Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{mode === 'mn' ? part.mn : part.en}</span>
            </button>
          ))}
        </div>
      )}

      {/* Practice: find the trend, or successive ionisation energies */}
      {activeSubView === 'activity' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs">
            <button onClick={() => setPractice('trend')} className={`px-3 py-1.5 rounded-xl border font-bold ${practice === 'trend' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}>
              {mode === 'mn' ? 'Зүй тогтлыг олох' : 'Find the trend'}
            </button>
            <button onClick={() => setPractice('ie')} className={`px-3 py-1.5 rounded-xl border font-bold ${practice === 'ie' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}>
              {mode === 'mn' ? 'Дараалсан ионжих энерги' : 'Successive ionisation energies'}
            </button>
          </div>
          {practice === 'trend' ? <TrendActivity mn={mode === 'mn'} /> : <SuccessiveIEActivity mn={mode === 'mn'} />}
        </div>
      )}

      {activeSubView === 'theory' && <ConceptNetwork mn={mode === 'mn'} />}

      {activeSubView === 'theory' && (
        <div className="space-y-6">
          {/* Trend Selection Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {MASTER_TREND_RULES.map(rule => {
              const isSelected = rule.id === selectedRuleId;
              return (
                <button
                  key={rule.id}
                  onClick={() => setSelectedRuleId(rule.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between relative overflow-hidden group ${
                    isSelected
                      ? `bg-gradient-to-br ${rule.color} text-white border-transparent shadow-lg ring-2 ring-white/30 scale-[1.02]`
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black tracking-wide">
                      {mode === 'mn' ? rule.titleMn : rule.titleEn}
                    </span>
                    <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                  <div className={`text-[11px] leading-tight ${isSelected ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                    {mode === 'mn' ? rule.summaryMn : rule.summaryEn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Master Visual Schematic Diagram: 2D Stylized Periodic Table with Glowing Vectors */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white relative overflow-hidden shadow-xl">
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: activeRule.glowColor }}
            />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 font-mono text-[11px] font-bold">
                      Cambridge 0620 · 2026–2028
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {mode === 'mn' ? 'Зүй тогтлын векторууд ба механизм' : 'Periodic trend vectors & mechanisms'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black mt-1 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-100 dark:to-slate-400">
                    {mode === 'mn' ? activeRule.titleMn : activeRule.titleEn}
                  </h3>
                </div>

                <div className="flex items-center gap-3 bg-white dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 dark:text-slate-400">{mode === 'mn' ? 'Үеийн дагуу:' : 'Across Period:'}</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {activeRule.directionPeriod === 'left-to-right-increases'
                        ? (mode === 'mn' ? 'Өснө (зүүнээс баруун)' : 'Increases (left → right)')
                        : (mode === 'mn' ? 'Буурна (зүүнээс баруун)' : 'Decreases (left → right)')}
                    </span>
                  </div>
                  <span className="text-slate-400 dark:text-slate-600">|</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 dark:text-slate-400">{mode === 'mn' ? 'Бүлгийн дагуу:' : 'Down Group:'}</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">
                      {activeRule.directionGroup === 'top-to-bottom-increases'
                        ? (mode === 'mn' ? 'Өснө (дээрээс доош)' : 'Increases (top → bottom)')
                        : (mode === 'mn' ? 'Буурна (дээрээс доош)' : 'Decreases (top → bottom)')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vector Periodic Table Blueprint */}
              <div className="relative w-full max-w-4xl mx-auto py-6">
                {/* Top Vector Arrow (Across Period: Left to Right) */}
                <div className="relative flex items-center justify-between px-6 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    <span>{mode === 'mn' ? periodEnds.startMn : periodEnds.startEn}</span>
                  </div>

                  {/* Dynamic Glowing Across Arrow */}
                  <div className="flex-1 mx-4 relative flex items-center">
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 animate-pulse"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${activeRule.glowColor.replace('0.4', '1')}, #38bdf8)`
                        }}
                      />
                    </div>
                    {/* Arrow Head */}
                    {activeRule.directionPeriod === 'left-to-right-increases' ? (
                      <div className="flex items-center text-xs font-bold font-mono text-amber-700 dark:text-amber-300 ml-2 animate-bounce">
                        <ArrowRight className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        <span>{mode === 'mn' ? 'ӨСНӨ (INCREASES)' : 'INCREASES'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-xs font-bold font-mono text-cyan-700 dark:text-cyan-300 ml-2 animate-pulse">
                        <ArrowRight className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        <span>{mode === 'mn' ? 'БУУРНА (DECREASES)' : 'DECREASES'}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    <span>{mode === 'mn' ? periodEnds.endMn : periodEnds.endEn}</span>
                  </div>
                </div>

                {/* Center Schematic Periodic Table Wireframe */}
                <div className="relative grid grid-cols-12 gap-2 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-500/60 shadow-xl">
                  {/* Left Group Column (Alkali & Alkaline) */}
                  <div className="col-span-2 space-y-2">
                    <div className="h-14 rounded-xl bg-gradient-to-r from-rose-100 to-rose-50 dark:from-rose-500/30 dark:to-rose-500/10 border border-rose-300 dark:border-rose-500/40 p-2 flex flex-col justify-between">
                      <span className="text-[10px] font-mono text-rose-700 dark:text-rose-300 font-bold">Group I</span>
                      <span className="text-xs font-black text-rose-900 dark:text-rose-200">Li, Na, K, Rb, Cs</span>
                    </div>
                    <div className="h-14 rounded-xl bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-500/30 dark:to-amber-500/10 border border-amber-300 dark:border-amber-500/40 p-2 flex flex-col justify-between">
                      <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 font-bold">Group II</span>
                      <span className="text-xs font-black text-amber-900 dark:text-amber-200">Be, Mg, Ca, Sr, Ba</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-[10px] text-slate-500 dark:text-slate-400 text-center font-mono">
                      {mode === 'mn' ? 'Металл (s-блок)' : 'Metals (s-block)'}
                    </div>
                  </div>

                  {/* Middle Transition Block */}
                  <div className="col-span-6 flex flex-col justify-between p-3 rounded-xl bg-gradient-to-b from-sky-100 to-sky-50 dark:from-sky-500/20 dark:to-sky-500/5 border border-sky-300 dark:border-sky-500/30">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-sky-700 dark:text-sky-300">
                      <span>{mode === 'mn' ? 'Шилжилтийн элементүүд (3–12 бүлэг)' : 'Transition elements (groups 3–12)'}</span>
                      <span className="text-[10px] text-sky-600 dark:text-sky-400">Sc → Zn</span>
                    </div>

                    {/* Central Schematic Indicator */}
                    <div className="text-center my-auto p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 space-y-1">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block">
                        {mode === 'mn' ? 'Зүй тогтлын зарчим' : 'Governing Principle'}
                      </span>
                      <div className="text-sm font-black text-emerald-700 dark:text-emerald-400">
                        {mode === 'mn'
                          ? 'Гаднах электроны тоо ижил → нэг бүлэг, ижил химийн шинж'
                          : 'Same outer electrons → same group, similar chemistry'}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-mono">
                      {mode === 'mn' ? 'Нягт ба хайлах цэг өндөр · Өнгөт нэгдэл · Катализатор' : 'High density and melting point · Coloured compounds · Catalysts'}
                    </div>
                  </div>

                  {/* Right Non-metals & Noble Gases Block */}
                  <div className="col-span-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-14 rounded-xl bg-gradient-to-r from-emerald-100 to-emerald-50 dark:from-emerald-500/30 dark:to-emerald-500/10 border border-emerald-300 dark:border-emerald-500/40 p-2 flex flex-col justify-between">
                        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">{mode === 'mn' ? 'Металл бус' : 'Non-metals'}</span>
                        <span className="text-xs font-black text-emerald-900 dark:text-emerald-200">C, N, O, P, S</span>
                      </div>
                      <div className="h-14 rounded-xl bg-gradient-to-r from-cyan-100 to-cyan-50 dark:from-cyan-500/30 dark:to-cyan-500/10 border border-cyan-300 dark:border-cyan-500/40 p-2 flex flex-col justify-between">
                        <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-300 font-bold">Group VII</span>
                        <span className="text-xs font-black text-cyan-900 dark:text-cyan-200">F, Cl, Br, I</span>
                      </div>
                    </div>
                    <div className="h-12 rounded-xl bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-500/30 dark:to-purple-500/10 border border-purple-300 dark:border-purple-500/40 p-2 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 font-bold">{mode === 'mn' ? 'VIII / 0 бүлэг: идэвхгүй хий' : 'Group VIII / 0: noble gases'}</span>
                      <span className="text-xs font-black text-purple-900 dark:text-purple-200">He, Ne, Ar, Kr, Xe</span>
                    </div>
                  </div>

                  {/* Left Side Downward Arrow Overlay */}
                  <div className="absolute -left-12 top-6 bottom-6 flex flex-col items-center justify-center">
                    <div className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 mb-1">
                      {mode === 'mn' ? 'Бүлэг' : 'Group'}
                    </div>
                    {activeRule.directionGroup === 'top-to-bottom-increases' ? (
                      <div className="flex flex-col items-center text-cyan-600 dark:text-cyan-400 animate-bounce">
                        <span className="text-[9px] font-bold font-mono writing-mode-vertical">
                          {mode === 'mn' ? 'ӨСНӨ' : 'INCREASES'}
                        </span>
                        <ArrowDown className="w-5 h-5 mt-1 text-cyan-600 dark:text-cyan-400" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-amber-600 dark:text-amber-400 animate-pulse">
                        <span className="text-[9px] font-bold font-mono writing-mode-vertical">
                          {mode === 'mn' ? 'БУУРНА' : 'DECREASES'}
                        </span>
                        <ArrowDown className="w-5 h-5 mt-1 text-amber-600 dark:text-amber-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Cambridge Explanation Deck (Paper 4 / 6 Reasoning) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Period Reasoning */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-600 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                    <ArrowRight className="w-4 h-4" />
                    <span>
                      {mode === 'mn'
                        ? 'ҮЕИЙН ДАГУУ (Зүүнээс Баруун тийш) ШАЛТГААН:'
                        : 'ACROSS PERIOD REASONING (exam style):'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {mode === 'mn' ? activeRule.reasonPeriodMn : activeRule.reasonPeriodEn}
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 border-t border-slate-200 dark:border-slate-800">
                    {mode === 'mn' ? 'Гол түлхүүр үгс: ' : 'Key keywords: '}{mode === 'mn' ? keywords.periodMn : keywords.periodEn}
                  </div>
                </div>

                {/* Group Reasoning */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-600 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                    <ArrowDown className="w-4 h-4" />
                    <span>
                      {mode === 'mn'
                        ? 'БҮЛГИЙН ДАГУУ (Дээрээс Доош) ШАЛТГААН:'
                        : 'DOWN GROUP REASONING (exam style):'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {mode === 'mn' ? activeRule.reasonGroupMn : activeRule.reasonGroupEn}
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 border-t border-slate-200 dark:border-slate-800">
                    {mode === 'mn' ? 'Гол түлхүүр үгс: ' : 'Key keywords: '}{mode === 'mn' ? keywords.groupMn : keywords.groupEn}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE TREND GRAPHS (БҮДҮҮВЧ ГРАФИК) */}
      {activeSubView === 'theory' && (
        <div className="space-y-6">
          {/* Controls: Period vs Group Mode and Metric Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                {mode === 'mn' ? 'Графикийн төрөл:' : 'Graph Category:'}
              </span>
              <div className="flex p-0.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                <button
                  onClick={() => setGraphMode('period')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    graphMode === 'period'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {mode === 'mn' ? 'Үеийн дагуу (Period 2 & 3)' : 'Across Period (2 & 3)'}
                </button>
                <button
                  onClick={() => setGraphMode('group')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    graphMode === 'group'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {mode === 'mn' ? 'Бүлгийн дагуу (Group I & VII)' : 'Down Group (I & VII)'}
                </button>
              </div>
            </div>

            {/* Filter Buttons */}
            {graphMode === 'period' ? (
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-400">{mode === 'mn' ? 'Үе сонгох:' : 'Select Period:'}</span>
                <button
                  onClick={() => setSelectedPeriod(2)}
                  className={`px-2.5 py-1 rounded-lg border font-bold ${
                    selectedPeriod === 2
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {mode === 'mn' ? '2-р үе (Li–Ne)' : 'Period 2 (Li–Ne)'}
                </button>
                <button
                  onClick={() => setSelectedPeriod(3)}
                  className={`px-2.5 py-1 rounded-lg border font-bold ${
                    selectedPeriod === 3
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {mode === 'mn' ? '3-р үе (Na–Ar)' : 'Period 3 (Na–Ar)'}
                </button>
                <button
                  onClick={() => setSelectedPeriod('both')}
                  className={`px-2.5 py-1 rounded-lg border font-bold ${
                    selectedPeriod === 'both'
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {mode === 'mn' ? 'Хоёулаа (2 ба 3)' : 'Both (2 & 3)'}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-400">{mode === 'mn' ? 'Бүлэг сонгох:' : 'Select Group:'}</span>
                <button
                  onClick={() => setSelectedGroup('group1')}
                  className={`px-3 py-1 rounded-lg border font-bold ${
                    selectedGroup === 'group1'
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {mode === 'mn' ? 'I бүлэг (Li → Cs)' : 'Group I (Alkali: Li → Cs)'}
                </button>
                <button
                  onClick={() => setSelectedGroup('group7')}
                  className={`px-3 py-1 rounded-lg border font-bold ${
                    selectedGroup === 'group7'
                      ? 'bg-cyan-500 text-white border-cyan-500'
                      : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {mode === 'mn' ? 'VII бүлэг (F₂ → At₂)' : 'Group VII (Halogens: F₂ → At₂)'}
                </button>
              </div>
            )}

            {/* Metric Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold no-scrollbar">
              <button
                onClick={() => setSelectedMetric('atomicRadiusPm')}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedMetric === 'atomicRadiusPm'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {mode === 'mn' ? 'Атомын радиус' : 'Radius (pm)'}
              </button>
              <button
                onClick={() => setSelectedMetric('electronegativity')}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedMetric === 'electronegativity'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {mode === 'mn' ? 'Цахилгаан сөрөг' : 'Electronegativity'}
              </button>
              <button
                onClick={() => setSelectedMetric('firstIonizationEnergy')}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedMetric === 'firstIonizationEnergy'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {mode === 'mn' ? 'Иончлолын 1-р энерги' : '1st IE (kJ/mol)'}
              </button>
              <button
                onClick={() => setSelectedMetric('meltingPointC')}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedMetric === 'meltingPointC'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {mode === 'mn' ? 'Хайлах температур (°C)' : 'Melting Point (°C)'}
              </button>
            </div>
          </div>

          {/* SVG Dynamic Line Graph Canvas */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${metricMeta[selectedMetric].badge}`}>
                  {mode === 'mn' ? metricMeta[selectedMetric].labelMn : metricMeta[selectedMetric].labelEn}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {graphMode === 'period'
                    ? `Period ${selectedPeriod === 'both' ? '2 & 3' : selectedPeriod}`
                    : selectedGroup === 'group1'
                    ? 'Group I (Alkali Metals)'
                    : 'Group VII (Halogens)'}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {mode === 'mn' ? 'Цэг дээр хулганаа авчирч мэдээллийг харна уу' : 'Hover over data points to inspect exam notes'}
              </span>
            </div>

            {/* SVG Render Function */}
            {(() => {
              // Gather active series
              let seriesData: { label: string; color: string; points: TrendDataPoint[] }[] = [];

              if (graphMode === 'period') {
                if (selectedPeriod === 2 || selectedPeriod === 'both') {
                  seriesData.push({
                    label: 'Period 2 (Li–Ne)',
                    color: '#8b5cf6', // Violet
                    points: PERIOD_2_TRENDS
                  });
                }
                if (selectedPeriod === 3 || selectedPeriod === 'both') {
                  seriesData.push({
                    label: 'Period 3 (Na–Ar)',
                    color: '#06b6d4', // Cyan
                    points: PERIOD_3_TRENDS
                  });
                }
              } else {
                if (selectedGroup === 'group1') {
                  seriesData.push({
                    label: 'Group I (Alkali Metals)',
                    color: '#f43f5e', // Rose
                    points: GROUP_1_TRENDS
                  });
                } else {
                  seriesData.push({
                    label: 'Group VII (Halogens)',
                    color: '#10b981', // Emerald
                    points: GROUP_7_TRENDS
                  });
                }
              }

              // Compute Y min and max across selected points
              const allValues = seriesData.flatMap(s => s.points.map(p => p[selectedMetric] as number));
              const minY = Math.min(...allValues);
              const maxY = Math.max(...allValues);
              const yMargin = (maxY - minY) * 0.12 || 10;
              const scale = niceScale(minY - yMargin, maxY + yMargin);
              const domainMin = scale.min;
              const domainMax = scale.max;

              const graphWidth = 720;
              const graphHeight = 300;
              const paddingLeft = 60;
              const paddingRight = 40;
              const paddingTop = 30;
              const paddingBottom = 50;

              const plotW = graphWidth - paddingLeft - paddingRight;
              const plotH = graphHeight - paddingTop - paddingBottom;

              const getY = (val: number) => {
                if (domainMax === domainMin) return paddingTop + plotH / 2;
                return paddingTop + plotH - ((val - domainMin) / (domainMax - domainMin)) * plotH;
              };

              const maxPointsCount = Math.max(...seriesData.map(s => s.points.length));
              const getX = (idx: number, total: number) => {
                return paddingLeft + (idx / Math.max(total - 1, 1)) * plotW;
              };

              return (
                <div className="relative overflow-x-auto">
                  <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-72 sm:h-80 select-none">
                    {/* Horizontal Grid lines */}
                    {scale.ticks.map((val, i) => {
                      const yPos = getY(val);
                      return (
                        <g key={i}>
                          <line
                            x1={paddingLeft}
                            y1={yPos}
                            x2={graphWidth - paddingRight}
                            y2={yPos}
                            className="stroke-slate-200 dark:stroke-slate-800"
                            strokeDasharray="4,4"
                          />
                          <text
                            x={paddingLeft - 8}
                            y={yPos + 4}
                            textAnchor="end"
                            className="text-[10px] font-mono fill-slate-400 font-bold"
                          >
                            {Number(val.toFixed(2))}
                          </text>
                        </g>
                      );
                    })}

                    {/* Unit of the y-axis */}
                    <text x={paddingLeft - 8} y={paddingTop - 12} textAnchor="end" className="text-[10px] font-mono fill-slate-500 font-bold">
                      {metricMeta[selectedMetric].unit}
                    </text>

                    {/* Plot Series Lines and Paths */}
                    {seriesData.map((series, sIdx) => {
                      const coords = series.points.map((pt, pIdx) => ({
                        x: getX(pIdx, series.points.length),
                        y: getY(pt[selectedMetric] as number),
                        pt
                      }));

                      const pathD = coords.reduce(
                        (acc, c, idx) => (idx === 0 ? `M ${c.x} ${c.y}` : `${acc} L ${c.x} ${c.y}`),
                        ''
                      );

                      return (
                        <g key={sIdx}>
                          {/* Smooth Glow Path */}
                          <path
                            d={pathD}
                            fill="none"
                            stroke={series.color}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-md"
                          />

                          {/* Data points */}
                          {coords.map((c, pIdx) => {
                            const isHovered = hoveredDataPoint?.symbol === c.pt.symbol;
                            return (
                              <g
                                key={pIdx}
                                className="cursor-pointer group"
                                onMouseEnter={() => setHoveredDataPoint(c.pt)}
                                onMouseLeave={() => setHoveredDataPoint(null)}
                              >
                                <circle
                                  cx={c.x}
                                  cy={c.y}
                                  r={isHovered ? 8 : 5}
                                  fill={series.color}
                                  className="stroke-white dark:stroke-slate-950 transition-all duration-150"
                                  strokeWidth="2.5"
                                />

                                {/* Symbol label below point */}
                                <text
                                  x={c.x}
                                  y={graphHeight - paddingBottom + 18}
                                  textAnchor="middle"
                                  className={`text-[11px] font-black font-mono transition-colors ${
                                    isHovered ? 'fill-emerald-500 font-bold' : 'fill-slate-700 dark:fill-slate-300'
                                  }`}
                                >
                                  {c.pt.symbol}
                                </text>

                                {/* Group Roman / Z label */}
                                <text
                                  x={c.x}
                                  y={graphHeight - paddingBottom + 30}
                                  textAnchor="middle"
                                  className="text-[9px] font-mono fill-slate-400"
                                >
                                  {c.pt.groupRoman}
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              );
            })()}

            {/* Hovered Point Card with Cambridge Exam Insight */}
            {hoveredDataPoint && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center font-bold shadow-md">
                    <span className="text-[9px] font-mono opacity-80">{hoveredDataPoint.z}</span>
                    <span className="text-lg font-black leading-none">{hoveredDataPoint.symbol}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black flex items-center gap-2">
                      <span>{mode === 'mn' ? hoveredDataPoint.nameMn : hoveredDataPoint.nameEn}</span>
                      <span className="text-xs text-slate-400 font-mono">
                        (Group {hoveredDataPoint.groupRoman}, Period {hoveredDataPoint.period})
                      </span>
                    </h4>
                    <div className="text-xs text-slate-300 font-mono mt-0.5">
                      Config: [{hoveredDataPoint.electronConfig.join(', ')}] · Zeff: +{hoveredDataPoint.zEff}
                    </div>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4">
                  <div className="text-xs font-mono text-emerald-400 font-bold">
                    {mode === 'mn' ? metricMeta[selectedMetric].labelMn : metricMeta[selectedMetric].labelEn}:
                  </div>
                  <div className="text-xl font-mono font-black text-white">
                    {hoveredDataPoint[selectedMetric]} {metricMeta[selectedMetric].unit}
                  </div>
                </div>

                <div className="max-w-md text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
                  <span className="font-bold text-amber-400">Exam Note: </span>
                  {mode === 'mn' ? hoveredDataPoint.examNoteMn : hoveredDataPoint.examNoteEn}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: ATOMIC CONTRACTION & SHELL SIMULATION (АНИМАЦИ/СИМУЛЯЦИ) */}
      {activeSubView === 'physical' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white space-y-6 shadow-sm relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30 text-[11px] font-mono font-bold">
                  {mode === 'mn' ? 'Үе 3: электроны агшилт' : 'Period 3 Electronic Contraction'}
                </span>
                <h3 className="text-xl font-black mt-1">
                  {mode === 'mn'
                    ? 'Үеийн дагуух Атомын Агшилтын Интерактив Загварчлал'
                    : 'Interactive Atomic Radius Contraction Simulator'}
                </h3>
              </div>

              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {mode === 'mn' ? 'Слайдерыг хөдөлгөж атомын агшилтыг ажигла' : 'Slide across Period 3 to watch atomic shrinkage'}
              </div>
            </div>

            {/* Period 3 Element Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-rose-400">Na (Group 1, 186 pm)</span>
                <span className="text-slate-500 dark:text-slate-400">Period 3 (Z = 11 to 18)</span>
                <span className="text-cyan-600 dark:text-cyan-400">Ar (Group 0, 97 pm)</span>
              </div>

              <input
                type="range"
                min="0"
                max="7"
                step="1"
                value={contractionIndex}
                onChange={e => setContractionIndex(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              {/* Elements Quick Select Tabs */}
              <div className="grid grid-cols-8 gap-1.5">
                {PERIOD_3_TRENDS.map((el, idx) => (
                  <button
                    key={el.z}
                    onClick={() => setContractionIndex(idx)}
                    className={`py-2 rounded-xl text-center font-mono transition-all border ${
                      idx === contractionIndex
                        ? 'bg-cyan-500 text-white font-black border-cyan-300 shadow-md ring-2 ring-cyan-400/50'
                        : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{el.z}</div>
                    <div className="text-sm font-black">{el.symbol}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Central Animated Atomic Contraction Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left: Scaled Dynamic Bohr Model with Electrostatic Pull Arrows */}
              <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative min-h-[340px]">
                {/* SVG Scaled Atom */}
                {(() => {
                  // Max radius is 186 pm (Na), min is 97 pm (Ar)
                  // Let outer radius visually scale from 130px down to 75px
                  const scaleFactor = activeContractionEl.atomicRadiusPm / 186;
                  const outerR = 60 + 70 * scaleFactor;
                  const middleR = 48; // inner shells keep their size; only the outer shell shrinks
                  const innerR = 26;

                  return (
                    <svg viewBox="0 0 300 300" className="w-64 h-64 select-none">
                      {/* Outward electrostatic field circle */}
                      <circle
                        cx="150"
                        cy="150"
                        r={outerR + 10}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="1"
                        strokeDasharray="2,3"
                        opacity={0.3}
                      />

                      {/* Pull arrows towards nucleus */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
                        const rad = (deg * Math.PI) / 180;
                        const x1 = 150 + outerR * Math.cos(rad);
                        const y1 = 150 + outerR * Math.sin(rad);
                        const x2 = 150 + (outerR - 18) * Math.cos(rad);
                        const y2 = 150 + (outerR - 18) * Math.sin(rad);
                        return (
                          <line
                            key={deg}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#f59e0b"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            className="animate-pulse"
                          />
                        );
                      })}

                      {/* Shell 3 (Valence Shell) */}
                      <circle
                        cx="150"
                        cy="150"
                        r={outerR}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />

                      {/* Shell 2 (Inner 8 electrons) */}
                      <circle
                        cx="150"
                        cy="150"
                        r={middleR}
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="1.2"
                        strokeDasharray="3,3"
                        className="transition-all duration-300 opacity-60"
                      />

                      {/* Shell 1 (Inner 2 electrons) */}
                      <circle
                        cx="150"
                        cy="150"
                        r={innerR}
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="1.2"
                        strokeDasharray="3,3"
                        className="transition-all duration-300 opacity-60"
                      />

                      {/* Nucleus with Positive Charge */}
                      <circle
                        cx="150"
                        cy="150"
                        r="18"
                        fill="url(#nucleusGrad)"
                        className="stroke-amber-400/80 transition-all duration-300"
                        strokeWidth="2"
                      />
                      <defs>
                        <radialGradient id="nucleusGrad">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#b45309" />
                        </radialGradient>
                      </defs>

                      <text
                        x="150"
                        y="155"
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="900"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        +{activeContractionEl.z}
                      </text>

                      {/* Valence Electrons on Outer Shell */}
                      {Array.from({ length: activeContractionEl.outerElectrons }).map((_, eIdx) => {
                        const angle = (eIdx / activeContractionEl.outerElectrons) * 2 * Math.PI;
                        const cx = 150 + outerR * Math.cos(angle);
                        const cy = 150 + outerR * Math.sin(angle);
                        return (
                          <circle
                            key={eIdx}
                            cx={cx}
                            cy={cy}
                            r="4.5"
                            className="fill-cyan-400 stroke-white stroke-[1.5] transition-all duration-300"
                          />
                        );
                      })}
                    </svg>
                  );
                })()}

                <div className="text-center font-mono text-xs mt-3 text-cyan-700 dark:text-cyan-300">
                  <span className="font-bold">{activeContractionEl.nameEn} ({activeContractionEl.symbol})</span> · Radius: <span className="text-amber-600 dark:text-amber-400 font-black text-sm">{activeContractionEl.atomicRadiusPm} pm</span>
                </div>
              </div>

              {/* Right: Quantum Nuclear Parameters & Cambridge Explanation */}
              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px]">{mode === 'mn' ? 'Цөмийн цэнэг (протон):' : 'Nuclear charge (protons):'}</span>
                    <span className="text-xl font-black text-amber-600 dark:text-amber-400">+{activeContractionEl.z}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px]">{mode === 'mn' ? 'Дотоод халхлагч электрон:' : 'Inner shielding electrons:'}</span>
                    <span className="text-xl font-black text-slate-700 dark:text-slate-300">10 (1s² 2s² 2p⁶)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px]">{mode === 'mn' ? 'Үр дүнтэй цөмийн таталт (Zeff, протон − дотоод электрон):' : 'Effective nuclear pull (Zeff, protons − inner electrons):'}</span>
                    <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">+{activeContractionEl.zEff}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px]">{mode === 'mn' ? 'Гадна бүрхүүлийн электрон:' : 'Outer shell electrons:'}</span>
                    <span className="text-xl font-black text-cyan-600 dark:text-cyan-400">{activeContractionEl.outerElectrons} e⁻</span>
                  </div>
                </div>

                {/* Explanation Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{mode === 'mn' ? 'Кэмбрижийн шалгалтын асуулт:' : 'Exam-style question:'}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic">
                    {mode === 'mn'
                      ? '"Электрон нэмэгдэж байхад 3-р үеийн дагуу атомын радиус яагаад багасдаг вэ?"'
                      : '"Explain why the atomic radius decreases from sodium to chlorine across Period 3."'}
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] leading-relaxed">
                    <span className="font-bold">{mode === 'mn' ? 'Оноолтын схем: ' : 'Mark scheme: '}</span>
                    {mode === 'mn'
                      ? '1) Цөмийн протон (цэнэг) нэмэгдэнэ (+11 → +17). 2) Электронууд ижил 3 дахь бүрхүүлд нэмэгдэх тул дотоод халхлалт ойролцоо тогтмол байна. 3) Цөмийн татах хүч илүү хүчтэй болж гадаад бүрхүүлийг төв рүүгээ татаж атом агшина.'
                      : '1) Nuclear charge (number of protons) increases (+11 to +17). 2) Shielding by inner electron shells remains approximately constant (electrons are added to the same 3rd shell). 3) Stronger electrostatic attraction pulls outer electrons closer to the nucleus.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: GROUP I ALKALI METALS REACTION WITH WATER (GIF/СИМУЛЯЦИ) */}
      {activeSubView === 'chemical' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-6 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-mono font-bold">
                  Cambridge Paper 6 & 4 Required Lab
                </span>
                <h3 className="text-xl font-black mt-1">
                  {mode === 'mn'
                    ? '1-р бүлгийн металлууд устай урвалдах виртуал туршилт'
                    : 'Group I Alkali Metals + Cold Water Animated Simulation'}
                </h3>
              </div>

              {/* Indicator Toggle */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">{mode === 'mn' ? 'Фенолфталейн:' : 'Phenolphthalein:'}</span>
                <button
                  onClick={() => setIndicatorAdded(!indicatorAdded)}
                  className={`px-3 py-1 rounded-xl font-bold border transition-all ${
                    indicatorAdded
                      ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-xs'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {indicatorAdded ? (mode === 'mn' ? 'Нэмсэн (ягаан болно)' : 'Added (turns pink)') : (mode === 'mn' ? 'Үгүй' : 'None')}
                </button>
              </div>
            </div>

            {/* Select Alkali Metal */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {GROUP_1_TRENDS.map(metal => {
                const isSelected = metal.z === selectedG1Metal;
                return (
                  <button
                    key={metal.z}
                    onClick={() => {
                      setSelectedG1Metal(metal.z);
                      handleResetG1Reaction();
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-b from-rose-500 to-amber-600 text-white border-white/40 shadow-lg scale-102 ring-2 ring-rose-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-mono opacity-80">Z = {metal.z}</div>
                    <div className="text-lg font-black">{metal.symbol}</div>
                    <div className="text-[11px] font-bold">{mode === 'mn' ? metal.nameMn : metal.nameEn}</div>
                  </button>
                );
              })}
            </div>

            {/* Reaction Beaker Chamber Simulation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Beaker Canvas */}
              <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[380px] overflow-hidden">
                {/* SVG Beaker Graphic */}
                <div className="relative w-72 h-80">
                  <svg viewBox="0 0 240 280" className="w-full h-full select-none">
                    {/* Glass Beaker Body */}
                    <rect x="25" y="20" width="190" height="230" rx="16" fill="none" stroke="#64748b" strokeWidth="4" />
                    {/* Beaker Pour Spout */}
                    <path d="M 25 30 L 15 20" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                    {/* Beaker Volume Graduations */}
                    <line x1="30" y1="80" x2="50" y2="80" stroke="#64748b" strokeWidth="2" opacity="0.6" />
                    <line x1="30" y1="130" x2="60" y2="130" stroke="#64748b" strokeWidth="2" opacity="0.6" />
                    <line x1="30" y1="180" x2="50" y2="180" stroke="#64748b" strokeWidth="2" opacity="0.6" />
                    <text x="65" y="134" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                      150 ml
                    </text>

                    {/* Water Fluid in Beaker */}
                    <rect
                      x="28"
                      y="70"
                      width="184"
                      height="176"
                      rx="8"
                      fill={
                        reactionProgress > 20 && indicatorAdded
                          ? 'url(#alkalineWaterGrad)'
                          : 'url(#plainWaterGrad)'
                      }
                      className="transition-all duration-500"
                    />

                    <defs>
                      <linearGradient id="plainWaterGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.5" />
                      </linearGradient>
                      <linearGradient id="alkalineWaterGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.65" />
                        <stop offset="100%" stopColor="#be185d" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* Water Meniscus Top Curve */}
                    <ellipse cx="120" cy="70" rx="92" ry="10" fill="#38bdf8" opacity="0.4" />

                    {/* Metal Pellet Motion on Surface */}
                    {reactionStage === 'reacting' && (
                      <g>
                        {/* Sodium melts into ball, Lithium floats, Potassium ignites */}
                        {currentG1Data.symbol === 'Li' && (
                          <g className="animate-pulse">
                            <circle cx="100" cy="65" r="9" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
                            {/* H2 bubbles */}
                            <circle cx="95" cy="55" r="3" fill="#ffffff" opacity="0.8" />
                            <circle cx="105" cy="50" r="4" fill="#ffffff" opacity="0.7" />
                            <circle cx="98" cy="42" r="3.5" fill="#ffffff" opacity="0.6" />
                          </g>
                        )}

                        {currentG1Data.symbol === 'Na' && (
                          <g
                            style={{
                              transform: `translateX(${Math.sin((reactionProgress / 10) * Math.PI) * 40}px)`
                            }}
                          >
                            {/* Molten shiny sphere */}
                            <circle cx="120" cy="66" r="8" fill="#e2e8f0" stroke="#f59e0b" strokeWidth="2" />
                            {/* Yellow sparks and steam */}
                            <path d="M 120 60 L 122 45 L 126 50" stroke="#f59e0b" strokeWidth="2" />
                            <circle cx="118" cy="48" r="3" fill="#fde047" />
                            <circle cx="124" cy="40" r="4" fill="#ffffff" opacity="0.7" />
                          </g>
                        )}

                        {currentG1Data.symbol === 'K' && (
                          <g
                            style={{
                              transform: `translateX(${Math.cos((reactionProgress / 8) * Math.PI) * 45}px)`
                            }}
                          >
                            <circle cx="120" cy="66" r="8" fill="#c084fc" />
                            {/* Lilac Flame (Characteristic exam observation!) */}
                            <path
                              d="M 120 66 Q 110 40 120 20 Q 130 40 120 66"
                              fill="#d8b4fe"
                              stroke="#a855f7"
                              strokeWidth="2"
                              className="animate-pulse"
                            />
                            {/* Crackle sparks */}
                            <circle cx="112" cy="30" r="2" fill="#e9d5ff" />
                            <circle cx="128" cy="25" r="2" fill="#f5d0fe" />
                          </g>
                        )}

                        {(currentG1Data.symbol === 'Rb' || currentG1Data.symbol === 'Cs') && (
                          <g>
                            {/* Explosion Shockwave Flash */}
                            <circle cx="120" cy="70" r={reactionProgress * 1.5} fill="#ef4444" opacity={0.35} />
                            <circle cx="120" cy="70" r={reactionProgress * 0.8} fill="#f59e0b" opacity={0.6} />
                            <text x="120" y="50" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">
                              💥 EXPLOSION!
                            </text>
                          </g>
                        )}
                      </g>
                    )}
                  </svg>
                </div>

                {/* Simulation Control Buttons */}
                <div className="flex items-center gap-3 mt-4">
                  {reactionStage === 'idle' && (
                    <button
                      onClick={handleStartG1Reaction}
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all text-xs"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{mode === 'mn' ? 'Усанд хаях (Турших)' : 'Drop in Water'}</span>
                    </button>
                  )}

                  {reactionStage === 'reacting' && (
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                      <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                      <span>{mode === 'mn' ? 'Урвал явагдаж байна...' : 'Reacting vigorously...'} ({Math.round(reactionProgress)}%)</span>
                    </div>
                  )}

                  {reactionStage === 'finished' && (
                    <button
                      onClick={handleResetG1Reaction}
                      className="px-5 py-2.5 rounded-2xl bg-slate-800 text-white font-bold flex items-center gap-2 border border-slate-700 hover:bg-slate-700 transition-all text-xs"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{mode === 'mn' ? 'Дахин давтах' : 'Reset Experiment'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right: Cambridge Examiner Observations Deck */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      {mode === 'mn' ? 'Шалгалтын хэв маягийн ажиглалт:' : 'Observations (exam style):'}
                    </span>
                    <span className="text-xs font-mono font-black text-rose-400">
                      {currentG1Data.symbol} + H₂O
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white">{mode === 'mn' ? 'Ажиглалт: ' : 'Observation: '}</span>
                        <span className="text-slate-300">
                          {mode === 'mn' ? currentG1Data.examNoteMn : currentG1Data.examNoteEn}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white">{mode === 'mn' ? 'Индикатор өнгө: ' : 'Indicator colour: '}</span>
                        <span className="text-slate-300">
                          {indicatorAdded
                            ? (mode === 'mn' ? 'Өнгөгүй уусмал ягаан болно: шүлтлэг гидроксид үүссэн.' : 'The colourless solution turns pink: an alkaline hydroxide has formed.')
                            : (mode === 'mn' ? 'Өнгөгүй, шүлтлэг уусмал.' : 'Colourless, alkaline solution.')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balanced Equations */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                  <span className="text-slate-400 font-bold block">
                    {mode === 'mn' ? 'Тэгшитгэл (Equations):' : 'Balanced Equations:'}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-bold">
                    2{currentG1Data.symbol}(s) + 2H₂O(l) → 2{currentG1Data.symbol}OH(aq) + H₂(g)
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sky-400">
                    Ionic: 2{currentG1Data.symbol}(s) + 2H₂O(l) → 2{currentG1Data.symbol}⁺(aq) + 2OH⁻(aq) + H₂(g)
                  </div>
                </div>

                {/* Safety Rules for Paper 6 */}
                <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <span className="font-bold">{mode === 'mn' ? 'Paper 6 аюулгүй байдал: ' : 'Paper 6 safety note: '}</span>
                    {mode === 'mn' ? 'Тосонд хадгална (агаарын хүчилтөрөгч, чийгтэй урвалаас сэргийлнэ). Хавчаар, нүдний шил, аюулгүй хамгаалалтын тусгаарлагч ашигла.' : 'Store under oil to prevent reaction with atmospheric oxygen and moisture. Use tweezers or tongs, safety glasses and a safety screen.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: GROUP VII HALOGEN DISPLACEMENT & STATES (ТӨЛӨВ & ХАЛАХ УРВАЛ) */}
      {activeSubView === 'chemical' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-bold">
                  Cambridge Group VII Trends & Reactivity
                </span>
                <h3 className="text-xl font-black mt-1">
                  {mode === 'mn'
                    ? '7-р бүлгийн галогенүүдийн төлөв ба халах урвалын анимаци'
                    : 'Group VII Halogen States, Sublimation & Displacement Lab'}
                </h3>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Rule: F₂ &gt; Cl₂ &gt; Br₂ &gt; I₂ (Reactivity decreases down group)
              </div>
            </div>

            {/* Halogen States Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {GROUP_7_TRENDS.slice(0, 4).map(hal => (
                <div
                  key={hal.z}
                  onClick={() => setPreviewHalogen(hal.symbol as any)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    previewHalogen === hal.symbol
                      ? 'bg-gradient-to-b from-cyan-500/30 to-slate-950 border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400">{hal.symbol}</span>
                    <span className="text-[10px] font-mono capitalize text-slate-400">{hal.stateAtRTP}</span>
                  </div>
                  <div className="text-base font-black text-white">{hal.nameEn}</div>
                  <div className="text-xs text-slate-400 mt-1">{mode === 'mn' ? hal.examNoteMn : hal.examNoteEn}</div>
                </div>
              ))}
            </div>

            {/* Interactive Halogen Displacement Workbench */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Test Tube Visualizer */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
                <span className="text-xs font-mono font-bold text-slate-400 mb-3">
                  {mode === 'mn' ? 'Урвалын хуруу шил:' : 'Reaction Test Tube:'}
                </span>

                <div className="relative w-24 h-64">
                  <svg viewBox="0 0 100 240" className="w-full h-full select-none">
                    {/* Glass Test Tube Body */}
                    <rect x="25" y="10" width="50" height="190" rx="25" fill="none" stroke="#64748b" strokeWidth="3" />
                    {/* Lip */}
                    <ellipse cx="50" cy="10" rx="30" ry="6" fill="none" stroke="#64748b" strokeWidth="3" />

                    {/* Solution Inside */}
                    {(() => {
                      // Determine final color based on added halogen and halide
                      // Cl2 + KBr -> Orange (Br2 released)
                      // Cl2 + KI -> Violet / Dark Brown (I2 released)
                      // Br2 + KI -> Violet / Dark Brown (I2 released)
                      // Br2 + KCl -> No reaction (pale yellow-orange Br2 solution remains)
                      // I2 + any -> Brown I2 solution (no reaction)
                      let fillColor = '#e2e8f0'; // colorless salt solution default

                      if (addedHalogen === 'Cl2') {
                        if (selectedHalide === 'KBr') fillColor = '#ea580c'; // Vibrant Orange-red Br2
                        else if (selectedHalide === 'KI') fillColor = '#7c2d12'; // Brown I2 solution
                        else fillColor = '#d9f99d'; // Pale yellow-green Cl2 water
                      } else if (addedHalogen === 'Br2') {
                        if (selectedHalide === 'KI') fillColor = '#7c2d12'; // Brown I2 solution
                        else fillColor = '#ea580c'; // Orange Br2 unreacted
                      } else if (addedHalogen === 'I2') {
                        fillColor = '#7c2d12'; // Brown I2 solution, unreacted
                      }

                      return (
                        <rect
                          x="27"
                          y="60"
                          width="46"
                          height="138"
                          rx="23"
                          fill={fillColor}
                          className="transition-all duration-700"
                          opacity="0.85"
                        />
                      );
                    })()}

                    {/* Meniscus */}
                    <ellipse cx="50" cy="60" rx="23" ry="5" fill="#ffffff" opacity="0.4" />
                  </svg>
                </div>

                <div className="mt-2 text-center text-xs font-mono">
                  <div className="font-bold text-white">
                    {selectedHalide} (aq) + {addedHalogen === 'none' ? 'None' : `${addedHalogen}(aq)`}
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    {addedHalogen === 'none' && (mode === 'mn' ? 'Анхны давсны уусмал өнгөгүй' : 'Colourless initial salt solution')}
                    {addedHalogen === 'Cl2' && selectedHalide === 'KBr' && (mode === 'mn' ? 'Өнгө улбар шар-улаан болно (Br₂ үүснэ)' : 'Colour turns orange-red (Br₂ produced)')}
                    {addedHalogen === 'Cl2' && selectedHalide === 'KI' && (mode === 'mn' ? 'Өнгө хүрэн болно (I₂ үүснэ)' : 'Colour turns brown (I₂ produced)')}
                    {addedHalogen === 'Br2' && selectedHalide === 'KI' && (mode === 'mn' ? 'Өнгө хүрэн болно (I₂ үүснэ)' : 'Colour turns brown (I₂ produced)')}
                    {addedHalogen === 'Cl2' && selectedHalide === 'KCl' && (mode === 'mn' ? 'Урвал явагдахгүй: давс аль хэдийн хлортой' : 'No reaction: the salt already contains chlorine')}
                    {addedHalogen === 'Br2' && selectedHalide === 'KBr' && (mode === 'mn' ? 'Урвал явагдахгүй: давс аль хэдийн бромтой' : 'No reaction: the salt already contains bromine')}
                    {addedHalogen === 'Br2' && selectedHalide === 'KCl' && (mode === 'mn' ? 'Урвал явагдахгүй (бром хлорыг түлхэж гаргахгүй)' : 'No reaction (bromine cannot displace chlorine)')}
                    {addedHalogen === 'I2' && (mode === 'mn' ? 'Урвал явагдахгүй (иод хамгийн идэвхгүй галоген)' : 'No reaction (iodine is the least reactive halogen)')}
                  </div>
                </div>
              </div>

              {/* Workbench Controls & Cambridge Rules */}
              <div className="lg:col-span-7 space-y-4">
                {/* Step 1: Pick Halide Salt */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {mode === 'mn' ? 'Алхам 1: Усан галидын давс сонгох (өнгөгүй уусмал):' : 'Step 1: Choose an aqueous halide salt (colourless solution):'}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['KCl', 'KBr', 'KI'] as const).map(halide => (
                      <button
                        key={halide}
                        onClick={() => setSelectedHalide(halide)}
                        className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                          selectedHalide === halide
                            ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {halide} (aq)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Add Halogen Aqueous Solution */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {mode === 'mn' ? 'Алхам 2: Галогений ус нэмэх (түлхэгч бодис):' : 'Step 2: Add halogen water (displacing agent):'}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setAddedHalogen('none')}
                      className={`p-2 rounded-xl border text-xs font-mono font-bold ${
                        addedHalogen === 'none' ? 'bg-slate-700 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setAddedHalogen('Cl2')}
                      className={`p-2 rounded-xl border text-xs font-mono font-bold ${
                        addedHalogen === 'Cl2'
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-slate-900 border-slate-800 text-emerald-400'
                      }`}
                    >
                      + Cl₂ (aq)
                    </button>
                    <button
                      onClick={() => setAddedHalogen('Br2')}
                      className={`p-2 rounded-xl border text-xs font-mono font-bold ${
                        addedHalogen === 'Br2'
                          ? 'bg-amber-600 text-white border-amber-400'
                          : 'bg-slate-900 border-slate-800 text-amber-400'
                      }`}
                    >
                      + Br₂ (aq)
                    </button>
                    <button
                      onClick={() => setAddedHalogen('I2')}
                      className={`p-2 rounded-xl border text-xs font-mono font-bold ${
                        addedHalogen === 'I2'
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-900 border-slate-800 text-purple-400'
                      }`}
                    >
                      + I₂ (aq)
                    </button>
                  </div>
                </div>

                {/* Cambridge Examiner Explanation Table */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                  <span className="text-cyan-400 font-bold block">
                    {mode === 'mn' ? 'Кэмбрижийн халах урвалын дүрмийн хүснэгт:' : 'Cambridge Halogen Displacement Matrix:'}
                  </span>
                  <div className="text-[11px] text-slate-300 leading-relaxed font-mono">
                    <div>• Cl₂ + 2KBr → 2KCl + Br₂ <span className="text-amber-400">(Reaction: Solution turns orange-red)</span></div>
                    <div>• Cl₂ + 2KI → 2KCl + I₂ <span className="text-purple-400">(Reaction: solution turns brown)</span></div>
                    <div>• Br₂ + 2KI → 2KBr + I₂ <span className="text-purple-400">(Reaction: solution turns brown)</span></div>
                    <div>• Br₂ + KCl → No reaction (Bromine cannot displace more reactive chlorine)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: ELECTRONEGATIVITY & CHEMICAL BONDS (ХОЛБОО ҮҮСЭХ АНИМАЦИ) */}
      {activeSubView === 'physical' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 text-[11px] font-mono font-bold">
                  {mode === 'mn' ? 'Холбооны төрөл ба цахилгаан сөрөг чанарын зөрүү (ΔEN)' : 'Bond type vs electronegativity difference (ΔEN)'}
                </span>
                <h3 className="text-xl font-black mt-1">
                  {mode === 'mn'
                    ? 'Цахилгаан сөрөг чанар ба химийн холбооны төрлийг урьдчилан таамаглах'
                    : 'Electronegativity Difference & Chemical Bond Simulator'}
                </h3>
              </div>
            </div>

            {/* Element Selection Pair */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-400">{mode === 'mn' ? 'Элемент A сонгох:' : 'Select element A:'}</span>
                <div className="grid grid-cols-4 gap-2">
                  {['Na', 'Mg', 'H', 'C', 'N', 'O', 'Cl', 'F'].map(sym => (
                    <button
                      key={sym}
                      onClick={() => setElementA(sym)}
                      className={`p-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                        elementA === sym
                          ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-400">{mode === 'mn' ? 'Элемент B сонгох:' : 'Select element B:'}</span>
                <div className="grid grid-cols-4 gap-2">
                  {['Cl', 'F', 'O', 'Br', 'H', 'C', 'N', 'Na'].map(sym => (
                    <button
                      key={sym}
                      onClick={() => setElementB(sym)}
                      className={`p-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                        elementB === sym
                          ? 'bg-cyan-600 text-white border-cyan-400 shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bond Predictor Visual Calculation */}
            {(() => {
              const paulingValues: Record<string, number> = {
                Na: 0.93,
                Mg: 1.31,
                H: 2.20,
                C: 2.55,
                N: 3.04,
                O: 3.44,
                Cl: 3.16,
                Br: 2.96,
                F: 3.98
              };

              const enA = paulingValues[elementA] || 2.0;
              const enB = paulingValues[elementB] || 2.0;
              const deltaEN = Math.abs(enA - enB);

              let bondTypeEn = 'Non-polar Covalent';
              let bondTypeMn = 'Туйлгүй ковалент холбоо';
              let badgeColor = 'bg-emerald-500 text-white';
              let explanation = 'Electrons are shared equally between the two atoms.';
              let explanationMn = 'Электронууд хоёр атомын хооронд тэнцүү хуваагдана.';

              if (deltaEN > 2.0) {
                bondTypeEn = 'Ionic Bond';
                bondTypeMn = 'Ионы холбоо (Электрон шилжилт)';
                badgeColor = 'bg-rose-500 text-white';
                explanation = 'Large electronegativity difference results in complete electron transfer from metal to non-metal, forming cations and anions.';
                explanationMn = 'Цахилгаан сөрөг чанарын их зөрүүнээс металаас металл бус руу электрон бүрэн шилжиж, катион ба анион үүснэ.';
              } else if (deltaEN > 0.4) {
                bondTypeEn = 'Polar Covalent Bond';
                bondTypeMn = 'Туйлтай ковалент холбоо';
                badgeColor = 'bg-amber-500 text-white';
                explanation = 'Shared electron pair is pulled closer to the more electronegative atom, creating partial charges (δ+ and δ-).';
                explanationMn = 'Хамтын электрон хос илүү цахилгаан сөрөг атом руу ойртож, хэсэгчилсэн цэнэг (δ+ ба δ-) үүсгэнэ.';
              }

              return (
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center font-mono">
                        <div className="text-2xl font-black text-fuchsia-400">{elementA}</div>
                        <div className="text-xs text-slate-400">EN = {enA}</div>
                      </div>
                      <span className="text-xl font-bold text-slate-500">↔</span>
                      <div className="text-center font-mono">
                        <div className="text-2xl font-black text-cyan-400">{elementB}</div>
                        <div className="text-xs text-slate-400">EN = {enB}</div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-xs text-slate-400 block">{mode === 'mn' ? 'ΔEN (зөрүү):' : 'ΔEN (difference):'}</span>
                      <span className="text-2xl font-black text-white">{deltaEN.toFixed(2)}</span>
                    </div>

                    <div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-mono font-black ${badgeColor}`}>
                        {mode === 'mn' ? bondTypeMn : bondTypeEn}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900 p-3 rounded-xl border border-slate-800">
                    {mode === 'mn' ? explanationMn : explanation}
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {activeSubView === 'physical' && <BondingDotCross mn={mode === 'mn'} />}
    </div>
  );
};
