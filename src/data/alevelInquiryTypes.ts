import type { Bi, QuizItem } from './statesLessons';
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StructuredItem } from './statesInquiry';

// The 40-minute inquiry lesson of one AS & A Level 9701 chapter (al-ch-N). It has the same five steps as the IGCSE
// chapter 1 lessons: question and prediction, a test with one changed variable, the explanation, applying and
// checking, and the conclusion with the exit ticket.
export interface AlevelInquiryPlan {
  question: Bi;
  independent: Bi; // the variable the student changes
  dependent: Bi; // the variable the student measures
  controlled: Bi; // what is kept the same
  limitation: Bi; // what the model cannot show
  keyPoints: Bi[];
  glossary: GlossaryTerm[];
  structured: StructuredItem; // step 4: an exam-style answer with mark points
  practice: PracticeItem[]; // step 4: independent practice by difficulty
  exit: QuizItem[]; // step 5: the exit ticket, submitted for a grade
}
