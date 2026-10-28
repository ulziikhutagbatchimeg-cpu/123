// IGCSE 0620 chapter 7 (acids, bases and salts), lessons 3–4: preparing salts. They follow the deck
// Ch12_Preparation_of_salts.pptx and its plan of two 40-minute lessons (slides 1–12 and 13 on), with the review slides
// 21–28. Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig7';

export const IG7_LESSONS_B: StatesLesson[] = [
  lesson(
    3,
    bi('Уусах дүрэм ба уусдаг давс бэлтгэх', 'Solubility rules and preparing soluble salts'),
    bi(
      'Давсны ерөнхий уусах дүрмийг санах; талст устай, усгүй, талст усыг тодорхойлох; уусдаг давсыг хүчил + илүүдэл металл, уусдаггүй суурь эсвэл карбонатаар, мөн хүчил + шүлтийг титрлэлтээр бэлтгэж, ялгаж, цэвэршүүлэх.',
      'Recall the general solubility rules for salts; define hydrated, anhydrous and water of crystallisation; prepare, separate and purify soluble salts by acid + excess metal, insoluble base or carbonate, and by titrating acid with alkali.'
    ),
    [
      bi('Na, K, NH₄ давс ба нитрат бүгд уусдаг ("SNAP"); хлорид ихэнх нь (AgCl, PbCl₂ үгүй); сульфат ихэнх нь (BaSO₄, CaSO₄, PbSO₄ үгүй); карбонат, гидроксид – зөвхөн Na, K, NH₄.', 'All Na, K and NH₄ salts and nitrates are soluble ("SNAP"); most chlorides (not AgCl, PbCl₂); most sulfates (not BaSO₄, CaSO₄, PbSO₄); carbonates and hydroxides – only Na, K and NH₄.'),
      bi('A арга: хүчилд хатуу бодисыг илүүдэлтэй нэмэх → шүүх → талсжих цэг хүртэл ууршуулах → хөргөж талсжуулах → шүүж, угааж, хатаах. Хуурай болтол ууршуулахгүй.', 'Method A: add the solid to the acid in excess → filter → evaporate to the crystallisation point → cool and crystallise → filter, wash and dry. Do not evaporate to dryness.'),
      bi('B арга (титрлэлт): хоёр урвалж хоёулаа уусдаг үед (NaCl, KNO₃, (NH₄)₂SO₄); төгсгөлийн цэгийг олоод индикаторгүй давтана.', 'Method B (titration): when both reactants are soluble (NaCl, KNO₃, (NH₄)₂SO₄); find the end-point, then repeat without indicator.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi(
          'Том асуулт: хар нунтаг ба өнгөгүй хүчлээс цэвэр, хуурай цэнхэр зэс(II)-ын сульфатын талстыг яаж гаргах вэ? "Санал нийлэх үү?" (бүх давс уусдаг; илүүдэл хатуу бодис бүх хүчлийг урвалдуулна; натрийг илүүдэл нэмж NaCl гаргана) ба төлөвлөгөө.',
          'Big question: how can you make pure, dry blue crystals of copper(II) sulfate from a black powder and a colourless acid? "Agree or disagree?" (all salts are soluble; excess solid is used so all the acid reacts; you can make NaCl by adding excess sodium to acid) and the plan.'
        ),
        bi('Хуурай талст гаргах алхмуудыг хосоороо 60 секундэд жагсааж, эрхий хуруугаар санал өгнө.', 'In pairs list the steps to get dry crystals in 60 s; vote with thumbs.'),
        bi('Хүчил + суурь → давс + ус; шүүх, ууршуулах, талсжуулах.', 'Acid + base → salt + water; filter, evaporate, crystallise.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi(
          'Талст устай, усгүй, талст усны тодорхойлолт (талст устай = "нойтон" биш). Зорилгод fist to five. Давталт: хүчил + металлын исэл, хүхрийн хүчлийн давс, метил улбар шар хүчилд, саармагжилтын ионы тэгшитгэл.',
          'The definitions of hydrated, anhydrous and water of crystallisation (hydrated does not mean "wet"). Fist to five on the objectives. Retrieval: acid + metal oxide, the salts of sulfuric acid, methyl orange in acid, the ionic equation for neutralisation.'
        ),
        bi('Самбартаа бичээд 3-2-1-д өргөнө.', 'Write on show-me boards and reveal on 3-2-1.'),
        bi('Давс + ус; сульфат; улаан; H⁺(aq) + OH⁻(aq) → H₂O(l).', 'Salt + water; sulfates; red; H⁺(aq) + OH⁻(aq) → H₂O(l).')
      ],
      [
        bi('Уусах дүрэм ба талст устай давс', 'Solubility rules and hydrated salts'),
        bi(
          'Уусах дүрмийн хүснэгт ("SNAP"). Хамтдаа: K₂CO₃, AgCl, Cu(NO₃)₂, BaSO₄, CaCO₃. Талст устай давс: CuSO₄·5H₂O цэнхэр → халаахад цагаан усгүй CuSO₄; CoCl₂·6H₂O, MgSO₄·7H₂O, Na₂CO₃·10H₂O; Mr-д ус орно (CuSO₄·5H₂O = 250).',
          'The solubility table ("SNAP"). Together: K₂CO₃, AgCl, Cu(NO₃)₂, BaSO₄, CaCO₃. Hydrated salts: blue CuSO₄·5H₂O → white anhydrous CuSO₄ on heating; CoCl₂·6H₂O, MgSO₄·7H₂O, Na₂CO₃·10H₂O; Mr includes the water (CuSO₄·5H₂O = 250).'
        ),
        bi('Мөр бүрт эрхий хуруугаар уусах/уусахгүй гэж таамаглана; S эсвэл I-г самбартаа бичнэ; MgSO₄·7H₂O-ийн Mr-ийг бодно.', 'Thumbs up or down for each row; write S or I on boards; calculate the Mr of MgSO₄·7H₂O.'),
        bi('Уусдаг, уусдаггүй, уусдаг, уусдаггүй, уусдаггүй; Mr = 246.', 'Soluble, insoluble, soluble, insoluble, insoluble; Mr = 246.')
      ],
      [
        bi('A арга: хүчил + илүүдэл хатуу бодис', 'Method A: acid + excess insoluble solid'),
        bi(
          'Зураг 12.8-ийн 4 алхам: халаасан хүчилд хатуу бодисыг илүүдэлтэй нэмэх; шүүх; талсжих цэг хүртэл ууршуулах; хөргөж, шүүж, бага хэмжээний хүйтэн нэрмэл усаар угааж, шүүлтүүрийн цаасны дунд хатаах. Хамтдаа: зэс(II)-ын сульфат гаргах.',
          'The 4 steps of Figure 12.8: add the solid in excess to warm acid; filter; evaporate to the crystallisation point; cool, filter, wash with a little cold distilled water and dry between filter papers. Together: making copper(II) sulfate.'
        ),
        bi('4 алхмын картыг хостойгоо дараалуулна; зэс металлыг яагаад хэрэглэж болохгүйг ярилцана.', 'Put the 4 step cards in order with a partner; discuss why copper metal cannot be used.'),
        bi('H₂SO₄ + CuO (эсвэл CuCO₃); бүх хүчил урвалдана; хатуу бодис үлдэнэ; талст устай талст гаргахын тулд хуурай болтол ууршуулахгүй.', 'H₂SO₄ + CuO (or CuCO₃); so all the acid reacts; solid remains; not to dryness, so that hydrated crystals form.')
      ],
      [
        bi('B арга: титрлэлт; hinge; (E) тунадасжуулалт', 'Method B: titration; hinge; (E) precipitation'),
        bi(
          'Зураг 12.11: пипеткээр шүлт, индикатор, бюреткаас хүчил төгсгөлийн цэг хүртэл; индикаторгүй давтаж, ууршуулна. Hinge 1: натрийн сульфат бэлтгэх хамгийн сайн арга. (E) Тунадасжуулалт: BaCl₂ + Na₂SO₄ → BaSO₄(s) + 2NaCl; шүүх, угаах, хатаах.',
          'Figure 12.11: pipette the alkali, add indicator, add acid from a burette to the end-point; repeat without indicator, then evaporate. Hinge 1: the best method for sodium sulfate. (E) Precipitation: BaCl₂ + Na₂SO₄ → BaSO₄(s) + 2NaCl; filter, wash, dry.'
        ),
        bi('Төгсгөлийн цэгийн өнгийг таамаглана; ABCD хуруугаар санал өгнө; "Ba²⁺", "SO₄²⁻" сурагчид хосолж сууна.', 'Predict the colour at the end-point; vote with ABCD fingers; "Ba²⁺" and "SO₄²⁻" students pair up and sit down.'),
        bi('Hinge: B (H₂SO₄-ийг NaOH-оор титрлэх); Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s).', 'Hinge: B (titrate sulfuric acid with sodium hydroxide); Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s).')
      ]
    ]),
    [
      exitItem(
        bi('Хар тугалга(II)-ын хлорид уусдаг уу?', 'Is lead(II) chloride soluble or insoluble?'),
        [bi('Уусдаг', 'Soluble'), bi('Уусдаггүй', 'Insoluble'), bi('Зөвхөн халуун усанд', 'Only in hot water'), bi('Зөвхөн хүчилд', 'Only in acid')],
        1,
        bi('Хлорид ихэнх нь уусдаг, гэхдээ AgCl ба PbCl₂ үл хамаарна.', 'Most chlorides are soluble, but AgCl and PbCl₂ are exceptions.')
      ),
      exitItem(
        bi('A аргад хатуу бодисыг яагаад илүүдэлтэй хэрэглэдэг вэ?', 'Why is the solid added in excess in Method A?'),
        [
          bi('Бүх хүчлийг урвалдуулахын тулд', 'To make sure all the acid has reacted'),
          bi('Талстыг томруулахын тулд', 'To make bigger crystals'),
          bi('Уусмалыг халаахын тулд', 'To heat the solution'),
          bi('Индикатор хэрэггүй болгохын тулд', 'So no indicator is needed')
        ],
        0,
        bi('Илүүдлийг шүүж авна; уусмалд зөвхөн давс үлдэнэ.', 'The excess is filtered off, leaving only the salt in solution.')
      ),
      exitItem(
        bi('Натрийн сульфат бэлтгэх хамгийн сайн арга аль нь вэ?', 'Which method is best for preparing sodium sulfate?'),
        [
          bi('Хүхрийн хүчил + илүүдэл натри, шүүх', 'Sulfuric acid + excess sodium, then filter'),
          bi('Хүхрийн хүчлийг натрийн гидроксидын уусмалаар титрлэх', 'Titration of sulfuric acid with sodium hydroxide solution'),
          bi('Барийн сульфатыг натрийн хлоридтой холих', 'Mixing barium sulfate with sodium chloride'),
          bi('Хүхрийн хүчил + илүүдэл натрийн хлорид, шүүх', 'Sulfuric acid + excess sodium chloride, then filter')
        ],
        1,
        bi('NaOH уусдаг тул илүүдлийг шүүж болохгүй; натри аюултай идэвхтэй.', 'NaOH is soluble, so excess cannot be filtered off; sodium reacts dangerously.')
      ),
      exitItem(
        bi('Уусмалыг яагаад хуурай болтол ууршуулдаггүй вэ?', 'Why is the solution not evaporated to dryness?'),
        [
          bi('Талст устай талст гаргахын тулд – хуурай болгоход талст ус алдагдана', 'To obtain hydrated crystals – heating to dryness removes the water of crystallisation'),
          bi('Хүчлийг хадгалахын тулд', 'To keep the acid'),
          bi('Илүүдлийг уусгахын тулд', 'To dissolve the excess'),
          bi('Хурдан ууршуулахын тулд', 'To evaporate faster')
        ],
        0,
        bi('Талсжих цэг хүртэл халааж, дараа нь хөргөж талсжуулна.', 'Heat to the crystallisation point, then leave to cool and crystallise.')
      )
    ],
    ID
  ),
  lesson(
    4,
    bi('(E) Тунадасжуулалт, арга сонгох ба шалгалт', '(E) Precipitation, choosing a method and exam practice'),
    bi(
      '(E) Уусдаггүй давсыг тунадасжуулалтаар бэлтгэх; (E) өгсөн давсыг бэлтгэх тохиромжтой аргыг сонгох; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх.',
      '(E) Prepare insoluble salts by precipitation; (E) choose a suitable method to prepare a given salt; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('(E) Уусдаггүй давс: түүний ионыг агуулсан хоёр уусмалыг холих → тунадасыг шүүх, нэрмэл усаар угаах, хатаах (ууршуулахгүй).', '(E) Insoluble salt: mix two solutions containing its ions → filter the precipitate, wash with distilled water and dry (do not evaporate).'),
      bi('Арга сонгох: давс уусдаггүй → (E) тунадасжуулалт; уусдаг ба урвалж уусдаггүй → илүүдэл хатуу бодис; уусдаг ба суурь уусдаг (Na, K, NH₄) → титрлэлт.', 'Choosing: insoluble salt → (E) precipitation; soluble salt from an insoluble reactant → excess solid; soluble salt from a soluble base (Na, K, NH₄) → titration.'),
      bi('Маш идэвхтэй (Na, K) эсвэл идэвх муутай (Cu, Ag) металлыг хүчилтэй хэрэглэхгүй.', 'Never use very reactive metals (Na, K) or unreactive metals (Cu, Ag) with acids.')
    ],
    lessonSteps([
      [
        bi('(E) Хамтдаа: тунадасжуулалт; судлах', '(E) We do: precipitation; explore'),
        bi('Хар тугалга(II)-ын иодид (Зураг 12.16): ямар хоёр уусмал, ионы тэгшитгэл, өнгө, яагаад нэрмэл усаар угаах. Судлах: хоёр тунгалаг уусмалаас уусдаггүй давс үүсэхэд юу харагдах вэ (PhET Concentration, титрлэлтийн лаб).', 'Lead(II) iodide (Figure 12.16): which two solutions, the ionic equation, the colour, why it is washed with distilled water. Explore: what is seen when two clear solutions make an insoluble salt (PhET Concentration, the titration lab).'),
        bi('Нэг нь ионыг хэлж, нөгөө нь томьёог бичнэ; таамаглалаа самбартаа бичнэ.', 'One partner says the ions and the other writes the formula; write predictions on boards.'),
        bi('Pb(NO₃)₂ ба KI; Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s); шар; уусдаг хольцыг (KNO₃) угааж зайлуулна.', 'Pb(NO₃)₂ and KI; Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s); yellow; to remove soluble impurities (KNO₃).')
      ],
      [
        bi('Арга сонгох ба бие даан', 'Choosing a method and you do'),
        bi('Зураг 12.7-ийн урсгал схем: давс уусдаг уу → урвалж уусдаг уу → арга. Бие даан: цайрын сульфат, калийн нитрат, (E) мөнгөний хлорид, магнийн хлорид.', 'The Figure 12.7 flow chart: is the salt soluble → is the reactant soluble → method. You do: zinc sulfate, potassium nitrate, (E) silver chloride, magnesium chloride.'),
        bi('ZnSO₄, KCl, AgCl-д аргыг хосоороо уралдан шийдээд, 3 минут бие даан бичнэ.', 'Race in pairs to decide the method for ZnSO₄, KCl and AgCl; then write alone for 3 minutes.'),
        bi('Илүүдэл Zn/ZnO + H₂SO₄; KOH + HNO₃ титрлэлт; AgNO₃ + NaCl тунадас; илүүдэл MgO + HCl.', 'Excess Zn/ZnO + H₂SO₄; KOH + HNO₃ by titration; AgNO₃ + NaCl precipitation; excess MgO + HCl.')
      ],
      [
        bi('(E) Hinge 2', '(E) Hinge 2'),
        bi('Аль хос уусмал кальцийн сульфатын тунадас өгөх вэ? Буруу сонголт бүрийг уусах дүрмээр тайлбарлана.', 'Which pair of solutions gives a precipitate of calcium sulfate? Explain each wrong option with the solubility rules.'),
        bi('ABCD картаа цээжиндээ барьж 3-2-1-д үзүүлнэ.', 'Hold ABCD cards to the chest and show on 3-2-1.'),
        bi('B – кальцийн нитрат + натрийн сульфат; CaCO₃ ба BaSO₄ уусдаггүй.', 'B – calcium nitrate + sodium sulfate; CaCO₃ and BaSO₄ are insoluble.')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi(
          '(a) MgO ба шингэрүүлсэн H₂SO₄-оос цэвэр, хуурай MgSO₄ [4]; (b) талст ус; (c) (E) барийн карбонат гаргах хоёр уусмал. 4 шалгалтын зөвлөмж. Үнэлэх: хар тугалгыг хүхрийн хүчилд хийж PbSO₄ гаргах. Алдаа засах: яагаад зөвхөн талст үүсэх хүртэл халаадаг вэ.',
          '(a) pure, dry MgSO₄ crystals from MgO and dilute H₂SO₄ [4]; (b) water of crystallisation; (c) (E) two solutions that make barium carbonate. The 4 exam tips. Evaluate: making PbSO₄ by adding lead to sulfuric acid. Error clinic: why heat only until crystals start to form.'
        ),
        bi('5 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 5 minutes, swap and tick each marking point; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('Илүүдэл MgO, шүүх, талсжих цэг, хөргөж хатаах; PbSO₄ уусдаггүй – Pb(NO₃)₂ + уусдаг сульфатаар тунадасжуулах.', 'Excess MgO, filter, crystallisation point, cool and dry; PbSO₄ is insoluble – precipitate it from Pb(NO₃)₂ + a soluble sulfate.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: PbCl₂, илүүдэл хатуу бодис, NaCl-ийн арга, (E) AgCl-ийн ионы тэгшитгэл. Зорилгод дахин fist to five.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: PbCl₂, excess solid, the method for NaCl, (E) the ionic equation for AgCl. Fist to five on the objectives again.'),
        bi('Гарах билетийг 4 минутад ганцаараа чимээгүй бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone and in silence in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('Уусдаггүй; бүх хүчил урвалдана; титрлэлт (NaOH + HCl); Ag⁺(aq) + Cl⁻(aq) → AgCl(s).', 'Insoluble; so all the acid reacts; titration (NaOH + HCl); Ag⁺(aq) + Cl⁻(aq) → AgCl(s).')
      ]
    ]),
    [
      exitItem(
        bi('(E) Аль хос уусмал кальцийн сульфатын тунадас өгөх вэ?', '(E) Which pair of solutions gives a precipitate of calcium sulfate?'),
        [
          bi('Кальцийн карбонат + хүхрийн хүчил', 'Calcium carbonate + sulfuric acid'),
          bi('Кальцийн нитрат + натрийн сульфат', 'Calcium nitrate + sodium sulfate'),
          bi('Кальцийн хлорид + барийн сульфат', 'Calcium chloride + barium sulfate'),
          bi('Кальци + зэс(II)-ын сульфат', 'Calcium + copper(II) sulfate')
        ],
        1,
        bi('Хоёулаа уусдаг; Ca²⁺ + SO₄²⁻ → CaSO₄(s).', 'Both are soluble; Ca²⁺ + SO₄²⁻ → CaSO₄(s).')
      ),
      exitItem(
        bi('Натрийн хлорид бэлтгэхэд аль аргыг хэрэглэх вэ?', 'Which method is used for sodium chloride?'),
        [
          bi('Илүүдэл натри + HCl', 'Excess sodium + HCl'),
          bi('Титрлэлт (NaOH + HCl)', 'Titration (NaOH + HCl)'),
          bi('Тунадасжуулалт', 'Precipitation'),
          bi('Илүүдэл NaCl + HCl', 'Excess NaCl + HCl')
        ],
        1,
        bi('Натри хэт идэвхтэй; NaOH уусдаг тул титрлэлт.', 'Sodium is too reactive; NaOH is soluble, so use titration.')
      ),
      exitItem(
        bi('(E) Мөнгөний хлоридын тунадасжилтын ионы тэгшитгэл аль нь вэ?', '(E) What is the ionic equation for the precipitation of silver chloride?'),
        [
          bi('Ag⁺(aq) + Cl⁻(aq) → AgCl(s)', 'Ag⁺(aq) + Cl⁻(aq) → AgCl(s)'),
          bi('Ag(s) + Cl₂(g) → AgCl(s)', 'Ag(s) + Cl₂(g) → AgCl(s)'),
          bi('AgNO₃ + NaCl → AgCl + NaNO₃', 'AgNO₃ + NaCl → AgCl + NaNO₃'),
          bi('Ag⁺(aq) + Cl⁻(aq) → AgCl(aq)', 'Ag⁺(aq) + Cl⁻(aq) → AgCl(aq)')
        ],
        0,
        bi('AgCl уусдаггүй тул (s); Na⁺ ба NO₃⁻ хөндлөнгийн ион.', 'AgCl is insoluble, so (s); Na⁺ and NO₃⁻ are spectator ions.')
      ),
      exitItem(
        bi('(E) Хар тугалга(II)-ын сульфатыг хэрхэн бэлтгэх вэ?', '(E) How should pure dry lead(II) sulfate be made?'),
        [
          bi('Хар тугалгыг хүхрийн хүчилд хийж, шүүж, талсжуулах', 'Add lead to sulfuric acid, filter and crystallise'),
          bi('Pb(NO₃)₂ ба уусдаг сульфатын уусмалыг холих, шүүх, угаах, хатаах', 'Mix Pb(NO₃)₂ with a soluble sulfate solution, filter, wash and dry'),
          bi('Титрлэлт', 'Titration'),
          bi('PbSO₄-ийг усанд уусгаж ууршуулах', 'Dissolve PbSO₄ in water and evaporate')
        ],
        1,
        bi('PbSO₄ уусдаггүй тул талсжуулж болохгүй – тунадасжуулалт.', 'PbSO₄ is insoluble, so it cannot be crystallised – use precipitation.')
      )
    ],
    ID
  )
];

export const IG7_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'ig7-3': [
    term(bi('давс', 'salt'), bi('Хүчлийн H⁺-ийг металл эсвэл аммонийн ионоор орлуулахад үүсэх ионы нэгдэл.', 'An ionic compound formed when the H⁺ of an acid is replaced by a metal ion or ammonium ion.')),
    term(bi('уусдаг / уусдаггүй', 'soluble / insoluble'), bi('Усанд уусна / уусахгүй.', 'Dissolves / does not dissolve in water.')),
    term(bi('талст устай бодис', 'hydrated substance'), bi('Устай химийн холбоотой бодис.', 'A substance that is chemically combined with water.')),
    term(bi('усгүй бодис', 'anhydrous substance'), bi('Ус агуулаагүй бодис.', 'A substance containing no water.')),
    term(bi('талст ус', 'water of crystallisation'), bi('Талст устай бодисын талстад байгаа усны молекулууд.', 'The water molecules present in the crystals of a hydrated substance.'))
  ],
  'ig7-4': [
    term(bi('тунадасжуулалт (E)', 'precipitation (E)'), bi('Хоёр уусмалыг холиход уусдаггүй хатуу бодис үүсэх.', 'Forming an insoluble solid when two solutions are mixed.'))
  ]
};

export const IG7_PRACTICE_B: Record<string, PracticeItem[]> = {
  'ig7-3': [
    easy(
      bi('Аль давс уусдаггүй вэ?', 'Which salt is insoluble?'),
      [bi('Калийн карбонат', 'Potassium carbonate'), bi('Зэс(II)-ын нитрат', 'Copper(II) nitrate'), bi('Барийн сульфат', 'Barium sulfate'), bi('Натрийн хлорид', 'Sodium chloride')],
      2,
      bi('BaSO₄ нь сульфатын үл хамаарах тохиолдол; K давс, нитрат бүгд уусдаг.', 'BaSO₄ is an exception for sulfates; potassium salts and nitrates are all soluble.')
    ),
    easy(
      bi('CuSO₄·5H₂O-ийн Mr хэд вэ? (Cu = 64, S = 32, O = 16, H = 1)', 'What is the Mr of CuSO₄·5H₂O? (Cu = 64, S = 32, O = 16, H = 1)'),
      [bi('160', '160'), bi('178', '178'), bi('250', '250'), bi('255', '255')],
      2,
      bi('64 + 32 + 4(16) + 5(18) = 250; 5 + 18 биш 5 × 18.', '64 + 32 + 4(16) + 5(18) = 250; it is 5 × 18, not 5 + 18.')
    ),
    hard(
      bi('Магнийн исэл ба шингэрүүлсэн хүхрийн хүчлээс цэвэр, хуурай магнийн сульфатын талстыг хэрхэн гаргахыг тайлбарла. [4]', 'Describe how to make pure, dry crystals of magnesium sulfate from magnesium oxide and dilute sulfuric acid. [4]'),
      bi('Халаасан хүчилд MgO-г илүүдэлтэй нэмэх [1]; илүүдлийг шүүж зайлуулах [1]; шүүгдсэн уусмалыг талсжих цэг хүртэл халааж зарим усыг ууршуулах [1]; хөргөж, талстыг шүүж, шүүлтүүрийн цаасны дунд хатаах [1].', 'Add excess MgO to (warm) acid [1]; filter to remove the excess [1]; heat the filtrate to the crystallisation point / evaporate some water [1]; cool, filter off the crystals and dry between filter papers [1].'),
      bi('"Хуурай болтол ууршуулах" гэвэл оноо алдана.', '"Evaporate to dryness" loses the mark.')
    )
  ],
  'ig7-4': [
    easy(
      bi('(E) Хар тугалга(II)-ын иодидын тунадас ямар өнгөтэй вэ?', '(E) What colour is the lead(II) iodide precipitate?'),
      [bi('Цагаан', 'White'), bi('Шар', 'Yellow'), bi('Цэнхэр', 'Blue'), bi('Хар', 'Black')],
      1,
      bi('Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s), шар тунадас.', 'Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s), a yellow precipitate.')
    ),
    easy(
      bi('Цайрын сульфат бэлтгэх тохиромжтой арга аль нь вэ?', 'Which is a suitable method for zinc sulfate?'),
      [
        bi('Илүүдэл цайр (эсвэл ZnO, ZnCO₃) + хүхрийн хүчил; шүүх; талсжуулах', 'Excess zinc (or ZnO/ZnCO₃) + sulfuric acid; filter; crystallise'),
        bi('Тунадасжуулалт', 'Precipitation'),
        bi('Зэс + хүхрийн хүчил', 'Copper + sulfuric acid'),
        bi('Хуурай болтол ууршуулах', 'Evaporate to dryness')
      ],
      0,
      bi('ZnSO₄ уусдаг, урвалж уусдаггүй тул A арга.', 'ZnSO₄ is soluble and the reactant is insoluble, so use Method A.')
    ),
    hard(
      bi('(E) Барийн карбонат гаргахын тулд холих хоёр уусмалыг нэрлэж, ионы тэгшитгэлийг бич.', '(E) Name two solutions that could be mixed to make barium carbonate and write the ionic equation.'),
      bi('Барийн нитрат эсвэл хлорид [1] ба натри эсвэл калийн карбонат [1]; Ba²⁺(aq) + CO₃²⁻(aq) → BaCO₃(s).', 'Barium nitrate or chloride [1] and sodium or potassium carbonate [1]; Ba²⁺(aq) + CO₃²⁻(aq) → BaCO₃(s).'),
      bi('Хоёр урвалж уусдаг байх ёстой; тунадасыг шүүж, угааж, хатаана.', 'Both reactants must be soluble; filter, wash and dry the precipitate.')
    )
  ]
};
