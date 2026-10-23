import type { MistakeLog } from '../types/chemistry';

// A topic with this many open mistakes is a repeated error (тогтмол алддаг). One open mistake in a topic is a few (цөөн алдсан).
export const REPEAT_FROM = 2;

export type MistakeLevel = 'clear' | 'few' | 'repeat';

export interface TopicErrors {
  topicId: string;
  syllabusRef: string;
  count: number;
  latest: number;
}

export interface MistakeAnalysis {
  level: MistakeLevel;
  open: number;
  logged: number;
  // Topics with open mistakes, the most missed first
  topics: TopicErrors[];
}

// Groups the open mistakes by topic. The level is 'repeat' when any topic is repeated, 'few' when mistakes are open
// but none is repeated, and 'clear' when nothing is open.
export const analyseMistakes = (mistakes: MistakeLog[]): MistakeAnalysis => {
  const open = mistakes.filter(m => !m.resolved);
  const byTopic = new Map<string, TopicErrors>();
  for (const m of open) {
    const entry = byTopic.get(m.topicId) ?? { topicId: m.topicId, syllabusRef: m.syllabusRef, count: 0, latest: 0 };
    entry.count += 1;
    entry.latest = Math.max(entry.latest, m.timestamp);
    byTopic.set(m.topicId, entry);
  }
  const topics = [...byTopic.values()].sort((a, b) => b.count - a.count || b.latest - a.latest);
  const level: MistakeLevel = open.length === 0 ? 'clear' : topics.some(t => t.count >= REPEAT_FROM) ? 'repeat' : 'few';
  return { level, open: open.length, logged: mistakes.length, topics };
};

// The level of one topic, from how many of its mistakes are open
export const topicLevel = (count: number): MistakeLevel => (count >= REPEAT_FROM ? 'repeat' : 'few');

// Green when nothing is open, amber for a few misses, red for a repeated error
export const LEVEL_STYLE: Record<MistakeLevel, { box: string; text: string; bar: string; badge: string }> = {
  clear: {
    box: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60',
    text: 'text-emerald-700 dark:text-emerald-300',
    bar: 'bg-emerald-500',
    badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60'
  },
  few: {
    box: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60',
    text: 'text-amber-700 dark:text-amber-300',
    bar: 'bg-amber-500',
    badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60'
  },
  repeat: {
    box: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60',
    text: 'text-rose-700 dark:text-rose-300',
    bar: 'bg-rose-500',
    badge: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800/60'
  }
};

export const LEVEL_LABEL: Record<MistakeLevel, { mn: string; en: string }> = {
  clear: { mn: 'Алдаа алга', en: 'No open mistakes' },
  few: { mn: 'Цөөн алдсан', en: 'A few misses' },
  repeat: { mn: 'Тогтмол алддаг', en: 'Keeps missing' }
};
