import type { LessonSeriesData } from '../components/LessonSeries';
import { bi, withStepSlides } from './latticeBuilders';
import { IG2_GLOSSARY_A, IG2_LESSONS_A, IG2_PRACTICE_A } from './igcseCh2LessonsA';
import { IG2_GLOSSARY_B, IG2_LESSONS_B, IG2_PRACTICE_B } from './igcseCh2LessonsB';
import { IG3_GLOSSARY_A, IG3_LESSONS_A, IG3_PRACTICE_A } from './igcseCh3LessonsA';
import { IG3_GLOSSARY_B, IG3_LESSONS_B, IG3_PRACTICE_B } from './igcseCh3LessonsB';
import { IG4_GLOSSARY, IG4_LESSONS, IG4_PRACTICE } from './igcseCh4Lessons';
import { IG5_GLOSSARY, IG5_LESSONS, IG5_PRACTICE } from './igcseCh5Lessons';
import { IG6_GLOSSARY_A, IG6_LESSONS_A, IG6_PRACTICE_A } from './igcseCh6LessonsA';
import { IG6_GLOSSARY_B, IG6_LESSONS_B, IG6_PRACTICE_B } from './igcseCh6LessonsB';
import { IG6_GLOSSARY_C, IG6_LESSONS_C, IG6_PRACTICE_C } from './igcseCh6LessonsC';
import { IG7_GLOSSARY_A, IG7_LESSONS_A, IG7_PRACTICE_A } from './igcseCh7LessonsA';
import { IG7_GLOSSARY_B, IG7_LESSONS_B, IG7_PRACTICE_B } from './igcseCh7LessonsB';

// Chapter 7: the slides of each step (lessons 1–2 Ch11, 3–4 Ch12), by the stage the deck's notes give the slide
const IG7_STEP_SLIDES: Record<number, Array<Array<[number, number]>>> = {
  // Ch11: start + hook, plan | key terms, objectives, retrieval | indicators, pH, we do + explore | reactions of acids, we do | bases, hinge 1, proton transfer
  1: [[[1, 1], [22, 23]], [[2, 4]], [[5, 7], [24, 24]], [[8, 9]], [[10, 12]]],
  // strong and weak | you do | oxides, hinges 2–3 | exam, tips + evaluate, error clinic | summary, exit + concept map, self-check, value
  2: [[[13, 13]], [[14, 14]], [[15, 17]], [[18, 19], [25, 26]], [[20, 21], [27, 29]]],
  // Ch12: start + hook, plan | key terms, objectives, retrieval | solubility, we do, hydrated salts | method A, we do | titration, hinge 1, precipitation
  3: [[[1, 1], [21, 22]], [[2, 4]], [[5, 7]], [[8, 9]], [[10, 12]]],
  // we do precipitation + explore | choosing, you do | hinge 2 | exam, tips + evaluate, error clinic | summary, exit + concept map, self-check, value
  4: [[[13, 13], [23, 23]], [[14, 15]], [[16, 16]], [[17, 18], [24, 25]], [[19, 20], [26, 28]]]
};

// Chapter 6: the slides of each step (lessons 1–2 Ch08, 3–4 Ch09, 5–6 Ch10), by the stage the deck's notes give the slide
const IG6_STEP_SLIDES: Record<number, Array<Array<[number, number]>>> = {
  // Ch08: start + hook, plan | key terms, objectives, retrieval | measuring, graph | factors, surface area, cross, data | hinge 1, catalysts, collision theory
  1: [[[1, 1], [23, 24]], [[2, 4]], [[5, 6]], [[7, 10]], [[11, 13]]],
  // explaining factors + explore | you do | hinges 2–3, evaluating methods | exam, tips + evaluate, error clinic | summary, exit + concept map, self-check, value
  2: [[[14, 14], [25, 25]], [[15, 15]], [[16, 18]], [[19, 20], [26, 27]], [[21, 22], [28, 30]]],
  // Ch09: start + hook, plan | key terms, objectives, retrieval | reversible, water tests, hinge 1 | dynamic equilibrium + explore | conditions, we do
  3: [[[1, 1], [22, 23]], [[2, 4]], [[5, 7]], [[8, 8], [24, 24]], [[9, 10]]],
  // Haber + conditions | Contact, hinges 2–3 | fertilisers, you do | exam, tips + evaluate, error clinic | summary, exit + concept map, self-check, value
  4: [[[11, 12]], [[13, 15]], [[16, 17]], [[18, 19], [25, 26]], [[20, 21], [27, 29]]],
  // Ch10: start + hook, plan | key terms, objectives, retrieval | oxygen, we do, Roman numerals | hinge 1, OIL RIG + explore | oxidation numbers, we do, agents
  5: [[[1, 1], [21, 22]], [[2, 4]], [[5, 7]], [[8, 9], [23, 23]], [[10, 12]]],
  // colour tests | you do | hinges 2–3 | exam, tips + evaluate, error clinic | summary, exit + concept map, self-check, value
  6: [[[13, 13]], [[14, 14]], [[15, 16]], [[17, 18], [24, 25]], [[19, 20], [26, 28]]]
};

// Chapter 5: the slides of each step of the Ch07 deck, by the stage its notes give the slide
const IG5_STEP_SLIDES: Record<number, Array<Array<[number, number]>>> = {
  // start + hook, plan | key terms, objectives, retrieval, changes | exo/endo, we do | pathway diagrams, hinge 1, you do + explore | bonds, worked example
  1: [[[1, 1], [22, 23]], [[2, 5]], [[6, 7]], [[8, 11], [24, 24]], [[12, 13]]],
  // we do | you do | hinges 2–3 | exam practice, tips + evaluate, error clinic | summary, exit + concept map, self-check, value
  2: [[[14, 14]], [[15, 15]], [[16, 17]], [[18, 19], [25, 26]], [[20, 21], [27, 29]]]
};

// Chapter 4: the slides of each step of the Ch06 deck, by the stage its notes give the slide
const IG4_STEP_SLIDES: Record<number, Array<Array<[number, number]>>> = {
  // start + hook, plan | key words, criteria, retrieval | conductivity, cell, sorter | PbBr₂ lab, half-equations | predict molten
  1: [[[1, 1], [26, 27]], [[2, 5]], [[6, 8]], [[9, 10]], [[11, 11]]],
  // which ions win | brine, H₂SO₄, virtual lab | name the products + explore | CuSO₄, practical | electroplating, hinges
  2: [[[12, 12]], [[13, 14]], [[15, 15], [28, 28]], [[16, 17]], [[18, 19]]],
  // fuel cells | marks lost + evaluate, error clinic | Paper 1/2 | Paper 3/4 | summary, exit + concept map, self-check, value
  3: [[[20, 20]], [[21, 21], [29, 30]], [[22, 22]], [[23, 23]], [[24, 25], [31, 33]]]
};

// Chapter 3: the slides of each step, by the stage the deck's notes give the slide. Lessons 1–4 are Ch04 slides,
// lessons 5–9 Ch05 slides; the review slides (hook, plan, explore, evaluate, error clinic, concept map, self-check,
// value) go to the first or last lesson of their deck, or to the step they explore.
const IG3_STEP_SLIDES: Record<number, Array<Array<[number, number]>>> = {
  // Ch04: start + hook, plan | key words, criteria, retrieval | naming | covalent formulae | formula from a diagram
  1: [[[1, 1], [29, 30]], [[2, 5]], [[6, 7]], [[8, 8]], [[9, 9]]],
  // ion charges | worked formulae | formula machine | word → balanced equation + explore | balance these, state symbols
  2: [[[10, 10]], [[11, 11]], [[12, 12]], [[13, 14], [31, 31]], [[15, 16]]],
  // ionic equations | virtual lab | full and ionic | Ar, Mr, reacting masses | practical
  3: [[[17, 17]], [[18, 18]], [[19, 19]], [[20, 21]], [[22, 22]]],
  // hinges | marks lost + evaluate, error clinic | Paper 1/2 | Paper 3/4 | summary, exit + concept map, self-check, value
  4: [[[23, 23]], [[24, 24], [32, 33]], [[25, 25]], [[26, 26]], [[27, 28], [34, 36]]],
  // Ch05: start + hook, plan | key words, criteria, retrieval | formula → mole, simple proportion | the mole | practice
  5: [[[1, 1], [38, 39]], [[2, 4]], [[5, 6]], [[7, 8]], [[9, 10]]],
  // empirical method | molecular, hydrated | you do | footbridge | 4-step method
  6: [[[11, 11]], [[12, 12]], [[13, 14]], [[15, 15]], [[16, 16]]],
  // limiting simulator + explore | which is limiting | extra practice | percentages | percentages practice
  7: [[[17, 17], [40, 40]], [[18, 18]], [[19, 19]], [[20, 20]], [[21, 22]]],
  // gases | gas worked example + practice | concentration | titration + virtual lab | extra practice
  8: [[[23, 23]], [[24, 26]], [[27, 28]], [[29, 30]], [[31, 31]]],
  // hinges | marks lost + evaluate, error clinic | Paper 4 (1) | Paper 4 (2) | mole map, exit + concept map, self-check, value
  9: [[[32, 32]], [[33, 33], [41, 42]], [[34, 34]], [[35, 35]], [[36, 37], [43, 45]]]
};

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
  },
  // Chapter 3: Ch04_Formulae_and_Equations (4 lessons) and Ch05_Chemical_Calculations (5 lessons), 60 minutes each
  'ch-stoichiometry': {
    chapterId: 'ch-stoichiometry',
    eyebrow: bi('IGCSE 0620 · Бүлэг 3 · Стехиометр', 'IGCSE 0620 · Chapter 3 · Stoichiometry'),
    title: bi('Томьёо, тэгшитгэл ба химийн тооцоо', 'Formulae, equations and chemical calculations'),
    storageKey: 'igcse-ch3-exit-scores',
    lessons: [...IG3_LESSONS_A, ...IG3_LESSONS_B].map(l => withStepSlides(l, IG3_STEP_SLIDES[l.number])),
    glossary: { ...IG3_GLOSSARY_A, ...IG3_GLOSSARY_B },
    practice: { ...IG3_PRACTICE_A, ...IG3_PRACTICE_B }
  },
  // Chapter 4: Ch06_Electrochemistry, three 60-minute lessons
  'ch-electrochemistry': {
    chapterId: 'ch-electrochemistry',
    eyebrow: bi('IGCSE 0620 · Бүлэг 4 · Электрохими', 'IGCSE 0620 · Chapter 4 · Electrochemistry'),
    title: bi('Электролиз ба түлшний элемент', 'Electrolysis and fuel cells'),
    storageKey: 'igcse-ch4-exit-scores',
    lessons: IG4_LESSONS.map(l => withStepSlides(l, IG4_STEP_SLIDES[l.number])),
    glossary: IG4_GLOSSARY,
    practice: IG4_PRACTICE
  },
  // Chapter 5: Ch07_Chemical_energetics, two 40-minute lessons
  'ch-energetics': {
    chapterId: 'ch-energetics',
    eyebrow: bi('IGCSE 0620 · Бүлэг 5 · Химийн энергетик', 'IGCSE 0620 · Chapter 5 · Chemical energetics'),
    title: bi('Экзотерм, эндотерм урвал ба холбооны энерги', 'Exothermic and endothermic reactions and bond energies'),
    storageKey: 'igcse-ch5-exit-scores',
    lessons: IG5_LESSONS.map(l => withStepSlides(l, IG5_STEP_SLIDES[l.number])),
    glossary: IG5_GLOSSARY,
    practice: IG5_PRACTICE
  },
  // Chapter 6: Ch08 rates, Ch09 equilibrium and Ch10 redox, two 40-minute lessons each
  'ch-reactions': {
    chapterId: 'ch-reactions',
    eyebrow: bi('IGCSE 0620 · Бүлэг 6 · Химийн урвал', 'IGCSE 0620 · Chapter 6 · Chemical reactions'),
    title: bi('Урвалын хурд, тэнцвэр ба исэлдэлт-бууралт', 'Rates, equilibrium and redox'),
    storageKey: 'igcse-ch6-exit-scores',
    lessons: [...IG6_LESSONS_A, ...IG6_LESSONS_B, ...IG6_LESSONS_C].map(l => withStepSlides(l, IG6_STEP_SLIDES[l.number])),
    glossary: { ...IG6_GLOSSARY_A, ...IG6_GLOSSARY_B, ...IG6_GLOSSARY_C },
    practice: { ...IG6_PRACTICE_A, ...IG6_PRACTICE_B, ...IG6_PRACTICE_C }
  },
  // Chapter 7: Ch11 acids and bases, Ch12 preparation of salts, two 40-minute lessons each
  'ch-acids-bases': {
    chapterId: 'ch-acids-bases',
    eyebrow: bi('IGCSE 0620 · Бүлэг 7 · Хүчил, суурь ба давс', 'IGCSE 0620 · Chapter 7 · Acids, bases and salts'),
    title: bi('Хүчил, суурь ба давс бэлтгэх', 'Acids, bases and preparing salts'),
    storageKey: 'igcse-ch7-exit-scores',
    lessons: [...IG7_LESSONS_A, ...IG7_LESSONS_B].map(l => withStepSlides(l, IG7_STEP_SLIDES[l.number])),
    glossary: { ...IG7_GLOSSARY_A, ...IG7_GLOSSARY_B },
    practice: { ...IG7_PRACTICE_A, ...IG7_PRACTICE_B }
  }
};
