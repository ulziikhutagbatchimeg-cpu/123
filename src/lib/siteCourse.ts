// The course this site is locked to. Each site (IGCSE 0620, AS Level 9701, A Level 9701) is built from the same code with
// VITE_SITE_COURSE set to igcse, as or a. Without it the app is the one site with the course switch, as in local development.
export type SiteCourse = 'igcse' | 'as' | 'a';

const value = import.meta.env.VITE_SITE_COURSE;

export const SITE_COURSE: SiteCourse | null = value === 'igcse' || value === 'as' || value === 'a' ? value : null;
