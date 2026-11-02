import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { courseTopics } from '../data/courseScope';
import { useActivity } from '../lib/activity';
import { HIGHLIGHT_HEADING, HIGHLIGHT_SUB } from '../lib/highlight';
import { SelfRating, useSelfRated } from './SelfRating';

// The blues of the AS Level course. The IGCSE course sets the self-rating to these, so it looks the same as AS.
const AS_BLUES: Record<string, string> = {
  '--color-emerald-50': '#eff6ff',
  '--color-emerald-100': '#dbeafe',
  '--color-emerald-200': '#bfdbfe',
  '--color-emerald-300': '#93c5fd',
  '--color-emerald-400': '#60a5fa',
  '--color-emerald-500': '#3b82f6',
  '--color-emerald-600': '#2563eb',
  '--color-emerald-700': '#1d4ed8',
  '--color-emerald-800': '#1e40af',
  '--color-emerald-900': '#1e3a8a',
  '--color-emerald-950': '#172554',
  '--color-teal-300': '#67e8f9',
  '--color-teal-400': '#22d3ee',
  '--color-teal-500': '#06b6d4',
  '--color-teal-600': '#0891b2',
  '--color-teal-700': '#0e7490',
  '--color-teal-800': '#155e75'
};

// The self-rating at the start of the lessons. Until the student has rated all five questions for the course, the form is here
// and the lessons stay closed; once it is saved, the rating stays here, beside the lessons, with the progress at the start and now.
export const SelfRatingGate: React.FC = () => {
  const { mode } = useLanguage();
  const { stats, courseChoice } = useApp();
  const activity = useActivity();
  const rated = useSelfRated(courseChoice);
  const mn = mode === 'mn';

  // The progress at the start, which the rating is kept beside
  const allTopics = courseTopics(courseChoice);
  const topicsFinished = allTopics.filter(t => stats.completedTopics.includes(t.id)).length;
  const exitRecords = activity.filter(r => r.course === courseChoice && r.kind === 'exit');
  const exitAverage = exitRecords.length
    ? Math.round(exitRecords.reduce((n, r) => n + r.percent, 0) / exitRecords.length)
    : null;

  return (
    <section
      className="mx-auto max-w-3xl space-y-5"
      style={courseChoice === 'igcse' ? (AS_BLUES as React.CSSProperties) : undefined}
    >
      {!rated && (
        <div className="space-y-1 text-center">
          <div className={HIGHLIGHT_HEADING}>{mn ? 'Эхлээд өөрийн үнэлгээ' : 'Rate yourself first'}</div>
          <p className={HIGHLIGHT_SUB}>
            {mn ? 'Бүх асуултыг үнэлсний дараа хичээл нээгдэнэ.' : 'The lessons open once all five questions are rated.'}
          </p>
        </div>
      )}
      <SelfRating key={courseChoice} now={{ topicsFinished, topicsTotal: allTopics.length, exitAverage }} />
    </section>
  );
};
