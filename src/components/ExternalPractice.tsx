import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Links to the practice sites. The student signs in on each site with their own username and password; this site never sees them.
const SELBE_URL = 'https://selbe4you.com/';
const GRADING_URL = 'https://www.grading4you.com/';

export const ExternalPractice: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';

  return (
    <section className="rounded-2xl border border-sky-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-base font-black text-slate-900 dark:text-white">{mn ? 'Гадаад дасгал' : 'Practice sites'}</h3>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <a
          href={SELBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-sky-300 bg-white px-3 py-2 text-xs font-bold text-sky-700 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-sky-300 dark:hover:bg-slate-800"
        >
          {mn ? 'selbe4you руу орох' : 'Open selbe4you'}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={GRADING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-sky-300 bg-white px-3 py-2 text-xs font-bold text-sky-700 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-sky-300 dark:hover:bg-slate-800"
        >
          {mn ? 'grading4you руу орох' : 'Open grading4you'}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
