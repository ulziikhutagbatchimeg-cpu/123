import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { courseMistakes } from '../data/courseScope';
import { buildStudentGroups, navGroupBadge } from '../lib/studentMenu';
import { StudentSelfCheck } from './StudentSelfCheck';
import { RewardStrip } from './RewardStrip';
import { WebRating } from './WebRating';

// The student area as one page: the self-check first, then the tools in three groups. One group is open at a time, as the
// syllabus chapters are, so the student sees one set of tools and is not pulled in several directions.
export const StudentArea: React.FC = () => {
  const { mode } = useLanguage();
  const { programme, mistakes, courseChoice, setActiveTab } = useApp();
  const mn = mode === 'mn';
  const unresolved = courseMistakes(mistakes, courseChoice).filter(m => !m.resolved).length;
  const groups = buildStudentGroups(programme, unresolved);
  const [openGroup, setOpenGroup] = useState<string | null>(groups[0]?.id ?? null);

  return (
    <div className="space-y-6 pb-20">
      <RewardStrip />
      <WebRating />
      <div>
        <h2 className="text-lg font-black text-slate-900 dark:text-white">{mn ? 'Суралцагчийн талбар' : 'Student area'}</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          {mn
            ? 'Эхлээд өөрийгөө хянаад, дараа нь хэрэгтэй хэрэгслээ сонгоно уу.'
            : 'Check yourself first, then choose the tool you need.'}
        </p>
      </div>

      <StudentSelfCheck mn={mn} programme={programme} onOpenProgress={() => setActiveTab('curriculum')} />

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
