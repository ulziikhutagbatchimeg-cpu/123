export interface MindMapNode {
  id: string;
  titleEn: string;
  titleMn: string;
  category: string;
  color: string;
  x: number;
  y: number;
  descriptionEn?: string;
  descriptionMn?: string;
  formula?: string;
  chapterNumber?: number;
  glossaryId?: string;
}

export interface MindMapEdge {
  id: string;
  from: string;
  to: string;
  labelEn?: string;
  labelMn?: string;
}

export interface MindMapTemplate {
  id: string;
  titleEn: string;
  titleMn: string;
  chapterNumber?: number;
  descriptionEn: string;
  descriptionMn: string;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
}

export const MIND_MAP_TEMPLATES: MindMapTemplate[] = [
  {
    id: 'tpl-overview',
    titleEn: 'Cambridge 0620 Core Pillars',
    titleMn: 'Кэмбрижийн үндсэн 6 тулгуур',
    descriptionEn: 'How foundational chemistry concepts connect across all Cambridge 0620 papers.',
    descriptionMn: 'Кэмбрижийн химийн шалгалтын 6 гол үндсэн ойлголтын харилцан уялдаа.',
    nodes: [
      {
        id: 'node-particles',
        titleEn: 'Kinetic Particle Theory',
        titleMn: 'Бөөмийн кинетик онол',
        category: 'Matter',
        color: 'emerald',
        x: 180,
        y: 120,
        descriptionEn: 'Matter is made of constantly moving particles possessing kinetic energy.',
        descriptionMn: 'Бүх бодис кинетик энергитэй тасралтгүй хөдөлдөг бөөмсөөс тогтоно.',
        chapterNumber: 1,
        glossaryId: 'glo-ch1-kinetic'
      },
      {
        id: 'node-diffusion',
        titleEn: 'Diffusion & Molecular Mass',
        titleMn: 'Диффуз ба молекул масс',
        category: 'Matter',
        color: 'emerald',
        x: 480,
        y: 100,
        formula: 'Rate ∝ 1 / √Mr',
        descriptionEn: 'Lower relative molecular mass (Mr) gases diffuse faster down concentration gradients.',
        descriptionMn: 'Харьцангуй молекул масс (Mr) багатай хий илүү хурдан диффузлэн тархдаг.',
        chapterNumber: 1,
        glossaryId: 'glo-ch1-diffusion'
      },
      {
        id: 'node-bonding',
        titleEn: 'Ionic & Covalent Bonding',
        titleMn: 'Ионы ба ковалент холбоо',
        category: 'Bonding',
        color: 'indigo',
        x: 180,
        y: 320,
        formula: 'NaCl, H2O, Diamond',
        descriptionEn: 'Transfer or sharing of valence electrons; structure determines conductivity & melting point.',
        descriptionMn: 'Валентын электроны шилжилт эсвэл дундын хос; бүтэц нь цахилгаан дамжуулалт ба хайлах цэгийг тодорхойлно.',
        chapterNumber: 2,
        glossaryId: 'glo-ch2-ionic-lattice'
      },
      {
        id: 'node-electrolysis',
        titleEn: 'Electrolysis (Ions Discharge)',
        titleMn: 'Электролиз (Ионы саармагжилт)',
        category: 'Electrochem',
        color: 'teal',
        x: 480,
        y: 340,
        formula: '2H⁺ + 2e⁻ → H2',
        descriptionEn: 'Decomposition of molten/aqueous ionic compounds by electricity: cathode reduces, anode oxidizes.',
        descriptionMn: 'Цахилгаан гүйдлээр ионы нэгдлийг задлах: катод дээр ангижирна, анод дээр исэлдэнэ.',
        chapterNumber: 4,
        glossaryId: 'glo-ch4-electrolyte'
      },
      {
        id: 'node-stoich',
        titleEn: 'The Mole Concept (n = m/Mr)',
        titleMn: 'Молийн тооцоо (n = m/Mr)',
        category: 'Stoichiometry',
        color: 'amber',
        x: 780,
        y: 120,
        formula: 'n = m/Mr, V = n×24 dm³',
        descriptionEn: 'Avogadro constant (6.02×10²³). Gas molar volume is 24 dm³ at r.t.p.',
        descriptionMn: 'Авогадрогийн тогтмол (6.02×10²³). r.t.p нөхцөлд хийн молийн эзлэхүүн 24 дм³ байна.',
        chapterNumber: 3,
        glossaryId: 'glo-ch3-mole'
      },
      {
        id: 'node-salts',
        titleEn: 'Acids, Bases & Salt Prep',
        titleMn: 'Хүчил, суурь ба давс гаргах',
        category: 'Acids & Salts',
        color: 'rose',
        x: 480,
        y: 540,
        formula: 'Acid + Base → Salt + H2O',
        descriptionEn: 'Neutralisation, filtration, crystallisation, and precipitation techniques.',
        descriptionMn: 'Саармагжих урвал, шүүх, талсжуулах ба тунадасжуулах арга техникүүд.',
        chapterNumber: 7,
        glossaryId: 'glo-ch7-salts'
      },
      {
        id: 'node-titration',
        titleEn: 'Titration Analysis',
        titleMn: 'Титрлэлтийн шинжилгээ',
        category: 'Stoichiometry',
        color: 'amber',
        x: 780,
        y: 340,
        formula: 'c = n / V (dm³)',
        descriptionEn: 'Volumetric titration using burette and pipette with indicator; averaging concordant titres within ±0.1 cm³.',
        descriptionMn: 'Бюретка ба пипетка ашиглан хийх эзлэхүүний титрлэлт; ±0.1 см³ дотор тохирсон титрүүдийн дунджийг олох.',
        chapterNumber: 7,
        glossaryId: 'glo-ch7-titration'
      },
      {
        id: 'node-qualitative',
        titleEn: 'Qualitative Analysis (Paper 6)',
        titleMn: 'Чанарын шинжилгээ (Paper 6)',
        category: 'Analysis',
        color: 'pink',
        x: 780,
        y: 540,
        formula: 'Cu²⁺, Fe²⁺, Fe³⁺, Al³⁺, Zn²⁺',
        descriptionEn: 'Identification of cations & anions using NaOH, NH3, flame tests, and precipitate solubility.',
        descriptionMn: 'NaOH ба NH3 уусмал, дөлний сорил, тунадасны уусах чанараар катион ба анион таних сорил.',
        chapterNumber: 12,
        glossaryId: 'glo-ch12-precipitate'
      }
    ],
    edges: [
      { id: 'e-part-diff', from: 'node-particles', to: 'node-diffusion', labelEn: 'governs', labelMn: 'чиглүүлнэ' },
      { id: 'e-diff-stoich', from: 'node-diffusion', to: 'node-stoich', labelEn: 'uses Mr of', labelMn: 'Mr ашиглана' },
      { id: 'e-bond-elect', from: 'node-bonding', to: 'node-electrolysis', labelEn: 'provides mobile ions', labelMn: 'чөлөөт ионтой' },
      { id: 'e-elect-salts', from: 'node-electrolysis', to: 'node-salts', labelEn: 'produces/decomposes', labelMn: 'задарч үүснэ' },
      { id: 'e-stoich-titr', from: 'node-stoich', to: 'node-titration', labelEn: 'calculates c = n/V', labelMn: 'концентраци олно' },
      { id: 'e-salts-titr', from: 'node-salts', to: 'node-titration', labelEn: 'prepared by', labelMn: 'аргаар бэлтгэнэ' },
      { id: 'e-salts-qual', from: 'node-salts', to: 'node-qualitative', labelEn: 'identified via', labelMn: 'шинжлэн танина' },
      { id: 'e-titr-qual', from: 'node-titration', to: 'node-qualitative', labelEn: 'tested in Paper 6', labelMn: 'Paper 6 дээр соригдоно' }
    ]
  },
  {
    id: 'tpl-ch1',
    titleEn: 'Chapter 1: States of Matter & Diffusion',
    titleMn: 'Бүлэг 1: Бодисын төлөв ба диффуз',
    chapterNumber: 1,
    descriptionEn: 'Kinetic particle model, phase changes, latent heat, and diffusion rates.',
    descriptionMn: 'Бөөмийн кинетик загвар, төлөвийн шилжилт, халаалтын муруй, диффузийн хурд.',
    nodes: [
      {
        id: 'node-c1-kpt',
        titleEn: 'Kinetic Particle Theory',
        titleMn: 'Бөөмийн кинетик онол',
        category: 'Matter',
        color: 'emerald',
        x: 400,
        y: 120,
        descriptionEn: 'All matter is made of tiny moving particles possessing kinetic energy.',
        descriptionMn: 'Бүх бодис кинетик энергитэй тасралтгүй хөдөлдөг бөөмсөөс тогтоно.',
        chapterNumber: 1,
        glossaryId: 'glo-ch1-kinetic'
      },
      {
        id: 'node-c1-states',
        titleEn: 'Solids, Liquids & Gases',
        titleMn: 'Хатуу, Шингэн ба Хий',
        category: 'Matter',
        color: 'emerald',
        x: 160,
        y: 280,
        descriptionEn: 'Solid: regular lattice. Liquid: closely packed, sliding. Gas: far apart, rapid random motion.',
        descriptionMn: 'Хатуу: оронт тор. Шингэн: нягт, гулсаж хөдөлнө. Хий: хол зайтай, эмх замбараагүй их хурдтай.',
        chapterNumber: 1
      },
      {
        id: 'node-c1-heating',
        titleEn: 'Heating Curve Plateaus',
        titleMn: 'Халаалтын муруйн плато',
        category: 'Matter',
        color: 'emerald',
        x: 400,
        y: 320,
        descriptionEn: 'At melting and boiling points, temperature is constant while intermolecular forces are broken.',
        descriptionMn: 'Хайлах ба буцлах цэг дээр бөөмс хоорондын хүч тасрах хүртэл температур тогтмол байна.',
        chapterNumber: 1,
        glossaryId: 'glo-ch1-heating-curve'
      },
      {
        id: 'node-c1-subl',
        titleEn: 'Sublimation (CO2 & I2)',
        titleMn: 'Сублимац (Хуурай мөс ба Иод)',
        category: 'Matter',
        color: 'emerald',
        x: 660,
        y: 280,
        formula: 'Solid → Gas directly',
        descriptionEn: 'Direct transition from solid to gas without liquid phase.',
        descriptionMn: 'Шингэн төлөвийг алгасан хатуугаас шууд хий болох үзэгдэл.',
        chapterNumber: 1,
        glossaryId: 'glo-ch1-sublimation'
      },
      {
        id: 'node-c1-diff',
        titleEn: 'Diffusion Rate (Graham)',
        titleMn: 'Диффузийн хурд (Грэхэм)',
        category: 'Matter',
        color: 'emerald',
        x: 400,
        y: 500,
        formula: 'NH3 (Mr=17) vs HCl (Mr=36.5)',
        descriptionEn: 'Gases with lower Mr travel faster; white ring of NH4Cl forms closer to HCl end.',
        descriptionMn: 'Mr багатай хий хурдан тархана; NH4Cl-ийн цагаан цагираг HCl-ийн үзүүрт ойр үүснэ.',
        chapterNumber: 1,
        glossaryId: 'glo-ch1-diffusion'
      }
    ],
    edges: [
      { id: 'ec1-1', from: 'node-c1-kpt', to: 'node-c1-states', labelEn: 'explains structure of', labelMn: 'бүтцийг тайлбарлана' },
      { id: 'ec1-2', from: 'node-c1-kpt', to: 'node-c1-heating', labelEn: 'energy during phase change', labelMn: 'төлөв шилжих үеийн энерги' },
      { id: 'ec1-3', from: 'node-c1-kpt', to: 'node-c1-subl', labelEn: 'direct phase change', labelMn: 'шууд төлөв шилжилт' },
      { id: 'ec1-4', from: 'node-c1-kpt', to: 'node-c1-diff', labelEn: 'causes random movement', labelMn: 'эмх замбараагүй хөдөлгөөн үүсгэнэ' },
      { id: 'ec1-5', from: 'node-c1-heating', to: 'node-c1-diff', labelEn: 'higher temp = faster diffusion', labelMn: 'температур их бол хурдан тархана' }
    ]
  },
  {
    id: 'tpl-ch4',
    titleEn: 'Chapter 4: Electrochemistry & Electrolysis',
    titleMn: 'Бүлэг 4: Цахилгаан хими ба Электролиз',
    chapterNumber: 4,
    descriptionEn: 'Electrolytes, cathode reduction, anode oxidation, and aqueous discharge rules.',
    descriptionMn: 'Электролит, катодын ангижралт, анодын исэлдэлт, ба усан уусмал дахь ялгарах дүрэм.',
    nodes: [
      {
        id: 'node-c4-elect',
        titleEn: 'The Electrolyte (Molten/Aq)',
        titleMn: 'Электролит (Хайлмал/Уусмал)',
        category: 'Electrochem',
        color: 'teal',
        x: 400,
        y: 120,
        formula: 'NaCl(l), CuSO4(aq), H2SO4(aq)',
        descriptionEn: 'Contains mobile ions that conduct electric current and decompose.',
        descriptionMn: 'Цахилгаан гүйдэл дамжуулж задардаг хөдөлгөөнт ионуудыг агуулна.',
        chapterNumber: 4,
        glossaryId: 'glo-ch4-electrolyte'
      },
      {
        id: 'node-c4-cat',
        titleEn: 'Cathode (-) [Reduction]',
        titleMn: 'Катод (-) [Ангижрах]',
        category: 'Electrochem',
        color: 'teal',
        x: 180,
        y: 320,
        formula: 'Cation + e⁻ → Product (OIL RIG)',
        descriptionEn: 'Negative electrode: attracts cations. Hydrogen forms UNLESS metal is below H (Cu, Ag).',
        descriptionMn: 'Сөрөг электрод: катионыг татна. Металл нь H-аас доор биш бол H2 ялгарна.',
        chapterNumber: 4,
        glossaryId: 'glo-ch4-cathode'
      },
      {
        id: 'node-c4-ano',
        titleEn: 'Anode (+) [Oxidation]',
        titleMn: 'Анод (+) [Исэлдэх]',
        category: 'Electrochem',
        color: 'teal',
        x: 640,
        y: 320,
        formula: 'Anion → Product + e⁻',
        descriptionEn: 'Positive electrode: attracts anions. Halogen gas forms if concentrated halide; else O2.',
        descriptionMn: 'Эерэг электрод: анионыг татна. Өтгөрүүлсэн галид бол галоген, бусад үед хүчилтөрөгч ялгарна.',
        chapterNumber: 4,
        glossaryId: 'glo-ch4-anode'
      },
      {
        id: 'node-c4-brine',
        titleEn: 'Brine Electrolysis (Chlor-Alkali)',
        titleMn: 'Давсны уусмалын электролиз',
        category: 'Electrochem',
        color: 'teal',
        x: 400,
        y: 480,
        formula: '2NaCl + 2H2O → Cl2 + H2 + 2NaOH',
        descriptionEn: 'Cathode: H2(g). Anode: Cl2(g). Remaining solution: Alkaline NaOH.',
        descriptionMn: 'Катод: H2(g). Анод: Cl2(g). Үлдэх уусмал: Шүлтлэг NaOH.',
        chapterNumber: 4
      }
    ],
    edges: [
      { id: 'ec4-1', from: 'node-c4-elect', to: 'node-c4-cat', labelEn: 'cations migrate to', labelMn: 'катионууд очно' },
      { id: 'ec4-2', from: 'node-c4-elect', to: 'node-c4-ano', labelEn: 'anions migrate to', labelMn: 'анионууд очно' },
      { id: 'ec4-3', from: 'node-c4-cat', to: 'node-c4-brine', labelEn: 'yields H2 gas at', labelMn: 'дээр H2 хий үүсгэнэ' },
      { id: 'ec4-4', from: 'node-c4-ano', to: 'node-c4-brine', labelEn: 'yields Cl2 gas at', labelMn: 'дээр Cl2 хий үүсгэнэ' }
    ]
  }
];
