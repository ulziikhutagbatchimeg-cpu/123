import type { LessonSeriesData } from '../components/LessonSeries';
import { bi, withStepSlides } from './latticeBuilders';
import { AS1_GLOSSARY_A, AS1_LESSONS_A, AS1_PRACTICE_A } from './asCh1LessonsA';
import { AS1_GLOSSARY_B, AS1_LESSONS_B, AS1_PRACTICE_B } from './asCh1LessonsB';
import { LATTICE_GLOSSARY_A, LATTICE_LESSONS_A, LATTICE_PRACTICE_A } from './latticeLessonsA';
import { LATTICE_GLOSSARY_B, LATTICE_LESSONS_B, LATTICE_PRACTICE_B } from './latticeLessonsB';
import { LATTICE_GLOSSARY_C, LATTICE_LESSONS_C, LATTICE_PRACTICE_C } from './latticeLessonsC';

// AS chapter 1: the slides of each step (lessons 1–2 deck 01, 3–5 deck 02), by the stage the deck's notes give the slide
const AS1_STEP_SLIDES: Record<number, Array<Array<[number, number]>>> = {
  // 01: opening…retrieval | element challenge, models, Rutherford, inside the atom | how empty, masses, table, distribution |
  // beams, simulation, deflections | you do beams
  1: [[[1, 4]], [[5, 8]], [[9, 12]], [[13, 15]], [[16, 16]]],
  // hinges, Z and A, worked example, you do | isotopes, same/different, why, symbols | ions…Ar | exam tips, MCQs, exam-style | summary, exit, reflection
  2: [[[17, 20]], [[21, 24]], [[25, 30]], [[31, 38]], [[39, 41]]],
  // 02: opening…retrieval | shells, sub-shells, we do | shapes, filling rules, quick-fire | writing, worked example, we do | you do, Cr/Cu, 19–36
  3: [[[1, 6]], [[7, 10]], [[11, 14]], [[15, 17]], [[18, 20]]],
  // 19–36, blocks, you do | boxes, unpaired, free radicals | ions, Fe3+, you do, hinges | IE1, equations, you do | four factors, which wins, successive IE
  4: [[[21, 23]], [[24, 28]], [[29, 32]], [[33, 35]], [[36, 38]]],
  // which group, data detective, you do | radii | IE trends, dips, Al < Mg, graphs | exam tips, MCQs, exam-style | summary, exit, reflection
  5: [[[39, 42]], [[43, 45]], [[46, 52]], [[53, 59]], [[60, 62]]]
};

// The lesson series of each 9701 chapter that has a deck, keyed by the app's chapter id. Chapter 23 holds the
// 12-lesson deck 9701_AL_Ch19_Lattice_Energy.pptx (lattice energy, Born–Haber cycles, solution and Group 2 trends).
export const ALEVEL_LESSON_SERIES: Record<string, LessonSeriesData> = {
  // AS chapter 1: 01_Ch1_Atomic_Structure (2 × 60 min) and 02_Ch2_Electrons_in_Atoms (3 × 60 min)
  'al-ch-1': {
    chapterId: 'al-ch-1',
    eyebrow: bi('AS 9701 · Бүлэг 1 · Атомын бүтэц', 'AS 9701 · Chapter 1 · Atomic structure'),
    title: bi('Атомын бүтэц ба атом дахь электрон', 'Atomic structure and electrons in atoms'),
    storageKey: 'alevel-ch1-exit-scores',
    lessons: [...AS1_LESSONS_A, ...AS1_LESSONS_B].map(l => withStepSlides(l, AS1_STEP_SLIDES[l.number])),
    glossary: { ...AS1_GLOSSARY_A, ...AS1_GLOSSARY_B },
    practice: { ...AS1_PRACTICE_A, ...AS1_PRACTICE_B }
  },
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
