import type { LessonSeriesData } from '../components/LessonSeries';
import { bi, withStepSlides } from './latticeBuilders';
import { IG2_GLOSSARY_A, IG2_LESSONS_A, IG2_PRACTICE_A } from './igcseCh2LessonsA';
import { IG2_GLOSSARY_B, IG2_LESSONS_B, IG2_PRACTICE_B } from './igcseCh2LessonsB';

// Chapter 2: the slides of each step, by the stage each deck's notes give the slide (start, retrieval, I do, we do,
// you do, hinge, exam, exit). The extra slides at the end of each deck (hook, plan, explore, evaluate, error clinic,
// concept map, self-check, value) go to the step they belong to.
const IG2_STEP_SLIDES: Record<number, Array<Array<[number, number]>>> = {
  // Ch02 slides 1–14: start, key terms, objectives, retrieval | I do | we do + hinge 1 | isotopes, Ar, you do | hinge 2
  1: [[[1, 4]], [[5, 6]], [[7, 8]], [[9, 13]], [[14, 14]]],
  // Ch02 slides 15–30: hook + plan | shells, Periodic Table, explore | you do + hinge 3 | exam, tips, evaluate, error
  // clinic | summary, exit ticket, concept map, self-check, value
  2: [[[23, 24]], [[15, 16], [25, 25]], [[17, 18]], [[19, 20], [26, 27]], [[21, 22], [28, 30]]],
  // Ch03 L1 covalent: start…retrieval + hook, plan | mixtures, shared pair, explore | dot-and-cross | properties +
  // hinges | tips, summary, exit, evaluate…value
  3: [[[1, 4], [22, 23]], [[5, 7], [24, 24]], [[8, 13]], [[14, 18]], [[19, 21], [25, 29]]],
  // Ch03 L2 ionic: start…retrieval + hook, plan | ions, NaCl, explore | LiF, MgO, you do | lattice, properties |
  // hinges, tips, summary, exit, evaluate…value
  4: [[[1, 4], [21, 22]], [[5, 7], [23, 23]], [[8, 10]], [[11, 14]], [[15, 20], [24, 28]]],
  // Ch03 L3 giant: start…retrieval + hook, plan | giant, diamond, graphite, explore | table, uses, SiO₂ | metals,
  // four structures | hinges, tips, summary, exit, evaluate…value
  5: [[[1, 4], [22, 23]], [[5, 7], [24, 24]], [[8, 11]], [[12, 15]], [[16, 21], [25, 29]]]
};

// The lesson series of each IGCSE 0620 chapter, keyed by the app's chapter id, laid out as the 9701 lattice-energy
// lessons. Each series is built only from that chapter's decks; the decks decide how many 40-minute lessons there are.
// (Chapter 1, states of matter, keeps its own interactive lessons.)
export const IGCSE_LESSON_SERIES: Record<string, LessonSeriesData> = {
  // Chapter 2: Ch02_Atomic_structure (2 lessons) and Ch03 L1–L3 (one lesson each)
  'ch-atoms-bonding': {
    chapterId: 'ch-atoms-bonding',
    eyebrow: bi('IGCSE 0620 · Бүлэг 2 · Атом ба холбоо', 'IGCSE 0620 · Chapter 2 · Atoms and bonding'),
    title: bi('Атом, элемент ба химийн холбоо', 'Atoms, elements and chemical bonding'),
    storageKey: 'igcse-ch2-exit-scores',
    lessons: [...IG2_LESSONS_A, ...IG2_LESSONS_B].map(l => withStepSlides(l, IG2_STEP_SLIDES[l.number])),
    glossary: { ...IG2_GLOSSARY_A, ...IG2_GLOSSARY_B },
    practice: { ...IG2_PRACTICE_A, ...IG2_PRACTICE_B }
  }
};
