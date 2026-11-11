// The concept maps of the chapters, written by hand. Each map has the chapter's big idea, its main ideas (one box each, tied to
// the topic that teaches it, with two or three short points) and the links between them, each with the words that join them,
// so the map reads as sentences: "Alkane → cracking → Alkene". Shown by components/ChapterConceptMap.tsx. A chapter without a
// map here keeps the map built from its topics.

export type Bi = { en: string; mn: string };

export interface MapNode {
  id: string;
  topicId: string; // the topic that teaches this idea
  title: Bi;
  points: Bi[];
  alsoTopics?: string[]; // other topics the box belongs to, so it stands out on them too
}

export interface MapLink {
  from: string;
  to: string;
  label: Bi; // the words between the two ideas
}

export interface ChapterMap {
  centre: Bi;
  bigIdea: Bi;
  nodes: MapNode[];
  links: MapLink[];
}

const b = (en: string, mn: string): Bi => ({ en, mn });
const node = (id: string, topicId: string, title: Bi, ...points: Bi[]): MapNode => ({ id, topicId, title, points });
const link = (from: string, to: string, en: string, mn: string): MapLink => ({ from, to, label: b(en, mn) });

export const CONCEPT_MAPS: Record<string, ChapterMap> = {
  // IGCSE 0620 chapter 2
  'ch-atoms-bonding': {
    centre: b('Atoms, elements and bonding', 'Атом, элемент, химийн холбоо'),
    bigIdea: b(
      'How the electrons of atoms are arranged decides how the atoms bond, and the bonding decides the properties of the substance.',
      'Атомын электроны байрлал атомууд хэрхэн холбогдохыг, холбоо нь бодисын шинж чанарыг тодорхойлно.'
    ),
    nodes: [
      node('matter', 's-2-1', b('Elements, compounds, mixtures', 'Элемент, нэгдэл, холимог'),
        b('Element: one kind of atom', 'Элемент: нэг төрлийн атом'),
        b('Compound: elements chemically joined in a fixed ratio', 'Нэгдэл: элементүүд тогтмол харьцаагаар химийн холбоогоор нэгдсэн'),
        b('Mixture: not joined; separated by physical methods', 'Холимог: нэгдээгүй; физик аргаар салгана')),
      node('atom', 's-2-2', b('Structure of the atom', 'Атомын бүтэц'),
        b('Nucleus: protons (+) and neutrons; electrons (−) in shells', 'Цөм: протон (+), нейтрон; электрон (−) давхаргад'),
        b('Proton number Z = protons; mass number A = protons + neutrons', 'Протоны тоо Z = протон; массын тоо A = протон + нейтрон'),
        b('Electronic configuration, e.g. Na 2,8,1', 'Электрон бүтэц, жишээ нь Na 2,8,1')),
      node('isotope', 's-2-3', b('Isotopes', 'Изотоп'),
        b('Same proton number, different numbers of neutrons', 'Протоны тоо ижил, нейтроны тоо өөр'),
        b('Same chemical properties: same outer electrons', 'Химийн шинж ижил: гадна электрон ижил'),
        b('Ar is the average mass from the abundances', 'Ar нь элбэгшлээс олсон дундаж масс')),
      node('ionic', 'top-2-1', b('Ionic bonding', 'Ионы холбоо'),
        b('Metal atom loses electrons → positive ion; non-metal gains → negative ion', 'Металл электрон алдаж эерэг ион, металл бус авч сөрөг ион болно'),
        b('Giant lattice held by strong electrostatic forces', 'Хүчтэй цахилгаан статик хүчээр барьсан аварга тор'),
        b('High melting point; conducts only when molten or dissolved', 'Хайлах цэг өндөр; зөвхөн хайлмал, уусмал үед цахилгаан дамжуулна')),
      node('covalent', 's-2-5', b('Simple molecules', 'Энгийн молекул'),
        b('Non-metal atoms share pairs of electrons', 'Металл бус атомууд электрон хос хуваалцана'),
        b('Weak forces between the molecules', 'Молекулуудын хооронд сул хүч'),
        b('Low melting point; does not conduct', 'Хайлах цэг бага; цахилгаан дамжуулахгүй')),
      node('giant', 's-2-6', b('Giant covalent structures', 'Аварга ковалент бүтэц'),
        b('Diamond: each C has 4 bonds, very hard', 'Алмаз: C бүр 4 холбоотой, маш хатуу'),
        b('Graphite: 3 bonds, layers slide, conducts', 'Графит: 3 холбоо, давхарга гулсана, цахилгаан дамжуулна'),
        b('Silicon(IV) oxide is like diamond', 'Цахиурын(IV) исэл алмаз шиг')),
      node('metallic', 's-2-7', b('Metallic bonding', 'Металл холбоо'),
        b('Positive ions in a sea of delocalised electrons', 'Эерэг ионууд чөлөөт электроны «далай»-д'),
        b('Conducts electricity and heat', 'Цахилгаан, дулаан дамжуулна'),
        b('Malleable and ductile: the layers slide', 'Давтагдах, сунах чадвартай: давхарга гулсана'))
    ],
    links: [
      link('matter', 'atom', 'is made of', 'атомаас бүтнэ'),
      link('atom', 'isotope', 'a different number of neutrons gives', 'нейтроны тоо өөр байвал'),
      link('atom', 'ionic', 'outer electrons are transferred', 'гадна электрон шилжвэл'),
      link('atom', 'covalent', 'outer electrons are shared', 'гадна электрон хуваалцвал'),
      link('covalent', 'giant', 'many atoms bonded in one lattice', 'олон атом нэг торонд холбогдвол'),
      link('atom', 'metallic', 'metal atoms give their outer electrons to a sea', 'металлын гадна электрон чөлөөт болвол')
    ]
  },

  // IGCSE 0620 chapter 3
  'ch-stoichiometry': {
    centre: b('Stoichiometry and the mole', 'Стехиометр ба моль'),
    bigIdea: b(
      'Formulae and balanced equations give the ratio of particles; the mole turns that ratio into masses, gas volumes and concentrations.',
      'Томьёо, тэнцвэржүүлсэн тэгшитгэл бөөмсийн харьцааг өгнө; моль тэр харьцааг масс, хийн эзлэхүүн, концентраци болгоно.'
    ),
    nodes: [
      node('formula', 's-3-1', b('Formulae', 'Томьёо'),
        b('From the charges of the ions, e.g. Al³⁺ and O²⁻ → Al₂O₃', 'Ионы цэнэгээс, жишээ нь Al³⁺, O²⁻ → Al₂O₃'),
        b('Empirical formula: the simplest whole-number ratio', 'Эмпирик томьёо: хамгийн энгийн бүхэл тоон харьцаа')),
      node('equation', 's-3-1', b('Balanced equations', 'Тэнцвэржүүлсэн тэгшитгэл'),
        b('The same number of each atom on both sides: mass is conserved', 'Хоёр талд атом бүр ижил тоотой: масс хадгалагдана'),
        b('State symbols (s), (l), (g), (aq)', 'Төлөвийн тэмдэг (s), (l), (g), (aq)'),
        b('Ionic equations show only the ions that change', 'Ионы тэгшитгэл зөвхөн өөрчлөгдөх ионыг харуулна')),
      node('mr', 's-3-2', b('Relative masses', 'Харьцангуй масс'),
        b('Ar from the Periodic Table; Mr = sum of the Ar values', 'Ar үелэх системээс; Mr = Ar-уудын нийлбэр'),
        b('% by mass = Ar × number of atoms ÷ Mr × 100', 'Массын % = Ar × атомын тоо ÷ Mr × 100')),
      node('mole', 'top-3-1', b('The mole', 'Моль'),
        b('1 mol = 6.02 × 10²³ particles (Avogadro constant)', '1 моль = 6.02 × 10²³ бөөм (Авогадрын тогтмол)'),
        b('moles = mass ÷ Mr', 'моль = масс ÷ Mr')),
      node('gas', 'top-3-1', b('Gas volumes', 'Хийн эзлэхүүн'),
        b('1 mol of any gas fills 24 dm³ at r.t.p.', 'Ямар ч хийн 1 моль r.t.p.-д 24 dm³ эзэлнэ'),
        b('moles = volume (dm³) ÷ 24', 'моль = эзлэхүүн (dm³) ÷ 24')),
      node('conc', 'top-3-1', b('Concentration', 'Концентраци'),
        b('moles = concentration × volume in dm³', 'моль = концентраци × эзлэхүүн (dm³)'),
        b('Units: mol/dm³ or g/dm³', 'Нэгж: mol/dm³ эсвэл g/dm³')),
      node('yield', 'top-3-1', b('Limiting reactant and yield', 'Хязгаарлагч урвалж, гарц'),
        b('The limiting reactant is used up first and sets the amount of product', 'Хязгаарлагч урвалж эхэлж дуусч, бүтээгдэхүүний хэмжээг тогтооно'),
        b('% yield = actual ÷ theoretical × 100', 'Гарцын % = бодит ÷ онолын × 100'))
    ],
    links: [
      link('formula', 'equation', 'are written into', 'тэгшитгэлд бичигдэнэ'),
      link('formula', 'mr', 'gives', 'Mr-ийг олж өгнө'),
      link('mr', 'mole', 'mass ÷ Mr', 'масс ÷ Mr'),
      link('equation', 'mole', 'gives the mole ratio', 'молийн харьцааг өгнө'),
      link('mole', 'gas', '× 24 dm³', '× 24 dm³'),
      link('mole', 'conc', '÷ volume', '÷ эзлэхүүн'),
      link('mole', 'yield', 'finds the limiting reactant and the yield', 'хязгаарлагч урвалж, гарцыг олно')
    ]
  },

  // IGCSE 0620 chapter 4
  'ch-electrochemistry': {
    centre: b('Electrochemistry', 'Электрохими'),
    bigIdea: b(
      'Electricity can drive a reaction (electrolysis), and a reaction can make electricity (a fuel cell).',
      'Цахилгаан урвал явуулж чадна (электролиз), урвал цахилгаан гаргаж чадна (түлшний элемент).'
    ),
    nodes: [
      node('electrolyte', 'top-4-1', b('Electrolyte', 'Электролит'),
        b('An ionic compound, molten or dissolved: its ions are free to move', 'Хайлмал эсвэл уусмал ионы нэгдэл: ионууд нь чөлөөтэй хөдөлнө'),
        b('A solid ionic compound does not conduct', 'Хатуу ионы нэгдэл цахилгаан дамжуулахгүй')),
      node('cathode', 'top-4-1', b('Cathode (−)', 'Катод (−)'),
        b('Positive ions gain electrons: reduction', 'Эерэг ион электрон авна: ангижрал'),
        b('A metal or hydrogen forms, e.g. Pb²⁺ + 2e⁻ → Pb', 'Металл эсвэл устөрөгч үүснэ, жишээ нь Pb²⁺ + 2e⁻ → Pb')),
      node('anode', 'top-4-1', b('Anode (+)', 'Анод (+)'),
        b('Negative ions lose electrons: oxidation', 'Сөрөг ион электрон алдана: исэлдэл'),
        b('A non-metal forms, e.g. 2Br⁻ → Br₂ + 2e⁻', 'Металл бус үүснэ, жишээ нь 2Br⁻ → Br₂ + 2e⁻')),
      node('aqueous', 'top-4-1', b('Aqueous solutions', 'Усан уусмал'),
        b('Cathode: a metal less reactive than hydrogen forms; otherwise hydrogen', 'Катод: устөрөгчөөс идэвх муу металл үүснэ, үгүй бол устөрөгч'),
        b('Anode: a concentrated halide gives the halogen; otherwise oxygen', 'Анод: өтгөн галидаас галоген, үгүй бол хүчилтөрөгч')),
      node('uses', 'top-4-1', b('Uses', 'Хэрэглээ'),
        b('Electroplating: the object to coat is the cathode', 'Бүрэх: бүрэх эд нь катод'),
        b('Brine gives chlorine, hydrogen and sodium hydroxide', 'Давсны уусмалаас хлор, устөрөгч, натрийн гидроксид гарна')),
      node('fuel', 's-4-2', b('Hydrogen–oxygen fuel cell', 'Устөрөгч–хүчилтөрөгчийн түлшний элемент'),
        b('Hydrogen + oxygen → water, giving electricity', 'Устөрөгч + хүчилтөрөгч → ус, цахилгаан гарна'),
        b('Only water is made, but hydrogen is hard to store', 'Зөвхөн ус гарна, гэхдээ устөрөгчийг хадгалахад хэцүү'))
    ],
    links: [
      link('electrolyte', 'cathode', 'positive ions move to', 'эерэг ионууд очно'),
      link('electrolyte', 'anode', 'negative ions move to', 'сөрөг ионууд очно'),
      link('electrolyte', 'aqueous', 'dissolved in water, H⁺ and OH⁻ also compete', 'усанд уусвал H⁺, OH⁻ мөн өрсөлдөнө'),
      link('cathode', 'uses', 'the metal coats the object in', 'металл эдийг бүрнэ'),
      link('electrolyte', 'fuel', 'the other way round: a reaction gives electricity in', 'эсрэгээрээ: урвалаас цахилгаан гаргавал')
    ]
  },

  // IGCSE 0620 chapter 5
  'ch-energetics': {
    centre: b('Chemical energetics', 'Химийн энергетик'),
    bigIdea: b(
      'Breaking bonds takes in energy and making bonds gives it out; the difference decides whether a reaction is exothermic or endothermic.',
      'Холбоо задлахад энерги шингэж, холбоо үүсэхэд ялгарна; зөрүү нь урвал экзотерм эсвэл эндотерм болохыг тодорхойлно.'
    ),
    nodes: [
      node('bonds', 's-5-1', b('Bond energies', 'Холбооны энерги'),
        b('Breaking bonds: endothermic; making bonds: exothermic', 'Холбоо задлах: эндотерм; холбоо үүсгэх: экзотерм'),
        b('ΔH = energy to break bonds − energy from making bonds', 'ΔH = задлахад шаардсан − үүсэхэд ялгарсан энерги')),
      node('exo', 's-5-1', b('Exothermic', 'Экзотерм'),
        b('Gives out heat: the surroundings get warmer', 'Дулаан ялгаруулна: орчин дулаарна'),
        b('ΔH negative, e.g. combustion, neutralisation', 'ΔH сөрөг, жишээ нь шаталт, саармагжил')),
      node('endo', 's-5-1', b('Endothermic', 'Эндотерм'),
        b('Takes in heat: the surroundings get colder', 'Дулаан шингээнэ: орчин хүйтэрнэ'),
        b('ΔH positive, e.g. thermal decomposition, photosynthesis', 'ΔH эерэг, жишээ нь дулааны задрал, фотосинтез')),
      node('diagram', 's-5-1', b('Energy level diagram', 'Энергийн түвшний диаграм'),
        b('Products below the reactants: exothermic', 'Бүтээгдэхүүн урвалжаас доор: экзотерм'),
        b('Products above the reactants: endothermic', 'Бүтээгдэхүүн урвалжаас дээр: эндотерм')),
      node('ea', 's-5-1', b('Activation energy', 'Идэвхжүүлэх энерги'),
        b('The least energy colliding particles need to react', 'Мөргөлдсөн бөөмс урвалд ороход шаардлагатай хамгийн бага энерги'),
        b('The hump on the diagram; a catalyst lowers it', 'Диаграмын овгор; катализатор үүнийг бууруулна'))
    ],
    links: [
      link('bonds', 'exo', 'more energy out from making bonds', 'үүсэхэд илүү энерги ялгарвал'),
      link('bonds', 'endo', 'more energy in to break bonds', 'задлахад илүү энерги шаардвал'),
      link('exo', 'diagram', 'is drawn on', 'диаграм дээр зурагдана'),
      link('endo', 'diagram', 'is drawn on', 'диаграм дээр зурагдана'),
      link('diagram', 'ea', 'the hump at the top is', 'оройн овгор нь')
    ]
  },

  // IGCSE 0620 chapter 6
  'ch-reactions': {
    centre: b('Chemical reactions', 'Химийн урвал'),
    bigIdea: b(
      'A reaction makes new substances. How fast it goes depends on collisions; some reactions go both ways; many move electrons or oxygen (redox).',
      'Урвал шинэ бодис үүсгэнэ. Хурд нь мөргөлдөөнөөс хамаарна; зарим урвал хоёр тийш явагдана; олонх нь электрон эсвэл хүчилтөрөгч шилжүүлнэ (исэлдэл-ангижрал).'
    ),
    nodes: [
      node('change', 's-6-1', b('Physical and chemical change', 'Физик ба химийн өөрчлөлт'),
        b('Physical: no new substance, easily reversed (melting)', 'Физик: шинэ бодис үүсэхгүй, амархан буцна (хайлах)'),
        b('Chemical: a new substance; signs: gas, colour, heat', 'Химийн: шинэ бодис; шинж: хий, өнгө, дулаан')),
      node('rate', 'top-8-1', b('Rate of reaction', 'Урвалын хурд'),
        b('Followed by gas volume or mass lost against time', 'Хийн эзлэхүүн эсвэл алдсан массыг хугацаагаар хэмжинэ'),
        b('Fastest at the start; slows as the reactants are used up', 'Эхэндээ хамгийн хурдан; урвалж дуусах тусам удааширна')),
      node('collision', 'top-8-1', b('Collision theory', 'Мөргөлдөлтийн онол'),
        b('Particles must collide with at least the activation energy', 'Бөөмс дор хаяж идэвхжүүлэх энергитэй мөргөлдөх ёстой'),
        b('More successful collisions each second → faster', 'Секунд бүрт амжилттай мөргөлдөөн олон → хурдан')),
      node('factors', 'top-8-1', b('What speeds a reaction up', 'Урвалыг юу хурдасгадаг вэ'),
        b('Higher temperature, concentration or pressure; smaller pieces', 'Өндөр температур, концентраци, даралт; жижиг хэсэг'),
        b('A catalyst lowers the activation energy and is not used up', 'Катализатор идэвхжүүлэх энергийг бууруулж, өөрөө зарцуулагдахгүй')),
      node('equilibrium', 's-6-3', b('Reversible reactions and equilibrium', 'Эргэх урвал, тэнцвэр'),
        b('⇌: forward and back at the same rate in a closed system', '⇌: битүү системд шууд, урвуу урвал ижил хурдтай'),
        b('Changing the conditions moves the position (Haber process)', 'Нөхцөл өөрчлөхөд тэнцвэр шилжинэ (Хаберийн процесс)')),
      node('redox', 's-6-4', b('Redox', 'Исэлдэл-ангижрал'),
        b('Oxidation: gain of oxygen, loss of electrons, oxidation number up', 'Исэлдэл: хүчилтөрөгч авах, электрон алдах, исэлдлийн зэрэг өсөх'),
        b('Reduction is the opposite; the two happen together', 'Ангижрал эсрэг нь; хоёулаа хамт явагдана'))
    ],
    links: [
      link('change', 'rate', 'how fast it happens is the', 'хэр хурдан явагдах нь'),
      link('rate', 'collision', 'is explained by', 'тайлбарлагдана'),
      link('collision', 'factors', 'more collisions come from', 'мөргөлдөөнийг нэмэгдүүлэх нь'),
      link('change', 'equilibrium', 'some go both ways', 'зарим нь хоёр тийш явагдана'),
      link('factors', 'equilibrium', 'the same conditions also move', 'ижил нөхцөл тэнцвэрийг ч шилжүүлнэ'),
      link('change', 'redox', 'many move electrons:', 'олонх нь электрон шилжүүлнэ:')
    ]
  },

  // IGCSE 0620 chapter 7
  'ch-acids-bases': {
    centre: b('Acids, bases and salts', 'Хүчил, суурь, давс'),
    bigIdea: b(
      'Acids give H⁺ ions and alkalis give OH⁻ ions; they neutralise each other to make salts, and how a salt is made depends on whether it dissolves.',
      'Хүчил H⁺ ион, шүлт OH⁻ ион өгнө; тэд бие биеэ саармагжуулж давс үүсгэнэ; давс гаргах арга нь уусдаг эсэхээс хамаарна.'
    ),
    nodes: [
      node('acid', 's-7-1', b('Acids', 'Хүчил'),
        b('Give H⁺ ions in water; pH below 7', 'Усанд H⁺ ион өгнө; pH 7-оос бага'),
        b('With metals → hydrogen; with carbonates → carbon dioxide', 'Металлтай → устөрөгч; карбонаттай → нүүрсхүчлийн хий'),
        b('Strong acids ionise fully, weak acids partly', 'Хүчтэй хүчил бүрэн, сул хүчил хэсэгчлэн ионждог')),
      node('base', 's-7-1', b('Bases and alkalis', 'Суурь ба шүлт'),
        b('A base reacts with an acid to give a salt and water', 'Суурь хүчилтэй урвалд орж давс, ус өгнө'),
        b('An alkali is a soluble base: OH⁻ ions, pH above 7', 'Шүлт нь уусдаг суурь: OH⁻ ион, pH 7-оос их')),
      node('ph', 's-7-1', b('pH and indicators', 'pH ба индикатор'),
        b('pH 1–14; 7 is neutral', 'pH 1–14; 7 саармаг'),
        b('Universal indicator, litmus, methyl orange, thymolphthalein', 'Универсал индикатор, лакмус, метил улбар шар, тимолфталейн')),
      node('neutral', 's-7-1', b('Neutralisation', 'Саармагжил'),
        b('H⁺ + OH⁻ → H₂O', 'H⁺ + OH⁻ → H₂O'),
        b('acid + base → salt + water', 'хүчил + суурь → давс + ус')),
      node('oxide', 's-7-2', b('Oxides', 'Исэл'),
        b('Metal oxides are basic; non-metal oxides are acidic', 'Металлын исэл суурилаг; металл бусын исэл хүчиллэг'),
        b('Amphoteric oxides (Al₂O₃, ZnO) react with both', 'Амфотер исэл (Al₂O₃, ZnO) хоёулантай урвалд орно')),
      node('salt', 'top-7-1', b('Making salts', 'Давс гаргах'),
        b('Soluble salt: acid + excess insoluble base, filter, crystallise', 'Уусдаг давс: хүчил + илүүдэл уусдаггүй суурь, шүүх, талстжуулах'),
        b('Soluble salt from an alkali: titration', 'Шүлтээс уусдаг давс: титрлэлт'),
        b('Insoluble salt: precipitation, filter, wash, dry', 'Уусдаггүй давс: тунадасжуулах, шүүх, угаах, хатаах'))
    ],
    links: [
      link('acid', 'ph', 'is measured with', 'хэмжигдэнэ'),
      link('base', 'ph', 'is measured with', 'хэмжигдэнэ'),
      link('acid', 'neutral', 'reacts with a base in', 'суурьтай урвалд орно'),
      link('base', 'neutral', 'reacts with an acid in', 'хүчилтэй урвалд орно'),
      link('neutral', 'salt', 'is used for', 'ашиглагдана'),
      link('oxide', 'base', 'metal oxides are', 'металлын исэл нь'),
      link('oxide', 'acid', 'non-metal oxides give', 'металл бусын исэл үүсгэнэ')
    ]
  },

  // IGCSE 0620 chapter 8
  'ch-periodic-table': {
    centre: b('The Periodic Table', 'Үелэх систем'),
    bigIdea: b(
      'Elements are in order of proton number. Elements in a group have the same number of outer electrons, so they react alike, with a trend down the group.',
      'Элементүүд протоны тоогоор эрэмбэлэгдэнэ. Нэг бүлгийн элементүүд гадна электроны тоо ижил тул адилхан урвалд орж, бүлгээр доошлох тусам хандлагатай өөрчлөгдөнө.'
    ),
    nodes: [
      node('arrangement', 's-8-1', b('How the table is arranged', 'Хүснэгтийн бүтэц'),
        b('Group = number of outer electrons; period = number of shells', 'Бүлэг = гадна электроны тоо; үе = давхаргын тоо'),
        b('Metals on the left, non-metals on the right', 'Металл зүүн талд, металл бус баруун талд')),
      node('g1', 's-8-2', b('Group I: alkali metals', 'I бүлэг: шүлтлэг металл'),
        b('Soft; react with water → hydroxide + hydrogen', 'Зөөлөн; устай → гидроксид + устөрөгч'),
        b('More reactive down the group: the outer electron is lost more easily', 'Доошлох тусам идэвхтэй: гадна электрон амархан алдагдана')),
      node('g7', 's-8-3', b('Group VII: halogens', 'VII бүлэг: галоген'),
        b('Diatomic; darker down: Cl₂ green, Br₂ red-brown, I₂ grey-black', 'Хоёр атомт; доошлох тусам бараан: Cl₂ ногоон, Br₂ улаан хүрэн, I₂ саарал хар'),
        b('Less reactive down; a more reactive halogen displaces a less reactive halide', 'Доошлох тусам идэвх буурна; идэвхтэй галоген идэвх муутай галидыг түлхэн гаргана')),
      node('transition', 's-8-4', b('Transition elements', 'Шилжилтийн элемент'),
        b('High density and melting point', 'Нягт, хайлах цэг өндөр'),
        b('Coloured compounds, variable oxidation numbers, catalysts (Fe, Ni)', 'Өнгөт нэгдэл, хувьсах исэлдлийн зэрэг, катализатор (Fe, Ni)')),
      node('noble', 's-8-5', b('Group VIII: noble gases', 'VIII бүлэг: инертийн хий'),
        b('Full outer shell: unreactive and monatomic', 'Гадна давхарга дүүрэн: идэвхгүй, нэг атомт'),
        b('Uses: argon in lamps, helium in balloons', 'Хэрэглээ: аргон чийдэнд, гели бөмбөлөгт'))
    ],
    links: [
      link('arrangement', 'g1', 'one outer electron:', 'гадна 1 электрон:'),
      link('arrangement', 'g7', 'seven outer electrons:', 'гадна 7 электрон:'),
      link('arrangement', 'transition', 'the block between Groups II and III:', 'II, III бүлгийн хоорондох хэсэг:'),
      link('arrangement', 'noble', 'a full outer shell:', 'гадна давхарга дүүрэн:'),
      link('g1', 'g7', 'react together to make salts such as NaCl with', 'урвалд орж NaCl зэрэг давс үүсгэнэ')
    ]
  },

  // IGCSE 0620 chapter 9
  'ch-metals': {
    centre: b('Metals', 'Металл'),
    bigIdea: b(
      'A metal’s reactivity decides how it reacts, how it corrodes and how it is extracted; its properties and alloys decide its uses.',
      'Металлын идэвх нь хэрхэн урвалд орох, зэврэх, олборлогдохыг; шинж чанар, хайлш нь хэрэглээг нь тодорхойлно.'
    ),
    nodes: [
      node('props', 's-9-1', b('Properties of metals', 'Металлын шинж чанар'),
        b('Conduct heat and electricity; malleable, ductile; high melting points', 'Дулаан, цахилгаан дамжуулна; давтагдана, сунана; хайлах цэг өндөр'),
        b('React with acids (→ hydrogen) and oxygen (→ oxides)', 'Хүчилтэй (→ устөрөгч), хүчилтөрөгчтэй (→ исэл) урвалд орно')),
      node('uses', 's-9-2', b('Uses of metals', 'Металлын хэрэглээ'),
        b('Aluminium: light and resists corrosion → aircraft, food containers', 'Хөнгөн цагаан: хөнгөн, зэврэхгүй → онгоц, хүнсний сав'),
        b('Copper: conducts and is ductile → electrical wires', 'Зэс: цахилгаан дамжуулж, сунана → утас')),
      node('alloys', 's-9-3', b('Alloys', 'Хайлш'),
        b('A metal mixed with other elements, e.g. brass, stainless steel', 'Металлыг өөр элементтэй хольсон, жишээ нь гууль, зэвэрдэггүй ган'),
        b('Harder: atoms of different sizes stop the layers sliding', 'Илүү хатуу: өөр хэмжээтэй атомууд давхаргыг гулсуулахгүй')),
      node('series', 's-9-4', b('Reactivity series', 'Идэвхийн цуврал'),
        b('K Na Ca Mg Al (C) Zn Fe (H) Cu Ag Au', 'K Na Ca Mg Al (C) Zn Fe (H) Cu Ag Au'),
        b('A more reactive metal displaces a less reactive one from its compounds', 'Идэвхтэй металл идэвх муутай металлыг нэгдлээс нь түлхэн гаргана')),
      node('corrosion', 's-9-5', b('Rusting', 'Зэврэлт'),
        b('Iron needs both water and oxygen to rust', 'Төмөр зэврэхэд ус, хүчилтөрөгч хоёулаа хэрэгтэй'),
        b('Prevented by a barrier, galvanising, or sacrificial protection', 'Бүрхүүл, цайржуулалт, хамгаалагч металлаар сэргийлнэ')),
      node('extraction', 's-9-6', b('Extraction', 'Олборлолт'),
        b('Less reactive than carbon: reduced by carbon (iron in the blast furnace)', 'Нүүрстөрөгчөөс идэвх муу: нүүрстөрөгчөөр ангижруулна (төмөр, домен зуух)'),
        b('More reactive than carbon: electrolysis (aluminium from bauxite with cryolite)', 'Нүүрстөрөгчөөс идэвхтэй: электролиз (боксит, криолитоос хөнгөн цагаан)'))
    ],
    links: [
      link('props', 'uses', 'decide the', 'хэрэглээг тодорхойлно'),
      link('alloys', 'uses', 'improve the', 'хэрэглээг сайжруулна'),
      link('props', 'series', 'how vigorously they react gives the', 'хэр идэвхтэй урвалд ордог нь'),
      link('series', 'corrosion', 'a more reactive metal protects iron from', 'идэвхтэй металл төмрийг хамгаална'),
      link('series', 'extraction', 'decides the method of', 'аргыг нь тодорхойлно')
    ]
  },

  // IGCSE 0620 chapter 10
  'ch-environment': {
    centre: b('Chemistry of the environment', 'Байгаль орчны хими'),
    bigIdea: b(
      'Clean water, fertilisers and clean air all depend on chemistry, and so do the problems of pollution and climate change.',
      'Цэвэр ус, бордоо, цэвэр агаар бүгд химиэс хамаарна; бохирдол, уур амьсгалын өөрчлөлтийн асуудал ч мөн адил.'
    ),
    nodes: [
      node('water', 's-10-1', b('Water', 'Ус'),
        b('Tests: anhydrous copper(II) sulfate turns blue; cobalt(II) chloride turns pink', 'Сорил: усгүй зэсийн(II) сульфат цэнхэр, кобальтын(II) хлорид ягаан болно'),
        b('Pure water boils at 100 °C and melts at 0 °C', 'Цэвэр ус 100 °C-д буцалж, 0 °C-д хайлна'),
        b('Treatment: filtration, carbon (tastes), chlorination (bacteria)', 'Цэвэрлэгээ: шүүлт, нүүрс (амт, үнэр), хлоржуулалт (бактери)')),
      node('fert', 's-10-2', b('Fertilisers', 'Бордоо'),
        b('NPK: nitrogen, phosphorus and potassium for plant growth', 'NPK: ургамлын өсөлтөд азот, фосфор, кали'),
        b('Ammonium salts and nitrates', 'Аммонийн давс, нитрат')),
      node('haber', 's-10-2', b('Haber process', 'Хаберийн процесс'),
        b('N₂ + 3H₂ ⇌ 2NH₃', 'N₂ + 3H₂ ⇌ 2NH₃'),
        b('450 °C, 200 atm, iron catalyst', '450 °C, 200 atm, төмрийн катализатор')),
      node('air', 's-10-3', b('Air and its pollutants', 'Агаар ба бохирдуулагч'),
        b('Clean dry air: about 78% nitrogen, 21% oxygen', 'Цэвэр хуурай агаар: 78% орчим азот, 21% хүчилтөрөгч'),
        b('CO (incomplete combustion), SO₂ and NOx (acid rain), particulates', 'CO (бүрэн бус шаталт), SO₂, NOx (хүчиллэг бороо), тоосонцор'),
        b('Catalytic converters change CO and NOx into CO₂ and N₂', 'Катализат хувиргагч CO, NOx-ийг CO₂, N₂ болгоно')),
      node('climate', 's-10-3', b('Greenhouse effect and climate change', 'Хүлэмжийн нөлөө, уур амьсгалын өөрчлөлт'),
        b('CO₂ and methane absorb the heat given off by the Earth', 'CO₂, метан Дэлхийн ялгаруулсан дулааныг шингээнэ'),
        b('More of them → global warming → climate change', 'Ихсэх тусам → дэлхийн дулаарал → уур амьсгалын өөрчлөлт'),
        b('Less: renewable energy, fewer fossil fuels, more trees', 'Бууруулах: сэргээгдэх эрчим хүч, чулуужсан түлш бага, мод их'))
    ],
    links: [
      link('haber', 'fert', 'makes the ammonia for', 'аммиак гаргаж өгнө'),
      link('fert', 'water', 'washed into rivers, makes algae grow in', 'гол руу урсаж замаг ихэсгэнэ'),
      link('air', 'climate', 'carbon dioxide and methane cause', 'CO₂, метан үүсгэнэ'),
      link('air', 'water', 'SO₂ and NOx dissolve in rain and fall into', 'SO₂, NOx бороонд уусч орно')
    ]
  },

  // IGCSE 0620 chapter 11
  'ch-organic': {
    centre: b('Organic chemistry', 'Органик хими'),
    bigIdea: b(
      'Carbon compounds come in families (homologous series) that share a functional group, and one family can be made into the next.',
      'Нүүрстөрөгчийн нэгдлүүд ижил функциональ бүлэгтэй гэр бүл (ижил төст цуврал)-д хуваагдана; нэг гэр бүлээс нөгөөг гаргаж болно.'
    ),
    nodes: [
      {
        ...node('families', 's-11-1', b('Homologous series and names', 'Ижил төст цуврал, нэршил'),
          b('Same general formula and functional group, similar reactions', 'Ерөнхий томьёо, функциональ бүлэг ижил, урвал төстэй'),
          b('Names: meth-, eth-, prop-, but- with -ane, -ene, -ol, -oic acid', 'Нэр: meth-, eth-, prop-, but- + -ane, -ene, -ol, -oic acid')),
        alsoTopics: ['s-11-2']
      },
      node('crude', 's-11-3', b('Crude oil and fuels', 'Газрын тос ба түлш'),
        b('Fractional distillation separates it by boiling point', 'Фракцын нэрэлтээр буцлах цэгээр нь салгана'),
        b('Complete combustion → CO₂ + H₂O; incomplete → toxic CO', 'Бүрэн шаталт → CO₂ + H₂O; бүрэн бус → хортой CO')),
      node('alkane', 's-11-4', b('Alkanes', 'Алкан'),
        b('CₙH₂ₙ₊₂, single bonds only: saturated', 'CₙH₂ₙ₊₂, зөвхөн дан холбоо: ханасан'),
        b('Unreactive apart from burning; substitution with Cl₂ in UV light', 'Шатахаас бусдаар идэвх муу; хэт ягаан гэрэлд Cl₂-оор орлуулалт')),
      node('alkene', 's-11-5', b('Alkenes', 'Алкен'),
        b('CₙH₂ₙ with a C=C double bond: unsaturated', 'CₙH₂ₙ, C=C давхар холбоотой: ханаагүй'),
        b('Bromine water turns from orange to colourless', 'Бромын ус улбар шараас өнгөгүй болно'),
        b('Addition of hydrogen, steam or bromine', 'Устөрөгч, уур, бром нэгдэнэ')),
      node('alcohol', 's-11-6', b('Alcohols', 'Спирт'),
        b('The –OH group, e.g. ethanol', '–OH бүлэг, жишээ нь этанол'),
        b('Made by fermentation of sugar, or from ethene and steam', 'Чихрийн исгэлтээр эсвэл этен, уураас гаргана'),
        b('Used as a fuel and a solvent', 'Түлш, уусгагч болгон хэрэглэнэ')),
      node('acid', 's-11-7', b('Carboxylic acids', 'Карбоксилын хүчил'),
        b('The –COOH group; weak acids', '–COOH бүлэг; сул хүчил'),
        b('React with metals, bases and carbonates', 'Металл, суурь, карбонаттай урвалд орно'),
        b('With an alcohol → an ester (fruity smell)', 'Спирттэй → эфир (жимсний үнэр)')),
      node('polymer', 's-11-8', b('Polymers', 'Полимер'),
        b('Addition: many alkene monomers join, e.g. poly(ethene)', 'Нэгдэх: олон алкен мономер нэгдэнэ, жишээ нь поли(этен)'),
        b('Condensation: nylon, PET and proteins; water is given off', 'Конденсац: нейлон, PET, уураг; ус ялгарна'),
        b('Most plastics are non-biodegradable', 'Ихэнх хуванцар биологийн аргаар задардаггүй'))
    ],
    links: [
      link('families', 'alkane', 'the simplest series:', 'хамгийн энгийн цуврал:'),
      link('crude', 'alkane', 'its fractions are mostly', 'фракцууд нь голчлон'),
      link('alkane', 'alkene', 'cracking', 'крекинг'),
      link('alkene', 'alcohol', '+ steam and a catalyst', '+ уур, катализатор'),
      link('alcohol', 'acid', 'oxidation', 'исэлдэлт'),
      link('alkene', 'polymer', 'addition polymerisation', 'нэгдэх полимержилт')
    ]
  },

  // IGCSE 0620 chapter 12
  'ch-experimental-analysis': {
    centre: b('Experimental techniques and analysis', 'Туршилтын арга, шинжилгээ'),
    bigIdea: b(
      'Choose the right apparatus to measure, the right method to separate and purify, and the right test to find out what is there.',
      'Хэмжихэд зөв багаж, салгаж цэвэршүүлэхэд зөв арга, юу байгааг олоход зөв сорил сонгоно.'
    ),
    nodes: [
      node('design', 's-12-1', b('Measuring', 'Хэмжилт'),
        b('Volume: burette, pipette, measuring cylinder, gas syringe', 'Эзлэхүүн: бюретка, пипетка, хэмжүүрийн цилиндр, хийн тариур'),
        b('Mass: balance; time: stopwatch; temperature: thermometer', 'Масс: жин; хугацаа: секундомер; температур: термометр'),
        b('Change one variable, measure one, keep the rest the same', 'Нэг хувьсагчийг өөрчилж, нэгийг хэмжиж, бусдыг тогтмол барина')),
      node('titration', 's-12-2', b('Titration', 'Титрлэлт'),
        b('A burette adds acid to alkali with an indicator to the end-point', 'Бюреткаар хүчлийг шүлтэнд индикатортай нь төгсгөлийн цэг хүртэл нэмнэ'),
        b('Repeat until two titres agree within 0.10 cm³', 'Хоёр титр 0.10 cm³ дотор тохиртол давтана')),
      node('chroma', 'top-21-1', b('Chromatography', 'Хроматограф'),
        b('Pencil start line above the solvent', 'Харандаагаар татсан эхлэлийн шугам уусгагчаас дээр'),
        b('A pure substance gives one spot', 'Цэвэр бодис нэг толбо өгнө'),
        b('Rf = distance of the spot ÷ distance of the solvent front', 'Rf = толбоны зай ÷ уусгагчийн захын зай')),
      node('separation', 's-12-4', b('Separation and purity', 'Салгах, цэвэршүүлэх'),
        b('Filtration: insoluble solid; crystallisation: dissolved solid', 'Шүүлт: уусдаггүй хатуу; талстжуулалт: ууссан хатуу'),
        b('Distillation: liquids; fractional distillation: liquids that mix', 'Нэрэлт: шингэн; фракцын нэрэлт: холилддог шингэн'),
        b('A pure substance has a sharp melting and boiling point', 'Цэвэр бодис тодорхой хайлах, буцлах цэгтэй')),
      node('tests', 'top-12-1', b('Identifying ions and gases', 'Ион, хий таних'),
        b('Cations: NaOH or NH₃ precipitate colours; flame tests', 'Катион: NaOH, NH₃-тай тунадасны өнгө; дөлний сорил'),
        b('Anions: Ag⁺ (halides), Ba²⁺ (sulfate), acid (carbonate)', 'Анион: Ag⁺ (галид), Ba²⁺ (сульфат), хүчил (карбонат)'),
        b('Gases: H₂ pops, O₂ relights a splint, CO₂ turns limewater milky', 'Хий: H₂ пүнхийнэ, O₂ цогтой модыг асаана, CO₂ шохойн усыг цайруулна'))
    ],
    links: [
      link('design', 'titration', 'exact volumes are needed in', 'нарийн эзлэхүүн хэрэгтэй'),
      link('design', 'chroma', 'measuring the distances gives Rf in', 'зайг хэмжиж Rf олно'),
      link('chroma', 'separation', 'also separates mixtures and checks purity, like', 'мөн холимог салгаж, цэвэршлийг шалгана'),
      link('separation', 'tests', 'then find what is there with', 'дараа нь юу байгааг олно')
    ]
  }
};
