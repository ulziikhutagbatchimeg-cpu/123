// A short, friendly note for the moments of the student's work: a topic read, a question answered, a check finished.
// Any part of the app can send one; the Encourager on the page shows it for a moment and then lets it fade.
export const ENCOURAGE_EVENT = 'chem-encourage';

export interface EncourageNote {
  emoji: string;
  en: string;
  mn: string;
}

export type EncourageKind = 'read' | 'correct' | 'wrong' | 'checked';

const NOTES: Record<EncourageKind, EncourageNote> = {
  read: { emoji: '📖', en: 'Nice, you are reading!', mn: 'Сайн уншиж байна!' },
  correct: { emoji: '⭐', en: 'Correct!', mn: 'Зөв!' },
  wrong: { emoji: '💪', en: 'Good try. Read the explanation, then try again.', mn: 'Сайн оролдлоо. Тайлбарыг уншаад дахин оролдоорой.' },
  checked: { emoji: '🎉', en: 'Well done for finishing the check!', mn: 'Шалгалтаа дуусгасанд баяр хүргэе!' }
};

export const encourage = (kind: EncourageKind) => {
  window.dispatchEvent(new CustomEvent<EncourageNote>(ENCOURAGE_EVENT, { detail: NOTES[kind] }));
};
