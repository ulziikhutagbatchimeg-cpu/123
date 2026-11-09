import React from 'react';

// The particle-model lab, shown whole in a frame in the site's language (the page has its own MN / EN switch too):
// states and the heating curve, diffusion, and gas pressure.
//  - IGCSE 0620 chapter 1 (public/labs/particle-model-igcse.html): the teacher's page as given, with the Extended (E) parts.
//  - AS 9701 chapter 4 (public/labs/particle-model-as.html): raised to AS, with pV = nRT, the ideal-gas assumptions and
//    real gases (4.1 The gaseous state).
export const ParticleModelLab: React.FC<{ mn: boolean; course: 'igcse' | 'as'; height?: string }> = ({ mn, course, height = 'h-[1050px]' }) => (
  <iframe
    key={`${course}-${mn ? 'mn' : 'en'}`}
    src={`labs/particle-model-${course}.html#${mn ? 'mn' : 'en'}`}
    title={
      course === 'as'
        ? mn ? 'Бөөмсийн загвар ба хийн төлөв' : 'Particle model and the gaseous state'
        : mn ? 'Бөөмсийн загвар' : 'Particle model'
    }
    loading="lazy"
    className={`w-full ${height} rounded-2xl border border-slate-200 bg-white`}
  />
);
