import React, { useState } from 'react';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { useApp } from '../context/AppContext';

// The 0620 chapters, compact like the 9701 schedule: one line per chapter with its topics finished. "Details" opens its topics
// (finished ones ticked), and one button plays the chapter's key words in the Words and games page.
export const IgcseChapters: React.FC<{ mn: boolean }> = ({ mn }) => {
  const { stats, setActiveTab } = useApp();
  const [open, setOpen] = useState<string | null>(null);
  const finishedIds = new Set(stats.completedTopics);

  const rows = CURRICULUM_CHAPTERS.map(c => {
    const finished = c.topics.filter(t => finishedIds.has(t.id)).length;
    const status: 'done' | 'started' | 'new' =
      c.topics.length > 0 && finished === c.topics.length ? 'done' : finished > 0 ? 'started' : 'new';
    return { c, finished, total: c.topics.length, status };
  });

  const totalTopics = rows.reduce((n, r) => n + r.total, 0);
  const totalFinished = rows.reduce((n, r) => n + r.finished, 0);
  const pct = totalTopics ? Math.round((totalFinished / totalTopics) * 100) : 0;
  const label = { done: mn ? 'Дууссан' : 'Done', started: mn ? 'Явагдаж буй' : 'In progress', new: mn ? 'Эхлээгүй' : 'Not started' };
  const tone = {
    done: 'text-emerald-700 dark:text-emerald-300',
    started: 'text-slate-700 dark:text-slate-200',
    new: 'text-slate-500 dark:text-slate-400'
  };

  const playChapter = (chapterId: string) => {
    try {
      window.localStorage.setItem('chem_game_focus', chapterId);
    } catch {
      // Storage can be blocked; the game then opens on all topics
    }
    setActiveTab('games');
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
          {mn ? 'IGCSE 0620 · бүлгүүд' : 'IGCSE 0620 · chapters'}
        </div>
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
          {totalFinished} / {totalTopics} {mn ? 'сэдэв' : 'topics'} · {pct}%
        </div>
      </div>

      <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>

      <ul className="divide-y divide-slate-200 dark:divide-slate-800">
        {rows.map(r => {
          const isOpen = open === r.c.id;
          const barPct = r.total ? Math.round((r.finished / r.total) * 100) : 0;
          return (
            <li key={r.c.id} className="py-2.5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex-1 min-w-[12rem] space-y-1">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {r.c.number}. {mn ? r.c.titleMn : r.c.titleEn}
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${barPct}%` }} />
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                  {r.finished} / {r.total}
                </span>
                <span className={`text-xs font-bold ${tone[r.status]}`}>{label[r.status]}</span>
                <button
                  onClick={() => setOpen(isOpen ? null : r.c.id)}
                  aria-expanded={isOpen}
                  className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {isOpen ? (mn ? 'Хаах' : 'Close') : mn ? 'Дэлгэрэнгүй' : 'Details'}
                </button>
              </div>

              {isOpen && (
                <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {r.c.topics.map(t => (
                      <span
                        key={t.id}
                        className={`px-2 py-0.5 rounded-md text-[11px] border ${
                          finishedIds.has(t.id)
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200'
                            : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {finishedIds.has(t.id) ? '✓ ' : ''}
                        {t.number} {mn ? t.titleMn : t.titleEn}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => playChapter(r.c.id)}
                    className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-black"
                  >
                    {mn ? 'Энэ бүлгийн үгсийг тоглож цээжлэх →' : 'Play this chapter’s words →'}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
