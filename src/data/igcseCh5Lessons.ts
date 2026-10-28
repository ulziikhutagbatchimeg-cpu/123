// IGCSE 0620 chapter 5 (chemical energetics), lessons 1–2. They follow the deck Ch07_Chemical_energetics.pptx and its
// plan of two 40-minute lessons (slides 1–13 and 14 on), with the review slides 22–29.
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig5';

export const IG5_LESSONS: StatesLesson[] = [
  lesson(
    1,
    bi('Экзотерм ба эндотерм урвал, урвалын замын диаграмм', 'Exothermic and endothermic reactions, pathway diagrams'),
    bi(
      'Физик ба химийн өөрчлөлтийг ялгах; экзотерм урвал орчны температурыг өсгөж, эндотерм бууруулдгийг хэлэх; урвалын замын диаграммыг унших; (E) ΔH ба Ea-г тодорхойлж, холбоо задрах ба үүсэхээр тайлбарлах.',
      'Tell physical and chemical changes apart; state that exothermic reactions raise, and endothermic reactions lower, the temperature of the surroundings; interpret reaction pathway diagrams; (E) define ΔH and Ea and explain them with bond breaking and making.'
    ),
    [
      bi('Химийн өөрчлөлтөд шинэ бодис үүснэ, ихэвчлэн буцаахад хэцүү, энерги өөрчлөгдөнө; физик өөрчлөлтөд шинэ бодис үүсэхгүй (хайлах, уусах).', 'A chemical change makes a new substance, is usually hard to reverse and has an energy change; a physical change makes no new substance (melting, dissolving).'),
      bi('Экзотерм: дулааныг орчинд өгнө – термометрийн заалт өснө (шаталт, саармагжилт). Эндотерм: орчноос дулаан авна – заалт буурна (дулааны задрал, фотосинтез, NH₄NO₃ уусах).', 'Exothermic: thermal energy is transferred to the surroundings – the thermometer reading rises (combustion, neutralisation). Endothermic: thermal energy is taken in – the reading falls (thermal decomposition, photosynthesis, dissolving NH₄NO₃).'),
      bi('Диаграммд бүтээгдэхүүн доор = экзотерм, дээр = эндотерм. (E) ΔH: экзотермд сөрөг, эндотермд эерэг; Ea нь урвалжаас оргил хүртэл. Холбоо задрах – эндотерм, үүсэх – экзотерм.', 'On a diagram, products below = exothermic, above = endothermic. (E) ΔH is negative for exothermic and positive for endothermic; Ea goes from the reactants up to the peak. Bond breaking is endothermic, bond making exothermic.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi(
          'Гар дулаацуулагч ба хүйтэн жинг үзүүлж том асуулт тавина: нэг нь халж нөгөө нь яагаад хөрдөг вэ, энерги хаанаас ирдэг вэ? "Санал нийлэх үү?" гурван өгүүлбэр (холбоо задрахад энерги ялгарна; экзотермд орчин дулаарна; эндотермд ΔH сөрөг) ба хичээлийн төлөвлөгөө.',
          'Show a hand-warmer and a cold pack and pose the big question: why does one get hot and the other cold, and where does the energy come from? Three "Agree or disagree?" statements (breaking bonds releases energy; in an exothermic reaction the surroundings get warmer; ΔH for an endothermic reaction is negative) and the lesson plan.'
        ),
        bi('Хосоороо 60 секунд ярилцаж, эрхий хуруугаар санал өгнө.', 'Think–pair–share for 60 s and vote with thumbs.'),
        bi('Урвалд энерги ялгарах эсвэл шингэх; "хүйтэн" нь орчноос дулаан авч байгаа хэрэг.', 'Energy is given out or taken in by a reaction; "cold" means heat is taken from the surroundings.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт, өөрчлөлтийн төрөл', 'Key terms, objectives, retrieval and types of change'),
        bi(
          'EXOthermic = heat EXits, ENdothermic = heat ENters. Зорилгод fist to five. Давталт: мөс хайлах, метан шатах, хуваалцсан хос, 2H₂ + O₂ → 2H₂O. Дараа нь физик ба химийн өөрчлөлтийн хүснэгт (Зураг 7.4: магни шатах).',
          'EXOthermic = heat EXits, ENdothermic = heat ENters. Fist to five on the objectives. Retrieval: melting ice, methane burning, the shared pair, 2H₂ + O₂ → 2H₂O. Then the table of physical vs chemical change (Figure 7.4: burning magnesium).'
        ),
        bi('Самбартаа бичээд 3-2-1-д өргөнө; хүснэгтийн мөр бүрийг таамаглана.', 'Write on boards and reveal on 3-2-1; predict each row of the table.'),
        bi('Физик; CO₂ ба H₂O; ковалент холбоо; давс уусах нь физик (ууршуулбал буцаж гарна).', 'Physical; CO₂ and H₂O; a covalent bond; dissolving salt is physical (evaporate and the salt comes back).')
      ],
      [
        bi('Экзотерм ба эндотерм урвал', 'Exothermic and endothermic reactions'),
        bi(
          'Зураг 7.8-аар термометрийн заалтын чиглэлийг харуулна; жишээ урвалууд. Хамтдаа: Mg + HCl (21→34), NH₄NO₃ уусах (21→14), NaOH + HCl (20→27), нимбэгийн хүчил + NaHCO₃ (22→17).',
          'Use Figure 7.8 to show which way the thermometer moves; example reactions. Together: Mg + HCl (21→34), dissolving NH₄NO₃ (21→14), NaOH + HCl (20→27), citric acid + NaHCO₃ (22→17).'
        ),
        bi('Экзотермд биеэсээ гадагш, эндотермд дотогш сум зурна; өөрчлөлт ба төрлийг самбартаа бичнэ.', 'Air-draw an arrow out of the body for exothermic and in for endothermic; write the change and type on boards.'),
        bi('+13 экзо; −7 эндо; +7 экзо; −5 эндо (өөрчлөлт = эцсийн − анхны).', '+13 exo; −7 endo; +7 exo; −5 endo (change = final − initial).')
      ],
      [
        bi('Урвалын замын диаграмм, ΔH ба Ea', 'Pathway diagrams, ΔH and Ea'),
        bi(
          'Экзо ба эндо диаграммыг харьцуулна (тэнхлэг: Energy, Progress of reaction). (E) ΔH-ийн тэмдэг: CH₄ + 2O₂ → CO₂ + 2H₂O, ΔH = −728 kJ/mol; Ea – урвалжаас оргил хүртэл. Hinge 1: 22 °C → 16 °C. Бие даан: 90 kJ/mol доор, оргил 150, ΔH = +50 диаграмм. Судлах: катализатор ба идэвхжүүлэлтийн энерги.',
          'Compare the exothermic and endothermic diagrams (axes: Energy, Progress of reaction). (E) The sign of ΔH: CH₄ + 2O₂ → CO₂ + 2H₂O, ΔH = −728 kJ/mol; Ea from the reactants to the peak. Hinge 1: 22 °C → 16 °C. You do: products 90 kJ/mol below, peak 150, a diagram for ΔH = +50. Explore: catalyst and activation energy.'
        ),
        bi('Бүтээгдэхүүн дээр бол гараа дээш, доор бол доош; ABCD хуруугаар санал өгнө; 3 минут чимээгүй зурна.', 'Hand high for higher-energy products, low for lower; vote with ABCD fingers; draw in silence for 3 minutes.'),
        bi('Hinge: C (эндотерм, ΔH эерэг); экзо; −90 kJ/mol; Ea = 150 kJ/mol.', 'Hinge: C (endothermic, ΔH positive); exo; −90 kJ/mol; Ea = 150 kJ/mol.')
      ],
      [
        bi('(E) Холбоо задрах ба үүсэх', '(E) Bond breaking and bond making'),
        bi(
          'Метаны шаталт (Зураг 7.12): холбоо задрах энерги шингээнэ, үүсэх ялгаруулна ("MEXO BENDO"). Ажилласан жишээ: CH₄ + 2O₂-д задрах 2736 kJ, үүсэх 3462 kJ → ΔH = −726 kJ/mol.',
          'Burning methane (Figure 7.12): breaking bonds takes in energy, making bonds gives it out ("MEXO BENDO"). Worked example: for CH₄ + 2O₂, bonds broken 2736 kJ, bonds made 3462 kJ → ΔH = −726 kJ/mol.'
        ),
        bi('Хоёр сурагч гараа салгаж "задрахад энерги хэрэгтэй"-г үзүүлнэ; эцсийн алхмаас өмнө ΔH-ийн тэмдгийг таамаглана.', 'Two students pull hands apart to show breaking needs energy; predict the sign of ΔH before the last step.'),
        bi('ΔH = задрах − үүсэх = 2736 − 3462 = −726 kJ/mol, экзотерм.', 'ΔH = broken − made = 2736 − 3462 = −726 kJ/mol, exothermic.')
      ]
    ]),
    [
      exitItem(
        bi('Урвалын үед температур өснө. Энэ ямар урвал вэ?', 'The temperature rises during a reaction. What type of reaction is it?'),
        [bi('Экзотерм', 'Exothermic'), bi('Эндотерм', 'Endothermic'), bi('Физик өөрчлөлт', 'A physical change'), bi('Энерги өөрчлөгдөхгүй', 'No energy change')],
        0,
        bi('Дулаан орчинд өгөгдөж, орчны температур өснө.', 'Thermal energy is transferred to the surroundings, so their temperature rises.')
      ),
      exitItem(
        bi('Аль нь эндотерм урвалын жишээ вэ?', 'Which is an example of an endothermic reaction?'),
        [bi('Шаталт', 'Combustion'), bi('Саармагжилт', 'Neutralisation'), bi('Дулааны задрал', 'Thermal decomposition'), bi('Металл + хүчил', 'A metal + an acid')],
        2,
        bi('Дулааны задрал, фотосинтез, аммонийн нитрат уусах – эндотерм; бусад нь экзотерм.', 'Thermal decomposition, photosynthesis and dissolving ammonium nitrate are endothermic; the others are exothermic.')
      ),
      exitItem(
        bi('Хатуу X усанд уусахад температур 22 °C-аас 16 °C болж буурав. Аль нь зөв бэ?', 'When solid X dissolves in water the temperature falls from 22 °C to 16 °C. Which statement is correct?'),
        [
          bi('экзотерм; ΔH сөрөг', 'exothermic; ΔH is negative'),
          bi('экзотерм; ΔH эерэг', 'exothermic; ΔH is positive'),
          bi('эндотерм; ΔH эерэг', 'endothermic; ΔH is positive'),
          bi('эндотерм; ΔH сөрөг', 'endothermic; ΔH is negative')
        ],
        2,
        bi('Орчны температур буурсан тул энерги шингэсэн – эндотерм, ΔH эерэг.', 'The surroundings got colder, so energy was taken in: endothermic, ΔH positive.')
      ),
      exitItem(
        bi('(E) Идэвхжүүлэлтийн энергийг (Ea) диаграммд хаанаас хаа хүртэл зурдаг вэ?', '(E) On a pathway diagram, where is the activation energy (Ea) drawn?'),
        [
          bi('Бүтээгдэхүүнээс оргил хүртэл', 'From the products to the peak'),
          bi('Урвалжаас оргил хүртэл', 'From the reactants up to the peak'),
          bi('Урвалжаас бүтээгдэхүүн хүртэл', 'From the reactants to the products'),
          bi('Оргилоос бүтээгдэхүүн хүртэл', 'From the peak to the products')
        ],
        1,
        bi('Ea – урвалд орохын тулд мөргөлдөх бөөмст шаардлагатай хамгийн бага энерги; урвалжаас оргил хүртэл.', 'Ea is the minimum energy colliding particles need to react; it goes from the reactants to the peak.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Холбооны энергийн тооцоо ба шалгалтын дасгал', 'Bond energy calculations and exam practice'),
    bi(
      '(E) Холбооны энергиээр ΔH-ийг тооцох (ΔH = задрах холбоо − үүсэх холбоо); экзо/эндотермыг холбоогоор тайлбарлах; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх.',
      '(E) Calculate ΔH from bond energies (ΔH = bonds broken − bonds made); explain exothermic and endothermic reactions in terms of bonds; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('(E) Холбоог томьёо, коэффициентоор тоолно: 2NH₃ = 6 N–H, O₂ = O=O. Задрах холбооны энергийг нэмж, үүсэх холбооных хасна.', '(E) Count the bonds from the formulae and coefficients: 2NH₃ = 6 N–H, O₂ = O=O. Add the energy of the bonds broken and subtract that of the bonds made.'),
      bi('(E) ΔH сөрөг = экзотерм (үүсэхэд ялгарсан энерги задрахад шингэсэнээс их); эерэг = эндотерм.', '(E) ΔH negative = exothermic (more energy given out making bonds than taken in breaking them); positive = endothermic.'),
      bi('Хариултад: "эндотерм урвал хүйтэн ялгаруулна" биш "дулаан шингээнэ"; ΔH-ийг тэмдэгтэй бичнэ.', 'In answers: not "endothermic reactions give out cold" but "take in thermal energy"; always give ΔH with its sign.')
    ],
    lessonSteps([
      [
        bi('(E) Хамтдаа: холбооны энергийн тооцоо', '(E) We do: a bond energy calculation'),
        bi('H₂ + Cl₂ → 2HCl (H–H 436, Cl–Cl 242, H–Cl 431 kJ/mol): задрах, үүсэх энерги, ΔH ба урвалын төрөл. HCl 2 молекул тул 2 × 431.', 'H₂ + Cl₂ → 2HCl (H–H 436, Cl–Cl 242, H–Cl 431 kJ/mol): energy to break, energy given out, ΔH and the type of reaction. There are 2 HCl molecules, so 2 × 431.'),
        bi('Хос бүр нэг мөрийг бодож, ангиар шалгана.', 'Each pair calculates one line, then the class checks.'),
        bi('678 kJ; 862 kJ; ΔH = −184 kJ/mol, экзотерм.', '678 kJ; 862 kJ; ΔH = −184 kJ/mol, exothermic.')
      ],
      [
        bi('(E) Бие даан: холбооны энергийн тооцоо', '(E) You do: bond energy calculations'),
        bi('N₂ + 3H₂ → 2NH₃ (N≡N 945, H–H 436, N–H 391) ба 2H₂O → 2H₂ + O₂ (O–H 464, H–H 436, O=O 498).', 'N₂ + 3H₂ → 2NH₃ (N≡N 945, H–H 436, N–H 391) and 2H₂O → 2H₂ + O₂ (O–H 464, H–H 436, O=O 498).'),
        bi('Хосоороо: нэг нь бодож нөгөө нь холбооны тоог шалгана, Q2-т солино.', 'In pairs one calculates and the other checks the bond count; swap roles for Q2.'),
        bi('−93 kJ/mol; +486 kJ/mol (эндотерм).', '−93 kJ/mol; +486 kJ/mol (endothermic).')
      ],
      [
        bi('Hinge асуулт 2 ба 3', 'Hinge questions 2 and 3'),
        bi('Q2: холбооны тухай аль өгүүлбэр зөв вэ (MEXO BENDO); Q3: задрах 1200 kJ, үүсэх 1500 kJ → ΔH.', 'Q2: which statement about bonds is correct (MEXO BENDO); Q3: bonds broken 1200 kJ, bonds made 1500 kJ → ΔH.'),
        bi('ABCD картаа цээжиндээ барьж 3-2-1-д үзүүлнэ.', 'Hold ABCD cards to the chest and show on 3-2-1.'),
        bi('Q2: C; Q3: B (−300 kJ/mol, экзотерм).', 'Q2: C; Q3: B (−300 kJ/mol, exothermic).')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi(
          'NaOH + HCl (19 → 26 °C): урвалын төрөл, (E) Ea-ийн тодорхойлолт, замын диаграмм, холбоогоор тайлбар. Шалгалтын 4 зөвлөмж. Үнэлэх: гар дулаацуулагчид экзо эсвэл эндо урвал. Алдаа засах: "холбоо үүсч задардаг учраас".',
          'NaOH + HCl (19 → 26 °C): the type of reaction, (E) the definition of Ea, the pathway diagram, the explanation in terms of bonds. The 4 exam tips. Evaluate: an exothermic or endothermic reaction for a hand-warmer. Error clinic: "because bonds are made and broken".'
        ),
        bi('5 минут шалгалтын нөхцөлд бичээд хостойгоо солилцож оноо тэмдэглэнэ; алдааг ногоон үзгээр засна.', 'Write for 5 minutes under exam conditions, swap and tick each marking point; fix a mistake in green pen.'),
        bi('Экзотерм; холбоо үүсэхэд ялгарсан энерги задрахад шингэсэнээс ИХ; гар дулаацуулагч – экзотерм.', 'Exothermic; MORE energy given out making bonds than taken in breaking them; a hand-warmer needs an exothermic reaction.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: эндотермын жишээ, температур өсөх, (E) эндотермын ΔH-ийн тэмдэг, задрах 500 / үүсэх 650. Зорилгод дахин fist to five.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: an endothermic example, a temperature rise, (E) the sign of ΔH for an endothermic reaction, broken 500 / made 650. Fist to five on the objectives again.'),
        bi('Гарах билетийг 4 минутад ганцаараа чимээгүй бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone and in silence in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('Дулааны задрал; экзотерм; эерэг; −150 kJ/mol.', 'Thermal decomposition; exothermic; positive; −150 kJ/mol.')
      ]
    ]),
    [
      exitItem(
        bi('(E) Холбооны тухай аль өгүүлбэр зөв бэ?', '(E) Which statement about bonds is correct?'),
        [
          bi('Холбоо задрахад энерги ялгарна', 'Breaking bonds releases energy'),
          bi('Холбоо үүсэхэд энерги шингэнэ', 'Making bonds takes in energy'),
          bi('Холбоо задрах эндотерм, үүсэх экзотерм', 'Breaking bonds is endothermic and making bonds is exothermic'),
          bi('Задрах, үүсэх хоёулаа энерги ялгаруулна', 'Both breaking and making bonds release energy')
        ],
        2,
        bi('Задлахад энерги хэрэгтэй; шинэ холбоо үүсэхэд энерги ялгарна (MEXO BENDO).', 'Energy is needed to break bonds; energy is released when new bonds form (MEXO BENDO).')
      ),
      exitItem(
        bi('(E) Задрах холбоо 1200 kJ, үүсэх холбоо 1500 kJ. ΔH хэд вэ?', '(E) Bonds broken = 1200 kJ and bonds made = 1500 kJ. What is ΔH?'),
        [
          bi('+300 kJ/mol, эндотерм', '+300 kJ/mol, endothermic'),
          bi('−300 kJ/mol, экзотерм', '−300 kJ/mol, exothermic'),
          bi('+2700 kJ/mol, эндотерм', '+2700 kJ/mol, endothermic'),
          bi('−2700 kJ/mol, экзотерм', '−2700 kJ/mol, exothermic')
        ],
        1,
        bi('ΔH = 1200 − 1500 = −300 kJ/mol; шингэснээс их энерги ялгарсан.', 'ΔH = 1200 − 1500 = −300 kJ/mol; more energy is given out than taken in.')
      ),
      exitItem(
        bi('(E) H₂ + Cl₂ → 2HCl. H–H 436, Cl–Cl 242, H–Cl 431 kJ/mol. ΔH хэд вэ?', '(E) H₂ + Cl₂ → 2HCl. H–H 436, Cl–Cl 242, H–Cl 431 kJ/mol. What is ΔH?'),
        [bi('+247 kJ/mol', '+247 kJ/mol'), bi('−184 kJ/mol', '−184 kJ/mol'), bi('+184 kJ/mol', '+184 kJ/mol'), bi('−431 kJ/mol', '−431 kJ/mol')],
        1,
        bi('Задрах 436 + 242 = 678; үүсэх 2 × 431 = 862; 678 − 862 = −184 kJ/mol.', 'Broken 436 + 242 = 678; made 2 × 431 = 862; 678 − 862 = −184 kJ/mol.')
      ),
      exitItem(
        bi('(E) Эндотерм урвалын ΔH ямар тэмдэгтэй вэ?', '(E) What is the sign of ΔH for an endothermic reaction?'),
        [bi('Эерэг', 'Positive'), bi('Сөрөг', 'Negative'), bi('Тэг', 'Zero'), bi('Урвалаас хамаарч өөр өөр', 'It depends on the reaction')],
        0,
        bi('Бүтээгдэхүүн урвалжаас дээр – энерги шингэнэ, ΔH эерэг.', 'The products are above the reactants – energy is taken in, so ΔH is positive.')
      )
    ],
    ID
  )
];

export const IG5_GLOSSARY: Record<string, GlossaryTerm[]> = {
  'ig5-1': [
    term(bi('физик өөрчлөлт', 'physical change'), bi('Шинэ бодис үүсэхгүй; ихэвчлэн буцаахад амар (хайлах, уусах).', 'No new substance is formed; usually easy to reverse (e.g. melting, dissolving).')),
    term(bi('химийн өөрчлөлт', 'chemical change'), bi('Шинэ бодис үүснэ; ихэвчлэн буцаахад хэцүү; энерги өөрчлөгдөнө.', 'A new substance is formed; usually hard to reverse; there is an energy change.')),
    term(bi('экзотерм', 'exothermic'), bi('Дулааны энергийг орчинд өгнө – орчны температур өснө.', 'Transfers thermal energy to the surroundings – the temperature of the surroundings rises.')),
    term(bi('эндотерм', 'endothermic'), bi('Орчноос дулааны энерги авна – орчны температур буурна.', 'Takes in thermal energy from the surroundings – the temperature of the surroundings falls.')),
    term(bi('энтальпийн өөрчлөлт, ΔH (E)', 'enthalpy change, ΔH (E)'), bi('Урвалын үеийн дулааны энергийн шилжилт (kJ/mol).', 'The transfer of thermal energy during a reaction (kJ/mol).')),
    term(bi('идэвхжүүлэлтийн энерги, Ea (E)', 'activation energy, Ea (E)'), bi('Мөргөлдөх бөөмс урвалд орохын тулд байх ёстой хамгийн бага энерги.', 'The minimum energy that colliding particles must have to react.'))
  ],
  'ig5-2': [
    term(bi('холбоо задрах (E)', 'bond breaking (E)'), bi('Энерги шингээнэ – эндотерм.', 'Takes in energy – endothermic.')),
    term(bi('холбоо үүсэх (E)', 'bond making (E)'), bi('Энерги ялгаруулна – экзотерм.', 'Gives out energy – exothermic.')),
    term(bi('ΔH-ийн тооцоо (E)', 'ΔH calculation (E)'), bi('ΔH = задрах холбооны энерги − үүсэх холбооны энерги.', 'ΔH = energy to break bonds − energy released making bonds.'))
  ]
};

export const IG5_PRACTICE: Record<string, PracticeItem[]> = {
  'ig5-1': [
    easy(
      bi('Аль нь химийн өөрчлөлт вэ?', 'Which is a chemical change?'),
      [bi('Мөс хайлах', 'Melting ice'), bi('Давс уусах', 'Dissolving salt'), bi('Магни шатах', 'Burning magnesium'), bi('Ус буцлах', 'Boiling water')],
      2,
      bi('Шинэ бодис MgO үүснэ; бусад нь физик өөрчлөлт.', 'A new substance, MgO, is formed; the others are physical changes.')
    ),
    easy(
      bi('Аммонийн нитратыг усанд уусгахад температур 21 °C-аас 14 °C болов. Өөрчлөлт ба төрөл юу вэ?', 'Ammonium nitrate dissolves in water and the temperature goes from 21 °C to 14 °C. What is the change and the type?'),
      [bi('+7 °C, экзотерм', '+7 °C, exothermic'), bi('−7 °C, эндотерм', '−7 °C, endothermic'), bi('−7 °C, экзотерм', '−7 °C, exothermic'), bi('+7 °C, эндотерм', '+7 °C, endothermic')],
      1,
      bi('Өөрчлөлт = эцсийн − анхны = 14 − 21 = −7 °C; температур буурсан тул эндотерм.', 'Change = final − initial = 14 − 21 = −7 °C; the temperature fell, so it is endothermic.')
    ),
    hard(
      bi('(E) ΔH = +50 kJ/mol бүхий эндотерм урвалын замын диаграммыг тайлбарлаж, юуг тэмдэглэхийг бич.', '(E) Describe a labelled pathway diagram for an endothermic reaction with ΔH = +50 kJ/mol.'),
      bi('Бүтээгдэхүүн урвалжаас дээр; урвалжаас бүтээгдэхүүн рүү дээш сум ΔH гэж тэмдэглэсэн; Ea урвалжаас оргил хүртэл; тэнхлэг: Energy ба Progress of reaction.', 'Products above the reactants; an arrow up from reactants to products labelled ΔH; Ea from the reactants to the peak; axes labelled Energy and Progress of reaction.'),
      bi('Ea-г бүтээгдэхүүнээс зурвал оноо алдана; сумандаа чиглэл тавь.', 'Drawing Ea from the products loses the mark; give the arrows a direction.')
    )
  ],
  'ig5-2': [
    easy(
      bi('(E) Задрах холбоо 500 kJ, үүсэх холбоо 650 kJ. ΔH хэд вэ?', '(E) Bonds broken 500 kJ, bonds made 650 kJ. What is ΔH?'),
      [bi('+150 kJ/mol', '+150 kJ/mol'), bi('−150 kJ/mol', '−150 kJ/mol'), bi('+1150 kJ/mol', '+1150 kJ/mol'), bi('−1150 kJ/mol', '−1150 kJ/mol')],
      1,
      bi('500 − 650 = −150 kJ/mol; тэмдгээ бүү алд.', '500 − 650 = −150 kJ/mol; do not lose the sign.')
    ),
    easy(
      bi('(E) 2NH₃-д хэдэн N–H холбоо байх вэ?', '(E) How many N–H bonds are in 2NH₃?'),
      [bi('2', '2'), bi('3', '3'), bi('6', '6'), bi('9', '9')],
      2,
      bi('NH₃ бүр 3 N–H; 2 × 3 = 6.', 'Each NH₃ has 3 N–H; 2 × 3 = 6.')
    ),
    hard(
      bi('(E) N₂ + 3H₂ → 2NH₃ урвалын ΔH-ийг тооцоол. N≡N 945, H–H 436, N–H 391 kJ/mol.', '(E) Calculate ΔH for N₂ + 3H₂ → 2NH₃. N≡N 945, H–H 436, N–H 391 kJ/mol.'),
      bi('Задрах: 945 + 3 × 436 = 2253 kJ; үүсэх: 6 × 391 = 2346 kJ; ΔH = 2253 − 2346 = −93 kJ/mol (экзотерм).', 'Broken: 945 + 3 × 436 = 2253 kJ; made: 6 × 391 = 2346 kJ; ΔH = 2253 − 2346 = −93 kJ/mol (exothermic).'),
      bi('ΔH = үүсэх − задрах гэж урвуулбал тэмдэг буруу гарна.', 'Using ΔH = made − broken gives the wrong sign.')
    )
  ]
};
