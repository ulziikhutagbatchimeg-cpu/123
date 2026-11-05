import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SITE_ADDRESSES } from './SiteAddresses';

// The three student sites in the top bar, for the teacher's signed-in account: one click opens any of them in a new tab.
export const TeacherSiteLinks: React.FC = () => {
  const { mode } = useLanguage();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const mn = mode === 'mn';
  const label = mn ? 'Сайтын хаягууд' : 'Site addresses';

  // A click outside the menu closes it
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <div className="relative" ref={boxRef}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={label}
        title={label}
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-emerald-400 dark:hover:border-teal-500"
      >
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 sm:w-80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl">
          <div className="mb-2 text-sm font-bold text-slate-900 dark:text-white">{label}</div>
          <ul className="space-y-2">
            {SITE_ADDRESSES.map(site => (
              <li key={site.id} className="rounded-xl border border-slate-200 dark:border-slate-700 p-2.5">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-bold text-emerald-700 dark:text-teal-300 hover:underline"
                >
                  {site.label}
                </a>
                <span className="block break-all text-[11px] text-slate-500 dark:text-slate-400">{site.url}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
