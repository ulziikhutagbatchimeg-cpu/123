import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LabFrame, type LabNext } from './LabFrame';

// The teacher's chemical-bonding lab (public/labs/chemical-bonding.html), shown whole in a frame. Its parts:
//  1 ionic bonding, 2 covalent bonding (dot-and-cross; at 9701 also dative bonds and σ / π), 3 structure and properties
//  (NaCl, diamond, graphite, SiO₂, Cu, CH₄), and at 9701 only 4 shapes and polarity (VSEPR) and 5 intermolecular forces.
// `syllabus` sets the lab's own IGCSE 0620 / AS 9701 switch, `tab` the part it opens at; it opens in the lesson's language.
// Under each lab the student submits it for a score (LabFrame); in a lesson, "Next step" then moves the lesson on.
export type BondingTab = 1 | 2 | 3 | 4 | 5;
export const BondingLab: React.FC<{ syllabus: '0620' | '9701'; tab: BondingTab; height?: string } & LabNext> = ({
  syllabus,
  tab,
  height = 'h-[1150px]',
  onDone,
  nextHint
}) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const hash = `${mn ? 'mn' : 'en'}-${syllabus}-t${tab}`;
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-700">{mn ? 'Симуляци: химийн холбоо' : 'Simulation: chemical bonding'}</div>
      <LabFrame
        frameKey={hash}
        src={`labs/chemical-bonding.html#${hash}`}
        title={{ mn: 'Химийн холбоо', en: 'Chemical bonding' }}
        height={height}
        check="bonding"
        part={tab}
        mn={mn}
        onDone={onDone}
        nextHint={nextHint}
      />
    </div>
  );
};

// A lesson widget that opens the bonding lab at one part
export const bondingWidget = (syllabus: '0620' | '9701', tab: BondingTab): React.FC<LabNext> => {
  const Widget: React.FC<LabNext> = props => <BondingLab syllabus={syllabus} tab={tab} {...props} />;
  Widget.displayName = `BondingLab${syllabus}t${tab}`;
  return Widget;
};

// The teacher's intermolecular-forces lab (public/labs/intermolecular-forces.html), shown whole in a frame. Its parts:
//  1 what breaks on heating a simple molecular substance, 3 boiling-point trends (noble gases, halogens, alkanes; at 9701
//  also the hydrides of Groups 14–17 and the C₅H₁₂ isomers), and at 9701 only 2 the types of force (id-id, pd-pd,
//  hydrogen bonding) and 4 hydrogen bonding and ice.
export type ImfTab = 1 | 2 | 3 | 4;
export const IntermolecularLab: React.FC<{ syllabus: '0620' | '9701'; tab: ImfTab; height?: string } & LabNext> = ({
  syllabus,
  tab,
  height = 'h-[1100px]',
  onDone,
  nextHint
}) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const hash = `${mn ? 'mn' : 'en'}-${syllabus}-t${tab}`;
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-700">{mn ? 'Симуляци: молекул хоорондын хүч' : 'Simulation: intermolecular forces'}</div>
      <LabFrame
        frameKey={hash}
        src={`labs/intermolecular-forces.html#${hash}`}
        title={{ mn: 'Молекул хоорондын хүч', en: 'Intermolecular forces' }}
        height={height}
        check="imf"
        part={tab}
        mn={mn}
        onDone={onDone}
        nextHint={nextHint}
      />
    </div>
  );
};

// A lesson widget that opens the intermolecular-forces lab at one part
export const imfWidget = (syllabus: '0620' | '9701', tab: ImfTab): React.FC<LabNext> => {
  const Widget: React.FC<LabNext> = props => <IntermolecularLab syllabus={syllabus} tab={tab} {...props} />;
  Widget.displayName = `IntermolecularLab${syllabus}t${tab}`;
  return Widget;
};
