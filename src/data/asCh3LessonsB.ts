// AS 9701 chapter 3 (chemical bonding), lessons 3–4. They follow the deck 04_Ch4_Chemical_Bonding.pptx: electronegativity,
// polarity and intermolecular forces (slides 34–46), and metallic bonding, properties and exam practice (slides 47–62).
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'as3';

export const AS3_LESSONS_B: StatesLesson[] = [
  lesson(
    3,
    bi('Электроны сөрөг чанар, туйлшрал ба молекул хоорондын хүч', 'Electronegativity, polarity and intermolecular forces'),
    bi(
      'Цахилгаан сөрөг чанар, туйлт холбоо ба туйлт молекулыг тодорхойлох; id–id, pd–pd, устөрөгчийн холбоог ялгаж буцлах цэгтэй холбох (хөтөлбөр 3.1, 3.5; слайд 34–46).',
      'Define electronegativity, polar bonds and polar molecules; distinguish id–id, pd–pd and hydrogen bonds and link them to boiling points (syllabus 3.1, 3.5; slides 34–46).'
    ),
    [
      bi('Цахилгаан сөрөг чанар: ковалент холбоонд холбоох хосыг өөртөө татах атомын чадвар. Pauling-ийн утга нэгжгүй; үе дагуу өснө, бүлгээр буурна (F хамгийн их, 4.0).', 'Electronegativity: an atom’s power to attract the bonding pair in a covalent bond towards itself. Pauling values have no units; they increase across a period and fall down a group (F highest, 4.0).'),
      bi('ΔEN ≥ 2.0 → ионы; ΔEN < 1.0 → ковалент; 0 → цэвэр ковалент (Cl–Cl). Туйлтай холбоо: хос илүү EN атом руу шилжиж δ− ба δ+ үүснэ.', 'ΔEN ≥ 2.0 → ionic; ΔEN < 1.0 → covalent; 0 → pure covalent (Cl–Cl). Polar bond: the pair shifts to the more electronegative atom, giving δ− and δ+.'),
      bi('Туйлтай холбоотой молекул нь диполь нөхөгдөхгүй бол туйлтай. CO₂, CCl₄, BF₃ туйлтай холбоотой ч туйлгүй.', 'A molecule with polar bonds is polar only if the dipoles do not cancel. CO₂, CCl₄ and BF₃ have polar bonds but are non-polar.'),
      bi('id–id хүч: бүх молекулд байдаг; электрон олон, холбоо цэг олон → хүч их. pd–pd: туйлт молекулын δ+ ба δ− хоорондын таталцал. Устөрөгчийн холбоо: H нь N, O, F-тэй ковалентоор холбогдож, хөрш молекулын N, O, F-ийн ганц хостой холбогдоно; хамгийн хүчтэй молекул хоорондын хүч.', 'id–id forces: present in all molecules; more electrons and more contact points → stronger. pd–pd: attraction between the δ+ and δ− ends of polar molecules. Hydrogen bonding: H covalently bonded to N, O or F attracts a lone pair on N, O or F in a neighbour; the strongest intermolecular force.'),
      bi('Ус: 2 H + 2 ганц хос → молекул бүр дунджаар 2 устөрөгчийн холбоо; мөс нээлттэй торт нягт бага.', 'Water: 2 H and 2 lone pairs → on average 2 hydrogen bonds per molecule; ice is an open lattice and so less dense.')
    ],
    lessonSteps(
      [
        [
          bi('Цахилгаан сөрөг чанар', 'Electronegativity'),
          bi('Тодорхойлолтыг үгчлэн уншуулна. Pauling утгууд; хандлага: үе дагуу өснө, бүлгээр буурна. F, O, N, Cl-ийн утгыг харуулна.', 'Read out the exact definition. The Pauling values; the trend: it increases across a period and decreases down a group. Show the values for F, O, N and Cl.'),
          bi('Гурван хамгийн их сөрөг чанартай элементийг нэрлэнэ.', 'Name the three most electronegative elements.'),
          bi('Show-me boards: F, O, N эсвэл Cl бичнэ.', 'Show-me boards: F, O, N or Cl.')
        ],
        [
          bi('Ион эсвэл ковалент? Туйлтай эсвэл туйлгүй?', 'Ionic or covalent? Polar or non-polar?'),
          bi('ΔEN-ийн дүрэм: ≥2.0 ион, <1.0 ковалент. CHCl₃ ба CCl₄-ийн диполь. Интерактив: Cl₂, HF, SCl₂, CH₃Cl, CBr₄, CO₂, H₂O, BF₃.', 'The ΔEN rule: ≥2.0 ionic, <1.0 covalent. Dipoles in CHCl₃ and CCl₄. Interactive: Cl₂, HF, SCl₂, CH₃Cl, CBr₄, CO₂, H₂O, BF₃.'),
          bi('ΔEN-ийг мини самбарт тооцоолно. "Олс таталцах" тоглоом: хэн хожих вэ?', 'Calculate ΔEN on mini-whiteboards. Play the tug-of-war game: who wins the pull for electrons?'),
          bi('ΔEN тооцоо ба туйлын шийдвэр зөв эсэх.', 'ΔEN calculations and polar decisions correct.')
        ],
        [
          bi('Id–id хүч', 'Instantaneous dipole–induced dipole forces'),
          bi('Түр зуурын диполь → өдөөгдсөн диполь. Br₂ өрөөний температурт шингэн. Электрон ихэсвэл, холбоо цэг олширвал хүч их. Пентан (36 °C) ба 2,2-диметилпропан (10 °C). Галоген ба инертийн хийн буцлах цэгийн хандлага. You do: F₂ → I₂ ба CH₄ → C₄H₁₀ гэсэн буцлах цэгийг тайлбарлах.', 'Instantaneous → induced dipole. Br₂ is a liquid at room temperature. More electrons, or more contact points, give stronger forces. Pentane (36 °C) and 2,2-dimethylpropane (10 °C). The boiling-point trends of the halogens and the noble gases. You do: explain the boiling points of F₂ → I₂ and CH₄ → C₄H₁₀.'),
          bi('Дөрвөн үе шатыг 4 хүрээтэй story-board-оор зурна. You do асуултыг шалгалтын нөхцөлд хариулна: хариултанд хүчийг нэрлэж, "more electrons" гэж бичнэ.', 'Draw the four stages as a 4-frame storyboard. Answer the you-do question under exam conditions, naming the force and writing "more electrons".'),
          bi('Хариултанд хүч ба "more electrons" хоёулаа байгаа эсэх.', 'Answers name both the force and "more electrons".')
        ],
        [
          bi('Pd–pd ба устөрөгчийн холбоо', 'Permanent dipole forces and hydrogen bonding'),
          bi('Пропанон (56 °C) ба бутан (0 °C), Mr хоёулаа 58. We do: ICl ба Br₂ (ижил электрон, ICl ≈40 °C өндөр). Устөрөгчийн холбооны нөхцөл ба зурах дүрэм. HF, H₂O, NH₃-ийн буцлах цэгийн гажиг.', 'Propanone (56 °C) and butane (0 °C), both Mr 58. We do: ICl and Br₂ (same number of electrons, ICl about 40 °C higher). The conditions for hydrogen bonding and how to draw it. The boiling-point anomalies of HF, H₂O and NH₃.'),
          bi('Электрон эхлээд, дараа туйлшралыг хэлнэ. Устөрөгчийн холбоог "δ+ H ··· ганц хос" гэж, шулуун, тасархай шугамаар зурна.', 'Say electrons first, then polarity. Draw the hydrogen bond as δ+ H ··· lone pair, with a straight dotted line.'),
          bi('Устөрөгчийн холбоог зөв зурсан эсэх; ICl-ийн тайлбар туйлшралтай.', 'Hydrogen bond drawn correctly; the ICl explanation uses polarity.')
        ],
        [
          bi('Усны онцгой шинж ба hinge асуулт', 'The peculiar properties of water and hinge questions'),
          bi('Мөс усанд хөвдөг: мөсөнд устөрөгчийн холбоо тогтмол 3D тор үүсгэж, молекулууд холдоно. Өндөр буцлах цэг, гадаргуугийн таталцал. Hinge: 3-2-1-ээр гурван асуулт.', 'Ice floats: hydrogen bonds form a rigid 3D lattice in ice, which holds the molecules further apart. High boiling point and surface tension. Hinges: three questions on 3-2-1.'),
          bi('Хосоороо гурван өгүүлбэрээр мөс яагаад хөвдгийг тайлбарлана.', 'Explain to a partner in exactly three sentences why ice floats.'),
          bi('Хосын тайлбар гурван өгүүлбэр; hinge-ийн хариу.', 'Partner explanation in three sentences; hinge answers.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Аль молекул туйлтай холбоотой ч туйлгүй вэ?', 'Which molecule has polar bonds but is non-polar?'),
        [bi('CO₂', 'CO₂'), bi('H₂O', 'H₂O'), bi('NH₃', 'NH₃'), bi('HCl', 'HCl')],
        0,
        bi('Хоёр C=O диполь эсрэг чиглэлд байж нөхөгдөнө.', 'The two C=O dipoles point in opposite directions and cancel.')
      ),
      exitItem(
        bi('Пентан (36 °C) ба 2,2-диметилпропан (10 °C) — пентан яагаад өндөр буцалдаг вэ?', 'Why does pentane (36 °C) boil higher than 2,2-dimethylpropane (10 °C)?'),
        [
          bi('Урт, шулуун гинж → илүү олон холбоо цэг', 'Longer, unbranched chain → more contact points'),
          bi('Илүү хүнд', 'It is heavier'),
          bi('Илүү туйлтай', 'It is more polar'),
          bi('Илүү их устөрөгчийн холбоотой', 'It has more hydrogen bonds')
        ],
        0,
        bi('Масс ижил (C₅H₁₂); ялгаа нь хэлбэр, холбоо цэгийн тоо.', 'The mass is the same (C₅H₁₂); the difference is the shape and the number of contact points.')
      ),
      exitItem(
        bi('Устөрөгчийн холбоо үүсэхэд аль нөхцөл шаардлагатай вэ?', 'Which condition is needed for a hydrogen bond to form?'),
        [
          bi('H нь N, O эсвэл F-тэй ковалентоор холбогдсон, хөрш молекулд N, O эсвэл F-ийн ганц хос байх', 'H covalently bonded to N, O or F, and a lone pair on N, O or F in a neighbouring molecule'),
          bi('Хоёр H₂ молекул зэрэгцэн байх', 'Two H₂ molecules side by side'),
          bi('C–H холбоо ба ион', 'A C–H bond and an ion'),
          bi('Металлын ион ба делокалчлагдсан электрон', 'A metal ion and delocalised electrons')
        ],
        0,
        bi('Нөхцөл хоёулаа хэрэгтэй.', 'Both conditions are needed.')
      ),
      exitItem(
        bi('Мөс усанд хөвдөг шалтгаан?', 'Why does ice float on water?'),
        [
          bi('Устөрөгчийн холбоо нээлттэй тор үүсгэж, молекулууд холдоно', 'Hydrogen bonds form an open lattice, so the molecules are further apart'),
          bi('Мөсөнд ковалент холбоо илүү', 'Ice has more covalent bonds'),
          bi('Мөс илүү их электрон агуулдаг', 'Ice contains more electrons'),
          bi('Мөс илүү хүнд', 'Ice is heavier')
        ],
        0,
        bi('Мөсөнд нээлттэй торын бүтэц → нягт бага.', 'The open lattice of ice makes it less dense.')
      )
    ],
    ID
  ),
  lesson(
    4,
    bi('Металлын холбоо, бүтэц ба шинж, шалгалтын дасгал', 'Metallic bonding, structure and properties, exam practice'),
    bi(
      'Металлын холбоо, бүтцээр физик шинжийг тайлбарлах; шалгалтын хэв маягийн асуултад бүтэн хариулт бичих (хөтөлбөр 3.3, 3.5; слайд 47–62).',
      'Explain metallic bonding and how structure sets physical properties; write full exam answers (syllabus 3.3, 3.5; slides 47–62).'
    ),
    [
      bi('Металлын холбоо: эерэг ионуудын ба делокалчлагдсан электронуудын хоорондох цахилгаан таталцал. Бүх чиглэлд үйлчилнэ.', 'Metallic bond: electrostatic attraction between positive ions and delocalised electrons. It acts in all directions.'),
      bi('Металлын холбоо хүчтэй байх нөхцөл: ионы цэнэг өндөр, ион жижиг, атом бүрээс делокалчлагдсан электрон олон. Al³⁺ (3 электрон) > Na⁺ (1 электрон) → Al өндөр хайлна.', 'The metallic bond is stronger with a higher ion charge, a smaller ion and more delocalised electrons per atom. Al³⁺ (3 electrons) > Na⁺ (1 electron) → Al melts higher.'),
      bi('Металл дамжуулна: хатуу ба хайлмал үед делокалчлагдсан электрон хөдөлнө. Ионы бодис хатуу үед дамжуулахгүй; хайлмал ба уусмал үед ион хөдөлнө.', 'Metals conduct: delocalised electrons move when solid and molten. An ionic solid does not conduct when solid; it conducts as a melt or solution because the ions move.'),
      bi('Бүтэц ба физик шинжийн хүснэгт: аварга ионы, металл, энгийн молекул, аварга ковалент. Өндөр хайлах цэг холбооны төрлийг тодорхойлохгүй; бага хайлах цэг энгийн молекулыг илтгэнэ.', 'Table of structure and physical properties: giant ionic, metallic, simple molecular, giant covalent. A high melting point does not by itself identify the bonding type; a low melting point points to a simple molecular substance.'),
      bi('Шалгалтын зөвлөгөө: "bonds break" → "intermolecular forces are overcome"; "ионы хатуу электроноор дамжина" гэж бичихгүй.', 'Exam tips: write "intermolecular forces are overcome", not "bonds break"; do not write that a solid ionic compound conducts by electrons.')
    ],
    lessonSteps(
      [
        [
          bi('Металлын холбоо', 'Metallic bonding'),
          bi('Металл атомууд нягт торт байрлаж, гаднах электроноо алдаж эерэг ион болно. Электронууд торын дагуу чөлөөтэй хөдөлнө. I do: Al³⁺ ба Na⁺-ийн хайлах цэг.', 'Metal atoms pack into a close lattice and lose their outer electrons to become positive ions. The electrons move freely through the lattice. I do: the melting points of Al and Na.'),
          bi('Диаграммыг шошголно: эерэг ион, делокалчлагдсан электрон, таталцал.', 'Label a diagram: positive ions, delocalised electrons, attraction.'),
          bi('Шошгууд зөв, таталцлыг бүх чиглэлд гэж хэлсэн эсэх.', 'Labels correct; the attraction is said to act in all directions.')
        ],
        [
          bi('Металлын шинж: дамжуулалт, хайлах цэг', 'Metal properties: conduction and melting point'),
          bi('We do: цахилгаан дамжуулах, өндөр хайлах цэг, Al ба Na-ийн дамжуулалт, зэсийн суурьтай тогоо. Бүтэц ба физик шинжийн хүснэгт.', 'We do: why metals conduct, why most have high melting points, why Al conducts better than Na, and why steel pans have a copper base. The table of structure and physical properties.'),
          bi('Хосоороо ярилцаж, дараа нь шалгалтын хариу бичнэ.', 'Talk in pairs, then write the exam answer.'),
          bi('Хариулт делокалчлагдсан электронтой холбоотой эсэх (ионы хөдөлгөөн биш).', 'Answers link conduction to delocalised electrons, not moving ions.')
        ],
        [
          bi('Виртуал лаб ба you do тайлбар (1/2)', 'Virtual lab and you-do explanations (1/2)'),
          bi('Таван бодис (зэс, NaCl, иод, сахароз, элс)-ийг дамжуулалт, уусах чанар, хайлах цэгээр таних. You do (1/2): Al₂O₃ ба AlCl₃-ийн хайлах цэг; MgCl₂ хатуу ба хайлмал; FeCl₂.', 'Identify five substances (copper, NaCl, iodine, sucrose, sand) by conduction, solubility and melting point. You do (1/2): the melting points of Al₂O₃ and AlCl₃; MgCl₂ solid and molten; FeCl₂.'),
          bi('Туршилтын үр дүнг урьдчилж таамаглана. Товч бүрийн өмнө "Чийдэн асах уу?" гэж асууна.', 'Predict each result before the click. Before each button, ask "will the lamp light?".'),
          bi('Бодис бүрийн төрөл, шалтгаан зөв эсэх.', 'Each substance: its type and reason correct.')
        ],
        [
          bi('Шалгалтын дасгал: тайлбар ба Paper 2 асуултууд', 'Exam practice: explanations and Paper 2 questions'),
          bi('You do (2/2): натрийн сульфат, пропанол, HCl. Шалгалтын алдааны 8 зөвлөгөө. Paper 2 Q1 (PCl₃), Q2 (Group 16 гидрид), Q3 (Na, Mg, этен) — шалгалтын нөхцөлд тус бүр 9–11 минут.', 'You do (2/2): sodium sulfate, propan-1-ol, HCl. The 8 exam tips. Paper 2 Q1 (PCl₃), Q2 (Group 16 hydrides), Q3 (Na, Mg, ethene) — 9–11 minutes each under exam conditions.'),
          bi('Шалгалтын нөхцөлд бичнэ, дараа нь хосоороо mark scheme-ээр засна.', 'Write under exam conditions, then mark each other against the mark scheme.'),
          bi('Оноо ба алдсан М-үүд тэмдэглэгдсэн эсэх.', 'Marks and lost M-points recorded.')
        ],
        [
          bi('Алдааг ол, дүгнэлт, гарах билет', 'Spot the error, summary and exit ticket'),
          bi('Spot the error: оюутны алдааг олох (NH₃ "тригонал хавтгай", "ус буцлахад O–H тасарна"). Дүгнэлтийн 10 мөр; гарах билет: NH₃, I₂ ба NaCl, H₂O; гэрийн даалгавар.', 'Spot the error: find the student error (NH₃ "trigonal planar", "water boils because O–H bonds break"). The 10-line summary; the exit ticket: NH₃, I₂ and NaCl, H₂O; homework.'),
          bi('Шалгагчаар ажиллана. Дүгнэлтийн мөр бүрийг нэг өгүүлбэрээр хэлнэ.', 'Work as the examiner. Say each summary line in one sentence.'),
          bi('Гарах билетийн оноо, fist to five-ийн дүн.', 'Exit ticket score and the fist-to-five rating.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Металлын холбоо юу вэ?', 'What is a metallic bond?'),
        [
          bi('Эерэг ба сөрөг ионы таталцал', 'Attraction between positive and negative ions'),
          bi('Эерэг ион ба делокалчлагдсан электроны таталцал', 'Attraction between positive ions and delocalised electrons'),
          bi('Хоёр атомын электрон хос хуваалцах', 'Two atoms sharing a pair of electrons'),
          bi('Устөрөгчийн холбоо', 'Hydrogen bonding')
        ],
        1,
        bi('Сөрөг ион биш, делокалчлагдсан электрон.', 'Not negative ions: delocalised electrons.')
      ),
      exitItem(
        bi('Хатуу NaCl дамжуулахгүй, хайлмал NaCl дамжуулна. Учир нь?', 'Solid NaCl does not conduct but molten NaCl does. Why?'),
        [
          bi('Хатуу үед электрон байхгүй', 'There are no electrons when solid'),
          bi('Хатуу үед ион торонд тогтсон, хайлмал үед чөлөөтэй', 'When solid the ions are fixed in the lattice; when molten they are free'),
          bi('Хайлмал үед электрон шилжинэ', 'Electrons move when molten'),
          bi('NaCl ковалент', 'NaCl is covalent')
        ],
        1,
        bi('Дамжуулалт нь ионы хөдөлгөөнөөс.', 'Conduction comes from the movement of ions.')
      ),
      exitItem(
        bi('Al нь Na-аас өндөр хайлдаг шалтгаан?', 'Why does Al melt at a higher temperature than Na?'),
        [
          bi('Al илүү хөнгөн', 'Al is lighter'),
          bi('Al³⁺ илүү их цэнэгтэй, жижиг, 3 делокалчлагдсан электронтой', 'Al³⁺ has a higher charge, is smaller and gives 3 delocalised electrons'),
          bi('Al ковалент', 'Al is covalent'),
          bi('Na илүү идэвхтэй', 'Na is more reactive')
        ],
        1,
        bi('Цэнэг их, радиус бага, электрон олон → холбоо хүчтэй.', 'Higher charge, smaller radius, more electrons → stronger bond.')
      ),
      exitItem(
        bi('Аль бодис хатуу үедээ дамжуулдаггүй вэ?', 'Which substance does not conduct when solid?'),
        [bi('Зэс', 'Copper'), bi('Натри', 'Sodium'), bi('Натрийн хлорид', 'Sodium chloride'), bi('Хөнгөнцэв', 'Aluminium')],
        2,
        bi('Ионы бодис хатуу үед ион тогтмол.', 'In an ionic solid the ions are fixed.')
      )
    ],
    ID
  )
];

export const AS3_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'as3-3': [
    term(bi('Цахилгаан сөрөг чанар', 'Electronegativity'), bi('Ковалент холбоонд холбоох хосыг өөрөө рүүгээ татах атомын чадвар', 'The power of an atom in a covalent bond to attract the bonding pair towards itself')),
    term(bi('Туйлтай холбоо', 'Polar bond'), bi('Электрон хос тэгш бус хуваалцагдсан холбоо (δ+ ба δ−)', 'A bond in which the shared pair is unequal (δ+ and δ−)')),
    term(bi('id–id хүч', 'id–id forces'), bi('Түр зуурын диполь ба өдөөгдсөн диполийн хоорондох таталцал', 'Attraction between an instantaneous dipole and an induced dipole')),
    term(bi('pd–pd хүч', 'pd–pd forces'), bi('Туйлт молекулын δ+ ба δ− хоорондох таталцал', 'Attraction between the permanent dipoles of polar molecules')),
    term(bi('Устөрөгчийн холбоо', 'Hydrogen bond'), bi('H (N, O, F-тэй холбоотой) ба хөрш молекулын ганц хосын хоорондох таталцал', 'Attraction between H (bonded to N, O or F) and a lone pair on a neighbouring molecule')),
    term(bi('Ван дер Ваальсын хүч', 'van der Waals’ forces'), bi('Молекул хоорондын бүх хүчний ерөнхий нэр', 'The general name for all intermolecular forces'))
  ],
  'as3-4': [
    term(bi('Металлын холбоо', 'Metallic bond'), bi('Эерэг ионы ба делокалчлагдсан электроны хоорондох цахилгаан таталцал', 'Electrostatic attraction between positive ions and delocalised electrons')),
    term(bi('Делокалчлагдсан электрон', 'Delocalised electron'), bi('Нэг атом эсвэл холбоонд хамаарахгүй, торын дагуу чөлөөтэй хөдлөх электрон', 'An electron not tied to one atom or bond, free to move through the lattice'))
  ]
};

export const AS3_PRACTICE_B: Record<string, PracticeItem[]> = {
  'as3-3': [
    easy(
      bi('Аль бодис туйлтай молекул вэ?', 'Which substance is a polar molecule?'),
      [bi('Cl₂', 'Cl₂'), bi('BF₃', 'BF₃'), bi('H₂O', 'H₂O'), bi('CBr₄', 'CBr₄')],
      2,
      bi('H₂O тахир тул диполь нөхөгдөхгүй; BF₃, CBr₄ нь тэгш тул туйлгүй.', 'H₂O is bent, so its dipoles do not cancel; BF₃ and CBr₄ are symmetrical and non-polar.')
    ),
    hard(
      bi('Пропанон (56 °C) ба бутан (0 °C)-ийн Mr ижил. Буцлах цэгийн ялгааг тайлбарлана уу.', 'Propanone (56 °C) and butane (0 °C) have the same Mr. Explain the difference in boiling point.'),
      bi('Хоёуланд id–id хүч байна. Пропанон туйлтай (C=O) тул pd–pd нэмэгдэнэ; бутан зөвхөн id–id. Тиймээс пропанон илүү өндөр буцална.', 'Both have id–id forces. Propanone is polar (C=O), so it also has pd–pd forces; butane has only id–id. So propanone boils higher.'),
      bi('Ялгаа нь туйлшрал (pd–pd) дээр байна.', 'The difference lies in polarity (pd–pd).')
    )
  ],
  'as3-4': [
    easy(
      bi('Металлын холбонд аль нь зөв вэ?', 'Which is correct for metallic bonding?'),
      [bi('Эерэг ион, сөрөг ион', 'Positive and negative ions'), bi('Эерэг ион ба делокалчлагдсан электрон', 'Positive ions and delocalised electrons'), bi('Молекул ба электрон хос', 'Molecules and a pair of electrons'), bi('Ион ба ганц хос', 'Ions and a lone pair')],
      1,
      bi('Металлын холбоо нь эерэг ион ба делокалчлагдсан электроны таталцал.', 'Metallic bonding is the attraction between positive ions and delocalised electrons.')
    ),
    hard(
      bi('Зэсийн суурьтай тогоо яагаад дулаан сайн дамжуулдаг вэ? (2 оноо)', 'Why does a steel pan with a copper base conduct heat well? (2 marks)'),
      bi('Зэс нь олон делокалчлагдсан электронтой; электрон торын дагуу хурдан хөдөлж дулааныг дамжуулна.', 'Copper has many delocalised electrons that move quickly through the lattice and carry the heat.'),
      bi('Дамжуулалт делокалчлагдсан электроноос; ионы чичиргээ нэмж болно.', 'Conduction is by delocalised electrons; ion vibrations add a little.')
    )
  ]
};
