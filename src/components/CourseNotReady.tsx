import React from 'react';
import { COURSE_CHOICES, useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

// Every course has the same sections. A section whose content is not written yet for the chosen course shows this note,
// never another course's material.
export const CourseNotReady: React.FC<{ titleEn: string; titleMn: string }> = ({ titleEn, titleMn }) => {
  const { courseChoice } = useApp();
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const course = COURSE_CHOICES.find(c => c.id === courseChoice);
  const courseName = (mn ? course?.labelMn : course?.labelEn) ?? '';
  return (
    <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-6 space-y-2">
      <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">{mn ? titleMn : titleEn}</h2>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {mn ? `${courseName}-д энэ хэсэг одоогоор бэлтгэгдээгүй байна.` : `This section is not ready yet for ${courseName}.`}
      </p>
    </div>
  );
};
