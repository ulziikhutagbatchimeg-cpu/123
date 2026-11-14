import { useEffect } from 'react';
import { useApp, type CourseChoice } from '../context/AppContext';
import type { QuestionAttempt, TestAttempt } from '../types/chemistry';
import { courseChapters, courseTopics } from '../data/courseScope';
import { CAMBRIDGE_PAST_PAPERS_2017_2024 } from '../data/pastPapersData';
import { useActivity, type ActivityRecord } from './activity';
import { isTeacher, syncStudentResults, useAuthUser, useEnrollment } from './cloud';
import { chapterProgress, useSelfCheck, type Level, type SelfCheckState, type Tally3 } from './selfCheck';
import { courseOfTest, testTitle } from './testAttempts';
import { useStudyDays, useStudyRecords, type StudyEntry } from './studyTime';

// What the student's results look like in the teacher's copy. Each result is sent once, with the id the app gave it, every
// answered question included, so the teacher's record is complete; the summaries add the totals by day and by chapter.
const COURSES: CourseChoice[] = ['igcse', 'as', 'a'];
const NAME_KEY = 'chem_cambridge_student_name';
const SYNCED_KEY = 'chem_synced_results';

export type ResultKind = 'exit' | 'game' | 'escape' | 'practice' | 'question' | 'test';

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

// What the student did on one day: lesson tickets, games, and answered questions with the marks of those answers, then the
// full tests, the practice sets and the study time. The last three are optional: the summaries sent before they were counted
// do not have them.
export interface DayTally {
  lessons: number;
  games: number;
  questions: number;
  earned: number;
  max: number;
  tests?: number;
  practice?: number;
  seconds?: number; // the time studied that day
}

// The time the student spent on the course: in seconds, by chapter (the whole time with the chapter open) and by lesson
export interface StudyTotals {
  chapters: Record<string, number>;
  lessons: Record<string, { chapterId: string; title: { en: string; mn: string }; seconds: number }>;
}

// The newest attempt of one assessment (a lesson ticket, practice set, full test or game), as the teacher's board shows it.
// The marks ride on the summary, so the board has every assessment of the programme, not only the newest few hundred results
// (each answered question is a result of its own and would push the older assessments out).
export interface Mark {
  id: string; // the result's own id, so the teacher's feedback goes on the right result
  kind: ResultKind;
  takenAt: number;
  percent: number;
  label?: { en: string; mn: string };
  testId?: string;
}

export interface CourseSummary {
  lessons: { count: number; avg: number | null };
  tests: { count: number; avg: number | null };
  games: { count: number; avg: number | null };
  questions: Tally;
  pastPapers: Tally;
  chapters: Record<string, Tally>; // by chapter id, for every chapter of the course
  daily: Record<string, DayTally>; // by day, as YYYY-MM-DD in the student's own time zone; kept by merging, so days stay
  study?: StudyTotals; // optional: the summaries sent before the study time was counted do not have it
  // The student's self-check of each chapter (lib/selfCheck): how many objectives and key words are rated, and rated I can
  selfCheck?: Record<string, { lo: Tally3; kw: Tally3 }>;
  // The newest attempt of each assessment, keyed by a short code of its kind and name, so a retake replaces the one before
  marks?: Record<string, Mark>;
  // When the student last did anything that counts in this programme (a result or an answer), in milliseconds since 1970
  lastActiveAt?: number;
}

// A short, stable code for a mark's kind and name, safe as a Firestore field name
const markKey = (text: string): string => {
  let h = 5381;
  for (const c of text) h = (Math.imul(h, 33) ^ (c.codePointAt(0) ?? 0)) >>> 0;
  return `m${h.toString(36)}`;
};

// The newest attempt of each lesson ticket, practice set, full test and game of one programme
const marksOf = (records: ActivityRecord[], tests: TestAttempt[]): Record<string, Mark> => {
  const marks: Record<string, Mark> = {};
  const add = (name: string, mark: Mark) => {
    const key = markKey(`${mark.kind}|${name}`);
    if (!marks[key] || marks[key].takenAt < mark.takenAt) marks[key] = mark;
  };
  records.forEach(r =>
    add(r.label?.en || r.label?.mn || r.id, { id: r.id, kind: r.kind, takenAt: r.takenAt, percent: r.percent, label: r.label })
  );
  tests.forEach(t =>
    add(t.testId, { id: t.id, kind: 'test', takenAt: t.takenAt, percent: t.percent, label: testTitle(t.testId), testId: t.testId })
  );
  return marks;
};

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
  ...tests.map(t => ({
    id: t.id,
    kind: 'test' as const,
    course: courseOfTest(t.testId),
    takenAt: t.takenAt,
    percent: t.percent,
    label: testTitle(t.testId),
    testId: t.testId
  })),
  ...attempts.map(a => ({
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

// The study time of one programme, by chapter and by lesson; a lesson with no title yet is named by its id
const studyTotals = (study: StudyEntry[], course: CourseChoice): StudyTotals => {
  const totals: StudyTotals = { chapters: {}, lessons: {} };
  for (const entry of study) {
    if (entry.course !== course) continue;
    if (entry.lessonId === null) {
      totals.chapters[entry.chapterId] = (totals.chapters[entry.chapterId] ?? 0) + entry.seconds;
      continue;
    }
    const previous = totals.lessons[entry.lessonId];
    totals.lessons[entry.lessonId] = {
      chapterId: entry.chapterId,
      title: entry.lessonTitle ?? previous?.title ?? { en: entry.lessonId, mn: entry.lessonId },
      seconds: (previous?.seconds ?? 0) + entry.seconds
    };
  }
  return totals;
};

// The summary of each programme: lessons, tests, games, answered questions, past papers, every chapter's answers, each day and the study time
export const courseSummaries = (
  activity: ActivityRecord[],
  attempts: QuestionAttempt[],
  tests: TestAttempt[],
  study: StudyEntry[] = [],
  selfCheck: SelfCheckState | null = null,
  igcseLevel: Level = 'extended',
  studyDays: Record<string, number> = {}
): ResultSummaries => {
  const summaries = {} as ResultSummaries;
  for (const course of COURSES) {
    const records = activity.filter(r => r.course === course);
    const exits = records.filter(r => r.kind === 'exit');
    const games = records.filter(r => r.kind === 'game' || r.kind === 'escape');
    const practice = records.filter(r => r.kind === 'practice');
    const answered = attempts.filter(a => courseOfTopic(a.topicId) === course);
    const courseTests = tests.filter(t => courseOfTest(t.testId) === course);
    const chapters: Record<string, Tally> = {};
    for (const ch of courseChapters(course)) {
      const ids = new Set(ch.topics.map(t => t.id));
      chapters[ch.id] = tally(answered.filter(a => ids.has(a.topicId)));
    }
    const daily: Record<string, DayTally> = {};
    const blankDay = (): DayTally => ({ lessons: 0, games: 0, questions: 0, earned: 0, max: 0, tests: 0, practice: 0, seconds: 0 });
    const dayOf = (time: number): DayTally => {
      const key = dayKey(time);
      if (!daily[key]) daily[key] = blankDay();
      return daily[key];
    };
    exits.forEach(r => (dayOf(r.takenAt).lessons += 1));
    games.forEach(r => (dayOf(r.takenAt).games += 1));
    practice.forEach(r => {
      const day = dayOf(r.takenAt);
      day.practice = (day.practice ?? 0) + 1;
    });
    courseTests.forEach(t => {
      const day = dayOf(t.takenAt);
      day.tests = (day.tests ?? 0) + 1;
    });
    answered.forEach(a => {
      const day = dayOf(a.takenAt);
      day.questions += 1;
      day.earned += a.earned;
      day.max += a.max;
    });
    // The study time of each day of this programme (lib/studyTime), even on a day with no result
    Object.entries(studyDays).forEach(([key, seconds]) => {
      const [dayCourse, day] = key.split('|');
      if (dayCourse !== course || !day) return;
      if (!daily[day]) daily[day] = blankDay();
      daily[day].seconds = seconds;
    });
    const lastActiveAt = [...records, ...answered, ...courseTests].reduce((n, x) => Math.max(n, x.takenAt), 0);
    summaries[course] = {
      ...(lastActiveAt > 0 ? { lastActiveAt } : {}),
      lessons: { count: exits.length, avg: average(exits.map(r => r.percent)) },
      tests: { count: courseTests.length, avg: average(courseTests.map(t => t.percent)) },
      games: { count: games.length, avg: average(games.map(r => r.percent)) },
      questions: tally(answered),
      pastPapers: tally(answered.filter(a => PAST_PAPER_IDS.has(a.questionId))),
      daily,
      chapters,
      study: studyTotals(study, course),
      marks: marksOf(records, courseTests),
      ...(selfCheck
        ? {
            selfCheck: Object.fromEntries(
              courseChapters(course).map(ch => {
                const p = chapterProgress(ch.topics, selfCheck, course === 'igcse' ? igcseLevel : 'extended');
                return [ch.id, { lo: p.lo, kw: p.kw }];
              })
            )
          }
        : {})
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
  // The study time is saved about once a minute, so the summaries go up at that pace while a student studies
  const study = useStudyRecords();
  const studyDays = useStudyDays();
  const uid = user && !isTeacher(user) ? user.uid : null;
  // The self-check ratings go with the summaries, so each rating reaches the teacher; a Core IGCSE student is counted on Core
  const selfCheck = useSelfCheck();
  const track = useEnrollment(uid ?? undefined, 'igcse')?.track;
  const igcseLevel: Level = track === 'core' ? 'core' : 'extended';

  useEffect(() => {
    if (!uid) return;
    const timer = window.setTimeout(() => {
      const items = resultItems(activity, attempts, testAttempts);
      const synced = readSynced();
      const pending = items.filter(item => !synced.has(item.id));
      // The objective ratings go too, as the progress checklist the teacher reads, wherever the student rated them
      syncStudentResults(
        uid,
        readStudentName(),
        pending,
        courseSummaries(activity, attempts, testAttempts, study, selfCheck, igcseLevel, studyDays),
        selfCheck.lo
      )
        // The results sent now join the ones sent before; only the results still on this browser are remembered, so the
        // record stays small. A result that could not be sent is tried again next time.
        .then(done => {
          const sent = new Set(done);
          writeSynced(items.filter(item => synced.has(item.id) || sent.has(item.id)).map(item => item.id));
        })
        .catch(() => {
          // Offline or blocked: the results go again on the next change
        });
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [uid, activity, attempts, testAttempts, study, studyDays, selfCheck, igcseLevel]);
};
