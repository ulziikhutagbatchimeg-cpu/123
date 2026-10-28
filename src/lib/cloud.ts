import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User
} from 'firebase/auth';
import { collection, doc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc, where, writeBatch } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, googleProvider, storage, TEACHER_EMAIL } from './firebase';
import type { StudentReport } from '../data/progressReport';
import type { ResultItem, ResultSummaries, StoredResult } from './resultSync';

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
  }, { merge: true }); // merge keeps the results summary written by the results sync
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

// Results. Each result is one document under the student, with the id the app gave it, so writing it again changes nothing.
const RESULTS = 'results';
const BATCH_SIZE = 400; // Firestore takes up to 500 writes in one batch
const RECENT_LIMIT = 100; // the teacher reads the newest results of one student at a time

// Writes the student's new results, then the summary of every programme on the student's document. The rules let the student
// write a result again only with nothing changed, so the teacher's feedback on it is kept.
export const syncStudentResults = (uid: string, name: string, items: ResultItem[], summaries: ResultSummaries) => {
  if (!db) return Promise.reject(new Error('Firebase is not configured'));
  const firestore = db;
  const batches: Promise<void>[] = [];
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = writeBatch(firestore);
    items.slice(i, i + BATCH_SIZE).forEach(({ id, ...result }) => {
      batch.set(doc(firestore, STUDENTS, uid, RESULTS, id), { ...result }, { merge: true });
    });
    batches.push(batch.commit());
  }
  return Promise.all(batches).then(() =>
    setDoc(doc(firestore, STUDENTS, uid), { name, results: summaries, resultsAt: new Date().toISOString() }, { merge: true })
  );
};

export interface StudentSummary {
  uid: string;
  name: string;
  resultsAt: string;
  results: ResultSummaries;
}

// Every student who has sent results, with their summaries, for the teacher
export const loadStudentSummaries = async (): Promise<StudentSummary[]> => {
  if (!db) return [];
  const snap = await getDocs(collection(db, STUDENTS));
  return snap.docs
    .filter(d => d.data().results)
    .map(d => ({
      uid: d.id,
      name: String(d.data().name ?? 'Student'),
      resultsAt: String(d.data().resultsAt ?? ''),
      results: d.data().results as ResultSummaries
    }));
};

// The newest results of one student, with the teacher's feedback where there is some
export const loadRecentResults = async (uid: string): Promise<StoredResult[]> => {
  if (!db) return [];
  const snap = await getDocs(query(collection(db, STUDENTS, uid, RESULTS), orderBy('takenAt', 'desc'), limit(RECENT_LIMIT)));
  return snap.docs.map(d => {
    const data = d.data();
    return {
      ...(data as ResultItem),
      id: d.id,
      feedback: typeof data.feedback === 'string' ? data.feedback : undefined,
      feedbackAt: typeof data.feedbackAt === 'string' ? data.feedbackAt : undefined
    };
  });
};

// The teacher's feedback on one result. Games and the escape room take none: the rules refuse it.
export const saveResultFeedback = (uid: string, resultId: string, text: string) => {
  if (!db) throw new Error('Firebase is not configured');
  return updateDoc(doc(db, STUDENTS, uid, RESULTS, resultId), {
    feedback: text.slice(0, 500),
    feedbackAt: new Date().toISOString()
  });
};

export interface StudentFeedback {
  text: string;
  at: string;
}

// The teacher's feedback on the signed-in student's results, kept up to date, keyed by result id
export const useStudentFeedback = (uid: string | undefined) => {
  const [feedback, setFeedback] = useState<Record<string, StudentFeedback>>({});

  useEffect(() => {
    setFeedback({});
    if (!uid || !db) return;
    return onSnapshot(
      query(collection(db, STUDENTS, uid, RESULTS), where('feedbackAt', '!=', null)),
      snap => {
        const next: Record<string, StudentFeedback> = {};
        snap.docs.forEach(d => {
          next[d.id] = { text: String(d.data().feedback ?? ''), at: String(d.data().feedbackAt ?? '') };
        });
        setFeedback(next);
      },
      () => setFeedback({})
    );
  }, [uid]);

  return feedback;
};
