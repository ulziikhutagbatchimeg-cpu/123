// AS & A Level (9701) revision topics, taken from the revision deck. Content is in Mongolian for now.

export interface AlevelExample {
  titleMn: string;
  questionMn: string;
  stepsMn: string[];
  answerMn: string;
  tipMn?: string; // what the examiner wants
}

export interface AlevelPitfall {
  wrongMn: string; // what students write
  rightMn: string; // what gets the mark
}

export interface AlevelTopic {
  id: string;
  number: number; // 1–18, the order in the revision deck
  titleEn: string;
  titleMn: string;
  factsMn: string[]; // the key facts for the topic
  mustKnowMn: string[]; // definitions and statements to learn word for word
  examplesMn: AlevelExample[]; // worked examples with the model working
  quickChecksMn: Array<{ questionMn: string; answerMn: string }>; // short questions with the answer
  pitfallsMn: AlevelPitfall[];
  examFrequencyMn?: string; // how often it appears in the Paper 23 sessions
  tipMn?: string; // a one-line rule of thumb
}
