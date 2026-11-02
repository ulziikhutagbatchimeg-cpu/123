import React, { useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { useApp, type CourseChoice } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { encourage } from '../lib/encourage';
import { HIGHLIGHT_HEADING, HIGHLIGHT_PILL, HIGHLIGHT_SUB } from '../lib/highlight';

// The student's own rating of how they learn: five questions, each from 1 (not at all) to 5 (very much). The ratings are kept on
// this device with the progress of that day, so later the same questions show how the student's own learning has changed, and
// whether the goals are being met.
export interface NowProgress {
  topicsFinished: number;
  topicsTotal: number;
  exitAverage: number | null;
}

const ITEMS = [
  {
    id: 'web',
    en: 'Using a website for lessons and tasks is easy for me.',
    mn: 'Вэб дээр хичээл үзэж, даалгавар хийх нь надад хялбар.'
  },
  {
    id: 'alone',
    en: 'I can study on my own, without a teacher beside me.',
    mn: 'Багшгүйгээр бие даан суралцах чадвартай.'
  },
  {
    id: 'lab',
    en: 'I have experience of practical (lab) lessons.',
    mn: 'Туршилттай (лабораторийн) хичээлд оролцсон туршлагатай.'
  },
  {
    id: 'goals',
    en: 'I set my own study goals and keep to them.',
    mn: 'Өөрийн суралцах зорилгыг өөрөө тавьж, биелүүлдэг.'
  },
  {
    id: 'mistakes',
    en: 'I find and correct my own mistakes.',
    mn: 'Алдаагаа өөрөө олж, засдаг.'
  }
];

const SCALE = [1, 2, 3, 4, 5];
const KEY = 'chem_self_rating';

interface Saved {
  courseId: CourseChoice;
  ratings: Record<string, number>;
  baseline: NowProgress;
  at: number;
}

const readSaved = (courseId: CourseChoice): Saved | null => {
  try {
    const raw = window.localStorage.getItem(`${KEY}_${courseId}`);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
};

const writeSaved = (result: Saved) => {
  try {
    window.localStorage.setItem(`${KEY}_${result.courseId}`, JSON.stringify(result));
  } catch {
    // Storage can be blocked; the rating then shows for this visit only
  }
};

export const SelfRating: React.FC<{ now: NowProgress }> = ({ now }) => {
  const { mode } = useLanguage();
  const { courseChoice } = useApp();
  const mn = mode === 'mn';

  const [saved, setSaved] = useState<Saved | null>(() => readSaved(courseChoice));
  const [editing, setEditing] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const rate = (id: string, value: number) => {
    const next = { ...ratings, [id]: value };
    setRatings(next);
    if (ITEMS.every(i => next[i.id] !== undefined)) {
      const result: Saved = { courseId: courseChoice, ratings: next, baseline: now, at: Date.now() };
      writeSaved(result);
      setSaved(result);
      setEditing(false);
      setRatings({});
      encourage('checked');
    }
  };

  const startAgain = () => {
    setRatings({});
    setEditing(true);
  };

  // The ratings and the progress at that time, beside the progress now
  if (saved && !editing && ITEMS.every(i => saved.ratings[i.id] !== undefined)) {
    const average = (
      ITEMS.map(i => saved.ratings[i.id]).reduce((n, v) => n + v, 0) / ITEMS.length
    ).toFixed(1);
    const rows = [
      {
        label: mn ? 'Дууссан сэдэв' : 'Topics finished',
        start: `${saved.baseline.topicsFinished} / ${saved.baseline.topicsTotal}`,
        now: `${now.topicsFinished} / ${now.topicsTotal}`
      },
      {
        label: mn ? 'Хичээлийн шалгалтын дундаж' : 'Lesson ticket average',
        start: saved.baseline.exitAverage === null ? '—' : `${saved.baseline.exitAverage}%`,
        now: now.exitAverage === null ? '—' : `${now.exitAverage}%`
      }
    ];
    return (
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className={HIGHLIGHT_HEADING}>
              {mn ? 'Өөрийн үнэлгээ' : 'Self-rating'}
            </div>
            <p className={HIGHLIGHT_SUB}>
              {mn ? 'Эхэлсэн үеийн дүн, одоогийн явцтай харьцуулсан.' : 'The rating at the start, beside your progress now.'}
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 font-mono text-xs font-bold text-emerald-800 dark:bg-teal-950/60 dark:text-teal-300">
            {mn ? 'Дундаж' : 'Average'} {average} / 5
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
              {ITEMS.map(i => (
                <tr key={i.id} className="border-b border-slate-100 text-slate-700 dark:border-slate-800/70 dark:text-slate-300">
                  <td className="py-2 pr-3 font-bold text-slate-900 dark:text-white">{mn ? i.mn : i.en}</td>
                  <td className="py-2 pr-3 font-mono">{saved.ratings[i.id]} / 5</td>
                  <td className="py-2 font-mono">—</td>
                </tr>
              ))}
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
          onClick={startAgain}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline dark:text-teal-300"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          {mn ? 'Дахин үнэлэх' : 'Rate again'}
        </button>
      </section>
    );
  }

  const answered = ITEMS.filter(i => ratings[i.id] !== undefined).length;
  const percent = Math.round((answered / ITEMS.length) * 100);

  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className={HIGHLIGHT_HEADING}>{mn ? 'Өөрийн үнэлгээ' : 'Self-rating'}</div>
          <p className={HIGHLIGHT_SUB}>
            {mn ? 'Өөрийгөө 1–5 оноогоор үнэлээрэй.' : 'Rate yourself from 1 (not at all) to 5 (very much).'}
          </p>
        </div>
        <span className={HIGHLIGHT_PILL}>
          {answered} / {ITEMS.length}
        </span>
      </div>

      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
        role="progressbar"
        aria-label={mn ? 'Үнэлсэн асуулт' : 'Questions rated'}
        aria-valuemin={0}
        aria-valuemax={ITEMS.length}
        aria-valuenow={answered}
      >
        <div className="h-full rounded-full bg-emerald-500 transition-all dark:bg-teal-400" style={{ width: `${percent}%` }} />
      </div>

      <ol className="divide-y divide-slate-100 dark:divide-slate-800">
        {ITEMS.map((i, n) => {
          const value = ratings[i.id];
          const done = value !== undefined;
          const text = mn ? i.mn : i.en;
          return (
            <li key={i.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="flex min-w-0 items-start gap-3">
                <span
                  className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${
                    done
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  {done ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : n + 1}
                </span>
                <span className="text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100">{text}</span>
              </div>

              <div
                role="radiogroup"
                aria-label={text}
                className="flex shrink-0 gap-1 self-start rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-950 sm:self-auto"
              >
                {SCALE.map(v => (
                  <button
                    key={v}
                    type="button"
                    role="radio"
                    aria-checked={value === v}
                    onClick={() => rate(i.id, v)}
                    className={`h-9 w-9 rounded-lg text-sm font-bold transition-colors sm:h-10 sm:w-11 ${
                      value === v
                        ? 'bg-emerald-600 text-white shadow-sm dark:bg-teal-600'
                        : 'text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-900'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
        <span>{mn ? '1 = огт биш · 5 = маш их' : '1 = not at all · 5 = very much'}</span>
        {answered < ITEMS.length && (
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            {mn ? 'Бүгдийг үнэлсний дараа хадгалагдана.' : 'Saved when all five are rated.'}
          </span>
        )}
      </div>
    </section>
  );
};
