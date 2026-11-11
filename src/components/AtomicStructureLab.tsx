import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LabFrame, type LabNext } from './LabFrame';

// The teacher's atomic-structure lab for IGCSE 0620 chapter 2 (public/labs/atomic-structure-igcse.html), shown whole in a
// frame as given: 1 build an atom (Z, A, ions), 2 electron shells and the Periodic Table (Z = 1–20), 3 isotopes and (E) Ar.
// `tab` opens one part. It opens in the language of the lesson around it; the page has its own MN / EN switch too.
// Under each lab the student submits it for a score (LabFrame); in a lesson, "Next step" then moves the lesson on.
export type AtomicIgcseTab = 1 | 2 | 3;
export const AtomicStructureLab: React.FC<{ tab?: AtomicIgcseTab; height?: string } & LabNext> = ({ tab, height = 'h-[1100px]', onDone, nextHint }) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const hash = `${mn ? 'mn' : 'en'}${tab ? `-t${tab}` : ''}`;
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-700">{mn ? 'Симуляци: атомын бүтэц' : 'Simulation: atomic structure'}</div>
      <LabFrame
        frameKey={hash}
        src={`labs/atomic-structure-igcse.html#${hash}`}
        title={{ mn: 'Атомын бүтэц', en: 'Atomic structure' }}
        height={height}
        check="atomic-igcse"
        part={tab ?? 1}
        mn={mn}
        onDone={onDone}
        nextHint={nextHint}
      />
    </div>
  );
};

// A lesson widget that opens the IGCSE lab at one part
export const atomicIgcseWidget = (tab: AtomicIgcseTab): React.FC<LabNext> => {
  const Widget: React.FC<LabNext> = props => <AtomicStructureLab tab={tab} {...props} />;
  Widget.displayName = `AtomicStructureLab${tab}`;
  return Widget;
};

// The same lab raised to Cambridge 9701 (public/labs/atomic-structure-9701.html). Its parts:
//  1 atoms, ions and particle beams in an electric field (AS 1.1), 2 isotopes, the mass spectrum and Ar (AS 1.2, 2.1),
//  3 orbitals, configurations and box notation for Z = 1–36 (AS 1.3), 4 first and successive ionisation energies (AS 1.4),
//  5 A Level only: transition elements, 3d and 4s, ions and the splitting of the d orbitals (A Level 28.1, 28.3).
// `tab` opens the part the lesson or topic is about; the other parts stay one click away.
export type AtomicLabTab = 1 | 2 | 3 | 4 | 5;
export const Atomic9701Lab: React.FC<{ level: 'as' | 'al'; tab: AtomicLabTab; height?: string } & LabNext> = ({
  level,
  tab,
  height = 'h-[1350px]',
  onDone,
  nextHint
}) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const hash = `${mn ? 'mn' : 'en'}-${level}-t${tab}`;
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-700">{mn ? 'Симуляци: атомын бүтэц (9701)' : 'Simulation: atomic structure (9701)'}</div>
      <LabFrame
        frameKey={hash}
        src={`labs/atomic-structure-9701.html#${hash}`}
        title={{ mn: 'Атомын бүтэц – 9701', en: 'Atomic structure – 9701' }}
        height={height}
        check="atomic-9701"
        part={tab}
        mn={mn}
        onDone={onDone}
        nextHint={nextHint}
      />
    </div>
  );
};

// A lesson widget that opens the 9701 lab at one part, for the AS lesson series
export const atomic9701Widget = (tab: AtomicLabTab): React.FC<LabNext> => {
  const Widget: React.FC<LabNext> = props => <Atomic9701Lab level="as" tab={tab} {...props} />;
  Widget.displayName = `Atomic9701Lab${tab}`;
  return Widget;
};
