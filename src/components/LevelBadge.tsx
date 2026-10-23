import React from 'react';
import type { SyllabusLevel } from '../data/alevelSyllabus';

// The tag beside a 9701 topic: AS for topics 1–22, A Level for the A Level-only topics 23–37
export const LevelBadge: React.FC<{ level: SyllabusLevel }> = ({ level }) => (
  <span
    className={`ml-2 align-middle px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold border whitespace-nowrap ${
      level === 'as'
        ? 'bg-sky-50 border-sky-300 text-sky-800 dark:bg-sky-950/40 dark:border-sky-700 dark:text-sky-200'
        : 'bg-violet-50 border-violet-300 text-violet-800 dark:bg-violet-950/40 dark:border-violet-700 dark:text-violet-200'
    }`}
  >
    {level === 'as' ? 'AS' : 'A Level'}
  </span>
);
