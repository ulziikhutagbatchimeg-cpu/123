import React, { useState } from 'react';
import { ClipboardCheck, Clock, ExternalLink, Download, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { isTeacher, useAuthUser } from '../lib/cloud';
import { COURSE_CHOICES, useApp, type CourseChoice } from '../context/AppContext';
import { CourseNotReady } from './CourseNotReady';

// Timed chapter tests. Each test is a SCORM 1.2 package unpacked under public/tests/<id>/. In the web it runs on its
// own: answers and the timer are kept in the student's browser. The teacher can download the .zip to load into Moodle.
const TESTS_DIR = `${import.meta.env.BASE_URL}tests/`;

type ChapterTest = {
  id: string;
  course: CourseChoice;
  titleEn: string;
  titleMn: string;
  chapters: string;
  minutes: number;
  marks: number;
  descEn: string;
  descMn: string;
  zip: string;
};

const TESTS: ChapterTest[] = [
  {
    id: '0620-ch1-5',
    course: 'igcse',
    titleEn: 'Chapters 1–5 Assessment',
    titleMn: '1–5-р бүлгийн шалгалт',
    chapters: '1–5',
    minutes: 70,
    marks: 70,
    descEn: 'States of matter, atomic structure, bonding, formulae and equations, chemical calculations. Section A: 30 multiple choice. Section B: 6 structured questions.',
    descMn: 'Бодисын төлөв, атомын бүтэц, холбоо, томьёо ба тэгшитгэл, химийн тооцоо. А хэсэг: 30 сонгох асуулт. B хэсэг: 6 бүтэцтэй асуулт.',
    zip: '0620_Test_Ch1-5_70min_SCORM.zip'
  }
];

export const TestsView: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { user } = useAuthUser();
  const teacher = isTeacher(user);
  const { courseChoice } = useApp();
  const courseName = COURSE_CHOICES.find(c => c.id === courseChoice)?.labelEn ?? '';
  // Only the tests of the course being studied
  const tests = TESTS.filter(t => t.course === courseChoice);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = tests.find(t => t.id === openId);

  if (tests.length === 0) return <CourseNotReady titleEn="Tests" titleMn="Шалгалт" />;

  return (
    <div className="space-y-6 pb-12">
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
            <ClipboardCheck className="w-5 h-5" aria-hidden />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{mn ? 'Шалгалт' : 'Tests'}</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {mn
                ? `${courseName} · Цагтай бүлгийн шалгалт. Хариулт тань энэ браузерт автоматаар хадгалагдана.`
                : `${courseName} · Timed chapter tests. Your answers are saved automatically in this browser.`}
            </p>
          </div>
        </div>
      </div>

      {!open && (
        <ul className="grid gap-4 sm:grid-cols-2">
          {tests.map(t => (
            <li key={t.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-[11px] font-black text-emerald-800 dark:text-emerald-200">
                  {mn ? `Бүлэг ${t.chapters}` : `Ch ${t.chapters}`}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" aria-hidden />
                  {mn ? `${t.minutes} мин · ${t.marks} оноо` : `${t.minutes} min · ${t.marks} marks`}
                </span>
              </div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">{mn ? t.titleMn : t.titleEn}</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{mn ? t.descMn : t.descEn}</p>
              <p className="text-[11px] text-amber-700 dark:text-amber-300">
                {mn
                  ? 'Эхлүүлэхэд цаг явж эхэлнэ. Хуудсаа хаасан ч цаг зогсохгүй.'
                  : 'The clock starts when you open the test and keeps running if you close the page.'}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setOpenId(t.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black"
                >
                  {mn ? 'Шалгалт эхлүүлэх' : 'Start test'}
                </button>
                {teacher && (
                  <a
                    href={`${TESTS_DIR}${t.id}/${t.zip}`}
                    download
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden />
                    {mn ? 'SCORM .zip (Moodle-д)' : 'SCORM .zip (for Moodle)'}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-sm font-black text-slate-900 dark:text-white">{mn ? open.titleMn : open.titleEn}</span>
            <div className="flex items-center gap-2">
              <a
                href={`${TESTS_DIR}${open.id}/index.html`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                {mn ? 'Шинэ цонхонд' : 'New window'}
              </a>
              <button
                onClick={() => setOpenId(null)}
                aria-label={mn ? 'Хаах' : 'Close'}
                className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              >
                <X className="w-4 h-4" aria-hidden />
              </button>
            </div>
          </div>
          <iframe
            title={mn ? open.titleMn : open.titleEn}
            src={`${TESTS_DIR}${open.id}/index.html`}
            className="block w-full h-[80vh] bg-white"
          />
        </div>
      )}
    </div>
  );
};
