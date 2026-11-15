import React, { useState } from 'react';
import { ArrowRight, Dumbbell, HelpCircle, ThumbsUp, Timer, type LucideIcon } from 'lucide-react';
import { useApp, type CourseChoice } from '../context/AppContext';
import {
  BAND_RANGES,
  REASON_IDS,
  REASON_TEXT,
  bandLabel,
  calibrationOf,
  type ConfidenceBand,
  type ReasonId
} from '../lib/reflection';

// The two short questions around an assessment (lib/reflection), as the student sees them:
//  - ConfidenceCheck, before a lesson's exit ticket: "How well do you think you will do?" with four big buttons;
//  - ScoreReflection, under the score: the guess beside the score in one gentle sentence, then "Why did you get this
//    score?" with four big buttons, and one button to the step that fits the reason.
// Rules kept for every student: one question at a time, answered with one press (no typing), always skippable with no
// penalty, and a one-sentence note the first time that goes away with "Got it". IGCSE students (14 to 16) get plain
// sentences and a word of praise; AS and A Level students get shorter wording.

type Bi = { en: string; mn: string };
export interface ReflectAction {
  label: Bi;
  run: () => void;
}
// Where each reason leads: the slides (did not understand), the practice (not enough practice), the next lesson or topic
// (well prepared); "rushed" always leads to the mistake notebook. Try again stands in for a place the page does not have.
export interface ReflectActions {
  slides?: ReflectAction;
  practice?: ReflectAction;
  next?: ReflectAction;
  retry?: ReflectAction;
}

// A one-sentence note shown until the student presses "Got it", kept on this device
export const useIntroOnce = (name: string): [boolean, () => void] => {
  const key = `chem_intro_${name}`;
  const [show, setShow] = useState(() => {
    try {
      return window.localStorage.getItem(key) !== 'seen';
    } catch {
      return true;
    }
  });
  const dismiss = () => {
    setShow(false);
    try {
      window.localStorage.setItem(key, 'seen');
    } catch {
      // Storage can be blocked; the note then shows again next time, which is harmless
    }
  };
  return [show, dismiss];
};

export const IntroLine: React.FC<{ text: string; mn: boolean; onDismiss: () => void }> = ({ text, mn, onDismiss }) => (
  <div className="flex items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300">
    <span>{text}</span>
    <button
      type="button"
      onClick={onDismiss}
      className="shrink-0 rounded-lg border border-slate-300 bg-white px-2 py-1 font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
    >
      {mn ? 'Ойлголоо' : 'Got it'}
    </button>
  </div>
);

export const SkipButton: React.FC<{ mn: boolean; onSkip: () => void }> = ({ mn, onSkip }) => (
  <button type="button" onClick={onSkip} className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold text-slate-500 underline-offset-2 hover:underline dark:text-slate-400">
    {mn ? 'Алгасах' : 'Skip'}
  </button>
);

const younger = (course: CourseChoice) => course === 'igcse';

// The four bands of the guess, each with its colour, from "hardly any" to "all of it"
const BAND_TEXT: { mn: string; en: string; dot: string; ring: string }[] = [
  { mn: 'Бараг мэдэхгүй', en: 'Hardly any', dot: 'bg-rose-500', ring: 'hover:border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30' },
  { mn: 'Хагасыг нь', en: 'About half', dot: 'bg-amber-500', ring: 'hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30' },
  { mn: 'Ихэнхийг нь', en: 'Most of it', dot: 'bg-sky-500', ring: 'hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30' },
  { mn: 'Бүгдийг нь', en: 'All of it', dot: 'bg-emerald-500', ring: 'hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30' }
];

// Before the exit ticket: the student's guess of the score, or Skip (null)
export const ConfidenceCheck: React.FC<{ mn: boolean; onPick: (band: ConfidenceBand | null) => void }> = ({ mn, onPick }) => {
  const { courseChoice } = useApp();
  const [intro, dismiss] = useIntroOnce('confidence');
  const question = younger(courseChoice)
    ? { mn: 'Гарах билетээ хэр сайн хийнэ гэж бодож байна?', en: 'How well do you think you will do on this exit ticket?' }
    : { mn: 'Хэдэн хувь авна гэж таамаглаж байна?', en: 'What score do you expect?' };
  const note = younger(courseChoice)
    ? {
        mn: 'Эхлээд таамагла, дараа нь оноотойгоо харьцуул. Ингэж өөрийгөө зөв үнэлж сурна.',
        en: 'Guess first, then compare with your score. This is how you learn to judge yourself well.'
      }
    : { mn: 'Таамаглалаа оноотойгоо харьцуулна.', en: 'Your guess is set beside your score.' };
  return (
    <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-teal-900 dark:bg-teal-950/20">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-black text-slate-900 dark:text-white">{mn ? question.mn : question.en}</h4>
        <SkipButton mn={mn} onSkip={() => onPick(null)} />
      </div>
      {intro && <IntroLine text={mn ? note.mn : note.en} mn={mn} onDismiss={dismiss} />}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {BAND_TEXT.map((b, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onPick(i as ConfidenceBand)}
            className={`flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-xl border-2 border-slate-200 bg-white px-2 py-2.5 text-center transition-colors dark:border-slate-700 dark:bg-slate-900 ${b.ring}`}
          >
            <span className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
              <span className={`h-2.5 w-2.5 rounded-full ${b.dot}`} aria-hidden="true" />
              {mn ? b.mn : b.en}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {BAND_RANGES[i][0]}–{BAND_RANGES[i][1]}%
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// The reasons, each with its icon and colour
const REASON_LOOK: Record<ReasonId, { icon: LucideIcon; tone: string }> = {
  unclear: { icon: HelpCircle, tone: 'text-rose-600 dark:text-rose-400' },
  practice: { icon: Dumbbell, tone: 'text-amber-600 dark:text-amber-400' },
  rushed: { icon: Timer, tone: 'text-sky-600 dark:text-sky-400' },
  prepared: { icon: ThumbsUp, tone: 'text-emerald-600 dark:text-emerald-400' }
};

// Under the score: the guess beside the score, then the reason and the step that fits it
export const ScoreReflection: React.FC<{
  mn: boolean;
  percent: number;
  predicted?: ConfidenceBand | null; // null or left out: no guess was made
  reason: ReasonId | null;
  skipped: boolean;
  onReason: (reason: ReasonId) => void;
  onSkip: () => void;
  actions: ReflectActions;
}> = ({ mn, percent, predicted, reason, skipped, onReason, onSkip, actions }) => {
  const { courseChoice, setActiveTab } = useApp();
  const young = younger(courseChoice);
  const [intro, dismiss] = useIntroOnce('reason');

  // The guess against the score, in one gentle sentence
  const calibration = predicted === null || predicted === undefined ? null : calibrationOf(predicted, percent);
  const calibrationText: Record<'match' | 'over' | 'under', Bi> = young
    ? {
        match: { mn: 'Таамаглал чинь зөв байлаа. Чи өөрийгөө сайн мэдэж байна.', en: 'Your guess was right. You know yourself well.' },
        over: {
          mn: 'Чи өөрийгөө арай өндөр үнэлжээ. Дараа нь илүү зөв таамаглахыг хичээгээрэй.',
          en: 'You rated yourself a little high. Try to guess more closely next time.'
        },
        under: {
          mn: 'Чи өөрийгөө арай бага үнэлжээ. Чи бодсоноосоо илүү сайн мэдэж байна, өөртөө итгэ.',
          en: 'You rated yourself a little low. You know more than you thought: be confident.'
        }
      }
    : {
        match: { mn: 'Таамаглал оноотой таарлаа.', en: 'Your guess matched the score.' },
        over: { mn: 'Таамаглал оноогоос өндөр байлаа: давтах хэсгээ шалга.', en: 'Your guess was above the score: check what to revise.' },
        under: { mn: 'Таамаглал оноогоос бага байлаа: өөртөө илүү итгэ.', en: 'Your guess was below the score: be more confident.' }
      };
  const calibrationTone = {
    match: 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30',
    over: 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30',
    under: 'border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/30'
  };

  // The step that fits the reason: one button, so the student does not have to look for what to do
  const stepFor = (r: ReasonId): ReflectAction | undefined => {
    if (r === 'unclear') return actions.slides ?? actions.retry;
    if (r === 'practice') return actions.practice ?? actions.retry;
    if (r === 'rushed') return { label: { mn: 'Алдааны сан', en: 'Mistake notebook' }, run: () => setActiveTab('mistakes') };
    return actions.next ?? actions.retry;
  };
  const step = reason ? stepFor(reason) : undefined;
  const note = young
    ? { mn: 'Шалтгаанаа сонговол дараа нь юу хийхийг санал болгоно.', en: 'Choose the reason and you get the step to take next.' }
    : { mn: 'Шалтгаанаа сонго: дараагийн алхмыг санал болгоно.', en: 'Choose the reason: the next step is suggested.' };

  return (
    <div className="space-y-3">
      {calibration && predicted !== null && predicted !== undefined && (
        <div className={`space-y-0.5 rounded-xl border p-3 ${calibrationTone[calibration]}`}>
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
            {mn ? `Таамаглал: ${bandLabel(predicted)} · Оноо: ${percent}%` : `Your guess: ${bandLabel(predicted)} · Score: ${percent}%`}
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{mn ? calibrationText[calibration].mn : calibrationText[calibration].en}</p>
        </div>
      )}

      {!skipped && (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-sm font-black text-slate-900 dark:text-white">{mn ? 'Яагаад ийм дүн гарсан бэ?' : 'Why did you get this score?'}</h4>
            {!reason && <SkipButton mn={mn} onSkip={onSkip} />}
          </div>
          {intro && !reason && <IntroLine text={mn ? note.mn : note.en} mn={mn} onDismiss={dismiss} />}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {REASON_IDS.map(id => {
              const Icon = REASON_LOOK[id].icon;
              const on = reason === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onReason(id)}
                  aria-pressed={on}
                  className={`flex min-h-[64px] flex-col items-center justify-center gap-1.5 rounded-xl border-2 px-2 py-2.5 text-center text-sm font-bold transition-colors ${
                    on
                      ? 'border-emerald-500 bg-emerald-50 text-slate-900 dark:border-teal-500 dark:bg-teal-950/40 dark:text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${REASON_LOOK[id].tone}`} aria-hidden="true" />
                  <span className="leading-snug">{mn ? REASON_TEXT[id].mn : REASON_TEXT[id].en}</span>
                </button>
              );
            })}
          </div>
          {reason && (
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              {young && (
                <span className="text-xs font-bold text-emerald-700 dark:text-teal-300">
                  {mn ? 'Сайн байна, чи эргэцүүлэн бодож байна.' : 'Well done: you are being reflective.'}
                </span>
              )}
              {step && (
                <>
                  <span className="text-xs text-slate-600 dark:text-slate-300">{mn ? 'Дараагийн алхам:' : 'Next step:'}</span>
                  <button
                    type="button"
                    onClick={step.run}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500"
                  >
                    {mn ? step.label.mn : step.label.en}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
