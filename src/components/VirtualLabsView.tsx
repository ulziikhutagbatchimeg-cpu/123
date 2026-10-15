import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp, SimulatorType } from '../context/AppContext';
import { ElectrolysisSimulator } from './simulators/ElectrolysisSimulator';
import { TitrationSimulator } from './simulators/TitrationSimulator';
import { QualitativeAnalysisLab } from './simulators/QualitativeAnalysisLab';
import { StoichiometryBalancer } from './simulators/StoichiometryBalancer';
import { PeriodicTableExplorer } from './simulators/PeriodicTableExplorer';
import { RatesOfReactionLab } from './simulators/RatesOfReactionLab';
import { ChromatographyLab } from './simulators/ChromatographyLab';
import { GasCollectionLab } from './simulators/GasCollectionLab';
import { CambridgePracticalGuideModal } from './simulators/CambridgePracticalGuideModal';
import { 
  Zap, 
  FlaskConical, 
  TestTube2, 
  Scale, 
  Layers, 
  TrendingUp,
  Ruler,
  Wind,
  BookOpen,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const VirtualLabsView: React.FC = () => {
  const { mode } = useLanguage();
  const { selectedSimulator, setSelectedSimulator, jumpToTopic } = useApp();

  const [guideModalOpen, setGuideModalOpen] = useState<boolean>(false);
  const [guideDefaultTab, setGuideDefaultTab] = useState<'qualitative' | 'apparatus' | 'gases'>('qualitative');

  const openGuide = (tab: 'qualitative' | 'apparatus' | 'gases') => {
    setGuideDefaultTab(tab);
    setGuideModalOpen(true);
  };

  const labs: {
    id: SimulatorType;
    titleEn: string;
    titleMn: string;
    topicId: string;
    syllabusRef: string;
    icon: React.ReactNode;
    tagEn: string;
    tagMn: string;
  }[] = [
    {
      id: 'qualitative',
      titleEn: 'Paper 6 Qualitative Analysis Lab',
      titleMn: 'Чанарын шинжилгээний лаб (Mystery Salt)',
      topicId: 'top-12-1',
      syllabusRef: '0620/Topic 12',
      icon: <TestTube2 className="w-4 h-4 text-purple-400" />,
      tagEn: 'Paper 6 Cations & Anions',
      tagMn: 'Катион, анион таних'
    },
    {
      id: 'titration',
      titleEn: 'Acid-Base Titration & pH Curves',
      titleMn: 'Хүчил-шүлтийн титрлэлт ба pH муруй',
      topicId: 'top-7-1',
      syllabusRef: '0620/Topic 7',
      icon: <FlaskConical className="w-4 h-4 text-rose-400" />,
      tagEn: 'Volumetric Analysis',
      tagMn: 'Бюретка & Конкордант'
    },
    {
      id: 'rates',
      titleEn: 'Reaction Rates & Tangents Lab',
      titleMn: 'Урвалын хурд ба Кинетикийн график',
      topicId: 'top-8-1',
      syllabusRef: '0620/Topic 8',
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      tagEn: 'Syringe & Cross',
      tagMn: 'Хийн шприц & Чагт'
    },
    {
      id: 'gas-collection',
      titleEn: 'Gas Preparation & Collection',
      titleMn: 'Хий гарган авах ба цуглуулах лаб',
      topicId: 'top-1-1',
      syllabusRef: '0620/Paper 6 Core',
      icon: <Wind className="w-4 h-4 text-cyan-400" />,
      tagEn: 'Drying & Delivery',
      tagMn: 'Хатаах & Цуглуулах'
    },
    {
      id: 'chromatography',
      titleEn: 'Paper Chromatography & Rf Lab',
      titleMn: 'Цаасан хроматографи ба Rf тооцоолуур',
      topicId: 'top-21-1',
      syllabusRef: '0620/Topic 21',
      icon: <Ruler className="w-4 h-4 text-amber-400" />,
      tagEn: 'Separation & Rf',
      tagMn: 'Rf утга & Нингидрин'
    },
    {
      id: 'electrolysis',
      titleEn: 'Electrochemical Cell Simulator',
      titleMn: 'Электролизийн элементийн симуляц',
      topicId: 'top-4-1',
      syllabusRef: '0620/Topic 4',
      icon: <Zap className="w-4 h-4 text-teal-400" />,
      tagEn: 'Molten & Aqueous',
      tagMn: 'Катод & Анод хий'
    },
    {
      id: 'stoichiometry',
      titleEn: 'Equation Balancer & Mole Engine',
      titleMn: 'Тэгшитгэл тэнцүүлэгч ба Молийн тооцоолуур',
      topicId: 'top-3-1',
      syllabusRef: '0620/Topic 3',
      icon: <Scale className="w-4 h-4 text-yellow-400" />,
      tagEn: 'Stoichiometry',
      tagMn: 'Стехиометрийн тооцоо'
    },
    {
      id: 'periodic-table',
      titleEn: 'Periodic Trends & Bohr Models',
      titleMn: 'Үелэх системийн зүй тогтол ба Борын бүрхүүл',
      topicId: 'top-2-1',
      syllabusRef: '0620/Topic 8',
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
      tagEn: 'Periodic Law',
      tagMn: 'Үелэх хууль'
    }
  ];

  const currentLab = labs.find(l => l.id === selectedSimulator) || labs[0];

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & Lab Switcher Deck */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Cambridge Assessment International Education (0620)
              </span>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
                Paper 6 Alternative to Practical Suites
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
              {mode === 'mn' ? 'Кэмбрижийн виртуал лаборатори' : 'Cambridge Virtual Laboratory Workbench'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              {mode === 'mn'
                ? 'Кэмбрижийн IGCSE Химийн шалгалтын хөтөлбөрт нийцсэн чанарын шинжилгээ, титрлэлт, урвалын кинетик, хий цуглуулах ба электролизийн интерактив туршилтууд.'
                : 'Interactive experimental suites rigorously calibrated to Cambridge IGCSE Chemistry (0620) Paper 6 Alternative to Practical and Paper 5 specifications.'}
            </p>
          </div>

          {/* Quick Cambridge Resource Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => openGuide('qualitative')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/80 hover:bg-purple-100 dark:hover:bg-purple-900/80 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-700/60 shadow-xs transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>{mode === 'mn' ? 'Paper 6 Чанарын шинжилгээний хүснэгт' : 'Official Paper 6 Notes'}</span>
            </button>

            <button
              onClick={() => openGuide('apparatus')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-xs transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{mode === 'mn' ? 'Багажийн нарийвчлалын дүрэм' : 'Apparatus Precision'}</span>
            </button>

            <button
              onClick={() => jumpToTopic(currentLab.topicId)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 dark:bg-slate-800 hover:bg-teal-100 dark:hover:bg-slate-700 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-slate-700 transition-colors shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{mode === 'mn' ? `${currentLab.syllabusRef} хичээл` : `${currentLab.syllabusRef} Lesson`}</span>
            </button>
          </div>
        </div>

        {/* 8-Lab Grid Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {labs.map(lab => {
            const isSelected = lab.id === selectedSimulator;
            return (
              <button
                key={lab.id}
                onClick={() => setSelectedSimulator(lab.id)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal-50 dark:bg-teal-950/70 border-teal-500 shadow-md ring-2 ring-teal-500/30'
                    : 'bg-white dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      {lab.icon}
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 font-semibold">{lab.syllabusRef}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {mode === 'mn' ? lab.titleMn : lab.titleEn}
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-teal-600 dark:text-teal-400 font-mono font-semibold">
                  {mode === 'mn' ? lab.tagMn : lab.tagEn}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Simulator Component */}
      <div>
        {selectedSimulator === 'qualitative' && <QualitativeAnalysisLab />}
        {selectedSimulator === 'titration' && <TitrationSimulator />}
        {selectedSimulator === 'rates' && <RatesOfReactionLab />}
        {selectedSimulator === 'gas-collection' && <GasCollectionLab />}
        {selectedSimulator === 'chromatography' && <ChromatographyLab />}
        {selectedSimulator === 'electrolysis' && <ElectrolysisSimulator />}
        {selectedSimulator === 'stoichiometry' && <StoichiometryBalancer />}
        {selectedSimulator === 'periodic-table' && <PeriodicTableExplorer />}
      </div>

      {/* Official Cambridge Notes Reference Modal */}
      <CambridgePracticalGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        defaultTab={guideDefaultTab}
      />
    </div>
  );
};
