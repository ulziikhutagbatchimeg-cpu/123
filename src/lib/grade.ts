// Cambridge IGCSE grades: 9 (A*) is the top, 1 (G) the lowest, and U is a fail. Cambridge sets the boundaries for each
// series, so these percentages are an approximation.
const CAMBRIDGE_BANDS: Array<{ min: number; num: string; letter: string }> = [
  { min: 90, num: '9', letter: 'A*' },
  { min: 80, num: '8', letter: 'A' },
  { min: 70, num: '7', letter: 'A' },
  { min: 60, num: '6', letter: 'B' },
  { min: 50, num: '5', letter: 'C' },
  { min: 40, num: '4', letter: 'D' },
  { min: 30, num: '3', letter: 'E' },
  { min: 20, num: '2', letter: 'F' },
  { min: 10, num: '1', letter: 'G' }
];

export const cambridgeGrade = (percent: number): { num: string; letter: string } =>
  CAMBRIDGE_BANDS.find(b => percent >= b.min) ?? { num: 'U', letter: 'U' };
