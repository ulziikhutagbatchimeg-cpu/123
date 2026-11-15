import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { LearningObjective } from '../types/chemistry';
import { useSelfCheck } from '../lib/selfCheck';
import { MAX_OBJECTIVES, rerateTodayObjective, setTodayObjectives, todayGoalOf, useObjectiveGoals } from '../lib/objectiveGoal';
import { IntroLine, useIntroOnce } from './TicketReflection';

// Today's objectives on Home (lib/objectiveGoal), as the student sees them:
//  - "Objectives to master today": pick 1 to 3 objectives of the chapter on screen, those rated "not yet" first;
//  - once the student has said whether today matched the goal, each chosen objective is rated again, I can or not yet, and
//    that becomes its rating in the self-check.
// Choosing is optional and can be closed at any time. IGCSE students get plain words and a word of praise; AS and A Level
// students get shorter wording and see each objective's assessment objective (AO1 to AO3).

const SHOW_FIRST = 6;

export const TodayObjectives: React.FC<{
  mn: boolean;
  candidates: LearningObjective[]; // the objectives of the chapter on screen, for this student's level
  // false: choosing and the list (beside today's goal); true: the end-of-day rating, under "Did today match your goal?"
  rerate: boolean;
}> = ({ mn, candidates, rerate }) => {
  const { courseChoice } = useApp();
  const selfCheck = useSelfCheck();
  const goals = useObjectiveGoals();
  const goal = todayGoalOf(goals, courseChoice);
  const [picking, setPicking] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [intro, dismiss] = useIntroOnce('objectives');
  const young = courseChoice === 'igcse';

  // The objectives to choose from: "not yet" first, then those not rated; the ones already rated "I can" are left out
  const notYet = candidates.filter(lo => selfCheck.lo[lo.id] === false);
  const unrated = candidates.filter(lo => selfCheck.lo[lo.id] === undefined);
  const choices = [...notYet, ...unrated];
  const shown = showAll ? choices : choices.slice(0, SHOW_FIRST);
  const byId = new Map(candidates.map(lo => [lo.id, lo] as const));

  const open = () => {
    setPicked(goal?.items.map(i => i.id) ?? []);
    setPicking(true);
  };
  const toggle = (id: string) =>
    setPicked(list => (list.includes(id) ? list.filter(x => x !== id) : list.length < MAX_OBJECTIVES ? [...list, id] : list));
  const save = () => {
    setTodayObjectives(
      courseChoice,
      picked.map(id => ({ id, code: byId.get(id)?.code ?? id, before: selfCheck.lo[id] }))
    );
    setPicking(false);
  };

  const text = (lo: LearningObjective | undefined, fallback: string) => (lo ? (mn ? lo.mn : lo.en) : fallback);
  const aoTag = (lo: LearningObjective | undefined) =>
    !young && lo?.ao ? <span className="ml-1 rounded bg-slate-200 px-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{lo.ao}</span> : null;
  const allRated = goal ? goal.items.every(i => i.after !== undefined) : false;
  const nowCan = goal ? goal.items.filter(i => i.after === true).length : 0;

  // The end of the day: each chosen objective rated again, right under the question of whether today matched the goal
  if (rerate) {
    if (!goal) return null;
    return (
      <div className="space-y-2 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 dark:border-teal-900 dark:bg-teal-950/20">
        <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
          {young
            ? mn ? 'Өнөөдрийн зорилтоо дахин үнэл: одоо чадах уу?' : 'Rate today’s objectives again: can you do them now?'
            : mn ? 'Өнөөдрийн зорилтыг дахин үнэл.' : 'Rate today’s objectives again.'}
        </div>
        <ul className="space-y-1.5">
          {goal.items.map(item => {
            const lo = byId.get(item.id);
            return (
              <li key={item.id} className="flex flex-col gap-1.5 rounded-lg bg-white px-3 py-2 text-sm dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
                <span className="min-w-0 text-slate-800 dark:text-slate-100">
                  <span className="font-mono text-[11px] font-bold text-slate-500">{item.code}</span>
                  {aoTag(lo)}
                  <span className="block leading-snug">{text(lo, item.code)}</span>
                </span>
                <span className="flex shrink-0 gap-1.5">
                  {[true, false].map(can => (
                    <button
                      key={String(can)}
                      type="button"
                      onClick={() => rerateTodayObjective(courseChoice, item.id, can)}
                      aria-pressed={item.after === can}
                      className={`min-h-[40px] rounded-lg border px-3 py-1 text-xs font-bold transition-colors ${
                        item.after === can
                          ? can
                            ? 'border-transparent bg-emerald-600 text-white'
                            : 'border-transparent bg-amber-500 text-white'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                      }`}
                    >
                      {can ? (mn ? 'Чадна' : 'I can') : mn ? 'Хараахан' : 'Not yet'}
                    </button>
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
        {allRated && (
          <p className="text-xs font-bold text-emerald-700 dark:text-teal-300">
            {young
              ? mn
                ? `Сайн байна, чи эргэцүүлэн бодож байна. ${goal.items.length}-аас ${nowCan} нь «Чадна» боллоо.`
                : `Well done: you are being reflective. ${nowCan} of ${goal.items.length} are now I can.`
              : mn
                ? `${goal.items.length}-аас ${nowCan} «Чадна».`
                : `${nowCan} of ${goal.items.length}: I can.`}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-600 dark:text-slate-300">{mn ? 'Өнөөдөр эзэмших зорилт:' : 'Objectives to master today:'}</span>
        {!picking && !goal && (
          <button
            type="button"
            onClick={open}
            disabled={choices.length === 0}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 font-bold text-slate-800 hover:border-emerald-400 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {mn ? `Сонгох (1–${MAX_OBJECTIVES})` : `Choose (1–${MAX_OBJECTIVES})`}
          </button>
        )}
        {!picking && goal && (
          <>
            <span className="font-bold text-slate-900 dark:text-white">{mn ? `${goal.items.length} зорилт` : `${goal.items.length} chosen`}</span>
            <button type="button" onClick={open} className="font-semibold text-slate-500 hover:underline dark:text-slate-400">
              {mn ? 'Өөрчлөх' : 'Change'}
            </button>
          </>
        )}
        {!picking && !goal && choices.length === 0 && (
          <span className="text-slate-500 dark:text-slate-400">
            {mn ? 'Энэ бүлгийн бүх зорилтыг «Чадна» гэж үнэлсэн байна.' : 'You rated every objective of this chapter I can.'}
          </span>
        )}
      </div>

      {/* Choosing: one question on its own, closed with Cancel at any time */}
      {picking && (
        <div className="space-y-2">
          {intro && (
            <IntroLine
              text={
                young
                  ? mn
                    ? 'Өнөөдөр сайн сурахыг хүссэн 1–3 зорилтоо сонго. Өдрийн төгсгөлд «Чадна» болсон эсэхийг дахин үнэлнэ.'
                    : 'Choose 1 to 3 objectives you want to master today. At the end of the day you rate them again.'
                  : mn
                    ? '1–3 зорилт сонгоод өдрийн төгсгөлд дахин үнэл.'
                    : 'Pick 1 to 3 objectives; rate them again at the end of the day.'
              }
              mn={mn}
              onDismiss={dismiss}
            />
          )}
          <ul className="space-y-1.5">
            {shown.map(lo => {
              const on = picked.includes(lo.id);
              const full = !on && picked.length >= MAX_OBJECTIVES;
              return (
                <li key={lo.id}>
                  <button
                    type="button"
                    onClick={() => toggle(lo.id)}
                    disabled={full}
                    aria-pressed={on}
                    className={`flex w-full items-start gap-2 rounded-xl border-2 px-3 py-2 text-left text-sm transition-colors disabled:opacity-40 ${
                      on
                        ? 'border-emerald-500 bg-emerald-50 dark:border-teal-500 dark:bg-teal-950/40'
                        : 'border-slate-200 bg-white hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        on ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-400 bg-white dark:bg-slate-900'
                      }`}
                      aria-hidden="true"
                    >
                      {on && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className="min-w-0 text-slate-800 dark:text-slate-100">
                      <span className="font-mono text-[11px] font-bold text-slate-500">{lo.code}</span>
                      {aoTag(lo)}
                      {selfCheck.lo[lo.id] === false && (
                        <span className="ml-1 rounded bg-amber-100 px-1 text-[10px] font-bold text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
                          {mn ? 'Хараахан' : 'Not yet'}
                        </span>
                      )}
                      <span className="block leading-snug">{mn ? lo.mn : lo.en}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {!showAll && choices.length > SHOW_FIRST && (
            <button type="button" onClick={() => setShowAll(true)} className="text-xs font-bold text-slate-500 hover:underline dark:text-slate-400">
              {mn ? `Бусад зорилт (${choices.length - SHOW_FIRST})` : `More objectives (${choices.length - SHOW_FIRST})`}
            </button>
          )}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={save}
              disabled={picked.length === 0 && !goal}
              className="min-h-[40px] rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500 disabled:opacity-40"
            >
              {mn ? `Хадгалах (${picked.length}/${MAX_OBJECTIVES})` : `Save (${picked.length}/${MAX_OBJECTIVES})`}
            </button>
            <button type="button" onClick={() => setPicking(false)} className="min-h-[40px] rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">
              {mn ? 'Болих' : 'Cancel'}
            </button>
          </div>
        </div>
      )}

      {/* The chosen objectives, each with its end-of-day rating once given */}
      {!picking && goal && (
        <ul className="space-y-1.5">
          {goal.items.map(item => {
            const lo = byId.get(item.id);
            return (
              <li key={item.id} className="flex items-start justify-between gap-2 rounded-lg bg-white px-3 py-2 text-sm dark:bg-slate-900">
                <span className="min-w-0 text-slate-800 dark:text-slate-100">
                  <span className="font-mono text-[11px] font-bold text-slate-500">{item.code}</span>
                  {aoTag(lo)}
                  <span className="block leading-snug">{text(lo, item.code)}</span>
                </span>
                {item.after !== undefined && (
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-bold ${
                      item.after ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200'
                    }`}
                  >
                    {item.after ? (mn ? '✓ Чадна' : '✓ I can') : mn ? 'Хараахан' : 'Not yet'}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
