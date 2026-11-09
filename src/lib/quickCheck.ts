import type { QuizItem, StatesLesson } from '../data/statesLessons';
import type { GlossaryTerm } from '../data/statesLessonSupport';
import { QUICK_CHECKS } from '../data/statesLessonExtras';

// The quick check of a lesson, taken in step 3 before the student moves on. IGCSE chapter 1 has hand-written questions.
// Every other lesson gets up to three questions from its own key words: each asks what a key word means. The right answer is
// the word's meaning from the lesson; the wrong answers are the meanings of the other key words of the same chapter, so every
// option is a real chemistry definition and only one fits the word.

const hash = (text: string): number => {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
};

const rotate = <T,>(list: T[], by: number): T[] => (list.length ? list.slice(by % list.length).concat(list.slice(0, by % list.length)) : list);

const key = (t: GlossaryTerm) => t.def.en.trim().toLowerCase();

export const quickCheckFor = (lesson: StatesLesson, glossary: Record<string, GlossaryTerm[]>): QuizItem[] => {
  const written = QUICK_CHECKS[lesson.id];
  if (written && written.length > 0) return written;

  const own = (glossary[lesson.id] ?? []).filter(t => t.term.en && t.def.en);
  if (own.length === 0) return [];
  // The chapter's key words, each meaning once
  const seen = new Set<string>();
  const pool = Object.values(glossary)
    .flat()
    .filter(t => {
      if (!t.def.en || seen.has(key(t))) return false;
      seen.add(key(t));
      return true;
    });

  return own.slice(0, 3).flatMap((word, n) => {
    const h = hash(`${lesson.id}#${n}`);
    const others = pool.filter(t => key(t) !== key(word));
    // The lesson's own other words come first, as they are the closest wrong answers; then the rest of the chapter
    const near = others.filter(t => own.some(o => key(o) === key(t)));
    const far = rotate(others.filter(t => !own.some(o => key(o) === key(t))), h);
    const wrong = [...near, ...far].slice(0, 3);
    if (wrong.length === 0) return [];
    const options = wrong.map(t => t.def);
    const answer = h % (options.length + 1);
    options.splice(answer, 0, word.def);
    return [
      {
        question: {
          en: `Which statement gives the meaning of “${word.term.en}”?`,
          mn: `«${word.term.mn}» гэдгийн утгыг аль нь зөв хэлсэн бэ?`
        },
        options,
        answer,
        explanation: {
          en: `${word.term.en}: ${word.def.en}`,
          mn: `${word.term.mn}: ${word.def.mn}`
        }
      }
    ];
  });
};
