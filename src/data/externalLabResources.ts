import type { SimulatorType } from '../context/AppContext';

// Curated third-party simulations and YouTube lessons for each Virtual Lab.
// Every URL and video ID below was checked to be live and embeddable (Oct 2026).

export type ExternalProvider = 'PhET' | 'iWant2Study' | 'ChemCollective' | 'RSC' | 'Ptable' | 'JavaLab' | 'Sketchfab';

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
  /** Attribution required by the source (JavaLab title, Sketchfab author). */
  credit?: string;
}

export interface Molecule {
  /** PubChem compound ID, used by the MolView viewer */
  cid: number;
  formula: string;
  nameEn: string;
  nameMn: string;
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
  reactionsAndRates: {
    id: 'phet-reactions-and-rates',
    provider: 'PhET',
    titleEn: 'Reactions & Rates',
    titleMn: 'Урвал ба хурд',
    descEn: 'Change particle type, temperature and concentration and watch how the reaction rate changes.',
    descMn: 'Бөөмийн төрөл, температур, концентрацийг өөрчилж урвалын хурд хэрхэн өөрчлөгдөхийг харна.',
    syllabusRef: '0620/Topic 6',
    ...phet('reactions-and-rates')
  },
  moleculeShapes: {
    id: 'phet-molecule-shapes',
    provider: 'PhET',
    titleEn: 'Molecule Shapes',
    titleMn: 'Молекулын хэлбэр',
    descEn: 'Build molecules from atoms and see how electron pairs set their shape.',
    descMn: 'Атомаас молекул бүтээж, электрон хосууд хэлбэрийг хэрхэн тодорхойлдгийг харна.',
    syllabusRef: '0620/Topic 11',
    ...phet('molecule-shapes')
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

// JavaLab allows iframe embedding provided the page title and URL are cited.
const javalab = (slug: string, title: string) => ({
  url: `https://javalab.org/en/${slug}/`,
  embed: { en: `https://javalab.org/en/${slug}/` },
  credit: `JavaLab – ${title} (javalab.org/en/${slug}/)`
});

const JL = {
  neutralization: {
    id: 'jl-neutralization',
    provider: 'JavaLab',
    titleEn: 'Neutralisation Reaction Model',
    titleMn: 'Саармагжих урвалын загвар',
    descEn: 'Mix acids and alkalis and watch H⁺ and OH⁻ ions combine into water while spectator ions stay behind.',
    descMn: 'Хүчил, шүлт хольж H⁺ ба OH⁻ ионууд ус үүсгэж, үлдсэн ионууд хэвээр үлдэхийг ажиглана.',
    syllabusRef: '0620/Topic 7',
    ...javalab('neutralization_reaction_en', 'Neutralization Reaction Model')
  },
  precipitation: {
    id: 'jl-precipitation',
    provider: 'JavaLab',
    titleEn: 'Precipitation Reaction',
    titleMn: 'Тунадасжих урвал',
    descEn: 'See which ion pairs form an insoluble precipitate — the idea behind the halide and sulfate tests.',
    descMn: 'Аль ионууд уусдаггүй тунадас үүсгэдгийг харна — галид, сульфатын сорилын үндэс.',
    syllabusRef: '0620/Topic 12',
    ...javalab('precipitation_reaction_en', 'Precipitation Reaction')
  },
  reactionRate: {
    id: 'jl-reaction-rate',
    provider: 'JavaLab',
    titleEn: 'Reaction Rate',
    titleMn: 'Урвалын хурд',
    descEn: 'Change concentration and temperature and watch particle collisions speed up or slow down.',
    descMn: 'Концентраци, температурыг өөрчилж бөөмсийн мөргөлдөөн хурдсах, удаашрахыг ажиглана.',
    syllabusRef: '0620/Topic 6',
    ...javalab('reaction_rate_of_solution_en', 'Reaction Rate')
  },
  gasModel: {
    id: 'jl-gas-model',
    provider: 'JavaLab',
    titleEn: 'Kinetic Molecular Model of Gases',
    titleMn: 'Хийн молекул-кинетик загвар',
    descEn: 'Gas particles in random motion — explains why gases fill containers and how they are collected.',
    descMn: 'Хийн бөөмсийн эмх замбараагүй хөдөлгөөн — хий яагаад савыг дүүргэдэг, хэрхэн цуглуулдгийг тайлбарлана.',
    syllabusRef: '0620/Topic 1',
    ...javalab('gas_model_en', 'Kinetic Molecular Model of Gases')
  },
  distillation: {
    id: 'jl-distillation',
    provider: 'JavaLab',
    titleEn: 'Distillation',
    titleMn: 'Нэрэлт',
    descEn: 'Heat a mixture, watch the vapour condense and separate liquids by boiling point.',
    descMn: 'Хольцыг халааж, уурыг конденсацлан шингэнүүдийг буцлах цэгээр нь салгана.',
    syllabusRef: '0620/Topic 12',
    ...javalab('distillation_en', 'Distillation')
  },
  recrystallization: {
    id: 'jl-recrystallization',
    provider: 'JavaLab',
    titleEn: 'Recrystallisation',
    titleMn: 'Дахин талстжуулалт',
    descEn: 'Cool a saturated solution and see crystals form — the purification step for soluble salts.',
    descMn: 'Ханасан уусмалыг хөргөж талст үүсэхийг харна — уусдаг давсыг цэвэршүүлэх алхам.',
    syllabusRef: '0620/Topic 12',
    ...javalab('recrystallization_en', 'Recrystallization (Principle of precipitation)')
  },
  electrolysisWater: {
    id: 'jl-electrolysis-water',
    provider: 'JavaLab',
    titleEn: 'Electrolysis of Water',
    titleMn: 'Усны электролиз',
    descEn: 'Hydrogen at the cathode, oxygen at the anode, in a 2 : 1 volume ratio.',
    descMn: 'Катод дээр устөрөгч, анод дээр хүчилтөрөгч 2 : 1 эзлэхүүний харьцаагаар ялгарна.',
    syllabusRef: '0620/Topic 4',
    ...javalab('electrolysis_of_water_en', 'Electrolysis of Water')
  },
  electroplating: {
    id: 'jl-electroplating',
    provider: 'JavaLab',
    titleEn: 'Electroplating',
    titleMn: 'Цахилгаан бүрэх',
    descEn: 'Plate an object with copper and follow the ions moving from anode to cathode.',
    descMn: 'Эдлэлийг зэсээр бүрж, ионууд анодоос катод руу шилжихийг дагана.',
    syllabusRef: '0620/Topic 4',
    ...javalab('electric_plating_en', 'Electric Plating')
  },
  activitySeries: {
    id: 'jl-activity-series',
    provider: 'JavaLab',
    titleEn: 'Reactivity Series of Metals',
    titleMn: 'Металлын идэвхийн эгнээ',
    descEn: 'Dip metals into salt solutions to find which displaces which.',
    descMn: 'Металлыг давсны уусмалд дүрж аль нь аль металлыг шахаж гаргахыг тогтооно.',
    syllabusRef: '0620/Topic 9',
    ...javalab('activity_series_of_metals_en', 'Activity Series of Metals')
  },
  fuelCell: {
    id: 'jl-fuel-cell',
    provider: 'JavaLab',
    titleEn: 'Hydrogen Fuel Cell',
    titleMn: 'Устөрөгчийн түлшний элемент',
    descEn: 'Hydrogen and oxygen react to give water and electricity.',
    descMn: 'Устөрөгч, хүчилтөрөгч урвалд орж ус ба цахилгаан гүйдэл үүсгэнэ.',
    syllabusRef: '0620/Topic 4',
    ...javalab('fuel_cell_en', 'Fuel Cell')
  },
  definiteProportions: {
    id: 'jl-definite-proportions',
    provider: 'JavaLab',
    titleEn: 'Law of Definite Proportions',
    titleMn: 'Найрлагын тогтмол байдлын хууль',
    descEn: 'React elements in different amounts and discover the fixed mass ratio — and what is left over.',
    descMn: 'Элементүүдийг өөр өөр хэмжээгээр урвалд оруулж тогтмол массын харьцаа ба илүүдлийг олно.',
    syllabusRef: '0620/Topic 3',
    ...javalab('law_of_definite_proportions_en', 'Law of Definite Proportions')
  },
  ammoniaSynthesis: {
    id: 'jl-ammonia-synthesis',
    provider: 'JavaLab',
    titleEn: 'Gas Reactions – Ammonia Synthesis',
    titleMn: 'Хийн урвал – аммиакийн нийлэгжилт',
    descEn: 'N₂ + 3H₂ → 2NH₃ with particles: mole ratios and volume ratios of gases.',
    descMn: 'N₂ + 3H₂ → 2NH₃ урвалыг бөөмсөөр: хийн молийн ба эзлэхүүний харьцаа.',
    syllabusRef: '0620/Topic 3',
    ...javalab('stoichiometry_with_ammonia_synthesis_en', 'Chemical Reactions in Gas Phase - Ammonia Synthesis')
  },
  elementGame: {
    id: 'jl-element-game',
    provider: 'JavaLab',
    titleEn: 'Element Symbols Typing Game',
    titleMn: 'Элементийн тэмдэг бичих тоглоом',
    descEn: 'Fast practice for recalling element names and symbols.',
    descMn: 'Элементийн нэр, тэмдгийг хурдан санах дасгал.',
    syllabusRef: '0620/Topic 8',
    ...javalab('element_game_en', 'Elements Texting Game (Standalone)')
  },
  ionicNaCl: {
    id: 'jl-ionic-nacl',
    provider: 'JavaLab',
    titleEn: 'Ionic Bond – NaCl',
    titleMn: 'Ионы холбоо – NaCl',
    descEn: 'Electron transfer from Na to Cl and the resulting giant ionic lattice.',
    descMn: 'Na-аас Cl руу электрон шилжиж аварга ионы тор үүсэх нь.',
    syllabusRef: '0620/Topic 2',
    ...javalab('nacl_ionic_bond_en', 'Ionic Bond - NaCl')
  },
  covalentBond: {
    id: 'jl-covalent-bond',
    provider: 'JavaLab',
    titleEn: 'Covalent Bond',
    titleMn: 'Ковалент холбоо',
    descEn: 'Shared electron pairs in simple molecules such as H₂, O₂ and H₂O.',
    descMn: 'H₂, O₂, H₂O зэрэг энгийн молекул дахь хуваалцсан электрон хос.',
    syllabusRef: '0620/Topic 2',
    ...javalab('covalent_bond_en', 'Covalent Bond')
  },
  kineticTheory: {
    id: 'jl-kinetic-theory',
    provider: 'JavaLab',
    titleEn: 'Kinetic Theory Model',
    titleMn: 'Кинетик онолын загвар',
    descEn: 'Particle arrangement and motion in solids, liquids and gases.',
    descMn: 'Хатуу, шингэн, хий дэх бөөмсийн байрлал ба хөдөлгөөн.',
    syllabusRef: '0620/Topic 1',
    ...javalab('kinetic_theory_model_en', 'Kinetic Theory Model')
  },
  boilingPoint: {
    id: 'jl-boiling-point',
    provider: 'JavaLab',
    titleEn: 'Heating Curve & Boiling Point',
    titleMn: 'Халаалтын муруй ба буцлах цэг',
    descEn: 'Heat ice, water and ethanol and read the flat sections of the heating curve.',
    descMn: 'Мөс, ус, этанолыг халааж халаалтын муруйн хэвтээ хэсгийг уншина.',
    syllabusRef: '0620/Topic 1',
    ...javalab('boiling_point_en', 'Boiling Point (Ice or Water, Ethanol)')
  },
  leChatelier: {
    id: 'jl-le-chatelier',
    provider: 'JavaLab',
    titleEn: "Le Chatelier's Principle",
    titleMn: 'Ле Шательегийн зарчим',
    descEn: 'Change the pressure on an equilibrium mixture and watch the position shift.',
    descMn: 'Тэнцвэрт хольцын даралтыг өөрчилж тэнцвэр шилжихийг ажиглана.',
    syllabusRef: '0620/Topic 6',
    ...javalab('le_chateliers_principle_pressure_en', "Le Chatelier's Principle")
  },
  alkanes: {
    id: 'jl-alkanes',
    provider: 'JavaLab',
    titleEn: 'Alkanes',
    titleMn: 'Алканууд',
    descEn: 'Build methane to butane and see the homologous series pattern CₙH₂ₙ₊₂.',
    descMn: 'Метанаас бутан хүртэл бүтээж CₙH₂ₙ₊₂ гомолог эгнээний зүй тогтлыг харна.',
    syllabusRef: '0620/Topic 11',
    ...javalab('alkane_compound_en', 'Alkane Compound')
  },
  addition: {
    id: 'jl-addition-polymerisation',
    provider: 'JavaLab',
    titleEn: 'Addition Polymerisation',
    titleMn: 'Нэгдэх полимержилт',
    descEn: 'Ethene monomers open their C=C bonds and join into poly(ethene).',
    descMn: 'Этений мономерууд C=C холбоогоо нээж поли(этен) болж холбогдоно.',
    syllabusRef: '0620/Topic 11',
    ...javalab('addition_polymerization_en', 'Addition Polymerization')
  },
  ester: {
    id: 'jl-ester',
    provider: 'JavaLab',
    titleEn: 'Structure of Esters',
    titleMn: 'Эфирийн бүтэц',
    descEn: 'Carboxylic acid + alcohol → ester + water, shown molecule by molecule.',
    descMn: 'Карбоксилын хүчил + спирт → эфир + ус урвалыг молекулаар харуулна.',
    syllabusRef: '0620/Topic 11',
    ...javalab('ester_en', 'The Structure of Ester')
  }
} satisfies Record<string, ExternalSim>;

const sketchfab = (uid: string, author: string) => ({
  url: `https://sketchfab.com/3d-models/${uid}`,
  embed: { en: `https://sketchfab.com/models/${uid}/embed?autostart=1&ui_theme=dark&dnt=1` },
  credit: `3D: ${author} · Sketchfab`
});

const SF = {
  titrationKit: {
    id: 'sf-titration-kit',
    provider: 'Sketchfab',
    titleEn: 'Titration Equipment',
    titleMn: 'Титрлэлтийн багаж',
    descEn: 'Burette, pipette and dropper — rotate to see the tap and graduations.',
    descMn: 'Бюретка, пипетка, дусаагуур — эргүүлж цорго ба хуваарийг харна.',
    syllabusRef: '0620/Topic 12',
    ...sketchfab('1fabf3c93e0942d2b21f358dd568c154', 'walkermd')
  },
  buretteStand: {
    id: 'sf-burette-stand',
    provider: 'Sketchfab',
    titleEn: 'Burette Stand & Clamp',
    titleMn: 'Бюреткийн штатив ба хавчаар',
    descEn: 'How a burette is clamped vertically above the conical flask.',
    descMn: 'Бюреткийг конус колбын дээр босоо хавчдаг байдал.',
    syllabusRef: '0620/Topic 12',
    ...sketchfab('9d204d9be6744ea1a491bd152c61228f', 'VeeRuby Technologies')
  },
  testTubeRack: {
    id: 'sf-test-tube-rack',
    provider: 'Sketchfab',
    titleEn: 'Test Tube Rack',
    titleMn: 'Туршилтын хоолойн тавиур',
    descEn: 'The set-up used for side-by-side ion tests.',
    descMn: 'Ионы сорилыг зэрэгцүүлэн хийхэд хэрэглэдэг тавиур.',
    syllabusRef: '0620/Topic 12',
    ...sketchfab('f09bcbfe529e4314a1acbf7b7d1e867f', 'Harry Bond')
  },
  glassware: {
    id: 'sf-glassware',
    provider: 'Sketchfab',
    titleEn: 'Beakers, Flasks & Measuring Cylinders',
    titleMn: 'Стакан, колба, хэмжих цилиндр',
    descEn: 'Compare common glassware and which one measures volume most precisely.',
    descMn: 'Түгээмэл шилэн савыг харьцуулж аль нь эзлэхүүнийг хамгийн нарийн хэмждэгийг ялгана.',
    syllabusRef: '0620/Topic 12',
    ...sketchfab('b8594f7dc7e8442dbaaae7a11da4a962', 'maxdragonn')
  },
  bunsen: {
    id: 'sf-bunsen',
    provider: 'Sketchfab',
    titleEn: 'Bunsen Burner',
    titleMn: 'Бунзений горелк',
    descEn: 'Air hole, barrel and gas inlet of the burner used to heat reactions.',
    descMn: 'Урвал халаахад хэрэглэдэг горелкийн агаарын нүх, хоолой, хийн оролт.',
    syllabusRef: '0620/Topic 12',
    ...sketchfab('5185e41b2beb48fa8f15ca3707f43e10', 'Dreamsoft Innovations')
  },
  distillation: {
    id: 'sf-distillation',
    provider: 'Sketchfab',
    titleEn: 'Distillation Apparatus',
    titleMn: 'Нэрэх төхөөрөмж',
    descEn: 'Flask, still head and condenser assembled as in a real distillation.',
    descMn: 'Колба, нэрэх толгой, хөргөгчийг бодит нэрэлтийнх шиг угсарсан.',
    syllabusRef: '0620/Topic 12',
    ...sketchfab('63caa08d382844afb896ee9e82fff6c1', 'djinghis')
  },
  condensers: {
    id: 'sf-condensers',
    provider: 'Sketchfab',
    titleEn: 'Fractionating Column & Condensers',
    titleMn: 'Фракцлах багана ба хөргөгч',
    descEn: 'Vigreux column, Allihn and Graham condensers up close.',
    descMn: 'Вигре багана, Аллин ба Грэхэмийн хөргөгчийг ойроос.',
    syllabusRef: '0620/Topic 12',
    ...sketchfab('62102fd69d4b4780bdb5ed56c00b597b', 'cesar.seidel')
  },
  electrolysis: {
    id: 'sf-electrolysis',
    provider: 'Sketchfab',
    titleEn: 'Electrolysis of Water Cell',
    titleMn: 'Усны электролизийн элемент',
    descEn: 'Animated cell with power supply, electrodes and gas volume graph.',
    descMn: 'Тэжээл, электрод, хийн эзлэхүүний графиктай хөдөлгөөнт элемент.',
    syllabusRef: '0620/Topic 4',
    ...sketchfab('30bdf89c0c3b44f3b0ffbb56aa6dffd7', 'arloopa')
  },
  electroplating: {
    id: 'sf-electroplating',
    provider: 'Sketchfab',
    titleEn: 'Electroplating with Copper',
    titleMn: 'Зэсээр цахилгаан бүрэх',
    descEn: 'Two animations: copper anode dissolves, object at the cathode is coated.',
    descMn: 'Хоёр хөдөлгөөнт дүрс: зэс анод уусч, катод дахь эдлэл бүрэгдэнэ.',
    syllabusRef: '0620/Topic 4',
    ...sketchfab('0a8d902c8d52402db862630d456cfadf', 'Vera4Art')
  },
  battery: {
    id: 'sf-battery',
    provider: 'Sketchfab',
    titleEn: 'Zinc–Carbon Cell (Cross-section)',
    titleMn: 'Цайр–нүүрстөрөгчийн элемент (огтлол)',
    descEn: 'Inside a dry cell: zinc case, carbon rod and electrolyte paste.',
    descMn: 'Хуурай элементийн дотор тал: цайран бүрхүүл, нүүрстөрөгчийн саваа, электролит.',
    syllabusRef: '0620/Topic 4',
    ...sketchfab('695bbcb681a149bab6f865773965c7f7', 'arloopa')
  },
  periodicTable: {
    id: 'sf-periodic-table',
    provider: 'Sketchfab',
    titleEn: '3D Periodic Table',
    titleMn: '3D үелэх систем',
    descEn: 'Rotate the table to see groups, periods and blocks from every angle.',
    descMn: 'Хүснэгтийг эргүүлж бүлэг, үе, блокуудыг бүх талаас харна.',
    syllabusRef: '0620/Topic 8',
    ...sketchfab('09cd9683c4244eba9167a083c7298804', 'ApolloIndustries')
  },
  ionicFormation: {
    id: 'sf-ionic-formation',
    provider: 'Sketchfab',
    titleEn: 'Forming the Ionic Bond in NaCl',
    titleMn: 'NaCl-ийн ионы холбоо үүсэх нь',
    descEn: 'Electron shells of Na and Cl before and after electron transfer.',
    descMn: 'Электрон шилжихийн өмнө ба дараах Na, Cl-ийн электрон бүрхүүл.',
    syllabusRef: '0620/Topic 2',
    ...sketchfab('575c2b7ee2e24b83bace39e7df91143e', 'Andy Todd')
  },
  naclLattice: {
    id: 'sf-nacl-lattice',
    provider: 'Sketchfab',
    titleEn: 'Sodium Chloride Giant Ionic Lattice',
    titleMn: 'Натрийн хлоридын аварга ионы тор',
    descEn: 'Alternating Na⁺ (blue) and Cl⁻ (green) ions in a cubic lattice.',
    descMn: 'Na⁺ (цэнхэр) ба Cl⁻ (ногоон) ионууд ээлжлэн байрласан куб тор.',
    syllabusRef: '0620/Topic 2',
    ...sketchfab('c31588115ba2433e819282ceee5d706c', 'EfrenR')
  },
  diamond: {
    id: 'sf-diamond',
    provider: 'Sketchfab',
    titleEn: 'Diamond Lattice',
    titleMn: 'Алмазын тор',
    descEn: 'Each carbon bonded to four others — why diamond is so hard.',
    descMn: 'Нүүрстөрөгч бүр дөрвөн атомтай холбогдсон — алмаз яагаад маш хатуу вэ.',
    syllabusRef: '0620/Topic 2',
    ...sketchfab('b0378af5ed874c8780b11c3a76d07ace', 'Emanuele Messina')
  },
  graphite: {
    id: 'sf-graphite',
    provider: 'Sketchfab',
    titleEn: 'Graphite Layers',
    titleMn: 'Графитын давхаргууд',
    descEn: 'Hexagonal layers with weak forces between them — why graphite is soft and conducts.',
    descMn: 'Хооронд нь сул хүчтэй зургаан өнцөгт давхаргууд — графит яагаад зөөлөн, цахилгаан дамжуулдаг вэ.',
    syllabusRef: '0620/Topic 2',
    ...sketchfab('75b6db0709b84549b62306e143aadbb1', 'Museum of Mineralogy and Petrography, UAIC')
  }
} satisfies Record<string, ExternalSim>;

const MOL = {
  water: { cid: 962, formula: 'H₂O', nameEn: 'Water', nameMn: 'Ус' },
  hydrogen: { cid: 783, formula: 'H₂', nameEn: 'Hydrogen', nameMn: 'Устөрөгч' },
  oxygen: { cid: 977, formula: 'O₂', nameEn: 'Oxygen', nameMn: 'Хүчилтөрөгч' },
  nitrogen: { cid: 947, formula: 'N₂', nameEn: 'Nitrogen', nameMn: 'Азот' },
  chlorine: { cid: 24526, formula: 'Cl₂', nameEn: 'Chlorine', nameMn: 'Хлор' },
  co2: { cid: 280, formula: 'CO₂', nameEn: 'Carbon dioxide', nameMn: 'Нүүрсхүчлийн хий' },
  so2: { cid: 1119, formula: 'SO₂', nameEn: 'Sulfur dioxide', nameMn: 'Хүхрийн давхар исэл' },
  ammonia: { cid: 222, formula: 'NH₃', nameEn: 'Ammonia', nameMn: 'Аммиак' },
  hcl: { cid: 313, formula: 'HCl', nameEn: 'Hydrogen chloride', nameMn: 'Устөрөгч хлорид' },
  sulfuricAcid: { cid: 1118, formula: 'H₂SO₄', nameEn: 'Sulfuric acid', nameMn: 'Хүхрийн хүчил' },
  h2o2: { cid: 784, formula: 'H₂O₂', nameEn: 'Hydrogen peroxide', nameMn: 'Устөрөгчийн хэт исэл' },
  glucose: { cid: 5793, formula: 'C₆H₁₂O₆', nameEn: 'Glucose', nameMn: 'Глюкоз' },
  glycine: { cid: 750, formula: 'C₂H₅NO₂', nameEn: 'Glycine (amino acid)', nameMn: 'Глицин (амин хүчил)' },
  alanine: { cid: 5950, formula: 'C₃H₇NO₂', nameEn: 'Alanine (amino acid)', nameMn: 'Аланин (амин хүчил)' },
  methane: { cid: 297, formula: 'CH₄', nameEn: 'Methane', nameMn: 'Метан' },
  ethane: { cid: 6324, formula: 'C₂H₆', nameEn: 'Ethane', nameMn: 'Этан' },
  propane: { cid: 6334, formula: 'C₃H₈', nameEn: 'Propane', nameMn: 'Пропан' },
  butane: { cid: 7843, formula: 'C₄H₁₀', nameEn: 'Butane', nameMn: 'Бутан' },
  ethene: { cid: 6325, formula: 'C₂H₄', nameEn: 'Ethene', nameMn: 'Этен' },
  methanol: { cid: 887, formula: 'CH₃OH', nameEn: 'Methanol', nameMn: 'Метанол' },
  ethanol: { cid: 702, formula: 'C₂H₅OH', nameEn: 'Ethanol', nameMn: 'Этанол' },
  ethanoicAcid: { cid: 176, formula: 'CH₃COOH', nameEn: 'Ethanoic acid', nameMn: 'Цууны хүчил' },
  ethylEthanoate: { cid: 8857, formula: 'CH₃COOC₂H₅', nameEn: 'Ethyl ethanoate', nameMn: 'Этил этаноат' }
} satisfies Record<string, Molecule>;

export const LAB_MODELS_3D: Record<SimulatorType, ExternalSim[]> = {
  qualitative: [SF.testTubeRack, SF.glassware],
  titration: [SF.titrationKit, SF.buretteStand],
  rates: [SF.glassware],
  'gas-collection': [SF.bunsen, SF.glassware],
  chromatography: [SF.distillation, SF.condensers],
  electrolysis: [SF.electrolysis, SF.electroplating, SF.battery],
  stoichiometry: [],
  'periodic-table': [SF.periodicTable, SF.ionicFormation]
};

export const LAB_MOLECULES: Record<SimulatorType, Molecule[]> = {
  qualitative: [MOL.ammonia, MOL.co2, MOL.so2],
  titration: [MOL.hcl, MOL.sulfuricAcid, MOL.ethanoicAcid, MOL.ammonia],
  rates: [MOL.h2o2, MOL.co2, MOL.water],
  'gas-collection': [MOL.hydrogen, MOL.oxygen, MOL.co2, MOL.ammonia, MOL.chlorine, MOL.so2],
  chromatography: [MOL.glycine, MOL.alanine, MOL.glucose],
  electrolysis: [MOL.water, MOL.hydrogen, MOL.oxygen, MOL.chlorine],
  stoichiometry: [MOL.water, MOL.methane, MOL.propane, MOL.glucose],
  'periodic-table': [MOL.water, MOL.methane, MOL.ammonia, MOL.hcl, MOL.nitrogen, MOL.co2]
};

export const LAB_RESOURCES: Record<SimulatorType, LabResourceSet> = {
  qualitative: {
    sims: [JL.precipitation],
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
    sims: [SIMS.rscTitration, SIMS.acidBaseSolutions],
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
    sims: [SIMS.ratesLab, JL.reactionRate],
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
    sims: [JL.gasModel, SIMS.diffusion],
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
    sims: [SIMS.electrolysisLab, JL.electrolysisWater],
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
    sims: [SIMS.balancingEquations, SIMS.concentration],
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
    sims: [SIMS.buildAnAtom, SIMS.ptable],
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
  JL.kineticTheory,
  JL.boilingPoint,
  JL.ionicNaCl,
  JL.covalentBond,
  SIMS.buildAMolecule,
  SIMS.chemCollectiveEnergetics,
  JL.leChatelier,
  JL.alkanes,
  JL.addition,
  JL.ester
];

/** Giant structures for Topic 2 (structure & bonding). */
export const EXTRA_MODELS_3D: ExternalSim[] = [SF.naclLattice, SF.diamond, SF.graphite];

/** Organic molecules for Topic 11. */
export const EXTRA_MOLECULES: Molecule[] = [
  MOL.methane,
  MOL.ethane,
  MOL.propane,
  MOL.butane,
  MOL.ethene,
  MOL.methanol,
  MOL.ethanol,
  MOL.ethanoicAcid,
  MOL.ethylEthanoate
];

/** Every simulation in the catalogue. The Virtual Labs tab and the lesson links both read from it. */
export const LAB_CATALOGUE: ExternalSim[] = [...Object.values(SIMS), ...Object.values(JL), ...Object.values(SF)];
