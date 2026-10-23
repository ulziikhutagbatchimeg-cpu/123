// 9701 A Level chapter 19 (lattice energy and Born–Haber cycles), lessons 1–4 of 12. The lessons follow the chapter's deck
// (9701_AL_Ch19_Lattice_Energy.pptx) and the coursebook chapter 19 for the syllabus sections 23.1–23.2.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

export const LATTICE_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Торын энергийг тодорхойлох', 'Defining lattice energy'),
    bi(
      'Торын энергийн дөрвөн хэсэгт тодорхойлолтыг бичих, тэгшитгэлийг зөв бичих, яагаад үргэлж сөрөг байдгийг тайлбарлах.',
      'Give the four-part definition of lattice energy, write its equation, and explain why it is always negative.'
    ),
    [
      bi(
        'ΔH_latt: 1 моль ионы нэгдлийг стандарт нөхцөлд хийн ионоос үүсгэх энтальпийн өөрчлөлт.',
        'ΔH_latt: the enthalpy change when 1 mol of an ionic compound forms from gaseous ions under standard conditions.'
      ),
      bi(
        'Эсрэг цэнэгтэй ионууд татагдаж холбоо үүсэх тул энерги ялгардаг; ΔH_latt үргэлж сөрөг.',
        'Oppositely charged ions attract and bonds form, so energy is released; ΔH_latt is always negative.'
      ),
      bi(
        'Хийн ионоос 1 моль хатуу нэгдлийг шууд хэмжих аргагүй; Гессийн хуулиар (Борн–Хабер) тооцдог.',
        'One mole of solid cannot be measured directly from free gaseous ions, so Hess’s law (Born–Haber) is used.'
      )
    ],
    lessonSteps([
      [
        bi('Өмнөх мэдлэг шалгах', 'Retrieval: AS energetics'),
        bi('Стандарт нөхцөл, ΔH_f, Гессийн хууль, нэгдүгээр ионжилтын тэгшитгэлийг асууна.', 'Ask for standard conditions, ΔH_f, Hess’s law and the first ionisation equation.'),
        bi('Дөрвөн асуултад товч хариулна.', 'Answer four questions briefly.'),
        bi('Хариултууд зөв эсвэл засагдсан.', 'Answers correct or corrected.')
      ],
      [
        bi('Тодорхойлолт', 'The definition'),
        bi('Тодорхойлолтыг дөрван хэсгээр тайлбарлана: 1 моль, хийн ион, хатуу тор, стандарт нөхцөл.', 'Explain the four parts: 1 mole, gaseous ions, solid lattice, standard conditions.'),
        bi('Дөрвөн хэсгийг дэвтэртээ бичнэ.', 'Write the four parts in the notebook.'),
        bi('Дөрвөн хэсэг бүр бичигдсэн.', 'All four parts written.')
      ],
      [
        bi('Тэгшитгэл', 'Equations'),
        bi('Na⁺(g) + Cl⁻(g) → NaCl(s) (−787 кЖ моль⁻¹) ба 2:1 нэгдлийн тэгшитгэлийг үзүүлнэ.', 'Show Na⁺(g) + Cl⁻(g) → NaCl(s) (−787 kJ mol⁻¹) and a 2:1 compound.'),
        bi('Тэгшитгэл бүрийн төлөвийн тэмдгийг шалгана.', 'Check the state symbols of each equation.'),
        bi('Төлөвийн тэмдгүүд зөв.', 'State symbols correct.')
      ],
      [
        bi('Шалгах (интерактив)', 'Check (interactive)'),
        bi('Тэгшитгэл ΔH_latt мөн эсэхийг шийдүүлнэ.', 'Students decide whether each equation is a lattice energy equation.'),
        bi('Тийм эсвэл үгүй гэж шийдэж, шалтгаанаа хэлнэ.', 'Decide yes or no and give the reason.'),
        bi('Шалтгаан зөв.', 'Reason correct.')
      ],
      [
        bi('Бие даан, гарах билет', 'You do and exit ticket'),
        bi('MgO ба KBr-ийн ΔH_latt тэгшитгэл бичүүлж, гарах билет өгнө.', 'Students write the ΔH_latt equations for MgO and KBr, then take the exit ticket.'),
        bi('Тэгшитгэл бичиж, гарах билетийг бөглөнө.', 'Write the equations and complete the exit ticket.'),
        bi('Гарах билетийн оноо.', 'Exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('Аль нь ΔH_latt-ийн тодорхойлолтын хэсэг биш вэ?', 'Which is NOT part of the lattice energy definition?'),
        [bi('1 моль нэгдэл', '1 mol of compound'), bi('Хийн ионоос үүсэх', 'Formed from gaseous ions'), bi('Стандарт нөхцөл', 'Standard conditions'), bi('Усан уусмалын ион', 'Aqueous ions')],
        3,
        bi('Торын энерги хатуу торыг хийн ионоос үүсгэхийг хэлнэ, усан уусмалыг биш.', 'Lattice energy describes a solid lattice formed from gaseous ions, not aqueous ions.')
      ),
      exitItem(
        bi('Аль тэгшитгэл ΔH_latt-ийн тэгшитгэл вэ?', 'Which equation is a lattice energy equation?'),
        [
          bi('Ca(s) + Cl₂(g) → CaCl₂(s)', 'Ca(s) + Cl₂(g) → CaCl₂(s)'),
          bi('Ca²⁺(g) + 2Cl⁻(g) → CaCl₂(s)', 'Ca²⁺(g) + 2Cl⁻(g) → CaCl₂(s)'),
          bi('Ca²⁺(aq) + 2Cl⁻(aq) → CaCl₂(s)', 'Ca²⁺(aq) + 2Cl⁻(aq) → CaCl₂(s)'),
          bi('CaCl₂(s) → Ca²⁺(g) + 2Cl⁻(g)', 'CaCl₂(s) → Ca²⁺(g) + 2Cl⁻(g)')
        ],
        1,
        bi('Хийн ионоос 1 моль хатуу нэгдэл үүснэ.', 'Gaseous ions form one mole of solid.')
      ),
      exitItem(
        bi('ΔH_latt яагаад үргэлж сөрөг вэ?', 'Why is ΔH_latt always negative?'),
        [
          bi('Эсрэг цэнэгтэй ионууд татагдаж энерги ялгардаг', 'Oppositely charged ions attract and release energy'),
          bi('Ионууд бие биенээ түлхдэг', 'Ions repel each other'),
          bi('Бөөмс хөдөлгөөнөө алддаг', 'Particles lose their motion'),
          bi('Хатуу биет дулаан ялгаруулдаг', 'Solids give out heat')
        ],
        0,
        bi('Холбоо үүсэх үед энерги ялгардаг тул энтальпийн өөрчлөлт сөрөг.', 'When bonds form energy is released, so the enthalpy change is negative.')
      )
    ]
  ),
  lesson(
    2,
    bi('Атомжилт ба электрон харьцаа', 'Atomisation and electron affinity'),
    bi(
      'ΔH_at, EA₁, EA₂-ийг тодорхойлж тэмдгийг нь тайлбарлах; 16 ба 17 бүлгийн EA-ийн чиг хандлага ба фторын онцлогийг тайлбарлах.',
      'Define ΔH_at, EA₁ and EA₂ with their signs; explain the trend in electron affinity for Groups 16 and 17, and the fluorine anomaly.'
    ),
    [
      bi('ΔH_at: 1 моль хийн атом үүсэх энтальпи; үргэлж эерэг.', 'ΔH_at: enthalpy to form 1 mol of gaseous atoms; always positive.'),
      bi('EA₁ ихэвчлэн сөрөг; EA₂ үргэлж эерэг, учир нь сөрөг ионд электрон нэмэхэд түлхэлцэлийг даван туулах хэрэгтэй.', 'EA₁ is usually negative; EA₂ is always positive because the added electron must overcome repulsion from a negative ion.'),
      bi('Фторын EA₁ (−328) хлоронаас (−349) бага сөрөг: жижиг атомын өндөр электрон нягт.', 'Fluorine’s EA₁ (−328) is less exothermic than chlorine’s (−349): the small atom’s high electron density.')
    ],
    lessonSteps([
      [
        bi('Өмнөх мэдлэг', 'Do now'),
        bi('Хичээл 1-ийн гурван тэгшитгэлийг асууна.', 'Ask for the three equations from Lesson 1.'),
        bi('Тэгшитгэлүүдийг дахин бичнэ.', 'Rewrite the equations.'),
        bi('Тэмдэг, төлөв зөв.', 'Signs and states correct.')
      ],
      [
        bi('ΔH_at', 'ΔH_at'),
        bi('ΔH_at-ийг 1 моль хийн атомын хувьд тайлбарлана (Li, ½Cl₂).', 'Explain ΔH_at per mole of gaseous atoms (Li, ½Cl₂).'),
        bi('Li(s) → Li(g) ба ½Cl₂(g) → Cl(g) тэгшитгэл бичнэ.', 'Write Li(s) → Li(g) and ½Cl₂(g) → Cl(g).'),
        bi('Тэмдэг (+) ба 1 моль атом.', 'Sign (+) and 1 mole of atoms.')
      ],
      [
        bi('EA₁ ба EA₂', 'EA₁ and EA₂'),
        bi('EA₁ ба EA₂-ийн тэмдэг, шалтгааныг тайлбарлана (Cl, O⁻).', 'Explain the signs and reasons for EA₁ and EA₂ (Cl, O⁻).'),
        bi('O⁻ + e⁻ → O²⁻-ийн EA₂ эерэг байгааг тайлбарлана.', 'Explain why the EA₂ of O⁻ + e⁻ → O²⁻ is positive.'),
        bi('Түлхэлцлийг шалтгаан болгосон.', 'Repulsion given as the reason.')
      ],
      [
        bi('Жишээ: S²⁻', 'Worked example: S²⁻'),
        bi('S²⁻-ийн EA₁ + EA₂-ийг Гессийн хуулиар тооцоолно.', 'Work out the total electron affinity of S²⁻ with Hess’s law.'),
        bi('(−200) + (+640) = +440 кЖ моль⁻¹ гэж тооцоолно.', 'Calculate (−200) + (+640) = +440 kJ mol⁻¹.'),
        bi('Алхам бүр бичигдсэн.', 'Each step written.')
      ],
      [
        bi('Чиг хандлага ба фторын онцлог', 'Trends and the fluorine anomaly'),
        bi('16 ба 17 бүлгийн EA₁-ийн хүснэгтийг харуулж, фторын онцлогийг тайлбарлана.', 'Show the EA₁ table for Groups 16 and 17 and explain fluorine’s anomaly.'),
        bi('Яагаад хлор нь фторноос илүү сөрөг EA₁-тэй вэ гэдгийг таамаглана.', 'Predict why chlorine, not fluorine, has the most exothermic EA₁.'),
        bi('Таамаглал шалтгаантай.', 'Prediction with a reason.')
      ]
    ]),
    [
      exitItem(
        bi('Аль нь бромын ΔH_at-ийн зөв тэгшитгэл вэ?', 'Which is the correct ΔH_at equation for bromine?'),
        [bi('½Br₂(g) → Br(g)', '½Br₂(g) → Br(g)'), bi('½Br₂(l) → Br(g)', '½Br₂(l) → Br(g)'), bi('Br₂(l) → 2Br(g)', 'Br₂(l) → 2Br(g)'), bi('Br(g) + e⁻ → Br⁻(g)', 'Br(g) + e⁻ → Br⁻(g)')],
        1,
        bi('Бромын стандарт төлөв шингэн; 1 моль атом үүснэ.', 'Bromine’s standard state is liquid; 1 mol of atoms forms.')
      ),
      exitItem(
        bi('Хүчилтөрөгчийн хоёр дахь электрон харьцаа (EA₂) яагаад эерэг вэ?', 'Why is the second electron affinity of oxygen positive?'),
        [bi('O өндөр электроотрицательтай', 'O is very electronegative'), bi('O⁻ сөрөг тул электроныг түлхдэг', 'O⁻ is negative and repels the electron'), bi('O⁻-д бүрэн бүрхүүл байдаг', 'O⁻ has a full shell'), bi('Цөм электроныг түлхдэг', 'The nucleus repels the electron')],
        1,
        bi('Сөрөг ионд электрон нэмэхэд түлхэлцлийг даван туулах энерги шаардагдана.', 'Adding an electron to a negative ion needs energy to overcome repulsion.')
      ),
      exitItem(
        bi('Хлорын EA₁ (−349) фторынхаас (−328) илүү сөрөг. Шалтгаан нь юу вэ?', 'Chlorine’s EA₁ (−349) is more exothermic than fluorine’s (−328). Why?'),
        [bi('Хлор жижиг атом', 'Chlorine is the smaller atom'), bi('Фтор маш жижиг тул электрон нягтын түлхэлцэл их', 'Fluorine is so small that its dense electron cloud repels the added electron'), bi('Фтор бүлэгтээ хамгийн их', 'Fluorine has the largest group'), bi('Хлор хийн төлөвт байдаггүй', 'Chlorine has no gaseous form')],
        1,
        bi('Фтор маш жижиг тул нэмэгдсэн электрон өндөр нягттай цахилгаан үүлээс түлхэлцэнэ.', 'Fluorine is so small that the added electron feels strong repulsion from its dense electron cloud.')
      )
    ]
  ),
  lesson(
    3,
    bi('Борн–Хабер цикл: логик', 'Born–Haber cycles: the logic'),
    bi(
      'Гессийн цикл яагаад ΔH_latt-ийг өгдгийг тайлбарлах, эхлэлээс хийн ион хүртэлх 5 алхмыг зөв дараалалд бичих, LiF-ийн ΔH_latt-ийг тооцоолох.',
      'Explain why a Hess cycle gives ΔH_latt, list the steps from elements to gaseous ions in order, and calculate ΔH_latt for LiF.'
    ),
    [
      bi('ΔH_f = ΔH₁ + ΔH_latt; тиймээс ΔH_latt = ΔH_f − ΔH₁.', 'ΔH_f = ΔH₁ + ΔH_latt, so ΔH_latt = ΔH_f − ΔH₁.'),
      bi('Дарааллын алгоритм: металлыг атомжуулах → металлыг ионжуулах → бус металлыг атомжуулах → бус металлыг ионжуулах (EA₁).', 'Order: atomise the metal → ionise the metal → atomise the non-metal → ionise the non-metal (EA₁).'),
      bi('Энергийн түвшний диаграмм: дээш +, доош −; ΔH_latt үргэлж сөрөг.', 'Energy-level diagram: up is +, down is −; ΔH_latt is always negative.')
    ],
    lessonSteps([
      [
        bi('Өмнөх мэдлэг', 'Do now'),
        bi('Li ба F-ийн ΔH_at, IE₁, EA₁-ийн тэгшитгэлийг асууна.', 'Ask for the ΔH_at, IE₁ and EA₁ equations for Li and F.'),
        bi('Тэгшитгэлүүдийг бичнэ.', 'Write the equations.'),
        bi('Тэгшитгэл зөв.', 'Equations correct.')
      ],
      [
        bi('Hess-ийн логик', 'Hess logic'),
        bi('Хоёр замаар нэг хариулт гарна гэдгийг тайлбарлана.', 'Explain that two routes give one answer.'),
        bi('Хоёр замын тэгшитгэлийг харьцуулна.', 'Compare the two routes.'),
        bi('Гессийн хуулийг зөв хэлнэ.', 'States Hess’s law correctly.')
      ],
      [
        bi('Барих алгоритм', 'The construction algorithm'),
        bi('Алгоритм болон шалгах хуудсыг үзүүлнэ.', 'Show the algorithm and the checklist.'),
        bi('Цикл бүрийг дарааллаар нь бүтээнэ.', 'Build each cycle step by step in order.'),
        bi('Дарааллын алдаа байхгүй.', 'No errors in the order.')
      ],
      [
        bi('LiF-ийн цикл', 'The LiF energy-level diagram'),
        bi('LiF-ийн түвшний диаграммыг бүтээхэд тусална.', 'Help students build the LiF energy-level diagram.'),
        bi('Түвшин бүрийг бичиж, электроныг харуулна.', 'Label each level and show the electrons.'),
        bi('Бүх түвшин зөв.', 'All levels correct.')
      ],
      [
        bi('Жишээ: ΔH_latt [LiF]', 'Worked example: ΔH_latt [LiF]'),
        bi('ΔH_latt [LiF] = −617 − 432 = −1049 гэж тооцоолж харуулна.', 'Show ΔH_latt [LiF] = −617 − 432 = −1049.'),
        bi('Бүх алхмыг зөв тэмдэгтэйгээр тооцоолно.', 'Calculate every step with the correct signs.'),
        bi('Хариу −1049 кЖ моль⁻¹.', 'Answer −1049 kJ mol⁻¹.')
      ]
    ]),
    [
      exitItem(
        bi('Хоёр замаар нэг хариулт гарна гэдэг нь ямар хууль вэ?', 'Two routes give one answer. Which law is this?'),
        [bi('Гессийн хууль', 'Hess’s law'), bi('Бойлын хууль', 'Boyle’s law'), bi('Авогадрогийн тоо', 'Avogadro’s number'), bi('Фарадейн хууль', 'Faraday’s law')],
        0,
        bi('Урвалын энтальпи нь зам биш, эхлэл ба төгсгөлөөс хамаарна.', 'The enthalpy change depends on the start and end states, not on the route.')
      ),
      exitItem(
        bi('ΔH_f = −617 кЖ моль⁻¹, ΔH₁ = +432 кЖ моль⁻¹ бол LiF-ийн ΔH_latt хэд вэ?', 'ΔH_f = −617 kJ mol⁻¹ and ΔH₁ = +432 kJ mol⁻¹. What is ΔH_latt for LiF?'),
        [bi('+1049', '+1049'), bi('−1049', '−1049'), bi('−185', '−185'), bi('+185', '+185')],
        1,
        bi('ΔH_latt = ΔH_f − ΔH₁ = −617 − 432 = −1049 кЖ моль⁻¹.', 'ΔH_latt = ΔH_f − ΔH₁ = −617 − 432 = −1049 kJ mol⁻¹.')
      ),
      exitItem(
        bi('Энергийн түвшний диаграммд электронууд хаана харагдах ёстой вэ?', 'Where must electrons be shown on an energy-level diagram?'),
        [bi('Зөвхөн эцсийн шатанд', 'Only at the last step'), bi('EA₁ алхам хүртэл бүх түвшинд', 'On every level up to the EA₁ step'), bi('Огт харуулахгүй', 'They are not shown'), bi('Зөвхөн металл дээр', 'Only on the metal')],
        1,
        bi('Электроныг EA₁ алхам хүртэл түвшин бүрд тэмдэглэнэ.', 'Show the electrons on each level up to the EA₁ step.')
      )
    ]
  ),
  lesson(
    4,
    bi('Борн–Хабер тооцоолол', 'Born–Haber calculations'),
    bi(
      '2+ ион ба 2 анионтой нэгдлийг (MgCl₂, K₂O) тооцоолох, аль ч тодорхойгүй утгыг циклээс гаргах, зөв тэгшитгэлийг сонгох.',
      'Calculate compounds with 2+ ions and two anions (MgCl₂, K₂O), find any unknown value from the cycle, and choose the correct cycle equation.'
    ),
    [
      bi('2+ ион: IE₁ + IE₂; 2 ионтой анион: 2 × ΔH_at ба 2 × EA₁ (MgCl₂).', '2+ ion: IE₁ + IE₂; two anions: 2 × ΔH_at and 2 × EA₁ (MgCl₂).'),
      bi('K₂O: 2K-ийн ΔH_at ба IE₁-ийг 2 дахин, O-ийн EA₁ + EA₂.', 'K₂O: double the ΔH_at and IE₁ of K, plus EA₁ + EA₂ of O.'),
      bi('Тодорхойгүй утгыг Гессийн тэгшитгэлээр гаргана (жишээ: Br-ийн EA₁ = −325).', 'Find an unknown value from the Hess equation (for example EA₁ of bromine = −325).')
    ],
    lessonSteps([
      [
        bi('Өмнөх мэдлэг', 'Do now'),
        bi('Лекц 3-ын NaCl гарах билетийн хариуг шалгана.', 'Check the NaCl exit-ticket answer from Lesson 3.'),
        bi('Хариугаа харьцуулна.', 'Compare the answers.'),
        bi('NaCl-ийн ΔH_latt −788 зөв.', 'NaCl ΔH_latt −788 is correct.')
      ],
      [
        bi('MgCl₂: хамтдаа бүтээх', 'We do: MgCl₂'),
        bi('MgCl₂-ийн цикл барьж тооцоолно.', 'Build the MgCl₂ cycle and calculate it.'),
        bi('IE₂ ба 2 × ΔH_at-ийг тооцоонд оруулна.', 'Include IE₂ and 2 × ΔH_at in the sum.'),
        bi('ΔH_1 = +1882; ΔH_latt = −2523 кЖ моль⁻¹.', 'ΔH_1 = +1882; ΔH_latt = −2523 kJ mol⁻¹.')
      ],
      [
        bi('K₂O: жишээ', 'Worked example: K₂O'),
        bi('Түвшин A–E-ийг нэрлэж, тооцоолно.', 'Label levels A–E and calculate.'),
        bi('Тэмдэг, тоо бүрийг шалгана.', 'Check the sign and the number for each term.'),
        bi('ΔH_latt −2281 кЖ моль⁻¹.', 'ΔH_latt −2281 kJ mol⁻¹.')
      ],
      [
        bi('Тодорхойгүй: Br-ийн EA₁', 'Unknown: EA₁ of bromine'),
        bi('Гессийн нийлбэрийг бичиж, EA₁-ийг тусгаарлана.', 'Write the Hess sum and make EA₁ the subject.'),
        bi('Утгуудыг орлуулж тэмдэгтэй тооцоолно.', 'Substitute the values with their signs.'),
        bi('EA₁ = −325 кЖ моль⁻¹.', 'EA₁ = −325 kJ mol⁻¹.')
      ],
      [
        bi('Бие даан: гурван тооцоо', 'You do: three calculations'),
        bi('Үлдсэн тооцоог бие даан хийлгэнэ.', 'Students do the remaining calculations on their own.'),
        bi('Дасгалын хариуг бичнэ.', 'Write the answers.'),
        bi('Гарах билетийн оноо.', 'Exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('MgCl₂-ийн циклд Cl-ийн ΔH_at хэдэн удаа орох вэ?', 'How many times does ΔH_at of Cl appear in the MgCl₂ cycle?'),
        [bi('1 удаа', 'Once'), bi('2 удаа', 'Twice'), bi('3 удаа', 'Three times'), bi('Огт үгүй', 'Not at all')],
        1,
        bi('2Cl атом үүсгэнэ, тиймээс 2 × ΔH_at(Cl) = 2 × 122 = 244.', 'Two Cl atoms form, so 2 × ΔH_at(Cl) = 2 × 122 = 244.')
      ),
      exitItem(
        bi('Na₂O-ийн ΔH₁-д EA₂ хэдэн удаа орох вэ?', 'How many times does EA₂ appear in ΔH₁ for Na₂O?'),
        [bi('0', '0'), bi('1', '1'), bi('2', '2'), bi('3', '3')],
        1,
        bi('Нэг O²⁻ тул EA₁ ба EA₂ тус бүр нэг удаа орно.', 'One O²⁻ ion, so EA₁ and EA₂ each appear once.')
      ),
      exitItem(
        bi('K₂O-ийн ΔH₁ = 2(89) + 2(418) + 249 − 141 + 798 = ?', 'For K₂O, ΔH₁ = 2(89) + 2(418) + 249 − 141 + 798 = ?'),
        [bi('+1920', '+1920'), bi('+2281', '+2281'), bi('−2281', '−2281'), bi('+1122', '+1122')],
        0,
        bi('Нийлбэр +1920 кЖ моль⁻¹; ΔH_latt = −361 − (+1920) = −2281.', 'The sum is +1920 kJ mol⁻¹; ΔH_latt = −361 − (+1920) = −2281.')
      )
    ]
  )
];

export const LATTICE_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'latt-1': [
    term(bi('торын энерги (ΔH_latt)', 'lattice energy (ΔH_latt)'), bi('1 моль ионы хатуу нэгдэл хийн ионоос үүсэх энтальпийн өөрчлөлт.', 'The enthalpy change when 1 mol of an ionic solid forms from gaseous ions.')),
    term(bi('хийн ион', 'gaseous ion'), bi('Хийн төлөвт байгаа цэнэгтэй бөөм.', 'A charged particle in the gas state.')),
    term(bi('стандарт нөхцөл', 'standard conditions'), bi('298 K ба 100 kPa (1 bar).', '298 K and 100 kPa (1 bar).')),
    term(bi('Гессийн хууль', 'Hess’s law'), bi('Урвалын энтальпи зам биш, зөвхөн эхлэл ба төгсгөлийн төлөвөөс хамаарна.', 'The enthalpy change depends only on the start and end states, not on the route.'))
  ],
  'latt-2': [
    term(bi('атомжилтийн энтальпи (ΔH_at)', 'enthalpy change of atomisation (ΔH_at)'), bi('1 моль хийн атом элементээс үүсэх энтальпи; үргэлж эерэг.', 'The enthalpy change to form 1 mol of gaseous atoms from the element; always positive.')),
    term(bi('нэгдүгээр электрон харьцаа (EA₁)', 'first electron affinity (EA₁)'), bi('1 моль хийн атомд 1 моль электрон нэмэхэд үүсэх энтальпи; ихэвчлэн сөрөг.', 'The enthalpy change when 1 mol of electrons is added to 1 mol of gaseous atoms; usually negative.')),
    term(bi('хоёрдугаар электрон харьцаа (EA₂)', 'second electron affinity (EA₂)'), bi('Хийн 1− ионд 1 моль электрон нэмэхэд үүсэх энтальпи; үргэлж эерэг.', 'The enthalpy change when 1 mol of electrons is added to 1 mol of gaseous 1− ions; always positive.')),
    term(bi('фторын онцлог', 'fluorine anomaly'), bi('Фтор нь жижиг атомын өндөр электрон нягтын улмаас EA₁-ээрээ хлороос бага сөрөг.', 'Fluorine’s EA₁ is less exothermic than chlorine’s, because its small atom has a high electron density.'))
  ],
  'latt-3': [
    term(bi('Борн–Хабер цикл', 'Born–Haber cycle'), bi('Торын энергийг Гессийн хуулиар тооцдог энергийн цикл.', 'An energy cycle that uses Hess’s law to calculate lattice energy.')),
    term(bi('энергийн түвшний диаграмм', 'energy-level diagram'), bi('Алхам бүрийн энтальпийг дээш (+) ба доош (−) сумаар харуулсан диаграмм.', 'A diagram that shows each step’s enthalpy with arrows up (+) and down (−).')),
    term(bi('ионжилтын энерги (IE₁)', 'first ionisation energy (IE₁)'), bi('1 моль хийн атомаас 1 моль электроныг салгахад шаардагдах энерги.', 'The energy needed to remove 1 mol of electrons from 1 mol of gaseous atoms.'))
  ],
  'latt-4': [
    term(bi('элементийн үүсэх энтальпи (ΔH_f)', 'enthalpy change of formation (ΔH_f)'), bi('1 моль нэгдэл элементүүдээс стандарт төлөвт үүсэх энтальпи.', 'The enthalpy change when 1 mol of a compound forms from its elements in their standard states.')),
    term(bi('хоёрдугаар ионжилтын энерги (IE₂)', 'second ionisation energy (IE₂)'), bi('1+ ионоос 1 моль электроныг салгахад шаардагдах энерги.', 'The energy needed to remove 1 mol of electrons from 1+ gaseous ions.')),
    term(bi('цикл дэх ионы тоо', 'number of ions in the cycle'), bi('Нэгдлийн томьёогоор тодорхойлогдох атом ба ионы моль тоо; тооцоонд тусгана.', 'The number of moles of atoms and ions set by the formula; it multiplies each term.'))
  ]
};

export const LATTICE_PRACTICE_A: Record<string, PracticeItem[]> = {
  'latt-1': [
    easy(
      bi('Аль нь ΔH_latt-ийн зөв тодорхойлолт вэ?', 'Which correctly describes ΔH_latt?'),
      [bi('Хатуу бодисыг хайлуулах энерги', 'The energy to melt a solid'), bi('Хийн ионоос 1 моль хатуу нэгдэл үүсэх энтальпи', 'The enthalpy change when 1 mol of solid forms from gaseous ions'), bi('Хийн ион үүсгэх энерги', 'The energy to form gaseous ions'), bi('Усанд уусах энерги', 'The energy to dissolve in water')],
      1,
      bi('Торын энерги нь хийн ионоос хатуу тор үүсэхийг хэлнэ.', 'Lattice energy describes the formation of a solid lattice from gaseous ions.')
    ),
    hard(
      bi('Магнийн оксидын (MgO) ΔH_latt-ийн тэгшитгэлийг бичээд, яагаад сөрөг болохыг тайлбарлаарай.', 'Write the ΔH_latt equation for magnesium oxide and explain why it is negative.'),
      bi('Mg²⁺(g) + O²⁻(g) → MgO(s). Эсрэг цэнэгтэй ионууд татагдаж холбоо үүсэх тул энерги ялгарна.', 'Mg²⁺(g) + O²⁻(g) → MgO(s). Oppositely charged ions attract and form bonds, so energy is released.'),
      bi('Хоёр ионы цэнэг өндөр тул энерги их ялгарна.', 'Both ions carry high charges, so a large amount of energy is released.')
    )
  ],
  'latt-2': [
    easy(
      bi('Нэгдүгээр электрон харьцаа (EA₁)-ийн тэмдэг хамгийн их тохиолдолд аль вэ?', 'What sign does EA₁ usually have?'),
      [bi('Үргэлж эерэг', 'Always positive'), bi('Ихэвчлэн сөрөг', 'Usually negative'), bi('Үргэлж тэг', 'Always zero'), bi('Ионы үүсгэх энерги', 'The ion formation energy')],
      1,
      bi('Атом электрон авах үед ихэвчлэн энерги ялгардаг.', 'When an atom gains an electron, energy is usually released.')
    ),
    hard(
      bi('Кальцийн хлоридын (CaCl₂) торын энергийн тэгшитгэлийг бичээд тайлбарлана уу.', 'Write the lattice energy equation for calcium chloride and explain it.'),
      bi('Ca²⁺(g) + 2Cl⁻(g) → CaCl₂(s). Хийн ионоос 1 моль хатуу нэгдэл үүсэх тул торын энерги.', 'Ca²⁺(g) + 2Cl⁻(g) → CaCl₂(s). One mole of solid forms from gaseous ions, so this is the lattice energy.'),
      bi('Төлөвийн тэмдэг ба моль тоо хоёулаа зөв байх ёстой.', 'Both the state symbols and the mole numbers must be correct.')
    )
  ],
  'latt-3': [
    easy(
      bi('ΔH_latt-ийг Гессийн хуулиар тооцох зөв томьёо аль нь вэ?', 'Which formula gives ΔH_latt from Hess’s law?'),
      [bi('ΔH_latt = ΔH_f + ΔH₁', 'ΔH_latt = ΔH_f + ΔH₁'), bi('ΔH_latt = ΔH_f − ΔH₁', 'ΔH_latt = ΔH_f − ΔH₁'), bi('ΔH_latt = ΔH₁ − ΔH_f', 'ΔH_latt = ΔH₁ − ΔH_f'), bi('ΔH_latt = −ΔH_f', 'ΔH_latt = −ΔH_f')],
      1,
      bi('Гессийн хуулиар ΔH_f = ΔH₁ + ΔH_latt.', 'By Hess’s law, ΔH_f = ΔH₁ + ΔH_latt.')
    ),
    hard(
      bi('Born–Haber цикл дээр алхам бүрийг тайлбарлаж, LiF-ийн ΔH_latt-ийг олоорой.', 'Explain each step of the Born–Haber cycle and find ΔH_latt for LiF.'),
      bi('ΔH₁ = +161 + 520 + 79 − 328 = +432; ΔH_latt = −617 − 432 = −1049 кЖ моль⁻¹.', 'ΔH₁ = +161 + 520 + 79 − 328 = +432; ΔH_latt = −617 − 432 = −1049 kJ mol⁻¹.'),
      bi('Алхам бүрийг тэмдгийн хамт нийлүүлнэ.', 'Add the steps together with their signs.')
    )
  ],
  'latt-4': [
    easy(
      bi('MgCl₂-ийн ΔH₁-ийн зөв тэгшитгэлийг сонгоно уу.', 'Choose the correct ΔH₁ for MgCl₂.'),
      [bi('ΔH_at(Mg) + IE₁ + IE₂ + ΔH_at(Cl) + EA₁', 'ΔH_at(Mg) + IE₁ + IE₂ + ΔH_at(Cl) + EA₁'), bi('ΔH_at(Mg) + IE₁ + IE₂ + 2ΔH_at(Cl) + 2EA₁', 'ΔH_at(Mg) + IE₁ + IE₂ + 2ΔH_at(Cl) + 2EA₁'), bi('ΔH_at(Mg) + IE₁ + 2ΔH_at(Cl) + 2EA₁', 'ΔH_at(Mg) + IE₁ + 2ΔH_at(Cl) + 2EA₁'), bi('IE₁ + IE₂ + 2EA₁', 'IE₁ + IE₂ + 2EA₁')],
      1,
      bi('Mg нэг, Cl хоёр атом ба ион: IE₂, 2 × ΔH_at ба 2 × EA₁ орно.', 'One Mg and two Cl: include IE₂, 2 × ΔH_at and 2 × EA₁.')
    ),
    hard(
      bi('KBr-ийн ΔH_f = −394, ΔH_at(K) = +89, IE₁(K) = +418, ΔH_at(Br) = +112, ΔH_latt = −688 кЖ моль⁻¹ бол бромын EA₁-ийг тооцоолно уу.', 'Given ΔH_f(KBr) = −394, ΔH_at(K) = +89, IE₁(K) = +418, ΔH_at(Br) = +112 and ΔH_latt = −688 kJ mol⁻¹, calculate EA₁ of bromine.'),
      bi('EA₁ = −394 − 89 − 418 − 112 + 688 = −325 кЖ моль⁻¹.', 'EA₁ = −394 − 89 − 418 − 112 + 688 = −325 kJ mol⁻¹.'),
      bi('Гессийн тэгшитгэлийг EA₁-ийн хувьд шийднэ.', 'Solve the Hess equation for EA₁.')
    )
  ]
};
