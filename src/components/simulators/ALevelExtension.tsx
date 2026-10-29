import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

// The A Level-only content of the periodic table, from 9701 syllabus sections 27 (Group 2) and 28 (transition elements).
// It shows only on the A Level course; the AS course keeps the table and trends it always had.
interface Row {
  en: string[];
  mn: string[];
}

const GROUP2_HEAD = { en: ['Property', 'Down the group (Mg → Ba)', 'Why'], mn: ['Шинж чанар', 'Доош бүлэгт (Mg → Ba)', 'Учир'] };
const GROUP2_ROWS: Row[] = [
  { en: ['Reactivity with water and oxygen', 'Increases', 'The outer 2 electrons are lost more easily'], mn: ['Ус ба хүчилтөрөгчтэй урвалын идэвх', 'Нэмэгдэнэ', 'Гаднах 2 электроныг амар алдана'] },
  { en: ['Thermal stability of the carbonates', 'Increases', 'A small cation polarises the carbonate ion more and breaks it down more easily'], mn: ['Карбонатын дулааны тогтвортой байдал', 'Нэмэгдэнэ', 'Жижиг катион карбонатын ионыг их полярлаж, амар задална'] },
  { en: ['Solubility of the hydroxides', 'Increases (Mg(OH)₂ sparingly soluble, Ba(OH)₂ soluble)', 'The bigger ion is held less tightly in the lattice'], mn: ['Гидроксидын уусах чанар', 'Нэмэгдэнэ (Mg(OH)₂ бага, Ba(OH)₂ уусна)', 'Том ион торонд сул барьдаг'] },
  { en: ['Solubility of the sulfates', 'Decreases (MgSO₄ soluble, BaSO₄ insoluble)', 'The lattice energy falls less than the hydration energy as the ion gets bigger'], mn: ['Сульфатын уусах чанар', 'Буурна (MgSO₄ уусна, BaSO₄ уусахгүй)', 'Ионы хэмжээ өсөхөд торын энерги гидратацийн энергиэс илүү буурна'] }
];

const TRANSITION_HEAD = { en: ['Feature', 'Example', 'Why'], mn: ['Онцлог', 'Жишээ', 'Учир'] };
const TRANSITION_ROWS: Row[] = [
  { en: ['Variable oxidation states', 'Fe²⁺ and Fe³⁺; Mn²⁺ to Mn⁷⁺ (in KMnO₄)', 'Electrons from the 4s and 3d subshells can all take part in bonding'], mn: ['Хувьсах исэлтийн төлөв', 'Fe²⁺ ба Fe³⁺; Mn²⁺-аас Mn⁷⁺ (KMnO₄-д)', '4s ба 3d-ийн электрон бүгд холбоонд оролцож чадна'] },
  { en: ['Coloured ions', 'CuSO₄(aq) blue; Fe²⁺ pale green; Fe³⁺ yellow-brown; MnO₄⁻ purple', 'Electrons move between d orbitals and absorb some visible light'], mn: ['Өнгөтэй ион', 'CuSO₄(aq) цэнхэр; Fe²⁺ ногоон; Fe³⁺ шар-улбар; MnO₄⁻ ягаан', 'd орбиталийн хооронд электрон шилжиж, харагдах гэрлийн зарим хэсгийг шингээнэ'] },
  { en: ['Complex ions with ligands', '[Cu(H₂O)₆]²⁺ pale blue → [Cu(NH₃)₄(H₂O)₂]²⁺ deep blue', 'Ligands with a lone pair bond to the metal ion and replace water; the colour changes'], mn: ['Цогцолбор ион (лиганд)', '[Cu(H₂O)₆]²⁺ цайвар цэнхэр → [Cu(NH₃)₄(H₂O)₂]²⁺ гүн цэнхэр', 'Ганц хос электронтой лиганд металл ионтой холбогдож, усыг орлоно; өнгө өөрчлөгдөнө'] },
  { en: ['Catalysis', 'Fe in the Haber process (NH₃); V₂O₅ in the Contact process (SO₃); Ni in hydrogenation', 'Variable oxidation states let the catalyst give and take electrons, so it provides a new route'], mn: ['Катализ', 'Haber үйлдвэрлэл (NH₃) дээр Fe; Contact үйлдвэрлэл (SO₃) дээр V₂O₅; устөрөгчжилтэд Ni', 'Хувьсах исэлтийн төлөв катализатор электрон авч, өгч шинэ зам бүрдүүлнэ'] }
];

const Table: React.FC<{ head: { en: string[]; mn: string[] }; rows: Row[]; mn: boolean }> = ({ head, rows, mn }) => (
  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
    <table className="w-full min-w-[560px] text-sm">
      <thead className="bg-violet-50 dark:bg-slate-800">
        <tr>
          {(mn ? head.mn : head.en).map(h => (
            <th key={h} className="px-4 py-3 text-left font-black text-slate-900 dark:text-white">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-slate-200 dark:border-slate-800">
            {(mn ? row.mn : row.en).map((cell, j) => (
              <td key={j} className="px-4 py-3 align-top font-bold text-slate-700 dark:text-slate-200">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const ALevelExtension: React.FC = () => {
  const { courseChoice } = useApp();
  const { mode } = useLanguage();
  if (courseChoice !== 'a') return null;
  const mn = mode === 'mn';

  return (
    <section className="space-y-6 rounded-3xl border border-violet-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-violet-700 dark:text-violet-300">
          {mn ? 'A Level 9701 · зөвхөн A Level' : 'A Level 9701 · A Level only'}
        </div>
        <h3 className="mt-1 text-xl font-black text-slate-900 dark:text-white">
          {mn ? 'II бүлэг ба шилжилтийн элементүүд' : 'Group 2 and the transition elements'}
        </h3>
        <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-300">
          {mn ? '9701 хөтөлбөрийн 27 ба 28-р хэсэг.' : 'From 9701 syllabus sections 27 and 28.'}
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-black text-slate-900 dark:text-white">{mn ? 'II бүлэг (Mg, Ca, Sr, Ba)' : 'Group 2 (Mg, Ca, Sr, Ba)'}</h4>
        <Table head={GROUP2_HEAD} rows={GROUP2_ROWS} mn={mn} />
      </div>

      <div className="space-y-2">
        <h4 className="font-black text-slate-900 dark:text-white">{mn ? 'Шилжилтийн элементүүд' : 'Transition elements'}</h4>
        <Table head={TRANSITION_HEAD} rows={TRANSITION_ROWS} mn={mn} />
      </div>
    </section>
  );
};
