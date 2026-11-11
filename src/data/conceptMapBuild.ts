// The shape of a written concept map, and small helpers to write one (data/conceptMaps.ts and the files it joins)

export type Bi = { en: string; mn: string };

export interface MapNode {
  id: string;
  topicId: string; // the topic that teaches this idea
  title: Bi;
  points: Bi[];
  alsoTopics?: string[]; // other topics the box belongs to, so it stands out on them too
}

export interface MapLink {
  from: string;
  to: string;
  label: Bi; // the words between the two ideas
}

export interface ChapterMap {
  centre: Bi;
  bigIdea: Bi;
  nodes: MapNode[];
  links: MapLink[];
}

export const b = (en: string, mn: string): Bi => ({ en, mn });
export const node = (id: string, topicId: string, title: Bi, ...points: Bi[]): MapNode => ({ id, topicId, title, points });
export const link = (from: string, to: string, en: string, mn: string): MapLink => ({ from, to, label: b(en, mn) });
