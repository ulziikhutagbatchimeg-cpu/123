// Official Cambridge papers, as links only: this app does not copy or host the PDFs. The 0620 list is Papers 2, 4 and 6 of the sessions
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

// The AS and A Level 9701 papers, as links only. The Cambridge 9701 past-papers page lists the June 2024 session and the
// 2022 specimen; these links are the ones it gives. Other sessions are on that page.
export interface AlevelPaper {
  session: 'June 2024' | '2022 specimen';
  paper: 'Paper 1' | 'Paper 2' | 'Paper 3' | 'Paper 4' | 'Paper 5';
  code: string; // the Cambridge paper code, for example 9701/11
  questionUrl: string;
  markSchemeUrl: string;
}

export const ALEVEL_PAPERS: AlevelPaper[] = [
  {
    session: 'June 2024',
    paper: 'Paper 1',
    code: '9701/11',
    questionUrl: `${CAMBRIDGE}/Images/567201-june-2024-question-paper-11.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/567193-june-2024-mark-scheme-paper-11.pdf`
  },
  {
    session: 'June 2024',
    paper: 'Paper 2',
    code: '9701/21',
    questionUrl: `${CAMBRIDGE}/Images/567197-june-2024-question-paper-21.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/567189-june-2024-mark-scheme-paper-21.pdf`
  },
  {
    session: 'June 2024',
    paper: 'Paper 3',
    code: '9701/31',
    questionUrl: `${CAMBRIDGE}/Images/567199-june-2024-question-paper-31.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/567190-june-2024-mark-scheme-paper-31.pdf`
  },
  {
    session: 'June 2024',
    paper: 'Paper 4',
    code: '9701/41',
    questionUrl: `${CAMBRIDGE}/Images/606634-june-2024-question-paper-41.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/606629-june-2024-mark-scheme-paper-41.pdf`
  },
  {
    session: 'June 2024',
    paper: 'Paper 5',
    code: '9701/51',
    questionUrl: `${CAMBRIDGE}/Images/606635-june-2024-question-paper-51.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/606630-june-2024-mark-scheme-paper-51.pdf`
  },
  {
    session: '2022 specimen',
    paper: 'Paper 1',
    code: '9701/11',
    questionUrl: `${CAMBRIDGE}/Images/751604-2022-specimen-paper-1.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/751592-2022-specimen-mark-scheme-paper-1.pdf`
  },
  {
    session: '2022 specimen',
    paper: 'Paper 2',
    code: '9701/21',
    questionUrl: `${CAMBRIDGE}/Images/751605-2022-specimen-paper-2.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/751593-2022-specimen-mark-scheme-paper-2.pdf`
  },
  {
    session: '2022 specimen',
    paper: 'Paper 3',
    code: '9701/31',
    questionUrl: `${CAMBRIDGE}/Images/751606-2022-specimen-paper-3.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/751594-2022-specimen-mark-scheme-paper-3.pdf`
  },
  {
    session: '2022 specimen',
    paper: 'Paper 4',
    code: '9701/41',
    questionUrl: `${CAMBRIDGE}/Images/751607-2022-specimen-paper-4.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/751595-2022-specimen-mark-scheme-paper-4.pdf`
  },
  {
    session: '2022 specimen',
    paper: 'Paper 5',
    code: '9701/51',
    questionUrl: `${CAMBRIDGE}/Images/751608-2022-specimen-paper-5.pdf`,
    markSchemeUrl: `${CAMBRIDGE}/Images/751596-2022-specimen-mark-scheme-paper-5.pdf`
  }
];

// The official 9701 past-papers page, for the other sessions (2017 onwards) and the October/November sessions
export const ALEVEL_PAST_PAPERS_PAGE = `${CAMBRIDGE}/programmes-and-qualifications/cambridge-international-as-and-a-level-chemistry-9701/past-papers/`;
