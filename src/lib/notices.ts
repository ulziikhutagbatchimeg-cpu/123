import { collection, deleteDoc, doc, onSnapshot, query, where, writeBatch, type Unsubscribe } from 'firebase/firestore';
import { db } from './firebase';

// A notice is a message from the teacher to the students of one or more programmes. Only the teacher writes notices.
// A student reads the notices of the programme they are approved for; the teacher reads all of them.
// Notices are a separate collection: they never change the results or the answers of the students.
export type NoticeProgramme = 'igcse' | 'as' | 'a';

export interface Notice {
  id: string;
  programme: NoticeProgramme;
  title: string;
  body: string;
  createdAt: string;
}

export const NOTICE_PROGRAMMES: { value: NoticeProgramme; label: string }[] = [
  { value: 'igcse', label: 'IGCSE 0620' },
  { value: 'as', label: 'AS Level 9701' },
  { value: 'a', label: 'A Level 9701' },
];

const NOTICES = 'notices';
const SHOWN = 20;

const toNotice = (id: string, data: Record<string, unknown>): Notice => ({
  id,
  programme: data.programme as NoticeProgramme,
  title: String(data.title ?? ''),
  body: String(data.body ?? ''),
  createdAt: String(data.createdAt ?? ''),
});

// The notices of one programme (a student), or of all programmes when programme is null (the teacher). Newest first.
export const subscribeNotices = (
  programme: NoticeProgramme | null,
  onChange: (items: Notice[]) => void,
  onError: (error: Error) => void
): Unsubscribe => {
  if (!db) {
    onError(new Error('Firebase is not configured'));
    return () => {};
  }
  const base = collection(db, NOTICES);
  const q = programme ? query(base, where('programme', '==', programme)) : query(base);
  return onSnapshot(
    q,
    snap => {
      const items = snap.docs
        .map(d => toNotice(d.id, d.data()))
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .slice(0, SHOWN);
      onChange(items);
    },
    error => onError(error)
  );
};

// Teacher only: one notice for each chosen programme, all with the same text and time
export const sendNotice = async (programmes: NoticeProgramme[], title: string, body: string): Promise<number> => {
  if (!db) throw new Error('Firebase is not configured');
  const firestore = db;
  const createdAt = new Date().toISOString();
  const batch = writeBatch(firestore);
  programmes.forEach(programme => {
    batch.set(doc(collection(firestore, NOTICES)), { programme, title, body, createdAt });
  });
  await batch.commit();
  return programmes.length;
};

// Teacher only
export const deleteNotice = async (id: string): Promise<void> => {
  if (!db) throw new Error('Firebase is not configured');
  await deleteDoc(doc(db, NOTICES, id));
};

// The newest notice a student has read, kept on this device for each programme and student
const seenKey = (uid: string, programme: NoticeProgramme) => `notices-seen:${uid}:${programme}`;

export const readSeen = (uid: string, programme: NoticeProgramme): string => {
  try {
    return window.localStorage.getItem(seenKey(uid, programme)) ?? '';
  } catch {
    return '';
  }
};

export const writeSeen = (uid: string, programme: NoticeProgramme, createdAt: string): void => {
  try {
    window.localStorage.setItem(seenKey(uid, programme), createdAt);
  } catch {
    // Storage can be blocked; the badge then stays until the next visit
  }
};
