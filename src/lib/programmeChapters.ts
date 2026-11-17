import type { CourseChoice } from '../context/AppContext';

// The chapters the teacher opens or closes for every student of one programme (the teacher's enrollment page; kept in
// Firestore as programmeChapters/{programme}, lib/cloud). An opened chapter has every lesson, step, topic and slide open at
// once, with no exit ticket or self-check to pass first; a closed one is locked whatever the order or the access. The other
// chapters keep the usual order: a lesson opens once the one before it is passed above 60%.
export interface ProgrammeChapters {
  open: string[];
  closed: string[];
}

// Until the teacher has saved a choice for a programme, or when it cannot be read: AS 9701 chapters 1–4 open to every
// student (the teacher's wish of 17 November 2026), nothing else
export const DEFAULT_PROGRAMME_CHAPTERS: Record<CourseChoice, ProgrammeChapters> = {
  igcse: { open: [], closed: [] },
  as: { open: ['al-ch-1', 'al-ch-2', 'al-ch-3', 'al-ch-4'], closed: [] },
  a: { open: [], closed: [] }
};

// One student's chapter lists
export interface ChapterLists {
  open: string[];
  closed: string[];
  start: string[];
}

// A student's chapter lists with the programme's: the teacher's choice for that one student wins (a chapter the teacher
// opened, started or closed for them keeps it), and the programme's choice applies to the other chapters
export const withProgramme = (programme: ProgrammeChapters, own?: Partial<ChapterLists>): ChapterLists => {
  const mine = new Set([...(own?.open ?? []), ...(own?.closed ?? []), ...(own?.start ?? [])]);
  return {
    open: [...(own?.open ?? []), ...programme.open.filter(id => !mine.has(id))],
    closed: [...(own?.closed ?? []), ...programme.closed.filter(id => !mine.has(id))],
    start: [...(own?.start ?? [])]
  };
};

// A short key of a programme's lists, for memos that depend on them
export const programmeKey = (p: ProgrammeChapters): string => `${p.open.join(',')}|${p.closed.join(',')}`;
