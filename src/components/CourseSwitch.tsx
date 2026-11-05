import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COURSE_CHOICES, useApp, type CourseChoice } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { SITE_COURSE } from '../lib/siteCourse';
import { isTeacher, useAuthUser } from '../lib/cloud';

// Each programme has its own colour, so the course on screen is clear at a glance
const COLOURS: Record<CourseChoice, { solid: string; dot: string }> = {
  igcse: { solid: 'bg-emerald-600 text-white', dot: 'bg-emerald-500' },
  as: { solid: 'bg-blue-600 text-white', dot: 'bg-blue-500' },
  a: { solid: 'bg-purple-600 text-white', dot: 'bg-purple-500' }
};

// The programme switch. Closed, it names the programme on screen; open, it lists all three in their colours.
export const CourseSwitch: React.FC = () => {
  const { courseChoice, chooseCourse } = useApp();
  const { mode } = useLanguage();
  const [open, setOpen] = useState(false);
  // A site locked to one course shows students its course only; the teacher's signed-in account keeps the switch
  const { user } = useAuthUser();
  const locked = SITE_COURSE !== null && !isTeacher(user);

  const label = (id: CourseChoice) => {
    const choice = COURSE_CHOICES.find(c => c.id === id);
    return mode === 'mn' ? choice?.labelMn ?? '' : choice?.labelEn ?? '';
  };

  // A site locked to one course shows its course as a label only; there is no switch to the others
  if (locked) {
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm ${COLOURS[courseChoice].solid}`}>
        {label(courseChoice)}
      </span>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-colors ${COLOURS[courseChoice].solid}`}
      >
        {label(courseChoice)}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-2 w-60 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl space-y-1">
          {COURSE_CHOICES.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                chooseCourse(c.id);
                setOpen(false);
              }}
              aria-pressed={courseChoice === c.id}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                courseChoice === c.id
                  ? COLOURS[c.id].solid
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${COLOURS[c.id].dot}`} />
              {label(c.id)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
