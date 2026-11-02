import React from 'react';
import { BookOpen, GraduationCap, Grid, LayoutDashboard, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp, type AppTab } from '../context/AppContext';
import { HIGHLIGHT_HEADING, HIGHLIGHT_SUB } from '../lib/highlight';

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
      'Your next step: the topic to study next, with its lesson and practice',
      'Your progress: topics finished, lesson ticket average and today’s goal',
      'Needs revision: mistakes from your mistake notebook',
      'Spaced repetition: flashcards due today'
    ],
    itemsMn: [
      'Таны дараагийн алхам: дараагийн сэдэв, хичээл, дасгал',
      'Таны явц: дууссан сэдэв, хичээлийн шалгалтын дундаж, өнөөдрийн зорилго',
      'Давтах хэрэгтэй: алдааны сангийн алдаанууд',
      'Лейтнерийн флаш карт: өнөөдөр давтах карт'
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
      'Chapters and topics of the course you chose',
      'Each topic: objectives, key words, concepts, worked example, simulation and exam quiz',
      'Each chapter: key words, concept maps and quick check; lesson and slides where they are ready',
      'End-of-topic check at the foot of each topic'
    ],
    itemsMn: [
      'Сонгосон хөтөлбөрийн бүлэг, сэдэв',
      'Сэдэв бүр: зорилго, түлхүүр үг, тайлбар, жишээ, симуляц, шалгалтын тест',
      'Бүлэг бүр: түлхүүр үгийн сан, концепт зураг, quick check; хичээл, слайд бэлэн болсон бүлэгт',
      'Сэдэв бүрийн доор сэдвийн шалгалт'
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
      'Rewards: lessons passed, days in a row and today’s goal',
      'Self-check: progress, tests and games in tabs; past papers where they are ready',
      'Revise: exam skills, chapter tests and past papers',
      'Practise: mistake notebook, calculations, virtual labs and key-word games',
      'Practice sites, a rating of the site and section questions'
    ],
    itemsMn: [
      'Шагналууд: хичээл тэнцсэн, дараалсан өдөр, өнөөдрийн зорилго',
      'Өөрийгөө шалгах: явц, шалгалт, тоглоом табуудаар; өмнөх жилийн шалгалт бэлэн болсон хэсэгт',
      'Давтах: шалгалтын ур чадвар, бүлгийн шалгалт, өмнөх жилийн шалгалт',
      'Дасгалжуулах: алдааны сан, тооцооны бодлого, виртуал лаб, түлхүүр үгийн тоглоом',
      'Гадаад дасгалын сайтууд, сайтын үнэлгээ, хэсгийн асуулга'
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
      'An interactive table of the elements, colour-coded by group',
      'Search and filter by outer electrons, with a sortable list of elements',
      'Element facts, isotopes and a periodic trends lab'
    ],
    itemsMn: [
      'Химийн элементүүдийн харилцан үйлчлэх хүснэгт, бүлгээр өнгөлсөн',
      'Гадна электроноор хайх, шүүх, эрэмбэлэх элементийн жагсаалт',
      'Элементийн мэдээлэл, изотоп, үелэх чанарын туршилт'
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
      'Students: each student’s results, with feedback',
      'Enrollments: approve students for each course',
      'Skills checklist and test builder',
      'Add question: new questions for the question bank',
      'Slide decks and chapter test packages, for the teacher account'
    ],
    itemsMn: [
      'Суралцагчид: сурагч бүрийн үр дүн, санал',
      'Элсэлт: хөтөлбөр тус бүрт сурагчдыг зөвшөөрөх',
      'Ур чадварын явц, тест зохиох',
      'Асуулт нэмэх: асуултын санд шинэ асуулт',
      'Слайд, бүлгийн шалгалтын багц, зөвхөн багшийн дансаар'
    ]
  }
];

export const WebStructure: React.FC = () => {
  const { mode } = useLanguage();
  const { setActiveTab } = useApp();
  const mn = mode === 'mn';

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
        {PAGES.map(page => (
          <div
            key={page.nameEn}
            role="link"
            tabIndex={0}
            onClick={() => setActiveTab(page.tab)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveTab(page.tab);
              }
            }}
            className="group cursor-pointer space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-600/60 dark:hover:bg-slate-900"
          >
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
            <div className="pt-1 text-xs font-bold text-emerald-700 group-hover:underline dark:text-teal-300">
              {mn ? 'Хуудас руу орох →' : 'Open page →'}
            </div>
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
