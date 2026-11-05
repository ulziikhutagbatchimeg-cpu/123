import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { loadTourMedia, type TourMedia } from '../lib/overviewVideo';

// The two-minute site tour, shown on the Dashboard after sign-in. The picture is in English.
// The explanation is a subtitle track: Монгол (shown first) or English, chosen with the buttons above the picture.
// The files are closed content in protected storage, so a student who is not approved cannot read them.
// The tour is folded away by default: the header stays, and the video loads only when it is opened.
const SUBTITLES = [
  { lang: 'mn', label: 'Монгол' },
  { lang: 'en', label: 'English' }
] as const;

type Subtitle = 'mn' | 'en' | 'off';

export const OverviewVideo: React.FC = () => {
  const { mode } = useLanguage();
  const { programme } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [subtitle, setSubtitle] = useState<Subtitle>('mn');
  const [media, setMedia] = useState<TourMedia | null>(null);
  const [failed, setFailed] = useState(false);

  // The 9701 programmes share one copy of the tour
  const course = programme === 'igcse' ? 'igcse' : 'alevel';

  // Load the files only once the tour is opened
  useEffect(() => {
    if (!open) return;
    let current = true;
    loadTourMedia(course)
      .then(loaded => { if (current) setMedia(loaded); })
      .catch(() => { if (current) setFailed(true); });
    return () => { current = false; };
  }, [course, open]);

  // Only one subtitle track is shown at a time; 'off' hides them all. Runs again when the video is mounted.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    Array.from(video.textTracks).forEach(track => {
      track.mode = track.language === subtitle ? 'showing' : 'hidden';
    });
  }, [subtitle, media, open]);

  // English only, Mongolian only, or both in Dual (English first, Mongolian beside it in a lighter tone)
  const txt = (en: string, mn: string) => {
    if (mode === 'en') return en;
    if (mode === 'mn') return mn;
    return (
      <>
        {en}
        <span className="ml-1.5 text-xs font-normal text-slate-500 dark:text-slate-400">({mn})</span>
      </>
    );
  };

  const options: { value: Subtitle; label: string }[] = [
    { value: 'mn', label: 'Монгол' },
    { value: 'en', label: 'English' },
    { value: 'off', label: mode === 'en' ? 'Off' : 'Унтраах' }
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen(value => !value)}
          aria-expanded={open}
          className="flex items-center gap-2 text-left"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {txt('Site tour · 2 minutes', 'Вэбийн танилцуулга · 2 минут')}
          </h2>
          {open
            ? <ChevronUp className="h-4 w-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
            : <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />}
          <span className="text-xs font-semibold text-emerald-700 dark:text-teal-300">
            {open ? txt('Fold', 'Хураах') : txt('Watch', 'Үзэх')}
          </span>
        </button>
        {open && (
          <div role="group" aria-label={mode === 'mn' ? 'Тайлбарын хэл' : 'Subtitle language'} className="flex flex-wrap gap-1.5">
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSubtitle(option.value)}
                aria-pressed={subtitle === option.value}
                className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                  subtitle === option.value
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-teal-500 dark:bg-teal-950/60 dark:text-teal-200'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="mt-3 space-y-3">
          {failed && (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {txt('The tour video is not available yet.', 'Танилцуулга видео одоогоор бэлэн биш байна.')}
            </p>
          )}
          {!failed && !media && <div className="aspect-video w-full rounded-xl bg-slate-200 dark:bg-slate-800" aria-hidden="true" />}

          {media && (
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              className="w-full rounded-xl bg-black"
              aria-label={mode === 'mn' ? 'Вэбийн танилцуулга бичлэг' : 'Website tour video'}
            >
              <source src={media.video} type="video/webm" />
              {SUBTITLES.map(track => (
                <track
                  key={track.lang}
                  kind="subtitles"
                  srcLang={track.lang}
                  label={track.label}
                  src={media.subtitles[track.lang]}
                  default={track.lang === 'mn'}
                />
              ))}
              {mode === 'mn' ? 'Таны хөтөч видеог дэмжихгүй байна.' : 'Your browser cannot play this video.'}
            </video>
          )}
        </div>
      )}
    </section>
  );
};
