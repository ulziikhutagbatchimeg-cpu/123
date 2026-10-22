import { CURRICULUM_CHAPTERS } from './curriculumData';

// Student reports: a student exports their "I can" checklist as a .json file and the teacher
// loads the files into the Teacher portal. Nothing is sent to a server.

export type Level = 'core' | 'extended';

export interface StudentReport {
  version: 1;
  name: string;
  date: string; // ISO timestamp of the export
  checks: Record<string, boolean>; // statement id (e.g. "1.1.2") -> ticked
  completedTopics: string[];
}

export const REPORT_KEY = 'chem_cambridge_teacher_reports';

// When the student last ticked something, and when they last saved a report for the teacher
export const CHANGED_KEY = 'chem_cambridge_checks_changed_at';
export const EXPORTED_KEY = 'chem_cambridge_report_exported_at';

export const readStored = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeStored = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked; the status then shows for this visit only
  }
};

export const makeReport = (name: string, checks: Record<string, boolean>, completedTopics: string[]): StudentReport => ({
  version: 1,
  name: name.trim() || 'Student',
  date: new Date().toISOString(),
  checks,
  completedTopics
});

// Accepts only files that look like a report; anything else returns null
export const parseReport = (raw: string): StudentReport | null => {
  try {
    const o = JSON.parse(raw) as Partial<StudentReport>;
    if (o.version !== 1 || typeof o.name !== 'string' || !o.checks || typeof o.checks !== 'object') return null;
    return {
      version: 1,
      name: o.name.slice(0, 40),
      date: typeof o.date === 'string' ? o.date : '',
      checks: o.checks as Record<string, boolean>,
      completedTopics: Array.isArray(o.completedTopics) ? o.completedTopics.map(String) : []
    };
  } catch {
    return null;
  }
};

// Every syllabus statement, in syllabus order
export interface StatementRow {
  id: string;
  chapterNo: number;
  chapterEn: string;
  chapterMn: string;
  topicRef: string;
  en: string;
  mn: string;
  tier: Level;
}

export const STATEMENTS: StatementRow[] = CURRICULUM_CHAPTERS.flatMap(ch =>
  ch.topics.flatMap(t =>
    t.learningObjectives.map(lo => ({
      id: lo.id,
      chapterNo: ch.number,
      chapterEn: ch.titleEn,
      chapterMn: ch.titleMn,
      topicRef: t.syllabusRef,
      en: lo.en,
      mn: lo.mn,
      tier: lo.tier === 'extended' ? ('extended' as const) : ('core' as const)
    }))
  )
);

export const CHAPTER_NUMBERS = CURRICULUM_CHAPTERS.map(ch => ch.number);

// Statements a student is expected to show at this level
export const statementsAt = (level: Level): StatementRow[] =>
  STATEMENTS.filter(s => level === 'extended' || s.tier === 'core');

export interface ChapterCount {
  done: number;
  total: number;
}

export interface StudentStats {
  name: string;
  date: string;
  done: number;
  total: number;
  pct: number; // 0–100, rounded
  byChapter: Record<number, ChapterCount>;
  missing: StatementRow[];
}

// Ticked / total per chapter for one set of checks, at this level
export const chapterCounts = (checks: Record<string, boolean>, level: Level): Record<number, ChapterCount> => {
  const byChapter: Record<number, ChapterCount> = {};
  CHAPTER_NUMBERS.forEach(n => (byChapter[n] = { done: 0, total: 0 }));
  statementsAt(level).forEach(s => {
    byChapter[s.chapterNo].total += 1;
    if (checks[s.id]) byChapter[s.chapterNo].done += 1;
  });
  return byChapter;
};

export const studentStats = (r: StudentReport, level: Level): StudentStats => {
  const rows = statementsAt(level);
  const missing = rows.filter(s => !r.checks[s.id]);
  const total = rows.length;
  const done = total - missing.length;
  return {
    name: r.name,
    date: r.date,
    done,
    total,
    pct: total ? Math.round((done / total) * 100) : 0,
    byChapter: chapterCounts(r.checks, level),
    missing
  };
};

// Share of students who ticked each statement, at this level
export const statementRates = (reports: StudentReport[], level: Level) => {
  const rows = statementsAt(level);
  return rows
    .map(s => {
      const ticked = reports.filter(r => !!r.checks[s.id]).length;
      return { ...s, ticked, rate: reports.length ? Math.round((ticked / reports.length) * 100) : 0 };
    })
    .sort((a, b) => a.rate - b.rate);
};

export const downloadText = (filename: string, text: string, mime: string) => {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
