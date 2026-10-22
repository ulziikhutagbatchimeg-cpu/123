import type { WorkedExample } from '../types/chemistry';

// Worked examples from the AS 9701 revision deck, kept only where the IGCSE 0620 syllabus covers the same
// content. Each one is adapted to the 0620 wording. Keyed by the topic number (for example '3.3').
// AS-only parts (mechanisms, Kc/Kp, pV = nRT, IR/MS, Hess, Group II, Boltzmann curves) are left out.

const ex = (e: WorkedExample) => e;

export const DECK_EXAMPLES: Record<string, WorkedExample[]> = {
  '2.2': [
    ex({
      id: 'deck-2-2-ion-particles',
      titleEn: 'Protons, neutrons and electrons in an ion',
      titleMn: 'Ионы протон, нейтрон, электроныг тоолох',
      questionEn: 'How many protons, neutrons and electrons are in the ion ⁵²Cr³⁺? (proton number Z = 24)',
      questionMn: '⁵²Cr³⁺ ионд хэдэн протон, нейтрон, электрон байгаа вэ? (протоны тоо Z = 24)',
      stepsEn: [
        'Protons = proton number Z = 24',
        'Neutrons = nucleon number − proton number = 52 − 24 = 28',
        'Electrons = protons − charge = 24 − 3 = 21 (the 3+ ion has lost 3 electrons)'
      ],
      stepsMn: [
        'Протон = протоны тоо Z = 24',
        'Нейтрон = нуклоны тоо − протоны тоо = 52 − 24 = 28',
        'Электрон = протон − цэнэг = 24 − 3 = 21 (3+ ион 3 электрон алдсан)'
      ],
      finalAnswerEn: '24 protons, 28 neutrons, 21 electrons',
      finalAnswerMn: '24 протон, 28 нейтрон, 21 электрон',
      examinerTipEn: 'For a positive ion, electrons = protons − charge. For a negative ion, electrons = protons + charge.',
      examinerTipMn: 'Эерэг ионд электрон = протон − цэнэг. Сөрөг ионд электрон = протон + цэнэг.',
      commonMistakeEn: 'Using the nucleon number (52) as the number of protons, or giving the electrons of an ion as equal to the protons.',
      commonMistakeMn: 'Протоны тоонд нуклоны тоо (52)-г ашиглах, эсвэл ионы электроныг протонтой адил гэж бичих.'
    })
  ],

  '2.3': [
    ex({
      id: 'deck-2-3-copper-ar',
      titleEn: 'Relative atomic mass from isotope abundances',
      titleMn: 'Изотопын хувиас харьцангуй атомын масс олох',
      questionEn:
        'Copper has two isotopes: ⁶³Cu (mass 62.930, 69.15 %) and ⁶⁵Cu (mass 64.928, 30.85 %). Calculate the relative atomic mass of copper to 2 decimal places.',
      questionMn:
        'Зэс хоёр изотоптой: ⁶³Cu (масс 62.930, 69.15 %) ба ⁶⁵Cu (масс 64.928, 30.85 %). Зэсийн харьцангуй атомын массыг 2 оронгоор тооцоол.',
      stepsEn: [
        'Multiply each isotope mass by its percentage abundance',
        '62.930 × 69.15 = 4351.6 and 64.928 × 30.85 = 2003.0',
        'Add the two results: 4351.6 + 2003.0 = 6354.6',
        'Divide by 100, the total abundance: 6354.6 ÷ 100 = 63.55'
      ],
      stepsMn: [
        'Изотоп бүрийн массыг түүний хувиар үржүүлнэ',
        '62.930 × 69.15 = 4351.6 ба 64.928 × 30.85 = 2003.0',
        'Хоёр үр дүнг нэмнэ: 4351.6 + 2003.0 = 6354.6',
        'Нийт хувь 100-д хуваана: 6354.6 ÷ 100 = 63.55'
      ],
      finalAnswerEn: 'Ar(Cu) = 63.55',
      finalAnswerMn: 'Ar(Cu) = 63.55',
      examinerTipEn: 'The abundances are percentages, so divide the sum by 100. Give the answer to the number of decimal places asked for.',
      examinerTipMn: 'Хувь тул нийлбэрийг 100-д хуваана. Асуусан оронгоор хариултаа бичнэ.',
      commonMistakeEn: 'Using the mass numbers (63 and 65) instead of the isotope masses given in the question. Isotopes have the same chemical properties, but their masses differ.',
      commonMistakeMn: 'Асуултад өгсөн изотопын массын оронд массын тоо (63, 65)-г ашиглах. Изотопууд химийн шинжээрээ адил, харин массаараа ялгаатай.'
    })
  ],

  '2.6': [
    ex({
      id: 'deck-2-6-graphite-conducts',
      titleEn: 'Why graphite conducts and diamond does not',
      titleMn: 'Графит яагаад дамжуулдаг, алмаз яагаад дамжуулдаггүй вэ',
      questionEn: 'Explain why graphite conducts electricity but diamond does not.',
      questionMn: 'Графит яагаад цахилгаан дамжуулдаг, харин алмаз яагаад дамжуулдаггүй вэ? Тайлбарла.',
      stepsEn: [
        'Graphite: each carbon atom bonds to 3 others, so each atom has one delocalised electron',
        'The delocalised electrons move freely between the layers and carry the charge',
        'Diamond: each carbon atom bonds to 4 others, so all outer electrons are used in bonds',
        'Diamond therefore has no free electrons to carry the charge'
      ],
      stepsMn: [
        'Графит: нүүрстөрөгч бүр 3 атомтай холбогдож, атом бүр нэг делокалчлагдсан электронтой',
        'Делокалчлагдсан электрон давхарга хооронд чөлөөтэй хөдөлж цэнэг зөөнө',
        'Алмаз: нүүрстөрөгч бүр 4 атомтай холбогдож, гаднах бүх электрон холбоонд орно',
        'Тиймээс алмазт цэнэг зөөх чөлөөт электрон байхгүй'
      ],
      finalAnswerEn: 'Graphite has delocalised electrons that move and carry charge; diamond has none.',
      finalAnswerMn: 'Графит цэнэг зөөдөг, хөдөлж чаддаг делокалчлагдсан электронтой; алмазт байхгүй.',
      examinerTipEn: 'Name the particles that carry the charge (delocalised electrons). Do not say that ions move in graphite.',
      examinerTipMn: 'Цэнэг зөөж буй бөөмийг нэрлэ (делокалчлагдсан электрон). Графитад ион хөдөлнө гэж бүү бич.',
      commonMistakeEn: 'Saying that ions move through graphite, or calling graphite a metal.',
      commonMistakeMn: 'Графитад ион хөдөлнө гэх, эсвэл графитыг металл гэх.'
    })
  ],

  '3.3': [
    ex({
      id: 'deck-3-3-limiting-yield',
      titleEn: 'Limiting reactant and percentage yield',
      titleMn: 'Хязгаарлагч урвалж ба гарцын хувь',
      questionEn:
        '2.43 g of magnesium reacts with 50.0 cm³ of 2.00 mol/dm³ hydrochloric acid: Mg + 2HCl → MgCl₂ + H₂. 3.80 g of MgCl₂ (Mr = 95.3) is formed. Find the limiting reactant and the percentage yield.',
      questionMn:
        '2.43 г магни 50.0 см³ 2.00 моль/дм³ давсны хүчилтэй урвалд орно: Mg + 2HCl → MgCl₂ + H₂. 3.80 г MgCl₂ (Mr = 95.3) үүснэ. Хязгаарлагч урвалжийг ба гарцын хувийг ол.',
      stepsEn: [
        'Moles of Mg = 2.43 ÷ 24.3 = 0.100 mol',
        'Moles of HCl = 2.00 × 0.0500 = 0.100 mol (volume in dm³)',
        'Mg : HCl is 1 : 2, so 0.100 mol Mg needs 0.200 mol HCl. Only 0.100 mol is present, so HCl is the limiting reactant',
        'Theoretical moles of MgCl₂ = 0.100 ÷ 2 = 0.0500 mol; mass = 0.0500 × 95.3 = 4.77 g',
        'Percentage yield = 3.80 ÷ 4.77 × 100 = 79.7 %'
      ],
      stepsMn: [
        'Mg-ийн моль = 2.43 ÷ 24.3 = 0.100 моль',
        'HCl-ийн моль = 2.00 × 0.0500 = 0.100 моль (эзлэхүүн дм³-аар)',
        'Mg : HCl = 1 : 2 тул 0.100 моль Mg-д 0.200 моль HCl хэрэгтэй. Байгаа нь 0.100 моль тул HCl хязгаарлагч',
        'Онолын MgCl₂-ийн моль = 0.100 ÷ 2 = 0.0500 моль; масс = 0.0500 × 95.3 = 4.77 г',
        'Гарцын хувь = 3.80 ÷ 4.77 × 100 = 79.7 %'
      ],
      finalAnswerEn: 'HCl is limiting; percentage yield = 79.7 %',
      finalAnswerMn: 'HCl хязгаарлагч; гарцын хувь = 79.7 %',
      examinerTipEn: 'Work out the theoretical yield from the limiting reactant, never from the one in excess.',
      examinerTipMn: 'Онолын гарцыг хязгаарлагч урвалжаас тооцоол, илүүдэл урвалжаас бүү тооцоол.',
      commonMistakeEn: 'Working out the theoretical yield from the reactant in excess (Mg).',
      commonMistakeMn: 'Илүүдэл урвалж (Mg)-аас онолын гарцыг тооцох.'
    }),
    ex({
      id: 'deck-3-3-caco3-purity',
      titleEn: 'Percentage purity of calcium carbonate',
      titleMn: 'Кальцийн карбонатын цэвэршлийн хувь',
      questionEn:
        '2.00 g of impure calcium carbonate reacts with excess hydrochloric acid and gives 0.440 g of carbon dioxide. Calculate the percentage purity of the calcium carbonate.',
      questionMn:
        '2.00 г бохир кальцийн карбонат илүүдэл давсны хүчилтэй урвалд орж 0.440 г нүүрсхүчлийн хий өгөв. Кальцийн карбонатын цэвэршлийн хувийг тооцоол.',
      stepsEn: [
        'Moles of CO₂ = 0.440 ÷ 44.0 = 0.0100 mol',
        'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂: the ratio is 1 : 1, so moles of CaCO₃ = 0.0100 mol',
        'Mass of pure CaCO₃ = 0.0100 × 100.0 = 1.00 g',
        'Purity = 1.00 ÷ 2.00 × 100 = 50.0 %'
      ],
      stepsMn: [
        'CO₂-ийн моль = 0.440 ÷ 44.0 = 0.0100 моль',
        'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂: харьцаа 1 : 1 тул CaCO₃-ийн моль = 0.0100 моль',
        'Цэвэр CaCO₃-ийн масс = 0.0100 × 100.0 = 1.00 г',
        'Цэвэршил = 1.00 ÷ 2.00 × 100 = 50.0 %'
      ],
      finalAnswerEn: 'Purity = 50.0 %',
      finalAnswerMn: 'Цэвэршил = 50.0 %',
      examinerTipEn: 'Purity = mass of pure substance ÷ mass of the sample × 100. Use the mole ratio from the equation.',
      examinerTipMn: 'Цэвэршил = цэвэр бодисын масс ÷ дээжийн масс × 100. Тэгшитгэлийн моль харьцааг ашигла.',
      commonMistakeEn: 'Using the 2.00 g sample mass as the mass of pure calcium carbonate.',
      commonMistakeMn: 'Дээжийн 2.00 г массыг цэвэр кальцийн карбонатын масс гэж ашиглах.'
    }),
    ex({
      id: 'deck-3-3-empirical-b4c',
      titleEn: 'Empirical formula from percentage composition',
      titleMn: 'Массын хувиас эмпирик томьёо олох',
      questionEn: 'Boron carbide contains 78.3 % boron and 21.7 % carbon by mass. Find its empirical formula. (Ar: B = 10.8, C = 12.0)',
      questionMn: 'Бор карбидын массын 78.3 % нь бор, 21.7 % нь нүүрстөрөгч. Эмпирик томьёог ол. (Ar: B = 10.8, C = 12.0)',
      stepsEn: [
        'Divide each percentage by its Ar: B: 78.3 ÷ 10.8 = 7.25; C: 21.7 ÷ 12.0 = 1.81',
        'Divide both by the smaller number: B: 7.25 ÷ 1.81 = 4.0; C: 1.81 ÷ 1.81 = 1.0',
        'Ratio B : C = 4 : 1, so the empirical formula is B₄C'
      ],
      stepsMn: [
        'Хувь бүрийг Ar-д хуваана: B: 78.3 ÷ 10.8 = 7.25; C: 21.7 ÷ 12.0 = 1.81',
        'Хоёуланг бага тоонд хуваана: B: 7.25 ÷ 1.81 = 4.0; C: 1.81 ÷ 1.81 = 1.0',
        'B : C = 4 : 1 тул эмпирик томьёо B₄C'
      ],
      finalAnswerEn: 'B₄C',
      finalAnswerMn: 'B₄C',
      examinerTipEn: 'Keep the full calculator value until the last step. Round only the final ratio to whole numbers.',
      examinerTipMn: 'Тооцоолуурын бүтэн утгыг эцсийн алхам хүртэл хадгал. Харьцааг эцэст нь бүхэл тоонд дугуйл.',
      commonMistakeEn: 'Rounding 1.81 to 2 too early. That gives B₂C, which is wrong.',
      commonMistakeMn: 'Хэт эрт 1.81-ийг 2 болгон дугуйлах. Ингэвэл B₂C гарч буруу болно.'
    })
  ],

  '5.1': [
    ex({
      id: 'deck-5-1-neutralisation-dh',
      titleEn: 'Enthalpy change of neutralisation from temperature rise',
      titleMn: 'Температурын өөрчлөлтөөр саармагжилтийн ΔH олох',
      questionEn:
        '25.0 cm³ of 2.00 mol/dm³ hydrochloric acid is mixed with 25.0 cm³ of 2.00 mol/dm³ sodium hydroxide. The temperature rises by 13.4 °C. Calculate the enthalpy change of neutralisation. (Density of the solution 1.00 g/cm³; c = 4.18 J/g/°C.)',
      questionMn:
        '25.0 см³ 2.00 моль/дм³ давсны хүчлийг 25.0 см³ 2.00 моль/дм³ натрийн гидроксидтой хольсон. Температур 13.4 °C өсөв. Саармагжилтийн энтальпийн өөрчлөлтийг тооцоол. (Уусмалын нягт 1.00 г/см³; c = 4.18 Ж/г/°C.)',
      stepsEn: [
        'Total volume = 25.0 + 25.0 = 50.0 cm³, so the mass of solution m = 50.0 g',
        'Heat absorbed by the solution q = mcΔT = 50.0 × 4.18 × 13.4 = 2801 J = 2.801 kJ',
        'Moles of water formed = moles of acid (limiting) = 2.00 × 0.0250 = 0.0500 mol',
        'ΔH = −2.801 ÷ 0.0500 = −56.0 kJ/mol (the temperature rose, so the reaction is exothermic)'
      ],
      stepsMn: [
        'Нийт эзлэхүүн = 25.0 + 25.0 = 50.0 см³, тиймээс уусмалын масс m = 50.0 г',
        'Уусмалын шингээсэн дулаан q = mcΔT = 50.0 × 4.18 × 13.4 = 2801 Ж = 2.801 кЖ',
        'Үүссэн усны моль = хүчлийн моль (хязгаарлагч) = 2.00 × 0.0250 = 0.0500 моль',
        'ΔH = −2.801 ÷ 0.0500 = −56.0 кЖ/моль (температур өссөн тул экзотерм урвал)'
      ],
      finalAnswerEn: 'ΔH = −56.0 kJ/mol',
      finalAnswerMn: 'ΔH = −56.0 кЖ/моль',
      examinerTipEn: 'Convert J to kJ before dividing by moles. A temperature rise means an exothermic reaction, so ΔH is negative.',
      examinerTipMn: 'Мольд хуваахаас өмнө Ж-ийг кЖ болго. Температур өссөн бол экзотерм урвал тул ΔH сөрөг.',
      commonMistakeEn: 'Using the mass of only one solution (25 g), or leaving out the minus sign.',
      commonMistakeMn: 'Зөвхөн нэг уусмалын массыг (25 г) ашиглах, эсвэл хасах тэмдгийг орхих.'
    }),
    ex({
      id: 'deck-5-1-bond-energy-methane',
      titleEn: 'Enthalpy change from bond energies',
      titleMn: 'Холбооны энергээр ΔH тооцох',
      questionEn:
        'Use the bond energies C–H 410, O=O 496, C=O 805 and O–H 460 kJ/mol to calculate ΔH for CH₄ + 2O₂ → CO₂ + 2H₂O(g).',
      questionMn:
        'C–H 410, O=O 496, C=O 805, O–H 460 кЖ/моль холбооны энергийг ашиглан CH₄ + 2O₂ → CO₂ + 2H₂O(g) урвалын ΔH-ийг тооцоол.',
      stepsEn: [
        'Bonds broken: 4 × C–H + 2 × O=O = 4(410) + 2(496) = 2632 kJ',
        'Bonds made: 2 × C=O + 4 × O–H = 2(805) + 4(460) = 3450 kJ',
        'ΔH = energy in (broken) − energy out (made) = 2632 − 3450 = −818 kJ/mol'
      ],
      stepsMn: [
        'Задарсан холбоо: 4 × C–H + 2 × O=O = 4(410) + 2(496) = 2632 кЖ',
        'Үүссэн холбоо: 2 × C=O + 4 × O–H = 2(805) + 4(460) = 3450 кЖ',
        'ΔH = орсон энерги (задарсан) − гарсан энерги (үүссэн) = 2632 − 3450 = −818 кЖ/моль'
      ],
      finalAnswerEn: 'ΔH = −818 kJ/mol',
      finalAnswerMn: 'ΔH = −818 кЖ/моль',
      examinerTipEn: 'Breaking bonds takes energy; making bonds gives out energy. Use ΔH = Σ(bonds broken) − Σ(bonds made).',
      examinerTipMn: 'Холбоо задлахад энерги орно, холбоо үүсгэхэд энерги гарна. ΔH = Σ(задарсан холбоо) − Σ(үүссэн холбоо).',
      commonMistakeEn: 'Counting only one C=O in CO₂ (there are two), or reversing the subtraction.',
      commonMistakeMn: 'CO₂-д нэг C=O л гэж тоолох (хоёр байдаг), эсвэл хасалтыг эсрэг хийх.'
    })
  ],

  '6.2': [
    ex({
      id: 'deck-6-2-rate-from-data',
      titleEn: 'Average rate from concentration data',
      titleMn: 'Концентрацийн өгөгдлөөс дундаж хурд',
      questionEn:
        'In an experiment the concentration of hydrochloric acid falls from 0.100 mol/dm³ to 0.064 mol/dm³ in the first 60 s. Calculate the average rate of reaction over this time, with units.',
      questionMn:
        'Туршилтад давсны хүчлийн концентраци эхний 60 с-д 0.100-аас 0.064 моль/дм³ болж буурав. Энэ хугацаанд дундаж урвалын хурдыг нэгжтэй нь тооцоол.',
      stepsEn: [
        'Change in concentration = 0.100 − 0.064 = 0.036 mol/dm³',
        'Time taken = 60 s',
        'Rate = change in concentration ÷ time = 0.036 ÷ 60 = 6.0 × 10⁻⁴ mol dm⁻³ s⁻¹'
      ],
      stepsMn: [
        'Концентрацийн өөрчлөлт = 0.100 − 0.064 = 0.036 моль/дм³',
        'Зарцуулсан хугацаа = 60 с',
        'Хурд = концентрацийн өөрчлөлт ÷ хугацаа = 0.036 ÷ 60 = 6.0 × 10⁻⁴ моль дм⁻³ с⁻¹'
      ],
      finalAnswerEn: '6.0 × 10⁻⁴ mol dm⁻³ s⁻¹',
      finalAnswerMn: '6.0 × 10⁻⁴ моль дм⁻³ с⁻¹',
      examinerTipEn: 'Always give units. Use mol dm⁻³ s⁻¹ for a solution and cm³ s⁻¹ for a gas volume. For a rate from a curve, use the gradient of the tangent.',
      examinerTipMn: 'Нэгжийг заавал бич. Уусмалд моль дм⁻³ с⁻¹, хийн эзлэхүүнд см³ с⁻¹. Муруйгаас хурд олохдоо шүргэгчийн налалтыг ашигла.',
      commonMistakeEn: 'Giving a negative rate, or leaving out the units.',
      commonMistakeMn: 'Хурдыг сөрөг гэж бичих, эсвэл нэгжийг орхих.'
    }),
    ex({
      id: 'deck-6-2-temperature-collisions',
      titleEn: 'Why a higher temperature increases the rate',
      titleMn: 'Температур нэмэгдэхэд хурд яагаад нэмэгддэг вэ',
      questionEn: 'Using collision theory, explain why increasing the temperature increases the rate of a reaction.',
      questionMn: 'Мөргөлдөөний онолоор температур нэмэгдэхэд урвалын хурд яагаад нэмэгддэгийг тайлбарла.',
      stepsEn: [
        'At a higher temperature the particles move faster, so they collide more often',
        'A larger proportion of particles have energy equal to or greater than the activation energy',
        'So more of the collisions are successful each second, and the rate increases'
      ],
      stepsMn: [
        'Өндөр температурт бөөмс хурдан хөдөлж, илүү олон удаа мөргөлдөнө',
        'Идэвхжүүлэлтийн энерги ба түүнээс их энергитэй бөөмсийн эзлэх хувь нэмэгдэнэ',
        'Тиймээс секунд бүр илүү олон амжилттай мөргөлдөөн болж, хурд нэмэгдэнэ'
      ],
      finalAnswerEn: 'More frequent collisions, and a larger proportion of them have energy ≥ Eₐ.',
      finalAnswerMn: 'Мөргөлдөөн илүү олон, мөн тэдгээрийн илүү их хувь нь энерги ≥ Eₐ байна.',
      examinerTipEn: 'Use the words "successful collisions" and "activation energy". Temperature does not change the number of particles.',
      examinerTipMn: '"Амжилттай мөргөлдөөн", "идэвхжүүлэлтийн энерги" гэсэн үгийг ашигла. Температур бөөмийн тоог өөрчлөхгүй.',
      commonMistakeEn: 'Saying the particles "have more energy so they react". Only the particles with energy above the activation energy react.',
      commonMistakeMn: 'Бөөмс "илүү энергитэй тул урвалд орно" гэх. Зөвхөн идэвхжүүлэлтийн энергиэс их энергитэй бөөмс урвалд ордог.'
    })
  ],

  '6.3': [
    ex({
      id: 'deck-6-3-haber-pressure',
      titleEn: 'Haber process: effect of pressure on yield',
      titleMn: 'Haber процесс: даралтын гарцад үзүүлэх нөлөө',
      questionEn:
        'Ammonia is made by N₂(g) + 3H₂(g) ⇌ 2NH₃(g). Explain the effect of increasing the pressure on the equilibrium yield of ammonia.',
      questionMn:
        'Аммиакийг N₂(g) + 3H₂(g) ⇌ 2NH₃(g) урвалаар үйлдвэрлэдэг. Даралтыг нэмэгдүүлэхэд аммиакийн тэнцвэрт гарцад үзүүлэх нөлөөг тайлбарла.',
      stepsEn: [
        'Left side: 1 + 3 = 4 mol of gas. Right side: 2 mol of gas',
        'Increasing the pressure moves the equilibrium to the side with fewer gas molecules',
        'So the equilibrium moves to the right and more NH₃ is formed: the yield increases',
        'In practice about 200 atm is used, because higher pressure costs more and is less safe'
      ],
      stepsMn: [
        'Зүүн тал: 1 + 3 = 4 моль хий. Баруун тал: 2 моль хий',
        'Даралтыг нэмэгдүүлэхэд тэнцвэр хийн молекул цөөн тал руу шилжинэ',
        'Тиймээс тэнцвэр баруун тийш шилжиж, илүү их NH₃ үүснэ: гарц нэмэгдэнэ',
        'Бодит үйлдвэрт ойролцоогоор 200 atm хэрэглэдэг, учир нь даралт их байх нь өртөг өндөр, аюулгүй байдал муу'
      ],
      finalAnswerEn: 'Higher pressure moves the equilibrium to the right, so the yield of NH₃ increases.',
      finalAnswerMn: 'Даралт нэмэгдэхэд тэнцвэр баруун тийш шилжиж, NH₃-ийн гарц нэмэгдэнэ.',
      examinerTipEn: 'Say that the equilibrium moves to the side with fewer gas molecules. A catalyst does not change the yield.',
      examinerTipMn: 'Тэнцвэр хийн молекул цөөн тал руу шилжинэ гэж бич. Катализатор гарцыг өөрчлөхгүй.',
      commonMistakeEn: 'Saying that pressure changes the value of the equilibrium constant, or that a catalyst increases the yield.',
      commonMistakeMn: 'Даралт тэнцвэрийн тогтмолыг өөрчилнө гэх, эсвэл катализатор гарцыг нэмэгдүүлнэ гэх.'
    })
  ],

  '6.4': [
    ex({
      id: 'deck-6-4-oxidation-numbers',
      titleEn: 'Oxidation numbers of sulfur',
      titleMn: 'Хүхрийн исэлдэлтийн тоо',
      questionEn: 'Find the oxidation number of sulfur in (a) SO₄²⁻ and (b) H₂S.',
      questionMn: 'Хүхрийн исэлдэлтийн тоог ол: (а) SO₄²⁻ (б) H₂S.',
      stepsEn: [
        '(a) S + 4(−2) = −2 (the ion has charge 2−), so S = +6',
        '(b) 2(+1) + S = 0 (the compound is neutral), so S = −2'
      ],
      stepsMn: [
        '(а) S + 4(−2) = −2 (ионы цэнэг 2−), тиймээс S = +6',
        '(б) 2(+1) + S = 0 (нэгдэл саармаг), тиймээс S = −2'
      ],
      finalAnswerEn: '(a) +6   (b) −2',
      finalAnswerMn: '(а) +6   (б) −2',
      examinerTipEn: 'Oxygen is −2 (except in peroxides) and hydrogen is +1 (except in metal hydrides). The sum of the numbers equals the overall charge.',
      examinerTipMn: 'Хүчилтөрөгч −2 (пероксидоос бусад), устөрөгч +1 (металлын гидридээс бусад). Тоонуудын нийлбэр нийт цэнэгтэй тэнцүү.',
      commonMistakeEn: 'Writing the oxidation number as a charge, such as "6+". Write +6.',
      commonMistakeMn: 'Исэлдэлтийн тоог цэнэг шиг "6+" гэж бичих. +6 гэж бич.'
    })
  ],

  '7.2': [
    ex({
      id: 'deck-7-2-amphoteric-al2o3',
      titleEn: 'Aluminium oxide is amphoteric',
      titleMn: 'Алюминийн исэл амфотер',
      questionEn:
        'Aluminium oxide, Al₂O₃, reacts with hydrochloric acid and with sodium hydroxide solution. Write an equation for each reaction and classify the oxide.',
      questionMn:
        'Алюминийн исэл Al₂O₃ давсны хүчил, натрийн гидроксидын уусмалтай урвалд орно. Урвал бүрийн тэгшитгэлийг бич, исэлийг ангил.',
      stepsEn: [
        'With acid, Al₂O₃ acts as a base: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O',
        'With alkali, Al₂O₃ acts as an acid: Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄',
        'It reacts with both acids and bases to form a salt and water, so it is an amphoteric oxide'
      ],
      stepsMn: [
        'Хүчилтэй урвалд Al₂O₃ суурийн үүрэг гүйцэтгэнэ: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O',
        'Шүлттэй урвалд Al₂O₃ хүчлийн үүрэг гүйцэтгэнэ: Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄',
        'Хүчил ба суурь хоёуланд нь урвалд орж давс, ус үүсгэдэг тул амфотер исэл'
      ],
      finalAnswerEn: 'Al₂O₃ is an amphoteric oxide.',
      finalAnswerMn: 'Al₂O₃ бол амфотер исэл.',
      examinerTipEn: 'Amphoteric means it reacts with acids AND with bases. Do not call it only a basic oxide.',
      examinerTipMn: 'Амфотер гэдэг нь хүчил БА суурь хоёуланд нь урвалд орно гэсэн үг. Зөвхөн суурь исэл гэж бүү хэл.',
      commonMistakeEn: 'Saying that Al₂O₃ is a basic oxide, or that it does not react with alkali.',
      commonMistakeMn: 'Al₂O₃ бол суурь исэл гэх, эсвэл шүлттэй урвалд орохгүй гэх.'
    })
  ],

  '8.3': [
    ex({
      id: 'deck-8-3-halogen-displacement',
      titleEn: 'Displacement of bromide by chlorine',
      titleMn: 'Хлороор бромыг нүүлгэх урвал',
      questionEn: 'Chlorine water is added to potassium bromide solution. Describe what is seen and write the ionic equation.',
      questionMn: 'Хлорын усыг калийн бромидын уусмалд нэмэв. Юу ажиглагдахыг тайлбарлаж, ионы тэгшитгэлийг бич.',
      stepsEn: [
        'Chlorine is more reactive than bromine, so it displaces bromine from the bromide ions',
        'The colourless solution turns orange because bromine is formed',
        'Cl₂(aq) + 2Br⁻(aq) → 2Cl⁻(aq) + Br₂(aq)'
      ],
      stepsMn: [
        'Хлор бромоос идэвхтэй тул бромид ионоос бромыг нүүлгэнэ',
        'Өнгөгүй уусмал улбар шар болно, учир нь бром үүснэ',
        'Cl₂(aq) + 2Br⁻(aq) → 2Cl⁻(aq) + Br₂(aq)'
      ],
      finalAnswerEn: 'The solution turns orange: Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂',
      finalAnswerMn: 'Уусмал улбар шар болно: Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂',
      examinerTipEn: 'Reactivity falls down Group VII, so a halogen displaces the halide of any halogen below it. Iodine does not displace bromide.',
      examinerTipMn: 'VII бүлэгт доош идэвх буурна, тиймээс дээрх галоген доорх галогенийн галидыг нүүлгэнэ. Иод бромыг нүүлгэхгүй.',
      commonMistakeEn: 'Saying that iodine displaces bromide, or leaving the state symbols out of the ionic equation.',
      commonMistakeMn: 'Иод бромыг нүүлгэнэ гэх, эсвэл ионы тэгшитгэлээс төлөвийн тэмдгийг орхих.'
    })
  ],

  '9.4': [
    ex({
      id: 'deck-9-4-mg-steam-al-oxide',
      titleEn: 'Magnesium with steam, and why aluminium seems unreactive',
      titleMn: 'Магни уурын хамт, алюминий яагаад идэвхгүй мэт харагддаг вэ',
      questionEn: 'Write an equation for magnesium reacting with steam. Explain why aluminium appears unreactive.',
      questionMn: 'Магни уурын хамт урвалд орох тэгшитгэлийг бич. Алюминий яагаад идэвхгүй мэт харагдахыг тайлбарла.',
      stepsEn: [
        'Mg(s) + H₂O(g) → MgO(s) + H₂(g): hot magnesium reacts with steam to give magnesium oxide and hydrogen',
        'Aluminium is reactive, but a thin tough layer of aluminium oxide coats the metal',
        'This oxide layer stops the aluminium from reacting with water or acid'
      ],
      stepsMn: [
        'Mg(s) + H₂O(g) → MgO(s) + H₂(g): халуун магни уурын хамт урвалд орж магнийн исэл ба устөрөгч өгнө',
        'Алюминий идэвхтэй боловч гадаргуу дээр нимгэн, бат алюминийн исэлийн давхарга үүсгэнэ',
        'Энэ исэлийн давхарга нь алюминийг ус эсвэл хүчилтэй урвалд орохоос сэргийлнэ'
      ],
      finalAnswerEn: 'Mg + H₂O(g) → MgO + H₂; aluminium is protected by its oxide layer.',
      finalAnswerMn: 'Mg + H₂O(g) → MgO + H₂; алюминийг исэлийн давхарга хамгаална.',
      examinerTipEn: 'Give the state symbol of steam (g). Name the oxide layer as the reason; "unreactive" alone is not enough.',
      examinerTipMn: 'Уурыг (g) төлөвийн тэмдэгтэй бич. Шалтгаан нь исэлийн давхарга гэж нэрлэ; "идэвхгүй" гэж хэлэх нь хангалтгүй.',
      commonMistakeEn: 'Writing Mg(OH)₂ as the product with steam, or saying aluminium is unreactive without a reason.',
      commonMistakeMn: 'Уурын хамт Mg(OH)₂ гэж бичих, эсвэл шалтгаангүйгээр алюминийг идэвхгүй гэх.'
    })
  ],

  '10.3': [
    ex({
      id: 'deck-10-3-catalytic-converter',
      titleEn: 'Oxides of nitrogen and the catalytic converter',
      titleMn: 'Азотын исэл ба катализатор хувиргагч',
      questionEn:
        'Explain how oxides of nitrogen form in car engines and how a catalytic converter removes them. Give an equation for the removal.',
      questionMn:
        'Машины хөдөлгүүрт азотын исэл яаж үүсч, катализатор хувиргагч яаж зайлуулдагийг тайлбарла. Зайлуулах урвалын тэгшитгэлийг бич.',
      stepsEn: [
        'The very high temperature in the engine makes nitrogen and oxygen from the air react: N₂ + O₂ → 2NO',
        'The catalytic converter (platinum and rhodium catalyst) turns the harmful gases into less harmful ones: 2CO + 2NO → 2CO₂ + N₂',
        'The NO is reduced to N₂ and the CO is oxidised to CO₂'
      ],
      stepsMn: [
        'Хөдөлгүүрийн маш өндөр температур агаарын азот ба хүчилтөрөгчийг урвалд оруулна: N₂ + O₂ → 2NO',
        'Катализатор хувиргагч (платин, родийн катализатор) хортой хийг бага хортой болгоно: 2CO + 2NO → 2CO₂ + N₂',
        'NO нь N₂ болж бууралтад орж, CO нь CO₂ болж исэлдэнэ'
      ],
      finalAnswerEn: '2CO + 2NO → 2CO₂ + N₂ (catalysed by platinum and rhodium)',
      finalAnswerMn: '2CO + 2NO → 2CO₂ + N₂ (платин ба родийн катализатороор)',
      examinerTipEn: 'The high temperature is the key: nitrogen and oxygen do not react easily at room temperature.',
      examinerTipMn: 'Өндөр температур гол нь: азот ба хүчилтөрөгч өрөөний температурт амархан урвалд ордоггүй.',
      commonMistakeEn: 'Saying that NO comes from the fuel. It forms from nitrogen and oxygen in the air.',
      commonMistakeMn: 'NO түлшнээс үүснэ гэх. Энэ нь агаарын азот ба хүчилтөрөгчөөс үүснэ.'
    })
  ],

  '11.1': [
    ex({
      id: 'deck-11-1-butane-isomers',
      titleEn: 'Structural isomers of C₄H₁₀',
      titleMn: 'C₄H₁₀-ын бүтцийн изомер',
      questionEn: 'What are structural isomers? Draw the two structural isomers of C₄H₁₀.',
      questionMn: 'Бүтцийн изомер гэж юу вэ? C₄H₁₀-ын хоёр бүтцийн изомерыг зур.',
      stepsEn: [
        'Structural isomers have the same molecular formula but different structural formulae',
        'Butane: CH₃CH₂CH₂CH₃ (straight chain)',
        '2-methylpropane: CH(CH₃)₃ (branched chain)'
      ],
      stepsMn: [
        'Бүтцийн изомер нь молекул томьёо ижил, бүтцийн томьёо өөр нэгдэл',
        'Бутан: CH₃CH₂CH₂CH₃ (шугаман гинж)',
        '2-метилпропан: CH(CH₃)₃ (салаатай гинж)'
      ],
      finalAnswerEn: 'Butane and 2-methylpropane',
      finalAnswerMn: 'Бутан ба 2-метилпропан',
      examinerTipEn: 'Check that each drawing has 4 carbon atoms and 10 hydrogen atoms before you say it is an isomer.',
      examinerTipMn: 'Изомер гэж хэлэхээс өмнө зураг бүр 4 нүүрстөрөгч, 10 устөрөгчтэй эсэхийг шалга.',
      commonMistakeEn: 'Treating two drawings of the same molecule as different isomers, or drawing a "isomer" with a different molecular formula.',
      commonMistakeMn: 'Нэг молекулын хоёр зургийг өөр изомер гэж үзэх, эсвэл өөр молекул томьёотой "изомер" зурах.'
    })
  ],

  '11.5': [
    ex({
      id: 'deck-11-5-bromine-test-cracking',
      titleEn: 'Testing an alkene with bromine water; cracking',
      titleMn: 'Алкеныг бромын уусмалаар шалгах; крекинг',
      questionEn:
        '(a) Describe a test to distinguish hexane from hexene. (b) Explain why long-chain alkanes are cracked.',
      questionMn:
        '(а) Гексан ба гексенийг ялгах туршилтыг тайлбарла. (б) Урт гинжтэй алканыг яагаад крекингээр задалдаг вэ.',
      stepsEn: [
        '(a) Add aqueous bromine (orange) to each sample and shake',
        '(a) Hexene decolourises the bromine water (orange to colourless) by addition across the C=C double bond',
        '(a) Hexane has no double bond, so the orange colour stays',
        '(b) Cracking breaks long-chain alkanes into shorter, more useful alkanes and alkenes; it is done by heating with a catalyst'
      ],
      stepsMn: [
        '(а) Нэг бүр дээжид усан бром (улбар шар) нэмж сэгсэрнэ',
        '(а) Гексен C=C давхар холбоонд нэмэлтээр урвалд орж бромын уусмалыг өнгөгүй болгоно (улбар шар → өнгөгүй)',
        '(а) Гександ давхар холбоо байхгүй тул улбар шар өнгө хэвээр үлдэнэ',
        '(б) Крекинг нь урт гинжтэй алканыг богино, илүү хэрэгтэй алкан ба алкен болгон задалдаг; катализатор бүхий халаалтаар явагдана'
      ],
      finalAnswerEn: 'Hexene decolourises bromine water; hexane does not. Cracking gives shorter, more useful molecules.',
      finalAnswerMn: 'Гексен бромын уусмалыг өнгөгүй болгоно; гексан болохгүй. Крекинг нь богино, хэрэгтэй молекул өгнө.',
      examinerTipEn: 'Say "decolourises" (orange to colourless) and that addition happens across the C=C double bond.',
      examinerTipMn: '"Өнгөгүй болно" (улбар шар → өнгөгүй) гэж хэлж, нэмэлтийн урвал C=C давхар холбоон дээр явагдана гэж бич.',
      commonMistakeEn: 'Saying that alkanes turn bromine water colourless, or using burning as the test.',
      commonMistakeMn: 'Алканы бромын уусмалыг өнгөгүй болгоно гэх, эсвэл шаталтыг туршилт гэж хэлэх.'
    })
  ],

  '11.7': [
    ex({
      id: 'deck-11-7-ethanol-to-ethanoic-acid',
      titleEn: 'Oxidation of ethanol to ethanoic acid',
      titleMn: 'Этанолыг цууны хүчил болгон исэлдүүлэх',
      questionEn:
        'Ethanol is oxidised to ethanoic acid by acidified potassium manganate(VII). Describe the colour change and write an equation using [O].',
      questionMn:
        'Этанолыг хүчиллэг калийн перманганат(VII)-оор цууны хүчил болгон исэлдүүлдэг. Өнгөний өөрчлөлтийг тайлбарлаж, [O]-г ашиглан тэгшитгэл бич.',
      stepsEn: [
        'Ethanol is oxidised: CH₃CH₂OH + 2[O] → CH₃COOH + H₂O',
        'The purple manganate(VII) solution is reduced and becomes colourless',
        'The product has the −COOH group, so it is ethanoic acid'
      ],
      stepsMn: [
        'Этанол исэлдэнэ: CH₃CH₂OH + 2[O] → CH₃COOH + H₂O',
        'Ягаан өнгөтэй манганат(VII) ион бууралтад орж өнгөгүй болно',
        'Бүтээгдэхүүн нь −COOH бүлэгтэй тул цууны хүчил'
      ],
      finalAnswerEn: 'CH₃CH₂OH + 2[O] → CH₃COOH + H₂O; purple → colourless',
      finalAnswerMn: 'CH₃CH₂OH + 2[O] → CH₃COOH + H₂O; ягаан → өнгөгүй',
      examinerTipEn: '[O] stands for the oxidising agent. The product must contain the −COOH group.',
      examinerTipMn: '[O] нь исэлдүүлэгч бодисыг илэрхийлнэ. Бүтээгдэхүүнд −COOH бүлэг байх ёстой.',
      commonMistakeEn: 'Leaving out the acid (acidified conditions), or writing ethanoic acid without the −COOH group.',
      commonMistakeMn: 'Хүчлийн нөхцөлийг орхих, эсвэл −COOH бүлэггүйгээр цууны хүчил гэж бичих.'
    }),
    ex({
      id: 'deck-11-7-ester-yield',
      titleEn: 'Percentage yield of an ester',
      titleMn: 'Эфирийн гарцын хувь',
      questionEn:
        '6.00 g of ethanoic acid (Mr = 60.0) is heated with excess ethanol and an acid catalyst. 5.28 g of ethyl ethanoate (Mr = 88.0) is formed. Calculate the percentage yield.',
      questionMn:
        '6.00 г цууны хүчил (Mr = 60.0)-ийг илүүдэл этанол ба хүчил катализатортой халаав. 5.28 г этил этаноат (Mr = 88.0) үүсэв. Гарцын хувийг тооцоол.',
      stepsEn: [
        'Moles of acid = 6.00 ÷ 60.0 = 0.100 mol',
        'Ethanol is in excess, so the acid is limiting. The ratio is 1 : 1, so the theoretical moles of ester = 0.100 mol',
        'Theoretical mass of ester = 0.100 × 88.0 = 8.80 g',
        'Percentage yield = 5.28 ÷ 8.80 × 100 = 60.0 %'
      ],
      stepsMn: [
        'Хүчлийн моль = 6.00 ÷ 60.0 = 0.100 моль',
        'Этанол илүүдэлтэй тул хүчил хязгаарлагч. Харьцаа 1 : 1 тул онолын эфирийн моль = 0.100 моль',
        'Эфирийн онолын масс = 0.100 × 88.0 = 8.80 г',
        'Гарцын хувь = 5.28 ÷ 8.80 × 100 = 60.0 %'
      ],
      finalAnswerEn: 'Percentage yield = 60.0 %',
      finalAnswerMn: 'Гарцын хувь = 60.0 %',
      examinerTipEn: 'Esterification is reversible, so the yield is always below 100 %.',
      examinerTipMn: 'Эфирийн урвал эргэх урвал тул гарц үргэлж 100 %-аас бага байна.',
      commonMistakeEn: 'Using the excess ethanol to calculate the theoretical yield.',
      commonMistakeMn: 'Онолын гарцыг илүүдэл этанолоор тооцох.'
    })
  ],

  '12.2': [
    ex({
      id: 'deck-12-2-naoh-h2so4-titration',
      titleEn: 'Titration of sodium hydroxide with sulfuric acid',
      titleMn: 'Натрийн гидроксидыг сульфийн хүчлээр титрлэх',
      questionEn:
        '25.0 cm³ of sodium hydroxide solution is neutralised by 18.40 cm³ of 0.100 mol/dm³ sulfuric acid. 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O. Calculate the concentration of the sodium hydroxide.',
      questionMn:
        '25.0 см³ натрийн гидроксидын уусмалыг 0.100 моль/дм³ сульфийн хүчлийн 18.40 см³-ээр саармагжуулав. 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O. Натрийн гидроксидын концентрацийг тооцоол.',
      stepsEn: [
        'Moles of H₂SO₄ = 0.100 × 18.40 ÷ 1000 = 1.84 × 10⁻³ mol',
        'From the equation, NaOH : H₂SO₄ = 2 : 1, so moles of NaOH = 2 × 1.84 × 10⁻³ = 3.68 × 10⁻³ mol',
        'Concentration of NaOH = 3.68 × 10⁻³ ÷ 0.0250 = 0.147 mol/dm³'
      ],
      stepsMn: [
        'H₂SO₄-ийн моль = 0.100 × 18.40 ÷ 1000 = 1.84 × 10⁻³ моль',
        'Тэгшитгэлээс NaOH : H₂SO₄ = 2 : 1 тул NaOH-ийн моль = 2 × 1.84 × 10⁻³ = 3.68 × 10⁻³ моль',
        'NaOH-ийн концентраци = 3.68 × 10⁻³ ÷ 0.0250 = 0.147 моль/дм³'
      ],
      finalAnswerEn: '0.147 mol/dm³',
      finalAnswerMn: '0.147 моль/дм³',
      examinerTipEn: 'Convert cm³ to dm³ before using c = n ÷ V, and use the 2 : 1 ratio from the equation.',
      examinerTipMn: 'c = n ÷ V-г ашиглахаас өмнө см³-ийг дм³ болго, тэгшитгэлийн 2 : 1 харьцааг ашигла.',
      commonMistakeEn: 'Forgetting the 2 in the mole ratio, or not converting cm³ to dm³.',
      commonMistakeMn: 'Моль харьцааны 2-ыг мартах, эсвэл см³-ийг дм³ болгохгүй байх.'
    })
  ],

  '12.3': [
    ex({
      id: 'deck-12-3-ammonium-test',
      titleEn: 'Testing for ammonium ions',
      titleMn: 'Аммонийн ионыг таних',
      questionEn:
        'Sodium hydroxide solution is added to ammonium sulfate solution and the mixture is warmed. Describe the test and what you observe.',
      questionMn:
        'Аммонийн сульфатын уусмалд натрийн гидроксидын уусмал нэмээд бүлээсгэв. Туршилтыг тайлбарлаж, юу ажиглагдахыг бич.',
      stepsEn: [
        'NH₄⁺(aq) + OH⁻(aq) → NH₃(g) + H₂O(l) on warming',
        'Ammonia gas is given off',
        'Hold damp red litmus paper at the mouth of the test tube: it turns blue'
      ],
      stepsMn: [
        'Бүлээсгэхэд NH₄⁺(aq) + OH⁻(aq) → NH₃(g) + H₂O(l)',
        'Аммиакийн хий ялгарна',
        'Нойтон улаан литмус цаасыг хоолойн амсарт барьвал цэнхэр болно'
      ],
      finalAnswerEn: 'Ammonia gas is given off; damp red litmus turns blue.',
      finalAnswerMn: 'Аммиакийн хий ялгарна; нойтон улаан литмус цэнхэр болно.',
      examinerTipEn: 'Use damp (wet) litmus paper. Dry litmus paper does not show the ammonia.',
      examinerTipMn: 'Нойтон литмус цаас ашигла. Хуурай литмус аммиакийг харуулахгүй.',
      commonMistakeEn: 'Using dry litmus paper, or calling the gas "ammonium" instead of ammonia.',
      commonMistakeMn: 'Хуурай литмус цаас ашиглах, эсвэл хийг "аммоний" гэж нэрлэх (аммиак гэж бичих ёстой).'
    })
  ]
};
