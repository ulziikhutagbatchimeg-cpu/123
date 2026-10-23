import type { ALevelSubsection } from './alevelSubsectionTypes';

// 9701 (2025–2027) subject content, sections 1–8 (AS). Every learning outcome, English and Mongolian.
export const ALEVEL_SECTIONS_1_8: ALevelSubsection[] = [
  {
    ref: '1.1',
    en: 'Particles in the atom and atomic radius',
    mn: 'Атом дахь бөөмс ба атомын радиус',
    obj: [
      [1, 'Understand that atoms are mostly empty space surrounding a very small, dense nucleus that contains protons and neutrons; electrons are found in shells in the empty space around the nucleus.', 'Атом нь протон ба нейтроныг агуулсан, маш жижиг, нягт цөмийг хүрээлсэн ихэвчлэн хоосон зай гэдгийг ойлгох; электронууд цөмийг хүрээлсэн хоосон зайд бүрхүүлд байрлана.'],
      [2, 'Identify and describe protons, neutrons and electrons in terms of their relative charges and relative masses.', 'Протон, нейтрон, электроныг харьцангуй цэнэг ба харьцангуй массаар нь таньж, тодорхойлох.'],
      [3, 'Understand the terms atomic number and proton number; mass number and nucleon number.', 'Атомын дугаар ба протоны тоо; масс ба нуклоны тоо гэдэг нэр томъёог ойлгох.'],
      [4, 'Describe the distribution of mass and charge within an atom.', 'Атом доторх масс ба цэнэгийн тархалтыг тодорхойлох.'],
      [5, 'Describe the behaviour of beams of protons, neutrons and electrons moving at the same velocity in an electric field.', 'Ижил хурдтай хөдөлж буй протон, нейтрон, электроны туяаны цахилгаан орон дахь зан төлөвийг тодорхойлох.'],
      [6, 'Determine the numbers of protons, neutrons and electrons present in both atoms and ions given atomic or proton number, mass or nucleon number and charge.', 'Атомын эсвэл протоны тоо, масс эсвэл нуклоны тоо, цэнэг өгөгдсөн үед атом ба ионы протон, нейтрон, электроны тоог тодорхойлох.'],
      [7, 'State and explain qualitatively the variations in atomic radius and ionic radius across a period and down a group.', 'Үе ба бүлгийн дагуу атомын радиус ба ионы радиусын өөрчлөлтийг чанарын хувьд хэлж, тайлбарлах.']
    ]
  },
  {
    ref: '1.2',
    en: 'Isotopes',
    mn: 'Изотоп',
    obj: [
      [1, 'Define the term isotope in terms of numbers of protons and neutrons.', 'Изотопыг протон ба нейтроны тоогоор тодорхойлох.'],
      [2, 'Understand the notation for isotopes, where x is the mass or nucleon number and y is the atomic or proton number.', 'Изотопын тэмдэглэгээг ойлгох: x нь масс эсвэл нуклоны тоо, y нь атомын эсвэл протоны тоо.'],
      [3, 'State that and explain why isotopes of the same element have the same chemical properties.', 'Ижил элементийн изотопууд яагаад ижил химийн шинж чанартай байдгийг хэлж, тайлбарлах.'],
      [4, 'State that and explain why isotopes of the same element have different physical properties, limited to mass and density.', 'Ижил элементийн изотопууд физик шинжээр (зөвхөн масс ба нягтаар) яагаад ялгаатай байдгийг хэлж, тайлбарлах.']
    ]
  },
  {
    ref: '1.3',
    en: 'Electrons, energy levels and atomic orbitals',
    mn: 'Электрон, энергийн түвшин ба атомын орбиталь',
    note: 'Each atom or ion is in the ground state. Only the elements hydrogen to krypton will be assessed.',
    obj: [
      [1, 'Understand the terms: shells, sub-shells and orbitals; principal quantum number (n); ground state, limited to electronic configuration.', 'Бүрхүүл, дэд бүрхүүл ба орбиталь; үндсэн квант тоо (n); үндсэн төлөв (зөвхөн электрон бүтцээр) гэсэн нэр томъёог ойлгох.'],
      [2, 'Describe the number of orbitals making up s, p and d sub-shells, and the number of electrons that can fill s, p and d sub-shells.', 's, p, d дэд бүрхүүлийг бүрдүүлэх орбиталийн тоо, s, p, d дэд бүрхүүлд багтах электроны тоог тодорхойлох.'],
      [3, 'Describe the order of increasing energy of the sub-shells within the first three shells and the 4s and 4p sub-shells.', 'Эхний гурван бүрхүүл дотрох дэд бүрхүүлүүд, мөн 4s ба 4p дэд бүрхүүлийн энергийн өсөх дарааллыг тодорхойлох.'],
      [4, 'Describe the electronic configurations to include the number of electrons in each shell, sub-shell and orbital.', 'Электрон бүтцийг бүрхүүл, дэд бүрхүүл, орбитал бүрт байгаа электроны тоотой нь хамт тодорхойлох.'],
      [5, 'Explain the electronic configurations in terms of energy of the electrons and inter-electron repulsion.', 'Электрон бүтцийг электроны энерги ба электрон хоорондын түлхэлтээр тайлбарлах.'],
      [6, 'Determine the electronic configuration of atoms and ions given the atomic or proton number and charge, using the full (for example Fe: 1s²2s²2p⁶3s²3p⁶3d⁶4s²) or the shorthand (for example [Ar] 3d⁶4s²) convention.', 'Атомын эсвэл протоны тоо ба цэнэг өгөгдсөн үед атом ба ионы электрон бүтцийг бүтэн (жишээ нь Fe: 1s²2s²2p⁶3s²3p⁶3d⁶4s²) эсвэл товчилсон ([Ar] 3d⁶4s²) тэмдэглэгээгээр тодорхойлох.'],
      [7, 'Understand and use the electrons in boxes notation (for example for Fe).', 'Электроныг хайрцагт байрлуулах тэмдэглэгээг ойлгож, ашиглах (жишээ нь Fe).'],
      [8, 'Describe and sketch the shapes of s and p orbitals.', 's ба p орбиталийн хэлбэрийг тодорхойлж, зурах.'],
      [9, 'Describe a free radical as a species with one or more unpaired electrons.', 'Чөлөөт радикалыг нэг буюу хэд хэдэн хосгүй электронтой бөөм гэж тодорхойлох.']
    ]
  },
  {
    ref: '1.4',
    en: 'Ionisation energy',
    mn: 'Ионжуулах энерги',
    note: 'Each atom or ion is in the ground state. Only the elements hydrogen to krypton will be assessed.',
    obj: [
      [1, 'Define and use the term first ionisation energy, IE.', 'Анхны ионжуулах энерги, IE гэдэг нэр томъёог тодорхойлж, ашиглах.'],
      [2, 'Construct equations to represent first, second and subsequent ionisation energies.', 'Анхны, хоёр дахь болон дараагийн ионжуулах энергийг илэрхийлэх тэгшитгэл бичих.'],
      [3, 'Identify and explain the trends in ionisation energies across a period and down a group of the Periodic Table.', 'Үелэх системийн үе ба бүлгийн дагуу ионжуулах энергийн чиг хандлагыг таньж, тайлбарлах.'],
      [4, 'Identify and explain the variation in successive ionisation energies of an element.', 'Элементийн дараалсан ионжуулах энергийн өөрчлөлтийг таньж, тайлбарлах.'],
      [5, 'Understand that ionisation energies are due to the attraction between the nucleus and the outer electron.', 'Ионжуулах энерги нь цөм ба гаднах электроны хоорондын татах хүчнээс үүдэлтэйг ойлгох.'],
      [6, 'Explain the factors influencing the ionisation energies of elements in terms of nuclear charge, atomic or ionic radius, shielding by inner shells and sub-shells, and spin-pair repulsion.', 'Элементийн ионжуулах энергид нөлөөлөх хүчин зүйлсийг цөмийн цэнэг, атомын эсвэл ионы радиус, дотоод бүрхүүл ба дэд бүрхүүлийн халхлал, спин-хос түлхэлтээр тайлбарлах.'],
      [7, 'Deduce the electronic configurations of elements using successive ionisation energy data.', 'Дараалсан ионжуулах энергийн өгөгдлөөр элементийн электрон бүтцийг тодорхойлох.'],
      [8, 'Deduce the position of an element in the Periodic Table using successive ionisation energy data.', 'Дараалсан ионжуулах энергийн өгөгдлөөр элементийн үелэх системд эзлэх байрлалыг тодорхойлох.']
    ]
  },
  {
    ref: '2.1',
    en: 'Relative masses of atoms and molecules',
    mn: 'Атом ба молекулын харьцангуй масс',
    obj: [
      [1, 'Define the unified atomic mass unit as one twelfth of the mass of a carbon-12 atom.', 'Нэгдсэн атомын массын нэгжийг карбон-12 атомын массын арван хоёрдугаар хэсэг гэж тодорхойлох.'],
      [2, 'Define relative atomic mass, Ar, relative isotopic mass, relative molecular mass, Mr, and relative formula mass in terms of the unified atomic mass unit.', 'Харьцангуй атомын масс Ar, харьцангуй изотопын масс, харьцангуй молекулын масс Mr ба харьцангуй томьёоны массыг нэгдсэн атомын массын нэгжээр тодорхойлох.']
    ]
  },
  {
    ref: '2.2',
    en: 'The mole and the Avogadro constant',
    mn: 'Моль ба Авогадрогийн тогтмол',
    obj: [
      [1, 'Define and use the term mole in terms of the Avogadro constant.', 'Моль гэдэг нэр томъёог Авогадрогийн тогтмолоор тодорхойлж, ашиглах.']
    ]
  },
  {
    ref: '2.3',
    en: 'Formulas',
    mn: 'Томьёо',
    obj: [
      [1, 'Write formulas of ionic compounds from ionic charges and oxidation numbers (shown by a Roman numeral), including the prediction of ionic charge from the position of an element in the Periodic Table, and recall the names and formulas of NO₃⁻, CO₃²⁻, SO₄²⁻, OH⁻, NH₄⁺, Zn²⁺, Ag⁺, HCO₃⁻ and PO₄³⁻.', 'Ионы нэгдлийн томьёог ионы цэнэг ба исэлдэлтийн зэрэг (римийн тоогоор) ашиглан бичих, үелэх системд элементийн байрлалаар ионы цэнэгийг урьдчилан таамаглах, NO₃⁻, CO₃²⁻, SO₄²⁻, OH⁻, NH₄⁺, Zn²⁺, Ag⁺, HCO₃⁻, PO₄³⁻ ионуудын нэр ба томьёог санах.'],
      [2, 'Write and construct equations, which should be balanced, including ionic equations (which should not include spectator ions), and use appropriate state symbols.', 'Тэнцвэржүүлсэн тэгшитгэл, оролцоогүй ионыг оруулаагүй ионы тэгшитгэлийг бичиж, зохих төлөвийн тэмдэгтийг ашиглах.'],
      [3, 'Define and use the terms empirical and molecular formula.', 'Эмпирик ба молекулын томьёо гэсэн нэр томъёог тодорхойлж, ашиглах.'],
      [4, 'Understand and use the terms anhydrous, hydrated and water of crystallisation.', 'Усгүй, усан ба талст ус гэсэн нэр томъёог ойлгож, ашиглах.'],
      [5, 'Calculate empirical and molecular formulas, using given data.', 'Өгөгдсөн мэдээллээр эмпирик ба молекулын томьёог тооцоолох.']
    ]
  },
  {
    ref: '2.4',
    en: 'Reacting masses and volumes (of solutions and gases)',
    mn: 'Урвалжийн масс ба эзлэхүүн (уусмал ба хийн)',
    obj: [
      [1, 'Perform calculations including use of the mole concept involving reacting masses (from formulas and equations) including percentage yield, volumes of gases (for example in the burning of hydrocarbons), volumes and concentrations of solutions, limiting and excess reagents, and deduce stoichiometric relationships from these calculations.', 'Моль ойлголтыг ашиглан тооцоо хийх: томьёо ба тэгшитгэлээс урвалжийн масс (хувь гарцтай), хийн эзлэхүүн (жишээ нь нүүрсустөрөгч шатаахад), уусмалын эзлэхүүн ба концентраци, хязгаарлагч ба илүүдэл урвалж; эдгээр тооцооноос стехиометрийн харьцааг тодорхойлох.']
    ]
  },
  {
    ref: '3.1',
    en: 'Electronegativity and bonding',
    mn: 'Цахилгаан сөрөг чанар ба холбоо',
    obj: [
      [1, 'Define electronegativity as the power of an atom to attract electrons to itself.', 'Цахилгаан сөрөг чанарыг атомын электроныг өөртөө татах чадвар гэж тодорхойлох.'],
      [2, 'Explain the factors influencing the electronegativities of the elements in terms of nuclear charge, atomic radius and shielding by inner shells and sub-shells.', 'Элементийн цахилгаан сөрөг чанарт нөлөөлөх хүчин зүйлсийг цөмийн цэнэг, атомын радиус, дотоод бүрхүүл ба дэд бүрхүүлийн халхлалаар тайлбарлах.'],
      [3, 'State and explain the trends in electronegativity across a period and down a group of the Periodic Table.', 'Үелэх системийн үе ба бүлгийн дагуу цахилгаан сөрөг чанарын чиг хандлагыг хэлж, тайлбарлах.'],
      [4, 'Use the differences in Pauling electronegativity values to predict the formation of ionic and covalent bonds (the presence of covalent character in some ionic compounds will not be assessed).', 'Паулингийн цахилгаан сөрөг чанарын утгуудын зөрүүгээр ионы ба ковалент холбооны үүсэхийг урьдчилан таамаглах (зарим ионы нэгдлийн ковалент шинжийг үнэлэхгүй).']
    ]
  },
  {
    ref: '3.2',
    en: 'Ionic bonding',
    mn: 'Ионы холбоо',
    obj: [
      [1, 'Define ionic bonding as the electrostatic attraction between oppositely charged ions (positively charged cations and negatively charged anions).', 'Ионы холбоог эсрэг цэнэгтэй ионуудын (эерэг цэнэгтэй катион ба сөрөг цэнэгтэй анион) хоорондох цахилгаан статик татах хүч гэж тодорхойлох.'],
      [2, 'Describe ionic bonding including the examples of sodium chloride, magnesium oxide and calcium fluoride.', 'Ионы холбоог натрийн хлорид, магнийн исэл, кальцийн фторидын жишээгээр тодорхойлох.']
    ]
  },
  {
    ref: '3.3',
    en: 'Metallic bonding',
    mn: 'Металлын холбоо',
    obj: [
      [1, 'Define metallic bonding as the electrostatic attraction between positive metal ions and delocalised electrons.', 'Металлын холбоог эерэг металлын ион ба ион тусгаарлагдаагүй электроны хоорондох цахилгаан статик таталцал гэж тодорхойлох.']
    ]
  },
  {
    ref: '3.4',
    en: 'Covalent bonding and coordinate (dative covalent) bonding',
    mn: 'Ковалент холбоо ба координацын (донор-акцепторын) холбоо',
    obj: [
      [1, 'Define covalent bonding as electrostatic attraction between the nuclei of two atoms and a shared pair of electrons; describe covalent bonding in molecules including H₂, O₂, N₂, Cl₂, HCl, CO₂, NH₃, CH₄, C₂H₆ and C₂H₄; understand that elements in Period 3 can expand their octet, including in SO₂, PCl₅ and SF₆; describe coordinate (dative covalent) bonding, including in NH₄⁺ and Al₂Cl₆.', 'Ковалент холбоог хоёр атомын цөм ба хуваалцсан электрон хосын хоорондох цахилгаан статик татах хүч гэж тодорхойлох; H₂, O₂, N₂, Cl₂, HCl, CO₂, NH₃, CH₄, C₂H₆, C₂H₄ молекулд ковалент холбоог тодорхойлох; 3-р үеийн элемент октетоо тэлж чадахыг (SO₂, PCl₅, SF₆) ойлгох; NH₄⁺ ба Al₂Cl₆-д байгаа координацын (донор-акцепторын) холбоог тодорхойлох.'],
      [2, 'Describe covalent bonds in terms of orbital overlap giving σ and π bonds (σ bonds by direct overlap; π bonds by sideways overlap of adjacent p orbitals), describe how they form in H₂, C₂H₆, C₂H₄, HCN and N₂, and use the concept of hybridisation to describe sp, sp² and sp³ orbitals.', 'Ковалент холбоог орбиталийн давхцлаар σ ба π холбоо гэж тодорхойлох (σ нь шууд давхцал; π нь хажуугийн p орбиталийн давхцал); H₂, C₂H₆, C₂H₄, HCN, N₂-т хэрхэн үүсэхийг тодорхойлох; sp, sp² ба sp³ орбиталийг гибриджилтээр тодорхойлох.'],
      [3, 'Define bond energy as the energy required to break one mole of a particular covalent bond in the gaseous state and bond length as the internuclear distance of two covalently bonded atoms; use bond energy values and the concept of bond length to compare the reactivity of covalent molecules.', 'Холбооны энергийг хийн төлөвт нэг моль тодорхой ковалент холбоо таслахад шаардагдах энерги, холбооны уртыг ковалент холбоотой хоёр атомын цөмийн хоорондох зай гэж тодорхойлох; холбооны энерги ба холбооны уртын ойлголтоор ковалент молекулын урвалын идэвхийг харьцуулах.']
    ]
  },
  {
    ref: '3.5',
    en: 'Shapes of molecules',
    mn: 'Молекулын хэлбэр',
    obj: [
      [1, 'State and explain the shapes of, and bond angles in, molecules by using VSEPR theory, including BF₃ (trigonal planar, 120°), CO₂ (linear, 180°), CH₄ (tetrahedral, 109.5°), NH₃ (pyramidal, 107°), H₂O (non-linear, 104.5°), SF₆ (octahedral, 90°) and PF₅ (trigonal bipyramidal, 120° and 90°).', 'VSEPR онолоор молекулын хэлбэр ба холбооны өнцгийг хэлж, тайлбарлах: BF₃ (гурвалжин хавтгай, 120°), CO₂ (шугаман, 180°), CH₄ (тетраэдр, 109.5°), NH₃ (пирамид, 107°), H₂O (шугаман бус, 104.5°), SF₆ (октаэдр, 90°), PF₅ (гурвалжин бипирамид, 120° ба 90°).'],
      [2, 'Predict the shapes of, and bond angles in, molecules and ions analogous to those specified in 3.5.1.', '3.5.1-д заасантай адил молекул ба ионы хэлбэр, холбооны өнцгийг урьдчилан таамаглах.']
    ]
  },
  {
    ref: '3.6',
    en: 'Intermolecular forces, electronegativity and bond properties',
    mn: 'Молекул хоорондын хүч, цахилгаан сөрөг чанар ба холбооны шинж чанар',
    obj: [
      [1, 'Describe hydrogen bonding, limited to molecules containing N–H and O–H groups, including ammonia and water as simple examples; use hydrogen bonding to explain the anomalous properties of H₂O (ice and water): its relatively high melting and boiling points, its relatively high surface tension, and the density of solid ice compared with liquid water.', 'Устөрөгчийн холбоог зөвхөн N–H ба O–H бүлэгтэй молекулд, аммиак ба усны жишээгээр тодорхойлох; устөрөгчийн холбоогоор H₂O-ийн гажиг шинжийг тайлбарлах: харьцангуй өндөр хайлах ба буцлах цэг, харьцангуй өндөр гадаргуугийн таталцал, хатуу мөс ба шингэн усны нягтын харьцаа.'],
      [2, 'Use the concept of electronegativity to explain bond polarity and dipole moments of molecules.', 'Цахилгаан сөрөг чанарын ойлголтоор холбооны туйл ба молекулын диполь моментийг тайлбарлах.'],
      [3, 'Describe van der Waals’ forces as the intermolecular forces between molecular entities other than those due to bond formation, use the term as a generic term for all intermolecular forces, describe the types of van der Waals’ forces (instantaneous dipole–induced dipole (id-id) forces, also called London dispersion forces; permanent dipole–permanent dipole (pd-pd) forces, including hydrogen bonding), and describe hydrogen bonding as a special case of permanent dipole–permanent dipole forces where hydrogen is bonded to a highly electronegative atom.', 'Ван дер Ваальсын хүчийг холбоо үүсгэхээс бусад молекул хоорондын хүч гэж тодорхойлж, бүх молекул хоорондын хүчний ерөнхий нэр болгон ашиглах; ван дер Ваальсын хүчний төрлүүдийг тодорхойлох (агшин зуурын диполь–индукцийн диполь (id-id) хүч, Лондонгийн дисперсийн хүч гэлээ; байнгын диполь–байнгын диполь (pd-pd) хүч, устөрөгчийн холбоо орно); устөрөгчийн холбоог устөрөгч өндөр цахилгаан сөрөг атомтай холбогдсон байх байнгын диполь–байнгын диполь хүчний онцгой тохиолдол гэж тодорхойлох.'],
      [4, 'State that, in general, ionic, covalent and metallic bonding are stronger than intermolecular forces.', 'Ерөнхийдөө ионы, ковалент ба металлын холбоо молекул хоорондын хүчнээс хүчтэй гэдгийг хэлэх.']
    ]
  },
  {
    ref: '3.7',
    en: 'Dot-and-cross diagrams',
    mn: 'Dot-and-cross диаграм',
    obj: [
      [1, 'Use dot-and-cross diagrams to illustrate ionic, covalent and coordinate bonding, including the compounds stated in 3.4 and 3.5 (dot-and-cross diagrams may include species with atoms which have an expanded octet or species with an odd number of electrons).', 'Ионы, ковалент ба координацын холбоог dot-and-cross диаграмаар дүрслэх; 3.4 ба 3.5-д заасан нэгдлүүдийг оруулна (октетоо тэлсэн атом эсвэл сондгой электронтой бодисыг оруулж болно).']
    ]
  },
  {
    ref: '4.1',
    en: 'The gaseous state: ideal and real gases and pV = nRT',
    mn: 'Хийн төлөв: идеал ба бодит хий, pV = nRT',
    obj: [
      [1, 'Explain the origin of pressure in a gas in terms of collisions between gas molecules and the wall of the container.', 'Хийн даралтын гарал үүслийг хийн молекул ба саванзийн хана хоорондын мөргөлдөөнөөр тайлбарлах.'],
      [2, 'Understand that ideal gases have zero particle volume and no intermolecular forces of attraction.', 'Идеал хий нь бөөмийн эзлэхүүнгүй, молекул хоорондын татах хүчгүй гэдгийг ойлгох.'],
      [3, 'State and use the ideal gas equation pV = nRT in calculations, including in the determination of Mr.', 'Идеал хийн тэгшитгэл pV = nRT-г хэлж, тооцоонд ашиглах, мөн Mr-ийг тодорхойлоход ашиглах.']
    ]
  },
  {
    ref: '4.2',
    en: 'Bonding and structure',
    mn: 'Холбоо ба бүтэц',
    obj: [
      [1, 'Describe, in simple terms, the lattice structure of a crystalline solid which is giant ionic (including sodium chloride and magnesium oxide), simple molecular (including iodine, buckminsterfullerene C₆₀ and ice), giant molecular (including silicon(IV) oxide, graphite and diamond) or giant metallic (including copper).', 'Талст хатуу биетийн торын бүтцийг энгийнээр тодорхойлох: аварга ионы (натрийн хлорид, магнийн исэл орно), энгийн молекулын (иод, бакминстерфуллерен C₆₀, мөс орно), аварга молекулын (цахиурын(IV) исэл, графит, алмаз орно) ба аварга металлын (зэс орно) тор.'],
      [2, 'Describe, interpret and predict the effect of different types of structure and bonding on the physical properties of substances, including melting point, boiling point, electrical conductivity and solubility.', 'Бүтэц ба холбооны төрөл бүр бодисын физик шинж чанар (хайлах цэг, буцлах цэг, цахилгаан дамжуулалт, уусах чанар) дээр хэрхэн нөлөөлөхийг тодорхойлох, тайлбарлах, урьдчилан таамаглах.'],
      [3, 'Deduce the type of structure and bonding present in a substance from given information.', 'Өгөгдсөн мэдээллээс бодисын бүтэц ба холбооны төрлийг тодорхойлох.']
    ]
  },
  {
    ref: '5.1',
    en: 'Enthalpy change, ΔH',
    mn: 'Энтальпийн өөрчлөлт, ΔH',
    obj: [
      [1, 'Understand that chemical reactions are accompanied by enthalpy changes and that these can be exothermic (ΔH is negative) or endothermic (ΔH is positive).', 'Химийн урвал энтальпийн өөрчлөлттэй дагалддаг, энэ нь экзотерм (ΔH сөрөг) эсвэл эндотерм (ΔH эерэг) байж болохыг ойлгох.'],
      [2, 'Construct and interpret a reaction pathway diagram in terms of the enthalpy change of the reaction and of the activation energy.', 'Урвалын энтальпийн өөрчлөлт ба идэвхжүүлэх энергийн дагуу урвалын замын диаграмыг зурж, тайлбарлах.'],
      [3, 'Define and use the terms: standard conditions (298 K and 101 kPa, shown by ⦵); enthalpy change of reaction, ΔHr; of formation, ΔHf; of combustion, ΔHc; and of neutralisation, ΔHneut.', 'Дараах нэр томъёог тодорхойлж, ашиглах: стандарт нөхцөл (298 K, 101 kPa, ⦵-р тэмдэглэнэ); урвалын ΔHr, үүссэний ΔHf, шаталтын ΔHc, саармагжилтын ΔHneut энтальпийн өөрчлөлт.'],
      [4, 'Understand that energy transfers occur during chemical reactions because of the breaking and making of chemical bonds.', 'Химийн урвалын үед энергийн шилжилт химийн холбоо таслагдах ба үүсэхээс болдгийг ойлгох.'],
      [5, 'Use bond energies (ΔH positive, i.e. bond breaking) to calculate the enthalpy change of reaction, ΔHr.', 'Холбооны энергийг (ΔH эерэг, өөрөөр хэлбэл холбоо таслагдах) ашиглан урвалын энтальпийн өөрчлөлт ΔHr-ийг тооцоолох.'],
      [6, 'Understand that some bond energies are exact and some bond energies are averages.', 'Зарим холбооны энерги яг утгатай, зарим нь дундаж утгатай гэдгийг ойлгох.'],
      [7, 'Calculate enthalpy changes from appropriate experimental results, including the use of the relationships q = mcΔT and ΔH = −mcΔT/n.', 'Тохирох туршилтын үр дүнгээс энтальпийн өөрчлөлтийг тооцоолох; q = mcΔT ба ΔH = −mcΔT/n хамаарлыг ашиглах.']
    ]
  },
  {
    ref: '5.2',
    en: 'Hess’s law',
    mn: 'Гессийн хууль',
    obj: [
      [1, 'Apply Hess’s law to construct simple energy cycles.', 'Гессийн хуулийг хэрэглэн энгийн энергийн мөчлөг зурах.'],
      [2, 'Carry out calculations using cycles and relevant energy terms, including determining enthalpy changes that cannot be found by direct experiment and the use of bond energy data.', 'Мөчлөг ба холбогдох энергийн нэр томъёог ашиглан тооцоо хийх: шууд туршилтаар олдохгүй энтальпийн өөрчлөлтийг тодорхойлох, холбооны энергийн мэдээллийг ашиглах.']
    ]
  },
  {
    ref: '6.1',
    en: 'Redox processes: electron transfer and changes in oxidation number (oxidation state)',
    mn: 'Редокс процесс: электрон шилжилт ба исэлдэлтийн зэргийн өөрчлөлт',
    obj: [
      [1, 'Calculate oxidation numbers of elements in compounds and ions.', 'Нэгдэл ба ион дахь элементийн исэлдэлтийн зэргийг тооцоолох.'],
      [2, 'Use changes in oxidation numbers to help balance chemical equations.', 'Исэлдэлтийн зэргийн өөрчлөлтийг ашиглан химийн тэгшитгэлийг тэнцвэржүүлэхэд туслах.'],
      [3, 'Explain and use the terms redox, oxidation, reduction and disproportionation in terms of electron transfer and changes in oxidation number.', 'Редокс, исэлдэлт, ангижрал, диспропорциональ гэсэн нэр томъёог электрон шилжилт ба исэлдэлтийн зэргийн өөрчлөлтөөр тайлбарлаж, ашиглах.'],
      [4, 'Explain and use the terms oxidising agent and reducing agent.', 'Исэлдүүлэгч ба ангижруулагч гэсэн нэр томъёог тайлбарлаж, ашиглах.'],
      [5, 'Use a Roman numeral to indicate the magnitude of the oxidation number of an element.', 'Элементийн исэлдэлтийн зэргийн хэмжээг римийн тоогоор заах.']
    ]
  },
  {
    ref: '7.1',
    en: 'Chemical equilibria: reversible reactions, dynamic equilibrium',
    mn: 'Химийн тэнцвэр: эргэх урвал, динамик тэнцвэр',
    obj: [
      [1, 'Understand what is meant by a reversible reaction; by dynamic equilibrium, in terms of the rate of forward and reverse reactions being equal and the concentrations of reactants and products remaining constant; and the need for a closed system to establish dynamic equilibrium.', 'Эргэх урвал гэдгийг; урагш ба эсрэг урвалын хурд тэнцүү, урвалж ба бүтээгдэхүүний концентраци тогтмол байхаар динамик тэнцвэрийг; динамик тэнцвэр тогтоход битүү систем шаардлагатайг ойлгох.'],
      [2, 'Define Le Chatelier’s principle: if a change is made to a system at dynamic equilibrium, the position of equilibrium moves to minimise this change.', 'Ле Шателийн зарчмыг тодорхойлох: динамик тэнцвэрт байгаа системд өөрчлөлт хийвэл тэнцвэрийн байрлал энэ өөрчлөлтийг багасгах чиглэлд шилжинэ.'],
      [3, 'Use Le Chatelier’s principle to deduce qualitatively the effects of changes in temperature, concentration, pressure or the presence of a catalyst on a system at equilibrium.', 'Ле Шателийн зарчмаар температур, концентраци, даралт, катализаторын оршилт тэнцвэртэй системд хэрхэн нөлөөлөхийг чанарын хувьд тодорхойлох.'],
      [4, 'Deduce expressions for equilibrium constants in terms of concentrations, Kc.', 'Концентрацигаар илэрхийлсэн тэнцвэрийн тогтмол Kc-ийн илэрхийллийг гаргах.'],
      [5, 'Use the terms mole fraction and partial pressure.', 'Мольн хувь ба парциал даралт гэсэн нэр томъёог ашиглах.'],
      [6, 'Deduce expressions for equilibrium constants in terms of partial pressures, Kp (the use of the relationship between Kp and Kc is not required).', 'Парциал даралтаар илэрхийлсэн тэнцвэрийн тогтмол Kp-ийн илэрхийллийг гаргах (Kp ба Kc-ийн хамаарлыг ашиглах шаардлагагүй).'],
      [7, 'Use the Kc and Kp expressions to carry out calculations (such calculations will not require the solving of quadratic equations).', 'Kc ба Kp-ийн илэрхийллийг ашиглан тооцоо хийх (квадрат тэгшитгэл бодох шаардлагагүй).'],
      [8, 'Calculate the quantities present at equilibrium, given appropriate data.', 'Тохирох мэдээлэл өгөгдсөн үед тэнцвэрт байгаа хэмжигдэхүүнүүдийг тооцоолох.'],
      [9, 'State whether changes in temperature, concentration or pressure, or the presence of a catalyst, affect the value of the equilibrium constant for a reaction.', 'Температур, концентраци эсвэл даралтын өөрчлөлт, катализаторын оршилт урвалын тэнцвэрийн тогтмолын утгад нөлөөлдөг эсэхийг хэлэх.'],
      [10, 'Describe and explain the conditions used in the Haber process and the Contact process, as examples of the importance of an understanding of dynamic equilibrium in the chemical industry and the application of Le Chatelier’s principle.', 'Хими үйлдвэрлэлд динамик тэнцвэрийг ойлгох ба Ле Шателийн зарчмыг хэрэглэх жишээ болгон Хабер ба Контакт процессын нөхцөлийг тодорхойлж, тайлбарлах.']
    ]
  },
  {
    ref: '7.2',
    en: 'Brønsted–Lowry theory of acids and bases',
    mn: 'Брёнстед–Лоуригийн хүчил ба суурийн онол',
    obj: [
      [1, 'State the names and formulas of the common acids, limited to hydrochloric acid (HCl), sulfuric acid (H₂SO₄), nitric acid (HNO₃) and ethanoic acid (CH₃COOH).', 'Түгээмэл хүчлүүдийн нэр ба томьёог хэлэх: давсны хүчил (HCl), хүхрийн хүчил (H₂SO₄), азотын хүчил (HNO₃), этанойн хүчил (CH₃COOH).'],
      [2, 'State the names and formulas of the common alkalis, limited to sodium hydroxide (NaOH), potassium hydroxide (KOH) and ammonia (NH₃).', 'Түгээмэл шүлтүүдийн нэр ба томьёог хэлэх: натрийн гидроксид (NaOH), калийн гидроксид (KOH), аммиак (NH₃).'],
      [3, 'Describe the Brønsted–Lowry theory of acids and bases.', 'Хүчил ба суурийн Брёнстед–Лоригийн онолыг тодорхойлох.'],
      [4, 'Describe strong acids and strong bases as fully dissociated in aqueous solution, and weak acids and weak bases as partially dissociated in aqueous solution.', 'Хүчтэй хүчил ба хүчтэй суурийг усан уусмалд бүрэн задардаг, сул хүчил ба сул суурийг хэсэгчлэн задардаг гэж тодорхойлох.'],
      [5, 'Appreciate that water has a pH of 7, acid solutions a pH below 7 and alkaline solutions a pH above 7.', 'Ус pH 7, хүчлийн уусмал pH 7-оос бага, шүлтлэг уусмал pH 7-оос их гэдгийг ойлгох.'],
      [6, 'Explain qualitatively the differences in behaviour between strong and weak acids, including the reaction with a reactive metal and the difference in pH values, by use of a pH meter, universal indicator or conductivity.', 'Хүчтэй ба сул хүчлийн зан төлөвийн ялгааг чанарын хувьд тайлбарлах: идэвхтэй металлтай урвал, pH-ийн ялгаа (pH хэмжигч, универсал индикатор эсвэл дамжуулалтаар).'],
      [7, 'Understand that neutralisation reactions occur when H⁺(aq) and OH⁻(aq) form H₂O(l).', 'H⁺(aq) ба OH⁻(aq) H₂O(l) үүсгэх үед саармагжилтын урвал явагдахыг ойлгох.'],
      [8, 'Understand that salts are formed in neutralisation reactions.', 'Саармагжилтын урвалд давс үүсэхийг ойлгох.'],
      [9, 'Sketch the pH titration curves of titrations using combinations of strong and weak acids with strong and weak alkalis.', 'Хүчтэй ба сул хүчил, хүчтэй ба сул шүлтийн хослолыг ашигласан титрлэлтийн pH муруйг зурах.'],
      [10, 'Select suitable indicators for acid–alkali titrations, given appropriate data (pKa values will not be used).', 'Тохирох мэдээлэл өгөгдсөн үед хүчил–шүлтийн титрлэлтэд тохирох индикаторыг сонгох (pKa утгыг ашиглахгүй).']
    ]
  },
  {
    ref: '8.1',
    en: 'Rate of reaction',
    mn: 'Урвалын хурд',
    obj: [
      [1, 'Explain and use the terms rate of reaction, frequency of collisions, effective collisions and non-effective collisions.', 'Урвалын хурд, мөргөлдөөний давтамж, үр дүнтэй ба үр дүнгүй мөргөлдөөн гэсэн нэр томъёог тайлбарлаж, ашиглах.'],
      [2, 'Explain qualitatively, in terms of the frequency of effective collisions, the effect of concentration and pressure changes on the rate of a reaction.', 'Үр дүнтэй мөргөлдөөний давтамжаар концентраци ба даралтын өөрчлөлт урвалын хурдад хэрхэн нөлөөлөхийг чанарын хувьд тайлбарлах.'],
      [3, 'Use experimental data to calculate the rate of a reaction.', 'Туршилтын өгөгдлөөр урвалын хурдыг тооцоолох.']
    ]
  },
  {
    ref: '8.2',
    en: 'Effect of temperature on reaction rates and the concept of activation energy',
    mn: 'Температурын урвалын хурдад үзүүлэх нөлөө ба идэвхжүүлэх энергийн ойлголт',
    obj: [
      [1, 'Define activation energy, EA, as the minimum energy required for a collision to be effective.', 'Идэвхжүүлэх энерги EA-г мөргөлдөөн үр дүнтэй байхад шаардагдах хамгийн бага энерги гэж тодорхойлох.'],
      [2, 'Sketch and use the Boltzmann distribution to explain the significance of activation energy.', 'Идэвхжүүлэх энергийн ач холбогдлыг тайлбарлахын тулд Больцманы тархалтыг зурж, ашиглах.'],
      [3, 'Explain qualitatively, in terms both of the Boltzmann distribution and of the frequency of effective collisions, the effect of temperature change on the rate of a reaction.', 'Температурын өөрчлөлт урвалын хурдад хэрхэн нөлөөлөхийг Больцманы тархалт ба үр дүнтэй мөргөлдөөний давтамжаар хоёуланг нь ашиглан чанарын хувьд тайлбарлах.']
    ]
  },
  {
    ref: '8.3',
    en: 'Homogeneous and heterogeneous catalysts',
    mn: 'Гомоген ба гетероген катализатор',
    obj: [
      [1, 'Explain and use the terms catalyst and catalysis: explain that in the presence of a catalyst a reaction has a different mechanism of lower activation energy; explain this catalytic effect in terms of the Boltzmann distribution; construct and interpret a reaction pathway diagram for a reaction in the presence and absence of an effective catalyst.', 'Катализатор ба катализ гэсэн нэр томъёог тайлбарлаж, ашиглах: катализаторын оршихуйд урвал бага идэвхжүүлэх энергитэй өөр механизмаар явагдахыг тайлбарлах; энэ катализын нөлөөг Больцманы тархалтаар тайлбарлах; катализатортой ба катализаторгүй урвалын замын диаграмыг зурж, тайлбарлах.']
    ]
  }
];
