import type { AlevelTopic } from '../types/alevel';
import type { Chapter, LessonSection, Topic, WorkedExample } from '../types/chemistry';
import { ALEVEL_TOPICS } from './alevelTopics';
import { ALEVEL_SECTIONS_1_8 } from './alevelSyllabus1';
import { ALEVEL_SECTIONS_9_22 } from './alevelSyllabus2';
import { ALEVEL_SECTIONS_23_37 } from './alevelSyllabus3';
import type { ALevelSubsection } from './alevelSubsectionTypes';

// The AS & A Level (9701, 2025–2027) syllabus in the same shape as the IGCSE chapters: 37 chapters (the syllabus
// sections), each with its subsections as topics, and every learning outcome as a checkable statement.
// The revision deck (a1–a22) is kept as revision notes and worked examples under the subsection it revises.

const SUBSECTIONS: ALevelSubsection[] = [...ALEVEL_SECTIONS_1_8, ...ALEVEL_SECTIONS_9_22, ...ALEVEL_SECTIONS_23_37];

// Syllabus sections 1–37: number, English title, Mongolian title, level
const SECTIONS: Array<[number, string, string, 'AS' | 'A2']> = [
  [1, 'Atomic structure', 'Атомын бүтэц', 'AS'],
  [2, 'Atoms, molecules and stoichiometry', 'Атом, молекул ба стехиометр', 'AS'],
  [3, 'Chemical bonding', 'Химийн холбоо', 'AS'],
  [4, 'States of matter', 'Бодисын төлөв', 'AS'],
  [5, 'Chemical energetics', 'Химийн энергетик', 'AS'],
  [6, 'Electrochemistry', 'Электрохими', 'AS'],
  [7, 'Equilibria', 'Тэнцвэр', 'AS'],
  [8, 'Reaction kinetics', 'Урвалын кинетик', 'AS'],
  [9, 'The Periodic Table: chemical periodicity', 'Үелэх систем: химийн үелэлт', 'AS'],
  [10, 'Group 2', 'II бүлэг', 'AS'],
  [11, 'Group 17', 'VII бүлэг (галоген)', 'AS'],
  [12, 'Nitrogen and sulfur', 'Азот ба хүхэр', 'AS'],
  [13, 'An introduction to AS Level organic chemistry', 'AS органик химийн танилцуулга', 'AS'],
  [14, 'Hydrocarbons', 'Нүүрсустөрөгч', 'AS'],
  [15, 'Halogen compounds', 'Галоген нэгдлүүд', 'AS'],
  [16, 'Hydroxy compounds', 'Гидрокси нэгдлүүд', 'AS'],
  [17, 'Carbonyl compounds', 'Карбонилын нэгдлүүд', 'AS'],
  [18, 'Carboxylic acids and derivatives', 'Карбоксилын хүчил ба деривативууд', 'AS'],
  [19, 'Nitrogen compounds', 'Азотын нэгдлүүд', 'AS'],
  [20, 'Polymerisation', 'Полимержилт', 'AS'],
  [21, 'Organic synthesis', 'Органик синтез', 'AS'],
  [22, 'Analytical techniques', 'Шинжилгээний арга', 'AS'],
  [23, 'Chemical energetics', 'Химийн энергетик', 'A2'],
  [24, 'Electrochemistry', 'Электрохими', 'A2'],
  [25, 'Equilibria', 'Тэнцвэр', 'A2'],
  [26, 'Reaction kinetics', 'Урвалын кинетик', 'A2'],
  [27, 'Group 2', 'II бүлэг', 'A2'],
  [28, 'Chemistry of transition elements', 'Шилжилтийн элементүүдийн химийн шинж чанар', 'A2'],
  [29, 'An introduction to A Level organic chemistry', 'A Level органик химийн танилцуулга', 'A2'],
  [30, 'Hydrocarbons (arenes)', 'Нүүрсустөрөгч (аренууд)', 'A2'],
  [31, 'Halogen compounds', 'Галоген нэгдлүүд', 'A2'],
  [32, 'Hydroxy compounds', 'Гидрокси нэгдлүүд', 'A2'],
  [33, 'Carboxylic acids and derivatives', 'Карбоксилын хүчил ба деривативууд', 'A2'],
  [34, 'Nitrogen compounds', 'Азотын нэгдлүүд', 'A2'],
  [35, 'Polymerisation', 'Полимержилт', 'A2'],
  [36, 'Organic synthesis', 'Органик синтез', 'A2'],
  [37, 'Analytical techniques', 'Шинжилгээний арга', 'A2']
];

// Notes printed under a subsection title (Mongolian; the English note is on the subsection itself)
const NOTES_MN: Record<string, string> = {
  '1.3': 'Атом эсвэл ион үндсэн төлөвт байна. Зөвхөн устөрөгчөөс криптон хүртэлх элементийг шалгана.',
  '1.4': 'Атом эсвэл ион үндсэн төлөвт байна. Зөвхөн устөрөгчөөс криптон хүртэлх элементийг шалгана.',
  '19.1': 'Аминыг ангилах нь AS түвшинд шалгагдахгүй.'
};

// Revision deck topics and the subsection each one revises
const REVISION_MAP: Record<string, string> = {
  a1: '1.1',
  a2: '1.3',
  a3: '2.4',
  a4: '3.1',
  a5: '4.1',
  a6: '5.1',
  a7: '6.1',
  a8: '7.1',
  a9: '8.1',
  a10: '9.2',
  a11: '10.1',
  a12: '11.2',
  a13: '12.1',
  a14: '13.1',
  a15: '14.1',
  a16: '15.1',
  a17: '16.1',
  a18: '17.1',
  a19: '19.1',
  a20: '20.1',
  a21: '21.1',
  a22: '22.1'
};

const ICON_FOR_SECTION = (n: number) =>
  n <= 8 ? 'Atom' : n <= 12 ? 'Grid' : n <= 22 ? 'Shapes' : n <= 28 ? 'Flame' : n <= 36 ? 'Shapes' : 'TestTube2';

const COLOR_FOR_SECTION = (n: number) =>
  n <= 8 ? 'indigo' : n <= 12 ? 'amber' : n <= 22 ? 'violet' : n <= 28 ? 'orange' : 'purple';

const revisionTopicsFor = (ref: string): AlevelTopic[] =>
  Object.entries(REVISION_MAP)
    .filter(([, target]) => target === ref)
    .map(([id]) => ALEVEL_TOPICS.find(t => t.id === id))
    .filter((t): t is AlevelTopic => !!t);

// The revision facts, must-know lines, pitfalls and quick checks as one Mongolian revision note
const revisionNote = (t: AlevelTopic): string =>
  [
    ...t.factsMn.map(f => `• ${f}`),
    ...t.mustKnowMn.map(m => `• ${m}`),
    ...t.quickChecksMn.map(q => `• ${q.questionMn} — ${q.answerMn}`),
    ...t.pitfallsMn.map(p => `• ${p.wrongMn} → ${p.rightMn}`)
  ].join('\n');

const workedExamplesFor = (topics: AlevelTopic[], topicId: string): WorkedExample[] =>
  topics.flatMap(t =>
    t.examplesMn.map((e, i) => ({
      id: `${topicId}-${t.id}-e${i}`,
      titleEn: e.titleMn,
      titleMn: e.titleMn,
      questionEn: e.questionMn,
      questionMn: e.questionMn,
      stepsEn: e.stepsMn,
      stepsMn: e.stepsMn,
      finalAnswerEn: e.answerMn,
      finalAnswerMn: e.answerMn,
      examinerTipEn: e.tipMn ?? '',
      examinerTipMn: e.tipMn ?? '',
      commonMistakeEn: '',
      commonMistakeMn: ''
    }))
  );

const sectionsFor = (topicId: string, revisions: AlevelTopic[]): LessonSection[] =>
  revisions.map(t => ({
    id: `${topicId}-rev-${t.id}`,
    titleEn: `Revision notes: ${t.titleEn} (Mongolian for now)`,
    titleMn: `Давтлагын тэмдэглэл: ${t.titleMn}`,
    contentEn: revisionNote(t),
    contentMn: revisionNote(t)
  }));

const topicFor = (s: ALevelSubsection): Topic => {
  const chapter = Number(s.ref.split('.')[0]);
  const revisions = revisionTopicsFor(s.ref);
  const id = `al-${s.ref}`;
  return {
    id,
    chapterId: `al-ch-${chapter}`,
    syllabusRef: `9701/${s.ref}`,
    number: s.ref,
    titleEn: s.en,
    titleMn: s.mn,
    summaryEn: s.note ?? '',
    summaryMn: NOTES_MN[s.ref] ?? '',
    learningObjectives: s.obj.map(([n, en, mn]) => ({
      id: `al.${s.ref}.${n}`,
      code: `${s.ref}.${n}`,
      en,
      mn,
      ao: 'AO1' as const
    })),
    vocabulary: [],
    sections: sectionsFor(id, revisions),
    workedExamples: workedExamplesFor(revisions, id),
    questions: []
  };
};

export const ALEVEL_CHAPTERS: Chapter[] = SECTIONS.map(([n, en, mn, level]) => {
  const levelEn = level === 'AS' ? 'AS Level' : 'A Level';
  const levelMn = level === 'AS' ? 'AS түвшний' : 'A түвшний';
  return {
    id: `al-ch-${n}`,
    number: n,
    titleEn: en,
    titleMn: mn,
    descriptionEn: `${levelEn} subject content, section ${n} of the 9701 syllabus (2025–2027).`,
    descriptionMn: `${levelMn} агуулга, 9701 (2025–2027) хичээлийн ${n} дэх хэсэг.`,
    iconName: ICON_FOR_SECTION(n),
    color: COLOR_FOR_SECTION(n),
    topics: SUBSECTIONS.filter(s => Number(s.ref.split('.')[0]) === n).map(topicFor)
  };
});
