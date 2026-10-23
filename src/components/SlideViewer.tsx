import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { SlideDeck } from '../data/chapterSlides';

// A view-only slide show for students. Each click of the PowerPoint animation is one picture, so the student steps
// through the animations with Next, the arrow keys or a swipe. The .pptx file is never linked here. The pictures and
// manifest.json come from scripts/render-slides.ps1.
const PREVIEW_DIR = `${import.meta.env.BASE_URL}slides/igcse-0620/previews/`;

type Manifest = { deck: string; slides: Array<{ slide: number; steps: number }> };
type Frame = { slide: number; step: number };

const pad = (n: number) => String(n).padStart(2, '0');

export const SlideViewer: React.FC<{ deck: SlideDeck; mn: boolean; onClose: () => void }> = ({ deck, mn, onClose }) => {
  const folder = deck.file.replace(/\.pptx$/, '');
  const [frames, setFrames] = useState<Frame[] | null>(null);
  const [notReady, setNotReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);

  // Reads the picture list of the deck: one frame per click step of every slide
  useEffect(() => {
    let cancelled = false;
    fetch(`${PREVIEW_DIR}${folder}/manifest.json`)
      .then(r => {
        if (!r.ok) throw new Error('not rendered');
        return r.json() as Promise<Manifest>;
      })
      .then(m => {
        if (cancelled) return;
        const list: Frame[] = [];
        for (const s of m.slides) {
          for (let step = 0; step < s.steps; step++) list.push({ slide: s.slide, step });
        }
        setFrames(list);
      })
      .catch(() => {
        if (!cancelled) setNotReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [folder]);

  const total = frames?.length ?? 0;
  const current = frames?.[index];
  const frameUrl = (f: Frame) => `${PREVIEW_DIR}${folder}/${pad(f.slide)}-${pad(f.step)}.jpg`;

  const go = (next: number) => {
    const clamped = Math.min(Math.max(next, 0), total - 1);
    if (clamped === index) return;
    setImageFailed(false);
    setIndex(clamped);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') go(index + 1);
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(index - 1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Load the next picture in the background so the change is quick
  useEffect(() => {
    if (frames && index + 1 < frames.length) {
      const next = new Image();
      next.src = frameUrl(frames[index + 1]);
    }
  }, [index, frames]);

  // Fades each picture in once it is on the page (a cached picture may not fire onLoad, so this does not wait for it)
  useEffect(() => {
    setShown(false);
    const id = window.setTimeout(() => setShown(true), 30);
    return () => window.clearTimeout(id);
  }, [index]);

  if (notReady) {
    return (
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
        {mn
          ? 'Энэ слайд show бэлтгэгдээгүй байна. Багш scripts/render-slides.ps1-ийг ажиллуулна.'
          : 'This slide show is not ready yet. The teacher runs scripts/render-slides.ps1.'}
      </div>
    );
  }

  if (!frames || !current) {
    return <div className="p-4 text-xs text-slate-600 dark:text-slate-300">{mn ? 'Ачаалж байна…' : 'Loading…'}</div>;
  }

  return (
    <div className="space-y-3 p-3 sm:p-4 rounded-2xl border border-violet-200 dark:border-violet-900 bg-violet-50/40 dark:bg-slate-950">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-bold text-slate-900 dark:text-white">
          {deck.deckNo} · {deck.titleEn}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
            {mn ? 'Слайд' : 'Slide'} {current.slide} · {index + 1} / {total}
          </span>
          <button
            onClick={onClose}
            aria-label={mn ? 'Хаах' : 'Close'}
            className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
          >
            <X className="w-3.5 h-3.5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        className="relative bg-white rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-video"
        onTouchStart={e => setTouchX(e.touches[0].clientX)}
        onTouchEnd={e => {
          if (touchX === null) return;
          const dx = e.changedTouches[0].clientX - touchX;
          if (dx < -40) go(index + 1);
          else if (dx > 40) go(index - 1);
          setTouchX(null);
        }}
      >
        {imageFailed ? (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-xs text-slate-600">
            {mn ? 'Энэ зургийг ачаалж чадсангүй.' : 'This picture could not be loaded.'}
          </div>
        ) : (
          <img
            key={index}
            src={frameUrl(current)}
            alt={`${deck.titleEn}: ${current.slide}`}
            onError={() => setImageFailed(true)}
            draggable={false}
            className={`w-full h-full object-contain select-none transition-opacity duration-500 ${shown ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>

      <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div className="h-full bg-violet-600 transition-all duration-500" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden />
          {mn ? 'Өмнөх' : 'Previous'}
        </button>
        <button
          onClick={() => go(index + 1)}
          disabled={index >= total - 1}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-xs font-black"
        >
          {mn ? 'Дараах' : 'Next'}
          <ChevronRight className="w-4 h-4" aria-hidden />
        </button>
      </div>
    </div>
  );
};
