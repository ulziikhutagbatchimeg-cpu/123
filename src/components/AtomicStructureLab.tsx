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

// The same lab raised to Cambridge 9701 (public/labs/atomic-structure-9701.html). Its parts:
//  1 atoms, ions and particle beams in an electric field (AS 1.1), 2 isotopes, the mass spectrum and Ar (AS 1.2, 2.1),
//  3 orbitals, configurations and box notation for Z = 1–36 (AS 1.3), 4 first and successive ionisation energies (AS 1.4),
//  5 A Level only: transition elements, 3d and 4s, ions and the splitting of the d orbitals (A Level 28.1, 28.3).
// `tab` opens the part the lesson or topic is about; the other parts stay one click away.
export type AtomicLabTab = 1 | 2 | 3 | 4 | 5;
export const Atomic9701Lab: React.FC<{ level: 'as' | 'al'; tab: AtomicLabTab; height?: string }> = ({ level, tab, height = 'h-[1350px]' }) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const hash = `${mn ? 'mn' : 'en'}-${level}-t${tab}`;
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-700">{mn ? 'Симуляци: атомын бүтэц (9701)' : 'Simulation: atomic structure (9701)'}</div>
      <iframe
        key={hash}
        src={`labs/atomic-structure-9701.html#${hash}`}
        title={mn ? 'Атомын бүтэц – 9701' : 'Atomic structure – 9701'}
        loading="lazy"
        className={`w-full ${height} rounded-2xl border border-slate-200 bg-white`}
      />
    </div>
  );
};

// A lesson widget (a component with no props) that opens the 9701 lab at one part, for the AS lesson series
export const atomic9701Widget = (tab: AtomicLabTab): React.FC => {
  const Widget: React.FC = () => <Atomic9701Lab level="as" tab={tab} />;
  Widget.displayName = `Atomic9701Lab${tab}`;
  return Widget;
};
