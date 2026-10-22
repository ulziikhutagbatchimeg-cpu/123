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
import { auth, db, googleProvider, TEACHER_EMAIL } from './firebase';
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
