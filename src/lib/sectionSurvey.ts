import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// Six questions, asked once for each studied section. The student answers them on the web, in the Student area.
// Each answer is saved under the student's own id, so the student can write it once and the teacher can read it.
export interface Option {
  id: string;
  en: string;
  mn: string;
}

export const HARDEST_OPTIONS: Option[] = [
  { id: 'unsure', en: 'I did not know what to review', mn: 'Юу давтахаа мэдэхгүй байсан' },
  { id: 'understand', en: 'I did not understand it', mn: 'Ойлгохгүй байсан' },
  { id: 'time', en: 'I had no time', mn: 'Цаг гаргаж чадаагүй' },
  { id: 'other', en: 'Something else', mn: 'Бусад' }
];

export const LIKED_OPTIONS: Option[] = [
  { id: 'plan', en: 'Today’s 3 steps', mn: 'Өнөөдрийн 3 алхам' },
  { id: 'check', en: 'Checking myself', mn: 'Өөрийгөө шалгах' },
  { id: 'mistakes', en: 'The mistake notebook', mn: 'Алдааны дэвтэр' },
  { id: 'lessons', en: 'Lessons and slides', mn: 'Хичээл ба слайд' },
  { id: 'rewards', en: 'Stars, streak and hearts', mn: 'Одод, дөл, зүрх' },
  { id: 'other', en: 'Something else', mn: 'Бусад' }
];

export interface SurveyAnswers {
  hardest: string; // an option id from HARDEST_OPTIONS
  understood: number; // 1 to 5
  selfStudy: number; // 1 to 5
  text: string; // optional, up to 300 characters
  liked: string; // an option id from LIKED_OPTIONS
  recommend: number; // 1 to 5
}

const STUDENTS = 'students';
const SURVEYS = 'sectionSurveys';

// Writes the answers for one section. The rules allow it once per section and only for the student who owns it.
export const saveSectionSurvey = (uid: string, topicId: string, answers: SurveyAnswers) => {
  if (!db) throw new Error('Firebase is not configured');
  return setDoc(doc(db, STUDENTS, uid, SURVEYS, topicId), {
    ...answers,
    savedAt: new Date().toISOString()
  });
};

// The ids of the sections this student has already answered
export const loadAnsweredSections = async (uid: string): Promise<Set<string>> => {
  if (!db) return new Set();
  const snap = await getDocs(collection(db, STUDENTS, uid, SURVEYS));
  return new Set(snap.docs.map(d => d.id));
};
