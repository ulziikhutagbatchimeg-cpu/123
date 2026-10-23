import type { GlossaryEntry } from './alevelGlossaryPart1';

// 9701 key terms that the first coursebook pass missed (capital letters, possessives, or multi-word bold phrases), with their
// definitions in Mongolian and English. Each term is also added to the chapter's key-term checklist (alevelKeyTerms.ts).
// A term the chapter already has is skipped when the lists are joined.
export const ALEVEL_GLOSSARY_EXTRA: Record<string, GlossaryEntry[]> = {
  'al-ch-1': [
    { term: { mn: 'нуклон', en: 'nucleon' }, def: { mn: 'Цөмд байгаа протон эсвэл нейтрон.', en: 'A proton or a neutron, the particles in the nucleus.' } },
    { term: { mn: 'саармаг атом', en: 'neutral atom' }, def: { mn: 'Протон ба электроны тоо тэнцүү, тиймээс цахилгаан цэнэггүй атом.', en: 'An atom with equal numbers of protons and electrons, so it has no overall charge.' } },
  ],
  'al-ch-2': [
    { term: { mn: 'Авогадрогийн тогтмол', en: 'Avogadro constant' }, def: { mn: 'Нэг моль дахь бөөмийн тоо, 6.02 × 10²³ моль⁻¹.', en: 'The number of particles in one mole of a substance, 6.02 × 10²³ mol⁻¹.' } },
    { term: { mn: 'молекулын томьёо', en: 'molecular formula' }, def: { mn: 'Молекул дахь элемент бүрийн атомын жинхэнэ тоо; эмпирик томьёоны үржвэр байна.', en: 'The actual number of atoms of each element in one molecule; it is a multiple of the empirical formula.' } },
  ],
  'al-ch-3': [
    { term: { mn: 'ван дер Ваальсын хүч', en: "van der Waals' forces" }, def: { mn: 'Бүх молекулын хооронд үүсэх сул таталцлын хүч; түр зуурын диполь үүсэхтэй холбоотой, электроны тоо их байх тусам хүч нэмэгдэнэ.', en: 'Weak attractive forces between all molecules, arising from temporary dipoles; they grow stronger as the number of electrons increases.' } },
    { term: { mn: 'металлын холбоо', en: 'metallic bond' }, def: { mn: 'Эерэг металл ион ба делокалчлагдсан электронуудын хооронд үүсэх цахилгаан статик таталцал.', en: 'The electrostatic attraction between the positive metal ions and the delocalised electrons.' } },
  ],
  'al-ch-5': [
    { term: { mn: 'Хессийн хууль', en: "Hess's law" }, def: { mn: 'Урвалын энтальпийн өөрчлөлт нь урвал аль алт замаар явагдсанаас үл хамаарна; алхам бүрийн энтальпийн нийлбэртэй тэнцүү.', en: 'The enthalpy change of a reaction is the same whatever route is taken; it equals the sum of the enthalpy changes of the steps.' } },
    { term: { mn: 'стандарт энтальпийн өөрчлөлт (урвал)', en: 'standard enthalpy change of reaction' }, def: { mn: 'Стандарт нөхцөлд, урвалын тэгшитгэлд заасан моль тооны урвалын энтальпийн өөрчлөлт.', en: 'The enthalpy change when the molar quantities in the equation react under standard conditions.' } },
    { term: { mn: 'стандарт энтальпийн өөрчлөлт (үүсэх)', en: 'standard enthalpy change of formation' }, def: { mn: 'Стандарт нөхцөлд 1 моль нэгдэл, элементүүдээс үүсэх энтальпийн өөрчлөлт.', en: 'The enthalpy change when 1 mole of a compound is formed from its elements in their standard states.' } },
    { term: { mn: 'стандарт энтальпийн өөрчлөлт (шатах)', en: 'standard enthalpy change of combustion' }, def: { mn: 'Стандарт нөхцөлд 1 моль бодис хүчилтөрөгчтэй бүрэн шатах үеийн энтальпийн өөрчлөлт.', en: 'The enthalpy change when 1 mole of a substance burns completely in oxygen under standard conditions.' } },
    { term: { mn: 'стандарт энтальпийн өөрчлөлт (саармагжилт)', en: 'standard enthalpy change of neutralisation' }, def: { mn: 'Хүчил ба суурь урвалд орж 1 моль ус үүсэх үеийн энтальпийн өөрчлөлт.', en: 'The enthalpy change when an acid and a base react to form 1 mole of water.' } },
  ],
  'al-ch-6': [
    { term: { mn: 'исэлдүүлэгч', en: 'oxidising agent' }, def: { mn: 'Өөр бодисыг исэлдүүлдэг, өөрөө бууралтад орох бодис (электрон хүлээн авдаг).', en: 'A substance that oxidises another substance, and is itself reduced by accepting electrons.' } },
    { term: { mn: 'бууруулагч', en: 'reducing agent' }, def: { mn: 'Өөр бодисыг бууруулдаг, өөрөө исэлдэх бодис (электрон өгдөг).', en: 'A substance that reduces another substance, and is itself oxidised by giving up electrons.' } },
  ],
  'al-ch-7': [
    { term: { mn: 'Ле Шателийн зарчим', en: "Le Chatelier's principle" }, def: { mn: 'Тэнцвэрт системд нөлөө үзүүлбэл систем тэр нөлөөг бууруулах чиглэлд тэнцвэрээ шилжүүлнэ.', en: 'If a change is made to a system in equilibrium, the position of equilibrium shifts to oppose that change.' } },
  ],
  'al-ch-8': [
    { term: { mn: 'Больцманы тархалт', en: 'Boltzmann distribution' }, def: { mn: 'Температур өөр бүрт бөөмсийн энергийн тархалтын муруй; урвалд орох энергитэй бөөмийн эзлэх хувь.', en: 'The spread of particle energies at a given temperature; it shows the fraction of particles with at least the activation energy.' } },
  ],
  'al-ch-9': [
    { term: { mn: 'цахилгаан дамжуулах чанар', en: 'electrical conductivity' }, def: { mn: 'Бодис цахилгаан гүйдлийг дамжуулах чадвар; металл делокалчлагдсан электроноор дамжуулна.', en: 'The ability of a substance to conduct electricity; metals do so through their delocalised electrons.' } },
  ],
  'al-ch-11': [
    { term: { mn: 'галид', en: 'halide' }, def: { mn: 'Галогений ион (F⁻, Cl⁻, Br⁻, I⁻) эсвэл түүнийг агуулсан нэгдэл.', en: 'A halogen ion (F⁻, Cl⁻, Br⁻ or I⁻) or a compound containing one.' } },
  ],
  'al-ch-13': [
    { term: { mn: 'стереоизомер', en: 'stereoisomer' }, def: { mn: 'Атомын холбогдох дараалал ижил, гэхдээ орон зайд байрлал нь өөр изомер.', en: 'An isomer in which the atoms are bonded in the same order but arranged differently in space.' } },
    { term: { mn: 'нэмэлтийн урвал', en: 'addition reaction' }, def: { mn: 'Энгийн молекул давхар холбоотой молекулын C=C холбоонд нэмэгдэх урвал.', en: 'A reaction in which a simple molecule adds across a C=C double bond.' } },
    { term: { mn: 'задралын урвал', en: 'elimination reaction' }, def: { mn: 'Молекулаас жижиг молекул (жишээ нь H₂O эсвэл HBr) зайлуулж давхар холбоо үүсгэх урвал.', en: 'A reaction in which a small molecule, such as H₂O or HBr, is removed from a molecule to form a double bond.' } },
    { term: { mn: 'орлуулалтын урвал', en: 'substitution reaction' }, def: { mn: 'Молекулын атом эсвэл бүлгийг өөр атом эсвэл бүлгээр солих урвал.', en: 'A reaction in which an atom or group in a molecule is replaced by a different atom or group.' } },
    { term: { mn: 'конденсацийн урвал', en: 'condensation reaction' }, def: { mn: 'Хоёр молекул холбогдож, жижиг молекул (ихэвчлэн ус) ялгарах урвал.', en: 'A reaction in which two molecules join together and a small molecule, usually water, is released.' } },
  ],
  'al-ch-17': [
    { term: { mn: 'Толлений урвалж', en: "Tollens' reagent" }, def: { mn: 'Аммиакт мөнгөн нитрат; альдегидийг исэлдүүлж, мөнгөн толь үүсгэдэг урвалж.', en: 'Ammoniacal silver nitrate, which oxidises aldehydes and forms a silver mirror.' } },
    { term: { mn: 'Фелингийн уусмал', en: 'Fehling’s solution' }, def: { mn: 'Зэсийн(II) ионтой уусмал; альдегидийг исэлдүүлж, улаан зэсийн(I) оксидын тунадас үүсгэдэг.', en: 'An alkaline solution of copper(II) ions, which oxidises aldehydes and forms a red precipitate of copper(I) oxide.' } },
    { term: { mn: 'хазайсан үр дүн', en: 'anomalous result' }, def: { mn: 'Цувралын бусадаас хэт их эсвэл бага байгаа үр дүн; ихэвчлэн дундаж тооцоонд оруулахгүй.', en: 'A result that is much larger or smaller than the others; it is usually left out of the mean.' } },
  ],
};
