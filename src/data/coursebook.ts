// The coursebook students already have. The web supports it and does not replace it: for each topic, the pages to read first
// and the questions to try. A topic with no entry here shows no coursebook block. The keys are topic ids, for example 'top-4-1'.
export interface CoursebookRef {
  pages: string; // the pages to read first, for example "24–27"
  questions?: string; // the questions to try after reading, for example "Q1–Q4"
}

export const COURSEBOOK: Record<string, CoursebookRef> = {};
