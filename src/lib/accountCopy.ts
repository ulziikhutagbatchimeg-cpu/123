import { useEffect, useRef } from 'react';
import type { User } from 'firebase/auth';
import { listKeptValues, saveKeptValue } from './cloud';

// A student's work in the lessons and topics is kept on this browser: the answers of the checks, quick checks, practice sets
// and exit tickets, the prediction of each lesson, the written answers and the topics finished. A copy of each is kept on the
// student's own account (students/{uid}/answers, which only that student reads and writes), so the work comes back on any
// device, and after the browser forgets it.
//  - Each change is kept on this browser at once and goes to the account a moment later.
//  - At sign-in the account copy is read: for each value the newer copy wins, and work on this browser the account does not
//    have yet goes up. The topics finished are joined from both copies.
//  - When another account signs in on this browser, the kept work of the one before is cleared from it first (it is on that
//    account), so one student never sees or takes over another's answers.

export const KEPT_RESTORED = 'chem-kept-restored';

// The browser keys copied to the account. useKeptAnswers keeps its values under chem_answers_<key>; that document is <key>,
// as before. Every other key is kept in the document ls_<key>.
const ANSWERS_PREFIX = 'chem_answers_';
const PREFIXES = [ANSWERS_PREFIX, 'chem_quick_', 'chem_prediction_', 'chem_answer_', 'chem_submitted_', 'chem_done_'];
const KEYS = ['chem_cambridge_stats'];
const TIMES_KEY = 'chem_kept_times'; // when each kept key last changed on this browser, in milliseconds
const OWNER_KEY = 'chem_kept_owner'; // the account the kept work on this browser belongs to
const MAX_LENGTH = 60000; // the rules' limit for one value; a longer one (a drawing) stays on this browser
const UPLOAD_DELAY = 800;

export const isKeptKey = (key: string) => KEYS.includes(key) || PREFIXES.some(p => key.startsWith(p));
const docIdOf = (key: string) => (key.startsWith(ANSWERS_PREFIX) ? key.slice(ANSWERS_PREFIX.length) : `ls_${key}`);
const keyOf = (id: string) => (id.startsWith('ls_') ? id.slice(3) : `${ANSWERS_PREFIX}${id}`);

const readRaw = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeRaw = (key: string, value: string | null) => {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked; the work then lasts for this visit, and on the account
  }
};

const readTimes = (): Record<string, number> => {
  try {
    return JSON.parse(readRaw(TIMES_KEY) ?? '{}') as Record<string, number>;
  } catch {
    return {};
  }
};

const setTime = (key: string, at: number) => {
  const times = readTimes();
  times[key] = at;
  writeRaw(TIMES_KEY, JSON.stringify(times));
};

// The finished topics are joined, and each count keeps the larger value, so work from both devices stays
const joinStats = (a: string, b: string): string => {
  try {
    const x = JSON.parse(a) as Record<string, unknown>;
    const y = JSON.parse(b) as Record<string, unknown>;
    const out: Record<string, unknown> = { ...x, ...y };
    for (const k of Object.keys(out)) {
      if (Array.isArray(x[k]) || Array.isArray(y[k])) out[k] = Array.from(new Set([...((x[k] as unknown[]) ?? []), ...((y[k] as unknown[]) ?? [])]));
      else if (typeof x[k] === 'number' && typeof y[k] === 'number') out[k] = Math.max(x[k] as number, y[k] as number);
    }
    return JSON.stringify(out);
  } catch {
    return b;
  }
};
const JOIN: Record<string, (local: string, account: string) => string> = { chem_cambridge_stats: joinStats };

let accountUid: string | null = null;
const timers = new Map<string, number>();

const upload = (uid: string, key: string, value: string, at: number) => {
  if (value.length > MAX_LENGTH) return;
  const old = timers.get(key);
  if (old !== undefined) window.clearTimeout(old);
  timers.set(
    key,
    window.setTimeout(() => {
      timers.delete(key);
      saveKeptValue(uid, docIdOf(key), value, at).catch(() => undefined);
    }, UPLOAD_DELAY)
  );
};

// Keeps one value on this browser, and on the account when a student is signed in. Writing the value it already has does nothing.
export const keepValue = (key: string, value: string) => {
  if (readRaw(key) === value) return;
  const at = Date.now();
  writeRaw(key, value);
  setTime(key, at);
  if (accountUid) upload(accountUid, key, value, at);
};

// Reads the account copy at sign-in and brings this browser and the account into line
const restore = async (uid: string) => {
  // Another account's work on this browser is cleared first; work from before any sign-in is taken over by this account
  const owner = readRaw(OWNER_KEY);
  if (owner && owner !== uid) {
    const keys: string[] = [];
    try {
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && isKeptKey(key)) keys.push(key);
      }
    } catch {
      // Storage is blocked: there is nothing on this browser to clear
    }
    keys.forEach(key => writeRaw(key, null));
    writeRaw(TIMES_KEY, null);
    window.dispatchEvent(new Event(KEPT_RESTORED));
  }
  writeRaw(OWNER_KEY, uid);

  const saved = await listKeptValues(uid);
  if (accountUid !== uid) return; // signed out, or another account, while reading
  const times = readTimes();
  const onAccount = new Set<string>();
  let changed = false;
  for (const item of saved) {
    const key = keyOf(item.id);
    if (!isKeptKey(key)) continue;
    onAccount.add(key);
    const local = readRaw(key);
    const localAt = times[key] ?? 0;
    const join = JOIN[key];
    if (join && local !== null) {
      const joined = join(local, item.value);
      if (joined !== local) {
        writeRaw(key, joined);
        changed = true;
      }
      if (joined !== item.value) upload(uid, key, joined, Date.now());
    } else if (local === null || item.savedAt > localAt) {
      if (local !== item.value) {
        writeRaw(key, item.value);
        times[key] = item.savedAt;
        changed = true;
      }
    } else if (local !== item.value) {
      upload(uid, key, local, localAt);
    }
  }
  // Work on this browser that the account does not have yet
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key || !isKeptKey(key) || onAccount.has(key)) continue;
      const value = readRaw(key);
      if (value !== null && value !== '') upload(uid, key, value, times[key] ?? Date.now());
    }
  } catch {
    // Storage is blocked: nothing to send
  }
  writeRaw(TIMES_KEY, JSON.stringify(times));
  if (changed) window.dispatchEvent(new Event(KEPT_RESTORED));
};

// Runs once someone signs in, for every account (the teacher's own answers are kept the same way)
export const useAccountCopy = (user: User | null): void => {
  const uid = user?.uid ?? null;
  useEffect(() => {
    accountUid = uid;
    if (!uid) return;
    restore(uid).catch(() => undefined);
  }, [uid]);
};

// Keeps one value of a component under a browser key, and on the account. The value comes back when the component opens and
// when the account copy has been read; each change is kept at once. apply gets null when nothing is kept, so the component
// goes back to its empty state. empty is that state's value: it is not kept for a key that has nothing yet, so a browser that
// has just been cleared, or has not read the account yet, never writes over the account copy. A null key keeps nothing.
export const useKeptValue = (key: string | null, value: string, apply: (saved: string | null) => void, empty?: string) => {
  const applyRef = useRef(apply);
  applyRef.current = apply;
  // The value is kept only when it changes under the same key: the first render, and a new key, hold values not yet read back
  const lastKey = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (!key) return;
    const load = () => applyRef.current(readRaw(key));
    load();
    window.addEventListener(KEPT_RESTORED, load);
    return () => window.removeEventListener(KEPT_RESTORED, load);
  }, [key]);

  useEffect(() => {
    if (lastKey.current !== key) {
      lastKey.current = key;
      return;
    }
    if (!key) return;
    if (empty !== undefined && value === empty && readRaw(key) === null) return;
    keepValue(key, value);
  }, [key, value]);
};
