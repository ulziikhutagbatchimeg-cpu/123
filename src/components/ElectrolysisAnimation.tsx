import React from 'react';

// Electrolysis of copper(II) sulfate solution, drawn small and animated. Electrons flow round the wire from the cell's negative
// terminal to the cathode (−), where copper forms; oxygen bubbles rise at the anode (+). Cu²⁺ ions drift to the cathode and
// SO₄²⁻ ions to the anode. The motion stops when the student asks for reduced motion (see index.css).
export const ElectrolysisAnimation: React.FC<{ mn: boolean; className?: string }> = ({ mn, className }) => (
  <svg
    viewBox="0 0 240 200"
    className={className}
    role="img"
    aria-label={
      mn
        ? 'Зэсийн(II) сульфатын электролиз: катодод зэс, анодод хүчилтөрөгч'
        : 'Electrolysis of copper(II) sulfate: copper at the cathode, oxygen at the anode'
    }
  >
    {/* The beaker and the electrolyte */}
    <rect x="42" y="88" width="156" height="71" rx="6" className="fill-sky-200 dark:fill-sky-900" opacity="0.8" />
    <path d="M40 60 V150 Q40 160 50 160 H190 Q200 160 200 150 V60" fill="none" stroke="#94a3b8" strokeWidth="2" />
    <path d="M36 60 H204" stroke="#94a3b8" strokeWidth="2" />

    {/* The external circuit: electrons leave the negative terminal, reach the cathode, and return from the anode */}
    <path d="M120 8 H91 V30" fill="none" stroke="#64748b" strokeWidth="2" className="ec-wire" />
    <path d="M151 30 V8 H160" fill="none" stroke="#64748b" strokeWidth="2" className="ec-wire" />
    <rect x="120" y="0" width="40" height="16" rx="3" className="fill-white dark:fill-slate-900" stroke="#64748b" strokeWidth="1.5" />
    <text x="140" y="11" textAnchor="middle" fontSize="8" fontWeight="700" className="fill-slate-600 dark:fill-slate-300">
      6 V
    </text>
    <text x="95" y="22" fontSize="9" className="fill-slate-500 dark:fill-slate-400">e⁻</text>
    <text x="162" y="26" fontSize="9" className="fill-slate-500 dark:fill-slate-400">e⁻</text>

    {/* The cathode (−) and the anode (+) */}
    <rect x="85" y="30" width="12" height="110" rx="2" fill="#64748b" />
    <rect x="145" y="30" width="12" height="110" rx="2" fill="#92400e" />
    <text x="91" y="82" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ffffff">−</text>
    <text x="151" y="82" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ffffff">+</text>

    {/* Copper forming on the cathode */}
    <rect x="83" y="118" width="16" height="22" rx="3" fill="#c2410c" className="ec-deposit" />

    {/* Oxygen bubbles rising from the anode */}
    <circle cx="150" cy="134" r="2.5" fill="#ffffff" stroke="#7dd3fc" className="ec-bubble" />
    <circle cx="154" cy="138" r="2" fill="#ffffff" stroke="#7dd3fc" className="ec-bubble" style={{ animationDelay: '0.5s' }} />
    <circle cx="148" cy="140" r="2.5" fill="#ffffff" stroke="#7dd3fc" className="ec-bubble" style={{ animationDelay: '1s' }} />

    {/* Cu²⁺ ions drift to the cathode, SO₄²⁻ ions to the anode */}
    <circle cx="122" cy="108" r="6" fill="#0ea5e9" className="ec-cu" />
    <circle cx="128" cy="128" r="6" fill="#0ea5e9" className="ec-cu" style={{ animationDelay: '0.9s' }} />
    <circle cx="116" cy="146" r="6" fill="#0ea5e9" className="ec-cu" style={{ animationDelay: '1.8s' }} />
    <circle cx="112" cy="118" r="6" fill="#facc15" className="ec-so" />
    <circle cx="126" cy="146" r="6" fill="#facc15" className="ec-so" style={{ animationDelay: '1.2s' }} />

    {/* Legend and the two electrodes */}
    <text x="120" y="184" textAnchor="middle" fontSize="7.5" className="fill-slate-600 dark:fill-slate-300">
      {mn ? 'Cu²⁺ → катод · SO₄²⁻ → анод' : 'Cu²⁺ → cathode · SO₄²⁻ → anode'}
    </text>
    <text x="8" y="196" fontSize="8" className="fill-slate-700 dark:fill-slate-200">
      {mn ? '− катод: зэс үүснэ' : '− cathode: copper forms'}
    </text>
    <text x="232" y="196" fontSize="8" textAnchor="end" className="fill-slate-700 dark:fill-slate-200">
      {mn ? '+ анод: O₂ ялгарна' : '+ anode: oxygen is released'}
    </text>
  </svg>
);
