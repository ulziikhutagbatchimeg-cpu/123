import React, { useEffect, useReducer, useState } from 'react';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { KEY_TERMS } from '../data/alevelKeyTerms';
import { useApp } from '../context/AppContext';
import { MASTERY_EVENT, readMastery } from './KeyTermTracker';
import { LevelBadge } from './LevelBadge';
import { alevelCourse, chapterLevel, isVisibleFor, topicsWithoutChapter } from '../data/alevelSyllabus';

// The study schedule of the 9701 chapters, kept compact: one line per chapter. The chapters are spread evenly between the
// start and the end date, in their syllabus order. A chapter is done when every key term is ticked; it is late when its planned
// date has passed and it is not done. "Details" opens that chapter's key terms, and one button plays them.
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
  const { setActiveTab, courseChoice } = useApp();
  // AS students see the AS topics; A Level students see every topic
  const course = alevelCourse(courseChoice);
  // The topics that already have a chapter with key terms; the rest of the course's topics are still to come
  const coveredTopics = ALEVEL_CHAPTERS.filter(c => (KEY_TERMS[c.id] ?? []).length > 0).map(c => c.number);
  const [schedule, setSchedule] = useState(readSchedule);
  const [open, setOpen] = useState<string | null>(null);
  // Re-renders when a key term is ticked anywhere on the page
  const [, refresh] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    window.addEventListener(MASTERY_EVENT, refresh);
    return () => window.removeEventListener(MASTERY_EVENT, refresh);
  }, []);
  const mastery = readMastery();
  const chapters = ALEVEL_CHAPTERS.filter(c => (KEY_TERMS[c.id] ?? []).length > 0 && isVisibleFor(chapterLevel(c.id), course));
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
    return { c, terms, done, planned, status };
  });

  const totalTerms = rows.reduce((n, r) => n + r.terms.length, 0);
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
          {course === 'a'
            ? (mn ? 'A Level 9701 · хуваарь' : 'A Level 9701 · schedule')
            : (mn ? 'AS Level 9701 · хуваарь' : 'AS Level 9701 · schedule')}
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <input type="date" value={schedule.start} onChange={e => change('start', e.target.value)} aria-label={mn ? 'Эхлэх' : 'Start'} className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          <span>→</span>
          <input type="date" value={schedule.end} onChange={e => change('end', e.target.value)} aria-label={mn ? 'Дуусах' : 'End'} className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </div>
      </div>

      {!valid && (
        <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
          {mn ? 'Дуусах огноо эхлэх огнооноос хойш байх ёстой.' : 'The end date must be after the start date.'}
        </p>
      )}

      {/* One bar: the filled part is what is done; the marker is where the schedule says you should be */}
      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex flex-wrap justify-between gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>
            {mn ? 'Одоо' : 'Now'}: {actualPct}% · {totalDone} / {totalTerms}
          </span>
          <span>
            {mn ? 'Хуваарийн дагуу' : 'By schedule'}: ~{expectedPct}%
          </span>
        </div>
        <div className="relative h-2.5 rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="absolute inset-y-0 left-0 rounded-full bg-emerald-500" style={{ width: `${actualPct}%` }} />
          <div className="absolute -top-1 h-4 w-0.5 bg-slate-900 dark:bg-white" style={{ left: `${expectedPct}%` }} />
        </div>
      </div>

      <ul className="divide-y divide-slate-200 dark:divide-slate-800">
        {rows.map(r => {
          const isOpen = open === r.c.id;
          const known = new Set(mastery[r.c.id] ?? []);
          const pct = r.terms.length ? Math.round((r.done / r.terms.length) * 100) : 0;
          return (
            <li key={r.c.id} className="py-2.5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex-1 min-w-[12rem] space-y-1">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {r.c.number}. {mn ? r.c.titleMn : r.c.titleEn}
                    <LevelBadge level={chapterLevel(r.c.id)} />
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                  {r.done} / {r.terms.length}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{isoDay(new Date(r.planned))}</span>
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
                    {r.terms.map(t => (
                      <span
                        key={t}
                        className={`px-2 py-0.5 rounded-md text-[11px] border ${
                          known.has(t)
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200'
                            : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {known.has(t) ? '✓ ' : ''}
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => playChapter(r.c.id)}
                    className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-black"
                  >
                    {mn ? 'Энэ бүлгийг тоглож цээжлэх →' : 'Play this chapter to memorise →'}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Syllabus topics of this course that have no chapter in the app yet */}
      {topicsWithoutChapter(course, coveredTopics).length > 0 && (
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {mn ? 'Syllabus-ийн сэдэв, хичээл хараахан байхгүй' : 'Syllabus topics with no lesson in the app yet'}
          </div>
          <ul className="space-y-1">
            {topicsWithoutChapter(course, coveredTopics).map(t => (
              <li key={t.number} className="text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-2">
                <span className="font-mono">{t.number}.</span>
                <span>{mn ? t.titleMn : t.titleEn}</span>
                <LevelBadge level={t.level} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
