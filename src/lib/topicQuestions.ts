import type { ExamQuestion, Topic, VocabularyTerm } from '../types/chemistry';
import { mcq } from '../data/topicMcqBuild';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { MOCK_TESTS } from '../data/mockTests';
import { CAMBRIDGE_PAST_PAPERS_2017_2024 } from '../data/pastPapersData';
import { TOPIC_MCQ_A } from '../data/topicMcqIgcseA';
import { TOPIC_MCQ_B } from '../data/topicMcqIgcseB';
import { TOPIC_MCQ_C } from '../data/topicMcqIgcseC';
import { TOPIC_MCQ_D } from '../data/topicMcqIgcseD';

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
    return mcq(
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
    );
  });
};

// The multiple-choice questions of one topic, from every question pool the app holds (the topic's own questions, the mock
// tests and the past-paper questions), without repeats. An end-of-topic test uses up to six of them, and then one question
// for each key word of the topic that those six do not name.
export const topicMcq = (topic: Topic): ExamQuestion[] => {
  const pool = [
    ...topic.questions,
    ...TOPIC_MCQ_A,
    ...TOPIC_MCQ_B,
    ...TOPIC_MCQ_C,
    ...TOPIC_MCQ_D,
    ...MOCK_TESTS.flatMap(t => t.questions),
    ...CAMBRIDGE_PAST_PAPERS_2017_2024
  ];
  const seen = new Set<string>();
  const found: ExamQuestion[] = [];
  for (const q of pool) {
    if (q.topicId !== topic.id || q.type !== 'mcq' || !q.options || !q.correctOption || seen.has(q.id)) continue;
    seen.add(q.id);
    found.push(q);
  }
  const shown = found.slice(0, 6);
  const covered = shown.map(q => JSON.stringify(q).toLowerCase()).join('\n');
  return [...shown, ...keyWordQuestions(topic, covered)];
};
