// 9701 A Level chapter 19 (lattice energy and Born–Haber cycles), lessons 5–8 of 12 (see latticeLessonsA.ts).
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

export const LATTICE_LESSONS_B: StatesLesson[] = [
  lesson(
    5,
    bi('Борн–Хабер асуудлын багц', 'Born–Haber problem set'),
    bi(
      'Олон алхамт Борн–Хабер асуудлыг загваргүйгээр шийдэх, IE₂, ΔH_f эсвэл EA-г циклээс олох, MgCl₂ яагаад MgCl биш байдгийг тайлбарлах.',
      'Solve multi-step Born–Haber problems without a template, find IE₂, ΔH_f or EA from a cycle, and explain why MgCl₂ rather than MgCl forms.'
    ),
    [
      bi('Нэгдэл дэх бүх ионы тоо, цэнэг (IE₂, 2 × EA) тооцоонд орно.', 'Every ion in the formula, and its charge (IE₂, 2 × EA), enters the calculation.'),
      bi('Алхам бүрийн тэмдгийг бичнэ: дээш +, доош −.', 'Write the sign of each step: up +, down −.'),
      bi('Тооцоолсон ΔH_latt нь тоо ба тэмдгийн алдаанд мэдрэмтгий.', 'A calculated ΔH_latt is very sensitive to errors in numbers and signs.')
    ],
    lessonSteps([
      [
        bi('Шалгах хуудас', 'Retrieval: the checklist'),
        bi('Дөрвөн алхамт шалгах хуудсыг асууна.', 'Ask for the four-point checklist.'),
        bi('Хуудсыг дахин хэлнэ.', 'Recite the checklist.'),
        bi('Дөрвөн алхам зөв.', 'Four steps correct.')
      ],
      [
        bi('Бие даан: асуудлууд 1–2', 'You do: problems 1–2'),
        bi('IE₂-ийг олох, ΔH_f-ийг тооцоолох асуудлыг өгнө.', 'Set the problems to find IE₂ and to calculate ΔH_f.'),
        bi('Цикл зурж, тооцоолно.', 'Draw the cycle and calculate.'),
        bi('Хариу нь тэмдэгтэйгээр зөв.', 'Answers correct with signs.')
      ],
      [
        bi('Бие даан: асуудал 3', 'You do: problem 3'),
        bi('Хэт их мэдээлэлтэй асуудлыг өгнө.', 'Give a problem with more data than needed.'),
        bi('Хэрэгтэй өгөгдлийг сонгоно.', 'Choose the data that is needed.'),
        bi('Зөв өгөгдөл сонгосон.', 'Correct data chosen.')
      ],
      [
        bi('A* сорил: MgCl', 'A* challenge: MgCl'),
        bi('Яагаад MgCl бус MgCl₂ тогтвортой вэ гэдгийг асууна.', 'Ask why MgCl₂ rather than MgCl is stable.'),
        bi('ΔH_f-ийг тооцоолж, харьцуулна.', 'Calculate ΔH_f and compare.'),
        bi('Шалтгаан ба тооцоо зөв.', 'Reason and calculation correct.')
      ],
      [
        bi('Хүчтэй сорил', 'Hinge question'),
        bi('Сүүлийн сорилтыг өгч, хариуг хянана.', 'Give the final test and review the answers.'),
        bi('Гарах билетийн асуултад хариулна.', 'Answer the exit-ticket questions.'),
        bi('Гарах билетийн оноо.', 'Exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('CaCl₂-ийн ΔH_f = −796, ΔH_at(Ca) = +178, IE₁ = +590, ΔH_at(Cl) = +122, EA₁(Cl) = −348, ΔH_latt = −2258 кЖ моль⁻¹ бол IE₂ хэд вэ?', 'For CaCl₂: ΔH_f = −796, ΔH_at(Ca) = +178, IE₁ = +590, ΔH_at(Cl) = +122, EA₁(Cl) = −348, ΔH_latt = −2258 kJ mol⁻¹. What is IE₂?'),
        [bi('+1146', '+1146'), bi('−1146', '−1146'), bi('+2258', '+2258'), bi('+590', '+590')],
        0,
        bi('IE₂ = −796 − 178 − 590 − 2(122) − 2(−348) − (−2258) = +1146 кЖ моль⁻¹.', 'IE₂ = −796 − 178 − 590 − 2(122) − 2(−348) − (−2258) = +1146 kJ mol⁻¹.')
      ),
      exitItem(
        bi('Mg²⁺-ийн торын энерги өндөр тул MgCl биш MgCl₂ тогтвортой. Яагаад?', 'Magnesium forms MgCl₂ rather than MgCl. Why?'),
        [bi('Mg²⁺-ийн торын энерги MgCl₂-ээс бага', 'The lattice energy of Mg²⁺ is smaller than that of MgCl₂'), bi('IE₂-ийн өсөлтийг торын энергийн том сөрөг утга илүү нөхдөг', 'The large negative lattice energy from the 2+ charge outweighs the rise in IE₂'), bi('Cl хийн төлөвт байхгүй', 'Cl has no gaseous state'), bi('MgCl нь ионы нэгдэл биш', 'MgCl is not an ionic compound')],
        1,
        bi('IE₂ их боловч 2+ цэнэгээс үүдсэн торын энерги (−2523 ба −753) илүү том.', 'IE₂ is large, but the 2+ charge gives a much larger lattice energy (−2523 against −753).')
      ),
      exitItem(
        bi('ΔH_f = −286, ΔH₁ = +500 кЖ моль⁻¹ бол ΔH_latt хэд вэ?', 'ΔH_f = −286 and ΔH₁ = +500 kJ mol⁻¹. What is ΔH_latt?'),
        [bi('+214', '+214'), bi('+786', '+786'), bi('−786', '−786'), bi('−214', '−214')],
        2,
        bi('ΔH_latt = −286 − 500 = −786 кЖ моль⁻¹.', 'ΔH_latt = −286 − 500 = −786 kJ mol⁻¹.')
      )
    ]
  ),
  lesson(
    6,
    bi('ΔH_latt-ийн хэмжээг юу тодорхойлох вэ', 'What decides the size of ΔH_latt'),
    bi(
      'Ионы радиус ба цэнэгийн нөлөөг ΔH_latt-д тайлбарлах, 3 зэрэглэлийн "explain" хариулт бичих, нэгдлүүдийг ΔH_latt-аар эрэмбэлэх.',
      'Explain the effect of ionic radius and charge on ΔH_latt, write a three-mark logic chain for an explain question, and rank compounds by ΔH_latt.'
    ),
    [
      bi('ΔH_latt ∝ Q₁Q₂/r: цэнэг их, радиус бага → илүү сөрөг (LiF −1049, MgO −3923).', 'ΔH_latt ∝ Q₁Q₂/r: higher charge and smaller radius give a more negative value (LiF −1049, MgO −3923).'),
      bi('Ижил бүтэцтэй, ойролцоо хэмжээтэй ионд цэнэг илүү нөлөөтэй (Q₁Q₂ 1 → 4, ≈ 4 дахин).', 'For ions of similar size and structure, charge matters more (Q₁Q₂ from 1 to 4, roughly four times as exothermic).'),
      bi('Радиус их → ионууд хол → татах хүч буурна (NaF −918, KF −817).', 'Larger radius → ions further apart → weaker attraction (NaF −918, KF −817).')
    ],
    lessonSteps([
      [
        bi('Өмнөх мэдлэг', 'Do now'),
        bi('LiF −1049 ба MgO −3923 яагаад ялгаатай вэ гэж асууна.', 'Ask why LiF (−1049) and MgO (−3923) differ.'),
        bi('Цэнэг ба радиусыг хэлнэ.', 'Say the charge and the radius.'),
        bi('Хоёр хүчин зүйлийг дурдсан.', 'Both factors named.')
      ],
      [
        bi('Радиус ба цэнэг', 'Radius and charge'),
        bi('Q₁Q₂/r томьёог зурган дээр тайлбарлана (Зураг 19.7).', 'Explain Q₁Q₂/r with the graph of Group 1 halides (Figure 19.7).'),
        bi('Бүлгийн галогенидын ΔH_latt-ийн чиг хандлагыг тайлбарлана.', 'Explain the trend in ΔH_latt for the Group 1 halides.'),
        bi('Радиус ба цэнэгийн тайлбар.', 'Radius and charge explained.')
      ],
      [
        bi('Жишээ: NaCl ба LiCl', 'Worked example: NaCl and LiCl'),
        bi('3 зэрэглэлийн загвар хариултыг харуулна.', 'Show the three-mark model answer.'),
        bi('Холбоос бүрийг сурагчдаар хэлүүлнэ.', 'Students supply each link in the chain.'),
        bi('Логик гинж бүтэн.', 'The logic chain is complete.')
      ],
      [
        bi('Харьцуулах: аль нь илүү сөрөг вэ?', 'Interactive: which is more exothermic?'),
        bi('Хос нэгдлийг харьцуулахыг асууна.', 'Ask students to compare pairs of compounds.'),
        bi('Цэнэг эсвэл радиусыг сонгоно.', 'Choose charge or radius.'),
        bi('Сонголт ба шалтгаан зөв.', 'Choice and reason correct.')
      ],
      [
        bi('Бие даан ба гарах билет', 'You do and exit ticket'),
        bi('Нэгдлүүдийг эрэмбэлж тайлбарлуулна.', 'Ask students to rank compounds and explain.'),
        bi('Эрэмбэлэн тайлбарлана.', 'Rank and explain.'),
        bi('Гарах билетийн оноо.', 'Exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('Group 1 галогенидээс аль нь ΔH_latt хамгийн сөрөг вэ?', 'Which Group 1 halide has the most negative ΔH_latt?'),
        [bi('KF (−817)', 'KF (−817)'), bi('NaF (−918)', 'NaF (−918)'), bi('LiF (−1049)', 'LiF (−1049)')],
        2,
        bi('Li⁺ хамгийн жижиг тул LiF хамгийн их цэнэгийн нягттай.', 'Li⁺ is the smallest ion, so LiF has the highest charge density.')
      ),
      exitItem(
        bi('NaCl яагаад LiCl-ээс бага сөрөг ΔH_latt-тай вэ?', 'Why is NaCl less exothermic than LiCl?'),
        [bi('Na⁺ жижиг радиустай', 'Na⁺ has the smaller radius'), bi('Na⁺ том, цэнэгийн нягт бага', 'Na⁺ is larger, so its charge density is lower'), bi('Cl⁻ цэнэгийн нягт их', 'Cl⁻ has a high charge density'), bi('Тэгш харьцаатай', 'They have equal ratios')],
        1,
        bi('Na⁺ нь Li⁺-аас том; цэнэгийн нягт бага; ионууд холдож татах хүч сул.', 'Na⁺ is larger than Li⁺, so its charge density is lower and the ions sit further apart.')
      ),
      exitItem(
        bi('ΔH_latt-ийг хамгийн их сөрөг болгох хоёр нөхцөл аль вэ?', 'Which two conditions make ΔH_latt most negative?'),
        [bi('Цэнэг бага, радиус их', 'Low charge, large radius'), bi('Цэнэг их, радиус бага', 'High charge, small radius'), bi('Цэнэг их, радиус их', 'High charge, large radius'), bi('Цэнэг бага, радиус бага', 'Low charge, small radius')],
        1,
        bi('Цэнэгийн нягт их → татах хүч их → ΔH_latt илүү сөрөг.', 'High charge density → strong attraction → a more negative ΔH_latt.')
      )
    ]
  ),
  lesson(
    7,
    bi('Ионы поляризаци', 'Ion polarisation'),
    bi(
      'Катионы поляризацын хүчийг тайлбарлах, поляризацыг нэмэгдүүлэх дөрвөн хүчин зүйлийг жагсаах, ковалент шинжийг поляризацтай холбох.',
      'Explain the polarising power of a cation, list four factors that increase polarisation, and link polarisation to covalent character.'
    ),
    [
      bi('Катионы поляризацын хүч: жижиг, өндөр цэнэгтэй катион илүү хүчтэй.', 'Polarising power of a cation: small, highly charged cations are the strongest.'),
      bi('Анионы поляризацагдах чадвар: том, олон цэнэгтэй анион илүү амархан.', 'Polarisability of an anion: large, multiply charged anions are polarised most easily.'),
      bi('Хүчтэй поляризаци → электрон нягт ионуудын хооронд → ковалент шинж (AlCl₃).', 'Strong polarisation → electron density between the ions → covalent character (AlCl₃).')
    ],
    lessonSteps([
      [
        bi('Өмнөх мэдлэг', 'Do now'),
        bi('Li⁺ яагаад Na⁺-аас жижиг вэ гэж асууна.', 'Ask why Li⁺ is smaller than Na⁺.'),
        bi('Бүлгийн хандлагыг хэлнэ.', 'State the trend down the group.'),
        bi('Радиусын хандлага зөв.', 'Radius trend correct.')
      ],
      [
        bi('Поляризацын загвар', 'Polarisation model'),
        bi('Анионыг катионоор гажуудуулах загварыг харуулна (Зураг 19.8).', 'Show a cation distorting an anion (Figure 19.8).'),
        bi('Дөрвөн хүчин зүйлийг жагсаана.', 'List the four factors.'),
        bi('Дөрвөн хүчин зүйл зөв.', 'Four factors correct.')
      ],
      [
        bi('Интерактив: хамгийн хүчтэй поляризатор', 'Interactive: best polariser'),
        bi('Катион ба анионуудыг харьцуулахыг асууна.', 'Ask students to compare cations and anions.'),
        bi('Сонголт ба шалтгааныг хэлнэ.', 'Give the choice and the reason.'),
        bi('Шалтгаан цэнэгийн нягтад холбогдсон.', 'Reason linked to charge density.')
      ],
      [
        bi('Жишээ: Mg²⁺ ба Na⁺, I⁻-тэй', 'Worked example: Mg²⁺ and Na⁺ with I⁻'),
        bi('Гурван зэрэглэлийн загвар хариултыг харуулна.', 'Show the three-mark model answer.'),
        bi('Холбоос бүрийг сурагчдаар хэлүүлнэ.', 'Students supply each link.'),
        bi('Гинж бүтэн.', 'Chain complete.')
      ],
      [
        bi('Бие даан ба гарах билет', 'You do and exit ticket'),
        bi('Поляризацыг тайлбарлаж, таамаглана.', 'Explain polarisation and predict.'),
        bi('Тайлбар ба таамаглал бичнэ.', 'Write the explanation and the prediction.'),
        bi('Гарах билетийн оноо.', 'Exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('Аль катион хамгийн хүчтэй поляризатор вэ?', 'Which cation is the strongest polariser?'),
        [bi('Cs⁺', 'Cs⁺'), bi('K⁺', 'K⁺'), bi('Na⁺', 'Na⁺'), bi('Li⁺', 'Li⁺')],
        3,
        bi('Li⁺ хамгийн жижиг тул цэнэгийн нягт хамгийн их.', 'Li⁺ is the smallest, so its charge density is the highest.')
      ),
      exitItem(
        bi('Mg²⁺ нь Na⁺-аас I⁻-ийг илүү поляризацдаг, учир нь?', 'Mg²⁺ polarises I⁻ more than Na⁺ does. Why?'),
        [bi('Mg²⁺ жижиг ба 2+ цэнэгтэй', 'Mg²⁺ is small and has a 2+ charge'), bi('Mg²⁺ том', 'Mg²⁺ is larger'), bi('Na⁺ илүү цэнэгтэй', 'Na⁺ has a larger charge'), bi('Тэнцүү', 'They are equal')],
        0,
        bi('Жижиг, өндөр цэнэгтэй катион → цэнэгийн нягт их → илүү поляризаци.', 'A small, highly charged cation has a high charge density and polarises more.')
      ),
      exitItem(
        bi('Аль нэгдэл хамгийн ковалент шинжтэй вэ?', 'Which compound has the most covalent character?'),
        [bi('LiF', 'LiF'), bi('LiI', 'LiI'), bi('KF', 'KF'), bi('KI', 'KI')],
        1,
        bi('LiI: жижиг катион ба том анион → анион хамгийн их поляризацагдана.', 'LiI: a small cation and a large anion, so the anion is polarised most.')
      )
    ]
  ),
  lesson(
    8,
    bi('II бүлгийн карбонат ба нитрат', 'Group 2 carbonates and nitrates'),
    bi(
      'II бүлгийн карбонат ба нитратын задралын тэгшитгэлийг бичих; дулааны тогтвортой байдлын чиг хандлагыг таван алхамт поляризацын гинжээр тайлбарлах.',
      'Write the decomposition equations for Group 2 carbonates and nitrates, and explain the trend in thermal stability with a five-step polarisation chain.'
    ),
    [
      bi('MCO₃(s) → MO(s) + CO₂(g); 2M(NO₃)₂(s) → 2MO(s) + 4NO₂(g) + O₂(g).', 'MCO₃(s) → MO(s) + CO₂(g); 2M(NO₃)₂(s) → 2MO(s) + 4NO₂(g) + O₂(g).'),
      bi('Бүлгийн доош тогтвортой байдал нэмэгдэнэ: MgCO₃ 540 °C-д, BaCO₃ 1360 °C-д задарна.', 'Thermal stability increases down the group: MgCO₃ decomposes at 540 °C, BaCO₃ at 1360 °C.'),
      bi('Жижиг катион → анионыг поляризацна → C–O (N–O) холбоо сулрах → бага температурт задарна.', 'Small cation → polarises the anion → the C–O (N–O) bond weakens → decomposition at a lower temperature.')
    ],
    lessonSteps([
      [
        bi('Өмнөх мэдлэг', 'Do now'),
        bi('AS-ийн II бүлгийн тэгшитгэлүүдийг асууна.', 'Ask for the AS Group 2 equations.'),
        bi('Карбонатын задралыг бичнэ.', 'Write the carbonate decomposition.'),
        bi('Тэгшитгэл зөв.', 'Equations correct.')
      ],
      [
        bi('Карбонат: Хүснэгт 19.2', 'Carbonates: Table 19.2'),
        bi('Задралын температур ба ΔH_r-ийн хүснэгтийг тайлбарлана.', 'Explain the table of decomposition temperatures and ΔH_r.'),
        bi('Хүснэгтээс чиг хандлагыг олно.', 'Find the trend from the table.'),
        bi('Чиг хандлага зөв.', 'Trend correct.')
      ],
      [
        bi('Жишээ: MgCO₃ ба BaCO₃ [5]', 'Worked example: MgCO₃ and BaCO₃ [5]'),
        bi('Таван алхамт загвар хариултыг харуулна.', 'Show the five-step model answer.'),
        bi('Сурагч гинжийн холбоос бүрийг хэлнэ.', 'Students supply each link of the chain.'),
        bi('Гинж бүтэн.', 'Chain complete.')
      ],
      [
        bi('Нитрат: тэгшитгэл ба чиг хандлага', 'Nitrates: equation and trend'),
        bi('Нитратын задралын тэгшитгэлийг бичүүлнэ.', 'Ask students to write the nitrate decomposition.'),
        bi('Ca(NO₃)₂-ийн тэгшитгэлийг тэнцвэржүүлнэ.', 'Balance the equation for Ca(NO₃)₂.'),
        bi('Тэнцвэртэй тэгшитгэл.', 'Balanced equation.')
      ],
      [
        bi('Интерактив ба гарах билет', 'Interactive and exit ticket'),
        bi('Аль нь амар задрах вэ гэдгийг таамаглуулна.', 'Ask students to predict which decomposes more easily.'),
        bi('Таамаглал ба шалтгааныг хэлнэ.', 'Give the prediction and the reason.'),
        bi('Гарах билетийн оноо.', 'Exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('II бүлгийн аль карбонат хамгийн тогтвортой вэ?', 'Which Group 2 carbonate is the most thermally stable?'),
        [bi('MgCO₃', 'MgCO₃'), bi('CaCO₃', 'CaCO₃'), bi('SrCO₃', 'SrCO₃'), bi('BaCO₃', 'BaCO₃')],
        3,
        bi('Бүлгийн доош тогтвортой байдал нэмэгдэнэ; Ba²⁺ хамгийн том, поляризаци хамгийн бага.', 'Stability increases down the group; Ba²⁺ is the largest, so it polarises the anion least.')
      ),
      exitItem(
        bi('Mg(NO₃)₂ яагаад Ba(NO₃)₂-аас бага температурт задардаг вэ?', 'Why does Mg(NO₃)₂ decompose at a lower temperature than Ba(NO₃)₂?'),
        [bi('Mg²⁺ жижиг, цэнэгийн нягт их → NO₃⁻-ийг их поляризацна', 'Mg²⁺ is small with a high charge density, so it polarises NO₃⁻ more'), bi('Mg²⁺ том', 'Mg²⁺ is larger'), bi('NO₃⁻ жижиг', 'NO₃⁻ is small'), bi('Mg нь металл биш', 'Mg is not a metal')],
        0,
        bi('Жижиг Mg²⁺ NO₃⁻-ийн N–O холбоог сулруулна.', 'The small Mg²⁺ weakens the N–O bond in NO₃⁻.')
      ),
      exitItem(
        bi('Ca(NO₃)₂-ийн задралын зөв тэгшитгэл аль нь вэ?', 'Which is the correct decomposition equation for Ca(NO₃)₂?'),
        [bi('Ca(NO₃)₂ → CaO + NO₂ + O₂', 'Ca(NO₃)₂ → CaO + NO₂ + O₂'), bi('2Ca(NO₃)₂ → 2CaO + 4NO₂ + O₂', '2Ca(NO₃)₂ → 2CaO + 4NO₂ + O₂'), bi('Ca(NO₃)₂ → Ca + 2NO₂ + O₂', 'Ca(NO₃)₂ → Ca + 2NO₂ + O₂'), bi('2Ca(NO₃)₂ → 2CaO + NO₂', '2Ca(NO₃)₂ → 2CaO + NO₂')],
        1,
        bi('Тэнцвэртэй: 2 Ca, 4 N, 12 O зүүн ба баруун талд.', 'Balanced: 2 Ca, 4 N and 12 O on each side.')
      )
    ]
  )
];

export const LATTICE_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'latt-5': [
    term(bi('диспропорционлол', 'disproportionation'), bi('Нэг бодис зэрэг исэлдэж, ангижирна (жишээ нь MgCl).', 'One substance is both oxidised and reduced at the same time (for example MgCl).')),
    term(bi('синоптик холбоос', 'synoptic link'), bi('Өмнөх бүлгийн мэдлэгийг энэ бүлэгт холбох (жишээ нь AS Ch2, Ch6).', 'Linking knowledge from an earlier chapter to this one (for example AS Ch2, Ch6).')),
    term(bi('тогтворгүй нэгдэл', 'unstable compound'), bi('Задарч өөр нэгдэл үүсгэх чадвартай нэгдэл.', 'A compound that breaks down to form other compounds.'))
  ],
  'latt-6': [
    term(bi('цэнэгийн нягт', 'charge density'), bi('Цэнэг ÷ эзлэхүүн; жижиг, өндөр цэнэгтэй ион → өндөр.', 'Charge ÷ volume; small, highly charged ions have a high charge density.')),
    term(bi('ионы радиус', 'ionic radius'), bi('Ионы цөмөөс хамгийн гадны электрон хүртэлх зай.', 'The distance from the nucleus of an ion to its outermost electrons.')),
    term(bi('цахилгаан статик татах хүч', 'electrostatic attraction'), bi('Эсрэг цэнэгтэй ионы хоорондох татах хүч.', 'The attraction between oppositely charged ions.'))
  ],
  'latt-7': [
    term(bi('поляризацын хүч', 'polarising power'), bi('Катионы анионы электрон үүлийг гажуудуулах чадвар.', 'A cation’s ability to distort the electron cloud of an anion.')),
    term(bi('поляризацагдах чадвар', 'polarisability'), bi('Анионы электрон үүлийг катионд гажуудуулах хэмжээ.', 'How easily an anion’s electron cloud is distorted.')),
    term(bi('ковалент шинж', 'covalent character'), bi('Ионы холбоонд электрон нягтыг хоёр бөөмд хуваах шинж.', 'The sharing of electron density between two particles in an ionic bond.'))
  ],
  'latt-8': [
    term(bi('дулааны тогтвортой байдал', 'thermal stability'), bi('Халааж задрахад эсэргүүцэх чадвар.', 'Resistance to decomposition on heating.')),
    term(bi('дулааны задрал', 'thermal decomposition'), bi('Халааснаар нэгдэл жижиг бодисууд болж задрах урвал.', 'A reaction in which heating breaks a compound into smaller substances.'))
  ]
};

export const LATTICE_PRACTICE_B: Record<string, PracticeItem[]> = {
  'latt-5': [
    easy(
      bi('ΔH_latt-ийг олох зөв томьёо аль нь вэ?', 'Which formula gives ΔH_latt?'),
      [bi('ΔH_latt = ΔH_f + ΔH₁', 'ΔH_latt = ΔH_f + ΔH₁'), bi('ΔH_latt = ΔH_f − ΔH₁', 'ΔH_latt = ΔH_f − ΔH₁'), bi('ΔH_latt = ΔH₁ − ΔH_f', 'ΔH_latt = ΔH₁ − ΔH_f'), bi('ΔH_latt = −ΔH_f', 'ΔH_latt = −ΔH_f')],
      1,
      bi('Гессийн хуулиар ΔH_f = ΔH₁ + ΔH_latt.', 'By Hess’s law, ΔH_f = ΔH₁ + ΔH_latt.')
    ),
    hard(
      bi('MgCl₂-ийн ΔH_latt = −2523, ΔH₁ = +1882 кЖ моль⁻¹ бол ΔH_f-ийг тооцоол.', 'For MgCl₂ with ΔH_latt = −2523 and ΔH₁ = +1882 kJ mol⁻¹, calculate ΔH_f.'),
      bi('ΔH_f = ΔH₁ + ΔH_latt = +1882 + (−2523) = −641 кЖ моль⁻¹.', 'ΔH_f = ΔH₁ + ΔH_latt = +1882 + (−2523) = −641 kJ mol⁻¹.'),
      bi('Гессийн тэгшитгэлийг тэмдгийн хамт нийлүүлнэ.', 'Add the Hess terms with their signs.')
    )
  ],
  'latt-6': [
    easy(
      bi('Аль ион хамгийн өндөр цэнэгийн нягттай вэ?', 'Which ion has the highest charge density?'),
      [bi('Na⁺', 'Na⁺'), bi('Mg²⁺', 'Mg²⁺'), bi('K⁺', 'K⁺')],
      1,
      bi('Mg²⁺: цэнэг 2+ ба радиус бага.', 'Mg²⁺: charge 2+ and a small radius.')
    ),
    hard(
      bi('MgO ба LiF-ийн ΔH_latt-ийг харьцуулж, цэнэг ба радиусаар тайлбарлана уу [3].', 'Compare the ΔH_latt of MgO and LiF and explain with charge and radius [3].'),
      bi('MgO нь 2+/2− цэнэгтэй, LiF 1+/1−; цэнэг их → цэнэгийн нягт их → татах хүч их → MgO илүү сөрөг (−3923 ба −1049).', 'MgO has 2+/2− ions and LiF has 1+/1− ions; higher charge → higher charge density → stronger attraction → MgO is more negative (−3923 against −1049).'),
      bi('Цэнэг → цэнэгийн нягт → татах хүч гэсэн гинж.', 'The chain: charge → charge density → attraction.')
    )
  ],
  'latt-7': [
    easy(
      bi('Аль катион анионыг хамгийн их поляризацдаг вэ?', 'Which cation polarises an anion most?'),
      [bi('K⁺', 'K⁺'), bi('Al³⁺', 'Al³⁺'), bi('Na⁺', 'Na⁺')],
      1,
      bi('Al³⁺: 3+ цэнэгтэй ба жижиг.', 'Al³⁺: 3+ charge and small.')
    ),
    hard(
      bi('FeCl₃ ба FeCl₂-ын аль нь илүү ковалент вэ? Тайлбарлана уу.', 'Which is more covalent, FeCl₃ or FeCl₂? Explain.'),
      bi('FeCl₃: Fe³⁺ илүү өндөр цэнэгтэй, жижиг тул Cl⁻-ийг илүү поляризацдаг.', 'FeCl₃: Fe³⁺ has a higher charge and is smaller, so it polarises Cl⁻ more.'),
      bi('Цэнэг ба радиусын холбоос.', 'The link between charge and radius.')
    )
  ],
  'latt-8': [
    easy(
      bi('MgCO₃ ба BaCO₃-ын аль нь илүү эрт задрах вэ?', 'Which decomposes more easily on heating, MgCO₃ or BaCO₃?'),
      [bi('BaCO₃', 'BaCO₃'), bi('MgCO₃', 'MgCO₃'), bi('Тэнцүү', 'Equal')],
      1,
      bi('Жижиг Mg²⁺ CO₃²⁻-г илүү поляризацдаг.', 'The small Mg²⁺ polarises CO₃²⁻ more.')
    ),
    hard(
      bi('BaCO₃ яагаад илүү тогтвортой вэ? Таван алхамт гинжээр бичнэ үү [5].', 'Why is BaCO₃ more stable? Give a five-step chain [5].'),
      bi('CO₃²⁻ том анион → поляризацагдана; Mg²⁺ жижиг → цэнэгийн нягт их → илүү поляризаци; C–O холбоо сулрана; CO₂ бага T-д гарна. Ba²⁺ том, поляризаци бага → тогтвортой.', 'CO₃²⁻ is a large anion and polarises easily; Mg²⁺ is small with a high charge density and polarises more; the C–O bond weakens and CO₂ is released at a lower temperature. Ba²⁺ is large and polarises less, so BaCO₃ is more stable.'),
      bi('Таван холбоосыг дараалалтай бичнэ.', 'Write the five links in order.')
    )
  ]
};
