// IGCSE 0620 chapter 4 (electrochemistry), lessons 1–3. They follow the deck Ch06_Electrochemistry.pptx and the three
// 60-minute lessons its notes plan (slides 1–11, 12–19, 20–25), with the review slides 26–33.
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig4';

export const IG4_LESSONS: StatesLesson[] = [
  lesson(
    1,
    bi('Цахилгаан дамжуулалт ба хайлмал электролиз', 'Conductivity and molten electrolysis'),
    bi(
      'Металл ба графитыг дамжуулагч, металл бусыг тусгаарлагч гэж тайлбарлах; электролизийг тодорхойлж анод, катод, электролитийг таних; хайлмал хар тугалга(II)-ын бромидын бүтээгдэхүүн, ажиглалтыг тайлбарлаж бусад хайлмал бинар нэгдлийнхийг таамаглах; (E) цэнэг шилжилт ба хагас тэгшитгэл.',
      'Describe metals and graphite as conductors and non-metals as insulators; define electrolysis and identify the anode, cathode and electrolyte; describe the products and observations for molten lead(II) bromide and predict them for other molten binary compounds; (E) charge transfer and half-equations.'
    ),
    [
      bi('Электролиз = хайлмал эсвэл усан уусмал дахь ионы нэгдлийг цахилгаан гүйдлээр задлах. Анод (+) руу анион, катод (−) руу катион хөдөлнө.', 'Electrolysis = the decomposition of an ionic compound, molten or in aqueous solution, by an electric current. Anions move to the anode (+), cations to the cathode (−).'),
      bi('Металлын дамжуулалт: электрон урсана, химийн өөрчлөлтгүй. Электролитийн дамжуулалт: ион хөдөлнө, зөвхөн хайлмал эсвэл уусмал үед, нэгдэл задарна.', 'Metallic conductivity: electrons flow, no chemical change. Electrolytic conductivity: ions move, only when molten or in aqueous solution, and the compound is decomposed.'),
      bi('Хайлмал бинар нэгдэл: металл катод дээр, металл бус анод дээр. (E) Pb²⁺ + 2e⁻ → Pb (бууралт); 2Br⁻ → Br₂ + 2e⁻ (исэлдэлт).', 'Molten binary compound: metal at the cathode, non-metal at the anode. (E) Pb²⁺ + 2e⁻ → Pb (reduction); 2Br⁻ → Br₂ + 2e⁻ (oxidation).')
    ],
    lessonSteps(
      [
        [
          bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
          bi(
            'Том асуулт: цахилгаан нэгдлийг хэрхэн задалдаг, химийн урвал хэрхэн цахилгаан гаргадаг вэ? Устөрөгчийн түлшний автобус; гурван асуулт (утсанд аль металл, яагаад хуванцар бүрээс, шингэн металл дамжуулах уу). "Санал нийлэх үү?" гурван өгүүлбэр ба төлөвлөгөө.',
            'Big question: how can electricity break a compound apart, and how can a reaction make electricity? The hydrogen fuel-cell bus; three questions (which metal in wiring, why the plastic coating, do liquid metals conduct). Three "Agree or disagree?" statements and the plan.'
          ),
          bi('Хосоороо 60 секунд ярилцаж, эрхий хуруугаар санал өгнө.', 'Turn and talk for 60 s and vote with thumbs.'),
          bi('Зэс; хуванцар тусгаарлагч; тийм (мөнгөн ус), мөн хайлмал эсвэл ууссан ионы нэгдэл.', 'Copper; plastic is an insulator; yes (mercury), and molten or dissolved ionic compounds.')
        ],
        [
          bi('Түлхүүр үг, шалгуур, давталт', 'Key words, success criteria and retrieval'),
          bi(
            'Электролизийн тодорхойлолтыг чангаар уншуулж, түлхүүр үгс ба амжилтын шалгуурт fist to five. Давталт: хатуу NaCl, зэс утас, Mg ба Br-ийн ион, графит ба алмаз, PbBr₂-ийн томьёо. Бүтэц → дамжуулалт хүснэгт (зэс, графит, алмаз, NaCl, сахар).',
            'Read the definition of electrolysis aloud; key words and fist to five on the success criteria. Retrieval: solid NaCl, copper wire, the ions of Mg and Br, graphite vs diamond, the formula of PbBr₂. The structure → conductivity table (copper, graphite, diamond, NaCl, sugar).'
          ),
          bi('Тэмдэглэлгүй самбартаа бичээд өргөнө; хүснэгтийн мөр бүрийг таамаглана.', 'Write on show-me boards with no notes; predict each row of the table.'),
          bi('Ион тогтсон; чөлөөт электрон; Mg²⁺, Br⁻; PbBr₂; электрон урсвал химийн өөрчлөлтгүй, ион хөдөлбөл нэгдэл задарна.', 'Ions fixed; free electrons; Mg²⁺ and Br⁻; PbBr₂; electrons flowing → no chemical change, ions moving → the compound is decomposed.')
        ],
        [
          bi('Хоёр төрлийн дамжуулалт ба электролизийн эс', 'Two types of conductivity and the electrolytic cell'),
          bi(
            'Металлын ба электролитийн дамжуулалтыг харьцуулна (Зураг 6.4). Зураг 6.5: зэс(II)-ын хроматын эс – цэнхэр Cu²⁺ катод руу, шар CrO₄²⁻ анод руу. Дараа нь 8 бодисыг электролит / электролит бус / дамжуулагч гэж ангилна.',
            'Compare metallic and electrolytic conductivity (Figure 6.4). Figure 6.5: the copper(II) chromate(VI) cell – blue Cu²⁺ moves to the cathode, yellow CrO₄²⁻ to the anode. Then sort 8 substances as electrolyte, non-electrolyte or conductor.'
          ),
          bi('Эсийн 5 асуултад хариулж, 8 бодисыг самбартаа E / N / C гэж ангилна (90 сек).', 'Answer the 5 questions on the cell, then sort the 8 substances as E / N / C on boards (90 s).'),
          bi('Мөнгөн ус – дамжуулагч, электролит биш; нэрмэл ус – электролит бус; хатуу KBr – ион тогтсон тул хайлуулах эсвэл уусгах.', 'Mercury – conductor, not an electrolyte; distilled water – non-electrolyte; solid KBr – ions fixed, so melt it or dissolve it.')
        ],
        [
          bi('Хайлмал PbBr₂ ба (E) хагас тэгшитгэл', 'Molten PbBr₂ and (E) half-equations'),
          bi(
            'Виртуал лаб: хайлмал PbBr₂-ийг "Switch on" – катод доор саарал шингэн хар тугалга, анод дээр улаан хүрэн бромын уур. (E) Хагас тэгшитгэлийг 5 алхмаар, цэнэг шилжилтийн 3 үе шат. Шалгалтын зөвлөмж: 2Br⁻ → Br₂ + 2e⁻.',
            'Virtual lab: switch on molten PbBr₂ – grey liquid lead below the cathode, red-brown bromine vapour at the anode. (E) The half-equations in 5 steps and the 3 stages of charge transfer. Exam tip: 2Br⁻ → Br₂ + 2e⁻.'
          ),
          bi('Бүтээгдэхүүнийг таамаглаад ажиглалттай харьцуулна; PbBr₂-ийг яагаад халаах ёстойг тайлбарлана.', 'Predict the products and compare with what they see; explain why PbBr₂ must be heated.'),
          bi('Катод: Pb; анод: Br₂; хатуу PbBr₂ дамжуулахгүй – ион хөдлөх ёстой.', 'Cathode: Pb; anode: Br₂; solid PbBr₂ does not conduct – the ions must be free to move.')
        ],
        [
          bi('Таамаглах: хайлмал бинар нэгдэл', 'Predict: molten binary compounds'),
          bi('NaCl-ийг хамт, KI, CuBr₂, ZnCl₂, Al₂O₃-ийг бие даан. Core: бүтээгдэхүүн; Extended: хоёр хагас тэгшитгэл.', 'NaCl together, then KI, CuBr₂, ZnCl₂ and Al₂O₃ alone. Core: the products; Extended: both half-equations.'),
          bi('Мөр бүрийн дараа самбар өргөөд шалгана.', 'Show boards after each row, then check.'),
          bi('K/I₂, Cu/Br₂, Zn/Cl₂, Al/O₂; (E) Al³⁺ + 3e⁻ → Al, 2O²⁻ → O₂ + 4e⁻.', 'K/I₂, Cu/Br₂, Zn/Cl₂, Al/O₂; (E) Al³⁺ + 3e⁻ → Al, 2O²⁻ → O₂ + 4e⁻.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Хайлмал хар тугалга(II)-ын бромидыг электролиз хийхэд анод дээр юу ажиглагдах вэ?', 'What is seen at the anode when molten lead(II) bromide is electrolysed?'),
        [
          bi('Саарал шингэн хар тугалга', 'Grey liquid lead'),
          bi('Улаан хүрэн уур (бром)', 'Red-brown vapour (bromine)'),
          bi('Өнгөгүй хийн бөмбөлөг', 'Colourless gas bubbles'),
          bi('Ягаан хүрэн хатуу бодис', 'A pink-brown solid')
        ],
        1,
        bi('Br⁻ анод руу хөдөлж бром болно; хар тугалга катод доор цуглана.', 'Br⁻ moves to the anode and forms bromine; lead collects below the cathode.')
      ),
      exitItem(
        bi('Аль нь дамжуулагч боловч электролит БИШ вэ?', 'Which is a conductor but NOT an electrolyte?'),
        [bi('Шингэрүүлсэн хүхрийн хүчил', 'Dilute sulfuric acid'), bi('Хайлмал PbBr₂', 'Molten PbBr₂'), bi('Мөнгөн ус', 'Mercury'), bi('NaCl-ийн уусмал', 'Sodium chloride solution')],
        2,
        bi('Мөнгөн усанд электрон урсдаг, задрахгүй.', 'In mercury electrons flow and nothing is decomposed.')
      ),
      exitItem(
        bi('Хайлмал цайрын хлоридыг электролиз хийхэд бүтээгдэхүүн юу вэ?', 'What are the products when molten zinc chloride is electrolysed?'),
        [
          bi('Катод: цайр; анод: хлор', 'Cathode: zinc; anode: chlorine'),
          bi('Катод: хлор; анод: цайр', 'Cathode: chlorine; anode: zinc'),
          bi('Катод: устөрөгч; анод: хлор', 'Cathode: hydrogen; anode: chlorine'),
          bi('Катод: цайр; анод: хүчилтөрөгч', 'Cathode: zinc; anode: oxygen')
        ],
        0,
        bi('Хайлмал бинар нэгдэл: металл катод дээр, металл бус анод дээр.', 'Molten binary compound: metal at the cathode, non-metal at the anode.')
      ),
      exitItem(
        bi('(E) Хайлмал PbBr₂-ийн анодын хагас тэгшитгэл аль нь зөв бэ?', '(E) Which is the correct half-equation at the anode for molten PbBr₂?'),
        [bi('2Br⁻ + 2e⁻ → Br₂', '2Br⁻ + 2e⁻ → Br₂'), bi('Br⁻ → Br + e⁻', 'Br⁻ → Br + e⁻'), bi('2Br⁻ → Br₂ + 2e⁻', '2Br⁻ → Br₂ + 2e⁻'), bi('Pb²⁺ + 2e⁻ → Pb', 'Pb²⁺ + 2e⁻ → Pb')],
        2,
        bi('Анод дээр электрон алдагдана (исэлдэлт), тиймээс баруун талд; бром хоёр атомт Br₂.', 'Electrons are lost at the anode (oxidation), so they go on the right; bromine is diatomic, Br₂.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Уусмалын электролиз, CuSO₄ ба цахилгаан бүрэх', 'Electrolysis of solutions, CuSO₄ and electroplating'),
    bi(
      'Өтгөн NaCl уусмал ба шингэрүүлсэн H₂SO₄-ийн электролизийг (идэвхгүй электрод) тайлбарлах; (E) шингэрүүлсэн ба өтгөн галогенид уусмалын бүтээгдэхүүнийг таамаглах; (E) CuSO₄(aq)-ийг графит ба зэс электродоор; металлыг хэрхэн, яагаад бүрдгийг тайлбарлах.',
      'Describe the electrolysis of concentrated aqueous sodium chloride and dilute sulfuric acid (inert electrodes); (E) predict the products for dilute and concentrated halide solutions; (E) aqueous copper(II) sulfate with graphite or copper electrodes; describe how and why metals are electroplated.'
    ),
    [
      bi('Катод: устөрөгчөөс идэвх багатай металл (Cu, Ag) ялгарна; идэвх ихтэй (K … Fe) бол устөрөгч: 2H⁺ + 2e⁻ → H₂.', 'Cathode: a metal less reactive than hydrogen (Cu, Ag) is deposited; if it is more reactive (K … Fe), hydrogen forms: 2H⁺ + 2e⁻ → H₂.'),
      bi('Анод: өтгөн галогенид → галоген (2Cl⁻ → Cl₂ + 2e⁻); шингэрүүлсэн галогенид, сульфат, нитрат → OH⁻-оос хүчилтөрөгч (4OH⁻ → 2H₂O + O₂ + 4e⁻).', 'Anode: concentrated halide → the halogen (2Cl⁻ → Cl₂ + 2e⁻); dilute halide, sulfate or nitrate → oxygen from OH⁻ (4OH⁻ → 2H₂O + O₂ + 4e⁻).'),
      bi('Бүрэх: бүрэх зүйл = катод (−), бүрэх металл = анод (+), электролит = тэр металлын давсны уусмал; гадаад үзэмж ба зэврэлтэд тэсвэрийг сайжруулна.', 'Electroplating: the object = cathode (−), the plating metal = anode (+), the electrolyte = a solution of a salt of that metal; it improves appearance and resistance to corrosion.')
    ],
    lessonSteps(
      [
        [
          bi('Уусмалын электролиз: аль ион ялах вэ?', 'Electrolysis of solutions: which ions win?'),
          bi('Усан дахь H⁺ ба OH⁻ давсны ионтой өрсөлднө. Катодын эгнээ (K⁺ … Ag⁺) ба анодын эгнээ (SO₄²⁻ … I⁻); Зураг 6.10: H⁺ ялгарч Na⁺ үлдэнэ.', 'The H⁺ and OH⁻ in water compete with the ions of the salt. The cathode series (K⁺ … Ag⁺) and the anode series (SO₄²⁻ … I⁻); Figure 6.10: H⁺ is discharged and Na⁺ stays.'),
          bi('Odd one out (30 сек): Cu²⁺, Na⁺, K⁺, Mg²⁺ – аль нь уусмалаас ялгарах вэ?', 'Odd one out (30 s): Cu²⁺, Na⁺, K⁺, Mg²⁺ – which is discharged from solution?'),
          bi('Cu²⁺ – зэс устөрөгчөөс идэвх багатай.', 'Cu²⁺ – copper is less reactive than hydrogen.')
        ],
        [
          bi('Давсны уусмал ба шингэрүүлсэн H₂SO₄; виртуал лаб', 'Brine and dilute sulfuric acid; virtual lab'),
          bi(
            'Хоёр баганыг алхам алхмаар: давсны уусмал – катод H₂, анод Cl₂, уусмал шүлтлэг (NaOH); H₂SO₄ – H₂ ба O₂, эзэлхүүн 2 : 1. Хийн шинжилгээ. Дараа нь виртуал лабд 4 эсийг "Run ►".',
            'Both columns step by step: brine – cathode H₂, anode Cl₂, solution becomes alkaline (NaOH); dilute H₂SO₄ – H₂ and O₂ in a 2 : 1 volume ratio. The gas tests. Then "Run ►" for the 4 cells in the virtual lab.'
          ),
          bi('Эс бүрийн бүтээгдэхүүнийг 60 секундэд самбартаа таамаглаад Run дарна.', 'Predict the products of each cell on boards in 60 s, then click Run.'),
          bi('H₂ – асаасан модонцор "пүх"; Cl₂ – чийгтэй лакмусыг цайруулна; O₂ – цог модонцорыг дахин асаана.', 'H₂ – lighted splint pops; Cl₂ – bleaches damp litmus; O₂ – relights a glowing splint.')
        ],
        [
          bi('Бүтээгдэхүүнийг нэрлэх ба судлах', 'Name the products and explore'),
          bi('(E) 6 электролит (өтгөн KBr, шингэрүүлсэн NaCl, өтгөн CuCl₂, AgNO₃, өтгөн HCl, хайлмал ZnBr₂) – катод ба анодын бүтээгдэхүүн (4 мин). Судлах: CuCl₂ уусмалд зэс аль электрод дээр үүсэх вэ (Electrolysis Virtual Lab).', '(E) 6 electrolytes (concentrated KBr, dilute NaCl, concentrated CuCl₂, AgNO₃, concentrated HCl, molten ZnBr₂) – cathode and anode products (4 min). Explore: on which electrode does copper form in CuCl₂ solution (Electrolysis Virtual Lab)?'),
          bi('Бие даан бичээд бүтээгдэхүүн бүрт 1 оноо (нийт 12) өгч өөрийгөө шалгана; хайлмалыг анхаарна.', 'Write alone and self-check, 1 mark per product (12 in all); watch out for the molten one.'),
          bi('H₂/Br₂; H₂/O₂; Cu/Cl₂; Ag/O₂; H₂/Cl₂; Zn/Br₂.', 'H₂/Br₂; H₂/O₂; Cu/Cl₂; Ag/O₂; H₂/Cl₂; Zn/Br₂.')
        ],
        [
          bi('(E) CuSO₄: графит ба зэс электрод; практик', '(E) CuSO₄: graphite vs copper electrodes; practical'),
          bi(
            'Графит: катод дээр зэс, анод дээр O₂, цэнхэр өнгө бүдгэрнэ. Зэс: катод дээр зэс, анод уусна, өнгө цэнхэр хэвээр, катодын нэмэгдсэн масс = анодын алдсан масс. Paper 6 маягаар электродыг жигнэх (2.45 → 2.83 g; 2.61 → 2.20 g).',
            'Graphite: copper at the cathode, O₂ at the anode, the blue colour fades. Copper: copper at the cathode, the anode dissolves, the solution stays blue, mass gained by the cathode = mass lost by the anode. Paper 6 style: weighing the electrodes (2.45 → 2.83 g; 2.61 → 2.20 g).'
          ),
          bi('Зэс электродтой үед яагаад анод өөрчлөгдөөд өнгө өөрчлөгдөхгүйг ярилцаж, хүснэгтийг бөглөнө.', 'Discuss why the anode changes but the colour does not with copper electrodes; complete the table.'),
          bi('+0.38 g, −0.41 g; угааж хатаана; зэс анодоос унасан; O₂ – цог модонцор.', '+0.38 g, −0.41 g; wash and dry; some copper fell off the anode; O₂ – glowing splint.')
        ],
        [
          bi('Цахилгаан бүрэх ба hinge', 'Electroplating and hinges'),
          bi(
            'Халбагыг мөнгөөр бүрэх (Зураг 6.15a): яагаад бүрэх, бүрэх 3 дүрэм. Алдаа олох: Али төмөр түлхүүрийг зэсээр бүрэх гэж буруу угсарсан. Hinge Q1: хоёр электрод дээр өнгөгүй хий; Q2 (E): шингэрүүлсэн NaCl-ийн анод.',
            'Silver-plating a spoon (Figure 6.15a): why we plate and the 3 rules. Spot the mistake: Ali sets up copper-plating an iron key wrongly. Hinge Q1: colourless gas at both electrodes; Q2 (E): the anode for dilute NaCl.'
          ),
          bi('Алигийн 3 алдааг засаж, ABCD хуруугаар санал өгнө.', 'Correct Ali’s 3 mistakes, then vote with ABCD fingers.'),
          bi('Түлхүүр – катод, анод – зэс, зэсийн давсны уусмал; Q1: B; Q2: C (хүчилтөрөгч).', 'Key = cathode, anode = copper, a copper salt solution; Q1: B; Q2: C (oxygen).')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Идэвхгүй электродоор аль электролит хоёр электрод дээр хоёуланд нь өнгөгүй хий өгөх вэ?', 'Which electrolyte gives a colourless gas at both electrodes (inert electrodes)?'),
        [bi('Өтгөн NaCl(aq)', 'Concentrated NaCl(aq)'), bi('Шингэрүүлсэн H₂SO₄', 'Dilute H₂SO₄'), bi('CuSO₄(aq)', 'CuSO₄(aq)'), bi('Хайлмал PbBr₂', 'Molten PbBr₂')],
        1,
        bi('Устөрөгч ба хүчилтөрөгч – хоёулаа өнгөгүй. NaCl(aq) анод дээр цайвар шар-ногоон хлор өгнө.', 'Hydrogen and oxygen – both colourless. NaCl(aq) gives pale yellow-green chlorine at the anode.')
      ),
      exitItem(
        bi('Өтгөн NaCl уусмалын электролизийн катод дээр юу үүсэх вэ?', 'What forms at the cathode when concentrated aqueous sodium chloride is electrolysed?'),
        [bi('Натри', 'Sodium'), bi('Устөрөгч', 'Hydrogen'), bi('Хлор', 'Chlorine'), bi('Хүчилтөрөгч', 'Oxygen')],
        1,
        bi('Натри устөрөгчөөс идэвх ихтэй тул H⁺ ялгарна; уусмал NaOH болж шүлтлэг болно.', 'Sodium is more reactive than hydrogen, so H⁺ is discharged; the solution becomes alkaline NaOH.')
      ),
      exitItem(
        bi('(E) Шингэрүүлсэн NaCl уусмалыг электролиз хийхэд анод дээр юу үүсэх вэ?', '(E) Dilute aqueous sodium chloride is electrolysed. What forms at the anode?'),
        [bi('Хлор', 'Chlorine'), bi('Устөрөгч', 'Hydrogen'), bi('Хүчилтөрөгч', 'Oxygen'), bi('Натри', 'Sodium')],
        2,
        bi('Cl⁻ хэт шингэрүүлсэн тул OH⁻ ялгарна.', 'Cl⁻ is too dilute, so OH⁻ is discharged.')
      ),
      exitItem(
        bi('(E) CuSO₄(aq)-ийг зэс электродоор электролиз хийхэд уусмалын өнгөнд юу болох вэ?', '(E) CuSO₄(aq) is electrolysed with copper electrodes. What happens to the colour of the solution?'),
        [
          bi('Цэнхэр өнгө бүдгэрнэ', 'The blue colour fades'),
          bi('Цэнхэр хэвээр үлдэнэ', 'It stays blue'),
          bi('Шар болно', 'It turns yellow'),
          bi('Өнгөгүй болно', 'It becomes colourless')
        ],
        1,
        bi('Катод дээр зарцуулсан Cu²⁺-ийг анод дээр үүссэн Cu²⁺ нөхнө.', 'The Cu²⁺ removed at the cathode is replaced by Cu²⁺ formed at the anode.')
      ),
      exitItem(
        bi('Төмөр түлхүүрийг зэсээр бүрэхэд түлхүүрийг юу болгох вэ?', 'To copper-plate an iron key, what must the key be?'),
        [bi('Анод (+)', 'The anode (+)'), bi('Катод (−)', 'The cathode (−)'), bi('Электролит', 'The electrolyte'), bi('Нүүрстөрөгчийн саваа', 'A carbon rod')],
        1,
        bi('Бүрэх зүйл катод, анод нь зэс, электролит нь зэсийн давсны уусмал.', 'The object is the cathode, the anode is copper and the electrolyte is a copper salt solution.')
      )
    ],
    ID
  ),
  lesson(
    3,
    bi('Түлшний элемент, шалгалтын дасгал ба дүгнэлт', 'Fuel cells, exam practice and review'),
    bi(
      'Устөрөгч-хүчилтөрөгчийн түлшний элемент цахилгаан гаргаж, цорын ганц бүтээгдэхүүн нь ус гэдгийг хэлэх; (E) бензин хөдөлгүүртэй харьцуулан давуу ба сул талыг тайлбарлах; шалгалтын асуулт ба алдааг засах замаар бүлгийг нэгтгэх.',
      'State that a hydrogen–oxygen fuel cell produces electricity with water as the only product; (E) describe its advantages and disadvantages compared with petrol engines; pull the chapter together through exam questions and the common mistakes.'
    ),
    [
      bi('Түлшний элемент: 2H₂(g) + O₂(g) → 2H₂O(l); устөрөгч ба хүчилтөрөгчөөс цахилгаан гаргана, цорын ганц химийн бүтээгдэхүүн нь ус.', 'Fuel cell: 2H₂(g) + O₂(g) → 2H₂O(l); hydrogen and oxygen produce electricity and water is the only chemical product.'),
      bi('(E) Давуу тал: CO₂, CO гарахгүй; илүү үр ашигтай (≈60% / ≈35%); устөрөгчийг сэргээгдэх цахилгаанаар уснаас гаргаж болно; нэг грамм тутамд илүү энерги. Сул тал: хадгалахад хэцүү, станц цөөн, ихэнхдээ байгалийн хийнээс, үнэтэй.', '(E) Advantages: no CO₂ or CO; more efficient (about 60% vs about 35%); hydrogen can be made from water with renewable electricity; more energy per gram. Disadvantages: hard to store, few filling stations, mostly made from natural gas, expensive.'),
      bi('Электрон утсаар урсана, ион электролитээр хөдөлнө; катод дээр металл эсвэл устөрөгч, анод дээр металл бус.', 'Electrons flow in the wires and ions move in the electrolyte; metal or hydrogen forms at the cathode, a non-metal at the anode.')
    ],
    lessonSteps(
      [
        [
          bi('Устөрөгч-хүчилтөрөгчийн түлшний элемент', 'Hydrogen–oxygen fuel cells'),
          bi('Түлшний элементтэй машин (Зураг 6.17b) ба 2H₂ + O₂ → 2H₂O. Core: цахилгаан, цорын ганц бүтээгдэхүүн ус. (E) Бензин хөдөлгүүртэй харьцуулсан давуу ба сул талын хүснэгт.', 'A fuel cell powering a car (Figure 6.17b) and 2H₂ + O₂ → 2H₂O. Core: electricity, with water as the only product. (E) The table of advantages and disadvantages compared with petrol engines.'),
          bi('Устөрөгчийн машин үнэхээр "тэг ялгаруулалттай" юу гэдгийг 30 секунд ярилцана.', 'Talk for 30 s about whether a hydrogen car is really "zero emission".'),
          bi('Ус л гарна; гэхдээ ихэнх устөрөгч одоо байгалийн хийнээс гардаг.', 'Only water is produced; but most hydrogen is now made from natural gas.')
        ],
        [
          bi('Оноо алдах газрууд, үнэлэх, алдаа засах', 'Where marks are lost, evaluate and the error clinic'),
          bi(
            '6 нийтлэг алдааг засуулна (chlorine ions, электролитээр электрон, NaCl(aq)-д натри, 2Br⁻ + 2e⁻, хатуу PbBr₂, зэс электродтой үед өнгө бүдгэрэх). Үнэлэх: халбагыг анод, мөнгийг катод, сахарын уусмалаар бүрэх. Алдаа засах: Br⁻ → Br + e⁻.',
            'Correct the 6 common mistakes (chlorine ions, electrons through the electrolyte, sodium from NaCl(aq), 2Br⁻ + 2e⁻, solid PbBr₂, the colour fading with copper electrodes). Evaluate: plating a spoon as the anode with silver as the cathode in sugar solution. Error clinic: Br⁻ → Br + e⁻.'
          ),
          bi('Алдаа бүрийг өөрийн үгээр тайлбарлаж, загвар өгүүлбэрээр үнэлгээ бичнэ.', 'Explain each mistake in their own words and write the evaluation with the sentence frame.'),
          bi('Халбага – катод, мөнгө – анод, Ag⁺ ионтой уусмал (мөнгөний нитрат); 2Br⁻ → Br₂ + 2e⁻.', 'Spoon = cathode, silver = anode, a solution with Ag⁺ ions (silver nitrate); 2Br⁻ → Br₂ + 2e⁻.')
        ],
        [
          bi('Шалгалтын дасгал: Paper 1/2', 'Exam practice: Paper 1/2'),
          bi('Q1: аль аяганд электролиз явагдах вэ (этанол, нэрмэл ус, NaCl(aq), мөнгөн ус); Q2: аль төхөөрөмжид түлхүүр зэсээр бүрэгдэх вэ. 90 секунд бие даан.', 'Q1: in which beaker does electrolysis take place (ethanol, distilled water, NaCl(aq), mercury); Q2: in which apparatus is the key copper-plated. 90 seconds alone.'),
          bi('Үсгээ самбартаа бичээд сонголт бүрийн тайлбарыг сонсоно.', 'Write their letter on boards and hear the reason for each option.'),
          bi('Q1: C (NaCl(aq)); Q2: A (түлхүүр – катод, зэс – анод).', 'Q1: C (NaCl(aq)); Q2: A (key = cathode, copper = anode).')
        ],
        [
          bi('Шалгалтын дасгал: Paper 3/4', 'Exam practice: Paper 3/4'),
          bi('CuSO₄(aq)-ийг графит электродоор (Coursebook Q5): масс өөрчлөлт, өнгө, эерэг электродын хагас тэгшитгэл; зэс электродоор давтахад ялгаа; цэнэг хэрхэн шилждэг (13 оноо). 8 минут бичээд онооны цэг бүрийг нэмнэ.', 'CuSO₄(aq) with graphite electrodes (Coursebook Q5): mass changes, colour, the half-equation at the positive electrode; the differences with copper electrodes; how charge is transferred (13 marks). Write for 8 minutes, then add each marking point.'),
          bi('Шалгалтын нөхцөлд бичээд өөр өнгийн үзгээр засна.', 'Write under exam conditions and mark in a different colour.'),
          bi('Катод нэмэгдэнэ, анод өөрчлөгдөхгүй; цэнхэр бүдгэрнэ; 4OH⁻ → 2H₂O + O₂ + 4e⁻.', 'Cathode gains mass, anode unchanged; the blue fades; 4OH⁻ → 2H₂O + O₂ + 4e⁻.')
        ],
        [
          bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
          bi(
            '"Юу хаана үүсэх вэ?" хүснэгт ба концепт зураглалаар нэгтгэж, эхний санал хураалт руу буцна. Гарах билет: хайлмал цайрын хлорид, бүрэх 2 шалтгаан, (E) өтгөн KBr(aq)-ийн катодын хагас тэгшитгэл. Амжилтын шалгуурт дахин fist to five.',
            'Pull it together with the "what forms where?" table and the concept map, and return to the opening vote. Exit ticket: molten zinc chloride, two reasons for electroplating, (E) the cathode half-equation for concentrated KBr(aq). Fist to five on the success criteria again.'
          ),
          bi('Гарах билетийг 3 минутад цаасан дээр бичнэ (5 оноо); 🟢🟡🔴-ээр үнэлнэ.', 'Write the exit ticket on paper in 3 minutes (5 marks); rate themselves 🟢🟡🔴.'),
          bi('Zn ба Cl₂; гадаад үзэмж ба зэврэлт; 2H⁺ + 2e⁻ → H₂.', 'Zn and Cl₂; appearance and resistance to corrosion; 2H⁺ + 2e⁻ → H₂.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Устөрөгч-хүчилтөрөгчийн түлшний элементийн цорын ганц химийн бүтээгдэхүүн юу вэ?', 'What is the only chemical product of a hydrogen–oxygen fuel cell?'),
        [bi('Нүүрстөрөгчийн давхар исэл', 'Carbon dioxide'), bi('Ус', 'Water'), bi('Устөрөгч', 'Hydrogen'), bi('Нүүрстөрөгчийн дутуу исэл', 'Carbon monoxide')],
        1,
        bi('2H₂(g) + O₂(g) → 2H₂O(l); CO₂ ба CO гарахгүй.', '2H₂(g) + O₂(g) → 2H₂O(l); no CO₂ or CO is produced.')
      ),
      exitItem(
        bi('(E) Аль нь бензин хөдөлгүүртэй харьцуулахад түлшний элементийн СУЛ тал вэ?', '(E) Which is a DISADVANTAGE of fuel cells compared with petrol engines?'),
        [
          bi('Цорын ганц бүтээгдэхүүн нь ус', 'The only product is water'),
          bi('Илүү үр ашигтай', 'They are more efficient'),
          bi('Устөрөгч хий тул хадгалахад хэцүү', 'Hydrogen is a gas, so it is hard to store'),
          bi('Нэг грамм тутамд илүү энерги ялгаруулна', 'They release more energy per gram')
        ],
        2,
        bi('Том, даралттай сав хэрэгтэй; мөн станц цөөн, үнэтэй.', 'It needs a large pressurised tank; there are also few filling stations, and it is expensive.')
      ),
      exitItem(
        bi('Электролизд электролитээр юу хөдөлдөг вэ?', 'In electrolysis, what moves through the electrolyte?'),
        [bi('Электрон', 'Electrons'), bi('Ион', 'Ions'), bi('Атом', 'Atoms'), bi('Протон', 'Protons')],
        1,
        bi('Ион электролитээр хөдөлнө; электрон гаднах утсаар урсана.', 'Ions move through the electrolyte; electrons flow through the external wires.')
      ),
      exitItem(
        bi('Аль аяганд электролиз явагдах вэ?', 'In which beaker does electrolysis take place?'),
        [bi('Этанол', 'Ethanol'), bi('Нэрмэл ус', 'Distilled water'), bi('NaCl(aq)', 'NaCl(aq)'), bi('Мөнгөн ус', 'Mercury')],
        2,
        bi('NaCl(aq)-д ион хөдөлж нэгдэл задарна; мөнгөн ус дамжуулах ч задрахгүй.', 'In NaCl(aq) ions move and the compound is decomposed; mercury conducts but is not decomposed.')
      ),
      exitItem(
        bi('(E) Өтгөн KBr уусмалын электролизийн катодын хагас тэгшитгэл аль нь вэ?', '(E) What is the cathode half-equation when concentrated aqueous potassium bromide is electrolysed?'),
        [bi('K⁺ + e⁻ → K', 'K⁺ + e⁻ → K'), bi('2H⁺ + 2e⁻ → H₂', '2H⁺ + 2e⁻ → H₂'), bi('2Br⁻ → Br₂ + 2e⁻', '2Br⁻ → Br₂ + 2e⁻'), bi('4OH⁻ → 2H₂O + O₂ + 4e⁻', '4OH⁻ → 2H₂O + O₂ + 4e⁻')],
        1,
        bi('Кали устөрөгчөөс идэвх ихтэй тул катод дээр устөрөгч үүснэ.', 'Potassium is more reactive than hydrogen, so hydrogen forms at the cathode.')
      )
    ],
    ID
  )
];

export const IG4_GLOSSARY: Record<string, GlossaryTerm[]> = {
  'ig4-1': [
    term(bi('электролиз', 'electrolysis'), bi('Хайлмал эсвэл усан уусмал дахь ионы нэгдлийг цахилгаан гүйдлээр задлах.', 'The decomposition of an ionic compound, when molten or in aqueous solution, by the passage of an electric current.')),
    term(bi('электролит', 'electrolyte'), bi('Электролизд задрах хайлмал эсвэл усан уусмал бодис (хөдөлж чадах ионтой).', 'The molten or aqueous substance that undergoes electrolysis (contains ions that can move).')),
    term(bi('электрод', 'electrode'), bi('Гүйдэл электролит руу орж, гарах саваа (эсвэл хавтан).', 'A rod (or plate) where the current enters or leaves the electrolyte.')),
    term(bi('анод', 'anode'), bi('Эерэг электрод – анион энд хөдөлнө.', 'The positive electrode – anions move here.')),
    term(bi('катод', 'cathode'), bi('Сөрөг электрод – катион энд хөдөлнө.', 'The negative electrode – cations move here.')),
    term(bi('исэлдэлт / бууралт (E)', 'oxidation / reduction (E)'), bi('Электрон алдах / авах (OIL RIG) – исэлдэлт анод дээр, бууралт катод дээр.', 'Loss / gain of electrons (OIL RIG) – oxidation at the anode, reduction at the cathode.')),
    term(bi('хагас тэгшитгэл (E)', 'half-equation (E)'), bi('Нэг электрод дээрх урвалын ионы тэгшитгэл, жишээ нь Pb²⁺ + 2e⁻ → Pb.', 'The ionic equation for the reaction at one electrode, e.g. Pb²⁺ + 2e⁻ → Pb.')),
    term(bi('тусгаарлагч', 'insulator'), bi('Цахилгаан дамжуулахгүй бодис, жишээ нь хуванцар, алмаз, хүхэр.', 'A substance that does not conduct electricity, e.g. plastic, diamond, sulfur.'))
  ],
  'ig4-2': [
    term(bi('идэвхгүй электрод', 'inert electrode'), bi('Электролит болон бүтээгдэхүүнтэй урвалд ордоггүй электрод, жишээ нь графит (нүүрстөрөгч), платин.', 'An electrode that does not react with the electrolyte or products, e.g. graphite (carbon), platinum.')),
    term(bi('катион / анион', 'cation / anion'), bi('Эерэг ион (→ катод) / сөрөг ион (→ анод).', 'Positive ion (→ cathode) / negative ion (→ anode).')),
    term(bi('цахилгаан бүрэх', 'electroplating'), bi('Металл зүйлийг электролизээр өөр металлын нимгэн давхаргаар бүрэх.', 'Coating a metal object with a thin layer of another metal by electrolysis.'))
  ],
  'ig4-3': [
    term(bi('түлшний элемент', 'fuel cell'), bi('Устөрөгч ба хүчилтөрөгчөөр цахилгаан гаргана; цорын ганц бүтээгдэхүүн нь ус.', 'Uses hydrogen and oxygen to produce electricity; water is the only product.'))
  ]
};

export const IG4_PRACTICE: Record<string, PracticeItem[]> = {
  'ig4-1': [
    easy(
      bi('Хатуу натрийн хлорид яагаад цахилгаан дамжуулахгүй вэ?', 'Why does solid sodium chloride not conduct electricity?'),
      [
        bi('Ион нь тогтсон байрлалтай, хөдөлж чадахгүй', 'Its ions are in fixed positions and cannot move'),
        bi('Ионгүй', 'It has no ions'),
        bi('Чөлөөт электрон нь хэт олон', 'It has too many free electrons'),
        bi('Ковалент молекулаас тогтдог', 'It is made of covalent molecules')
      ],
      0,
      bi('Хайлуулах эсвэл уусгахад ион хөдөлж чадна.', 'When it is melted or dissolved, the ions are free to move.')
    ),
    easy(
      bi('Хайлмал кали иодидын электролизийн катод дээр юу үүсэх вэ?', 'What forms at the cathode when molten potassium iodide is electrolysed?'),
      [bi('Иод', 'Iodine'), bi('Кали', 'Potassium'), bi('Устөрөгч', 'Hydrogen'), bi('Хүчилтөрөгч', 'Oxygen')],
      1,
      bi('Хайлмал – ус байхгүй; металл катод дээр, иод анод дээр.', 'Molten – there is no water; the metal forms at the cathode and iodine at the anode.')
    ),
    hard(
      bi('Хатуу кали бромид яагаад цахилгаан дамжуулдаггүйг тайлбарлаж, дамжуулдаг болгох хоёр аргыг санал болго. [3]', 'Explain why solid potassium bromide is a non-conductor and suggest two ways to make it conduct. [3]'),
      bi('Ион хөдөлж чадахгүй (тогтсон) [1]. Хайлуулах [1]; усанд уусгах [1].', 'The ions cannot move (they are fixed) [1]. Melt it [1]; dissolve it in water [1].'),
      bi('"Электрон хөдөлж чадахгүй" гэвэл оноо авахгүй – ионы нэгдэлд ион цэнэг зөөнө.', '"The electrons cannot move" scores nothing – in an ionic compound the ions carry the charge.')
    )
  ],
  'ig4-2': [
    easy(
      bi('(E) Мөнгөний нитратын уусмалыг идэвхгүй электродоор электролиз хийхэд бүтээгдэхүүн юу вэ?', '(E) What are the products when aqueous silver nitrate is electrolysed with inert electrodes?'),
      [
        bi('Катод: мөнгө; анод: хүчилтөрөгч', 'Cathode: silver; anode: oxygen'),
        bi('Катод: устөрөгч; анод: хүчилтөрөгч', 'Cathode: hydrogen; anode: oxygen'),
        bi('Катод: мөнгө; анод: азот', 'Cathode: silver; anode: nitrogen'),
        bi('Катод: устөрөгч; анод: мөнгө', 'Cathode: hydrogen; anode: silver')
      ],
      0,
      bi('Мөнгө устөрөгчөөс идэвх багатай; NO₃⁻ ялгардаггүй тул OH⁻-оос хүчилтөрөгч.', 'Silver is less reactive than hydrogen; NO₃⁻ is not discharged, so oxygen comes from OH⁻.')
    ),
    easy(
      bi('Металл зүйлийг яагаад цахилгаанаар бүрдэг вэ?', 'Why are metal objects electroplated?'),
      [
        bi('Гадаад үзэмж ба зэврэлтэд тэсвэрийг сайжруулах', 'To improve appearance and resistance to corrosion'),
        bi('Хүндрүүлэх', 'To make them heavier'),
        bi('Цахилгаан дамжуулахгүй болгох', 'To stop them conducting'),
        bi('Хайлах цэгийг бууруулах', 'To lower their melting point')
      ],
      0,
      bi('Жишээ нь цорго дээр хром, лаазан дээр цагаан тугалга, хутга сэрээн дээр мөнгө.', 'For example chromium on taps, tin on steel cans, silver on cutlery.')
    ),
    hard(
      bi('Өтгөн давсны уусмалыг (brine) идэвхгүй электродоор электролиз хийв. Катод ба анодын бүтээгдэхүүн, ажиглалт, уусмалд үлдэх бодисыг бич.', 'Concentrated aqueous sodium chloride (brine) is electrolysed with inert electrodes. Give the products and observations at each electrode and what is left in solution.'),
      bi('Катод: устөрөгч, өнгөгүй хийн бөмбөлөг ((E) 2H⁺ + 2e⁻ → H₂). Анод: хлор, цайвар шар-ногоон хийн бөмбөлөг ((E) 2Cl⁻ → Cl₂ + 2e⁻). Na⁺ ба OH⁻ үлдэж натрийн гидроксид болно – уусмал шүлтлэг.', 'Cathode: hydrogen, bubbles of colourless gas ((E) 2H⁺ + 2e⁻ → H₂). Anode: chlorine, bubbles of pale yellow-green gas ((E) 2Cl⁻ → Cl₂ + 2e⁻). Na⁺ and OH⁻ are left as sodium hydroxide – the solution becomes alkaline.'),
      bi('Шинжилгээ: H₂ – асаасан модонцор "пүх"; Cl₂ – чийгтэй лакмусыг цайруулна.', 'Tests: H₂ – a lighted splint pops; Cl₂ – bleaches damp litmus paper.')
    )
  ],
  'ig4-3': [
    easy(
      bi('Аль нь "юу хаана үүсэх вэ" гэдгийг зөв харуулсан бэ? (шингэрүүлсэн H₂SO₄, идэвхгүй электрод)', 'Which shows correctly what forms where? (dilute H₂SO₄, inert electrodes)'),
      [
        bi('Катод: устөрөгч; анод: хүчилтөрөгч', 'Cathode: hydrogen; anode: oxygen'),
        bi('Катод: хүчилтөрөгч; анод: устөрөгч', 'Cathode: oxygen; anode: hydrogen'),
        bi('Катод: хүхэр; анод: хүчилтөрөгч', 'Cathode: sulfur; anode: oxygen'),
        bi('Катод: устөрөгч; анод: хлор', 'Cathode: hydrogen; anode: chlorine')
      ],
      0,
      bi('Эзэлхүүний харьцаа H₂ : O₂ = 2 : 1; нийтдээ ус задарна.', 'The volume ratio H₂ : O₂ = 2 : 1; overall, water is decomposed.')
    ),
    easy(
      bi('(E) Түлшний элементийн давуу тал аль нь вэ?', '(E) Which is an advantage of fuel cells over petrol engines?'),
      [
        bi('Устөрөгчийг хадгалахад амар', 'Hydrogen is easy to store'),
        bi('Илүү үр ашигтай (≈60% / ≈35%)', 'More efficient (about 60% vs about 35%)'),
        bi('Станц олон', 'There are many filling stations'),
        bi('Хямд', 'They are cheap')
      ],
      1,
      bi('Бусад нь сул тал: хадгалахад хэцүү, станц цөөн, үнэтэй.', 'The others are disadvantages: hard to store, few filling stations, expensive.')
    ),
    hard(
      bi('(E) Электролизд цэнэг электродуудын хооронд хэрхэн шилждэгийг тайлбарла. [2]', '(E) Describe how charge is transferred between the electrodes in electrolysis. [2]'),
      bi('Электрон гаднах утсаар (анод → тэжээл → катод) урсана [1]; ион электролитээр хөдөлнө (катион катод руу, анион анод руу) [1].', 'Electrons flow through the external wires (anode → power supply → cathode) [1]; ions move through the electrolyte (cations to the cathode, anions to the anode) [1].'),
      bi('"Электрон электролитээр урсана" гэвэл оноо алдана.', '"Electrons flow through the electrolyte" loses the mark.')
    )
  ]
};
