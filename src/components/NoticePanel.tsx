import React, { useEffect, useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuthUser } from '../lib/cloud';
import { readSeen, subscribeNotices, writeSeen, type Notice } from '../lib/notices';

// The notices of this programme, on the Dashboard under today's cycle. Unread notices are counted; "mark all read" keeps
// the newest time on this device, so the count starts again only when a newer notice arrives. It is one fold, open while
// a notice is unread.
export const NoticePanel: React.FC = () => {
  const { mode } = useLanguage();
  const { courseChoice } = useApp();
  const { user } = useAuthUser();
  const uid = user?.uid ?? null;
  const [items, setItems] = useState<Notice[]>([]);
  const [seen, setSeen] = useState('');
  // One fold: open while a notice is unread, folded to the newest title once all are read; the student can open it any time
  const [openChoice, setOpenChoice] = useState<boolean | null>(null);

  useEffect(() => subscribeNotices(courseChoice, setItems, () => setItems([])), [courseChoice]);

  useEffect(() => {
    setSeen(uid ? readSeen(uid, courseChoice) : '');
  }, [uid, courseChoice]);

  if (items.length === 0) return null;

  const unread = items.filter(n => n.createdAt > seen).length;
  const markAllRead = () => {
    if (!uid) return;
    writeSeen(uid, courseChoice, items[0].createdAt);
    setSeen(items[0].createdAt);
  };
  const dateOf = (iso: string) => iso.slice(0, 10);
  const open = openChoice ?? unread > 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <button type="button" onClick={() => setOpenChoice(!open)} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-2 text-left">
          <Bell className="h-4 w-4 shrink-0 text-emerald-700 dark:text-teal-300" aria-hidden="true" />
          <span className="min-w-0">
            <span className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              {mode === 'en' ? 'Notices' : 'Мэдэгдэл'}
              {unread > 0 && <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">{unread}</span>}
            </span>
            {!open && <span className="block truncate text-xs text-slate-600 dark:text-slate-400">{dateOf(items[0].createdAt)} · {items[0].title}</span>}
          </span>
          <ChevronDown className={`ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {open && unread > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:text-slate-200"
          >
            {mode === 'en' ? 'Mark all read' : 'Бүгдийг уншсан'}
          </button>
        )}
      </div>
      {open && (
      <ul className="space-y-3 border-t border-slate-100 px-4 pb-4 pt-3 dark:border-slate-800 sm:px-5">
        {items.slice(0, 5).map(n => (
          <li key={n.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">{n.title}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{dateOf(n.createdAt)}</span>
            </div>
            {n.body && <p className="mt-1 whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">{n.body}</p>}
          </li>
        ))}
      </ul>
      )}
    </section>
  );
};
