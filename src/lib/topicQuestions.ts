import type { ExamQuestion, Topic } from '../types/chemistry';
import { MOCK_TESTS } from '../data/mockTests';
import { CAMBRIDGE_PAST_PAPERS_2017_2024 } from '../data/pastPapersData';

// The multiple-choice questions of one topic, from every question pool the app holds (the topic's own questions, the mock
// tests and the past-paper questions), without repeats. An end-of-topic test uses up to six of them.
export const topicMcq = (topic: Topic): ExamQuestion[] => {
  const pool = [...topic.questions, ...MOCK_TESTS.flatMap(t => t.questions), ...CAMBRIDGE_PAST_PAPERS_2017_2024];
  const seen = new Set<string>();
  const found: ExamQuestion[] = [];
  for (const q of pool) {
    if (q.topicId !== topic.id || q.type !== 'mcq' || !q.options || !q.correctOption || seen.has(q.id)) continue;
    seen.add(q.id);
    found.push(q);
  }
  return found.slice(0, 6);
};
