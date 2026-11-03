import React, { useState } from 'react';
import { BookOpen, GraduationCap, Grid, LayoutDashboard, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp, type AppTab } from '../context/AppContext';
import { HIGHLIGHT_HEADING, HIGHLIGHT_SUB } from '../lib/highlight';
import { isTeacher, useAuthUser } from '../lib/cloud';

// The five pages of the web, in the order of the top bar. Each card says who the page is for and what is inside it.
// The same cards are shown for every programme: IGCSE 0620, AS Level 9701 and A Level 9701. The labels follow the language toggle.
interface PageCard {
  tab: AppTab;
  icon: React.ReactNode;
  nameEn: string;
  nameMn: string;
  forEn: string;
  forMn: string;
  itemsEn: string[];
  itemsMn: string[];
}

const PAGES: PageCard[] = [
  {
    tab: 'dashboard',
    icon: <LayoutDashboard className="h-4 w-4" aria-hidden="true" />,
    nameEn: 'Dashboard',
    nameMn: 'Хяналтын самбар',
    forEn: 'Everyone',
    forMn: 'Бүгд',
    itemsEn: [
      'Your next step: the next topic, ready with its lesson and practice',
      'Your progress: how far you have come, your ticket average and today’s goal',
      'Needs revision: the mistakes worth another look, from your notebook',
      'Spaced repetition: the flashcards due today, so no term slips away'
    ],
    itemsMn: [
      'Таны дараагийн алхам: дараагийн сэдэв, хичээл, дасгалтайгаа бэлэн',
      'Таны явц: хаана явж буйг, хичээлийн шалгалтын дундаж, өнөөдрийн зорилго',
      'Давтах хэрэгтэй: алдааны сангаас дахин харах ёстой алдаанууд',
      'Лейтнерийн флаш карт: өнөөдөр давтах карт, нэр томьёо мартахгүйн тулд'
    ]
  },
  {
    tab: 'curriculum',
    icon: <BookOpen className="h-4 w-4" aria-hidden="true" />,
    nameEn: 'Lessons',
    nameMn: 'Хичээл',
    forEn: 'Students',
    forMn: 'Сурагч',
    itemsEn: [
      'Every chapter and topic of your course, in syllabus order',
      'Each topic: goals, key words, a worked example, a simulation and an exam quiz',
      'Each chapter: key words, concept maps and a quick check, plus lessons and slides where they are ready',
      'A check at the foot of each topic, to see what has stuck'
    ],
    itemsMn: [
      'Таны хөтөлбөрийн бүх бүлэг, сэдэв, хичээлийн дарааллаар',
      'Сэдэв бүр: зорилго, түлхүүр үг, жишээ бодолт, симуляц, шалгалтын тест',
      'Бүлэг бүр: түлхүүр үг, концепт зураг, quick check; бэлэн болсон бүлэгт хичээл, слайд',
      'Сэдэв бүрийн доод хэсэгт: ойлгосноо шалгах богино шалгалт'
    ]
  },
  {
    tab: 'student',
    icon: <GraduationCap className="h-4 w-4" aria-hidden="true" />,
    nameEn: 'Student area',
    nameMn: 'Суралцагчийн талбар',
    forEn: 'Students',
    forMn: 'Сурагч',
    itemsEn: [
      'Rewards: lessons passed, days in a row, and the goal you met today',
      'Self-check: your progress, tests and games in tabs, with past papers as they are ready',
      'Revise: exam skills, chapter tests and past papers',
      'Practise: calculations, virtual labs, key-word games and your mistake notebook',
      'Outside practice sites, a rating of this site and section questions'
    ],
    itemsMn: [
      'Шагналууд: тэнцсэн хичээл, дараалсан өдөр, өнөөдрийн зорилгоо биелүүлсэн эсэх',
      'Өөрийгөө шалгах: явц, шалгалт, тоглоом табуудаар; өмнөх жилийн шалгалт бэлэн болоход',
      'Давтах: шалгалтын ур чадвар, бүлгийн шалгалт, өмнөх жилийн шалгалт',
      'Дасгалжуулах: тооцооны бодлого, виртуал лаб, түлхүүр үгийн тоглоом, алдааны сан',
      'Гадаад дасгалын сайтууд, энэ сайтад өгөх үнэлгээ, хэсгийн асуулга'
    ]
  },
  {
    tab: 'periodictable',
    icon: <Grid className="h-4 w-4" aria-hidden="true" />,
    nameEn: 'Periodic table',
    nameMn: 'Үелэх хүснэгт',
    forEn: 'Everyone',
    forMn: 'Бүгд',
    itemsEn: [
      'An interactive periodic table, colour-coded by group',
      'Search and filter by outer electrons, or sort the elements into a list',
      'Element facts, isotopes, and a lab that shows the periodic trends'
    ],
    itemsMn: [
      'Харилцан үйлчлэх үелэх хүснэгт, бүлгээр өнгөлсөн',
      'Гадна электроноор хайх, шүүх, эсвэл элементүүдийг жагсаалтаар эрэмбэлэх',
      'Элементийн мэдээлэл, изотоп, үелэх чанарыг харуулсан туршилт'
    ]
  },
  {
    tab: 'teacher',
    icon: <Users className="h-4 w-4" aria-hidden="true" />,
    nameEn: 'Teacher area',
    nameMn: 'Багшийн талбар',
    forEn: 'Teacher',
    forMn: 'Багш',
    itemsEn: [
      'Students: each student’s results and feedback',
      'Enrollments: approve each student for a course',
      'A skills checklist and a test builder',
      'Add question: new questions for the question bank',
      'Slide decks and chapter test packages, for the teacher’s account'
    ],
    itemsMn: [
      'Суралцагчид: сурагч бүрийн үр дүн, санал',
      'Элсэлт: хөтөлбөр тус бүрт сурагчдыг зөвшөөрөх',
      'Ур чадварын явц, тест зохиох хэрэгсэл',
      'Асуулт нэмэх: асуултын санд шинэ асуулт',
      'Слайд, бүлгийн шалгалтын багц, зөвхөн багшийн дансаар'
    ]
  }
];

// The optional extra card fills the free cell beside the last page card, so the grid stays full on every width.
export const WebStructure: React.FC<{ extra?: React.ReactNode }> = ({ extra }) => {
  const { user } = useAuthUser();
  const { mode } = useLanguage();
  const { setActiveTab } = useApp();
  const mn = mode === 'mn';
  // One page card can be opened at a time, to show all of its points
  const [openPage, setOpenPage] = useState<AppTab | null>(null);

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="space-y-1">
        <div className={HIGHLIGHT_HEADING}>
          {mn ? 'Вэбийн бүтэц' : 'How the web is organised'}
        </div>
        <p className={HIGHLIGHT_SUB}>
          {mn
            ? 'Таван хуудас. Хичээл, шалгалт, үр дүн таны сонгосон хөтөлбөрийг харуулна.'
            : 'Five pages. Lessons, tests and results show the course you chose.'}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PAGES.filter(page => page.tab !== 'teacher' || isTeacher(user)).map(page => {
          const isOpen = openPage === page.tab;
          const items = mn ? page.itemsMn : page.itemsEn;
          return (
            <div
              key={page.nameEn}
              className="flex flex-col gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab(page.tab)}
                  className="flex items-center gap-2 text-left text-sm font-bold text-slate-900 hover:text-emerald-700 dark:text-white dark:hover:text-teal-300"
                >
                  <span className="text-emerald-700 dark:text-teal-300">{page.icon}</span>
                  {mn ? page.nameMn : page.nameEn}
                </button>
                <span className="shrink-0 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  {mn ? page.forMn : page.forEn}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{items[0]}</p>
              {isOpen && (
                <ul className="space-y-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {items.slice(1).map(item => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto flex items-center justify-between gap-2 pt-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setOpenPage(isOpen ? null : page.tab)}
                  aria-expanded={isOpen}
                  className="text-slate-600 hover:underline dark:text-slate-300"
                >
                  {isOpen ? (mn ? 'Хураах' : 'Show less') : mn ? 'Дэлгэрэнгүй' : 'More'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab(page.tab)}
                  className="text-emerald-700 hover:underline dark:text-teal-300"
                >
                  {mn ? 'Хуудас руу орох →' : 'Open page →'}
                </button>
              </div>
            </div>
          );
        })}
        {extra}
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        {mn
          ? 'Таны хариулт, явц энэ браузерт хадгалагдана. Нэвтэрсэн үед багшид харагдана.'
          : 'Your answers and progress are saved in this browser. Once you are signed in, they reach the teacher.'}
      </p>
    </section>
  );
};
