import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageMode } from '../types/chemistry';

interface LanguageContextType {
  mode: LanguageMode;
  setMode: (mode: LanguageMode) => void;
  t: (key: string) => string;
  renderBilingual: (en: string, mn: string, separator?: string) => React.ReactNode;
}

const UI_TRANSLATIONS: Record<string, { en: string; mn: string }> = {
  // Navigation
  dashboard: { en: 'Dashboard', mn: 'Хяналтын самбар' },
  curriculum: { en: 'Syllabus & Lessons', mn: 'Хөтөлбөр & Хичээл' },
  virtualLabs: { en: 'Virtual Labs', mn: 'Виртуал Лаб' },
  examPrep: { en: 'Exam Prep (P2, P4, P6)', mn: 'Шалгалтын бэлтгэл' },
  flashcards: { en: 'Flashcards & Vocab', mn: 'Үг цээжлэх карт' },
  mistakes: { en: 'Mistake Notebook', mn: 'Алдааны сан' },
  mindmap: { en: 'Concept Map', mn: 'Ойлголтын зураглал' },
  teacherHub: { en: 'Teacher Hub', mn: 'Багшийн булан' },

  // Role
  studentRole: { en: 'Student View', mn: 'Сурагч' },
  teacherRole: { en: 'Teacher View', mn: 'Багш' },

  // Common UI
  syllabusRef: { en: 'Syllabus Code', mn: 'Хөтөлбөрийн код' },
  learningObjectives: { en: 'Learning Objectives', mn: 'Суралцах зорилго' },
  vocabularyTerms: { en: 'Key Vocabulary', mn: 'Түлхүүр үгс' },
  workedExample: { en: 'Worked Example & Common Pitfall', mn: 'Ажилласан жишээ ба Түгээмэл алдаа' },
  interactiveLab: { en: 'Interactive Simulation', mn: 'Интерактив симуляц' },
  practiceExamQuestions: { en: 'Exam Questions', mn: 'Шалгалтын асуултууд' },
  openLab: { en: 'Launch Virtual Lab', mn: 'Виртуал лаб нээх' },
  listenPronunciation: { en: 'Listen', mn: 'Сонсох' },
  markCompleted: { en: 'Mark Completed', mn: 'Үзсэн гэж тэмдэглэх' },
  completed: { en: 'Completed', mn: 'Үзсэн' },
  paper2Tag: { en: 'Paper 2 (Multiple Choice)', mn: 'Paper 2 (Сонгох асуулт)' },
  paper4Tag: { en: 'Paper 4 (Theory & Structured)', mn: 'Paper 4 (Онолын бичгийн шалгалт)' },
  paper6Tag: { en: 'Paper 6 (Alternative to Practical)', mn: 'Paper 6 (Туршилтын арга зүй)' },
  examinerTip: { en: 'Examiner Tip', mn: 'Шалгагчийн зөвлөгөө' },
  commonMistake: { en: 'Common Pitfall to Avoid', mn: 'Зайлсхийх түгээмэл алдаа' },
  revisitLesson: { en: 'Revisit Lesson', mn: 'Хичээл рүү буцах' },
  checkAnswer: { en: 'Submit Answer', mn: 'Хариулт шалгах' },
  viewMarkScheme: { en: 'View Cambridge Mark Scheme', mn: 'Кэмбрижийн үнэлгээний шалгуур харах' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<LanguageMode>(() => {
    const saved = localStorage.getItem('chem_cambridge_lang_mode');
    return (saved as LanguageMode) || 'dual';
  });

  const setMode = (newMode: LanguageMode) => {
    setModeState(newMode);
    localStorage.setItem('chem_cambridge_lang_mode', newMode);
  };

  const t = (key: string): string => {
    const entry = UI_TRANSLATIONS[key];
    if (!entry) return key;
    if (mode === 'mn') return entry.mn;
    if (mode === 'en') return entry.en;
    return `${entry.en} / ${entry.mn}`;
  };

  const renderBilingual = (en: string, mn: string, separator: string = ' — ') => {
    if (mode === 'en') return <span>{en}</span>;
    if (mode === 'mn') return <span>{mn}</span>;
    return (
      <span className="inline-flex flex-wrap items-baseline gap-1.5">
        <span className="font-medium text-slate-100">{en}</span>
        <span className="text-slate-400 text-xs font-normal">({mn})</span>
      </span>
    );
  };

  return (
    <LanguageContext.Provider value={{ mode, setMode, t, renderBilingual }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
