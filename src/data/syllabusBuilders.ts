import { Chapter, LearningObjective, Topic } from '../types/chemistry';
import { OBJECTIVES_A, ObjRow } from './syllabusObjectivesA';
import { OBJECTIVES_B } from './syllabusObjectivesB';
import { OBJECTIVES_C } from './syllabusObjectivesC';
import { EXTENDED_SECTIONS } from './syllabusExtendedSections';

// Every syllabus learning statement, keyed by sub-topic number (1.1–12.5). These replace the
// per-topic lists, so each topic carries the full statement set of its syllabus heading.
const ALL_OBJECTIVES: Record<string, ObjRow[]> = { ...OBJECTIVES_A, ...OBJECTIVES_B, ...OBJECTIVES_C };

const toObjectives = (ref: string, rows: ObjRow[]): LearningObjective[] =>
  rows.map(([n, en, mn, tier]) => ({
    id: `${ref}.${n}`,
    code: `${ref}.${n}`,
    en,
    mn,
    ao: 'AO1' as const,
    tier: tier === 'x' ? ('extended' as const) : ('core' as const)
  }));

// Compact specs used by the syllabus content files. Numbers follow the Cambridge IGCSE 0620
// (2026–2028) subject content, sections 1–12, so each sub-topic maps to one syllabus heading.
export interface TopicSpec {
  id: string;
  chapter: string;
  ref: string; // e.g. '1.2'
  en: string;
  mn: string;
  sumEn: string;
  sumMn: string;
  obj: [code: string, en: string, mn: string][];
  vocab: [termEn: string, termMn: string, defEn: string, defMn: string][];
  sec: [titleEn: string, titleMn: string, contentEn: string, contentMn: string][];
}

export const buildTopic = (s: TopicSpec): Topic => ({
  id: s.id,
  chapterId: s.chapter,
  syllabusRef: `0620/${s.ref}`,
  number: s.ref,
  titleEn: s.en,
  titleMn: s.mn,
  summaryEn: s.sumEn,
  summaryMn: s.sumMn,
  learningObjectives: s.obj.map(([code, en, mn]) => ({ id: code, code, en, mn, ao: 'AO1' as const })),
  vocabulary: s.vocab.map(([termEn, termMn, definitionEn, definitionMn], i) => ({
    id: `${s.id}-v${i}`,
    termEn,
    termMn,
    phonetic: '',
    definitionEn,
    definitionMn,
    exampleEn: '',
    exampleMn: ''
  })),
  sections: s.sec.map(([titleEn, titleMn, contentEn, contentMn], i) => ({
    id: `${s.id}-s${i}`,
    titleEn,
    titleMn,
    contentEn,
    contentMn
  })),
  questions: []
});

// The 12 syllabus chapters, in order
const CHAPTER_DEFS: Omit<Chapter, 'topics'>[] = [
  { id: 'ch-states-of-matter', number: 1, titleEn: 'States of Matter & Particle Theory', titleMn: 'Бодисын төлөв ба бөөмийн онол', descriptionEn: 'Solids, liquids and gases, diffusion and the kinetic particle model.', descriptionMn: 'Хатуу, шингэн, хий; диффуз; кинетик бөөмийн загвар.', iconName: 'Atom', color: 'emerald' },
  { id: 'ch-atoms-bonding', number: 2, titleEn: 'Atoms, Elements & Chemical Bonding', titleMn: 'Атом, элемент ба химийн холбоо', descriptionEn: 'Atomic structure, isotopes, ionic, covalent and metallic bonding, giant structures.', descriptionMn: 'Атомын бүтэц, изотоп, ионы, ковалент, металл холбоо, аварга бүтэц.', iconName: 'Shapes', color: 'indigo' },
  { id: 'ch-stoichiometry', number: 3, titleEn: 'Stoichiometry & The Mole Concept', titleMn: 'Стехиометр ба моль', descriptionEn: 'Formulae, equations, relative masses, moles, gas volumes and concentrations.', descriptionMn: 'Томьёо, тэгшитгэл, харьцангуй масс, моль, хийн эзлэхүүн, концентраци.', iconName: 'Calculator', color: 'amber' },
  { id: 'ch-electrochemistry', number: 4, titleEn: 'Electrochemistry & Electrolysis', titleMn: 'Электрохими ба электролиз', descriptionEn: 'Electrolysis of molten and aqueous compounds, electroplating and fuel cells.', descriptionMn: 'Хайлсан ба уусмал дахь электролиз, цахилгаан бүрэх, түлшний элемент.', iconName: 'Zap', color: 'teal' },
  { id: 'ch-energetics', number: 5, titleEn: 'Chemical Energetics', titleMn: 'Химийн энергетик', descriptionEn: 'Exothermic and endothermic reactions, energy profiles and bond energies.', descriptionMn: 'Экзотерм ба эндотерм урвал, энергийн муруй, холбооны энерги.', iconName: 'Flame', color: 'orange' },
  { id: 'ch-reactions', number: 6, titleEn: 'Chemical Reactions', titleMn: 'Химийн урвал', descriptionEn: 'Physical and chemical change, rates of reaction, reversible reactions and redox.', descriptionMn: 'Физик ба химийн өөрчлөлт, урвалын хурд, эргэх урвал, redox.', iconName: 'TrendingUp', color: 'sky' },
  { id: 'ch-acids-bases', number: 7, titleEn: 'Acids, Bases & Salts', titleMn: 'Хүчил, суурь ба давс', descriptionEn: 'Properties of acids and bases, oxides and the preparation of salts.', descriptionMn: 'Хүчил, суурийн шинж чанар, исэл, давс бэлтгэх.', iconName: 'FlaskConical', color: 'rose' },
  { id: 'ch-periodic-table', number: 8, titleEn: 'The Periodic Table', titleMn: 'Үелэх систем', descriptionEn: 'Arrangement of elements, Group I, Group VII, transition elements and noble gases.', descriptionMn: 'Элементийн байрлал, I ба VII бүлэг, шилжилтийн элемент, инерт хий.', iconName: 'Grid', color: 'indigo' },
  { id: 'ch-metals', number: 9, titleEn: 'Metals', titleMn: 'Металл', descriptionEn: 'Properties and uses of metals, alloys, reactivity series, corrosion and extraction.', descriptionMn: 'Металлын шинж чанар, хэрэглээ, хайлш, идэвх, зэврэлт, олборлолт.', iconName: 'Hammer', color: 'slate' },
  { id: 'ch-environment', number: 10, titleEn: 'Chemistry of the Environment', titleMn: 'Байгаль орчны химi', descriptionEn: 'Water, fertilisers, air quality, climate change and photosynthesis.', descriptionMn: 'Ус, бордоо, агаарын чанар, уур амьсгалын өөрчлөлт, фотосинтез.', iconName: 'Leaf', color: 'green' },
  { id: 'ch-organic', number: 11, titleEn: 'Organic Chemistry', titleMn: 'Органик химi', descriptionEn: 'Homologous series, naming, fuels, alkanes, alkenes, alcohols, acids and polymers.', descriptionMn: 'Гомолог цуваа, нэршил, түлш, алкан, алкен, спирт, хүчил, полимер.', iconName: 'Atom', color: 'violet' },
  { id: 'ch-experimental-analysis', number: 12, titleEn: 'Experimental Techniques & Chemical Analysis', titleMn: 'Туршилтын арга ба химийн шинжилгээ', descriptionEn: 'Experimental design, titration, chromatography, separation and identification of ions and gases.', descriptionMn: 'Туршилтын зохион байгуулалт, титрлэл, хроматографи, салгалт, ион ба хийн таних.', iconName: 'TestTube2', color: 'purple' }
];

// Existing topics written earlier, mapped to their syllabus numbers
const REMAP: Record<string, { ref: string; chapter: string }> = {
  'top-1-1': { ref: '1.1', chapter: 'ch-states-of-matter' },
  'top-2-1': { ref: '2.4', chapter: 'ch-atoms-bonding' },
  'top-3-1': { ref: '3.3', chapter: 'ch-stoichiometry' },
  'top-4-1': { ref: '4.1', chapter: 'ch-electrochemistry' },
  'top-7-1': { ref: '7.3', chapter: 'ch-acids-bases' },
  'top-8-1': { ref: '6.2', chapter: 'ch-reactions' },
  'top-12-1': { ref: '12.5', chapter: 'ch-experimental-analysis' },
  'top-21-1': { ref: '12.3', chapter: 'ch-experimental-analysis' }
};

const refOrder = (a: string, b: string) => {
  const [a1, a2 = 0] = a.split('.').map(Number);
  const [b1, b2 = 0] = b.split('.').map(Number);
  return a1 - b1 || a2 - b2;
};

// Builds the full 12-chapter syllabus from the original topics and the new sub-topics
export const buildCurriculum = (base: Chapter[], extra: Topic[]): Chapter[] => {
  const baseTopics = base.flatMap(c => c.topics).map(t => {
    const r = REMAP[t.id];
    return r ? { ...t, chapterId: r.chapter, number: r.ref, syllabusRef: `0620/${r.ref}` } : t;
  });
  const all = [...baseTopics, ...extra].map(t => {
    const rows = ALL_OBJECTIVES[t.number];
    const withObjectives = rows ? { ...t, learningObjectives: toObjectives(t.number, rows) } : t;
    // Extended lesson content goes after the core sections, marked so the Core view can hide it
    const ext = EXTENDED_SECTIONS[t.number];
    if (!ext) return withObjectives;
    return {
      ...withObjectives,
      sections: [
        ...withObjectives.sections,
        { id: `${t.id}-ext`, titleEn: ext.titleEn, titleMn: ext.titleMn, contentEn: ext.contentEn, contentMn: ext.contentMn, tier: 'extended' as const }
      ]
    };
  });
  return CHAPTER_DEFS.map(def => ({
    ...def,
    topics: all.filter(t => t.chapterId === def.id).sort((a, b) => refOrder(a.number, b.number))
  }));
};
