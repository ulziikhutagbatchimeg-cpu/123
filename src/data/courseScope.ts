import type { CourseChoice } from '../context/AppContext';
import type { MistakeLog, QuestionAttempt, Topic } from '../types/chemistry';
import { CURRICULUM_CHAPTERS } from './curriculumData';
import { ALEVEL_CHAPTERS } from './alevelCurriculum';
import { alevelCourse, visibleChapters } from './alevelSyllabus';

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
