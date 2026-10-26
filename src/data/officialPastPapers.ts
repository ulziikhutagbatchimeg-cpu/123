// Official Cambridge 0620 papers, as links only: this app does not copy or host the PDFs. Papers 2, 4 and 6 of the sessions
// the Cambridge past-papers page lists. Each link was checked to open as a PDF.
const CAMBRIDGE = 'https://www.cambridgeinternational.org';

export interface OfficialPaper {
  session: 'June 2024' | '2023 specimen';
  paper: 'Paper 2' | 'Paper 4' | 'Paper 6';
  code: string; // the Cambridge paper code, for example 0620/21
  questionUrl: string;
  markSchemeUrl: string;
}

export const OFFICIAL_PAPERS: OfficialPaper[] = [
  {
    session: 'June 2024',
    paper: 'Paper 2',
    code: '0620/21',
    questionUrl: `${CAMBRIDGE}/Images/520512-june-2024-question-paper-21.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/520494-june-2024-mark-scheme-paper-21.pdf`
  },
  {
    session: 'June 2024',
    paper: 'Paper 4',
    code: '0620/41',
    questionUrl: `${CAMBRIDGE}/Images/671419-june-2024-question-paper-41.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/671413-june-2024-mark-scheme-paper-41.pdf`
  },
  {
    session: 'June 2024',
    paper: 'Paper 6',
    code: '0620/61',
    questionUrl: `${CAMBRIDGE}/Images/671421-june-2024-question-paper-61.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/671415-june-2024-mark-scheme-paper-61.pdf`
  },
  {
    session: '2023 specimen',
    paper: 'Paper 2',
    code: '0620 specimen',
    questionUrl: `${CAMBRIDGE}/Images/595751-2023-specimen-paper-2.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/595729-2023-specimen-paper-2-mark-scheme.pdf`
  },
  {
    session: '2023 specimen',
    paper: 'Paper 4',
    code: '0620 specimen',
    questionUrl: `${CAMBRIDGE}/Images/595758-2023-specimen-paper-4.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/595731-2023-specimen-paper-4-mark-scheme.pdf`
  },
  {
    session: '2023 specimen',
    paper: 'Paper 6',
    code: '0620 specimen',
    questionUrl: `${CAMBRIDGE}/Images/595759-2023-specimen-paper-6.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/595735-2023-specimen-paper-6-mark-scheme.pdf`
  }
];

// The official past-papers page, for the sessions it does not list here (other years and the October/November sessions)
export const OFFICIAL_PAST_PAPERS_PAGE = `${CAMBRIDGE}/programmes-and-qualifications/cambridge-igcse-chemistry-0620/past-papers/`;
