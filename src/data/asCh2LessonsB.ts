// AS 9701 chapter 2 (atoms, molecules and stoichiometry), lessons 3–4. They follow the deck
// 03_Ch3_Atoms_Molecules_Stoichiometry.pptx: formulae and equations (3.6, slides 32–38) and solutions, titrations, gas
// volumes and exam practice (3.7–3.8, slides 39–55). Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'as2';

export const AS2_LESSONS_B: StatesLesson[] = [
  lesson(
    3,
    bi('Ионы цэнэг, томьёо, тэгшитгэл ба ионы тэгшитгэл', 'Ion charges, formulae, equations and ionic equations'),
    bi(
      'Ионы цэнэгээс томьёо бичиж нийлмэл ионуудыг цээжлэх; тэгшитгэлийг тэнцүүлэх; төлөвийн тэмдэг; үзэгч ионгүй ионы тэгшитгэл бичих (хөтөлбөр 2.3).',
      'Write formulae from ionic charges and recall the common compound ions; balance equations; state symbols; write ionic equations without spectator ions (syllabus 2.3).'
    ),
    [
      bi('1, 2-р бүлэг: цэнэг = бүлэг; 13-р бүлэг 3+; 15–17-р бүлэг: бүлэг − 18. Цээжлэх: NO₃⁻, CO₃²⁻, SO₄²⁻, OH⁻, NH₄⁺, Zn²⁺, Ag⁺, HCO₃⁻, PO₄³⁻. Шилжилтийн элементэд Ром тоо: iron(III) chloride FeCl₃.', 'Groups 1, 2: charge = group; Group 13: 3+; Groups 15–17: group − 18. Learn: NO₃⁻, CO₃²⁻, SO₄²⁻, OH⁻, NH₄⁺, Zn²⁺, Ag⁺, HCO₃⁻, PO₄³⁻. Transition elements take a Roman numeral: iron(III) chloride FeCl₃.'),
      bi('Томьёо = цэнэгийг тэнцүүлэх: Mg²⁺ + 2NO₃⁻ → Mg(NO₃)₂; 2Al³⁺ + 3O²⁻ → Al₂O₃. Тэнцүүлэхдээ томьёог өөрчлөхгүй: Fe₂O₃ + 3CO → 2Fe + 3CO₂; 2C₆H₁₄ + 19O₂ → 12CO₂ + 14H₂O.', 'Formula = balance the charges: Mg²⁺ + 2NO₃⁻ → Mg(NO₃)₂; 2Al³⁺ + 3O²⁻ → Al₂O₃. Never change formulae when balancing: Fe₂O₃ + 3CO → 2Fe + 3CO₂; 2C₆H₁₄ + 19O₂ → 12CO₂ + 14H₂O.'),
      bi('(s), (l), (g), (aq); ус – (l), тунадас – (s). Ионы тэгшитгэл: зөвхөн (aq) ионыг задлаад үзэгч ионыг хасна, атом ба цэнэгийг шалгана: Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g).', '(s), (l), (g), (aq); water is (l), a precipitate is (s). Ionic equation: split only (aq) ions, cancel spectators, check atoms and charge: Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g).')
    ],
    lessonSteps(
      [
        [
          bi('Ионы цэнэг; томьёо бүтээх', 'Ions and their charges; build the formula'),
          bi('Бүлгээс цэнэг; нийлмэл ионы хүснэгт; Ром тоо; хаалт: Ca(NO₃)₂, (NH₄)₂SO₄. Томьёо бүтээх (Q14): магнийн нитрат, кальцийн сульфат, натрийн сульфид, хөнгөн цагааны исэл, Na₃PO₄, (NH₄)₂SO₄, төмөр(III) гидроксид, мөнгөний карбонат.', 'Charges from the group; the compound-ion table; Roman numerals; brackets: Ca(NO₃)₂, (NH₄)₂SO₄. Build the formula (Q14): magnesium nitrate, calcium sulfate, sodium sulfide, aluminium oxide, Na₃PO₄, (NH₄)₂SO₄, iron(III) hydroxide, silver carbonate.'),
          bi('Томьёоны баганыг хааж ион бүрийг санана; дарахаас өмнө томьёог самбартаа бичнэ.', 'Cover the formula columns and recall each ion; write each formula on boards before the click.'),
          bi('1–3-р бүлэгт Ром тоо бичихгүй ("magnesium(II) oxide" биш); CaNO₃₂ биш Ca(NO₃)₂; NaS биш Na₂S; Fe(OH)₃; Ag₂CO₃; Na₃PO₄ – sodium phosphate.', 'No Roman numeral for Groups 1–3 (not "magnesium(II) oxide"); Ca(NO₃)₂, not CaNO₃₂; Na₂S, not NaS; Fe(OH)₃; Ag₂CO₃; Na₃PO₄ is sodium phosphate.')
        ],
        [
          bi('Тэгшитгэл тэнцүүлэх; төлөвийн тэмдэг', 'Balancing equations; state symbols'),
          bi('Алхамтай жишээ: Fe₂O₃ + CO → Fe + CO₂ – тоолох, Fe, дараа нь O ба C → Fe₂O₃ + 3CO → 2Fe + 3CO₂; гексан C₆H₁₄ + 9½O₂ → 2C₆H₁₄ + 19O₂ → 12CO₂ + 14H₂O. Төлөвийн тэмдэг (Figure 3.19): CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g) + H₂O(l); ZnSO₄ + NaOH.', 'Worked example: Fe₂O₃ + CO → Fe + CO₂ – count, balance Fe, then O and C → Fe₂O₃ + 3CO → 2Fe + 3CO₂; hexane C₆H₁₄ + 9½O₂ → 2C₆H₁₄ + 19O₂ → 12CO₂ + 14H₂O. State symbols (Figure 3.19): CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g) + H₂O(l); ZnSO₄ + NaOH.'),
          bi('Чангаар: тоолох, нэг элементийг нэг удаа тэнцүүлэх; цайрын сульфатын тэгшитгэлд төлөвийн тэмдгийг самбартаа нэмнэ.', 'Think aloud: count, balance one element at a time; add state symbols to the zinc sulfate equation on boards.'),
          bi('CO₂-г CO болгож "тэнцүүлэхгүй"; ZnSO₄(aq) + 2NaOH(aq) → Zn(OH)₂(s) + Na₂SO₄(aq); ус (aq) биш (l), тунадас (aq) биш (s); нэг тэмдэг дутвал оноо алдана.', 'Do not "balance" by changing CO₂ to CO; ZnSO₄(aq) + 2NaOH(aq) → Zn(OH)₂(s) + Na₂SO₄(aq); water is (l), not (aq); a precipitate is (s), not (aq); one missing symbol loses the mark.')
        ],
        [
          bi('Ионы тэгшитгэл', 'Ionic equations'),
          bi('Алхамтай жишээ: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g) – (aq) ионыг задлах, 2Cl⁻-ийг хасах, шалгах (+2 = +2). (s), (l), (g) ба уусмал дахь ковалент молекул (Cl₂(aq), Br₂(aq)) задрахгүй; ZnO(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂O(l).', 'Worked example: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g) – split the (aq) ions, cancel 2Cl⁻, check (+2 = +2). (s), (l), (g) and covalent molecules in solution (Cl₂(aq), Br₂(aq)) are not split; ZnO(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂O(l).'),
          bi('Чангаар: задлах, хасах, цэнэгийг шалгах.', 'Think aloud: split, cancel, check the charge.'),
          bi('Mg(s)-ийг Mg²⁺ болгож задлахгүй; H⁺-ийн 2-ыг мартвал цэнэг тэнцэхгүй.', 'Do not split Mg(s) into Mg²⁺; forgetting the 2 on H⁺ leaves the charge unbalanced.')
        ],
        [
          bi('Бие даан: ионы тэгшитгэл', 'You do: ionic equations'),
          bi('H₂SO₄ + 2NaOH; Br₂ + 2KI; CuSO₄ + 2NaOH; Pb(NO₃)₂ + 2KI. Тунадасны товч арга: бүтээгдэхүүн = тунадас, урвалж = түүнийг үүсгэх ионууд (Fe²⁺(aq) + 2OH⁻(aq) → Fe(OH)₂(s)).', 'H₂SO₄ + 2NaOH; Br₂ + 2KI; CuSO₄ + 2NaOH; Pb(NO₃)₂ + 2KI. The precipitate shortcut: product = the precipitate, reactants = the ions that form it (Fe²⁺(aq) + 2OH⁻(aq) → Fe(OH)₂(s)).'),
          bi('5 минут шалгалтын нөхцөлд: атом БА цэнэг тэнцэнэ.', '5 minutes under exam conditions: atoms AND charges balance.'),
          bi('H⁺(aq) + OH⁻(aq) → H₂O(l); Br₂(aq) + 2I⁻(aq) → 2Br⁻(aq) + I₂(aq); Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s); Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s). Na⁺, SO₄²⁻-ийг үлдээхгүй.', 'H⁺(aq) + OH⁻(aq) → H₂O(l); Br₂(aq) + 2I⁻(aq) → 2Br⁻(aq) + I₂(aq); Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s); Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s). Do not leave Na⁺ or SO₄²⁻ in.')
        ],
        [
          bi('Hinge асуулт', 'Hinge questions'),
          bi('Кальцийн нитратын томьёо; Zn + CuSO₄ дахь үзэгч ион; саармагжилтаар үүсэх усны төлөвийн тэмдэг.', 'The formula of calcium nitrate; the spectator ion in Zn + CuSO₄; the state symbol of water formed in neutralisation.'),
          bi('3-2-1-д ABCD хуруугаар зэрэг санал өгнө.', 'Show A/B/C/D fingers together on 3-2-1.'),
          bi('1 A (Ca(NO₃)₂) · 2 C (SO₄²⁻) · 3 B ((l)). 2-т D сонгосон бол Zn(s)-ийг ион болгосон алдааг засна.', '1 A (Ca(NO₃)₂) · 2 C (SO₄²⁻) · 3 B ((l)). Choosing D for 2 means Zn(s) was split into an ion.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Кальцийн нитратын томьёо?', 'The formula of calcium nitrate is …'),
        [bi('Ca(NO₃)₂', 'Ca(NO₃)₂'), bi('CaNO₃', 'CaNO₃'), bi('Ca₂NO₃', 'Ca₂NO₃'), bi('Ca(NO₂)₃', 'Ca(NO₂)₃')],
        0,
        bi('Ca²⁺ + 2NO₃⁻.', 'Ca²⁺ + 2NO₃⁻.')
      ),
      exitItem(
        bi('Zn + CuSO₄ → ZnSO₄ + Cu урвалд үзэгч ион аль нь вэ?', 'In Zn + CuSO₄ → ZnSO₄ + Cu the spectator ion is …'),
        [bi('Zn²⁺', 'Zn²⁺'), bi('Cu²⁺', 'Cu²⁺'), bi('SO₄²⁻', 'SO₄²⁻'), bi('Zn', 'Zn')],
        2,
        bi('Хоёр талд өөрчлөгдөхгүй.', 'It is unchanged on both sides.')
      ),
      exitItem(
        bi('Саармагжилтаар үүсэх ус ямар төлөвийн тэмдэгтэй вэ?', 'Water formed in a neutralisation has the state symbol …'),
        [bi('(aq)', '(aq)'), bi('(l)', '(l)'), bi('(g)', '(g)'), bi('(s)', '(s)')],
        1,
        bi('Цэвэр ус – шингэн.', 'Pure water is a liquid.')
      ),
      exitItem(
        bi('Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq)-ийн ионы тэгшитгэл?', 'What is the ionic equation for Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq)?'),
        [
          bi('Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)', 'Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)'),
          bi('Pb²⁺(aq) + I⁻(aq) → PbI₂(s)', 'Pb²⁺(aq) + I⁻(aq) → PbI₂(s)'),
          bi('K⁺(aq) + NO₃⁻(aq) → KNO₃(aq)', 'K⁺(aq) + NO₃⁻(aq) → KNO₃(aq)'),
          bi('Pb(s) + 2I⁻(aq) → PbI₂(s)', 'Pb(s) + 2I⁻(aq) → PbI₂(s)')
        ],
        0,
        bi('K⁺ ба NO₃⁻ үзэгч ион; атом ба цэнэг тэнцүү.', 'K⁺ and NO₃⁻ are spectators; atoms and charges balance.')
      ),
      exitItem(
        bi('Fe₂O₃ + CO → Fe + CO₂-ийн тэнцүүлсэн хэлбэр?', 'Which is the balanced form of Fe₂O₃ + CO → Fe + CO₂?'),
        [bi('Fe₂O₃ + CO → 2Fe + CO₂', 'Fe₂O₃ + CO → 2Fe + CO₂'), bi('Fe₂O₃ + 3CO → 2Fe + 3CO₂', 'Fe₂O₃ + 3CO → 2Fe + 3CO₂'), bi('Fe₂O₃ + 3CO → 2Fe + 3CO', 'Fe₂O₃ + 3CO → 2Fe + 3CO'), bi('2Fe₂O₃ + CO → 4Fe + CO₂', '2Fe₂O₃ + CO → 4Fe + CO₂')],
        1,
        bi('Fe-г тэнцүүлээд дараа нь O ба C.', 'Balance Fe, then O and C.')
      )
    ],
    ID
  ),
  lesson(
    4,
    bi('Концентраци, титрлэлт, хийн эзлэхүүн ба шалгалт', 'Concentration, titration, gas volumes and exam practice'),
    bi(
      'Уусмалын концентрацийг (mol dm⁻³) тооцоолох; титрлэлтийн үр дүнг боловсруулж концентраци ба стехиометрийг гаргах; r.t.p.-д хийн эзлэхүүн, эзлэхүүний харьцаагаар томьёо гаргах; шалгалтын зөвлөмж ба Paper 2 асуултаар бүлгийг нэгтгэх (хөтөлбөр 2.4).',
      'Calculate concentrations of solutions (mol dm⁻³); process titration results and deduce concentrations and stoichiometry; gas volumes at r.t.p. and formulae from volume ratios; pull the chapter together with exam tips and Paper 2 questions (syllabus 2.4).'
    ),
    [
      bi('c = n ÷ V(dm³); n = c × V; cm³ ÷ 1000 = dm³. 2.0 g NaOH 250 cm³-д → 0.20 mol dm⁻³. Уусмал бэлтгэх: бага усанд уусгаад эзлэхүүн хүртэл нэмнэ.', 'c = n ÷ V(dm³); n = c × V; cm³ ÷ 1000 = dm³. 2.0 g NaOH in 250 cm³ → 0.20 mol dm⁻³. Making a solution: dissolve in a little water, then make up to the volume.'),
      bi('Титрлэлт: зөвхөн давхцах (0.10 cm³ дотор) титрийг дундажлана, rough-ийг оруулахгүй. Мэдэгдэх урвалж → харьцаа → үл мэдэгдэх: 0.200 mol dm⁻³ H₂SO₄-ийн 15.10 cm³ → 6.04 × 10⁻³ mol NaOH → 0.242 mol dm⁻³.', 'Titration: average only concordant titres (within 0.10 cm³) and ignore the rough. Known → ratio → unknown: 15.10 cm³ of 0.200 mol dm⁻³ H₂SO₄ → 6.04 × 10⁻³ mol NaOH → 0.242 mol dm⁻³.'),
      bi('r.t.p.-д 1 моль хий = 24.0 dm³; n = V ÷ 24.0; ижил T, p-д эзлэхүүний харьцаа = мольн харьцаа: 50 : 250 : 150 = 1 : 5 : 3 → C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.', 'At r.t.p. 1 mol of gas = 24.0 dm³; n = V ÷ 24.0; at the same T and p, volume ratio = mole ratio: 50 : 250 : 150 = 1 : 5 : 3 → C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.')
    ],
    lessonSteps(
      [
        [
          bi('Уусмалын концентраци; бие даан', 'Concentration of solutions; you do'),
          bi('c = n ÷ V; 2.0 g NaOH 250 cm³-д; 55 cm³ 0.20 mol dm⁻³ CuSO₄-ийн масс (1.8 g). Бие даан: 2.0 g NaOH 50 cm³-д; 12.0 g CH₃CO₂H 250 cm³-д; 40 cm³ 0.2 HNO₃ ба 50 cm³ 0.01 Ca(OH)₂-ийн моль; 0.4 mol Al₂(SO₄)₃ 500 cm³-д.', 'c = n ÷ V; 2.0 g NaOH in 250 cm³; the mass of CuSO₄ in 55 cm³ of 0.20 mol dm⁻³ (1.8 g). You do: 2.0 g NaOH in 50 cm³; 12.0 g CH₃CO₂H in 250 cm³; moles in 40 cm³ of 0.2 HNO₃ and 50 cm³ of 0.01 Ca(OH)₂; 0.4 mol Al₂(SO₄)₃ in 500 cm³.'),
          bi('Дарахаас өмнө хариу бүрийг тооны машинаар бодно; 5 минут шалгалтын нөхцөлд бичнэ.', 'Work out each answer on a calculator before the click; write for 5 minutes under exam conditions.'),
          bi('cm³-ийг dm³ болгохгүй бол (0.050/250) буруу; dilute = концентраци бага (сул биш). 1.0; 0.80 mol dm⁻³; 0.008 ба 5 × 10⁻⁴ mol; A (2 mol ион).', 'Not converting cm³ to dm³ (0.050/250) is wrong; dilute means low concentration (not weak). 1.0; 0.80 mol dm⁻³; 0.008 and 5 × 10⁻⁴ mol; A (2 mol of ions).')
        ],
        [
          bi('Титрлэлт: уншилтаас концентраци; тооцоо; стехиометр гаргах', 'Titration: readings to concentration; calculation; deducing stoichiometry'),
          bi('Виртуал лаб (Figure 3.21, Table 3.9): rough 35.20 · 34.65 · 35.00 · 34.75 → давхцах 1 ба 3 → 34.70 cm³ → 3.47 × 10⁻³ mol → [NaOH] 0.139. Алхамтай жишээ: 2NaOH + H₂SO₄ → 0.242 mol dm⁻³; Sr(OH)₂ → 0.0300. Хамтдаа: 1.20 × 10⁻³ ба 2.40 × 10⁻³ mol → 1 : 2 → M(OH)₂; Na₂CO₃ → [HCl] 0.0800.', 'Virtual lab (Figure 3.21, Table 3.9): rough 35.20 · 34.65 · 35.00 · 34.75 → concordant 1 and 3 → 34.70 cm³ → 3.47 × 10⁻³ mol → [NaOH] 0.139. Worked example: 2NaOH + H₂SO₄ → 0.242 mol dm⁻³; Sr(OH)₂ → 0.0300. Together: 1.20 × 10⁻³ and 2.40 × 10⁻³ mol → 1 : 2 → M(OH)₂; Na₂CO₃ → [HCl] 0.0800.'),
          bi('Утга бүрийг самбартаа бодоод дарж шалгана; мэдэгдэх → харьцаа → үл мэдэгдэх.', 'Work out each value on boards, then click to check; known → ratio → unknown.'),
          bi('4 титрийг бүгдийг дундажлахгүй (34.90); уншилтыг 2 аравтын оронтой (34.70); ×2-ыг ÷2 болгохгүй.', 'Do not average all four titres (34.90); record readings to 2 d.p. (34.70); do not turn × 2 into ÷ 2.')
        ],
        [
          bi('Хийн молийн эзлэхүүн; эзлэхүүн ба стехиометр; hinge', 'Molar gas volume; gas volumes and stoichiometry; hinges'),
          bi('Авогадрогийн таамаглал; 24.0 dm³ mol⁻¹ (r.t.p.). 26.4 g CO₂ → 14.4 dm³; 120 cm³ He → 0.020 g. Алхамтай жишээ: 50 cm³ CₓHᵧ + 250 cm³ O₂ → 150 cm³ CO₂ → C₃H₈. Hinge: 25.0 cm³ 0.100 HCl-ийн моль; 14 g C₂H₄-ийн CO₂; дундаж титр.', 'Avogadro’s hypothesis; 24.0 dm³ mol⁻¹ (r.t.p.). 26.4 g CO₂ → 14.4 dm³; 120 cm³ He → 0.020 g. Worked example: 50 cm³ CₓHᵧ + 250 cm³ O₂ → 150 cm³ CO₂ → C₃H₈. Hinges: moles in 25.0 cm³ of 0.100 HCl; the CO₂ from 14 g C₂H₄; the mean titre.'),
          bi('24.0-д хуваахаас өмнө cm³-ийг хувиргана; чангаар: харьцаа → нүүрстөрөгч → устөрөгч → тэгшитгэл; ABCD хуруугаар санал өгнө.', 'Convert cm³ before dividing by 24.0; think aloud: ratio → carbon → hydrogen → equation; vote with ABCD fingers.'),
          bi('cm³-ийг 24.0-д шууд хуваахгүй; хөргөсний дараа ус шингэн. Hinge: 1 D (2.50 × 10⁻³) · 2 B (24.0 dm³) · 3 C (давхцах титр).', 'Do not divide cm³ directly by 24.0; after cooling, water is a liquid. Hinges: 1 D (2.50 × 10⁻³) · 2 B (24.0 dm³) · 3 C (concordant titres).')
        ],
        [
          bi('Шалгалтын зөвлөмж; алдаа олох; Paper 2 асуулт', 'Exam tips; spot the error; Paper 2 questions'),
          bi('8 зөвлөмж: эзлэхүүн, оронгийн тоо, хязгаарлагч урвалж, Ar-ийн тодорхойлолт, ионы тэгшитгэл, эмпирик томьёо, титр, фрагмент. Алдаа олох: "1 mol хлор 35.5 g", массаар харьцуулах, C₆H₁₂-ийн эмпирик C₃H₆, бүх титрийг дундажлах, "молекулын ион H атом алдсан". Paper 2: Rb [9], Na₂CO₃ титрлэлт [9], нүүрсустөрөгчийн хий [8].', 'The 8 tips: volumes, s.f., limiting reagent, the Ar definition, ionic equations, empirical formulae, titres, fragments. Spot the error: "1 mol of chlorine is 35.5 g", comparing masses, C₃H₆ as the empirical formula of C₆H₁₂, averaging all titres, "the molecular ion has lost an H atom". Paper 2: Rb [9], Na₂CO₃ titration [9], a gaseous hydrocarbon [8].'),
          bi('Хамтрагчийн хариултыг 8 зөвлөмжөөр шалгана; шалгагч шиг алдаа бүр хэдэн оноо алдахыг хэлнэ; асуулт бүрийг шалгалтын нөхцөлд бичээд онооны схемээр засна.', 'Mark a partner’s answers against the 8 tips; say like an examiner how many marks each error loses; write each question under exam conditions and peer-mark with the mark scheme.'),
          bi('Rb: 85.6; Rb₂CO₃; 4.33 × 10⁻³ mol → 0.104 dm³. Na₂CO₃: 23.55 ба 23.45 → 23.50; 1.25 × 10⁻³; 2.50 × 10⁻³; 0.106 mol dm⁻³; CO₃²⁻(aq) + 2H⁺(aq) → CO₂(g) + H₂O(l). Хий: CO₂ 40, O₂ 65 → C₄H₁₀; 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O; 0.290 g; C₂H₅.', 'Rb: 85.6; Rb₂CO₃; 4.33 × 10⁻³ mol → 0.104 dm³. Na₂CO₃: 23.55 and 23.45 → 23.50; 1.25 × 10⁻³; 2.50 × 10⁻³; 0.106 mol dm⁻³; CO₃²⁻(aq) + 2H⁺(aq) → CO₂(g) + H₂O(l). Gas: CO₂ 40, O₂ 65 → C₄H₁₀; 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O; 0.290 g; C₂H₅.')
        ],
        [
          bi('Дүгнэлт, гарах билет, эргэцүүлэл', 'Summary, exit ticket and reflection'),
          bi('9 гол санаа. Гарах билет: 25.0 cm³ 0.0200 Na₂CO₃-ийн моль; кальцийн нитратын томьёо; M : [M+2] = 3 : 1. Эргэцүүлэл: томьёо бүрийг гурван янзаар бичих. Гэрийн даалгавар: exam-style Q1–Q12, нийлмэл ионы хүснэгт, 15 ба 20 бодлогын багц, өөрийн үнэлгээ.', 'The 9 key ideas. Exit ticket: moles in 25.0 cm³ of 0.0200 Na₂CO₃; the formula of calcium nitrate; M : [M+2] = 3 : 1. Reflection: write every expression three ways. Homework: exam-style Q1–Q12, the compound-ion table, the 15 and 20 problem sets, the self-evaluation table.'),
          bi('Мөр бүрийг жишээтэй нь хэлнэ; гарах билетийг бичнэ; зорилгод fist to five дахин.', 'Say each line with an example; complete the exit ticket; fist to five on the intentions again.'),
          bi('5.00 × 10⁻⁴ mol; Ca²⁺ + 2NO₃⁻ → Ca(NO₃)₂; нэг Cl атом.', '5.00 × 10⁻⁴ mol; Ca²⁺ + 2NO₃⁻ → Ca(NO₃)₂; one Cl atom.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('0.0200 mol dm⁻³ Na₂CO₃-ийн 25.0 cm³-д хэдэн моль байх вэ?', 'How many moles are in 25.0 cm³ of 0.0200 mol dm⁻³ Na₂CO₃?'),
        [bi('0.500 mol', '0.500 mol'), bi('5.00 × 10⁻⁴ mol', '5.00 × 10⁻⁴ mol'), bi('5.00 × 10⁻² mol', '5.00 × 10⁻² mol'), bi('8.00 × 10⁻⁴ mol', '8.00 × 10⁻⁴ mol')],
        1,
        bi('0.0200 × 0.0250.', '0.0200 × 0.0250.')
      ),
      exitItem(
        bi('0.100 mol dm⁻³ HCl-ийн 25.0 cm³-д хэдэн моль байх вэ?', 'Moles in 25.0 cm³ of 0.100 mol dm⁻³ HCl?'),
        [bi('2.50', '2.50'), bi('0.250', '0.250'), bi('2.50 × 10⁻²', '2.50 × 10⁻²'), bi('2.50 × 10⁻³', '2.50 × 10⁻³')],
        3,
        bi('0.100 × 0.0250.', '0.100 × 0.0250.')
      ),
      exitItem(
        bi('14 g C₂H₄ шатна: C₂H₄ + 3O₂ → 2CO₂ + 2H₂O. r.t.p.-д CO₂-ийн эзлэхүүн?', '14 g C₂H₄ burns: C₂H₄ + 3O₂ → 2CO₂ + 2H₂O. Volume of CO₂ at r.t.p.?'),
        [bi('96.0 dm³', '96.0 dm³'), bi('24.0 dm³', '24.0 dm³'), bi('0.0467 dm³', '0.0467 dm³'), bi('12.0 dm³', '12.0 dm³')],
        1,
        bi('0.5 mol C₂H₄ → 1 mol CO₂.', '0.5 mol C₂H₄ → 1 mol CO₂.')
      ),
      exitItem(
        bi('Дундаж титрийг юугаар бодох вэ?', 'The mean titre should use …'),
        [bi('бүх титр', 'all titres'), bi('rough титр', 'the rough titre'), bi('зөвхөн давхцах титр', 'concordant titres only'), bi('хамгийн их титр', 'the largest titre')],
        2,
        bi('0.10 cm³ дотор.', 'Within 0.10 cm³.')
      ),
      exitItem(
        bi('25.0 cm³ NaOH-ийг 0.200 mol dm⁻³ H₂SO₄-ийн 15.10 cm³ саармагжуулна (2NaOH + H₂SO₄). [NaOH]?', '25.0 cm³ NaOH is neutralised by 15.10 cm³ of 0.200 mol dm⁻³ H₂SO₄ (2NaOH + H₂SO₄). [NaOH]?'),
        [bi('0.121 mol dm⁻³', '0.121 mol dm⁻³'), bi('0.242 mol dm⁻³', '0.242 mol dm⁻³'), bi('0.0604 mol dm⁻³', '0.0604 mol dm⁻³'), bi('0.484 mol dm⁻³', '0.484 mol dm⁻³')],
        1,
        bi('3.02 × 10⁻³ × 2 = 6.04 × 10⁻³ mol ÷ 0.0250.', '3.02 × 10⁻³ × 2 = 6.04 × 10⁻³ mol ÷ 0.0250.')
      )
    ],
    ID
  )
];

export const AS2_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'as2-3': [
    term(bi('үзэгч ион', 'spectator ion'), bi('Урвалд өөрчлөгдөхгүй ион.', 'An ion that does not change in the reaction.')),
    term(bi('ионы тэгшитгэл', 'ionic equation'), bi('Зөвхөн урвалд орж буй бөөмсийг харуулдаг тэгшитгэл.', 'An equation that shows only the particles that react.'))
  ],
  'as2-4': [
    term(bi('концентраци', 'concentration'), bi('1 dm³ уусмал дахь уусагдсан бодисын моль (mol dm⁻³).', 'The moles of solute in 1 dm³ of solution (mol dm⁻³).')),
    term(bi('титр', 'titre'), bi('Бюреткээс гаргасан эзлэхүүн.', 'The volume delivered from the burette.')),
    term(bi('хийн молийн эзлэхүүн', 'molar gas volume'), bi('r.t.p.-д 1 моль хий 24.0 dm³.', '24.0 dm³ per mol at r.t.p.'))
  ]
};

export const AS2_PRACTICE_B: Record<string, PracticeItem[]> = {
  'as2-3': [
    easy(
      bi('Төмөр(III) гидроксидын томьёо?', 'What is the formula of iron(III) hydroxide?'),
      [bi('FeOH₃', 'FeOH₃'), bi('Fe(OH)₃', 'Fe(OH)₃'), bi('Fe₃OH', 'Fe₃OH'), bi('Fe(OH)₂', 'Fe(OH)₂')],
      1,
      bi('Fe³⁺ + 3OH⁻ → Fe(OH)₃.', 'Fe³⁺ + 3OH⁻ → Fe(OH)₃.')
    ),
    easy(
      bi('H₂SO₄(aq) + 2NaOH(aq) → Na₂SO₄(aq) + 2H₂O(l)-ийн ионы тэгшитгэл?', 'What is the ionic equation for H₂SO₄(aq) + 2NaOH(aq) → Na₂SO₄(aq) + 2H₂O(l)?'),
      [bi('H⁺(aq) + OH⁻(aq) → H₂O(l)', 'H⁺(aq) + OH⁻(aq) → H₂O(l)'), bi('Na⁺(aq) + SO₄²⁻(aq) → Na₂SO₄(aq)', 'Na⁺(aq) + SO₄²⁻(aq) → Na₂SO₄(aq)'), bi('H₂SO₄ + OH⁻ → H₂O', 'H₂SO₄ + OH⁻ → H₂O'), bi('2H⁺ + O²⁻ → H₂O', '2H⁺ + O²⁻ → H₂O')],
      0,
      bi('Na⁺ ба SO₄²⁻ үзэгч ион.', 'Na⁺ and SO₄²⁻ are spectators.')
    ),
    hard(
      bi('Гексан C₆H₁₄-ийн бүрэн шаталтын тэгшитгэлийг тэнцүүлж бич.', 'Write a balanced equation for the complete combustion of hexane, C₆H₁₄.'),
      bi('C₆H₁₄ + 9½O₂ → 6CO₂ + 7H₂O → бүхэл тоогоор 2C₆H₁₄ + 19O₂ → 12CO₂ + 14H₂O. C → H → O дарааллаар тэнцүүлнэ.', 'C₆H₁₄ + 9½O₂ → 6CO₂ + 7H₂O → in whole numbers 2C₆H₁₄ + 19O₂ → 12CO₂ + 14H₂O. Balance C, then H, then O.'),
      bi('Томьёог өөрчилж тэнцүүлэхгүй.', 'Never change a formula to balance.')
    )
  ],
  'as2-4': [
    easy(
      bi('12.0 g CH₃CO₂H 250 cm³ уусмалд. Концентраци? (Mr 60.0)', '12.0 g CH₃CO₂H in 250 cm³. Concentration? (Mr 60.0)'),
      [bi('0.0480 mol dm⁻³', '0.0480 mol dm⁻³'), bi('0.80 mol dm⁻³', '0.80 mol dm⁻³'), bi('0.200 mol dm⁻³', '0.200 mol dm⁻³'), bi('48.0 mol dm⁻³', '48.0 mol dm⁻³')],
      1,
      bi('0.200 mol ÷ 0.250 dm³.', '0.200 mol ÷ 0.250 dm³.')
    ),
    easy(
      bi('r.t.p.-д 26.4 g CO₂-ийн эзлэхүүн?', 'What is the volume of 26.4 g of CO₂ at r.t.p.?'),
      [bi('14.4 dm³', '14.4 dm³'), bi('24.0 dm³', '24.0 dm³'), bi('0.600 dm³', '0.600 dm³'), bi('634 dm³', '634 dm³')],
      0,
      bi('0.600 mol × 24.0.', '0.600 mol × 24.0.')
    ),
    hard(
      bi('10 cm³ хийн нүүрсустөрөгч + 100 cm³ O₂ (илүүдэл) → хөргөсний дараа 75 cm³ → NaOH(aq)-ийн дараа 35 cm³. Молекулын томьёог гарга.', '10 cm³ of a gaseous hydrocarbon + 100 cm³ O₂ (excess) → 75 cm³ after cooling → 35 cm³ after NaOH(aq). Deduce the molecular formula.'),
      bi('CO₂ = 75 − 35 = 40 cm³ → x = 4; O₂ зарцуулсан 100 − 35 = 65 → 6.5 = 4 + y/4 → y = 10 → C₄H₁₀.', 'CO₂ = 75 − 35 = 40 cm³ → x = 4; O₂ used 100 − 35 = 65 → 6.5 = 4 + y/4 → y = 10 → C₄H₁₀.'),
      bi('Хөргөсний дараах 75-ыг CO₂ гэвэл буруу – NaOH CO₂-ийг шингээнэ.', 'Taking 75 as the CO₂ is wrong – NaOH absorbs the CO₂.')
    )
  ]
};
