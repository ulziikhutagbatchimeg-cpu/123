import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { KEY_TERMS } from '../data/alevelKeyTerms';
import { chapterLevel, isVisibleFor, topicsWithoutChapter, type AlevelCourse, type SyllabusTopic } from '../data/alevelSyllabus';

// The 9701 study schedule. The chapters are spread evenly between the start and end date, in syllabus order. A chapter is done
// when every key term is ticked; it is late when its planned date has passed and it is not done.
export const SCHEDULE_KEY = 'alevel-schedule';
const DAY = 24 * 60 * 60 * 1000;

export interface Schedule {
  start: string; // YYYY-MM-DD
  end: string;
}

export type PlanStatus = 'done' | 'late' | 'on-track';

export interface PlanRow {
  done: number; // key terms ticked
  total: number; // key terms in the chapter
  planned: number; // the planned date, in milliseconds
  status: PlanStatus;
}

export interface AlevelPlan {
  valid: boolean; // the end date is after the start date
  rows: Record<string, PlanRow>; // by chapter id, for the chapters that have key terms
  totalDone: number;
  totalTerms: number;
  actualPct: number; // key terms ticked, as a share of all
  expectedPct: number; // how far through the schedule today is
}

export const isoDay = (d: Date): string => d.toISOString().slice(0, 10);
const dayValue = (iso: string): number => new Date(`${iso}T00:00:00`).getTime();

export const readSchedule = (): Schedule => {
  const today = new Date();
  const fallback = { start: isoDay(today), end: isoDay(new Date(today.getTime() + 365 * DAY)) };
  try {
    const raw = window.localStorage.getItem(SCHEDULE_KEY);
    return raw ? { ...fallback, ...(JSON.parse(raw) as Schedule) } : fallback;
  } catch {
    return fallback;
  }
};

export const writeSchedule = (s: Schedule) => {
  try {
    window.localStorage.setItem(SCHEDULE_KEY, JSON.stringify(s));
  } catch {
    // Storage can be blocked; the dates then last only for this visit
  }
};

// The schedule and the key terms ticked so far, for the chapters of the chosen level
export const alevelPlan = (course: AlevelCourse, schedule: Schedule, mastery: Record<string, string[]>, now: number): AlevelPlan => {
  const chapters = ALEVEL_CHAPTERS.filter(c => (KEY_TERMS[c.id] ?? []).length > 0 && isVisibleFor(chapterLevel(c.id), course));
  const start = dayValue(schedule.start);
  const end = dayValue(schedule.end);
  const valid = end > start;
  const span = end - start;
  const rows: Record<string, PlanRow> = {};
  chapters.forEach((c, i) => {
    const terms = KEY_TERMS[c.id] ?? [];
    const done = (mastery[c.id] ?? []).filter(t => terms.includes(t)).length;
    const planned = valid ? start + (span * (i + 1)) / chapters.length : start;
    const status: PlanStatus = done === terms.length ? 'done' : now > planned ? 'late' : 'on-track';
    rows[c.id] = { done, total: terms.length, planned, status };
  });
  const totalDone = Object.values(rows).reduce((n, r) => n + r.done, 0);
  const totalTerms = Object.values(rows).reduce((n, r) => n + r.total, 0);
  return {
    valid,
    rows,
    totalDone,
    totalTerms,
    actualPct: totalTerms ? Math.round((totalDone / totalTerms) * 100) : 0,
    expectedPct: valid ? Math.min(100, Math.max(0, Math.round(((now - start) / span) * 100))) : 0
  };
};

// The syllabus topics of the level that have no chapter with key terms in the app yet
export const alevelUncovered = (course: AlevelCourse): SyllabusTopic[] => {
  const covered = ALEVEL_CHAPTERS.filter(c => (KEY_TERMS[c.id] ?? []).length > 0).map(c => c.number);
  return topicsWithoutChapter(course, covered);
};
