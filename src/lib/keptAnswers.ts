import { useEffect, useRef } from 'react';
import { loadKeptAnswers, saveKeptAnswers, useAuthUser } from './cloud';

// The student's answers to a check, practice set or exit ticket. They are kept on this device at once, and on the student's
// own account when signed in, so they come back when the page opens again on any device. They are cleared only when the
// student starts again. The values are passed in with apply, which sets them back into the component's state.
export const useKeptAnswers = <T extends object>(key: string, values: T, apply: (saved: T) => void) => {
  const { user } = useAuthUser();
  const uid = user?.uid;
  const applyRef = useRef(apply);
  applyRef.current = apply;
  const serialized = JSON.stringify(values);
  const localKey = `chem_answers_${key}`;
  const firstRun = useRef(true);

  // The copy on this device comes back when the page opens
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(localKey);
      if (raw) applyRef.current(JSON.parse(raw) as T);
    } catch {
      // Storage can be blocked; the answers then last for this visit only
    }
  }, [localKey]);

  // When signed in, the copy on the account replaces the device copy
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;
    loadKeptAnswers(uid, key)
      .then(saved => {
        if (!cancelled && saved) applyRef.current(saved as T);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [uid, key]);

  // Each change is kept on the device, and on the account when signed in. The first render is skipped, because it still
  // holds the empty values before the saved copy comes back.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    try {
      window.localStorage.setItem(localKey, serialized);
    } catch {
      // Storage can be blocked; the answers then last for this visit only
    }
    if (uid) saveKeptAnswers(uid, key, JSON.parse(serialized) as object).catch(() => undefined);
  }, [serialized]);
};
