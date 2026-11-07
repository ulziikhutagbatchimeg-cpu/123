import React, { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// The student address of each programme. Each programme has its own site, and a student uses only the one they enrolled in.
export const SITE_ADDRESSES = [
  { id: 'igcse', label: 'IGCSE 0620', url: 'https://ulziikhutagbatchimeg-cpu.github.io/123/' },
  { id: 'as', label: 'AS Level 9701', url: 'https://ulziikhutagbatchimeg-cpu.github.io/123-as/' },
  { id: 'a', label: 'A Level 9701', url: 'https://ulziikhutagbatchimeg-cpu.github.io/123-a/' }
] as const;

// English only, Mongolian only, or both in Dual (English first, Mongolian beside it in a lighter tone)
export const SiteAddresses: React.FC = () => {
  const { mode } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  const txt = (en: string, mn: string) => {
    if (mode === 'en') return en;
    if (mode === 'mn') return mn;
    return (
      <>
        {en}
        <span className="ml-1.5 text-xs font-normal text-slate-600">({mn})</span>
      </>
    );
  };

  const copy = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // The clipboard can be blocked; the address is shown in full, so it can still be selected and copied by hand
    }
  };

  return (
    <section className="rounded-2xl border border-slate-400 bg-slate-200 p-5 sm:p-6 space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900">{txt('Student site addresses', 'Сурагчдын сайтын хаяг')}</h3>
        <p className="text-xs text-slate-600">
          {txt(
            'Send each student the address of their own programme. Copy it with one press.',
            'Сурагч бүрт өөрийн хөтөлбөрийн хаягийг илгээнэ. Нэг товчоор хуулна.'
          )}
        </p>
      </div>
      <ul className="space-y-2">
        {SITE_ADDRESSES.map(site => (
          <li
            key={site.id}
            className="flex flex-col gap-2 rounded-xl border border-slate-400 bg-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="text-sm font-bold text-slate-900">{site.label}</div>
              <div className="truncate font-mono text-xs text-slate-700 select-all">{site.url}</div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => copy(site.id, site.url)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500"
              >
                {copied === site.id ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                {copied === site.id ? txt('Copied', 'Хуулсан') : txt('Copy', 'Хуулах')}
              </button>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-400 px-3 py-2 text-xs font-bold text-slate-800 hover:border-slate-600"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                {txt('Open', 'Нээх')}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
