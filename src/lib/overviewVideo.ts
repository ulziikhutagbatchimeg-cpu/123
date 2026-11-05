import { getDownloadURL, ref } from 'firebase/storage';
import { auth, storage } from './firebase';

// The two-minute site tour is closed content. It lives in Firebase Storage under protected/<course>/overview/, and the
// storage rules let only the teacher and the students approved for that course read it. The two 9701 programmes share
// one copy, kept under 'alevel'. In development the same files are read from public/overview, which git does not track.
export type TourCourse = 'igcse' | 'alevel';

export interface TourMedia {
  video: string;
  subtitles: { mn: string; en: string };
}

const FILES = {
  video: 'website-overview-2min.webm',
  mn: 'overview.mn.vtt',
  en: 'overview.en.vtt'
} as const;

const cache = new Map<string, Promise<TourMedia>>();

// The subtitle files are read as object URLs: a <track> from another origin needs CORS, and a fetch gives it the same origin
const subtitleUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`The subtitle file could not be loaded (${response.status})`);
  return URL.createObjectURL(new Blob([await response.arrayBuffer()], { type: 'text/vtt' }));
};

const localUrl = (file: string): string => `${import.meta.env.BASE_URL}overview/${file}`;

const load = async (course: TourCourse): Promise<TourMedia> => {
  // Development reads the local copy, so the tour can be checked before the teacher uploads it
  if (import.meta.env.DEV) {
    return {
      video: localUrl(FILES.video),
      subtitles: { mn: localUrl(FILES.mn), en: localUrl(FILES.en) }
    };
  }
  if (!storage) throw new Error('Firebase is not configured');
  const at = (file: string) => `protected/${course}/overview/${file}`;
  // The video streams from its download URL; the subtitles are small, so they are fetched once
  const [video, mn, en] = await Promise.all([
    getDownloadURL(ref(storage, at(FILES.video))),
    getDownloadURL(ref(storage, at(FILES.mn))).then(subtitleUrl),
    getDownloadURL(ref(storage, at(FILES.en))).then(subtitleUrl)
  ]);
  return { video, subtitles: { mn, en } };
};

// One load per signed-in user and course. A failed load is tried again next time, for example before the rules are deployed.
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
