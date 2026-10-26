// 9701 A Level chapter 19 (lattice energy and Born–Haber cycles), lessons 9–12 of 12 (see latticeLessonsA.ts).
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

export const LATTICE_LESSONS_C: StatesLesson[] = [
  lesson(
    9,
    bi('Уусалтын ба усжилтын энтальпи', 'Enthalpies of solution and hydration'),
    bi(
      'ΔH_sol ба ΔH_hyd-ийг тодорхойлж тэдгээрийн томьёог бичих, ΔH_hyd үргэлж сөрөг байдгийг тайлбарлах, цэнэг ба радиусын нөлөөг ΔH_hyd-д тайлбарлах.',
      'Define ΔH_sol and ΔH_hyd and write their equations, explain why ΔH_hyd is always negative, and explain the effect of charge and radius on ΔH_hyd.'
    ),
    [
      bi('ΔH_sol: 1 моль ионы хатуу бодис хангалттай усанд маш шингэн уусмал болох энтальпи.', 'ΔH_sol: the enthalpy change when 1 mol of an ionic solid dissolves in enough water to form a very dilute solution.'),
      bi('ΔH_hyd: 1 моль хийн ион усанд уусах энтальпи; ион–дипольн холбоо үүсэх тул үргэлж сөрөг.', 'ΔH_hyd: the enthalpy change when 1 mol of gaseous ions dissolves in water; always negative because ion–dipole bonds form.'),
      bi('Жижиг радиус, өндөр цэнэг → ΔH_hyd илүү сөрөг (Mg²⁺ −1920, K⁺ −322).', 'Smaller radius and higher charge → a more negative ΔH_hyd (Mg²⁺ −1920, K⁺ −322).')
    ],
    lessonSteps([
      [
        bi('Өмнөх мэдлэг', 'Do now'),
        bi('Яагаад NaCl усанд уусдаг вэ гэж асууна.', 'Ask why NaCl dissolves in water.'),
        bi('Ион ба туйлт усны харилцааг хэлнэ.', 'Describe ions and polar water.'),
        bi('Туйлт ус ба ион хоёулаа дурдсан.', 'Both polar water and ions mentioned.')
      ],
      [
        bi('ΔH_sol', 'ΔH_sol'),
        bi('ΔH_sol-ийн тодорхойлолт, тэмдэг, уусах чадварыг тайлбарлана.', 'Explain the definition, sign and solubility of ΔH_sol.'),
        bi('NaCl (+3.9) ба AgCl (+65.7)-ийн утгыг харьцуулна.', 'Compare NaCl (+3.9) with AgCl (+65.7).'),
        bi('Жижиг эерэг утга ихэвчлэн уусна гэсэн дүгнэлт.', 'Conclusion that a small positive value means the salt is likely soluble.')
      ],
      [
        bi('ΔH_hyd', 'ΔH_hyd'),
        bi('Ион–дипольн холбоо ба ΔH_hyd-ийн хүчин зүйлийг тайлбарлана.', 'Explain ion–dipole bonds and the factors affecting ΔH_hyd.'),
        bi('Li⁺, Mg²⁺, Cl⁻-ийн ΔH_hyd-ийг эрэмбэлнэ.', 'Rank the ΔH_hyd values of Li⁺, Mg²⁺ and Cl⁻.'),
        bi('Эрэмбэ зөв (Mg²⁺ хамгийн сөрөг).', 'Order correct (Mg²⁺ is the most negative).')
      ],
      [
        bi('Энтальпийн өөрчлөлтийн нэр', 'Name the enthalpy change'),
        bi('KBr(s) + aq, Br⁻(g) + aq гэх мэт өөрчлөлтийн нэрийг асууна.', 'Ask students to name each change, such as KBr(s) + aq and Br⁻(g) + aq.'),
        bi('Эхлэл ба төгсгөлийн төлөвийг хэлнэ.', 'State the start and end states.'),
        bi('Төлөв ба нэр зөв.', 'States and names correct.')
      ],
      [
        bi('Бие даан ба гарах билет', 'You do and exit ticket'),
        bi('Mg²⁺ ба K⁺-ийн ΔH_hyd-ийг тайлбарлуулна.', 'Ask students to explain ΔH_hyd for Mg²⁺ and K⁺.'),
        bi('Тайлбар бичиж, гарах билетийг бөглөнө.', 'Write the explanation and complete the exit ticket.'),
        bi('Гарах билетийн оноо.', 'Exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('ΔH_hyd яагаад үргэлж сөрөг вэ?', 'Why is ΔH_hyd always negative?'),
        [bi('Ион–дипольн холбоо үүсч энерги ялгардаг', 'Ion–dipole bonds form and energy is released'), bi('Ион хуваагддаг', 'The ion splits'), bi('Ус халдаг', 'The water heats up'), bi('Цэнэг алддаг', 'The charge is lost')],
        0,
        bi('Ион ба туйлт усны молекулын хооронд холбоо үүсэх тул энерги ялгардаг.', 'Bonds form between the ion and polar water molecules, so energy is released.')
      ),
      exitItem(
        bi('Аль ионы ΔH_hyd хамгийн сөрөг вэ?', 'Which ion has the most negative ΔH_hyd?'),
        [bi('K⁺ (−322)', 'K⁺ (−322)'), bi('Na⁺ (−406)', 'Na⁺ (−406)'), bi('Mg²⁺ (−1920)', 'Mg²⁺ (−1920)'), bi('Li⁺ (−519)', 'Li⁺ (−519)')],
        2,
        bi('Mg²⁺ жижиг ба 2+ цэнэгтэй тул цэнэгийн нягт хамгийн их.', 'Mg²⁺ is small with a 2+ charge, so its charge density is the highest.')
      ),
      exitItem(
        bi('NaCl-ийн ΔH_sol = +3.9 кЖ моль⁻¹. Энэ нь юуг илэрхийлэх вэ?', 'The ΔH_sol of NaCl is +3.9 kJ mol⁻¹. What does this suggest?'),
        [bi('Ус өөрөө халдаг', 'The water heats up by itself'), bi('Жижиг эерэг утга → ихэвчлэн уусна', 'A small positive value → the salt is likely soluble'), bi('Бодис задрахгүй', 'The salt does not decompose'), bi('Уусах боломжгүй', 'It cannot dissolve')],
        1,
        bi('Жижиг эсвэл сөрөг ΔH_sol ихэвчлэн уусах чадвартай байдаг (NaCl +3.9).', 'A small or negative ΔH_sol usually means good solubility (NaCl +3.9).')
      )
    ]
  ),
  lesson(
    10,
    bi('Уусалтын энергийн цикл', 'The solution energy cycle'),
    bi(
      'ΔH_latt, ΣΔH_hyd, ΔH_sol-ийн циклийг барих, гурвын аль нэгийг тооцоолох, калориметрийн өгөгдлөөс ΔH_sol олох.',
      'Construct the cycle linking ΔH_latt, ΣΔH_hyd and ΔH_sol, calculate any one of the three, and find ΔH_sol from calorimetry data.'
    ),
    [
      bi('ΔH_latt + ΔH_sol = ΣΔH_hyd → ΔH_sol = ΣΔH_hyd − ΔH_latt.', 'ΔH_latt + ΔH_sol = ΣΔH_hyd, so ΔH_sol = ΣΔH_hyd − ΔH_latt.'),
      bi('ΣΔH_hyd = катионы ΔH_hyd + анионы ΔH_hyd (тоо нь томьёогоор).', 'ΣΔH_hyd = ΔH_hyd of the cation + ΔH_hyd of the anion (multiplied by the numbers in the formula).'),
      bi('ΔH_sol жижиг байх нь хоёр том утгын зөрүү учраас.', 'ΔH_sol is often small because it is the difference between two large values.')
    ],
    lessonSteps([
      [
        bi('Цикл', 'The cycle'),
        bi('Торын энерги ба уусалтын хоёр замыг зурна.', 'Draw the two routes from gaseous ions.'),
        bi('ΔH_latt + ΔH_sol = ΣΔH_hyd гэдгийг бичнэ.', 'Write ΔH_latt + ΔH_sol = ΣΔH_hyd.'),
        bi('Цикл зөв.', 'Cycle correct.')
      ],
      [
        bi('Жишээ: NaF-ийн ΔH_sol', 'Worked example: ΔH_sol of NaF'),
        bi('ΔH_sol = ΣΔH_hyd − ΔH_latt гэдгийг үзүүлнэ.', 'Show ΔH_sol = ΣΔH_hyd − ΔH_latt.'),
        bi('Алхам бүрийг тооцоолно.', 'Calculate each step.'),
        bi('Хариу −10 кЖ моль⁻¹.', 'Answer −10 kJ mol⁻¹.')
      ],
      [
        bi('Жишээ: Cl⁻-ийн ΔH_hyd', 'Worked example: ΔH_hyd of Cl⁻'),
        bi('LiCl-ийн өгөгдлөөс ΔH_hyd(Cl⁻)-ийг гаргана.', 'Find ΔH_hyd(Cl⁻) from the LiCl data.'),
        bi('Гессийн тэгшитгэлийг шийдэж тооцоолно.', 'Solve the Hess equation.'),
        bi('Хариу −364 кЖ моль⁻¹.', 'Answer −364 kJ mol⁻¹.')
      ],
      [
        bi('Paper 5: NaOH калориметр', 'Paper 5 skills: NaOH calorimetry'),
        bi('Виртуал туршилтын үр дүнг ΔH_sol-ийн утга руу хөрвүүлнэ.', 'Turn the virtual-lab results into ΔH_sol.'),
        bi('q = mcΔT, n, ΔH_sol-ийг тооцоолж, алдааг үнэлнэ.', 'Calculate q = mcΔT, n and ΔH_sol, and assess the errors.'),
        bi('ΔH_sol ≈ −40 кЖ моль⁻¹; алдааг тайлбарласан.', 'ΔH_sol ≈ −40 kJ mol⁻¹; errors explained.')
      ],
      [
        bi('Бие даан ба гарах билет', 'You do and exit ticket'),
        bi('Тооцооны асуудал ба синоптик асуултыг өгнө.', 'Give calculation and synoptic problems.'),
        bi('Бие даан бодно.', 'Solve them independently.'),
        bi('Гарах билетийн оноо.', 'Exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('NaF: ΔH_latt = −902, ΔH_hyd(Na⁺) = −406, ΔH_hyd(F⁻) = −506 кЖ моль⁻¹. ΔH_sol хэд вэ?', 'NaF: ΔH_latt = −902, ΔH_hyd(Na⁺) = −406, ΔH_hyd(F⁻) = −506 kJ mol⁻¹. What is ΔH_sol?'),
        [bi('−10', '−10'), bi('+10', '+10'), bi('−1908', '−1908'), bi('+1908', '+1908')],
        0,
        bi('ΔH_sol = (−406) + (−506) − (−902) = −10 кЖ моль⁻¹.', 'ΔH_sol = (−406) + (−506) − (−902) = −10 kJ mol⁻¹.')
      ),
      exitItem(
        bi('Уусалтад ус халдаг (экзотерм) бол ΔH_sol-ийн тэмдэг хэд вэ?', 'If the solution warms up (exothermic), what is the sign of ΔH_sol?'),
        [bi('Сөрөг', 'Negative'), bi('Эерэг', 'Positive'), bi('Тэг', 'Zero'), bi('Тодорхойгүй', 'Cannot be determined')],
        0,
        bi('Дулаан ялгарсан тул ΔH_sol сөрөг (NaOH жишээ).', 'Heat is released, so ΔH_sol is negative (the NaOH example).')
      ),
      exitItem(
        bi('Калориметрийн туршилтын гол алдаа аль нь вэ?', 'What is the main source of error in the calorimetry experiment?'),
        [bi('Дулааны алдагдал', 'Heat loss'), bi('Хөдөлгөөн', 'Motion'), bi('Гэрэл', 'Light'), bi('Агаарын даралт', 'Air pressure')],
        0,
        bi('Удаан уусах үед дулаан орчинд алдагдана; тагтай сав, экстраполяц ашиглана.', 'Heat is lost to the surroundings while the solid dissolves slowly; use a lid and extrapolate the cooling curve.')
      )
    ]
  ),
  lesson(
    11,
    bi('II бүлгийн сульфат ба гидроксид', 'Group 2 sulfates and hydroxides'),
    bi(
      'II бүлгийн сульфат ба гидроксидын уусах чадварын чиг хандлагыг ΔH_latt ба ΔH_hyd-ийн өөрчлөлтөөр тайлбарлах; харьцуулах бүрэн оноотой хариулт бичих.',
      'Explain the solubility trends of Group 2 sulfates and hydroxides from the changes in ΔH_latt and ΔH_hyd, and write a full-mark comparison answer.'
    ),
    [
      bi('Сульфат: бүлгийн доош уусах чадвар буурна (MgSO₄ 1.83 → BaSO₄ 9.43 × 10⁻⁶ моль дм⁻³).', 'Sulfates: solubility falls down the group (MgSO₄ 1.83 → BaSO₄ 9.43 × 10⁻⁶ mol dm⁻³).'),
      bi('Гидроксид: бүлгийн доош уусах чадвар нэмэгдэнэ (Mg(OH)₂ бага → Ba(OH)₂ их).', 'Hydroxides: solubility rises down the group (Mg(OH)₂ sparingly soluble → Ba(OH)₂ fairly soluble).'),
      bi('Том анион (SO₄²⁻): ΔH_hyd-ийн өөрчлөлт давамгайлна. Жижиг анион (OH⁻): ΔH_latt-ийн өөрчлөлт давамгайлна.', 'Large anion (SO₄²⁻): the change in ΔH_hyd dominates. Small anion (OH⁻): the change in ΔH_latt dominates.')
    ],
    lessonSteps([
      [
        bi('Өмнөх мэдлэг', 'Do now'),
        bi('ΔH_sol = ΣΔH_hyd − ΔH_latt-ийг асууна.', 'Ask for ΔH_sol = ΣΔH_hyd − ΔH_latt.'),
        bi('Томьёог дахин хэлнэ.', 'Restate the formula.'),
        bi('Томьёо зөв.', 'Formula correct.')
      ],
      [
        bi('Сульфатууд', 'Sulfates'),
        bi('Катионы ΔH_hyd их өөрчлөгдөж, анионы ΔH_latt бага өөрчлөгдөхийг тайлбарлана.', 'Explain that ΔH_hyd changes a lot while ΔH_latt changes little for sulfates.'),
        bi('Бүлгийн доош уусах чадвар буурах шалтгааныг хэлнэ.', 'Give the reason solubility falls down the group.'),
        bi('ΔH_sol илүү эндотерм болно гэсэн дүгнэлт.', 'Conclusion that ΔH_sol becomes more endothermic.')
      ],
      [
        bi('Гидроксидууд', 'Hydroxides'),
        bi('Эсрэг чиг хандлагыг (жижиг OH⁻) тайлбарлана.', 'Explain the opposite trend for hydroxides (small OH⁻).'),
        bi('ΔH_latt-ийн их буурахыг харьцуулна.', 'Compare the large fall in ΔH_latt.'),
        bi('Уусах чадвар нэмэгдэнэ гэсэн дүгнэлт.', 'Conclusion that solubility increases.')
      ],
      [
        bi('Жишээ: MgSO₄ ба BaSO₄ [4]', 'Worked example: MgSO₄ and BaSO₄ [4]'),
        bi('Дөрвөн үндэслэлтэй загвар хариултыг харуулна.', 'Show the four-mark model answer.'),
        bi('Алхам бүрийг сурагчаар хэлүүлнэ.', 'Students supply each step.'),
        bi('Гинж бүтэн.', 'Chain complete.')
      ],
      [
        bi('Бие даан ба хүчтэй асуулт', 'You do and hinge question'),
        bi('Тайлбар ба хүчтэй асуултыг өгнө.', 'Give the explanation and the hinge question.'),
        bi('Бие даан бичнэ.', 'Write independently.'),
        bi('Гарах билетийн оноо.', 'Exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('Бүлгийн доош MgSO₄ → BaSO₄-ийн уусах чадвар хэрхэн өөрчлөгдөх вэ?', 'How does solubility change from MgSO₄ to BaSO₄ down the group?'),
        [bi('Буурна', 'Falls'), bi('Нэмэгдэнэ', 'Rises'), bi('Тогтмол', 'Stays the same'), bi('Тодорхойгүй', 'Cannot be determined')],
        0,
        bi('ΔH_hyd(M²⁺) их өөрчлөгдөж, ΔH_sol илүү эндотерм болно.', 'ΔH_hyd(M²⁺) changes a lot and ΔH_sol becomes more endothermic.')
      ),
      exitItem(
        bi('Ba(OH)₂ яагаад Ca(OH)₂-оос илүү уусдаг вэ?', 'Why is Ba(OH)₂ more soluble than Ca(OH)₂?'),
        [bi('OH⁻ жижиг → ΔH_latt их буурдаг → ΔH_sol бага эндотерм', 'OH⁻ is small → ΔH_latt falls a lot → ΔH_sol is less endothermic'), bi('OH⁻ том', 'OH⁻ is large'), bi('Ba²⁺ жижиг', 'Ba²⁺ is small'), bi('Ca(OH)₂ хий', 'Ca(OH)₂ is a gas')],
        0,
        bi('Жижиг анион ΔH_latt-ийг радиусаар их өөрчлөх тул ΔH_sol бага эндотерм болно.', 'A small anion makes ΔH_latt change a lot with radius, so ΔH_sol becomes less endothermic.')
      ),
      exitItem(
        bi('Бүлгийн доош сульфатын уусах чадварт аль өөрчлөлт илүү нөлөөлөх вэ?', 'Down the group, which change affects the solubility of sulfates more?'),
        [bi('ΔH_latt', 'ΔH_latt'), bi('ΔH_hyd (катион)', 'ΔH_hyd (cation)'), bi('Тэнцүү', 'Equal'), bi('Огт үгүй', 'Neither')],
        1,
        bi('Катионы ΔH_hyd их өөрчлөгдөнө; SO₄²⁻ том тул ΔH_latt бага өөрчлөгдөнө.', 'The cation’s ΔH_hyd changes a lot; SO₄²⁻ is large, so ΔH_latt changes little.')
      )
    ]
  ),
  lesson(
    12,
    bi('Paper 4 дасгал ба дүгнэлт', 'Paper 4 practice and review'),
    bi(
      'Paper 4-ийн асуултуудыг цаг хязгаартай хийх, хэм хэмжээний хэлийг хэрэглэх, түгээмэл алдааг олж засах.',
      'Answer Paper 4 questions under time, apply the mark-scheme language, and spot and fix common errors.'
    ),
    [
      bi('Тодорхойлолтыг үгчилж бичнэ: 1 моль, хийн ион, хатуу тор, стандарт нөхцөл.', 'Write the definition word for word: 1 mol, gaseous ions, solid lattice, standard conditions.'),
      bi('Бүх тооцоонд тэмдгийг хадгалж, цикл гаргана.', 'Keep the signs in every calculation and draw the cycle.'),
      bi('"Explain" асуултад хоёр ионыг харьцуулж нэрлэнэ (жишээ: Mg²⁺ ба Ba²⁺).', 'In an explain question, name both ions being compared (for example Mg²⁺ and Ba²⁺).')
    ],
    lessonSteps([
      [
        bi('Paper 4: асуулт 1', 'Paper 4 practice: Question 1 [12]'),
        bi('CaF₂-ийн Борн–Хабер асуултыг цаг хязгаартай өгнө.', 'Set the Born–Haber question for CaF₂ under timed conditions.'),
        bi('Тодорхойлолт, EA₁, ΔH_latt-ийг бичнэ.', 'Write the definition, EA₁ and ΔH_latt.'),
        bi('Асуулт 1 дууссан.', 'Question 1 completed.')
      ],
      [
        bi('Paper 4: асуулт 2', 'Paper 4 practice: Question 2 [11]'),
        bi('NaCl-ийн уусалтын асуултыг өгнө.', 'Set the NaCl solution question.'),
        bi('ΔH_sol-ийг тооцоолж, MgSO₄-ийн уусах чадварыг тайлбарлана.', 'Calculate ΔH_sol and explain the solubility of MgSO₄.'),
        bi('Асуулт 2 дууссан.', 'Question 2 completed.')
      ],
      [
        bi('Paper 4: асуулт 3', 'Paper 4 practice: Question 3 [10]'),
        bi('Стронцийн нитратын задралын асуултыг өгнө.', 'Set the strontium nitrate question.'),
        bi('Тэгшитгэл, задралын температур, массыг тооцоолно.', 'Write the equation, explain the temperature and calculate the mass.'),
        bi('Асуулт 3 дууссан.', 'Question 3 completed.')
      ],
      [
        bi('Алдаа олох ба зөвлөмж', 'Spot the error and exam tips'),
        bi('Алдааны жагсаалт ба шалгалтын зөвлөмжийг өгнө.', 'Give the error list and the exam tips.'),
        bi('Алдааг нэрлэж засна.', 'Name and correct each error.'),
        bi('Алдаа зөв засагдсан.', 'Errors corrected.')
      ],
      [
        bi('Дүгнэлт ба өөрийгөө үнэлэх', 'Summary and self-evaluation'),
        bi('Дүгнэлт ба гарах билетийг өгнө.', 'Give the summary and the exit ticket.'),
        bi('Суралцах зорилго бүрийг үнэлнэ.', 'Rate each learning intention.'),
        bi('Гарах билетийн оноо.', 'Exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('CaF₂-ийн ΔH_f = −1228, ΔH₁ = +1415 кЖ моль⁻¹. ΔH_latt хэд вэ?', 'For CaF₂: ΔH_f = −1228 and ΔH₁ = +1415 kJ mol⁻¹. What is ΔH_latt?'),
        [bi('−2643', '−2643'), bi('+2643', '+2643'), bi('−187', '−187'), bi('+187', '+187')],
        0,
        bi('ΔH_latt = ΔH_f − ΔH₁ = −1228 − 1415 = −2643 кЖ моль⁻¹.', 'ΔH_latt = ΔH_f − ΔH₁ = −1228 − 1415 = −2643 kJ mol⁻¹.')
      ),
      exitItem(
        bi('Аль нь илүү ковалент шинжтэй вэ: CaF₂ эсвэл CaI₂?', 'Which has more covalent character, CaF₂ or CaI₂?'),
        [bi('CaF₂', 'CaF₂'), bi('CaI₂', 'CaI₂'), bi('Тэнцүү', 'Equal'), bi('Хэн ч биш', 'Neither')],
        1,
        bi('I⁻ том тул Ca²⁺-д амархан поляризацагдана.', 'I⁻ is large and is easily polarised by Ca²⁺.')
      ),
      exitItem(
        bi('2.12 г Sr(NO₃)₂ (Mr 211.6) бүрэн задрахад үлдэх SrO-ийн масс хэд вэ? (Mr SrO 103.6)', 'When 2.12 g Sr(NO₃)₂ (Mr 211.6) decomposes completely, what mass of SrO is left? (Mr SrO 103.6)'),
        [bi('1.04 г', '1.04 g'), bi('2.12 г', '2.12 g'), bi('0.53 г', '0.53 g'), bi('1.08 г', '1.08 g')],
        0,
        bi('n = 0.01002 моль → SrO 1.04 г; алдагдсан масс 1.08 г.', 'n = 0.01002 mol → 1.04 g of SrO; the mass lost is 1.08 g.')
      )
    ]
  )
];

export const LATTICE_GLOSSARY_C: Record<string, GlossaryTerm[]> = {
  'latt-9': [
    term(bi('уусалтын энтальпи (ΔH_sol)', 'enthalpy change of solution (ΔH_sol)'), bi('1 моль ионы хатуу бодис хангалттай усанд маш шингэн уусмал болох энтальпи.', 'The enthalpy change when 1 mol of an ionic solid dissolves in enough water to give a very dilute solution.')),
    term(bi('усжилтын энтальпи (ΔH_hyd)', 'enthalpy change of hydration (ΔH_hyd)'), bi('1 моль хийн ион усанд уусах энтальпи; үргэлж сөрөг.', 'The enthalpy change when 1 mol of gaseous ions dissolves in water; always negative.')),
    term(bi('ион–дипольн холбоо', 'ion–dipole bond'), bi('Ион ба туйлт усны молекулын хоорондох татах холбоо.', 'The attraction between an ion and a polar water molecule.'))
  ],
  'latt-10': [
    term(bi('уусалтын цикл', 'solution cycle'), bi('ΔH_latt, ΣΔH_hyd, ΔH_sol-ийг холбосон энергийн цикл.', 'An energy cycle linking ΔH_latt, ΣΔH_hyd and ΔH_sol.')),
    term(bi('калориметр', 'calorimetry'), bi('Дулааныг хэмжих туршилт; q = m × c × ΔT.', 'Measuring heat changes; q = m × c × ΔT.')),
    term(bi('экстраполяц', 'extrapolation'), bi('Хөрөх муруйг эхлэх цэг хүртэл үргэлжлүүлж ΔT-ийг тодорхойлох арга.', 'Extending the cooling curve back to the start to find ΔT.'))
  ],
  'latt-11': [
    term(bi('уусах чадвар', 'solubility'), bi('Тодорхой температурт уусмалд уусах бодисын хэмжээ.', 'The amount of a substance that dissolves at a given temperature.')),
    term(bi('бага зэрэг уусдаг', 'sparingly soluble'), bi('Усанд бага хэмжээгээр уусдаг бодис.', 'A substance that dissolves only slightly in water.')),
    term(bi('их уусдаг', 'fairly soluble'), bi('Усанд харьцангуй их хэмжээгээр уусдаг бодис.', 'A substance that dissolves in a fairly large amount of water.'))
  ],
  'latt-12': [
    term(bi('оноо тооцох хэм хэмжээ', 'mark scheme'), bi('Шалгагч хариултад оноо өгөх дүрэм.', 'The rules an examiner uses to award marks.')),
    term(bi('асуултын үг', 'command word'), bi('"Define", "explain", "calculate" гэх мэт асуултын зорилтыг заах үг.', 'A word such as "define", "explain" or "calculate" that shows what the question asks.')),
    term(bi('загвар хариулт', 'model answer'), bi('Бүрэн оноотой жишиг хариулт.', 'A full-mark sample answer.'))
  ]
};

export const LATTICE_PRACTICE_C: Record<string, PracticeItem[]> = {
  'latt-9': [
    easy(
      bi('Аль нь ΔH_hyd-ийн зөв тодорхойлолт вэ?', 'Which correctly describes ΔH_hyd?'),
      [bi('Ус 1 моль хатуу нэгдэл', 'Water 1 mol of solid compound'), bi('1 моль хийн ион усанд уусах (шингэн уусмал) энтальпи', 'The enthalpy change when 1 mol of gaseous ions dissolves in water to give a solution'), bi('Хатуу биет халах энерги', 'The energy to heat a solid'), bi('Бодисын ууршилт', 'The evaporation of a substance')],
      1,
      bi('ΔH_hyd нь хийн ион усанд уусахыг хэлнэ.', 'ΔH_hyd describes gaseous ions dissolving in water.')
    ),
    hard(
      bi('Mg²⁺ ба K⁺-ийн ΔH_hyd-ийг харьцуулж, цэнэг ба радиусаар тайлбарлана уу.', 'Compare ΔH_hyd for Mg²⁺ and K⁺, and explain with charge and radius.'),
      bi('Mg²⁺ жижиг ба 2+ цэнэгтэй → цэнэгийн нягт их → ион–дипольн холбоо хүчтэй → ΔH_hyd илүү сөрөг (−1920 ба −322).', 'Mg²⁺ is small with a 2+ charge → high charge density → strong ion–dipole bonds → a more negative ΔH_hyd (−1920 against −322).'),
      bi('Цэнэг → цэнэгийн нягт → ион–дипольн холбоо.', 'The chain: charge → charge density → ion–dipole bonds.')
    )
  ],
  'latt-10': [
    easy(
      bi('ΔH_latt(MgCl₂) = −2592, ΔH_sol = −55, ΔH_hyd(Cl⁻) = −364 кЖ моль⁻¹. ΔH_hyd(Mg²⁺) хэд вэ?', 'ΔH_latt(MgCl₂) = −2592, ΔH_sol = −55, ΔH_hyd(Cl⁻) = −364 kJ mol⁻¹. What is ΔH_hyd(Mg²⁺)?'),
      [bi('−1919', '−1919'), bi('−2647', '−2647'), bi('+1919', '+1919'), bi('−2592', '−2592')],
      0,
      bi('ΔH_hyd(Mg²⁺) = −2592 + (−55) − 2(−364) = −1919 кЖ моль⁻¹.', 'ΔH_hyd(Mg²⁺) = −2592 + (−55) − 2(−364) = −1919 kJ mol⁻¹.')
    ),
    hard(
      bi('KCl-ийн 7.45 г ΔH_sol = +15 кЖ моль⁻¹ (100 г ус). Уусмалын ΔT-ийг тооцоол.', 'For 7.45 g of KCl with ΔH_sol = +15 kJ mol⁻¹ dissolving in 100 g of water, calculate ΔT.'),
      bi('n = 0.100 моль; q = 0.100 × 15 = 1.50 кЖ; ΔT = 1500 ÷ (100 × 4.18) = 3.6 K буурна.', 'n = 0.100 mol; q = 0.100 × 15 = 1.50 kJ; ΔT = 1500 ÷ (100 × 4.18) = 3.6 K fall.'),
      bi('Эндотерм уусалт → уусмал хөрнө.', 'An endothermic dissolution cools the solution.')
    )
  ],
  'latt-11': [
    easy(
      bi('Бүлгийн доош MgSO₄-ийн уусах чадвар хэрхэн өөрчлөгдөх вэ?', 'How does the solubility of MgSO₄ change down the group?'),
      [bi('Нэмэгдэнэ', 'Rises'), bi('Буурна', 'Falls'), bi('Тогтмол', 'Stays the same')],
      1,
      bi('Сульфатын уусах чадвар бүлгийн доош буурдаг.', 'The solubility of sulfates falls down the group.')
    ),
    hard(
      bi('MgSO₄ нь BaSO₄-аас илүү уусдаг вэ? ΔH_latt ба ΔH_hyd-ээр тайлбарлана уу [4].', 'Why is MgSO₄ more soluble than BaSO₄? Explain using ΔH_latt and ΔH_hyd [4].'),
      bi('Mg²⁺ жижиг → ΔH_hyd(Mg²⁺) маш сөрөг; ΔH_latt(MgSO₄) бага зэрэг сөрөг (SO₄²⁻ том); ΔH_hyd-ийн зөрүү ΔH_latt-ийн зөрүүнээс их; ΔH_sol илүү сөрөг → илүү уусдаг.', 'Mg²⁺ is small → ΔH_hyd(Mg²⁺) is very negative; ΔH_latt(MgSO₄) is only slightly negative (SO₄²⁻ is large); the difference in ΔH_hyd is larger than the difference in ΔH_latt; ΔH_sol is more negative → more soluble.'),
      bi('Дөрвөн үндэслэлийг дараалалтай бичнэ.', 'Write the four points in order.')
    )
  ],
  'latt-12': [
    easy(
      bi('Paper 4 дээр ΔH_latt-ийн тодорхойлолт аль нь бүрэн зөв вэ?', 'Which is a complete and correct definition of ΔH_latt for Paper 4?'),
      [bi('Хийн ионоос 1 моль хатуу нэгдэл, стандарт нөхцөлд', 'The enthalpy change when 1 mol of solid forms from gaseous ions under standard conditions'), bi('Хатуу бодисыг хайлуулах', 'Melting a solid'), bi('Усанд уусах энерги', 'The energy to dissolve in water'), bi('Хатуу нэгдлийн ууршилт', 'The evaporation of a solid compound')],
      0,
      bi('Нэг моль, хийн ион, хатуу тор, стандарт нөхцөл гэсэн дөрвөн хэсэг бүрэн байна.', 'The four parts are present: one mole, gaseous ions, solid lattice and standard conditions.')
    ),
    hard(
      bi('MgCO₃-ын задралыг BaCO₃-тай харьцуулж, гурван үндэслэлтэй бичнэ үү.', 'Compare the decomposition of MgCO₃ with BaCO₃, giving three reasons.'),
      bi('Ba²⁺ том → цэнэгийн нягт бага → CO₃²⁻-г бага поляризацна; C–O холбоо бат → өндөр T; MgCO₃ нь жижиг Mg²⁺-ийн поляризацаас үүдэн бага T-д задарна.', 'Ba²⁺ is large with a low charge density, so it polarises CO₃²⁻ less; the C–O bond is stronger → a higher temperature; MgCO₃ decomposes at a lower temperature because the small Mg²⁺ polarises CO₃²⁻ more.'),
      bi('Гурван үндэслэлийг холбосон бичнэ.', 'Link the three reasons in the answer.')
    )
  ]
};
