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
    <section className="rounded-2xl border border-sky-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h3 className="text-lg font-black text-slate-900 dark:text-white">{mn ? 'Гадаад дасгал' : 'Practice sites'}</h3>
      <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-300">
        {mn
          ? 'Дасгал даалгавраа гадаад сайтууд дээр хийнэ. Нэвтрэх нэр, нууц үгээ сайт бүр дээр өөрөө оруулна.'
          : 'Do your practice tasks on these sites. Sign in with your own username and password on each site.'}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={SELBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-black text-white hover:bg-sky-700"
        >
          {mn ? 'Selbe руу орох' : 'Open Selbe'}
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
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
