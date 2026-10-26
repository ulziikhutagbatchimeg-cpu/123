// The Cambridge 9701 syllabus (2025, 2026 and 2027). Topics 1–22 are the AS Level. A Level candidates study the AS topics
// and also topics 23–37, which are A Level only.
//
// HOW TO ADD 9701 MATERIAL. A chapter's id is al-ch-N, and it covers syllabus topic N, so its level follows from its id.
// Write the chapter in alevelCurriculum.ts, its key terms and glossary in alevelGlossaryA.ts (or alevelGlossaryExtra.ts). Then
// it appears in every menu with its level tag, and it leaves the "not yet in the app" list in the schedule.
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

// The syllabus topic a 9701 chapter covers: chapter al-ch-N covers topic N
export const topicOfChapter = (chapterId: string): number | undefined => {
  const match = /^al-ch-(\d+)$/.exec(chapterId);
  return match ? Number(match[1]) : undefined;
};

// The level of a 9701 chapter, from its syllabus topic
export const chapterLevel = (chapterId: string): SyllabusLevel =>
  ALEVEL_SYLLABUS.find(t => t.number === topicOfChapter(chapterId))?.level ?? 'as';

// Each choice shows its own level: AS shows topics 1–22, A Level shows topics 23–37
export const isVisibleFor = (level: SyllabusLevel, course: AlevelCourse): boolean => level === course;

// The course a student's choice means for the 9701 lists
export const alevelCourse = (choice: 'igcse' | 'as' | 'a'): AlevelCourse => (choice === 'a' ? 'a' : 'as');

// Whether a chapter (0620 or 9701) belongs to the chosen course; a 9701 chapter is one with an al-ch-N id
export const chapterInCourse = (chapterId: string, choice: 'igcse' | 'as' | 'a'): boolean =>
  choice === 'igcse' ? !/^al-ch-\d+$/.test(chapterId) : /^al-ch-\d+$/.test(chapterId) && isVisibleFor(chapterLevel(chapterId), alevelCourse(choice));

// The 9701 chapters (or any items that carry a chapter id) that the chosen course shows
export const visibleChapters = <T extends { id: string }>(items: T[], course: AlevelCourse): T[] =>
  items.filter(item => isVisibleFor(chapterLevel(item.id), course));

// The syllabus topics of a course that have no chapter with key terms yet, so the menus can show them as still to come
export const topicsWithoutChapter = (course: AlevelCourse, coveredTopics: number[]): SyllabusTopic[] =>
  ALEVEL_SYLLABUS.filter(t => isVisibleFor(t.level, course) && !coveredTopics.includes(t.number));
