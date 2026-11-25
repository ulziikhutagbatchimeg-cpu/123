import { createContext, useEffect, useState } from 'react';
import { keepValue, KEPT_RESTORED } from './accountCopy';
import type { GlossaryTerm } from '../data/statesLessonSupport';

// What a student has to finish in a lesson before its later steps and its exit ticket open: the prediction, the quick check
// and at least PRACTICE_MIN tasks of the practice set. The lesson's simulation, the whole practice set and the chapter's
// self-check are not required: each one done earns BONUS_POINTS (lib/chapterChecklist counts them). Each "done" mark is kept
// like the answers (on this device and on the account), and it stays once earned, so doing a part again never closes the
// steps after it.

type Bi = { en: string; mn: string };

// A part of the lesson that must be done before the steps after `step` (0-based) open
export interface GateItem {
  id: string;
  step: number;
  done: boolean;
  label: Bi;
}

const DONE_EVENT = 'chem-done-changed';
export const labDoneKey = (lessonId: string, index: number) => `chem_done_lab_${lessonId}_${index}`;
// Marked once at least PRACTICE_MIN tasks of the practice set are done (or all of them, in a shorter set)
export const practiceDoneKey = (lessonId: string) => `chem_done_practice_${lessonId}`;
// Marked once every task of the practice set is done: a bonus
export const practiceAllKey = (lessonId: string) => `chem_done_practiceall_${lessonId}`;
export const PRACTICE_MIN = 3;
export const BONUS_POINTS = 10;
// The practice a lesson asks for, as a step label: at least PRACTICE_MIN tasks, or every task of a shorter set
export const practiceLabel = (count: number, step?: number): Bi => {
  const n = Math.min(PRACTICE_MIN, count);
  const at = step ? { mn: ` (${step}-р алхам)`, en: ` (step ${step})` } : { mn: '', en: '' };
  return count > PRACTICE_MIN
    ? { mn: `Бие даах дасгалаас дор хаяж ${n} даалгавар хийх${at.mn}`, en: `Do at least ${n} practice tasks${at.en}` }
    : { mn: `Бие даах дасгалыг хийх${at.mn}`, en: `Do the practice${at.en}` };
};

const readDone = (key: string): boolean => {
  try {
    return window.localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
};

export const markDone = (key: string) => {
  if (readDone(key)) return;
  keepValue(key, '1');
  window.dispatchEvent(new Event(DONE_EVENT));
};

// Whether each key is marked done, read again when a mark is made and when the account copy comes back
export const useDoneFlags = (keys: string[]): Record<string, boolean> => {
  const joined = keys.join('|');
  const read = () => Object.fromEntries(keys.map(k => [k, readDone(k)]));
  const [flags, setFlags] = useState<Record<string, boolean>>(read);
  useEffect(() => {
    const again = () => setFlags(read());
    again();
    window.addEventListener(DONE_EVENT, again);
    window.addEventListener(KEPT_RESTORED, again);
    return () => {
      window.removeEventListener(DONE_EVENT, again);
      window.removeEventListener(KEPT_RESTORED, again);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined]);
  return flags;
};

// The first part still to do before step b, or undefined when step b is open
export const missingBefore = (gate: GateItem[], b: number): GateItem | undefined => gate.find(g => g.step < b && !g.done);

// Whether a step's expected answers (the evidence of the lesson plan) may show to the student: once the work of that step is
// done. Steps 1 and 2 (0, 1) wait for the prediction, step 3 for the quick check, step 4 for the practice, the last step for the
// exit ticket. The teacher and lessons already passed (free) see them at once; full access opens the steps, not the answers.
export const stepCheckOpen =
  (s: { free: boolean; prediction: boolean; quick: boolean; practice: boolean; exitTaken: boolean }) =>
  (step: number): boolean =>
    s.free || (step <= 1 ? s.prediction : step === 2 ? s.quick : step === 3 ? s.practice : s.exitTaken);

// A lesson gives each simulation a way to say it has been submitted and scored (components/LabFrame.tsx calls it)
export const LabScoredContext = createContext<(() => void) | null>(null);

// The key words of a lesson that a question names, so each question says what it is about. A term is found by its English
// name or by its Mongolian name (the part before any bracket), in the question, its options or its explanation.
export const termsIn = (texts: Bi[], glossary: GlossaryTerm[]): GlossaryTerm[] => {
  const hay = texts.map(t => `${t.en} ${t.mn}`).join(' ').toLowerCase();
  const names = (g: GlossaryTerm) =>
    [g.term.en, g.term.mn.split('(')[0], (g.term.mn.match(/\(([^)]+)\)/) ?? [])[1] ?? '']
      .map(s => s.trim().toLowerCase())
      .filter(s => s.length >= 3);
  return glossary.filter(g => names(g).some(n => hay.includes(n))).slice(0, 4);
};
