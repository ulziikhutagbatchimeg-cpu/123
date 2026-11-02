import React from 'react';

// The particles of a substance, drawn small and animated: each particle drifts about its place. The motion stops for reduced motion.
const PARTICLES = [
  { x: 52, y: 58, dx: 14, dy: 10, delay: 0, colour: '#0ea5e9' },
  { x: 84, y: 52, dx: -12, dy: 14, delay: 0.4, colour: '#0ea5e9' },
  { x: 116, y: 60, dx: 10, dy: -12, delay: 0.9, colour: '#0ea5e9' },
  { x: 150, y: 54, dx: -14, dy: 8, delay: 1.3, colour: '#0ea5e9' },
  { x: 184, y: 62, dx: -10, dy: 12, delay: 0.2, colour: '#0ea5e9' },
  { x: 62, y: 96, dx: 12, dy: -10, delay: 1.1, colour: '#f59e0b' },
  { x: 98, y: 100, dx: -14, dy: 10, delay: 0.6, colour: '#f59e0b' },
  { x: 132, y: 96, dx: 12, dy: 12, delay: 1.6, colour: '#f59e0b' },
  { x: 168, y: 104, dx: -10, dy: -10, delay: 0.3, colour: '#f59e0b' },
  { x: 192, y: 96, dx: -12, dy: 10, delay: 1.0, colour: '#f59e0b' },
  { x: 58, y: 136, dx: 10, dy: -12, delay: 0.8, colour: '#10b981' },
  { x: 92, y: 140, dx: -12, dy: -8, delay: 1.4, colour: '#10b981' },
  { x: 126, y: 134, dx: 14, dy: -10, delay: 0.1, colour: '#10b981' },
  { x: 160, y: 140, dx: -10, dy: 10, delay: 1.2, colour: '#10b981' },
  { x: 186, y: 134, dx: 8, dy: -12, delay: 0.7, colour: '#10b981' }
];

export const ParticleAnimation: React.FC<{ mn: boolean; className?: string }> = ({ mn, className }) => (
  <svg
    viewBox="0 0 240 200"
    className={className}
    role="img"
    aria-label={mn ? 'Бөөмс: байрандаа хөдөлж байна' : 'Particles moving about their places'}
  >
    <rect x="20" y="24" width="200" height="150" rx="12" className="fill-sky-50 dark:fill-slate-950" stroke="#94a3b8" strokeWidth="1.5" />
    {PARTICLES.map((p, i) => (
      <circle
        key={i}
        cx={p.x}
        cy={p.y}
        r="6"
        fill={p.colour}
        className="pt-move"
        style={{ '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, animationDelay: `${p.delay}s` } as React.CSSProperties}
      />
    ))}
    <text x="120" y="194" textAnchor="middle" fontSize="8" className="fill-slate-600 dark:fill-slate-300">
      {mn ? 'Бөөмс байрандаа хөдөлдөг' : 'Particles move about their places'}
    </text>
  </svg>
);
