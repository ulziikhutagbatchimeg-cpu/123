import React from 'react';
import type { ReactNode } from 'react';
import { BookOpen, Calculator, ClipboardList, FileText, FlaskConical, Gamepad2, GraduationCap, Grid, Layers, Network, NotebookPen, Target, type LucideIcon } from 'lucide-react';
import { useApp, type AppTab } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

// The three hubs of the site: Study, Practice and Toolkit. Each hub lists the pages that belong to it, as cards.
// The language follows the top-bar choice: English shows English, Монгол shows Монгол, and Dual shows both (English first).
export type HubId = 'study' | 'practice' | 'toolkit';

interface HubItem {
  tab: AppTab;
  icon: LucideIcon;
  labelEn: string;
  labelMn: string;
  descEn: string;
  descMn: string;
}

interface HubDef {
  titleEn: string;
  titleMn: string;
  introEn: string;
  introMn: string;
  items: HubItem[];
}

export const HUBS: Record<HubId, HubDef> = {
  study: {
    titleEn: 'Study',
    titleMn: 'Сурах',
    introEn: 'Chapters, topics and lessons, in syllabus order.',
    introMn: 'Бүлэг, сэдэв, хичээл, хичээлийн дарааллаар.',
    items: [
      { tab: 'curriculum', icon: BookOpen, labelEn: 'Lessons', labelMn: 'Хичээл', descEn: 'Every chapter and topic, with lessons and slides', descMn: 'Бүлэг, сэдэв бүр, хичээл, слайд' },
      { tab: 'mindmap', icon: Network, labelEn: 'Concept map', labelMn: 'Ойлголтын зураглал', descEn: 'Link ideas and key terms together', descMn: 'Ойлголт, түлхүүр үгийг холбох' }
    ]
  },
  practice: {
    titleEn: 'Practice',
    titleMn: 'Дадлага',
    introEn: 'Exam practice, tests and mistakes to work on.',
    introMn: 'Шалгалтын дасгал, тест, засах алдаа.',
    items: [
      { tab: 'exam', icon: ClipboardList, labelEn: 'Exam practice (Paper 2, 4, 6)', labelMn: 'Шалгалтын дасгал (Paper 2, 4, 6)', descEn: 'Timed exam mode and official past-paper links', descMn: 'Цагтай шалгалтын горим, албан ёсны past paper' },
      { tab: 'tests', icon: FileText, labelEn: 'Timed chapter tests', labelMn: 'Бүлгийн цагтай тест', descEn: 'A test for each chapter, with its time limit', descMn: 'Бүлэг бүрийн тест, хугацаатай' },
      { tab: 'games', icon: Gamepad2, labelEn: 'Practice games', labelMn: 'Дасгалын тоглоом', descEn: 'Quick games with key terms and questions', descMn: 'Түлхүүр үг, асуултын богино тоглоом' },
      { tab: 'mistakes', icon: NotebookPen, labelEn: 'Mistake notebook', labelMn: 'Алдааны сан', descEn: 'Revisit what you got wrong', descMn: 'Буруу хариултаа дахин харах' },
      { tab: 'student', icon: GraduationCap, labelEn: 'Self-check', labelMn: 'Өөрийгөө шалгах', descEn: 'Your progress, tests and rewards', descMn: 'Таны явц, тест, шагнал' }
    ]
  },
  toolkit: {
    titleEn: 'Toolkit',
    titleMn: 'Хэрэглүүд',
    introEn: 'Tools to use while you study and practise.',
    introMn: 'Суралцах, дасгал хийх үед хэрэглэх хэрэгслүүд.',
    items: [
      { tab: 'periodictable', icon: Grid, labelEn: 'Periodic table', labelMn: 'Үелэх хүснэгт', descEn: 'Interactive table, colour-coded by group', descMn: 'Бүлгээр өнгөлсөн харилцан үйлчлэх хүснэгт' },
      { tab: 'labs', icon: FlaskConical, labelEn: 'Virtual labs', labelMn: 'Виртуал лаб', descEn: 'Change the conditions and see the result', descMn: 'Нөхцөл өөрчилж, үр дүнг харах' },
      { tab: 'calculations', icon: Calculator, labelEn: 'Calculations', labelMn: 'Тооцоолол', descEn: 'Calculation tools and worked problems', descMn: 'Тооцооны хэрэгсэл, жишээ бодлого' },
      { tab: 'flashcards', icon: Layers, labelEn: 'Flashcards', labelMn: 'Үг цээжлэх карт', descEn: 'Key terms with English and Mongolian meanings', descMn: 'Түлхүүр үг, англи, монгол тайлбартай' },
      { tab: 'skills', icon: Target, labelEn: 'Exam skills', labelMn: 'Шалгалтын ур чадвар', descEn: 'The skills each paper tests', descMn: 'Шалгалт бүрийн шаардах ур чадвар' }
    ]
  }
};

export const HubView: React.FC<{ hub: HubId }> = ({ hub }) => {
  const { mode } = useLanguage();
  const { setActiveTab } = useApp();
  const def = HUBS[hub];

  // English only, Mongolian only, or both in Dual (English first, Mongolian beside it in a lighter tone)
  const txt = (en: string, mn: string): ReactNode => {
    if (mode === 'en') return en;
    if (mode === 'mn') return mn;
    return (
      <>
        {en}
        <span className="ml-1.5 text-xs font-normal text-slate-500 dark:text-slate-400">({mn})</span>
      </>
    );
  };

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">{txt(def.titleEn, def.titleMn)}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">{txt(def.introEn, def.introMn)}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {def.items.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.tab}
              type="button"
              onClick={() => setActiveTab(item.tab)}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500/60"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-teal-950/60 dark:text-teal-300">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 space-y-0.5">
                <span className="block text-sm font-bold text-slate-900 dark:text-white">{txt(item.labelEn, item.labelMn)}</span>
                <span className="block text-xs leading-snug text-slate-600 dark:text-slate-400">{txt(item.descEn, item.descMn)}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
