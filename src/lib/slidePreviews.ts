import type { ProtectedCourse } from './protectedContent';

// The pictures of each slide deck (NN-KK.jpg and manifest.json) are kept in Firebase Storage, not on the site. The
// teacher uploads them with scripts/upload-protected.mjs to protected/<course>/slides/<deck folder>/. A student reads
// them after signing in, and only if the storage rules approve the course.

// The Storage course that holds a deck folder's pictures. The 0620 decks are 'igcse'; the 9701 decks are shared by
// AS and A Level, so they live in one place: 'alevel'.
export const storageCourseOf = (deckCourse: string): ProtectedCourse => (deckCourse === 'alevel-9701' ? 'alevel' : 'igcse');

// The path of a picture or the manifest inside the course's protected folder
export const slidePath = (deckFolder: string, file: string): string => `slides/${deckFolder}/${file}`;
