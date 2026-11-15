import { useEffect, useState } from 'react';
import type { CourseChoice } from '../context/AppContext';

// The weekly look back, which closes the student's cycle (Zimmerman: what the self-reflection phase finds feeds the next
// forethought phase). Once a week, on the first visit of the week after some study in the last seven days, Home asks three
// short questions: what went well, what was hard (the topic most missed in the mistake notebook is offered first), and what
// to do differently in the next seven days. That last answer then stands above today's goal all week, as the student's own
// decision. The theory's names stay in the code and on the teacher's pages; the student sees plain words only.
// The answers are kept on this device and go to the teacher with the programme's summary (lib/resultSync).

export type GoodId = 'regular' | 'tickets' | 'mistakes' | 'understood';
export type HardId = 'topic' | 'time' | 'focus' | 'none';
export type NextId = 'daily' | 'mistakes' | 'slides' | 'ask';

type Bi = { en: string; mn: string };

export const GOOD_TEXT: Record<GoodId, Bi> = {
  regular: { mn: 'Тогтмол суралцсан', en: 'I studied regularly' },
  tickets: { mn: 'Гарах билетээ сайн өгсөн', en: 'My exit tickets went well' },
  mistakes: { mn: 'Алдаагаа зассан', en: 'I fixed my mistakes' },
  understood: { mn: 'Хэцүү сэдвийг ойлгосон', en: 'I understood a hard topic' }
};
export const HARD_TEXT: Record<HardId, Bi> = {
  topic: { mn: 'Нэг сэдвийг ойлгох', en: 'Understanding a topic' },
  time: { mn: 'Цаг гаргах', en: 'Finding the time' },
  focus: { mn: 'Анхаарлаа төвлөрүүлэх', en: 'Keeping my focus' },
  none: { mn: 'Хэцүү зүйл байгаагүй', en: 'Nothing was hard' }
};
export const NEXT_TEXT: Record<NextId, Bi> = {
  daily: { mn: 'Өдөр бүр бага багаар хийнэ', en: 'Do a little every day' },
  mistakes: { mn: 'Алдаагаа давтана', en: 'Go over my mistakes' },
  slides: { mn: 'Гарах билетийн өмнө слайдаа дахин үзнэ', en: 'Look at the slides again before each exit ticket' },
  ask: { mn: 'Ойлгоогүйгээ багшаас асууна', en: 'Ask my teacher what I do not understand' }
};

export interface WeekReflection {
  id: string;
  course: CourseChoice;
  week: string; // the Monday of the week it was given, as YYYY-MM-DD
  at: number; // when it was given, in milliseconds since 1970
  skipped?: boolean; // the student pressed Skip: nothing else is set, and the week is not asked again
  good?: GoodId;
  hard?: HardId;
  hardTopic?: { id: string; label: Bi }; // the topic, when the hard part was a topic of the mistake notebook
  next?: NextId;
  note?: string; // the student's own words for the next seven days, when they wrote any (optional, short)
}

const KEY = 'chem_week_reflections';
const CAP = 120;
const EVENT = 'chem-week-reflections-changed';
const SUMMARY_CAP = 60; // the newest of a programme sent with its summary; the teacher's copy is merged by id
export const NOTE_MAX = 140;

// The Monday of the week that holds a time, as YYYY-MM-DD in the student's own time zone (written out here, not taken from
// lib/resultSync, which reads this file)
export const weekOf = (time: number): string => {
  const d = new Date(time);
  const m = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7));
  return `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}-${String(m.getDate()).padStart(2, '0')}`;
};

const read = (): WeekReflection[] => {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as WeekReflection[]) : [];
  } catch {
    return [];
  }
};

// Saves this week's answers (or the skip) for a programme, in place of any given earlier this week
export const saveWeekReflection = (entry: Omit<WeekReflection, 'id' | 'at' | 'week'>) => {
  const now = Date.now();
  const week = weekOf(now);
  const record = JSON.parse(
    JSON.stringify({ ...entry, note: entry.note?.trim().slice(0, NOTE_MAX) || undefined, id: `wk-${entry.course}-${week}`, week, at: now })
  ) as WeekReflection;
  const rest = read().filter(r => !(r.course === entry.course && r.week === week));
  try {
    window.localStorage.setItem(KEY, JSON.stringify([record, ...rest].slice(0, CAP)));
  } catch {
    // Storage can be blocked; the questions then come back on the next visit, which is harmless
  }
  window.dispatchEvent(new Event(EVENT));
};

// The saved answers, kept up to date while the page is open
export const useWeekReflections = (): WeekReflection[] => {
  const [records, setRecords] = useState<WeekReflection[]>(read);
  useEffect(() => {
    const refresh = () => setRecords(read());
    window.addEventListener(EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);
  return records;
};

// This week's answers (or skip) of a programme, if given
export const thisWeekOf = (records: WeekReflection[], course: CourseChoice): WeekReflection | undefined =>
  records.find(r => r.course === course && r.week === weekOf(Date.now()));

// The decision that stands this week: this week's answer to "what will you do differently", else last week's, so a
// student who has not looked back yet this week still sees what they decided last time
export const standingDecision = (records: WeekReflection[], course: CourseChoice): WeekReflection | undefined => {
  const now = weekOf(Date.now());
  const last = weekOf(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return records.find(r => r.course === course && !r.skipped && !!r.next && (r.week === now || r.week === last));
};

// The newest answers of one programme, keyed by id, as the summary carries them to the teacher
export const weekReflectionsOf = (records: WeekReflection[], course: CourseChoice): Record<string, WeekReflection> =>
  Object.fromEntries(
    records
      .filter(r => r.course === course)
      .slice(0, SUMMARY_CAP)
      .map(r => [r.id, r] as const)
  );
