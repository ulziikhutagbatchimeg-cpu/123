import type { ALevelSubsection } from './alevelSubsectionTypes';

// 9701 (2025–2027) subject content, sections 9–22 (AS). Every learning outcome, English and Mongolian.
export const ALEVEL_SECTIONS_9_22: ALevelSubsection[] = [
  {
    ref: '9.1',
    en: 'Periodicity of physical properties of the elements in Period 3',
    mn: '3-р үеийн элементүүдийн физик шинж чанарын үелэлт',
    obj: [
      [1, 'Describe qualitatively (and indicate the periodicity in) the variations in atomic radius, ionic radius, melting point and electrical conductivity of the elements.', 'Элементүүдийн атомын радиус, ионы радиус, хайлах цэг, цахилгаан дамжуулалтын өөрчлөлтийг чанарын хувьд тодорхойлж, үелэлтийг заах.'],
      [2, 'Explain the variation in melting point and electrical conductivity in terms of the structure and bonding of the elements.', 'Хайлах цэг ба цахилгаан дамжуулалтын өөрчлөлтийг элементийн бүтэц ба холбооны хүрээнд тайлбарлах.']
    ]
  },
  {
    ref: '9.2',
    en: 'Periodicity of chemical properties of the elements in Period 3',
    mn: '3-р үеийн элементүүдийн химийн шинж чанарын үелэлт',
    obj: [
      [1, 'Describe, and write equations for, the reactions of the elements with oxygen (to give Na₂O, MgO, Al₂O₃, P₄O₁₀, SO₂), chlorine (to give NaCl, MgCl₂, AlCl₃, SiCl₄, PCl₅) and water (Na and Mg only).', 'Элементүүдийн хүчилтөрөгчтэй (Na₂O, MgO, Al₂O₃, P₄O₁₀, SO₂ үүсгэнэ), хлортой (NaCl, MgCl₂, AlCl₃, SiCl₄, PCl₅ үүсгэнэ) ба устай (зөвхөн Na ба Mg) урвалыг тодорхойлж, тэгшитгэл бичих.'],
      [2, 'State and explain the variation in the oxidation number of the oxides (Na₂O, MgO, Al₂O₃, P₄O₁₀, SO₂ and SO₃ only) and chlorides (NaCl, MgCl₂, AlCl₃, SiCl₄, PCl₅ only) in terms of their outer shell (valence shell) electrons.', 'Исэл (Na₂O, MgO, Al₂O₃, P₄O₁₀, SO₂, SO₃) ба хлорид (NaCl, MgCl₂, AlCl₃, SiCl₄, PCl₅) дахь исэлдэлтийн зэргийн өөрчлөлтийг гаднах бүрхүүлийн (валентын бүрхүүлийн) электроноор хэлж, тайлбарлах.'],
      [3, 'Describe, and write equations for, the reactions, if any, of the oxides Na₂O, MgO, Al₂O₃, SiO₂, P₄O₁₀, SO₂ and SO₃ with water, including the likely pH of the solutions obtained.', 'Na₂O, MgO, Al₂O₃, SiO₂, P₄O₁₀, SO₂, SO₃ исэлийн устай урвалыг (байвал) тодорхойлж, тэгшитгэл бичих; үүсэх уусмалын магадлалтай pH-ийг заах.'],
      [4, 'Describe, explain, and write equations for, the acid/base behaviour of the oxides Na₂O, MgO, Al₂O₃, P₄O₁₀, SO₂ and SO₃ and the hydroxides NaOH, Mg(OH)₂ and Al(OH)₃, including, where relevant, amphoteric behaviour in reactions with acids and bases (sodium hydroxide only).', 'Na₂O, MgO, Al₂O₃, P₄O₁₀, SO₂, SO₃ исэл ба NaOH, Mg(OH)₂, Al(OH)₃ гидроксидын хүчил/суурь зан төлөвийг тодорхойлж, тайлбарлаж, тэгшитгэл бичих; хамаатай бол амфотер зан төлөвийг хүчил ба суурьтай урвалд (зөвхөн натрийн гидроксидтой) оруулах.'],
      [5, 'Describe, explain, and write equations for, the reactions of the chlorides NaCl, MgCl₂, AlCl₃, SiCl₄ and PCl₅ with water, including the likely pH of the solutions obtained.', 'NaCl, MgCl₂, AlCl₃, SiCl₄, PCl₅ хлоридын устай урвалыг тодорхойлж, тайлбарлаж, тэгшитгэл бичих; үүсэх уусмалын магадлалтай pH-ийг заах.'],
      [6, 'Explain the variations and trends in 9.2.2, 9.2.3, 9.2.4 and 9.2.5 in terms of bonding and electronegativity.', 'Холбоо ба цахилгаан сөрөг чанараар 9.2.2, 9.2.3, 9.2.4, 9.2.5-ын өөрчлөлт ба чиг хандлагыг тайлбарлах.'],
      [7, 'Suggest the types of chemical bonding present in the chlorides and oxides from observations of their chemical and physical properties.', 'Исэл ба хлоридын химийн ба физик шинж чанарын ажиглалтаас тэдгээрт байгаа химийн холбооны төрлийг санал болгох.']
    ]
  },
  {
    ref: '9.3',
    en: 'Chemical periodicity of other elements',
    mn: 'Бусад элементүүдийн химийн үелэлт',
    obj: [
      [1, 'Predict the characteristic properties of an element in a given group by using knowledge of chemical periodicity.', 'Химийн үелэлтийн мэдлэгээр өгөгдсөн бүлгийн элементийн онцлог шинж чанарыг урьдчилан таамаглах.'],
      [2, 'Deduce the nature, possible position in the Periodic Table and identity of unknown elements from given information about physical and chemical properties.', 'Физик ба химийн шинж чанарын мэдээллээс тодорхой бус элементийн мөн чанар, үелэх системд эзлэх боломжит байрлал ба мөн чанарыг тодорхойлох.']
    ]
  },
  {
    ref: '10.1',
    en: 'Similarities and trends in the properties of the Group 2 metals, magnesium to barium, and their compounds',
    mn: 'II бүлгийн металлууд (магни–барий) ба тэдгээрийн нэгдлийн шинж чанарын ижил тал ба чиг хандлага',
    obj: [
      [1, 'Describe, and write equations for, the reactions of the elements with oxygen, water and dilute hydrochloric and sulfuric acids.', 'Элементүүдийн хүчилтөрөгч, ус, шингэрүүлсэн давсны ба хүхрийн хүчилтэй урвалыг тодорхойлж, тэгшитгэл бичих.'],
      [2, 'Describe, and write equations for, the reactions of the oxides, hydroxides and carbonates with water and dilute hydrochloric and sulfuric acids.', 'Исэл, гидроксид, карбонатын ус ба шингэрүүлсэн давсны ба хүхрийн хүчилтэй урвалыг тодорхойлж, тэгшитгэл бичих.'],
      [3, 'Describe, and write equations for, the thermal decomposition of the nitrates and carbonates, to include the trend in thermal stabilities.', 'Нитрат ба карбонатын дулааны задралыг тодорхойлж, тэгшитгэл бичих; дулааны тогтвортой байдлын чиг хандлагыг оруулах.'],
      [4, 'Describe, and make predictions from, the trends in physical and chemical properties of the elements involved in the reactions in 10.1.1 and the compounds involved in 10.1.2, 10.1.3 and 10.1.5.', '10.1.1-д оролцсон элементүүд ба 10.1.2, 10.1.3, 10.1.5-д оролцсон нэгдлүүдийн физик ба химийн шинж чанарын чиг хандлагыг тодорхойлж, таамаглал гаргах.'],
      [5, 'State the variation in the solubilities of the hydroxides and sulfates.', 'Гидроксид ба сульфатын уусах чанарын өөрчлөлтийг хэлэх.']
    ]
  },
  {
    ref: '11.1',
    en: 'Physical properties of the Group 17 elements',
    mn: 'VII бүлгийн (галоген) элементүүдийн физик шинж чанар',
    obj: [
      [1, 'Describe the colours and the trend in volatility of chlorine, bromine and iodine.', 'Хлор, бром, иодын өнгө ба дэгдэмхий чанарын чиг хандлагыг тодорхойлох.'],
      [2, 'Describe and explain the trend in the bond strength of the halogen molecules.', 'Галогений молекулын холбооны бат бэхийн чиг хандлагыг тодорхойлж, тайлбарлах.'],
      [3, 'Interpret the volatility of the elements in terms of instantaneous dipole–induced dipole forces.', 'Элементүүдийн дэгдэмхий чанарыг агшин зуурын диполь–индукцийн диполь хүчээр тайлбарлах.']
    ]
  },
  {
    ref: '11.2',
    en: 'The chemical properties of the halogen elements and the hydrogen halides',
    mn: 'Галоген элементүүд ба устөрөгчийн галогенидын химийн шинж чанар',
    obj: [
      [1, 'Describe the relative reactivity of the elements as oxidising agents.', 'Элементүүдийн исэлдүүлэгч болох харьцангуй идэвхийг тодорхойлох.'],
      [2, 'Describe the reactions of the elements with hydrogen and explain their relative reactivity in these reactions.', 'Элементүүдийн устөрөгчтэй урвалыг тодорхойлж, эдгээр урвалын харьцангуй идэвхийг тайлбарлах.'],
      [3, 'Describe the relative thermal stabilities of the hydrogen halides and explain these in terms of bond strengths.', 'Устөрөгчийн галогенидын харьцангуй дулааны тогтвортой байдлыг тодорхойлж, холбооны бат бэхээр тайлбарлах.']
    ]
  },
  {
    ref: '11.3',
    en: 'Some reactions of the halide ions',
    mn: 'Галогенидын ионуудын зарим урвал',
    obj: [
      [1, 'Describe the relative reactivity of halide ions as reducing agents.', 'Галогенидын ионуудын ангижруулагч болох харьцангуй идэвхийг тодорхойлох.'],
      [2, 'Describe and explain the reactions of halide ions with aqueous silver ions followed by aqueous ammonia (the formation and formula of the [Ag(NH₃)₂]⁺ complex is not required), and with concentrated sulfuric acid, to include balanced chemical equations.', 'Галогенидын ионуудын уусмал дахь мөнгөний ион, дараа нь аммиакийн уусмалтай урвалыг тодорхойлж, тайлбарлах ([Ag(NH₃)₂]⁺ нарийн томьёо шаардлагагүй); өтгөн хүхрийн хүчилтэй урвалыг тэнцвэржүүлсэн тэгшитгэлээр оруулах.'],
    ]
  },
  {
    ref: '11.4',
    en: 'The reactions of chlorine',
    mn: 'Хлорын урвалууд',
    obj: [
      [1, 'Describe and interpret, in terms of changes in oxidation number, the reaction of chlorine with cold and with hot aqueous sodium hydroxide, and recognise these as disproportionation reactions.', 'Хлорын хүйтэн ба халуун натрийн гидроксидын уусмалтай урвалыг исэлдэлтийн зэргийн өөрчлөлтөөр тодорхойлж, тайлбарлаж, диспропорциональ урвал гэж таних.'],
      [2, 'Explain, including by use of an equation, the use of chlorine in water purification to include the production of the active species HOCl and ClO⁻ which kill bacteria.', 'Усыг цэвэршүүлэхэд хлор ашиглахыг тэгшитгэлээр оруулан тайлбарлах: бактерийг устгадаг идэвхтэй HOCl ба ClO⁻ үүсгэх.']
    ]
  },
  {
    ref: '12.1',
    en: 'Nitrogen and sulfur',
    mn: 'Азот ба хүхэр',
    obj: [
      [1, 'Explain the lack of reactivity of nitrogen, with reference to triple bond strength and lack of polarity.', 'Азотын идэвхгүй байдлыг гурвалсан холбооны бат бэх ба туйлшралгүй байдлаар тайлбарлах.'],
      [2, 'Describe and explain the basicity of ammonia using the Brønsted–Lowry theory; the structure of the ammonium ion and its formation by an acid–base reaction; and the displacement of ammonia from ammonium salts by an acid–base reaction.', 'Аммиакийн суурийн чанарыг Брёнстед–Лоригийн онолоор тодорхойлж, тайлбарлах; аммонийн ионы бүтэц ба хүчил–суурийн урвалаар үүсэхийг; аммонийн давснаас аммиак нүүлгэгдэхийг хүчил–суурийн урвалаар тодорхойлох.'],
      [3, 'State and explain the natural and man-made occurrences of oxides of nitrogen and their catalytic removal from the exhaust gases of internal combustion engines.', 'Азотын исэлийн байгалийн ба хүний үйл ажиллагааны гарал үүслийг хэлж, тайлбарлах; дотоод шаталтат хөдөлгүүрийн утааны хийгээс катализаар зайлуулахыг хэлэх.'],
      [4, 'Understand that atmospheric oxides of nitrogen (NO and NO₂) can react with unburned hydrocarbons to form peroxyacetyl nitrate, PAN, which is a component of photochemical smog.', 'Агаар мандлын азотын исэл (NO ба NO₂) шатаагүй нүүрсустөрөгчтэй урвалд орж фотохимийн утаа-манангийн бүрдэл хэсэг болох пероксиацетил нитрат (PAN) үүсгэхийг ойлгох.'],
      [5, 'Describe the role of NO and NO₂ in the formation of acid rain, both directly and in their catalytic role in the oxidation of atmospheric sulfur dioxide.', 'Хүчиллэг бороо үүсэхэд NO ба NO₂-ийн үүргийг шууд болон агаар мандлын SO₂-ийг исэлдүүлэх катализаторын үүргээр нь тодорхойлох.']
    ]
  },
  {
    ref: '13.1',
    en: 'Formulas, functional groups and the naming of organic compounds',
    mn: 'Томьёо, функциональ бүлэг ба органик нэгдлийн нэршил',
    obj: [
      [1, 'Define the term hydrocarbon as a compound made up of C and H atoms only.', 'Нүүрсустөрөгчийг зөвхөн C ба H атомаас бүрдсэн нэгдэл гэж тодорхойлох.'],
      [2, 'Understand that alkanes are simple hydrocarbons with no functional group.', 'Алканууд нь функциональ бүлэггүй энгийн нүүрсустөрөгч гэдгийг ойлгох.'],
      [3, 'Understand that the compounds in the table of homologous series contain a functional group which dictates their physical and chemical properties.', 'Гомолог цувааны хүснэгтийн нэгдлүүд физик ба химийн шинж чанарыг тодорхойлдог функциональ бүлэгтэй гэдгийг ойлгох.'],
      [4, 'Interpret and use the general, structural, displayed and skeletal formulas of the classes of compound stated in the table of homologous series.', 'Гомолог цувааны хүснэгтэд заасан нэгдлийн ангиудын ерөнхий, бүтцийн, дэлгэрэнгүй ба араг ясны томьёог тайлбарлаж, ашиглах.'],
      [5, 'Understand and use systematic nomenclature of simple aliphatic organic molecules with the functional groups in the table, up to six carbon atoms (six plus six for esters; straight chains only for esters and nitriles).', 'Хүснэгтийн функциональ бүлэгтэй энгийн алифатик органик молекулын системтэй нэршлийг ойлгож, ашиглах (нүүрстөрөгч зургаа хүртэл; эфир ба нитрилд шулуун гинж).'],
      [6, 'Deduce the molecular and/or empirical formula of a compound, given its structural, displayed or skeletal formula.', 'Бүтэц, дэлгэрэнгүй эсвэл араг ясны томьёо өгөгдсөн үед нэгдлийн молекулын ба/эсвэл эмпирик томьёог тодорхойлох.']
    ]
  },
  {
    ref: '13.2',
    en: 'Characteristic organic reactions',
    mn: 'Органик нэгдлийн шинж чанарын урвалууд',
    obj: [
      [1, 'Interpret and use the terminology: homologous series; saturated and unsaturated; homolytic and heterolytic fission; free radical, initiation, propagation, termination; nucleophile, electrophile, nucleophilic, electrophilic; addition, substitution, elimination, hydrolysis, condensation; oxidation and reduction (in organic redox equations, [O] and [H] may be used).', 'Дараах нэр томъёог тайлбарлаж, ашиглах: гомолог цуваа; ханасан ба ханаагүй; гомолитик ба гетеролитик задрал; чөлөөт радикал, эхлэл, тархалт, төгсгөл; нуклеофил, электрофил; нэмэлт, орлуулалт, салгалт, гидролиз, конденсаци; исэлдэлт ба ангижрал ([O] ба [H]-г органик редокс тэгшитгэлд ашиглаж болно).'],
      [2, 'Understand and use the terminology of organic mechanisms: free-radical substitution, electrophilic addition, nucleophilic substitution, nucleophilic addition (curly arrows show the movement of electron pairs).', 'Органик механизмын нэр томъёог ойлгож, ашиглах: чөлөөт радикалын орлуулалт, электрофилийн нэмэлт, нуклеофилийн орлуулалт, нуклеофилийн нэмэлт (муруй сумаар электрон хосын хөдөлгөөнийг заана).']
    ]
  },
  {
    ref: '13.3',
    en: 'Shapes of organic molecules; σ and π bonds',
    mn: 'Органик молекулын хэлбэр; σ ба π холбоо',
    obj: [
      [1, 'Describe organic molecules as either straight-chained, branched or cyclic.', 'Органик молекулыг шулуун гинжтэй, салаалсан, эсвэл циклик гэж тодорхойлох.'],
      [2, 'Describe and explain the shape of, and bond angles in, molecules containing sp, sp² and sp³ hybridised atoms.', 'sp, sp² ба sp³ гибриджсэн атом агуулсан молекулын хэлбэр ба холбооны өнцгийг тодорхойлж, тайлбарлах.'],
      [3, 'Describe the arrangement of σ and π bonds in molecules containing sp, sp² and sp³ hybridised atoms.', 'sp, sp² ба sp³ гибриджсэн атом агуулсан молекулд σ ба π холбооны байрлалыг тодорхойлох.'],
      [4, 'Understand and use the term planar when describing the arrangement of atoms in organic molecules, for example ethene.', 'Органик молекулд атомын байрлалыг тодорхойлохдоо «хавтгай» гэдэг нэр томъёог ойлгож, ашиглах (жишээ нь этен).']
    ]
  },
  {
    ref: '13.4',
    en: 'Isomerism: structural isomerism and stereoisomerism',
    mn: 'Изомер: бүтцийн изомер ба стереоизомер',
    obj: [
      [1, 'Describe structural isomerism and its division into chain, positional and functional group isomerism.', 'Бүтцийн изомерыг ба түүний гинжний, байрлалын, функциональ бүлгийн изомер гэсэн хуваалтыг тодорхойлох.'],
      [2, 'Describe stereoisomerism and its division into geometrical (cis/trans) and optical isomerism (E/Z nomenclature is acceptable but not required).', 'Стереоизомерыг ба түүний геометр (cis/trans) ба оптик изомер гэсэн хуваалтыг тодорхойлох (E/Z нэршил зөвшөөрөгдөх боловч шаардлагагүй).'],
      [3, 'Describe geometrical (cis/trans) isomerism in alkenes and explain its origin in terms of restricted rotation due to the presence of π bonds.', 'Алкен дахь геометр (cis/trans) изомерийг тодорхойлж, π холбооны улмаас эргэлт хязгаарлагдсанаар үүсэхийг тайлбарлах.'],
      [4, 'Explain what is meant by a chiral centre and that such a centre gives rise to two optical isomers (enantiomers); candidates should appreciate that compounds can contain more than one chiral centre, but knowledge of meso compounds or diastereoisomers is not required.', 'Хиралийн төв гэдгийг тайлбарлаж, тийм төв нь хоёр оптик изомер (энантиомер) үүсгэхийг тайлбарлах; нэгдэл нэгээс илүү хиралийн төвтэй байж болохыг ойлгох боловч мезо нэгдэл, диастереомерийн мэдлэг шаардлагагүй.'],
      [5, 'Identify chiral centres and geometrical (cis/trans) isomerism in a molecule of given structural formula, including cyclic compounds.', 'Өгөгдсөн бүтцийн томьёотой молекулд хиралийн төв ба геометр (cis/trans) изомерийг таних (циклик нэгдлийг оруулан).'],
      [6, 'Deduce the possible isomers for an organic molecule of known molecular formula.', 'Мэдэгдэх молекулын томьёотой органик молекулын боломжит изомерүүдийг тодорхойлох.']
    ]
  },
  {
    ref: '14.1',
    en: 'Alkanes',
    mn: 'Алканууд',
    obj: [
      [1, 'Recall the reactions (reagents and conditions) by which alkanes can be produced: addition of hydrogen to an alkene in a hydrogenation reaction (H₂(g), Pt/Ni catalyst and heat); and cracking of a longer chain alkane (heat with Al₂O₃).', 'Алканыг гарган авах урвалыг (урвалж, нөхцөл) санах: алкенд устөрөгч нэмэх гидрогенжилт (H₂(g), Pt/Ni катализатор, халаалт); урт гинжтэй алканыг крекинглэх (Al₂O₃-тай халаах).'],
      [2, 'Describe the complete and incomplete combustion of alkanes, and the free-radical substitution of alkanes by Cl₂ or Br₂ in the presence of ultraviolet light, as exemplified by the reactions of ethane.', 'Алканы бүрэн ба бүрэн бус шаталтыг, мөн ультрафиолет туяаны оролцоотой Cl₂ эсвэл Br₂-оор алканы чөлөөт радикалын орлуулалтыг (этаны урвалаар) тодорхойлох.'],
      [3, 'Describe the mechanism of free-radical substitution with reference to the initiation, propagation and termination steps.', 'Чөлөөт радикалын орлуулалтын механизмыг эхлэл, тархалт, төгсгөлийн алхмаар тодорхойлох.'],
      [4, 'Suggest how cracking can be used to obtain more useful alkanes and alkenes of lower Mr from heavier crude oil fractions.', 'Хүнд нефтийн фракцаас илүү хэрэгтэй, Mr бага алкан ба алкенийг крекингээр хэрхэн авахыг санал болгох.'],
      [5, 'Understand the general unreactivity of alkanes, including towards polar reagents, in terms of the strength of the C–H bonds and their relative lack of polarity.', 'Алканы ерөнхий идэвхгүй байдлыг, түүний дотор туйлт урвалжид, C–H холбооны бат бэх ба туйлшралгүй байдлаар ойлгох.'],
      [6, 'Recognise the environmental consequences of carbon monoxide, oxides of nitrogen and unburnt hydrocarbons arising from the combustion of alkanes in the internal combustion engine, and of their catalytic removal.', 'Дотоод шаталтат хөдөлгүүрт алканы шаталтаас үүсэх нүүрстөрөгчийн дутуу исэл, азотын исэл, шатаагүй нүүрсустөрөгчийн байгаль орчинд үзүүлэх нөлөө ба тэдгээрийн катализаар зайлуулахыг таних.']
    ]
  },
  {
    ref: '14.2',
    en: 'Alkenes',
    mn: 'Алкенууд',
    obj: [
      [1, 'Recall the reactions (including reagents and conditions) by which alkenes can be produced: elimination of HX from a halogenoalkane by ethanolic NaOH and heat; dehydration of an alcohol using a heated catalyst (e.g. Al₂O₃) or concentrated acid (e.g. concentrated H₂SO₄); and cracking of a longer chain alkane.', 'Алкенийг гарган авах урвалыг (урвалж, нөхцөл) санах: галогеналканаас HX салгах (этанол дахь NaOH, халаалт); спиртийг катализатор (жишээ нь Al₂O₃) эсвэл өтгөн хүчлээр (жишээ нь өтгөн H₂SO₄) усгүйжүүлэх; урт гинжтэй алканыг крекинглэх.'],
      [2, 'Describe the electrophilic addition of hydrogen (hydrogenation, H₂ with Pt/Ni and heat), steam (H₂O with H₃PO₄ catalyst), a hydrogen halide (HX at room temperature) and a halogen (X₂) to alkenes; the oxidation by cold dilute acidified KMnO₄ to form the diol; the oxidation by hot concentrated acidified KMnO₄ leading to rupture of the C=C bond and the identity of the products; and addition polymerisation exemplified by ethene and propene.', 'Алкенд устөрөгч (Pt/Ni, халаалттай гидрогенжилт), уур (H₃PO₄ катализатор), устөрөгчийн галогенид (HX, өрөөний температур) ба галогений (X₂) электрофилийн нэмэлтийг тодорхойлох; хүйтэн шингэрүүлсэн хүчиллэг KMnO₄-ээр диол үүсгэх исэлдэлт; халуун өтгөн хүчиллэг KMnO₄-ээр C=C холбоо задрах исэлдэлт ба бүтээгдэхүүнийг; этен ба пропенээр жишээлсэн нэмэлтийн полимержилтийг тодорхойлох.'],
      [3, 'Describe the use of aqueous bromine to show the presence of a C=C bond.', 'C=C холбооны оршихуйг харуулахад уусмал дахь бромыг ашиглахыг тодорхойлох.'],
      [4, 'Describe the mechanism of electrophilic addition in alkenes, using bromine/ethene and hydrogen bromide/propene as examples.', 'Алкенд электрофилийн нэмэлтийн механизмыг бром/этен ба устөрөгчийн бромид/пропен жишээгээр тодорхойлох.'],
      [5, 'Describe and explain the inductive effects of alkyl groups on the stability of primary, secondary and tertiary cations formed during electrophilic addition, to explain Markovnikov addition.', 'Электрофилийн нэмэлтийн явцад үүсэх анхдагч, хоёрдогч, гуравдагч катионы тогтвортой байдалд алкил бүлгийн индуктив нөлөөг тодорхойлж, тайлбарлах (Марковниковын нэмэлтийг тайлбарлахад).']
    ]
  },
  {
    ref: '15.1',
    en: 'Halogenoalkanes',
    mn: 'Галогеналканууд',
    obj: [
      [1, 'Recall the reactions (reagents and conditions) by which halogenoalkanes can be produced: free-radical substitution of alkanes by Cl₂ or Br₂ in ultraviolet light (ethane); electrophilic addition of an alkene with X₂ or HX at room temperature; and substitution of an alcohol (with HX, with KCl and concentrated H₂SO₄ or H₃PO₄, with PCl₃ and heat, with PCl₅, or with SOCl₂).', 'Галогеналканыг гарган авах урвалыг (урвалж, нөхцөл) санах: ультрафиолет туяанд Cl₂ эсвэл Br₂-оор алканы чөлөөт радикалын орлуулалт (этан); алкенд X₂ эсвэл HX-ийн электрофилийн нэмэлт (өрөөний температур); спиртийн орлуулалт (HX-ээр, KCl ба өтгөн H₂SO₄ эсвэл H₃PO₄-тай, PCl₃-тай халаахад, PCl₅-тай, SOCl₂-тай).'],
      [2, 'Classify halogenoalkanes into primary, secondary and tertiary.', 'Галогеналканыг анхдагч, хоёрдогч, гуравдагч гэж ангилах.'],
      [3, 'Describe the nucleophilic substitution reactions: with NaOH(aq) and heat to produce an alcohol; with KCN in ethanol and heat to produce a nitrile; with NH₃ in ethanol heated under pressure to produce an amine; and with aqueous silver nitrate in ethanol as a method of identifying the halogen present (exemplified by bromoethane).', 'Нуклеофилийн орлуулалтын урвалыг тодорхойлох: NaOH(aq) ба халаалтаар спирт; этанол дахь KCN ба халаалтаар нитрил; этанол дахь NH₃, даралтын дор халаахад амин; этанол дахь мөнгөний нитратын уусмалаар галогенийг таних арга (бромэтанаар жишээлсэн).'],
      [4, 'Describe the elimination reaction with NaOH in ethanol and heat to produce an alkene, as exemplified by bromoethane.', 'Этанол дахь NaOH ба халаалтаар алкен үүсгэх салгалтын урвалыг (бромэтанаар жишээлсэн) тодорхойлох.'],
      [5, 'Describe the SN1 and SN2 mechanisms of nucleophilic substitution in halogenoalkanes, including the inductive effects of alkyl groups.', 'Галогеналкан дахь нуклеофилийн орлуулалтын SN1 ба SN2 механизмыг алкил бүлгийн индуктив нөлөөтэйгөөр тодорхойлох.'],
      [6, 'Recall that primary halogenoalkanes tend to react via the SN2 mechanism, tertiary halogenoalkanes via the SN1 mechanism, and secondary halogenoalkanes by a mixture of the two, depending on structure.', 'Анхдагч галогеналкан ихэвчлэн SN2, гуравдагч нь SN1, хоёрдогч нь бүтцээсээ хамаарч хоёрын холимгоор урвалд ордгийг санах.'],
      [7, 'Describe and explain the different reactivities of halogenoalkanes, with particular reference to the relative strengths of the C–X bonds, as exemplified by the reactions with aqueous silver nitrate.', 'Галогеналканы өөр өөр идэвхийг, ялангуяа C–X холбооны харьцангуй бат бэхээр тодорхойлж, тайлбарлах (мөнгөний нитратын уусмалтай урвалаар жишээлсэн).']
    ]
  },
  {
    ref: '16.1',
    en: 'Alcohols',
    mn: 'Спиртүүд',
    obj: [
      [1, 'Recall the reactions (reagents and conditions) by which alcohols can be produced: electrophilic addition of steam to an alkene (H₃PO₄ catalyst); reaction of alkenes with cold dilute acidified KMnO₄ to form a diol; substitution of a halogenoalkane with NaOH(aq) and heat; reduction of an aldehyde or ketone with NaBH₄ or LiAlH₄; reduction of a carboxylic acid with LiAlH₄; and hydrolysis of an ester with dilute acid or dilute alkali and heat.', 'Спиртийг гарган авах урвалыг (урвалж, нөхцөл) санах: алкенд уур электрофилийн нэмэх (H₃PO₄ катализатор); алкенийг хүйтэн шингэрүүлсэн хүчиллэг KMnO₄-ээр диол болгох; галогеналканы NaOH(aq) ба халаалтаар орлуулалт; альдегид эсвэл кетоныг NaBH₄ эсвэл LiAlH₄-аар ангижруулах; карбоксилын хүчлийг LiAlH₄-аар ангижруулах; эфирийг шингэрүүлсэн хүчил эсвэл шүлт, халаалтаар гидролиз.'],
      [2, 'Describe the reaction of alcohols with oxygen (combustion); substitution to form halogenoalkanes; the reaction with Na(s); oxidation with acidified K₂Cr₂O₇ or acidified KMnO₄ to carbonyl compounds by distillation or to carboxylic acids by refluxing (primary alcohols give aldehydes, which can be oxidised further to carboxylic acids; secondary alcohols give ketones; tertiary alcohols cannot be oxidised); dehydration to an alkene; and formation of esters with carboxylic acids and concentrated H₂SO₄ as catalyst (exemplified by ethanol).', 'Спиртийн хүчилтөрөгчтэй урвал (шаталт); галогеналкан үүсгэх орлуулалт; Na(s)-тэй урвал; исэлдүүлэгч (хүчиллэг K₂Cr₂O₇ эсвэл KMnO₄)-ээр нэрэлтээр карбонил нэгдэл, рефлюксээр карбоксилын хүчил болгох исэлдэлт (анхдагч спирт альдегид, дараа нь карбоксилын хүчил; хоёрдогч спирт кетон; гуравдагч исэлдэхгүй); катализатор бүхий халаалтаар алкен болгох усгүйжүүлэлт; өтгөн H₂SO₄ катализатортайгаар карбоксилын хүчилтэй эфир үүсгэх (этанолоор жишээлсэн).'],
      [3, 'Classify alcohols as primary, secondary and tertiary (including examples with more than one alcohol group), and state characteristic distinguishing reactions, for example mild oxidation with acidified K₂Cr₂O₇ with a colour change from orange to green.', 'Спиртийг анхдагч, хоёрдогч, гуравдагч гэж ангилах (нэгээс олон спирт бүлэгтэй жишээг оруулан); онцлог ялгах урвалыг хэлэх, жишээ нь хүчиллэг K₂Cr₂O₇-оор зөөлөн исэлдэх (улбар шар → ногоон өнгө өөрчлөгдөнө).'],
      [4, 'Deduce the presence of a CH₃CH(OH)– group in an alcohol, CH₃CH(OH)–R, from its reaction with alkaline I₂(aq) to form a yellow precipitate of tri-iodomethane and an ion, RCO₂⁻.', 'CH₃CH(OH)–R спиртэд CH₃CH(OH)– бүлгийг шүлтлэг I₂(aq)-тай урвалаар шар тунадас трииодметан ба RCO₂⁻ ион үүсгэхээр тодорхойлох.'],
      [5, 'Explain the acidity of alcohols compared with water.', 'Спиртүүдийн хүчиллэг чанарыг устай харьцуулан тайлбарлах.']
    ]
  },
  {
    ref: '17.1',
    en: 'Aldehydes and ketones',
    mn: 'Альдегид ба кетон',
    obj: [
      [1, 'Recall the reactions by which aldehydes and ketones can be produced: oxidation of primary alcohols using acidified K₂Cr₂O₇ or acidified KMnO₄ and distillation to produce aldehydes; and oxidation of secondary alcohols under the same conditions to produce ketones.', 'Альдегид ба кетоныг гарган авах урвалыг санах: анхдагч спиртийг хүчиллэг K₂Cr₂O₇ эсвэл KMnO₄-ээр нэрэлтээр исэлдүүлж альдегид; хоёрдогч спиртийг мөн нөхцөлөөр исэлдүүлж кетон.'],
      [2, 'Describe the reduction of aldehydes and ketones using NaBH₄ or LiAlH₄ to produce alcohols, and the reaction of aldehydes and ketones with HCN (KCN as catalyst, and heat) to produce hydroxynitriles, exemplified by ethanal and propanone.', 'Альдегид ба кетоныг NaBH₄ эсвэл LiAlH₄-аар ангижруулж спирт үүсгэх; альдегид ба кетоныг HCN (KCN катализатор, халаалт)-тай урвалд оруулж гидроксинитрил үүсгэхийг (этаналь ба пропанонаар жишээлсэн) тодорхойлох.'],
      [3, 'Describe the mechanism of the nucleophilic addition reactions of hydrogen cyanide with aldehydes and ketones in 17.1.2(b).', '17.1.2(b)-д заасан устөрөгчийн цианидын альдегид ба кетонтой нуклеофилийн нэмэлтийн механизмыг тодорхойлох.'],
      [4, 'Describe the use of 2,4-dinitrophenylhydrazine (2,4-DNPH reagent) to detect the presence of carbonyl compounds.', 'Карбонил нэгдлийн оршихуйг илрүүлэхэд 2,4-динитрофенилгидразин (2,4-DNPH реагент) ашиглахыг тодорхойлох.'],
      [5, 'Deduce the nature (aldehyde or ketone) of an unknown carbonyl compound from the results of simple tests (Fehling’s and Tollens’ reagents; ease of oxidation).', 'Энгийн туршилтын үр дүнгээр (Фелингийн ба Толлений реагент; исэлдэх хялбар байдал) тодорхойгүй карбонил нэгдлийн мөн чанарыг (альдегид эсвэл кетон) тодорхойлох.'],
      [6, 'Deduce the presence of a CH₃CO– group in an aldehyde or ketone, CH₃CO–R, from its reaction with alkaline I₂(aq) to form a yellow precipitate of tri-iodomethane and an ion, RCO₂⁻.', 'CH₃CO–R альдегид эсвэл кетонд CH₃CO– бүлгийг шүлтлэг I₂(aq)-тай урвалаар шар тунадас трииодметан ба RCO₂⁻ ион үүсгэхээр тодорхойлох.']
    ]
  },
  {
    ref: '18.1',
    en: 'Carboxylic acids',
    mn: 'Карбоксилын хүчил',
    obj: [
      [1, 'Recall the reactions by which carboxylic acids can be produced: oxidation of primary alcohols and aldehydes with acidified K₂Cr₂O₇ or acidified KMnO₄ and refluxing; hydrolysis of nitriles with dilute acid or dilute alkali followed by acidification; and hydrolysis of esters with dilute acid or dilute alkali and heat followed by acidification.', 'Карбоксилын хүчлийг гарган авах урвалыг санах: анхдагч спирт ба альдегидийг хүчиллэг K₂Cr₂O₇ эсвэл KMnO₄-ээр исэлдүүлж рефлюкслэх; нитрилийг шингэрүүлсэн хүчил эсвэл шүлтээр гидролиз хийж дараа нь хүчиллэх; эфирийг шингэрүүлсэн хүчил эсвэл шүлт, халаалтаар гидролиз хийж дараа нь хүчиллэх.'],
      [2, 'Describe the redox reaction with reactive metals to produce a salt and H₂(g); the neutralisation reaction with alkalis to produce a salt and H₂O(l); the acid–base reaction with carbonates to produce a salt, H₂O(l) and CO₂(g); esterification with alcohols with concentrated H₂SO₄ as catalyst; and reduction by LiAlH₄ to form a primary alcohol.', 'Карбоксилын хүчлийн урвалыг тодорхойлох: идэвхтэй металлтай редокс урвал (давс ба H₂(g)); суурьтай саармагжилт (давс ба H₂O(l)); карбонаттай хүчил–суурийн урвал (давс, H₂O(l), CO₂(g)); спиртэй өтгөн H₂SO₄ катализатортайгаар эфиржилт; LiAlH₄-аар анхдагч спирт үүсгэх ангижрал.']
    ]
  },
  {
    ref: '18.2',
    en: 'Esters',
    mn: 'Эфир',
    obj: [
      [1, 'Recall the reaction (reagents and conditions) by which esters can be produced: the condensation reaction between an alcohol and a carboxylic acid with concentrated H₂SO₄ as catalyst.', 'Эфирийг гарган авах урвалыг (урвалж, нөхцөл) санах: спирт ба карбоксилын хүчлийн хоорондын өтгөн H₂SO₄ катализатортай конденсаци.'],
      [2, 'Describe the hydrolysis of esters by dilute acid and by dilute alkali and heat.', 'Эфирийн шингэрүүлсэн хүчил ба шингэрүүлсэн шүлт, халаалттай гидролизыг тодорхойлох.']
    ]
  },
  {
    ref: '19.1',
    en: 'Primary amines',
    mn: 'Анхдагч аминууд',
    note: 'Classification of amines will not be tested at AS Level.',
    obj: [
      [1, 'Recall the reactions by which amines can be produced: reaction of a halogenoalkane with NH₃ in ethanol heated under pressure.', 'Аминыг гарган авах урвалыг санах: галогеналканы этанол дахь NH₃-тай даралтын дор халаасан урвал.']
    ]
  },
  {
    ref: '19.2',
    en: 'Nitriles and hydroxynitriles',
    mn: 'Нитрил ба гидроксинитрил',
    obj: [
      [1, 'Recall the reactions by which nitriles can be produced: reaction of a halogenoalkane with KCN in ethanol and heat.', 'Нитрилийг гарган авах урвалыг санах: галогеналканы этанол дахь KCN-тай халаасан урвал.'],
      [2, 'Recall the reactions by which hydroxynitriles can be produced: the reaction of aldehydes and ketones with HCN, with KCN as catalyst, and heat.', 'Гидроксинитрилийг гарган авах урвалыг санах: альдегид ба кетоныг KCN катализатортай HCN-тэй халаасан урвал.'],
      [3, 'Describe the hydrolysis of nitriles with dilute acid or dilute alkali followed by acidification to produce a carboxylic acid.', 'Нитрилийн шингэрүүлсэн хүчил эсвэл шингэрүүлсэн шүлтээр гидролиз, дараа нь хүчиллэж карбоксилын хүчил үүсгэхийг тодорхойлох.']
    ]
  },
  {
    ref: '20.1',
    en: 'Addition polymerisation',
    mn: 'Нэмэлтийн полимержилт',
    obj: [
      [1, 'Describe addition polymerisation as exemplified by poly(ethene) and poly(chloroethene), PVC.', 'Нэмэлтийн полимержилтийг поли(этен) ба поли(хлорэтен), ПВХ-аар жишээлэн тодорхойлох.'],
      [2, 'Deduce the repeat unit of an addition polymer obtained from a given monomer.', 'Өгөгдсөн монометрээс үүссэн нэмэлтийн полимерийн давтагдах нэгжийг тодорхойлох.'],
      [3, 'Identify the monomer(s) present in a given section of an addition polymer molecule.', 'Нэмэлтийн полимерийн молекулын өгөгдсөн хэсэгт байгаа монометрийг таних.'],
      [4, 'Recognise the difficulty of the disposal of poly(alkene)s, i.e. non-biodegradability and harmful combustion products.', 'Поли(алкен)-ийн устгалын хүндрэлийг (биоразлагдахгүй байдал, шатахад үүсэх хортой бүтээгдэхүүн) таних.']
    ]
  },
  {
    ref: '21.1',
    en: 'Organic synthesis',
    mn: 'Органик синтез',
    obj: [
      [1, 'For an organic molecule containing several functional groups: identify organic functional groups using the reactions in the syllabus, and predict properties and reactions.', 'Олон функциональ бүлэгтэй органик молекулд: синтезийн хөтөлбөрийн урвалаар функциональ бүлгийг таньж, шинж чанар ба урвалыг урьдчилан таамаглах.'],
      [2, 'Devise multi-step synthetic routes for preparing organic molecules using the reactions in the syllabus.', 'Хөтөлбөрийн урвалуудыг ашиглан органик молекул бэлтгэх олон алхамт синтезийн замыг зохиох.'],
      [3, 'Analyse a given synthetic route in terms of the type of reaction and reagents used for each step, and possible by-products.', 'Өгөгдсөн синтезийн замыг алхам бүрийн урвалын төрөл, урвалж ба боломжит побочный бүтээгдэхүүнээр шинжлэх.']
    ]
  },
  {
    ref: '22.1',
    en: 'Infrared spectroscopy',
    mn: 'Хэт улаан туяаны спектроскопи (IR)',
    obj: [
      [1, 'Analyse an infrared spectrum of a simple molecule to identify functional groups (see the Data section for the functional groups required).', 'Энгийн молекулын хэт улаан туяаны спектрийг шинжилж функциональ бүлгийг таних (шаардлагатай функциональ бүлгийг Data хэсгээс харна уу).']
    ]
  },
  {
    ref: '22.2',
    en: 'Mass spectrometry',
    mn: 'Масс спектрометр',
    obj: [
      [1, 'Analyse mass spectra in terms of m/e values and isotopic abundances (knowledge of the working of the mass spectrometer is not required).', 'Масс спектрийг m/e утга ба изотопын хувиар шинжлэх (масс спектрометрийн ажиллагааны мэдлэг шаардлагагүй).'],
      [2, 'Calculate the relative atomic mass of an element given the relative abundances of its isotopes, or its mass spectrum.', 'Изотопуудын харьцангуй хувь эсвэл масс спектрээр элементийн харьцангуй атомын массыг тооцоолох.'],
      [3, 'Deduce the molecular mass of an organic molecule from the molecular ion peak in a mass spectrum.', 'Масс спектрийн молекулын ионы оргилоос органик молекулын молекулын массыг тодорхойлох.'],
      [4, 'Suggest the identity of molecules formed by simple fragmentation in a given mass spectrum.', 'Өгөгдсөн масс спектр дэх энгийн задралаар үүссэн молекулын мөн чанарыг санал болгох.'],
      [5, 'Deduce the number of carbon atoms, n, in a compound using the [M+1]⁺ peak and the formula n = 100 × abundance of [M+1]⁺ ÷ (1.1 × abundance of M⁺).', 'Нэгдлийн нүүрстөрөгчийн атомын тоо n-ийг [M+1]⁺ оргил ба n = 100 × [M+1]⁺-ийн хувь ÷ (1.1 × M⁺-ийн хувь) томьёогоор тодорхойлох.'],
      [6, 'Deduce the presence of bromine and chlorine atoms in a compound using the [M+2]⁺ peak.', '[M+2]⁺ оргилоор нэгдэлд бром ба хлорын атом байгааг тодорхойлох.']
    ]
  }
];
