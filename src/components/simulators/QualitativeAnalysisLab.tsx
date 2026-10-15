import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChemText } from '../common/ChemText';
import { CambridgePracticalGuideModal } from './CambridgePracticalGuideModal';
import { 
  Flame, 
  TestTube2, 
  CheckCircle2, 
  RotateCcw, 
  AlertTriangle, 
  HelpCircle,
  BookOpen,
  Sparkles,
  Droplets,
  Wind,
  Layers
} from 'lucide-react';

interface UnknownSample {
  id: string;
  code: string;
  nameEn: string;
  nameMn: string;
  cation: string;
  anion: string;
  formula: string;
  flameColorNameEn: string;
  flameColorNameMn: string;
  flameHex?: string;
  naohDropsEn: string;
  naohDropsMn: string;
  naohExcessEn: string;
  naohExcessMn: string;
  nh3DropsEn: string;
  nh3DropsMn: string;
  nh3ExcessEn: string;
  nh3ExcessMn: string;
  agno3TestEn: string;
  agno3TestMn: string;
  bano3TestEn: string;
  bano3TestMn: string;
  acidTestEn: string;
  acidTestMn: string;
  alFoilTestEn: string;
  alFoilTestMn: string;
  precipitateHex?: string;
  precipitateExcessHex?: string;
  gasProduced?: 'co2' | 'nh3' | 'none';
}

const SAMPLES: UnknownSample[] = [
  {
    id: 'sample-1',
    code: 'Solution X-1',
    nameEn: 'Copper(II) Sulfate, CuSO₄',
    nameMn: 'Зэсийн(II) сульфат, CuSO₄',
    cation: 'Cu²⁺',
    anion: 'SO₄²⁻',
    formula: 'CuSO4',
    flameColorNameEn: 'Blue-green flame',
    flameColorNameMn: 'Цэнхэр-ногоон дөл',
    flameHex: '#06b6d4',
    naohDropsEn: 'Light blue precipitate forms',
    naohDropsMn: 'Цайвар цэнхэр тунадас үүснэ',
    naohExcessEn: 'Precipitate is insoluble in excess NaOH',
    naohExcessMn: 'Тунадас илүүдэл NaOH-д уусахгүй үлдэнэ',
    nh3DropsEn: 'Light blue precipitate forms',
    nh3DropsMn: 'Цайвар цэнхэр тунадас үүснэ',
    nh3ExcessEn: 'Precipitate dissolves giving a deep dark royal blue solution',
    nh3ExcessMn: 'Тунадас уусч гүн хөх өнгөтэй тунгалаг уусмал болно',
    agno3TestEn: 'No precipitate',
    agno3TestMn: 'Тунадас үүсэхгүй',
    bano3TestEn: 'Dense white precipitate forms (BaSO₄)',
    bano3TestMn: 'Нягт цагаан тунадас үүснэ (BaSO₄)',
    acidTestEn: 'No reaction / no effervescence',
    acidTestMn: 'Урвал явагдахгүй, хөөсрөхгүй',
    alFoilTestEn: 'No ammonia evolved',
    alFoilTestMn: 'Аммиак ялгарахгүй',
    precipitateHex: '#38bdf8',
    precipitateExcessHex: '#1e3a8a',
    gasProduced: 'none'
  },
  {
    id: 'sample-2',
    code: 'Solution X-2',
    nameEn: 'Iron(II) Bromide, FeBr₂',
    nameMn: 'Төмрийн(II) бромид, FeBr₂',
    cation: 'Fe²⁺',
    anion: 'Br⁻',
    formula: 'FeBr2',
    flameColorNameEn: 'No distinctive flame color',
    flameColorNameMn: 'Өвөрмөц өнгө үзүүлэхгүй',
    naohDropsEn: 'Green precipitate forms',
    naohDropsMn: 'Ногоон тунадас үүснэ',
    naohExcessEn: 'Insoluble in excess; surface slowly turns brown on standing in air',
    naohExcessMn: 'Илүүдэлд уусахгүй; агаарт байлгахад гадарга нь хүрэн болно',
    nh3DropsEn: 'Green precipitate forms',
    nh3DropsMn: 'Ногоон тунадас үүснэ',
    nh3ExcessEn: 'Insoluble in excess aqueous ammonia',
    nh3ExcessMn: 'Аммиакийн илүүдэлд уусахгүй',
    agno3TestEn: 'Cream precipitate forms (AgBr)',
    agno3TestMn: 'Цөцгийн шаргал-цагаан тунадас үүснэ (AgBr)',
    bano3TestEn: 'No precipitate',
    bano3TestMn: 'Тунадас үүсэхгүй',
    acidTestEn: 'No effervescence',
    acidTestMn: 'Хөөсрөхгүй',
    alFoilTestEn: 'No reaction',
    alFoilTestMn: 'Өөрчлөлтгүй',
    precipitateHex: '#16a34a',
    gasProduced: 'none'
  },
  {
    id: 'sample-3',
    code: 'Solution X-3',
    nameEn: 'Aluminium Chloride, AlCl₃',
    nameMn: 'Хөнгөн цагааны хлорид, AlCl₃',
    cation: 'Al³⁺',
    anion: 'Cl⁻',
    formula: 'AlCl3',
    flameColorNameEn: 'No distinctive flame color',
    flameColorNameMn: 'Өвөрмөц өнгө үзүүлэхгүй',
    naohDropsEn: 'White gelatinous precipitate forms',
    naohDropsMn: 'Цагаан цэлцэгнүүр тунадас үүснэ',
    naohExcessEn: 'Precipitate dissolves completely to give a colorless solution',
    naohExcessMn: 'Тунадас бүрэн уусаж өнгөгүй уусмал болно',
    nh3DropsEn: 'White precipitate forms',
    nh3DropsMn: 'Цагаан тунадас үүснэ',
    nh3ExcessEn: 'Precipitate is INSOLUBLE in excess ammonia (distinguishes from Zn²⁺!)',
    nh3ExcessMn: 'Илүүдэл аммиакт УУСАХГҮЙ үлдэнэ (Zn²⁺-ээс ялгарах гол шинж!)',
    agno3TestEn: 'White precipitate forms (AgCl)',
    agno3TestMn: 'Цагаан тунадас үүснэ (AgCl)',
    bano3TestEn: 'No precipitate',
    bano3TestMn: 'Тунадас үүсэхгүй',
    acidTestEn: 'No effervescence',
    acidTestMn: 'Хөөсрөхгүй',
    alFoilTestEn: 'No reaction',
    alFoilTestMn: 'Өөрчлөлтгүй',
    precipitateHex: '#f8fafc',
    precipitateExcessHex: 'transparent',
    gasProduced: 'none'
  },
  {
    id: 'sample-4',
    code: 'Solution X-4',
    nameEn: 'Zinc Sulfate, ZnSO₄',
    nameMn: 'Цайрын сульфат, ZnSO₄',
    cation: 'Zn²⁺',
    anion: 'SO₄²⁻',
    formula: 'ZnSO4',
    flameColorNameEn: 'No distinctive flame color',
    flameColorNameMn: 'Өвөрмөц өнгө үзүүлэхгүй',
    naohDropsEn: 'White precipitate forms',
    naohDropsMn: 'Цагаан тунадас үүснэ',
    naohExcessEn: 'Precipitate dissolves in excess NaOH giving a colorless solution',
    naohExcessMn: 'Илүүдэл NaOH-д бүрэн уусаж өнгөгүй уусмал болно',
    nh3DropsEn: 'White precipitate forms',
    nh3DropsMn: 'Цагаан тунадас үүснэ',
    nh3ExcessEn: 'Precipitate DISSOLVES in excess ammonia giving a colorless solution',
    nh3ExcessMn: 'Илүүдэл аммиакт БҮРЭН УУСНА (Al³⁺ нь уусдаггүй, Zn²⁺ уусдаг!)',
    agno3TestEn: 'No precipitate',
    agno3TestMn: 'Тунадас үүсэхгүй',
    bano3TestEn: 'Dense white precipitate forms (BaSO₄)',
    bano3TestMn: 'Нягт цагаан тунадас үүснэ (BaSO₄)',
    acidTestEn: 'No effervescence',
    acidTestMn: 'Хөөсрөхгүй',
    alFoilTestEn: 'No reaction',
    alFoilTestMn: 'Өөрчлөлтгүй',
    precipitateHex: '#f1f5f9',
    precipitateExcessHex: 'transparent',
    gasProduced: 'none'
  },
  {
    id: 'sample-5',
    code: 'Solution X-5',
    nameEn: 'Calcium Chloride, CaCl₂',
    nameMn: 'Кальцийн хлорид, CaCl₂',
    cation: 'Ca²⁺',
    anion: 'Cl⁻',
    formula: 'CaCl2',
    flameColorNameEn: 'Orange-red flame',
    flameColorNameMn: 'Улбар шар-улаан дөл',
    flameHex: '#f97316',
    naohDropsEn: 'White precipitate forms',
    naohDropsMn: 'Цагаан тунадас үүснэ',
    naohExcessEn: 'Precipitate is insoluble in excess NaOH',
    naohExcessMn: 'Тунадас илүүдэл NaOH-д уусахгүй үлдэнэ',
    nh3DropsEn: 'No precipitate or very slight faint white haze',
    nh3DropsMn: 'Тунадас үүсэхгүй (эсвэл маш ялимгүй булингар)',
    nh3ExcessEn: 'No precipitate',
    nh3ExcessMn: 'Тунадас үүсэхгүй',
    agno3TestEn: 'White precipitate forms (AgCl)',
    agno3TestMn: 'Цагаан тунадас үүснэ (AgCl)',
    bano3TestEn: 'No precipitate',
    bano3TestMn: 'Тунадас үүсэхгүй',
    acidTestEn: 'No effervescence',
    acidTestMn: 'Хөөсрөхгүй',
    alFoilTestEn: 'No reaction',
    alFoilTestMn: 'Өөрчлөлтгүй',
    precipitateHex: '#f8fafc',
    gasProduced: 'none'
  },
  {
    id: 'sample-6',
    code: 'Solution X-6',
    nameEn: 'Iron(III) Chloride, FeCl₃',
    nameMn: 'Төмрийн(III) хлорид, FeCl₃',
    cation: 'Fe³⁺',
    anion: 'Cl⁻',
    formula: 'FeCl3',
    flameColorNameEn: 'No distinctive flame color',
    flameColorNameMn: 'Өвөрмөц өнгө үзүүлэхгүй',
    naohDropsEn: 'Red-brown precipitate forms',
    naohDropsMn: 'Улаан-хүрэн тунадас үүснэ',
    naohExcessEn: 'Precipitate is insoluble in excess NaOH',
    naohExcessMn: 'Тунадас илүүдэл NaOH-д уусахгүй үлдэнэ',
    nh3DropsEn: 'Red-brown precipitate forms',
    nh3DropsMn: 'Улаан-хүрэн тунадас үүснэ',
    nh3ExcessEn: 'Insoluble in excess aqueous ammonia',
    nh3ExcessMn: 'Аммиакийн илүүдэлд уусахгүй үлдэнэ',
    agno3TestEn: 'White precipitate forms (AgCl)',
    agno3TestMn: 'Цагаан тунадас үүснэ (AgCl)',
    bano3TestEn: 'No precipitate',
    bano3TestMn: 'Тунадас үүсэхгүй',
    acidTestEn: 'No effervescence',
    acidTestMn: 'Хөөсрөхгүй',
    alFoilTestEn: 'No reaction',
    alFoilTestMn: 'Өөрчлөлтгүй',
    precipitateHex: '#b45309',
    gasProduced: 'none'
  },
  {
    id: 'sample-7',
    code: 'Solution X-7',
    nameEn: 'Chromium(III) Nitrate, Cr(NO₃)₃',
    nameMn: 'Хромын(III) нитрат, Cr(NO₃)₃',
    cation: 'Cr³⁺',
    anion: 'NO₃⁻',
    formula: 'Cr(NO3)3',
    flameColorNameEn: 'No distinctive flame color',
    flameColorNameMn: 'Өвөрмөц өнгө үзүүлэхгүй',
    naohDropsEn: 'Green precipitate forms',
    naohDropsMn: 'Ногоон тунадас үүснэ',
    naohExcessEn: 'Precipitate dissolves in excess NaOH giving a green solution',
    naohExcessMn: 'Илүүдэл NaOH-д уусаж тунгалаг ногоон уусмал болно',
    nh3DropsEn: 'Grey-green precipitate forms',
    nh3DropsMn: 'Саарал-ногоон тунадас үүснэ',
    nh3ExcessEn: 'Precipitate is insoluble in excess ammonia',
    nh3ExcessMn: 'Илүүдэл аммиакт уусахгүй үлдэнэ',
    agno3TestEn: 'No precipitate',
    agno3TestMn: 'Тунадас үүсэхгүй',
    bano3TestEn: 'No precipitate',
    bano3TestMn: 'Тунадас үүсэхгүй',
    acidTestEn: 'No effervescence',
    acidTestMn: 'Хөөсрөхгүй',
    alFoilTestEn: 'Ammonia gas produced on warming with NaOH and Al foil (turns damp red litmus blue!)',
    alFoilTestMn: 'NaOH ба хөнгөн цагаан ялтсаар зөөлөн халаахад аммиакийн хий ялгарч чийгтэй улаан лакмусыг хөх болгоно!',
    precipitateHex: '#047857',
    precipitateExcessHex: '#065f46',
    gasProduced: 'nh3'
  },
  {
    id: 'sample-8',
    code: 'Solution X-8',
    nameEn: 'Ammonium Chloride, NH₄Cl',
    nameMn: 'Аммонийн хлорид, NH₄Cl',
    cation: 'NH₄⁺',
    anion: 'Cl⁻',
    formula: 'NH4Cl',
    flameColorNameEn: 'No flame color',
    flameColorNameMn: 'Дөлний өнгө үзүүлэхгүй',
    naohDropsEn: 'No precipitate in the cold; on gentle warming, ammonia gas is evolved (pungent smell, turns damp red litmus blue)',
    naohDropsMn: 'Хүйтэнд тунадас үүсэхгүй; зөөлөн халаахад хурц үнэртэй аммиакийн хий ялгарч чийгтэй улаан лакмусыг хөх өнгөтэй болгоно',
    naohExcessEn: 'No precipitate; ammonia continues evolving',
    naohExcessMn: 'Тунадас үүсэхгүй; аммиак үргэлжлэн ялгарна',
    nh3DropsEn: 'No reaction / no change',
    nh3DropsMn: 'Өөрчлөлтгүй',
    nh3ExcessEn: 'No reaction',
    nh3ExcessMn: 'Өөрчлөлтгүй',
    agno3TestEn: 'White precipitate forms (AgCl)',
    agno3TestMn: 'Цагаан тунадас үүснэ (AgCl)',
    bano3TestEn: 'No precipitate',
    bano3TestMn: 'Тунадас үүсэхгүй',
    acidTestEn: 'No effervescence',
    acidTestMn: 'Хөөсрөхгүй',
    alFoilTestEn: 'Already contains NH₄⁺, gives ammonia with NaOH alone without Al foil',
    alFoilTestMn: 'Аммонийн ион агуулж байгаа тул зөвхөн NaOH-оор халаахад ч аммиак ялгарна',
    gasProduced: 'nh3'
  },
  {
    id: 'sample-9',
    code: 'Solution X-9',
    nameEn: 'Potassium Iodide, KI',
    nameMn: 'Калийн иодид, KI',
    cation: 'K⁺',
    anion: 'I⁻',
    formula: 'KI',
    flameColorNameEn: 'Lilac flame',
    flameColorNameMn: 'Нил ягаан (Лилак) дөл',
    flameHex: '#c084fc',
    naohDropsEn: 'No precipitate',
    naohDropsMn: 'Тунадас үүсэхгүй',
    naohExcessEn: 'No precipitate',
    naohExcessMn: 'Тунадас үүсэхгүй',
    nh3DropsEn: 'No precipitate',
    nh3DropsMn: 'Тунадас үүсэхгүй',
    nh3ExcessEn: 'No precipitate',
    nh3ExcessMn: 'Тунадас үүсэхгүй',
    agno3TestEn: 'Bright yellow precipitate forms (AgI, insoluble in aqueous ammonia)',
    agno3TestMn: 'Тод шар тунадас үүснэ (AgI, аммиакийн уусмалд уусдаггүй)',
    bano3TestEn: 'No precipitate',
    bano3TestMn: 'Тунадас үүсэхгүй',
    acidTestEn: 'No effervescence',
    acidTestMn: 'Хөөсрөхгүй',
    alFoilTestEn: 'No reaction',
    alFoilTestMn: 'Өөрчлөлтгүй',
    precipitateHex: '#eab308',
    gasProduced: 'none'
  },
  {
    id: 'sample-10',
    code: 'Solution X-10',
    nameEn: 'Sodium Carbonate, Na₂CO₃',
    nameMn: 'Натрийн карбонат, Na₂CO₃',
    cation: 'Na⁺',
    anion: 'CO₃²⁻',
    formula: 'Na2CO3',
    flameColorNameEn: 'Persistent bright yellow flame',
    flameColorNameMn: 'Тод шар дөл',
    flameHex: '#facc15',
    naohDropsEn: 'No precipitate',
    naohDropsMn: 'Тунадас үүсэхгүй',
    naohExcessEn: 'No precipitate',
    naohExcessMn: 'Тунадас үүсэхгүй',
    nh3DropsEn: 'No precipitate',
    nh3DropsMn: 'Тунадас үүсэхгүй',
    nh3ExcessEn: 'No precipitate',
    nh3ExcessMn: 'Тунадас үүсэхгүй',
    agno3TestEn: 'Cream-white precipitate of Ag₂CO₃',
    agno3TestMn: 'Цайвар шар-цагаан Ag₂CO₃ тунадас үүснэ',
    bano3TestEn: 'White precipitate forms (BaCO₃)',
    bano3TestMn: 'Цагаан BaCO₃ тунадас үүснэ',
    acidTestEn: 'Rapid effervescence! Gas evolved turns limewater cloudy milky (confirmed CO₂)',
    acidTestMn: 'Хүчтэй хөөсөрч хий ялгарна! Ялгарсан хий шохойн усыг булингартуулж цайлгана (CO₂ батлагдав)',
    alFoilTestEn: 'No reaction',
    alFoilTestMn: 'Өөрчлөлтгүй',
    gasProduced: 'co2'
  }
];

export const QualitativeAnalysisLab: React.FC = () => {
  const { mode } = useLanguage();
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
  const [activeTest, setActiveTest] = useState<
    'none' | 'naoh_drops' | 'naoh_excess' | 'nh3_drops' | 'nh3_excess' | 'flame' | 'agno3' | 'bano3' | 'acid_test' | 'al_foil'
  >('none');
  const [testHistory, setTestHistory] = useState<string[]>([]);
  const [guessedCation, setGuessedCation] = useState<string>('');
  const [guessedAnion, setGuessedAnion] = useState<string>('');
  const [submittedFeedback, setSubmittedFeedback] = useState<{ isCorrect: boolean; text: string; marks: number } | null>(null);
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false);

  const sample = SAMPLES[selectedSampleIndex];

  const runTest = (testType: typeof activeTest) => {
    setActiveTest(testType);
    if (!testHistory.includes(testType)) {
      setTestHistory(prev => [...prev, testType]);
    }
    setSubmittedFeedback(null);
  };

  const resetLab = () => {
    setActiveTest('none');
    setTestHistory([]);
    setGuessedCation('');
    setGuessedAnion('');
    setSubmittedFeedback(null);
  };

  const handleVerify = () => {
    const cationCorrect = guessedCation === sample.cation;
    const anionCorrect = guessedAnion === sample.anion;

    let marks = 0;
    if (cationCorrect) marks += 2;
    if (anionCorrect) marks += 2;

    if (cationCorrect && anionCorrect) {
      setSubmittedFeedback({
        isCorrect: true,
        marks: 4,
        text: mode === 'mn'
          ? `Онц сайн! Та ${sample.nameMn} (${sample.formula}) давсыг катион, анионы бүх шинжээр нь бүрэн зөв танилаа. Cambridge Paper 6-ийн бүтэн 4/4 оноо авлаа!`
          : `Excellent! You accurately deduced ${sample.nameEn} (${sample.formula}) based on cation precipitation and anion tests. Awarded full 4/4 Cambridge Paper 6 marks!`
      });
    } else {
      setSubmittedFeedback({
        isCorrect: false,
        marks,
        text: mode === 'mn'
          ? `Хэсэгчилсэн оноо: ${marks}/4. Зөв таних учиртай байсан нь: Катион: ${sample.cation}, Анион: ${sample.anion} (${sample.nameMn}). "Official Notes for Qualitative Analysis" лавлахаас тунадасны өнгө болон илүүдэлд уусах чанарыг нягтална уу.`
          : `Partial score: ${marks}/4. Correct identification: Cation: ${sample.cation}, Anion: ${sample.anion} (${sample.nameEn}). Consult the official Notes for Qualitative Analysis to check precipitation & excess solubility.`
      });
    }
  };

  // Get current observation text
  const getObservation = () => {
    switch (activeTest) {
      case 'naoh_drops':
        return { en: sample.naohDropsEn, mn: sample.naohDropsMn };
      case 'naoh_excess':
        return { en: sample.naohExcessEn, mn: sample.naohExcessMn };
      case 'nh3_drops':
        return { en: sample.nh3DropsEn, mn: sample.nh3DropsMn };
      case 'nh3_excess':
        return { en: sample.nh3ExcessEn, mn: sample.nh3ExcessMn };
      case 'flame':
        return { en: sample.flameColorNameEn, mn: sample.flameColorNameMn };
      case 'agno3':
        return { en: sample.agno3TestEn, mn: sample.agno3TestMn };
      case 'bano3':
        return { en: sample.bano3TestEn, mn: sample.bano3TestMn };
      case 'acid_test':
        return { en: sample.acidTestEn, mn: sample.acidTestMn };
      case 'al_foil':
        return { en: sample.alFoilTestEn, mn: sample.alFoilTestMn };
      default:
        return {
          en: 'Select a reagent test below to observe chemical precipitates, colors, flame emission, or gas release.',
          mn: 'Доорх урвалжуудаас сонгон химийн тунадас, дөлний өнгө, эсвэл ялгарах хийн шинжийг ажиглана уу.'
        };
    }
  };

  const observation = getObservation();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
              Cambridge Paper 6 Alternative to Practical
            </span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-slate-400 text-xs font-mono">Topic 12 Qualitative Analysis</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {mode === 'mn' ? 'Үл мэдэгдэх давс таних чанарын шинжилгээний лаб' : 'Paper 6 Qualitative Analysis & Mystery Salt Lab'}
          </h3>
        </div>

        {/* Action Controls & Official Reference Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowNotesModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-300 text-xs font-semibold border border-purple-700/60 shadow-xs transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{mode === 'mn' ? 'Кэмбрижийн албан ёсны хүснэгт' : 'Official Paper 6 Reference'}</span>
          </button>

          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1">
            <label className="text-xs text-slate-400 font-mono">Sample:</label>
            <select
              value={selectedSampleIndex}
              onChange={e => {
                setSelectedSampleIndex(Number(e.target.value));
                resetLab();
              }}
              className="bg-transparent text-white text-xs font-mono font-bold focus:outline-none"
            >
              {SAMPLES.map((s, idx) => (
                <option key={s.id} value={idx} className="bg-slate-900 text-white">
                  {s.code}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={resetLab}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
            title="Reset Lab"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Test Tube & Flame Visual Stage (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-between min-h-[380px] relative">
          <div className="w-full flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2 mb-2">
            <span className="text-slate-400">Current Unknown:</span>
            <span className="text-purple-300 font-bold px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/60">
              {sample.code}
            </span>
          </div>

          {/* Central Visual Presentation */}
          <div className="my-auto flex flex-col items-center justify-center">
            {activeTest === 'flame' ? (
              /* Flame Test Visual */
              <div className="flex flex-col items-center space-y-4">
                <div className="relative flex items-center justify-center w-40 h-52">
                  {/* Bunsen Burner base & collar */}
                  <div className="absolute bottom-0 w-20 h-10 bg-slate-700 border-2 border-slate-600 rounded-b-xl shadow-lg" />
                  <div className="absolute bottom-10 w-6 h-16 bg-slate-400 border border-slate-300" />
                  {/* Air hole collar */}
                  <div className="absolute bottom-12 w-7 h-4 bg-amber-700 rounded-xs" />
                  {/* Nichrome wire holding sample into flame */}
                  <div className="absolute bottom-28 w-32 h-1 bg-slate-300 rotate-12 -left-6 shadow-sm" />
                  <div className="absolute bottom-32 left-20 w-3 h-3 rounded-full bg-slate-200" />

                  {/* Flame Animation */}
                  <div
                    className="w-16 h-32 rounded-full blur-[2px] animate-pulse transition-all duration-500 shadow-2xl"
                    style={{
                      backgroundColor: sample.flameHex || '#f59e0b',
                      boxShadow: `0 0 50px ${sample.flameHex || '#f59e0b'}`
                    }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-white px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
                  {mode === 'mn' ? sample.flameColorNameMn : sample.flameColorNameEn}
                </span>
              </div>
            ) : (
              /* Test Tube Stage */
              <div className="flex flex-col items-center">
                {/* Litmus Paper / Gas Evolved Visual for NH3/CO2 tests */}
                {activeTest === 'al_foil' && sample.gasProduced === 'nh3' && (
                  <div className="mb-2 flex items-center gap-1.5 p-1 px-2.5 rounded bg-blue-900/60 border border-blue-500 text-[10px] text-blue-200 font-mono animate-pulse">
                    <span className="w-2 h-4 bg-blue-500 rounded-xs" />
                    <span>Damp red litmus turns BLUE (NH₃ gas!)</span>
                  </div>
                )}

                {activeTest === 'acid_test' && sample.gasProduced === 'co2' && (
                  <div className="mb-2 flex items-center gap-1.5 p-1 px-2.5 rounded bg-slate-800 border border-slate-600 text-[10px] text-slate-200 font-mono animate-bounce">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    <span>Effervescence → Limewater turns MILKY (CO₂!)</span>
                  </div>
                )}

                {/* Test Tube Rack & Vessel */}
                <div className="w-20 h-56 border-2 border-slate-400 rounded-b-full bg-slate-800/30 backdrop-blur-sm relative overflow-hidden flex flex-col justify-end p-1 shadow-inner">
                  {/* Bubbles in liquid for gas tests */}
                  {activeTest === 'acid_test' && sample.gasProduced === 'co2' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 opacity-80 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                      <span className="w-2 h-2 bg-white rounded-full animate-ping delay-75" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping delay-150" />
                    </div>
                  )}

                  {/* Liquid / Precipitate inside */}
                  {activeTest !== 'none' ? (
                    <div
                      className="w-full rounded-b-full transition-all duration-700 relative flex items-center justify-center"
                      style={{
                        height: activeTest.includes('excess') ? '78%' : '48%',
                        backgroundColor:
                          activeTest === 'nh3_excess' && sample.precipitateExcessHex
                            ? sample.precipitateExcessHex
                            : activeTest === 'naoh_excess' && sample.precipitateExcessHex === 'transparent'
                            ? '#0284c720'
                            : sample.precipitateHex || '#0284c740'
                      }}
                    >
                      <span className="text-[9px] font-mono text-white font-bold drop-shadow px-1 text-center">
                        {activeTest.includes('excess')
                          ? (sample.precipitateExcessHex === 'transparent' ? 'Dissolved' : 'Excess')
                          : activeTest === 'acid_test' && sample.gasProduced === 'co2'
                          ? 'Effervescence'
                          : 'Precipitate'}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-24 bg-cyan-900/30 rounded-b-full flex items-center justify-center">
                      <span className="text-[10px] font-mono text-slate-400">Sample X solution</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-slate-400 mt-2 font-mono">{sample.code}</span>
              </div>
            )}
          </div>

          {/* Live Observation Callout Box */}
          <div className="w-full mt-4 p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-[11px] uppercase tracking-wider font-mono">
                {mode === 'mn' ? 'Туршилтын бодит ажиглалт (Observation):' : 'Cambridge Paper 6 Observation:'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {activeTest !== 'none' ? activeTest.replace('_', ' ').toUpperCase() : 'INITIAL'}
              </span>
            </div>
            <p className="text-slate-100 font-medium leading-relaxed">
              {mode === 'mn' ? observation.mn : observation.en}
            </p>
          </div>
        </div>

        {/* Right Column: Reagent Actions Deck & Student Deduction (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Reagents Deck */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono block">
              {mode === 'mn' ? 'Шинжилгээний сорил явуулах урвалжууд:' : 'Analytical Reagent Tests:'}
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Cation Tests */}
              <button
                onClick={() => runTest('naoh_drops')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeTest === 'naoh_drops'
                    ? 'bg-purple-950/70 border-purple-500 text-white ring-1 ring-purple-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">Add drops of NaOH(aq)</div>
                <div className="text-[10px] text-slate-400">Цөөн дусал NaOH нэмэх</div>
              </button>

              <button
                onClick={() => runTest('naoh_excess')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeTest === 'naoh_excess'
                    ? 'bg-purple-950/70 border-purple-500 text-white ring-1 ring-purple-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">Add excess NaOH(aq)</div>
                <div className="text-[10px] text-slate-400">Илүүдэл NaOH нэмэх</div>
              </button>

              <button
                onClick={() => runTest('nh3_drops')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeTest === 'nh3_drops'
                    ? 'bg-purple-950/70 border-purple-500 text-white ring-1 ring-purple-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">Add drops of NH₃(aq)</div>
                <div className="text-[10px] text-slate-400">Цөөн дусал NH₃ нэмэх</div>
              </button>

              <button
                onClick={() => runTest('nh3_excess')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeTest === 'nh3_excess'
                    ? 'bg-purple-950/70 border-purple-500 text-white ring-1 ring-purple-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">Add excess NH₃(aq)</div>
                <div className="text-[10px] text-slate-400">Илүүдэл NH₃ нэмэх</div>
              </button>

              {/* Anion Tests */}
              <button
                onClick={() => runTest('agno3')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeTest === 'agno3'
                    ? 'bg-purple-950/70 border-purple-500 text-white ring-1 ring-purple-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">HNO₃ + AgNO₃ (Halide test)</div>
                <div className="text-[10px] text-slate-400">Галид ион шалгах (Cl⁻, Br⁻, I⁻)</div>
              </button>

              <button
                onClick={() => runTest('bano3')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeTest === 'bano3'
                    ? 'bg-purple-950/70 border-purple-500 text-white ring-1 ring-purple-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">HNO₃ + Ba(NO₃)₂ (Sulfate test)</div>
                <div className="text-[10px] text-slate-400">Сульфат ион шалгах (SO₄²⁻)</div>
              </button>

              <button
                onClick={() => runTest('acid_test')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeTest === 'acid_test'
                    ? 'bg-purple-950/70 border-purple-500 text-white ring-1 ring-purple-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">Dilute HCl + Limewater (CO₃²⁻)</div>
                <div className="text-[10px] text-slate-400">Карбонат ба CO₂ хий шалгах</div>
              </button>

              <button
                onClick={() => runTest('al_foil')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeTest === 'al_foil'
                    ? 'bg-purple-950/70 border-purple-500 text-white ring-1 ring-purple-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold">NaOH + Al foil + warm (NO₃⁻)</div>
                <div className="text-[10px] text-slate-400">Нитрат ионыг аммиак болгон ангижруулах</div>
              </button>

              {/* Flame Test full width */}
              <button
                onClick={() => runTest('flame')}
                className={`p-2.5 rounded-xl border text-left transition-all col-span-2 ${
                  activeTest === 'flame'
                    ? 'bg-amber-950/70 border-amber-500 text-white ring-1 ring-amber-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Perform Flame Test (Nichrome wire in non-luminous Bunsen flame)
                </div>
                <div className="text-[10px] text-slate-400">Дөлний өнгөөр металлын катионыг таних</div>
              </button>
            </div>
          </div>

          {/* Student Deduction Form */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                {mode === 'mn' ? 'Таны гаргалгаа (Deduce the Unknown Salt):' : 'Cambridge Student Deduction:'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">4 Marks Available</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-mono">Identify Cation (2 marks):</label>
                <select
                  value={guessedCation}
                  onChange={e => setGuessedCation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 font-mono text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select Cation...</option>
                  <option value="Cu²⁺">Cu²⁺ (Copper II)</option>
                  <option value="Fe²⁺">Fe²⁺ (Iron II)</option>
                  <option value="Fe³⁺">Fe³⁺ (Iron III)</option>
                  <option value="Al³⁺">Al³⁺ (Aluminium)</option>
                  <option value="Zn²⁺">Zn²⁺ (Zinc)</option>
                  <option value="Ca²⁺">Ca²⁺ (Calcium)</option>
                  <option value="Cr³⁺">Cr³⁺ (Chromium III)</option>
                  <option value="NH₄⁺">NH₄⁺ (Ammonium)</option>
                  <option value="K⁺">K⁺ (Potassium)</option>
                  <option value="Na⁺">Na⁺ (Sodium)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-mono">Identify Anion (2 marks):</label>
                <select
                  value={guessedAnion}
                  onChange={e => setGuessedAnion(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 font-mono text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select Anion...</option>
                  <option value="SO₄²⁻">SO₄²⁻ (Sulfate)</option>
                  <option value="Cl⁻">Cl⁻ (Chloride)</option>
                  <option value="Br⁻">Br⁻ (Bromide)</option>
                  <option value="I⁻">I⁻ (Iodide)</option>
                  <option value="NO₃⁻">NO₃⁻ (Nitrate)</option>
                  <option value="CO₃²⁻">CO₃²⁻ (Carbonate)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={!guessedCation || !guessedAnion}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              {mode === 'mn' ? 'Дүгнэлтээ шалгуулах (Submit Paper 6 Deduction)' : 'Submit Deduction & Score Marks'}
            </button>

            {submittedFeedback && (
              <div
                className={`p-3.5 rounded-xl text-xs leading-relaxed border space-y-1 ${
                  submittedFeedback.isCorrect
                    ? 'bg-emerald-950/50 border-emerald-700/80 text-emerald-200'
                    : 'bg-rose-950/50 border-rose-700/80 text-rose-200'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>{submittedFeedback.isCorrect ? 'Correct Deduction!' : 'Identification Incomplete'}</span>
                  <span className="font-mono">{submittedFeedback.marks} / 4 Marks</span>
                </div>
                <p>{submittedFeedback.text}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Official Cambridge Notes Reference Modal */}
      <CambridgePracticalGuideModal
        isOpen={showNotesModal}
        onClose={() => setShowNotesModal(false)}
        defaultTab="qualitative"
      />
    </div>
  );
};
