import React from 'react';
import type { ReactNode } from 'react';
import {
  BookOpen,
  Calculator,
  ClipboardList,
  FileText,
  FlaskConical,
  Gamepad2,
  GraduationCap,
  Grid,
  HelpCircle,
  Home,
  Layers,
  Lock,
  NotebookPen,
  RotateCcw,
  Settings,
  Target,
  Wrench,
  type LucideIcon
} from 'lucide-react';
import { useApp, type AppTab } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

// The guide for students: where each part of the site is, how a lesson goes, how the checks and tests differ, what opens what,
// and how the work is kept. Every page named here is a button that opens it. The same guide is on all three sites; the few
// lines that differ between IGCSE 0620 and 9701 say so.

type Bi = { en: string; mn: string };

interface Place {
  tab: AppTab;
  icon: LucideIcon;
  name: Bi;
  what: Bi;
}

interface Menu {
  icon: LucideIcon;
  name: Bi;
  how: Bi;
  places: Place[];
}

const CARD = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 space-y-4';
const HEADING = 'text-base font-black text-slate-900 dark:text-white';

export const HowToStudy: React.FC = () => {
  const { mode } = useLanguage();
  const { setActiveTab, programme, courseChoice } = useApp();
  const igcse = programme === 'igcse';
  const aLevel = courseChoice === 'a';

  // English only, Mongolian only, or both in Dual (English first, Mongolian under it in a lighter tone)
  const txt = (b: Bi): ReactNode => {
    if (mode === 'en') return b.en;
    if (mode === 'mn') return b.mn;
    return (
      <>
        {b.en}
        <span className="block text-[0.85em] font-normal text-slate-500 dark:text-slate-400">{b.mn}</span>
      </>
    );
  };
  const t = (en: string, mn: string) => txt({ en, mn });

  const go = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0 });
  };

  // The menus of the top bar and what is in each, in the order they stand
  const MENUS: Menu[] = [
    {
      icon: Home,
      name: { en: 'Home', mn: 'Нүүр' },
      how: { en: 'The Home tab, or the flask logo at the top left', mn: '«Нүүр» товч, эсвэл зүүн дээд буланд байгаа колбоны дүрс' },
      places: [
        {
          tab: 'dashboard',
          icon: Home,
          name: { en: 'Home page', mn: 'Нүүр хуудас' },
          what: {
            en: 'Your next step, today’s 40-minute plan, cards due for review, mistakes to fix, and the 2-minute site tour video.',
            mn: 'Таны дараагийн алхам, өнөөдрийн 40 минутын төлөвлөгөө, давтах карт, засах алдаа, 2 минутын танилцуулга видео.'
          }
        }
      ]
    },
    {
      icon: BookOpen,
      name: { en: 'Study', mn: 'Сурах' },
      how: { en: 'Study, then Lessons', mn: '«Сурах» → «Хичээл»' },
      places: [
        {
          tab: 'curriculum',
          icon: BookOpen,
          name: { en: 'Lessons', mn: 'Хичээл' },
          what: {
            en: 'Every chapter and topic: the 40-minute lessons with slides, the key words, the topic quiz and the end-of-topic test. Most of your work is here.',
            mn: 'Бүх бүлэг, сэдэв: слайдтай 40 минутын хичээл, түлхүүр үг, сэдвийн шалгалтын тест, сэдвийн шалгалт. Ихэнх ажил энд хийгдэнэ.'
          }
        }
      ]
    },
    {
      icon: ClipboardList,
      name: { en: 'Practice', mn: 'Дадлага' },
      how: { en: 'Practice, then the card you need', mn: '«Дадлага» → хэрэгтэй картаа сонгоно' },
      places: [
        {
          tab: 'exam',
          icon: ClipboardList,
          name: igcse ? { en: 'Exam practice (Paper 2, 4, 6)', mn: 'Шалгалтын дасгал (Paper 2, 4, 6)' } : { en: 'Past papers (9701)', mn: 'Past paper (9701)' },
          what: igcse
            ? { en: 'Exam-style questions with mark schemes, a timed mode and 5 mock tests.', mn: 'Онооны заалттай шалгалтын асуулт, цагтай горим, 5 туршилтын тест.' }
            : { en: 'Links to the official Cambridge 9701 papers.', mn: 'Cambridge-ийн албан ёсны 9701 шалгалтын материалын холбоос.' }
        },
        {
          tab: 'tests',
          icon: FileText,
          name: { en: 'Timed chapter tests', mn: 'Бүлгийн цагтай тест' },
          what: {
            en: 'A long test over several chapters. It opens once every topic of those chapters is finished; only the tests marked ready can be taken.',
            mn: 'Хэд хэдэн бүлгийн урт тест. Тэр бүлгүүдийн бүх сэдвийг дуусгасны дараа нээгдэнэ; зөвхөн бэлэн болсон тест өгөгдөнө.'
          }
        },
        {
          tab: 'games',
          icon: Gamepad2,
          name: { en: 'Practice games', mn: 'Дасгалын тоглоом' },
          what: { en: 'Short games with key words and questions, alone or in teams.', mn: 'Түлхүүр үг, асуултын богино тоглоом, ганцаараа эсвэл багаар.' }
        },
        {
          tab: 'mistakes',
          icon: NotebookPen,
          name: { en: 'Mistake notebook', mn: 'Алдааны сан' },
          what: { en: 'Every question you got wrong, with the reason. Fix them and mark them done.', mn: 'Буруу хариулсан асуулт бүр шалтгаантайгаа. Засаад «зассан» гэж тэмдэглэнэ.' }
        },
        {
          tab: 'student',
          icon: GraduationCap,
          name: { en: 'Self-check', mn: 'Өөрийгөө шалгах' },
          what: { en: 'Your progress: scores by chapter, tests taken and rewards.', mn: 'Таны явц: бүлэг бүрийн оноо, өгсөн тест, шагнал.' }
        },
        {
          tab: 'notebook',
          icon: NotebookPen,
          name: { en: 'My notebook', mn: 'Миний дэвтэр' },
          what: { en: 'Lessons you pinned and your own notes, ready to print.', mn: 'Хадсан хичээл, өөрийн тэмдэглэл, хэвлэх боломжтой.' }
        }
      ]
    },
    {
      icon: Wrench,
      name: { en: 'Toolkit', mn: 'Хэрэглүүд' },
      how: { en: 'Toolkit, then the tool you need', mn: '«Хэрэглүүд» → хэрэгтэй хэрэгслээ сонгоно' },
      places: [
        {
          tab: 'flashcards',
          icon: Layers,
          name: { en: 'Flashcards', mn: 'Үг цээжлэх карт' },
          what: { en: 'Every key word, English and Mongolian, reviewed on the right day. Filter by chapter.', mn: 'Бүх түлхүүр үг англи, монголоор, давтах өдрөөрөө гарна. Бүлгээр шүүж болно.' }
        },
        {
          tab: 'calculations',
          icon: Calculator,
          name: { en: 'Calculations', mn: 'Тооцоолол' },
          what: { en: 'Worked examples step by step, then problems to solve yourself.', mn: 'Алхам алхмаар бодсон жишээ, дараа нь өөрөө бодох бодлого.' }
        },
        {
          tab: 'labs',
          icon: FlaskConical,
          name: { en: 'Virtual labs', mn: 'Виртуал лаб' },
          what: { en: 'Change the conditions and see what happens.', mn: 'Нөхцөлийг өөрчилж юу болохыг харна.' }
        },
        {
          tab: 'periodictable',
          icon: Grid,
          name: { en: 'Periodic table', mn: 'Үелэх хүснэгт' },
          what: { en: 'Click an element to see its data.', mn: 'Элемент дээр дарж мэдээллийг нь харна.' }
        },
        {
          tab: 'skills',
          icon: Target,
          name: { en: 'Exam skills', mn: 'Шалгалтын ур чадвар' },
          what: { en: 'The command words (state, explain, calculate…) with tasks and model answers.', mn: 'Command word (state, explain, calculate…), даалгавар, жишиг хариулттай.' }
        }
      ]
    }
  ];

  // The five steps of a 40-minute lesson
  const STEPS: { name: Bi; what: Bi }[] = [
    {
      name: { en: 'Question and prediction', mn: 'Асуулт, таамаглал' },
      what: { en: 'Write what you think will happen and why (at least 10 characters). This opens the next steps.', mn: 'Юу болохыг, яагаад гэдгээ бичнэ (дор хаяж 10 тэмдэгт). Ингэснээр дараагийн алхмууд нээгдэнэ.' }
    },
    {
      name: { en: 'Test (simulation)', mn: 'Туршилт (симуляци)' },
      what: {
        en: 'Watch the slides. Where there is a simulation, work with it as in part 3 below.',
        mn: 'Слайдаа үзнэ. Симуляци байвал доорх 3-р хэсэгт заасны дагуу ажиллана.'
      }
    },
    {
      name: { en: 'Explain + quick check', mn: 'Тайлбар + түргэн шалгалт' },
      what: { en: 'Read the slides, then answer every quick-check question. This opens steps 4 and 5.', mn: 'Слайдаа уншаад түргэн шалгалтын бүх асуултад хариулна. Ингэснээр 4, 5-р алхам нээгдэнэ.' }
    },
    {
      name: { en: 'Apply: practice', mn: 'Хэрэглэх: дасгал' },
      what: { en: 'Easy, medium and hard practice. For a hard one, write your answer, then compare it with the model answer.', mn: 'Хялбар, дунд, хүнд дасгал. Хүнд асуултад хариултаа бичээд жишиг хариулттай харьцуулна.' }
    },
    {
      name: { en: 'Conclude: exit ticket', mn: 'Дүгнэлт: гарах тасалбар' },
      what: { en: 'The short test of the lesson. Above 60% opens the next lesson. Your teacher sees the score.', mn: 'Хичээлийн богино шалгалт. 60%-иас дээш авбал дараагийн хичээл нээгдэнэ. Оноог багш харна.' }
    }
  ];

  // Where the simulations are, how to work with one, and how its score is made (components/LabFrame.tsx)
  const SIM_PLACES: { name: Bi; what: Bi }[] = [
    {
      name: { en: 'In a lesson', mn: 'Хичээл дотор' },
      what: { en: 'Usually in step 2, Test. Its Next step button moves the lesson on.', mn: 'Ихэвчлэн 2-р алхам «Туршилт»-д. «Дараагийн алхам» товчоор хичээл үргэлжилнэ.' }
    },
    {
      name: { en: 'In a topic', mn: 'Сэдэв дотор' },
      what: { en: 'The topic’s Simulation button, under the lesson.', mn: 'Хичээлийн доорх сэдвийн «Симуляц» товч.' }
    },
    {
      name: { en: 'Toolkit, Virtual labs', mn: '«Хэрэглүүд» → «Виртуал лаб»' },
      what: { en: 'All the labs in one place, to try freely at any time.', mn: 'Бүх лаб нэг дор, хүссэн үедээ чөлөөтэй туршина.' }
    }
  ];
  const SIM_STEPS: { name: Bi; what: Bi }[] = [
    {
      name: { en: 'Read the question first', mn: 'Эхлээд асуултаа унш' },
      what: { en: 'Know what you are looking for, and write your prediction in step 1.', mn: 'Юуг хайж байгаагаа мэдээд, 1-р алхамд таамаглалаа бич.' }
    },
    {
      name: { en: 'Try it yourself', mn: 'Өөрөө турш' },
      what: {
        en: 'Move the sliders, press the buttons, change one thing at a time and watch what changes. Wait until the lab has loaded.',
        mn: 'Гулсуурыг хөдөлгө, товч дар, нэг удаад нэг л зүйл өөрчилж юу өөрчлөгдөхийг ажигла. Лаб бүрэн ачаалагдтал хүлээ.'
      }
    },
    {
      name: { en: 'Open every part', mn: 'Бүх хэсгийг нь нээ' },
      what: { en: 'Many labs have tabs along the top (for example Solid, Liquid, Gas). Open each one.', mn: 'Олон лабын дээд талд таб байдаг (жишээ нь Solid, Liquid, Gas). Нэг бүрчлэн нээ.' }
    },
    {
      name: { en: 'Press Submit', mn: '«Илгээх» товч дар' },
      what: { en: 'The violet bar under the lab: Finished the lab? Submit it to get your score.', mn: 'Лабын доорх ягаан мөр: «Лабаа хийж дуусаад илгээгээрэй, оноо тань гарна».' }
    },
    {
      name: { en: 'Answer 2 short questions', mn: '2 богино асуултад хариул' },
      what: {
        en: 'About what you saw, then See my score. Back to the lab lets you look again first.',
        mn: 'Ажигласан зүйлийнхээ талаар, дараа нь «Дүнгээ харах». «Лаб руу буцах» дарж дахин харж болно.'
      }
    },
    {
      name: { en: 'Read your score', mn: 'Оноогоо хар' },
      what: {
        en: 'A wrong answer shows the right one. Try again does it once more; Next step goes on. Your teacher sees the score.',
        mn: 'Буруу хариултын зөвийг харуулна. «Дахин хийх» дарж дахин хийнэ, «Дараагийн алхам» дарж үргэлжлүүлнэ. Оноог багш харна.'
      }
    }
  ];
  const SIM_SCORE: { points: string; name: Bi; what: Bi }[] = [
    {
      points: '30',
      name: { en: 'Tried it yourself', mn: 'Өөрөө туршсан' },
      what: { en: 'Full marks after about 8 uses of the controls.', mn: 'Удирдлагыг 8 орчим удаа хэрэглэвэл бүтэн оноо.' }
    },
    {
      points: '20',
      name: { en: 'Looked at its parts', mn: 'Хэсгүүдийг үзсэн' },
      what: { en: 'Full marks for opening its tabs (up to 3).', mn: 'Табуудыг нь нээвэл бүтэн оноо (3 хүртэл).' }
    },
    {
      points: '50',
      name: { en: 'The 2 questions', mn: '2 асуулт' },
      what: { en: '25 for each right answer.', mn: 'Зөв хариулт бүрт 25 оноо.' }
    }
  ];
  const SIM_TIPS: Bi[] = [
    { en: 'Compare what you saw with your prediction: were you right, and why?', mn: 'Ажигласнаа таамаглалтайгаа харьцуул: зөв байсан уу, яагаад?' },
    { en: 'On a phone, turn it sideways; the lab is easier to use on a computer.', mn: 'Утсаа хэвтээ эргүүл; компьютер дээр илүү хялбар.' },
    { en: 'If the lab stays blank, press the refresh arrow at the top and wait.', mn: 'Лаб хоосон хэвээр байвал дээд талын сэргээх сумыг дараад хүлээ.' }
  ];

  // The checks and tests, from the smallest to the largest
  const CHECKS: { name: Bi; where: Bi; what: Bi; opens: Bi }[] = [
    {
      name: { en: 'Quick check', mn: 'Түргэн шалгалт (quick check)' },
      where: { en: 'Lesson, step 3', mn: 'Хичээлийн 3-р алхам' },
      what: { en: 'A few short questions on the slides', mn: 'Слайдаа ойлгосон эсэхийг шалгах богино асуултууд' },
      opens: { en: 'Steps 4 and 5', mn: '4, 5-р алхам' }
    },
    {
      name: { en: 'Simulation: Submit', mn: 'Симуляци: «Илгээх»' },
      where: { en: 'Under each lab', mn: 'Лаб бүрийн доор' },
      what: { en: '2 questions and a score out of 100', mn: '2 асуулт, 100 онооны дүн' },
      opens: { en: 'In a lesson: Next step', mn: 'Хичээл дотор: «Дараагийн алхам»' }
    },
    {
      name: { en: 'Practice set', mn: 'Бие даах дасгал' },
      where: { en: 'Lesson, step 4', mn: 'Хичээлийн 4-р алхам' },
      what: { en: 'Easy, medium, hard practice', mn: 'Хялбар, дунд, хүнд дасгал' },
      opens: { en: 'Nothing; practice only', mn: 'Юу ч нээхгүй, зөвхөн дасгал' }
    },
    {
      name: { en: 'Exit ticket', mn: 'Гарах тасалбар' },
      where: { en: 'Lesson, step 5', mn: 'Хичээлийн 5-р алхам' },
      what: { en: 'The test of the lesson', mn: 'Хичээлийн шалгалт' },
      opens: { en: 'Above 60%: the next lesson', mn: '60%-иас дээш: дараагийн хичээл' }
    },
    {
      name: { en: 'Exam quiz (topic quiz)', mn: 'Шалгалтын тест (сэдвийн дасгал)' },
      where: { en: 'Lessons, the topic’s Exam quiz button', mn: 'Хичээл → сэдвийн «Шалгалтын тест» товч' },
      what: aLevel
        ? { en: 'The topic’s questions (easy, medium, hard), 30 minutes', mn: 'Сэдвийн асуултууд (хялбар, дунд, хүнд), 30 минут' }
        : { en: 'At least 6 questions (easy, medium, hard), 30 minutes', mn: 'Дор хаяж 6 асуулт (хялбар, дунд, хүнд), 30 минут' },
      opens: { en: 'Nothing; practice only', mn: 'Юу ч нээхгүй, зөвхөн дасгал' }
    },
    {
      name: { en: 'Self-check: objectives and key words', mn: 'Өөрийн үнэлгээ: зорилт, түлхүүр үг' },
      where: { en: 'The topic’s Objectives and Key words parts, and the last lesson of a chapter', mn: 'Сэдвийн «Зорилго», «Түлхүүр үг» хэсэг, бүлгийн сүүлийн хичээл' },
      what: { en: 'Rate each one: I can, or not yet', mn: 'Тус бүрийг «Чадна» эсвэл «Хараахан» гэж үнэлнэ' },
      opens: { en: 'The end-of-topic test; the chapter’s last exit ticket', mn: 'Сэдвийн шалгалт; бүлгийн сүүлийн гарах билет' }
    },
    {
      name: { en: 'End-of-topic test', mn: 'Сэдвийн шалгалт' },
      where: { en: 'Lessons, at the foot of the topic', mn: 'Хичээл → сэдвийн хамгийн доор' },
      what: aLevel
        ? { en: 'The topic’s questions, 1 minute each', mn: 'Сэдвийн асуултууд, асуулт бүрт 1 минут' }
        : { en: '5 questions not in the exam quiz, 1 minute each', mn: 'Шалгалтын тестэд ороогүй 5 асуулт, асуулт бүрт 1 минут' },
      opens: { en: 'Above 60%: the topic is finished', mn: '60%-иас дээш: сэдэв дууссанд тооцогдоно' }
    },
    {
      name: { en: 'Timed chapter test', mn: 'Бүлгийн цагтай тест' },
      where: { en: 'Practice, Timed chapter tests', mn: 'Дадлага → Бүлгийн цагтай тест' },
      what: { en: 'A long test over several chapters', mn: 'Хэд хэдэн бүлгийн урт тест' },
      opens: { en: 'Nothing; it is your chapter grade', mn: 'Юу ч нээхгүй, бүлгийн дүн' }
    }
  ];

  // What opens what, in the order a student meets it
  const LOCKS: Bi[] = [
    { en: 'The site opens once your teacher approves your request to join.', mn: 'Элсэх хүсэлтийг тань багш зөвшөөрсний дараа сайт нээгдэнэ.' },
    { en: 'The lessons open once you rate the five self-rating questions (1–5).', mn: 'Өөрийн үнэлгээний 5 асуултыг (1–5) үнэлсний дараа хичээлүүд нээгдэнэ.' },
    { en: 'In a lesson: the prediction opens step 2; the quick check opens steps 4 and 5.', mn: 'Хичээл дотор: таамаглал бичихэд 2-р алхам, түргэн шалгалтыг дуусгахад 4, 5-р алхам нээгдэнэ.' },
    { en: 'An exit ticket above 60% opens the next lesson. After the last lesson of a chapter, the next chapter opens.', mn: 'Гарах тасалбарт 60%-иас дээш авбал дараагийн хичээл нээгдэнэ. Бүлгийн сүүлийн хичээлийн дараа дараагийн бүлэг нээгдэнэ.' },
    { en: 'Objectives and Key words are always open. A topic’s other parts open once every lesson of its chapter is passed.', mn: '«Зорилго», «Түлхүүр үг» үргэлж нээлттэй. Сэдвийн бусад хэсэг тухайн бүлгийн бүх хичээлийг давсны дараа нээгдэнэ.' },
    { en: 'Rate every learning objective and key word: I can, or not yet. The end-of-topic test opens once the topic’s are all rated; the last exit ticket of a chapter once the whole chapter’s are. Your teacher sees the ratings.', mn: 'Сурах зорилт, түлхүүр үг бүрийг «Чадна» эсвэл «Хараахан» гэж үнэлнэ. Сэдвийн шалгалт тухайн сэдвийнх, бүлгийн сүүлийн гарах билет бүх бүлгийнх бүгд үнэлэгдсэний дараа нээгдэнэ. Үнэлгээг багш харна.' },
    { en: 'A chapter without lessons: each topic opens when the one before is finished (end-of-topic test above 60%, or Mark as completed).', mn: 'Хичээлгүй бүлэгт: өмнөх сэдэв дуусахад дараагийн сэдэв нээгдэнэ (сэдвийн шалгалт 60%-иас дээш, эсвэл «Судалснаар тэмдэглэх»).' },
    { en: 'Full access from your teacher opens everything at once.', mn: 'Багш бүрэн эрх өгвөл бүх зүйл нэг дор нээгдэнэ.' }
  ];

  const placeButton = (p: Place) => {
    const Icon = p.icon;
    return (
      <button
        key={p.tab}
        type="button"
        onClick={() => go(p.tab)}
        className="flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition-colors hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500/60"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-teal-950/60 dark:text-teal-300">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 space-y-0.5">
          <span className="block text-sm font-bold text-slate-900 dark:text-white">{txt(p.name)} →</span>
          <span className="block text-xs leading-snug text-slate-600 dark:text-slate-400">{txt(p.what)}</span>
        </span>
      </button>
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-16">
      <section className={CARD}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <HelpCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">{t('How to study here', 'Хэрхэн суралцах вэ?')}</h1>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {t(
            'Where each part of the site is, how a lesson goes, and what opens what. Press any page name to open it. The ? button at the top brings you back here from any page.',
            'Сайтын хэсгүүд хаана байгаа, хичээл хэрхэн явагддаг, юу хийвэл юу нээгддэгийг энд харуулав. Хуудасны нэр дээр дарвал тэр хуудас нээгдэнэ. Дээд талын «?» товчоор аль ч хуудаснаас энд буцаж ирнэ.'
          )}
        </p>
        <ol className="grid gap-2 sm:grid-cols-4">
          {[
            { en: 'Open Home', mn: '«Нүүр» нээнэ' },
            { en: 'Press Study lesson under Your next step', mn: '«Таны дараагийн алхам» доорх «Хичээл үзэх» товч дарна' },
            { en: 'Do the 5 steps of the lesson', mn: 'Хичээлийн 5 алхмыг хийнэ' },
            { en: 'Review your cards and fix your mistakes', mn: 'Картаа давтаж, алдаагаа засна' }
          ].map((s, i) => (
            <li key={i} className="flex gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-900 dark:bg-teal-950/40 dark:text-teal-100">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">{i + 1}</span>
              <span>{txt(s)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={CARD}>
        <h2 className={HEADING}>{t('1. Where is what', '1. Хаана юу байна вэ?')}</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {t(
            'The four menus are in the row of buttons at the top of every page.',
            'Дөрвөн цэс хуудас бүрийн дээд хэсгийн товчны эгнээнд байна.'
          )}
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          {MENUS.map(menu => {
            const Icon = menu.icon;
            return (
              <div key={menu.name.en} className="space-y-2 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-emerald-700 dark:text-teal-300" aria-hidden="true" />
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">{txt(menu.name)}</h3>
                </div>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{txt(menu.how)}</p>
                <div className="space-y-2">{menu.places.map(placeButton)}</div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-700 dark:text-slate-300">
          <span className="inline-flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4" aria-hidden="true" /> {t('this guide', 'энэ заавар')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Settings className="h-4 w-4" aria-hidden="true" /> {t('language: English, Монгол or Dual', 'хэл: English, Монгол, Dual')}
          </span>
          <span>🔔 {t('notices from your teacher', 'багшийн мэдэгдэл')}</span>
        </div>
      </section>

      <section className={CARD}>
        <h2 className={HEADING}>{t('2. The Lessons page', '2. Хичээлийн хуудас')}</h2>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li>
            <b>{t('Left side', 'Зүүн тал')}:</b>{' '}
            {t('the chapters and their topics. Other chapters opens the rest of the list.', 'бүлэг, сэдвийн жагсаалт. «Бусад бүлгүүд» дарвал бусад бүлэг гарна.')}
          </li>
          <li>
            <b>{t('Buttons at the top', 'Дээд талын товч')}:</b>{' '}
            {t(
              'Lesson (the 40-minute lesson), Key words, Concept maps, Slides and Quick check, for the whole chapter.',
              '«Хичээл» (40 минутын хичээл), «Түлхүүр үгийн сан», «Концепт зураг», «Слайд», «Quick check», бүлэг бүхэлдээ.'
            )}
          </li>
          <li>
            <b>{t('Under the lesson', 'Хичээлийн доор')}:</b>{' '}
            {t(
              'the topic, with its parts: Objectives, Key words, Concepts, Worked example, Simulation and Exam quiz.',
              'сэдэв ба түүний хэсгүүд: «Зорилго», «Түлхүүр үг», «Тайлбар», «Жишээ», «Симуляц», «Шалгалтын тест».'
            )}
          </li>
          <li>
            <b>{t('At the very foot', 'Хамгийн доор')}:</b>{' '}
            {t('the end-of-topic test, then the Previous topic and Next topic buttons.', 'сэдвийн шалгалт, дараа нь «Өмнөх сэдэв», «Дараагийн сэдэв» товч.')}
          </li>
          {!igcse && (
            <li>
              <b>9701:</b>{' '}
              {t(
                'some chapters have 40-minute lessons or an inquiry lesson; in the others you start straight from the topics.',
                'зарим бүлэгт 40 минутын хичээл эсвэл судалгааны хичээл бий; бусад бүлэгт шууд сэдвээс эхэлнэ.'
              )}
            </li>
          )}
        </ul>
        <h3 className="pt-2 text-sm font-black text-slate-900 dark:text-white">{t('The 5 steps of a lesson', 'Хичээлийн 5 алхам')}</h3>
        <ol className="grid gap-2 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={i} className="space-y-1 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white">{i + 1}</span>
                <span className="text-xs font-black text-slate-900 dark:text-white">{txt(s.name)}</span>
              </div>
              <p className="text-xs leading-snug text-slate-600 dark:text-slate-400">{txt(s.what)}</p>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => go('curriculum')}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-700"
        >
          {t('Open the lessons →', 'Хичээл нээх →')}
        </button>
      </section>

      <section className={CARD}>
        <h2 className={`${HEADING} flex items-center gap-2`}>
          <FlaskConical className="h-4 w-4" aria-hidden="true" />
          {t('3. Working with a simulation', '3. Симуляцитай хэрхэн ажиллах вэ?')}
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {SIM_PLACES.map(p => (
            <div key={p.name.en} className="space-y-1 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <div className="text-xs font-black text-slate-900 dark:text-white">{txt(p.name)}</div>
              <p className="text-xs leading-snug text-slate-600 dark:text-slate-400">{txt(p.what)}</p>
            </div>
          ))}
        </div>
        <h3 className="pt-1 text-sm font-black text-slate-900 dark:text-white">{t('Step by step', 'Алхам алхмаар')}</h3>
        <ol className="space-y-2">
          {SIM_STEPS.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white">{i + 1}</span>
              <span>
                <b className="text-slate-900 dark:text-white">{txt(s.name)}</b>
                <span className="block text-xs leading-snug text-slate-600 dark:text-slate-400">{txt(s.what)}</span>
              </span>
            </li>
          ))}
        </ol>
        <h3 className="pt-1 text-sm font-black text-slate-900 dark:text-white">{t('How the score out of 100 is made', '100 оноо хэрхэн бүрддэг вэ?')}</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {SIM_SCORE.map(s => (
            <div key={s.name.en} className="rounded-xl bg-violet-50 p-3 dark:bg-violet-950/40">
              <div className="text-2xl font-black text-violet-800 dark:text-violet-200">{s.points}</div>
              <div className="text-xs font-black text-slate-900 dark:text-white">{txt(s.name)}</div>
              <p className="text-xs leading-snug text-slate-600 dark:text-slate-400">{txt(s.what)}</p>
            </div>
          ))}
        </div>
        <h3 className="pt-1 text-sm font-black text-slate-900 dark:text-white">{t('Tips', 'Зөвлөгөө')}</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
          {SIM_TIPS.map(tip => (
            <li key={tip.en}>{txt(tip)}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => go('labs')}
          className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-black text-white hover:bg-violet-700"
        >
          {t('Open the virtual labs →', 'Виртуал лаб нээх →')}
        </button>
      </section>

      <section className={CARD}>
        <h2 className={HEADING}>{t('4. The checks and tests', '4. Шалгалт, дасгалуудын ялгаа')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="py-2 pr-3 font-bold">{t('Name', 'Нэр')}</th>
                <th className="py-2 pr-3 font-bold">{t('Where', 'Хаана')}</th>
                <th className="py-2 pr-3 font-bold">{t('What it is', 'Юу вэ')}</th>
                <th className="py-2 font-bold">{t('What it opens', 'Юуг нээдэг')}</th>
              </tr>
            </thead>
            <tbody>
              {CHECKS.map(c => (
                <tr key={c.name.en} className="border-b border-slate-100 align-top text-slate-700 dark:border-slate-800/60 dark:text-slate-300">
                  <td className="py-2 pr-3 font-bold text-slate-900 dark:text-white">{txt(c.name)}</td>
                  <td className="py-2 pr-3">{txt(c.where)}</td>
                  <td className="py-2 pr-3">{txt(c.what)}</td>
                  <td className="py-2">{txt(c.opens)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={CARD}>
        <h2 className={`${HEADING} flex items-center gap-2`}>
          <Lock className="h-4 w-4" aria-hidden="true" />
          {t('5. When something is locked', '5. Түгжээтэй байвал')}
        </h2>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
          {LOCKS.map(l => (
            <li key={l.en}>{txt(l)}</li>
          ))}
        </ul>
      </section>

      <section className={CARD}>
        <h2 className={`${HEADING} flex items-center gap-2`}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {t('6. Your work is kept, and can be done again', '6. Хариулт хадгалагдана, дахин хийж болно')}
        </h2>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
          <li>
            {t(
              'Your answers are kept on your account: sign in on any phone or computer and they come back.',
              'Хариулт тань аккаунтад хадгалагдана: аль ч утас, компьютер дээр нэвтэрсэн ч буцаж гарч ирнэ.'
            )}
          </li>
          <li>
            {t(
              'Do it again, Try again and Start again clear a check so you can do it once more. A lesson keeps its best exit-ticket score.',
              '«Дахин хийх», «Дахин оролдох», «Дахин эхлэх» товч шалгалтыг цэвэрлэж дахин хийх боломж олгоно. Хичээл гарах тасалбарын хамгийн өндөр оноогоо хадгална.'
            )}
          </li>
          <li>
            {t(
              'On a shared computer, press Sign out when you finish (on a phone it is in the Account tab).',
              'Олон хүний хэрэглэдэг компьютер дээр дуусаад «Гарах» товч дарна (утсан дээр «Данс» таб дотор).'
            )}
          </li>
        </ul>
      </section>
    </div>
  );
};
