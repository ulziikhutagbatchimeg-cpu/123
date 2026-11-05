import { doc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { pieceId, splitBytes, toBase64 } from './tourChunks';
import type { TourCourse } from './overviewVideo';

// A commit may hold at most 10 MiB, so the video pieces are written a few at a time (each piece is about 800 KB of base64)
const PIECES_PER_BATCH = 6;

// Teacher only: write the tour for one course. The pieces and the subtitles go first, and the info that says how many
// pieces there are goes last, so a half-finished upload is never read by a student.
export const uploadTour = async (
  course: TourCourse,
  video: File,
  mn: File,
  en: File,
  onProgress: (done: number, total: number) => void
): Promise<number> => {
  if (!db) throw new Error('Firebase is not configured');
  const bytes = new Uint8Array(await video.arrayBuffer());
  const pieces = splitBytes(bytes);
  const total = pieces.length + 3;
  let done = 0;

  for (let start = 0; start < pieces.length; start += PIECES_PER_BATCH) {
    const batch = writeBatch(db);
    pieces.slice(start, start + PIECES_PER_BATCH).forEach((piece, offset) => {
      const n = start + offset;
      batch.set(doc(db!, 'siteTour', course, 'video', pieceId(n)), { data: toBase64(piece) });
    });
    await batch.commit();
    done += Math.min(PIECES_PER_BATCH, pieces.length - start);
    onProgress(done, total);
  }

  const subtitles = writeBatch(db);
  subtitles.set(doc(db, 'siteTour', course, 'subtitles', 'mn'), { text: await mn.text() });
  subtitles.set(doc(db, 'siteTour', course, 'subtitles', 'en'), { text: await en.text() });
  await subtitles.commit();
  done += 2;
  onProgress(done, total);

  const info = writeBatch(db);
  info.set(doc(db, 'siteTour', course, 'meta', 'info'), {
    pieces: pieces.length,
    bytes: bytes.length,
    updatedAt: new Date().toISOString()
  });
  await info.commit();
  onProgress(total, total);
  return pieces.length;
};
