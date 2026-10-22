import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { Level, chapterCounts, statementsAt } from '../data/progressReport';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { FoldCard } from './FoldCard';

interface Props {
  checks: Record<string, boolean>;
  level: Level;
  changedAt: string | null; // last tick
  exportedAt: string | null; // last report saved for the teacher
}

// The student's own progress at the level being viewed, and whether the teacher has the latest ticks
export const StudentProgressCard: React.FC<Props> = ({ checks, level, changedAt, exportedAt }) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';

  const total = statementsAt(level).length;
  const byChapter = chapterCounts(checks, level);
  const done = Object.values(byChapter).reduce((sum, c) => sum + c.done, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;

  // Ticks made after the last saved report have not reached the teacher yet
  const unsent = !!changedAt && (!exportedAt || changedAt > exportedAt);
  const ok = !!exportedAt && !unsent;
  const fmt = (iso: string) =>
    new Date(iso).toLocaleString(mn ? 'mn-MN' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' });

  const status = !exportedAt
    ? mn
      ? 'Багшдаа тайлан хадгалаагүй байна. Хичээлийн доорх "Багшдаа тайлан хадгалах" товчийг дарна уу.'
      : 'You have not saved a report for your teacher yet. Use "Save report for teacher" in the lesson.'
    : unsent
      ? mn
        ? 'Сүүлийн өөрчлөлт багшид хараахан очоогүй байна. Тайлангаа дахин хадгална уу.'
        : 'Your latest ticks have not reached your teacher yet. Save the report again.'
      : mn
        ? `Багшид илгээсэн: ${fmt(exportedAt)}`
        : `Sent to your teacher: ${fmt(exportedAt)}`;

  return (
    <FoldCard
      title={
        <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          {mn ? 'Миний явц' : 'My progress'}
        </span>
      }
      summary={
        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
          {done} / {total}
        </span>
      }
      alert={!ok}
    >
      <div className="space-y-1">
        <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {pct}% · {level === 'core' ? 'Core' : 'Extended'}
        </p>
      </div>

      <div className="space-y-1.5">
        {CURRICULUM_CHAPTERS.map(ch => {
          const c = byChapter[ch.number];
          const p = c.total ? Math.round((c.done / c.total) * 100) : 0;
          return (
            <div
              key={ch.id}
              className="flex items-center gap-2 text-[11px]"
              title={mn ? ch.titleMn : ch.titleEn}
            >
              <span className="w-5 font-mono text-slate-500 dark:text-slate-400 shrink-0">{ch.number}</span>
              <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${p}%` }} />
              </div>
              <span className="w-12 text-right font-mono text-slate-600 dark:text-slate-300 shrink-0">
                {c.done}/{c.total}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className={`flex items-start gap-2 p-3 rounded-xl text-xs border ${
          ok
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
            : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
        }`}
      >
        {ok ? (
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        )}
        <span>{status}</span>
      </div>
    </FoldCard>
  );
};
