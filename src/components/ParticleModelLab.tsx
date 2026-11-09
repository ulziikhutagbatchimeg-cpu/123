import React from 'react';

// The particle-model lab at AS 9701 level (public/labs/particle-model-as.html): states and the heating curve, diffusion, and
// the gaseous state with pV = nRT, the ideal-gas assumptions and real gases. Shown whole in a frame, in the site's language;
// the page has its own MN / EN switch too. It belongs to AS chapter 4 (States of matter, 4.1 The gaseous state).
export const ParticleModelLab: React.FC<{ mn: boolean }> = ({ mn }) => (
  <iframe
    key={mn ? 'mn' : 'en'}
    src={`labs/particle-model-as.html#${mn ? 'mn' : 'en'}`}
    title={mn ? 'Бөөмсийн загвар ба хийн төлөв' : 'Particle model and the gaseous state'}
    loading="lazy"
    className="w-full h-[1050px] rounded-2xl border border-slate-200 bg-white"
  />
);
