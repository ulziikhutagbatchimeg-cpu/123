import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChemText } from '../common/ChemText';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  TrendingUp, 
  Sparkles, 
  AlertCircle,
  Clock,
  Eye,
  Layers,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface DataPoint {
  t: number;
  vol: number;
}

interface SavedRun {
  id: string;
  name: string;
  color: string;
  data: DataPoint[];
  finalVolume: number;
  initialRate: number;
}

export const RatesOfReactionLab: React.FC = () => {
  const { mode } = useLanguage();

  const [activeTab, setActiveTab] = useState<'gas_syringe' | 'disappearing_cross'>('gas_syringe');

  // Mode 1: Gas Syringe States
  const [temp, setTemp] = useState<number>(25); // °C
  const [concentration, setConcentration] = useState<number>(1.0); // mol/dm³
  const [particleSize, setParticleSize] = useState<'large' | 'small' | 'powder'>('small');
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([{ t: 0, vol: 0 }]);
  const [savedRuns, setSavedRuns] = useState<SavedRun[]>([]);
  const [tangentTime, setTangentTime] = useState<number>(0);

  // Rate factor multiplier
  const rateMultiplier =
    Math.pow(1.045, temp - 20) *
    concentration *
    (particleSize === 'powder' ? 2.8 : particleSize === 'small' ? 1.5 : 0.8) *
    (hasCatalyst ? 2.2 : 1.0);

  const maxVolume = 60; // cm³ max CO2

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime(prevTime => {
        const nextTime = prevTime + 2;
        if (nextTime > 120) {
          setIsRunning(false);
          return 120;
        }

        // Kinetic curve: V = maxVol * (1 - e^(-k * t))
        const k = 0.018 * rateMultiplier;
        const currentVol = Math.min(
          maxVolume,
          +(maxVolume * (1 - Math.exp(-k * nextTime))).toFixed(1)
        );

        setDataPoints(prev => [...prev, { t: nextTime, vol: currentVol }]);
        return nextTime;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [isRunning, rateMultiplier]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setDataPoints([{ t: 0, vol: 0 }]);
  };

  const handleSaveRun = () => {
    if (dataPoints.length <= 1) return;
    const colors = ['#2dd4bf', '#fbbf24', '#f43f5e', '#a855f7'];
    const newRun: SavedRun = {
      id: `run-${Date.now()}`,
      name: `${particleSize}, ${concentration}M, ${temp}°C`,
      color: colors[savedRuns.length % colors.length],
      data: [...dataPoints],
      finalVolume: dataPoints[dataPoints.length - 1].vol,
      initialRate: +(1.4 * rateMultiplier).toFixed(2)
    };
    setSavedRuns(prev => [...prev, newRun]);
  };

  const currentVolume = dataPoints[dataPoints.length - 1]?.vol || 0;
  const initialRate = +(1.4 * rateMultiplier).toFixed(2);

  // Mode 2: Disappearing Cross States
  const [crossTemp, setCrossTemp] = useState<number>(20);
  const [crossConc, setCrossConc] = useState<number>(0.15); // mol/dm³ Na2S2O3
  const [crossStopwatch, setCrossStopwatch] = useState<number>(0);
  const [isCrossRunning, setIsCrossRunning] = useState<boolean>(false);
  const [crossObscured, setCrossObscured] = useState<boolean>(false);
  const [crossResults, setCrossResults] = useState<{ temp: number; conc: number; time: number; rate: number }[]>([]);

  // Theoretical obscuration time in seconds: t = K / (conc * 1.07^(T-20))
  const theoreticalObscurityTime = +(5.0 / (crossConc * Math.pow(1.07, crossTemp - 20))).toFixed(1);

  useEffect(() => {
    if (!isCrossRunning) return;
    const timer = setInterval(() => {
      setCrossStopwatch(prev => +(prev + 0.1).toFixed(1));
    }, 100);
    return () => clearInterval(timer);
  }, [isCrossRunning]);

  const startCrossExperiment = () => {
    setCrossStopwatch(0);
    setCrossObscured(false);
    setIsCrossRunning(true);
  };

  const markCrossDisappeared = () => {
    setIsCrossRunning(false);
    setCrossObscured(true);
    const recordedTime = crossStopwatch > 0 ? crossStopwatch : theoreticalObscurityTime;
    const rate = +(1000 / recordedTime).toFixed(2); // 1000/t s^-1
    setCrossResults(prev => [...prev, { temp: crossTemp, conc: crossConc, time: recordedTime, rate }]);
  };

  // SVG dimensions for Graph
  const svgWidth = 460;
  const svgHeight = 220;
  const padding = 35;
  const graphW = svgWidth - padding * 2;
  const graphH = svgHeight - padding * 2;

  const getX = (tVal: number) => padding + (tVal / 120) * graphW;
  const getY = (vVal: number) => svgHeight - padding - (vVal / maxVolume) * graphH;

  const currentPointsSvg = dataPoints.map(p => `${getX(p.t)},${getY(p.vol)}`).join(' ');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              Cambridge Chapter 8 & Paper 6 Kinetics
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 text-xs font-mono">Rates of Chemical Reactions</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {mode === 'mn' ? 'Урвалын хурд ба кинетикийн лаборатори' : 'Rates of Reaction & Tangents Laboratory'}
          </h3>
        </div>

        {/* Experiment Mode Switcher */}
        <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('gas_syringe')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'gas_syringe'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {mode === 'mn' ? '1. Хийн шприцийн арга (Gas Syringe)' : 'Gas Syringe Method (CO₂)'}
          </button>
          <button
            onClick={() => setActiveTab('disappearing_cross')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'disappearing_cross'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {mode === 'mn' ? '2. Алга болох чагтны сорил (Disappearing Cross)' : 'Disappearing Cross Method'}
          </button>
        </div>
      </div>

      {activeTab === 'gas_syringe' ? (
        /* Gas Syringe Method */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Deck (4 cols) */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-300 uppercase tracking-wider font-mono">
                {mode === 'mn' ? 'Хувьсах хэмжигдэхүүнүүд' : 'Reaction Variables'}
              </span>
              <span className="text-teal-400 font-mono text-[10px]">CaCO₃ + 2HCl</span>
            </div>

            {/* Particle Size */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold block">Surface Area (Гадаргын талбай):</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['large', 'small', 'powder'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => setParticleSize(size)}
                    disabled={isRunning}
                    className={`py-1.5 rounded-lg font-mono capitalize transition-all border ${
                      particleSize === size
                        ? 'bg-emerald-950/80 border-emerald-500 text-white font-bold ring-1 ring-emerald-500/50'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Acid Concentration */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span className="font-semibold">[HCl] Concentration:</span>
                <span className="font-mono text-white font-bold">{concentration.toFixed(1)} M</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.5"
                value={concentration}
                onChange={e => setConcentration(Number(e.target.value))}
                disabled={isRunning}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Temperature */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span className="font-semibold">Temperature (°C):</span>
                <span className="font-mono text-white font-bold">{temp} °C</span>
              </div>
              <input
                type="range"
                min="20"
                max="60"
                step="10"
                value={temp}
                onChange={e => setTemp(Number(e.target.value))}
                disabled={isRunning}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Catalyst Toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="font-semibold text-slate-300">Add Catalyst (MnO₂):</span>
              <button
                onClick={() => setHasCatalyst(!hasCatalyst)}
                disabled={isRunning}
                className={`px-3 py-1 rounded-lg font-mono font-bold transition-colors ${
                  hasCatalyst ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {hasCatalyst ? 'YES' : 'NO'}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex gap-2">
                {!isRunning ? (
                  <button
                    onClick={handleStart}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{time === 0 ? 'Start Reaction' : 'Resume'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePause}
                    className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleSaveRun}
                disabled={dataPoints.length <= 1}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Save Run for Curve Comparison</span>
              </button>
            </div>
          </div>

          {/* Syringe & Kinetic Curve Display (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Visual Syringe Plunger Rig */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Flask */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-24 border-2 border-slate-500 rounded-b-2xl bg-slate-800/40 relative flex flex-col justify-end p-1">
                  <div className="w-full h-10 bg-emerald-950/60 rounded-b-xl flex items-center justify-center relative overflow-hidden">
                    {isRunning && (
                      <div className="absolute inset-0 flex items-center justify-center space-x-1">
                        <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100" />
                        <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-200" />
                      </div>
                    )}
                    <span className="text-[8px] font-mono text-emerald-300">CaCO₃ + HCl</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">Reaction Flask</span>
              </div>

              {/* Delivery Tube */}
              <div className="h-0.5 w-12 bg-slate-500 hidden sm:block" />

              {/* Gas Syringe */}
              <div className="flex-1 flex flex-col items-center w-full">
                <div className="w-full max-w-sm h-12 border-2 border-slate-400 rounded-lg bg-slate-900/80 relative flex items-center p-1 overflow-hidden">
                  {/* Graduations */}
                  <div className="absolute inset-x-2 top-0 h-2 flex justify-between text-[7px] font-mono text-slate-400">
                    <span>0</span>
                    <span>15</span>
                    <span>30</span>
                    <span>45</span>
                    <span>60 cm³</span>
                  </div>

                  {/* Gas Volume in Syringe */}
                  <div
                    className="h-full bg-emerald-500/30 rounded transition-all duration-200"
                    style={{ width: `${(currentVolume / maxVolume) * 100}%` }}
                  />

                  {/* Syringe Plunger */}
                  <div
                    className="w-3 h-10 bg-slate-300 rounded shadow-md transition-all duration-200"
                    style={{ marginLeft: `${(currentVolume / maxVolume) * 90}%` }}
                  />
                </div>

                <div className="flex items-center justify-between w-full max-w-sm text-xs font-mono mt-1 text-slate-300">
                  <span>Time: <strong>{time}s</strong></span>
                  <span className="text-emerald-400 font-bold">Gas Volume: {currentVolume} cm³</span>
                </div>
              </div>
            </div>

            {/* Real-time Kinetic Graph */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Volume of CO₂ (cm³) vs Time (s) Curve
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Initial Rate at t=0s: <strong className="text-emerald-400">{initialRate} cm³/s</strong>
                </span>
              </div>

              <div className="w-full flex justify-center overflow-x-auto">
                <svg width={svgWidth} height={svgHeight} className="overflow-visible">
                  {/* Grid Lines */}
                  {[0, 15, 30, 45, 60].map(v => (
                    <line
                      key={v}
                      x1={padding}
                      y1={getY(v)}
                      x2={svgWidth - padding}
                      y2={getY(v)}
                      stroke="#334155"
                      strokeDasharray="2 2"
                    />
                  ))}
                  {[0, 30, 60, 90, 120].map(t => (
                    <line
                      key={t}
                      x1={getX(t)}
                      y1={padding}
                      x2={getX(t)}
                      y2={svgHeight - padding}
                      stroke="#334155"
                      strokeDasharray="2 2"
                    />
                  ))}

                  {/* Axes */}
                  <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#94a3b8" strokeWidth="2" />
                  <line
                    x1={padding}
                    y1={svgHeight - padding}
                    x2={svgWidth - padding}
                    y2={svgHeight - padding}
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />

                  {/* Axis labels */}
                  <text x={padding - 28} y={getY(60)} fill="#94a3b8" fontSize="9" fontFamily="monospace">60</text>
                  <text x={padding - 28} y={getY(30)} fill="#94a3b8" fontSize="9" fontFamily="monospace">30</text>
                  <text x={padding - 15} y={getY(0)} fill="#94a3b8" fontSize="9" fontFamily="monospace">0</text>

                  <text x={getX(0) - 4} y={svgHeight - padding + 15} fill="#94a3b8" fontSize="9" fontFamily="monospace">0</text>
                  <text x={getX(60) - 8} y={svgHeight - padding + 15} fill="#94a3b8" fontSize="9" fontFamily="monospace">60</text>
                  <text x={getX(120) - 12} y={svgHeight - padding + 15} fill="#94a3b8" fontSize="9" fontFamily="monospace">120s</text>

                  {/* Saved Runs Curves */}
                  {savedRuns.map(run => {
                    const runPoints = run.data.map(p => `${getX(p.t)},${getY(p.vol)}`).join(' ');
                    return (
                      <polyline
                        key={run.id}
                        fill="none"
                        stroke={run.color}
                        strokeWidth="2"
                        points={runPoints}
                        opacity="0.7"
                      />
                    );
                  })}

                  {/* Current Active Run Curve */}
                  {dataPoints.length > 1 && (
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      points={currentPointsSvg}
                    />
                  )}

                  {/* Tangent line at t=0s */}
                  <line
                    x1={getX(0)}
                    y1={getY(0)}
                    x2={getX(Math.min(40, 60 / initialRate))}
                    y2={getY(Math.min(60, initialRate * 40))}
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                </svg>
              </div>

              {/* Curve comparison legend */}
              {savedRuns.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono">
                  {savedRuns.map(run => (
                    <span
                      key={run.id}
                      className="px-2 py-0.5 rounded border border-slate-700 bg-slate-900 flex items-center gap-1.5"
                      style={{ color: run.color }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: run.color }} />
                      <span>{run.name}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Disappearing Cross Method */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Deck (4 cols) */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs">
            <div className="border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider font-mono">
                {mode === 'mn' ? 'Туршилтын нөхцөлүүд' : 'Investigation Setup'}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Na₂S₂O₃(aq) + 2HCl(aq) → 2NaCl + S(s)↓ + SO₂ + H₂O
              </p>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span className="font-semibold">Temperature:</span>
                <span className="font-mono text-white font-bold">{crossTemp} °C</span>
              </div>
              <input
                type="range"
                min="20"
                max="60"
                step="10"
                value={crossTemp}
                onChange={e => setCrossTemp(Number(e.target.value))}
                disabled={isCrossRunning}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Concentration Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span className="font-semibold">[Na₂S₂O₃] Concentration:</span>
                <span className="font-mono text-white font-bold">{crossConc.toFixed(2)} M</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.25"
                step="0.05"
                value={crossConc}
                onChange={e => setCrossConc(Number(e.target.value))}
                disabled={isCrossRunning}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              {!isCrossRunning ? (
                <button
                  onClick={startCrossExperiment}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{mode === 'mn' ? 'Туршилтыг эхлүүлж цаг тоолох' : 'Mix Reagents & Start Timer'}</span>
                </button>
              ) : (
                <button
                  onClick={markCrossDisappeared}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors animate-pulse flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>{mode === 'mn' ? 'Чагт харагдахаа больсон! (Stop)' : 'Cross Obscured! (Stop Timer)'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Central Disappearing Cross Visual Stage & Results (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Visual Top-Down View of Conical Flask on Black Cross */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-around gap-6">
              {/* Paper with Black Cross under Flask */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-slate-400 mb-2 uppercase">
                  Top-down view through conical flask:
                </span>

                <div className="w-44 h-44 rounded-full border-4 border-slate-600 relative flex items-center justify-center bg-white shadow-2xl overflow-hidden">
                  {/* Black Cross 'X' on white paper */}
                  <div className="absolute w-28 h-5 bg-black rounded" />
                  <div className="absolute w-5 h-28 bg-black rounded" />

                  {/* Sulfur Precipitation Turbidity Overlay */}
                  <div
                    className="absolute inset-0 bg-yellow-100 transition-all duration-300"
                    style={{
                      opacity: isCrossRunning
                        ? Math.min(1.0, crossStopwatch / theoreticalObscurityTime)
                        : crossObscured
                        ? 1.0
                        : 0.05
                    }}
                  />
                </div>
              </div>

              {/* Stopwatch & Rate Display */}
              <div className="flex flex-col items-center space-y-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Timer (Seconds):</span>
                    <span className="text-2xl font-mono font-bold text-white">
                      {crossStopwatch.toFixed(1)} s
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-mono text-center">
                  Formula: Rate ∝ 1000 / t (s⁻¹)
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
              <span className="font-bold text-white uppercase font-mono block">
                {mode === 'mn' ? 'Туршилтын үр дүн ба хурдны тооцоолол' : 'Recorded Reaction Times & Rates Table'}
              </span>

              <table className="w-full text-left font-mono">
                <thead className="bg-slate-900 text-slate-400 text-[10px]">
                  <tr>
                    <th className="p-2">Temp (°C)</th>
                    <th className="p-2">[Na₂S₂O₃] (M)</th>
                    <th className="p-2">Time t (s)</th>
                    <th className="p-2 text-right">Rate (1000/t s⁻¹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {crossResults.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-3 text-center text-slate-500 italic">
                        {mode === 'mn' ? 'Үр дүн бүртгэгдээгүй байна.' : 'No runs recorded yet. Start experiment.'}
                      </td>
                    </tr>
                  ) : (
                    crossResults.map((r, idx) => (
                      <tr key={idx}>
                        <td className="p-2 text-slate-300">{r.temp}°C</td>
                        <td className="p-2 text-slate-300">{r.conc} M</td>
                        <td className="p-2 text-slate-300">{r.time} s</td>
                        <td className="p-2 text-right font-bold text-amber-400">{r.rate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
