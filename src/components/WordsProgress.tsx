import React from 'react';
import { useApp, Programme } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { alevelCourse, chapterLevel, visibleChapters } from '../data/alevelSyllabus';
import { ALEVEL_GLOSSARY } from '../data/alevelGlossary';
import { readMastery } from './KeyTermTracker';

// How far the student has got with the words of the chosen course, chapter by chapter. It names the weakest chapter, so the
// game can start there. Only the chosen course is counted: 0620 cards for IGCSE, 9701 terms ticked as explained for A Level.
interface Row {
  id: string;
  title: string;
  total: number;
  done: number;
}

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</div>
    <div className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">{value}</div>
  </div>
);

export const WordsProgress: React.FC<{ programme: Programme; mn: boolean; onPickChapter: (id: string) => void }> = ({
  programme,
  mn,
  onPickChapter
}) => {
  const { leitnerCards, courseChoice } = useApp();
  const alevel = programme === 'alevel';

  let rows: Row[];
  let dueToday = 0;
  if (alevel) {
    const mastery = readMastery();
    rows = visibleChapters(ALEVEL_CHAPTERS, alevelCourse(courseChoice)).map(c => {
      const names = (ALEVEL_GLOSSARY[c.id] ?? []).map(e => e.term.en);
      const done = (mastery[c.id] ?? []).filter(t => names.includes(t)).length;
      const tag = chapterLevel(c.id) === 'as' ? 'AS' : 'A Level';
      return { id: c.id, title: `${mn ? c.titleMn : c.titleEn} (${tag})`, total: names.length, done };
    });
  } else {
    const chapterOf = new Map<string, string>();
    CURRICULUM_CHAPTERS.forEach(c => c.topics.forEach(t => chapterOf.set(t.id, c.id)));
    rows = CURRICULUM_CHAPTERS.map(c => {
      const cards = leitnerCards.filter(card => chapterOf.get(card.topicId) === c.id);
      return {
        id: c.id,
        title: mn ? c.titleMn : c.titleEn,
        total: cards.length,
        done: cards.filter(card => card.box >= 4).length
      };
    });
    dueToday = leitnerCards.filter(card => card.nextReviewDate <= Date.now()).length;
  }

  const total = rows.reduce((n, r) => n + r.total, 0);
  const done = rows.reduce((n, r) => n + r.done, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const finished = rows.filter(r => r.total > 0 && r.done >= r.total).length;
  const weakest = rows.filter(r => r.total > 0 && r.done < r.total).sort((a, b) => a.done / a.total - b.done / b.total)[0];

  const cheer =
    pct >= 70
      ? mn
        ? 'Маш сайн! Үлдсэн үгсийг дуусгаарай.'
        : 'Excellent! Finish the last words.'
      : pct >= 30
        ? mn
          ? 'Сайн явж байна. Сул бүлгээсээ эхэлнэ үү.'
          : 'Good progress. Start with your weakest chapter.'
        : mn
          ? 'Эхэлсэн нь сайн. Өдөр бүр 10 үг давтаарай.'
          : 'A good start. Review 10 words a day.';

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label={mn ? 'Нийт үг' : 'Words'} value={`${total}`} />
        <Stat label={mn ? 'Цээжилсэн' : 'Learned'} value={`${done} · ${pct}%`} />
        {alevel ? (
          <Stat label={mn ? 'Бүлэг дууссан' : 'Chapters done'} value={`${finished} / ${rows.length}`} />
        ) : (
          <Stat label={mn ? 'Өнөөдөр давтах' : 'Due today'} value={`${dueToday}`} />
        )}
      </div>

      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300">{cheer}</p>

      {weakest && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900">
          <span className="text-xs text-slate-700 dark:text-slate-200">
            {mn ? 'Хамгийн сул бүлэг' : 'Weakest chapter'}: <b>{weakest.title}</b> · {Math.round((weakest.done / weakest.total) * 100)}%
          </span>
          <button
            onClick={() => onPickChapter(weakest.id)}
            className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-black"
          >
            {mn ? 'Энэ бүлгийг тоглох →' : 'Play this chapter →'}
          </button>
        </div>
      )}
    </section>
  );
};
