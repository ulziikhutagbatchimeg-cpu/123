// IGCSE 0620 chapter 6 (chemical reactions), lessons 3–4: reversible reactions and equilibrium. They follow the deck
// Ch09_Reversible_reactions_and_equilibrium.pptx, planned as 40 + 40 minutes. Its notes give no slide split, so the
// lessons part where the topic does: reversible reactions and equilibrium (slides 1–10), then the Haber and Contact
// processes and fertilisers (11–21), with the review slides 22–29. Every question, answer and definition comes from the deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig6';

export const IG6_LESSONS_B: StatesLesson[] = [
  lesson(
    3,
    bi('Буцах урвал ба тэнцвэр', 'Reversible reactions and equilibrium'),
    bi(
      'Зарим урвал буцах (⇌) гэдгийг хэлэх; талст устай давсыг халаах, усгүй CuSO₄ ба CoCl₂-д ус нэмэхийг тайлбарлах; (E) битүү системийн динамик тэнцвэрийн нөхцөл; (E) температур, даралт, концентраци, катализаторын тэнцвэрт үзүүлэх нөлөөг таамаглах.',
      'State that some reactions are reversible (⇌); describe heating hydrated salts and adding water to anhydrous CuSO₄ and CoCl₂; (E) the conditions for dynamic equilibrium in a closed system; (E) predict how temperature, pressure, concentration and a catalyst affect equilibrium.'
    ),
    [
      bi('CuSO₄·5H₂O(s) ⇌ CuSO₄(s) + 5H₂O(l): цэнхэр ⇌ цагаан; CoCl₂·6H₂O ⇌ CoCl₂ + 6H₂O: ягаан ⇌ цэнхэр. Усыг илрүүлэх: усгүй CuSO₄ цагаан → цэнхэр, CoCl₂ цэнхэр → ягаан.', 'CuSO₄·5H₂O(s) ⇌ CuSO₄(s) + 5H₂O(l): blue ⇌ white; CoCl₂·6H₂O ⇌ CoCl₂ + 6H₂O: pink ⇌ blue. Tests for water: anhydrous CuSO₄ white → blue, CoCl₂ blue → pink.'),
      bi('Эдгээр тест ус БАЙГААГ харуулна; цэвэр усыг 100 °C-д буцлах, 0 °C-д хайлахаар батална.', 'These tests show water is PRESENT; pure water is shown by boiling at 100 °C and melting at 0 °C.'),
      bi('(E) Динамик тэнцвэр: шууд ба урвуу урвалын хурд тэнцүү, концентраци өөрчлөгдөхгүй (тэнцүү биш). Температур ↑ → эндотерм чиглэлд; даралт ↑ → хийн молекул цөөн тал руу; катализатор байрлалыг өөрчлөхгүй.', '(E) Dynamic equilibrium: forward rate = reverse rate and the concentrations no longer change (they are not equal). Temperature ↑ → the endothermic direction; pressure ↑ → the side with fewer gas molecules; a catalyst does not change the position.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi(
          'Том асуулт: биеийн азотын тал нь үйлдвэрээс ирсэн – "буцах гэсэн" урвалаас дэлхийг тэжээх аммиак яаж гаргах вэ? "Санал нийлэх үү?" (тэнцвэрт урвал зогсоно; катализатор тэнцвэрийн байрлалыг өөрчилнө; усгүй CoCl₂ ус авахад ягаан болно) ба төлөвлөгөө.',
          'Big question: half the nitrogen in your body came from a factory – how do chemists make a reaction that "wants" to go backwards give enough ammonia to feed the world? "Agree or disagree?" (at equilibrium the reaction stops; a catalyst changes the position of equilibrium; blue anhydrous CoCl₂ turns pink with water) and the plan.'
        ),
        bi('⇌ тэмдэг юу хэлдгийг хосоороо 60 секунд ярилцаж, эрхий хуруугаар санал өгнө.', 'Think–pair–share for 60 s on what ⇌ tells you; vote with thumbs.'),
        bi('⇌ = урвал хоёр чиглэлд явна.', '⇌ = the reaction goes in both directions.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi(
          'Динамик тэнцвэрийн хоёр нөхцөлийг онцолж (хурд тэнцүү, концентраци өөрчлөгдөхгүй), зорилгод fist to five. Давталт: дулааны задрал экзо/эндо уу, хийн урвалыг хурдасгах 2 арга, катализатор, аммиак ба хүхрийн хүчлийн томьёо.',
          'Stress the two conditions for dynamic equilibrium (equal rates, concentrations no longer change); fist to five on the objectives. Retrieval: is thermal decomposition exo or endo, two ways to speed up a gas reaction, a catalyst, the formulae of ammonia and sulfuric acid.'
        ),
        bi('Самбартаа бичээд 3-2-1-д өргөнө.', 'Write on show-me boards and reveal on 3-2-1.'),
        bi('Эндотерм; температур/даралт/катализатор; NH₃ (NH₄ биш) ба H₂SO₄.', 'Endothermic; temperature/pressure/catalyst; NH₃ (not NH₄) and H₂SO₄.')
      ],
      [
        bi('Буцах урвал ба усны тест', 'Reversible reactions and tests for water'),
        bi(
          'Талст устай CuSO₄-ийг халаана (Зураг 9.2): цэнхэр → цагаан (эндотерм); ус нэмэхэд цэнхэр болж халуун болно (экзотерм). CoCl₂: ягаан ⇌ цэнхэр. Усыг илрүүлэх хоёр тест. Hinge 1: өнгөгүй шингэн усгүй CuSO₄-ийг цэнхэр болгов.',
          'Heat hydrated CuSO₄ (Figure 9.2): blue → white (endothermic); adding water turns it blue and gives out heat (exothermic). CoCl₂: pink ⇌ blue. The two tests for water. Hinge 1: a colourless liquid turns anhydrous CuSO₄ blue.'
        ),
        bi('Цагаан нунтагт ус нэмэхэд ямар өнгө болохыг таамаглаж, өнгөний өөрчлөлтийг самбартаа бичнэ; ABCD хуруугаар санал өгнө.', 'Predict the colour when water is added to the white powder; write each colour change on boards; vote with ABCD fingers.'),
        bi('Hinge: B – шингэнд ус БАЙНА (цэвэр гэдгийг харуулахгүй).', 'Hinge: B – the liquid contains water (it does not show it is pure).')
      ],
      [
        bi('(E) Динамик тэнцвэр', '(E) Dynamic equilibrium'),
        bi(
          'N₂(g) + 3H₂(g) ⇌ 2NH₃(g): битүү системд тэнцвэрт хүрнэ; шууд хурд = урвуу хурд; концентраци өөрчлөгдөхгүй; хоёр урвал үргэлжилсээр (динамик). Судлах: H₂ + Br₂ ⇌ 2HBr тэнцвэрийн загвар.',
          'N₂(g) + 3H₂(g) ⇌ 2NH₃(g): in a closed system it reaches equilibrium; forward rate = reverse rate; concentrations no longer change; both reactions continue (dynamic). Explore: the H₂ + Br₂ ⇌ 2HBr equilibrium model.'
        ),
        bi('Хоёр баг шугамын дундуур ижил хурдаар бөмбөг дамжуулна; тэнцвэрт урвал зогсох уу гэдгийг таамаглана.', 'Two teams pass balls across a line at the same rate; predict whether the reaction stops at equilibrium.'),
        bi('Урвал зогсохгүй; концентраци "тэнцүү" биш, "өөрчлөгдөхгүй".', 'The reaction does not stop; the concentrations are not "equal" but "no longer change".')
      ],
      [
        bi('(E) Нөхцөлийг өөрчлөх ба таамаглах', '(E) Changing conditions and predicting shifts'),
        bi(
          'Нөхцөл өөрчлөлтийн хүснэгт (температур, даралт, концентраци, бүтээгдэхүүн зайлуулах, катализатор). Хамтдаа: 2NO₂ ⇌ N₂O₄ (ΔH = −58 kJ/mol, NO₂ хүрэн): даралт ба халаалт; H₂ + I₂ ⇌ 2HI-д даралт.',
          'The table of changing conditions (temperature, pressure, concentration, removing a product, catalyst). Together: 2NO₂ ⇌ N₂O₄ (ΔH = −58 kJ/mol, NO₂ brown): pressure and heating; pressure for H₂ + I₂ ⇌ 2HI.'
        ),
        bi('Мөр бүрийн шилжилтийг таамаглаж, хоёр талын хийн молекулыг хуруугаараа тоолно.', 'Predict the shift for each row; count the gas molecules on each side with fingers.'),
        bi('Цайвар (баруун тийш, 2 → 1); бараан хүрэн (зүүн тийш, эндотерм); HI-д нөлөөгүй (2 ба 2).', 'Paler (right, 2 → 1); darker brown (left, endothermic); no effect for HI (2 and 2).')
      ]
    ]),
    [
      exitItem(
        bi('Талст устай зэс(II)-ын сульфатыг халаахад ямар өнгөний өөрчлөлт гарах вэ?', 'What colour change happens when hydrated copper(II) sulfate is heated?'),
        [bi('Цагаан → цэнхэр', 'White → blue'), bi('Цэнхэр → цагаан', 'Blue → white'), bi('Ягаан → цэнхэр', 'Pink → blue'), bi('Цэнхэр → ягаан', 'Blue → pink')],
        1,
        bi('Ус ялгарч цэнхэр талстаас цагаан усгүй нунтаг үлдэнэ.', 'The water is driven off, leaving white anhydrous powder.')
      ),
      exitItem(
        bi('Өнгөгүй шингэний хэдэн дусал усгүй CuSO₄-ийг цэнхэр болгов. Энэ юуг харуулах вэ?', 'A few drops of a colourless liquid turn anhydrous copper(II) sulfate blue. What does this show?'),
        [bi('Шингэн цэвэр ус', 'The liquid is pure water'), bi('Шингэнд ус байна', 'The liquid contains water'), bi('Шингэн хүчил', 'The liquid is an acid'), bi('Урвал эндотерм', 'The reaction is endothermic')],
        1,
        bi('Тест зөвхөн ус байгааг харуулна; цэвэр эсэхийг буцлах цэгээр (100 °C).', 'The test only shows water is present; purity is shown by the boiling point (100 °C).')
      ),
      exitItem(
        bi('(E) Динамик тэнцвэрт байгаа системийн тухай аль нь зөв бэ?', '(E) Which is true of a system at dynamic equilibrium?'),
        [
          bi('Урвал зогссон', 'The reaction has stopped'),
          bi('Урвалж ба бүтээгдэхүүний концентраци тэнцүү', 'The concentrations of reactants and products are equal'),
          bi('Шууд ба урвуу урвалын хурд тэнцүү, концентраци өөрчлөгдөхгүй', 'Forward and reverse rates are equal and the concentrations no longer change'),
          bi('Зөвхөн шууд урвал явагдана', 'Only the forward reaction happens')
        ],
        2,
        bi('Хоёр урвал ижил хурдаар үргэлжилнэ – динамик.', 'Both reactions continue at the same rate – it is dynamic.')
      ),
      exitItem(
        bi('(E) 2NO₂(g) ⇌ N₂O₄(g), ΔH = −58 kJ/mol. NO₂ хүрэн. Хольцыг халаахад өнгө юу болох вэ?', '(E) 2NO₂(g) ⇌ N₂O₄(g), ΔH = −58 kJ/mol. NO₂ is brown. What happens to the colour when the mixture is heated?'),
        [bi('Цайвар болно', 'It gets paler'), bi('Бараан хүрэн болно', 'It gets darker brown'), bi('Өөрчлөгдөхгүй', 'No change'), bi('Өнгөгүй болно', 'It becomes colourless')],
        1,
        bi('Шууд урвал экзотерм тул халаахад эндотерм чиглэл буюу зүүн тийш (NO₂ олширно).', 'The forward reaction is exothermic, so heating shifts it left, the endothermic direction (more NO₂).')
      )
    ],
    ID
  ),
  lesson(
    4,
    bi('Хабер ба Контакт процесс, бордоо', 'The Haber and Contact processes, fertilisers'),
    bi(
      'NPK бордоо, аммонийн давс ба нитратыг бордоо болгон хэрэглэхийг тайлбарлах; (E) Хабер ба Контакт процессын тэгшитгэл, түүхий эд, нөхцөлийг хэлэх; (E) нөхцөлийн сонголтыг хурд, гарц, аюулгүй байдал, зардлаар тайлбарлах.',
      'Describe NPK fertilisers and ammonium salts and nitrates as fertilisers; (E) state the equations, raw materials and conditions of the Haber and Contact processes; (E) explain the choice of conditions in terms of rate, yield, safety and cost.'
    ),
    [
      bi('(E) Хабер: N₂(g) + 3H₂(g) ⇌ 2NH₃(g); N₂ агаараас, H₂ метанаас; 450 °C, 20 000 kPa (200 atm), төмөр катализатор; NH₃-ийг хөргөж шингэрүүлнэ, үлдсэн хийг дахин ашиглана.', '(E) Haber: N₂(g) + 3H₂(g) ⇌ 2NH₃(g); N₂ from air, H₂ from methane; 450 °C, 20 000 kPa (200 atm), iron catalyst; ammonia is removed by cooling and unreacted gases are recycled.'),
      bi('(E) Контакт: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g); 450 °C, 200 kPa (2 atm), V₂O₅; гарц ~98% тул өндөр даралт хэрэггүй. 450 °C нь хурд ба гарцын тохироо.', '(E) Contact: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g); 450 °C, 200 kPa (2 atm), V₂O₅; the yield is already about 98%, so high pressure is not worth it. 450 °C is a compromise between rate and yield.'),
      bi('Бордоо: N (навч, уураг), P (үндэс), K (цэцэг, жимс). Аммиак + азотын хүчил → аммонийн нитрат.', 'Fertilisers: N (leaves, proteins), P (roots), K (flowers and fruit). Ammonia + nitric acid → ammonium nitrate.')
    ],
    lessonSteps([
      [
        bi('(E) Хабер процесс ба нөхцөл', '(E) The Haber process and its conditions'),
        bi(
          'Зураг 9.11-ийн схем: компрессор → Fe-тэй реактор → хөргөгч → шингэн NH₃ → дахин эргэлт. Яагаад эдгээр нөхцөл: бага температур гарц их боловч удаан; өндөр даралт гарц ба хурдыг нэмэх ч үнэтэй, аюултай; катализатор гарцыг өөрчлөхгүй (Зураг 9.9).',
          'The Figure 9.11 flow chart: compressor → converter with Fe → cooler → liquid NH₃ → recycling. Why these conditions: a low temperature gives a higher yield but is too slow; high pressure raises yield and rate but is expensive and dangerous; the catalyst does not change the yield (Figure 9.9).'
        ),
        bi('"450 – 200 – төмөр"-ийг хостойгоо гурав давтана; 20 000 kPa ба 450 °C дахь гарцыг графикаас уншина.', 'Chant "450 – 200 – iron" three times with a partner; read the yield at 20 000 kPa and 450 °C from the graph.'),
        bi('Гарц ≈ 30%; 450 °C – хурд ба гарцын тохироо.', 'Yield ≈ 30%; 450 °C is a compromise between rate and yield.')
      ],
      [
        bi('(E) Контакт процесс ба hinge', '(E) The Contact process and hinges'),
        bi(
          'Зураг 9.14: 2SO₂ + O₂ ⇌ 2SO₃; SO₂ хүхэр шатааж эсвэл сульфидын хүдэр шарж гаргана; 450 °C, 2 atm, V₂O₅. Hinge 2: Хаберын нөхцөл; hinge 3: 450 °C-аас дээш температур.',
          'Figure 9.14: 2SO₂ + O₂ ⇌ 2SO₃; SO₂ from burning sulfur or roasting sulfide ores; 450 °C, 2 atm, V₂O₅. Hinge 2: the Haber conditions; hinge 3: a temperature above 450 °C.'
        ),
        bi('Хабер ба Контактын нөхцөлийн нэг ижил, нэг ялгаатай талыг бичнэ; ABCD картаар санал өгнө.', 'List one similarity and one difference between the Haber and Contact conditions; vote with ABCD cards.'),
        bi('Hinge 2: B (450 °C, 20 000 kPa, төмөр); hinge 3: C (хурд ↑, гарц ↓).', 'Hinge 2: B (450 °C, 20 000 kPa, iron); hinge 3: C (faster rate, lower yield).')
      ],
      [
        bi('Бордоо', 'Fertilisers'),
        bi('Бордооны уут (Зураг 9.16) дээрх NPK; N, P, K ямар хэрэгтэй; аммонийн нитрат, аммонийн сульфат, калийн нитрат; аммиак + хүчил = давс. Бие даан: 4 асуулт.', 'NPK on a fertiliser bag (Figure 9.16); what N, P and K are for; ammonium nitrate, ammonium sulfate, potassium nitrate; ammonia + acid = salt. You do: 4 questions.'),
        bi('Тариаланчид яагаад жил бүр бордоо хийдгийг ярилцаж, 3 минут чимээгүй бичээд өөр өнгөөр засна.', 'Discuss why farmers add fertilisers every year; write for 3 minutes in silence, then mark in a different colour.'),
        bi('N, P, K; хүхрийн хүчил ба аммиак; азот; NH₄NO₃ дахь N 35%.', 'N, P, K; sulfuric acid and ammonia; nitrogen; 35% N in NH₄NO₃.')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi(
          '(a)–(d): CoCl₂-д ус, (E) динамик тэнцвэрийн 2 шинж, Контактын нөхцөл, Хаберт 200 atm-аас дээш даралт хэрэглэдэггүй шалтгаан. 4 шалгалтын зөвлөмж. Үнэлэх: Хабер 450 °C хэрэглэдэг. Алдаа засах: даралт ↑ үед NH₃-ийн гарц.',
          '(a)–(d): water on CoCl₂, (E) two features of dynamic equilibrium, the Contact conditions, why a pressure above 200 atm is not used in the Haber process. The 4 exam tips. Evaluate: the Haber process uses 450 °C. Error clinic: the yield of NH₃ when the pressure increases.'
        ),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes, swap and tick each marking point; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('Цэнхэр → ягаан; хурд тэнцүү, концентраци тогтмол; 450 °C, 2 atm, V₂O₅; үнэтэй ба аюултай; гарц өснө (4 → 2).', 'Blue → pink; equal rates, constant concentrations; 450 °C, 2 atm, V₂O₅; expensive and dangerous; the yield increases (4 → 2).')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: CuSO₄-ийг халаах, NPK, (E) Хаберын тэгшитгэл, (E) катализатор гарцыг яагаад өөрчлөхгүй вэ. Зорилгод дахин fist to five.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: heating CuSO₄, NPK, (E) the Haber equation, (E) why a catalyst does not change the yield. Fist to five on the objectives again.'),
        bi('Гарах билетийг 4 минутад ганцаараа чимээгүй бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone and in silence in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('Цэнхэр → цагаан; N, P, K; N₂(g) + 3H₂(g) ⇌ 2NH₃(g); хоёр урвалыг ижил хурдасгана.', 'Blue → white; N, P, K; N₂(g) + 3H₂(g) ⇌ 2NH₃(g); it speeds up both reactions equally.')
      ]
    ]),
    [
      exitItem(
        bi('(E) Хабер процесст аль нөхцөлийг хэрэглэдэг вэ?', '(E) Which set of conditions is used in the Haber process?'),
        [
          bi('450 °C, 200 kPa, V₂O₅', '450 °C, 200 kPa, V₂O₅'),
          bi('450 °C, 20 000 kPa, төмөр', '450 °C, 20 000 kPa, iron'),
          bi('250 °C, 20 000 kPa, төмөр', '250 °C, 20 000 kPa, iron'),
          bi('450 °C, 200 kPa, төмөр', '450 °C, 200 kPa, iron')
        ],
        1,
        bi('450 °C, 20 000 kPa (200 atm), төмөр катализатор. А нь Контакт процесс.', '450 °C, 20 000 kPa (200 atm) and an iron catalyst. A is the Contact process.')
      ),
      exitItem(
        bi('(E) Хабер процесст температурыг 450 °C-аас дээш өсгөвөл юу болох вэ?', '(E) In the Haber process, what is the effect of increasing the temperature above 450 °C?'),
        [
          bi('Хурд ↑, гарц ↑', 'Faster rate and higher yield'),
          bi('Хурд ↓, гарц ↑', 'Slower rate and higher yield'),
          bi('Хурд ↑, гарц ↓', 'Faster rate and lower yield'),
          bi('Гарц өөрчлөгдөхгүй', 'No change in yield')
        ],
        2,
        bi('Хурд өснө, гэвч тэнцвэр эндотерм чиглэл буюу зүүн тийш шилжиж аммиак цөөрнө.', 'The rate increases, but equilibrium shifts left (the endothermic direction), so there is less ammonia.')
      ),
      exitItem(
        bi('NPK бордооны гурван элемент аль нь вэ?', 'Which three elements are in an NPK fertiliser?'),
        [
          bi('Азот, фосфор, кали', 'Nitrogen, phosphorus, potassium'),
          bi('Азот, кали, натри', 'Nitrogen, potassium, sodium'),
          bi('Неон, фосфор, кали', 'Neon, phosphorus, potassium'),
          bi('Азот, фосфор, нүүрстөрөгч', 'Nitrogen, phosphorus, carbon')
        ],
        0,
        bi('P – фосфор, K – кали (андуурч болохгүй).', 'P is phosphorus and K is potassium (do not mix them up).')
      ),
      exitItem(
        bi('(E) Катализатор гарцыг яагаад өөрчлөхгүй вэ?', '(E) Why does a catalyst not change the yield?'),
        [
          bi('Шууд ба урвуу урвалыг ижил хурдасгадаг', 'It speeds up the forward and reverse reactions equally'),
          bi('Урвалд зарцуулагддаг', 'It is used up in the reaction'),
          bi('Зөвхөн урвуу урвалыг хурдасгадаг', 'It speeds up only the reverse reaction'),
          bi('Температурыг бууруулдаг', 'It lowers the temperature')
        ],
        0,
        bi('Тэнцвэрт хурдан хүрнэ, гэхдээ байрлал нь өөрчлөгдөхгүй.', 'Equilibrium is reached faster, but its position does not change.')
      ),
      exitItem(
        bi('(E) Контакт процесст яагаад зөвхөн 2 atm даралт хэрэглэдэг вэ?', '(E) Why is only 2 atm used in the Contact process?'),
        [
          bi('Гарц аль хэдийн өндөр (~98%) тул өндөр даралт зардлаа нөхөхгүй', 'The yield is already high (about 98%), so higher pressure is not worth the cost'),
          bi('Өндөр даралт гарцыг бууруулдаг', 'Higher pressure lowers the yield'),
          bi('V₂O₅ өндөр даралтад ажилладаггүй', 'V₂O₅ does not work at high pressure'),
          bi('Урвал эндотерм', 'The reaction is endothermic')
        ],
        0,
        bi('2SO₂ + O₂ ⇌ 2SO₃ – гарц 2 atm-д ч өндөр.', '2SO₂ + O₂ ⇌ 2SO₃ – the yield is already high at 2 atm.')
      )
    ],
    ID
  )
];

export const IG6_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'ig6-3': [
    term(bi('буцах урвал', 'reversible reaction'), bi('Шууд болон урвуу чиглэлд явж чадах урвал, ⇌-ээр тэмдэглэнэ.', 'A reaction that can go forwards and backwards, shown by ⇌.')),
    term(bi('талст устай / усгүй', 'hydrated / anhydrous'), bi('Талст ус агуулсан / усгүй.', 'Containing water of crystallisation / without water.')),
    term(bi('динамик тэнцвэр (E)', 'dynamic equilibrium (E)'), bi('Шууд ба урвуу урвалын хурд тэнцүү; концентраци өөрчлөгдөхгүй (битүү систем).', 'Forward and reverse rates are equal; concentrations no longer change (closed system).')),
    term(bi('битүү систем (E)', 'closed system (E)'), bi('Урвалын саванд юу ч орохгүй, гарахгүй.', 'Nothing can enter or leave the reaction vessel.')),
    term(bi('тэнцвэрийн байрлал (E)', 'position of equilibrium (E)'), bi('Тэнцвэрт байх үеийн урвалж ба бүтээгдэхүүний харьцангуй хэмжээ.', 'The relative amounts of reactants and products at equilibrium.'))
  ],
  'ig6-4': [
    term(bi('бордоо', 'fertiliser'), bi('Ургамлын хэрэглэсэн элементийг (N, P, K) нөхөхөөр хөрсөнд нэмдэг бодис.', 'A substance added to soil to replace the elements (N, P, K) used by plants.'))
  ]
};

export const IG6_PRACTICE_B: Record<string, PracticeItem[]> = {
  'ig6-3': [
    easy(
      bi('Усгүй кобальт(II)-ын хлоридод ус нэмэхэд юу ажиглагдах вэ?', 'What is seen when water is added to anhydrous cobalt(II) chloride?'),
      [bi('Цагаан → цэнхэр', 'White → blue'), bi('Цэнхэр → ягаан', 'Blue → pink'), bi('Ягаан → цэнхэр', 'Pink → blue'), bi('Өөрчлөгдөхгүй', 'No change')],
      1,
      bi('Усгүй CoCl₂ цэнхэр, талст устай нь ягаан.', 'Anhydrous CoCl₂ is blue and the hydrated form is pink.')
    ),
    easy(
      bi('(E) H₂(g) + I₂(g) ⇌ 2HI(g). Даралт ↑ үед тэнцвэрийн байрлалд юу болох вэ?', '(E) H₂(g) + I₂(g) ⇌ 2HI(g). What is the effect of increasing pressure on the position of equilibrium?'),
      [bi('Баруун тийш', 'It shifts right'), bi('Зүүн тийш', 'It shifts left'), bi('Нөлөөгүй', 'No effect'), bi('Урвал зогсоно', 'The reaction stops')],
      2,
      bi('Хоёр талд 2 хийн молекул.', 'There are 2 gas molecules on each side.')
    ),
    hard(
      bi('(E) Битүү системийн динамик тэнцвэрийн хоёр шинжийг бич. [2]', '(E) State two features of a system at dynamic equilibrium. [2]'),
      bi('Шууд урвалын хурд = урвуу урвалын хурд [1]; концентраци өөрчлөгдөхгүй [1].', 'Rate of the forward reaction = rate of the reverse reaction [1]; concentrations do not change [1].'),
      bi('"Урвал зогссон" гэвэл оноо авахгүй.', '"The reaction has stopped" scores nothing.')
    )
  ],
  'ig6-4': [
    easy(
      bi('Аммонийн сульфатыг ямар хүчил, шүлтээр гаргах вэ?', 'Which acid and alkali are used to make ammonium sulfate?'),
      [
        bi('Хүхрийн хүчил ба аммиак', 'Sulfuric acid and ammonia'),
        bi('Азотын хүчил ба аммиак', 'Nitric acid and ammonia'),
        bi('Хүхрийн хүчил ба натрийн гидроксид', 'Sulfuric acid and sodium hydroxide'),
        bi('Давсны хүчил ба аммиак', 'Hydrochloric acid and ammonia')
      ],
      0,
      bi('Аммиак + хүчил → аммонийн давс; сульфат хүхрийн хүчлээс.', 'Ammonia + acid → an ammonium salt; sulfate comes from sulfuric acid.')
    ),
    easy(
      bi('Бордооны аль элемент гол төлөв навчны өсөлтөд хэрэгтэй вэ?', 'Which element in a fertiliser is mainly needed for leaf growth?'),
      [bi('Азот', 'Nitrogen'), bi('Фосфор', 'Phosphorus'), bi('Кали', 'Potassium'), bi('Хүхэр', 'Sulfur')],
      0,
      bi('N – навч, уураг; P – үндэс; K – цэцэг, жимс.', 'N – leaves and proteins; P – roots; K – flowers and fruit.')
    ),
    hard(
      bi('(E) Хабер процесст яагаад 450 °C хэрэглэдэг, 200 atm-аас дээш даралт хэрэглэдэггүйг тайлбарла.', '(E) Explain why the Haber process uses 450 °C and why a pressure higher than 200 atm is not used.'),
      bi('Бага температур гарц их (шууд урвал экзотерм) ч хэт удаан; 450 °C нь хурд ба гарцын тохироо, төмөр катализатор хурдыг нэмнэ. Маш өндөр даралт гарцыг нэмэх ч тоног төхөөрөмж, энергийн хувьд үнэтэй [1], дэлбэрэх эрсдэлтэй [1].', 'A low temperature gives a higher yield (the forward reaction is exothermic) but is too slow; 450 °C is a compromise between rate and yield, and the iron catalyst raises the rate. Very high pressure would raise the yield but is expensive in equipment and energy [1] and dangerous – a risk of explosion [1].'),
      bi('"Өндөр температур гарцыг нэмнэ" гэвэл буруу – экзотерм урвалд бууруулна.', '"A high temperature increases the yield" is wrong – for an exothermic reaction it lowers it.')
    )
  ]
};
