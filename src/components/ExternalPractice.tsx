import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// A link to the Selbe practice site. The student signs in there with their own username and password; this site never sees them.
const SELBE_URL = 'https://selbe4you.com/';

export const ExternalPractice: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';

  return (
    <section className="rounded-2xl border border-sky-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h3 className="text-lg font-black text-slate-900 dark:text-white">{mn ? 'Selbe дасгал' : 'Selbe practice'}</h3>
      <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-300">
        {mn
          ? 'Дасгал даалгавраа Selbe дээр хийнэ. Нэвтрэх нэр, нууц үгээ Selbe-ийн хуудсан дээр өөрөө оруулна.'
          : 'Do your practice tasks on Selbe. Sign in with your own username and password on the Selbe site.'}
      </p>
      <a
        href={SELBE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-base font-black text-white hover:bg-sky-700"
      >
        {mn ? 'Selbe руу орох' : 'Open Selbe'}
        <ExternalLink className="h-5 w-5" aria-hidden="true" />
      </a>
    </section>
  );
};
