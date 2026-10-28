import type { LessonSeriesData } from '../components/LessonSeries';
import { bi, withStepSlides } from './latticeBuilders';
import { AS1_GLOSSARY_A, AS1_LESSONS_A, AS1_PRACTICE_A } from './asCh1LessonsA';
import { AS1_GLOSSARY_B, AS1_LESSONS_B, AS1_PRACTICE_B } from './asCh1LessonsB';
import { AS2_GLOSSARY_A, AS2_LESSONS_A, AS2_PRACTICE_A } from './asCh2LessonsA';
import { AS2_GLOSSARY_B, AS2_LESSONS_B, AS2_PRACTICE_B } from './asCh2LessonsB';
import { AS2_GLOSSARY_C, AS2_LESSONS_C, AS2_PRACTICE_C } from './asCh2LessonsC';
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

// AS chapter 2: the slides of each step (lessons 1–4 deck 03, 5 deck 03a, 6 deck 03b), by the stage the notes give the slide
const AS2_STEP_SLIDES: Record<number, Array<Array<[number, number]>>> = {
  // 03: opening…retrieval | relative masses, Mr, lab, you do | spectrometer, neon, Ge/Zr | fragments, ethanoic acid, [M+1], [M+2] | decode, hinges
  1: [[[1, 6]], [[7, 10]], [[11, 13]], [[14, 17]], [[18, 19]]],
  // mole, n = m/M, you do | reacting masses, limiting, you do | s.f. and %, yield | formulae, P oxide, you do | hinges
  2: [[[20, 22]], [[23, 25]], [[26, 27]], [[28, 30]], [[31, 31]]],
  // ions, build the formula | balancing, state symbols | ionic equations | you do | hinges
  3: [[[32, 33]], [[34, 35]], [[36, 36]], [[37, 37]], [[38, 38]]],
  // concentration, you do | titration lab, worked example, stoichiometry | gas volume, gases, hinges | tips, spot the error, Paper 2 | summary, exit
  4: [[[39, 40]], [[41, 43]], [[44, 46]], [[47, 52]], [[53, 55]]],
  // 03a: opening, how to, all problems | easy 1–5 | medium 1–5 | hard 1–5 | answer key
  5: [[[1, 3]], [[4, 8]], [[9, 13]], [[14, 18]], [[19, 19]]],
  // 03b: opening, how to, all problems | E1–E6 | M1–M7 | H1–H7 | answer key
  6: [[[1, 4]], [[5, 10]], [[11, 17]], [[18, 24]], [[25, 25]]]
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
  // AS chapter 2: 03_Ch3_Atoms_Molecules_Stoichiometry (4 × 60 min) and the two problem sets 03a, 03b (60 min each)
  'al-ch-2': {
    chapterId: 'al-ch-2',
    eyebrow: bi('AS 9701 · Бүлэг 2 · Атом, молекул ба стехиометр', 'AS 9701 · Chapter 2 · Atoms, molecules and stoichiometry'),
    title: bi('Масс, моль, томьёо, уусмал ба хий', 'Masses, moles, formulae, solutions and gases'),
    storageKey: 'alevel-ch2-exit-scores',
    lessons: [...AS2_LESSONS_A, ...AS2_LESSONS_B, ...AS2_LESSONS_C].map(l => withStepSlides(l, AS2_STEP_SLIDES[l.number])),
    glossary: { ...AS2_GLOSSARY_A, ...AS2_GLOSSARY_B, ...AS2_GLOSSARY_C },
    practice: { ...AS2_PRACTICE_A, ...AS2_PRACTICE_B, ...AS2_PRACTICE_C }
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
