// Natural isotopes and their share of atoms (percent). Copied from the element pages on theorium.eu/resources/periodic-table.
// Every element from hydrogen to uranium that has more than one natural isotope. Single-isotope elements (F, Na, Al, P, Sc, Mn, Co, As, Y, Rh, I, Cs, Pr, Tb, Ho, Tm, Au, Bi, Th, Pa) have nothing to compare, so they are left out.
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
  ],
  37: [
    { mass: 85, percent: 72.17 },
    { mass: 87, percent: 27.83 }
  ],
  38: [
    { mass: 84, percent: 0.56 },
    { mass: 86, percent: 9.86 },
    { mass: 87, percent: 7 },
    { mass: 88, percent: 82.58 }
  ],
  40: [
    { mass: 90, percent: 51.45 },
    { mass: 91, percent: 11.22 },
    { mass: 92, percent: 17.15 },
    { mass: 94, percent: 17.38 },
    { mass: 96, percent: 2.8 }
  ],
  42: [
    { mass: 92, percent: 14.53 },
    { mass: 94, percent: 9.15 },
    { mass: 95, percent: 15.84 },
    { mass: 96, percent: 16.67 },
    { mass: 97, percent: 9.6 },
    { mass: 98, percent: 24.39 },
    { mass: 100, percent: 9.82 }
  ],
  44: [
    { mass: 96, percent: 5.54 },
    { mass: 98, percent: 1.87 },
    { mass: 99, percent: 12.76 },
    { mass: 100, percent: 12.6 },
    { mass: 101, percent: 17.06 },
    { mass: 102, percent: 31.55 },
    { mass: 104, percent: 18.62 }
  ],
  46: [
    { mass: 102, percent: 1.02 },
    { mass: 104, percent: 11.14 },
    { mass: 105, percent: 22.33 },
    { mass: 106, percent: 27.33 },
    { mass: 108, percent: 26.46 },
    { mass: 110, percent: 11.72 }
  ],
  47: [
    { mass: 107, percent: 51.84 },
    { mass: 109, percent: 48.16 }
  ],
  48: [
    { mass: 106, percent: 1.25 },
    { mass: 108, percent: 0.89 },
    { mass: 110, percent: 12.49 },
    { mass: 111, percent: 12.8 },
    { mass: 112, percent: 24.13 },
    { mass: 113, percent: 12.22 },
    { mass: 114, percent: 28.73 },
    { mass: 116, percent: 7.49 }
  ],
  49: [
    { mass: 113, percent: 4.29 },
    { mass: 115, percent: 95.71 }
  ],
  50: [
    { mass: 112, percent: 0.97 },
    { mass: 114, percent: 0.66 },
    { mass: 115, percent: 0.34 },
    { mass: 116, percent: 14.54 },
    { mass: 117, percent: 7.68 },
    { mass: 118, percent: 24.22 },
    { mass: 119, percent: 8.59 },
    { mass: 120, percent: 32.58 },
    { mass: 122, percent: 4.63 },
    { mass: 124, percent: 5.79 }
  ],
  51: [
    { mass: 121, percent: 57.21 },
    { mass: 123, percent: 42.79 }
  ],
  52: [
    { mass: 120, percent: 0.09 },
    { mass: 122, percent: 2.55 },
    { mass: 123, percent: 0.89 },
    { mass: 124, percent: 4.74 },
    { mass: 125, percent: 7.07 },
    { mass: 126, percent: 18.84 },
    { mass: 128, percent: 31.74 },
    { mass: 130, percent: 34.08 }
  ],
  54: [
    { mass: 124, percent: 0.095 },
    { mass: 126, percent: 0.089 },
    { mass: 128, percent: 1.91 },
    { mass: 129, percent: 26.4 },
    { mass: 130, percent: 4.07 },
    { mass: 131, percent: 21.23 },
    { mass: 132, percent: 26.91 },
    { mass: 134, percent: 10.44 },
    { mass: 136, percent: 8.86 }
  ],
  56: [
    { mass: 130, percent: 0.11 },
    { mass: 132, percent: 0.1 },
    { mass: 134, percent: 2.42 },
    { mass: 135, percent: 6.59 },
    { mass: 136, percent: 7.85 },
    { mass: 137, percent: 11.23 },
    { mass: 138, percent: 71.7 }
  ],
  57: [
    { mass: 138, percent: 0.089 },
    { mass: 139, percent: 99.91 }
  ],
  58: [
    { mass: 136, percent: 0.18 },
    { mass: 138, percent: 0.25 },
    { mass: 140, percent: 88.45 },
    { mass: 142, percent: 11.11 }
  ],
  60: [
    { mass: 142, percent: 27.15 },
    { mass: 143, percent: 12.17 },
    { mass: 144, percent: 23.8 },
    { mass: 145, percent: 8.29 },
    { mass: 146, percent: 17.19 },
    { mass: 148, percent: 5.76 },
    { mass: 150, percent: 5.64 }
  ],
  62: [
    { mass: 144, percent: 3.07 },
    { mass: 147, percent: 14.99 },
    { mass: 148, percent: 11.24 },
    { mass: 149, percent: 13.82 },
    { mass: 150, percent: 7.38 },
    { mass: 152, percent: 26.75 },
    { mass: 154, percent: 22.75 }
  ],
  63: [
    { mass: 151, percent: 47.81 },
    { mass: 153, percent: 52.19 }
  ],
  64: [
    { mass: 152, percent: 0.2 },
    { mass: 154, percent: 2.18 },
    { mass: 155, percent: 14.8 },
    { mass: 156, percent: 20.47 },
    { mass: 157, percent: 15.65 },
    { mass: 158, percent: 24.84 },
    { mass: 160, percent: 21.86 }
  ],
  66: [
    { mass: 156, percent: 0.056 },
    { mass: 158, percent: 0.095 },
    { mass: 160, percent: 2.33 },
    { mass: 161, percent: 18.89 },
    { mass: 162, percent: 25.47 },
    { mass: 163, percent: 24.9 },
    { mass: 164, percent: 28.26 }
  ],
  68: [
    { mass: 162, percent: 0.14 },
    { mass: 164, percent: 1.6 },
    { mass: 166, percent: 33.5 },
    { mass: 167, percent: 22.87 },
    { mass: 168, percent: 26.98 },
    { mass: 170, percent: 14.91 }
  ],
  70: [
    { mass: 168, percent: 0.12 },
    { mass: 170, percent: 2.98 },
    { mass: 171, percent: 14.09 },
    { mass: 172, percent: 21.68 },
    { mass: 173, percent: 16.1 },
    { mass: 174, percent: 32.03 },
    { mass: 176, percent: 13 }
  ],
  71: [
    { mass: 175, percent: 97.4 },
    { mass: 176, percent: 2.6 }
  ],
  72: [
    { mass: 174, percent: 0.16 },
    { mass: 176, percent: 5.26 },
    { mass: 177, percent: 18.6 },
    { mass: 178, percent: 27.28 },
    { mass: 179, percent: 13.62 },
    { mass: 180, percent: 35.08 }
  ],
  73: [
    { mass: 180, percent: 0.012 },
    { mass: 181, percent: 99.99 }
  ],
  74: [
    { mass: 180, percent: 0.12 },
    { mass: 182, percent: 26.5 },
    { mass: 183, percent: 14.31 },
    { mass: 184, percent: 30.64 },
    { mass: 186, percent: 28.43 }
  ],
  75: [
    { mass: 185, percent: 37.4 },
    { mass: 187, percent: 62.6 }
  ],
  76: [
    { mass: 184, percent: 0.02 },
    { mass: 186, percent: 1.59 },
    { mass: 187, percent: 1.96 },
    { mass: 188, percent: 13.24 },
    { mass: 189, percent: 16.15 },
    { mass: 190, percent: 26.26 },
    { mass: 192, percent: 40.78 }
  ],
  77: [
    { mass: 191, percent: 37.3 },
    { mass: 193, percent: 62.7 }
  ],
  78: [
    { mass: 190, percent: 0.012 },
    { mass: 192, percent: 0.78 },
    { mass: 194, percent: 32.86 },
    { mass: 195, percent: 33.78 },
    { mass: 196, percent: 25.21 },
    { mass: 198, percent: 7.36 }
  ],
  80: [
    { mass: 196, percent: 0.15 },
    { mass: 198, percent: 9.97 },
    { mass: 199, percent: 16.87 },
    { mass: 200, percent: 23.1 },
    { mass: 201, percent: 13.18 },
    { mass: 202, percent: 29.86 },
    { mass: 204, percent: 6.87 }
  ],
  81: [
    { mass: 203, percent: 29.52 },
    { mass: 205, percent: 70.48 }
  ],
  82: [
    { mass: 204, percent: 1.4 },
    { mass: 206, percent: 24.1 },
    { mass: 207, percent: 22.1 },
    { mass: 208, percent: 52.4 }
  ],
  92: [
    { mass: 234, percent: 0.0054 },
    { mass: 235, percent: 0.72 },
    { mass: 238, percent: 99.27 }
  ]
};
