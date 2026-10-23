import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChemText } from '../common/ChemText';
import { 
  RotateCcw, 
  Droplet, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Eye,
  Calculator,
  Layers,
  Sparkles
} from 'lucide-react';

interface TitrationTrial {
  trialNumber: number;
  isRough: boolean;
  initialReading: number;
  finalReading: number;
  titre: number;
  isConcordant?: boolean;
}

export const TitrationSimulator: React.FC = () => {
  const { mode } = useLanguage();

  const [indicator, setIndicator] = useState<'phenolphthalein' | 'methyl_orange' | 'thymolphthalein'>('phenolphthalein');
  const [buretteReading, setBuretteReading] = useState<number>(0.00); // 0.00 to 50.00 cm³
  const [trials, setTrials] = useState<TitrationTrial[]>([]);
  const [isSwirling, setIsSwirling] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // Unknown acid concentration: 25.0 cm³ of unknown HCl neutralized by 0.100 M NaOH
  // Exact stoichiometric equivalence point at 23.40 cm³
  const equivalencePoint = 23.40;
  const standardBaseConc = 0.100; // mol/dm³ NaOH
  const analyteVolume = 25.0; // cm³ HCl

  // Calculate current pH based on volume added
  const calculatePH = (vol: number): number => {
    if (vol < 22.0) {
      return 1.2 + (vol / equivalencePoint) * 1.6;
    } else if (vol >= 22.0 && vol < 23.3) {
      return 2.8 + ((vol - 22.0) / 1.3) * 1.5;
    } else if (vol >= 23.3 && vol <= 23.5) {
      // Steep vertical pH inflection
      return 4.3 + ((vol - 23.3) / 0.2) * 5.5; // jumps from 4.3 to 9.8
    } else {
      return Math.min(13.4, 9.8 + Math.log10(vol - equivalencePoint + 1) * 1.5);
    }
  };

  const currentPH = calculatePH(buretteReading);

  // Determine solution appearance
  const getFlaskAppearance = () => {
    if (indicator === 'phenolphthalein') {
      if (currentPH < 8.2) {
        return {
          bg: 'bg-transparent border-slate-500/40',
          textEn: 'Colourless (Acidic)',
          textMn: 'Өнгөгүй (Хүчиллэг)',
          colorName: 'Colourless'
        };
      }
      if (currentPH >= 8.2 && currentPH <= 9.2) {
        return {
          bg: 'bg-pink-300/60 border-pink-400',
          textEn: 'Pale Pink Endpoint! (Accurate)',
          textMn: 'Цайвар ягаан төгсгөлийн цэг! (Нарийн)',
          colorName: 'Pale Pink'
        };
      }
      return {
        bg: 'bg-pink-600/80 border-pink-500',
        textEn: 'Intense Magenta (Over-titrated / overshoot)',
        textMn: 'Хэт тод ягаан (Илүүдүүлсэн)',
        colorName: 'Magenta'
      };
    } else if (indicator === 'methyl_orange') {
      if (currentPH < 3.1) {
        return {
          bg: 'bg-red-500/70 border-red-500',
          textEn: 'Red (Acidic)',
          textMn: 'Улаан (Хүчиллэг)',
          colorName: 'Red'
        };
      }
      if (currentPH >= 3.1 && currentPH <= 4.4) {
        return {
          bg: 'bg-orange-500/80 border-orange-400',
          textEn: 'Distinct Orange Endpoint! (Neutralized)',
          textMn: 'Улбар шар төгсгөлийн цэг! (Саармагжсан)',
          colorName: 'Orange'
        };
      }
      return {
        bg: 'bg-yellow-400/80 border-yellow-400',
        textEn: 'Yellow (Alkaline)',
        textMn: 'Шар (Шүлтлэг)',
        colorName: 'Yellow'
      };
    } else {
      // Thymolphthalein
      if (currentPH < 9.3) {
        return {
          bg: 'bg-transparent border-slate-500/40',
          textEn: 'Colourless (Acidic)',
          textMn: 'Өнгөгүй (Хүчиллэг)',
          colorName: 'Colourless'
        };
      }
      if (currentPH >= 9.3 && currentPH <= 10.5) {
        return {
          bg: 'bg-sky-400/50 border-sky-400',
          textEn: 'Faint Blue Endpoint!',
          textMn: 'Цайвар цэнхэр төгсгөлийн цэг!',
          colorName: 'Light Blue'
        };
      }
      return {
        bg: 'bg-blue-600/80 border-blue-500',
        textEn: 'Deep Blue (Alkaline overshoot)',
        textMn: 'Хөх өнгө (Шүлт илүүдсэн)',
        colorName: 'Dark Blue'
      };
    }
  };

  const flaskAppearance = getFlaskAppearance();

  const addVolume = (amount: number) => {
    setBuretteReading(prev => +(Math.min(50.0, prev + amount)).toFixed(2));
  };

  const swirl = () => {
    setIsSwirling(true);
    setTimeout(() => setIsSwirling(false), 600);
  };

  const recordTrial = () => {
    if (buretteReading === 0) return;
    const isFirst = trials.length === 0;

    const newTrial: TitrationTrial = {
      trialNumber: trials.length + 1,
      isRough: isFirst,
      initialReading: 0.00,
      finalReading: buretteReading,
      titre: buretteReading
    };

    const updated = [...trials, newTrial];

    // Check concordance: titres within 0.10 cm³ of each other (excluding rough trial)
    const checked = updated.map((t, idx, arr) => {
      if (t.isRough) return { ...t, isConcordant: false };
      const nonRoughOthers = arr.filter((o, i) => i !== idx && !o.isRough);
      const isClose = nonRoughOthers.some(o => Math.abs(o.titre - t.titre) <= 0.10);
      return { ...t, isConcordant: isClose };
    });

    setTrials(checked);
    setBuretteReading(0.00);
  };

  const resetCurrentTrial = () => {
    setBuretteReading(0.00);
  };

  const clearAllTrials = () => {
    setTrials([]);
    setBuretteReading(0.00);
  };

  // Concordant titres and average
  const concordantTrials = trials.filter(t => t.isConcordant);
  const averageConcordantTitre =
    concordantTrials.length > 0
      ? +(concordantTrials.reduce((sum, t) => sum + t.titre, 0) / concordantTrials.length).toFixed(2)
      : null;

  // Quantitative calculation walkthrough
  const calculatedMolesBase =
    averageConcordantTitre !== null ? +((averageConcordantTitre / 1000) * standardBaseConc).toFixed(5) : null;
  const calculatedAcidConc =
    calculatedMolesBase !== null ? +((calculatedMolesBase / (analyteVolume / 1000))).toFixed(4) : null;
  const calculatedAcidMassConc =
    calculatedAcidConc !== null ? +(calculatedAcidConc * 36.46).toFixed(2) : null; // HCl Mr = 36.46

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
              Cambridge Paper 6 Quantitative Analysis
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 text-xs font-mono">Volumetric Analysis & Stoichiometry</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {mode === 'mn' ? 'Хүчил-шүлтийн титрлэлт ба pH муруйн симуляц' : 'Acid-Base Titration & Cambridge Concordancy Engine'}
          </h3>
        </div>

        {/* Indicator Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-mono">Indicator:</label>
          <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setIndicator('phenolphthalein')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                indicator === 'phenolphthalein'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Phenolphthalein
            </button>
            <button
              onClick={() => setIndicator('methyl_orange')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                indicator === 'methyl_orange'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Methyl Orange
            </button>
            <button
              onClick={() => setIndicator('thymolphthalein')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                indicator === 'thymolphthalein'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Thymolphthalein
            </button>
          </div>
        </div>
      </div>

      {/* Main Titration Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Burette & Conical Flask Stage (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-between min-h-[440px]">
          {/* Zoomed Meniscus Window */}
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-rose-400" />
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
                  Meniscus Reading (Eye Level):
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  {buretteReading.toFixed(2)} cm³
                </span>
              </div>
            </div>

            {/* Visual Meniscus Tube Preview */}
            <div className="w-24 h-10 border border-slate-600 rounded bg-slate-950 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute inset-x-0 h-0.5 border-b border-rose-500/80" />
              <div className="text-[9px] font-mono text-slate-400 px-1 flex justify-between">
                <span>{Math.floor(buretteReading)}</span>
                <span className="text-rose-400 font-bold">▼</span>
                <span>{Math.floor(buretteReading) + 1}</span>
              </div>
            </div>
          </div>

          {/* Apparatus Stage */}
          <div className="my-auto flex flex-col items-center justify-center space-y-2 py-4">
            {/* Burette Tube with Graduations */}
            <div className="w-7 h-44 border-2 border-slate-400 rounded-b bg-slate-800/40 relative flex flex-col justify-end p-0.5">
              <div
                className="w-full bg-cyan-500/40 transition-all duration-300 rounded-b"
                style={{ height: `${Math.max(5, 100 - (buretteReading / 50) * 100)}%` }}
              />
              {/* Graduations */}
              <div className="absolute inset-y-0 right-0 w-2 flex flex-col justify-between py-1 text-[6px] font-mono text-slate-400">
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
              </div>
            </div>

            {/* Burette Stopcock Tap */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-4 bg-slate-400" />
              <div className="w-6 h-2 bg-amber-600 rounded-xs" />
            </div>

            {/* Droplet Stream Animation */}
            <div className="h-6 flex flex-col items-center justify-center">
              <Droplet className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            </div>

            {/* Conical Flask */}
            <div
              className={`w-28 h-28 border-2 rounded-b-3xl relative overflow-hidden flex flex-col justify-end p-1 transition-all duration-500 shadow-lg ${
                flaskAppearance.bg
              } ${isSwirling ? 'rotate-6 scale-105' : ''}`}
            >
              {/* Solution Inside */}
              <div className="w-full h-14 rounded-b-2xl flex flex-col items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-white drop-shadow">
                  {flaskAppearance.colorName}
                </span>
                <span className="text-[9px] font-mono text-slate-300">pH ≈ {currentPH.toFixed(1)}</span>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">25.0 cm³ HCl + {indicator}</span>
          </div>

          {/* Tap Controls Deck */}
          <div className="w-full space-y-2 pt-2 border-t border-slate-800">
            <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
              <button
                onClick={() => addVolume(1.00)}
                className="py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
              >
                +1.0 cm³
              </button>
              <button
                onClick={() => addVolume(0.10)}
                className="py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
              >
                +0.10 cm³
              </button>
              <button
                onClick={() => addVolume(0.05)}
                className="py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition-colors shadow-sm"
                title="Single drop"
              >
                +1 Drop
              </button>
              <button
                onClick={swirl}
                className="py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                Swirl Flask
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={recordTrial}
                disabled={buretteReading === 0}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                {mode === 'mn' ? 'Хүснэгтэд тэмдэглэх (Record Titre)' : 'Record Titre in Table'}
              </button>

              <button
                onClick={resetCurrentTrial}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                title="Reset Burette"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Cambridge Results Table & Quantitative Calculation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Table of Trials */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400" />
                <span className="font-bold text-xs uppercase tracking-wider text-white font-mono">
                  {mode === 'mn' ? 'Титрлэлтийн үр дүнгийн хүснэгт (Paper 6 Practical Table)' : 'Cambridge Titration Table'}
                </span>
              </div>

              {trials.length > 0 && (
                <button
                  onClick={clearAllTrials}
                  className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors"
                >
                  {mode === 'mn' ? 'Цэвэрлэх' : 'Clear Table'}
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] text-slate-400 font-mono bg-slate-900 border-b border-slate-800">
                  <tr>
                    <th className="p-2">Trial</th>
                    <th className="p-2">Initial (cm³)</th>
                    <th className="p-2">Final (cm³)</th>
                    <th className="p-2">Titre (cm³)</th>
                    <th className="p-2 text-right">Concordant (≤0.10 cm³)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono">
                  {trials.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-500 italic">
                        {mode === 'mn' ? 'Туршилтын үр дүнг бүртгээгүй байна. Бюреткээс дусааж туршилтаа эхлүүлнэ үү.' : 'No trials recorded yet. Add alkali and click "Record Titre in Table".'}
                      </td>
                    </tr>
                  ) : (
                    trials.map(t => (
                      <tr key={t.trialNumber} className={t.isConcordant ? 'bg-emerald-950/30' : ''}>
                        <td className="p-2 font-bold text-white">
                          {t.isRough ? 'Rough' : `Trial ${t.trialNumber}`}
                        </td>
                        <td className="p-2 text-slate-300">{t.initialReading.toFixed(2)}</td>
                        <td className="p-2 text-slate-300">{t.finalReading.toFixed(2)}</td>
                        <td className="p-2 font-bold text-teal-300">{t.titre.toFixed(2)}</td>
                        <td className="p-2 text-right">
                          {t.isRough ? (
                            <span className="text-slate-500 text-[10px]">Rough (Excluded)</span>
                          ) : t.isConcordant ? (
                            <span className="text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60">
                              ✓ Concordant
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[10px]">Not concordant</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Concordancy Summary Callout */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-slate-400 block font-mono text-[10px] uppercase font-semibold">
                  Mean Concordant Titre ($V_m$):
                </span>
                <span className="text-base font-mono font-bold text-teal-300">
                  {averageConcordantTitre !== null ? `${averageConcordantTitre} cm³` : 'Need ≥2 concordant trials'}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 font-mono">
                Cambridge Rule: Titres must agree within ±0.10 cm³
              </div>
            </div>
          </div>

          {/* Cambridge Step-by-Step Stoichiometry Worksheet */}
          {averageConcordantTitre !== null && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Calculator className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-xs uppercase tracking-wider text-white font-mono">
                  {mode === 'mn' ? 'Кэмбрижийн алхамчилсан молийн тооцоолол' : 'Cambridge Paper 6 Quantitative Calculation'}
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono text-slate-300">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">
                    Step 1: Calculate moles of NaOH used (n = c × v)
                  </div>
                  <p>
                    n(NaOH) = 0.100 mol/dm³ × ({averageConcordantTitre} / 1000) ={' '}
                    <strong className="text-white">{calculatedMolesBase} mol</strong>
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">
                    Step 2: Balanced equation & mole ratio
                  </div>
                  <p className="text-teal-300">
                    HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)
                  </p>
                  <p className="mt-1">
                    Ratio is 1:1 → n(HCl) = n(NaOH) ={' '}
                    <strong className="text-white">{calculatedMolesBase} mol</strong>
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">
                    Step 3: Concentration of unknown HCl (c = n / v)
                  </div>
                  <p>
                    c(HCl) = {calculatedMolesBase} / (25.0 / 1000) ={' '}
                    <strong className="text-emerald-400 text-sm">{calculatedAcidConc} mol/dm³</strong>
                  </p>
                  <p className="mt-1 text-slate-400">
                    Mass concentration = {calculatedAcidConc} × 36.46 ={' '}
                    <strong className="text-white">{calculatedAcidMassConc} g/dm³</strong>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
