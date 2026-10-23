// The 0620 paper files the teacher has on hand, by name only. The PDFs themselves are not in the app: the app does not copy or
// host Cambridge papers. The Teacher area lists these so the teacher can see which papers are kept and which are still missing.
export interface TeacherPaperFile {
  year: number;
  series: 'May/June' | 'Feb/March' | 'Oct/Nov';
  paper: 'Paper 2' | 'Paper 4' | 'Paper 6';
  variant: string;
  questionFile: string;
  markSchemeFile?: string;
}

export const TEACHER_PAPER_FILES: TeacherPaperFile[] = [
  { year: 2019, series: 'May/June', paper: 'Paper 4', variant: '3', questionFile: '0620_s19_qp_43', markSchemeFile: '0620_s19_ms_43' },
  { year: 2020, series: 'May/June', paper: 'Paper 4', variant: '2', questionFile: '0620_s20_qp_42' },
  { year: 2020, series: 'May/June', paper: 'Paper 6', variant: '2', questionFile: '0620_s20_qp_62' },
  { year: 2021, series: 'May/June', paper: 'Paper 4', variant: '1', questionFile: '0620_s21_qp_41' },
  { year: 2021, series: 'May/June', paper: 'Paper 4', variant: '2', questionFile: '0620_s21_qp_42', markSchemeFile: '0620_s21_ms_42' },
  { year: 2022, series: 'May/June', paper: 'Paper 2', variant: '2', questionFile: '0620_s22_qp_22', markSchemeFile: '0620_s22_ms_22' },
  { year: 2022, series: 'May/June', paper: 'Paper 4', variant: '2', questionFile: '0620_s22_qp_42' },
  { year: 2022, series: 'May/June', paper: 'Paper 4', variant: '3', questionFile: '0620_s22_qp_43' },
  { year: 2023, series: 'Feb/March', paper: 'Paper 2', variant: '2', questionFile: '0620_m23_qp_22', markSchemeFile: '0620_m23_ms_22' },
  { year: 2023, series: 'Feb/March', paper: 'Paper 4', variant: '2', questionFile: '0620_m23_qp_42', markSchemeFile: '0620_m23_ms_42' },
  { year: 2023, series: 'May/June', paper: 'Paper 2', variant: '2', questionFile: '0620_s23_qp_22', markSchemeFile: '0620_s23_ms_22' },
  { year: 2023, series: 'May/June', paper: 'Paper 4', variant: '2', questionFile: '0620_s23_qp_42', markSchemeFile: '0620_s23_ms_42' },
  { year: 2023, series: 'May/June', paper: 'Paper 4', variant: '3', questionFile: '0620_s23_qp_43' },
  { year: 2024, series: 'May/June', paper: 'Paper 4', variant: '2', questionFile: '0620_s24_qp_42' },
  { year: 2024, series: 'Oct/Nov', paper: 'Paper 6', variant: '2', questionFile: '0620_w24_qp_62' }
];
