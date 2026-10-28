// AS 9701 chapter 3 (chemical bonding), lessons 1–2. They follow the deck 04_Ch4_Chemical_Bonding.pptx and its plan of
// four 60-minute lessons: ionic and covalent bonding (slides 1–20) and shapes, σ and π bonds (slides 21–33). Every question,
// answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'as3';

export const AS3_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Ионы ба ковалент холбоо', 'Ionic and covalent bonding'),
    bi(
      'Ионы, ковалент, донор-акцептор холбоог dot-and-cross диаграмаар зурах; өргөссөн октет ба электрон дутагдалттай атомыг таних; холбооны энерги ба уртыг харьцуулах (хөтөлбөр 3.2, 3.4, 3.6; слайд 1–20).',
      'Draw dot-and-cross diagrams for ionic, covalent and co-ordinate bonds; identify expanded octets and electron-deficient atoms; compare bond energies and lengths (syllabus 3.2, 3.4, 3.6; slides 1–20).'
    ),
    [
      bi('Ионы холбоо: металл электрон алдаж эерэг ион, металл бус электрон авч сөрөг ион болно. Эсрэг цэнэгтэй ионуудын цахилгаан таталцал.', 'Ionic bond: a metal loses electrons to form a positive ion, a non-metal gains them to form a negative ion. Electrostatic attraction between oppositely charged ions.'),
      bi('Ковалент холбоо: хоёр цөмийн хоорондох хуваалцсан электрон хосын таталцал. Дан, давхар (2 хос), гурвалсан (3 хос).', 'Covalent bond: attraction between two nuclei and a shared pair of electrons. Single, double (two pairs) or triple (three pairs).'),
      bi('Донор-акцептор холбоо: нэг атом бүхэл хосыг өгнө (ганц хостой атом), нөгөө нь хоосон орбиталтай байна.', 'Co-ordinate bond: one atom provides both electrons (it has a lone pair), the other has an empty orbital.'),
      bi('Электрон дутагдалттай (BF₃) ба өргөссөн октет (SF₆, PCl₅, SO₂). Өргөсгөж чадах нь 3-р үеийн атом; 2-р үеийнх чадахгүй.', 'Electron deficient (BF₃) and expanded octet (SF₆, PCl₅, SO₂). Only Period 3 atoms can expand the octet; Period 2 atoms cannot.'),
      bi('Холбооны урт богино бол холбоо хүчтэй: C–C 0.154 nm, 350 kJ mol⁻¹; C=C 0.134 nm, 610 kJ mol⁻¹; N≡N 994 kJ mol⁻¹.', 'The shorter the bond, the stronger it is: C–C 0.154 nm, 350 kJ mol⁻¹; C=C 0.134 nm, 610 kJ mol⁻¹; N≡N 994 kJ mol⁻¹.')
    ],
    lessonSteps(
      [
        [
          bi('Нээлт, түлхүүр үг, зорилго, сэргээн санах', 'Opening, key terms, intentions and retrieval'),
          bi('Ус дээр гулгадаг шавжаас эхэл. 20 түлхүүр үгийг танилцуулж, зорилгуудыг fist to five-аар үнэлүүлнэ. Сэргээн санах: Na⁺ ба Cl⁻-ийн электрон бүтэц, Group 15 ба Group 2-ын гаднах электрон.', 'Start with the insect that skates on water. Introduce the 20 key terms and have students rate the intentions fist to five. Retrieval: the electronic configurations of Na⁺ and Cl⁻, outer electrons in Group 15 and Group 2.'),
          bi('Quiz–quiz–trade-аар түлхүүр үгийг хосоороо асууна; show-me boards дээр Na⁺ [2,8] ба Cl⁻ [2,8,8] бичнэ.', 'Test each other on the key terms with quiz–quiz–trade; write Na⁺ [2,8] and Cl⁻ [2,8,8] on show-me boards.'),
          bi('Мини самбарт Na⁺ [2,8] ба Cl⁻ [2,8,8] зөв бичсэн эсэх.', 'Mini-whiteboards: Na⁺ [2,8] and Cl⁻ [2,8,8] written correctly.')
        ],
        [
          bi('Ионы холбоо: NaCl, MgO, CaF₂', 'Ionic bonding: NaCl, MgO, CaF₂'),
          bi('Na-аас Cl руу электрон шилжилтийг үзүүлнэ. MgO ба CaF₂-ийн dot-and-cross; цэнэгийн тэнцвэр (+2 + 2(−1) = 0). You do: KCl, Na₂O, CaO, MgCl₂ — 5 минут.', 'Show the electron transfer from Na to Cl. Dot-and-cross for MgO and CaF₂; charge balance (+2 + 2(−1) = 0). You do: KCl, Na₂O, CaO, MgCl₂ in 5 minutes.'),
          bi('Predict: CaF₂-д F атом бүр хэдэн электрон авах вэ? Дараа нь хос тус бүр шалгана.', 'Predict how many electrons each F gains in CaF₂, then check with a partner.'),
          bi('Ионы диаграммд хаалт, цэнэг, гаднах давхарга зөв бичсэн эсэх.', 'Ionic diagrams with correct brackets, charges and outer shells only.')
        ],
        [
          bi('Ковалент холбоо: энгийн молекул, давхар ба гурвалсан', 'Covalent bonding: simple, double and triple bonds'),
          bi('Cl₂-ийн хуваалцсан хос; CH₄, H₂O, NH₃, HCl-ийн холбооны ба ганц хосыг тоолуулна. O₂, CO₂, C₂H₄, N₂. You do: CCl₄, PCl₃, BeCl₂, SbF₅, COCl₂, CS₂ — 6 минут шалгалтын нөхцөлд.', 'The shared pair in Cl₂; count bond and lone pairs in CH₄, H₂O, NH₃, HCl. O₂, CO₂, C₂H₄, N₂. You do: CCl₄, PCl₃, BeCl₂, SbF₅, COCl₂, CS₂ — 6 minutes under exam conditions.'),
          bi('Атом бүрт дутуу электронийн тоо = холбооны тоо: O 2, N 3, C 4. Электроныг хосоор зур.', 'The number of missing electrons on each atom = the number of bonds: O 2, N 3, C 4. Draw the electrons in pairs.'),
          bi('Cl₂-ийн Cl бүр 3 ганц хостой; CO₂-ийн C-д ганц хос байхгүй.', 'Each Cl in Cl₂ has 3 lone pairs; C in CO₂ has no lone pair.')
        ],
        [
          bi('Донор-акцептор холбоо, холбооны энерги ба урт', 'Co-ordinate bonds, bond energy and bond length'),
          bi('NH₄⁺ ба Al₂Cl₆-ийн донор-акцептор холбоог үзүүлнэ. You do: F₃BNH₃ ба PH₄⁺. We do: HCl, HBr, HI-ийн урт ба энергийн хамаарал, HF-ийн уртыг таамаглах.', 'Show the co-ordinate bonds in NH₄⁺ and Al₂Cl₆. You do: F₃BNH₃ and PH₄⁺. We do: the relationship between length and energy for HCl, HBr and HI, and predict the length of HF.'),
          bi('Сумыг донороос хүлээн авагч руу зурна. "Longer → weaker" гэж шалтгаантайгаар хэлнэ.', 'Draw the arrow from donor to acceptor. Say "longer → weaker", with the reason.'),
          bi('Сумны чиглэл ба холбооны урт/энергийн харьцаа зөв эсэх.', 'Arrow direction and the length/energy relationship correct.')
        ],
        [
          bi('Hinge асуулт ба гарах билет', 'Hinge questions and exit ticket'),
          bi('3-2-1 finger vote: CaF₂-ийн ион, NH₃-ийн хос, Al₂Cl₆-ийн донор-акцептор. 60%-иас доош бол "Co-ordinate bonding" слайдыг 2 минут давтана.', '3-2-1 finger vote: the ions in CaF₂, the pairs in NH₃ and the co-ordinate bond in Al₂Cl₆. Below 60 %, repeat the co-ordinate bonding slide for 2 minutes.'),
          bi('A/B/C/D-г нэгэн зэрэг үзүүлнэ; дараа нь гарах билет бөглөнө.', 'Show A/B/C/D together, then complete the exit ticket.'),
          bi('Гарах билетийн оноо.', 'Exit ticket score.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('CaF₂ дахь ионууд юу вэ?', 'What ions does CaF₂ contain?'),
        [bi('Ca²⁺ ба F₂ молекул', 'Ca²⁺ and an F₂ molecule'), bi('Ca²⁺ ба нэг F⁻', 'Ca²⁺ and one F⁻'), bi('Ca²⁺ ба хоёр F⁻', 'Ca²⁺ and two F⁻'), bi('Ca–F ковалент холбоо', 'covalent Ca–F bonds')],
        2,
        bi('+2 ба 2 × (−1) = 0.', '+2 and 2 × (−1) = 0.')
      ),
      exitItem(
        bi('NH₃-ийн азотын атом дээр юу байдаг вэ?', 'What does the N atom in NH₃ have?'),
        [bi('4 холбооны хос', '4 bond pairs'), bi('3 холбооны хос + 1 ганц хос', '3 bond pairs + 1 lone pair'), bi('3 холбооны хос', '3 bond pairs only'), bi('2 холбооны хос + 2 ганц хос', '2 bond pairs + 2 lone pairs')],
        1,
        bi('N-д 5 гаднах электрон: 3 холбоо + 1 ганц хос.', 'N has 5 outer electrons: 3 bonds + 1 lone pair.')
      ),
      exitItem(
        bi('Al₂Cl₆-д донор-акцептор холбоо яаж үүсдэг вэ?', 'How does the co-ordinate bond form in Al₂Cl₆?'),
        [bi('Al нь Cl-д хос өгнө', 'Al gives a pair to Cl'), bi('Al ба Al хуваалцана', 'Al shares with Al'), bi('Cl ба Cl хуваалцана', 'Cl and Cl share'), bi('Cl нь Al-д ганц хос өгнө', 'Cl gives a lone pair to Al')],
        3,
        bi('Al электрон дутагдалттай, хоосон орбиталтай тул хүлээн авна.', 'Al is electron deficient with an empty orbital, so it accepts the pair.')
      ),
      exitItem(
        bi('HCl → HI-д холбооны урт өсөхөд холбооны энерги юу болох вэ?', 'As the bond length increases from HCl to HI, what happens to the bond energy?'),
        [bi('Өснө', 'It increases'), bi('Буурна', 'It decreases'), bi('Ижил хэвээр', 'It stays the same'), bi('Эхлээд өснө', 'It first increases')],
        1,
        bi('HCl 431, HBr 366, HI 299 kJ mol⁻¹.', 'HCl 431, HBr 366, HI 299 kJ mol⁻¹.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Молекулын хэлбэр, σ ба π холбоо', 'Molecular shapes, σ and π bonds'),
    bi(
      'VSEPR-ээр молекулын хэлбэр ба холбооны өнцгийг таамаглах; σ ба π холбоо, гибридизацийг тайлбарлах (хөтөлбөр 3.4; слайд 21–33).',
      'Predict molecular shapes and bond angles with VSEPR; explain σ and π bonds and hybridisation (syllabus 3.4; slides 21–33).'
    ),
    [
      bi('VSEPR: электрон хосууд бие биенээ түлхэж, аль болох хол байрлана. Түлхэлт: ганц хос–ганц хос > ганц хос–холбооны хос > холбооны хос–холбооны хос.', 'VSEPR: electron pairs repel each other and sit as far apart as possible. Repulsion: lone–lone > lone–bond > bond–bond.'),
      bi('Өнцөг: CH₄ 109.5° → NH₃ ≈107° → H₂O ≈104.5°; ганц хос бүр өнцгийг ≈2.5° шахна. Давхар холбоо нэг "бүс" гэж тооцогдоно.', 'Angles: CH₄ 109.5° → NH₃ ≈107° → H₂O ≈104.5°; each lone pair compresses the angle by ≈2.5°. A double bond counts as one region.'),
      bi('Хэлбэр: CO₂ 180°, BF₃ 120°, PF₅ 120° ба 90° (бипирамид), SF₆ 90° (октаэдр).', 'Shapes: CO₂ 180°, BF₃ 120°, PF₅ 120° and 90° (bipyramid), SF₆ 90° (octahedron).'),
      bi('σ холбоо: end-on (тэнхлэгийн) давхцал. π холбоо: хажуугийн p орбиталын давхцал. Давхар холбоо = 1σ + 1π; гурвалсан = 1σ + 2π.', 'σ bond: end-on overlap along the axis. π bond: sideways overlap of p orbitals. Double = 1σ + 1π; triple = 1σ + 2π.'),
      bi('Гибридизаци: σ холбоо + ганц хосын тоо 4 → sp³, 3 → sp², 2 → sp.', 'Hybridisation: number of σ bonds plus lone pairs of 4 → sp³, 3 → sp², 2 → sp.')
    ],
    lessonSteps(
      [
        [
          bi('VSEPR: электрон хосууд түлхэлцэнэ', 'VSEPR: electron pairs repel'),
          bi('Бөмбөлгийн загвар: 2, 3, 4 бөмбөлгийг нэг цэгт уях. Түлхэлтийн дараалал ба хэлбэрийг тайлбарлана. Ганц хос хэлбэрт нөлөөлнө — тэр нь өнцгийг шахна.', 'Balloon model: tie 2, 3 and 4 balloons together. Explain the order of repulsion and the shape. Lone pairs affect the shape: they compress the angles.'),
          bi('Бөмбөлөг бүрийн хэлбэрийг нэрлэж, гараараа дүрсэлнэ.', 'Name the shape of each balloon arrangement and show it with your hands.'),
          bi('Air-draw: 2, 3, 4 хосын хэлбэр гар дээр зөв.', 'Air-draw: the shapes for 2, 3 and 4 pairs are right.')
        ],
        [
          bi('Дөрвөн хос: CH₄, NH₃, H₂O', 'Four pairs: CH₄, NH₃, H₂O'),
          bi('Өнцөг 109.5° → 107° → 104.5°. Тэр тусмаа ганц хос нэмэгдэх тусам өнцөг багасна. CO₂, BF₃, PF₅, SF₆-ийн хэлбэр; хүснэгт; predict: SO₂, PCl₃, SiCl₄ ба H₃O⁺.', 'Angles 109.5° → 107° → 104.5°. The more lone pairs, the smaller the angle. The shapes of CO₂, BF₃, PF₅, SF₆; the table; predict SO₂, PCl₃, SiCl₄ and H₃O⁺.'),
          bi('Show-me boards: гурван өнцгийг санаж бичнэ. Хүснэгтийн баганыг таглаад хэлбэр, өнцгийг асууна.', 'Show-me boards: write the three angles from memory. Cover a column of the table and recall the shape and angle.'),
          bi('NH₃-ийг пирамид, H₂O-г тахир гэж нэрлэсэн эсэх.', 'NH₃ named pyramidal and H₂O named non-linear.')
        ],
        [
          bi('Молекулын хэлбэр: worked example ба you do', 'Molecular shapes: worked example and you do'),
          bi('SbH₃-ийн 5 алхамт арга: бүлэг → электрон → хос → өнцөг → хэлбэр. You do: CCl₄, BeCl₂, PCl₃, H₂S, PH₃, SeF₆, (CH₃)₃N-ийн өнцөг — 6 минут шалгалтын нөхцөлд.', 'The 5-step method for SbH₃: group → electrons → pairs → angle → shape. You do: the shapes of CCl₄, BeCl₂, PCl₃, H₂S, PH₃, SeF₆ and the C–N–C angle in (CH₃)₃N — 6 minutes under exam conditions.'),
          bi('Алхам бүрийн өмнө "дараагийн алхам юу вэ?" гэж асууна. (CH₃)₃N-ийн асуултад CH₃ бүлэг H-ээс илүү түлхэлцэнэ гэдгийг ашиглана.', 'Before each step, ask "what is the next step?". For (CH₃)₃N, use the fact that CH₃ groups repel more than H.'),
          bi('Өнцөг 109.5°-аас бага, эсвэл CH₃ бүлгийн тухай шалтгаан зөв.', 'Angle below 109.5°, or the reason about the CH₃ groups given correctly.')
        ],
        [
          bi('σ ба π холбоо, гибридизаци', 'σ and π bonds, hybridisation'),
          bi('σ = end-on, π = sideways. Этан 7σ; этен 5σ + 1π; CO₂ 2σ + 2π; HCN ба N₂-ийн гурвалсан холбоо (1σ + 2π). Гибридизаци: sp³ (CH₄), sp² (C₂H₄), sp (HC≡CH, HCN, CO₂). We do: пропеналь, CH₃COOH.', 'σ = end-on, π = sideways. Ethane 7σ; ethene 5σ + 1π; CO₂ 2σ + 2π; the triple bond in HCN and N₂ (1σ + 2π). Hybridisation: sp³ (CH₄), sp² (C₂H₄), sp (HC≡CH, HCN, CO₂). We do: propenal, CH₃COOH.'),
          bi('Хурууны үзүүрээр (σ) ба алгаараа (π) давхцлыг дүрсэлнэ. Гибридизацийн дүрмийг хэлнэ: σ + ганц хос = 4 → sp³.', 'Show the overlap with fingertips (σ) and palms (π). State the hybridisation rule: σ bonds plus lone pairs = 4 → sp³.'),
          bi('Тоо ба гибридизаци зөв эсэх (этен: 5σ+1π, sp²).', 'Numbers and hybridisation correct (ethene: 5σ + 1π, sp²).')
        ],
        [
          bi('Hinge асуулт ба гарах билет', 'Hinge questions and exit ticket'),
          bi('Hinge: H₂O-ийн өнцөг (104.5°), PF₅-ийн хэлбэр (гурвалжин бипирамид), C₂H₄-ийн σ/π тоо (5σ + 1π). 60%-иас доош бол хүснэгтийг 3 минут давтана.', 'Hinges: the H–O–H angle in water (104.5°), the shape of PF₅ (trigonal bipyramidal), the σ/π count in C₂H₄ (5σ + 1π). Below 60 %, repeat the table for 3 minutes.'),
          bi('A/B/C/D-г хуруугаар 3-2-1-д нэгэн зэрэг үзүүлнэ.', 'Show A/B/C/D with fingers together on 3-2-1.'),
          bi('Гарах билетийн оноо.', 'Exit ticket score.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('H₂O-ийн H–O–H өнцөг ойролцоогоор?', 'The H–O–H angle in water is about …?'),
        [bi('107°', '107°'), bi('104.5°', '104.5°'), bi('109.5°', '109.5°'), bi('120°', '120°')],
        1,
        bi('2 ганц хос → 104.5°.', 'Two lone pairs → 104.5°.')
      ),
      exitItem(
        bi('PF₅-ийн хэлбэр юу вэ?', 'What is the shape of PF₅?'),
        [bi('Октаэдр', 'Octahedral'), bi('Квадрат хавтгай', 'Square planar'), bi('Тетраэдр', 'Tetrahedral'), bi('Гурвалжин бипирамид', 'Trigonal bipyramidal')],
        3,
        bi('5 холбооны хос: экваторт 120°, тэнхлэгт 90°.', '5 bond pairs: 120° in the plane, 90° to the axis.')
      ),
      exitItem(
        bi('C₂H₄-д хэдэн σ ба π холбоо байдаг вэ?', 'How many σ and π bonds are in C₂H₄?'),
        [bi('6σ', '6σ'), bi('4σ + 2π', '4σ + 2π'), bi('5σ + 1π', '5σ + 1π'), bi('4σ + 1π', '4σ + 1π')],
        2,
        bi('4 C–H + 1 C–C σ, плюс нэг π.', '4 C–H + 1 C–C σ, plus one π.')
      ),
      exitItem(
        bi('Гурвалсан холбоо юунаас бүрддэг вэ?', 'What is a triple bond made of?'),
        [bi('3σ', '3σ'), bi('1σ + 2π', '1σ + 2π'), bi('2σ + 1π', '2σ + 1π'), bi('3π', '3π')],
        1,
        bi('Нэг σ ба хоёр π (бие биендээ 90°).', 'One σ and two π (at 90° to each other).')
      )
    ],
    ID
  )
];

export const AS3_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'as3-1': [
    term(bi('Ионы холбоо', 'Ionic bond'), bi('Эсрэг цэнэгтэй ионуудын хоорондох цахилгаан таталцал', 'Electrostatic attraction between oppositely charged ions')),
    term(bi('Ковалент холбоо', 'Covalent bond'), bi('Хоёр атомын цөмийн ба хуваалцсан электрон хосын хоорондох таталцал', 'Attraction between the nuclei of two atoms and a shared pair of electrons')),
    term(bi('Ганц хос', 'Lone pair'), bi('Холбоонд оролцоогүй гаднах электрон хос', 'An outer-shell pair of electrons not used in bonding')),
    term(bi('Донор-акцептор холбоо', 'Co-ordinate (dative) bond'), bi('Нэг атом хоёр электроныг бүхэлд нь өгсөн ковалент холбоо', 'A covalent bond in which one atom provides both electrons')),
    term(bi('Электрон дутагдалттай', 'Electron deficient'), bi('Гаднах давхаргадаа 8-аас цөөн электронтой атом', 'An atom with fewer than 8 outer electrons')),
    term(bi('Өргөссөн октет', 'Expanded octet'), bi('Гаднах давхаргадаа 8-аас олон электронтой атом', 'An atom with more than 8 outer electrons')),
    term(bi('Холбооны энерги', 'Bond energy'), bi('Хийн төлөвт 1 моль холбоог тасалахад шаардагдах энерги', 'Energy needed to break 1 mol of a bond in the gaseous state')),
    term(bi('Холбооны урт', 'Bond length'), bi('Холбогдсон хоёр атомын цөм хоорондын зай', 'Internuclear distance between two bonded atoms'))
  ],
  'as3-2': [
    term(bi('VSEPR', 'VSEPR'), bi('Электрон хосууд түлхэлцэж, аль болох хол байрлах онол', 'Theory that electron pairs repel and sit as far apart as possible')),
    term(bi('Гибридизаци', 'Hybridisation'), bi('S ба p атомын орбиталыг холиж ижил энергитэй шинэ орбиталууд үүсгэх', 'Mixing of s and p atomic orbitals to form new orbitals of equal energy')),
    term(bi('σ холбоо', 'σ bond'), bi('Орбиталын тэнхлэгийн (end-on) давхцал', 'Overlap of orbitals end-on, along the axis')),
    term(bi('π холбоо', 'π bond'), bi('Хоёр p орбиталын хажуугийн (sideways) давхцал', 'Sideways overlap of two p orbitals'))
  ]
};

export const AS3_PRACTICE_A: Record<string, PracticeItem[]> = {
  'as3-1': [
    easy(
      bi('Аль молекулд октетыг өргөсгөсөн атом байдаг вэ?', 'Which molecule has an atom with an expanded octet?'),
      [bi('BF₃', 'BF₃'), bi('NH₃', 'NH₃'), bi('SF₆', 'SF₆'), bi('CH₄', 'CH₄')],
      2,
      bi('S нь 3-р үед байна; S-ийн эргэн тойронд 12 электрон.', 'S is in Period 3 with 12 electrons around it.')
    ),
    hard(
      bi('CO₂-ийн dot-and-cross диаграмыг зурж, C-д ганц хос байхгүйг тайлбарлана уу.', 'Draw the dot-and-cross diagram for CO₂ and explain why C has no lone pair.'),
      bi('O=C=O; C-ийн 4 гаднах электрон бүгд хоёр давхар холбоонд орсон.', 'O=C=O; all four outer electrons of C are in the two double bonds.'),
      bi('Хоёр давхар холбоо нь C-ийн 4 электронийг бүгдийг нь ашиглана.', 'The two double bonds use all four of C’s outer electrons.')
    )
  ],
  'as3-2': [
    easy(
      bi('Аль молекул шугаман вэ?', 'Which molecule is linear?'),
      [bi('NH₃', 'NH₃'), bi('H₂O', 'H₂O'), bi('CO₂', 'CO₂'), bi('CH₄', 'CH₄')],
      2,
      bi('CO₂: 2 бүс, ганц хосгүй → 180°.', 'CO₂: two regions, no lone pairs → 180°.')
    ),
    hard(
      bi('SO₂-ийн хэлбэр ба өнцгийг тайлбарлана уу.', 'Explain the shape and bond angle of SO₂.'),
      bi('Тахир (V-хэлбэр), ≈119–120°. S дээр 2 давхар холбоо + 1 ганц хос = 3 бүс; ганц хос өнцгийг багасгана.', 'Non-linear (V-shaped), ≈119–120°. S has 2 double bonds + 1 lone pair = 3 regions; the lone pair reduces the angle.'),
      bi('Давхар холбоо нь нэг бүс гэж тооцогдоно; ганц хос шахна.', 'A double bond counts as one region; the lone pair compresses the angle.')
    )
  ]
};
