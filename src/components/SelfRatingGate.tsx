import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { HIGHLIGHT_HEADING, HIGHLIGHT_SUB } from '../lib/highlight';

// Shown instead of the lessons until the student has rated the five self-rating questions for the course. The rating is on the
// dashboard, so the button takes the student there.
export const SelfRatingGate: React.FC = () => {
  const { mode } = useLanguage();
  const { setActiveTab } = useApp();
  const mn = mode === 'mn';

  return (
    <section className="mx-auto max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="space-y-1">
        <div className={HIGHLIGHT_HEADING}>{mn ? 'Эхлээд өөрийн үнэлгээ' : 'Rate yourself first'}</div>
        <p className={HIGHLIGHT_SUB}>
          {mn ? 'Бүх асуултыг үнэлсний дараа хичээл нээгдэнэ.' : 'The lessons open once all five questions are rated.'}
        </p>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300">
        {mn
          ? 'Хичээлд орохын өмнө өөрийн суралцах чадварыг 1–5 оноогоор үнэлээрэй.'
          : 'Before you open a lesson, rate how you learn on a scale from 1 to 5.'}
      </p>
      <button
        type="button"
        onClick={() => setActiveTab('dashboard')}
        className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-black text-white hover:bg-emerald-700"
      >
        {mn ? 'Өөрийн үнэлгээ бөглөх' : 'Go to the self-rating'}
      </button>
    </section>
  );
};
