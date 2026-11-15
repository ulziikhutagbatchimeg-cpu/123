import { useEffect, useState } from 'react';
import type { CourseChoice } from '../context/AppContext';
import { rateObjective } from './selfCheck';

// Today's goal in knowledge, not only in numbers (Zimmerman's forethought: the student sets a goal of what to master, then
// judges it): besides how many lessons, the student picks 1 to 3 learning objectives of the chapter on screen to master
// today, chosen from those they rated "not yet" (lib/selfCheck). At the end of the day, after "Did today match your goal?",
// each chosen objective is rated again, I can or not yet, and that rating becomes the objective's rating in the self-check.
// One entry a day for each programme, kept on this device; it goes to the teacher with the programme's summary
// (lib/resultSync). The theory's names stay in the code and on the teacher's pages.

export interface ObjectiveGoalItem {
  id: string; // the learning objective's id
  code: string; // its syllabus code, for example 1.1.2, as the teacher reads it
  before?: boolean; // its rating when chosen: false (not yet), or left out when not rated yet
  after?: boolean; // its rating at the end of the day, once given
}

export interface ObjectiveGoal {
  id: string; // og-<course>-<day>
  course: CourseChoice;
  day: string; // YYYY-MM-DD, the student's own day
  at: number; // when the objectives were chosen or last re-rated, in milliseconds since 1970
  items: ObjectiveGoalItem[];
}

const KEY = 'chem_objective_goals';
const CAP = 200;
const EVENT = 'chem-objective-goals-changed';
const SUMMARY_CAP = 90; // the newest days of a programme sent with its summary; the teacher's copy is merged by id
export const MAX_OBJECTIVES = 3;

// The local day of a time, as YYYY-MM-DD (written out here, not taken from lib/resultSync, which reads this file)
const localDay = (time: number): string => {
  const d = new Date(time);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const read = (): ObjectiveGoal[] => {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ObjectiveGoal[]) : [];
  } catch {
    return [];
  }
};

const write = (records: ObjectiveGoal[]) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(records.slice(0, CAP)));
  } catch {
    // Storage can be blocked; the choice then lasts for this visit only
  }
  window.dispatchEvent(new Event(EVENT));
};

const todayId = (course: CourseChoice) => `og-${course}-${localDay(Date.now())}`;

// Sets today's objectives of a programme (an empty list takes today's goal away). An objective chosen again keeps the
// end-of-day rating it already has.
export const setTodayObjectives = (course: CourseChoice, items: Omit<ObjectiveGoalItem, 'after'>[]) => {
  const id = todayId(course);
  const all = read();
  const old = all.find(r => r.id === id);
  const rest = all.filter(r => r.id !== id);
  if (items.length === 0) {
    write(rest);
    return;
  }
  const kept = items.slice(0, MAX_OBJECTIVES).map(item => {
    const before = old?.items.find(x => x.id === item.id);
    return JSON.parse(JSON.stringify({ ...item, after: before?.after })) as ObjectiveGoalItem;
  });
  write([{ id, course, day: localDay(Date.now()), at: Date.now(), items: kept }, ...rest]);
};

// The end-of-day rating of one of today's objectives; it becomes the objective's rating in the self-check too
export const rerateTodayObjective = (course: CourseChoice, objectiveId: string, can: boolean) => {
  const id = todayId(course);
  write(
    read().map(r =>
      r.id !== id ? r : { ...r, at: Date.now(), items: r.items.map(x => (x.id === objectiveId ? { ...x, after: can } : x)) }
    )
  );
  rateObjective(objectiveId, can);
};

// The saved days, kept up to date while the page is open
export const useObjectiveGoals = (): ObjectiveGoal[] => {
  const [records, setRecords] = useState<ObjectiveGoal[]>(read);
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

// Today's objectives of a programme, if chosen
export const todayGoalOf = (records: ObjectiveGoal[], course: CourseChoice): ObjectiveGoal | undefined =>
  records.find(r => r.id === todayId(course));

// The newest days of one programme, keyed by id, as the summary carries them to the teacher
export const objectiveGoalsOf = (records: ObjectiveGoal[], course: CourseChoice): Record<string, ObjectiveGoal> =>
  Object.fromEntries(
    records
      .filter(r => r.course === course)
      .slice(0, SUMMARY_CAP)
      .map(r => [r.id, r] as const)
  );
