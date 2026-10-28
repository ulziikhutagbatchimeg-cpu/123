// AS 9701 chapter 2 (atoms, molecules and stoichiometry), lessons 1–2. They follow the deck
// 03_Ch3_Atoms_Molecules_Stoichiometry.pptx and its plan of four 60-minute lessons: masses and mass spectra (3.1–3.3,
// slides 1–19) and the mole, reacting masses and formulae (3.4–3.5, slides 20–31). Every question, answer and definition
// here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'as2';

export const AS2_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Харьцангуй масс ба масс спектр', 'Relative masses and mass spectra'),
    bi(
      'u, Ar, харьцангуй изотопын масс ба Mr-ийг тодорхойлох; усжсан давсны Mr; изотопын элбэгшил эсвэл масс спектрээс Ar бодох; молекулын ионоос Mr олж фрагментыг таних; [M+1]-ээр нүүрстөрөгч тоолох, [M+2]-оор Cl ба Br илрүүлэх (хөтөлбөр 2.1, 22.2).',
      'Define u, Ar, relative isotopic mass and Mr; Mr of hydrated salts; calculate Ar from isotopic abundances or a mass spectrum; find Mr from the molecular ion and identify fragments; count carbons with [M+1] and detect Cl and Br with [M+2] (syllabus 2.1, 22.2).'
    ),
    [
      bi('u = ¹²C атомын массын 1/12 (1.66 × 10⁻²⁷ kg); Ar = элементийн атомуудын жигнэсэн дундаж масс ÷ u (нэгжгүй). Cl 35.5 – ³⁵Cl ≈ 75 %, ³⁷Cl ≈ 25 %.', 'u = 1/12 of the mass of a ¹²C atom (1.66 × 10⁻²⁷ kg); Ar = weighted average mass of the atoms of an element ÷ u (no units). Cl is 35.5 – ³⁵Cl ≈ 75 %, ³⁷Cl ≈ 25 %.'),
      bi('Ar = Σ(изотопын масс × %) ÷ 100: Ne (20 × 90.9 + 21 × 0.3 + 22 × 8.8)/100 = 20.2. Усжсан давс: CuSO₄·5H₂O = 159.6 + 90.0 = 249.6.', 'Ar = Σ(isotopic mass × %) ÷ 100: Ne (20 × 90.9 + 21 × 0.3 + 22 × 8.8)/100 = 20.2. Hydrated salt: CuSO₄·5H₂O = 159.6 + 90.0 = 249.6.'),
      bi('M⁺ = нэг электрон алдсан молекул → Mr; фрагмент заавал + цэнэгтэй (15 CH₃⁺, 29 C₂H₅⁺, 43 CH₃CO⁺/C₃H₇⁺). n(C) = 100 × [M+1] ÷ (1.1 × [M⁺]). M : [M+2] = 3 : 1 → нэг Cl; 1 : 1 → нэг Br.', 'M⁺ = a molecule that has lost one electron → Mr; every fragment needs a + charge (15 CH₃⁺, 29 C₂H₅⁺, 43 CH₃CO⁺/C₃H₇⁺). n(C) = 100 × [M+1] ÷ (1.1 × [M⁺]). M : [M+2] = 3 : 1 → one Cl; 1 : 1 → one Br.')
    ],
    lessonSteps(
      [
        [
          bi('Нээлт, түлхүүр үг, зорилго, сэргээн санах', 'Opening, key terms, intentions and retrieval'),
          bi('Алтны уурхай: материалыг яг зөв хэмжээгээр холих хэл бол моль. 20 түлхүүр үг; 14 зорилгод fist to five (энэ хичээлд 1–4). Сэргээн санах: 4 нийлмэл ион, хоёр атомт элемент, 0.00250 ба 37 500 стандарт хэлбэрт, 250 cm³ ↔ dm³, n = m ÷ M-ийг хувиргах.', 'A gold mine: the language for mixing materials in exactly the right amounts is the mole. 20 key terms; fist to five on the 14 intentions (1–4 for this lesson). Retrieval: 4 compound ions, the diatomic elements, 0.00250 and 37 500 in standard form, 250 cm³ ↔ dm³, rearranging n = m ÷ M.'),
          bi('Утгын баганыг хааж хосоороо асууна (quiz–quiz–trade); мини самбарт бичээд 3-2-1-д өргөнө.', 'Cover the meanings and test a partner (quiz–quiz–trade); write on mini whiteboards and show on 3-2-1.'),
          bi('Ar-д "weighted average" ба "1/12 … carbon-12" хоёулаа; моль – "specified particles"; H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂; 2.50 × 10⁻³ (3 орон); 0.250 dm³, 750 cm³.', 'Ar needs both "weighted average" and "1/12 … carbon-12"; the mole is "specified particles"; H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂; 2.50 × 10⁻³ (3 s.f.); 0.250 dm³, 750 cm³.')
        ],
        [
          bi('Харьцангуй масс; Mr ба усжсан давс; виртуал лаб', 'Relative masses; Mr and hydrated salts; virtual lab'),
          bi('u, Ar, харьцангуй изотопын масс; Ar(Cl) яагаад 35.5, яагаад нэгжгүй. Mr: CH₄ 16.0, Mg(OH)₂ 58.3, SiO₂ 60.1, (NH₄)₂SO₄ 132.1, CuSO₄·5H₂O 249.6, Mg(NO₃)₂·6H₂O 256.3. Лаб: CuSO₄·5H₂O-г халаахад цэнхэр → цагаан, ус конденсацлана; ус нэмэхэд цагаан → цэнхэр, халуун болно. Бие даан: CaCl₂, CuSO₄, (NH₄)₂SO₄, Mg(NO₃)₂·6H₂O.', 'u, Ar, relative isotopic mass; why Ar(Cl) is 35.5 and has no units. Mr: CH₄ 16.0, Mg(OH)₂ 58.3, SiO₂ 60.1, (NH₄)₂SO₄ 132.1, CuSO₄·5H₂O 249.6, Mg(NO₃)₂·6H₂O 256.3. Lab: heating CuSO₄·5H₂O turns blue → white and water condenses; adding water turns white → blue and the tube gets hot. You do: CaCl₂, CuSO₄, (NH₄)₂SO₄, Mg(NO₃)₂·6H₂O.'),
          bi('Mr бүрийг самбартаа бодоод дарна; өнгөний өөрчлөлтийг таамаглана; 3 минут шалгалтын нөхцөлд бичнэ.', 'Work out each Mr on boards before the click; predict each colour change; write for 3 minutes under exam conditions.'),
          bi('Ar ≠ массын тоо; Mg(OH)₂-д (16 + 1)-ийг 2-оор (41.3 биш); 5H₂O = 5 × 18.0; халаахад зөвхөн талстжилтын ус гарна. CaCl₂ 111.1; CuSO₄ 159.6; (NH₄)₂SO₄-д H 8.', 'Ar ≠ mass number; in Mg(OH)₂ multiply (16 + 1) by 2 (not 41.3); 5H₂O = 5 × 18.0; heating only drives off the water of crystallisation. CaCl₂ 111.1; CuSO₄ 159.6; (NH₄)₂SO₄ has 8 H.')
        ],
        [
          bi('Масс спектрометр; Ne-ийн Ar; Ge ба Zr', 'The mass spectrometer; Ar of neon; germanium and zirconium'),
          bi('Тэнхлэг: x – m/e (1+ ионд изотопын масс), y – харьцангуй элбэгшил; хар тугалга 204 (2 %), 206 (24 %), 207 (22 %), 208 (52 %). Алхамтай жишээ: Ne → 2017.9 ÷ 100 = 20.2. Бие даан: ⁷⁶₃₂Ge; Ar(Ge) = 72.7; Zr = 91.3.', 'Axes: x – m/e (isotopic mass for 1+ ions), y – relative abundance; lead 204 (2 %), 206 (24 %), 207 (22 %), 208 (52 %). Worked example: Ne → 2017.9 ÷ 100 = 20.2. You do: ⁷⁶₃₂Ge; Ar(Ge) = 72.7; Zr = 91.3.'),
          bi('Хар тугалгын спектрийг чангаар уншина; бүгд тооны машин дарна; 4 минут шалгалтын нөхцөлд бодно.', 'Read the lead spectrum aloud; everyone presses the calculator keys; work for 4 minutes under exam conditions.'),
          bi('Энгийн дундаж (21) авахгүй; нийлбэр 100 биш бол нийлбэрт хуваана; изотопын тэмдэгт Z-г мартахгүй.', 'Do not take a simple mean (21); if the total is not 100, divide by the total; do not forget Z in the isotopic symbol.')
        ],
        [
          bi('Молекулын ион ба фрагмент; этан хүчил; [M+1] ба [M+2]', 'Molecular ion and fragments; ethanoic acid; [M+1] and [M+2]'),
          bi('Пропанон M⁺ = 58; C–C тасарч 15 CH₃⁺ ба 43 CH₃CO⁺. Хамтдаа: этан хүчил 15, 43, 45 (COOH⁺), 60. [M+1]: M⁺ 54.5 %, [M+1] 3.6 % → 6 C; 84 (62.0 %), 4.1 % → C₆H₁₂. [M+2]: хлорбензол 112 ба 114 (3 : 1); хлорэтан 64 ба 66; ижил өндөр → Br.', 'Propanone M⁺ = 58; a C–C bond breaks to give 15 CH₃⁺ and 43 CH₃CO⁺. Together: ethanoic acid 15, 43, 45 (COOH⁺), 60. [M+1]: M⁺ 54.5 %, [M+1] 3.6 % → 6 C; 84 (62.0 %), 4.1 % → C₆H₁₂. [M+2]: chlorobenzene 112 and 114 (3 : 1); chloroethane 64 and 66; equal heights → Br.'),
          bi('15 ба 43-ыг дарахаас өмнө тодорхойлно; фрагментыг + цэнэгтэй нь бичнэ; n-ийг тооны машинаар бодно; Cl бол эрхий хуруу дээш, Br бол доош.', 'Identify 15 and 43 before the click; write each fragment with its + charge; work out n on a calculator; thumbs up for Cl, down for Br.'),
          bi('Фрагментийн ⁺-г орхивол оноо алдана; хамгийн өндөр оргил (base peak) M⁺ биш; томьёог урвуулахгүй; Cl-ийн дундаж массыг (35.5) молекулын ионд хэрэглэхгүй.', 'Leaving out the ⁺ on a fragment loses marks; the base peak is not M⁺; do not turn the formula upside down; do not use Cl’s average mass (35.5) for a molecular ion.')
        ],
        [
          bi('Спектрийг тайлах; hinge', 'Decode the spectrum; hinge questions'),
          bi('M⁺ 36.4 %, [M+1] 4.8 % → 12 C; 108 ба 110 ижил → C₂H₅Br; алканд 29 → C₂H₅⁺; бутанд 43 → C₃H₇⁺; этанолд 31 → CH₂OH⁺; 78 ба 80 (3 : 1) → C₃H₇Cl. Hinge: u, Ar(B), ижил өндөр M ба [M+2].', 'M⁺ 36.4 %, [M+1] 4.8 % → 12 C; 108 and 110 equal → C₂H₅Br; 29 in an alkane → C₂H₅⁺; 43 in butane → C₃H₇⁺; 31 in ethanol → CH₂OH⁺; 78 and 80 (3 : 1) → C₃H₇Cl. Hinges: u, Ar(B), equal M and [M+2].'),
          bi('Хосоороо таамаглаад дарна; 3-2-1-д ABCD хуруугаар санал өгнө.', 'Predict with a partner before each click; show A/B/C/D fingers on 3-2-1.'),
          bi('Алканд 43 нь CH₃CO⁺ биш C₃H₇⁺. Hinge: 1 C · 2 B (10.8) · 3 D (Br).', 'In an alkane 43 is C₃H₇⁺, not CH₃CO⁺. Hinges: 1 C · 2 B (10.8) · 3 D (Br).')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Нэгдсэн атомын массын нэгж (u) юу вэ?', 'The unified atomic mass unit is …'),
        [bi('протоны масс', 'the mass of a proton'), bi('H атомын масс', 'the mass of an H atom'), bi('¹²C атомын массын 1/12', '1/12 of the mass of a ¹²C atom'), bi('O атомын массын 1/16', '1/16 of the mass of an O atom')],
        2,
        bi('Нүүрстөрөгч-12 стандарт.', 'The carbon-12 standard.')
      ),
      exitItem(
        bi('¹⁰B 18.7 %, ¹¹B 81.3 %. Ar(B) = ?', '¹⁰B 18.7 %, ¹¹B 81.3 %. Ar(B) = ?'),
        [bi('10.5', '10.5'), bi('10.8', '10.8'), bi('10.2', '10.2'), bi('11.0', '11.0')],
        1,
        bi('(187 + 894.3) ÷ 100 = 10.8.', '(187 + 894.3) ÷ 100 = 10.8.')
      ),
      exitItem(
        bi('M ба [M+2] оргил ижил өндөртэй бол юуг харуулах вэ?', 'M and [M+2] peaks of equal height show …'),
        [bi('нэг Cl', 'one Cl'), bi('хоёр C', 'two C'), bi('нэг N', 'one N'), bi('нэг Br', 'one Br')],
        3,
        bi('⁷⁹Br : ⁸¹Br ≈ 1 : 1; Cl бол 3 : 1.', '⁷⁹Br : ⁸¹Br ≈ 1 : 1; Cl would be 3 : 1.')
      ),
      exitItem(
        bi('M⁺ 54.5 %, [M+1] 3.6 %. Молекулд хэдэн C атом байх вэ?', 'M⁺ 54.5 %, [M+1] 3.6 %. How many C atoms are in the molecule?'),
        [bi('3', '3'), bi('4', '4'), bi('6', '6'), bi('12', '12')],
        2,
        bi('n = 100 × 3.6 ÷ (1.1 × 54.5) = 6.0.', 'n = 100 × 3.6 ÷ (1.1 × 54.5) = 6.0.')
      ),
      exitItem(
        bi('CuSO₄·5H₂O-ийн Mr? (Cu 63.5, S 32.1, O 16.0, H 1.0)', 'What is Mr of CuSO₄·5H₂O? (Cu 63.5, S 32.1, O 16.0, H 1.0)'),
        [bi('159.6', '159.6'), bi('185.6', '185.6'), bi('249.6', '249.6'), bi('177.6', '177.6')],
        2,
        bi('159.6 + 5 × 18.0 = 249.6.', '159.6 + 5 × 18.0 = 249.6.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Моль, урвалын масс, хязгаарлагч урвалж ба томьёо', 'The mole, reacting masses, limiting reagents and formulae'),
    bi(
      'Мольыг Авогадрогийн тогтмолоор тодорхойлох; n = m ÷ M; тэгшитгэлээс урвалын масс; хязгаарлагч ба илүүдэл урвалж; оронгийн тоо ба массын хувь; гарцын хувь; эмпирик ба молекулын томьёо (хөтөлбөр 2.2–2.4).',
      'Define the mole with the Avogadro constant; n = m ÷ M; reacting masses from equations; limiting and excess reagents; significant figures and % by mass; percentage yield; empirical and molecular formulae (syllabus 2.2–2.4).'
    ),
    [
      bi('Моль – 6.02 × 10²³ тодорхой бөөм агуулсан бодисын хэмжээ; L = 6.02 × 10²³ mol⁻¹. 1 mol Cl₂ = 1.204 × 10²⁴ атом; 1 mol MgCl₂ = 3 mol ион. n = m ÷ M: 117.0 g NaCl = 2.0 mol.', 'A mole is the amount of substance containing 6.02 × 10²³ specified particles; L = 6.02 × 10²³ mol⁻¹. 1 mol Cl₂ = 1.204 × 10²⁴ atoms; 1 mol MgCl₂ = 3 mol of ions. n = m ÷ M: 117.0 g NaCl = 2.0 mol.'),
      bi('Урвалын масс: тэгшитгэл → моль → харьцаа → масс. Хязгаарлагч урвалжийг МОЛЬ ба харьцаагаар олно (массаар биш): 79.8 g Fe₂O₃ (0.500 mol) ба 9.36 g C (0.780 mol) → Fe₂O₃ хязгаарлагч.', 'Reacting masses: equation → moles → ratio → mass. Find the limiting reagent with MOLES and the ratio (never masses): 79.8 g Fe₂O₃ (0.500 mol) and 9.36 g C (0.780 mol) → Fe₂O₃ is limiting.'),
      bi('Гарц = бодит ÷ онолын × 100 (71.0 ÷ 89.0 = 79.8 %). Эмпирик = хамгийн энгийн бүхэл харьцаа; молекулын = n × эмпирик. 1 : 2.5 эсвэл 1 : 1.33-ийг тоймлохгүй, үржүүлнэ.', 'Yield = actual ÷ predicted × 100 (71.0 ÷ 89.0 = 79.8 %). Empirical = simplest whole-number ratio; molecular = n × empirical. Never round 1 : 2.5 or 1 : 1.33 – multiply.')
    ],
    lessonSteps(
      [
        [
          bi('Моль ба Авогадрогийн тогтмол; n = m ÷ M; бие даан', 'The mole and the Avogadro constant; n = m ÷ M; you do'),
          bi('Моль; L; M (g mol⁻¹). 1 mol Cl₂-д хэдэн атом, 1 mol MgCl₂-д хэдэн ион; 7.10 g Cl атом → 1.20 × 10²³. Гурвалжин (Figure 3.13), 1 моль зургаан элемент (Figure 3.14). 117.0 g NaCl; 0.25 mol NaOH. Бие даан: S₈, Fe(NO₃)₃, Na₂CO₃, Fe(OH)₂.', 'The mole; L; M (g mol⁻¹). Atoms in 1 mol Cl₂, ions in 1 mol MgCl₂; 7.10 g of Cl atoms → 1.20 × 10²³. The triangle (Figure 3.13), one mole of six elements (Figure 3.14). 117.0 g NaCl; 0.25 mol NaOH. You do: S₈, Fe(NO₃)₃, Na₂CO₃, Fe(OH)₂.'),
          bi('Самбартаа 1 mol Cl₂ дахь атомыг бичнэ; бүгд тооны машин дарна; 5 минут шалгалтын нөхцөлд бодно.', 'Write the atoms in 1 mol of Cl₂ on boards; everyone presses the calculator keys; work for 5 minutes under exam conditions.'),
          bi('"1 моль хлор = 35.5 g" – бөөмийг заа (Cl₂ 71.0). 2.0 mol; 10.0 g; S₈ 0.250 mol; Fe(NO₃)₃ 0.250 mol; 5.3 g; 449 g. S₈-ийн M 32.1 биш.', '"1 mol of chlorine = 35.5 g" – say which particle (Cl₂ is 71.0). 2.0 mol; 10.0 g; S₈ 0.250 mol; Fe(NO₃)₃ 0.250 mol; 5.3 g; 449 g. M of S₈ is not 32.1.')
        ],
        [
          bi('Урвалын масс; хязгаарлагч урвалж; бие даан', 'Reacting masses; limiting reagents; you do'),
          bi('2Mg + O₂ → 2MgO: 2 : 1 : 2; 12.15 g Mg → 20.15 g MgO. 2Fe₂O₃ + 3C → 4Fe + 3CO₂: 0.500 mol Fe₂O₃-д 0.750 mol C хэрэгтэй < 0.780 → C 0.030 mol илүүдэл. Бие даан: 4.60 g Na → Na₂O₂; 14.0 g SnO₂-д C; Si + Cl₂ стехиометр; 46.0 g Na → Ti.', '2Mg + O₂ → 2MgO: 2 : 1 : 2; 12.15 g Mg → 20.15 g MgO. 2Fe₂O₃ + 3C → 4Fe + 3CO₂: 0.500 mol Fe₂O₃ needs 0.750 mol C < 0.780 → C in excess by 0.030 mol. You do: 4.60 g Na → Na₂O₂; C for 14.0 g SnO₂; the Si + Cl₂ stoichiometry; 46.0 g Na → Ti.'),
          bi('Чангаар бодно: тэгшитгэл → моль → харьцаа → масс; 6 минут бичээд хостойгоо засна.', 'Think aloud: equation → moles → ratio → mass; write for 6 minutes, then swap and mark.'),
          bi('Массыг шууд харьцуулахгүй; 7.80 g (Na₂O₂ 78.0, Na₂O 62 биш); 2.23 g; Si + 2Cl₂ → SiCl₄; 24.0 g Ti.', 'Never compare masses directly; 7.80 g (Na₂O₂ is 78.0, not Na₂O 62); 2.23 g; Si + 2Cl₂ → SiCl₄; 24.0 g Ti.')
        ],
        [
          bi('Оронгийн тоо ба массын хувь; гарцын хувь', 'Significant figures and % by mass; percentage yield'),
          bi('Хариу – өгөгдлийн хамгийн цөөн оронгоор, зөвхөн төгсгөлд тоймлоно; 0.004 → 1 орон, 0.0040 → 2. 526.84 → 526.8 · 527 · 530. Fe₂O₃ дахь Fe 69.9 %; этанол дахь C 52.2 %. Гарц: 18 g Al → 89.0 g AlCl₃ онолын; 71.0 ÷ 89.0 = 79.8 %; 100 %-иас бага шалтгаан.', 'Give answers to the fewest s.f. in the data and round only at the end; 0.004 → 1 s.f., 0.0040 → 2. 526.84 → 526.8 · 527 · 530. Fe in Fe₂O₃ 69.9 %; C in ethanol 52.2 %. Yield: 18 g Al → 89.0 g AlCl₃ predicted; 71.0 ÷ 89.0 = 79.8 %; why it is below 100 %.'),
          bi('526.84-ийг 4, 3, 2 оронд тоймлоно; гарцыг тооны машинаар бодно.', 'Round 526.84 to 4, 3 and 2 s.f.; calculate the yield on a calculator.'),
          bi('0.052-г 0.05 болгохгүй; завсрын алхамд тоймлохгүй; гарцыг урвалжийн массаар (71.0 ÷ 18) бодохгүй. Шалтгаан: хажуугийн урвал, шилжүүлэхэд алдагдал, урвал бүрэн биш.', 'Do not round 0.052 to 0.05; do not round mid-way; do not work out yield from the reactant mass (71.0 ÷ 18). Reasons: side reactions, losses on transfer, incomplete reaction.')
        ],
        [
          bi('Эмпирик ба молекулын томьёо; фосфорын исэл; бие даан', 'Empirical and molecular formulae; an oxide of phosphorus; you do'),
          bi('Хүснэгт: H₂O₂ → HO, C₄H₁₀ → C₂H₅, C₆H₁₂ → CH₂, N₂H₄ → NH₂, C₈H₁₈ → C₄H₉, C₆H₆ → CH. Алхамтай жишээ: 1.55 g P + 2.00 g O → 0.0500 : 0.125 = 1 : 2.5 → P₂O₅. Бие даан: 90 % C → C₃H₄; CH₂Br (Mr 187.8) → C₂H₄Br₂; C₆H₁₀, C₂Cl₆, C₈H₁₆; 80 % C, M 30 → CH₃, C₂H₆.', 'Table: H₂O₂ → HO, C₄H₁₀ → C₂H₅, C₆H₁₂ → CH₂, N₂H₄ → NH₂, C₈H₁₈ → C₄H₉, C₆H₆ → CH. Worked example: 1.55 g P + 2.00 g O → 0.0500 : 0.125 = 1 : 2.5 → P₂O₅. You do: 90 % C → C₃H₄; CH₂Br (Mr 187.8) → C₂H₄Br₂; C₆H₁₀, C₂Cl₆, C₈H₁₆; 80 % C, M 30 → CH₃, C₂H₆.'),
          bi('Дарахаас өмнө эмпирик томьёог бичнэ; чангаар: масс → моль → ÷ хамгийн бага → бүхэл; 6 минут шалгалтын нөхцөлд.', 'Write each empirical formula before the click; think aloud: mass → moles → ÷ smallest → whole numbers; 6 minutes under exam conditions.'),
          bi('C₈H₁₈-ийн эмпирик CH₂ биш; 1 : 2.5-ийг 1 : 3, 1 : 1.33-ийг 1 : 1 болгохгүй.', 'The empirical formula of C₈H₁₈ is not CH₂; do not round 1 : 2.5 to 1 : 3 or 1 : 1.33 to 1 : 1.')
        ],
        [
          bi('Hinge асуулт', 'Hinge questions'),
          bi('1 mol MgCl₂-д юу байх; хязгаарлагч урвалжийг хэрхэн олох; C : H = 1 : 1.5 ямар томьёо өгөх. 80%-иас доош бол давтана.', 'What 1 mol of MgCl₂ contains; how to find the limiting reagent; which formula C : H = 1 : 1.5 gives. Revisit if below 80%.'),
          bi('3-2-1-д ABCD хуруугаар зэрэг санал өгнө.', 'Show A/B/C/D fingers together on 3-2-1.'),
          bi('1 B (2 mol Cl⁻) · 2 C (мольоор, харьцаагаар) · 3 D (C₂H₃). 2-т A сонгосон бол масс харьцуулсан.', '1 B (2 mol Cl⁻) · 2 C (moles with the ratio) · 3 D (C₂H₃). Choosing A for 2 means comparing masses.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('1 mol MgCl₂-д юу байх вэ?', '1 mol of MgCl₂ contains …'),
        [bi('1 mol Cl⁻', '1 mol Cl⁻'), bi('2 mol Cl⁻', '2 mol Cl⁻'), bi('1 mol Cl₂', '1 mol Cl₂'), bi('3 mol Cl⁻', '3 mol Cl⁻')],
        1,
        bi('Томьёоны нэгж бүрт нэг Mg²⁺ + хоёр Cl⁻.', 'One Mg²⁺ + two Cl⁻ per formula unit.')
      ),
      exitItem(
        bi('Хязгаарлагч урвалжийг олохын тулд …', 'To find the limiting reagent you must …'),
        [bi('массыг харьцуулна', 'compare masses'), bi('том Mr-ийг авна', 'use the larger Mr'), bi('мольыг харьцаагаар харьцуулна', 'compare moles using the ratio'), bi('бүтээгдэхүүний массыг авна', 'use the product mass')],
        2,
        bi('Моль × стехиометр.', 'Moles × stoichiometry.')
      ),
      exitItem(
        bi('C : H мольн харьцаа 1 : 1.5 бол ямар эмпирик томьёо вэ?', 'A mole ratio C : H = 1 : 1.5 gives …'),
        [bi('CH', 'CH'), bi('CH₂', 'CH₂'), bi('C₂H₅', 'C₂H₅'), bi('C₂H₃', 'C₂H₃')],
        3,
        bi('× 2 → 2 : 3.', '× 2 → 2 : 3.')
      ),
      exitItem(
        bi('18 g Al илүүдэл хлортой урвалд орж 71.0 g AlCl₃ гарав. Гарцын хувь? (2Al + 3Cl₂ → 2AlCl₃; Al 27.0, Cl 35.5)', '18 g Al reacts with excess chlorine and 71.0 g AlCl₃ is obtained. Percentage yield? (2Al + 3Cl₂ → 2AlCl₃; Al 27.0, Cl 35.5)'),
        [bi('79.8 %', '79.8 %'), bi('100 %', '100 %'), bi('25.4 %', '25.4 %'), bi('39.4 %', '39.4 %')],
        0,
        bi('Онолын 89.0 g; 71.0 ÷ 89.0 × 100.', 'Predicted 89.0 g; 71.0 ÷ 89.0 × 100.')
      ),
      exitItem(
        bi('1.55 g фосфор шатаж 3.55 g исэл болов. Эмпирик томьёо? (P 31.0, O 16.0)', '1.55 g of phosphorus burns to give 3.55 g of an oxide. Empirical formula? (P 31.0, O 16.0)'),
        [bi('PO₂', 'PO₂'), bi('P₂O₃', 'P₂O₃'), bi('P₂O₅', 'P₂O₅'), bi('PO₃', 'PO₃')],
        2,
        bi('0.0500 : 0.125 = 1 : 2.5 → × 2.', '0.0500 : 0.125 = 1 : 2.5 → × 2.')
      )
    ],
    ID
  )
];

export const AS2_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'as2-1': [
    term(bi('нэгдсэн атомын массын нэгж, u', 'unified atomic mass unit, u'), bi('Нүүрстөрөгч-12 атомын массын 1/12.', '1/12 of the mass of a carbon-12 atom.')),
    term(bi('харьцангуй атомын масс, Ar', 'relative atomic mass, Ar'), bi('Атомуудын жигнэсэн дундаж масс ÷ u.', 'The weighted average mass of the atoms ÷ u.')),
    term(bi('харьцангуй изотопын масс', 'relative isotopic mass'), bi('Нэг изотопын масс u-тэй харьцуулсан нь.', 'The mass of one isotope compared with u.')),
    term(bi('харьцангуй томьёоны масс, Mr', 'relative formula mass, Mr'), bi('Нэг томьёоны нэгж дэх Ar-ийн нийлбэр.', 'The sum of Ar in one formula unit.')),
    term(bi('талстжилтын ус', 'water of crystallisation'), bi('Усжсан давсны талст дахь ус.', 'Water in the crystal of a hydrated salt.')),
    term(bi('усгүй', 'anhydrous'), bi('Талстжилтын усгүй.', 'Contains no water of crystallisation.')),
    term(bi('молекулын ион, M⁺', 'molecular ion, M⁺'), bi('Нэг электрон алдсан молекул.', 'A molecule that has lost one electron.')),
    term(bi('[M+1] оргил', '[M+1] peak'), bi('Нэг ¹³C атомтай молекулууд.', 'Molecules containing one ¹³C atom.'))
  ],
  'as2-2': [
    term(bi('моль', 'mole'), bi('6.02 × 10²³ тодорхой бөөм агуулсан хэмжээ.', 'The amount containing 6.02 × 10²³ specified particles.')),
    term(bi('молийн масс, M', 'molar mass, M'), bi('1 моль бодисын масс, g mol⁻¹.', 'The mass of 1 mol, in g mol⁻¹.')),
    term(bi('хязгаарлагч урвалж', 'limiting reagent'), bi('Эхэлж дуусдаг урвалж.', 'The reactant that is used up first.')),
    term(bi('гарцын хувь', 'percentage yield'), bi('Бодит ÷ онолын × 100.', 'Actual ÷ predicted × 100.')),
    term(bi('эмпирик томьёо', 'empirical formula'), bi('Атомын хамгийн энгийн бүхэл харьцаа.', 'The simplest whole-number ratio of atoms.')),
    term(bi('молекулын томьёо', 'molecular formula'), bi('Молекул дахь атомын бодит тоо.', 'The actual number of atoms in a molecule.')),
    term(bi('стехиометр', 'stoichiometry'), bi('Урвалж ба бүтээгдэхүүний мольн харьцаа.', 'The mole ratio of reactants and products.'))
  ]
};

export const AS2_PRACTICE_A: Record<string, PracticeItem[]> = {
  'as2-1': [
    easy(
      bi('Ge: 70 (20.6 %), 72 (27.4 %), 73 (7.7 %), 74 (36.7 %), 76 (7.6 %). Ar(Ge)?', 'Ge: 70 (20.6 %), 72 (27.4 %), 73 (7.7 %), 74 (36.7 %), 76 (7.6 %). Ar(Ge)?'),
      [bi('73.0', '73.0'), bi('72.7', '72.7'), bi('72.0', '72.0'), bi('74.0', '74.0')],
      1,
      bi('7270.3 ÷ 100 = 72.7.', '7270.3 ÷ 100 = 72.7.')
    ),
    easy(
      bi('Этан хүчлийн спектрт m/e 45 ямар фрагмент вэ?', 'In the spectrum of ethanoic acid, which fragment is m/e 45?'),
      [bi('CH₃⁺', 'CH₃⁺'), bi('CH₃CO⁺', 'CH₃CO⁺'), bi('COOH⁺', 'COOH⁺'), bi('CO₂H (цэнэггүй)', 'CO₂H (uncharged)')],
      2,
      bi('CH₃ алдсан; + цэнэгийг заавал бич.', 'CH₃ is lost; the + charge must be shown.')
    ),
    hard(
      bi('Нүүрсустөрөгчийн M⁺ 84-т (62.0 %), [M+1] 4.1 %. Молекулын томьёог гарга.', 'A hydrocarbon has M⁺ at 84 (62.0 %) and [M+1] 4.1 %. Deduce its molecular formula.'),
      bi('n = 100 × 4.1 ÷ (1.1 × 62.0) = 6.01 → 6 C; 84 − 72 = 12 H → C₆H₁₂.', 'n = 100 × 4.1 ÷ (1.1 × 62.0) = 6.01 → 6 C; 84 − 72 = 12 H → C₆H₁₂.'),
      bi('[M+1]-ийг 1.1-д хуваахаа мартвал буруу.', 'Forgetting to divide [M+1] by 1.1 gives the wrong answer.')
    )
  ],
  'as2-2': [
    easy(
      bi('64.2 g S₈-д хэдэн моль байх вэ? (S 32.1)', 'How many moles are in 64.2 g of S₈? (S 32.1)'),
      [bi('2.00 mol', '2.00 mol'), bi('0.250 mol', '0.250 mol'), bi('0.500 mol', '0.500 mol'), bi('8.00 mol', '8.00 mol')],
      1,
      bi('M = 256.8 → 0.250 mol.', 'M = 256.8 → 0.250 mol.')
    ),
    easy(
      bi('Fe₂O₃ дахь Fe-ийн массын хувь? (Fe 55.8, O 16.0)', 'What is the % by mass of Fe in Fe₂O₃? (Fe 55.8, O 16.0)'),
      [bi('34.9 %', '34.9 %'), bi('69.9 %', '69.9 %'), bi('77.7 %', '77.7 %'), bi('55.8 %', '55.8 %')],
      1,
      bi('111.6 ÷ 159.6 × 100.', '111.6 ÷ 159.6 × 100.')
    ),
    hard(
      bi('79.8 g Fe₂O₃-ийг 9.36 g C-тэй халаав: 2Fe₂O₃ + 3C → 4Fe + 3CO₂. Fe₂O₃ хязгаарлагч болохыг харуул. (Fe 55.8, O 16.0, C 12.0)', '79.8 g Fe₂O₃ is heated with 9.36 g C: 2Fe₂O₃ + 3C → 4Fe + 3CO₂. Show that Fe₂O₃ is the limiting reactant. (Fe 55.8, O 16.0, C 12.0)'),
      bi('Fe₂O₃ 79.8 ÷ 159.6 = 0.500 mol; C 9.36 ÷ 12.0 = 0.780 mol. 2 : 3 → 0.500 mol Fe₂O₃-д 0.750 mol C хэрэгтэй; 0.780 > 0.750 тул C 0.030 mol илүүдэл, Fe₂O₃ хязгаарлагч.', 'Fe₂O₃ 79.8 ÷ 159.6 = 0.500 mol; C 9.36 ÷ 12.0 = 0.780 mol. 2 : 3 → 0.500 mol Fe₂O₃ needs 0.750 mol C; 0.780 > 0.750, so C is in excess by 0.030 mol and Fe₂O₃ is limiting.'),
      bi('"79.8 > 9.36 тул C хязгаарлагч" – массыг харьцуулсан алдаа.', '"79.8 > 9.36, so C is limiting" compares masses – wrong.')
    )
  ]
};
