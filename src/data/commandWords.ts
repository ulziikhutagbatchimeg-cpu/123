// The Cambridge command words used in AS & A Level and IGCSE chemistry papers. Each word has its meaning in both languages
// and two worked practice tasks: the first is the core task, the second is an extra task the student can choose to try.
// Each task has a model answer and self-check points; the student compares their own answer with them.
export interface CommandTask {
  questionEn: string;
  questionMn: string;
  answerEn: string;
  answerMn: string;
  checkEn: string[];
  checkMn: string[];
}

export interface CommandWord {
  word: string;
  wordMn: string;
  definitionEn: string;
  definitionMn: string;
  tasks: CommandTask[];
}

const t = (
  questionEn: string,
  questionMn: string,
  answerEn: string,
  answerMn: string,
  checkEn: string[],
  checkMn: string[]
): CommandTask => ({ questionEn, questionMn, answerEn, answerMn, checkEn, checkMn });

export const COMMAND_WORDS: CommandWord[] = [
  {
    word: 'Calculate',
    wordMn: 'Тооцоол',
    definitionEn: 'Work out from given facts, figures or information. Show the working steps and give the unit.',
    definitionMn: 'Өгөгдсөн тоо, мэдээллээс бодолт хийж гаргах. Бодолтын алхмыг харуулж, нэгжийг бичнэ.',
    tasks: [
      t('Calculate the molar mass of CO₂. (C = 12, O = 16)', 'CO₂-ийн молийн массыг тооцоол. (C = 12, O = 16)',
        'Mr = 12 + (2 × 16) = 44, so the molar mass is 44 g/mol.', 'Mr = 12 + (2 × 16) = 44, молийн масс 44 г/моль.',
        ['Did you add one C and two O atoms?', 'Did you give the unit g/mol?'],
        ['Нэг C, хоёр O атомыг нэмсэн үү?', 'Нэгжийг г/моль гэж бичсэн үү?']),
      t('Calculate the volume of 0.5 mol of hydrogen at r.t.p. (1 mol = 24 dm³).', 'r.t.p.-д 0.5 моль устөрөгчийн эзлэхүүнийг тооцоол (1 моль = 24 дм³).',
        'Volume = 0.5 × 24 = 12 dm³.', 'Эзлэхүүн = 0.5 × 24 = 12 дм³.',
        ['Did you multiply the moles by 24 dm³?', 'Did you give the unit dm³?'],
        ['Молийг 24 дм³-аар үржүүлсэн үү?', 'Нэгжийг дм³ гэж бичсэн үү?'])
    ]
  },
  {
    word: 'Comment',
    wordMn: 'Дүгнэлт хий',
    definitionEn: 'Give an opinion or a judgement that is based on the data or evidence given.',
    definitionMn: 'Өгөгдөл, нотолгоонд үндэслэн санаа бодол, дүгнэлт өгөх.',
    tasks: [
      t('Comment on the trend in melting points of the Group I metals going down the group.', 'I бүлгийн металлын хайлах цэгийн хандлагад доош чиглэлд дүгнэлт хий.',
        'The melting point decreases going down Group I (Li > Na > K > Rb). The atoms are larger, so the metallic bond is weaker.', 'I бүлэгт доош хайлах цэг буурна (Li > Na > K > Rb). Атом томорч, металлын холбоо сулардаг.',
        ['Did you state the trend (decreasing)?', 'Did you give a reason linked to atomic size?'],
        ['Хандлагыг (буурч байгааг) дурдсан уу?', 'Атомын хэмжээтэй холбосон шалтгаан өгсөн үү?']),
      t('A student says: "Magnesium gains mass when it burns, so mass is not conserved." Comment on this.', 'Сурагч: "Магни шатахад масс нэмэгддэг тул масс хадгалагддаггүй." Энэ талаар дүгнэлт хий.',
        'The claim is wrong. The magnesium reacts with oxygen from the air, and the oxide contains that oxygen. In a closed system the total mass is conserved.', 'Мэдэгдэл буруу. Магни агаарын хүчилтөрөгчтэй урвалд орж, исэлд тэр хүчилтөрөгч орсон байна. Хаалттай системд нийт масс хадгалагдана.',
        ['Did you name the oxygen from the air as the reason?', 'Did you refer to a closed system?'],
        ['Агаарын хүчилтөрөгчийг шалтгаан гэж дурдсан уу?', 'Хаалттай системийг дурдсан уу?'])
    ]
  },
  {
    word: 'Compare',
    wordMn: 'Харьцуул',
    definitionEn: 'Give the similarities and the differences between two or more things.',
    definitionMn: 'Хоёр ба түүнээс дээш зүйлийн ижил тал, ялгааг дурдах.',
    tasks: [
      t('Compare the reactivity of chlorine and bromine.', 'Хлор ба бромын идэвхийг харьцуул.',
        'Both are halogens that form diatomic molecules. Chlorine is more reactive, because its atoms are smaller, so the incoming electron is attracted more strongly.', 'Хоёулаа галоген, хоёр атомт молекул. Хлор илүү идэвхтэй, учир нь атом нь жижиг тул орж ирэх электроныг илүү хүчтэй татдаг.',
        ['Did you give a similarity?', 'Did you give a difference with a reason?'],
        ['Нэг ижил шинжийг дурдсан уу?', 'Шалтгаантай нэг ялгааг дурдсан уу?']),
      t('Compare ionic and covalent bonding.', 'Ионы ба ковалент холбоог харьцуул.',
        'Both hold atoms together by attraction. Ionic bonding transfers electrons to form ions, which attract each other. Covalent bonding shares electron pairs.', 'Хоёулаа таталцлаар атомыг барина. Ионы холбоо электрон шилжүүлж ион үүсгэнэ. Ковалент холбоо электроны хос хуваалцана.',
        ['Did you give at least one similarity?', 'Did you contrast transfer with sharing?'],
        ['Дор хаяж нэг ижил тал дурдсан уу?', 'Шилжүүлэлтийг хуваалцахтай харьцуулсан уу?'])
    ]
  },
  {
    word: 'Complete',
    wordMn: 'Бөглө',
    definitionEn: 'Add the missing parts (for example in an equation, a table or a diagram) so the answer is whole.',
    definitionMn: 'Дутуу хэсгийг (жишээ нь тэгшитгэл, хүснэгт, зураг) нөхөж бүрэн болгох.',
    tasks: [
      t('Complete the equation: 2Na + Cl₂ → ___', 'Тэгшитгэлийг бөглө: 2Na + Cl₂ → ___',
        '2NaCl', '2NaCl',
        ['Is the product NaCl (Na⁺ and Cl⁻ in a 1:1 ratio)?', 'Is the equation balanced (2 Na, 2 Cl on each side)?'],
        ['Бүтээгдэхүүн NaCl (Na⁺, Cl⁻ 1:1) мөн үү?', 'Тэгшитгэл тэнцвэртэй юу (тал бүрт 2 Na, 2 Cl)?']),
      t('Complete the table for potassium: outer electrons ___; reaction with water ___.', 'Калийн хүснэгтийг бөглө: гаднах электрон ___; усатай урвал ___.',
        '1; very vigorous (lilac flame, hydrogen released, potassium hydroxide formed).', '1; маш хүчтэй (ягаан дөл, устөрөгч ялгарч, калийн гидроксид үүснэ).',
        ['Did you give 1 outer electron?', 'Did you describe the reaction as very vigorous?'],
        ['Гаднах электрон 1 гэж бичсэн үү?', 'Урвалыг маш хүчтэй гэж тодорхойлсон уу?'])
    ]
  },
  {
    word: 'Construct',
    wordMn: 'Бүтээ',
    definitionEn: 'Build a balanced equation, a diagram or a graph that shows the correct details.',
    definitionMn: 'Тэнцвэржүүлсэн тэгшитгэл, диаграм эсвэл графикийг зөв мэдээллээр бүтээх.',
    tasks: [
      t('Construct the balanced equation for magnesium reacting with dilute hydrochloric acid.', 'Магнийг шингэрүүлсэн хлорын хүчилтэй урвалд оруулах тэнцвэржүүлсэн тэгшитгэлийг бүтээ.',
        'Mg + 2HCl → MgCl₂ + H₂', 'Mg + 2HCl → MgCl₂ + H₂',
        ['Are MgCl₂ and H₂ the products?', 'Is it balanced (2 H and 2 Cl on each side)?'],
        ['Бүтээгдэхүүн MgCl₂, H₂ мөн үү?', 'Тэнцвэртэй юу (тал бүрт 2 H, 2 Cl)?']),
      t('Construct a word equation and a symbol equation for the complete combustion of methane.', 'Метаны бүрэн шаталтын үгийн тэгшитгэл, тэмдэгт тэгшитгэлийг бүтээ.',
        'Methane + oxygen → carbon dioxide + water; CH₄ + 2O₂ → CO₂ + 2H₂O', 'Метан + хүчилтөрөгч → нүүрсхүчлийн хий + ус; CH₄ + 2O₂ → CO₂ + 2H₂O',
        ['Did you list the reactants and products in words?', 'Did you balance the symbol equation?'],
        ['Урвалжууд, бүтээгдэхүүнийг үгээр бичсэн үү?', 'Тэмдгийн тэгшитгэлийг тэнцвэржүүлсэн үү?'])
    ]
  },
  {
    word: 'Contrast',
    wordMn: 'Ялгааг харуул',
    definitionEn: 'Show the clear differences between two things, using the key features of each.',
    definitionMn: 'Хоёр зүйлийн гол шинжийг ашиглан тодорхой ялгааг харуулах.',
    tasks: [
      t('Contrast the structures of diamond and graphite.', 'Алмаз ба графитын бүтцийн ялгааг харуул.',
        'Diamond: each carbon bonds to four others in a 3-D lattice, with no free electrons, so it is very hard. Graphite: each carbon bonds to three others in flat layers, with delocalised electrons that conduct.', 'Алмаз: нүүрстөрөгч бүр дөрвөн атомтай 3 хэмжээст торонд; чөлөөт электрон үгүй тул маш хатуу. Графит: гурван атомтай хавтгай давхаргад; дамжуулдаг делокалчлагдсан электронтой.',
        ['Did you contrast the bonding (4 vs 3 neighbours)?', 'Did you contrast electrical conduction?'],
        ['Холбоог (4 ба 3 хөрш) ялгасан уу?', 'Цахилгаан дамжуулалтыг ялгасан уу?']),
      t('Contrast the reactions of sodium and potassium with water.', 'Натри ба калийн усатай урвалын ялгааг харуул.',
        'Both give hydrogen and an alkali. Potassium reacts more vigorously: it can melt and the hydrogen ignites with a lilac flame. Sodium reacts less vigorously.', 'Хоёулаа устөрөгч, шүлт үүсгэнэ. Калий илүү хүчтэй: хайлж, устөрөгч ягаан дөлтэй асна. Натри бага хүчтэй.',
        ['Did you say potassium is more vigorous?', 'Did you give a visible difference (flame or melting)?'],
        ['Калий илүү хүчтэй гэж дурдсан уу?', 'Харагдах ялгааг (дөл эсвэл хайлалт) дурдсан уу?'])
    ]
  },
  {
    word: 'Define',
    wordMn: 'Тодорхойл',
    definitionEn: 'Give the precise meaning of a term. A definition must be exact, not a description.',
    definitionMn: 'Нэр томьёоны яг утгыг өгөх. Тодорхойлолт нь нарийн байх ёстой, тайлбар биш.',
    tasks: [
      t('Define the term relative atomic mass.', 'Харьцангуй атомын масс гэдгийг тодорхойл.',
        'The average mass of one atom of an element, compared with 1/12 of the mass of one atom of carbon-12.', 'Элементийн нэг атомын дундаж массыг C-12 атомын массын 1/12-тэй харьцуулсан харьцаа.',
        ['Did you use the carbon-12 standard?', 'Did you say "average"?'],
        ['C-12-ийн стандартыг ашигласан уу?', '"Дундаж" гэж дурдсан уу?']),
      t('Define the term mole.', 'Моль гэдгийг тодорхойл.',
        'The amount of substance that contains 6.02 × 10²³ particles, the same number as the atoms in 12 g of carbon-12.', 'Бодисын хэмжээ, 12 г C-12-т байгаа атомын тоотой тэнцүү, 6.02 × 10²³ бөөм агуулсан хэмжээ.',
        ['Did you give 6.02 × 10²³?', 'Did you link it to carbon-12?'],
        ['6.02 × 10²³ гэж бичсэн үү?', 'C-12-тай холбосон уу?'])
    ]
  },
  {
    word: 'Demonstrate',
    wordMn: 'Харуул',
    definitionEn: 'Show clearly that something is true, using an experiment or a logical argument.',
    definitionMn: 'Туршилт эсвэл логик гинжээр юу үнэн болохыг тодорхой харуулах.',
    tasks: [
      t('Demonstrate that water is a compound, not an element.', 'Ус элемент биш, нэгдэл гэдгийг харуул.',
        'Electrolysis of water gives hydrogen and oxygen in a 2:1 volume ratio. Water is therefore two elements chemically combined.', 'Усны электролизоор 2:1 эзлэхүүн харьцаатай устөрөгч, хүчилтөрөгч гарна. Тиймээс ус хоёр элементийн химийн нэгдэл.',
        ['Did you describe a decomposition test?', 'Did you state the 2:1 ratio and what it proves?'],
        ['Задлах туршилтыг дүрсэлсэн үү?', '2:1 харьцаа ба юуг нотлохыг дурдсан уу?']),
      t('Demonstrate that a reaction is exothermic using temperature readings.', 'Температурын уншилтаар урвал экзотермик гэдгийг харуул.',
        'Measure the temperature before and after the reaction. A rise in temperature shows heat is given out, so the reaction is exothermic.', 'Урвалын өмнө, дараах температурыг хэмжинэ. Температур өсөх нь дулаан ялгарсаныг харуулж, тиймээс экзотермик.',
        ['Did you measure before and after?', 'Did you link a temperature rise to exothermic?'],
        ['Өмнө, дараа хэмжсэн үү?', 'Температур өсөлтийг экзотермиктай холбосон уу?'])
    ]
  },
  {
    word: 'Deduce',
    wordMn: 'Дүгнэ',
    definitionEn: 'Reach a conclusion from the information given, using logic and the data.',
    definitionMn: 'Өгөгдсөн мэдээлэл, өгөгдөлд логикоор үндэслэн дүгнэлт гаргах.',
    tasks: [
      t('A compound contains 40% C, 6.7% H and 53.3% O by mass. Deduce its empirical formula. (C = 12, H = 1, O = 16)', 'Нэгдэл массаараа 40% C, 6.7% H, 53.3% O агуулна. Эмпирик томьёог дүгнэ. (C = 12, H = 1, O = 16)',
        'C: 40/12 = 3.33; H: 6.7; O: 53.3/16 = 3.33. Ratio 1:2:1, so the empirical formula is CH₂O.', 'C: 40/12 = 3.33; H: 6.7; O: 3.33. Харьцаа 1:2:1, эмпирик томьёо CH₂O.',
        ['Did you divide each % by its atomic mass?', 'Did you divide by the smallest and check for whole numbers?'],
        ['Хувь бүрийг атомын массад хуваасан уу?', 'Хамгийн бага тоонд хуваагаад бүхэл тоо гарсан уу?']),
      t('A metal M forms the chloride MCl₂. Deduce the charge on an ion of M.', 'М металл MCl₂ хлорид үүсгэнэ. М-ийн ионы цэнэгийг дүгнэ.',
        'Two Cl⁻ ions (−1 each) balance one M ion, so M is M²⁺.', 'Хоёр Cl⁻ (тус бүр −1) нэг М ионыг тэнцүүлнэ, тиймээс М²⁺.',
        ['Did you use the charge of chloride (−1)?', 'Did you balance the total charge to zero?'],
        ['Хлоридын цэнэг (−1) ашигласан уу?', 'Нийт цэнэгийг тэгтэй тэнцүүлсэн үү?'])
    ]
  },
  {
    word: 'Describe',
    wordMn: 'Дүрсэл',
    definitionEn: 'Give the main features or the observations, without giving the reasons (that is explain).',
    definitionMn: 'Гол шинж эсвэл ажиглалтыг өгөх; шалтгааныг (тайлбарлах) оруулахгүй.',
    tasks: [
      t('Describe what you would see when iron is added to copper(II) sulfate solution.', 'Төмрийг зэсийн(II) сульфатын уусмалд хийхэд юу ажиглагдахыг дүрсэл.',
        'The blue solution becomes paler (green). A reddish-brown solid (copper) forms on the iron.', 'Цэнхэр уусмал цайрч ногоон болно. Төмрийн дээр улаан-хүрэн хатуу бодис (зэс) үүснэ.',
        ['Did you describe the colour change of the solution?', 'Did you describe the solid formed, without a reason?'],
        ['Уусмалын өнгөний өөрчлөлтийг дүрсэлсэн үү?', 'Үүссэн хатуу бодисыг шалтгаангүйгээр дүрсэлсэн үү?']),
      t('Describe what you would see when chlorine is bubbled into potassium iodide solution.', 'Калийн иодидын уусмалд хлор хийхэд юу ажиглагдахыг дүрсэл.',
        'The colourless solution turns brown (orange-brown) because iodine is formed.', 'Өнгөгүй уусмал бор-улбар шар болно, учир нь иод үүснэ.',
        ['Did you mention the colour change?', 'Did you keep to observations (no explanation needed)?'],
        ['Өнгөний өөрчлөлтийг дурдсан уу?', 'Зөвхөн ажиглалт дурдсан уу?'])
    ]
  },
  {
    word: 'Determine',
    wordMn: 'Тодорхойл (тооцоолж)',
    definitionEn: 'Find the value of a quantity, usually by calculation or experiment.',
    definitionMn: 'Хэмжигдэхүүний утгыг ихэвчлэн тооцоолол эсвэл туршилтаар олох.',
    tasks: [
      t('Determine the percentage yield if 3.0 g of product is obtained from a theoretical yield of 4.0 g.', 'Онолын ургац 4.0 г байхад 3.0 г бүтээгдэхүүн авбал хувийн ургацыг тодорхойл.',
        '(3.0 ÷ 4.0) × 100 = 75%.', '(3.0 ÷ 4.0) × 100 = 75%.',
        ['Did you use actual ÷ theoretical × 100?', 'Did you give the % sign?'],
        ['Бодит ÷ онолын × 100 гэж тооцсон уу?', '% тэмдэг бичсэн үү?']),
      t('Determine the concentration of a solution containing 4.0 g of NaOH (Mr = 40) in 500 cm³.', '500 см³-т 4.0 г NaOH (Mr = 40) агуулсан уусмалын концентрацийг тодорхойл.',
        'Moles = 4.0/40 = 0.10 mol; volume = 0.5 dm³; concentration = 0.10/0.5 = 0.20 mol/dm³.', 'Моль = 4.0/40 = 0.10; эзлэхүүн 0.5 дм³; концентраци = 0.10/0.5 = 0.20 моль/дм³.',
        ['Did you convert cm³ to dm³?', 'Did you give the unit mol/dm³?'],
        ['см³-ийг дм³ руу хөрвүүлсэн үү?', 'Нэгжийг моль/дм³ гэж бичсэн үү?'])
    ]
  },
  {
    word: 'Discuss',
    wordMn: 'Хэлэлцэ',
    definitionEn: 'Give a considered account of the issue, covering more than one side, and reach a balanced conclusion.',
    definitionMn: 'Асуудлын хоёр талыг тусгаж, тэнцвэртэй дүгнэлтэд хүрэх.',
    tasks: [
      t('Discuss the advantages and disadvantages of hydrogen fuel cells compared with petrol engines.', 'Бензиний хөдөлгүүртэй харьцуулахад устөрөгчийн түлшний элементийн давуу, сул талыг хэлэлцэ.',
        'Advantages: only water is produced; high efficiency; quiet. Disadvantages: hydrogen is hard to store and transport; making hydrogen uses energy; few refuelling points. A balanced conclusion weighs these.', 'Давуу: зөвхөн ус гарна; өндөр үр ашиг; чимээгүй. Сул: устөрөгчийг хадгалах, тээвэрлэх хүндтэй; устөрөгч гаргахад энерги зарцуулна; түлшний станц цөөн. Тэнцвэртэй дүгнэлт эдгээрийг жинлэнэ.',
        ['Did you give both advantages and disadvantages?', 'Did you reach a balanced conclusion?'],
        ['Давуу, сул талыг хоёуланг нь дурдсан уу?', 'Тэнцвэртэй дүгнэлт хийсэн үү?']),
      t('Discuss whether the Haber process should use a high or a low temperature.', 'Хабер процессод өндөр эсвэл бага температур хэрэглэх эсэхийг хэлэлцэ.',
        'A low temperature gives a higher ammonia yield (the forward reaction is exothermic) but the rate is slow. A high temperature gives a faster rate but a lower yield, so about 450 °C is a compromise.', 'Бага температурт аммиакийн ургац өндөр (урагш урвал экзотермик) боловч хурд удаан. Өндөр температурт хурд нэмэгдэж, ургац буурна; тиймээс ойролцоогоор 450 °C компромисс.',
        ['Did you link temperature to both yield and rate?', 'Did you explain the compromise?'],
        ['Температурыг ургац ба хурд хоёртой холбосон уу?', 'Компромиссыг тайлбарласан уу?'])
    ]
  },
  {
    word: 'Draw',
    wordMn: 'Зур',
    definitionEn: 'Make an accurate diagram, with the correct features and labels, using a ruler where needed.',
    definitionMn: 'Зөв шинж, шошготой нарийн зураг зурах; шаардлагатай бол сегмэнт (хайч) ашиглана.',
    tasks: [
      t('Draw a dot-and-cross diagram for a molecule of water.', 'Усны молекулын цэг-загалмай диаграмыг зур.',
        'Oxygen (6 outer electrons) shares one electron with each of two H atoms, giving two O–H bonds, and has two lone pairs.', 'Хүчилтөрөгч (6 гаднах электрон) хоёр H-тай тус бүр нэг электрон хуваалцаж, хоёр O–H холбоо үүсгэж, хоёр ганц хос үлдээнэ.',
        ['Did you show 2 shared pairs (2 bonds)?', 'Did you show 2 lone pairs on oxygen?'],
        ['2 хуваалцсан хос (2 холбоо) зурсан уу?', 'Хүчилтөрөгч дээр 2 ганц хос зурсан уу?']),
      t('Draw the displayed formula of ethanol.', 'Этанолын дэлгэрэнгүй бүтцийн томьёог зур.',
        'H–C–C–O–H with all the bonds drawn: C–C, C–H, C–O and O–H.', 'H–C–C–O–H бүх холбоотой: C–C, C–H, C–O, O–H.',
        ['Did you draw every bond?', 'Did you include the O–H group?'],
        ['Бүх холбоог зурсан уу?', 'O–H бүлгийг оруулсан уу?'])
    ]
  },
  {
    word: 'Estimate',
    wordMn: 'Ойролцоогоор тооцоол',
    definitionEn: 'Give an approximate value, with a sensible number of significant figures.',
    definitionMn: 'Ойролцоо утгыг утгатай оронтойгоор өгөх.',
    tasks: [
      t('Estimate the number of hydrogen atoms in 1 g of hydrogen gas. (Avogadro constant ≈ 6.0 × 10²³)', '1 г устөрөгчид хэдэн устөрөгчийн атом байхыг ойролцоогоор тооцоол. (Авогадрогийн тогтмол ≈ 6.0 × 10²³)',
        'Moles of H₂ = 0.5; molecules ≈ 3 × 10²³; atoms ≈ 6 × 10²³.', 'H₂-ийн моль = 0.5; молекул ≈ 3 × 10²³; атом ≈ 6 × 10²³.',
        ['Did you divide by 2 to get moles of H₂?', 'Did you double the molecules to get atoms?'],
        ['H₂-ийн молийг олохдоо 2-т хуваасан уу?', 'Молекулыг 2-оор үржүүлж атом олсон уу?']),
      t('Estimate the volume of 0.25 mol of a gas at r.t.p.', 'r.t.p.-д 0.25 моль хийн эзлэхүүнийг ойролцоогоор тооцоол.',
        '0.25 × 24 = 6 dm³.', '0.25 × 24 = 6 дм³.',
        ['Did you use 24 dm³ per mole?', 'Did you give the unit dm³?'],
        ['Нэг моль тутамд 24 дм³ ашигласан уу?', 'Нэгжийг дм³ гэж бичсэн үү?'])
    ]
  },
  {
    word: 'Evaluate',
    wordMn: 'Үнэл',
    definitionEn: 'Weigh up the strengths and weaknesses, or the evidence for and against, and reach a supported judgement.',
    definitionMn: 'Давуу, сул тал эсвэл эсрэг, нотолгоог жинлэж, үндэслэлтэй шийдвэрт хүрэх.',
    tasks: [
      t('Evaluate hydrogen as a fuel for cars.', 'Машины түлш болгон устөрөгчийг үнэл.',
        'Strengths: no carbon dioxide where it is used. Weaknesses: hard to store; often made from fossil fuels; few refuelling stations. Judgement: promising if the hydrogen is made from renewable energy.', 'Давуу: ашиглах газар нүүрсхүчлийн хий гарахгүй. Сул: хадгалахад хүнд; ихэвчлэн чулуужсан түлшнээс гаргадаг; түлшний станц цөөн. Дүгнэлт: сэргээгдэх энергиэр гаргавал ирээдүйтэй.',
        ['Did you weigh strengths against weaknesses?', 'Did you reach a judgement with a condition?'],
        ['Давуу, сул талыг жинлэсэн үү?', 'Нөхцөлтэй шийдвэрт хүрсэн үү?']),
      t('Evaluate whether the results of a titration are reliable.', 'Титрлэлтийн үр дүн найдвартай эсэхийг үнэл.',
        'Reliable if the titres are concordant and repeated, and the glassware is accurate. Less reliable if the end point is hard to see or the meniscus is read wrongly.', 'Найдвартай, хэрэв титр зөрүүгүй, давтсан, шил хэрэгсэл нарийвчлалтай бол. Найдваргүй, хэрэв төгсгөлийн цэг тодорхойгүй эсвэл хотгорыг буруу уншсан бол.',
        ['Did you use concordant titres as evidence?', 'Did you name a limitation of the method?'],
        ['Зөрүүгүй титрийг нотолгоо болгосон уу?', 'Аргын сул талыг дурдсан уу?'])
    ]
  },
  {
    word: 'Explain',
    wordMn: 'Тайлбарла',
    definitionEn: 'Give the reasons why or how something happens, linking cause and effect.',
    definitionMn: 'Юу яагаад, хэрхэн болохыг шалтгаан ба үр дагавартай холбож өгөх.',
    tasks: [
      t('Explain why ethanol has a higher boiling point than ethane.', 'Этанолын буцлах цэг этанаас яагаад өндөр болохыг тайлбарла.',
        'Ethanol molecules form hydrogen bonds (from the –OH group). More energy is needed to break these than the weak van der Waals\' forces between ethane molecules.', 'Этанолын молекул устөрөгчийн холбоо үүсгэдэг (–OH-ийн улмаас). Үүнийг таслахад этаны сул ван дер Ваальсын хүчнээс илүү энерги хэрэгтэй.',
        ['Did you name the force in each substance?', 'Did you say which needs more energy, and why?'],
        ['Бодис бүрийн хүчийг нэрлэсэн үү?', 'Аль нь илүү энерги шаардах, яагаад гэдгийг хэлсэн үү?']),
      t('Explain why reaction rate increases when the temperature rises.', 'Температур өсөхөд урвалын хурд яагаад нэмэгддэгийг тайлбарла.',
        'The particles move faster, so collisions are more frequent. More particles have energy at or above the activation energy, so more collisions are successful.', 'Бөөмс хурдан хөдөлж, мөргөлдөөн ихсэнэ. Идэвхжүүлэх энергитэй бөөм олон болж, амжилттай мөргөлдөөн нэмэгдэнэ.',
        ['Did you mention collision frequency?', 'Did you mention the energy of successful collisions?'],
        ['Мөргөлдөөний давтамжийг дурдсан уу?', 'Амжилттай мөргөлдөөний энергийг дурдсан уу?'])
    ]
  },
  {
    word: 'Identify',
    wordMn: 'Таних',
    definitionEn: 'Name or pick out the substance, feature or property from the information given.',
    definitionMn: 'Өгөгдсөн мэдээллээс бодис, шинж, шинж чанарыг нэрлэх эсвэл сонгох.',
    tasks: [
      t('Identify the gas given off when a metal carbonate reacts with dilute acid, if it turns limewater milky.', 'Металл карбонатыг шингэрүүлсэн хүчилтэй урвалд оруулахад гарч, шохойн усыг сүүлэгт болгох хийг таних.',
        'Carbon dioxide.', 'Нүүрсхүчлийн хий.',
        ['Did you name carbon dioxide?', 'Did you use the limewater test as evidence?'],
        ['Нүүрсхүчлийн хийг нэрлэсэн үү?', 'Шохойн усны туршилтыг нотолгоо болгосон уу?']),
      t('Identify the cation that gives a green precipitate with sodium hydroxide, which does not dissolve in excess.', 'Натрийн гидроксидтой ногоон тунадас өгч, илүүдэлд уусдаггүй катионыг таних.',
        'Iron(II), Fe²⁺ (green precipitate of Fe(OH)₂).', 'Төмрийн(II), Fe²⁺ (Fe(OH)₂-ийн ногоон тунадас).',
        ['Did you name the ion with its charge?', 'Did you say the precipitate does not dissolve in excess?'],
        ['Ионыг цэнэгтэй нь нэрлэсэн үү?', 'Тунадас илүүдэлд уусдаггүйг дурдсан уу?'])
    ]
  },
  {
    word: 'Justify',
    wordMn: 'Баталгаажуул',
    definitionEn: 'Give evidence or reasons that support a statement or a choice.',
    definitionMn: 'Мэдэгдэл эсвэл сонголтыг дэмжих нотолгоо, шалтгаан өгөх.',
    tasks: [
      t('Justify why carbon dioxide is classed as an acidic oxide.', 'Нүүрсхүчлийн хийг яагаад хүчиллэг исэл гэж ангилдагийг баталгаажуул.',
        'It is an oxide of a non-metal. It dissolves in water to form an acid (carbonic acid), and it reacts with bases such as NaOH to form a salt and water.', 'Металл бус элементийн исэл. Усанд уусаж хүчил (нүүрсхүчил) үүсгэнэ; NaOH зэрэг суурьтай урвалд орж давс, ус үүсгэнэ.',
        ['Did you give evidence from its behaviour in water?', 'Did you give evidence from its reaction with bases?'],
        ['Усанд хэрхэн авирласан нотолгоо өгсөн үү?', 'Суурьтай урвалын нотолгоо өгсөн үү?']),
      t('Justify the use of copper for electrical wiring.', 'Зэсийг цахилгаан утсанд хэрэглэхийг баталгаажуул.',
        'Copper is a good electrical conductor because it has delocalised electrons. It is ductile, so it can be drawn into thin wires.', 'Зэс делокалчлагдсан электронтой тул сайн дамжуулагч. Сунадаг тул нимгэн утас болгож болно.',
        ['Did you name the property (conductivity)?', 'Did you link the property to the use?'],
        ['Шинжийг (дамжуулалт) нэрлэсэн үү?', 'Шинжийг хэрэглээтэй холбосон уу?'])
    ]
  },
  {
    word: 'Label',
    wordMn: 'Шошго тавь',
    definitionEn: 'Add the names or the key parts to a diagram, with lines to the correct features.',
    definitionMn: 'Зурагт зөв хэсгүүдийг нэрлэж, шугамаар холбож шошго тавих.',
    tasks: [
      t('Label a simple distillation diagram: thermometer, condenser, distillate, anti-bumping granules.', 'Энгийн нэрэлтийн схемд шошго тавь: термометр, хөргөгч, нэрмэл, буцлалтыг намдаах гранул.',
        'Thermometer at the top of the flask; condenser with water in and out; distillate in the receiving flask; granules in the boiling flask.', 'Термометр колбын дээд хэсэгт; хөргөгчид ус орж гарна; нэрмэл хүлээн авагчид; гранул буцалгах колбонд.',
        ['Did you put the thermometer at the side arm?', 'Did you put the granules in the boiling flask?'],
        ['Термометрийг хажуу хоолойн түвшинд тавьсан уу?', 'Гранулыг буцалгах колбонд тавьсан уу?']),
      t('Label an electrolysis cell: anode, cathode, electrolyte, and which electrode is positive.', 'Электролизийн эсэд шошго тавь: анод, катод, электролит, аль электрод эерэг вэ.',
        'Anode (positive electrode, oxidation); cathode (negative electrode, reduction); electrolyte (the molten or dissolved ionic compound).', 'Анод (эерэг электрод, исэлдэлт); катод (сөрөг электрод, бууралт); электролит (хайлсан эсвэл уусгасан ионт нэгдэл).',
        ['Did you label the anode as positive?', 'Did you label the electrolyte as the ionic compound?'],
        ['Анодыг эерэг гэж тэмдэглэсэн үү?', 'Электролитыг ионт нэгдэл гэж тэмдэглэсэн үү?'])
    ]
  },
  {
    word: 'List',
    wordMn: 'Жагсаа',
    definitionEn: 'Give a set of points or items, one after another, without explanation.',
    definitionMn: 'Цэг, зүйлийг тайлбаргүйгээр дараалан жагсаах.',
    tasks: [
      t('List three physical properties of metals.', 'Металлын гурван физик шинжийг жагсаа.',
        'Good conductor of heat; good conductor of electricity; malleable (or ductile, or shiny).', 'Дулаан дамжуулдаг; цахилгаан дамжуулдаг; цохиж хавтгайрдаг (эсвэл сунадаг, гялалздаг).',
        ['Did you give three items?', 'Did you avoid long explanations?'],
        ['Гурван зүйл өгсөн үү?', 'Урт тайлбар бичээгүй юу?']),
      t('List the halogens in order of increasing proton number.', 'Галогенүүдийг протоны тооны өсөх дарааллаар жагсаа.',
        'Fluorine, chlorine, bromine, iodine.', 'Фтор, хлор, бром, иод.',
        ['Did you put them in the correct order?', 'Did you list all four?'],
        ['Зөв дарааллаар бичсэн үү?', 'Дөрвөн элементийг бүгдийг нь бичсэн үү?'])
    ]
  },
  {
    word: 'Measure',
    wordMn: 'Хэмжих',
    definitionEn: 'Take a reading from an instrument, to the stated precision, with the correct unit.',
    definitionMn: 'Багажаас заасан нарийвчлалтайгаар, зөв нэгжтэйгээр уншилт авах.',
    tasks: [
      t('Measure the temperature of a solution with a thermometer, to the nearest 0.5 °C.', 'Термометрээр уусмалын температурыг 0.5 °C хүртэл хэмжинэ.',
        'Read the thermometer at eye level and record to 0.5 °C, for example 23.5 °C.', 'Термометрийг нүдний түвшинд уншиж, 0.5 °C хүртэл бичнэ, жишээ нь 23.5 °C.',
        ['Did you record to the stated precision?', 'Did you include the unit °C?'],
        ['Заасан нарийвчлалтайгаар бичсэн үү?', 'Нэгжийг °C гэж бичсэн үү?']),
      t('Measure 25.0 cm³ of sodium hydroxide solution accurately.', '25.0 см³ натрийн гидроксидын уусмалыг нарийн хэмжинэ.',
        'Use a 25.0 cm³ volumetric pipette, filled to the mark with the bottom of the meniscus level with it, and allowed to drain.', '25.0 см³ тодорхой эзлэхүүний пипетк ашиглан, хотгорын доод ирмэгийг тэмдэгтэй тэгшлэн дүүргэнэ.',
        ['Did you use a volumetric pipette?', 'Did you read the bottom of the meniscus at eye level?'],
        ['Тодорхой эзлэхүүний пипеткийг ашигласан уу?', 'Хотгорын доод ирмэгийг нүдний түвшинд уншсан уу?'])
    ]
  },
  {
    word: 'Name',
    wordMn: 'Нэрлэ',
    definitionEn: 'Give the correct name of a substance, process or feature, with no explanation needed.',
    definitionMn: 'Бодис, үйл явц, шинжийн зөв нэрийг тайлбаргүйгээр өгөх.',
    tasks: [
      t('Name the process in which a solid changes directly into a gas.', 'Хатуу бодис шууд хий болох үйл явцыг нэрлэ.',
        'Sublimation.', 'Сублимаци.',
        ['Did you give the correct process name?', 'Did you spell it correctly?'],
        ['Үйл явцын зөв нэрийг өгсөн үү?', 'Зөв бичсэн үү?']),
      t('Name the functional group in a carboxylic acid.', 'Карбоксилын хүчлийн функциональ бүлгийг нэрлэ.',
        'The carboxyl group, –COOH.', 'Карбоксил бүлэг, –COOH.',
        ['Did you name the carboxyl group?', 'Did you give its formula –COOH?'],
        ['Карбоксил бүлгийг нэрлэсэн үү?', 'Томьёо –COOH-ийг өгсөн үү?'])
    ]
  },
  {
    word: 'Outline',
    wordMn: 'Товч тоймло',
    definitionEn: 'Give the main points or steps briefly, without full detail.',
    definitionMn: 'Гол цэг, алхмыг товчоор, бүрэн дэлгэрэнгүйгээр бус өгөх.',
    tasks: [
      t('Outline the steps to prepare pure, dry crystals of copper(II) sulfate from copper(II) oxide and dilute sulfuric acid.', 'Зэсийн(II) исэл ба шингэрүүлсэн хүхрийн хүчлээс цэвэр, хуурай зэсийн(II) сульфатын талст бэлтгэх алхмыг товч тоймло.',
        'Add excess copper(II) oxide to warm acid; filter off the excess solid; evaporate to saturation and leave to crystallise; dry the crystals on filter paper.', 'Халуун хүчилд илүүдэл зэсийн(II) исэл нэмнэ; шүүнэ; ханалт хүртэл ууршуулж талстжуулна; шүүгч цаасан дээр хатаана.',
        ['Did you use excess oxide and filter it?', 'Did you crystallise rather than evaporate to dryness?'],
        ['Илүүдэл исэл ашиглаж шүүсэн үү?', 'Бүрэн хуурайтал бус, талстжуулсан уу?']),
      t('Outline how you would test for chloride ions.', 'Хлоридын ионыг яаж шалгахыг товч тоймло.',
        'Add dilute nitric acid, then silver nitrate solution. A white precipitate of silver chloride shows chloride ions are present.', 'Шингэрүүлсэн азотын хүчил, дараа нь мөнгөний нитрат нэмнэ. Цагаан тунадас (мөнгөний хлорид) хлоридын ион байгааг харуулна.',
        ['Did you add nitric acid first?', 'Did you name the white precipitate?'],
        ['Эхлээд азотын хүчил нэмсэн үү?', 'Цагаан тунадасыг нэрлэсэн үү?'])
    ]
  },
  {
    word: 'Predict',
    wordMn: 'Таамагла',
    definitionEn: 'Say what will happen in a new situation, using knowledge, a pattern or the data.',
    definitionMn: 'Мэдлэг, хэв маяг эсвэл өгөгдөлд үндэслэн шинэ нөхцөлд юу болохыг хэлэх.',
    tasks: [
      t('Predict the products when chlorine reacts with sodium bromide solution.', 'Хлор натрийн бромидын уусмалтай урвалд орвол бүтээгдэхүүнийг таамагла.',
        'Sodium chloride and bromine (Cl₂ + 2NaBr → 2NaCl + Br₂), because chlorine is more reactive than bromine.', 'Натрийн хлорид ба бром (Cl₂ + 2NaBr → 2NaCl + Br₂), хлор бромоос идэвхтэй тул.',
        ['Did you use the reactivity of the halogens?', 'Did you give both products?'],
        ['Галогений идэвхийг ашигласан уу?', 'Хоёр бүтээгдэхүүнийг бичсэн үү?']),
      t('Predict whether iron reacts with dilute hydrochloric acid, using the reactivity series.', 'Идэвхийн цувралыг ашиглан төмөр шингэрүүлсэн хлорын хүчилтэй урвалд орох эсэхийг таамагла.',
        'Yes. Iron is above hydrogen in the reactivity series, so it displaces hydrogen to form iron(II) chloride and hydrogen.', 'Тийм. Төмөр идэвхийн цувралд устөрөгчөөс дээгүүр тул устөрөгчийг орлуулж FeCl₂ ба устөрөгч үүсгэнэ.',
        ['Did you give yes or no with a reason?', 'Did you use the position of hydrogen in the series?'],
        ['Тийм/үгүй гэж шалтгаантай хэлсэн үү?', 'Устөрөгчийн байрлалыг ашигласан уу?'])
    ]
  },
  {
    word: 'Show',
    wordMn: 'Харуул (тооцоогоор)',
    definitionEn: 'Give the working or the evidence that leads to a given result, so that the result is confirmed.',
    definitionMn: 'Өгөгдсөн үр дүнд хүрэх бодолт, нотолгоог харуулж баталгаажуулах.',
    tasks: [
      t('Show that the empirical formula of a compound with 4.0 g carbon and 1.0 g hydrogen is CH₃.', '4.0 г нүүрстөрөгч, 1.0 г устөрөгчтэй нэгдлийн эмпирик томьёо CH₃ гэдгийг харуул.',
        'C: 4.0/12 = 0.333; H: 1.0/1 = 1.0. Ratio 0.333 : 1.0 = 1 : 3, so CH₃.', 'C: 4.0/12 = 0.333; H: 1.0. Харьцаа 0.333 : 1.0 = 1 : 3, тиймээс CH₃.',
        ['Did you divide by the atomic masses?', 'Did you divide by the smaller value to get 1:3?'],
        ['Атомын массад хуваасан уу?', 'Бага утгад хуваагаад 1:3 гарсан уу?']),
      t('Show, using the Boltzmann distribution, that the rate is greater at 50 °C than at 20 °C.', 'Больцманы тархалтыг ашиглан 50 °C-т хурд 20 °C-аас их гэдгийг харуул.',
        'At the higher temperature the curve shifts, so a greater fraction of particles have energy above the activation energy. More successful collisions happen each second.', 'Өндөр температурт муруй шилжиж, идэвхжүүлэх энергитэй бөөмийн хувь нэмэгдэнэ. Секунд тутамд амжилттай мөргөлдөөн олон болно.',
        ['Did you say the curve shifts?', 'Did you mention the activation energy?'],
        ['Муруй шилжсэнийг дурдсан уу?', 'Идэвхжүүлэх энергийг дурдсан уу?'])
    ]
  },
  {
    word: 'Sketch',
    wordMn: 'Ерөнхий зураг зур',
    definitionEn: 'Draw a rough diagram or graph that shows the general shape and the key features, not every detail.',
    definitionMn: 'Ерөнхий хэлбэр, гол шинжийг харуулсан хялбар зураг эсвэл график зурах.',
    tasks: [
      t('Sketch an energy profile for an exothermic reaction, labelling the reactants, products and activation energy.', 'Экзотермик урвалын энергийн муруйг ерөнхийд нь зур; урвалжууд, бүтээгдэхүүн, идэвхжүүлэх энергийг шошголо.',
        'Reactants start high, rise to a peak (activation energy), then fall to products that are lower than the reactants.', 'Урвалжууд өндөрт, оргил (Ea) хүртэл өсч, дараа нь урвалжаас доогуур бүтээгдэхүүн рүү буурна.',
        ['Did you show the products lower than the reactants?', 'Did you label the peak as activation energy?'],
        ['Бүтээгдэхүүн урвалжаас доогуур гэж зурсан уу?', 'Оргилыг идэвхжүүлэх энерги гэж шошголсон уу?']),
      t('Sketch a graph of gas volume against time for a reaction that slows down.', 'Удааширдаг урвалын хий эзлэхүүн–хугацааны графикийг ерөнхийд нь зур.',
        'A curve that rises steeply at first, then levels off as the reactant is used up.', 'Эхэндээ эрс өсөж, урвалж дуусах үед хөндлөнгөөр тогтдог муруй.',
        ['Did you show a steep start and a levelling off?', 'Did you label both axes?'],
        ['Эхэндээ эрс өсөх, дараа нь тогтохыг зурсан уу?', 'Хоёр тэнхлэгийг шошголсон уу?'])
    ]
  },
  {
    word: 'State',
    wordMn: 'Хэл',
    definitionEn: 'Give a short, clear answer in words or figures, without explanation.',
    definitionMn: 'Богино, тодорхой хариултыг үг, тоогоор тайлбаргүйгээр өгөх.',
    tasks: [
      t('State the colour of litmus in an alkali.', 'Шүлтэнд лакмусын өнгийг хэл.',
        'Blue.', 'Цэнхэр.',
        ['Did you give the colour?', 'Was your answer short?'],
        ['Өнгийг хэлсэн үү?', 'Хариулт богино байсан уу?']),
      t('State the meaning of the state symbol (aq).', '(aq) төлвийн тэмдгийн утгыг хэл.',
        'Aqueous: dissolved in water.', 'Усан уусмал: усанд уусгасан.',
        ['Did you say dissolved in water?', 'Was it a short answer?'],
        ['Усанд уусгасан гэж хэлсэн үү?', 'Хариулт богино байсан уу?'])
    ]
  },
  {
    word: 'Suggest',
    wordMn: 'Санал болго',
    definitionEn: 'Apply your knowledge to a new situation, giving a sensible possible answer or explanation.',
    definitionMn: 'Мэдлэгээ шинэ нөхцөлд хэрэглэж, боломжит, ухаалаг хариулт өгөх.',
    tasks: [
      t('Suggest one reason why the yield in a school experiment is lower than expected.', 'Сургуулийн туршилтад ургац хүлээгдсэнээс бага гарах нэг шалтгааныг санал болго.',
        'Some product was lost during filtration or when transferring between containers.', 'Шүүлт эсвэл сав хооронд шилжүүлэхэд зарим бүтээгдэхүүн алдагдсан.',
        ['Did you suggest a practical reason?', 'Did you link it to the experiment?'],
        ['Практик шалтгааныг санал болгосон уу?', 'Туршилттай холбосон уу?']),
      t('Suggest an improvement to make a titration more accurate.', 'Титрлэлтийг илүү нарийвчлалтай болгох сайжруулалтыг санал болго.',
        'Use a burette and pipette with finer graduations, repeat until concordant titres are obtained, and read the meniscus at eye level.', 'Илүү нарийн хуваарьтай бюретк, пипетк ашиглах; зөрүүгүй титр авах хүртэл давтах; хотгорыг нүдний түвшинд уншина.',
        ['Did you suggest a specific improvement?', 'Did you say why it helps?'],
        ['Тодорхой сайжруулалтыг санал болгосон уу?', 'Яагаад тусалдгийг хэлсэн үү?'])
    ]
  },
  {
    word: 'Use',
    wordMn: 'Ашигла',
    definitionEn: 'Apply the data, a table, a formula or the Periodic Table given in the question to get the answer.',
    definitionMn: 'Асуултад өгөгдсөн өгөгдөл, хүснэгт, томьёо, үелэх системийг ашиглан хариулт гаргах.',
    tasks: [
      t('Use the data (Mr of CO₂ = 44) to calculate the mass of 0.5 mol of CO₂.', 'Өгөгдлийг ашиглан (CO₂-ийн Mr = 44) 0.5 моль CO₂-ийн массыг тооцоол.',
        'Mass = 0.5 × 44 = 22 g.', 'Масс = 0.5 × 44 = 22 г.',
        ['Did you multiply the moles by Mr?', 'Did you give the unit g?'],
        ['Молийг Mr-оор үржүүлсэн үү?', 'Нэгжийг г гэж бичсэн үү?']),
      t('Use the Periodic Table to state the group and period of sodium.', 'Үелэх системийг ашиглан натрийн бүлэг, үеийг хэл.',
        'Group I, period 3.', 'I бүлэг, 3-р үе.',
        ['Did you give group I?', 'Did you give period 3?'],
        ['I бүлгийг өгсөн үү?', '3-р үеийг өгсөн үү?'])
    ]
  },
  {
    word: 'Write',
    wordMn: 'Бич',
    definitionEn: 'Give a formula, an equation or a name in the correct form, with the correct symbols and state symbols.',
    definitionMn: 'Томьёо, тэгшитгэл, нэрийг зөв хэлбэрээр, зөв тэмдэг, төлвийн тэмдэгтэйгээр бичих.',
    tasks: [
      t('Write the formula of aluminium oxide.', 'Хөнгөн цагааны ислийн томьёог бич.',
        'Al₂O₃', 'Al₂O₃',
        ['Did you balance the charges (Al³⁺ and O²⁻)?', 'Did you write the subscripts correctly?'],
        ['Цэнэгийг тэнцүүлсэн үү (Al³⁺, O²⁻)?', 'Доод индексийг зөв бичсэн үү?']),
      t('Write the ionic equation for the neutralisation of hydrochloric acid by sodium hydroxide.', 'Хлорын хүчлийг натрийн гидроксидоор саармагжуулах ионы тэгшитгэлийг бич.',
        'H⁺(aq) + OH⁻(aq) → H₂O(l)', 'H⁺(aq) + OH⁻(aq) → H₂O(l)',
        ['Did you cancel the spectator ions (Na⁺, Cl⁻)?', 'Did you include the state symbols?'],
        ['Үзэгчийн ионуудыг (Na⁺, Cl⁻) хасан уу?', 'Төлвийн тэмдгийг оруулсан уу?'])
    ]
  }
];
