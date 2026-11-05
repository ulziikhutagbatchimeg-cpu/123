import React, { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { subscribeWaitingEnrollments, type Enrollment } from '../lib/cloud';

const PROGRAMME_LABEL: Record<string, string> = { igcse: 'IGCSE 0620', as: 'AS 9701', a: 'A Level 9701' };

// The teacher's bell in the top bar: the enrolment requests still waiting for a decision. The count is the number waiting,
// so it goes down as the teacher decides each one in the Enrollments tab. Shown only to the teacher's signed-in account.
export const TeacherBell: React.FC = () => {
  const { mode } = useLanguage();
  const [items, setItems] = useState<Enrollment[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => subscribeWaitingEnrollments(setItems, () => setItems([])), []);

  // A click outside the bell closes its list
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const mn = mode === 'mn';
  const label = mn ? 'Элсэлтийн хүсэлт' : 'Enrolment requests';
  const waiting = items.length;
  const dateOf = (iso: string) => iso.slice(0, 10);

  return (
    <div className="relative" ref={boxRef}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={waiting > 0 ? `${label} (${waiting})` : label}
        title={label}
        className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-emerald-400 dark:hover:border-teal-500"
      >
        <Bell className="w-4 h-4" aria-hidden="true" />
        {waiting > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold leading-[18px] text-center">
            {waiting}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 sm:w-80 max-h-96 overflow-y-auto p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl">
          <div className="mb-2 text-sm font-bold text-slate-900 dark:text-white">{label}</div>
          {items.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">{mn ? 'Хүлээгдэж буй хүсэлт алга.' : 'No requests waiting.'}</p>
          ) : (
            <ul className="space-y-2">
              {items.map(e => (
                <li key={e.id} className="rounded-xl border border-slate-200 dark:border-slate-700 p-2.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{e.name}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{dateOf(e.requestedAt)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-700 dark:text-slate-300">
                    {PROGRAMME_LABEL[e.programme] ?? e.programme}
                    {e.grade ? ` · ${e.grade}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          )}
          {items.length > 0 && (
            <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              {mn ? 'Шийдвэрлэх: Элсэлт таб.' : 'Decide in the Enrollments tab.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
