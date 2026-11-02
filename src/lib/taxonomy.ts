import type { ExamQuestion } from '../types/chemistry';

// The thinking levels of the lesson assessment sheet (ээлжит хичээлийн үнэлгээ, item 5). Each level carries the points it has
// on the sheet, so a quiz written to the sheet's weights has the same balance of thinking as the sheet does.
export type Taxonomy = NonNullable<ExamQuestion['taxonomy']>;

export const TAXONOMY_LABEL: Record<Taxonomy, { en: string; mn: string; weight: number }> = {
  recall: { en: 'Recall', mn: 'Сэргээн санах', weight: 0.5 },
  analysis: { en: 'Analyse', mn: 'Задлан шинжлэх', weight: 1 },
  apply: { en: 'Apply / create', mn: 'Хэрэглэх, бүтээх', weight: 1 },
  evaluate: { en: 'Evaluate', mn: 'Үнэлгээ хийх', weight: 0.5 }
};

// Command words that set the level of a question. The question's own level is used when it has one; otherwise the level is read
// from the words of the question, checking the most demanding level first.
const EVALUATE_WORDS = /\b(evaluat\w*|judg\w*|justif\w*|assess\w*|do you agree|to what extent|how far)\b/i;
const APPLY_WORDS = /\b(calculat\w*|determin\w*|work out|predict\w*|how many|suggest\w*|deduc\w*|hypothes\w*|design\w*|what would happen|use the .* to)\b/i;
const ANALYSE_WORDS = /\b(explain\w*|why\b|compar\w*|interpret\w*|analys\w*|account for|reason\w*|because|describe and|relationship|cause)\b/i;

export const inferTaxonomy = (q: ExamQuestion): Taxonomy => {
  const text = `${q.titleEn} ${q.questionTextEn}`;
  if (EVALUATE_WORDS.test(text)) return 'evaluate';
  if (APPLY_WORDS.test(text)) return 'apply';
  if (ANALYSE_WORDS.test(text)) return 'analysis';
  return 'recall';
};

export const taxonomyOf = (q: ExamQuestion): Taxonomy => q.taxonomy ?? inferTaxonomy(q);
