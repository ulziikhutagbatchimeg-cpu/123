import React from 'react';
import { useLanguage } from '../context/LanguageContext';

// The structure of the web: the diagram shows the route a student takes through the tabs, and the table says what each
// tab holds and who it is for. The labels follow the language toggle.
const ROWS = [
  {
    tabEn: 'Dashboard',
    tabMn: 'Хяналтын самбар',
    holdsEn: 'Start page: the next topic, mistakes to fix and quick links',
    holdsMn: 'Эхлэх хуудас: дараагийн сэдэв, засах алдаа, шуурхай холбоос',
    forEn: 'Everyone',
    forMn: 'Бүгд'
  },
  {
    tabEn: 'Lessons',
    tabMn: 'Хичээл',
    holdsEn: 'Chapters of the chosen course: 40-minute inquiry lesson, slide show, concept maps and exit-ticket grade',
    holdsMn: 'Сонгосон хөтөлбөрийн бүлгүүд: 40 минутын шинжилгээний хичээл, слайд show, концепт зураг, гарах билетийн үнэлгээ',
    forEn: 'Student',
    forMn: 'Сурагч'
  },
  {
    tabEn: 'Student: Revise',
    tabMn: 'Суралцагч: Давтах',
    holdsEn: 'Flashcards, mind map and exam skills',
    holdsMn: 'Үг цээжлэх карт, зураглал, шалгалтын ур чадвар',
    forEn: 'Student',
    forMn: 'Сурагч'
  },
  {
    tabEn: 'Student: Practise',
    tabMn: 'Суралцагч: Дасгалжуулах',
    holdsEn: 'Mistake notebook, past papers, mock tests and calculations with worked steps',
    holdsMn: 'Алдааны сан, өмнөх жилийн шалгалт, mock шалгалт, алхам бүрээр бодсон тооцоо',
    forEn: 'Student',
    forMn: 'Сурагч'
  },
  {
    tabEn: 'Student: Lab & games',
    tabMn: 'Суралцагч: Лаборатори, тоглоом',
    holdsEn: 'Virtual labs and the game arena',
    holdsMn: 'Виртуал лаб, тоглоомын талбар',
    forEn: 'Student',
    forMn: 'Сурагч'
  },
  {
    tabEn: 'Periodic Table',
    tabMn: 'Үелэх хүснэгт',
    holdsEn: 'Interactive periodic table with the syllabus data',
    holdsMn: 'Хөтөлбөрийн мэдээлэлтэй харилцан үйлчлэх үелэх хүснэгт',
    forEn: 'Everyone',
    forMn: 'Бүгд'
  },
  {
    tabEn: 'Teacher Area',
    tabMn: 'Багшийн талбар',
    holdsEn: 'Class progress and the slide decks (download only with the teacher account)',
    holdsMn: 'Ангийн явц, слайд (татах нь зөвхөн багшийн дансаар)',
    forEn: 'Teacher',
    forMn: 'Багш'
  }
];

const NODES = [
  { en: 'Dashboard', mn: 'Хяналтын самбар' },
  { en: 'Lessons', mn: 'Хичээл' },
  { en: 'Student', mn: 'Суралцагч' },
  { en: 'Teacher', mn: 'Багш' }
];

export const WebStructure: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
        {mn ? 'Вэбийн бүтэц' : 'How the web is organised'}
      </div>

      <svg viewBox="0 0 720 136" className="w-full h-auto" role="img" aria-label={mn ? 'Вэбийн бүтцийн диаграм' : 'Diagram of the web structure'}>
        {NODES.map((n, i) => {
          const x = i * 180 + 10;
          return (
            <g key={n.en}>
              <rect x={x} y={34} width={150} height={68} rx={14} className="fill-emerald-50 stroke-emerald-500 dark:fill-emerald-950 dark:stroke-teal-500" strokeWidth={1.5} />
              <text x={x + 75} y={74} textAnchor="middle" className="fill-slate-900 dark:fill-white" fontSize={14} fontWeight={700}>
                {mn ? n.mn : n.en}
              </text>
              {i < NODES.length - 1 && (
                <>
                  <line x1={x + 154} y1={68} x2={x + 176} y2={68} className="stroke-slate-400" strokeWidth={1.5} />
                  <polygon points={`${x + 176},62 ${x + 184},68 ${x + 176},74`} className="fill-slate-400" />
                </>
              )}
            </g>
          );
        })}
      </svg>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <th className="py-2 pr-3 font-bold">{mn ? 'Таб' : 'Tab'}</th>
              <th className="py-2 pr-3 font-bold">{mn ? 'Юу агуулдаг' : 'What it holds'}</th>
              <th className="py-2 font-bold">{mn ? 'Хэнд' : 'For'}</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(row => (
              <tr key={row.tabEn} className="border-b border-slate-100 dark:border-slate-800/70 align-top text-slate-700 dark:text-slate-300">
                <td className="py-2 pr-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">{mn ? row.tabMn : row.tabEn}</td>
                <td className="py-2 pr-3">{mn ? row.holdsMn : row.holdsEn}</td>
                <td className="py-2 whitespace-nowrap">{mn ? row.forMn : row.forEn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
