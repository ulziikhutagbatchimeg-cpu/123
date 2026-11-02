import { CURRICULUM_CHAPTERS } from './curriculumData';

// The timed chapter tests of the 0620 course, in five groups of chapters. Each test stays locked until every topic of its
// chapters is finished; the teacher sees them all. A test without a zip is planned: it shows as coming soon and cannot be started.
export type ChapterTest = {
  id: string;
  course: 'igcse';
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
    titleEn: 'Chapters 1–5 Assessment',
    titleMn: '1–5-р бүлгийн шалгалт',
    chapterIds: ['ch-states-of-matter', 'ch-atoms-bonding', 'ch-stoichiometry', 'ch-electrochemistry', 'ch-energetics'],
    chapters: '1–5',
    minutes: 70,
    marks: 70,
    descEn: 'States of matter, atomic structure, bonding, formulae and equations, chemical calculations. Section A: 30 multiple choice. Section B: 6 structured questions.',
    descMn: 'Бодисын төлөв, атомын бүтэц, холбоо, томьёо ба тэгшитгэл, химийн тооцоо. А хэсэг: 30 сонгох асуулт. B хэсэг: 6 бүтэцтэй асуулт.',
    zip: '0620_Test_Ch1-5_70min_SCORM.zip'
  },
  {
    id: '0620-ch6-7',
    course: 'igcse',
    titleEn: 'Chapters 6–7 Assessment',
    titleMn: '6–7-р бүлгийн шалгалт',
    chapterIds: ['ch-reactions', 'ch-acids-bases'],
    chapters: '6–7',
    minutes: 60,
    marks: 60,
    descEn: 'Chemical reactions, rates, equilibrium, redox, acids, bases, oxides, salts and titration.',
    descMn: 'Химийн урвал, хурд, тэнцвэр, исэлдэлт-бууралт, хүчил, шүлт, исэл, давс, титрлэлт.'
  },
  {
    id: '0620-ch8-9',
    course: 'igcse',
    titleEn: 'Chapters 8–9 Assessment',
    titleMn: '8–9-р бүлгийн шалгалт',
    chapterIds: ['ch-periodic-table', 'ch-metals'],
    chapters: '8–9',
    minutes: 60,
    marks: 60,
    descEn: 'The Periodic Table, groups I, VII, transition elements and noble gases; metals, alloys, reactivity, corrosion and extraction.',
    descMn: 'Үелэх систем, I ба VII бүлэг, шилжилтийн элемент, благородны хий; металл, хайлш, идэвх, зэврэлт, олборлолт.'
  },
  {
    id: '0620-ch10-11',
    course: 'igcse',
    titleEn: 'Chapters 10–11 Assessment',
    titleMn: '10–11-р бүлгийн шалгалт',
    chapterIds: ['ch-environment', 'ch-organic'],
    chapters: '10–11',
    minutes: 60,
    marks: 60,
    descEn: 'Water, fertilisers and air quality; organic chemistry: alkanes, alkenes, alcohols, carboxylic acids and polymers.',
    descMn: 'Ус, бордоо, агаарын чанар; органик хими: алкан, алкен, спирт, карбоксилын хүчил, полимер.'
  },
  {
    id: '0620-ch12',
    course: 'igcse',
    titleEn: 'Chapter 12 Assessment',
    titleMn: '12-р бүлгийн шалгалт',
    chapterIds: ['ch-experimental-analysis'],
    chapters: '12',
    minutes: 40,
    marks: 40,
    descEn: 'Experimental design, titrations, separation and purification, chromatography and qualitative analysis.',
    descMn: 'Туршилтын загвар, титрлэлт, тусгаарлалт ба цэвэршүүлэлт, хроматограф, чанарын шинжилгээ.'
  }
];

// Every topic of a test's chapters. The test opens once all of them are finished.
export const testTopicIds = (test: ChapterTest): string[] =>
  CURRICULUM_CHAPTERS.filter(c => test.chapterIds.includes(c.id)).flatMap(c => c.topics.map(t => t.id));

export const testUnlocked = (test: ChapterTest, completedTopics: string[]): boolean => {
  const ids = testTopicIds(test);
  return ids.length > 0 && ids.every(id => completedTopics.includes(id));
};
