import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from 'lucide-react';
import { courseOf, deckTitle, partsKey, type SlidePart } from '../data/chapterSlides';
import { previewUrl } from '../lib/slidePreviews';

// A view-only slide show for students. Each click of the PowerPoint animation is one picture, so the student steps
// through the animations with Next, the arrow keys or a swipe. The full-screen mode covers the page, so the slide fills
// the screen and the topic list is out of the way. The .pptx file is never linked here. The pictures and manifest.json
// come from public/slides (see slidePreviews.ts). The keys work while the viewer has focus, so several viewers can share a page.

type Manifest = { deck: string; slides: Array<{ slide: number; steps: number }> };
type Frame = { part: SlidePart; slide: number; step: number };

const pad = (n: number) => String(n).padStart(2, '0');

const folderOf = (part: SlidePart) => part.deck.file.replace(/\.pptx$/, '');
const manifestOf = (part: SlidePart) => previewUrl(courseOf(part.deck), folderOf(part), 'manifest.json');

// The parts are the slides to show, in order. Each part is a run of slides of one deck.
export const SlideViewer: React.FC<{ parts: SlidePart[]; mn: boolean; onClose?: () => void }> = ({ parts, mn, onClose }) => {
  // Parts are compared by their text, so a new array with the same slides does not reload the pictures
  const key = partsKey(parts);
  const [frames, setFrames] = useState<Frame[] | null>(null);
  const [notReady, setNotReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Reads the picture list of each deck: one frame per click step of every slide in the parts
  useEffect(() => {
    let cancelled = false;
    const urls = [...new Set(parts.map(manifestOf))];
    Promise.all(
      urls.map(url =>
        fetch(url)
          .then(r => {
            if (!r.ok) throw new Error('not uploaded');
            return r.json() as Promise<Manifest>;
          })
          .then(m => [url, m] as const)
      )
    )
      .then(loaded => {
        if (cancelled) return;
        const manifests = new Map(loaded);
        const list: Frame[] = [];
        for (const part of parts) {
          for (const s of manifests.get(manifestOf(part))?.slides ?? []) {
            if (s.slide < part.from || s.slide > part.to) continue;
            for (let step = 0; step < s.steps; step++) list.push({ part, slide: s.slide, step });
          }
        }
        setFrames(list);
      })
      .catch(() => {
        if (!cancelled) setNotReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  // Leaving full screen puts the focus back on the viewer, so the keys keep working there
  useEffect(() => {
    if (fullscreen) rootRef.current?.focus();
  }, [fullscreen]);

  const total = frames?.length ?? 0;
  const current = frames?.[index];
  const frameUrl = (f: Frame) => previewUrl(courseOf(f.part.deck), folderOf(f.part), `${pad(f.slide)}-${pad(f.step)}.jpg`);

  const go = (next: number) => {
    const clamped = Math.min(Math.max(next, 0), total - 1);
    if (clamped === index) return;
    setImageFailed(false);
    setIndex(clamped);
  };

  // Keys work while the viewer has focus: a click inside it focuses it (tabIndex -1)
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && e.target === e.currentTarget)) {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(index - 1);
    else if (e.key === 'Escape') {
      if (fullscreen) setFullscreen(false);
      else onClose?.();
    }
  };

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
          ? 'Энэ слайд show ачаалж чадсангүй. Нэвтэрсэн эсэхээ шалгана уу, эсвэл багш зургийг байршуулаагүй байж магадгүй.'
          : 'This slide show could not be loaded. Check that you are signed in, or the teacher may not have uploaded the pictures yet.'}
      </div>
    );
  }

  if (frames && frames.length === 0) {
    return <div className="p-4 text-xs text-slate-600 dark:text-slate-300">{mn ? 'Энэ хэсэгт слайд байхгүй.' : 'No slides in this part.'}</div>;
  }

  if (!frames || !current) {
    return <div className="p-4 text-xs text-slate-600 dark:text-slate-300">{mn ? 'Ачаалж байна…' : 'Loading…'}</div>;
  }

  // In full screen the page is dark and the text light; in the page the viewer keeps the page's own colours
  const ink = fullscreen ? 'text-white' : 'text-slate-900 dark:text-white';
  const muted = fullscreen ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300';
  const ghost = fullscreen
    ? 'border-slate-600 text-slate-100 hover:bg-slate-800'
    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200';
  const track = fullscreen ? 'bg-slate-700' : 'bg-slate-200 dark:bg-slate-800';
  const shell = fullscreen
    ? 'fixed inset-0 z-[70] bg-slate-950 p-3 sm:p-6 flex flex-col gap-3'
    : 'space-y-3 p-3 sm:p-4 rounded-2xl border border-violet-200 dark:border-violet-900 bg-violet-50/40 dark:bg-slate-950';
  const stage = fullscreen
    ? 'relative flex-1 min-h-0 bg-white rounded-xl overflow-hidden'
    : 'relative bg-white rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-video';

  return (
    <div ref={rootRef} tabIndex={-1} onKeyDown={onKeyDown} className={`${shell} outline-none`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className={`text-xs font-bold ${ink}`}>
          {current.part.deck.deckNo} · {deckTitle(current.part.deck, mn)}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className={`text-[11px] font-bold ${muted}`}>
            {mn ? 'Слайд' : 'Slide'} {current.slide} · {index + 1} / {total}
          </span>
          <button
            onClick={() => setFullscreen(f => !f)}
            aria-label={fullscreen ? (mn ? 'Жижиг горим' : 'Exit full screen') : mn ? 'Бүтэн дэлгэц' : 'Full screen'}
            title={fullscreen ? (mn ? 'Жижиг горим (Esc)' : 'Exit full screen (Esc)') : mn ? 'Бүтэн дэлгэц' : 'Full screen'}
            className={`p-1.5 rounded-lg border ${ghost}`}
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" aria-hidden /> : <Maximize2 className="w-3.5 h-3.5" aria-hidden />}
          </button>
          {onClose && (
            <button onClick={onClose} aria-label={mn ? 'Хаах' : 'Close'} className={`p-1.5 rounded-lg border ${ghost}`}>
              <X className="w-3.5 h-3.5" aria-hidden />
            </button>
          )}
        </div>
      </div>

      <div
        className={stage}
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
            alt={`${deckTitle(current.part.deck, mn)}: ${current.slide}`}
            onError={() => setImageFailed(true)}
            draggable={false}
            className={`absolute inset-0 w-full h-full object-contain select-none transition-opacity duration-500 ${shown ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>

      <div className={`h-1 rounded-full overflow-hidden ${track}`}>
        <div className="h-full bg-violet-600 transition-all duration-500" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl border text-xs font-bold disabled:opacity-40 ${ghost}`}
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
