import React, { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { useAuthUser } from '../lib/cloud';
import { addNote, deleteNotebookItem, subscribeNotebook, updateNote, type NotebookItem } from '../lib/notebook';

const CARD = 'rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5';
const INPUT = 'w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-white';
const BUTTON = 'px-3 py-2 rounded-lg text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40';
const GHOST = 'px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';

// The student's notebook: the lessons pinned to it and the student's own notes. It is kept on the account, so it
// is the same on every device, and it can be printed.
export const NotebookView: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { setActiveTab } = useApp();
  const { user } = useAuthUser();
  const uid = user?.uid ?? null;
  const [items, setItems] = useState<NotebookItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!uid) {
      setItems([]);
      return;
    }
    return subscribeNotebook(uid, setItems, () => setError(mn ? 'Дэвтрийг ачаалж чадсангүй.' : 'Could not load the notebook.'));
  }, [uid, mn]);

  const lessons = items.filter(i => i.kind === 'lesson');
  const notes = items.filter(i => i.kind === 'note');
  const dateOf = (iso: string) => (iso ? new Date(iso).toLocaleDateString() : '');

  const save = async () => {
    if (!uid || !title.trim()) return;
    setBusy(true);
    setError(null);
    try {
      if (editing) await updateNote(uid, editing, title, body);
      else await addNote(uid, title, body);
      setTitle('');
      setBody('');
      setEditing(null);
    } catch {
      setError(mn ? 'Хадгалж чадсангүй.' : 'Could not save.');
    } finally {
      setBusy(false);
    }
  };

  const edit = (item: NotebookItem) => {
    setEditing(item.id);
    setTitle(item.title);
    setBody(item.body);
  };

  const remove = async (item: NotebookItem) => {
    if (!uid) return;
    if (!window.confirm(mn ? 'Энэ зүйлийг дэвтрээс устгах уу?' : 'Remove this from the notebook?')) return;
    try {
      await deleteNotebookItem(uid, item.id);
    } catch {
      setError(mn ? 'Устгаж чадсангүй.' : 'Could not remove it.');
    }
  };

  if (!uid) {
    return (
      <div className={`${CARD} space-y-3`}>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{mn ? 'Миний дэвтэр' : 'My notebook'}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {mn ? 'Дэвтэртээ хадсан хичээл, өөрийн тэмдэглэлээ хадгалахын тулд нэвтэрнэ үү.' : 'Sign in to keep the lessons you pin and your own notes.'}
        </p>
        <button type="button" onClick={() => setActiveTab('login')} className={BUTTON}>
          {mn ? 'Нэвтрэх' : 'Sign in'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{mn ? 'Миний дэвтэр' : 'My notebook'}</h2>
        <button type="button" onClick={() => window.print()} className={`${GHOST} print:hidden inline-flex items-center gap-1.5`}>
          <Printer className="w-3.5 h-3.5" aria-hidden="true" />
          {mn ? 'Хэвлэх' : 'Print'}
        </button>
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      <section className={`${CARD} space-y-3`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {mn ? 'Хадсан хичээл' : 'Pinned lessons'}
        </h3>
        {lessons.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {mn ? 'Хичээлийн хуудсан дээрх "Дэвтэрт хадах" товчоор хичээлээ хадна.' : 'Pin a lesson with the "Pin to notebook" button on its page.'}
          </p>
        ) : (
          <ul className="space-y-2">
            {lessons.map(item => (
              <li key={item.id} className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{item.refKey}</div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">{item.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{dateOf(item.createdAt)}</div>
                </div>
                <button type="button" onClick={() => remove(item)} className={`${GHOST} print:hidden`}>
                  {mn ? 'Устгах' : 'Remove'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={`${CARD} space-y-3`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {mn ? 'Миний тэмдэглэл' : 'My notes'}
        </h3>
        <div className="space-y-2 print:hidden">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={120}
            placeholder={mn ? 'Гарчиг' : 'Title'}
            className={INPUT}
          />
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            maxLength={2000}
            rows={4}
            placeholder={mn ? 'Тэмдэглэл' : 'Note'}
            className={INPUT}
          />
          <div className="flex items-center gap-2">
            <button type="button" onClick={save} disabled={busy || !title.trim()} className={BUTTON}>
              {editing ? (mn ? 'Хадгалах' : 'Save') : (mn ? 'Нэмэх' : 'Add')}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setTitle('');
                  setBody('');
                }}
                className={GHOST}
              >
                {mn ? 'Болих' : 'Cancel'}
              </button>
            )}
          </div>
        </div>

        {notes.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">{mn ? 'Одоохондоо тэмдэглэл алга.' : 'No notes yet.'}</p>
        ) : (
          <ul className="space-y-3">
            {notes.map(item => (
              <li key={item.id} className="rounded-lg border border-slate-200 dark:border-slate-800 p-3 space-y-1.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{dateOf(item.updatedAt || item.createdAt)}</div>
                  </div>
                  <div className="flex shrink-0 gap-1.5 print:hidden">
                    <button type="button" onClick={() => edit(item)} className={GHOST}>
                      {mn ? 'Засах' : 'Edit'}
                    </button>
                    <button type="button" onClick={() => remove(item)} className={GHOST}>
                      {mn ? 'Устгах' : 'Remove'}
                    </button>
                  </div>
                </div>
                {item.body && <p className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">{item.body}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
