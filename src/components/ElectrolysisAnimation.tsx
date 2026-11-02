import React, { useId } from 'react';

// Electrolysis of copper(II) sulfate solution, drawn small and animated. Electrons flow round the wire from the battery's
// negative terminal to the cathode (−), where copper forms; oxygen bubbles rise at the anode (+). Cu²⁺ ions drift to the cathode
// and SO₄²⁻ ions to the anode. The motion stops when the student asks for reduced motion (see index.css).
export const ElectrolysisAnimation: React.FC<{ mn: boolean; className?: string }> = ({ mn, className }) => {
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `${uid}-${name}`;

  return (
    <svg
      viewBox="0 0 240 212"
      className={className}
      role="img"
      aria-label={
        mn
          ? 'Зэсийн(II) сульфатын электролиз: катодод зэс, анодод хүчилтөрөгч'
          : 'Electrolysis of copper(II) sulfate: copper at the cathode, oxygen at the anode'
      }
    >
      <defs>
        <linearGradient id={id('liquid')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7dd3fc" stopOpacity="0.85" />
          <stop offset="1" stopColor="#0369a1" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={id('glass')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={id('cathode')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cbd5e1" />
          <stop offset="0.5" stopColor="#64748b" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
        <linearGradient id={id('anode')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fdba74" />
          <stop offset="0.5" stopColor="#b45309" />
          <stop offset="1" stopColor="#7c2d12" />
        </linearGradient>
        <linearGradient id={id('deposit')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fed7aa" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id={id('battery')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#475569" />
          <stop offset="1" stopColor="#1e293b" />
        </linearGradient>
        <radialGradient id={id('cu')} cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#e0f2fe" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0369a1" />
        </radialGradient>
        <radialGradient id={id('so')} cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fef9c3" />
          <stop offset="0.6" stopColor="#facc15" />
          <stop offset="1" stopColor="#a16207" />
        </radialGradient>
        <radialGradient id={id('bubble')} cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.6" />
        </radialGradient>
        <filter id={id('glow')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* The beaker: glass, the electrolyte with its surface, and the shine on the glass */}
      <path d="M38 56 V158 Q38 170 50 170 H190 Q202 170 202 158 V56" fill={`url(#${id('glass')})`} stroke="#94a3b8" strokeWidth="2" />
      <path d="M46 96 H194 V158 Q194 164 188 164 H52 Q46 164 46 158 Z" fill={`url(#${id('liquid')})`} />
      <path d="M46 96 Q70 90 94 96 T142 96 T194 96" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.85" className="ec-surface" />
      <path d="M44 56 H196" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path d="M52 70 V150" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

      {/* The battery: its two terminals connect the electrodes through the wires */}
      <rect x="96" y="3" width="48" height="19" rx="4" fill={`url(#${id('battery')})`} />
      <rect x="92" y="9" width="4" height="7" rx="1" fill="#94a3b8" />
      <rect x="144" y="9" width="4" height="7" rx="1" fill="#94a3b8" />
      <text x="120" y="16" textAnchor="middle" fontSize="8" fontWeight="800" fill="#f8fafc">6 V</text>

      {/* The wires, with electrons flowing along them from the battery's negative terminal to the cathode */}
      <path d="M96 13 H92 V28" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M144 13 H152 V28" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M96 13 H92 V28" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 6" filter={`url(#${id('glow')})`} className="ec-wire" />
      <path d="M144 13 H152 V28" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 6" filter={`url(#${id('glow')})`} className="ec-wire" />
      <text x="80" y="24" fontSize="8" fontWeight="700" fill="#64748b">e⁻</text>
      <text x="158" y="24" fontSize="8" fontWeight="700" fill="#64748b">e⁻</text>

      {/* The electrodes: the cathode (−) and the anode (+) */}
      <rect x="86" y="28" width="12" height="122" rx="3" fill={`url(#${id('cathode')})`} stroke="#334155" strokeWidth="0.6" />
      <rect x="146" y="28" width="12" height="122" rx="3" fill={`url(#${id('anode')})`} stroke="#7c2d12" strokeWidth="0.6" />
      <circle cx="92" cy="72" r="6" fill="#ffffff" />
      <text x="92" y="75.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="#334155">−</text>
      <circle cx="152" cy="72" r="6" fill="#ffffff" />
      <text x="152" y="75.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="#9a3412">+</text>

      {/* Copper forming on the cathode */}
      <rect x="84" y="124" width="16" height="26" rx="5" fill={`url(#${id('deposit')})`} className="ec-deposit" />

      {/* Oxygen bubbles rising from the anode */}
      <circle cx="154" cy="146" r="2.6" fill={`url(#${id('bubble')})`} stroke="#7dd3fc" strokeWidth="0.5" className="ec-bubble" />
      <circle cx="158" cy="150" r="2.1" fill={`url(#${id('bubble')})`} stroke="#7dd3fc" strokeWidth="0.5" className="ec-bubble" style={{ animationDelay: '0.5s' }} />
      <circle cx="150" cy="152" r="2.4" fill={`url(#${id('bubble')})`} stroke="#7dd3fc" strokeWidth="0.5" className="ec-bubble" style={{ animationDelay: '1s' }} />

      {/* Cu²⁺ ions drift to the cathode, SO₄²⁻ ions to the anode */}
      <circle cx="118" cy="118" r="6.5" fill={`url(#${id('cu')})`} className="ec-cu" />
      <circle cx="126" cy="136" r="6.5" fill={`url(#${id('cu')})`} className="ec-cu" style={{ animationDelay: '0.9s' }} />
      <circle cx="108" cy="150" r="6.5" fill={`url(#${id('cu')})`} className="ec-cu" style={{ animationDelay: '1.8s' }} />
      <circle cx="112" cy="128" r="6.5" fill={`url(#${id('so')})`} className="ec-so" />
      <circle cx="132" cy="150" r="6.5" fill={`url(#${id('so')})`} className="ec-so" style={{ animationDelay: '1.2s' }} />

      {/* The ion legend, then the two electrodes */}
      <text x="120" y="184" textAnchor="middle" fontSize="7.5" fill="#475569">
        {mn ? 'Cu²⁺ → катод · SO₄²⁻ → анод' : 'Cu²⁺ → cathode · SO₄²⁻ → anode'}
      </text>
      <rect x="8" y="192" width="104" height="14" rx="7" fill="#f1f5f9" />
      <text x="60" y="202" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#334155">
        {mn ? '− катод: зэс үүснэ' : '− cathode: copper forms'}
      </text>
      <rect x="128" y="192" width="104" height="14" rx="7" fill="#fff7ed" />
      <text x="180" y="202" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#9a3412">
        {mn ? '+ анод: O₂ ялгарна' : '+ anode: O₂ is released'}
      </text>
    </svg>
  );
};
