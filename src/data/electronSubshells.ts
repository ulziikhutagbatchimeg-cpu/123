// Electron configuration in subshell notation (A Level, 9701), for elements 1 to 118.
// The ground state is the Aufbau filling, with the exceptions listed below where the real configuration breaks that order.
// Elements 104 and above follow the Aufbau order and have not been checked against the literature.

export const SUBSHELL_LIMIT = 118;

type Letter = 's' | 'p' | 'd' | 'f';
type Subshell = { n: number; l: Letter; capacity: number };
type Part = { n: number; l: Letter; count: number };

// The Aufbau order, from 1s to 7p (the capacities add up to 118)
const AUFBAU: Subshell[] = [
  { n: 1, l: 's', capacity: 2 },
  { n: 2, l: 's', capacity: 2 },
  { n: 2, l: 'p', capacity: 6 },
  { n: 3, l: 's', capacity: 2 },
  { n: 3, l: 'p', capacity: 6 },
  { n: 4, l: 's', capacity: 2 },
  { n: 3, l: 'd', capacity: 10 },
  { n: 4, l: 'p', capacity: 6 },
  { n: 5, l: 's', capacity: 2 },
  { n: 4, l: 'd', capacity: 10 },
  { n: 5, l: 'p', capacity: 6 },
  { n: 6, l: 's', capacity: 2 },
  { n: 4, l: 'f', capacity: 14 },
  { n: 5, l: 'd', capacity: 10 },
  { n: 6, l: 'p', capacity: 6 },
  { n: 7, l: 's', capacity: 2 },
  { n: 5, l: 'f', capacity: 14 },
  { n: 6, l: 'd', capacity: 10 },
  { n: 7, l: 'p', capacity: 6 }
];

// Real ground states that differ from the Aufbau filling. Each entry lists only the subshells that change, with their real counts.
// The total number of electrons stays the same, so an exception only moves electrons between subshells.
const EXCEPTIONS: Record<number, Array<[number, Letter, number]>> = {
  24: [[4, 's', 1], [3, 'd', 5]], // Cr 3d⁵ 4s¹
  29: [[4, 's', 1], [3, 'd', 10]], // Cu 3d¹⁰ 4s¹
  41: [[5, 's', 1], [4, 'd', 4]], // Nb 4d⁴ 5s¹
  42: [[5, 's', 1], [4, 'd', 5]], // Mo 4d⁵ 5s¹
  44: [[5, 's', 1], [4, 'd', 7]], // Ru 4d⁷ 5s¹
  45: [[5, 's', 1], [4, 'd', 8]], // Rh 4d⁸ 5s¹
  46: [[5, 's', 0], [4, 'd', 10]], // Pd 4d¹⁰
  47: [[5, 's', 1], [4, 'd', 10]], // Ag 4d¹⁰ 5s¹
  57: [[4, 'f', 0], [5, 'd', 1]], // La 5d¹ 6s²
  58: [[4, 'f', 1], [5, 'd', 1]], // Ce 4f¹ 5d¹ 6s²
  64: [[4, 'f', 7], [5, 'd', 1]], // Gd 4f⁷ 5d¹ 6s²
  78: [[6, 's', 1], [5, 'd', 9]], // Pt 5d⁹ 6s¹
  79: [[6, 's', 1], [5, 'd', 10]], // Au 5d¹⁰ 6s¹
  89: [[5, 'f', 0], [6, 'd', 1]], // Ac 6d¹ 7s²
  90: [[5, 'f', 0], [6, 'd', 2]], // Th 6d² 7s²
  91: [[5, 'f', 2], [6, 'd', 1]], // Pa 5f² 6d¹ 7s²
  92: [[5, 'f', 3], [6, 'd', 1]], // U 5f³ 6d¹ 7s²
  93: [[5, 'f', 4], [6, 'd', 1]], // Np 5f⁴ 6d¹ 7s²
  96: [[5, 'f', 7], [6, 'd', 1]] // Cm 5f⁷ 6d¹ 7s²
};

const SUPERSCRIPT: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
};
const ORDER = { s: 0, p: 1, d: 2, f: 3 } as const;

export const superscript = (count: number) => count.toString().split('').map(d => SUPERSCRIPT[d]).join('');

// The electrons in each subshell of the ground state, in order of shell number, then s, p, d, f
const groundState = (z: number): Part[] => {
  const counts = new Map<string, Part>();
  let left = z;
  for (const shell of AUFBAU) {
    if (left <= 0) break;
    const count = Math.min(left, shell.capacity);
    counts.set(`${shell.n}${shell.l}`, { n: shell.n, l: shell.l, count });
    left -= count;
  }
  for (const [n, l, count] of EXCEPTIONS[z] ?? []) {
    counts.set(`${n}${l}`, { n, l, count });
  }
  return [...counts.values()]
    .filter(part => part.count > 0)
    .sort((a, b) => a.n - b.n || ORDER[a.l] - ORDER[b.l]);
};

// The notation for an element, for example Fe → 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s². Returns null outside Z = 1 to 118.
export const subshellNotation = (z: number): string | null => {
  if (z < 1 || z > SUBSHELL_LIMIT) return null;
  return groundState(z).map(({ n, l, count }) => `${n}${l}${superscript(count)}`).join(' ');
};

// The same configuration grouped by shell, for the 3D atom: each shell lists its subshells and how many electrons each holds
export const subshellLayers = (z: number): Array<{ n: number; parts: Array<{ l: Letter; count: number }> }> => {
  if (z < 1 || z > SUBSHELL_LIMIT) return [];
  const layers: Array<{ n: number; parts: Array<{ l: Letter; count: number }> }> = [];
  for (const part of groundState(z)) {
    const last = layers[layers.length - 1];
    if (last && last.n === part.n) {
      last.parts.push({ l: part.l, count: part.count });
    } else {
      layers.push({ n: part.n, parts: [{ l: part.l, count: part.count }] });
    }
  }
  return layers;
};
