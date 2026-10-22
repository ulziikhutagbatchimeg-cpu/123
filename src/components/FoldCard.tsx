import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
  title: React.ReactNode;
  summary?: React.ReactNode; // stays visible on the heading while the card is folded
  alert?: boolean; // amber dot: something needs attention even while folded
  defaultOpen?: boolean;
  children: React.ReactNode;
}

// A card whose body folds away. The heading keeps the key number in view while folded.
export const FoldCard: React.FC<Props> = ({ title, summary, alert = false, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-left"
      >
        <span className="flex items-center gap-2 min-w-0">
          {title}
          {alert && <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />}
        </span>
        <span className="flex items-center gap-2 shrink-0">
          {!open && summary}
          <ChevronDown
            className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>
      {open && <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-4">{children}</div>}
    </div>
  );
};
