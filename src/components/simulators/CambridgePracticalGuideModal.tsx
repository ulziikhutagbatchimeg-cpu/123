import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChemText } from '../common/ChemText';
import { X, Search, BookOpen, Scale, Sparkles, Flame, Wind, Droplets } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'qualitative' | 'apparatus' | 'gases';
}

export const CambridgePracticalGuideModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultTab = 'qualitative'
}) => {
  const { mode } = useLanguage();
  const [activeTab, setActiveTab] = useState<'qualitative' | 'apparatus' | 'gases'>(defaultTab);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const cations = [
    {
      ion: 'Al³⁺ (Aluminium)',
      naoh: {
        en: 'White ppt., soluble in excess, giving a colorless solution',
        mn: 'Цагаан тунадас үүснэ, илүүдэлд уусаж өнгөгүй уусмал болно'
      },
      nh3: {
        en: 'White ppt., insoluble in excess',
        mn: 'Цагаан тунадас үүснэ, илүүдэлд уусахгүй үлдэнэ'
      }
    },
    {
      ion: 'NH₄⁺ (Ammonium)',
      naoh: {
        en: 'Ammonia gas produced on warming (turns damp red litmus blue)',
        mn: 'Халаахад аммиакийн хий ялгарна (чийгтэй улаан лакмусыг хөх болгоно)'
      },
      nh3: {
        en: 'No reaction / no change',
        mn: 'Урвал явагдахгүй / өөрчлөлтгүй'
      }
    },
    {
      ion: 'Ca²⁺ (Calcium)',
      naoh: {
        en: 'White ppt., insoluble in excess',
        mn: 'Цагаан тунадас үүснэ, илүүдэлд уусахгүй үлдэнэ'
      },
      nh3: {
        en: 'No ppt. or very slight white ppt.',
        mn: 'Тунадас үүсэхгүй (эсвэл маш ялимгүй цагаан булингар)'
      }
    },
    {
      ion: 'Cr³⁺ (Chromium III)',
      naoh: {
        en: 'Green ppt., soluble in excess giving green solution',
        mn: 'Ногоон тунадас үүснэ, илүүдэлд уусаж ногоон уусмал үүсгэнэ'
      },
      nh3: {
        en: 'Grey-green ppt., insoluble in excess',
        mn: 'Саарал-ногоон тунадас үүснэ, илүүдэлд уусахгүй'
      }
    },
    {
      ion: 'Cu²⁺ (Copper II)',
      naoh: {
        en: 'Light blue ppt., insoluble in excess',
        mn: 'Цайвар цэнхэр тунадас үүснэ, илүүдэлд уусахгүй'
      },
      nh3: {
        en: 'Light blue ppt., soluble in excess giving a deep dark blue solution',
        mn: 'Цайвар цэнхэр тунадас үүснэ, илүүдэлд уусаж гүн хөх уусмал болно'
      }
    },
    {
      ion: 'Fe²⁺ (Iron II)',
      naoh: {
        en: 'Green ppt., insoluble in excess; turns brown on surface standing in air',
        mn: 'Ногоон тунадас үүснэ, илүүдэлд уусахгүй; агаарт байлгахад гадарга нь хүрэн болно'
      },
      nh3: {
        en: 'Green ppt., insoluble in excess; turns brown on surface standing in air',
        mn: 'Ногоон тунадас үүснэ, илүүдэлд уусахгүй; агаарт байлгахад хүрэн болно'
      }
    },
    {
      ion: 'Fe³⁺ (Iron III)',
      naoh: {
        en: 'Red-brown ppt., insoluble in excess',
        mn: 'Хүрэн-улаан тунадас үүснэ, илүүдэлд уусахгүй'
      },
      nh3: {
        en: 'Red-brown ppt., insoluble in excess',
        mn: 'Хүрэн-улаан тунадас үүснэ, илүүдэлд уусахгүй'
      }
    },
    {
      ion: 'Zn²⁺ (Zinc)',
      naoh: {
        en: 'White ppt., soluble in excess, giving a colorless solution',
        mn: 'Цагаан тунадас үүснэ, илүүдэлд уусаж өнгөгүй уусмал болно'
      },
      nh3: {
        en: 'White ppt., soluble in excess, giving a colorless solution (distinguishes from Al³⁺!)',
        mn: 'Цагаан тунадас үүснэ, илүүдэлд уусаж өнгөгүй уусмал болно (Al³⁺-аас ялгарна!)'
      }
    }
  ];

  const anions = [
    {
      ion: 'CO₃²⁻ (Carbonate)',
      test: {
        en: 'Add dilute acid (e.g. dilute HCl)',
        mn: 'Шингэрүүлсэн хүчил нэмэх (жишээ нь шингэрүүлсэн HCl)'
      },
      result: {
        en: 'Effervescence; gas produced turns limewater milky (CO₂)',
        mn: 'Хий хүчтэй ялгарна (хөөсөрнө); шохойн усыг булингартуулна (CO₂)'
      }
    },
    {
      ion: 'Cl⁻ (Chloride)',
      test: {
        en: 'Acidify with dilute HNO₃, then add aqueous AgNO₃',
        mn: 'Шингэрүүлсэн HNO₃-ээр хүчиллэгжүүлж, AgNO₃ уусмал нэмэх'
      },
      result: {
        en: 'White ppt. formed (AgCl)',
        mn: 'Цагаан тунадас үүснэ (AgCl)'
      }
    },
    {
      ion: 'Br⁻ (Bromide)',
      test: {
        en: 'Acidify with dilute HNO₃, then add aqueous AgNO₃',
        mn: 'Шингэрүүлсэн HNO₃-ээр хүчиллэгжүүлж, AgNO₃ уусмал нэмэх'
      },
      result: {
        en: 'Cream ppt. formed (AgBr)',
        mn: 'Цөцгийн шаргал тунадас үүснэ (AgBr)'
      }
    },
    {
      ion: 'I⁻ (Iodide)',
      test: {
        en: 'Acidify with dilute HNO₃, then add aqueous AgNO₃',
        mn: 'Шингэрүүлсэн HNO₃-ээр хүчиллэгжүүлж, AgNO₃ уусмал нэмэх'
      },
      result: {
        en: 'Yellow ppt. formed (AgI)',
        mn: 'Шар тунадас үүснэ (AgI)'
      }
    },
    {
      ion: 'NO₃⁻ (Nitrate)',
      test: {
        en: 'Add aqueous NaOH, then aluminium foil; warm gently',
        mn: 'NaOH уусмал нэмж, хөнгөн цагаан ялтас хийгээд зөөлөн халаах'
      },
      result: {
        en: 'Ammonia gas produced (turns damp red litmus paper blue)',
        mn: 'Аммиакийн хий ялгарна (чийгтэй улаан лакмус цаасыг хөх өнгөтэй болгоно)'
      }
    },
    {
      ion: 'SO₄²⁻ (Sulfate)',
      test: {
        en: 'Acidify with dilute HNO₃, then add aqueous Ba(NO₃)₂ or BaCl₂',
        mn: 'Шингэрүүлсэн HNO₃-ээр хүчиллэгжүүлж, Ba(NO₃)₂ уусмал нэмэх'
      },
      result: {
        en: 'Dense white ppt. formed (BaSO₄)',
        mn: 'Нягт цагаан тунадас үүснэ (BaSO₄)'
      }
    },
    {
      ion: 'SO₃²⁻ (Sulfite)',
      test: {
        en: 'Add dilute HCl, warm gently and test gas with acidified aqueous KMnO₄',
        mn: 'Шингэрүүлсэн HCl нэмж зөөлөн халаагаад ялгарах хийг хүчиллэгжүүлсэн KMnO₄-өөр шалгах'
      },
      result: {
        en: 'Acidified KMnO₄ turns from purple to colorless (SO₂)',
        mn: 'Хүчиллэгжүүлсэн KMnO₄-ийн нил ягаан өнгө арилж өнгөгүй болно (SO₂)'
      }
    }
  ];

  const flameTests = [
    { ion: 'Li⁺ (Lithium)', colorEn: 'Red', colorMn: 'Улаан', hex: '#ef4444' },
    { ion: 'Na⁺ (Sodium)', colorEn: 'Yellow', colorMn: 'Шар', hex: '#eab308' },
    { ion: 'K⁺ (Potassium)', colorEn: 'Lilac', colorMn: 'Нил ягаан (Лилак)', hex: '#c084fc' },
    { ion: 'Ca²⁺ (Calcium)', colorEn: 'Orange-red', colorMn: 'Улбар шар-улаан', hex: '#f97316' },
    { ion: 'Ba²⁺ (Barium)', colorEn: 'Light green / Apple green', colorMn: 'Цайвар ногоон / Алимны ногоон', hex: '#84cc16' },
    { ion: 'Cu²⁺ (Copper II)', colorEn: 'Blue-green', colorMn: 'Цэнхэр-ногоон', hex: '#06b6d4' }
  ];

  const gasTests = [
    {
      gas: 'Ammonia (NH₃)',
      colorEn: 'Colorless, pungent odor',
      colorMn: 'Өнгөгүй, хурц үнэртэй',
      testEn: 'Damp red litmus paper',
      testMn: 'Чийгтэй улаан лакмус цаас',
      resultEn: 'Turns blue',
      resultMn: 'Хөх өнгөтэй болно'
    },
    {
      gas: 'Carbon dioxide (CO₂)',
      colorEn: 'Colorless, odorless',
      colorMn: 'Өнгөгүй, үнэргүй',
      testEn: 'Bubble through limewater (aqueous Ca(OH)₂)',
      testMn: 'Шохойн ус дундуур нэвтрүүлэх (Ca(OH)₂)',
      resultEn: 'Turns milky / cloudy white ppt.',
      resultMn: 'Цагаан булингар үүснэ (шохойн ус цайна)'
    },
    {
      gas: 'Chlorine (Cl₂)',
      colorEn: 'Pale green gas, choking smell',
      colorMn: 'Цайвар ногоон хий, боомилом хурц үнэртэй',
      testEn: 'Damp litmus paper',
      testMn: 'Чийгтэй лакмус цаас',
      resultEn: 'Bleaches white',
      resultMn: 'Цайрч цагаан болно'
    },
    {
      gas: 'Hydrogen (H₂)',
      colorEn: 'Colorless, odorless',
      colorMn: 'Өнгөгүй, үнэргүй',
      testEn: 'Lighted wooden splint held near mouth of tube',
      testMn: 'Асаж буй модон шүдэнз / саваа ойртуулах',
      resultEn: 'Burns with a "squeaky pop" sound',
      resultMn: '"Паах" чимээ гарган шатна'
    },
    {
      gas: 'Oxygen (O₂)',
      colorEn: 'Colorless, odorless',
      colorMn: 'Өнгөгүй, үнэргүй',
      testEn: 'Glowing wooden splint inserted into tube',
      testMn: 'Цогшиж буй модон шүдэнз хийх',
      resultEn: 'Relights the glowing splint',
      resultMn: 'Цогшиж буй шүдэнз бадамлан асна'
    },
    {
      gas: 'Sulfur dioxide (SO₂)',
      colorEn: 'Colorless, pungent choking smell',
      colorMn: 'Өнгөгүй, боомилом хурц үнэртэй',
      testEn: 'Acidified aqueous potassium manganate(VII)',
      testMn: 'Хүчиллэгжүүлсэн калийн перманганатын уусмал (KMnO₄)',
      resultEn: 'Turns from purple to colorless',
      resultMn: 'Нил ягаан өнгө нь арилж өнгөгүй болно'
    }
  ];

  const apparatusList = [
    {
      nameEn: 'Burette',
      nameMn: 'Бюретка',
      precisionEn: 'Graduated to 0.1 cm³, readings recorded to 0.05 cm³ (e.g. 24.35 cm³)',
      precisionMn: '0.1 см³ хуваарьтай, 0.05 см³ нарийвчлалтай уншина (жишээ нь 24.35 см³)',
      useEn: 'Accurate variable volume delivery in titrations (up to 50.0 cm³)',
      useMn: 'Титрлэлтийн үед хувьсах эзлэхүүнийг өндөр нарийвчлалтай хэмжин дусаах (50 см³ хүртэл)',
      tipEn: 'Read at eye level from the bottom of the meniscus to avoid parallax error.',
      tipMn: 'Параллаксын алдаанаас сэргийлж нүдний түвшинд хотгорын доод ирмэгээр уншина.'
    },
    {
      nameEn: 'Volumetric Pipette',
      nameMn: 'Пипетка',
      precisionEn: 'Fixed single volume ±0.06 cm³ (standard 25.0 cm³ or 10.0 cm³)',
      precisionMn: 'Тогтмол нэг эзлэхүүн ±0.06 см³ (25.0 см³ эсвэл 10.0 см³)',
      useEn: 'Accurate transfer of an exact fixed aliquot of solution into conical flask',
      useMn: 'Конусан колбонд тогтмол нарийн эзлэхүүнтэй уусмал шилжүүлэн хийх',
      tipEn: 'Always use a pipette filler. Never blow out the last drop held by surface tension.',
      tipMn: 'Заавал пипетк дүүргэгч хэрэглэнэ. Гадаргын таталцлаар үзүүрт үлдсэн сүүлчийн дуслыг үлээж болохгүй.'
    },
    {
      nameEn: 'Gas Syringe',
      nameMn: 'Хийн шприц',
      precisionEn: 'Graduated to 1 cm³ (range 0 to 100 cm³)',
      precisionMn: '1 см³ хуваарьтай (0-оос 100 см³ хүртэл)',
      useEn: 'Measuring volume of gases evolved in rate or stoichiometry experiments',
      useMn: 'Урвалын явцад ялгарах хийн эзлэхүүнийг цаг хугацааны хамааралтай хэмжих',
      tipEn: 'Ensure plunger moves smoothly without friction before connecting to reaction flask.',
      tipMn: 'Туршилт эхлэхийн өмнө бүлүүр үрэлтгүй жигд хөдөлж байгааг шалгана.'
    },
    {
      nameEn: 'Measuring Cylinder',
      nameMn: 'Хэмжээст цилиндр',
      precisionEn: 'Approximate measurement ±0.5 cm³ to ±1 cm³',
      precisionMn: 'Баримжаа хэмжилт ±0.5 см³ - ±1.0 см³',
      useEn: 'General liquid volume transfer when high precision is not required (e.g. excess acid)',
      useMn: 'Илүүдлээр нэмэх хүчил, ус зэрэг өндөр нарийвчлал шаардагдахгүй үед хэрэглэх',
      tipEn: 'Do NOT use in place of a pipette or burette where quantitative stoichiometry is assessed.',
      tipMn: 'Шалгалтын титрлэлтийн нарийн тооцоонд пипетка, бюреткийн оронд ашиглаж болохгүй.'
    },
    {
      nameEn: 'Polystyrene Cup with Lid (Calorimeter)',
      nameMn: 'Тагтай хөөсөнцөр аяга (Калориметр)',
      precisionEn: 'Thermal insulation minimizes heat loss to surroundings',
      precisionMn: 'Дулаан тусгаарлалт нь хүрээлэн буй орчинд дулаан алдагдахаас сэргийлнэ',
      useEn: 'Thermochemistry & enthalpy of neutralization or displacement experiments',
      useMn: 'Саармагжих эсвэл металл түрэн гаргах урвалын дулааны өөрчлөлтийг хэмжих',
      tipEn: 'A lid prevents heat loss by convection. Stir constantly for uniform temperature.',
      tipMn: 'Таг нь конвекцийн дулааны алдагдлыг зогсооно. Температурыг жигд байлгахын тулд тасралтгүй хутгана.'
    }
  ];

  const q = searchQuery.toLowerCase().trim();

  const filteredCations = cations.filter(
    c => c.ion.toLowerCase().includes(q) || c.naoh.en.toLowerCase().includes(q) || c.naoh.mn.toLowerCase().includes(q)
  );

  const filteredAnions = anions.filter(
    a => a.ion.toLowerCase().includes(q) || a.test.en.toLowerCase().includes(q) || a.test.mn.toLowerCase().includes(q)
  );

  const filteredGases = gasTests.filter(
    g => g.gas.toLowerCase().includes(q) || g.testEn.toLowerCase().includes(q) || g.testMn.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-700/50 text-purple-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block font-bold">
                Cambridge IGCSE 0620 Chemistry Practical Reference
              </span>
              <h2 className="text-lg font-bold text-white">
                {mode === 'mn' ? 'Кэмбрижийн албан ёсны туршилтын лавлах хуудас' : 'Official Paper 6 Notes for Qualitative Analysis & Practical Toolkit'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tabs Bar */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('qualitative')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'qualitative'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>{mode === 'mn' ? 'Катион ба Анионы сорил' : 'Cations & Anions'}</span>
            </button>
            <button
              onClick={() => setActiveTab('gases')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'gases'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>{mode === 'mn' ? 'Хий ба Дөлний сорил' : 'Gases & Flame Tests'}</span>
            </button>
            <button
              onClick={() => setActiveTab('apparatus')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'apparatus'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{mode === 'mn' ? 'Багаж хэрэгслийн нарийвчлал' : 'Apparatus Precision'}</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={mode === 'mn' ? 'Ион, урвалж, хий хайх...' : 'Search ions, reagents, gases...'}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'qualitative' && (
            <div className="space-y-6">
              {/* Cations Table */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-slate-800/60 border-b border-slate-700/80 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider font-mono">
                    {mode === 'mn' ? '1. Усан дахь катионуудын сорил (Tests for aqueous cations)' : '1. Tests for Aqueous Cations'}
                  </h3>
                  <span className="text-[10px] text-slate-400">NaOH(aq) & NH₃(aq)</span>
                </div>

                <div className="divide-y divide-slate-800/80 text-xs">
                  {filteredCations.map((c, idx) => (
                    <div key={idx} className="p-3.5 grid grid-cols-1 md:grid-cols-12 gap-3 hover:bg-slate-900/50 transition-colors">
                      <div className="md:col-span-3 font-mono font-bold text-white flex items-center">
                        <ChemText text={c.ion} />
                      </div>
                      <div className="md:col-span-4 text-slate-300">
                        <span className="text-[10px] font-mono text-purple-400 block font-semibold mb-0.5">
                          effect of aqueous NaOH:
                        </span>
                        <p>{mode === 'mn' ? c.naoh.mn : c.naoh.en}</p>
                      </div>
                      <div className="md:col-span-5 text-slate-300">
                        <span className="text-[10px] font-mono text-cyan-400 block font-semibold mb-0.5">
                          effect of aqueous NH₃:
                        </span>
                        <p>{mode === 'mn' ? c.nh3.mn : c.nh3.en}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anions Table */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-slate-800/60 border-b border-slate-700/80 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                    {mode === 'mn' ? '2. Анионуудын сорил (Tests for anions)' : '2. Tests for Anions'}
                  </h3>
                  <span className="text-[10px] text-slate-400">Precipitation & Effervescence</span>
                </div>

                <div className="divide-y divide-slate-800/80 text-xs">
                  {filteredAnions.map((a, idx) => (
                    <div key={idx} className="p-3.5 grid grid-cols-1 md:grid-cols-12 gap-3 hover:bg-slate-900/50 transition-colors">
                      <div className="md:col-span-3 font-mono font-bold text-white flex items-center">
                        <ChemText text={a.ion} />
                      </div>
                      <div className="md:col-span-4 text-slate-300">
                        <span className="text-[10px] font-mono text-amber-400 block font-semibold mb-0.5">
                          Test / Урвалж сорил:
                        </span>
                        <p>{mode === 'mn' ? a.test.mn : a.test.en}</p>
                      </div>
                      <div className="md:col-span-5 text-slate-300">
                        <span className="text-[10px] font-mono text-emerald-400 block font-semibold mb-0.5">
                          Test result / Ажиглалт:
                        </span>
                        <p>{mode === 'mn' ? a.result.mn : a.result.en}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gases' && (
            <div className="space-y-6">
              {/* Flame Test Card Grid */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    {mode === 'mn' ? 'Дөлний өнгөөр металлын ион таних сорил (Flame Tests)' : 'Flame Test Colors for Metal Cations'}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {flameTests.map((ft, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-slate-800 bg-slate-900/80 flex items-center gap-3"
                    >
                      <div
                        className="w-5 h-8 rounded-full shadow-lg shrink-0 animate-pulse"
                        style={{ backgroundColor: ft.hex, boxShadow: `0 0 12px ${ft.hex}` }}
                      />
                      <div>
                        <div className="font-mono font-bold text-xs text-white">
                          <ChemText text={ft.ion} />
                        </div>
                        <div className="text-[11px] text-slate-300 mt-0.5">
                          {mode === 'mn' ? ft.colorMn : ft.colorEn}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gas Tests Table */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-slate-800/60 border-b border-slate-700/80 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                    {mode === 'mn' ? 'Хийнүүдийг таних сорил (Tests for Gases)' : 'Official Tests for Gases'}
                  </h3>
                  <span className="text-[10px] text-slate-400">Paper 6 Syllabus Standard</span>
                </div>

                <div className="divide-y divide-slate-800/80 text-xs">
                  {filteredGases.map((g, idx) => (
                    <div key={idx} className="p-3.5 grid grid-cols-1 md:grid-cols-12 gap-3 hover:bg-slate-900/50 transition-colors">
                      <div className="md:col-span-3">
                        <span className="font-mono font-bold text-white block">
                          <ChemText text={g.gas} />
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {mode === 'mn' ? g.colorMn : g.colorEn}
                        </span>
                      </div>
                      <div className="md:col-span-4 text-slate-300">
                        <span className="text-[10px] font-mono text-cyan-400 block font-semibold mb-0.5">
                          Test method / Сорил арга:
                        </span>
                        <p>{mode === 'mn' ? g.testMn : g.testEn}</p>
                      </div>
                      <div className="md:col-span-5 text-slate-300">
                        <span className="text-[10px] font-mono text-emerald-400 block font-semibold mb-0.5">
                          Result / Үр дүн:
                        </span>
                        <p>{mode === 'mn' ? g.resultMn : g.resultEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'apparatus' && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-950/40 border border-purple-800/60 rounded-xl text-xs text-purple-200">
                <p className="font-semibold mb-1">
                  {mode === 'mn' ? 'Кэмбрижийн шалгагчийн дүрэм (Examiner Advice):' : 'Cambridge Examiner Advice on Apparatus:'}
                </p>
                <p>
                  {mode === 'mn'
                    ? 'Paper 6-д тодорхой эзлэхүүн хэмжихэд тохирох багажийг нэрлэх даалгавар байнга ирдэг. 25.0 см³ тогтмол эзлэхүүнд пипетка, хувьсах нарийн эзлэхүүнд бюретка, хийд хийн шприц сонгох нь бүтэн оноо авна.'
                    : 'Questions frequently ask students to choose suitable apparatus. For exact fixed 25.0 cm³ use a pipette; for titrations with variable volumes use a burette (0.05 cm³); for measuring gas volume use a gas syringe.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {apparatusList.map((app, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="font-bold text-white text-sm">
                        {mode === 'mn' ? app.nameMn : app.nameEn}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 border border-slate-700 text-teal-400 rounded">
                        Paper 6 Core
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-amber-400 block font-semibold">
                        {mode === 'mn' ? 'Нарийвчлал (Precision):' : 'Precision & Reading:'}
                      </span>
                      <p className="text-slate-300 mt-0.5">{mode === 'mn' ? app.precisionMn : app.precisionEn}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 block font-semibold">
                        {mode === 'mn' ? 'Зориулалт (Application):' : 'Use in Experiment:'}
                      </span>
                      <p className="text-slate-300 mt-0.5">{mode === 'mn' ? app.useMn : app.useEn}</p>
                    </div>

                    <div className="pt-1.5 border-t border-slate-800/60">
                      <span className="text-[10px] font-mono text-emerald-400 block font-semibold">
                        {mode === 'mn' ? 'Кэмбрижийн алдаанаас сэргийлэх зөвлөмж:' : 'Examiner Error-Prevention Tip:'}
                      </span>
                      <p className="text-slate-400 text-[11px] mt-0.5">{mode === 'mn' ? app.tipMn : app.tipEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono text-[11px]">
            Cambridge Assessment International Education · Chemistry 0620 Paper 6 Reference Table
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
          >
            {mode === 'mn' ? 'Хаах' : 'Close Reference'}
          </button>
        </div>
      </div>
    </div>
  );
};
