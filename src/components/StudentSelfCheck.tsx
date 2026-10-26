import React from 'react';
import { useApp, Programme } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { KEY_TERMS } from '../data/alevelKeyTerms';
import { alevelCourse, chapterLevel, isVisibleFor, visibleChapters } from '../data/alevelSyllabus';
import { readMastery } from './KeyTermTracker';
import type { PaperType, TestAttempt } from '../types/chemistry';
import { analyseMistakes, LEVEL_STYLE, type MistakeLevel } from '../data/mistakeAnalysis';
import { courseAttempts, courseMistakes, courseTopics } from '../data/courseScope';
import { paperResults, weakTopics } from '../data/practiceAnalysis';
import { MOCK_TESTS } from '../data/mockTests';

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

const PAPER_LABEL: Record<PaperType, { mn: string; en: string }> = {
  'Paper 2': { mn: 'Paper 2 · сонголттой', en: 'Paper 2 · multiple choice' },
  'Paper 4': { mn: 'Paper 4 · теори', en: 'Paper 4 · theory' },
  'Paper 6': { mn: 'Paper 6 · практик', en: 'Paper 6 · alternative to practical' }
};

export const StudentSelfCheck: React.FC<{ mn: boolean; programme: Programme; onOpenProgress: () => void }> = ({
  mn,
  programme,
  onOpenProgress
}) => {
  const { leitnerCards, stats, testAttempts, mistakes, attempts, courseChoice, jumpToTopic } = useApp();
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

  // Tests of this course, newest first (9701 tests are not in the app yet)
  const courseTests = alevel ? [] : [...testAttempts].sort((x, y) => y.takenAt - x.takenAt);
  // The questions answered on this course: accuracy by paper, and the topics to review first
  const practice = courseAttempts(attempts, courseChoice);
  const papers = paperResults(practice);
  const weak = weakTopics(practice);
  const courseTopicList = courseTopics(courseChoice);

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

      {/* Tests taken in this course, newest first */}
      {!alevel && (
        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {mn ? 'Шалгалтууд' : 'Tests taken'}
          </div>
          {courseTests.length === 0 ? (
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {mn ? 'Шалгалт өгөөгүй байна' : 'No test taken yet'}
            </div>
          ) : (
            <ul className="space-y-1">
              {courseTests.slice(0, 5).map(a => {
                const test = MOCK_TESTS.find(x => x.id === a.testId);
                return (
                  <li key={a.id} className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="truncate text-slate-800 dark:text-slate-200">
                      {test ? (mn ? test.titleMn : test.titleEn) : a.testId}
                    </span>
                    <span className={`shrink-0 font-mono font-bold ${a.percent >= 60 ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                      {a.earned}/{a.total} · {a.percent}%
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {/* Accuracy from the questions the student has answered, by paper */}
      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {mn ? 'Дасгалын нарийвчлал' : 'Accuracy by paper'}
        </div>
        {papers.length === 0 ? (
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {mn ? 'Асуулт бодоогүй байна. Бодсон асуулт бүр энд тооцогдоно.' : 'No questions answered yet. Each one you answer is counted here.'}
          </div>
        ) : (
          <div className="space-y-1.5">
            {papers.map(p => (
              <div key={p.paper} className="space-y-0.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-700 dark:text-slate-300">{PAPER_LABEL[p.paper][mn ? 'mn' : 'en']}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{p.percent}% · {p.questions}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${p.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* The topics answered least well, to review first */}
      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {mn ? 'Давтах сэдвүүд' : 'Topics to review'}
        </div>
        {weak.length === 0 ? (
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {mn
              ? 'Нэг сэдэвт 2 ба түүнээс дээш асуулт бодсоны дараа сул сэдэв энд харагдана.'
              : 'A topic appears here once you have answered 2 or more questions on it.'}
          </div>
        ) : (
          <ul className="space-y-1">
            {weak.map(w => {
              const t = courseTopicList.find(x => x.id === w.topicId);
              return (
                <li key={w.topicId} className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="truncate text-slate-800 dark:text-slate-200">
                    {t ? `${t.syllabusRef} ${mn ? t.titleMn : t.titleEn}` : w.topicId}
                  </span>
                  <span className="shrink-0 font-mono font-bold text-rose-700 dark:text-rose-300">{w.percent}% · {w.questions}</span>
                  <button
                    onClick={() => jumpToTopic(w.topicId)}
                    className="shrink-0 text-[10px] font-bold text-emerald-700 dark:text-teal-300 hover:underline"
                  >
                    {mn ? 'Давтах →' : 'Review →'}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
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
