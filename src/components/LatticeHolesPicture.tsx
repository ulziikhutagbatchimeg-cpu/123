import React from 'react';

// The picture of the holes in an arrangement of anions, as the lesson gives it. The tetrahedral hole is the one animated: a ring
// spreads out of its centre and the four cations around it glow in turn. The motion stops for reduced motion.
const IMG_W = 1081;
const IMG_H = 367;
// The four cations of the tetrahedral hole, and the hole itself, in the picture's pixels
const CATIONS = [
  { x: 145, y: 158 },
  { x: 102, y: 198 },
  { x: 185, y: 200 },
  { x: 145, y: 240 }
];
const HOLE = { x: 144, y: 199 };

const place = (x: number, y: number) => ({
  left: `${((x / IMG_W) * 100).toFixed(2)}%`,
  top: `${((y / IMG_H) * 100).toFixed(2)}%`
});

export const LatticeHolesPicture: React.FC<{ mn: boolean; className?: string }> = ({ mn, className }) => (
  <figure className={className}>
    <style>{`
      .lh-halo, .lh-ring {
        position: absolute;
        border-radius: 9999px;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }
      .lh-halo { width: 5%; aspect-ratio: 1; border: 2px solid #a855f7; animation: lh-halo 2.4s ease-in-out infinite; }
      .lh-ring { width: 9%; aspect-ratio: 1; border: 2px dashed #a855f7; animation: lh-ring 2.4s ease-out infinite; }
      @keyframes lh-halo {
        0%, 100% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.45; }
        50% { transform: translate(-50%, -50%) scale(1.25); opacity: 1; }
      }
      @keyframes lh-ring {
        0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.9; }
        100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .lh-halo, .lh-ring { animation: none; }
      }
    `}</style>
    <div className="relative">
      <img
        src="lessons/lattice-holes.png"
        alt={mn ? 'Хонгилийн гурван төрөл: тетраэдр, октаэдр, куб' : 'Three hole types: tetrahedral, octahedral and cubic'}
        className="block h-auto w-full"
      />
      <span className="lh-ring" style={place(HOLE.x, HOLE.y)} aria-hidden="true" />
      {CATIONS.map((c, i) => (
        <span key={i} className="lh-halo" style={{ ...place(c.x, c.y), animationDelay: `${i * 0.6}s` }} aria-hidden="true" />
      ))}
    </div>
    <figcaption className="mt-2 text-center text-xs font-semibold text-slate-600 dark:text-slate-300">
      {mn ? 'Тетраэдр хонгилыг тодруулав' : 'The tetrahedral hole, highlighted'}
    </figcaption>
  </figure>
);
