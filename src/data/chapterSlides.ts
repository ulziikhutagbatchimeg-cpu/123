// The PowerPoint decks of the IGCSE 0620 course, grouped by the app's chapter id. The files are served from
// public/slides/igcse-0620/. deckNo is the chapter number in the 22-chapter deck set, so a chapter can have several
// decks (chapter 3 has one deck per lesson). lessonSlides maps the interactive chapter 1 lessons to their slides.

export interface SlideDeck {
  file: string;
  deckNo: string;
  titleEn: string;
  slides: number;
  lessonSlides?: Array<{ lesson: number; from: number; to: number }>;
}

export const CHAPTER_SLIDES: Record<string, SlideDeck[]> = {
  'ch-states-of-matter': [
    {
      file: 'Ch01_States_of_matter.pptx',
      deckNo: '01',
      titleEn: 'States of matter',
      slides: 33,
      lessonSlides: [
        { lesson: 1, from: 4, to: 7 },
        { lesson: 2, from: 8, to: 15 },
        { lesson: 3, from: 16, to: 17 },
        { lesson: 4, from: 18, to: 21 }
      ]
    }
  ],
  'ch-atoms-bonding': [
    { file: 'Ch02_Atomic_structure.pptx', deckNo: '02', titleEn: 'Atomic structure', slides: 30 },
    { file: 'Ch03_L1_Covalent_bonding.pptx', deckNo: '03 · L1', titleEn: 'Covalent bonding', slides: 29 },
    { file: 'Ch03_L2_Ionic_bonding.pptx', deckNo: '03 · L2', titleEn: 'Ionic bonding', slides: 28 },
    { file: 'Ch03_L3_Giant_structures.pptx', deckNo: '03 · L3', titleEn: 'Giant structures', slides: 29 }
  ],
  'ch-stoichiometry': [
    { file: 'Ch04_Formulae_and_Equations.pptx', deckNo: '04', titleEn: 'Formulae and equations', slides: 36 },
    { file: 'Ch05_Chemical_Calculations.pptx', deckNo: '05', titleEn: 'Chemical calculations', slides: 45 }
  ],
  'ch-electrochemistry': [
    { file: 'Ch06_Electrochemistry.pptx', deckNo: '06', titleEn: 'Electrochemistry', slides: 33 }
  ],
  'ch-energetics': [
    { file: 'Ch07_Chemical_energetics.pptx', deckNo: '07', titleEn: 'Chemical energetics', slides: 29 }
  ],
  'ch-reactions': [
    { file: 'Ch08_Rates_of_reaction.pptx', deckNo: '08', titleEn: 'Rates of reaction', slides: 30 },
    { file: 'Ch09_Reversible_reactions_and_equilibrium.pptx', deckNo: '09', titleEn: 'Reversible reactions and equilibrium', slides: 29 },
    { file: 'Ch10_Redox_reactions.pptx', deckNo: '10', titleEn: 'Redox reactions', slides: 28 }
  ],
  'ch-acids-bases': [
    { file: 'Ch11_Acids_and_bases.pptx', deckNo: '11', titleEn: 'Acids and bases', slides: 29 },
    { file: 'Ch12_Preparation_of_salts.pptx', deckNo: '12', titleEn: 'Preparation of salts', slides: 28 }
  ],
  'ch-periodic-table': [
    { file: 'Ch13_The_Periodic_Table.pptx', deckNo: '13', titleEn: 'The Periodic Table', slides: 29 }
  ],
  'ch-metals': [
    { file: 'Ch14_Metallic_elements_and_alloys.pptx', deckNo: '14', titleEn: 'Metallic elements and alloys', slides: 28 },
    { file: 'Ch15_Reactivity_of_metals.pptx', deckNo: '15', titleEn: 'Reactivity of metals', slides: 26 },
    { file: 'Ch16_Extraction_and_corrosion_of_metals.pptx', deckNo: '16', titleEn: 'Extraction and corrosion of metals', slides: 28 }
  ],
  'ch-environment': [
    { file: 'Ch17_Chemistry_of_our_environment.pptx', deckNo: '17', titleEn: 'Chemistry of our environment', slides: 29 }
  ],
  'ch-organic': [
    { file: 'Ch18_Introduction_to_organic_chemistry.pptx', deckNo: '18', titleEn: 'Introduction to organic chemistry', slides: 29 },
    { file: 'Ch19_Reactions_of_organic_compounds.pptx', deckNo: '19', titleEn: 'Reactions of organic compounds', slides: 29 },
    { file: 'Ch20_Petrochemicals_and_polymers.pptx', deckNo: '20', titleEn: 'Petrochemicals and polymers', slides: 29 }
  ],
  'ch-experimental-analysis': [
    { file: 'Ch21_Experimental_design_and_separation.pptx', deckNo: '21', titleEn: 'Experimental design and separation', slides: 29 },
    { file: 'Ch22_Chemical_analysis.pptx', deckNo: '22', titleEn: 'Chemical analysis', slides: 29 }
  ]
};
