import { useEffect } from 'react';
import { useApp, type CourseChoice } from '../context/AppContext';
import type { QuestionAttempt, TestAttempt } from '../types/chemistry';
import { courseChapters, courseTopics } from '../data/courseScope';
import { CAMBRIDGE_PAST_PAPERS_2017_2024 } from '../data/pastPapersData';
import { useActivity, type ActivityRecord } from './activity';
import { isTeacher, syncStudentResults, useAuthUser } from './cloud';

// What the student's results look like in the teacher's copy. Each result is sent once, with the id the app gave it; the
// summaries cover every answer, and only the newest answers are sent one by one for the teacher to comment on.
export const RECENT_ANSWERS = 300;
const COURSES: CourseChoice[] = ['igcse', 'as', 'a'];
const NAME_KEY = 'chem_cambridge_student_name';
const SYNCED_KEY = 'chem_synced_results';

export type ResultKind = 'exit' | 'game' | 'escape' | 'question' | 'test';

export interface ResultItem {
  id: string;
  kind: ResultKind;
  course: CourseChoice;
  takenAt: number; // when the result was saved, in milliseconds since 1970
  percent: number;
  label?: { en: string; mn: string };
  questionId?: string;
  topicId?: string;
  paper?: string;
  earned?: number;
  max?: number;
  testId?: string;
}

// A stored result, with the teacher's feedback on it when there is some
export interface StoredResult extends ResultItem {
  feedback?: string;
  feedbackAt?: string;
}

export interface Tally {
  answered: number;
  earned: number;
  max: number;
}

// What the student did on one day: lesson tickets, games, and answered questions with the marks of those answers
export interface DayTally {
  lessons: number;
  games: number;
  questions: number;
  earned: number;
  max: number;
}

export interface CourseSummary {
  lessons: { count: number; avg: number | null };
  tests: { count: number; avg: number | null };
  games: { count: number; avg: number | null };
  questions: Tally;
  pastPapers: Tally;
  chapters: Record<string, Tally>; // by chapter id, for every chapter of the course
  daily: Record<string, DayTally>; // by day, as YYYY-MM-DD in the student's own time zone; kept by merging, so days stay
}

export type ResultSummaries = Record<CourseChoice, CourseSummary>;

// The course each topic belongs to. The 9701 topics are split between AS and A Level; the rest are 0620.
const topicSet = (course: CourseChoice) => new Set(courseTopics(course).map(t => t.id));
const TOPICS: Record<CourseChoice, Set<string>> = { igcse: topicSet('igcse'), as: topicSet('as'), a: topicSet('a') };
const courseOfTopic = (topicId: string): CourseChoice => (TOPICS.as.has(topicId) ? 'as' : TOPICS.a.has(topicId) ? 'a' : 'igcse');

const PAST_PAPER_IDS = new Set(CAMBRIDGE_PAST_PAPERS_2017_2024.map(q => q.id));

const average = (values: number[]): number | null =>
  values.length ? Math.round(values.reduce((n, v) => n + v, 0) / values.length) : null;

const tally = (list: QuestionAttempt[]): Tally => ({
  answered: list.length,
  earned: list.reduce((n, a) => n + a.earned, 0),
  max: list.reduce((n, a) => n + a.max, 0)
});

// Every result the student has: lesson tickets, games and the escape room, full tests, and the newest answers
export const resultItems = (activity: ActivityRecord[], attempts: QuestionAttempt[], tests: TestAttempt[]): ResultItem[] => [
  ...activity.map(r => ({ id: r.id, kind: r.kind, course: r.course, takenAt: r.takenAt, percent: r.percent, label: r.label })),
  ...tests.map(t => ({ id: t.id, kind: 'test' as const, course: 'igcse' as const, takenAt: t.takenAt, percent: t.percent, testId: t.testId })),
  ...attempts.slice(0, RECENT_ANSWERS).map(a => ({
    id: a.id,
    kind: 'question' as const,
    course: courseOfTopic(a.topicId),
    takenAt: a.takenAt,
    percent: a.max > 0 ? Math.round((a.earned / a.max) * 100) : 0,
    questionId: a.questionId,
    topicId: a.topicId,
    paper: a.paper,
    earned: a.earned,
    max: a.max
  }))
];

// The local day of a time, as YYYY-MM-DD
export const dayKey = (time: number): string => {
  const d = new Date(time);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// The summary of each programme: lessons, tests, games, answered questions, past papers, every chapter's answers and each day
export const courseSummaries = (activity: ActivityRecord[], attempts: QuestionAttempt[], tests: TestAttempt[]): ResultSummaries => {
  const summaries = {} as ResultSummaries;
  for (const course of COURSES) {
    const records = activity.filter(r => r.course === course);
    const exits = records.filter(r => r.kind === 'exit');
    const games = records.filter(r => r.kind !== 'exit');
    const answered = attempts.filter(a => courseOfTopic(a.topicId) === course);
    const courseTests = course === 'igcse' ? tests : [];
    const chapters: Record<string, Tally> = {};
    for (const ch of courseChapters(course)) {
      const ids = new Set(ch.topics.map(t => t.id));
      chapters[ch.id] = tally(answered.filter(a => ids.has(a.topicId)));
    }
    const daily: Record<string, DayTally> = {};
    const dayOf = (time: number): DayTally => {
      const key = dayKey(time);
      if (!daily[key]) daily[key] = { lessons: 0, games: 0, questions: 0, earned: 0, max: 0 };
      return daily[key];
    };
    exits.forEach(r => (dayOf(r.takenAt).lessons += 1));
    games.forEach(r => (dayOf(r.takenAt).games += 1));
    answered.forEach(a => {
      const day = dayOf(a.takenAt);
      day.questions += 1;
      day.earned += a.earned;
      day.max += a.max;
    });
    summaries[course] = {
      lessons: { count: exits.length, avg: average(exits.map(r => r.percent)) },
      tests: { count: courseTests.length, avg: average(courseTests.map(t => t.percent)) },
      games: { count: games.length, avg: average(games.map(r => r.percent)) },
      questions: tally(answered),
      pastPapers: tally(answered.filter(a => PAST_PAPER_IDS.has(a.questionId))),
      daily,
      chapters
    };
  }
  return summaries;
};

// The ids of the results already in the teacher's copy, kept on this browser
const readSynced = (): Set<string> => {
  try {
    const raw = window.localStorage.getItem(SYNCED_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
};

const writeSynced = (ids: string[]) => {
  try {
    window.localStorage.setItem(SYNCED_KEY, JSON.stringify(ids));
  } catch {
    // Storage can be blocked; the results are then sent again next time, which is harmless
  }
};

const readStudentName = (): string => {
  try {
    return window.localStorage.getItem(NAME_KEY)?.trim() || 'Student';
  } catch {
    return 'Student';
  }
};

// Keeps the signed-in student's results in the teacher's copy. Each change sends the new results and the summaries, a moment
// after the last change. A student who is not signed in keeps the results on this browser only.
export const useResultSync = () => {
  const { user } = useAuthUser();
  const { attempts, testAttempts } = useApp();
  const activity = useActivity();
  const uid = user && !isTeacher(user) ? user.uid : null;

  useEffect(() => {
    if (!uid) return;
    const timer = window.setTimeout(() => {
      const items = resultItems(activity, attempts, testAttempts);
      const synced = readSynced();
      const pending = items.filter(item => !synced.has(item.id));
      syncStudentResults(uid, readStudentName(), pending, courseSummaries(activity, attempts, testAttempts))
        // Only the results still on this browser are remembered, so the record stays small
        .then(() => writeSynced(items.map(item => item.id)))
        .catch(() => {
          // Offline or blocked: the results go again on the next change
        });
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [uid, activity, attempts, testAttempts]);
};
