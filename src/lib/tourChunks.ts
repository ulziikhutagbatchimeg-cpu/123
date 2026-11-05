// The site tour is stored in Firestore in pieces: Firestore documents are at most 1 MiB, and a binary is sent as base64
// text (one third larger). Each video piece is 600 KiB of the file, so its base64 text stays well under the limit.
export const CHUNK_BYTES = 600 * 1024;

// Split a file into pieces of CHUNK_BYTES; the last piece may be shorter
export const splitBytes = (bytes: Uint8Array, size: number = CHUNK_BYTES): Uint8Array[] => {
  const pieces: Uint8Array[] = [];
  for (let start = 0; start < bytes.length; start += size) {
    pieces.push(bytes.subarray(start, Math.min(start + size, bytes.length)));
  }
  return pieces;
};

// Base64 of a byte array, built in steps so that a large piece does not overflow the call stack
export const toBase64 = (bytes: Uint8Array): string => {
  let binary = '';
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    binary += String.fromCharCode(...bytes.subarray(i, i + step));
  }
  return btoa(binary);
};

export const fromBase64 = (text: string): Uint8Array<ArrayBuffer> => {
  const binary = atob(text);
  const bytes: Uint8Array<ArrayBuffer> = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

// The document id of video piece n, in order, so that the pieces sort as they are read
export const pieceId = (n: number): string => String(n).padStart(3, '0');
