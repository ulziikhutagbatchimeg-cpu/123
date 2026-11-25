import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuthUser } from '../lib/cloud';
import { NOTICES_SEEN, readSeen, subscribeNotices, writeSeen, type Notice } from '../lib/notices';

// The teacher's newest unread notice, on Home above today's cycle: one line with its title and text, and "Read". Nothing
// shows once every notice is read; all of them stay in the bell of the top bar (components/NoticeBell). Marking them read
// here or in the bell keeps the newest time on this device, and both stop counting at once.
export const NoticePanel: React.FC = () => {
  const { mode } = useLanguage();
  const { courseChoice } = useApp();
  const { user } = useAuthUser();
  const uid = user?.uid ?? null;
  const [items, setItems] = useState<Notice[]>([]);
  const [seen, setSeen] = useState('');

  useEffect(() => subscribeNotices(courseChoice, setItems, () => setItems([])), [courseChoice]);

  useEffect(() => {
    const read = () => setSeen(uid ? readSeen(uid, courseChoice) : '');
    read();
    window.addEventListener(NOTICES_SEEN, read);
    return () => window.removeEventListener(NOTICES_SEEN, read);
  }, [uid, courseChoice]);

  const unread = items.filter(n => n.createdAt > seen);
  if (!uid || unread.length === 0) return null;
  const newest = unread[0];
  const mn = mode === 'mn';
  const markAllRead = () => writeSeen(uid, courseChoice, items[0].createdAt);

  return (
    <section className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/60 dark:bg-amber-950/30 sm:px-5">
      <Bell className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold text-slate-900 dark:text-white">
          {mn ? 'Багшийн шинэ мэдэгдэл' : 'New notice from your teacher'}
          {unread.length > 1 ? ` (${unread.length})` : ''}: {newest.title}
        </div>
        {newest.body && <p className="mt-0.5 whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">{newest.body}</p>}
        {unread.length > 1 && (
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            {mn ? 'Бусад мэдэгдэл дээд талын хонхонд байна.' : 'The others are in the bell at the top.'}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={markAllRead}
        className="shrink-0 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-amber-500 dark:border-amber-700 dark:bg-slate-900 dark:text-slate-200"
      >
        {mn ? 'Уншсан' : 'Read'}
      </button>
    </section>
  );
};
