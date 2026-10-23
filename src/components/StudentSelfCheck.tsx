import React from 'react';
import { useApp, Programme } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { KEY_TERMS } from '../data/alevelKeyTerms';
import { alevelCourse, chapterLevel, isVisibleFor, visibleChapters } from '../data/alevelSyllabus';
import { readMastery } from './KeyTermTracker';
import type { TestAttempt } from '../types/chemistry';
import { analyseMistakes, LEVEL_STYLE, type MistakeLevel } from '../data/mistakeAnalysis';
import { courseMistakes } from '../data/courseScope';

// The student's own check of the course being studied: topics finished, key words mastered, the last test and the mistakes
// still open. Everything here counts only the chosen course, so 0620 numbers never appear under 9701 and the reverse.
// A tile with a tone takes the colour of its level (green, amber or red); a tile without one keeps the plain look
const Tile: React.FC<{
  label: string;
  value: string;
  percent: number;
  caption: string;
  tone?: MistakeLevel;
  action?: React.ReactNode;
}> = ({ label, value, percent, caption, tone, action }) => {
  const style = tone ? LEVEL_STYLE[tone] : undefined;
  return (
    <div className={`p-2.5 rounded-xl border space-y-1 ${style ? style.box : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800'}`}>
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</div>
      <div className={`text-base font-extrabold font-mono ${style ? style.text : 'text-slate-900 dark:text-white'}`}>{value}</div>
      <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div className={`h-full rounded-full ${style ? style.bar : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, Math.max(0, percent))}%` }} />
      </div>
      <div className="text-[10px] leading-snug text-slate-500 dark:text-slate-400">{caption}</div>
      {action}
    </div>
  );
};

export const StudentSelfCheck: React.FC<{ mn: boolean; programme: Programme; onOpenProgress: () => void }> = ({
  mn,
  programme,
  onOpenProgress
}) => {
  const { leitnerCards, stats, testAttempts, mistakes, courseChoice, jumpToTopic } = useApp();
  const alevel = programme === 'alevel';
  // The chosen level only: AS topics for AS, A Level topics for A Level
  const course = alevelCourse(courseChoice);
  const visibleKeyTerms = Object.entries(KEY_TERMS).filter(([id]) => isVisibleFor(chapterLevel(id), course));

  // Topics of this course only
  const chapters = alevel ? visibleChapters(ALEVEL_CHAPTERS, course) : CURRICULUM_CHAPTERS;
  const topicIds = new Set(chapters.flatMap(c => c.topics.map(t => t.id)));
  const topicsTotal = topicIds.size;
  const topicsDone = stats.completedTopics.filter(id => topicIds.has(id)).length;

  // Key words of this course: 0620 flashcards in box 4 or 5, or 9701 key terms ticked as explained
  let wordsDone = 0;
  let wordsTotal = 0;
  if (alevel) {
    const mastery = readMastery();
    wordsTotal = visibleKeyTerms.reduce((n, [, list]) => n + list.length, 0);
    wordsDone = visibleKeyTerms.reduce((n, [id, list]) => n + (mastery[id] ?? []).filter(t => list.includes(t)).length, 0);
  } else {
    wordsTotal = leitnerCards.length;
    wordsDone = leitnerCards.filter(c => c.box >= 4).length;
  }

  // The most recent 0620 test (the 9701 tests are not in the app yet)
  const lastTest = alevel
    ? undefined
    : testAttempts.reduce<TestAttempt | undefined>((best, a) => (!best || a.takenAt > best.takenAt ? a : best), undefined);

  // Open mistakes, grouped by topic: a topic missed twice or more is a repeated error
  const analysis = analyseMistakes(courseMistakes(mistakes, courseChoice));
  const worstTopic = analysis.topics[0];
  const mistakeCaption = analysis.level === 'clear'
    ? (mn ? 'Нээлттэй алдаа алга' : 'None open')
    : analysis.level === 'repeat'
      ? `${mn ? 'Тогтмол алддаг' : 'Keeps missing'}: ${worstTopic.syllabusRef}`
      : `${mn ? 'Цөөн алдсан' : 'A few misses'}: ${analysis.topics.length} ${mn ? 'сэдэв' : 'topics'}`;
  const pct = (done: number, total: number) => (total ? Math.round((done / total) * 100) : 0);

  return (
    <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-slate-950 border border-emerald-200/80 dark:border-slate-800 space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-extrabold text-slate-900 dark:text-white">{mn ? 'Өөрийгөө хянах' : 'Self-check'}</span>
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-white dark:bg-slate-900 border border-emerald-300 dark:border-teal-500/40 text-emerald-800 dark:text-teal-300">
          {alevel ? (course === 'a' ? 'A Level 9701' : 'AS Level 9701') : 'IGCSE 0620'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Tile
          label={mn ? 'Сэдэв дууссан' : 'Topics finished'}
          value={`${topicsDone} / ${topicsTotal}`}
          percent={pct(topicsDone, topicsTotal)}
          caption={mn ? 'Энэ хөтөлбөрийн сэдэв' : 'Topics in this course'}
        />
        <Tile
          label={alevel ? (mn ? '9701 түлхүүр үг' : '9701 key terms') : mn ? '0620 түлхүүр үг' : '0620 key words'}
          value={`${wordsDone} / ${wordsTotal}`}
          percent={pct(wordsDone, wordsTotal)}
          caption={alevel ? (mn ? 'Тайлбарлаж чадсан' : 'Explained') : mn ? 'Карт 4–5 хайрцагт' : 'Cards in box 4–5'}
        />
        <Tile
          label={mn ? 'Сүүлийн шалгалт' : 'Last test'}
          value={lastTest ? `${lastTest.percent}%` : '—'}
          percent={lastTest?.percent ?? 0}
          caption={
            alevel
              ? mn
                ? '9701-ийн шалгалт бэлэн биш'
                : 'No 9701 test yet'
              : lastTest
                ? mn
                  ? '60%-иас дээш бол дараагийн сэдэв нээгдэнэ'
                  : 'Above 60% opens the next topic'
                : mn
                  ? 'Шалгалт өгөөгүй байна'
                  : 'No test taken yet'
          }
        />
        <Tile
          label={mn ? 'Засах алдаа' : 'Mistakes to fix'}
          value={`${analysis.open}`}
          percent={analysis.logged ? Math.round(((analysis.logged - analysis.open) / analysis.logged) * 100) : 100}
          caption={mistakeCaption}
          tone={analysis.level}
          action={analysis.level === 'clear' ? undefined : (
            <button
              onClick={() => jumpToTopic(worstTopic.topicId)}
              className="text-left text-[10px] font-bold text-emerald-700 dark:text-teal-300 hover:underline"
            >
              {mn ? 'Давтах →' : 'Review →'}
            </button>
          )}
        />
      </div>

      <button
        onClick={onOpenProgress}
        className="w-full px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-teal-300 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-teal-500/40 hover:bg-emerald-100 dark:hover:bg-slate-800"
      >
        {mn ? 'Миний явцыг харах →' : 'See my progress →'}
      </button>
    </div>
  );
};
