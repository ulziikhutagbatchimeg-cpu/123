// Learning statements from the Cambridge IGCSE 0620 (2026–2028) subject content, sections 9–12.
// Each entry is [statement number, English, Mongolian, extended?]. "x" marks Extended (Supplement) statements.
import type { ObjRow } from './syllabusObjectivesA';

export const OBJECTIVES_C: Record<string, ObjRow[]> = {
  '9.1': [
    [1, 'Compare the general physical properties of metals and non-metals, including thermal conductivity, electrical conductivity, malleability and ductility, and melting and boiling points.', 'Металл ба металл бусын ерөнхий физик шинж чанарыг харьцуулах: дулаан ба цахилгаан дамжуулах чадвар, нарийн хэлбэрт орох, сунах чадвар, хайлах ба буцлах цэг.'],
    [2, 'Describe the general chemical properties of metals, limited to their reactions with (a) dilute acids, (b) cold water and steam, (c) oxygen.', 'Металлын ерөнхий химийн шинж чанарыг (а) шингэрүүлсэн хүчил, (б) хүйтэн ус ба уур, (в) хүчилтөрөгчтэй урвалаар тодорхойлох.']
  ],
  '9.2': [
    [1, 'Describe the uses of metals in terms of their physical properties: aluminium for aircraft and overhead electrical cables (low density, and good conductivity for cables), aluminium in food containers (corrosion resistance), and copper in electrical wiring (conductivity and ductility).', 'Металлын хэрэглээг физик шинж чанараар тодорхойлох: онгоцонд алюминий (нягт бага), агаарын кабелид алюминий (нягт бага, сайн дамжуулах), хүнсний савт алюминий (зэврэлтэд тэсвэртэй), цахилгаан утсанд зэс (дамжуулах, сунах).']
  ],
  '9.3': [
    [1, 'Describe an alloy as a mixture of a metal with other elements, including brass (copper and zinc) and stainless steel (iron with chromium, nickel and carbon).', 'Хайлшийг металлыг өөр элементтэй холисон гэж тодорхойлох, гууль (зэс ба цайр), зэвэрдэггүй ган (төмөр, хром, никель, нүүрстөрөгч).'],
    [2, 'State that alloys can be harder and stronger than the pure metals and are more useful.', 'Хайлш цэвэр металлаас хатуу, бат, илүү хэрэгтэй байж болохыг хэлэх.'],
    [3, 'Describe the uses of alloys in terms of their physical properties, including stainless steel in cutlery because of its hardness and resistance to rusting.', 'Хайлшийн хэрэглээг физик шинж чанараар тодорхойлох, жишээ нь зэвэрдэггүй ганыг хатуу, зэвэрдэггүй тул халбага, хутганд.'],
    [4, 'Identify representations of alloys from diagrams of structure.', 'Бүтцийн зургаас хайлшийг таних.'],
    [5, 'Explain in terms of structure how alloys can be harder and stronger than pure metals, because the different-sized atoms stop the layers sliding over each other.', 'Хайлш яагаад цэвэр металлаас хатуу, бат байдгийг бүтцээр тайлбарлах: өөр хэмжээтэй атомууд давхаргыг гулсахаас сэргийлдэг.', 'x']
  ],
  '9.4': [
    [1, 'State the order of the reactivity series: potassium, sodium, calcium, magnesium, aluminium, carbon, zinc, iron, hydrogen, copper, silver, gold.', 'Идэвхийн цувралын дараалал: калий, натри, кальци, магни, алюминий, нүүрстөрөгч, цайр, төмөр, устөрөгч, зэс, мөнгө, алт гэж хэлэх.'],
    [2, 'Describe the reactions, if any, of potassium, sodium and calcium with cold water; magnesium with steam; and magnesium, zinc, iron, copper, silver and gold with dilute hydrochloric acid, and explain them in terms of the position in the series.', 'Калий, натри, кальци хүйтэн устай; магни уураар; магни, цайр, төмөр, зэс, мөнгө, алт давсны хүчилтэй урвалыг тодорхойлж, цувралд байрлалаар тайлбарлах.'],
    [3, 'Deduce an order of reactivity from a given set of experimental results.', 'Өгөгдсөн туршилтын үр дүнгээс идэвхийн дарааллыг гаргах.'],
    [4, 'Describe the relative reactivities of metals in terms of their tendency to form positive ions, by displacement reactions with the aqueous ions of magnesium, zinc, iron, copper and silver.', 'Металлын харьцангуй идэвхийг эерэг ион үүсгэх хандлагаар, Mg, Zn, Fe, Cu, Ag-ийн усан ионтой нүүлгэх урвалаар тодорхойлох.', 'x'],
    [5, 'Explain the apparent unreactivity of aluminium in terms of its oxide layer.', 'Алюминийн идэвхгүй мэт харагдахыг исэлийн давхаргаар тайлбарлах.', 'x']
  ],
  '9.5': [
    [1, 'State the conditions required for iron and steel to rust to form hydrated iron(III) oxide.', 'Төмөр, ган зэврэн усан төмрийн(III) исэл үүсэхэд шаардлагатай нөхцөлийг хэлэх.'],
    [2, 'State some common barrier methods of rust prevention, including painting, greasing and coating with plastic.', 'Зэврэхээс сэргийлэх хашлага аргуудыг хэлэх: будаг, тослох, хуванцараар бүрэх.'],
    [3, 'Describe how barrier methods prevent rusting by excluding oxygen or water.', 'Хашлага аргууд хүчилтөрөгч эсвэл усыг тусгаарлан зэврэхээс хэрхэн сэргийлэхийг тодорхойлох.'],
    [4, 'Describe the use of zinc in galvanising as an example of a barrier method and of sacrificial protection.', 'Галванжилтад цайрыг хашлага арга ба золиослолт хамгаалалтын жишээ болгон хэрэглэхийг тодорхойлох.', 'x'],
    [5, 'Explain sacrificial protection in terms of the reactivity series and in terms of electron loss.', 'Золиослолт хамгаалалтыг идэвхийн цуврал ба электрон алдалтаар тайлбарлах.', 'x']
  ],
  '9.6': [
    [1, 'Describe the ease in obtaining metals from their ores, related to the position of the metal in the reactivity series.', 'Металлыг ордоосоо авах хялбар байдлыг идэвхийн цувралд байрлалтай холбож тодорхойлох.'],
    [2, 'Describe the extraction of iron from haematite in the blast furnace: (a) burning of coke to give heat and carbon dioxide, (b) reduction of carbon dioxide to carbon monoxide, (c) reduction of iron(III) oxide by carbon monoxide, (d) thermal decomposition of limestone to calcium oxide, (e) formation of slag. Symbol equations are not required.', 'Домны зуухад гематитаас төмөр олборлолтыг тодорхойлох: (а) коксыг шатааж дулаан ба нүүрсхүчлийн хий, (б) CO₂-ыг CO болгон бууруулах, (в) Fe₂O₃-ыг CO-оор бууруулах, (г) известийг задлан CaO, (д) шаар үүсэх. Тэмдэгт тэгшитгэл шаардлагагүй.'],
    [3, 'State that the main ore of aluminium is bauxite and that aluminium is extracted by electrolysis.', 'Алюминийн гол хүдэр нь бокситыг, алюминийг электролизээр олборлодгийг хэлэх.'],
    [4, 'State the symbol equations for the extraction of iron from haematite: C + O₂ → CO₂; C + CO₂ → 2CO; Fe₂O₃ + 3CO → 2Fe + 3CO₂; CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃.', 'Гематитаас төмөр олборлох тэмдэгт тэгшитгэлүүдийг хэлэх: C + O₂ → CO₂; C + CO₂ → 2CO; Fe₂O₃ + 3CO → 2Fe + 3CO₂; CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃.', 'x'],
    [5, 'Describe the extraction of aluminium from purified bauxite (aluminium oxide): (a) the role of cryolite, (b) why the carbon anodes must be regularly replaced, (c) the reactions at the electrodes, including ionic half-equations. Details of purifying bauxite are not required.', 'Цэвэршүүлсэн бокситоос (алюминийн исэл) алюминий олборлолтыг тодорхойлох: (а) криолитын үүрэг, (б) нүүрстөрөгчийн анодыг яагаад байнга солих, (в) электродын урвал, ионы хагас тэгшитгэлтэй.', 'x']
  ],
  '10.1': [
    [1, 'Describe chemical tests for the presence of water using anhydrous cobalt(II) chloride and anhydrous copper(II) sulfate.', 'Усгүй кобальтийн(II) хлорид ба усгүй копперийн(II) сульфатаар усыг химийн аргаар илрүүлэх.'],
    [2, 'Describe how to test for the purity of water using melting point and boiling point.', 'Хайлах ба буцлах цэгээр усны цэвэр байдлыг шалгах.'],
    [3, 'Explain that distilled water is used in practical chemistry rather than tap water because it contains fewer chemical impurities.', 'Лабораторид гуурсан усны оронд нэрсэн ус хэрэглэдгийг химийн хольц бага байдгаар тайлбарлах.'],
    [4, 'State that water from natural sources may contain dissolved oxygen, metal compounds, plastics, sewage, harmful microbes, nitrates from fertilisers and phosphates from fertilisers and detergents.', 'Байгалийн уст хүчилтөрөгч, металлын нэгдэл, хуванцар, бохир ус, хортой бичил биетэн, бордооны нитрат, фосфат агуулж болохыг хэлэх.'],
    [5, 'State that some of these substances are beneficial: dissolved oxygen for aquatic life, and some metal compounds that provide essential minerals.', 'Эдгээрийн зарим нь ашигтай: загасанд хүчилтөрөгч, зарим металлын нэгдэл амин чухал эрдэс бодис өгдөгийг хэлэх.'],
    [6, 'State that some of these substances are potentially harmful: some metal compounds are toxic; some plastics harm aquatic life; sewage microbes cause disease; nitrates and phosphates lead to deoxygenation and damage aquatic life.', 'Зарим нь хортой: зарим металлын нэгдэл хорон; зарим хуванцар загасанд хор; бохир усны бичил биетэн өвчин; нитрат, фосфат хүчилтөрөгчийг бууруулж загасанд хор.'],
    [7, 'Describe the treatment of the domestic water supply: sedimentation and filtration to remove solids, carbon to remove tastes and odours, and chlorination to kill microbes.', 'Ахуйн усыг цэвэршүүлэх: тунаах ба шүүхээр хатуу бодисыг, нүүрсээр амт, үнэрийг, хлоржуулалтаар бичил биетийг устгах.']
  ],
  '10.2': [
    [1, 'State that ammonium salts and nitrates are used as fertilisers.', 'Аммонийн давс ба нитратыг бордоо болгон хэрэглэдгийг хэлэх.'],
    [2, 'Describe the use of NPK fertilisers to provide nitrogen, phosphorus and potassium for improved plant growth.', 'NPK бордооны азот, фосфор, калийг ургамлын өсөлтийг сайжруулахад өгөхийг тодорхойлох.']
  ],
  '10.3': [
    [1, 'State the composition of clean, dry air: about 78% nitrogen, 21% oxygen, and the remainder a mixture of noble gases and carbon dioxide.', 'Цэвэр, хуурай агаарын найрлага: ойролцоогоор 78% азот, 21% хүчилтөрөгч, үлдсэн нь инертийн хий ба нүүрсхүчлийн хийн холимог.'],
    [2, 'State the source of each air pollutant: (a) CO₂ from complete combustion of carbon-containing fuels; (b) CO and particulates from incomplete combustion; (c) methane from decomposing vegetation and animal digestion; (d) oxides of nitrogen from car engines; (e) SO₂ from fossil fuels containing sulfur.', 'Агаарын бохирдуулагч бүрийн эх үүсвэр: (а) CO₂ бүрэн шаталтаас, (б) CO ба тоосонцор бүрэн бус шаталтаас, (в) метан задарсан ургамал, амьтны бодисын шингээлтээс, (г) азотын исэл машины хөдөлгүүрээс, (д) SO₂ хүхэртэй чулуужсан түлшнээс.'],
    [3, 'State the adverse effect of each air pollutant: (a) CO₂ increases global warming and climate change; (b) CO is toxic; (c) particulates cause respiratory problems and cancer; (d) methane increases global warming; (e) oxides of nitrogen cause acid rain, photochemical smog and respiratory problems; (f) SO₂ causes acid rain.', 'Агаарын бохирдуулагч бүрийн сөрөг нөлөө: (а) CO₂ дулаарал, уур амьсгалын өөрчлөлт; (б) CO хортой; (в) тоосонцор амьсгалын зам, хорт хавдар; (г) метан дулаарал; (д) азотын исэл хүчиллэг бороо, фотохимийн утаа, амьсгалын өвчин; (е) SO₂ хүчиллэг бороо.'],
    [4, 'State and explain strategies to reduce the effects of climate change (planting trees, reducing livestock farming, decreasing fossil fuel use, increasing hydrogen and renewable energy such as wind and solar) and acid rain (catalytic converters, low-sulfur fuels, flue gas desulfurisation with calcium oxide).', 'Уур амьсгалын өөрчлөлт (мод тарих, мал аж ахуйг бууруулах, чулуужсан түлшийг багасгах, устөрөгч, сэргээгдэх эрчим хүч) ба хүчиллэг бороог (катализатор, бага хүхэртэй түлш, CaO-оор утаа цэвэрлэх) багасгах арга зам.'],
    [5, 'Describe photosynthesis as the reaction between carbon dioxide and water to produce glucose and oxygen in the presence of chlorophyll, using energy from light.', 'Фотосинтезийг хлорофиллийн оролцоотой, гэрлийн энергийг ашиглан нүүрсхүчлийн хий ба усаас глюкоз, хүчилтөрөгч үүсэх урвал гэж тодорхойлох.'],
    [6, 'State the word equation for photosynthesis: carbon dioxide + water → glucose + oxygen.', 'Фотосинтезийн үгэн тэгшитгэл: нүүрсхүчлийн хий + ус → глюкоз + хүчилтөрөгч.'],
    [7, 'Describe how the greenhouse gases carbon dioxide and methane cause global warming, by absorbing, reflecting and emitting thermal energy, reducing thermal energy loss to space.', 'Хүлэмжийн хий (CO₂, метан) дулаан энергийг шингээж, ойлгож, ялгаруулж, сансарт алдагдах дулааныг багасгаснаар дулаарлыг үүсгэхийг тодорхойлох.', 'x'],
    [8, 'Explain how oxides of nitrogen form in car engines, and describe their removal by catalytic converters, e.g. 2CO + 2NO → 2CO₂ + N₂.', 'Машины хөдөлгүүрт азотын исэл хэрхэн үүснэ, катализаторт хэрхэн зайлагдахыг тайлбарлах, жишээ нь 2CO + 2NO → 2CO₂ + N₂.', 'x'],
    [9, 'State the symbol equation for photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.', 'Фотосинтезийн тэмдэгт тэгшитгэл: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.', 'x']
  ],
  '11.1': [
    [1, 'Draw and interpret the displayed formula of a molecule to show all the atoms and all the bonds.', 'Молекулын бүх атом, холбоог харуулсан дэлгэцийн томьёог зурж, тайлбарлах.'],
    [2, 'Write and interpret the general formulae of compounds in the same homologous series: alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ, alcohols CₙH₂ₙ₊₁OH, carboxylic acids CₙH₂ₙ₊₁COOH.', 'Нэг гомолог цувралын нэгдлийн ерөнхий томьёог бичиж тайлбарлах: алкан CₙH₂ₙ₊₂, алкен CₙH₂ₙ, спирт CₙH₂ₙ₊₁OH, карбоксилын хүчил CₙH₂ₙ₊₁COOH.'],
    [3, 'Identify a functional group as an atom or group of atoms that determines the chemical properties of a homologous series.', 'Функциональ бүлгийг гомолог цувралын химийн шинж чанарыг тодорхойлдог атом эсвэл атомын бүлэг гэж таних.'],
    [4, 'State that a homologous series is a family of similar compounds with similar chemical properties due to the same functional group.', 'Гомолог цуваа нь ижил функциональ бүлгийн улмаас ижил химийн шинж чанартай нэгдлийн бүлэг гэж хэлэх.', 'x'],
    [5, 'State that a saturated compound has molecules in which all carbon–carbon bonds are single bonds.', 'Ханасан нэгдэл нь нүүрстөрөгч–нүүрстөрөгчийн бүх холбоо ганц байдаг молекултай гэж хэлэх.', 'x'],
    [6, 'State that an unsaturated compound has molecules in which one or more carbon–carbon bonds are not single bonds.', 'Ханаагүй нэгдэл нь нүүрстөрөгч–нүүрстөрөгчийн нэг буюу хэд хэдэн холбоо ганц биш молекултай гэж хэлэх.', 'x'],
    [7, 'State that a structural formula is an unambiguous description of the arrangement of atoms in a molecule, including CH₂=CH₂, CH₃CH₂OH and CH₃COOCH₃.', 'Бүтцийн томьёо нь молекул дахь атомын байрлалыг давхардалгүй илэрхийлэх гэж хэлэх, жишээ нь CH₂=CH₂, CH₃CH₂OH, CH₃COOCH₃.', 'x'],
    [8, 'Define structural isomers as compounds with the same molecular formula but different structural formulae, including C₄H₁₀ and C₄H₈.', 'Бүтцийн изомерыг молекул томьёо ижил, бүтцийн томьёо өөр нэгдэл гэж тодорхойлох, жишээ нь C₄H₁₀, C₄H₈.', 'x'],
    [9, 'Describe the general characteristics of a homologous series: (a) same functional group, (b) same general formula, (c) each member differs from the next by a –CH₂– unit, (d) a trend in physical properties, (e) similar chemical properties.', 'Гомолог цувралын ерөнхий шинж чанар: (а) ижил функциональ бүлэг, (б) ижил ерөнхий томьёо, (в) гишүүн бүр дараагийнхаасаа –CH₂– нэгжээр ялгаатай, (г) физик шинж чанарын чиг хандлага, (д) ойр химийн шинж чанар.', 'x']
  ],
  '11.2': [
    [1, 'Name and draw the displayed formulae of methane, ethane, ethene, ethanol, ethanoic acid, and the products of the reactions in sections 11.4–11.7.', 'Метан, этан, этен, этанол, цууны хүчил, 11.4–11.7 хэсгийн урвалын бүтээгдэхүүний нэр ба дэлгэцийн томьёог бичих.'],
    [2, 'State the type of compound present, given a chemical name ending in -ane, -ene, -ol or -oic acid, or from a molecular or displayed formula.', 'Нэр (-ane, -ene, -ol, -oic acid) эсвэл томьёогоор нэгдлийн төрлийг хэлэх.'],
    [3, 'Name and draw the structural and displayed formulae of unbranched alkanes, alkenes (including but-1-ene and but-2-ene), alcohols (including propan-1-ol, propan-2-ol, butan-1-ol and butan-2-ol) and carboxylic acids containing up to four carbon atoms.', 'Салбаргүй алкан, алкен (but-1-ene, but-2-ene), спирт (propan-1-ol, propan-2-ol, butan-1-ol, butan-2-ol), дөрвөн нүүрстөрөгч хүртэлх карбоксилын хүчлийн бүтцийн ба дэлгэцийн томьёог нэрлэж зурах.', 'x'],
    [4, 'Name and draw the displayed formulae of the unbranched esters that can be made from unbranched alcohols and carboxylic acids, each containing up to four carbon atoms.', 'Дөрвөн нүүрстөрөгч хүртэлх салбаргүй спирт ба карбоксилын хүчлээс үүсэх салбаргүй эфирүүдийн дэлгэцийн томьёог нэрлэж зурах.', 'x']
  ],
  '11.3': [
    [1, 'Name the fossil fuels: coal, natural gas and petroleum.', 'Чулуужсан түлш: нүүрс, байгалийн хий, нефтийг нэрлэх.'],
    [2, 'Name methane as the main constituent of natural gas.', 'Байгалийн хийн гол бүрэлдэхүүн нь метан гэж нэрлэх.'],
    [3, 'State that hydrocarbons are compounds that contain hydrogen and carbon only.', 'Устөрөгч-нүүрстөрөгч нь зөвхөн устөрөгч, нүүрстөрөгч агуулсан нэгдэл гэж хэлэх.'],
    [4, 'State that petroleum is a mixture of hydrocarbons.', 'Нефть нь устөрөгч-нүүрстөрөгчийн холимог гэж хэлэх.'],
    [5, 'Describe the separation of petroleum into useful fractions by fractional distillation.', 'Нефтийг фракцлах нэрэлтээр хэрэгтэй фракцад салгахыг тодорхойлох.'],
    [6, 'Describe how the properties of fractions change from the bottom to the top of the fractionating column: decreasing chain length, higher volatility, lower boiling points, lower viscosity.', 'Фракцлах багананы доодоос дээш фракцын шинж чанарын өөрчлөлт: гинжийн урт буурах, дэгдэмхий байдал нэмэгдэх, буцлах цэг буурах, зуурамтгай байдал буурах.'],
    [7, 'Name the uses of the fractions: (a) refinery gas for heating and cooking; (b) gasoline/petrol for cars; (c) naphtha as a chemical feedstock; (d) kerosene/paraffin for jet fuel; (e) diesel oil/gas oil for diesel engines; (f) fuel oil for ships and home heating; (g) lubricating oil for lubricants, waxes and polishes; (h) bitumen for making roads.', 'Фракцын хэрэглээ: (а) түлшний хий – халаах, хоол хийх, (б) бензин – машин, (в) нафта – химийн түүхий эд, (г) керосин – онгоцны түлш, (д) дизелийн тос – дизель хөдөлгүүр, (е) түлшний тос – хөлөг онгоц, халаалт, (ж) тослогч тос – тос, лав, гуужуулагч, (з) битум – зам барих.'],
  ],
  '11.4': [
    [1, 'State that the bonding in alkanes is single covalent and that alkanes are saturated hydrocarbons.', 'Алканы холбоо ганц ковалент, алкан ханасан устөрөгч-нүүрстөрөгч гэж хэлэх.'],
    [2, 'Describe the properties of alkanes as generally unreactive, except in terms of combustion and substitution by chlorine.', 'Алканы шинж чанар ерөнхийдөө урвалд ордоггүй; шаталт ба хлороор орлуулалтаас бусад.'],
    [3, 'State that in a substitution reaction one atom or group of atoms is replaced by another atom or group of atoms.', 'Орлуулалтын урвалд нэг атом эсвэл бүлгийг өөр атом эсвэл бүлгээр солих гэж хэлэх.', 'x'],
    [4, 'Describe the substitution reaction of alkanes with chlorine as a photochemical reaction, with ultraviolet light providing the activation energy, and draw the structural or displayed formulae of the monosubstitution products.', 'Алканы хлоротой орлуулалтыг хэт ягаан гэрлийн идэвхжлийн энергиэр явагддаг фотохимийн урвал гэж тодорхойлж, моно орлуулалтын бүтээгдэхүүний томьёог зурах.', 'x']
  ],
  '11.5': [
    [1, 'State that the bonding in alkenes includes a double carbon–carbon covalent bond and that alkenes are unsaturated hydrocarbons.', 'Алкены холбоонд нүүрстөрөгч–нүүрстөрөгчийн давхар ковалент холбоо багтаж, алкен ханаагүй устөрөгч-нүүрстөрөгч гэж хэлэх.'],
    [2, 'Describe the manufacture of alkenes and hydrogen by cracking larger alkane molecules, using a high temperature and a catalyst.', 'Урт алканыг өндөр температур, катализатороор крекингээр задлан алкен ба устөрөгч үйлдвэрлэхийг тодорхойлох.'],
    [3, 'Describe the reasons for the cracking of larger alkane molecules.', 'Урт алканыг крекингээр задлах шалтгааныг тодорхойлох.'],
    [4, 'Describe the test to distinguish between saturated and unsaturated hydrocarbons by their reaction with aqueous bromine.', 'Ханасан ба ханаагүй устөрөгч-нүүрстөрөгчийг усан бромтой урвалаар ялгах туршилтыг тодорхойлох.'],
    [5, 'State that in an addition reaction only one product is formed.', 'Нэмэлтийн урвалд зөвхөн нэг бүтээгдэхүүн үүснэ гэж хэлэх.', 'x'],
    [6, 'Describe the properties of alkenes in terms of addition reactions with (a) bromine or aqueous bromine, (b) hydrogen in the presence of a nickel catalyst, (c) steam in the presence of an acid catalyst, and draw the products.', 'Алкенийн нэмэлтийн урвалыг (а) бром, усан бром, (б) никель катализатортой устөрөгч, (в) хүчил катализатортой уур, бүтээгдэхүүний томьёотой нь тодорхойлох.', 'x']
  ],
  '11.6': [
    [1, 'Describe the manufacture of ethanol by (a) fermentation of aqueous glucose at 25–35 °C in the presence of yeast and absence of oxygen, and (b) catalytic addition of steam to ethene at 300 °C and 60 atm with an acid catalyst.', 'Этанолыг (а) глюкозыг 25–35 °C-т мөөгөнцрөөр, хүчилтөрөгчгүйгээр исгэх, (б) этенд 300 °C, 60 atm-д хүчил катализатортойгоор уур катализатороор нэмэх замаар үйлдвэрлэхийг тодорхойлох.'],
    [2, 'Describe the combustion of ethanol.', 'Этанолын шаталтыг тодорхойлох.'],
    [3, 'State the uses of ethanol as (a) a solvent and (b) a fuel.', 'Этанолыг (а) уусгагч, (б) түлш болгон хэрэглэдгийг хэлэх.'],
    [4, 'Describe the advantages and disadvantages of the manufacture of ethanol by (a) fermentation and (b) catalytic addition of steam to ethene.', 'Этанол үйлдвэрлэх (а) исгэлт, (б) этенд уур нэмэх аргуудын давуу ба сул талыг тодорхойлох.', 'x']
  ],
  '11.7': [
    [1, 'Describe the reaction of ethanoic acid with (a) metals, (b) bases, (c) carbonates, including the names and formulae of the salts produced.', 'Цууны хүчлийн (а) металл, (б) суурь, (в) карбонаттай урвал, үүсэх давсны нэр, томьёог тодорхойлох.'],
    [2, 'Describe the formation of ethanoic acid by oxidation of ethanol: (a) with acidified aqueous potassium manganate(VII); (b) by bacterial oxidation during vinegar production.', 'Этанолыг исэлдүүлж цууны хүчил үүсэхийг тодорхойлох: (а) хүчиллэг калийн перманганат(VII)-оор, (б) цагаан цуу үйлдвэрлэхэд бактериар.', 'x'],
    [3, 'Describe the reaction of a carboxylic acid with an alcohol using an acid catalyst to form an ester.', 'Карбоксилын хүчил ба спиртийн хүчил катализатортойгоор урвалд орж эфир үүсэхийг тодорхойлох.', 'x']
  ],
  '11.8': [
    [1, 'Define polymers as large molecules built up from many smaller molecules called monomers.', 'Полимерийг мономер гэх олон жижиг молекулаас бүтсэн том молекул гэж тодорхойлох.'],
    [2, 'Describe the formation of poly(ethene) as an example of addition polymerisation using ethene monomers.', 'Поли(этен)-ийг этен мономероор нэмэлтийн полимержилтийн жишээгээр тодорхойлох.'],
    [3, 'State that plastics are made from polymers.', 'Хуванцар нь полимераас хийгдсэнийг хэлэх.'],
    [4, 'Describe how the properties of plastics have implications for their disposal.', 'Хуванцарын шинж чанар нь хаягдлыг зайлуулахад хэрхэн нөлөөлөхийг тодорхойлох.'],
    [5, 'Describe the environmental challenges caused by plastics: disposal in landfill sites, accumulation in oceans, and formation of toxic gases from burning.', 'Хуванцарын байгаль орчны асуудал: хогийн цэгт хаягдах, далайд хуримтлагдах, шатахад хортой хий үүсэх.'],
    [6, 'Identify the repeat units and/or linkages in addition polymers and in condensation polymers.', 'Нэмэлтийн ба конденсацийн полимерийн давтагдах нэгж ба холбоосыг таних.', 'x'],
    [7, 'Deduce the structure or repeat unit of an addition polymer from a given alkene, and vice versa.', 'Өгөгдсөн алкенээс нэмэлтийн полимерийн бүтэц ба давтагдах нэгжийг гаргах, эсрэгээр.', 'x'],
    [8, 'Deduce the structure or repeat unit of a condensation polymer from given monomers, and vice versa, for (a) polyamides from a dicarboxylic acid and a diamine, (b) polyesters from a dicarboxylic acid and a diol.', 'Өгөгдсөн мономероос конденсацийн полимерийн бүтэц ба давтагдах нэгжийг гаргах, эсрэгээр: (а) дикарбоксилын хүчил ба диаминаас полиамид, (б) дикарбоксилын хүчил ба диолоос полиэфир.', 'x'],
    [9, 'Describe the differences between addition and condensation polymerisation.', 'Нэмэлтийн ба конденсацийн полимержилтийн ялгааг тодорхойлох.', 'x'],
    [10, 'Describe and draw the structure of (a) nylon, a polyamide, and (b) PET, a polyester.', 'Полиамид нейлон (а) ба полиэфир PET (б)-ийн бүтцийг тодорхойлж зурах.', 'x'],
    [11, 'State that PET can be converted back into monomers and re-polymerised.', 'PET-ийг буцаан мономер болгож, дахин полимержүүлж болохыг хэлэх.', 'x'],
    [12, 'Describe proteins as natural polyamides formed from amino acid monomers with the general structure H₂N–CH(R)–COOH, where R is a different side-chain.', 'Уургийг амин хүчлийн мономероос үүссэн байгалийн полиамид гэж тодорхойлох, ерөнхий бүтэц H₂N–CH(R)–COOH; R нь өөр өөр хажуугийн гинж.', 'x'],
    [13, 'Describe and draw the structure of proteins as chains of amino acids joined by peptide (amide) links.', 'Уургийн бүтцийг амин хүчлийн гинж, пептидийн (амидын) холбоотой гэж тодорхойлж зурах.', 'x']
  ],
  '12.1': [
    [1, 'Name appropriate apparatus for the measurement of time, temperature, mass and volume: stop-watches, thermometers, balances, burettes, volumetric pipettes, measuring cylinders and gas syringes.', 'Хугацаа, температур, масс, эзлэхүүнийг хэмжих тохиромжтой багаж: секундомер, термометр, жин, бюретка, эзлэхүүний пипетка, хэмжих цилиндр, хийн шприц.'],
    [2, 'Suggest advantages and disadvantages of experimental methods and apparatus.', 'Туршилтын арга ба багажийн давуу ба сул талыг санал болгох.'],
    [3, 'Describe a solvent, solute, solution, saturated solution, residue and filtrate.', 'Уусгагч, уусгагдах бодис, уусмал, ханасан уусмал, үлдэгдэл, шүүгдэлийг тодорхойлох.']
  ],
  '12.2': [
    [1, 'Describe an acid–base titration, including the use of a burette, a volumetric pipette and a suitable indicator.', 'Хүчил–суурийн титрлэлтийг бюретка, эзлэхүүний пипетка, тохиромжтой индикатор ашиглан тодорхойлох.'],
    [2, 'Describe how to identify the end-point of a titration using an indicator.', 'Индикатороор титрлэлтийн төгсгөлийн цэгийг тодорхойлох.']
  ],
  '12.3': [
    [1, 'Describe how paper chromatography is used to separate mixtures of soluble coloured substances, using a suitable solvent.', 'Тохиромжтой уусгагчаар уусдаг өнгөт бодисын холимгийг цаасан хроматографаар салгахыг тодорхойлох.'],
    [2, 'Interpret simple chromatograms to identify (a) unknown substances by comparison with known substances, (b) pure and impure substances.', 'Энгийн хроматограммыг тайлбарлах: (а) мэдэгдэхгүй бодисыг мэдэгдэх бодистой харьцуулан таних, (б) цэвэр ба хольцтой бодисыг ялгах.'],
    [3, 'Describe how paper chromatography is used to separate mixtures of soluble colourless substances, using a suitable solvent and a locating agent.', 'Тохиромжтой уусгагч ба илрүүлэгч бодисоор уусдаг өнгөгүй бодисын холимгийг цаасан хроматографаар салгахыг тодорхойлох.', 'x'],
    [4, 'State and use the equation: Rf = distance travelled by substance ÷ distance travelled by solvent.', 'Rf = бодисын явсан зай ÷ уусгагчийн явсан зай гэсэн томьёог хэлж хэрэглэх.', 'x']
  ],
  '12.4': [
    [1, 'Describe and explain methods of separation and purification using (a) a suitable solvent, (b) filtration, (c) crystallisation, (d) simple distillation, (e) fractional distillation.', 'Салгах, цэвэршүүлэх аргуудыг тодорхойлж тайлбарлах: (а) тохиромжтой уусгагч, (б) шүүлт, (в) талстжуулалт, (г) энгийн нэрэлт, (д) фракцлах нэрэлт.'],
    [2, 'Suggest suitable separation and purification techniques, given information about the substances involved.', 'Оролцох бодисын мэдээллээр тохиромжтой салгах, цэвэршүүлэх аргыг санал болгох.'],
    [3, 'Identify substances and assess their purity using melting point and boiling point information.', 'Бодисыг таньж, хайлах ба буцлах цэгийн мэдээллээр цэвэр байдлыг үнэлэх.']
  ],
  '12.5': [
    [1, 'Describe tests to identify the anions: (a) carbonate (dilute acid, then test for carbon dioxide); (b) chloride, bromide and iodide (acidify with dilute nitric acid, then aqueous silver nitrate); (c) nitrate (reduce with aluminium foil and aqueous sodium hydroxide, then test for ammonia); (d) sulfate (acidify with dilute nitric acid, then aqueous barium nitrate); (e) sulfite (acidified aqueous potassium manganate(VII)).', 'Анионыг таних туршилт: (а) карбонат – шингэрүүлсэн хүчил, дараа нь CO₂; (б) хлорид, бромид, иодид – шингэрүүлсэн HNO₃, дараа нь AgNO₃; (в) нитрат – Al foil ба NaOH, дараа нь NH₃; (г) сульфат – шингэрүүлсэн HNO₃, дараа нь Ba(NO₃)₂; (д) сульфит – хүчиллэг KMnO₄.'],
    [2, 'Describe tests using aqueous sodium hydroxide and aqueous ammonia to identify the cations: aluminium (Al³⁺), ammonium (NH₄⁺), calcium (Ca²⁺), chromium(III) (Cr³⁺), copper(II) (Cu²⁺), iron(II) (Fe²⁺), iron(III) (Fe³⁺), zinc (Zn²⁺).', 'Катионыг натрийн гидроксид ба аммиакийн уусмалаар таних туршилт: Al³⁺, NH₄⁺, Ca²⁺, Cr³⁺, Cu²⁺, Fe²⁺, Fe³⁺, Zn²⁺.'],
    [3, 'Describe tests to identify the gases: ammonia (damp red litmus paper), carbon dioxide (limewater), chlorine (damp litmus paper), hydrogen (lighted splint), oxygen (glowing splint), sulfur dioxide (acidified aqueous potassium manganate(VII)).', 'Хийг таних туршилт: аммиак (нойтон улаан литмус), CO₂ (шохойн ус), хлор (нойтон литмус), устөрөгч (асаасан модны үзүүр), хүчилтөрөгч (шатаж буй модны үзүүр), SO₂ (хүчиллэг KMnO₄).'],
    [4, 'Describe the use of a flame test to identify the cations: lithium (Li⁺), sodium (Na⁺), potassium (K⁺), calcium (Ca²⁺), barium (Ba²⁺), copper(II) (Cu²⁺).', 'Дөлний туршилтаар катионыг таних: литий (Li⁺), натри (Na⁺), калий (K⁺), кальци (Ca²⁺), барий (Ba²⁺), зэс(II) (Cu²⁺).']
  ]
};
