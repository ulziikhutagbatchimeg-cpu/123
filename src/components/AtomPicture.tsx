import React from 'react';

// The atom, from the given picture. Its margins are cropped away, so the atom is larger in the same space. The electrons turn
// about the nucleus, all the same way: the closest turn fastest, as in the Bohr model. The nucleus stays still. The names of the
// three particles are shown beneath, in the colours of the picture. The motion stops for reduced motion.
const IMG_W = 602;
const IMG_H = 365;
// The part of the picture that is shown: the atom and its inset, without the margins
const CROP = { x: 18, y: 22, w: 566, h: 322 };
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

// The distance of an electron from the nucleus, in the picture's pixels
const distance = (e: { x: number; y: number }) => Math.hypot(e.x - NUCLEUS.x, e.y - NUCLEUS.y);
const CLOSEST = Math.min(...ELECTRONS.map(distance));
// The closest electron takes this many seconds for one turn; an electron further out takes longer in proportion to its distance
const FASTEST_TURN = 2;

// The three particles, as the picture colours them
const PARTICLES = [
  {
    en: 'Electron (−)',
    mn: 'Электрон (−)',
    dot: '#0ea5e9',
    cls: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
  },
  {
    en: 'Proton (+)',
    mn: 'Протон (+)',
    dot: '#dc2626',
    cls: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
  },
  {
    en: 'Neutron (0)',
    mn: 'Нейтрон (0)',
    dot: '#14b8a6',
    cls: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
  }
];

// A point of the picture, as a place within the shown part
const place = (x: number, y: number) => ({
  left: `${(((x - CROP.x) / CROP.w) * 100).toFixed(2)}%`,
  top: `${(((y - CROP.y) / CROP.h) * 100).toFixed(2)}%`
});

const ATOM_CSS = `
  .at-turn, .at-electron, .at-nucleus {
    position: absolute;
    pointer-events: none;
  }
  .at-turn {
    inset: 0;
    animation: at-spin linear infinite;
  }
  .at-electron, .at-nucleus {
    border-radius: 9999px;
    transform: translate(-50%, -50%);
  }
  .at-electron {
    width: 3%;
    aspect-ratio: 1;
    background: radial-gradient(circle at 35% 35%, #ffffff 0%, #7dd3fc 40%, #0ea5e9 80%);
    box-shadow: 0 0 4px rgba(14, 165, 233, 0.45);
  }
  .at-nucleus {
    width: 9%;
    aspect-ratio: 1;
    border: 1.5px solid rgba(20, 184, 166, 0.85);
  }
  @keyframes at-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .at-turn { animation: none; }
  }
`;

export const AtomPicture: React.FC<{ mn: boolean; className?: string }> = ({ mn, className }) => {
  const origin = place(NUCLEUS.x, NUCLEUS.y);
  return (
    <figure className="flex w-full flex-col items-center gap-2">
      <div
        className={`relative overflow-hidden ${className ?? ''}`}
        style={{ aspectRatio: `${CROP.w} / ${CROP.h}` }}
        role="img"
        aria-label={mn ? 'Атом: электронууд цөмийн эргэн тойронд хөдөлж байна' : 'An atom: electrons moving around the nucleus'}
      >
        <style>{ATOM_CSS}</style>
        {/* The whole picture, shifted so that only the cropped part shows */}
        <img
          src="lessons/atom-structure.png"
          alt=""
          aria-hidden="true"
          className="absolute block max-w-none"
          style={{
            width: `${(IMG_W / CROP.w) * 100}%`,
            left: `${(-CROP.x / CROP.w) * 100}%`,
            top: `${(-CROP.y / CROP.h) * 100}%`
          }}
        />
        {ELECTRONS.map((e, i) => (
          // Each electron turns about the nucleus: the layer turns, and the electron sits on it at its own distance from the nucleus
          <span
            key={i}
            className="at-turn"
            style={{
              transformOrigin: `${origin.left} ${origin.top}`,
              animationDuration: `${((FASTEST_TURN * distance(e)) / CLOSEST).toFixed(2)}s`
            }}
            aria-hidden="true"
          >
            <span className="at-electron" style={place(e.x, e.y)} />
          </span>
        ))}
        <span className="at-nucleus" style={origin} aria-hidden="true" />
      </div>
      <figcaption className="flex flex-wrap justify-center gap-1.5">
        {PARTICLES.map(p => (
          <span key={p.en} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${p.cls}`}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.dot }} aria-hidden="true" />
            {mn ? p.mn : p.en}
          </span>
        ))}
      </figcaption>
    </figure>
  );
};
