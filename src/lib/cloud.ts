import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
  updateProfile,
  type User
} from 'firebase/auth';
import { arrayRemove, arrayUnion, collection, collectionGroup, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc, where, writeBatch } from 'firebase/firestore';
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

// A student signs in with an email address and a password. Firebase sends the reset link to the same address.
export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const signUpStudent = (email: string, password: string) =>
  createUserWithEmailAndPassword(requireAuth(), email.trim(), password);

// Saves the student's name on the new account, so the account shows who it belongs to
export const setStudentName = (name: string) => {
  const current = requireAuth().currentUser;
  if (!current) return Promise.resolve();
  return updateProfile(current, { displayName: name.trim().slice(0, 40) });
};

// Remember me: the sign-in is kept after the browser closes, or only until it closes
export const setRememberMe = (remember: boolean) =>
  setPersistence(requireAuth(), remember ? browserLocalPersistence : browserSessionPersistence);

export const signInStudent = (email: string, password: string) =>
  signInWithEmailAndPassword(requireAuth(), email.trim(), password);

// Sends a reset link. The link reaches the inbox only if an account uses this address.
export const resetStudentPassword = (email: string) =>
  sendPasswordResetEmail(requireAuth(), email.trim());

export const signInTeacher = () => signInWithPopup(requireAuth(), googleProvider);

export const signOutUser = () => signOut(requireAuth());

// The student's answers to a check, practice set or exit ticket, kept on the student's own account so they show on any device
// the student signs in on. The rules let only that student read and write them.
const ANSWERS = 'answers';

export const loadKeptAnswers = async (uid: string, key: string): Promise<Record<string, unknown> | null> => {
  if (!db) return null;
  const snap = await getDoc(doc(db, STUDENTS, uid, ANSWERS, key));
  if (!snap.exists()) return null;
  return JSON.parse(String(snap.data().value)) as Record<string, unknown>;
};

export const saveKeptAnswers = (uid: string, key: string, value: object) => {
  if (!db) return Promise.resolve();
  return setDoc(doc(db, STUDENTS, uid, ANSWERS, key), { value: JSON.stringify(value), savedAt: new Date().toISOString() });
};

// The same documents as text, for lib/accountCopy: every kept value of the student, and one value saved with its time
export const listKeptValues = async (uid: string): Promise<{ id: string; value: string; savedAt: number }[]> => {
  if (!db) return [];
  const snap = await getDocs(collection(db, STUDENTS, uid, ANSWERS));
  return snap.docs.map(d => ({ id: d.id, value: String(d.data().value ?? ''), savedAt: Date.parse(String(d.data().savedAt ?? '')) || 0 }));
};

export const saveKeptValue = (uid: string, id: string, value: string, savedAt: number) => {
  if (!db) return Promise.resolve();
  return setDoc(doc(db, STUDENTS, uid, ANSWERS, id), { value, savedAt: new Date(savedAt).toISOString() });
};

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

const toReport = (id: string, data: Record<string, unknown>): StudentReport => ({
  version: 1,
  uid: id,
  name: String(data.name ?? 'Student'),
  date: String(data.updatedAt ?? ''),
  checks: (data.checks ?? {}) as Record<string, boolean>,
  completedTopics: Array.isArray(data.completedTopics) ? data.completedTopics.map(String) : []
});

// Every student's progress, for the teacher. The rules reject this for anyone else.
export const loadStudentReports = async (): Promise<StudentReport[]> => {
  if (!db) return [];
  const snap = await getDocs(collection(db, STUDENTS));
  return snap.docs.map(d => toReport(d.id, d.data()));
};

// The same, kept up to date: a student's new ratings reach the teacher's checklist as soon as they are saved
export const subscribeStudentReports = (onChange: (list: StudentReport[]) => void, onError: (error: Error) => void): (() => void) => {
  if (!db) {
    onError(new Error('Firebase is not configured'));
    return () => {};
  }
  return onSnapshot(
    collection(db, STUDENTS),
    snap => onChange(snap.docs.map(d => toReport(d.id, d.data()))),
    error => onError(error)
  );
};

// Enrollment: a student asks to join one programme, and the teacher approves it. Gated access opens the lessons one after
// another; full access opens them all. There is one document per student per programme, with the id `${uid}_${programme}`.
export type EnrollmentProgramme = 'igcse' | 'as' | 'a';
// suspended: the teacher has closed the programme for the student for now; restoring opens it again with the same access
export type EnrollmentStatus = 'requested' | 'approved' | 'rejected' | 'suspended';
export type EnrollmentAccess = 'gated' | 'full';
// IGCSE only: Core students see the Core content; Extended students see Core and Extended together.
export type EnrollmentTrack = 'core' | 'extended';
// The class a student picks, from 7A to 12D
export const GRADES: string[] = [7, 8, 9, 10, 11, 12].flatMap(n => ['A', 'B', 'C', 'D'].map(l => `${n}${l}`));

export interface Enrollment {
  id: string;
  uid: string;
  programme: EnrollmentProgramme;
  status: EnrollmentStatus;
  access: EnrollmentAccess;
  track?: EnrollmentTrack; // set by the teacher; undefined until then
  grade?: string; // the student's class, for example 10A
  printChapters: string[]; // the chapters whose slides the teacher lets the student print or save as PDF
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
  track: data.track === 'core' || data.track === 'extended' ? data.track : undefined,
  grade: typeof data.grade === 'string' ? data.grade : undefined,
  printChapters: Array.isArray(data.printChapters) ? data.printChapters.filter((c): c is string => typeof c === 'string') : [],
  name: String(data.name ?? 'Student'),
  requestedAt: String(data.requestedAt ?? ''),
  decidedAt: typeof data.decidedAt === 'string' ? data.decidedAt : undefined
});

// The teacher lets the student print or save a chapter's slides as PDF, or takes that back. The list is kept on the enrollment.
export const setPrintApproval = (enrollment: Enrollment, chapterId: string, allowed: boolean) => {
  if (!db) throw new Error('Firebase is not configured');
  return updateDoc(doc(db, ENROLLMENTS, enrollment.id), {
    printChapters: allowed ? arrayUnion(chapterId) : arrayRemove(chapterId)
  });
};

// Asks the teacher to approve this student for one programme, with the student's name and class. It is also how a student asks
// again after a rejection. The teacher sets the access, and for IGCSE the track, when deciding.
export const requestEnrollment = (uid: string, programme: EnrollmentProgramme, name: string, grade: string) => {
  if (!db) throw new Error('Firebase is not configured');
  return setDoc(doc(db, ENROLLMENTS, enrollmentId(uid, programme)), {
    uid,
    programme,
    status: 'requested',
    access: 'gated',
    name: name.trim().slice(0, 40),
    grade,
    requestedAt: new Date().toISOString()
  });
};

// The student's enrollment in one programme, kept up to date. null when there is none; undefined until the server has answered.
export const useEnrollment = (uid: string | undefined, programme: EnrollmentProgramme) => {
  const [enrollment, setEnrollment] = useState<Enrollment | null | undefined>(undefined);

  useEffect(() => {
    if (!uid || !db) {
      setEnrollment(null);
      return;
    }
    setEnrollment(undefined);
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

// The requests waiting for the teacher, kept up to date, newest first. The teacher's bell reads them. The rules let only the teacher read them.
export const subscribeWaitingEnrollments = (onChange: (items: Enrollment[]) => void, onError: (error: Error) => void): (() => void) => {
  if (!db) {
    onError(new Error('Firebase is not configured'));
    return () => {};
  }
  return onSnapshot(
    query(collection(db, ENROLLMENTS), where('status', '==', 'requested')),
    snap => onChange(
      snap.docs
        .map(d => toEnrollment(d.id, d.data()))
        .sort((a, b) => (a.requestedAt < b.requestedAt ? 1 : -1))
    ),
    error => onError(error)
  );
};

// One result of a student, as the teacher's bell lists it. uid is the student, whose results these are.
export interface RecentResult {
  id: string;
  uid: string;
  kind: string;
  label: string;
  percent: number;
  takenAt: number;
}

// The newest results of every student, for the teacher only (the rules let only the teacher read them). Newest first.
export const subscribeRecentResults = (onChange: (items: RecentResult[]) => void, onError: (error: Error) => void): (() => void) => {
  if (!db) {
    onError(new Error('Firebase is not configured'));
    return () => {};
  }
  return onSnapshot(
    query(collectionGroup(db, 'results'), orderBy('takenAt', 'desc'), limit(20)),
    snap => onChange(
      snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          uid: d.ref.parent.parent?.id ?? '',
          kind: String(data.kind ?? ''),
          label: typeof data.label === 'string' ? data.label : '',
          percent: Number(data.percent ?? 0),
          takenAt: Number(data.takenAt ?? 0)
        };
      })
    ),
    error => onError(error)
  );
};

// The teacher's decision for one enrollment: approved, rejected or suspended, with the access, and the IGCSE track when given.
// The teacher removes an enrolment record for good. The student's results are kept; only the enrolment is deleted.
export const deleteEnrollment = (enrollment: Enrollment) => {
  if (!db) throw new Error('Firebase is not configured');
  return deleteDoc(doc(db, ENROLLMENTS, enrollment.id));
};

// The teacher's decision for one enrollment: approved, rejected or suspended, with the access, and the IGCSE track when given.
export const decideEnrollment = (enrollment: Enrollment, status: EnrollmentStatus, access: EnrollmentAccess, track?: EnrollmentTrack) => {
  if (!db) throw new Error('Firebase is not configured');
  return updateDoc(doc(db, ENROLLMENTS, enrollment.id), {
    status,
    access,
    ...(track ? { track } : {}),
    decidedAt: new Date().toISOString()
  });
};

// The teacher moves a student from one programme to another, in one batch: the old programme becomes rejected, and the
// new one is approved at once. merge keeps an existing document for the new programme and creates it when there is none.
export const moveEnrollment = (enrollment: Enrollment, target: EnrollmentProgramme, access: EnrollmentAccess, track?: EnrollmentTrack) => {
  if (!db) throw new Error('Firebase is not configured');
  const now = new Date().toISOString();
  const batch = writeBatch(db);
  batch.update(doc(db, ENROLLMENTS, enrollment.id), { status: 'rejected', decidedAt: now });
  batch.set(
    doc(db, ENROLLMENTS, enrollmentId(enrollment.uid, target)),
    {
      uid: enrollment.uid,
      programme: target,
      status: 'approved',
      access,
      name: enrollment.name,
      requestedAt: enrollment.requestedAt || now,
      decidedAt: now,
      ...(enrollment.grade ? { grade: enrollment.grade } : {}),
      ...(target === 'igcse' && track ? { track } : {})
    },
    { merge: true }
  );
  return batch.commit();
};

// Results. Each result is one document under the student, with the id the app gave it, so writing it again changes nothing.
const RESULTS = 'results';
const BATCH_SIZE = 400; // Firestore takes up to 500 writes in one batch
const RECENT_LIMIT = 500; // the teacher reads the newest results of one student at a time, with all lesson tickets, tests and games

// Writes the student's new results, then the summary of every programme on the student's document. The rules let the student
// write a result again only with nothing changed, so the teacher's feedback on it is kept.
// A result as the rules take it: no empty fields, a known kind and course, and the percent between 0 and 100. null: not sendable.
const RESULT_KINDS = ['exit', 'game', 'escape', 'practice', 'question', 'test'];
const RESULT_COURSES = ['igcse', 'as', 'a'];
const cleanResult = ({ id: _id, ...rest }: ResultItem): Record<string, unknown> | null => {
  if (!RESULT_KINDS.includes(rest.kind) || !RESULT_COURSES.includes(rest.course) || !Number.isFinite(rest.takenAt)) return null;
  const percent = Number.isFinite(rest.percent) ? Math.min(100, Math.max(0, rest.percent)) : 0;
  return Object.fromEntries(Object.entries({ ...rest, percent }).filter(([, v]) => v !== undefined));
};

// Sends the student's summaries, then each new result. The summaries go first and on their own, so the teacher always sees
// the newest, even when a result cannot be sent. A batch that is refused is sent again one result at a time: a result the
// rules refuse for good (one already there with other values) is not sent again. Returns the ids of the results that are done.
export const syncStudentResults = async (
  uid: string,
  name: string,
  items: ResultItem[],
  summaries: ResultSummaries,
  checks?: Record<string, boolean>
): Promise<string[]> => {
  if (!db) throw new Error('Firebase is not configured');
  const firestore = db;
  // JSON leaves out empty values, which Firestore does not take
  const results = JSON.parse(JSON.stringify(summaries)) as ResultSummaries;
  const now = new Date().toISOString();
  // A placeholder name is not written, so it never covers the real name the progress checklist saved
  const realName = name.trim().slice(0, 40);
  await setDoc(
    doc(firestore, STUDENTS, uid),
    {
      ...(realName && realName !== 'Student' ? { name: realName } : {}),
      results,
      resultsAt: now,
      // The progress checklist (the objective ratings), so the teacher's checklist is as new as the results
      ...(checks ? { checks, updatedAt: now } : {})
    },
    { merge: true }
  );
  const done: string[] = [];
  const sendable: { id: string; data: Record<string, unknown> }[] = [];
  items.forEach(item => {
    const data = cleanResult(item);
    if (data) sendable.push({ id: item.id, data });
    else done.push(item.id); // it can never be sent, so it is not tried again
  });
  for (let i = 0; i < sendable.length; i += BATCH_SIZE) {
    const part = sendable.slice(i, i + BATCH_SIZE);
    const batch = writeBatch(firestore);
    part.forEach(r => batch.set(doc(firestore, STUDENTS, uid, RESULTS, r.id), r.data, { merge: true }));
    try {
      await batch.commit();
      part.forEach(r => done.push(r.id));
    } catch {
      for (const r of part) {
        try {
          await setDoc(doc(firestore, STUDENTS, uid, RESULTS, r.id), r.data, { merge: true });
          done.push(r.id);
        } catch (e) {
          // Refused by the rules: it will be refused every time. Any other error (offline): it goes again next time.
          if ((e as { code?: string }).code === 'permission-denied') done.push(r.id);
        }
      }
    }
  }
  return done;
};

export interface StudentSummary {
  uid: string;
  name: string;
  resultsAt: string;
  results: ResultSummaries;
}

const toSummaries = (docs: { id: string; data: () => Record<string, unknown> }[]): StudentSummary[] =>
  docs
    .filter(d => d.data().results)
    .map(d => ({
      uid: d.id,
      name: String(d.data().name ?? 'Student'),
      resultsAt: String(d.data().resultsAt ?? ''),
      results: d.data().results as ResultSummaries
    }));

// Every student who has sent results, with their summaries, for the teacher
export const loadStudentSummaries = async (): Promise<StudentSummary[]> => {
  if (!db) return [];
  const snap = await getDocs(collection(db, STUDENTS));
  return toSummaries(snap.docs);
};

// The same, kept up to date: a summary a student sends (results, self-check, every assessment) appears at once, and a
// student who starts working while the page is open joins the list
export const subscribeStudentSummaries = (onChange: (list: StudentSummary[]) => void, onError: (error: Error) => void): (() => void) => {
  if (!db) {
    onError(new Error('Firebase is not configured'));
    return () => {};
  }
  return onSnapshot(
    collection(db, STUDENTS),
    snap => onChange(toSummaries(snap.docs)),
    error => onError(error)
  );
};

// One stored result as the teacher reads it, with the feedback where there is some
const toStoredResult = (id: string, data: Record<string, unknown>): StoredResult => ({
  ...(data as unknown as ResultItem),
  id,
  feedback: typeof data.feedback === 'string' ? data.feedback : undefined,
  feedbackAt: typeof data.feedbackAt === 'string' ? data.feedbackAt : undefined
});

// True when Firestore refused a query because the index it needs is not built. The newest-first list of one student needs
// the single-field index on takenAt; the index settings in firestore.indexes.json name only the collection-group index, which
// can switch the per-student one off. The readers below then read the student's whole list and sort it here, so nothing is lost.
const needsIndex = (e: unknown) => (e as { code?: string }).code === 'failed-precondition';

// The newest results of one student, with the teacher's feedback where there is some
export const loadRecentResults = async (uid: string): Promise<StoredResult[]> => {
  if (!db) return [];
  try {
    const snap = await getDocs(query(collection(db, STUDENTS, uid, RESULTS), orderBy('takenAt', 'desc'), limit(RECENT_LIMIT)));
    return snap.docs.map(d => toStoredResult(d.id, d.data()));
  } catch (e) {
    if (!needsIndex(e)) throw e;
    const snap = await getDocs(collection(db, STUDENTS, uid, RESULTS));
    return snap.docs.map(d => toStoredResult(d.id, d.data())).sort((a, b) => b.takenAt - a.takenAt);
  }
};

// Every result of one student, newest first, kept up to date while the teacher looks: a result the student sends shows at
// once. max caps how many are read (the newest); without the index the whole list is read and sorted here.
export const subscribeStudentResults = (
  uid: string,
  max: number,
  onChange: (items: StoredResult[]) => void,
  onError: (error: Error) => void
): (() => void) => {
  if (!db) {
    onError(new Error('Firebase is not configured'));
    return () => {};
  }
  const firestore = db;
  let stop = onSnapshot(
    query(collection(firestore, STUDENTS, uid, RESULTS), orderBy('takenAt', 'desc'), limit(max)),
    snap => onChange(snap.docs.map(d => toStoredResult(d.id, d.data()))),
    error => {
      if (!needsIndex(error)) {
        onError(error);
        return;
      }
      stop = onSnapshot(
        collection(firestore, STUDENTS, uid, RESULTS),
        snap => onChange(snap.docs.map(d => toStoredResult(d.id, d.data())).sort((a, b) => b.takenAt - a.takenAt).slice(0, max)),
        e => onError(e)
      );
    }
  );
  return () => stop();
};

// The newest results of every student in one list, for the teacher's board. Each item carries the id of its student.
// It reads the same way the teacher's bell does, through the results collection group.
export const loadAllRecentResults = async (max = 500): Promise<Array<StoredResult & { uid: string }>> => {
  if (!db) return [];
  const snap = await getDocs(query(collectionGroup(db, RESULTS), orderBy('takenAt', 'desc'), limit(max)));
  return snap.docs.map(d => {
    const data = d.data();
    return {
      ...(data as ResultItem),
      id: d.id,
      uid: d.ref.parent.parent?.id ?? '',
      feedback: typeof data.feedback === 'string' ? data.feedback : undefined,
      feedbackAt: typeof data.feedbackAt === 'string' ? data.feedbackAt : undefined
    };
  });
};

// The same list as loadAllRecentResults, kept up to date: a result that a student sends appears here as soon as it arrives.
export const subscribeAllRecentResults = (
  onChange: (items: Array<StoredResult & { uid: string }>) => void,
  onError: (error: Error) => void,
  max = 500
): (() => void) => {
  if (!db) {
    onError(new Error('Firebase is not configured'));
    return () => {};
  }
  return onSnapshot(
    query(collectionGroup(db, RESULTS), orderBy('takenAt', 'desc'), limit(max)),
    snap => onChange(
      snap.docs.map(d => {
        const data = d.data();
        return {
          ...(data as ResultItem),
          id: d.id,
          uid: d.ref.parent.parent?.id ?? '',
          feedback: typeof data.feedback === 'string' ? data.feedback : undefined,
          feedbackAt: typeof data.feedbackAt === 'string' ? data.feedbackAt : undefined
        };
      })
    ),
    error => onError(error)
  );
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
