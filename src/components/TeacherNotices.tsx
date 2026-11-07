import React, { useEffect, useState } from 'react';
import { Send, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { isFirebaseConfigured } from '../lib/firebase';
import { NOTICE_PROGRAMMES, deleteNotice, sendNotice, subscribeNotices, type Notice, type NoticeProgramme } from '../lib/notices';

// Teacher only: write a notice for the students of one or more programmes, and see the notices already sent.
// Sending or deleting a notice never changes a student's results.
export const TeacherNotices: React.FC = () => {
  const { mode } = useLanguage();
  const [programmes, setProgrammes] = useState<NoticeProgramme[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [items, setItems] = useState<Notice[]>([]);

  useEffect(() => subscribeNotices(null, setItems, () => setItems([])), []);

  const toggle = (value: NoticeProgramme) =>
    setProgrammes(current => (current.includes(value) ? current.filter(p => p !== value) : [...current, value]));

  const send = async () => {
    if (busy || programmes.length === 0 || !title.trim()) return;
    setBusy(true);
    setMessage(null);
    try {
      const count = await sendNotice(programmes, title.trim(), body.trim());
      setMessage(mode === 'en' ? `Sent to ${count} programme(s).` : `${count} хөтөлбөрт илгээгдлээ.`);
      setTitle('');
      setBody('');
      setProgrammes([]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm(mode === 'en' ? 'Delete this notice?' : 'Энэ мэдэгдлийг устгах уу?')) return;
    try {
      await deleteNotice(id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    }
  };

  const labelOf = (value: NoticeProgramme) => NOTICE_PROGRAMMES.find(p => p.value === value)?.label ?? value;

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-slate-400 bg-slate-100 p-5 sm:p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">{mode === 'en' ? 'Notices to students' : 'Суралцагчдад мэдэгдэл'}</h3>
          <p className="text-xs text-slate-600">
            {mode === 'en'
              ? 'Choose the programmes. Each student sees the notices of their own programme on the Dashboard.'
              : 'Хөтөлбөр сонгоно. Суралцагч өөрийн хөтөлбөрийн мэдэгдлийг Dashboard дээр харна.'}
          </p>
          {!isFirebaseConfigured && (
            <p className="text-xs text-amber-800">{mode === 'en' ? 'Firebase is not configured here.' : 'Firebase энд тохируулагдаагүй байна.'}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {NOTICE_PROGRAMMES.map(p => (
            <button
              key={p.value}
              type="button"
              onClick={() => toggle(p.value)}
              aria-pressed={programmes.includes(p.value)}
              className={`rounded-lg border px-3 py-2 text-xs font-bold ${
                programmes.includes(p.value) ? 'border-emerald-500 bg-emerald-600 text-white' : 'border-slate-400 text-slate-700 hover:border-slate-600'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={120}
          placeholder={mode === 'en' ? 'Title' : 'Гарчиг'}
          className="w-full rounded-lg border border-slate-400 bg-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500"
        />
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          maxLength={1000}
          rows={4}
          placeholder={mode === 'en' ? 'Message' : 'Агуулга'}
          className="w-full rounded-lg border border-slate-400 bg-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500"
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={send}
            disabled={busy || programmes.length === 0 || !title.trim() || !isFirebaseConfigured}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500 disabled:opacity-40"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {mode === 'en' ? 'Send' : 'Илгээх'}
          </button>
          {message && <span className="text-xs text-slate-800">{message}</span>}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-400 bg-slate-100 p-5 sm:p-6 space-y-3">
        <h3 className="text-base font-bold text-slate-900">{mode === 'en' ? 'Sent notices' : 'Илгээсэн мэдэгдэл'}</h3>
        {items.length === 0 && <p className="text-xs text-slate-600">{mode === 'en' ? 'No notices yet.' : 'Одоогоор мэдэгдэл алга.'}</p>}
        <ul className="space-y-2">
          {items.map(n => (
            <li key={n.id} className="flex items-start justify-between gap-3 rounded-xl border border-slate-400 bg-slate-200 p-3">
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900">
                  {n.title} <span className="ml-2 text-xs font-normal text-emerald-700">{labelOf(n.programme)}</span>
                </div>
                <div className="text-xs text-slate-600">{n.createdAt.slice(0, 16).replace('T', ' ')}</div>
                {n.body && <p className="mt-1 whitespace-pre-line text-sm text-slate-700">{n.body}</p>}
              </div>
              <button
                type="button"
                onClick={() => remove(n.id)}
                aria-label={mode === 'en' ? 'Delete notice' : 'Мэдэгдэл устгах'}
                className="shrink-0 rounded-lg border border-slate-400 p-2 text-slate-700 hover:border-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
