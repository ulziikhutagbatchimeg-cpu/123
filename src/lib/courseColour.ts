import type { CourseChoice } from '../context/AppContext';

// The colour of each course: the active tab on its pages takes it, so IGCSE, AS and A Level are told apart at a glance
export const COURSE_SOLID: Record<CourseChoice, string> = {
  igcse: 'bg-emerald-600 text-white',
  as: 'bg-sky-600 text-white',
  a: 'bg-violet-600 text-white'
};
