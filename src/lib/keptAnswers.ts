import { useRef } from 'react';
import { useKeptValue } from './accountCopy';

// The student's answers to a check, practice set or exit ticket. They are kept on this device at once, and on the student's
// own account when signed in (lib/accountCopy), so they come back when the page opens again on any device. They are cleared
// only when the student starts again. The values are passed in with apply, which sets them back into the component's state;
// the values of the first render are the empty state, used when nothing is kept.
export const useKeptAnswers = <T extends object>(key: string, values: T, apply: (saved: T) => void) => {
  const serialized = JSON.stringify(values);
  const initial = useRef(values);
  const empty = useRef(serialized);
  useKeptValue(
    `chem_answers_${key}`,
    serialized,
    saved => {
      if (saved === null) {
        apply(initial.current);
        return;
      }
      try {
        apply({ ...initial.current, ...(JSON.parse(saved) as T) });
      } catch {
        // A damaged copy is left out; the check starts empty
      }
    },
    empty.current
  );
};
