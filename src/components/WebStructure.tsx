import React from 'react';
import { BookOpen, GraduationCap, Grid, LayoutDashboard, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// The five pages of the web, in the order of the top bar. Each card says who the page is for and what is inside it.
// The labels follow the language toggle.
interface PageCard {
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
    icon: <LayoutDashboard className="h-4 w-4" aria-hidden="true" />,
    nameEn: 'Dashboard',
    nameMn: 'Хяналтын самбар',
    forEn: 'Everyone',
    forMn: 'Бүгд',
    itemsEn: ['The next topic to study', 'Mistakes to fix', 'Quick links to the main pages'],
    itemsMn: ['Дараагийн сэдэв', 'Засах алдаанууд', 'Гол хуудсуудын шуурхай холбоос']
  },
  {
    icon: <BookOpen className="h-4 w-4" aria-hidden="true" />,
    nameEn: 'Lessons',
    nameMn: 'Хичээл',
    forEn: 'Students',
    forMn: 'Сурагч',
    itemsEn: [
      'Chapters and topics of the course you chose',
      'For each topic: lesson, key words, concept maps, slides and quick check',
      'End-of-topic check at the foot of each topic'
    ],
    itemsMn: [
      'Сонгосон хөтөлбөрийн бүлэг, сэдэв',
      'Сэдэв бүрт: хичээл, түлхүүр үг, концепт зураг, слайд, quick check',
      'Сэдэв бүрийн доор сэдвийн шалгалт'
    ]
  },
  {
    icon: <GraduationCap className="h-4 w-4" aria-hidden="true" />,
    nameEn: 'Student area',
    nameMn: 'Суралцагчийн талбар',
    forEn: 'Students',
    forMn: 'Сурагч',
    itemsEn: [
      'Self-check: your progress, tests, past papers and games',
      'Revise: exam skills, tests and past papers',
      'Practise: mistake notebook, calculations, virtual labs and key-word games'
    ],
    itemsMn: [
      'Өөрийгөө шалгах: явц, шалгалт, past paper, тоглоом',
      'Давтах: шалгалтын ур чадвар, шалгалт, өмнөх жилийн шалгалт',
      'Дасгалжуулах: алдааны сан, тооцооны бодлого, виртуал лаб, түлхүүр үгийн тоглоом'
    ]
  },
  {
    icon: <Grid className="h-4 w-4" aria-hidden="true" />,
    nameEn: 'Periodic table',
    nameMn: 'Үелэх хүснэгт',
    forEn: 'Everyone',
    forMn: 'Бүгд',
    itemsEn: ['An interactive periodic table linked to the syllabus'],
    itemsMn: ['Хөтөлбөртэй холбоотой, харилцан үйлчлэх үелэх хүснэгт']
  },
  {
    icon: <Users className="h-4 w-4" aria-hidden="true" />,
    nameEn: 'Teacher area',
    nameMn: 'Багшийн талбар',
    forEn: 'Teacher',
    forMn: 'Багш',
    itemsEn: [
      'Class progress and each student’s results',
      'Feedback on the results',
      'Slide decks, downloaded with the teacher account only'
    ],
    itemsMn: [
      'Ангийн явц, сурагч бүрийн үр дүн',
      'Үр дүнд өгөх санал',
      'Слайд, зөвхөн багшийн дансаар татна'
    ]
  }
];

export const WebStructure: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="space-y-1">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
          {mn ? 'Вэбийн бүтэц' : 'How the web is organised'}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {mn
            ? 'Таван хуудас. Хичээл, шалгалт, үр дүн таны сонгосон хөтөлбөрийг харуулна.'
            : 'Five pages. Lessons, tests and results show the course you chose.'}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PAGES.map(page => (
          <div key={page.nameEn} className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <span className="text-emerald-700 dark:text-teal-300">{page.icon}</span>
                {mn ? page.nameMn : page.nameEn}
              </div>
              <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                {mn ? page.forMn : page.forEn}
              </span>
            </div>
            <ul className="space-y-1.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {(mn ? page.itemsMn : page.itemsEn).map(item => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        {mn
          ? 'Таны хариулт, явц энэ браузерт хадгалагдана. Нэвтэрсэн үед багшид харагдана.'
          : 'Your answers and progress are saved in this browser. Once you are signed in, they reach the teacher.'}
      </p>
    </section>
  );
};
