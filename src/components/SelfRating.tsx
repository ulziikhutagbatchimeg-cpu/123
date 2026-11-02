import React, { useState } from 'react';
import { Check, CheckCircle2, RotateCcw } from 'lucide-react';
import { useApp, type CourseChoice } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { encourage } from '../lib/encourage';

// The student's own rating of how they learn: three questions, each from 1 (not at all) to 5 (very much). The ratings are kept on
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
  if (saved && !editing) {
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
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              {mn ? 'Өөрийн үнэлгээ' : 'Self-rating'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
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

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="space-y-1">
        <div className="text-sm font-extrabold text-slate-900 dark:text-white">{mn ? 'Өөрийн үнэлгээ' : 'Self-rating'}</div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {mn ? 'Өөрийгөө 1–5 оноогоор үнэлээрэй (1 = огт биш, 5 = маш их).' : 'Rate yourself from 1 (not at all) to 5 (very much).'}
        </p>
        <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{answered} / {ITEMS.length}</p>
      </div>

      <div className="space-y-4">
        {ITEMS.map((i, n) => (
          <div key={i.id} className="space-y-1.5">
            <div className="flex items-start gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
              <span
                className={`mt-px inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  ratings[i.id] !== undefined
                    ? 'bg-emerald-600 text-white'
                    : 'border border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400'
                }`}
              >
                {ratings[i.id] !== undefined ? <Check className="h-3 w-3" aria-hidden="true" /> : n + 1}
              </span>
              <span>{mn ? i.mn : i.en}</span>
            </div>
            <div className="flex gap-1.5">
              {SCALE.map(v => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={ratings[i.id] === v}
                  onClick={() => rate(i.id, v)}
                  className={`w-10 rounded-lg border py-1.5 text-xs font-bold transition-colors ${
                    ratings[i.id] === v
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

      {answered === ITEMS.length ? null : (
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          {mn ? 'Гурвууланг нь үнэлсний дараа хадгалагдана.' : 'Saved when all three are rated.'}
        </div>
      )}
    </section>
  );
};
