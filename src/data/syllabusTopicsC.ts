import { buildTopic, TopicSpec } from './syllabusBuilders';

// 0620 subject content: sections 9–10 (metals, chemistry of the environment)
const SPECS: TopicSpec[] = [
  {
    id: 's-9-1', chapter: 'ch-metals', ref: '9.1', en: 'Properties of metals', mn: 'Металлын шинж чанар',
    sumEn: 'Metals conduct heat and electricity, are malleable and ductile, and have high melting and boiling points. They react with dilute acids, cold water or steam, and oxygen.',
    sumMn: 'Металл дулаан, цахилгаан дамжуулж, нарийн хэлбэрт орж, сунадаг; хайлах ба буцлах цэг өндөр. Шингэрүүлсэн хүчил, хүйтэн ус эсвэл уур, хүчилтөрөгчтэй урвалд орно.',
    obj: [
      ['9.1.1', 'Compare the general physical properties of metals and non-metals: thermal and electrical conductivity, malleability, ductility, melting and boiling points.', 'Металл ба металл бусын ерөнхий физик шинж чанарыг харьцуулах: дулаан ба цахилгаан дамжуулах чадвар, нарийн хэлбэрт орох, сунах, хайлах ба буцлах цэг.'],
      ['9.1.2', 'Describe the reactions of metals with dilute acids, cold water and steam, and oxygen.', 'Металлын шингэрүүлсэн хүчил, хүйтэн ус, уур, хүчилтөрөгчтэй урвалыг тодорхойлох.']
    ],
    vocab: [
      ['thermal conductivity', 'дулаан дамжуулах чадвар', 'The ability to transfer heat energy through a material.', 'Материалаар дулааны энергийг дамжуулах чадвар.'],
      ['ductile', 'сунадаг', 'Able to be drawn into a wire.', 'Утас болж сунах чадвартай.']
    ],
    sec: [
      ['Physical properties', 'Физик шинж чанар', 'Metals conduct heat and electricity because of their delocalised electrons. They are malleable and ductile because the layers of ions can slide. Most have high melting and boiling points because of the strong metallic bonding.', 'Металл делокалжсан электроноор дулаан, цахилгаан дамжуулна. Ионы давхарга гулсах тул нарийн хэлбэрт орж, сунана. Металлын холбоо хүчтэй тул ихэнх нь хайлах, буцлах цэг өндөр.'],
      ['Chemical properties', 'Химийн шинж чанар', 'Metals react with dilute acids to form a salt and hydrogen, for example Mg + 2HCl → MgCl₂ + H₂. Potassium, sodium and calcium react with cold water; magnesium reacts with steam. Most metals react with oxygen to form metal oxides.', 'Металл шингэрүүлсэн хүчилтэй урвалд орж давс ба устөрөгч өгнө, жишээ нь Mg + 2HCl → MgCl₂ + H₂. Калий, натри, кальци хүйтэн устай; магни уураар урвалд орно. Ихэнх металл хүчилтөрөгчтэй урвалд орж металлын исэл үүсгэнэ.']
    ]
  },
  {
    id: 's-9-2', chapter: 'ch-metals', ref: '9.2', en: 'Uses of metals', mn: 'Металлын хэрэглээ',
    sumEn: 'Metals are used according to their physical properties. Aluminium is light and resists corrosion (aircraft, food containers, cables). Copper is ductile and conducts well (electrical wiring).',
    sumMn: 'Металлыг физик шинж чанараар нь сонгон хэрэглэнэ. Алюминий хөнгөн, зэврэлтэд тэсвэртэй (онгоц, хүнсний сав, кабель). Зэс сунадаг, сайн дамжуулдаг (цахилгаан утас).',
    obj: [['9.2.1', 'Describe the uses of metals in terms of their physical properties: aluminium for aircraft, cables and food containers; copper for electrical wiring.', 'Металлын хэрэглээг физик шинж чанараар тодорхойлох: алюминий онгоц, кабель, хүнсний сав; зэс цахилгаан утас.']],
    vocab: [
      ['density', 'нягт', 'Mass per unit volume; aluminium has a low density.', 'Нэгж эзлэхүүн дэх масс; алюминийн нягт бага.'],
      ['corrosion resistance', 'зэврэлтэд тэсвэртэй байдал', 'The ability to resist being attacked by air and water.', 'Агаар, усаар эвдрэхгүй чадвар.']
    ],
    sec: [
      ['Matching properties to uses', 'Шинж чанарыг хэрэглээтэй холбох', 'Aircraft are made of aluminium because it has a low density, so the plane is light. Overhead cables use aluminium because it is light and conducts electricity well. Food containers use aluminium because it resists corrosion. Copper is used in wiring because it conducts well and can be drawn into wires.', 'Онгоцыг алюминийн нягт бага тул хөнгөн байдаг. Агаарын кабель алюминий хөнгөн, цахилгаан сайн дамжуулдаг тул. Хүнсний сав зэврэлтэд тэсвэртэй тул алюминий. Зэс сайн дамжуулж, утас болж сунадаг тул утсанд хэрэглэгдэнэ.']
    ]
  },
  {
    id: 's-9-3', chapter: 'ch-metals', ref: '9.3', en: 'Alloys and their properties', mn: 'Хайлш ба тэдгээрийн шинж чанар',
    sumEn: 'An alloy is a mixture of a metal with other elements. Brass is copper and zinc; stainless steel is iron with chromium, nickel and carbon. Alloys are usually harder and stronger than the pure metals because their different-sized atoms stop the layers sliding.',
    sumMn: 'Хайлш гэдэг нь металлыг өөр элементтэй холисон бодис. Гууль нь зэс ба цайр; зэвэрдэггүй ган нь төмөр, хром, никель, нүүрстөрөгч. Хайлш нь цэвэр металлаас ихэвчлэн хатуу, бат, учир нь өөр хэмжээтэй атомууд давхаргыг гулсахаас сэргийлнэ.',
    obj: [
      ['9.3.1', 'Describe an alloy as a mixture of a metal with other elements, including brass and stainless steel.', 'Хайлшийг металлыг өөр элементтэй холисон гэж тодорхойлж, гууль ба зэвэрдэггүй гантай холбох.'],
      ['9.3.2', 'State that alloys are harder and stronger than pure metals, and describe the uses of alloys in terms of their properties.', 'Хайлш цэвэр металлаас хатуу, бат гэж хэлж, хайлшийн хэрэглээг шинж чанараар тодорхойлох.'],
      ['9.3.3', 'Explain in terms of structure how alloys can be harder and stronger than pure metals.', 'Хайлш яагаад цэвэр металлаас хатуу, бат байдгийг бүтцээр тайлбарлах.'],
      ['9.3.4', 'Identify representations of alloys from diagrams of their structure.', 'Бүтцийн зургаас хайлшийг таних.']
    ],
    vocab: [
      ['alloy', 'хайлш', 'A mixture of a metal with other elements.', 'Металлыг өөр элементтэй холисон бодис.'],
      ['brass', 'гууль', 'An alloy of copper and zinc.', 'Зэс ба цайрын хайлш.']
    ],
    sec: [
      ['Structure of alloys', 'Хайлшийн бүтэц', 'In a pure metal the atoms are all the same size, so the layers of atoms slide over each other easily. In an alloy the different-sized atoms distort the layers, so they cannot slide easily. This makes the alloy harder and stronger.', 'Цэвэр металлд атомууд ижил хэмжээтэй тул давхарга амархан гулсана. Хайлшид өөр хэмжээтэй атомууд давхаргыг гажуудуулж, гулсахад хэцүү болгоно. Тиймээс хайлш хатуу, бат болно.'],
      ['Stainless steel', 'Зэвэрдэггүй ган', 'Stainless steel is an alloy of iron with chromium, nickel and carbon. It is hard and resists rusting, which makes it suitable for cutlery.', 'Зэвэрдэггүй ган нь төмөр, хром, никель, нүүрстөрөгчийн хайлш. Хатуу, зэврэлтэд тэсвэртэй тул халбага, хутганд тохиромжтой.']
    ]
  },
  {
    id: 's-9-4', chapter: 'ch-metals', ref: '9.4', en: 'Reactivity series', mn: 'Идэвхийн цуврал',
    sumEn: 'The reactivity series is: potassium, sodium, calcium, magnesium, aluminium, carbon, zinc, iron, hydrogen, copper, silver, gold. Reactivity reflects how easily a metal forms positive ions. Displacement reactions show the order.',
    sumMn: 'Идэвхийн цуврал: калий, натри, кальци, магни, алюминий, нүүрстөрөгч, цайр, төмөр, устөрөгч, зэс, мөнгө, алт. Идэвх нь металл эерэг ион үүсгэх хурдтай холбоотой. Нүүлгэх урвалаар дараалал харагдана.',
    obj: [
      ['9.4.1', 'State the order of the reactivity series.', 'Идэвхийн цувралын дарааллыг хэлэх.'],
      ['9.4.2', 'Describe and explain the reactions of metals with cold water, steam and dilute hydrochloric acid in terms of their position in the series.', 'Металлын хүйтэн ус, уур, шингэрүүлсэн давсны хүчилтэй урвалыг цувралд байрлалаар нь тайлбарлах.'],
      ['9.4.3', 'Deduce an order of reactivity from experimental results.', 'Туршилтын үр дүнгээс идэвхийн дарааллыг гаргах.'],
      ['9.4.4', 'Explain the apparent unreactivity of aluminium in terms of its oxide layer.', 'Алюминийн идэвхгүй мэт харагдахыг исэлийн давхаргаар тайлбарлах.']
    ],
    vocab: [
      ['reactivity series', 'идэвхийн цуврал', 'A list of metals in order of their reactivity.', 'Металлыг идэвхээр нь эрэмбэлсэн жагсаалт.'],
      ['displacement', 'орлуулалт', 'A more reactive metal takes the place of a less reactive one in a compound.', 'Идэвх өндөр металл нэгдэл дэх идэвх багатай металлыг орлоно.'],
      ['oxide layer', 'исэлийн давхарга', 'A thin protective layer of oxide on the surface of a metal.', 'Металлын гадаргуу дээрх нимгэн хамгаалалтын исэлийн давхарга.']
    ],
    sec: [
      ['Reaction with water and acid', 'Ус ба хүчилтэй урвал', 'Potassium, sodium and calcium react with cold water. Magnesium reacts with steam. Magnesium, zinc and iron react with dilute hydrochloric acid, copper, silver and gold do not. The further up the series, the more vigorous the reaction.', 'Калий, натри, кальци хүйтэн устай урвалд орно. Магни уураар урвалд орно. Магни, цайр, төмөр шингэрүүлсэн давсны хүчилтэй урвалд орно, зэс, мөнгө, алт үгүй. Цувралд дээш байх тусам урвал эрчтэй.'],
      ['Why aluminium looks unreactive', 'Алюминий яагаад идэвхгүй харагддаг вэ', 'Aluminium is high in the series, so it is very reactive. But it quickly forms a thin, tough layer of aluminium oxide on its surface. This layer protects the metal below, so aluminium appears less reactive than it is.', 'Алюминий цувралд дээд талд байдаг тул идэвх өндөр. Гэвч гадаргуу дээр нимгэн, бат алюминийн исэлийн давхарга хурдан үүсдэг. Энэ давхарга доорх металлыг хамгаална, тиймээс алюминий үнэн дээрээ байхаас идэвхгүй мэт харагдана.']
    ]
  },
  {
    id: 's-9-5', chapter: 'ch-metals', ref: '9.5', en: 'Corrosion of metals', mn: 'Металлын зэврэлт',
    sumEn: 'Iron rusts only in the presence of both oxygen and water. Barrier methods (paint, grease, plastic) keep out oxygen and water. Galvanising coats iron with zinc, which protects it sacrificially because zinc is more reactive and loses electrons first.',
    sumMn: 'Төмөр зөвхөн хүчилтөрөгч ба усны хамт зэврэнэ. Хашлага арга (будаг, тос, хуванцар) хүчилтөрөгч, устай холбоо тасалдаг. Галванжилт нь төмрийг цайраар бүрнэ; цайр идэвх өндөр тул эхлээд электрон алдаж, төмрийг хамгаална.',
    obj: [
      ['9.5.1', 'State the conditions required for iron and steel to rust to form hydrated iron(III) oxide.', 'Төмөр, ган зэврэн усан төмрийн(III) исэл үүсэхэд шаардлагатай нөхцөлийг хэлэх.'],
      ['9.5.2', 'Describe barrier methods such as painting, greasing and plastic coating, and how they stop rusting.', 'Будаг, тослох, хуванцар бүрэх хашлага аргуудыг тодорхойлж, яаж зэврэхээс сэргийлэхийг тайлбарлах.'],
      ['9.5.3', 'Describe galvanising as sacrificial protection and explain it in terms of the reactivity series and electron loss.', 'Галванжилтыг золиослолт хамгаалалт гэж тодорхойлж, идэвхийн цуврал ба электрон алдалтаар тайлбарлах.']
    ],
    vocab: [
      ['rust', 'зэв', 'Hydrated iron(III) oxide, formed when iron reacts with oxygen and water.', 'Төмөр хүчилтөрөгч, устай урвалд орж үүсэх усан төмрийн(III) исэл.'],
      ['galvanising', 'цайржуулалт', 'Coating iron or steel with zinc.', 'Төмөр, ганыг цайраар бүрэх.'],
      ['sacrificial protection', 'золиослолт хамгаалалт', 'A more reactive metal corrodes instead of the metal it protects.', 'Идэвх өндөр металл хамгаалж буй металлын оронд зэврэх.']
    ],
    sec: [
      ['Barrier methods', 'Хашлага арга', 'Painting, greasing and plastic coating keep oxygen and water away from the iron surface. Without both oxygen and water, the iron does not rust.', 'Будаг, тос, хуванцар бүрэлт нь төмрийн гадаргуунаас хүчилтөрөгч, усыг холдуулна. Хүчилтөрөгч, усгүй бол төмөр зэврэхгүй.'],
      ['Galvanising', 'Галванжилт', 'Zinc is more reactive than iron, so zinc loses electrons (Zn → Zn²⁺ + 2e⁻) and corrodes first. The zinc protects the iron even if the coating is scratched, because the iron is still surrounded by the zinc that corrodes instead.', 'Цайр төмрөөс идэвхтэй тул цайр электрон алдана (Zn → Zn²⁺ + 2e⁻) ба эхлээд зэврэнэ. Бүрхүүл сэтэрсэн ч цайр төмрийг хамгаална, учир нь төмөр эргэн тойрондоо зэврэх цайртай хэвээр байна.']
    ]
  },
  {
    id: 's-9-6', chapter: 'ch-metals', ref: '9.6', en: 'Extraction of metals', mn: 'Металлыг олборлох',
    sumEn: 'Metals low in the reactivity series are found as the metal itself; reactive metals need electrolysis. Iron is extracted from haematite in a blast furnace. Aluminium is extracted by electrolysis of purified bauxite dissolved in molten cryolite.',
    sumMn: 'Идэвхийн цувралд доод талд байгаа металл нь ихэвчлэн холбоогүй байдлаар олддог; идэвх өндөр металлд электролиз хэрэгтэй. Төмрийг гематитээс домны зууханд олборлоно. Алюминийг цэвэршүүлсэн бокситыг хайлсан криолитэд уусгаж электролизээр олборлоно.',
    obj: [
      ['9.6.1', 'Describe how easily metals can be obtained from their ores, related to their position in the reactivity series.', 'Металлыг ордоосоо хэр хялбар авч болохыг идэвхийн цувралд байрлалтай холбох.'],
      ['9.6.2', 'Describe the extraction of iron from haematite in the blast furnace: burning coke, reduction by carbon monoxide, decomposition of limestone, and slag formation.', 'Домны зууханд гематитаас төмөр олборлолтыг тодорхойлох: коксыг шатаах, нүүрстөрөгчийн монооксидоор бууруулах, известийн задрал, шаар үүсэх.'],
      ['9.6.3', 'Describe the extraction of aluminium by electrolysis, including the role of cryolite, why the carbon anodes are replaced, and the electrode reactions.', 'Алюминийг электролизээр олборлох: криолитын үүрэг, нүүрстөрөгчийн анодыг яагаад солих, электродын урвал.']
    ],
    vocab: [
      ['ore', 'хүдэр', 'A rock containing a metal compound in enough quantity to extract the metal.', 'Металлыг олборлох хэмжээний металлын нэгдэл агуулсан чулуу.'],
      ['blast furnace', 'домны зуух', 'A furnace in which iron is extracted from iron ore using coke and limestone.', 'Төмрийн хүдрээс кокс ба известээр төмөр олборлох зуух.'],
      ['cryolite', 'криолит', 'A substance that lowers the melting point of aluminium oxide in the extraction process.', 'Алюминийн исэлийн хайлах цэгийг бууруулдаг бодис.']
    ],
    sec: [
      ['Blast furnace', 'Домны зуух', 'Coke burns to give heat: C + O₂ → CO₂. The carbon dioxide reacts with more coke: CO₂ + C → 2CO. The carbon monoxide reduces the iron ore: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Limestone decomposes: CaCO₃ → CaO + CO₂. Calcium oxide removes impurities as slag: CaO + SiO₂ → CaSiO₃.', 'Кокс шатаж дулаан өгнө: C + O₂ → CO₂. Нүүрсхүчлийн хий кокстой урвалд орно: CO₂ + C → 2CO. Нүүрстөрөгчийн монооксид төмрийн хүдрийг бууруулна: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Известь задрана: CaCO₃ → CaO + CO₂. Кальцийн исэл хольцыг шаар болгон зайлуулна: CaO + SiO₂ → CaSiO₃.'],
      ['Aluminium by electrolysis', 'Алюминийн электролиз', 'Bauxite is purified to aluminium oxide and dissolved in molten cryolite, which lowers the melting point and saves energy. Aluminium forms at the cathode: Al³⁺ + 3e⁻ → Al. Oxygen forms at the carbon anode: 2O²⁻ → O₂ + 4e⁻. The oxygen reacts with the carbon anodes, so they must be replaced regularly.', 'Бокситыг цэвэршүүлж алюминийн исэл болгоод, хайлсан криолитэд уусгана. Криолит хайлах цэгийг бууруулж, эрчим хүч хэмнэнэ. Катодод алюминий үүснэ: Al³⁺ + 3e⁻ → Al. Нүүрстөрөгчийн анодод хүчилтөрөгч үүснэ: 2O²⁻ → O₂ + 4e⁻. Хүчилтөрөгч анодтой урвалд орж элэгддэг тул анодыг байнга солино.']
    ]
  },
  {
    id: 's-10-1', chapter: 'ch-environment', ref: '10.1', en: 'Water', mn: 'Ус',
    sumEn: 'Anhydrous cobalt(II) chloride (blue to pink) and anhydrous copper(II) sulfate (white to blue) test for water. Pure water has a sharp melting and boiling point. Domestic water is treated by sedimentation, filtration, carbon filtering and chlorination.',
    sumMn: 'Усгүй кобальтийн(II) хлорид (цэнхэр→ягаан) ба усгүй копперийн(II) сульфат (цагаан→цэнхэр) ус байгааг илрүүлнэ. Цэвэр ус хурц хайлах ба буцлах цэгтэй. Ахуйн усыг тунаах, шүүх, нүүрсээр шүүх, хлоржуулах замаар цэвэршүүлнэ.',
    obj: [
      ['10.1.1', 'Describe chemical tests for water using anhydrous cobalt(II) chloride and anhydrous copper(II) sulfate.', 'Усгүй кобальтийн(II) хлорид ба усгүй копперийн(II) сульфатаар усыг химийн аргаар илрүүлэх.'],
      ['10.1.2', 'Describe how to test the purity of water using melting point and boiling point.', 'Хайлах ба буцлах цэгээр усны цэвэр байдлыг шалгах.'],
      ['10.1.3', 'Explain why distilled water is used in practical chemistry rather than tap water.', 'Лабораторид яагаад нэрсэн ус ашиглаж, гуурсан усыг ашигладаггүй вэ гэдгийг тайлбарлах.'],
      ['10.1.4', 'State that natural water may contain dissolved oxygen, metal compounds, plastics, sewage, microbes, nitrates and phosphates, and state which are beneficial or harmful.', 'Байгалийн ус хүчилтөрөгч, металлын нэгдэл, хуванцар, бохир ус, бичил биетэн, нитрат, фосфат агуулж болох, аль нь ашигтай, аль нь хортой болохыг хэлэх.'],
      ['10.1.5', 'Describe the treatment of domestic water: sedimentation and filtration, carbon filtering, and chlorination.', 'Ахуйн усыг цэвэршүүлэх: тунаах ба шүүх, нүүрсээр шүүх, хлоржуулах.']
    ],
    vocab: [
      ['anhydrous', 'усгүй', 'Containing no water.', 'Ус агуулаагүй.'],
      ['distilled water', 'нэрсэн ус', 'Water purified by boiling and condensing, with fewer impurities.', 'Буцалгаж конденсацлан цэвэрлэсэн, хольц цөөн ус.'],
      ['chlorination', 'хлоржуулалт', 'Adding chlorine to water to kill microbes.', 'Бичил биетийг устгахын тулд усанд хлор нэмэх.']
    ],
    sec: [
      ['Tests for water', 'Ус илрүүлэх', 'Add a drop of water to anhydrous copper(II) sulfate: it turns from white to blue. Anhydrous cobalt(II) chloride turns from blue to pink. Both tests are reliable for showing that water is present.', 'Усгүй копперийн(II) сульфатад ус дусаахад цагаанаас цэнхэр болно. Усгүй кобальтийн(II) хлорид цэнхэрээс ягаан болно. Хоёулаа ус байгааг найдвартай харуулна.'],
      ['Treating domestic water', 'Ахуйн усыг цэвэршүүлэх', 'Sedimentation lets solids settle, and filtration removes the rest. Carbon removes tastes and odours. Chlorine kills harmful microbes. Dissolved oxygen is beneficial for aquatic life, but nitrates and phosphates from fertilisers cause harm.', 'Тунаах нь хатуу бодисыг суулгана, шүүх нь үлдсэнийг авна. Нүүрс амт, үнэрийг авна. Хлор хортой бичил биетийг устгана. Хүчилтөрөгч загасанд ашигтай, харин бордооны нитрат, фосфат хор учруулна.']
    ]
  },
  {
    id: 's-10-2', chapter: 'ch-environment', ref: '10.2', en: 'Fertilisers', mn: 'Бордоо',
    sumEn: 'Plants need nitrogen, phosphorus and potassium. Ammonium salts and nitrates are used as fertilisers to supply nitrogen. NPK fertilisers provide all three elements together.',
    sumMn: 'Ургамалд азот, фосфор, калий хэрэгтэй. Аммонийн давс ба нитратыг азотоор хангах бордоо болгон хэрэглэнэ. NPK бордоо гурван элементийг нэг дор өгнө.',
    obj: [
      ['10.2.1', 'State that ammonium salts and nitrates are used as fertilisers.', 'Аммонийн давс ба нитратыг бордоо болгон хэрэглэдгийг хэлэх.'],
      ['10.2.2', 'Describe the use of NPK fertilisers to provide nitrogen, phosphorus and potassium for improved plant growth.', 'NPK бордооны азот, фосфор, калийг ургамлын өсөлтөд ашиглахыг тодорхойлох.']
    ],
    vocab: [
      ['fertiliser', 'бордоо', 'A substance added to soil to supply nutrients for plant growth.', 'Ургамлын өсөлтийн тэжээл өгөхийн тулд хөрсөнд нэмэх бодис.'],
      ['NPK fertiliser', 'NPK бордоо', 'A fertiliser containing nitrogen, phosphorus and potassium.', 'Азот, фосфор, калий агуулсан бордоо.']
    ],
    sec: [
      ['Nitrogen fertilisers', 'Азотын бордоо', 'Ammonium salts such as ammonium sulfate and nitrates such as potassium nitrate supply nitrogen, which plants need to make proteins and chlorophyll.', 'Аммонийн сульфат зэрэг аммонийн давс, калийн нитрат зэрэг нитрат азот өгнө. Ургамал азотыг уураг, хлорофилл үйлдвэрлэхэд хэрэглэдэг.'],
      ['NPK', 'NPK', 'Nitrogen helps leaf growth, phosphorus helps roots and flowers, and potassium helps the plant resist disease. A balanced NPK fertiliser gives all three in one product.', 'Азот навчны өсөлтөд, фосфор үндэс ба цэцэгт, калий ургамлыг өвчинд тэсвэртэй болгоход тусална. Тэнцвэртэй NPK бордоо гурвыг нэг бүтээгдэхүүнээр өгнө.']
    ]
  },
  {
    id: 's-10-3', chapter: 'ch-environment', ref: '10.3', en: 'Air quality and climate', mn: 'Агаарын чанар ба уур амьсгал',
    sumEn: 'Clean dry air is about 78% nitrogen, 21% oxygen, with noble gases and CO₂. Pollutants include CO₂ and methane (global warming), CO (toxic), particulates, oxides of nitrogen and sulfur dioxide (acid rain). Photosynthesis uses CO₂ and water to make glucose and oxygen.',
    sumMn: 'Цэвэр хуурай агаар ойролцоогоор 78% азот, 21% хүчилтөрөгч, мөн инертийн хий, CO₂. Бохирдуулагч: CO₂ ба метан (дулаарал), CO (хортой), тоосонцор, азотын исэл ба хүхрийн давхар исэл (хүчиллэг бороо). Фотосинтез CO₂ ба устай глюкоз, хүчилтөрөгч үүсгэнэ.',
    obj: [
      ['10.3.1', 'State the composition of clean, dry air: about 78% nitrogen, 21% oxygen, and the rest noble gases and carbon dioxide.', 'Цэвэр, хуурай агаарын найрлага: ойролцоогоор 78% азот, 21% хүчилтөрөгч, үлдсэн нь инертийн хий ба нүүрсхүчлийн хий.'],
      ['10.3.2', 'State the sources and adverse effects of carbon dioxide, carbon monoxide, particulates, methane, oxides of nitrogen and sulfur dioxide.', 'Нүүрсхүчлийн хий, нүүрстөрөгчийн монооксид, тоосонцор, метан, азотын исэл, хүхрийн давхар исэлийн эх үүсвэр ба сөрөг нөлөөг хэлэх.'],
      ['10.3.3', 'Describe how carbon dioxide and methane cause global warming, by absorbing and re-emitting thermal energy.', 'Нүүрсхүчлийн хий ба метан дулаан энергийг шингээж дахин ялгаруулснаар дулаарлыг хэрхэн үүсгэхийг тодорхойлох.'],
      ['10.3.4', 'State and explain strategies to reduce climate change and acid rain.', 'Уур амьсгалын өөрчлөлт ба хүчиллэг бороог багасгах арга зам, тэдгээрийн тайлбар.'],
      ['10.3.5', 'Describe photosynthesis and write its word and symbol equations.', 'Фотосинтезийг тодорхойлж, үгэн ба тэмдэгт тэгшитгэлийг бичих.']
    ],
    vocab: [
      ['greenhouse gas', 'хүлэмжийн хий', 'A gas that absorbs and re-emits thermal energy, such as CO₂ and methane.', 'Дулаан энергийг шингээж дахин ялгаруулдаг хий, жишээ нь CO₂, метан.'],
      ['acid rain', 'хүчиллэг бороо', 'Rain made acidic by sulfur dioxide and oxides of nitrogen.', 'Хүхрийн давхар исэл, азотын исэлээр хүчиллэг болсон бороо.'],
      ['photosynthesis', 'фотосинтез', 'The reaction of carbon dioxide and water to form glucose and oxygen, using light and chlorophyll.', 'Гэрэл ба хлорофиллээр нүүрсхүчлийн хий, устай глюкоз, хүчилтөрөгч үүсгэх урвал.']
    ],
    sec: [
      ['Pollutants and their effects', 'Бохирдуулагч ба тэдгээрийн нөлөө', 'Carbon dioxide from complete combustion causes global warming. Carbon monoxide from incomplete combustion is toxic. Sulfur dioxide from fossil fuels and oxides of nitrogen from car engines cause acid rain. Methane from decomposing vegetation and animal digestion is a strong greenhouse gas.', 'Бүрэн шаталтаас гарах нүүрсхүчлийн хий дулаарлыг үүсгэнэ. Бүрэн бус шаталтын нүүрстөрөгчийн монооксид хортой. Чулуужсан түлшний хүхрийн давхар исэл, машины азотын исэл хүчиллэг бороо үүсгэнэ. Ургамлын задрал, амьтны бодисын шингээлтээс гарах метан хүчтэй хүлэмжийн хий.'],
      ['Photosynthesis', 'Фотосинтез', 'In the presence of chlorophyll and light energy, carbon dioxide and water react to form glucose and oxygen: carbon dioxide + water → glucose + oxygen. Symbol equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.', 'Хлорофилл ба гэрлийн энергийн оролцоотойгоор нүүрсхүчлийн хий ба ус урвалд орж глюкоз, хүчилтөрөгч үүсгэнэ: нүүрсхүчлийн хий + ус → глюкоз + хүчилтөрөгч. Тэмдэгт тэгшитгэл: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.']
    ]
  }
];

export const TOPICS_C = SPECS.map(buildTopic);
