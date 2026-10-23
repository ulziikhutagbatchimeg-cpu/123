import React, { useEffect, useReducer, useState } from 'react';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { KEY_TERMS } from '../data/alevelKeyTerms';
import { MASTERY_EVENT, readMastery } from './KeyTermTracker';

// The study schedule of the 9701 chapters. The chapters are spread evenly between the start and the end date, in their
// syllabus order. A chapter is done when every key term is ticked; it is late when its planned date has passed and it is not
// done. The schedule is kept in this browser, and the teacher sets the dates.
const SCHEDULE_KEY = 'alevel-schedule';
const DAY = 24 * 60 * 60 * 1000;

const isoDay = (d: Date) => d.toISOString().slice(0, 10);
const dayValue = (iso: string) => new Date(`${iso}T00:00:00`).getTime();

const readSchedule = (): { start: string; end: string } => {
  const today = new Date();
  const fallback = { start: isoDay(today), end: isoDay(new Date(today.getTime() + 365 * DAY)) };
  try {
    const raw = window.localStorage.getItem(SCHEDULE_KEY);
    return raw ? { ...fallback, ...(JSON.parse(raw) as { start: string; end: string }) } : fallback;
  } catch {
    return fallback;
  }
};

const writeSchedule = (s: { start: string; end: string }) => {
  try {
    window.localStorage.setItem(SCHEDULE_KEY, JSON.stringify(s));
  } catch {
    // Storage can be blocked; the dates then last only for this visit
  }
};

export const AlevelSchedule: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [schedule, setSchedule] = useState(readSchedule);
  // Re-renders when a key term is ticked anywhere on the page
  const [, refresh] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    window.addEventListener(MASTERY_EVENT, refresh);
    return () => window.removeEventListener(MASTERY_EVENT, refresh);
  }, []);
  const mastery = readMastery();
  const chapters = ALEVEL_CHAPTERS.filter(c => (KEY_TERMS[c.id] ?? []).length > 0);
  const start = dayValue(schedule.start);
  const end = dayValue(schedule.end);
  const valid = end > start;
  const span = end - start;
  const now = Date.now();

  const rows = chapters.map((c, i) => {
    const terms = KEY_TERMS[c.id] ?? [];
    const done = (mastery[c.id] ?? []).filter(t => terms.includes(t)).length;
    const planned = valid ? start + (span * (i + 1)) / chapters.length : start;
    const status: 'done' | 'late' | 'on-track' = done === terms.length ? 'done' : now > planned ? 'late' : 'on-track';
    return { c, terms: terms.length, done, planned, status };
  });

  const totalTerms = rows.reduce((n, r) => n + r.terms, 0);
  const totalDone = rows.reduce((n, r) => n + r.done, 0);
  const expectedPct = valid ? Math.min(100, Math.max(0, Math.round(((now - start) / span) * 100))) : 0;
  const actualPct = totalTerms ? Math.round((totalDone / totalTerms) * 100) : 0;
  const label = { done: mn ? 'Дууссан' : 'Done', late: mn ? 'Хоцорсон' : 'Late', 'on-track': mn ? 'Явцтай' : 'On track' };
  const tone = {
    done: 'text-emerald-700 dark:text-emerald-300',
    late: 'text-rose-700 dark:text-rose-300',
    'on-track': 'text-slate-600 dark:text-slate-300'
  };

  const change = (key: 'start' | 'end', value: string) => {
    const next = { ...schedule, [key]: value };
    setSchedule(next);
    writeSchedule(next);
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
        {mn ? 'AS & A Level 9701 · хуваарь' : 'AS & A Level 9701 · schedule'}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
        <label className="flex items-center gap-2">
          {mn ? 'Эхлэх:' : 'Start:'}
          <input type="date" value={schedule.start} onChange={e => change('start', e.target.value)} className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        <label className="flex items-center gap-2">
          {mn ? 'Дуусах:' : 'End:'}
          <input type="date" value={schedule.end} onChange={e => change('end', e.target.value)} className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
      </div>

      {!valid && (
        <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
          {mn ? 'Дуусах огноо эхлэх огнооноос хойш байх ёстой.' : 'The end date must be after the start date.'}
        </p>
      )}

      <p className="text-xs text-slate-700 dark:text-slate-300">
        {mn
          ? `Өнөөдрийн хуваарийн дагуу ~${expectedPct}% байх ёстой. Одоо ${actualPct}% (${totalDone} / ${totalTerms} түлхүүр үг).`
          : `By today's schedule about ${expectedPct}% should be done. You have ${actualPct}% (${totalDone} / ${totalTerms} key terms).`}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <th className="py-2 pr-3 font-bold">{mn ? 'Бүлэг' : 'Chapter'}</th>
              <th className="py-2 pr-3 font-bold">{mn ? 'Түлхүүр үг' : 'Key terms'}</th>
              <th className="py-2 pr-3 font-bold">{mn ? 'Мэдсэн' : 'Ticked'}</th>
              <th className="py-2 pr-3 font-bold">{mn ? 'Төлөвлөсөн' : 'Planned by'}</th>
              <th className="py-2 font-bold">{mn ? 'Төлөв' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.c.id} className="border-b border-slate-100 dark:border-slate-800/70 text-slate-700 dark:text-slate-300">
                <td className="py-2 pr-3 font-bold text-slate-900 dark:text-white">
                  {r.c.number}. {mn ? r.c.titleMn : r.c.titleEn}
                </td>
                <td className="py-2 pr-3 font-mono">{r.terms}</td>
                <td className="py-2 pr-3 font-mono">{r.done}</td>
                <td className="py-2 pr-3 font-mono whitespace-nowrap">{isoDay(new Date(r.planned))}</td>
                <td className={`py-2 font-bold whitespace-nowrap ${tone[r.status]}`}>{label[r.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
