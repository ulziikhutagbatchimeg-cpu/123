import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { courseTopics } from '../data/courseScope';
import { useActivity } from '../lib/activity';
import { HIGHLIGHT_HEADING, HIGHLIGHT_SUB } from '../lib/highlight';
import { SelfRating, useSelfRated } from './SelfRating';

// The greens of the IGCSE course. The AS and A Level courses change the page's emerald and teal, so the self-rating sets them
// back to these values, and it looks the same on every course.
const IGCSE_GREENS: Record<string, string> = {
  '--color-emerald-50': '#ecfdf5',
  '--color-emerald-100': '#d1fae5',
  '--color-emerald-200': '#a7f3d0',
  '--color-emerald-300': '#6ee7b7',
  '--color-emerald-400': '#34d399',
  '--color-emerald-500': '#10b981',
  '--color-emerald-600': '#059669',
  '--color-emerald-700': '#047857',
  '--color-emerald-800': '#065f46',
  '--color-emerald-900': '#064e3b',
  '--color-emerald-950': '#022c22',
  '--color-teal-300': '#5eead4',
  '--color-teal-400': '#2dd4bf',
  '--color-teal-500': '#14b8a6',
  '--color-teal-600': '#0d9488',
  '--color-teal-700': '#0f766e',
  '--color-teal-800': '#115e59',
  '--color-teal-950': '#042f2e'
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
    <section className="mx-auto max-w-3xl space-y-5" style={IGCSE_GREENS as React.CSSProperties}>
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
