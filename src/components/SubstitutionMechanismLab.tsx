import React, { useState } from 'react';

// The SN1 and SN2 nucleophilic-substitution mechanisms in 3D (public/labs/sn1-simulation.html, sn2-simulation.html), shown
// whole in a frame. The page opens in the site's language and at the programme's level: AS shows the AS points, A Level the
// rate equations, stereochemistry and orbitals. Each page also has its own MN / EN and AS / A Level switches.
type Mechanism = 'sn1' | 'sn2';

export const SubstitutionMechanismLab: React.FC<{ mn: boolean; level: 'as' | 'al' }> = ({ mn, level }) => {
  const [shown, setShown] = useState<Mechanism>('sn2');
  const lang = mn ? 'mn' : 'en';
  const tab = (id: Mechanism, label: string) => (
    <button
      type="button"
      onClick={() => setShown(id)}
      aria-pressed={shown === id}
      className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-colors ${
        shown === id ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-700 border-slate-300 hover:border-violet-500'
      }`}
    >
      {label}
    </button>
  );
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono">
          {mn ? 'Нуклеофилийн орлуулалт: 3D механизм' : 'Nucleophilic substitution: 3D mechanism'}
        </span>
        <div className="flex gap-2 sm:ml-auto">
          {tab('sn2', mn ? 'SN2 (1° галогеналкан)' : 'SN2 (1° halogenoalkane)')}
          {tab('sn1', mn ? 'SN1 (3° галогеналкан)' : 'SN1 (3° halogenoalkane)')}
        </div>
      </div>
      <iframe
        key={`${shown}-${lang}-${level}`}
        src={`labs/${shown}-simulation.html#${lang}-${level}`}
        title={shown === 'sn1' ? (mn ? 'SN1 урвалын механизм' : 'SN1 reaction mechanism') : mn ? 'SN2 урвалын механизм' : 'SN2 reaction mechanism'}
        loading="lazy"
        className="w-full h-[1150px] rounded-2xl border border-slate-200 bg-slate-900"
      />
    </div>
  );
};
