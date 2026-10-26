import type { LessonSeriesData } from '../components/LessonSeries';
import { bi } from './latticeBuilders';
import { LATTICE_GLOSSARY_A, LATTICE_LESSONS_A, LATTICE_PRACTICE_A } from './latticeLessonsA';
import { LATTICE_GLOSSARY_B, LATTICE_LESSONS_B, LATTICE_PRACTICE_B } from './latticeLessonsB';
import { LATTICE_GLOSSARY_C, LATTICE_LESSONS_C, LATTICE_PRACTICE_C } from './latticeLessonsC';

// The lesson series of each 9701 chapter that has a deck, keyed by the app's chapter id. Chapter 23 holds the
// 12-lesson deck 9701_AL_Ch19_Lattice_Energy.pptx (lattice energy, Born–Haber cycles, solution and Group 2 trends).
export const ALEVEL_LESSON_SERIES: Record<string, LessonSeriesData> = {
  'al-ch-23': {
    chapterId: 'al-ch-23',
    eyebrow: bi('AS & A Level 9701 · Ch19 · Торын энерги', 'AS & A Level 9701 · Ch19 · Lattice energy'),
    title: bi('Торын энерги ба Борн–Хабер мөчлөг', 'Lattice energy and Born–Haber cycles'),
    storageKey: 'alevel-ch23-exit-scores',
    lessons: [...LATTICE_LESSONS_A, ...LATTICE_LESSONS_B, ...LATTICE_LESSONS_C],
    glossary: { ...LATTICE_GLOSSARY_A, ...LATTICE_GLOSSARY_B, ...LATTICE_GLOSSARY_C },
    practice: { ...LATTICE_PRACTICE_A, ...LATTICE_PRACTICE_B, ...LATTICE_PRACTICE_C }
  }
};
