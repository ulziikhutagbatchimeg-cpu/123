import { buildTopic, TopicSpec } from './syllabusBuilders';

// 0620 subject content: section 11 (organic chemistry) and sections 12.1, 12.2, 12.4 (experimental techniques)
const SPECS: TopicSpec[] = [
  {
    id: 's-11-1', chapter: 'ch-organic', ref: '11.1', en: 'Formulae, functional groups and terminology', mn: 'Томьёо, функциональ бүлэг, нэр томьёо',
    sumEn: 'Organic compounds are grouped into homologous series that share a functional group and a general formula: alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ, alcohols CₙH₂ₙ₊₁OH, carboxylic acids CₙH₂ₙ₊₁COOH. Structural isomers have the same molecular formula but different structures.',
    sumMn: 'Органик нэгдлийг нэг функциональ бүлэг, нэг ерөнхий томьёотой гомолог цуваанд бүлэглэнэ: алкан CₙH₂ₙ₊₂, алкен CₙH₂ₙ, спирт CₙH₂ₙ₊₁OH, карбоксилын хүчил CₙH₂ₙ₊₁COOH. Бүтцийн изомер нь молекул томьёо ижил, бүтэц өөр.',
    obj: [
      ['11.1.1', 'Draw and interpret displayed formulae showing all atoms and bonds.', 'Бүх атом, холбоог харуулсан дэлгэцийн томьёог зурж, тайлбарлах.'],
      ['11.1.2', 'Write and interpret the general formulae of alkanes, alkenes, alcohols and carboxylic acids.', 'Алкан, алкен, спирт, карбоксилын хүчлийн ерөнхий томьёог бичиж, тайлбарлах.'],
      ['11.1.3', 'Identify a functional group as the atom or group that gives a homologous series its chemistry.', 'Функциональ бүлгийг гомолог цувралын химийн шинж чанарыг тодорхойлдог атом эсвэл бүлэг гэж таних.'],
      ['11.1.4', 'Define structural isomers and give examples such as C₄H₁₀ and C₄H₈.', 'Бүтцийн изомерыг тодорхойлж, C₄H₁₀, C₄H₈ гэх мэт жишээ өгөх.'],
      ['11.1.5', 'Define saturated and unsaturated compounds.', 'Ханасан ба ханаагүй нэгдлийг тодорхойлох.']
    ],
    vocab: [
      ['homologous series', 'гомолог цуваа', 'A family of compounds with the same functional group and general formula.', 'Нэг функциональ бүлэг, нэг ерөнхий томьёотой нэгдлийн бүлэг.'],
      ['functional group', 'функциональ бүлэг', 'The atom or group of atoms that determines the chemistry of a compound.', 'Нэгдлийн химийн шинж чанарыг тодорхойлдог атом эсвэл атомын бүлэг.'],
      ['structural isomer', 'бүтцийн изомер', 'Compounds with the same molecular formula but different structural formulae.', 'Молекул томьёо ижил, бүтцийн томьёо өөр нэгдэл.'],
      ['saturated', 'ханасан', 'Containing only single carbon–carbon bonds.', 'Зөвхөн нүүрстөрөгч–нүүрстөрөгчийн ганц холбоотой.']
    ],
    sec: [
      ['General formulae', 'Ерөнхий томьёо', 'Alkanes: CₙH₂ₙ₊₂ (methane CH₄, ethane C₂H₆). Alkenes: CₙH₂ₙ (ethene C₂H₄). Alcohols: CₙH₂ₙ₊₁OH (ethanol C₂H₅OH). Carboxylic acids: CₙH₂ₙ₊₁COOH (ethanoic acid CH₃COOH). Each member differs from the next by a –CH₂– unit.', 'Алкан: CₙH₂ₙ₊₂ (метан CH₄, этан C₂H₆). Алкен: CₙH₂ₙ (этен C₂H₄). Спирт: CₙH₂ₙ₊₁OH (этанол C₂H₅OH). Карбоксилын хүчил: CₙH₂ₙ₊₁COOH (цууны хүчил CH₃COOH). Гишүүн бүр дараагийнхаасаа –CH₂– нэгжээр ялгаатай.'],
      ['Structural isomers', 'Бүтцийн изомер', 'C₄H₁₀ has two structural isomers: CH₃CH₂CH₂CH₃ (butane) and CH₃CH(CH₃)CH₃ (methylpropane). Both have the formula C₄H₁₀, but their atoms are arranged differently.', 'C₄H₁₀-д хоёр бүтцийн изомер байна: CH₃CH₂CH₂CH₃ (бутан) ба CH₃CH(CH₃)CH₃ (метилпропан). Хоёулаа C₄H₁₀ боловч атомуудын байрлал өөр.']
    ]
  },
  {
    id: 's-11-2', chapter: 'ch-organic', ref: '11.2', en: 'Naming organic compounds', mn: 'Органик нэгдлийн нэршил',
    sumEn: 'Names follow the carbon-chain length (meth-, eth-, prop-, but-) and a suffix showing the group: -ane (alkane), -ene (alkene), -ol (alcohol), -oic acid (carboxylic acid). Esters are named after the alcohol and the acid.',
    sumMn: 'Нэр нь нүүрстөрөгчийн гинжийн урт (meth-, eth-, prop-, but-) ба бүлгийг заасан дагавар (-ane алкан, -ene алкен, -ol спирт, -oic acid хүчил) дээр суурилна. Эфирийг спирт ба хүчлээр нь нэрлэнэ.',
    obj: [
      ['11.2.1', 'Name and draw the displayed formulae of methane, ethane, ethene, ethanol, ethanoic acid and the products in the reactions of this chapter.', 'Метан, этан, этен, этанол, цууны хүчил ба энэ бүлгийн урвалын бүтээгдэхүүний нэр, дэлгэцийн томьёог бичих.'],
      ['11.2.2', 'State the type of compound from its name or molecular formula.', 'Нэр эсвэл молекул томьёогоор нэгдлийн төрлийг хэлэх.'],
      ['11.2.3', 'Name and draw unbranched alkanes, alkenes, alcohols and carboxylic acids of up to four carbon atoms.', 'Дөрвөн нүүрстөрөгч хүртэлх салбаргүй алкан, алкен, спирт, карбоксилын хүчлийг нэрлэж зурах.'],
      ['11.2.4', 'Name and draw the esters that can be made from unbranched alcohols and acids of up to four carbon atoms.', 'Дөрвөн нүүрстөрөгч хүртэлх салбаргүй спирт ба хүчлээс үүсэх эфирийг нэрлэж зурах.']
    ],
    vocab: [
      ['prefix', 'угтвар', 'The part of a name that gives the number of carbon atoms, e.g. meth-, eth-.', 'Нүүрстөрөгчийн тоог заах нэрний эхний хэсэг, жишээ нь meth-, eth-.'],
      ['suffix', 'дагавар', 'The part of a name that gives the functional group, e.g. -ol, -ene.', 'Функциональ бүлгийг заах нэрний сүүлийн хэсэг, жишээ нь -ol, -ene.'],
      ['ester', 'эфир', 'A compound formed from an alcohol and a carboxylic acid.', 'Спирт ба карбоксилын хүчлээс үүсэх нэгдэл.']
    ],
    sec: [
      ['Reading a name', 'Нэр уншихад', 'Ethene has two carbons (eth-) and a double bond (-ene), so it is an alkene. Ethanol has two carbons and -ol, so it is an alcohol. Ethanoic acid has two carbons and -oic acid, so it is a carboxylic acid.', 'Этен хоёр нүүрстөрөгч (eth-) ба давхар холбоо (-ene)-тэй тул алкен. Этанол хоёр нүүрстөрөгч, -ol-тай тул спирт. Цууны хүчил хоёр нүүрстөрөгч, -oic acid-тай тул карбоксилын хүчил.'],
      ['Esters', 'Эфир', 'Ethanol with ethanoic acid gives ethyl ethanoate: the alcohol name gives the "ethyl" part and the acid name gives "ethanoate".', 'Этанол ба цууны хүчлээс этил этаноат үүснэ: спиртийн нэр "этил", хүчлийн нэр "этаноат" хэсгийг өгнө.']
    ]
  },
  {
    id: 's-11-3', chapter: 'ch-organic', ref: '11.3', en: 'Fuels', mn: 'Түлш',
    sumEn: 'Coal, natural gas and petroleum are fossil fuels made mostly of hydrocarbons. Fractional distillation separates petroleum into fractions. Lower fractions have longer chains, higher boiling points and higher viscosity; upper fractions are more volatile.',
    sumMn: 'Нүүрс, байгалийн хий, нефть бол ихэвчлэн устөрөгч-нүүрстөрөгчөөс бүрдсэн чулуужсан түлш. Фракцлах нэрэлтээр нефтийг фракц болгон салгана. Доод фракц урт гинжтэй, буцлах цэг өндөр, зуурамтгай; дээд фракц илүү дэгдэмхий.',
    obj: [
      ['11.3.1', 'Name the fossil fuels coal, natural gas and petroleum, and name methane as the main constituent of natural gas.', 'Чулуужсан түлш: нүүрс, байгалийн хий, нефтийг нэрлэх; байгалийн хийн гол бүрэлдэхүүн нь метан.'],
      ['11.3.2', 'Describe the separation of petroleum by fractional distillation and how the fractions change from bottom to top of the column.', 'Нефтийг фракцлах нэрэлтээр салгах ба багананы доодоос дээш фракцын өөрчлөлтийг тодорхойлох.'],
      ['11.3.3', 'Name the uses of the main fractions: refinery gas, petrol, naphtha, kerosene, diesel, fuel oil, lubricating oil and bitumen.', 'Гол фракцын хэрэглээг нэрлэх: түлшний хий, бензин, нафта, керосин, дизель, түлшний тос, тослогч тос, битум.']
    ],
    vocab: [
      ['hydrocarbon', 'нүүрсустөрөгч', 'A compound containing hydrogen and carbon only.', 'Зөвхөн устөрөгч ба нүүрстөрөгч агуулсан нэгдэл.'],
      ['fraction', 'фракц', 'A group of hydrocarbons with similar boiling points, collected during distillation.', 'Нэрэлтийн үед ижил буцлах цэгтэй нүүрсустөрөгчийн бүлэг.'],
      ['volatility', 'дэгдэмхий байдал', 'How easily a liquid evaporates.', 'Шингэн хэр хурдан ууршдаг байдал.']
    ],
    sec: [
      ['Fractional distillation', 'Фракцлах нэрэлт', 'Crude oil is heated until it vaporises and enters a column that is hot at the bottom and cool at the top. Each fraction condenses at its own temperature. Long-chain hydrocarbons condense low down; short-chain ones rise to the top.', 'Түүхий нефтийг ууртал халааж, доод нь халуун, дээд нь хүйтэн багана руу оруулна. Фракц бүр өөрийн температурт конденсаци болно. Урт гинжтэй нь доод талд, богино гинжтэй нь дээш гарна.'],
      ['Trends in the column', 'Багананы чиг хандлага', 'Going up the column the chain length decreases, the boiling point falls, volatility increases and viscosity decreases. Refinery gas and petrol are at the top; bitumen is at the bottom.', 'Багананы дээш явахад гинжийн урт буурч, буцлах цэг буурч, дэгдэмхий байдал нэмэгдэж, зуурамтгай байдал буурна. Түлшний хий, бензин дээр, битум доор.']
    ]
  },
  {
    id: 's-11-4', chapter: 'ch-organic', ref: '11.4', en: 'Alkanes', mn: 'Алкан',
    sumEn: 'Alkanes are saturated hydrocarbons with single C–C bonds and are generally unreactive. They burn in air and undergo substitution with chlorine in ultraviolet light.',
    sumMn: 'Алкан нь C–C ганц холбоотой ханасан устөрөгч-нүүрстөрөгч, ерөнхийдөө урвалд орохгүй. Агаарт шатна, хэт ягаан гэрэлд хлоротой орлуулалтын урвалд орно.',
    obj: [
      ['11.4.1', 'State that the bonding in alkanes is single covalent and that alkanes are saturated hydrocarbons with generally unreactive properties.', 'Алканы холбоо ганц ковалент, алкан ханасан, ерөнхийдөө урвалд ордоггүйг хэлэх.'],
      ['11.4.2', 'Describe the substitution reaction of alkanes with chlorine in ultraviolet light and draw the monosubstitution products.', 'Алканы хлоротой орлуулалтын урвалыг хэт ягаан гэрэлд тодорхойлж, моно орлуулалтын бүтээгдэхүүнийг зурах.']
    ],
    vocab: [
      ['substitution', 'орлуулалт', 'A reaction in which one atom or group is replaced by another.', 'Нэг атом эсвэл бүлгийг өөр атом эсвэл бүлгээр солих урвал.'],
      ['ultraviolet light', 'хэт ягаан гэрэл', 'Light that provides the activation energy for alkane substitution.', 'Алканы орлуулалтын идэвхжлийн энергийг өгдөг гэрэл.']
    ],
    sec: [
      ['Substitution with chlorine', 'Хлоротой орлуулалт', 'In ultraviolet light, methane reacts with chlorine: CH₄ + Cl₂ → CH₃Cl + HCl. One hydrogen atom is replaced by chlorine. The light supplies the activation energy to split the chlorine molecule.', 'Хэт ягаан гэрэлд метан хлортой урвалд орно: CH₄ + Cl₂ → CH₃Cl + HCl. Нэг устөрөгчийн атомыг хлор орлуулна. Гэрэл хлорын молекулыг задлах идэвхжлийн энергийг өгнө.']
    ]
  },
  {
    id: 's-11-5', chapter: 'ch-organic', ref: '11.5', en: 'Alkenes', mn: 'Алкен',
    sumEn: 'Alkenes contain a C=C double bond, so they are unsaturated and undergo addition reactions. Cracking breaks long alkanes into shorter alkanes and alkenes. Aqueous bromine turns colourless when it reacts with an alkene.',
    sumMn: 'Алкен нь C=C давхар холбоотой тул ханаагүй, нэмэлтийн урвалд ордог. Крекинг нь урт алканыг богино алкан, алкен болгоно. Усан бромын өнгө алкентэй урвалд орохоор өнгөгүй болно.',
    obj: [
      ['11.5.1', 'State that alkenes contain a C=C double bond and are unsaturated hydrocarbons.', 'Алкен C=C давхар холбоотой, ханаагүй устөрөгч-нүүрстөрөгч гэж хэлэх.'],
      ['11.5.2', 'Describe the manufacture of alkenes and hydrogen by cracking, and the reasons cracking is needed.', 'Крекингээр алкен, устөрөгч үйлдвэрлэх, яагаад крекинг шаардлагатайг тодорхойлох.'],
      ['11.5.3', 'Describe the test with aqueous bromine to distinguish saturated and unsaturated hydrocarbons.', 'Ханасан ба ханаагүй нүүрсустөрөгчийг ялгах усан бромын туршилтыг тодорхойлох.'],
      ['11.5.4', 'Describe addition reactions of alkenes with bromine, hydrogen (nickel catalyst) and steam (acid catalyst), with products.', 'Алкенийн бром, устөрөгч (никель катализатор), уур (хүчил катализатор)-тэй нэмэлтийн урвалыг бүтээгдэхүүнтэй нь тодорхойлох.']
    ],
    vocab: [
      ['addition reaction', 'нэмэлтийн урвал', 'A reaction in which two substances join to form one product.', 'Хоёр бодис нийлж нэг бүтээгдэхүүн үүсгэдэг урвал.'],
      ['cracking', 'крекинг', 'Breaking long-chain alkanes into shorter, more useful molecules using heat and a catalyst.', 'Дулаан ба катализатороор урт гинжтэй алканыг богино, хэрэгтэй молекул болгон задлах.'],
      ['unsaturated', 'ханаагүй', 'Containing at least one carbon–carbon double or triple bond.', 'Дор хаяж нэг нүүрстөрөгч–нүүрстөрөгчийн давхар холбоотой.']
    ],
    sec: [
      ['Cracking', 'Крекинг', 'A long alkane such as decane is heated at high temperature over a catalyst, giving a shorter alkane and an alkene such as ethene. Cracking is needed because there is more demand for short-chain fuels and alkenes than the petroleum fractions supply.', 'Декан гэх мэт урт алканыг өндөр температурт катализатороор халааж, богино алкан ба этен гэх мэт алкен өгнө. Богино гинжтэй түлш, алкенд эрэлт нефтийн фракцын нийлүүлэлтээс их тул крекинг шаардлагатай.'],
      ['Bromine test', 'Бромын туршилт', 'Aqueous bromine is orange. An alkene decolourises it: ethene + Br₂ → 1,2-dibromoethane, which is colourless. A saturated alkane does not react, so the bromine stays orange.', 'Усан бром улбар шар. Алкен түүнийг өнгөгүй болгоно: этен + Br₂ → 1,2-дибромоэтан, энэ нь өнгөгүй. Ханасан алкан урвалд орохгүй тул бром улбар шар хэвээр.']
    ]
  },
  {
    id: 's-11-6', chapter: 'ch-organic', ref: '11.6', en: 'Alcohols', mn: 'Спирт',
    sumEn: 'Ethanol is made by fermentation of glucose (25–35 °C, yeast, no oxygen) or by steam addition to ethene (300 °C, 60 atm, acid catalyst). It burns, and is used as a solvent and a fuel.',
    sumMn: 'Этанолыг глюкозыг исгэх (25–35 °C, мөөгөнцөр, хүчилтөрөгчгүй) эсвэл этенд уур нэмэх (300 °C, 60 atm, хүчил катализатор) замаар гаргана. Шатна; уусгагч ба түлшинд хэрэглэнэ.',
    obj: [
      ['11.6.1', 'Describe the manufacture of ethanol by fermentation of glucose and by catalytic addition of steam to ethene.', 'Глюкозыг исгэх ба этенд катализатороор уур нэмэх замаар этанол үйлдвэрлэхийг тодорхойлох.'],
      ['11.6.2', 'Describe the combustion of ethanol and state its uses as a solvent and a fuel.', 'Этанолын шаталтыг тодорхойлж, уусгагч ба түлшний хэрэглээг хэлэх.'],
      ['11.6.3', 'Describe the advantages and disadvantages of each method of making ethanol.', 'Этанол үйлдвэрлэх хоёр аргын давуу ба сул талыг тодорхойлох.']
    ],
    vocab: [
      ['fermentation', 'исгэлт', 'Converting glucose into ethanol and carbon dioxide using yeast without oxygen.', 'Мөөгөнцрөөр, хүчилтөрөгчгүйгээр глюкозыг этанол, нүүрсхүчлийн хий болгох.'],
      ['solvent', 'уусгагч', 'A liquid that dissolves a solute.', 'Уусмалыг уусгадаг шингэн.']
    ],
    sec: [
      ['Two manufacturing methods', 'Хоёр үйлдвэрлэлийн арга', 'Fermentation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂, using yeast at 25–35 °C with no oxygen. Hydration: C₂H₄ + H₂O → C₂H₅OH at 300 °C and 60 atm with an acid catalyst. Fermentation uses renewable sugar but is slow; hydration is fast but uses fossil-fuel ethene.', 'Исгэлт: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂, мөөгөнцөр, 25–35 °C, хүчилтөрөгчгүй. Усжилт: C₂H₄ + H₂O → C₂H₅OH, 300 °C, 60 atm, хүчил катализатор. Исгэлт нь сэргээгдэх сахар ашигладаг боловч удаан; усжилт хурдан боловч чулуужсан түлшний этенд тулгуурладаг.']
    ]
  },
  {
    id: 's-11-7', chapter: 'ch-organic', ref: '11.7', en: 'Carboxylic acids', mn: 'Карбоксилын хүчил',
    sumEn: 'Ethanoic acid reacts with metals, bases and carbonates to form salts called ethanoates. It forms when ethanol is oxidised, and reacts with alcohols in the presence of an acid catalyst to form esters.',
    sumMn: 'Цууны хүчил металл, суурь, карбонаттай урвалд орж этаноат гэх давс үүсгэнэ. Этанол исэлдэхэд үүснэ, хүчил катализатортойгоор спиртэй урвалд орж эфир үүсгэнэ.',
    obj: [
      ['11.7.1', 'Describe the reactions of ethanoic acid with metals, bases and carbonates, including the names and formulae of the salts.', 'Цууны хүчлийн металл, суурь, карбонаттай урвал, давсны нэр ба томьёог тодорхойлох.'],
      ['11.7.2', 'Describe the formation of ethanoic acid by oxidation of ethanol with acidified potassium manganate(VII), and by bacteria in vinegar production.', 'Этанолыг хүчиллэг калийн перманганат(VII)-оор исэлдүүлэх, эсвэл цагаан цуунд бактериар исэлдүүлэх замаар цууны хүчил үүсэхийг тодорхойлох.'],
      ['11.7.3', 'Describe the reaction of a carboxylic acid with an alcohol using an acid catalyst to form an ester.', 'Карбоксилын хүчил ба спиртийн хүчил катализаторт урвалаар эфир үүсэхийг тодорхойлох.']
    ],
    vocab: [
      ['carboxylic acid', 'карбоксилын хүчил', 'An organic acid with the –COOH functional group.', '–COOH функциональ бүлэгтэй органик хүчил.'],
      ['ethanoate', 'этаноат', 'A salt of ethanoic acid, e.g. sodium ethanoate.', 'Цууны хүчлийн давс, жишээ нь натрийн этаноат.'],
      ['esterification', 'эфиржилт', 'The reaction of an acid with an alcohol to form an ester and water.', 'Хүчил ба спиртийн урвалаар эфир ба ус үүсэх урвал.']
    ],
    sec: [
      ['Reactions of ethanoic acid', 'Цууны хүчлийн урвал', 'Ethanoic acid + sodium hydroxide → sodium ethanoate + water. Ethanoic acid + sodium carbonate → sodium ethanoate + water + carbon dioxide. Ethanoic acid + magnesium → magnesium ethanoate + hydrogen.', 'Цууны хүчил + натрийн гидроксид → натрийн этаноат + ус. Цууны хүчил + натрийн карбонат → натрийн этаноат + ус + нүүрсхүчлийн хий. Цууны хүчил + магни → магнийн этаноат + устөрөгч.'],
      ['Esters', 'Эфир', 'Ethanoic acid with ethanol and an acid catalyst gives ethyl ethanoate and water: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. Esters often have a pleasant smell and are used in flavourings.', 'Цууны хүчил ба этанол хүчил катализатортойгоор этил этаноат ба ус өгнө: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. Эфир ихэвчлэн сайхан үнэртэй, амтлагчид хэрэглэгдэнэ.']
    ]
  },
  {
    id: 's-11-8', chapter: 'ch-organic', ref: '11.8', en: 'Polymers', mn: 'Полимер',
    sumEn: 'Polymers are long molecules built from many small monomers. Poly(ethene) forms by addition polymerisation. Condensation polymers (nylon, PET, proteins) lose small molecules such as water. Plastics raise problems of disposal, accumulation in the ocean and toxic gases when burned.',
    sumMn: 'Полимер нь олон жижиг мономероос бүтсэн урт молекул. Поли(этен) нэмэлтийн полимержилтээр үүснэ. Конденсацийн полимер (нейлон, PET, уураг) ус зэрэг жижиг молекул алдана. Хуванцар нь хаягдал, далайд хуримтлагдах, шатахад хортой хий ялгаруулах асуудалтай.',
    obj: [
      ['11.8.1', 'Define polymers as large molecules built from monomers, and describe the formation of poly(ethene) by addition polymerisation.', 'Полимерийг мономероос бүтсэн том молекул гэж тодорхойлж, поли(этен)-ийн нэмэлтийн полимержилтийг тодорхойлох.'],
      ['11.8.2', 'Identify repeat units and linkages in addition and condensation polymers, and deduce a repeat unit from a monomer and the reverse.', 'Нэмэлт ба конденсацийн полимерийн давтагдах нэгж, холбоосыг таних; мономероос давтагдах нэгжийг гаргах ба эсрэгээр.'],
      ['11.8.3', 'Describe the environmental challenges caused by plastics: landfill, accumulation in oceans and toxic gases from burning.', 'Хуванцарын байгаль орчны асуудлыг тодорхойлох: хогийн цэг, далай, шатахад хортой хий.'],
      ['11.8.4', 'Describe the structure of nylon, a polyamide, and PET, a polyester; state that proteins are natural polyamides made of amino acids.', 'Полиамид нейлон, полиэфир PET-ийн бүтцийг тодорхойлох; уураг нь амин хүчлээс бүтсэн байгалийн полиамид гэж хэлэх.']
    ],
    vocab: [
      ['monomer', 'мономер', 'A small molecule that joins with others to form a polymer.', 'Бусадтай холбогдож полимер үүсгэдэг жижиг молекул.'],
      ['polymer', 'полимер', 'A long molecule made from many repeating monomer units.', 'Олон давтагдах мономер нэгжээс бүтсэн урт молекул.'],
      ['addition polymerisation', 'нэмэлтийн полимержилт', 'Polymer formation from alkene monomers with no other product.', 'Алкен мономероос өөр бүтээгдэхүүнгүйгээр полимер үүсэх.'],
      ['condensation polymerisation', 'конденсацийн полимержилт', 'Polymer formation with a small molecule, such as water, eliminated.', 'Ус гэх мэт жижиг молекул алдагдаж полимер үүсэх.']
    ],
    sec: [
      ['Poly(ethene)', 'Поли(этен)', 'Many ethene monomers add together, opening each C=C double bond: n(CH₂=CH₂) → (–CH₂–CH₂–)ₙ. There is only one product, the polymer.', 'Олон этен мономер нэмэгдэж, C=C давхар холбоо нээгдэнэ: n(CH₂=CH₂) → (–CH₂–CH₂–)ₙ. Зөвхөн нэг бүтээгдэхүүн — полимер.'],
      ['Condensation polymers and proteins', 'Конденсацийн полимер ба уураг', 'Nylon is a polyamide formed from a dicarboxylic acid and a diamine, losing water. Polyesters such as PET are made from a dicarboxylic acid and a diol. Proteins are natural polyamides built from amino acids joined by peptide links.', 'Нейлон бол дикарбоксилын хүчил ба диамины полиамид, ус алдана. PET гэх мэт полиэфирийг дикарбоксилын хүчил ба диолоос үйлдвэрлэнэ. Уураг нь амин хүчлээс пептидийн холбоогоор бүтсэн байгалийн полиамид.']
    ]
  },
  {
    id: 's-12-1', chapter: 'ch-experimental-analysis', ref: '12.1', en: 'Experimental design', mn: 'Туршилтын зохион байгуулалт',
    sumEn: 'Choose apparatus that measures time, temperature, mass and volume accurately: stopwatch, thermometer, balance, burette, volumetric pipette, measuring cylinder and gas syringe. Consider the advantages and disadvantages of each method.',
    sumMn: 'Хугацаа, температур, масс, эзлэхүүнийг нарийн хэмжих багажийг сонгоно: секундомер, термометр, жин, бюретка, эзлэхүүний пипетка, хэмжих цилиндр, хийн шприц. Арга бүрийн давуу ба сул талыг харгалзана.',
    obj: [
      ['12.1.1', 'Name the appropriate apparatus for measuring time, temperature, mass and volume.', 'Хугацаа, температур, масс, эзлэхүүнийг хэмжих тохиромжтой багажийг нэрлэх.'],
      ['12.1.2', 'Suggest advantages and disadvantages of experimental methods and apparatus.', 'Туршилтын арга ба багажийн давуу ба сул талыг санал болгох.'],
      ['12.1.3', 'Define solvent, solute, solution, saturated solution, residue and filtrate.', 'Уусгагч, уусмал, уусмал (solution), ханасан уусмал, үлдэгдэл, шүүгдэл гэдгийг тодорхойлох.']
    ],
    vocab: [
      ['solvent', 'уусгагч', 'A substance that dissolves a solute.', 'Уусгагдах бодисыг уусгадаг бодис.'],
      ['solute', 'уусгагдах бодис', 'A substance that is dissolved in a solvent.', 'Уусгагчид уусдаг бодис.'],
      ['saturated solution', 'ханасан уусмал', 'A solution containing the maximum amount of solute at a given temperature.', 'Тодорхой температурт хамгийн их хэмжээний уусгагдах бодис агуулсан уусмал.'],
      ['residue', 'үлдэгдэл', 'A substance that remains after filtration, evaporation or distillation.', 'Шүүлт, ууршуулалт, нэрэлтийн дараа үлдэх бодис.']
    ],
    sec: [
      ['Choosing apparatus', 'Багаж сонгох', 'A burette measures a variable volume to 0.05 cm³, while a measuring cylinder is only accurate to about 1 cm³. A volumetric pipette delivers one fixed volume very accurately, so it is used to measure a sample for a titration. A gas syringe measures the volume of gas produced.', 'Бюретка 0.05 см³ хүртэл хувьсах эзлэхүүн хэмжинэ, харин хэмжих цилиндр ойролцоогоор 1 см³ хүртэл нарийвчилалтай. Эзлэхүүний пипетка нэг тогтмол эзлэхүүнийг маш нарийн хэмжих тул титрлэлтэд дээж хэмжихэд хэрэглэнэ. Хийн шприц үүссэн хийн эзлэхүүнийг хэмжинэ.']
    ]
  },
  {
    id: 's-12-2', chapter: 'ch-experimental-analysis', ref: '12.2', en: 'Acid–base titrations', mn: 'Хүчил–суурийн титрлэл',
    sumEn: 'In a titration a burette delivers one solution into a measured volume of another in a flask, with an indicator. The end-point is the colour change. Repeat until concordant titres (within 0.10 cm³) are found.',
    sumMn: 'Титрлэлтэд бюреткаас нэг уусмалыг колбонд байгаа хэмжсэн эзлэхүүн рүү индикатор хамт дусаана. Төгсгөлийн цэг нь өнгөний өөрчлөлт. Зөвшилцөх (concordant) титр (0.10 см³-ийн дотор) олдтол давтана.',
    obj: [
      ['12.2.1', 'Describe an acid–base titration, including the use of a burette, a volumetric pipette and a suitable indicator.', 'Хүчил–суурийн титрлэлтийг тодорхойлох: бюретка, эзлэхүүний пипетка, тохиромжтой индикаторын хэрэглээ.'],
      ['12.2.2', 'Describe how to identify the end-point of a titration using an indicator.', 'Индикатороор титрлэлтийн төгсгөлийн цэгийг тодорхойлох.']
    ],
    vocab: [
      ['titration', 'титрлэлт', 'A method for finding the exact volume of one solution that reacts with another.', 'Нэг уусмал өөр уусмалтай яг хэр эзлэхүүнээр урвалд орохыг олох арга.'],
      ['end-point', 'төгсгөлийн цэг', 'The point at which the indicator changes colour, showing the reaction is complete.', 'Урвал дууссаныг индикатор өнгө өөрчилж харуулах цэг.'],
      ['concordant titres', 'зөрүүгүй титр', 'Titre values that agree within 0.10 cm³ of each other.', 'Бие хоорондоо 0.10 см³-ийн дотор таарах титрийн утгууд.']
    ],
    sec: [
      ['Method', 'Арга', 'Rinse the burette with the titrant and the pipette with the solution it will measure. Add the indicator to the flask, run the titrant in slowly near the end-point, and stop at the first permanent colour change. Record the volume and repeat until two titres agree.', 'Бюреткийг титранттай, пипеткийг хэмжих уусмалтай зайлна. Колбонд индикатор нэмж, төгсгөлийн цэгийн ойролцоо титрантыг аажмаар дусаана, анхны тогтвортой өнгө өөрчлөлт гарах үед зогсооно. Эзлэхүүнийг бичиж, хоёр титр таарах хүртэл давтана.']
    ]
  },
  {
    id: 's-12-4', chapter: 'ch-experimental-analysis', ref: '12.4', en: 'Separation and purification', mn: 'Салгах ба цэвэршүүлэх',
    sumEn: 'Mixtures are separated by filtration (insoluble solid from liquid), crystallisation (soluble solid from solution), simple distillation (solvent from solution) and fractional distillation (liquids with close boiling points). Melting and boiling points show purity.',
    sumMn: 'Холимгийг шүүлт (уусдаггүй хатууг шингэнээс), талстжуулалт (уусдаг хатууг уусмалаас), энгийн нэрэлт (уусгагчийг уусмалаас), фракцлах нэрэлт (буцлах цэг ойр шингэнүүдийг) аргаар салгана. Хайлах, буцлах цэг нь цэвэр байдлыг харуулна.',
    obj: [
      ['12.4.1', 'Describe and explain separation and purification by a suitable solvent, filtration, crystallisation, simple distillation and fractional distillation.', 'Тохиромжтой уусгагч, шүүлт, талстжуулалт, энгийн нэрэлт, фракцлах нэрэлтээр салгах ба цэвэршүүлэхийг тодорхойлж, тайлбарлах.'],
      ['12.4.2', 'Suggest suitable separation and purification techniques given information about the substances.', 'Бодисын мэдээллээс тохиромжтой салгах, цэвэршүүлэх аргыг санал болгох.'],
      ['12.4.3', 'Identify substances and assess their purity using melting point and boiling point information.', 'Бодисыг таньж, хайлах ба буцлах цэгийн мэдээллээр цэвэр байдлыг үнэлэх.']
    ],
    vocab: [
      ['filtration', 'шүүлт', 'Separating an insoluble solid from a liquid using filter paper.', 'Шүүлтүүр цаасаар уусдаггүй хатууг шингэнээс салгах.'],
      ['crystallisation', 'талстжуулалт', 'Obtaining a soluble solid by evaporating and cooling a saturated solution.', 'Ханасан уусмалыг ууршуулж, хөргөж уусдаг хатуу гаргах.'],
      ['fractional distillation', 'фракцлах нэрэлт', 'Separating liquids with close boiling points using a fractionating column.', 'Фракцлах багана ашиглан буцлах цэг ойр шингэнийг салгах.']
    ],
    sec: [
      ['Choosing the method', 'Аргыг сонгох', 'Sand from water: filtration. Salt from salt solution: crystallisation or evaporation. Pure water from salty water: simple distillation. Two liquids with boiling points 60 °C and 110 °C: fractional distillation. Coloured dyes separated by solubility: chromatography.', 'Элс ус даас: шүүлт. Давс уусмалаас давс: талстжуулалт эсвэл ууршуулалт. Давстай уснаас цэвэр ус: энгийн нэрэлт. Буцлах цэг 60 °C ба 110 °C-тай хоёр шингэн: фракцлах нэрэлт. Өнгөт будгийг уусах чадвараар: хроматографи.'],
      ['Checking purity', 'Цэвэр байдлыг шалгах', 'A pure substance has a sharp melting point and boiling point. An impure substance melts and boils over a range of temperatures, so comparing the measured values with the data tells you whether it is pure.', 'Цэвэр бодис хурц хайлах ба буцлах цэгтэй. Хольцтой бодис температурын хүрээнд хайлж, буцална; хэмжсэн утгыг өгөгдөлтэй харьцуулбал цэвэр эсэхийг мэднэ.']
    ]
  }
];

export const TOPICS_D = SPECS.map(buildTopic);
