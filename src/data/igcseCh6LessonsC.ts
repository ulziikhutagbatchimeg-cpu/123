// IGCSE 0620 chapter 6 (chemical reactions), lessons 5–6: redox. They follow the deck Ch10_Redox_reactions.pptx and its
// plan of two 40-minute lessons (slides 1–12 and 13 on), with the review slides 21–28.
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig6';

export const IG6_LESSONS_C: StatesLesson[] = [
  lesson(
    5,
    bi('Исэлдэлт ба бууралт, Ром тоо, (E) электрон ба исэлдлийн зэрэг', 'Oxidation and reduction, Roman numerals, (E) electrons and oxidation numbers'),
    bi(
      'Исэлдэлтийг хүчилтөрөгч авах, бууралтыг алдах гэж тодорхойлох; redox-ийг тэгшитгэлээс таних; Ром тоогоор исэлдлийн зэргийг харуулах; (E) электрон ба исэлдлийн зэргээр тодорхойлж, тооцох; (E) исэлдүүлэгч ба ангижруулагчийг таних.',
      'Define oxidation as gain of oxygen and reduction as loss of oxygen; identify redox in equations; use Roman numerals for the oxidation number; (E) define them by electrons and oxidation number and work oxidation numbers out; (E) identify oxidising and reducing agents.'
    ),
    [
      bi('Исэлдэлт = хүчилтөрөгч авах (2Cu + O₂ → 2CuO); бууралт = хүчилтөрөгч алдах (CuO + H₂ → Cu + H₂O). Хоёулаа зэрэг явагдана → redox.', 'Oxidation = gain of oxygen (2Cu + O₂ → 2CuO); reduction = loss of oxygen (CuO + H₂ → Cu + H₂O). They happen together → redox.'),
      bi('Ром тоо = металлын ионы цэнэг (исэлдлийн зэрэг): iron(III) = Fe³⁺, copper(I) oxide Cu₂O, potassium manganate(VII) KMnO₄.', 'The Roman numeral = the charge on the metal ion (its oxidation number): iron(III) = Fe³⁺, copper(I) oxide Cu₂O, potassium manganate(VII) KMnO₄.'),
      bi('(E) OIL RIG: исэлдэлт – электрон алдах, бууралт – авах. Исэлдлийн зэрэг: элемент 0, ион = цэнэг, нэгдэлд нийлбэр 0. Исэлдүүлэгч өөрөө ангижирна; ангижруулагч өөрөө исэлдэнэ.', '(E) OIL RIG: oxidation is loss, reduction is gain of electrons. Oxidation numbers: element 0, ion = its charge, sum in a compound 0. An oxidising agent is itself reduced; a reducing agent is itself oxidised.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi(
          'Зураг 10.2: зэсийг агаарт халаахад хар болно, устөрөгч буцаад ягаан болгоно – юу нэмэгдэж, юу алдагдав? "Санал нийлэх үү?" (исэлдэлт үргэлж хүчилтөрөгчтэй; исэлдэлт ба бууралт зэрэг; ангижруулагч ангижирна) ба төлөвлөгөө.',
          'Figure 10.2: copper heated in air turns black, and hydrogen turns it pink again – what is gained and what is lost? "Agree or disagree?" (oxidation always involves oxygen; oxidation and reduction happen together; a reducing agent is reduced) and the plan.'
        ),
        bi('Хуруу шил бүрт юу нэмэгдэж, юу алдагдсаныг хосоороо 60 секунд ярилцана; эрхий хуруугаар санал өгнө.', 'Think–pair–share for 60 s on what is gained and lost in each tube; vote with thumbs.'),
        bi('Хүчилтөрөгч нэмэгдэх = исэлдэлт, алдах = бууралт.', 'Gaining oxygen = oxidation, losing it = reduction.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi(
          'Тодорхойлолтын гурван түвшин (хүчилтөрөгч, электрон, исэлдлийн зэрэг); зорилгод fist to five. Давталт: Mg 2 электрон алдах, төмөр(III)-ын ислийн томьёо, метаны шаталт, электролизд эерэг ионыг татах электрод.',
          'The three levels of definition (oxygen, electrons, oxidation number); fist to five on the objectives. Retrieval: Mg losing 2 electrons, the formula of iron(III) oxide, burning methane, the electrode that attracts positive ions.'
        ),
        bi('Самбартаа бичээд 3-2-1-д өргөнө.', 'Write on show-me boards and reveal on 3-2-1.'),
        bi('2+ (Mg²⁺); Fe₂O₃; CO₂ ба H₂O; катод.', '2+ (Mg²⁺); Fe₂O₃; CO₂ and H₂O; the cathode.')
      ],
      [
        bi('Исэлдэлт ба бууралт; Ром тоо', 'Oxidation and reduction; Roman numerals'),
        bi(
          'Тэгшитгэл дээр сумаар: CuO хүчилтөрөгч алдав – ангижрав, H₂ авав – исэлдэв. Хамтдаа: ZnO + C, Fe₂O₃ + 3CO, CH₄ + 2O₂. Дараа нь Ром тоо: FeCl₂/FeCl₃, Cu₂O/CuO, MnO₂, KMnO₄.',
          'Arrows on the equation: CuO loses oxygen – it is reduced; H₂ gains oxygen – it is oxidised. Together: ZnO + C, Fe₂O₃ + 3CO, CH₄ + 2O₂. Then Roman numerals: FeCl₂/FeCl₃, Cu₂O/CuO, MnO₂, KMnO₄.'
        ),
        bi('Хүчилтөрөгчийг дугуйлж хуруугаараа дагана; төмөр(III)-ын ислийн томьёог самбартаа бичнэ.', 'Circle the oxygen and follow it with a finger; write the formula of iron(III) oxide on boards.'),
        bi('ZnO ангижирна, C исэлдэнэ; Fe₂O₃ ангижирна; CH₄ исэлдэнэ; Fe₂O₃.', 'ZnO is reduced, C is oxidised; Fe₂O₃ is reduced; CH₄ is oxidised; Fe₂O₃.')
      ],
      [
        bi('Hinge ба (E) электрон шилжилт: OIL RIG', 'Hinge and (E) electron transfer: OIL RIG'),
        bi(
          'Hinge 1: PbO + H₂ → Pb + H₂O-д юу ангижрах вэ? (E) Цайрыг зэс(II) сульфатын уусмалд: Zn → Zn²⁺ + 2e⁻ (исэлдэлт), Cu²⁺ + 2e⁻ → Cu (бууралт); сульфат хөндлөнгийн ион. Судлах: цайр CuSO₄-д ямар бөөм электрон алдах вэ.',
          'Hinge 1: what is reduced in PbO + H₂ → Pb + H₂O? (E) Zinc in copper(II) sulfate solution: Zn → Zn²⁺ + 2e⁻ (oxidation), Cu²⁺ + 2e⁻ → Cu (reduction); sulfate is a spectator ion. Explore: which particle loses electrons when zinc is put in CuSO₄?'
        ),
        bi('ABCD хуруугаар санал өгнө; OIL RIG-ийг хостойгоо давтаж аль атом электрон алдахыг тайлбарлана.', 'Vote with ABCD fingers; chant OIL RIG with a partner and explain which atom loses electrons.'),
        bi('Hinge: B (PbO); Zn исэлдэнэ, Cu²⁺ ангижирна.', 'Hinge: B (PbO); Zn is oxidised, Cu²⁺ is reduced.')
      ],
      [
        bi('(E) Исэлдлийн зэрэг ба агентууд', '(E) Oxidation numbers and agents'),
        bi(
          'Дүрмүүд ба жишээ: KMnO₄-д +1 + Mn + 4(−2) = 0 → Mn = +7. Хамтдаа: SO₂, SO₄²⁻, K₂Cr₂O₇, NH₃, Cu₂O. Исэлдүүлэгч ба ангижруулагч: Cl₂ + 2KI → 2KCl + I₂.',
          'The rules with examples: in KMnO₄, +1 + Mn + 4(−2) = 0 → Mn = +7. Together: SO₂, SO₄²⁻, K₂Cr₂O₇, NH₃, Cu₂O. Oxidising and reducing agents: Cl₂ + 2KI → 2KCl + I₂.'
        ),
        bi('Хосоороо уралдаж 5 исэлдлийн зэргийг олно; CuO + H₂-д ангижруулагчийг 30 секунд ярилцана.', 'Race in pairs to find the 5 oxidation numbers; talk for 30 s about the reducing agent in CuO + H₂.'),
        bi('+4, +6, +6, −3, +1; Cl₂ – исэлдүүлэгч, I⁻ – ангижруулагч; H₂ – ангижруулагч.', '+4, +6, +6, −3, +1; Cl₂ – oxidising agent, I⁻ – reducing agent; H₂ – reducing agent.')
      ]
    ]),
    [
      exitItem(
        bi('PbO + H₂ → Pb + H₂O урвалд аль бодис ангижирч байна вэ?', 'In PbO + H₂ → Pb + H₂O, which substance is reduced?'),
        [bi('H₂', 'H₂'), bi('PbO', 'PbO'), bi('Pb', 'Pb'), bi('H₂O', 'H₂O')],
        1,
        bi('Хар тугалга(II)-ын исэл хүчилтөрөгч алдана – ангижирна; устөрөгч исэлдэнэ.', 'Lead(II) oxide loses oxygen, so it is reduced; hydrogen is oxidised.')
      ),
      exitItem(
        bi('Зэс(I)-ийн ислийн томьёо аль нь вэ?', 'What is the formula of copper(I) oxide?'),
        [bi('CuO', 'CuO'), bi('Cu₂O', 'Cu₂O'), bi('CuO₂', 'CuO₂'), bi('Cu₂O₃', 'Cu₂O₃')],
        1,
        bi('Cu⁺ ба O²⁻ → Cu₂O; Ром тоо нь атомын тоо биш, цэнэг.', 'Cu⁺ and O²⁻ → Cu₂O; the Roman numeral is the charge, not the number of atoms.')
      ),
      exitItem(
        bi('(E) KMnO₄ дахь манганы исэлдлийн зэрэг хэд вэ?', '(E) What is the oxidation number of manganese in KMnO₄?'),
        [bi('+4', '+4'), bi('+7', '+7'), bi('+2', '+2'), bi('−7', '−7')],
        1,
        bi('+1 + Mn + 4(−2) = 0 → Mn = +7 (тиймээс manganate(VII)).', '+1 + Mn + 4(−2) = 0 → Mn = +7 (hence manganate(VII)).')
      ),
      exitItem(
        bi('(E) Cl₂ + 2KI → 2KCl + I₂ урвалд исэлдүүлэгч аль нь вэ?', '(E) In Cl₂ + 2KI → 2KCl + I₂, which is the oxidising agent?'),
        [bi('Cl₂', 'Cl₂'), bi('KI', 'KI'), bi('KCl', 'KCl'), bi('I₂', 'I₂')],
        0,
        bi('Cl 0 → −1 (ангижирна) тул Cl₂ исэлдүүлэгч; I −1 → 0 (исэлдэнэ).', 'Cl goes 0 → −1 (reduced), so Cl₂ is the oxidising agent; I goes −1 → 0 (oxidised).')
      )
    ],
    ID
  ),
  lesson(
    6,
    bi('(E) Redox-ийн өнгөний тест ба шалгалтын дасгал', '(E) Redox colour tests and exam practice'),
    bi(
      '(E) Хүчиллэг KMnO₄(aq) ба KI(aq)-ийн өнгөний өөрчлөлтийг тайлбарлах; исэлдүүлэгч, ангижруулагчийг таних; исэлдлийн зэргээр redox-ийг батлах; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх.',
      '(E) Describe the colour changes with acidified KMnO₄(aq) and KI(aq); identify oxidising and reducing agents; use oxidation numbers to show a reaction is redox; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('(E) Хүчиллэг калийн манганат(VII) – исэлдүүлэгч: ангижруулагч нэмэхэд ягаан → өнгөгүй (Mn +7 → +2).', '(E) Acidified potassium manganate(VII) is an oxidising agent: purple → colourless when a reducing agent is added (Mn +7 → +2).'),
      bi('(E) Калийн иодидын уусмал – ангижруулагч: исэлдүүлэгч нэмэхэд өнгөгүй → шар хүрэн (иод үүснэ).', '(E) Potassium iodide solution is a reducing agent: colourless → yellow-brown when an oxidising agent is added (iodine forms).'),
      bi('(E) Исэлдүүлэгч ангижирна (исэлдлийн зэрэг буурна), ангижруулагч исэлдэнэ (зэрэг өснө); хоёулаа зэрэг явагдана.', '(E) The oxidising agent is reduced (its oxidation number falls) and the reducing agent is oxidised (its number rises); both happen at the same time.')
    ],
    lessonSteps([
      [
        bi('(E) Redox-ийн өнгөний тест', '(E) Colour tests for redox'),
        bi('Зураг 10.12: Fe²⁺ уусмал KMnO₄-ийг өнгөгүй болгоно; KI + хлорын ус → шар хүрэн. Тиймээс KMnO₄ өнгөгүй болвол бодис ангижруулагч, KI хүрэн болбол исэлдүүлэгч.', 'Figure 10.12: Fe²⁺ solution decolourises KMnO₄; KI + chlorine water → yellow-brown. So if KMnO₄ is decolourised the substance is a reducing agent, and if KI turns brown it is an oxidising agent.'),
        bi('Үзүүлэхээс өмнө өнгийг таамаглана (predict–observe–explain).', 'Predict the colour before the demonstration (predict–observe–explain).'),
        bi('KMnO₄: ягаан → өнгөгүй; KI: өнгөгүй → шар хүрэн.', 'KMnO₄: purple → colourless; KI: colourless → yellow-brown.')
      ],
      [
        bi('(E) Бие даан: redox', '(E) You do: redox'),
        bi('Mg + 2H⁺; 2Fe²⁺ + Cl₂ дахь исэлдүүлэгч; KMnO₄-ийг өнгөгүй болгосон X; Br₂ + 2I⁻ дахь иодын исэлдлийн зэрэг.', 'Mg + 2H⁺; the oxidising agent in 2Fe²⁺ + Cl₂; solution X decolourises KMnO₄; the change in oxidation number of iodine in Br₂ + 2I⁻.'),
        bi('Бие даан бичээд дэвтрээ солилцож өөр өнгөөр засна.', 'Write alone, swap books and mark in a different colour.'),
        bi('Mg (2 электрон алдана); Cl₂; ангижруулагч; −1 → 0.', 'Mg (loses 2 electrons); Cl₂; a reducing agent; −1 → 0.')
      ],
      [
        bi('Hinge 2–3', 'Hinges 2–3'),
        bi('Hinge 2: Zn + CuSO₄ → ZnSO₄ + Cu-ийн тухай аль нь зөв; hinge 3: Cr₂O₃ дахь хромын исэлдлийн зэрэг.', 'Hinge 2: which statement about Zn + CuSO₄ → ZnSO₄ + Cu is correct; hinge 3: the oxidation number of chromium in Cr₂O₃.'),
        bi('ABCD карт ба хуруугаар санал өгнө.', 'Vote with ABCD cards and fingers.'),
        bi('Hinge 2: C (Zn – ангижруулагч, электрон алдана); hinge 3: B (+3).', 'Hinge 2: C (Zn is the reducing agent, it loses electrons); hinge 3: B (+3).')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi(
          '(a)–(d): хүчилтөрөгчөөр бууралт, 2Mg + CO₂-д юу ангижрах, (E) электроноор исэлдэлт, (E) Cl₂ + 2Br⁻-ийг исэлдлийн зэргээр. 4 шалгалтын зөвлөмж. Үнэлэх: "Zn + Cu²⁺-д зэс ангижруулагч". Алдаа засах: SO₄²⁻ дахь S.',
          '(a)–(d): reduction in terms of oxygen, what is reduced in 2Mg + CO₂, (E) oxidation in terms of electrons, (E) Cl₂ + 2Br⁻ with oxidation numbers. The 4 exam tips. Evaluate: "in Zn + Cu²⁺, copper is the reducing agent". Error clinic: S in SO₄²⁻.'
        ),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes, swap and tick each marking point; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('Хүчилтөрөгч алдах; CO₂; электрон алдах; Cl 0 → −1, Br −1 → 0; Zn ангижруулагч; S = +6.', 'Loss of oxygen; CO₂; loss of electrons; Cl 0 → −1, Br −1 → 0; Zn is the reducing agent; S = +6.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: хүчилтөрөгчөөр исэлдэлт, Cu₂O, (E) NO₂ дахь N, (E) Fe₂O₃ + 3CO-д ангижруулагч. Зорилгод дахин fist to five.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: oxidation in terms of oxygen, Cu₂O, (E) N in NO₂, (E) the reducing agent in Fe₂O₃ + 3CO. Fist to five on the objectives again.'),
        bi('Гарах билетийг 4 минутад ганцаараа чимээгүй бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone and in silence in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('Хүчилтөрөгч авах; Cu₂O; +4; нүүрстөрөгчийн дутуу исэл.', 'Gain of oxygen; Cu₂O; +4; carbon monoxide.')
      ]
    ]),
    [
      exitItem(
        bi('(E) X уусмал хүчиллэг KMnO₄-ийг ягаанаас өнгөгүй болгов. X ямар бодис вэ?', '(E) Solution X turns acidified KMnO₄ from purple to colourless. What type of substance is X?'),
        [bi('Исэлдүүлэгч', 'An oxidising agent'), bi('Ангижруулагч', 'A reducing agent'), bi('Хүчил', 'An acid'), bi('Катализатор', 'A catalyst')],
        1,
        bi('KMnO₄ (исэлдүүлэгч) ангижирч Mn +7 → +2 болно – X ангижруулагч.', 'KMnO₄ (an oxidising agent) is reduced, Mn +7 → +2 – so X is a reducing agent.')
      ),
      exitItem(
        bi('(E) Zn + CuSO₄ → ZnSO₄ + Cu урвалд аль нь зөв бэ?', '(E) In Zn + CuSO₄ → ZnSO₄ + Cu, which statement is correct?'),
        [
          bi('Zn ангижирна; электрон авна', 'Zn is reduced; it gains electrons'),
          bi('Cu²⁺ исэлдэнэ; электрон алдана', 'Cu²⁺ is oxidised; it loses electrons'),
          bi('Zn ангижруулагч; электрон алдана', 'Zn is the reducing agent; it loses electrons'),
          bi('Cu²⁺ ангижруулагч', 'Cu²⁺ is the reducing agent')
        ],
        2,
        bi('Zn → Zn²⁺ + 2e⁻: цайр исэлдэнэ, тиймээс ангижруулагч.', 'Zn → Zn²⁺ + 2e⁻: zinc is oxidised, so it is the reducing agent.')
      ),
      exitItem(
        bi('(E) Cr₂O₃ дахь хромын исэлдлийн зэрэг хэд вэ?', '(E) What is the oxidation number of chromium in Cr₂O₃?'),
        [bi('+2', '+2'), bi('+3', '+3'), bi('+6', '+6'), bi('−3', '−3')],
        1,
        bi('2Cr + 3(−2) = 0 → 2Cr = +6 → Cr = +3.', '2Cr + 3(−2) = 0 → 2Cr = +6 → Cr = +3.')
      ),
      exitItem(
        bi('(E) Fe₂O₃ + 3CO → 2Fe + 3CO₂ урвалд ангижруулагч аль нь вэ?', '(E) In Fe₂O₃ + 3CO → 2Fe + 3CO₂, which is the reducing agent?'),
        [bi('Fe₂O₃', 'Fe₂O₃'), bi('Нүүрстөрөгчийн дутуу исэл', 'Carbon monoxide'), bi('Fe', 'Fe'), bi('CO₂', 'CO₂')],
        1,
        bi('CO хүчилтөрөгч авч исэлдэнэ – Fe₂O₃-ийг ангижруулна.', 'CO gains oxygen and is oxidised – it reduces the Fe₂O₃.')
      ),
      exitItem(
        bi('2Mg + CO₂ → 2MgO + C урвалд аль бодис ангижирч байна вэ?', 'In 2Mg + CO₂ → 2MgO + C, which substance is reduced?'),
        [bi('Магни', 'Magnesium'), bi('Нүүрстөрөгчийн давхар исэл', 'Carbon dioxide'), bi('Магнийн исэл', 'Magnesium oxide'), bi('Нүүрстөрөгч', 'Carbon')],
        1,
        bi('CO₂ хүчилтөрөгч алдана; Mg хүчилтөрөгч авч исэлдэнэ.', 'CO₂ loses oxygen; Mg gains oxygen and is oxidised.')
      )
    ],
    ID
  )
];

export const IG6_GLOSSARY_C: Record<string, GlossaryTerm[]> = {
  'ig6-5': [
    term(bi('исэлдэлт', 'oxidation'), bi('Хүчилтөрөгч авах; (E) электрон алдах; (E) исэлдлийн зэрэг өсөх.', 'Gain of oxygen; (E) loss of electrons; (E) increase in oxidation number.')),
    term(bi('бууралт (ангижрал)', 'reduction'), bi('Хүчилтөрөгч алдах; (E) электрон авах; (E) исэлдлийн зэрэг буурах.', 'Loss of oxygen; (E) gain of electrons; (E) decrease in oxidation number.')),
    term(bi('redox урвал', 'redox reaction'), bi('Исэлдэлт ба бууралт зэрэг явагддаг урвал.', 'A reaction in which oxidation and reduction take place at the same time.')),
    term(bi('исэлдлийн зэрэг (E)', 'oxidation number (E)'), bi('Атом хэр исэлдсэн эсвэл ангижирсныг харуулах тэмдэгтэй тоо.', 'A number (with sign) given to an atom to show how oxidised or reduced it is.'))
  ],
  'ig6-6': [
    term(bi('исэлдүүлэгч (E)', 'oxidising agent (E)'), bi('Өөр бодисыг исэлдүүлж, өөрөө ангижирдаг бодис.', 'A substance that oxidises another substance and is itself reduced.')),
    term(bi('ангижруулагч (E)', 'reducing agent (E)'), bi('Өөр бодисыг ангижруулж, өөрөө исэлддэг бодис.', 'A substance that reduces another substance and is itself oxidised.'))
  ]
};

export const IG6_PRACTICE_C: Record<string, PracticeItem[]> = {
  'ig6-5': [
    easy(
      bi('ZnO + C → Zn + CO урвалд юу исэлдэж байна вэ?', 'In ZnO + C → Zn + CO, what is oxidised?'),
      [bi('ZnO', 'ZnO'), bi('Нүүрстөрөгч', 'Carbon'), bi('Цайр', 'Zinc'), bi('CO', 'CO')],
      1,
      bi('Нүүрстөрөгч хүчилтөрөгч авна – исэлдэнэ; ZnO ангижирна.', 'Carbon gains oxygen, so it is oxidised; ZnO is reduced.')
    ),
    easy(
      bi('(E) K₂Cr₂O₇ дахь хромын исэлдлийн зэрэг хэд вэ?', '(E) What is the oxidation number of chromium in K₂Cr₂O₇?'),
      [bi('+12', '+12'), bi('+6', '+6'), bi('+7', '+7'), bi('+3', '+3')],
      1,
      bi('2(+1) + 2Cr + 7(−2) = 0 → 2Cr = +12 → Cr = +6 (2 Cr-д хуваа).', '2(+1) + 2Cr + 7(−2) = 0 → 2Cr = +12 → Cr = +6 (divide by the 2 Cr).')
    ),
    hard(
      bi('(E) Mg + Cu²⁺ → Mg²⁺ + Cu урвалын хоёр хагас тэгшитгэлийг бичиж, исэлдэлт ба бууралтыг тэмдэглэ.', '(E) Write the two half-equations for Mg + Cu²⁺ → Mg²⁺ + Cu and label oxidation and reduction.'),
      bi('Mg → Mg²⁺ + 2e⁻ (исэлдэлт – электрон алдана); Cu²⁺ + 2e⁻ → Cu (бууралт – электрон авна).', 'Mg → Mg²⁺ + 2e⁻ (oxidation – loss of electrons); Cu²⁺ + 2e⁻ → Cu (reduction – gain of electrons).'),
      bi('OIL RIG; электроныг хагас тэгшитгэлийн зөв талд бич.', 'OIL RIG; put the electrons on the correct side of each half-equation.')
    )
  ],
  'ig6-6': [
    easy(
      bi('(E) Калийн иодидын уусмалд исэлдүүлэгч нэмэхэд ямар өнгө болох вэ?', '(E) What colour does potassium iodide solution turn when an oxidising agent is added?'),
      [bi('Ягаан', 'Purple'), bi('Шар хүрэн', 'Yellow-brown'), bi('Цэнхэр', 'Blue'), bi('Өнгөгүй хэвээр', 'It stays colourless')],
      1,
      bi('I⁻ исэлдэж иод (I₂) үүснэ.', 'I⁻ is oxidised and iodine (I₂) forms.')
    ),
    easy(
      bi('(E) 2Fe²⁺ + Cl₂ → 2Fe³⁺ + 2Cl⁻ урвалд исэлдүүлэгч аль нь вэ?', '(E) In 2Fe²⁺ + Cl₂ → 2Fe³⁺ + 2Cl⁻, which is the oxidising agent?'),
      [bi('Fe²⁺', 'Fe²⁺'), bi('Cl₂', 'Cl₂'), bi('Fe³⁺', 'Fe³⁺'), bi('Cl⁻', 'Cl⁻')],
      1,
      bi('Cl₂ ангижирна (0 → −1), тиймээс исэлдүүлэгч.', 'Cl₂ is reduced (0 → −1), so it is the oxidising agent.')
    ),
    hard(
      bi('(E) Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂. Исэлдлийн зэргээр энэ нь redox урвал гэдгийг тайлбарла. [3]', '(E) Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂. Use oxidation numbers to explain why this is a redox reaction. [3]'),
      bi('Cl: 0 → −1, ангижирна [1]; Br: −1 → 0, исэлдэнэ [1]; хоёулаа зэрэг явагдана [1].', 'Cl: 0 → −1, reduced [1]; Br: −1 → 0, oxidised [1]; both happen at the same time [1].'),
      bi('"Исэлдүүлэгч исэлдэнэ" гэвэл буруу – өөрөө ангижирна.', '"The oxidising agent is oxidised" is wrong – it is itself reduced.')
    )
  ]
};
