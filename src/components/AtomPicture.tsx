import React from 'react';

// The atom, from the given picture: each electron moves a little around its place in the picture, and the nucleus glows. The
// electrons are drawn over the picture, where the picture's own dots were cleared. The motion stops for reduced motion.
const IMG_W = 602;
const IMG_H = 365;
// The ten electrons, and the nucleus, in the picture's pixels
const ELECTRONS = [
  { x: 207.7, y: 60.9 },
  { x: 153.4, y: 62.2 },
  { x: 83, y: 100 },
  { x: 299.4, y: 116.7 },
  { x: 58, y: 232 },
  { x: 74.5, y: 258.6 },
  { x: 254.6, y: 286.5 },
  { x: 121.7, y: 288.7 },
  { x: 299.9, y: 297.6 },
  { x: 272.7, y: 331.9 }
];
const NUCLEUS = { x: 178, y: 208 };

const place = (x: number, y: number) => ({
  left: `${((x / IMG_W) * 100).toFixed(2)}%`,
  top: `${((y / IMG_H) * 100).toFixed(2)}%`
});

const ATOM_CSS = `
  .at-electron, .at-nucleus {
    position: absolute;
    border-radius: 9999px;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .at-electron {
    width: 2.8%;
    aspect-ratio: 1;
    background: radial-gradient(circle at 35% 35%, #ffffff 0%, #7dd3fc 40%, #0ea5e9 80%);
    animation: at-orbit 2.8s linear infinite;
  }
  .at-nucleus {
    width: 8%;
    aspect-ratio: 1;
    border: 1.5px solid rgba(20, 184, 166, 0.8);
    animation: at-pulse 2.4s ease-in-out infinite;
  }
  @keyframes at-orbit {
    0% { transform: translate(-50%, -50%) translate(2.5px, 0); }
    25% { transform: translate(-50%, -50%) translate(0, 2.5px); }
    50% { transform: translate(-50%, -50%) translate(-2.5px, 0); }
    75% { transform: translate(-50%, -50%) translate(0, -2.5px); }
    100% { transform: translate(-50%, -50%) translate(2.5px, 0); }
  }
  @keyframes at-pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
    50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
  }
  @media (prefers-reduced-motion: reduce) {
    .at-electron, .at-nucleus { animation: none; }
  }
`;

export const AtomPicture: React.FC<{ mn: boolean; className?: string }> = ({ mn, className }) => (
  <div
    className={`relative overflow-hidden ${className ?? ''}`}
    style={{ aspectRatio: `${IMG_W} / ${IMG_H}` }}
    role="img"
    aria-label={mn ? 'Атом: электронууд цөмийн эргэн тойронд хөдөлж байна' : 'An atom: electrons moving around the nucleus'}
  >
    <style>{ATOM_CSS}</style>
    <img src="lessons/atom-structure.png" alt="" aria-hidden="true" className="block h-full w-full" />
    <span className="at-nucleus" style={place(NUCLEUS.x, NUCLEUS.y)} aria-hidden="true" />
    {ELECTRONS.map((e, i) => (
      <span key={i} className="at-electron" style={{ ...place(e.x, e.y), animationDelay: `${-(i * 0.28)}s` }} aria-hidden="true" />
    ))}
  </div>
);
