import { storage } from './firebase';

// The pictures of each slide deck (NN-KK.jpg and manifest.json). When the app is connected to Firebase they are read
// from Storage under previews/, which everyone can read and only the teacher account can write (storage.rules). Without
// Firebase the copies in public/slides are used, as in local development.

// The Storage path of one file of a deck, for example previews/alevel-9701/04_Ch4_Chemical_Bonding/manifest.json
export const previewPath = (course: string, deckFolder: string, file: string) => `previews/${course}/${deckFolder}/${file}`;

// The address the browser loads a picture or the manifest from
export const previewUrl = (course: string, deckFolder: string, file: string): string => {
  const bucket = storage?.app.options.storageBucket;
  if (bucket) {
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(previewPath(course, deckFolder, file))}?alt=media`;
  }
  return `${import.meta.env.BASE_URL}slides/${course}/previews/${deckFolder}/${file}`;
};
