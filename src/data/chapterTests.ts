import { CURRICULUM_CHAPTERS } from './curriculumData';
import { ALEVEL_CHAPTERS } from './alevelCurriculum';
import type { Chapter } from '../types/chemistry';

// The timed chapter tests, grouped by subject: the 0620 course, and the AS Level chapters of 9701 (A Level students take them
// too). Each test is named for its subject and lists the chapters behind it. A test stays locked until every topic of its
// chapters is finished; the teacher sees them all. A test without a zip is planned: it shows as coming soon and cannot be started.
export type ChapterTest = {
  id: string;
  course: 'igcse' | 'alevel';
  titleEn: string;
  titleMn: string;
  chapterIds: string[];
  chapters: string;
  minutes: number;
  marks: number;
  descEn: string;
  descMn: string;
  zip?: string;
};

export const CHAPTER_TESTS: ChapterTest[] = [
  {
    id: '0620-ch1-5',
    course: 'igcse',
    titleEn: 'General and physical chemistry',
    titleMn: 'Ерөнхий ба физик хими',
    chapterIds: ['ch-states-of-matter', 'ch-atoms-bonding', 'ch-stoichiometry', 'ch-electrochemistry', 'ch-energetics'],
    chapters: '1–5',
    minutes: 70,
    marks: 70,
    descEn: 'Chapter 1 States of matter · Chapter 2 Atoms and bonding · Chapter 3 Stoichiometry · Chapter 4 Electrochemistry · Chapter 5 Energetics. Section A: 30 multiple choice. Section B: 6 structured questions.',
    descMn: 'Бүлэг 1 Бодисын төлөв · Бүлэг 2 Атом ба холбоо · Бүлэг 3 Стехиометр · Бүлэг 4 Электрохими · Бүлэг 5 Энергетик. А хэсэг: 30 сонгох асуулт. B хэсэг: 6 бүтэцтэй асуулт.',
    zip: '0620_Test_Ch1-5_70min_SCORM.zip'
  },
  {
    id: '0620-ch6-7',
    course: 'igcse',
    titleEn: 'Reactions and acids',
    titleMn: 'Урвал ба хүчил-шүлт',
    chapterIds: ['ch-reactions', 'ch-acids-bases'],
    chapters: '6–7',
    minutes: 60,
    marks: 60,
    descEn: 'Chapter 6 Chemical reactions: rates, equilibrium and redox · Chapter 7 Acids, bases and salts: oxides, salt preparation and titration.',
    descMn: 'Бүлэг 6 Химийн урвал: хурд, тэнцвэр, исэлдэлт-бууралт · Бүлэг 7 Хүчил, шүлт, давс: исэл, давс бэлтгэх, титрлэлт.'
  },
  {
    id: '0620-ch8-9',
    course: 'igcse',
    titleEn: 'Elements and metals',
    titleMn: 'Элемент ба металл',
    chapterIds: ['ch-periodic-table', 'ch-metals'],
    chapters: '8–9',
    minutes: 60,
    marks: 60,
    descEn: 'Chapter 8 The Periodic Table: groups I and VII, transition elements, noble gases · Chapter 9 Metals: alloys, reactivity, corrosion and extraction.',
    descMn: 'Бүлэг 8 Үелэх систем: I ба VII бүлэг, шилжилтийн элемент, благородны хий · Бүлэг 9 Металл: хайлш, идэвх, зэврэлт, олборлолт.'
  },
  {
    id: '0620-ch10-12',
    course: 'igcse',
    titleEn: 'Environment and analytical chemistry',
    titleMn: 'Байгаль орчин ба аналитик хими',
    chapterIds: ['ch-environment', 'ch-experimental-analysis'],
    chapters: '10, 12',
    minutes: 60,
    marks: 60,
    descEn: 'Chapter 10 Environmental chemistry: water, fertilisers, air quality · Chapter 12 Experimental techniques: design, titration, separation, chromatography and qualitative analysis.',
    descMn: 'Бүлэг 10 Байгаль орчны хими: ус, бордоо, агаарын чанар · Бүлэг 12 Туршилтын арга: загвар, титрлэлт, тусгаарлалт, хроматограф, чанарын шинжилгээ.'
  },
  {
    id: '0620-ch11',
    course: 'igcse',
    titleEn: 'Organic chemistry',
    titleMn: 'Органик хими',
    chapterIds: ['ch-organic'],
    chapters: '11',
    minutes: 40,
    marks: 40,
    descEn: 'Chapter 11 Organic chemistry: formulae and functional groups, naming, fuels, alkanes, alkenes, alcohols, carboxylic acids and polymers.',
    descMn: 'Бүлэг 11 Органик хими: томьёо ба функциональ бүлэг, нэршил, түлш, алкан, алкен, спирт, карбоксилын хүчил, полимер.'
  },
  {
    id: '9701-as-1-4',
    course: 'alevel',
    titleEn: 'General chemistry',
    titleMn: 'Ерөнхий хими',
    chapterIds: ['al-ch-1', 'al-ch-2', 'al-ch-3', 'al-ch-4'],
    chapters: '1–4',
    minutes: 70,
    marks: 70,
    descEn: 'Chapter 1 Atomic structure · Chapter 2 Atoms, molecules and stoichiometry · Chapter 3 Chemical bonding · Chapter 4 States of matter.',
    descMn: 'Бүлэг 1 Атомын бүтэц · Бүлэг 2 Атом, молекул ба стехиометр · Бүлэг 3 Химийн холбоо · Бүлэг 4 Бодисын төлөв.'
  },
  {
    id: '9701-as-5-8',
    course: 'alevel',
    titleEn: 'Physical chemistry',
    titleMn: 'Физик хими',
    chapterIds: ['al-ch-5', 'al-ch-6', 'al-ch-7', 'al-ch-8'],
    chapters: '5–8',
    minutes: 60,
    marks: 60,
    descEn: 'Chapter 5 Chemical energetics · Chapter 6 Electrochemistry · Chapter 7 Equilibria · Chapter 8 Reaction kinetics.',
    descMn: 'Бүлэг 5 Химийн энергетик · Бүлэг 6 Электрохими · Бүлэг 7 Тэнцвэр · Бүлэг 8 Урвалын кинетик.'
  },
  {
    id: '9701-as-9-12',
    course: 'alevel',
    titleEn: 'Inorganic chemistry',
    titleMn: 'Бодисын хими',
    chapterIds: ['al-ch-9', 'al-ch-10', 'al-ch-11', 'al-ch-12'],
    chapters: '9–12',
    minutes: 60,
    marks: 60,
    descEn: 'Chapter 9 Chemical periodicity · Chapter 10 Group 2 · Chapter 11 Group 17 · Chapter 12 Nitrogen and sulfur.',
    descMn: 'Бүлэг 9 Химийн үелэлт · Бүлэг 10 II бүлэг · Бүлэг 11 VII бүлэг · Бүлэг 12 Азот ба хүхэр.'
  },
  {
    id: '9701-as-13-18',
    course: 'alevel',
    titleEn: 'Organic chemistry I',
    titleMn: 'Органик хими I',
    chapterIds: ['al-ch-13', 'al-ch-14', 'al-ch-15', 'al-ch-16', 'al-ch-17', 'al-ch-18'],
    chapters: '13–18',
    minutes: 70,
    marks: 70,
    descEn: 'Chapter 13 Introduction to organic chemistry · Chapter 14 Hydrocarbons · Chapter 15 Halogen compounds · Chapter 16 Hydroxy compounds · Chapter 17 Carbonyl compounds · Chapter 18 Carboxylic acids and derivatives.',
    descMn: 'Бүлэг 13 Органик химийн танилцуулга · Бүлэг 14 Нүүрсустөрөгч · Бүлэг 15 Галоген нэгдэл · Бүлэг 16 Гидрокси нэгдэл · Бүлэг 17 Карбонилын нэгдэл · Бүлэг 18 Карбоксилын хүчил ба дериватив.'
  },
  {
    id: '9701-as-19-22',
    course: 'alevel',
    titleEn: 'Organic chemistry II and analysis',
    titleMn: 'Органик хими II ба шинжилгээ',
    chapterIds: ['al-ch-19', 'al-ch-20', 'al-ch-21', 'al-ch-22'],
    chapters: '19–22',
    minutes: 60,
    marks: 60,
    descEn: 'Chapter 19 Nitrogen compounds · Chapter 20 Polymerisation · Chapter 21 Organic synthesis · Chapter 22 Analytical techniques.',
    descMn: 'Бүлэг 19 Азотын нэгдэл · Бүлэг 20 Полимержилт · Бүлэг 21 Органик синтез · Бүлэг 22 Шинжилгээний арга.'
  }
];

// The chapters a test belongs to: the 0620 chapters, or the 9701 AS chapters
const chaptersOf = (test: ChapterTest): Chapter[] => (test.course === 'igcse' ? CURRICULUM_CHAPTERS : ALEVEL_CHAPTERS);

// Every topic of a test's chapters. The test opens once all of them are finished.
export const testTopicIds = (test: ChapterTest): string[] =>
  chaptersOf(test).filter(c => test.chapterIds.includes(c.id)).flatMap(c => c.topics.map(t => t.id));

export const testUnlocked = (test: ChapterTest, completedTopics: string[]): boolean => {
  const ids = testTopicIds(test);
  return ids.length > 0 && ids.every(id => completedTopics.includes(id));
};
