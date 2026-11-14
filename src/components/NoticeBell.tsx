import React, { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { useAuthUser } from '../lib/cloud';
import { readSeen, subscribeNotices, writeSeen, type Notice } from '../lib/notices';

// The bell in the top bar for a signed-in student: the notices of their own programme, with the count of unread ones.
// Opening the bell marks them read on this device. The teacher has the Notices tab instead, so the bell is not shown to the teacher.
export const NoticeBell: React.FC = () => {
  const { mode } = useLanguage();
  const { courseChoice } = useApp();
  const { user } = useAuthUser();
  const uid = user?.uid ?? null;
  const [items, setItems] = useState<Notice[]>([]);
  const [seen, setSeen] = useState('');
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => subscribeNotices(courseChoice, setItems, () => setItems([])), [courseChoice]);

  useEffect(() => {
    setSeen(uid ? readSeen(uid, courseChoice) : '');
  }, [uid, courseChoice]);

  // A click outside the bell closes its list
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  if (!uid) return null;

  const mn = mode === 'mn';
  const unread = items.filter(n => n.createdAt > seen).length;
  const label = mn ? 'Мэдэгдэл' : 'Notices';

  const markAllRead = () => {
    if (items.length === 0) return;
    writeSeen(uid, courseChoice, items[0].createdAt);
    setSeen(items[0].createdAt);
  };

  const toggle = () => {
    if (!open) markAllRead();
    setOpen(v => !v);
  };

  const dateOf = (iso: string) => iso.slice(0, 10);

  return (
    <div className="relative" ref={boxRef}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={unread > 0 ? `${label} (${unread})` : label}
        title={label}
        className="relative flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        <Bell className="w-4 h-4" aria-hidden="true" />
        {unread > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold leading-[18px] text-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 sm:w-80 max-h-96 overflow-y-auto p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl">
          <div className="mb-2 text-sm font-bold text-slate-900 dark:text-white">{label}</div>
          {items.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">{mn ? 'Одоогоор мэдэгдэл алга.' : 'No notices yet.'}</p>
          ) : (
            <ul className="space-y-2">
              {items.slice(0, 10).map(n => (
                <li key={n.id} className="rounded-xl border border-slate-200 dark:border-slate-700 p-2.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{n.title}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{dateOf(n.createdAt)}</span>
                  </div>
                  {n.body && <p className="mt-1 whitespace-pre-line text-xs text-slate-700 dark:text-slate-300">{n.body}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
