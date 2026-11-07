import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { loadEnrollments, type Enrollment } from '../lib/cloud';
import { classTone } from '../lib/classTone';
import { TeacherSurveys } from './TeacherSurveys';

// The teacher's own tab for the web survey answers. The students are taken from the enrolments of the programme on
// screen (approved or paused), so a student who answered the survey is shown even without a saved progress report.
// Each class has its own tab, as in the journal; All shows every student of the programme.
export const TeacherSurveyAnswers: React.FC = () => {
  const { mode } = useLanguage();
  const { courseChoice } = useApp();
  const mn = mode === 'mn';
  const [enrolments, setEnrolments] = useState<Enrollment[] | null>(null);
  const [classPick, setClassPick] = useState<string>('all');

  useEffect(() => {
    let cancelled = false;
    loadEnrollments()
      .then(list => {
        if (!cancelled) setEnrolments(list);
      })
      .catch(() => {
        if (!cancelled) setEnrolments([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const students = useMemo(
    () =>
      (enrolments ?? []).filter(
        e => e.programme === courseChoice && (e.status === 'approved' || e.status === 'suspended')
      ),
    [enrolments, courseChoice]
  );

  const classes = useMemo(
    () =>
      [...new Set(students.map(e => e.grade).filter((g): g is string => !!g))].sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true })
      ),
    [students]
  );

  const shown = students.filter(e => classPick === 'all' || e.grade === classPick);
  const uids = shown.map(e => e.uid);
  const names: Record<string, string> = Object.fromEntries(shown.map(e => [e.uid, e.name]));

  if (enrolments === null) return <p className="text-sm text-slate-600">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>;

  return (
    <div className="space-y-4">
      {classes.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-20 shrink-0 text-xs font-bold text-slate-600">{mn ? 'Анги' : 'Class'}</span>
          {['all', ...classes].map(g => {
            const on = classPick === g;
            const tone = g === 'all' ? null : classTone(g);
            const count = g === 'all' ? students.length : students.filter(e => e.grade === g).length;
            const onClass = tone
              ? `${tone.head} ${tone.text} ${tone.bar}`
              : 'bg-emerald-600 text-white border-emerald-500';
            return (
              <button
                key={g}
                type="button"
                onClick={() => setClassPick(g)}
                aria-pressed={on}
                className={`inline-flex items-center justify-center min-w-[3.5rem] px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  on ? onClass : 'text-slate-700 border-slate-400 hover:bg-slate-300'
                }`}
              >
                {g === 'all' ? (mn ? 'Бүгд' : 'All') : g} <span className="font-normal opacity-80">· {count}</span>
              </button>
            );
          })}
        </div>
      )}

      {shown.length === 0 ? (
        <p className="text-sm text-slate-600">
          {mn ? 'Энэ хөтөлбөрт элссэн сурагч алга.' : 'No students are enrolled in this programme yet.'}
        </p>
      ) : (
        <TeacherSurveys uids={uids} names={names} mn={mn} />
      )}
    </div>
  );
};
