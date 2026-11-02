import { CURRICULUM_CHAPTERS } from './curriculumData';

// The timed chapter tests of the 0620 course, grouped by subject. Each test is named for its subject and lists the chapters
// behind it. A test stays locked until every topic of its chapters is finished; the teacher sees them all. A test without a
// zip is planned: it shows as coming soon and cannot be started.
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
  }
];

// Every topic of a test's chapters. The test opens once all of them are finished.
export const testTopicIds = (test: ChapterTest): string[] =>
  CURRICULUM_CHAPTERS.filter(c => test.chapterIds.includes(c.id)).flatMap(c => c.topics.map(t => t.id));

export const testUnlocked = (test: ChapterTest, completedTopics: string[]): boolean => {
  const ids = testTopicIds(test);
  return ids.length > 0 && ids.every(id => completedTopics.includes(id));
};
