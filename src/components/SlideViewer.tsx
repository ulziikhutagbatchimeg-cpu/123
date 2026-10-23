import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { SlideDeck } from '../data/chapterSlides';

// A view-only slide player for students. It shows the slide pictures in order, with a fade between slides, arrow keys
// and swipes. The .pptx file is never linked here. The pictures come from scripts/render-slides.ps1.
const PREVIEW_DIR = `${import.meta.env.BASE_URL}slides/igcse-0620/previews/`;

export const SlideViewer: React.FC<{ deck: SlideDeck; mn: boolean; onClose: () => void }> = ({ deck, mn, onClose }) => {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);

  const folder = deck.file.replace(/\.pptx$/, '');
  const slideUrl = (i: number) => `${PREVIEW_DIR}${folder}/${String(i + 1).padStart(2, '0')}.jpg`;

  const go = (next: number) => {
    const clamped = Math.min(Math.max(next, 0), deck.slides - 1);
    if (clamped === index) return;
    setLoaded(false);
    setFailed(false);
    setIndex(clamped);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go(index + 1);
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(index - 1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Load the next slide in the background so the change is quick
  useEffect(() => {
    if (index + 1 < deck.slides) {
      const next = new Image();
      next.src = slideUrl(index + 1);
    }
  }, [index, deck]);

  return (
    <div className="space-y-3 p-3 sm:p-4 rounded-2xl border border-violet-200 dark:border-violet-900 bg-violet-50/40 dark:bg-slate-950">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-bold text-slate-900 dark:text-white">
          {deck.deckNo} · {deck.titleEn}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
            {index + 1} / {deck.slides}
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
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-xs text-slate-600">
            {mn
              ? 'Энэ слайдын зураг бэлтгэгдээгүй байна. Багш scripts/render-slides.ps1-ийг ажиллуулна.'
              : 'This slide picture is not ready yet. The teacher runs scripts/render-slides.ps1.'}
          </div>
        ) : (
          <img
            key={index}
            src={slideUrl(index)}
            alt={`${deck.titleEn}: ${index + 1}`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            draggable={false}
            className={`w-full h-full object-contain select-none transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>

      <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div className="h-full bg-violet-600 transition-all duration-500" style={{ width: `${((index + 1) / deck.slides) * 100}%` }} />
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
          disabled={index >= deck.slides - 1}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-xs font-black"
        >
          {mn ? 'Дараах' : 'Next'}
          <ChevronRight className="w-4 h-4" aria-hidden />
        </button>
      </div>
    </div>
  );
};
