import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { HIGHLIGHT_HEADING, HIGHLIGHT_SUB } from '../lib/highlight';
import { courseMistakes } from '../data/courseScope';
import { buildStudentGroups, navGroupBadge } from '../lib/studentMenu';
import { StudentSelfCheck } from './StudentSelfCheck';
import { RewardStrip } from './RewardStrip';
import { WebRating } from './WebRating';
import { ExternalPractice } from './ExternalPractice';
import { SectionSurvey } from './SectionSurvey';

// A block at the top of the student area that the student opens when they choose. Every block starts folded.
// The accent colour sets one block apart from the others, such as the self-check
const FoldBlock: React.FC<{ title: string; accent?: boolean; children: React.ReactNode }> = ({ title, accent, children }) => {
  const [open, setOpen] = useState(false);
  const tone = accent
    ? 'text-violet-700 hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-100'
    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white';
  return (
    <div className="flex h-full flex-col gap-2">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className={`w-full flex items-center justify-between gap-3 px-1 text-left text-xs font-bold uppercase tracking-wider ${tone}`}
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {/* The content fills the block, so blocks side by side end at the same height */}
      {open && <div className="flex flex-1 flex-col [&>*]:flex-1">{children}</div>}
    </div>
  );
};

// The student area as one page: the self-check first, then the tools in three groups. One group is open at a time, as the
// syllabus chapters are, so the student sees one set of tools and is not pulled in several directions.
export const StudentArea: React.FC = () => {
  const { mode } = useLanguage();
  const { programme, mistakes, courseChoice, setActiveTab } = useApp();
  const mn = mode === 'mn';
  const unresolved = courseMistakes(mistakes, courseChoice).filter(m => !m.resolved).length;
  const groups = buildStudentGroups(programme, unresolved);
  // Every group starts folded; the student opens the one they want
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-20">
      {/* Rewards, the site rating and the practice sites sit in one row on a wide screen, and one above another on a phone */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
        <FoldBlock title={mn ? 'Шагналууд' : 'Rewards'}>
          <RewardStrip stacked />
        </FoldBlock>
        <FoldBlock title={mn ? 'Веб сайтын үнэлгээ' : 'Rate this site'}>
          <WebRating />
        </FoldBlock>
        <FoldBlock title={mn ? 'Гадаад дасгал' : 'Practice sites'}>
          <ExternalPractice />
        </FoldBlock>
      </div>
      <FoldBlock title={mn ? 'Хэсгийн асуулга' : 'Section questions'}>
        <SectionSurvey />
      </FoldBlock>
      <div>
        <h2 className={HIGHLIGHT_HEADING}>{mn ? 'Суралцагчийн талбар' : 'Student area'}</h2>
        <p className={`${HIGHLIGHT_SUB} mt-1 max-w-3xl leading-relaxed`}>
          {mn
            ? 'Эхлээд өөрийгөө хянаад, дараа нь хэрэгтэй хэрэгслээ сонгоно уу.'
            : 'Check yourself first, then choose the tool you need.'}
        </p>
      </div>

      <FoldBlock title={mn ? 'Өөрийгөө шалгах' : 'Self-check'} accent>
        <StudentSelfCheck mn={mn} programme={programme} onOpenProgress={() => setActiveTab('curriculum')} />
      </FoldBlock>

      <div className="space-y-3">
        {groups.map(group => {
          const open = openGroup === group.id;
          const badge = navGroupBadge(group);
          return (
            <section
              key={group.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenGroup(open ? null : group.id)}
                aria-expanded={open}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <span className="text-sm font-bold text-slate-900 dark:text-white">{mn ? group.titleMn : group.titleEn}</span>
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  {!open && badge > 0 && (
                    <span className="px-1.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">{badge}</span>
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                </span>
              </button>

              {open && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-4 pb-4">
                  {group.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-emerald-400 dark:hover:border-teal-500/60 text-left transition-colors"
                    >
                      <span className="mt-0.5 shrink-0 text-emerald-700 dark:text-teal-300">{item.icon}</span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                          {mn ? item.labelMn : item.labelEn}
                          {item.badge !== undefined && (
                            <span className="px-1.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">{item.badge}</span>
                          )}
                        </span>
                        <span className="block text-[11px] text-slate-600 dark:text-slate-400 leading-snug mt-0.5">
                          {mn ? item.descMn : item.descEn}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};
