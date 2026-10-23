import React from 'react';
import { ArrowRight } from 'lucide-react';

// The concept network behind every trend in the lab. Read from left to right: the cause in the atom
// explains the trend, the trend explains the physical properties, and those explain the chemical behaviour.
// The periodic trend column is split into the change across a period and the change down a group.

interface Item {
  en: string;
  mn: string;
}

interface Column {
  titleEn: string;
  titleMn: string;
  tone: string;
  items?: Item[];
  across?: Item[];
  down?: Item[];
}

const A_LEVEL: Column[] = [
  {
    titleEn: 'Cause in the atom',
    titleMn: 'Атомын шалтгаан',
    tone: 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40',
    items: [
      { en: 'Nuclear charge (more protons)', mn: 'Цөмийн цэнэг (протон нэмэгдэнэ)' },
      { en: 'Number of shells', mn: 'Бүрхүүлийн тоо' },
      { en: 'Shielding by inner electrons', mn: 'Дотоод электроны халхлал' }
    ]
  },
  {
    titleEn: 'Periodic trend',
    titleMn: 'Үелэх зүй тогтол',
    tone: 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40',
    across: [
      { en: 'Atomic radius decreases', mn: 'Атомын радиус буурна' },
      { en: 'First ionisation energy (IE₁) increases', mn: 'Анхны ионжих энерги (IE₁) нэмэгдэнэ' },
      { en: 'Electronegativity increases', mn: 'Цахилгаан сөрөг чанар нэмэгдэнэ' },
      { en: 'Metallic character decreases', mn: 'Металл шинж буурна' }
    ],
    down: [
      { en: 'Atomic radius increases', mn: 'Атомын радиус нэмэгдэнэ' },
      { en: 'First ionisation energy (IE₁) decreases', mn: 'Анхны ионжих энерги (IE₁) буурна' },
      { en: 'Electronegativity decreases', mn: 'Цахилгаан сөрөг чанар буурна' },
      { en: 'Metallic character increases', mn: 'Металл шинж нэмэгдэнэ' }
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
      { en: 'Reactivity with water (Group 1)', mn: 'Усатай урвалын идэвх (I бүлэг)' },
      { en: 'Displacement of halogens (Group VII)', mn: 'Галогений орлуулалт (VII бүлэг)' },
      { en: 'Oxidation and reduction', mn: 'Исэлдэлт ба ангижрал' }
    ]
  }
];

// The IGCSE 0620 (2026–2028) programme: the statements of section 8, with only the Group I and Group VII trends
const IGCSE: Column[] = [
  {
    titleEn: 'Cause in the atom',
    titleMn: 'Атомын шалтгаан',
    tone: 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40',
    items: [
      { en: 'Nuclear charge (more protons)', mn: 'Цөмийн цэнэг (протон нэмэгдэнэ)' },
      { en: 'Number of shells', mn: 'Бүрхүүлийн тоо' },
      { en: 'Number of outer electrons (group number)', mn: 'Гаднах электроны тоо (бүлгийн дугаар)' }
    ]
  },
  {
    titleEn: 'Periodic trend',
    titleMn: 'Үелэх зүй тогтол',
    tone: 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40',
    across: [{ en: 'Metallic to non-metallic character (Period 3)', mn: 'Металлаас металл бус шинж рүү (3-р үе)' }],
    down: [
      { en: 'Group I: reactivity increases', mn: 'I бүлэг: идэвх нэмэгдэнэ' },
      { en: 'Group I: melting point decreases, density increases', mn: 'I бүлэг: хайлах цэг буурч, нягт нэмэгдэнэ' },
      { en: 'Group VII: reactivity decreases', mn: 'VII бүлэг: идэвх буурна' },
      { en: 'Group VII: density increases', mn: 'VII бүлэг: нягт нэмэгдэнэ' }
    ]
  },
  {
    titleEn: 'Physical property',
    titleMn: 'Физик шинж',
    tone: 'border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40',
    items: [
      { en: 'Metallic or non-metallic character', mn: 'Металл эсвэл металл бус шинж' },
      { en: 'Ionic or covalent bonding', mn: 'Ионы эсвэл ковалент холбоо' },
      { en: 'State at room temperature', mn: 'Өрөөний температурын төлөв' }
    ]
  },
  {
    titleEn: 'Chemical behaviour',
    titleMn: 'Хими шинж',
    tone: 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/40',
    items: [
      { en: 'Reactivity with water (Group I)', mn: 'Усатай урвалын идэвх (I бүлэг)' },
      { en: 'Displacement of halogens (Group VII)', mn: 'Галогений орлуулалт (VII бүлэг)' },
      { en: 'Redox: oxidation and reduction', mn: 'Redox: исэлдэлт ба бууралт' }
    ]
  }
];

interface Props {
  mn: boolean;
  programme?: 'igcse' | 'alevel';
}

const ItemList: React.FC<{ items: Item[]; mn: boolean }> = ({ items, mn }) => (
  <ul className="space-y-1.5">
    {items.map(item => (
      <li key={item.en} className="text-[11px] text-slate-700 dark:text-slate-200 leading-snug">
        • {mn ? item.mn : item.en}
      </li>
    ))}
  </ul>
);

export const ConceptNetwork: React.FC<Props> = ({ mn, programme = 'alevel' }) => {
  const columns = programme === 'igcse' ? IGCSE : A_LEVEL;

  return (
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
        {columns.map((col, i) => (
          <React.Fragment key={col.titleEn}>
            <div className={`rounded-2xl border p-3 space-y-3 ${col.tone}`}>
              <div className="text-xs font-black text-slate-900 dark:text-white">{mn ? col.titleMn : col.titleEn}</div>
              {col.items && <ItemList items={col.items} mn={mn} />}
              {col.across && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    {mn ? 'Үеийн дагуу →' : 'Across a period →'}
                  </div>
                  <ItemList items={col.across} mn={mn} />
                </div>
              )}
              {col.down && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    {mn ? 'Бүлгийн дагуу ↓' : 'Down a group ↓'}
                  </div>
                  <ItemList items={col.down} mn={mn} />
                </div>
              )}
            </div>
            {i < columns.length - 1 && (
              <div className="hidden md:flex items-center justify-center text-slate-400">
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
