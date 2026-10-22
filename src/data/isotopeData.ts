// Natural isotopes and their share of atoms (percent). Copied from the element pages on theorium.eu/resources/periodic-table.
// Every element from hydrogen to krypton that has more than one natural isotope. Single-isotope elements (F, Na, Al, P, Sc, Mn, Co, As) have nothing to compare, so they are left out.
export interface IsotopeAbundance {
  mass: number; // mass number, the protons + neutrons
  percent: number; // share of atoms in nature
}

export const ISOTOPE_ABUNDANCES: Record<number, IsotopeAbundance[]> = {
  1: [
    { mass: 1, percent: 99.99 },
    { mass: 2, percent: 0.011 }
  ],
  2: [
    { mass: 3, percent: 0.00013 },
    { mass: 4, percent: 100 }
  ],
  3: [
    { mass: 6, percent: 7.59 },
    { mass: 7, percent: 92.41 }
  ],
  5: [
    { mass: 10, percent: 19.9 },
    { mass: 11, percent: 80.1 }
  ],
  6: [
    { mass: 12, percent: 98.93 },
    { mass: 13, percent: 1.07 }
  ],
  7: [
    { mass: 14, percent: 99.64 },
    { mass: 15, percent: 0.36 }
  ],
  8: [
    { mass: 16, percent: 99.76 },
    { mass: 17, percent: 0.038 },
    { mass: 18, percent: 0.21 }
  ],
  10: [
    { mass: 20, percent: 90.48 },
    { mass: 21, percent: 0.27 },
    { mass: 22, percent: 9.25 }
  ],
  12: [
    { mass: 24, percent: 78.99 },
    { mass: 25, percent: 10 },
    { mass: 26, percent: 11.01 }
  ],
  14: [
    { mass: 28, percent: 92.22 },
    { mass: 29, percent: 4.69 },
    { mass: 30, percent: 3.09 }
  ],
  16: [
    { mass: 32, percent: 94.99 },
    { mass: 33, percent: 0.75 },
    { mass: 34, percent: 4.25 },
    { mass: 36, percent: 0.01 }
  ],
  17: [
    { mass: 35, percent: 75.76 },
    { mass: 37, percent: 24.24 }
  ],
  18: [
    { mass: 36, percent: 0.33 },
    { mass: 38, percent: 0.063 },
    { mass: 40, percent: 99.6 }
  ],
  19: [
    { mass: 39, percent: 93.26 },
    { mass: 40, percent: 0.012 },
    { mass: 41, percent: 6.73 }
  ],
  20: [
    { mass: 40, percent: 96.94 },
    { mass: 42, percent: 0.65 },
    { mass: 43, percent: 0.14 },
    { mass: 44, percent: 2.09 },
    { mass: 46, percent: 0.004 },
    { mass: 48, percent: 0.19 }
  ],
  22: [
    { mass: 46, percent: 8.25 },
    { mass: 47, percent: 7.44 },
    { mass: 48, percent: 73.72 },
    { mass: 49, percent: 5.41 },
    { mass: 50, percent: 5.18 }
  ],
  23: [
    { mass: 50, percent: 0.25 },
    { mass: 51, percent: 99.75 }
  ],
  24: [
    { mass: 50, percent: 4.35 },
    { mass: 52, percent: 83.79 },
    { mass: 53, percent: 9.5 },
    { mass: 54, percent: 2.37 }
  ],
  26: [
    { mass: 54, percent: 5.85 },
    { mass: 56, percent: 91.75 },
    { mass: 57, percent: 2.12 },
    { mass: 58, percent: 0.28 }
  ],
  28: [
    { mass: 58, percent: 68.08 },
    { mass: 60, percent: 26.22 },
    { mass: 61, percent: 1.14 },
    { mass: 62, percent: 3.63 },
    { mass: 64, percent: 0.93 }
  ],
  29: [
    { mass: 63, percent: 69.15 },
    { mass: 65, percent: 30.85 }
  ],
  30: [
    { mass: 64, percent: 49.17 },
    { mass: 66, percent: 27.73 },
    { mass: 67, percent: 4.04 },
    { mass: 68, percent: 18.45 },
    { mass: 70, percent: 0.61 }
  ],
  31: [
    { mass: 69, percent: 60.11 },
    { mass: 71, percent: 39.89 }
  ],
  32: [
    { mass: 70, percent: 20.57 },
    { mass: 72, percent: 27.45 },
    { mass: 73, percent: 7.75 },
    { mass: 74, percent: 36.5 },
    { mass: 76, percent: 7.73 }
  ],
  34: [
    { mass: 74, percent: 0.89 },
    { mass: 76, percent: 9.37 },
    { mass: 77, percent: 7.63 },
    { mass: 78, percent: 23.77 },
    { mass: 80, percent: 49.61 },
    { mass: 82, percent: 8.73 }
  ],
  35: [
    { mass: 79, percent: 50.69 },
    { mass: 81, percent: 49.31 }
  ],
  36: [
    { mass: 78, percent: 0.36 },
    { mass: 80, percent: 2.29 },
    { mass: 82, percent: 11.59 },
    { mass: 83, percent: 11.5 },
    { mass: 84, percent: 56.99 },
    { mass: 86, percent: 17.28 }
  ]
};
