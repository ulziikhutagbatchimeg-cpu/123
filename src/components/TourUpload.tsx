import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { isFirebaseConfigured } from '../lib/firebase';
import type { TourCourse } from '../lib/overviewVideo';
import { uploadTour } from '../lib/tourUpload';

// Teacher only: put the two-minute site tour into Firestore for one course (the 9701 courses share one copy)
export const TourUpload: React.FC = () => {
  const { mode } = useLanguage();
  const [course, setCourse] = useState<TourCourse>('igcse');
  const [video, setVideo] = useState<File | null>(null);
  const [mn, setMn] = useState<File | null>(null);
  const [en, setEn] = useState<File | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // English only, Mongolian only, or both in Dual (English first, Mongolian beside it in a lighter tone)
  const txt = (en: string, mnText: string) => {
    if (mode === 'en') return en;
    if (mode === 'mn') return mnText;
    return (
      <>
        {en}
        <span className="ml-1.5 text-xs font-normal text-slate-400">({mnText})</span>
      </>
    );
  };

  const upload = async () => {
    if (!video || !mn || !en || busy) return;
    setBusy(true);
    setMessage(null);
    try {
      const pieces = await uploadTour(course, video, mn, en, (done, total) => setProgress({ done, total }));
      setMessage(mode === 'mn' ? `Амжилттай: ${pieces} хэсэг байршлаа.` : `Uploaded: ${pieces} pieces.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const fileInput = (label: React.ReactNode, accept: string, onPick: (file: File | null) => void, picked: File | null) => (
    <label className="block space-y-1">
      <span className="text-xs font-semibold text-slate-300">{label}</span>
      <input
        type="file"
        accept={accept}
        onChange={event => onPick(event.target.files?.[0] ?? null)}
        className="block w-full text-xs text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-700 file:px-3 file:py-1.5 file:font-bold file:text-white"
      />
      {picked && <span className="block truncate text-[11px] text-emerald-300">{picked.name}</span>}
    </label>
  );

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:p-6 space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white">{txt('Site tour video', 'Танилцуулга видео')}</h3>
        <p className="text-xs text-slate-400">
          {txt(
            'Upload the video and the two subtitle files for one course. Students see it on the Dashboard once it is uploaded.',
            'Нэг хөтөлбөрт видео, хоёр субтитрийн файлыг оруулна. Оруулсны дараа сурагчийн Dashboard дээр харагдана.'
          )}
        </p>
        {!isFirebaseConfigured && (
          <p className="text-xs text-amber-300">{txt('Firebase is not configured here.', 'Firebase энд тохируулагдаагүй байна.')}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {(['igcse', 'alevel'] as const).map(value => (
          <button
            key={value}
            type="button"
            onClick={() => setCourse(value)}
            aria-pressed={course === value}
            className={`rounded-lg border px-3 py-2 text-xs font-bold ${
              course === value ? 'border-emerald-400 bg-emerald-600 text-white' : 'border-slate-600 text-slate-300 hover:border-slate-400'
            }`}
          >
            {value === 'igcse' ? 'IGCSE 0620' : '9701 (AS / A Level)'}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {fileInput(txt('Video (.webm)', 'Видео (.webm)'), 'video/webm', setVideo, video)}
        {fileInput('mn.vtt', '.vtt,text/vtt', setMn, mn)}
        {fileInput('en.vtt', '.vtt,text/vtt', setEn, en)}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={upload}
          disabled={!video || !mn || !en || busy || !isFirebaseConfigured}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500 disabled:opacity-40"
        >
          <Upload className="h-4 w-4" aria-hidden="true" />
          {txt('Upload', 'Оруулах')}
        </button>
        {progress && (
          <span className="text-xs text-slate-300">
            {progress.done} / {progress.total}
          </span>
        )}
        {message && <span className="text-xs text-slate-200">{message}</span>}
      </div>
    </section>
  );
};
