import type { Checklist } from './chapterChecklist';

// The IGCSE 0620 study schedule, the same idea as the 9701 one (lib/alevelSchedule): the student sets a start and an end
// date, the chapters are spread evenly between them in syllabus order, and a chapter whose planned date has passed while it
// is not done is late (Zimmerman's forethought: strategic planning against time). A chapter is done by the checklist's own
// rule (lib/chapterChecklist): every lesson's exit ticket above 60%, every end-of-topic test above 60%, and every objective
// and key word rated, so a Core student is counted on the Core lessons and objectives. The dates are kept on this device and
// go to the teacher with the summary, so the teacher sees the same late chapters.
export const IGCSE_SCHEDULE_KEY = 'igcse-schedule';
const DAY = 24 * 60 * 60 * 1000;

export interface Schedule {
  start: string; // YYYY-MM-DD
  end: string;
}

export type PlanStatus = 'done' | 'late' | 'on-track';

export interface ChapterPlanRow {
  done: number; // the chapter's checklist items done
  total: number;
  planned: number; // the planned end date of the chapter, in milliseconds
  status: PlanStatus;
}

export interface ChecklistPlan {
  valid: boolean; // the end date is after the start date
  rows: Record<string, ChapterPlanRow>; // by chapter id
  late: number; // chapters late
  actualPct: number; // checklist items done, as a share of all
  expectedPct: number; // how far through the schedule today is
}

const isoDay = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dayValue = (iso: string): number => new Date(`${iso}T00:00:00`).getTime();

// The saved dates; at first, from today to two years on (the length of the 0620 course)
export const readIgcseSchedule = (): Schedule => {
  const today = new Date();
  const fallback = { start: isoDay(today), end: isoDay(new Date(today.getTime() + 2 * 365 * DAY)) };
  try {
    const raw = window.localStorage.getItem(IGCSE_SCHEDULE_KEY);
    return raw ? { ...fallback, ...(JSON.parse(raw) as Schedule) } : fallback;
  } catch {
    return fallback;
  }
};

// Whether the student has set the dates themself (only then do they go to the teacher)
export const hasIgcseSchedule = (): boolean => {
  try {
    return !!window.localStorage.getItem(IGCSE_SCHEDULE_KEY);
  } catch {
    return false;
  }
};

export const IGCSE_SCHEDULE_EVENT = 'chem-igcse-schedule-changed';
export const writeIgcseSchedule = (s: Schedule) => {
  try {
    window.localStorage.setItem(IGCSE_SCHEDULE_KEY, JSON.stringify(s));
  } catch {
    // Storage can be blocked; the dates then last only for this visit
  }
  window.dispatchEvent(new Event(IGCSE_SCHEDULE_EVENT));
};

// The schedule against the checklist: each chapter's planned date and status, and the totals. The teacher's record reads the
// same function with the checklist the student's browser sent.
export const checklistPlan = (checklist: Checklist, schedule: Schedule, now: number): ChecklistPlan => {
  const chapters = checklist.chapters.filter(c => c.total > 0);
  const start = dayValue(schedule.start);
  const end = dayValue(schedule.end);
  const valid = end > start;
  const span = end - start;
  const rows: Record<string, ChapterPlanRow> = {};
  chapters.forEach((c, i) => {
    const planned = valid ? start + (span * (i + 1)) / chapters.length : start;
    const status: PlanStatus = c.status === 'done' ? 'done' : now > planned ? 'late' : 'on-track';
    rows[c.chapterId] = { done: c.done, total: c.total, planned, status };
  });
  const done = chapters.reduce((n, c) => n + c.done, 0);
  const total = chapters.reduce((n, c) => n + c.total, 0);
  return {
    valid,
    rows,
    late: Object.values(rows).filter(r => r.status === 'late').length,
    actualPct: total ? Math.round((done / total) * 100) : 0,
    expectedPct: valid ? Math.min(100, Math.max(0, Math.round(((now - start) / span) * 100))) : 0
  };
};

export const planDay = (time: number): string => isoDay(new Date(time));
