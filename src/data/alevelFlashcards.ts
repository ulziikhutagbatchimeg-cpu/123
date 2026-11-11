import type { LeitnerCard } from '../types/chemistry';
import type { CourseChoice } from '../context/AppContext';
import type { GlossaryTerm } from './statesLessonSupport';
import { ALEVEL_GLOSSARY } from './alevelGlossary';
import { ALEVEL_CHAPTERS } from './alevelCurriculum';
import { ALEVEL_INQUIRY } from './alevelInquiry';
import { ALEVEL_LESSON_GLOSSARIES } from './lessonGlossaries';
import { chapterInCourse, chapterLevel } from './alevelSyllabus';
import { termKey, termSlug } from '../lib/termKey';

// The 9701 flashcards: every key word of a 9701 chapter, from its glossary, its lessons and its inquiry lesson, one card per
// word. The AS sites show the cards of chapters 1–22 and the A Level sites those of chapters 23–37. "Go to lesson" opens the
// chapter's first topic. The id holds the chapter number and the term, so a student's boxes stay with the right word.
export const ALEVEL_CARDS_KEY = 'chem_alevel_flashcards';

// The key words of a chapter, in the order they should win when a word is in more than one list
const chapterWords = (chapterId: string): GlossaryTerm[] => [
  ...(ALEVEL_GLOSSARY[chapterId] ?? []),
  ...Object.values(ALEVEL_LESSON_GLOSSARIES[chapterId] ?? {}).flat(),
  ...(ALEVEL_INQUIRY[chapterId]?.glossary ?? [])
];

// A word in two chapters of the same level is one card, in the first chapter; AS and A Level each have their own deck
const seen: Record<string, Set<string>> = { as: new Set(), a: new Set() };
export const ALEVEL_LEITNER_CARDS: LeitnerCard[] = ALEVEL_CHAPTERS.flatMap(chapter => {
  const n = chapter.id.replace('al-ch-', '');
  const used = seen[chapterLevel(chapter.id)];
  const ids = new Set<string>();
  return chapterWords(chapter.id)
    .filter(e => e.term.en && e.def.en)
    .filter(e => {
      const key = termKey(e.term.en);
      if (!key || used.has(key)) return false;
      used.add(key);
      return true;
    })
    .map((e): LeitnerCard => {
      let id = `al-lc-${n}-${termSlug(e.term.en)}`;
      while (ids.has(id)) id += '-2';
      ids.add(id);
      return {
        id,
        termEn: e.term.en,
        termMn: e.term.mn,
        definitionEn: e.def.en,
        definitionMn: e.def.mn,
        phonetic: '',
        topicId: chapter.topics[0]?.id ?? '',
        syllabusRef: `9701/${n}`,
        box: 1,
        lastReviewDate: Date.now() - 86400000 * 2,
        nextReviewDate: Date.now()
      };
    });
});

// The chapter of a 9701 card, from its id (al-lc-<chapter number>-<term>)
export const alevelCardChapter = (card: LeitnerCard): string => `al-ch-${card.id.split('-')[2]}`;

// The 9701 cards of the course being studied: AS Level or A Level
export const alevelCourseCards = (cards: LeitnerCard[], courseChoice: CourseChoice): LeitnerCard[] =>
  cards.filter(c => chapterInCourse(alevelCardChapter(c), courseChoice));
