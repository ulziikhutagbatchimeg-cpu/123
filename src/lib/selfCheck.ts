import { useEffect, useState } from 'react';
import { keepValue, KEPT_RESTORED } from './accountCopy';
import type { LearningObjective, Topic } from '../types/chemistry';
import { KEY_TERMS } from '../data/alevelKeyTerms';

// The student's own rating of each learning objective and key word: "I can" (true) or "not yet" (false); no rating yet when
// absent. Every objective and key word of a topic must be rated before its end-of-topic test, and every one of a chapter
// before the exit ticket of its last lesson. The ratings are kept on this device and on the account (lib/accountCopy), go to
// the teacher with the student's results (lib/resultSync), and the objectives also with the progress checklist.
//  - Objectives: chem_cambridge_checklist, by objective id (the "I can" checklist the teacher's Skills checklist reads).
//  - IGCSE key words: chem_keyword_ratings, by topic, then key-word id. The ticks kept before (chem_igcse_keyword_ticks)
//    count as "I can".
//  - 9701 key terms: chem_keyterm_ratings, by chapter, then term. The "I can" terms are also kept as the list the 9701 schedule
//    reads (alevel-keyterm-mastery), as before.

export const SELF_CHECK_EVENT = 'chem-selfcheck-change';
export const LO_KEY = 'chem_cambridge_checklist';
export const KW_KEY = 'chem_keyword_ratings';
export const KT_KEY = 'chem_keyterm_ratings';
const OLD_KW_KEY = 'chem_igcse_keyword_ticks';
const MASTERY_KEY = 'alevel-keyterm-mastery';
const MASTERY_EVENT = 'alevel-keyterm-change';

type Ratings = Record<string, boolean>;

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export interface SelfCheckState {
  lo: Ratings;
  kw: Record<string, Ratings>;
  kt: Record<string, Ratings>;
}

export const readSelfCheck = (): SelfCheckState => {
  const lo = readJson<Ratings>(LO_KEY, {});
  const kw = readJson<Record<string, Ratings>>(KW_KEY, {});
  const oldKw = readJson<Record<string, string[]>>(OLD_KW_KEY, {});
  Object.entries(oldKw).forEach(([topic, ids]) => {
    kw[topic] = { ...Object.fromEntries(ids.map(id => [id, true])), ...(kw[topic] ?? {}) };
  });
  const kt = readJson<Record<string, Ratings>>(KT_KEY, {});
  const mastery = readJson<Record<string, string[]>>(MASTERY_KEY, {});
  Object.entries(mastery).forEach(([chapter, terms]) => {
    kt[chapter] = { ...Object.fromEntries(terms.map(t => [t, true])), ...(kt[chapter] ?? {}) };
  });
  return { lo, kw, kt };
};

const changed = () => window.dispatchEvent(new Event(SELF_CHECK_EVENT));

export const rateObjective = (id: string, can: boolean) => {
  const lo = readJson<Ratings>(LO_KEY, {});
  keepValue(LO_KEY, JSON.stringify({ ...lo, [id]: can }));
  changed();
};

export const rateKeyWord = (topicId: string, termId: string, can: boolean) => {
  const kw = readSelfCheck().kw;
  keepValue(KW_KEY, JSON.stringify({ ...kw, [topicId]: { ...(kw[topicId] ?? {}), [termId]: can } }));
  changed();
};

export const rateKeyTerm = (chapterId: string, term: string, can: boolean) => {
  const kt = readSelfCheck().kt;
  const next = { ...kt, [chapterId]: { ...(kt[chapterId] ?? {}), [term]: can } };
  keepValue(KT_KEY, JSON.stringify(next));
  // The 9701 schedule reads the "I can" terms of each chapter
  const mastery = Object.fromEntries(Object.entries(next).map(([c, r]) => [c, Object.keys(r).filter(t => r[t])]));
  keepValue(MASTERY_KEY, JSON.stringify(mastery));
  window.dispatchEvent(new Event(MASTERY_EVENT));
  changed();
};

// The ratings, kept up to date while the page is open
export const useSelfCheck = (): SelfCheckState => {
  const [state, setState] = useState<SelfCheckState>(readSelfCheck);
  useEffect(() => {
    const again = () => setState(readSelfCheck());
    window.addEventListener(SELF_CHECK_EVENT, again);
    window.addEventListener(KEPT_RESTORED, again);
    return () => {
      window.removeEventListener(SELF_CHECK_EVENT, again);
      window.removeEventListener(KEPT_RESTORED, again);
    };
  }, []);
  return state;
};

export type Level = 'core' | 'extended';

// One key word to rate: where its rating is kept, and its two names
export interface WordItem {
  scope: 'topic' | 'chapter';
  owner: string; // the topic id (IGCSE) or the chapter id (9701)
  key: string; // the key-word id (IGCSE) or the term (9701)
  en: string;
  mn: string;
}

// The objectives and key words a student rates for a topic. IGCSE topics have their own key words; a 9701 topic shares the
// key terms of its chapter. A Core student rates the Core objectives only.
export const topicItems = (topic: Topic, level: Level = 'extended'): { los: LearningObjective[]; words: WordItem[] } => {
  const los = topic.learningObjectives.filter(lo => level === 'extended' || lo.tier !== 'extended');
  const words: WordItem[] = topic.vocabulary.length
    ? topic.vocabulary.map(v => ({ scope: 'topic', owner: topic.id, key: v.id, en: v.termEn, mn: v.termMn }))
    : (KEY_TERMS[topic.chapterId] ?? []).map(t => ({ scope: 'chapter', owner: topic.chapterId, key: t, en: t, mn: t }));
  return { los, words };
};

export const wordRating = (sc: SelfCheckState, w: WordItem): boolean | undefined =>
  w.scope === 'topic' ? sc.kw[w.owner]?.[w.key] : sc.kt[w.owner]?.[w.key];

export const rateWord = (w: WordItem, can: boolean) =>
  w.scope === 'topic' ? rateKeyWord(w.owner, w.key, can) : rateKeyTerm(w.owner, w.key, can);

export interface Tally3 {
  rated: number;
  can: number;
  total: number;
}

const tallyOf = (values: (boolean | undefined)[]): Tally3 => ({
  rated: values.filter(v => v !== undefined).length,
  can: values.filter(v => v === true).length,
  total: values.length
});

// How far a topic's objectives and key words are rated; complete once every one has a rating
export const topicProgress = (topic: Topic, sc: SelfCheckState, level: Level = 'extended') => {
  const { los, words } = topicItems(topic, level);
  const lo = tallyOf(los.map(o => sc.lo[o.id]));
  const kw = tallyOf(words.map(w => wordRating(sc, w)));
  return { lo, kw, complete: lo.rated === lo.total && kw.rated === kw.total };
};

// The same for a whole chapter. A 9701 chapter's key terms count once, not once per topic.
export const chapterProgress = (topics: Topic[], sc: SelfCheckState, level: Level = 'extended') => {
  const los = topics.flatMap(t => topicItems(t, level).los);
  const seen = new Set<string>();
  const words = topics.flatMap(t => topicItems(t, level).words).filter(w => {
    const id = `${w.scope}|${w.owner}|${w.key}`;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  const lo = tallyOf(los.map(o => sc.lo[o.id]));
  const kw = tallyOf(words.map(w => wordRating(sc, w)));
  return { lo, kw, complete: lo.rated === lo.total && kw.rated === kw.total };
};
