import { createContext, useEffect, useState } from 'react';
import { keepValue, KEPT_RESTORED } from './accountCopy';
import type { GlossaryTerm } from '../data/statesLessonSupport';

// What a student has to finish in a lesson before its later steps and its exit ticket open: the prediction, each scored
// simulation, the quick check and the practice set. Each "done" mark is kept like the answers (on this device and on the
// account), and it stays once earned, so doing a part again never closes the steps after it.

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
export const practiceDoneKey = (lessonId: string) => `chem_done_practice_${lessonId}`;

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
