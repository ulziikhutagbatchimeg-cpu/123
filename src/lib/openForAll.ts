import type { CourseChoice } from '../context/AppContext';

// Chapters open to every student of a programme without the teacher pressing anything (the teacher's choice of
// 17 November 2026): AS 9701 chapters 1–4. Each counts as a chapter the teacher opened for every student: all its lessons,
// steps, topics and slides open at once, with no exit ticket or self-check to pass first. The lessons after them keep the
// usual order (the next chapter's first lesson opens once the lesson before it is passed above 60%), and a chapter the
// teacher closes for a student stays closed.
export const OPEN_FOR_ALL: Record<CourseChoice, string[]> = {
  igcse: [],
  as: ['al-ch-1', 'al-ch-2', 'al-ch-3', 'al-ch-4'],
  a: []
};
