import React from 'react';
import { LabFrame } from './LabFrame';

// The electrolysis electron-flow page (public/labs/electrolysis-electron-flow.html), shown whole in its own frame.
// It is one page for every place that shows the electrolysis lab, so a change to it is seen in all of them.
// Under it the student submits the lab for a score (LabFrame).
export const ElectronFlowLab: React.FC<{ mn: boolean }> = ({ mn }) => (
  <LabFrame
    src="labs/electrolysis-electron-flow.html"
    title={{ mn: 'Электролиз: электроны урсах зам', en: 'Electrolysis: electron flow' }}
    height="h-[1180px]"
    check="electron-flow"
    mn={mn}
  />
);
