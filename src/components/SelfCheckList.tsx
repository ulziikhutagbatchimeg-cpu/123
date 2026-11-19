import React from 'react';
import { ChemText } from './common/ChemText';
import { BONUS_POINTS } from '../lib/lessonGate';
import type { Topic } from '../types/chemistry';
import {
  chapterProgress,
  rateObjective,
  rateWord,
  topicItems,
  topicProgress,
  useSelfCheck,
  wordRating,
  type Level,
  type Tally3,
  type WordItem
} from '../lib/selfCheck';

// The student rates each learning objective and key word: "I can" or "not yet". Used in a topic's Objectives and Key words
// parts, above the end-of-topic test, and in the last lesson of a chapter (lib/selfCheck says where each rating is kept).

const RateButtons: React.FC<{ value: boolean | undefined; onRate: (can: boolean) => void; mn: boolean }> = ({ value, onRate, mn }) => (
  <div className="flex shrink-0 gap-1">
    <button
      type="button"
      onClick={() => onRate(true)}
      aria-pressed={value === true}
      className={`rounded-lg border px-2 py-1 text-[11px] font-black ${
        value === true
          ? 'border-emerald-600 bg-emerald-600 text-white'
          : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
      }`}
    >
      ✓ {mn ? 'Чадна' : 'I can'}
    </button>
    <button
      type="button"
      onClick={() => onRate(false)}
      aria-pressed={value === false}
      className={`rounded-lg border px-2 py-1 text-[11px] font-black ${
        value === false
          ? 'border-amber-500 bg-amber-500 text-white'
          : 'border-slate-300 bg-white text-slate-700 hover:border-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
      }`}
    >
      ✗ {mn ? 'Хараахан' : 'Not yet'}
    </button>
  </div>
);

// A row still to rate has a dashed amber border, so the student sees at a glance which ones are left
const rowTone = (v: boolean | undefined) =>
  v === true
    ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30'
    : v === false
      ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30'
      : 'border-dashed border-amber-400 bg-white dark:border-amber-700 dark:bg-slate-900';

// Brings the first row of the chapter's self-check still to rate into view, opening its topic if it is folded, and marks it
// for a moment. Returns false when every row is rated (or the self-check is not on screen).
export const scrollToUnrated = (): boolean => {
  const row = document.querySelector<HTMLElement>('[data-chapter-selfcheck] [data-unrated]');
  if (!row) return false;
  const folded = row.closest('details');
  if (folded && !folded.open) folded.open = true;
  // A plain jump: a smooth scroll can stop half-way while the step above is still scrolling into view
  row.scrollIntoView({ block: 'center' });
  row.classList.add('ring-4', 'ring-amber-400');
  window.setTimeout(() => row.classList.remove('ring-4', 'ring-amber-400'), 2000);
  return true;
};

const Count: React.FC<{ t: Tally3; mn: boolean }> = ({ t, mn }) => (
  <span className={`font-mono text-[11px] font-bold ${t.rated === t.total ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>
    {mn ? `Үнэлсэн ${t.rated}/${t.total} · Чадна ${t.can}` : `Rated ${t.rated}/${t.total} · I can ${t.can}`}
  </span>
);

// The objectives and/or key words of one topic, each with its rating buttons
export const SelfCheckList: React.FC<{
  topic: Topic;
  mn: boolean;
  level?: Level;
  show?: 'all' | 'objectives' | 'words';
}> = ({ topic, mn, level = 'extended', show = 'all' }) => {
  const sc = useSelfCheck();
  const { los, words } = topicItems(topic, level);
  const p = topicProgress(topic, sc, level);
  return (
    <div className="space-y-3">
      {show !== 'words' && los.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-black text-slate-900 dark:text-white">{mn ? 'Сурах зорилт' : 'Learning objectives'}</span>
            <Count t={p.lo} mn={mn} />
          </div>
          {los.map(lo => (
            <div
              key={lo.id}
              data-unrated={sc.lo[lo.id] === undefined ? '' : undefined}
              className={`flex items-start justify-between gap-2 rounded-xl border p-2.5 text-xs ${rowTone(sc.lo[lo.id])}`}
            >
              <span className="min-w-0 text-slate-800 dark:text-slate-100">
                <span className="mr-1.5 font-mono text-[10px] font-bold text-slate-500">{lo.code}</span>
                <ChemText>{mn ? lo.mn : lo.en}</ChemText>
              </span>
              <RateButtons value={sc.lo[lo.id]} onRate={can => rateObjective(lo.id, can)} mn={mn} />
            </div>
          ))}
        </div>
      )}
      {show !== 'objectives' && words.length > 0 && (
        <WordRows words={words} mn={mn} t={p.kw} />
      )}
    </div>
  );
};

// The key words of a list, each with its rating buttons, under a heading with the count
export const WordRows: React.FC<{ words: WordItem[]; mn: boolean; t: Tally3 }> = ({ words, mn, t }) => {
  const sc = useSelfCheck();
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-black text-slate-900 dark:text-white">{mn ? 'Түлхүүр үг: тайлбарлаж чадах уу?' : 'Key words: can you explain them?'}</span>
        <Count t={t} mn={mn} />
      </div>
      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
        {words.map(w => (
          <div
            key={`${w.owner}|${w.key}`}
            data-unrated={wordRating(sc, w) === undefined ? '' : undefined}
            className={`flex items-center justify-between gap-2 rounded-xl border px-2.5 py-1.5 text-xs ${rowTone(wordRating(sc, w))}`}
          >
            <span className="min-w-0 font-bold text-slate-800 dark:text-slate-100">
              <ChemText>{mn ? w.mn : w.en}</ChemText>
            </span>
            <RateButtons value={wordRating(sc, w)} onRate={can => rateWord(w, can)} mn={mn} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Every topic of a chapter, each folded under its title with its progress; the topics still to rate are open. A 9701
// chapter's key terms are shared by its topics, so they are listed once, after the topics' objectives.
// bonus: shown after a lesson's exit ticket, where it keeps nothing closed and earns BONUS_POINTS once all are rated
export const ChapterSelfCheck: React.FC<{ topics: Topic[]; mn: boolean; level?: Level; bonus?: boolean }> = ({ topics, mn, level = 'extended', bonus = false }) => {
  const sc = useSelfCheck();
  const shared = topics.length > 0 && topics[0].vocabulary.length === 0;
  const chapter = chapterProgress(topics, sc, level);
  const sharedWords = shared ? topicItems(topics[0], level).words : [];
  const left = chapter.lo.total - chapter.lo.rated + (chapter.kw.total - chapter.kw.rated);
  return (
    <div data-chapter-selfcheck className="space-y-3 rounded-2xl border border-sky-300 bg-sky-50/60 p-4 dark:border-sky-800 dark:bg-sky-950/20">
      <div className="space-y-1">
        <div className="text-sm font-black text-slate-900 dark:text-white">
          {bonus ? '⭐ ' : ''}
          {mn ? 'Өөрийн үнэлгээ: бүлгийн сурах зорилт, түлхүүр үг' : 'Self-check: the chapter’s objectives and key words'}
          {bonus && (
            <span className="ml-2 rounded bg-amber-100 px-1.5 text-[11px] font-black text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
              {mn ? `Заавал биш · +${BONUS_POINTS}` : `Not required · +${BONUS_POINTS}`}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {bonus
            ? mn
              ? `Зорилт, түлхүүр үг бүрийг «Чадна» эсвэл «Хараахан» гэж үнэлбэл ${BONUS_POINTS} нэмэлт оноо авна. Юуг давтахаа мэдэхэд тусална. Үнэлгээг багш харна.`
              : `Rate every objective and key word, I can or not yet, for ${BONUS_POINTS} bonus points. It shows you what to review. Your teacher sees the ratings.`
            : mn
              ? 'Зорилт, түлхүүр үг бүрийг «Чадна» эсвэл «Хараахан» гэж үнэлнэ. Юуг давтахаа мэдэхэд тусална. Үнэлгээг багш харна.'
              : 'Rate every objective and key word: I can, or not yet. It shows you what to review. Your teacher sees the ratings.'}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{mn ? 'Зорилт:' : 'Objectives:'} <Count t={chapter.lo} mn={mn} /></span>
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{mn ? 'Түлхүүр үг:' : 'Key words:'} <Count t={chapter.kw} mn={mn} /></span>
        </div>
        {/* How many rows are left, and a button to the next one (they have a dashed amber border) */}
        {left > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-black text-amber-800 dark:text-amber-300">
              {mn ? `${left} мөр үнэлэгдээгүй байна (тасархай хүрээтэй).` : `${left} still to rate (dashed border).`}
            </span>
            <button
              type="button"
              onClick={scrollToUnrated}
              className="rounded-lg border border-amber-400 bg-white px-2 py-0.5 text-xs font-bold text-amber-900 hover:border-amber-600 dark:bg-slate-900 dark:text-amber-200"
            >
              {mn ? 'Дараагийн үнэлээгүй мөр рүү →' : 'To the next one left →'}
            </button>
          </div>
        )}
      </div>
      {topics.map(topic => {
        const p = topicProgress(topic, sc, level);
        const done = shared ? p.lo.rated === p.lo.total : p.complete;
        return (
          <details key={topic.id} open={!done} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <summary className="cursor-pointer text-xs font-black text-slate-900 dark:text-white">
              {done ? '✓ ' : ''}
              {topic.syllabusRef.replace(/^\d{4}\//, '')} · <ChemText>{mn ? topic.titleMn : topic.titleEn}</ChemText>
            </summary>
            <div className="mt-2">
              <SelfCheckList topic={topic} mn={mn} level={level} show={shared ? 'objectives' : 'all'} />
            </div>
          </details>
        );
      })}
      {shared && sharedWords.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <WordRows words={sharedWords} mn={mn} t={chapter.kw} />
        </div>
      )}
    </div>
  );
};
