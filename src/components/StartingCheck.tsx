import React, { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { useApp, type CourseChoice } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { courseTopics } from '../data/courseScope';
import { IGCSE_STARTING, SELF_ITEMS, type ChoiceId, type StartingItem } from '../data/startingCheckQuestions';
import { topicQuizMcq } from '../lib/topicQuestions';
import { recordActivity } from '../lib/activity';
import { encourage } from '../lib/encourage';
import type { ExamQuestion } from '../types/chemistry';
import { ChemText } from './common/ChemText';

// The starting check tests the programme before this one: IGCSE 0620 starts from basic chemistry, AS Level 9701 from the IGCSE
// 0620 content, and A Level 9701 from the AS Level content. It has ten multiple-choice questions and three questions about how
// the student learns. Each answer is marked at once. The result is kept on this device, recorded as a practice result, and
// compared with the progress on the dashboard.
const COUNT = 10;
const RESULT_KEY = 'chem_starting_check';

export interface NowProgress {
  topicsFinished: number;
  topicsTotal: number;
  exitAverage: number | null;
}

interface SavedResult {
  courseId: CourseChoice;
  score: number;
  total: number;
  self: Record<string, number>;
  baseline: NowProgress;
  at: number;
}

const readSaved = (courseId: CourseChoice): SavedResult | null => {
  try {
    const raw = window.localStorage.getItem(`${RESULT_KEY}_${courseId}`);
    return raw ? (JSON.parse(raw) as SavedResult) : null;
  } catch {
    return null;
  }
};

const writeSaved = (result: SavedResult) => {
  try {
    window.localStorage.setItem(`${RESULT_KEY}_${result.courseId}`, JSON.stringify(result));
  } catch {
    // Storage can be blocked; the result then shows for this visit only
  }
};

// Spreads n questions evenly over a list, so they come from the whole programme and not only its first chapters
const spread = (list: StartingItem[], n: number): StartingItem[] => {
  if (list.length <= n) return list;
  return Array.from({ length: n }, (_, i) => list[Math.floor((i * list.length) / n)]);
};

// The easiest question of a topic: the lowest difficulty score, which keeps the check to recall rather than multi-step work
const easiest = (qs: ExamQuestion[]): ExamQuestion | undefined =>
  [...qs].sort((a, b) => (a.difficultyScore ?? 5) - (b.difficultyScore ?? 5))[0];

const toItem = (q: ExamQuestion): StartingItem | null => {
  if (!q.correctOption || !q.options?.length) return null;
  return {
    id: q.id,
    topicId: q.topicId,
    questionEn: q.questionTextEn,
    questionMn: q.questionTextMn,
    options: q.options.map(o => ({ id: o.id, textEn: o.textEn, textMn: o.textMn })),
    correct: q.correctOption,
    explainEn: q.misconceptionDiagnosisEn,
    explainMn: q.misconceptionDiagnosisMn
  };
};

// The questions of the previous programme for this course
const priorItems = (courseChoice: CourseChoice): StartingItem[] => {
  if (courseChoice === 'igcse') return IGCSE_STARTING;
  const prior = courseTopics(courseChoice === 'as' ? 'igcse' : 'as');
  const items = prior.flatMap(topic => {
    const q = easiest(topicQuizMcq(topic));
    const item = q ? toItem(q) : null;
    return item ? [item] : [];
  });
  return spread(items, COUNT);
};

const SCALE = [1, 2, 3, 4, 5];

export const StartingCheck: React.FC<{ now: NowProgress }> = ({ now }) => {
  const { mode } = useLanguage();
  const { courseChoice, jumpToTopic } = useApp();
  const mn = mode === 'mn';
  const items = useMemo(() => priorItems(courseChoice), [courseChoice]);

  const [picked, setPicked] = useState<Record<string, ChoiceId>>({});
  const [self, setSelf] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState<SavedResult | null>(() => readSaved(courseChoice));
  const [retaking, setRetaking] = useState(false);

  const wrong = items.filter(i => picked[i.id] !== undefined && picked[i.id] !== i.correct);

  // When the last answer is given, the result is saved, recorded and shown
  const maybeFinish = (nextPicked: Record<string, ChoiceId>, nextSelf: Record<string, number>) => {
    const done = items.every(i => nextPicked[i.id] !== undefined) && SELF_ITEMS.every(s => nextSelf[s.id] !== undefined);
    if (!done) return;
    const score = items.filter(i => nextPicked[i.id] === i.correct).length;
    const result: SavedResult = { courseId: courseChoice, score, total: items.length, self: nextSelf, baseline: now, at: Date.now() };
    writeSaved(result);
    setSaved(result);
    setRetaking(false);
    recordActivity({
      kind: 'practice',
      course: courseChoice,
      percent: Math.round((score / items.length) * 100),
      label: { en: 'Starting check', mn: 'Гарааны үнэлгээ' }
    });
    encourage('checked');
  };

  const choose = (item: StartingItem, option: ChoiceId) => {
    if (picked[item.id] !== undefined) return;
    const nextPicked = { ...picked, [item.id]: option };
    setPicked(nextPicked);
    encourage(option === item.correct ? 'correct' : 'wrong');
    maybeFinish(nextPicked, self);
  };

  const rate = (id: string, value: number) => {
    if (self[id] !== undefined) return;
    const nextSelf = { ...self, [id]: value };
    setSelf(nextSelf);
    maybeFinish(picked, nextSelf);
  };

  const restart = () => {
    setPicked({});
    setSelf({});
    setRetaking(true);
  };

  if (items.length === 0) return null;

  // The result, once the check is finished: the start beside the progress now
  if (saved && !retaking) {
    const selfValues = SELF_ITEMS.map(s => saved.self[s.id]).filter((v): v is number => typeof v === 'number');
    const selfAverage = selfValues.length ? (selfValues.reduce((n, v) => n + v, 0) / selfValues.length).toFixed(1) : '—';
    const rows = [
      {
        label: mn ? 'Мэдлэг (өмнөх хөтөлбөр)' : 'Knowledge (previous programme)',
        start: `${saved.score} / ${saved.total}`,
        now: '—'
      },
      {
        label: mn ? 'Дууссан сэдэв' : 'Topics finished',
        start: `${saved.baseline.topicsFinished} / ${saved.baseline.topicsTotal}`,
        now: `${now.topicsFinished} / ${now.topicsTotal}`
      },
      {
        label: mn ? 'Хичээлийн шалгалтын дундаж' : 'Lesson ticket average',
        start: saved.baseline.exitAverage === null ? '—' : `${saved.baseline.exitAverage}%`,
        now: now.exitAverage === null ? '—' : `${now.exitAverage}%`
      },
      {
        label: mn ? 'Өөрийн үнэлгээ (дундаж, 1–5)' : 'Self-rating (average, 1–5)',
        start: selfAverage,
        now: '—'
      }
    ];
    return (
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">{mn ? 'Гарааны үнэлгээ' : 'Starting check'}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {mn ? 'Эхэлсэн үеийн түвшин, одоогийн явцтай харьцуулсан дүн.' : 'Where you started, beside your progress now.'}
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 font-mono text-xs font-bold text-emerald-800 dark:bg-teal-950/60 dark:text-teal-300">
            {saved.score} / {saved.total}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="py-2 pr-3 font-bold">{mn ? 'Үзүүлэлт' : 'Measure'}</th>
                <th className="py-2 pr-3 font-bold">{mn ? 'Эхлэхэд' : 'At the start'}</th>
                <th className="py-2 font-bold">{mn ? 'Одоо' : 'Now'}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.label} className="border-b border-slate-100 text-slate-700 dark:border-slate-800/70 dark:text-slate-300">
                  <td className="py-2 pr-3 font-bold text-slate-900 dark:text-white">{r.label}</td>
                  <td className="py-2 pr-3 font-mono">{r.start}</td>
                  <td className="py-2 font-mono">{r.now}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={restart}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline dark:text-teal-300"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          {mn ? 'Дахин өгөх' : 'Try again'}
        </button>
      </section>
    );
  }

  const answered = items.filter(i => picked[i.id] !== undefined).length;
  const selfAnswered = SELF_ITEMS.filter(s => self[s.id] !== undefined).length;

  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="space-y-1">
        <div className="text-sm font-extrabold text-slate-900 dark:text-white">{mn ? 'Гарааны үнэлгээ' : 'Starting check'}</div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {mn
            ? `${items.length} асуулт өмнөх хөтөлбөрийнхөө агуулгаас, дараа нь 3 өөрийн үнэлгээ. Хариултыг шууд үнэлнэ.`
            : `${items.length} questions from the previous programme, then 3 questions about you. Each answer is marked at once.`}
        </p>
        <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
          {answered} / {items.length} · {selfAnswered} / {SELF_ITEMS.length}
        </p>
      </div>

      <ol className="space-y-4">
        {items.map((item, i) => {
          const choice = picked[item.id];
          const isAnswered = choice !== undefined;
          return (
            <li key={item.id} className="space-y-2.5">
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {i + 1}. <ChemText>{mn ? item.questionMn : item.questionEn}</ChemText>
              </div>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {item.options.map(opt => {
                  const right = opt.id === item.correct;
                  const isChosen = choice === opt.id;
                  const tone = !isAnswered
                    ? 'border-slate-300 bg-slate-50 text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                    : right
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : isChosen
                        ? 'border-rose-600 bg-rose-600 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-500';
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => choose(item, opt.id)}
                      className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors disabled:cursor-default ${tone}`}
                    >
                      <ChemText>{mn ? opt.textMn : opt.textEn}</ChemText>
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  <ChemText>{mn ? item.explainMn : item.explainEn}</ChemText>
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {wrong.length > 0 && answered === items.length && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
          <span>{mn ? 'Дараагийн алхам: эдгээр сэдвийг дахин үзээрэй.' : 'Next step: go over these topics again.'}</span>
          {wrong.slice(0, 2).map(q =>
            q.topicId ? (
              <button
                key={q.id}
                type="button"
                onClick={() => jumpToTopic(q.topicId as string)}
                className="rounded-lg border border-emerald-300 bg-white px-2.5 py-1 font-bold text-emerald-800 hover:bg-emerald-100 dark:border-teal-700 dark:bg-slate-900 dark:text-teal-300"
              >
                {q.topicId} →
              </button>
            ) : null
          )}
        </div>
      )}

      <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {mn ? 'Өөрийн үнэлгээ (1 = огт биш, 5 = маш их)' : 'About you (1 = not at all, 5 = very much)'}
        </div>
        {SELF_ITEMS.map(s => (
          <div key={s.id} className="space-y-1.5">
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{mn ? s.mn : s.en}</div>
            <div className="flex gap-1.5">
              {SCALE.map(v => (
                <button
                  key={v}
                  type="button"
                  disabled={self[s.id] !== undefined}
                  aria-pressed={self[s.id] === v}
                  onClick={() => rate(s.id, v)}
                  className={`w-9 rounded-lg border py-1.5 text-xs font-bold transition-colors disabled:cursor-default ${
                    self[s.id] === v
                      ? 'border-transparent bg-emerald-600 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {retaking && (
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          {mn ? 'Шинэ үнэлгээ дуусахад өмнөхийг орлоно.' : 'The new result replaces the old one when it is finished.'}
        </div>
      )}
    </section>
  );
};
