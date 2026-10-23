import React, { useState } from 'react';
import { CHAPTER_SLIDES, type SlideDeck } from '../data/chapterSlides';
import { isTeacher, signInTeacher, signOutUser, useAuthUser } from '../lib/cloud';
import { isFirebaseConfigured } from '../lib/firebase';
import { SlideViewer } from './SlideViewer';

// The PowerPoint decks of the current chapter. Everyone gets the slide show. The .pptx download is only shown to the
// teacher, after signing in with the teacher account.
const SLIDE_DIR = `${import.meta.env.BASE_URL}slides/igcse-0620/`;

const DeckRow: React.FC<{ deck: SlideDeck; mn: boolean; teacher: boolean; open: boolean; onToggle: () => void }> = ({
  deck,
  mn,
  teacher,
  open,
  onToggle
}) => (
  <li className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-2 py-0.5 rounded-lg bg-violet-100 dark:bg-violet-900/50 text-[11px] font-black text-violet-800 dark:text-violet-200">
          {deck.deckNo}
        </span>
        <span className="text-sm font-bold text-slate-900 dark:text-white">{deck.titleEn}</span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">{mn ? `${deck.slides} слайд` : `${deck.slides} slides`}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={onToggle} className="text-xs font-bold text-violet-700 dark:text-violet-300 hover:underline">
          {open ? (mn ? 'Slide show хаах' : 'Close slide show') : mn ? 'Slide show үзэх' : 'Open slide show'}
        </button>
        {teacher && (
          <a
            href={SLIDE_DIR + encodeURIComponent(deck.file)}
            download
            className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline"
          >
            {mn ? 'Татах (.pptx, засах боломжтой)' : 'Download (.pptx, editable)'}
          </a>
        )}
      </div>
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
    {open && <SlideViewer deck={deck} mn={mn} onClose={onToggle} />}
  </li>
);

export const ChapterSlides: React.FC<{ chapterId: string; mn: boolean }> = ({ chapterId, mn }) => {
  const { user, ready } = useAuthUser();
  const teacher = isTeacher(user);
  const [openFile, setOpenFile] = useState<string | null>(null);
  const [signing, setSigning] = useState(false);
  const [signError, setSignError] = useState<string | null>(null);
  const decks = CHAPTER_SLIDES[chapterId];
  if (!decks) return null;

  // Signs in with Google and checks the account. Any other account is signed out again.
  const signIn = async () => {
    setSigning(true);
    setSignError(null);
    try {
      const result = await signInTeacher();
      if (!isTeacher(result.user)) {
        await signOutUser();
        setSignError(mn ? 'Энэ данс багшийн данс биш байна.' : 'This is not the teacher account.');
      }
    } catch {
      setSignError(mn ? 'Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.' : 'Sign-in failed. Please try again.');
    } finally {
      setSigning(false);
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
          {mn ? 'PowerPoint слайд' : 'PowerPoint slides'}
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400">
          {mn
            ? 'Слайдууд англи хэлээр бэлтгэгдсэн. Slide show-оор дараалан үзнэ.'
            : 'The slides are in English. Watch them in order as a slide show.'}
        </p>
        {teacher ? (
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
            <span>
              {mn
                ? 'Багшийн данс: .pptx-ийг татаж PowerPoint-оор засна. Засварын дараа scripts/render-slides.ps1-ийг ажиллуулна.'
                : 'Teacher account: download the .pptx, edit it in PowerPoint, then run scripts/render-slides.ps1.'}
            </span>
            <button
              onClick={() => signOutUser().catch(() => undefined)}
              className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            >
              {mn ? 'Гарах' : 'Sign out'}
            </button>
          </div>
        ) : (
          ready &&
          isFirebaseConfigured && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                {mn
                  ? 'Татах бол багшийн дансаар нэвтэрнэ үү.'
                  : 'To download a deck, sign in with the teacher account.'}
              </span>
              <button
                onClick={signIn}
                disabled={signing}
                className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-[11px] font-black"
              >
                {mn ? 'Багшийн дансаар нэвтрэх' : 'Sign in as teacher'}
              </button>
              {signError && <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">{signError}</span>}
            </div>
          )
        )}
      </div>
      <ul className="space-y-2">
        {decks.map(deck => (
          <DeckRow
            key={deck.file}
            deck={deck}
            mn={mn}
            teacher={teacher}
            open={openFile === deck.file}
            onToggle={() => setOpenFile(prev => (prev === deck.file ? null : deck.file))}
          />
        ))}
      </ul>
    </section>
  );
};
