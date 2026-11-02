// A short, friendly note for the moments of the student's work: a topic read, a question answered, a check finished.
// Any part of the app can send one; the Encourager on the page shows it for a moment and then lets it fade.
export const ENCOURAGE_EVENT = 'chem-encourage';

export interface EncourageNote {
  emoji: string;
  en: string;
  mn: string;
}

export type EncourageKind = 'read' | 'correct' | 'wrong' | 'checked';

// The notes speak to a school student preparing for the exam: plain words, and what the work does for the exam
const NOTES: Record<EncourageKind, EncourageNote> = {
  read: {
    emoji: '📖',
    en: 'Good. Reading the topic is the first step of exam preparation.',
    mn: 'Сайн. Сэдвийн агуулгыг уншиж байгаа нь шалгалтад бэлтгэх анхны алхам.'
  },
  correct: {
    emoji: '⭐',
    en: 'Correct! You are spotting the key idea the exam asks for.',
    mn: 'Зөв! Шалгалтын асуултын гол санааг олж байна.'
  },
  wrong: {
    emoji: '💪',
    en: 'Good effort. Read the explanation, then try again: this is how exam marks go up.',
    mn: 'Сайн оролдлоо. Тайлбарыг уншаад дахин оролдоорой, шалгалтын оноо ингэж нэмэгддэг.'
  },
  checked: {
    emoji: '🎉',
    en: 'Check finished. Look at what you did well, then revise the weak parts before the exam.',
    mn: 'Шалгалтаа дуусгалаа. Сайн хийсэн хэсгээ харж, сул талаа шалгалтын өмнө давтаарай.'
  }
};

// Correct answers in a row during this visit; a wrong answer starts the count again
let correctInRow = 0;

const noteFor = (kind: EncourageKind): EncourageNote => {
  if (kind === 'wrong') correctInRow = 0;
  if (kind !== 'correct') return NOTES[kind];
  correctInRow += 1;
  if (correctInRow < 3 || correctInRow % 3 !== 0) return NOTES.correct;
  return {
    emoji: '🔥',
    en: `${correctInRow} correct in a row. Your exam technique is getting stronger.`,
    mn: `${correctInRow} удаа дараалан зөв. Шалгалтын арга барил сайжирч байна.`
  };
};

export const encourage = (kind: EncourageKind) => {
  window.dispatchEvent(new CustomEvent<EncourageNote>(ENCOURAGE_EVENT, { detail: noteFor(kind) }));
};
