import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChemText } from '../common/ChemText';
import { 
  Wind, 
  Droplets, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  HelpCircle,
  Play,
  Flame,
  Layers,
  ArrowRight
} from 'lucide-react';

interface GasConfig {
  id: string;
  nameEn: string;
  nameMn: string;
  formula: string;
  mr: number; // Air ~28.8
  densityVsAir: 'less' | 'similar' | 'more';
  solubilityInWater: 'insoluble' | 'sparingly' | 'very_soluble';
  reactantsEn: string;
  reactantsMn: string;
  equation: string;
  validDryingAgents: ('none' | 'conc_h2so4' | 'cacl2' | 'cao')[];
  invalidDryingExplanationEn: Record<string, string>;
  invalidDryingExplanationMn: Record<string, string>;
  validCollectionMethods: ('water' | 'upward' | 'downward' | 'syringe')[];
  collectionAdviceEn: string;
  collectionAdviceMn: string;
  testReagentEn: string;
  testReagentMn: string;
  testObservationEn: string;
  testObservationMn: string;
  colorHex: string;
}

const GASES: GasConfig[] = [
  {
    id: 'h2',
    nameEn: 'Hydrogen',
    nameMn: 'Устөрөгч',
    formula: 'H2',
    mr: 2,
    densityVsAir: 'less',
    solubilityInWater: 'insoluble',
    reactantsEn: 'Zinc granules + Dilute sulfuric acid',
    reactantsMn: 'Цайрын үрэл + Шингэрүүлсэн хүхрийн хүчил',
    equation: 'Zn(s) + H2SO4(aq) → ZnSO4(aq) + H2(g)',
    validDryingAgents: ['none', 'conc_h2so4', 'cacl2'],
    invalidDryingExplanationEn: {
      cao: 'CaO is alkaline; while it does not violently react with H2, concentrated H2SO4 or anhydrous CaCl2 is standard.'
    },
    invalidDryingExplanationMn: {
      cao: 'CaO нь шүлтлэг суурь бөгөөд устөрөгчтэй урвалд орохгүй боловч лабораторид хүхрийн хүчил эсвэл CaCl2 илүү түгээмэл хэрэглэгддэг.'
    },
    validCollectionMethods: ['water', 'upward', 'syringe'],
    collectionAdviceEn: 'Because H2 is insoluble in water and much less dense than air (Mr = 2 vs 28.8), collect over water or by upward delivery.',
    collectionAdviceMn: 'Устөрөгч нь усанд уусдаггүй ба агаараас хамаагүй хөнгөн тул (Mr = 2 vs 28.8) усан дээгүүр эсвэл урвуу харуулсан хуруу шилэнд (дээш чиглэсэн аргаар) цуглуулна.',
    testReagentEn: 'Lighted wooden splint near mouth of tube',
    testReagentMn: 'Хуруу шилний амсар дээр асаж буй шүдэнз ойртуулах',
    testObservationEn: 'Burns with a characteristic "squeaky pop" sound',
    testObservationMn: '"Паах" чимээ гарган шатна',
    colorHex: '#38bdf8'
  },
  {
    id: 'o2',
    nameEn: 'Oxygen',
    nameMn: 'Хүчилтөрөгч',
    formula: 'O2',
    mr: 32,
    densityVsAir: 'similar',
    solubilityInWater: 'insoluble',
    reactantsEn: 'Hydrogen peroxide + Manganese(IV) oxide catalyst',
    reactantsMn: 'Устөрөгчийн хэт исэл + Манганы(IV) оксид катализатор',
    equation: '2H2O2(aq) → 2H2O(l) + O2(g) [MnO2 cat.]',
    validDryingAgents: ['none', 'conc_h2so4', 'cacl2'],
    invalidDryingExplanationEn: {},
    invalidDryingExplanationMn: {},
    validCollectionMethods: ['water', 'syringe'],
    collectionAdviceEn: 'Density is very close to air (32 vs 28.8), so downward/upward air displacement produces impure gas. Collecting over water is the standard Cambridge method.',
    collectionAdviceMn: 'Агаарын нягттай ойролцоо (32 vs 28.8) тул агаарыг шахах аргаар цэвэр цуглуулахад хэцүү. Иймээс усанд уусдаггүй шинжийг ашиглан усан дээгүүр цуглуулна.',
    testReagentEn: 'Glowing wooden splint inserted into tube',
    testReagentMn: 'Цогшиж буй модон шүдэнз хуруу шилэнд оруулах',
    testObservationEn: 'Relights the glowing splint with bright flame',
    testObservationMn: 'Цогшиж буй шүдэнз бадамлан асдаг',
    colorHex: '#60a5fa'
  },
  {
    id: 'co2',
    nameEn: 'Carbon dioxide',
    nameMn: 'Нүүрсхүчлийн хий',
    formula: 'CO2',
    mr: 44,
    densityVsAir: 'more',
    solubilityInWater: 'sparingly',
    reactantsEn: 'Calcium carbonate (marble chips) + Dilute hydrochloric acid',
    reactantsMn: 'Кальцийн карбонат (гантиг үрэл) + Шингэрүүлсэн давсны хүчил',
    equation: 'CaCO3(s) + 2HCl(aq) → CaCl2(aq) + H2O(l) + CO2(g)',
    validDryingAgents: ['none', 'conc_h2so4', 'cacl2'],
    invalidDryingExplanationEn: {
      cao: 'CaO is a basic oxide and will react directly with acidic CO2 to form CaCO3, absorbing all the gas!'
    },
    invalidDryingExplanationMn: {
      cao: 'CaO нь суурилаг оксид тул хүчиллэг CO2-той урвалд орж CaCO3 болгон хийг шингээн устгана!'
    },
    validCollectionMethods: ['downward', 'syringe', 'water'],
    collectionAdviceEn: 'CO2 is denser than air (Mr = 44 vs 28.8). Collect by downward delivery into an upright gas jar, or gas syringe.',
    collectionAdviceMn: 'CO2 нь агаараас хүнд (Mr = 44 vs 28.8) тул босоо шилэнд доош чиглэсэн аргаар (агаарыг дээш шахан) эсвэл хийн шприцээр цуглуулна.',
    testReagentEn: 'Bubble gas through limewater (aqueous Ca(OH)₂)',
    testReagentMn: 'Шохойн ус (Ca(OH)₂) дундуур нэвтрүүлэх',
    testObservationEn: 'Limewater turns cloudy milky white due to CaCO3 precipitate',
    testObservationMn: 'Шохойн ус цайж цагаан булингар (CaCO3) үүснэ',
    colorHex: '#94a3b8'
  },
  {
    id: 'nh3',
    nameEn: 'Ammonia',
    nameMn: 'Аммиак',
    formula: 'NH3',
    mr: 17,
    densityVsAir: 'less',
    solubilityInWater: 'very_soluble',
    reactantsEn: 'Ammonium chloride + Calcium hydroxide (warm)',
    reactantsMn: 'Аммонийн хлорид + Кальцийн гидроксид (зөөлөн халаах)',
    equation: '2NH4Cl(s) + Ca(OH)2(s) → CaCl2 + 2H2O + 2NH3(g)',
    validDryingAgents: ['cao'],
    invalidDryingExplanationEn: {
      conc_h2so4: 'Important: NH3 is basic and will react with conc. H2SO4 to form (NH4)2SO4! No gas will be collected.',
      cacl2: 'CaCl2 reacts with ammonia to form a complex compound CaCl2·8NH3.'
    },
    invalidDryingExplanationMn: {
      conc_h2so4: 'КЭМБРИЖИЙН ГОЛ АЛДАА: Аммиак нь шүлтлэг суурь тул хүхрийн хүчилтэй урвалд орж (NH4)2SO4 давс үүсгэн хий цуглуулах боломжгүй болно!',
      cacl2: 'CaCl2 нь аммиактай комплекс нэгдэл үүсгэдэг тул хатааж болохгүй.'
    },
    validCollectionMethods: ['upward', 'syringe'],
    collectionAdviceEn: 'Ammonia is extremely soluble in water, so CANNOT be collected over water! It is less dense than air (Mr = 17 vs 28.8), so collect by upward delivery into an inverted test tube.',
    collectionAdviceMn: 'Аммиак усанд онцгой сайн уусдаг тул УСАН ДЭЭГҮҮР ЦУГЛУУЛЖ БОЛОХГҮЙ! Агаараас хөнгөн (Mr = 17 vs 28.8) тул урвуу харуулсан хуруу шилэнд дээш чиглэсэн аргаар цуглуулна.',
    testReagentEn: 'Hold damp red litmus paper in the gas',
    testReagentMn: 'Чийгтэй улаан лакмус цаас хийн урсгалд барих',
    testObservationEn: 'Damp red litmus paper turns blue (alkaline gas)',
    testObservationMn: 'Чийгтэй улаан лакмус цаас хөх өнгөтэй болно (шүлтлэг хий)',
    colorHex: '#34d399'
  },
  {
    id: 'cl2',
    nameEn: 'Chlorine',
    nameMn: 'Хлор',
    formula: 'Cl2',
    mr: 71,
    densityVsAir: 'more',
    solubilityInWater: 'very_soluble',
    reactantsEn: 'Manganese(IV) oxide + Concentrated hydrochloric acid (heat)',
    reactantsMn: 'Манганы(IV) оксид + Өтгөрүүлсэн давсны хүчил (халаах)',
    equation: 'MnO2(s) + 4HCl(aq) → MnCl2 + 2H2O + Cl2(g)',
    validDryingAgents: ['conc_h2so4'],
    invalidDryingExplanationEn: {
      cao: 'CaO reacts with acidic Cl2.'
    },
    invalidDryingExplanationMn: {
      cao: 'CaO нь хүчиллэг шинжтэй хлортой урвалд орно.'
    },
    validCollectionMethods: ['downward', 'syringe'],
    collectionAdviceEn: 'Chlorine is soluble in water (forms chlorine water) and much denser than air (Mr = 71 vs 28.8). Collect by downward delivery in a fume cupboard.',
    collectionAdviceMn: 'Хлор усанд уусдаг ба агаараас 2.5 дахин хүнд (Mr = 71 vs 28.8). Хортой тул татах шүүгээнд босоо шилэнд доош чиглэсэн аргаар цуглуулна.',
    testReagentEn: 'Damp litmus paper or universal indicator paper',
    testReagentMn: 'Чийгтэй лакмус эсвэл бүх нийтийн индикаторын цаас',
    testObservationEn: 'First turns red (acidic), then is bleached completely white!',
    testObservationMn: 'Эхлээд улайсна (хүчиллэг), дараа нь бүрэн цайрч цагаан болно!',
    colorHex: '#a3e635'
  },
  {
    id: 'so2',
    nameEn: 'Sulfur dioxide',
    nameMn: 'Хүхрийн диоксид',
    formula: 'SO2',
    mr: 64,
    densityVsAir: 'more',
    solubilityInWater: 'very_soluble',
    reactantsEn: 'Sodium sulfite + Dilute hydrochloric acid (warm)',
    reactantsMn: 'Натрийн сульфит + Шингэрүүлсэн давсны хүчил (зөөлөн халаах)',
    equation: 'Na2SO3(s) + 2HCl(aq) → 2NaCl + H2O + SO2(g)',
    validDryingAgents: ['conc_h2so4'],
    invalidDryingExplanationEn: {
      cao: 'CaO reacts immediately with acidic SO2.'
    },
    invalidDryingExplanationMn: {
      cao: 'Суурилаг CaO нь хүчиллэг хий SO2-той урвалд орж CaSO3 болно.'
    },
    validCollectionMethods: ['downward', 'syringe'],
    collectionAdviceEn: 'Acidic, pungent choking gas, very soluble in water and denser than air (Mr = 64 vs 28.8). Collect by downward delivery.',
    collectionAdviceMn: 'Хүчиллэг, усанд маш сайн уусдаг, агаараас хүнд (Mr = 64 vs 28.8) тул доош чиглэсэн аргаар цуглуулна.',
    testReagentEn: 'Acidified aqueous potassium manganate(VII) (KMnO₄)',
    testReagentMn: 'Хүчиллэгжүүлсэн калийн перманганатын уусмал (KMnO₄)',
    testObservationEn: 'Turns from vibrant purple to completely colourless (decolourises)',
    testObservationMn: 'Хүчиллэгжүүлсэн KMnO₄-ийн нил ягаан өнгө арилж өнгөгүй болно',
    colorHex: '#fb923c'
  }
];

export const GasCollectionLab: React.FC = () => {
  const { mode } = useLanguage();

  const [selectedGasId, setSelectedGasId] = useState<string>('nh3');
  const [selectedDrying, setSelectedDrying] = useState<'none' | 'conc_h2so4' | 'cacl2' | 'cao'>('conc_h2so4');
  const [selectedCollection, setSelectedCollection] = useState<'water' | 'upward' | 'downward' | 'syringe'>('water');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testTested, setTestTested] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    success: boolean;
    dryingFeedbackEn: string;
    dryingFeedbackMn: string;
    collectionFeedbackEn: string;
    collectionFeedbackMn: string;
    markAwarded: number;
    maxMarks: number;
  } | null>(null);

  const currentGas = GASES.find(g => g.id === selectedGasId) || GASES[0];

  const handleRunExperiment = () => {
    setIsRunning(true);
    setTestTested(false);

    // Evaluate student choices
    const isDryingValid = currentGas.validDryingAgents.includes(selectedDrying);
    const isCollectionValid = currentGas.validCollectionMethods.includes(selectedCollection);

    let dryingFeedbackEn = 'Drying agent suitable for this gas.';
    let dryingFeedbackMn = 'Хатаагч бодис энэ хийд тохирно.';
    if (!isDryingValid) {
      dryingFeedbackEn = currentGas.invalidDryingExplanationEn[selectedDrying] || 'Incompatible drying agent.';
      dryingFeedbackMn = currentGas.invalidDryingExplanationMn[selectedDrying] || 'Энэ хатаагч бодис тохирохгүй.';
    }

    let collectionFeedbackEn = 'Collection method correct based on gas solubility and density.';
    let collectionFeedbackMn = 'Хийн уусах чанар ба нягтад тулгуурласан зөв цуглуулах арга.';
    if (!isCollectionValid) {
      if (selectedCollection === 'water' && currentGas.solubilityInWater === 'very_soluble') {
        collectionFeedbackEn = `${currentGas.nameEn} is very soluble in water! It dissolves immediately instead of collecting.`;
        collectionFeedbackMn = `${currentGas.nameMn} усанд онцгой сайн уусдаг тул усан дээгүүр цуглуулах үед шууд уусаж шингэнэ!`;
      } else if (selectedCollection === 'upward' && currentGas.densityVsAir === 'more') {
        collectionFeedbackEn = `${currentGas.nameEn} is denser than air (Mr = ${currentGas.mr} vs 28.8). It sinks and falls out of the inverted tube!`;
        collectionFeedbackMn = `${currentGas.nameMn} нь агаараас хүнд (Mr = ${currentGas.mr} vs 28.8). Урвуу харуулсан хуруу шилнээс доош урсан алдагдана!`;
      } else if (selectedCollection === 'downward' && currentGas.densityVsAir === 'less') {
        collectionFeedbackEn = `${currentGas.nameEn} is less dense than air (Mr = ${currentGas.mr} vs 28.8). It floats upward out of the gas jar!`;
        collectionFeedbackMn = `${currentGas.nameMn} нь агаараас хөнгөн (Mr = ${currentGas.mr} vs 28.8). Босоо шилнээс дээш дэгдэн алдагдана!`;
      }
    }

    let marks = 0;
    if (isDryingValid) marks += 1;
    if (isCollectionValid) marks += 2;

    setTimeout(() => {
      setIsRunning(false);
      setEvaluationResult({
        success: isDryingValid && isCollectionValid,
        dryingFeedbackEn,
        dryingFeedbackMn,
        collectionFeedbackEn,
        collectionFeedbackMn,
        markAwarded: marks,
        maxMarks: 3
      });
    }, 800);
  };

  const handlePerformTest = () => {
    setTestTested(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTestTested(false);
    setEvaluationResult(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">
              {mode === 'mn' ? 'Кэмбрижийн 6-р цаасны практик ур чадвар' : 'Cambridge Paper 6 Practical Skill'}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 text-xs font-mono">{mode === 'mn' ? '0620 туршилтын арга зүй' : '0620 Experimental Techniques'}</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {mode === 'mn' ? 'Хий гарган авах, хатаах ба цуглуулах лаборатори' : 'Gas Preparation, Drying & Collection Workbench'}
          </h3>
        </div>

        {/* Gas Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          {GASES.map(gas => (
            <button
              key={gas.id}
              onClick={() => {
                setSelectedGasId(gas.id);
                handleReset();
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                gas.id === selectedGasId
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {gas.formula}
            </button>
          ))}
        </div>
      </div>

      {/* Target Gas Profile Card */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-slate-500 block font-semibold text-[10px] uppercase font-mono">{mode === 'mn' ? 'Зорилтот хий:' : 'Target Gas:'}</span>
          <div className="font-bold text-white text-sm mt-0.5 flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-teal-400" />
            <span>{mode === 'mn' ? currentGas.nameMn : currentGas.nameEn} ({currentGas.formula})</span>
          </div>
        </div>

        <div>
          <span className="text-slate-500 block font-semibold text-[10px] uppercase font-mono">{mode === 'mn' ? 'Моляр масс ($) ба нягт:' : 'Molar Mass ($) & Density:'}</span>
          <div className="font-mono text-slate-300 mt-0.5">
            $M_r = {currentGas.mr}$ {mode === 'mn' ? '(агаар ≈ 28.8) →' : '(Air ≈ 28.8) →'}{' '}
            <span className={`font-bold ${currentGas.densityVsAir === 'less' ? 'text-amber-400' : 'text-cyan-400'}`}>
              {currentGas.densityVsAir === 'less' ? (mode === 'mn' ? 'Агаараас хөнгөн' : 'Lighter than air') : currentGas.densityVsAir === 'more' ? (mode === 'mn' ? 'Агаараас хүнд' : 'Denser than air') : (mode === 'mn' ? 'Агаартай ойролцоо' : 'Similar to air')}
            </span>
          </div>
        </div>

        <div>
          <span className="text-slate-500 block font-semibold text-[10px] uppercase font-mono">{mode === 'mn' ? 'Усанд уусах чанар:' : 'Solubility in Water:'}</span>
          <div className="font-mono mt-0.5">
            <span className={`font-bold ${currentGas.solubilityInWater === 'very_soluble' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {currentGas.solubilityInWater === 'insoluble' ? (mode === 'mn' ? 'Уусдаггүй' : 'Insoluble') : currentGas.solubilityInWater === 'sparingly' ? (mode === 'mn' ? 'Бага зэрэг уусна' : 'Sparingly soluble') : (mode === 'mn' ? 'Маш сайн уусна!' : 'Extremely soluble!')}
            </span>
          </div>
        </div>

        <div>
          <span className="text-slate-500 block font-semibold text-[10px] uppercase font-mono">{mode === 'mn' ? 'Химийн урвал:' : 'Chemical Reaction:'}</span>
          <div className="font-mono text-slate-300 text-[11px] mt-0.5 truncate" title={currentGas.equation}>
            <ChemText text={currentGas.equation} />
          </div>
        </div>
      </div>

      {/* Interactive Workbench Design Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Experimental Setup Options (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Step 1: Drying Agent */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                {mode === 'mn' ? '1. Хатаагч бодис сонгох' : '1. Choose Drying Agent'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{mode === 'mn' ? '1 оноо' : '1 mark'}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setSelectedDrying('conc_h2so4')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedDrying === 'conc_h2so4'
                    ? 'bg-amber-950/60 border-amber-500 text-white ring-1 ring-amber-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-semibold">Conc. H₂SO₄</div>
                <div className="text-[10px] text-slate-400">{mode === 'mn' ? 'Хүчиллэг хийн хатаах шилэн сав' : 'Acidic gas drying wash bottle'}</div>
              </button>

              <button
                onClick={() => setSelectedDrying('cacl2')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedDrying === 'cacl2'
                    ? 'bg-amber-950/60 border-amber-500 text-white ring-1 ring-amber-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-semibold">{mode === 'mn' ? 'Усгүй CaCl₂' : 'Anhydrous CaCl₂'}</div>
                <div className="text-[10px] text-slate-400">{mode === 'mn' ? 'Саармаг хатаах U хоолой' : 'Neutral drying U-tube'}</div>
              </button>

              <button
                onClick={() => setSelectedDrying('cao')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedDrying === 'cao'
                    ? 'bg-amber-950/60 border-amber-500 text-white ring-1 ring-amber-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-semibold">{mode === 'mn' ? 'Шохой (CaO)' : 'Quicklime (CaO)'}</div>
                <div className="text-[10px] text-slate-400">{mode === 'mn' ? 'Суурьт хатаах цамхаг' : 'Basic drying tower'}</div>
              </button>

              <button
                onClick={() => setSelectedDrying('none')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedDrying === 'none'
                    ? 'bg-amber-950/60 border-amber-500 text-white ring-1 ring-amber-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-semibold">{mode === 'mn' ? 'Хатаахгүй' : 'No Drying'}</div>
                <div className="text-[10px] text-slate-400">{mode === 'mn' ? 'Чийглэг хийг шууд цуглуулах' : 'Collect moist gas directly'}</div>
              </button>
            </div>
          </div>

          {/* Step 2: Collection Method */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                {mode === 'mn' ? '2. Цуглуулах арга сонгох' : '2. Choose Collection Method'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{mode === 'mn' ? '2 оноо' : '2 marks'}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setSelectedCollection('water')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedCollection === 'water'
                    ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-semibold flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  {mode === 'mn' ? 'Усан дээр' : 'Over Water'}
                </div>
                <div className="text-[10px] text-slate-400">{mode === 'mn' ? 'Урвуулсан хоолой усан савт' : 'Inverted tube in water trough'}</div>
              </button>

              <button
                onClick={() => setSelectedCollection('upward')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedCollection === 'upward'
                    ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-semibold">{mode === 'mn' ? 'Дээш хөөх' : 'Upward Delivery'}</div>
                <div className="text-[10px] text-slate-400">{mode === 'mn' ? 'Агаарыг доош түлхэх' : 'Downward displacement of air'}</div>
              </button>

              <button
                onClick={() => setSelectedCollection('downward')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedCollection === 'downward'
                    ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-semibold">{mode === 'mn' ? 'Доош хөөх' : 'Downward Delivery'}</div>
                <div className="text-[10px] text-slate-400">{mode === 'mn' ? 'Агаарыг дээш түлхэх' : 'Upward displacement of air'}</div>
              </button>

              <button
                onClick={() => setSelectedCollection('syringe')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedCollection === 'syringe'
                    ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-semibold">{mode === 'mn' ? 'Хийн шприц' : 'Gas Syringe'}</div>
                <div className="text-[10px] text-slate-400">{mode === 'mn' ? 'Агаар нэвтрэхгүй битүү эзлэхүүнт цилиндр' : 'Airtight sealed volume cylinder'}</div>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleRunExperiment}
              disabled={isRunning}
              className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{mode === 'mn' ? 'Туршилтыг эхлүүлэх & Үнэлэх' : 'Assemble & Run Experiment'}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Apparatus Stage & Live Feedback (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between min-h-[440px]">
          {/* Visual Rig Animation */}
          <div className="relative h-64 border border-slate-800/80 rounded-xl bg-slate-900/50 p-4 flex items-center justify-around overflow-hidden">
            {/* Reaction Generator Flask */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-24 border-2 border-slate-500 rounded-b-3xl bg-slate-800/40 relative flex flex-col justify-end p-1">
                {/* Reactant Liquid with Bubbles */}
                <div className="w-full h-12 bg-teal-900/40 rounded-b-2xl relative overflow-hidden flex items-center justify-center">
                  {isRunning && (
                    <div className="absolute inset-0 flex items-center justify-center space-x-1 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200" />
                    </div>
                  )}
                  <span className="text-[8px] font-mono text-slate-300">{mode === 'mn' ? 'Урвалж' : 'Reactants'}</span>
                </div>
                {/* Rubber Bung */}
                <div className="absolute -top-3 w-10 h-3 bg-amber-900 rounded" />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">{mode === 'mn' ? 'Урвалын колб' : 'Reaction Flask'}</span>
            </div>

            {/* Delivery Tube */}
            <div className="h-0.5 w-16 bg-slate-500 relative">
              {isRunning && (
                <div
                  className="w-3 h-1.5 rounded-full absolute -top-0.5 animate-ping"
                  style={{ backgroundColor: currentGas.colorHex }}
                />
              )}
            </div>

            {/* Drying Tube if selected */}
            {selectedDrying !== 'none' && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-20 border-2 border-slate-500 rounded-xl bg-slate-800/40 flex flex-col justify-end p-1 relative">
                  <div
                    className="w-full rounded-b-lg flex items-center justify-center"
                    style={{
                      height: '60%',
                      backgroundColor:
                        selectedDrying === 'conc_h2so4'
                          ? '#ca8a0440'
                          : selectedDrying === 'cacl2'
                          ? '#cbd5e140'
                          : '#f59e0b40'
                    }}
                  >
                    <span className="text-[7px] font-mono text-slate-300 font-bold">
                      {selectedDrying === 'conc_h2so4' ? 'H₂SO₄' : selectedDrying === 'cacl2' ? 'CaCl₂' : 'CaO'}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 font-mono">Drying Agent</span>
              </div>
            )}

            {/* Delivery Tube to Collection */}
            <div className="h-0.5 w-16 bg-slate-500" />

            {/* Collection Vessel Visual */}
            <div className="flex flex-col items-center">
              {selectedCollection === 'water' && (
                <div className="relative flex flex-col items-center">
                  {/* Trough */}
                  <div className="w-24 h-12 border-2 border-cyan-500/60 rounded-b-xl bg-cyan-950/40 flex items-end justify-center pb-1">
                    {/* Inverted Cylinder */}
                    <div className="w-8 h-24 border-2 border-slate-400 rounded-t-lg bg-slate-800/60 -mb-2 flex flex-col justify-start p-0.5">
                      {isRunning && (
                        <div
                          className="w-full rounded-t transition-all duration-1000"
                          style={{
                            height: evaluationResult?.success ? '70%' : '15%',
                            backgroundColor: currentGas.colorHex + '80'
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <span className="text-[9px] text-cyan-400 mt-1 font-mono">Over Water</span>
                </div>
              )}

              {selectedCollection === 'upward' && (
                <div className="relative flex flex-col items-center">
                  {/* Inverted Gas Jar */}
                  <div className="w-10 h-28 border-2 border-slate-400 rounded-t-xl bg-slate-800/50 flex flex-col justify-start p-1 relative">
                    <div className="w-1 h-20 bg-slate-500 absolute bottom-0 left-4" />
                    {isRunning && (
                      <div
                        className="w-full rounded-t-lg transition-all duration-1000"
                        style={{
                          height: evaluationResult?.success ? '80%' : '20%',
                          backgroundColor: currentGas.colorHex + '80'
                        }}
                      />
                    )}
                  </div>
                  <span className="text-[9px] text-cyan-400 mt-1 font-mono">Upward Delivery</span>
                </div>
              )}

              {selectedCollection === 'downward' && (
                <div className="relative flex flex-col items-center">
                  {/* Upright Gas Jar */}
                  <div className="w-10 h-28 border-2 border-slate-400 rounded-b-xl bg-slate-800/50 flex flex-col justify-end p-1 relative">
                    <div className="w-1 h-20 bg-slate-500 absolute top-0 left-4" />
                    {isRunning && (
                      <div
                        className="w-full rounded-b-lg transition-all duration-1000"
                        style={{
                          height: evaluationResult?.success ? '80%' : '20%',
                          backgroundColor: currentGas.colorHex + '80'
                        }}
                      />
                    )}
                  </div>
                  <span className="text-[9px] text-cyan-400 mt-1 font-mono">{mode === 'mn' ? 'Доош хөөх' : 'Downward Delivery'}</span>
                </div>
              )}

              {selectedCollection === 'syringe' && (
                <div className="relative flex flex-col items-center">
                  {/* Gas Syringe */}
                  <div className="w-32 h-8 border-2 border-slate-400 rounded bg-slate-800/50 relative flex items-center p-0.5">
                    {/* Plunger */}
                    <div
                      className="h-full bg-teal-500/70 rounded transition-all duration-1000"
                      style={{ width: isRunning && evaluationResult?.success ? '75%' : '15%' }}
                    />
                    <div className="w-2 h-12 bg-slate-400 -mr-2 absolute right-0" />
                  </div>
                  <span className="text-[9px] text-cyan-400 mt-1 font-mono">{mode === 'mn' ? 'Хийн шприц (100 cm³)' : 'Gas Syringe (100 cm³)'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Test Collected Gas Button */}
          {evaluationResult && (
            <div className="mt-4 p-4 rounded-xl border bg-slate-900/90 border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  {evaluationResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                  )}
                  <span className="font-bold text-sm text-white">
                    {evaluationResult.success
                      ? (mode === 'mn' ? 'Амжилттай цуглуулав!' : 'Gas Collected Successfully!')
                      : (mode === 'mn' ? 'Туршилтын алдаа илэрлээ' : 'Experimental Setup Fault')}
                  </span>
                </div>

                <div className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-teal-300">
                  {mode === 'mn' ? 'Кэмбрижийн оноо: ' : 'Cambridge Mark: '}{evaluationResult.markAwarded} / {evaluationResult.maxMarks}
                </div>
              </div>

              {/* Feedback Points */}
              <div className="text-xs space-y-1.5 text-slate-300">
                <p>
                  <strong className="text-amber-400">{mode === 'mn' ? 'Хатаалт: ' : 'Drying: '}</strong>
                  {mode === 'mn' ? evaluationResult.dryingFeedbackMn : evaluationResult.dryingFeedbackEn}
                </p>
                <p>
                  <strong className="text-cyan-400">{mode === 'mn' ? 'Цуглуулалт: ' : 'Collection: '}</strong>
                  {mode === 'mn' ? evaluationResult.collectionFeedbackMn : evaluationResult.collectionFeedbackEn}
                </p>
              </div>

              {/* Perform Identification Test Button */}
              {evaluationResult.success && (
                <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={handlePerformTest}
                    className="w-full sm:w-auto px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>{mode === 'mn' ? 'Ялгарсан хийг шалгах (Confirm Gas)' : 'Perform Cambridge Gas Test'}</span>
                  </button>

                  {testTested && (
                    <div className="text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 p-2 rounded-lg flex-1">
                      <strong>{mode === 'mn' ? 'Үр дүн: ' : 'Result: '}</strong>
                      {mode === 'mn' ? currentGas.testObservationMn : currentGas.testObservationEn}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
