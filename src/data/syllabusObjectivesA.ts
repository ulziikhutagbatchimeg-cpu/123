// Learning statements from the Cambridge IGCSE 0620 (2026–2028) subject content, sections 1–4.
// Each entry is [statement number, English, Mongolian, extended?]. "x" marks Extended (Supplement) statements.
// Paraphrased; the syllabus numbering is kept so every statement can be checked.
export type ObjRow = [number, string, string, 'x'?];

export const OBJECTIVES_A: Record<string, ObjRow[]> = {
  '1.1': [
    [1, 'State the distinguishing properties of solids, liquids and gases.', 'Хатуу, шингэн, хийн ялгах шинж чанарыг хэлэх.'],
    [2, 'Describe the structures of solids, liquids and gases in terms of particle separation, arrangement and motion.', 'Хатуу, шингэн, хийн бүтцийг бөөмсийн зай, байрлал, хөдөлгөөнөөр тодорхойлох.'],
    [3, 'Describe changes of state in terms of melting, boiling, evaporating, freezing and condensing.', 'Төлөв өөрчлөлтийг хайлах, буцлах, уурших, хөрөх, конденсацлагдахаар тодорхойлох.'],
    [4, 'Describe the effects of temperature and pressure on the volume of a gas.', 'Температур ба даралт хийн эзлэхүүнд үзүүлэх нөлөөг тодорхойлох.'],
    [5, 'Explain changes of state in terms of kinetic particle theory, including the interpretation of heating and cooling curves.', 'Төлөв өөрчлөлтийг кинетик бөөмийн онолоор тайлбарлаж, халаалт, хөргөлтийн муруйг тайлбарлах.', 'x'],
    [6, 'Explain, in terms of kinetic particle theory, the effects of temperature and pressure on the volume of a gas.', 'Температур ба даралт хийн эзлэхүүнд үзүүлэх нөлөөг кинетик бөөмийн онолоор тайлбарлах.', 'x']
  ],
  '1.2': [
    [1, 'Describe and explain diffusion in terms of kinetic particle theory.', 'Диффузийг кинетик бөөмийн онолоор тодорхойлж, тайлбарлах.'],
    [2, 'Describe and explain the effect of relative molecular mass on the rate of diffusion of gases.', 'Харьцангуй молекул масс хийн диффузийн хурдад үзүүлэх нөлөөг тодорхойлж, тайлбарлах.', 'x']
  ],
  '2.1': [
    [1, 'Describe the differences between elements, compounds and mixtures.', 'Элемент, нэгдэл, холимогийн ялгааг тодорхойлох.']
  ],
  '2.2': [
    [1, 'Describe the structure of the atom as a central nucleus of protons and neutrons, surrounded by electrons in shells.', 'Атомын бүтцийг протон, нейтроноос бүрдсэн цөм, бүрхүүлд байрлах электроноор тодорхойлох.'],
    [2, 'State the relative charges and relative masses of a proton, a neutron and an electron.', 'Протон, нейтрон, электроны харьцангуй цэнэг ба массыг хэлэх.'],
    [3, 'Define proton number (atomic number) as the number of protons in the nucleus of an atom.', 'Протоны тоо (атомын дугаар)-г цөм дэх протоны тоо гэж тодорхойлох.'],
    [4, 'Define mass number (nucleon number) as the total number of protons and neutrons in the nucleus.', 'Массын тоо (нуклоны тоо)-г цөм дэх протон, нейтроны нийт тоо гэж тодорхойлох.'],
    [5, 'Determine the electronic configuration of elements and their ions with proton number 1 to 20, e.g. 2,8,3.', 'Протоны тоо 1–20 элемент ба тэдгээрийн ионы электрон бүтцийг тодорхойлох, жишээ нь 2,8,3.'],
    [6, 'State that Group VIII noble gases have a full outer shell; the number of outer electrons equals the group number (I–VII); the number of occupied shells equals the period number.', 'VIII бүлгийн инерт хийн гаднах бүрхүүл бүтэн; гаднах электрон нь бүлгийн дугаартай (I–VII) тэнцүү; эзэлсэн бүрхүүл нь үеийн дугаартай тэнцүү гэж хэлэх.']
  ],
  '2.3': [
    [1, 'Define isotopes as atoms of the same element with the same number of protons but different numbers of neutrons.', 'Изотопыг протоны тоо ижил, нейтроны тоо өөр ижил элементийн атом гэж тодорхойлох.'],
    [2, 'Interpret and use symbols for atoms and ions, e.g. the symbols for carbon-12 and the chloride ion.', 'Атом ба ионы тэмдэгтийг ойлгож хэрэглэх, жишээ нь нүүрстөрөгч-12, хлорын ион.'],
    [3, 'State that isotopes of the same element have the same chemical properties because they have the same electronic configuration.', 'Ижил элементийн изотопууд ижил электрон бүтэцтэй тул ижил химийн шинж чанартай гэж хэлэх.', 'x'],
    [4, 'Calculate the relative atomic mass of an element from the relative masses and abundances of its isotopes.', 'Изотопуудын масс, эзлэх хувиар элементийн харьцангуй атомын массыг тооцоолох.', 'x']
  ],
  '2.4': [
    [1, 'Describe the formation of positive ions (cations) and negative ions (anions).', 'Эерэг ион (катион) ба сөрөг ион (анион) хэрхэн үүсэхийг тодорхойлох.'],
    [2, 'State that an ionic bond is a strong electrostatic attraction between oppositely charged ions.', 'Ионы холбоо нь эсрэг цэнэгтэй ионы хооронд үйлчлэх хүчтэй цахилгаан таталт гэж хэлэх.'],
    [3, 'Describe the formation of ionic bonds between Group I and Group VII elements, using dot-and-cross diagrams.', 'I ба VII бүлгийн элементийн хооронд ионы холбоо үүсэхийг dot-and-cross диаграммаар тодорхойлох.'],
    [4, 'Describe the properties of ionic compounds: high melting and boiling points; good electrical conductivity when aqueous or molten, and poor when solid.', 'Ионы нэгдлийн шинж чанар: хайлах, буцлах цэг өндөр; уусмал эсвэл хайлмал дээр сайн, хатуу байхад муу цахилгаан дамжуулна.'],
    [5, 'Describe the giant lattice structure of ionic compounds as a regular arrangement of alternating positive and negative ions.', 'Ионы нэгдлийн аварга торыг эерэг, сөрөг ионыг ээлжлэн байрлуулсан тогтмол бүтэц гэж тодорхойлох.', 'x'],
    [6, 'Describe the formation of ionic bonds between metallic and non-metallic elements, including dot-and-cross diagrams.', 'Металл ба металл бус элементийн хооронд ионы холбоо үүсэхийг dot-and-cross диаграммаар тодорхойлох.', 'x'],
    [7, 'Explain in terms of structure and bonding the high melting and boiling points and the conductivity of ionic compounds.', 'Ионы нэгдлийн өндөр хайлах, буцлах цэг, цахилгаан дамжуулах чадварыг бүтэц ба холбооны үүднээс тайлбарлах.', 'x']
  ],
  '2.5': [
    [1, 'State that a covalent bond is formed when a pair of electrons is shared between two atoms, giving noble gas configurations.', 'Ковалент холбоо нь хоёр атом электрон хос хуваалцаж, инерт хийн электрон бүтэцтэй болох үед үүснэ гэж хэлэх.'],
    [2, 'Describe the formation of covalent bonds in H₂, Cl₂, H₂O, CH₄, NH₃ and HCl, using dot-and-cross diagrams.', 'H₂, Cl₂, H₂O, CH₄, NH₃, HCl-д ковалент холбоо үүсэхийг dot-and-cross диаграммаар тодорхойлох.'],
    [3, 'Describe in terms of structure and bonding the properties of simple molecular compounds: low melting and boiling points, and poor electrical conductivity.', 'Энгийн молекул нэгдлийн шинж чанарыг бүтэц, холбоогоор тодорхойлох: хайлах, буцлах цэг бага, цахилгаан дамжуулах чадвар муу.'],
    [4, 'Describe the formation of covalent bonds in CH₃OH, C₂H₄, O₂, CO₂ and N₂, using dot-and-cross diagrams.', 'CH₃OH, C₂H₄, O₂, CO₂, N₂-д ковалент холбоо үүсэхийг dot-and-cross диаграммаар тодорхойлох.', 'x'],
    [5, 'Explain simple molecular properties in terms of weak intermolecular forces (low melting and boiling points) and poor electrical conductivity.', 'Энгийн молекул нэгдлийн шинж чанарыг молекул хоорондын сул хүчээр (хайлах, буцлах цэг бага) ба цахилгаан дамжуулах чадвар муугаар тайлбарлах.', 'x']
  ],
  '2.6': [
    [1, 'Describe the giant covalent structures of graphite and diamond.', 'Графит ба алмазын аварга ковалент бүтцийг тодорхойлох.'],
    [2, 'Relate the structures and bonding of graphite and diamond to their uses: graphite as a lubricant and as an electrode; diamond in cutting tools.', 'Графит, алмазын бүтэц, холбоог хэрэглээтэй холбох: графит тослогч ба электрод; алмаз огтлуурт.'],
    [3, 'Describe the giant covalent structure of silicon(IV) oxide, SiO₂.', 'Силикон(IV) ислийн (SiO₂) аварга ковалент бүтцийг тодорхойлох.', 'x'],
    [4, 'Describe the similarity in properties between diamond and silicon(IV) oxide, related to their structures.', 'Алмаз ба SiO₂-ийн шинж чанар ижил байгааг бүтэцтэй нь холбож тодорхойлох.', 'x']
  ],
  '2.7': [
    [1, 'Describe metallic bonding as the electrostatic attraction between the positive ions in a giant metallic lattice and a sea of delocalised electrons.', 'Металл холбоог аварга металл торын эерэг ион ба делокалжсан электроны далайн хооронд үйлчлэх цахилгаан таталт гэж тодорхойлох.'],
    [2, 'Explain in terms of structure and bonding the good electrical conductivity, malleability and ductility of metals.', 'Металлын сайн цахилгаан дамжуулах чадвар, нарийн хэлбэрт орох, сунах чадварыг бүтэц, холбоогоор тайлбарлах.']
  ],
  '3.1': [
    [1, 'State the formulae of the elements and compounds named in the subject content.', 'Хичээлийн агуулгад нэрлэгдсэн элемент, нэгдлийн томьёог хэлэх.'],
    [2, 'Define the molecular formula of a compound as the number and type of different atoms in one molecule.', 'Молекул томьёог нэг молекул дахь атомын төрөл, тоо гэж тодорхойлох.'],
    [3, 'Deduce the formula of a simple compound from the relative numbers of atoms present in a model or diagram.', 'Загвар эсвэл зурагт байгаа атомын харьцаанаас энгийн нэгдлийн томьёог гаргах.'],
    [4, 'Construct word equations and symbol equations to show how reactants form products, including state symbols.', 'Урвалжаас бүтээгдэхүүн үүсэхийг харуулсан үгэн ба тэмдэгт тэгшитгэлийг төлөв тэмдэгтэй бичих.'],
    [5, 'Define the empirical formula as the simplest whole-number ratio of the atoms or ions in a compound.', 'Эмпирик томьёог нэгдэл дэх атом ба ионы хамгийн энгийн бүхэл тооны харьцаа гэж тодорхойлох.', 'x'],
    [6, 'Deduce the formula of an ionic compound from the relative numbers of ions, or from the charges on the ions.', 'Ионы нэгдлийн томьёог ионы харьцаа эсвэл ионы цэнэгээс гаргах.', 'x'],
    [7, 'Construct symbol equations with state symbols, including ionic equations.', 'Төлөв тэмдэгттэй тэмдэгт тэгшитгэл, ионы тэгшитгэлийг бичих.', 'x'],
    [8, 'Deduce the symbol equation with state symbols for a chemical reaction, given relevant information.', 'Өгөгдсөн мэдээллээр химийн урвалын төлөв тэмдэгттэй тэмдэгт тэгшитгэлийг гаргах.', 'x']
  ],
  '3.2': [
    [1, 'Describe relative atomic mass, Aᵣ, as the average mass of the isotopes of an element compared with 1/12th of the mass of a carbon-12 atom.', 'Харьцангуй атомын масс Aᵣ-г элементийн изотопуудын дундаж массыг нүүрстөрөгч-12 атомын массын 1/12-тэй харьцуулсан гэж тодорхойлох.'],
    [2, 'Define relative molecular mass, Mᵣ, as the sum of the relative atomic masses; relative formula mass is used for ionic compounds.', 'Харьцангуй молекул масс Mᵣ-г Aᵣ-ийн нийлбэр гэж тодорхойлох; ионы нэгдэлд томьёоны масс хэрэглэнэ.'],
    [3, 'Calculate reacting masses in simple proportions, without using the mole concept.', 'Моль ашиглахгүйгээр энгийн харьцаагаар урвалын массыг тооцоолох.']
  ],
  '3.3': [
    [1, 'State that concentration can be measured in g/dm³ or mol/dm³.', 'Концентрацийг г/дм³ эсвэл моль/дм³-ээр хэмжиж болохыг хэлэх.'],
    [2, 'State that the mole is the unit of amount of substance, and that one mole contains 6.02 × 10²³ particles (the Avogadro constant).', 'Моль нь бодисын хэмжээний нэгж, нэг моль 6.02 × 10²³ бөөмтэй (Авогадро тоо) гэж хэлэх.', 'x'],
    [3, 'Use amount (mol) = mass (g) ÷ molar mass (g/mol) to calculate the amount, mass, molar mass, relative atomic or molecular/formula mass, and number of particles.', 'Моль = масс ÷ молийн масс томьёогоор хэмжээ, масс, молийн масс, Aᵣ/Mᵣ, бөөмийн тоог тооцоолох.', 'x'],
    [4, 'Use the molar gas volume, 24 dm³ at room temperature and pressure (r.t.p.), in gas calculations.', 'Хийн молийн эзлэхүүн 24 дм³ (r.t.p.)-ийг хийтэй холбоотой тооцоонд хэрэглэх.', 'x'],
    [5, 'Calculate stoichiometric reacting masses, limiting reactants, gas volumes at r.t.p., solution volumes and concentrations (g/dm³ and mol/dm³), including conversion between cm³ and dm³.', 'Стехиометрийн урвалын масс, хязгаарлагч урвалж, r.t.p. дахь хийн эзлэхүүн, уусмалын эзлэхүүн, концентрацийг (г/дм³, моль/дм³) тооцоолох, см³ ↔ дм³ хөрвүүлэх.', 'x'],
    [6, 'Use experimental data from a titration to calculate the moles of solute, or the concentration or volume of a solution.', 'Титрлэлтийн туршилтын өгөгдлөөр уусгагдах бодисын моль, уусмалын концентраци эсвэл эзлэхүүнийг тооцоолох.', 'x'],
    [7, 'Calculate empirical and molecular formulae, given appropriate data.', 'Тохирох өгөгдлөөр эмпирик ба молекул томьёог тооцоолох.', 'x'],
    [8, 'Calculate percentage yield, percentage composition by mass and percentage purity, given appropriate data.', 'Тохирох өгөгдлөөр гарцын хувь, массын хувиар найрлага, цэвэршлийн хувийг тооцоолох.', 'x']
  ],
  '4.1': [
    [1, 'Define electrolysis as the decomposition of an ionic compound, when molten or in aqueous solution, by the passage of an electric current.', 'Электролизийг ионы нэгдлийг хайлмал эсвэл уусмалд цахилгаан гүйдлээр задлах үйл явц гэж тодорхойлох.'],
    [2, 'Identify in simple electrolytic cells the anode (positive electrode), the cathode (negative electrode) and the electrolyte.', 'Энгийн электролиз элементэд анод (эерэг), катод (сөрөг), электролитийг таних.'],
    [3, 'Identify the products formed at the electrodes and describe the observations for the electrolysis of molten lead(II) bromide, concentrated aqueous sodium chloride and dilute sulfuric acid, using inert electrodes (platinum or carbon/graphite).', 'Хар тугалга(II) бромид, өтгөрүүлсэн NaCl, шингэрүүлсэн H₂SO₄-ийн электролизд (платин эсвэл нүүрстөрөгч электрод) электродын бүтээгдэхүүн ба ажиглалтыг тодорхойлох.'],
    [4, 'State that metals or hydrogen are formed at the cathode and that non-metals (other than hydrogen) are formed at the anode.', 'Катодод металл эсвэл устөрөгч, анодод устөрөгчөөс бусад металл бус элемент үүснэ гэж хэлэх.'],
    [5, 'Predict the identity of the products at each electrode for the electrolysis of a binary compound in the molten state.', 'Хайлсан хоёр элементийн нэгдлийн электролизд электрод бүрийн бүтээгдэхүүнийг таамаглах.'],
    [6, 'State that metal objects are electroplated to improve their appearance and resistance to corrosion.', 'Металл эдлэлийг гадаад төрх, зэврэлтэд тэсвэртэй байдлыг сайжруулахаар цахилгаанаар бүрдэгийг хэлэх.'],
    [7, 'Describe how metals are electroplated.', 'Металлыг цахилгаанаар хэрхэн бүрдэгийг тодорхойлох.'],
    [8, 'Describe the transfer of charge during electrolysis: the movement of electrons in the external circuit, the loss or gain of electrons at the electrodes, and the movement of ions in the electrolyte.', 'Электролизийн үеийн цэнэгийн шилжилтийг тодорхойлох: гадаад хэлхээний электроны хөдөлгөөн, электродын электрон алдах/авах, электролит дахь ионы хөдөлгөөн.', 'x'],
    [9, 'Identify the products formed at the electrodes and describe the observations for the electrolysis of aqueous copper(II) sulfate using inert carbon electrodes and using copper electrodes.', 'Копперийн(II) сульфатын уусмалын электролизд (нүүрстөрөгч ба зэс электрод) электродын бүтээгдэхүүн ба ажиглалтыг тодорхойлох.', 'x'],
    [10, 'Predict the products at each electrode for the electrolysis of a halide compound in dilute or concentrated aqueous solution.', 'Галид нэгдлийн шингэрүүлсэн эсвэл өтгөрүүлсэн уусмалын электролизд электрод бүрийн бүтээгдэхүүнийг таамаглах.', 'x'],
    [11, 'Construct ionic half-equations for reactions at the anode (oxidation) and at the cathode (reduction).', 'Анод (исэлдэлт) ба катодын (бууралт) урвалд ионы хагас тэгшитгэл бичих.', 'x']
  ],
  '4.2': [
    [1, 'State that a hydrogen–oxygen fuel cell uses hydrogen and oxygen to produce electricity, with water as the only chemical product.', 'Устөрөгч–хүчилтөрөгчийн түлшний элемент цахилгаан гаргахдаа зөвхөн ус гаргадгийг хэлэх.'],
    [2, 'Describe the advantages and disadvantages of hydrogen–oxygen fuel cells compared with petrol engines in vehicles.', 'Устөрөгч–хүчилтөрөгчийн түлшний элементийн давуу ба сул талыг бензин хөдөлгүүртэй харьцуулан тодорхойлох.', 'x']
  ]
};
