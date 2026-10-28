// IGCSE 0620 chapter 3 (stoichiometry), lessons 5–9 of 9. They follow the deck Ch05_Chemical_Calculations.pptx and
// the five 60-minute lessons its notes plan (the mole; empirical formulae and reacting masses; limiting reactants and
// percentages; gases, concentration and titration; exam practice), with the review slides 38–45.
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig3';

export const IG3_LESSONS_B: StatesLesson[] = [
  lesson(
    5,
    bi('Моль', 'The mole'),
    bi(
      'Мольгүйгээр энгийн пропорцоор урвалын массыг тооцох; (E) 1 моль 6.02 × 10²³ бөөмтэй гэдгийг хэлэх; моль = масс ÷ молийн масс-аар моль, масс, молийн масс, Mr, бөөмийн тоог олох.',
      'Calculate reacting masses in simple proportions without moles; (E) state that 1 mole contains 6.02 × 10²³ particles; use moles = mass ÷ molar mass to find moles, mass, molar mass, Mr or the number of particles.'
    ),
    [
      bi('CaCO₃ → CaO + CO₂: 100 g → 56 g + 44 g; харьцаа 100 : 56 : 44 өөрчлөгдөхгүй, масс хадгалагдана.', 'CaCO₃ → CaO + CO₂: 100 g → 56 g + 44 g; the ratio 100 : 56 : 44 never changes and mass is conserved.'),
      bi('(E) Ямар ч бодисын 1 моль = түүний Mr (эсвэл Ar) грамм, үргэлж 6.02 × 10²³ бөөмтэй (Авогадрогийн тогтмол).', '(E) 1 mole of any substance = its Mr (or Ar) in grams and always contains 6.02 × 10²³ particles (the Avogadro constant).'),
      bi('(E) моль = масс ÷ Mr; масс = моль × Mr; Mr = масс ÷ моль; бөөм = моль × 6.02 × 10²³. Нэгжээ үргэлж бич: mol, g, g/mol.', '(E) moles = mass ÷ Mr; mass = moles × Mr; Mr = mass ÷ moles; particles = moles × 6.02 × 10²³. Always write the unit: mol, g, g/mol.')
    ],
    lessonSteps(
      [
        [
          bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
          bi('Том асуулт: атомыг тоолж болохгүй бол химич бодисын хэмжээг хэрхэн мэддэг вэ? Ижил эзэлхүүнтэй дөрвөн бөмбөлгийн хоёр асуулт; "Санал нийлэх үү?" гурван өгүүлбэр; хичээлийн төлөвлөгөө.', 'Big question: atoms are far too small to count – so how do chemists know how much to use? The two questions on four balloons of the same volume; three "Agree or disagree?" statements; the lesson plan.'),
          bi('Хосоороо 60 секунд ярилцаж, эрхий хуруугаар санал өгнө.', 'Turn and talk for 60 s and vote with thumbs.'),
          bi('Молекулын тоо ижил; аргон (Mr 40) хамгийн хурдан унана.', 'Same number of molecules; argon (Mr 40) sinks fastest.')
        ],
        [
          bi('Түлхүүр үг, шалгуур, давталт', 'Key words, success criteria and retrieval'),
          bi('Түлхүүр үгс ба амжилтын шалгуурт fist to five. Давталт: H₂O, CaCO₃, (NH₄)₂SO₄-ийн Mr, 2H₂ + O₂ → 2H₂O, 602 000 … 000-ыг стандарт хэлбэрээр.', 'Key words and fist to five on the success criteria. Retrieval: Mr of H₂O, CaCO₃ and (NH₄)₂SO₄, 2H₂ + O₂ → 2H₂O, and 602 000 … 000 in standard form.'),
          bi('Тэмдэглэлгүй самбартаа бичээд 3-2-1-д өргөнө.', 'Write on show-me boards with no notes and reveal on 3-2-1.'),
          bi('18; 100; 132; 2H₂ + O₂ → 2H₂O; 6.02 × 10²³.', '18; 100; 132; 2H₂ + O₂ → 2H₂O; 6.02 × 10²³.')
        ],
        [
          bi('Томьёоноос моль хүртэл; энгийн пропорц', 'From formula to the mole; simple proportion'),
          bi('C, H₂, H₂O, MgO, CaCO₃-ийн Mr → 1 молийн масс → бөөмийн тооны хүснэгт. (Core) CaCO₃ → CaO + CO₂-ийн 100 : 56 : 44 харьцааг багасгаж, нэмэгдүүлнэ; Fe ба S-ийн графикийг уншина.', 'The table Mr → mass of 1 mole → particles for C, H₂, H₂O, MgO and CaCO₃. (Core) Scale the ratio 100 : 56 : 44 for CaCO₃ → CaO + CO₂ down and up; read the iron and sulfur graph.'),
          bi('Мөр бүрийг таамаглана; 25 g CaCO₃-аас CaO ба CO₂-ийн массыг бодно.', 'Predict each row; work out CaO and CO₂ from 25 g of CaCO₃.'),
          bi('1 моль = Mr грамм; 14 g CaO, 11 g CO₂; 2.0 g Fe ≈ 1.1 g S.', '1 mole = Mr in grams; 14 g CaO, 11 g CO₂; 2.0 g Fe ≈ 1.1 g S.')
        ],
        [
          bi('(E) Моль: жигнэж тоолох', '(E) The mole: counting by weighing'),
          bi('Масс–моль–Mr гурвалжин; жишээ: 60 g NaOH → 1.5 mol; 0.5 mol CuSO₄·5H₂O → 125 g. Алхамчилсан жишээ: 4.4 g CO₂ → 0.10 mol → 6.02 × 10²² молекул.', 'The mass–moles–Mr triangle; examples: 60 g NaOH → 1.5 mol; 0.5 mol CuSO₄·5H₂O → 125 g. Step by step: 4.4 g CO₂ → 0.10 mol → 6.02 × 10²² molecules.'),
          bi('Гурвалжинг агаарт зурна; алхам бүрийг хостойгоо чангаар хэлнэ.', 'Air-draw the triangle; say each step aloud with a partner.'),
          bi('60 ÷ 40, 60 × 40 биш; нэгж mol.', '60 ÷ 40, not 60 × 40; unit mol.')
        ],
        [
          bi('(E) Моль тооцооны дасгал', '(E) Mole calculations practice'),
          bi('Q1-ийг хамт, Q2–Q6-г бие даан (16.0 g NaOH, бөөмийн тоо, молийн масс, Al₂O₃, CO₂-ийн масс, O₂ дахь O атом); дараа нь нэмэлт 6 бодлого.', 'Q1 together, then Q2–Q6 alone (16.0 g NaOH, particles, molar mass, Al₂O₃, mass of CO₂, O atoms in O₂); then 6 extra questions.'),
          bi('Асуулт бүрийн дараа самбар өргөж, өөрийгөө засна.', 'Show boards after every question and mark their own work.'),
          bi('0.400 mol; 2.41 × 10²³; 18 g/mol; 0.125 mol; 8.8 g; 6.02 × 10²³ атом.', '0.400 mol; 2.41 × 10²³; 18 g/mol; 0.125 mol; 8.8 g; 6.02 × 10²³ atoms.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('25 g CaCO₃-аас хэдэн грамм CaO үүсэх вэ? (CaCO₃ → CaO + CO₂; 100 g → 56 g)', 'What mass of CaO forms from 25 g of CaCO₃? (CaCO₃ → CaO + CO₂; 100 g → 56 g)'),
        [bi('11 g', '11 g'), bi('14 g', '14 g'), bi('25 g', '25 g'), bi('56 g', '56 g')],
        1,
        bi('25 ÷ 100 = 0.25; 0.25 × 56 = 14 g.', '25 ÷ 100 = 0.25; 0.25 × 56 = 14 g.')
      ),
      exitItem(
        bi('(E) 1 моль бодис хэдэн бөөмтэй вэ?', '(E) How many particles are in 1 mole of a substance?'),
        [bi('6.02 × 10²³', '6.02 × 10²³'), bi('Mr', 'Mr'), bi('24', '24'), bi('1000', '1000')],
        0,
        bi('Авогадрогийн тогтмол: 6.02 × 10²³.', 'The Avogadro constant: 6.02 × 10²³.')
      ),
      exitItem(
        bi('(E) 60 g NaOH (Mr = 40)-д хэдэн моль байх вэ?', '(E) How many moles are in 60 g of NaOH (Mr = 40)?'),
        [bi('0.67 mol', '0.67 mol'), bi('1.5 mol', '1.5 mol'), bi('2400 mol', '2400 mol'), bi('100 mol', '100 mol')],
        1,
        bi('моль = масс ÷ Mr = 60 ÷ 40 = 1.5 mol.', 'moles = mass ÷ Mr = 60 ÷ 40 = 1.5 mol.')
      ),
      exitItem(
        bi('(E) 0.50 mol O₂-д хэдэн хүчилтөрөгчийн атом байх вэ?', '(E) How many oxygen atoms are in 0.50 mol of O₂?'),
        [bi('3.01 × 10²³', '3.01 × 10²³'), bi('6.02 × 10²³', '6.02 × 10²³'), bi('1.20 × 10²⁴', '1.20 × 10²⁴'), bi('0.50', '0.50')],
        1,
        bi('Молекул бүр 2 атомтай: 0.50 × 2 × 6.02 × 10²³ = 6.02 × 10²³.', 'Each molecule has 2 atoms: 0.50 × 2 × 6.02 × 10²³ = 6.02 × 10²³.')
      )
    ],
    ID
  ),
  lesson(
    6,
    bi('Эмпирик ба молекулын томьёо, урвалын масс', 'Empirical and molecular formulae, reacting masses'),
    bi(
      '(E) Өгөгдлөөс эмпирик ба молекулын томьёо, талст усны тоог тооцох; тэнцүүлсэн тэгшитгэлийн молийн харьцаагаар урвалын массыг тооцох.',
      '(E) Calculate empirical and molecular formulae and the water of crystallisation from data; calculate reacting masses with the mole ratio of a balanced equation.'
    ),
    [
      bi('Эмпирик томьёо: масс (эсвэл %) → ÷ Ar → ÷ хамгийн бага → бүхэл тооны харьцаа; 1.5 эсвэл 2.5 гарвал бүгдийг 2-оор үржүүлнэ (1 : 2.5 → 2 : 5).', 'Empirical formula: mass (or %) → ÷ Ar → ÷ smallest → whole-number ratio; if you get 1.5 or 2.5, multiply all by 2 (1 : 2.5 → 2 : 5).'),
      bi('Молекулын томьёо = (эмпирик томьёо) × n, n = Mr ÷ эмпирик томьёоны Mr (P₂O₅, Mr 284 → P₄O₁₀).', 'Molecular formula = (empirical formula) × n, where n = Mr ÷ Mr of the empirical formula (P₂O₅, Mr 284 → P₄O₁₀).'),
      bi('"Гүүр": дээш (масс ÷ Mr) → хөндлөн (× харьцаа) → доош (моль × Mr). Бүх цифрийг эцэс хүртэл хадгална.', 'The "footbridge": up (mass ÷ Mr) → across (× ratio) → down (moles × Mr). Keep all digits until the end.')
    ],
    lessonSteps(
      [
        [
          bi('Эмпирик томьёо: арга', 'Empirical formula: the method'),
          bi('Жишээ 1: 0.24 g Mg + 0.16 g O → MgO. Жишээ 2: 47% Si → SiO₂. Хүснэгтийн мөр бүрийг өөр сурагч хэлнэ (cold call).', 'Example 1: 0.24 g Mg + 0.16 g O → MgO. Example 2: 47% Si → SiO₂. A different student gives each row of the table (cold call).'),
          bi('O₂-ийн Mr биш Ar-т яагаад хуваадгийг 30 секунд ярилцана.', 'Talk for 30 s about why we divide by Ar and not by the Mr of O₂.'),
          bi('MgO; SiO₂ (1 : 1.97 ≈ 1 : 2).', 'MgO; SiO₂ (1 : 1.97 ≈ 1 : 2).')
        ],
        [
          bi('Хамтдаа: молекулын томьёо ба талст устай давс', 'We do: molecular formulae and hydrated salts'),
          bi('Фосфорын исэл 44% P, 56% O, Mr = 284 → P₂O₅ → P₄O₁₀. Талст устай давс: 5.0 g CuSO₄·xH₂O → 3.2 g CuSO₄ → x = 5.', 'Phosphorus oxide 44% P, 56% O, Mr = 284 → P₂O₅ → P₄O₁₀. Hydrated salt: 5.0 g CuSO₄·xH₂O → 3.2 g CuSO₄ → x = 5.'),
          bi('Жишээ бүрийн n-ийг самбартаа бичнэ; 1 : 2.5-ыг яагаад 2-оор үржүүлдгийг ярилцана.', 'Write n for each example on boards; discuss why 1 : 2.5 is multiplied by 2.'),
          bi('n = 2; x = 5.', 'n = 2; x = 5.')
        ],
        [
          bi('Бие даан: томьёо тооцох', 'You do: calculate the formula'),
          bi('Q2: халькопирит (Cu, Fe, S) → CuFeS₂. Q3: хөлдөлтийн эсрэг бодис 38.7% C, 9.7% H, 51.6% O, Mr 62 → CH₃O → C₂H₆O₂. Дараа нь нэмэлт 4 бодлого.', 'Q2: chalcopyrite (Cu, Fe, S) → CuFeS₂. Q3: antifreeze 38.7% C, 9.7% H, 51.6% O, Mr 62 → CH₃O → C₂H₆O₂. Then 4 extra questions.'),
          bi('Бие даан бодоод хостойгоо дэвтрээ солилцож өөр өнгөөр засна.', 'Work alone, swap books and mark in a different colour.'),
          bi('CuFeS₂; C₂H₆O₂; CH₃; CaCO₃; N₂O₄; x = 7.', 'CuFeS₂; C₂H₆O₂; CH₃; CaCO₃; N₂O₄; x = 7.')
        ],
        [
          bi('Моль ашиглан урвалын масс: "гүүр"', 'Reacting masses with moles: the footbridge'),
          bi('4Al + 3O₂ → 2Al₂O₃: 9.2 g Al → 0.341 mol → 0.170 mol Al₂O₃ → 17.4 g. Шалгалтын зөвлөмж: цифрийг дугуйлахгүй хадгална. You try: 32 g метантай урвалд орох хүчилтөрөгч.', '4Al + 3O₂ → 2Al₂O₃: 9.2 g Al → 0.341 mol → 0.170 mol Al₂O₃ → 17.4 g. Exam tip: keep all digits. You try: the mass of oxygen that reacts with 32 g of methane.'),
          bi('"Дээш – хөндлөн – доош" гүүрээр алхаж үзүүлнэ.', 'Walk "up – across – down" the footbridge.'),
          bi('17.4 g (17.3 биш); 128 g O₂.', '17.4 g (not 17.3); 128 g of O₂.')
        ],
        [
          bi('Урвалын масс: 4 алхамт арга', 'Reacting masses: the 4-step method'),
          bi('10.0 g CaCO₃ халаахад үүсэх CO₂: моль → харьцаа → масс → массын хадгалагдлаар шалгах (5.60 + 4.40 = 10.0 g).', 'The CO₂ formed when 10.0 g of CaCO₃ is heated: moles → ratio → mass → check by conservation of mass (5.60 + 4.40 = 10.0 g).'),
          bi('3-р алхмыг click-ээс өмнө самбартаа таамаглана.', 'Predict Step 3 on boards before the click.'),
          bi('0.100 mol → 4.40 g CO₂.', '0.100 mol → 4.40 g of CO₂.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('(E) 0.24 g Mg 0.16 g O-той нэгдэнэ. Эмпирик томьёо аль нь вэ? (Mg = 24, O = 16)', '(E) 0.24 g of Mg combines with 0.16 g of O. What is the empirical formula? (Mg = 24, O = 16)'),
        [bi('MgO', 'MgO'), bi('MgO₂', 'MgO₂'), bi('Mg₂O', 'Mg₂O'), bi('Mg₃O₂', 'Mg₃O₂')],
        0,
        bi('0.24 ÷ 24 = 0.010; 0.16 ÷ 16 = 0.010 → 1 : 1.', '0.24 ÷ 24 = 0.010; 0.16 ÷ 16 = 0.010 → 1 : 1.')
      ),
      exitItem(
        bi('(E) Харьцаа 1 : 2.5 гарвал юу хийх вэ?', '(E) A ratio comes out as 1 : 2.5. What do you do?'),
        [bi('1 : 3 болгож дугуйлна', 'Round it to 1 : 3'), bi('1 : 2 болгож дугуйлна', 'Round it to 1 : 2'), bi('Бүгдийг 2-оор үржүүлж 2 : 5', 'Multiply all by 2 to get 2 : 5'), bi('2.5-д хуваана', 'Divide by 2.5')],
        2,
        bi('1 : 2.5 → 2 : 5 (жишээ нь P₂O₅). 1 : 3 гэж дугуйлах нь оноо алдуулна.', '1 : 2.5 → 2 : 5 (e.g. P₂O₅). Rounding to 1 : 3 loses marks.')
      ),
      exitItem(
        bi('(E) Эмпирик томьёо CH₃O (Mr 31), бодисын Mr = 62. Молекулын томьёо аль нь вэ?', '(E) The empirical formula is CH₃O (Mr 31) and the Mr is 62. What is the molecular formula?'),
        [bi('CH₃O', 'CH₃O'), bi('C₂H₆O₂', 'C₂H₆O₂'), bi('C₃H₉O₃', 'C₃H₉O₃'), bi('C₂H₃O', 'C₂H₃O')],
        1,
        bi('62 ÷ 31 = 2 → C₂H₆O₂ (этан-1,2-диол).', '62 ÷ 31 = 2 → C₂H₆O₂ (ethane-1,2-diol).')
      ),
      exitItem(
        bi('(E) 10.0 g CaCO₃ (Mr 100) халаахад хэдэн грамм CO₂ (Mr 44) үүсэх вэ? CaCO₃ → CaO + CO₂', '(E) What mass of CO₂ (Mr 44) forms when 10.0 g of CaCO₃ (Mr 100) is heated? CaCO₃ → CaO + CO₂'),
        [bi('0.44 g', '0.44 g'), bi('4.40 g', '4.40 g'), bi('5.60 g', '5.60 g'), bi('44.0 g', '44.0 g')],
        1,
        bi('10.0 ÷ 100 = 0.100 mol; 1 : 1; 0.100 × 44 = 4.40 g.', '10.0 ÷ 100 = 0.100 mol; 1 : 1; 0.100 × 44 = 4.40 g.')
      )
    ],
    ID
  ),
  lesson(
    7,
    bi('Хязгаарлагч урвалж ба хувийн тооцоо', 'Limiting reactants and percentages'),
    bi(
      '(E) Хязгаарлагч урвалжийг тодорхойлж бүтээгдэхүүний хэмжээг тооцох; хувийн гарц, цэвэршлийн хувь, массын бүрэлдэхүүнийг тооцох.',
      '(E) Find the limiting reactant and the amount of product; calculate percentage yield, percentage purity and percentage composition by mass.'
    ),
    [
      bi('Хязгаарлагч урвалж: (1) урвалж бүрийн моль (2) тэгшитгэл дэх коэффициентод хуваах (3) хамгийн бага нь хязгаарлагч; нөгөө нь илүүдэл.', 'Limiting reactant: (1) moles of each reactant (2) divide each by its coefficient in the equation (3) the smallest is limiting; the other is in excess.'),
      bi('Хувийн гарц = бодит ÷ онолын × 100; цэвэршил = цэвэр бодисын масс ÷ хольцтой дээжийн масс × 100; бүрэлдэхүүн = томьёо дахь элементийн масс ÷ Mr × 100.', 'Percentage yield = actual ÷ predicted × 100; purity = mass of pure product ÷ mass of impure sample × 100; composition = mass of element in the formula ÷ Mr × 100.'),
      bi('Гарц 100%-иас бага: урвал дуусаагүй, шилжүүлэхэд алдагдсан, жигнэлтийн алдаа. 100%-иас их бол бүтээгдэхүүн нойтон эсвэл хольцтой.', 'Yield below 100%: the reaction may not be complete, product lost when transferring, weighing errors. Above 100% means a wet or impure product.')
    ],
    lessonSteps(
      [
        [
          bi('Хязгаарлагч урвалж: симулятор', 'Limiting reactants: simulator'),
          bi('2H₂ + O₂ → 2H₂O: A (4 H₂ + 2 O₂), B (6 H₂ + 2 O₂), C (4 H₂ + 4 O₂) холимог бүрт юу үлдэхийг таамаглуулж "React ►" дарна. Судлах: PhET Reactants, Products & Leftovers.', '2H₂ + O₂ → 2H₂O: for mixes A (4 H₂ + 2 O₂), B (6 H₂ + 2 O₂) and C (4 H₂ + 4 O₂), students predict what is left over, then click "React ►". Explore: PhET Reactants, Products & Leftovers.'),
          bi('React дарахаас өмнө үлдэх молекулыг зурна (predict–observe–explain).', 'Draw what is left over before clicking React (predict–observe–explain).'),
          bi('A: юу ч үлдэхгүй; B: O₂ хязгаарлагч, 2 H₂ үлдэнэ; C: H₂ хязгаарлагч, 2 O₂ үлдэнэ.', 'A: nothing left over; B: O₂ limiting, 2 H₂ left; C: H₂ limiting, 2 O₂ left.')
        ],
        [
          bi('Аль урвалж хязгаарлагч вэ?', 'Which reactant is limiting?'),
          bi('Ажилласан жишээ: 6.0 g CoCO₃ + 0.080 mol HCl → HCl хязгаарлагч. You try: 4.0 g Mg + 5.48 g HCl.', 'Worked example: 6.0 g CoCO₃ + 0.080 mol HCl → HCl is limiting. You try: 4.0 g Mg + 5.48 g HCl.'),
          bi('Хязгаарлагч урвалжаа ("Mg" эсвэл "HCl") самбартаа бичнэ.', 'Write "Mg" or "HCl" on boards for the limiting reactant.'),
          bi('0.040 < 0.0504 → HCl; 0.075 < 0.167 → HCl, Mg илүүдэл.', '0.040 < 0.0504 → HCl; 0.075 < 0.167 → HCl, Mg in excess.')
        ],
        [
          bi('Нэмэлт дасгал: урвалын масс ба хязгаарлагч урвалж', 'Extra practice: reacting masses and limiting reactants'),
          bi('5 бодлого: 6.0 g Mg → MgO, 4.0 g H₂ → H₂O, 16 g Fe₂O₃ → Fe, 28 g CaO-д хэрэгтэй CaCO₃, 2.4 g Mg + 0.10 mol HCl.', '5 questions: 6.0 g Mg → MgO, 4.0 g H₂ → H₂O, 16 g Fe₂O₃ → Fe, the CaCO₃ needed for 28 g CaO, 2.4 g Mg + 0.10 mol HCl.'),
          bi('Бие даан бодоод аль бодлого 1 : 2 харьцаатайг олно.', 'Work alone and find which question needs a 1 : 2 mole ratio.'),
          bi('10 g; 36 g; 11.2 g; 50 g; HCl хязгаарлагч, 0.10 g H₂.', '10 g; 36 g; 11.2 g; 50 g; HCl limiting, 0.10 g H₂.')
        ],
        [
          bi('Хувийн гарц, цэвэршил, бүрэлдэхүүн', 'Percentage yield, purity and composition'),
          bi('Гарц: 12.4 g CuCO₃ → 8.0 g CuO онолын, 7.0 g бодит → 87.5%. Цэвэршил: 9.95 ÷ 10.15 → 98.0%. Бүрэлдэхүүн: NH₄NO₃ дахь N 35%; MgSO₄·7H₂O дахь ус 51.2%.', 'Yield: 12.4 g CuCO₃ → 8.0 g CuO predicted, 7.0 g actual → 87.5%. Purity: 9.95 ÷ 10.15 → 98.0%. Composition: N in NH₄NO₃ 35%; water in MgSO₄·7H₂O 51.2%.'),
          bi('Гарц 100%-иас их байж болох уу гэдгийг 30 секунд ярилцана.', 'Talk for 30 s about whether a percentage yield can ever be above 100%.'),
          bi('Гурван томьёо ижил бүтэцтэй: хэсэг ÷ бүхэл × 100.', 'All three formulae have the same shape: part ÷ whole × 100.')
        ],
        [
          bi('Хувийн тооцооны дасгал', 'Percentages practice'),
          bi('Q1–Q5 (AlCl₃-ийн гарц, (NH₄)₂SO₄ ба (NH₄)₃PO₄ дахь N, Na₂CO₃·10H₂O дахь ус, BaCO₃-ийн цэвэршил), дараа нь нэмэлт 4 бодлого. Алдааг олох: 2.8 ÷ 2.1 × 100 = 133%.', 'Q1–Q5 (yield of AlCl₃, N in (NH₄)₂SO₄ and (NH₄)₃PO₄, water in Na₂CO₃·10H₂O, purity of BaCO₃), then 4 extra questions. Spot the mistake: 2.8 ÷ 2.1 × 100 = 133%.'),
          bi('3 оронтой тоогоор бодоод зөв хариултынхаа тоог хуруугаараа үзүүлнэ.', 'Answer to 3 significant figures and show how many they got right with fingers.'),
          bi('80.0%; 21.2%; 28.2%; 62.9%; 80.1%; 75%; Fe₂O₃-д 70% Fe.', '80.0%; 21.2%; 28.2%; 62.9%; 80.1%; 75%; 70% Fe in Fe₂O₃.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('(E) 2H₂ + O₂ → 2H₂O. 6 H₂ ба 2 O₂ молекулыг холивол юу болох вэ?', '(E) 2H₂ + O₂ → 2H₂O. 6 H₂ and 2 O₂ molecules are mixed. What happens?'),
        [
          bi('Юу ч үлдэхгүй', 'Nothing is left over'),
          bi('O₂ хязгаарлагч; 2 H₂ үлдэнэ', 'O₂ is limiting; 2 H₂ are left'),
          bi('H₂ хязгаарлагч; 2 O₂ үлдэнэ', 'H₂ is limiting; 2 O₂ are left'),
          bi('O₂ хязгаарлагч; 4 H₂ үлдэнэ', 'O₂ is limiting; 4 H₂ are left')
        ],
        1,
        bi('2 O₂ нь 4 H₂-тэй урвалд орно; 6 − 4 = 2 H₂ үлдэнэ.', '2 O₂ react with 4 H₂; 6 − 4 = 2 H₂ are left.')
      ),
      exitItem(
        bi('(E) Онолын гарц 8.0 g, бодит гарц 7.0 g. Хувийн гарц хэд вэ?', '(E) The predicted yield is 8.0 g and the actual yield is 7.0 g. What is the percentage yield?'),
        [bi('114%', '114%'), bi('87.5%', '87.5%'), bi('12.5%', '12.5%'), bi('70%', '70%')],
        1,
        bi('бодит ÷ онолын × 100 = 7.0 ÷ 8.0 × 100 = 87.5%; урвуулбал 114% болно – алдаа.', 'actual ÷ predicted × 100 = 7.0 ÷ 8.0 × 100 = 87.5%; turning it upside down gives 114% – a mistake.')
      ),
      exitItem(
        bi('(E) NH₄NO₃ (Mr 80) дахь азотын массын хувь хэд вэ?', '(E) What is the percentage by mass of nitrogen in NH₄NO₃ (Mr 80)?'),
        [bi('17.5%', '17.5%'), bi('35%', '35%'), bi('28%', '28%'), bi('80%', '80%')],
        1,
        bi('2 N = 28; 28 ÷ 80 × 100 = 35%.', '2 N = 28; 28 ÷ 80 × 100 = 35%.')
      ),
      exitItem(
        bi('(E) Сурагчийн давсны гарц 112% гарчээ. Хамгийн зөв дүгнэлт аль нь вэ?', '(E) A student’s yield of a salt is 112%. Which conclusion is best?'),
        [
          bi('Туршилт хүлээснээс сайн болсон', 'The experiment was better than expected'),
          bi('Бүтээгдэхүүн нойтон эсвэл хольцтой хэвээр байсан байх', 'The product was probably still wet or impure'),
          bi('Урвал бүрэн дуусаагүй', 'The reaction was not complete'),
          bi('Онолын гарцыг зөв тооцсон', 'The predicted yield was calculated correctly')
        ],
        1,
        bi('Хамгийн их гарц 100%; тогтмол масс хүртэл хатааж давтана.', 'The maximum yield is 100%; dry to constant mass and repeat.')
      )
    ],
    ID
  ),
  lesson(
    8,
    bi('Хий, концентраци ба титрлэлт', 'Gases, concentration and titration'),
    bi(
      '(E) r.t.p.-д 24 dm³ молийн эзэлхүүнийг тооцоонд ашиглах; концентрацийг g/dm³ ба mol/dm³-ээр илэрхийлэх (Core), cm³ ↔ dm³ хувиргаж тооцох; титрлэлтийн үр дүнгээр моль, концентраци, эзэлхүүнийг тооцох.',
      '(E) Use the molar gas volume of 24 dm³ at r.t.p. in calculations; state that concentration is measured in g/dm³ or mol/dm³ (Core) and calculate it with cm³ ↔ dm³; use titration results to calculate moles, concentration or volume.'
    ),
    [
      bi('Ямар ч хийн 1 моль r.t.p.-д 24 dm³ (24 000 cm³) эзэлнэ; моль = эзэлхүүн ÷ 24. Хийн эзэлхүүн молийн харьцаагаар урвалд орно.', '1 mole of any gas occupies 24 dm³ (24 000 cm³) at r.t.p.; moles = volume ÷ 24. Gas volumes react in the mole ratio.'),
      bi('Концентраци = моль ÷ эзэлхүүн (dm³); эзэлхүүн cm³ бол эхлээд 1000-д хуваа; g/dm³ = mol/dm³ × Mr.', 'Concentration = moles ÷ volume (dm³); if the volume is in cm³, divide by 1000 first; g/dm³ = mol/dm³ × Mr.'),
      bi('Титрлэлт: мэдэгдэх уусмалын моль = концентраци × эзэлхүүн (cm³) ÷ 1000 → тэгшитгэлийн харьцаа → үл мэдэгдэх концентраци.', 'Titration: moles of the known solution = concentration × volume (cm³) ÷ 1000 → equation ratio → unknown concentration.')
    ],
    lessonSteps(
      [
        [
          bi('Хийтэй холбоотой тооцоо', 'Calculations involving gases'),
          bi('24 dm³ гурвалжин; 8 g хүхэр шатахад 6 dm³ SO₂; H₂ + Cl₂ → 2HCl: 20 cm³ H₂ → 40 cm³ HCl. Шалгалтын зөвлөмж: 480 cm³ ÷ 24 000.', 'The 24 dm³ triangle; 8 g of sulfur burns to give 6 dm³ of SO₂; H₂ + Cl₂ → 2HCl: 20 cm³ H₂ → 40 cm³ HCl. Exam tip: 480 cm³ ÷ 24 000.'),
          bi('Эзэлхүүн бүрт "÷ 24" эсвэл "÷ 24 000" гэдгийг самбартаа шийднэ.', 'Decide "÷ 24" or "÷ 24 000" for each volume on boards.'),
          bi('0.25 mol S → 0.25 mol SO₂ → 6 dm³; 480 cm³ = 0.020 mol.', '0.25 mol S → 0.25 mol SO₂ → 6 dm³; 480 cm³ = 0.020 mol.')
        ],
        [
          bi('Массаас хийн эзэлхүүн; дасгал', 'Volume of gas from a mass; practice'),
          bi('Алхамчилсан жишээ: 5.0 g CaCO₃ + илүүдэл HCl → 1.2 dm³ CO₂. Дараа нь Q1–Q6 ба нэмэлт 4 бодлого (аргон, CO₂, NH₃, N₂, CH₄ + O₂, H₂).', 'Step by step: 5.0 g CaCO₃ + excess HCl → 1.2 dm³ CO₂. Then Q1–Q6 and 4 extra questions (argon, CO₂, NH₃, N₂, CH₄ + O₂, H₂).'),
          bi('Хосоороо нэг нь бодож нөгөө нь нэгжийг шалгана; хариултын өмнө нэгжээ бичнэ.', 'In pairs one calculates and the other checks the units; write the unit before the number.'),
          bi('0.020 mol; 2.0 mol; 1440 cm³; 12 dm³; 42 g; 100 cm³ O₂; 480 cm³ H₂.', '0.020 mol; 2.0 mol; 1440 cm³; 12 dm³; 42 g; 100 cm³ O₂; 480 cm³ H₂.')
        ],
        [
          bi('Уусмалын концентраци', 'Concentration of solutions'),
          bi('(Core) g/dm³ ба mol/dm³. (E) 10 g NaOH 250 cm³-т → 1.0 mol/dm³ (= 40 g/dm³). Алхамчилсан жишээ: 2.0 g NaOH 250 cm³-т → 0.20 mol/dm³, 8.0 g/dm³.', '(Core) g/dm³ and mol/dm³. (E) 10 g NaOH in 250 cm³ → 1.0 mol/dm³ (= 40 g/dm³). Step by step: 2.0 g NaOH in 250 cm³ → 0.20 mol/dm³ and 8.0 g/dm³.'),
          bi('You try (a)–(c)-г бодоод алхам бүрт эрхий хуруугаар санал өгнө.', 'Do You try (a)–(c) and give a thumbs up or down for each step.'),
          bi('0.20; 1.0; 0.020 mol/dm³.', '0.20; 1.0; 0.020 mol/dm³.')
        ],
        [
          bi('Титрлэлтийн тооцоо ба виртуал лаб', 'Titration calculations and the virtual lab'),
          bi('Coursebook 5.9: 20.0 cm³ HCl нь 25.0 cm³ 0.10 mol/dm³ NaOH-ийг саармагжуулна → 0.125 mol/dm³. Виртуал лаб: H₂SO₄ + NaOH, concordant титр 10.05 ба 9.95, дундаж 10.00 cm³, 1 : 2 харьцаа.', 'Coursebook 5.9: 20.0 cm³ of HCl neutralises 25.0 cm³ of 0.10 mol/dm³ NaOH → 0.125 mol/dm³. Virtual lab: H₂SO₄ + NaOH, concordant titres 10.05 and 9.95, mean 10.00 cm³, ratio 1 : 2.'),
          bi('Төгсгөлийн өнгийг таамаглаад ажиллалт бүрийг дарна; яагаад concordant үр дүн хүртэл давтдагийг ярилцана.', 'Predict the end-point colour and click each run; discuss why titrations are repeated until results are concordant.'),
          bi('0.125 mol/dm³ HCl; 1.00 mol/dm³ NaOH; өнгөгүй → цайвар ягаан.', '0.125 mol/dm³ HCl; 1.00 mol/dm³ NaOH; colourless → pale pink.')
        ],
        [
          bi('Нэмэлт дасгал: концентраци ба титрлэлт', 'Extra practice: concentration and titration'),
          bi('5 бодлого: 25.0 cm³ 0.100 mol/dm³ HCl-ийн моль, 5.85 g NaCl 500 cm³-т, 250 cm³ 0.50 mol/dm³ NaOH-д хэрэгтэй масс, 1 : 1 ба 1 : 2 титрлэлт.', '5 questions: moles in 25.0 cm³ of 0.100 mol/dm³ HCl, 5.85 g NaCl in 500 cm³, the mass of NaOH for 250 cm³ of 0.50 mol/dm³, and 1 : 1 and 1 : 2 titrations.'),
          bi('Бие даан бодоод Q5-д хостоо 1 : 2 харьцаа ашигласан эсэхийг шалгана.', 'Work alone; check that a partner used the 1 : 2 ratio in Q5.'),
          bi('2.50 × 10⁻³ mol; 0.200 mol/dm³; 5.0 g; 0.080 mol/dm³; 0.10 mol/dm³.', '2.50 × 10⁻³ mol; 0.200 mol/dm³; 5.0 g; 0.080 mol/dm³; 0.10 mol/dm³.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('(E) r.t.p.-д 480 cm³ аргонд хэдэн моль байх вэ?', '(E) How many moles are in 480 cm³ of argon at r.t.p.?'),
        [bi('20 mol', '20 mol'), bi('0.020 mol', '0.020 mol'), bi('0.20 mol', '0.20 mol'), bi('2.0 mol', '2.0 mol')],
        1,
        bi('480 ÷ 24 000 = 0.020 mol; cm³-ийг эхлээд dm³ болгоно.', '480 ÷ 24 000 = 0.020 mol; change cm³ to dm³ first.')
      ),
      exitItem(
        bi('(E) 22 g CO₂ (Mr 44) r.t.p.-д хэдэн dm³ эзлэх вэ?', '(E) What volume does 22 g of CO₂ (Mr 44) occupy at r.t.p.?'),
        [bi('0.50 dm³', '0.50 dm³'), bi('12 dm³', '12 dm³'), bi('24 dm³', '24 dm³'), bi('528 dm³', '528 dm³')],
        1,
        bi('22 ÷ 44 = 0.50 mol; 0.50 × 24 = 12 dm³.', '22 ÷ 44 = 0.50 mol; 0.50 × 24 = 12 dm³.')
      ),
      exitItem(
        bi('(E) 10 g NaOH (Mr 40)-ийг 250 cm³ уусмал болгов. Концентраци хэд вэ?', '(E) 10 g of NaOH (Mr 40) is made into 250 cm³ of solution. What is the concentration?'),
        [bi('0.25 mol/dm³', '0.25 mol/dm³'), bi('1.0 mol/dm³', '1.0 mol/dm³'), bi('0.040 mol/dm³', '0.040 mol/dm³'), bi('2.5 mol/dm³', '2.5 mol/dm³')],
        1,
        bi('0.25 mol ÷ 0.250 dm³ = 1.0 mol/dm³ (= 40 g/dm³).', '0.25 mol ÷ 0.250 dm³ = 1.0 mol/dm³ (= 40 g/dm³).')
      ),
      exitItem(
        bi('(E) 20.0 cm³ HCl нь 25.0 cm³ 0.10 mol/dm³ NaOH-ийг саармагжуулна (1 : 1). HCl-ийн концентраци хэд вэ?', '(E) 20.0 cm³ of HCl neutralises 25.0 cm³ of 0.10 mol/dm³ NaOH (1 : 1). What is the concentration of the HCl?'),
        [bi('0.080 mol/dm³', '0.080 mol/dm³'), bi('0.10 mol/dm³', '0.10 mol/dm³'), bi('0.125 mol/dm³', '0.125 mol/dm³'), bi('0.25 mol/dm³', '0.25 mol/dm³')],
        2,
        bi('NaOH 2.50 × 10⁻³ mol → HCl 2.50 × 10⁻³ mol; × 1000 ÷ 20.0 = 0.125 mol/dm³.', 'NaOH 2.50 × 10⁻³ mol → HCl 2.50 × 10⁻³ mol; × 1000 ÷ 20.0 = 0.125 mol/dm³.')
      )
    ],
    ID
  ),
  lesson(
    9,
    bi('Шалгалтын дасгал ба дүгнэлт: химийн тооцоо', 'Exam practice and review: chemical calculations'),
    bi(
      'Hinge ба шалгалтын асуултаар бүх тооцоог шалгах; хамгийн их оноо алддаг алдааг засах; моль зураглалаар масс, бөөм, хий, уусмалыг холбох.',
      'Check all the calculations with hinge and exam questions; correct the mistakes that lose most marks; link mass, particles, gases and solutions on the mole map.'
    ),
    [
      bi('Шат бүрт дугуйлахгүй, зөвхөн эцсийн хариуг дугуйлна; хоёр атомт хий: O₂-ийн Mr = 32.', 'Do not round at every step – round only the final answer; diatomic gases: Mr of O₂ = 32.'),
      bi('cm³-ийг эхлээд dm³ болгоно; масс → моль → харьцаа → моль → масс; 1 : 2.5-ыг 2-оор үржүүлнэ.', 'Change cm³ to dm³ first; mass → moles → ratio → moles → mass; multiply 1 : 2.5 by 2.'),
      bi('Моль зураглал: моль = масс ÷ Mr = бөөм ÷ 6.02 × 10²³ = эзэлхүүн ÷ 24 = концентраци × эзэлхүүн (cm³) ÷ 1000.', 'The mole map: moles = mass ÷ Mr = particles ÷ 6.02 × 10²³ = volume ÷ 24 = concentration × volume (cm³) ÷ 1000.')
    ],
    lessonSteps(
      [
        [
          bi('Hinge асуулт', 'Hinge questions'),
          bi('Q1 (Core): 10 g устөрөгчийн хэт исэл 100 cm³-т – g/dm³; Q2 (E): 3.2 g O₂-ийн r.t.p. дахь эзэлхүүн. ABCD хуруугаар зэрэг санал өгүүлж, буруу сонголт бүрийг тайлбарлана.', 'Q1 (Core): 10 g of hydrogen peroxide in 100 cm³ – concentration in g/dm³; Q2 (E): the volume of 3.2 g of O₂ at r.t.p. Everyone votes with ABCD fingers, then explain each wrong option.'),
          bi('10 секунд бодоод 3-2-1-д хуруугаараа санал өгнө.', 'Think for 10 seconds and vote with fingers on 3-2-1.'),
          bi('Q1: D (100 g/dm³); Q2: A (2.4 dm³).', 'Q1: D (100 g/dm³); Q2: A (2.4 dm³).')
        ],
        [
          bi('Оноо алдах газрууд ба алдаа засах', 'Where marks are lost and the error clinic'),
          bi('6 нийтлэг алдааг засуулна (шат бүрт дугуйлах, O₂ = 16, 480 ÷ 24, масс × харьцаа, 1 : 2.5 → 1 : 3, 114% гарц). Үнэлэх: 112% гарцтай "сайн" туршилт. Алдаа засах: 8.0 g O₂ дахь моль.', 'Correct the 6 common mistakes (rounding at every step, O₂ = 16, 480 ÷ 24, mass × ratio, 1 : 2.5 → 1 : 3, a 114% yield). Evaluate: a "better than expected" experiment with a 112% yield. Error clinic: the moles in 8.0 g of O₂.'),
          bi('Алдаа бүрийг өөрийн үгээр засаж, загвар өгүүлбэрээр үнэлгээ бичнэ.', 'Correct each mistake in their own words and write the evaluation with the sentence frame.'),
          bi('8.0 ÷ 32 = 0.25 mol; 100%-иас их гарц = нойтон/хольцтой бүтээгдэхүүн.', '8.0 ÷ 32 = 0.25 mol; a yield above 100% means a wet or impure product.')
        ],
        [
          bi('Шалгалтын дасгал: Paper 4 (1)', 'Exam practice: Paper 4 (1)'),
          bi('Q2: хүчил 40% C, 6.7% H, 53.3% O – эмпирик ба молекулын томьёо, 12 g 250 cm³-т концентраци. Q5: хольцтой BaCO₃ ба 0.120 dm³ CO₂ – цэвэршил.', 'Q2: an acid with 40% C, 6.7% H, 53.3% O – empirical and molecular formulae and the concentration of 12 g in 250 cm³. Q5: impure BaCO₃ and 0.120 dm³ of CO₂ – percentage purity.'),
          bi('Шалгалтын нөхцөлд бичээд онооны схемээр хостойгоо солилцож засна.', 'Write under exam conditions, swap papers and mark with the mark scheme.'),
          bi('CH₂O; C₂H₄O₂; 0.80 mol/dm³; 0.985 g BaCO₃; 80.1%.', 'CH₂O; C₂H₄O₂; 0.80 mol/dm³; 0.985 g BaCO₃; 80.1%.')
        ],
        [
          bi('Шалгалтын дасгал: Paper 4 (2)', 'Exam practice: Paper 4 (2)'),
          bi('Q3: K₂CO₃ + MgSO₄ – аль нь илүүдэл, MgCO₃-ийн масс, хувийн гарц. Q4: пропаны бүрэн шаталт, CO₂-ийн эзэлхүүн, 50 cm³ CH₄ 150 cm³ O₂-д.', 'Q3: K₂CO₃ + MgSO₄ – which is in excess, the mass of MgCO₃, the percentage yield. Q4: complete combustion of propane, the volume of CO₂, 50 cm³ of CH₄ in 150 cm³ of O₂.'),
          bi('Шалгалтын нөхцөлд бичээд хостойгоо онооны цэг бүрийг тэмдэглэнэ.', 'Write under exam conditions and tick each marking point a partner scored.'),
          bi('K₂CO₃ илүүдэл; 0.42 g; 83.3%; C₃H₈ + 5O₂ → 3CO₂ + 4H₂O; 300 cm³; нийт 100 cm³.', 'K₂CO₃ in excess; 0.42 g; 83.3%; C₃H₈ + 5O₂ → 3CO₂ + 4H₂O; 300 cm³; 100 cm³ in total.')
        ],
        [
          bi('Моль зураглал ба гарах билет', 'The mole map and exit ticket'),
          bi('Моль зураглал ба концепт зураглалаар нэгтгэж, эхний санал хураалт руу буцна. Гарах билет: 20 g 500 cm³-т (g/dm³), (E) 25 g CaCO₃ → CaO, (E) NaOH-ийн титрлэлт. Амжилтын шалгуурт дахин fist to five.', 'Pull together with the mole map and the concept map and return to the opening vote. Exit ticket: 20 g in 500 cm³ (g/dm³), (E) 25 g CaCO₃ → CaO, (E) a titration of NaOH. Fist to five on the success criteria again.'),
          bi('Гарах билетийг 3 минутад ганцаараа чимээгүй бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone and in silence in 3 minutes; rate themselves 🟢🟡🔴.'),
          bi('40 g/dm³; 14 g; 0.120 mol/dm³.', '40 g/dm³; 14 g; 0.120 mol/dm³.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('10 g устөрөгчийн хэт ислийг 100 cm³ уусмал болгов. g/dm³-ээр концентраци хэд вэ?', '10 g of hydrogen peroxide is dissolved to make 100 cm³ of solution. What is the concentration in g/dm³?'),
        [bi('10 g/dm³', '10 g/dm³'), bi('20 g/dm³', '20 g/dm³'), bi('50 g/dm³', '50 g/dm³'), bi('100 g/dm³', '100 g/dm³')],
        3,
        bi('100 cm³ = 0.100 dm³; 10 ÷ 0.100 = 100 g/dm³.', '100 cm³ = 0.100 dm³; 10 ÷ 0.100 = 100 g/dm³.')
      ),
      exitItem(
        bi('(E) 3.2 g хүчилтөрөгчийн хий O₂ r.t.p.-д хэдэн dm³ эзлэх вэ?', '(E) What volume does 3.2 g of oxygen gas, O₂, occupy at r.t.p.?'),
        [bi('2.4 dm³', '2.4 dm³'), bi('4.8 dm³', '4.8 dm³'), bi('76.8 dm³', '76.8 dm³'), bi('0.24 dm³', '0.24 dm³')],
        0,
        bi('3.2 ÷ 32 = 0.10 mol; × 24 = 2.4 dm³. 4.8 dm³ нь Ar = 16 ашигласан алдаа.', '3.2 ÷ 32 = 0.10 mol; × 24 = 2.4 dm³. 4.8 dm³ comes from using Ar = 16.')
      ),
      exitItem(
        bi('20 g ууссан бодисыг 500 cm³ уусмал болгов. g/dm³-ээр концентраци хэд вэ?', '20 g of a solute is dissolved to make 500 cm³ of solution. What is the concentration in g/dm³?'),
        [bi('10 g/dm³', '10 g/dm³'), bi('40 g/dm³', '40 g/dm³'), bi('0.040 g/dm³', '0.040 g/dm³'), bi('10 000 g/dm³', '10 000 g/dm³')],
        1,
        bi('20 ÷ 0.500 = 40 g/dm³.', '20 ÷ 0.500 = 40 g/dm³.')
      ),
      exitItem(
        bi('(E) 25.0 cm³ NaOH-ийг 20.0 cm³ 0.150 mol/dm³ HCl саармагжуулна (1 : 1). NaOH-ийн концентраци хэд вэ?', '(E) 25.0 cm³ of NaOH is neutralised by 20.0 cm³ of 0.150 mol/dm³ HCl (1 : 1). What is the concentration of the NaOH?'),
        [bi('0.120 mol/dm³', '0.120 mol/dm³'), bi('0.150 mol/dm³', '0.150 mol/dm³'), bi('0.188 mol/dm³', '0.188 mol/dm³'), bi('3.00 mol/dm³', '3.00 mol/dm³')],
        0,
        bi('HCl 3.00 × 10⁻³ mol → NaOH 3.00 × 10⁻³ mol; ÷ 0.0250 dm³ = 0.120 mol/dm³.', 'HCl 3.00 × 10⁻³ mol → NaOH 3.00 × 10⁻³ mol; ÷ 0.0250 dm³ = 0.120 mol/dm³.')
      )
    ],
    ID
  )
];

export const IG3_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'ig3-5': [
    term(bi('моль (mol)', 'mole (mol)'), bi('Бодисын хэмжээний нэгж; 1 моль 6.02 × 10²³ бөөмтэй.', 'The unit of amount of substance; 1 mol contains 6.02 × 10²³ particles.')),
    term(bi('Авогадрогийн тогтмол', 'Avogadro constant'), bi('6.02 × 10²³ – 1 моль дахь бөөмийн тоо.', '6.02 × 10²³ – the number of particles in 1 mole.')),
    term(bi('молийн масс', 'molar mass'), bi('1 молийн масс, g/mol-оор (= Mr эсвэл Ar грамм).', 'The mass of 1 mole, in g/mol (= Mr or Ar in grams).'))
  ],
  'ig3-6': [
    term(bi('эмпирик томьёо', 'empirical formula'), bi('Нэгдэл дэх атомын хамгийн энгийн бүхэл тооны харьцаа.', 'The simplest whole-number ratio of atoms in a compound.')),
    term(bi('молекулын томьёо', 'molecular formula'), bi('Нэг молекул дахь атом бүрийн бодит тоо.', 'The actual number of each type of atom in one molecule.'))
  ],
  'ig3-7': [
    term(bi('хязгаарлагч урвалж', 'limiting reactant'), bi('Эхэлж дуусдаг (илүүдэлгүй) урвалж.', 'The reactant that is used up first (not in excess).')),
    term(bi('хувийн гарц', 'percentage yield'), bi('бодит гарц ÷ онолын гарц × 100.', 'actual yield ÷ predicted yield × 100.')),
    term(bi('цэвэршлийн хувь', 'percentage purity'), bi('цэвэр бүтээгдэхүүний масс ÷ хольцтой бүтээгдэхүүний масс × 100.', 'mass of pure product ÷ mass of impure product × 100.')),
    term(bi('массын бүрэлдэхүүний хувь', 'percentage composition'), bi('томьёо дахь элементийн масс ÷ Mr × 100.', 'mass of the element in the formula ÷ Mr × 100.'))
  ],
  'ig3-8': [
    term(bi('хийн молийн эзэлхүүн', 'molar gas volume'), bi('24 dm³ – ямар ч хийн 1 молийн r.t.p. дахь эзэлхүүн.', '24 dm³ – the volume of 1 mole of any gas at r.t.p.')),
    term(bi('концентраци', 'concentration'), bi('1 dm³ уусмал дахь ууссан бодисын хэмжээ: g/dm³ эсвэл mol/dm³.', 'The amount of solute per dm³ of solution: g/dm³ or mol/dm³.')),
    term(bi('титрлэлт', 'titration'), bi('Бюреткаас уусмалыг төгсгөлийн цэг хүртэл нэмэх.', 'Adding a solution from a burette until the end-point is reached.')),
    term(bi('1 dm³', '1 dm³'), bi('= 1000 cm³ (cm³-ийг dm³ болгохдоо 1000-д хуваана).', '= 1000 cm³ (to change cm³ to dm³, divide by 1000).'))
  ],
  'ig3-9': [
    term(bi('илүүдэл', 'excess'), bi('"Илүүдэл хүчил" гэдэг нь нөгөө урвалж хязгаарлагч гэсэн үг; тооцоог илүүдэлгүй урвалжаас эхлүүлнэ.', '"Excess" acid means the other reactant is limiting; always start from the reactant that is not in excess.')),
    term(bi('concordant титр', 'concordant titres'), bi('Хоорондоо 0.10 cm³-ийн дотор тохирох титрүүд; дундажийг эдгээрээс тооцно.', 'Titres within 0.10 cm³ of each other; the mean is taken from these.'))
  ]
};

export const IG3_PRACTICE_B: Record<string, PracticeItem[]> = {
  'ig3-5': [
    easy(
      bi('(E) 0.20 mol CO₂ (Mr 44)-ийн масс хэд вэ?', '(E) What is the mass of 0.20 mol of CO₂ (Mr 44)?'),
      [bi('0.0045 g', '0.0045 g'), bi('8.8 g', '8.8 g'), bi('44 g', '44 g'), bi('220 g', '220 g')],
      1,
      bi('масс = моль × Mr = 0.20 × 44 = 8.8 g.', 'mass = moles × Mr = 0.20 × 44 = 8.8 g.')
    ),
    easy(
      bi('(E) 0.25 mol ус 4.5 g масстай. Молийн масс хэд вэ?', '(E) 0.25 mol of water has a mass of 4.5 g. What is its molar mass?'),
      [bi('1.1 g/mol', '1.1 g/mol'), bi('18 g/mol', '18 g/mol'), bi('4.75 g/mol', '4.75 g/mol'), bi('0.056 g/mol', '0.056 g/mol')],
      1,
      bi('4.5 ÷ 0.25 = 18 g/mol.', '4.5 ÷ 0.25 = 18 g/mol.')
    ),
    hard(
      bi('(E) 4.4 g CO₂-д хэдэн моль, хэдэн молекул байх вэ? 4 алхмаар бод. (C = 12, O = 16)', '(E) How many moles, and how many molecules, are in 4.4 g of CO₂? Use the 4 steps. (C = 12, O = 16)'),
      bi('Mr = 12 + (2 × 16) = 44; моль = 4.4 ÷ 44 = 0.10 mol; молекул = 0.10 × 6.02 × 10²³ = 6.02 × 10²² молекул.', 'Mr = 12 + (2 × 16) = 44; moles = 4.4 ÷ 44 = 0.10 mol; molecules = 0.10 × 6.02 × 10²³ = 6.02 × 10²² molecules.'),
      bi('Шалга: 4.4 g нь 44 g-ийн аравны нэг тул молийн аравны нэг; нэгж (mol) бич.', 'Check: 4.4 g is one tenth of 44 g, so one tenth of a mole; write the unit (mol).')
    )
  ],
  'ig3-6': [
    easy(
      bi('(E) 2.4 g нүүрстөрөгч 0.6 g устөрөгчтэй нэгдэнэ. Эмпирик томьёо аль нь вэ?', '(E) 2.4 g of carbon combines with 0.6 g of hydrogen. What is the empirical formula?'),
      [bi('CH', 'CH'), bi('CH₂', 'CH₂'), bi('CH₃', 'CH₃'), bi('C₄H', 'C₄H')],
      2,
      bi('C 2.4 ÷ 12 = 0.2; H 0.6 ÷ 1 = 0.6 → 1 : 3.', 'C 2.4 ÷ 12 = 0.2; H 0.6 ÷ 1 = 0.6 → 1 : 3.')
    ),
    easy(
      bi('(E) 1.4 g N 3.2 g O-той нэгдэнэ; Mr = 92. Молекулын томьёо аль нь вэ?', '(E) 1.4 g of N combines with 3.2 g of O; Mr = 92. What is the molecular formula?'),
      [bi('NO₂', 'NO₂'), bi('N₂O', 'N₂O'), bi('N₂O₄', 'N₂O₄'), bi('NO', 'NO')],
      2,
      bi('N 0.1 : O 0.2 → NO₂ (Mr 46); 92 ÷ 46 = 2 → N₂O₄.', 'N 0.1 : O 0.2 → NO₂ (Mr 46); 92 ÷ 46 = 2 → N₂O₄.')
    ),
    hard(
      bi('(E) 9.2 g Al хүчилтөрөгчтэй урвалд ороход хэдэн грамм Al₂O₃ үүсэх вэ? 4Al + 3O₂ → 2Al₂O₃ (Al = 27, Mr Al₂O₃ = 102)', '(E) What mass of Al₂O₃ forms when 9.2 g of Al reacts with oxygen? 4Al + 3O₂ → 2Al₂O₃ (Al = 27, Mr of Al₂O₃ = 102)'),
      bi('Дээш: 9.2 ÷ 27 = 0.341 mol Al; хөндлөн: 4 : 2 → 0.170 mol Al₂O₃; доош: 0.170 × 102 = 17.4 g.', 'Up: 9.2 ÷ 27 = 0.341 mol Al; across: 4 : 2 → 0.170 mol Al₂O₃; down: 0.170 × 102 = 17.4 g.'),
      bi('Бүх цифрийг эцэс хүртэл хадгал: 0.34 → 0.17 гэж дугуйлбал 17.3 g болж оноо алдана.', 'Keep all digits to the end: rounding to 0.34 → 0.17 gives 17.3 g and loses the mark.')
    )
  ],
  'ig3-7': [
    easy(
      bi('(E) Fe₂O₃ (Mr 160) дахь төмрийн массын хувь хэд вэ? (Fe = 56)', '(E) What is the percentage by mass of iron in Fe₂O₃ (Mr 160)? (Fe = 56)'),
      [bi('35%', '35%'), bi('56%', '56%'), bi('70%', '70%'), bi('112%', '112%')],
      2,
      bi('2 Fe = 112; 112 ÷ 160 × 100 = 70%.', '2 Fe = 112; 112 ÷ 160 × 100 = 70%.')
    ),
    easy(
      bi('(E) 12.5 g хольцтой CaCO₃ дээж 10.0 g цэвэр CaCO₃ агуулна. Цэвэршлийн хувь хэд вэ?', '(E) A 12.5 g sample of impure CaCO₃ contains 10.0 g of pure CaCO₃. What is the percentage purity?'),
      [bi('80%', '80%'), bi('125%', '125%'), bi('20%', '20%'), bi('10%', '10%')],
      0,
      bi('10.0 ÷ 12.5 × 100 = 80%.', '10.0 ÷ 12.5 × 100 = 80%.')
    ),
    hard(
      bi('(E) 4.0 g Mg 5.48 g HCl-тэй урвалд орно. Mg + 2HCl → MgCl₂ + H₂ (Mg = 24, Cl = 35.5, H = 1). Аль нь хязгаарлагч вэ?', '(E) 4.0 g of Mg reacts with 5.48 g of HCl. Mg + 2HCl → MgCl₂ + H₂ (Mg = 24, Cl = 35.5, H = 1). Which reactant is limiting?'),
      bi('Mg: 4.0 ÷ 24 = 0.167 mol (÷ 1 = 0.167); HCl: 5.48 ÷ 36.5 = 0.150 mol (÷ 2 = 0.075). 0.075 < 0.167 тул HCl хязгаарлагч, Mg илүүдэл.', 'Mg: 4.0 ÷ 24 = 0.167 mol (÷ 1 = 0.167); HCl: 5.48 ÷ 36.5 = 0.150 mol (÷ 2 = 0.075). 0.075 < 0.167, so HCl is limiting and Mg is in excess.'),
      bi('Моль бүрийг тэгшитгэл дэх коэффициентод хуваахаа бүү март.', 'Remember to divide each number of moles by its coefficient in the equation.')
    )
  ],
  'ig3-8': [
    easy(
      bi('(E) r.t.p.-д 0.06 mol аммиак хэдэн cm³ эзлэх вэ?', '(E) What volume in cm³ does 0.06 mol of ammonia occupy at r.t.p.?'),
      [bi('1.44 cm³', '1.44 cm³'), bi('144 cm³', '144 cm³'), bi('1440 cm³', '1440 cm³'), bi('400 cm³', '400 cm³')],
      2,
      bi('0.06 × 24 000 = 1440 cm³.', '0.06 × 24 000 = 1440 cm³.')
    ),
    easy(
      bi('(E) 25.0 cm³ 0.100 mol/dm³ давсны хүчилд хэдэн моль HCl байх вэ?', '(E) How many moles of HCl are in 25.0 cm³ of 0.100 mol/dm³ hydrochloric acid?'),
      [bi('2.50 mol', '2.50 mol'), bi('2.50 × 10⁻³ mol', '2.50 × 10⁻³ mol'), bi('0.250 mol', '0.250 mol'), bi('4.00 × 10⁻³ mol', '4.00 × 10⁻³ mol')],
      1,
      bi('0.100 × 25.0 ÷ 1000 = 2.50 × 10⁻³ mol.', '0.100 × 25.0 ÷ 1000 = 2.50 × 10⁻³ mol.')
    ),
    hard(
      bi('(E) 12.5 cm³ H₂SO₄ нь 25.0 cm³ 0.10 mol/dm³ NaOH-ийг саармагжуулна. H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. H₂SO₄-ийн концентрацийг ол.', '(E) 12.5 cm³ of H₂SO₄ neutralises 25.0 cm³ of 0.10 mol/dm³ NaOH. H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Find the concentration of the H₂SO₄.'),
      bi('NaOH: 0.10 × 25.0 ÷ 1000 = 2.5 × 10⁻³ mol; H₂SO₄ = 2.5 × 10⁻³ ÷ 2 = 1.25 × 10⁻³ mol; ÷ 0.0125 dm³ = 0.10 mol/dm³.', 'NaOH: 0.10 × 25.0 ÷ 1000 = 2.5 × 10⁻³ mol; H₂SO₄ = 2.5 × 10⁻³ ÷ 2 = 1.25 × 10⁻³ mol; ÷ 0.0125 dm³ = 0.10 mol/dm³.'),
      bi('1 H₂SO₄ : 2 NaOH харьцааг мартвал 0.20 mol/dm³ гэж буруу гарна.', 'Forgetting the 1 H₂SO₄ : 2 NaOH ratio gives the wrong answer 0.20 mol/dm³.')
    )
  ],
  'ig3-9': [
    easy(
      bi('(E) 8.0 g хүчилтөрөгчийн хий O₂-д хэдэн моль байх вэ?', '(E) How many moles are in 8.0 g of oxygen gas, O₂?'),
      [bi('0.50 mol', '0.50 mol'), bi('0.25 mol', '0.25 mol'), bi('2.0 mol', '2.0 mol'), bi('4.0 mol', '4.0 mol')],
      1,
      bi('Mr(O₂) = 32; 8.0 ÷ 32 = 0.25 mol. 8.0 ÷ 16 = 0.50 гэх нь нийтлэг алдаа.', 'Mr of O₂ = 32; 8.0 ÷ 32 = 0.25 mol. 8.0 ÷ 16 = 0.50 is the common mistake.')
    ),
    easy(
      bi('(E) Пропаны бүрэн шаталтын тэнцүүлсэн тэгшитгэл аль нь вэ?', '(E) Which is the balanced equation for the complete combustion of propane?'),
      [
        bi('C₃H₈ + 5O₂ → 3CO₂ + 4H₂O', 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O'),
        bi('C₃H₈ + 3O₂ → 3CO₂ + 4H₂O', 'C₃H₈ + 3O₂ → 3CO₂ + 4H₂O'),
        bi('C₃H₈ + 5O₂ → 3CO₂ + 8H₂O', 'C₃H₈ + 5O₂ → 3CO₂ + 8H₂O'),
        bi('C₃H₈ + O₂ → CO₂ + H₂O', 'C₃H₈ + O₂ → CO₂ + H₂O')
      ],
      0,
      bi('C 3 = 3; H 8 = 8; O 10 = 6 + 4.', 'C 3 = 3; H 8 = 8; O 10 = 6 + 4.')
    ),
    hard(
      bi('(E) Илүүдэл HCl-ийг 1.23 g хольцтой BaCO₃-д нэмэхэд r.t.p.-д 0.120 dm³ CO₂ ялгарав. BaCO₃ + 2HCl → BaCl₂ + CO₂ + H₂O. Цэвэршлийн хувийг ол (Ba = 137).', '(E) Excess HCl is added to 1.23 g of impure BaCO₃ and 0.120 dm³ of CO₂ is collected at r.t.p. BaCO₃ + 2HCl → BaCl₂ + CO₂ + H₂O. Find the percentage purity (Ba = 137).'),
      bi('CO₂: 0.120 ÷ 24 = 0.00500 mol; BaCO₃ 0.00500 mol (1 : 1); Mr = 197; масс = 0.985 g; 0.985 ÷ 1.23 × 100 = 80.1%.', 'CO₂: 0.120 ÷ 24 = 0.00500 mol; BaCO₃ 0.00500 mol (1 : 1); Mr = 197; mass = 0.985 g; 0.985 ÷ 1.23 × 100 = 80.1%.'),
      bi('Онооны схем: алхам бүрт [1], нийт 5 оноо.', 'Mark scheme: [1] for each step, 5 marks in all.')
    )
  ]
};
