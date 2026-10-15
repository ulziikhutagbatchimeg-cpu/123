import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
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
  }
];

export const CalculationsView: React.FC = () => {
  const { mode } = useLanguage();

  const [activeTab, setActiveTab] = useState<'examples' | 'practice' | 'calculator'>('examples');
  const [selectedExampleId, setSelectedExampleId] = useState<string>(WORKED_EXAMPLES[0].id);

  // Practice state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [feedbackState, setFeedbackState] = useState<Record<string, { isCorrect: boolean; message: string }>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Interactive Live Calculator state
  const [calcInputMass, setCalcInputMass] = useState<string>('10.0');
  const [calcInputMr, setCalcInputMr] = useState<string>('100.0');
  const [calcSolutionVolCm3, setCalcSolutionVolCm3] = useState<string>('250.0');

  const selectedExample = WORKED_EXAMPLES.find(e => e.id === selectedExampleId) || WORKED_EXAMPLES[0];

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
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Cambridge IGCSE 0620 Quantitative Chemistry
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold">
                Topic 3 Stoichiometry Engine
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
      {activeTab === 'examples' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Example Selector List (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono block px-1">
              {mode === 'mn' ? 'Кэмбрижийн жишээ бодлогууд:' : 'Cambridge Worked Examples:'}
            </span>

            {WORKED_EXAMPLES.map(ex => {
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
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRACTICE_PROBLEMS.map((prob) => {
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
    </div>
  );
};
