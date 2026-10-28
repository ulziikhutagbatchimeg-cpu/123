// IGCSE 0620 chapter 2 (atoms, elements and chemical bonding), lessons 3–5 of 5. Each lesson follows one deck:
// Ch03_L1_Covalent_bonding.pptx, Ch03_L2_Ionic_bonding.pptx and Ch03_L3_Giant_structures.pptx (syllabus 2.1, 2.4–2.7).
// Every question, answer and definition here comes from those decks.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig2';

export const IG2_LESSONS_B: StatesLesson[] = [
  lesson(
    3,
    bi('Ковалент холбоо', 'Covalent bonding'),
    bi(
      'Элемент, нэгдэл, хольцыг ялгах; ковалент холбоог хуваалцсан хос электрон гэж тодорхойлох; H₂, Cl₂, H₂O, CH₄, NH₃, HCl-ийн цэг-загалмай диаграмм зурах; энгийн молекулын шинжийг тайлбарлах.',
      'Tell elements, compounds and mixtures apart; describe a covalent bond as a shared pair of electrons; draw dot-and-cross diagrams for H₂, Cl₂, H₂O, CH₄, NH₃ and HCl; explain the properties of simple molecules.'
    ),
    [
      bi('Элемент: нэг төрлийн атом. Нэгдэл: тогтмол харьцаагаар химийн аргаар нэгдсэн. Хольц: химийн аргаар нэгдээгүй.', 'Element: one type of atom. Compound: chemically combined in fixed proportions. Mixture: not chemically joined.'),
      bi('Ковалент холбоо = металл бус хоёр атомын хуваалцсан хос электрон; атом бүр инертийн хийн тохиргоотой болно (H: 2, бусад: 8).', 'A covalent bond = a pair of electrons shared between two non-metal atoms; each atom reaches a noble gas configuration (H: 2, others: 8).'),
      bi('Энгийн молекул: хайлах, буцлах цэг бага, дамжуулахгүй. (E) Молекул хоорондын хүч сул; буцлахад ковалент холбоо тасардаггүй.', 'Simple molecules: low melting and boiling points, do not conduct. (E) The forces between molecules are weak; boiling does not break covalent bonds.')
    ],
    lessonSteps([
      [
        bi('Эхлэл ба өмнөх мэдлэг', 'Start and retrieval'),
        bi(
          'O₂ ба N₂-ийн загварыг үзүүлж том асуулт тавина: хоёр металл бус атомыг юу барьж байна вэ? Давталт: Cl-ийн тохиргоо, C-ийн гаднах электрон, идэвхгүй бүлэг, O-д хэдэн электрон дутуу вэ.',
          'Show O₂ and N₂ and pose the big question: what holds two non-metal atoms together? Retrieval: the configuration of Cl, the outer electrons of C, the unreactive group, how many electrons O needs.'
        ),
        bi('Самбартаа бичээд 3-2-1-д зэрэг өргөнө.', 'Write on show-me boards and reveal together on 3-2-1.'),
        bi('2,8,7; 4; VIII бүлэг; 2.', '2,8,7; 4; Group VIII; 2.')
      ],
      [
        bi('Элемент, нэгдэл, хольц ба ковалент холбоо', 'Elements, compounds, mixtures and the covalent bond'),
        bi(
          'Fe + S хольцыг соронзоор салгаж, халаахад FeS нэгдэл үүсдэгийг тайлбарлана. Дараа нь H₂ ба Cl₂-оор ковалент холбоог хуваалцсан хос гэж үзүүлнэ: зөвхөн гаднах электрон, нэг атомынх цэг, нөгөөгийнх загалмай.',
          'Explain that the Fe + S mixture separates with a magnet but heating makes the compound FeS. Then use H₂ and Cl₂ to show a covalent bond as a shared pair: outer electrons only, dots for one atom, crosses for the other.'
        ),
        bi('Агаар, ус, хүчилтөрөгч, гууль, FeS, далайн ус, NaCl, зэсийг гурван бүлэгт ангилна; хоёр сурагч гараа нийлүүлж хуваалцсан хосыг үзүүлнэ.', 'Sort air, water, oxygen, brass, FeS, sea water, NaCl and copper into three groups; two students join hands to act out the shared pair.'),
        bi('Элемент: O₂, Cu; нэгдэл: H₂O, FeS, NaCl; хольц: агаар, гууль, далайн ус.', 'Elements: O₂, Cu; compounds: H₂O, FeS, NaCl; mixtures: air, brass, sea water.')
      ],
      [
        bi('Цэг-загалмай диаграмм', 'Dot-and-cross diagrams'),
        bi(
          'Метаныг (CH₄) 4 алхмаар зурна: C 2,4 → 4 холбоо, H → 1 холбоо, давхцал бүрт нэг цэг нэг загалмай, электроноо тоолж шалгах. Хамт: NH₃ (3 холбоо), H₂O (2 холбоо, O дээр 2 lone pair). (E) O=O, N≡N, O=C=O, C₂H₄, CH₃OH.',
          'Draw methane (CH₄) in 4 steps: C is 2,4 → 4 bonds, H → 1 bond, one dot and one cross in each overlap, count the electrons to check. Together: NH₃ (3 bonds) and H₂O (2 bonds, 2 lone pairs on O). (E) O=O, N≡N, O=C=O, C₂H₄ and CH₃OH.'
        ),
        bi('Хосоороо NH₃ ба H₂O-г зурж, солилцон атом бүрийн электроныг тоолно; бие даан HCl зурж, H₂S-ийн томьёог олно.', 'In pairs draw NH₃ and H₂O, swap and count the electrons round each atom; alone draw HCl and work out the formula H₂S.'),
        bi('HCl: 1 хос; CH₄-ийн холбоонд 8 электрон; H₂S; (E) C₂H₄: 6 хос, CH₃OH: 5 дан холбоо.', 'HCl: 1 shared pair; 8 electrons in the bonds of CH₄; H₂S; (E) C₂H₄: 6 pairs, CH₃OH: 5 single bonds.')
      ],
      [
        bi('Энгийн молекулын шинж', 'Properties of simple molecules'),
        bi(
          'Хайлах, буцлах цэг бага, дамжуулахгүй (ион ба чөлөөт электрон байхгүй). (E) Молекул доторх ковалент холбоо хүчтэй, молекул хоорондын хүч сул. Hinge 1–3: метаны диаграмм, P₄ дахь электрон, этанолын буцлах цэг.',
          'Low melting and boiling points; do not conduct (no ions or free electrons). (E) Covalent bonds inside molecules are strong; forces between molecules are weak. Hinges 1–3: the methane diagram, electrons in P₄, the boiling point of ethanol.'
        ),
        bi('Метан яагаад хий, гексан яагаад дамжуулахгүй, мөс хайлахад ковалент холбоо тасрах уу гэдэгт бичгээр хариулна; hinge-д ABCD хуруугаар санал өгнө.', 'Write why methane is a gas, why hexane does not conduct and whether melting ice breaks covalent bonds; vote on the hinges with ABCD fingers.'),
        bi('Hinge: C, A (12), B (молекул хоорондын хүч сул).', 'Hinges: C, A (12), B (weak forces between molecules).')
      ],
      [
        bi('Шалгалтын зөвлөмж ба гарах билет', 'Exam tips and exit ticket'),
        bi(
          'Оноо алдуулдаг 4 алдааг засуулна (буцлахад ковалент холбоо тасардаг; Cl₂-д Cl-д 7 электрон; металл + металл бус ковалент; lone pair зураагүй). Гарах билет: усны диаграмм, нэгдэл ба хольцын ялгаа, (E) хлор яагаад хий вэ.',
          'Correct the 4 mark-losing mistakes (boiling breaks covalent bonds; Cl in Cl₂ with 7 electrons; metal + non-metal is covalent; no lone pairs drawn). Exit ticket: the water diagram, one difference between a compound and a mixture, (E) why chlorine is a gas.'
        ),
        bi('Улаан мөр бүрийн алдааг өөрийн үгээр засна; гарах билетийг ганцаараа бөглөнө (5 оноо).', 'Correct each red line in their own words; complete the exit ticket alone (5 marks).'),
        bi('Гарах билетийн оноо; 3-аас доош бол дараагийн хичээлийн эхэнд метаны диаграммыг давтана.', 'Exit-ticket score; below 3, the methane diagram is repeated at the start of the next lesson.')
      ]
    ]),
    [
      exitItem(
        bi('Ковалент холбоо гэж юу вэ?', 'What is a covalent bond?'),
        [
          bi('Нэг атом нөгөөдөө электрон өгөх', 'One atom giving electrons to another'),
          bi('Хоёр атомын хуваалцсан хос электрон', 'A pair of electrons shared between two atoms'),
          bi('Эсрэг цэнэгтэй ионуудын таталцал', 'Attraction between oppositely charged ions'),
          bi('Молекул хоорондын сул хүч', 'A weak force between molecules')
        ],
        1,
        bi('Ковалент = хуваалцсан ХОС электрон. Электрон өгөх нь ионы холбоо.', 'Covalent = a shared PAIR of electrons. Giving electrons is ionic bonding.')
      ),
      exitItem(
        bi('NH₃ дахь азот хэдэн ковалент холбоо үүсгэх вэ?', 'How many covalent bonds does nitrogen form in NH₃?'),
        [bi('1', '1'), bi('2', '2'), bi('3', '3'), bi('5', '5')],
        2,
        bi('N нь 2,5 тул 3 электрон дутуу → 3 холбоо; үлдсэн 2 электрон lone pair болно.', 'N is 2,5 so it needs 3 more electrons → 3 bonds; the other 2 electrons form a lone pair.')
      ),
      exitItem(
        bi('Фосфор P₄ молекул үүсгэнэ. Нэг P₄ молекулын холбоонд хэдэн электрон хуваалцагдсан бэ?', 'Phosphorus forms P₄ molecules. How many electrons are shared in the bonds of one P₄ molecule?'),
        [bi('12', '12'), bi('8', '8'), bi('4', '4'), bi('2', '2')],
        0,
        bi('P₄-д 6 P–P холбоо; холбоо бүр нэг хос → 6 × 2 = 12.', 'P₄ has 6 P–P bonds; each is a shared pair → 6 × 2 = 12.')
      ),
      exitItem(
        bi('(E) Этанол (энгийн молекул) яагаад буцлах цэг багатай вэ?', '(E) Why does ethanol, a simple molecular substance, have a low boiling point?'),
        [
          bi('Ковалент холбоо нь сул', 'Its covalent bonds are weak'),
          bi('Молекул хоорондын хүч сул', 'The forces between its molecules are weak'),
          bi('Ионууд нь чөлөөтэй хөдөлдөг', 'Its ions are free to move'),
          bi('Атомууд нь маш жижиг', 'Its atoms are very small')
        ],
        1,
        bi('Буцлахад молекулууд л холддог; доторх ковалент холбоо тасрахгүй.', 'Boiling separates molecules; the covalent bonds inside them do not break.')
      ),
      exitItem(
        bi('Аль нь хольц вэ?', 'Which of these is a mixture?'),
        [bi('Ус', 'Water'), bi('Зэс', 'Copper'), bi('Агаар', 'Air'), bi('Натрийн хлорид', 'Sodium chloride')],
        2,
        bi('Агаарын бүрэлдэхүүн химийн аргаар нэгдээгүй; ус ба NaCl нь нэгдэл, зэс нь элемент.', 'The parts of air are not chemically joined; water and NaCl are compounds, copper is an element.')
      )
    ],
    ID
  ),
  lesson(
    4,
    bi('Ион ба ионы холбоо', 'Ions and ionic bonding'),
    bi(
      'Металл катион, металл бус анион үүсгэдгийг тайлбарлах; ионы холбоог тодорхойлох; I ба VII бүлгийн нэгдлийн (E: бусад нэгдлийн) цэг-загалмай диаграмм зурах; ионы нэгдлийн шинжийг тайлбарлах.',
      'Describe how metals form cations and non-metals form anions; define the ionic bond; draw dot-and-cross diagrams for Group I + Group VII compounds (E: other compounds); explain the properties of ionic compounds.'
    ),
    [
      bi('Металл гаднах электроноо алдаж катион (Na 2,8,1 → Na⁺ 2,8), металл бус электрон авч анион (Cl 2,8,7 → Cl⁻ 2,8,8) болно. Протоны тоо өөрчлөгдөхгүй.', 'Metals lose outer electrons → cations (Na 2,8,1 → Na⁺ 2,8); non-metals gain electrons → anions (Cl 2,8,7 → Cl⁻ 2,8,8). The number of protons does not change.'),
      bi('Ионы холбоо = эсрэг цэнэгтэй ионуудын хоорондох хүчтэй электростатик таталцал. Диаграммд: дөрвөлжин хаалт, цэнэг, зөвхөн гаднах давхарга.', 'Ionic bond = strong electrostatic attraction between oppositely charged ions. Diagrams: square brackets, the charge, outer shell only.'),
      bi('Хайлах цэг өндөр; хатуу үедээ дамжуулахгүй, хайлмал эсвэл уусмал үедээ дамжуулна (ион хөдөлнө). (E) Ээлжилсэн ионуудын аварга тор.', 'High melting points; do not conduct when solid but conduct when molten or dissolved (the ions move). (E) A giant lattice of alternating ions.')
    ],
    lessonSteps([
      [
        bi('Эхлэл ба өмнөх мэдлэг', 'Start and retrieval'),
        bi(
          'Том асуулт: аюултай натри ба хортой хлор хэрхэн хоолны давс болдог вэ? Давталт: ковалент холбоо, Na-ийн тохиргоо, аль төрлийн элемент электрон алддаг, энгийн молекул яагаад дамжуулахгүй.',
          'Big question: how do dangerous sodium and poisonous chlorine become table salt? Retrieval: the covalent bond, the configuration of Na, which type of element loses electrons, why simple molecules do not conduct.'
        ),
        bi('Самбартаа бичээд 3-2-1-д зэрэг өргөнө.', 'Write on show-me boards and reveal on 3-2-1.'),
        bi('Хуваалцсан хос; 2,8,1; металл; ион ба чөлөөт электрон байхгүй.', 'A shared pair; 2,8,1; metal; no ions and no free electrons.')
      ],
      [
        bi('Ион үүсэх ба NaCl дахь холбоо', 'Forming ions and the bond in NaCl'),
        bi(
          'Na → Na⁺ ба Cl → Cl⁻-ийг зургаар үзүүлнэ: цэнэг = алдсан эсвэл авсан электрон. Хамт: Mg, O, Al, F-ийн ионыг таамаглана. Дараа нь Na-ийн 1 электрон Cl рүү шилжиж, хоёр ион хүчтэй электростатик таталцлаар холбогдоно.',
          'Show Na → Na⁺ and Cl → Cl⁻: the charge = electrons lost or gained. Together predict the ions of Mg, O, Al and F. Then Na transfers its one electron to Cl, and the two ions are held by a strong electrostatic attraction.'
        ),
        bi('Металлд +, металл бусд − тэмдгийг агаарт зурна; ион ба цэнэгийг самбартаа бичнэ; "электрон" бөмбөгийг хостоо өгч тоглоно.', 'Air-draw + for metals and − for non-metals; write each ion and charge on boards; act out handing an "electron" ball to a partner.'),
        bi('Mg²⁺, O²⁻, Al³⁺, F⁻ – бүгд [2,8].', 'Mg²⁺, O²⁻, Al³⁺, F⁻ – all [2,8].')
      ],
      [
        bi('Ионы цэг-загалмай диаграмм', 'Ionic dot-and-cross diagrams'),
        bi(
          'LiF-ийг 4 алхмаар зурна: Li 2,1, F 2,7 → Li⁺ ба F⁻, ион бүрийг хаалтад цэнэгтэй нь, харьцаа 1 : 1. (E) MgO ба CaCl₂: Mg 2 электрон O-д; Ca 2 Cl тус бүрд 1 электрон.',
          'Draw LiF in 4 steps: Li 2,1 and F 2,7 → Li⁺ and F⁻, each ion in brackets with its charge, ratio 1 : 1. (E) MgO and CaCl₂: Mg gives 2 electrons to O; Ca gives 1 electron to each of two Cl.'
        ),
        bi('Алхам бүрт mini-whiteboard дээр хамт зурна; бие даан K-ийн ион, NaCl-ийн цэнэг, Na₂O, MgCl₂-ийн асуултад хариулна.', 'Draw along on mini-whiteboards, one step per click; alone answer the questions on the K ion, the charge of NaCl, Na₂O and MgCl₂.'),
        bi('Катион; цэнэг тэнцүү; Na₂O; Mg 2 Cl тус бүрд 1 электрон.', 'Cation; charges cancel; Na₂O; Mg gives 1 electron to each Cl.')
      ],
      [
        bi('Ионы тор ба шинж', 'The ionic lattice and properties'),
        bi(
          '(E) NaCl-ийн тор: Na⁺ бүрийг 6 Cl⁻ хүрээлнэ, NaCl "молекул" байхгүй. Шинж: хайлах цэг өндөр, хайлмал/уусмал дамжуулна, хатуу дамжуулахгүй, усанд уусамтгай, хэврэг. Ионы ба энгийн молекулын хүснэгтийг хамт бөглөнө.',
          '(E) The NaCl lattice: each Na⁺ is surrounded by 6 Cl⁻, and there is no "NaCl molecule". Properties: high melting point, conducts when molten or dissolved, not when solid, often soluble, brittle. Fill the ionic vs simple molecular table together.'
        ),
        bi('Хүснэгтийн мөр бүрт хоёр хариугаа самбартаа бичнэ; хатуу ба хайлмал NaCl-ийн дамжуулалтыг тайлбарлана.', 'Write both answers for each table row on boards; explain why solid NaCl does not conduct but molten NaCl does.'),
        bi('Ионы: шилжилт, ион, өндөр, үгүй, тийм; молекул: хуваалцах, молекул, бага, үгүй, үгүй.', 'Ionic: transferred, ions, high, no, yes; molecular: shared, molecules, low, no, no.')
      ],
      [
        bi('Hinge ба гарах билет', 'Hinges and exit ticket'),
        bi(
          'Hinge 1–3: ионы бүтэцтэй бодис, MgO үүсэх, хайлмал NaCl яагаад дамжуулдаг. Шалгалтын зөвлөмж. Гарах билет: KCl-ийн диаграмм, ионы нэгдлийн 2 шинж, (E) MgO-ийн томьёо ба ионы цэнэг.',
          'Hinges 1–3: the substance with an ionic structure, how MgO forms, why molten NaCl conducts. Exam tips. Exit ticket: the KCl diagram, two properties of ionic compounds, (E) the formula of MgO and its ion charges.'
        ),
        bi('ABCD хуруугаар санал өгнө; гарах билетийг ганцаараа бөглөнө (6 оноо).', 'Vote with ABCD fingers; complete the exit ticket alone (6 marks).'),
        bi('Hinge: C (KBr), C, B; гарах билетийн оноо.', 'Hinges: C (KBr), C, B; exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('Хөнгөнцагаан (2,8,3) ямар ион үүсгэх вэ?', 'Which ion does aluminium (2,8,3) form?'),
        [bi('Al³⁻', 'Al³⁻'), bi('Al⁺', 'Al⁺'), bi('Al³⁺', 'Al³⁺'), bi('Al⁵⁻', 'Al⁵⁻')],
        2,
        bi('Гаднах 3 электроноо алдаж Al³⁺ [2,8] болно.', 'It loses its 3 outer electrons to become Al³⁺ [2,8].')
      ),
      exitItem(
        bi('Ионы холбоо гэж юу вэ?', 'What is an ionic bond?'),
        [
          bi('Хоёр атомын хуваалцсан хос электрон', 'A pair of electrons shared between two atoms'),
          bi('Эсрэг цэнэгтэй ионуудын хоорондох хүчтэй электростатик таталцал', 'A strong electrostatic attraction between oppositely charged ions'),
          bi('Молекул хоорондын сул хүч', 'A weak force between molecules'),
          bi('Эерэг ион ба чөлөөт электроны таталцал', 'Attraction between positive ions and free electrons')
        ],
        1,
        bi('Электрон шилжиж ион үүснэ; холбоо нь + ба − ионуудын таталцал.', 'Electrons are transferred to form ions; the bond is the attraction between + and − ions.')
      ),
      exitItem(
        bi('Натри (2,8,1) хүчилтөрөгчтэй (2,6) урвалд орно. Томьёо нь юу вэ?', 'Sodium (2,8,1) reacts with oxygen (2,6). What is the formula?'),
        [bi('NaO', 'NaO'), bi('Na₂O', 'Na₂O'), bi('NaO₂', 'NaO₂'), bi('Na₂O₂', 'Na₂O₂')],
        1,
        bi('O-д 2 электрон хэрэгтэй, Na бүр 1 өгнө → 2 Na : 1 O.', 'O needs 2 electrons and each Na gives 1 → 2 Na : 1 O.')
      ),
      exitItem(
        bi('Хайлмал натрийн хлорид яагаад цахилгаан дамжуулдаг вэ?', 'Why does molten sodium chloride conduct electricity?'),
        [
          bi('Электронууд нь хөдөлдөг', 'Its electrons move'),
          bi('Ионууд нь чөлөөтэй хөдөлдөг', 'Its ions are free to move'),
          bi('Молекулууд нь хөдөлдөг', 'Its molecules move'),
          bi('Делокалчлагдсан электронтой', 'It has delocalised electrons')
        ],
        1,
        bi('Шингэнд ионууд хөдөлж цэнэг зөөнө; хатуу үед ион торондоо тогтсон.', 'In the liquid the ions move and carry the charge; in the solid they are fixed in the lattice.')
      ),
      exitItem(
        bi('(E) Магни хүчилтөрөгчтэй урвалд орж магнийн исэл үүсэхэд юу болох вэ?', '(E) What happens when magnesium reacts with oxygen to form magnesium oxide?'),
        [
          bi('Mg нь O-оос 2 электрон авна', 'Mg gains 2 electrons from O'),
          bi('O нь Mg-д 2 электрон өгнө', 'O loses 2 electrons to Mg'),
          bi('Mg нь O-д 2 электрон өгнө', 'Mg loses 2 electrons to O'),
          bi('Mg ба O 2 хос электрон хуваалцана', 'Mg and O share 2 pairs of electrons')
        ],
        2,
        bi('Металл электрон алдана: Mg → Mg²⁺; O → O²⁻.', 'The metal loses electrons: Mg → Mg²⁺; O → O²⁻.')
      )
    ],
    ID
  ),
  lesson(
    5,
    bi('Аварга бүтэц ба металлын холбоо', 'Giant structures and metallic bonding'),
    bi(
      'Алмаз ба графитын аварга ковалент бүтцийг тайлбарлаж хэрэглээтэй холбох; (E) SiO₂-ийг алмаз шиг бүтэц гэж тайлбарлах; (E) металлын холбоо, металл яагаад дамжуулдаг, хавтгайлагддаг, сунадгийг тайлбарлах.',
      'Describe the giant covalent structures of diamond and graphite and link them to their uses; (E) describe SiO₂ as a structure like diamond; (E) describe metallic bonding and explain why metals conduct and are malleable and ductile.'
    ),
    [
      bi('Алмаз: C бүр 4 хүчтэй ковалент холбоотой → маш хатуу, хайлах цэг маш өндөр, дамжуулахгүй → зүсэгч багаж.', 'Diamond: each C has 4 strong covalent bonds → very hard, very high melting point, does not conduct → cutting tools.'),
      bi('Графит: C бүр 3 холбоотой, зургаан өнцөгтийн давхарга; давхарга хоорондын хүч сул → гулсана (тосолгоо); C бүрийн 1 электрон делокалчлагдсан → дамжуулна (электрод).', 'Graphite: each C has 3 bonds in layers of hexagons; weak forces between layers → they slide (lubricant); one electron per C is delocalised → conducts (electrodes).'),
      bi('(E) Металлын холбоо = эерэг ионууд ба делокалчлагдсан электроны "тэнгис"-ийн таталцал → дамжуулна, хавтгайлагдана, сунана.', '(E) Metallic bond = attraction between positive ions and a "sea" of delocalised electrons → conducts, malleable, ductile.')
    ],
    lessonSteps([
      [
        bi('Эхлэл ба өмнөх мэдлэг', 'Start and retrieval'),
        bi(
          'Том асуулт: алмаз ба графит хоёулаа цэвэр нүүрстөрөгч – яагаад нэг нь хамгийн хатуу, нөгөө нь бичдэг шиг зөөлөн вэ? Давталт: ионы холбоо, хайлмал NaCl-ийн дамжуулалт, C хэдэн холбоо үүсгэдэг, метаны буцлах цэг.',
          'Big question: diamond and graphite are both pure carbon – why is one the hardest natural substance and the other soft enough to write with? Retrieval: the ionic bond, why molten NaCl conducts, how many bonds C forms, the boiling point of methane.'
        ),
        bi('Самбартаа бичээд 3-2-1-д зэрэг өргөнө.', 'Write on show-me boards and reveal on 3-2-1.'),
        bi('Слайд дээрх 4 хариу; 4-р асуултад "сул ковалент холбоо" гэж хариулаагүй.', 'The four answers on the slide; nobody answers Q4 with "weak covalent bonds".')
      ],
      [
        bi('Алмаз ба графит', 'Diamond and graphite'),
        bi(
          'Энгийн молекул ба аварга бүтцийг Зураг 3.30-аар ялгана. Алмаз: 4 холбоо, тетраэдр, хатуу, дамжуулахгүй. Графит: 3 холбоо, давхарга, давхарга хоорондын сул хүч, делокалчлагдсан электрон.',
          'Use Figure 3.30 to separate simple molecules from giant structures. Diamond: 4 bonds, tetrahedral, hard, does not conduct. Graphite: 3 bonds, layers, weak forces between layers, delocalised electrons.'
        ),
        bi('Нэг атом ба 4 холбоог агаарт зурна; харандааны графитыг хуруугаараа үрж мэдрэмжээ тайлбарлана.', 'Air-draw one atom with four bonds; rub pencil lead between fingers and explain the feel.'),
        bi('Алмаз 4, графит 3 холбоо; зөөлөн нь давхарга хоорондын хүчнээс, ковалент холбооноос биш.', 'Diamond 4, graphite 3 bonds; softness comes from the forces between layers, not from the covalent bonds.')
      ],
      [
        bi('Бүтэц ба хэрэглээ, (E) SiO₂', 'Structure and uses, (E) SiO₂'),
        bi(
          'Алмаз ба графитын хүснэгтийг хамт бөглөнө. Бие даан: графит яагаад электрод, алмаз яагаад өрөм, графит зөөлөн ч хайлах цэг өндөр. (E) SiO₂: Si бүр 4 O-той, O бүр 2 Si-тэй, алмаз шиг; CO₂ хий, SiO₂ 1700 °C орчим хайлна.',
          'Fill the diamond vs graphite table together. Alone: why graphite is used for electrodes, why diamond for drill bits, why soft graphite still has a high melting point. (E) SiO₂: each Si bonded to 4 O and each O to 2 Si, like diamond; CO₂ is a gas but SiO₂ melts at about 1700 °C.'
        ),
        bi('Мөр бүрт хоёр хариугаа самбартаа бичнэ; CO₂ ба SiO₂-ийг хосоороо нэг нэгээр нь тайлбарлана.', 'Write both answers for each row on boards; in pairs one explains CO₂ and the other SiO₂.'),
        bi('Дамжуулна (делокалчлагдсан электрон); маш хатуу (4 хүчтэй холбоо); давхарга доторх хүчтэй холбоо; нүүрстөрөгч.', 'Conducts (delocalised electrons); very hard (4 strong bonds); strong bonds within the layers; carbon.')
      ],
      [
        bi('(E) Металлын холбоо', '(E) Metallic bonding'),
        bi(
          'Металлын атом гаднах электроноо алдаж эерэг ион болно; электронууд делокалчлагдаж "тэнгис" үүсгэнэ. Дамжуулна (электрон хөдөлнө), давхарга гулсаад холбоо дахин үүсдэг тул хавтгайлагдаж, сунана. Дөрвөн бүтцийн хүснэгтээр нэгтгэнэ.',
          'Metal atoms lose their outer electrons to become positive ions; the electrons are delocalised into a "sea". Metals conduct (electrons move) and are malleable and ductile because layers slide and the bonds re-form. Pull together with the table of four structures.'
        ),
        bi('Сурагчид эерэг ион болж эгнэж, "электрон" нь тэдний дундуур хөдөлнө; зэсийн дамжуулалт, утас болох, хатуу Cu ба NaCl-ийн ялгааг бичнэ.', 'Students line up as + ions while "electrons" move between them; write about copper conducting, being drawn into wires, and solid Cu vs solid NaCl.'),
        bi('Делокалчлагдсан электрон хөдөлнө; давхарга гулсаж холбоо дахин үүснэ; Cu-д хөдөлгөөнт электрон, NaCl-д ион тогтсон.', 'Delocalised electrons move; layers slide and bonds re-form; Cu has mobile electrons, ions in NaCl are fixed.')
      ],
      [
        bi('Hinge ба гарах билет', 'Hinges and exit ticket'),
        bi(
          'Hinge 1–3: хатуу үедээ дамжуулдаг тосолгооны бодис, CO₂ ба SiO₂-ийн холбоо, металл яагаад хавтгайлагддаг. Шалгалтын зөвлөмж. Гарах билет: графитын хэрэглээ ба бүтэц, алмазын хайлах цэг, (E) металл яагаад дамжуулдаг.',
          'Hinges 1–3: the solid that conducts and is a lubricant, the bonding in CO₂ and SiO₂, why metals are malleable. Exam tips. Exit ticket: a use of graphite with its structure, the melting point of diamond, (E) why metals conduct.'
        ),
        bi('ABCD хуруугаар санал өгнө; гарах билетийг ганцаараа бөглөнө (6 оноо).', 'Vote with ABCD fingers; complete the exit ticket alone (6 marks).'),
        bi('Hinge: B (графит), C, B; гарах билетийн оноо.', 'Hinges: B (graphite), C, B; exit-ticket score.')
      ]
    ]),
    [
      exitItem(
        bi('Аль бодис хатуу үедээ цахилгаан дамжуулж, тосолгоонд хэрэглэгддэг вэ?', 'Which substance conducts electricity when solid and is used as a lubricant?'),
        [bi('Алмаз', 'Diamond'), bi('Графит', 'Graphite'), bi('Цахиурын (IV) исэл', 'Silicon(IV) oxide'), bi('Натрийн хлорид', 'Sodium chloride')],
        1,
        bi('Делокалчлагдсан электрон дамжуулна; давхарга хоорондын сул хүч гулсуулна.', 'Delocalised electrons conduct; weak forces between the layers let them slide.')
      ),
      exitItem(
        bi('Алмаз яагаад маш өндөр хайлах цэгтэй вэ?', 'Why does diamond have a very high melting point?'),
        [
          bi('Молекул хоорондын хүч хүчтэй', 'Strong intermolecular forces'),
          bi('Аварга ковалент; олон хүчтэй ковалент холбоог таслах ёстой', 'Giant covalent; many strong covalent bonds must be broken'),
          bi('Ионууд хүчтэй татагддаг', 'Its ions attract strongly'),
          bi('Делокалчлагдсан электронтой', 'It has delocalised electrons')
        ],
        1,
        bi('Алмазад молекул байхгүй; бүх атом хүчтэй ковалент холбоогоор холбогдсон.', 'Diamond has no molecules; every atom is joined by strong covalent bonds.')
      ),
      exitItem(
        bi('Графит яагаад зөөлөн вэ?', 'Why is graphite soft?'),
        [
          bi('Ковалент холбоо нь сул', 'Its covalent bonds are weak'),
          bi('Давхарга хоорондын хүч сул тул давхарга гулсана', 'The forces between layers are weak, so the layers slide'),
          bi('Ионууд нь хөдөлдөг', 'Its ions move'),
          bi('C бүр 4 холбоотой', 'Each C has 4 bonds')
        ],
        1,
        bi('Давхарга доторх ковалент холбоо хүчтэй; зөвхөн давхарга хоорондын хүч сул.', 'The covalent bonds within the layers are strong; only the forces between layers are weak.')
      ),
      exitItem(
        bi('(E) CO₂ ба SiO₂-ийн холбоог аль нь зөв тодорхойлсон бэ?', '(E) Which describes the bonding in carbon dioxide and in silicon(IV) oxide?'),
        [
          bi('CO₂: молекул хоорондын хүчтэй ковалент холбоо · SiO₂: аварга ковалент', 'CO₂: strong covalent bonds between molecules · SiO₂: giant covalent'),
          bi('CO₂: молекул хоорондын сул хүч · SiO₂: хүчтэй холбоотой молекулууд', 'CO₂: weak intermolecular forces · SiO₂: molecules held by strong bonds'),
          bi('CO₂: молекул хоорондын сул хүч · SiO₂: аварга ковалент', 'CO₂: weak intermolecular forces · SiO₂: giant covalent'),
          bi('CO₂: молекул хоорондын хүчтэй ковалент холбоо · SiO₂: молекулууд', 'CO₂: strong covalent bonds between molecules · SiO₂: molecules')
        ],
        2,
        bi('CO₂ энгийн молекул; SiO₂ хүчтэй ковалент холбоотой нэг аварга бүтэц.', 'CO₂ is simple molecular; SiO₂ is one giant structure with strong covalent bonds.')
      ),
      exitItem(
        bi('(E) Металл яагаад хавтгайлагддаг вэ?', '(E) Why are metals malleable?'),
        [
          bi('Электронууд нь тогтсон байрлалтай', 'Their electrons are fixed in place'),
          bi('Ионы давхарга металлын холбоог тасалгүй гулсдаг', 'Layers of ions slide without breaking the metallic bonding'),
          bi('Ионууд нь шингэн шиг чөлөөтэй хөдөлдөг', 'Their ions are free to move like a liquid'),
          bi('Ковалент холбоо нь сул', 'Their covalent bonds are weak')
        ],
        1,
        bi('Таталцал бүх чиглэлд үйлчилдэг тул давхарга гулсаад холбоо дахин үүснэ.', 'The attraction acts in all directions, so the bonds re-form after the layers slide.')
      )
    ],
    ID
  )
];

export const IG2_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'ig2-3': [
    term(bi('элемент', 'element'), bi('Химийн аргаар илүү энгийн бодис болгон задлах боломжгүй бодис.', 'A substance that cannot be split into simpler substances by chemical methods.')),
    term(bi('нэгдэл', 'compound'), bi('Тогтмол харьцаагаар химийн аргаар нэгдсэн хоёр буюу түүнээс дээш элемент.', 'Two or more elements chemically combined in fixed proportions.')),
    term(bi('хольц', 'mixture'), bi('Химийн аргаар нэгдээгүй хоёр буюу түүнээс дээш бодис.', 'Two or more substances that are not chemically joined.')),
    term(bi('ковалент холбоо', 'covalent bond'), bi('Хоёр атомын хооронд хуваалцсан хос электрон.', 'A pair of electrons shared between two atoms.')),
    term(bi('цэг-загалмай диаграмм', 'dot-and-cross diagram'), bi('Зөвхөн гаднах электроныг харуулна; нэг атомынх цэг, нөгөөгийнх загалмай.', 'Shows outer electrons only; dots from one atom, crosses from the other.')),
    term(bi('молекул хоорондын хүч (E)', 'intermolecular forces (E)'), bi('Молекулуудын хоорондох сул таталцлын хүч.', 'Weak forces of attraction between molecules.'))
  ],
  'ig2-4': [
    term(bi('ион', 'ion'), bi('Атом электрон алдах эсвэл авах үед үүсэх цэнэгтэй бөөм.', 'A charged particle formed when an atom loses or gains electrons.')),
    term(bi('катион', 'cation'), bi('Эерэг ион, жишээ нь Na⁺; металл электрон алдаж үүсгэнэ.', 'A positive ion, e.g. Na⁺ – formed by metals losing electrons.')),
    term(bi('анион', 'anion'), bi('Сөрөг ион, жишээ нь Cl⁻; металл бус электрон авч үүсгэнэ.', 'A negative ion, e.g. Cl⁻ – formed by non-metals gaining electrons.')),
    term(bi('ионы холбоо', 'ionic bond'), bi('Эсрэг цэнэгтэй ионуудын хоорондох хүчтэй электростатик таталцал.', 'Strong electrostatic attraction between oppositely charged ions.')),
    term(bi('электростатик таталцал', 'electrostatic attraction'), bi('Эсрэг цэнэгүүдийн (+ ба −) хоорондох хүч.', 'The force between opposite charges (+ and −).')),
    term(bi('аварга ионы тор (E)', 'giant ionic lattice (E)'), bi('Ээлжилсэн эерэг ба сөрөг ионуудын эмх цэгцтэй байрлал.', 'A regular arrangement of alternating positive and negative ions.'))
  ],
  'ig2-5': [
    term(bi('аварга ковалент бүтэц', 'giant covalent structure'), bi('Хүчтэй ковалент холбоогоор холбогдсон асар том атомын тор.', 'A huge lattice of atoms held together by strong covalent bonds.')),
    term(bi('делокалчлагдсан электрон', 'delocalised electrons'), bi('Бүтцийн дотор чөлөөтэй хөдөлж чадах электронууд.', 'Electrons that are free to move through a structure.')),
    term(bi('тосолгооны бодис', 'lubricant'), bi('Гадаргууг бие биен дээгүүр амархан гулсуулдаг бодис.', 'A substance that lets surfaces slide over each other easily.')),
    term(bi('металлын холбоо (E)', 'metallic bonding (E)'), bi('Эерэг металлын ионууд ба делокалчлагдсан электроны "тэнгис"-ийн хоорондох таталцал.', 'Attraction between positive metal ions and a "sea" of delocalised electrons.')),
    term(bi('хавтгайлагдах (E)', 'malleable (E)'), bi('Хагаралгүйгээр цохиж эсвэл нугалж хэлбэржүүлж болох.', 'Can be hammered or bent into shape without breaking.')),
    term(bi('сунамтгай (E)', 'ductile (E)'), bi('Сунгаж утас болгож болох.', 'Can be drawn out into wires.'))
  ]
};

export const IG2_PRACTICE_B: Record<string, PracticeItem[]> = {
  'ig2-3': [
    easy(
      bi('Аль хос элемент ковалент холбоо үүсгэх вэ?', 'Which pair of elements forms a covalent bond?'),
      [bi('Na + Cl', 'Na + Cl'), bi('C + Cl', 'C + Cl'), bi('Mg + O', 'Mg + O'), bi('K + F', 'K + F')],
      1,
      bi('Хоёулаа металл бус. Металл + металл бус нь ионы холбоо үүсгэнэ.', 'Both are non-metals. A metal + a non-metal form an ionic bond.')
    ),
    easy(
      bi('(E) Нэг этен (C₂H₄) молекулд нийт хэдэн хуваалцсан хос байх вэ?', '(E) How many shared pairs are in one ethene (C₂H₄) molecule altogether?'),
      [bi('4', '4'), bi('5', '5'), bi('6', '6'), bi('8', '8')],
      2,
      bi('4 C–H + C=C-д 2 = 6 хос.', '4 C–H + 2 in C=C = 6 pairs.')
    ),
    hard(
      bi('Усны цэг-загалмай диаграммыг тайлбарлаж, (E) хлор яагаад өрөөний температурт хий байдгийг тайлбарла.', 'Describe the dot-and-cross diagram of water, and (E) explain why chlorine is a gas at room temperature.'),
      bi(
        'H₂O: O ба H бүрийн хооронд нэг цэг + нэг загалмайтай 2 хуваалцсан хос; O дээр 2 lone pair, O-д 8, H бүрд 2 электрон. Хлор энгийн молекул; молекул хоорондын хүч сул тул давахад бага энерги шаардана.',
        'H₂O: 2 shared pairs (one dot + one cross) between O and each H; 2 lone pairs on O, so O has 8 and each H has 2. Chlorine is made of simple molecules; the forces between molecules are weak and need little energy to overcome.'
      ),
      bi('Lone pair зурахаа бүү март; "ковалент холбоо сул" гэвэл 0 оноо.', 'Do not forget the lone pairs; "weak covalent bonds" scores 0.')
    )
  ],
  'ig2-4': [
    easy(
      bi('Кали ямар төрлийн ион үүсгэх вэ, яагаад?', 'What type of ion does potassium form, and why?'),
      [
        bi('Анион – электрон авна', 'Anion – it gains an electron'),
        bi('Катион – 1 электрон алдана', 'Cation – it loses 1 electron'),
        bi('Анион – электрон алдана', 'Anion – it loses an electron'),
        bi('Ион үүсгэхгүй', 'It forms no ion')
      ],
      1,
      bi('Металл гаднах электроноо алдаж эерэг ион (K⁺) болно.', 'A metal loses its outer electron to become a positive ion (K⁺).')
    ),
    easy(
      bi('Аль нь цахилгаан дамжуулахгүй вэ?', 'Which of these does NOT conduct electricity?'),
      [bi('Хатуу NaCl', 'Solid NaCl'), bi('Хайлмал NaCl', 'Molten NaCl'), bi('NaCl-ийн уусмал', 'NaCl solution'), bi('Бүгд дамжуулна', 'All of them conduct')],
      0,
      bi('Хатуу үед ионууд торондоо тогтсон тул хөдөлж чадахгүй.', 'In the solid the ions are fixed in the lattice and cannot move.')
    ),
    hard(
      bi('(E) Натрийн хлорид яагаад хайлах цэг өндөртэйг тайлбарла. (2 оноо)', '(E) Explain why sodium chloride has a high melting point. (2 marks)'),
      bi(
        'Эсрэг цэнэгтэй ионуудын хоорондох хүчтэй электростатик таталцал [1]; түүнийг давахад их энерги шаардана [1].',
        'Strong electrostatic attraction between oppositely charged ions [1]; a lot of energy is needed to overcome it [1].'
      ),
      bi('"Хүчтэй холбоо" гээд зогсож болохгүй – "эсрэг цэнэгтэй ионуудын хооронд" гэж тодорхой бич.', 'Do not stop at "strong bonds" – write "between oppositely charged ions".')
    )
  ],
  'ig2-5': [
    easy(
      bi('Аль элемент аварга ковалент бүтэц үүсгэх вэ?', 'Which element forms a giant covalent structure?'),
      [bi('Иод', 'Iodine'), bi('Гели', 'Helium'), bi('Нүүрстөрөгч', 'Carbon'), bi('Хүчилтөрөгч', 'Oxygen')],
      2,
      bi('Нүүрстөрөгч алмаз ба графит үүсгэнэ; бусад нь энгийн молекул эсвэл дан атом.', 'Carbon forms diamond and graphite; the others are simple molecules or single atoms.')
    ),
    easy(
      bi('Алмазыг яагаад өрмийн хошуунд хэрэглэдэг вэ?', 'Why is diamond used in drill bits?'),
      [
        bi('Делокалчлагдсан электронтой', 'It has delocalised electrons'),
        bi('C бүр 4 хүчтэй ковалент холбоотой тул маш хатуу', 'Very hard – each C has 4 strong covalent bonds'),
        bi('Давхарга нь гулсдаг', 'Its layers slide'),
        bi('Хайлах цэг бага', 'It has a low melting point')
      ],
      1,
      bi('Хэрэглээг бүтэцтэй холбож бич – шалгалтад шалтгаан оноотой.', 'Link the use to the structure – the reason earns the mark.')
    ),
    hard(
      bi('(E) Хатуу зэс цахилгаан дамжуулдаг, харин хатуу натрийн хлорид дамжуулдаггүй. Яагаад вэ?', '(E) Solid copper conducts electricity but solid sodium chloride does not. Why?'),
      bi(
        'Зэсэд делокалчлагдсан электрон тор дундуур хөдөлнө. NaCl-д ионууд торондоо тогтсон, чөлөөт электрон байхгүй.',
        'Copper has delocalised electrons that move through the lattice. In NaCl the ions are fixed in the lattice and there are no free electrons.'
      ),
      bi('Харьцуулах асуултад хоёр бодисыг хоёуланг нь тайлбарла.', 'In a comparison question, explain both substances.')
    )
  ]
};
