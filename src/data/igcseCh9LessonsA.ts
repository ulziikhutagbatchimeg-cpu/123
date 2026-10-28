// IGCSE 0620 chapter 9 (metals), lessons 1–2: metallic elements and alloys. They follow the deck
// Ch14_Metallic_elements_and_alloys.pptx and its plan of two 40-minute lessons (slides 1–11 and 12 on), with the review
// slides 21–28. Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig9';

export const IG9_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Металлын шинж, урвал ба хэрэглээ', 'Properties, reactions and uses of metals'),
    bi(
      'Металл ба металл бусын физик шинжийг харьцуулах; металлын шингэрүүлсэн хүчил, хүйтэн ус/уур, хүчилтөрөгчтэй урвалыг тайлбарлах; хөнгөнцагаан ба зэсийн хэрэглээг шинжтэй нь холбох; хайлшийг тодорхойлох.',
      'Compare the physical properties of metals and non-metals; describe the reactions of metals with dilute acids, cold water/steam and oxygen; link the uses of aluminium and copper to their properties; describe an alloy.'
    ),
    [
      bi('Металл: хайлах цэг өндөр, сайн дамжуулагч, хавтгайлагдана, сунана, гялалзсан, дуут; металл бус: эсрэгээр (графит, алмаз, мөнгөн ус үл хамаарна).', 'Metals: high melting points, good conductors, malleable, ductile, shiny, sonorous; non-metals: the opposite (graphite, diamond and mercury are exceptions).'),
      bi('Металл + хүйтэн ус → гидроксид + H₂; + уур → исэл + H₂; + хүчил → давс + H₂. Идэвх: K > Na > Ca > Mg > Zn > Fe > Cu.', 'Metal + cold water → hydroxide + H₂; + steam → oxide + H₂; + acid → salt + H₂. Reactivity: K > Na > Ca > Mg > Zn > Fe > Cu.'),
      bi('Хөнгөнцагаан: нягт бага, дамжуулна, зэврэлтэд тэсвэртэй (онгоц, цахилгааны шугам, хүнсний сав). Зэс: сайн дамжуулагч, сунамтгай (цахилгааны утас).', 'Aluminium: low density, conducts, resists corrosion (aircraft, power cables, food containers). Copper: good conductor, ductile (electrical wiring).')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi(
          'Том асуулт: цэвэр алт, цэвэр төмөр нэлээд зөөлөн – яагаад зоос, хутга сэрээ, гүүрийг хайлшаар хийдэг вэ? "Санал нийлэх үү?" (хайлш нэгдэл; хайлш цэвэр металлаас хатуу; зэсийг бат бөх учир утсанд хэрэглэдэг) ба төлөвлөгөө.',
          'Big question: pure gold and pure iron are quite soft – why are coins, cutlery and bridges made from alloys? "Agree or disagree?" (an alloy is a compound; alloys are usually harder than the pure metal; copper is used in wires because it is strong) and the plan.'
        ),
        bi('Гэрийнхээ гурван металл эд зүйлийг нэрлэж, яагаад тэр металл сонгосныг хосоороо 60 секунд ярилцана.', 'Name three metal objects at home and why that metal was chosen (think–pair–share, 60 s).'),
        bi('Хайлш илүү хатуу, бат бөх, зэврэлтэд тэсвэртэй.', 'Alloys are harder, stronger and resist corrosion.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi(
          'Хавтгайлагдах (алх) ба сунах (утас татах)-ыг гараар үзүүлнэ. Зорилгод fist to five. Давталт: металлын холбоо, металл яагаад дамжуулдаг, металл + хүчил, устөрөгчийн шинжилгээ.',
          'Show malleable (hammering) and ductile (drawing into wire) with the hands. Fist to five on the objectives. Retrieval: metallic bonding, why metals conduct, metal + acid, the test for hydrogen.'
        ),
        bi('Самбартаа бичээд 3-2-1-д өргөнө.', 'Write on show-me boards and reveal on 3-2-1.'),
        bi('Эерэг ионууд ба делокалчлагдсан электроны тэнгис; электрон хөдөлнө; давс + H₂; "пүх".', 'Positive ions in a sea of delocalised electrons; the electrons move; salt + H₂; a squeaky pop.')
      ],
      [
        bi('Металл ба металл бус; яагаад хавтгайлагдаж, дамжуулдаг вэ', 'Metals vs non-metals; why metals are malleable and conduct'),
        bi(
          'Хүснэгт 14.1: хайлах цэг, цахилгаан ба дулаан дамжуулалт, хавтгайлагдах, төрх. Зураг 14.3: давхарга гулсаж металл хугарахгүй нугарна; делокалчлагдсан электрон цахилгаан дамжуулна; халсан атом энергиэ дамжуулна.',
          'Table 14.1: melting points, electrical and thermal conductivity, malleability, appearance. Figure 14.3: the layers slide so the metal bends instead of breaking; delocalised electrons carry the current; heated atoms pass the energy on.'
        ),
        bi('Нүд бүрийг таамаглана; номыг давхарлаж дээд давхаргыг түлхэж гулсуулна.', 'Predict each cell; stack books in layers and push the top layer so it slides.'),
        bi('Металл бусын онцгой тохиолдол: графит дамжуулна, алмаз дулаан дамжуулна; мөнгөн ус шингэн.', 'Exceptions: graphite conducts electricity, diamond conducts heat; mercury is a liquid.')
      ],
      [
        bi('Металлын химийн урвал; hinge', 'Chemical reactions of metals; hinge'),
        bi(
          'Хүснэгт 14.2: K, Na, Ca, Mg, Zn/Fe, Cu-ийн хүчилтөрөгч, хүйтэн ус, уур, HCl-тай урвал. Тэгшитгэлүүд: 2Mg + O₂ → 2MgO; Ca + 2H₂O → Ca(OH)₂ + H₂; Mg + H₂O(g) → MgO + H₂; Zn + 2HCl → ZnCl₂ + H₂. Hinge 1.',
          'Table 14.2: how K, Na, Ca, Mg, Zn/Fe and Cu react with oxygen, cold water, steam and HCl. Equations: 2Mg + O₂ → 2MgO; Ca + 2H₂O → Ca(OH)₂ + H₂; Mg + H₂O(g) → MgO + H₂; Zn + 2HCl → ZnCl₂ + H₂. Hinge 1.'
        ),
        bi('Мөр гарах тусам металлыг идэвхээр эрэмбэлнэ; хосоороо тэгшитгэлийг тэнцүүлж шалгана; ABCD хуруугаар санал өгнө.', 'Rank the metals by reactivity as the rows appear; balance and check the equations in pairs; vote with ABCD fingers.'),
        bi('Hinge: C (төмөр – уур ба хүчилтэй урвална, хүйтэн устай үгүй).', 'Hinge: C (iron – reacts with steam and dilute acid, not with cold water).')
      ],
      [
        bi('Металлын хэрэглээ ба хайлш', 'Uses of metals and alloys'),
        bi(
          'Хэрэглээ ↔ шинж: онгоц, цахилгааны шугам, хүнсний сав (хөнгөнцагаан), цахилгааны утас (зэс). Хайлш = металл ба бусад элементийн хольц; гууль = зэс + цайр; зэвэрдэггүй ган = төмөр + хром, никель, нүүрстөрөгч (Зураг 14.14).',
          'Use ↔ property: aircraft, power cables, food containers (aluminium), electrical wiring (copper). An alloy = a mixture of a metal with other elements; brass = copper + zinc; stainless steel = iron + chromium, nickel and carbon (Figure 14.14).'
        ),
        bi('Хэрэглээ бүрийн шинжийг таамаглана; цэвэр төмрийг хутга сэрээнд яагаад хэрэглэдэггүйг ярилцана.', 'Predict the property for each use; discuss why pure iron is not used for knives and forks.'),
        bi('Хэрэглээг шинжтэй холбож бичнэ; хайлш – хольц, нэгдэл биш.', 'Link each use to a property; an alloy is a mixture, not a compound.')
      ]
    ]),
    [
      exitItem(
        bi('"Сунамтгай" (ductile) гэж юу гэсэн үг вэ?', 'What does "ductile" mean?'),
        [bi('Цохиход хэлбэржинэ', 'Can be hammered into shape'), bi('Утас болгон сунгаж болно', 'Can be drawn into wires'), bi('Цохиход хонх шиг дуугарна', 'Rings like a bell when struck'), bi('Гялалзана', 'Is shiny')],
        1,
        bi('Хавтгайлагдах = цохиж хэлбэржих; сунамтгай = утас болгох.', 'Malleable = hammered into shape; ductile = drawn into wires.')
      ),
      exitItem(
        bi('Аль металл хүйтэн устай мэдэгдэхүйц урвалддаггүй ч уур ба шингэрүүлсэн хүчилтэй урвалддаг вэ?', 'Which metal reacts with steam but not noticeably with cold water, and also reacts with dilute acid?'),
        [bi('Зэс', 'Copper'), bi('Натри', 'Sodium'), bi('Төмөр', 'Iron'), bi('Алт', 'Gold')],
        2,
        bi('Төмөр уур ба хүчилтэй урвална; зэс ба алт шингэрүүлсэн хүчилтэй урвалддаггүй.', 'Iron reacts with steam and dilute acids; copper and gold do not react with dilute acids.')
      ),
      exitItem(
        bi('Магни уурын урвалын бүтээгдэхүүн юу вэ?', 'What are the products when magnesium reacts with steam?'),
        [bi('Магнийн гидроксид + устөрөгч', 'Magnesium hydroxide + hydrogen'), bi('Магнийн исэл + устөрөгч', 'Magnesium oxide + hydrogen'), bi('Магнийн исэл + ус', 'Magnesium oxide + water'), bi('Урвал явагдахгүй', 'No reaction')],
        1,
        bi('Металл + уур → металлын исэл + устөрөгч (гидроксид биш).', 'Metal + steam → metal oxide + hydrogen (not the hydroxide).')
      ),
      exitItem(
        bi('Зэсийг цахилгааны утсанд яагаад хэрэглэдэг вэ?', 'Why is copper used in electrical wiring?'),
        [
          bi('Металл учир', 'Because it is a metal'),
          bi('Сайн цахилгаан дамжуулагч бөгөөд сунамтгай', 'It is a good electrical conductor and is ductile'),
          bi('Нягт бага', 'It has a low density'),
          bi('Бат бөх', 'It is strong')
        ],
        1,
        bi('Хэрэглээг шинжтэй холбож бич – "металл учир" гэвэл оноо авахгүй.', 'Link the use to properties – "because it is a metal" scores nothing.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Хайлш, (E) яагаад хатуу вэ, шалгалт', 'Alloys, (E) why they are harder, and exam practice'),
    bi(
      'Түгээмэл хайлшийн бүрэлдэхүүн ба хэрэглээг тайлбарлах; бүтцийн диаграммаас металл ба хайлшийг таних; (E) хайлш яагаад цэвэр металлаас хатуу, бат бөх болохыг тайлбарлах; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх.',
      'Describe the composition and uses of common alloys; identify metals and alloys from structure diagrams; (E) explain why alloys are harder and stronger than pure metals; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('Гууль – зэс + цайр; хүрэл – зэс + цагаан тугалга; зөөлөн ган – төмөр + бага нүүрстөрөгч; зэвэрдэггүй ган – төмөр, хром, никель, нүүрстөрөгч; гагнуур – цагаан тугалга + хар тугалга.', 'Brass – copper + zinc; bronze – copper + tin; mild steel – iron + a little carbon; stainless steel – iron, chromium, nickel, carbon; solder – tin + lead.'),
      bi('(E) Цэвэр металлд атомууд ижил хэмжээтэй тул давхарга амархан гулсана; хайлшид өөр хэмжээтэй атом давхаргыг эвдэж гулсахад саад болно → илүү хатуу, бат бөх.', '(E) In a pure metal the atoms are the same size, so the layers slide easily; in an alloy, atoms of different sizes disrupt the layers so they cannot slide → harder and stronger.'),
      bi('Диаграмм: цэвэр металл = ижил атом эгнээгээр; хайлш = өөр хэмжээтэй атом торонд холилдсон.', 'Diagrams: pure metal = one size of atom in regular rows; alloy = different-sized atoms mixed in the lattice.')
    ],
    lessonSteps([
      [
        bi('Хамтдаа: түгээмэл хайлш; судлах', 'We do: common alloys; explore'),
        bi('Гууль, хүрэл, зөөлөн ган, зэвэрдэггүй ган, гагнуурын бүрэлдэхүүн, хэрэглээ ба шалтгаан. Судлах: цэвэр алт бөгжинд хэт зөөлөн ч 18 карат алт яагаад тохирох вэ.', 'The composition, use and reason for brass, bronze, mild steel, stainless steel and solder. Explore: why pure gold is too soft for a ring but 18-carat gold is fine.'),
        bi('Мөр бүрийн шалтгааныг өөр сурагч хэлнэ (cold call); таамаглалаа самбартаа бичнэ.', 'A different student gives the reason for each use (cold call); write the prediction on boards.'),
        bi('Гууль = зэс + цайр (зэс + цагаан тугалга нь хүрэл).', 'Brass = copper + zinc (copper + tin is bronze).')
      ],
      [
        bi('(E) Хайлш яагаад хатуу вэ; hinge 2', '(E) Why alloys are harder; hinge 2'),
        bi('Зураг 14.15: өөр хэмжээтэй атом давхаргыг "түгжинэ". Hinge 2: хайлшийн тухай аль өгүүлбэр зөв вэ.', 'Figure 14.15: different-sized atoms "lock" the layers. Hinge 2: which statement about alloys is correct.'),
        bi('Номын давхаргад том ном хийж дээд давхаргыг гулсуулж үзнэ; ABCD картаар санал өгнө.', 'Put a big book into the stack and try to slide the top layer; vote with ABCD cards.'),
        bi('Давхарга гулсахгүй → хатуу; hinge: C (гууль = зэс + цайр).', 'The layers cannot slide → harder; hinge: C (brass is copper + zinc).')
      ],
      [
        bi('Бие даан: металл ба хайлш; hinge 3', 'You do: metals and alloys; hinge 3'),
        bi('Утсанд тохирох хоёр шинж, онгоцонд хөнгөнцагаан, магни + уурын үгэн тэгшитгэл, (E) зэвэрдэггүй ган яагаад цэвэр төмрөөс хатуу. Hinge 3: диаграммд хайлшийг юу харуулах вэ.', 'Two properties that suit wiring, aluminium for aircraft, the word equation for magnesium + steam, (E) why stainless steel is harder than pure iron. Hinge 3: which diagram feature shows an alloy.'),
        bi('Бие даан бичээд дэвтрээ солилцож өөр өнгөөр засна; ABCD хуруугаар санал өгнө.', 'Write alone, swap books and mark in a different colour; vote with ABCD fingers.'),
        bi('Дамжуулагч, сунамтгай; нягт бага, хайлшаар бат бөх; магнийн исэл + устөрөгч; hinge: B.', 'Conductor, ductile; low density and strong as an alloy; magnesium oxide + hydrogen; hinge: B.')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi(
          '(a)–(d): металл бусын 2 шинж, кальци хүйтэн усанд, зэс утсанд, (E) хайлшийн бат бөхийг бүтцээр. 4 шалгалтын зөвлөмж. Үнэлэх: онгоцны их биед гангийн оронд хөнгөнцагаан. Алдаа засах: "хайлшийн атом илүү хүчтэй".',
          '(a)–(d): two properties of non-metals, calcium in cold water, copper in wiring, (E) the strength of alloys in terms of structure. The 4 exam tips. Evaluate: aluminium instead of steel for aircraft bodies. Error clinic: "the alloy atoms are stronger".'
        ),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes, swap and tick each marking point; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('Хөөсрөх, кальци алга болох, цайдам уусмал ("H₂ үүснэ" нь ажиглалт биш); өөр хэмжээтэй атом → давхарга гулсахгүй.', 'Fizzing, the calcium disappears, a cloudy white solution ("H₂ is produced" is not an observation); different-sized atoms → layers cannot slide.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: сунамтгай, Zn + HCl-ийн бүтээгдэхүүн, гуулийн металлууд, хутга сэрээнд зэвэрдэггүй ган. Зорилгод дахин fist to five.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: ductile, the products of Zn + HCl, the metals in brass, stainless steel for cutlery. Fist to five on the objectives again.'),
        bi('Гарах билетийг 4 минутад ганцаараа чимээгүй бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone and in silence in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('Утас болгон сунгах; ZnCl₂ + H₂; зэс ба цайр; хатуу, зэвэрдэггүй.', 'Drawn into wires; ZnCl₂ + H₂; copper and zinc; hard and does not rust.')
      ]
    ]),
    [
      exitItem(
        bi('Хайлшийн тухай аль өгүүлбэр зөв бэ?', 'Which statement about alloys is correct?'),
        [
          bi('Хайлш нь хоёр металлын нэгдэл', 'An alloy is a compound of two metals'),
          bi('Хайлш цэвэр металлаас үргэлж зөөлөн', 'Alloys are always softer than pure metals'),
          bi('Гууль бол зэс ба цайрын хайлш', 'Brass is an alloy of copper and zinc'),
          bi('Зэвэрдэггүй ган бол цэвэр төмөр', 'Stainless steel is pure iron')
        ],
        2,
        bi('Хайлш – хольц, ихэвчлэн цэвэр металлаас хатуу.', 'Alloys are mixtures and are usually harder than pure metals.')
      ),
      exitItem(
        bi('Диаграммд хайлшийг юу харуулах вэ?', 'Which diagram feature shows an alloy?'),
        [
          bi('Ижил атом эгнээгээр', 'Identical atoms in regular layers'),
          bi('Өөр хэмжээтэй атом торонд холилдсон', 'Atoms of different sizes mixed in the lattice'),
          bi('Хоорондоо зайтай тусдаа молекулууд', 'Separate molecules with gaps between them'),
          bi('Аварга ионы торонд байрласан ионууд', 'Ions held in a giant ionic lattice')
        ],
        1,
        bi('A нь цэвэр металл.', 'A shows a pure metal.')
      ),
      exitItem(
        bi('Зэвэрдэггүй гангаар хутга сэрээ яагаад хийдэг вэ?', 'Why is stainless steel used for cutlery?'),
        [bi('Хатуу, зэвэрдэггүй', 'It is hard and resists rusting'), bi('Нягт бага', 'It has a low density'), bi('Хайлах цэг бага', 'It has a low melting point'), bi('Цахилгаан дамжуулдаггүй', 'It does not conduct electricity')],
        0,
        bi('Төмөр + хром, никель, нүүрстөрөгч – хатуу, зэврэхгүй.', 'Iron + chromium, nickel and carbon – hard and does not rust.')
      ),
      exitItem(
        bi('(E) Хайлш яагаад цэвэр металлаас хатуу, бат бөх вэ?', '(E) Why are alloys harder and stronger than pure metals?'),
        [
          bi('Хайлшид илүү хүчтэй холбоо бий', 'Alloys have stronger bonds'),
          bi('Өөр хэмжээтэй атом давхаргыг эвдэж гулсахад саад болдог', 'Different-sized atoms disrupt the layers, so they cannot slide easily'),
          bi('Хайлшийн атом илүү хүнд', 'Alloy atoms are heavier'),
          bi('Хайлш нэгдэл', 'Alloys are compounds')
        ],
        1,
        bi('"Илүү хүчтэй холбоо" гэвэл оноо авахгүй.', '"Stronger bonds" scores nothing.')
      )
    ],
    ID
  )
];

export const IG9_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'ig9-1': [
    term(bi('хавтгайлагдах', 'malleable'), bi('Хугаралгүйгээр цохиж хэлбэржүүлж болох.', 'Can be hammered into shape without breaking.')),
    term(bi('сунамтгай', 'ductile'), bi('Утас болгон сунгаж болох.', 'Can be drawn (stretched) into wires.')),
    term(bi('дуут', 'sonorous'), bi('Цохиход хонх шиг дуугарна.', 'Rings like a bell when struck.'))
  ],
  'ig9-2': [
    term(bi('хайлш', 'alloy'), bi('Металл ба бусад элементийн (ихэвчлэн металл) хольц.', 'A mixture of a metal with other elements (usually metals).')),
    term(bi('гууль', 'brass'), bi('Зэс ба цайрын хайлш.', 'An alloy of copper and zinc.')),
    term(bi('зэвэрдэггүй ган', 'stainless steel'), bi('Төмөр, хром, никель, нүүрстөрөгчийн хайлш – зэвэрдэггүй.', 'An alloy of iron with chromium, nickel and carbon – resists rusting.'))
  ]
};

export const IG9_PRACTICE_A: Record<string, PracticeItem[]> = {
  'ig9-1': [
    easy(
      bi('Аль нь металл бусын шинж вэ?', 'Which is a property of non-metals?'),
      [bi('Сайн цахилгаан дамжуулагч', 'Good electrical conductor'), bi('Хатуу үедээ хэврэг', 'Brittle when solid'), bi('Хавтгайлагдана', 'Malleable'), bi('Дуут', 'Sonorous')],
      1,
      bi('Металл бус ихэвчлэн хэврэг, муу дамжуулагч, бүдэг.', 'Non-metals are usually brittle, poor conductors and dull.')
    ),
    easy(
      bi('Хөнгөнцагааныг онгоцонд яагаад хэрэглэдэг вэ?', 'Why is aluminium used for aircraft?'),
      [bi('Нягт бага, хайлшаар бат бөх', 'Low density and strong as an alloy'), bi('Маш хүнд', 'It is very heavy'), bi('Соронздоно', 'It is magnetic'), bi('Хайлах цэг бага', 'It has a low melting point')],
      0,
      bi('Хөнгөн тул түлш хэмнэнэ; ислийн давхарга зэврэлтээс хамгаална.', 'It is light, so it saves fuel; its oxide layer protects it from corrosion.')
    ),
    hard(
      bi('Кальцийг хүйтэн усанд хийхэд юу ажиглагдахыг бичиж, тэгшитгэлийг бич.', 'Describe what you would see when calcium is added to cold water, and write the equation.'),
      bi('Хөөсрөнө [1]; кальци алга болж, цайдам цагаан уусмал үүснэ [1]. Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g).', 'Bubbles / fizzing [1]; the calcium disappears and a cloudy white solution forms [1]. Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g).'),
      bi('"Устөрөгч үүснэ" нь ажиглалт биш – юу харагдаж байгааг бич.', '"Hydrogen is produced" is not an observation – describe what you see.')
    )
  ],
  'ig9-2': [
    easy(
      bi('Гагнуур (solder) ямар металлаас тогтох вэ, юунд хэрэглэдэг вэ?', 'What is solder made of, and what is it used for?'),
      [
        bi('Цагаан тугалга ба хар тугалга – цахилгааны утас холбоход (хайлах цэг бага)', 'Tin and lead – joining electrical wires (low melting point)'),
        bi('Зэс ба цайр – хөгжмийн зэмсэг', 'Copper and zinc – musical instruments'),
        bi('Төмөр ба нүүрстөрөгч – гүүр', 'Iron and carbon – bridges'),
        bi('Зэс ба цагаан тугалга – хөшөө', 'Copper and tin – statues')
      ],
      0,
      bi('Гагнуурын хайлах цэг бага тул утас холбоход тохиромжтой.', 'Solder has a low melting point, so it is good for joining wires.')
    ),
    easy(
      bi('Хүрэл ямар металлын хайлш вэ?', 'Which metals are in bronze?'),
      [bi('Зэс ба цайр', 'Copper and zinc'), bi('Зэс ба цагаан тугалга', 'Copper and tin'), bi('Төмөр ба хром', 'Iron and chromium'), bi('Цагаан тугалга ба хар тугалга', 'Tin and lead')],
      1,
      bi('Хүрэл = зэс + цагаан тугалга; гууль = зэс + цайр.', 'Bronze = copper + tin; brass = copper + zinc.')
    ),
    hard(
      bi('(E) Бүтцээр хайлш яагаад цэвэр металлаас бат бөх болохыг тайлбарла. [2]', '(E) Explain, in terms of structure, why alloys are stronger than pure metals. [2]'),
      bi('Хайлшид өөр хэмжээтэй атом байна [1]; тэд давхаргыг эвдэж, давхарга бие биен дээгүүр гулсаж чадахгүй [1].', 'An alloy has atoms of different sizes [1]; they disrupt the layers, so the layers cannot slide over each other [1].'),
      bi('"Хүчтэй холбоо" биш – давхарга гулсахгүй гэдгийг заавал бич.', 'Not "stronger bonds" – say that the layers cannot slide.')
    )
  ]
};
