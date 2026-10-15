import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Scale, CheckCircle2, RefreshCw, Calculator, ArrowRight } from 'lucide-react';

export const StoichiometryBalancer: React.FC = () => {
  const { mode } = useLanguage();

  const [activeTab, setActiveTab] = useState<'balancer' | 'calculator'>('balancer');

  // Balancer state for Haber process: a N2 + b H2 -> c NH3
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(1);
  const [coeffC, setCoeffC] = useState<number>(1);

  // Mole calculator state
  const [calcMass, setCalcMass] = useState<string>('28.0');
  const [calcMr, setCalcMr] = useState<string>('28'); // e.g. N2
  const [calcVolumeDm3, setCalcVolumeDm3] = useState<string>('');

  // Calculations
  const leftN = coeffA * 2;
  const rightN = coeffC * 1;
  const leftH = coeffB * 2;
  const rightH = coeffC * 3;

  const isBalanced = leftN === rightN && leftH === rightH;

  const calculatedMoles = calcMass && calcMr && Number(calcMr) > 0
    ? (Number(calcMass) / Number(calcMr)).toFixed(3)
    : '0';

  const calculatedGasVol = calcMass && calcMr && Number(calcMr) > 0
    ? (Number(calculatedMoles) * 24).toFixed(2)
    : '0';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">Cambridge Topic 3.2</span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-slate-400 text-xs font-mono">Stoichiometry & Calculations</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            {mode === 'mn' ? 'Урвалын тэгшитгэл тэнцүүлэгч ба Молийн тооцоолуур' : mode === 'en' ? 'Equation Balancer & Mole Calculator' : 'Equation Balancer & Mole Tool / Стехиометрийн симуляц'}
          </h3>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('balancer')}
            className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
              activeTab === 'balancer'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {mode === 'mn' ? 'Тэгшитгэл тэнцүүлэгч' : 'Equation Balancer'}
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
              activeTab === 'calculator'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {mode === 'mn' ? 'Молийн тооцоолуур' : 'Mole Calculator'}
          </button>
        </div>
      </div>

      {activeTab === 'balancer' ? (
        /* BALANCER VIEW */
        <div className="space-y-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 text-center">
            <span className="text-xs text-slate-400 font-mono block mb-2">
              Reaction: Haber Process Synthesis of Ammonia ($N_2 + H_2 \\rightleftharpoons NH_3$)
            </span>

            {/* Visual Equation with coefficient selectors */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-lg font-mono font-bold text-white">
              {/* Coefficient A */}
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={coeffA}
                  onChange={e => setCoeffA(Math.max(1, Number(e.target.value)))}
                  className="w-12 h-10 text-center bg-slate-900 border border-amber-500/60 rounded text-amber-300 font-bold"
                />
                <span>N₂ (g)</span>
              </div>

              <span className="text-slate-400">+</span>

              {/* Coefficient B */}
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={coeffB}
                  onChange={e => setCoeffB(Math.max(1, Number(e.target.value)))}
                  className="w-12 h-10 text-center bg-slate-900 border border-amber-500/60 rounded text-amber-300 font-bold"
                />
                <span>H₂ (g)</span>
              </div>

              <span className="text-teal-400">⇌</span>

              {/* Coefficient C */}
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={coeffC}
                  onChange={e => setCoeffC(Math.max(1, Number(e.target.value)))}
                  className="w-12 h-10 text-center bg-slate-900 border border-amber-500/60 rounded text-amber-300 font-bold"
                />
                <span>NH₃ (g)</span>
              </div>
            </div>

            {/* Quick preset reset */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setCoeffA(1);
                  setCoeffB(3);
                  setCoeffC(2);
                }}
                className="text-xs text-amber-400/80 hover:text-amber-300 underline font-mono"
              >
                {mode === 'mn' ? 'Зөв тэнцүүлэлтийг харах (1, 3, 2)' : 'Solve Balance (1, 3, 2)'}
              </button>
            </div>
          </div>

          {/* Atom Count Comparison Scale */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nitrogen Balance */}
            <div className={`p-4 rounded-xl border transition-colors ${leftN === rightN ? 'bg-emerald-950/30 border-emerald-800' : 'bg-slate-950 border-slate-800'}`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-white">Nitrogen (N) Atoms</span>
                {leftN === rightN ? (
                  <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Balanced
                  </span>
                ) : (
                  <span className="text-rose-400 text-xs font-mono">Unbalanced</span>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Reactants: {leftN} atoms</span>
                <span className="text-slate-400">Products: {rightN} atoms</span>
              </div>
            </div>

            {/* Hydrogen Balance */}
            <div className={`p-4 rounded-xl border transition-colors ${leftH === rightH ? 'bg-emerald-950/30 border-emerald-800' : 'bg-slate-950 border-slate-800'}`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-white">Hydrogen (H) Atoms</span>
                {leftH === rightH ? (
                  <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Balanced
                  </span>
                ) : (
                  <span className="text-rose-400 text-xs font-mono">Unbalanced</span>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Reactants: {leftH} atoms</span>
                <span className="text-slate-400">Products: {rightH} atoms</span>
              </div>
            </div>
          </div>

          {isBalanced && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-700/60 rounded-xl text-center space-y-1">
              <span className="text-sm font-bold text-emerald-300">
                {mode === 'mn' ? 'Тэгшитгэл бүрэн тэнцлээ! (Law of Conservation of Mass)' : 'Equation Perfectly Balanced!'}
              </span>
              <p className="text-xs text-slate-300">
                {mode === 'mn'
                  ? 'Масс хадгалагдах хууль ёсоор урвалын өмнөх ба дараах элемент тус бүрийн атомын тоо яг тэнцүү байна.'
                  : 'According to the Law of Conservation of Mass, the number of each type of atom before and after reaction is conserved.'}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* MOLE CALCULATOR VIEW */
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="text-xs text-slate-400">
            {mode === 'mn'
              ? 'Масс (грамм) болон Харьцангуй молекул массыг ($M_r$) оруулан моль болон хийн эзлэхүүнийг ($24\\text{ дм}^3$) тооцоолно.'
              : 'Enter mass and relative molecular mass to calculate moles and molar gas volume ($24\\text{ dm}^3$ at r.t.p.).'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Mass in grams (m):</label>
              <input
                type="number"
                value={calcMass}
                onChange={e => setCalcMass(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded p-2 text-sm font-mono"
                placeholder="e.g. 28.0"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Molar mass / Mr (g/mol):</label>
              <input
                type="number"
                value={calcMr}
                onChange={e => setCalcMr(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded p-2 text-sm font-mono"
                placeholder="e.g. 28"
              />
            </div>
          </div>

          {/* Results Display */}
          <div className="mt-4 p-4 bg-slate-900 border border-slate-800 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Amount of substance (n):</span>
              <span className="text-xl font-bold font-mono text-amber-400">
                {calculatedMoles} mol
              </span>
              <span className="text-[11px] text-slate-500 block mt-1 font-mono">
                Formula: n = m / Mr
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block">Gas Volume at r.t.p. (V):</span>
              <span className="text-xl font-bold font-mono text-teal-400">
                {calculatedGasVol} dm³
              </span>
              <span className="text-[11px] text-slate-500 block mt-1 font-mono">
                Formula: V = n × 24 dm³ (or {Number(calculatedGasVol) * 1000} cm³)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
