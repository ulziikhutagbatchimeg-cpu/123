import React from 'react';

// The three holes of an arrangement of anions, from the given picture: tetrahedral, octahedral and cubic. Each hole has its own
// card, with its cation radius beneath. The tetrahedral card is animated: a ring spreads out of the hole and the four cations
// around it glow in turn. The motion stops for reduced motion.
const IMG_W = 1081; // the picture's width in pixels; each of its three panels is a third of it
const PANEL_W = IMG_W / 3;
const PANEL_H = 270; // the cube itself; the captions in the picture sit below it and are not shown
// The four cations of the tetrahedral hole, and the hole itself, in the picture's pixels
const CATIONS = [
  { x: 145, y: 158 },
  { x: 102, y: 198 },
  { x: 185, y: 200 },
  { x: 145, y: 240 }
];
const HOLE = { x: 144, y: 199 };

// A point in the first panel, as a place within the card
const place = (x: number, y: number) => ({
  left: `${((x / PANEL_W) * 100).toFixed(2)}%`,
  top: `${((y / PANEL_H) * 100).toFixed(2)}%`
});

const HOLES = [
  {
    key: 'tetra',
    offset: 0,
    nameMn: 'Тетраэдр хонгил',
    nameEn: 'Tetrahedral hole',
    ratioMn: 'Катионы радиус анионы радиусын 22.5–41.4%',
    ratioEn: 'Cation radius 22.5–41.4% of the anion radius'
  },
  {
    key: 'octa',
    offset: 1,
    nameMn: 'Октаэдр хонгил',
    nameEn: 'Octahedral hole',
    ratioMn: 'Катионы радиус анионы радиусын 41.4–73.2%',
    ratioEn: 'Cation radius 41.4–73.2% of the anion radius'
  },
  {
    key: 'cubic',
    offset: 2,
    nameMn: 'Куб хонгил',
    nameEn: 'Cubic hole',
    ratioMn: 'Катионы радиус анионы радиусын 73.2–100%',
    ratioEn: 'Cation radius 73.2–100% of the anion radius'
  }
];

export const LatticeHolesPicture: React.FC<{ mn: boolean; className?: string }> = ({ mn, className }) => (
  <div className={`flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible ${className ?? ''}`}>
    <style>{`
      .lh-halo, .lh-ring {
        position: absolute;
        border-radius: 9999px;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }
      .lh-halo { width: 9%; aspect-ratio: 1; border: 2px solid #a855f7; animation: lh-halo 2.4s ease-in-out infinite; }
      .lh-ring { width: 17%; aspect-ratio: 1; border: 2px dashed #a855f7; animation: lh-ring 2.4s ease-out infinite; }
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
    {HOLES.map(h => (
      <figure
        key={h.key}
        className="min-w-[78%] snap-center rounded-xl border border-slate-200 bg-white p-3 lg:min-w-0 dark:border-slate-800 dark:bg-slate-900"
      >
        {/* One panel of the picture: the picture is three times as wide as the card's panel, so it is shifted to show one panel */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${PANEL_W} / ${PANEL_H}` }}>
          <img
            src="lessons/lattice-holes.png"
            alt={mn ? h.nameMn : h.nameEn}
            className="absolute top-0 block h-auto max-w-none"
            style={{ width: '300%', left: `${-h.offset * 100}%` }}
          />
          {h.key === 'tetra' && (
            <>
              <span className="lh-ring" style={place(HOLE.x, HOLE.y)} aria-hidden="true" />
              {CATIONS.map((c, i) => (
                <span key={i} className="lh-halo" style={{ ...place(c.x, c.y), animationDelay: `${i * 0.6}s` }} aria-hidden="true" />
              ))}
            </>
          )}
        </div>
        <figcaption className="mt-3 space-y-1 text-center">
          <div className="text-sm font-extrabold text-slate-900 dark:text-white">{mn ? h.nameMn : h.nameEn}</div>
          <div className="text-xs font-semibold text-emerald-700 dark:text-teal-300">{mn ? h.ratioMn : h.ratioEn}</div>
        </figcaption>
      </figure>
    ))}
  </div>
);
