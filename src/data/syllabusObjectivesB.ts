// Learning statements from the Cambridge IGCSE 0620 (2026–2028) subject content, sections 5–8.
// Each entry is [statement number, English, Mongolian, extended?]. "x" marks Extended (Supplement) statements.
import type { ObjRow } from './syllabusObjectivesA';

export const OBJECTIVES_B: Record<string, ObjRow[]> = {
  '5.1': [
    [1, 'State that an exothermic reaction transfers thermal energy to the surroundings, leading to an increase in the temperature of the surroundings.', 'Экзотерм урвал дулааныг орчинд шилжүүлж, орчны температур нэмэгдэхийг хэлэх.'],
    [2, 'State that an endothermic reaction takes in thermal energy from the surroundings, leading to a decrease in the temperature of the surroundings.', 'Эндотерм урвал орчноос дулаан авч, орчны температур буурахыг хэлэх.'],
    [3, 'Interpret reaction pathway diagrams showing exothermic and endothermic reactions.', 'Экзотерм ба эндотерм урвалын энергийн муруйг тайлбарлах.'],
    [4, 'State that the transfer of thermal energy during a reaction is the enthalpy change, ΔH; ΔH is negative for exothermic and positive for endothermic reactions.', 'Урвалын үеийн дулааны шилжилтийг энтальпийн өөрчлөлт ΔH гэж хэлэх; экзотермд ΔH сөрөг, эндотермд эерэг.', 'x'],
    [5, 'Define activation energy, Eₐ, as the minimum energy that colliding particles must have to react.', 'Идэвхжлийн энерги Eₐ-г мөргөлдсөн бөөмс урвалд орохын тулд шаардлагатай хамгийн бага энерги гэж тодорхойлох.', 'x'],
    [6, 'Draw and label reaction pathway diagrams for exothermic and endothermic reactions, showing reactants, products, ΔH and Eₐ.', 'Экзотерм ба эндотерм урвалын энергийн муруйг урвалж, бүтээгдэхүүн, ΔH, Eₐ-тай зурж шошголох.', 'x'],
    [7, 'State that bond breaking is endothermic and bond making is exothermic, and explain the enthalpy change in terms of bond breaking and making.', 'Холбоо таслах нь эндотерм, холбоо үүсгэх нь экзотерм гэж хэлж, ΔH-г холбоо таслах, үүсгэхээр тайлбарлах.', 'x'],
    [8, 'Calculate the enthalpy change of a reaction using bond energies.', 'Холбооны энергээр урвалын энтальпийн өөрчлөлтийг тооцоолох.', 'x']
  ],
  '6.1': [
    [1, 'Identify physical and chemical changes, and describe the differences between them.', 'Физик ба химийн өөрчлөлтийг таньж, ялгааг тодорхойлох.']
  ],
  '6.2': [
    [1, 'Describe the effect on the rate of reaction of: (a) changing the concentration of solutions, (b) changing the pressure of gases, (c) changing the surface area of solids, (d) changing the temperature, (e) adding or removing a catalyst, including enzymes.', 'Урвалын хурдад үзүүлэх нөлөөг тодорхойлох: (а) уусмалын концентраци, (б) хийн даралт, (в) хатуу бодисын гадаргуугийн талбай, (г) температур, (д) катализатор, фермент нэмэх/авах.'],
    [2, 'State that a catalyst increases the rate of a reaction and is unchanged at the end of the reaction.', 'Катализатор урвалын хурдыг нэмэгдүүлж, урвалын төгсгөлд өөрчлөгдөхгүй гэж хэлэх.'],
    [3, 'Describe practical methods for investigating the rate of a reaction, including change in mass of a reactant or product and the formation of a gas.', 'Урвалын хурдыг судлах туршилтын аргууд: урвалж эсвэл бүтээгдэхүүний масс өөрчлөгдөх, хий үүсэх зэргийг тодорхойлох.'],
    [4, 'Interpret data, including graphs, from rate of reaction experiments.', 'Урвалын хурдны туршилтын өгөгдөл, графикийг тайлбарлах.'],
    [5, 'Describe collision theory in terms of: (a) the number of particles per unit volume, (b) the frequency of collisions, (c) the kinetic energy of particles, (d) the activation energy.', 'Мөргөлдөөний онолыг тодорхойлох: (а) нэгж эзлэхүүн дэх бөөмийн тоо, (б) мөргөлдөөний давтамж, (в) бөөмийн кинетик энерги, (г) идэвхжлийн энерги.', 'x'],
    [6, 'Describe and explain, using collision theory, the effect on the rate of reaction of concentration, pressure, surface area, temperature, and adding or removing a catalyst.', 'Мөргөлдөөний онолоор концентраци, даралт, гадаргуугийн талбай, температур, катализаторын нөлөөг тодорхойлж, тайлбарлах.', 'x'],
    [7, 'State that a catalyst decreases the activation energy of a reaction.', 'Катализатор урвалын идэвхжлийн энергийг бууруулдаг гэж хэлэх.', 'x'],
    [8, 'Evaluate practical methods for investigating the rate of a reaction, including change in mass and the formation of a gas.', 'Урвалын хурдыг судлах туршилтын аргуудыг (масс өөрчлөгдөх, хий үүсэх) үнэлэх.', 'x']
  ],
  '6.3': [
    [1, 'State that some chemical reactions are reversible, shown by the symbol ⇌.', 'Зарим химийн урвал эргэх шинжтэйг ⇌ тэмдгээр харуулж хэлэх.'],
    [2, 'Describe how changing the conditions can change the direction of a reversible reaction: (a) the effect of heat on hydrated compounds, (b) the addition of water to anhydrous compounds (copper(II) sulfate and cobalt(II) chloride).', 'Нөхцөлийг өөрчлөхөд эргэх урвалын чиг өөрчлөгдөхийг тодорхойлох: (а) усан нэгдэлд халааллын нөлөө, (б) усгүй нэгдэлд ус нэмэх (CuSO₄, CoCl₂).'],
    [3, 'State that a reversible reaction in a closed system is at equilibrium when (a) the rate of the forward reaction equals the rate of the reverse reaction, and (b) the concentrations are no longer changing.', 'Хаалттай системд эргэх урвал тэнцвэрт байдалд байхыг хэлэх: (а) урагш ба эсрэг урвалын хурд тэнцүү, (б) концентраци өөрчлөгдөхгүй.', 'x'],
    [4, 'Predict and explain how the position of equilibrium is affected by (a) temperature, (b) pressure, (c) concentration, (d) a catalyst.', 'Тэнцвэрийн байрлалд (а) температур, (б) даралт, (в) концентраци, (г) катализатор хэрхэн нөлөөлөхийг таамаглаж, тайлбарлах.', 'x'],
    [5, 'State the symbol equation for the production of ammonia in the Haber process: N₂(g) + 3H₂(g) ⇌ 2NH₃(g).', 'Haber процессын аммиак үйлдвэрлэх тэмдэгт тэгшитгэл: N₂(g) + 3H₂(g) ⇌ 2NH₃(g).', 'x'],
    [6, 'State the sources of the hydrogen (from methane) and the nitrogen (from air) in the Haber process.', 'Haber процессын устөрөгчийн эх үүсвэр (метан) ба азотын эх үүсвэр (агаар)-ийг хэлэх.', 'x'],
    [7, 'State the typical conditions in the Haber process: 450 °C, 20 000 kPa (200 atm) and an iron catalyst.', 'Haber процессын ердийн нөхцөл: 450 °C, 20 000 kPa (200 atm), төмрийн катализатор.', 'x'],
    [8, 'State the symbol equation for the conversion of sulfur dioxide to sulfur trioxide in the Contact process: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g).', 'Contact процессын SO₂-ийг SO₃ болгох тэмдэгт тэгшитгэл: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g).', 'x'],
    [9, 'State the sources of sulfur dioxide (burning sulfur or roasting sulfide ores) and oxygen (from air) in the Contact process.', 'Contact процессын SO₂-ийн эх үүсвэр (хүхэр шатаах, сульфидын хүдэр хайлуулах) ба хүчилтөрөгч (агаар)-ийг хэлэх.', 'x'],
    [10, 'State the typical conditions for the Contact process: 450 °C, 200 kPa (2 atm) and a vanadium(V) oxide catalyst.', 'Contact процессын ердийн нөхцөл: 450 °C, 200 kPa (2 atm), ванадий(V) исэл катализатор.', 'x'],
    [11, 'Explain, in terms of rate of reaction and position of equilibrium, why the typical conditions are used in the Haber and Contact processes, including safety and economics.', 'Haber ба Contact процессын ердийн нөхцөлийг урвалын хурд, тэнцвэрийн байрлалаар, аюулгүй байдал ба эдийн засгийн үүднээс тайлбарлах.', 'x']
  ],
  '6.4': [
    [1, 'Use a Roman numeral to indicate the oxidation number of an element in a compound.', 'Нэгдэл дэх элементийн исэлдэлтийн тоог римийн тооны тэмдгээр бичих.'],
    [2, 'Define redox reactions as reactions involving simultaneous oxidation and reduction.', 'Redox урвалыг исэлдэлт ба бууралт зэрэг явагддаг урвал гэж тодорхойлох.'],
    [3, 'Define oxidation as gain of oxygen and reduction as loss of oxygen.', 'Исэлдэлтийг хүчилтөрөгч авах, бууралтыг хүчилтөрөгч алдах гэж тодорхойлох.'],
    [4, 'Identify redox reactions as reactions involving gain and loss of oxygen.', 'Redox урвалыг хүчилтөрөгч авах, алдах урвалаар таних.'],
    [5, 'Identify oxidation and reduction in redox reactions.', 'Redox урвалд исэлдэлт ба бууралтыг таних.'],
    [6, 'Define oxidation in terms of (a) loss of electrons and (b) an increase in oxidation number.', 'Исэлдэлтийг (а) электрон алдах, (б) исэлдэлтийн тоо нэмэгдэх гэж тодорхойлох.', 'x'],
    [7, 'Define reduction in terms of (a) gain of electrons and (b) a decrease in oxidation number.', 'Бууралтыг (а) электрон авах, (б) исэлдэлтийн тоо буурах гэж тодорхойлох.', 'x'],
    [8, 'Identify redox reactions as reactions involving gain and loss of electrons.', 'Redox урвалыг электрон авах, алдахтай холбоотой урвал гэж таних.', 'x'],
    [9, 'Identify redox reactions by changes in oxidation number, using the rules: elements uncombined = 0; monatomic ion = its charge; compound sums to 0; ion sums to its charge.', 'Redox урвалыг исэлдэлтийн тооны өөрчлөлтөөр таних: холбоогүй элемент = 0; моноатом ион = цэнэгтэй тэнцүү; нэгдэл нийлбэр 0; ион нийлбэр = цэнэг.', 'x'],
    [10, 'Identify redox reactions by the colour changes when using acidified potassium manganate(VII) or potassium iodide.', 'Хүчиллэг калийн перманганат(VII) эсвэл калийн иодидаар өнгөний өөрчлөлтөөр redox урвалыг таних.', 'x'],
    [11, 'Define an oxidising agent as a substance that oxidises another substance and is itself reduced.', 'Исэлдүүлэгчийг өөр бодисыг исэлдүүлж, өөрөө бууралтад орох бодис гэж тодорхойлох.', 'x'],
    [12, 'Define a reducing agent as a substance that reduces another substance and is itself oxidised.', 'Бууруулагчийг өөр бодисыг бууруулж, өөрөө исэлдэх бодис гэж тодорхойлох.', 'x'],
    [13, 'Identify oxidising agents and reducing agents in redox reactions.', 'Redox урвалд исэлдүүлэгч ба бууруулагчийг таних.', 'x']
  ],
  '7.1': [
    [1, 'Describe the characteristic properties of acids in terms of their reactions with (a) metals, (b) bases, (c) carbonates.', 'Хүчлийн шинж чанарыг (а) металл, (б) суурь, (в) карбонаттай урвалаар тодорхойлох.'],
    [2, 'Describe acids in terms of their effect on (a) litmus, (b) thymolphthalein, (c) methyl orange.', 'Хүчлийн нөлөөг (а) литмус, (б) тимолфталеин, (в) метилийн улбар шар дээр тодорхойлох.'],
    [3, 'State that bases are oxides or hydroxides of metals, and that alkalis are soluble bases.', 'Суурь нь металлын исэл эсвэл гидроксид, шүлт нь уусдаг суурь гэж хэлэх.'],
    [4, 'Describe the characteristic properties of bases in terms of their reactions with (a) acids, (b) ammonium salts.', 'Суурийн шинж чанарыг (а) хүчил, (б) аммонийн давстай урвалаар тодорхойлох.'],
    [5, 'Describe alkalis in terms of their effect on (a) litmus, (b) thymolphthalein, (c) methyl orange.', 'Шүлтийн нөлөөг (а) литмус, (б) тимолфталеин, (в) метилийн улбар шар дээр тодорхойлох.'],
    [6, 'State that aqueous solutions of acids contain H⁺ ions, and aqueous solutions of alkalis contain OH⁻ ions.', 'Хүчлийн усан уусмалд H⁺, шүлтийн усан уусмалд OH⁻ ион агуулдгийг хэлэх.'],
    [7, 'Describe how to compare hydrogen ion concentration, neutrality, relative acidity and alkalinity in terms of colour and pH using universal indicator paper.', 'Устөрөгчийн ионы концентраци, саармаг байдал, харьцангуй хүчиллэг ба шүлтлэгийг универсал индикатор цаасны өнгө, pH-аар харьцуулахыг тодорхойлох.'],
    [8, 'Describe the neutralisation reaction between an acid and an alkali to produce water: H⁺(aq) + OH⁻(aq) → H₂O(l).', 'Хүчил ба шүлтийн саармагжилтын урвалыг тодорхойлох: H⁺(aq) + OH⁻(aq) → H₂O(l).'],
    [9, 'Define acids as proton donors and bases as proton acceptors.', 'Хүчлийг протон өгөгч, суурийг протон авагч гэж тодорхойлох.', 'x'],
    [10, 'Define a strong acid as one that is completely dissociated in aqueous solution, and a weak acid as one that is partially dissociated.', 'Хүчтэй хүчлийг усан уусмалд бүрэн задардаг, сул хүчлийг хэсэгчлэн задардаг гэж тодорхойлох.', 'x'],
    [11, 'State that hydrochloric acid is a strong acid: HCl(aq) → H⁺(aq) + Cl⁻(aq).', 'Давсны хүчил хүчтэй хүчил гэдгийг хэлэх: HCl(aq) → H⁺(aq) + Cl⁻(aq).', 'x'],
    [12, 'State that ethanoic acid is a weak acid: CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq).', 'Цууны хүчил сул хүчил гэдгийг хэлэх: CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq).', 'x']
  ],
  '7.2': [
    [1, 'Classify oxides as acidic (including SO₂ and CO₂) or basic (including CuO and CaO), related to metallic and non-metallic character.', 'Исэлийг металлын ба металл бус шинжтэй холбож, хүчиллэг (SO₂, CO₂) эсвэл суурьт (CuO, CaO) гэж ангилах.'],
    [2, 'Describe amphoteric oxides as oxides that react with acids and with bases to produce a salt and water.', 'Амфотер исэлийг хүчил ба суурьтай урвалд орж давс, ус үүсгэдэг исэл гэж тодорхойлох.', 'x'],
    [3, 'Classify Al₂O₃ and ZnO as amphoteric oxides.', 'Al₂O₃ ба ZnO-г амфотер исэл гэж ангилах.', 'x']
  ],
  '7.3': [
    [1, 'Describe the preparation, separation and purification of soluble salts by reaction of an acid with (a) an alkali by titration, (b) excess metal, (c) excess insoluble base, (d) excess insoluble carbonate.', 'Уусдаг давсыг хүчлийн урвалаар бэлтгэх, салгах, цэвэршүүлэхийг тодорхойлох: (а) шүлттэй титрлэлтээр, (б) илүүдэл металлтай, (в) илүүдэл уусдаггүй суурьтай, (г) илүүдэл уусдаггүй карбонаттай.'],
    [2, 'Describe the general solubility rules for salts: (a) sodium, potassium and ammonium salts are soluble; (b) nitrates are soluble; (c) chlorides are soluble except lead and silver; (d) sulfates are soluble except barium, calcium and lead; (e) carbonates are insoluble except sodium, potassium and ammonium; (f) hydroxides are insoluble except sodium, potassium, ammonium and (partially) calcium.', 'Давсны уусах ерөнхий дүрмийг тодорхойлох: (а) Na, K, NH₄ давс уусна; (б) нитрат уусна; (в) хлорид уусна, харин Pb, Ag-ээс бусад; (г) сульфат уусна, харин Ba, Ca, Pb-ээс бусад; (д) карбонат уусахгүй, харин Na, K, NH₄-ээс бусад; (е) гидроксид уусахгүй, харин Na, K, NH₄, (хэсэгчлэн) Ca-аас бусад.'],
    [3, 'Define a hydrated substance as one chemically combined with water, and an anhydrous substance as one containing no water.', 'Усан бодисыг химийн аргаар усаар холбогдсон, усгүй бодисыг ус агуулаагүй гэж тодорхойлох.'],
    [4, 'Describe the preparation of insoluble salts by precipitation.', 'Уусдаггүй давсыг тунадасжуулах замаар бэлтгэх аргыг тодорхойлох.', 'x'],
    [5, 'Define water of crystallisation as the water molecules present in hydrated crystals, including CuSO₄·5H₂O and CoCl₂·6H₂O.', 'Талстын усыг усан талстад байгаа усны молекул гэж тодорхойлох, жишээ нь CuSO₄·5H₂O, CoCl₂·6H₂O.', 'x']
  ],
  '8.1': [
    [1, 'Describe the Periodic Table as an arrangement of elements in periods and groups, in order of increasing proton number.', 'Үелэх системийг протоны тооны өсөх дарааллаар үе ба бүлэгт байрласан гэж тодорхойлох.'],
    [2, 'Describe the change from metallic to non-metallic character across a period.', 'Үеийн дагуу металлаас металл бус шинж рүү шилжихийг тодорхойлох.'],
    [3, 'Describe the relationship between group number and the charge of the ions formed from elements in that group.', 'Бүлгийн дугаар ба тэр бүлгийн элементээс үүсэх ионы цэнэгийн хамаарлыг тодорхойлох.'],
    [4, 'Explain similarities in the chemical properties of elements in the same group in terms of their electronic configuration.', 'Нэг бүлгийн элементүүдийн химийн шинж чанарын ижил талыг электрон бүтцээр тайлбарлах.'],
    [5, 'Explain how the position of an element in the Periodic Table can be used to predict its properties.', 'Элементийн байрлалаар түүний шинж чанарыг таамаглахыг тайлбарлах.'],
    [6, 'Identify trends in groups, given information about the elements.', 'Элементийн мэдээллээр бүлгийн чиг хандлагыг таних.', 'x']
  ],
  '8.2': [
    [1, 'Describe the Group I alkali metals (lithium, sodium and potassium) as relatively soft metals, with trends down the group: decreasing melting point, increasing density, increasing reactivity.', 'I бүлгийн шүлтлэг металл (литий, натри, калий)-ыг харьцангуй зөөлөн металл гэж, бүлгийн дагуу хайлах цэг буурч, нягт нэмэгдэж, идэвх нэмэгдэхийг тодорхойлох.'],
    [2, 'Predict the properties of other Group I elements, given information about the elements.', 'Элементийн мэдээллээр I бүлгийн бусад элементийн шинж чанарыг таамаглах.']
  ],
  '8.3': [
    [1, 'Describe the Group VII halogens (chlorine, bromine, iodine) as diatomic non-metals, with trends down the group: increasing density and decreasing reactivity.', 'VII бүлгийн галоген (хлор, бром, иод)-ыг хоёр атомт металл бус, бүлгийн дагуу нягт нэмэгдэж, идэвх буурахыг тодорхойлох.'],
    [2, 'State the appearance of the halogens at r.t.p.: chlorine a pale yellow-green gas, bromine a red-brown liquid, iodine a grey-black solid.', 'r.t.p.-д галогенүүдийн төлөвийг хэлэх: хлор ногоон-шар хий, бром хүрэн-улаан шингэн, иод саарал-хар хатуу.'],
    [3, 'Describe and explain the displacement reactions of halogens with other halide ions.', 'Галогенийн бусад галидын ионтой нүүлгэх урвалыг тодорхойлж, тайлбарлах.'],
    [4, 'Predict the properties of other Group VII elements, given information about the elements.', 'Элементийн мэдээллээр VII бүлгийн бусад элементийн шинж чанарыг таамаглах.']
  ],
  '8.4': [
    [1, 'Describe the transition elements as metals that have high densities, high melting points, form coloured compounds, and often act as catalysts as elements and in compounds.', 'Шилжилтийн элементийг нягт өндөр, хайлах цэг өндөр, өнгөтэй нэгдэл үүсгэдэг, элемент болон нэгдэлд ихэвчлэн катализатор болдог металл гэж тодорхойлох.'],
    [2, 'Describe transition elements as having ions with variable oxidation numbers, including iron(II) and iron(III).', 'Шилжилтийн элемент исэлдэлтийн тоо хувьсах ион үүсгэдгийг, төмрийн(II) ба (III)-ийг жишээ болгон тодорхойлох.', 'x']
  ],
  '8.5': [
    [1, 'Describe the Group VIII noble gases as unreactive, monatomic gases and explain this in terms of their electronic configuration.', 'VIII бүлгийн инерт хийг урвалд ордоггүй, моноатом хий гэж тодорхойлж, электрон бүтцээр тайлбарлах.']
  ]
};
