import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// The student's self-rating is also saved to the student's account each time it is rated, so the teacher can read it.
// The rules let the student write it, and the student and the teacher read it.
export interface CloudSelfRating {
  uid: string;
  courseId: string;
  ratings: Record<string, number>;
  topicsFinished: number;
  savedAt: string;
}

const STUDENTS = 'students';
const RATINGS = 'selfRatings';

// Writes one rating. A student who is not signed in keeps the rating on this device only.
export const saveSelfRatingToCloud = (uid: string, courseId: string, ratings: Record<string, number>, topicsFinished: number) => {
  const firestore = db;
  if (!firestore) return Promise.resolve();
  const savedAt = new Date().toISOString();
  const id = `${courseId}_${savedAt.replace(/[^0-9]/g, '')}`;
  return setDoc(doc(firestore, STUDENTS, uid, RATINGS, id), { courseId, ratings, topicsFinished, savedAt });
};

// Every saved rating of the given students, for the teacher
export const loadSelfRatingsOf = async (uids: string[]): Promise<CloudSelfRating[]> => {
  const firestore = db;
  if (!firestore) return [];
  const lists = await Promise.all(
    uids.map(uid =>
      getDocs(collection(firestore, STUDENTS, uid, RATINGS))
        .then(snap =>
          snap.docs.map(d => {
            const data = d.data();
            const ratings: Record<string, number> = {};
            Object.entries((data.ratings ?? {}) as Record<string, unknown>).forEach(([k, v]) => {
              if (typeof v === 'number') ratings[k] = v;
            });
            return {
              uid,
              courseId: String(data.courseId ?? ''),
              ratings,
              topicsFinished: Number(data.topicsFinished ?? 0),
              savedAt: String(data.savedAt ?? '')
            };
          })
        )
        .catch(() => [] as CloudSelfRating[])
    )
  );
  return lists.flat();
};
