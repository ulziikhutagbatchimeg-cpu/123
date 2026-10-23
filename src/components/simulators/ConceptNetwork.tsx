import React from 'react';
import { ArrowRight } from 'lucide-react';

// The concept network behind every trend in the lab. Read from left to right: the cause in the atom
// explains the trend, the trend explains the physical properties, and those explain the chemical behaviour.

interface Column {
  titleEn: string;
  titleMn: string;
  tone: string;
  items: Array<{ en: string; mn: string }>;
}

const COLUMNS: Column[] = [
  {
    titleEn: 'Cause in the atom',
    titleMn: 'Атомын шалтгаан',
    tone: 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40',
    items: [
      { en: 'Nuclear charge (more protons)', mn: 'Цөмийн цэнэг (протон нэмэгдэнэ)' },
      { en: 'Number of shells', mn: 'Бүрхүүлийн тоо' },
      { en: 'Shielding by inner electrons', mn: 'Дотоод электроны далдлалт' }
    ]
  },
  {
    titleEn: 'Periodic trend',
    titleMn: 'Үелэх зүй тогтол',
    tone: 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40',
    items: [
      { en: 'Atomic radius', mn: 'Атомын радиус' },
      { en: 'First ionisation energy (IE₁)', mn: 'Анхны ионжих энерги (IE₁)' },
      { en: 'Electronegativity', mn: 'Цахилгаан сөрөг чанар' }
    ]
  },
  {
    titleEn: 'Physical property',
    titleMn: 'Физик шинж',
    tone: 'border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40',
    items: [
      { en: 'Metallic or non-metallic character', mn: 'Металл эсвэл металл бус шинж' },
      { en: 'Ionic or covalent bonding', mn: 'Ионы эсвэл ковалент холбоо' },
      { en: 'State and boiling point', mn: 'Төлөв ба буцлах цэг' }
    ]
  },
  {
    titleEn: 'Chemical behaviour',
    titleMn: 'Хими шинж',
    tone: 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/40',
    items: [
      { en: 'Reactivity with water (Group 1)', mn: 'Усатай урвалын идэвх (Бүлэг 1)' },
      { en: 'Displacement of halogens (Group 17)', mn: 'Галогений орлуулалт (Бүлэг 17)' },
      { en: 'Oxidation and reduction', mn: 'Исэлдэлт ба ангижрал' }
    ]
  }
];

interface Props {
  mn: boolean;
}

export const ConceptNetwork: React.FC<Props> = ({ mn }) => (
  <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-4 shadow-xs">
    <div className="space-y-1">
      <h3 className="text-sm font-black text-slate-900 dark:text-white">{mn ? 'Ухагдахууны сүлжээ' : 'The concept network'}</h3>
      <p className="text-xs text-slate-600 dark:text-slate-300">
        {mn
          ? 'Зүүнээс баруун тийш уншина: атомын шалтгаан зүй тогтлыг, зүй тогтол физик шинжийг, физик шинж хими шинжийг тайлбарлана.'
          : 'Read from left to right: the cause in the atom explains the trend, the trend explains the physical property, and that explains the chemical behaviour.'}
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-2">
      {COLUMNS.map((col, i) => (
        <React.Fragment key={col.titleEn}>
          <div className={`rounded-2xl border p-3 space-y-2 ${col.tone}`}>
            <div className="text-xs font-black text-slate-900 dark:text-white">{mn ? col.titleMn : col.titleEn}</div>
            <ul className="space-y-1.5">
              {col.items.map(item => (
                <li key={item.en} className="text-[11px] text-slate-700 dark:text-slate-200 leading-snug">
                  • {mn ? item.mn : item.en}
                </li>
              ))}
            </ul>
          </div>
          {i < COLUMNS.length - 1 && (
            <div className="hidden md:flex items-center justify-center text-slate-400">
              <ArrowRight className="w-5 h-5" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </section>
);
