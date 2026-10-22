// Electron configuration in subshell notation (A Level, 9701), for elements 1 to 36.
// Filled in the Aufbau order. The two exceptions in this range are chromium (3d⁵ 4s¹) and copper (3d¹⁰ 4s¹).
// Beyond Z = 36 the notation has not been checked yet, so the app shows only the shell numbers there.

export const SUBSHELL_LIMIT = 36;

type Subshell = { n: number; l: 's' | 'p' | 'd' | 'f'; capacity: number };

// The Aufbau order up to 4p (enough for Z ≤ 36)
const AUFBAU: Subshell[] = [
  { n: 1, l: 's', capacity: 2 },
  { n: 2, l: 's', capacity: 2 },
  { n: 2, l: 'p', capacity: 6 },
  { n: 3, l: 's', capacity: 2 },
  { n: 3, l: 'p', capacity: 6 },
  { n: 4, l: 's', capacity: 2 },
  { n: 3, l: 'd', capacity: 10 },
  { n: 4, l: 'p', capacity: 6 }
];

// Ground states that break the Aufbau order, written out in full
const EXCEPTIONS: Record<number, Array<[number, 's' | 'p' | 'd' | 'f', number]>> = {
  24: [
    [1, 's', 2], [2, 's', 2], [2, 'p', 6], [3, 's', 2], [3, 'p', 6], [3, 'd', 5], [4, 's', 1]
  ],
  29: [
    [1, 's', 2], [2, 's', 2], [2, 'p', 6], [3, 's', 2], [3, 'p', 6], [3, 'd', 10], [4, 's', 1]
  ]
};

const SUPERSCRIPT: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
};
const ORDER = { s: 0, p: 1, d: 2, f: 3 } as const;

// The notation for an element, for example Fe → 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s². Returns null beyond Z = 36.
export const subshellNotation = (z: number): string | null => {
  if (z < 1 || z > SUBSHELL_LIMIT) return null;

  let parts: Array<[number, 's' | 'p' | 'd' | 'f', number]> = [];
  if (EXCEPTIONS[z]) {
    parts = EXCEPTIONS[z];
  } else {
    let left = z;
    for (const shell of AUFBAU) {
      if (left <= 0) break;
      const count = Math.min(left, shell.capacity);
      parts.push([shell.n, shell.l, count]);
      left -= count;
    }
  }

  // Write the subshells in order of shell number, then s, p, d (the way A Level answers are written)
  return parts
    .slice()
    .sort((a, b) => a[0] - b[0] || ORDER[a[1]] - ORDER[b[1]])
    .map(([n, l, count]) => `${n}${l}${count.toString().split('').map(d => SUPERSCRIPT[d]).join('')}`)
    .join(' ');
};
