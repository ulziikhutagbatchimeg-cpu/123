import type { ExamQuestion } from '../types/chemistry';
import { same, topUp } from './topUpBuild';

// IGCSE 0620 chapter 2 Atoms, elements and compounds: medium and hard questions for the topic quizzes. Original questions in
// the style of the teacher's decks Ch02 and Ch03, with other substances and numbers.
const CH = 'ch-atoms-bonding';
const t21 = topUp('s-2-1', CH, '0620/2.1');
const t22 = topUp('s-2-2', CH, '0620/2.2');
const t23 = topUp('s-2-3', CH, '0620/2.3');
const t24 = topUp('top-2-1', CH, '0620/2.4');
const t25 = topUp('s-2-5', CH, '0620/2.5');
const t26 = topUp('s-2-6', CH, '0620/2.6');
const t27 = topUp('s-2-7', CH, '0620/2.7');

export const TOP_UP_IG_02: ExamQuestion[] = [
  // 2.1 Elements, compounds and mixtures
  t21('m', 'Iron and sulfur', 'Төмөр ба хүхэр',
    'Iron filings and sulfur are heated together. Which observation shows that a compound has formed?', 'Төмрийн үртэс, хүхрийг хамт халаав. Аль ажиглалт нэгдэл үүссэнийг харуулах вэ?',
    [['The product is no longer attracted to a magnet', 'Бүтээгдэхүүн соронзонд татагдахаа больсон'], ['The mixture is yellow and grey', 'Хольц шар, саарал'], ['The iron can be picked out with tweezers', 'Төмрийг хясаагаар түүж болно'], ['The mass of iron is unchanged', 'Төмрийн масс өөрчлөгдөөгүй']], 'A',
    'Iron(II) sulfide is a new substance with new properties; in a mixture the iron would still be magnetic.', 'Төмрийн(II) сульфид шинэ шинжтэй шинэ бодис; хольцод төмөр соронзонд татагдсаар байх.'),
  t21('h', 'Melting over a range', 'Хүрээнд хайлах',
    'A solid melts gradually between 75 °C and 79 °C. What does this suggest?', 'Хатуу бодис 75 °C-аас 79 °C-ын хооронд аажмаар хайлна. Энэ юуг илтгэх вэ?',
    [['It is a pure element', 'Цэвэр элемент'], ['It is a mixture, not a pure substance', 'Цэвэр бодис биш, хольц'], ['It is a gas', 'Хий'], ['It is a pure compound', 'Цэвэр нэгдэл']], 'B',
    'A pure substance melts at one sharp temperature; impurities lower it and spread it over a range.', 'Цэвэр бодис нэг тодорхой температурт хайлна; хольц түүнийг бууруулж хүрээ болгоно.'),
  t21('m', 'A mixture of compounds', 'Нэгдлүүдийн хольц',
    'Which substance is a mixture of compounds?', 'Аль бодис нэгдлүүдийн хольц вэ?',
    [['Oxygen', 'Хүчилтөрөгч'], ['Copper', 'Зэс'], ['Sea water', 'Далайн ус'], ['Sodium chloride', 'Натрийн хлорид']], 'C',
    'Sea water is water with several dissolved salts; oxygen and copper are elements and NaCl is one compound.', 'Далайн ус нь хэд хэдэн давс уусгасан ус; хүчилтөрөгч, зэс элемент, NaCl нэг нэгдэл.'),
  t21('h', 'A compound and its elements', 'Нэгдэл ба түүний элементүүд',
    'Sodium is a soft reactive metal and chlorine is a toxic green gas, yet sodium chloride is table salt. What does this show?', 'Натри зөөлөн идэвхтэй металл, хлор хортой ногоон хий, гэтэл натрийн хлорид хоолны давс. Энэ юуг харуулах вэ?',
    [['A compound has the same properties as its elements', 'Нэгдэл элементүүдийнхээ шинжтэй ижил'], ['A compound has properties different from the elements it is made from', 'Нэгдэл бүрдүүлэгч элементүүдээсээ өөр шинжтэй'], ['Sodium chloride is a mixture', 'Натрийн хлорид хольц'], ['Chlorine is not really toxic', 'Хлор үнэндээ хортой биш']], 'B',
    'When elements combine chemically, a new substance with new properties forms.', 'Элементүүд химийн аргаар нэгдэхэд шинэ шинжтэй шинэ бодис үүснэ.'),

  // 2.2 Atomic structure and the Periodic Table
  t22('m', 'Electrons in magnesium', 'Магнийн электрон',
    'What is the electronic configuration of a magnesium atom (proton number 12)?', 'Магнийн атомын (протоны дугаар 12) электрон бүтэц ямар вэ?',
    same('2,10', '2,8,2', '8,2,2', '2,2,8'), 'B',
    'Shells fill 2, then 8, then the remaining 2.', 'Бүрхүүл 2, дараа нь 8, үлдсэн 2.'),
  t22('h', 'Seventeen electrons', 'Арван долоон электрон',
    'An atom has 17 electrons. In which group and period of the Periodic Table is it?', 'Атом 17 электронтой. Үелэх системийн аль бүлэг, аль үед байх вэ?',
    [['Group VII, Period 3', 'VII бүлэг, 3-р үе'], ['Group III, Period 7', 'III бүлэг, 7-р үе'], ['Group I, Period 3', 'I бүлэг, 3-р үе'], ['Group VII, Period 2', 'VII бүлэг, 2-р үе']], 'A',
    '2,8,7: three shells give Period 3 and seven outer electrons give Group VII (chlorine).', '2,8,7: гурван бүрхүүл 3-р үе, долоон гадаад электрон VII бүлэг (хлор).'),
  t22('m', 'Outer electrons of phosphorus', 'Фосфорын гадаад электрон',
    'How many electrons are in the outer shell of a phosphorus atom (proton number 15)?', 'Фосфорын атомын (протоны дугаар 15) гадаад бүрхүүлд хэдэн электрон байх вэ?',
    same('3', '5', '8', '15'), 'B',
    '2,8,5: five outer electrons, so phosphorus is in Group V.', '2,8,5: таван гадаад электрон, тиймээс фосфор V бүлэгт.'),
  t22('h', 'Calcium from its position', 'Байрлалаас кальци',
    'Calcium is in Group II and Period 4. What is its electronic configuration?', 'Кальци II бүлэг, 4-р үед байна. Электрон бүтэц нь юу вэ?',
    same('2,8,2', '2,8,8,2', '2,8,10', '2,2,8,8'), 'B',
    'Four shells (Period 4) with two outer electrons (Group II): 2,8,8,2.', 'Дөрвөн бүрхүүл (4-р үе), хоёр гадаад электрон (II бүлэг): 2,8,8,2.'),

  // 2.3 Isotopes
  t23('m', 'Isotopes of hydrogen', 'Устөрөгчийн изотоп',
    'How many neutrons are in atoms of ¹H and ²H?', '¹H ба ²H атомд хэдэн нейтрон байх вэ?',
    same('0 and 1', '1 and 2', '1 and 1', '0 and 2'), 'A',
    'Both have 1 proton; neutrons = nucleon number − proton number.', 'Хоёулаа 1 протонтой; нейтрон = нуклоны тоо − протоны тоо.'),
  t23('h', 'Relative atomic mass from isotopes', 'Изотопоос харьцангуй атомын масс',
    'An element is 90% ²⁰X and 10% ²²X. What is its relative atomic mass?', 'Элемент 90% ²⁰X, 10% ²²X-ээс бүрдэнэ. Харьцангуй атомын масс хэд вэ?',
    same('20.0', '20.2', '21.0', '22.0'), 'B',
    '(20 × 90 + 22 × 10) ÷ 100 = 20.2.', '(20 × 90 + 22 × 10) ÷ 100 = 20.2.'),
  t23('m', 'Why isotopes react alike', 'Изотоп яагаад адил урвалд ордог вэ',
    'Why do carbon-12 and carbon-14 react in the same way?', 'Нүүрстөрөгч-12 ба нүүрстөрөгч-14 яагаад адил урвалд ордог вэ?',
    [['They have the same number of neutrons', 'Нейтроны тоо ижил'], ['They have the same mass', 'Масс ижил'], ['They have the same number of electrons in the outer shell', 'Гадаад бүрхүүлийн электроны тоо ижил'], ['They are in different groups', 'Өөр бүлэгт байдаг']], 'C',
    'Reactions depend on outer electrons, which isotopes share.', 'Урвал гадаад электроноос хамаарах ба изотопуудынх ижил.'),
  t23('h', 'Which pair are isotopes', 'Аль хос изотоп вэ',
    'Which pair are isotopes of the same element?', 'Аль хос нэг элементийн изотоп вэ?',
    [['¹⁴C and ¹⁴N', '¹⁴C ба ¹⁴N'], ['¹⁶O and ¹⁸O', '¹⁶O ба ¹⁸O'], ['O₂ and O₃', 'O₂ ба O₃'], ['³⁵Cl and ³⁵Cl⁻', '³⁵Cl ба ³⁵Cl⁻']], 'B',
    'Both are oxygen (8 protons) with 8 and 10 neutrons; ¹⁴C and ¹⁴N are different elements.', 'Хоёулаа хүчилтөрөгч (8 протон), 8 ба 10 нейтронтой; ¹⁴C, ¹⁴N өөр элемент.'),
  t23('m', 'Neutrons in chlorine-37', 'Хлор-37-ын нейтрон',
    'How many neutrons are in an atom of chlorine-37? (Cl has proton number 17.)', 'Хлор-37 атомд хэдэн нейтрон байх вэ? (Cl-ийн протоны дугаар 17.)',
    same('17', '20', '37', '54'), 'B',
    '37 − 17 = 20.', '37 − 17 = 20.'),

  // 2.4 Ions and ionic bonds
  t24('m', 'Forming a sodium ion', 'Натрийн ион үүсэх',
    'What happens when a sodium atom forms a sodium ion?', 'Натрийн атом натрийн ион үүсгэхэд юу болох вэ?',
    [['It gains one electron', 'Нэг электрон авна'], ['It loses one electron', 'Нэг электрон алдана'], ['It loses one proton', 'Нэг протон алдана'], ['It gains one proton', 'Нэг протон авна']], 'B',
    'Na (2,8,1) loses its outer electron to become Na⁺ (2,8).', 'Na (2,8,1) гадаад электроноо алдаж Na⁺ (2,8) болно.'),
  t24('h', 'Aluminium oxide', 'Хөнгөн цагааны исэл',
    'Aluminium forms Al³⁺ ions and oxygen forms O²⁻ ions. What is the formula of aluminium oxide?', 'Хөнгөн цагаан Al³⁺, хүчилтөрөгч O²⁻ ион үүсгэнэ. Хөнгөн цагааны ислийн томьёо юу вэ?',
    same('AlO', 'Al₂O₃', 'Al₃O₂', 'AlO₃'), 'B',
    'Two Al³⁺ (+6) balance three O²⁻ (−6).', 'Хоёр Al³⁺ (+6) гурван O²⁻-ийг (−6) тэнцүүлнэ.'),
  t24('m', 'Magnesium chloride', 'Магнийн хлорид',
    'Which ions are in magnesium chloride?', 'Магнийн хлоридод ямар ионууд байдаг вэ?',
    [['One Mg²⁺ and two Cl⁻', 'Нэг Mg²⁺, хоёр Cl⁻'], ['One Mg⁺ and one Cl⁻', 'Нэг Mg⁺, нэг Cl⁻'], ['Two Mg⁺ and one Cl²⁻', 'Хоёр Mg⁺, нэг Cl²⁻'], ['One Mg²⁻ and two Cl⁺', 'Нэг Mg²⁻, хоёр Cl⁺']], 'A',
    'Magnesium loses two electrons, one to each chlorine atom.', 'Магни хоёр электрон алдаж, хлорын атом бүрт нэг нэгийг өгнө.'),
  t24('h', 'High melting points', 'Өндөр хайлах цэг',
    'Why do ionic compounds have high melting points?', 'Ионы нэгдэл яагаад өндөр хайлах цэгтэй вэ?',
    [['Their molecules are large', 'Молекул нь том'], ['There are strong electrostatic forces between oppositely charged ions throughout a giant lattice', 'Аварга тор даяар эсрэг цэнэгтэй ионуудын хооронд хүчтэй цахилгаан статик хүч бий'], ['They contain delocalised electrons', 'Чөлөөт электрон агуулна'], ['Their covalent bonds are strong', 'Ковалент холбоо нь хүчтэй']], 'B',
    'Much energy is needed to overcome the many strong attractions in the lattice.', 'Тор дахь олон хүчтэй таталцлыг даван туулахад их энерги хэрэгтэй.'),
  t24('m', 'The sulfide ion', 'Сульфид ион',
    'Sulfur is in Group VI. What is the charge on a sulfide ion?', 'Хүхэр VI бүлэгт байна. Сульфид ионы цэнэг хэд вэ?',
    same('2+', '6+', '2−', '6−'), 'C',
    'A sulfur atom gains two electrons to complete its outer shell.', 'Хүхрийн атом гадаад бүрхүүлээ дүүргэхийн тулд хоёр электрон авна.'),

  // 2.5 Simple molecules and covalent bonds
  t25('m', 'Bonding in nitrogen', 'Азотын холбоо',
    'How many pairs of electrons are shared between the two atoms in a nitrogen molecule, N₂?', 'Азотын молекул N₂-ийн хоёр атомын хооронд хэдэн хос электрон хуваалцдаг вэ?',
    same('1', '2', '3', '4'), 'C',
    'Each N needs three more electrons, so N≡N has a triple bond.', 'N бүрт гурван электрон дутуу тул N≡N гурвалсан холбоотой.'),
  t25('h', 'No conduction', 'Дамжуулахгүй',
    'Why do simple molecular substances not conduct electricity?', 'Энгийн молекулт бодис яагаад цахилгаан дамжуулдаггүй вэ?',
    [['Their bonds are too strong', 'Холбоо нь хэт хүчтэй'], ['They have no ions or delocalised electrons that can move', 'Хөдлөх ион, чөлөөт электрон байхгүй'], ['They are always gases', 'Үргэлж хий'], ['Their molecules are too large', 'Молекул нь хэт том']], 'B',
    'Molecules are neutral, so there are no charged particles to carry a current.', 'Молекул саармаг тул гүйдэл зөөх цэнэгтэй бөөм байхгүй.'),
  t25('m', 'Shared pairs in carbon dioxide', 'Нүүрсхүчлийн хийн хуваалцсан хос',
    'How many pairs of electrons are shared altogether in a molecule of carbon dioxide, O=C=O?', 'Нүүрсхүчлийн хийн O=C=O молекулд нийт хэдэн хос электрон хуваалцдаг вэ?',
    same('2', '3', '4', '6'), 'C',
    'Two double bonds, each two shared pairs: 4 pairs.', 'Хоёр давхар холбоо, тус бүр хоёр хуваалцсан хос: 4 хос.'),
  t25('h', 'Lone pairs in ammonia', 'Аммиакийн хуваалцаагүй хос',
    'In a dot-and-cross diagram of ammonia, NH₃, how many pairs of outer electrons on nitrogen are not shared?', 'Аммиак NH₃-ийн dot-and-cross диаграммд азотын гадаад электроны хэдэн хос хуваалцагдаагүй вэ?',
    same('0', '1', '2', '3'), 'B',
    'N has five outer electrons: three are shared with H atoms, two form one lone pair.', 'N таван гадаад электронтой: гурав нь H-тэй хуваалцана, хоёр нь нэг хуваалцаагүй хос.'),

  // 2.6 Giant covalent structures
  t26('m', 'Bonds per carbon atom', 'Нүүрстөрөгч бүрийн холбоо',
    'How many other carbon atoms is each carbon atom bonded to in diamond and in graphite?', 'Алмаз ба бал чулуунд нүүрстөрөгчийн атом бүр өөр хэдэн нүүрстөрөгчтэй холбогддог вэ?',
    [['4 in diamond, 3 in graphite', 'Алмазад 4, бал чулуунд 3'], ['3 in diamond, 4 in graphite', 'Алмазад 3, бал чулуунд 4'], ['4 in both', 'Хоёуланд 4'], ['2 in diamond, 3 in graphite', 'Алмазад 2, бал чулуунд 3']], 'A',
    'In graphite the fourth electron of each carbon is delocalised between the layers.', 'Бал чулуунд нүүрстөрөгч бүрийн дөрөв дэх электрон давхаргуудын хооронд чөлөөтэй.'),
  t26('h', 'Graphite as a lubricant', 'Бал чулуу тосолгоо',
    'Why is graphite used as a lubricant?', 'Бал чулууг яагаад тосолгоонд ашигладаг вэ?',
    [['It has delocalised electrons', 'Чөлөөт электронтой'], ['Its layers are held by weak forces and slide over each other', 'Давхаргууд сул хүчээр барилцаж, бие биен дээгүүр гулсана'], ['It is very hard', 'Маш хатуу'], ['It has a low melting point', 'Бага хайлах цэгтэй']], 'B',
    'Within a layer the covalent bonds are strong; only the forces between layers are weak.', 'Давхарга дотор ковалент холбоо хүчтэй; зөвхөн давхарга хоорондын хүч сул.'),
  t26('m', 'Diamond in cutting tools', 'Зүсэх хэрэгсэл дэх алмаз',
    'Why is diamond used on the tips of drills and cutting tools?', 'Алмазыг яагаад өрөм, зүсэх хэрэгслийн үзүүрт хэрэглэдэг вэ?',
    [['It conducts electricity', 'Цахилгаан дамжуулдаг'], ['It is very hard', 'Маш хатуу'], ['It is slippery', 'Гулгамтгай'], ['It dissolves in water', 'Усанд уусдаг']], 'B',
    'Every atom is held by four strong covalent bonds in a 3D network.', 'Атом бүрийг гурван хэмжээст сүлжээнд дөрвөн хүчтэй ковалент холбоо барина.'),
  t26('h', 'Structure of silicon(IV) oxide', 'Цахиурын(IV) ислийн бүтэц',
    'Which describes the structure of silicon(IV) oxide, SiO₂?', 'Цахиурын(IV) исэл SiO₂-ийн бүтцийг аль нь тодорхойлох вэ?',
    [['Small SiO₂ molecules', 'Жижиг SiO₂ молекул'], ['Each Si atom bonded to four O atoms and each O atom to two Si atoms', 'Si атом бүр дөрвөн O-той, O атом бүр хоёр Si-тэй холбогдсон'], ['Layers like graphite', 'Бал чулуу шиг давхаргууд'], ['Si⁴⁺ and O²⁻ ions', 'Si⁴⁺ ба O²⁻ ион']], 'B',
    'It is a giant covalent lattice similar to diamond, which is why it is hard and melts so high.', 'Алмазтай төстэй аварга ковалент тор тул хатуу, маш өндөр хайлна.'),

  // 2.7 Metallic bonding
  t27('m', 'Melting points of metals', 'Металлын хайлах цэг',
    'Why do most metals have high melting points?', 'Ихэнх металл яагаад өндөр хайлах цэгтэй вэ?',
    [['There is strong attraction between the positive ions and the delocalised electrons', 'Эерэг ион ба чөлөөт электроны хооронд хүчтэй таталцал бий'], ['Their molecules are large', 'Молекул нь том'], ['They contain covalent bonds', 'Ковалент холбоо агуулна'], ['They have weak forces between atoms', 'Атом хоорондын хүч сул']], 'A',
    'Much energy is needed to break the metallic bonding in the lattice.', 'Тор дахь металлын холбоог тасдахад их энерги хэрэгтэй.'),
  t27('h', 'Solid metals and solid salts', 'Хатуу металл ба хатуу давс',
    'Why does solid copper conduct electricity while solid sodium chloride does not?', 'Хатуу зэс яагаад цахилгаан дамжуулдаг, харин хатуу натрийн хлорид дамжуулдаггүй вэ?',
    [['Copper has delocalised electrons that move; the ions in solid NaCl cannot move', 'Зэсийн чөлөөт электрон хөдөлнө; хатуу NaCl-ийн ион хөдөлж чадахгүй'], ['Copper is a liquid', 'Зэс шингэн'], ['NaCl has no ions', 'NaCl ионгүй'], ['Copper has more protons', 'Зэс илүү олон протонтой']], 'A',
    'A current needs moving charged particles in the solid.', 'Гүйдэлд хатуу бодис дотор хөдлөх цэнэгтэй бөөм хэрэгтэй.'),
  t27('m', 'What moves in a wire', 'Утсаар юу хөдөлдөг вэ',
    'When electricity flows through a copper wire, which particles move along the wire?', 'Зэс утсаар цахилгаан гүйхэд ямар бөөмс утсаар хөдөлдөг вэ?',
    [['Copper ions', 'Зэсийн ион'], ['Electrons', 'Электрон'], ['Protons', 'Протон'], ['Copper atoms', 'Зэсийн атом']], 'B',
    'The positive ions stay in place; delocalised electrons drift along the wire.', 'Эерэг ион байрандаа; чөлөөт электрон утсаар шилжинэ.'),
  t27('h', 'Evaluating a claim about heat', 'Дулааны тухай мэдэгдлийг үнэлэх',
    'A student says: "Metals conduct heat because their ions move freely through the metal." Evaluate this.', 'Сурагч: "Металл дулаан дамжуулдаг, учир нь ион нь металлаар чөлөөтэй хөдөлдөг." Үүнийг үнэлнэ үү.',
    [['Correct: the ions carry the heat', 'Зөв: ион дулаан зөөнө'], ['Incorrect: the ions stay in place and vibrate; the delocalised electrons carry energy through the metal', 'Буруу: ион байрандаа чичирнэ; чөлөөт электрон энергийг металлаар зөөнө'], ['Correct: metals melt when heated', 'Зөв: халаахад металл хайлна'], ['Incorrect: metals do not conduct heat', 'Буруу: металл дулаан дамжуулдаггүй']], 'B',
    'The ions are fixed in the lattice; mobile electrons pass on kinetic energy quickly.', 'Ион торондоо бэхлэгдсэн; хөдөлгөөнт электрон кинетик энергийг хурдан дамжуулна.')
];
