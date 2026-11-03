import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ALEVEL_PAPERS, ALEVEL_PAST_PAPERS_PAGE } from '../data/officialPastPapers';

// The official AS and A Level 9701 papers, as links to the Cambridge website. The PDFs are not copied into the app.
export const AlevelPastPapers: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const sessions = [
    { id: 'June 2024' as const, label: mn ? '2024 оны 6-р сар' : 'June 2024' },
    { id: '2022 specimen' as const, label: mn ? '2022 жишээ шалгалт (specimen)' : '2022 specimen' }
  ];

  return (
    <section className="space-y-6 rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-teal-300">
          {mn ? '9701 · Өмнөх жилийн шалгалт' : '9701 · Past papers'}
        </div>
        <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">
          {mn ? 'Албан ёсны шалгалтууд' : 'Official papers'}
        </h2>
        <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-300">
          {mn
            ? 'Асуултын цаас ба mark scheme Cambridge-ийн вэбсайтаас шууд нээгдэнэ. PDF файлуудыг энэ аппд хуулж оруулаагүй.'
            : 'The question papers and mark schemes open from the Cambridge website. The PDF files are not copied into the app.'}
        </p>
      </div>

      {sessions.map(session => (
        <div key={session.id} className="space-y-2">
          <div className="text-sm font-black text-slate-900 dark:text-white">{session.label}</div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {ALEVEL_PAPERS.filter(p => p.session === session.id).map(p => (
              <div
                key={p.questionUrl}
                className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
              >
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{p.paper}</span>
                  <span className="text-slate-500 dark:text-slate-400"> · {p.code}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={p.questionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded-lg text-[11px] font-bold text-emerald-800 dark:text-teal-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60"
                  >
                    {mn ? 'Асуулт' : 'Question paper'}
                  </a>
                  <a
                    href={p.markSchemeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded-lg text-[11px] font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  >
                    Mark scheme
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <a
        href={ALEVEL_PAST_PAPERS_PAGE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-teal-300 hover:underline"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        <span>
          {mn
            ? 'Бусад жил (2017 оноос), 10/11 сарын шалгалтыг албан ёсны хуудсаас харах'
            : 'Other years from 2017, and the Oct/Nov sessions: official page'}
        </span>
      </a>
    </section>
  );
};
