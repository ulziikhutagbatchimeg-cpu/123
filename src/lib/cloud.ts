import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User
} from 'firebase/auth';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, googleProvider, storage, TEACHER_EMAIL } from './firebase';
import type { StudentReport } from '../data/progressReport';

const STUDENTS = 'students';

// The signed-in user, or null. ready is false until Firebase has checked any saved session.
export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(!auth);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, u => {
      setUser(u);
      setReady(true);
    });
  }, []);

  return { user, ready };
};

export const isTeacher = (user: User | null) => !!user?.email && user.email === TEACHER_EMAIL;

const requireAuth = () => {
  if (!auth) throw new Error('Firebase is not configured');
  return auth;
};

export const signUpStudent = (email: string, password: string) =>
  createUserWithEmailAndPassword(requireAuth(), email, password);

export const signInStudent = (email: string, password: string) =>
  signInWithEmailAndPassword(requireAuth(), email, password);

export const signInTeacher = () => signInWithPopup(requireAuth(), googleProvider);

export const signOutUser = () => signOut(requireAuth());

// Slide decks live in Firebase Storage under slides/. storage.rules lets only the teacher account read or write them.
const requireStorage = () => {
  if (!storage) throw new Error('Firebase is not configured');
  return storage;
};

// course is the folder of the course, for example igcse-0620 or alevel-9701
export const deckRef = (course: string, file: string) => ref(requireStorage(), `slides/${course}/${file}`);

export const getDeckUrl = (course: string, file: string) => getDownloadURL(deckRef(course, file));

const PPTX_TYPE = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

export const uploadDeck = (course: string, file: File) =>
  uploadBytes(deckRef(course, file.name), file, { contentType: PPTX_TYPE });

// Past-paper PDFs live under papers/0620/. As with the slides, only the teacher account can read or write them.
export const paperRef = (file: string) => ref(requireStorage(), `papers/0620/${file}`);

// True when the file is in storage. A file that is missing, or that this account may not read, counts as not uploaded.
export const paperUploaded = (file: string) => getDownloadURL(paperRef(file)).then(() => true, () => false);

const PDF_TYPE = 'application/pdf';

export const uploadPaper = (file: File) => uploadBytes(paperRef(file.name), file, { contentType: PDF_TYPE });

// Writes one document per student. The id is the student's user id, so the rules only let them write their own.
export const saveStudentProgress = (
  uid: string,
  name: string,
  checks: Record<string, boolean>,
  completedTopics: string[]
) => {
  if (!db) throw new Error('Firebase is not configured');
  return setDoc(doc(db, STUDENTS, uid), {
    name,
    checks,
    completedTopics,
    updatedAt: new Date().toISOString()
  });
};

// Every student's progress, for the teacher. The rules reject this for anyone else.
export const loadStudentReports = async (): Promise<StudentReport[]> => {
  if (!db) return [];
  const snap = await getDocs(collection(db, STUDENTS));
  return snap.docs.map(d => {
    const data = d.data();
    return {
      version: 1,
      name: String(data.name ?? 'Student'),
      date: String(data.updatedAt ?? ''),
      checks: (data.checks ?? {}) as Record<string, boolean>,
      completedTopics: Array.isArray(data.completedTopics) ? data.completedTopics.map(String) : []
    };
  });
};
