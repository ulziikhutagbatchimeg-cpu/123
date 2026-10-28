// IGCSE 0620 chapter 9 (metals), lessons 4–5: extraction and corrosion. They follow the deck
// Ch16_Extraction_and_corrosion_of_metals.pptx and its plan of two 40-minute lessons (slides 1–11 and 12 on), with the
// review slides 21–28. Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig9';

export const IG9_LESSONS_C: StatesLesson[] = [
  lesson(
    4,
    bi('Металл гаргаж авах: тэсэлгээний зуух ба хөнгөнцагаан', 'Extracting metals: the blast furnace and aluminium'),
    bi(
      'Металл гаргах арга идэвхийн цуваан дахь байрлалаас хамаарахыг тайлбарлах; гематитаас тэсэлгээний зууханд төмөр гаргахыг тайлбарлах; хөнгөнцагааныг бокситоос электролизээр гаргадгийг хэлэх; (E) тэсэлгээний зуухны тэгшитгэл, шаар үүсэх; (E) хөнгөнцагаан гаргах: цэвэршүүлсэн боксит, криолит, электрод.',
      'Describe how the method of extraction depends on the reactivity series; describe the extraction of iron from hematite in the blast furnace; state that aluminium is extracted from bauxite by electrolysis; (E) the blast furnace equations, including slag; (E) aluminium extraction: purified bauxite, cryolite, electrodes.'
    ),
    [
      bi('Нүүрстөрөгчөөс дээрх металл (K, Na, Ca, Mg, Al) – хайлмал нэгдлийн электролиз; доорх (Zn, Fe) – ислийг нүүрстөрөгч эсвэл CO-оор ангижруулах; Cu, Ag, Au – амархан гаргана эсвэл цэвэр байдлаар олддог.', 'Metals above carbon (K, Na, Ca, Mg, Al) – electrolysis of the molten compound; below carbon (Zn, Fe) – reduce the oxide with carbon or CO; Cu, Ag, Au – easily extracted or found as the metal.'),
      bi('Тэсэлгээний зуух: гематит (Fe₂O₃), кокс, шохойн чулуу, халуун агаар. Гол ангижруулагч CO: (E) Fe₂O₃ + 3CO → 2Fe + 3CO₂; шохойн чулуу хольцыг шаар (CaSiO₃) болгоно.', 'Blast furnace: hematite (Fe₂O₃), coke, limestone, hot air. The main reducing agent is CO: (E) Fe₂O₃ + 3CO → 2Fe + 3CO₂; limestone removes impurities as slag (CaSiO₃).'),
      bi('(E) Хөнгөнцагаан: Al₂O₃-ийг хайлмал криолитод уусгаж (температур ≈950 °C болж буурна) электролиз хийнэ; Al³⁺ + 3e⁻ → Al; 2O²⁻ → O₂ + 4e⁻; нүүрстөрөгчийн анод шатаж солигдоно.', '(E) Aluminium: Al₂O₃ is dissolved in molten cryolite (lowering the temperature to about 950 °C) and electrolysed; Al³⁺ + 3e⁻ → Al; 2O²⁻ → O₂ + 4e⁻; the carbon anodes burn away and are replaced.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi(
          'Том асуулт: төмрийг зууханд нүүрстөрөгчөөр гаргадаг, харин хөнгөнцагаанд асар их цахилгаан хэрэгтэй – яагаад, мөн яагаад төмөр зэвэрч хөнгөнцагаан зэвэрдэггүй вэ? "Санал нийлэх үү?" (төмрийг электролизээр гаргана; зэврэлтэд ус ба хүчилтөрөгч хоёулаа хэрэгтэй; будах нь золиослох хамгаалалт) ба төлөвлөгөө.',
          'Big question: iron is extracted with carbon in a furnace, but aluminium needs huge amounts of electricity – why, and why does iron rust while aluminium does not? "Agree or disagree?" (iron is extracted by electrolysis; rusting needs both water and oxygen; painting is sacrificial protection) and the plan.'
        ),
        bi('Хөнгөнцагааныг гаргах яагаад үнэтэй вэ гэдгийг хосоороо 60 секунд ярилцаж, эрхий хуруугаар санал өгнө.', 'Think–pair–share for 60 s on why aluminium is more expensive to extract; vote with thumbs.'),
        bi('Цуваанд нүүрстөрөгчөөс дээрх металлыг C ангижруулж чадахгүй.', 'Carbon cannot reduce metals that are above it in the series.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi(
          'Хүдэр, шаар, зэв гэх үгсийг Дарханы төмөрлөгийн үйлдвэртэй холбоно. Зорилгод fist to five. Давталт: нүүрстөрөгч цуваанд хаана, хүчилтөрөгчөөр бууралт, электролизд металл аль электрод дээр, цайр ба төмөр.',
          'Link ore, slag and rust to the Darkhan steel plant. Fist to five on the objectives. Retrieval: where carbon is in the series, reduction in terms of oxygen, the electrode where metals form, zinc vs iron.'
        ),
        bi('Самбартаа бичээд 3-2-1-д өргөнө.', 'Write on show-me boards and reveal on 3-2-1.'),
        bi('Al ба Zn-ийн хооронд; хүчилтөрөгч алдах; катод; цайр.', 'Between Al and Zn; loss of oxygen; the cathode; zinc.')
      ],
      [
        bi('Гаргах арга ба тэсэлгээний зуух', 'Extraction methods and the blast furnace'),
        bi(
          'Цувааны байрлал → аргын хүснэгт. Зураг 16.5: түүхий эд, кокс шатаж CO₂ → CO, CO төмөр(III)-ын ислийг ангижруулж хайлмал төмөр доош унана, шаар төмрийн дээр хөвнө.',
          'Position in the series → method table. Figure 16.5: the raw materials; coke burns to CO₂ → CO; CO reduces iron(III) oxide to molten iron, which sinks; slag floats on the iron.'
        ),
        bi('Мөр бүрийн аргыг таамаглана; түүхий эд доош, хий дээш явах замыг агаарт зурна.', 'Predict the method for each row; trace the raw materials going down and the gases going up in the air.'),
        bi('Идэвхтэй металл – электролиз; дунд – нүүрстөрөгч; гол ангижруулагч CO (кокс биш).', 'Reactive metals – electrolysis; middle – carbon; the main reducing agent is CO (not coke).')
      ],
      [
        bi('(E) Тэгшитгэл, hinge, хөнгөнцагаан; судлах', '(E) Equations, hinge and aluminium; explore'),
        bi(
          '(E) C + O₂ → CO₂; C + CO₂ → 2CO; Fe₂O₃ + 3CO → 2Fe + 3CO₂; CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃. Hinge 1: гол ангижруулагч. (E) Хөнгөнцагааны эс (Зураг 16.8): криолит, электродын тэгшитгэл, анод солих. Судлах: Extraction Using Heat ба Extraction of Aluminium видео.',
          '(E) C + O₂ → CO₂; C + CO₂ → 2CO; Fe₂O₃ + 3CO → 2Fe + 3CO₂; CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃. Hinge 1: the main reducing agent. (E) The aluminium cell (Figure 16.8): cryolite, the electrode equations, replacing the anodes. Explore: the Extraction Using Heat and Extraction of Aluminium videos.'
        ),
        bi('Хосоороо нэг нь шат хэлж, нөгөө нь тэгшитгэл бичнэ; ABCD хуруугаар санал өгнө; анод яагаад солигддогийг ярилцана.', 'In pairs one names the stage and the other writes the equation; vote with ABCD fingers; discuss why the anodes are replaced.'),
        bi('Hinge: B (нүүрстөрөгчийн дутуу исэл); анод хүчилтөрөгчид шатаж CO₂ болно.', 'Hinge: B (carbon monoxide); the anodes burn in the oxygen to CO₂.')
      ],
      [
        bi('Хамтдаа: гаргах; зэврэлт', 'We do: extraction; rusting'),
        bi(
          'Яагаад төмрийг C-ээр гаргаж болох ч хөнгөнцагааныг болохгүй, шаар, шохойн чулуу, (E) криолит. Дараа нь зэврэлт (Зураг 16.10): зэв = талст устай төмөр(III)-ын исэл; 3 хуруу шил; давс зэврэлтийг хурдасгана; зэв хуулагдаж төмөр ил гарна.',
          'Why iron can be extracted with carbon but aluminium cannot, slag, limestone, (E) cryolite. Then rusting (Figure 16.10): rust = hydrated iron(III) oxide; the 3 tubes; salt speeds up rusting; rust flakes off and exposes more iron.'
        ),
        bi('Асуулт бүрт өөр сурагч хариулна (cold call); аль хуруу шил зэврэхийг таамаглана.', 'A different student answers each question (cold call); predict which tubes rust.'),
        bi('C төмрөөс идэвхтэй ч хөнгөнцагаанаас идэвх бага; шаар = CaSiO₃; криолит температур бууруулна; зөвхөн 1-р хоолой зэврэнэ.', 'C is more reactive than iron but less than aluminium; slag = CaSiO₃; cryolite lowers the temperature; only tube 1 rusts.')
      ]
    ]),
    [
      exitItem(
        bi('Тэсэлгээний зуухны гол ангижруулагч юу вэ?', 'What is the main reducing agent in the blast furnace?'),
        [bi('Кокс (нүүрстөрөгч)', 'Coke (carbon)'), bi('Нүүрстөрөгчийн дутуу исэл', 'Carbon monoxide'), bi('Шохойн чулуу', 'Limestone'), bi('Халуун агаар', 'Hot air')],
        1,
        bi('Fe₂O₃ + 3CO → 2Fe + 3CO₂; кокс CO-г үүсгэдэг.', 'Fe₂O₃ + 3CO → 2Fe + 3CO₂; coke makes the CO.')
      ),
      exitItem(
        bi('Хөнгөнцагааны гол хүдэр юу вэ?', 'What is the main ore of aluminium?'),
        [bi('Гематит', 'Hematite'), bi('Боксит', 'Bauxite'), bi('Криолит', 'Cryolite'), bi('Шохойн чулуу', 'Limestone')],
        1,
        bi('Боксит (голдуу Al₂O₃); гематит – төмрийн хүдэр.', 'Bauxite (mainly Al₂O₃); hematite is iron ore.')
      ),
      exitItem(
        bi('Яагаад төмрийг нүүрстөрөгчөөр гаргаж болох ч хөнгөнцагааныг болохгүй вэ?', 'Why can iron be extracted using carbon but aluminium cannot?'),
        [
          bi('Хөнгөнцагаан шингэн', 'Aluminium is a liquid'),
          bi('Нүүрстөрөгч төмрөөс идэвхтэй ч хөнгөнцагаанаас идэвх бага', 'Carbon is more reactive than iron but less reactive than aluminium'),
          bi('Хөнгөнцагаан ховор', 'Aluminium is rare'),
          bi('Төмөр соронзддог', 'Iron is magnetic')
        ],
        1,
        bi('C зөвхөн өөрөөсөө доорх металлын ислийг ангижруулна.', 'Carbon can only reduce the oxides of metals below it.')
      ),
      exitItem(
        bi('(E) Хөнгөнцагаан гаргахад криолитыг юунд хэрэглэдэг вэ?', '(E) Why is cryolite used in aluminium extraction?'),
        [
          bi('Катализатор', 'It is a catalyst'),
          bi('Ажлын температурыг бууруулж энерги хэмнэнэ', 'It lowers the operating temperature, saving energy'),
          bi('Анодыг хамгаална', 'It protects the anodes'),
          bi('Хөнгөнцагааныг ангижруулна', 'It reduces the aluminium')
        ],
        1,
        bi('Криолит – Al₂O₃-ийг уусгадаг уусгагч; катализатор биш.', 'Cryolite is a solvent for Al₂O₃; it is not a catalyst.')
      ),
      exitItem(
        bi('Шаарыг ямар нэгдэл үүсгэдэг вэ?', 'Which compound forms the slag?'),
        [bi('Кальцийн карбонат', 'Calcium carbonate'), bi('Кальцийн силикат', 'Calcium silicate'), bi('Төмөр(III)-ын исэл', 'Iron(III) oxide'), bi('Цахиурын давхар исэл', 'Silicon dioxide')],
        1,
        bi('(E) CaO + SiO₂ → CaSiO₃; төмрийн дээр хөвнө.', '(E) CaO + SiO₂ → CaSiO₃; it floats on the molten iron.')
      )
    ],
    ID
  ),
  lesson(
    5,
    bi('Зэврэлтээс хамгаалах ба шалгалт', 'Preventing rust and exam practice'),
    bi(
      'Зэврэлтийн нөхцөлийг хэлж, хаалт арга ба цайржуулалтыг тайлбарлах; (E) золиослох хамгаалалтыг идэвхийн цуваа ба электрон алдалтаар тайлбарлах; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх.',
      'State the conditions for rusting and describe barrier methods and galvanising; (E) explain sacrificial protection in terms of the reactivity series and electron loss; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('Хаалт арга (будах, тослох, хуванцар бүрээс) ус ба хүчилтөрөгчийг төмөрт хүргэхгүй; маажигдвал доорх төмөр зэвэрнэ.', 'Barrier methods (paint, grease/oil, plastic coating) keep water and oxygen away from the iron; if scratched, the iron underneath rusts.'),
      bi('Цайржуулалт = төмрийг цайраар бүрэх (дээврийн хуудас, хувин).', 'Galvanising = coating iron with zinc (roofing sheets, buckets).'),
      bi('(E) Золиослох хамгаалалт: цайр (эсвэл магни) төмрөөс идэвхтэй тул электроноо амархан алдана (Zn → Zn²⁺ + 2e⁻) – төмрийн оронд зэвэрнэ; маажигдсан ч хамгаална.', '(E) Sacrificial protection: zinc (or magnesium) is more reactive than iron, so it loses electrons more easily (Zn → Zn²⁺ + 2e⁻) and corrodes instead of the iron – even when scratched.')
    ],
    lessonSteps([
      [
        bi('Зэврэлтээс хамгаалах: хаалт арга', 'Preventing rust: barrier methods'),
        bi('Живсэн хөлөг (Зураг 16.9); будах (машин, гүүр), тослох (дугуйны гинж, машин механизм), хуванцар бүрээс (цэцэрлэгийн тавилга); маажигдвал зэвэрнэ; цайржуулалт.', 'The rusted shipwreck (Figure 16.9); paint (cars, bridges), grease (bicycle chains, machinery), plastic (garden furniture, fridge shelves); a scratch lets rust start; galvanising.'),
        bi('Дугуйны гинж, гүүр, аяга тавагны тавиурт аль арга тохирохыг хосоороо шийднэ.', 'Decide in pairs which method suits a bicycle chain, a bridge and a dish rack.'),
        bi('Хөдөлгөөнт эд анги – тос (будаг хуулагдана).', 'Moving parts – oil (paint would flake off).')
      ],
      [
        bi('(E) Золиослох хамгаалалт; hinge 2–3', '(E) Sacrificial protection; hinges 2–3'),
        bi('(E) Zn → Zn²⁺ + 2e⁻: цайр төмрийн оронд "золиослогдоно"; хөлөг онгоцны их бие, газар доорх хоолойд цайр/магнийн блок. Hinge 2: аль хоолойд хадаас зэврэх; hinge 3: цайржуулсан хувин маажигдсан ч зэвэрдэггүй.', '(E) Zn → Zn²⁺ + 2e⁻: zinc is "sacrificed" instead of iron; zinc or magnesium blocks on ship hulls and underground pipes. Hinge 2: in which tube does a nail rust; hinge 3: why a scratched galvanised bucket still does not rust.'),
        bi('Гинжийг (идэвхтэй → электрон алдах → төмрийн оронд исэлдэх) үргэлжлүүлнэ; ABCD карт ба хуруугаар санал өгнө.', 'Continue the chain (more reactive → loses electrons → oxidised instead of iron); vote with ABCD cards and fingers.'),
        bi('Hinge 2: C (агаарт ил ус); hinge 3: B.', 'Hinge 2: C (water open to the air); hinge 3: B.')
      ],
      [
        bi('Бие даан: зэврэлт', 'You do: corrosion'),
        bi('Зэврэлтэд хэрэгтэй хоёр бодис, дугуйны гинжийг яагаад тосолдог, цайржуулах металл, (E) магнийн блок хөлгийн их биеийг яагаад хамгаалдаг.', 'The two substances needed for rusting, why a bicycle chain is oiled, the metal used to galvanise, (E) why magnesium blocks protect a ship’s hull.'),
        bi('3 минут чимээгүй бичээд өөр өнгөөр засна.', 'Write in silence for 3 minutes, then mark in a different colour.'),
        bi('Ус ба хүчилтөрөгч; будаг хуулагдана, тос ус ба агаарыг хаана; цайр; Mg идэвхтэй – электрон алдаж зэвэрнэ.', 'Water and oxygen; paint would crack, oil keeps out water and air; zinc; Mg is more reactive – it loses electrons and corrodes instead.')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi(
          '(a)–(d): тэсэлгээний зуухны гурван хатуу түүхий эд, (E) Fe₂O₃ + 3CO, (E) катодын хагас тэгшитгэл, нэг хаалт арга. 4 шалгалтын зөвлөмж. Үнэлэх: гүүрийг будах уу, цайржуулах уу (0620/42/O/N/23 Q3(f)). Алдаа засах: "хөнгөнцагаан шингэн учир".',
          '(a)–(d): the three solid raw materials of the blast furnace, (E) Fe₂O₃ + 3CO, (E) the cathode half-equation, one barrier method. The 4 exam tips. Evaluate: painting or galvanising a bridge (0620/42/O/N/23 Q3(f)). Error clinic: "because aluminium is a liquid".'
        ),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes, swap and tick each marking point; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('Гематит, кокс, шохойн чулуу; Al³⁺ + 3e⁻ → Al; цайржуулалт урт хугацаанд илүү; хөнгөнцагаан нүүрстөрөгчөөс идэвхтэй.', 'Hematite, coke, limestone; Al³⁺ + 3e⁻ → Al; galvanising lasts longer; aluminium is more reactive than carbon.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: хөнгөнцагааны хүдэр, шаар, ган хаалгыг зэврэлтээс хамгаалах, (E) анодын тэгшитгэл. Зорилгод дахин fist to five.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: the ore of aluminium, slag, stopping a steel gate rusting, (E) the anode equation. Fist to five on the objectives again.'),
        bi('Гарах билетийг 4 минутад ганцаараа чимээгүй бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone and in silence in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('Боксит; кальцийн силикат; будах/цайржуулах; 2O²⁻ → O₂ + 4e⁻.', 'Bauxite; calcium silicate; paint or galvanise it; 2O²⁻ → O₂ + 4e⁻.')
      ]
    ]),
    [
      exitItem(
        bi('Аль хуруу шилэнд төмөр хадаас зэврэх вэ?', 'In which tube does an iron nail rust?'),
        [
          bi('Кальцийн хлоридтой хуурай агаар', 'Dry air with calcium chloride'),
          bi('Тосоор бүрсэн буцалгасан ус', 'Boiled water covered with oil'),
          bi('Агаарт ил ус', 'Water open to the air'),
          bi('Усгүй цэвэр хүчилтөрөгч', 'Pure oxygen with no water')
        ],
        2,
        bi('Ус ба хүчилтөрөгч хоёулаа байна.', 'Both water and oxygen are present.')
      ),
      exitItem(
        bi('(E) Цайржуулсан хувин цайр нь маажигдсан ч яагаад зэвэрдэггүй вэ?', '(E) Why does a galvanised bucket not rust even when the zinc coating is scratched?'),
        [
          bi('Цайр төмрөөс идэвх бага', 'Zinc is less reactive than iron'),
          bi('Цайр төмрөөс амархан электрон алдаж оронд нь зэвэрнэ', 'Zinc loses electrons more readily than iron and corrodes instead'),
          bi('Цайр бүх усыг төмөрт хүргэхгүй', 'Zinc stops all water reaching the iron'),
          bi('Цайр зэвтэй урвална', 'Zinc reacts with the rust')
        ],
        1,
        bi('Золиослох хамгаалалт: цайр идэвхтэй тул төмрийн оронд исэлдэнэ.', 'Sacrificial protection: zinc is more reactive, so it is oxidised in preference to iron.')
      ),
      exitItem(
        bi('Дугуйны гинжийг яагаад будахгүй тослодог вэ?', 'Why is a bicycle chain oiled rather than painted?'),
        [
          bi('Тос хямд', 'Oil is cheaper'),
          bi('Гинж хөдлөхөд будаг хагарч хуулагдана; тос ус ба агаарыг хаана', 'Paint would crack or flake off as the chain moves; oil keeps out water and air'),
          bi('Тос катализатор', 'Oil is a catalyst'),
          bi('Будаг цахилгаан дамжуулна', 'Paint conducts electricity')
        ],
        1,
        bi('Хаалт арга – ус ба хүчилтөрөгчийг хаана.', 'A barrier method – it keeps out water and oxygen.')
      ),
      exitItem(
        bi('(E) Хөнгөнцагаан гаргахад анодын тэгшитгэл аль нь вэ?', '(E) What is the anode equation in aluminium extraction?'),
        [
          bi('Al³⁺ + 3e⁻ → Al', 'Al³⁺ + 3e⁻ → Al'),
          bi('2O²⁻ → O₂ + 4e⁻', '2O²⁻ → O₂ + 4e⁻'),
          bi('O₂ + 4e⁻ → 2O²⁻', 'O₂ + 4e⁻ → 2O²⁻'),
          bi('Al → Al³⁺ + 3e⁻', 'Al → Al³⁺ + 3e⁻')
        ],
        1,
        bi('Анод дээр электрон алдагдана (баруун талд).', 'Electrons are lost at the anode (on the right).')
      )
    ],
    ID
  )
];

export const IG9_GLOSSARY_C: Record<string, GlossaryTerm[]> = {
  'ig9-4': [
    term(bi('хүдэр', 'ore'), bi('Гаргах ашигтай хэмжээний металлын нэгдэл агуулсан чулуулаг.', 'A rock containing enough of a metal compound to make extraction worthwhile.')),
    term(bi('гематит / боксит', 'hematite / bauxite'), bi('Төмрийн хүдэр (голдуу Fe₂O₃) / хөнгөнцагааны хүдэр (голдуу Al₂O₃).', 'Iron ore (mainly Fe₂O₃) / aluminium ore (mainly Al₂O₃).')),
    term(bi('шаар', 'slag'), bi('Тэсэлгээний зууханд хольцоос үүсэх кальцийн силикат.', 'Calcium silicate, formed from impurities in the blast furnace.')),
    term(bi('криолит (E)', 'cryolite (E)'), bi('Натрийн хөнгөнцагааны фторид – Al₂O₃-ийн электролизийн температурыг бууруулна.', 'Sodium aluminium fluoride – lowers the operating temperature for the electrolysis of Al₂O₃.'))
  ],
  'ig9-5': [
    term(bi('зэврэлт', 'rusting'), bi('Төмөр ба ган талст устай төмөр(III)-ын исэл болох зэврэлт; ус ба хүчилтөрөгч хэрэгтэй.', 'Corrosion of iron and steel to hydrated iron(III) oxide; needs water and oxygen.')),
    term(bi('золиослох хамгаалалт (E)', 'sacrificial protection (E)'), bi('Идэвхтэй металл төмрийн оронд зэвэрнэ.', 'A more reactive metal corrodes in preference to iron.'))
  ]
};

export const IG9_PRACTICE_C: Record<string, PracticeItem[]> = {
  'ig9-4': [
    easy(
      bi('Шохойн чулууг тэсэлгээний зууханд юунд нэмдэг вэ?', 'Why is limestone added to the blast furnace?'),
      [bi('Төмрийн ислийг ангижруулах', 'To reduce the iron oxide'), bi('Хольцыг (цахиурын исэл) шаар болгон зайлуулах', 'To remove impurities (silica) as slag'), bi('Дулаан өгөх', 'To provide heat'), bi('Катализатор болох', 'To act as a catalyst')],
      1,
      bi('Шохойн чулуу CaO болж SiO₂-той урвалдаж CaSiO₃ (шаар) үүсгэнэ.', 'Limestone gives CaO, which reacts with SiO₂ to form CaSiO₃ (slag).')
    ),
    easy(
      bi('Цайрыг хэрхэн гаргах вэ?', 'How is zinc extracted?'),
      [bi('Хайлмал нэгдлийн электролиз', 'Electrolysis of the molten compound'), bi('Ислийг нүүрстөрөгч (эсвэл CO)-оор ангижруулах', 'Reduction of the oxide by carbon (or CO)'), bi('Цэвэр байдлаар олддог', 'It is found as the metal'), bi('Усаар уусгах', 'Dissolving in water')],
      1,
      bi('Цайр нүүрстөрөгчөөс доор байдаг.', 'Zinc is below carbon in the series.')
    ),
    hard(
      bi('(E) Тэсэлгээний зуухны таван тэгшитгэлийг шат бүрээр нь бич.', '(E) Write the five blast furnace equations, stage by stage.'),
      bi('Кокс шатах: C + O₂ → CO₂; CO үүсэх: C + CO₂ → 2CO; ангижрах: Fe₂O₃ + 3CO → 2Fe + 3CO₂; шохойн чулуу задрах: CaCO₃ → CaO + CO₂; шаар: CaO + SiO₂ → CaSiO₃.', 'Coke burns: C + O₂ → CO₂; CO forms: C + CO₂ → 2CO; reduction: Fe₂O₃ + 3CO → 2Fe + 3CO₂; limestone decomposes: CaCO₃ → CaO + CO₂; slag: CaO + SiO₂ → CaSiO₃.'),
      bi('Fe₂O₃ + CO-г тэнцүүлэхдээ 3CO-г бүү март.', 'Do not forget the 3CO when balancing Fe₂O₃ + CO.')
    )
  ],
  'ig9-5': [
    easy(
      bi('Будах нь ямар төрлийн хамгаалалт вэ?', 'What type of protection is painting?'),
      [bi('Хаалт арга', 'A barrier method'), bi('Золиослох хамгаалалт', 'Sacrificial protection'), bi('Электролиз', 'Electrolysis'), bi('Шахан гаргалт', 'Displacement')],
      0,
      bi('Будаг ус ба хүчилтөрөгчийг хаана.', 'Paint keeps out water and oxygen.')
    ),
    easy(
      bi('Гангийг цайржуулахад ямар металл хэрэглэдэг вэ?', 'Which metal is used to galvanise steel?'),
      [bi('Зэс', 'Copper'), bi('Цайр', 'Zinc'), bi('Цагаан тугалга', 'Tin'), bi('Хар тугалга', 'Lead')],
      1,
      bi('Цайр – дээврийн хуудас, хувин.', 'Zinc – roofing sheets, buckets.')
    ),
    hard(
      bi('(E) Гүүрийг будах ба цайржуулахыг харьцуулж үнэл.', '(E) Evaluate painting and galvanising for a steel bridge.'),
      bi('Будах хямд ч маажигдвал төмөр зэвэрнэ. Цайржуулахад цайр идэвхтэй тул маажигдсан ч төмрийн оронд зэвэрнэ. Цайржуулалт үнэтэй ч удаан тэсдэг – гүүрт илүү тохиромжтой.', 'Painting is cheap, but if it is scratched the iron rusts. With galvanising, zinc is more reactive, so it corrodes instead of the iron even when scratched. Galvanising costs more but lasts longer – better for a bridge.'),
      bi('Үнэлгээнд давуу ба сул талыг хоёуланг нь, дүгнэлтийг бич.', 'Give both advantages and disadvantages, then a conclusion.')
    )
  ]
};
