import type { LeitnerCard } from '../types/chemistry';
import type { CourseChoice } from '../context/AppContext';
import { ALEVEL_GLOSSARY } from './alevelGlossary';
import { ALEVEL_CHAPTERS } from './alevelCurriculum';
import { chapterInCourse } from './alevelSyllabus';

// The 9701 flashcards: every key term of the 9701 glossary, chapter by chapter, as the 0620 key words are for IGCSE.
// The AS sites show the cards of chapters 1–22 and the A Level sites those of chapters 23–37. "Go to lesson" opens the
// chapter's first topic. The id holds the chapter number and the term, so a student's boxes stay with the right word.
export const ALEVEL_CARDS_KEY = 'chem_alevel_flashcards';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const ALEVEL_LEITNER_CARDS: LeitnerCard[] = Object.entries(ALEVEL_GLOSSARY).flatMap(([chapterId, list]) => {
  const n = chapterId.replace('al-ch-', '');
  const chapter = ALEVEL_CHAPTERS.find(c => c.id === chapterId);
  const seen = new Set<string>();
  return list
    .filter(e => e.term.en && e.def.en)
    .filter(e => {
      const key = slug(e.term.en);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(
      (e): LeitnerCard => ({
        id: `al-lc-${n}-${slug(e.term.en)}`,
        termEn: e.term.en,
        termMn: e.term.mn,
        definitionEn: e.def.en,
        definitionMn: e.def.mn,
        phonetic: '',
        topicId: chapter?.topics[0]?.id ?? '',
        syllabusRef: `9701/${n}`,
        box: 1,
        lastReviewDate: Date.now() - 86400000 * 2,
        nextReviewDate: Date.now()
      })
    );
});

// The chapter of a 9701 card, from its id (al-lc-<chapter number>-<term>)
export const alevelCardChapter = (card: LeitnerCard): string => `al-ch-${card.id.split('-')[2]}`;

// The 9701 cards of the course being studied: AS Level or A Level
export const alevelCourseCards = (cards: LeitnerCard[], courseChoice: CourseChoice): LeitnerCard[] =>
  cards.filter(c => chapterInCourse(alevelCardChapter(c), courseChoice));
