import React from 'react';
import { Star, Flame, Heart } from 'lucide-react';
import { useActivity, type ActivityRecord } from '../lib/activity';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

// A small strip of rewards for the student: stars for lessons passed, a flame for the days in a row, and hearts for the
// activities done today. A reward is only ever added, never taken away, so a student is cheered on rather than told off.
const DAY = 86400000;
const UNLOCK_ABOVE = 60; // the same pass mark as the lesson exit tickets
const DAILY_GOAL = 3; // activities in one day that fill every heart

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
  // Each lesson, game, escape room or test taken today counts once, up to the daily goal
  const done = Math.min(DAILY_GOAL, new Set(mine.filter(r => dayStart(r.takenAt) === today).map(r => r.id)).size);
  const goalMet = done >= DAILY_GOAL;

  return (
    <div
      className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-amber-200 dark:border-slate-800 bg-gradient-to-r from-amber-50 via-white to-rose-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 px-5 py-3 shadow-sm"
      role="group"
      aria-label={mn ? 'Шагналууд' : 'Rewards'}
    >
      <span
        className="flex items-center gap-2 font-black text-slate-800 dark:text-slate-100"
        title={mn
          ? `Гарах билетээр ${UNLOCK_ABOVE}%-иас дээш оноо авсан хичээлийн тоо`
          : `Lessons whose exit ticket scored ${UNLOCK_ABOVE}% or more`}
      >
        <Star className="w-6 h-6 text-amber-400 fill-amber-400" aria-hidden="true" />
        <span className="text-xl tabular-nums">{stars}</span>
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{mn ? 'хичээл тэнцсэн' : 'lessons passed'}</span>
      </span>

      <span
        className="flex items-center gap-2 font-black text-slate-800 dark:text-slate-100"
        title={mn
          ? 'Өдөр бүр ядаж нэг үйл хийсэн дараалсан өдрүүд. Өнөөдөр хоосон бол өчигдрөөс тооцно.'
          : 'Days in a row with at least one activity. If today is still empty, the count starts from yesterday.'}
      >
        <Flame className={`w-6 h-6 ${streak > 0 ? 'text-orange-500 fill-orange-400' : 'text-slate-300'}`} aria-hidden="true" />
        <span className="text-xl tabular-nums">{streak}</span>
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{mn ? 'дараалсан өдөр' : 'days in a row'}</span>
      </span>

      <span
        className="flex items-center gap-1.5"
        title={mn
          ? `Өнөөдөр хийсэн хичээл, дасгал, тоглоом, escape room, шалгалтын тоо. ${DAILY_GOAL} хүрвэл өдрийн зорилго биелнэ.`
          : `Lessons, practice sets, games, escape room and tests done today. Reach ${DAILY_GOAL} to meet today's goal.`}
      >
        {Array.from({ length: DAILY_GOAL }, (_, i) => (
          <Heart
            key={i}
            className={`w-6 h-6 ${i < done ? 'text-rose-500 fill-rose-500' : 'text-slate-300 dark:text-slate-600'}`}
            aria-hidden="true"
          />
        ))}
        <span className="ml-1 text-sm font-bold text-slate-500 dark:text-slate-400">
          {mn ? `Өнөөдөр ${done}/${DAILY_GOAL} үйл хийсэн` : `Today: ${done}/${DAILY_GOAL} done`}
          {goalMet && <span className="ml-1 text-emerald-600 dark:text-emerald-400">{mn ? 'зорилго биелсэн ✓' : 'goal met ✓'}</span>}
        </span>
      </span>
    </div>
  );
};
