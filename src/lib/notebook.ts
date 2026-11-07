import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, type Unsubscribe } from 'firebase/firestore';
import { db } from './firebase';

// The student's notebook: the lessons pinned to it and the student's own notes. It is kept in the student's account,
// so it shows on every device the student signs in on. Only the student reads and writes it.
export type NotebookKind = 'lesson' | 'note';

export interface NotebookItem {
  id: string;
  kind: NotebookKind;
  refKey: string; // for a pinned lesson, its code, for example Ch2 / L3; empty for a note
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

const NOTEBOOK = 'notebook';

const toItem = (id: string, data: Record<string, unknown>): NotebookItem => ({
  id,
  kind: data.kind === 'lesson' ? 'lesson' : 'note',
  refKey: String(data.refKey ?? ''),
  title: String(data.title ?? ''),
  body: String(data.body ?? ''),
  createdAt: String(data.createdAt ?? ''),
  updatedAt: String(data.updatedAt ?? ''),
});

// The notebook of one student, newest first, kept up to date
export const subscribeNotebook = (
  uid: string,
  onChange: (items: NotebookItem[]) => void,
  onError: (error: Error) => void
): Unsubscribe => {
  if (!db) {
    onError(new Error('Firebase is not configured'));
    return () => {};
  }
  const q = query(collection(db, 'students', uid, NOTEBOOK), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    snap => onChange(snap.docs.map(d => toItem(d.id, d.data()))),
    error => onError(error)
  );
};

// Pins a lesson to the notebook
export const pinLesson = async (uid: string, refKey: string, title: string): Promise<void> => {
  if (!db) throw new Error('Firebase is not configured');
  const now = new Date().toISOString();
  await addDoc(collection(db, 'students', uid, NOTEBOOK), {
    kind: 'lesson',
    refKey,
    title: title.slice(0, 120),
    body: '',
    createdAt: now,
    updatedAt: now,
  });
};

// Adds the student's own note
export const addNote = async (uid: string, title: string, body: string): Promise<void> => {
  if (!db) throw new Error('Firebase is not configured');
  const now = new Date().toISOString();
  await addDoc(collection(db, 'students', uid, NOTEBOOK), {
    kind: 'note',
    refKey: '',
    title: title.trim().slice(0, 120),
    body: body.slice(0, 2000),
    createdAt: now,
    updatedAt: now,
  });
};

// Changes a note's title or text
export const updateNote = async (uid: string, id: string, title: string, body: string): Promise<void> => {
  if (!db) throw new Error('Firebase is not configured');
  await updateDoc(doc(db, 'students', uid, NOTEBOOK, id), {
    title: title.trim().slice(0, 120),
    body: body.slice(0, 2000),
    updatedAt: new Date().toISOString(),
  });
};

// Removes an item from the notebook
export const deleteNotebookItem = async (uid: string, id: string): Promise<void> => {
  if (!db) throw new Error('Firebase is not configured');
  await deleteDoc(doc(db, 'students', uid, NOTEBOOK, id));
};
