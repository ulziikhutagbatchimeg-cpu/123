import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { loadEnrollments, type Enrollment, type EnrollmentProgramme } from '../lib/cloud';
import { classTone } from '../lib/classTone';
import { TeacherSurveys } from './TeacherSurveys';

// The teacher's own tab for the web survey answers. The students are the enrolled ones (approved or paused) of every
// programme, so a student who answered the survey is shown even without a saved progress report. The programme and the
// class are picked with the tabs above the answers; All shows every student of the chosen programme.
const PROGRAMME_LABEL: Record<EnrollmentProgramme, string> = { igcse: 'IGCSE 0620', as: 'AS 9701', a: 'A Level 9701' };
const PROGRAMMES: EnrollmentProgramme[] = ['igcse', 'as', 'a'];

export const TeacherSurveyAnswers: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const [enrolments, setEnrolments] = useState<Enrollment[] | null>(null);
  const [programme, setProgramme] = useState<'all' | EnrollmentProgramme>('all');
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

  // The approved or paused enrolments of every programme; the programme tab narrows them
  const enrolled = useMemo(
    () => (enrolments ?? []).filter(e => e.status === 'approved' || e.status === 'suspended'),
    [enrolments]
  );

  const students = useMemo(
    () => enrolled.filter(e => programme === 'all' || e.programme === programme),
    [enrolled, programme]
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
  // With every programme shown, each name carries its programme, so a class name is not read as the same class
  const names: Record<string, string> = Object.fromEntries(
    shown.map(e => [e.uid, programme === 'all' ? `${e.name} · ${PROGRAMME_LABEL[e.programme]}` : e.name])
  );

  const pickProgramme = (p: 'all' | EnrollmentProgramme) => {
    setProgramme(p);
    setClassPick('all');
  };

  if (enrolments === null) return <p className="text-sm text-slate-600">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-20 shrink-0 text-xs font-bold text-slate-600">{mn ? 'Хөтөлбөр' : 'Programme'}</span>
        {(['all', ...PROGRAMMES] as const).map(p => {
          const on = programme === p;
          const count = p === 'all' ? enrolled.length : enrolled.filter(e => e.programme === p).length;
          return (
            <button
              key={p}
              type="button"
              onClick={() => pickProgramme(p)}
              aria-pressed={on}
              className={`inline-flex items-center justify-center min-w-[3.5rem] px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                on ? 'bg-purple-200 text-purple-800 border-purple-500/60' : 'text-slate-700 border-slate-400 hover:bg-slate-300'
              }`}
            >
              {p === 'all' ? (mn ? 'Бүгд' : 'All') : PROGRAMME_LABEL[p]} <span className="font-normal opacity-80">· {count}</span>
            </button>
          );
        })}
      </div>

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
