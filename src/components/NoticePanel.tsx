import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuthUser } from '../lib/cloud';
import { readSeen, subscribeNotices, writeSeen, type Notice } from '../lib/notices';

// The notices of this programme, at the top of the Dashboard. Unread notices are counted; "mark all read" keeps the
// newest time on this device, so the count starts again only when a newer notice arrives.
export const NoticePanel: React.FC = () => {
  const { mode } = useLanguage();
  const { courseChoice } = useApp();
  const { user } = useAuthUser();
  const uid = user?.uid ?? null;
  const [items, setItems] = useState<Notice[]>([]);
  const [seen, setSeen] = useState('');

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

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-emerald-700 dark:text-teal-300" aria-hidden="true" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {mode === 'en' ? 'Notices' : 'Мэдэгдэл'}
          </h2>
          {unread > 0 && (
            <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">{unread}</span>
          )}
        </div>
        {unread > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:text-slate-200"
          >
            {mode === 'en' ? 'Mark all read' : 'Бүгдийг уншсан'}
          </button>
        )}
      </div>
      <ul className="mt-3 space-y-3">
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
    </section>
  );
};
