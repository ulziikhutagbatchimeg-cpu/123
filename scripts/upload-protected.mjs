// Uploads course content from this computer to Firebase Storage, under protected/<course>/. Only the teacher runs it.
//
// Usage. The service-account key stays outside the project; its path is set in the environment, never written into a file:
//   set GOOGLE_APPLICATION_CREDENTIALS=C:\secure\firebase-service-account.json
//   set FIREBASE_STORAGE_BUCKET=<the bucket name from the Firebase console>
//   node scripts/upload-protected.mjs <igcse|as|a> <folder> [--dry-run]
//
// Only .json and picture files are sent (.pptx and .pdf are never uploaded). Each file keeps its path inside the folder.
// A file that already exists in Storage is replaced. --dry-run lists what would be uploaded and sends nothing.

import { readdir } from 'node:fs/promises';
import { join, relative, resolve, sep, extname } from 'node:path';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

const COURSES = ['igcse', 'as', 'a'];
const CONTENT_TYPES = {
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png'
};
const IGNORED = new Set(['Thumbs.db', 'desktop.ini']);
const PARALLEL = 8;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const [course, folder] = args.filter(arg => !arg.startsWith('--'));

if (!COURSES.includes(course) || !folder) {
  console.error('Usage: node scripts/upload-protected.mjs <igcse|as|a> <folder> [--dry-run]');
  process.exit(1);
}

const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
if (!dryRun && !bucketName) {
  console.error('Set FIREBASE_STORAGE_BUCKET to the bucket name from the Firebase console first.');
  process.exit(1);
}

const root = resolve(folder);

async function listFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || IGNORED.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await listFiles(full)));
    else if (entry.isFile()) found.push(full);
  }
  return found;
}

const everything = await listFiles(root);
const plan = everything
  .filter(file => CONTENT_TYPES[extname(file).toLowerCase()])
  .map(file => ({
    local: file,
    remote: `protected/${course}/${relative(root, file).split(sep).join('/')}`,
    type: CONTENT_TYPES[extname(file).toLowerCase()]
  }));
const skipped = everything.length - plan.length;

if (dryRun) {
  for (const item of plan) console.log(item.remote);
  console.log(`\nDry run: ${plan.length} files would go to protected/${course}/ (${skipped} other files skipped). Nothing was sent.`);
  process.exit(0);
}

initializeApp({ credential: applicationDefault(), storageBucket: bucketName });
const bucket = getStorage().bucket();

let done = 0;
for (let i = 0; i < plan.length; i += PARALLEL) {
  await Promise.all(
    plan.slice(i, i + PARALLEL).map(async item => {
      await bucket.upload(item.local, { destination: item.remote, metadata: { contentType: item.type } });
      done++;
    })
  );
  process.stdout.write(`\r${done}/${plan.length}`);
}
console.log(`\nUploaded ${done} files to protected/${course}/ (${skipped} other files skipped).`);
