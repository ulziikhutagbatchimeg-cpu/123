import { ALEVEL_GLOSSARY_EXTRA } from './alevelGlossaryExtra';

// The key terms of each 9701 chapter: the terms the Cambridge AS & A Level Chemistry coursebook (3rd edition) sets in bold
// where it introduces them. The book's glossary is not in the PDF. The first list had fragments and duplicates (for example
// "more", "work", "a iii", "b ii"); they were removed and the rest were put in their singular form. A teacher should still
// check the list. Definitions are in alevelKeyTermDefs.ts.
const BASE_KEY_TERMS: Record<string, string[]> = {
  'al-ch-1': ["element", "atom", "proton", "neutron", "electron", "energy level", "anode", "atomic number", "isotope", "mass number", "electronic configuration", "first ionisation energy", "successive ionisation energies", "shielding", "sub-shell", "atomic orbital", "spin-pair repulsion", "free radical", "atomic radius"],
  'al-ch-2': ["unified atomic mass unit", "relative isotopic mass", "relative atomic mass", "formula unit", "relative formula mass", "water of crystallisation", "hydrated compound", "anhydrous", "abundance", "molecular ion", "fragmentation", "mole", "molar mass", "stoichiometry", "empirical formula", "oxidation number", "compound ion", "state symbol", "spectator ion", "ionic equation", "solute", "solvent", "titre", "solution", "concentration", "molar gas volume"],
  'al-ch-3': ["cation", "anion", "lattice", "intermolecular forces", "ionic bond", "electrovalent bond", "dot-and-cross diagram", "covalent bond", "lone pair", "double covalent bond", "triple covalent bond", "co-ordinate bond", "electron-deficient compound", "bond energy", "bond length", "delocalised electron", "electronegativity", "polar bond", "permanent dipole–permanent dipole forces", "hydrogen bond", "hydrolysis"],
  'al-ch-4': ["kinetic theory of gases", "ideal gas", "real gas", "vaporisation", "condensation", "vapour", "pressure", "alloy", "giant molecular structure", "giant covalent structure", "allotrope", "nanotube"],
  'al-ch-5': ["exothermic reaction", "endothermic reaction", "enthalpy change", "reaction pathway diagram", "standard conditions", "specific heat capacity", "exact bond energy", "average bond energy"],
  'al-ch-6': ["oxidation", "reduction", "redox", "half-equation", "disproportionation"],
  'al-ch-7': ["reversible reaction", "dynamic equilibrium", "closed system", "equilibrium expression", "partial pressure", "mole fraction", "neutralisation", "acid", "base", "salt", "weak acid", "strong acid", "acid–base indicator"],
  'al-ch-8': ["reaction kinetics", "rate of reaction", "collision theory", "ineffective collision", "effective collision", "catalyst", "catalysis"],
  'al-ch-9': ["periodicity", "amphoteric"],
  'al-ch-10': ["alkaline earth metal", "saturated solution", "thermal decomposition"],
  'al-ch-11': ["halogen", "volatility", "immiscible", "thermal stability"],
  'al-ch-13': ["structural formula", "displayed formula", "skeletal formula", "homologous series", "functional group", "general formula", "alkane", "aliphatic", "single covalent bond", "isomer", "enantiomer", "chiral centre", "reaction mechanism", "free-radical reaction", "carbocation", "inductive effect", "electrophile", "nucleophile", "free-radical substitution"],
  'al-ch-14': ["saturated hydrocarbon", "initiation step", "termination step", "unsaturated hydrocarbon", "cracking", "hydrogenation", "intermediate", "polymer", "monomer", "addition polymerisation", "repeat unit"],
  'al-ch-15': ["nucleophilic substitution", "heterolytic fission", "positive inductive effect"],
  'al-ch-16': ["primary alcohol", "secondary alcohol", "tertiary alcohol", "degree of dissociation", "esterification", "dehydration"],
  'al-ch-17': ["nucleophilic addition", "infrared spectroscopy", "independent variable", "dependent variable", "control variable", "random error", "systematic error"],
  'al-ch-18': ["acyl chloride"],
};

// The checklist of each chapter: the coursebook terms above, then the extra terms of alevelGlossaryExtra.ts, without repeats
export const KEY_TERMS: Record<string, string[]> = Object.fromEntries(
  Object.entries(BASE_KEY_TERMS).map(([id, list]) => {
    const have = new Set(list.map(t => t.toLowerCase()));
    const extra = (ALEVEL_GLOSSARY_EXTRA[id] ?? []).map(e => e.term.en).filter(t => !have.has(t.toLowerCase()));
    return [id, [...list, ...extra]];
  })
);
