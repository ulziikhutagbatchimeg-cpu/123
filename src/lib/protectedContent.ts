import { getBytes, ref } from 'firebase/storage';
import { auth, storage } from './firebase';

// Protected course content (lesson files and slide pictures) lives in Firebase Storage under protected/<course>/.
// The storage rules let the teacher and the students approved for that course read it, so every read here needs a
// signed-in user. The app does not ship this content in its JavaScript.
export type ProtectedCourse = 'igcse' | 'as' | 'a';

const CONTENT_TYPES: Record<string, string> = {
  json: 'application/json',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png'
};

// One download (or one object URL) per user, course and path, so a file is fetched once per visit
const bytesCache = new Map<string, Promise<ArrayBuffer>>();
const urlCache = new Map<string, Promise<string>>();

const remember = <T>(store: Map<string, Promise<T>>, key: string, load: () => Promise<T>): Promise<T> => {
  let pending = store.get(key);
  if (!pending) {
    pending = load();
    // A failed load (for example the approval is not granted yet) is tried again next time
    pending.catch(() => store.delete(key));
    store.set(key, pending);
  }
  return pending;
};

// The key includes the signed-in user, so a second account in the same tab never reuses the first one's files
const keyFor = (course: ProtectedCourse, path: string): string => {
  const uid = auth?.currentUser?.uid;
  if (!uid) throw new Error('Not signed in');
  return `${uid}|${course}|${path}`;
};

const download = (course: ProtectedCourse, path: string): Promise<ArrayBuffer> => {
  const bucket = storage;
  if (!bucket) throw new Error('Firebase is not configured');
  return remember(bytesCache, keyFor(course, path), () => getBytes(ref(bucket, `protected/${course}/${path}`)));
};

// A lesson file of the course (JSON), for example its chapters or key terms
export const loadProtectedJson = async <T>(course: ProtectedCourse, path: string): Promise<T> => {
  const bytes = await download(course, path);
  return JSON.parse(new TextDecoder().decode(bytes)) as T;
};

// A slide picture of the course, as a local URL that an <img> can show
export const loadProtectedImageUrl = (course: ProtectedCourse, path: string): Promise<string> => {
  const extension = path.split('.').pop()?.toLowerCase() ?? '';
  const type = CONTENT_TYPES[extension] ?? 'application/octet-stream';
  return remember(urlCache, keyFor(course, path), async () => {
    const bytes = await download(course, path);
    return URL.createObjectURL(new Blob([bytes], { type }));
  });
};
