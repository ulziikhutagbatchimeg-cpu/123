import React from 'react';
import type { ReactNode } from 'react';
import { BookOpen, Calculator, ClipboardList, ExternalLink, FileText, FlaskConical, Gamepad2, GraduationCap, Grid, HelpCircle, Layers, NotebookPen, Target, type LucideIcon } from 'lucide-react';
import { useApp, type AppTab } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { MyChecklist } from './MyChecklist';

// The three hubs of the site, by what the student wants to do: Study (learn something new), Practice (go over it and get
// ready for the exam) and My progress (the student's own results, mistakes and notes; its id is still 'toolkit'). Each hub
// lists the pages that belong to it, as cards, and every page is in one hub only.
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

// A link to a site outside this one. It opens in a new tab; the student signs in on that site with their own account.
interface HubLink {
  href: string;
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
  links?: HubLink[];
}

export const HUBS: Record<HubId, HubDef> = {
  study: {
    titleEn: 'Study',
    titleMn: 'Сурах',
    introEn: 'Learn something new: the lessons, and the labs and table you use with them.',
    introMn: 'Шинэ зүйл сурах: хичээл, түүнтэй хамт хэрэглэх лаб, хүснэгт.',
    items: [
      { tab: 'curriculum', icon: BookOpen, labelEn: 'Lessons', labelMn: 'Хичээл', descEn: 'Every chapter and topic, with lessons and slides', descMn: 'Бүлэг, сэдэв бүр, хичээл, слайд' },
      { tab: 'labs', icon: FlaskConical, labelEn: 'Virtual labs', labelMn: 'Виртуал лаб', descEn: 'Every simulation in one place: change the conditions and see the result', descMn: 'Бүх симуляци нэг дор: нөхцөл өөрчилж, үр дүнг харах' },
      { tab: 'periodictable', icon: Grid, labelEn: 'Periodic table', labelMn: 'Үелэх хүснэгт', descEn: 'Interactive table, colour-coded by group', descMn: 'Бүлгээр өнгөлсөн харилцан үйлчлэх хүснэгт' },
      { tab: 'help', icon: HelpCircle, labelEn: 'How to study here', labelMn: 'Хэрхэн суралцах вэ?', descEn: 'Where everything is, the steps of a lesson, and what opens what', descMn: 'Хаана юу байгаа, хичээлийн алхмууд, юу хийвэл юу нээгдэх' }
    ]
  },
  practice: {
    titleEn: 'Practice',
    titleMn: 'Дадлага',
    introEn: 'Go over what you learnt and get ready for the exam.',
    introMn: 'Сурсанаа давтаж, шалгалтад бэлтгэх.',
    // The outside practice sites are practice too, so they are here, big and in colour
    links: [
      {
        href: 'https://selbe4you.com/',
        labelEn: 'selbe4you',
        labelMn: 'selbe4you',
        descEn: 'Practice site. Opens in a new tab; you sign in there.',
        descMn: 'Дасгалын сайт. Шинэ табд нээгдэнэ; тэнд өөрийн нэвтрэх нэрээр орно.'
      },
      {
        href: 'https://www.grading4you.com/',
        labelEn: 'grading4you',
        labelMn: 'grading4you',
        descEn: 'Practice site. Opens in a new tab; you sign in there.',
        descMn: 'Дасгалын сайт. Шинэ табд нээгдэнэ; тэнд өөрийн нэвтрэх нэрээр орно.'
      }
    ],
    items: [
      { tab: 'exam', icon: ClipboardList, labelEn: 'Exam practice (Paper 2, 4, 6)', labelMn: 'Шалгалтын дасгал (Paper 2, 4, 6)', descEn: 'Timed exam mode and official past-paper links', descMn: 'Цагтай шалгалтын горим, албан ёсны past paper' },
      { tab: 'tests', icon: FileText, labelEn: 'Timed chapter tests', labelMn: 'Бүлгийн цагтай тест', descEn: 'A test for each chapter, with its time limit', descMn: 'Бүлэг бүрийн тест, хугацаатай' },
      { tab: 'calculations', icon: Calculator, labelEn: 'Calculations', labelMn: 'Тооцоолол', descEn: 'Worked examples, then problems to solve yourself', descMn: 'Жишээ бодолт, дараа нь өөрөө бодох бодлого' },
      { tab: 'skills', icon: Target, labelEn: 'Exam skills', labelMn: 'Шалгалтын ур чадвар', descEn: 'The command words, with tasks and model answers', descMn: 'Command word, даалгавар, жишиг хариулт' },
      { tab: 'flashcards', icon: Layers, labelEn: 'Flashcards', labelMn: 'Үг цээжлэх карт', descEn: 'Key words in English and Mongolian, reviewed on the right day', descMn: 'Түлхүүр үг англи, монголоор, давтах өдрөөрөө' },
      { tab: 'games', icon: Gamepad2, labelEn: 'Practice games', labelMn: 'Дасгалын тоглоом', descEn: 'Quick games with key terms and questions', descMn: 'Түлхүүр үг, асуултын богино тоглоом' }
    ]
  },
  toolkit: {
    titleEn: 'My progress',
    titleMn: 'Миний явц',
    introEn: 'Your own results, the mistakes to fix and your notes.',
    introMn: 'Өөрийн дүн, засах алдаа, тэмдэглэл.',
    items: [
      { tab: 'student', icon: GraduationCap, labelEn: 'Progress and rewards', labelMn: 'Явц ба шагнал', descEn: 'Your results in every part, your self-check and your rewards', descMn: 'Бүх хэсгийн дүн, өөрийн үнэлгээ, шагнал' },
      { tab: 'mistakes', icon: NotebookPen, labelEn: 'Mistake notebook', labelMn: 'Алдааны сан', descEn: 'Revisit what you got wrong', descMn: 'Буруу хариултаа дахин харах' },
      { tab: 'notebook', icon: NotebookPen, labelEn: 'My notebook', labelMn: 'Миний дэвтэр', descEn: 'Pinned lessons and your own notes, on every device, ready to print', descMn: 'Хадсан хичээл, өөрийн тэмдэглэл, бүх төхөөрөмжид, хэвлэх боломжтой' }
    ]
  }
};

export const HubView: React.FC<{ hub: HubId }> = ({ hub }) => {
  const { mode } = useLanguage();
  const { setActiveTab, programme } = useApp();
  const def = HUBS[hub];
  // 9701 has no Paper 2, 4, 6: its exam page is the list of the official 9701 papers
  const shown = (item: HubItem): HubItem =>
    item.tab === 'exam' && programme === 'alevel'
      ? { ...item, labelEn: 'Past papers (9701)', labelMn: 'Past paper (9701)', descEn: 'Links to the official Cambridge 9701 papers', descMn: 'Cambridge-ийн албан ёсны 9701 материалын холбоос' }
      : item;

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
      {def.links && def.links.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase tracking-wider text-sky-800 dark:text-sky-300">{txt('Practice sites', 'Гадаад дасгал')}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {def.links.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl border-2 border-sky-400 bg-sky-50 p-4 shadow-sm transition-colors hover:bg-sky-100 dark:border-sky-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                <span className="min-w-0 space-y-0.5">
                  <span className="block text-base font-black text-slate-900 dark:text-white">
                    {link.labelEn === link.labelMn ? link.labelEn : txt(link.labelEn, link.labelMn)}
                  </span>
                  <span className="block text-xs leading-snug text-slate-700 dark:text-slate-300">{txt(link.descEn, link.descMn)}</span>
                </span>
                <ExternalLink className="h-5 w-5 shrink-0 text-sky-700 dark:text-sky-300" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {def.items.map(shown).map(item => {
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
      {/* My progress: the checklist of the programme, ticked by itself */}
      {hub === 'toolkit' && <MyChecklist />}
    </section>
  );
};
