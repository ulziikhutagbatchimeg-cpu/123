// IGCSE 0620 chapter 3 (stoichiometry), lessons 1–4 of 9. They follow the deck Ch04_Formulae_and_Equations.pptx and
// its own plan of four 60-minute lessons (slides 1–9, 10–16, 17–22, 23–28, with the review slides 29–36).
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig3';

export const IG3_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Нэгдлийг нэрлэх ба ковалент томьёо', 'Naming compounds and covalent formulae'),
    bi(
      'Элемент ба нэгдлийн томьёог бичих, томьёоноос нэгдлийг нэрлэх; молекулын томьёог тодорхойлж загвар эсвэл диаграммаас гаргах; (E) эмпирик томьёог тодорхойлох.',
      'State the formulae of elements and compounds and name compounds from their formulae; define molecular formula and deduce it from a model or diagram; (E) define empirical formula.'
    ),
    [
      bi(
        'Металл эхэнд; хоёрхон элемент → -ide; нийлмэл ион дахь хүчилтөрөгч → -ate; Ром тоо ионы цэнэгийг заана (iron(III) = Fe³⁺); угтвар молекул дахь атомын тоог заана (CO, CO₂).',
        'Metal first; two elements only → -ide; oxygen in a compound ion → -ate; Roman numerals give the ion charge (iron(III) = Fe³⁺); prefixes count atoms in molecules (CO, CO₂).'
      ),
      bi(
        'Молекулын томьёо = нэг молекул дахь атом бүрийн бодит тоо; диаграммаас атомыг тоолж гаргана. Валент: I–IV бүлэгт бүлгийн дугаар, V–VII-д 8 − бүлгийн дугаар.',
        'Molecular formula = the actual number of each type of atom in one molecule; count the atoms in a diagram. Valency = group number for I–IV, then 8 − group number for V–VII.'
      ),
      bi(
        'Cross-over: тэмдэг → валент → загалмайлах → хялбарчлах (C₂O₄ → CO₂). (E) Эмпирик томьёо = хамгийн энгийн бүхэл тооны харьцаа (C₃H₆ → CH₂).',
        'Cross-over: symbols → valencies → cross over → simplify (C₂O₄ → CO₂). (E) Empirical formula = the simplest whole-number ratio (C₃H₆ → CH₂).'
      )
    ],
    lessonSteps(
      [
        [
          bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
          bi(
            'Том асуулт: нэг мөр тэмдэг ямар ч хэлээр урвалыг хэрхэн илэрхийлдэг вэ? Хосоороо 60 секундэд мэдэх тэмдэг, томьёогоо жагсааж, бие биеэсээ асууна. "Санал нийлэх үү?" гурван өгүүлбэрт эрхий хуруугаар санал өгүүлж, хичээлийн төлөвлөгөөг танилцуулна.',
            'Big question: how can one line of symbols tell any chemist in any language what happens in a reaction? In pairs list symbols and formulae for 60 s and quiz each other. Thumb vote on three "Agree or disagree?" statements, then show the lesson plan.'
          ),
          bi('Тэмдэг, томьёо жагсааж хостоо асууна (K, Fe, CO₂, NaCl); саналаа хадгална.', 'List symbols and formulae and quiz a partner (K, Fe, CO₂, NaCl); keep their vote.'),
          bi('K – кали, Fe – төмөр, CO₂, NaCl зөв; санал хуваагдсан өгүүлбэрийг тэмдэглэнэ.', 'K – potassium, Fe – iron, CO₂, NaCl correct; split votes are noted.')
        ],
        [
          bi('Түлхүүр үг, шалгуур, давталт', 'Key words, success criteria and retrieval'),
          bi(
            'Түлхүүр үгсийг уншиж, амжилтын шалгуурт fist to five хийлгэнэ. Давталт: II ба VII бүлгийн ионы цэнэг, NaCl ба H₂O-ийн холбоо, C, O, H хэдэн холбоо үүсгэдэг, хоёр атомт хийнүүд. Дараа нь бүлэг → ион → валент → томьёогийн хүснэгт (Na⁺ … Cl⁻; NaCl … HCl).',
            'Read the key words and do fist to five on the success criteria. Retrieval: the ion charges of Groups II and VII, the bonding in NaCl and H₂O, how many bonds C, O and H form, the diatomic gases. Then the table group → ion → valency → formula (Na⁺ … Cl⁻; NaCl … HCl).'
          ),
          bi('Тэмдэглэлгүйгээр самбартаа бичиж өргөнө; хүснэгтийн мөр бүрийг таамаглана.', 'Write on show-me boards with no notes; predict each row of the table.'),
          bi('2+; 1−; ионы, ковалент; C 4, O 2, H 1; H₂ N₂ O₂ F₂ Cl₂ Br₂ I₂; валент IV хүртэл өсөөд буурна.', '2+; 1−; ionic, covalent; C 4, O 2, H 1; H₂ N₂ O₂ F₂ Cl₂ Br₂ I₂; valency rises to IV then falls.')
        ],
        [
          bi('Нэгдлийг нэрлэх', 'Naming compounds'),
          bi(
            'Нэрлэх дүрмийг жишээгээр гаргана: sodium chloride, calcium bromide CaBr₂, calcium carbonate CaCO₃, iron(II)/(III) chloride, CO/CO₂/SO₃, нийлмэл ионууд CO₃²⁻, NO₃⁻, SO₄²⁻, NH₄⁺. "Нэр ↔ томьёо" 12 карт.',
            'Reveal the naming rules with examples: sodium chloride, calcium bromide CaBr₂, calcium carbonate CaCO₃, iron(II)/(III) chloride, CO/CO₂/SO₃, compound ions CO₃²⁻, NO₃⁻, SO₄²⁻, NH₄⁺. Then 12 "name ↔ formula" cards.'
          ),
          bi('Odd one out-д хариулна; 12 картыг 3 минутад самбартаа бичээд карт дарж шалгана.', 'Answer the odd one out; write all 12 cards on boards in 3 minutes, then click each card to check.'),
          bi('Odd one out: potassium bromide; CuSO₄ – copper(II) sulfate; calcium hydroxide – Ca(OH)₂.', 'Odd one out: potassium bromide; CuSO₄ – copper(II) sulfate; calcium hydroxide – Ca(OH)₂.')
        ],
        [
          bi('Ковалент нэгдлийн томьёо', 'Formulae of covalent compounds'),
          bi(
            'Молекулын томьёог тодорхойлж, Зураг 4.5-ын BrF₃, NH₃, C₃H₆ дээр атомыг тоолуулна. Cross-over аргыг 4 алхмаар: C ба O → 4 ба 2 → C₂O₄ → CO₂.',
            'Define molecular formula and count the atoms of BrF₃, NH₃ and C₃H₆ in Figure 4.5. Show the cross-over method in 4 steps: C and O → 4 and 2 → C₂O₄ → CO₂.'
          ),
          bi('"You try": метан, азотын хлорид, устөрөгчийн сульфидын томьёог бичнэ.', '"You try": write the formulae of methane, nitrogen chloride and hydrogen sulfide.'),
          bi('CH₄; NCl₃; H₂S.', 'CH₄; NCl₃; H₂S.')
        ],
        [
          bi('Хамтдаа: диаграммаас томьёо', 'We do: formula from a diagram'),
          bi(
            'A–F бүтцийн холбоо ба томьёог гаргана (Coursebook Q7): A-г ангиар, бусдыг сурагчид. (E) Эмпирик томьёо: C₃H₆ → CH₂; NaI аль хэдийн эмпирик.',
            'Work out the bonding and formula of structures A–F (Coursebook Q7): A as a class, the rest by students. (E) Empirical formula: C₃H₆ → CH₂; NaI is already empirical.'
          ),
          bi('Мөр бүрийг самбартаа бичнэ; B яагаад Na₈I₈ биш NaI вэ гэдгийг 30 секунд ярилцана.', 'Write each row on boards; talk for 30 s about why B is written NaI and not Na₈I₈.'),
          bi('CH₄, NaI, C₃H₆, PCl₃, BrF₅, HBr; ионы томьёо харьцааг заана.', 'CH₄, NaI, C₃H₆, PCl₃, BrF₅, HBr; an ionic formula shows the ratio.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('FeCl₃-ийн нэр аль нь вэ?', 'What is the name of FeCl₃?'),
        [bi('iron(II) chloride', 'iron(II) chloride'), bi('iron(III) chloride', 'iron(III) chloride'), bi('chloride iron(III)', 'chloride iron(III)'), bi('iron(III) chlorate', 'iron(III) chlorate')],
        1,
        bi('Ром тоо ионы цэнэгийг заана: Fe³⁺; металл эхэнд; хоёрхон элемент тул -ide.', 'The Roman numeral gives the ion charge: Fe³⁺; metal first; only two elements, so -ide.')
      ),
      exitItem(
        bi('Кальцийн гидроксидын томьёо аль нь вэ?', 'What is the formula of calcium hydroxide?'),
        [bi('CaOH₂', 'CaOH₂'), bi('CaOH', 'CaOH'), bi('Ca(OH)₂', 'Ca(OH)₂'), bi('Ca₂OH', 'Ca₂OH')],
        2,
        bi('OH⁻ бүлэг бүхэлдээ 2 удаа орно – нийлмэл ионыг хаалтанд бичнэ.', 'The whole OH⁻ group appears twice – put brackets round the compound ion.')
      ),
      exitItem(
        bi('Odd one out: sodium sulfate, copper nitrate, potassium bromide, calcium carbonate. Аль нь ялгаатай вэ?', 'Odd one out: sodium sulfate, copper nitrate, potassium bromide, calcium carbonate. Which is different?'),
        [bi('sodium sulfate', 'sodium sulfate'), bi('copper nitrate', 'copper nitrate'), bi('potassium bromide', 'potassium bromide'), bi('calcium carbonate', 'calcium carbonate')],
        2,
        bi('Зөвхөн хоёр элементтэй (-ide); бусад нь хүчилтөрөгчтэй нийлмэл ионтой (-ate).', 'It has only two elements (-ide); the others contain a compound ion with oxygen (-ate).')
      ),
      exitItem(
        bi('Азот ба хлороос тогтсон ковалент нэгдлийн томьёо (cross-over) аль нь вэ?', 'Using cross-over, what is the formula of nitrogen chloride (N + Cl)?'),
        [bi('NCl', 'NCl'), bi('NCl₃', 'NCl₃'), bi('N₃Cl', 'N₃Cl'), bi('NCl₅', 'NCl₅')],
        1,
        bi('N-ийн валент 3 (8 − 5), Cl-ийнх 1 → NCl₃.', 'The valency of N is 3 (8 − 5) and of Cl is 1 → NCl₃.')
      ),
      exitItem(
        bi('(E) C₃H₆-ийн эмпирик томьёо аль нь вэ?', '(E) What is the empirical formula of C₃H₆?'),
        [bi('C₃H₆', 'C₃H₆'), bi('CH₃', 'CH₃'), bi('CH₂', 'CH₂'), bi('C₂H', 'C₂H')],
        2,
        bi('3 : 6-г 3-т хуваавал 1 : 2 → CH₂.', 'Dividing 3 : 6 by 3 gives 1 : 2 → CH₂.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Ионы томьёо, тэгшитгэл тэнцүүлэх, төлөвийн тэмдэг', 'Ionic formulae, balancing and state symbols'),
    bi(
      '(E) Ионы цэнэгээс ионы нэгдлийн томьёог гаргах; үгэн тэгшитгэлээс тэнцүүлсэн тэмдэгт тэгшитгэл бичих; төлөвийн тэмдгийг зөв хэрэглэх.',
      '(E) Deduce the formula of an ionic compound from the charges on its ions; turn word equations into balanced symbol equations; use state symbols correctly.'
    ),
    [
      bi('Цэнэг тэнцүүлэх: Mg²⁺ + 2 × Cl⁻ → MgCl₂; Ca₂O₂ → CaO гэж хялбарчилна; нийлмэл ион нэгээс олон бол хаалт: (NH₄)₂SO₄, Ca(OH)₂.', 'Balance the charges: Mg²⁺ + 2 × Cl⁻ → MgCl₂; simplify Ca₂O₂ to CaO; brackets when there is more than one compound ion: (NH₄)₂SO₄, Ca(OH)₂.'),
      bi('Массын хадгалагдах хууль: атом үүсэхгүй, устахгүй, зөвхөн "хамтрагчаа сольдог". Зөвхөн урд талын коэффициентыг өөрчилнө, томьёог хэзээ ч өөрчлөхгүй.', 'Conservation of mass: atoms are not created or destroyed, they only change partners. Change only the coefficients in front, never the formulae.'),
      bi('(s) хатуу, тунадас; (l) шингэн, үүссэн ус; (g) хий; (aq) усанд уусмал.', '(s) solid, including a precipitate; (l) liquid, including water produced; (g) gas; (aq) dissolved in water.')
    ],
    lessonSteps(
      [
        [
          bi('Ионы цэнэгийн хүснэгт', 'The table of ion charges'),
          bi('1+, 2+, 3+ катион ба 1−, 2−, 3− анионы хүснэгтийг тайлбарлаж, MgCl₂-ийг цэнэг тэнцүүлэн гаргана; jigsaw (Activity 4.1): хэсэг бүр нэг цэнэг.', 'Explain the table of 1+, 2+, 3+ cations and 1−, 2−, 3− anions and build MgCl₂ by balancing charges; jigsaw (Activity 4.1): each tab is one charge.'),
          bi('Хүснэгтийг цээжилж эхэлнэ; jigsaw хэсгүүдийг тэгш өнцөгт болгоно.', 'Start learning the table; fit the jigsaw pieces into a rectangle.'),
          bi('MgCl₂: 2+ + 2 × (1−) = 0.', 'MgCl₂: 2+ + 2 × (1−) = 0.')
        ],
        [
          bi('Ажилласан жишээ: ионы цэнэгээс томьёо', 'Worked example: formulae from ion charges'),
          bi('Хөнгөнцагааны исэл Al₂O₃, кальцийн исэл CaO (Ca₂O₂-ыг хялбарчлах), натрийн карбонат Na₂CO₃, аммонийн сульфат (NH₄)₂SO₄-ийг алхам алхмаар гаргана. Шалгалтын зөвлөмж: NH₄₂SO₄, CaOH₂ буруу.', 'Work through aluminium oxide Al₂O₃, calcium oxide CaO (simplify Ca₂O₂), sodium carbonate Na₂CO₃ and ammonium sulfate (NH₄)₂SO₄ step by step. Exam tip: NH₄₂SO₄ and CaOH₂ are wrong.'),
          bi('Алхам бүрийг click-ээс өмнө таамаглана; магнийн иодидын томьёог бичнэ.', 'Predict each step before the click; write the formula of magnesium iodide.'),
          bi('Хаалтыг зөв хэрэглэсэн; ионы томьёог хялбарчилсан.', 'Brackets used correctly; ionic formulae simplified.')
        ],
        [
          bi('Бие даан: томьёоны машин', 'You do: formula machine'),
          bi('Na⁺, Mg²⁺, Al³⁺, NH₄⁺ ба Cl⁻, O²⁻, OH⁻, SO₄²⁻, NO₃⁻-оос 20 томьёо бичүүлнэ (3 мин), дараа нь нүд бүрийг дарж шалгана.', 'Students write the 20 formulae from Na⁺, Mg²⁺, Al³⁺, NH₄⁺ with Cl⁻, O²⁻, OH⁻, SO₄²⁻, NO₃⁻ (3 min), then click the cells to check.'),
          bi('20 томьёог самбар/дэвтэртээ бичиж, ямар нүдийг шалгахаа өөрсдөө сонгоно.', 'Write all 20 on boards or in books and choose which cells to check.'),
          bi('Al₂(SO₄)₃-д 12 O атом; Mg(NO₃)₂, Al(OH)₃ зөв.', 'Al₂(SO₄)₃ has 12 O atoms; Mg(NO₃)₂ and Al(OH)₃ correct.')
        ],
        [
          bi('Үгэн тэгшитгэлээс тэнцүүлсэн тэгшитгэл', 'From word equation to balanced equation'),
          bi('hydrogen + oxygen → water; H₂ + O₂ → H₂O тэнцээгүй → 2H₂ + O₂ → 2H₂O ("React ►" загвар). Дараа нь Mg + O₂ → 2MgO-г 4 алхмаар, K + H₂O → 2K + 2H₂O → 2KOH + H₂. Судлах: PhET Balancing Chemical Equations.', 'hydrogen + oxygen → water; H₂ + O₂ → H₂O is unbalanced → 2H₂ + O₂ → 2H₂O (the "React ►" model). Then Mg + O₂ → 2MgO in 4 steps and 2K + 2H₂O → 2KOH + H₂. Explore: PhET Balancing Chemical Equations.'),
          bi('Атомууд хамтрагчаа солихыг ажиглана; H₂O-г H₂O₂ болгож тэнцүүлж болох уу гэдгийг таамаглана.', 'Watch the atoms change partners; predict whether H₂O can be changed to H₂O₂ to balance.'),
          bi('H 4 → 4, O 2 → 2; томьёог өөрчилж болохгүй.', 'H 4 → 4, O 2 → 2; formulae must not change.')
        ],
        [
          bi('Тэнцүүлэх дасгал ба төлөвийн тэмдэг', 'Balancing practice and state symbols'),
          bi('a–h тэгшитгэлийг (Coursebook Q2, Q3) 5 минутад тэнцүүлүүлнэ. Дараа нь төлөвийн тэмдгийн хүснэгт ба гурван жишээ; Q4: Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g).', 'Students balance equations a–h (Coursebook Q2, Q3) in 5 minutes. Then the state-symbol table and three examples; Q4: Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g).'),
          bi('Бие даан тэнцүүлээд хариуг нэг нэгээр шалгана; Q4-ийн тэмдэг бүрийг тайлбарлана.', 'Balance alone and check the answers one by one; explain each state symbol in Q4.'),
          bi('2Cu + O₂ → 2CuO; N₂ + 3H₂ → 2NH₃; 4Na + O₂ → 2Na₂O; 2Al + 3Cl₂ → 2AlCl₃; үүссэн ус (l).', '2Cu + O₂ → 2CuO; N₂ + 3H₂ → 2NH₃; 4Na + O₂ → 2Na₂O; 2Al + 3Cl₂ → 2AlCl₃; water produced is (l).')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('(E) Хөнгөнцагааны ислийн (Al³⁺, O²⁻) томьёо аль нь вэ?', '(E) What is the formula of aluminium oxide (Al³⁺, O²⁻)?'),
        [bi('AlO', 'AlO'), bi('Al₃O₂', 'Al₃O₂'), bi('Al₂O₃', 'Al₂O₃'), bi('AlO₃', 'AlO₃')],
        2,
        bi('Тоог загалмайлна: Al₂O₃ (2 × 3+ = 6+, 3 × 2− = 6−); хялбарчлах боломжгүй.', 'Cross the numbers: Al₂O₃ (2 × 3+ = 6+, 3 × 2− = 6−); it cannot be simplified.')
      ),
      exitItem(
        bi('(E) Аммонийн сульфатын томьёо аль нь вэ?', '(E) What is the formula of ammonium sulfate?'),
        [bi('NH₄SO₄', 'NH₄SO₄'), bi('NH₄₂SO₄', 'NH₄₂SO₄'), bi('(NH₄)₂SO₄', '(NH₄)₂SO₄'), bi('NH₄(SO₄)₂', 'NH₄(SO₄)₂')],
        2,
        bi('2 × NH₄⁺ нэг SO₄²⁻-ийг тэнцүүлнэ; NH₄ хоёр удаа орох тул хаалт хэрэгтэй.', '2 × NH₄⁺ balance one SO₄²⁻; NH₄ appears twice, so it needs brackets.')
      ),
      exitItem(
        bi('__Na + O₂ → __Na₂O тэгшитгэлд Na-ийн коэффициент хэд вэ?', 'In __Na + O₂ → __Na₂O, what is the coefficient of Na?'),
        [bi('1', '1'), bi('2', '2'), bi('4', '4'), bi('8', '8')],
        2,
        bi('O₂ → 2Na₂O тул 4 Na хэрэгтэй: 4Na + O₂ → 2Na₂O.', 'O₂ makes 2Na₂O, so 4 Na are needed: 4Na + O₂ → 2Na₂O.')
      ),
      exitItem(
        bi('Урвалаар үүссэн усанд аль төлөвийн тэмдэг тавих вэ?', 'Which state symbol is used for water produced in a reaction?'),
        [bi('(s)', '(s)'), bi('(l)', '(l)'), bi('(g)', '(g)'), bi('(aq)', '(aq)')],
        1,
        bi('Үүссэн ус шингэн – H₂O(l); H₂O(aq) гэж бичдэггүй.', 'Water produced is a liquid – H₂O(l); never write H₂O(aq).')
      )
    ],
    ID
  ),
  lesson(
    3,
    bi('Ионы тэгшитгэл, Ar ба Mr, урвалын масс', 'Ionic equations, Ar and Mr, reacting masses'),
    bi(
      '(E) Хөндлөнгийн ионыг хасаж ионы тэгшитгэл бичих; Ar-ийг тайлбарлаж Mr-ийг тооцох; энгийн пропорцоор урвалын массыг тооцох; магнийг тигельд халаах туршилтын өгөгдлийг боловсруулах.',
      '(E) Write ionic equations by leaving out the spectator ions; describe Ar and calculate Mr; calculate reacting masses in simple proportions; process the data of heating magnesium in a crucible.'
    ),
    [
      bi('Ионы тэгшитгэл 4 алхмаар: бүтэн тэгшитгэл → (aq) нэгдлийг ионд задлах → хөндлөнгийн ионыг хасах → H⁺(aq) + OH⁻(aq) → H₂O(l). (s), (l), (g)-г задлахгүй.', 'Ionic equations in 4 steps: full equation → split (aq) compounds into ions → cross out spectator ions → H⁺(aq) + OH⁻(aq) → H₂O(l). Do not split (s), (l) or (g).'),
      bi('Ar = изотопуудын дундаж масс, ¹²C атомын массын 1/12-тэй харьцуулсан; Mr = томьёо дахь бүх Ar-ийн нийлбэр; нэгжгүй.', 'Ar = the average mass of the isotopes compared with 1/12 of the mass of a ¹²C atom; Mr = the sum of the Ar values in the formula; no units.'),
      bi('Энгийн пропорц: 0.24 g Mg → 0.40 g MgO бол 12 g Mg → 12 × 0.40 ÷ 0.24 = 20 g MgO.', 'Simple proportion: if 0.24 g Mg gives 0.40 g MgO, then 12 g Mg gives 12 × 0.40 ÷ 0.24 = 20 g MgO.')
    ],
    lessonSteps(
      [
        [
          bi('Ионы тэгшитгэл', 'Ionic equations'),
          bi('HCl + NaOH-ийн ионы тэгшитгэлийг 4 алхмаар гаргана; Na⁺ ба Cl⁻ хөндлөнгийн ион. Тунадас: Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s). Зураг 4.15: бүх ион ба зөвхөн урвалд орох ион.', 'Build the ionic equation for HCl + NaOH in 4 steps; Na⁺ and Cl⁻ are spectator ions. Precipitation: Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s). Figure 4.15: all the ions vs only the reacting ions.'),
          bi('Алхам бүрийг дагаж дэвтэртээ бичнэ.', 'Follow each step in their books.'),
          bi('H⁺(aq) + OH⁻(aq) → H₂O(l).', 'H⁺(aq) + OH⁻(aq) → H₂O(l).')
        ],
        [
          bi('Виртуал лаб: тунадасны урвал', 'Virtual lab: precipitation reactions'),
          bi('AgNO₃ + NaCl, Na₂SO₄ + BaCl₂, CuSO₄ + NaOH: тунадас ба ионы тэгшитгэлийг эхлээд таамаглуулж, дараа нь "Mix ►" дарна.', 'AgNO₃ + NaCl, Na₂SO₄ + BaCl₂, CuSO₄ + NaOH: students predict the precipitate and the ionic equation, then click "Mix ►".'),
          bi('Тунадас ба ионы тэгшитгэлийг самбартаа бичээд ажиглалттай харьцуулна.', 'Write the precipitate and ionic equation on boards and compare with what they see.'),
          bi('AgCl(s) цагаан; BaSO₄(s) цагаан; Cu(OH)₂(s) цайвар цэнхэр.', 'AgCl(s) white; BaSO₄(s) white; Cu(OH)₂(s) light blue.')
        ],
        [
          bi('Бие даан: бүтэн ба ионы тэгшитгэл', 'You do: full and ionic equations'),
          bi('Coursebook Q6: (a) HCl + KOH, (b) HCl + CuCO₃ – бүтэн ба ионы тэгшитгэлийг төлөвийн тэмдэгтэй бичүүлнэ (4 мин).', 'Coursebook Q6: (a) HCl + KOH, (b) HCl + CuCO₃ – students write the full and ionic equations with state symbols (4 min).'),
          bi('Хоёр тэгшитгэлийг бие даан бичээд шалгана.', 'Write both equations alone, then check.'),
          bi('(b) 2H⁺(aq) + CuCO₃(s) → Cu²⁺(aq) + H₂O(l) + CO₂(g) – CuCO₃ хатуу тул задлахгүй.', '(b) 2H⁺(aq) + CuCO₃(s) → Cu²⁺(aq) + H₂O(l) + CO₂(g) – CuCO₃ is a solid, so it is not split.')
        ],
        [
          bi('Ar, Mr ба урвалын масс', 'Ar, Mr and reacting masses'),
          bi('Ar ба Mr-ийг тодорхойлж хүснэгтээр тооцно: H₂O 18, CO₂ 44, CaCO₃ 100, (NH₄)₂SO₄ 132, MgSO₄·7H₂O 246. Дараа нь Q8 (O₂, NH₃, H₂SO₄, KBr, Cu(NO₃)₂) ба 0.24 g Mg → 0.40 g MgO жишээ.', 'Define Ar and Mr and work through the table: H₂O 18, CO₂ 44, CaCO₃ 100, (NH₄)₂SO₄ 132, MgSO₄·7H₂O 246. Then Q8 (O₂, NH₃, H₂SO₄, KBr, Cu(NO₃)₂) and the worked example 0.24 g Mg → 0.40 g MgO.'),
          bi('Q8-ыг 2 минутад бодоод, CaCO₃ → CaO ба Ca-ийн массын "You try"-г бодно.', 'Do Q8 in 2 minutes, then the "You try" on CaCO₃ → CaO and the mass of Ca.'),
          bi('32, 17, 98, 119, 188; 4.48 g CaO; 6.0 g Ca.', '32, 17, 98, 119, 188; 4.48 g CaO; 6.0 g Ca.')
        ],
        [
          bi('Практик: магнийг тигельд халаах', 'Practical: heating magnesium in a crucible'),
          bi('Аргачлалыг Зураг 4.19-өөр тайлбарлаж, өгөгдлөөр (8.52, 8.88, 9.12 g) Paper 6 маягийн (a)–(e) асуултад хариулуулна. Аюулгүй байдал: нүдний хамгаалалт, шатаж буй магни руу шууд харахгүй.', 'Explain the method with Figure 4.19 and use the data (8.52, 8.88, 9.12 g) for the Paper 6 style questions (a)–(e). Safety: eye protection; do not look directly at burning magnesium.'),
          bi('Массыг хасаж олоод, таг өргөх ба тогтмол масс хүртэл халаахын шалтгааныг бичнэ.', 'Subtract to find the masses and write why the lid is lifted and why to heat to constant mass.'),
          bi('Mg 0.36 g; O 0.24 g; агаар оруулах; MgO утаа алдахгүй; тогтмол масс.', 'Mg 0.36 g; O 0.24 g; let air in; do not lose MgO smoke; constant mass.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('(E) HCl(aq) + NaOH(aq) урвалын ионы тэгшитгэл аль нь вэ?', '(E) What is the ionic equation for HCl(aq) + NaOH(aq)?'),
        [
          bi('Na⁺(aq) + Cl⁻(aq) → NaCl(aq)', 'Na⁺(aq) + Cl⁻(aq) → NaCl(aq)'),
          bi('H⁺(aq) + OH⁻(aq) → H₂O(l)', 'H⁺(aq) + OH⁻(aq) → H₂O(l)'),
          bi('HCl + NaOH → NaCl + H₂O', 'HCl + NaOH → NaCl + H₂O'),
          bi('H⁺(aq) + Cl⁻(aq) → HCl(aq)', 'H⁺(aq) + Cl⁻(aq) → HCl(aq)')
        ],
        1,
        bi('Na⁺ ба Cl⁻ өөрчлөгдөхгүй тул хөндлөнгийн ион – хасна.', 'Na⁺ and Cl⁻ do not change, so they are spectator ions and are left out.')
      ),
      exitItem(
        bi('(E) AgNO₃(aq) ба NaCl(aq)-ийг холиход ямар тунадас үүсэх вэ?', '(E) Which precipitate forms when AgNO₃(aq) and NaCl(aq) are mixed?'),
        [bi('Цагаан AgCl(s)', 'White AgCl(s)'), bi('Цагаан BaSO₄(s)', 'White BaSO₄(s)'), bi('Цайвар цэнхэр Cu(OH)₂(s)', 'Light blue Cu(OH)₂(s)'), bi('Тунадас үүсэхгүй', 'No precipitate')],
        0,
        bi('Ag⁺(aq) + Cl⁻(aq) → AgCl(s), цагаан тунадас.', 'Ag⁺(aq) + Cl⁻(aq) → AgCl(s), a white precipitate.')
      ),
      exitItem(
        bi('CaCO₃-ийн Mr хэд вэ? (Ca = 40, C = 12, O = 16)', 'What is the Mr of CaCO₃? (Ca = 40, C = 12, O = 16)'),
        [bi('68', '68'), bi('84', '84'), bi('100', '100'), bi('116', '116')],
        2,
        bi('40 + 12 + (3 × 16) = 100.', '40 + 12 + (3 × 16) = 100.')
      ),
      exitItem(
        bi('0.24 g Mg-аас 0.40 g MgO үүснэ. 12 g Mg-аас хэдэн грамм MgO үүсэх вэ?', '0.24 g of Mg makes 0.40 g of MgO. What mass of MgO forms from 12 g of Mg?'),
        [bi('7.2 g', '7.2 g'), bi('12.4 g', '12.4 g'), bi('20 g', '20 g'), bi('40 g', '40 g')],
        2,
        bi('12 × 0.40 ÷ 0.24 = 20 g.', '12 × 0.40 ÷ 0.24 = 20 g.')
      )
    ],
    ID
  ),
  lesson(
    4,
    bi('Шалгалтын дасгал ба дүгнэлт: томьёо ба тэгшитгэл', 'Exam practice and review: formulae and equations'),
    bi(
      'Hinge асуулт, шалгалтын асуултаар бүх бүлгийг шалгах; хамгийн их оноо алддаг алдааг засах; томьёо → тэгшитгэл → тэнцүүлэх → төлөвийн тэмдэг → ионы тэгшитгэлийг нэгтгэх.',
      'Check the whole chapter with hinge and exam questions; correct the mistakes that lose most marks; pull together name → formula → equation → balance → state symbols → ionic equation.'
    ),
    [
      bi('Хоёр атомт хий: H₂, N₂, O₂, Cl₂ – томьёог өөрчилж тэнцүүлэхгүй (2Mg + O₂ → 2MgO).', 'Diatomic gases: H₂, N₂, O₂, Cl₂ – never balance by changing a formula (2Mg + O₂ → 2MgO).'),
      bi('Co нь кобальт, CO нь нүүрстөрөгчийн дутуу исэл; нийлмэл ионд хаалт; үүссэн ус H₂O(l); нэгдлийн томьёонд цэнэг бичихгүй.', 'Co is cobalt, CO is carbon monoxide; brackets round compound ions; water produced is H₂O(l); no charges inside a compound formula.'),
      bi('Масс хадгалагдана; элементүүд массаараа тогтмол харьцаагаар нэгддэг тул урвалын массыг энгийн пропорцоор тооцно.', 'Mass is conserved; elements combine in a fixed ratio by mass, so reacting masses follow simple proportion.')
    ],
    lessonSteps(
      [
        [
          bi('Hinge асуулт', 'Hinge questions'),
          bi('Q1 (Core): Al + Cl₂-ийн тэнцүүлсэн тэгшитгэл; Q2 (E): төмөр(III)-ын сульфатын томьёо. 10 секунд бодуулаад ABCD хуруугаар зэрэг санал өгүүлж, сонголт бүрийн тайлбарыг гаргана.', 'Q1 (Core): the balanced equation for Al + Cl₂; Q2 (E): the formula of iron(III) sulfate. Ten seconds to think, everyone votes with ABCD fingers, then reveal the reason for each option.'),
          bi('ABCD хуруугаар санал өгч, буруу сонголт бүрийн алдааг тайлбарлана.', 'Vote with ABCD fingers and explain the mistake behind each wrong option.'),
          bi('Q1: C (2Al + 3Cl₂ → 2AlCl₃); Q2: C (Fe₂(SO₄)₃).', 'Q1: C (2Al + 3Cl₂ → 2AlCl₃); Q2: C (Fe₂(SO₄)₃).')
        ],
        [
          bi('Оноо алдах газрууд ба алдаа засах', 'Where marks are lost and the error clinic'),
          bi('6 нийтлэг алдааг засуулна (Co/CO, H₂O₂, Mg + O, CaOH₂, H₂O(aq), Cu²⁺(OH⁻)₂). Үнэлэх: Mg + O₂ → MgO₂ гэж "тэнцүүлсэн" сурагч. Алдаа засах: AgNO₃ + NaCl-ийн ионы тэгшитгэл.', 'Correct the 6 common mistakes (Co/CO, H₂O₂, Mg + O, CaOH₂, H₂O(aq), Cu²⁺(OH⁻)₂). Evaluate: a student who "balanced" with Mg + O₂ → MgO₂. Error clinic: the ionic equation for AgNO₃ + NaCl.'),
          bi('Алдаа бүрийг өөрийн үгээр тайлбарлаж, загвар өгүүлбэрээр үнэлгээ бичнэ.', 'Explain each mistake in their own words and write the evaluation with the sentence frame.'),
          bi('2Mg + O₂ → 2MgO; Ag⁺(aq) + Cl⁻(aq) → AgCl(s), Na⁺ ба NO₃⁻ хөндлөнгийн ион.', '2Mg + O₂ → 2MgO; Ag⁺(aq) + Cl⁻(aq) → AgCl(s), Na⁺ and NO₃⁻ are spectator ions.')
        ],
        [
          bi('Шалгалтын дасгал: Paper 1/2', 'Exam practice: Paper 1/2'),
          bi('Q1 (Core): 100 g CaCO₃ дахь нүүрстөрөгчийн масс; Q3 (E): бутендиоын хүчлийн эмпирик томьёо. 90 секунд бие даан.', 'Q1 (Core): the mass of carbon in 100 g of CaCO₃; Q3 (E): the empirical formula of butenedioic acid. 90 seconds alone.'),
          bi('Үсгээ самбартаа бичээд сонголт бүрийн тайлбарыг сонсоно.', 'Write their letter on boards and hear the reason for each option.'),
          bi('Q1: A (12 g); Q3: C (CHO).', 'Q1: A (12 g); Q3: C (CHO).')
        ],
        [
          bi('Шалгалтын дасгал: Paper 3/4', 'Exam practice: Paper 3/4'),
          bi('Q2: фосфорын хүчил + магнийн карбонат (томьёо, үгэн тэгшитгэл, Mr(MgCO₃), харьцангуй формулын масс, 1.2 g Mg). Q4 (E): бутаны хүчил. 10 минут бичүүлээд онооны цэг бүрийг нэмнэ.', 'Q2: phosphoric acid + magnesium carbonate (formula, word equation, Mr of MgCO₃, relative formula mass, 1.2 g Mg). Q4 (E): butanoic acid. Ten minutes of writing, then add each marking point.'),
          bi('Шалгалтын нөхцөлд бичээд өөр өнгийн үзгээр засна.', 'Write under exam conditions and mark in a different colour.'),
          bi('H₃PO₄; Mr(MgCO₃) = 84; 4.2 g; (E) C₂H₄O, Mr 88.', 'H₃PO₄; Mr(MgCO₃) = 84; 4.2 g; (E) C₂H₄O, Mr 88.')
        ],
        [
          bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
          bi('6 алхамт дүгнэлт ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: Na + H₂O тэнцүүлэх, Mr(Ca(OH)₂), (E) AgNO₃ + NaCl-ийн ионы тэгшитгэл. Амжилтын шалгуурт дахин fist to five; яагаад тэнцүүлсэн тэгшитгэл жор шиг вэ?', 'The 6-step summary and the concept map; return to the opening vote. Exit ticket: balance Na + H₂O, Mr of Ca(OH)₂, (E) the ionic equation for AgNO₃ + NaCl. Fist to five on the success criteria again; why is a balanced equation like a recipe?'),
          bi('Гарах билетийг 3 минутад бие даан бичнэ; 🟢🟡🔴-ээр өөрийгөө үнэлнэ.', 'Complete the exit ticket alone in 3 minutes; rate themselves 🟢🟡🔴.'),
          bi('2Na + 2H₂O → 2NaOH + H₂; 74; Ag⁺(aq) + Cl⁻(aq) → AgCl(s).', '2Na + 2H₂O → 2NaOH + H₂; 74; Ag⁺(aq) + Cl⁻(aq) → AgCl(s).')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Хөнгөнцагаан хлортой урвалд орох тэнцүүлсэн тэгшитгэл аль нь вэ?', 'Which is the balanced equation for aluminium reacting with chlorine?'),
        [bi('Al + Cl₂ → AlCl₂', 'Al + Cl₂ → AlCl₂'), bi('Al + Cl₃ → AlCl₃', 'Al + Cl₃ → AlCl₃'), bi('2Al + 3Cl₂ → 2AlCl₃', '2Al + 3Cl₂ → 2AlCl₃'), bi('2Al + 3Cl → 2AlCl₃', '2Al + 3Cl → 2AlCl₃')],
        2,
        bi('Al 2 = 2, Cl 6 = 6; хлор Cl₂, хөнгөнцагааны хлорид AlCl₃.', 'Al 2 = 2, Cl 6 = 6; chlorine is Cl₂ and aluminium chloride is AlCl₃.')
      ),
      exitItem(
        bi('(E) Төмөр(III)-ын сульфатын томьёо аль нь вэ?', '(E) What is the formula of iron(III) sulfate?'),
        [bi('FeSO₄', 'FeSO₄'), bi('Fe₃SO₄', 'Fe₃SO₄'), bi('Fe₂(SO₄)₃', 'Fe₂(SO₄)₃'), bi('Fe₂SO₄₃', 'Fe₂SO₄₃')],
        2,
        bi('2 × Fe³⁺ = 6+; 3 × SO₄²⁻ = 6−; хаалт хэрэгтэй.', '2 × Fe³⁺ = 6+; 3 × SO₄²⁻ = 6−; brackets are needed.')
      ),
      exitItem(
        bi('Ca(OH)₂-ийн Mr хэд вэ? (Ca = 40, O = 16, H = 1)', 'What is the Mr of calcium hydroxide, Ca(OH)₂? (Ca = 40, O = 16, H = 1)'),
        [bi('57', '57'), bi('58', '58'), bi('74', '74'), bi('114', '114')],
        2,
        bi('40 + 2 × (16 + 1) = 74.', '40 + 2 × (16 + 1) = 74.')
      ),
      exitItem(
        bi('Mr(CaCO₃) = 100. 100 g кальцийн карбонатад хэдэн грамм нүүрстөрөгч байх вэ?', 'Mr of CaCO₃ is 100. What mass of carbon is in 100 g of calcium carbonate?'),
        [bi('12 g', '12 g'), bi('60 g', '60 g'), bi('48 g', '48 g'), bi('36 g', '36 g')],
        0,
        bi('Нэг C атом, Ar = 12 → 100 g-д 12 g.', 'One C atom with Ar = 12 → 12 g in 100 g.')
      ),
      exitItem(
        bi('(E) Бутендиоын хүчил C₄H₄O₄-ийн эмпирик томьёо аль нь вэ?', '(E) What is the empirical formula of butenedioic acid, C₄H₄O₄?'),
        [bi('C₂H₂O₂', 'C₂H₂O₂'), bi('C₄H₄O₄', 'C₄H₄O₄'), bi('CHO', 'CHO'), bi('C₂HO₂', 'C₂HO₂')],
        2,
        bi('C₄H₄O₄ ÷ 4 = CHO; C₂H₂O₂-ыг цааш хялбарчилж болно.', 'C₄H₄O₄ ÷ 4 = CHO; C₂H₂O₂ can still be simplified.')
      )
    ],
    ID
  )
];

export const IG3_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'ig3-1': [
    term(bi('химийн тэмдэг', 'chemical symbol'), bi('Элементийг илэрхийлэх үсэг, жишээ нь Na, Cl.', 'A letter or letters representing an element, e.g. Na, Cl.')),
    term(bi('нийлмэл ион', 'compound ion'), bi('Нийт цэнэгтэй атомын бүлэг, жишээ нь SO₄²⁻, NH₄⁺.', 'A group of atoms with an overall charge, e.g. SO₄²⁻, NH₄⁺.')),
    term(bi('молекулын томьёо', 'molecular formula'), bi('Нэг молекул дахь атомын бодит тоо ба төрөл.', 'The actual number and type of atoms in one molecule.')),
    term(bi('эмпирик томьёо (E)', 'empirical formula (E)'), bi('Нэгдэл дэх атом эсвэл ионы хамгийн энгийн бүхэл тооны харьцаа.', 'The simplest whole-number ratio of atoms or ions in a compound.'))
  ],
  'ig3-2': [
    term(bi('үгэн тэгшитгэл', 'word equation'), bi('Урвалд орох ба үүсэх бодисын нэрээр бичсэн товч илэрхийлэл.', 'A summary of a reaction using the names of reactants and products.')),
    term(bi('тэнцүүлсэн тэгшитгэл', 'balanced equation'), bi('Хоёр талд атом бүрийн тоо ижил тэмдэгт тэгшитгэл.', 'A symbol equation with the same number of each atom on both sides.')),
    term(bi('төлөвийн тэмдэг', 'state symbols'), bi('(s) хатуу, (l) шингэн, (g) хий, (aq) усанд уусмал.', '(s) solid, (l) liquid, (g) gas, (aq) dissolved in water.')),
    term(bi('формулын нэгж', 'formula unit'), bi('Ионы нэгдлийн томьёогоор заасан ионуудын бүлэг, жишээ нь NaCl.', 'The group of ions given by the formula of an ionic compound, e.g. NaCl.'))
  ],
  'ig3-3': [
    term(bi('ионы тэгшитгэл', 'ionic equation'), bi('Зөвхөн урвалд оролцох ионуудыг харуулна.', 'Shows only the ions that take part in the reaction.')),
    term(bi('хөндлөнгийн ион', 'spectator ions'), bi('Урвалд өөрчлөгдөхгүй тул ионы тэгшитгэлээс хасагддаг ионууд.', 'Ions that do not change in the reaction, so they are left out of the ionic equation.')),
    term(bi('Ar', 'Ar'), bi('Элементийн изотопуудын дундаж масс, ¹²C атомын массын 1/12-тэй харьцуулсан.', 'The average mass of the isotopes of an element compared with 1/12 of the mass of a ¹²C atom.')),
    term(bi('Mr', 'Mr'), bi('Томьёо дахь бүх атомын Ar утгын нийлбэр.', 'The sum of the Ar values of all the atoms in the formula.'))
  ],
  'ig3-4': [
    term(bi('талст ус', 'water of crystallisation'), bi('Талст устай давсны бүтэц дэх ус, жишээ нь CuSO₄·5H₂O.', 'Water in the structure of a hydrated salt, e.g. CuSO₄·5H₂O.')),
    term(bi('массын хадгалагдах хууль', 'conservation of mass'), bi('Атом үүсэхгүй, устахгүй; бүтээгдэхүүний нийт масс = урвалжийн нийт масс.', 'Atoms are not created or destroyed; the total mass of products = the total mass of reactants.'))
  ]
};

export const IG3_PRACTICE_A: Record<string, PracticeItem[]> = {
  'ig3-1': [
    easy(
      bi('CuSO₄-ийн нэр аль нь вэ?', 'What is the name of CuSO₄?'),
      [bi('copper sulfide', 'copper sulfide'), bi('copper(II) sulfate', 'copper(II) sulfate'), bi('copper(I) sulfate', 'copper(I) sulfate'), bi('sulfate copper', 'sulfate copper')],
      1,
      bi('SO₄²⁻ нь хүчилтөрөгчтэй нийлмэл ион (-ate); цэнэгийг тэнцүүлэхэд Cu²⁺ → copper(II).', 'SO₄²⁻ is a compound ion with oxygen (-ate); to balance it the copper is Cu²⁺ → copper(II).')
    ),
    easy(
      bi('Устөрөгч ба хүхрээс (H + S) тогтсон нэгдлийн томьёо аль нь вэ?', 'What is the formula of hydrogen sulfide (H + S)?'),
      [bi('HS', 'HS'), bi('H₂S', 'H₂S'), bi('HS₂', 'HS₂'), bi('H₂S₂', 'H₂S₂')],
      1,
      bi('H-ийн валент 1, S-ийнх 2 (8 − 6) → H₂S.', 'The valency of H is 1 and of S is 2 (8 − 6) → H₂S.')
    ),
    hard(
      bi('B бүтэц нь аварга ионы тор. Түүний томьёог яагаад Na₈I₈ биш NaI гэж бичдэгийг тайлбарла.', 'Structure B is a giant ionic lattice. Explain why its formula is written NaI and not Na₈I₈.'),
      bi('Ионы нэгдэлд молекул байхгүй; томьёо нь ионуудын харьцааг (1 : 1) заана, тиймээс хамгийн энгийн харьцаагаар NaI гэж бичнэ.', 'An ionic compound has no molecules; the formula gives the ratio of the ions (1 : 1), so it is written in the simplest ratio, NaI.'),
      bi('Ионы томьёо үргэлж эмпирик томьёо байдаг.', 'The formula of an ionic compound is always an empirical formula.')
    )
  ],
  'ig3-2': [
    easy(
      bi('__Al + __Cl₂ → __AlCl₃ тэгшитгэлийг тэнцүүл.', 'Balance: __Al + __Cl₂ → __AlCl₃.'),
      [bi('Al + Cl₂ → AlCl₃', 'Al + Cl₂ → AlCl₃'), bi('2Al + 3Cl₂ → 2AlCl₃', '2Al + 3Cl₂ → 2AlCl₃'), bi('Al + 3Cl₂ → AlCl₃', 'Al + 3Cl₂ → AlCl₃'), bi('2Al + Cl₂ → 2AlCl₃', '2Al + Cl₂ → 2AlCl₃')],
      1,
      bi('Cl: 3 × 2 = 6 = 2 × 3; Al: 2 = 2.', 'Cl: 3 × 2 = 6 = 2 × 3; Al: 2 = 2.')
    ),
    easy(
      bi('(E) Магнийн гидроксидын томьёо аль нь вэ?', '(E) What is the formula of magnesium hydroxide?'),
      [bi('MgOH', 'MgOH'), bi('MgOH₂', 'MgOH₂'), bi('Mg(OH)₂', 'Mg(OH)₂'), bi('Mg₂OH', 'Mg₂OH')],
      2,
      bi('Mg²⁺-ийг 2 × OH⁻ тэнцүүлнэ; OH хоёр удаа орох тул хаалт.', '2 × OH⁻ balance Mg²⁺; OH appears twice, so it needs brackets.')
    ),
    hard(
      bi('Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g) тэгшитгэлийн төлөвийн тэмдэг бүрийг тайлбарла.', 'Explain each state symbol in Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g).'),
      bi('Na₂CO₃ хатуу нунтаг; HCl ба NaCl усанд уусмал; ус шингэн хэлбэрээр үүснэ; CO₂ хий болж ялгарна (хөөсрөнө).', 'Na₂CO₃ is a solid powder; HCl and NaCl are dissolved in water; water is produced as a liquid; CO₂ is given off as a gas (fizzing).'),
      bi('Үүссэн ус (l), (aq) биш.', 'Water produced is (l), not (aq).')
    )
  ],
  'ig3-3': [
    easy(
      bi('(E) Na₂SO₄(aq) + BaCl₂(aq) урвалын ионы тэгшитгэл аль нь вэ?', '(E) What is the ionic equation for Na₂SO₄(aq) + BaCl₂(aq)?'),
      [
        bi('Na⁺(aq) + Cl⁻(aq) → NaCl(s)', 'Na⁺(aq) + Cl⁻(aq) → NaCl(s)'),
        bi('Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)', 'Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)'),
        bi('Ba²⁺(aq) + 2Cl⁻(aq) → BaCl₂(s)', 'Ba²⁺(aq) + 2Cl⁻(aq) → BaCl₂(s)'),
        bi('Na₂SO₄ + BaCl₂ → BaSO₄ + 2NaCl', 'Na₂SO₄ + BaCl₂ → BaSO₄ + 2NaCl')
      ],
      1,
      bi('Цагаан BaSO₄ тунадас; Na⁺ ба Cl⁻ хөндлөнгийн ион.', 'White BaSO₄ precipitates; Na⁺ and Cl⁻ are spectator ions.')
    ),
    easy(
      bi('(NH₄)₂SO₄-ийн Mr хэд вэ? (H = 1, N = 14, O = 16, S = 32)', 'What is the Mr of (NH₄)₂SO₄? (H = 1, N = 14, O = 16, S = 32)'),
      [bi('114', '114'), bi('118', '118'), bi('132', '132'), bi('150', '150')],
      2,
      bi('(2 × 14) + (8 × 1) + 32 + (4 × 16) = 132.', '(2 × 14) + (8 × 1) + 32 + (4 × 16) = 132.')
    ),
    hard(
      bi('Тигельд магни халаав: хоосон тигель + таг 8.52 g, + магни 8.88 g, + магнийн исэл 9.12 g. Магни ба нэгдсэн хүчилтөрөгчийн массыг олж, урвал дууссаныг хэрхэн мэдэхийг бич.', 'Magnesium is heated in a crucible: empty crucible + lid 8.52 g, + magnesium 8.88 g, + magnesium oxide 9.12 g. Find the masses of magnesium and of oxygen combined, and say how you know the reaction is complete.'),
      bi('Mg = 8.88 − 8.52 = 0.36 g; O = 9.12 − 8.88 = 0.24 g; тогтмол масс хүртэл халаана.', 'Mg = 8.88 − 8.52 = 0.36 g; O = 9.12 − 8.88 = 0.24 g; heat to constant mass.'),
      bi('Тагийг хааяа өргөж агаар оруулна, гэхдээ хэт их өргөвөл MgO утаа алдагдана.', 'Lift the lid now and then to let air in, but not too much or white MgO smoke escapes.')
    )
  ],
  'ig3-4': [
    easy(
      bi('Аль нь нүүрстөрөгчийн дутуу ислийн зөв томьёо вэ?', 'Which is the correct formula of carbon monoxide?'),
      [bi('Co', 'Co'), bi('CO', 'CO'), bi('CO₂', 'CO₂'), bi('C₂O', 'C₂O')],
      1,
      bi('Том O: Co нь кобальт элемент.', 'Capital O: Co is the element cobalt.')
    ),
    easy(
      bi('__Na + __H₂O → __NaOH + H₂ тэгшитгэлийг тэнцүүл.', 'Balance: __Na + __H₂O → __NaOH + H₂.'),
      [bi('Na + H₂O → NaOH + H₂', 'Na + H₂O → NaOH + H₂'), bi('2Na + 2H₂O → 2NaOH + H₂', '2Na + 2H₂O → 2NaOH + H₂'), bi('2Na + H₂O → 2NaOH + H₂', '2Na + H₂O → 2NaOH + H₂'), bi('Na + 2H₂O → NaOH + H₂', 'Na + 2H₂O → NaOH + H₂')],
      1,
      bi('H: 4 = 2 + 2; Na 2 = 2; O 2 = 2.', 'H: 4 = 2 + 2; Na 2 = 2; O 2 = 2.')
    ),
    hard(
      bi('6 g Mg-аас 21 g MgCO₃ үүснэ. 1.2 g Mg-аас хэдэн грамм үүсэх вэ? Mr(MgCO₃)-ийг ч тооцоол. (Mg = 24, C = 12, O = 16)', '6 g of Mg makes 21 g of MgCO₃. What mass forms from 1.2 g of Mg? Also calculate the Mr of MgCO₃. (Mg = 24, C = 12, O = 16)'),
      bi('1.2 × 21 ÷ 6 = 4.2 g; Mr = 24 + 12 + (3 × 16) = 84.', '1.2 × 21 ÷ 6 = 4.2 g; Mr = 24 + 12 + (3 × 16) = 84.'),
      bi('Онооны схем: ажлаа харуулбал [1], зөв хариу [1].', 'Mark scheme: working [1], correct answer [1].')
    )
  ]
};
