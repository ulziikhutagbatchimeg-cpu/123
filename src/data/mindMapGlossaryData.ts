export interface MindMapGlossaryItem {
  id: string;
  chapterNumber: number;
  chapterTitleEn: string;
  chapterTitleMn: string;
  termEn: string;
  termMn: string;
  category: string;
  color: string;
  definitionEn: string;
  definitionMn: string;
  formula?: string;
  examTipEn?: string;
  examTipMn?: string;
  suggestedConnections?: string[];
}

export const CHAPTER_INFO = [
  { number: 1, titleEn: 'States of Matter & Particles', titleMn: '1. Бодисын төлөв ба бөөмийн онол', color: 'emerald' },
  { number: 2, titleEn: 'Atoms, Bonding & Structure', titleMn: '2. Атом, химийн холбоо ба бүтэц', color: 'indigo' },
  { number: 3, titleEn: 'Stoichiometry & The Mole', titleMn: '3. Стехиометр ба молийн тооцоо', color: 'amber' },
  { number: 4, titleEn: 'Electrochemistry & Electrolysis', titleMn: '4. Цахилгаан хими ба электролиз', color: 'teal' },
  { number: 5, titleEn: 'Chemical Energetics', titleMn: '5. Химийн энергетик (Энтальпи)', color: 'orange' },
  { number: 6, titleEn: 'Chemical Reactions & Rates', titleMn: '6. Урвалын хурд ба тэнцвэр', color: 'blue' },
  { number: 7, titleEn: 'Acids, Bases & Salts', titleMn: '7. Хүчил, суурь ба давс', color: 'rose' },
  { number: 8, titleEn: 'The Periodic Table', titleMn: '8. Үелэх систем ба зүй тогтол', color: 'violet' },
  { number: 9, titleEn: 'Metals & Reactivity', titleMn: '9. Металл ба урвалын идэвх', color: 'cyan' },
  { number: 10, titleEn: 'Chemistry of the Environment', titleMn: '10. Байгаль орчны хими', color: 'emerald' },
  { number: 11, titleEn: 'Organic Chemistry', titleMn: '11. Органик хими', color: 'purple' },
  { number: 12, titleEn: 'Experimental & Qualitative Analysis', titleMn: '12. Туршилтын арга зүй (Paper 6)', color: 'pink' }
];

export const MIND_MAP_GLOSSARY: MindMapGlossaryItem[] = [
  // --- CHAPTER 1: STATES OF MATTER ---
  {
    id: 'glo-ch1-kinetic',
    chapterNumber: 1,
    chapterTitleEn: 'States of Matter',
    chapterTitleMn: 'Бодисын төлөв',
    termEn: 'Kinetic Particle Theory',
    termMn: 'Бөөмийн кинетик онол',
    category: 'Matter',
    color: 'emerald',
    definitionEn: 'Model stating that all matter is composed of tiny moving particles possessing kinetic energy.',
    definitionMn: 'Бүх бодис кинетик энергитэй тасралтгүй хөдөлдөг бөөмсөөс тогтоно гэсэн загвар.',
    examTipEn: 'State how particle arrangement and movement change with temperature.',
    examTipMn: 'Температур өсөхөд бөөмсийн хөдөлгөөн хэрхэн өөрчлөгддөгийг дурдана.',
    suggestedConnections: ['glo-ch1-diffusion', 'glo-ch1-sublimation']
  },
  {
    id: 'glo-ch1-diffusion',
    chapterNumber: 1,
    chapterTitleEn: 'States of Matter',
    chapterTitleMn: 'Бодисын төлөв',
    termEn: 'Diffusion',
    termMn: 'Диффуз',
    category: 'Matter',
    color: 'emerald',
    definitionEn: 'Net movement of particles from high to low concentration down a concentration gradient due to random motion.',
    definitionMn: 'Бөөмсийн эмх замбараагүй хөдөлгөөнөөр өндөр концентрацитай хэсгээс бага концентрацитай хэсэг рүү шилжих үзэгдэл.',
    formula: 'Rate ∝ 1 / √Mr',
    examTipEn: 'Lighter gas (lower Mr) diffuses faster than heavier gas (e.g. NH₃ vs HCl).',
    examTipMn: 'Молекул масс (Mr) багатай хий илүү хурдан диффузлэнэ (жишээ нь NH₃ нь HCl-ээс хурдан).',
    suggestedConnections: ['glo-ch1-kinetic', 'glo-ch3-molar-mass']
  },
  {
    id: 'glo-ch1-sublimation',
    chapterNumber: 1,
    chapterTitleEn: 'States of Matter',
    chapterTitleMn: 'Бодисын төлөв',
    termEn: 'Sublimation',
    termMn: 'Сублимац (Хуурай ууршилт)',
    category: 'Matter',
    color: 'emerald',
    definitionEn: 'Phase transition directly from solid to gas without entering the liquid state.',
    definitionMn: 'Шингэн төлөвийг алгасан хатуу төлөвөөс шууд хийн төлөвт шилжих үзэгдэл.',
    formula: 'CO₂(s) → CO₂(g), I₂(s) → I₂(g)',
    examTipEn: 'Standard Cambridge examples: dry ice (solid CO₂) and iodine crystals.',
    examTipMn: 'Кэмбрижийн сонгодог жишээ: хуурай мөс (хатуу CO₂) болон иодын талст.',
    suggestedConnections: ['glo-ch1-kinetic', 'glo-ch1-heating-curve']
  },
  {
    id: 'glo-ch1-heating-curve',
    chapterNumber: 1,
    chapterTitleEn: 'States of Matter',
    chapterTitleMn: 'Бодисын төлөв',
    termEn: 'Heating Curve Plateau',
    termMn: 'Халаалтын муруйн плато',
    category: 'Matter',
    color: 'emerald',
    definitionEn: 'Horizontal plateau during melting/boiling where supplied energy breaks intermolecular forces without temperature increase.',
    definitionMn: 'Хайлах/буцлах үед өгсөн дулаан нь бөөмс хоорондын хүчийг таслахад зарцуулагдаж температур тогтмол хадгалагдах хэсэг.',
    examTipEn: 'Plateau temperature = exact melting point or boiling point of pure substance.',
    examTipMn: 'Хэвтээ шугамын температур нь цэвэр бодисын яг хайлах эсвэл буцлах цэг юм.',
    suggestedConnections: ['glo-ch1-kinetic']
  },

  // --- CHAPTER 2: ATOMS & BONDING ---
  {
    id: 'glo-ch2-ionic-lattice',
    chapterNumber: 2,
    chapterTitleEn: 'Atoms & Bonding',
    chapterTitleMn: 'Атом ба холбоо',
    termEn: 'Giant Ionic Lattice',
    termMn: 'Аварга ионы оронт тор',
    category: 'Bonding',
    color: 'indigo',
    definitionEn: 'A regular 3D array of alternating positive and negative ions held together by strong electrostatic attractions.',
    definitionMn: 'Эсрэг цэнэгтэй катион ба анионууд цахилгаан таталцлын хүчээр бат бөх холбогдсон 3 хэмжээст тогтмол оронт бүтэц.',
    formula: 'NaCl, MgO',
    examTipEn: 'High melting point; conducts electricity ONLY when molten or aqueous because ions become mobile.',
    examTipMn: 'Хайлах цэг өндөр; зөвхөн хайлмал ба уусмал төлөвтөө ионууд чөлөөтэй хөдөлдөг тул цахилгаан дамжуулна.',
    suggestedConnections: ['glo-ch4-electrolyte', 'glo-ch4-cathode']
  },
  {
    id: 'glo-ch2-covalent-simple',
    chapterNumber: 2,
    chapterTitleEn: 'Atoms & Bonding',
    chapterTitleMn: 'Атом ба холбоо',
    termEn: 'Simple Molecular Covalent',
    termMn: 'Энгийн молекулт ковалент бүтэц',
    category: 'Bonding',
    color: 'indigo',
    definitionEn: 'Molecules held internally by strong covalent bonds, but between molecules exist only weak intermolecular forces.',
    definitionMn: 'Молекул дотроо бат бөх ковалент холбоотой, харин молекул хоорондоо сул таталцлын хүчээр холбогдсон бүтэц.',
    formula: 'H₂O, CH₄, CO₂',
    examTipEn: 'Low melting/boiling points because only weak intermolecular forces are overcome, NOT the covalent bonds.',
    examTipMn: 'Хайлах/буцлах цэг бага, учир нь зөвхөн молекул хоорондын сул хүч тасардаг, ковалент холбоо тасрахгүй.',
    suggestedConnections: ['glo-ch1-diffusion']
  },
  {
    id: 'glo-ch2-giant-covalent',
    chapterNumber: 2,
    chapterTitleEn: 'Atoms & Bonding',
    chapterTitleMn: 'Атом ба холбоо',
    termEn: 'Giant Covalent Structure (Macromolecule)',
    termMn: 'Аварга ковалент бүтэц',
    category: 'Bonding',
    color: 'indigo',
    definitionEn: 'Lattice of countless non-metal atoms linked by strong covalent bonds throughout the entire 3D structure.',
    definitionMn: 'Бүх бүтэц даяараа бат бөх ковалент холбоогоор холбогдсон асар олон металл биш атомуудын тор.',
    formula: 'Diamond, Graphite, SiO₂',
    examTipEn: 'Diamond: 4 bonds per C (hard insulator). Graphite: 3 bonds per C (hexagonal layers, delocalised electrons conduct).',
    examTipMn: 'Алмааз: нүүрстөрөгч бүр 4 холбоотой (хатуу, тусгаарлагч). Бал чулуу: 3 холбоотой, чөлөөт электрон цахилгаан дамжуулна.',
    suggestedConnections: ['glo-ch2-ionic-lattice']
  },
  {
    id: 'glo-ch2-delocalised',
    chapterNumber: 2,
    chapterTitleEn: 'Atoms & Bonding',
    chapterTitleMn: 'Атом ба холбоо',
    termEn: 'Delocalised Electrons',
    termMn: 'Делокалчлагдсан (чөлөөт) электронууд',
    category: 'Bonding',
    color: 'indigo',
    definitionEn: 'Valence electrons free to move throughout the metallic lattice or between graphite layers, carrying charge.',
    definitionMn: 'Металлын оронт тор эсвэл бал чулууны үеүүдийн дундуур чөлөөтэй хөдөлж цахилгаан цэнэг зөөдөг электронууд.',
    examTipEn: 'Reason why metals and graphite conduct electricity; ionic compounds DO NOT have delocalised electrons.',
    examTipMn: 'Металл ба бал чулуу цахилгаан дамжуулдгийн шалтгаан; ионы нэгдэлд делокалчлагдсан электрон байхгүй.',
    suggestedConnections: ['glo-ch9-metallic']
  },

  // --- CHAPTER 3: STOICHIOMETRY ---
  {
    id: 'glo-ch3-mole',
    chapterNumber: 3,
    chapterTitleEn: 'Stoichiometry & Mole',
    chapterTitleMn: 'Стехиометр ба моль',
    termEn: 'The Mole Concept',
    termMn: 'Молийн тухай ойлголт',
    category: 'Stoichiometry',
    color: 'amber',
    definitionEn: 'SI unit for amount of substance; one mole contains 6.02 × 10²³ particles (Avogadro constant).',
    definitionMn: 'Бодисын тоо хэмжээг илэрхийлэх нэгж; 1 моль нь 6.02 × 10²³ ширхэг эгэл бөөмийг агуулна.',
    formula: 'n = m / Mr',
    examTipEn: 'Always convert mass in grams to moles first before applying balanced equation ratios.',
    examTipMn: 'Тэгшитгэлийн харьцааг ашиглахын өмнө массыг (грамм) заавал эхлээд моль болгож хувиргана.',
    suggestedConnections: ['glo-ch3-molar-volume', 'glo-ch3-concentration']
  },
  {
    id: 'glo-ch3-molar-mass',
    chapterNumber: 3,
    chapterTitleEn: 'Stoichiometry & Mole',
    chapterTitleMn: 'Стехиометр ба моль',
    termEn: 'Relative Formula Mass (Mr)',
    termMn: 'Харьцангуй молекул / томьёоны масс (Mr)',
    category: 'Stoichiometry',
    color: 'amber',
    definitionEn: 'The sum of the relative atomic masses (Ar) of all atoms shown in the chemical formula.',
    definitionMn: 'Химийн томьёонд орсон бүх атомуудын харьцангуй атомын массын (Ar) нийлбэр.',
    formula: 'Mr(CaCO₃) = 40 + 12 + (3×16) = 100',
    examTipEn: 'Quote exact Ar from the Cambridge Periodic Table (e.g. Cl = 35.5, Cu = 64).',
    examTipMn: 'Кэмбрижийн үелэх систем дэх Ar утгыг нарийн авч хэрэглэнэ (жишээ нь Cl = 35.5, Cu = 64).',
    suggestedConnections: ['glo-ch3-mole', 'glo-ch1-diffusion']
  },
  {
    id: 'glo-ch3-molar-volume',
    chapterNumber: 3,
    chapterTitleEn: 'Stoichiometry & Mole',
    chapterTitleMn: 'Стехиометр ба моль',
    termEn: 'Molar Gas Volume (24 dm³)',
    termMn: 'Хийн молийн эзлэхүүн (24 дм³)',
    category: 'Stoichiometry',
    color: 'amber',
    definitionEn: 'The volume occupied by one mole of any gas at room temperature and pressure (r.t.p.), equal to 24 dm³ (24,000 cm³).',
    definitionMn: 'Өрөөний температур ба даралтад (r.t.p.) дурын хийн 1 молийн эзлэх эзлэхүүн бөгөөд 24 дм³-тэй тэнцүү.',
    formula: 'V = n × 24 dm³',
    examTipEn: 'Applies to ANY gas (H₂, O₂, CO₂, Cl₂) regardless of its molecular weight.',
    examTipMn: 'Хийн молекул жингээс үл хамааран дурын хийд (H₂, O₂, CO₂ г.м.) ижил үйлчилнэ.',
    suggestedConnections: ['glo-ch3-mole']
  },
  {
    id: 'glo-ch3-concentration',
    chapterNumber: 3,
    chapterTitleEn: 'Stoichiometry & Mole',
    chapterTitleMn: 'Стехиометр ба моль',
    termEn: 'Solution Concentration (c = n / V)',
    termMn: 'Уусмалын концентраци (c = n / V)',
    category: 'Stoichiometry',
    color: 'amber',
    definitionEn: 'Amount of solute (moles or grams) dissolved per cubic decimetre (dm³) of solution.',
    definitionMn: 'Уусмалын 1 дм³ эзлэхүүнд ууссан бодисын тоо хэмжээ (моль эсвэл грамм).',
    formula: 'c (mol/dm³) = n / V(dm³)',
    examTipEn: 'Remember: 1 dm³ = 1000 cm³. Always divide cm³ by 1000 before multiplying by molarity.',
    examTipMn: '1 дм³ = 1000 см³. см³-ийг 1000-д хувааж дм³ болгосны дараа моляр концентрацитай үржүүлнэ.',
    suggestedConnections: ['glo-ch7-titration', 'glo-ch3-mole']
  },

  // --- CHAPTER 4: ELECTROCHEMISTRY ---
  {
    id: 'glo-ch4-electrolyte',
    chapterNumber: 4,
    chapterTitleEn: 'Electrochemistry',
    chapterTitleMn: 'Цахилгаан хими',
    termEn: 'Electrolyte',
    termMn: 'Электролит',
    category: 'Electrochem',
    color: 'teal',
    definitionEn: 'A molten ionic compound or aqueous solution containing mobile ions that conducts electricity and decomposes in the process.',
    definitionMn: 'Хөдөлгөөнт ионуудыг агуулж, цахилгаан дамжуулдаг ба үйл явцын явцад задардаг хайлмал эсвэл уусмал.',
    formula: 'CuSO₄(aq), PbBr₂(l)',
    examTipEn: 'Pure water and covalent compounds are non-electrolytes because they lack ions.',
    examTipMn: 'Цэвэр ус болон ковалент нэгдлүүд нь ионгүй тул электролит биш юм.',
    suggestedConnections: ['glo-ch2-ionic-lattice', 'glo-ch4-cathode', 'glo-ch4-anode']
  },
  {
    id: 'glo-ch4-cathode',
    chapterNumber: 4,
    chapterTitleEn: 'Electrochemistry',
    chapterTitleMn: 'Цахилгаан хими',
    termEn: 'Cathode (Negative Electrode)',
    termMn: 'Катод (Сөрөг электрод)',
    category: 'Electrochem',
    color: 'teal',
    definitionEn: 'Negative electrode where positively charged cations migrate and gain electrons (reduction).',
    definitionMn: 'Эерэг цэнэгтэй катионууд очиж электрон авч ангижирдаг сөрөг электрод.',
    formula: '2H⁺ + 2e⁻ → H₂, Cu²⁺ + 2e⁻ → Cu',
    examTipEn: 'Remember PANIC: Positive Anode, Negative Is Cathode. OIL RIG: Reduction Is Gain of electrons.',
    examTipMn: 'Катод = Сөрөг (-), энд ангижралт (электрон авах) явагдана.',
    suggestedConnections: ['glo-ch4-anode', 'glo-ch4-electrolyte']
  },
  {
    id: 'glo-ch4-anode',
    chapterNumber: 4,
    chapterTitleEn: 'Electrochemistry',
    chapterTitleMn: 'Цахилгаан хими',
    termEn: 'Anode (Positive Electrode)',
    termMn: 'Анод (Эерэг электрод)',
    category: 'Electrochem',
    color: 'teal',
    definitionEn: 'Positive electrode where negatively charged anions migrate and lose electrons (oxidation).',
    definitionMn: 'Сөрөг цэнэгтэй анионууд очиж электрон алдаж исэлддэг эерэг электрод.',
    formula: '2Cl⁻ → Cl₂ + 2e⁻, 4OH⁻ → O₂ + 2H2O + 4e⁻',
    examTipEn: 'Halide ions (Cl⁻, Br⁻, I⁻) discharge before OH⁻ in concentrated aqueous solution.',
    examTipMn: 'Өтгөрүүлсэн уусмалд галид ион (Cl⁻, Br⁻, I⁻) нь OH⁻-аас түрүүлж исэлдэж галоген үүсгэнэ.',
    suggestedConnections: ['glo-ch4-cathode', 'glo-ch4-electrolyte']
  },

  // --- CHAPTER 5: CHEMICAL ENERGETICS ---
  {
    id: 'glo-ch5-exothermic',
    chapterNumber: 5,
    chapterTitleEn: 'Chemical Energetics',
    chapterTitleMn: 'Химийн энергетик',
    termEn: 'Exothermic Reaction (ΔH < 0)',
    termMn: 'Экзотерм урвал (ΔH < 0)',
    category: 'Energetics',
    color: 'orange',
    definitionEn: 'A chemical reaction that releases thermal energy to the surroundings, causing temperature to rise.',
    definitionMn: 'Орчиндоо дулааны энерги ялгаруулж, орчны температурыг өсгөдөг химийн урвал.',
    formula: 'ΔH = -ve (e.g. Combustion, Neutralisation)',
    examTipEn: 'Energy released forming new bonds > energy absorbed breaking old bonds.',
    examTipMn: 'Шинэ холбоо үүсэхэд ялгарсан энерги > хуучин холбоо тасрахад шингээгдсэн энерги.',
    suggestedConnections: ['glo-ch5-endothermic', 'glo-ch5-activation-energy']
  },
  {
    id: 'glo-ch5-endothermic',
    chapterNumber: 5,
    chapterTitleEn: 'Chemical Energetics',
    chapterTitleMn: 'Химийн энергетик',
    termEn: 'Endothermic Reaction (ΔH > 0)',
    termMn: 'Эндотерм урвал (ΔH > 0)',
    category: 'Energetics',
    color: 'orange',
    definitionEn: 'A chemical reaction that absorbs thermal energy from the surroundings, causing temperature to decrease.',
    definitionMn: 'Орчноосоо дулааны энерги шингээж, орчны температурыг бууруулдаг химийн урвал.',
    formula: 'ΔH = +ve (e.g. Thermal Decomposition, Photosynthesis)',
    examTipEn: 'Energy absorbed breaking bonds > energy released forming bonds.',
    examTipMn: 'Холбоо тасрахад шингээгдсэн энерги > холбоо үүсэхэд ялгарсан энерги.',
    suggestedConnections: ['glo-ch5-exothermic', 'glo-ch5-activation-energy']
  },
  {
    id: 'glo-ch5-activation-energy',
    chapterNumber: 5,
    chapterTitleEn: 'Chemical Energetics',
    chapterTitleMn: 'Химийн энергетик',
    termEn: 'Activation Energy (Ea)',
    termMn: 'Идэвхжлийн энерги (Ea)',
    category: 'Energetics',
    color: 'orange',
    definitionEn: 'The minimum amount of energy colliding particles must possess to react successfully upon impact.',
    definitionMn: 'Мөргөлдөж буй бөөмс урвалд ороход шаардагдах хамгийн бага энергийн босго хэмжээ.',
    formula: 'Ea on energy profile diagrams',
    examTipEn: 'Catalysts provide an alternative reaction route with a lower activation energy (Ea).',
    examTipMn: 'Катализатор нь урвалын идэвхжлийн энергийг (Ea) бууруулж урвалыг хурдасгадаг.',
    suggestedConnections: ['glo-ch6-catalyst', 'glo-ch6-collision-theory']
  },

  // --- CHAPTER 6: CHEMICAL REACTIONS & RATES ---
  {
    id: 'glo-ch6-collision-theory',
    chapterNumber: 6,
    chapterTitleEn: 'Chemical Reactions & Rates',
    chapterTitleMn: 'Урвалын хурд',
    termEn: 'Collision Theory & Frequency',
    termMn: 'Мөргөлдөлтийн онол ба давтамж',
    category: 'Reactions',
    color: 'blue',
    definitionEn: 'For a reaction to occur, particles must collide with correct orientation and energy greater than Ea.',
    definitionMn: 'Урвал явагдахын тулд бөөмс зөв чиглэлтэй ба идэвхжлийн энергээс (Ea) давсан энергитэй мөргөлдөх ёстой.',
    examTipEn: 'Always write: "more frequent successful collisions per unit time" for mark scheme approval.',
    examTipMn: 'Шалгалтын шалгуурт заавал: "нэгж хугацаан дахь үр дүнтэй мөргөлдөлтийн давтамж нэмэгдэнэ" гэж бичнэ.',
    suggestedConnections: ['glo-ch5-activation-energy', 'glo-ch6-catalyst']
  },
  {
    id: 'glo-ch6-catalyst',
    chapterNumber: 6,
    chapterTitleEn: 'Chemical Reactions & Rates',
    chapterTitleMn: 'Урвалын хурд',
    termEn: 'Catalyst',
    termMn: 'Катализатор',
    category: 'Reactions',
    color: 'blue',
    definitionEn: 'A substance that increases reaction rate without being chemically changed or used up at the end of the reaction.',
    definitionMn: 'Өөрөө химийн хувьд өөрчлөгдөлгүй, урвалын эцэст чанар ба тоо нь хэвээр үлдэж урвалыг түргэсгэдэг бодис.',
    formula: 'MnO₂ in H₂O₂ decomposition, Fe in Haber process',
    examTipEn: 'Does NOT increase frequency of collisions; it increases the proportion of successful collisions by lowering Ea.',
    examTipMn: 'Мөргөлдөлтийн тоог нэмдэггүй, харин Ea-г бууруулснаар үр дүнтэй мөргөлдөлтийн эзлэх хувийг өсгөдөг.',
    suggestedConnections: ['glo-ch5-activation-energy', 'glo-ch6-collision-theory']
  },
  {
    id: 'glo-ch6-equilibrium',
    chapterNumber: 6,
    chapterTitleEn: 'Chemical Reactions & Rates',
    chapterTitleMn: 'Урвалын хурд',
    termEn: 'Dynamic Equilibrium (⇌)',
    termMn: 'Динамик тэнцвэр (⇌)',
    category: 'Reactions',
    color: 'blue',
    definitionEn: 'In a closed system, rate of forward reaction equals rate of reverse reaction, with concentrations remaining constant.',
    definitionMn: 'Битүү системд шулуун урвалын хурд буцах урвалын хурдтай тэнцэж, бодисуудын концентраци тогтмол хадгалагдах төлөв.',
    formula: 'N₂ + 3H2 ⇌ 2NH3',
    examTipEn: 'Reactions are still occurring actively at equal rates, not "stopped".',
    examTipMn: 'Урвал зогсоогүй, тэгш хурдаар хоёр тийш зэрэг тасралтгүй явагдаж байдаг.',
    suggestedConnections: ['glo-ch6-collision-theory']
  },

  // --- CHAPTER 7: ACIDS, BASES & SALTS ---
  {
    id: 'glo-ch7-neutralisation',
    chapterNumber: 7,
    chapterTitleEn: 'Acids, Bases & Salts',
    chapterTitleMn: 'Хүчил, суурь ба давс',
    termEn: 'Neutralisation Reaction',
    termMn: 'Саармагжих урвал',
    category: 'Acids & Salts',
    color: 'rose',
    definitionEn: 'Reaction between an acid (proton donor) and a base (proton acceptor) forming a salt and water.',
    definitionMn: 'Хүчил (протон донор) ба суурийн (протон акцептор) хооронд давс ба ус үүсгэн явагдах урвал.',
    formula: 'H⁺(aq) + OH⁻(aq) → H₂O(l)',
    examTipEn: 'Core ionic equation for all strong acid + strong alkali neutralisations.',
    examTipMn: 'Бүх хүчтэй хүчил ба шүлтийн саармагжих урвалын үндсэн ионы тэгшитгэл.',
    suggestedConnections: ['glo-ch7-titration', 'glo-ch7-salts']
  },
  {
    id: 'glo-ch7-titration',
    chapterNumber: 7,
    chapterTitleEn: 'Acids, Bases & Salts',
    chapterTitleMn: 'Хүчил, суурь ба давс',
    termEn: 'Titration & Concordancy',
    termMn: 'Титрлэлт ба зөрүүгүй титрүүд',
    category: 'Acids & Salts',
    color: 'rose',
    definitionEn: 'Volumetric technique using burette and pipette to find neutralisation point; concordant titres are within ±0.10 cm³.',
    definitionMn: 'Бюретка ба пипетка ашиглан саармагжих цэгийг олох шинжилгээний арга; зөрүүгүй заалт нь ±0.10 см³ дотор тохирно.',
    examTipEn: 'In Paper 6: Exclude rough trial, average only concordant titres to 2 decimal places.',
    examTipMn: 'Paper 6-д: Баримжаа (rough) туршилтыг хасч, зөвхөн concordant үр дүнгүүдийг дундажлана.',
    suggestedConnections: ['glo-ch3-concentration', 'glo-ch7-neutralisation']
  },
  {
    id: 'glo-ch7-salts',
    chapterNumber: 7,
    chapterTitleEn: 'Acids, Bases & Salts',
    chapterTitleMn: 'Хүчил, суурь ба давс',
    termEn: 'Salt Preparation Strategies',
    termMn: 'Давс гарган авах 3 арга',
    category: 'Acids & Salts',
    color: 'rose',
    definitionEn: '1. Excess insoluble base (soluble salt) 2. Titration (alkali + acid) 3. Precipitation (insoluble salt).',
    definitionMn: '1. Илүүдэл уусдаггүй суурийн арга 2. Титрлэлтийн арга (шүлт + хүчил) 3. Тунадасжуулах арга (уусдаггүй давс).',
    formula: 'CuO + H₂SO₄ → CuSO₄ + H₂O',
    examTipEn: 'Never evaporate to dryness; heat to crystallisation point and cool slowly.',
    examTipMn: 'Бүрэн хуурай болтол халааж болохгүй; талсжих цэг хүртэл халаагаад аажмаар хөргөнө.',
    suggestedConnections: ['glo-ch7-neutralisation', 'glo-ch12-precipitate']
  },

  // --- CHAPTER 8: THE PERIODIC TABLE ---
  {
    id: 'glo-ch8-trends',
    chapterNumber: 8,
    chapterTitleEn: 'The Periodic Table',
    chapterTitleMn: 'Үелэх систем',
    termEn: 'Periodic Trends & Groups',
    termMn: 'Үелэх системийн зүй тогтол ба бүлгүүд',
    category: 'Periodic Table',
    color: 'violet',
    definitionEn: 'Group number = number of valence electrons. Period number = number of occupied electron shells.',
    definitionMn: 'Бүлгийн дугаар = валентын электроны тоо. Үеийн дугаар = электроны давхрааны тоо.',
    examTipEn: 'Group I reactivity increases DOWN group (easier to lose electron); Group VII decreases DOWN group.',
    examTipMn: 'I бүлэгт доошлох тусам идэвх өснө (электрон амархан алдана); VII бүлэгт доошлох тусам идэвх буурна.',
    suggestedConnections: ['glo-ch2-ionic-lattice', 'glo-ch9-reactivity-series']
  },

  // --- CHAPTER 9: METALS & EXTRACTION ---
  {
    id: 'glo-ch9-reactivity-series',
    chapterNumber: 9,
    chapterTitleEn: 'Metals & Reactivity',
    chapterTitleMn: 'Металл ба урвалын идэвх',
    termEn: 'Reactivity Series & Displacement',
    termMn: 'Металлын идэвхийн эгнээ ба Халалцах урвал',
    category: 'Metals',
    color: 'cyan',
    definitionEn: 'Metals arranged by ease of losing electrons to form cations. More reactive metal displaces less reactive metal ion.',
    definitionMn: 'Электрон алдаж катион үүсгэх чадвараар эрэмбэлэгдсэн эгнээ. Илүү идэвхтэй металл бага идэвхтэй металлыг уусмалаас нь түрж ялгана.',
    formula: 'Fe + CuSO₄ → FeSO₄ + Cu',
    examTipEn: 'Metals above carbon extracted by electrolysis; metals below carbon extracted by reduction with carbon/CO.',
    examTipMn: 'Нүүрстөрөгчөөс дээш металлуудыг электролизоор; доош металлуудыг нүүрстөрөгчөөр ангижруулж гаргаж авна.',
    suggestedConnections: ['glo-ch4-cathode', 'glo-ch8-trends']
  },

  // --- CHAPTER 11: ORGANIC CHEMISTRY ---
  {
    id: 'glo-ch11-homologous',
    chapterNumber: 11,
    chapterTitleEn: 'Organic Chemistry',
    chapterTitleMn: 'Органик хими',
    termEn: 'Homologous Series',
    termMn: 'Гомологийн эгнээ',
    category: 'Organic',
    color: 'purple',
    definitionEn: 'Family of organic compounds with same functional group, general formula, similar chemical properties, and trend in physical properties.',
    definitionMn: 'Ижил функциональ бүлэгтэй, ерөнхий томьёотой, төстэй химийн шинжтэй, физик шинж нь жигд өөрчлөгддөг нэгдлүүдийн гэр бүл.',
    formula: 'Alkanes (CnH2n+2), Alkenes (CnH2n)',
    examTipEn: 'Each successive member differs by a -CH2- unit and 14 in Mr.',
    examTipMn: 'Эгнээний дараагийн гишүүн бүр өмнөхөөсөө -CH2- бүлгээр, Mr нь 14-өөр зөрдөг.',
    suggestedConnections: ['glo-ch11-alkanes-alkenes']
  },
  {
    id: 'glo-ch11-alkanes-alkenes',
    chapterNumber: 11,
    chapterTitleEn: 'Organic Chemistry',
    chapterTitleMn: 'Органик хими',
    termEn: 'Saturated vs Unsaturated (C=C test)',
    termMn: 'Ханасан ба Ханаагүй нүүрсустөрөгч',
    category: 'Organic',
    color: 'purple',
    definitionEn: 'Alkanes are saturated (single C-C bonds only). Alkenes are unsaturated with C=C double bond that decolourises aqueous bromine.',
    definitionMn: 'Алкан нь ханасан (дан C-C холбоотой). Алкен нь ханаагүй C=C давхар холбоотой бөгөөд бромын усыг өнгөгүй болгодог.',
    formula: 'C₂H₄ + Br₂ → C₂H₄Br₂ (Orange to Colourless)',
    examTipEn: 'Bromine water test: Alkenes turn bromine water from brown/orange to colourless rapidly.',
    examTipMn: 'Бромын усны сорил: Алкен нь шар-улбар өнгөтэй бромын усыг түргэн өнгөгүй болгодог.',
    suggestedConnections: ['glo-ch11-homologous']
  },

  // --- CHAPTER 12: EXPERIMENTAL ANALYSIS (PAPER 6) ---
  {
    id: 'glo-ch12-precipitate',
    chapterNumber: 12,
    chapterTitleEn: 'Experimental Analysis',
    chapterTitleMn: 'Чанарын шинжилгээ',
    termEn: 'Qualitative Precipitation Tests',
    termMn: 'Чанарын тунадасжуулах сорил',
    category: 'Analysis',
    color: 'pink',
    definitionEn: 'Diagnostic tests using NaOH and NH₃ to produce distinctive coloured hydroxide precipitates for cation identification.',
    definitionMn: 'NaOH ба NH₃ ашиглан өвөрмөц өнгийн гидроксидын тунадас үүсгэж катионыг таних сорилууд.',
    formula: 'Cu²⁺ (Blue), Fe²⁺ (Green), Fe³⁺ (Red-brown)',
    examTipEn: 'Al³⁺ and Zn²⁺ both give white ppt with NaOH; only Zn²⁺ dissolves in excess NH₃!',
    examTipMn: 'Al³⁺ ба Zn²⁺ хоёул NaOH-аар цагаан тунадас өгдөг; зөвхөн Zn²⁺ нь илүүдэл NH3-д уусдаг!',
    suggestedConnections: ['glo-ch7-salts', 'glo-ch12-flame-test']
  },
  {
    id: 'glo-ch12-flame-test',
    chapterNumber: 12,
    chapterTitleEn: 'Experimental Analysis',
    chapterTitleMn: 'Чанарын шинжилгээ',
    termEn: 'Flame Test Identification',
    termMn: 'Дөлний сорил',
    category: 'Analysis',
    color: 'pink',
    definitionEn: 'Analytical test observing characteristic flame colours: Li⁺ (red), Na⁺ (yellow), K⁺ (lilac), Ca²⁺ (orange-red), Cu²⁺ (blue-green).',
    definitionMn: 'Металлын ионуудыг өвөрмөц дөлний өнгөөр таних арга: Li⁺ (улаан), Na⁺ (шар), K⁺ (голт борын нил), Ca²⁺ (улбар-улаан), Cu²⁺ (хөх-ногоон).',
    examTipEn: 'Clean nichrome or platinum wire in concentrated HCl before each test.',
    examTipMn: 'Туршилт бүрийн өмнө нихром эсвэл цагаан алтан утсыг өтгөн HCl-д дүрэх замаар цэвэрлэнэ.',
    suggestedConnections: ['glo-ch12-precipitate']
  }
];
