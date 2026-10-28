// IGCSE 0620 chapter 6 (chemical reactions), lessons 1–2: rates of reaction. They follow the deck
// Ch08_Rates_of_reaction.pptx and its plan of two 40-minute lessons (slides 1–13 and 14 on), with the review slides 23–30.
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig6';

export const IG6_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Урвалын хурдыг хэмжих ба нөлөөлөх хүчин зүйлс', 'Measuring rate and the factors that change it'),
    bi(
      'Концентраци, даралт, гадаргуугийн талбай, температур, катализаторын нөлөөг тайлбарлах; катализатор хурдыг нэмж, төгсгөлд өөрчлөгдөхгүй гэдгийг хэлэх; масс алдагдал ба хийн эзэлхүүнээр хэмжих; хурдны график, өгөгдлийг унших.',
      'Describe the effect of concentration, pressure, surface area, temperature and catalysts on rate; state that a catalyst increases the rate and is unchanged at the end; measure rate by loss in mass and volume of gas; interpret rate graphs and data.'
    ),
    [
      bi('Хурд = урвалж эсвэл бүтээгдэхүүний хэмжээний өөрчлөлт ÷ хугацаа. Арга: масс алдагдал (CO₂ гарна) эсвэл хийн тариураар эзэлхүүн.', 'Rate = change in amount of reactant or product ÷ time. Methods: loss in mass (CO₂ escapes) or gas volume with a gas syringe.'),
      bi('Графикт муруй эгц байх тусам хурдан; хэвтээ болбол урвал дууссан (хязгаарлагч урвалж дууссан). Ижил масс → ижил эзэлхүүн.', 'On a graph, the steeper the curve the faster the rate; flat means the reaction has finished (the limiting reactant is used up). Same mass → same final volume.'),
      bi('Концентраци, даралт, гадаргуу, температур өсөх ба катализатор нэмэх нь хурдыг нэмэгдүүлнэ. Катализатор (фермент) хурдыг нэмж, төгсгөлд өөрчлөгдөхгүй.', 'Higher concentration, pressure, surface area or temperature, and adding a catalyst, all increase the rate. A catalyst (or enzyme) increases the rate and is unchanged at the end.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi(
          'Том асуулт: хоол хөргөгчинд яагаад удаан хадгалагддаг, үйлдвэрт гурилын тоос яагаад дэлбэрдэг вэ? "Санал нийлэх үү?" гурван өгүүлбэр (катализатор зарцуулагдана; нунтаг хурдан урвална; температур зөвхөн мөргөлдөөнийг нэмнэ) ба төлөвлөгөө.',
          'Big question: why does food last longer in a fridge, and why does flour dust explode in a factory? Three "Agree or disagree?" statements (a catalyst is used up; powder reacts faster; temperature only makes particles collide more often) and the plan.'
        ),
        bi('Урвалыг хурдасгах 3 аргыг хосоороо 60 секундэд жагсааж, эрхий хуруугаар санал өгнө.', 'In pairs list three ways to make a reaction go faster in 60 s; vote with thumbs.'),
        bi('Температур, гадаргуугийн талбай, концентраци, катализатор.', 'Temperature, surface area, concentration, catalyst.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi(
          'Катализаторын тодорхойлолтын хоёр хэсэг: хурдыг нэмнэ + төгсгөлд өөрчлөгдөхгүй. Зорилгод fist to five. Давталт: халаахад хийн бөөмс, гантиг + HCl-ийн үгэн тэгшитгэл, (E) Ea, концентраци гэж юу вэ.',
          'The two parts of the definition of a catalyst: increases the rate + unchanged at the end. Fist to five on the objectives. Retrieval: gas particles when heated, the word equation for marble chips + HCl, (E) Ea, what concentration measures.'
        ),
        bi('Самбартаа бичээд 3-2-1-д өргөнө.', 'Write on show-me boards and reveal on 3-2-1.'),
        bi('Хурдан хөдөлнө; кальцийн карбонат + давсны хүчил → кальцийн хлорид + ус + CO₂.', 'They move faster; calcium carbonate + hydrochloric acid → calcium chloride + water + carbon dioxide.')
      ],
      [
        bi('Хурдыг хэмжих ба график унших', 'Measuring rate and reading a graph'),
        bi(
          'Масс алдагдал (Зураг 8.6) ба хийн тариур (Зураг 8.9); хөвөнгийн бөглөө CO₂-ийг гаргаж хүчлийн цацралтыг зогсооно. Хамтдаа: CO₂-ийн эзэлхүүн–хугацааны график, A ба B туршилт.',
          'Loss in mass (Figure 8.6) and the gas syringe (Figure 8.9); the cotton wool plug lets CO₂ out but stops acid spray. Together: the graph of CO₂ volume against time for experiments A and B.'
        ),
        bi('Устөрөгч ялгаруулах урвалд аль арга тохирохыг ярилцана; муруйн хамгийн эгц хэсгийг хуруугаараа дагаж тайлбарлана.', 'Discuss which method suits a reaction that gives off hydrogen; trace the steepest part of each curve with a finger.'),
        bi('A хурдан (эгц); гантиг дууссан тул хэвтээ; ижил масс → 60 cm³; 48 ÷ 40 = 1.2 cm³/s.', 'A is faster (steeper); flat because the marble chips are used up; same mass → 60 cm³; 48 ÷ 40 = 1.2 cm³/s.')
      ],
      [
        bi('Хүчин зүйлс, гадаргуу, температур', 'Factors, surface area and temperature'),
        bi(
          'Хүчин зүйлсийн хүснэгт ба өдөр тутмын жишээ. Гадаргуу: 2 см шоо 24 см² → 8 ширхэг 1 см шоо 48 см². Практик: натрийн тиосульфат + HCl, "алга болох загалмай"; хурд ∝ 1/хугацаа; шударга туршилт. Хамтдаа: 20–50 °C өгөгдөл.',
          'The table of factors with everyday examples. Surface area: a 2 cm cube 24 cm² → eight 1 cm cubes 48 cm². Practical: sodium thiosulfate + HCl, the "disappearing cross"; rate ∝ 1/time; a fair test. Together: the data at 20–50 °C.'
        ),
        bi('Нөлөө бүрийг таамаглана; 0.5 см шоонд талбайг бодно; хос бүр нэг хурдыг тооцоолно.', 'Predict each effect; work out the area for 0.5 cm cubes; each pair calculates one rate.'),
        bi('Бүгд хурдыг нэмнэ; 96 см²; 0.0083, 0.016, 0.031, 0.059 s⁻¹ – 10 °C тутам ~2 дахин.', 'All increase the rate; 96 cm²; 0.0083, 0.016, 0.031, 0.059 s⁻¹ – about double every 10 °C.')
      ],
      [
        bi('Hinge, катализатор, мөргөлдөөний онол', 'Hinge, catalysts and collision theory'),
        bi(
          'Hinge 1: цайр + HCl-ийн хурдыг аль өөрчлөлт нэмэхгүй вэ? Катализатор ба фермент: MnO₂ нь 2H₂O₂ → 2H₂O + O₂-ийг хурдасгана; фермент 37–40 °C-д сайн; (E) Ea бага өөр зам. (E) Мөргөлдөөний онол: Ea-аас их энергитэй мөргөлдөөн л амжилттай.',
          'Hinge 1: which change will NOT increase the rate of zinc + HCl? Catalysts and enzymes: MnO₂ catalyses 2H₂O₂ → 2H₂O + O₂; enzymes work best at about 37–40 °C; (E) an alternative pathway with a lower Ea. (E) Collision theory: only collisions with energy ≥ Ea are successful.'
        ),
        bi('ABCD хуруугаар санал өгнө; MnO₂ өөрчлөгдөөгүйг хэрхэн батлахыг ярилцана; ангиар санамсаргүй алхаж "өрөөг жижигрүүлнэ".', 'Vote with ABCD fingers; discuss how to prove MnO₂ is unchanged; walk randomly as a class while the "room" gets smaller.'),
        bi('Hinge: C (ижил хүчлийг илүү их эзэлхүүнээр); амжилттай мөргөлдөөний давтамж өсөхөд хурд өснө.', 'Hinge: C (a larger volume of the same acid); the rate rises when the frequency of successful collisions rises.')
      ]
    ]),
    [
      exitItem(
        bi('Хий ялгаруулах урвалын хурдыг хэмжих хоёр арга аль нь вэ?', 'Which two methods measure the rate of a reaction that produces a gas?'),
        [
          bi('Масс алдагдал; цуглуулсан хийн эзэлхүүн', 'Loss in mass; volume of gas collected'),
          bi('Өнгө өөрчлөгдөх; pH', 'Colour change; pH'),
          bi('Температур; даралт', 'Temperature; pressure'),
          bi('Хайлах цэг; буцлах цэг', 'Melting point; boiling point')
        ],
        0,
        bi('Жин дээрх колбын масс CO₂ гарахад буурна, эсвэл хийг хийн тариурт цуглуулна.', 'The flask on a balance loses mass as CO₂ escapes, or the gas is collected in a gas syringe.')
      ),
      exitItem(
        bi('Цайр + шингэрүүлсэн HCl. Аль өөрчлөлт хурдыг НЭМЭХГҮЙ вэ?', 'Zinc granules + dilute HCl. Which change will NOT increase the rate?'),
        [
          bi('Цайрын нунтаг хэрэглэх', 'Using zinc powder'),
          bi('Хүчлийг халаах', 'Heating the acid'),
          bi('Ижил хүчлийг илүү их эзэлхүүнээр хэрэглэх', 'Using a larger volume of the same acid'),
          bi('Илүү өтгөн хүчил хэрэглэх', 'Using more concentrated acid')
        ],
        2,
        bi('Ижил концентрацитай хүчил нэмэхэд нэгж эзэлхүүн дэх бөөмийн тоо өөрчлөгдөхгүй.', 'More acid of the same concentration does not change the number of particles per unit volume.')
      ),
      exitItem(
        bi('Хурдны график хэвтээ болвол юуг илтгэх вэ?', 'What does it mean when a rate curve becomes horizontal (flat)?'),
        [
          bi('Урвал удаашрав', 'The reaction has slowed down'),
          bi('Урвал дууссан – хязгаарлагч урвалж дууссан', 'The reaction has finished – the limiting reactant is used up'),
          bi('Урвал хурдсав', 'The reaction has sped up'),
          bi('Катализатор дууссан', 'The catalyst has run out')
        ],
        1,
        bi('Хэвтээ = урвал зогссон, "удааширсан" биш.', 'Flat = the reaction has stopped, not "slowed down".')
      ),
      exitItem(
        bi('Катализатор гэж юу вэ?', 'What is a catalyst?'),
        [
          bi('Урвалд зарцуулагддаг бодис', 'A substance that is used up in a reaction'),
          bi('Хурдыг нэмж, төгсгөлд өөрчлөгдөхгүй бодис', 'A substance that increases the rate and is unchanged at the end'),
          bi('Бүтээгдэхүүнийг нэмэгдүүлдэг бодис', 'A substance that makes more product'),
          bi('Урвалыг удаашруулдаг бодис', 'A substance that slows a reaction')
        ],
        1,
        bi('Төгсгөлд масс нь ижил, химийн хувьд өөрчлөгдөөгүй.', 'At the end it has the same mass and is chemically unchanged.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('(E) Мөргөлдөөний онол, аргыг үнэлэх ба шалгалт', '(E) Collision theory, evaluating methods and exam practice'),
    bi(
      '(E) Хүчин зүйл бүрийг мөргөлдөөний онолоор тайлбарлах (нэгж эзэлхүүн дэх бөөм, мөргөлдөөний давтамж, кинетик энерги, Ea); катализатор Ea-г бууруулдгийг хэлэх; хурдыг хэмжих аргыг үнэлэх; шалгалтын асуултаар бүлгийг нэгтгэх.',
      '(E) Explain each factor with collision theory (particles per unit volume, collision frequency, kinetic energy, Ea); state that a catalyst lowers Ea; evaluate methods for measuring rate; pull the chapter together with exam questions.'
    ),
    [
      bi('(E) Концентраци/даралт ↑ → нэгж эзэлхүүн дэх бөөм ↑ → мөргөлдөөн илүү давтамжтай. Гадаргуу ↑ → илүү олон бөөм ил гарна.', '(E) Concentration/pressure ↑ → more particles per unit volume → more frequent collisions. Surface area ↑ → more particles exposed.'),
      bi('(E) Температур ↑ → кинетик энерги ↑ → мөргөлдөөн илүү давтамжтай БА Ea-аас их энергитэй мөргөлдөөний хувь ↑. Катализатор Ea-г бууруулна; ΔH өөрчлөгдөхгүй.', '(E) Temperature ↑ → more kinetic energy → more frequent collisions AND a greater proportion with energy ≥ Ea. A catalyst lowers Ea; ΔH is unchanged.'),
      bi('Хариултад "илүү олон мөргөлдөөн" биш "секундэд илүү олон (давтамж)" гэж бичнэ; нунтаг хурдан урвалдаг ч бүтээгдэхүүн нь хязгаарлагч урвалжаас хамаарна.', 'In answers write "more collisions per second (frequency)", not just "more collisions"; powder reacts faster but the amount of product depends on the limiting reactant.')
    ],
    lessonSteps([
      [
        bi('(E) Хүчин зүйлсийг тайлбарлах; судлах', '(E) Explaining the factors; explore'),
        bi('Хүчин зүйл бүрийн мөргөлдөөний онолын тайлбарын хүснэгт; температур хоёр шалтгаантай. Судлах: Rate of Reaction ба Catalyst Reaction симуляц – нэг хүчин зүйлийг нэг удаа өөрчлөх.', 'The collision-theory table for each factor; temperature has two reasons. Explore: the Rate of Reaction and Catalyst Reaction simulations – change one factor at a time.'),
        bi('Мөр бүрийг өөр сурагч тайлбарлана; температурыг хоёр дахин өсгөвөл хурд хэр өсөхийг таамаглана.', 'A different student explains each row; predict how much faster the reaction gets if the temperature is doubled.'),
        bi('Температур: давтамж ↑ ба Ea-аас их энергитэй мөргөлдөөн ↑ (гол нөлөө).', 'Temperature: frequency ↑ and more collisions with energy ≥ Ea (the main effect).')
      ],
      [
        bi('(E) Бие даан: тайлбарла', '(E) You do: explain it'),
        bi('2 mol/dm³ ба 1 mol/dm³ HCl-тэй Mg; температур; хийн урвал өндөр даралтад.', 'Mg with 2 mol/dm³ vs 1 mol/dm³ HCl; temperature; gas reactions at higher pressure.'),
        bi('Бие даан бичээд хостойгоо солилцож "per unit volume", "frequency", "Ea" үгсийн доогуур зурна.', 'Write alone, swap and underline "per unit volume", "frequency" and "Ea" in a partner’s answer.'),
        bi('Нэгж эзэлхүүн дэх бөөм ↑ → давтамжтай мөргөлдөөн → хурдан; Ea-г бүү орхи.', 'More particles per unit volume → more frequent collisions → faster; do not leave out Ea.')
      ],
      [
        bi('Hinge 2–3 ба аргыг үнэлэх', 'Hinges 2–3 and evaluating methods'),
        bi('Hinge 2: катализатор яагаад хурдыг нэмдэг вэ; hinge 3: 1 g гантиг хэсэг ба нунтаг. Дараа нь (E) аргыг үнэлэх: устөрөгчид масс алдагдал муу, хийн тариурын давуу тал, бөглөөг хурдан тавих.', 'Hinge 2: why a catalyst increases the rate; hinge 3: 1 g of marble chips vs powder. Then (E) evaluating methods: loss of mass is poor for hydrogen, an advantage of a gas syringe, replacing the stopper quickly.'),
        bi('ABCD картаар санал өгнө; "алга болох загалмай" туршилтыг сайжруулах санаа гаргана.', 'Vote with ABCD cards; suggest one improvement to the disappearing-cross experiment.'),
        bi('Hinge 2: B (Ea бага зам); hinge 3: B (нунтаг хурдан, CO₂ ижил); H₂ хэт хөнгөн.', 'Hinge 2: B (a lower-Ea pathway); hinge 3: B (powder faster, same CO₂); H₂ is too light.')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi(
          '(a)–(d) шалгалтын асуулт (хийн тариур, хурдыг нэмэх 2 арга, (E) нунтаг, (E) катализатор ба Ea). 4 шалгалтын зөвлөмж. Үнэлэх: тиосульфатын туршилтад хэмжих цилиндр, тусгаарлаагүй стакан (0620/62/M/J/23 Q2). Алдаа засах: "бөөмс хурдан хөдөлнө" (концентрацид).',
          'Exam question (a)–(d) (gas syringe, two ways to increase the rate, (E) powder, (E) catalyst and Ea). The 4 exam tips. Evaluate: a measuring cylinder and an uninsulated beaker in the thiosulfate experiment (0620/62/M/J/23 Q2). Error clinic: "the particles move faster" (for concentration).'
        ),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлгээ бичнэ.', 'Write for 4 minutes, swap and tick each marking point; write the evaluation with the sentence frame.'),
        bi('Бюретк/пипетк, ус халаагуур, давтаж дундаж; нэгж эзэлхүүн дэх бөөм ↑ → давтамжтай мөргөлдөөн.', 'Burette or pipette, water bath, repeat and take a mean; more particles per unit volume → more frequent collisions.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: хурдыг хэмжих 2 арга, хүчлийг шингэрүүлэх, катализатор, (E) температур. Зорилгод дахин fist to five.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: two methods of measuring rate, diluting the acid, a catalyst, (E) temperature. Fist to five on the objectives again.'),
        bi('Гарах билетийг 4 минутад ганцаараа чимээгүй бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone and in silence in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('Масс алдагдал, хийн эзэлхүүн; хурд буурна; (E) кинетик энерги ↑ → давтамж ↑, Ea-аас их ↑.', 'Loss in mass, gas volume; the rate decreases; (E) more kinetic energy → more frequent collisions and more with energy ≥ Ea.')
      ]
    ]),
    [
      exitItem(
        bi('(E) Катализатор урвалын хурдыг яагаад нэмдэг вэ?', '(E) Why does a catalyst increase the rate of a reaction?'),
        [
          bi('Бөөмст илүү кинетик энерги өгнө', 'It gives the particles more kinetic energy'),
          bi('Идэвхжүүлэлтийн энерги бага өөр зам гаргана', 'It provides a pathway with a lower activation energy'),
          bi('Урвалжийн концентрацийг нэмнэ', 'It increases the concentration of the reactants'),
          bi('Урвалыг илүү экзотерм болгоно', 'It makes the reaction more exothermic')
        ],
        1,
        bi('Бага Ea-аас их энергитэй мөргөлдөөн олширно; ΔH өөрчлөгдөхгүй.', 'More collisions now have energy ≥ the lower Ea; ΔH is unchanged.')
      ),
      exitItem(
        bi('1. 1 g гантиг хэсэг + илүүдэл хүчил. 2. 1 g гантиг нунтаг + ижил илүүдэл хүчил. Аль нь зөв бэ?', '1: 1 g marble chips + excess acid. 2: 1 g marble powder + the same excess acid. Which is correct?'),
        [
          bi('2 хурдан; 2 илүү их CO₂ өгнө', '2 is faster; 2 gives more CO₂'),
          bi('2 хурдан; хоёулаа ижил эзэлхүүн CO₂ өгнө', '2 is faster; both give the same volume of CO₂'),
          bi('1 хурдан; ижил эзэлхүүн', '1 is faster; both give the same volume'),
          bi('Хурд ижил; 2 илүү их CO₂', 'Same rate; 2 gives more CO₂')
        ],
        1,
        bi('Нунтаг гадаргуу ихтэй тул хурдан; ижил масс CaCO₃ ижил хэмжээний CO₂ өгнө.', 'Powder has a larger surface area, so it is faster; the same mass of CaCO₃ gives the same amount of CO₂.')
      ),
      exitItem(
        bi('(E) Температур өсөхөд хурд яагаад нэмэгддэг вэ?', '(E) Why does increasing the temperature increase the rate?'),
        [
          bi('Бөөм томордог', 'The particles get bigger'),
          bi('Кинетик энерги ↑ → мөргөлдөөн давтамжтай ба Ea-аас их энергитэй мөргөлдөөн олширно', 'More kinetic energy → more frequent collisions and more collisions with energy ≥ Ea'),
          bi('Ea буурдаг', 'Ea decreases'),
          bi('Нэгж эзэлхүүн дэх бөөм олширно', 'There are more particles per unit volume')
        ],
        1,
        bi('Ea-г бууруулдаг нь катализатор; температур энергийг нэмнэ.', 'Lowering Ea is what a catalyst does; temperature raises the energy of the particles.')
      ),
      exitItem(
        bi('(E) Устөрөгч ялгаруулах урвалд масс алдагдлын арга яагаад тохиромжгүй вэ?', '(E) Why is the loss-of-mass method poor for a reaction that makes hydrogen?'),
        [
          bi('H₂ усанд уусдаг', 'H₂ dissolves in water'),
          bi('H₂ маш хөнгөн тул массын өөрчлөлт хэт бага', 'H₂ is very light, so the change in mass is too small to measure accurately'),
          bi('H₂ шатдаг', 'H₂ burns'),
          bi('H₂ өнгөтэй', 'H₂ is coloured')
        ],
        1,
        bi('Хийн тариур илүү тохиромжтой.', 'A gas syringe is more suitable.')
      )
    ],
    ID
  )
];

export const IG6_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'ig6-1': [
    term(bi('урвалын хурд', 'rate of reaction'), bi('Урвалж хэр хурдан зарцуулагдах эсвэл бүтээгдэхүүн хэр хурдан үүсэх (хэмжээ ÷ хугацаа).', 'How fast reactants are used up or products are formed (amount ÷ time).')),
    term(bi('катализатор', 'catalyst'), bi('Урвалын хурдыг нэмж, төгсгөлд өөрчлөгдөхгүй бодис.', 'A substance that increases the rate of a reaction and is unchanged at the end.')),
    term(bi('фермент', 'enzyme'), bi('Биологийн катализатор болох уураг.', 'A protein that acts as a biological catalyst.'))
  ],
  'ig6-2': [
    term(bi('мөргөлдөөний онол (E)', 'collision theory (E)'), bi('Бөөмс урвалд орохын тулд хангалттай (≥ Ea) энергитэй мөргөлдөх ёстой.', 'Particles must collide with enough energy (≥ Ea) to react.')),
    term(bi('идэвхжүүлэлтийн энерги, Ea (E)', 'activation energy, Ea (E)'), bi('Мөргөлдөх бөөмс урвалд орохын тулд байх ёстой хамгийн бага энерги.', 'The minimum energy that colliding particles must have to react.')),
    term(bi('мөргөлдөөний давтамж (E)', 'collision frequency (E)'), bi('Секунд дэх мөргөлдөөний тоо.', 'The number of collisions per second.'))
  ]
};

export const IG6_PRACTICE_A: Record<string, PracticeItem[]> = {
  'ig6-1': [
    easy(
      bi('Хүчлийг шингэрүүлбэл хурдад юу болох вэ?', 'What happens to the rate if the acid is diluted?'),
      [bi('Нэмэгдэнэ', 'It increases'), bi('Буурна', 'It decreases'), bi('Өөрчлөгдөхгүй', 'It stays the same'), bi('Урвал зогсоно', 'The reaction stops')],
      1,
      bi('Концентраци буурвал хурд буурна.', 'A lower concentration gives a lower rate.')
    ),
    easy(
      bi('"Алга болох загалмай" туршилтад 30 °C-д 62 секунд болжээ. Хурд (1/хугацаа) ойролцоогоор хэд вэ?', 'In the disappearing-cross experiment the cross disappears after 62 s at 30 °C. What is the rate (1/time)?'),
      [bi('62 s⁻¹', '62 s⁻¹'), bi('0.016 s⁻¹', '0.016 s⁻¹'), bi('0.62 s⁻¹', '0.62 s⁻¹'), bi('1.6 s⁻¹', '1.6 s⁻¹')],
      1,
      bi('1 ÷ 62 = 0.016 s⁻¹; хугацаа бага байх тусам хурд их.', '1 ÷ 62 = 0.016 s⁻¹; the shorter the time, the faster the rate.')
    ),
    hard(
      bi('Хүчлийн концентраци хурдад хэрхэн нөлөөлөхийг харуулах шударга туршилтыг төлөвлө (хувьсагч, арга, үр дүнгийн хүснэгт).', 'Plan a fair-test experiment to show how the concentration of acid affects the rate (variables, method, results table).'),
      bi('Бие даасан: хүчлийн концентраци; хамааралтай: хийн эзэлхүүн эсвэл масс алдагдал хугацаагаар; хяналт: гантигийн масс ба хэмжээ, хүчлийн эзэлхүүн, температур. Хийн тариураар 30 секунд тутам хэмжиж, хугацаа ба эзэлхүүний хүснэгтэд бичнэ.', 'Independent: acid concentration; dependent: gas volume or mass lost over time; control: mass and size of marble chips, volume of acid, temperature. Measure with a gas syringe every 30 s and record time and volume in a table.'),
      bi('Нэг л хувьсагчийг өөрчилж, бусдыг тогтмол барина.', 'Change only one variable and keep the others the same.')
    )
  ],
  'ig6-2': [
    easy(
      bi('(E) Хийн урвал өндөр даралтад яагаад хурдан явагддаг вэ?', '(E) Why do gas reactions go faster at higher pressure?'),
      [
        bi('Бөөмс илүү энергитэй болно', 'The particles have more energy'),
        bi('Нэгж эзэлхүүн дэх бөөм олширч мөргөлдөөн давтамжтай болно', 'More particles per unit volume give more frequent collisions'),
        bi('Ea буурна', 'Ea decreases'),
        bi('Бөөм томорно', 'The particles get bigger')
      ],
      1,
      bi('Хийн бөөмс ойртож, нэгж эзэлхүүнд олширно.', 'The gas particles are closer together, so there are more per unit volume.')
    ),
    easy(
      bi('Хийн тариурын давуу тал аль нь вэ?', 'Which is an advantage of a gas syringe over collecting gas over water?'),
      [
        bi('Усанд уусдаг хийд (CO₂) ч ажиллана; илүү нарийн хэмжилт', 'It also works for gases that dissolve in water (e.g. CO₂); readings are more precise'),
        bi('Хямд', 'It is cheaper'),
        bi('Хийг халаана', 'It heats the gas'),
        bi('Катализатор болно', 'It acts as a catalyst')
      ],
      0,
      bi('"Accurate" ба "precise"-ийг андуурч болохгүй.', 'Do not confuse "accurate" with "precise".')
    ),
    hard(
      bi('(E) Мөргөлдөөний онолоор нунтаг яагаад бөөнөөс хурдан урвалддагийг тайлбарла. [2]', '(E) Explain, using collision theory, why powder reacts faster than lumps. [2]'),
      bi('Гадаргуугийн талбай их – илүү олон бөөм ил гарсан [1]; мөргөлдөөн илүү давтамжтай [1].', 'Larger surface area / more particles exposed [1]; more frequent collisions [1].'),
      bi('Нунтаг илүү их бүтээгдэхүүн өгдөггүй – зөвхөн хурдан.', 'Powder does not make more product – it only reacts faster.')
    )
  ]
};
