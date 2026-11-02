import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// A foldable part. Its title and the main points stay visible when it is shut, and a click opens the content.
export const Fold: React.FC<{ title: string; lines: string[]; progress?: string; children: React.ReactNode }> = ({ title, lines, progress, children }) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-violet-200 bg-violet-50/40 dark:border-slate-700 dark:bg-slate-950">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 rounded-2xl px-4 py-3.5 text-left hover:bg-violet-100/60 dark:hover:bg-slate-800"
      >
        <span className="min-w-0 space-y-1">
          <span className="block text-base font-black text-slate-900 dark:text-white">{title}</span>
          {lines.map(line => (
            <span key={line} className="block text-sm font-bold text-slate-700 dark:text-slate-200">{line}</span>
          ))}
        </span>
        <span className="flex shrink-0 items-center gap-2 pt-0.5">
          {progress && <span className="rounded-lg bg-violet-600 px-2.5 py-1 text-xs font-black text-white">{progress}</span>}
          <span className="text-sm font-black text-violet-700 dark:text-violet-300">{open ? (mn ? 'Хаах' : 'Close') : (mn ? 'Нээх' : 'Open')}</span>
          <ChevronDown className={`h-5 w-5 text-violet-700 transition-transform dark:text-violet-300 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      {open && <div className="space-y-4 border-t border-violet-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">{children}</div>}
    </div>
  );
};
