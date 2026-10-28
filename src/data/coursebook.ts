// The coursebook students already have. The web supports it and does not replace it: the chapter's coursebook pages and
// questions are shown at the top of each topic, to read and try first. The keys are chapter ids (ch-... for 0620, al-ch-N for
// 9701).
//
// Pages are the printed page numbers. The IGCSE pages come from its contents page. The AS & A Level pages come from the PDF,
// where the page index matches the printed number, and agree with the lesson decks. A chapter with no entry shows no block.
export interface CoursebookRef {
  books: string; // the coursebook chapters, for example "Ch 2–3"
  pages?: string; // the pages to read, for example "28–72"
  questions?: string; // the questions to try, for example "Ch 2 Q1–11"
}

export const COURSEBOOK: Record<string, CoursebookRef> = {
  // IGCSE 0620: Cambridge IGCSE Chemistry Coursebook (4th edition)
  'ch-states-of-matter': { books: 'Ch 1', pages: '1–27', questions: 'Q1–10' },
  'ch-atoms-bonding': { books: 'Ch 2–3', pages: '28–72', questions: 'Ch 2 Q1–11' },
  'ch-stoichiometry': { books: 'Ch 4–5', pages: '73–123' },
  'ch-electrochemistry': { books: 'Ch 6', pages: '124–147' },
  'ch-energetics': { books: 'Ch 7', pages: '148–162', questions: 'Q1–9' },
  'ch-reactions': { books: 'Ch 8–10', pages: '163–218', questions: 'Ch 8, 9, 10: Q1–9' },
  'ch-acids-bases': { books: 'Ch 11–12', pages: '219–258', questions: 'Ch 11 Q1–12; Ch 12 Q1–9' },
  'ch-periodic-table': { books: 'Ch 13', pages: '259–276', questions: 'Q1–10' },
  'ch-metals': { books: 'Ch 14–16', pages: '277–324', questions: 'Ch 14 Q1–8; Ch 15 Q1–7; Ch 16 Q1–9' },
  'ch-environment': { books: 'Ch 17', pages: '325–343', questions: 'Q1–15' },
  'ch-organic': { books: 'Ch 18–20', pages: '344–403', questions: 'Ch 18 Q1–15; Ch 19 Q1–12; Ch 20 Q1–12' },
  'ch-experimental-analysis': { books: 'Ch 21–22', pages: '404–446', questions: 'Ch 21 Q1–8; Ch 22 Q1–12' },

  // AS & A Level 9701: Chemistry for Cambridge International AS & A Level Coursebook (3rd edition)
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
  'al-ch-12': { books: 'Ch 13', pages: '372–385' },
  'al-ch-13': { books: 'Ch 14', pages: '386–417' },
  'al-ch-14': { books: 'Ch 15', pages: '418–451' },
  'al-ch-15': { books: 'Ch 16', pages: '452–468' },
  'al-ch-16': { books: 'Ch 17', pages: '469–491' },
  'al-ch-17': { books: 'Ch 18', pages: '492–518' },
  'al-ch-18': { books: 'Ch 17', pages: '469–491' },
  'al-ch-23': { books: 'Ch 19', pages: '534–561' },
  'al-ch-24': { books: 'Ch 20', pages: '562–607' },
  'al-ch-25': { books: 'Ch 21', pages: '608–641' },
  'al-ch-26': { books: 'Ch 22', pages: '642–681' },
  'al-ch-27': { books: 'Ch 11', pages: '330–352' },
  'al-ch-28': { books: 'Ch 24', pages: '716–744' },
  'al-ch-29': { books: 'Ch 14', pages: '386–417' },
  'al-ch-30': { books: 'Ch 25', pages: '745–767' },
  'al-ch-31': { books: 'Ch 16', pages: '452–468' },
  'al-ch-32': { books: 'Ch 17', pages: '469–491' },
  'al-ch-33': { books: 'Ch 26' },
};
