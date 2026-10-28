import type { Bi, LessonStep, QuizItem, StatesLesson } from './statesLessons';
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';

// The five blocks of a 40-minute lesson, in minutes, as the IGCSE chapter 1 lessons use them
const BLOCKS: Array<[number, number, LessonStep['phase']]> = [
  [0, 6, 'start'],
  [6, 16, 'core'],
  [16, 26, 'core'],
  [26, 34, 'core'],
  [34, 40, 'end']
];

export const bi = (mn: string, en: string): Bi => ({ mn, en });

// The five steps of a lesson: [title, teacher, student, evidence] for each block, in order
export const lessonSteps = (rows: Array<[Bi, Bi, Bi, Bi]>): LessonStep[] =>
  rows.map(([title, teacher, student, evidence], i) => ({
    phase: BLOCKS[i][2],
    from: BLOCKS[i][0],
    to: BLOCKS[i][1],
    title,
    teacher,
    student,
    evidence
  }));

// One exit-ticket question: the options, the index of the right one, and the explanation shown after the answer
export const exitItem = (question: Bi, options: Bi[], answer: number, explanation: Bi): QuizItem => ({
  question,
  options,
  answer,
  explanation
});

// One key word with its definition
export const term = (name: Bi, def: Bi): GlossaryTerm => ({ term: name, def });

// Practice: an easy choose-one question, and a hard question with a model answer to compare with
export const easy = (prompt: Bi, options: Bi[], answer: number, explanation: Bi): PracticeItem => ({
  level: 'easy',
  prompt,
  options,
  answer,
  explanation
});

export const hard = (prompt: Bi, model: Bi, explanation: Bi): PracticeItem => ({
  level: 'hard',
  prompt,
  model,
  explanation
});

// Gives each of a lesson's five steps its own deck slides, as [from, to] runs (see StatesLesson.stepSlides)
export const withStepSlides = (l: StatesLesson, stepSlides: Array<Array<[number, number]>>): StatesLesson => ({ ...l, stepSlides });

// One 40-minute lesson of the chapter; its slides are the deck slides registered for the chapter.
// idPrefix keeps the lesson ids of each chapter apart (the glossary and practice are keyed by them).
export const lesson = (
  number: number,
  title: Bi,
  objective: Bi,
  keyPoints: Bi[],
  steps: LessonStep[],
  quiz: QuizItem[],
  idPrefix = 'latt'
): StatesLesson => ({
  id: `${idPrefix}-${number}`,
  number,
  title,
  los: [],
  objective,
  keyPoints,
  steps,
  quiz
});
