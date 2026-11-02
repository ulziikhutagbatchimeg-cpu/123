import React from 'react';

// The three holes of an arrangement of anions, from the given picture: tetrahedral, octahedral and cubic. Each hole has its own
// card, with its cation radius beneath. The tetrahedral hole is the animated one: a ring spreads out of it and the four cations
// around it glow in turn. The motion stops for reduced motion. On its own, the tetrahedral panel can also be shown as a picture
// for a next-step card.
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

// A point in the first panel, as a place within the panel
const place = (x: number, y: number) => ({
  left: `${((x / PANEL_W) * 100).toFixed(2)}%`,
  top: `${((y / PANEL_H) * 100).toFixed(2)}%`
});

const HOLES = [
  {
    key: 'tetra' as const,
    offset: 0,
    nameMn: 'Тетраэдр хонгил',
    nameEn: 'Tetrahedral hole',
    ratioMn: 'Катионы радиус анионы радиусын 22.5–41.4% орчим',
    ratioEn: 'Cation radius is about 22.5 to 41.4% of the anion radius'
  },
  {
    key: 'octa' as const,
    offset: 1,
    nameMn: 'Октаэдр хонгил',
    nameEn: 'Octahedral hole',
    ratioMn: 'Катионы радиус анионы радиусын 41.4–73.2% орчим',
    ratioEn: 'Cation radius is about 41.4 to 73.2% of the anion radius'
  },
  {
    key: 'cubic' as const,
    offset: 2,
    nameMn: 'Куб хонгил',
    nameEn: 'Cubic hole',
    ratioMn: 'Катионы радиус анионы радиусын 73.2–100% орчим',
    ratioEn: 'Cation radius is about 73.2 to 100% of the anion radius'
  }
];

type Hole = (typeof HOLES)[number];

const HALO_CSS = `
  .lh-halo, .lh-ring {
    position: absolute;
    border-radius: 9999px;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .lh-halo {
    width: 11%;
    aspect-ratio: 1;
    border: 2.5px solid #9333ea;
    background: rgba(168, 85, 247, 0.14);
    box-shadow: 0 0 8px rgba(168, 85, 247, 0.6);
    animation: lh-halo 1.6s ease-in-out infinite;
  }
  .lh-ring { width: 22%; aspect-ratio: 1; border: 2px dashed #a855f7; animation: lh-ring 1.8s ease-out infinite; }
  @keyframes lh-halo {
    0%, 100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.35); opacity: 1; }
  }
  @keyframes lh-ring {
    0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .lh-halo, .lh-ring { animation: none; }
  }
`;

// One panel of the picture: the picture is three times as wide as the panel, so it is shifted left to show that panel
const panelContent = (h: Hole, mn: boolean) => (
  <>
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
          <span key={i} className="lh-halo" style={{ ...place(c.x, c.y), animationDelay: `${i * 0.4}s` }} aria-hidden="true" />
        ))}
      </>
    )}
  </>
);

export const LatticeHolesPicture: React.FC<{ mn: boolean; className?: string; only?: 'tetra' }> = ({ mn, className, only }) => {
  if (only) {
    const h = HOLES.find(x => x.key === only) ?? HOLES[0];
    return (
      <figure className="flex w-full flex-col items-center gap-2">
        <div className={`relative overflow-hidden ${className ?? ''}`} style={{ aspectRatio: `${PANEL_W} / ${PANEL_H}` }}>
          <style>{HALO_CSS}</style>
          {panelContent(h, mn)}
        </div>
        <figcaption className="space-y-0.5 text-center">
          <div className="text-xs font-extrabold text-slate-900 dark:text-white">{mn ? h.nameMn : h.nameEn}</div>
          <div className="text-[11px] font-semibold text-emerald-700 dark:text-teal-300">{mn ? h.ratioMn : h.ratioEn}</div>
        </figcaption>
      </figure>
    );
  }
  return (
    <div
      className={`flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible ${className ?? ''}`}
    >
      <style>{HALO_CSS}</style>
      {HOLES.map(h => (
        <figure
          key={h.key}
          className="min-w-[78%] snap-center rounded-xl border border-slate-200 bg-white p-3 lg:min-w-0 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${PANEL_W} / ${PANEL_H}` }}>
            {panelContent(h, mn)}
          </div>
          <figcaption className="mt-3 space-y-1 text-center">
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">{mn ? h.nameMn : h.nameEn}</div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-teal-300">{mn ? h.ratioMn : h.ratioEn}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};
