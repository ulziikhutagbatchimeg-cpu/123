import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { STATES_LESSONS } from '../data/statesLessons';
import { IGCSE_LESSON_SERIES } from '../data/igcseLessons';
import { ALEVEL_LESSON_SERIES } from '../data/latticeLessons';
import { ALEVEL_INQUIRY } from '../data/alevelInquiry';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { alevelCourse, visibleChapters } from '../data/alevelSyllabus';
import { courseQuestions } from '../data/courseScope';
import { MOCK_TESTS } from '../data/mockTests';
import { cambridgeGrade } from '../lib/grade';
import { periodBuckets, type Period } from '../lib/activity';
import { classTone } from '../lib/classTone';
import { isTeacher, subscribeAllRecentResults, loadEnrollments, loadRecentResults, loadStudentSummaries, saveResultFeedback, useAuthUser, type Enrollment, type StudentSummary } from '../lib/cloud';
import { TeacherSignInNotice } from './TeacherSignInNotice';
import type { CourseSummary, DayTally, ResultSummaries, StoredResult, StudyTotals, Tally } from '../lib/resultSync';

// The teacher writes feedback on lesson tickets, practice sets, full tests and answered questions. Games and the escape room show results only.
const FEEDBACK_KINDS: StoredResult['kind'][] = ['exit', 'practice', 'question', 'test'];

type ChartKind = 'lesson' | 'question' | 'game';
const CHART_KINDS: { id: ChartKind; en: string; mn: string; bar: string }[] = [
  { id: 'lesson', en: 'Lesson tickets', mn: 'Хичээлийн шалгалт', bar: 'bg-sky-500' },
  { id: 'question', en: 'Questions', mn: 'Асуулт', bar: 'bg-emerald-500' },
  { id: 'game', en: 'Games', mn: 'Тоглоом', bar: 'bg-amber-400' }
];

const PERIODS: { id: Period; en: string; mn: string }[] = [
  { id: 'day', en: 'Day', mn: 'Өдөр' },
  { id: 'week', en: 'Week', mn: 'Долоо хоног' },
  { id: 'month', en: 'Month', mn: 'Сар' }
];

type Filter = 'all' | 'lesson' | 'practice' | 'question' | 'test' | 'game';
const FILTERS: { id: Filter; en: string; mn: string }[] = [
  { id: 'all', en: 'All', mn: 'Бүгд' },
  { id: 'lesson', en: 'Lessons', mn: 'Хичээл' },
  { id: 'practice', en: 'Practice', mn: 'Дасгал' },
  { id: 'question', en: 'Questions', mn: 'Асуулт' },
  { id: 'test', en: 'Full tests', mn: 'Бүтэн шалгалт' },
  { id: 'game', en: 'Games', mn: 'Тоглоом' }
];

const matchesFilter = (r: StoredResult, f: Filter): boolean => {
  if (f === 'all') return true;
  if (f === 'lesson') return r.kind === 'exit';
  if (f === 'game') return r.kind === 'game' || r.kind === 'escape';
  return r.kind === f;
};

const HEAD = 'text-[10px] font-bold uppercase tracking-wider text-slate-400';
const CARD = 'p-3 rounded-xl border border-slate-700 bg-slate-900/60 space-y-2.5';

const pad = (n: number) => String(n).padStart(2, '0');
const dateText = (time: number) => {
  const d = new Date(time);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const bucketLabel = (start: Date, period: Period) =>
  period === 'month' ? `${start.getFullYear()}-${pad(start.getMonth() + 1)}` : `${pad(start.getMonth() + 1)}/${pad(start.getDate())}`;
const percentOf = (t: Tally): number | null => (t.max > 0 ? Math.round((t.earned / t.max) * 100) : null);

// A day's counts as events at noon of that day, so the period buckets of the student's own activity graph apply to them
const dailyEvents = (daily: Record<string, DayTally>): { takenAt: number; kind: ChartKind }[] => {
  const events: { takenAt: number; kind: ChartKind }[] = [];
  for (const [key, day] of Object.entries(daily)) {
    const [y, m, d] = key.split('-').map(Number);
    const at = new Date(y, m - 1, d, 12).getTime();
    for (let i = 0; i < day.lessons; i++) events.push({ takenAt: at, kind: 'lesson' });
    for (let i = 0; i < day.questions; i++) events.push({ takenAt: at, kind: 'question' });
    for (let i = 0; i < day.games; i++) events.push({ takenAt: at, kind: 'game' });
  }
  return events;
};

// The teacher's comment on one result. Each result is saved on its own.
const FeedbackBox: React.FC<{ item: StoredResult; mn: boolean; onSave: (text: string) => Promise<void> }> = ({ item, mn, onSave }) => {
  const [text, setText] = useState(item.feedback ?? '');
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const save = () => {
    setBusy(true);
    setFailed(false);
    onSave(text.trim())
      .catch(() => setFailed(true))
      .finally(() => setBusy(false));
  };

  return (
    <div className="space-y-1.5">
      <textarea
        rows={2}
        maxLength={500}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={mn ? 'Сурагчид санал бичих...' : 'Write feedback for the student...'}
        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={save}
          disabled={busy || !text.trim() || text.trim() === (item.feedback ?? '')}
          className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold"
        >
          {mn ? 'Хадгалах' : 'Save feedback'}
        </button>
        {failed && <span className="text-[11px] text-rose-400">{mn ? 'Хадгалж чадсангүй' : 'Could not save'}</span>}
      </div>
    </div>
  );
};

// Totals of one student in the programme: lessons, questions, full tests and games, each with its average or accuracy
const Totals: React.FC<{ summary: CourseSummary; mn: boolean }> = ({ summary, mn }) => {
  const tiles = [
    {
      label: mn ? 'Хичээлийн шалгалт' : 'Lesson tickets',
      value: `${summary.lessons.count}`,
      caption: summary.lessons.avg === null ? (mn ? 'Дуусгаагүй' : 'None yet') : `${mn ? 'Дундаж' : 'Average'} ${summary.lessons.avg}%`
    },
    {
      label: mn ? 'Бодсон асуулт' : 'Questions answered',
      value: `${summary.questions.answered}`,
      caption: percentOf(summary.questions) === null ? (mn ? 'Бодоогүй' : 'None yet') : `${mn ? 'Нарийвчлал' : 'Accuracy'} ${percentOf(summary.questions)}%`
    },
    {
      label: mn ? 'Бүтэн шалгалт' : 'Full tests',
      value: `${summary.tests.count}`,
      caption: summary.tests.avg === null ? (mn ? 'Өгөөгүй' : 'None yet') : `${mn ? 'Дундаж' : 'Average'} ${summary.tests.avg}%`
    },
    {
      label: mn ? 'Тоглоом, escape room' : 'Games and escape room',
      value: `${summary.games.count}`,
      caption: summary.games.avg === null ? (mn ? 'Тоглоогүй' : 'None yet') : `${mn ? 'Дундаж' : 'Average'} ${summary.games.avg}%`
    }
  ];
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
      {tiles.map(t => (
        <div key={t.label} className="p-2.5 rounded-xl border border-slate-700 bg-slate-900/60 space-y-0.5">
          <div className={HEAD}>{t.label}</div>
          <div className="text-base font-extrabold font-mono text-white">{t.value}</div>
          <div className="text-[10px] text-slate-400">{t.caption}</div>
        </div>
      ))}
    </div>
  );
};

// The student's activity by day, week or month, stacked by kind, from the daily counts the sync sends
const ActivityGraph: React.FC<{ daily: Record<string, DayTally>; mn: boolean }> = ({ daily, mn }) => {
  const [period, setPeriod] = useState<Period>('day');
  const buckets = periodBuckets(dailyEvents(daily), period, CHART_KINDS.map(k => k.id));
  const busiest = Math.max(1, ...buckets.map(b => b.total));
  const total = buckets.reduce((n, b) => n + b.total, 0);
  const active = buckets.filter(b => b.total > 0).length;
  const labelEvery = period === 'day' ? 5 : 2;

  return (
    <div className={CARD}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className={HEAD}>{mn ? 'Идэвх' : 'Activity'}</div>
        <div className="inline-flex p-0.5 rounded-lg bg-slate-800">
          {PERIODS.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id)}
              aria-pressed={period === p.id}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${period === p.id ? 'bg-slate-950 text-white' : 'text-slate-400'}`}
            >
              {mn ? p.mn : p.en}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 text-[10px] text-slate-400">
        {CHART_KINDS.map(k => (
          <span key={k.id} className="inline-flex items-center gap-1">
            <span className={`w-2.5 h-2.5 rounded-sm ${k.bar}`} />
            {mn ? k.mn : k.en}
          </span>
        ))}
      </div>
      <div className="flex items-end gap-1 h-36">
        {buckets.map(b => (
          <div key={b.start.getTime()} className="flex-1 min-w-0 h-full flex flex-col justify-end" title={`${bucketLabel(b.start, period)}: ${b.total}`}>
            <div className="flex flex-col-reverse w-full overflow-hidden rounded-t" style={{ height: `${(b.total / busiest) * 100}%` }}>
              {CHART_KINDS.map(k =>
                b.counts[k.id] > 0 ? <div key={k.id} className={k.bar} style={{ height: `${(b.counts[k.id] / b.total) * 100}%` }} /> : null
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        {buckets.map((b, i) => (
          <div key={b.start.getTime()} className="relative flex-1 min-w-0 h-3">
            {i % labelEvery === 0 && (
              <span className="absolute left-0 top-0 whitespace-nowrap text-[9px] font-mono text-slate-400">{bucketLabel(b.start, period)}</span>
            )}
          </div>
        ))}
      </div>
      <div className="text-[11px] text-slate-400">{mn ? `Нийт: ${total} · идэвхтэй: ${active}` : `Total: ${total} · active: ${active}`}</div>
    </div>
  );
};

// A time in minutes or hours, in the language of the page
const durationText = (seconds: number, mn: boolean): string => {
  const minutes = Math.round(seconds / 60);
  if (minutes < 1) return mn ? '1 мин-аас бага' : 'under 1 min';
  if (minutes < 60) return mn ? `${minutes} мин` : `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return mn ? `${hours} ц ${rest} мин` : `${hours} h ${rest} min`;
};

// The time the student spent in the programme: each chapter (its lessons' time is included in it), and each lesson under its chapter
const StudyTime: React.FC<{
  study: StudyTotals | undefined;
  chapters: { id: string; number: number; titleEn: string; titleMn: string }[];
  mn: boolean;
}> = ({ study, chapters, mn }) => {
  const chapterSeconds = study?.chapters ?? {};
  const lessons = Object.entries(study?.lessons ?? {});
  const total = Object.values(chapterSeconds).reduce((n, s) => n + s, 0);
  const lessonsOf = (chapterId: string) => lessons.filter(([, l]) => l.chapterId === chapterId);
  const known = new Set(chapters.map(ch => ch.id));
  const shown = chapters.filter(ch => (chapterSeconds[ch.id] ?? 0) > 0 || lessonsOf(ch.id).length > 0);
  const others = lessons.filter(([, l]) => !known.has(l.chapterId));
  return (
    <div className={CARD}>
      <div className={HEAD}>{mn ? 'Хичээл судалсан цаг' : 'Time studying'}</div>
      <div className="text-[11px] text-slate-400">
        {mn ? `Нийт: ${durationText(total, mn)}` : `Total: ${durationText(total, mn)}`}
      </div>
      {total === 0 ? (
        <p className="text-xs text-slate-500">{mn ? 'Хараахан цаг бүртгэгдээгүй.' : 'No time recorded yet.'}</p>
      ) : (
        <ul className="space-y-1.5">
          {shown.map(ch => (
            <li key={ch.id} className="space-y-0.5">
              <div className="flex justify-between gap-2 text-xs">
                <span className="truncate text-slate-300">
                  {ch.number}. {mn ? ch.titleMn : ch.titleEn}
                </span>
                <span className="shrink-0 font-mono text-slate-300">{durationText(chapterSeconds[ch.id] ?? 0, mn)}</span>
              </div>
              {lessonsOf(ch.id).map(([id, l]) => (
                <div key={id} className="flex justify-between gap-2 pl-3 text-[11px]">
                  <span className="truncate text-slate-400">{mn ? l.title.mn : l.title.en}</span>
                  <span className="shrink-0 font-mono text-slate-400">{durationText(l.seconds, mn)}</span>
                </div>
              ))}
            </li>
          ))}
          {others.map(([id, l]) => (
            <li key={id} className="flex justify-between gap-2 text-[11px]">
              <span className="truncate text-slate-400">{mn ? l.title.mn : l.title.en}</span>
              <span className="shrink-0 font-mono text-slate-400">{durationText(l.seconds, mn)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Every chapter of the programme with the student's answers in it; a chapter with no questions yet shows as missing
const ChapterList: React.FC<{
  chapters: { id: string; number: number; titleEn: string; titleMn: string }[];
  summary: CourseSummary;
  bankCount: Record<string, number>;
  mn: boolean;
}> = ({ chapters, summary, bankCount, mn }) => {
  const answered = chapters.filter(ch => (summary.chapters?.[ch.id]?.answered ?? 0) > 0).length;
  return (
    <div className={CARD}>
      <div className={HEAD}>{mn ? 'Шалгалт бүлгээр' : 'Exams by chapter'}</div>
      <div className="text-[11px] text-slate-400">
        {mn ? `${chapters.length} бүлгийн ${answered} нь бодогдсон` : `${answered} of ${chapters.length} chapters answered`}
      </div>
      <ul className="space-y-1.5">
        {chapters.map(ch => {
          const t = summary.chapters?.[ch.id];
          const count = t?.answered ?? 0;
          const pct = t ? percentOf(t) : null;
          return (
            <li key={ch.id} className="space-y-0.5">
              <div className="flex justify-between gap-2 text-xs">
                <span className="truncate text-slate-300">
                  {ch.number}. {mn ? ch.titleMn : ch.titleEn}
                </span>
                {bankCount[ch.id] === 0 ? (
                  <span className="shrink-0 italic text-slate-500">{mn ? 'Асуулт бэлэн биш' : 'No questions yet'}</span>
                ) : count === 0 ? (
                  <span className="shrink-0 text-slate-500">{mn ? 'Өгөөгүй' : 'Not done yet'}</span>
                ) : (
                  <span className={`shrink-0 font-mono font-bold ${(pct ?? 0) >= 60 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {pct}% · {count}
                  </span>
                )}
              </div>
              {bankCount[ch.id] > 0 && (
                <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full ${(pct ?? 0) >= 60 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${pct ?? 0}%` }} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// The text of a result, in the language on screen: a lesson or test title is kept in both languages
const textOf = (r: StoredResult, mn: boolean): string => {
  const raw = r.label as unknown;
  const text =
    typeof raw === 'string'
      ? raw
      : raw && typeof raw === 'object'
        ? String((mn ? (raw as { mn?: string }).mn : (raw as { en?: string }).en) ?? '')
        : '';
  return text || (mn ? 'Нэргүй' : 'Untitled');
};

// A heading split in two: the code (Ch1 / L2, or L2 for an older lesson) and the title under it
const splitHead = (label: string): { code: string; title: string } => {
  if (/^Ch\d+ \/ L\d+$/.test(label)) return { code: label, title: '' };
  const lesson = label.match(/^(?:Lesson\s+|)(\d+)(?:-р хичээл)?\s*·\s*(.*)$/);
  if (lesson) return { code: `L${lesson[1]}`, title: lesson[2] };
  return { code: '', title: label };
};

// The small word above a heading that names its kind of activity// The small word above a heading that names its kind of activity
const KIND_TAG: Record<string, { en: string; mn: string }> = {
  exit: { en: 'Lesson', mn: 'Хичээл' },
  practice: { en: 'Practice', mn: 'Дасгал' },
  test: { en: 'Test', mn: 'Тест' },
  game: { en: 'Game', mn: 'Тоглоом' },
  escape: { en: 'Game', mn: 'Тоглоом' },
};
// One column of the journal: a lesson, practice set, test or game
type JournalColumn = { key: string; label: string; rank: number; kind: string; chapter: number | null; caption?: string };
type JournalPerson = { uid: string; name: string; cls: string };

// The topic of a lesson: the first two parts of its first learning outcome, for example 4.2
const topicOf = (l: { los: Array<{ code: string }> }): string => (l.los[0]?.code ?? '').split('.').slice(0, 2).join('.');

// A practice, test or game label split into its lesson, its own name, and its short name (the lesson, then the own name)
const splitLabel = (label: string): { short: string; lesson: string; own: string } => {
  const parts = label.split(' · ').map(p => p.trim());
  if (parts.length < 2) return { short: parts[0] || label, lesson: parts[0] || '', own: '' };
  const own = parts[1].split(/[:→(]/)[0].trim();
  return { short: own ? `${parts[0]} · ${own}` : parts[0], lesson: parts[0], own };
};
const headOf = (label: string): string => splitLabel(label).short;
// The heading row above a set of columns: each run of lessons under one chapter, or of the other kinds under their kind
const runsOf = (columns: JournalColumn[], board: 'igcse' | 'alevel', mn: boolean): { count: number; label: string }[] => {
  const chapterName = (n: number): string => {
    const ch = (board === 'igcse' ? CURRICULUM_CHAPTERS : ALEVEL_CHAPTERS).find(x => x.number === n);
    const title = ch ? (mn ? ch.titleMn : ch.titleEn) : '';
    // The same form as the Study section's chapter list: the number, a full stop, then the title
    return title ? `${n}. ${title}` : `${n}`;
  };
  const runs: { count: number; label: string }[] = [];
  let previous = '';
  columns.forEach(c => {
    const tag = KIND_TAG[c.kind];
    const key = c.kind !== 'exit' ? `kind:${tag?.en ?? c.kind}` : `ch${c.chapter}`;
    const label = c.kind !== 'exit' ? (tag ? (mn ? tag.mn : tag.en) : c.kind) : chapterName(c.chapter ?? 0);
    if (runs.length > 0 && key === previous) runs[runs.length - 1].count += 1;
    else runs.push({ count: 1, label });
    previous = key;
  });
  return runs;
};

// One journal table: a heading row of chapters or kinds, a heading row of names, then the students by class
const JournalTable: React.FC<{
  title: string;
  columns: JournalColumn[];
  runs: { count: number; label: string }[];
  groups: { cls: string; students: JournalPerson[] }[];
  cell: (uid: string, key: string) => StoredResult | undefined;
  selected: string | null;
  onPick: (uid: string) => void;
  mn: boolean;
}> = ({ title, columns, runs, groups, cell, selected, onPick, mn }) => (
  <div className={`${CARD} overflow-x-auto`}>
    <div className={HEAD}>{title}</div>
    <table className="text-xs border-separate border-spacing-0">
      <thead>
        <tr>
          <th colSpan={2} />
          {runs.map((run, idx) => (
            <th key={idx} colSpan={run.count} className="py-1 px-2 text-[11px] font-bold text-emerald-300 border border-slate-700 whitespace-nowrap text-center">
              {run.label}
            </th>
          ))}
        </tr>
        <tr className="text-slate-400">
          <th className="sticky left-0 z-20 bg-slate-900 w-[10rem] min-w-[10rem] max-w-[10rem] py-1.5 pr-3 font-bold whitespace-nowrap text-left">{mn ? 'Сурагч' : 'Student'}</th>
          <th className="sticky left-[10rem] z-20 bg-slate-900 py-1.5 pr-3 font-bold whitespace-nowrap text-left">{mn ? 'Анги' : 'Class'}</th>
          {columns.map(c => {
            // A practice, test or game is headed by its name; a lesson by its code
            return (
              <th key={c.key} title={c.label} className="py-1.5 px-2 font-bold whitespace-nowrap text-center border border-slate-700 text-slate-200">
                {c.caption ?? (c.kind === 'exit' ? splitHead(c.label).code || (mn ? 'Хичээл' : 'Lesson') : c.label)}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {groups.map((g, gi) => (
          <React.Fragment key={g.cls}>
            {/* A gap before each class after the first, so one class's students end visibly before the next begins */}
            {gi > 0 && (
              <tr aria-hidden="true">
                <td colSpan={2 + columns.length} className="p-0 h-3" />
              </tr>
            )}
            <tr className={`${classTone(g.cls).head} border-l-4 ${classTone(g.cls).bar}`}>
              <td colSpan={2 + columns.length} className={`py-1.5 px-2 text-xs font-black tracking-wide ${classTone(g.cls).text}`}>
                {g.cls} <span className="font-normal opacity-80">· {mn ? `${g.students.length} сурагч` : `${g.students.length} students`}</span>
              </td>
            </tr>
            {g.students.map(s => (
              <tr
                key={s.uid}
                onClick={() => onPick(s.uid)}
                className={`cursor-pointer border-t border-slate-800 hover:bg-slate-800/60 ${s.uid === selected ? 'bg-purple-500/10' : ''}`}
              >
                <td className={`sticky left-0 z-10 bg-slate-900 w-[10rem] min-w-[10rem] max-w-[10rem] truncate border-l-4 ${classTone(g.cls).bar} py-1.5 pl-2 pr-3 font-bold text-white whitespace-nowrap`}>{s.name}</td>
                <td className={`sticky left-[10rem] z-10 bg-slate-900 py-1.5 pr-3 font-mono font-bold whitespace-nowrap ${classTone(g.cls).text}`}>{g.cls}</td>
                {columns.map(c => {
                  const r = cell(s.uid, c.key);
                  return (
                    <td key={c.key} className={`py-1.5 px-2 text-center font-mono whitespace-nowrap border border-slate-800 ${scoreClass(r)}`}>
                      {r ? Math.round(r.percent) : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);
// The look of a chapter button: the chapter on screen is filled
// Every tab on this page has the same size and shape, so they read the same way; the picked one is filled
const TAB_BASE = 'inline-flex items-center justify-center min-w-[3.5rem] px-3 py-1.5 rounded-lg text-xs border transition-colors';
const chapterButtonClass = (on: boolean): string =>
  `${TAB_BASE} font-bold ${on ? 'bg-emerald-600 text-white border-emerald-500' : 'text-slate-300 border-slate-600 hover:bg-slate-800'}`;

// The colour of a journal cell: green from 80%, amber from 50%, red below, grey where the student has no result
const scoreClass = (r: StoredResult | undefined): string => {
  if (!r) return 'text-slate-600';
  if (r.percent >= 80) return 'text-emerald-300 bg-emerald-500/10';
  if (r.percent >= 50) return 'text-amber-300 bg-amber-500/10';
  return 'text-rose-300 bg-rose-500/10';
};
// The programme's statistics: each kind's average over the students who have one, as bars on the teacher's monitor
const ProgrammeStats: React.FC<{ students: StudentSummary[]; course: keyof ResultSummaries; mn: boolean }> = ({ students, course, mn }) => {
  const rows = students.filter(s => s.results[course]).map(s => s.results[course]);
  if (rows.length === 0) return null;
  const avgOf = (pick: (r: CourseSummary) => number | null) => {
    const vals = rows.map(pick).filter((v): v is number => v !== null);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  };
  const accuracy = (r: CourseSummary) => (r.questions.max > 0 ? (r.questions.earned / r.questions.max) * 100 : null);
  const bars = [
    { label: mn ? 'Хичээлийн шалгалт' : 'Lesson tickets', value: avgOf(r => r.lessons.avg), bar: 'bg-sky-500' },
    { label: mn ? 'Бүтэн шалгалт' : 'Full tests', value: avgOf(r => r.tests.avg), bar: 'bg-violet-500' },
    { label: mn ? 'Тоглоом, escape room' : 'Games and escape room', value: avgOf(r => r.games.avg), bar: 'bg-amber-400' },
    { label: mn ? 'Асуултын нарийвчлал' : 'Question accuracy', value: avgOf(accuracy), bar: 'bg-emerald-500' },
  ];
  return (
    <div className={CARD}>
      <div className={HEAD}>
        {mn ? `Хөтөлбөрийн статистик · ${rows.length} сурагч` : `Programme statistics · ${rows.length} students`}
      </div>
      <div className="space-y-2">
        {bars.map(b => (
          <div key={b.label} className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>{b.label}</span>
              <span className="font-mono">{b.value === null ? '—' : `${b.value}%`}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className={`h-full ${b.bar}`} style={{ width: `${b.value ?? 0}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// The student's results of the programme, newest first, with the filter chosen and the feedback box where it applies
const ResultsList: React.FC<{
  results: StoredResult[] | undefined;
  filter: Filter;
  onFilter: (f: Filter) => void;
  label: (r: StoredResult) => string;
  onSave: (r: StoredResult, text: string) => Promise<void>;
  mn: boolean;
}> = ({ results, filter, onFilter, label, onSave, mn }) => {
  const shown = (results ?? []).filter(r => matchesFilter(r, filter));
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className={HEAD}>{mn ? 'Үр дүн' : 'Results'}</div>
        <div className="flex flex-wrap gap-1">
          {FILTERS.map(f => {
            // The tab shows how many of this student's results it holds, so the teacher sees each kind at a glance
            const count = (results ?? []).filter(r => matchesFilter(r, f.id)).length;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                  filter === f.id ? 'bg-purple-500/20 text-purple-200 border-purple-500/50' : 'text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                {mn ? f.mn : f.en} <span className="ml-0.5 font-mono opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>
      {!results ? (
        <p className="text-xs text-slate-400">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>
      ) : shown.length === 0 ? (
        <p className="text-xs text-slate-400">{mn ? 'Энэ ангилалд үр дүн алга.' : 'No results in this group.'}</p>
      ) : (
        <ul className="space-y-3">
          {shown.map(r => (
            <li key={r.id} className="space-y-1.5 pb-3 border-b border-slate-800 last:border-0">
              <div className="flex justify-between gap-2 text-xs">
                <span className="truncate text-slate-200">{label(r)}</span>
                <span className="shrink-0 font-mono text-slate-400">
                  {dateText(r.takenAt)} · {r.percent}%{r.kind === 'exit' ? ` · ${cambridgeGrade(r.percent).letter}` : ''}
                </span>
              </div>
              {FEEDBACK_KINDS.includes(r.kind) ? (
                <FeedbackBox item={r} mn={mn} onSave={text => onSave(r, text)} />
              ) : (
                <div className="text-[11px] text-slate-500">{mn ? 'Зөвхөн үр дүн' : 'Results only'}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// The teacher's monitor of every student in the programme on screen: a list to search, and for the chosen student the totals,
// the activity by period, every chapter's exam results, and all results with feedback.
export const TeacherResults: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { courseChoice } = useApp();
  const [students, setStudents] = useState<StudentSummary[] | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [recent, setRecent] = useState<Record<string, StoredResult[]>>({});
  // Every student's newest results, for the results table on the board
  const [allRecent, setAllRecent] = useState<Record<string, StoredResult[]>>({});
  const [boardError, setBoardError] = useState<string | null>(null);
  // The board shows one programme group at a time: IGCSE 0620, or 9701 (AS and A Level)
  const [board, setBoard] = useState<'igcse' | 'alevel'>(courseChoice === 'igcse' ? 'igcse' : 'alevel');
  // The chapter on screen: null means the first chapter with a record; 'all' shows every chapter
  const [chapterPick, setChapterPick] = useState<number | 'all' | null>(null);
  // The class tab on show: one class, or all of them
  const [classPick, setClassPick] = useState<string | 'all'>('all');
  // Every enrolment of the programme, kept from the load, for the enrolled students on the board
  const [enrolments, setEnrolments] = useState<Enrollment[]>([]);
  // Each student's class (for example 10A), from the enrolment of the programme on screen
  const [grades, setGrades] = useState<Record<string, string>>({});
  // The name each student gave on the enrolment form. The results summary keeps a placeholder name, so this one is shown first.
  const [enrolledNames, setEnrolledNames] = useState<Record<string, string>>({});
  const nameOf = (s: StudentSummary) => enrolledNames[s.uid] ?? s.name;
  const { user } = useAuthUser();

  useEffect(() => {
    loadStudentSummaries()
      .then(list => setStudents(list))
      .catch(e => setFailed(String((e as { code?: string }).code ?? (e as Error).message ?? 'unknown')));
  }, []);

  useEffect(() => {
    loadEnrollments()
      .then(list => {
        const map: Record<string, string> = {};
        list.forEach(e => {
          if (!e.grade) return;
          if (e.programme === courseChoice || !map[e.uid]) map[e.uid] = e.grade;
        });
        setGrades(map);
        setEnrolments(list);
        const nameMap: Record<string, string> = {};
        list.forEach(e => {
          if (e.uid && e.name && e.name !== 'Student') nameMap[e.uid] = e.name;
        });
        setEnrolledNames(nameMap);
      })
      .catch(() => {});
  }, [courseChoice]);

  // Every student's newest results, kept up to date, so a result that arrives while the board is open appears at once
  useEffect(() => subscribeAllRecentResults(
    all => {
      const byStudent: Record<string, StoredResult[]> = {};
      all.forEach(r => {
        byStudent[r.uid] = [...(byStudent[r.uid] ?? []), r];
      });
      setAllRecent(byStudent);
      setBoardError(null);
    },
    e => setBoardError(String((e as { code?: string }).code ?? (e as Error).message ?? e))
  ), []);
  const bank = useMemo(() => courseQuestions(courseChoice), [courseChoice]);
  const chapters = useMemo(
    () => (courseChoice === 'igcse' ? CURRICULUM_CHAPTERS : visibleChapters(ALEVEL_CHAPTERS, alevelCourse(courseChoice))),
    [courseChoice]
  );
  // The questions the app holds for each chapter; a chapter with none is shown as missing
  const bankCount = useMemo(
    () =>
      Object.fromEntries(
        chapters.map(ch => {
          const ids = new Set(ch.topics.map(t => t.id));
          return [ch.id, bank.filter(q => ids.has(q.topicId)).length];
        })
      ),
    [chapters, bank]
  );

  // The students who have sent results for this programme, the most recently active first, filtered by the search
  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (students ?? [])
      .filter(s => s.results[courseChoice])
      .filter(s => !needle || nameOf(s).toLowerCase().includes(needle))
      .sort((a, b) => b.resultsAt.localeCompare(a.resultsAt));
  }, [students, courseChoice, query, enrolledNames]);

  // The list grouped by class, 7A to 12D, a heading before each class and the students of that class under it
  type Grouped = { kind: 'head'; cls: string; count: number } | { kind: 'student'; student: StudentSummary };
  const groupedRows = useMemo<Grouped[]>(() => {
    const byClass = new Map<string, StudentSummary[]>();
    rows.forEach(s => {
      const cls = grades[s.uid] ?? '—';
      byClass.set(cls, [...(byClass.get(cls) ?? []), s]);
    });
    // The class picked in the class tabs: only its students are listed; All lists every class
    const classes = [...byClass.keys()]
      .filter(c => classPick === 'all' || c === classPick)
      .sort((a, b) => (a === '—' ? 1 : b === '—' ? -1 : a.localeCompare(b)));
    return classes.flatMap<Grouped>(cls => {
      const list = byClass.get(cls) ?? [];
      return [{ kind: 'head', cls, count: list.length }, ...list.map(student => ({ kind: 'student' as const, student }))];
    });
  }, [rows, grades, classPick]);

  // The lessons of the board, in the order of the Lessons page, each coded Ch<chapter> / L<lesson>, with its topic
  const lessonPlan = useMemo<{ code: string; chapter: number; topic: string; lessonNo: number; title: { en: string; mn: string } }[]>(() => {
    if (board === 'igcse') {
      return [...CURRICULUM_CHAPTERS]
        .sort((a, b) => a.number - b.number)
        .flatMap(ch => {
          const lessons = ch.id === 'ch-states-of-matter' ? STATES_LESSONS : (IGCSE_LESSON_SERIES[ch.id]?.lessons ?? []);
          return lessons.map(l => ({ code: `Ch${ch.number} / L${l.number}`, chapter: ch.number, topic: topicOf(l), lessonNo: l.number, title: l.title }));
        });
    }
    return [...ALEVEL_CHAPTERS]
      .sort((a, b) => a.number - b.number)
      .flatMap(ch => {
        const series = ALEVEL_LESSON_SERIES[ch.id];
        if (series) return series.lessons.map(l => ({ code: `Ch${ch.number} / L${l.number}`, chapter: ch.number, topic: topicOf(l), lessonNo: l.number, title: l.title }));
        return ALEVEL_INQUIRY[ch.id] ? [{ code: `Ch${ch.number} / L1`, chapter: ch.number, topic: '', lessonNo: 1, title: { en: '', mn: '' } }] : [];
      });
  }, [board]);

  // The class journal: the lessons of one chapter at a time, in the order of the Lessons page, then the practice sets, tests and games
  const journal = useMemo(() => {
    const RANK: Record<string, number> = { exit: 0, practice: 1, test: 2, game: 3, escape: 3 };
    const inBoard = (course: string) => (board === 'igcse' ? course === 'igcse' : course === 'as' || course === 'a');
    const planned = new Set(lessonPlan.map(p => p.code));
    const captionOf = (p: { topic: string; lessonNo: number }) => (p.topic ? `${p.topic} · L${p.lessonNo}` : `L${p.lessonNo}`);
    // A practice belongs to a lesson by the lesson's title, in either language: its caption and its chapter
    const byTitle = new Map<string, { caption: string; chapter: number }>();
    lessonPlan.forEach(p => {
      const entry = { caption: captionOf(p), chapter: p.chapter };
      if (p.title.en) byTitle.set(p.title.en, entry);
      if (p.title.mn) byTitle.set(p.title.mn, entry);
    });
    // An older lesson ticket has no code; its title, in either language, finds the lesson on the Lessons page
    const titleToCode = new Map<string, string>();
    lessonPlan.forEach(p => {
      if (p.title.en) titleToCode.set(p.title.en, p.code);
      if (p.title.mn) titleToCode.set(p.title.mn, p.code);
    });
    const cols = new Map<string, JournalColumn>();
    lessonPlan.forEach(p => cols.set(`exit|${p.code}`, { key: `exit|${p.code}`, label: p.code, rank: 0, kind: 'exit', chapter: p.chapter, caption: captionOf(p) }));
    const latest = new Map<string, StoredResult>();
    Object.entries(allRecent).forEach(([uid, list]) => {
      list.forEach(r => {
        if (RANK[r.kind] === undefined || !inBoard(r.course)) return;
        const full = textOf(r, mn);
        // A lesson ticket counts only when its code, or its title, is a lesson on the Lessons page
        const title = full.split(' · ').slice(1).join(' · ').trim();
        const lessonCode = r.kind === 'exit' ? (planned.has(full) ? full : (titleToCode.get(title) ?? '')) : '';
        if (r.kind === 'exit' && !planned.has(lessonCode)) return;
        const parts = splitLabel(full);
        const label = r.kind === 'exit' ? lessonCode : parts.short;
        const key = `${r.kind}|${label}`;
        if (!cols.has(key)) {
          const lesson = byTitle.get(parts.lesson);
          cols.set(key, {
            key,
            label,
            rank: RANK[r.kind],
            kind: r.kind,
            chapter: r.kind === 'exit' ? null : lesson?.chapter ?? null,
            caption: r.kind === 'exit' ? undefined : lesson ? `${lesson.caption} · ${parts.own || parts.lesson}` : label,
          });
        }
        const id = `${uid}|${key}`;
        const prev = latest.get(id);
        if (!prev || r.takenAt > prev.takenAt) latest.set(id, r);
      });
    });
    // The column keys that have at least one result, so a lesson with no record is not shown
    const usedKeys = new Set<string>();
    latest.forEach((_, id) => usedKeys.add(id.slice(id.indexOf('|') + 1)));
    // Lessons keep the Lessons page's order; the other kinds sort by name
    const columns = [...cols.values()]
      .filter(c => c.kind !== 'exit' || usedKeys.has(c.key))
      .sort((a, b) => a.rank - b.rank || (a.rank === 0 ? 0 : a.label.localeCompare(b.label, undefined, { numeric: true })));
    // The chapters that have a lesson with a record, and the one on screen: the first, unless one is picked
    const chapters = [...new Set(columns.filter(c => c.kind === 'exit' && c.chapter !== null).map(c => c.chapter as number))].sort((a, b) => a - b);
    const shown: number | 'all' = chapterPick === null ? (chapters[0] ?? 'all') : chapterPick;
    const inShown = (c: JournalColumn) => shown === 'all' || c.chapter === shown;
    // The enrolled students of this board: approved or paused in one of its programmes
    const people = new Map<string, { uid: string; name: string; cls: string }>();
    enrolments
      .filter(e => (e.status === 'approved' || e.status === 'suspended') && inBoard(e.programme))
      .forEach(e => {
        if (!people.has(e.uid)) people.set(e.uid, { uid: e.uid, name: e.name, cls: e.grade ?? '—' });
      });
    const byClass = new Map<string, { uid: string; name: string; cls: string }[]>();
    [...people.values()].forEach(p => byClass.set(p.cls, [...(byClass.get(p.cls) ?? []), p]));
    const groups = [...byClass.keys()]
      .sort((a, b) => (a === '—' ? 1 : b === '—' ? -1 : a.localeCompare(b)))
      .map(cls => ({ cls, students: byClass.get(cls) ?? [] }));
    const lessonColumnsOnly = columns.filter(c => c.kind === 'exit' && inShown(c));
    const lessonColumns: JournalColumn[] = [...lessonColumnsOnly];
    // The chapter's average: once a student has a result for every lesson of the chapter on screen, the mean of those results
    if (shown !== 'all' && lessonColumnsOnly.length > 0) {
      const summaryKey = `exit|result ch${shown}`;
      const totalLessons = lessonPlan.filter(p => p.chapter === shown).length;
      // Everything in the chapter: its lessons, and the practice sets, tests and games that belong to it
      const everything = columns.filter(c => c.chapter === shown);
      Object.keys(allRecent).forEach(uid => {
        const lessonScores = lessonPlan
          .filter(p => p.chapter === shown)
          .map(p => latest.get(`${uid}|exit|${p.code}`))
          .filter((r): r is StoredResult => r !== undefined);
        if (totalLessons === 0 || lessonScores.length < totalLessons) return;
        const scores = everything
          .map(c => latest.get(`${uid}|${c.key}`))
          .filter((r): r is StoredResult => r !== undefined);
        if (scores.length === 0) return;
        const average = Math.round(scores.reduce((sum, r) => sum + r.percent, 0) / scores.length);
        latest.set(`${uid}|${summaryKey}`, { ...scores[0], percent: average });
      });      lessonColumns.push({ key: summaryKey, label: summaryKey, rank: 0, kind: 'exit', chapter: shown, caption: mn ? 'Бүлгийн дүн' : 'Chapter result' });
    }
    const otherColumns = columns.filter(c => c.kind !== 'exit' && inShown(c));
    return {
      chapters,
      shown,
      lessonColumns,
      otherColumns,
      lessonRuns: runsOf(lessonColumns, board, mn),
      otherRuns: runsOf(otherColumns, board, mn),
      groups,
      cell: (uid: string, key: string) => latest.get(`${uid}|${key}`),
    };
  }, [allRecent, enrolments, board, mn, lessonPlan, chapterPick]);
  // The class on show: the one picked in the class tabs, or all of them when that class is no longer in the list
  const activeClass = classPick === 'all' || journal.groups.some(g => g.cls === classPick) ? classPick : 'all';
  const visibleGroups = activeClass === 'all' ? journal.groups : journal.groups.filter(g => g.cls === activeClass);
  const detail = (students ?? []).find(s => s.uid === selected) ?? null;

  const choose = (uid: string) => {
    setSelected(uid);
    setFilter('all');
    if (!recent[uid]) {
      loadRecentResults(uid)
        .then(list => setRecent(prev => ({ ...prev, [uid]: list })))
        .catch(() => setRecent(prev => ({ ...prev, [uid]: [] })));
    }
  };

  const saveFeedback = (uid: string, item: StoredResult, text: string) =>
    saveResultFeedback(uid, item.id, text).then(() =>
      setRecent(prev => ({
        ...prev,
        [uid]: (prev[uid] ?? []).map(r => (r.id === item.id ? { ...r, feedback: text, feedbackAt: new Date().toISOString() } : r))
      }))
    );

  const resultLabel = (r: StoredResult): string => {
    if (r.label) return mn ? r.label.mn : r.label.en;
    if (r.kind === 'test') {
      const test = MOCK_TESTS.find(t => t.id === r.testId);
      return test ? (mn ? test.titleMn : test.titleEn) : r.testId ?? '';
    }
    if (r.kind === 'question') {
      const q = bank.find(x => x.id === r.questionId);
      return q ? (mn ? q.titleMn : q.titleEn) : r.questionId ?? '';
    }
    return r.kind;
  };

  const lastActive = (s: StudentSummary) => {
    const days = Object.keys(s.results[courseChoice]?.daily ?? {}).sort();
    return days.length ? days[days.length - 1] : s.resultsAt ? dateText(Date.parse(s.resultsAt)) : '';
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">{mn ? 'Суралцагчдын хяналт' : 'Student monitor'}</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          {mn
            ? 'Хөтөлбөр дээрх сурагч бүрийн бүх үйл ажиллагаа: хичээлийн шалгалт, асуулт, бүтэн шалгалт, тоглоом, идэвх, бүлгээр шалгалт. Хичээлийн шалгалт, бүтэн шалгалт, асуултад санал бичнэ. Тоглоом, escape room-д зөвхөн үр дүн харагдана.'
            : 'Everything each student does in the programme on screen: lesson tickets, questions, full tests, games, activity over time, and exams by chapter. Feedback goes on lesson tickets, full tests and answered questions; games and the escape room show results only.'}
        </p>
      </div>

      {students && students.length > 0 && <ProgrammeStats students={students} course={courseChoice} mn={mn} />}

      <div className="flex flex-wrap items-center gap-2">
        <span className="w-20 shrink-0 text-xs font-bold text-slate-400">{mn ? 'Хөтөлбөр' : 'Programme'}</span>
        {([['igcse', 'IGCSE 0620'], ['alevel', '9701 (AS / A Level)']] as const).map(([id, name]) => (
          <button
            key={id}
            type="button"
            onClick={() => setBoard(id)}
            aria-pressed={board === id}
            className={chapterButtonClass(board === id)}
          >
            {name}
          </button>
        ))}
      </div>

      {students && journal.groups.length === 0 && (
        <p className="text-sm text-slate-400">{mn ? 'Энэ хөтөлбөрт элссэн сурагч алга.' : 'No enrolled student in this programme.'}</p>
      )}

      {boardError && (
        <p className="text-xs text-rose-400">
          {mn ? 'Үр дүнг ачаалж чадсангүй:' : 'Could not load the results:'} <span className="font-mono">{boardError}</span>
        </p>
      )}

      {students && journal.groups.length > 0 && (
        <div className="space-y-4">
          {/* One tab per class, so a class's students are read on their own; All shows every class, one below the other */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="w-20 shrink-0 text-xs font-bold text-slate-400">{mn ? 'Анги' : 'Class'}</span>
            {journal.groups.map(g => {
              const tone = classTone(g.cls);
              const on = activeClass === g.cls;
              return (
                <button
                  key={g.cls}
                  type="button"
                  onClick={() => setClassPick(g.cls)}
                  aria-pressed={on}
                  className={on ? `${TAB_BASE} font-bold ${tone.head} ${tone.text} ${tone.bar}` : chapterButtonClass(false)}
                >
                  {g.cls} <span className="font-normal opacity-80">· {g.students.length}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setClassPick('all')}
              aria-pressed={activeClass === 'all'}
              className={chapterButtonClass(activeClass === 'all')}
            >
              {mn ? 'Бүгд' : 'All'}
            </button>
          </div>
          {journal.chapters.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="w-20 shrink-0 text-xs font-bold text-slate-400">{mn ? 'Бүлэг' : 'Chapter'}</span>
              {journal.chapters.map(n => (
                <button key={n} type="button" onClick={() => setChapterPick(n)} aria-pressed={journal.shown === n} className={chapterButtonClass(journal.shown === n)}>
                  {n}
                </button>
              ))}
              <button type="button" onClick={() => setChapterPick('all')} aria-pressed={journal.shown === 'all'} className={chapterButtonClass(journal.shown === 'all')}>
                {mn ? 'Бүгд' : 'All'}
              </button>
            </div>
          )}
          {journal.lessonColumns.length > 0 && (
            <JournalTable
              title={mn ? 'Хичээл · сүүлийн оноо, %' : 'Lessons · latest score, %'}
              columns={journal.lessonColumns}
              runs={journal.lessonRuns}
              groups={visibleGroups}
              cell={journal.cell}
              selected={selected}
              onPick={choose}
              mn={mn}
            />
          )}
          {journal.otherColumns.length > 0 && (
            <JournalTable
              title={mn ? 'Дасгал, тест, тоглоом · сүүлийн оноо, %' : 'Practice, tests and games · latest score, %'}
              columns={journal.otherColumns}
              runs={journal.otherRuns}
              groups={visibleGroups}
              cell={journal.cell}
              selected={selected}
              onPick={choose}
              mn={mn}
            />
          )}
        </div>
      )}
      {failed && (
        isTeacher(user) ? (
          <p className="text-sm text-rose-400">
            {mn ? 'Үр дүнг ачаалж чадсангүй.' : 'Could not load the results.'} <span className="font-mono text-xs opacity-80">({failed})</span>
          </p>
        ) : (
          <TeacherSignInNotice mn={mn} />
        )
      )}

      {failed ? null : students === null ? (
        <p className="text-sm text-slate-400">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>
      ) : rows.length === 0 && !query ? (
        <p className="text-sm text-slate-400">{mn ? 'Одоогоор үр дүн илгээсэн сурагч алга.' : 'No student has sent results yet.'}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[17rem_minmax(0,1fr)] gap-4 items-start">
          <div className="space-y-2">
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={mn ? 'Нэрээр хайх…' : 'Search by name…'}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs"
            />
            <div className="text-[11px] text-slate-500">{mn ? `${rows.length} сурагч` : `${rows.length} students`}</div>
            <ul className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
              {groupedRows.map(item => {
                if (item.kind === 'head') {
                  return (
                    <li key={`head-${item.cls}`} className={`pt-2 text-xs font-black tracking-wide ${classTone(item.cls).text}`}>
                      {item.cls} · {item.count}
                    </li>
                  );
                }
                const s = item.student;
                const sum = s.results[courseChoice];
                const on = s.uid === selected;
                return (
                  <li key={s.uid}>
                    <button
                      type="button"
                      onClick={() => choose(s.uid)}
                      aria-pressed={on}
                      className={`w-full text-left p-2.5 rounded-xl border space-y-1 ${
                        on ? 'border-purple-500/50 bg-purple-500/10' : 'border-slate-700 bg-slate-900/60 hover:bg-slate-700/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white truncate">{nameOf(s)}</span>
                        <span className="shrink-0 text-[10px] font-mono text-slate-500">{lastActive(s)}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {sum.lessons.count} · {sum.questions.answered} · {sum.games.count}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-w-0">
            {!detail ? (
              <p className="text-sm text-slate-400">{mn ? 'Сурагч сонгоно уу.' : 'Choose a student to see their activity.'}</p>
            ) : (
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-white">{nameOf(detail)}</h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    {mn ? 'Сүүлд идэвхтэй: ' : 'Last active: '}
                    {lastActive(detail)}
                  </span>
                </div>
                <Totals summary={detail.results[courseChoice]} mn={mn} />
                <ActivityGraph daily={detail.results[courseChoice].daily ?? {}} mn={mn} />
                <ChapterList chapters={chapters} summary={detail.results[courseChoice]} bankCount={bankCount} mn={mn} />
                <StudyTime study={detail.results[courseChoice].study} chapters={chapters} mn={mn} />
                <ResultsList
                  results={recent[detail.uid]}
                  filter={filter}
                  onFilter={setFilter}
                  label={resultLabel}
                  onSave={(r, text) => saveFeedback(detail.uid, r, text)}
                  mn={mn}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
