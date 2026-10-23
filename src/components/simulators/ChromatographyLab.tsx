import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChemText } from '../common/ChemText';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Ruler, 
  HelpCircle,
  Sparkles,
  Layers,
  AlertTriangle,
  Eye
} from 'lucide-react';

interface DyeSpot {
  name: string;
  colorHex: string;
  distanceMm: number; // e.g. 56 mm
  isColorless?: boolean;
}

export const ChromatographyLab: React.FC = () => {
  const { mode } = useLanguage();

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100); // 0 to 100%
  const [hasLid, setHasLid] = useState<boolean>(true);
  const [locatingAgentSprayed, setLocatingAgentSprayed] = useState<boolean>(false);
  const [selectedSpotForRf, setSelectedSpotForRf] = useState<string>('Red');
  const [userRfInput, setUserRfInput] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedMixtureDeduction, setSelectedMixtureDeduction] = useState<string[]>([]);
  const [deductionFeedback, setDeductionFeedback] = useState<string | null>(null);

  const solventFrontDistanceMm = 80; // 80 mm

  // Reference dyes and unknown mixture
  const sampleLanes: { id: string; labelEn: string; labelMn: string; spots: DyeSpot[] }[] = [
    {
      id: 'dye-1',
      labelEn: 'Dye 1 (Red)',
      labelMn: 'Будаг 1 (Улаан)',
      spots: [{ name: 'Red', colorHex: '#ef4444', distanceMm: 56 }]
    },
    {
      id: 'dye-2',
      labelEn: 'Dye 2 (Yellow)',
      labelMn: 'Будаг 2 (Шар)',
      spots: [{ name: 'Yellow', colorHex: '#eab308', distanceMm: 24 }]
    },
    {
      id: 'dye-3',
      labelEn: 'Dye 3 (Blue)',
      labelMn: 'Будаг 3 (Цэнхэр)',
      spots: [{ name: 'Blue', colorHex: '#0284c7', distanceMm: 72 }]
    },
    {
      id: 'amino-acid',
      labelEn: 'Amino Acid (Colourless)',
      labelMn: 'Амин хүчил (Өнгөгүй)',
      spots: [{ name: 'Amino Acid', colorHex: '#a855f7', distanceMm: 40, isColorless: true }]
    },
    {
      id: 'mixture-x',
      labelEn: 'Sample X (Food Coloring Mixture)',
      labelMn: 'Дээж X (Үл мэдэгдэх холимог)',
      spots: [
        { name: 'Yellow', colorHex: '#eab308', distanceMm: 24 },
        { name: 'Red', colorHex: '#ef4444', distanceMm: 56 }
      ]
    }
  ];

  const handleStart = () => {
    setIsRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return p + 5;
      });
    }, 100);
  };

  const handleReset = () => {
    setProgress(100);
    setIsRunning(false);
    setUserRfInput('');
    setFeedback(null);
    setLocatingAgentSprayed(false);
    setSelectedMixtureDeduction([]);
    setDeductionFeedback(null);
  };

  const checkRfCalculation = () => {
    let targetDistance = 56;
    if (selectedSpotForRf === 'Yellow') targetDistance = 24;
    if (selectedSpotForRf === 'Blue') targetDistance = 72;
    if (selectedSpotForRf === 'Amino Acid') targetDistance = 40;

    const actualRf = (targetDistance / solventFrontDistanceMm).toFixed(2);
    const userVal = Number(userRfInput);

    if (Math.abs(userVal - Number(actualRf)) <= 0.03) {
      setFeedback(
        mode === 'mn'
          ? `Зөв! Rf утга = ${actualRf} (Тооцоолол: ${targetDistance} мм / ${solventFrontDistanceMm} мм). Кэмбрижийн 2/2 оноо авлаа!`
          : `Correct! Rf = ${actualRf} (${targetDistance} mm / ${solventFrontDistanceMm} mm). Awarded full 2/2 marks!`
      );
    } else {
      setFeedback(
        mode === 'mn'
          ? `Буруу байна. Зөв Rf утга = ${actualRf} (Томьёо: Толбоны явсан зай / Уусгагчийн фронтын зай = ${targetDistance} / ${solventFrontDistanceMm}). Rf нь нэгжгүй 0-1 хооронд харьцаа байна.`
          : `Incorrect calculation. Correct Rf = ${actualRf} (${targetDistance} mm / ${solventFrontDistanceMm} mm). Rf has no units and is always between 0 and 1.`
      );
    }
  };

  const toggleMixtureSelection = (dyeName: string) => {
    setSelectedMixtureDeduction(prev =>
      prev.includes(dyeName) ? prev.filter(d => d !== dyeName) : [...prev, dyeName]
    );
  };

  const verifyMixtureDeduction = () => {
    const hasRed = selectedMixtureDeduction.includes('Red');
    const hasYellow = selectedMixtureDeduction.includes('Yellow');
    const hasBlue = selectedMixtureDeduction.includes('Blue');

    if (hasRed && hasYellow && !hasBlue) {
      setDeductionFeedback(
        mode === 'mn'
          ? 'Зөв! Дээж X нь Будаг 1 (Улаан) ба Будаг 2 (Шар)-ын холимог мөн. Хэвтээ түвшин (Rf) нь яг тохирч байна.'
          : 'Correct! Sample X contains Dye 1 (Red) and Dye 2 (Yellow) because the vertical migration levels match exactly.'
      );
    } else {
      setDeductionFeedback(
        mode === 'mn'
          ? 'Буруу байна. Дээж X дэх 2 толбоны өндрийг 1, 2, 3-р будгийн өндөртэй шууд харьцуулан харна уу.'
          : 'Incorrect. Compare the horizontal heights of the spots in Sample X with the standard pure dyes 1, 2, and 3.'
      );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              Cambridge Chapter 12 & 21 Separations
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 text-xs font-mono">Paper Chromatography & Rf Engine</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {mode === 'mn' ? 'Цаасан хроматографи ба Rf утгын шинжилгээ' : 'Paper Chromatography & Rf Separation Laboratory'}
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors disabled:opacity-50 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>{mode === 'mn' ? 'Уусгагчийг хөөргөх' : 'Run Solvent'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Chromatography Chamber Stage (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col items-center">
          {/* Chamber Controls Bar */}
          <div className="w-full flex items-center justify-between mb-3 text-xs">
            <button
              onClick={() => setHasLid(!hasLid)}
              className={`px-3 py-1 rounded-lg border font-mono transition-colors ${
                hasLid
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Lid: {hasLid ? 'PRESENT (Prevents evaporation)' : 'REMOVED'}
            </button>

            <button
              onClick={() => setLocatingAgentSprayed(!locatingAgentSprayed)}
              className={`px-3 py-1 rounded-lg border font-mono transition-colors ${
                locatingAgentSprayed
                  ? 'bg-purple-950/80 border-purple-500 text-purple-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 inline mr-1 text-purple-400" />
              {locatingAgentSprayed ? 'Ninhydrin Sprayed (Revealed!)' : 'Spray Locating Agent'}
            </button>
          </div>

          {/* Chromatography Tank Visual */}
          <div className="w-full max-w-lg h-80 bg-slate-900/90 border-2 border-slate-700 rounded-2xl relative p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Glass Tank Lid */}
            {hasLid && (
              <div className="absolute top-0 inset-x-2 h-3 bg-slate-600/80 border-b border-slate-400 rounded-t-lg z-20 flex items-center justify-center">
                <span className="text-[7px] font-mono text-slate-300">Glass Lid (Tight Seal)</span>
              </div>
            )}

            {/* Solvent Front Line */}
            <div
              className="absolute inset-x-6 border-b-2 border-dashed border-cyan-400 transition-all duration-300 z-10"
              style={{
                top: `${Math.max(28, 250 - (progress / 100) * 200)}px`
              }}
            >
              <span className="text-[9px] font-mono font-bold text-cyan-300 bg-slate-950/90 px-1.5 py-0.5 rounded border border-cyan-500/40 absolute -top-5 right-0">
                Solvent Front ({solventFrontDistanceMm} mm)
              </span>
            </div>

            {/* Chromatography Filter Paper Sheet */}
            <div className="w-full h-full bg-slate-950/60 border border-slate-800 rounded-xl flex justify-around items-end pb-10 relative">
              {/* Pencil Baseline Rule */}
              <div className="absolute inset-x-4 bottom-10 border-b-2 border-slate-500/90 z-10 flex justify-between px-2 text-[8px] font-mono text-slate-400">
                <span>Pencil Baseline (0 mm)</span>
                <span>Insoluble graphite</span>
              </div>

              {/* Solvent Level at bottom (MUST be below baseline!) */}
              <div className="absolute inset-x-0 bottom-0 h-6 bg-cyan-500/20 border-t border-cyan-400/50 flex items-center justify-center">
                <span className="text-[8px] font-mono text-cyan-300">
                  Solvent Level (Below baseline to avoid dissolving spots)
                </span>
              </div>

              {/* Spot Lanes */}
              {sampleLanes.map(lane => (
                <div key={lane.id} className="flex flex-col items-center relative h-full justify-end w-14">
                  {/* Spots migrating upwards */}
                  {lane.spots.map(sp => {
                    const spotTop = 230 - (progress / 100) * (sp.distanceMm * 2.2);
                    const isHiddenColorless = sp.isColorless && !locatingAgentSprayed;

                    return (
                      <div
                        key={sp.name}
                        className={`absolute w-4 h-4 rounded-full blur-[0.5px] shadow-lg transition-all duration-300 flex items-center justify-center ${
                          isHiddenColorless ? 'opacity-0' : 'opacity-90'
                        }`}
                        style={{
                          backgroundColor: sp.colorHex,
                          top: `${spotTop}px`
                        }}
                      >
                        <span className="text-[6px] font-bold text-white drop-shadow">
                          {sp.distanceMm}mm
                        </span>
                      </div>
                    );
                  })}

                  {/* Lane Label at bottom */}
                  <span className="text-[8px] font-mono text-slate-400 text-center leading-tight mb-1 truncate w-full">
                    {mode === 'mn' ? lane.labelMn : lane.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cambridge Rule Explanations Callout */}
          <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-400 font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <strong className="text-teal-400 block mb-0.5">1. Why Pencil Line?</strong>
              Graphite is insoluble and won't dissolve/separate with solvent.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <strong className="text-cyan-400 block mb-0.5">2. Why Solvent Below?</strong>
              Stops sample spots dissolving into solvent pool at the bottom.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <strong className="text-purple-400 block mb-0.5">3. Locating Agent?</strong>
              Ninhydrin reveals colourless compounds like amino acids.
            </div>
          </div>
        </div>

        {/* Right: Cambridge Calculations & Mystery Sample Deduction (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Rf Calculation Workbench */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Ruler className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-xs uppercase tracking-wider text-white font-mono">
                {mode === 'mn' ? 'Rf утга тооцоолох (Paper 6 Question)' : 'Calculate Rf Retention Factor'}
              </span>
            </div>

            <div className="text-xs space-y-2 text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-teal-300">
                Rf = (Distance moved by dye spot) ÷ (Distance moved by solvent front)
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-mono text-xs">Select Spot to Calculate:</label>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                  {['Red', 'Yellow', 'Blue', 'Amino Acid'].map(s => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSpotForRf(s);
                        setFeedback(null);
                      }}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        selectedSpotForRf === s
                          ? 'bg-cyan-950 border-cyan-500 text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {s} ({s === 'Yellow' ? '24' : s === 'Red' ? '56' : s === 'Blue' ? '72' : '40'} mm)
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block font-mono text-xs">
                  Enter your calculated $R_f$ value (2 decimal places):
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 0.70"
                    value={userRfInput}
                    onChange={e => setUserRfInput(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={checkRfCalculation}
                    className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs transition-colors"
                  >
                    Check
                  </button>
                </div>
              </div>

              {feedback && (
                <div className="p-3 rounded-lg text-xs leading-relaxed bg-slate-900 border border-slate-700 text-slate-200">
                  {feedback}
                </div>
              )}
            </div>
          </div>

          {/* Mystery Mixture X Deduction */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-white font-mono">
                {mode === 'mn' ? 'Дээж X ямар будгуудыг агуулж байна вэ?' : 'Deduce Components in Sample X:'}
              </span>
              <span className="text-[10px] text-teal-400 font-mono">2 marks</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {mode === 'mn'
                ? 'Хроматограммын толбоны өндрийг үндэслэн Дээж X холимогт ямар цэвэр будгууд агуулагдаж байгааг тэмдэглэнэ үү:'
                : 'Based on matching vertical migration levels, which pure dye(s) are present in Sample X?'}
            </p>

            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {['Red', 'Yellow', 'Blue'].map(color => (
                <button
                  key={color}
                  onClick={() => toggleMixtureSelection(color)}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    selectedMixtureDeduction.includes(color)
                      ? 'bg-teal-950 border-teal-500 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  Dye ({color})
                </button>
              ))}
            </div>

            <button
              onClick={verifyMixtureDeduction}
              disabled={selectedMixtureDeduction.length === 0}
              className="w-full py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              Verify Deduction
            </button>

            {deductionFeedback && (
              <div className="p-3 rounded-lg text-xs leading-relaxed bg-slate-900 border border-slate-700 text-slate-200">
                {deductionFeedback}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
