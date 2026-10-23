import { buildTopic, TopicSpec } from './syllabusBuilders';

// 0620 subject content: sections 1–5 (states of matter, atoms and bonding, stoichiometry, fuel cells, energetics)
const SPECS: TopicSpec[] = [
  {
    id: 's-1-2', chapter: 'ch-states-of-matter', ref: '1.2', en: 'Diffusion', mn: 'Диффуз',
    sumEn: 'Diffusion is the spreading of particles from where they are crowded to where they are fewer, caused by their random movement. Lighter gas molecules diffuse faster.',
    sumMn: 'Диффуз гэдэг нь бөөмс нягт газраас ховор газар руу санамсаргүй хөдөлгөөний улмаас тархах үзэгдэл юм. Бага масстай хийн молекул илүү хурдан тархана.',
    obj: [
      ['1.2.1', 'Describe and explain diffusion in terms of kinetic particle theory.', 'Диффузийг кинетик бөөмийн онолоор тодорхойлж, тайлбарлах.'],
      ['1.2.2', 'Explain how relative molecular mass affects the rate of diffusion of gases.', 'Харьцангуй молекул масс хийн диффузийн хурдад хэрхэн нөлөөлдгийг тайлбарлах.']
    ],
    vocab: [
      ['diffusion', 'диффуз', 'Movement of particles from a region of higher concentration to lower concentration.', 'Бөөмс өндөр концентрациас бага концентрац руу шилжих хөдөлгөөн.'],
      ['relative molecular mass (Mr)', 'харьцангуй молекул масс (Mr)', 'Average mass of a molecule compared with 1/12 of the mass of a carbon-12 atom.', 'Молекулын дундаж масс, нүүрстөрөгч-12 атомын массын 1/12-той харьцуулсан харьцаа.']
    ],
    sec: [
      ['How particles spread', 'Бөөмс хэрхэн тархах вэ', 'Particles in gases and liquids move randomly all the time. Where there is a concentration gradient, more particles leave the crowded region than enter it, so the substance spreads until it is evenly mixed.', 'Хий ба шингэн дэх бөөмс байнга санамсаргүй хөдөлдөг. Концентрацийн ялгаа байвал нягт хэсгээс илүү олон бөөмс гарч, нэгэн жигд холилдох хүртэл тархана.'],
      ['Relative molecular mass and speed', 'Харьцангуй молекул масс ба хурд', 'At the same temperature, all gas particles have the same average kinetic energy. Lighter molecules therefore move faster and diffuse faster. Ammonia (Mr 17) diffuses faster than hydrogen chloride (Mr 36.5), so in a glass tube the white ring of ammonium chloride forms closer to the hydrogen chloride end.', 'Ижил температурт бүх хийн бөөмийн дундаж кинетик энерги ижил байна. Тиймээс бага масстай молекул илүү хурдан хөдөлж, илүү хурдан тархана. Аммиак (Mr 17) нь HCl (Mr 36.5)-аас хурдан тархдаг тул шилэн хоолойд ammonium chloride-ийн цагаан цагираг HCl-ийн үзүүрт ойр үүснэ.']
    ]
  },
  {
    id: 's-2-1', chapter: 'ch-atoms-bonding', ref: '2.1', en: 'Elements, compounds and mixtures', mn: 'Элемент, нэгдэл ба холимог',
    sumEn: 'An element has only one kind of atom. A compound has two or more elements chemically combined in a fixed ratio. A mixture is not chemically combined and can be separated by physical methods.',
    sumMn: 'Элемент нь нэг төрлийн атомтай. Нэгдэл нь хоёр ба түүнээс дээш элемент химийн аргаар тогтмол харьцаатайгаар холбогдсон байдаг. Холимог нь химийн холбоогүй, физик аргаар салгаж болно.',
    obj: [['2.1.1', 'Describe the differences between elements, compounds and mixtures.', 'Элемент, нэгдэл, холимогийн ялгааг тодорхойлох.']],
    vocab: [
      ['element', 'элемент', 'A substance made of only one type of atom.', 'Нэг төрлийн атомаас бүтсэн бодис.'],
      ['compound', 'нэгдэл', 'A substance made of two or more elements chemically combined in a fixed ratio.', 'Хоёр ба түүнээс дээш элемент тогтмол харьцаатайгаар химийн аргаар холбогдсон бодис.'],
      ['mixture', 'холимог', 'Substances mixed together but not chemically combined.', 'Химийн холбоогүй, хольсон бодисууд.']
    ],
    sec: [
      ['Telling them apart', 'Ялгах арга', 'A compound has a fixed composition and its properties differ from those of the elements that make it (water, H₂O, is not like hydrogen or oxygen). A mixture has a variable composition and each part keeps its own properties (air, or sand mixed with salt).', 'Нэгдэл нь тогтмол найрлагатай, шинж чанар нь бүрэлдэхүүн элементүүдээс ялгаатай (ус, H₂O нь устөрөгч, хүчилтөрөгчөөс огт өөр). Холимог нь найрлага хувьсах, бүрэлдэхүүн тус бүр өөрийн шинж чанараа хадгалдаг (агаар, элс ба давсны холимог).']
    ]
  },
  {
    id: 's-2-2', chapter: 'ch-atoms-bonding', ref: '2.2', en: 'Atomic structure and the Periodic Table', mn: 'Атомын бүтэц ба үелэх систем',
    sumEn: 'An atom has a nucleus of protons and neutrons surrounded by electrons in shells. The proton number identifies the element; the outer electrons decide its group and chemistry.',
    sumMn: 'Атом нь протон, нейтроноос бүрдсэн цөмтэй, түүнийг бүрхүүлд байрлах электронууд тойрсон байдаг. Протоны тоо элементийг тодорхойлж, гаднах электрон нь бүлэг ба химийн шинж чанарыг тодорхойлно.',
    obj: [
      ['2.2.1', 'Describe the atom as a nucleus of neutrons and protons with electrons in shells; state relative charges and masses.', 'Атомыг нейтрон, протонтой цөм, бүрхүүлд байрлах электронтой гэж тайлбарлаж, харьцангуй цэнэг, массыг хэлэх.'],
      ['2.2.2', 'Define proton number (atomic number) and mass number (nucleon number).', 'Протоны тоо (атомын дугаар) ба массын тоо (нуклоны тоо)-г тодорхойлох.'],
      ['2.2.3', 'Determine the electronic configuration of elements with proton number 1 to 20, e.g. 2,8,3.', 'Протоны тоо 1–20 элементүүдийн электрон бүтцийг тодорхойлох, жишээ нь 2,8,3.'],
      ['2.2.4', 'Relate outer electrons to group number, occupied shells to period number, and full outer shells to noble gases.', 'Гаднах электронийг бүлэгтэй, эзэлсэн бүрхүүлийг үетэй, бүтэн гаднах бүрхүүлийг инертийн хийтэй холбох.']
    ],
    vocab: [
      ['proton number (Z)', 'протоны тоо (Z)', 'The number of protons in the nucleus; it defines the element.', 'Цөм дэх протоны тоо; элементийг тодорхойлдог.'],
      ['mass number (A)', 'массын тоо (A)', 'The total number of protons and neutrons in the nucleus.', 'Цөм дэх протон ба нейтроны нийт тоо.'],
      ['electronic configuration', 'электрон бүтэц', 'The arrangement of electrons in shells, for example 2,8,1 for sodium.', 'Электроны бүрхүүлд байрлал, жишээ нь натрийн 2,8,1.']
    ],
    sec: [
      ['Inside the atom', 'Атомын дотор', 'Protons have a relative charge of +1 and a mass of 1. Neutrons have no charge and a mass of 1. Electrons have a charge of −1 and a negligible mass. In a neutral atom the number of electrons equals the number of protons.', 'Протон нь харьцангуй +1 цэнэг, 1 масстай. Нейтрон цэнэггүй, масс нь 1. Электрон нь −1 цэнэгтэй, масс нь бараг үл тоомсорлохуйц. Саармаг атомд электроны тоо протоны тоотой тэнцүү.'],
      ['Electrons and the Periodic Table', 'Электрон ба үелэх систем', 'Sodium is 2,8,1: one outer electron, so it is in Group I, and three shells, so it is in Period 3. Chlorine is 2,8,7: seven outer electrons (Group VII) and three shells (Period 3). Noble gases such as neon (2,8) have full outer shells and are unreactive.', 'Натри 2,8,1: гаднах 1 электрон тул I бүлэгт, 3 бүрхүүл тул 3-р үед байна. Хлор 2,8,7: гаднах 7 электрон (VII бүлэг), 3 бүрхүүл (3-р үе). Неон (2,8) гэх мэт инертийн хийн гаднах бүрхүүл бүтэн тул урвалд ордоггүй.']
    ]
  },
  {
    id: 's-2-3', chapter: 'ch-atoms-bonding', ref: '2.3', en: 'Isotopes', mn: 'Изотоп',
    sumEn: 'Isotopes are atoms of the same element with different numbers of neutrons. They have the same chemistry, and the relative atomic mass of an element is the average of its isotopes.',
    sumMn: 'Изотоп гэдэг нь ижил элементийн, нейтроны тоо өөр атомууд. Химийн шинж чанар нь ижил, элементийн харьцангуй атомын масс нь изотопуудын дундаж юм.',
    obj: [
      ['2.3.1', 'Define isotopes as atoms of the same element with the same proton number and different neutron numbers.', 'Изотопыг протоны тоо ижил, нейтроны тоо өөр ижил элементийн атом гэж тодорхойлох.'],
      ['2.3.2', 'Interpret and use atomic symbols, for example for carbon-12 and chloride ions.', 'Атомын тэмдэглэгээг ойлгож хэрэглэх, жишээ нь нүүрстөрөгч-12, хлорын ион.'],
      ['2.3.3', 'Explain why isotopes of an element have the same chemical properties.', 'Ижил элементийн изотопууд яагаад ижил химийн шинж чанартай вэ гэдгийг тайлбарлах.'],
      ['2.3.4', 'Calculate the relative atomic mass of an element from the masses and abundances of its isotopes.', 'Изотопуудын масс ба эзлэх хувиар элементийн харьцангуй атомын массыг тооцоолох.']
    ],
    vocab: [
      ['isotope', 'изотоп', 'Atoms of the same element with the same number of protons but different numbers of neutrons.', 'Протоны тоо ижил, нейтроны тоо өөр ижил элементийн атом.'],
      ['relative atomic mass (Ar)', 'харьцангуй атомын масс (Ar)', 'The average mass of the isotopes of an element compared with 1/12 of carbon-12.', 'Элементийн изотопуудын дундаж масс, нүүрстөрөгч-12-ийн 1/12-той харьцуулсан.'],
      ['abundance', 'эзлэх хувь', 'The percentage of each isotope found in a natural sample.', 'Байгалийн дээжинд байгаа изотоп тус бүрийн хувь.']
    ],
    sec: [
      ['Same element, different neutrons', 'Ижил элемент, өөр нейтрон', 'Chlorine has two common isotopes: ³⁵Cl and ³⁷Cl. Both have 17 protons and 17 electrons, so they have the same electronic configuration and react the same way. They differ only in the number of neutrons (18 and 20).', 'Хлор хоёр изотоптой: ³⁵Cl ба ³⁷Cl. Хоёулаа 17 протон, 17 электронтой тул электрон бүтэц нь ижил, ижил урвалд ордог. Зөвхөн нейтроны тоо (18 ба 20) ялгаатай.'],
      ['Average atomic mass', 'Дундаж атомын масс', 'Suppose chlorine is 75% ³⁵Cl and 25% ³⁷Cl. Ar = (75 × 35 + 25 × 37) ÷ 100 = 35.5. This is why the Periodic Table value of chlorine is not a whole number.', 'Хлор 75% ³⁵Cl, 25% ³⁷Cl гэж үзье. Ar = (75 × 35 + 25 × 37) ÷ 100 = 35.5. Үелэх системд хлорын утга бүхэл тоо биш байдаг шалтгаан энэ.']
    ]
  },
  {
    id: 's-2-5', chapter: 'ch-atoms-bonding', ref: '2.5', en: 'Simple molecules and covalent bonds', mn: 'Энгийн молекул ба ковалент холбоо',
    sumEn: 'A covalent bond is a shared pair of electrons that gives both atoms a full outer shell. Simple molecular substances have low melting and boiling points and do not conduct electricity.',
    sumMn: 'Ковалент холбоо нь хоёр атом хамтдаа электрон хосыг хуваалцаж, бүтэн гаднах бүрхүүл үүсгэх холбоо юм. Энгийн молекул бодисууд хайлах, буцлах цэг бага, цахилгаан дамжуулдаггүй.',
    obj: [
      ['2.5.1', 'State that a covalent bond is formed when a pair of electrons is shared between two atoms, leading to noble gas electronic configurations, and draw dot-and-cross diagrams for H₂, Cl₂, H₂O, CH₄, NH₃, HCl.', 'Хоёр атомын хооронд электроны хос хуваалцаж, инертийн хийн электрон бүтэц үүсэхийг хэлж, H₂, Cl₂, H₂O, CH₄, NH₃, HCl-ийн dot-and-cross диаграмм зурах.'],
      ['2.5.2', 'Explain the low melting and boiling points of simple molecular compounds in terms of weak intermolecular forces.', 'Энгийн молекул нэгдлийн хайлах, буцлах цэг бага байхыг молекул хоорондын сул хүчээр тайлбарлах.'],
      ['2.5.3', 'Explain the poor electrical conductivity of simple molecular compounds.', 'Энгийн молекул нэгдэл цахилгаан дамжуулах чадвар муу байхыг тайлбарлах.']
    ],
    vocab: [
      ['covalent bond', 'ковалент холбоо', 'A shared pair of electrons between two atoms.', 'Хоёр атомын хооронд хуваалцсан электрон хос.'],
      ['molecule', 'молекул', 'A group of atoms held together by covalent bonds.', 'Ковалент холбоогоор холбогдсон атомуудын бүлэг.'],
      ['intermolecular forces', 'молекул хоорондын хүч', 'Weak forces of attraction between separate molecules.', 'Тусдаа молекулуудын хооронд үйлчлэх сул татах хүч.']
    ],
    sec: [
      ['Sharing electrons', 'Электрон хуваалцах', 'In H₂ each hydrogen shares its electron, so each has two electrons like helium. Cl₂ shares one pair. H₂O has two bonds, NH₃ has three, CH₄ has four and HCl has one. Each atom in these molecules ends with a full outer shell.', 'H₂-д устөрөгч бүр электроноо хуваалцаж, гелитэй адил 2 электронтой болно. Cl₂ нэг хос хуваалцана. H₂O-д 2 холбоо, NH₃-д 3, CH₄-д 4, HCl-д 1 холбоо байна. Эдгээр молекулд атом бүр бүтэн гаднах бүрхүүлтэй болно.'],
      ['Why simple molecules melt easily', 'Энгийн молекул яагаад хурдан хайлдаг вэ', 'The covalent bonds inside each molecule are strong, but the forces between molecules are weak. When the substance melts or boils only these weak forces are overcome; the molecules themselves do not break apart. That is why the melting points are low.', 'Молекул дотрох ковалент холбоо хүчтэй, харин молекул хоорондын хүч сул. Бодис хайлах эсвэл буцлахад зөвхөн сул хүч эвдэрч, молекул задардаггүй. Тиймээс хайлах цэг бага.']
    ]
  },
  {
    id: 's-2-6', chapter: 'ch-atoms-bonding', ref: '2.6', en: 'Giant covalent structures', mn: 'Аварга ковалент бүтэц',
    sumEn: 'Diamond and graphite are both pure carbon but have different giant structures. Diamond is very hard; graphite conducts electricity and is slippery. Silicon(IV) oxide has a giant structure similar to diamond.',
    sumMn: 'Алмаз ба графит хоёулаа цэвэр нүүрстөрөгч боловч бүтэц нь өөр. Алмаз маш хатуу; графит цахилгаан дамжуулж, гулгамтгай. Силикон(IV) исэл нь алмазтай төстэй аварга бүтэцтэй.',
    obj: [
      ['2.6.1', 'Describe the giant covalent structures of graphite and diamond.', 'Графит ба алмазын аварга ковалент бүтцийг тодорхойлох.'],
      ['2.6.2', 'Relate the structure and bonding of graphite and diamond to their uses: graphite as a lubricant and electrode, diamond in cutting tools.', 'Графит, алмазын бүтэц, холбоог хэрэглээтэй холбох: графит тослогч ба электрод, алмаз огтлуур.'],
      ['2.6.3', 'Describe the giant covalent structure of silicon(IV) oxide and its similarity with diamond.', 'Силикон(IV) ислийн аварга ковалент бүтэц ба алмаздаа ойр байдлыг тодорхойлох.']
    ],
    vocab: [
      ['giant covalent structure', 'аварга ковалент бүтэц', 'A huge network of atoms joined by covalent bonds.', 'Ковалент холбоогоор холбогдсон атомын том сүлжээ.'],
      ['delocalised electron', 'делокалжсан электрон', 'An electron that is free to move through a structure.', 'Бүтцээр чөлөөтэй хөдөлж чадах электрон.'],
      ['lubricant', 'тослогч', 'A substance that reduces friction between surfaces.', 'Гадаргуугийн үрэлтийг багасгадаг бодис.']
    ],
    sec: [
      ['Diamond', 'Алмаз', 'Each carbon atom is bonded to four others in a rigid tetrahedral network. There are no free electrons, so diamond does not conduct electricity. The strong bonds in every direction make it very hard and give it a very high melting point, which is why it is used in cutting tools.', 'Нүүрстөрөгч бүр дөрвөн бусад атомтай тетраэдр сүлжээгээр холбогдоно. Чөлөөт электрон байхгүй тул цахилгаан дамжуулахгүй. Бүх чиглэлд хүчтэй холбоо нь маш хатуу, хайлах цэг өндөр болгож, огтлуурт ашиглагдана.'],
      ['Graphite', 'Графит', 'Each carbon atom bonds to three others, forming flat hexagonal layers. Each carbon has one delocalised electron that can move along the layers, so graphite conducts. The layers slide over each other because the forces between them are weak, which makes graphite a lubricant.', 'Нүүрстөрөгч бүр гурван бусад атомтай холбогдож, хавтгай зургаан өнцөгт давхарга үүсгэнэ. Нүүрстөрөгч бүрт давхарга дагуу хөдөлж чадах нэг делокалжсан электрон байдаг тул графит цахилгаан дамжуулна. Давхаргын хооронд сул хүч тул гулсаж, тослогч болно.']
    ]
  },
  {
    id: 's-2-7', chapter: 'ch-atoms-bonding', ref: '2.7', en: 'Metallic bonding', mn: 'Металл холбоо',
    sumEn: 'In a metal, positive ions form a giant lattice surrounded by a sea of delocalised electrons. The electrostatic attraction holds the metal together, and the free electrons explain conductivity and malleability.',
    sumMn: 'Металлд эерэг ионууд аварга тор үүсгэж, делокалжсан электроны "далай" тэдгээрийг тойрно. Цахилгаан таталт металлыг холбоно; чөлөөт электрон нь дамжуулах чадвар ба нарийн хэлбэрт орох чадварыг тайлбарлана.',
    obj: [
      ['2.7.1', 'Describe metallic bonding as the electrostatic attraction between positive ions in a giant lattice and a sea of delocalised electrons.', 'Металл холбоог аварга торонд байгаа эерэг ион ба делокалжсан электроны хооронд үйлчлэх цахилгаан таталт гэж тодорхойлох.'],
      ['2.7.2', 'Explain in terms of structure and bonding the good electrical conductivity, malleability and ductility of metals.', 'Металлын сайн дамжуулах чадвар, нарийн хэлбэрт орох ба сунах чадварыг бүтэц, холбоогоор тайлбарлах.']
    ],
    vocab: [
      ['metallic bonding', 'металл холбоо', 'Electrostatic attraction between positive metal ions and delocalised electrons.', 'Эерэг металл ион ба делокалжсан электроны хоорондох цахилгаан таталт.'],
      ['malleable', 'нарийн хэлбэрт орох', 'Able to be hammered or bent into shape without breaking.', 'Хугарахгүйгээр алхах, нугалах замаар хэлбэрт оруулж болох.'],
      ['ductile', 'сунадаг', 'Able to be drawn into wires.', 'Утас болгон сунгаж болох.']
    ],
    sec: [
      ['Structure of a metal', 'Металлын бүтэц', 'The metal atoms lose their outer electrons, which become delocalised. The metal is a regular giant lattice of positive ions in a sea of electrons, and the attraction between them holds the structure together.', 'Металлын атом гаднах электроноо алдаж, тэдгээр нь делокалжино. Металл нь электроны далай дотор эерэг ионоос бүрдсэн тогтмол аварга тор бөгөөд тэдгээрийн хоорондох таталт бүтцийг холбоно.'],
      ['Conductivity and malleability', 'Дамжуулах чадвар ба нарийн хэлбэрт орох', 'Delocalised electrons carry charge through the metal, so it conducts electricity. When a force is applied, the layers of ions can slide over each other while the electron sea stays in place, so the metal can be bent or drawn without breaking.', 'Делокалжсан электрон цэнэгийг металлаар дамжуулдаг тул цахилгаан дамжуулна. Хүч үйлчлэхэд ионы давхарга электроны далайд байхдаа гулсах тул металл хугарахгүйгээр нугалагдаж, сунаж болно.']
    ]
  },
  {
    id: 's-3-1', chapter: 'ch-stoichiometry', ref: '3.1', en: 'Formulae and equations', mn: 'Томьёо ба тэгшитгэл',
    sumEn: 'A molecular formula gives the actual atoms in a molecule; an empirical formula gives the simplest ratio; an ionic formula balances the charges. Equations show reactants forming products, with state symbols.',
    sumMn: 'Молекул томьёо нь молекулд байгаа атомын жинхэнэ тоо; эмпирик томьёо нь хамгийн энгийн харьцаа; ионы томьёо нь цэнэгийг тэнцүүлнэ. Тэгшитгэл нь урвалжаас бүтээгдэхүүн үүсэхийг төлөв тэмдэгтэй харуулна.',
    obj: [
      ['3.1.1', 'State the formulae of the elements and compounds named in the subject content.', 'Хичээлийн агуулгад нэрлэгдсэн элемент, нэгдлийн томьёог хэлэх.'],
      ['3.1.2', 'Define molecular formula and empirical formula.', 'Молекул томьёо ба эмпирик томьёог тодорхойлох.'],
      ['3.1.3', 'Deduce the formula of an ionic compound from the charges on its ions.', 'Ионы цэнэгээс ионы нэгдлийн томьёог гаргах.'],
      ['3.1.4', 'Construct word and symbol equations, including state symbols and ionic equations.', 'Үгэн ба тэмдэгт тэгшитгэл, төлөв тэмдэг, ионы тэгшитгэл бичих.']
    ],
    vocab: [
      ['molecular formula', 'молекул томьёо', 'The actual number and type of atoms in one molecule.', 'Нэг молекулд байгаа атомын жинхэнэ тоо, төрөл.'],
      ['empirical formula', 'эмпирик томьёо', 'The simplest whole-number ratio of the atoms or ions in a compound.', 'Нэгдэл дэх атом ба ионы хамгийн энгийн бүхэл тооны харьцаа.'],
      ['state symbol', 'төлөв тэмдэг', '(s), (l), (g) or (aq) written after a substance in an equation.', 'Тэгшитгэлд бодисын дараа бичигдэх (s), (l), (g), (aq).']
    ],
    sec: [
      ['Ionic formulae from charges', 'Цэнэгээс ионы томьёо гаргах', 'Na⁺ + Cl⁻ gives NaCl. Mg²⁺ + O²⁻ gives MgO. Al³⁺ + SO₄²⁻ gives Al₂(SO₄)₃, because two Al³⁺ (+6) balance three SO₄²⁻ (−6).', 'Na⁺ + Cl⁻ → NaCl. Mg²⁺ + O²⁻ → MgO. Al³⁺ + SO₄²⁻ → Al₂(SO₄)₃, учир нь хоёр Al³⁺ (+6) гурван SO₄²⁻ (−6)-г тэнцүүлнэ.'],
      ['Writing equations', 'Тэгшитгэл бичих', 'Word equation: hydrogen + oxygen → water. Symbol equation with state symbols: 2H₂(g) + O₂(g) → 2H₂O(l). Check that the number of each atom is the same on both sides.', 'Үгэн тэгшитгэл: устөрөгч + хүчилтөрөгч → ус. Төлөв тэмдэгтэй тэмдэгт тэгшитгэл: 2H₂(g) + O₂(g) → 2H₂O(l). Хоёр талд атом бүрийн тоо тэнцүү байгааг шалга.']
    ]
  },
  {
    id: 's-3-2', chapter: 'ch-stoichiometry', ref: '3.2', en: 'Relative masses of atoms and molecules', mn: 'Атом, молекулын харьцангуй масс',
    sumEn: 'Relative atomic mass (Ar) and relative molecular or formula mass (Mr) are compared with 1/12 of carbon-12. Reacting masses in simple proportions can be read straight from a balanced equation.',
    sumMn: 'Харьцангуй атомын масс (Ar) ба харьцангуй молекул (Mr) масс нь нүүрстөрөгч-12-ийн 1/12-той харьцуулсан. Тэнцүүлсэн тэгшитгэлээс урвалын массыг шууд уншиж болно.',
    obj: [
      ['3.2.1', 'Describe relative atomic mass, Ar, and relative molecular / formula mass, Mr.', 'Харьцангуй атомын масс Ar ба харьцангуй молекул/томьёоны масс Mr-г тодорхойлох.'],
      ['3.2.2', 'Calculate Mr from Ar values.', 'Ar утгуудаас Mr-г тооцоолох.'],
      ['3.2.3', 'Calculate reacting masses in simple proportions, without using the mole.', 'Моль ашиглахгүйгээр энгийн харьцаагаар урвалын массыг тооцоолох.']
    ],
    vocab: [
      ['relative atomic mass (Ar)', 'харьцангуй атомын масс (Ar)', 'The average mass of the isotopes of an element compared with 1/12 of carbon-12.', 'Изотопуудын дундаж масс, нүүрстөрөгч-12-ийн 1/12-той харьцуулсан.'],
      ['relative formula mass (Mr)', 'харьцангуй томьёоны масс (Mr)', 'The sum of the relative atomic masses in a formula, used for ionic compounds.', 'Томьёо дахь Ar-уудын нийлбэр; ионы нэгдэлд хэрэглэнэ.'],
      ['reacting mass', 'урвалын масс', 'The mass of a substance that reacts with or is produced from another in an equation.', 'Тэгшитгэлд өөр бодистой урвалд орох эсвэл үүсэх бодисын масс.']
    ],
    sec: [
      ['Calculating Mr', 'Mr тооцоолох', 'Mr of CaCO₃ = 40 + 12 + (3 × 16) = 100. Mr of CO₂ = 12 + (2 × 16) = 44.', 'Mr (CaCO₃) = 40 + 12 + (3 × 16) = 100. Mr (CO₂) = 12 + (2 × 16) = 44.'],
      ['Reacting masses in proportion', 'Харьцаагаар урвалын масс', 'For CaCO₃ → CaO + CO₂: 100 g of calcium carbonate gives 56 g of calcium oxide and 44 g of carbon dioxide. To find the mass for another amount, scale the whole proportion.', 'CaCO₃ → CaO + CO₂: 100 г кальцийн карбонатаас 56 г кальцийн исэл, 44 г нүүрсхүчлийн хий үүснэ. Өөр массын хувьд бүх харьцааг тохируулна.']
    ]
  },
  {
    id: 's-4-2', chapter: 'ch-electrochemistry', ref: '4.2', en: 'Hydrogen–oxygen fuel cells', mn: 'Устөрөгч–хүчилтөрөгчийн түлшний элемент',
    sumEn: 'A hydrogen–oxygen fuel cell uses hydrogen and oxygen to make electricity, and water is its only chemical product. Compared with petrol engines it produces no carbon dioxide where it is used, but the hydrogen must be produced and stored.',
    sumMn: 'Устөрөгч–хүчилтөрөгчийн түлшний элемент нь устөрөгч ба хүчилтөрөгчөөр цахилгаан үйлдвэрлэж, зөвхөн ус гаргана. Бензинтэй харьцуулахад ашиглах газар нүүрсхүчлийн хий ялгаруулахгүй, гэхдээ устөрөгчийг үйлдвэрлэж, хадгалах шаардлагатай.',
    obj: [
      ['4.2.1', 'State that a hydrogen–oxygen fuel cell uses hydrogen and oxygen to produce electricity, with water as the only chemical product.', 'Устөрөгч–хүчилтөрөгчийн түлшний элемент нь устөрөгч, хүчилтөрөгчөөр цахилгаан гаргаж, цорын ганц химийн бүтээгдэхүүн нь ус гэдгийг хэлэх.'],
      ['4.2.2', 'Describe the advantages and disadvantages of hydrogen–oxygen fuel cells compared with petrol engines in vehicles.', 'Устөрөгч–хүчилтөрөгчийн түлшний элементийн давуу ба сул талыг бензин хөдөлгүүртэй харьцуулан тайлбарлах.']
    ],
    vocab: [
      ['fuel cell', 'түлшний элемент', 'A device that turns the chemical energy of a fuel directly into electrical energy.', 'Түлшний химийн энергийг шууд цахилгаан энерги болгож хувиргах төхөөрөмж.'],
      ['electrolyte', 'электролит', 'The substance in a cell that carries ions between the electrodes.', 'Элементэд электродуудын хооронд ион дамжуулдаг бодис.']
    ],
    sec: [
      ['How it works', 'Яаж ажилладаг вэ', 'Hydrogen is supplied to one electrode and oxygen to the other. Hydrogen is oxidised and the electrons flow through the external circuit, giving an electric current. At the other electrode oxygen is reduced and combines with the ions to form water.', 'Устөрөгчийг нэг электродод, хүчилтөрөгчийг нөгөөд нийлүүлнэ. Устөрөгч исэлдэж, электрон гадаад хэлхээгээр урсаж цахилгаан гүйдэл үүснэ. Нөгөө электродод хүчилтөрөгч бууруулагдаж, ионтой нийлээд ус үүсгэнэ.'],
      ['Advantages and disadvantages', 'Давуу ба сул тал', 'Advantages: no carbon dioxide or pollutants at the point of use, and water is the only product. Disadvantages: hydrogen is hard to store and is mostly made from fossil fuels, and the fuel cell and tank are expensive to build.', 'Давуу тал: ашиглах газар нүүрсхүчлийн хий, бохирдуулагч гаргахгүй, зөвхөн ус гарна. Сул тал: устөрөгчийг хадгалахад хүндрэлтэй, ихэвчлэн чулуужсан түлшнээс үйлдвэрлэдэг, элемент ба савыг үйлдвэрлэхэд өндөр зардалтай.']
    ]
  },
  {
    id: 's-5-1', chapter: 'ch-energetics', ref: '5.1', en: 'Exothermic and endothermic reactions', mn: 'Экзотерм ба эндотерм урвал',
    sumEn: 'Exothermic reactions release thermal energy, so the surroundings warm up and ΔH is negative. Endothermic reactions take in energy and the surroundings cool; ΔH is positive. Breaking bonds needs energy; making bonds releases energy.',
    sumMn: 'Экзотерм урвал дулаан ялгаруулж, орчин халдаг, ΔH сөрөг. Эндотерм урвал энерги авч, орчин хөрдөг, ΔH эерэг. Холбоо таслахад энерги зарцуулж, холбоо үүсэхэд энерги ялгарна.',
    obj: [
      ['5.1.1', 'State that exothermic reactions raise the temperature of the surroundings and endothermic reactions lower it.', 'Экзотерм урвал орчныг халааж, эндотерм урвал хөргөдөг гэж хэлэх.'],
      ['5.1.2', 'Interpret reaction pathway diagrams for exothermic and endothermic reactions.', 'Экзотерм ба эндотерм урвалын энергийн муруйг тайлбарлах.'],
      ['5.1.3', 'Define enthalpy change ΔH and activation energy Eₐ.', 'Энтальпийн өөрчлөлт ΔH ба идэвхжлийн энергi Eₐ-г тодорхойлох.'],
      ['5.1.4', 'Explain the enthalpy change in terms of bond breaking (endothermic) and bond making (exothermic).', 'Холбоо таслах (эндотерм) ба холбоо үүсэх (экзотерм)-ээр ΔH-г тайлбарлах.'],
      ['5.1.5', 'Calculate the enthalpy change of a reaction using bond energies.', 'Холбооны энергээр урвалын ΔH-г тооцоолох.']
    ],
    vocab: [
      ['exothermic', 'экзотерм', 'A reaction that releases energy to the surroundings.', 'Орчинд энерги ялгаруулдаг урвал.'],
      ['endothermic', 'эндотерм', 'A reaction that takes in energy from the surroundings.', 'Орчноос энерги авдаг урвал.'],
      ['activation energy (Eₐ)', 'идэвхжлийн энерги (Eₐ)', 'The minimum energy colliding particles must have to react.', 'Мөргөлдсөн бөөмс урвалд орохын тулд хамгийн бага шаардлагатай энерги.'],
      ['bond energy', 'холбооны энерги', 'The energy needed to break one mole of a particular bond.', 'Тодорхой холбооны нэг моль таслахад шаардагдах энерги.']
    ],
    sec: [
      ['Energy profiles', 'Энергийн муруй', 'In an exothermic reaction the products are lower in energy than the reactants, so ΔH is negative. In an endothermic reaction the products are higher, so ΔH is positive. Both kinds need an activation energy hump to be climbed before the reaction can happen.', 'Экзотерм урвалд бүтээгдэхүүн урвалжаасаа бага энергитэй тул ΔH сөрөг. Эндотерм урвалд бүтээгдэхүүн өндөр энергитэй тул ΔH эерэг. Аль аль нь урвал явахаас өмнө идэвхжлийн энергийн босго давах шаардлагатай.'],
      ['Bond energies', 'Холбооны энерги', 'For CH₄ + 2O₂ → CO₂ + 2H₂O: bonds broken = 4(C–H 435) + 2(O=O 498) = 2736 kJ/mol. Bonds made = 2(C=O 805) + 4(O–H 464) = 3466 kJ/mol. ΔH = 2736 − 3466 = −730 kJ/mol, so the reaction is exothermic.', 'CH₄ + 2O₂ → CO₂ + 2H₂O: таслагдсан холбоо = 4(C–H 435) + 2(O=O 498) = 2736 кДж/моль. Үүссэн холбоо = 2(C=O 805) + 4(O–H 464) = 3466 кДж/моль. ΔH = 2736 − 3466 = −730 кДж/моль, тиймээс урвал экзотерм.']
    ]
  }
];

export const TOPICS_A = SPECS.map(buildTopic);
