import React from 'react';

// The electrolysis electron-flow page (public/labs/electrolysis-electron-flow.html), shown whole in its own frame.
// It is one page for every place that shows the electrolysis lab, so a change to it is seen in all of them.
export const ElectronFlowLab: React.FC<{ mn: boolean }> = ({ mn }) => (
  <iframe
    src="labs/electrolysis-electron-flow.html"
    title={mn ? 'Электролиз: электроны урсах зам' : 'Electrolysis: electron flow'}
    loading="lazy"
    className="w-full h-[1180px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white"
  />
);
