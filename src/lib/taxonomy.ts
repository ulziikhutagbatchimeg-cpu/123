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
