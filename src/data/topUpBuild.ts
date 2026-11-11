import type { ExamOption, ExamQuestion } from '../types/chemistry';
import { mcq } from './topicMcqBuild';

// The writer of one topic's added questions. Each call gives the level (e easy, m medium, h hard), the title, the question,
// four options [English, Mongolian], the right letter and a short note on the usual mistake. They are numbered from 300, so
// their ids never meet a topic's other questions (1–99) or its key-word questions (100–199).
const LEVEL = { e: 'easy', m: 'medium', h: 'hard' } as const;
export type Level = keyof typeof LEVEL;

// The number an option starts with (−3, 0.25, 6.02 × 10²³ …), or null when it is words
const leadingNumber = (text: string): number | null => {
  const m = /^\s*([+−-]?\d+(?:\.\d+)?)/.exec(text.replace(/−/g, '-'));
  if (!m) return null;
  const base = parseFloat(m[1]);
  const exp = /×\s*10([⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/.exec(text);
  if (!exp) return base;
  const digits = exp[1].replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, d => String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(d))).replace('⁻', '-').replace('⁺', '');
  return base * 10 ** parseInt(digits, 10);
};

// The options in the order they are shown: numbers from smallest to largest; words turned round by one more place for each
// question, so the right letter is spread over A, B, C and D
const arrange = (options: [string, string][], n: number): number[] => {
  const idx = options.map((_, i) => i);
  const nums = options.map(o => leadingNumber(o[0]));
  if (nums.every(v => v !== null)) return idx.sort((a, b) => (nums[a] as number) - (nums[b] as number));
  const shift = n % options.length;
  return idx.map(i => (i + shift) % options.length);
};

export const topUp = (topicId: string, chapterId: string, syllabusRef: string) => {
  let n = 300;
  return (
    level: Level,
    titleEn: string,
    titleMn: string,
    questionEn: string,
    questionMn: string,
    options: [string, string][],
    correct: ExamOption['id'],
    noteEn: string,
    noteMn: string
  ): ExamQuestion => {
    const number = n++;
    const order = arrange(options, number);
    const shown = order.map(i => options[i]);
    const right = 'ABCD'[order.indexOf('ABCD'.indexOf(correct))] as ExamOption['id'];
    return {
      ...mcq(topicId, chapterId, syllabusRef, number, titleEn, titleMn, questionEn, questionMn, shown, right, noteEn, noteMn),
      difficulty: LEVEL[level]
    };
  };
};

// The same option in both languages (a number, a formula or a symbol)
export const same = (...xs: string[]): [string, string][] => xs.map(x => [x, x]);
