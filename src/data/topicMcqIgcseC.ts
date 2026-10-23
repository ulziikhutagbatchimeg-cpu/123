import type { ExamQuestion } from '../types/chemistry';
import { topicWriter } from './topicMcqBuild';

// End-of-topic questions, part C: chapter 9 (metals) and chapter 10 (chemistry of the environment).
// Each topic has four questions.
const CH9 = 'ch-metals';
const CH10 = 'ch-environment';

const w91 = topicWriter('s-9-1', CH9, '0620/9.1');
const w92 = topicWriter('s-9-2', CH9, '0620/9.2');
const w93 = topicWriter('s-9-3', CH9, '0620/9.3');
const w94 = topicWriter('s-9-4', CH9, '0620/9.4');
const w95 = topicWriter('s-9-5', CH9, '0620/9.5');
const w96 = topicWriter('s-9-6', CH9, '0620/9.6');
const w101 = topicWriter('s-10-1', CH10, '0620/10.1');
const w102 = topicWriter('s-10-2', CH10, '0620/10.2');
const w103 = topicWriter('s-10-3', CH10, '0620/10.3');

export const TOPIC_MCQ_C: ExamQuestion[] = [
  // 9.1 Properties of metals
  w91(1, 'Typical metal property', 'Металлын шинж', 'Which property is typical of metals?', 'Аль шинж нь металлд хамгийн тохиромжтой вэ?',
    [['Brittle', 'Эвдрэмтгий'], ['Good conductor of electricity', 'Цахилгааныг сайн дамжуулдаг'], ['Poor conductor of heat', 'Дулааныг муу дамжуулдаг'], ['Soft gas at room temperature', 'Өрөөний температурт зөөлөн хий']], 'B',
    'Metals have delocalised electrons that carry charge through the whole structure, so they are good electrical conductors. Brittleness is a feature of many non-metals and ionic solids.',
    'Металлд бүтэц даяар цэнэг зөөдөг делокалчлагдсан электрон байдаг тул цахилгааныг сайн дамжуулна. Эвдрэмтгий байдал нь металл бус ба ионт бодисын шинж.'),
  w91(2, 'Malleable', 'Цохиж хавтгайрах', 'Malleable means that a metal can be:', 'Цохиж хэлбэр авдаг гэдэг нь металл:',
    [['Hammered or rolled into sheets', 'Цохиж эсвэл гулдмай болгон хавтгайруулж болно'], ['Drawn into a wire', 'Утас болгон татаж болно'], ['Easily broken', 'Амархан эвдэрнэ'], ['Made shiny', 'Гялалзуулж болно']], 'A',
    'Malleability is the ability to be shaped by hammering or rolling. Being drawn into wire is ductility, which is a different property.',
    'Цохиж, гулдмайлаж хэлбэр өөрчлөх чадвар нь цохиж хавтгайрах чанар. Утас болгон татах нь сунах чанар, өөр шинж.', 's-9-1'),
  w91(3, 'Ductile', 'Сунах чанар', 'Ductile means that a metal can be:', 'Сунах чанартай гэдэг нь металл:',
    [['Hammered into sheets', 'Цохиж гулдмай болгоно'], ['Drawn out into wire', 'Утас болгон татаж сунгана'], ['Dissolved in water', 'Усанд уусна'], ['Made into a gas', 'Хий болгож болно']], 'B',
    'A ductile metal can be stretched into a wire without breaking, such as copper used in electrical cables.',
    'Сунах чанартай металл эвдэлгүйгээр утас болж сунаж чадна. Жишээ нь цахилгаан кабелийн зэс.', 's-9-1'),
  w91(4, 'Metals conduct heat', 'Металл дулаан дамжуулах', 'Metals conduct heat well because:', 'Металл дулааныг сайн дамжуулдаг, учир нь:',
    [['Delocalised electrons carry energy quickly through the metal', 'Делокалчлагдсан электрон энергийг металлаар хурдан зөөдөг'], ['Protons move through the solid', 'Протон хатуу бодисоор хөдөлдөг'], ['Ions are free to move', 'Ион чөлөөтэй хөдөлдөг'], ['Bonds break at low temperature', 'Холбоо бага температурт таслагддаг']], 'A',
    'The same delocalised electrons that carry the current also carry thermal energy from hot to cold regions.',
    'Гүйдлийг дамжуулдаг делокалчлагдсан электрон дулаан энергийг халуунаас хүйтэн хэсэг рүү зөөдөг.', 's-9-1'),

  // 9.2 Uses of metals
  w92(1, 'Copper in wires', 'Утсанд зэс', 'Copper is used for electrical wires because it is:', 'Зэсийг цахилгаан утсанд ашигладаг, учир нь:',
    [['A good conductor and ductile', 'Сайн дамжуулагч бөгөөд сунадаг'], ['Brittle', 'Эвдрэмтгий'], ['Radioactive', 'Цацраг идэвхтэй'], ['A non-metal', 'Металл бус']], 'A',
    'Copper conducts electricity well and can be drawn into thin wires, so it combines the two needed properties.',
    'Зэс цахилгааныг сайн дамжуулж, нимгэн утас болж сунадаг тул шаардлагатай хоёр шинжийг хослуулдаг.', 's-9-1'),
  w92(2, 'Aluminium in aircraft', 'Нисэх онгоцонд хөнгөн цагаан', 'Aluminium is used for aircraft because it has:', 'Хөнгөн цагааныг нисэх онгоцонд ашигладаг, учир нь:',
    [['A high density', 'Өндөр нягт'], ['A low density and resists corrosion', 'Бага нягт ба зэврэлтэд тэсвэртэй'], ['A low melting point only', 'Зөвхөн бага хайлах цэг'], ['Brittleness', 'Эвдрэмтгий байдал']], 'B',
    'Aluminium is light for its strength and forms a protective oxide layer, so it resists corrosion in air.',
    'Хөнгөн цагаан бат бөхөө харьцуулахад хөнгөн, гадаргуудаа хамгаалах исэлийн давхарга үүсгэдэг тул агаарт зэврэхгүй.', 's-9-3'),
  w92(3, 'Steel', 'Ган', 'Iron is too soft and brittle for many uses, so it is made into:', 'Төмөр олон хэрэгцээнд зөөлөн, эвдрэмтгий тул:',
    [['Pure iron', 'Цэвэр төмөр'], ['Steel, an alloy of iron and carbon', 'Ган, төмөр ба нүүрстөрөгчийн хайлш'], ['Iron oxide', 'Төмрийн исэл'], ['Iron sulfide', 'Төмрийн сульфид']], 'B',
    'Adding a small amount of carbon to iron makes steel, which is harder and stronger than pure iron.',
    'Төмөрт бага хэмжээний нүүрстөрөгч нэмснээр ган үүснэ; энэ нь цэвэр төмрөөс хатуу, бат бөх.', 's-9-3'),
  w92(4, 'Galvanising', 'Цайржуулалт', 'Steel is coated with zinc (galvanised) in order to:', 'Ганг цайраар бүрдэг (цайржуулдаг) шалтгаан:',
    [['Make it heavier', 'Жинтэй болгох'], ['Prevent rusting', 'Зэвэрхээс сэргийлэх'], ['Make it conduct electricity', 'Цахилгаан дамжуулах'], ['Change its colour', 'Өнгийг нь өөрчлөх']], 'B',
    'Zinc protects the iron from water and oxygen, and even when scratched, the zinc corrodes in preference to the iron.',
    'Цайр төмрийг ус, хүчилтөрөгчөөс хамгаалдаг; сарталт гарсан ч цайр төмрөөс илүү зэврэдэг.', 's-9-5'),

  // 9.3 Alloys and their properties
  w93(1, 'What an alloy is', 'Хайлшийн тодорхойлолт', 'An alloy is:', 'Хайлш гэдэг нь:',
    [['A pure metal', 'Цэвэр металл'], ['A mixture of a metal with other elements', 'Металл ба бусад элементийн холимог'], ['A compound of metals', 'Металлын нэгдэл'], ['A non-metal', 'Металл бус']], 'B',
    'Alloys are mixtures designed for useful properties. Because they are mixtures, the components keep their identities and the proportions can vary.',
    'Хайлш нь хэрэгцээт шинжтэй болгохоор зохиосон холимог. Холимог учраас бүрэлдэхүүн хэсгүүд нь өөрийн шинжээ хадгалдаг.'),
  w93(2, 'Brass', 'Гууль', 'Brass is an alloy of:', 'Гууль нь юуны хайлш вэ?',
    [['Copper and tin', 'Зэс ба тин'], ['Copper and zinc', 'Зэс ба цайр'], ['Iron and carbon', 'Төмөр ба нүүрстөрөгч'], ['Aluminium and magnesium', 'Хөнгөн цагаан ба магни']], 'B',
    'Brass is made from copper and zinc. Bronze is the copper and tin alloy, so the two are easy to confuse.',
    'Гууль нь зэс ба цайраас хийгддэг. Хүрэл нь зэс ба тин; хоёрыг андуурах хандлагатай.'),
  w93(3, 'Alloys are harder', 'Хайлш илүү хатуу', 'Alloys are harder than pure metals because:', 'Хайлш цэвэр металлаас илүү хатуу, учир нь:',
    [['Atoms of different sizes stop the layers from sliding', 'Өөр хэмжээтэй атом давхаргыг гулсахаас сэргийлдэг'], ['They have no metallic bonding', 'Металлын холбоогүй'], ['They are gases', 'Хий'], ['They contain more electrons', 'Илүү электрон агуулдаг']], 'A',
    'In a pure metal the layers of atoms slide easily. Different-sized atoms in an alloy distort the layers, so they cannot slide as easily.',
    'Цэвэр металлд атомын давхарга амархан гулсдаг. Хайлшид өөр хэмжээтэй атом давхаргыг гажуудуулж, гулсах нь хүндэрдэг.'),
  w93(4, 'Stainless steel', 'Зэвэрдэггүй ган', 'Stainless steel contains:', 'Зэвэрдэггүй ган агуулдаг:',
    [['Iron, chromium and nickel', 'Төмөр, хром, никель'], ['Copper and tin', 'Зэс ба тин'], ['Gold', 'Алт'], ['Sodium', 'Натри']], 'A',
    'Chromium and nickel are added to iron to resist rusting, which is why stainless steel is used for cutlery and kitchen sinks.',
    'Төмөрт хром, никель нэмснээр зэврэлтэд тэсвэртэй болдог; тиймээс зэвэрдэггүй ган халбага, хоолны сав зэрэгт ашиглагдана.'),

  // 9.4 Reactivity series
  w94(1, 'Most reactive metal', 'Хамгийн идэвхтэй металл', 'Which of these metals is the most reactive?', 'Эдгээрээс аль металл хамгийн идэвхтэй вэ?',
    [['Copper', 'Зэс'], ['Iron', 'Төмөр'], ['Potassium', 'Кали'], ['Gold', 'Алт']], 'C',
    'Potassium is above iron and copper in the reactivity series, and gold is the least reactive of these, at the bottom.',
    'Кали нь идэвхийн цувралд төмөр, зэсээс дээр; алт нь эдгээрээс хамгийн идэвхгүй.'),
  w94(2, 'Displacement', 'Орлуулалт', 'A more reactive metal displaces a less reactive metal from:', 'Идэвхтэй металл идэвх багатай металлыг юунаас орлуулах вэ?',
    [['Its oxide', 'Исэлээс'], ['A solution of its salt', 'Давсны уусмалаас'], ['A gas', 'Хийгээс'], ['Water only', 'Зөвхөн уснаас']], 'B',
    'A more reactive metal takes the place of a less reactive metal in its solution: for example, iron displaces copper from copper(II) sulfate solution.',
    'Идэвхтэй металл уусмалд идэвх багатай металлыг орлуулдаг: жишээ нь төмөр зэсийн(II) сульфатын уусмалаас зэсийг орлуулна.'),
  w94(3, 'Iron and copper sulfate', 'Төмөр ба зэсийн сульфат', 'Iron is added to copper(II) sulfate solution. What happens?', 'Төмрийг зэсийн(II) сульфатын уусмалд хийв. Юу болох вэ?',
    [['No reaction', 'Урвал явагдахгүй'], ['Iron sulfate and copper are formed', 'Төмрийн сульфат ба зэс үүснэ'], ['Copper oxide is formed', 'Зэсийн исэл үүснэ'], ['Iron oxide is formed', 'Төмрийн исэл үүснэ']], 'B',
    'Iron is above copper in the reactivity series, so it displaces copper: Fe + CuSO₄ → FeSO₄ + Cu. The solution fades from blue as copper is removed.',
    'Төмөр идэвхийн цувралд зэсээс дээгүүр тул зэсийг орлуулна: Fe + CuSO₄ → FeSO₄ + Cu. Зэс салахад уусмал цэнхэрээ алдана.'),
  w94(4, 'Reduction with carbon', 'Нүүрсээр бууруулах', 'Which statement about extracting metals with carbon is true?', 'Нүүрсээр металл гаргах тухай аль мэдэгдэл зөв вэ?',
    [['Metals above carbon in the reactivity series are extracted by heating with carbon', 'Идэвхийн цувралд нүүрснээс дээш металлыг нүүрсээр халаан гаргана'], ['Metals below carbon can be extracted by heating their oxides with carbon', 'Нүүрснээс доош металлын исэлийг нүүрсээр халаан гаргаж болно'], ['All metals are extracted this way', 'Бүх металлыг ингэж гаргана'], ['Carbon is a metal', 'Нүүрстөрөгч металл']], 'B',
    'Carbon can reduce oxides of metals that are less reactive than carbon, such as iron. Very reactive metals like aluminium need electrolysis.',
    'Нүүрстөрөгч нь нүүрснээс идэвх багатай металлын исэлийг бууруулж чадна, жишээ нь төмөр. Хөнгөн цагаан гэх мэт маш идэвхтэй металлыг электролизоор гаргана.', 's-9-6'),

  // 9.5 Corrosion of metals
  w95(1, 'Conditions for rusting', 'Зэврэлтийн нөхцөл', 'Rusting of iron needs:', 'Төмөр зэвэрхэд юу хэрэгтэй вэ?',
    [['Oxygen only', 'Зөвхөн хүчилтөрөгч'], ['Water only', 'Зөвхөн ус'], ['Oxygen and water', 'Хүчилтөрөгч ба ус'], ['Carbon dioxide', 'Нүүрсхүчлийн хий']], 'C',
    'Iron needs both oxygen and water to rust. Test it with an experiment that keeps one of them out and see that no rust forms.',
    'Төмөр зэвэрхийн тулд хүчилтөрөгч, ус хоёулаа хэрэгтэй. Аль нэгийг нь хөөж туршиж үзвэл зэв үүсэхгүй.', 's-9-5'),
  w95(2, 'Galvanising protection', 'Цайржуулалтын хамгаалалт', 'Galvanising protects iron by coating it with:', 'Цайржуулалт төмрийг юугаар бүрж хамгаалдаг вэ?',
    [['Tin', 'Тин'], ['Zinc', 'Цайр'], ['Lead', 'Хар тугалга'], ['Gold', 'Алт']], 'B',
    'Zinc is the coating used in galvanising. It is more reactive than iron, so it corrodes first and protects the iron.',
    'Цайржуулалтад цайрыг бүрээс болгодог. Цайр төмрөөс идэвхтэй тул эхлээд зэврэж төмрийг хамгаална.', 's-9-5'),
  w95(3, 'Painting iron', 'Төмөр будах', 'Painting iron prevents rusting because the paint:', 'Төмрийг будах нь зэврэхээс сэргийлдэг, учир нь будаг:',
    [['Adds oxygen to the surface', 'Гадаргуу дээр хүчилтөрөгч нэмдэг'], ['Blocks contact with oxygen and water', 'Хүчилтөрөгч ба устай холбоо барихыг хаадаг'], ['Removes carbon from the iron', 'Төмрөөс нүүрстөрөгчийг зайлуулдаг'], ['Heats the iron', 'Төмрийг халаадаг']], 'B',
    'A barrier coating keeps oxygen and water away from the iron surface, so the rusting reaction cannot start.',
    'Хаалтын бүрээс нь хүчилтөрөгч, усыг төмрийн гадаргуунаас тусгаарлаж, зэврэлтийн урвалыг эхлүүлэхгүй.', 's-9-5'),
  w95(4, 'Aluminium resists corrosion', 'Хөнгөн цагаан зэврэхгүй', 'Aluminium does not corrode quickly in air because it:', 'Хөнгөн цагаан агаарт хурдан зэврэхгүй, учир нь:',
    [['Is unreactive', 'Идэвхгүй'], ['Forms a thin protective layer of aluminium oxide on its surface', 'Гадаргуу дээр хөнгөн цагааны исэлийн нимгэн хамгаалах давхарга үүсгэдэг'], ['Is a non-metal', 'Металл бус'], ['Has no electrons', 'Электрон байдаггүй']], 'B',
    'Aluminium is quite reactive, but its oxide layer sticks to the surface and stops further reaction. Removing the layer, for example by scratching, lets corrosion continue.',
    'Хөнгөн цагаан идэвхтэй боловч исэлийн давхарга гадаргуу дээр наалдаж, цаашдын урвалыг зогсооно. Давхаргыг нь хусвал зэврэлт үргэлжилнэ.', 's-9-5'),

  // 9.6 Extraction of metals
  w96(1, 'Iron ore', 'Төмрийн хүдэр', 'Iron is extracted in the blast furnace from:', 'Төмрийг домны зуухад юунаас гаргадаг вэ?',
    [['Bauxite', 'Боксит'], ['Haematite', 'Гематит'], ['Cryolite', 'Криолит'], ['Calcium carbonate', 'Кальцийн карбонат']], 'B',
    'Haematite is the iron ore. Bauxite is the ore of aluminium, and cryolite is used to dissolve aluminium oxide for electrolysis.',
    'Гематит нь төмрийн хүдэр. Боксит нь хөнгөн цагааны хүдэр; криолит нь электролизийн үед хөнгөн цагааны исэлийг уусгахад хэрэглэгдэнэ.'),
  w96(2, 'Reducing agent', 'Бууруулагч', 'In the blast furnace, the reducing agent that removes oxygen from iron oxide is:', 'Домны зуухад төмрийн исэлээс хүчилтөрөгчийг зайлуулах бууруулагч нь:',
    [['Carbon monoxide', 'Нүүрстөрөгчийн дутуу исэл'], ['Oxygen', 'Хүчилтөрөгч'], ['Nitrogen', 'Азот'], ['Argon', 'Аргон']], 'A',
    'Coke burns to carbon dioxide, which reacts with more coke to give carbon monoxide. The carbon monoxide reduces the iron oxide.',
    'Кокс шатаж нүүрсхүчлийн хий үүсгэж, энэ нь коксын хамт нүүрстөрөгчийн дутуу исэл болно. Дутуу исэл нь төмрийн исэлийг бууруулна.'),
  w96(3, 'Role of limestone', 'Шохойн чулууны үүрэг', 'In the blast furnace, limestone is added to:', 'Домны зуухад шохойн чулууг юунд нэмдэг вэ?',
    [['Reduce the iron oxide', 'Төмрийн исэлийг бууруулахад'], ['Remove silicon dioxide impurities as slag', 'Кремнийн исэл гэх хольцыг шлак болгон зайлуулахад'], ['Add carbon', 'Нүүрстөрөгч нэмэхэд'], ['Cool the furnace', 'Зууханд хөргөхөд']], 'B',
    'Limestone decomposes to calcium oxide, which combines with silica impurities to form slag that floats off the molten iron.',
    'Шохойн чулуу кальцийн исэл болж задрана; энэ нь кремнийн исэл хольцтой нэгдэж хайлсан төмрийн дээр хөвөх шлак үүсгэнэ.'),
  w96(4, 'Extraction of aluminium', 'Хөнгөн цагаан олборлолт', 'Aluminium is extracted by:', 'Хөнгөн цагааныг юуны аргаар гаргадаг вэ?',
    [['Reduction with carbon in a blast furnace', 'Домны зуухад нүүрсээр бууруулах'], ['Electrolysis of molten aluminium oxide dissolved in cryolite', 'Криолитад уусгасан хайлсан хөнгөн цагааны исэлийг электролиз хийх'], ['Heating only', 'Зөвхөн халаах'], ['Displacement by iron', 'Төмрөөр орлуулах']], 'B',
    'Aluminium is too reactive to be reduced by carbon, so it is extracted by electrolysis of aluminium oxide dissolved in molten cryolite.',
    'Хөнгөн цагаан нүүрсээр бууруулахад хэт идэвхтэй тул криолитад уусгасан хөнгөн цагааны исэлийг электролиз хийж гаргана.', 'top-4-1'),

  // 10.1 Water
  w101(1, 'Hard water', 'Хатуу ус', 'Hard water is caused by dissolved:', 'Хатуу усыг юуны уусмал үүсгэдэг вэ?',
    [['Oxygen', 'Хүчилтөрөгч'], ['Calcium or magnesium ions', 'Кальци эсвэл магнийн ион'], ['Chlorine', 'Хлор'], ['Nitrogen', 'Азот']], 'B',
    'Calcium and magnesium ions in the water make it hard, which causes scale in kettles and reduces soap lather.',
    'Усанд байгаа кальци, магнийн ион нь хатуу ус үүсгэж, масштаб (хуримтлал) үүсгэж, саван хөөсийг бууруулдаг.'),
  w101(2, 'Distillation of seawater', 'Далайн усыг нэрэх', 'Simple distillation of seawater gives:', 'Далайн усыг энгийн нэрэхэд юу гарах вэ?',
    [['Salt as the distillate', 'Нэрмэл нь давс'], ['Pure water as the distillate', 'Нэрмэл нь цэвэр ус'], ['Oxygen', 'Хүчилтөрөгч'], ['Chlorine', 'Хлор']], 'B',
    'Water boils and its vapour condenses as pure water (the distillate). The dissolved salt stays behind in the flask.',
    'Ус буцалж, уурыг нь цэвэр ус (нэрмэл) болгон хөргөдөг. Уусгасан давс колбонд үлдэнэ.'),
  w101(3, 'Removing solid particles', 'Тоосонцор салгах', 'Which step in water treatment removes suspended solid particles?', 'Усны цэвэршүүлэлтийн аль алхам түдгэлзсэн жижиг бөөмсийг салгах вэ?',
    [['Filtration', 'Шүүлт'], ['Electrolysis', 'Электролиз'], ['Distillation of the whole supply', 'Бүх усыг нэрэх'], ['Adding salt', 'Давс нэмэх']], 'A',
    'Filtration through sand and gravel removes suspended solids. Distillation is too expensive for a whole town supply.',
    'Элс, хайргаар шүүх нь түдгэлзсэн бөөмсийг салгана. Нэрэлт нь бүх хотын хэрэгцээнд үнэтэй.'),
  w101(4, 'Chlorine in drinking water', 'Ундны усанд хлор', 'Chlorine is added to drinking water to:', 'Ундны усанд хлор нэмдэг нь:',
    [['Remove hardness', 'Хатуулгийг арилгах'], ['Kill harmful microorganisms', 'Хортой бичил биетийг устгах'], ['Make the water salty', 'Усыг давстай болгох'], ['Remove colour', 'Өнгийг арилгах']], 'B',
    'Chlorine kills bacteria and other microorganisms that could cause disease, which makes the water safe to drink.',
    'Хлор нь өвчин үүсгэж болох бактери, бусад бичил биетийг устгаж, усыг ундаанд аюулгүй болгодог.'),

  // 10.2 Fertilisers
  w102(1, 'Nitrogen in plants', 'Ургамал дахь азот', 'Plants need nitrogen mainly to make:', 'Ургамалд азот голчлон юу үүсгэхэд хэрэгтэй вэ?',
    [['Proteins', 'Уураг'], ['Fats only', 'Зөвхөн өөх'], ['Sugar only', 'Зөвхөн элсэн чихэр'], ['Salt', 'Давс']], 'A',
    'Nitrogen is part of amino acids, which join to make proteins. It is also needed for chlorophyll, which is why nitrates are used as fertilisers.',
    'Азот нь амины хүчлийн нэг хэсэг; амины хүчил уураг үүсгэдэг. Хлорофиллд ч хэрэгтэй тул нитрат бордоо болгон ашигладаг.'),
  w102(2, 'NPK fertiliser', 'NPK бордоо', 'NPK fertiliser contains:', 'NPK бордоо агуулдаг:',
    [['Nitrogen, phosphorus and potassium', 'Азот, фосфор, калий'], ['Nickel, platinum and potassium', 'Никель, платин, калий'], ['Nitrogen, oxygen and potassium', 'Азот, хүчилтөрөгч, калий'], ['Nitrogen, phosphorus and sodium', 'Азот, фосфор, натри']], 'A',
    'The letters N, P and K stand for nitrogen, phosphorus and potassium, the three elements plants need most.',
    'N, P, K нь азот, фосфор, калий; ургамалд хамгийн их хэрэгтэй гурван элемент.'),
  w102(3, 'Haber process product', 'Хабер процессын бүтээгдэхүүн', 'The Haber process produces:', 'Хабер процесс юуг үйлдвэрлэдэг вэ?',
    [['Nitric acid', 'Азотын хүчил'], ['Ammonia', 'Аммиак'], ['Sulfuric acid', 'Хүхрийн хүчил'], ['Sodium hydroxide', 'Натрийн гидроксид']], 'B',
    'The Haber process combines nitrogen and hydrogen to make ammonia, which is then used to make fertilisers.',
    'Хабер процесс азот ба устөрөгчийг нэгтгэж аммиак үйлдвэрлэдэг; аммиакийг бордоо бэлтгэхэд ашигладаг.'),
  w102(4, 'Eutrophication', 'Эвтрофикаци', 'Excess fertiliser washed into a lake can cause:', 'Нуур руу угаагдсан илүүдэл бордоо юу үүсгэж болох вэ?',
    [['An algal bloom and oxygen shortage', 'Замаг ихээр ургаж, хүчилтөрөгч дутах'], ['More fish', 'Илүү загас'], ['Less algae', 'Бага замаг'], ['More sunlight in the water', 'Усанд илүү нар']], 'A',
    'Algae grow rapidly on the extra nutrients, and when they die, bacteria use up the oxygen, so fish and other life die.',
    'Замаг илүү тэжээллэгээр хурдан ургаж, үхэх үед бактери хүчилтөрөгчийг шингээх тул загас болон бусад амьтан үхнэ.'),

  // 10.3 Air quality and climate
  w103(1, 'Carbon monoxide', 'Нүүрстөрөгчийн дутуу исэл', 'Carbon monoxide is produced by:', 'Нүүрстөрөгчийн дутуу исэл юунаас үүсдэг вэ?',
    [['Complete combustion', 'Бүрэн шаталт'], ['Incomplete combustion of carbon-containing fuels', 'Нүүрстөрөгчтэй түлшний бүрэн бус шаталт'], ['Photosynthesis', 'Фотосинтез'], ['Respiration in animals', 'Амьтны амьсгал']], 'B',
    'Carbon monoxide forms when there is not enough oxygen for complete combustion. It is toxic because it binds to haemoglobin in the blood.',
    'Хүчилтөрөгч хангалтгүй үед бүрэн бус шаталтаас нүүрстөрөгчийн дутуу исэл үүснэ. Энэ нь цусны гемоглобинтой холбогдож хортой.'),
  w103(2, 'Acid rain source', 'Хүчиллэг бороо', 'Sulfur dioxide, which causes acid rain, is formed when:', 'Хүчиллэг бороо үүсгэдэг хүхрийн давхар исэл юу үед үүсдэг вэ?',
    [['Sulfur-containing fuels are burned', 'Хүхэртэй түлш шатах'], ['Plants photosynthesise', 'Ургамал фотосинтез хийх'], ['Water is electrolysed', 'Ус электролиз хийгдэх'], ['Iron rusts', 'Төмөр зэвэрэх']], 'A',
    'Sulfur in fossil fuels burns to form sulfur dioxide, which dissolves in rain to make it acidic.',
    'Чулуужсан түлшний хүхэр шатаж хүхрийн давхар исэл үүсгэдэг; энэ нь бороонд уусаж хүчиллэг болгодог.'),
  w103(3, 'Main greenhouse gas', 'Гол хүлэмжийн хий', 'The main greenhouse gas that increases as fossil fuels are burned is:', 'Чулуужсан түлш шатахад нэмэгддэг гол хүлэмжийн хий:',
    [['Nitrogen', 'Азот'], ['Carbon dioxide', 'Нүүрсхүчлийн хий'], ['Argon', 'Аргон'], ['Neon', 'Неон']], 'B',
    'Burning fossil fuels releases carbon dioxide, which traps heat in the atmosphere and contributes to global warming.',
    'Чулуужсан түлш шатахад нүүрсхүчлийн хий ялгарч, агаар мандалд дулаан барьж, дэлхийн дулаарлыг нэмэгдүүлнэ.'),
  w103(4, 'Catalytic converter', 'Катализаторт хөрвүүлэгч', 'A catalytic converter in a car changes carbon monoxide and nitrogen monoxide into:', 'Машины катализаторт хөрвүүлэгч нүүрстөрөгчийн дутуу исэл ба азотын монооксидыг юунд хувиргадаг вэ?',
    [['Carbon dioxide and nitrogen', 'Нүүрсхүчлийн хий ба азот'], ['Carbon monoxide and oxygen', 'Нүүрстөрөгчийн дутуу исэл ба хүчилтөрөгч'], ['Nitrogen dioxide and carbon', 'Азотын давхар исэл ба нүүрстөрөгч'], ['Hydrogen and oxygen', 'Устөрөгч ба хүчилтөрөгч']], 'A',
    'The catalyst speeds up the reaction so that the harmful gases become carbon dioxide and nitrogen, which are less harmful.',
    'Катализатор урвалыг хурдасгаж, хортой хийг бага хортой нүүрсхүчлийн хий ба азот болгодог.'),
];
