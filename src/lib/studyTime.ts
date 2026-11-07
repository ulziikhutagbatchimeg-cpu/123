import { useEffect, useState } from 'react';
import type { CourseChoice } from '../context/AppContext';

// The time a student spends on a chapter and on a lesson. It is counted while the page is open, the tab is visible and the
// student has clicked, typed or scrolled in the last few minutes. It is kept on this browser, saved about once a minute, and
// sent to the teacher with the results, so the teacher sees it per student, per chapter and per lesson.
export interface StudyEntry {
  course: CourseChoice;
  chapterId: string;
  lessonId: string | null; // null: the time with the chapter open (its slides, key words and concept maps included)
  lessonTitle?: { en: string; mn: string };
  seconds: number;
}

export interface StudyTarget {
  course: CourseChoice;
  chapterId: string;
  lessonId: string | null;
  lessonTitle?: { en: string; mn: string };
  enabled?: boolean; // false: nothing is counted (for example, a lesson picker with no lesson on show)
}

const KEY = 'chem_study_time';
const EVENT = 'chem-study-changed';
const TICK_SECONDS = 10; // the time counted each tick
const IDLE_MS = 3 * 60 * 1000; // no click, key or scroll for this long: the time stops counting
const SAVE_MS = 60 * 1000; // the counted time is saved this often

const entryKey = (course: CourseChoice, chapterId: string, lessonId: string | null) => `${course}|${chapterId}|${lessonId ?? ''}`;

const readStudy = (): Record<string, StudyEntry> => {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, StudyEntry>) : {};
  } catch {
    return {};
  }
};

// The time counted since the last save, by entry key; saved in one go
const pending = new Map<string, StudyEntry>();
let saveTimer: number | null = null;
let lastActivity = Date.now();
let listening = false;

const flush = () => {
  if (saveTimer !== null) {
    window.clearTimeout(saveTimer);
    saveTimer = null;
  }
  if (pending.size === 0) return;
  const stored = readStudy();
  pending.forEach((entry, key) => {
    stored[key] = { ...entry, seconds: (stored[key]?.seconds ?? 0) + entry.seconds };
  });
  pending.clear();
  try {
    window.localStorage.setItem(KEY, JSON.stringify(stored));
  } catch {
    // Storage can be blocked; the time then lasts only for this visit
  }
  window.dispatchEvent(new Event(EVENT));
};

const addTime = (target: Omit<StudyEntry, 'seconds'>, seconds: number) => {
  const key = entryKey(target.course, target.chapterId, target.lessonId);
  pending.set(key, { ...target, seconds: (pending.get(key)?.seconds ?? 0) + seconds });
  if (saveTimer === null) saveTimer = window.setTimeout(flush, SAVE_MS);
};

// Records when the student last clicked, typed or scrolled, and saves the time when the page is left
const listenForActivity = () => {
  if (listening) return;
  listening = true;
  const note = () => {
    lastActivity = Date.now();
  };
  const options: AddEventListenerOptions = { capture: true, passive: true };
  ['pointerdown', 'keydown', 'scroll', 'touchstart', 'wheel'].forEach(name => document.addEventListener(name, note, options));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
  window.addEventListener('pagehide', flush);
};

// Counts the time with this chapter, or this lesson of it, on show. Nothing is counted while the tab is hidden or the student is idle.
export const useStudyTime = ({ course, chapterId, lessonId, lessonTitle, enabled = true }: StudyTarget) => {
  useEffect(() => {
    if (!enabled) return;
    listenForActivity();
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      if (Date.now() - lastActivity > IDLE_MS) return;
      addTime({ course, chapterId, lessonId, lessonTitle }, TICK_SECONDS);
    }, TICK_SECONDS * 1000);
    return () => {
      window.clearInterval(id);
      flush();
    };
    // The title is a constant of the lesson data, so it is kept out of the dependencies by its identity
  }, [course, chapterId, lessonId, lessonTitle, enabled]);
};

// The saved study time, kept up to date when it is saved
export const useStudyRecords = (): StudyEntry[] => {
  const [records, setRecords] = useState<StudyEntry[]>(() => Object.values(readStudy()));
  useEffect(() => {
    const refresh = () => setRecords(Object.values(readStudy()));
    window.addEventListener(EVENT, refresh);
    return () => window.removeEventListener(EVENT, refresh);
  }, []);
  return records;
};
