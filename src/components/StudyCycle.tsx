import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { CourseChoice } from '../context/AppContext';

// The three steps a student repeats every day: Plan → Do and monitor → Evaluate (Cambridge's Plan, Monitor, Evaluate).
// Shown on How to study here; Home lays the same steps out as its three folds (components/Dashboard). They follow Zimmerman's
// cycle of self-regulated learning (forethought → performance → self-reflection); the theory's names stay in the code and
// the teacher's pages, never on the student's screen.
//  - Each step ticks itself from what the student has done today (the caller says which are done), and the first step not
//    done yet stands out, so the student sees where they are in the cycle.
//  - Each step has one button to the place where it is done.
//  - On the first day (and until "Got it" is pressed) each step has one sentence under it; after that only the names and
//    buttons stay. On How to study here the sentences always show.
//  - IGCSE students (14 to 16) get plain words and more help; AS and A Level students get shorter labels.

type Bi = { en: string; mn: string };

interface StepText {
  title: Bi;
  line: Bi; // the one sentence shown on the first day
  button: Bi;
}

const IGCSE_STEPS: StepText[] = [
  {
    title: { mn: 'Төлөвлөх', en: 'Plan' },
    line: { mn: 'Өнөөдөр юу сурахаа сонго.', en: 'Choose what you will learn today.' },
    button: { mn: 'Өнөөдрийн зорилго', en: 'Today’s goal' }
  },
  {
    title: { mn: 'Хийх, хянах', en: 'Do and monitor' },
    line: { mn: 'Хичээлийн 5 алхмыг дарааллаар хий, ойлгосноо шалга.', en: 'Do the lesson’s five steps in order and check what you understood.' },
    button: { mn: 'Хичээл үргэлжлүүлэх', en: 'Continue the lesson' }
  },
  {
    title: { mn: 'Үнэлэх', en: 'Evaluate' },
    line: { mn: 'Зорилгодоо хүрсэн эсэхээ үнэл, алдаагаа засаад дараагийн зорилгоо тавь.', en: 'Judge whether you reached your goal, fix your mistakes and set your next goal.' },
    button: { mn: 'Алдааны сан', en: 'Mistake notebook' }
  }
];

const ALEVEL_STEPS: StepText[] = [
  {
    title: { mn: 'Төлөвлөх: зорилт ба хуваарь', en: 'Plan: objectives and schedule' },
    line: { mn: 'Өнөөдрийн зорилгоо тавь.', en: 'Set today’s goal.' },
    button: { mn: 'Өнөөдрийн зорилго', en: 'Today’s goal' }
  },
  {
    title: { mn: 'Хийх, хянах: хичээл, түргэн шалгалт', en: 'Do and monitor: lessons and quick checks' },
    line: { mn: 'Хичээлийн алхмууд, түргэн шалгалт.', en: 'The lesson steps and the quick check.' },
    button: { mn: 'Хичээл үргэлжлүүлэх', en: 'Continue the lesson' }
  },
  {
    title: { mn: 'Үнэлэх: AO-оор өөрийгөө үнэл', en: 'Evaluate: rate yourself by AO' },
    line: { mn: 'Гарах билет, алдааны сан, AO1–AO3.', en: 'Exit ticket, mistake notebook, AO1–AO3.' },
    button: { mn: 'Алдааны сан', en: 'Mistake notebook' }
  }
];

// The first-day sentences: shown on the day the student first sees the steps, until "Got it" is pressed
const INTRO_KEY = 'chem_study_cycle_intro';
const todayString = () => new Date().toDateString();
const readIntro = (): { day: string; dismissed: boolean } | null => {
  try {
    const raw = window.localStorage.getItem(INTRO_KEY);
    return raw ? (JSON.parse(raw) as { day: string; dismissed: boolean }) : null;
  } catch {
    return null;
  }
};
const writeIntro = (value: { day: string; dismissed: boolean }) => {
  try {
    window.localStorage.setItem(INTRO_KEY, JSON.stringify(value));
  } catch {
    // Storage can be blocked; the sentences then show again on the next visit, which is harmless
  }
};

export const StudyCycle: React.FC<{
  course: CourseChoice;
  mn: boolean;
  done: [boolean, boolean, boolean]; // Plan, Monitor, Evaluate: done today
  actions: [() => void, () => void, () => void]; // the place where each step is done
  alwaysExplain?: boolean; // How to study here: the sentences always show
}> = ({ course, mn, done, actions, alwaysExplain = false }) => {
  const steps = course === 'igcse' ? IGCSE_STEPS : ALEVEL_STEPS;
  const [intro, setIntro] = useState(() => {
    const saved = readIntro();
    if (saved) return saved;
    const first = { day: todayString(), dismissed: false };
    writeIntro(first);
    return first;
  });
  const explain = alwaysExplain || (!intro.dismissed && intro.day === todayString());
  const dismiss = () => {
    const next = { ...intro, dismissed: true };
    writeIntro(next);
    setIntro(next);
  };
  // The step to do now: the first one not done today; none once all three are done
  const current = done.findIndex(d => !d);
  const t = (b: Bi) => (mn ? b.mn : b.en);

  return (
    <div className="space-y-2">
      {/* Phones: the steps one under another; wider screens: three cards side by side. The button sits under the words */}
      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-3" aria-label={mn ? 'Өнөөдрийн алхмууд' : 'Today’s steps'}>
        {steps.map((s, i) => {
          const isDone = done[i];
          const isNow = i === current;
          return (
            <li
              key={i}
              aria-current={isNow ? 'step' : undefined}
              className={`relative flex min-w-0 flex-col items-start gap-2 rounded-xl border p-2.5 sm:p-3 ${
                isNow
                  ? 'border-emerald-500 bg-emerald-50 dark:border-teal-500 dark:bg-teal-950/30'
                  : isDone
                    ? 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                    : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950'
              }`}
            >
              <div className="flex w-full min-w-0 items-start gap-2">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isDone ? 'bg-emerald-600 text-white' : isNow ? 'border-2 border-emerald-600 bg-white text-emerald-700 dark:bg-slate-900' : 'border border-slate-300 bg-white text-slate-500 dark:bg-slate-900'
                  }`}
                  aria-hidden="true"
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <div className={`text-sm font-bold leading-snug ${isDone ? 'text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                    {t(s.title)}
                    <span className="sr-only">{isDone ? (mn ? ' (хийсэн)' : ' (done)') : ''}</span>
                  </div>
                  {explain && <p className="mt-0.5 text-xs leading-snug text-slate-600 dark:text-slate-300">{t(s.line)}</p>}
                </div>
              </div>
              <button
                type="button"
                onClick={actions[i]}
                className={`ml-8 inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-bold sm:mt-auto ${
                  isNow ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'text-emerald-700 hover:bg-emerald-50 dark:text-teal-300 dark:hover:bg-slate-800'
                }`}
              >
                {t(s.button)}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-2 top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 text-slate-300 sm:block" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
      {explain && !alwaysExplain && (
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>
            {mn
              ? 'Өдөр бүр эдгээр гурван алхмыг давтана. Хийсэн алхам өөрөө ✓ болно.'
              : 'Repeat these three steps every day. Each step ticks itself when done.'}
          </span>
          <button type="button" onClick={dismiss} className="shrink-0 rounded-lg border border-slate-300 px-2 py-0.5 font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200">
            {mn ? 'Ойлголоо' : 'Got it'}
          </button>
        </div>
      )}
    </div>
  );
};
