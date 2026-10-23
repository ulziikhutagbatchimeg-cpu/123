import type { AlevelInquiryPlan } from './alevelInquiryTypes';

// The 40-minute inquiry lessons of 9701 chapters 13 to 18 (organic chemistry). Written for this course from the syllabus.

export const ALEVEL_INQUIRY_PART3: Record<string, AlevelInquiryPlan> = {
  'al-ch-13': {
    question: { mn: 'Гомолог цувралыг нэг ерөнхий томьёо яаж дүрслэх вэ, бүтэц яаж өөрчлөгдөх вэ?', en: 'How can one general formula describe a homologous series, and how does the structure change?' },
    independent: { mn: 'Гинжин дэх нүүрстөрөгчийн тоо (n)', en: 'Number of carbon atoms in the chain (n)' },
    dependent: { mn: 'Молекулын томьёо, буцлах цэг', en: 'Molecular formula and boiling point' },
    controlled: { mn: 'Ижил функциональ бүлэг', en: 'The same functional group' },
    limitation: {
      mn: 'Буцлах цэгийн хандлага нь гинжний урттай холбоотой; салаалалт ба устөрөгчийн холбоо ч нөлөөлнө.',
      en: 'The boiling point trend follows chain length; branching and hydrogen bonding also change it.'
    },
    keyPoints: [
      { mn: 'Гомолог цуваа: ижил функциональ бүлэгтэй, дараалсан гишүүд нь CH₂-оор ялгаатай.', en: 'A homologous series has the same functional group, and successive members differ by CH₂.' },
      { mn: 'Гинж урсах тусам буцлах цэг нэмэгдэнэ.', en: 'The boiling point rises as the chain gets longer.' },
      { mn: 'Ижил томьёотой, бүтэц өөр нэгдлийг структур изомер гэнэ.', en: 'Compounds with the same molecular formula but different structures are structural isomers.' }
    ],
    glossary: [
      { term: { mn: 'Гомолог цуваа', en: 'Homologous series' }, def: { mn: 'Ижил функциональ бүлэгтэй, CH₂-оор ялгаатай нэгдлүүдийн дараалал.', en: 'A series of compounds with the same functional group, each differing by CH₂.' } },
      { term: { mn: 'Функциональ бүлэг', en: 'Functional group' }, def: { mn: 'Нэгдлийн химийн шинжийг тодорхойлох атом эсвэл атомын бүлэг.', en: 'An atom or group of atoms that gives a compound its characteristic reactions.' } },
      { term: { mn: 'Структур изомер', en: 'Structural isomer' }, def: { mn: 'Ижил молекулын томьёо, өөр атомын холболттой нэгдэл.', en: 'Compounds with the same molecular formula but different structural formulas.' } }
    ],
    structured: {
      prompt: { mn: 'Алканы гомолог цувралд буцлах цэг яагаад нэмэгдэх вэ? Тайлбарла.', en: 'Explain why the boiling point increases down a homologous series of alkanes.' },
      marks: [
        { mn: 'Молекул томорч, масс нэмэгдэнэ (1)', en: 'The molecules are larger and heavier (1)' },
        { mn: 'Илүү их электрон тул ван-дер-Ваальсын хүч хүчтэй (1)', en: 'More electrons give stronger van der Waals forces (1)' },
        { mn: 'Молекулуудыг салгахад илүү энерги шаардагдана (1)', en: 'More energy is needed to separate the molecules (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Алкенийн функциональ бүлэг аль нь вэ?', en: 'What is the functional group of the alkenes?' },
        options: [{ mn: 'C=C', en: 'C=C' }, { mn: 'C–O', en: 'C–O' }, { mn: 'C=O', en: 'C=O' }, { mn: '–OH', en: '–OH' }],
        answer: 0,
        explanation: { mn: 'Алкенд C=C давхар холбоо байдаг.', en: 'Alkenes contain a C=C double bond.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'C₄H₁₀-ын структур изомеруудыг нэрлэ.', en: 'Name the structural isomers of C₄H₁₀.' },
        model: { mn: 'Бутан (CH₃CH₂CH₂CH₃) ба 2-метилпропан (CH₃CH(CH₃)CH₃)', en: 'Butane (CH₃CH₂CH₂CH₃) and 2-methylpropane (CH₃CH(CH₃)CH₃)' },
        explanation: { mn: 'Нүүрстөрөгчийн гинжийг салаалуулах замаар өөр изомер үүснэ.', en: 'Branching the carbon chain gives a different isomer.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Алканы ерөнхий томьёо аль нь вэ?', en: 'What is the general formula of the alkanes?' },
        options: [{ mn: 'CₙH₂ₙ', en: 'CₙH₂ₙ' }, { mn: 'CₙH₂ₙ₊₂', en: 'CₙH₂ₙ₊₂' }, { mn: 'CₙH₂ₙ₋₂', en: 'CₙH₂ₙ₋₂' }, { mn: 'CₙH₂ₙO', en: 'CₙH₂ₙO' }],
        answer: 1,
        explanation: { mn: 'Алкан: CₙH₂ₙ₊₂.', en: 'Alkanes are CₙH₂ₙ₊₂.' }
      },
      {
        question: { mn: 'Гомолог цувралын дараалсан гишүүдийн ялгаа аль нь вэ?', en: 'What is the difference between successive members of a homologous series?' },
        options: [{ mn: 'CH₂', en: 'CH₂' }, { mn: 'H₂', en: 'H₂' }, { mn: 'O', en: 'O' }, { mn: 'C₂H₄', en: 'C₂H₄' }],
        answer: 0,
        explanation: { mn: 'Дараалсан гишүүд CH₂-оор ялгаатай.', en: 'Successive members differ by CH₂.' }
      },
      {
        question: { mn: 'Бутантай структур изомер аль нь вэ?', en: 'Which is a structural isomer of butane?' },
        options: [{ mn: 'Этан', en: 'Ethane' }, { mn: '2-метилпропан', en: '2-methylpropane' }, { mn: 'Пропен', en: 'Propene' }, { mn: 'Этанол', en: 'Ethanol' }],
        answer: 1,
        explanation: { mn: 'Ижил C₄H₁₀ томьёотой, салаалсан гинжтэй.', en: 'It has the same formula, C₄H₁₀, with a branched chain.' }
      }
    ]
  },
  'al-ch-14': {
    question: { mn: 'Алкан ба алкен урвалын чадвараараа яаж ялгаатай вэ?', en: 'How do alkanes and alkenes differ in their reactions?' },
    independent: { mn: 'C=C давхар холбооны байгаа эсэх', en: 'Presence of a C=C double bond' },
    dependent: { mn: 'Бромын усны өнгө өөрчлөлт, бүтээгдэхүүний төрөл', en: 'Colour change of bromine water and type of product' },
    controlled: { mn: 'Ижил концентрацийн бромын ус, ижил температур', en: 'Same concentration of bromine water and same temperature' },
    limitation: {
      mn: 'Бромын усны туршилт чанарын; алканы орлуулах урвал ультрагэгээнцэр гэрэл шаарддаг.',
      en: 'The bromine water test is qualitative; alkane substitution needs UV light.'
    },
    keyPoints: [
      { mn: 'Алкан нь ханасан: орлуулах урвалд (Cl₂, УВ гэрэл) орно.', en: 'Alkanes are saturated: they undergo substitution (with Cl₂ in UV light).' },
      { mn: 'Алкен нь ханаагүй: нэмэх урвалд орно.', en: 'Alkenes are unsaturated: they undergo addition reactions.' },
      { mn: 'Бромын ус алкентэй урвалд орж өнгөгүй болно.', en: 'Bromine water is decolourised by alkenes.' }
    ],
    glossary: [
      { term: { mn: 'Ханасан', en: 'Saturated' }, def: { mn: 'Зөвхөн нэг холбоотой; давхар холбоогүй нэгдэл.', en: 'A compound with only single bonds.' } },
      { term: { mn: 'Нэмэх урвал', en: 'Addition reaction' }, def: { mn: 'Давхар холбоонд атом нэмэгдэн нэг бүтээгдэхүүн үүсэх урвал.', en: 'Atoms add across a double bond to give one product.' } },
      { term: { mn: 'Крекинг', en: 'Cracking' }, def: { mn: 'Урт гинжтэй нүүрсустөрөгчийг богино гинжтэй алкан, алкен болгон задлах.', en: 'Breaking long-chain hydrocarbons into shorter alkanes and alkenes.' } }
    ],
    structured: {
      prompt: { mn: 'Гексан ба гекс-1-енийг ялгах туршилтыг үр дүнгийн хамт тайлбарла.', en: 'Describe a test to distinguish hexane from hex-1-ene, with the result.' },
      marks: [
        { mn: 'Бромын ус нэмнэ (1)', en: 'Add bromine water (1)' },
        { mn: 'Гекс-1-ен улбар шараас өнгөгүй болно (1)', en: 'Hex-1-ene turns from orange to colourless (1)' },
        { mn: 'Гексан улбар шар хэвээр байна (1)', en: 'Hexane stays orange (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Алкений ерөнхий томьёо аль нь вэ?', en: 'Which is the general formula of the alkenes?' },
        options: [{ mn: 'CₙH₂ₙ', en: 'CₙH₂ₙ' }, { mn: 'CₙH₂ₙ₊₂', en: 'CₙH₂ₙ₊₂' }, { mn: 'CₙH₂ₙ₋₂', en: 'CₙH₂ₙ₋₂' }, { mn: 'CₙH₂ₙ₊₁', en: 'CₙH₂ₙ₊₁' }],
        answer: 0,
        explanation: { mn: 'Алкен нэг давхар холбоотой тул CₙH₂ₙ.', en: 'An alkene with one double bond is CₙH₂ₙ.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Этен HBr-тэй нэмэх урвалд орвол ямар бүтээгдэхүүн үүсэх вэ?', en: 'Predict the product when ethene reacts with HBr by addition.' },
        model: { mn: 'Бромэтан, CH₃CH₂Br', en: 'Bromoethane, CH₃CH₂Br' },
        explanation: { mn: 'CH₂=CH₂ + HBr → CH₃CH₂Br: давхар холбоо нэмэгдэлээр нээгдэнэ.', en: 'CH₂=CH₂ + HBr → CH₃CH₂Br: the double bond opens and H and Br add across it.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Аль нэгдэл бромын усыг өнгөгүй болгох вэ?', en: 'Bromine water is decolourised by:' },
        options: [{ mn: 'Этан', en: 'Ethane' }, { mn: 'Этен', en: 'Ethene' }, { mn: 'Метан', en: 'Methane' }, { mn: 'Пропан', en: 'Propane' }],
        answer: 1,
        explanation: { mn: 'Этен давхар холбоотой (алкен).', en: 'Ethene has a double bond (it is an alkene).' }
      },
      {
        question: { mn: 'Нүүрсустөрөгчийг крекинг хийхэд юу үүснэ?', en: 'Cracking of hydrocarbons produces:' },
        options: [{ mn: 'Илүү урт алкан', en: 'Longer alkanes' }, { mn: 'Богино алкан ба алкен', en: 'Shorter alkanes and alkenes' }, { mn: 'Зөвхөн ус', en: 'Only water' }, { mn: 'Зөвхөн нүүрс', en: 'Only carbon' }],
        answer: 1,
        explanation: { mn: 'Крекинг нь урт гинжийг богино болгоно.', en: 'Cracking shortens the chains.' }
      },
      {
        question: { mn: 'Никелийн катализатортойгоор алкен устөрөгчтэй ямар урвалд орох вэ?', en: 'An alkene reacts with hydrogen (nickel catalyst) by:' },
        options: [{ mn: 'Орлуулах', en: 'Substitution' }, { mn: 'Нэмэх', en: 'Addition' }, { mn: 'Саармагжилт', en: 'Neutralisation' }, { mn: 'Түлхэх', en: 'Displacement' }],
        answer: 1,
        explanation: { mn: 'H₂ давхар холбоонд нэмэгдэнэ.', en: 'H₂ adds across the double bond.' }
      }
    ]
  },
  'al-ch-15': {
    question: { mn: 'Аль галогеналкан хамгийн хурдан гидролизлэгдэх вэ?', en: 'Which halogenoalkane is hydrolysed fastest?' },
    independent: { mn: 'Галогеналкандах галоген (C–Cl, C–Br, C–I)', en: 'The halogen in the halogenoalkane (C–Cl, C–Br, C–I)' },
    dependent: { mn: 'Мөнгөн нитратын утуурмаг гарах хугацаа', en: 'Time until a precipitate forms with silver nitrate' },
    controlled: { mn: 'Ижил нүүрсустөрөгчийн гинж, ижил температур ба концентраци', en: 'Same carbon chain length, temperature and concentration' },
    limitation: {
      mn: 'Мөнгөн нитратын туршилт нь хурдны ойролцоо утга; утуурмаг харагдах хугацаа ажиглагч ба холилтоос хамаарна.',
      en: 'The silver nitrate test gives an estimate of the rate; the time for a precipitate to show depends on the observer and on mixing.'
    },
    keyPoints: [
      { mn: 'C–X холбооны бат бэх доош бүлэгт буурна; C–I хамгийн сул.', en: 'The C–X bond gets weaker down the group; C–I is the weakest.' },
      { mn: 'Сул холбоотой галогеналкан хурдан гидролизлэгдэнэ.', en: 'A weaker bond gives faster hydrolysis.' },
      { mn: 'AgCl цагаан, AgBr шар-цайвар, AgI шар утуурмаг үүсгэнэ.', en: 'AgCl is white, AgBr cream and AgI yellow.' }
    ],
    glossary: [
      { term: { mn: 'Галогеналкан', en: 'Halogenoalkane' }, def: { mn: 'Нүүрсустөрөгчийн гинжийн нэг атом галогенээр орлуулагдсан нэгдэл.', en: 'A hydrocarbon in which a hydrogen is replaced by a halogen.' } },
      { term: { mn: 'Гидролиз', en: 'Hydrolysis' }, def: { mn: 'Ус эсвэл ОН⁻-ийн нөлөөгөөр холбоо задрах урвал.', en: 'Breaking a bond by reaction with water or OH⁻.' } },
      { term: { mn: 'Нуклеофилийн орлуулах', en: 'Nucleophilic substitution' }, def: { mn: 'Нуклеофил (ОН⁻ гэх мэт) галогенийг орлуулах урвал.', en: 'A nucleophile (such as OH⁻) replaces the halogen.' } }
    ],
    structured: {
      prompt: { mn: '1-иодбутан 1-хлорбутанаас яагаад хурдан гидролизлэгдэх вэ? Тайлбарла.', en: 'Explain why 1-iodobutane hydrolyses faster than 1-chlorobutane.' },
      marks: [
        { mn: 'C–I холбоо сулхан (урт, бат бэх бага) (1)', en: 'The C–I bond is weaker (longer, lower bond enthalpy) (1)' },
        { mn: 'C–I холбоог таслахад бага энерги шаардана (1)', en: 'Less energy is needed to break the C–I bond (1)' },
        { mn: 'Тиймээс хурд их (1)', en: 'So the rate is faster (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Аль утуурмаг шар өнгөтэй вэ?', en: 'Which precipitate is yellow?' },
        options: [{ mn: 'AgCl', en: 'AgCl' }, { mn: 'AgBr', en: 'AgBr' }, { mn: 'AgI', en: 'AgI' }, { mn: 'Ag₂O', en: 'Ag₂O' }],
        answer: 2,
        explanation: { mn: 'AgI шар утуурмаг өгнө.', en: 'AgI gives a yellow precipitate.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Бромэтан усан NaOH-тай гидролизлэгдэх урвалын тэгшитгэлийг бич.', en: 'Write an equation for the hydrolysis of bromoethane with aqueous NaOH.' },
        model: { mn: 'CH₃CH₂Br + NaOH → CH₃CH₂OH + NaBr', en: 'CH₃CH₂Br + NaOH → CH₃CH₂OH + NaBr' },
        explanation: { mn: 'OH⁻ бромыг орлуулж этанол үүсгэнэ.', en: 'OH⁻ replaces the bromine to form ethanol.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Аль холбоо хамгийн сул вэ?', en: 'Which bond is the weakest?' },
        options: [{ mn: 'C–F', en: 'C–F' }, { mn: 'C–Cl', en: 'C–Cl' }, { mn: 'C–Br', en: 'C–Br' }, { mn: 'C–I', en: 'C–I' }],
        answer: 3,
        explanation: { mn: 'Доош бүлэгт холбоо сулардаг; C–I хамгийн сул.', en: 'The bond gets weaker down the group; C–I is the weakest.' }
      },
      {
        question: { mn: 'Хлоралканы ус-спиртийн мөнгөн нитратын уусмалд ямар утуурмаг үүсэх вэ?', en: 'A chloroalkane with silver nitrate solution forms a precipitate of:' },
        options: [{ mn: 'AgCl (цагаан)', en: 'AgCl (white)' }, { mn: 'AgBr (шар-цайвар)', en: 'AgBr (cream)' }, { mn: 'AgI (шар)', en: 'AgI (yellow)' }, { mn: 'Ag₂O', en: 'Ag₂O' }],
        answer: 0,
        explanation: { mn: 'Хлорид нь AgCl цагаан утуурмаг өгнө.', en: 'Chloride gives a white precipitate of AgCl.' }
      },
      {
        question: { mn: 'Галогеналканы гидролизээр юу үүсэх вэ?', en: 'Hydrolysis of a halogenoalkane gives:' },
        options: [{ mn: 'Алкен', en: 'An alkene' }, { mn: 'Спирт', en: 'An alcohol' }, { mn: 'Алкан', en: 'An alkane' }, { mn: 'Эфир', en: 'An ester' }],
        answer: 1,
        explanation: { mn: 'Галоген нь –OH-оор солигдож спирт үүснэ.', en: 'The halogen is replaced by –OH, giving an alcohol.' }
      }
    ]
  },
  'al-ch-16': {
    question: { mn: 'Спиртыг урвалаар нь яаж таних вэ?', en: 'How can an alcohol be identified by its reactions?' },
    independent: { mn: 'Исэлдүүлэгч бодис ба спиртийн төрөл (нэгдүгээр, хоёрдугаар, гуравдугаар)', en: 'Oxidising agent and the type of alcohol (primary, secondary, tertiary)' },
    dependent: { mn: 'Өнгөний өөрчлөлт (улбар шараас ногоон) ба бүтээгдэхүүн', en: 'Colour change (orange to green) and the product' },
    controlled: { mn: 'Ижил реагент ба нөхцөл', en: 'Same reagent and conditions' },
    limitation: {
      mn: 'Гуравдугаар спирт энэ нөхцөлд исэлддэггүй; туршилт нь төрлийг ерөнхийд нь ялгана.',
      en: 'Tertiary alcohols do not oxidise under these conditions; the test separates types only in general terms.'
    },
    keyPoints: [
      { mn: 'Нэгдүгээр спирт → альдегид → карбоксилын хүчил.', en: 'Primary alcohol → aldehyde → carboxylic acid.' },
      { mn: 'Хоёрдугаар спирт → кетон.', en: 'Secondary alcohol → ketone.' },
      { mn: 'Гуравдугаар спирт исэлддэггүй.', en: 'Tertiary alcohols are not oxidised.' }
    ],
    glossary: [
      { term: { mn: 'Нэгдүгээр спирт', en: 'Primary alcohol' }, def: { mn: '–OH бүлэг нь нүүрстөрөгчийн гинжний үзүүрийн C-д байгаа спирт.', en: 'An alcohol with the –OH group on a carbon at the end of the chain.' } },
      { term: { mn: 'Исэлдэлт', en: 'Oxidation' }, def: { mn: 'Электрон алдах; спиртийн хувьд устөрөгч алдах.', en: 'Loss of electrons; for an alcohol, loss of hydrogen.' } },
      { term: { mn: 'Гидратжуулалт', en: 'Hydration' }, def: { mn: 'Усыг давхар холбоонд нэмэх урвал.', en: 'Adding water across a double bond.' } }
    ],
    structured: {
      prompt: { mn: 'Пропан-1-ол исэлдэхэд пропанойн хүчил, пропан-2-ол исэлдэхэд пропанон өгдөгийг тайлбарла.', en: 'Explain why propan-1-ol gives propanoic acid on oxidation, while propan-2-ol gives propanone.' },
      marks: [
        { mn: 'Нэгдүгээр спирт: –OH үзүүрийн C-д, альдегид → хүчил (1)', en: 'Primary alcohol: –OH on the end carbon; aldehyde → acid (1)' },
        { mn: 'Хоёрдугаар спирт: –OH дунд C-д, кетон өгнө (1)', en: 'Secondary alcohol: –OH on a middle carbon; gives a ketone (1)' },
        { mn: 'Кетон цаашид исэлдэхгүй (1)', en: 'A ketone cannot be oxidised further under these conditions (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Спиртийн функциональ бүлэг аль нь вэ?', en: 'What is the functional group in alcohols?' },
        options: [{ mn: '–OH', en: '–OH' }, { mn: '–COOH', en: '–COOH' }, { mn: 'C=O', en: 'C=O' }, { mn: '–NH₂', en: '–NH₂' }],
        answer: 0,
        explanation: { mn: 'Спиртэд –OH бүлэг байна.', en: 'Alcohols contain the –OH group.' }
      },
      {
        level: 'hard',
        prompt: { mn: '2-метилпропан-2-олын бүтцийг зур, исэлдэх эсэхийг хэл.', en: 'Draw the structure of 2-methylpropan-2-ol and state whether it can be oxidised.' },
        model: { mn: '(CH₃)₃C–OH; гуравдугаар спирт, энэ нөхцөлд исэлдэхгүй', en: '(CH₃)₃C–OH; a tertiary alcohol, not oxidised under these conditions' },
        explanation: { mn: 'OH-тай C-д өөр гурван нүүрстөрөгч холбогдсон.', en: 'The carbon with the –OH is bonded to three other carbon atoms.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Хүчиллэгжсэн калийн дихроматын өнгө улбар шараас ногоон болох шалтгаан?', en: 'Acidified potassium dichromate changes colour from orange to green when:' },
        options: [{ mn: 'Спирт исэлдэнэ', en: 'An alcohol is oxidised' }, { mn: 'Алкен нэмэгдэнэ', en: 'An alkene is added' }, { mn: 'Алкан шатна', en: 'An alkane burns' }, { mn: 'Эфир үүснэ', en: 'An ester forms' }],
        answer: 0,
        explanation: { mn: 'Cr(VI) → Cr(III) бууралт; спирт исэлдэнэ.', en: 'Cr(VI) is reduced to Cr(III) while the alcohol is oxidised.' }
      },
      {
        question: { mn: 'Хоёрдугаар спиртийг исэлдүүлэхэд үүсэх бүтээгдэхүүн?', en: 'The product of oxidising a secondary alcohol is:' },
        options: [{ mn: 'Альдегид', en: 'An aldehyde' }, { mn: 'Кетон', en: 'A ketone' }, { mn: 'Карбоксилын хүчил', en: 'A carboxylic acid' }, { mn: 'Эфир', en: 'An ester' }],
        answer: 1,
        explanation: { mn: 'Хоёрдугаар спирт → кетон.', en: 'A secondary alcohol gives a ketone.' }
      },
      {
        question: { mn: 'Этанолыг аж үйлдвэрт ямар аргаар үйлдвэрлэх вэ?', en: 'Ethanol is made industrially by:' },
        options: [{ mn: 'Этенийг гидратжуулах', en: 'Hydration of ethene' }, { mn: 'Этил этаноатыг гидролиз', en: 'Hydrolysis of ethyl ethanoate' }, { mn: 'Алканыг крекинг', en: 'Cracking of alkanes' }, { mn: 'Полимержилт', en: 'Polymerisation' }],
        answer: 0,
        explanation: { mn: 'Этен + ус → этанол (катализатортойгоор).', en: 'Ethene + water → ethanol (with a catalyst).' }
      }
    ]
  },
  'al-ch-17': {
    question: { mn: 'Альдегид ба кетон туршилтаараа яаж ялгаатай вэ?', en: 'How do aldehydes and ketones differ in their tests?' },
    independent: { mn: 'Карбонилын нэгдэл (альдегид эсвэл кетон)', en: 'Carbonyl compound (aldehyde or ketone)' },
    dependent: { mn: 'Толлены урвал (мөнгөн толь) ба 2,4-DNPH', en: 'Tollens’ reagent (silver mirror) and 2,4-DNPH' },
    controlled: { mn: 'Ижил реагент ба нөхцөл', en: 'Same reagents and conditions' },
    limitation: {
      mn: 'Туршилтууд чанарын үр дүн өгнө; яг бүтцийг батлахгүй.',
      en: 'The tests give qualitative results; they do not confirm the exact structure.'
    },
    keyPoints: [
      { mn: 'C=O бүлэг альдегид ба кетонд байна.', en: 'Aldehydes and ketones both contain the C=O group.' },
      { mn: 'Альдегид Толлены урвалд мөнгөн толь үүсгэнэ; кетон үүсгэхгүй.', en: 'An aldehyde gives a silver mirror with Tollens’ reagent; a ketone does not.' },
      { mn: 'Альдегид, кетон хоёулаа 2,4-DNPH-тай улбар шар утуурмаг өгнө.', en: 'Both give an orange precipitate with 2,4-DNPH.' }
    ],
    glossary: [
      { term: { mn: 'Карбонилын бүлэг', en: 'Carbonyl group' }, def: { mn: 'C=O бүлэг.', en: 'The C=O group.' } },
      { term: { mn: 'Альдегид', en: 'Aldehyde' }, def: { mn: 'C=O нь гинжний үзүүрт, устөрөгчтэй байрласан нэгдэл.', en: 'A compound with a C=O group at the end of the chain, bonded to hydrogen.' } },
      { term: { mn: 'Кетон', en: 'Ketone' }, def: { mn: 'C=O нь гинжний дунд нүүрстөрөгчтэй байрласан нэгдэл.', en: 'A compound with a C=O group between two carbon atoms.' } }
    ],
    structured: {
      prompt: { mn: 'Пропанал ба пропанон хоёрыг ялгах туршилтыг үр дүнгийн хамт тайлбарла.', en: 'A student has propanal and propanone. Describe a test to tell them apart, with the results.' },
      marks: [
        { mn: 'Толлены урвалын уусмалтай халаана (1)', en: 'Warm with Tollens’ reagent (1)' },
        { mn: 'Пропанал: мөнгөн толь үүснэ (1)', en: 'Propanal: a silver mirror forms (1)' },
        { mn: 'Пропанон: өөрчлөлт үгүй, мөнгөн толь үүсэхгүй (1)', en: 'Propanone: no change, no silver mirror (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Альдегид ба кетонд байдаг бүлэг аль нь вэ?', en: 'Which group is present in aldehydes and ketones?' },
        options: [{ mn: 'C=O', en: 'C=O' }, { mn: 'C=C', en: 'C=C' }, { mn: '–OH', en: '–OH' }, { mn: '–COOH', en: '–COOH' }],
        answer: 0,
        explanation: { mn: 'Карбонилын бүлэг, C=O.', en: 'The carbonyl group, C=O.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Пропанон NaBH₄-тэй бууралтад орвол ямар бүтээгдэхүүн үүсэх вэ?', en: 'What product forms when propanone is reduced by NaBH₄?' },
        model: { mn: 'Пропанон + 2[H] → пропан-2-ол', en: 'Propanone + 2[H] → propan-2-ol' },
        explanation: { mn: 'Кетоны бууралт нь хоёрдугаар спирт өгнө.', en: 'Reducing a ketone gives a secondary alcohol.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Альдегидтай мөнгөн толь өгдөг реагент аль нь вэ?', en: 'Which reagent gives a silver mirror with an aldehyde?' },
        options: [{ mn: 'Толлены урвалын реагент', en: 'Tollens’ reagent' }, { mn: '2,4-DNPH', en: '2,4-DNPH' }, { mn: 'Бромын ус', en: 'Bromine water' }, { mn: 'Цэнэг', en: 'Water' }],
        answer: 0,
        explanation: { mn: 'Толлены урвал альдегидийг исэлдүүлж мөнгө тунадгажуулна.', en: 'Tollens’ reagent oxidises the aldehyde and silver is deposited.' }
      },
      {
        question: { mn: 'Аль нэгдэл 2,4-DNPH-тай улбар шар утуурмаг өгөх вэ?', en: 'Which compound gives an orange precipitate with 2,4-DNPH?' },
        options: [{ mn: 'Пропанал', en: 'Propanal' }, { mn: 'Этанол', en: 'Ethanol' }, { mn: 'Этен', en: 'Ethene' }, { mn: 'Метан', en: 'Methane' }],
        answer: 0,
        explanation: { mn: 'Пропанал бол карбонилын нэгдэл.', en: 'Propanal is a carbonyl compound.' }
      },
      {
        question: { mn: 'Кетоныг бууруулахад ямар нэгдэл үүсэх вэ?', en: 'Reducing a ketone gives:' },
        options: [{ mn: 'Хоёрдугаар спирт', en: 'A secondary alcohol' }, { mn: 'Нэгдүгээр спирт', en: 'A primary alcohol' }, { mn: 'Хүчил', en: 'An acid' }, { mn: 'Эфир', en: 'An ester' }],
        answer: 0,
        explanation: { mn: 'Кетон → хоёрдугаар спирт.', en: 'Ketone → secondary alcohol.' }
      }
    ]
  },
  'al-ch-18': {
    question: { mn: 'Эфир яаж үүсэх вэ, ямар нөхцөлд?', en: 'How does an ester form, and under what conditions?' },
    independent: { mn: 'Эстерификацид оролцох спирт (этанол, пропанол)', en: 'Alcohol used in the esterification (ethanol, propanol)' },
    dependent: { mn: 'Үүсэх эфирийн төрөл ба үнэр', en: 'Type and smell of the ester formed' },
    controlled: { mn: 'Ижил хүчил, концентрацитай H₂SO₄ катализатор, халаалт', en: 'Same acid, concentrated H₂SO₄ catalyst, and heating' },
    limitation: {
      mn: 'Гарц буцаах урвалын улмаас ихэвчлэн 100%-иас бага; үнэрийн туршилтыг лабораторид ашигладаггүй.',
      en: 'The yield is reversible and usually below 100%; the smell test is not used in the laboratory.'
    },
    keyPoints: [
      { mn: 'Карбоксилын хүчил + спирт ⇌ эфир + ус (хүчлийн катализатортойгоор).', en: 'Carboxylic acid + alcohol ⇌ ester + water (with an acid catalyst).' },
      { mn: 'Карбоксилын хүчил сул хүчил; бүрэн ионжихгүй.', en: 'Carboxylic acids are weak acids; they do not fully ionise.' },
      { mn: 'Эфир нь ихэвчлэн үнэртэй; жимсний үнэр.', en: 'Esters are often fragrant, with fruity smells.' }
    ],
    glossary: [
      { term: { mn: 'Эстерификаци', en: 'Esterification' }, def: { mn: 'Карбоксилын хүчил ба спиртийг эфир болгох урвал.', en: 'The reaction of a carboxylic acid with an alcohol to form an ester.' } },
      { term: { mn: 'Карбоксилын хүчил', en: 'Carboxylic acid' }, def: { mn: '–COOH бүлэгтэй нэгдэл.', en: 'A compound containing the –COOH group.' } },
      { term: { mn: 'Эфир', en: 'Ester' }, def: { mn: '–COO– бүлэгтэй нэгдэл.', en: 'A compound containing the –COO– group.' } }
    ],
    structured: {
      prompt: { mn: 'Этил этаноатыг лабораторид хэрхэн бэлтгэх вэ, нөхцөлийн хамт тайлбарла.', en: 'Describe how ethyl ethanoate is made in the laboratory, with the conditions.' },
      marks: [
        { mn: 'Этанойн хүчил ба этанолыг халаана (1)', en: 'Heat ethanoic acid and ethanol (1)' },
        { mn: 'Төвлөрсөн хүхрийн хүчлийн катализатортой (1)', en: 'With concentrated sulfuric acid as catalyst (1)' },
        { mn: 'Буцаах урвал тул гарц 100%-иас бага (1)', en: 'The reaction is reversible, so the yield is below 100% (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Карбоксилын хүчлийн функциональ бүлэг аль нь вэ?', en: 'Which functional group is in carboxylic acids?' },
        options: [{ mn: '–COOH', en: '–COOH' }, { mn: '–OH', en: '–OH' }, { mn: 'C=O', en: 'C=O' }, { mn: '–NH₂', en: '–NH₂' }],
        answer: 0,
        explanation: { mn: 'Карбоксилын хүчилд –COOH бүлэг байна.', en: 'Carboxylic acids contain the –COOH group.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Метанойн хүчил, пропан-1-олын эстерификацийн урвалын тэгшитгэлийг бич.', en: 'Write the equation for the esterification of methanoic acid with propan-1-ol.' },
        model: { mn: 'HCOOH + CH₃CH₂CH₂OH ⇌ HCOOCH₂CH₂CH₃ + H₂O', en: 'HCOOH + CH₃CH₂CH₂OH ⇌ HCOOCH₂CH₂CH₃ + H₂O' },
        explanation: { mn: 'Хүчлийн –OH ба спиртийн H-г алдаж ус үүснэ.', en: 'The –OH of the acid and the H of the alcohol combine to give water.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Этанойн хүчил ба этанол урвалд орвол юу үүсэх вэ?', en: 'Ethanoic acid and ethanol give:' },
        options: [{ mn: 'Этил этаноат', en: 'Ethyl ethanoate' }, { mn: 'Этаналь', en: 'Ethanal' }, { mn: 'Этен', en: 'Ethene' }, { mn: 'Натрийн этаноат', en: 'Sodium ethanoate' }],
        answer: 0,
        explanation: { mn: 'Эстерификаци: хүчил + спирт → эфир + ус.', en: 'Esterification: acid + alcohol → ester + water.' }
      },
      {
        question: { mn: 'Карбоксилын хүчил ямар хүчил вэ?', en: 'Carboxylic acids are:' },
        options: [{ mn: 'Хүчтэй хүчил', en: 'Strong acids' }, { mn: 'Сул хүчил', en: 'Weak acids' }, { mn: 'Суурь', en: 'Bases' }, { mn: 'Саармаг', en: 'Neutral' }],
        answer: 1,
        explanation: { mn: 'Карбоксилын хүчил бүрэн ионжихгүй, сул хүчил.', en: 'Carboxylic acids do not fully ionise, so they are weak acids.' }
      },
      {
        question: { mn: 'Эстерификацид ямар катализатор хэрэглэх вэ?', en: 'The catalyst used in esterification is:' },
        options: [{ mn: 'Төвлөрсөн хүхрийн хүчил', en: 'Concentrated sulfuric acid' }, { mn: 'Натрийн гидроксид', en: 'Sodium hydroxide' }, { mn: 'Ус', en: 'Water' }, { mn: 'Никель', en: 'Nickel' }],
        answer: 0,
        explanation: { mn: 'Төвлөрсөн хүхрийн хүчил катализатор болно.', en: 'Concentrated sulfuric acid acts as the catalyst.' }
      }
    ]
  }
};
