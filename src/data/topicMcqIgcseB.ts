import type { ExamQuestion } from '../types/chemistry';
import { topicWriter } from './topicMcqBuild';

// End-of-topic questions, part B: chapter 6 (reactions, rates, equilibrium, redox), chapter 7 (acids, bases and salts)
// and chapter 8 (the Periodic Table). Each topic has four questions.
const CH6 = 'ch-reactions';
const CH7 = 'ch-acids-bases';
const CH8 = 'ch-periodic-table';

const w61 = topicWriter('s-6-1', CH6, '0620/6.1');
const w63 = topicWriter('s-6-3', CH6, '0620/6.3');
const w64 = topicWriter('s-6-4', CH6, '0620/6.4');
const w71 = topicWriter('s-7-1', CH7, '0620/7.1');
const w72 = topicWriter('s-7-2', CH7, '0620/7.2');
const w73 = topicWriter('top-7-1', CH7, '0620/7.3');
const w81 = topicWriter('s-8-1', CH8, '0620/8.1');
const w82 = topicWriter('s-8-2', CH8, '0620/8.2');
const w83 = topicWriter('s-8-3', CH8, '0620/8.3');
const w84 = topicWriter('s-8-4', CH8, '0620/8.4');
const w85 = topicWriter('s-8-5', CH8, '0620/8.5');

export const TOPIC_MCQ_B: ExamQuestion[] = [
  // 6.1 Physical and chemical changes
  w61(1, 'Chemical change', 'Химийн өөрчлөлт', 'Which of these is a chemical change?', 'Эдгээрээс аль нь химийн өөрчлөлт вэ?',
    [['Melting ice', 'Мөс хайлах'], ['Dissolving sugar in water', 'Элсэн чихрийг усанд уусгах'], ['Burning paper', 'Цаас шатаах'], ['Evaporating water', 'Ус уурших']], 'C',
    'Burning paper makes new substances (carbon dioxide and water vapour) that cannot be turned back by a physical change. The other three only change state or dissolve.',
    'Цаас шатахад шинэ бодис (нүүрсхүчлийн хий, усны уур) үүсдэг бөгөөд физик аргаар буцаах боломжгүй. Бусад гурав зөвхөн төлөв өөрчилж эсвэл уусдаг.'),
  w61(2, 'Signs of a reaction', 'Урвалын шинж', 'Which observation is a sign that a chemical reaction has happened?', 'Аль ажиглалт химийн урвал явагдсаныг илтгэх вэ?',
    [['A change of shape', 'Хэлбэр өөрчлөгдсөн'], ['A gas is given off or a colour changes', 'Хий ялгарсан эсвэл өнгө өөрчлөгдсөн'], ['The solid is cut into pieces', 'Хатуу бодис хэсгүүдэд хуваагдсан'], ['It dissolves in a solvent', 'Уусгагчид уусдаг']], 'B',
    'Gas evolution, colour change and a temperature change are typical evidence of a new substance. Cutting or dissolving does not make a new substance.',
    'Хий ялгарах, өнгө өөрчлөгдөх, температур өөрчлөгдөх нь шинэ бодис үүссэний шинж. Таслах эсвэл уусгах нь шинэ бодис үүсгэдэггүй.'),
  w61(3, 'Thermal decomposition', 'Дулааны задрал', 'Heating copper(II) carbonate gives:', 'Зэсийн(II) карбонатыг халаахад юу үүсэх вэ?',
    [['Copper and carbon dioxide', 'Зэс ба нүүрсхүчлийн хий'], ['Copper(II) oxide and carbon dioxide', 'Зэсийн(II) исэл ба нүүрсхүчлийн хий'], ['Copper and oxygen', 'Зэс ба хүчилтөрөгч'], ['Copper(II) oxide only', 'Зөвхөн зэсийн(II) исэл']], 'B',
    'Heating breaks the carbonate down into the oxide and carbon dioxide: CuCO₃ → CuO + CO₂. Copper is not formed directly.',
    'Халаахад карбонат исэл ба нүүрсхүчлийн хий болон задрана: CuCO₃ → CuO + CO₂. Зэс шууд үүсэхгүй.'),
  w61(4, 'Reactants', 'Урвалжууд', 'The substances present at the start of a reaction are called:', 'Урвалын эхэнд байгаа бодисыг юу гэх вэ?',
    [['Products', 'Бүтээгдэхүүн'], ['Reactants', 'Урвалжууд'], ['Catalysts', 'Катализатор'], ['Ions', 'Ион']], 'B',
    'Reactants are used up in the reaction, while products are formed by it. A catalyst is not used up, and ions are charged particles.',
    'Урвалжууд урвалд зарцуулагдана; бүтээгдэхүүн урвалаар үүснэ. Катализатор зарцуулагдахгүй, ион бол цэнэгтэй бөөм.'),

  // 6.3 Reversible reactions and equilibrium
  w63(1, 'Reversible symbol', 'Эргэх тэмдэг', 'Which symbol shows a reversible reaction?', 'Аль тэмдэг эргэх урвалыг илэрхийлэх вэ?',
    [['→', '→'], ['⇌', '⇌'], ['=', '='], ['→ →', '→ →']], 'B',
    'A reversible reaction is shown with two arrows pointing in opposite directions, ⇌, to show that both directions occur.',
    'Эргэх урвалыг хоёр эсрэг чиглэлтэй сумтай ⇌ тэмдгээр заана; хоёр чиглэлд явагдаж байгааг илэрхийлнэ.'),
  w63(2, 'Equilibrium', 'Тэнцвэр', 'In a closed system at equilibrium:', 'Битүү системд тэнцвэрт байдалд:',
    [['The reaction has stopped', 'Урвал зогссон'], ['The forward and reverse rates are equal, and concentrations stay constant', 'Урагш ба буцах хурд тэнцүү, концентраци тогтмол'], ['All the reactants have been used', 'Бүх урвалж зарцуулагдсан'], ['All the products have been removed', 'Бүх бүтээгдэхүүн зайлагдсан']], 'B',
    'At equilibrium the reaction is still going on in both directions, at equal rates. A stopped reaction would have no changing concentrations at all, which is not the case.',
    'Тэнцвэрт байдалд урвал хоёр чиглэлд, тэнцүү хурдтай үргэлжилж байна. Зогссон урвалд ямар ч концентраци өөрчлөгдөхгүй, энэ нь тийм биш.'),
  w63(3, 'Hydrated copper sulfate', 'Усжилттай зэсийн сульфат', 'Heating blue hydrated copper(II) sulfate gives a white solid because:', 'Цэнхэр усжилттай зэсийн(II) сульфатыг халаахад цагаан бодис үүсэх, учир нь:',
    [['Water is added to it', 'Түүнд ус нэмэгддэг'], ['Water is removed from it', 'Түүнээс ус зайлагддаг'], ['It melts', 'Хайлдаг'], ['It reacts with oxygen', 'Хүчилтөрөгчтэй урвалд орно']], 'B',
    'Heating drives off the water of crystallisation, giving the anhydrous salt, which is white. Adding water turns it blue again, so the reaction is reversible.',
    'Халаахад талстын ус зайлагдаж, цагаан усгүй давс үлдэнэ. Ус нэмэхэд дахин цэнхэр болдог тул урвал эргэх.'),
  w63(4, 'Dynamic equilibrium', 'Динамик тэнцвэр', 'Which statement about dynamic equilibrium is correct?', 'Динамик тэнцвэрийн тухай аль мэдэгдэл зөв вэ?',
    [['Reactant and product concentrations are always equal', 'Урвалж ба бүтээгдэхүүний концентраци үргэлж тэнцүү'], ['The forward and backward reactions continue at equal rates', 'Урагш ба буцах урвал тэнцүү хурдтай явагдана'], ['No reaction happens', 'Ямар ч урвал явагдахгүй'], ['The reaction goes in one direction only', 'Урвал зөвхөн нэг чиглэлд явна']], 'B',
    'Dynamic equilibrium is a balance of two processes. The reaction still happens in both directions, which is why it is called dynamic.',
    'Динамик тэнцвэр нь хоёр процессын тэнцвэр. Урвал хоёр чиглэлд явагдаж байгаа тул "динамик" гэнэ.'),

  // 6.4 Redox
  w64(1, 'Oxidation', 'Исэлдэлт', 'Oxidation is:', 'Исэлдэлт гэдэг нь:',
    [['Gain of electrons', 'Электрон авах'], ['Loss of electrons', 'Электрон алдах'], ['Gain of protons', 'Протон авах'], ['Loss of neutrons', 'Нейтрон алдах']], 'B',
    'Oxidation is loss of electrons (OIL: oxidation is loss). Gain of electrons is reduction (RIG).',
    'Исэлдэлт бол электрон алдах (OIL: oxidation is loss). Электрон авах бол бууралт (RIG).'),
  w64(2, 'Oxidised substance', 'Исэлдсэн бодис', 'In Mg + CuO → MgO + Cu, magnesium is:', 'Mg + CuO → MgO + Cu урвалд магни:',
    [['Oxidised', 'Исэлдсэн'], ['Reduced', 'Бууралтад орсон'], ['Unchanged', 'Өөрчлөгдөөгүй'], ['A catalyst', 'Катализатор']], 'A',
    'Magnesium gains oxygen and loses electrons, so it is oxidised. Copper(II) oxide loses oxygen and gains electrons, so it is reduced.',
    'Магни хүчилтөрөгч авч, электрон алдаж байгаа тул исэлдсэн. Зэсийн(II) исэл хүчилтөрөгч алдаж, электрон авч байгаа тул бууралтад орсон.'),
  w64(3, 'Oxidation number', 'Исэлдэлтийн тоо', 'What is the oxidation number of oxygen in H₂O?', 'H₂O-д хүчилтөрөгчийн исэлдэлтийн тоо хэд вэ?',
    [['+2', '+2'], ['−2', '−2'], ['0', '0'], ['+1', '+1']], 'B',
    'Oxygen is usually −2 in its compounds. Hydrogen is +1 in water, so the two H atoms (+2) balance the oxygen (−2) to give zero overall.',
    'Хүчилтөрөгч ихэнх нэгдэлд −2 байдаг. Усанд устөрөгч +1 тул хоёр H (+2) хүчилтөрөгч (−2)-ийг тэнцүүлж нийт тэг болно.'),
  w64(4, 'Oxidising agent', 'Исэлдүүлэгч', 'The oxidising agent in a redox reaction is the substance that:', 'Redox урвалд исэлдүүлэгч бодис нь:',
    [['Gets oxidised', 'Исэлдэнэ'], ['Gets reduced', 'Бууралтад орно'], ['Gives electrons away', 'Электрон өгнө'], ['Acts as a catalyst', 'Катализатороор ажилладаг']], 'B',
    'The oxidising agent causes oxidation in another substance, so it takes electrons and is itself reduced.',
    'Исэлдүүлэгч бусад бодисыг исэлдүүлдэг тул электрон авч, өөрөө бууралтад орно.'),

  // 7.1 Characteristic properties of acids and bases
  w71(1, 'pH of an acid', 'Хүчлийн pH', 'A solution with a pH of 2 is:', 'pH 2-той уусмал:',
    [['Strongly alkaline', 'Хүчтэй шүлтлэг'], ['Acidic', 'Хүчиллэг'], ['Neutral', 'Саармаг'], ['Pure water', 'Цэвэр ус']], 'B',
    'pH below 7 is acidic; the lower the number, the stronger the acid. Neutral is pH 7, and alkalis are above 7.',
    'pH 7-оос бага бол хүчиллэг; тоо бага байх тусам хүчил хүчтэй. Саармаг нь pH 7, шүлт 7-оос дээш.'),
  w71(2, 'Litmus', 'Лакмус', 'Litmus paper turns blue in:', 'Лакмус цэнхэр болдог нь:',
    [['An acid', 'Хүчил'], ['An alkali', 'Шүлт'], ['A neutral solution', 'Саармаг уусмал'], ['Pure water', 'Цэвэр ус']], 'B',
    'Litmus is red in acid and blue in alkali. Neutral solutions and pure water leave it purple (no change from its neutral colour).',
    'Лакмус хүчилд улаан, шүлтэнд цэнхэр. Саармаг уусмалд өөрчлөгдөхгүй.'),
  w71(3, 'Products of neutralisation', 'Саармагжилтын бүтээгдэхүүн', 'Neutralisation of an acid by an alkali gives:', 'Хүчлийг шүлтээр саармагжуулахад юу үүсэх вэ?',
    [['A salt and hydrogen', 'Давс ба устөрөгч'], ['A salt and water', 'Давс ба ус'], ['Water only', 'Зөвхөн ус'], ['A salt and oxygen', 'Давс ба хүчилтөрөгч']], 'B',
    'H⁺ from the acid combines with OH⁻ from the alkali to give water, and the remaining ions form the salt.',
    'Хүчлээс гарсан H⁺ нь шүлтээс гарсан OH⁻-тэй нэгдэж ус үүсгэнэ; үлдсэн ионууд давс үүсгэнэ.'),
  w71(4, 'Properties of bases', 'Суурийн шинж', 'Which statement about bases is correct?', 'Суурийн тухай аль мэдэгдэл зөв вэ?',
    [['A base is a proton donor', 'Суурь бол протон өгөгч'], ['A base neutralises an acid to form a salt and water', 'Суурь хүчлийг саармагжуулж давс ба ус үүсгэнэ'], ['Bases have a pH below 7', 'Суурийн pH 7-оос бага'], ['Bases turn litmus red', 'Суурь лакмусыг улаан болгодог']], 'B',
    'A base reacts with an acid to form a salt and water. Acids are proton donors and turn litmus red; bases do the opposite.',
    'Суурь хүчилтэй урвалд орж давс ба ус үүсгэнэ. Хүчил нь протон өгөгч, лакмусыг улаан болгодог; суурь эсрэгээрээ.'),

  // 7.2 Oxides
  w72(1, 'Acidic oxide', 'Хүчиллэг исэл', 'Carbon dioxide is an acidic oxide because it:', 'Нүүрсхүчлийн хий хүчиллэг исэл, учир нь:',
    [['Reacts with acids', 'Хүчилтэй урвалд орно'], ['Reacts with bases to form a salt and water', 'Суурьтай урвалд орж давс ба ус үүсгэнэ'], ['Is a metal oxide', 'Металлын исэл'], ['Is an ionic compound', 'Ионт нэгдэл']], 'B',
    'Acidic oxides are oxides of non-metals. They dissolve in water to form acids and react with bases to make salts.',
    'Хүчиллэг исэл нь металл бус элементийн исэл. Усанд уусаад хүчил үүсгэж, суурьтай урвалд орж давс үүсгэнэ.'),
  w72(2, 'Basic oxide', 'Суурьт исэл', 'A basic oxide is typically formed from:', 'Суурьт исэл ихэвчлэн юунаас үүсэх вэ?',
    [['A non-metal', 'Металл бус элемент'], ['A metal', 'Металл'], ['A noble gas', 'Инертийн хий'], ['A halogen', 'Галоген']], 'B',
    'Metal oxides are basic: they react with acids to neutralise them. Non-metal oxides are the acidic ones.',
    'Металлын исэл суурьт: хүчилтэй урвалд орж түүнийг саармагжуулдаг. Металл бус элементийн исэл хүчиллэг байдаг.'),
  w72(3, 'Amphoteric oxide', 'Давхар шинжтэй исэл', 'Aluminium oxide is amphoteric because it:', 'Алюминийн исэл давхар шинжтэй, учир нь:',
    [['Dissolves in neither acid nor alkali', 'Хүчил, шүлт аль алинд нь уусдаггүй'], ['Reacts with both acids and alkalis', 'Хүчил, шүлт хоёуланд нь урвалд орно'], ['Is a gas', 'Хий'], ['Is a non-metal oxide', 'Металл бус элементийн исэл']], 'B',
    'An amphoteric oxide reacts with both acids and alkalis, forming a salt and water in each case. Such oxides are usually found with metals in the middle of the Periodic Table.',
    'Давхар шинжтэй исэл нь хүчил, шүлт хоёуланд урвалд орж, аль алинд нь давс ба ус үүсгэдэг.'),
  w72(4, 'Acidic oxide identification', 'Хүчиллэг исэл таних', 'Which oxide is acidic?', 'Аль исэл хүчиллэг вэ?',
    [['Magnesium oxide, MgO', 'Магнийн исэл, MgO'], ['Sodium oxide, Na₂O', 'Натрийн исэл, Na₂O'], ['Sulfur dioxide, SO₂', 'Хүхрийн давхар исэл, SO₂'], ['Calcium oxide, CaO', 'Кальцийн исэл, CaO']], 'C',
    'Sulfur dioxide is an oxide of a non-metal, so it is acidic. MgO, Na₂O and CaO are basic oxides of metals.',
    'Хүхрийн давхар исэл нь металл бус элементийн исэл тул хүчиллэг. MgO, Na₂O, CaO нь металлын суурьт исэл.'),

  // 7.3 Salt preparation methods and titration
  w73(1, 'Soluble salt from an insoluble base', 'Уусдаггүй суурьнаас давс', 'Which method prepares a soluble salt from an insoluble base such as copper(II) oxide?', 'Зэсийн(II) исэл гэх мэт уусдаггүй суурьнаас уусдаг давс бэлтгэх аргыг аль нь вэ?',
    [['Titration', 'Титрлэлт'], ['Add excess base, filter off the unreacted base', 'Илүүдэл суурь нэмж, урвалгүй суурийг шүүх'], ['Precipitation', 'Тунадасжилт'], ['Electrolysis', 'Электролиз']], 'B',
    'Titration needs a soluble base (an alkali) to show the end point. For an insoluble base, you add it in excess until the acid is used up, then filter it off.',
    'Титрлэлт нь төгсгөлийн цэг тогтоохын тулд уусдаг суурь (шүлт) шаарддаг. Уусдаггүй суурийг хүчил дуустал илүүдэлтэй нэмж, дараа нь шүүнэ.'),
  w73(2, 'Indicator in titration', 'Титрлэлтийн индикатор', 'In a titration, the indicator is added to:', 'Титрлэлтэд индикаторыг хаана нэмэх вэ?',
    [['The burette', 'Бюреткэд'], ['The conical flask with the acid or alkali being titrated', 'Титрлэж буй хүчил эсвэл шүлттэй коник колбод'], ['The filter funnel', 'Шүүлтийн хонхонд'], ['The evaporating dish', 'Ууршуулах тавгийн аяганд']], 'B',
    'The indicator is in the solution being analysed, the conical flask. The burette holds the solution you add from it.',
    'Индикатор нь шинжилж буй уусмалд, коник колбонд нэмэгддэг. Бюреткэд байгаа уусмал нь нэмэгдэх уусмал.'),
  w73(3, 'Concordant titres', 'Зөрүүгүй титрүүд', 'Two titres are concordant when they agree within:', 'Хоёр титр хэдэн дотор тохирвол зөрүүгүй гэх вэ?',
    [['±1.0 cm³', '±1.0 см³'], ['±0.10 cm³', '±0.10 см³'], ['±10 cm³', '±10 см³'], ['±0.5 cm³', '±0.5 см³']], 'B',
    'Concordant titres agree to within 0.10 cm³ and are used to calculate the mean titre. Titres that are further apart are not averaged.',
    'Зөрүүгүй титр нь 0.10 см³-ийн дотор тохирч, дундаж титрийг тооцоход ашиглагдана. Илүү зөрсөн титрийг дунджилдаггүй.'),
  w73(4, 'Obtaining a dry salt', 'Хуурай давс авах', 'After titration, to obtain solid sodium chloride from the solution you should:', 'Титрлэлтийн дараа уусмалаас натрийн хлоридын хатуу бодис авахын тулд:',
    [['Evaporate to complete dryness', 'Бүрэн хуурайтал ууршуулах'], ['Evaporate most of the water, then leave it to crystallise', 'Ихэнх усыг ууршуулж, дараа нь талстжуулах'], ['Filter it through paper', 'Цаасаар шүүх'], ['Distil it', 'Нэрэх']], 'B',
    'Evaporating to dryness can decompose or spatter the salt. Heat until crystals start to form, then cool so the crystals grow.',
    'Бүрэн хуурайтал ууршуулбал давс задрах эсвэл сачрах боломжтой. Талст үүсэх хүртэл халааж, дараа нь хөргөвөл талст ургана.'),

  // 8.1 Arrangement of elements
  w81(1, 'Arranging the elements', 'Элементийн байрлал', 'The elements in the Periodic Table are arranged in order of:', 'Үелэх системд элементүүд ямар дарааллаар байрлах вэ?',
    [['Relative atomic mass', 'Харьцангуй атомын масс'], ['Proton number (atomic number)', 'Протоны тоо (атомын дугаар)'], ['Density', 'Нягт'], ['Colour', 'Өнгө']], 'B',
    'Proton number is the basis of the modern table. Relative atomic mass was used earlier, but it gave some elements out of order.',
    'Протоны тоо нь орчин үеийн системийн үндэс. Харьцангуй атомын масс урьд нь хэрэглэгдэж байсан ч зарим элемент буруу байрлаж байсан.'),
  w81(2, 'Group number', 'Бүлгийн дугаар', 'An element has 3 electrons in its outer shell. Which group is it in?', 'Элементийн гаднах бүрхүүлд 3 электрон байна. Аль бүлэгт хамаарах вэ?',
    [['Group III', 'III бүлэг'], ['Group I', 'I бүлэг'], ['Group VII', 'VII бүлэг'], ['Group 0', '0 бүлэг']], 'A',
    'The group number of a main-group element is the number of outer electrons, so 3 outer electrons means Group III.',
    'Үндсэн бүлгийн элементийн бүлгийн дугаар нь гаднах электроны тоо тул 3 электрон III бүлэг.'),
  w81(3, 'Elements in one period', 'Нэг үеийн элементүүд', 'Elements in the same period have the same number of:', 'Нэг үеийн элементүүд ижил тоотой байдаг нь:',
    [['Outer electrons', 'Гаднах электрон'], ['Electron shells', 'Электрон бүрхүүл'], ['Mass', 'Масс'], ['Reactivity', 'Идэвх']], 'B',
    'The period number is the number of electron shells. Elements in one period share that number, but their outer electrons differ.',
    'Үеийн дугаар нь электрон бүрхүүлийн тоо. Нэг үеийн элементүүд энэ тоотой байдаг ч гаднах электроны тоо өөр.'),
  w81(4, 'Metalloids', 'Металлоид', 'Metalloids (semi-metals) are found:', 'Металлоид (хагас металл) хаана байрладаг вэ?',
    [['At the far left only', 'Зөвхөн зүүн захад'], ['Along the zig-zag line between metals and non-metals', 'Металл ба металл бусын хоорондох зигзаг шугамд'], ['In Group 0 only', 'Зөвхөн 0 бүлэгт'], ['Only among transition metals', 'Зөвхөн шилжилтийн металлд']], 'B',
    'Metalloids such as silicon sit along the zig-zag line that separates metals from non-metals in the Periodic Table.',
    'Кремний гэх мэт металлоид нь үелэх системд металлыг металл бусаас тусгаарлах зигзаг шугамын дагуу байрлана.'),

  // 8.2 Group I properties
  w82(1, 'Reactivity down Group I', 'I бүлгийн идэвх', 'Going down Group I, the reactivity of the metals:', 'I бүлгээр доош явахад металлын идэвх:',
    [['Decreases', 'Буурна'], ['Increases', 'Нэмэгдэнэ'], ['Stays the same', 'Ижил хэвээр'], ['Cannot be predicted', 'Таамаглах боломжгүй']], 'B',
    'Going down Group I, the outer electron is further from the nucleus and more easily lost, so the reactivity increases.',
    'I бүлэгт доош бууһаа гаднах электрон цөмөөс холдож, амархан алдагдах тул идэв нэмэгдэнэ.'),
  w82(2, 'Lithium and water', 'Литий ба ус', 'Lithium reacts with water to form:', 'Литий устай урвалд орж юу үүсгэх вэ?',
    [['Lithium oxide and hydrogen', 'Литийн исэл ба устөрөгч'], ['Lithium hydroxide and hydrogen', 'Литийн гидроксид ба устөрөгч'], ['Lithium chloride', 'Литийн хлорид'], ['Lithium peroxide', 'Литийн пероксид']], 'B',
    'Group I metals react with water to form a metal hydroxide (an alkali) and hydrogen gas. The solution is alkaline.',
    'I бүлгийн металл ус тай урвалд орж металлын гидроксид (шүлт) ба устөрөгч үүсгэнэ. Уусмал шүлтлэг.'),
  w82(3, 'Storage of alkali metals', 'Шүлтлэг металлын хадгалалт', 'Group I metals are stored under oil because they:', 'I бүлгийн металлыг тосны доор хадгалдаг, учир нь:',
    [['React with oxygen and water in the air', 'Агаарт хүчилтөрөгч, устай урвалд орно'], ['Are liquids', 'Шингэн'], ['Are magnetic', 'Соронзон'], ['Are gases', 'Хий']], 'A',
    'Group I metals are very reactive and would react with air and moisture. Oil keeps them away from both.',
    'I бүлгийн металл маш идэвхтэй тул агаар, чийгтэй урвалд орно. Тос нь тэднийг хоёуланг нь таслан зогсооно.'),
  w82(4, 'Outer electrons of potassium', 'Калийн гаднах электрон', 'How many outer electrons does a potassium atom have?', 'Калийн атомд хэдэн гаднах электрон байдаг вэ?',
    [['1', '1'], ['2', '2'], ['7', '7'], ['8', '8']], 'A',
    'Potassium is in Group I, so it has one outer electron, which it loses easily to form K⁺.',
    'Калий I бүлэгт байдаг тул нэг гаднах электронтой; үүнийг амархан алдаж K⁺ болно.'),

  // 8.3 Group VII properties
  w83(1, 'Halogen molecules', 'Галогений молекул', 'Halogens exist as:', 'Галоген ямар хэлбэрээр оршдог вэ?',
    [['Single atoms', 'Ганц атом'], ['Diatomic molecules', 'Хоёр атомт молекул'], ['Giant lattices', 'Аварга тор'], ['Ions', 'Ион']], 'B',
    'Halogens are diatomic molecules: F₂, Cl₂, Br₂ and I₂. Each atom needs one more electron, so two atoms share a pair.',
    'Галоген нь хоёр атомт молекул: F₂, Cl₂, Br₂, I₂. Атом бүр нэг электрон дутуу тул хоёр атом нэг хос хуваалцана.'),
  w83(2, 'Reactivity down Group VII', 'VII бүлгийн идэвх', 'Going down Group VII, the reactivity of the halogens:', 'VII бүлгээр доош явахад галогений идэвх:',
    [['Increases', 'Нэмэгдэнэ'], ['Decreases', 'Буурна'], ['Stays the same', 'Ижил хэвээр'], ['Is zero', 'Тэг']], 'B',
    'Going down the group the atoms are larger, so the nucleus attracts the incoming electron less strongly and reactivity falls.',
    'Бүлэгт доош бууһаа атом томорч, цөм орж ирэх электроныг бага татдаг тул идэв буурна.'),
  w83(3, 'Displacement of bromide', 'Бромын орлуулалт', 'Chlorine water is added to potassium bromide solution. The products are:', 'Хлорын ус калийн бромидын уусмалд нэмэгдэхэд үүсэх бүтээгдэхүүн:',
    [['Bromine and potassium chloride', 'Бром ба калийн хлорид'], ['Iodine', 'Иод'], ['Fluorine', 'Фтор'], ['No change', 'Өөрчлөлтгүй']], 'A',
    'Chlorine is more reactive than bromine, so it displaces bromine from its bromide: Cl₂ + 2KBr → 2KCl + Br₂.',
    'Хлор бромоос идэвхтэй тул бромыг бромидоос нь орлуулна: Cl₂ + 2KBr → 2KCl + Br₂.'),
  w83(4, 'Colour of iodine', 'Иодын өнгө', 'Iodine at room temperature is:', 'Иод өрөөний температурт:',
    [['A pale green gas', 'Цайвар ногоон хий'], ['A yellow solid', 'Шар хатуу бодис'], ['A grey-black solid', 'Саарал-хар хатуу бодис'], ['A colourless liquid', 'Өнгөгүй шингэн']], 'C',
    'Iodine is a dark grey-black crystalline solid that sublimes to a purple vapour when warmed.',
    'Иод нь бараан саарал-хар талст хатуу бодис; халахад ягаан уур болж сублимаци болно.'),

  // 8.4 Transition elements
  w84(1, 'Position of transition metals', 'Шилжилтийн металлын байрлал', 'Transition metals are found:', 'Шилжилтийн металл хаана байрладаг вэ?',
    [['In Groups I and II', 'I ба II бүлэгт'], ['In the central block between Groups II and III', 'II ба III бүлгийн хооронд төвийн блокт'], ['All as gases', 'Бүгд хийн хэлбэрээр'], ['Only as non-metals', 'Зөвхөн металл бус']], 'B',
    'Transition elements form the central block of the Periodic Table, between Group II and Group III.',
    'Шилжилтийн элементүүд нь үелэх системийн II ба III бүлгийн хооронд байрлах төвийн блокийг бүрдүүлдэг.'),
  w84(2, 'Coloured compounds', 'Өнгөтэй нэгдэл', 'Many transition metal compounds are coloured because they:', 'Шилжилтийн металлын олон нэгдэл өнгөтэй, учир нь:',
    [['Contain sodium', 'Натри агуулдаг'], ['Often have variable oxidation numbers', 'Исэлдэлтийн тоо ихэвчлэн хувьсдаг'], ['Are radioactive', 'Цацрагт идэвхтэй'], ['Contain chlorine', 'Хлор агуулдаг']], 'B',
    'Transition metals can take several oxidation numbers, and their compounds often absorb visible light, which gives them colour.',
    'Шилжилтийн металл хэд хэдэн исэлдэлтийн тоо авч чаддаг бөгөөд нэгдэл нь харагдах гэрлийг шингээдэг тул өнгөтэй.'),
  w84(3, 'Iron catalyst', 'Төмрийн катализатор', 'Iron is used as a catalyst in the Haber process because it is:', 'Хабер процессод төмрийг катализатор болгон ашигладаг, учир нь:',
    [['A non-metal', 'Металл бус'], ['A transition metal that speeds up the reaction', 'Урвалыг хурдасгадаг шилжилтийн металл'], ['A noble gas', 'Инертийн хий'], ['A halogen', 'Галоген']], 'B',
    'Transition metals are often good catalysts. Iron speeds up the reaction between nitrogen and hydrogen without being used up.',
    'Шилжилтийн металл ихэвчлэн сайн катализатор. Төмөр азот, устөрөгчийн урвалыг хурдасгаж, өөрөө зарцуулагдахгүй.'),
  w84(4, 'Typical transition metal property', 'Шилжилтийн металлын шинж', 'Which property is typical of transition metals?', 'Аль шинж нь шилжилтийн металлд хамгийн тохиромжтой вэ?',
    [['Very low melting points', 'Маш бага хайлах цэгтэй'], ['Variable oxidation numbers', 'Хувьсах исэлдэлтийн тоотой'], ['Only +1 ions', 'Зөвхөн +1 ион'], ['Gases at room temperature', 'Өрөөний температурт хий']], 'B',
    'Unlike Group I metals, transition metals form ions with more than one charge, so they have variable oxidation numbers.',
    'I бүлгийн металлаас ялгаатай нь шилжилтийн металл хэд хэдэн цэнэгтэй ион үүсгэдэг тул исэлдэлтийн тоо хувьсдаг.'),

  // 8.5 Noble gases
  w85(1, 'Unreactive noble gases', 'Идэвхгүй инертийн хий', 'Noble gases are unreactive because they have:', 'Инертийн хий урвалд орохгүй, учир нь:',
    [['Full outer shells', 'Гаднах бүрхүүл нь бүрэн'], ['One outer electron', 'Гаднах нэг электрон'], ['Radioactive nuclei', 'Цацраг идэвхтэй цөм'], ['Ionic charges', 'Ионы цэнэг']], 'A',
    'A full outer shell is a stable arrangement, so noble gases have little tendency to gain, lose or share electrons.',
    'Гаднах бүрхүүл бүрэн байвал тогтвортой тул инертийн хий электрон авах, алдах, хуваалцах хандлага бага.'),
  w85(2, 'Argon in light bulbs', 'Аргон гэрлийн лампанд', 'Argon is used in light bulbs because it:', 'Аргоныг гэрлийн лампанд ашигладаг, учир нь:',
    [['Is unreactive and does not burn at high temperatures', 'Идэвхгүй бөгөөд өндөр температурт шатдаггүй'], ['Is very reactive', 'Маш идэвхтэй'], ['Is a metal', 'Металл'], ['Is toxic', 'Хортой']], 'A',
    'The filament is hot, so the gas must not react with it. Argon protects the filament from burning up.',
    'Утас маш халуун тул хий түүнтэй урвалд орох ёсгүй. Аргон нь утсыг шатахаас хамгаална.'),
  w85(3, 'Monatomic noble gases', 'Ганц атомт инертийн хий', 'Noble gases exist as:', 'Инертийн хий ямар хэлбэрээр оршдог вэ?',
    [['Diatomic molecules', 'Хоёр атомт молекул'], ['Single (monatomic) atoms', 'Ганц (нэг атомт) атом'], ['Giant lattices', 'Аварга тор'], ['Ions', 'Ион']], 'B',
    'Noble gases are monatomic: their atoms do not bond together, so they exist as single atoms.',
    'Инертийн хий нэг атомт: атом нь бие биентэйгээ холбогддоггүй тул ганц атом хэлбэрээр оршдог.'),
  w85(4, 'Helium in balloons', 'Гели бөмбөлөгт', 'Helium is used in balloons because it is:', 'Гелийг бөмбөлөгт ашигладаг, учир нь:',
    [['Less dense than air and unreactive', 'Агаараас нягт бага, идэвхгүй'], ['Denser than air', 'Агаараас нягт'], ['Reactive', 'Идэвхтэй'], ['A liquid', 'Шингэн']], 'A',
    'Helium is much lighter than air, so it lifts the balloon, and it is unreactive so it is safe.',
    'Гели агаараас хамаагүй хөнгөн тул бөмбөлгийг өргөнө; идэвхгүй тул аюулгүй.'),
];
