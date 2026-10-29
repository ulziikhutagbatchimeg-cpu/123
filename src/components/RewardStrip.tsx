import React from 'react';
import { Star, Flame, Heart } from 'lucide-react';
import { useActivity, type ActivityRecord } from '../lib/activity';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

// A small strip of rewards for the student: stars for lessons passed, a flame for the days in a row, and three hearts
// for today. A reward is only ever added, never taken away, so a student is cheered on rather than told off.
const DAY = 86400000;
const UNLOCK_ABOVE = 60; // the same pass mark as the lesson exit tickets

const dayStart = (time: number): number => {
  const d = new Date(time);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

// How many days in a row, up to today, the student has done something. Today may still be empty, so it starts from yesterday then.
const streakDays = (records: ActivityRecord[], now: number): number => {
  const days = new Set(records.map(r => dayStart(r.takenAt)));
  let day = dayStart(now);
  if (!days.has(day)) day -= DAY;
  let count = 0;
  while (days.has(day)) {
    count++;
    day -= DAY;
  }
  return count;
};

export const RewardStrip: React.FC = () => {
  const records = useActivity();
  const { mode } = useLanguage();
  const { courseChoice } = useApp();
  const mn = mode === 'mn';

  const now = Date.now();
  const mine = records.filter(r => r.course === courseChoice);
  const stars = mine.filter(r => r.kind === 'exit' && r.percent >= UNLOCK_ABOVE).length;
  const streak = streakDays(mine, now);
  const today = dayStart(now);
  const hearts = Math.min(3, new Set(mine.filter(r => dayStart(r.takenAt) === today).map(r => r.id)).size);

  return (
    <div
      className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-amber-200 dark:border-slate-800 bg-gradient-to-r from-amber-50 via-white to-rose-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 px-5 py-3 shadow-sm"
      role="group"
      aria-label={mn ? 'Шагналууд' : 'Rewards'}
    >
      <span className="flex items-center gap-2 font-black text-slate-800 dark:text-slate-100" title={mn ? '60%-аас дээш үнэлгээтэй хичээл' : 'Lessons passed (60% or more)'}>
        <Star className="w-6 h-6 text-amber-400 fill-amber-400" aria-hidden="true" />
        <span className="text-xl tabular-nums">{stars}</span>
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{mn ? 'од' : 'stars'}</span>
      </span>

      <span className="flex items-center gap-2 font-black text-slate-800 dark:text-slate-100" title={mn ? 'Дараалсан өдрүүд' : 'Days in a row'}>
        <Flame className={`w-6 h-6 ${streak > 0 ? 'text-orange-500 fill-orange-400' : 'text-slate-300'}`} aria-hidden="true" />
        <span className="text-xl tabular-nums">{streak}</span>
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{mn ? 'өдөр дараалсан' : 'day streak'}</span>
      </span>

      <span className="flex items-center gap-1.5" title={mn ? 'Өнөөдрийн зүрх: өдөрт хийсэн үйл бүр нэг зүрх' : 'Today’s hearts: one for each thing done today'}>
        {[0, 1, 2].map(i => (
          <Heart
            key={i}
            className={`w-6 h-6 ${i < hearts ? 'text-rose-500 fill-rose-500' : 'text-slate-300 dark:text-slate-600'}`}
            aria-hidden="true"
          />
        ))}
        <span className="ml-1 text-sm font-bold text-slate-500 dark:text-slate-400">{mn ? 'өнөөдөр' : 'today'}</span>
      </span>
    </div>
  );
};
