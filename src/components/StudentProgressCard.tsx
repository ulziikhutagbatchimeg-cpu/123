import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { courseChapters } from '../data/courseScope';
import { chapterProgress, useSelfCheck, type Level } from '../lib/selfCheck';
import { FoldCard } from './FoldCard';

// A short "My progress" in the lessons sidebar: how far the self-check of the course is (objectives and key words rated, and
// rated "I can"), and a button to the full page (My progress → Progress and rewards). The ratings reach the teacher by
// themselves, so there is nothing to send by hand.
export const StudentProgressCard: React.FC<{ level: Level; dense?: boolean }> = ({ level, dense = false }) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { courseChoice, setActiveTab } = useApp();
  const sc = useSelfCheck();
  const lv: Level = courseChoice === 'igcse' ? level : 'extended';
  const sum = courseChapters(courseChoice).reduce(
    (n, ch) => {
      const p = chapterProgress(ch.topics, sc, lv);
      return {
        lo: { rated: n.lo.rated + p.lo.rated, can: n.lo.can + p.lo.can, total: n.lo.total + p.lo.total },
        kw: { rated: n.kw.rated + p.kw.rated, can: n.kw.can + p.kw.can, total: n.kw.total + p.kw.total }
      };
    },
    { lo: { rated: 0, can: 0, total: 0 }, kw: { rated: 0, can: 0, total: 0 } }
  );
  const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);
  const rows = [
    { label: mn ? 'Сурах зорилт' : 'Learning objectives', t: sum.lo },
    { label: mn ? 'Түлхүүр үг' : 'Key words', t: sum.kw }
  ];

  return (
    <FoldCard
      title={
        <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          {mn ? 'Миний явц' : 'My progress'}
        </span>
      }
      summary={
        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
          ✓ {sum.lo.can + sum.kw.can} / {sum.lo.total + sum.kw.total}
        </span>
      }
      dense={dense}
    >
      <div className="space-y-2.5">
        {rows.map(r => (
          <div key={r.label} className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-[11px] text-slate-600 dark:text-slate-300">
              <span className="font-bold">{r.label}</span>
              <span className="font-mono shrink-0">
                ✓ {r.t.can} / {r.t.total} · {mn ? 'үнэлсэн' : 'rated'} {r.t.rated}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${pct(r.t.can, r.t.total)}%` }} />
            </div>
          </div>
        ))}
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {mn ? 'Таны үнэлгээ багшид автоматаар очдог.' : 'Your ratings reach your teacher by themselves.'}
        </p>
        <button
          type="button"
          onClick={() => setActiveTab('student')}
          className="w-full rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 hover:border-emerald-500 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-200"
        >
          {mn ? 'Бүх дүн, шагнал →' : 'All results and rewards →'}
        </button>
      </div>
    </FoldCard>
  );
};
