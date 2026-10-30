import { useEffect, useState } from 'react';
import type { CourseChoice } from '../context/AppContext';

// The results a student earns outside the question bank: lesson exit tickets, the games, the escape room and the practice
// sets. Answered questions and full tests are already kept by the app, so the student's own check reads those from there.
export type ActivityKind = 'exit' | 'game' | 'escape' | 'practice';

export interface ActivityRecord {
  id: string;
  kind: ActivityKind;
  course: CourseChoice;
  takenAt: number; // when the result was saved, in milliseconds since 1970
  percent: number; // the result out of 100
  label: { en: string; mn: string }; // what was done, in both languages
}

const KEY = 'chem_activity';
const CAP = 1000; // the newest results kept
const EVENT = 'chem-activity-changed';

const readActivity = (): ActivityRecord[] => {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ActivityRecord[]) : [];
  } catch {
    return [];
  }
};

// Saves one finished result, newest first, and tells the open views to show it
export const recordActivity = (entry: Omit<ActivityRecord, 'id' | 'takenAt'>) => {
  const record: ActivityRecord = {
    ...entry,
    id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    takenAt: Date.now()
  };
  try {
    window.localStorage.setItem(KEY, JSON.stringify([record, ...readActivity()].slice(0, CAP)));
  } catch {
    // Storage can be blocked; this result then is not kept
  }
  window.dispatchEvent(new Event(EVENT));
};

// The saved results, kept up to date while the page is open
export const useActivity = (): ActivityRecord[] => {
  const [records, setRecords] = useState<ActivityRecord[]>(readActivity);
  useEffect(() => {
    const refresh = () => setRecords(readActivity());
    window.addEventListener(EVENT, refresh);
    return () => window.removeEventListener(EVENT, refresh);
  }, []);
  return records;
};

export type Period = 'day' | 'week' | 'month';

// How many days, weeks or months the activity graph shows, the newest last
const PERIOD_COUNT: Record<Period, number> = { day: 30, week: 12, month: 12 };

// The first moment of the day, of the week (from Monday) or of the month that holds the given time
const periodStart = (time: number, period: Period): Date => {
  const d = new Date(time);
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (period === 'week') start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  if (period === 'month') start.setDate(1);
  return start;
};

// The period that lies `by` periods away from the given start
const shiftPeriod = (start: Date, period: Period, by: number): Date => {
  const next = new Date(start);
  if (period === 'day') next.setDate(next.getDate() + by);
  else if (period === 'week') next.setDate(next.getDate() + 7 * by);
  else next.setMonth(next.getMonth() + by);
  return next;
};

export interface PeriodBucket<K extends string> {
  start: Date; // the first moment of the period
  total: number;
  counts: Record<K, number>;
}

// Counts the events of each day, week or month of the graph, oldest first, up to the current period
export const periodBuckets = <K extends string>(
  events: { takenAt: number; kind: K }[],
  period: Period,
  kinds: K[]
): PeriodBucket<K>[] => {
  const current = periodStart(Date.now(), period);
  const buckets: PeriodBucket<K>[] = [];
  for (let back = PERIOD_COUNT[period] - 1; back >= 0; back--) {
    buckets.push({
      start: shiftPeriod(current, period, -back),
      total: 0,
      counts: Object.fromEntries(kinds.map(k => [k, 0])) as Record<K, number>
    });
  }
  const index = new Map(buckets.map((b, i) => [b.start.getTime(), i]));
  for (const event of events) {
    const i = index.get(periodStart(event.takenAt, period).getTime());
    if (i === undefined) continue;
    buckets[i].counts[event.kind] += 1;
    buckets[i].total += 1;
  }
  return buckets;
};
