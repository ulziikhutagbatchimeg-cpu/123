import { useEffect, useState } from 'react';
import type { CourseChoice } from '../context/AppContext';

// Two short questions around an assessment, for the student's own reflection (Zimmerman's self-reflection phase):
//  - before a lesson's exit ticket, how well the student thinks they will do (a band of the score), so the score can be set
//    beside the guess: the student sees whether they judge themselves too high or too low (calibration of self-assessment);
//  - after an exit ticket or a topic check, why the score came out as it did (causal attribution), and one button to the
//    step that fits that reason.
// The theory's names stay in the code and on the teacher's pages; the student sees plain words only.
// Each answer is kept on this device at once and goes to the teacher with the programme's summary (lib/resultSync).

// The four bands of the guess: 0–40%, 40–60%, 60–80%, 80–100%
export type ConfidenceBand = 0 | 1 | 2 | 3;
export const BAND_RANGES: [number, number][] = [
  [0, 40],
  [40, 60],
  [60, 80],
  [80, 100]
];
export const bandLabel = (band: ConfidenceBand): string => `${BAND_RANGES[band][0]}–${BAND_RANGES[band][1]}%`;
// The band a score falls in; 40, 60 and 80 open the band above
export const bandOf = (percent: number): ConfidenceBand => (percent >= 80 ? 3 : percent >= 60 ? 2 : percent >= 40 ? 1 : 0);

// The guess against the score: in the same band, higher than the score, or lower
export type Calibration = 'match' | 'over' | 'under';
export const calibrationOf = (predicted: ConfidenceBand, percent: number): Calibration => {
  const actual = bandOf(percent);
  return predicted === actual ? 'match' : predicted > actual ? 'over' : 'under';
};

// Why the score came out as it did: did not understand, not enough practice, rushed or distracted, well prepared
export type ReasonId = 'unclear' | 'practice' | 'rushed' | 'prepared';
export const REASON_IDS: ReasonId[] = ['unclear', 'practice', 'rushed', 'prepared'];
export const REASON_TEXT: Record<ReasonId, { mn: string; en: string }> = {
  unclear: { mn: 'Ойлгоогүй байсан', en: 'I did not understand it' },
  practice: { mn: 'Хангалттай дасгал хийгээгүй', en: 'Not enough practice' },
  rushed: { mn: 'Яарсан, анхаарал сарнисан', en: 'I rushed or lost focus' },
  prepared: { mn: 'Сайн бэлдсэн', en: 'I prepared well' }
};

export type ReflectionKind = 'exit' | 'topic';

export interface ReflectionRecord {
  id: string;
  course: CourseChoice;
  kind: ReflectionKind; // a lesson's exit ticket or a topic check
  label: { en: string; mn: string }; // what was taken, in both languages (the lesson code, or the topic)
  takenAt: number; // when the score was given, in milliseconds since 1970
  percent: number; // the score
  predicted?: ConfidenceBand; // left out when the student skipped the guess (the topic check has none)
  reason?: ReasonId; // left out until the student answers, and when they skip it
}

const KEY = 'chem_reflections';
const CAP = 400; // the newest answers kept on this device
const EVENT = 'chem-reflections-changed';
// The newest answers of a programme that go with its summary. The teacher's copy is merged by id, so older answers already
// sent stay there; this only keeps each sending small.
const SUMMARY_CAP = 150;

const read = (): ReflectionRecord[] => {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ReflectionRecord[]) : [];
  } catch {
    return [];
  }
};

const write = (records: ReflectionRecord[]) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(records.slice(0, CAP)));
  } catch {
    // Storage can be blocked; the answer then is not kept, and nothing else changes
  }
  window.dispatchEvent(new Event(EVENT));
};

// Saves one score with its guess (and its reason, when given at once), newest first; returns its id for the reason later
export const saveReflection = (entry: Omit<ReflectionRecord, 'id' | 'takenAt'>): string => {
  const id = `ref-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const record: ReflectionRecord = { ...entry, id, takenAt: Date.now() };
  // JSON leaves out the guess or reason that is undefined, as the summary needs
  write([JSON.parse(JSON.stringify(record)) as ReflectionRecord, ...read()]);
  return id;
};

// Adds (or changes) the reason of a saved score; null takes it away again
export const setReflectionReason = (id: string, reason: ReasonId | null) => {
  write(
    read().map(r => {
      if (r.id !== id) return r;
      const next: ReflectionRecord = { ...r };
      if (reason) next.reason = reason;
      else delete next.reason;
      return next;
    })
  );
};

// The saved answers, kept up to date while the page is open
export const useReflections = (): ReflectionRecord[] => {
  const [records, setRecords] = useState<ReflectionRecord[]>(read);
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

// The newest answers of one programme, keyed by id, as the summary carries them to the teacher
export const reflectionsOf = (records: ReflectionRecord[], course: CourseChoice): Record<string, ReflectionRecord> =>
  Object.fromEntries(
    records
      .filter(r => r.course === course)
      .slice(0, SUMMARY_CAP)
      .map(r => [r.id, r] as const)
  );

// The totals the teacher reads: how many guesses, how many matched the score or were too high or too low, and each reason
export interface ReflectionTotals {
  scores: number; // scores with any answer
  predicted: number;
  match: number;
  over: number;
  under: number;
  reasons: Record<ReasonId, number>;
}

export const reflectionTotals = (records: ReflectionRecord[]): ReflectionTotals => {
  const totals: ReflectionTotals = {
    scores: records.length,
    predicted: 0,
    match: 0,
    over: 0,
    under: 0,
    reasons: { unclear: 0, practice: 0, rushed: 0, prepared: 0 }
  };
  for (const r of records) {
    if (r.predicted !== undefined) {
      totals.predicted += 1;
      totals[calibrationOf(r.predicted, r.percent)] += 1;
    }
    if (r.reason && r.reason in totals.reasons) totals.reasons[r.reason] += 1;
  }
  return totals;
};
