import type { AlevelInquiryPlan } from './alevelInquiryTypes';

// The 40-minute inquiry lessons of 9701 AS chapters 12 (nitrogen and sulfur) and 19 to 22 (nitrogen compounds,
// polymerisation, organic synthesis, analytical techniques). Written for this course from the syllabus objectives.

export const ALEVEL_INQUIRY_PART4: Record<string, AlevelInquiryPlan> = {
  'al-ch-12': {
    question: {
      mn: 'Агаарын 78% нь азот боловч бараг урвалд ордоггүй. Гэтэл азотын нэгдэл аммиак яагаад суурь шинжтэй, идэвхтэй вэ?',
      en: 'Nitrogen is 78% of the air yet hardly reacts. Why, then, is its compound ammonia basic and reactive?'
    },
    independent: { mn: 'Аммонийн хлоридод нэмэх бодис: ус, шингэлсэн HCl, NaOH-ийн уусмал', en: 'What is added to ammonium chloride: water, dilute HCl, or aqueous NaOH' },
    dependent: { mn: 'Аммиак ялгарах эсэх (чийгтэй улаан лакмус цэнхэр болох эсэх)', en: 'Whether ammonia is given off (damp red litmus turns blue)' },
    controlled: { mn: 'Ижил масстай NH₄Cl, ижил эзэлхүүн, ижил зөөлөн халаалт', en: 'The same mass of NH₄Cl, the same volume, the same gentle warming' },
    limitation: {
      mn: 'Энэ туршилт аммиакийн суурь шинжийг харуулна. Азотын идэвхгүй байдал, агаар мандал дахь NOₓ-ийн урвалыг ангид шууд харуулахгүй, тэдгээрийг тэгшитгэл ба өгөгдлөөр судална.',
      en: 'The test shows that ammonia is a base. It cannot show the inertness of nitrogen or the reactions of NOₓ in the air; those are studied through equations and data.'
    },
    keyPoints: [
      { mn: 'N≡N гурвалсан холбоо маш бат (≈944 kJ mol⁻¹) бөгөөд туйлгүй тул азот идэвхгүй.', en: 'The N≡N triple bond is very strong (about 944 kJ mol⁻¹) and non-polar, so nitrogen is unreactive.' },
      { mn: 'Аммиак азотын бие даасан электрон хосоор H⁺ хүлээн авдаг тул Бронстед–Лоури суурь: NH₃ + H⁺ → NH₄⁺. Аммонийн ион тетраэдр хэлбэртэй.', en: 'Ammonia accepts H⁺ with the lone pair on nitrogen, so it is a Brønsted–Lowry base: NH₃ + H⁺ → NH₄⁺. The ammonium ion is tetrahedral.' },
      { mn: 'Аммонийн давсыг шүлттэй халаахад хүчил-суурийн урвалаар аммиак ялгарна: NH₄⁺ + OH⁻ → NH₃ + H₂O.', en: 'Warming an ammonium salt with an alkali gives off ammonia in an acid–base reaction: NH₄⁺ + OH⁻ → NH₃ + H₂O.' },
      { mn: 'NOₓ аянга цахилгаан болон дотоод шаталтын хөдөлгүүрийн өндөр температурт үүснэ; катализаторт хөрвүүлэгч 2NO + 2CO → N₂ + 2CO₂ болгоно.', en: 'NOₓ forms in lightning and at the high temperatures in internal combustion engines; a catalytic converter turns it back: 2NO + 2CO → N₂ + 2CO₂.' },
      { mn: 'NO₂ нь SO₂-ийн исэлдэлтэд катализатор болж хүчиллэг бороо үүсгэнэ: SO₂ + NO₂ → SO₃ + NO, дараа нь NO + ½O₂ → NO₂. Шатаагүй нүүрсустөрөгчтэй урвалд орж фотохимийн утааны PAN үүсгэнэ.', en: 'NO₂ catalyses the oxidation of SO₂, which leads to acid rain: SO₂ + NO₂ → SO₃ + NO, then NO + ½O₂ → NO₂. With unburned hydrocarbons it also forms PAN in photochemical smog.' }
    ],
    glossary: [
      { term: { mn: 'Бронстед–Лоури суурь', en: 'Brønsted–Lowry base' }, def: { mn: 'Протон (H⁺) хүлээн авагч бодис.', en: 'A proton (H⁺) acceptor.' } },
      { term: { mn: 'Аммонийн ион', en: 'Ammonium ion' }, def: { mn: 'NH₄⁺; аммиак протон хүлээн авахад үүсэх тетраэдр хэлбэрийн ион.', en: 'NH₄⁺, the tetrahedral ion formed when ammonia accepts a proton.' } },
      { term: { mn: 'Хүчиллэг бороо', en: 'Acid rain' }, def: { mn: 'SO₂ ба NOₓ усанд уусч хүчил үүсгэснээр хүчиллэг болсон бороо.', en: 'Rain made acidic by SO₂ and NOₓ dissolving to form acids.' } }
    ],
    structured: {
      prompt: { mn: 'Аммиак яагаад Бронстед–Лоури суурь болохыг, аммонийн ион хэрхэн үүсэхийг тайлбарла.', en: 'Explain why ammonia is a Brønsted–Lowry base and how the ammonium ion forms.' },
      marks: [
        { mn: 'Азотын атомд бие даасан электрон хос бий (1)', en: 'The nitrogen atom has a lone pair of electrons (1)' },
        { mn: 'Тэр хосоороо протон (H⁺) хүлээн авна (1)', en: 'It uses the lone pair to accept a proton (H⁺) (1)' },
        { mn: 'Донор-акцепторын (координацын) холбоогоор тетраэдр хэлбэрийн NH₄⁺ үүснэ (1)', en: 'A co-ordinate bond forms, giving the tetrahedral NH₄⁺ ion (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Азот яагаад идэвхгүй вэ?', en: 'Why is nitrogen unreactive?' },
        options: [
          { mn: 'Азот усанд муу уусдаг', en: 'Nitrogen dissolves poorly in water' },
          { mn: 'N≡N холбоо маш бат бөгөөд туйлгүй', en: 'The N≡N bond is very strong and non-polar' },
          { mn: 'Азотын молекул нэг атомтай', en: 'Nitrogen molecules have one atom' },
          { mn: 'Азот металл', en: 'Nitrogen is a metal' }
        ],
        answer: 1,
        explanation: { mn: 'Гурвалсан холбоог таслахад маш их энерги хэрэгтэй, туйлгүй тул электрофил ч, нуклеофил ч татахгүй.', en: 'Breaking the triple bond needs a lot of energy, and with no polarity it attracts neither electrophiles nor nucleophiles.' }
      },
      {
        level: 'medium',
        prompt: { mn: 'NH₄Cl-ийг NaOH-ийн уусмалтай халаахад ямар хий ялгарах вэ?', en: 'Which gas is given off when NH₄Cl is warmed with aqueous NaOH?' },
        options: [
          { mn: 'N₂', en: 'N₂' },
          { mn: 'Cl₂', en: 'Cl₂' },
          { mn: 'NH₃', en: 'NH₃' },
          { mn: 'H₂', en: 'H₂' }
        ],
        answer: 2,
        explanation: { mn: 'NH₄⁺ + OH⁻ → NH₃ + H₂O; OH⁻ нь NH₄⁺-ээс протон авна.', en: 'NH₄⁺ + OH⁻ → NH₃ + H₂O; the OH⁻ takes a proton from NH₄⁺.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'NO₂ агаар мандалд SO₂-ийн исэлдэлтэд катализаторын үүрэг гүйцэтгэдгийг тэгшитгэлээр харуулж, хүчиллэг бороотой холбо.', en: 'Use equations to show how NO₂ acts as a catalyst in the oxidation of SO₂ in the air, and link it to acid rain.' },
        model: {
          mn: 'SO₂ + NO₂ → SO₃ + NO; NO + ½O₂ → NO₂. NO₂ дахин үүсдэг тул зарцуулагдахгүй, катализатор. SO₃ + H₂O → H₂SO₄ нь хүчиллэг бороо болно.',
          en: 'SO₂ + NO₂ → SO₃ + NO; NO + ½O₂ → NO₂. NO₂ is made again, so it is not used up: it is a catalyst. SO₃ + H₂O → H₂SO₄ gives acid rain.'
        },
        explanation: { mn: 'Катализатор урвалд оролцох боловч эцэст нь дахин үүснэ.', en: 'A catalyst takes part in the reaction but is formed again at the end.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Катализаторт хөрвүүлэгчид NO юу болж хувирах вэ?', en: 'In a catalytic converter, NO is converted to:' },
        options: [{ mn: 'NO₂', en: 'NO₂' }, { mn: 'N₂', en: 'N₂' }, { mn: 'NH₃', en: 'NH₃' }, { mn: 'HNO₃', en: 'HNO₃' }],
        answer: 1,
        explanation: { mn: '2NO + 2CO → N₂ + 2CO₂.', en: '2NO + 2CO → N₂ + 2CO₂.' }
      },
      {
        question: { mn: 'Аммонийн ион ямар хэлбэртэй вэ?', en: 'What is the shape of the ammonium ion?' },
        options: [{ mn: 'Гурвалжин пирамид', en: 'Trigonal pyramidal' }, { mn: 'Хавтгай гурвалжин', en: 'Trigonal planar' }, { mn: 'Тетраэдр', en: 'Tetrahedral' }, { mn: 'Шугаман', en: 'Linear' }],
        answer: 2,
        explanation: { mn: 'NH₄⁺-д дөрвөн холбоо хос, бие даасан хос байхгүй тул тетраэдр (109.5°).', en: 'NH₄⁺ has four bonding pairs and no lone pair, so it is tetrahedral (109.5°).' }
      },
      {
        question: { mn: 'PAN аль бохирдлын бүрэлдэхүүн вэ?', en: 'PAN is a component of:' },
        options: [{ mn: 'Фотохимийн утаа', en: 'Photochemical smog' }, { mn: 'Хүчиллэг бороо', en: 'Acid rain' }, { mn: 'Хүлэмжийн хий', en: 'Greenhouse gases' }, { mn: 'Хатуу хог', en: 'Solid waste' }],
        answer: 0,
        explanation: { mn: 'PAN нь NOₓ ба шатаагүй нүүрсустөрөгчөөс нарны гэрэлд үүсэх фотохимийн утааны бодис.', en: 'PAN forms from NOₓ and unburned hydrocarbons in sunlight; it is part of photochemical smog.' }
      }
    ]
  },
  'al-ch-19': {
    question: {
      mn: 'Нэг ижил галогеналкан (бромоэтан) урвалжаас хамаараад ямар өөр бүтээгдэхүүн өгөх вэ?',
      en: 'How can one halogenoalkane (bromoethane) give different products depending on the reagent?'
    },
    independent: { mn: 'Урвалж: этанол дахь NH₃ (даралтын дор халаах), этанол дахь KCN (халаах), NaOH-ийн уусмал', en: 'The reagent: NH₃ in ethanol (heated under pressure), KCN in ethanol (heated), or aqueous NaOH' },
    dependent: { mn: 'Бүтээгдэхүүний функциональ бүлэг (амин, нитрил, спирт) ба нүүрстөрөгчийн тоо', en: 'The functional group of the product (amine, nitrile, alcohol) and its number of carbon atoms' },
    controlled: { mn: 'Ижил галогеналкан (бромоэтан), урвалжийн ижил моль тоо', en: 'The same halogenoalkane (bromoethane) and the same amount of reagent' },
    limitation: {
      mn: 'KCN ба HCN маш хортой тул энэ туршилтыг сургуулийн лабораторид хийхгүй, цаасан дээр, тэгшитгэлээр гүйцэтгэнэ. Галогеналкан илүүдэлтэй үед амин цааш урвалд орж холимог үүсдэгийг энгийн тэгшитгэл харуулахгүй.',
      en: 'KCN and HCN are very toxic, so this test is done on paper with equations, not in a school laboratory. A simple equation also hides that, with excess halogenoalkane, the amine reacts further to give a mixture.'
    },
    keyPoints: [
      { mn: 'Галогеналкан + илүүдэл NH₃ (этанолд, даралтын дор халаана) → анхдагч амин: CH₃CH₂Br + 2NH₃ → CH₃CH₂NH₂ + NH₄Br.', en: 'Halogenoalkane + excess NH₃ (in ethanol, heated under pressure) → primary amine: CH₃CH₂Br + 2NH₃ → CH₃CH₂NH₂ + NH₄Br.' },
      { mn: 'Галогеналкан + KCN (этанолд, халаана) → нитрил; нүүрстөрөгчийн гинж нэг атомаар уртасна: CH₃CH₂Br + KCN → CH₃CH₂CN + KBr.', en: 'Halogenoalkane + KCN (in ethanol, heated) → nitrile, and the carbon chain gets one atom longer: CH₃CH₂Br + KCN → CH₃CH₂CN + KBr.' },
      { mn: 'Альдегид эсвэл кетон + HCN (KCN катализатортой, халаана) → гидроксинитрил: CH₃CHO + HCN → CH₃CH(OH)CN. Энэ бол нуклеофил нэгдэх урвал.', en: 'Aldehyde or ketone + HCN (with KCN as catalyst, heated) → hydroxynitrile: CH₃CHO + HCN → CH₃CH(OH)CN. This is nucleophilic addition.' },
      { mn: 'Нитрилийг шингэлсэн хүчилтэй, эсвэл шингэлсэн шүлттэй буцалгаад хүчилжүүлэхэд карбоксилын хүчил үүснэ: CH₃CH₂CN + 2H₂O + H⁺ → CH₃CH₂COOH + NH₄⁺.', en: 'Heating a nitrile with dilute acid, or with dilute alkali and then acidifying, gives a carboxylic acid: CH₃CH₂CN + 2H₂O + H⁺ → CH₃CH₂COOH + NH₄⁺.' }
    ],
    glossary: [
      { term: { mn: 'Анхдагч амин', en: 'Primary amine' }, def: { mn: 'Азот нэг алкил бүлэгтэй холбогдсон, –NH₂ бүлэгтэй нэгдэл.', en: 'A compound with an –NH₂ group, the nitrogen bonded to one alkyl group.' } },
      { term: { mn: 'Нитрил', en: 'Nitrile' }, def: { mn: '–C≡N бүлэгтэй нэгдэл.', en: 'A compound containing the –C≡N group.' } },
      { term: { mn: 'Гидроксинитрил', en: 'Hydroxynitrile' }, def: { mn: 'Нэг молекулд –OH ба –CN бүлэгтэй нэгдэл.', en: 'A compound with both an –OH and a –CN group.' } }
    ],
    structured: {
      prompt: { mn: 'Бромоэтанаас пропаны хүчил гаргах хоёр шатны замыг урвалж, нөхцөл ба завсрын бодисын хамт бич.', en: 'Give a two-step route from bromoethane to propanoic acid, with the reagents, conditions and intermediate.' },
      marks: [
        { mn: '1-р шат: этанол дахь KCN-тэй халаана (1)', en: 'Step 1: heat with KCN in ethanol (1)' },
        { mn: 'Завсрын бодис: пропаннитрил, CH₃CH₂CN (1)', en: 'Intermediate: propanenitrile, CH₃CH₂CN (1)' },
        { mn: '2-р шат: шингэлсэн хүчилтэй (эсвэл шингэлсэн шүлттэй, дараа нь хүчилжүүлж) буцалгана (1)', en: 'Step 2: heat with dilute acid (or dilute alkali, then acidify) (1)' },
        { mn: 'Бүтээгдэхүүн: CH₃CH₂COOH (1)', en: 'Product: CH₃CH₂COOH (1)' }
      ],
      total: 4
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Галогеналканаас анхдагч амин гаргах урвалж ба нөхцөл аль нь вэ?', en: 'Which reagent and conditions turn a halogenoalkane into a primary amine?' },
        options: [
          { mn: 'NaOH-ийн уусмалтай халаах', en: 'Heat with aqueous NaOH' },
          { mn: 'Төвлөрсөн H₂SO₄', en: 'Concentrated H₂SO₄' },
          { mn: 'Этанол дахь KCN-тэй халаах', en: 'Heat with KCN in ethanol' },
          { mn: 'Этанол дахь илүүдэл NH₃-тай даралтын дор халаах', en: 'Heat with excess NH₃ in ethanol under pressure' }
        ],
        answer: 3,
        explanation: { mn: 'NH₃ нуклеофил болж галогенийг орлоно; илүүдэл NH₃ цааш орлолтыг багасгана.', en: 'NH₃ acts as a nucleophile and replaces the halogen; excess NH₃ keeps further substitution low.' }
      },
      {
        level: 'medium',
        prompt: { mn: 'Пропаналь HCN-тэй (KCN катализатортой) урвалд ороход юу үүсэх вэ?', en: 'What forms when propanal reacts with HCN (KCN catalyst)?' },
        options: [
          { mn: 'CH₃CH₂CH(OH)CN', en: 'CH₃CH₂CH(OH)CN' },
          { mn: 'CH₃CH₂CH₂CN', en: 'CH₃CH₂CH₂CN' },
          { mn: 'CH₃CH₂COOH', en: 'CH₃CH₂COOH' },
          { mn: 'CH₃CH₂CH₂NH₂', en: 'CH₃CH₂CH₂NH₂' }
        ],
        answer: 0,
        explanation: { mn: 'CN⁻ нь C=O-ийн нүүрстөрөгч рүү нэгдэж, хүчилтөрөгч H авч –OH болно: 2-гидроксибутаннитрил.', en: 'CN⁻ adds to the carbon of C=O and the oxygen gains H to become –OH: 2-hydroxybutanenitrile.' }
      },
      {
        level: 'hard',
        prompt: { mn: '1-бромпропанаас бутаны хүчил гаргах замыг санал болгож, урвал бүрийн төрлийг нэрлэ.', en: 'Suggest a route from 1-bromopropane to butanoic acid, naming the type of each reaction.' },
        model: {
          mn: '1) Этанол дахь KCN-тэй халаана → бутаннитрил CH₃CH₂CH₂CN (нуклеофил орлолт, гинж уртасна). 2) Шингэлсэн хүчилтэй буцалгана → бутаны хүчил CH₃CH₂CH₂COOH (гидролиз).',
          en: '1) Heat with KCN in ethanol → butanenitrile, CH₃CH₂CH₂CN (nucleophilic substitution; the chain gets longer). 2) Heat with dilute acid → butanoic acid, CH₃CH₂CH₂COOH (hydrolysis).'
        },
        explanation: { mn: 'Гурван нүүрстөрөгчөөс дөрөв болгохын тулд –CN нэмэх шаардлагатай.', en: 'Going from three carbon atoms to four needs the –CN group.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Галогеналканаас нитрил гаргах урвалж аль нь вэ?', en: 'Which reagent turns a halogenoalkane into a nitrile?' },
        options: [{ mn: 'Этанол дахь KCN, халаах', en: 'KCN in ethanol, heat' }, { mn: 'NH₃', en: 'NH₃' }, { mn: 'NaOH-ийн уусмал', en: 'Aqueous NaOH' }, { mn: 'HBr', en: 'HBr' }],
        answer: 0,
        explanation: { mn: 'CN⁻ нуклеофил галогенийг орлоно.', en: 'The CN⁻ nucleophile replaces the halogen.' }
      },
      {
        question: { mn: 'CH₃CN-ийг шингэлсэн хүчилтэй буцалгахад юу үүсэх вэ?', en: 'Heating CH₃CN with dilute acid gives:' },
        options: [{ mn: 'CH₃CH₂OH', en: 'CH₃CH₂OH' }, { mn: 'CH₃NH₂', en: 'CH₃NH₂' }, { mn: 'CH₃COOH', en: 'CH₃COOH' }, { mn: 'CH₃CHO', en: 'CH₃CHO' }],
        answer: 2,
        explanation: { mn: 'Нитрилийн гидролизоор карбоксилын хүчил үүснэ: этанойн хүчил.', en: 'Hydrolysis of a nitrile gives a carboxylic acid: ethanoic acid.' }
      },
      {
        question: { mn: 'Галогеналкан илүүдэлтэй үед аммиактай урвалд юу нэмэлтээр үүсэх вэ?', en: 'With excess halogenoalkane, the reaction with ammonia also gives:' },
        options: [{ mn: 'Нитрил', en: 'Nitriles' }, { mn: 'Хоёрдогч ба гуравдагч амин', en: 'Secondary and tertiary amines' }, { mn: 'Алкен', en: 'Alkenes' }, { mn: 'Карбоксилын хүчил', en: 'Carboxylic acids' }],
        answer: 1,
        explanation: { mn: 'Анхдагч амин өөрөө нуклеофил тул галогеналкантай цааш урвалд орно.', en: 'The primary amine is itself a nucleophile, so it reacts further with the halogenoalkane.' }
      }
    ]
  },
  'al-ch-20': {
    question: {
      mn: 'Мономерийн бүтэц полимерийн давтагдах нэгжийг яаж тодорхойлох вэ, эсрэгээр нь полимерээс мономерийг яаж олох вэ?',
      en: 'How does the structure of a monomer decide the repeat unit of its polymer, and how can the monomer be found from the polymer?'
    },
    independent: { mn: 'Мономер: этен, хлороэтен, пропен', en: 'The monomer: ethene, chloroethene, or propene' },
    dependent: { mn: 'Давтагдах нэгж ба полимерийн нэр', en: 'The repeat unit and the name of the polymer' },
    controlled: { mn: 'Нэмэлтийн полимержилт: C=C холбоо нээгдэнэ, атом алдагдахгүй', en: 'Addition polymerisation: the C=C bond opens and no atoms are lost' },
    limitation: {
      mn: 'Цаасан загвар гинжийн бодит урт, салаалалт, полимерийн шинж чанарт нөлөөлөх молекул хоорондын хүчийг харуулахгүй.',
      en: 'A paper model does not show the real chain length, branching, or the intermolecular forces that decide a polymer’s properties.'
    },
    keyPoints: [
      { mn: 'Нэмэлтийн полимержилтэд мономерийн C=C холбоо нээгдэж, мономерууд урт гинж үүсгэнэ; дагалдах бүтээгдэхүүн үүсэхгүй.', en: 'In addition polymerisation the C=C bonds of the monomers open and the monomers join into a long chain; there is no by-product.' },
      { mn: 'Давтагдах нэгжийг бичихдээ мономерийн C=C-г C–C болгож, хоёр захаас нь холбоо гаргана: этен → –CH₂–CH₂–, хлороэтен → –CH₂–CHCl– (PVC).', en: 'To write the repeat unit, change the monomer’s C=C to C–C and draw a bond out from each end: ethene → –CH₂–CH₂–, chloroethene → –CH₂–CHCl– (PVC).' },
      { mn: 'Полимерийн хэсгээс мономерийг олохдоо гол гинжийг хоёр нүүрстөрөгч тутамд хувааж, тэдгээрийн хооронд C=C тавина.', en: 'To find the monomer from a section of polymer, split the main chain every two carbon atoms and put a C=C between them.' },
      { mn: 'Полиалкенууд биологийн задралгүй тул хогийн цэгт удаан хадгалагдана; шатаахад CO, PVC-ээс HCl зэрэг хортой хий ялгарна.', en: 'Poly(alkene)s are non-biodegradable, so they last a long time in landfill; burning them releases harmful gases such as CO, and HCl from PVC.' }
    ],
    glossary: [
      { term: { mn: 'Мономер', en: 'Monomer' }, def: { mn: 'Олноороо холбогдож полимер үүсгэх жижиг молекул.', en: 'A small molecule that joins with many others to form a polymer.' } },
      { term: { mn: 'Давтагдах нэгж', en: 'Repeat unit' }, def: { mn: 'Полимерийн гинжин дагуу давтагдах хамгийн жижиг хэсэг.', en: 'The smallest part that repeats along a polymer chain.' } },
      { term: { mn: 'Нэмэлтийн полимержилт', en: 'Addition polymerisation' }, def: { mn: 'C=C холбоотой мономерууд нэгдэж, өөр бүтээгдэхүүнгүйгээр полимер үүсгэх урвал.', en: 'The joining of monomers with C=C bonds into a polymer, with no other product.' } }
    ],
    structured: {
      prompt: { mn: 'Хлороэтенээс PVC хэрхэн үүсэхийг тайлбарлаж, давтагдах нэгжийг бич.', en: 'Explain how PVC is formed from chloroethene, and give its repeat unit.' },
      marks: [
        { mn: 'Нэмэлтийн полимержилт (1)', en: 'Addition polymerisation (1)' },
        { mn: 'C=C холбоо нээгдэж, мономерууд хоорондоо холбогдоно; өөр бүтээгдэхүүн үүсэхгүй (1)', en: 'The C=C bonds open and the monomers join; nothing else is formed (1)' },
        { mn: 'Давтагдах нэгж: –CH₂–CHCl– (1)', en: 'Repeat unit: –CH₂–CHCl– (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Нэмэлтийн полимер үүсгэх мономерт заавал юу байх ёстой вэ?', en: 'What must a monomer have to form an addition polymer?' },
        options: [{ mn: '–OH бүлэг', en: 'An –OH group' }, { mn: 'C=C давхар холбоо', en: 'A C=C double bond' }, { mn: '–COOH бүлэг', en: 'A –COOH group' }, { mn: 'Хлорын атом', en: 'A chlorine atom' }],
        answer: 1,
        explanation: { mn: 'C=C холбоо нээгдэж мономерууд холбогдоно.', en: 'The C=C bond opens so that the monomers can join.' }
      },
      {
        level: 'medium',
        prompt: { mn: 'Пропенээс үүсэх полимерийн давтагдах нэгж аль нь вэ?', en: 'Which is the repeat unit of the polymer made from propene?' },
        options: [{ mn: '–CH₂–CH₂–CH₂–', en: '–CH₂–CH₂–CH₂–' }, { mn: '–CH₂–CH₂–', en: '–CH₂–CH₂–' }, { mn: '–CH₂–CH(CH₃)–', en: '–CH₂–CH(CH₃)–' }, { mn: '–CH=CH(CH₃)–', en: '–CH=CH(CH₃)–' }],
        answer: 2,
        explanation: { mn: 'CH₂=CH–CH₃-ийн C=C нээгдэхэд –CH₃ салбар болж үлдэнэ.', en: 'When the C=C of CH₂=CH–CH₃ opens, the –CH₃ is left as a side group.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Полимерийн хэсэг: –CH₂–CH(CN)–CH₂–CH(CN)–. Мономерийг тодорхойлж, яаж олсноо тайлбарла.', en: 'A section of polymer is –CH₂–CH(CN)–CH₂–CH(CN)–. Identify the monomer and explain how you found it.' },
        model: {
          mn: 'Давтагдах нэгж –CH₂–CH(CN)– (хоёр нүүрстөрөгч). Тэдгээрийн хооронд C=C тавихад мономер CH₂=CH–CN, пропеннитрил.',
          en: 'The repeat unit is –CH₂–CH(CN)– (two carbon atoms). Putting a C=C between them gives the monomer CH₂=CH–CN, propenenitrile.'
        },
        explanation: { mn: 'Гол гинжийг хоёр нүүрстөрөгч тутамд хуваана.', en: 'Split the main chain every two carbon atoms.' }
      }
    ],
    exit: [
      {
        question: { mn: 'PVC-ийн мономер аль нь вэ?', en: 'What is the monomer of PVC?' },
        options: [{ mn: 'Этен', en: 'Ethene' }, { mn: 'Хлороэтан', en: 'Chloroethane' }, { mn: 'Пропен', en: 'Propene' }, { mn: 'Хлороэтен', en: 'Chloroethene' }],
        answer: 3,
        explanation: { mn: 'PVC = поли(хлороэтен); мономер нь CH₂=CHCl.', en: 'PVC is poly(chloroethene); its monomer is CH₂=CHCl.' }
      },
      {
        question: { mn: 'Нэмэлтийн полимержилтийн үед юу ялгарах вэ?', en: 'What is given off during addition polymerisation?' },
        options: [{ mn: 'Юу ч ялгарахгүй', en: 'Nothing' }, { mn: 'Ус', en: 'Water' }, { mn: 'HCl', en: 'HCl' }, { mn: 'CO₂', en: 'CO₂' }],
        answer: 0,
        explanation: { mn: 'Мономерийн бүх атом полимерт ордог.', en: 'Every atom of the monomers ends up in the polymer.' }
      },
      {
        question: { mn: 'Полиалкенийг устгахад хүндрэлтэй байгаа гол шалтгаан аль нь вэ?', en: 'Why are poly(alkene)s hard to dispose of?' },
        options: [
          { mn: 'Усанд хурдан уусдаг', en: 'They dissolve quickly in water' },
          { mn: 'Биологийн задралгүй, шатаахад хортой хий гардаг', en: 'They are non-biodegradable and burning them gives harmful gases' },
          { mn: 'Цахилгаан дамжуулдаг', en: 'They conduct electricity' },
          { mn: 'Хэт хурдан задардаг', en: 'They break down too fast' }
        ],
        answer: 1,
        explanation: { mn: 'Ханасан C–C гинжийг бичил биет задалж чаддаггүй.', en: 'Microorganisms cannot break down the saturated C–C chains.' }
      }
    ]
  },
  'al-ch-21': {
    question: {
      mn: 'Олон функциональ бүлэгтэй молекулд бүлэг бүр өөрийн урвалаар урвалд ордог уу? Үүнийг ашиглан синтезийн замыг яаж төлөвлөх вэ?',
      en: 'In a molecule with several functional groups, does each group react in its own way? How can that be used to plan a synthetic route?'
    },
    independent: { mn: '2-гидроксипропаны хүчил CH₃CH(OH)COOH-д нэмэх урвалж: Na, Na₂CO₃, хүчилжүүлсэн K₂Cr₂O₇ (халаах)', en: 'The reagent added to 2-hydroxypropanoic acid, CH₃CH(OH)COOH: Na, Na₂CO₃, or acidified K₂Cr₂O₇ (heated)' },
    dependent: { mn: 'Аль функциональ бүлэг урвалд орох, ажиглалт (хий, өнгөний өөрчлөлт)', en: 'Which functional group reacts, and what is seen (a gas, a colour change)' },
    controlled: { mn: 'Ижил нэгдэл, ижил хэмжээ', en: 'The same compound and the same amount' },
    limitation: {
      mn: 'Бодит синтезд гарц, цэвэршүүлэлт, дагалдах бүтээгдэхүүн, урвалын хурд нөлөөлнө; цаасан зам үүнийг харуулахгүй.',
      en: 'In a real synthesis the yield, purification, by-products and rate all matter; a route on paper does not show them.'
    },
    keyPoints: [
      { mn: 'Олон функциональ бүлэгтэй молекулд бүлэг бүр хөтөлбөрийн өөрийн урвалаар урвалд орно: –COOH нь Na₂CO₃-тай CO₂ ялгаруулна, –OH ба –COOH хоёулаа Na-тай H₂ ялгаруулна.', en: 'In a polyfunctional molecule each group reacts as it does on its own: –COOH gives CO₂ with Na₂CO₃, and both –OH and –COOH give H₂ with Na.' },
      { mn: 'Хоёрдогч спирт хүчилжүүлсэн K₂Cr₂O₇-оор кетон болно; уусмал улбар шараас ногоон болно.', en: 'A secondary alcohol is oxidised to a ketone by acidified K₂Cr₂O₇; the solution turns from orange to green.' },
      { mn: 'Синтезийн замыг зорилтот молекулаас ухрааж төлөвлөнө: функциональ бүлгүүдийг харьцуулж, шат бүрт урвалж, нөхцөл, урвалын төрлийг бичнэ.', en: 'Plan a route by working back from the target molecule: compare the functional groups, and give the reagent, conditions and reaction type for each step.' },
      { mn: 'KCN эсвэл HCN-ээр –CN нэмэх нь нүүрстөрөгчийн гинжийг нэг атомаар уртасгадаг.', en: 'Adding –CN with KCN or HCN makes the carbon chain one atom longer.' }
    ],
    glossary: [
      { term: { mn: 'Синтезийн зам', en: 'Synthetic route' }, def: { mn: 'Эхлэлийн бодисоос зорилтот молекулд хүрэх урвалын дараалал.', en: 'The sequence of reactions from a starting material to a target molecule.' } },
      { term: { mn: 'Олон функциональ бүлэгтэй нэгдэл', en: 'Polyfunctional compound' }, def: { mn: 'Хоёр ба түүнээс олон функциональ бүлэгтэй нэгдэл.', en: 'A compound with two or more functional groups.' } },
      { term: { mn: 'Дагалдах бүтээгдэхүүн', en: 'By-product' }, def: { mn: 'Зорилтот бүтээгдэхүүнтэй зэрэгцэн үүсэх өөр бодис.', en: 'A substance formed alongside the desired product.' } }
    ],
    structured: {
      prompt: { mn: 'Этенээс этанойн хүчил гаргах хоёр шатны замыг урвалж, нөхцөл, урвалын төрлийн хамт бич.', en: 'Give a two-step route from ethene to ethanoic acid, with the reagents, conditions and type of each reaction.' },
      marks: [
        { mn: '1-р шат: уураар, H₃PO₄ катализатортой, өндөр температур ба даралтад → этанол (1)', en: 'Step 1: steam with an H₃PO₄ catalyst at high temperature and pressure → ethanol (1)' },
        { mn: 'Урвалын төрөл: электрофил нэгдэл (гидратаци) (1)', en: 'Type: electrophilic addition (hydration) (1)' },
        { mn: '2-р шат: хүчилжүүлсэн K₂Cr₂O₇-ийн илүүдэлтэй буцаан хөргөгчтэй халаана → этанойн хүчил (1)', en: 'Step 2: heat under reflux with excess acidified K₂Cr₂O₇ → ethanoic acid (1)' },
        { mn: 'Урвалын төрөл: исэлдэлт (1)', en: 'Type: oxidation (1)' }
      ],
      total: 4
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'CH₃CH(OH)COOH-ийн аль бүлэг Na₂CO₃-тай урвалд орж CO₂ ялгаруулах вэ?', en: 'Which group in CH₃CH(OH)COOH reacts with Na₂CO₃ to give CO₂?' },
        options: [{ mn: '–OH', en: '–OH' }, { mn: '–CH₃', en: '–CH₃' }, { mn: '–COOH', en: '–COOH' }, { mn: 'Хоёулаа (–OH ба –COOH)', en: 'Both (–OH and –COOH)' }],
        answer: 2,
        explanation: { mn: 'Зөвхөн хүчил (–COOH) карбонатаас CO₂ ялгаруулах хангалттай хүчтэй; спирт тийм биш.', en: 'Only the acid (–COOH) is strong enough to release CO₂ from a carbonate; the alcohol is not.' }
      },
      {
        level: 'medium',
        prompt: { mn: 'CH₃CH(OH)COOH-ийг хүчилжүүлсэн K₂Cr₂O₇-тай халаахад ямар бүлэг үүсэх вэ?', en: 'Heating CH₃CH(OH)COOH with acidified K₂Cr₂O₇ gives which group?' },
        options: [{ mn: 'Кетон (C=O)', en: 'A ketone (C=O)' }, { mn: 'Альдегид (–CHO)', en: 'An aldehyde (–CHO)' }, { mn: 'Алкен (C=C)', en: 'An alkene (C=C)' }, { mn: 'Эфир (–COO–)', en: 'An ester (–COO–)' }],
        answer: 0,
        explanation: { mn: '–OH нь хоёрдогч спиртийн бүлэг тул кетон болно: CH₃COCOOH.', en: 'The –OH is a secondary alcohol group, so it becomes a ketone: CH₃COCOOH.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Зөвхөн пропан-1-олоос пропил пропаноат (эфир) гаргах замыг санал болго.', en: 'Suggest a route to propyl propanoate (an ester) using propan-1-ol as the only organic starting material.' },
        model: {
          mn: 'Пропан-1-олын нэг хэсгийг хүчилжүүлсэн K₂Cr₂O₇-ийн илүүдэлтэй буцаан хөргөгчтэй халааж пропаны хүчил болгоно (исэлдэлт). Дараа нь пропаны хүчлийг пропан-1-олын нөгөө хэсэгтэй төвлөрсөн H₂SO₄ катализатортой халаана → CH₃CH₂COOCH₂CH₂CH₃ (эстерификаци).',
          en: 'Heat part of the propan-1-ol under reflux with excess acidified K₂Cr₂O₇ to make propanoic acid (oxidation). Then heat the propanoic acid with the rest of the propan-1-ol and a concentrated H₂SO₄ catalyst → CH₃CH₂COOCH₂CH₂CH₃ (esterification).'
        },
        explanation: { mn: 'Эфирийн хоёр хэсэг (хүчил ба спирт) хоёулаа ижил эхлэлийн бодисоос гарна.', en: 'Both halves of the ester, the acid and the alcohol, come from the same starting material.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Этеныг этанол болгох урвал ямар төрлийн урвал вэ?', en: 'Turning ethene into ethanol is:' },
        options: [{ mn: 'Орлолт', en: 'Substitution' }, { mn: 'Нэгдэл (гидратаци)', en: 'Addition (hydration)' }, { mn: 'Исэлдэлт', en: 'Oxidation' }, { mn: 'Задрал', en: 'Elimination' }],
        answer: 1,
        explanation: { mn: 'H₂O нь C=C холбоонд нэгдэнэ.', en: 'H₂O adds across the C=C bond.' }
      },
      {
        question: { mn: 'CH₃CH(OH)COOH натритай урвалд ороход аль бүлэг H₂ ялгаруулах вэ?', en: 'When CH₃CH(OH)COOH reacts with sodium, which groups give H₂?' },
        options: [{ mn: 'Зөвхөн –COOH', en: 'Only –COOH' }, { mn: 'Зөвхөн –OH', en: 'Only –OH' }, { mn: '–OH ба –COOH хоёулаа', en: 'Both –OH and –COOH' }, { mn: 'Аль нь ч биш', en: 'Neither' }],
        answer: 2,
        explanation: { mn: 'Натри O–H холбоотой хоёр бүлэгтэй хоёулаатай нь урвалд орно.', en: 'Sodium reacts with both groups that contain an O–H bond.' }
      },
      {
        question: { mn: 'Нүүрстөрөгчийн гинжийг нэг атомаар уртасгахад аль урвалжийг хэрэглэх вэ?', en: 'Which reagent makes a carbon chain one atom longer?' },
        options: [{ mn: 'KCN', en: 'KCN' }, { mn: 'NaOH', en: 'NaOH' }, { mn: 'NH₃', en: 'NH₃' }, { mn: 'HBr', en: 'HBr' }],
        answer: 0,
        explanation: { mn: '–CN бүлэг нэг нүүрстөрөгч нэмнэ.', en: 'The –CN group adds one carbon atom.' }
      }
    ]
  },
  'al-ch-22': {
    question: {
      mn: 'IR спектр ба масс спектрээр үл мэдэгдэх органик бодисыг яаж тодорхойлох вэ?',
      en: 'How can an infrared spectrum and a mass spectrum identify an unknown organic compound?'
    },
    independent: { mn: 'Шинжлэх нэгдэл: этанол, этанойн хүчил, пропанон', en: 'The compound analysed: ethanol, ethanoic acid, or propanone' },
    dependent: { mn: 'IR шингээлтийн зурвас (O–H, C=O) ба M⁺ пикийн m/e', en: 'The IR absorptions (O–H, C=O) and the m/e of the M⁺ peak' },
    controlled: { mn: 'Ижил хэмжилтийн арга, ижил долгионы тооны муж (4000–400 cm⁻¹)', en: 'The same method and the same wavenumber range (4000–400 cm⁻¹)' },
    limitation: {
      mn: 'IR функциональ бүлгийг харуулна, гэхдээ бүтэн бүтцийг ганцаараа тогтоохгүй; изомерууд ижил M⁺ пиктэй тул масс спектр тэднийг үргэлж ялгахгүй. Хоёр аргыг хамт хэрэглэнэ.',
      en: 'IR shows the functional groups but not the whole structure on its own, and isomers share the same M⁺ peak, so a mass spectrum cannot always tell them apart. The two are used together.'
    },
    keyPoints: [
      { mn: 'IR: холбоо бүр тодорхой долгионы тоонд шингээнэ. Спиртийн O–H 3200–3600 cm⁻¹ өргөн, хүчлийн O–H 2500–3000 cm⁻¹ маш өргөн, C=O 1670–1740 cm⁻¹ хурц.', en: 'IR: each bond absorbs at its own wavenumbers. Alcohol O–H is broad at 3200–3600 cm⁻¹, acid O–H very broad at 2500–3000 cm⁻¹, and C=O sharp at 1670–1740 cm⁻¹.' },
      { mn: 'Масс спектрийн M⁺ (молекулын ион) пик харьцангуй молекулын массыг өгнө; задралын пикүүд (m/e 15 = CH₃⁺, 29 = C₂H₅⁺) бүтцийн сэжүүр болно.', en: 'The M⁺ (molecular ion) peak of a mass spectrum gives the relative molecular mass; fragment peaks (m/e 15 = CH₃⁺, 29 = C₂H₅⁺) are clues to the structure.' },
      { mn: 'Нүүрстөрөгчийн тоо: n = 100 × [M+1]⁺-ийн эрчим ÷ (1.1 × M⁺-ийн эрчим).', en: 'Number of carbon atoms: n = 100 × abundance of [M+1]⁺ ÷ (1.1 × abundance of M⁺).' },
      { mn: 'M⁺ : [M+2]⁺ ≈ 3 : 1 бол нэг Cl атом, ≈ 1 : 1 бол нэг Br атом байна.', en: 'M⁺ : [M+2]⁺ of about 3 : 1 shows one Cl atom; about 1 : 1 shows one Br atom.' },
      { mn: 'Ar = Σ(изотопын масс × эзлэх хувь) ÷ 100.', en: 'Ar = Σ(isotope mass × percentage abundance) ÷ 100.' }
    ],
    glossary: [
      { term: { mn: 'Молекулын ион (M⁺)', en: 'Molecular ion (M⁺)' }, def: { mn: 'Молекулаас нэг электрон алдагдаж үүссэн ион; пик нь Mr-ыг өгнө.', en: 'The ion formed when a molecule loses one electron; its peak gives Mr.' } },
      { term: { mn: 'Долгионы тоо', en: 'Wavenumber' }, def: { mn: 'IR спектрийн тэнхлэг, cm⁻¹-ээр.', en: 'The axis of an IR spectrum, in cm⁻¹.' } },
      { term: { mn: 'Задралын ион', en: 'Fragment ion' }, def: { mn: 'Молекулын ион задарч үүсэх жижиг ион.', en: 'A smaller ion formed when the molecular ion breaks apart.' } }
    ],
    structured: {
      prompt: {
        mn: 'Нэгдлийн IR спектрт 2500–3000 cm⁻¹-т маш өргөн, 1710 cm⁻¹-т хурц шингээлт байна. Масс спектрийн M⁺ пик m/e = 60. Нэгдлийг тодорхойлж, үндэслэлээ бич.',
        en: 'The IR spectrum of a compound has a very broad absorption at 2500–3000 cm⁻¹ and a sharp one at 1710 cm⁻¹. The M⁺ peak of its mass spectrum is at m/e = 60. Identify the compound, giving your reasons.'
      },
      marks: [
        { mn: '2500–3000 cm⁻¹ өргөн → карбоксилын хүчлийн O–H (1)', en: 'Broad 2500–3000 cm⁻¹ → O–H of a carboxylic acid (1)' },
        { mn: '1710 cm⁻¹ → C=O (1)', en: '1710 cm⁻¹ → C=O (1)' },
        { mn: 'M⁺ = 60 тул Mr = 60 (1)', en: 'M⁺ at 60, so Mr = 60 (1)' },
        { mn: 'CH₃COOH, этанойн хүчил (1)', en: 'CH₃COOH, ethanoic acid (1)' }
      ],
      total: 4
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Масс спектрийн аль пик харьцангуй молекулын массыг өгөх вэ?', en: 'Which peak of a mass spectrum gives the relative molecular mass?' },
        options: [{ mn: 'Хамгийн өндөр пик', en: 'The tallest peak' }, { mn: 'm/e = 15 пик', en: 'The peak at m/e = 15' }, { mn: '[M+1]⁺ пик', en: 'The [M+1]⁺ peak' }, { mn: 'M⁺ (молекулын ион) пик', en: 'The M⁺ (molecular ion) peak' }],
        answer: 3,
        explanation: { mn: 'M⁺ бол бүтэн молекулаас үүссэн ион; [M+1]⁺ нь ¹³C-ээс болсон жижиг пик.', en: 'M⁺ is the ion of the whole molecule; [M+1]⁺ is a small peak caused by ¹³C.' }
      },
      {
        level: 'medium',
        prompt: { mn: 'M⁺ пикийн эрчим 40, [M+1]⁺ пикийнх 1.76. Молекулд хэдэн нүүрстөрөгч байх вэ?', en: 'The M⁺ peak has abundance 40 and the [M+1]⁺ peak 1.76. How many carbon atoms are in the molecule?' },
        options: [{ mn: '2', en: '2' }, { mn: '3', en: '3' }, { mn: '4', en: '4' }, { mn: '5', en: '5' }],
        answer: 2,
        explanation: { mn: 'n = 100 × 1.76 ÷ (1.1 × 40) = 176 ÷ 44 = 4.', en: 'n = 100 × 1.76 ÷ (1.1 × 40) = 176 ÷ 44 = 4.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Хлорт ³⁵Cl 75%, ³⁷Cl 25% байна. Ar-ыг тооцоолж, CH₃Cl-ийн масс спектрт M⁺ ба [M+2]⁺ пик хаана, ямар харьцаатай гарахыг тайлбарла.', en: 'Chlorine is 75% ³⁵Cl and 25% ³⁷Cl. Calculate Ar, and explain where the M⁺ and [M+2]⁺ peaks of CH₃Cl appear and in what ratio.' },
        model: {
          mn: 'Ar = (35 × 75 + 37 × 25) ÷ 100 = 35.5. CH₃³⁵Cl → m/e 50 (M⁺), CH₃³⁷Cl → m/e 52 ([M+2]⁺); эрчмийн харьцаа 3 : 1.',
          en: 'Ar = (35 × 75 + 37 × 25) ÷ 100 = 35.5. CH₃³⁵Cl → m/e 50 (M⁺), CH₃³⁷Cl → m/e 52 ([M+2]⁺), in the ratio 3 : 1.'
        },
        explanation: { mn: 'Пикийн өндрийн харьцаа изотопын эзлэх хувийн харьцаатай тэнцүү.', en: 'The ratio of peak heights equals the ratio of the isotope abundances.' }
      }
    ],
    exit: [
      {
        question: { mn: '1700 cm⁻¹ орчимд хурц шингээлт юуг заах вэ?', en: 'A sharp absorption near 1700 cm⁻¹ shows:' },
        options: [{ mn: 'C=O', en: 'C=O' }, { mn: 'O–H', en: 'O–H' }, { mn: 'C–H', en: 'C–H' }, { mn: 'N–H', en: 'N–H' }],
        answer: 0,
        explanation: { mn: 'C=O 1670–1740 cm⁻¹-т шингээнэ.', en: 'C=O absorbs at 1670–1740 cm⁻¹.' }
      },
      {
        question: { mn: 'M⁺ : [M+2]⁺ ≈ 1 : 1 бол молекулд юу байх вэ?', en: 'An M⁺ : [M+2]⁺ ratio of about 1 : 1 shows:' },
        options: [{ mn: 'Нэг Cl атом', en: 'One Cl atom' }, { mn: 'Нэг Br атом', en: 'One Br atom' }, { mn: 'Хоёр C атом', en: 'Two C atoms' }, { mn: 'Нэг N атом', en: 'One N atom' }],
        answer: 1,
        explanation: { mn: '⁷⁹Br ба ⁸¹Br бараг тэнцүү хувьтай.', en: '⁷⁹Br and ⁸¹Br are almost equally abundant.' }
      },
      {
        question: { mn: 'Пропанон (CH₃COCH₃)-ы M⁺ пик ямар m/e-д гарах вэ?', en: 'At what m/e is the M⁺ peak of propanone, CH₃COCH₃?' },
        options: [{ mn: '43', en: '43' }, { mn: '15', en: '15' }, { mn: '58', en: '58' }, { mn: '60', en: '60' }],
        answer: 2,
        explanation: { mn: 'Mr = 3 × 12 + 6 × 1 + 16 = 58; 43 нь CH₃CO⁺ задралын ион.', en: 'Mr = 3 × 12 + 6 × 1 + 16 = 58; 43 is the CH₃CO⁺ fragment.' }
      },
      {
        question: { mn: 'Аль нэгдлийн IR спектрт 3200–3600 cm⁻¹-т өргөн шингээлт гарах вэ?', en: 'Which compound has a broad IR absorption at 3200–3600 cm⁻¹?' },
        options: [{ mn: 'Пропанон', en: 'Propanone' }, { mn: 'Этанол', en: 'Ethanol' }, { mn: 'Этан', en: 'Ethane' }, { mn: 'Этил этаноат', en: 'Ethyl ethanoate' }],
        answer: 1,
        explanation: { mn: 'Спиртийн устөрөгчийн холбоотой O–H 3200–3600 cm⁻¹-т өргөн шингээнэ.', en: 'The hydrogen-bonded O–H of an alcohol absorbs broadly at 3200–3600 cm⁻¹.' }
      }
    ]
  }
};
