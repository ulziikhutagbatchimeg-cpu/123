import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User
} from 'firebase/auth';
import { collection, doc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, googleProvider, storage, TEACHER_EMAIL } from './firebase';
import { previewPath } from './slidePreviews';
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

// The slide pictures and manifest.json of each deck live under previews/ (see slidePreviews.ts). Everyone can read them,
// and only the teacher account can upload them.
export const previewRef = (course: string, deck: string, file: string) => ref(requireStorage(), previewPath(course, deck, file));

export const uploadPreview = (course: string, deck: string, file: File) =>
  uploadBytes(previewRef(course, deck, file.name), file, { contentType: file.type || 'application/octet-stream' });

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

// Enrollment: a student asks to join one programme, and the teacher approves it. Gated access opens the lessons one after
// another; full access opens them all. There is one document per student per programme, with the id `${uid}_${programme}`.
export type EnrollmentProgramme = 'igcse' | 'as' | 'a';
export type EnrollmentStatus = 'requested' | 'approved' | 'rejected';
export type EnrollmentAccess = 'gated' | 'full';

export interface Enrollment {
  id: string;
  uid: string;
  programme: EnrollmentProgramme;
  status: EnrollmentStatus;
  access: EnrollmentAccess;
  name: string;
  requestedAt: string;
  decidedAt?: string;
}

const ENROLLMENTS = 'enrollments';

const enrollmentId = (uid: string, programme: EnrollmentProgramme) => `${uid}_${programme}`;

const toEnrollment = (id: string, data: Record<string, unknown>): Enrollment => ({
  id,
  uid: String(data.uid ?? ''),
  programme: data.programme as EnrollmentProgramme,
  status: data.status as EnrollmentStatus,
  access: data.access as EnrollmentAccess,
  name: String(data.name ?? 'Student'),
  requestedAt: String(data.requestedAt ?? ''),
  decidedAt: typeof data.decidedAt === 'string' ? data.decidedAt : undefined
});

// Asks the teacher to approve this student for one programme. It is also how a student asks again after a rejection.
export const requestEnrollment = (uid: string, programme: EnrollmentProgramme, name: string) => {
  if (!db) throw new Error('Firebase is not configured');
  return setDoc(doc(db, ENROLLMENTS, enrollmentId(uid, programme)), {
    uid,
    programme,
    status: 'requested',
    access: 'gated',
    name: name.slice(0, 40),
    requestedAt: new Date().toISOString()
  });
};

// The student's enrollment in one programme, kept up to date. null when there is none.
export const useEnrollment = (uid: string | undefined, programme: EnrollmentProgramme) => {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    setEnrollment(null);
    if (!uid || !db) return;
    return onSnapshot(
      doc(db, ENROLLMENTS, enrollmentId(uid, programme)),
      snap => setEnrollment(snap.exists() ? toEnrollment(snap.id, snap.data()) : null),
      () => setEnrollment(null)
    );
  }, [uid, programme]);

  return enrollment;
};

// Every enrollment request, for the teacher. The rules reject this for anyone else.
export const loadEnrollments = async (): Promise<Enrollment[]> => {
  if (!db) return [];
  const snap = await getDocs(collection(db, ENROLLMENTS));
  return snap.docs.map(d => toEnrollment(d.id, d.data()));
};

// The teacher's decision: approved with gated or full access, or rejected.
export const decideEnrollment = (enrollment: Enrollment, status: 'approved' | 'rejected', access: EnrollmentAccess) => {
  if (!db) throw new Error('Firebase is not configured');
  return updateDoc(doc(db, ENROLLMENTS, enrollment.id), { status, access, decidedAt: new Date().toISOString() });
};
