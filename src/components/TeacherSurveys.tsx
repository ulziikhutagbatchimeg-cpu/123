import React, { useEffect, useMemo, useState } from 'react';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { HARDEST_OPTIONS, LIKED_OPTIONS, loadSurveysOf, type Option, type SavedSurvey } from '../lib/sectionSurvey';
import { loadSelfRatingsOf, type CloudSelfRating } from '../lib/selfRatingCloud';
import { ITEMS as RATING_ITEMS } from './SelfRating';

// The programmes by their course id, as the student's rating names them
const PROGRAMME_NAME: Record<string, string> = { igcse: 'IGCSE 0620', as: 'AS 9701', a: 'A Level 9701' };

// The students' answers to the web survey, after each section: charts of the answers, by section and in total, with the
// students' own words. A student's answer is read by the teacher only.
const CARD = 'bg-slate-100 border border-slate-400 rounded-2xl p-6 space-y-3';
const HEAD = 'text-xs font-bold text-slate-900 uppercase tracking-wider';

// Horizontal bars, each as a share of the largest count
const Bars: React.FC<{ rows: { label: string; count: number }[] }> = ({ rows }) => {
  const max = Math.max(1, ...rows.map(r => r.count));
  return (
    <div className="space-y-1.5">
      {rows.map(r => (
        <div key={r.label} className="flex items-center gap-3 text-xs">
          <span className="w-52 shrink-0 truncate text-slate-700">{r.label}</span>
          <div className="flex-1 h-3 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full bg-violet-500" style={{ width: `${(r.count / max) * 100}%` }} />
          </div>
          <span className="w-10 text-right font-mono text-slate-600">{r.count}</span>
        </div>
      ))}
    </div>
  );
};

// Columns of 1 to 5 votes for a scale question
const Scale: React.FC<{ values: number[] }> = ({ values }) => {
  const counts = [1, 2, 3, 4, 5].map(n => values.filter(v => v === n).length);
  const max = Math.max(1, ...counts);
  return (
    <div className="flex items-end gap-2 h-28">
      {counts.map((c, i) => (
        <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
          <span className="text-[11px] font-mono text-slate-700">{c}</span>
          <div className="w-full rounded-t bg-violet-500" style={{ height: `${(c / max) * 80}%`, minHeight: c > 0 ? 4 : 0 }} />
          <span className="text-[11px] font-mono text-slate-600">{i + 1}</span>
        </div>
      ))}
    </div>
  );
};

const average = (values: number[]): string => (values.length ? (values.reduce((n, v) => n + v, 0) / values.length).toFixed(1) : '—');

export const TeacherSurveys: React.FC<{ uids: string[]; names: Record<string, string>; mn: boolean }> = ({ uids, names, mn }) => {
  const [surveys, setSurveys] = useState<SavedSurvey[] | null>(null);
  const [ratingList, setRatingList] = useState<CloudSelfRating[] | null>(null);
  const key = uids.join(',');

  useEffect(() => {
    let cancelled = false;
    setSurveys(null);
    loadSurveysOf(uids)
      .then(list => {
        if (!cancelled) setSurveys(list);
      })
      .catch(() => {
        if (!cancelled) setSurveys([]);
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  // The students' self-ratings, saved on entry and as the lessons go on
  useEffect(() => {
    let cancelled = false;
    setRatingList(null);
    loadSelfRatingsOf(uids)
      .then(list => {
        if (!cancelled) setRatingList(list);
      })
      .catch(() => {
        if (!cancelled) setRatingList([]);
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  // The section's title, from the curriculum
  const topicTitle = useMemo(() => {
    const map: Record<string, string> = {};
    CURRICULUM_CHAPTERS.forEach(ch =>
      ch.topics.forEach(t => {
        map[t.id] = mn ? t.titleMn : t.titleEn;
      })
    );
    return (id: string) => map[id] ?? id;
  }, [mn]);

  // The latest self-rating of each student, for each programme
  const latestRatings = useMemo(() => {
    const map = new Map<string, CloudSelfRating>();
    (ratingList ?? []).forEach(r => {
      const k = `${r.uid}|${r.courseId}`;
      const prev = map.get(k);
      if (!prev || r.savedAt > prev.savedAt) map.set(k, r);
    });
    return [...map.values()];
  }, [ratingList]);

  if (surveys === null || ratingList === null) return <p className="text-sm text-slate-600">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>;

  const averageOf = (values: (number | undefined)[]): string => {
    const nums = values.filter((v): v is number => typeof v === 'number');
    return nums.length ? (nums.reduce((n, v) => n + v, 0) / nums.length).toFixed(1) : '—';
  };

  // The five questions asked when the student joins a programme, and again as the lessons go on
  const ratingBlock =
    latestRatings.length === 0 ? null : (
      <div className={CARD}>
        <div className={HEAD}>{mn ? 'Элсэхэд өгсөн үнэлгээ (1–5)' : 'Self-rating given on entry (1–5)'}</div>
        <div className="space-y-1.5">
          {RATING_ITEMS.map(item => {
            const avg = Number(averageOf(latestRatings.map(r => r.ratings[item.id])));
            return (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <span className="w-80 shrink-0 text-slate-700">{mn ? item.mn : item.en}</span>
                <div className="flex-1 h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${(avg / 5) * 100}%` }} />
                </div>
                <span className="w-12 text-right font-mono text-slate-700">{averageOf(latestRatings.map(r => r.ratings[item.id]))}</span>
              </div>
            );
          })}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-600 font-mono text-left">
                <th className="py-1.5 pr-3 font-normal">{mn ? 'Сурагч' : 'Student'}</th>
                <th className="py-1.5 pr-3 font-normal">{mn ? 'Хөтөлбөр' : 'Programme'}</th>
                {RATING_ITEMS.map((item, i) => (
                  <th key={item.id} className="py-1.5 pr-2 font-normal text-center" title={mn ? item.mn : item.en}>
                    {i + 1}
                  </th>
                ))}
                <th className="py-1.5 pr-3 font-normal text-right">{mn ? 'Дундаж' : 'Average'}</th>
                <th className="py-1.5 font-normal text-right">{mn ? 'Огноо' : 'Date'}</th>
              </tr>
            </thead>
            <tbody>
              {latestRatings.map(r => (
                <tr key={`${r.uid}-${r.courseId}`} className="border-t border-slate-400 text-slate-800">
                  <td className="py-1.5 pr-3">{names[r.uid] ?? (mn ? 'Сурагч' : 'Student')}</td>
                  <td className="py-1.5 pr-3 font-mono">{PROGRAMME_NAME[r.courseId] ?? r.courseId}</td>
                  {RATING_ITEMS.map(item => (
                    <td key={item.id} className="py-1.5 pr-2 text-center font-mono">
                      {r.ratings[item.id] ?? '—'}
                    </td>
                  ))}
                  <td className="py-1.5 pr-3 text-right font-mono">{averageOf(RATING_ITEMS.map(i => r.ratings[i.id]))}</td>
                  <td className="py-1.5 text-right font-mono text-slate-600">{r.savedAt.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-600">
          {mn
            ? 'Сурагч хичээлээ явж байгаад үнэлгээгээ дахин өгдөг. Энд хамгийн сүүлийн үнэлгээг харуулж байна.'
            : 'Students rate themselves again as the lessons go on. The latest rating is shown here.'}
        </p>
      </div>
    );

  if (surveys.length === 0) {
    return (
      <div className="space-y-4">
        {ratingBlock}
        <p className="text-sm text-slate-600">{mn ? 'Санал асуулгад хариулсан сурагч алга.' : 'No student has answered the survey yet.'}</p>
      </div>
    );
  }

  const optionRows = (options: Option[], values: string[]) =>
    options.map(o => ({ label: mn ? o.mn : o.en, count: values.filter(v => v === o.id).length }));

  const hardest = optionRows(HARDEST_OPTIONS, surveys.map(s => s.hardest));
  const liked = optionRows(LIKED_OPTIONS, surveys.map(s => s.liked));
  const students = new Set(surveys.map(s => s.uid)).size;

  // Each section: how many answered it, and the averages of its three scales
  const bySection = new Map<string, SavedSurvey[]>();
  surveys.forEach(s => bySection.set(s.topicId, [...(bySection.get(s.topicId) ?? []), s]));
  const sections = [...bySection.entries()].sort((a, b) => topicTitle(a[0]).localeCompare(topicTitle(b[0])));

  const texts = surveys.filter(s => s.text.trim() !== '').sort((a, b) => b.savedAt.localeCompare(a.savedAt)).slice(0, 12);

  return (
    <div className="space-y-4">
      {ratingBlock}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: mn ? 'Хариулсан сурагч' : 'Students answered', value: `${students}` },
          { label: mn ? 'Хариулт нийт' : 'Answers in total', value: `${surveys.length}` },
          { label: mn ? 'Ойлгосон (дунд)' : 'Understood (avg)', value: average(surveys.map(s => s.understood)) },
          { label: mn ? 'Санал болгох (дунд)' : 'Would recommend (avg)', value: average(surveys.map(s => s.recommend)) }
        ].map(t => (
          <div key={t.label} className="p-4 rounded-xl bg-slate-200 border border-slate-400">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{t.label}</div>
            <div className="text-xl font-extrabold font-mono text-slate-900">{t.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={CARD}>
          <div className={HEAD}>{mn ? 'Ойлгосон байдал (1–5)' : 'How well it was understood (1–5)'}</div>
          <Scale values={surveys.map(s => s.understood)} />
        </div>
        <div className={CARD}>
          <div className={HEAD}>{mn ? 'Өөрөө судлах (1–5)' : 'Studying on their own (1–5)'}</div>
          <Scale values={surveys.map(s => s.selfStudy)} />
        </div>
        <div className={CARD}>
          <div className={HEAD}>{mn ? 'Санал болгох (1–5)' : 'Would recommend the site (1–5)'}</div>
          <Scale values={surveys.map(s => s.recommend)} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={CARD}>
          <div className={HEAD}>{mn ? 'Хамгийн хүндэвтэр зүйл' : 'What was hardest'}</div>
          <Bars rows={hardest} />
        </div>
        <div className={CARD}>
          <div className={HEAD}>{mn ? 'Хамгийн их таалагдсан зүйл' : 'What they liked most'}</div>
          <Bars rows={liked} />
        </div>
      </div>

      <div className={CARD}>
        <div className={HEAD}>{mn ? 'Хичээл тус бүрээр' : 'By section'}</div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-600 font-mono text-left">
                <th className="py-1.5 pr-3 font-normal">{mn ? 'Хичээл' : 'Section'}</th>
                <th className="py-1.5 pr-3 font-normal text-right">{mn ? 'Хариулт' : 'Answers'}</th>
                <th className="py-1.5 pr-3 font-normal text-right">{mn ? 'Ойлгосон' : 'Understood'}</th>
                <th className="py-1.5 pr-3 font-normal text-right">{mn ? 'Өөрөө судлах' : 'Self-study'}</th>
                <th className="py-1.5 font-normal text-right">{mn ? 'Санал болгох' : 'Recommend'}</th>
              </tr>
            </thead>
            <tbody>
              {sections.map(([id, list]) => (
                <tr key={id} className="border-t border-slate-400 text-slate-800">
                  <td className="py-1.5 pr-3">{topicTitle(id)}</td>
                  <td className="py-1.5 pr-3 text-right font-mono">{list.length}</td>
                  <td className="py-1.5 pr-3 text-right font-mono">{average(list.map(s => s.understood))}</td>
                  <td className="py-1.5 pr-3 text-right font-mono">{average(list.map(s => s.selfStudy))}</td>
                  <td className="py-1.5 text-right font-mono">{average(list.map(s => s.recommend))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {texts.length > 0 && (
        <div className={CARD}>
          <div className={HEAD}>{mn ? 'Сурагчдын санал (сүүлийн 12)' : 'Students’ comments (latest 12)'}</div>
          <ul className="space-y-2">
            {texts.map(s => (
              <li key={`${s.uid}-${s.topicId}`} className="p-3 rounded-lg bg-slate-200 border border-slate-400 text-xs">
                <div className="flex flex-wrap justify-between gap-2 text-slate-600">
                  <span className="font-bold text-slate-900">{names[s.uid] ?? (mn ? 'Сурагч' : 'Student')}</span>
                  <span className="font-mono">{topicTitle(s.topicId)}</span>
                </div>
                <p className="mt-1 text-slate-800">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
