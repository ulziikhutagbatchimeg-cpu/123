import { courseTopics } from '../data/courseScope';
import { CHAPTER_TESTS } from '../data/chapterTests';
import { MOCK_TESTS } from '../data/mockTests';
import type { CourseChoice } from '../context/AppContext';

// Every test the student takes is saved as a test attempt under one id. An end-of-topic check is saved as unit-<topic id>,
// a chapter test under its own id (for example 0620-ch1-5 or 9701-as-1-4), and a mock test under its id.
export const unitTestId = (topicId: string): string => `unit-${topicId}`;

const UNIT_PREFIX = 'unit-';

// The course a test belongs to: a unit test by its topic, a 9701 chapter test by its id, and the rest are 0620
export const courseOfTest = (testId: string): CourseChoice => {
  if (testId.startsWith(UNIT_PREFIX)) {
    const topicId = testId.slice(UNIT_PREFIX.length);
    if (courseTopics('a').some(t => t.id === topicId)) return 'a';
    if (courseTopics('as').some(t => t.id === topicId)) return 'as';
    return 'igcse';
  }
  if (testId.startsWith('9701-as-')) return 'as';
  if (testId.startsWith('9701-a-')) return 'a';
  return 'igcse';
};

// The name of a test in both languages, for the student's list and the teacher's results
export const testTitle = (testId: string): { en: string; mn: string } => {
  if (testId.startsWith(UNIT_PREFIX)) {
    const topicId = testId.slice(UNIT_PREFIX.length);
    const topic = [...courseTopics('igcse'), ...courseTopics('as'), ...courseTopics('a')].find(t => t.id === topicId);
    if (topic) return { en: `${topic.titleEn} · end-of-topic check`, mn: `${topic.titleMn} · сэдвийн шалгалт` };
  }
  const chapter = CHAPTER_TESTS.find(t => t.id === testId);
  if (chapter) return { en: chapter.titleEn, mn: chapter.titleMn };
  const mock = MOCK_TESTS.find(t => t.id === testId);
  if (mock) return { en: mock.titleEn, mn: mock.titleMn };
  return { en: testId, mn: testId };
};
