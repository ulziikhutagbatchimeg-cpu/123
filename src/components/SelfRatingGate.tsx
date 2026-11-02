import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { courseTopics } from '../data/courseScope';
import { useActivity } from '../lib/activity';
import { HIGHLIGHT_HEADING, HIGHLIGHT_SUB } from '../lib/highlight';
import { SelfRating } from './SelfRating';

// Shown at the start of the lessons until the student has rated the five self-rating questions for the course. The form is here,
// so the student rates first and the lessons open once all five are saved.
export const SelfRatingGate: React.FC = () => {
  const { mode } = useLanguage();
  const { stats, courseChoice } = useApp();
  const activity = useActivity();
  const mn = mode === 'mn';

  // The progress at the start, which the rating is kept beside
  const allTopics = courseTopics(courseChoice);
  const topicsFinished = allTopics.filter(t => stats.completedTopics.includes(t.id)).length;
  const exitRecords = activity.filter(r => r.course === courseChoice && r.kind === 'exit');
  const exitAverage = exitRecords.length
    ? Math.round(exitRecords.reduce((n, r) => n + r.percent, 0) / exitRecords.length)
    : null;

  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <div className="space-y-1 text-center">
        <div className={HIGHLIGHT_HEADING}>{mn ? 'Эхлээд өөрийн үнэлгээ' : 'Rate yourself first'}</div>
        <p className={HIGHLIGHT_SUB}>
          {mn ? 'Бүх асуултыг үнэлсний дараа хичээл нээгдэнэ.' : 'The lessons open once all five questions are rated.'}
        </p>
      </div>
      <SelfRating key={courseChoice} now={{ topicsFinished, topicsTotal: allTopics.length, exitAverage }} />
    </section>
  );
};
