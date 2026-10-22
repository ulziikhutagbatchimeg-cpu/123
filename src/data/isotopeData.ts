// Natural isotopes and their share of atoms (percent). Copied from the element pages on theorium.eu/resources/periodic-table.
// Only the elements in the 0620 syllabus that are worth working through are here; add more the same way.
export interface IsotopeAbundance {
  mass: number; // mass number, the protons + neutrons
  percent: number; // share of atoms in nature
}

export const ISOTOPE_ABUNDANCES: Record<number, IsotopeAbundance[]> = {
  5: [
    { mass: 10, percent: 19.9 },
    { mass: 11, percent: 80.1 }
  ],
  12: [
    { mass: 24, percent: 78.99 },
    { mass: 25, percent: 10 },
    { mass: 26, percent: 11.01 }
  ],
  17: [
    { mass: 35, percent: 75.76 },
    { mass: 37, percent: 24.24 }
  ],
  26: [
    { mass: 54, percent: 5.85 },
    { mass: 56, percent: 91.75 },
    { mass: 57, percent: 2.12 },
    { mass: 58, percent: 0.28 }
  ],
  29: [
    { mass: 63, percent: 69.15 },
    { mass: 65, percent: 30.85 }
  ],
  35: [
    { mass: 79, percent: 50.69 },
    { mass: 81, percent: 49.31 }
  ]
};
