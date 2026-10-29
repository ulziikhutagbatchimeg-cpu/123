import React from 'react';

// Small science stickers that float at the edges of a Scientific Inquiry lesson. They are decoration only: they do not
// take clicks, they sit at the sides so the lesson text stays clear, and they stand still when the student asks for less motion.
const STICKERS: { emoji: string; top?: string; bottom?: string; left?: string; right?: string; delay: string; tilt: string }[] = [
  { emoji: '🧪', top: '2%', left: '0.5%', delay: '0s', tilt: '-8deg' },
  { emoji: '⚛️', top: '14%', right: '0.5%', delay: '1.2s', tilt: '6deg' },
  { emoji: '🔬', top: '46%', left: '0.5%', delay: '2.4s', tilt: '4deg' },
  { emoji: '🧲', top: '62%', right: '0.5%', delay: '0.6s', tilt: '-6deg' },
  { emoji: '⭐', bottom: '14%', left: '0.5%', delay: '1.8s', tilt: '10deg' },
  { emoji: '💡', bottom: '2%', right: '0.5%', delay: '3s', tilt: '-4deg' }
];

export const InquiryStickers: React.FC = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
    {STICKERS.map((s, i) => (
      <span
        key={i}
        className="inquiry-float absolute flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/90 text-2xl shadow-md dark:border-slate-700 dark:bg-slate-800/90"
        style={{
          top: s.top,
          bottom: s.bottom,
          left: s.left,
          right: s.right,
          animationDelay: s.delay,
          ['--tilt' as string]: s.tilt
        }}
      >
        {s.emoji}
      </span>
    ))}
  </div>
);
