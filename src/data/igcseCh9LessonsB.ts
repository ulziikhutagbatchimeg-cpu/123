// IGCSE 0620 chapter 9 (metals), lesson 3: reactivity of metals. It follows the deck Ch15_Reactivity_of_metals.pptx,
// planned as one 40-minute lesson (all its slides, with the review slides 19–26).
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig9';

export const IG9_LESSONS_B: StatesLesson[] = [
  lesson(
    3,
    bi('Металлын идэвх ба шахан гаргах урвал', 'Reactivity of metals and displacement'),
    bi(
      'Идэвхийн цувааг (K, Na, Ca, Mg, Al, C, Zn, Fe, H, Cu, Ag, Au) хэлэх; ус, уур, шингэрүүлсэн HCl-тай урвалаас харьцангуй идэвхийг тайлбарлах; туршилтын үр дүнгээс эрэмбэ гаргах; давсны уусмалаас металлын шахан гаргах урвал; (E) идэвх = эерэг ион үүсгэх хандлага; (E) хөнгөнцагаан яагаад идэвхгүй мэт харагддаг.',
      'State the reactivity series (K, Na, Ca, Mg, Al, C, Zn, Fe, H, Cu, Ag, Au); describe relative reactivity from reactions with water, steam and dilute HCl; deduce an order from results; displacement of metals from salt solutions; (E) reactivity as the tendency to form positive ions; (E) the apparent unreactivity of aluminium.'
    ),
    [
      bi('Идэвхийн цуваа: K, Na, Ca, Mg, Al, (C), Zn, Fe, (H), Cu, Ag, Au. H-аас дээрх металл шингэрүүлсэн хүчилтэй урвална; C-ээс доорхыг нүүрстөрөгчөөр гаргаж болно.', 'The reactivity series: K, Na, Ca, Mg, Al, (C), Zn, Fe, (H), Cu, Ag, Au. Metals above H react with dilute acids; metals below C can be extracted with carbon.'),
      bi('Идэвхтэй металл идэвх багатай металлыг давсны уусмалаас нь шахна: Zn + CuSO₄ → ZnSO₄ + Cu (цэнхэр бүдгэрч, улаан хүрэн зэс үүснэ); Cu + ZnSO₄ → урвалгүй.', 'A more reactive metal displaces a less reactive one from its salt solution: Zn + CuSO₄ → ZnSO₄ + Cu (the blue fades and red-brown copper forms); Cu + ZnSO₄ → no reaction.'),
      bi('(E) Zn → Zn²⁺ + 2e⁻ (исэлдэнэ, ангижруулагч); Cu²⁺ + 2e⁻ → Cu (ангижирна). Хөнгөнцагааныг Al₂O₃-ийн нимгэн, бат давхарга хамгаална.', '(E) Zn → Zn²⁺ + 2e⁻ (oxidised, the reducing agent); Cu²⁺ + 2e⁻ → Cu (reduced). Aluminium is protected by a thin, tough layer of Al₂O₃.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, давталт, санал хураалт', 'Start, retrieval and vote'),
        bi(
          'Том асуулт: цайрын тууз зэс сульфатын уусмалыг яагаад өнгөгүй болгодог, харин зэсийн тууз цайрын сульфатад юу ч болдоггүй вэ? Түлхүүр үг, зорилгод fist to five. Давталт: Ca + хүйтэн ус, Mg + уур, Cu + HCl, CuSO₄-ийн өнгө. "Санал нийлэх үү?" ба төлөвлөгөө.',
          'Big question: why does a zinc strip turn copper sulfate solution colourless, but a copper strip does nothing in zinc sulfate? Key terms and fist to five on the objectives. Retrieval: Ca + cold water, Mg + steam, Cu + HCl, the colour of CuSO₄. "Agree or disagree?" and the plan.'
        ),
        bi('Аль металл "ялахыг" хосоороо ярилцаж, самбартаа бичээд, эрхий хуруугаар санал өгнө.', 'Discuss which metal "wins" in pairs, write on boards and vote with thumbs.'),
        bi('Ca(OH)₂ + H₂; MgO + H₂; үгүй; цэнхэр; цайр зэсээс идэвхтэй.', 'Ca(OH)₂ + H₂; MgO + H₂; no; blue; zinc is more reactive than copper.')
      ],
      [
        bi('Идэвхийн цуваа ба нотолгоо', 'The reactivity series and the evidence'),
        bi(
          'Зураг 15.12-ын цуваа ба санах арга ("Please Send Cats Monkeys And Cute Zebras Into Hot Countries Sign Gold"). Хүйтэн ус, уур, HCl-тай урвалын хүснэгт. Хамтдаа: X, Y, Z-ийг эрэмбэлэх.',
          'The series of Figure 15.12 and the memory aid ("Please Send Cats Monkeys And Cute Zebras Into Hot Countries Sign Gold"). The table of reactions with cold water, steam and HCl. Together: put X, Y and Z in order.'
        ),
        bi('Цувааг хостойгоо хоёр удаа хэлж, далдлаад бичнэ; гурван сурагчийг X, Y, Z болгон эгнүүлнэ.', 'Say the series aloud twice with a partner, cover it and write it; line up three students as X, Y and Z.'),
        bi('Z > X > Y; Y – зэс, Z – магни.', 'Z > X > Y; Y could be copper, Z magnesium.')
      ],
      [
        bi('Шахан гаргах урвал; hinge 1; судлах', 'Displacement reactions; hinge 1; explore'),
        bi(
          'Zn + CuSO₄ ба Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag (мөнгөн "мод", уусмал цэнхэр болно). Хамтдаа: Mg, Zn, Cu-ийн шахан гаргах хүснэгт. Hinge 1: аль хольц урвалдах вэ. Судлах: төмөр хадаас CuSO₄ ба MgSO₄-д.',
          'Zn + CuSO₄ and Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag (a silver "tree", the solution turns blue). Together: the displacement grid for Mg, Zn and Cu. Hinge 1: which mixture reacts. Explore: an iron nail in CuSO₄ and in MgSO₄.'
        ),
        bi('Мөр бүрээс өмнө юу харагдахыг таамаглана; хүснэгтийн нүдэнд тэмдэг тавина; ABCD хуруугаар санал өгнө.', 'Predict what will be seen before each line; tick or cross each box of the grid; vote with ABCD fingers.'),
        bi('Mg > Zn > Cu; hinge: C (төмөр + зэс(II)-ын сульфат).', 'Mg > Zn > Cu; hinge: C (iron + copper(II) sulfate).')
      ],
      [
        bi('(E) Redox, хөнгөнцагаан; бие даан; hinge 2', '(E) Redox, aluminium; you do; hinge 2'),
        bi(
          '(E) Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s): цайр исэлдэнэ, Cu²⁺ ангижирна; идэвх = эерэг ион үүсгэх хандлага. (E) 4Al + 3O₂ → 2Al₂O₃ – хамгаалах давхарга. Бие даан: Mg + FeSO₄, Mg + CuSO₄, мөнгө ба CuSO₄, ионы тэгшитгэл. Hinge 2: W, X, Y-ийн эрэмбэ.',
          '(E) Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s): zinc is oxidised and Cu²⁺ reduced; reactivity = the tendency to form positive ions. (E) 4Al + 3O₂ → 2Al₂O₃ – the protective layer. You do: Mg + FeSO₄, Mg + CuSO₄, silver and CuSO₄, the ionic equation. Hinge 2: the order of W, X and Y.'
        ),
        bi('Гинжийг (электрон алдах → исэлдэх → ангижруулагч) хосоороо үргэлжлүүлнэ; 3 минут чимээгүй бичнэ; ABCD картаар санал өгнө.', 'Continue the chain (loses e⁻ → oxidised → reducing agent) in pairs; write in silence for 3 minutes; vote with ABCD cards.'),
        bi('Mg төмрийг шахна; Mg + CuSO₄ → MgSO₄ + Cu; мөнгө зэсээс идэвх бага; hinge: B (Y, W, X).', 'Mg displaces iron; Mg + CuSO₄ → MgSO₄ + Cu; silver is less reactive than copper; hinge: B (Y, W, X).')
      ],
      [
        bi('Шалгалт, зөвлөмж, дүгнэлт, гарах билет', 'Exam practice, tips, summary and exit ticket'),
        bi(
          '(a)–(d): идэвхийн эрэмбэ, Zn + CuSO₄-ийн ажиглалт, (E) цайр электроноор, (E) хөнгөнцагаан. Шалгалтын 4 зөвлөмж; үнэлэх (X, Y, Z дүгнэлт); алдаа засах ("магни хөнгөн"); дүгнэлт ба концепт зураглал. Гарах билет: төмөр ба зэс, Zn + MgSO₄, Fe + CuSO₄, (E) аль нь ангижрах.',
          '(a)–(d): the order of reactivity, the observations for Zn + CuSO₄, (E) zinc in terms of electrons, (E) aluminium. The 4 exam tips; evaluate (the X, Y, Z conclusion); error clinic ("magnesium is lighter"); the summary and concept map. Exit ticket: iron vs copper, Zn + MgSO₄, Fe + CuSO₄, (E) which species is reduced.'
        ),
        bi('4 минут шалгалтын нөхцөлд бичиж оноо тэмдэглэнэ; гарах билетийг ганцаараа бөглөж 🟢🟡🔴-ээр үнэлнэ.', 'Write for 4 minutes under exam conditions and tick the marking points; complete the exit ticket alone and rate themselves 🟢🟡🔴.'),
        bi('K, Mg, Zn, Cu; цэнхэр бүдгэрнэ, улаан хүрэн хатуу ("зэс үүснэ" биш); Z > X > Y; төмөр; үгүй; FeSO₄ + Cu; Cu²⁺.', 'K, Mg, Zn, Cu; the blue fades and a red-brown solid forms (not "copper is formed"); Z > X > Y; iron; no; FeSO₄ + Cu; Cu²⁺.')
      ]
    ]),
    [
      exitItem(
        bi('Аль хольц урвалдах вэ?', 'Which mixture reacts?'),
        [
          bi('Зэс + цайрын сульфатын уусмал', 'Copper + zinc sulfate solution'),
          bi('Мөнгө + зэс(II)-ын нитратын уусмал', 'Silver + copper(II) nitrate solution'),
          bi('Төмөр + зэс(II)-ын сульфатын уусмал', 'Iron + copper(II) sulfate solution'),
          bi('Зэс + магнийн сульфатын уусмал', 'Copper + magnesium sulfate solution')
        ],
        2,
        bi('Төмөр зэсээс идэвхтэй тул зэсийг шахна.', 'Iron is more reactive than copper, so it displaces copper.')
      ),
      exitItem(
        bi('W металл X-ийг давсны уусмалаас нь шахдаг ч Y-г шахдаггүй. Идэвхийн зөв эрэмбэ (идэвхтэй нь эхэнд)?', 'Metal W displaces X from a solution of its salt but not Y. Which order is correct (most reactive first)?'),
        [bi('W, X, Y', 'W, X, Y'), bi('Y, W, X', 'Y, W, X'), bi('X, W, Y', 'X, W, Y'), bi('Y, X, W', 'Y, X, W')],
        1,
        bi('W > X (X-ийг шахна); Y > W (Y-г шахаж чадахгүй). Тиймээс Y > W > X.', 'W > X (W displaces X); Y > W (W cannot displace Y). So Y > W > X.')
      ),
      exitItem(
        bi('Цайрыг зэс(II)-ын сульфатын уусмалд хийхэд юу АЖИГЛАГДАХ вэ?', 'What would you SEE when zinc is added to copper(II) sulfate solution?'),
        [
          bi('Зэс үүснэ', 'Copper is formed'),
          bi('Цэнхэр өнгө бүдгэрч, улаан хүрэн хатуу бодис үүснэ', 'The blue colour fades and a red-brown solid forms'),
          bi('Устөрөгч ялгарна', 'Hydrogen is given off'),
          bi('Юу ч болохгүй', 'Nothing happens')
        ],
        1,
        bi('"Зэс үүснэ" нь дүгнэлт; ажиглалтад өнгө ба хатуу бодисыг бич.', '"Copper is formed" is a conclusion; describe the colour and the solid.')
      ),
      exitItem(
        bi('(E) Хөнгөнцагаан яагаад устай урвалддаггүй мэт харагддаг вэ?', '(E) Why does aluminium not appear to react with water?'),
        [
          bi('Идэвх багатай металл', 'It is an unreactive metal'),
          bi('Идэвхгүй, хамгаалах исэл давхарга усыг металлд хүргэдэггүй', 'A protective, unreactive oxide layer stops water reaching the metal'),
          bi('Устөрөгчөөс доор байдаг', 'It is below hydrogen in the series'),
          bi('Хэт хөнгөн', 'It is too light')
        ],
        1,
        bi('Хөнгөнцагаан идэвхтэй; Al₂O₃ давхарга хамгаална.', 'Aluminium is reactive; the Al₂O₃ layer protects it.')
      ),
      exitItem(
        bi('(E) Fe + Cu²⁺ → Fe²⁺ + Cu урвалд аль нь ангижирч байна вэ?', '(E) Which species is reduced in Fe + Cu²⁺ → Fe²⁺ + Cu?'),
        [bi('Fe', 'Fe'), bi('Cu²⁺', 'Cu²⁺'), bi('Fe²⁺', 'Fe²⁺'), bi('Cu', 'Cu')],
        1,
        bi('Cu²⁺ электрон авна – ангижирна; Fe электрон алдана – исэлдэнэ.', 'Cu²⁺ gains electrons – it is reduced; Fe loses electrons – it is oxidised.')
      )
    ],
    ID
  )
];

export const IG9_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'ig9-3': [
    term(bi('идэвхийн цуваа', 'reactivity series'), bi('Металлуудыг идэвхээр нь, хамгийн идэвхтэйг эхэнд жагсаасан дараалал.', 'Metals listed in order of reactivity, most reactive first.')),
    term(bi('шахан гаргах урвал', 'displacement reaction'), bi('Идэвхтэй металл идэвх багатай металлыг давсны уусмалаас нь шахна.', 'A more reactive metal displaces a less reactive metal from a solution of its salt.')),
    term(bi('исэл давхарга (E)', 'oxide layer (E)'), bi('Хөнгөнцагааныг хамгаалдаг Al₂O₃-ийн нимгэн, идэвхгүй давхарга.', 'A thin, unreactive layer of Al₂O₃ that protects aluminium.')),
    term(bi('ангижруулагч (E)', 'reducing agent (E)'), bi('Электрон өгдөг бодис; идэвхтэй металл хүчтэй ангижруулагч.', 'A substance that gives electrons; reactive metals are strong reducing agents.'))
  ]
};

export const IG9_PRACTICE_B: Record<string, PracticeItem[]> = {
  'ig9-3': [
    easy(
      bi('Цайр магнийн сульфатын уусмалтай урвалдах уу?', 'Will zinc react with magnesium sulfate solution?'),
      [bi('Тийм', 'Yes'), bi('Үгүй – цайр магниас идэвх бага', 'No – zinc is less reactive than magnesium'), bi('Зөвхөн халаахад', 'Only when heated'), bi('Тийм – устөрөгч ялгарна', 'Yes – hydrogen is given off')],
      1,
      bi('Зөвхөн идэвхтэй металл идэвх багатайг шахна.', 'Only a more reactive metal displaces a less reactive one.')
    ),
    easy(
      bi('Эдгээр металлыг идэвхээр нь эрэмбэл (идэвхтэй нь эхэнд): зэс, магни, цайр, кали.', 'Put these in order of reactivity, most reactive first: copper, magnesium, zinc, potassium.'),
      [
        bi('Кали, магни, цайр, зэс', 'Potassium, magnesium, zinc, copper'),
        bi('Магни, кали, цайр, зэс', 'Magnesium, potassium, zinc, copper'),
        bi('Зэс, цайр, магни, кали', 'Copper, zinc, magnesium, potassium'),
        bi('Кали, цайр, магни, зэс', 'Potassium, zinc, magnesium, copper')
      ],
      0,
      bi('K, Na, Ca, Mg, Al, (C), Zn, Fe, (H), Cu, Ag, Au.', 'K, Na, Ca, Mg, Al, (C), Zn, Fe, (H), Cu, Ag, Au.')
    ),
    hard(
      bi('(E) Магни ба зэс(II)-ын сульфатын тэнцүүлсэн ба ионы тэгшитгэлийг бичиж, юу исэлдэхийг тайлбарла. Мөн цайр яагаад зэсээс идэвхтэйг электроноор тайлбарла.', '(E) Write the balanced and ionic equations for magnesium with copper(II) sulfate and say what is oxidised. Also explain, in terms of electrons, why zinc is more reactive than copper.'),
      bi('Mg + CuSO₄ → MgSO₄ + Cu; Mg + Cu²⁺ → Mg²⁺ + Cu – магни электрон алдаж исэлдэнэ. Цайр электроноо амархан алдаж [1] эерэг ион илүү амархан үүсгэнэ [1].', 'Mg + CuSO₄ → MgSO₄ + Cu; Mg + Cu²⁺ → Mg²⁺ + Cu – magnesium loses electrons and is oxidised. Zinc loses electrons more easily [1] and forms positive ions more readily [1].'),
      bi('"Идэвхтэй металл электрон амархан авна" гэвэл буруу – алдана.', '"Reactive metals gain electrons easily" is wrong – they lose them.')
    )
  ]
};
