import React from 'react';
import { useLanguage } from '../context/LanguageContext';

// The teacher's atomic-structure lab for IGCSE 0620 chapter 2 (public/labs/atomic-structure-igcse.html), shown whole in a
// frame as given: build an atom (Z, A, ions), electron shells and the Periodic Table (Z = 1–20), isotopes and (E) Ar.
// It opens in the language of the lesson around it; the page has its own MN / EN switch too.
export const AtomicStructureLab: React.FC<{ height?: string }> = ({ height = 'h-[1100px]' }) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-700">{mn ? 'Симуляци: атомын бүтэц' : 'Simulation: atomic structure'}</div>
      <iframe
        key={mn ? 'mn' : 'en'}
        src={`labs/atomic-structure-igcse.html#${mn ? 'mn' : 'en'}`}
        title={mn ? 'Атомын бүтэц' : 'Atomic structure'}
        loading="lazy"
        className={`w-full ${height} rounded-2xl border border-slate-200 bg-white`}
      />
    </div>
  );
};
