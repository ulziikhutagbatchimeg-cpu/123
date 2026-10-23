import { ChemistryCalculatorSuite } from './ChemistryCalculatorSuite';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CALC_CHAPTERS } from '../data/calcChapters';
import { CHAPTER_WORKED_EXAMPLES } from '../data/calcWorkedExamples';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { ChemText } from './common/ChemText';
import { 
  Calculator, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  Award,
  Layers,
  ArrowRight,
  Flame,
  Scale
} from 'lucide-react';

interface WorkedExampleItem {
  id: string;
  category: string;
  categoryMn: string;
  titleEn: string;
  titleMn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  syllabusRef: string;
  problemTextEn: string;
  problemTextMn: string;
  givenEn: string[];
  givenMn: string[];
  formulaUsed: string;
  stepsEn: { title: string; detail: string }[];
  stepsMn: { title: string; detail: string }[];
  finalAnswerEn: string;
  finalAnswerMn: string;
  examinerTipEn: string;
  examinerTipMn: string;
}

interface PracticeProblemItem {
  id: string;
  category: string;
  categoryMn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  syllabusRef: string;
  titleEn: string;
  titleMn: string;
  questionEn: string;
  questionMn: string;
  type: 'numeric' | 'mcq';
  unit?: string;
  correctNumericAnswer?: number;
  tolerance?: number;
  mcqOptions?: { id: 'A' | 'B' | 'C' | 'D'; textEn: string; textMn: string }[];
  correctMcqOption?: 'A' | 'B' | 'C' | 'D';
  hintEn: string;
  hintMn: string;
  stepsEn: string[];
  stepsMn: string[];
  marks: number;
}

const WORKED_EXAMPLES: WorkedExampleItem[] = [
  {
    id: 'we-1',
    category: 'Mole & Mass',
    categoryMn: 'Моль ба Масс',
    difficulty: 'easy',
    syllabusRef: '0620/Topic 3.1',
    titleEn: 'Calculating Moles from Mass of Calcium Carbonate',
    titleMn: 'Кальцийн карбонатын массаас молийг олох',
    problemTextEn: 'Calculate the number of moles in 25.0 g of pure calcium carbonate, CaCO₃. [Ar: Ca = 40, C = 12, O = 16]',
    problemTextMn: '25.0 г цэвэр кальцийн карбонат (CaCO₃)-д хэдэн моль бодис агуулагдахыг тооцоолно уу. [Ar: Ca = 40, C = 12, O = 16]',
    givenEn: ['Mass of CaCO₃ (m) = 25.0 g', 'Ar values: Ca = 40, C = 12, O = 16'],
    givenMn: ['CaCO₃-ийн масс (m) = 25.0 г', 'Ar утгууд: Ca = 40, C = 12, O = 16'],
    formulaUsed: 'n = m / Mr',
    stepsEn: [
      {
        title: 'Step 1: Calculate relative formula mass (Mr) of CaCO₃',
        detail: 'Mr(CaCO₃) = 40 + 12 + (3 × 16) = 40 + 12 + 48 = 100 g/mol'
      },
      {
        title: 'Step 2: Apply the fundamental mole formula',
        detail: 'n = mass (g) / Mr = 25.0 g / 100 g/mol = 0.250 mol'
      }
    ],
    stepsMn: [
      {
        title: 'Алхам 1: CaCO₃-ийн харьцангуй молекул масс (Mr)-ийг олох',
        detail: 'Mr(CaCO₃) = 40 + 12 + (3 × 16) = 40 + 12 + 48 = 100 г/моль'
      },
      {
        title: 'Алхам 2: Молийн үндсэн томьёонд орлуулах',
        detail: 'n = масс (г) / Mr = 25.0 г / 100 г/моль = 0.250 моль'
      }
    ],
    finalAnswerEn: 'Number of moles = 0.250 mol',
    finalAnswerMn: 'Молийн тоо = 0.250 моль',
    examinerTipEn: 'Always give your final numerical answer to 3 significant figures unless told otherwise.',
    examinerTipMn: 'Кэмбрижийн шалгалтад хариуг ихэвчлэн 3 утга бүхий орноор (3 significant figures) тоймлон бичнэ.'
  },
  {
    id: 'we-2',
    category: 'Reacting Masses',
    categoryMn: 'Урвалд орж буй масс',
    difficulty: 'medium',
    syllabusRef: '0620/Topic 3.2',
    titleEn: 'Calculating Mass of Magnesium Oxide Formed',
    titleMn: 'Үүсэх магнийн оксидын массыг тооцоолох',
    problemTextEn: 'Calculate the maximum mass of magnesium oxide (MgO) formed when 4.80 g of magnesium burns completely in excess oxygen. 2Mg(s) + O₂(g) → 2MgO(s) [Ar: Mg = 24, O = 16]',
    problemTextMn: '4.80 г магни илүүдэл хүчилтөрөгчид бүрэн шатахад үүсэх магнийн оксидын (MgO) хамгийн их массыг тооцоолно уу. 2Mg(s) + O₂(g) → 2MgO(s) [Ar: Mg = 24, O = 16]',
    givenEn: ['Mass of Mg = 4.80 g', 'Ar: Mg = 24, O = 16', 'Equation: 2Mg + O₂ → 2MgO'],
    givenMn: ['Mg-ийн масс = 4.80 г', 'Ar: Mg = 24, O = 16', 'Тэгшитгэл: 2Mg + O₂ → 2MgO'],
    formulaUsed: 'n(Mg) → Mole Ratio (1:1) → m(MgO) = n × Mr',
    stepsEn: [
      {
        title: 'Step 1: Calculate moles of magnesium reacted',
        detail: 'n(Mg) = 4.80 g / 24 g/mol = 0.200 mol'
      },
      {
        title: 'Step 2: Use stoichiometric mole ratio from balanced equation',
        detail: 'From equation: 2 mol Mg forms 2 mol MgO (Ratio 1 : 1). Therefore: n(MgO) = 0.200 mol'
      },
      {
        title: 'Step 3: Calculate Mr of MgO and convert moles to mass',
        detail: 'Mr(MgO) = 24 + 16 = 40 g/mol. Mass = n × Mr = 0.200 mol × 40 g/mol = 8.00 g'
      }
    ],
    stepsMn: [
      {
        title: 'Алхам 1: Урвалд орсон магнийн молийн тоог олох',
        detail: 'n(Mg) = 4.80 г / 24 г/моль = 0.200 моль'
      },
      {
        title: 'Алхам 2: Тэгшитгэлээс молийн харьцааг ашиглах',
        detail: 'Тэгшитгэлээс харвал: 2 моль Mg-оос 2 моль MgO үүснэ (Харьцаа 1 : 1). Иймээс n(MgO) = 0.200 моль'
      },
      {
        title: 'Алхам 3: MgO-ийн Mr-ийг тооцоолж массыг олох',
        detail: 'Mr(MgO) = 24 + 16 = 40 г/моль. Масс = n × Mr = 0.200 моль × 40 г/моль = 8.00 г'
      }
    ],
    finalAnswerEn: 'Mass of MgO = 8.00 g',
    finalAnswerMn: 'MgO-ийн масс = 8.00 г',
    examinerTipEn: 'Do not multiply the formula mass of MgO by the coefficient 2. The coefficient only determines the mole ratio!',
    examinerTipMn: 'Коэффициент 2-оор Mr(MgO)-ийг үржүүлж болохгүй! Коэффициент нь зөвхөн молийн харьцааг заана.'
  },
  {
    id: 'we-3',
    category: 'Gas Volume (r.t.p.)',
    categoryMn: 'Хийн эзлэхүүн (r.t.p.)',
    difficulty: 'medium',
    syllabusRef: '0620/Topic 3.3',
    titleEn: 'Volume of Carbon Dioxide Gas Produced at r.t.p.',
    titleMn: 'r.t.p нөхцөлд ялгарах нүүрсхүчлийн хийн эзлэхүүн',
    problemTextEn: 'What volume of carbon dioxide gas (CO₂) at r.t.p. is released when 5.00 g of calcium carbonate reacts completely with excess hydrochloric acid? CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂ [Molar gas volume at r.t.p. = 24.0 dm³/mol; Mr(CaCO₃) = 100]',
    problemTextMn: '5.00 г кальцийн карбонат илүүдэл давсны хүчилтэй бүрэн урвалд ороход r.t.p нөхцөлд ялгарах CO₂ хийн эзлэхүүнийг (дм³ ба см³) тооцоолно уу. CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂ [r.t.p дахь молийн хийн эзлэхүүн = 24.0 дм³/моль; Mr(CaCO₃) = 100]',
    givenEn: ['Mass of CaCO₃ = 5.00 g', 'Mr(CaCO₃) = 100', 'Molar volume = 24.0 dm³/mol'],
    givenMn: ['CaCO₃-ийн масс = 5.00 г', 'Mr(CaCO₃) = 100', 'Молийн эзлэхүүн = 24.0 дм³/моль'],
    formulaUsed: 'V = n × 24.0 dm³',
    stepsEn: [
      {
        title: 'Step 1: Calculate moles of CaCO₃ reacted',
        detail: 'n(CaCO₃) = 5.00 g / 100 g/mol = 0.0500 mol'
      },
      {
        title: 'Step 2: Mole ratio to carbon dioxide gas',
        detail: '1 mol CaCO₃ produces 1 mol CO₂ → n(CO₂) = 0.0500 mol'
      },
      {
        title: 'Step 3: Multiply by molar gas volume at r.t.p.',
        detail: 'V(CO₂) = 0.0500 mol × 24.0 dm³/mol = 1.20 dm³ (or 1200 cm³)'
      }
    ],
    stepsMn: [
      {
        title: 'Алхам 1: Урвалд орсон CaCO₃-ийн молийг олох',
        detail: 'n(CaCO₃) = 5.00 г / 100 г/моль = 0.0500 моль'
      },
      {
        title: 'Алхам 2: Тэгшитгэлээс CO₂-ийн молийг гаргах',
        detail: '1 моль CaCO₃-оос 1 моль CO₂ ялгарна → n(CO₂) = 0.0500 моль'
      },
      {
        title: 'Алхам 3: Хийн молийн эзлэхүүн 24.0 дм³/моль-оор үржүүлэх',
        detail: 'V(CO₂) = 0.0500 моль × 24.0 дм³/моль = 1.20 дм³ (эсвэл 1200 см³)'
      }
    ],
    finalAnswerEn: 'Volume of CO₂ = 1.20 dm³ (1200 cm³)',
    finalAnswerMn: 'CO₂ хийн эзлэхүүн = 1.20 дм³ (1200 см³)',
    examinerTipEn: 'Be careful with units: 1 dm³ = 1000 cm³. If the exam requests cm³, multiply dm³ by 1000.',
    examinerTipMn: 'Нэгжид анхаарах: 1 дм³ = 1000 см³. Хэрэв шалгалтад см³ гэвэл дм³-ийг 1000-аар үржүүлнэ.'
  },
  {
    id: 'we-4',
    category: 'Titration Concentration',
    categoryMn: 'Титрлэлтийн концентраци',
    difficulty: 'hard',
    syllabusRef: '0620/Topic 3.4 & 7.2',
    titleEn: 'Determining Unknown Acid Concentration from Titration',
    titleMn: 'Титрлэлтийн үр дүнгээс үл мэдэгдэх хүчлийн концентрацийг олох',
    problemTextEn: 'In a titration, 25.0 cm³ of sulfuric acid (H₂SO₄) required exactly 20.0 cm³ of 0.200 mol/dm³ sodium hydroxide (NaOH) for complete neutralization. Calculate the concentration of the sulfuric acid in mol/dm³ and g/dm³. 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O [Mr(H₂SO₄) = 98.0]',
    problemTextMn: 'Титрлэлтийн үед 25.0 см³ хүхрийн хүчлийг (H₂SO₄) саармагжуулахад 0.200 моль/дм³ концентрацитай 20.0 см³ натрийн гидроксид (NaOH) зарцуулагджээ. Хүхрийн хүчлийн концентрацийг моль/дм³ ба г/дм³ нэгжээр тооцоолно уу. 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O [Mr(H₂SO₄) = 98.0]',
    givenEn: ['Vol of NaOH = 20.0 cm³ = 0.0200 dm³', 'Conc of NaOH = 0.200 mol/dm³', 'Vol of H₂SO₄ = 25.0 cm³ = 0.0250 dm³'],
    givenMn: ['NaOH-ийн эзлэхүүн = 20.0 см³ = 0.0200 дм³', 'NaOH-ийн концентраци = 0.200 моль/дм³', 'H₂SO₄-ийн эзлэхүүн = 25.0 см³ = 0.0250 дм³'],
    formulaUsed: 'n = c × v → Stoichiometric ratio 2 : 1 → c = n / v',
    stepsEn: [
      {
        title: 'Step 1: Calculate moles of NaOH used',
        detail: 'n(NaOH) = c × V = 0.200 mol/dm³ × (20.0 / 1000 dm³) = 0.00400 mol'
      },
      {
        title: 'Step 2: Mole ratio from balanced chemical equation',
        detail: '2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O. 2 moles of NaOH react with 1 mole of H₂SO₄. Therefore: n(H₂SO₄) = 0.00400 / 2 = 0.00200 mol'
      },
      {
        title: 'Step 3: Calculate molar concentration in mol/dm³',
        detail: 'c(H₂SO₄) = n / V = 0.00200 mol / (25.0 / 1000 dm³) = 0.0800 mol/dm³'
      },
      {
        title: 'Step 4: Convert mol/dm³ to g/dm³',
        detail: 'Mass concentration = molar concentration × Mr = 0.0800 mol/dm³ × 98.0 g/mol = 7.84 g/dm³'
      }
    ],
    stepsMn: [
      {
        title: 'Алхам 1: Зарцуулагдсан NaOH-ийн молийг олох',
        detail: 'n(NaOH) = c × V = 0.200 моль/дм³ × (20.0 / 1000 дм³) = 0.00400 моль'
      },
      {
        title: 'Алхам 2: Тэгшитгэл дэх молийн 2 : 1 харьцааг хэрэглэх',
        detail: '2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O. 2 моль NaOH-д 1 моль H₂SO₄ ноогдоно. Иймээс n(H₂SO₄) = 0.00400 / 2 = 0.00200 моль'
      },
      {
        title: 'Алхам 3: H₂SO₄-ийн молийн концентрацийг олох',
        detail: 'c(H₂SO₄) = n / V = 0.00200 моль / (25.0 / 1000 дм³) = 0.0800 моль/дм³'
      },
      {
        title: 'Алхам 4: моль/дм³-ийг г/дм³ болгон хөрвүүлэх',
        detail: 'Массын концентраци = c × Mr = 0.0800 моль/дм³ × 98.0 г/моль = 7.84 г/дм³'
      }
    ],
    finalAnswerEn: 'Concentration = 0.0800 mol/dm³ (7.84 g/dm³)',
    finalAnswerMn: 'Концентраци = 0.0800 моль/дм³ (7.84 г/дм³)',
    examinerTipEn: 'Do not forget the 2:1 mole ratio for diprotic acids like sulfuric acid! Missing this divides the marks in half.',
    examinerTipMn: 'Хүхрийн хүчил (H₂SO₄) нь хоёр суурьт хүчил тул NaOH-той 2 : 1 харьцаатай урвалд ордог гэдгийг мартаж болохгүй!'
  }
];

const PRACTICE_PROBLEMS: PracticeProblemItem[] = [
  {
    id: 'pr-1',
    category: 'Mole & Mass',
    categoryMn: 'Моль ба Масс',
    difficulty: 'easy',
    syllabusRef: '0620/3.1',
    titleEn: 'Moles in Water',
    titleMn: 'Усан дахь молийн тооцоо',
    questionEn: 'Calculate the number of moles of water molecules in 36.0 g of pure water (H₂O). [Ar: H = 1, O = 16]',
    questionMn: '36.0 г цэвэр ус (H₂O)-д хэдэн моль усны молекул агуулагдах вэ? [Ar: H = 1, O = 16]',
    type: 'numeric',
    unit: 'mol',
    correctNumericAnswer: 2.0,
    tolerance: 0.05,
    hintEn: 'Find Mr of H₂O: (2 × 1) + 16 = 18. Then divide mass by Mr.',
    hintMn: 'H₂O-ийн Mr = (2 × 1) + 16 = 18. Дараа нь массыг Mr-д хуваана.',
    stepsEn: [
      'Mr(H₂O) = 18 g/mol',
      'n = m / Mr = 36.0 / 18 = 2.0 mol'
    ],
    stepsMn: [
      'Mr(H₂O) = 18 г/моль',
      'n = m / Mr = 36.0 / 18 = 2.0 моль'
    ],
    marks: 1
  },
  {
    id: 'pr-2',
    category: 'Reacting Masses',
    categoryMn: 'Стехиометрийн масс',
    difficulty: 'medium',
    syllabusRef: '0620/3.2',
    titleEn: 'Combustion of Carbon',
    titleMn: 'Нүүрстөрөгчийн шаталт',
    questionEn: 'Carbon reacts with oxygen to form carbon dioxide: C + O₂ → CO₂. What mass of CO₂ is produced when 6.0 g of carbon burns completely in excess oxygen? [Ar: C = 12, O = 16]',
    questionMn: 'Нүүрстөрөгч хүчилтөрөгчтэй урвалд орон нүүрсхүчлийн хий үүсгэнэ: C + O₂ → CO₂. 6.0 г нүүрстөрөгч бүрэн шатахад үүсэх CO₂-ийн массыг (г) тооцоолно уу. [Ar: C = 12, O = 16]',
    type: 'numeric',
    unit: 'g',
    correctNumericAnswer: 22.0,
    tolerance: 0.2,
    hintEn: 'n(C) = 6.0 / 12 = 0.50 mol. Ratio is 1:1. Mr(CO₂) = 44.',
    hintMn: 'n(C) = 6.0 / 12 = 0.50 моль. Харьцаа 1:1. Mr(CO₂) = 44.',
    stepsEn: [
      'Moles of C = 6.0 / 12 = 0.50 mol',
      'Mole ratio C : CO₂ is 1 : 1 → Moles of CO₂ = 0.50 mol',
      'Mr(CO₂) = 12 + 32 = 44 g/mol',
      'Mass of CO₂ = 0.50 × 44 = 22.0 g'
    ],
    stepsMn: [
      'C-ийн моль = 6.0 / 12 = 0.50 моль',
      'Тэгшитгэл дэх C : CO₂ харьцаа 1 : 1 → CO₂-ийн моль = 0.50 моль',
      'Mr(CO₂) = 12 + 32 = 44 г/моль',
      'CO₂-ийн масс = 0.50 × 44 = 22.0 г'
    ],
    marks: 2
  },
  {
    id: 'pr-3',
    category: 'Gas Volume',
    categoryMn: 'Хийн эзлэхүүн',
    difficulty: 'medium',
    syllabusRef: '0620/3.3',
    titleEn: 'Hydrogen Gas from Acid and Zinc',
    titleMn: 'Цайр ба хүчлийн урвалаас гарах устөрөгч',
    questionEn: 'Zinc reacts with hydrochloric acid: Zn + 2HCl → ZnCl₂ + H₂. Calculate the volume of hydrogen gas formed at r.t.p. when 0.100 mol of zinc reacts with excess acid. [Molar gas volume at r.t.p. = 24.0 dm³/mol]',
    questionMn: 'Цайр давсны хүчилтэй урвалд орно: Zn + 2HCl → ZnCl₂ + H₂. 0.100 моль цайр илүүдэл хүчилтэй урвалд ороход r.t.p нөхцөлд ялгарах устөрөгчийн хийн эзлэхүүнийг (дм³) тооцоолно уу. [Молийн хийн эзлэхүүн = 24.0 дм³/моль]',
    type: 'numeric',
    unit: 'dm³',
    correctNumericAnswer: 2.4,
    tolerance: 0.05,
    hintEn: '1 mol Zn produces 1 mol H₂. Volume = n × 24.0 dm³.',
    hintMn: '1 моль Zn-ээс 1 моль H₂ үүснэ. Эзлэхүүн = n × 24.0 дм³.',
    stepsEn: [
      'Mole ratio Zn : H₂ is 1 : 1',
      'n(H₂) = 0.100 mol',
      'Volume = 0.100 mol × 24.0 dm³/mol = 2.40 dm³'
    ],
    stepsMn: [
      'Zn : H₂-ийн харьцаа 1 : 1',
      'n(H₂) = 0.100 моль',
      'Эзлэхүүн = 0.100 моль × 24.0 дм³/моль = 2.40 дм³'
    ],
    marks: 2
  },
  {
    id: 'pr-4',
    category: 'Percentage Yield',
    categoryMn: 'Урвалын гарц (%)',
    difficulty: 'hard',
    syllabusRef: '0620/3.4',
    titleEn: 'Calculating Percentage Yield of Aspirin',
    titleMn: 'Урвалын гарцын хувийг тооцоолох',
    questionEn: 'In an industrial synthesis, the theoretical yield of a product is 50.0 g. In the laboratory, a student isolates 42.5 g. Calculate the percentage yield.',
    questionMn: 'Аж үйлдвэрийн нийлэгжилтээр онолын хувьд 50.0 г бүтээгдэхүүн үүсэх ёстой байв. Туршилтаар 42.5 г бүтээгдэхүүн гарган авсан бол урвалын гарцын хувийг (%) тооцоолно уу.',
    type: 'numeric',
    unit: '%',
    correctNumericAnswer: 85.0,
    tolerance: 0.5,
    hintEn: 'Percentage yield = (actual mass / theoretical mass) × 100%.',
    hintMn: 'Гарцын хувь = (Бодит масс / Онолын масс) × 100%.',
    stepsEn: [
      'Percentage yield = (42.5 g / 50.0 g) × 100%',
      '= 0.85 × 100% = 85.0%'
    ],
    stepsMn: [
      'Гарцын хувь = (42.5 г / 50.0 г) × 100%',
      '= 0.85 × 100% = 85.0%'
    ],
    marks: 2
  },
  {
    id: 'pr-e1',
    category: 'Bond Energies',
    categoryMn: 'Холбооны энерги',
    difficulty: 'medium',
    syllabusRef: '0620/5.2',
    titleEn: 'Enthalpy change from bond energies: hydrogen and chlorine',
    titleMn: 'Холбооны энергээр ΔH: устөрөгч ба хлор',
    questionEn: 'Hydrogen reacts with chlorine: H₂ + Cl₂ → 2HCl. Bond energies: H–H = 436 kJ/mol, Cl–Cl = 242 kJ/mol, H–Cl = 431 kJ/mol. Calculate ΔH for the reaction, including the sign.',
    questionMn: 'Устөрөгч хлортой урвалд орно: H₂ + Cl₂ → 2HCl. Холбооны энерги: H–H = 436 кЖ/моль, Cl–Cl = 242 кЖ/моль, H–Cl = 431 кЖ/моль. Урвалын ΔH-ийг тэмдгийн хамт тооцоол.',
    type: 'numeric',
    unit: 'kJ/mol',
    correctNumericAnswer: -184,
    tolerance: 1,
    hintEn: 'Bonds broken: H–H and Cl–Cl. Bonds made: 2 × H–Cl.',
    hintMn: 'Тасарсан холбоо: H–H ба Cl–Cl. Үүссэн холбоо: 2 × H–Cl.',
    stepsEn: [
      'Bonds broken = 436 + 242 = 678 kJ',
      'Bonds made = 2 × 431 = 862 kJ',
      'ΔH = 678 − 862 = −184 kJ/mol'
    ],
    stepsMn: [
      'Тасарсан холбоо = 436 + 242 = 678 кЖ',
      'Үүссэн холбоо = 2 × 431 = 862 кЖ',
      'ΔH = 678 − 862 = −184 кЖ/моль'
    ],
    marks: 2
  },
  {
    id: 'pr-e2',
    category: 'Calorimetry',
    categoryMn: 'Калориметр',
    difficulty: 'medium',
    syllabusRef: '0620/5.1',
    titleEn: 'Enthalpy of neutralisation from a temperature rise',
    titleMn: 'Саармагжилтын ΔH температурын өсөлтөөр',
    questionEn: 'In a polystyrene cup, 50.0 cm³ of 1.00 mol/dm³ hydrochloric acid is mixed with 50.0 cm³ of 1.00 mol/dm³ sodium hydroxide. The temperature rises by 6.8 °C. Take the solution as 1.00 g per cm³, c = 4.18 J/g °C, and 0.0500 mol of water formed. Calculate the enthalpy change of neutralisation in kJ/mol, including the sign.',
    questionMn: 'Полистиролын аяганд 50.0 см³ 1.00 моль/дм³ хлорсутөрөгчийн хүчлийг 50.0 см³ 1.00 моль/дм³ натрийн гидроксидтой холино. Температур 6.8 °C өснө. Уусмалыг 1.00 г/см³, c = 4.18 Ж/г °C, 0.0500 моль ус үүснэ гэж үзээд, саармагжилтын энтальпийн өөрчлөлтийг кЖ/моль-оор тэмдгийн хамт тооцоол.',
    type: 'numeric',
    unit: 'kJ/mol',
    correctNumericAnswer: -56.8,
    tolerance: 0.5,
    hintEn: 'Mass of solution = 100 g. Heat absorbed q = m × c × ΔT, then divide by the moles of water formed.',
    hintMn: 'Уусмалын масс = 100 г. Шингээсэн дулаан q = m × c × ΔT, дараа нь үүссэн усны молиор хуваа.',
    stepsEn: [
      'Mass of solution = 50.0 + 50.0 = 100 g',
      'q = 100 × 4.18 × 6.8 = 2842 J = 2.84 kJ',
      'ΔH = −2.84 kJ ÷ 0.0500 mol = −56.8 kJ/mol'
    ],
    stepsMn: [
      'Уусмалын масс = 50.0 + 50.0 = 100 г',
      'q = 100 × 4.18 × 6.8 = 2842 Ж = 2.84 кЖ',
      'ΔH = −2.84 кЖ ÷ 0.0500 моль = −56.8 кЖ/моль'
    ],
    marks: 3
  },
  {
    id: 'pr-e3',
    category: 'Bond Energies',
    categoryMn: 'Холбооны энерги',
    difficulty: 'hard',
    syllabusRef: '0620/5.2',
    titleEn: 'Enthalpy of combustion of propane from bond energies',
    titleMn: 'Пропаны шаталтын ΔH холбооны энергээр',
    questionEn: 'Propane burns: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Bond energies: C–C = 348, C–H = 413, O=O = 498, C=O = 805, O–H = 463 kJ/mol. Calculate ΔH for the reaction, including the sign.',
    questionMn: 'Пропан шатна: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Холбооны энерги: C–C = 348, C–H = 413, O=O = 498, C=O = 805, O–H = 463 кЖ/моль. Урвалын ΔH-ийг тэмдгийн хамт тооцоол.',
    type: 'numeric',
    unit: 'kJ/mol',
    correctNumericAnswer: -2044,
    tolerance: 1,
    hintEn: 'Propane has 2 C–C and 8 C–H bonds. The equation makes 6 C=O and 8 O–H bonds.',
    hintMn: 'Пропанд 2 C–C ба 8 C–H холбоо байна. Тэгшитгэлд 6 C=O ба 8 O–H холбоо үүснэ.',
    stepsEn: [
      'Bonds broken = 2 × 348 + 8 × 413 + 5 × 498 = 696 + 3304 + 2490 = 6490 kJ',
      'Bonds made = 6 × 805 + 8 × 463 = 4830 + 3704 = 8534 kJ',
      'ΔH = 6490 − 8534 = −2044 kJ/mol'
    ],
    stepsMn: [
      'Тасарсан холбоо = 2 × 348 + 8 × 413 + 5 × 498 = 696 + 3304 + 2490 = 6490 кЖ',
      'Үүссэн холбоо = 6 × 805 + 8 × 463 = 4830 + 3704 = 8534 кЖ',
      'ΔH = 6490 − 8534 = −2044 кЖ/моль'
    ],
    marks: 3
  },
  {
    id: 'pr-e4',
    category: 'Energy Profiles',
    categoryMn: 'Энергийн муруй',
    difficulty: 'easy',
    syllabusRef: '0620/5.1',
    titleEn: 'Activation energy from an energy profile',
    titleMn: 'Энергийн муруйгаас идэвхжүүлэх энерги',
    questionEn: 'An energy profile for a reaction shows: reactants 300 kJ, top of the energy hump 380 kJ, products 180 kJ. Calculate the activation energy (Eₐ) of the forward reaction in kJ/mol.',
    questionMn: 'Урвалын энергийн муруйд: урвалд орох бодис 300 кЖ, энергийн оройн цэг 380 кЖ, бүтээгдэхүүн 180 кЖ. Урд чиглэлийн идэвхжүүлэх энерги (Eₐ)-ийг кЖ/моль-оор тооцоол.',
    type: 'numeric',
    unit: 'kJ/mol',
    correctNumericAnswer: 80,
    tolerance: 1,
    hintEn: 'Eₐ is the height from the reactants up to the top of the hump, not down to the products.',
    hintMn: 'Eₐ нь урвалд орох бодисоос оройн цэг хүртэлх өндөр, бүтээгдэхүүн хүртэлх биш.',
    stepsEn: [
      'Eₐ = energy at the top − energy of reactants',
      'Eₐ = 380 − 300 = 80 kJ/mol'
    ],
    stepsMn: [
      'Eₐ = оройн энерги − урвалд орох бодисын энерги',
      'Eₐ = 380 − 300 = 80 кЖ/моль'
    ],
    marks: 1
  },
  {
    id: 'pr-e5',
    category: 'Exothermic & Endothermic',
    categoryMn: 'Экзотерм ба эндотерм',
    difficulty: 'easy',
    syllabusRef: '0620/5.1',
    titleEn: 'Which change is endothermic?',
    titleMn: 'Аль өөрчлөлт эндотерм вэ?',
    questionEn: 'Which change takes in heat energy from its surroundings?',
    questionMn: 'Аль өөрчлөлт орчноосоо дулааны энерги шингээдэг вэ?',
    type: 'mcq',
    mcqOptions: [
      { id: 'A', textEn: 'Burning methane', textMn: 'Метан шатах' },
      { id: 'B', textEn: 'Neutralising an acid with an alkali', textMn: 'Хүчлийг шүлтээр саармагжуулах' },
      { id: 'C', textEn: 'Dissolving ammonium nitrate in water, so the water becomes colder', textMn: 'Аммонийн нитратыг усанд уусгах, ус хөрнө' },
      { id: 'D', textEn: 'Magnesium reacting with hydrochloric acid', textMn: 'Магни хлорсутөрөгчийн хүчилтэй урвалд орох' }
    ],
    correctMcqOption: 'C',
    hintEn: 'An endothermic change makes its surroundings colder.',
    hintMn: 'Эндотерм өөрчлөлт орчноо хөргөдөг.',
    stepsEn: [
      'Dissolving ammonium nitrate takes in heat, so the water temperature falls.',
      'Burning, neutralisation and reacting with metals all give out heat (exothermic).'
    ],
    stepsMn: [
      'Аммонийн нитрат уусахад дулаан шингээгдэж, усны температур буурна.',
      'Шатах, саармагжилт, металлтай урвал бүгд дулаан ялгаруулдаг (экзотерм).'
    ],
    marks: 1
  },
  {
    id: 'pr-c4-1',
    category: 'Electrolysis Products',
    categoryMn: 'Электролизийн бүтээгдэхүүн',
    difficulty: 'easy',
    syllabusRef: '0620/4.1',
    titleEn: 'Gas at the anode in brine',
    titleMn: 'Давсны уусмалын анод дээрх хий',
    questionEn: 'Concentrated sodium chloride solution is electrolysed with inert electrodes. Which gas is produced at the anode?',
    questionMn: 'Төвлөрсөн натрийн хлоридын уусмалыг идэвхгүй электродоор электролиз хийхэд анод дээр ямар хий үүсэх вэ?',
    type: 'mcq',
    mcqOptions: [
      { id: 'A', textEn: 'Hydrogen', textMn: 'Устөрөгч' },
      { id: 'B', textEn: 'Oxygen', textMn: 'Хүчилтөрөгч' },
      { id: 'C', textEn: 'Chlorine', textMn: 'Хлор' },
      { id: 'D', textEn: 'Sodium', textMn: 'Натри' }
    ],
    correctMcqOption: 'C',
    hintEn: 'Negative ions move to the anode. Which negative ion is in concentrated brine?',
    hintMn: 'Сөрөг ион анод руу очно. Төвлөрсөн давсны уусмалд ямар сөрөг ион байгаа вэ?',
    stepsEn: [
      'The anode is where oxidation happens, so negative ions give up electrons.',
      'In concentrated brine Cl⁻ is discharged: 2Cl⁻ → Cl₂ + 2e⁻.'
    ],
    stepsMn: [
      'Анод дээр исэлдэлт явагдах тул сөрөг ион электрон өгнө.',
      'Төвлөрсөн давсны уусмалд Cl⁻ ялгарна: 2Cl⁻ → Cl₂ + 2e⁻.'
    ],
    marks: 1
  },
  {
    id: 'pr-c4-2',
    category: 'Electrolysis Volumes',
    categoryMn: 'Электролизийн эзлэхүүн',
    difficulty: 'medium',
    syllabusRef: '0620/4.2',
    titleEn: 'Gas volumes in the electrolysis of water',
    titleMn: 'Усны электролизийн хийн эзлэхүүн',
    questionEn: 'Water is electrolysed. 24.0 cm³ of hydrogen is collected at the cathode. What volume of oxygen is collected at the anode in the same time, at the same temperature and pressure? Give the answer in cm³.',
    questionMn: 'Усыг электролиз хийхэд катод дээр 24.0 см³ устөрөгч цугларлаа. Ижил хугацаанд, ижил температур, даралтанд анод дээр хэдэн см³ хүчилтөрөгч цугларах вэ?',
    type: 'numeric',
    unit: 'cm³',
    correctNumericAnswer: 12,
    tolerance: 0.1,
    hintEn: 'The equation 2H₂O → 2H₂ + O₂ gives the volume ratio of hydrogen to oxygen.',
    hintMn: '2H₂O → 2H₂ + O₂ тэгшитгэл устөрөгч ба хүчилтөрөгчийн эзлэхүүний харьцааг өгнө.',
    stepsEn: [
      'Hydrogen : oxygen = 2 : 1 by volume',
      'Oxygen = 24.0 ÷ 2 = 12.0 cm³'
    ],
    stepsMn: [
      'Устөрөгч : хүчилтөрөгч = 2 : 1 (эзлэхүүнээр)',
      'Хүчилтөрөгч = 24.0 ÷ 2 = 12.0 см³'
    ],
    marks: 2
  },
  {
    id: 'pr-c4-3',
    category: 'Electrolysis Products',
    categoryMn: 'Электролизийн бүтээгдэхүүн',
    difficulty: 'medium',
    syllabusRef: '0620/4.1',
    titleEn: 'Product at the cathode of molten lead(II) bromide',
    titleMn: 'Хайлсан хар тугалганы(II) бромидын катод дээрх бүтээгдэхүүн',
    questionEn: 'Molten lead(II) bromide is electrolysed. Which product is formed at the cathode?',
    questionMn: 'Хайлсан хар тугалганы(II) бромидыг электролиз хийхэд катод дээр ямар бүтээгдэхүүн үүсэх вэ?',
    type: 'mcq',
    mcqOptions: [
      { id: 'A', textEn: 'Bromine', textMn: 'Бром' },
      { id: 'B', textEn: 'Lead', textMn: 'Хар тугалга' },
      { id: 'C', textEn: 'Hydrogen', textMn: 'Устөрөгч' },
      { id: 'D', textEn: 'Oxygen', textMn: 'Хүчилтөрөгч' }
    ],
    correctMcqOption: 'B',
    hintEn: 'Positive metal ions are reduced at the cathode. Which positive ion is in molten lead(II) bromide?',
    hintMn: 'Катод дээр эерэг металл ион ангижирна. Хайлсан хар тугалганы(II) бромидод ямар эерэг ион байгаа вэ?',
    stepsEn: [
      'The cathode is where reduction happens, so positive ions gain electrons.',
      'Pb²⁺ + 2e⁻ → Pb: lead forms at the cathode.'
    ],
    stepsMn: [
      'Катод дээр ангижрал явагдах тул эерэг ион электрон авна.',
      'Pb²⁺ + 2e⁻ → Pb: катод дээр хар тугалга үүснэ.'
    ],
    marks: 1
  },
  {
    id: 'pr-c4-4',
    category: 'Electrode Reactions',
    categoryMn: 'Электродын урвал',
    difficulty: 'easy',
    syllabusRef: '0620/4.1',
    titleEn: 'What happens at the anode',
    titleMn: 'Анод дээр юу болох вэ',
    questionEn: 'During electrolysis, what happens at the anode?',
    questionMn: 'Электролизийн үед анод дээр юу болох вэ?',
    type: 'mcq',
    mcqOptions: [
      { id: 'A', textEn: 'Ions gain electrons (reduction)', textMn: 'Ион электрон авна (ангижрал)' },
      { id: 'B', textEn: 'Ions lose electrons (oxidation)', textMn: 'Ион электрон алдана (исэлдэлт)' },
      { id: 'C', textEn: 'Ions gain protons', textMn: 'Ион протон авна' },
      { id: 'D', textEn: 'Nothing happens', textMn: 'Юу ч болохгүй' }
    ],
    correctMcqOption: 'B',
    hintEn: 'The anode is positive and attracts negative ions, which give up electrons.',
    hintMn: 'Анод эерэг тул сөрөг ионыг татаж, тэд электрон өгнө.',
    stepsEn: [
      'Oxidation is the loss of electrons.',
      'At the anode negative ions lose electrons, so the anode reaction is oxidation.'
    ],
    stepsMn: [
      'Исэлдэлт гэдэг нь электрон алдах явдал.',
      'Анод дээр сөрөг ион электрон алдах тул анодын урвал исэлдэлт.'
    ],
    marks: 1
  },
  {
    id: 'pr-c6-1',
    category: 'Rate of Reaction',
    categoryMn: 'Урвалын хурд',
    difficulty: 'easy',
    syllabusRef: '0620/6.2',
    titleEn: 'Average rate from a gas syringe',
    titleMn: 'Хийн шприцээр урвалын дундаж хурд',
    questionEn: 'A gas syringe collects 48 cm³ of gas in 80 s. Calculate the average rate of reaction in cm³/s.',
    questionMn: 'Хийн шприц 80 секундэд 48 см³ хий цуглуулав. Урвалын дундаж хурдыг см³/с-аар тооцоол.',
    type: 'numeric',
    unit: 'cm³/s',
    correctNumericAnswer: 0.6,
    tolerance: 0.02,
    hintEn: 'Average rate = volume ÷ time.',
    hintMn: 'Дундаж хурд = эзлэхүүн ÷ хугацаа.',
    stepsEn: ['Rate = 48 ÷ 80 = 0.60 cm³/s'],
    stepsMn: ['Хурд = 48 ÷ 80 = 0.60 см³/с'],
    marks: 1
  },
  {
    id: 'pr-c6-2',
    category: 'Rate of Reaction',
    categoryMn: 'Урвалын хурд',
    difficulty: 'medium',
    syllabusRef: '0620/6.2',
    titleEn: 'Rate from a loss of mass',
    titleMn: 'Массын алдагдлаар урвалын хурд',
    questionEn: 'A solid loses 2.40 g of mass in 60 s. Calculate the average rate of reaction in g/min.',
    questionMn: 'Хатуу бодис 60 секундэд 2.40 г масс алдав. Урвалын дундаж хурдыг г/мин-аар тооцоол.',
    type: 'numeric',
    unit: 'g/min',
    correctNumericAnswer: 2.4,
    tolerance: 0.05,
    hintEn: 'Convert seconds to minutes first: 60 s = 1 min.',
    hintMn: 'Эхлээд секундийг минут болго: 60 с = 1 мин.',
    stepsEn: [
      '60 s = 1 min',
      'Rate = 2.40 ÷ 1 = 2.40 g/min'
    ],
    stepsMn: [
      '60 с = 1 мин',
      'Хурд = 2.40 ÷ 1 = 2.40 г/мин'
    ],
    marks: 2
  },
  {
    id: 'pr-c6-3',
    category: 'Reversible Reactions',
    categoryMn: 'Эргэх урвал',
    difficulty: 'medium',
    syllabusRef: '0620/6.3',
    titleEn: 'Changing the yield of an exothermic reaction',
    titleMn: 'Экзотерм урвалын гарцыг өөрчлөх',
    questionEn: 'The forward reaction is exothermic: A + B ⇌ C + heat. Which change increases the yield of C at equilibrium?',
    questionMn: 'Урагш урвал экзотерм: A + B ⇌ C + дулаан. Аль өөрчлөлт тэнцвэрт C-ийн гарцыг нэмэгдүүлэх вэ?',
    type: 'mcq',
    mcqOptions: [
      { id: 'A', textEn: 'Increase the temperature', textMn: 'Температурыг нэмэх' },
      { id: 'B', textEn: 'Decrease the temperature', textMn: 'Температурыг бууруулах' },
      { id: 'C', textEn: 'Add a catalyst', textMn: 'Катализатор нэмэх' },
      { id: 'D', textEn: 'Increase the volume of the container', textMn: 'Саванд эзлэхүүн нэмэх' }
    ],
    correctMcqOption: 'B',
    hintEn: 'Le Chatelier: equilibrium moves to oppose a change. Cooling favours the exothermic direction.',
    hintMn: 'Ле Шателье: тэнцвэр өөрчлөлтийг сааруулах чиглэлд шилжинэ. Хөргөх нь экзотерм чиглэлийг дэмжинэ.',
    stepsEn: [
      'The forward reaction gives out heat.',
      'A lower temperature shifts equilibrium to the right, so more C forms. A catalyst speeds up both directions and does not change the yield.'
    ],
    stepsMn: [
      'Урагш урвал дулаан ялгаруулна.',
      'Температур буурвал тэнцвэр баруун тийш шилжиж C илүү үүснэ. Катализатор хоёр чиглэлийг адил хурдасгаж, гарцыг өөрчлөхгүй.'
    ],
    marks: 1
  },
  {
    id: 'pr-c6-4',
    category: 'Redox',
    categoryMn: 'Исэлдэлт-бууралт',
    difficulty: 'medium',
    syllabusRef: '0620/6.4',
    titleEn: 'Oxidation number of manganese in MnO₄⁻',
    titleMn: 'MnO₄⁻-д манганы исэлдэлтийн тоо',
    questionEn: 'Find the oxidation number of manganese in the manganate(VII) ion, MnO₄⁻.',
    questionMn: 'Манганат(VII) ион MnO₄⁻-д манганы исэлдэлтийн тоог ол.',
    type: 'numeric',
    correctNumericAnswer: 7,
    tolerance: 0.1,
    hintEn: 'Oxygen is −2 and the ion has an overall charge of −1.',
    hintMn: 'Хүчилтөрөгч −2, ионы нийт цэнэг −1.',
    stepsEn: [
      'Mn + 4 × (−2) = −1',
      'Mn = −1 + 8 = +7'
    ],
    stepsMn: [
      'Mn + 4 × (−2) = −1',
      'Mn = −1 + 8 = +7'
    ],
    marks: 2
  },
  {
    id: 'pr-c7-1',
    category: 'Concentration',
    categoryMn: 'Концентраци',
    difficulty: 'easy',
    syllabusRef: '0620/7.2',
    titleEn: 'Concentration of a sodium hydroxide solution',
    titleMn: 'Натрийн гидроксидын уусмалын концентраци',
    questionEn: '4.00 g of sodium hydroxide is dissolved to make 250 cm³ of solution. Calculate the concentration in mol/dm³. [Ar: Na = 23, O = 16, H = 1]',
    questionMn: '4.00 г натрийн гидроксидыг уусгаж 250 см³ уусмал гаргав. Концентрацийг моль/дм³-аар тооцоол. [Ar: Na = 23, O = 16, H = 1]',
    type: 'numeric',
    unit: 'mol/dm³',
    correctNumericAnswer: 0.4,
    tolerance: 0.01,
    hintEn: 'Mr(NaOH) = 40. Convert cm³ to dm³ by dividing by 1000.',
    hintMn: 'Mr(NaOH) = 40. см³-г дм³ руу 1000-д хуваан хөрвүүл.',
    stepsEn: [
      'n = 4.00 ÷ 40 = 0.100 mol',
      'V = 250 ÷ 1000 = 0.250 dm³',
      'c = 0.100 ÷ 0.250 = 0.40 mol/dm³'
    ],
    stepsMn: [
      'n = 4.00 ÷ 40 = 0.100 моль',
      'V = 250 ÷ 1000 = 0.250 дм³',
      'c = 0.100 ÷ 0.250 = 0.40 моль/дм³'
    ],
    marks: 2
  },
  {
    id: 'pr-c7-2',
    category: 'Titration',
    categoryMn: 'Титрлэлт',
    difficulty: 'medium',
    syllabusRef: '0620/7.2',
    titleEn: 'Concentration of an acid from a titration',
    titleMn: 'Титрлэлтээр хүчлийн концентраци',
    questionEn: '25.0 cm³ of 0.100 mol/dm³ sodium hydroxide is neutralised by 20.0 cm³ of hydrochloric acid. Calculate the concentration of the acid in mol/dm³. (NaOH + HCl → NaCl + H₂O, ratio 1 : 1)',
    questionMn: '25.0 см³ 0.100 моль/дм³ натрийн гидроксидыг 20.0 см³ хлорсутөрөгчийн хүчлээр саармагжуулав. Хүчлийн концентрацийг моль/дм³-аар тооцоол. (NaOH + HCl → NaCl + H₂O, харьцаа 1 : 1)',
    type: 'numeric',
    unit: 'mol/dm³',
    correctNumericAnswer: 0.125,
    tolerance: 0.002,
    hintEn: 'The ratio is 1 : 1, so the moles of NaOH equal the moles of HCl.',
    hintMn: 'Харьцаа 1 : 1 тул NaOH-ийн моль HCl-ийн молитой тэнцүү.',
    stepsEn: [
      'n(NaOH) = 0.100 × 0.0250 = 0.00250 mol',
      'n(HCl) = 0.00250 mol',
      'c(HCl) = 0.00250 ÷ 0.0200 = 0.125 mol/dm³'
    ],
    stepsMn: [
      'n(NaOH) = 0.100 × 0.0250 = 0.00250 моль',
      'n(HCl) = 0.00250 моль',
      'c(HCl) = 0.00250 ÷ 0.0200 = 0.125 моль/дм³'
    ],
    marks: 3
  },
  {
    id: 'pr-c7-3',
    category: 'Salts',
    categoryMn: 'Давс',
    difficulty: 'easy',
    syllabusRef: '0620/7.3',
    titleEn: 'Choosing the salt from an acid and a base',
    titleMn: 'Хүчил ба суурийн давсыг сонгох',
    questionEn: 'Which salt is made when dilute sulfuric acid reacts with copper(II) oxide?',
    questionMn: 'Шингэрүүлсэн хүхрийн хүчил зэсийн(II) исэлтэй урвалд орвол аль давс үүсэх вэ?',
    type: 'mcq',
    mcqOptions: [
      { id: 'A', textEn: 'Copper(II) chloride', textMn: 'Зэсийн(II) хлорид' },
      { id: 'B', textEn: 'Copper(II) sulfate', textMn: 'Зэсийн(II) сульфат' },
      { id: 'C', textEn: 'Copper(II) nitrate', textMn: 'Зэсийн(II) нитрат' },
      { id: 'D', textEn: 'Copper(II) sulfide', textMn: 'Зэсийн(II) сульфид' }
    ],
    correctMcqOption: 'B',
    hintEn: 'Sulfuric acid gives sulfate salts. The metal of the base goes into the salt.',
    hintMn: 'Хүхрийн хүчил сульфат давс өгнө. Суурийн металл давсанд орно.',
    stepsEn: [
      'H₂SO₄ + CuO → CuSO₄ + H₂O',
      'Sulfuric acid gives sulfate salts.'
    ],
    stepsMn: [
      'H₂SO₄ + CuO → CuSO₄ + H₂O',
      'Хүхрийн хүчил сульфат давс өгнө.'
    ],
    marks: 1
  },
  {
    id: 'pr-c7-4',
    category: 'Reacting Masses',
    categoryMn: 'Урвалын масс',
    difficulty: 'medium',
    syllabusRef: '0620/7.3',
    titleEn: 'Mass of salt from magnesium and sulfuric acid',
    titleMn: 'Магни ба хүхрийн хүчлээс давсны масс',
    questionEn: '2.40 g of magnesium reacts completely with dilute sulfuric acid: Mg + H₂SO₄ → MgSO₄ + H₂. Calculate the mass of magnesium sulfate produced. [Ar: Mg = 24, S = 32, O = 16]',
    questionMn: '2.40 г магни шингэрүүлсэн хүхрийн хүчилтэй бүрэн урвалд орно: Mg + H₂SO₄ → MgSO₄ + H₂. Үүссэн магнийн сульфатын массыг тооцоол. [Ar: Mg = 24, S = 32, O = 16]',
    type: 'numeric',
    unit: 'g',
    correctNumericAnswer: 12.0,
    tolerance: 0.1,
    hintEn: 'Mr(MgSO₄) = 120. Moles of MgSO₄ equal moles of Mg.',
    hintMn: 'Mr(MgSO₄) = 120. MgSO₄-ийн моль нь Mg-ийн молитой тэнцүү.',
    stepsEn: [
      'n(Mg) = 2.40 ÷ 24 = 0.100 mol',
      'n(MgSO₄) = 0.100 mol',
      'm = 0.100 × 120 = 12.0 g'
    ],
    stepsMn: [
      'n(Mg) = 2.40 ÷ 24 = 0.100 моль',
      'n(MgSO₄) = 0.100 моль',
      'm = 0.100 × 120 = 12.0 г'
    ],
    marks: 3
  },
  {
    id: 'pr-9a-1',
    category: 'Relative Masses',
    categoryMn: 'Харьцангуй масс',
    difficulty: 'easy',
    syllabusRef: '9701/2.1',
    titleEn: 'Relative formula mass of aluminium sulfate',
    titleMn: 'Алюминийн сульфатын харьцангуй томьёоны масс',
    questionEn: 'Calculate the relative formula mass (Mr) of aluminium sulfate, Al₂(SO₄)₃. [Ar: Al = 27, S = 32, O = 16]',
    questionMn: 'Алюминийн сульфат Al₂(SO₄)₃-ийн харьцангуй томьёоны массыг (Mr) тооцоол. [Ar: Al = 27, S = 32, O = 16]',
    type: 'numeric',
    correctNumericAnswer: 342,
    tolerance: 0.5,
    hintEn: 'Count every atom in the formula, including those inside the brackets.',
    hintMn: 'Томьёо дахь бүх атомыг тоолно, хаалт доторхыг нь ч оруулна.',
    stepsEn: [
      '2 × Al = 2 × 27 = 54',
      '3 × SO₄ = 3 × (32 + 64) = 288',
      'Mr = 54 + 288 = 342'
    ],
    stepsMn: [
      '2 × Al = 2 × 27 = 54',
      '3 × SO₄ = 3 × (32 + 64) = 288',
      'Mr = 54 + 288 = 342'
    ],
    marks: 2
  },
  {
    id: 'pr-9a-2',
    category: 'Atoms and Moles',
    categoryMn: 'Атом ба моль',
    difficulty: 'easy',
    syllabusRef: '9701/2.3',
    titleEn: 'Moles of atoms in carbon dioxide',
    titleMn: 'Нүүрсхүчлийн хийн атомын моль',
    questionEn: 'How many moles of atoms are present in 0.500 mol of carbon dioxide, CO₂?',
    questionMn: '0.500 моль нүүрсхүчлийн хий CO₂-д хэдэн моль атом байгаа вэ?',
    type: 'numeric',
    unit: 'mol',
    correctNumericAnswer: 1.5,
    tolerance: 0.01,
    hintEn: 'Each CO₂ molecule contains 3 atoms.',
    hintMn: 'CO₂ молекул бүрт 3 атом байна.',
    stepsEn: [
      'Atoms per molecule = 1 C + 2 O = 3',
      'Moles of atoms = 0.500 × 3 = 1.50 mol'
    ],
    stepsMn: [
      'Молекул бүрт атом = 1 C + 2 O = 3',
      'Атомын моль = 0.500 × 3 = 1.50 моль'
    ],
    marks: 2
  },
  {
    id: 'pr-9a-3',
    category: 'Empirical Formula',
    categoryMn: 'Эмпирик томьёо',
    difficulty: 'medium',
    syllabusRef: '9701/2.5',
    titleEn: 'Empirical formula from percentage composition',
    titleMn: 'Массын хувиас эмпирик томьёо',
    questionEn: 'A compound contains 40.0% carbon, 6.7% hydrogen and 53.3% oxygen by mass. What is its empirical formula? [Ar: C = 12, H = 1, O = 16]',
    questionMn: 'Нэгдэл массаараа 40.0% нүүрстөрөгч, 6.7% устөрөгч, 53.3% хүчилтөрөгч агуулдаг. Түүний эмпирик томьёо юу вэ? [Ar: C = 12, H = 1, O = 16]',
    type: 'mcq',
    mcqOptions: [
      { id: 'A', textEn: 'CH₂O', textMn: 'CH₂O' },
      { id: 'B', textEn: 'CH₄O', textMn: 'CH₄O' },
      { id: 'C', textEn: 'C₂H₂O', textMn: 'C₂H₂O' },
      { id: 'D', textEn: 'C₃H₈O', textMn: 'C₃H₈O' }
    ],
    correctMcqOption: 'A',
    hintEn: 'Divide each percentage by Ar, then divide by the smallest value.',
    hintMn: 'Хувь бүрийг Ar-д хуваа, дараа нь хамгийн бага утгад хуваа.',
    stepsEn: [
      'C : H : O = 40.0/12 : 6.7/1 : 53.3/16 = 3.33 : 6.7 : 3.33',
      'Divide by 3.33: 1 : 2 : 1, so the empirical formula is CH₂O.'
    ],
    stepsMn: [
      'C : H : O = 40.0/12 : 6.7/1 : 53.3/16 = 3.33 : 6.7 : 3.33',
      '3.33-т хуваавал 1 : 2 : 1, тиймээс эмпирик томьёо CH₂O.'
    ],
    marks: 2
  },
  {
    id: 'pr-9a-4',
    category: 'Reacting Masses',
    categoryMn: 'Урвалын масс',
    difficulty: 'medium',
    syllabusRef: '9701/2.7',
    titleEn: 'Mass of carbon dioxide from calcium carbonate',
    titleMn: 'Кальцийн карбонатаас нүүрсхүчлийн хийн масс',
    questionEn: 'Calcium carbonate reacts with excess hydrochloric acid: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Calculate the mass of carbon dioxide produced from 10.0 g of calcium carbonate. [Ar: Ca = 40, C = 12, O = 16]',
    questionMn: 'Кальцийн карбонат илүүдэл хлорсутөрөгчийн хүчилтэй урвалд орно: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. 10.0 г кальцийн карбонатаас үүсэх нүүрсхүчлийн хийн массыг тооцоол. [Ar: Ca = 40, C = 12, O = 16]',
    type: 'numeric',
    unit: 'g',
    correctNumericAnswer: 4.4,
    tolerance: 0.05,
    hintEn: 'Mr(CaCO₃) = 100 and Mr(CO₂) = 44. Moles of CO₂ equal moles of CaCO₃.',
    hintMn: 'Mr(CaCO₃) = 100, Mr(CO₂) = 44. CO₂-ийн моль нь CaCO₃-ийн молитой тэнцүү.',
    stepsEn: [
      'n(CaCO₃) = 10.0 ÷ 100 = 0.100 mol',
      'n(CO₂) = 0.100 mol',
      'm(CO₂) = 0.100 × 44 = 4.40 g'
    ],
    stepsMn: [
      'n(CaCO₃) = 10.0 ÷ 100 = 0.100 моль',
      'n(CO₂) = 0.100 моль',
      'm(CO₂) = 0.100 × 44 = 4.40 г'
    ],
    marks: 2
  },
  {
    id: 'pr-9g-1',
    category: 'Ideal Gas Equation',
    categoryMn: 'Идеал хийн тэгшитгэл',
    difficulty: 'medium',
    syllabusRef: '9701/4.2',
    titleEn: 'Volume of an ideal gas from pV = nRT',
    titleMn: 'Идеал хийн эзлэхүүн pV = nRT-ээр',
    questionEn: 'Calculate the volume, in dm³, occupied by 0.250 mol of an ideal gas at 300 K and 100 kPa. (R = 8.31 J K⁻¹ mol⁻¹)',
    questionMn: '300 K ба 100 kPa даралтанд 0.250 моль идеал хийн эзлэх эзлэхүүнийг дм³-аар тооцоол. (R = 8.31 Ж K⁻¹ моль⁻¹)',
    type: 'numeric',
    unit: 'dm³',
    correctNumericAnswer: 6.23,
    tolerance: 0.05,
    hintEn: 'Rearrange pV = nRT to V = nRT ÷ p, and use p in pascals.',
    hintMn: 'pV = nRT-г V = nRT ÷ p хэлбэрт оруулж, p-г паскаль-аар ав.',
    stepsEn: [
      'p = 100 kPa = 100 000 Pa',
      'V = (0.250 × 8.31 × 300) ÷ 100 000 = 0.00623 m³',
      '0.00623 m³ = 6.23 dm³'
    ],
    stepsMn: [
      'p = 100 kPa = 100 000 Pa',
      'V = (0.250 × 8.31 × 300) ÷ 100 000 = 0.00623 м³',
      '0.00623 м³ = 6.23 дм³'
    ],
    marks: 2
  },
  {
    id: 'pr-9g-2',
    category: 'Ideal Gas Equation',
    categoryMn: 'Идеал хийн тэгшитгэл',
    difficulty: 'hard',
    syllabusRef: '9701/4.2',
    titleEn: 'Density of a gas from its molar mass',
    titleMn: 'Хийн нягтыг молийн массаар',
    questionEn: 'Calculate the density, in g/dm³, of a gas with molar mass 44 g/mol at 300 K and 100 kPa. (R = 8.31 J K⁻¹ mol⁻¹)',
    questionMn: 'Молийн масс 44 г/моль бүхий хийн нягтыг 300 K ба 100 kPa-д г/дм³-аар тооцоол. (R = 8.31 Ж K⁻¹ моль⁻¹)',
    type: 'numeric',
    unit: 'g/dm³',
    correctNumericAnswer: 1.76,
    tolerance: 0.02,
    hintEn: 'Density = pM ÷ RT, using SI units.',
    hintMn: 'Нягт = pM ÷ RT, SI нэгжээр.',
    stepsEn: [
      'pM = 100 000 × 0.044 = 4400',
      'RT = 8.31 × 300 = 2493',
      'Density = 4400 ÷ 2493 = 1.765 kg/m³ = 1.765 g/dm³'
    ],
    stepsMn: [
      'pM = 100 000 × 0.044 = 4400',
      'RT = 8.31 × 300 = 2493',
      'Нягт = 4400 ÷ 2493 = 1.765 кг/м³ = 1.765 г/дм³'
    ],
    marks: 3
  },
  {
    id: 'pr-9g-3',
    category: 'Partial Pressure',
    categoryMn: 'Хэсэгчилсэн даралт',
    difficulty: 'medium',
    syllabusRef: '9701/4.2',
    titleEn: 'Partial pressure of helium in a mixture',
    titleMn: 'Холимог дахь гелийн хэсэгчилсэн даралт',
    questionEn: 'A gas mixture contains 0.20 mol of helium and 0.80 mol of neon. The total pressure is 200 kPa. Calculate the partial pressure of helium in kPa.',
    questionMn: 'Хийн холимог 0.20 моль гели ба 0.80 моль неон агуулна. Нийт даралт 200 kPa. Гелийн хэсэгчилсэн даралтыг kPa-аар тооцоол.',
    type: 'numeric',
    unit: 'kPa',
    correctNumericAnswer: 40,
    tolerance: 0.5,
    hintEn: 'Partial pressure = mole fraction × total pressure.',
    hintMn: 'Хэсэгчилсэн даралт = молийн хувь × нийт даралт.',
    stepsEn: [
      'Mole fraction of He = 0.20 ÷ (0.20 + 0.80) = 0.20',
      'p(He) = 0.20 × 200 = 40 kPa'
    ],
    stepsMn: [
      'He-ийн молийн хувь = 0.20 ÷ (0.20 + 0.80) = 0.20',
      'p(He) = 0.20 × 200 = 40 kPa'
    ],
    marks: 2
  },
  {
    id: 'pr-9g-4',
    category: 'Kinetic Theory',
    categoryMn: 'Кинетик онол',
    difficulty: 'easy',
    syllabusRef: '9701/4.1',
    titleEn: 'Pressure of a gas at constant volume',
    titleMn: 'Тогтмол эзлэхүүн дэх хийн даралт',
    questionEn: 'At constant volume, which change increases the pressure of a fixed mass of gas?',
    questionMn: 'Тогтмол эзлэхүүнд хийн тогтмол массын даралтыг аль өөрчлөлт нэмэгдүүлэх вэ?',
    type: 'mcq',
    mcqOptions: [
      { id: 'A', textEn: 'Decrease the temperature', textMn: 'Температурыг бууруулах' },
      { id: 'B', textEn: 'Increase the temperature', textMn: 'Температурыг нэмэх' },
      { id: 'C', textEn: 'Increase the volume', textMn: 'Эзлэхүүнийг нэмэх' },
      { id: 'D', textEn: 'Remove some of the gas', textMn: 'Хийн зарим хэсгийг зайлуулах' }
    ],
    correctMcqOption: 'B',
    hintEn: 'Pressure comes from particles hitting the walls. Which change makes them move faster?',
    hintMn: 'Даралт нь бөөмс ханыг цохихоос үүснэ. Аль өөрчлөлт тэдгээрийг хурдан хөдөлгөх вэ?',
    stepsEn: [
      'Higher temperature gives the particles more kinetic energy.',
      'They hit the walls harder and more often, so the pressure rises.'
    ],
    stepsMn: [
      'Температур өсвөл бөөмс илүү кинетик энерги авна.',
      'Тэд ханыг илүү хүчтэй, олонтаа цохино, тиймээс даралт нэмэгдэнэ.'
    ],
    marks: 1
  },
  {
    id: 'pr-9h-1',
    category: 'Enthalpy from Formation',
    categoryMn: 'Үүсэх энтальпиор ΔH',
    difficulty: 'medium',
    syllabusRef: '9701/5.2',
    titleEn: 'Enthalpy of combustion of methane from formation values',
    titleMn: 'Метаны шаталтын ΔH үүсэх энтальпиор',
    questionEn: 'Standard enthalpy changes of formation: CH₄(g) = −75 kJ/mol, CO₂(g) = −394 kJ/mol, H₂O(l) = −286 kJ/mol. Calculate ΔH for CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), in kJ/mol.',
    questionMn: 'Стандарт үүсэх энтальпи: CH₄(g) = −75 кЖ/моль, CO₂(g) = −394 кЖ/моль, H₂O(l) = −286 кЖ/моль. CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) урвалын ΔH-ийг кЖ/моль-оор тооцоол.',
    type: 'numeric',
    unit: 'kJ/mol',
    correctNumericAnswer: -891,
    tolerance: 1,
    hintEn: 'ΔH = sum of ΔHf (products) − sum of ΔHf (reactants). The element O₂ has ΔHf = 0.',
    hintMn: 'ΔH = бүтээгдэхүүний ΔHf-ийн нийлбэр − урвалд орох бодисын ΔHf-ийн нийлбэр. O₂ элемент ΔHf = 0.',
    stepsEn: [
      'ΔH = [−394 + 2(−286)] − [−75 + 0]',
      '= −966 + 75 = −891 kJ/mol'
    ],
    stepsMn: [
      'ΔH = [−394 + 2(−286)] − [−75 + 0]',
      '= −966 + 75 = −891 кЖ/моль'
    ],
    marks: 2
  },
  {
    id: 'pr-9h-2',
    category: "Hess's Law",
    categoryMn: 'Хессийн хууль',
    difficulty: 'medium',
    syllabusRef: '9701/5.3',
    titleEn: 'Enthalpy of forming carbon monoxide by Hess cycle',
    titleMn: 'Хессийн мөчлөгөөр CO үүсэх ΔH',
    questionEn: 'Given: C(s) + O₂(g) → CO₂(g), ΔH = −394 kJ/mol; CO(g) + ½O₂(g) → CO₂(g), ΔH = −283 kJ/mol. Calculate ΔH for C(s) + ½O₂(g) → CO(g), in kJ/mol.',
    questionMn: 'Өгөгдсөн: C(s) + O₂(g) → CO₂(g), ΔH = −394 кЖ/моль; CO(g) + ½O₂(g) → CO₂(g), ΔH = −283 кЖ/моль. C(s) + ½O₂(g) → CO(g) урвалын ΔH-ийг кЖ/моль-оор тооцоол.',
    type: 'numeric',
    unit: 'kJ/mol',
    correctNumericAnswer: -111,
    tolerance: 0.5,
    hintEn: 'Reverse the second equation, which changes the sign of its ΔH, and add it to the first.',
    hintMn: 'Хоёр дахь тэгшитгэлийг эсрэгээр бич (ΔH-ийн тэмдэг солигдоно), дараа нь эхнийхтэй нэм.',
    stepsEn: [
      'Reverse the second: CO₂(g) → CO(g) + ½O₂(g), ΔH = +283 kJ/mol',
      'Add to the first: C(s) + ½O₂(g) → CO(g)',
      'ΔH = −394 + 283 = −111 kJ/mol'
    ],
    stepsMn: [
      'Хоёр дахийг эсрэгээр: CO₂(g) → CO(g) + ½O₂(g), ΔH = +283 кЖ/моль',
      'Эхнийхтэй нэмэхэд: C(s) + ½O₂(g) → CO(g)',
      'ΔH = −394 + 283 = −111 кЖ/моль'
    ],
    marks: 2
  },
  {
    id: 'pr-9h-3',
    category: 'Calorimetry',
    categoryMn: 'Калориметр',
    difficulty: 'hard',
    syllabusRef: '9701/5.1',
    titleEn: 'Enthalpy of neutralisation from a temperature rise',
    titleMn: 'Саармагжилтын ΔH температурын өсөлтөөр',
    questionEn: '0.050 mol of hydrochloric acid reacts with excess sodium hydroxide solution. The 50.0 g of solution warms by 6.0 °C. Taking c = 4.18 J/g °C, calculate the enthalpy change of neutralisation in kJ/mol, including the sign.',
    questionMn: '0.050 моль хлорсутөрөгчийн хүчил илүүдэл натрийн гидроксидын уусмалтай урвалд орно. 50.0 г уусмал 6.0 °C халина. c = 4.18 Ж/г °C гэж үзээд саармагжилтын энтальпийн өөрчлөлтийг кЖ/моль-оор тэмдгийн хамт тооцоол.',
    type: 'numeric',
    unit: 'kJ/mol',
    correctNumericAnswer: -25.1,
    tolerance: 0.2,
    hintEn: 'q = m × c × ΔT, then divide by the moles of water formed. Heat is given out, so the sign is negative.',
    hintMn: 'q = m × c × ΔT, дараа нь үүссэн усны молиор хуваа. Дулаан ялгарах тул тэмдэг сөрөг.',
    stepsEn: [
      'q = 50.0 × 4.18 × 6.0 = 1254 J',
      'ΔH = −1254 ÷ 0.050 = −25 080 J/mol = −25.1 kJ/mol'
    ],
    stepsMn: [
      'q = 50.0 × 4.18 × 6.0 = 1254 Ж',
      'ΔH = −1254 ÷ 0.050 = −25 080 Ж/моль = −25.1 кЖ/моль'
    ],
    marks: 3
  },
  {
    id: 'pr-9h-4',
    category: 'Enthalpy of Formation',
    categoryMn: 'Үүсэх энтальпи',
    difficulty: 'easy',
    syllabusRef: '9701/5.2',
    titleEn: 'Enthalpy of formation of an element',
    titleMn: 'Элементийн үүсэх энтальпи',
    questionEn: 'What is the standard enthalpy change of formation of oxygen gas, O₂(g)?',
    questionMn: 'Хүчилтөрөгчийн хийн O₂(g) стандарт үүсэх энтальпийн өөрчлөлт хэд вэ?',
    type: 'mcq',
    mcqOptions: [
      { id: 'A', textEn: '0 kJ/mol', textMn: '0 кЖ/моль' },
      { id: 'B', textEn: '−242 kJ/mol', textMn: '−242 кЖ/моль' },
      { id: 'C', textEn: '+249 kJ/mol', textMn: '+249 кЖ/моль' },
      { id: 'D', textEn: '−286 kJ/mol', textMn: '−286 кЖ/моль' }
    ],
    correctMcqOption: 'A',
    hintEn: 'An element in its standard state is the reference point.',
    hintMn: 'Стандарт төлөвт байгаа элемент бол эталон цэг.',
    stepsEn: [
      'The standard enthalpy of formation of any element in its standard state is zero.',
      'O₂(g) is an element in its standard state, so its value is 0 kJ/mol.'
    ],
    stepsMn: [
      'Стандарт төлөвт байгаа ямар ч элементийн стандарт үүсэх энтальпи тэг.',
      'O₂(g) стандарт төлөвт байгаа элемент тул утга нь 0 кЖ/моль.'
    ],
    marks: 1
  },
  {
    id: 'pr-9i-1',
    category: 'Cell Potentials',
    categoryMn: 'Элементийн потенциал',
    difficulty: 'medium',
    syllabusRef: '9701/6.3',
    titleEn: 'Standard cell potential of copper and zinc',
    titleMn: 'Зэс ба цайрын стандарт элементийн потенциал',
    questionEn: 'Standard electrode potentials: Cu²⁺/Cu = +0.34 V, Zn²⁺/Zn = −0.76 V. Calculate the standard cell potential, E°cell, in volts, for a cell made from these two half-cells.',
    questionMn: 'Стандарт электродын потенциал: Cu²⁺/Cu = +0.34 V, Zn²⁺/Zn = −0.76 V. Эдгээр хагас элементээс бүтсэн элементийн стандарт потенциал E°cell-ийг вольтоор тооцоол.',
    type: 'numeric',
    unit: 'V',
    correctNumericAnswer: 1.1,
    tolerance: 0.01,
    hintEn: 'E°cell = E° (positive electrode) − E° (negative electrode).',
    hintMn: 'E°cell = E° (эерэг электрод) − E° (сөрөг электрод).',
    stepsEn: [
      'Positive electrode is Cu²⁺/Cu, negative is Zn²⁺/Zn',
      'E°cell = +0.34 − (−0.76) = +1.10 V'
    ],
    stepsMn: [
      'Эерэг электрод нь Cu²⁺/Cu, сөрөг нь Zn²⁺/Zn',
      'E°cell = +0.34 − (−0.76) = +1.10 V'
    ],
    marks: 2
  },
  {
    id: 'pr-9i-2',
    category: 'Cell Potentials',
    categoryMn: 'Элементийн потенциал',
    difficulty: 'medium',
    syllabusRef: '9701/6.3',
    titleEn: 'Standard cell potential of silver and iron',
    titleMn: 'Мөнгө ба төмрийн стандарт элементийн потенциал',
    questionEn: 'Standard electrode potentials: Ag⁺/Ag = +0.80 V, Fe²⁺/Fe = −0.44 V. Calculate E°cell, in volts, for a cell with silver as the positive electrode.',
    questionMn: 'Стандарт электродын потенциал: Ag⁺/Ag = +0.80 V, Fe²⁺/Fe = −0.44 V. Мөнгө эерэг электрод болсон элементийн E°cell-ийг вольтоор тооцоол.',
    type: 'numeric',
    unit: 'V',
    correctNumericAnswer: 1.24,
    tolerance: 0.01,
    hintEn: 'Subtract the negative electrode value from the positive electrode value.',
    hintMn: 'Эерэг электродын утгаас сөрөг электродын утгыг хас.',
    stepsEn: [
      'E°cell = +0.80 − (−0.44) = +1.24 V'
    ],
    stepsMn: [
      'E°cell = +0.80 − (−0.44) = +1.24 V'
    ],
    marks: 2
  },
  {
    id: 'pr-9i-3',
    category: 'Charge and Current',
    categoryMn: 'Цахилгаан цэнэг ба гүйдэл',
    difficulty: 'easy',
    syllabusRef: '9701/6.2',
    titleEn: 'Charge passed in an electrolysis',
    titleMn: 'Электролизийн үед дамжсан цэнэг',
    questionEn: 'A current of 2.0 A flows for 10 minutes. Calculate the charge passed, in coulombs.',
    questionMn: '2.0 A гүйдэл 10 минут урсав. Дамжсан цэнэгийг кулонгоор тооцоол.',
    type: 'numeric',
    unit: 'C',
    correctNumericAnswer: 1200,
    tolerance: 1,
    hintEn: 'Charge = current × time, with time in seconds.',
    hintMn: 'Цэнэг = гүйдэл × хугацаа, хугацааг секундээр ав.',
    stepsEn: [
      't = 10 × 60 = 600 s',
      'Q = I × t = 2.0 × 600 = 1200 C'
    ],
    stepsMn: [
      't = 10 × 60 = 600 с',
      'Q = I × t = 2.0 × 600 = 1200 C'
    ],
    marks: 2
  },
  {
    id: 'pr-9i-4',
    category: 'Electrolysis Mass',
    categoryMn: 'Электролизийн масс',
    difficulty: 'hard',
    syllabusRef: '9701/6.2',
    titleEn: 'Mass of silver deposited by a charge',
    titleMn: 'Цэнэгээр ялгарсан мөнгийн масс',
    questionEn: 'A charge of 1200 C is passed through silver nitrate solution, AgNO₃, with inert electrodes. Calculate the mass of silver deposited, in grams. [Faraday constant F = 96 500 C/mol; Ar: Ag = 107.9]',
    questionMn: 'AgNO₃ уусмалаар 1200 C цэнэг идэвхгүй электродоор дамжуулав. Ялгарсан мөнгийн массыг граммаар тооцоол. [Фарадейн тогтмол F = 96 500 C/моль; Ar: Ag = 107.9]',
    type: 'numeric',
    unit: 'g',
    correctNumericAnswer: 1.34,
    tolerance: 0.02,
    hintEn: 'Moles of electrons = charge ÷ F. Ag⁺ + e⁻ → Ag, so one electron deposits one silver atom.',
    hintMn: 'Электроны моль = цэнэг ÷ F. Ag⁺ + e⁻ → Ag, тиймээс нэг электрон нэг мөнгөний атом ялгана.',
    stepsEn: [
      'Moles of electrons = 1200 ÷ 96 500 = 0.01244 mol',
      'Moles of Ag = moles of electrons = 0.01244 mol',
      'Mass = 0.01244 × 107.9 = 1.34 g'
    ],
    stepsMn: [
      'Электроны моль = 1200 ÷ 96 500 = 0.01244 моль',
      'Ag-ийн моль = электроны моль = 0.01244 моль',
      'Масс = 0.01244 × 107.9 = 1.34 г'
    ],
    marks: 3
  },
  {
    id: 'pr-9j-1',
    category: 'Equilibrium Constant',
    categoryMn: 'Тэнцвэрийн тогтмол',
    difficulty: 'medium',
    syllabusRef: '9701/7.1',
    titleEn: 'Calculating Kc from equilibrium concentrations',
    titleMn: 'Тэнцвэрийн концентрацаар Kc тооцох',
    questionEn: 'For 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), the equilibrium concentrations are [SO₂] = 0.20, [O₂] = 0.10 and [SO₃] = 0.40 mol/dm³. Calculate Kc. Give the value only, in dm³ mol⁻¹.',
    questionMn: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g) тэнцвэрт концентраци: [SO₂] = 0.20, [O₂] = 0.10, [SO₃] = 0.40 моль/дм³. Kc-ийг тооцоол. Зөвхөн утгыг дм³ моль⁻¹-ээр бич.',
    type: 'numeric',
    unit: 'dm³ mol⁻¹',
    correctNumericAnswer: 40,
    tolerance: 0.5,
    hintEn: 'Kc = [SO₃]² ÷ ([SO₂]² × [O₂]). Use the powers from the equation.',
    hintMn: 'Kc = [SO₃]² ÷ ([SO₂]² × [O₂]). Үзүүлэгчийг тэгшитгэлээс ав.',
    stepsEn: [
      'Kc = [SO₃]² ÷ ([SO₂]² × [O₂])',
      '= 0.40² ÷ (0.20² × 0.10) = 0.16 ÷ 0.004 = 40 dm³ mol⁻¹'
    ],
    stepsMn: [
      'Kc = [SO₃]² ÷ ([SO₂]² × [O₂])',
      '= 0.40² ÷ (0.20² × 0.10) = 0.16 ÷ 0.004 = 40 дм³ моль⁻¹'
    ],
    marks: 2
  },
  {
    id: 'pr-9j-2',
    category: 'pH',
    categoryMn: 'pH',
    difficulty: 'easy',
    syllabusRef: '9701/7.2',
    titleEn: 'pH of a strong acid',
    titleMn: 'Хүчтэй хүчлийн pH',
    questionEn: 'Calculate the pH of 0.010 mol/dm³ hydrochloric acid, a strong acid. [pH = −log[H⁺]]',
    questionMn: '0.010 моль/дм³ хлорсутөрөгчийн хүчил (хүчтэй хүчил)-ийн pH-ийг тооцоол. [pH = −log[H⁺]]',
    type: 'numeric',
    correctNumericAnswer: 2.0,
    tolerance: 0.05,
    hintEn: 'A strong acid is fully dissociated, so [H⁺] equals the acid concentration.',
    hintMn: 'Хүчтэй хүчил бүрэн задардаг тул [H⁺] нь хүчлийн концентрацитай тэнцүү.',
    stepsEn: [
      '[H⁺] = 0.010 mol/dm³',
      'pH = −log(0.010) = 2.00'
    ],
    stepsMn: [
      '[H⁺] = 0.010 моль/дм³',
      'pH = −log(0.010) = 2.00'
    ],
    marks: 2
  },
  {
    id: 'pr-9j-3',
    category: 'pH',
    categoryMn: 'pH',
    difficulty: 'medium',
    syllabusRef: '9701/7.2',
    titleEn: 'pH of a strong alkali',
    titleMn: 'Хүчтэй шүлтийн pH',
    questionEn: 'Calculate the pH of 0.0010 mol/dm³ sodium hydroxide solution at 25 °C. [Kw = 1.00 × 10⁻¹⁴ mol² dm⁻⁶]',
    questionMn: '25 °C-т 0.0010 моль/дм³ натрийн гидроксидын уусмалын pH-ийг тооцоол. [Kw = 1.00 × 10⁻¹⁴ моль² дм⁻⁶]',
    type: 'numeric',
    correctNumericAnswer: 11.0,
    tolerance: 0.05,
    hintEn: 'Find [OH⁻] first, then pOH, then pH = 14 − pOH.',
    hintMn: 'Эхлээд [OH⁻]-ийг ол, дараа нь pOH, pH = 14 − pOH.',
    stepsEn: [
      '[OH⁻] = 0.0010 mol/dm³, so pOH = −log(0.0010) = 3.00',
      'pH = 14.00 − 3.00 = 11.00'
    ],
    stepsMn: [
      '[OH⁻] = 0.0010 моль/дм³, тиймээс pOH = −log(0.0010) = 3.00',
      'pH = 14.00 − 3.00 = 11.00'
    ],
    marks: 2
  },
  {
    id: 'pr-9j-4',
    category: 'Le Chatelier',
    categoryMn: 'Ле Шателье',
    difficulty: 'medium',
    syllabusRef: '9701/7.3',
    titleEn: 'Effect of pressure on an equilibrium',
    titleMn: 'Даралтын нөлөө тэнцвэрт байдалд',
    questionEn: 'For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), what happens to the position of equilibrium when the pressure is increased at constant temperature?',
    questionMn: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g) урвалд тогтмол температурт даралтыг нэмбэл тэнцвэр ямар чиглэлд шилжих вэ?',
    type: 'mcq',
    mcqOptions: [
      { id: 'A', textEn: 'It shifts to the left', textMn: 'Зүүн тийш шилжинэ' },
      { id: 'B', textEn: 'It shifts to the right', textMn: 'Баруун тийш шилжинэ' },
      { id: 'C', textEn: 'It does not move', textMn: 'Шилжихгүй' },
      { id: 'D', textEn: 'Kc increases', textMn: 'Kc нэмэгдэнэ' }
    ],
    correctMcqOption: 'B',
    hintEn: 'Count the moles of gas on each side of the equation.',
    hintMn: 'Тэгшитгэлийн хоёр талд хийн моль тоог тоол.',
    stepsEn: [
      'Left: 1 + 3 = 4 mol of gas. Right: 2 mol of gas.',
      'Higher pressure favours the side with fewer gas molecules, which is the right.'
    ],
    stepsMn: [
      'Зүүн: 1 + 3 = 4 моль хий. Баруун: 2 моль хий.',
      'Даралт нэмэгдвэл хийн молекул цөөн талыг дэмжих тул баруун тийш шилжинэ.'
    ],
    marks: 1
  },
  {
    id: 'pr-9k-1',
    category: 'Rate of Reaction',
    categoryMn: 'Урвалын хурд',
    difficulty: 'easy',
    syllabusRef: '9701/8.1',
    titleEn: 'Average rate from a change in concentration',
    titleMn: 'Концентрацийн өөрчлөлтөөр дундаж хурд',
    questionEn: 'The concentration of a reactant falls from 0.80 mol/dm³ to 0.60 mol/dm³ in 40 s. Calculate the average rate of reaction in mol dm⁻³ s⁻¹.',
    questionMn: 'Урвалд орох бодисын концентраци 40 секундэд 0.80 моль/дм³-аас 0.60 моль/дм³ болж буурав. Урвалын дундаж хурдыг моль дм⁻³ с⁻¹-аар тооцоол.',
    type: 'numeric',
    unit: 'mol dm⁻³ s⁻¹',
    correctNumericAnswer: 0.005,
    tolerance: 0.0002,
    hintEn: 'Rate = change in concentration ÷ time.',
    hintMn: 'Хурд = концентрацийн өөрчлөлт ÷ хугацаа.',
    stepsEn: [
      'Change = 0.80 − 0.60 = 0.20 mol/dm³',
      'Rate = 0.20 ÷ 40 = 0.005 mol dm⁻³ s⁻¹'
    ],
    stepsMn: [
      'Өөрчлөлт = 0.80 − 0.60 = 0.20 моль/дм³',
      'Хурд = 0.20 ÷ 40 = 0.005 моль дм⁻³ с⁻¹'
    ],
    marks: 2
  },
  {
    id: 'pr-9k-2',
    category: 'Half-life',
    categoryMn: 'Хагас задралын хугацаа',
    difficulty: 'medium',
    syllabusRef: '9701/8.3',
    titleEn: 'Time for a concentration to fall to 25%',
    titleMn: 'Концентрацийг 25% болгох хугацаа',
    questionEn: 'A first-order reaction has a half-life of 25 s. How long, in seconds, does it take for the concentration to fall to 25% of its initial value?',
    questionMn: 'Эхний эрэмбийн урвалын хагас задралын хугацаа 25 с. Концентраци анхны утгынхаа 25% болтлоо буурахад хэдэн секунд зарцуулагдах вэ?',
    type: 'numeric',
    unit: 's',
    correctNumericAnswer: 50,
    tolerance: 0.5,
    hintEn: 'Each half-life halves the concentration. How many halvings make 25%?',
    hintMn: 'Хагас задралын хугацаа бүрт концентраци хагасарна. 25% болгоход хэдэн хагасрах вэ?',
    stepsEn: [
      '100% → 50% → 25% is two half-lives',
      'Time = 2 × 25 = 50 s'
    ],
    stepsMn: [
      '100% → 50% → 25% нь хоёр хагас задралын хугацаа',
      'Хугацаа = 2 × 25 = 50 с'
    ],
    marks: 2
  },
  {
    id: 'pr-9k-3',
    category: 'Half-life',
    categoryMn: 'Хагас задралын хугацаа',
    difficulty: 'medium',
    syllabusRef: '9701/8.3',
    titleEn: 'Fraction remaining after several half-lives',
    titleMn: 'Хагас задралын хэд хэдэн хугацааны дараа үлдэх хувь',
    questionEn: 'A reaction has a half-life of 40 s. What fraction of the reactant remains after 120 s?',
    questionMn: 'Урвалын хагас задралын хугацаа 40 с. 120 секундын дараа урвалд орох бодисын хэдэн хувь үлдэх вэ?',
    type: 'numeric',
    correctNumericAnswer: 0.125,
    tolerance: 0.005,
    hintEn: '120 s is 3 half-lives. The fraction remaining is (1/2) raised to the number of half-lives.',
    hintMn: '120 с нь 3 хагас задралын хугацаа. Үлдэх хувь нь (1/2)-ийг хагас задралын тоонд дэвшүүлсэн утга.',
    stepsEn: [
      '120 ÷ 40 = 3 half-lives',
      'Fraction remaining = (1/2)³ = 0.125'
    ],
    stepsMn: [
      '120 ÷ 40 = 3 хагас задралын хугацаа',
      'Үлдэх хувь = (1/2)³ = 0.125'
    ],
    marks: 2
  },
  {
    id: 'pr-9k-4',
    category: 'Rate Equation',
    categoryMn: 'Урвалын хурдны тэгшитгэл',
    difficulty: 'medium',
    syllabusRef: '9701/8.2',
    titleEn: 'Effect of doubling a concentration in a second-order rate',
    titleMn: 'Хоёрдугаар эрэмбийн урвалд концентрацыг хоёрдуулах',
    questionEn: 'For a reaction with rate = k[A]², what happens to the rate when [A] is doubled?',
    questionMn: 'Хурд = k[A]² байх урвалд [A]-г хоёрдуулбал хурд ямар болох вэ?',
    type: 'mcq',
    mcqOptions: [
      { id: 'A', textEn: 'It doubles', textMn: 'Хоёр дахин нэмэгдэнэ' },
      { id: 'B', textEn: 'It increases four times', textMn: 'Дөрөв дахин нэмэгдэнэ' },
      { id: 'C', textEn: 'It increases eight times', textMn: 'Найман дахин нэмэгдэнэ' },
      { id: 'D', textEn: 'It halves', textMn: 'Хагасрана' }
    ],
    correctMcqOption: 'B',
    hintEn: 'Substitute 2[A] into the rate equation and compare with the original rate.',
    hintMn: 'Хурдны тэгшитгэлд 2[A]-г орлуулж анхны хурдтай харьцуул.',
    stepsEn: [
      'New rate = k(2[A])² = 4k[A]²',
      'The rate increases by a factor of 4.'
    ],
    stepsMn: [
      'Шинэ хурд = k(2[A])² = 4k[A]²',
      'Хурд 4 дахин нэмэгдэнэ.'
    ],
    marks: 1
  }
];

// The chapters the hub can show, with their titles and programme taken from the curriculum data
const ALL_CHAPTERS = [...CURRICULUM_CHAPTERS, ...ALEVEL_CHAPTERS];
const PICKS = CALC_CHAPTERS.map(c => ({
  ...c,
  programme: c.id.startsWith('al-') ? ('alevel' as const) : ('igcse' as const),
  chapter: ALL_CHAPTERS.find(ch => ch.id === c.id)!
}));

export const CalculationsView: React.FC = () => {
  const { mode } = useLanguage();
  const { jumpToTopic, calcChapterId, setCalcChapterId } = useApp();

  // Leaving the view clears the chapter a lesson opened it on, so the next visit starts from the first chapter
  useEffect(() => () => setCalcChapterId(null), [setCalcChapterId]);

  const [activeTab, setActiveTab] = useState<'examples' | 'practice' | 'calculator' | 'suite'>('examples');
  const [chapterId, setChapterId] = useState<string>(PICKS.find(p => p.id === calcChapterId)?.id ?? PICKS[0].id);
  const [selectedExampleId, setSelectedExampleId] = useState<string>('');

  // Practice state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [feedbackState, setFeedbackState] = useState<Record<string, { isCorrect: boolean; message: string }>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Interactive Live Calculator state
  const [calcInputMass, setCalcInputMass] = useState<string>('10.0');
  const [calcInputMr, setCalcInputMr] = useState<string>('100.0');
  const [calcSolutionVolCm3, setCalcSolutionVolCm3] = useState<string>('250.0');

  // The chosen chapter and the examples, practice problems and calculators that belong to it
  const pick = PICKS.find(p => p.id === chapterId) ?? PICKS[0];
  const chapter = pick.chapter;
  const matches = (ref: string) => pick.refs.some(r => ref.includes(r));
  const examples = [...WORKED_EXAMPLES, ...CHAPTER_WORKED_EXAMPLES].filter(e => matches(e.syllabusRef));
  const practice = PRACTICE_PROBLEMS.filter(p => matches(p.syllabusRef));
  const firstTopicId = chapter.topics[0]?.id;
  const selectedExample = examples.find(e => e.id === selectedExampleId) ?? examples[0];

  // Shown when a chapter has no examples or practice problems of its own yet
  const emptyNote = (
    <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-6 text-sm text-slate-600 dark:text-slate-300 space-y-3">
      <p>
        {mode === 'mn'
          ? 'Энэ бүлгийн жишээ ба бие даан ажиллах бодлого одоогоор бэлтгэгдээгүй байна. Бүлгийн хичээлээс тооцооллыг үзнэ үү.'
          : 'Worked examples and practice problems for this chapter are not written yet. See the calculations in the chapter lesson.'}
      </p>
      {firstTopicId && (
        <button
          onClick={() => jumpToTopic(firstTopicId)}
          className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold"
        >
          {mode === 'mn' ? 'Бүлгийн хичээл рүү очих' : 'Open the chapter lesson'}
        </button>
      )}
    </div>
  );

  const handleCheckAnswer = (problem: PracticeProblemItem) => {
    const rawVal = userAnswers[problem.id];
    if (!rawVal) return;

    if (problem.type === 'numeric') {
      const numVal = parseFloat(rawVal);
      const target = problem.correctNumericAnswer!;
      const tol = problem.tolerance || 0.05;

      const isCorrect = Math.abs(numVal - target) <= tol;
      setFeedbackState(prev => ({
        ...prev,
        [problem.id]: {
          isCorrect,
          message: isCorrect
            ? (mode === 'mn' ? `Зөв! Та бүтэн ${problem.marks}/${problem.marks} оноо авлаа.` : `Correct! Full ${problem.marks}/${problem.marks} marks awarded.`)
            : (mode === 'mn' ? `Буруу байна. Зөв хариу: ${target} ${problem.unit}. Зөвлөмж эсвэл бүтэн бодолтыг үзнэ үү.` : `Incorrect. The correct value is ${target} ${problem.unit}. Check hint or full solution.`)
        }
      }));
    }
  };

  // Live calculator computed values
  const calcMassNum = parseFloat(calcInputMass) || 0;
  const calcMrNum = parseFloat(calcInputMr) || 1;
  const calcVolDm3 = (parseFloat(calcSolutionVolCm3) || 1000) / 1000;

  const computedMoles = +(calcMassNum / calcMrNum).toFixed(4);
  const computedGasVolDm3 = +(computedMoles * 24.0).toFixed(3);
  const computedConcMolar = +(computedMoles / calcVolDm3).toFixed(4);

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 mb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {pick.programme === 'igcse' ? 'Cambridge IGCSE 0620 Quantitative Chemistry' : 'AS & A Level 9701 Calculations'}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold">
                {pick.programme === 'igcse' ? 'Topic' : 'Chapter'} {chapter.number} · {mode === 'mn' ? chapter.titleMn : chapter.titleEn}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
              {mode === 'mn' ? 'Тооцоот бодлого ба Молийн шинжилгээний төв' : 'Chemical Calculations & Stoichiometry Hub'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              {mode === 'mn'
                ? 'Кэмбрижийн шалгалтын моль, масс, хийн эзлэхүүн, титрлэлтийн концентраци, гарцын тооцоот жишээ бодлогууд болон бие дааж бодох интерактив дасгалууд.'
                : 'Comprehensive worked examples with examiner mark schemes and interactive independent practice problems with instant validation.'}
            </p>

            {/* The chapter that the examples, practice problems and calculators below belong to */}
            <label className="flex flex-wrap items-center gap-2 pt-3 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>{mode === 'mn' ? 'Бүлэг сонгох:' : 'Choose a chapter:'}</span>
              <select
                value={pick.id}
                onChange={e => setChapterId(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <optgroup label="IGCSE 0620">
                  {PICKS.filter(p => p.programme === 'igcse').map(p => (
                    <option key={p.id} value={p.id}>
                      {p.chapter.number}. {mode === 'mn' ? p.chapter.titleMn : p.chapter.titleEn}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="AS & A Level 9701">
                  {PICKS.filter(p => p.programme === 'alevel').map(p => (
                    <option key={p.id} value={p.id}>
                      {p.chapter.number}. {mode === 'mn' ? p.chapter.titleMn : p.chapter.titleEn}
                    </option>
                  ))}
                </optgroup>
              </select>
            </label>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('examples')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'examples'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{mode === 'mn' ? '1. Жишээ бодлогууд' : 'Worked Examples'}</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'practice'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{mode === 'mn' ? '2. Бие дааж бодох бодлого' : 'Independent Practice'}</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{mode === 'mn' ? '3. Молийн тооцоолуур' : 'Live Calculator'}</span>
            </button>

            <button
              onClick={() => setActiveTab('suite')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'suite'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{mode === 'mn' ? '4. Онлайн тооцоолуур' : 'Online Calculator'}</span>
            </button>
          </div>
        </div>

        {/* Fundamental Formulas Header Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Mass & Moles:</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">n = m / Mᵣ</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Gas Volume (r.t.p.):</span>
            <span className="text-teal-600 dark:text-teal-400 font-bold text-sm">V = n × 24.0 dm³</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Solution Conc:</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">c = n / V (dm³)</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Percentage Yield:</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">(Actual / Theor) × 100%</span>
          </div>
        </div>
      </div>

      {/* Mode 1: Worked Examples (Жишээ бодлого) */}
      {activeTab === 'examples' && examples.length === 0 && emptyNote}
      {activeTab === 'examples' && examples.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Example Selector List (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono block px-1">
              {mode === 'mn' ? 'Кэмбрижийн жишээ бодлогууд:' : 'Cambridge Worked Examples:'}
            </span>

            {examples.map(ex => {
              const active = ex.id === selectedExampleId;
              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExampleId(ex.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    active
                      ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-500 shadow-md ring-2 ring-amber-500/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-bold">
                      {mode === 'mn' ? ex.categoryMn : ex.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">{ex.syllabusRef}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {mode === 'mn' ? ex.titleMn : ex.titleEn}
                  </h4>

                  <div className="mt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Formula: <strong className="text-teal-600 dark:text-teal-400">{ex.formulaUsed}</strong>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Example Full Walkthrough (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  {selectedExample.syllabusRef} Worked Solution
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
                  {selectedExample.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {mode === 'mn' ? selectedExample.titleMn : selectedExample.titleEn}
              </h3>
            </div>

            {/* Problem Statement Card */}
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 space-y-2">
              <span className="text-xs font-bold font-mono text-amber-800 dark:text-amber-300 uppercase tracking-wider block">
                {mode === 'mn' ? 'Бодлогын нөхцөл (Problem Statement):' : 'Question:'}
              </span>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {mode === 'mn' ? selectedExample.problemTextMn : selectedExample.problemTextEn}
              </p>
            </div>

            {/* Given Data List */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-slate-500 font-bold uppercase block">
                {mode === 'mn' ? 'Өгөгдсөн нь (Given Data):' : 'Given Data:'}
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                {(mode === 'mn' ? selectedExample.givenMn : selectedExample.givenEn).map((g, idx) => (
                  <li key={idx}>{g}</li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Mark Scheme Walkthrough */}
            <div className="space-y-3">
              <span className="text-xs font-bold font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider block">
                {mode === 'mn' ? 'Алхамчилсан бодолт ба Үнэлгээ (Step-by-Step Mark Scheme):' : 'Model Working Steps:'}
              </span>

              {(mode === 'mn' ? selectedExample.stepsMn : selectedExample.stepsEn).map((st, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-1"
                >
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{st.title}</span>
                  </div>
                  <div className="font-mono text-sm font-semibold text-slate-900 dark:text-white pl-7">
                    <ChemText text={st.detail} />
                  </div>
                </div>
              ))}
            </div>

            {/* Final Answer Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase block">
                  Final Calculated Value:
                </span>
                <span className="text-base sm:text-lg font-mono font-extrabold text-emerald-900 dark:text-emerald-200">
                  {mode === 'mn' ? selectedExample.finalAnswerMn : selectedExample.finalAnswerEn}
                </span>
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>

            {/* Cambridge Examiner Tip */}
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 text-xs text-purple-900 dark:text-purple-200 space-y-1">
              <strong className="font-mono text-purple-700 dark:text-purple-400 block uppercase font-bold">
                {mode === 'mn' ? 'Кэмбрижийн шалгагчийн сануулга (Examiner Tip):' : 'Cambridge Examiner Advice:'}
              </strong>
              <p className="leading-relaxed">
                {mode === 'mn' ? selectedExample.examinerTipMn : selectedExample.examinerTipEn}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Independent Practice Problems (Бие дааж бодох бодлого) */}
      {activeTab === 'practice' && practice.length === 0 && emptyNote}
      {activeTab === 'practice' && practice.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practice.map((prob) => {
              const feedback = feedbackState[prob.id];
              const hintVisible = revealedHints[prob.id];
              const solutionVisible = revealedSolutions[prob.id];

              return (
                <div
                  key={prob.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                          {mode === 'mn' ? prob.categoryMn : prob.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{prob.syllabusRef}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                        {prob.marks} {prob.marks === 1 ? 'Mark' : 'Marks'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {mode === 'mn' ? prob.titleMn : prob.titleEn}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {mode === 'mn' ? prob.questionMn : prob.questionEn}
                    </p>

                    {/* Numeric Input Field */}
                    <div className="pt-2">
                      <label className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                        {mode === 'mn' ? `Хариу оруулах (${prob.unit}):` : `Enter your answer (${prob.unit}):`}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="any"
                          placeholder={mode === 'mn' ? 'Тоон хариу...' : 'e.g. 2.0'}
                          value={userAnswers[prob.id] || ''}
                          onChange={e => setUserAnswers({ ...userAnswers, [prob.id]: e.target.value })}
                          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                        />
                        <button
                          onClick={() => handleCheckAnswer(prob)}
                          disabled={!userAnswers[prob.id]}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                        >
                          {mode === 'mn' ? 'Шалгах' : 'Check'}
                        </button>
                      </div>
                    </div>

                    {/* Feedback Callout */}
                    {feedback && (
                      <div
                        className={`p-3 rounded-xl text-xs font-medium leading-relaxed border ${
                          feedback.isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200'
                        }`}
                      >
                        {feedback.message}
                      </div>
                    )}
                  </div>

                  {/* Actions: Hint & Full Solution Buttons */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRevealedHints({ ...revealedHints, [prob.id]: !hintVisible })}
                        className="flex-1 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                        <span>{hintVisible ? (mode === 'mn' ? 'Зөвлөмж нуух' : 'Hide Hint') : (mode === 'mn' ? 'Зөвлөмж харах' : 'View Hint')}</span>
                      </button>

                      <button
                        onClick={() => setRevealedSolutions({ ...revealedSolutions, [prob.id]: !solutionVisible })}
                        className="flex-1 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                        <span>{solutionVisible ? (mode === 'mn' ? 'Бодолт нуух' : 'Hide Steps') : (mode === 'mn' ? 'Бүх алхмыг харах' : 'Full Steps')}</span>
                      </button>
                    </div>

                    {/* Hint Box */}
                    {hintVisible && (
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 animate-in fade-in">
                        <strong>{mode === 'mn' ? 'Сануулга: ' : 'Hint: '}</strong>
                        {mode === 'mn' ? prob.hintMn : prob.hintEn}
                      </div>
                    )}

                    {/* Full Solution Box */}
                    {solutionVisible && (
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs font-mono animate-in fade-in">
                        <strong className="text-teal-600 dark:text-teal-400 block font-bold">
                          {mode === 'mn' ? 'Кэмбрижийн алхамчилсан бодолт:' : 'Complete Model Working:'}
                        </strong>
                        <ul className="list-decimal list-inside space-y-1 text-slate-800 dark:text-slate-200">
                          {(mode === 'mn' ? prob.stepsMn : prob.stepsEn).map((st, i) => (
                            <li key={i}>{st}</li>
                          ))}
                        </ul>
                        <div className="pt-1 text-emerald-600 dark:text-emerald-400 font-bold">
                          Answer: {prob.correctNumericAnswer} {prob.unit}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 3: Interactive Live Chemistry Calculator (Молийн тооцоолуур) */}
      {activeTab === 'calculator' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {mode === 'mn' ? 'Интерактив моль, масс, хий ба концентрацийн тооцоолуур' : 'Interactive Stoichiometric Multi-Converter'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {mode === 'mn'
                ? 'Бодисын масс, молекул масс болон уусмалын эзлэхүүнийг оруулж моль, хийн эзлэхүүн, молийн концентрацийг шууд бодно.'
                : 'Instantly calculate chemical moles, gas volume at r.t.p., and solution molarity from mass and formula weight.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input 1: Mass */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                Sample Mass, m (g):
              </label>
              <input
                type="number"
                step="any"
                value={calcInputMass}
                onChange={e => setCalcInputMass(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Input 2: Mr */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                Relative Formula Mass, Mᵣ (g/mol):
              </label>
              <input
                type="number"
                step="any"
                value={calcInputMr}
                onChange={e => setCalcInputMr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Input 3: Solution Volume */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                Solution Volume (cm³):
              </label>
              <input
                type="number"
                step="any"
                value={calcSolutionVolCm3}
                onChange={e => setCalcSolutionVolCm3(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono text-slate-400">Presets:</span>
            {[
              { name: 'CaCO₃ (Mr=100)', mass: '10.0', mr: '100.0' },
              { name: 'NaCl (Mr=58.5)', mass: '5.85', mr: '58.5' },
              { name: 'H₂SO₄ (Mr=98)', mass: '4.90', mr: '98.0' },
              { name: 'NaOH (Mr=40)', mass: '4.00', mr: '40.0' },
              { name: 'CO₂ (Mr=44)', mass: '2.20', mr: '44.0' }
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCalcInputMass(p.mass);
                  setCalcInputMr(p.mr);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Output Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-1">
              <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold uppercase">
                Number of Moles (n):
              </span>
              <div className="text-2xl font-mono font-extrabold text-amber-900 dark:text-amber-200">
                {computedMoles} mol
              </div>
              <span className="text-[10px] font-mono text-slate-500">n = {calcMassNum} / {calcMrNum}</span>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 space-y-1">
              <span className="text-[11px] font-mono text-teal-700 dark:text-teal-400 font-bold uppercase">
                Gas Volume at r.t.p. (V):
              </span>
              <div className="text-2xl font-mono font-extrabold text-teal-900 dark:text-teal-200">
                {computedGasVolDm3} dm³
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                {+(computedGasVolDm3 * 1000).toFixed(0)} cm³ (V = n × 24)
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 space-y-1">
              <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase">
                Solution Molarity (c):
              </span>
              <div className="text-2xl font-mono font-extrabold text-cyan-900 dark:text-cyan-200">
                {computedConcMolar} mol/dm³
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                c = n / {(calcVolDm3).toFixed(3)} dm³
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mode 4: Full IGCSE 0620 calculator suite */}
      {activeTab === 'suite' && <ChemistryCalculatorSuite refs={pick.refs} />}
    </div>
  );
};
