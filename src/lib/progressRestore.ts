import { useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { isTeacher } from './cloud';
import { STATES_LESSONS } from '../data/statesLessons';
import { IGCSE_LESSON_SERIES } from '../data/igcseLessons';
import { ALEVEL_LESSON_SERIES } from '../data/latticeLessons';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';

// The lessons open one after another by the exit-ticket scores, which each browser keeps for itself. Every exit ticket is also
// sent to the student's account (students/{uid}/results). When a student signs in, the best score of each lesson is read back
// from the account onto this browser, so the lessons a student has opened stay open on any device. Scores only go up here.

export const PROGRESS_RESTORED = 'chem-progress-restored';
const STATES_KEY = 'igcse-ch1-exit-scores';

type Board = 'igcse' | 'alevel';
interface Target {
  key: string; // the browser storage key of the lesson's series
  lessonId: string;
}

const boardOf = (course: string): Board | null =>
  course === 'igcse' ? 'igcse' : course === 'as' || course === 'a' ? 'alevel' : null;

// Each lesson by its code (Ch2 / L3) and by its titles, for the older tickets saved before the codes
const buildTargets = () => {
  const byCode = new Map<string, Target>();
  const byTitle = new Map<string, Target>();
  const add = (board: Board, code: string, title: { en: string; mn: string }, target: Target) => {
    byCode.set(`${board}|${code}`, target);
    if (title.en) byTitle.set(`${board}|${title.en.trim()}`, target);
    if (title.mn) byTitle.set(`${board}|${title.mn.trim()}`, target);
  };
  STATES_LESSONS.forEach(l => add('igcse', `Ch1 / L${l.number}`, l.title, { key: STATES_KEY, lessonId: l.id }));
  Object.values(IGCSE_LESSON_SERIES).forEach(s => {
    if (s.chapterId === 'ch-states-of-matter') return;
    const no = CURRICULUM_CHAPTERS.find(c => c.id === s.chapterId)?.number;
    if (no === undefined) return;
    s.lessons.forEach(l => add('igcse', `Ch${no} / L${l.number}`, l.title, { key: s.storageKey, lessonId: l.id }));
  });
  Object.values(ALEVEL_LESSON_SERIES).forEach(s => {
    const no = s.chapterId.startsWith('al-ch-') ? s.chapterId.slice('al-ch-'.length) : '';
    if (!no) return;
    s.lessons.forEach(l => add('alevel', `Ch${no} / L${l.number}`, l.title, { key: s.storageKey, lessonId: l.id }));
  });
  return { byCode, byTitle };
};

const readMap = (key: string): Record<string, number> => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
};

// Reads the student's exit tickets from the account and raises this browser's scores to the best of each lesson.
// Returns how many lesson scores went up.
export const restoreLessonProgress = async (uid: string): Promise<number> => {
  const firestore = db;
  if (!firestore) return 0;
  const snap = await getDocs(query(collection(firestore, 'students', uid, 'results'), where('kind', '==', 'exit')));
  const { byCode, byTitle } = buildTargets();
  const best = new Map<string, Record<string, number>>();

  snap.docs.forEach(d => {
    const data = d.data();
    const board = boardOf(String(data.course ?? ''));
    const percent = Number(data.percent);
    if (!board || !Number.isFinite(percent)) return;
    const label = data.label as { en?: string; mn?: string } | string | undefined;
    const texts = typeof label === 'string' ? [label] : [label?.en ?? '', label?.mn ?? ''];
    let target: Target | undefined;
    for (const raw of texts) {
      const text = raw.trim();
      if (!text) continue;
      const titlePart = text.split(' · ').slice(1).join(' · ').trim();
      target = byCode.get(`${board}|${text}`) ?? byTitle.get(`${board}|${titlePart}`) ?? byTitle.get(`${board}|${text}`);
      if (target) break;
    }
    if (!target) return;
    const scores = best.get(target.key) ?? {};
    scores[target.lessonId] = Math.max(scores[target.lessonId] ?? -1, percent);
    best.set(target.key, scores);
  });

  let raised = 0;
  best.forEach((cloud, key) => {
    const local = readMap(key);
    let dirty = false;
    Object.entries(cloud).forEach(([lessonId, percent]) => {
      if ((local[lessonId] ?? -1) < percent) {
        local[lessonId] = percent;
        dirty = true;
        raised++;
      }
    });
    if (dirty) {
      try {
        window.localStorage.setItem(key, JSON.stringify(local));
      } catch {
        // Storage can be blocked; the lessons then open by this visit's tickets only
      }
    }
  });
  if (raised > 0) window.dispatchEvent(new Event(PROGRESS_RESTORED));
  return raised;
};

// Runs once a student signs in (the teacher sees every lesson anyway)
export const useLessonProgressRestore = (user: Parameters<typeof isTeacher>[0]): void => {
  const uid = user?.uid;
  const teacher = !!user && isTeacher(user);
  useEffect(() => {
    if (!uid || teacher) return;
    restoreLessonProgress(uid).catch(() => undefined);
  }, [uid, teacher]);
};
