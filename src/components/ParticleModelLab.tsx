import React from 'react';
import { LabFrame, type LabNext } from './LabFrame';

// The particle-model lab, shown whole in a frame in the site's language (the page has its own MN / EN switch too):
// states and the heating curve, diffusion, and gas pressure.
//  - IGCSE 0620 chapter 1 (public/labs/particle-model-igcse.html): the teacher's page as given, with the Extended (E) parts.
//    `tab` opens one part: 1 states and the heating curve, 2 diffusion, 3 gas pressure.
//  - AS 9701 chapter 4 (public/labs/particle-model-as.html): raised to AS, with pV = nRT, the ideal-gas assumptions and
//    real gases (4.1 The gaseous state).
// Under the lab the student submits it for a score (LabFrame); in a lesson, "Next step" then moves the lesson on.
export const ParticleModelLab: React.FC<{ mn: boolean; course: 'igcse' | 'as'; tab?: 1 | 2 | 3; height?: string } & LabNext> = ({
  mn,
  course,
  tab,
  height = 'h-[1050px]',
  onDone,
  nextHint
}) => {
  const hash = `${mn ? 'mn' : 'en'}${course === 'igcse' && tab ? `-t${tab}` : ''}`;
  return (
    <LabFrame
      frameKey={`${course}-${hash}`}
      src={`labs/particle-model-${course}.html#${hash}`}
      title={course === 'as' ? { mn: 'Бөөмсийн загвар ба хийн төлөв', en: 'Particle model and the gaseous state' } : { mn: 'Бөөмсийн загвар', en: 'Particle model' }}
      height={height}
      check={course === 'as' ? 'particle-as' : 'particle-igcse'}
      part={tab ?? 1}
      mn={mn}
      onDone={onDone}
      nextHint={nextHint}
    />
  );
};
