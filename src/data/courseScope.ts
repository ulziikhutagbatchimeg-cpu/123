import type { CourseChoice } from '../context/AppContext';
import type { ExamQuestion, MistakeLog, QuestionAttempt, Topic } from '../types/chemistry';
import { CURRICULUM_CHAPTERS } from './curriculumData';
import { ALEVEL_CHAPTERS } from './alevelCurriculum';
import { ALEVEL_QUESTIONS } from './alevelQuestions';
import { alevelCourse, visibleChapters } from './alevelSyllabus';
import { MOCK_TESTS } from './mockTests';
import { CAMBRIDGE_PAST_PAPERS_2017_2024 } from './pastPapersData';
import { TOPIC_MCQ_A } from './topicMcqIgcseA';
import { TOPIC_MCQ_B } from './topicMcqIgcseB';
import { TOPIC_MCQ_C } from './topicMcqIgcseC';
import { TOPIC_MCQ_D } from './topicMcqIgcseD';

// The chapters of the course being studied: IGCSE 0620, or the AS or A Level 9701 chapters of the chosen level
export const courseChapters = (courseChoice: CourseChoice): { id: string; topics: Topic[] }[] =>
  courseChoice === 'igcse' ? CURRICULUM_CHAPTERS : visibleChapters(ALEVEL_CHAPTERS, alevelCourse(courseChoice));

// The topics of the course being studied, in syllabus order
export const courseTopics = (courseChoice: CourseChoice): Topic[] =>
  courseChapters(courseChoice).flatMap(c => c.topics);

// The mistakes that belong to the course being studied, so IGCSE and 9701 mistakes never mix
export const courseMistakes = (mistakes: MistakeLog[], courseChoice: CourseChoice): MistakeLog[] => {
  const ids = new Set(courseTopics(courseChoice).map(t => t.id));
  return mistakes.filter(m => ids.has(m.topicId));
};

// The answered questions that belong to the course being studied
export const courseAttempts = (attempts: QuestionAttempt[], courseChoice: CourseChoice): QuestionAttempt[] => {
  const ids = new Set(courseTopics(courseChoice).map(t => t.id));
  return attempts.filter(a => ids.has(a.topicId));
};

// The marks gained out of the marks available, as a percentage; null when nothing has been answered
export const accuracyOf = (list: { earned: number; max: number }[]): number | null => {
  const max = list.reduce((n, a) => n + a.max, 0);
  return max > 0 ? Math.round((list.reduce((n, a) => n + a.earned, 0) / max) * 100) : null;
};

// The question bank of the course being studied: every question the app holds for it, each once
export const courseQuestions = (courseChoice: CourseChoice): ExamQuestion[] => {
  const pool: ExamQuestion[] =
    courseChoice === 'igcse'
      ? [
          ...CURRICULUM_CHAPTERS.flatMap(c => c.topics.flatMap(t => t.questions)),
          ...TOPIC_MCQ_A,
          ...TOPIC_MCQ_B,
          ...TOPIC_MCQ_C,
          ...TOPIC_MCQ_D,
          ...MOCK_TESTS.flatMap(t => t.questions),
          ...CAMBRIDGE_PAST_PAPERS_2017_2024
        ]
      : ALEVEL_QUESTIONS;
  const byId = new Map<string, ExamQuestion>();
  pool.forEach(q => {
    if (!byId.has(q.id)) byId.set(q.id, q);
  });
  return [...byId.values()];
};

export interface ChapterExamResult {
  bank: number; // the questions the app holds for the chapter
  answered: number; // the questions the student has answered in it
  percent: number | null; // the marks gained out of the marks available, or null when nothing is answered
}

// The exam results of every chapter given, keyed by chapter id, so a chapter with no questions still has an entry
export const chapterExamResults = (
  chapters: { id: string; topics: Topic[] }[],
  bank: ExamQuestion[],
  attempts: QuestionAttempt[]
): Record<string, ChapterExamResult> => {
  const results: Record<string, ChapterExamResult> = {};
  for (const ch of chapters) {
    const topicIds = new Set(ch.topics.map(t => t.id));
    const answered = attempts.filter(a => topicIds.has(a.topicId));
    results[ch.id] = {
      bank: bank.filter(q => topicIds.has(q.topicId)).length,
      answered: answered.length,
      percent: accuracyOf(answered)
    };
  }
  return results;
};
