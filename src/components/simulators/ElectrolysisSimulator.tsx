import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChemText } from '../common/ChemText';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle,
  Flame,
  Sparkles,
  Droplets,
  Layers
} from 'lucide-react';

type ElectrolyteType = 'pbbr2' | 'brine' | 'h2so4' | 'cuso4_inert' | 'cuso4_active';

interface ElectrolyteDetail {
  nameEn: string;
  nameMn: string;
  state: string;
  color: string;
  liquidColor: string;
  ions: string[];
  cathodeProductEn: string;
  cathodeProductMn: string;
  cathodeEq: string;
  cathodeTestEn: string;
  cathodeTestMn: string;
  anodeProductEn: string;
  anodeProductMn: string;
  anodeEq: string;
  anodeTestEn: string;
  anodeTestMn: string;
  solutionTestEn?: string;
  solutionTestMn?: string;
  bulbGlow: boolean;
  explanationEn: string;
  explanationMn: string;
}

export const ElectrolysisSimulator: React.FC = () => {
  const { mode } = useLanguage();
  const [electrolyte, setElectrolyte] = useState<ElectrolyteType>('brine');
  const [voltage, setVoltage] = useState<number>(6); // Volts
  const [powerOn, setPowerOn] = useState<boolean>(true);
  const [tick, setTick] = useState<number>(0);
  const [activeGasTest, setActiveGasTest] = useState<{ electrode: 'cathode' | 'anode' | 'solution'; textEn: string; textMn: string } | null>(null);

  useEffect(() => {
    if (!powerOn) return;
    const interval = setInterval(() => {
      setTick(t => (t + 1) % 100);
    }, 60);
    return () => clearInterval(interval);
  }, [powerOn]);

  const electrolyteConfig: Record<ElectrolyteType, ElectrolyteDetail> = {
    pbbr2: {
      nameEn: 'Molten Lead(II) Bromide, PbBr₂(l)',
      nameMn: 'Хайлмал хар тугалганы(II) бромид, PbBr₂(l)',
      state: 'Molten / Хайлмал',
      color: 'bg-amber-950/40 border-amber-800/40',
      liquidColor: '#451a03',
      ions: ['Pb²⁺', 'Br⁻'],
      cathodeProductEn: 'Lead metal (Pb) - silvery liquid beads sink to the bottom',
      cathodeProductMn: 'Хар тугалга металл (Pb) - ёроолд мөнгөлөг шингэн дусал үүснэ',
      cathodeEq: 'Pb²⁺ + 2e⁻ → Pb(l)',
      cathodeTestEn: 'Silvery dense bead of lead metal observed at bottom of crucible.',
      cathodeTestMn: 'Тиглийн ёроолд мөнгөлөг нягт хар тугалга металл ялгарав.',
      anodeProductEn: 'Bromine gas (Br₂) - dense red-brown vapor fumes at anode',
      anodeProductMn: 'Бромын хий (Br₂) - анод дээр хүрэн-улаан өнгийн уур ялгарна',
      anodeEq: '2Br⁻ → Br₂ + 2e⁻',
      anodeTestEn: 'Dense red-brown pungent bromine gas fumes evolved.',
      anodeTestMn: 'Хүрэн улаан өнгөтэй хурц үнэрт бромын уур ялгарав.',
      bulbGlow: true,
      explanationEn: 'Binary molten ionic compound. No water is present, so the metal cation discharges at the cathode and halide at the anode.',
      explanationMn: 'Усгүй хоёртын хайлмал ионы нэгдэл тул катод дээр металл шууд ангижирч, анод дээр галоген исэлдэнэ.'
    },
    brine: {
      nameEn: 'Concentrated Sodium Chloride (Brine), NaCl(aq)',
      nameMn: 'Өтгөрүүлсэн натрийн хлорид (Давсны уусмал), NaCl(aq)',
      state: 'Aqueous / Усан уусмал',
      color: 'bg-teal-950/40 border-teal-800/40',
      liquidColor: '#0f766e',
      ions: ['Na⁺', 'Cl⁻', 'H⁺', 'OH⁻'],
      cathodeProductEn: 'Hydrogen gas (H₂) - colourless bubbles effervesce rapidly',
      cathodeProductMn: 'Устөрөгчийн хий (H₂) - өнгөгүй хийн бөмбөлгүүд эрчимтэй ялгарна',
      cathodeEq: '2H⁺ + 2e⁻ → H₂(g)',
      cathodeTestEn: 'Lighted splint held near cathode gives a squeaky "pop"!',
      cathodeTestMn: 'Катод дээр асаж буй шүдэнз ойртуулахад "паах" дуу гаран шатав!',
      anodeProductEn: 'Chlorine gas (Cl₂) - pungent pale green gas bubbles',
      anodeProductMn: 'Хлорын хий (Cl₂) - хурц үнэртэй цайвар ногоон хийн бөмбөлөг үүснэ',
      anodeEq: '2Cl⁻ → Cl₂ + 2e⁻',
      anodeTestEn: 'Damp blue litmus paper held near anode turns red then bleaches white!',
      anodeTestMn: 'Анод дээр чийгтэй хөх лакмус цаас барихад эхлээд улайж, дараа нь бүрэн цайрав!',
      solutionTestEn: 'Universal indicator turns deep purple near cathode due to accumulation of OH⁻ (forming NaOH)!',
      solutionTestMn: 'Катодын орчим OH⁻ ион хуримтлагдан (NaOH үүсэж) бүх нийтийн индикатор гүн хөх-ягаан болж хувирав!',
      bulbGlow: true,
      explanationEn: 'At cathode: H⁺ discharges because Na is much more reactive. At anode: Cl⁻ discharges because chloride is concentrated. Solution becomes alkaline NaOH.',
      explanationMn: 'Катод дээр: Натри хэт идэвхтэй тул H⁺ түрүүлж ангижирна. Анод дээр: Өтгөрүүлсэн тул Cl⁻ исэлдэнэ. Уусмалд шүлтлэг NaOH үлдэнэ.'
    },
    h2so4: {
      nameEn: 'Dilute Sulfuric Acid, H₂SO₄(aq)',
      nameMn: 'Шингэрүүлсэн хүхрийн хүчил, H₂SO₄(aq)',
      state: 'Aqueous / Усан уусмал',
      color: 'bg-blue-950/40 border-blue-800/40',
      liquidColor: '#1e3a8a',
      ions: ['H⁺', 'SO₄²⁻', 'OH⁻'],
      cathodeProductEn: 'Hydrogen gas (H₂) - rapid bubbling (2 volumes)',
      cathodeProductMn: 'Устөрөгчийн хий (H₂) - хурдан бөмбөлөг үүснэ (2 дахин их эзлэхүүн)',
      cathodeEq: '2H⁺ + 2e⁻ → H₂(g)',
      cathodeTestEn: 'Lighted splint burns with a squeaky pop!',
      cathodeTestMn: 'Асаж буй шүдэнз "паах" дуу гарган шатав!',
      anodeProductEn: 'Oxygen gas (O₂) - colourless gas bubbles (1 volume)',
      anodeProductMn: 'Хүчилтөрөгчийн хий (O₂) - өнгөгүй хийн бөмбөлөг (1 эзлэхүүн)',
      anodeEq: '4OH⁻ → O₂ + 2H₂O + 4e⁻',
      anodeTestEn: 'Glowing splint held above anode relights with bright flame!',
      anodeTestMn: 'Цогшиж буй шүдэнз бадамлан аслаа!',
      bulbGlow: true,
      explanationEn: 'Equivalent to electrolysis of water. The volume ratio of H₂ (cathode) to O₂ (anode) is strictly 2:1.',
      explanationMn: 'Усны электролиз явагдаж байна. Катод дээрх H₂ ба анод дээрх O₂-ийн эзлэхүүний харьцаа яг 2:1 байна.'
    },
    cuso4_inert: {
      nameEn: 'Aqueous Copper(II) Sulfate with Carbon Electrodes',
      nameMn: 'Зэсийн(II) сульфатын уусмал (Нүүрстөрөгчийн электродтой)',
      state: 'Aqueous / Усан уусмал',
      color: 'bg-cyan-950/40 border-cyan-800/40',
      liquidColor: '#0891b2',
      ions: ['Cu²⁺', 'SO₄²⁻', 'H⁺', 'OH⁻'],
      cathodeProductEn: 'Copper metal (Cu) - reddish-pink coating on electrode',
      cathodeProductMn: 'Зэс металл (Cu) - электрод дээр улаан-хүрэн зэс бүрхүүл үүснэ',
      cathodeEq: 'Cu²⁺ + 2e⁻ → Cu(s)',
      cathodeTestEn: 'Pinkish-orange salmon copper deposit coats the cathode rod.',
      cathodeTestMn: 'Катодын гадарга дээр ягаан-улбар шар зэсийн давхарга тунав.',
      anodeProductEn: 'Oxygen gas (O₂) - colourless bubbles form at anode',
      anodeProductMn: 'Хүчилтөрөгчийн хий (O₂) - өнгөгүй хийн бөмбөлгүүд ялгарна',
      anodeEq: '4OH⁻ → O₂ + 2H₂O + 4e⁻',
      anodeTestEn: 'Glowing wooden splint relights at anode mouth.',
      anodeTestMn: 'Цогшиж буй шүдэнз анод дээр бадамлан аслаа.',
      bulbGlow: true,
      explanationEn: 'Copper is less reactive than hydrogen so Cu forms. The blue color of the solution slowly fades as Cu²⁺ ions are depleted.',
      explanationMn: 'Зэс нь устөрөгчөөс бага идэвхтэй тул зэс ялгарна. Cu²⁺ ион уусмалаас шавхагдах тусам цэнхэр өнгө бүдгэрнэ.'
    },
    cuso4_active: {
      nameEn: 'Copper Refining: CuSO₄(aq) with Copper Electrodes',
      nameMn: 'Зэс цэвэршүүлэх: CuSO₄(aq) зэс электродтой',
      state: 'Active Electrodes / Идэвхтэй электрод',
      color: 'bg-emerald-950/40 border-emerald-800/40',
      liquidColor: '#059669',
      ions: ['Cu²⁺', 'SO₄²⁻'],
      cathodeProductEn: 'Pure copper deposits (cathode increases in mass)',
      cathodeProductMn: 'Цэвэр зэс хуримтлагдана (катодын масс ихэснэ)',
      cathodeEq: 'Cu²⁺ + 2e⁻ → Cu(s)',
      cathodeTestEn: 'Cathode grows noticeably thicker and heavier with pure copper.',
      cathodeTestMn: 'Катодын зэс зузаарч, цэвэр зэсээр бүрхэгдэж масс нь нэмэгдэв.',
      anodeProductEn: 'Impure copper anode dissolves (anode decreases in mass)',
      anodeProductMn: 'Бохирдолтой зэс анод уусна (анодын масс багасна)',
      anodeEq: 'Cu(s) → Cu²⁺ + 2e⁻',
      anodeTestEn: 'Impure anode corrodes, releasing copper ions and leaving anode slime.',
      anodeTestMn: 'Бохирдолтой анод уусан жижгэрч, ёроолд нь анодын лаг тунав.',
      bulbGlow: true,
      explanationEn: 'Used in industrial refining of copper. The blue color of the electrolyte stays constant because Cu²⁺ ions dissolve into solution at the same rate they deposit.',
      explanationMn: 'Үйлдвэрт зэс цэвэршүүлэх үндсэн арга. Анодоос уусах ба катод дээр ялгарах зэсийн хурд тэнцүү тул уусмалын өнгө өөрчлөгдөхгүй тогтмол байна.'
    }
  };

  const curr = electrolyteConfig[electrolyte];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">
              Cambridge Chapter 4 Electrochemistry
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 text-xs font-mono">Electrolysis & Industrial Refining</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {mode === 'mn' ? 'Электролизийн элементийн симуляц ба хийн сорил' : 'Electrochemical Cell Simulator & Gas Testing Rig'}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPowerOn(!powerOn)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              powerOn
                ? 'bg-rose-600 text-white hover:bg-rose-500'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
            {powerOn ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {powerOn ? (mode === 'mn' ? 'Тэжээл салгах' : 'Power Off') : (mode === 'mn' ? 'Гүйдэл залгах' : 'Power On')}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Visual Rig Stage (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-between min-h-[440px]">
          {/* Circuit Top Battery & Bulb Indicator */}
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 px-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-slate-200">
                DC Power Supply: {voltage} V ({(voltage * 0.45).toFixed(2)} A)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-mono">Bulb:</span>
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  powerOn && curr.bulbGlow
                    ? 'bg-amber-400 shadow-[0_0_12px_#f59e0b]'
                    : 'bg-slate-700'
                }`}
              />
            </div>
          </div>

          {/* Cell Vessel & Electrodes */}
          <div className="my-auto relative flex flex-col items-center py-6 w-full max-w-md">
            {/* Beaker */}
            <div className="w-72 h-56 border-2 border-slate-500 rounded-b-3xl relative overflow-hidden flex flex-col justify-end p-2 bg-slate-900/50 shadow-2xl">
              {/* Electrolyte Liquid */}
              <div
                className="w-full h-44 rounded-b-2xl transition-all duration-700 relative overflow-hidden"
                style={{ backgroundColor: curr.liquidColor + '60' }}
              >
                {/* Electrodes inside liquid */}
                <div className="absolute inset-x-8 top-0 bottom-4 flex justify-between items-start">
                  {/* Anode Electrode (+) */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-36 border-2 rounded-sm shadow-md relative transition-all ${
                        electrolyte === 'cuso4_active' ? 'bg-amber-800 border-amber-600' : 'bg-slate-700 border-slate-500'
                      }`}
                    >
                      {/* Bubbles at Anode */}
                      {powerOn && (
                        <div className="absolute -inset-1 overflow-hidden pointer-events-none">
                          {[0, 1, 2, 3].map(i => (
                            <div
                              key={i}
                              className="absolute w-2 h-2 rounded-full bg-white/80 animate-ping"
                              style={{
                                left: `${(i * 6) % 18}px`,
                                bottom: `${((tick * 2.5 + i * 28) % 110)}px`,
                                animationDuration: '0.8s'
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="mt-1 px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-700/60 text-[9px] font-mono text-rose-300 font-bold">
                      ANODE (+)
                    </span>
                  </div>

                  {/* Cathode Electrode (-) */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-36 border-2 rounded-sm shadow-md relative transition-all ${
                        electrolyte.includes('cuso4')
                          ? 'bg-amber-600 border-amber-500 ring-2 ring-amber-500/40' // copper deposit
                          : 'bg-slate-700 border-slate-500'
                      }`}
                    >
                      {/* Bubbles or deposits at Cathode */}
                      {powerOn && (
                        <div className="absolute -inset-1 overflow-hidden pointer-events-none">
                          {[0, 1, 2, 3].map(i => (
                            <div
                              key={i}
                              className="absolute w-2 h-2 rounded-full bg-cyan-200/90 animate-ping"
                              style={{
                                left: `${(i * 6) % 18}px`,
                                bottom: `${((tick * 2.5 + i * 25) % 110)}px`,
                                animationDuration: '0.9s'
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="mt-1 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/60 text-[9px] font-mono text-cyan-300 font-bold">
                      CATHODE (-)
                    </span>
                  </div>
                </div>

                {/* Floating Mobile Ions Migration */}
                {powerOn && (
                  <div className="absolute inset-x-6 bottom-3 h-28 pointer-events-none">
                    <div
                      className="absolute text-[10px] font-mono font-bold text-cyan-200 transition-all duration-300"
                      style={{ left: `${110 + (tick % 30)}px`, bottom: '25px' }}
                    >
                      {curr.ions[0]} ➔
                    </div>
                    <div
                      className="absolute text-[10px] font-mono font-bold text-rose-300 transition-all duration-300"
                      style={{ left: `${80 - (tick % 30)}px`, bottom: '50px' }}
                    >
                      ⬅ {curr.ions[1]}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gas & Product Testing Actions */}
          <div className="w-full pt-3 border-t border-slate-800 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">
              {mode === 'mn' ? 'Ялгарсан бүтээгдэхүүнийг шалгах (Cambridge Tests):' : 'Cambridge Product Confirmation Tests:'}
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <button
                onClick={() =>
                  setActiveGasTest({
                    electrode: 'cathode',
                    textEn: curr.cathodeTestEn,
                    textMn: curr.cathodeTestMn
                  })
                }
                className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-700/60 text-cyan-300 hover:bg-cyan-900/60 transition-colors flex items-center justify-center gap-1.5"
              >
                <Flame className="w-3 h-3" />
                <span>Test Cathode</span>
              </button>

              <button
                onClick={() =>
                  setActiveGasTest({
                    electrode: 'anode',
                    textEn: curr.anodeTestEn,
                    textMn: curr.anodeTestMn
                  })
                }
                className="p-2 rounded-lg bg-rose-950/60 border border-rose-700/60 text-rose-300 hover:bg-rose-900/60 transition-colors flex items-center justify-center gap-1.5"
              >
                <Flame className="w-3 h-3" />
                <span>Test Anode</span>
              </button>

              {curr.solutionTestEn ? (
                <button
                  onClick={() =>
                    setActiveGasTest({
                      electrode: 'solution',
                      textEn: curr.solutionTestEn!,
                      textMn: curr.solutionTestMn!
                    })
                  }
                  className="p-2 rounded-lg bg-purple-950/60 border border-purple-700/60 text-purple-300 hover:bg-purple-900/60 transition-colors flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1"
                >
                  <Droplets className="w-3 h-3" />
                  <span>Test Solution</span>
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}
            </div>

            {activeGasTest && (
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-300 animate-in fade-in">
                <strong>Result ({activeGasTest.electrode.toUpperCase()}): </strong>
                {mode === 'mn' ? activeGasTest.textMn : activeGasTest.textEn}
              </div>
            )}
          </div>
        </div>

        {/* Right Electrolyte Selection & Equations Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Electrolyte Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono block">
              {mode === 'mn' ? 'Электролит сонгох:' : 'Select Electrolyte System:'}
            </label>

            <div className="space-y-1.5">
              {(Object.keys(electrolyteConfig) as ElectrolyteType[]).map(key => {
                const item = electrolyteConfig[key];
                const active = electrolyte === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setElectrolyte(key);
                      setActiveGasTest(null);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                      active
                        ? 'bg-teal-950/80 border-teal-500 text-white ring-1 ring-teal-500/50'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-bold text-slate-100">
                      {mode === 'mn' ? item.nameMn : item.nameEn}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      {item.state} · Ions: {item.ions.join(', ')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Half-Equations & Cambridge Observations */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
            <span className="font-bold text-white uppercase font-mono block border-b border-slate-800 pb-2">
              {mode === 'mn' ? 'Хагас урвалын тэгшитгэлүүд' : 'Electrode Half-Equations & Products'}
            </span>

            {/* Cathode Reduction */}
            <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 space-y-1">
              <div className="flex items-center justify-between text-cyan-300 font-bold font-mono">
                <span>Cathode (-) Reduction:</span>
                <span>Gain 2e⁻</span>
              </div>
              <div className="font-mono text-white text-xs bg-slate-900/80 p-1.5 rounded border border-slate-700">
                <ChemText text={curr.cathodeEq} />
              </div>
              <p className="text-[11px] text-slate-300">
                {mode === 'mn' ? curr.cathodeProductMn : curr.cathodeProductEn}
              </p>
            </div>

            {/* Anode Oxidation */}
            <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-1">
              <div className="flex items-center justify-between text-rose-300 font-bold font-mono">
                <span>Anode (+) Oxidation:</span>
                <span>Lose 2e⁻</span>
              </div>
              <div className="font-mono text-white text-xs bg-slate-900/80 p-1.5 rounded border border-slate-700">
                <ChemText text={curr.anodeEq} />
              </div>
              <p className="text-[11px] text-slate-300">
                {mode === 'mn' ? curr.anodeProductMn : curr.anodeProductEn}
              </p>
            </div>

            {/* Cambridge Theory Note */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
              <strong className="text-teal-400 block mb-0.5 font-mono">Cambridge 0620 Rule:</strong>
              {mode === 'mn' ? curr.explanationMn : curr.explanationEn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
