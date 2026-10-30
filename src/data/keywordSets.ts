// Key words that cut across the chapters: the same word is needed in calculations, practicals and theory. Each set is
// listed on the Flashcards page, so a student can learn one theme at a time. Definitions follow the IGCSE 0620 and AS/A Level
// 9701 wording, in English and Mongolian.
export interface KeyTerm {
  termEn: string;
  termMn: string;
  defEn: string;
  defMn: string;
}

export interface KeywordSet {
  id: string;
  titleEn: string;
  titleMn: string;
  descEn: string;
  descMn: string;
  terms: KeyTerm[];
}

export const KEYWORD_SETS: KeywordSet[] = [
  {
    id: 'calculations',
    titleEn: 'Calculation words',
    titleMn: 'Тооцооны нэр томьёо',
    descEn: 'The words behind every mole and mass calculation.',
    descMn: 'Моль ба массын бүх тооцооны суурь нэр томьёо.',
    terms: [
      {
        termEn: 'Mole',
        termMn: 'Моль',
        defEn: 'The amount of substance that contains 6.02 × 10²³ particles (the Avogadro constant).',
        defMn: 'Нэг моль нь 6.02 × 10²³ бөөмтэй бодисын хэмжээ (Авогадрогийн тогтмол).',
      },
      {
        termEn: 'Relative atomic mass (Aᵣ)',
        termMn: 'Харьцангуй атомын масс (Aᵣ)',
        defEn: 'The weighted mean mass of an element’s isotopes, compared with one twelfth of the mass of carbon-12.',
        defMn: 'Элементийн изотопуудын жигнэсэн дундаж масс, C-12-ийн массын 1/12-тай харьцуулсан.',
      },
      {
        termEn: 'Relative molecular mass (Mᵣ)',
        termMn: 'Харьцангуй молекул масс (Mᵣ)',
        defEn: 'The sum of the relative atomic masses of the atoms in a molecule or formula unit.',
        defMn: 'Молекул эсвэл томьёоны нэгж дэх атомуудын Aᵣ-ийн нийлбэр.',
      },
      {
        termEn: 'Empirical formula',
        termMn: 'Эмпирик томьёо',
        defEn: 'The simplest whole-number ratio of the atoms of each element in a compound.',
        defMn: 'Нэгдэл дэх элемент бүрийн атомын хамгийн энгийн бүхэл харьцаа.',
      },
      {
        termEn: 'Molar concentration',
        termMn: 'Молийн концентраци',
        defEn: 'The amount of solute in moles dissolved in one dm³ of solution: n = c × V, with V in dm³.',
        defMn: 'Нэг dm³ уусмал дахь уусах бодисын моль тоо: n = c × V, V нь dm³-ээр.',
      },
      {
        termEn: 'Molar volume (r.t.p.)',
        termMn: 'Хийн моль эзлэхүүн (r.t.p.)',
        defEn: 'The volume occupied by one mole of any gas at room temperature and pressure: 24.0 dm³ mol⁻¹.',
        defMn: 'Өрөөний температур, даралтад хийн нэг моль эзлэх эзлэхүүн: 24.0 dm³ моль⁻¹.',
      },
      {
        termEn: 'Percentage yield',
        termMn: 'Гарцын хувь',
        defEn: 'Actual yield ÷ theoretical yield × 100.',
        defMn: 'Бодит гарц ÷ онолын гарц × 100.',
      },
      {
        termEn: 'Limiting reagent',
        termMn: 'Хязгаарлагч урвалж',
        defEn: 'The reactant that is used up first, so it limits the amount of product formed.',
        defMn: 'Эхэлж дуусдаг урвалж; гарах бүтээгдэхүүний хэмжээг хязгаарлана.',
      },
    ],
  },
  {
    id: 'practicals',
    titleEn: 'Practical words',
    titleMn: 'Туршилтын нэр томьёо',
    descEn: 'The words you need to describe a practical and to read its results.',
    descMn: 'Туршилтыг тайлбарлах, үр дүнг уншихад хэрэгтэй үгс.',
    terms: [
      {
        termEn: 'Titration',
        termMn: 'Титрлэлт',
        defEn: 'A method that finds the exact volume of one solution that reacts with a known volume of another.',
        defMn: 'Мэдэгдэх эзлэхүүн уусмалтай урвалд орох нөгөө уусмалын яг эзлэхүүнийг олох арга.',
      },
      {
        termEn: 'End point',
        termMn: 'Эцсийн цэг',
        defEn: 'The moment the indicator changes colour, showing that the reaction is complete.',
        defMn: 'Индикатор өнгөө өөрчилж, урвал дууссаныг харуулах мөч.',
      },
      {
        termEn: 'Filtration',
        termMn: 'Шүүлт',
        defEn: 'Separates an insoluble solid (the residue) from a liquid (the filtrate).',
        defMn: 'Уусдаггүй хатуу бодисыг (үлдэгдэл) шингэнээс (шүүсэн уусмал) салгана.',
      },
      {
        termEn: 'Crystallisation',
        termMn: 'Талстжилт',
        defEn: 'Forms crystals by evaporating a solution until it is saturated, then cooling it.',
        defMn: 'Уусмалыг ханалтад хүртэл ууршуулж, дараа нь хөргөж талст гаргана.',
      },
      {
        termEn: 'Distillation',
        termMn: 'Нэрэлт',
        defEn: 'Separates a liquid from a solution by evaporating it and condensing the vapour again.',
        defMn: 'Шингэнийг ууршуулж, уурыг дахин хөрүүлэн уусмалаас салгана.',
      },
      {
        termEn: 'Chromatography',
        termMn: 'Хроматографи',
        defEn: 'Separates substances by how far they travel with a solvent. Rf = distance moved by the substance ÷ distance moved by the solvent front.',
        defMn: 'Бодисыг уусгагчтай хамт явах зайгаар нь салгана. Rf = бодисын явсан зай ÷ уусгагчийн зах явсан зай.',
      },
      {
        termEn: 'Anhydrous / hydrated',
        termMn: 'Усгүй / усан',
        defEn: 'Anhydrous means it contains no water. Hydrated means it contains water of crystallisation, e.g. CuSO₄·5H₂O.',
        defMn: 'Усгүй гэдэг нь ус агуулаагүй; усан гэдэг нь талстын устай, жишээ нь CuSO₄·5H₂O.',
      },
      {
        termEn: 'Precipitate',
        termMn: 'Тунадас',
        defEn: 'An insoluble solid formed during a reaction in solution.',
        defMn: 'Уусмалд урвалын явцад үүсэх уусдаггүй хатуу бодис.',
      },
    ],
  },
  {
    id: 'energy-rate',
    titleEn: 'Energy and rate words',
    titleMn: 'Энерги ба хурдны нэр томьёо',
    descEn: 'The words behind energy profiles, rates and equilibrium.',
    descMn: 'Энергийн муруй, урвалын хурд, тэнцвэрийн суурь үгс.',
    terms: [
      {
        termEn: 'Exothermic',
        termMn: 'Экзотерм',
        defEn: 'A reaction that gives out heat to the surroundings; ΔH is negative.',
        defMn: 'Орчиндоо дулаан ялгаруулдаг урвал; ΔH сөрөг.',
      },
      {
        termEn: 'Endothermic',
        termMn: 'Эндотерм',
        defEn: 'A reaction that takes in heat from the surroundings; ΔH is positive.',
        defMn: 'Орчноосоо дулаан шингээдэг урвал; ΔH эерэг.',
      },
      {
        termEn: 'Activation energy (Eₐ)',
        termMn: 'Идэвхжүүлэх энерги (Eₐ)',
        defEn: 'The minimum energy that colliding particles need for a successful collision.',
        defMn: 'Мөргөлдсөн бөөмс амжилттай урвалд орохын тулд шаардагдах хамгийн бага энерги.',
      },
      {
        termEn: 'Catalyst',
        termMn: 'Катализатор',
        defEn: 'Speeds up a reaction by lowering its activation energy. It is not used up.',
        defMn: 'Идэвхжүүлэх энергийг бууруулж урвалыг хурдасгана. Өөрөө зарцуулагдахгүй.',
      },
      {
        termEn: 'Rate of reaction',
        termMn: 'Урвалын хурд',
        defEn: 'The change in the amount of a reactant or a product per unit time.',
        defMn: 'Нэгж хугацаанд урвалжийн буурах эсвэл бүтээгдэхүүний нэмэгдэх хэмжээ.',
      },
      {
        termEn: 'Collision theory',
        termMn: 'Мөргөлдөөний онол',
        defEn: 'Particles must collide with enough energy and in the correct orientation to react.',
        defMn: 'Бөөмс урвалд орохын тулд хангалттай энергитэй, зөв чиглэлтэй мөргөлдөх ёстой.',
      },
      {
        termEn: 'Reversible reaction',
        termMn: 'Эргэх урвал',
        defEn: 'Both the forward and the backward reaction take place (⇌).',
        defMn: 'Урагш ба буцах урвал хоёулаа явагдах урвал (⇌).',
      },
      {
        termEn: 'Le Chatelier’s principle',
        termMn: 'Ле Шательегийн зарчим',
        defEn: 'A system at equilibrium shifts to oppose a change made to it.',
        defMn: 'Тэнцвэрт систем өөрт нь хийсэн өөрчлөлтийг эсэргүүцэх чиглэлд шилжинэ.',
      },
    ],
  },
];
