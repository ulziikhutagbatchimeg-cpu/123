import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ENCOURAGE_EVENT, type EncourageNote } from '../lib/encourage';

// A small note at the foot of the page that cheers the student on as they work. It shows for a moment, then fades by itself.
export const Encourager: React.FC = () => {
  const { mode } = useLanguage();
  const [note, setNote] = useState<EncourageNote | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const onNote = (event: Event) => {
      setNote((event as CustomEvent<EncourageNote>).detail);
      setShown(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setShown(false), 2200);
    };
    window.addEventListener(ENCOURAGE_EVENT, onNote);
    return () => {
      window.removeEventListener(ENCOURAGE_EVENT, onNote);
      window.clearTimeout(timer);
    };
  }, []);

  const text = !note ? '' : mode === 'en' ? note.en : mode === 'mn' ? note.mn : `${note.en} / ${note.mn}`;

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-28 z-40 flex justify-center px-4">
      <div
        className={`flex max-w-full items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-lg transition-all duration-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${
          shown ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
        }`}
      >
        <span aria-hidden="true">{note?.emoji}</span>
        <span className="truncate">{text}</span>
      </div>
    </div>
  );
};
