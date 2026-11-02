import type { ExamQuestion } from '../types/chemistry';
import type { Taxonomy } from '../lib/taxonomy';
import { topicWriter } from './topicMcqBuild';

// Apply and evaluate questions for chapters 7 to 12, so that every topic has some of each level on the lesson assessment sheet.
// They are original, written for the 0620 syllabus; none is copied from a Cambridge paper.
const CH7 = 'ch-acids-bases';
const CH8 = 'ch-periodic-table';
const CH9 = 'ch-metals';
const CH10 = 'ch-environment';
const CH11 = 'ch-organic';
const CH12 = 'ch-experimental-analysis';

const tag = (q: ExamQuestion, taxonomy: Taxonomy): ExamQuestion => ({ ...q, taxonomy });

const d71 = topicWriter('s-7-1', CH7, '0620/7.1');
const d72 = topicWriter('s-7-2', CH7, '0620/7.2');
const d73 = topicWriter('top-7-1', CH7, '0620/7.3');
const d81 = topicWriter('s-8-1', CH8, '0620/8.1');
const d82 = topicWriter('s-8-2', CH8, '0620/8.2');
const d83 = topicWriter('s-8-3', CH8, '0620/8.3');
const d84 = topicWriter('s-8-4', CH8, '0620/8.4');
const d85 = topicWriter('s-8-5', CH8, '0620/8.5');
const d91 = topicWriter('s-9-1', CH9, '0620/9.1');
const d92 = topicWriter('s-9-2', CH9, '0620/9.2');
const d93 = topicWriter('s-9-3', CH9, '0620/9.3');
const d94 = topicWriter('s-9-4', CH9, '0620/9.4');
const d95 = topicWriter('s-9-5', CH9, '0620/9.5');
const d96 = topicWriter('s-9-6', CH9, '0620/9.6');
const d101 = topicWriter('s-10-1', CH10, '0620/10.1');
const d102 = topicWriter('s-10-2', CH10, '0620/10.2');
const d103 = topicWriter('s-10-3', CH10, '0620/10.3');
const d111 = topicWriter('s-11-1', CH11, '0620/11.1');
const d112 = topicWriter('s-11-2', CH11, '0620/11.2');
const d113 = topicWriter('s-11-3', CH11, '0620/11.3');
const d114 = topicWriter('s-11-4', CH11, '0620/11.4');
const d115 = topicWriter('s-11-5', CH11, '0620/11.5');
const d116 = topicWriter('s-11-6', CH11, '0620/11.6');
const d117 = topicWriter('s-11-7', CH11, '0620/11.7');
const d118 = topicWriter('s-11-8', CH11, '0620/11.8');
const d121 = topicWriter('s-12-1', CH12, '0620/12.1');
const d122 = topicWriter('s-12-2', CH12, '0620/12.2');
const d124 = topicWriter('s-12-4', CH12, '0620/12.4');
const d125 = topicWriter('top-12-1', CH12, '0620/12.5');

export const TOPIC_MCQ_LEVELS_B: ExamQuestion[] = [
  // 7.1 Characteristic properties of acids and bases
  tag(d71(80, 'Comparing pH values', 'pH утгыг харьцуулах', 'Solution P has pH 2 and solution Q has pH 4. Which statement is correct?', 'P уусмалын pH 2, Q уусмалын pH 4. Аль мэдэгдэл зөв вэ?',
    [['P is strongly alkaline', 'P хүчтэй шүлтлэг'], ['P is more acidic, with more H⁺ ions than Q', 'P илүү хүчиллэг, Q-с илүү H⁺ ион агуулна'], ['P is neutral', 'P саармаг'], ['P contains more OH⁻ ions than a pH 7 solution', 'P нь pH 7-ийн уусмалаас илүү OH⁻ ион агуулна']],
    'B', 'Thinking a lower pH means a weaker acid, or reading the pH scale the wrong way round.', 'pH бага байх нь сул хүчил гэж бодох, эсвэл pH-ийн шкалыг буруу уншах.'), 'apply'),
  tag(d71(81, 'Are all bases alkalis', 'Бүх суурь шүлт үү', 'A student says: "All bases are alkalis." Evaluate this statement.', 'Сурагч: "Бүх суурь бол шүлт." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: every base dissolves in water', 'Зөв: суурь бүр усанд уусдаг'], ['Incorrect: an alkali is a base that dissolves in water; insoluble bases such as copper(II) oxide are bases but not alkalis', 'Буруу: шүлт бол усанд уусдаг суурь; зэсийн(II) исэл гэх мэт уусдаггүй суурь нь суурь ч шүлт биш'], ['Correct: bases are always acids', 'Зөв: суурь үргэлж хүчил'], ['Incorrect: bases contain no hydroxide', 'Буруу: суурь гидроксид агуулдаггүй']],
    'B', 'Using alkali and base as if they mean the same thing.', 'Шүлт ба суурийг адилхан утгаар ашиглах.'), 'evaluate'),

  // 7.2 Oxides
  tag(d72(80, 'Carbon dioxide in water', 'Усанд нүүрсхүчлийн хий', 'Carbon dioxide dissolves in water to form a solution. What is the effect on the pH?', 'Нүүрсхүчлийн хий усанд уусаж уусмал үүсгэнэ. pH-д ямар нөлөө үзүүлэх вэ?',
    [['The pH rises above 7', 'pH 7-оос дээш өснө'], ['The pH falls below 7', 'pH 7-оос доош буурна'], ['The pH stays exactly 7', 'pH яг 7 хэвээр'], ['There is no change', 'Огт өөрчлөгдөхгүй']],
    'B', 'Thinking non-metal oxides dissolve to give an alkaline solution.', 'Металл бус исэл уусахдаа шүлтлэг уусмал өгнө гэж бодох.'), 'apply'),
  tag(d72(81, 'Are non-metal oxides acidic', 'Металл бус исэл хүчиллэг үү', 'A student says: "All non-metal oxides are acidic." Evaluate this statement.', 'Сурагч: "Металл бус бүх исэл хүчиллэг." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: every non-metal oxide is acidic', 'Зөв: металл бус исэл бүр хүчиллэг'], ['Incorrect: most non-metal oxides are acidic, but carbon monoxide and nitrogen(I) oxide are neutral', 'Буруу: ихэнх металл бус исэл хүчиллэг, харин нүүрстөрөгчийн дутуу исэл, азотын(I) исэл саармаг'], ['Correct: they are all basic', 'Зөв: бүгд суурь'], ['Incorrect: none react with water', 'Буруу: ус тай огт урвалд ордоггүй']],
    'B', 'Generalising from the common examples, such as carbon dioxide and sulfur dioxide.', 'Нийтлэг жишээнээс, жишээ нь нүүрсхүчлийн хий ба хүхрийн давхар исэлээс ерөнхийлөх.'), 'evaluate'),

  // 7.3 Salt preparation and titration
  tag(d73(81, 'The end-point of an indicator', 'Индикаторын төгсгөлийн цэг', 'A student says: "The indicator end-point is always exactly the equivalence point, so the indicator gives the exact value." Evaluate this statement.', 'Сурагч: "Индикаторын төгсгөлийн цэг үргэлж яг эквивалент цэг тул индикатор яг утгыг өгнө." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: the indicator always gives the exact value', 'Зөв: индикатор үргэлж яг утгыг өгнө'], ['Partly wrong: the end-point is close to the equivalence point but can differ slightly, so an indicator that changes colour near the equivalence point is chosen', 'Хэсэгчлэн буруу: төгсгөлийн цэг эквивалент цэгт ойр боловч бага зэрэг ялгаатай байж болно, тиймээс эквивалент цэгийн ойролцоо өнгөө өөрчилдөг индикатор сонгоно'], ['Correct: the end-point is always pH 7', 'Зөв: төгсгөлийн цэг үргэлж pH 7'], ['Incorrect: indicators are not used in titration', 'Буруу: титрлэлтэд индикатор ашигладаггүй']],
    'B', 'Assuming the colour change happens exactly at the equivalence point.', 'Өнгөний өөрчлөлт яг эквивалент цэгт явагддаг гэж бодох.'), 'evaluate'),

  // 8.1 Arrangement of the elements
  tag(d81(80, 'Locating an element', 'Элементийг байрлуулах', 'Element X is in period 3 and group 2 of the Periodic Table. Which element is it?', 'X элемент үелэх системийн 3-р period, 2-р бүлэгт байна. Энэ нь аль элемент вэ?',
    [['Sodium', 'Натри'], ['Magnesium', 'Магни'], ['Aluminium', 'Хөнгөн цагаан'], ['Calcium', 'Кальци']],
    'B', 'Counting the group from the wrong end, or confusing the period with the group.', 'Бүлгийг буруу талаас тоолох, үеийг бүлэгтэй андуурах.'), 'apply'),
  tag(d81(81, 'Same group, same protons', 'Нэг бүлэг, ижил протон', 'A student says: "Elements in the same group have the same number of protons." Evaluate this statement.', 'Сурагч: "Нэг бүлгийн элементүүд протоны тоо адил." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: the group is set by the protons', 'Зөв: бүлгийг протон тодорхойлдог'], ['Incorrect: elements in the same group have the same number of outer electrons, not the same number of protons', 'Буруу: нэг бүлгийн элементүүд гадаад бүрхүүлийн электроны тоо адил, протоны тоо адил биш'], ['Correct: they have the same mass', 'Зөв: адил масстай'], ['Incorrect: the group is the same as the period', 'Буруу: бүлэг нь үетэй адил']],
    'B', 'Thinking the group number counts protons, rather than outer electrons.', 'Бүлгийн дугаарыг протоноор тоолно гэж бодох, гадаад электроныг мартах.'), 'evaluate'),

  // 8.2 Group I properties
  tag(d82(81, 'Reactivity of potassium and sodium', 'Калий ба натрийн идэвх', 'A student says: "Potassium is less reactive than sodium because it has fewer electrons." Evaluate this statement.', 'Сурагч: "Калий натрийгээс идэвх багатай, учир нь электрон цөөн." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: fewer electrons mean less reactivity', 'Зөв: электрон цөөн бол идэвх бага'], ['Incorrect: potassium has more electron shells, so its outer electron is further from the nucleus and is lost more easily; it is more reactive', 'Буруу: калид илүү электроны бүрхүүл байдаг тул гаднах электрон цөмөөс хол, амархан алдагдана; илүү идэвхтэй'], ['Correct: they are equally reactive', 'Зөв: адил идэвхтэй'], ['Incorrect: potassium does not react with water', 'Буруу: калий ус тай урвалд ордоггүй']],
    'B', 'Counting the total electrons, rather than the outer electron that is lost in reactions.', 'Нийт электроныг тоолох, харин урвалд алдагддаг гаднах электроныг мартах.'), 'evaluate'),

  // 8.3 Group VII properties
  tag(d83(80, 'Bromine and sodium iodide', 'Бром ба натрийн иодид', 'Bromine water is added to sodium iodide solution. Which observation is correct?', 'Бромын усыг натрийн иодидын уусмалд нэмэв. Аль ажиглалт зөв вэ?',
    [['No reaction happens', 'Урвал явагдахгүй'], ['Bromine displaces iodine, and a brown solution forms', 'Бром иодыг орлуулж, бор уусмал үүсэх'], ['Iodine displaces bromine', 'Иод бромыг орлуулна'], ['The solution turns colourless', 'Уусмал өнгөгүй болно']],
    'B', 'Thinking iodine is more reactive than bromine, so no displacement happens.', 'Иод бромоос илүү идэвхтэй тул орлуулалт болохгүй гэж бодох.'), 'apply'),
  tag(d83(81, 'Reactivity of fluorine', 'Фторын идэвх', 'A student says: "Fluorine is less reactive than iodine because it is larger." Evaluate this statement.', 'Сурагч: "Фтор иодоос идэвх багатай, учир нь том." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: larger atoms are less reactive', 'Зөв: том атом идэвх бага'], ['Incorrect: fluorine is smaller and more reactive; its atoms gain an electron more easily', 'Буруу: фтор жижиг, илүү идэвхтэй; атом нь электрон амархан авдаг'], ['Correct: they are equally reactive', 'Зөв: адил идэвхтэй'], ['Incorrect: fluorine is a metal', 'Буруу: фтор металл']],
    'B', 'Thinking size works in the same way for the halogens as it does for the group I metals.', 'Хэмжээ нь галогенд шүлтлэг металлтай адил нөлөөлнө гэж бодох.'), 'evaluate'),

  // 8.4 Transition elements
  tag(d84(80, 'Naming a chloride', 'Хлоридын томьёо', 'Iron(III) chloride has the formula FeCl₃. What is the formula of iron(II) chloride?', 'Төмрийн(III) хлорид нь FeCl₃ томьёотой. Төмрийн(II) хлоридын томьёо хэд вэ?',
    [['FeCl', 'FeCl'], ['FeCl₂', 'FeCl₂'], ['Fe₂Cl', 'Fe₂Cl'], ['Fe₂Cl₃', 'Fe₂Cl₃']],
    'B', 'Keeping the same number of chloride ions when the iron ion has a different charge.', 'Төмрийн ионы цэнэг өөр байхад хлоридын тоог адилхан хадгалах.'), 'apply'),
  tag(d84(81, 'All transition compounds are coloured', 'Бүх шилжилтийн нэгдэл өнгөтэй', 'A student says: "All compounds of transition metals are coloured." Evaluate this statement.', 'Сурагч: "Шилжилтийн металлын бүх нэгдэл өнгөтэй." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: every transition metal compound is coloured', 'Зөв: шилжилтийн металлын нэгдэл бүр өнгөтэй'], ['Incorrect: many are coloured, but some are not, for example titanium(IV) oxide is white', 'Буруу: олон нь өнгөтэй боловч заримыг нь өнгөгүй, жишээ нь титан(IV) исэл цагаан'], ['Correct: none are coloured', 'Зөв: огт өнгөгүй'], ['Incorrect: only gases are coloured', 'Буруу: зөвхөн хий өнгөтэй']],
    'B', 'Generalising from the coloured compounds met in class to all of them.', 'Хичээлд таньсан өнгөтэй нэгдлээс бүгдийг ерөнхийлөх.'), 'evaluate'),

  // 8.5 Noble gases
  tag(d85(80, 'Why a helium balloon rises', 'Гелийн бөмбөлөг яагаад дээшлэх вэ', 'A balloon filled with helium rises in air. Which statement explains this?', 'Гелиэр дүүргэсэн бөмбөлөг агаарт дээшлэнэ. Аль мэдэгдэл үүнийг тайлбарлах вэ?',
    [['Helium is denser than air', 'Гелий агаараас нягт'], ['Helium is less dense than air, so the balloon is buoyant', 'Гелий агаараас бага нягттай тул бөмбөлөг хөвөх хүчтэй'], ['Helium reacts with the air', 'Гелий агаартай урвалд орно'], ['Helium has a positive charge', 'Гелий эерэг цэнэгтэй']],
    'B', 'Thinking helium is heavier than air, or that it pushes off the air by reacting with it.', 'Гелий агаараас хүнд гэж бодох, эсвэл агаартай урвалд орж түлхдэг гэж бодох.'), 'apply'),
  tag(d85(81, 'Noble gases never react', 'Благородны хий огт урвалд орохгүй', 'A student says: "Noble gases never react with anything." Evaluate this statement.', 'Сурагч: "Благородны хийнүүд ямар ч бодистой огт урвалд ордоггүй." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: they never react', 'Зөв: огт урвалд орохгүй'], ['Incorrect: they are very unreactive, but xenon reacts with fluorine under special conditions', 'Буруу: маш идэвхгүй боловч ксенон тусгай нөхцөлд фтортой урвалд орно'], ['Correct: they react with everything', 'Зөв: бүх зүйлтэй урвалд орно'], ['Incorrect: noble gases are metals', 'Буруу: благородны хий металл']],
    'B', 'Turning "very unreactive" into "never reacts".', '"Маш идэвхгүй"-г "огт урвалд орохгүй" гэж хувиргах.'), 'evaluate'),

  // 9.1 Properties of metals
  tag(d91(80, 'Properties of a good conductor', 'Сайн дамжуулагчийн шинж', 'A metal conducts electricity well. Which other property is most likely?', 'Металл цахилгааныг сайн дамжуулдаг. Ямар бусад шинж чанар магадгүй вэ?',
    [['A low melting point', 'Хайлах цэг бага'], ['Good thermal conductivity', 'Дулаан сайн дамжуулдаг'], ['Brittleness', 'Хугарамтгай'], ['Electrical insulation', 'Цахилгаан тусгаарлагч']],
    'B', 'Expecting a conductor of electricity to be an insulator of heat.', 'Цахилгаан дамжуулагч нь дулааны тусгаарлагч байна гэж бодох.'), 'apply'),
  tag(d91(81, 'Are all metals magnetic', 'Бүх металл соронзон уу', 'A student says: "All metals are magnetic." Evaluate this statement.', 'Сурагч: "Бүх металл соронзон." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: every metal attracts a magnet', 'Зөв: металл бүр соронзонд татагддаг'], ['Incorrect: only iron, cobalt and nickel are strongly magnetic at room temperature; most metals are not', 'Буруу: өрөөний температурт зөвхөн төмөр, кобальт, никель хүчтэй соронзон; ихэнх металл биш'], ['Correct: no metal is magnetic', 'Зөв: ямар ч металл соронзон биш'], ['Incorrect: only gold is magnetic', 'Буруу: зөвхөн алт соронзон']],
    'B', 'Generalising from iron, which is the familiar magnetic metal.', 'Төмрөөс ерөнхийлөх, учир нь төмөр бол мэдэгдэх соронзон металл.'), 'evaluate'),

  // 9.2 Uses of metals
  tag(d92(80, 'Choosing a metal for aircraft', 'Агаарын хөлөгт металл сонгох', 'Which material is the best choice for an aircraft body?', 'Онгоцны биед аль материал хамгийн тохиромжтой вэ?',
    [['Lead, because it is dense', 'Хар тугалга, нягт учраас'], ['Aluminium alloy, because it is light and strong', 'Хөнгөн цагааны хайлш, хөнгөн, бат бөх учраас'], ['Gold, because it is expensive', 'Алт, үнэтэй учраас'], ['Steel, because it is the lightest', 'Ган, хамгийн хөнгөн учраас']],
    'B', 'Confusing a dense metal with a strong one, or judging by cost.', 'Нягт металлыг бат бөхтэй андуурах, эсвэл үнээр нь дүгнэх.'), 'apply'),
  tag(d92(81, 'Gold for electrical wires', 'Цахилгаан утсанд алт', 'A student says: "Gold should be used for electrical wires because it is the best conductor." Evaluate this statement.', 'Сурагч: "Цахилгаан утсанд алтыг ашиглах ёстой, учир нь энэ нь хамгийн сайн дамжуулагч." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: gold is the best conductor', 'Зөв: алт хамгийн сайн дамжуулагч'], ['Incorrect: silver conducts better, and copper is cheaper and is used instead of gold', 'Буруу: мөнгө илүү сайн дамжуулдаг, зэс хямд тул алтны оронд ашигладаг'], ['Correct: gold is cheap', 'Зөв: алт хямд'], ['Incorrect: gold is brittle wire', 'Буруу: алт хугарамтгай утас']],
    'B', 'Judging conductivity from a metal\'s value, rather than comparing the metals.', 'Металлын үнээс дамжуулалтыг дүгнэх, металлуудыг харьцуулахгүй байх.'), 'evaluate'),

  // 9.3 Alloys and their properties
  tag(d93(80, 'Choosing a material for jewellery', 'Үнэт эдлэлд материал сонгох', 'A jeweller wants a gold ring to be harder for daily wear. Which change is the best choice?', 'Үнэт эдэлгээ алтан бөгжийг өдөр тутмын хэрэглээнд хатуу болгохыг хүсэв. Аль өөрчлөлт хамгийн зохимжтой вэ?',
    [['Heat it until it melts', 'Хайлах хүртэл халаах'], ['Alloy it with copper or silver', 'Зэс эсвэл мөнгөтэй хайлш болгох'], ['Plate it with lead', 'Хар тугалгаар бүрэх'], ['Cool it to a lower temperature', 'Бага температур хүртэл хөргөх']],
    'B', 'Thinking a pure metal is always harder than an alloy.', 'Цэвэр металл хайлшаас үргэлж хатуу гэж бодох.'), 'apply'),
  tag(d93(81, 'Alloys are always harder', 'Хайлш үргэлж хатуу', 'A student says: "Alloys are always harder than the pure metals, and never weaker in any respect." Evaluate this statement.', 'Сурагч: "Хайлш нь цэвэр металлаас үргэлж хатуу, ямар ч талаараа бүр сул биш." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: alloys are better in every way', 'Зөв: хайлш бүх талаараа сайн'], ['Incorrect: alloys are usually harder, but this is not true in every respect, for example some alloys are less ductile', 'Буруу: хайлш ихэвчлэн хатуу боловч бүх талаар биш; жишээ нь зарим хайлш бага сунадаг'], ['Correct: alloys are never harder', 'Зөв: хайлш хэзээ ч хатуу биш'], ['Incorrect: alloys are not made of metals', 'Буруу: хайлш металлаас бүрддэггүй']],
    'B', 'Turning a general tendency into a rule that always holds.', 'Ерөнхий хандлагыг үргэлж үнэн байдаг дүрэм гэж хувиргах.'), 'evaluate'),

  // 9.4 Reactivity series
  tag(d94(80, 'Displacing iron', 'Төмрийг орлуулах', 'Which metal will displace iron from iron(II) sulfate solution?', 'Аль металл төмрийн(II) сульфатын уусмалаас төмрийг орлуулах вэ?',
    [['Copper', 'Зэс'], ['Silver', 'Мөнгө'], ['Zinc', 'Цайр'], ['Gold', 'Алт']],
    'C', 'Choosing a metal that is less reactive than iron.', 'Төмрөөс идэвх багатай металлыг сонгох.'), 'apply'),
  tag(d94(81, 'Copper displacing iron', 'Зэс төмрийг орлуулах', 'A student says: "Copper will displace iron from iron(II) sulfate solution, because copper is less reactive." Evaluate this statement.', 'Сурагч: "Зэс төмрийн(II) сульфатын уусмалаас төмрийг орлуулна, учир нь зэс идэвх багатай." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: the less reactive metal displaces the more reactive one', 'Зөв: идэвх багатай металл илүү идэвхтэйг орлуулна'], ['Incorrect: copper is less reactive, so it cannot displace iron; iron keeps its place in the solution', 'Буруу: зэс идэвх багатай тул төмрийг орлуулж чадахгүй; төмөр уусмалд хэвээр үлдэнэ'], ['Correct: both metals are equally reactive', 'Зөв: хоёр металл адил идэвхтэй'], ['Incorrect: iron cannot react with any solution', 'Буруу: төмөр ямар ч уусмалтай урвалд орохгүй']],
    'B', 'Reversing the rule, so that a less reactive metal is thought to displace a more reactive one.', 'Дүрмийг эсрэгээр нь ойлгох, идэвх багатай металл илүү идэвхтэйг орлуулна гэж бодох.'), 'evaluate'),

  // 9.5 Corrosion of metals
  tag(d95(80, 'Preventing rust', 'Зэврэлтээс сэргийлэх', 'An iron nail is set up in four ways. Which setup will prevent rusting best?', 'Төмрийн хадаасыг дөрвөн аргаар тавив. Аль нь зэврэлтээс хамгийн сайн сэргийлэх вэ?',
    [['In salt water', 'Давсны усанд'], ['In boiled water with a layer of oil on top, which keeps air out', 'Буцалсан усанд дээр нь тосны давхарга, агаарыг хаах'], ['In damp air', 'Чийглэг агаарт'], ['In water with air bubbled through', 'Агаар оруулсан усанд']],
    'B', 'Thinking boiling water still has enough oxygen to rust the nail.', 'Буцалсан ус дотор зэврүүлэх хангалттай хүчилтөрөгч байна гэж бодох.'), 'apply'),
  tag(d95(81, 'Paint protects forever', 'Будаг үүрд хамгаална', 'A student says: "Painting iron protects it forever, because paint never wears off." Evaluate this statement.', 'Сурагч: "Төмрийг будвал үүрд хамгаална, учир нь будаг хэзээ ч элэгдэхгүй." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: paint never wears off', 'Зөв: будаг хэзээ ч элэгддэггүй'], ['Incorrect: paint scratches and wears off, and then water and oxygen can reach the iron', 'Буруу: будаг сэвшиж, элэгдэх тул ус, хүчилтөрөгч төмөрт хүрнэ'], ['Correct: paint speeds up rusting', 'Зөв: будаг зэврэлтийг хурдасгана'], ['Incorrect: paint is always a metal', 'Буруу: будаг үргэлж металл']],
    'B', 'Assuming a protective layer lasts for ever, without thinking about wear.', 'Хамгаалалтын давхарга үүрд үргэлжилнэ гэж бодох, элэгдлийг мартах.'), 'evaluate'),

  // 9.6 Extraction of metals
  tag(d96(80, 'Electrons for aluminium', 'Хөнгөн цагаанд электрон', 'In the electrolysis of aluminium oxide, Al³⁺ + 3e⁻ → Al. How many moles of electrons are needed to make 1 mol of aluminium?', 'Хөнгөн цагааны ислийг электролиз хийхэд Al³⁺ + 3e⁻ → Al. 1 моль хөнгөн цагаан үүсгэхэд хэдэн моль электрон хэрэгтэй вэ?',
    [['1 mol', '1 моль'], ['2 mol', '2 моль'], ['3 mol', '3 моль'], ['6 mol', '6 моль']],
    'C', 'Using the charge on the aluminium ion only once, or doubling it.', 'Хөнгөн цагааны ионы цэнэгийг нэг л удаа ашиглах, эсвэл хоёр дахин авах.'), 'apply'),
  tag(d96(81, 'Extracting iron by electrolysis', 'Төмрийг электролизээр олборлох', 'A student says: "Iron is extracted from its ore by electrolysis because it is reactive." Evaluate this statement.', 'Сурагч: "Төмрийг ордоосоо электролизээр олборлодог, учир нь идэвхтэй." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: any reactive metal is extracted by electrolysis', 'Зөв: идэвхтэй металл бүрийг электролизээр олборлодог'], ['Incorrect: iron is extracted by reduction with carbon in a blast furnace; electrolysis is used for very reactive metals such as aluminium', 'Буруу: төмрийг blast furnace-д нүүрстөрөгчөөр бууруулж олборлодог; электролиз нь хөнгөн цагаан шиг маш идэвхтэй металлд'], ['Correct: iron is never extracted', 'Зөв: төмрийг огт олборлодоггүй'], ['Incorrect: iron occurs as a free metal', 'Буруу: төмөр чөлөөт металлаар байдаг']],
    'B', 'Thinking reactivity alone decides the method, without asking how reactive the metal is.', 'Аргыг зөвхөн идэвхээр нь шийдэх, металл хэр идэвхтэйг асуухгүй байх.'), 'evaluate'),

  // 10.1 Water
  tag(d101(80, 'Softening hard water', 'Хатуу усыг зөөлрүүлэх', 'Hard water contains calcium ions. Which treatment softens it?', 'Хатуу ус кальцийн ион агуулдаг. Аль арга үүнийг зөөлрүүлэх вэ?',
    [['Boiling alone, which removes all hardness', 'Зөвхөн буцалгах, энэ нь бүх хатуулгийг арилгана'], ['Adding sodium carbonate, which precipitates the calcium ions', 'Натрийн карбонат нэмэх, энэ нь кальцийн ионыг тунадасжуулна'], ['Adding more calcium', 'Илүү кальци нэмэх'], ['Freezing the water', 'Усыг хөрөөх']],
    'B', 'Thinking boiling removes every kind of hardness.', 'Буцалгах нь хатуулгийн бүх төрлийг арилгана гэж бодох.'), 'apply'),
  tag(d101(81, 'Boiling removes hardness', 'Буцалгах хатуулгийг арилгана', 'A student says: "Boiling removes all hardness from water." Evaluate this statement.', 'Сурагч: "Буцалгах нь усны бүх хатуулгийг арилгана." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: boiling removes all hardness', 'Зөв: буцалгах бүх хатуулгийг арилгана'], ['Incorrect: boiling removes only temporary hardness; permanent hardness needs another method', 'Буруу: буцалгах зөвхөн түр зуурын хатуулгийг арилгана; тогтвортой хатуулгийг өөр аргаар арилгана'], ['Correct: boiling makes water harder', 'Зөв: буцалгах усыг хатууруулна'], ['Incorrect: boiling does not change water', 'Буруу: буцалгах усанд огт нөлөөлдөггүй']],
    'B', 'Generalising from temporary hardness to all hardness.', 'Түр зуурын хатуулгаас бүх хатуулгийг ерөнхийлөх.'), 'evaluate'),

  // 10.2 Fertilisers
  tag(d102(80, 'Percentage nitrogen', 'Азотын хувь', 'A fertiliser is ammonium nitrate, NH₄NO₃. (Ar: N = 14, H = 1, O = 16) What is the percentage of nitrogen by mass?', 'Бордоо нь аммонийн нитрат, NH₄NO₃. (Ar: N = 14, H = 1, O = 16) Массаараа азотын хувь хэд вэ?',
    [['17.5%', '17.5%'], ['35%', '35%'], ['15%', '15%'], ['70%', '70%']],
    'B', 'Counting one nitrogen atom instead of two, which gives 17.5%.', 'Азотын хоёр атомын оронд нэгийг тооцох, энэ нь 17.5% өгнө.'), 'apply'),
  tag(d102(81, 'Using more fertiliser', 'Илүү бордоо хэрэглэх', 'A student says: "Fertilisers can be used in any amount, because they only help plants." Evaluate this statement.', 'Сурагч: "Бордоог ямар ч хэмжээгээр хэрэглэж болно, учир нь тэд зөвхөн ургамалд тусалдаг." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: more fertiliser is always better', 'Зөв: илүү бордоо үргэлж сайн'], ['Incorrect: excess fertiliser can wash into water and cause eutrophication, so the amount must be controlled', 'Буруу: илүүдэл бордоо усанд угаагдаж, эутрофикацид хүргэх тул хэмжээг хянах ёстой'], ['Correct: fertilisers are poisons only', 'Зөв: бордоо зөвхөн хор'], ['Incorrect: fertilisers are not used on crops', 'Буруу: бордоог ургацанд ашигладаггүй']],
    'B', 'Judging fertiliser only by its benefit to the crop, without its effect on water.', 'Бордоог зөвхөн ургацад үзүүлэх тусаар нь дүгнэх, усанд үзүүлэх нөлөөг мартах.'), 'evaluate'),

  // 10.3 Air quality and climate
  tag(d103(80, 'Effect of carbon monoxide', 'Нүүрстөрөгчийн дутуу исэлийн нөлөө', 'Carbon monoxide from a car engine is breathed in. What is the most likely effect?', 'Машины хөдөлгүүрээс гарсан нүүрстөрөгчийн дутуу исэлийг амьсгалахад хамгийн магадлалтай нөлөө юу вэ?',
    [['It binds to haemoglobin and reduces the oxygen carried in the blood', 'Гемоглобинтой холбогдож, цусаар дамжих хүчилтөрөгчийг бууруулна'], ['It increases the oxygen in the blood', 'Цусан дахь хүчилтөрөгчийг нэмэгдүүлнэ'], ['It is harmless', 'Хор хөнөөлгүй'], ['It makes the blood more alkaline', 'Цусыг илүү шүлтлэг болгоно']],
    'A', 'Thinking carbon monoxide behaves like carbon dioxide in the body.', 'Нүүрстөрөгчийн дутуу исэл биед нүүрсхүчлийн хий шиг ажилладаг гэж бодох.'), 'apply'),
  tag(d103(81, 'Acid rain damage', 'Хүчиллэг бороо', 'A student says: "Acid rain only affects buildings." Evaluate this statement.', 'Сурагч: "Хүчиллэг бороо зөвхөн барилгад нөлөөлдөг." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: it affects only buildings', 'Зөв: зөвхөн барилгад нөлөөлдөг'], ['Incorrect: acid rain also harms lakes, forests and the animals that live in water', 'Буруу: хүчиллэг бороо нуур, ой мод, усны амьтдад ч хор учруулна'], ['Correct: acid rain is neutral', 'Зөв: хүчиллэг бороо саармаг'], ['Incorrect: acid rain has no effect on the environment', 'Буруу: хүчиллэг бороо байгаль орчинд нөлөөлдөггүй']],
    'B', 'Thinking the damage is only to stone and metal buildings.', 'Гэмтлийг зөвхөн чулуу, металл барилгад гэж бодох.'), 'evaluate'),

  // 11.1 Formulae, functional groups and terminology
  tag(d111(80, 'Identifying a family', 'Бүлгийг таних', 'A molecule has the formula C₂H₄. Which family does it belong to, and why?', 'Молекулын томьёо C₂H₄. Аль бүлэгт хамаарах вэ, яагаад?',
    [['Alkane, because it has only single bonds', 'Алкан, зөвхөн ганц холбоотой учраас'], ['Alkene, because it has a C=C double bond', 'Алкен, C=C давхар холбоотой учраас'], ['Alcohol, because it has an OH group', 'Спирт, OH бүлэгтэй учраас'], ['Carboxylic acid, because it has a COOH group', 'Карбоксилын хүчил, COOH бүлэгтэй учраас']],
    'B', 'Using the alkane formula, which is CₙH₂ₙ₊₂, for a molecule with fewer hydrogens.', 'Алканы CₙH₂ₙ₊₂ томьёог устөрөгч цөөн молекулд ашиглах.'), 'apply'),
  tag(d111(81, 'Organic compounds', 'Органик нэгдэл', 'A student says: "All organic compounds contain only carbon and hydrogen." Evaluate this statement.', 'Сурагч: "Бүх органик нэгдэл зөвхөн нүүрстөрөгч, устөрөгч агуулдаг." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: no other element is found', 'Зөв: өөр элемент олддоггүй'], ['Incorrect: many organic compounds also contain oxygen, such as alcohols and carboxylic acids', 'Буруу: олон органик нэгдэл хүчилтөрөгч агуулдаг, жишээ нь спирт, карбоксилын хүчил'], ['Correct: organic compounds contain metals', 'Зөв: органик нэгдэл металл агуулдаг'], ['Incorrect: organic compounds are never molecular', 'Буруу: органик нэгдэл хэзээ ч молекул биш']],
    'B', 'Thinking hydrocarbons are the only organic compounds.', 'Нүүрсустөрөгчийг л органик нэгдэл гэж бодох.'), 'evaluate'),

  // 11.2 Naming organic compounds
  tag(d112(80, 'Naming a three-carbon alkane', 'Гурван нүүрстөрөгчтэй алкан', 'What is the name of the compound CH₃CH₂CH₃?', 'CH₃CH₂CH₃ нэгдлийн нэр юу вэ?',
    [['Ethane', 'Этан'], ['Propane', 'Пропан'], ['Butane', 'Бутан'], ['Methane', 'Метан']],
    'B', 'Counting the carbons as two, which gives ethane.', 'Нүүрстөрөгчийг хоёр гэж тоолж, этан гэж нэрлэх.'), 'apply'),
  tag(d112(81, 'Naming CH₃CH₂CH₂CH₃', 'CH₃CH₂CH₂CH₃-ийн нэр', 'A student names CH₃CH₂CH₂CH₃ as propane. Evaluate this name.', 'Сурагч CH₃CH₂CH₂CH₃-ийг пропан гэжээ. Энэ нэрийг үнэлнэ үү.',
    [['Correct: it has three carbons', 'Зөв: гурван нүүрстөрөгчтэй'], ['Incorrect: it has four carbons, so it is butane', 'Буруу: дөрвөн нүүрстөрөгчтэй тул бутан'], ['Correct: it is methane', 'Зөв: метан'], ['Incorrect: it is an alkene', 'Буруу: алкен']],
    'B', 'Miscounting the carbon chain.', 'Нүүрстөрөгчийн гинжийг буруу тоолох.'), 'evaluate'),

  // 11.3 Fuels
  tag(d113(80, 'Oxygen for combustion', 'Шаталтанд хүчилтөрөгч', 'CH₄ + 2O₂ → CO₂ + 2H₂O. How many moles of oxygen are needed to burn 3 moles of methane completely?', 'CH₄ + 2O₂ → CO₂ + 2H₂O. 3 моль метанийг бүрэн шатаахад хэдэн моль хүчилтөрөгч хэрэгтэй вэ?',
    [['3 mol', '3 моль'], ['6 mol', '6 моль'], ['2 mol', '2 моль'], ['9 mol', '9 моль']],
    'B', 'Using the moles of methane as the moles of oxygen, instead of multiplying by 2.', 'Метаны молийг хүчилтөрөгчийн моль гэж авах, 2-оор үржүүлэхгүй байх.'), 'apply'),
  tag(d113(81, 'Is burning fossil fuel harmless', 'Чулуужсан түлш хор хөнөөлгүй юу', 'A student says: "Burning fossil fuels produces only carbon dioxide and water, so it is harmless." Evaluate this statement.', 'Сурагч: "Чулуужсан түлш шатахад зөвхөн нүүрсхүчлийн хий, ус гарна, тиймээс хор хөнөөлгүй." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: it is harmless', 'Зөв: хор хөнөөлгүй'], ['Incorrect: incomplete combustion makes carbon monoxide and soot, and sulfur and nitrogen compounds form as well', 'Буруу: бүрэн бус шаталтаас нүүрстөрөгчийн дутуу исэл, ханцуй үүсэж, хүхэр, азотын нэгдэл ч үүсдэг'], ['Correct: only oxygen is formed', 'Зөв: зөвхөн хүчилтөрөгч үүсдэг'], ['Incorrect: fuels cannot burn', 'Буруу: түлш шатахгүй']],
    'B', 'Listing only the complete combustion products.', 'Зөвхөн бүрэн шаталтын бүтээгдэхүүнийг жагсаах.'), 'evaluate'),

  // 11.4 Alkanes
  tag(d114(80, 'Complete combustion of propane', 'Пропаны бүрэн шаталт', 'Which equation represents the complete combustion of propane?', 'Пропаны бүрэн шаталтыг аль тэгшитгэл илэрхийлэх вэ?',
    [['C₃H₈ + 3O₂ → 3CO₂ + 4H₂O', 'C₃H₈ + 3O₂ → 3CO₂ + 4H₂O'], ['C₃H₈ + 5O₂ → 3CO₂ + 4H₂O', 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O'], ['C₃H₈ + 5O₂ → CO₂ + 4H₂O', 'C₃H₈ + 5O₂ → CO₂ + 4H₂O'], ['C₃H₈ + O₂ → 3CO₂ + 4H₂O', 'C₃H₈ + O₂ → 3CO₂ + 4H₂O']],
    'B', 'Forgetting to balance the oxygen atoms on both sides.', 'Хоёр талын хүчилтөрөгчийн атомыг тэнцүүлэхээ мартах.'), 'apply'),
  tag(d114(81, 'Alkanes are reactive', 'Алкан идэвхтэй', 'A student says: "Alkanes are reactive because they burn easily." Evaluate this statement.', 'Сурагч: "Алкан идэвхтэй, учир нь амархан шатдаг." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: burning shows high reactivity', 'Зөв: шатах нь өндөр идэвхийг харуулна'], ['Incorrect: alkanes are generally unreactive; burning is combustion, and under ordinary conditions they do not add to bonds', 'Буруу: алкан ерөнхийдөө идэвхгүй; шатах нь шаталт, энгийн нөхцөлд холбоонд нэмэгддэггүй'], ['Correct: alkanes never burn', 'Зөв: алкан огт шатдаггүй'], ['Incorrect: alkanes are metals', 'Буруу: алкан металл']],
    'B', 'Using combustion as the measure of reactivity for all reactions.', 'Шаталтыг бүх урвалын идэвхийн хэмжүүр гэж үзэх.'), 'evaluate'),

  // 11.5 Alkenes
  tag(d115(80, 'Testing an alkene', 'Алкенийг шалгах', 'Ethene is bubbled through bromine water. What is observed and what does it show?', 'Этенийг бромын ус дамжуулав. Юу ажиглагдах вэ, энэ юуг харуулах вэ?',
    [['The colour stays; no reaction', 'Өнгө хэвээр; урвал болохгүй'], ['The bromine water decolourises, showing the C=C double bond reacts', 'Бромын ус өнгөгүй болж, C=C давхар холбоо урвалд орсныг харуулна'], ['The solution turns blue', 'Уусмал цэнхэр болно'], ['A gas is given off', 'Хий гарна']],
    'B', 'Thinking an alkene reacts like an alkane, which does not decolourise bromine water.', 'Алкен алканы шиг урвалд орно гэж бодох, бромын усыг өнгөгүй болгодоггүй гэж.'), 'apply'),
  tag(d115(81, 'Alkenes and alkanes', 'Алкен ба алкан', 'A student says: "Alkenes are less reactive than alkanes because they have a double bond." Evaluate this statement.', 'Сурагч: "Алкен алканаас идэвх багатай, учир нь давхар холбоотой." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: a double bond makes a molecule less reactive', 'Зөв: давхар холбоо нь молекулыг идэвхгүй болгодог'], ['Incorrect: the C=C double bond makes alkenes more reactive than alkanes', 'Буруу: C=C давхар холбоо алкенийг алканаас илүү идэвхтэй болгодог'], ['Correct: the two are equally reactive', 'Зөв: хоёул адил идэвхтэй'], ['Incorrect: double bonds have no effect', 'Буруу: давхар холбоонд нөлөө байхгүй']],
    'B', 'Assuming a stronger, fuller bond makes a molecule less reactive.', 'Илүү бат, бүтэн холбоо нь молекулыг идэвхгүй болгодог гэж бодох.'), 'evaluate'),

  // 11.6 Alcohols
  tag(d116(80, 'Products of ethanol combustion', 'Этанолын шаталтын бүтээгдэхүүн', 'Ethanol burns completely in air. Which products are formed?', 'Этанол агаарт бүрэн шатна. Ямар бүтээгдэхүүн үүсэх вэ?',
    [['Carbon monoxide and water', 'Нүүрстөрөгчийн дутуу исэл ба ус'], ['Carbon dioxide and water', 'Нүүрсхүчлийн хий ба ус'], ['Carbon and hydrogen', 'Нүүрстөрөгч ба устөрөгч'], ['Carbon dioxide only', 'Зөвхөн нүүрсхүчлийн хий']],
    'B', 'Thinking a complete combustion gives carbon monoxide, which is the product of incomplete combustion.', 'Бүрэн шаталтаас нүүрстөрөгчийн дутуу исэл гарна гэж бодох, энэ нь бүрэн бус шаталтын бүтээгдэхүүн.'), 'apply'),
  tag(d116(81, 'Ethanol as an acid', 'Этанол хүчил үү', 'A student says: "Ethanol is a carboxylic acid because it contains an OH group." Evaluate this statement.', 'Сурагч: "Этанол бол карбоксилын хүчил, учир нь OH бүлэгтэй." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: any OH group makes a carboxylic acid', 'Зөв: OH бүлэг бүр карбоксилын хүчил'], ['Incorrect: ethanol is an alcohol; carboxylic acids have the –COOH group, not just –OH', 'Буруу: этанол бол спирт; карбоксилын хүчилд –COOH бүлэг байдаг, зөвхөн –OH биш'], ['Correct: ethanol is an alkane', 'Зөв: этанол алкан'], ['Incorrect: ethanol is a metal', 'Буруу: этанол металл']],
    'B', 'Treating every OH group as the same as a carboxylic acid group.', 'OH бүлэг бүрийг карбоксилын хүчлийн бүлэгтэй адил гэж үзэх.'), 'evaluate'),

  // 11.7 Carboxylic acids
  tag(d117(80, 'Ethanoic acid and magnesium', 'Этаны хүчил ба магни', 'Ethanoic acid reacts with magnesium metal. Which gas is given off?', 'Этаны хүчил магни металлтай урвалд орно. Ямар хий гарах вэ?',
    [['Oxygen', 'Хүчилтөрөгч'], ['Hydrogen', 'Устөрөгч'], ['Carbon dioxide', 'Нүүрсхүчлийн хий'], ['Nitrogen', 'Азот']],
    'B', 'Thinking the acid releases oxygen, or that the metal gives off carbon dioxide.', 'Хүчил хүчилтөрөгч гаргана, эсвэл металл нүүрсхүчлийн хий гаргана гэж бодох.'), 'apply'),
  tag(d117(81, 'Vinegar is a strong acid', 'Цагаан дарс хүчтэй хүчил', 'A student says: "Vinegar is a strong acid because it contains ethanoic acid." Evaluate this statement.', 'Сурагч: "Цагаан дарс хүчтэй хүчил, учир нь этаны хүчил агуулдаг." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: ethanoic acid is a strong acid', 'Зөв: этаны хүчил хүчтэй хүчил'], ['Incorrect: ethanoic acid is a weak acid, only partly ionised in water', 'Буруу: этаны хүчил сул хүчил, усанд хэсэгчлэн ионжино'], ['Correct: vinegar is alkaline', 'Зөв: цагаан дарс шүлтлэг'], ['Incorrect: ethanoic acid is not an acid', 'Буруу: этаны хүчил хүчил биш']],
    'B', 'Equating the presence of an acid with a strong acid.', 'Хүчлийн агуулгыг хүчтэй хүчилтэй адил гэж үзэх.'), 'evaluate'),

  // 11.8 Polymers
  tag(d118(80, 'Repeat unit of poly(ethene)', 'Поли(этены) давтагдах нэгж', 'Poly(ethene) is made from ethene. Which is the repeat unit?', 'Поли(этен) этенээс үүснэ. Давтагдах нэгж аль нь вэ?',
    [['–CH=CH–', '–CH=CH–'], ['–CH₂–CH₂–', '–CH₂–CH₂–'], ['–CH₃', '–CH₃'], ['–C≡C–', '–C≡C–']],
    'B', 'Keeping the double bond in the repeat unit, although the addition opens it.', 'Нэмэлтийн урвалд давхар холбоо задардаг тул давтагдах нэгжид давхар холбоог үлдээх.'), 'apply'),
  tag(d118(81, 'Addition polymers and biodegradation', 'Нэмэлтийн полимер ба задрал', 'A student says: "Addition polymers break down easily in heat, so they are biodegradable." Evaluate this statement.', 'Сурагч: "Нэмэлтийн полимер халуунд амархан задарна, тиймээс биологийн задралтай." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: they are biodegradable', 'Зөв: биологийн задралтай'], ['Incorrect: most addition polymers are not biodegradable, so they persist in the environment', 'Буруу: ихэнх нэмэлтийн полимер биологийн задралгүй тул байгальд удаан оршино'], ['Correct: they decompose in water at once', 'Зөв: усанд тэр даруй задардаг'], ['Incorrect: polymers are made of metal', 'Буруу: полимер металлаас бүрддэг']],
    'B', 'Judging biodegradability by how easily the polymer softens in heat.', 'Биологийн задралыг полимер халуунд хэр амархан зөөлрөхөөр нь дүгнэх.'), 'evaluate'),

  // 12.1 Experimental design
  tag(d121(80, 'A rate experiment', 'Урвалын хурдны туршилт', 'A student changes the acid concentration and the temperature at the same time in a rate experiment. Evaluate the design.', 'Сурагч урвалын хурдны туршилтад хүчлийн концентраци ба температурыг нэгэн зэрэг өөрчилсөн. Туршилтын загварыг үнэлнэ үү.',
    [['Good design, because more data are collected', 'Сайн загвар, илүү өгөгдөл цуглуулдаг учраас'], ['Poor design: two variables changed together, so the cause of the change in rate cannot be identified', 'Муу загвар: хоёр хувьсагч хамт өөрчлөгдсөн тул хурд өөрчлөгдсөний шалтгааныг тодорхойлох боломжгүй'], ['Good design, because the temperature needs no control', 'Сайн загвар, температур хянах шаардлагагүй'], ['Poor design, because no controls are needed', 'Муу загвар, хяналт шаардлагагүй']],
    'B', 'Thinking that collecting more data makes the design better, even if the variables are mixed up.', 'Хувьсагч холилдсон ч илүү өгөгдөл цуглуулбал загвар сайжирна гэж бодох.'), 'evaluate'),

  // 12.2 Acid–base titrations
  tag(d122(80, 'Concentration from a titration', 'Титрлэлтээс концентраци', '25.0 cm³ of 0.10 mol/dm³ NaOH is neutralised by 20.0 cm³ of HCl. What is the concentration of the HCl?', '25.0 см³ 0.10 моль/дм³ NaOH-ийг 20.0 см³ HCl саармагжуулна. HCl-ийн концентраци хэд вэ?',
    [['0.10 mol/dm³', '0.10 моль/дм³'], ['0.125 mol/dm³', '0.125 моль/дм³'], ['0.080 mol/dm³', '0.080 моль/дм³'], ['0.50 mol/dm³', '0.50 моль/дм³']],
    'B', 'Using the volume of acid as the volume of alkali, or forgetting the 1:1 ratio.', 'Хүчлийн эзэлхүүнийг шүлтийн эзэлхүүн гэж авах, эсвэл 1:1 харьцааг мартах.'), 'apply'),
  tag(d122(81, 'Choosing an indicator', 'Индикатор сонгох', 'A student says: "A titration works with an indicator of any colour." Evaluate this statement.', 'Сурагч: "Титрлэлт ямар ч өнгөтэй индикатороор хийгдэнэ." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: any indicator is suitable', 'Зөв: ямар ч индикатор тохирно'], ['Incorrect: the indicator must change colour close to the equivalence point', 'Буруу: индикатор эквивалент цэгийн ойролцоо өнгөө өөрчлөх ёстой'], ['Correct: no indicator is needed', 'Зөв: индикатор хэрэггүй'], ['Incorrect: indicators only work for gases', 'Буруу: индикатор зөвхөн хийд ажилладаг']],
    'B', 'Thinking any colour change will show the end of the titration.', 'Ямар ч өнгөний өөрчлөлт титрлэлтийн төгсгөлийг харуулна гэж бодох.'), 'evaluate'),

  // 12.4 Separation and purification
  tag(d124(80, 'Separating two liquids', 'Хоёр шингэнийг тусгаарлах', 'A mixture of two liquids boils at 78 °C and at 100 °C. Which method separates them?', 'Хоёр шингэний холимог 78 °C ба 100 °C-д буцална. Аль арга тэднийг тусгаарлах вэ?',
    [['Filtration', 'Шүүлт'], ['Distillation', 'Нэрэлт'], ['Chromatography', 'Хроматограф'], ['Using a magnet', 'Соронз ашиглах']],
    'B', 'Choosing filtration, which separates solids from liquids, not two liquids.', 'Шүүлтийг сонгох, энэ нь хатуу бодисыг шингэнээс тусгаарладаг, хоёр шингэнийг биш.'), 'apply'),
  tag(d124(81, 'Filtering dissolved salt', 'Уусгасан давсыг шүүх', 'A student says: "Filtration can separate dissolved salt from water." Evaluate this statement.', 'Сурагч: "Шүүлтээр уусгасан давсыг устай салгаж болно." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: the salt is caught by the filter paper', 'Зөв: давс шүүлтүүрийн цаасанд үлдэнэ'], ['Incorrect: filtration removes insoluble solids; dissolved salt passes through the filter paper with the water', 'Буруу: шүүлт уусдаггүй хатуу бодисыг салгана; уусгасан давс устай хамт шүүлтүүрээр дамжина'], ['Correct: salt is insoluble', 'Зөв: давс уусдаггүй'], ['Incorrect: filtration needs a magnet', 'Буруу: шүүлт соронз шаардана']],
    'B', 'Thinking a solution is a mixture the filter can separate, like sand in water.', 'Уусмалыг элс усанд байдаг шиг шүүлтүүр салгаж чадна гэж бодох.'), 'evaluate'),

  // 12.5 Qualitative analysis
  tag(d125(80, 'White precipitate that dissolves in excess', 'Илүүдэлд уусах цагаан тунадас', 'A solution gives a white precipitate with sodium hydroxide that dissolves in excess. Which cation is most likely?', 'Уусмал натрийн гидроксидтой цагаан тунадас өгч, илүүдэлд уусна. Аль катион магадгүй вэ?',
    [['Calcium, Ca²⁺', 'Кальци, Ca²⁺'], ['Zinc, Zn²⁺', 'Цайр, Zn²⁺'], ['Iron(II), Fe²⁺', 'Төмөр(II), Fe²⁺'], ['Copper(II), Cu²⁺', 'Зэс(II), Cu²⁺']],
    'B', 'Choosing calcium, which gives a white precipitate that does not dissolve in excess.', 'Кальцийг сонгох, энэ нь илүүдэлд уусдаггүй цагаан тунадас өгдөг.'), 'apply'),
  tag(d125(81, 'A white precipitate proves calcium', 'Цагаан тунадас кальцийг баталдаг', 'A student says: "A white precipitate with sodium hydroxide proves the cation is calcium." Evaluate this statement.', 'Сурагч: "Натрийн гидроксидтой цагаан тунадас нь катионыг кальци гэдгийг баталдаг." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: only calcium gives a white precipitate', 'Зөв: зөвхөн кальци цагаан тунадас өгдөг'], ['Incorrect: several cations, including Ca²⁺, Zn²⁺, Al³⁺ and Pb²⁺, give white precipitates, so the test does not prove calcium', 'Буруу: Ca²⁺, Zn²⁺, Al³⁺, Pb²⁺ зэрэг хэд хэдэн катион цагаан тунадас өгдөг тул шинжилгээ кальцийг баталдаггүй'], ['Correct: sodium hydroxide never forms precipitates', 'Зөв: натрийн гидроксид тунадас огт үүсгэдэггүй'], ['Incorrect: the test shows the anion', 'Буруу: шинжилгээ анионыг харуулдаг']],
    'B', 'Assuming one test identifies one ion, without checking the other ions it could be.', 'Нэг шинжилгээ нэг ионыг тодорхойлно гэж бодох, өөр боломжит ионуудыг шалгахгүй байх.'), 'evaluate'),
];
