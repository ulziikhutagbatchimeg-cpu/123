// IGCSE 0620 chapter 8 (the Periodic Table), lessons 1–2. They follow the deck Ch13_The_Periodic_Table.pptx and its
// plan of two 40-minute lessons (slides 1–12 and 13 on), with the review slides 22–29.
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig8';

export const IG8_LESSONS: StatesLesson[] = [
  lesson(
    1,
    bi('Үелэх систем, I бүлэг ба галогенууд', 'The Periodic Table, Group I and the halogens'),
    bi(
      'Үелэх системийг (бүлэг, үе, протоны тоо, үеийн дагуу металлаас металл бус руу) тайлбарлах; бүлгийн дугаарыг ионы цэнэгтэй холбох; I бүлгийн (Li, Na, K) хандлагыг тайлбарлаж бусдынхыг таамаглах; VII бүлгийн (Cl, Br, I) төрх, хандлага, шахан гаргах урвал.',
      'Describe the Periodic Table (groups, periods, increasing proton number, metals → non-metals across a period); relate group number to ion charge; describe trends in Group I (Li, Na, K) and predict other alkali metals; Group VII (Cl, Br, I): appearance, trends and displacement.'
    ),
    [
      bi('Элементүүд протоны тоо өсөх дарааллаар; бүлэг = гаднах электрон ижил → ижил химийн шинж; үе = эзэлсэн давхарга ижил. Бүлэг → ионы цэнэг: I 1+, II 2+, III 3+, V 3−, VI 2−, VII 1−.', 'Elements are in order of increasing proton number; a group = the same number of outer electrons → similar chemical properties; a period = the same number of occupied shells. Group → ion charge: I 1+, II 2+, III 3+, V 3−, VI 2−, VII 1−.'),
      bi('I бүлэг доошлох тусам: хайлах цэг ↓, нягт ↑ (ерөнхийдөө), идэвх ↑. 2Na + 2H₂O → 2NaOH + H₂; тос дор хадгална.', 'Down Group I: melting point ↓, density ↑ (general trend), reactivity ↑. 2Na + 2H₂O → 2NaOH + H₂; stored under oil.'),
      bi('VII бүлэг: Cl₂ цайвар шар-ногоон хий, Br₂ улаан хүрэн шингэн, I₂ саарал-хар хатуу; доошлох тусам нягт ↑, идэвх ↓; идэвхтэй галоген идэвх багатайг шахан гаргана.', 'Group VII: Cl₂ pale yellow-green gas, Br₂ red-brown liquid, I₂ grey-black solid; down the group density ↑, reactivity ↓; a more reactive halogen displaces a less reactive one.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi(
          'Том асуулт: Менделеев хоосон зай үлдээж, олдоогүй элементийг таамагласан – элементийн байрлал түүний шинжийг хэрхэн хэлдэг вэ? "Санал нийлэх үү?" (I бүлгийн идэвх доошоо өснө; VII бүлгийнх өснө; инертийн хий бүтэн давхаргатай) ба төлөвлөгөө.',
          'Big question: Mendeleev left gaps and predicted elements nobody had found – how can an element’s position tell us how it behaves? "Agree or disagree?" (reactivity increases down Group I; it increases down Group VII; noble gases have a full outer shell) and the plan.'
        ),
        bi('Элементийн байрлалаас юу мэдэж болохыг хосоороо 60 секунд ярилцаж, эрхий хуруугаар санал өгнө.', 'Think–pair–share for 60 s on what position alone tells you; vote with thumbs.'),
        bi('Байрлал (бүлэг, үе) → электрон тохиргоо → шинж чанар.', 'Position (group, period) → electronic configuration → properties.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi(
          'Бүлэг ба үеийг электрон тохиргоотой холбоно (2-р бүлэг). Зорилгод fist to five. Давталт: Na-ийн тохиргоо, хлорын гаднах электрон ба бүлэг, магнийн ион, инертийн хий яагаад идэвхгүй.',
          'Link group and period to electronic configuration (chapter 2). Fist to five on the objectives. Retrieval: the configuration of Na, the outer electrons and group of chlorine, the magnesium ion, why noble gases are unreactive.'
        ),
        bi('Самбартаа бичээд 3-2-1-д өргөнө.', 'Write on show-me boards and reveal on 3-2-1.'),
        bi('2,8,1; 7 – VII бүлэг; 2+; гаднах давхарга бүтэн.', '2,8,1; 7 – Group VII; 2+; a full outer shell.')
      ],
      [
        bi('Үелэх системийн зохион байгуулалт ба ионы цэнэг', 'Organising the table and ion charges'),
        bi(
          'Зураг 13.2: протоны тоогоор эрэмбэлэх, бүлэг, үе, металл → металлоид → металл бус. Бүлгийн дугаар → гаднах электрон → ионы цэнэгийн хүснэгт (Na⁺, Mg²⁺, Al³⁺, N³⁻, O²⁻, Cl⁻, Ar).',
          'Figure 13.2: ordered by proton number, groups, periods, metals → metalloids → non-metals. The table group number → outer electrons → ion charge (Na⁺, Mg²⁺, Al³⁺, N³⁻, O²⁻, Cl⁻, Ar).'
        ),
        bi('Нэг гараараа 3-р үе, нөгөөгөөрөө II бүлгийг заана; цэнэг бүрийг самбартаа таамаглана.', 'Point to Period 3 with one hand and Group II with the other; predict each charge on boards.'),
        bi('Металл электрон алдаж эерэг, металл бус авч сөрөг ион; VIII бүлэг ион үүсгэхгүй.', 'Metals lose electrons to form positive ions, non-metals gain them to form negative ions; Group VIII forms no ions.')
      ],
      [
        bi('I бүлэг: шүлтлэг металл; судлах', 'Group I: the alkali metals; explore'),
        bi(
          'Li, Na, K-ийн хүснэгт (хайлах цэг, нягт, устай урвал); I бүлгийн хандлага ба шалтгаан (нэг гаднах электрон алдаж 1+ ион; гаднах электрон цөмөөс хол). Хамтдаа: рубидийн хайлах цэг ба устай урвал, лити + ус. Судлах: Li → Cs-ийг устай урвалын хүчээр эрэмбэлэх.',
          'The table for Li, Na and K (melting point, density, reaction with water); the Group I trends and the reason (one outer electron lost to form a 1+ ion; the outer electron is further from the nucleus). Together: the melting point of rubidium and its reaction with water, lithium + water. Explore: rank Li → Cs by how violently they react with water.'
        ),
        bi('Калийн урвалыг таамаглана; таамаглалаа самбартаа бичнэ; гараа доош хөдөлгөж "илүү идэвхтэй, хайлах цэг бага" гэж хэлнэ.', 'Predict the reaction of potassium; write predictions on boards; move a hand down saying "more reactive, lower melting point".'),
        bi('Rb < 63 °C (≈39 °C); K-ээс хүчтэй; лити + ус → литийн гидроксид + устөрөгч; индикатор ягаан (шүлт).', 'Rb < 63 °C (about 39 °C); more vigorous than K; lithium + water → lithium hydroxide + hydrogen; indicator violet (an alkali).')
      ],
      [
        bi('Hinge, галогенууд ба шахан гаргах урвал', 'Hinge, halogens and displacement'),
        bi(
          'Hinge 1: I бүлгийн хандлага. Галогенуудын төрх ба хайлах/буцлах цэг (Зураг 13.9). Шахан гаргах: Cl₂ + 2KBr → 2KCl + Br₂ (өнгөгүй → улбар шар); Cl₂ + 2KI → 2KCl + I₂ (→ хүрэн); Br₂ + KCl → урвалгүй. (E) Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂.',
          'Hinge 1: the Group I trend. The appearance and melting/boiling points of the halogens (Figure 13.9). Displacement: Cl₂ + 2KBr → 2KCl + Br₂ (colourless → orange); Cl₂ + 2KI → 2KCl + I₂ (→ brown); Br₂ + KCl → no reaction. (E) Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂.'
        ),
        bi('ABCD хуруугаар санал өгнө; галоген бүрийн төрх, урвал бүрийн өнгийг үзүүлэхээс өмнө таамаглана.', 'Vote with ABCD fingers; predict the appearance of each halogen and the colour of each reaction before the demo.'),
        bi('Hinge: C (идэвх өснө); иод хатуу биетэй саарал-хар (уур нь ягаан).', 'Hinge: C (reactivity increases); iodine is a grey-black solid (its vapour is purple).')
      ]
    ]),
    [
      exitItem(
        bi('II бүлгийн элементийн ион ямар цэнэгтэй вэ?', 'What is the charge on ions of Group II elements?'),
        [bi('1+', '1+'), bi('2+', '2+'), bi('2−', '2−'), bi('Ион үүсгэхгүй', 'They form no ions')],
        1,
        bi('Гаднах 2 электроноо алдана, жишээ нь Mg²⁺.', 'They lose their 2 outer electrons, e.g. Mg²⁺.')
      ),
      exitItem(
        bi('I бүлгийн шүлтлэг металлын тухай доошлох тусам аль нь зөв бэ?', 'Which statement about the alkali metals is correct going down Group I?'),
        [
          bi('Хайлах цэг өснө', 'Melting point increases'),
          bi('Идэвх буурна', 'Reactivity decreases'),
          bi('Идэвх өснө', 'Reactivity increases'),
          bi('Электрон амархан авна', 'They gain electrons more easily')
        ],
        2,
        bi('Идэвх өснө, хайлах цэг буурна; тэд электрон алддаг (авдаггүй).', 'Reactivity increases and melting point decreases; they lose (not gain) electrons.')
      ),
      exitItem(
        bi('Өрөөний температурт бром ямар төрхтэй вэ?', 'What is the appearance of bromine at room temperature?'),
        [bi('Цайвар шар-ногоон хий', 'Pale yellow-green gas'), bi('Улаан хүрэн шингэн', 'Red-brown liquid'), bi('Саарал-хар хатуу', 'Grey-black solid'), bi('Өнгөгүй хий', 'Colourless gas')],
        1,
        bi('Cl₂ – хий, Br₂ – улаан хүрэн шингэн, I₂ – саарал-хар хатуу.', 'Cl₂ is a gas, Br₂ a red-brown liquid, I₂ a grey-black solid.')
      ),
      exitItem(
        bi('Хлорыг калийн бромидын уусмалд нэмэхэд юу болох вэ?', 'What happens when chlorine is added to potassium bromide solution?'),
        [
          bi('Урвал явагдахгүй', 'No reaction'),
          bi('Бром үүсч уусмал улбар шар болно', 'Bromine forms and the solution turns orange'),
          bi('Иод үүсч хүрэн болно', 'Iodine forms and it turns brown'),
          bi('Хлор шахагдана', 'Chlorine is displaced')
        ],
        1,
        bi('Хлор бромоос идэвхтэй: Cl₂ + 2KBr → 2KCl + Br₂.', 'Chlorine is more reactive than bromine: Cl₂ + 2KBr → 2KCl + Br₂.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Шахан гаргах, шилжилтийн элемент, инертийн хий ба шалгалт', 'Displacement, transition elements, noble gases and exam practice'),
    bi(
      'Галогенийн шахан гаргах урвалыг таамаглах; шилжилтийн элемент ба инертийн хийг тайлбарлах; (E) шилжилтийн элементийн ион хувьсах исэлдлийн зэрэгтэй (Fe²⁺/Fe³⁺); өгсөн мэдээллээс хандлага олж шинж чанарыг таамаглах.',
      'Predict halogen displacement reactions; describe transition elements and noble gases; (E) transition elements form ions with variable oxidation numbers (Fe²⁺/Fe³⁺); identify trends and predict properties from given information.'
    ),
    [
      bi('Cl₂ нь Br⁻ ба I⁻-ийг, Br₂ нь зөвхөн I⁻-ийг шахна; I₂ аль алийг нь шахахгүй.', 'Cl₂ displaces both Br⁻ and I⁻, Br₂ displaces only I⁻, and I₂ displaces neither.'),
      bi('Шилжилтийн элемент (Fe, Cu, Ni, Cr): нягт ихтэй, хайлах цэг өндөр, өнгөт нэгдэл, катализатор (Хабер процесст Fe); (E) хувьсах исэлдлийн зэрэг: Fe²⁺/Fe³⁺, Cu⁺/Cu²⁺.', 'Transition elements (Fe, Cu, Ni, Cr): dense, high melting points, coloured compounds, catalysts (Fe in the Haber process); (E) variable oxidation numbers: Fe²⁺/Fe³⁺, Cu⁺/Cu²⁺.'),
      bi('Инертийн хий (VIII бүлэг): гаднах давхарга бүтэн тул идэвхгүй, нэг атомт хий; аргон – гэрлийн чийдэн, гели – бөмбөлөг.', 'Noble gases (Group VIII): unreactive, monatomic gases with a full outer shell; argon in light bulbs, helium in balloons.')
    ],
    lessonSteps([
      [
        bi('Хамтдаа: шахан гаргах хүснэгт; hinge 2', 'We do: the displacement grid; hinge 2'),
        bi('Cl₂, Br₂, I₂-ийг KCl, KBr, KI уусмалтай: аль нүдэнд урвал явагдах вэ, ямар өнгө. Hinge 2: аль хольцод өнгө өөрчлөгдөх вэ.', 'Cl₂, Br₂ and I₂ with KCl, KBr and KI solutions: which boxes react and what colour. Hinge 2: which mixture produces a colour change.'),
        bi('Нүд бүрт тэмдэг тавиад шалгана; ABCD картаар санал өгнө.', 'Tick or cross each box, then check; vote with ABCD cards.'),
        bi('Cl₂ → улбар шар (Br₂), хүрэн (I₂); Br₂ → зөвхөн KI-д хүрэн; I₂ урвалгүй; hinge: C (хлор + KI).', 'Cl₂ → orange (Br₂), brown (I₂); Br₂ → brown only with KI; I₂ no reaction; hinge: C (chlorine + potassium iodide).')
      ],
      [
        bi('Шилжилтийн элемент ба инертийн хий', 'Transition elements and noble gases'),
        bi('Шилжилтийн металлын өнгөт нэгдлүүд (Зураг 13.16) ба 4 шинж; (E) Fe²⁺/Fe³⁺, Cu⁺/Cu²⁺. Инертийн хий: бүтэн давхарга, нэг атомт; аргон ба гелийн хэрэглээ.', 'The coloured compounds of transition metals (Figure 13.16) and their 4 properties; (E) Fe²⁺/Fe³⁺ and Cu⁺/Cu²⁺. Noble gases: a full outer shell, monatomic; uses of argon and helium.'),
        bi('Odd one out: Fe, Cu, Na, Ni – аль нь шилжилтийн элемент биш вэ, яагаад.', 'Odd one out: Fe, Cu, Na, Ni – which is not a transition element, and why?'),
        bi('Na – I бүлгийн зөөлөн металл; инертийн хий нэг атомт (хоёр атомт биш).', 'Na – a soft Group I metal; noble gases are monatomic (not diatomic).')
      ],
      [
        bi('Бие даан: өгөгдлөөс таамаглах; hinge 3', 'You do: predicting from data; hinge 3'),
        bi('Астат (иодын доор): төлөв ба идэвх; фтор (хлорын дээр): буцлах цэг; никелийн натрид байдаггүй шинж. Hinge 3: өнгөт нэгдэл, хайлах цэг өндөр, катализатор бүхий X.', 'Astatine (below iodine): its state and reactivity; fluorine (above chlorine): its boiling point; a property of nickel that sodium does not have. Hinge 3: X forms coloured compounds, has a high melting point and is a catalyst.'),
        bi('3 минут чимээгүй бичээд өөр өнгөөр засна; ABCD хуруугаар санал өгнө.', 'Write in silence for 3 minutes, then mark in a different colour; vote with ABCD fingers.'),
        bi('Хатуу (хар); идэвх бага; доогуур (−188 °C); нягт/хайлах цэг/өнгөт/катализатор; hinge: C.', 'Solid (black); less reactive; lower (−188 °C); density / melting point / coloured compounds / catalyst; hinge: C.')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi(
          '(a)–(d): бромын төрх, хлор ба бромын ижил шинжийн шалтгаан, Cl₂ + KBr-ийн үгэн тэгшитгэл ба өнгө, (E) төмрийн исэлдлийн зэрэг. 4 шалгалтын зөвлөмж. Үнэлэх: "рубиди натриас удаан урвална". Алдаа засах: хлор яагаад калийн фторидтой урвалддаггүй.',
          '(a)–(d): the appearance of bromine, why chlorine and bromine behave alike, the word equation and colour change for Cl₂ + KBr, (E) the oxidation numbers of iron. The 4 exam tips. Evaluate: "rubidium reacts more slowly than sodium". Error clinic: why chlorine does not react with potassium fluoride.'
        ),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes, swap and tick each marking point; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('Улаан хүрэн шингэн; 7 гаднах электрон; хлор + калийн бромид → калийн хлорид + бром, өнгөгүй → улбар шар; +2 ба +3; хлор фтороос идэвх бага (элементийг нэрлэ).', 'Red-brown liquid; 7 outer electrons; chlorine + potassium bromide → potassium chloride + bromine, colourless → orange; +2 and +3; chlorine is less reactive than fluorine (name the elements).')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: II бүлгийн ион, I бүлгийн идэвх, бром + KI, инертийн хий. Зорилгод дахин fist to five.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: Group II ions, Group I reactivity, bromine + KI, noble gases. Fist to five on the objectives again.'),
        bi('Гарах билетийг 4 минутад ганцаараа чимээгүй бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone and in silence in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('2+; өснө; тийм – бром иодоос идэвхтэй; гаднах давхарга бүтэн.', '2+; it increases; yes – bromine is more reactive than iodine; a full outer shell.')
      ]
    ]),
    [
      exitItem(
        bi('Аль хольцод өнгө өөрчлөгдөх вэ?', 'Which mixture produces a colour change?'),
        [
          bi('Иод + калийн хлорид', 'Iodine + potassium chloride'),
          bi('Бром + калийн хлорид', 'Bromine + potassium chloride'),
          bi('Хлор + калийн иодид', 'Chlorine + potassium iodide'),
          bi('Иод + калийн бромид', 'Iodine + potassium bromide')
        ],
        2,
        bi('Хлор иодоос идэвхтэй тул иодыг шахан гаргана (хүрэн).', 'Chlorine is more reactive than iodine, so it displaces iodine (brown).')
      ),
      exitItem(
        bi('X элемент өнгөт нэгдэл үүсгэж, хайлах цэг өндөр, катализатор болдог. X хаана байх вэ?', 'Element X forms coloured compounds, has a high melting point and is used as a catalyst. Where is X?'),
        [bi('I бүлэг', 'Group I'), bi('VII бүлэг', 'Group VII'), bi('Шилжилтийн элементүүд', 'The transition elements'), bi('VIII бүлэг', 'Group VIII')],
        2,
        bi('Эдгээр нь шилжилтийн элементийн ердийн шинж.', 'These are typical properties of transition elements.')
      ),
      exitItem(
        bi('Астат иодын доор байдаг. Иодтой харьцуулахад идэвх нь ямар вэ?', 'Astatine is below iodine. Is it more or less reactive than iodine?'),
        [bi('Илүү идэвхтэй', 'More reactive'), bi('Идэвх бага', 'Less reactive'), bi('Ижил', 'The same'), bi('Идэвхгүй', 'Unreactive')],
        1,
        bi('VII бүлэгт доошлох тусам идэвх буурна (I бүлэгтэй андуурч болохгүй).', 'Reactivity decreases down Group VII (do not confuse it with Group I).')
      ),
      exitItem(
        bi('Инертийн хий яагаад идэвхгүй вэ?', 'Why are noble gases unreactive?'),
        [
          bi('8 электронтой тул', 'They have 8 electrons'),
          bi('Гаднах давхарга бүтэн тул электрон авах, алдах шаардлагагүй', 'They have a full outer shell, so they do not need to gain or lose electrons'),
          bi('Хоёр атомт молекул тул', 'They are diatomic'),
          bi('Металл тул', 'They are metals')
        ],
        1,
        bi('Гели 2 электронтой ч бүтэн давхаргатай; инертийн хий нэг атомт.', 'Helium has only 2 electrons but a full shell; noble gases are monatomic.')
      ),
      exitItem(
        bi('(E) Төмөр нэгдлүүддээ ямар хоёр исэлдлийн зэрэгтэй байдаг вэ?', '(E) Which two oxidation numbers does iron show in its compounds?'),
        [bi('+1 ба +2', '+1 and +2'), bi('+2 ба +3', '+2 and +3'), bi('+3 ба +4', '+3 and +4'), bi('−2 ба −3', '−2 and −3')],
        1,
        bi('Төмөр(II) Fe²⁺ ба төмөр(III) Fe³⁺ – хувьсах исэлдлийн зэрэг.', 'Iron(II) Fe²⁺ and iron(III) Fe³⁺ – variable oxidation numbers.')
      )
    ],
    ID
  )
];

export const IG8_GLOSSARY: Record<string, GlossaryTerm[]> = {
  'ig8-1': [
    term(bi('бүлэг', 'group'), bi('Ижил химийн шинжтэй (гаднах электрон ижил) элементүүдийн босоо багана.', 'A vertical column of elements with similar chemical properties (same number of outer electrons).')),
    term(bi('үе', 'period'), bi('Элементүүдийн хэвтээ мөр (эзэлсэн давхарга ижил).', 'A horizontal row of elements (same number of occupied shells).')),
    term(bi('шүлтлэг металл', 'alkali metals'), bi('I бүлгийн элементүүд – зөөлөн, идэвхтэй металл.', 'The Group I elements – soft, reactive metals.')),
    term(bi('галоген', 'halogens'), bi('VII бүлгийн элементүүд – хоёр атомт металл бус.', 'The Group VII elements – diatomic non-metals.'))
  ],
  'ig8-2': [
    term(bi('шилжилтийн элемент', 'transition elements'), bi('Төв блокийн металл: нягт, хайлах цэг өндөр, өнгөт нэгдэл, катализатор.', 'Metals in the central block: dense, high melting points, coloured compounds, catalysts.')),
    term(bi('инертийн хий', 'noble gases'), bi('VIII бүлгийн элементүүд – идэвхгүй, нэг атомт хий.', 'The Group VIII elements – unreactive, monatomic gases.'))
  ]
};

export const IG8_PRACTICE: Record<string, PracticeItem[]> = {
  'ig8-1': [
    easy(
      bi('Лити устай урвалдахад юу үүсэх вэ?', 'What forms when lithium reacts with water?'),
      [bi('Литийн исэл + устөрөгч', 'Lithium oxide + hydrogen'), bi('Литийн гидроксид + устөрөгч', 'Lithium hydroxide + hydrogen'), bi('Литийн гидроксид + хүчилтөрөгч', 'Lithium hydroxide + oxygen'), bi('Лити + ус', 'Lithium + water')],
      1,
      bi('Шүлтлэг металл + ус → металлын гидроксид + устөрөгч (исэл биш).', 'Alkali metal + water → metal hydroxide + hydrogen (not the oxide).')
    ),
    easy(
      bi('Хлор (2,8,7) хэдэн гаднах электронтой, аль бүлэгт вэ?', 'How many outer electrons does chlorine (2,8,7) have, and which group is it in?'),
      [bi('7 – VII бүлэг', '7 – Group VII'), bi('8 – VIII бүлэг', '8 – Group VIII'), bi('3 – III бүлэг', '3 – Group III'), bi('2 – II бүлэг', '2 – Group II')],
      0,
      bi('Гаднах электроны тоо = бүлгийн дугаар.', 'The number of outer electrons = the group number.')
    ),
    hard(
      bi('Li, Na, K-ийн өгөгдлөөр цезийн хайлах цэг, нягт, идэвхийг таамаглаж, таамаглал бүрээ тайлбарла.', 'Use the data for Li, Na and K to predict the melting point, density and reactivity of caesium. Explain each prediction.'),
      bi('Хайлах цэг K-ээс (63 °C) бага – доошлох тусам буурна; нягт их – ерөнхийдөө өснө; устай маш хүчтэй (тэсрэх) урвална – гаднах ганц электрон цөмөөс хол тул амархан алдагдана.', 'Melting point lower than K (63 °C) – it falls down the group; density higher – it generally rises; reacts extremely violently (explosively) with water – the single outer electron is further from the nucleus, so it is lost more easily.'),
      bi('I бүлэгт идэвх доошоо өснө – VII бүлгийнхтэй эсрэг.', 'Reactivity increases down Group I – the opposite of Group VII.')
    )
  ],
  'ig8-2': [
    easy(
      bi('Бром калийн хлоридтой урвалдах уу?', 'Does bromine react with potassium chloride?'),
      [bi('Тийм – бром хлорыг шахна', 'Yes – bromine displaces chlorine'), bi('Үгүй – бром хлороос идэвх бага', 'No – bromine is less reactive than chlorine'), bi('Тийм – иод үүснэ', 'Yes – iodine forms'), bi('Үгүй – бром хий учир', 'No – bromine is a gas')],
      1,
      bi('Идэвх бага галоген идэвхтэйг шахаж чадахгүй.', 'A less reactive halogen cannot displace a more reactive one.')
    ),
    easy(
      bi('Аргоныг гэрлийн чийдэнд яагаад хэрэглэдэг вэ?', 'Why is argon used in light bulbs?'),
      [bi('Идэвхгүй', 'It is unreactive'), bi('Өнгөтэй', 'It is coloured'), bi('Катализатор', 'It is a catalyst'), bi('Хоёр атомт', 'It is diatomic')],
      0,
      bi('Инертийн хий бүтэн давхаргатай тул урвалд ордоггүй.', 'Noble gases have a full outer shell, so they do not react.')
    ),
    hard(
      bi('Хлорыг калийн бромидтой урвалдуулах үгэн тэгшитгэлийг бичиж, өнгөний өөрчлөлтийг бич; (E) ионы тэгшитгэлийг ч бич.', 'Write a word equation for chlorine with potassium bromide and state the colour change; (E) also give the ionic equation.'),
      bi('Хлор + калийн бромид → калийн хлорид + бром [1]; өнгөгүй → улбар шар [1]. (E) Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂.', 'Chlorine + potassium bromide → potassium chloride + bromine [1]; colourless → orange [1]. (E) Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂.'),
      bi('"Бромид шахагдана" биш – бром (элемент) үүснэ; бромид бол ион.', 'Not "bromide is displaced" – bromine (the element) forms; bromide is the ion.')
    )
  ]
};
