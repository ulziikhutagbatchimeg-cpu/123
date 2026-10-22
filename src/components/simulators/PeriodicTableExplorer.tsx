import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CAMBRIDGE_PERIODIC_TABLE, PeriodicElement } from '../../data/periodicTableData';
import { ISOTOPE_ABUNDANCES } from '../../data/isotopeData';
import { subshellNotation } from '../../data/electronSubshells';
import { ChemText } from '../common/ChemText';
import { PeriodicTrendsLab } from './PeriodicTrendsLab';
import './atomView.css';
import {
  Search,
  Sparkles,
  Layers,
  Flame,
  Info,
  Filter,
  X,
  Droplets,
  Zap,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Compass,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  CircleDot,
  Check,
  Scale,
  Activity,
  TrendingUp,
  List
} from 'lucide-react';

export interface CategoryMeta {
  id: PeriodicElement['category'];
  labelEn: string;
  labelMn: string;
  shortLabelEn: string;
  shortLabelMn: string;
  descriptionEn: string;
  descriptionMn: string;
  examHighlightEn: string;
  examHighlightMn: string;
  cellBg: string;
  dotColor: string;
  badgeClass: string;
}

export const CATEGORY_DEFINITIONS: Record<PeriodicElement['category'], CategoryMeta> = {
  alkali: {
    id: 'alkali',
    labelEn: 'Group I Alkali Metals',
    labelMn: '1-р бүлэг Шүлтийн металл',
    shortLabelEn: 'Alkali Metals',
    shortLabelMn: 'Шүлтийн металл',
    descriptionEn: 'Soft, highly reactive metals with 1 valence electron. React vigorously with cold water to form alkaline metal hydroxide solutions and hydrogen gas.',
    descriptionMn: '1 валентын электронтой зөөлөн, маш идэвхтэй металлууд. Хүйтэн устай эрчимтэй урвалд орж шүлтлэг гидроксидын уусмал ба устөрөгчийн хий үүсгэдэг.',
    examHighlightEn: 'Reactivity INCREASES down Group I (Li < Na < K < Rb < Cs). Flame tests: Li (red), Na (yellow), K (lilac). Stored under oil to prevent reaction with air/moisture.',
    examHighlightMn: 'I бүлгийн дагуу доошлох тусам идэвх ӨСНӨ (Li < Na < K < Rb < Cs). Дөлний сорил: Li (улаан), Na (шар), K (голт борын нил). Агаар, чийгнээс хамгаалж тосонд хадгална.',
    cellBg: 'bg-rose-100/95 hover:bg-rose-200 border-rose-300 text-rose-950 dark:bg-rose-900/50 dark:hover:bg-rose-900/70 dark:border-rose-500/80 dark:text-rose-100 shadow-xs font-bold',
    dotColor: 'bg-rose-500 shadow-xs shadow-rose-500/50',
    badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-900/60 dark:text-rose-100 dark:border-rose-600 font-bold'
  },
  alkaline_earth: {
    id: 'alkaline_earth',
    labelEn: 'Group II Alkaline Earth Metals',
    labelMn: '2-р бүлэг Шүлтлэг газрын металл',
    shortLabelEn: 'Alkaline Earth',
    shortLabelMn: 'Шүлтлэг газар',
    descriptionEn: 'Reactive divalent metals with 2 valence electrons. Form basic M²⁺ cations and metal oxides.',
    descriptionMn: '2 валентын электронтой идэвхтэй хоёр валенттай металлууд. Суурилаг M²⁺ катион ба металлын исэл үүсгэнэ.',
    examHighlightEn: 'Magnesium burns with an intense brilliant white light to yield MgO. Calcium reacts steadily with water to form cloudy limewater (Ca(OH)2).',
    examHighlightMn: 'Магни хурц цагаан дөлөөр шатаж MgO үүсгэнэ. Кальци устай тогтуун урвалд орж шохойн ус (Ca(OH)2) үүсгэнэ.',
    cellBg: 'bg-amber-100/95 hover:bg-amber-200 border-amber-300 text-amber-950 dark:bg-amber-900/50 dark:hover:bg-amber-900/70 dark:border-amber-500/80 dark:text-amber-100 shadow-xs font-bold',
    dotColor: 'bg-amber-500 shadow-xs shadow-amber-500/50',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900/60 dark:text-amber-100 dark:border-amber-600 font-bold'
  },
  transition: {
    id: 'transition',
    labelEn: 'Transition Metals (d-block)',
    labelMn: 'Шилжилтийн металлууд (d-блок)',
    shortLabelEn: 'Transition Metals',
    shortLabelMn: 'Шилжилтийн металл',
    descriptionEn: 'Dense, hard metals with high melting points and variable oxidation states. Form characteristic coloured ions and act as industrial catalysts.',
    descriptionMn: 'Өндөр нягт, хайлах цэгтэй, хувьсах исэлдэхүйн хэмтэй хатуу металлууд. Өвөрмөц өнгөт ион үүсгэдэг ба үйлдвэрийн катализатор болдог.',
    examHighlightEn: 'Key catalysts in syllabus: Fe in Haber process (NH3), V2O5 in Contact process (H2SO4), Ni in margarine hydrogenation. Form colored compounds (e.g., Cu²⁺ is blue, Fe³⁺ is brown).',
    examHighlightMn: 'Гол катализаторууд: Габерын процесст төмөр (Fe), Хүхрийн хүчлийн холбооны процесст V2O5, Никель (Ni) устөрөгчжүүлэхэд. Cu²⁺ хөх, Fe³⁺ хүрэн өнгөтэй.',
    cellBg: 'bg-sky-100/95 hover:bg-sky-200 border-sky-300 text-sky-950 dark:bg-sky-900/50 dark:hover:bg-sky-900/70 dark:border-sky-500/80 dark:text-sky-100 shadow-xs font-bold',
    dotColor: 'bg-sky-500 shadow-xs shadow-sky-500/50',
    badgeClass: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-900/60 dark:text-sky-100 dark:border-sky-600 font-bold'
  },
  post_transition: {
    id: 'post_transition',
    labelEn: 'Post-transition Metals',
    labelMn: 'Шилжилтийн дараах металл',
    shortLabelEn: 'Post-transition',
    shortLabelMn: 'Шилжилтийн дараах',
    descriptionEn: 'Metals located between transition metals and metalloids. Softer with lower melting points and higher electronegativities than transition elements.',
    descriptionMn: 'Шилжилтийн металл ба металлоидуудын дунд орших металлууд. Шилжилтийн металлыг бодвол зөөлөн, хайлах температур харьцангуй бага.',
    examHighlightEn: 'Aluminium is protected by a tough, unreactive amphoteric oxide layer (Al2O3). Reacts with both acids and alkalis.',
    examHighlightMn: 'Хөнгөн цагаан нь гадаргуу дээрх исэлдлээс хамгаалах бат бөх Al2O3 давхаргаар хамгаалагдсан байдаг. Хүчил ба шүлттэй хоёулантай нь урвалд орно.',
    cellBg: 'bg-slate-200/95 hover:bg-slate-300 border-slate-300 text-slate-950 dark:bg-slate-800/70 dark:hover:bg-slate-700/80 dark:border-slate-600/80 dark:text-slate-100 shadow-xs font-bold',
    dotColor: 'bg-slate-500',
    badgeClass: 'bg-slate-200 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 font-bold'
  },
  metalloid: {
    id: 'metalloid',
    labelEn: 'Metalloids (Semimetals)',
    labelMn: 'Металлоид (Хагас металл)',
    shortLabelEn: 'Metalloids',
    shortLabelMn: 'Металлоид',
    descriptionEn: 'Elements with properties intermediate between metals and non-metals. Act as semiconductors crucial in microelectronics and solar tech.',
    descriptionMn: 'Металл ба металл бишийн завсрын шинжтэй элементүүд. Компьютерийн микрочип, хагас дамжуулагч технологийн гол суурь.',
    examHighlightEn: 'Silicon (Si) has a giant covalent macromolecular structure similar to diamond; very high melting point and hard.',
    examHighlightMn: 'Цахиур (Si) нь алмаазтай төстэй аварга ковалент бүтэцтэй тул маш өндөр хайлах цэгтэй, хатуу бүтэцтэй байдаг.',
    cellBg: 'bg-teal-100/95 hover:bg-teal-200 border-teal-300 text-teal-950 dark:bg-teal-900/50 dark:hover:bg-teal-900/70 dark:border-teal-500/80 dark:text-teal-100 shadow-xs font-bold',
    dotColor: 'bg-teal-500 shadow-xs shadow-teal-500/50',
    badgeClass: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-900/60 dark:text-teal-100 dark:border-teal-600 font-bold'
  },
  non_metal: {
    id: 'non_metal',
    labelEn: 'Reactive Non-metals',
    labelMn: 'Идэвхтэй металл бишүүд',
    shortLabelEn: 'Non-metals',
    shortLabelMn: 'Металл биш',
    descriptionEn: 'Essential biological elements (C, N, O, P, S, Se, H). Form covalent bonds with other non-metals and ionic bonds when accepting electrons from metals.',
    descriptionMn: 'Амьдралын суурь болсон чухал элементүүд. Металл бишүүдтэйгээ ковалент, металлтай ионы холбоо үүсгэдэг.',
    examHighlightEn: 'Carbon exists as allotropes: Diamond (giant tetrahedral, electrical insulator) and Graphite (hexagonal layers with delocalised electrons, conducts).',
    examHighlightMn: 'Нүүрстөрөгчийн аллотропи: Алмааз (тетраэдр аварга бүтэц, цахилгаан тусгаарлагч) ба Бал чулуу (делокалчлагдсан электронтой, цахилгаан дамжуулна).',
    cellBg: 'bg-emerald-100/95 hover:bg-emerald-200 border-emerald-300 text-emerald-950 dark:bg-emerald-900/50 dark:hover:bg-emerald-900/70 dark:border-emerald-500/80 dark:text-emerald-100 shadow-xs font-bold',
    dotColor: 'bg-emerald-500 shadow-xs shadow-emerald-500/50',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-900/60 dark:text-emerald-100 dark:border-emerald-600 font-bold'
  },
  halogen: {
    id: 'halogen',
    labelEn: 'Group VII Halogens',
    labelMn: '7-р бүлэг Галогенууд',
    shortLabelEn: 'Halogens',
    shortLabelMn: 'Галогенууд',
    descriptionEn: 'Group VII non-metals with 7 valence electrons. Exist as toxic diatomic molecules (F2, Cl2, Br2, I2) and form 1- halide anions.',
    descriptionMn: '7 валентын электронтой VII бүлгийн металл бишүүд. Хоёр атомт молекулууд (F2, Cl2, Br2, I2) байдлаар оршдог, 1- цэнэгтэй галид үүсгэнэ.',
    examHighlightEn: 'Reactivity DECREASES down group: F2 > Cl2 > Br2 > I2. State & color trend: Cl2 (pale green gas), Br2 (red-brown liquid), I2 (grey-black solid, purple vapour). More reactive halogen displaces less reactive halide.',
    examHighlightMn: 'Бүлгийн дагуу доошлоход идэвх БУУРНА: F2 > Cl2 > Br2 > I2. Өнгө, төлөв: Cl2 (цайвар ногоон хий), Br2 (хүрэн улаан шингэн), I2 (саарал-хар хатуу, нил ягаан уур). Илүү идэвхтэй нь уусмалаас сулыгаа түрдэг.',
    cellBg: 'bg-cyan-100/95 hover:bg-cyan-200 border-cyan-300 text-cyan-950 dark:bg-cyan-900/50 dark:hover:bg-cyan-900/70 dark:border-cyan-500/80 dark:text-cyan-100 shadow-xs font-bold',
    dotColor: 'bg-cyan-500 shadow-xs shadow-cyan-500/50',
    badgeClass: 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-900/60 dark:text-cyan-100 dark:border-cyan-600 font-bold'
  },
  noble_gas: {
    id: 'noble_gas',
    labelEn: 'Group VIII / 0 Noble Gases',
    labelMn: '8-р бүлэг Идэвхгүй хийнүүд',
    shortLabelEn: 'Noble Gases',
    shortLabelMn: 'Идэвхгүй хий',
    descriptionEn: 'Monatomic, non-flammable gases with completely filled stable outer electron shells (2 for Helium, 8 for Ne, Ar, Kr, Xe, Rn).',
    descriptionMn: 'Бүрэн дүүргэгдсэн тогтвортой гадаад электрон бүрхүүлтэй (He-д 2, бусдад 8), шатдаггүй, химийн маш идэвхгүй нэг атомт хийнүүд.',
    examHighlightEn: 'Extremely unreactive because they have full outer shells and do not need to gain, lose, or share electrons. Helium in balloons; Argon in filament light bulbs.',
    examHighlightMn: 'Гадаад бүрхүүл нь бүтэн тул электрон авах, өгөх шаардлагагүй маш идэвхгүй. Гели нь бөмбөлөгт; Аргон нь чийдэнгийн утас исэлдэхээс хамгаалахад хэрэглэгдэнэ.',
    cellBg: 'bg-purple-100/95 hover:bg-purple-200 border-purple-300 text-purple-950 dark:bg-purple-900/50 dark:hover:bg-purple-900/70 dark:border-purple-500/80 dark:text-purple-100 shadow-xs font-bold',
    dotColor: 'bg-purple-500 shadow-xs shadow-purple-500/50',
    badgeClass: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-900/60 dark:text-purple-100 dark:border-purple-600 font-bold'
  },
  lanthanoid: {
    id: 'lanthanoid',
    labelEn: 'Lanthanoids (Rare Earth Series)',
    labelMn: 'Лантаноидууд (Газрын ховор металл)',
    shortLabelEn: 'Lanthanoids',
    shortLabelMn: 'Лантаноид',
    descriptionEn: 'Period 6 f-block elements (Z = 57 to 71). Silvery metals with high magnetic and optical utility in modern green technologies.',
    descriptionMn: 'Үе 6-ын f-блок элементүүд (Z = 57-оос 71). Цахилгаан машин, соронз, ногоон технологид өргөн ашиглагддаг газрын ховор металлууд.',
    examHighlightEn: 'Crucial for high-strength permanent magnets (Neodymium magnets in wind turbines & EV motors) and catalyst systems.',
    examHighlightMn: 'Хүчит салхин сэнс ба цахилгаан автомашины байнгын хүчтэй соронз (Неодим) хийхэд зайлшгүй шаардлагатай.',
    cellBg: 'bg-indigo-100/95 hover:bg-indigo-200 border-indigo-300 text-indigo-950 dark:bg-indigo-900/50 dark:hover:bg-indigo-900/70 dark:border-indigo-500/80 dark:text-indigo-100 shadow-xs font-bold',
    dotColor: 'bg-indigo-500 shadow-xs shadow-indigo-500/50',
    badgeClass: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-900/60 dark:text-indigo-100 dark:border-indigo-600 font-bold'
  },
  actinoid: {
    id: 'actinoid',
    labelEn: 'Actinoids (Radioactive Series)',
    labelMn: 'Актиноидууд (Цацраг идэвхт цуврал)',
    shortLabelEn: 'Actinoids',
    shortLabelMn: 'Актиноид',
    descriptionEn: 'Period 7 f-block radioactive elements (Z = 89 to 103). All isotopes are radioactive, including naturally occurring Thorium and Uranium.',
    descriptionMn: 'Үе 7-ын f-блок цацраг идэвхт элементүүд (Z = 89-өөс 103). Бүх изотопууд нь цацраг идэвхтэй ба Уран, Тори багтана.',
    examHighlightEn: 'Uranium-235 undergoes nuclear fission to release immense thermal energy used in zero-carbon nuclear power generation.',
    examHighlightMn: 'Уран-235 нь цөмийн хуваагдалд орж асар их дулааны энерги ялгаруулдаг бөгөөд цөмийн цахилгаан станцын гол түлш болдог.',
    cellBg: 'bg-fuchsia-100/95 hover:bg-fuchsia-200 border-fuchsia-300 text-fuchsia-950 dark:bg-fuchsia-900/50 dark:hover:bg-fuchsia-900/70 dark:border-fuchsia-500/80 dark:text-fuchsia-100 shadow-xs font-bold',
    dotColor: 'bg-fuchsia-500 shadow-xs shadow-fuchsia-500/50',
    badgeClass: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300 dark:bg-fuchsia-900/60 dark:text-fuchsia-100 dark:border-fuchsia-600 font-bold'
  }
};

const CATEGORIES_LIST = Object.values(CATEGORY_DEFINITIONS);

type ListSort = 'z' | 'ar' | 'en' | 'radius';

// Outer electrons = the last shell, the same count the Valence view uses
const outerValence = (el: PeriodicElement) => el.electronConfig[el.electronConfig.length - 1] ?? 0;

// Elements the 0620 learning statements name, plus the noble gases (Group VIII) and manganese (in KMnO₄).
// Taken from src/data/syllabusObjectives*.ts; check it against the current syllabus before relying on it.
const IGCSE_FOCUS_SYMBOLS = new Set([
  'H', 'Li', 'C', 'N', 'O', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'K', 'Ca', 'Mn', 'V', 'Cr', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Br', 'Ag', 'I', 'Ba', 'Pt', 'Au', 'Pb'
]);
const isIgcseFocus = (el: PeriodicElement) => el.category === 'noble_gas' || IGCSE_FOCUS_SYMBOLS.has(el.symbol);

const SUPERSCRIPT: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻'
};
const toSuperscript = (s: string) => s.split('').map(c => SUPERSCRIPT[c] ?? c).join('');

// The ion an element usually forms, from its group. Transition metals vary, so the text says so.
const typicalIon = (el: PeriodicElement, mn: boolean): string => {
  if (el.category === 'noble_gas') return '—';
  if (el.group === 12) return `${el.symbol}${toSuperscript('2+')}`;
  if (el.category === 'transition') return mn ? 'хувьсах' : 'variable';
  if (el.group === 1) return `${el.symbol}${toSuperscript('+')}`;
  if (el.group === 2) return `${el.symbol}${toSuperscript('2+')}`;
  if (el.group === 13) return `${el.symbol}${toSuperscript('3+')}`;
  if (el.group === 16) return `${el.symbol}${toSuperscript('2-')}`;
  if (el.group === 17) return `${el.symbol}${toSuperscript('-')}`;
  return '—';
};

const matchesQuery = (el: PeriodicElement, query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    el.symbol.toLowerCase().includes(q) ||
    el.nameEn.toLowerCase().includes(q) ||
    el.nameMn.toLowerCase().includes(q) ||
    el.z.toString() === q
  );
};

// All 118 elements as a sortable table. Clicking a row selects the element for the inspector.
const ElementList: React.FC<{
  rows: PeriodicElement[];
  selectedZ: number;
  onSelect: (z: number) => void;
  sort: ListSort;
  onSort: (s: ListSort) => void;
  mn: boolean;
}> = ({ rows, selectedZ, onSelect, sort, onSort, mn }) => {
  const sorted = [...rows].sort((a, b) => {
    if (sort === 'ar') return (parseFloat(a.atomicMass) || 0) - (parseFloat(b.atomicMass) || 0) || a.z - b.z;
    if (sort === 'en') return (a.electronegativity ?? 0) - (b.electronegativity ?? 0) || a.z - b.z;
    if (sort === 'radius') return (a.atomicRadiusPm ?? 0) - (b.atomicRadiusPm ?? 0) || a.z - b.z;
    return a.z - b.z;
  });

  const sortButton = (key: ListSort, label: string) => (
    <button
      onClick={() => onSort(key)}
      className={`font-bold hover:underline ${sort === key ? 'text-emerald-700 dark:text-teal-300' : ''}`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
      <div className="overflow-auto max-h-[560px]">
        <table className="w-full text-xs min-w-[640px]">
          <thead className="sticky top-0 bg-slate-100 dark:bg-slate-900 text-left text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-2 py-2">{sortButton('z', 'Z')}</th>
              <th className="px-2 py-2">{mn ? 'Тэмдэг' : 'Symbol'}</th>
              <th className="px-2 py-2">{mn ? 'Нэр' : 'Name'}</th>
              <th className="px-2 py-2">{sortButton('ar', 'Ar')}</th>
              <th className="px-2 py-2">{mn ? 'Бүлэг' : 'Group'}</th>
              <th className="px-2 py-2">{mn ? 'Үе' : 'Period'}</th>
              <th className="px-2 py-2">{mn ? 'Төлөв' : 'State'}</th>
              <th className="px-2 py-2">{sortButton('en', mn ? 'Сөрөг чанар' : 'Electroneg.')}</th>
              <th className="px-2 py-2">{sortButton('radius', mn ? 'Радиус' : 'Radius')}</th>
              <th className="px-2 py-2">{mn ? 'Гадаад e⁻' : 'Outer e⁻'}</th>
              <th className="px-2 py-2">{mn ? 'Ион' : 'Ion'}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(el => (
              <tr
                key={el.z}
                onClick={() => onSelect(el.z)}
                className={`cursor-pointer border-t border-slate-200 dark:border-slate-800 ${
                  el.z === selectedZ ? 'bg-emerald-100 dark:bg-teal-900/40' : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <td className="px-2 py-1.5 font-mono">{el.z}</td>
                <td className="px-2 py-1.5 font-black">{el.symbol}</td>
                <td className="px-2 py-1.5">{mn ? el.nameMn : el.nameEn}</td>
                <td className="px-2 py-1.5 font-mono">{el.atomicMass}</td>
                <td className="px-2 py-1.5 font-mono">{el.groupRoman}</td>
                <td className="px-2 py-1.5 font-mono">{el.period}</td>
                <td className="px-2 py-1.5 capitalize">{el.stateAtRTP}</td>
                <td className="px-2 py-1.5 font-mono">{el.electronegativity ?? '—'}</td>
                <td className="px-2 py-1.5 font-mono">{el.atomicRadiusPm ? `${el.atomicRadiusPm} pm` : '—'}</td>
                <td className="px-2 py-1.5 font-mono">{outerValence(el)}</td>
                <td className="px-2 py-1.5 font-mono">{typicalIon(el, mn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sorted.length === 0 && (
        <p className="p-4 text-center text-xs text-slate-500">{mn ? 'Тохирох элемент алга.' : 'No matching elements.'}</p>
      )}
    </div>
  );
};

// 3D atom: drag to turn it. Each shell is a ring in its own tilted plane, and the electrons keep orbiting.
const Atom3D: React.FC<{ z: number; symbol: string; shells: number[]; mn: boolean }> = ({ z, symbol, shells, mn }) => {
  const stage = useRef<HTMLDivElement>(null);
  // Turn in degrees. Dragging sets x and y; the spin keeps going while nobody drags.
  const turn = useRef({ x: -20, y: 25, spin: 0 });
  const drag = useRef<{ px: number; py: number; x0: number; y0: number } | null>(null);

  const paint = () => {
    if (stage.current) {
      const { x, y, spin } = turn.current;
      stage.current.style.transform = `rotateX(${x}deg) rotateY(${y + spin}deg)`;
    }
  };

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      if (!drag.current) turn.current.spin = (turn.current.spin + 0.3) % 360;
      paint();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, x0: turn.current.x, y0: turn.current.y };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    turn.current.y = d.y0 + (e.clientX - d.px) * 0.5;
    turn.current.x = Math.max(-80, Math.min(80, d.x0 - (e.clientY - d.py) * 0.5));
    paint();
  };
  const onPointerUp = () => {
    drag.current = null;
  };
  const resetView = () => {
    turn.current.x = -20;
    turn.current.y = 25;
    paint();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-[290px] h-[290px] max-w-full select-none touch-none cursor-grab active:cursor-grabbing"
        style={{ perspective: 800 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={stage} className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {/* Nucleus */}
          <div
            className="absolute left-1/2 top-1/2 w-16 h-16 -ml-8 -mt-8 rounded-full flex flex-col items-center justify-center text-white font-black"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #d1fae5, #10b981 45%, #065f46)',
              boxShadow: '0 0 28px rgba(16,185,129,0.55)',
              transform: 'translateZ(20px)'
            }}
          >
            <span className="text-base leading-none">{symbol}</span>
            <span className="text-[9px] font-mono leading-none mt-0.5">+{z}</span>
          </div>

          {/* Shells: each ring is tilted into its own plane */}
          {shells.map((count, i) => {
            const diameter = 80 + i * 32;
            const tiltX = i % 2 === 0 ? 72 : 22;
            const tiltY = i * 45;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 rounded-full border border-sky-400/60 dark:border-cyan-300/50"
                style={{
                  width: diameter,
                  height: diameter,
                  marginLeft: -diameter / 2,
                  marginTop: -diameter / 2,
                  transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="atom-orbit absolute inset-0"
                  style={{ animationDuration: `${6 + i * 2.5}s`, transformStyle: 'preserve-3d' }}
                >
                  {Array.from({ length: count }).map((_, e) => (
                    <div key={e} className="absolute inset-0" style={{ transform: `rotateZ(${(e * 360) / count}deg)` }}>
                      <span
                        className="absolute w-3 h-3 rounded-full bg-sky-400 dark:bg-cyan-300"
                        style={{ left: 'calc(100% - 6px)', top: 'calc(50% - 6px)', boxShadow: '0 0 8px rgba(56,189,248,0.9)' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
        <span>{mn ? 'Чирж эргүүлээрэй' : 'Drag to turn it'}</span>
        <button onClick={resetView} className="underline hover:text-slate-800 dark:hover:text-white">
          {mn ? 'Анхны байдал' : 'Reset view'}
        </button>
      </div>
    </div>
  );
};

// One fact in the element header: a small label above the value
const Fact: React.FC<{ label: string; value: string; mono?: boolean; wide?: boolean }> = ({ label, value, mono, wide }) => (
  <div className={wide ? 'col-span-2' : ''}>
    <dt className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</dt>
    <dd className={`mt-0.5 font-bold text-slate-900 dark:text-slate-100 ${mono ? 'font-mono text-[11px] break-words' : 'text-sm'}`}>
      {value}
    </dd>
  </div>
);

export const PeriodicTableExplorer: React.FC = () => {
  const { mode } = useLanguage();
  const [activeMainTab, setActiveMainTab] = useState<'table' | 'trends'>('table');
  const [selectedZ, setSelectedZ] = useState<number>(17); // Chlorine default
  const [hoveredZ, setHoveredZ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'standard' | 'state' | 'electronegativity' | 'radius' | 'valence'>('standard');
  // Filters: outer electrons (1–8), and grid or list layout
  const [outerFilter, setOuterFilter] = useState<number | null>(null);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  // Clicking the active colour mode again goes back to the standard colouring
  const pickViewMode = (next: 'state' | 'electronegativity' | 'radius' | 'valence') =>
    setViewMode(current => (current === next ? 'standard' : next));
  // Which syllabus the notes follow: IGCSE 0620 (shells) or AS & A Level 9701 (subshells)
  const [programme, setProgramme] = useState<'igcse' | 'alevel'>('igcse');
  const [listSort, setListSort] = useState<ListSort>('z');
  // The popup with the selected element's atom and all its information
  const [atomOpen, setAtomOpen] = useState<boolean>(false);

  // Escape closes the popup
  useEffect(() => {
    if (!atomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAtomOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [atomOpen]);

  const tableScrollRef = useRef<HTMLDivElement>(null);
  const inspectorRef = useRef<HTMLDivElement>(null);

  // Scroll Indicators
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const selectedElement =
    CAMBRIDGE_PERIODIC_TABLE.find(e => e.z === selectedZ) || CAMBRIDGE_PERIODIC_TABLE[16];

  const hoveredElement = hoveredZ
    ? CAMBRIDGE_PERIODIC_TABLE.find(e => e.z === hoveredZ) || null
    : null;

  // Track horizontal scroll state for visual fade cues
  const handleScroll = () => {
    if (tableScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableScrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  // Quick jumps across the 18 columns
  const handleQuickJump = (colNumber: number) => {
    if (tableScrollRef.current) {
      // Calculate approximate position based on cell size
      const cellWidth = 46;
      const targetX = Math.max(0, (colNumber - 2) * cellWidth);
      tableScrollRef.current.scrollTo({ left: targetX, behavior: 'smooth' });
    }
  };

  // Find neighbors (above, below, left, right)
  const neighbors = useMemo(() => {
    const current = selectedElement;
    let above: PeriodicElement | null = null;
    let below: PeriodicElement | null = null;
    let left: PeriodicElement | null = null;
    let right: PeriodicElement | null = null;

    if (current.category !== 'lanthanoid' && current.category !== 'actinoid') {
      // In same group
      above = CAMBRIDGE_PERIODIC_TABLE.find(
        e => e.group === current.group && e.period === current.period - 1 && e.category !== 'lanthanoid' && e.category !== 'actinoid'
      ) || null;
      below = CAMBRIDGE_PERIODIC_TABLE.find(
        e => e.group === current.group && e.period === current.period + 1 && e.category !== 'lanthanoid' && e.category !== 'actinoid'
      ) || null;
    }

    // In same period
    left = CAMBRIDGE_PERIODIC_TABLE.find(
      e => e.period === current.period && e.group === current.group - 1
    ) || null;
    right = CAMBRIDGE_PERIODIC_TABLE.find(
      e => e.period === current.period && e.group === current.group + 1
    ) || null;

    return { above, below, left, right };
  }, [selectedElement]);

  // Cambridge Grid Positioning (19 columns: Col 1 is sticky Period label, Cols 2-19 are Groups 1-18)
  const getGridPosition = (el: PeriodicElement) => {
    // Lanthanoids (57 to 71) sit in row 9, cols 4 to 18
    if (el.category === 'lanthanoid') {
      const col = el.z - 57 + 4;
      return { gridRow: 9, gridColumn: col };
    }
    // Actinoids (89 to 103) sit in row 10, cols 4 to 18
    if (el.category === 'actinoid') {
      const col = el.z - 89 + 4;
      return { gridRow: 10, gridColumn: col };
    }

    // Hydrogen & Helium
    if (el.z === 1) return { gridRow: 2, gridColumn: 2 };
    if (el.z === 2) return { gridRow: 2, gridColumn: 19 };

    // Standard elements: gridColumn is el.group + 1
    const row = el.period + 1;
    const col = el.group + 1;
    return { gridRow: row, gridColumn: col };
  };

  // Filters that hide elements: category, outer electrons, and on the IGCSE programme the 0620 focus
  const passesFilters = (el: PeriodicElement) => {
    const categoryOk = activeCategory === 'all' || el.category === activeCategory;
    const outerOk = outerFilter === null || outerValence(el) === outerFilter;
    const focusOk = programme === 'alevel' || isIgcseFocus(el);
    return categoryOk && outerOk && focusOk;
  };

  // Saturated, distinct background colors and states
  const getElementBg = (el: PeriodicElement) => {
    const isSelected = el.z === selectedZ;
    const isHovered = el.z === hoveredZ;
    const isSearched =
      Boolean(searchQuery) &&
      (el.symbol.toLowerCase() === searchQuery.toLowerCase() ||
        el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.nameMn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.z.toString() === searchQuery);

    const isCategoryHoverMatch =
      !hoveredCategory || el.category === hoveredCategory;

    let baseBg = '';

    if (viewMode === 'standard') {
      const meta = CATEGORY_DEFINITIONS[el.category];
      baseBg = meta ? meta.cellBg : 'bg-slate-200 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-100';
    } else if (viewMode === 'state') {
      if (el.stateAtRTP === 'gas') {
        baseBg = 'bg-cyan-200/90 text-cyan-950 border-cyan-400 hover:bg-cyan-300 dark:bg-cyan-900/60 dark:text-cyan-100 dark:border-cyan-600 font-bold';
      } else if (el.stateAtRTP === 'liquid') {
        baseBg = 'bg-indigo-200 text-indigo-950 border-indigo-500 ring-2 ring-indigo-500/80 font-black hover:bg-indigo-300 dark:bg-indigo-900/70 dark:text-indigo-100 dark:border-indigo-500';
      } else {
        baseBg = 'bg-slate-200/90 text-slate-900 border-slate-400 hover:bg-slate-300 dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-600 font-bold';
      }
    } else if (viewMode === 'electronegativity') {
      const en = el.electronegativity || 0;
      if (en >= 3.0) {
        baseBg = 'bg-rose-200 text-rose-950 border-rose-500 font-black hover:bg-rose-300 dark:bg-rose-900/70 dark:text-rose-100 dark:border-rose-500 shadow-xs';
      } else if (en >= 2.1) {
        baseBg = 'bg-amber-200 text-amber-950 border-amber-500 font-bold hover:bg-amber-300 dark:bg-amber-900/70 dark:text-amber-100 dark:border-amber-500';
      } else if (en >= 1.4) {
        baseBg = 'bg-teal-200 text-teal-950 border-teal-500 hover:bg-teal-300 dark:bg-teal-900/70 dark:text-teal-100 dark:border-teal-500';
      } else if (en > 0) {
        baseBg = 'bg-emerald-200 text-emerald-950 border-emerald-400 hover:bg-emerald-300 dark:bg-emerald-900/60 dark:text-emerald-100 dark:border-emerald-600';
      } else {
        baseBg = 'bg-slate-100 text-slate-400 border-slate-300 dark:bg-slate-800/40 dark:text-slate-500 dark:border-slate-800';
      }
    } else if (viewMode === 'radius') {
      const r = el.atomicRadiusPm || 0;
      if (r >= 200) {
        baseBg = 'bg-purple-200 text-purple-950 border-purple-500 font-black hover:bg-purple-300 dark:bg-purple-900/70 dark:text-purple-100 dark:border-purple-500 shadow-xs';
      } else if (r >= 140) {
        baseBg = 'bg-sky-200 text-sky-950 border-sky-500 font-bold hover:bg-sky-300 dark:bg-sky-900/70 dark:text-sky-100 dark:border-sky-500';
      } else if (r > 0) {
        baseBg = 'bg-teal-200 text-teal-950 border-teal-400 hover:bg-teal-300 dark:bg-teal-900/60 dark:text-teal-100 dark:border-teal-600';
      } else {
        baseBg = 'bg-slate-100 text-slate-400 border-slate-300 dark:bg-slate-800/40 dark:text-slate-500 dark:border-slate-800';
      }
    } else if (viewMode === 'valence') {
      const valenceCount = el.electronConfig[el.electronConfig.length - 1] || 0;
      if (valenceCount === 1) baseBg = 'bg-rose-200 text-rose-950 border-rose-400 dark:bg-rose-900/70 dark:text-rose-100 dark:border-rose-500 font-bold';
      else if (valenceCount === 2) baseBg = 'bg-amber-200 text-amber-950 border-amber-400 dark:bg-amber-900/70 dark:text-amber-100 dark:border-amber-500 font-bold';
      else if (valenceCount === 7) baseBg = 'bg-cyan-200 text-cyan-950 border-cyan-400 dark:bg-cyan-900/70 dark:text-cyan-100 dark:border-cyan-500 font-bold';
      else if (valenceCount === 8) baseBg = 'bg-purple-200 text-purple-950 border-purple-400 dark:bg-purple-900/70 dark:text-purple-100 dark:border-purple-500 font-bold';
      else baseBg = 'bg-sky-200 text-sky-950 border-sky-400 dark:bg-sky-900/60 dark:text-sky-100 dark:border-sky-600';
    }

    // Active selection ring
    if (isSelected) {
      baseBg += ' ring-2 ring-emerald-600 dark:ring-teal-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 shadow-lg scale-105 z-30 font-black';
    } else if (isHovered) {
      baseBg += ' ring-2 ring-slate-400 dark:ring-slate-500 scale-102 z-20 shadow-md';
    }

    // Search match highlight
    if (isSearched) {
      baseBg += ' ring-2 ring-amber-500 dark:ring-amber-400 shadow-md animate-pulse z-20';
    }

    // Dim non-matching category
    if (!passesFilters(el) || !isCategoryHoverMatch) {
      baseBg += ' opacity-25 dark:opacity-20 grayscale-[25%] transition-all hover:opacity-90';
    }

    return baseBg;
  };

  // Scroll to inspector on mobile
  const scrollToInspector = () => {
    setAtomOpen(true);
  };

  const selectedCategoryMeta = CATEGORY_DEFINITIONS[selectedElement.category];

  // Isotopes and the weighted mean they give (IGCSE 2.3: relative atomic mass from isotope abundances)
  const isotopes = ISOTOPE_ABUNDANCES[selectedElement.z];
  const isotopeMean = isotopes
    ? isotopes.reduce((sum, i) => sum + i.mass * i.percent, 0) / 100
    : 0;

  const highlightCount = CAMBRIDGE_PERIODIC_TABLE.filter(passesFilters).length;

  const listRows = useMemo(
    () => CAMBRIDGE_PERIODIC_TABLE.filter(el => passesFilters(el) && matchesQuery(el, searchQuery)),
    [activeCategory, outerFilter, programme, searchQuery]
  );

  const resetFilters = () => {
    setActiveCategory('all');
    setOuterFilter(null);
    setSearchQuery('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-7 space-y-6 shadow-sm transition-colors">
      {/* Top Main Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <button
          onClick={() => setActiveMainTab('table')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-black text-sm transition-all ${
            activeMainTab === 'table'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
          <span>{mode === 'mn' ? 'Кэмбрижийн Үелэх Хүснэгт (1–118 элемент)' : 'Cambridge Periodic Table (1–118)'}</span>
        </button>

        <button
          onClick={() => setActiveMainTab('trends')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-black text-sm transition-all ${
            activeMainTab === 'trends'
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-500/25 ring-2 ring-teal-400/60'
              : 'bg-emerald-500/10 text-emerald-800 dark:text-teal-300 hover:bg-emerald-500/20 border border-emerald-500/20'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-teal-300" />
          <span>{mode === 'mn' ? 'Үе, бүлгийн зүй тогтол (Бүдүүвч зураг, График & Симуляци)' : 'Periodic Trends (Diagrams, Graphs & Sims)'}</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-mono uppercase tracking-wider animate-pulse ml-1">
            New
          </span>
        </button>
      </div>

      {/* Render Trends Lab when activeMainTab === 'trends' */}
      {activeMainTab === 'trends' ? (
        <PeriodicTrendsLab />
      ) : (
        <>
          {/* Quick Trends Banner on Table View */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-cyan-500/15 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {mode === 'mn'
                    ? 'Үе, бүлгийн дагуух зүй тогтлын интерактив лаборатори'
                    : 'Periodic Trends Interactive Laboratory & Graph Studio'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {mode === 'mn'
                    ? 'Зураг, бүдүүвч вектор графикууд, 1-р бүлгийн устай урвалдах хөдөлгөөнт анимаци (GIF), 7-р бүлгийн төлөв ба халах урвал, атомын агшилтын симуляци.'
                    : 'Interactive 2D schematic diagrams, SVG trend curves, Group I water reaction GIF sim, and atomic radius contraction.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveMainTab('trends')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black shadow-md hover:scale-105 transition-all shrink-0 flex items-center gap-1.5"
            >
              <span>{mode === 'mn' ? 'Зүй тогтол руу шилжих' : 'Explore Trends'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Top Banner & Title Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-teal-300 font-mono text-[11px] font-bold tracking-wider uppercase border border-emerald-200 dark:border-emerald-800">
                  Cambridge IGCSE 0620 Page 49
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Complete Periodic Table (1–118)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-teal-400" />
                <span>
                  {mode === 'mn'
                    ? 'Кэмбрижийн Үелэх Систем (Бүрэн 118 элемент)'
                    : 'Cambridge Interactive Periodic Table of Elements'}
                </span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                {mode === 'mn'
                  ? 'Элементүүдийн бүлэг тус бүр тод, эрч хүчтэй өнгөөр ялгагдан, харанхуй ба гэрэлт горимд өндөр тодролтой харагдахаар сайжруулав. 1 моль хий r.t.p нөхцөлд 24 дм³ эзлэхүүнтэй.'
                  : 'Interactive color-coded categories with vibrant, saturated hues optimized for both light and dark themes. 1 mole of any gas occupies 24 dm³ at r.t.p.'}
              </p>
            </div>

        {/* Search & Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={mode === 'mn' ? 'Хайх: Cl, 17, Iron, Хлор...' : 'Search: Cl, 17, Iron, chlorine...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 pl-8 pr-7 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs overflow-x-auto">
            <button
              onClick={() => pickViewMode('state')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                viewMode === 'state'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {mode === 'mn' ? 'Төлөв' : 'State'}
            </button>
            <button
              onClick={() => pickViewMode('electronegativity')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                viewMode === 'electronegativity'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {mode === 'mn' ? 'Цахилгаан сөрөг' : 'Electronegativity'}
            </button>
            <button
              onClick={() => pickViewMode('radius')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                viewMode === 'radius'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {mode === 'mn' ? 'Атомын радиус' : 'Radius'}
            </button>
            <button
              onClick={() => pickViewMode('valence')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                viewMode === 'valence'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {mode === 'mn' ? 'Валент' : 'Valence'}
            </button>
          </div>

          {/* Programme: the syllabus the notes follow */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs">
            {(['igcse', 'alevel'] as const).map(p => (
              <button
                key={p}
                onClick={() => setProgramme(p)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  programme === p
                    ? 'bg-violet-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {p === 'igcse' ? 'IGCSE 0620' : 'AS & A Level 9701'}
              </button>
            ))}
          </div>

          {/* Grid or list layout */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setLayout('grid')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                layout === 'grid' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{mode === 'mn' ? 'Хүснэгт' : 'Table'}</span>
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                layout === 'list' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{mode === 'mn' ? 'Жагсаалт' : 'List'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Filter with Color Legend Dots */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1 font-bold">
            <Filter className="w-3 h-3 text-emerald-600 dark:text-teal-400" />
            {mode === 'mn' ? 'Ангиллаар шүүх (10 үндсэн бүлэг):' : 'Filter by Color-Coded Category:'}
          </span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-emerald-700 dark:text-teal-400 hover:underline font-bold flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              {mode === 'mn' ? 'Бүх элементийг харах' : 'Reset filter'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap border transition-all text-xs flex items-center gap-1.5 shadow-xs ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white border-slate-900 dark:border-emerald-600 font-bold'
                : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <span>{mode === 'mn' ? 'Бүгд (1–118)' : 'All Elements (1–118)'}</span>
          </button>

          {CATEGORIES_LIST.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? 'all' : cat.id)}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap border transition-all text-xs flex items-center gap-1.5 shadow-xs ${
                  isActive
                    ? `${cat.badgeClass} ring-2 ring-emerald-500 font-bold shadow-sm`
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${cat.dotColor} shrink-0`} />
                <span>{mode === 'mn' ? cat.shortLabelMn : cat.shortLabelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Outer electrons, the count of shown elements, and reset */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-mono font-bold text-slate-500 dark:text-slate-400 mr-1">
          {mode === 'mn' ? 'Гадаад электрон:' : 'Outer electrons:'}
        </span>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
          <button
            key={n}
            onClick={() => setOuterFilter(outerFilter === n ? null : n)}
            className={`w-8 h-8 rounded-lg border font-mono font-bold transition-colors ${
              outerFilter === n
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
            }`}
          >
            {n}
          </button>
        ))}

        <span className="font-mono text-slate-500 dark:text-slate-400 sm:ml-auto">
          {highlightCount} / 118 {mode === 'mn' ? 'харагдаж байна' : 'shown'}
        </span>

        {(activeCategory !== 'all' || outerFilter !== null || searchQuery) && (
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mode === 'mn' ? 'Шүүлтүүр цэвэрлэх' : 'Reset filters'}
          </button>
        )}
      </div>

      {/* Main Grid: Left Periodic Table Canvas, Right Inspector Deck */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Periodic Table Canvas (8 cols on XL) */}
        <div className="xl:col-span-12 space-y-3">
          {/* Official Cambridge Key Box & RTP Note */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-16 h-18 border-2 border-emerald-600 dark:border-teal-400 rounded-xl p-1 text-center bg-emerald-50 dark:bg-teal-950/50 flex flex-col justify-between shadow-xs">
                <span className="text-[10px] font-mono text-slate-500 font-bold">17</span>
                <span className="text-xl font-black text-emerald-800 dark:text-teal-300">Cl</span>
                <span className="text-[9px] text-slate-600 dark:text-slate-300 truncate">chlorine</span>
                <span className="text-[10px] font-mono font-black text-slate-900 dark:text-slate-100">35.5</span>
              </div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 space-y-0.5">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-teal-400" />
                  <span>{mode === 'mn' ? 'Кэмбрижийн хүснэгтийн түлхүүр:' : 'Cambridge Official Key:'}</span>
                </div>
                <div>Дээр: Атомын (протон) дугаар (Z)</div>
                <div>Дунд: Химийн тэмдэг & Нэр</div>
                <div>Доор: Харьцангуй атомын масс (Ar)</div>
              </div>
            </div>

            {/* Quick jump buttons for easy responsive navigation */}
            <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono font-semibold">
              <span className="text-slate-400 mr-1">{mode === 'mn' ? 'Шуурхай үсрэх:' : 'Quick Jump:'}</span>
              <button
                onClick={() => handleQuickJump(2)}
                className="px-2 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 hover:bg-rose-200 border border-rose-300 dark:border-rose-800"
              >
                Grp I
              </button>
              <button
                onClick={() => handleQuickJump(3)}
                className="px-2 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 hover:bg-amber-200 border border-amber-300 dark:border-amber-800"
              >
                Grp II
              </button>
              <button
                onClick={() => handleQuickJump(4)}
                className="px-2 py-1 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-200 hover:bg-sky-200 border border-sky-300 dark:border-sky-800"
              >
                Transition
              </button>
              <button
                onClick={() => handleQuickJump(18)}
                className="px-2 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 border border-cyan-300 dark:border-cyan-800"
              >
                Grp VII
              </button>
              <button
                onClick={() => handleQuickJump(19)}
                className="px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 hover:bg-purple-200 border border-purple-300 dark:border-purple-800"
              >
                Grp VIII
              </button>
            </div>
          </div>

          {layout === 'list' ? (
            <ElementList
              rows={listRows}
              selectedZ={selectedZ}
              onSelect={(z: number) => {
                setSelectedZ(z);
                setAtomOpen(true);
              }}
              sort={listSort}
              onSort={setListSort}
              mn={mode === 'mn'}
            />
          ) : (
          /* Interactive Table Container with Horizontal Scroll & Visual Cue */
          <div className="relative group">
            {/* Scroll cues for mobile */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-200/80 dark:from-slate-950/80 to-transparent pointer-events-none z-20 flex items-center">
                <ChevronLeft className="w-5 h-5 text-slate-500 animate-pulse" />
              </div>
            )}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-200/80 dark:from-slate-950/80 to-transparent pointer-events-none z-20 flex items-center justify-end">
                <ChevronRight className="w-5 h-5 text-slate-500 animate-pulse" />
              </div>
            )}

            <div
              ref={tableScrollRef}
              onScroll={handleScroll}
              className="bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 overflow-x-auto shadow-inner select-none"
            >
              {/* 19-Column CSS Grid (Col 1 is Period Label, Cols 2-19 are Groups 1-18) */}
              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: '32px repeat(18, minmax(44px, 1fr))',
                  gridTemplateRows: 'auto repeat(9, auto)'
                }}
              >
                {/* Header Row: Period Corner Label & Group Numbers (I to VIII) */}
                <div
                  style={{ gridRow: 1, gridColumn: 1 }}
                  className="text-center text-[10px] font-mono font-bold text-slate-400 flex items-center justify-center"
                >
                  P\G
                </div>
                <div style={{ gridRow: 1, gridColumn: 2 }} className="text-center font-mono font-black text-rose-600 dark:text-rose-400 text-xs">
                  I
                  <span className="block text-[8px] font-normal text-slate-400">1</span>
                </div>
                <div style={{ gridRow: 1, gridColumn: 3 }} className="text-center font-mono font-black text-amber-600 dark:text-amber-400 text-xs">
                  II
                  <span className="block text-[8px] font-normal text-slate-400">2</span>
                </div>
                <div
                  style={{ gridRow: 1, gridColumn: '4 / span 10' }}
                  className="text-center font-mono font-bold text-sky-600 dark:text-sky-400 text-[10px] border-b border-sky-300 dark:border-sky-800 pb-0.5"
                >
                  Transition Elements (3–12)
                </div>
                <div style={{ gridRow: 1, gridColumn: 14 }} className="text-center font-mono font-black text-slate-600 dark:text-slate-400 text-xs">
                  III
                  <span className="block text-[8px] font-normal text-slate-400">13</span>
                </div>
                <div style={{ gridRow: 1, gridColumn: 15 }} className="text-center font-mono font-black text-slate-600 dark:text-slate-400 text-xs">
                  IV
                  <span className="block text-[8px] font-normal text-slate-400">14</span>
                </div>
                <div style={{ gridRow: 1, gridColumn: 16 }} className="text-center font-mono font-black text-emerald-600 dark:text-emerald-400 text-xs">
                  V
                  <span className="block text-[8px] font-normal text-slate-400">15</span>
                </div>
                <div style={{ gridRow: 1, gridColumn: 17 }} className="text-center font-mono font-black text-emerald-600 dark:text-emerald-400 text-xs">
                  VI
                  <span className="block text-[8px] font-normal text-slate-400">16</span>
                </div>
                <div style={{ gridRow: 1, gridColumn: 18 }} className="text-center font-mono font-black text-cyan-600 dark:text-cyan-400 text-xs">
                  VII
                  <span className="block text-[8px] font-normal text-slate-400">17</span>
                </div>
                <div style={{ gridRow: 1, gridColumn: 19 }} className="text-center font-mono font-black text-purple-600 dark:text-purple-400 text-xs">
                  VIII
                  <span className="block text-[8px] font-normal text-slate-400">18</span>
                </div>

                {/* Period 1 to 7 Indicators in Column 1 */}
                {[1, 2, 3, 4, 5, 6, 7].map(periodNum => (
                  <div
                    key={`period-${periodNum}`}
                    style={{ gridRow: periodNum + 1, gridColumn: 1 }}
                    className="flex items-center justify-center font-mono font-black text-xs text-slate-400 dark:text-slate-500 rounded-md bg-slate-100/50 dark:bg-slate-900/40 my-0.5"
                    title={`Period ${periodNum}`}
                  >
                    {periodNum}
                  </div>
                ))}

                {/* All 118 Elements */}
                {CAMBRIDGE_PERIODIC_TABLE.map(el => {
                  const gridPos = getGridPosition(el);
                  const isSelected = el.z === selectedZ;

                  return (
                    <button
                      key={el.z}
                      onClick={() => {
                        setSelectedZ(el.z);
                        setAtomOpen(true);
                      }}
                      onMouseEnter={() => setHoveredZ(el.z)}
                      onMouseLeave={() => setHoveredZ(null)}
                      style={gridPos}
                      className={`p-1 rounded-xl border text-center transition-all flex flex-col justify-between h-15 ${getElementBg(el)}`}
                    >
                      {/* Top Row: Z (atomic number) and auxiliary trend value */}
                      <div className="flex justify-between items-center w-full px-0.5">
                        <span className="text-[9px] font-mono font-black opacity-80">{el.z}</span>
                        <span className="text-[8px] font-mono font-bold opacity-75">
                          {viewMode === 'electronegativity' && el.electronegativity ? el.electronegativity : ''}
                          {viewMode === 'radius' && el.atomicRadiusPm ? `${el.atomicRadiusPm}` : ''}
                          {viewMode === 'valence' ? `${el.electronConfig[el.electronConfig.length - 1]}e⁻` : ''}
                          {viewMode === 'state' && (
                            <span>
                              {el.stateAtRTP === 'gas' ? '☁' : el.stateAtRTP === 'liquid' ? '💧' : ''}
                            </span>
                          )}
                        </span>
                      </div>

                      {/* Chemical Symbol */}
                      <div
                        className="font-black leading-none my-0.5 text-sm"
                      >
                        {el.symbol}
                      </div>

                      {/* Relative Atomic Mass Ar */}
                      <div className="text-[8px] font-mono font-extrabold opacity-95 truncate w-full">
                        {el.atomicMass}
                      </div>
                    </button>
                  );
                })}

                {/* Lanthanoids & Actinoids Placeholders in main table */}
                <div
                  style={{ gridRow: 7, gridColumn: 4 }}
                  className="p-1 rounded-xl border border-dashed border-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 text-center flex flex-col justify-center text-[9px] font-mono font-bold text-indigo-700 dark:text-indigo-300"
                >
                  <span>57–71</span>
                  <span className="text-[7px]">La–Lu *</span>
                </div>
                <div
                  style={{ gridRow: 8, gridColumn: 4 }}
                  className="p-1 rounded-xl border border-dashed border-fuchsia-400 bg-fuchsia-50/80 dark:bg-fuchsia-950/40 text-center flex flex-col justify-center text-[9px] font-mono font-bold text-fuchsia-700 dark:text-fuchsia-300"
                >
                  <span>89–103</span>
                  <span className="text-[7px]">Ac–Lr **</span>
                </div>

                {/* Row 9 & 10: Lanthanoids & Actinoids Bottom Series */}
                <div
                  style={{ gridRow: 9, gridColumn: '1 / span 3' }}
                  className="text-[10px] font-mono font-black text-indigo-700 dark:text-indigo-300 flex items-center justify-end pr-2"
                >
                  Lanthanoids *
                </div>
                <div
                  style={{ gridRow: 10, gridColumn: '1 / span 3' }}
                  className="text-[10px] font-mono font-black text-fuchsia-700 dark:text-fuchsia-300 flex items-center justify-end pr-2"
                >
                  Actinoids **
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Live Hover Status Strip */}
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono flex items-center justify-between text-slate-700 dark:text-slate-300">
            {hoveredElement ? (
              <div className="flex items-center gap-2 truncate">
                <span className="font-bold text-slate-900 dark:text-white">
                  Z = {hoveredElement.z} {hoveredElement.symbol} ({hoveredElement.nameEn} / {hoveredElement.nameMn}):
                </span>
                <span className="text-slate-500">Ar = {hoveredElement.atomicMass}</span>
                <span>·</span>
                <span className="text-emerald-600 dark:text-teal-400 font-bold">
                  {CATEGORY_DEFINITIONS[hoveredElement.category]?.shortLabelEn || hoveredElement.category}
                </span>
                <span>·</span>
                <span>Group {hoveredElement.groupRoman}, Period {hoveredElement.period}</span>
                <span>·</span>
                <span className="truncate">[{hoveredElement.electronConfig.join(', ')}]</span>
              </div>
            ) : (
              <div className="text-slate-500 truncate">
                {mode === 'mn'
                  ? 'Элемент дээр хулганаа аваачиж эсвэл товшиж шинж чанарыг дэлгэрэнгүй харна уу.'
                  : 'Hover over or tap any element to inspect electronic configuration & periodic trends.'}
              </div>
            )}

            {/* Mobile Scroll Down Prompt */}
            <button
              onClick={scrollToInspector}
              className="xl:hidden shrink-0 text-emerald-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>{mode === 'mn' ? 'Дэлгэрэнгүй' : 'Inspect'}</span>
              <ArrowDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* The element popup: the 3D atom and all the information, opened by selecting an element */}
        {atomOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ animation: 'atom-fade 0.2s ease-out' }}>
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setAtomOpen(false)} />
          <div
            ref={inspectorRef}
            role="dialog"
            aria-modal="true"
            className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto space-y-4 bg-white dark:bg-slate-950 rounded-t-3xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl"
            style={{ animation: 'atom-pop 0.35s ease-out' }}
          >
            <button
              onClick={() => setAtomOpen(false)}
              aria-label={mode === 'mn' ? 'Хаах' : 'Close'}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-5 shadow-sm">
            {/* Header: the 3D atom beside the key facts, laid out like a data sheet */}
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="sm:w-[320px] shrink-0 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3 flex items-center justify-center">
                <Atom3D
                  z={selectedElement.z}
                  symbol={selectedElement.symbol}
                  shells={selectedElement.electronConfig}
                  mn={mode === 'mn'}
                />
              </div>

              <div className="flex-1 min-w-0 space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center shadow-sm shrink-0 ${
                      selectedCategoryMeta ? selectedCategoryMeta.cellBg : 'bg-slate-100 border-slate-300'
                    }`}
                  >
                    <span className="text-[9px] font-mono font-bold leading-none">{selectedElement.z}</span>
                    <span className="text-xl font-black leading-none mt-0.5">{selectedElement.symbol}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      No. {selectedElement.z} · {mode === 'mn' ? selectedCategoryMeta?.shortLabelMn : selectedCategoryMeta?.shortLabelEn}
                    </div>
                    <h3 className="text-2xl font-black uppercase text-slate-900 dark:text-white leading-tight break-words">
                      {mode === 'mn' ? selectedElement.nameMn : selectedElement.nameEn}
                    </h3>
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-x-5 gap-y-3">
                  <Fact label={mode === 'mn' ? 'Атомын масс (Ar)' : 'Atomic mass (Ar)'} value={selectedElement.atomicMass} />
                  <Fact
                    label={mode === 'mn' ? 'Төлөв (r.t.p.)' : 'State (r.t.p.)'}
                    value={selectedElement.stateAtRTP.charAt(0).toUpperCase() + selectedElement.stateAtRTP.slice(1)}
                  />
                  <Fact
                    label={mode === 'mn' ? 'Бүлэг · үе' : 'Group · period'}
                    value={`${
                      selectedElement.category === 'lanthanoid' || selectedElement.category === 'actinoid'
                        ? 'f-block'
                        : selectedElement.group
                    } · ${selectedElement.period}`}
                  />
                  <Fact
                    label={mode === 'mn' ? 'Цахилгаан сөрөг чанар' : 'Electronegativity'}
                    value={selectedElement.electronegativity ? `${selectedElement.electronegativity} Pauling` : 'N/A'}
                  />
                  <Fact
                    label={mode === 'mn' ? 'Бүрхүүл (IGCSE)' : 'Electron shells'}
                    value={selectedElement.electronConfig.join(', ')}
                    mono
                  />
                  <Fact
                    label={mode === 'mn' ? 'Атомын радиус' : 'Atomic radius'}
                    value={selectedElement.atomicRadiusPm ? `${selectedElement.atomicRadiusPm} pm` : 'N/A'}
                  />
                  <Fact
                    label={mode === 'mn' ? 'Гадаад электрон' : 'Outer electrons'}
                    value={String(outerValence(selectedElement))}
                  />
                  <Fact
                    label={mode === 'mn' ? 'Ердийн ион' : 'Typical ion'}
                    value={typicalIon(selectedElement, mode === 'mn')}
                  />
                  {programme === 'alevel' && (
                    <Fact
                      wide
                      label={mode === 'mn' ? 'Дэд бүрхүүл (9701)' : 'Configuration (9701)'}
                      value={subshellNotation(selectedElement.z) ?? (mode === 'mn' ? 'Z > 36: шалгагдаагүй' : 'Z > 36: not checked yet')}
                      mono
                    />
                  )}
                </dl>

                {isotopes && (
                  <button
                    onClick={() =>
                      document.getElementById('isotope-block')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                    className="text-xs font-bold underline text-emerald-700 dark:text-teal-300 hover:text-emerald-900 dark:hover:text-white"
                  >
                    {mode === 'mn' ? 'Изотоп →' : 'Isotopes →'}
                  </button>
                )}
              </div>
            </div>

            {/* Category Description Banner */}
            {selectedCategoryMeta && (
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${selectedCategoryMeta.dotColor}`} />
                  <span>{mode === 'mn' ? selectedCategoryMeta.labelMn : selectedCategoryMeta.labelEn}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {mode === 'mn' ? selectedCategoryMeta.descriptionMn : selectedCategoryMeta.descriptionEn}
                </p>
              </div>
            )}

            {/* Periodic Trend Neighbors Comparison */}
            <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {mode === 'mn' ? 'Зэргэлдээ үе ба бүлгийн элементүүд:' : 'Adjacent Periodic Neighbors:'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {/* Above in Group */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px]">Above (↑):</span>
                  {neighbors.above ? (
                    <button
                      onClick={() => setSelectedZ(neighbors.above!.z)}
                      className="font-bold text-emerald-700 dark:text-teal-300 hover:underline flex items-center gap-1"
                    >
                      <span>{neighbors.above.symbol} ({neighbors.above.z})</span>
                    </button>
                  ) : (
                    <span className="text-slate-400 text-[10px]">None</span>
                  )}
                </div>

                {/* Below in Group */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px]">Below (↓):</span>
                  {neighbors.below ? (
                    <button
                      onClick={() => setSelectedZ(neighbors.below!.z)}
                      className="font-bold text-emerald-700 dark:text-teal-300 hover:underline flex items-center gap-1"
                    >
                      <span>{neighbors.below.symbol} ({neighbors.below.z})</span>
                    </button>
                  ) : (
                    <span className="text-slate-400 text-[10px]">None</span>
                  )}
                </div>

                {/* Left in Period */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px]">Left (←):</span>
                  {neighbors.left ? (
                    <button
                      onClick={() => setSelectedZ(neighbors.left!.z)}
                      className="font-bold text-emerald-700 dark:text-teal-300 hover:underline flex items-center gap-1"
                    >
                      <span>{neighbors.left.symbol} ({neighbors.left.z})</span>
                    </button>
                  ) : (
                    <span className="text-slate-400 text-[10px]">None</span>
                  )}
                </div>

                {/* Right in Period */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px]">Right (→):</span>
                  {neighbors.right ? (
                    <button
                      onClick={() => setSelectedZ(neighbors.right!.z)}
                      className="font-bold text-emerald-700 dark:text-teal-300 hover:underline flex items-center gap-1"
                    >
                      <span>{neighbors.right.symbol} ({neighbors.right.z})</span>
                    </button>
                  ) : (
                    <span className="text-slate-400 text-[10px]">None</span>
                  )}
                </div>
              </div>
            </div>

            {/* Isotopes and the working for Ar, when the element has isotope data */}
            {isotopes && (
              <div id="isotope-block" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {mode === 'mn' ? 'Байгалийн изотоп' : 'Isotopes in nature'}
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {mode === 'mn'
                    ? 'Изотоп бол протоны тоо ижил, нейтроны тоо өөр атом. Бүгд нэг протонтой.'
                    : 'Isotopes have the same number of protons but different numbers of neutrons.'}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full font-mono text-[11px] text-slate-800 dark:text-slate-200">
                    <thead className="text-left text-[10px] text-slate-500 dark:text-slate-400">
                      <tr>
                        <th className="py-1 pr-2 font-normal">{mode === 'mn' ? 'Изотоп' : 'Isotope'}</th>
                        <th className="py-1 pr-2 font-normal">p</th>
                        <th className="py-1 pr-2 font-normal">n</th>
                        <th className="py-1 font-normal text-right">{mode === 'mn' ? 'Хувь' : 'Share'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isotopes.map(i => (
                        <tr key={i.mass} className="border-t border-slate-200 dark:border-slate-800">
                          <td className="py-1 pr-2">{toSuperscript(String(i.mass))}{selectedElement.symbol}</td>
                          <td className="py-1 pr-2">{selectedElement.z}</td>
                          <td className="py-1 pr-2">{i.mass - selectedElement.z}</td>
                          <td className="py-1 text-right">{i.percent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    {mode === 'mn' ? 'Ar-г тооцох:' : 'Working out Ar:'}
                  </div>
                  <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                    ({isotopes.map(i => `${i.mass} × ${i.percent}`).join(' + ')}) ÷ 100 = {isotopeMean.toFixed(2)}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {mode === 'mn'
                      ? `Хүснэгтийн утга (${selectedElement.atomicMass}) бага зэрэг ялгаатай байж болно: изотоп бүрийн яг масс бүхэл тоо биш.`
                      : `The table value (${selectedElement.atomicMass}) can differ slightly: each isotope's exact mass is not a whole number.`}
                  </p>
                </div>
              </div>
            )}

            {/* Cambridge Syllabus Key Trend Fact */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-teal-950/40 border border-emerald-200 dark:border-teal-800 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-teal-300">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
                <span>{mode === 'mn' ? 'Кэмбрижийн шалгалтын онцлох баримт:' : 'Cambridge Exam Highlight:'}</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 text-xs leading-relaxed">
                <ChemText>{mode === 'mn' ? selectedElement.trendFactMn : selectedElement.trendFactEn}</ChemText>
              </p>
              {selectedCategoryMeta?.examHighlightEn && (
                <div className="pt-2 border-t border-emerald-200/60 dark:border-teal-800/60 text-[11px] text-emerald-950 dark:text-teal-200 leading-relaxed">
                  <span className="font-bold">{mode === 'mn' ? 'Бүлгийн зүй тогтол: ' : 'Group Pattern: '}</span>
                  <ChemText>
                    {mode === 'mn' ? selectedCategoryMeta.examHighlightMn : selectedCategoryMeta.examHighlightEn}
                  </ChemText>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
        )}
      </div>
    </>
  )}
</div>
  );
};
