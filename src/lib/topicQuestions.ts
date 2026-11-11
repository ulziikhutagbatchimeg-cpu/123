import type { ExamQuestion, Topic, VocabularyTerm } from '../types/chemistry';
import { mcq } from '../data/topicMcqBuild';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { MOCK_TESTS } from '../data/mockTests';
import { CAMBRIDGE_PAST_PAPERS_2017_2024 } from '../data/pastPapersData';
import { TOPIC_MCQ_A } from '../data/topicMcqIgcseA';
import { TOPIC_MCQ_B } from '../data/topicMcqIgcseB';
import { TOPIC_MCQ_C } from '../data/topicMcqIgcseC';
import { TOPIC_MCQ_D } from '../data/topicMcqIgcseD';
import { TOPIC_MCQ_EXTRA } from '../data/topicMcqExtra';
import { TOPIC_MCQ_LEVELS_A } from '../data/topicMcqLevelsA';
import { TOPIC_MCQ_LEVELS_B } from '../data/topicMcqLevelsB';
import { ALEVEL_QUESTIONS } from '../data/alevelQuestions';
import { ALEVEL_CHAPTER1_EXTRA } from '../data/alevelChapter1Extra';
import { TOPIC_MCQ_PRACTICE_FIRST, TOPIC_MCQ_TOP_UP } from '../data/topicMcqTopUp';
import { commandWordOf, type Taxonomy } from './taxonomy';

// Every key word of the course, with its definition: the wrong answers of a generated question are taken from here
const ALL_KEY_WORDS: VocabularyTerm[] = CURRICULUM_CHAPTERS.flatMap(c => c.topics.flatMap(t => t.vocabulary));

// Whether a text names a key word: the full term, or the term without its bracketed part, such as "(Aᵣ)" or "(symbol)"
export const coversKeyWord = (text: string, term: string): boolean => {
  const full = term.toLowerCase();
  const core = full.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  return text.includes(full) || (core.length > 0 && text.includes(core));
};

// A question for each key word of the topic that no question shown names. It asks which statement describes the word; the
// right answer is the word's definition from the key word list, and the three wrong answers are other key words' definitions.
const keyWordQuestions = (topic: Topic, covered: string): ExamQuestion[] => {
  const missing = topic.vocabulary.filter(v => !coversKeyWord(covered, v.termEn));
  return missing.map((word, i) => {
    const others = [
      ...topic.vocabulary.filter(v => v.id !== word.id),
      ...ALL_KEY_WORDS.filter(v => !topic.vocabulary.some(own => own.id === v.id))
    ].filter(v => v.definitionEn !== word.definitionEn);
    const wrong: VocabularyTerm[] = [];
    for (const v of others) {
      if (wrong.length === 3) break;
      if (!wrong.some(w => w.definitionEn === v.definitionEn)) wrong.push(v);
    }
    // The right answer moves through A, B, C, D so the letters are spread evenly
    const position = i % 4;
    const correct = 'ABCD'[position] as 'A' | 'B' | 'C' | 'D';
    const answers = [...wrong];
    answers.splice(position, 0, word);
    return { ...mcq(
      topic.id,
      topic.chapterId,
      topic.syllabusRef,
      100 + i,
      `Key word: ${word.termEn}`,
      `Түлхүүр үг: ${word.termMn}`,
      `Which statement describes "${word.termEn}"?`,
      `"${word.termMn}" гэж аль нь зөв тодорхойлох вэ?`,
      answers.map(v => [v.definitionEn, v.definitionMn] as [string, string]),
      correct,
      `Confusing "${word.termEn}" with a neighbouring term.`,
      `"${word.termMn}"-ийг ойролцоо нэр томьёотой андуурах.`,
      topic.id
    ), taxonomy: 'recall' as const };
  });
};

// Every question pool the app holds: the topics' own questions, the topic question sets, the 9701 banks, the mock tests, the
// past-paper style questions, and last the sets that fill each topic up to its test
const POOL: ExamQuestion[] = [
  ...TOPIC_MCQ_A,
  ...TOPIC_MCQ_B,
  ...TOPIC_MCQ_C,
  ...TOPIC_MCQ_D,
  ...TOPIC_MCQ_EXTRA,
  ...TOPIC_MCQ_LEVELS_A,
  ...TOPIC_MCQ_LEVELS_B,
  ...ALEVEL_QUESTIONS,
  ...ALEVEL_CHAPTER1_EXTRA,
  ...MOCK_TESTS.flatMap(t => t.questions),
  ...CAMBRIDGE_PAST_PAPERS_2017_2024,
  ...TOPIC_MCQ_TOP_UP
];

// Questions that repeat an earlier question of the same topic in other words ("Brass is an alloy of:" and "Brass is an alloy
// of which two metals?"). They were written twice by two question sets; the topic quiz and test keep only the first. Those
// from the mock tests and chapter tests stay in those tests.
const REPEATS = new Set([
  'ch1-t-01', 'mt-c-02', 's-2-5-q51', 's-2-7-q50', 's-2-7-q51', 's-4-2-q50', 's-6-1-q50', 's-6-1-q53', 's-6-3-q50', 's-6-3-q51',
  'top-7-1-q53', 's-7-2-q50', 's-7-2-q52', 's-8-1-q50', 's-8-2-q50', 's-8-2-q51', 's-8-2-q53', 's-8-4-q53', 's-8-5-q50',
  's-8-5-q51', 's-8-5-q53', 's-9-2-q50', 's-9-2-q51', 's-9-3-q50', 's-9-3-q51', 'mt-c-17', 's-9-5-q50', 's-9-5-q51',
  's-9-6-q51', 's-9-6-q52', 'mt-c-18', 's-11-2-q80', 's-11-4-q50', 's-11-4-q51', 's-11-4-q52', 's-11-7-q50', 's-12-2-q50',
  'top-21-1-q50', 'al-34.1-q3', 'al-32.1-q3'
]);

// The written multiple-choice questions of one topic, each once, in pool order
const writtenMcq = (topic: Topic): ExamQuestion[] => {
  const seen = new Set<string>();
  const found: ExamQuestion[] = [];
  for (const q of [...TOPIC_MCQ_PRACTICE_FIRST, ...topic.questions, ...POOL]) {
    if (q.topicId !== topic.id || q.type !== 'mcq' || !q.options || !q.correctOption || seen.has(q.id) || REPEATS.has(q.id)) continue;
    seen.add(q.id);
    found.push(q);
  }
  return found;
};

// A topic with enough questions keeps its last TEST_SIZE questions for the end-of-topic test only, so the test never repeats
// a practice question; the rest are the topic quiz. A topic with fewer has one set, used by both as before.
export const TEST_SIZE = 5;
const PRACTICE_MIN = 6;
const split = (topic: Topic): { practice: ExamQuestion[]; test: ExamQuestion[] | null } => {
  const all = writtenMcq(topic);
  if (all.length < PRACTICE_MIN + TEST_SIZE) return { practice: all, test: null };
  return { practice: all.slice(0, all.length - TEST_SIZE), test: all.slice(all.length - TEST_SIZE) };
};

// The end-of-topic test. With its own set: those questions. Otherwise up to six of the topic's questions and one question for
// each key word of the topic that those six do not name.
export const topicMcq = (topic: Topic): ExamQuestion[] => {
  const { practice, test } = split(topic);
  if (test) return test;
  const shown = practice.slice(0, 6);
  const covered = shown.map(q => JSON.stringify(q).toLowerCase()).join('\n');
  return [...shown, ...keyWordQuestions(topic, covered)];
};

// The thinking level of the shared-pool questions that cannot carry one themselves (the mock tests and past-paper pools)
const POOL_TAXONOMY: Record<string, Taxonomy> = {
  'mt-a-02': 'recall',
  'ch1-t-01': 'recall',
  'ch1-t-04': 'recall',
  'mt-c-01': 'analysis',
  'mt-c-02': 'analysis'
};

// Every multiple-choice question of the topic quiz: the practice questions (never the end-of-topic test's own), then one for
// each key word none of them names
export const topicQuizMcq = (topic: Topic): ExamQuestion[] => {
  const found = split(topic).practice;
  const covered = found.map(q => JSON.stringify(q).toLowerCase()).join('\n');
  return [...found, ...keyWordQuestions(topic, covered)].map(q => (q.taxonomy ? q : { ...q, taxonomy: POOL_TAXONOMY[q.id] }));
};

// The level of a question in the topic quiz (Easy, Medium, Hard): its own level, else its thinking level (recall is easy,
// apply medium, analyse and evaluate hard) as written or as its command word shows ("why", "how many", "calculate"…),
// else its paper
export const quizLevel = (q: ExamQuestion): 'easy' | 'medium' | 'hard' => {
  if (q.difficulty) return q.difficulty;
  const byWord = commandWordOf(q);
  const t = q.taxonomy ?? POOL_TAXONOMY[q.id] ?? (byWord.verb ? byWord.level : undefined);
  if (t) return t === 'recall' ? 'easy' : t === 'apply' ? 'medium' : 'hard';
  return q.paper === 'Paper 2' ? 'easy' : q.paper === 'Paper 4' ? 'medium' : 'hard';
};

// The chapter quick check: five questions taken in turn from the chapter's topics, each from the end of its topic quiz, so the
// check mixes the whole chapter instead of repeating the first questions of its first topic
export const chapterQuickMcq = (topics: Topic[], size = 5): ExamQuestion[] => {
  const lists = topics.map(t => topicQuizMcq(t).filter(q => !/-q1\d\d$/.test(q.id)).reverse());
  const picked: ExamQuestion[] = [];
  for (let round = 0; picked.length < size && lists.some(l => l.length > round); round++) {
    for (const l of lists) {
      if (picked.length >= size) break;
      if (l[round]) picked.push(l[round]);
    }
  }
  return picked;
};

// The structured tasks of a topic: its own, and those filed under it in the 9701 banks
export const topicStructured = (topic: Topic): ExamQuestion[] => {
  const seen = new Set<string>();
  return [...topic.questions, ...ALEVEL_QUESTIONS, ...ALEVEL_CHAPTER1_EXTRA].filter(q => {
    if (q.topicId !== topic.id || q.type === 'mcq' || seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });
};
