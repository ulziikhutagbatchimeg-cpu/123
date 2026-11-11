import { b, link, node, type ChapterMap } from './conceptMapBuild';

// The concept maps of the AS Level 9701 chapters (1–22), written by hand from the syllabus content of each topic. Shown by
// components/ChapterConceptMap.tsx through CONCEPT_MAPS in conceptMaps.ts.

export const CONCEPT_MAPS_AS: Record<string, ChapterMap> = {
  'al-ch-1': {
    centre: b('Atomic structure', 'Атомын бүтэц'),
    bigIdea: b(
      'An atom is a tiny, dense nucleus with electrons in shells, sub-shells and orbitals; how strongly the nucleus holds the outer electrons explains atomic radius and ionisation energy.',
      'Атом нь жижиг, нягт цөм ба давхарга, дэд давхарга, орбитальд байрласан электроноос тогтоно; цөм гадна электроноо хэр хүчтэй татдаг нь атомын радиус, ионжуулах энергийг тайлбарлана.'
    ),
    nodes: [
      node('particles', 'al-1.1', b('Protons, neutrons, electrons', 'Протон, нейтрон, электрон'),
        b('Relative masses 1, 1, 1/1836; relative charges +1, 0, −1', 'Харьцангуй масс 1, 1, 1/1836; харьцангуй цэнэ +1, 0, −1'),
        b('In an electric field: protons bend to −, electrons bend more to +, neutrons go straight', 'Цахилгаан оронд: протон − тийш, электрон + тийш илүү хазайна, нейтрон шулуун явна'),
        b('Atomic radius falls across a period and rises down a group', 'Атомын радиус үеэр буурч, бүлгээр доошлох тусам өснө')),
      node('isotopes', 'al-1.2', b('Isotopes', 'Изотоп'),
        b('Same proton number, different numbers of neutrons', 'Протоны тоо ижил, нейтроны тоо өөр'),
        b('Same chemical properties (same electrons); different mass and density', 'Химийн шинж ижил (электрон ижил); масс, нягт өөр')),
      node('orbitals', 'al-1.3', b('Shells, sub-shells and orbitals', 'Давхарга, дэд давхарга, орбиталь'),
        b('s has 1 orbital, p 3, d 5; each holds 2 electrons of opposite spin', 's 1, p 3, d 5 орбитальтай; тус бүр эсрэг спинтэй 2 электрон'),
        b('Filling order 1s 2s 2p 3s 3p 4s 3d', 'Дүүргэх дараалал 1s 2s 2p 3s 3p 4s 3d'),
        b('Cr is 3d⁵4s¹ and Cu is 3d¹⁰4s¹', 'Cr 3d⁵4s¹, Cu 3d¹⁰4s¹')),
      node('ie', 'al-1.4', b('Ionisation energy', 'Ионжуулах энерги'),
        b('First IE: X(g) → X⁺(g) + e⁻, for one mole', 'Эхний ИЭ: X(g) → X⁺(g) + e⁻, нэг моль'),
        b('Depends on nuclear charge, distance and shielding', 'Цөмийн цэнэ, зай, хаалтаас хамаарна'),
        b('A big jump in successive IEs shows a new shell, so the group', 'Дараалсан ИЭ-ийн огцом өсөлт шинэ давхаргыг, улмаар бүлгийг заана')),
      node('trends', 'al-1.4', b('Trends in first ionisation energy', 'Эхний ИЭ-ийн хандлага'),
        b('Rises across a period; falls down a group', 'Үеэр өсч, бүлгээр буурна'),
        b('Dips at Mg → Al (3p is higher in energy) and P → S (spin-pair repulsion)', 'Mg → Al (3p өндөр энергитэй), P → S (спин хосын түлхэлт)-д буурна'))
    ],
    links: [
      link('particles', 'isotopes', 'a different number of neutrons gives', 'нейтроны тоо өөр байвал'),
      link('particles', 'orbitals', 'the electrons are arranged in', 'электронууд байрлана'),
      link('orbitals', 'ie', 'how firmly the outer electron is held gives', 'гадна электроныг хэр хүчтэй барих нь'),
      link('ie', 'trends', 'across a period and down a group shows', 'үе, бүлгээр харьцуулбал'),
      link('orbitals', 'trends', 'sub-shells and electron pairing explain the dips in', 'дэд давхарга, хосжилт буурлыг тайлбарлана')
    ]
  },

  'al-ch-2': {
    centre: b('Atoms, molecules and stoichiometry', 'Атом, молекул, стехиометр'),
    bigIdea: b(
      'The mole links the number of particles to mass, gas volume and concentration, so a balanced equation gives the amounts in grams, dm³ and mol/dm³.',
      'Моль бөөмсийн тоог масс, хийн эзлэхүүн, концентрацитай холбоно; тэнцвэржүүлсэн тэгшитгэл хэмжээг грамм, dm³, mol/dm³-ээр өгнө.'
    ),
    nodes: [
      node('masses', 'al-2.1', b('Relative masses', 'Харьцангуй масс'),
        b('Ar and Mr are relative to 1/12 of the mass of a carbon-12 atom', 'Ar, Mr нь нүүрстөрөгч-12 атомын массын 1/12-тэй харьцуулсан'),
        b('Ar from the isotope abundances of a mass spectrum', 'Ar-ийг масс спектрийн изотопын элбэгшлээс олно')),
      node('mole', 'al-2.2', b('The mole', 'Моль'),
        b('1 mol = 6.02 × 10²³ particles (the Avogadro constant, L)', '1 моль = 6.02 × 10²³ бөөм (Авогадрын тогтмол, L)'),
        b('n = m ÷ M', 'n = m ÷ M')),
      node('formulas', 'al-2.3', b('Formulas', 'Томьёо'),
        b('Empirical and molecular formulas from % composition', '%-ийн найрлагаас эмпирик, молекулын томьёо'),
        b('Ionic formulas from the charges, e.g. SO₄²⁻, NO₃⁻, CO₃²⁻; water of crystallisation', 'Ионы цэнэгээс томьёо, жишээ нь SO₄²⁻, NO₃⁻, CO₃²⁻; талстжилтын ус')),
      node('equations', 'al-2.3', b('Equations', 'Тэгшитгэл'),
        b('Balanced full and ionic equations with state symbols', 'Төлөвийн тэмдэгтэй, тэнцвэржүүлсэн бүтэн ба ионы тэгшитгэл')),
      node('reacting', 'al-2.4', b('Reacting masses and volumes', 'Урвалд орох масс, эзлэхүүн'),
        b('Gas: n = V ÷ 24.0 dm³ at r.t.p.', 'Хий: r.t.p.-д n = V ÷ 24.0 dm³'),
        b('Solution: n = c × V (in dm³)', 'Уусмал: n = c × V (dm³-ээр)'),
        b('Limiting reagent, percentage yield, titration results', 'Хязгаарлагч урвалж, гарцын хувь, титрлэлтийн үр дүн'))
    ],
    links: [
      link('masses', 'mole', 'the molar mass in g/mol is Mr, used in', 'моль масс (g/mol) нь Mr'),
      link('formulas', 'equations', 'are written into', 'тэгшитгэлд бичигдэнэ'),
      link('equations', 'reacting', 'give the mole ratio for', 'молийн харьцааг өгнө'),
      link('mole', 'reacting', 'turns into mass, gas volume and concentration in', 'масс, хийн эзлэхүүн, концентраци болно')
    ]
  },

  'al-ch-3': {
    centre: b('Chemical bonding', 'Химийн холбоо'),
    bigIdea: b(
      'Electronegativity decides whether electrons are transferred or shared, equally or not; the electron pairs around an atom decide the shape, and shape and polarity decide the forces between molecules.',
      'Цахилгаан сөрөг чанар электрон шилжих эсвэл хуваалцах, тэгш эсвэл тэгш бус эсэхийг тодорхойлно; атомын эргэн тойрны электрон хос хэлбэрийг, хэлбэр ба туйлшрал молекул хоорондын хүчийг тодорхойлно.'
    ),
    nodes: [
      node('en', 'al-3.1', b('Electronegativity', 'Цахилгаан сөрөг чанар'),
        b('The power of an atom to attract the bonding electrons', 'Атом холбооны электроныг татах чадвар'),
        b('Rises across a period, falls down a group; F is highest', 'Үеэр өсч, бүлгээр буурна; F хамгийн өндөр'),
        b('Large difference → ionic; small difference → polar covalent', 'Их зөрүү → ионы; бага зөрүү → туйлт ковалент')),
      node('ionic', 'al-3.2', b('Ionic bonding', 'Ионы холбоо'),
        b('Electrostatic attraction between oppositely charged ions', 'Эсрэг цэнэгтэй ионуудын цахилгаан статик таталцал'),
        b('Giant lattice, high melting point', 'Аварга тор, хайлах цэг өндөр')),
      node('metallic', 'al-3.3', b('Metallic bonding', 'Металл холбоо'),
        b('Attraction between positive ions and delocalised electrons', 'Эерэг ион ба чөлөөт электроны таталцал')),
      node('covalent', 'al-3.4', b('Covalent and dative bonds', 'Ковалент ба донор-акцептор холбоо'),
        b('A shared pair of electrons; σ from end-on overlap, π from sideways overlap', 'Хуваалцсан электрон хос; σ үзүүрээрээ, π хажуугаараа давхцана'),
        b('Dative: both electrons from one atom, e.g. NH₄⁺, Al₂Cl₆', 'Донор-акцептор: хоёр электрон нэг атомаас, жишээ нь NH₄⁺, Al₂Cl₆'),
        b('Shorter bonds are stronger (bond length and bond energy)', 'Богино холбоо илүү бат (холбооны урт, энерги)')),
      node('dotcross', 'al-3.7', b('Dot-and-cross diagrams', 'Dot-and-cross диаграм'),
        b('Outer electrons of each atom, bonding pairs and lone pairs', 'Атом бүрийн гадна электрон, холбоо хос, чөлөөт хос'),
        b('Some atoms expand the octet: SF₆, PCl₅', 'Зарим атом октетээ тэлнэ: SF₆, PCl₅')),
      node('shapes', 'al-3.5', b('Shapes of molecules (VSEPR)', 'Молекулын хэлбэр (VSEPR)'),
        b('Electron pairs repel as far apart as possible; lone pairs repel more', 'Электрон хосууд аль болох хол түлхэлцэнэ; чөлөөт хос илүү түлхэнэ'),
        b('Linear 180°, trigonal planar 120°, tetrahedral 109.5°, pyramidal 107°, bent 104.5°, octahedral 90°', 'Шугаман 180°, гурвалжин хавтгай 120°, тетраэдр 109.5°, пирамид 107°, тахир 104.5°, октаэдр 90°')),
      node('imf', 'al-3.6', b('Forces between molecules', 'Молекул хоорондын хүч'),
        b('Instantaneous dipole–induced dipole (all molecules), permanent dipole–dipole, hydrogen bonds', 'Агшин зуурын диполь–индукцийн диполь (бүх молекул), байнгын диполь–диполь, устөрөгчийн холбоо'),
        b('Hydrogen bonds need H on N, O or F; they explain water’s high boiling point and ice floating', 'Устөрөгчийн холбоонд N, O, F-тэй холбогдсон H хэрэгтэй; усны өндөр буцлах цэг, мөс хөвөхийг тайлбарлана'))
    ],
    links: [
      link('en', 'ionic', 'a large difference gives', 'их зөрүүтэй бол'),
      link('en', 'covalent', 'a small difference gives', 'бага зөрүүтэй бол'),
      link('en', 'metallic', 'between metal atoms with low values:', 'бага утгатай металл атомуудын хооронд'),
      link('covalent', 'dotcross', 'is drawn with', 'зурж харуулна'),
      link('dotcross', 'shapes', 'counting the electron pairs gives the', 'электрон хосыг тоолж'),
      link('shapes', 'imf', 'shape and polarity decide the', 'хэлбэр, туйлшрал тодорхойлно'),
      link('en', 'imf', 'unequal sharing makes the dipoles of', 'тэгш бус хуваалцал диполь үүсгэнэ')
    ]
  },

  'al-ch-4': {
    centre: b('States of matter', 'Бодисын төлөв'),
    bigIdea: b(
      'A gas follows pV = nRT best when its particles are small and far apart; in liquids and solids the bonding and structure decide the properties.',
      'Хий бөөмс нь жижиг, хол байх үед pV = nRT-д хамгийн сайн захирагдана; шингэн, хатуу бодист холбоо ба бүтэц шинж чанарыг тодорхойлно.'
    ),
    nodes: [
      node('ideal', 'al-4.1', b('Ideal gases', 'Идеал хий'),
        b('pV = nRT: p in Pa, V in m³, T in K, R = 8.31 J K⁻¹ mol⁻¹', 'pV = nRT: p Па, V м³, T К, R = 8.31 J K⁻¹ mol⁻¹'),
        b('Assumes no forces between the particles and no volume of their own', 'Бөөмс хооронд хүчгүй, өөрийн эзлэхүүнгүй гэж үзнэ')),
      node('real', 'al-4.1', b('Real gases', 'Бодит хий'),
        b('Least ideal at high pressure and low temperature', 'Өндөр даралт, бага температурт хамгийн их хазайна'),
        b('Particles do take up space and attract each other', 'Бөөмс эзлэхүүн эзэлж, бие биеэ татна')),
      node('mr', 'al-4.1', b('Using pV = nRT', 'pV = nRT-г хэрэглэх'),
        b('Mr of a volatile liquid: M = mRT ÷ pV', 'Дэгдэмхий шингэний Mr: M = mRT ÷ pV')),
      node('structures', 'al-4.2', b('Bonding and structure', 'Холбоо ба бүтэц'),
        b('Giant ionic, giant covalent, giant metallic, simple molecular', 'Аварга ионы, аварга ковалент, аварга металл, энгийн молекул'),
        b('Melting point, conductivity and solubility follow from the bonding', 'Хайлах цэг, цахилгаан дамжуулалт, уусах чанар холбооноос шалтгаална')),
      node('lattices', 'al-4.2', b('Examples of each lattice', 'Тор бүрийн жишээ'),
        b('NaCl, MgO (ionic); diamond, graphite, SiO₂ (covalent); Cu (metallic); I₂, ice (molecular)', 'NaCl, MgO (ионы); алмаз, графит, SiO₂ (ковалент); Cu (металл); I₂, мөс (молекул)'))
    ],
    links: [
      link('ideal', 'real', 'breaks down at high pressure and low temperature for', 'өндөр даралт, бага температурт таарахгүй'),
      link('ideal', 'mr', 'rearranged gives', 'хувиргаж'),
      link('real', 'structures', 'strong enough attractions make the liquids and solids of', 'хангалттай таталцал шингэн, хатуу бодис үүсгэнэ'),
      link('structures', 'lattices', 'examples:', 'жишээ:')
    ]
  },

  'al-ch-5': {
    centre: b('Chemical energetics', 'Химийн энергетик'),
    bigIdea: b(
      'Every reaction has an enthalpy change; we measure some by calorimetry, estimate others from bond energies, and find the rest with Hess’s law.',
      'Урвал бүр энтальпийн өөрчлөлттэй; заримыг калориметрээр хэмжиж, заримыг холбооны энергиэр тооцоолж, үлдсэнийг Гессийн хуулиар олно.'
    ),
    nodes: [
      node('dh', 'al-5.1', b('Enthalpy change, ΔH', 'Энтальпийн өөрчлөлт, ΔH'),
        b('Exothermic: ΔH negative; endothermic: ΔH positive', 'Экзотерм: ΔH сөрөг; эндотерм: ΔH эерэг'),
        b('Standard conditions: 298 K and 101 kPa', 'Стандарт нөхцөл: 298 K, 101 kPa')),
      node('types', 'al-5.1', b('Standard enthalpy changes', 'Стандарт энтальпийн өөрчлөлт'),
        b('Formation, combustion, neutralisation, reaction', 'Үүсэх, шатах, саармагжих, урвалын'),
        b('Each defined per mole, with substances in their standard states', 'Тус бүр нэг моль, стандарт төлөвт тодорхойлогдоно')),
      node('calorimetry', 'al-5.1', b('Measuring ΔH', 'ΔH хэмжих'),
        b('q = mcΔT, then ΔH = −q ÷ n', 'q = mcΔT, дараа нь ΔH = −q ÷ n')),
      node('bonds', 'al-5.1', b('Bond energies', 'Холбооны энерги'),
        b('ΔH ≈ energy of bonds broken − energy of bonds made', 'ΔH ≈ задарсан холбооны энерги − үүссэн холбооны энерги'),
        b('Only approximate: average values, gaseous state', 'Ойролцоо: дундаж утга, хийн төлөв')),
      node('hess', 'al-5.2', b('Hess’s law', 'Гессийн хууль'),
        b('ΔH does not depend on the route taken', 'ΔH замаас хамаарахгүй'),
        b('Energy cycles with ΔHf or ΔHc data', 'ΔHf эсвэл ΔHc өгөгдөлтэй энергийн цикл'))
    ],
    links: [
      link('dh', 'types', 'is defined for', 'тодорхойлогдоно'),
      link('calorimetry', 'dh', 'measures', 'хэмжинэ'),
      link('bonds', 'dh', 'estimates', 'тооцоолно'),
      link('types', 'hess', 'are combined in', 'нийлүүлж хэрэглэнэ'),
      link('hess', 'dh', 'finds any', 'аль ч утгыг олно')
    ]
  },

  'al-ch-6': {
    centre: b('Electrochemistry: redox', 'Электрохими: исэлдэл-ангижрал'),
    bigIdea: b(
      'Redox is the transfer of electrons; oxidation numbers keep track of it and let us balance the equations.',
      'Исэлдэл-ангижрал бол электрон шилжилт; исэлдлийн зэрэг үүнийг хянаж, тэгшитгэлийг тэнцвэржүүлэхэд тусална.'
    ),
    nodes: [
      node('ox', 'al-6.1', b('Oxidation and reduction', 'Исэлдэл ба ангижрал'),
        b('Oxidation: loss of electrons, oxidation number rises', 'Исэлдэл: электрон алдах, исэлдлийн зэрэг өсөх'),
        b('Reduction: gain of electrons, oxidation number falls', 'Ангижрал: электрон авах, исэлдлийн зэрэг буурах')),
      node('on', 'al-6.1', b('Oxidation numbers', 'Исэлдлийн зэрэг'),
        b('Elements 0; O usually −2, H usually +1; they add up to the charge', 'Энгийн бодис 0; O ихэвчлэн −2, H +1; нийлбэр нь цэнэтэй тэнцүү'),
        b('Roman numerals in names, e.g. iron(III)', 'Нэрэнд ром тоо, жишээ нь төмөр(III)')),
      node('agents', 'al-6.1', b('Oxidising and reducing agents', 'Исэлдүүлэгч ба ангижруулагч'),
        b('An oxidising agent is itself reduced', 'Исэлдүүлэгч өөрөө ангижирна'),
        b('A reducing agent is itself oxidised', 'Ангижруулагч өөрөө исэлдэнэ')),
      node('balance', 'al-6.1', b('Balancing redox equations', 'Редокс тэгшитгэл тэнцвэржүүлэх'),
        b('From half-equations, or from the changes in oxidation number', 'Хагас тэгшитгэлээс эсвэл исэлдлийн зэргийн өөрчлөлтөөс'),
        b('Electrons lost = electrons gained', 'Алдсан электрон = авсан электрон')),
      node('disprop', 'al-6.1', b('Disproportionation', 'Диспропорцлол'),
        b('One element is both oxidised and reduced', 'Нэг элемент зэрэг исэлдэж, ангижирна'),
        b('e.g. Cl₂ + 2NaOH → NaCl + NaClO + H₂O', 'жишээ нь Cl₂ + 2NaOH → NaCl + NaClO + H₂O'))
    ],
    links: [
      link('ox', 'on', 'is tracked by', 'хянагдана'),
      link('on', 'agents', 'shows which species are the', 'аль нь болохыг харуулна'),
      link('on', 'balance', 'is used for', 'ашиглагдана'),
      link('ox', 'disprop', 'both at once in one element:', 'нэг элементэд зэрэг явагдвал')
    ]
  },

  'al-ch-7': {
    centre: b('Equilibria', 'Тэнцвэр'),
    bigIdea: b(
      'A reversible reaction in a closed system reaches dynamic equilibrium; Le Chatelier’s principle predicts how it shifts, Kc and Kp measure its position, and acid–base reactions are proton transfers.',
      'Битүү систем дэх эргэх урвал динамик тэнцвэрт хүрнэ; Ле Шательегийн зарчим шилжилтийг таамаглаж, Kc, Kp байрлалыг хэмжинэ; хүчил–суурийн урвал бол протон шилжилт.'
    ),
    nodes: [
      node('dyn', 'al-7.1', b('Dynamic equilibrium', 'Динамик тэнцвэр'),
        b('Forward rate = backward rate; concentrations stay constant', 'Шууд урвалын хурд = урвуу урвалын хурд; концентраци тогтмол'),
        b('Only in a closed system', 'Зөвхөн битүү системд')),
      node('lc', 'al-7.1', b('Le Chatelier’s principle', 'Ле Шательегийн зарчим'),
        b('The position shifts to oppose any change', 'Байрлал өөрчлөлтийг эсэргүүцэх тийш шилжинэ'),
        b('Concentration, pressure, temperature; a catalyst does not shift it', 'Концентраци, даралт, температур; катализатор шилжүүлэхгүй')),
      node('kc', 'al-7.1', b('Kc and Kp', 'Kc ба Kp'),
        b('Kc from equilibrium concentrations; Kp from partial pressures', 'Kc тэнцвэрийн концентрациас; Kp хэсгийн даралтаас'),
        b('Only temperature changes the value of K', 'K-ийн утгыг зөвхөн температур өөрчилнө')),
      node('industry', 'al-7.1', b('Industrial conditions', 'Үйлдвэрийн нөхцөл'),
        b('Haber: about 450 °C, 200 atm, iron catalyst', 'Хабер: 450 °C орчим, 200 atm, төмрийн катализатор'),
        b('Contact: about 450 °C, V₂O₅ catalyst; a compromise of yield and rate', 'Контакт: 450 °C орчим, V₂O₅; гарц, хурдны тохироо')),
      node('bl', 'al-7.2', b('Brønsted–Lowry acids and bases', 'Брёнстед–Лоуригийн хүчил, суурь'),
        b('Acid: proton donor; base: proton acceptor', 'Хүчил: протон өгөгч; суурь: протон авагч'),
        b('Conjugate acid–base pairs', 'Хосолсон хүчил–суурь хос')),
      node('strong', 'al-7.2', b('Strong and weak acids and bases', 'Хүчтэй ба сул хүчил, суурь'),
        b('Strong: fully dissociated; weak: partly, e.g. CH₃COOH, NH₃', 'Хүчтэй: бүрэн диссоциацлагдана; сул: хэсэгчлэн, жишээ нь CH₃COOH, NH₃'),
        b('At the same concentration a weak acid has a higher pH', 'Ижил концентрацид сул хүчлийн pH өндөр'))
    ],
    links: [
      link('dyn', 'lc', 'a change to it is opposed by', 'өөрчлөлтийг эсэргүүцнэ'),
      link('dyn', 'kc', 'its position is measured by', 'байрлалыг хэмжинэ'),
      link('lc', 'industry', 'explains the', 'тайлбарлана'),
      link('dyn', 'bl', 'acid–base equilibria are proton transfers:', 'хүчил–суурийн тэнцвэр бол протон шилжилт'),
      link('bl', 'strong', 'how fully the proton is given away decides', 'протоноо хэр бүрэн өгөх нь')
    ]
  },

  'al-ch-8': {
    centre: b('Reaction kinetics', 'Урвалын кинетик'),
    bigIdea: b(
      'A reaction is faster when more collisions have at least the activation energy: higher concentration gives more collisions, higher temperature more energetic ones, and a catalyst a route of lower energy.',
      'Идэвхжүүлэх энергиэс дээш энергитэй мөргөлдөөн олон байх тусам урвал хурдан: өндөр концентраци мөргөлдөөнийг олшруулж, өндөр температур энергийг нэмж, катализатор бага энергитэй зам өгнө.'
    ),
    nodes: [
      node('rate', 'al-8.1', b('Rate of reaction', 'Урвалын хурд'),
        b('The change in concentration per unit time', 'Нэгж хугацаан дахь концентрацийн өөрчлөлт'),
        b('Followed by gas volume, mass lost or colour', 'Хийн эзлэхүүн, алдсан масс, өнгөөр хянана')),
      node('conc', 'al-8.1', b('Concentration and pressure', 'Концентраци ба даралт'),
        b('More particles in a volume → more frequent collisions', 'Эзлэхүүнд бөөм олон → мөргөлдөөн давтамжтай')),
      node('boltz', 'al-8.2', b('Boltzmann distribution', 'Больцманы тархалт'),
        b('The spread of molecular energies; the area beyond Ea is the particles that can react', 'Молекулын энергийн тархалт; Ea-аас цаашх талбай нь урвалд орж чадах бөөмс'),
        b('Higher temperature: the peak moves right and lower, many more particles beyond Ea', 'Температур өсөхөд оргил баруун тийш, доошилж, Ea-аас цааш бөөм ихэснэ')),
      node('ea', 'al-8.2', b('Activation energy', 'Идэвхжүүлэх энерги'),
        b('The least energy a collision needs to react', 'Мөргөлдөөн урвалд ороход шаардлагатай хамгийн бага энерги')),
      node('cat', 'al-8.3', b('Catalysts', 'Катализатор'),
        b('Give another route with a lower Ea; not used up', 'Бага Ea-тай өөр зам өгнө; зарцуулагдахгүй'),
        b('Heterogeneous: a different phase, e.g. iron in the Haber process', 'Гетероген: өөр фаз, жишээ нь Хаберийн процессын төмөр'),
        b('Homogeneous: the same phase as the reactants', 'Гомоген: урвалжтай ижил фаз'))
    ],
    links: [
      link('rate', 'conc', 'rises with', 'өснө'),
      link('rate', 'boltz', 'rises with temperature, explained by the', 'температураар өсдөгийг тайлбарлана'),
      link('boltz', 'ea', 'the area beyond', 'цаашх талбай'),
      link('ea', 'cat', 'is lowered by', 'бууруулна')
    ]
  },

  'al-ch-9': {
    centre: b('Periodicity in Period 3', '3-р үеийн үелэлт'),
    bigIdea: b(
      'Across Period 3 the structure changes from giant metallic to giant covalent to simple molecular, and the oxides and chlorides change from ionic and basic to covalent and acidic.',
      '3-р үеэр бүтэц аварга металлаас аварга ковалент, энгийн молекул болж өөрчлөгдөнө; исэл, хлорид ионы, суурилаг байснаа ковалент, хүчиллэг болно.'
    ),
    nodes: [
      node('physical', 'al-9.1', b('Physical properties', 'Физик шинж чанар'),
        b('Atomic radius falls across the period', 'Атомын радиус үеэр буурна'),
        b('Melting point rises to Si, then is low for P₄, S₈, Cl₂ and Ar', 'Хайлах цэг Si хүртэл өсөөд, P₄, S₈, Cl₂, Ar-д бага'),
        b('Na, Mg, Al conduct; the rest hardly do', 'Na, Mg, Al дамжуулна; бусад нь бараг үгүй')),
      node('reactions', 'al-9.2', b('Reactions of the elements', 'Элементүүдийн урвал'),
        b('With oxygen: Na₂O, MgO, Al₂O₃, SiO₂, P₄O₁₀, SO₂', 'Хүчилтөрөгчтэй: Na₂O, MgO, Al₂O₃, SiO₂, P₄O₁₀, SO₂'),
        b('With chlorine: NaCl, MgCl₂, AlCl₃, SiCl₄, PCl₅', 'Хлортой: NaCl, MgCl₂, AlCl₃, SiCl₄, PCl₅'),
        b('Na with cold water, Mg with steam', 'Na хүйтэн устай, Mg ууртай')),
      node('oxides', 'al-9.2', b('Oxides', 'Исэл'),
        b('Na₂O, MgO basic; Al₂O₃ amphoteric; SiO₂, P₄O₁₀, SO₃ acidic', 'Na₂O, MgO суурилаг; Al₂O₃ амфотер; SiO₂, P₄O₁₀, SO₃ хүчиллэг'),
        b('Bonding: ionic → giant covalent → simple covalent', 'Холбоо: ионы → аварга ковалент → энгийн ковалент')),
      node('chlorides', 'al-9.2', b('Chlorides with water', 'Хлорид устай'),
        b('NaCl dissolves, pH 7; MgCl₂ slightly acidic', 'NaCl уусч, pH 7; MgCl₂ бага зэрэг хүчиллэг'),
        b('AlCl₃, SiCl₄, PCl₅ hydrolyse, giving HCl: acidic', 'AlCl₃, SiCl₄, PCl₅ гидролизлэгдэж HCl өгнө: хүчиллэг')),
      node('predict', 'al-9.3', b('Other elements', 'Бусад элементүүд'),
        b('Use position and trends to predict the properties of an unfamiliar element', 'Байрлал, хандлагаар танихгүй элементийн шинжийг таамаглана'))
    ],
    links: [
      link('physical', 'reactions', 'the change in structure shows in the', 'бүтцийн өөрчлөлт илэрнэ'),
      link('reactions', 'oxides', 'give', 'үүсгэнэ'),
      link('reactions', 'chlorides', 'give', 'үүсгэнэ'),
      link('physical', 'predict', 'the same trends help with', 'ижил хандлага тусална')
    ]
  },

  'al-ch-10': {
    centre: b('Group 2', 'II бүлэг'),
    bigIdea: b(
      'Down Group 2 the two outer electrons are lost more easily, so the metals get more reactive; the solubilities and thermal stabilities of their compounds change in a regular way too.',
      'II бүлгээр доошлох тусам гадна хоёр электрон амархан алдагдах тул металлууд идэвхжинэ; нэгдлүүдийн уусах чанар, дулааны тогтвортой байдал ч жигд өөрчлөгдөнө.'
    ),
    nodes: [
      node('reactivity', 'al-10.1', b('Reactivity of the metals', 'Металлын идэвх'),
        b('More reactive down the group with oxygen and water', 'Хүчилтөрөгч, устай идэвх бүлгээр доошлох тусам өснө'),
        b('Mg reacts with steam; Ca, Sr, Ba with cold water → hydroxide + H₂', 'Mg ууртай; Ca, Sr, Ba хүйтэн устай → гидроксид + H₂')),
      node('hydroxides', 'al-10.1', b('Hydroxides', 'Гидроксид'),
        b('More soluble down the group: Mg(OH)₂ barely, Ba(OH)₂ well', 'Доошлох тусам илүү уусна: Mg(OH)₂ бараг үгүй, Ba(OH)₂ сайн'),
        b('So their solutions are more alkaline down the group', 'Тиймээс уусмал нь доошлох тусам шүлтлэг')),
      node('sulfates', 'al-10.1', b('Sulfates', 'Сульфат'),
        b('Less soluble down the group: BaSO₄ is insoluble (the sulfate test)', 'Доошлох тусам бага уусна: BaSO₄ уусдаггүй (сульфатын сорил)')),
      node('thermal', 'al-10.1', b('Thermal decomposition', 'Дулааны задрал'),
        b('Carbonates → oxide + CO₂; nitrates → oxide + NO₂ + O₂', 'Карбонат → исэл + CO₂; нитрат → исэл + NO₂ + O₂'),
        b('More stable down the group: a larger ion distorts the anion less', 'Доошлох тусам тогтвортой: том ион анионыг бага гажуудуулна')),
      node('uses', 'al-10.1', b('Uses', 'Хэрэглээ'),
        b('Ca(OH)₂ to neutralise acidic soil; Mg(OH)₂ in antacids', 'Ca(OH)₂ хүчиллэг хөрсийг саармагжуулна; Mg(OH)₂ ходоодны эмэнд'))
    ],
    links: [
      link('reactivity', 'hydroxides', 'with water gives', 'устай урвалд орж'),
      link('hydroxides', 'sulfates', 'the opposite trend in solubility:', 'уусах чанарын эсрэг хандлага'),
      link('reactivity', 'thermal', 'the growing ion size also explains', 'ионы хэмжээ өсөх нь мөн тайлбарлана'),
      link('hydroxides', 'uses', 'are used as', 'хэрэглэгдэнэ')
    ]
  },

  'al-ch-11': {
    centre: b('Group 17: the halogens', 'VII бүлэг: галоген'),
    bigIdea: b(
      'Down Group 17 the atoms get bigger, so the halogens are weaker oxidising agents, while the halide ions become stronger reducing agents.',
      'VII бүлгээр доошлох тусам атом томорч, галоген сул исэлдүүлэгч болно; харин галидын ион хүчтэй ангижруулагч болно.'
    ),
    nodes: [
      node('physical', 'al-11.1', b('Physical properties', 'Физик шинж'),
        b('Cl₂ pale green gas, Br₂ red-brown liquid, I₂ grey-black solid', 'Cl₂ цайвар ногоон хий, Br₂ улаан хүрэн шингэн, I₂ саарал хар хатуу'),
        b('Boiling points rise down: stronger instantaneous dipole forces', 'Буцлах цэг доошлох тусам өснө: агшин зуурын диполийн хүч хүчтэй')),
      node('oxidising', 'al-11.2', b('Halogens as oxidising agents', 'Галоген исэлдүүлэгч'),
        b('Oxidising power falls down the group', 'Исэлдүүлэх чадвар доошлох тусам буурна'),
        b('Displacement: Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂', 'Түлхэн гаргалт: Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂')),
      node('hx', 'al-11.2', b('Hydrogen halides', 'Устөрөгчийн галид'),
        b('Thermal stability falls from HF to HI as the H–X bond gets weaker', 'H–X холбоо сулрах тул HF-ээс HI хүртэл дулааны тогтвортой байдал буурна')),
      node('halides', 'al-11.3', b('Halide ions', 'Галидын ион'),
        b('AgNO₃: AgCl white, AgBr cream, AgI yellow; then dilute or concentrated NH₃', 'AgNO₃: AgCl цагаан, AgBr цайвар шар, AgI шар; дараа нь шингэрүүлсэн эсвэл өтгөн NH₃'),
        b('With concentrated H₂SO₄: Cl⁻ gives HCl; Br⁻ also Br₂ and SO₂; I⁻ also I₂ and H₂S', 'Өтгөн H₂SO₄-тай: Cl⁻ HCl; Br⁻ мөн Br₂, SO₂; I⁻ мөн I₂, H₂S')),
      node('chlorine', 'al-11.4', b('Reactions of chlorine', 'Хлорын урвал'),
        b('Cold dilute NaOH: NaCl + NaClO; hot: NaCl + NaClO₃ (disproportionation)', 'Хүйтэн шингэрүүлсэн NaOH: NaCl + NaClO; халуун: NaCl + NaClO₃ (диспропорцлол)'),
        b('Water treatment: Cl₂ + H₂O ⇌ HCl + HClO kills bacteria', 'Ус цэвэрлэгээ: Cl₂ + H₂O ⇌ HCl + HClO бактери устгана'))
    ],
    links: [
      link('physical', 'oxidising', 'bigger atoms down the group make them weaker', 'том атом исэлдүүлэх чадварыг сулруулна'),
      link('oxidising', 'halides', 'the opposite trend: stronger reducing power of', 'эсрэг хандлага: ангижруулах чадвар хүчтэй'),
      link('oxidising', 'hx', 'weaker bonds down the group also in', 'сул холбоо мөн'),
      link('oxidising', 'chlorine', 'the most used one:', 'хамгийн их хэрэглэгддэг нь')
    ]
  },

  'al-ch-12': {
    centre: b('Nitrogen and sulfur', 'Азот ба хүхэр'),
    bigIdea: b(
      'Nitrogen gas is unreactive because of its triple bond, but its compounds (ammonia, ammonium salts, oxides of nitrogen) matter in farming and in pollution; sulfur dioxide is a pollutant and a preservative.',
      'Азот гурвалсан холбоотой тул идэвхгүй, харин нэгдлүүд нь (аммиак, аммонийн давс, азотын исэл) хөдөө аж ахуй, бохирдолд чухал; хүхрийн давхар исэл бохирдуулагч ба хадгалагч бодис.'
    ),
    nodes: [
      node('n2', 'al-12.1', b('Nitrogen gas', 'Азотын хий'),
        b('N≡N: a very strong triple bond, and non-polar', 'N≡N: маш бат гурвалсан холбоо, туйлгүй'),
        b('So N₂ is unreactive', 'Тиймээс N₂ идэвхгүй')),
      node('nh3', 'al-12.1', b('Ammonia and ammonium ions', 'Аммиак ба аммонийн ион'),
        b('NH₃ is a base: NH₃ + H⁺ → NH₄⁺ (a dative bond)', 'NH₃ суурь: NH₃ + H⁺ → NH₄⁺ (донор-акцептор холбоо)'),
        b('Warm NH₄⁺ with OH⁻ → NH₃ gas (turns damp red litmus blue)', 'NH₄⁺-ийг OH⁻-тэй бүлээсгэхэд NH₃ (чийгтэй улаан лакмусыг цэнхэр болгоно)')),
      node('nox', 'al-12.1', b('Oxides of nitrogen', 'Азотын исэл'),
        b('Made in car engines, where N₂ and O₂ meet at high temperature', 'Хөдөлгүүрт N₂, O₂ өндөр температурт урвалд орж үүснэ'),
        b('Removed by catalytic converters', 'Катализат хувиргагчаар зайлуулна'),
        b('NO catalyses the oxidation of SO₂ to SO₃ in the air', 'NO агаарт SO₂-ийг SO₃ болгох урвалыг катализлана')),
      node('pollution', 'al-12.1', b('Pollution', 'Бохирдол'),
        b('NO₂ and SO₂ → acid rain; NOx with hydrocarbons → photochemical smog (PAN)', 'NO₂, SO₂ → хүчиллэг бороо; NOx нүүрсустөрөгчтэй → фотохимийн утаа (PAN)'),
        b('Nitrate fertilisers washed into water → eutrophication', 'Нитрат бордоо усанд орж → эвтрофикац')),
      node('so2', 'al-12.1', b('Sulfur dioxide', 'Хүхрийн давхар исэл'),
        b('An acidic gas from burning fuels that contain sulfur', 'Хүхэртэй түлш шатахад үүсэх хүчиллэг хий'),
        b('Used as a food preservative', 'Хүнсний хадгалагч бодисоор хэрэглэнэ'))
    ],
    links: [
      link('n2', 'nh3', 'the Haber process turns it into', 'Хаберийн процессоор'),
      link('n2', 'nox', 'split at engine temperatures, it gives', 'хөдөлгүүрийн халуунд задарч'),
      link('nox', 'pollution', 'cause', 'үүсгэнэ'),
      link('nox', 'so2', 'NO speeds up the oxidation of', 'NO исэлдэлтийг хурдасгана'),
      link('so2', 'pollution', 'also causes', 'мөн үүсгэнэ')
    ]
  },

  'al-ch-13': {
    centre: b('Introduction to organic chemistry', 'Органик химийн танилцуулга'),
    bigIdea: b(
      'Organic molecules are named and drawn by their functional groups, their reactions are sorted by type and mechanism, their shapes come from σ and π bonds, and one formula can give several isomers.',
      'Органик молекулыг функциональ бүлгээр нь нэрлэж, зурна; урвалыг төрөл, механизмаар ангилна; хэлбэр нь σ, π холбооноос гарна; нэг томьёо хэд хэдэн изомер өгч болно.'
    ),
    nodes: [
      node('formulas', 'al-13.1', b('Formulas and names', 'Томьёо, нэршил'),
        b('General, structural, displayed and skeletal formulas', 'Ерөнхий, бүтцийн, дэлгэрэнгүй, араг ясны томьёо'),
        b('IUPAC names from the longest chain and the functional group', 'IUPAC нэр: хамгийн урт гинж, функциональ бүлгээр')),
      node('reactions', 'al-13.2', b('Types of reaction', 'Урвалын төрөл'),
        b('Addition, substitution, elimination, hydrolysis, condensation, oxidation, reduction', 'Нэгдэх, орлох, салгах, гидролиз, конденсац, исэлдэх, ангижрах'),
        b('Homolytic fission → radicals; heterolytic fission → ions', 'Гомолиз задрал → радикал; гетеролиз задрал → ион'),
        b('Nucleophile: electron-pair donor; electrophile: electron-pair acceptor', 'Нуклеофил: электрон хос өгөгч; электрофил: электрон хос авагч')),
      node('shapes', 'al-13.3', b('Shapes, σ and π bonds', 'Хэлбэр, σ ба π холбоо'),
        b('sp³ carbon: tetrahedral, 109.5°; sp² carbon: trigonal planar, 120°', 'sp³ нүүрстөрөгч: тетраэдр, 109.5°; sp²: гурвалжин хавтгай, 120°'),
        b('σ: end-on overlap; π: sideways overlap of p orbitals, so no rotation about C=C', 'σ: үзүүрээр давхцал; π: p орбиталийн хажуугийн давхцал, тиймээс C=C эргэхгүй')),
      node('structural', 'al-13.4', b('Structural isomers', 'Бүтцийн изомер'),
        b('Same molecular formula, different structure: chain, position or functional group', 'Молекулын томьёо ижил, бүтэц өөр: гинж, байрлал, функциональ бүлэг')),
      node('stereo', 'al-13.4', b('Stereoisomers', 'Стереоизомер'),
        b('Geometric (cis/trans): a C=C with two different groups on each carbon', 'Геометр (cis/trans): нүүрстөрөгч бүрт хоёр өөр бүлэгтэй C=C'),
        b('Optical: a chiral centre with four different groups; mirror images', 'Оптик: дөрвөн өөр бүлэгтэй хирал төв; толин тусгал'))
    ],
    links: [
      link('formulas', 'reactions', 'the functional group decides the', 'функциональ бүлэг тодорхойлно'),
      link('formulas', 'structural', 'one formula with different structures gives', 'нэг томьёо, өөр бүтэц'),
      link('structural', 'stereo', 'the same structure arranged differently in space:', 'ижил бүтэц, огторгуйд өөр байрлал'),
      link('shapes', 'stereo', 'no rotation about C=C gives cis/trans', 'C=C эргэхгүйгээс cis/trans үүснэ')
    ]
  },

  'al-ch-14': {
    centre: b('Hydrocarbons', 'Нүүрсустөрөгч'),
    bigIdea: b(
      'Alkanes have only strong, non-polar σ bonds, so they react only by burning and free-radical substitution; alkenes have an electron-rich π bond, so they react by electrophilic addition.',
      'Алкан зөвхөн бат, туйлгүй σ холбоотой тул зөвхөн шатах, чөлөөт радикалын орлуулалтаар урвалд орно; алкен электроноор баян π холбоотой тул электрофил нэгдэх урвалд орно.'
    ),
    nodes: [
      node('alkanes', 'al-14.1', b('Alkanes', 'Алкан'),
        b('Saturated; fuels; incomplete combustion gives CO and soot', 'Ханасан; түлш; бүрэн бус шаталтаар CO, хөө үүснэ'),
        b('Cracking breaks long alkanes into shorter alkanes and alkenes', 'Крекинг урт алканыг богино алкан, алкен болгон задална')),
      node('radical', 'al-14.1', b('Free-radical substitution', 'Чөлөөт радикалын орлуулалт'),
        b('Initiation (UV light splits Cl₂), propagation, termination', 'Эхлэл (хэт ягаан гэрэл Cl₂-ийг задална), үргэлжлэл, төгсгөл'),
        b('Gives a mixture of products', 'Бүтээгдэхүүний холимог өгнө')),
      node('alkenes', 'al-14.2', b('Alkenes', 'Алкен'),
        b('C=C made of a σ and a π bond', 'C=C нь σ, π холбооноос тогтоно'),
        b('Made by cracking, or by eliminating water from alcohols or HX from halogenoalkanes', 'Крекинг, эсвэл спиртээс ус, галогеналканаас HX салгаж гаргана')),
      node('addition', 'al-14.2', b('Electrophilic addition', 'Электрофил нэгдэх урвал'),
        b('With H₂ (Ni), steam (H₃PO₄), HBr and Br₂', 'H₂ (Ni), уур (H₃PO₄), HBr, Br₂-той'),
        b('The more stable carbocation gives the main product (Markovnikov)', 'Тогтвортой карбокатион гол бүтээгдэхүүнийг өгнө (Марковников)'),
        b('Bromine water turns colourless: the test for C=C', 'Бромын ус өнгөгүй болно: C=C-ийн сорил')),
      node('oxidation', 'al-14.2', b('Oxidation with KMnO₄', 'KMnO₄-аар исэлдүүлэх'),
        b('Cold, dilute, acidified: a diol', 'Хүйтэн, шингэрүүлсэн, хүчилжүүлсэн: диол'),
        b('Hot, concentrated: the C=C splits', 'Халуун, өтгөн: C=C тасарна'))
    ],
    links: [
      link('alkanes', 'radical', 'with Cl₂ in UV light:', 'хэт ягаан гэрэлд Cl₂-той'),
      link('alkanes', 'alkenes', 'cracking gives', 'крекингээр'),
      link('alkenes', 'addition', 'the π bond reacts by', 'π холбоо урвалд орно'),
      link('alkenes', 'oxidation', 'with acidified KMnO₄:', 'хүчилжүүлсэн KMnO₄-тай')
    ]
  },

  'al-ch-15': {
    centre: b('Halogenoalkanes', 'Галогеналкан'),
    bigIdea: b(
      'The C–X bond is polar, so nucleophiles attack the δ+ carbon: halogenoalkanes undergo substitution (SN1 or SN2) or, in other conditions, elimination.',
      'C–X холбоо туйлт тул нуклеофил δ+ нүүрстөрөгч рүү довтлоно: галогеналкан орлуулалт (SN1 эсвэл SN2), эсвэл өөр нөхцөлд салгах урвалд орно.'
    ),
    nodes: [
      node('classes', 'al-15.1', b('Halogenoalkanes and the C–X bond', 'Галогеналкан ба C–X холбоо'),
        b('Primary, secondary, tertiary', 'Анхдагч, хоёрдогч, гуравдагч'),
        b('C–X is polar (Cδ+); it gets weaker from C–F to C–I, so reactivity rises', 'C–X туйлт (Cδ+); C–F-ээс C–I руу сулрах тул идэвх өснө')),
      node('subst', 'al-15.1', b('Nucleophilic substitution', 'Нуклеофил орлуулалт'),
        b('OH⁻(aq), heat → alcohol', 'OH⁻(aq), халаах → спирт'),
        b('KCN in ethanol → nitrile (one more carbon)', 'Этанол дахь KCN → нитрил (нэг нүүрстөрөгч нэмэгдэнэ)'),
        b('NH₃ in ethanol, under pressure → amine', 'Этанол дахь NH₃, даралттай → амин')),
      node('mech', 'al-15.1', b('SN1 and SN2', 'SN1 ба SN2'),
        b('SN2: one step, for primary; the nucleophile attacks as X⁻ leaves', 'SN2: нэг алхам, анхдагчид; нуклеофил довтлох зуур X⁻ гарна'),
        b('SN1: a carbocation forms first, for tertiary', 'SN1: эхлээд карбокатион үүснэ, гуравдагчид')),
      node('elim', 'al-15.1', b('Elimination', 'Салгах урвал'),
        b('NaOH in hot ethanol → alkene + HX', 'Халуун этанол дахь NaOH → алкен + HX')),
      node('test', 'al-15.1', b('Comparing reactivity', 'Идэвхийг харьцуулах'),
        b('Warm with aqueous AgNO₃ in ethanol: iodide fastest (yellow), then bromide (cream), chloride (white)', 'Этанол дахь AgNO₃(aq)-тай бүлээсгэхэд иодид хамгийн хурдан (шар), дараа бромид (цайвар шар), хлорид (цагаан)'))
    ],
    links: [
      link('classes', 'subst', 'the δ+ carbon is attacked in', 'δ+ нүүрстөрөгч довтолгоонд өртөнө'),
      link('subst', 'mech', 'goes by', 'механизмаар явагдана'),
      link('classes', 'mech', 'primary or tertiary decides', 'анхдагч эсвэл гуравдагч эсэх нь шийднэ'),
      link('subst', 'elim', 'hot ethanol instead of water gives', 'усны оронд халуун этанол хэрэглэвэл'),
      link('classes', 'test', 'the bond strength shows in', 'холбооны бат бөх илэрнэ')
    ]
  },

  'al-ch-16': {
    centre: b('Alcohols', 'Спирт'),
    bigIdea: b(
      'The –OH group makes alcohols polar and hydrogen-bonded; primary, secondary and tertiary alcohols react differently, above all when they are oxidised.',
      '–OH бүлэг спиртийг туйлт, устөрөгчийн холбоотой болгоно; анхдагч, хоёрдогч, гуравдагч спирт, ялангуяа исэлдэхдээ, өөр өөрөөр урвалд орно.'
    ),
    nodes: [
      node('making', 'al-16.1', b('Making alcohols', 'Спирт гаргах'),
        b('Hydration of alkenes with steam and H₃PO₄', 'Алкеныг уур, H₃PO₄-тай усжуулах'),
        b('Hydrolysis of halogenoalkanes; reduction of aldehydes and ketones with NaBH₄; fermentation', 'Галогеналканы гидролиз; альдегид, кетоныг NaBH₄-аар ангижруулах; исгэлт')),
      node('reactions', 'al-16.1', b('Reactions of alcohols', 'Спиртийн урвал'),
        b('Burn; with sodium → alkoxide + H₂', 'Шатна; натритай → алкоксид + H₂'),
        b('To halogenoalkanes with HX, PCl₅ or SOCl₂', 'HX, PCl₅, SOCl₂-оор галогеналкан болно'),
        b('Dehydration to alkenes (Al₂O₃, or concentrated H₃PO₄)', 'Дегидратацаар алкен (Al₂O₃ эсвэл өтгөн H₃PO₄)')),
      node('oxidation', 'al-16.1', b('Oxidation with acidified K₂Cr₂O₇', 'Хүчилжүүлсэн K₂Cr₂O₇-аар исэлдүүлэх'),
        b('Primary → aldehyde (distil off) → carboxylic acid (reflux)', 'Анхдагч → альдегид (нэрж авна) → карбоксилын хүчил (рефлюкс)'),
        b('Secondary → ketone; tertiary: no reaction', 'Хоёрдогч → кетон; гуравдагч: урвалгүй'),
        b('Orange → green when it reacts', 'Урвалд орвол улбар шараас ногоон')),
      node('esters', 'al-16.1', b('Esterification', 'Эфиржилт'),
        b('Alcohol + carboxylic acid, with an acid catalyst ⇌ ester + water', 'Спирт + карбоксилын хүчил, хүчлийн катализатортой ⇌ эфир + ус')),
      node('iodoform', 'al-16.1', b('Tri-iodomethane test', 'Трийодметаны сорил'),
        b('Alkaline iodine gives a yellow precipitate of CHI₃ with a CH₃CH(OH)– group', 'CH₃CH(OH)– бүлэгтэй бол шүлтлэг иод шар CHI₃ тунадас өгнө'))
    ],
    links: [
      link('making', 'reactions', 'then take part in', 'дараа нь урвалд орно'),
      link('reactions', 'oxidation', 'the reaction that tells them apart:', 'тэдгээрийг ялгах урвал'),
      link('reactions', 'esters', 'with carboxylic acids:', 'карбоксилын хүчилтэй'),
      link('reactions', 'iodoform', 'a test for CH₃CH(OH)–:', 'CH₃CH(OH)–-ийн сорил')
    ]
  },

  'al-ch-17': {
    centre: b('Aldehydes and ketones', 'Альдегид ба кетон'),
    bigIdea: b(
      'Aldehydes and ketones share the polar C=O group, which nucleophiles attack; aldehydes can still be oxidised and ketones cannot, which is how the tests tell them apart.',
      'Альдегид, кетон хоёулаа туйлт C=O бүлэгтэй, нуклеофил үүнд довтлоно; альдегид цааш исэлдэж чадах ба кетон чадахгүй, сорилууд яг үүгээр ялгана.'
    ),
    nodes: [
      node('making', 'al-17.1', b('Making them', 'Гаргах'),
        b('Oxidising a primary alcohol gives an aldehyde; a secondary alcohol gives a ketone', 'Анхдагч спирт исэлдэж альдегид, хоёрдогч спирт кетон болно')),
      node('reduction', 'al-17.1', b('Reduction', 'Ангижрал'),
        b('NaBH₄ reduces them back to primary or secondary alcohols', 'NaBH₄ буцааж анхдагч, хоёрдогч спирт болгоно')),
      node('hcn', 'al-17.1', b('Nucleophilic addition of HCN', 'HCN-ийн нуклеофил нэгдэл'),
        b('HCN with a KCN catalyst → hydroxynitrile', 'KCN катализатортой HCN → гидроксинитрил'),
        b('CN⁻ attacks the δ+ carbon of C=O', 'CN⁻ C=O-ийн δ+ нүүрстөрөгч рүү довтлоно')),
      node('tests', 'al-17.1', b('Tests', 'Сорил'),
        b('2,4-DNPH: orange precipitate with any C=O', '2,4-DNPH: аль ч C=O-той улбар шар тунадас'),
        b('Tollens’ (silver mirror) and Fehling’s (red-brown precipitate): aldehydes only', 'Толленс (мөнгөн толь), Фелинг (улаан хүрэн тунадас): зөвхөн альдегид'),
        b('Alkaline iodine: CH₃CO– groups give yellow CHI₃', 'Шүлтлэг иод: CH₃CO– бүлэг шар CHI₃ өгнө'))
    ],
    links: [
      link('making', 'reduction', 'the reverse is', 'эсрэг нь'),
      link('making', 'hcn', 'the C=O reacts by', 'C=O урвалд орно'),
      link('making', 'tests', 'are told apart by', 'ялгагдана')
    ]
  },

  'al-ch-18': {
    centre: b('Carboxylic acids and esters', 'Карбоксилын хүчил ба эфир'),
    bigIdea: b(
      'Carboxylic acids are weak acids made by oxidation or hydrolysis; with alcohols they form esters, which can be hydrolysed back.',
      'Карбоксилын хүчил исэлдэл эсвэл гидролизоор гарах сул хүчил; спирттэй эфир үүсгэх ба эфир буцааж гидролизлэгдэнэ.'
    ),
    nodes: [
      node('making', 'al-18.1', b('Making carboxylic acids', 'Карбоксилын хүчил гаргах'),
        b('Oxidising primary alcohols or aldehydes (reflux, acidified K₂Cr₂O₇)', 'Анхдагч спирт, альдегидийг исэлдүүлэх (рефлюкс, хүчилжүүлсэн K₂Cr₂O₇)'),
        b('Hydrolysing nitriles or esters', 'Нитрил, эфирийг гидролизлэх')),
      node('acid', 'al-18.1', b('Reactions as acids', 'Хүчлийн урвал'),
        b('Weak acids: with metals (H₂), alkalis, and carbonates (CO₂)', 'Сул хүчил: металлтай (H₂), шүлттэй, карбонаттай (CO₂)'),
        b('Reduced to primary alcohols by LiAlH₄', 'LiAlH₄-аар анхдагч спирт болно')),
      node('esters', 'al-18.2', b('Esters', 'Эфир'),
        b('Acid + alcohol with concentrated H₂SO₄ ⇌ ester + water', 'Хүчил + спирт, өтгөн H₂SO₄-тай ⇌ эфир + ус'),
        b('Named alcohol part first: ethyl ethanoate', 'Спиртийн хэсгээр эхэлж нэрлэнэ: этил этаноат'),
        b('Sweet, fruity smells: flavourings, perfumes, solvents', 'Анхилуун, жимсний үнэр: амтлагч, үнэртэн, уусгагч')),
      node('hydrolysis', 'al-18.2', b('Hydrolysis of esters', 'Эфирийн гидролиз'),
        b('With acid (reversible) → carboxylic acid + alcohol', 'Хүчилтэй (эргэх) → карбоксилын хүчил + спирт'),
        b('With alkali (goes to completion) → carboxylate salt + alcohol', 'Шүлттэй (бүрэн) → карбоксилатын давс + спирт'))
    ],
    links: [
      link('making', 'acid', 'gives the', 'гаргаж өгнө'),
      link('acid', 'esters', 'with an alcohol forms', 'спирттэй үүсгэнэ'),
      link('esters', 'hydrolysis', 'are split back by', 'буцааж задарна'),
      link('hydrolysis', 'acid', 'gives back the', 'буцааж өгнө')
    ]
  },

  'al-ch-19': {
    centre: b('Nitrogen compounds', 'Азотын нэгдэл'),
    bigIdea: b(
      'Primary amines come from halogenoalkanes and ammonia, or from reducing nitriles; nitriles add one carbon to a chain and can be hydrolysed or reduced.',
      'Анхдагч амин галогеналкан ба аммиакаас, эсвэл нитрилийг ангижруулж гарна; нитрил гинжинд нэг нүүрстөрөгч нэмж, гидролизлэгдэх эсвэл ангижирна.'
    ),
    nodes: [
      node('amines', 'al-19.1', b('Primary amines', 'Анхдагч амин'),
        b('Halogenoalkane + excess NH₃ in ethanol, heated under pressure', 'Галогеналкан + илүүдэл NH₃, этанолд, даралттай халаана'),
        b('Or by reducing a nitrile', 'Эсвэл нитрилийг ангижруулж')),
      node('nitriles', 'al-19.2', b('Nitriles', 'Нитрил'),
        b('Halogenoalkane + KCN in ethanol, heat: the chain grows by one carbon', 'Галогеналкан + этанол дахь KCN, халаах: гинж нэг нүүрстөрөгчөөр уртсана'),
        b('Reduced by H₂/Ni or LiAlH₄ → amine', 'H₂/Ni эсвэл LiAlH₄-аар → амин')),
      node('acid', 'al-19.2', b('Hydrolysis of nitriles', 'Нитрилийн гидролиз'),
        b('Heat with dilute acid → carboxylic acid', 'Шингэрүүлсэн хүчилтэй халаахад → карбоксилын хүчил')),
      node('hydroxy', 'al-19.2', b('Hydroxynitriles', 'Гидроксинитрил'),
        b('Aldehyde or ketone + HCN (with KCN) → hydroxynitrile', 'Альдегид, кетон + HCN (KCN-тэй) → гидроксинитрил'),
        b('Hydrolysis then gives a 2-hydroxy carboxylic acid', 'Дараа нь гидролизоор 2-гидрокси карбоксилын хүчил'))
    ],
    links: [
      link('nitriles', 'amines', 'reduction gives', 'ангижралаар'),
      link('nitriles', 'acid', 'heating with acid:', 'хүчилтэй халаавал'),
      link('hydroxy', 'acid', 'hydrolyse the same way:', 'ижил аргаар гидролизлэгдэнэ')
    ]
  },

  'al-ch-20': {
    centre: b('Addition polymerisation', 'Нэгдэх полимержилт'),
    bigIdea: b(
      'Alkene monomers join by addition: each C=C opens, and the repeat unit has the same atoms as the monomer; the polymers last because their long saturated chains are unreactive.',
      'Алкен мономерууд нэгдэх урвалаар холбогдоно: C=C бүр нээгдэж, давтагдах нэгж мономертой ижил атомтай; урт ханасан гинж идэвхгүй тул полимер удаан хадгалагдана.'
    ),
    nodes: [
      node('monomer', 'al-20.1', b('Monomers', 'Мономер'),
        b('Alkenes such as ethene, propene, chloroethene, tetrafluoroethene', 'Этен, пропен, хлорэтен, тетрафторэтен зэрэг алкен')),
      node('repeat', 'al-20.1', b('Repeat units', 'Давтагдах нэгж'),
        b('Draw the C=C as C–C with a bond out on each side', 'C=C-г хоёр талдаа холбоостой C–C болгож зурна'),
        b('Work back from a section of polymer to its monomer', 'Полимерийн хэсгээс мономерийг нь олно')),
      node('properties', 'al-20.1', b('Properties', 'Шинж чанар'),
        b('Long, non-polar, saturated chains: unreactive', 'Урт, туйлгүй, ханасан гинж: идэвхгүй')),
      node('disposal', 'al-20.1', b('Disposal', 'Устгал'),
        b('Non-biodegradable: they stay in landfill', 'Биологийн аргаар задардаггүй: хогийн цэгт үлдэнэ'),
        b('Burning can give toxic gases, e.g. HCl from PVC', 'Шатаахад хортой хий гарч болно, жишээ нь PVC-ээс HCl'))
    ],
    links: [
      link('monomer', 'repeat', 'addition polymerisation gives', 'нэгдэх полимержилтээр'),
      link('repeat', 'properties', 'the long saturated chain gives', 'урт ханасан гинж өгнө'),
      link('properties', 'disposal', 'being unreactive is a problem in', 'идэвхгүй байдал асуудал үүсгэнэ')
    ]
  },

  'al-ch-21': {
    centre: b('Organic synthesis', 'Органик синтез'),
    bigIdea: b(
      'Functional groups can be turned into one another; a synthesis is a route of known steps, each with its reagents and conditions, from a starting molecule to the target.',
      'Функциональ бүлгүүдийг бие биендээ хувиргаж болно; синтез бол эхлэлийн молекулаас зорилтот молекул хүртэлх урвалж, нөхцөлтэй мэдэгдэх алхмуудын зам.'
    ),
    nodes: [
      node('alkene', 'al-21.1', b('Alkene', 'Алкен'),
        b('+ HBr → halogenoalkane; + steam → alcohol', '+ HBr → галогеналкан; + уур → спирт')),
      node('halo', 'al-21.1', b('Halogenoalkane', 'Галогеналкан'),
        b('+ OH⁻ → alcohol; + CN⁻ → nitrile; + NH₃ → amine', '+ OH⁻ → спирт; + CN⁻ → нитрил; + NH₃ → амин')),
      node('alcohol', 'al-21.1', b('Alcohol', 'Спирт'),
        b('Oxidise → aldehyde, ketone or acid; dehydrate → alkene', 'Исэлдүүлэх → альдегид, кетон, хүчил; дегидратац → алкен')),
      node('carbonyl', 'al-21.1', b('Aldehyde or ketone', 'Альдегид, кетон'),
        b('+ HCN → hydroxynitrile; NaBH₄ → alcohol', '+ HCN → гидроксинитрил; NaBH₄ → спирт')),
      node('acid', 'al-21.1', b('Carboxylic acid', 'Карбоксилын хүчил'),
        b('+ alcohol → ester', '+ спирт → эфир')),
      node('nitrile', 'al-21.1', b('Nitrile', 'Нитрил'),
        b('Hydrolyse → carboxylic acid; reduce → amine', 'Гидролиз → карбоксилын хүчил; ангижрал → амин'),
        b('CN⁻ is the way to add one carbon to the chain', 'CN⁻ гинжинд нэг нүүрстөрөгч нэмэх арга'))
    ],
    links: [
      link('alkene', 'halo', '+ HBr', '+ HBr'),
      link('halo', 'alcohol', '+ NaOH(aq), heat', '+ NaOH(aq), халаах'),
      link('alcohol', 'alkene', 'dehydration', 'дегидратац'),
      link('alcohol', 'carbonyl', 'oxidation (K₂Cr₂O₇/H⁺)', 'исэлдэл (K₂Cr₂O₇/H⁺)'),
      link('carbonyl', 'acid', 'further oxidation of an aldehyde', 'альдегидийн цаашдын исэлдэл'),
      link('halo', 'nitrile', '+ KCN in ethanol', '+ этанол дахь KCN'),
      link('nitrile', 'acid', 'hydrolysis', 'гидролиз')
    ]
  },

  'al-ch-22': {
    centre: b('Analytical techniques', 'Шинжилгээний арга'),
    bigIdea: b(
      'An infrared spectrum shows which bonds, and so which functional groups, a molecule has; a mass spectrum shows its mass, its isotopes and the pieces it breaks into.',
      'Хэт улаан туяаны спектр молекулд ямар холбоо, улмаар ямар функциональ бүлэг байгааг; масс спектр масс, изотоп, задарсан хэсгүүдийг харуулна.'
    ),
    nodes: [
      node('ir', 'al-22.1', b('Infrared spectroscopy', 'Хэт улаан туяаны спектроскопи'),
        b('Each bond absorbs infrared at its own wavenumbers', 'Холбоо бүр өөрийн долгионы тоонд хэт улаан туяа шингээнэ'),
        b('O–H (alcohol) broad 3200–3600; O–H (acid) very broad 2500–3000; C=O 1680–1730 cm⁻¹', 'O–H (спирт) өргөн 3200–3600; O–H (хүчил) маш өргөн 2500–3000; C=O 1680–1730 cm⁻¹')),
      node('identify', 'al-22.1', b('Identifying a compound', 'Нэгдлийг тодорхойлох'),
        b('Name the functional groups from the absorptions', 'Шингээлтээс функциональ бүлгийг нэрлэнэ'),
        b('The fingerprint region (below 1500 cm⁻¹) matches one known spectrum', 'Хурууны хээний муж (1500 cm⁻¹-ээс доош) нэг мэдэгдэх спектртэй таарна')),
      node('ms', 'al-22.2', b('Mass spectrum', 'Масс спектр'),
        b('The molecular ion M⁺ gives the Mr', 'Молекулын ион M⁺ Mr-ийг өгнө'),
        b('Fragments give the structure, e.g. m/z 15 CH₃⁺, 29 C₂H₅⁺', 'Хэсгүүд бүтцийг өгнө, жишээ нь m/z 15 CH₃⁺, 29 C₂H₅⁺')),
      node('isotopes', 'al-22.2', b('Isotope peaks', 'Изотопын оргил'),
        b('M+1 peak from ¹³C: number of carbons ≈ (height of M+1 ÷ height of M) × 100 ÷ 1.1', '¹³C-ийн M+1 оргил: нүүрстөрөгчийн тоо ≈ (M+1 өндөр ÷ M өндөр) × 100 ÷ 1.1'),
        b('Chlorine: M and M+2 in a 3 : 1 ratio; bromine: 1 : 1', 'Хлор: M, M+2 нь 3 : 1; бром: 1 : 1'))
    ],
    links: [
      link('ir', 'identify', 'the bonds it finds help in', 'олсон холбоо тусална'),
      link('ms', 'identify', 'the mass and the fragments complete', 'масс, хэсгүүд бүрэн болгоно'),
      link('ms', 'isotopes', 'the small peaks above M are', 'M-ээс дээрх жижиг оргил нь')
    ]
  }
};
