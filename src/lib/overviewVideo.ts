import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { fromBase64, pieceId } from './tourChunks';

// The two-minute site tour is closed content. It is kept in Firestore, in pieces, under siteTour/<course>/ (see
// tourChunks.ts): siteTour/<course>/meta/info says how many video pieces there are, siteTour/<course>/video/<n> holds one
// piece, and siteTour/<course>/subtitles/<lang> holds a subtitle file. The rules let only the teacher and the students
// approved for the course read it. The two 9701 programmes share one copy, kept under 'alevel'.
// In development the same files are read from public/overview, which git does not track.
export type TourCourse = 'igcse' | 'alevel';

export interface TourMedia {
  video: string;
  subtitles: { mn: string; en: string };
}

const LOCAL = {
  video: 'website-overview-2min.webm',
  mn: 'overview.mn.vtt',
  en: 'overview.en.vtt'
} as const;

const cache = new Map<string, Promise<TourMedia>>();

const localUrl = (file: string): string => `${import.meta.env.BASE_URL}overview/${file}`;

const subtitleUrl = (text: string): string =>
  URL.createObjectURL(new Blob([text], { type: 'text/vtt' }));

const loadFromFirestore = async (course: TourCourse): Promise<TourMedia> => {
  if (!db) throw new Error('Firebase is not configured');
  const info = await getDoc(doc(db, 'siteTour', course, 'meta', 'info'));
  if (!info.exists()) throw new Error('The site tour is not uploaded yet');
  const pieces = Number(info.data().pieces);
  if (!Number.isInteger(pieces) || pieces < 1) throw new Error('The site tour has no video pieces');

  // The pieces are read together, and joined in their order into one video file
  const parts = await Promise.all(
    Array.from({ length: pieces }, (_, n) => getDoc(doc(db!, 'siteTour', course, 'video', pieceId(n))))
  );
  const blobParts = parts.map(part => {
    if (!part.exists()) throw new Error('A piece of the site tour is missing');
    return fromBase64(String(part.data().data));
  });
  const video = URL.createObjectURL(new Blob(blobParts, { type: 'video/webm' }));

  const [mn, en] = await Promise.all(
    (['mn', 'en'] as const).map(async lang => {
      const subtitle = await getDoc(doc(db!, 'siteTour', course, 'subtitles', lang));
      if (!subtitle.exists()) throw new Error('A subtitle file of the site tour is missing');
      return subtitleUrl(String(subtitle.data().text));
    })
  );
  return { video, subtitles: { mn, en } };
};

const load = async (course: TourCourse): Promise<TourMedia> => {
  // Development reads the local copy, so the tour can be checked before the teacher uploads it
  if (import.meta.env.DEV) {
    return {
      video: localUrl(LOCAL.video),
      subtitles: { mn: localUrl(LOCAL.mn), en: localUrl(LOCAL.en) }
    };
  }
  return loadFromFirestore(course);
};

// One load per signed-in user and course. A failed load is tried again next time, for example before the upload.
export const loadTourMedia = (course: TourCourse): Promise<TourMedia> => {
  const uid = auth?.currentUser?.uid;
  if (!uid && !import.meta.env.DEV) return Promise.reject(new Error('Not signed in'));
  const key = `${uid ?? 'dev'}|${course}`;
  let pending = cache.get(key);
  if (!pending) {
    pending = load(course);
    pending.catch(() => cache.delete(key));
    cache.set(key, pending);
  }
  return pending;
};
