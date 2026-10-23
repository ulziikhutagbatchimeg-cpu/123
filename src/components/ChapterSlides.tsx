import React from 'react';
import { CHAPTER_SLIDES, type SlideDeck } from '../data/chapterSlides';

// The PowerPoint decks of the current chapter. Each deck downloads from public/slides/igcse-0620/ and opens in PowerPoint.
const SLIDE_DIR = `${import.meta.env.BASE_URL}slides/igcse-0620/`;

const DeckRow: React.FC<{ deck: SlideDeck; mn: boolean }> = ({ deck, mn }) => (
  <li className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-2 py-0.5 rounded-lg bg-violet-100 dark:bg-violet-900/50 text-[11px] font-black text-violet-800 dark:text-violet-200">
          {deck.deckNo}
        </span>
        <span className="text-sm font-bold text-slate-900 dark:text-white">{deck.titleEn}</span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">{mn ? `${deck.slides} слайд` : `${deck.slides} slides`}</span>
      </div>
      <a
        href={SLIDE_DIR + encodeURIComponent(deck.file)}
        download
        className="text-xs font-bold text-violet-700 dark:text-violet-300 hover:underline"
      >
        {mn ? 'Татах (.pptx)' : 'Download (.pptx)'}
      </a>
    </div>
    {deck.lessonSlides && (
      <div className="flex flex-wrap gap-1.5">
        {deck.lessonSlides.map(l => (
          <span
            key={l.lesson}
            className="px-2 py-0.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-[11px] font-bold text-emerald-800 dark:text-emerald-300"
          >
            {mn ? `Хичээл ${l.lesson}: слайд ${l.from}–${l.to}` : `Lesson ${l.lesson}: slides ${l.from}–${l.to}`}
          </span>
        ))}
      </div>
    )}
  </li>
);

export const ChapterSlides: React.FC<{ chapterId: string; mn: boolean }> = ({ chapterId, mn }) => {
  const decks = CHAPTER_SLIDES[chapterId];
  if (!decks) return null;
  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="space-y-1">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
          {mn ? 'PowerPoint слайд' : 'PowerPoint slides'}
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400">
          {mn
            ? 'Слайдууд англи хэлээр бэлтгэгдсэн. Татаж аваад PowerPoint-оор нээнэ.'
            : 'The slides are in English. Download a deck and open it in PowerPoint.'}
        </p>
      </div>
      <ul className="space-y-2">
        {decks.map(deck => (
          <DeckRow key={deck.file} deck={deck} mn={mn} />
        ))}
      </ul>
    </section>
  );
};
