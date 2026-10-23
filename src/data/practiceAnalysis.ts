import type { PaperType, QuestionAttempt } from '../types/chemistry';

// Marks earned and available for one group of answered questions
interface Tally {
  earned: number;
  max: number;
  questions: number;
}

const tally = <K>(attempts: QuestionAttempt[], keyOf: (a: QuestionAttempt) => K): Map<K, Tally> => {
  const rows = new Map<K, Tally>();
  for (const a of attempts) {
    const key = keyOf(a);
    const row = rows.get(key) ?? { earned: 0, max: 0, questions: 0 };
    row.earned += a.earned;
    row.max += a.max;
    row.questions += 1;
    rows.set(key, row);
  }
  return rows;
};

const percentOf = (row: Tally) => (row.max ? Math.round((row.earned / row.max) * 100) : 0);

export interface PaperResult {
  paper: PaperType;
  percent: number;
  questions: number;
}

// Accuracy by paper, from the marks earned, in paper order
export const paperResults = (attempts: QuestionAttempt[]): PaperResult[] =>
  [...tally(attempts, a => a.paper).entries()]
    .map(([paper, row]) => ({ paper, percent: percentOf(row), questions: row.questions }))
    .sort((a, b) => a.paper.localeCompare(b.paper));

export interface TopicResult {
  topicId: string;
  percent: number;
  questions: number;
}

// The topics answered least well, from topics with at least `minQuestions` answered questions
export const weakTopics = (attempts: QuestionAttempt[], minQuestions = 2, limit = 3): TopicResult[] =>
  [...tally(attempts, a => a.topicId).entries()]
    .filter(([, row]) => row.questions >= minQuestions)
    .map(([topicId, row]) => ({ topicId, percent: percentOf(row), questions: row.questions }))
    .sort((a, b) => a.percent - b.percent || b.questions - a.questions)
    .slice(0, limit);
