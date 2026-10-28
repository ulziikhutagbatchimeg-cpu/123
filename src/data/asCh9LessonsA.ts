// AS 9701 chapter 9 (periodicity), lessons 1–2. They follow the deck 10_Ch10_Periodicity.pptx and its plan of three
// 60-minute lessons: the physical trends of Period 3 (slides 1–13) and the chemistry of the elements, their oxides and
// chlorides with oxygen, chlorine and water (slides 14–30). Every value, equation and answer here comes from that deck,
// except the Pauling and IE values the interactive card shows, which are the deck's own.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'as9';

export const AS9_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Period 3: радиус, хайлах цэг ба ионжих энерги', 'Period 3: radius, melting point and ionisation energy'),
    bi(
      'Period 3-ын радиус, хайлах цэг, дамжуулалт ба IE₁-ийн хандлагыг бүтэц, холбоо ба цөмийн цэнэгээр тайлбарлах (хөтөлбөр 9.1; слайд 1–13).',
      'Explain the Period 3 trends in radius, melting point, conductivity and IE₁ using structure, bonding and nuclear charge (syllabus 9.1; slides 1–13).'
    ),
    [
      bi('Үеэр радиус багасна: цөмийн цэнэг нэмэгдэж, электрон ижил бүрхүүлд нэмэгдэж, хаалт бараг тогтмол. Na 0.157 → Cl 0.099 nm.', 'Across the period the radius decreases: the nuclear charge rises, electrons join the same shell and shielding is about constant. Na 0.157 → Cl 0.099 nm.'),
      bi('Ионы радиус: катион жижгэрнэ (Na⁺ → Si⁴⁺); анион том (P³⁻ → Cl⁻), Na⁺ → P³⁻-д огцом үсрэлт (нэмэлт бүрхүүл).', 'Ionic radius: cations shrink (Na⁺ → Si⁴⁺); anions are much larger (P³⁻ → Cl⁻), with a sharp jump from Na⁺ to P³⁻ because of the extra shell.'),
      bi('Хайлах цэг: Na → Al өснө (делокалчлагдсан электрон ба ионы цэнэг); Si хамгийн өндөр (аварга ковалент); P₄, S₈, Cl₂ бага (молекул хоорондын сул id–id).', 'Melting point: Na → Al rises (delocalised electrons and ion charge); Si is the highest (giant covalent); P₄, S₈ and Cl₂ are low (weak id–id forces between molecules).'),
      bi('Дамжуулалт: Na → Al өснө; Si хагас дамжуулагч; бусад үгүй.', 'Conductivity: Na → Al increases; Si is a semiconductor; the others do not conduct.'),
      bi('IE₁ ерөнхийдөө өснө; Mg → Al ба P → S-д уналт (3p электрон, хосолсон электроны түлхэлт).', 'IE₁ generally rises; there are dips at Mg → Al and P → S (the 3p electron and the repulsion of a paired electron).')
    ],
    lessonSteps(
      [
        [
          bi('Нээлт, түлхүүр үг, сэргээн санах', 'Opening, key words and retrieval'),
          bi('"Яагаад шинж чанар үе бүрт давтагддаг вэ?" гэж асууна. Түлхүүр үг: periodicity, atomic radius, electronegativity, metalloid. Сэргээн санах: ионы ба аварга ковалент бүтэц, радиусын хандлага, исэлдэлтийн зэрэг.', 'Ask "why do the properties repeat in each period?". Key words: periodicity, atomic radius, electronegativity, metalloid. Retrieval: giant ionic and giant covalent structures, the radius trend, oxidation numbers.'),
          bi('Quiz–quiz–trade-аар түлхүүр үгийг хосоороо асууна.', 'Test each other on the key words with quiz–quiz–trade.'),
          bi('Мини самбарт бүтэц ба холбоог зөв нэрлэсэн эсэх.', 'Mini-whiteboards: structure and bonding named correctly.')
        ],
        [
          bi('Атомын ба ионы радиус (Period 3)', 'Atomic and ionic radius across Period 3'),
          bi('I do: Na 0.157 → Cl 0.099 nm; цөмийн цэнэг, ижил бүрхүүл, хаалт. Ионы радиус: Na⁺ → Si⁴⁺, P³⁻ → Cl⁻. Интерактив картыг үзүүлж, радиусын шинжийг эхэлж сонгоно.', 'I do: Na 0.157 → Cl 0.099 nm; nuclear charge, same shell, shielding. Ionic radius: Na⁺ → Si⁴⁺, P³⁻ → Cl⁻. Show the interactive card and select the radius trend first.'),
          bi('График агаарт зурна; "Na, Mg, Al … Cl" гэж гараараа жижгэрүүлнэ.', 'Air-draw the graph; shrink your hands as you say Na, Mg, Al … Cl.'),
          bi('Радиус багасна гэж цөмийн цэнэгээр зөв тайлбарласан эсэх.', 'The radius decrease explained correctly by nuclear charge.')
        ],
        [
          bi('Хайлах цэг, дамжуулалт ба бүтэц', 'Melting point, conductivity and structure'),
          bi('We do: Na, Mg, Al (металл), Si (аварга ковалент), P₄, S₈, Cl₂ (энгийн молекул), Ar (атом). Мөр бүрийн өмнө бүтцийг хэлнэ. Na → Al: делокалчлагдсан электрон ба ионы цэнэг; Si: олон хүчтэй ковалент холбоо.', 'We do: Na, Mg, Al (metallic), Si (giant covalent), P₄, S₈, Cl₂ (simple molecular), Ar (atoms). Name the structure before each row. Na → Al: delocalised electrons and ion charge; Si: many strong covalent bonds.'),
          bi('Таамаглаад, дараа нь "аль хүч эвдэгдэх вэ?" гэж хэлнэ.', 'Predict first, then say "which force is overcome?".'),
          bi('Тайлбар молекул хоорондын хүчийг нэрлэсэн эсэх (ковалент холбоо биш).', 'The explanation names the intermolecular force, not the covalent bond.')
        ],
        [
          bi('Нэгдүгээр ионжих энерги', 'First ionisation energy'),
          bi('I do: IE₁ Na 494 → Ar 1520 kJ mol⁻¹, ерөнхийдөө өснө. Mg → Al ба P → S-ийн уналтыг 3p электронээр тайлбарлана: 3s-ээр хаагдсан; хосолсон электроны түлхэлт. You do: IE₁-ийн график.', 'I do: IE₁ Na 494 → Ar 1520 kJ mol⁻¹, generally rising. Explain the Mg → Al and P → S dips with the 3p electron: shielded by 3s, and repulsion of a paired electron. You do: the IE₁ graph.'),
          bi('Графикийн хэлбэрийг агаарт зурж, дараа нь дарна.', 'Air-draw the shape of the graph, then click.'),
          bi('Уналтыг 3p электрон ба хаалт / хосолсон түлхэлтээр тайлбарласан эсэх.', 'The dips explained by the 3p electron and shielding or paired repulsion.')
        ],
        [
          bi('Интерактив шинжилгээ ба гарах билет', 'Property explorer and exit ticket'),
          bi('Period 3-ын шинж бүрийн графикийг харуулна. "Аль нь үечилсэн вэ?" гэж асууна. Гарах билетийн оноо хадгалагдана.', 'Show the Period 3 property graphs. Ask "which of these are periodic?". The exit ticket score is kept.'),
          bi('Шинж бүрийн график хэлбэрийг агаарт зурж, дарна.', 'Air-draw each graph shape, then click.'),
          bi('Гарах билетийн оноо (60%-иас дээш бол дараагийн хичээл нээгдэнэ).', 'Exit ticket score (above 60 % opens the next lesson).')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Period 3-ын радиус үеэр хэрхэн өөрчлөгдөх вэ?', 'How does the atomic radius change across Period 3?'),
        [bi('Нэмэгдэнэ', 'It increases'), bi('Буурна', 'It decreases'), bi('Тогтмол', 'It stays the same'), bi('Эхлээд нэмэгдээд буурна', 'It first increases, then decreases')],
        1,
        bi('Цөмийн цэнэг нэмэгдэж, электрон ижил бүрхүүлд нэмэгдэнэ.', 'The nuclear charge rises and the electrons join the same shell.')
      ),
      exitItem(
        bi('Period 3-ын элементүүдээс аль нь хамгийн өндөр IE₁-тэй вэ?', 'Which Period 3 element has the highest first ionisation energy?'),
        [bi('Na', 'Na'), bi('Al', 'Al'), bi('P', 'P'), bi('Ar', 'Ar')],
        3,
        bi('Ar 1520 kJ mol⁻¹ — хамгийн өндөр.', 'Ar 1520 kJ mol⁻¹ — the highest.')
      ),
      exitItem(
        bi('Яагаад Al-ийн IE₁ нь Mg-ээс бага вэ?', 'Why is the IE₁ of Al lower than that of Mg?'),
        [
          bi('Al-ийн гаднах электрон 3p-д байж, 3s-ээр хаагдсан тул илүү хялбар алдагдана', 'Al’s outer electron is in 3p, higher in energy and shielded by 3s, so it is lost more easily'),
          bi('Al-д протон цөөн', 'Al has fewer protons'),
          bi('Al нь металл биш', 'Al is not a metal'),
          bi('Al-ийн радиус Mg-ээс бага', 'Al has a smaller radius than Mg')
        ],
        0,
        bi('3p электрон өндөр энергитэй, 3s-ээр хаагдсан.', 'The 3p electron has higher energy and is shielded by 3s.')
      ),
      exitItem(
        bi('Mg нь Na-аас илүү сайн дамжуулагч яагаад вэ?', 'Why is Mg a better conductor than Na?'),
        [
          bi('Mg нь атом бүрт 2 делокалчлагдсан электрон өгдөг', 'Mg gives 2 delocalised electrons per atom'),
          bi('Mg нь хөнгөн', 'Mg is lighter'),
          bi('Mg нь ковалент', 'Mg is covalent'),
          bi('Mg-ийн хайлах цэг бага', 'Mg has a lower melting point')
        ],
        0,
        bi('Na 1, Mg 2 делокалчлагдсан электрон.', 'Na gives 1, Mg gives 2 delocalised electrons.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Оксид, хлорид ба элементийн урвал', 'Oxides, chlorides and the reactions of the elements'),
    bi(
      'Period 3-ын элементийн хүчилтөрөгч, хлор, устай урвалыг бичих; исэлдэлтийн зэрэг, оксидын шинж (үндсэн, амфотер, хүчлийн) ба хлоридын гидролизийг тайлбарлах (хөтөлбөр 9.2; слайд 14–30).',
      'Write equations for the reactions of Period 3 elements with oxygen, chlorine and water; explain oxidation numbers, the acid–base nature of oxides and the hydrolysis of chlorides (syllabus 9.2; slides 14–30).'
    ),
    [
      bi('Хүчилтөрөгчтэй урвал: Na шар гал → Na₂O; Mg, Al; Si удаан; P → P₄O₁₀; S → SO₂. Cl ба Ar хүчилтөрөгчтэй урвалд ордоггүй.', 'Reaction with oxygen: Na gives a yellow flame → Na₂O; Mg and Al burn vigorously; Si is slow; P → P₄O₁₀; S → SO₂. Cl and Ar do not react with oxygen.'),
      bi('Хлортой урвал: Na, Mg → ионы хлорид; Al₂Cl₆ (ковалент димер); Si → SiCl₄; P → PCl₅ (илүүдэл Cl₂).', 'Reaction with chlorine: Na and Mg give ionic chlorides; Al gives the covalent dimer Al₂Cl₆; Si gives SiCl₄; P gives PCl₅ with excess chlorine.'),
      bi('Устай урвал: Na → NaOH (pH ≈ 14); Mg хүйтэн усанд маш удаан (pH ≈ 11); Mg + уур → MgO + H₂.', 'Reaction with water: Na → NaOH (pH ≈ 14); Mg in cold water is very slow (pH ≈ 11); Mg + steam → MgO + H₂.'),
      bi('Хамгийн их исэлдэлтийн зэрэг = гаднах электроны тоо (Na +1 … P +5, S +6); O ба Cl-д сөрөг.', 'The maximum oxidation number is the number of outer electrons (Na +1 … P +5, S +6); for O and Cl it is negative.'),
      bi('Оксид: Na₂O, MgO үндсэн; Al₂O₃ амфотер; SiO₂, P₄O₁₀, SO₂, SO₃ хүчлийн; SiO₂ зөвхөн шүлттэй урвалдана. Хлорид: NaCl уусна (pH 7); AlCl₃ ≈ 3; SiCl₄, PCl₅ гидролиз → HCl утаа, pH ≈ 2.', 'Oxides: Na₂O and MgO basic; Al₂O₃ amphoteric; SiO₂, P₄O₁₀, SO₂ and SO₃ acidic; SiO₂ reacts only with alkali. Chlorides: NaCl dissolves (pH 7); AlCl₃ ≈ 3; SiCl₄ and PCl₅ hydrolyse to HCl fumes, pH ≈ 2.')
    ],
    lessonSteps(
      [
        [
          bi('Хүчилтөрөгч, хлор ба ус', 'Reactions with oxygen, chlorine and water'),
          bi('I do: Na, Mg, Al, Si, P, S-ийн хүчилтөрөгчтэй тэгшитгэл; Na, Mg-ийн хлорид; Na ба Mg-ийн устай урвал (pH 14, 11). You do: Li, Ca, Mg — шалгалтын нөхцөлд.', 'I do: the oxygen equations for Na, Mg, Al, Si, P and S; the chlorides of Na and Mg; Na and Mg with water (pH 14, 11). You do: Li, Ca and Mg — under exam conditions.'),
          bi('Тэгшитгэлээ хэлээд, дараа нь дарна (equation race).', 'Say the balanced equation, then click (equation race).'),
          bi('Тэнцвэртэй тэгшитгэл, төлвийн тэмдэг зөв (Mg + уур → MgO).', 'Balanced equations with state symbols correct (Mg + steam → MgO).')
        ],
        [
          bi('Исэлдэлтийн зэрэг ба оксид + ус', 'Oxidation numbers and oxides with water'),
          bi('I do: хамгийн их исэлдэлтийн зэрэг = гаднах электрон (Na +1 … P +5, S +6). Оксидын pH: Na₂O 13–14, MgO ≈ 9–10, P₄O₁₀ ≈ 2, SO₂ ≈ 2, SO₃ ≈ 1; Al₂O₃ ба SiO₂ → pH 7.', 'I do: maximum oxidation number = outer electrons (Na +1 … P +5, S +6). Oxide pH: Na₂O 13–14, MgO ≈ 9–10, P₄O₁₀ ≈ 2, SO₂ ≈ 2, SO₃ ≈ 1; Al₂O₃ and SiO₂ give pH 7.'),
          bi('Гаднах электроноо хуруугаараа тоолж таамаглана.', 'Count the outer electrons on your fingers, then predict.'),
          bi('Исэлдэлтийн зэрэг ба pH-ийн таамаглал зөв.', 'Oxidation numbers and predicted pH correct.')
        ],
        [
          bi('Виртуал лаб ба амфотер шинж', 'Virtual lab and amphoteric behaviour'),
          bi('Оксид бүрийг усанд хийж өнгийг таамаглуулна. Worked example: Al₂O₃ ба Al(OH)₃ хүчил ба шүлттэй урвалд орно (NaAl(OH)₄); SiO₂ зөвхөн шүлттэй. You do: MgO-г хүчилтэй, Na₂O-г HCl-тай, SO₂ ба SO₃-ыг NaOH-тай.', 'Predict the colour for each oxide in water. Worked example: Al₂O₃ and Al(OH)₃ react with acids and alkalis (NaAl(OH)₄); SiO₂ reacts only with alkali. You do: MgO with acid, Na₂O with HCl, SO₂ and SO₃ with NaOH.'),
          bi('Тэгшитгэл бүрт: оксид хүчил үү, суурь уу гэж асууна.', 'For each equation ask: is the oxide acting as an acid or a base?'),
          bi('Амфотер оксидын хоёр урвалыг бичсэн эсэх.', 'Both equations for an amphoteric oxide written.')
        ],
        [
          bi('Оксид ба хлоридын холбоо, гидролиз', 'Bonding in oxides and hydrolysis of chlorides'),
          bi('I do: MgO, Na₂O ионы; Al₂O₃ ионы–ковалент (амфотер); SiO₂, P₄O₁₀, SO₂ ковалент (хүчлийн). Хлорид: NaCl pH 7; AlCl₃ ≈ 3; SiCl₄, PCl₅ гидролиз → HCl утаа, pH ≈ 2. You do: GeO₂, K₂O, PCl₃.', 'I do: MgO and Na₂O are ionic; Al₂O₃ is ionic–covalent (amphoteric); SiO₂, P₄O₁₀ and SO₂ are covalent (acidic). Chlorides: NaCl pH 7; AlCl₃ ≈ 3; SiCl₄ and PCl₅ hydrolyse to HCl fumes, pH ≈ 2. You do: GeO₂, K₂O, PCl₃.'),
          bi('"Гидрат" (уусах) ба "гидролиз" (устай урвал)-ыг ялгана.', 'Tell "hydration" (dissolving) and "hydrolysis" (reacting with water) apart.'),
          bi('Гидролиз ба уусалтыг зөв ялгасан эсэх.', 'Hydrolysis and dissolving told apart correctly.')
        ],
        [
          bi('Элемент таних (worked example)', 'Identifying an element (worked example)'),
          bi('Worked example: G-ийн хлорид pH 1 өгнө; оксид NaOH-д урвахгүй; хайлах цэг 1610 °C → аварга ковалент, 14-р бүлэг. Se-ийг S-тэй харьцуулан таамаглана. Гарах билет.', 'Worked example: G’s chloride gives pH 1; its oxide does not react with NaOH; m.p. 1610 °C → giant covalent, Group 14. Predict Se by comparing with S. Exit ticket.'),
          bi('Зөвлөгөө бүр юуг хасдагийг хэлнэ ("clue by clue").', 'Say what each clue rules out ("clue by clue").'),
          bi('Гарах билетийн оноо.', 'Exit ticket score.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Аль оксид хүчил ба суурь хоёуланд урвадаг вэ?', 'Which oxide reacts with both acids and alkalis?'),
        [bi('Na₂O', 'Na₂O'), bi('Al₂O₃', 'Al₂O₃'), bi('SO₂', 'SO₂'), bi('P₄O₁₀', 'P₄O₁₀')],
        1,
        bi('Al₂O₃ — амфотер.', 'Al₂O₃ — amphoteric.')
      ),
      exitItem(
        bi('Na₂O-г усанд хийхэд pH ойролцоогоор хэд вэ?', 'What is the approximate pH of Na₂O in water?'),
        [bi('2–3', '2–3'), bi('7', '7'), bi('9–10', '9–10'), bi('13–14', '13–14')],
        3,
        bi('Na₂O + H₂O → 2NaOH — хүчтэй шүлтлэг.', 'Na₂O + H₂O → 2NaOH — strongly alkaline.')
      ),
      exitItem(
        bi('Аль хлорид усанд орохдоо цагаан утаа гаргадаг вэ?', 'Which chloride gives white fumes with water?'),
        [bi('NaCl', 'NaCl'), bi('MgCl₂', 'MgCl₂'), bi('SiCl₄', 'SiCl₄'), bi('AlCl₃', 'AlCl₃')],
        2,
        bi('SiCl₄ гидролиз → HCl утаа.', 'SiCl₄ hydrolyses to give HCl fumes.')
      ),
      exitItem(
        bi('Аль тэгшитгэл Al₂O₃-ийг суурь шиг үзүүлэх вэ?', 'Which equation shows Al₂O₃ acting as a base?'),
        [
          bi('Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O', 'Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O'),
          bi('Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄', 'Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄'),
          bi('SiO₂ + 2NaOH → Na₂SiO₃ + H₂O', 'SiO₂ + 2NaOH → Na₂SiO₃ + H₂O'),
          bi('P₄O₁₀ + 12NaOH → 4Na₃PO₄ + 6H₂O', 'P₄O₁₀ + 12NaOH → 4Na₃PO₄ + 6H₂O')
        ],
        0,
        bi('Хүчилд Al₂O₃ суурь шиг (давс + ус) урвалдана.', 'With acid, Al₂O₃ acts as a base, giving a salt and water.')
      )
    ],
    ID
  )
];

export const AS9_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'as9-1': [
    term(bi('Үечлэл', 'Periodicity'), bi('Атомын дугаараар тогтмол давтагдах шинж чанарын хэв маяг', 'A repeating pattern of properties across each period, with atomic number')),
    term(bi('Атомын (ковалент) радиус', 'Atomic (covalent) radius'), bi('Хоёр адилхан холбогдсон атомын цөм хоорондын зайн хагас', 'Half the distance between the nuclei of two bonded atoms')),
    term(bi('Цахилгаан сөрөг чанар', 'Electronegativity'), bi('Ковалент холбоонд холбоох хосыг өөрөө рүүгээ татах чадвар', 'The power of an atom to attract the bonding electrons in a covalent bond')),
    term(bi('Металлоид', 'Metalloid'), bi('Металл ба металл бусын шинжийн хооронд байх элемент (Si)', 'An element with properties between those of metals and non-metals (Si)'))
  ],
  'as9-2': [
    term(bi('Үндсэн оксид', 'Basic oxide'), bi('Хүчилтэй урвалдаж, шүлтлэг уусмал өгөх оксид (Na₂O, MgO)', 'An oxide that reacts with acids and gives an alkaline solution (Na₂O, MgO)')),
    term(bi('Хүчлийн оксид', 'Acidic oxide'), bi('Суурьтай урвалдаж, хүчиллэг уусмал өгөх оксид (SO₂, P₄O₁₀)', 'An oxide that reacts with bases and gives an acidic solution (SO₂, P₄O₁₀)')),
    term(bi('Амфотер', 'Amphoteric'), bi('Хүчил ба суурь хоёуланд урвалддаг (Al₂O₃, Al(OH)₃)', 'Reacts with both acids and bases (Al₂O₃, Al(OH)₃)')),
    term(bi('Гидролиз', 'Hydrolysis'), bi('Нэгдэл усаар задарч, устай урвалд орох (SiCl₄, PCl₅)', 'A compound is broken down by reaction with water (SiCl₄, PCl₅)'))
  ]
};

export const AS9_PRACTICE_A: Record<string, PracticeItem[]> = {
  'as9-1': [
    easy(
      bi('Period 3-ын элементүүдээс аль нь хамгийн том атомын радиустай вэ?', 'Which Period 3 element has the largest atomic radius?'),
      [bi('Cl', 'Cl'), bi('Na', 'Na'), bi('Si', 'Si'), bi('Ar', 'Ar')],
      1,
      bi('Na-д цөмийн цэнэг хамгийн бага.', 'Na has the lowest nuclear charge.')
    ),
    hard(
      bi('Period 3-ын дагуу радиус яагаад багасдагийг тайлбарлана уу. (3 оноо)', 'Explain why the atomic radius decreases across Period 3. (3 marks)'),
      bi('Цөмийн цэнэг нэг бүрээр нэмэгдэнэ; электронууд ижил бүрхүүлд нэмэгдэнэ; хаалт бараг тогтмол тул гаднах электрон цөм рүү татагдана.', 'The nuclear charge increases by one at each element; the electrons are added to the same shell; shielding is about constant, so the outer electrons are pulled closer to the nucleus.'),
      bi('Гурван гол санаа: цөмийн цэнэг, ижил бүрхүүл, тогтмол хаалт.', 'Three ideas: nuclear charge, same shell, constant shielding.')
    )
  ],
  'as9-2': [
    easy(
      bi('Аль оксид усаар хамгийн бага pH өгөх вэ?', 'Which oxide gives the lowest pH with water?'),
      [bi('SO₃', 'SO₃'), bi('MgO', 'MgO'), bi('SiO₂', 'SiO₂'), bi('Al₂O₃', 'Al₂O₃')],
      0,
      bi('SO₃ + H₂O → H₂SO₄, pH ≈ 1.', 'SO₃ + H₂O → H₂SO₄, pH ≈ 1.')
    ),
    hard(
      bi('Al₂O₃ яагаад амфотер вэ? Хүчил ба суурьтай урвалын тэгшитгэл тус бүрийг бичнэ үү.', 'Why is Al₂O₃ amphoteric? Write one equation with an acid and one with an alkali.'),
      bi('Хүчилтэй: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O. Шүлттэй (халуун, өтгөн): Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄. Хүчил ба суурь хоёуланд урвалддаг тул амфотер.', 'With acid: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O. With hot concentrated alkali: Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄. It reacts with both acids and bases, so it is amphoteric.'),
      bi('Хоёр тэгшитгэл — хүчилтэй ба шүлттэй.', 'Two equations — one with acid and one with alkali.')
    )
  ]
};
