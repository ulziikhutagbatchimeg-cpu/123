import { ALEVEL_GLOSSARY_1, type GlossaryEntry } from './alevelGlossaryPart1';

// The glossary of every 9701 chapter with key terms, in the same form as the 0620 glossary: each term with its definition in
// Mongolian and English. Chapters 1 to 8 are in alevelGlossaryPart1.ts; this file holds chapters 9 to 18 and the whole list.
export type { GlossaryEntry };

const ALEVEL_GLOSSARY_2: Record<string, GlossaryEntry[]> = {
  'al-ch-9': [
    { term: { mn: 'үечлэл', en: 'periodicity' }, def: { mn: 'Атомын дугаар нэмэгдэхэд элементүүдийн шинж чанар тодорхой давтамжтайгаар давтагдах байдал.', en: 'The regular repetition of properties of elements across periods, as atomic number increases.' } },
    { term: { mn: 'амфотер', en: 'amphoteric' }, def: { mn: 'Хүчил ба суурь хоёуланд нь урвалд орж чаддаг; жишээ нь алюминийн исэл.', en: 'Able to react as both an acid and a base, such as aluminium oxide.' } }
  ],
  'al-ch-10': [
    { term: { mn: 'шүлтлэг шороон металл', en: 'alkaline earth metal' }, def: { mn: '2-р бүлгийн металл, жишээ нь магни, кальци, барий.', en: 'A Group 2 metal, such as magnesium, calcium or barium.' } },
    { term: { mn: 'ханасан уусмал', en: 'saturated solution' }, def: { mn: 'Тодорхой температурт уусах хамгийн их уусагч бодис агуулсан уусмал.', en: 'A solution that contains the maximum amount of solute that can dissolve at a given temperature.' } },
    { term: { mn: 'дулааны задрал', en: 'thermal decomposition' }, def: { mn: 'Халаахад нэгдэл энгийн бодис болж задрах урвал.', en: 'The breakdown of a compound by heat into simpler substances.' } }
  ],
  'al-ch-11': [
    { term: { mn: 'галоген', en: 'halogen' }, def: { mn: '17-р бүлгийн элемент (хлор, бром, иод гэх мэт), хоёр атомт молекул үүсгэнэ.', en: 'A Group 17 element, such as chlorine, bromine or iodine, that forms diatomic molecules.' } },
    { term: { mn: 'дэгдэмхий чанар', en: 'volatility' }, def: { mn: 'Шингэн хэр хурдан ууршихыг заана; дэгдэмхий шингэн нь буцлах цэг бага.', en: 'How easily a liquid evaporates; a volatile liquid has a low boiling point.' } },
    { term: { mn: 'холилдохгүй', en: 'immiscible' }, def: { mn: 'Холилдохгүй, хоёр тусдаа давхарга үүсгэх хоёр шингэн.', en: 'Two liquids that do not mix, forming two separate layers.' } },
    { term: { mn: 'дулааны тогтвортой байдал', en: 'thermal stability' }, def: { mn: 'Халаахад нэгдэл хэр тэсвэртэйгээр задрахгүй байхыг заана.', en: 'How much a compound resists breaking down when heated.' } }
  ],
  'al-ch-13': [
    { term: { mn: 'бүтцийн томьёо', en: 'structural formula' }, def: { mn: 'Атомын байрлал, тэдгээрийн хоорондох холбоог харуулсан томьёо; бүх холбоог заавал зураагүй.', en: 'A formula showing how the atoms are arranged, with the bonds between them, but not all bonds drawn out.' } },
    { term: { mn: 'харуулсан томьёо', en: 'displayed formula' }, def: { mn: 'Молекулын атом, холбоо бүрийг харуулсан томьёо.', en: 'A formula that shows every atom and every bond in the molecule.' } },
    { term: { mn: 'араг томьёо', en: 'skeletal formula' }, def: { mn: 'Нүүрстөрөгч, устөрөгчийн атомыг харуулахгүй, зөвхөн нүүрстөрөгчийн араг ба функциональ бүлгийг зурсан хялбаршуулсан томьёо.', en: 'A simplified organic formula in which carbon and hydrogen atoms are not shown; only the carbon skeleton and functional groups are drawn.' } },
    { term: { mn: 'гомологийн цуврал', en: 'homologous series' }, def: { mn: 'Адил функциональ бүлэгтэй, дараагийн гишүүн нь CH₂ нэгжээр ялгаатай нэгдлүүдийн бүлэг.', en: 'A family of compounds with the same functional group, each differing from the next by a CH₂ unit.' } },
    { term: { mn: 'функциональ бүлэг', en: 'functional group' }, def: { mn: 'Органик нэгдэлд онцлог урвалыг өгдөг атом эсвэл атомын бүлэг.', en: 'The atom or group of atoms that gives an organic compound its characteristic reactions.' } },
    { term: { mn: 'ерөнхий томьёо', en: 'general formula' }, def: { mn: 'Гомологийн цуврал бүхэлд нь хамаарах томьёо; жишээ нь алканы CₙH₂ₙ₊₂.', en: 'A formula that applies to a whole homologous series, such as CₙH₂ₙ₊₂ for alkanes.' } },
    { term: { mn: 'алкан', en: 'alkane' }, def: { mn: 'Зөвхөн нэг холбоотой, ханасан нүүрсустөрөгч; ерөнхий томьёо CₙH₂ₙ₊₂.', en: 'A saturated hydrocarbon with single bonds only, general formula CₙH₂ₙ₊₂.' } },
    { term: { mn: 'алифат', en: 'aliphatic' }, def: { mn: 'Бензолын цагирагаас бус, гинжин эсвэл гинжин бус цагиргийн нүүрстөрөгчтэй органик нэгдэл.', en: 'An organic compound that is not aromatic, with carbon atoms in chains or non-benzene rings.' } },
    { term: { mn: 'нэг ковалент холбоо', en: 'single covalent bond' }, def: { mn: 'Нэг хамтын электроны хосоор үүссэн ковалент холбоо.', en: 'A covalent bond made from one shared pair of electrons.' } },
    { term: { mn: 'изомер', en: 'isomer' }, def: { mn: 'Молекулын томьёо адил, бүтэц нь өөр нэгдлүүд.', en: 'Compounds with the same molecular formula but different structures.' } },
    { term: { mn: 'энантиомер', en: 'enantiomer' }, def: { mn: 'Тусгал дүрстэй хосолбоогүй, оптик изомерын хос.', en: 'A pair of optical isomers that are non-superimposable mirror images.' } },
    { term: { mn: 'хиралийн төв', en: 'chiral centre' }, def: { mn: 'Дөрвөн өөр бүлэгтэй холбогдсон нүүрстөрөгчийн атом; молекулыг оптик идэвхтэй болгоно.', en: 'A carbon atom bonded to four different groups, which makes the molecule optically active.' } },
    { term: { mn: 'урвалын механизм', en: 'reaction mechanism' }, def: { mn: 'Урвалд холбоо хэрхэн таслагдаж, үүсэхийг шат шатаар тайлбарлах; муруй сумаар заана.', en: 'A step-by-step description of how bonds break and form in a reaction, using curly arrows.' } },
    { term: { mn: 'радикалын урвал', en: 'free-radical reaction' }, def: { mn: 'Чөлөөт радикалаар явагдах урвал; эхлэл, тархалт, төгсгөл гэсэн шаттай.', en: 'A reaction that proceeds through free radicals, usually with initiation, propagation and termination steps.' } },
    { term: { mn: 'карбокатион', en: 'carbocation' }, def: { mn: 'Нүүрстөрөгчийн атом гадна бүрхүүлдээ зургаан электронтой эерэг ион.', en: 'A positive ion with a carbon atom that has only six electrons in its outer shell.' } },
    { term: { mn: 'индуктив нөлөө', en: 'inductive effect' }, def: { mn: 'Электроотрицательтын ялгаанаас болж σ-холбооны гинжээр электрон нягтын шилжилт.', en: 'The shift of electron density along a chain of σ-bonds caused by electronegativity differences.' } },
    { term: { mn: 'электрофил', en: 'electrophile' }, def: { mn: 'Электрон хос хүлээн авагч; электрон нягт ихтэй хэсэгт татагддаг.', en: 'An electron-pair acceptor, that is attracted to regions of high electron density.' } },
    { term: { mn: 'нуклеофил', en: 'nucleophile' }, def: { mn: 'Электрон хос өгөгч; эерэг буюу электрон дутуу төвд дайрдаг.', en: 'An electron-pair donor that attacks a positive or electron-deficient centre.' } },
    { term: { mn: 'радикалын орлолт', en: 'free-radical substitution' }, def: { mn: 'Чөлөөт радикалын механизмаар атом эсвэл бүлэг солигдох урвал; ихэвчлэн UV гэрэлд алкан ба галогений урвал.', en: 'A substitution reaction in which an atom or group is replaced by a free radical mechanism, typically of alkanes with halogens in UV light.' } }
  ],
  'al-ch-14': [
    { term: { mn: 'ханасан нүүрсустөрөгч', en: 'saturated hydrocarbon' }, def: { mn: 'Нүүрстөрөгчийн атомуудын хооронд зөвхөн нэг холбоотой нүүрсустөрөгч.', en: 'A hydrocarbon with only single bonds between its carbon atoms.' } },
    { term: { mn: 'эхлэлийн шат', en: 'initiation step' }, def: { mn: 'Чөлөөт радикал үүсэх эхний шат; ихэвчлэн UV гэрлээр холбоо таслагдана.', en: 'The first step of a free-radical reaction, in which radicals are formed, usually by UV light breaking a bond.' } },
    { term: { mn: 'төгсгөлийн шат', en: 'termination step' }, def: { mn: 'Хоёр радикал нийлж урвалаас радикалыг зайлуулах шат.', en: 'A step in which two radicals combine, removing radicals from the reaction.' } },
    { term: { mn: 'ханаагүй нүүрсустөрөгч', en: 'unsaturated hydrocarbon' }, def: { mn: 'Дор хаяж нэг C=C давхар холбоотой нүүрсустөрөгч.', en: 'A hydrocarbon with at least one C=C double bond.' } },
    { term: { mn: 'крекинг', en: 'cracking' }, def: { mn: 'Халаалт ба катализатор ашиглан том алканы молекулыг жижиг алкан ба алкен болгон задлах.', en: 'Breaking large alkane molecules into smaller alkanes and alkenes, using heat and a catalyst.' } },
    { term: { mn: 'гидрогенжилт', en: 'hydrogenation' }, def: { mn: 'C=C холбоонд устөрөгч нэмэх; ихэвчлэн никелийн катализатортой.', en: 'Addition of hydrogen to a C=C bond, usually with a nickel catalyst.' } },
    { term: { mn: 'завсрын бодис', en: 'intermediate' }, def: { mn: 'Урвалын явцад үүсч, дараа нь хэрэглэгддэг, катализатороос ялгаатай завсрын бодис.', en: 'A species formed during a reaction and used up later, unlike a catalyst.' } },
    { term: { mn: 'полимер', en: 'polymer' }, def: { mn: 'Мономер гэж нэрлэгдэх олон жижиг давтагдах нэгжийг холбож үүсгэсэн урт молекул.', en: 'A long molecule made by joining many small repeating units called monomers.' } },
    { term: { mn: 'мономер', en: 'monomer' }, def: { mn: 'Полимер үүсгэхийн тулд бусадтай холбогдож чадах давхар холбоо эсвэл функциональ бүлэгтэй жижиг молекул.', en: 'A small molecule with a double bond or functional group that can join to others to form a polymer.' } },
    { term: { mn: 'нэмэх полимержилт', en: 'addition polymerisation' }, def: { mn: 'C=C холбоотой мономерууд ямар ч атом алдахгүйгээр холбогдож явагдах полимержилт.', en: 'Polymerisation in which monomers with C=C bonds join without losing any atoms.' } },
    { term: { mn: 'давтагдах нэгж', en: 'repeat unit' }, def: { mn: 'Полимерийн гинжин дагуу давтагддаг хамгийн жижиг нэгж.', en: 'The smallest unit that is repeated along a polymer chain.' } }
  ],
  'al-ch-15': [
    { term: { mn: 'нуклеофилийн орлолт', en: 'nucleophilic substitution' }, def: { mn: 'Нуклеофил молекулын өөр атом эсвэл бүлгийг солих урвал.', en: 'A reaction in which a nucleophile replaces another atom or group in a molecule.' } },
    { term: { mn: 'гетеролитийн таслалт', en: 'heterolytic fission' }, def: { mn: 'Ковалент холбооны хамтын хоёр электрон нэг атомд очиж, ион үүсгэн таслагдах.', en: 'Breaking of a covalent bond so that both shared electrons go to one atom, forming ions.' } },
    { term: { mn: 'эерэг индуктив нөлөө', en: 'positive inductive effect' }, def: { mn: 'Холбогдсон алкил бүлгийн нүүрстөрөгч рүү электрон нягтыг түлхэх нөлөө.', en: 'The pushing of electron density toward a carbon atom by an attached alkyl group.' } }
  ],
  'al-ch-16': [
    { term: { mn: 'нэгдүгээр спирт', en: 'primary alcohol' }, def: { mn: 'OH бүлэгтэй нүүрстөрөгч нэг бусад нүүрстөрөгчтэй холбогдсон спирт.', en: 'An alcohol in which the carbon bonded to the OH group is bonded to one other carbon atom.' } },
    { term: { mn: 'хоёрдугаар спирт', en: 'secondary alcohol' }, def: { mn: 'OH-тай нүүрстөрөгч хоёр бусад нүүрстөрөгчтэй холбогдсон спирт.', en: 'An alcohol in which the carbon bonded to the OH group is bonded to two other carbon atoms.' } },
    { term: { mn: 'гуравдугаар спирт', en: 'tertiary alcohol' }, def: { mn: 'OH-тай нүүрстөрөгч гурван бусад нүүрстөрөгчтэй холбогдсон спирт.', en: 'An alcohol in which the carbon bonded to the OH group is bonded to three other carbon atoms.' } },
    { term: { mn: 'задралын зэрэг', en: 'degree of dissociation' }, def: { mn: 'Уусмалд ион болж задарсан сул хүчлийн хэсэг; ихэвчлэн α гэж тэмдэглэнэ.', en: 'The fraction of a weak acid that has split into ions in solution, usually written as α.' } },
    { term: { mn: 'эстерижилт', en: 'esterification' }, def: { mn: 'Спирт карбоксилын хүчилтэй урвалд орж эстер ба ус үүсгэх урвал.', en: 'The reaction of an alcohol with a carboxylic acid to form an ester and water.' } },
    { term: { mn: 'усгүйжилт', en: 'dehydration' }, def: { mn: 'Молекулаас ус зайлуулах; жишээ нь спиртээс алкен үүсгэх.', en: 'Removal of water from a molecule, for example from an alcohol to form an alkene.' } }
  ],
  'al-ch-17': [
    { term: { mn: 'нуклеофилийн нэмэлт', en: 'nucleophilic addition' }, def: { mn: 'Нуклеофил C=O эсвэл C=C холбоонд нэмэгдэх урвал; эерэг буюу электрон дутуу төв дайрдаг.', en: 'A reaction in which a nucleophile adds to a C=O or C=C bond, with a positive or electron-deficient centre attacked.' } },
    { term: { mn: 'хэт улаан туяаны спектроскопи', en: 'infrared spectroscopy' }, def: { mn: 'Холбоо, функциональ бүлгийг шингээх хэт улаан гэрлийн давтамжаар тодорхойлох арга.', en: 'A technique that identifies bonds and functional groups from the frequencies of infrared light they absorb.' } },
    { term: { mn: 'бие даасан хувьсагч', en: 'independent variable' }, def: { mn: 'Туршигчийн зориудаар өөрчилдөг хувьсагч.', en: 'The variable that the experimenter deliberately changes.' } },
    { term: { mn: 'хамаарах хувьсагч', en: 'dependent variable' }, def: { mn: 'Хэмжигдэх хувьсагч; бие даасан хувьсагчаас хамаарч өөрчлөгдөнө.', en: 'The variable that is measured; it changes in response to the independent variable.' } },
    { term: { mn: 'хянагдах хувьсагч', en: 'control variable' }, def: { mn: 'Үр дүнд нөлөөлөхгүйн тулд тогтмол байлгах хувьсагч.', en: 'A variable that is kept constant so that it does not affect the result.' } },
    { term: { mn: 'санамсаргүй алдаа', en: 'random error' }, def: { mn: 'Хэмжилтийн урьдчилан тааварлах боломжгүй зөрүү; давтаж дундажлах замаар багасгана.', en: 'A variation in measurements that is unpredictable, reduced by repeating and averaging.' } },
    { term: { mn: 'системийн алдаа', en: 'systematic error' }, def: { mn: 'Бүх үр дүнг нэг чиглэлд шилжүүлдэг алдаа, жишээ нь тэг алдаа; давтахад багасахгүй.', en: 'An error that shifts all results the same way, such as a zero error, and is not reduced by repeating.' } }
  ],
  'al-ch-18': [
    { term: { mn: 'ацил хлорид', en: 'acyl chloride' }, def: { mn: '–COCl бүлэгтэй нэгдэл; карбоксилын хүчлээс хлоржуулагчаар гаргана.', en: 'A compound containing the group –COCl, made from a carboxylic acid with a chlorinating agent.' } }
  ]
};

// The whole glossary of the 9701 chapters: chapters 1 to 8 and 9 to 18
export const ALEVEL_GLOSSARY: Record<string, GlossaryEntry[]> = { ...ALEVEL_GLOSSARY_1, ...ALEVEL_GLOSSARY_2 };
