import React, { useState } from 'react';
import { Check, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// The student address of each programme. Each programme has its own site, and a student uses only the one they enrolled in.
export const SITE_ADDRESSES = [
  { id: 'igcse', label: 'IGCSE 0620', url: 'https://ulziikhutagbatchimeg-cpu.github.io/123/' },
  { id: 'as', label: 'AS Level 9701', url: 'https://ulziikhutagbatchimeg-cpu.github.io/123-as-9701/' },
  { id: 'a', label: 'A Level 9701', url: 'https://ulziikhutagbatchimeg-cpu.github.io/123-a-9701/' }
] as const;

// Whether the address card is open, kept on this browser; it starts folded so the teacher's page starts with the students
const OPEN_KEY = 'chem_site_addresses_open';

// A small card that folds away: its heading opens it, and each programme is one compact row with copy and open buttons.
// English only, Mongolian only, or both in Dual (English first, Mongolian beside it in a lighter tone).
export const SiteAddresses: React.FC = () => {
  const { mode } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(OPEN_KEY) === '1';
    } catch {
      return false;
    }
  });

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

  const toggle = () =>
    setOpen(v => {
      try {
        window.localStorage.setItem(OPEN_KEY, v ? '0' : '1');
      } catch {
        // Storage can be blocked; the card then starts folded on the next visit
      }
      return !v;
    });

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
    <section className="rounded-xl border border-slate-300 bg-slate-100">
      <button type="button" onClick={toggle} aria-expanded={open} className="flex w-full items-center gap-2 px-4 py-2.5 text-left">
        <span className="text-sm font-bold text-slate-900">{txt('Student site addresses', 'Сурагчдын сайтын хаяг')}</span>
        {!open && <span className="hidden text-xs text-slate-500 sm:inline">· IGCSE 0620 · AS 9701 · A Level 9701</span>}
        <ChevronDown aria-hidden="true" className={`ml-auto h-4 w-4 shrink-0 text-slate-600 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-2 px-4 pb-3">
          <p className="text-xs text-slate-600">
            {txt('Send each student the address of their own programme.', 'Сурагч бүрт өөрийн хөтөлбөрийн хаягийг илгээнэ.')}
          </p>
          <ul className="grid gap-2 lg:grid-cols-3">
            {SITE_ADDRESSES.map(site => (
              <li key={site.id} className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900">{site.label}</div>
                  <div className="truncate font-mono text-[11px] text-slate-600 select-all" title={site.url}>{site.url}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copy(site.id, site.url)}
                  title={mode === 'en' ? 'Copy' : 'Хуулах'}
                  aria-label={mode === 'en' ? `Copy ${site.label}` : `${site.label} хуулах`}
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  {copied === site.id ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                </button>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={mode === 'en' ? 'Open' : 'Нээх'}
                  aria-label={mode === 'en' ? `Open ${site.label}` : `${site.label} нээх`}
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-400 text-slate-700 hover:border-slate-600"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
