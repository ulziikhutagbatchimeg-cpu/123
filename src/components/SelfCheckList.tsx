import React from 'react';
import { ChemText } from './common/ChemText';
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

const rowTone = (v: boolean | undefined) =>
  v === true
    ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30'
    : v === false
      ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30'
      : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900';

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
            <div key={lo.id} className={`flex items-start justify-between gap-2 rounded-xl border p-2.5 text-xs ${rowTone(sc.lo[lo.id])}`}>
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
          <div key={`${w.owner}|${w.key}`} className={`flex items-center justify-between gap-2 rounded-xl border px-2.5 py-1.5 text-xs ${rowTone(wordRating(sc, w))}`}>
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
export const ChapterSelfCheck: React.FC<{ topics: Topic[]; mn: boolean; level?: Level }> = ({ topics, mn, level = 'extended' }) => {
  const sc = useSelfCheck();
  const shared = topics.length > 0 && topics[0].vocabulary.length === 0;
  const chapter = chapterProgress(topics, sc, level);
  const sharedWords = shared ? topicItems(topics[0], level).words : [];
  return (
    <div className="space-y-3 rounded-2xl border border-sky-300 bg-sky-50/60 p-4 dark:border-sky-800 dark:bg-sky-950/20">
      <div className="space-y-1">
        <div className="text-sm font-black text-slate-900 dark:text-white">
          {mn ? 'Өөрийн үнэлгээ: бүлгийн сурах зорилт, түлхүүр үг' : 'Self-check: the chapter’s objectives and key words'}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {mn
            ? 'Зорилт, түлхүүр үг бүрийг «Чадна» эсвэл «Хараахан» гэж үнэлнэ. Бүгдийг үнэлсний дараа гарах билет нээгдэнэ. Үнэлгээг багш харна.'
            : 'Rate every objective and key word: I can, or not yet. The exit ticket opens once all are rated. Your teacher sees the ratings.'}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{mn ? 'Зорилт:' : 'Objectives:'} <Count t={chapter.lo} mn={mn} /></span>
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{mn ? 'Түлхүүр үг:' : 'Key words:'} <Count t={chapter.kw} mn={mn} /></span>
        </div>
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
