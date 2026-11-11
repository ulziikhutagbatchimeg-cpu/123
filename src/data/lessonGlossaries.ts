// The key words of every lesson, by chapter and then by lesson. The lesson series show them in their glossary, and the
// flashcards take every one of them, so a word met in a lesson is always in the deck.
import type { GlossaryTerm } from './statesLessonSupport';
import { STATES_GLOSSARY } from './statesLessonSupport';
import { IG2_GLOSSARY_A } from './igcseCh2LessonsA';
import { IG2_GLOSSARY_B } from './igcseCh2LessonsB';
import { IG3_GLOSSARY_A } from './igcseCh3LessonsA';
import { IG3_GLOSSARY_B } from './igcseCh3LessonsB';
import { IG4_GLOSSARY } from './igcseCh4Lessons';
import { IG5_GLOSSARY } from './igcseCh5Lessons';
import { IG6_GLOSSARY_A } from './igcseCh6LessonsA';
import { IG6_GLOSSARY_B } from './igcseCh6LessonsB';
import { IG6_GLOSSARY_C } from './igcseCh6LessonsC';
import { IG7_GLOSSARY_A } from './igcseCh7LessonsA';
import { IG7_GLOSSARY_B } from './igcseCh7LessonsB';
import { IG8_GLOSSARY } from './igcseCh8Lessons';
import { IG9_GLOSSARY_A } from './igcseCh9LessonsA';
import { IG9_GLOSSARY_B } from './igcseCh9LessonsB';
import { IG9_GLOSSARY_C } from './igcseCh9LessonsC';
import { IG10_GLOSSARY } from './igcseCh10Lessons';
import { IG11_GLOSSARY_A } from './igcseCh11LessonsA';
import { IG11_GLOSSARY_B } from './igcseCh11LessonsB';
import { IG11_GLOSSARY_C } from './igcseCh11LessonsC';
import { IG12_GLOSSARY_A } from './igcseCh12LessonsA';
import { IG12_GLOSSARY_B } from './igcseCh12LessonsB';
import { AS1_GLOSSARY_A } from './asCh1LessonsA';
import { AS1_GLOSSARY_B } from './asCh1LessonsB';
import { AS2_GLOSSARY_A } from './asCh2LessonsA';
import { AS2_GLOSSARY_B } from './asCh2LessonsB';
import { AS2_GLOSSARY_C } from './asCh2LessonsC';
import { AS3_GLOSSARY_A } from './asCh3LessonsA';
import { AS3_GLOSSARY_B } from './asCh3LessonsB';
import { AS9_GLOSSARY_A } from './asCh9LessonsA';
import { AS9_GLOSSARY_B } from './asCh9LessonsB';
import { LATTICE_GLOSSARY_A } from './latticeLessonsA';
import { LATTICE_GLOSSARY_B } from './latticeLessonsB';
import { LATTICE_GLOSSARY_C } from './latticeLessonsC';

type ChapterGlossary = Record<string, GlossaryTerm[]>; // lesson id → its key words

// IGCSE 0620: chapter 1 keeps its own four lessons; chapters 2–12 are the lesson series
export const IGCSE_LESSON_GLOSSARIES: Record<string, ChapterGlossary> = {
  'ch-states-of-matter': STATES_GLOSSARY,
  'ch-atoms-bonding': { ...IG2_GLOSSARY_A, ...IG2_GLOSSARY_B },
  'ch-stoichiometry': { ...IG3_GLOSSARY_A, ...IG3_GLOSSARY_B },
  'ch-electrochemistry': IG4_GLOSSARY,
  'ch-energetics': IG5_GLOSSARY,
  'ch-reactions': { ...IG6_GLOSSARY_A, ...IG6_GLOSSARY_B, ...IG6_GLOSSARY_C },
  'ch-acids-bases': { ...IG7_GLOSSARY_A, ...IG7_GLOSSARY_B },
  'ch-periodic-table': IG8_GLOSSARY,
  'ch-metals': { ...IG9_GLOSSARY_A, ...IG9_GLOSSARY_B, ...IG9_GLOSSARY_C },
  'ch-environment': IG10_GLOSSARY,
  'ch-organic': { ...IG11_GLOSSARY_A, ...IG11_GLOSSARY_B, ...IG11_GLOSSARY_C },
  'ch-experimental-analysis': { ...IG12_GLOSSARY_A, ...IG12_GLOSSARY_B }
};

// AS & A Level 9701: the chapters that have a lesson series
export const ALEVEL_LESSON_GLOSSARIES: Record<string, ChapterGlossary> = {
  'al-ch-1': { ...AS1_GLOSSARY_A, ...AS1_GLOSSARY_B },
  'al-ch-2': { ...AS2_GLOSSARY_A, ...AS2_GLOSSARY_B, ...AS2_GLOSSARY_C },
  'al-ch-3': { ...AS3_GLOSSARY_A, ...AS3_GLOSSARY_B },
  'al-ch-9': { ...AS9_GLOSSARY_A, ...AS9_GLOSSARY_B },
  'al-ch-23': { ...LATTICE_GLOSSARY_A, ...LATTICE_GLOSSARY_B, ...LATTICE_GLOSSARY_C }
};
