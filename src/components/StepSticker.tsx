import React from 'react';

// A yellow star sticker beside each lesson step, with the step number on it. The same sticker appears in every lesson, so a
// student sees the same mark at the start of each step. It is decoration with the number, so screen readers skip it.
export const StepSticker: React.FC<{ step: number }> = ({ step }) => (
  <span aria-hidden="true" className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center drop-shadow-md">
    <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="step-sticker-star" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>
      <path
        d="M32 3 L40 22 L60 24 L44 37 L49 58 L32 46 L15 58 L20 37 L4 24 L24 22 Z"
        fill="url(#step-sticker-star)"
        stroke="#a16207"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
    <span className="relative pt-1 text-sm font-black text-amber-900">{step}</span>
  </span>
);
