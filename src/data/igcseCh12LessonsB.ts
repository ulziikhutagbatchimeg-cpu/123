// IGCSE 0620 chapter 12 (experimental techniques and chemical analysis), lessons 3–4. They follow the deck
// Ch22_Chemical_analysis.pptx and its plan of two 40-minute lessons (slides 1–11 and 12 on), with the review
// slides 22–29. Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig12';

export const IG12_LESSONS_B: StatesLesson[] = [
  lesson(
    3,
    bi('Дөлний тест, катион ба анионы тест', 'Flame tests, cation and anion tests'),
    bi(
      'Li⁺, Na⁺, K⁺, Ca²⁺, Ba²⁺, Cu²⁺-ийн дөлний тест; NaOH(aq) ба NH₃(aq)-аар катионыг илрүүлэх (бага ба илүүдэл); карбонат, хлорид, бромид, иодид, нитрат, сульфат, сульфитын тест.',
      'Flame tests for Li⁺, Na⁺, K⁺, Ca²⁺, Ba²⁺, Cu²⁺; tests for cations with aqueous sodium hydroxide and aqueous ammonia (a little, then in excess); tests for carbonate, chloride, bromide, iodide, nitrate, sulfate and sulfite.'
    ),
    [
      bi('Дөл: Li⁺ улаан, Na⁺ шар, K⁺ lilac, Ca²⁺ orange-red, Ba²⁺ цайвар ногоон, Cu²⁺ хөх-ногоон. Утсыг өтгөн HCl-д дүрж цэвэрлээд Бунзений хүчтэй (хөх) дөлөнд барина.', 'Flames: Li⁺ red, Na⁺ yellow, K⁺ lilac, Ca²⁺ orange-red, Ba²⁺ light green, Cu²⁺ blue-green. Clean the wire in concentrated HCl, touch the sample and hold it in a roaring (blue) Bunsen flame.'),
      bi('NaOH(aq): Al³⁺ ба Zn²⁺ цагаан, илүүдэлд уусна; Ca²⁺ цагаан, уусахгүй; Cr³⁺ ногоон, уусна; Cu²⁺ цайвар хөх; Fe²⁺ ногоон; Fe³⁺ улаан хүрэн; NH₄⁺ тунадасгүй, халаахад аммиак. NH₃(aq): Zn²⁺ уусна, Al³⁺ уусахгүй; Cu²⁺ илүүдэлд хар хөх уусмал.', 'NaOH(aq): Al³⁺ and Zn²⁺ white, soluble in excess; Ca²⁺ white, insoluble; Cr³⁺ green, soluble; Cu²⁺ light blue; Fe²⁺ green; Fe³⁺ red-brown; NH₄⁺ no ppt., ammonia on warming. NH₃(aq): Zn²⁺ dissolves, Al³⁺ does not; Cu²⁺ gives a dark blue solution in excess.'),
      bi('Анион: CO₃²⁻ – хүчил, хөөсөрнө, шохойн усыг цайлгана; Cl⁻/Br⁻/I⁻ – HNO₃ + AgNO₃: цагаан/цөцгий/шар; SO₄²⁻ – HNO₃ + Ba(NO₃)₂: цагаан; SO₃²⁻ – хүчиллэг KMnO₄ ягаан → өнгөгүй; NO₃⁻ – NaOH + Al, бүлээцүүлэхэд NH₃.', 'Anions: CO₃²⁻ – acid, effervescence, limewater milky; Cl⁻/Br⁻/I⁻ – HNO₃ + AgNO₃: white/cream/yellow; SO₄²⁻ – HNO₃ + Ba(NO₃)₂: white; SO₃²⁻ – acidified KMnO₄ purple → colourless; NO₃⁻ – NaOH + Al, warm: NH₃.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi('Том асуулт: шүүх эмнэлгийн химич үл мэдэгдэх цагаан нунтаг авлаа – ямар энгийн тест ионуудыг нь илрүүлэх вэ? "Санал нийлэх үү?" (lilac дөл натри; хүчиллэг барийн нитраттай цагаан тунадас – сульфат; устөрөгч бүгэлсэн шүдэнзийг асаана) ба төлөвлөгөө.', 'Big question: a forensic chemist is handed an unknown white powder – which simple tests reveal its ions? "Agree or disagree?" (a lilac flame shows sodium; a white ppt. with acidified barium nitrate shows sulfate; hydrogen relights a glowing splint) and the plan.'),
        bi('Цагаан нунтаг давс уу, элсэн чихэр үү гэдгийг яаж мэдэхийг хосоороо 60 секунд ярилцаж санал өгнө.', 'Discuss in pairs for 60 s how to tell whether a white powder is salt or sugar; vote with thumbs.'),
        bi('Lilac = K⁺, натри шар; бүгэлсэн шүдэнз – хүчилтөрөгч, устөрөгч "поп".', 'Lilac = K⁺, sodium is yellow; a glowing splint is for oxygen, hydrogen gives a squeaky pop.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi('Чанарын шинжилгээ, тунадас, илүүдэл, дөлний тест, титрлэлт, эцсийн цэг. Fist to five. Давталт: усны тест, AgCl уусах эсэх, AgCl-ийн ионы тэгшитгэл, шүлтэнд метил улбар шарын өнгө.', 'Qualitative analysis, precipitate, in excess, flame test, titration, end-point. Fist to five. Retrieval: the test for water, whether silver chloride is soluble, the ionic equation for AgCl, the colour of methyl orange in alkali.'),
        bi('Нэр томьёог хэлэхгүйгээр тайлбарлана; самбартаа бичээд 3-2-1-д өргөнө.', 'Explain a term without saying it; write on boards and reveal on 3-2-1.'),
        bi('Усгүй CuSO₄ цагаан → цэнхэр; уусдаггүй; Ag⁺(aq) + Cl⁻(aq) → AgCl(s); шар.', 'Anhydrous CuSO₄ white → blue; insoluble; Ag⁺(aq) + Cl⁻(aq) → AgCl(s); yellow.')
      ],
      [
        bi('Дөлний тест ба NaOH(aq)-аар катион; судлах', 'Flame tests and cations with NaOH(aq); explore'),
        bi('Дөлний тест (Зураг 22.2, 22.3): 6 өнгө. Хүснэгт 22.2: NaOH(aq)-ыг бага, дараа нь илүүдэл нэмэхэд 8 катионы үр дүн. Судлах: дөлний тестийн видео – аль ион lilac, аль нь шар вэ.', 'Flame tests (Figures 22.2, 22.3): the 6 colours. Table 22.2: the results for 8 cations with a little NaOH(aq), then in excess. Explore: the flame-test video – which ion is lilac, which is yellow?'),
        bi('Өнгө бүр ба мөр бүрийн үр дүнг самбартаа таамаглана.', 'Predict each colour and each row on boards.'),
        bi('K – "ягаан" биш "lilac"; Ca – "orange-red"; Fe²⁺ ба Cr³⁺ хоёулаа ногоон, гэхдээ Cr³⁺ илүүдэлд уусна.', 'K is "lilac", not "purple"; Ca is "orange-red"; Fe²⁺ and Cr³⁺ are both green, but Cr³⁺ dissolves in excess.')
      ],
      [
        bi('NH₃(aq)-аар катион; hinge 1', 'Cations with NH₃(aq); hinge 1'),
        bi('NH₃(aq): Al³⁺ цагаан, уусахгүй; Ca²⁺ тунадасгүй (эсвэл бага зэрэг); Cr³⁺, Fe²⁺ ногоон; Cu²⁺ илүүдэлд хар хөх уусмал; Fe³⁺ улаан хүрэн; Zn²⁺ цагаан, уусна. Hinge 1: NaOH-д уусдаг, NH₃-д уусдаггүй цагаан тунадас.', 'NH₃(aq): Al³⁺ white, insoluble; Ca²⁺ no ppt. (or very slight); Cr³⁺ and Fe²⁺ green; Cu²⁺ dark blue solution in excess; Fe³⁺ red-brown; Zn²⁺ white, soluble. Hinge 1: a white ppt. soluble in excess NaOH but not in excess NH₃.'),
        bi('Al³⁺ уу Zn²⁺ үү – аль нь илүүдэл аммиакт уусахыг 3-2-1-д үзүүлнэ; ABCD хуруугаар санал өгнө.', 'Show on 3-2-1 whether Al³⁺ or Zn²⁺ dissolves in excess ammonia; vote with ABCD fingers.'),
        bi('Zn²⁺ уусна; hinge: C (Al³⁺). Ca²⁺ NH₃-тай тунадас өгдөггүй.', 'Zn²⁺ dissolves; hinge: C (Al³⁺). Ca²⁺ gives no ppt. with NH₃.')
      ],
      [
        bi('Анионы тест', 'Tests for anions'),
        bi('Хүснэгт 22.4: карбонат, хлорид, бромид, иодид; нитрат, сульфат, сульфит. Зураг 22.9, 22.8: мөнгөний галогенидын тунадас; Ag⁺ + Br⁻ → AgBr; CO₃²⁻ + 2H⁺ → CO₂ + H₂O. Яагаад хүчилжүүлэх: карбонатын ион Ag⁺ эсвэл Ba²⁺-тэй тунадас үүсгэж хуурамч үр дүн өгнө.', 'Table 22.4: carbonate, chloride, bromide, iodide; nitrate, sulfate, sulfite. Figures 22.9, 22.8: silver halide precipitates; Ag⁺ + Br⁻ → AgBr; CO₃²⁻ + 2H⁺ → CO₂ + H₂O. Why acidify: carbonate ions would also precipitate with Ag⁺ or Ba²⁺ and give a false positive.'),
        bi('Анион бүрийн урвалжийг самбартаа бичнэ; мөнгөний нитратын өмнө азотын хүчил нэмэх шалтгааныг 30 секунд ярилцана.', 'Write the reagent for each anion on boards; discuss for 30 s why nitric acid is added before silver nitrate.'),
        bi('"Acidify"-г орхихгүй; cream ба yellow-ийг андуурахгүй; сульфатад Ag⁺ хэрэглэхгүй.', 'Do not leave out "acidify"; do not mix up cream and yellow; do not use Ag⁺ for sulfate.')
      ]
    ]),
    [
      exitItem(
        bi('Ямар металлын ион шар дөл өгөх вэ?', 'Which metal ion gives a yellow flame?'),
        [bi('Li⁺', 'Li⁺'), bi('Na⁺', 'Na⁺'), bi('K⁺', 'K⁺'), bi('Cu²⁺', 'Cu²⁺')],
        1,
        bi('Li⁺ улаан, K⁺ lilac, Cu²⁺ хөх-ногоон.', 'Li⁺ red, K⁺ lilac, Cu²⁺ blue-green.')
      ),
      exitItem(
        bi('Төмөр(III) NaOH(aq)-тай ямар өнгийн тунадас өгөх вэ?', 'What colour ppt. does iron(III) give with NaOH(aq)?'),
        [bi('Ногоон', 'Green'), bi('Улаан хүрэн', 'Red-brown'), bi('Цайвар хөх', 'Light blue'), bi('Цагаан', 'White')],
        1,
        bi('Fe²⁺ – ногоон; хоёулаа илүүдэлд уусахгүй.', 'Fe²⁺ is green; both are insoluble in excess.')
      ),
      exitItem(
        bi('NaOH(aq)-д цагаан тунадас өгч илүүдэлд уусдаг, NH₃(aq)-д цагаан тунадас өгч илүүдэлд уусдаггүй. Аль ион?', 'A white ppt. with NaOH(aq) dissolves in excess; with NH₃(aq) a white ppt. does NOT dissolve in excess. Which ion?'),
        [bi('Ca²⁺', 'Ca²⁺'), bi('Zn²⁺', 'Zn²⁺'), bi('Al³⁺', 'Al³⁺'), bi('NH₄⁺', 'NH₄⁺')],
        2,
        bi('Zn²⁺ хоёуланд нь уусна.', 'Zn²⁺ dissolves in both.')
      ),
      exitItem(
        bi('Бромидын ион хүчиллэг мөнгөний нитраттай ямар үр дүн өгөх вэ?', 'What is the positive result for bromide ions with acidified silver nitrate?'),
        [bi('Цагаан тунадас', 'White precipitate'), bi('Цөцгий өнгийн тунадас', 'Cream precipitate'), bi('Шар тунадас', 'Yellow precipitate'), bi('Хөөсөрнө', 'Effervescence')],
        1,
        bi('Хлорид – цагаан, иодид – шар.', 'Chloride is white, iodide is yellow.')
      ),
      exitItem(
        bi('Нитратын ионыг аль үр дүн харуулах вэ?', 'Which test result shows the presence of nitrate ions?'),
        [
          bi('Хүчиллэг мөнгөний нитраттай цагаан тунадас', 'White ppt. with acidified silver nitrate'),
          bi('NaOH(aq) ба хөнгөн цагаантай бүлээцүүлэхэд аммиак ялгарна', 'Ammonia produced when warmed with NaOH(aq) and aluminium'),
          bi('Шингэрүүлсэн хүчилтэй хөөсөрнө', 'Effervescence with dilute acid'),
          bi('Ягаан KMnO₄ өнгөгүй болно', 'Purple KMnO₄ turns colourless')
        ],
        1,
        bi('Шүлтлэг орчинд Al нитратыг аммиак болгон ангижруулна.', 'Aluminium reduces nitrate to ammonia in alkaline solution.')
      )
    ],
    ID
  ),
  lesson(
    4,
    bi('Хийн тест, ион тодорхойлох, титрлэлт ба шалгалт', 'Tests for gases, identifying ions, titration and exam practice'),
    bi(
      'Аммиак, CO₂, хлор, устөрөгч, хүчилтөрөгч, SO₂-ийн тест; катион ба анионыг хамтад нь тодорхойлох; бюретка, пипетка, индикатортой хүчил–шүлтийн титрлэлт; (E) титрлэлтийн тооцоо; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх.',
      'Tests for ammonia, carbon dioxide, chlorine, hydrogen, oxygen and sulfur dioxide; identifying the cation and the anion together; an acid–base titration with a burette, pipette and indicator; (E) titration calculations; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('NH₃ – чийгтэй улаан лакмус цэнхэр; CO₂ – шохойн ус цайна; Cl₂ – чийгтэй лакмусыг цайруулна; H₂ – асаасан шүдэнз "поп"; O₂ – бүгэлсэн шүдэнз асна; SO₂ – хүчиллэг KMnO₄ ягаан → өнгөгүй.', 'NH₃ – damp red litmus turns blue; CO₂ – limewater turns milky; Cl₂ – bleaches damp litmus; H₂ – lighted splint, squeaky pop; O₂ – glowing splint relights; SO₂ – acidified KMnO₄ purple → colourless.'),
      bi('Титрлэлт: пипеткаар 25.0 cm³ шүлт, хэдэн дусал индикатор (метил улбар шар эсвэл тимолфталейн); бюреткагаар хүчил нэмж индикатор өнгө өөрчлөх хүртэл; 0.05 cm³ хүртэл унших; 0.10 cm³ дотор давхцах титрийн дундаж.', 'Titration: 25.0 cm³ of alkali by pipette, a few drops of indicator (methyl orange or thymolphthalein); add acid from a burette until the indicator just changes colour; read to 0.05 cm³; take the mean of concordant titres (within 0.10 cm³).'),
      bi('(E) 0.100 mol/dm³ HCl-ийн 20.0 cm³ нь 25.0 cm³ NaOH-ийг саармагжуулна: n = 0.100 × 20.0/1000 = 0.00200 mol; c = 0.00200 ÷ 0.0250 = 0.0800 mol/dm³.', '(E) 20.0 cm³ of 0.100 mol/dm³ HCl neutralises 25.0 cm³ NaOH: n = 0.100 × 20.0/1000 = 0.00200 mol; c = 0.00200 ÷ 0.0250 = 0.0800 mol/dm³.')
    ],
    lessonSteps([
      [
        bi('Хийн тест; hinge 2', 'Tests for gases; hinge 2'),
        bi('Хүснэгт 22.5: 6 хийн тест ба үр дүн; Зураг 22.12 – хлор лакмусыг цайруулна. Hinge 2: чийгтэй лакмусыг цайруулдаг хий.', 'Table 22.5: the 6 gas tests and results; Figure 22.12 – chlorine bleaches litmus. Hinge 2: the gas that bleaches damp litmus paper.'),
        bi('Хосоор: A хий нэрлэж B тест ба үр дүнг хэлээд мөр бүрт солино; ABCD картаар санал өгнө.', 'Pairs: A names a gas, B gives the test and result, swapping each row; vote with ABCD cards.'),
        bi('Хлорт "хуурай" биш чийгтэй лакмус; O₂-д асаасан биш бүгэлсэн шүдэнз; hinge: B (хлор).', 'Chlorine needs damp, not dry, litmus; oxygen needs a glowing, not lighted, splint; hinge: B (chlorine).')
      ],
      [
        bi('Хамтдаа: ионыг тодорхойлох', 'We do: identify the ions'),
        bi('X: lilac дөл, азотын хүчил + мөнгөний нитраттай шар тунадас. Y: NaOH-тай улаан хүрэн, хүчиллэг барийн нитраттай цагаан. Z: хүчилтэй хөөсөрч шохойн усыг цайлгана, дөл orange-red.', 'X: lilac flame, yellow ppt. with nitric acid + silver nitrate. Y: red-brown ppt. with NaOH, white ppt. with acidified barium nitrate. Z: fizzes with dilute acid, the gas turns limewater milky, orange-red flame.'),
        bi('"Мөрдөгч" хосууд эхлээд катион, дараа нь анионыг тодорхойлно.', 'Detective pairs identify the cation first, then the anion.'),
        bi('KI; төмөр(III) сульфат (төмөр(II) биш); CaCO₃.', 'Potassium iodide; iron(III) sulfate (not iron(II)); calcium carbonate.')
      ],
      [
        bi('Титрлэлт; бие даан; hinge 3', 'Titration; you do; hinge 3'),
        bi('Титрлэлтийн алхам; бюреткийг доод менискээр унших; давхцах титр; (E) тооцоо. Бие даан: сульфатын тест, NH₃-ийн илүүдэлд хар хөх уусмал, хүчилтөрөгчийн тест, (E) 12.5 cm³ 0.200 mol/dm³ HCl ба 25.0 cm³ NaOH. Hinge 3: нитратын тест.', 'The titration steps; read the burette at the bottom of the meniscus; concordant titres; (E) the calculation. You do: the sulfate test, a dark blue solution in excess NH₃, the test for oxygen, (E) 12.5 cm³ of 0.200 mol/dm³ HCl and 25.0 cm³ NaOH. Hinge 3: the test for nitrate.'),
        bi('Нэг нь бюреткийн зургийг уншиж нөгөө нь 2 аравтын оронтой бичнэ; 3 минут чимээгүй бичээд өөр өнгөөр засна; ABCD хуруугаар санал өгнө.', 'One reads a burette diagram and the other records to 2 d.p.; write in silence for 3 minutes and mark in another colour; vote with ABCD fingers.'),
        bi('HNO₃ + Ba(NO₃)₂ → цагаан (HCl/BaCl₂ биш); Cu²⁺; бүгэлсэн шүдэнз асна; 0.00250 mol, 0.100 mol/dm³; hinge: B. cm³-ийг dm³ болгохоо мартахгүй.', 'HNO₃ + Ba(NO₃)₂ → white (not HCl/BaCl₂); Cu²⁺; glowing splint relights; 0.00250 mol, 0.100 mol/dm³; hinge: B. Do not forget to convert cm³ to dm³.')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi('(a) дөлний тест хийх [2]; (b) төмөр(II) + NaOH(aq) [2]; (c) хлоридын тест [3]; (d) чийгтэй улаан лакмусыг цэнхэр болгох хий. Зөвлөмж: lilac, acidify, "илүүдэлд уусахгүй", цайруулна. Үнэлэх: NaOH-тай цагаан тунадас → "Al³⁺" гэсэн дүгнэлт. Алдаа засах: CO₂ "асаасан шүдэнзийг унтраана".', '(a) carrying out a flame test [2]; (b) iron(II) + NaOH(aq) [2]; (c) the test for chloride [3]; (d) the gas that turns damp red litmus blue. Tips: lilac, acidify, "insoluble in excess", bleaches. Evaluate: a white ppt. with NaOH → "Al³⁺". Error clinic: CO₂ "puts out a lighted splint".'),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes and peer-mark; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('Цэвэр утсыг дээжинд хүргээд Бунзений дөлөнд; ногоон тунадас, илүүдэлд уусахгүй; HNO₃, AgNO₃, цагаан; аммиак. Нотолгоо хангалтгүй – Zn²⁺, Ca²⁺ ч цагаан; илүүдэл NaOH, дараа нь NH₃. CO₂ – шохойн ус цайна.', 'Clean wire into the sample, then into a Bunsen flame; green ppt., insoluble in excess; HNO₃, AgNO₃, white; ammonia. Not enough evidence – Zn²⁺ and Ca²⁺ are also white; add excess NaOH, then NH₃. CO₂ – limewater turns milky.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: шар дөл, төмөр(III) + NaOH, бромид + хүчиллэг AgNO₃, устөрөгчийн тест. Fist to five дахин.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: the yellow flame, iron(III) + NaOH, bromide + acidified AgNO₃, the test for hydrogen. Fist to five again.'),
        bi('Гарах билетийг 4 минутад ганцаараа бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('Na⁺; улаан хүрэн; цөцгий өнгийн тунадас (шар биш); асаасан шүдэнз – "поп".', 'Na⁺; red-brown; cream precipitate (not yellow); lighted splint – squeaky pop.')
      ]
    ]),
    [
      exitItem(
        bi('Чийгтэй лакмусыг цайруулдаг хий аль нь вэ?', 'A gas bleaches damp litmus paper. Which gas is it?'),
        [bi('Аммиак', 'Ammonia'), bi('Хлор', 'Chlorine'), bi('Хүчилтөрөгч', 'Oxygen'), bi('Нүүрстөрөгчийн давхар исэл', 'Carbon dioxide')],
        1,
        bi('Аммиак улаан лакмусыг цэнхэр болгоно.', 'Ammonia turns red litmus blue.')
      ),
      exitItem(
        bi('Устөрөгчийг хэрхэн шалгах вэ?', 'How do you test for hydrogen?'),
        [bi('Бүгэлсэн шүдэнз асна', 'A glowing splint relights'), bi('Асаасан шүдэнз – "поп"', 'A lighted splint gives a squeaky pop'), bi('Шохойн ус цайна', 'Limewater turns milky'), bi('Чийгтэй лакмус цайна', 'Damp litmus is bleached')],
        1,
        bi('Бүгэлсэн шүдэнз – хүчилтөрөгч.', 'The glowing splint is the test for oxygen.')
      ),
      exitItem(
        bi('Сульфатын ионы тест ба үр дүн аль нь вэ?', 'What is the test for sulfate ions and the positive result?'),
        [
          bi('Азотын хүчлээр хүчилжүүлж барийн нитрат нэмэхэд цагаан тунадас', 'Acidify with dilute nitric acid, add aqueous barium nitrate: white ppt.'),
          bi('Мөнгөний нитрат нэмэхэд шар тунадас', 'Add silver nitrate: yellow ppt.'),
          bi('Хүчил нэмэхэд хөөсөрнө', 'Add acid: effervescence'),
          bi('NaOH ба Al-тай бүлээцүүлэхэд аммиак', 'Warm with NaOH and Al: ammonia')
        ],
        0,
        bi('BaSO₄ цагаан тунадас үүснэ.', 'White BaSO₄ forms.')
      ),
      exitItem(
        bi('Lilac дөлтэй, хүчиллэг мөнгөний нитраттай шар тунадас өгдөг X юу вэ?', 'Solid X gives a lilac flame and a yellow ppt. with acidified silver nitrate. Name X.'),
        [bi('Натрийн хлорид', 'Sodium chloride'), bi('Калийн иодид', 'Potassium iodide'), bi('Калийн бромид', 'Potassium bromide'), bi('Литийн иодид', 'Lithium iodide')],
        1,
        bi('Lilac – K⁺; шар – I⁻.', 'Lilac is K⁺; yellow is I⁻.')
      ),
      exitItem(
        bi('(E) 25.0 cm³ NaOH-д 0.200 mol/dm³ HCl-ийн 12.5 cm³ хэрэгтэй. NaOH-ийн концентраци?', '(E) 25.0 cm³ of NaOH needs 12.5 cm³ of 0.200 mol/dm³ HCl. What is the concentration of NaOH?'),
        [bi('0.100 mol/dm³', '0.100 mol/dm³'), bi('0.400 mol/dm³', '0.400 mol/dm³'), bi('0.0025 mol/dm³', '0.0025 mol/dm³'), bi('0.200 mol/dm³', '0.200 mol/dm³')],
        0,
        bi('n = 0.200 × 0.0125 = 0.00250 mol; c = 0.00250 ÷ 0.0250 = 0.100 mol/dm³.', 'n = 0.200 × 0.0125 = 0.00250 mol; c = 0.00250 ÷ 0.0250 = 0.100 mol/dm³.')
      )
    ],
    ID
  )
];

export const IG12_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'ig12-3': [
    term(bi('чанарын шинжилгээ', 'qualitative analysis'), bi('Ямар бодис (ион) байгааг харуулдаг тест.', 'Tests that show which substances (ions) are present.')),
    term(bi('тунадас', 'precipitate'), bi('Хоёр уусмалыг холиход үүсэх уусдаггүй хатуу бодис.', 'An insoluble solid formed when two solutions are mixed.')),
    term(bi('илүүдэл', 'in excess'), bi('Бүрэн урвалд ороход хэрэгтэйгээс илүү урвалж нэмэх.', 'Adding more reagent than is needed to react completely.')),
    term(bi('дөлний тест', 'flame test'), bi('Нэгдлийг дөлөнд халааж өнгөөр нь металлын ионыг тодорхойлох.', 'Heating a compound in a flame to identify the metal ion by its colour.'))
  ],
  'ig12-4': [
    term(bi('титрлэлт', 'titration'), bi('Нэг уусмалыг бюреткагаар нөгөөд нь эцсийн цэг хүртэл нэмэх.', 'Adding one solution from a burette to another until the end-point is reached.')),
    term(bi('эцсийн цэг', 'end-point'), bi('Индикатор өнгөө өөрчлөх цэг.', 'The point at which the indicator changes colour.'))
  ]
};

export const IG12_PRACTICE_B: Record<string, PracticeItem[]> = {
  'ig12-3': [
    easy(
      bi('Ca²⁺-ийн дөлний өнгө?', 'What is the flame colour of Ca²⁺?'),
      [bi('Улаан', 'Red'), bi('Orange-red', 'Orange-red'), bi('Цайвар ногоон', 'Light green'), bi('Lilac', 'Lilac')],
      1,
      bi('Li⁺ – улаан; Ba²⁺ – цайвар ногоон.', 'Li⁺ is red; Ba²⁺ is light green.')
    ),
    easy(
      bi('Сульфитын ионы тест?', 'What is the test for sulfite ions?'),
      [bi('Хүчиллэг калийн манганат(VII): ягаан → өнгөгүй', 'Acidified potassium manganate(VII): purple → colourless'), bi('Мөнгөний нитрат: цагаан', 'Silver nitrate: white'), bi('Шохойн ус: цайна', 'Limewater: milky'), bi('Улаан лакмус: цэнхэр', 'Red litmus: blue')],
      0,
      bi('SO₂-ийн тест ч мөн адил.', 'The test for SO₂ is the same.')
    ),
    hard(
      bi('Галогенидын тестэд мөнгөний нитратын өмнө яагаад шингэрүүлсэн азотын хүчил нэмдгийг тайлбарла.', 'Explain why dilute nitric acid is added before silver nitrate in the halide test.'),
      bi('Карбонатын ионыг устгана – эс бөгөөс карбонат Ag⁺-тэй тунадас үүсгэж хуурамч эерэг үр дүн өгнө.', 'It removes carbonate ions – otherwise carbonate would also form a precipitate with Ag⁺ and give a false positive.'),
      bi('"Acidify" гэдгийг орхивол оноо алдана.', 'Leaving out "acidify" loses the mark.')
    )
  ],
  'ig12-4': [
    easy(
      bi('Төмөр(II) ион NaOH(aq)-тай ямар үр дүн өгөх вэ?', 'What is the result of adding aqueous sodium hydroxide to iron(II) ions?'),
      [bi('Ногоон тунадас, илүүдэлд уусахгүй', 'Green ppt., insoluble in excess'), bi('Улаан хүрэн тунадас', 'Red-brown ppt.'), bi('Ногоон тунадас, илүүдэлд уусна', 'Green ppt., soluble in excess'), bi('Тунадасгүй', 'No ppt.')],
      0,
      bi('Илүүдэлд уусдаг ногоон – Cr³⁺.', 'A green ppt. that dissolves in excess is Cr³⁺.')
    ),
    easy(
      bi('Давхцах (concordant) титр гэж юу вэ?', 'What are concordant titres?'),
      [bi('0.10 cm³ дотор ойролцоо титрүүд', 'Titres within 0.10 cm³ of each other'), bi('Эхний титр', 'The first titre'), bi('Хамгийн их титр', 'The largest titre'), bi('25.0 cm³-тэй тэнцүү титр', 'A titre equal to 25.0 cm³')],
      0,
      bi('Давхцах титрийн дунджийг хэрэглэнэ.', 'The mean of the concordant titres is used.')
    ),
    hard(
      bi('(E) 0.100 mol/dm³ HCl-ийн 20.0 cm³ нь 25.0 cm³ NaOH-ийг саармагжуулна. NaOH-ийн концентрацийг бод.', '(E) 20.0 cm³ of 0.100 mol/dm³ HCl neutralises 25.0 cm³ NaOH. Calculate the concentration of NaOH.'),
      bi('n(HCl) = 0.100 × 20.0/1000 = 0.00200 mol; 1:1 тул n(NaOH) = 0.00200 mol; c = 0.00200 ÷ 0.0250 = 0.0800 mol/dm³.', 'n(HCl) = 0.100 × 20.0/1000 = 0.00200 mol; 1:1, so n(NaOH) = 0.00200 mol; c = 0.00200 ÷ 0.0250 = 0.0800 mol/dm³.'),
      bi('cm³-ийг dm³ болгохоо мартвал буруу гарна.', 'Forgetting to convert cm³ to dm³ gives the wrong answer.')
    )
  ]
};
