import type { ExamQuestion } from '../types/chemistry';

// The thinking levels of the lesson assessment sheet (ээлжит хичээлийн үнэлгээ, item 5). Each level carries the points it has
// on the sheet, so a quiz written to the sheet's weights has the same balance of thinking as the sheet does.
export type Taxonomy = NonNullable<ExamQuestion['taxonomy']>;

export const TAXONOMY_LABEL: Record<Taxonomy, { en: string; mn: string; weight: number }> = {
  recall: { en: 'Recall', mn: 'Сэргээн санах, утга өгөх', weight: 0.5 },
  analysis: { en: 'Analyse', mn: 'Задлан шинжлэх', weight: 1 },
  apply: { en: 'Apply / create', mn: 'Хэрэглэх, бүтээх', weight: 1 },
  evaluate: { en: 'Evaluate', mn: 'Үнэлгээ хийх', weight: 0.5 }
};

// Cambridge command words, grouped by the level they ask for. Each word keeps its Cambridge meaning:
//   evaluate: judge the value of something using evidence, weigh it up, discuss it, justify it
//   apply:    use knowledge in a calculation, a prediction, a suggestion or a drawing
//   analysis: explain with reasons, compare, classify, generalise, specify, interpret, deduce, or find an error
//   recall:   state, name, define, describe, outline, identify, label or give facts
// The levels are checked from the most demanding down. "Describe and explain" is therefore analysis, because it asks for reasons.
const COMMAND_WORDS: { level: Taxonomy; pattern: RegExp }[] = [
  { level: 'evaluate', pattern: /\b(evaluat\w*|judg\w*|justif\w*|assess\w*|discuss\w*|to what extent|how far|do you agree|recommend\w*)\b/i },
  { level: 'apply', pattern: /\b(calculat\w*|determin\w*|predict\w*|suggest\w*|draw\w*|sketch\w*|construct\w*|design\w*|plan(?:ned|ning)?|hypothes\w*|work out|how many)\b/i },
  { level: 'analysis', pattern: /\b(explain\w*|compar\w*|contrast\w*|classif\w*|generali[sz]\w*|specif\w*|interpret\w*|analys\w*|deduc\w*|distinguish\w*|identify (the )?(error|mistake)\w*|account for|reason\w*|because|why)\b/i },
  { level: 'recall', pattern: /\b(describ\w*|state|defin\w*|outlin\w*|name|identif\w*|list|label|give)\b/i }
];

// The command word that sets a question's level, and its level. A question with no command word is recall.
export const commandWordOf = (q: ExamQuestion): { level: Taxonomy; verb: string } => {
  for (const { level, pattern } of COMMAND_WORDS) {
    const match = q.questionTextEn.match(pattern);
    if (match) return { level, verb: match[0].toLowerCase() };
  }
  return { level: 'recall', verb: '' };
};

// The level of a question: its own level when it has one, otherwise the level of its command word
export const taxonomyInfo = (q: ExamQuestion): { level: Taxonomy; verb: string } =>
  q.taxonomy ? { level: q.taxonomy, verb: '' } : commandWordOf(q);
