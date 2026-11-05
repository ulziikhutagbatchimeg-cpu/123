import React, { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import {
  loadEnrollments,
  loadStudentSummaries,
  subscribeRecentResults,
  subscribeWaitingEnrollments,
  useAuthUser,
  type Enrollment,
  type RecentResult,
  type StudentSummary,
} from '../lib/cloud';

const PROGRAMME_LABEL: Record<string, string> = { igcse: 'IGCSE 0620', as: 'AS 9701', a: 'A Level 9701' };
const KIND_LABEL: Record<string, { en: string; mn: string }> = {
  exit: { en: 'Lesson ticket', mn: 'Хичээлийн бичлэг' },
  game: { en: 'Game', mn: 'Тоглоом' },
  escape: { en: 'Escape room', mn: 'Escape room' },
  practice: { en: 'Practice set', mn: 'Дасгалын багц' },
  question: { en: 'Question', mn: 'Асуулт' },
  test: { en: 'Test', mn: 'Тест' },
};

// The newest result the teacher has seen, kept on this device for the teacher's account
const seenKey = (uid: string) => `teacher-results-seen:${uid}`;
const readSeenAt = (uid: string): number | null => {
  try {
    const value = window.localStorage.getItem(seenKey(uid));
    return value ? Number(value) : null;
  } catch {
    return null;
  }
};
const writeSeenAt = (uid: string, at: number) => {
  try {
    window.localStorage.setItem(seenKey(uid), String(at));
  } catch {
    // Storage can be blocked; the count then stays until the next visit
  }
};

const pad = (n: number) => String(n).padStart(2, '0');
const stamp = (ms: number) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// The teacher's bell in the top bar. It counts the enrolment requests still waiting, plus the student results that came in
// since the teacher last opened the bell. Enrolment requests are decided in the Enrollments tab; results are only read.
export const TeacherBell: React.FC = () => {
  const { mode } = useLanguage();
  const { user } = useAuthUser();
  const uid = user?.uid ?? null;
  const mn = mode === 'mn';
  const [waiting, setWaiting] = useState<Enrollment[]>([]);
  const [recent, setRecent] = useState<RecentResult[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [summaries, setSummaries] = useState<StudentSummary[]>([]);
  const { courseChoice } = useApp();
  const [seen, setSeen] = useState(0);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => subscribeWaitingEnrollments(setWaiting, () => setWaiting([])), []);
  useEffect(() => subscribeRecentResults(setRecent, () => setRecent([])), []);

  // The student names, read again each time the list opens, so a new student's name shows up
  useEffect(() => {
    if (!open) return;
    let alive = true;
    loadEnrollments()
      .then(list => {
        if (!alive) return;
        const map: Record<string, string> = {};
        list.forEach(e => {
          if (e.uid) map[e.uid] = e.name;
        });
        setNames(map);
      })
      .catch(() => {});
    // Each student's overall evaluation for this programme, read again each time the list opens
    loadStudentSummaries()
      .then(list => {
        if (alive) setSummaries(list);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [open]);

  // The first time on this device, the count starts from now, so old results do not all show as new
  useEffect(() => {
    if (!uid) return;
    const stored = readSeenAt(uid);
    if (stored === null) {
      const now = Date.now();
      writeSeenAt(uid, now);
      setSeen(now);
    } else {
      setSeen(stored);
    }
  }, [uid]);

  // A click outside the bell closes its list
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  if (!uid) return null;

  // The overall evaluation of each student in this programme: average lesson ticket, full test and game, and question accuracy
  const pct = (v: number | null | undefined) => (v === null || v === undefined ? '—' : `${Math.round(v)}%`);
  const overall = summaries
    .filter(s => s.results[courseChoice])
    .map(s => {
      const sum = s.results[courseChoice];
      const q = sum.questions;
      return {
        uid: s.uid,
        name: s.name,
        lessons: pct(sum.lessons.avg),
        tests: pct(sum.tests.avg),
        games: pct(sum.games.avg),
        questions: q.max > 0 ? `${Math.round((q.earned / q.max) * 100)}%` : '—',
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const unreadResults = recent.filter(r => r.takenAt > seen).length;
  const total = waiting.length + unreadResults;
  const label = mn ? 'Багшийн мэдэгдэл' : 'Teacher alerts';

  const toggle = () => {
    if (!open) {
      const now = Date.now();
      writeSeenAt(uid, now);
      setSeen(now);
    }
    setOpen(v => !v);
  };

  const kindLabel = (r: RecentResult) => {
    if (r.label) return r.label;
    const k = KIND_LABEL[r.kind];
    return k ? (mn ? k.mn : k.en) : r.kind;
  };
  const nameOf = (student: string) => names[student] ?? (mn ? 'Сурагч' : 'Student');

  return (
    <div className="relative" ref={boxRef}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={total > 0 ? `${label} (${total})` : label}
        title={label}
        className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-emerald-400 dark:hover:border-teal-500"
      >
        <Bell className="w-4 h-4" aria-hidden="true" />
        {total > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold leading-[18px] text-center">
            {total}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 sm:w-96 max-h-[28rem] overflow-y-auto p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl">
          <div className="mb-2 text-sm font-bold text-slate-900 dark:text-white">{label}</div>

          <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {mn ? 'Элсэлтийн хүсэлт' : 'Enrolment requests'}
          </div>
          {waiting.length === 0 ? (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{mn ? 'Хүлээгдэж буй хүсэлт алга.' : 'No requests waiting.'}</p>
          ) : (
            <ul className="mt-1 space-y-2">
              {waiting.map(e => (
                <li key={e.id} className="rounded-xl border border-slate-200 dark:border-slate-700 p-2.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{e.name}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{e.requestedAt.slice(0, 10)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-700 dark:text-slate-300">
                    {PROGRAMME_LABEL[e.programme] ?? e.programme}
                    {e.grade ? ` · ${e.grade}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          )}
          {waiting.length > 0 && (
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              {mn ? 'Шийдвэрлэх: Элсэлт таб.' : 'Decide in the Enrollments tab.'}
            </p>
          )}

          <div className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {mn ? 'Сурагчдын ерөнхий үнэлгээ' : 'Students’ overall evaluation'}
          </div>
          {overall.length === 0 ? (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{mn ? 'Үнэлгээ алга.' : 'No evaluation yet.'}</p>
          ) : (
            <ul className="mt-1 space-y-2">
              {overall.map(o => (
                <li key={o.uid} className="rounded-xl border border-slate-200 dark:border-slate-700 p-2.5">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{o.name}</div>
                  <p className="mt-0.5 text-xs text-slate-700 dark:text-slate-300">
                    {mn ? 'Хичээл' : 'Lessons'} {o.lessons} · {mn ? 'Шалгалт' : 'Tests'} {o.tests} · {mn ? 'Тоглоом' : 'Games'} {o.games} · {mn ? 'Асуулт' : 'Questions'} {o.questions}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {mn ? 'Сурагчдын шинэ үр дүн' : 'Student results'}
          </div>
          {recent.length === 0 ? (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{mn ? 'Үр дүн алга.' : 'No results yet.'}</p>
          ) : (
            <ul className="mt-1 space-y-2">
              {recent.slice(0, 10).map(r => {
                const isNew = r.takenAt > seen;
                return (
                  <li key={`${r.uid}-${r.id}`} className="rounded-xl border border-slate-200 dark:border-slate-700 p-2.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                        {isNew && <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" aria-hidden="true" />}
                        {nameOf(r.uid)}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{stamp(r.takenAt)}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-700 dark:text-slate-300">
                      {kindLabel(r)} · {Math.round(r.percent)}%
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
