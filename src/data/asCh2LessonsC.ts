// AS 9701 chapter 2 (atoms, molecules and stoichiometry), lessons 5–6: the two problem-set decks the chapter deck names
// as extra practice, 03a_Ch3_15_Problems.pptx (15 problems, 3.1–3.6) and 03b_Ch3_20_More_Problems.pptx (20 problems on
// solutions). Each is a 60-minute practice lesson. Every question and answer here comes from those decks.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'as2';

export const AS2_LESSONS_C: StatesLesson[] = [
  lesson(
    5,
    bi('Дасгал: моль, томьёо ба тэгшитгэлийн 15 бодлого', 'Practice: 15 problems on moles, formulae and equations'),
    bi(
      '3.1–3.6-ийн мэдлэг, ойлголт, чадварыг 15 бодлогоор (5 хялбар, 5 дунд, 5 хүнд) шалгах: Ar, моль, томьёо, тэнцүүлэх, усжсан давс, изотопын хувь, эмпирик томьёо, ионы тэгшитгэл, хязгаарлагч урвалж ба гарц, масс спектр, шаталтын өгөгдөл.',
      'Check knowledge, understanding and skills from 3.1–3.6 with 15 problems (5 easy, 5 medium, 5 hard): Ar, moles, formulae, balancing, hydrated salts, isotope abundances, empirical formulae, ionic equations, limiting reagent and yield, mass spectra, combustion data.'
    ),
    [
      bi('Хялбар (1 оноо, 2 мин), дунд (2 оноо, 4 мин), хүнд (3 оноо, 6 мин) → нийт 30. Бодолтоо харуулж, нэгж бичиж, өгсөн Ar-ийг хэрэглэнэ.', 'Easy (1 mark, 2 min), medium (2 marks, 4 min), hard (3 marks, 6 min) → total 30. Show working, give units and use the Ar values given.'),
      bi('Урвуу бодлого: Ar(Cu) = 63.55 → 63x + 65(100 − x) = 6355 → 72.5 % ⁶³Cu. Усжсан давс: 2.50 g → 1.60 g → x = 5.', 'Reverse problems: Ar(Cu) = 63.55 → 63x + 65(100 − x) = 6355 → 72.5 % ⁶³Cu. Hydrated salt: 2.50 g → 1.60 g → x = 5.'),
      bi('Хүнд бодлого: эхлээд мольд шилжиж хязгаарлагчийг олно (Cl₂ → 84.0 %); [M+1]-ээр C тоолж фрагментаар бүтэц (бутанон); шаталтаас C ба H-ийн моль (C₂H₆).', 'Hard problems: change to moles first and find the limiting reagent (Cl₂ → 84.0 %); count C with [M+1] and use fragments for the structure (butanone); moles of C and H from combustion (C₂H₆).')
    ],
    lessonSteps(
      [
        [
          bi('Нээлт, заавар, 15 бодлого', 'Opening, how to use the set, the 15 problems'),
          bi('Хамрах хүрээ 3.1–3.6; ногоон = мэдлэг, шар = ойлголт, улаан = чадвар. Оноогоо тэмдэглэнэ (нийт 30). 15 бодлогыг нэг слайдаас уншиж эхэлнэ.', 'Coverage 3.1–3.6; green = knowledge, yellow = understanding, red = skills. Keep a running score out of 30. Read the 15 problems from the one slide and start.'),
          bi('Хялбарыг анги хамт мини самбараар, дундыг хосоор, хүндийг ганцаараа шалгалтын нөхцөлд бодно.', 'Easy as a class on mini whiteboards, medium in pairs, hard alone under exam conditions.'),
          bi('Бодолт, нэгж, өгсөн Ar; оноогоо зөв тоолно.', 'Working shown, units given, the given Ar used; scores counted correctly.')
        ],
        [
          bi('Хялбар E1–E5: бодолт', 'Easy E1–E5: solutions'),
          bi('E1 Ar(B) (10 × 19.9 + 11 × 80.1)/100 = 10.8; E2 8.50 g NH₃ → 0.500 mol; E3 Al₂(SO₄)₃, (NH₄)₂CO₃, Ca(OH)₂; E4 C₃H₈ + 5O₂ → 3CO₂ + 4H₂O; E5 CuSO₄·5H₂O = 249.6, талстжилтын ус.', 'E1 Ar(B) (10 × 19.9 + 11 × 80.1)/100 = 10.8; E2 8.50 g NH₃ → 0.500 mol; E3 Al₂(SO₄)₃, (NH₄)₂CO₃, Ca(OH)₂; E4 C₃H₈ + 5O₂ → 3CO₂ + 4H₂O; E5 CuSO₄·5H₂O = 249.6, water of crystallisation.'),
          bi('Зөв алхмаа тэмдэглэж, анхны буруу алхмыг улаанаар засна.', 'Tick each correct step and correct the first wrong step in red.'),
          bi('Энгийн дундаж (10.5) авахгүй; 0.5 биш 0.500; Al₂SO₄₃ (хаалтгүй) биш; 5H₂O-г 26 гэж уншихгүй; ионы нэгдэлд "relative formula mass".', 'Not the simple mean (10.5); 0.500, not 0.5; not Al₂SO₄₃ (no brackets); do not read 5H₂O as 26; "relative formula mass" for ionic compounds.')
        ],
        [
          bi('Дунд M1–M5: бодолт', 'Medium M1–M5: solutions'),
          bi('M1 Cu 72.5 % ба 27.5 %; M2 C 40.0, H 6.7, O 53.3 % → CH₂O → C₆H₁₂O₆; M3 x = 5; M4 Ag⁺(aq) + Cl⁻(aq) → AgCl(s), Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g); M5 4.40 g CO₂ → 1.81 × 10²³ атом, 1.20 × 10²³ O.', 'M1 Cu 72.5 % and 27.5 %; M2 C 40.0, H 6.7, O 53.3 % → CH₂O → C₆H₁₂O₆; M3 x = 5; M4 Ag⁺(aq) + Cl⁻(aq) → AgCl(s), Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g); M5 4.40 g CO₂ → 1.81 × 10²³ atoms, 1.20 × 10²³ O.'),
          bi('Хосоор бодоод алхам бүрийг шалгана.', 'Solve in pairs and check each step.'),
          bi('Хувийг шууд харьцаа гэж авахгүй; усжсан давсны массыг хэрэглэхгүй; x-ийг бүхэл болгоно; молекулын тоог атомын тоо гэж андуурахгүй.', 'Do not use the percentages as the ratio; do not use the hydrated mass; round x to a whole number; do not confuse molecules with atoms.')
        ],
        [
          bi('Хүнд H1–H5: бодолт', 'Hard H1–H5: solutions'),
          bi('H1 Al 0.200, Cl₂ 0.250 mol → Cl₂ хязгаарлагч → 22.25 g → 84.0 %; H2 n = 100 × 1.76/(1.1 × 40.0) = 4 → C₄H₈O, бутанон (43, 29, 57); H3 3 : 1 → нэг Cl → C₃H₇Cl, 80-д C₃H₇³⁷Cl⁺; H4 CH₃ → C₂H₆, 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O; H5 FeCl₃, 2Fe + 3Cl₂ → 2FeCl₃, Fe³⁺ + 3OH⁻ → Fe(OH)₃(s).', 'H1 Al 0.200, Cl₂ 0.250 mol → Cl₂ limiting → 22.25 g → 84.0 %; H2 n = 100 × 1.76/(1.1 × 40.0) = 4 → C₄H₈O, butanone (43, 29, 57); H3 3 : 1 → one Cl → C₃H₇Cl, 80 is C₃H₇³⁷Cl⁺; H4 CH₃ → C₂H₆, 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O; H5 FeCl₃, 2Fe + 3Cl₂ → 2FeCl₃, Fe³⁺ + 3OH⁻ → Fe(OH)₃(s).'),
          bi('Ганцаараа 6 минут бодоод, алхам бүрийг шалгана.', 'Solve alone for 6 minutes each, then check each step.'),
          bi('Al-аар онолын масс тооцвол 70.0 % (буруу); 1.1-ийг мартахгүй; фрагментэд + цэнэг; H₂O-ийн молийг ×2; Cl₂ биш Cl атомоор харьцаа.', 'Using Al for the predicted mass gives 70.0 % (wrong); do not forget the 1.1; + charges on fragments; × 2 for the moles of H in H₂O; use Cl atoms, not Cl₂, for the ratio.')
        ],
        [
          bi('Хариултын түлхүүр ба өөрийн үнэлгээ', 'Answer key and self-score'),
          bi('Бүх эцсийн хариу нэг дор. Оноо: 24+ маш сайн; 15–23 дунд; 15-аас доош бол дунд ба хүнд бодлогыг дахин хийнэ.', 'All final answers in one place. Scores: 24+ very good; 15–23 middle; below 15 redo the medium and hard problems.'),
          bi('Нийт оноогоо (30-аас) тооцож, дахин хийх бодлогоо сонгоно.', 'Total the score out of 30 and choose which problems to redo.'),
          bi('Оноо тооцогдсон; дахин хийх бодлого сонгогдсон.', 'Score totalled; problems to redo chosen.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('8.50 g аммиак, NH₃-д хэдэн моль байх вэ? (N 14.0, H 1.0)', 'How many moles of ammonia, NH₃, are in 8.50 g? (N 14.0, H 1.0)'),
        [bi('0.500 mol', '0.500 mol'), bi('0.607 mol', '0.607 mol'), bi('2.00 mol', '2.00 mol'), bi('144.5 mol', '144.5 mol')],
        0,
        bi('M = 17.0; 8.50 ÷ 17.0.', 'M = 17.0; 8.50 ÷ 17.0.')
      ),
      exitItem(
        bi('Cu: ⁶³Cu ба ⁶⁵Cu, Ar = 63.55. ⁶³Cu-ийн хувь?', 'Cu has ⁶³Cu and ⁶⁵Cu, with Ar = 63.55. What is the % of ⁶³Cu?'),
        [bi('50.0 %', '50.0 %'), bi('27.5 %', '27.5 %'), bi('72.5 %', '72.5 %'), bi('63.6 %', '63.6 %')],
        2,
        bi('6500 − 2x = 6355 → x = 72.5.', '6500 − 2x = 6355 → x = 72.5.')
      ),
      exitItem(
        bi('2.50 g CuSO₄·xH₂O-г халаахад 1.60 g CuSO₄ үлдэв. x? (CuSO₄ 159.6, H₂O 18.0)', '2.50 g CuSO₄·xH₂O is heated and 1.60 g CuSO₄ remains. x? (CuSO₄ 159.6, H₂O 18.0)'),
        [bi('3', '3'), bi('4', '4'), bi('5', '5'), bi('7', '7')],
        2,
        bi('0.0500 ÷ 0.01003 = 4.99 ≈ 5.', '0.0500 ÷ 0.01003 = 4.99 ≈ 5.')
      ),
      exitItem(
        bi('5.40 g Al ба 17.75 g Cl₂: 2Al + 3Cl₂ → 2AlCl₃. Аль нь хязгаарлагч вэ?', '5.40 g Al and 17.75 g Cl₂: 2Al + 3Cl₂ → 2AlCl₃. Which is the limiting reagent?'),
        [bi('Al', 'Al'), bi('Cl₂', 'Cl₂'), bi('Хоёулаа яг тэнцүү', 'Both exactly'), bi('AlCl₃', 'AlCl₃')],
        1,
        bi('0.200 mol Al-д 0.300 mol Cl₂ хэрэгтэй > 0.250.', '0.200 mol Al needs 0.300 mol Cl₂ > 0.250.')
      ),
      exitItem(
        bi('Кетон: M⁺ 72 (40.0), [M+1] 1.76. Хэдэн C атом?', 'A ketone: M⁺ 72 (40.0), [M+1] 1.76. How many C atoms?'),
        [bi('3', '3'), bi('4', '4'), bi('5', '5'), bi('6', '6')],
        1,
        bi('100 × 1.76 ÷ (1.1 × 40.0) = 4 → C₄H₈O.', '100 × 1.76 ÷ (1.1 × 40.0) = 4 → C₄H₈O.')
      )
    ],
    ID
  ),
  lesson(
    6,
    bi('Дасгал: уусмал ба моль – 20 нэмэлт бодлого', 'Practice: 20 more problems on solutions and moles'),
    bi(
      'Уусмалын концентраци (mol dm⁻³ ба g dm⁻³), шингэрүүлэх ба холих, уусмал дахь ион, титрлэлт (энгийн, буцаах, redox), уусмалаас тунадас ба хий, цэвэршил, талстжилтын ус, томьёог 20 бодлогоор (6 хялбар, 7 дунд, 7 хүнд) дадлагажуулах.',
      'Practise with 20 problems (6 easy, 7 medium, 7 hard): concentration (mol dm⁻³ and g dm⁻³), dilution and mixing, ions in solution, titrations (simple, back and redox), precipitates and gases from solutions, purity, water of crystallisation and formulae.'
    ),
    [
      bi('Үргэлж: cm³ ÷ 1000 → dm³; n = c × V; мольн харьцааг хэрэглэнэ. Хялбар 1, дунд 2, хүнд 3 оноо → нийт 41.', 'Always: cm³ ÷ 1000 → dm³; n = c × V; use the mole ratio. Easy 1, medium 2, hard 3 marks → total 41.'),
      bi('Шингэрүүлэхэд моль өөрчлөгдөхгүй (c₁V₁ = c₂V₂); холиход ион бүрийн молийг нэмж нийт эзлэхүүнд хуваана; ионы концентраци = давс × ионы тоо (Al₂(SO₄)₃ 0.150 → Al³⁺ 0.300).', 'Diluting does not change the moles (c₁V₁ = c₂V₂); when mixing, add the moles of each ion and divide by the total volume; ion concentration = salt × number of ions (Al₂(SO₄)₃ 0.150 → Al³⁺ 0.300).'),
      bi('Буцаах титрлэлт: нийт − илүүдэл = урвалд орсон (76.1 % CaCO₃). Аликвот: 250 cm³-аас 25.0 cm³ = ×10. Redox: 1 MnO₄⁻ : 5 Fe²⁺.', 'Back titration: total − excess = reacted (76.1 % CaCO₃). Aliquot: 25.0 cm³ of 250 cm³ = × 10. Redox: 1 MnO₄⁻ : 5 Fe²⁺.')
    ],
    lessonSteps(
      [
        [
          bi('Нээлт, заавар, 20 бодлого', 'Opening, how to use the set, the 20 problems'),
          bi('2 дахь багц: 20-оос 14 нь уусмалын концентраци. Хялбар E1–E6 (2 мин), дунд M1–M7 (4 мин), хүнд H1–H7 (6 мин); нийт 41 оноо. Бодлогын жагсаалтыг хоёр слайдаас уншина.', 'The second set: 14 of the 20 are on concentration. Easy E1–E6 (2 min), medium M1–M7 (4 min), hard H1–H7 (6 min); total 41 marks. Read the list from the two slides.'),
          bi('Эхлээд өөрөө оролдоод дараа нь алхам бүрийг дарж шалгана; оноогоо тэмдэглэнэ.', 'Try each first, then click to reveal each step; keep a running score.'),
          bi('Бодолт, нэгж, 3 орон.', 'Working shown, units and 3 s.f.')
        ],
        [
          bi('Хялбар E1–E6', 'Easy E1–E6'),
          bi('E1 4.00 g NaOH 500 cm³-д → 0.200 mol dm⁻³, 8.00 g dm⁻³; E2 25.0 cm³ 2.00 → 250 cm³ → 0.200; E3 Na₂S₂O₃·5H₂O (248.2) → 12.4 g; E4 Al³⁺ 0.300, SO₄²⁻ 0.450; E5 MgCl₂ → 1.20 × 10²² Cl⁻; E6 5.00 mol dm⁻³ нөөцөөс 25.0 cm³.', 'E1 4.00 g NaOH in 500 cm³ → 0.200 mol dm⁻³, 8.00 g dm⁻³; E2 25.0 cm³ of 2.00 → 250 cm³ → 0.200; E3 Na₂S₂O₃·5H₂O (248.2) → 12.4 g; E4 Al³⁺ 0.300, SO₄²⁻ 0.450; E5 MgCl₂ → 1.20 × 10²² Cl⁻; E6 25.0 cm³ of the 5.00 mol dm⁻³ stock.'),
          bi('2 минут оролдоод алхмуудыг дарна.', 'Try for 2 minutes, then reveal the steps.'),
          bi('0.100/500 биш; нэмсэн ус (225 cm³) шинэ эзлэхүүн биш; усгүй Mr (158.2) биш; ×2-ыг мартахгүй; эзлэхүүнийг cm³-ээр.', 'Not 0.100/500; the added water (225 cm³) is not the new volume; not the anhydrous Mr (158.2); do not forget × 2; give the volume in cm³.')
        ],
        [
          bi('Дунд M1–M7', 'Medium M1–M7'),
          bi('M1 NaCl + CaCl₂ холимог → [Cl⁻] 0.200; M2 Na₂CO₃ 0.0450 mol dm⁻³, 250 cm³-д 1.19 g; M3 цуу 0.750 mol dm⁻³, 45.0 g dm⁻³; M4 Ba²⁺ + SO₄²⁻ → BaSO₄, [Na₂SO₄] 0.0500; M5 Mg + HCl → 120 cm³ H₂; M6 Pb²⁺ + 2I⁻ → PbI₂(s), 0.922 g; M7 шохойн чулуу 80.1 %.', 'M1 NaCl + CaCl₂ mixture → [Cl⁻] 0.200; M2 Na₂CO₃ 0.0450 mol dm⁻³, 1.19 g in 250 cm³; M3 vinegar 0.750 mol dm⁻³, 45.0 g dm⁻³; M4 Ba²⁺ + SO₄²⁻ → BaSO₄, [Na₂SO₄] 0.0500; M5 Mg + HCl → 120 cm³ H₂; M6 Pb²⁺ + 2I⁻ → PbI₂(s), 0.922 g; M7 limestone 80.1 %.'),
          bi('4 минут оролдоод алхмуудыг дарна.', 'Try for 4 minutes, then reveal the steps.'),
          bi('Концентрацийг шууд нэмэхгүй; 1 : 2 харьцаа (0.0900 биш); ×10-ыг мартахгүй; харьцааг 1 : 1 гэвэл 240 cm³; үлдсэн хатуу бодис (8.10 g) CaCO₃ биш.', 'Do not add concentrations directly; the ratio is 1 : 2 (not 0.0900); do not forget × 10; a 1 : 1 ratio gives 240 cm³; the solid left (8.10 g) is not CaCO₃.')
        ],
        [
          bi('Хүнд H1–H7', 'Hard H1–H7'),
          bi('H1 буцаах титрлэлт → 76.1 %; H2 Na₂CO₃·xH₂O → Mr 286 → x = 10; H3 M(OH)₂ → Mr 74.0 → Ca; H4 KMnO₄ → [Fe²⁺] 0.0864, 24.0 g dm⁻³; H5 AgNO₃ + CaCl₂ → Ag⁺ хязгаарлагч, 0.717 g, [Cl⁻] 0.0222; H6 98 % H₂SO₄ → 18.4 mol dm⁻³, 27.2 cm³; H7 C₃H₈O.', 'H1 back titration → 76.1 %; H2 Na₂CO₃·xH₂O → Mr 286 → x = 10; H3 M(OH)₂ → Mr 74.0 → Ca; H4 KMnO₄ → [Fe²⁺] 0.0864, 24.0 g dm⁻³; H5 AgNO₃ + CaCl₂ → Ag⁺ limiting, 0.717 g, [Cl⁻] 0.0222; H6 98 % H₂SO₄ → 18.4 mol dm⁻³, 27.2 cm³; H7 C₃H₈O.'),
          bi('6 минут ганцаараа оролдоод алхмуудыг дарна.', 'Try alone for 6 minutes, then reveal the steps.'),
          bi('Илүүдэл HCl-ийг урвалд орсон гэж андуурахгүй; ×10-ыг мартвал Mr 2860; зөвхөн нэг OH хасахгүй; 1 : 5; нийт эзлэхүүн 45.0 cm³; хүчлийг усанд нэмнэ; O-г хасах аргаар олно.', 'Do not take the excess HCl as reacted; forgetting × 10 gives Mr 2860; do not subtract only one OH; 1 : 5; the total volume is 45.0 cm³; add acid to water; find O by difference.')
        ],
        [
          bi('Хариултын түлхүүр ба өөрийн үнэлгээ', 'Answer key and self-score'),
          bi('Бүх эцсийн хариу нэг дор. Оноо 41-ээс: 32+ маш сайн; 20–31 дунд; 20-оос доош бол дунд ба хүнд бодлогыг дахин хийнэ.', 'All final answers in one place. Out of 41: 32+ very good; 20–31 middle; below 20 redo the medium and hard problems.'),
          bi('Нийт оноогоо тооцож, дахин хийх бодлогоо сонгоно.', 'Total the score and choose which problems to redo.'),
          bi('Оноо тооцогдсон; дахин хийх бодлого сонгогдсон.', 'Score totalled; problems to redo chosen.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('2.00 mol dm⁻³ HCl-ийн 25.0 cm³-ийг яг 250 cm³ болтол шингэрүүлэв. Шинэ концентраци?', '25.0 cm³ of 2.00 mol dm⁻³ HCl is diluted to exactly 250 cm³. New concentration?'),
        [bi('0.200 mol dm⁻³', '0.200 mol dm⁻³'), bi('0.222 mol dm⁻³', '0.222 mol dm⁻³'), bi('20.0 mol dm⁻³', '20.0 mol dm⁻³'), bi('2.00 mol dm⁻³', '2.00 mol dm⁻³')],
        0,
        bi('0.0500 mol ÷ 0.250 dm³ (×10 шингэрүүлэлт).', '0.0500 mol ÷ 0.250 dm³ (× 10 dilution).')
      ),
      exitItem(
        bi('0.150 mol dm⁻³ Al₂(SO₄)₃-д SO₄²⁻-ийн концентраци?', 'In 0.150 mol dm⁻³ Al₂(SO₄)₃, what is the concentration of SO₄²⁻?'),
        [bi('0.150', '0.150'), bi('0.300', '0.300'), bi('0.450', '0.450'), bi('0.0500', '0.0500')],
        2,
        bi('3 × 0.150.', '3 × 0.150.')
      ),
      exitItem(
        bi('Илүүдэл Mg-ийг 0.500 mol dm⁻³ HCl-ийн 20.0 cm³-д хийв. r.t.p.-д H₂-ийн эзлэхүүн?', 'Excess Mg is added to 20.0 cm³ of 0.500 mol dm⁻³ HCl. Volume of H₂ at r.t.p.?'),
        [bi('240 cm³', '240 cm³'), bi('120 cm³', '120 cm³'), bi('60 cm³', '60 cm³'), bi('480 cm³', '480 cm³')],
        1,
        bi('0.0100 mol HCl → 0.00500 mol H₂ × 24 000.', '0.0100 mol HCl → 0.00500 mol H₂ × 24 000.')
      ),
      exitItem(
        bi('Буцаах титрлэлтэд CaCO₃-тай урвалд орсон HCl-ийг яаж олох вэ?', 'In a back titration, how do you find the HCl that reacted with the CaCO₃?'),
        [bi('Илүүдэл HCl = урвалд орсон', 'The excess HCl is what reacted'), bi('Нийт HCl − илүүдэл HCl', 'Total HCl − excess HCl'), bi('NaOH-ийн моль × 2', 'Moles of NaOH × 2'), bi('Нийт HCl ÷ 2', 'Total HCl ÷ 2')],
        1,
        bi('0.0100 − 0.00240 = 0.00760 mol, дараа нь ÷ 2.', '0.0100 − 0.00240 = 0.00760 mol, then ÷ 2.')
      ),
      exitItem(
        bi('Redox титрлэлт: MnO₄⁻ + 8H⁺ + 5Fe²⁺ → … 4.32 × 10⁻⁴ mol MnO₄⁻ хэдэн моль Fe²⁺-тай урвалд орох вэ?', 'Redox titration: MnO₄⁻ + 8H⁺ + 5Fe²⁺ → … How many moles of Fe²⁺ react with 4.32 × 10⁻⁴ mol MnO₄⁻?'),
        [bi('4.32 × 10⁻⁴', '4.32 × 10⁻⁴'), bi('8.64 × 10⁻⁵', '8.64 × 10⁻⁵'), bi('2.16 × 10⁻³', '2.16 × 10⁻³'), bi('3.46 × 10⁻³', '3.46 × 10⁻³')],
        2,
        bi('1 : 5 харьцаа.', 'The ratio is 1 : 5.')
      )
    ],
    ID
  )
];

export const AS2_GLOSSARY_C: Record<string, GlossaryTerm[]> = {
  'as2-5': [
    term(bi('талстжилтын ус', 'water of crystallisation'), bi('Усжсан нэгдлийн талстын бүтцэд орсон ус.', 'Water that is part of the crystal structure of a hydrated compound.'))
  ],
  'as2-6': [
    term(bi('буцаах титрлэлт', 'back titration'), bi('Илүүдэл урвалжийг титрлэж, нийтээс хасаж урвалд орсныг олох.', 'Titrating the excess reagent and subtracting it from the total to find what reacted.')),
    term(bi('аликвот', 'aliquot'), bi('Нийт уусмалаас авсан хэсэг (250 cm³-аас 25.0 cm³ = аравны нэг).', 'A portion taken from the whole solution (25.0 cm³ of 250 cm³ = one tenth).'))
  ]
};

export const AS2_PRACTICE_C: Record<string, PracticeItem[]> = {
  'as2-5': [
    easy(
      bi('Хөнгөн цагааны сульфатын томьёо?', 'What is the formula of aluminium sulfate?'),
      [bi('AlSO₄', 'AlSO₄'), bi('Al₂(SO₄)₃', 'Al₂(SO₄)₃'), bi('Al₃(SO₄)₂', 'Al₃(SO₄)₂'), bi('Al₂SO₄₃', 'Al₂SO₄₃')],
      1,
      bi('2 × (3+) = 3 × (2−).', '2 × (3+) = 3 × (2−).')
    ),
    easy(
      bi('C 40.0 %, H 6.7 %, O 53.3 %, Mr 180. Молекулын томьёо?', 'C 40.0 %, H 6.7 %, O 53.3 %, Mr 180. Molecular formula?'),
      [bi('CH₂O', 'CH₂O'), bi('C₃H₆O₃', 'C₃H₆O₃'), bi('C₆H₁₂O₆', 'C₆H₁₂O₆'), bi('C₄₀H₇O₅₃', 'C₄₀H₇O₅₃')],
      2,
      bi('CH₂O (30.0) × 6.', 'CH₂O (30.0) × 6.')
    ),
    hard(
      bi('2.24 g төмөр хлортой урвалд орж 6.50 g төмрийн хлорид болов. Томьёог гаргаж, NaOH(aq)-тай урвалын ионы тэгшитгэлийг бич. (Fe 55.8, Cl 35.5)', '2.24 g of iron reacts with chlorine to form 6.50 g of an iron chloride. Deduce its formula and write the ionic equation for its reaction with aqueous NaOH. (Fe 55.8, Cl 35.5)'),
      bi('Cl 4.26 g → 0.120 mol; Fe 0.0401 mol → 1 : 2.99 ≈ 1 : 3 → FeCl₃. 2Fe(s) + 3Cl₂(g) → 2FeCl₃(s); Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s).', 'Cl 4.26 g → 0.120 mol; Fe 0.0401 mol → 1 : 2.99 ≈ 1 : 3 → FeCl₃. 2Fe(s) + 3Cl₂(g) → 2FeCl₃(s); Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s).'),
      bi('Cl₂ (Mr 71)-оор харьцаа авбал 1 : 1.5 – Cl атом хэрэгтэй.', 'Using Cl₂ (Mr 71) gives 1 : 1.5 – you need Cl atoms.')
    )
  ],
  'as2-6': [
    easy(
      bi('4.00 g NaOH 500 cm³ уусмалд. Концентраци g dm⁻³-ээр?', '4.00 g NaOH in 500 cm³. Concentration in g dm⁻³?'),
      [bi('8.00 g dm⁻³', '8.00 g dm⁻³'), bi('2.00 g dm⁻³', '2.00 g dm⁻³'), bi('0.200 g dm⁻³', '0.200 g dm⁻³'), bi('0.008 g dm⁻³', '0.008 g dm⁻³')],
      0,
      bi('4.00 ÷ 0.500 (= 0.200 × 40.0).', '4.00 ÷ 0.500 (= 0.200 × 40.0).')
    ),
    easy(
      bi('100 cm³ 0.200 NaCl + 50.0 cm³ 0.100 CaCl₂. Хольц дахь [Cl⁻]?', '100 cm³ of 0.200 NaCl + 50.0 cm³ of 0.100 CaCl₂. [Cl⁻] in the mixture?'),
      [bi('0.300', '0.300'), bi('0.150', '0.150'), bi('0.200', '0.200'), bi('0.100', '0.100')],
      2,
      bi('0.0300 mol ÷ 0.150 dm³.', '0.0300 mol ÷ 0.150 dm³.')
    ),
    hard(
      bi('2.86 g Na₂CO₃·xH₂O-г 250 cm³ болгов. 25.0 cm³-д 0.100 HCl-ийн 20.00 cm³ хэрэгтэй. x-ийг ол. (Na₂CO₃ 106.0, H₂O 18.0)', '2.86 g of Na₂CO₃·xH₂O is made up to 250 cm³. 25.0 cm³ needs 20.00 cm³ of 0.100 HCl. Find x. (Na₂CO₃ 106.0, H₂O 18.0)'),
      bi('25.0 cm³-д 0.100 × 0.0200 ÷ 2 = 1.00 × 10⁻³ mol → 250 cm³-д 0.0100 mol; Mr = 2.86 ÷ 0.0100 = 286; 106.0 + 18.0x = 286 → x = 10.', 'In 25.0 cm³: 0.100 × 0.0200 ÷ 2 = 1.00 × 10⁻³ mol → 0.0100 mol in 250 cm³; Mr = 2.86 ÷ 0.0100 = 286; 106.0 + 18.0x = 286 → x = 10.'),
      bi('×10-ыг мартвал Mr 2860 гарна.', 'Forgetting × 10 gives an Mr of 2860.')
    )
  ]
};
