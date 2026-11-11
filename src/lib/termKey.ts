// The same key word is often written two ways in different lists: "isotope" and "isotopes", "first ionisation energy" and
// "first ionisation energy, IE₁", "relative atomic mass (Aᵣ)", "Hess's law" and "Hess’s law". termKey gives them one key,
// so each word becomes one flashcard. It ignores case, curly quotes, a bracketed part, a symbol added after a comma and a
// plural s.
export const termKey = (en: string): string => {
  const k = en
    .replace(/\(.*?\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/,\s*[A-ZΔ][^\s,]{0,5}$/, '')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, '-')
    .trim();
  return k.length > 3 && k.endsWith('s') && !k.endsWith('ss') ? k.slice(0, -1) : k;
};

// A word as part of a card id: lower case, letters and digits joined by hyphens
export const termSlug = (en: string): string => en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// One card per word: the first card of each word is kept (the lists are given in the order they should win)
export const uniqueByTerm = <T extends { termEn: string }>(items: T[], seen = new Set<string>()): T[] =>
  items.filter(x => {
    const k = termKey(x.termEn);
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
