// Worked examples for the Calculations hub: one or two for each chapter that involves calculations. Every step shows the
// working, and the examiner tip is what a teacher would tell a student about this kind of question. The questions are
// written for this app from the syllabus content; they are not copied from a Cambridge paper. The bond energies in the
// hydrogen example are given in its question.
export interface WorkedExampleItem {
  id: string;
  category: string;
  categoryMn: string;
  titleEn: string;
  titleMn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  syllabusRef: string;
  problemTextEn: string;
  problemTextMn: string;
  givenEn: string[];
  givenMn: string[];
  formulaUsed: string;
  stepsEn: { title: string; detail: string }[];
  stepsMn: { title: string; detail: string }[];
  finalAnswerEn: string;
  finalAnswerMn: string;
  examinerTipEn: string;
  examinerTipMn: string;
}

export const CHAPTER_WORKED_EXAMPLES: WorkedExampleItem[] = [
  {
    id: 'wx-empirical-formula',
    category: 'Empirical formula',
    categoryMn: 'Эмпирик томьёо',
    titleEn: 'Empirical formula from masses',
    titleMn: 'Масснаас эмпирик томьёо олох',
    difficulty: 'medium',
    syllabusRef: '0620/Topic 3.5',
    problemTextEn: 'A compound contains 2.40 g of carbon, 0.40 g of hydrogen and 3.20 g of oxygen. Find its empirical formula. (Ar: C = 12.0, H = 1.0, O = 16.0)',
    problemTextMn: 'Нэгдэл 2.40 г нүүрстөрөгч, 0.40 г устөрөгч, 3.20 г хүчилтөрөгч агуулдаг. Түүний эмпирик томьёог ол. (Ar: C = 12.0, H = 1.0, O = 16.0)',
    givenEn: ['C: 2.40 g', 'H: 0.40 g', 'O: 3.20 g', 'Ar: C = 12.0, H = 1.0, O = 16.0'],
    givenMn: ['C: 2.40 г', 'H: 0.40 г', 'O: 3.20 г', 'Ar: C = 12.0, H = 1.0, O = 16.0'],
    formulaUsed: 'moles = mass ÷ Ar; divide by the smallest',
    stepsEn: [
      { title: 'Moles of each element', detail: 'C: 2.40 ÷ 12.0 = 0.200 mol; H: 0.40 ÷ 1.0 = 0.40 mol; O: 3.20 ÷ 16.0 = 0.200 mol' },
      { title: 'Divide by the smallest', detail: '0.200 ÷ 0.200 = 1; 0.40 ÷ 0.200 = 2; 0.200 ÷ 0.200 = 1' },
      { title: 'Mole ratio', detail: 'C : H : O = 1 : 2 : 1' },
      { title: 'Empirical formula', detail: 'CH₂O' }
    ],
    stepsMn: [
      { title: 'Элемент бүрийн моль', detail: 'C: 2.40 ÷ 12.0 = 0.200 моль; H: 0.40 ÷ 1.0 = 0.40 моль; O: 3.20 ÷ 16.0 = 0.200 моль' },
      { title: 'Хамгийн бага утгад хуваах', detail: '0.200 ÷ 0.200 = 1; 0.40 ÷ 0.200 = 2; 0.200 ÷ 0.200 = 1' },
      { title: 'Моль харьцаа', detail: 'C : H : O = 1 : 2 : 1' },
      { title: 'Эмпирик томьёо', detail: 'CH₂O' }
    ],
    finalAnswerEn: 'CH₂O',
    finalAnswerMn: 'CH₂O',
    examinerTipEn: 'Divide by the smallest mole value before you look for whole numbers. If a ratio comes out as 1.5, multiply every value by 2. Write the final answer as whole numbers.',
    examinerTipMn: 'Бүхэл тоо хайхаасаа өмнө хамгийн бага моль утгад хуваа. Харьцаа 1.5 гарвал бүх утгыг 2-оор үрж бүхэл болго. Эцсийн хариуг бүхэл тооны харьцаагаар бич.'
  },
  {
    id: 'wx-bond-energy-water',
    category: 'Energy from bond energies',
    categoryMn: 'Холбооны энерги',
    titleEn: 'Enthalpy change from bond energies',
    titleMn: 'Холбооны энергээр ΔH тооцох',
    difficulty: 'medium',
    syllabusRef: '0620/Topic 5.2',
    problemTextEn: 'Hydrogen burns in oxygen: 2H₂ + O₂ → 2H₂O. Using the bond energies H–H = 436, O=O = 498 and O–H = 464 kJ/mol, calculate ΔH for the reaction.',
    problemTextMn: 'Устөрөгч хүчилтөрөгчид шатна: 2H₂ + O₂ → 2H₂O. Холбооны энерги H–H = 436, O=O = 498, O–H = 464 кЖ/моль гэж өгөгдсөн бол урвалын ΔH-ийг тооцоол.',
    givenEn: ['H–H = 436 kJ/mol (given in this question)', 'O=O = 498 kJ/mol', 'O–H = 464 kJ/mol'],
    givenMn: ['H–H = 436 кЖ/моль (энэ асуултад өгөгдсөн)', 'O=O = 498 кЖ/моль', 'O–H = 464 кЖ/моль'],
    formulaUsed: 'ΔH = energy of bonds broken − energy of bonds made',
    stepsEn: [
      { title: 'Bonds broken', detail: '2 × H–H + 1 × O=O = 2 × 436 + 498 = 872 + 498 = 1370 kJ' },
      { title: 'Bonds made', detail: '2H₂O contains 4 × O–H: 4 × 464 = 1856 kJ' },
      { title: 'ΔH = broken − made', detail: '1370 − 1856 = −486 kJ' },
      { title: 'Sign', detail: 'Negative, so the reaction is exothermic' }
    ],
    stepsMn: [
      { title: 'Тасарсан холбоо', detail: '2 × H–H + 1 × O=O = 2 × 436 + 498 = 872 + 498 = 1370 кЖ' },
      { title: 'Үүссэн холбоо', detail: '2H₂O-д 4 × O–H: 4 × 464 = 1856 кЖ' },
      { title: 'ΔH = тасарсан − үүссэн', detail: '1370 − 1856 = −486 кЖ' },
      { title: 'Тэмдэг', detail: 'Сөрөг тул урвал экзотерм' }
    ],
    finalAnswerEn: 'ΔH = −486 kJ (for the equation as written)',
    finalAnswerMn: 'ΔH = −486 кЖ (тэгшитгэлд заасан урвалд)',
    examinerTipEn: 'Count the bonds from the balanced equation, not from one molecule: 2H₂O has 4 O–H bonds. Always give the sign and say whether the reaction is exothermic or endothermic.',
    examinerTipMn: 'Холбоог тэнцвэржсэн тэгшитгэлээс тоол, нэг молекулаас бүү тоол: 2H₂O-д 4 O–H холбоо байна. Тэмдгийг заавал бич, урвал экзотерм эсвэл эндотерм гэж тайлбарла.'
  },
  {
    id: 'wx-calorimetry-fuel',
    category: 'Heat from a burning fuel',
    categoryMn: 'Түлшний дулаан (калориметр)',
    titleEn: 'Heat from burning a fuel (calorimetry)',
    titleMn: 'Түлш шатахад ялгарах дулаан (калориметр)',
    difficulty: 'medium',
    syllabusRef: '0620/Topic 5.3',
    problemTextEn: 'Ethanol (C₂H₅OH, Mr = 46) is burned under a beaker of water. 0.46 g of ethanol heats 100 g of water from 20.0 °C to 45.0 °C. Calculate the enthalpy change of combustion of ethanol in kJ/mol. (c of water = 4.18 J/g °C)',
    problemTextMn: 'Этанол (C₂H₅OH, Mr = 46) шатаж, 100 г усыг 20.0 °C-аас 45.0 °C хүртэл халаана. 0.46 г этанол шатсан бол этанолын шаталтын энтальпийн өөрчлөлтийг кЖ/моль-оор тооцоол. (Усны c = 4.18 Ж/г °C)',
    givenEn: ['Mass of ethanol = 0.46 g', 'Mass of water = 100 g', 'Temperature rise = 45.0 − 20.0 = 25.0 °C', 'c (water) = 4.18 J/g °C', 'Mr (ethanol) = 46'],
    givenMn: ['Этанолын масс = 0.46 г', 'Усны масс = 100 г', 'Температурын өсөлт = 45.0 − 20.0 = 25.0 °C', 'c (ус) = 4.18 Ж/г °C', 'Mr (этанол) = 46'],
    formulaUsed: 'q = m × c × ΔT;  moles = mass ÷ Mr;  ΔH = −q ÷ moles',
    stepsEn: [
      { title: 'Heat taken in by the water', detail: 'q = 100 × 4.18 × 25.0 = 10 450 J = 10.45 kJ' },
      { title: 'Moles of ethanol burned', detail: 'n = 0.46 ÷ 46 = 0.0100 mol' },
      { title: 'Heat released per mole', detail: '10.45 kJ ÷ 0.0100 mol = 1045 kJ/mol' },
      { title: 'Sign', detail: 'Burning gives out heat, so ΔH is negative: ΔH_c = −1045 kJ/mol' }
    ],
    stepsMn: [
      { title: 'Усанд шингэсэн дулаан', detail: 'q = 100 × 4.18 × 25.0 = 10 450 Ж = 10.45 кЖ' },
      { title: 'Шатсан этанолын моль', detail: 'n = 0.46 ÷ 46 = 0.0100 моль' },
      { title: 'Моль тутмын ялгарсан дулаан', detail: '10.45 кЖ ÷ 0.0100 моль = 1045 кЖ/моль' },
      { title: 'Тэмдэг', detail: 'Шатахад дулаан ялгарч байгаа тул ΔH сөрөг: ΔH_c = −1045 кЖ/моль' }
    ],
    finalAnswerEn: 'ΔH_c = −1045 kJ/mol',
    finalAnswerMn: 'ΔH_c = −1045 кЖ/моль',
    examinerTipEn: 'Convert joules to kilojoules before dividing by moles. The heat given out by the fuel equals the heat taken in by the water, so the sign is negative. Real experiments lose heat to the air, so the measured value is usually smaller than the data-book value.',
    examinerTipMn: 'Моль-д хуваахаасаа өмнө Ж-г кЖ-д хөрвүүл. Түлшний ялгаруулсан дулаан нь усны авсан дулаантай тэнцүү тул тэмдэг сөрөг. Бодит туршилтад дулаан агаарт алдагддаг тул хэмжсэн утга дата-номын утгаас ихэвчлэн бага гардаг.'
  },
  {
    id: 'wx-electrolysis-water-gas',
    category: 'Gas volumes from electrolysis',
    categoryMn: 'Электролизийн хийн эзлэхүүн',
    titleEn: 'Gas volumes from electrolysis of water',
    titleMn: 'Усны электролизээс хийн эзлэхүүн',
    difficulty: 'easy',
    syllabusRef: '0620/Topic 4.2',
    problemTextEn: 'Dilute sulfuric acid is electrolysed. 36 cm³ of hydrogen is collected at the cathode. Calculate the volume of oxygen collected at the anode, at the same temperature and pressure.',
    problemTextMn: 'Шингэрүүлсэн хүхрийн хүчлийг электролиз хийхэд катод дээр 36 см³ устөрөгч цугларлаа. Ижил температур, даралтанд анод дээр хэдэн см³ хүчилтөрөгч цугларах вэ?',
    givenEn: ['Hydrogen collected at the cathode = 36 cm³'],
    givenMn: ['Катод дээр цугларсан устөрөгч = 36 см³'],
    formulaUsed: 'Volume ratio from the equation: 2H₂O → 2H₂ + O₂, so H₂ : O₂ = 2 : 1',
    stepsEn: [
      { title: 'Ratio', detail: 'Hydrogen : oxygen = 2 : 1 by volume' },
      { title: 'Oxygen volume', detail: '36 ÷ 2 = 18 cm³' }
    ],
    stepsMn: [
      { title: 'Харьцаа', detail: 'Устөрөгч : хүчилтөрөгч = 2 : 1 (эзлэхүүнээр)' },
      { title: 'Хүчилтөрөгчийн эзлэхүүн', detail: '36 ÷ 2 = 18 см³' }
    ],
    finalAnswerEn: '18 cm³ of oxygen',
    finalAnswerMn: '18 см³ хүчилтөрөгч',
    examinerTipEn: 'The gas at the cathode is the larger volume here, hydrogen. Check which gas has the 2 in front of it in the equation before you use the ratio.',
    examinerTipMn: 'Энд катод дээрх хий, устөрөгч нь илүү их эзлэхүүнтэй. Харьцааг ашиглахаасаа өмнө тэгшитгэлд аль хийн өмнө 2 байгааг шалга.'
  },
  {
    id: 'wx-rate-gradient',
    category: 'Rate of reaction',
    categoryMn: 'Урвалын хурд',
    titleEn: 'Average rate from a gas-volume graph',
    titleMn: 'Графикаас урвалын хурд тооцох',
    difficulty: 'easy',
    syllabusRef: '0620/Topic 6.2',
    problemTextEn: 'A gas syringe records the volume of gas made. At 10 s the volume is 20 cm³, and at 30 s it is 52 cm³. Calculate the average rate of reaction between 10 s and 30 s.',
    problemTextMn: 'Хийн шприц үүссэн хийн эзлэхүүнийг бүртгэнэ. 10 с-д эзлэхүүн 20 см³, 30 с-д 52 см³ байв. 10 с-ээс 30 с хүртэлх дундаж урвалын хурдыг тооцоол.',
    givenEn: ['t₁ = 10 s, V₁ = 20 cm³', 't₂ = 30 s, V₂ = 52 cm³'],
    givenMn: ['t₁ = 10 с, V₁ = 20 см³', 't₂ = 30 с, V₂ = 52 см³'],
    formulaUsed: 'rate = change in volume ÷ change in time',
    stepsEn: [
      { title: 'Change in volume', detail: '52 − 20 = 32 cm³' },
      { title: 'Change in time', detail: '30 − 10 = 20 s' },
      { title: 'Rate', detail: '32 ÷ 20 = 1.6 cm³/s' }
    ],
    stepsMn: [
      { title: 'Эзлэхүүний өөрчлөлт', detail: '52 − 20 = 32 см³' },
      { title: 'Хугацааны өөрчлөлт', detail: '30 − 10 = 20 с' },
      { title: 'Хурд', detail: '32 ÷ 20 = 1.6 см³/с' }
    ],
    finalAnswerEn: '1.6 cm³/s',
    finalAnswerMn: '1.6 см³/с',
    examinerTipEn: 'Use two clear points on the straight part of the graph and say which points you used. Give the unit. For a curve, draw the tangent at the time asked and take its gradient.',
    examinerTipMn: 'Графикийн шулуун хэсгээс хоёр тодорхой цэг сонгож, аль цэгүүдийг ашигласнаа бич. Нэгжээ бүү мартаарай. Муруй дээр асуусан цагийн шүргэгчийн налууг ав.'
  },
  {
    id: 'wx-titration-acid',
    category: 'Titration concentration',
    categoryMn: 'Титрлэлтийн концентраци',
    titleEn: 'Concentration of an acid from a titration',
    titleMn: 'Титрлэлтээр хүчлийн концентраци',
    difficulty: 'medium',
    syllabusRef: '0620/Topic 7.2',
    problemTextEn: '25.0 cm³ of 0.100 mol/dm³ sodium hydroxide is titrated with hydrochloric acid. The average titre is 22.40 cm³. Calculate the concentration of the acid. (NaOH + HCl → NaCl + H₂O)',
    problemTextMn: '25.0 см³ 0.100 моль/дм³ натрийн гидроксидыг хлорын хүчлээр титрлэв. Дундаж титр 22.40 см³ байсан бол хүчлийн концентрацийг тооцоол. (NaOH + HCl → NaCl + H₂O)',
    givenEn: ['NaOH: 25.0 cm³, 0.100 mol/dm³', 'HCl average titre: 22.40 cm³'],
    givenMn: ['NaOH: 25.0 см³, 0.100 моль/дм³', 'HCl дундаж титр: 22.40 см³'],
    formulaUsed: 'n = c × V; c = n ÷ V (V in dm³)',
    stepsEn: [
      { title: 'Moles of NaOH', detail: '0.100 × 25.0 ÷ 1000 = 0.00250 mol' },
      { title: 'Mole ratio', detail: 'NaOH : HCl = 1 : 1, so moles of HCl = 0.00250 mol' },
      { title: 'Concentration of HCl', detail: '0.00250 ÷ (22.40 ÷ 1000) = 0.112 mol/dm³' }
    ],
    stepsMn: [
      { title: 'NaOH-ийн моль', detail: '0.100 × 25.0 ÷ 1000 = 0.00250 моль' },
      { title: 'Моль харьцаа', detail: 'NaOH : HCl = 1 : 1, тиймээс HCl = 0.00250 моль' },
      { title: 'HCl-ийн концентраци', detail: '0.00250 ÷ (22.40 ÷ 1000) = 0.112 моль/дм³' }
    ],
    finalAnswerEn: '0.112 mol/dm³ (3 s.f.)',
    finalAnswerMn: '0.112 моль/дм³ (3 орон)',
    examinerTipEn: 'Change cm³ to dm³ (divide by 1000) before you use c = n ÷ V. Average only the concordant titres, within 0.10 cm³ of each other, and never the rough titration. Give the answer to 3 significant figures.',
    examinerTipMn: 'c = n ÷ V-д хэрэглэхээс өмнө см³-ийг дм³ болгож 1000-д хуваа. Зөрүү нь 0.10 см³-ээс бага давтсан титрүүдийн дундажийг ав, ойролцоо титрийг бүү ашигла. Хариуг 3 орон хүртэл бич.'
  },
  {
    id: 'wx-9701-limiting-reagent',
    category: 'Limiting reagent',
    categoryMn: 'Хязгаарлагч урвалж',
    titleEn: 'Limiting reagent and mass of product',
    titleMn: 'Хязгаарлагч урвалж ба бүтээгдэхүүний масс',
    difficulty: 'hard',
    syllabusRef: '9701/2.7',
    problemTextEn: '3.00 g of magnesium is added to 100 cm³ of 0.500 mol/dm³ hydrochloric acid. Mg + 2HCl → MgCl₂ + H₂. Calculate the mass of magnesium chloride formed. (Ar: Mg = 24.3, Cl = 35.5)',
    problemTextMn: '3.00 г магнийг 100 см³ 0.500 моль/дм³ хлорсутөрөгчийн хүчилд хийв. Mg + 2HCl → MgCl₂ + H₂. Үүссэн магнийн хлоридын массыг тооцоол. (Ar: Mg = 24.3, Cl = 35.5)',
    givenEn: ['Mg: 3.00 g', 'HCl: 100 cm³, 0.500 mol/dm³', 'Ar: Mg = 24.3, Cl = 35.5'],
    givenMn: ['Mg: 3.00 г', 'HCl: 100 см³, 0.500 моль/дм³', 'Ar: Mg = 24.3, Cl = 35.5'],
    formulaUsed: 'moles = mass ÷ Mr; the limiting reagent gives the least product',
    stepsEn: [
      { title: 'Moles of Mg', detail: '3.00 ÷ 24.3 = 0.1235 mol' },
      { title: 'Moles of HCl', detail: '0.500 × 100 ÷ 1000 = 0.0500 mol' },
      { title: 'Limiting reagent', detail: 'All the Mg needs 2 × 0.1235 = 0.247 mol HCl. Only 0.0500 mol is present, so HCl is the limiting reagent' },
      { title: 'Moles of MgCl₂', detail: 'HCl : MgCl₂ = 2 : 1, so 0.0500 ÷ 2 = 0.0250 mol' },
      { title: 'Mass', detail: 'Mr(MgCl₂) = 24.3 + 2 × 35.5 = 95.3; 0.0250 × 95.3 = 2.38 g' }
    ],
    stepsMn: [
      { title: 'Mg-ийн моль', detail: '3.00 ÷ 24.3 = 0.1235 моль' },
      { title: 'HCl-ийн моль', detail: '0.500 × 100 ÷ 1000 = 0.0500 моль' },
      { title: 'Хязгаарлагч урвалж', detail: 'Бүх Mg-тэй урвалд 2 × 0.1235 = 0.247 моль HCl хэрэгтэй. Байгаа нь 0.0500 моль тул HCl хязгаарлагч' },
      { title: 'MgCl₂-ийн моль', detail: 'HCl : MgCl₂ = 2 : 1, тиймээс 0.0500 ÷ 2 = 0.0250 моль' },
      { title: 'Масс', detail: 'Mr(MgCl₂) = 24.3 + 2 × 35.5 = 95.3; 0.0250 × 95.3 = 2.38 г' }
    ],
    finalAnswerEn: '2.38 g',
    finalAnswerMn: '2.38 г',
    examinerTipEn: 'Find the limiting reagent by comparing the moles needed with the equation ratio. Use the limiting reagent for every later step. The mass of the reagent in excess is never the answer.',
    examinerTipMn: 'Хязгаарлагч урвалжийг тэгшитгэлийн харьцаатай харьцуулж тодорхойл. Дараагийн бүх тооцоолол хязгаарлагч урвалжаар хийгдэнэ. Илүүдэл урвалжийн масс хариу болж болохгүй.'
  },
  {
    id: 'wx-9701-ideal-gas',
    category: 'Ideal gas equation',
    categoryMn: 'Идеал хийн тэгшитгэл',
    titleEn: 'Volume of a gas from PV = nRT',
    titleMn: 'PV = nRT-ээр хийн эзлэхүүн',
    difficulty: 'medium',
    syllabusRef: '9701/4.2',
    problemTextEn: 'Calculate the volume occupied by 0.250 mol of an ideal gas at 298 K and 100 kPa. (R = 8.31 J K⁻¹ mol⁻¹)',
    problemTextMn: '0.250 моль идеал хий 298 К, 100 кПа-д эзлэх эзлэхүүнийг тооцоол. (R = 8.31 Ж К⁻¹ моль⁻¹)',
    givenEn: ['n = 0.250 mol', 'T = 298 K', 'P = 100 kPa', 'R = 8.31 J K⁻¹ mol⁻¹'],
    givenMn: ['n = 0.250 моль', 'T = 298 К', 'P = 100 кПа', 'R = 8.31 Ж К⁻¹ моль⁻¹'],
    formulaUsed: 'PV = nRT',
    stepsEn: [
      { title: 'Pressure in SI units', detail: '100 kPa = 100 000 Pa' },
      { title: 'Rearrange', detail: 'V = nRT ÷ P' },
      { title: 'Substitute', detail: 'V = 0.250 × 8.31 × 298 ÷ 100 000 = 6.19 × 10⁻³ m³' },
      { title: 'Convert to dm³', detail: '1 m³ = 1000 dm³, so V = 6.19 dm³' }
    ],
    stepsMn: [
      { title: 'Даралтыг SI нэгжид', detail: '100 кПа = 100 000 Па' },
      { title: 'Эргүүлэх', detail: 'V = nRT ÷ P' },
      { title: 'Орлуулах', detail: 'V = 0.250 × 8.31 × 298 ÷ 100 000 = 6.19 × 10⁻³ м³' },
      { title: 'дм³ руу хөрвүүлэх', detail: '1 м³ = 1000 дм³, тиймээс V = 6.19 дм³' }
    ],
    finalAnswerEn: '6.19 dm³',
    finalAnswerMn: '6.19 дм³',
    examinerTipEn: 'Use kelvin for temperature and pascals for pressure. The units then cancel to m³, and you convert to dm³ at the end.',
    examinerTipMn: 'Температурыг кельвинээр (°C + 273), даралтыг паскалиар авна. Ингэснээр нэгжүүд м³ болж хасагдана, эцэст нь дм³ руу хөрвүүлнэ.'
  },
  {
    id: 'wx-9701-formation-enthalpy',
    category: 'Enthalpy change',
    categoryMn: 'Энтальпийн өөрчлөлт',
    titleEn: 'ΔH from enthalpies of formation',
    titleMn: 'Үүсэх энтальпиэр ΔH тооцох',
    difficulty: 'medium',
    syllabusRef: '9701/5.2',
    problemTextEn: 'Ethene reacts with hydrogen: C₂H₄(g) + H₂(g) → C₂H₆(g). ΔHf(C₂H₄) = +52 kJ/mol and ΔHf(C₂H₆) = −85 kJ/mol. Calculate ΔH for the reaction.',
    problemTextMn: 'Этен устөрөгчтэй урвална: C₂H₄(г) + H₂(г) → C₂H₆(г). ΔHf(C₂H₄) = +52 кЖ/моль, ΔHf(C₂H₆) = −85 кЖ/моль гэж өгөгдсөн бол урвалын ΔH-ийг тооцоол.',
    givenEn: ['ΔHf(C₂H₄) = +52 kJ/mol', 'ΔHf(C₂H₆) = −85 kJ/mol', 'ΔHf(H₂) = 0 (element in its standard state)'],
    givenMn: ['ΔHf(C₂H₄) = +52 кЖ/моль', 'ΔHf(C₂H₆) = −85 кЖ/моль', 'ΔHf(H₂) = 0 (стандарт төлөвт энгийн бодис)'],
    formulaUsed: 'ΔH = ΣΔHf(products) − ΣΔHf(reactants)',
    stepsEn: [
      { title: 'Products', detail: 'C₂H₆: −85 kJ/mol' },
      { title: 'Reactants', detail: 'C₂H₄ + H₂ = +52 + 0 = +52 kJ/mol' },
      { title: 'ΔH', detail: '−85 − (+52) = −137 kJ/mol' }
    ],
    stepsMn: [
      { title: 'Бүтээгдэхүүн', detail: 'C₂H₆: −85 кЖ/моль' },
      { title: 'Урвалж', detail: 'C₂H₄ + H₂ = +52 + 0 = +52 кЖ/моль' },
      { title: 'ΔH', detail: '−85 − (+52) = −137 кЖ/моль' }
    ],
    finalAnswerEn: '−137 kJ/mol',
    finalAnswerMn: '−137 кЖ/моль',
    examinerTipEn: 'An element in its standard state has ΔHf = 0, so H₂ adds nothing. Put a positive value in brackets when you subtract it: −85 − (+52). Forgetting the bracket is the most common error.',
    examinerTipMn: 'Стандарт төлөвт энгийн бодисын ΔHf = 0 тул H₂ утга нэмэхгүй. Эерэг утгыг хасахдаа хаалтанд бич: −85 − (+52). Хаалтыг мартах нь хамгийн түгээмэл алдаа.'
  },
  {
    id: 'wx-9701-cell-emf',
    category: 'Electrochemical cell',
    categoryMn: 'Гальван элемент',
    titleEn: 'Standard e.m.f. of a cell',
    titleMn: 'Элементийн стандарт e.m.f.',
    difficulty: 'medium',
    syllabusRef: '9701/6.3',
    problemTextEn: 'Calculate the standard e.m.f. of a cell made from Zn²⁺/Zn (E° = −0.76 V) and Cu²⁺/Cu (E° = +0.34 V). Which electrode is positive?',
    problemTextMn: 'Zn²⁺/Zn (E° = −0.76 В) ба Cu²⁺/Cu (E° = +0.34 В) хагас элементүүдээс бүрдсэн элементийн стандарт e.m.f.-ийг тооцоол. Аль электрод эерэг вэ?',
    givenEn: ['E°(Zn²⁺/Zn) = −0.76 V', 'E°(Cu²⁺/Cu) = +0.34 V'],
    givenMn: ['E°(Zn²⁺/Zn) = −0.76 В', 'E°(Cu²⁺/Cu) = +0.34 В'],
    formulaUsed: 'E°cell = E°(positive electrode) − E°(negative electrode)',
    stepsEn: [
      { title: 'Positive electrode', detail: 'Cu²⁺/Cu has the more positive E°, so copper is the positive electrode (cathode)' },
      { title: 'Calculate', detail: '+0.34 − (−0.76) = +1.10 V' }
    ],
    stepsMn: [
      { title: 'Эерэг электрод', detail: 'E° илүү эерэг Cu²⁺/Cu тул зэс нь эерэг электрод (катод)' },
      { title: 'Тооцоо', detail: '+0.34 − (−0.76) = +1.10 В' }
    ],
    finalAnswerEn: '+1.10 V; copper is the positive electrode',
    finalAnswerMn: '+1.10 В; эерэг электрод нь зэс',
    examinerTipEn: 'Subtracting a negative value adds it: +0.34 − (−0.76) = +1.10 V. The positive electrode is the one with the more positive E°, and reduction happens there.',
    examinerTipMn: 'Сөрөг утгыг хасахад нэмэгдэнэ: +0.34 − (−0.76) = +1.10 В. Эерэг электрод нь E° илүү эерэг электрод бөгөөд там бууралт тэнд явагдана.'
  },
  {
    id: 'wx-9701-kc',
    category: 'Equilibrium constant Kc',
    categoryMn: 'Тэнцвэрийн тогтмол Kc',
    titleEn: 'Calculate Kc from equilibrium concentrations',
    titleMn: 'Тэнцвэрийн концентрациар Kc тооцох',
    difficulty: 'medium',
    syllabusRef: '9701/7.1',
    problemTextEn: 'H₂(g) + I₂(g) ⇌ 2HI(g). At equilibrium [HI] = 0.40, [H₂] = 0.10 and [I₂] = 0.20 mol dm⁻³. Calculate Kc and state its units.',
    problemTextMn: 'H₂(г) + I₂(г) ⇌ 2HI(г) тэнцвэрт [HI] = 0.40, [H₂] = 0.10, [I₂] = 0.20 моль дм⁻³ байв. Kc-г тооцоолж, нэгжийг тодорхойл.',
    givenEn: ['[HI] = 0.40 mol dm⁻³', '[H₂] = 0.10 mol dm⁻³', '[I₂] = 0.20 mol dm⁻³'],
    givenMn: ['[HI] = 0.40 моль дм⁻³', '[H₂] = 0.10 моль дм⁻³', '[I₂] = 0.20 моль дм⁻³'],
    formulaUsed: 'Kc = [products]ⁿ ÷ [reactants]ⁿ',
    stepsEn: [
      { title: 'Expression', detail: 'Kc = [HI]² ÷ ([H₂] × [I₂])' },
      { title: 'Substitute', detail: 'Kc = (0.40)² ÷ (0.10 × 0.20) = 0.16 ÷ 0.020' },
      { title: 'Value', detail: 'Kc = 8.0' },
      { title: 'Units', detail: 'The number of moles is 2 on each side, so Kc has no units' }
    ],
    stepsMn: [
      { title: 'Илэрхийлэл', detail: 'Kc = [HI]² ÷ ([H₂] × [I₂])' },
      { title: 'Орлуулах', detail: 'Kc = (0.40)² ÷ (0.10 × 0.20) = 0.16 ÷ 0.020' },
      { title: 'Утга', detail: 'Kc = 8.0' },
      { title: 'Нэгж', detail: 'Хоёр талд моль тоо тэнцүү (2 = 2) тул Kc-д нэгж байхгүй' }
    ],
    finalAnswerEn: 'Kc = 8.0 (no units)',
    finalAnswerMn: 'Kc = 8.0 (нэгжгүй)',
    examinerTipEn: 'Put each concentration in brackets and square the product term. Kc has units only when the moles differ on the two sides. Do not mix Kc with Kp, which uses partial pressures.',
    examinerTipMn: 'Концентраци бүрийг хаалтанд бич, бүтээгдэхүүний гишүүнийг квадрат болго. Kc-д нэгж зөвхөн хоёр талын моль тоо өөр байвал гарна. Даралтаар тооцсон Kp-тэй бүү холь.'
  },
  {
    id: 'wx-9701-half-life',
    category: 'Half-life of a first-order reaction',
    categoryMn: 'Хагас задралын хугацаа',
    titleEn: 'Half-life and rate constant from concentrations',
    titleMn: 'Концентрациар хагас задралын хугацаа ба k',
    difficulty: 'hard',
    syllabusRef: '9701/8.3',
    problemTextEn: 'The concentration of A falls from 0.80 to 0.20 mol dm⁻³ in 60 s. Assuming first-order kinetics, calculate the half-life and the rate constant k.',
    problemTextMn: 'A-ийн концентраци 60 с-ийн дотор 0.80-аас 0.20 моль дм⁻³ хүртэл буурав. Нэг эрэмбийн урвал гэж үзэн хагас задралын хугацаа ба хурдны тогтмол k-г тооцоол.',
    givenEn: ['[A] at start = 0.80 mol dm⁻³', '[A] after 60 s = 0.20 mol dm⁻³', 'first-order reaction'],
    givenMn: ['Эхний [A] = 0.80 моль дм⁻³', '60 с-ийн дараа [A] = 0.20 моль дм⁻³', 'нэг эрэмбийн урвал'],
    formulaUsed: 't½ = 0.693 ÷ k',
    stepsEn: [
      { title: 'Count the halvings', detail: '0.80 → 0.40 → 0.20 is two half-lives' },
      { title: 'Half-life', detail: 't½ = 60 ÷ 2 = 30 s' },
      { title: 'Rate constant', detail: 'k = 0.693 ÷ 30 = 0.0231 s⁻¹' }
    ],
    stepsMn: [
      { title: 'Хагаслалтыг тоолох', detail: '0.80 → 0.40 → 0.20 нь 2 хагас задралын хугацаа' },
      { title: 'Хагас задралын хугацаа', detail: 't½ = 60 ÷ 2 = 30 с' },
      { title: 'Хурдны тогтмол', detail: 'k = 0.693 ÷ 30 = 0.0231 с⁻¹' }
    ],
    finalAnswerEn: 't½ = 30 s; k = 0.0231 s⁻¹',
    finalAnswerMn: 't½ = 30 с; k = 0.0231 с⁻¹',
    examinerTipEn: 'Count the halvings from the concentrations first. For a first-order reaction the half-life does not depend on the starting concentration, and ln 2 = 0.693 is the number to use.',
    examinerTipMn: 'Эхлээд концентрацийн хагаслалтыг тоол. Нэг эрэмбийн урвалын хагас задралын хугацаа эхний концентрацаас хамаарахгүй, ln 2 = 0.693 гэдгийг ашигла.'
  }
];
