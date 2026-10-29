import React, { useEffect, useState } from 'react';

// A short celebration when a student passes a lesson's exit ticket: a burst of confetti and a "well done" card, then it goes.
// For anyone who asks the system for less motion, only the card shows and the confetti is left out.
const COLOURS = ['#8b5cf6', '#f59e0b', '#10b981', '#f43f5e', '#0ea5e9'];
const PIECES = Array.from({ length: 30 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 7) * 0.12,
  colour: COLOURS[i % COLOURS.length],
  size: 7 + (i % 4) * 3,
  drift: ((i % 5) - 2) * 36
}));

const SHOW_FOR_MS = 3200;

export const LessonCelebration: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), SHOW_FOR_MS);
    return () => window.clearTimeout(timer);
  }, []);
  if (!show) return null;

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="confetti-piece absolute top-0 block rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.6,
            background: p.colour,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`
          }}
        />
      ))}
      <div className="absolute inset-x-0 top-1/3 flex justify-center px-4">
        <div className="celebrate-pop rounded-3xl border border-amber-200 bg-white px-8 py-5 text-center shadow-2xl dark:border-slate-700 dark:bg-slate-900">
          <div className="text-5xl" aria-hidden="true">🎉</div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{mn ? 'Баяр хүргэе!' : 'Well done!'}</div>
          <div className="mt-1 text-base font-bold text-slate-600 dark:text-slate-300">
            {mn ? 'Хичээлийг амжилттай дуусгалаа.' : 'You passed this lesson.'}
          </div>
        </div>
      </div>
    </div>
  );
};
