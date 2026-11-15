import React, { useState } from 'react';
import { ArrowLeft, Flag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { courseMistakes, courseTopics } from '../data/courseScope';
import { analyseMistakes } from '../data/mistakeAnalysis';
import { useActivity } from '../lib/activity';
import { useStudyDays } from '../lib/studyTime';
import {
  GOOD_TEXT,
  HARD_TEXT,
  NEXT_TEXT,
  NOTE_MAX,
  saveWeekReflection,
  standingDecision,
  thisWeekOf,
  useWeekReflections,
  type GoodId,
  type HardId,
  type NextId
} from '../lib/weekReflection';
import { IntroLine, SkipButton, useIntroOnce } from './TicketReflection';

// Home's weekly look back (lib/weekReflection), as the student sees it:
//  - WeeklyReflectionCard: once a week, three questions one after another, each answered with one press (the last has an
//    optional line of the student's own words); Skip puts it away for the week with no penalty.
//  - WeekDecision: the decision of the last question, standing above today's goal all week.
// IGCSE students (14 to 16) get plain sentences and a word of praise; AS and A Level students get shorter wording.

type Bi = { en: string; mn: string };
const DAY_MS = 24 * 60 * 60 * 1000;

const OptionButton: React.FC<{ label: string; sub?: string; on?: boolean; onPick: () => void }> = ({ label, sub, on = false, onPick }) => (
  <button
    type="button"
    onClick={onPick}
    aria-pressed={on}
    className={`flex min-h-[56px] flex-col items-start justify-center gap-0.5 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-bold transition-colors ${
      on
        ? 'border-emerald-500 bg-emerald-50 text-slate-900 dark:border-teal-500 dark:bg-teal-950/40 dark:text-white'
        : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100'
    }`}
  >
    <span>{label}</span>
    {sub && <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{sub}</span>}
  </button>
);

export const WeeklyReflectionCard: React.FC<{ mn: boolean }> = ({ mn }) => {
  const { courseChoice, mistakes } = useApp();
  const records = useWeekReflections();
  const activity = useActivity();
  const studyDays = useStudyDays();
  const [intro, dismiss] = useIntroOnce('week');
  const [step, setStep] = useState(0);
  const [good, setGood] = useState<GoodId | null>(null);
  const [hard, setHard] = useState<HardId | null>(null);
  const [next, setNext] = useState<NextId | null>(null);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const young = courseChoice === 'igcse';
  const t = (b: Bi) => (mn ? b.mn : b.en);

  // Asked once a week, and only after some study in this programme in the last seven days (a result or study time)
  const weekAgo = Date.now() - 7 * DAY_MS;
  const studied =
    activity.some(r => r.course === courseChoice && r.takenAt >= weekAgo) ||
    Object.entries(studyDays).some(([key, seconds]) => {
      const [course, day] = key.split('|');
      return course === courseChoice && seconds > 0 && !!day && Date.parse(`${day}T23:59:59`) >= weekAgo;
    });
  const answered = thisWeekOf(records, courseChoice);

  // The topic most missed in the mistake notebook, offered first as the hard part
  const topTopic = analyseMistakes(courseMistakes(mistakes, courseChoice)).topics[0];
  const topic = topTopic ? courseTopics(courseChoice).find(x => x.id === topTopic.topicId) : undefined;
  const topicLabel: Bi | null = topic
    ? { mn: `${topic.number} ${topic.titleMn}`, en: `${topic.number} ${topic.titleEn}` }
    : topTopic
      ? { mn: topTopic.syllabusRef, en: topTopic.syllabusRef }
      : null;

  if (saved) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm dark:border-teal-900 dark:bg-teal-950/30">
        <span className="font-bold text-emerald-900 dark:text-teal-200">
          {young
            ? t({ mn: 'Баярлалаа! Чи эргэцүүлэн бодож байна. Шийдвэр чинь «Өнөөдөр» хэсгийн дээр 7 хоногийн турш харагдана.', en: 'Thank you! You are being reflective. Your decision stands above Today all week.' })
            : t({ mn: 'Хадгаллаа. Шийдвэр «Өнөөдөр» хэсгийн дээр харагдана.', en: 'Saved. Your decision stands above Today.' })}
        </span>
        <button type="button" onClick={() => setSaved(false)} className="rounded-lg border border-emerald-300 bg-white px-3 py-1 text-xs font-bold text-emerald-800 dark:border-teal-800 dark:bg-slate-900 dark:text-teal-200">
          {mn ? 'Хаах' : 'Close'}
        </button>
      </div>
    );
  }
  if (answered || !studied) return null;

  const skip = () => saveWeekReflection({ course: courseChoice, skipped: true });
  const finish = (choice: NextId) => {
    saveWeekReflection({
      course: courseChoice,
      good: good ?? undefined,
      hard: hard ?? undefined,
      hardTopic: hard === 'topic' && topTopic && topicLabel ? { id: topTopic.topicId, label: topicLabel } : undefined,
      next: choice,
      note
    });
    setSaved(true);
  };

  const questions: Bi[] = [
    young
      ? { mn: 'Сүүлийн 7 хоногт юу сайн болов?', en: 'What went well in the last seven days?' }
      : { mn: 'Сүүлийн 7 хоногт юу амжилттай болсон бэ?', en: 'What went well this week?' },
    { mn: 'Юу хэцүү байв?', en: 'What was hard?' },
    { mn: 'Ирэх 7 хоногт юуг өөрөөр хийх вэ?', en: 'What will you do differently in the next seven days?' }
  ];
  const note1 = young
    ? { mn: 'Долоо хоногт нэг удаа 3 богино асуулт. Сүүлийн шийдвэр чинь «Өнөөдөр» хэсгийн дээр сануулга болж харагдана.', en: 'Three short questions once a week. Your last answer stands above Today as a reminder.' }
    : { mn: '7 хоногт нэг удаа, 3 асуулт. Шийдвэр «Өнөөдөр» хэсгийн дээр харагдана.', en: 'Once a week, three questions. Your decision stands above Today.' };

  return (
    <section className="space-y-3 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm dark:border-teal-900 dark:bg-slate-900 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5">
          <div className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-teal-300">
            {mn ? '7 хоногийн эргэцүүлэл' : 'Your week'} · {step + 1}/3
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">{t(questions[step])}</h3>
        </div>
        <SkipButton mn={mn} onSkip={skip} />
      </div>
      {intro && step === 0 && <IntroLine text={t(note1)} mn={mn} onDismiss={dismiss} />}

      {step === 0 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {(Object.keys(GOOD_TEXT) as GoodId[]).map(id => (
            <OptionButton key={id} label={t(GOOD_TEXT[id])} on={good === id} onPick={() => { setGood(id); setStep(1); }} />
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {(Object.keys(HARD_TEXT) as HardId[]).map(id => (
            <OptionButton
              key={id}
              // The topic most missed in the mistake notebook names itself on the first button
              label={id === 'topic' && topicLabel ? t(topicLabel) : t(HARD_TEXT[id])}
              sub={
                id === 'topic' && topTopic
                  ? mn ? `Алдааны санд хамгийн их: ${topTopic.count} алдаа` : `Most missed in your mistake notebook: ${topTopic.count}`
                  : undefined
              }
              on={hard === id}
              onPick={() => { setHard(id); setStep(2); }}
            />
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(Object.keys(NEXT_TEXT) as NextId[]).map(id => (
              <OptionButton key={id} label={t(NEXT_TEXT[id])} on={next === id} onPick={() => setNext(id)} />
            ))}
          </div>
          <label className="block space-y-1">
            <span className="text-xs text-slate-600 dark:text-slate-300">{mn ? 'Өөрийн үгээр нэмж бичих (заавал биш)' : 'In your own words (optional)'}</span>
            <input
              type="text"
              value={note}
              maxLength={NOTE_MAX}
              onChange={e => setNote(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </label>
          <button
            type="button"
            disabled={!next}
            onClick={() => next && finish(next)}
            className="min-h-[44px] rounded-xl bg-emerald-600 px-5 py-2 text-sm font-bold text-white hover:bg-emerald-500 disabled:opacity-40"
          >
            {mn ? 'Хадгалах' : 'Save'}
          </button>
        </div>
      )}

      {step > 0 && (
        <button type="button" onClick={() => setStep(s => s - 1)} className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:underline dark:text-slate-400">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          {mn ? 'Буцах' : 'Back'}
        </button>
      )}
    </section>
  );
};

// The student's own decision for this week, above today's goal
export const WeekDecision: React.FC<{ mn: boolean }> = ({ mn }) => {
  const { courseChoice, setActiveTab } = useApp();
  const records = useWeekReflections();
  const decision = standingDecision(records, courseChoice);
  if (!decision?.next) return null;
  const young = courseChoice === 'igcse';
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs dark:border-amber-900 dark:bg-amber-950/30">
      <Flag className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
      <span className="font-bold text-amber-900 dark:text-amber-200">
        {young ? (mn ? 'Энэ 7 хоногийн шийдвэр чинь:' : 'Your decision for this week:') : mn ? 'Энэ 7 хоногт:' : 'This week:'}
      </span>
      <span className="text-slate-800 dark:text-slate-100">
        {mn ? NEXT_TEXT[decision.next].mn : NEXT_TEXT[decision.next].en}
        {decision.note ? ` · «${decision.note}»` : ''}
      </span>
      {decision.next === 'mistakes' && (
        <button type="button" onClick={() => setActiveTab('mistakes')} className="font-bold text-emerald-700 hover:underline dark:text-teal-300">
          {mn ? 'Алдааны сан →' : 'Mistake notebook →'}
        </button>
      )}
    </div>
  );
};
