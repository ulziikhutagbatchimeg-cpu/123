import React from 'react';
import { ArrowUp, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import type { Topic } from '../types/chemistry';

// A bar fixed to the bottom of the screen on the Lessons page: previous topic, where the student is, next topic and
// back to the top. It is always in reach, so changing topic never needs a scroll back up to the topic list.
export const TopicNavBar: React.FC<{
  prev?: Topic;
  next?: Topic;
  nextLocked: boolean;
  position: number;
  total: number;
  mn: boolean;
  onOpen: (id: string) => void;
  onTop: () => void;
}> = ({ prev, next, nextLocked, position, total, mn, onOpen, onTop }) => {
  const title = (t?: Topic) => (t ? (mn ? t.titleMn : t.titleEn) : '');
  const side =
    'flex items-center gap-1.5 min-w-0 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <nav
      aria-label={mn ? 'Сэдэв солих' : 'Topic navigation'}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] max-w-2xl flex items-center gap-1.5 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-lg"
    >
      <button
        onClick={() => prev && onOpen(prev.id)}
        disabled={!prev}
        title={prev ? title(prev) : undefined}
        className={`${side} flex-1 justify-start bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100`}
      >
        <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden />
        <span className="flex flex-col items-start min-w-0">
          <span>{mn ? 'Өмнөх' : 'Previous'}</span>
          <span className="hidden sm:block max-w-full truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">{title(prev)}</span>
        </span>
      </button>

      <button
        onClick={onTop}
        aria-label={mn ? 'Дээш буцах' : 'Back to top'}
        title={mn ? 'Дээш буцах' : 'Back to top'}
        className="shrink-0 flex flex-col items-center px-2.5 py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <ArrowUp className="w-4 h-4" aria-hidden />
        <span className="text-[10px] font-mono font-bold">
          {position}/{total}
        </span>
      </button>

      <button
        onClick={() => next && !nextLocked && onOpen(next.id)}
        disabled={!next || nextLocked}
        title={next ? (nextLocked ? (mn ? 'Өмнөх сэдвийг эхлээд дуусга' : 'Pass this topic first') : title(next)) : undefined}
        className={`${side} flex-1 justify-end bg-emerald-600 hover:bg-emerald-700 text-white`}
      >
        <span className="flex flex-col items-end min-w-0">
          <span>{mn ? 'Дараагийн' : 'Next'}</span>
          <span className="hidden sm:block max-w-full truncate text-[10px] font-medium text-emerald-100">{title(next)}</span>
        </span>
        {nextLocked ? <Lock className="w-4 h-4 shrink-0" aria-hidden /> : <ChevronRight className="w-4 h-4 shrink-0" aria-hidden />}
      </button>
    </nav>
  );
};
