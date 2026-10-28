// The PowerPoint decks of the courses, grouped by the app's chapter id. The files are served from
// public/slides/<course>/. deckNo is the chapter number in the deck set, so a chapter can have several decks. lessonSlides
// maps each lesson to its slides when one deck holds several lessons (the IGCSE chapter 1 decks).

export interface SlideDeck {
  file: string;
  deckNo: string;
  titleEn: string;
  titleMn: string;
  slides: number;
  lessonSlides?: Array<{ lesson: number; from: number; to: number }>;
  course?: string; // the course folder the deck belongs to; igcse-0620 when left out
}

// A run of slides from one deck. from and to are slide numbers, both included.
export interface SlidePart {
  deck: SlideDeck;
  from: number;
  to: number;
}

export const courseOf = (deck: SlideDeck): string => deck.course ?? 'igcse-0620';

export const deckTitle = (deck: SlideDeck, mn: boolean): string => (mn ? deck.titleMn : deck.titleEn);

// Identifies a list of slide parts, so a viewer can be reset when its slides change
export const partsKey = (parts: SlidePart[]): string =>
  parts.map(p => `${courseOf(p.deck)}/${p.deck.file}:${p.from}-${p.to}`).join('|');

// The slides of one step as text for its tab, for example "slides 4–7" or "slides 01 1–13, 02 1–3"
export const slideRangeLabel = (parts: SlidePart[], mn: boolean): string => {
  const word = mn ? 'слайд' : 'slides';
  if (parts.length === 0) return mn ? 'слайдгүй' : 'no slides';
  const range = (p: SlidePart) => (p.from === p.to ? `${p.from}` : `${p.from}–${p.to}`);
  const oneDeck = new Set(parts.map(p => p.deck.file)).size === 1;
  return `${word} ${parts.map(p => (oneDeck ? range(p) : `${p.deck.deckNo} ${range(p)}`)).join(', ')}`;
};

// The five steps of a 40-minute lesson in minutes (5, 10, 10, 9, 6). A lesson's slides are shared out in this proportion.
export const LESSON_STEP_MINUTES = [5, 10, 10, 9, 6];

// The five blocks of the 0620 chapter 1 lessons, on the minutes of the Excel timeline (0-6, 6-16, 16-26, 26-34, 34-40)
export const STATES_STEP_MINUTES = [6, 10, 10, 8, 6];

const ALEVEL = 'alevel-9701';

export const CHAPTER_SLIDES: Record<string, SlideDeck[]> = {
  // The 9701 Ch19 deck (lattice energy, Born–Haber cycles, solution and Group 2 trends): 12 lessons of 40 minutes
  'al-ch-23': [
    {
      file: '9701_AL_Ch19_Lattice_Energy.pptx',
      deckNo: '19',
      titleEn: 'Lattice energy and Born–Haber cycles',
      titleMn: 'Торын энерги ба Борн–Хабер мөчлөг',
      slides: 74,
      course: 'alevel-9701',
      lessonSlides: [
        { lesson: 1, from: 2, to: 12 },
        { lesson: 2, from: 13, to: 18 },
        { lesson: 3, from: 19, to: 23 },
        { lesson: 4, from: 24, to: 29 },
        { lesson: 5, from: 30, to: 33 },
        { lesson: 6, from: 34, to: 38 },
        { lesson: 7, from: 39, to: 43 },
        { lesson: 8, from: 44, to: 49 },
        { lesson: 9, from: 50, to: 54 },
        { lesson: 10, from: 55, to: 60 },
        { lesson: 11, from: 61, to: 65 },
        { lesson: 12, from: 66, to: 74 }
      ]
    }
  ],
  'ch-states-of-matter': [
    {
      file: 'Ch01_States_of_matter.pptx',
      deckNo: '01',
      titleEn: 'States of matter',
      titleMn: 'Бодисын төлөв',
      slides: 33,
      lessonSlides: [
        { lesson: 1, from: 4, to: 7 },
        { lesson: 2, from: 8, to: 15 },
        { lesson: 3, from: 16, to: 17 },
        { lesson: 4, from: 18, to: 21 }
      ]
    }
  ],
  // Five 40-minute lessons: the Ch02 deck holds lessons 1–2 (its notes: slides 1–14 and 15 on); each Ch03 deck is one lesson
  'ch-atoms-bonding': [
    {
      file: 'Ch02_Atomic_structure.pptx',
      deckNo: '02',
      titleEn: 'Atomic structure',
      titleMn: 'Атомын бүтэц',
      slides: 30,
      lessonSlides: [
        { lesson: 1, from: 1, to: 14 },
        { lesson: 2, from: 15, to: 30 }
      ]
    },
    {
      file: 'Ch03_L1_Covalent_bonding.pptx',
      deckNo: '03 · L1',
      titleEn: 'Covalent bonding',
      titleMn: 'Ковалент холбоо',
      slides: 29,
      lessonSlides: [{ lesson: 3, from: 1, to: 29 }]
    },
    {
      file: 'Ch03_L2_Ionic_bonding.pptx',
      deckNo: '03 · L2',
      titleEn: 'Ionic bonding',
      titleMn: 'Ионы холбоо',
      slides: 28,
      lessonSlides: [{ lesson: 4, from: 1, to: 28 }]
    },
    {
      file: 'Ch03_L3_Giant_structures.pptx',
      deckNo: '03 · L3',
      titleEn: 'Giant structures',
      titleMn: 'Том бүтэцтэй бодисууд',
      slides: 29,
      lessonSlides: [{ lesson: 5, from: 1, to: 29 }]
    }
  ],
  // Nine 60-minute lessons, on the plan in each deck's notes: Ch04 holds lessons 1–4, Ch05 lessons 5–9.
  // The last lesson of each deck also takes its review slides (Ch04 29–36, Ch05 38–45).
  'ch-stoichiometry': [
    {
      file: 'Ch04_Formulae_and_Equations.pptx',
      deckNo: '04',
      titleEn: 'Formulae and equations',
      titleMn: 'Томьёо ба урвалын тэгшитгэл',
      slides: 36,
      lessonSlides: [
        { lesson: 1, from: 1, to: 9 },
        { lesson: 2, from: 10, to: 16 },
        { lesson: 3, from: 17, to: 22 },
        { lesson: 4, from: 23, to: 36 }
      ]
    },
    {
      file: 'Ch05_Chemical_Calculations.pptx',
      deckNo: '05',
      titleEn: 'Chemical calculations',
      titleMn: 'Химийн тооцоо',
      slides: 45,
      lessonSlides: [
        { lesson: 5, from: 1, to: 10 },
        { lesson: 6, from: 11, to: 16 },
        { lesson: 7, from: 17, to: 22 },
        { lesson: 8, from: 23, to: 31 },
        { lesson: 9, from: 32, to: 45 }
      ]
    }
  ],
  // Three 60-minute lessons, on the plan in the deck's notes (1–11, 12–19, 20–25); the last takes the review slides 26–33
  'ch-electrochemistry': [
    {
      file: 'Ch06_Electrochemistry.pptx',
      deckNo: '06',
      titleEn: 'Electrochemistry',
      titleMn: 'Электрохими',
      slides: 33,
      lessonSlides: [
        { lesson: 1, from: 1, to: 11 },
        { lesson: 2, from: 12, to: 19 },
        { lesson: 3, from: 20, to: 33 }
      ]
    }
  ],
  // Two 40-minute lessons, on the plan in the deck's notes (1–13, 14 on); the second takes the review slides 22–29
  'ch-energetics': [
    {
      file: 'Ch07_Chemical_energetics.pptx',
      deckNo: '07',
      titleEn: 'Chemical energetics',
      titleMn: 'Химийн энергетик',
      slides: 29,
      lessonSlides: [
        { lesson: 1, from: 1, to: 13 },
        { lesson: 2, from: 14, to: 29 }
      ]
    }
  ],
  // Six 40-minute lessons, two per deck: Ch08 (1–13, 14 on), Ch09 (1–10, 11 on – split where the topic changes, as its
  // notes give no split) and Ch10 (1–12, 13 on). The second lesson of each deck takes its review slides.
  'ch-reactions': [
    {
      file: 'Ch08_Rates_of_reaction.pptx',
      deckNo: '08',
      titleEn: 'Rates of reaction',
      titleMn: 'Урвалын хурд',
      slides: 30,
      lessonSlides: [
        { lesson: 1, from: 1, to: 13 },
        { lesson: 2, from: 14, to: 30 }
      ]
    },
    {
      file: 'Ch09_Reversible_reactions_and_equilibrium.pptx',
      deckNo: '09',
      titleEn: 'Reversible reactions and equilibrium',
      titleMn: 'Буцаах урвал ба тэнцвэр',
      slides: 29,
      lessonSlides: [
        { lesson: 3, from: 1, to: 10 },
        { lesson: 4, from: 11, to: 29 }
      ]
    },
    {
      file: 'Ch10_Redox_reactions.pptx',
      deckNo: '10',
      titleEn: 'Redox reactions',
      titleMn: 'Исэлдэлт-бууралтын урвал',
      slides: 28,
      lessonSlides: [
        { lesson: 5, from: 1, to: 12 },
        { lesson: 6, from: 13, to: 28 }
      ]
    }
  ],
  // Four 40-minute lessons, two per deck on the split in their notes: Ch11 (1–12, 13 on), Ch12 (1–12, 13 on).
  // The second lesson of each deck takes its review slides.
  'ch-acids-bases': [
    {
      file: 'Ch11_Acids_and_bases.pptx',
      deckNo: '11',
      titleEn: 'Acids and bases',
      titleMn: 'Хүчил ба суурь',
      slides: 29,
      lessonSlides: [
        { lesson: 1, from: 1, to: 12 },
        { lesson: 2, from: 13, to: 29 }
      ]
    },
    {
      file: 'Ch12_Preparation_of_salts.pptx',
      deckNo: '12',
      titleEn: 'Preparation of salts',
      titleMn: 'Давс бэлтгэх',
      slides: 28,
      lessonSlides: [
        { lesson: 3, from: 1, to: 12 },
        { lesson: 4, from: 13, to: 28 }
      ]
    }
  ],
  // Two 40-minute lessons, on the split in the deck's notes (1–12, 13 on); the second takes the review slides 22–29
  'ch-periodic-table': [
    {
      file: 'Ch13_The_Periodic_Table.pptx',
      deckNo: '13',
      titleEn: 'The Periodic Table',
      titleMn: 'Үелэх систем',
      slides: 29,
      lessonSlides: [
        { lesson: 1, from: 1, to: 12 },
        { lesson: 2, from: 13, to: 29 }
      ]
    }
  ],
  // Five 40-minute lessons on the plan in the decks' notes: Ch14 (1–11, 12 on), Ch15 (one lesson), Ch16 (1–11, 12 on)
  'ch-metals': [
    {
      file: 'Ch14_Metallic_elements_and_alloys.pptx',
      deckNo: '14',
      titleEn: 'Metallic elements and alloys',
      titleMn: 'Металл элемент ба хайлш',
      slides: 28,
      lessonSlides: [
        { lesson: 1, from: 1, to: 11 },
        { lesson: 2, from: 12, to: 28 }
      ]
    },
    {
      file: 'Ch15_Reactivity_of_metals.pptx',
      deckNo: '15',
      titleEn: 'Reactivity of metals',
      titleMn: 'Металлын идэвхжил',
      slides: 26,
      lessonSlides: [{ lesson: 3, from: 1, to: 26 }]
    },
    {
      file: 'Ch16_Extraction_and_corrosion_of_metals.pptx',
      deckNo: '16',
      titleEn: 'Extraction and corrosion of metals',
      titleMn: 'Металлыг гаргаж авах ба зэврэлт',
      slides: 28,
      lessonSlides: [
        { lesson: 4, from: 1, to: 11 },
        { lesson: 5, from: 12, to: 28 }
      ]
    }
  ],
  'ch-environment': [
    { file: 'Ch17_Chemistry_of_our_environment.pptx', deckNo: '17', titleEn: 'Chemistry of our environment', titleMn: 'Байгаль орчны хими', slides: 29 }
  ],
  'ch-organic': [
    { file: 'Ch18_Introduction_to_organic_chemistry.pptx', deckNo: '18', titleEn: 'Introduction to organic chemistry', titleMn: 'Органик химийн танилцуулга', slides: 29 },
    { file: 'Ch19_Reactions_of_organic_compounds.pptx', deckNo: '19', titleEn: 'Reactions of organic compounds', titleMn: 'Органик нэгдлүүдийн урвал', slides: 29 },
    { file: 'Ch20_Petrochemicals_and_polymers.pptx', deckNo: '20', titleEn: 'Petrochemicals and polymers', titleMn: 'Нефть-химийн бүтээгдэхүүн ба полимер', slides: 29 }
  ],
  'ch-experimental-analysis': [
    { file: 'Ch21_Experimental_design_and_separation.pptx', deckNo: '21', titleEn: 'Experimental design and separation', titleMn: 'Туршилтын загвар ба салгалт', slides: 29 },
    { file: 'Ch22_Chemical_analysis.pptx', deckNo: '22', titleEn: 'Chemical analysis', titleMn: 'Химийн шинжилгээ', slides: 29 }
  ],
  // AS & A Level 9701: the chapters of the syllabus (al-ch-N). Chapter 13 (nitrogen) has no deck yet.
  'al-ch-1': [
    { file: '01_Ch1_Atomic_Structure.pptx', deckNo: '01', titleEn: 'Atomic structure', titleMn: 'Атомын бүтэц', slides: 41, course: ALEVEL },
    { file: '02_Ch2_Electrons_in_Atoms.pptx', deckNo: '02', titleEn: 'Electrons in atoms', titleMn: 'Атом дахь электрон', slides: 62, course: ALEVEL }
  ],
  'al-ch-2': [
    {
      file: '03_Ch3_Atoms_Molecules_Stoichiometry.pptx',
      deckNo: '03',
      titleEn: 'Atoms, molecules and stoichiometry',
      titleMn: 'Атом, молекул ба стехиометр',
      slides: 55,
      course: ALEVEL
    },
    { file: '03a_Ch3_15_Problems.pptx', deckNo: '03a', titleEn: 'Chapter 3: 15 problems', titleMn: '3-р бүлэг: 15 бодлого', slides: 19, course: ALEVEL },
    { file: '03b_Ch3_20_More_Problems.pptx', deckNo: '03b', titleEn: 'Chapter 3: 20 more problems', titleMn: '3-р бүлэг: 20 нэмэлт бодлого', slides: 25, course: ALEVEL }
  ],
  'al-ch-3': [
    { file: '04_Ch4_Chemical_Bonding.pptx', deckNo: '04', titleEn: 'Chemical bonding', titleMn: 'Химийн холбоо', slides: 62, course: ALEVEL }
  ],
  'al-ch-4': [
    { file: '05_Ch5_States_of_Matter.pptx', deckNo: '05', titleEn: 'States of matter', titleMn: 'Бодисын төлөв', slides: 39, course: ALEVEL }
  ],
  'al-ch-5': [
    { file: '06_Ch6_Enthalpy_Changes.pptx', deckNo: '06', titleEn: 'Enthalpy changes', titleMn: 'Энтальпийн өөрчлөлт', slides: 53, course: ALEVEL }
  ],
  'al-ch-6': [
    { file: '07_Ch7_Redox_Reactions.pptx', deckNo: '07', titleEn: 'Redox reactions', titleMn: 'Исэлдэлт-бууралтын урвал', slides: 40, course: ALEVEL }
  ],
  'al-ch-7': [
    { file: '08_Ch8_Equilibria.pptx', deckNo: '08', titleEn: 'Equilibria', titleMn: 'Тэнцвэр', slides: 62, course: ALEVEL }
  ],
  'al-ch-8': [
    { file: '09_Ch9_Rates_of_Reaction.pptx', deckNo: '09', titleEn: 'Rates of reaction', titleMn: 'Урвалын хурд', slides: 40, course: ALEVEL }
  ],
  'al-ch-9': [
    { file: '10_Ch10_Periodicity.pptx', deckNo: '10', titleEn: 'Periodicity', titleMn: 'Үечлэл', slides: 41, course: ALEVEL }
  ],
  'al-ch-10': [
    { file: '11_Ch11_Group_2.pptx', deckNo: '11', titleEn: 'Group 2', titleMn: '2-р бүлгийн элементүүд', slides: 31, course: ALEVEL }
  ],
  'al-ch-11': [
    { file: '12_Ch12_Group_17.pptx', deckNo: '12', titleEn: 'Group 17', titleMn: '17-р бүлгийн элементүүд (галоген)', slides: 32, course: ALEVEL }
  ],
  'al-ch-13': [
    { file: '14_Ch14_Intro_Organic_Chemistry.pptx', deckNo: '14', titleEn: 'Introduction to organic chemistry', titleMn: 'Органик химийн танилцуулга', slides: 31, course: ALEVEL }
  ],
  'al-ch-14': [
    { file: '15_Ch15_Hydrocarbons.pptx', deckNo: '15', titleEn: 'Hydrocarbons', titleMn: 'Нүүрсустөрөгч', slides: 66, course: ALEVEL }
  ],
  'al-ch-15': [
    { file: '16_Ch16_Halogenoalkanes.pptx', deckNo: '16', titleEn: 'Halogenoalkanes', titleMn: 'Галогеналкан', slides: 32, course: ALEVEL }
  ],
  'al-ch-16': [
    {
      file: '17_Ch17_Alcohols_Esters_Acids.pptx',
      deckNo: '17',
      titleEn: 'Alcohols, esters and carboxylic acids',
      titleMn: 'Спирт, эфир, карбоксилын хүчил',
      slides: 32,
      course: ALEVEL
    }
  ],
  'al-ch-17': [
    { file: '18_Ch18_Carbonyl_Compounds.pptx', deckNo: '18', titleEn: 'Carbonyl compounds', titleMn: 'Карбонилын нэгдлүүд', slides: 30, course: ALEVEL }
  ],
  'al-ch-18': [
    {
      file: '17_Ch17_Alcohols_Esters_Acids.pptx',
      deckNo: '17',
      titleEn: 'Alcohols, esters and carboxylic acids',
      titleMn: 'Спирт, эфир, карбоксилын хүчил',
      slides: 32,
      course: ALEVEL
    }
  ],
  // Paper 2/3 revision, shown with every 9701 topic
  'alevel-revision': [
    {
      file: '9701_AS_Paper23_Final_Revision.pptx',
      deckNo: 'R1',
      titleEn: 'Paper 2/3 final revision (English)',
      titleMn: 'Paper 2/3 эцсийн давтлага',
      slides: 45,
      course: ALEVEL
    },
    { file: '9701_Paper23_Exam_Tactics.pptx', deckNo: 'R3', titleEn: 'Paper 2/3 exam tactics', titleMn: 'Paper 2/3 шалгалтын арга', slides: 6, course: ALEVEL },
    {
      file: '19_Organic_Review_Ch14-18.pptx',
      deckNo: 'R4',
      titleEn: 'Organic review, chapters 14–18',
      titleMn: 'Органик давтлага, 14–18-р бүлэг',
      slides: 30,
      course: ALEVEL
    }
  ]
};

// The slides of one lesson of a chapter: its own range where the deck holds several lessons, otherwise the whole deck
export const lessonSlides = (chapterId: string, lesson: number): SlidePart[] =>
  (CHAPTER_SLIDES[chapterId] ?? []).flatMap((deck): SlidePart[] => {
    if (!deck.lessonSlides) return [{ deck, from: 1, to: deck.slides }];
    const own = deck.lessonSlides.find(l => l.lesson === lesson);
    return own ? [{ deck, from: own.from, to: own.to }] : [];
  });

// The slides of [lo, hi) counted from the first slide of the parts
const sliceParts = (parts: SlidePart[], lo: number, hi: number): SlidePart[] => {
  const out: SlidePart[] = [];
  let offset = 0;
  for (const p of parts) {
    const n = p.to - p.from + 1;
    const a = Math.max(lo, offset);
    const b = Math.min(hi, offset + n);
    if (b > a) out.push({ deck: p.deck, from: p.from + (a - offset), to: p.from + (b - offset) - 1 });
    offset += n;
  }
  return out;
};

// Shares the slides of one lesson out over its five steps, in proportion to the minutes of each step. A step that gets
// no slide of its own shows the nearest slide, so every step has a picture to watch.
export const lessonStepParts = (parts: SlidePart[], stepMinutes: number[] = LESSON_STEP_MINUTES): SlidePart[][] => {
  const n = parts.reduce((sum, p) => sum + (p.to - p.from + 1), 0);
  if (n === 0) return stepMinutes.map(() => []);
  const lessonMinutes = stepMinutes.reduce((a, b) => a + b, 0);
  const cut = (minutes: number) => Math.round((n * minutes) / lessonMinutes);
  let elapsed = 0;
  return stepMinutes.map(minutes => {
    const lo = cut(elapsed);
    elapsed += minutes;
    const hi = cut(elapsed);
    if (hi > lo) return sliceParts(parts, lo, hi);
    const at = Math.min(lo, n - 1);
    return sliceParts(parts, at, at + 1);
  });
};
