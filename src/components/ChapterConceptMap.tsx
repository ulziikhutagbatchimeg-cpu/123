import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ChemText } from './common/ChemText';
import type { ChapterMap, MapNode } from '../data/conceptMaps';
import type { Topic } from '../types/chemistry';

// Sent by a lesson's "concept map" button; the Lessons page then opens the chapter's concept map
export const OPEN_CONCEPT_MAP = 'chem-open-concept-map';
export const openConceptMap = () => window.dispatchEvent(new Event(OPEN_CONCEPT_MAP));

// A button that opens the chapter's concept map, with a line saying what it is for (a preview, or a review)
export const ConceptMapButton: React.FC<{ mn: boolean; purpose: 'preview' | 'review' }> = ({ mn, purpose }) => (
  <button
    type="button"
    onClick={openConceptMap}
    className="inline-flex items-center gap-1.5 rounded-xl border border-violet-300 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-800 hover:border-violet-500 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-200"
  >
    {purpose === 'preview'
      ? mn ? 'Бүлгийн тойм: концепт зураг харах' : 'Chapter overview: see the concept map'
      : mn ? 'Концепт зургаар давтах' : 'Review with the concept map'}
    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
  </button>
);

// A chapter's concept map (data/conceptMaps.ts): the chapter's big idea in the centre, one box for each main idea with its
// points, and under each box the links that leave it, read as a sentence: "Alkane → cracking → Alkene". The boxes of the
// topic on show stand out, and each box's topic button opens that topic.

export const ChapterConceptMap: React.FC<{
  map: ChapterMap;
  topics: Topic[];
  currentTopicId?: string;
  mn: boolean;
  onOpenTopic?: (topicId: string) => void;
}> = ({ map, topics, currentTopicId, mn, onOpenTopic }) => {
  const t = (x: { en: string; mn: string }) => (mn ? x.mn : x.en);
  const byId = new Map(map.nodes.map(n => [n.id, n]));
  const topicOf = (n: MapNode) => topics.find(tp => tp.id === n.topicId);

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
        {mn ? 'Бүлгийн концепт зураг' : 'Chapter concept map'}
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <div className="max-w-full rounded-2xl bg-violet-600 px-5 py-2.5 text-sm font-black text-white">
          <ChemText>{t(map.centre)}</ChemText>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <span className="font-bold">{mn ? 'Гол санаа: ' : 'The big idea: '}</span>
          <ChemText>{t(map.bigIdea)}</ChemText>
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {mn
            ? 'Хайрцаг бүр нэг гол ойлголт. Доорх «→» мөр ойлголтууд хоорондоо хэрхэн холбогдохыг өгүүлбэрээр хэлнэ. Тодруулсан хайрцаг нь одоогийн сэдэв.'
            : 'Each box is one main idea. The → lines under it say, as a sentence, how it leads to the others. The highlighted boxes are the topic on show.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {map.nodes.map(n => {
          const here = !!currentTopicId && (n.topicId === currentTopicId || (n.alsoTopics ?? []).includes(currentTopicId));
          const topic = topicOf(n);
          const out = map.links.filter(l => l.from === n.id);
          return (
            <div
              key={n.id}
              className={`space-y-2 rounded-2xl border p-3 ${
                here
                  ? 'border-violet-500 bg-violet-100 ring-2 ring-violet-400 dark:border-violet-400 dark:bg-violet-900/50'
                  : 'border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-black text-violet-900 dark:text-violet-100">
                  <ChemText>{t(n.title)}</ChemText>
                </div>
                {topic && (
                  <button
                    type="button"
                    onClick={() => onOpenTopic?.(topic.id)}
                    disabled={!onOpenTopic}
                    title={mn ? topic.titleMn : topic.titleEn}
                    className="shrink-0 rounded-md border border-violet-300 bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-violet-700 hover:border-violet-500 dark:border-violet-700 dark:bg-slate-900 dark:text-violet-300"
                  >
                    {topic.syllabusRef.replace(/^\d{4}\//, '')}
                  </button>
                )}
              </div>
              {here && (
                <div className="text-[10px] font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                  {mn ? 'Одоогийн сэдэв' : 'Topic on show'}
                </div>
              )}
              <ul className="space-y-1">
                {n.points.map((p, i) => (
                  <li key={i} className="text-xs leading-snug text-slate-700 dark:text-slate-300">
                    • <ChemText>{t(p)}</ChemText>
                  </li>
                ))}
              </ul>
              {out.length > 0 && (
                <div className="space-y-1 border-t border-violet-200 pt-2 dark:border-violet-800">
                  {out.map((l, i) => {
                    const to = byId.get(l.to);
                    if (!to) return null;
                    return (
                      <div key={i} className="flex flex-wrap items-center gap-1 text-xs text-slate-700 dark:text-slate-300">
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-violet-600 dark:text-violet-300" aria-hidden="true" />
                        <span className="italic"><ChemText>{t(l.label)}</ChemText></span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-violet-600 dark:text-violet-300" aria-hidden="true" />
                        <span className="font-bold text-violet-900 dark:text-violet-100"><ChemText>{t(to.title)}</ChemText></span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
