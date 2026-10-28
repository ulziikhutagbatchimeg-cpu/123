// IGCSE 0620 chapter 2 (atoms, elements and chemical bonding), lessons 1–2 of 5. Both lessons follow the deck
// Ch02_Atomic_structure.pptx (slides 1–14 and 15–30) and the syllabus sections 2.2 and 2.3.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig2';

export const IG2_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Атомын бүтэц ба изотоп', 'Atomic structure and isotopes'),
    bi(
      'Атомыг (протон, нейтронтой цөм, давхаргад байрлах электрон) тодорхойлох, протоны тоо ба массын тоог ашиглах, изотопыг тодорхойлох, (E) харьцангуй атом массыг тооцох.',
      'Describe the atom (a nucleus of protons and neutrons, with electrons in shells), use proton number and mass number, define isotopes and (E) calculate relative atomic mass.'
    ),
    [
      bi(
        'Протон: масс 1, цэнэг +1; нейтрон: масс 1, цэнэг 0; электрон: масс 1/1840, цэнэг −1. Саармаг атомд протоны тоо = электроны тоо.',
        'Proton: mass 1, charge +1; neutron: mass 1, charge 0; electron: mass 1/1840, charge −1. In a neutral atom, protons = electrons.'
      ),
      bi(
        'Z = протоны тоо; A = протон + нейтрон; нейтроны тоо = A − Z. Ионд электрон = Z − цэнэг.',
        'Z = number of protons; A = protons + neutrons; neutrons = A − Z. In an ion, electrons = Z − charge.'
      ),
      bi(
        'Изотоп: протоны тоо ижил, нейтроны тоо өөр. (E) Электрон ижил тул химийн шинж ижил; Ar = изотопын массын жигнэсэн дундаж.',
        'Isotopes: same number of protons, different numbers of neutrons. (E) Same electrons, so same chemical properties; Ar is the weighted mean of the isotope masses.'
      )
    ],
    lessonSteps([
      [
        bi('Эхлэл ба өмнөх мэдлэг', 'Start and retrieval'),
        bi(
          'Гелийн атомын зургийг үзүүлж том асуултыг тавина: бүх атом ижил гурван бөөмөөс тогтдог бол нүүрстөрөгч, алт хоёр юугаараа ялгаатай вэ? Дараа нь 1-р бүлгийн дөрвөн асуулт (хатуу биеийн бөөмс, элемент, сөрөг цэнэгтэй бөөм, атомын масс хаана байдаг).',
          'Show the helium atom and pose the big question: if all atoms are made of the same three particles, what makes carbon different from gold? Then four retrieval questions (particles in a solid, element, the negative particle, where the mass of an atom is).'
        ),
        bi('Хосоороо 60 секунд ярилцаж, дараа нь самбартаа бичээд 3-2-1-д зэрэг өргөнө.', 'Think–pair–share for 60 s, then write on show-me boards and reveal together on 3-2-1.'),
        bi('Протон, нейтрон, электроныг нэрлэнэ; масс цөмд байгааг хэлнэ.', 'Students name proton, neutron and electron and say the mass is in the nucleus.')
      ],
      [
        bi('Атомын бүтэц, Z ба A', 'The atom, Z and A'),
        bi(
          'Хүснэгт 2.1-ийг мөр мөрөөр гаргана: харьцангуй масс, цэнэг, байрлал. ᴬ_Z X тэмдэглэгээг тайлбарлаж, нейтрон = A − Z гэдгийг ²³₁₁Na жишээгээр (11 p, 11 e, 12 n) үзүүлнэ.',
          'Reveal Table 2.1 row by row: relative mass, charge and position. Explain the notation ᴬ_Z X and show neutrons = A − Z with ²³₁₁Na (11 p, 11 e, 12 n).'
        ),
        bi('Хүснэгтийн нүд бүрийг click-ээс өмнө самбартаа таамаглана; массын тоог дээр, протоны тоог доор гэж агаарт зурна.', 'Predict each cell of the table before the click; air-draw the mass number on top and the proton number below.'),
        bi('Na-ийн 11/12/11 зөв; нейтроныг A + Z гэж бодоогүй.', 'Na 11/12/11 correct; nobody calculates neutrons as A + Z.')
      ],
      [
        bi('Хамтдаа: атом ба ион', 'We do: atoms and ions'),
        bi(
          '³⁹K, ¹⁹F⁻, ²⁷Al³⁺, ³²S²⁻, ⁴⁰Ca²⁺-ийн протон, нейтрон, электроныг хамт бөглөнө: эерэг цэнэг = электрон алдсан, сөрөг = электрон авсан; протон хэзээ ч өөрчлөгдөхгүй. Hinge 1: 12 p, 12 n, 10 e бүхий ион.',
          'Fill protons, neutrons and electrons for ³⁹K, ¹⁹F⁻, ²⁷Al³⁺, ³²S²⁻ and ⁴⁰Ca²⁺ together: a positive charge means electrons lost, negative means gained; protons never change. Hinge 1: an ion with 12 p, 12 n and 10 e.'
        ),
        bi('Мөр бүрийг mini-whiteboard дээр бөглөөд хостойгоо солилцож шалгана; hinge-д ABCD хуруугаар санал өгнө.', 'Fill each row on mini-whiteboards and swap with a partner; vote on the hinge with ABCD fingers.'),
        bi('K 19/20/19, F⁻ 9/10/10, Al³⁺ 13/14/10, S²⁻ 16/16/18, Ca²⁺ 20/20/18; hinge: ²⁴₁₂Mg²⁺.', 'K 19/20/19, F⁻ 9/10/10, Al³⁺ 13/14/10, S²⁻ 16/16/18, Ca²⁺ 20/20/18; hinge: ²⁴₁₂Mg²⁺.')
      ],
      [
        bi('Изотоп ба (E) Ar', 'Isotopes and (E) Ar'),
        bi(
          'Устөрөгчийн ¹H, ²H, ³H ба ³⁵Cl, ³⁷Cl-ээр изотопыг тодорхойлно. (E) Гинжин тайлбар: электрон ижил → тохиргоо ижил → химийн шинж ижил. Ажилласан жишээ: 75% ³⁵Cl, 25% ³⁷Cl → Ar = 35.5.',
          'Define isotopes with ¹H, ²H, ³H and ³⁵Cl, ³⁷Cl. (E) Chain explanation: same electrons → same configuration → same chemical properties. Worked example: 75% ³⁵Cl and 25% ³⁷Cl → Ar = 35.5.'
        ),
        bi('Изотопын асуултад хариулна; (E) B, Cu, Mg-ийн Ar-ийг хосоороо бодож, тооны машинаар шалгана.', 'Answer the isotope questions; (E) calculate Ar for B, Cu and Mg in pairs and check with a calculator.'),
        bi('¹²C/¹⁴C: 6 ба 8 нейтрон; ⁴⁰Ca ба ⁴²Ca изотоп; Ar = 10.8, 63.6, 24.3.', '¹²C/¹⁴C: 6 and 8 neutrons; ⁴⁰Ca and ⁴²Ca are isotopes; Ar = 10.8, 63.6, 24.3.')
      ],
      [
        bi('Hinge ба гарах билет', 'Hinge and exit ticket'),
        bi('Hinge 2: 90% масс 20, 10% масс 22 бүхий элементийн Ar. Дараа нь гарах билет өгнө.', 'Hinge 2: Ar of an element with 90% mass 20 and 10% mass 22. Then give the exit ticket.'),
        bi('ABCD картаар санал өгч, гарах билетийг ганцаараа чимээгүй бөглөнө.', 'Vote with ABCD cards, then complete the exit ticket alone and in silence.'),
        bi('Hinge: B (20.2); гарах билетийн оноо.', 'Hinge: B (20.2); exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('⁵⁶₂₆Fe атомд хэдэн нейтрон байх вэ?', 'How many neutrons are in an atom of ⁵⁶₂₆Fe?'),
        [bi('26', '26'), bi('30', '30'), bi('56', '56'), bi('82', '82')],
        1,
        bi('Нейтрон = A − Z = 56 − 26 = 30.', 'Neutrons = A − Z = 56 − 26 = 30.')
      ),
      exitItem(
        bi('Аль хос нь нэг элементийн изотопууд вэ?', 'Which pair are isotopes of the same element?'),
        [bi('⁴⁰Ar ба ⁴⁰Ca', '⁴⁰Ar and ⁴⁰Ca'), bi('⁴⁰Ca ба ⁴²Ca', '⁴⁰Ca and ⁴²Ca'), bi('⁴⁰Ar ба ⁴²Ca', '⁴⁰Ar and ⁴²Ca'), bi('³⁹K ба ⁴⁰Ca', '³⁹K and ⁴⁰Ca')],
        1,
        bi('Изотопууд протоны тоо ижил (Ca: 20), нейтроны тоо өөр. Массын тоо ижил байх нь изотоп гэсэн үг биш.', 'Isotopes have the same proton number (Ca: 20) and different neutron numbers. The same mass number does not make isotopes.')
      ),
      exitItem(
        bi('Ион 16 протон, 16 нейтрон, 18 электронтой. Энэ ямар ион бэ?', 'An ion has 16 protons, 16 neutrons and 18 electrons. What is it?'),
        [bi('³²S²⁺', '³²S²⁺'), bi('³²S²⁻', '³²S²⁻'), bi('³⁴S', '³⁴S'), bi('³²Ar²⁻', '³²Ar²⁻')],
        1,
        bi('16 протон → хүхэр; A = 16 + 16 = 32; 2 электрон илүү → 2− цэнэг.', '16 protons → sulfur; A = 16 + 16 = 32; 2 extra electrons → charge 2−.')
      ),
      exitItem(
        bi('(E) Хлор 75% ³⁵Cl ба 25% ³⁷Cl-оос тогтоно. Ar(Cl) хэд вэ?', '(E) Chlorine is 75% ³⁵Cl and 25% ³⁷Cl. What is Ar(Cl)?'),
        [bi('35.0', '35.0'), bi('35.5', '35.5'), bi('36.0', '36.0'), bi('36.5', '36.5')],
        1,
        bi('(35 × 75 + 37 × 25) ÷ 100 = 35.5. 36 гэдэг нь элбэгшлийг тооцоогүй энгийн дундаж.', '(35 × 75 + 37 × 25) ÷ 100 = 35.5. 36 is a simple average that ignores the abundances.')
      ),
      exitItem(
        bi('(E) ¹²C ба ¹⁴C яагаад ижил химийн шинжтэй вэ?', '(E) Why do ¹²C and ¹⁴C have the same chemical properties?'),
        [
          bi('Нейтроны тоо ижил', 'Same number of neutrons'),
          bi('Массын тоо ижил', 'Same mass number'),
          bi('Электроны тоо ба тохиргоо ижил', 'Same number of electrons and electronic configuration'),
          bi('Цөмийн хэмжээ ижил', 'Same size of nucleus')
        ],
        2,
        bi('Химийн урвал электроноос хамаардаг; хоёулаа 6 электронтой, тохиргоо нь 2,4.', 'Chemical reactions depend on electrons; both have 6 electrons with the configuration 2,4.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Электрон тохиргоо ба үелэх систем', 'Electronic configuration and the Periodic Table'),
    bi(
      'Z = 1–20 атом ба ионы электрон тохиргоог бичих, түүнийг бүлэг ба үетэй холбох, шалгалтын асуултад зөв хэллэгээр хариулах.',
      'Write the electronic configurations of atoms and ions with Z = 1–20, link them to the group and period, and answer exam questions with the right wording.'
    ),
    [
      bi('Давхарга эхнээсээ дүүрнэ: 1-р давхарга 2, 2-р 8, 3-р 8 (Z ≤ 20). Жишээ: K 2,8,8,1; Ca 2,8,8,2.', 'Shells fill from the first: 1st shell 2, 2nd 8, 3rd 8 (Z ≤ 20). Examples: K 2,8,8,1; Ca 2,8,8,2.'),
      bi('Гаднах электроны тоо = бүлгийн дугаар (I–VII); эзэлсэн давхаргын тоо = үеийн дугаар; VIII бүлэг гаднах давхарга дүүрэн.', 'Outer-shell electrons = group number (I–VII); occupied shells = period number; Group VIII has a full outer shell.'),
      bi('Ион инертийн хийн тохиргоотой болно: Na⁺ 2,8; O²⁻ 2,8; Cl⁻ 2,8,8. Бүлэг, үе нь атомынх хэвээр.', 'Ions have a noble gas configuration: Na⁺ 2,8; O²⁻ 2,8; Cl⁻ 2,8,8. The group and period are those of the atom.')
    ],
    lessonSteps([
      [
        bi('Санал хураалт ба давталт', 'Vote and retrieval'),
        bi(
          '"Санал нийлэх үү?" гурван өгүүлбэр (атомын масс электронд; изотопын химийн шинж өөр; атом цэнэггүй) дээр эрхий хуруугаар санал хураалгана. 1-р хичээлээс: ²³Na-ийн нейтрон, изотопын тодорхойлолт.',
          'Thumb vote on three statements (most of the mass is in the electrons; isotopes have different chemical properties; an atom has no overall charge). Retrieval from lesson 1: neutrons in ²³Na and the definition of isotopes.'
        ),
        bi('Чимээгүй санал өгөөд 30 секунд яагаад гэдгээ ярилцана; санал тэмдэглээд хичээлийн төгсгөлд шалгана.', 'Vote silently, talk for 30 s about why, and keep the vote to check at the end.'),
        bi('Санал хуваагдсан өгүүлбэр = энэ хичээлд анхаарах хэсэг; 12 нейтрон зөв.', 'Split votes show what to focus on; 12 neutrons correct.')
      ],
      [
        bi('Электрон давхарга', 'Electrons in shells'),
        bi(
          'Зураг 2.15-аар Li 2,1, Na 2,8,1, K 2,8,8,1-ийг зурна; 2–8–8 дүрэм; Si 2,8,4 ба Ca 2,8,8,2. Дараа нь Зураг 2.16: гаднах электрон = бүлэг, давхарга = үе, VIII бүлэг дүүрэн.',
          'Use Figure 2.15 to draw Li 2,1, Na 2,8,1 and K 2,8,8,1; the 2–8–8 rule; Si 2,8,4 and Ca 2,8,8,2. Then Figure 2.16: outer electrons = group, shells = period, Group VIII is full.'
        ),
        bi('Натрийн 11 электроныг шалан дээрх давхаргад "тоглож" байрлуулна; Cl, Mg, K-ийн бүлэг ба үеийг хуруугаараа үзүүлнэ.', 'Act out sodium’s 11 electrons filling shells drawn on the floor; show the group and period of Cl, Mg and K with fingers.'),
        bi('K-г 2,8,9 гэж бичээгүй; Cl: VII бүлэг, 3-р үе.', 'Nobody writes K as 2,8,9; Cl: Group VII, Period 3.')
      ],
      [
        bi('Бие даан: тохиргооны хүснэгт', 'You do: configurations'),
        bi(
          'N, Al, S, Ar, K⁺, F⁻-ийн Z, тохиргоо, бүлэг, үеийн хүснэгтийг бие даан бөглүүлнэ (3 мин), дараа нь мөр мөрөөр шалгана. Hinge 3: 2,8,6 тохиргоотой атом.',
          'Students fill the table of Z, configuration, group and period for N, Al, S, Ar, K⁺ and F⁻ alone (3 min), then check row by row. Hinge 3: an atom with configuration 2,8,6.'
        ),
        bi('Чимээгүй бөглөөд өөр өнгийн үзгээр өөрийгөө засна; hinge-д ABCD хуруугаар санал өгнө.', 'Work in silence, then mark in a different colour; vote on the hinge with ABCD fingers.'),
        bi('N 2,5 V/2; Al 2,8,3 III/3; S 2,8,6 VI/3; Ar 2,8,8 VIII/3; K⁺ 2,8,8; F⁻ 2,8; hinge: A (VI бүлэг, 3-р үе).', 'N 2,5 V/2; Al 2,8,3 III/3; S 2,8,6 VI/3; Ar 2,8,8 VIII/3; K⁺ 2,8,8; F⁻ 2,8; hinge: A (Group VI, Period 3).')
      ],
      [
        bi('Шалгалтын дасгал ба алдаа засах', 'Exam practice and error clinic'),
        bi(
          '³¹₁₅P-ийн дөрвөн хэсэгтэй шалгалтын асуулт (бөөмсийн тоо, P ба P³⁻-ийн тохиргоо, изотопын тодорхойлолт, (E) Ar(Ga)); дараа нь шалгалтын зөвлөмж ба "алдаа засах": O²⁻-д хэдэн электрон вэ?',
          'A four-part exam question on ³¹₁₅P (particle numbers, configurations of P and P³⁻, the definition of isotopes, (E) Ar(Ga)); then the exam tips and the error clinic: how many electrons in O²⁻?'
        ),
        bi('Шалгалтын нөхцөлд 4 минут бичээд хостойгоо солилцож, оноо бүрийг тэмдэглэнэ; нэг алдааг ногоон үзгээр засна.', 'Write for 4 minutes under exam conditions, swap papers and tick each marking point; fix one mistake in green pen.'),
        bi('15/16/15; P 2,8,5 ба P³⁻ 2,8,8; Ar(Ga) = 69.8; O²⁻-д 10 электрон.', '15/16/15; P 2,8,5 and P³⁻ 2,8,8; Ar(Ga) = 69.8; O²⁻ has 10 electrons.')
      ],
      [
        bi('Нэгтгэл ба гарах билет', 'Summary and exit ticket'),
        bi(
          'Концепт зураглалаар нэгтгэж, эхний санал хураалт руу буцна. Гарах билет: ⁵⁶Fe-ийн нейтрон, Mg²⁺-ийн тохиргоо, 2,8,8,2-ийн бүлэг ба үе, (E) ¹²C ба ¹⁴C. Зорилгоо дахин үнэлүүлнэ.',
          'Pull it together with the concept map and return to the opening vote. Exit ticket: neutrons in ⁵⁶Fe, the configuration of Mg²⁺, the group and period of 2,8,8,2, (E) ¹²C and ¹⁴C. Students rate the objectives again.'
        ),
        bi('Зураглалыг хуулж нэг холбоос сум нэмнэ; гарах билетийг ганцаараа бөглөнө; 🟢🟡🔴-ээр өөрийгөө үнэлнэ.', 'Copy the map and add one cross-link; complete the exit ticket alone; rate themselves 🟢🟡🔴.'),
        bi('Гарах билетийн оноо; 🔴 зорилгыг дараагийн хичээлийн эхэнд давтана.', 'Exit-ticket score; 🔴 objectives are revisited at the start of the next lesson.')
      ]
    ]),
    [
      exitItem(
        bi('Калийн (Z = 19) электрон тохиргоо аль нь вэ?', 'What is the electronic configuration of potassium (Z = 19)?'),
        [bi('2,8,9', '2,8,9'), bi('2,8,8,1', '2,8,8,1'), bi('2,9,8', '2,9,8'), bi('2,8,1,8', '2,8,1,8')],
        1,
        bi('Z ≤ 20 үед 3-р давхарга 8 электронтой; 19-р электрон 4-р давхаргад орно.', 'For Z ≤ 20 the third shell holds 8; the 19th electron goes into the fourth shell.')
      ),
      exitItem(
        bi('Mg²⁺ ионы электрон тохиргоо аль нь вэ?', 'What is the electronic configuration of the Mg²⁺ ion?'),
        [bi('2,8,2', '2,8,2'), bi('2,8', '2,8'), bi('2,8,8', '2,8,8'), bi('2,6', '2,6')],
        1,
        bi('Mg 2,8,2 нь гаднах 2 электроноо алдаж 2,8 болно.', 'Mg 2,8,2 loses its 2 outer electrons to become 2,8.')
      ),
      exitItem(
        bi('2,8,6 тохиргоотой атом аль бүлэг, аль үед байх вэ?', 'An atom has the configuration 2,8,6. Where is it in the Periodic Table?'),
        [
          bi('VI бүлэг, 3-р үе', 'Group VI, Period 3'),
          bi('III бүлэг, 6-р үе', 'Group III, Period 6'),
          bi('VIII бүлэг, 3-р үе', 'Group VIII, Period 3'),
          bi('VI бүлэг, 2-р үе', 'Group VI, Period 2')
        ],
        0,
        bi('6 гаднах электрон → VI бүлэг; 3 давхарга → 3-р үе (хүхэр).', '6 outer electrons → Group VI; 3 occupied shells → Period 3 (sulfur).')
      ),
      exitItem(
        bi('Аль ион неонтой ижил электрон тохиргоотой вэ?', 'Which ion has the same electronic configuration as neon?'),
        [bi('K⁺', 'K⁺'), bi('Na⁺', 'Na⁺'), bi('Cl⁻', 'Cl⁻'), bi('Ca²⁺', 'Ca²⁺')],
        1,
        bi('Na⁺ ба Ne хоёулаа 2,8. K⁺, Cl⁻, Ca²⁺ нь 2,8,8 (аргонтой ижил).', 'Na⁺ and Ne are both 2,8. K⁺, Cl⁻ and Ca²⁺ are 2,8,8 (like argon).')
      )
    ],
    ID
  )
];

export const IG2_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'ig2-1': [
    term(bi('цөм', 'nucleus'), bi('Атомын төв дэх жижиг хэсэг; протон ба нейтронтой, атомын бараг бүх масс энд.', 'The tiny centre of an atom; it holds the protons and neutrons and almost all the mass.')),
    term(bi('протоны тоо (Z)', 'proton number (Z)'), bi('Атомын цөм дэх протоны тоо; атомын дугаар гэж бас нэрлэнэ.', 'The number of protons in the nucleus of an atom; also called the atomic number.')),
    term(bi('массын тоо (A)', 'mass number (A)'), bi('Цөм дэх протон ба нейтроны нийт тоо (нуклоны тоо).', 'The total number of protons and neutrons in the nucleus (nucleon number).')),
    term(bi('изотоп', 'isotopes'), bi('Протоны тоо ижил боловч нейтроны тоо өөр, нэг элементийн атомууд.', 'Atoms of the same element with the same number of protons but different numbers of neutrons.')),
    term(
      bi('харьцангуй атом масс, Ar (E)', 'relative atomic mass, Ar (E)'),
      bi('Элементийн изотопуудын дундаж масс, ¹²C атомын массын 1/12-тэй харьцуулсан.', 'The average mass of the isotopes of an element compared with 1/12 of the mass of a carbon-12 atom.')
    )
  ],
  'ig2-2': [
    term(bi('электрон тохиргоо', 'electronic configuration'), bi('Электронуудын давхаргад байрлах байдал, жишээ нь 2,8,1.', 'The arrangement of electrons in shells, e.g. 2,8,1.')),
    term(bi('давхарга (энергийн түвшин)', 'shell (energy level)'), bi('Цөмийг тойрох электроны түвшин; эхнийх 2, дараагийнх 8 хүртэл электрон авна (Z ≤ 20).', 'A level of electrons around the nucleus; the first holds 2, the next ones 8 (Z ≤ 20).')),
    term(bi('гаднах давхаргын электрон', 'outer-shell electrons'), bi('Хамгийн гадна давхаргын электронууд; тэдгээрийн тоо = бүлгийн дугаар (I–VII).', 'The electrons in the outermost shell; their number = the group number (I–VII).')),
    term(bi('үе', 'period'), bi('Үелэх системийн хэвтээ мөр; дугаар нь эзэлсэн давхаргын тоотой тэнцүү.', 'A horizontal row of the Periodic Table; its number equals the number of occupied shells.')),
    term(bi('инертийн хийн тохиргоо', 'noble gas configuration'), bi('Гаднах давхарга дүүрэн тохиргоо (He 2, Ne 2,8, Ar 2,8,8); ионууд ийм тохиргоотой болдог.', 'A full outer shell (He 2, Ne 2,8, Ar 2,8,8); ions take this configuration.'))
  ]
};

export const IG2_PRACTICE_A: Record<string, PracticeItem[]> = {
  'ig2-1': [
    easy(
      bi('Нейтроны харьцангуй цэнэг хэд вэ?', 'What is the relative charge of a neutron?'),
      [bi('+1', '+1'), bi('0', '0'), bi('−1', '−1'), bi('1/1840', '1/1840')],
      1,
      bi('Нейтрон цэнэггүй; 1/1840 нь электроны харьцангуй масс.', 'A neutron has no charge; 1/1840 is the relative mass of an electron.')
    ),
    easy(
      bi('²⁷₁₃Al³⁺ ионд хэдэн электрон байх вэ?', 'How many electrons are in the ion ²⁷₁₃Al³⁺?'),
      [bi('13', '13'), bi('14', '14'), bi('10', '10'), bi('16', '16')],
      2,
      bi('Электрон = Z − цэнэг = 13 − 3 = 10. Протоны тоо 13 хэвээр.', 'Electrons = Z − charge = 13 − 3 = 10. The proton number stays 13.')
    ),
    hard(
      bi('(E) Галли 60% ⁶⁹Ga ба 40% ⁷¹Ga-аас тогтоно. Ar(Ga)-ийг тооцоод, хариу яагаад 69-д ойр болохыг тайлбарла.', '(E) Gallium is 60% ⁶⁹Ga and 40% ⁷¹Ga. Calculate Ar(Ga) and explain why the answer is closer to 69.'),
      bi('(69 × 60 + 71 × 40) ÷ 100 = (4140 + 2840) ÷ 100 = 69.8. ⁶⁹Ga илүү элбэг тул дундаж нь 69-д ойр.', '(69 × 60 + 71 × 40) ÷ 100 = (4140 + 2840) ÷ 100 = 69.8. ⁶⁹Ga is more abundant, so the mean is closer to 69.'),
      bi('Масс бүрийг элбэгшлээр үржүүлж, нэмээд 100-д хуваана. (69 + 71) ÷ 2 = 70 гэх нь буруу.', 'Multiply each mass by its abundance, add and divide by 100. (69 + 71) ÷ 2 = 70 is wrong.')
    )
  ],
  'ig2-2': [
    easy(
      bi('Цахиурын (Z = 14) электрон тохиргоо аль нь вэ?', 'What is the electronic configuration of silicon (Z = 14)?'),
      [bi('2,8,4', '2,8,4'), bi('2,4,8', '2,4,8'), bi('2,12', '2,12'), bi('8,2,4', '8,2,4')],
      0,
      bi('2 + 8 + 4 = 14; Si нь IV бүлэг, 3-р үе.', '2 + 8 + 4 = 14; Si is in Group IV, Period 3.')
    ),
    easy(
      bi('Элемент 3 давхаргатай, гаднах давхаргадаа 7 электронтой. Энэ юу вэ?', 'An element has 3 shells and 7 outer electrons. What is it?'),
      [bi('Фтор', 'Fluorine'), bi('Хлор', 'Chlorine'), bi('Азот', 'Nitrogen'), bi('Аргон', 'Argon')],
      1,
      bi('2,8,7 = 17 электрон → хлор (VII бүлэг, 3-р үе).', '2,8,7 = 17 electrons → chlorine (Group VII, Period 3).')
    ),
    hard(
      bi('Хлорын атом (Z = 17) ба хлорид ионы (Cl⁻) тохиргоог бичиж, хлорын бүлэг ба үеийг тохиргоонд тулгуурлан тайлбарла.', 'Write the configurations of a chlorine atom (Z = 17) and a chloride ion (Cl⁻), and use them to explain the group and period of chlorine.'),
      bi('Cl 2,8,7; Cl⁻ 2,8,8. Гаднах 7 электрон → VII бүлэг; 3 давхарга → 3-р үе. Cl⁻ нь 1 электрон авч аргоны тохиргоотой болсон.', 'Cl 2,8,7; Cl⁻ 2,8,8. 7 outer electrons → Group VII; 3 shells → Period 3. Cl⁻ has gained 1 electron and has the argon configuration.'),
      bi('Бүлэг ба үеийг ионы биш, атомын тохиргооноос тодорхойлно.', 'Find the group and period from the atom, not from the ion.')
    )
  ]
};
