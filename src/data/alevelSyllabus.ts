// The Cambridge 9701 syllabus (2025, 2026 and 2027). Topics 1–22 are the AS Level. A Level candidates study the AS topics
// and also topics 23–37, which are A Level only. Every 9701 chapter in the app follows one of these topic numbers, so a
// chapter's level is the level of its topic.
export type SyllabusLevel = 'as' | 'a';

// The course a student chose within 9701: AS Level, or A Level (which includes every AS topic)
export type AlevelCourse = 'as' | 'a';

export interface SyllabusTopic {
  number: number;
  titleEn: string;
  titleMn: string;
  level: SyllabusLevel;
}

export const ALEVEL_SYLLABUS: SyllabusTopic[] = [
  { number: 1, titleEn: 'Atomic structure', titleMn: 'Атомын бүтэц', level: 'as' },
  { number: 2, titleEn: 'Atoms, molecules and stoichiometry', titleMn: 'Атом, молекул ба стехиометр', level: 'as' },
  { number: 3, titleEn: 'Chemical bonding', titleMn: 'Химийн холбоо', level: 'as' },
  { number: 4, titleEn: 'States of matter', titleMn: 'Бодисын төлөв', level: 'as' },
  { number: 5, titleEn: 'Chemical energetics', titleMn: 'Химийн энергетик', level: 'as' },
  { number: 6, titleEn: 'Electrochemistry', titleMn: 'Электрохими', level: 'as' },
  { number: 7, titleEn: 'Equilibria', titleMn: 'Тэнцвэр', level: 'as' },
  { number: 8, titleEn: 'Reaction kinetics', titleMn: 'Урвалын кинетик', level: 'as' },
  { number: 9, titleEn: 'The Periodic Table: chemical periodicity', titleMn: 'Үелэх систем: химийн үечлэл', level: 'as' },
  { number: 10, titleEn: 'Group 2', titleMn: '2-р бүлгийн элементүүд', level: 'as' },
  { number: 11, titleEn: 'Group 17', titleMn: '17-р бүлгийн элементүүд', level: 'as' },
  { number: 12, titleEn: 'Nitrogen and sulfur', titleMn: 'Азот ба хүхэр', level: 'as' },
  { number: 13, titleEn: 'An introduction to AS Level organic chemistry', titleMn: 'AS органик химийн танилцуулга', level: 'as' },
  { number: 14, titleEn: 'Hydrocarbons', titleMn: 'Нүүрсустөрөгч', level: 'as' },
  { number: 15, titleEn: 'Halogen compounds', titleMn: 'Галоген нэгдэл', level: 'as' },
  { number: 16, titleEn: 'Hydroxy compounds', titleMn: 'Гидроксил нэгдэл', level: 'as' },
  { number: 17, titleEn: 'Carbonyl compounds', titleMn: 'Карбонилын нэгдэл', level: 'as' },
  { number: 18, titleEn: 'Carboxylic acids and derivatives', titleMn: 'Карбоксилын хүчил ба дериватив', level: 'as' },
  { number: 19, titleEn: 'Nitrogen compounds', titleMn: 'Азотын нэгдэл', level: 'as' },
  { number: 20, titleEn: 'Polymerisation', titleMn: 'Полимержилт', level: 'as' },
  { number: 21, titleEn: 'Organic synthesis', titleMn: 'Органик синтез', level: 'as' },
  { number: 22, titleEn: 'Analytical techniques', titleMn: 'Аналитик арга', level: 'as' },
  { number: 23, titleEn: 'Chemical energetics', titleMn: 'Химийн энергетик (A Level)', level: 'a' },
  { number: 24, titleEn: 'Electrochemistry', titleMn: 'Электрохими (A Level)', level: 'a' },
  { number: 25, titleEn: 'Equilibria', titleMn: 'Тэнцвэр (A Level)', level: 'a' },
  { number: 26, titleEn: 'Reaction kinetics', titleMn: 'Урвалын кинетик (A Level)', level: 'a' },
  { number: 27, titleEn: 'Group 2', titleMn: '2-р бүлэг (A Level)', level: 'a' },
  { number: 28, titleEn: 'Chemistry of transition elements', titleMn: 'Шилжилтийн элементүүдийн хими', level: 'a' },
  { number: 29, titleEn: 'An introduction to A Level organic chemistry', titleMn: 'A Level органик химийн танилцуулга', level: 'a' },
  { number: 30, titleEn: 'Hydrocarbons', titleMn: 'Нүүрсустөрөгч (A Level)', level: 'a' },
  { number: 31, titleEn: 'Halogen compounds', titleMn: 'Галоген нэгдэл (A Level)', level: 'a' },
  { number: 32, titleEn: 'Hydroxy compounds', titleMn: 'Гидроксил нэгдэл (A Level)', level: 'a' },
  { number: 33, titleEn: 'Carboxylic acids and derivatives', titleMn: 'Карбоксилын хүчил ба дериватив (A Level)', level: 'a' },
  { number: 34, titleEn: 'Nitrogen compounds', titleMn: 'Азотын нэгдэл (A Level)', level: 'a' },
  { number: 35, titleEn: 'Polymerisation', titleMn: 'Полимержилт (A Level)', level: 'a' },
  { number: 36, titleEn: 'Organic synthesis', titleMn: 'Органик синтез (A Level)', level: 'a' },
  { number: 37, titleEn: 'Analytical techniques', titleMn: 'Аналитик арга (A Level)', level: 'a' }
];

// The syllabus topic that each 9701 chapter of the app covers, by chapter id
export const CHAPTER_SYLLABUS_TOPIC: Record<string, number> = {
  'al-ch-1': 1,
  'al-ch-2': 2,
  'al-ch-3': 3,
  'al-ch-4': 4,
  'al-ch-5': 5,
  'al-ch-6': 6,
  'al-ch-7': 7,
  'al-ch-8': 8,
  'al-ch-9': 9,
  'al-ch-10': 10,
  'al-ch-11': 11,
  'al-ch-13': 13,
  'al-ch-14': 14,
  'al-ch-15': 15,
  'al-ch-16': 16,
  'al-ch-17': 17,
  'al-ch-18': 18
};

// The level of a 9701 chapter, taken from its syllabus topic
export const chapterLevel = (chapterId: string): SyllabusLevel => {
  const topic = ALEVEL_SYLLABUS.find(t => t.number === CHAPTER_SYLLABUS_TOPIC[chapterId]);
  return topic?.level ?? 'as';
};

// AS students see the AS topics only; A Level students see every topic
export const isVisibleFor = (level: SyllabusLevel, course: AlevelCourse): boolean => course === 'a' || level === 'as';

// The syllabus topics for a course that the app has no chapter for yet, so the menus can show them as still to come
export const topicsWithoutChapter = (course: AlevelCourse): SyllabusTopic[] => {
  const covered = new Set(Object.values(CHAPTER_SYLLABUS_TOPIC));
  return ALEVEL_SYLLABUS.filter(t => isVisibleFor(t.level, course) && !covered.has(t.number));
};
