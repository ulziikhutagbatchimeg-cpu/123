// IGCSE 0620 chapter 10 (chemistry of the environment), lessons 1–2. They follow the deck
// Ch17_Chemistry_of_our_environment.pptx and its plan of two 40-minute lessons: air (slides 1–12) and water (13 on),
// with the review slides 22–29. Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig10';

export const IG10_LESSONS: StatesLesson[] = [
  lesson(
    1,
    bi('Агаар: бүрэлдэхүүн, бохирдуулагч ба уур амьсгал', 'Air: composition, pollutants and climate'),
    bi(
      'Цэвэр, хуурай агаарын бүрэлдэхүүнийг хэлэх; CO₂, CH₄, CO, тоосонцор, NOₓ, SO₂-ийн эх үүсвэр ба хор нөлөө; уур амьсгалын өөрчлөлт ба хүчиллэг бороог бууруулах арга; фотосинтез; (E) хүлэмжийн нөлөө, NOₓ үүсэх ба катализын хувиргагч.',
      'State the composition of clean, dry air; the sources and adverse effects of CO₂, CH₄, CO, particulates, NOₓ and SO₂; strategies against climate change and acid rain; photosynthesis; (E) the greenhouse effect, how NOₓ form and catalytic converters.'
    ),
    [
      bi('Цэвэр, хуурай агаар: ≈78% азот, ≈21% хүчилтөрөгч, үлдсэн ≈1% нь голдуу аргон, мөн ≈0.04% CO₂.', 'Clean dry air: about 78% nitrogen, 21% oxygen; the remaining ~1% is mainly argon, with about 0.04% CO₂.'),
      bi('CO ба тоосонцор – түлш дутуу шатах (CO хортой); NOₓ – машины хөдөлгүүр; SO₂ – хүхэртэй түлш шатах (хүчиллэг бороо); CO₂, CH₄ – дэлхийн дулаарлыг нэмнэ.', 'CO and particulates – incomplete combustion (CO is toxic); NOₓ – car engines; SO₂ – burning fuels that contain sulfur (acid rain); CO₂ and CH₄ – increased global warming.'),
      bi('Бууруулах: мод тарих, мал аж ахуйг багасгах, чулуужсан түлш бага хэрэглэх, сэргээгдэх эрчим хүч; CaO-оор SO₂-ийг яндангаас зайлуулах. (E) 2CO + 2NO → 2CO₂ + N₂.', 'Reducing them: plant trees, less livestock farming, less fossil fuel, renewable energy; CaO removes SO₂ from chimneys. (E) 2CO + 2NO → 2CO₂ + N₂.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi(
          'Том асуулт: амьсгалдаг агаар ба цоргоны ус хоёулаа хольц – тэдгээрт юу байна, юу бохирдуулдаг, хими юу хийж чадах вэ? Улаанбаатарын өвлийн утааг жишээ болгоно. "Санал нийлэх үү?" (агаар голдуу хүчилтөрөгч; хүлэмжийн нөлөө бүрэн хортой; нүүрс шатаахад SO₂ ялгарна) ба төлөвлөгөө.',
          'Big question: the air we breathe and the water from our taps are both mixtures – what is in them, what pollutes them, and what can chemistry do? Use Ulaanbaatar’s winter smog as the example. "Agree or disagree?" (most of the air is oxygen; the greenhouse effect is completely harmful; burning coal releases SO₂) and the plan.'
        ),
        bi('Хотынхоо агаарын хоёр бохирдуулагч ба эх үүсвэрийг хосоороо 60 секундэд нэрлэж, эрхий хуруугаар санал өгнө.', 'Name two pollutants in their city’s air and their sources in 60 s; vote with thumbs.'),
        bi('Агаар ба ус – хольц; бохирдуулагчид хүний үйл ажиллагаанаас; агаар 78% азот.', 'Air and water are mixtures; pollutants come from human activity; air is 78% nitrogen.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт, агаарын бүрэлдэхүүн', 'Key terms, objectives, retrieval and the composition of air'),
        bi(
          'Агаарын бүрэлдэхүүний хувийг цээжлүүлнэ; зорилгод fist to five. Давталт: нүүрсустөрөгчийн бүрэн шаталт, усгүй CuSO₄-ийн тест, SO₂ хүчиллэг эсвэл суурь, NPK. Зураг 17.2: 78% N₂, 21% O₂, үлдсэн нь Ar, CO₂.',
          'Learn the percentages in air; fist to five on the objectives. Retrieval: complete combustion of a hydrocarbon, the anhydrous CuSO₄ test, whether SO₂ is acidic or basic, NPK. Figure 17.2: 78% N₂, 21% O₂, the rest Ar and CO₂.'
        ),
        bi('Самбартаа бичээд 3-2-1-д өргөнө; 100 агаарын бөөмийн хэд нь N₂, O₂ болохыг хуруугаараа үзүүлнэ.', 'Write on show-me boards and reveal on 3-2-1; show with fingers how many of 100 air particles are N₂ and O₂.'),
        bi('CO₂ + H₂O; цагаан → цэнхэр; хүчиллэг; N, P, K; хүчилтөрөгч 21% (78% биш).', 'CO₂ + H₂O; white → blue; acidic; N, P, K; oxygen is 21% (not 78%).')
      ],
      [
        bi('Агаарын бохирдуулагч ба хүчиллэг бороо', 'Air pollutants and acid rain'),
        bi(
          'Бохирдуулагч–эх үүсвэр–хор нөлөөний хүснэгт (CO₂, CH₄, CO ба тоосонцор, NOₓ, SO₂). Хүчиллэг бороо (Зураг 17.4): SO₂ ба NOₓ борооны усанд уусна; барилга, хөшөө, загас, модыг гэмтээнэ; CaO-оор яндангийн хийг цэвэршүүлэх; хүхэр багатай түлш.',
          'The table of pollutant – source – effect (CO₂, CH₄, CO and particulates, NOₓ, SO₂). Acid rain (Figure 17.4): SO₂ and NOₓ dissolve in rainwater; it damages buildings, statues, fish and trees; flue-gas desulfurisation with CaO; low-sulfur fuels.'
        ),
        bi('Бохирдуулагч бүрийн эх үүсвэр, нөлөөг таамаглана; хүчиллэг бороо гантиг хөшөөг яагаад гэмтээдгийг ярилцана (11-р бүлэг).', 'Predict the source and effect of each pollutant; discuss why acid rain damages marble statues (chapter 11).'),
        bi('CO хүлэмжийн хий биш, хортой; SO₂ машинаас биш, хүхэртэй түлшнээс.', 'CO is toxic, not a greenhouse gas; SO₂ comes from fuels containing sulfur, not from car engines.')
      ],
      [
        bi('Хүлэмжийн нөлөө ба уур амьсгалын өөрчлөлт; судлах', 'The greenhouse effect and climate change; explore'),
        bi(
          'Зураг 17.6: CO₂, CH₄ дэлхийг дулаан байлгана; (E) дэлхий богино долгионы цацрагийг шингээж, дулааны (хэт улаан) энергийг ялгаруулна; хүлэмжийн хий түүнийг шингээж бүх чиглэлд дахин ялгаруулна. Бууруулах 4 арга ба фотосинтез: (E) 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Судлах: PhET Greenhouse Effect.',
          'Figure 17.6: CO₂ and CH₄ keep the Earth warm; (E) the Earth absorbs short-wavelength radiation and re-emits thermal (infrared) energy; greenhouse gases absorb it and re-emit it in all directions. The 4 strategies and photosynthesis: (E) 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Explore: PhET Greenhouse Effect.'
        ),
        bi('"Дулаан" сурагчид өрөөнөөс гарах гэхэд "хүлэмжийн хий" сурагчид буцаана; 4 аргыг хосоороо үр нөлөөгөөр эрэмбэлнэ.', 'Students as "heat" try to leave the room and "greenhouse gas" students bounce them back; rank the 4 strategies in pairs.'),
        bi('Хүлэмжийн нөлөөг озоны цоорхойтой андуурахгүй; фотосинтезийн бүтээгдэхүүн – глюкоз ба хүчилтөрөгч.', 'Do not confuse the greenhouse effect with the ozone hole; photosynthesis makes glucose and oxygen.')
      ],
      [
        bi('(E) Катализын хувиргагч; hinge 1–2', '(E) Catalytic converters; hinges 1–2'),
        bi(
          '(E) Хөдөлгүүрийн өндөр температурт агаарын азот хүчилтөрөгчтэй урвална: N₂ + O₂ → 2NO; 2NO + O₂ → 2NO₂. Катализын хувиргагч (Pt/Rh): 2CO + 2NO → 2CO₂ + N₂. Hinge 1: дутуу шаталтын бохирдуулагч; hinge 2: хоёулаа хүлэмжийн хий.',
          '(E) At the high temperature in an engine, nitrogen and oxygen from the air react: N₂ + O₂ → 2NO; 2NO + O₂ → 2NO₂. The catalytic converter (Pt/Rh): 2CO + 2NO → 2CO₂ + N₂. Hinge 1: the pollutant from incomplete combustion; hinge 2: the pair that are both greenhouse gases.'
        ),
        bi('Хосоороо нэг нь тэгшитгэлийг тэнцүүлж, нөгөө нь атомыг тоолно; ABCD хуруу ба картаар санал өгнө.', 'In pairs one balances the equation and the other counts atoms; vote with ABCD fingers and cards.'),
        bi('Азот түлшнээс биш агаараас; hinge 1: B (CO); hinge 2: B (CO₂ ба CH₄).', 'The nitrogen comes from the air, not the fuel; hinge 1: B (CO); hinge 2: B (CO₂ and CH₄).')
      ]
    ]),
    [
      exitItem(
        bi('Цэвэр, хуурай агаарын ≈21%-ийг ямар хий эзэлдэг вэ?', 'Which gas makes up about 21% of clean, dry air?'),
        [bi('Азот', 'Nitrogen'), bi('Хүчилтөрөгч', 'Oxygen'), bi('Аргон', 'Argon'), bi('Нүүрстөрөгчийн давхар исэл', 'Carbon dioxide')],
        1,
        bi('Азот ≈78%, хүчилтөрөгч ≈21%.', 'Nitrogen is about 78% and oxygen about 21%.')
      ),
      exitItem(
        bi('Түлш дутуу шатахад голчлон ямар бохирдуулагч үүсэх вэ?', 'Which pollutant is produced mainly by the incomplete combustion of fuels?'),
        [bi('Хүхрийн давхар исэл', 'Sulfur dioxide'), bi('Нүүрстөрөгчийн дутуу исэл', 'Carbon monoxide'), bi('Азотын исэл', 'Oxides of nitrogen'), bi('Метан', 'Methane')],
        1,
        bi('Бүрэн шатахад хүчилтөрөгч хүрэлцэхгүй үед CO үүснэ.', 'CO forms when there is not enough oxygen for complete combustion.')
      ),
      exitItem(
        bi('Аль хос хий хоёулаа хүлэмжийн хий вэ?', 'Which pair of gases are both greenhouse gases?'),
        [
          bi('Хүчилтөрөгч ба азот', 'Oxygen and nitrogen'),
          bi('Нүүрстөрөгчийн давхар исэл ба метан', 'Carbon dioxide and methane'),
          bi('Хүхрийн давхар исэл ба аргон', 'Sulfur dioxide and argon'),
          bi('Нүүрстөрөгчийн дутуу исэл ба азот', 'Carbon monoxide and nitrogen')
        ],
        1,
        bi('CO₂ ба CH₄ дулааны энергийг шингээж дэлхийн дулаарлыг нэмнэ.', 'CO₂ and CH₄ absorb thermal energy and increase global warming.')
      ),
      exitItem(
        bi('Хүчиллэг бороо үүсгэдэг хоёр хий аль нь вэ?', 'Which two gases cause acid rain?'),
        [
          bi('Хүхрийн давхар исэл ба азотын исэл', 'Sulfur dioxide and oxides of nitrogen'),
          bi('Нүүрстөрөгчийн давхар исэл ба метан', 'Carbon dioxide and methane'),
          bi('Нүүрстөрөгчийн дутуу исэл ба хүчилтөрөгч', 'Carbon monoxide and oxygen'),
          bi('Азот ба аргон', 'Nitrogen and argon')
        ],
        0,
        bi('SO₂ ба NOₓ борооны усанд уусч хүчил үүсгэнэ.', 'SO₂ and NOₓ dissolve in rainwater to form acids.')
      ),
      exitItem(
        bi('(E) Катализын хувиргагчид CO ба NO-г зайлуулах тэгшитгэл аль нь вэ?', '(E) What is the equation for the removal of CO and NO in a catalytic converter?'),
        [
          bi('2CO + 2NO → 2CO₂ + N₂', '2CO + 2NO → 2CO₂ + N₂'),
          bi('CO + NO → CO₂ + N', 'CO + NO → CO₂ + N'),
          bi('N₂ + O₂ → 2NO', 'N₂ + O₂ → 2NO'),
          bi('2CO + O₂ → 2CO₂', '2CO + O₂ → 2CO₂')
        ],
        0,
        bi('Хортой хий хор багатай CO₂ ба N₂ болно; хувиргагч шүүдэггүй, урвалыг хурдасгадаг.', 'Toxic gases become less harmful CO₂ and N₂; the converter catalyses reactions, it does not filter.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Ус: тест, цэвэр байдал, цэвэршүүлэлт ба шалгалт', 'Water: tests, purity, treatment and exam practice'),
    bi(
      'Усыг илрүүлэх химийн тест ба цэвэр эсэхийг шалгах аргыг тайлбарлах; байгалийн усанд ашигтай ба хортой бодис байдгийг хэлэх; ундны усыг цэвэршүүлэх шатуудыг тайлбарлах; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх.',
      'Describe the chemical tests for water and how to test its purity; state that natural water contains beneficial and harmful substances; describe the treatment of the domestic water supply; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('Тест: усгүй CuSO₄ цагаан → цэнхэр; усгүй CoCl₂ цэнхэр → ягаан. Цэвэр ус 0 °C-д хайлж, 100 °C-д буцална; туршилтад нэрмэл ус хэрэглэнэ.', 'Tests: anhydrous CuSO₄ white → blue; anhydrous CoCl₂ blue → pink. Pure water melts at 0 °C and boils at 100 °C; distilled water is used in practical work.'),
      bi('Ашигтай: ууссан хүчилтөрөгч, зарим эрдэс; хортой: зарим металлын нэгдэл, хуванцар, бохир ус, хортой бичил биетэн, бордооны нитрат ба фосфат (усны хүчилтөрөгчийг бууруулна).', 'Beneficial: dissolved oxygen, some minerals; harmful: some metal compounds, plastics, sewage, harmful microbes, nitrates and phosphates from fertilisers (deoxygenation).'),
      bi('Цэвэршүүлэлт: тунгаах → шүүх (элс, хайрга) → нүүрстөрөгч (амт, үнэр) → хлоржуулах (бичил биетнийг устгана).', 'Treatment: sedimentation → filtration (sand and gravel) → carbon (tastes and odours) → chlorination (kills microbes).')
    ],
    lessonSteps([
      [
        bi('Ус: тест, цэвэр байдал, агуулга', 'Water: tests, purity and contents'),
        bi('Усыг илрүүлэх хоёр тест; цэвэр ус 0 °C ба 100 °C; нэрмэл ус. Байгалийн усны ашигтай ба хортой бодисууд; бордооны урсац → замаг → хүчилтөрөгч буурах (Зураг 17.9).', 'The two tests for water; pure water at 0 °C and 100 °C; distilled water. Beneficial and harmful substances in natural water; fertiliser run-off → algae → deoxygenation (Figure 17.9).'),
        bi('Хүчилтөрөгч, бичил биетэн, хуванцар, нитратыг самбартаа B (ашигтай) эсвэл H (хортой) гэж ангилна.', 'Sort oxygen, microbes, plastics and nitrates as B (beneficial) or H (harmful) on boards.'),
        bi('Хүчилтөрөгч – B; бичил биетэн, хуванцар, нитрат – H (нитрат хүчилтөрөгчийг бууруулна).', 'Oxygen – B; microbes, plastics, nitrates – H (nitrates cause deoxygenation).')
      ],
      [
        bi('Ундны усыг цэвэршүүлэх; хамтдаа', 'Treating the water supply; we do'),
        bi('Зураг 17.10: тунгаах, шүүх, нүүрстөрөгч, хлоржуулах – шат бүрийн зорилго. Хамтдаа: хлор яагаад, аль шат уусдаггүй хэсгийг зайлуулах, усны цэвэр байдлыг яаж харуулах, яагаад нэрмэл ус.', 'Figure 17.10: sedimentation, filtration, carbon, chlorination – the purpose of each stage. Together: why chlorine, which stage removes insoluble particles, how to show water is pure, why distilled water is used.'),
        bi('Дөрвөн шатын картыг хостойгоо дараалуулна; асуулт бүрт өөр сурагч хариулна.', 'Put the four stage cards in order with a partner; a different student answers each question.'),
        bi('Бичил биетнийг устгах; шүүх (ба тунгаах); яг 100 °C-д буцлах; хольц бага.', 'To kill microbes; filtration (and sedimentation); it boils at exactly 100 °C; fewer impurities.')
      ],
      [
        bi('Бие даан: байгаль орчин; hinge 3', 'You do: the environment; hinge 3'),
        bi('Метаны нэг эх үүсвэр, CaO хүчиллэг борооны эсрэг, бордоо загасыг хэрхэн хохироох, (E) хөдөлгүүрт NOₓ үүсэх. Hinge 3: аль шат бичил биетнийг устгах вэ.', 'One source of methane, CaO against acid rain, how fertilisers in rivers harm fish, (E) how NOₓ form in an engine. Hinge 3: which stage of water treatment kills microbes.'),
        bi('3 минут чимээгүй бичээд өөр өнгөөр засна; ABCD хуруугаар санал өгнө.', 'Write in silence for 3 minutes, then mark in a different colour; vote with ABCD fingers.'),
        bi('Ургамал задрах/малын хоол боловсруулалт; SO₂-ийг зайлуулна; хүчилтөрөгч буурна; агаарын N₂ ба O₂ өндөр температурт; hinge: D (хлоржуулах).', 'Decaying vegetation / digestion in animals; it removes SO₂; deoxygenation; N₂ and O₂ from the air react at high temperature; hinge: D (chlorination).')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi(
          '(a)–(d): агаар дахь азотын хувь, SO₂-ийн эх үүсвэр ба нөлөө, (E) катализын хувиргагчийн тэгшитгэл, (E) CO₂ дэлхийн дулаарлыг хэрхэн нэмэх. 4 шалгалтын зөвлөмж. Үнэлэх: Улаанбаатарын утаа – цахилгаан халаагуур ба сайжруулсан шахмал түлш. Алдаа засах: "хувиргагч бохирдуулагчийг шүүнэ".',
          '(a)–(d): the percentage of nitrogen in air, the source and effect of SO₂, (E) the catalytic converter equation, (E) how CO₂ increases global warming. The 4 exam tips. Evaluate: Ulaanbaatar smog – electric heaters vs improved coal briquettes. Error clinic: "the converter filters out the pollutants".'
        ),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes, swap and tick each marking point; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('78%; хүхэртэй чулуужсан түлш, хүчиллэг бороо; 2CO + 2NO → 2CO₂ + N₂; дулааны энергийг шингээж бүх чиглэлд ялгаруулна.', '78%; fossil fuels containing sulfur, acid rain; 2CO + 2NO → 2CO₂ + N₂; it absorbs thermal energy and re-emits it in all directions.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: 21% хий, хүчиллэг борооны 2 хий, уур амьсгалын өөрчлөлтийг бууруулах нэг арга, нүүрстөрөгчийн шатны зорилго. Зорилгод дахин fist to five.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: the 21% gas, the 2 acid-rain gases, one way to reduce climate change, the purpose of the carbon stage. Fist to five on the objectives again.'),
        bi('Гарах билетийг 4 минутад ганцаараа чимээгүй бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone and in silence in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('O₂; SO₂ ба NOₓ; мод тарих / сэргээгдэх эрчим хүч; амт, үнэр арилгах.', 'O₂; SO₂ and NOₓ; plant trees / renewable energy; to remove tastes and odours.')
      ]
    ]),
    [
      exitItem(
        bi('Ус цэвэршүүлэхэд аль шат бичил биетнийг устгах вэ?', 'Which stage of water treatment kills microbes?'),
        [bi('Тунгаах', 'Sedimentation'), bi('Шүүх', 'Filtration'), bi('Нүүрстөрөгч', 'Carbon'), bi('Хлоржуулах', 'Chlorination')],
        3,
        bi('Хлор хортой бичил биетнийг устгана; шүүх нь уусдаггүй хэсгийг зайлуулна.', 'Chlorine kills harmful microbes; filtration removes insoluble particles.')
      ),
      exitItem(
        bi('Усны дээж цэвэр гэдгийг яаж харуулах вэ?', 'How could you show that a sample of water is pure?'),
        [
          bi('Усгүй CuSO₄-ийг цэнхэр болгоно', 'It turns anhydrous CuSO₄ blue'),
          bi('Яг 100 °C-д буцалж, 0 °C-д хөлдөнө', 'It boils at exactly 100 °C (and freezes at 0 °C)'),
          bi('Өнгөгүй', 'It is colourless'),
          bi('Үнэргүй', 'It has no smell')
        ],
        1,
        bi('CuSO₄ тест ус БАЙГААГ харуулна, цэвэр эсэхийг биш.', 'The CuSO₄ test shows water is present, not that it is pure.')
      ),
      exitItem(
        bi('Цэвэршүүлэлтийн нүүрстөрөгчийн (идэвхжүүлсэн нүүрс) шатны зорилго юу вэ?', 'What is the purpose of the carbon (activated charcoal) stage in water treatment?'),
        [bi('Бичил биетнийг устгах', 'To kill microbes'), bi('Амт ба үнэрийг арилгах', 'To remove tastes and odours'), bi('Том хэсгийг тунгаах', 'To settle large particles'), bi('Давсыг зайлуулах', 'To remove salt')],
        1,
        bi('Тунгаах → шүүх → нүүрстөрөгч (амт, үнэр) → хлор (бичил биетэн).', 'Sedimentation → filtration → carbon (tastes and odours) → chlorine (microbes).')
      ),
      exitItem(
        bi('Голын усан дахь бордоо загасыг хэрхэн хохироох вэ?', 'How do fertilisers in rivers harm fish?'),
        [
          bi('Нитрат ба фосфат усны хүчилтөрөгчийг бууруулна', 'Nitrates and phosphates cause deoxygenation of the water'),
          bi('Усыг хүчиллэг болгоно', 'They make the water acidic'),
          bi('Усыг халаана', 'They heat the water'),
          bi('Загасыг шууд хордуулна', 'They poison the fish directly')
        ],
        0,
        bi('Замаг ихсэж, нас барж задрахад хүчилтөрөгч буурна.', 'Algae grow, die and decompose, using up the oxygen.')
      ),
      exitItem(
        bi('(E) CO₂ дэлхийн дулаарлыг хэрхэн нэмэгдүүлдэг вэ?', '(E) How does carbon dioxide cause increased global warming?'),
        [
          bi('Озоны давхаргыг цоолно', 'It makes a hole in the ozone layer'),
          bi('Дэлхийгээс ялгарсан дулааны энергийг шингээж бүх чиглэлд дахин ялгаруулна – сансарт бага гарна', 'It absorbs thermal energy re-emitted from the Earth and re-emits it in all directions, so less escapes to space'),
          bi('Нарны гэрлийг тусгана', 'It reflects sunlight'),
          bi('Хүчиллэг бороо үүсгэнэ', 'It causes acid rain')
        ],
        1,
        bi('Озоны давхаргын тухай бичвэл оноо авахгүй.', 'Writing about the ozone layer scores nothing.')
      )
    ],
    ID
  )
];

export const IG10_GLOSSARY: Record<string, GlossaryTerm[]> = {
  'ig10-1': [
    term(bi('цэвэр, хуурай агаар', 'clean dry air'), bi('≈78% азот, ≈21% хүчилтөрөгч, бага хэмжээний инертийн хий ба CO₂-ийн хольц.', 'A mixture of about 78% nitrogen and 21% oxygen, with small amounts of noble gases and carbon dioxide.')),
    term(bi('бохирдуулагч', 'pollutant'), bi('Амьд биет эсвэл байгаль орчныг хохироох бодис.', 'A substance that harms living things or the environment.')),
    term(bi('хүчиллэг бороо', 'acid rain'), bi('Хүхрийн давхар исэл ба азотын ислээр хүчиллэг болсон бороо.', 'Rain made acidic by sulfur dioxide and oxides of nitrogen.')),
    term(bi('хүлэмжийн хий', 'greenhouse gas'), bi('Дулааны (хэт улаан) энергийг шингээдэг хий, жишээ нь CO₂, CH₄.', 'A gas that absorbs thermal (infrared) energy, e.g. carbon dioxide and methane.')),
    term(bi('катализын хувиргагч (E)', 'catalytic converter (E)'), bi('Машины яндан дахь CO ба NOₓ-ийг CO₂ ба N₂ болгодог төхөөрөмж.', 'A device in a car exhaust that changes CO and NOₓ into CO₂ and N₂.'))
  ],
  'ig10-2': [
    term(bi('ундны ус', 'potable water'), bi('Уухад аюулгүй ус.', 'Water that is safe to drink.'))
  ]
};

export const IG10_PRACTICE: Record<string, PracticeItem[]> = {
  'ig10-1': [
    easy(
      bi('Метаны нэг эх үүсвэр аль нь вэ?', 'Which is a source of methane?'),
      [bi('Машины хөдөлгүүр', 'Car engines'), bi('Малын хоол боловсруулалт', 'Digestion in animals'), bi('Хүхэртэй түлш шатах', 'Burning fuels with sulfur'), bi('Галт уул', 'Volcanoes')],
      1,
      bi('Ургамал задрах ба малын хоол боловсруулалтын хий.', 'Decomposition of vegetation and waste gases from digestion in animals.')
    ),
    easy(
      bi('Цахилгаан станцын яндангаас SO₂-ийг юугаар зайлуулдаг вэ?', 'What removes SO₂ from power-station chimneys?'),
      [bi('Кальцийн исэл (шохой)', 'Calcium oxide (lime)'), bi('Хлор', 'Chlorine'), bi('Платин', 'Platinum'), bi('Ус', 'Water')],
      0,
      bi('Яндангийн хийг хүхэргүйжүүлэх – CaO SO₂-тэй урвална.', 'Flue-gas desulfurisation – CaO reacts with SO₂.')
    ),
    hard(
      bi('(E) Машины хөдөлгүүрт азотын исэл хэрхэн үүсч, катализын хувиргагчаар хэрхэн зайлуулагдахыг тэгшитгэлээр тайлбарла.', '(E) Explain, with equations, how oxides of nitrogen form in a car engine and how a catalytic converter removes them.'),
      bi('Хөдөлгүүрийн өндөр температурт агаарын азот хүчилтөрөгчтэй урвална: N₂ + O₂ → 2NO; 2NO + O₂ → 2NO₂. Хувиргагчийн Pt/Rh катализатор: 2CO + 2NO → 2CO₂ + N₂.', 'The high temperature in the engine makes nitrogen and oxygen from the air react: N₂ + O₂ → 2NO; 2NO + O₂ → 2NO₂. The Pt/Rh catalyst in the converter: 2CO + 2NO → 2CO₂ + N₂.'),
      bi('"Азот түлшинд агуулагддаг" гэвэл буруу – агаараас ирнэ.', '"The nitrogen is in the fuel" is wrong – it comes from the air.')
    )
  ],
  'ig10-2': [
    easy(
      bi('Ундны усанд хлорыг юунд нэмдэг вэ?', 'Why is chlorine added to drinking water?'),
      [bi('Амт сайжруулах', 'To improve the taste'), bi('Хортой бичил биетнийг устгах', 'To kill harmful microbes'), bi('Уусдаггүй хэсгийг шүүх', 'To filter out insoluble particles'), bi('pH нэмэх', 'To raise the pH')],
      1,
      bi('Хлоржуулах нь сүүлийн шат – бичил биетнийг устгана.', 'Chlorination is the last stage – it kills microbes.')
    ),
    easy(
      bi('Туршилтад цоргоны усны оронд яагаад нэрмэл ус хэрэглэдэг вэ?', 'Why is distilled water used in experiments rather than tap water?'),
      [bi('Хямд', 'It is cheaper'), bi('Хольц бага тул үр дүнд нөлөөлөхгүй', 'It has fewer impurities, which could interfere with results'), bi('Хүйтэн', 'It is colder'), bi('Хлортой', 'It contains chlorine')],
      1,
      bi('Цоргоны усанд ууссан бодис байдаг.', 'Tap water contains dissolved substances.')
    ),
    hard(
      bi('Ундны усыг цэвэршүүлэх дөрвөн шатыг дарааллаар нь нэрлэж, шат бүрийн зорилгыг бич.', 'Name the four stages of treating the domestic water supply in order and give the purpose of each.'),
      bi('Тунгаах – том уусдаггүй хэсэг тунана; шүүх – элс, хайргаар жижиг уусдаггүй хэсгийг зайлуулна; нүүрстөрөгч – амт, үнэр арилгана; хлоржуулах – хортой бичил биетнийг устгана.', 'Sedimentation – large insoluble particles settle out; filtration – sand and gravel remove small insoluble particles; carbon – removes tastes and odours; chlorination – kills harmful microbes.'),
      bi('Шүүлтүүр бичил биетнийг устгадаггүй, ууссан бодисыг зайлуулдаггүй.', 'Filtration does not kill microbes or remove dissolved substances.')
    )
  ]
};
