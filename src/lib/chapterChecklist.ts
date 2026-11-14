import { useEffect, useState } from 'react';
import type { CourseChoice } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { alevelCourse, visibleChapters } from '../data/alevelSyllabus';
import { STATES_LESSONS, type StatesLesson } from '../data/statesLessons';
import { QUICK_CHECKS } from '../data/statesLessonExtras';
import { STATES_PRACTICE } from '../data/statesLessonSupport';
import { IGCSE_LESSON_SERIES } from '../data/igcseLessons';
import { ALEVEL_LESSON_SERIES } from '../data/latticeLessons';
import { ALEVEL_INQUIRY } from '../data/alevelInquiry';
import { quickCheckFor } from './quickCheck';
import { labDoneKey, practiceDoneKey } from './lessonGate';
import { KEPT_RESTORED } from './accountCopy';
import { SELF_CHECK_EVENT, type Level, type Tally3 } from './selfCheck';

// The checklist of a programme, chapter by chapter: every lesson with the parts a student must finish before its exit ticket
// opens, the exit ticket itself (passed above PASS_ABOVE), the end-of-topic tests and the self-check of the chapter's
// objectives and key words. Nothing is ticked by hand: each item is done when the site has recorded it. It also names what
// keeps the next lesson closed, so a student (and the teacher) sees exactly what is left.
//
// The same rules as the lessons themselves (components/InteractiveChapterOne.tsx for IGCSE chapter 1, LessonSeries.tsx for
// the other series, AlevelInquiryLesson.tsx for the 9701 inquiry lessons, CurriculumView.tsx for which lesson opens when).
// The student's browser reads the state (readChecklistState) and sends it with the results summary, so the teacher's copy
// builds the very same checklist (buildChecklist).

type Bi = { en: string; mn: string };

export const PASS_ABOVE = 60; // the exit-ticket score a lesson must pass to open the next one, as the lessons use
const PREDICTION_MIN = 10; // the prediction counts once it has this many characters, as the lessons use
const INQUIRY_SCORES = 'alevel-inquiry-scores'; // the 9701 inquiry lessons' exit-ticket scores, by chapter id
const STATES_SCORES = 'igcse-ch1-exit-scores'; // IGCSE chapter 1's exit-ticket scores, by lesson id
const DONE_EVENT = 'chem-done-changed';
const ACTIVITY_EVENT = 'chem-activity-changed';

// One part of a lesson to finish before its exit ticket
export interface PartDef {
  id: string; // prediction, lab-<n>, quick, practice or selfcheck
  label: Bi;
}

// One lesson of the programme, in the order the student meets it
export interface LessonDef {
  key: string; // the lesson's own id; for a 9701 inquiry lesson, alevel_<chapter id>
  chapterId: string;
  code: Bi; // L1, L2…, or "Inquiry lesson"
  title: Bi;
  parts: PartDef[];
  gated: boolean; // true: it opens only when the gated lesson before it is passed (every IGCSE lesson and the 9701 series)
}

// What the student has done, as the browser keeps it, and as it travels to the teacher with the summary
export interface ChecklistState {
  scores: Record<string, number>; // the best exit-ticket score of each lesson, by lesson key
  parts: Record<string, string[]>; // the parts done of each lesson (the self-check comes from the ratings instead)
  topics: string[]; // the topics whose end-of-topic test is passed
}

export type ChapterSelfCheck = Record<string, { lo: Tally3; kw: Tally3 }>;

const PART_LABEL: Record<string, Bi> = {
  prediction: { mn: 'Таамаглалаа бичих', en: 'Write the prediction' },
  quick: { mn: 'Түргэн шалгалтын бүх асуултад хариулах', en: 'Answer every quick-check question' },
  practice: { mn: 'Бие даах дасгалыг бүгдийг хийх', en: 'Do all the practice' },
  selfcheck: { mn: 'Бүлгийн сурах зорилт, түлхүүр үгийг бүгдийг үнэлэх', en: 'Rate all the chapter’s objectives and key words' }
};
const labLabel = (n: number, many: boolean): Bi => ({
  mn: many ? `${n}-р симуляцийг хийж «Илгээх» дарах` : 'Симуляцийг хийж «Илгээх» дарах',
  en: many ? `Do simulation ${n} and press Submit` : 'Do the simulation and press Submit'
});

export const chaptersOf = (course: CourseChoice) =>
  course === 'igcse' ? CURRICULUM_CHAPTERS : visibleChapters(ALEVEL_CHAPTERS, alevelCourse(course));

// The lessons of the programme in order, each with its parts. A Core IGCSE student skips the Extended lessons.
export const courseLessons = (course: CourseChoice, level: Level): LessonDef[] => {
  const shown = (l: StatesLesson) => level === 'extended' || l.tier !== 'extended';
  const out: LessonDef[] = [];
  chaptersOf(course).forEach(ch => {
    if (course === 'igcse' && ch.id === 'ch-states-of-matter') {
      STATES_LESSONS.forEach((l, i) => {
        if (!shown(l)) return;
        const parts: PartDef[] = [{ id: 'prediction', label: PART_LABEL.prediction }];
        if (l.id !== 'states-2') parts.push({ id: 'lab-0', label: labLabel(1, false) });
        if ((QUICK_CHECKS[l.id] ?? []).length > 0) parts.push({ id: 'quick', label: PART_LABEL.quick });
        if ((STATES_PRACTICE[l.id] ?? []).length > 0) parts.push({ id: 'practice', label: PART_LABEL.practice });
        if (i === STATES_LESSONS.length - 1) parts.push({ id: 'selfcheck', label: PART_LABEL.selfcheck });
        out.push({ key: l.id, chapterId: ch.id, code: { mn: `L${l.number}`, en: `L${l.number}` }, title: l.title, parts, gated: true });
      });
      return;
    }
    const series = (course === 'igcse' ? IGCSE_LESSON_SERIES : ALEVEL_LESSON_SERIES)[ch.id];
    if (series) {
      const lessons = series.lessons.filter(shown);
      lessons.forEach((l, i) => {
        const parts: PartDef[] = [{ id: 'prediction', label: PART_LABEL.prediction }];
        const widgets = ([] as { lab?: boolean }[]).concat(series.widgets?.[l.id] ?? []);
        const labs = widgets.flatMap((w, k) => (w.lab === false ? [] : [k]));
        labs.forEach((k, n) => parts.push({ id: `lab-${k}`, label: labLabel(n + 1, labs.length > 1) }));
        if (quickCheckFor(l, series.glossary).length > 0) parts.push({ id: 'quick', label: PART_LABEL.quick });
        if ((series.practice[l.id] ?? []).length > 0) parts.push({ id: 'practice', label: PART_LABEL.practice });
        if (i === lessons.length - 1 && ch.topics.length > 0) parts.push({ id: 'selfcheck', label: PART_LABEL.selfcheck });
        out.push({ key: l.id, chapterId: ch.id, code: { mn: `L${l.number}`, en: `L${l.number}` }, title: l.title, parts, gated: true });
      });
    }
    const plan = course === 'igcse' ? undefined : ALEVEL_INQUIRY[ch.id];
    if (plan) {
      const parts: PartDef[] = [{ id: 'prediction', label: PART_LABEL.prediction }];
      if (plan.practice.length > 0) parts.push({ id: 'practice', label: PART_LABEL.practice });
      if (ch.topics.length > 0) parts.push({ id: 'selfcheck', label: PART_LABEL.selfcheck });
      out.push({
        key: `alevel_${ch.id}`,
        chapterId: ch.id,
        code: { mn: 'Судалгааны хичээл', en: 'Inquiry lesson' },
        title: { mn: ch.titleMn, en: ch.titleEn },
        parts,
        gated: false
      });
    }
  });
  return out;
};

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
const readFlag = (key: string): boolean => {
  try {
    return window.localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
};
const predictionWritten = (lessonKey: string): boolean => {
  try {
    return (window.localStorage.getItem(`chem_prediction_${lessonKey}`) ?? '').trim().length >= PREDICTION_MIN;
  } catch {
    return false;
  }
};
// Every quick-check question answered (or marked done), as the lessons read it
const quickAnswered = (lessonId: string, count: number): boolean => {
  if (count === 0) return true;
  if (readFlag(`chem_quick_${lessonId}_done`)) return true;
  const picked = readJson<Record<string, number | null | undefined>>(`chem_quick_${lessonId}`, {});
  return Array.from({ length: count }, (_, i) => picked[String(i)] !== undefined && picked[String(i)] !== null).every(Boolean);
};

// What this browser has recorded for the programme: exit-ticket scores, the parts done, and the passed end-of-topic tests
export const readChecklistState = (course: CourseChoice, level: Level, completedTopics: string[]): ChecklistState => {
  const scores: Record<string, number> = {};
  const parts: Record<string, string[]> = {};
  const seriesScores = new Map<string, Record<string, number>>();
  const inquiryScores = readJson<Record<string, number>>(INQUIRY_SCORES, {});
  const statesScores = readJson<Record<string, number>>(STATES_SCORES, {});
  courseLessons(course, level).forEach(l => {
    let score: number | undefined;
    if (l.key.startsWith('alevel_')) score = inquiryScores[l.chapterId];
    else if (l.chapterId === 'ch-states-of-matter') score = statesScores[l.key];
    else {
      const series = (course === 'igcse' ? IGCSE_LESSON_SERIES : ALEVEL_LESSON_SERIES)[l.chapterId];
      if (series) {
        if (!seriesScores.has(series.storageKey)) seriesScores.set(series.storageKey, readJson<Record<string, number>>(series.storageKey, {}));
        score = seriesScores.get(series.storageKey)?.[l.key];
      }
    }
    if (typeof score === 'number') scores[l.key] = score;
    const done = l.parts
      .filter(p => {
        if (p.id === 'prediction') return predictionWritten(l.key);
        if (p.id.startsWith('lab-')) return readFlag(labDoneKey(l.key, Number(p.id.slice(4))));
        if (p.id === 'quick') {
          const series = (course === 'igcse' ? IGCSE_LESSON_SERIES : ALEVEL_LESSON_SERIES)[l.chapterId];
          const lesson = series?.lessons.find(x => x.id === l.key);
          const count = l.chapterId === 'ch-states-of-matter' ? (QUICK_CHECKS[l.key] ?? []).length : lesson && series ? quickCheckFor(lesson, series.glossary).length : 0;
          return quickAnswered(l.key, count);
        }
        if (p.id === 'practice') return readFlag(practiceDoneKey(l.key));
        return false;
      })
      .map(p => p.id);
    if (done.length) parts[l.key] = done;
  });
  const own = new Set(chaptersOf(course).flatMap(c => c.topics.map(t => t.id)));
  return { scores, parts, topics: completedTopics.filter(t => own.has(t)) };
};

export type PartStatus = PartDef & { done: boolean };

export interface LessonRow {
  def: LessonDef;
  score: number | null; // null: the exit ticket has not been taken
  passed: boolean;
  open: boolean; // the lesson can be studied now
  parts: PartStatus[];
}

export interface TopicRow {
  id: string;
  label: Bi;
  passed: boolean;
}

export type ChapterStatus = 'done' | 'doing' | 'todo' | 'locked';

export interface ChapterRow {
  chapterId: string;
  number: number;
  title: Bi;
  firstTopicId: string;
  lessons: LessonRow[];
  topics: TopicRow[]; // the end-of-topic tests (IGCSE chapter 1 has none)
  lo: Tally3 | null;
  kw: Tally3 | null;
  done: number; // the items done: lessons passed, topic tests passed, the objectives and the key words once all rated
  total: number;
  status: ChapterStatus;
}

// What the student must do next: the first lesson not passed yet, with each part and the exit ticket
export interface NextStep {
  chapter: ChapterRow;
  lesson: LessonRow | null; // null: every lesson is passed and the chapter's tests or self-check are left
  blocking: boolean; // true: the next lesson stays closed until this is done
}

export interface Checklist {
  chapters: ChapterRow[];
  next: NextStep | null;
  doneChapters: number;
  itemsLeft: number;
}

const rated = (t: Tally3 | null | undefined) => !t || t.total === 0 || t.rated >= t.total;

// The checklist of a programme from what was recorded. allOpen: the student may open every lesson (full access).
export const buildChecklist = (
  course: CourseChoice,
  level: Level,
  state: ChecklistState,
  selfCheck: ChapterSelfCheck,
  allOpen: boolean
): Checklist => {
  const lessons = courseLessons(course, level);
  const passedTopics = new Set(state.topics);
  // Which lessons are open: the first gated lesson, and each gated lesson whose gated lesson before it is passed
  const openKeys = new Set<string>();
  let previousPassed = true;
  lessons.forEach(l => {
    const passed = (state.scores[l.key] ?? -1) > PASS_ABOVE;
    if (!l.gated || allOpen || previousPassed) openKeys.add(l.key);
    if (l.gated) previousPassed = passed;
  });

  const chapters: ChapterRow[] = chaptersOf(course).map(ch => {
    const sc = selfCheck[ch.id];
    const chapterRated = rated(sc?.lo) && rated(sc?.kw);
    const rows: LessonRow[] = lessons
      .filter(l => l.chapterId === ch.id)
      .map(l => {
        const score = typeof state.scores[l.key] === 'number' ? state.scores[l.key] : null;
        const doneParts = new Set(state.parts[l.key] ?? []);
        return {
          def: l,
          score,
          passed: (score ?? -1) > PASS_ABOVE,
          open: openKeys.has(l.key),
          parts: l.parts.map(p => ({ ...p, done: p.id === 'selfcheck' ? chapterRated : doneParts.has(p.id) }))
        };
      });
    const topics: TopicRow[] =
      ch.id === 'ch-states-of-matter'
        ? []
        : ch.topics.map(t => {
            const topic = t as unknown as { id: string; number?: string; titleMn?: string; titleEn?: string };
            return {
              id: topic.id,
              label: { mn: `${topic.number ?? ''} ${topic.titleMn ?? ''}`.trim(), en: `${topic.number ?? ''} ${topic.titleEn ?? ''}`.trim() },
              passed: passedTopics.has(topic.id)
            };
          });
    const lo = sc?.lo && sc.lo.total > 0 ? sc.lo : null;
    const kw = sc?.kw && sc.kw.total > 0 ? sc.kw : null;
    const total = rows.length + topics.length + (lo ? 1 : 0) + (kw ? 1 : 0);
    const done =
      rows.filter(r => r.passed).length +
      topics.filter(t => t.passed).length +
      (lo && lo.rated >= lo.total ? 1 : 0) +
      (kw && kw.rated >= kw.total ? 1 : 0);
    const started =
      done > 0 ||
      rows.some(r => r.score !== null || r.parts.some(p => p.done && p.id !== 'selfcheck')) ||
      (lo?.rated ?? 0) > 0 ||
      (kw?.rated ?? 0) > 0;
    const anyOpen = rows.length === 0 || rows.some(r => r.open);
    const status: ChapterStatus = total > 0 && done >= total ? 'done' : started ? 'doing' : anyOpen ? 'todo' : 'locked';
    return {
      chapterId: ch.id,
      number: ch.number,
      title: { mn: ch.titleMn, en: ch.titleEn },
      firstTopicId: ch.topics[0]?.id ?? '',
      lessons: rows,
      topics,
      lo,
      kw,
      done,
      total,
      status
    };
  });

  // The next thing to do: the first open gated lesson not passed (it keeps the next one closed), else the first open lesson
  // not passed, else the first chapter not finished
  let next: NextStep | null = null;
  for (const ch of chapters) {
    const row = ch.lessons.find(r => r.def.gated && r.open && !r.passed);
    if (row) {
      next = { chapter: ch, lesson: row, blocking: !allOpen };
      break;
    }
  }
  if (!next) {
    for (const ch of chapters) {
      const row = ch.lessons.find(r => r.open && !r.passed);
      if (row) {
        next = { chapter: ch, lesson: row, blocking: false };
        break;
      }
    }
  }
  if (!next) {
    const ch = chapters.find(c => c.status !== 'done' && c.status !== 'locked' && c.total > 0);
    if (ch) next = { chapter: ch, lesson: null, blocking: false };
  }

  return {
    chapters,
    next,
    doneChapters: chapters.filter(c => c.status === 'done').length,
    itemsLeft: chapters.reduce((n, c) => n + (c.total - c.done), 0)
  };
};

// A number that changes whenever the student finishes something (a part, an exit ticket, a rating, the account copy coming
// back), so a view or the results sync reads the checklist again
export const useChecklistTick = (): number => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick(t => t + 1);
    const names = [DONE_EVENT, ACTIVITY_EVENT, SELF_CHECK_EVENT, KEPT_RESTORED, 'storage'];
    names.forEach(n => window.addEventListener(n, bump));
    return () => names.forEach(n => window.removeEventListener(n, bump));
  }, []);
  return tick;
};
