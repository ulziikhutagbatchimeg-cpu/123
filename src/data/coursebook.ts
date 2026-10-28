// The coursebook students already have. The web supports it and does not replace it: the chapter's coursebook pages and
// questions are shown at the top of each topic, to read and try first. The keys are chapter ids (ch-... for 0620, al-ch-N for
// 9701). The entries come from the lesson decks, which name the coursebook chapter, its pages and its questions.
export interface CoursebookRef {
  books: string; // the coursebook chapters, for example "Ch 2–3"
  pages?: string; // the pages to read, for example "14–56"
  questions?: string; // the questions to try, for example "Ch 2 Q1–11"
}

export const COURSEBOOK: Record<string, CoursebookRef> = {
  // IGCSE 0620
  'ch-states-of-matter': { books: 'Ch 1', questions: 'Q1–10' },
  'ch-atoms-bonding': { books: 'Ch 2–3', questions: 'Ch 2 Q1–11' },
  'ch-stoichiometry': { books: 'Ch 4–5' },
  'ch-electrochemistry': { books: 'Ch 6' },
  'ch-energetics': { books: 'Ch 7', questions: 'Q1–9' },
  'ch-reactions': { books: 'Ch 8–10', questions: 'Ch 8, 9, 10: Q1–9' },
  'ch-acids-bases': { books: 'Ch 11–12', questions: 'Ch 11 Q1–12; Ch 12 Q1–9' },
  'ch-periodic-table': { books: 'Ch 13', questions: 'Q1–10' },
  'ch-metals': { books: 'Ch 14–16', questions: 'Ch 14 Q1–8; Ch 15 Q1–7; Ch 16 Q1–9' },
  'ch-environment': { books: 'Ch 17', questions: 'Q1–15' },
  'ch-organic': { books: 'Ch 18–20', questions: 'Ch 18 Q1–15; Ch 19 Q1–12; Ch 20 Q1–12' },
  'ch-experimental-analysis': { books: 'Ch 21–22', questions: 'Ch 21 Q1–8; Ch 22 Q1–12' },

  // AS & A Level 9701 (the coursebook's 3rd edition; the pages are the PDF pages named in the decks)
  'al-ch-1': { books: 'Ch 1–2', pages: '14–56' },
  'al-ch-2': { books: 'Ch 3', pages: '57–106' },
  'al-ch-3': { books: 'Ch 4', pages: '107–150' },
  'al-ch-4': { books: 'Ch 5', pages: '151–179' },
  'al-ch-5': { books: 'Ch 6', pages: '180–205' },
  'al-ch-6': { books: 'Ch 7', pages: '206–230' },
  'al-ch-7': { books: 'Ch 8', pages: '231–279' },
  'al-ch-8': { books: 'Ch 9', pages: '280–301' },
  'al-ch-9': { books: 'Ch 10', pages: '302–329' },
  'al-ch-10': { books: 'Ch 11', pages: '330–352' },
  'al-ch-11': { books: 'Ch 12', pages: '353–371' },
  'al-ch-23': { books: 'Ch 19', pages: '534–561' },
};
