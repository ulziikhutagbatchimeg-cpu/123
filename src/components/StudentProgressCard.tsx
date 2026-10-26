import React, { useEffect, useReducer } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { Level, chapterCounts, statementsAt } from '../data/progressReport';
import { KEY_TERMS } from '../data/alevelKeyTerms';
import { alevelCourse, chapterLevel, isVisibleFor } from '../data/alevelSyllabus';
import type { LeitnerCard } from '../types/chemistry';
import { MASTERY_EVENT, readMastery } from './KeyTermTracker';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { FoldCard } from './FoldCard';

interface Props {
  checks: Record<string, boolean>;
  level: Level;
  changedAt: string | null; // last tick
  exportedAt: string | null; // last report saved for the teacher
  leitnerCards: LeitnerCard[]; // the 0620 key-word flashcards and their boxes
}

// The student's own progress at the level being viewed, and whether the teacher has the latest ticks
export const StudentProgressCard: React.FC<Props> = ({ checks, level, changedAt, exportedAt, leitnerCards }) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';

  // The 9701 key-term ticks are changed on the lesson page, so this card is told when they change
  const [, refresh] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    window.addEventListener(MASTERY_EVENT, refresh);
    return () => window.removeEventListener(MASTERY_EVENT, refresh);
  }, []);

  const { programme, courseChoice } = useApp();
  // Key words mastered: a 0620 flashcard in box 4 or 5, and a 9701 key term ticked as explained
  const igcseWords = leitnerCards.length;
  const igcseMastered = leitnerCards.filter(c => c.box >= 4).length;
  const mastery = readMastery();
  // 9701 key terms of the chosen level: AS students count the AS topics only
  const visibleTerms = Object.entries(KEY_TERMS).filter(([id]) => isVisibleFor(chapterLevel(id), alevelCourse(courseChoice)));
  const alevelTerms = visibleTerms.reduce((n, [, list]) => n + list.length, 0);
  const alevelMastered = visibleTerms.reduce((n, [id, list]) => n + (mastery[id] ?? []).filter(t => list.includes(t)).length, 0);
  // Only the course being studied: the 0620 flashcards for IGCSE, the 9701 key terms for A Level
  const wordRows = [
    { programme: 'igcse', label: mn ? '0620 түлхүүр үг (карт, 4–5 хайрцаг)' : '0620 key words (cards in box 4–5)', done: igcseMastered, total: igcseWords },
    { programme: 'alevel', label: mn ? '9701 түлхүүр үг (тайлбарлаж чадсан)' : '9701 key terms (explained)', done: alevelMastered, total: alevelTerms }
  ].filter(row => row.programme === programme);

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

      <div className="space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {mn ? 'Түлхүүр үгийн эзэмшил' : 'Key-word mastery'}
        </div>
        {wordRows.map(row => (
          <div key={row.label} className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-[11px] text-slate-600 dark:text-slate-300">
              <span>{row.label}</span>
              <span className="font-mono shrink-0">
                {row.done} / {row.total}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-violet-500 transition-all duration-300"
                style={{ width: `${row.total ? Math.round((row.done / row.total) * 100) : 0}%` }}
              />
            </div>
          </div>
        ))}
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
