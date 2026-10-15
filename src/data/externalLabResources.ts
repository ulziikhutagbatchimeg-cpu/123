import type { SimulatorType } from '../context/AppContext';

// Curated third-party simulations and YouTube lessons for each Virtual Lab.
// Every URL and video ID below was checked to be live and embeddable (Oct 2026).

export type ExternalProvider = 'PhET' | 'iWant2Study' | 'ChemCollective' | 'RSC' | 'Ptable';

export interface ExternalSim {
  id: string;
  provider: ExternalProvider;
  titleEn: string;
  titleMn: string;
  descEn: string;
  descMn: string;
  syllabusRef: string;
  /** Page to open in a new tab. */
  url: string;
  /** Iframe source; omitted when the resource must be opened on its own site. */
  embed?: { en: string; mn?: string };
}

export interface VideoLesson {
  /** YouTube video ID */
  id: string;
  channel: string;
  title: string;
  focusEn: string;
  focusMn: string;
}

export interface LabResourceSet {
  sims: ExternalSim[];
  videos: VideoLesson[];
}

const phet = (slug: string) => ({
  url: `https://phet.colorado.edu/en/simulations/${slug}`,
  embed: {
    en: `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}_en.html`,
    mn: `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}_mn.html`
  }
});

const SIMS = {
  acidBaseSolutions: {
    id: 'phet-acid-base-solutions',
    provider: 'PhET',
    titleEn: 'Acid-Base Solutions',
    titleMn: 'Хүчил-шүлтийн уусмал',
    descEn: 'Compare strong and weak acids and bases with a pH meter, indicator paper and conductivity tester.',
    descMn: 'Хүчтэй ба сул хүчил, шүлтийг pH метр, индикатор цаас, цахилгаан дамжуулалтаар харьцуулна.',
    syllabusRef: '0620/Topic 7',
    ...phet('acid-base-solutions')
  },
  phScale: {
    id: 'phet-ph-scale',
    provider: 'PhET',
    titleEn: 'pH Scale',
    titleMn: 'pH шкал',
    descEn: 'Test everyday liquids, dilute them with water and see how pH and H⁺/OH⁻ concentration change.',
    descMn: 'Өдөр тутмын шингэний pH-ийг хэмжиж, усаар шингэлэхэд H⁺/OH⁻ концентраци хэрхэн өөрчлөгдөхийг ажиглана.',
    syllabusRef: '0620/Topic 7',
    ...phet('ph-scale')
  },
  balancingEquations: {
    id: 'phet-balancing-equations',
    provider: 'PhET',
    titleEn: 'Balancing Chemical Equations',
    titleMn: 'Химийн тэгшитгэл тэнцүүлэх',
    descEn: 'Balance equations with a visual atom counter, then test yourself in the game mode.',
    descMn: 'Атомын тоог дүрслэлээр харж тэгшитгэл тэнцүүлээд, тоглоомын горимоор өөрийгөө шалгана.',
    syllabusRef: '0620/Topic 3',
    ...phet('balancing-chemical-equations')
  },
  reactantsProducts: {
    id: 'phet-reactants-products',
    provider: 'PhET',
    titleEn: 'Reactants, Products and Leftovers',
    titleMn: 'Урвалд орогч, бүтээгдэхүүн ба илүүдэл',
    descEn: 'Build intuition for limiting reactants and mole ratios with sandwiches and real molecules.',
    descMn: 'Хязгаарлагч урвалж ба молийн харьцааг сэндвич болон бодит молекулаар ойлгоно.',
    syllabusRef: '0620/Topic 3',
    ...phet('reactants-products-and-leftovers')
  },
  concentration: {
    id: 'phet-concentration',
    provider: 'PhET',
    titleEn: 'Concentration',
    titleMn: 'Концентраци',
    descEn: 'Add solute, evaporate or dilute and read the concentration in mol/dm³ — ideal before titration calculations.',
    descMn: 'Ууссан бодис нэмж, ууршуулж, шингэлээд концентрацийг mol/dm³-ээр уншина. Титрлэлтийн тооцооны өмнө тохиромжтой.',
    syllabusRef: '0620/Topic 3',
    ...phet('concentration')
  },
  buildAnAtom: {
    id: 'phet-build-an-atom',
    provider: 'PhET',
    titleEn: 'Build an Atom',
    titleMn: 'Атом бүтээх',
    descEn: 'Add protons, neutrons and electrons to find the element, mass number, charge and electron shells.',
    descMn: 'Протон, нейтрон, электрон нэмж элемент, массын тоо, цэнэг, электрон бүрхүүлийг тодорхойлно.',
    syllabusRef: '0620/Topic 2',
    ...phet('build-an-atom')
  },
  isotopes: {
    id: 'phet-isotopes',
    provider: 'PhET',
    titleEn: 'Isotopes and Atomic Mass',
    titleMn: 'Изотоп ба атомын масс',
    descEn: 'Create isotopes and see how natural abundance sets the relative atomic mass (Aᵣ).',
    descMn: 'Изотоп үүсгэж, байгаль дахь эзлэх хувь нь харьцангуй атомын массыг (Aᵣ) хэрхэн тодорхойлдгийг харна.',
    syllabusRef: '0620/Topic 2',
    ...phet('isotopes-and-atomic-mass')
  },
  statesOfMatter: {
    id: 'phet-states-of-matter',
    provider: 'PhET',
    titleEn: 'States of Matter',
    titleMn: 'Бодисын төлөв',
    descEn: 'Heat and cool particles to watch melting, boiling and the kinetic particle model in action.',
    descMn: 'Бөөмсийг халааж, хөргөж хайлах, буцлах үзэгдэл болон кинетик бөөмийн загварыг ажиглана.',
    syllabusRef: '0620/Topic 1',
    ...phet('states-of-matter')
  },
  diffusion: {
    id: 'phet-diffusion',
    provider: 'PhET',
    titleEn: 'Diffusion',
    titleMn: 'Диффузи',
    descEn: 'Investigate how particle mass and temperature change the rate of diffusion of gases.',
    descMn: 'Бөөмийн масс ба температур хийн диффузийн хурдад хэрхэн нөлөөлдгийг судална.',
    syllabusRef: '0620/Topic 1',
    ...phet('diffusion')
  },
  buildAMolecule: {
    id: 'phet-build-a-molecule',
    provider: 'PhET',
    titleEn: 'Build a Molecule',
    titleMn: 'Молекул бүтээх',
    descEn: 'Assemble atoms into molecules and connect formulae to structures for covalent bonding.',
    descMn: 'Атомуудаас молекул угсарч, ковалент холбооны томьёо ба бүтцийг холбож ойлгоно.',
    syllabusRef: '0620/Topic 2',
    ...phet('build-a-molecule')
  },
  electrolysisLab: {
    id: 'iwant2study-electrolysis',
    provider: 'iWant2Study',
    titleEn: 'Electrolysis Virtual Lab (NaCl)',
    titleMn: 'Электролизийн виртуал лаб (NaCl)',
    descEn: 'Compare dilute and concentrated NaCl(aq): ion movement, gases at each electrode and live half-equations. By Singapore MOE.',
    descMn: 'Шингэрүүлсэн ба өтгөн NaCl уусмалыг харьцуулна: ионы хөдөлгөөн, электрод бүр дээрх хий, хагас тэгшитгэл. Сингапурын БЯ.',
    syllabusRef: '0620/Topic 4',
    url: 'https://sg.iwant2study.org/ospsg/index.php/interactive-resources/chemistry/03-chemistry-of-reactions/03-chemical-reactions/1271-electrolysis-virtual-lab-xapi',
    embed: { en: 'https://iwant2study.org/lookangejss/chemistryejss/webejs_model_Electrolysis_Virtual_Lab_xAPI_v2/index.html' }
  },
  ratesLab: {
    id: 'iwant2study-rates',
    provider: 'iWant2Study',
    titleEn: 'Rate of Reaction & Catalyst Model',
    titleMn: 'Урвалын хурд ба катализатор',
    descEn: 'Change concentration, temperature, surface area and catalyst, then watch the particle collisions and product curve.',
    descMn: 'Концентраци, температур, гадаргуун талбай, катализаторыг өөрчилж бөөмсийн мөргөлдөөн ба бүтээгдэхүүний муруйг ажиглана.',
    syllabusRef: '0620/Topic 6',
    url: 'https://sg.iwant2study.org/ospsg/index.php/interactive-resources/chemistry/03-chemistry-of-reactions/03-chemical-reactions/1147-catalyst-reaction',
    embed: { en: 'https://iwant2study.org/lookangejss/chemistryejss/ejss_model_rate_of_catalyst_reaction/index.html' }
  },
  rscTitration: {
    id: 'rsc-titration',
    provider: 'RSC',
    titleEn: 'RSC Titration Screen Experiment',
    titleMn: 'RSC титрлэлтийн дэлгэцийн туршилт',
    descEn: 'Royal Society of Chemistry virtual titration with burette readings and concordant results. Level 1 matches IGCSE.',
    descMn: 'Хааны химийн нийгэмлэгийн виртуал титрлэлт: бюреткийн уншилт, конкордант үр дүн. 1-р түвшин IGCSE-д тохирно.',
    syllabusRef: '0620/Topic 7',
    url: 'https://edu.rsc.org/resources/titration-screen-experiment/2077.article'
  },
  chemCollectiveTitration: {
    id: 'chemcollective-titration',
    provider: 'ChemCollective',
    titleEn: 'ChemCollective Virtual Lab: Acid-Base Titration',
    titleMn: 'ChemCollective виртуал лаб: хүчил-шүлтийн титрлэлт',
    descEn: 'Open-ended virtual bench from Carnegie Mellon: pick glassware, titrate NaOH and find its exact concentration.',
    descMn: 'Карнеги Меллоны чөлөөт лабораторийн ширээ: шилэн сав сонгож NaOH-ийг титрлээд яг концентрацийг олно.',
    syllabusRef: '0620/Topic 7',
    url: 'https://chemcollective.org/activities/vlab/101'
  },
  chemCollectiveLimiting: {
    id: 'chemcollective-limiting',
    provider: 'ChemCollective',
    titleEn: 'ChemCollective: Limiting Reagents Problem',
    titleMn: 'ChemCollective: хязгаарлагч урвалжийн бодлого',
    descEn: 'Mix real solutions on a virtual bench to work out which reagent runs out first.',
    descMn: 'Виртуал ширээн дээр уусмал хольж аль урвалж түрүүлж дуусахыг тогтооно.',
    syllabusRef: '0620/Topic 3',
    url: 'https://chemcollective.org/activities/vlab/79'
  },
  chemCollectiveEnergetics: {
    id: 'chemcollective-heat-of-reaction',
    provider: 'ChemCollective',
    titleEn: 'ChemCollective: Heat of Reaction in Solution',
    titleMn: 'ChemCollective: уусмал дахь урвалын дулаан',
    descEn: 'Measure temperature change in a virtual calorimeter to find whether a reaction is exothermic or endothermic.',
    descMn: 'Виртуал калориметрээр температурын өөрчлөлтийг хэмжиж урвал экзо эсвэл эндотерм эсэхийг тогтооно.',
    syllabusRef: '0620/Topic 5',
    url: 'https://chemcollective.org/activities/vlab/90'
  },
  rscPeriodicTable: {
    id: 'rsc-periodic-table',
    provider: 'RSC',
    titleEn: 'RSC Interactive Periodic Table',
    titleMn: 'RSC интерактив үелэх систем',
    descEn: 'Trends in atomic radius, melting point and more, plus history and uses of every element.',
    descMn: 'Атомын радиус, хайлах цэг зэрэг зүй тогтол, элемент бүрийн түүх ба хэрэглээ.',
    syllabusRef: '0620/Topic 8',
    url: 'https://periodic-table.rsc.org/'
  },
  ptable: {
    id: 'ptable',
    provider: 'Ptable',
    titleEn: 'Ptable — Dynamic Periodic Table',
    titleMn: 'Ptable — динамик үелэх систем',
    descEn: 'Colour the table by property, view electron configurations, isotopes and compounds.',
    descMn: 'Хүснэгтийг шинж чанараар будаж, электрон бүтэц, изотоп, нэгдлүүдийг харна.',
    syllabusRef: '0620/Topic 8',
    url: 'https://ptable.com/'
  }
} satisfies Record<string, ExternalSim>;

export const LAB_RESOURCES: Record<SimulatorType, LabResourceSet> = {
  qualitative: {
    sims: [],
    videos: [
      {
        id: 'SJbH0OQRV80',
        channel: 'Chemistry Explained',
        title: 'Paper 6 Prep – practical tests for CATIONS | Cambridge iGCSE Chemistry',
        focusEn: 'Flame tests, NaOH(aq) and NH₃(aq) precipitates exactly as Paper 6 asks.',
        focusMn: 'Paper 6-д асуудаг дөлний сорил, NaOH(aq) ба NH₃(aq)-ийн тунадас.'
      },
      {
        id: 'fCZztwJmAl0',
        channel: 'Malmesbury Education',
        title: 'Identifying Ions – GCSE Science Required Practical',
        focusEn: 'Real bench footage of flame, carbonate, halide and sulfate tests.',
        focusMn: 'Дөлний, карбонат, галид, сульфатын сорилын бодит лабораторийн бичлэг.'
      },
      {
        id: 'jGSLHoQ3XkY',
        channel: 'Precool Skillz',
        title: 'Chemical Tests | iGCSE Chemistry #21',
        focusEn: 'One-stop summary of gas, water, anion and cation tests.',
        focusMn: 'Хий, ус, анион, катионы сорилын нэгдсэн тойм.'
      }
    ]
  },
  titration: {
    sims: [SIMS.rscTitration, SIMS.acidBaseSolutions, SIMS.phScale, SIMS.chemCollectiveTitration],
    videos: [
      {
        id: 'vn3Rx3g1VPk',
        channel: 'Malmesbury Education',
        title: 'Neutralisation Titration – GCSE Science Required Practical',
        focusEn: 'Step-by-step burette and pipette technique filmed in a real lab.',
        focusMn: 'Бюретка, пипетка ашиглах аргачлалыг бодит лабораторид алхам алхмаар.'
      },
      {
        id: 'saRBT5oZfh8',
        channel: 'Freesciencelessons',
        title: 'Required Practical: Carrying out a Titration',
        focusEn: 'Method, concordant titres and the mistakes examiners look for.',
        focusMn: 'Арга зүй, конкордант үр дүн ба шалгагчийн анхаардаг алдаанууд.'
      },
      {
        id: 'MEQ1YGxfAQ4',
        channel: 'Cognito',
        title: 'Moles, Concentration & Volume Calculations',
        focusEn: 'The calculation half of a titration question.',
        focusMn: 'Титрлэлтийн бодлогын тооцооны хэсэг.'
      }
    ]
  },
  rates: {
    sims: [SIMS.ratesLab],
    videos: [
      {
        id: 'HaQm4pNMZug',
        channel: 'Cognito',
        title: 'Rates of Reaction – How to Measure it | How to Show it on Graphs',
        focusEn: 'Gas syringe, mass loss and precipitate methods with graph sketches.',
        focusMn: 'Хийн шприц, масс алдагдал, тунадасны аргууд ба график.'
      },
      {
        id: 'ssa3wh3RNt0',
        channel: 'Malmesbury Education',
        title: 'Rates of Reaction 2 (Collecting Gas) – Required Practical',
        focusEn: 'Measuring gas volume over time in a real experiment.',
        focusMn: 'Бодит туршилтаар хугацааны турш хийн эзлэхүүнийг хэмжих.'
      },
      {
        id: 'lv4zXsrRDNU',
        channel: 'David Funge',
        title: 'The Disappearing Cross – effect of temperature on reaction rate',
        focusEn: 'Sodium thiosulfate + HCl at different temperatures.',
        focusMn: 'Натрийн тиосульфат + HCl-ийг өөр өөр температурт.'
      },
      {
        id: 'aanZzrUPEDw',
        channel: 'Cognito',
        title: 'Measuring Rates from Graphs – Mean Rate & Rate at a Specific Time',
        focusEn: 'Drawing tangents and calculating gradient — a Paper 4/6 favourite.',
        focusMn: 'Шүргэгч татаж налууг тооцох — Paper 4/6-д түгээмэл.'
      }
    ]
  },
  'gas-collection': {
    sims: [SIMS.diffusion],
    videos: [
      {
        id: 'g7lO7rUtIYc',
        channel: 'Chemistry Explained',
        title: '6 tests for 6 gases | GCSE and International GCSE Chemistry',
        focusEn: 'H₂, O₂, CO₂, Cl₂, NH₃ and SO₂ tests demonstrated.',
        focusMn: 'H₂, O₂, CO₂, Cl₂, NH₃, SO₂-ийн сорилын үзүүлэн.'
      },
      {
        id: 'LRd3hPiyfwo',
        channel: 'The A Plus Squad',
        title: 'Upward and downward delivery',
        focusEn: 'Choosing a collection method from gas density and solubility.',
        focusMn: 'Хийн нягт ба уусах чанараас хамааран цуглуулах аргыг сонгох.'
      },
      {
        id: 'QH-7X5STCO4',
        channel: 'Cognito',
        title: 'Testing for Gases – Hydrogen/Chlorine/Oxygen/CO₂',
        focusEn: 'Quick animated recap of the four core gas tests.',
        focusMn: 'Үндсэн дөрвөн хийн сорилын товч хөдөлгөөнт тойм.'
      }
    ]
  },
  chromatography: {
    sims: [],
    videos: [
      {
        id: 'pnTGNAfu6GE',
        channel: 'Malmesbury Education',
        title: 'Chromatography – GCSE Science Required Practical',
        focusEn: 'Setting up the baseline, solvent front and measuring Rf.',
        focusMn: 'Суурь шугам, уусгагчийн зах тавьж Rf хэмжих.'
      },
      {
        id: 'MA9dWxNThZI',
        channel: 'Ms Drewett Science',
        title: 'Chromatography: GCSE Chemistry Required Practical 6',
        focusEn: 'The science of stationary/mobile phase and pure vs impure spots.',
        focusMn: 'Тогтмол/хөдөлгөөнт фаз, цэвэр ба хольцтой толбо.'
      },
      {
        id: 'gAkf6x2pRoU',
        channel: 'Science4Breakfast',
        title: 'Paper Chromatography Full Experiment Including Calculating Rf Values',
        focusEn: 'Identifying an unknown mixture from Rf values.',
        focusMn: 'Rf утгаар үл мэдэгдэх хольцыг тодорхойлох.'
      }
    ]
  },
  electrolysis: {
    sims: [SIMS.electrolysisLab],
    videos: [
      {
        id: '78UtKM2VH5U',
        channel: 'Chemistry Explained',
        title: 'Electrolysis of aqueous solutions | Cambridge iGCSE Chemistry 4.1',
        focusEn: 'Mapped directly to the Cambridge 0620 syllabus points.',
        focusMn: 'Кэмбрижийн 0620 хөтөлбөрийн заалтуудтай шууд нийцсэн.'
      },
      {
        id: 'tCHE_7QeRUc',
        channel: 'Malmesbury Education',
        title: 'Electrolysis – GCSE Science Required Practical',
        focusEn: 'CuCl₂ and Na₂SO₄ electrolysis with half-equations.',
        focusMn: 'CuCl₂ ба Na₂SO₄-ийн электролиз, хагас тэгшитгэлтэй.'
      },
      {
        id: 'XsxOvlLJ_z4',
        channel: 'Philip Harris Science UK',
        title: 'GCSE Chemistry Practical: Electrolysis of Aqueous Solutions',
        focusEn: 'Clear close-ups of gas collection at inert electrodes.',
        focusMn: 'Идэвхгүй электрод дээр хий цуглуулахыг ойроос харуулсан.'
      },
      {
        id: 'me19WmGg8Dw',
        channel: 'Cognito',
        title: 'Electrolysis Part 3/3 – Aqueous Solutions',
        focusEn: 'Rules for predicting products at each electrode.',
        focusMn: 'Электрод бүр дээрх бүтээгдэхүүнийг таамаглах дүрэм.'
      }
    ]
  },
  stoichiometry: {
    sims: [SIMS.balancingEquations, SIMS.reactantsProducts, SIMS.concentration, SIMS.chemCollectiveLimiting],
    videos: [
      {
        id: 'oQalH_mfOfg',
        channel: 'Cognito',
        title: 'Balancing Equations | Writing Word & Symbol Equations',
        focusEn: 'From word equations to balanced symbol equations.',
        focusMn: 'Үгэн тэгшитгэлээс тэнцүүлсэн тэмдэгт тэгшитгэл хүртэл.'
      },
      {
        id: 'kBlmEfS_P00',
        channel: 'Cognito',
        title: "Moles & Mass – Avogadro's Constant",
        focusEn: 'n = m / Mᵣ with worked examples.',
        focusMn: 'n = m / Mᵣ томьёо, бодсон жишээтэй.'
      },
      {
        id: 'gsT2ASVQTxk',
        channel: 'Sciences Made Easy',
        title: 'GCSE Chemistry – Moles and Mass Calculations',
        focusEn: 'Reacting-mass questions in exam style.',
        focusMn: 'Шалгалтын хэлбэрийн урвалын массын бодлогууд.'
      }
    ]
  },
  'periodic-table': {
    sims: [SIMS.buildAnAtom, SIMS.isotopes, SIMS.rscPeriodicTable, SIMS.ptable],
    videos: [
      {
        id: 'TGZs93DzMDY',
        channel: 'Cognito',
        title: 'Group 1 Elements – Alkali Metals | Properties | Reactivity',
        focusEn: 'Why reactivity increases down Group 1.',
        focusMn: '1-р бүлэгт доошлох тусам идэвх яагаад нэмэгддэг вэ.'
      },
      {
        id: 'mE-in2Ncx28',
        channel: 'Save My Exams',
        title: 'Group 1 Metals – The Alkali Metals GCSE and IGCSE Chemistry',
        focusEn: 'IGCSE-focused properties and trend summary.',
        focusMn: 'IGCSE-д чиглэсэн шинж чанар ба зүй тогтлын тойм.'
      },
      {
        id: '7sLifsjIMI4',
        channel: 'Mr Barnes',
        title: 'Group 1 – The Alkali Metals in Water: Observations',
        focusEn: 'Observations to write for Li, Na and K in water.',
        focusMn: 'Li, Na, K усанд орох үеийн ажиглалтыг хэрхэн бичих.'
      }
    ]
  }
};

/** Syllabus areas that have no in-house simulator yet. */
export const EXTRA_TOPIC_SIMS: ExternalSim[] = [
  SIMS.statesOfMatter,
  SIMS.buildAMolecule,
  SIMS.chemCollectiveEnergetics
];
