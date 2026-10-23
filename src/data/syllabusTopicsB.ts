import { buildTopic, TopicSpec } from './syllabusBuilders';

// 0620 subject content: sections 6–8 (reactions and equilibrium, acids and salts, the Periodic Table)
const SPECS: TopicSpec[] = [
  {
    id: 's-6-1', chapter: 'ch-reactions', ref: '6.1', en: 'Physical and chemical changes', mn: 'Физик ба химийн өөрчлөлт',
    sumEn: 'In a physical change no new substance forms and it is often reversible (melting, dissolving). In a chemical change new substances form and the change is usually hard to reverse.',
    sumMn: 'Физик өөрчлөлтөд шинэ бодис үүсэхгүй, ихэвчлэн буцаах боломжтой (хайлах, уусах). Химийн өөрчлөлтөд шинэ бодис үүсэж, ихэвчлэн буцаахад хэцүү.',
    obj: [['6.1.1', 'Identify physical and chemical changes and describe the differences between them.', 'Физик ба химийн өөрчлөлтийг таньж, ялгааг тодорхойлох.']],
    vocab: [
      ['physical change', 'физик өөрчлөлт', 'A change in which no new substance is formed, such as melting.', 'Шинэ бодис үүсэхгүй өөрчлөлт, жишээ нь хайлах.'],
      ['chemical change', 'химийн өөрчлөлт', 'A change in which one or more new substances are formed.', 'Нэг буюу хэд хэдэн шинэ бодис үүсдэг өөрчлөлт.']
    ],
    sec: [
      ['Telling the difference', 'Ялгах арга', 'Melting ice is physical: water is still water and can be frozen again. Burning magnesium is chemical: magnesium oxide forms, and a gas or colour change often shows it. Dissolving salt in water is physical. Heating copper(II) carbonate to form copper(II) oxide and carbon dioxide is chemical.', 'Мөс хайлах нь физик: ус хэвээрээ байж, дахин хөрнө. Магнийг шатаах нь химийн: магнийн исэл үүснэ, ихэвчлэн хий ялгарах эсвэл өнгө өөрчлөгдөх нь илэрнэ. Давсыг усанд уусгах нь физик. Копперийн(II) карбонатыг халаахад копперийн(II) исэл, нүүрсхүчлийн хий үүснэ — химийн.']
    ]
  },
  {
    id: 's-6-3', chapter: 'ch-reactions', ref: '6.3', en: 'Reversible reactions and equilibrium', mn: 'Эргэх урвал ба тэнцвэр',
    sumEn: 'Some reactions go both ways (⇌). In a closed system at equilibrium the forward and reverse rates are equal and concentrations stay constant. Temperature, pressure and concentration move the position of equilibrium; a catalyst does not.',
    sumMn: 'Зарим урвал хоёр чиглэлд явна (⇌). Хаалттай системд тэнцвэрт байдалд урагш ба эсрэг урвалын хурд тэнцүү, концентраци тогтмол байна. Температур, даралт, концентраци тэнцвэрийн байрлалыг шилжүүлнэ; катализатор шилжүүлэхгүй.',
    obj: [
      ['6.3.1', 'Describe how heating and adding water change hydrated and anhydrous copper(II) sulfate and cobalt(II) chloride.', 'Копперийн(II) сульфат, кобальтийн(II) хлорыг халаах ба ус нэмэхэд усан ба усгүй хэлбэр хэрхэн солигдохыг тодорхойлох.'],
      ['6.3.2', 'State that equilibrium is reached when the forward and reverse rates are equal and concentrations no longer change.', 'Урагш ба эсрэг урвалын хурд тэнцүү, концентраци өөрчлөгдөхгүй болоход тэнцвэрт байдал үүснийг хэлэх.'],
      ['6.3.3', 'Predict and explain how temperature, pressure, concentration and a catalyst affect the position of equilibrium.', 'Температур, даралт, концентраци, катализатор тэнцвэрийн байрлалд хэрхэн нөлөөлөхийг таамаглах ба тайлбарлах.'],
      ['6.3.4', 'Write the symbol equations for the Haber and Contact processes, their sources and typical conditions, and explain them.', 'Haber ба Contact процессын тэгшитгэл, эх үүсвэр, ердийн нөхцөлийг бичиж, тайлбарлах.']
    ],
    vocab: [
      ['reversible reaction', 'эргэх урвал', 'A reaction that can proceed in both directions, shown by ⇌.', 'Хоёр чиглэлд явж чаддаг урвал, ⇌ тэмдэгтээр харуулна.'],
      ['equilibrium', 'тэнцвэр', 'The state in a closed system when forward and reverse rates are equal.', 'Хаалттай системд урагш ба эсрэг урвалын хурд тэнцүү байдал.'],
      ['hydrated', 'усжилттай', 'Chemically combined with water molecules.', 'Химийн аргаар усны молекултай холбогдсон.']
    ],
    sec: [
      ['Hydrated and anhydrous salts', 'Усан ба усгүй давс', 'Blue hydrated copper(II) sulfate (CuSO₄·5H₂O) loses water when heated and becomes white anhydrous CuSO₄. Adding water turns it blue again. Pink hydrated cobalt(II) chloride turns blue when anhydrous, and back to pink when water is added.', 'Цэнхэр усан копперийн(II) сульфат (CuSO₄·5H₂O) халахад ус алдаж, цагаан усгүй CuSO₄ болно. Ус нэмэхэд дахин цэнхэр болно. Ягаан усан кобальтийн(II) хлорыг усгүй болгоход цэнхэр, ус нэмэхэд дахин ягаан болно.'],
      ['Haber and Contact processes', 'Haber ба Contact процесс', 'Haber: N₂(g) + 3H₂(g) ⇌ 2NH₃(g), at about 450 °C, 200 atm and an iron catalyst. Contact: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), at about 450 °C, 2 atm and a vanadium(V) oxide catalyst. The temperature is a compromise: higher gives a faster rate but a lower yield in the exothermic forward reaction. High pressure favours the side with fewer gas molecules.', 'Haber: N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ойролцоогоор 450 °C, 200 atm, төмрийн катализатор. Contact: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ойролцоогоор 450 °C, 2 atm, ванадий(V) ислийн катализатор. Температур нь компромисс: өндөр бол хурд сайжирна, гэхдээ экзотерм урагш урвалд гарц буурна. Өндөр даралт хийн молекул цөөн тал руу шилжүүлнэ.']
    ]
  },
  {
    id: 's-6-4', chapter: 'ch-reactions', ref: '6.4', en: 'Redox', mn: 'Redox урвал',
    sumEn: 'Redox reactions involve simultaneous oxidation and reduction. Oxidation is loss of electrons (or gain of oxygen, or an increase in oxidation number); reduction is the opposite. Oxidation numbers track electron transfer.',
    sumMn: 'Redox урвалд исэлдэлт ба бууралт зэрэг явагдана. Исэлдэлт нь электрон алдах (эсвэл хүчилтөрөгч авах, исэлдэлтийн тоо нэмэгдэх); бууралт нь эсрэгээр. Исэлдэлтийн тоо электроны шилжилтийг харуулна.',
    obj: [
      ['6.4.1', 'Define redox in terms of oxygen, electrons and oxidation numbers.', 'Redox-ийг хүчилтөрөгч, электрон, исэлдэлтийн тоогоор тодорхойлох.'],
      ['6.4.2', 'Use Roman numerals to show oxidation numbers and apply the rules for them.', 'Исэлдэлтийн тоог римийн тоогоор бичиж, дүрмийг хэрэглэх.'],
      ['6.4.3', 'Identify oxidising and reducing agents in redox reactions.', 'Redox урвалд исэлдүүлэгч ба бууруулагчийг таних.'],
      ['6.4.4', 'Identify redox reactions by colour change with acidified potassium manganate(VII) and potassium iodide.', 'Хүчиллэг калийн перманганат(VII) ба калийн иодидын өнгөний өөрчлөлтөөр redox урвалыг таних.']
    ],
    vocab: [
      ['oxidation', 'исэлдэлт', 'Loss of electrons, gain of oxygen, or an increase in oxidation number.', 'Электрон алдах, хүчилтөрөгч авах, исэлдэлтийн тоо нэмэгдэх.'],
      ['reduction', 'бууралт', 'Gain of electrons, loss of oxygen, or a decrease in oxidation number.', 'Электрон авах, хүчилтөрөгч алдах, исэлдэлтийн тоо буурах.'],
      ['oxidising agent', 'исэлдүүлэгч', 'A substance that oxidises another and is itself reduced.', 'Өөр бодисыг исэлдүүлж, өөрөө бууралтад орох бодис.'],
      ['reducing agent', 'бууруулагч', 'A substance that reduces another and is itself oxidised.', 'Өөр бодисыг бууруулж, өөрөө исэлдэх бодис.']
    ],
    sec: [
      ['Oxidation number rules', 'Исэлдэлтийн тооны дүрэм', 'An element in its uncombined state has oxidation number 0. A monatomic ion has the same number as its charge. The sum of the numbers in a compound is 0, and in an ion it equals the charge. In MnO₄⁻, oxygen is −2 each (−8), so Mn must be +7, written (VII).', 'Холбоогүй элементийн исэлдэлтийн тоо 0. Моноатом ионы тоо нь цэнэгтэй тэнцүү. Нэгдэлд нийлбэр 0, ионд цэнэгтэй тэнцүү. MnO₄⁻-д хүчилтөрөгч бүр −2 (нийт −8) тул Mn нь +7, (VII) гэж бичигдэнэ.'],
      ['Colour tests', 'Өнгөний туршилт', 'Acidified potassium manganate(VII) is purple and is decolourised when it oxidises another substance, for example iron(II) ions. Potassium iodide is colourless; chlorine oxidises it to iodine, which gives a brown colour in solution.', 'Хүчиллэг калийн перманганат(VII) нь ягаан өнгөтэй; өөр бодисыг исэлдүүлэхэд өнгөгүй болно, жишээ нь төмрийн(II) ионтой. Калийн иодид өнгөгүй; хлор түүнийг иод болгож, уусмалд бор өнгө өгнө.']
    ]
  },
  {
    id: 's-7-1', chapter: 'ch-acids-bases', ref: '7.1', en: 'Characteristic properties of acids and bases', mn: 'Хүчил ба суурийн шинж чанар',
    sumEn: 'Acids react with metals, bases and carbonates and turn litmus red. Alkalis are soluble bases. Acids give H⁺(aq) and alkalis give OH⁻(aq). Neutralisation: H⁺ + OH⁻ → H₂O. Strong acids dissociate fully, weak acids only partly.',
    sumMn: 'Хүчил металл, суурь, карбонаттай урвалд орж, литмусыг улаан болгоно. Шүлт нь уусдаг суурь. Хүчил H⁺(aq), шүлт OH⁻(aq) өгнө. Саармагжилт: H⁺ + OH⁻ → H₂O. Хүчтэй хүчил бүрэн, сул хүчил хэсэгчлэн задарна.',
    obj: [
      ['7.1.1', 'Describe the reactions of acids with metals, bases and carbonates.', 'Хүчлийн металл, суурь, карбонаттай урвалыг тодорхойлох.'],
      ['7.1.2', 'Describe the effect of acids and alkalis on litmus, thymolphthalein and methyl orange.', 'Хүчил ба шүлтийн литмус, тимолфталеин, метилийн улбар шар дээрх нөлөөг тодорхойлох.'],
      ['7.1.3', 'Compare hydrogen ion concentration, neutrality, acidity and alkalinity using universal indicator paper and pH.', 'Устөрөгчийн ионы концентраци, саармаг байдал, хүчиллэг, шүлтлэгийг универсал индикатор цаас ба pH-аар харьцуулах.'],
      ['7.1.4', 'Describe neutralisation and write the equation H⁺(aq) + OH⁻(aq) → H₂O(l).', 'Саармагжилтыг тодорхойлж, H⁺(aq) + OH⁻(aq) → H₂O(l) тэгшитгэл бичих.'],
      ['7.1.5', 'Distinguish strong and weak acids, and proton donors and acceptors.', 'Хүчтэй ба сул хүчил, протон өгөгч ба авагчийг ялгах.']
    ],
    vocab: [
      ['acid', 'хүчил', 'A proton donor; in water it gives H⁺ ions.', 'Протон өгөгч; усанд H⁺ ион өгнө.'],
      ['alkali', 'шүлт', 'A soluble base; in water it gives OH⁻ ions.', 'Уусдаг суурь; усанд OH⁻ ион өгнө.'],
      ['neutralisation', 'саармагжилт', 'The reaction of an acid with a base to form a salt and water.', 'Хүчил ба суурийн урвалаар давс ба ус үүсэх урвал.'],
      ['strong acid', 'хүчтэй хүчил', 'An acid that is completely dissociated in aqueous solution, e.g. HCl.', 'Усан уусмалд бүрэн задардаг хүчил, жишээ нь HCl.']
    ],
    sec: [
      ['Reactions of acids', 'Хүчлийн урвал', 'Acid + metal → salt + hydrogen. Acid + base → salt + water. Acid + carbonate → salt + water + carbon dioxide. Hydrochloric acid is a strong acid: HCl(aq) → H⁺(aq) + Cl⁻(aq). Ethanoic acid is weak and only partly ionised: CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq).', 'Хүчил + металл → давс + устөрөгч. Хүчил + суурь → давс + ус. Хүчил + карбонат → давс + ус + нүүрсхүчлийн хий. Давсны хүчил хүчтэй хүчил: HCl(aq) → H⁺(aq) + Cl⁻(aq). Цууны хүчил сул, хэсэгчлэн задарна: CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq).'],
      ['Indicators', 'Индикатор', 'Litmus turns red in acid and blue in alkali. Methyl orange turns red in acid and yellow in alkali. Thymolphthalein is colourless in acid and blue in alkali. Universal indicator gives a range of colours that match pH: red for strong acid, green for neutral and violet for strong alkali.', 'Литмус хүчилд улаан, шүлтэд цэнхэр болно. Метилийн улбар шар хүчилд улаан, шүлтэд шар болно. Тимолфталеин хүчилд өнгөгүй, шүлтэд цэнхэр болно. Универсал индикатор pH-тай тохирох өнгө өгнө: хүчтэй хүчилд улаан, саармагт ногоон, хүчтэй шүлтэд ягаан-хэрэн.']
    ]
  },
  {
    id: 's-7-2', chapter: 'ch-acids-bases', ref: '7.2', en: 'Oxides', mn: 'Исэл',
    sumEn: 'Oxides of non-metals (such as SO₂ and CO₂) are acidic; oxides of metals (such as CuO and CaO) are basic. Amphoteric oxides (Al₂O₃ and ZnO) react with both acids and bases.',
    sumMn: 'Металл бус элементийн исэл (SO₂, CO₂) хүчиллэг; металлын исэл (CuO, CaO) суурьт. Амфотер исэл (Al₂O₃, ZnO) хүчил ба суурь хоёуланд урвалд орно.',
    obj: [
      ['7.2.1', 'Classify oxides as acidic or basic, related to metallic and non-metallic character.', 'Исэлийг металлын ба металл бус шинжтэй холбож хүчиллэг эсвэл суурьт ангилах.'],
      ['7.2.2', 'Describe amphoteric oxides as oxides that react with both acids and bases to form a salt and water.', 'Амфотер исэлийг хүчил ба суурьтай урвалд орж давс, ус үүсгэдэг исэл гэж тодорхойлох.'],
      ['7.2.3', 'Classify Al₂O₃ and ZnO as amphoteric oxides.', 'Al₂O₃ ба ZnO-г амфотер исэл гэж ангилах.']
    ],
    vocab: [
      ['acidic oxide', 'хүчиллэг исэл', 'An oxide of a non-metal that dissolves in water to form an acid or reacts with bases.', 'Металл бус элементийн исэл; усанд уусаж хүчил үүсгэнэ эсвэл суурьтай урвалдана.'],
      ['basic oxide', 'суурьт исэл', 'An oxide of a metal that reacts with acids to form a salt and water.', 'Металлын исэл; хүчилтэй урвалд орж давс, ус үүсгэнэ.'],
      ['amphoteric oxide', 'амфотер исэл', 'An oxide that reacts with both acids and bases.', 'Хүчил ба суурь хоёуланд урвалд ордог исэл.']
    ],
    sec: [
      ['Acidic and basic oxides', 'Хүчиллэг ба суурьт исэл', 'Sulfur dioxide and carbon dioxide dissolve in water to give acids. Copper(II) oxide and calcium oxide react with acids to give a salt and water, so they are basic.', 'Хүхрийн давхар исэл, нүүрсхүчлийн хий ус дээр хүчил үүсгэнэ. Копперийн(II) исэл, кальцийн исэл хүчилтэй урвалд орж давс, ус өгнө, тиймээс суурьт.'],
      ['Amphoteric oxides', 'Амфотер исэл', 'Aluminium oxide reacts with dilute acid and with sodium hydroxide, giving a salt and water in both cases. Zinc oxide does the same. This is why both are called amphoteric.', 'Алюминийн исэл шингэрүүлсэн хүчил, натрийн гидроксид хоёуланд урвалд орж, хоёр тохиолдолд давс, ус өгнө. Цайрын исэл мөн адил. Тиймээс хоёулаа амфотер гэж нэрлэгдэнэ.']
    ]
  },
  {
    id: 's-8-1', chapter: 'ch-periodic-table', ref: '8.1', en: 'Arrangement of elements', mn: 'Элементийн байрлал',
    sumEn: 'The Periodic Table lists elements in order of proton number, in periods (rows) and groups (columns). Elements in a group have the same number of outer electrons and similar chemistry. Across a period, elements change from metallic to non-metallic.',
    sumMn: 'Үелэх систем нь элементүүдийг протоны тооны дарааллаар, үе (мөр) ба бүлэг (багана)-д байрлуулна. Нэг бүлгийн элементүүд гаднах электроны тоо ижил, химийн шинж чанар ойр. Үеийн дагуу металлаас металл бус шинж рүү шилжинэ.',
    obj: [
      ['8.1.1', 'Describe the Periodic Table as an arrangement of elements in periods and groups, in order of increasing proton number / atomic number.', 'Үелэх системийг протоны тоо (атомын дугаар)-ны өсөх дарааллаар үе ба бүлэгт байрласан гэж тодорхойлох.'],
      ['8.1.2', 'Describe the change from metallic to non-metallic character across a period.', 'Үеийн дагуу металлын шинжээс металл бус шинж рүү шилжихийг тодорхойлох.'],
      ['8.1.3', 'Describe the relationship between group number and the charge of the ions formed from elements in that group.', 'Бүлгийн дугаар ба тэр бүлгийн элементээс үүсэх ионы цэнэгийн хамаарлыг тодорхойлох.'],
      ['8.1.4', 'Explain similarities in the chemical properties of elements in the same group of the Periodic Table in terms of their electronic configuration.', 'Үелэх системийн нэг бүлгийн элементүүдийн химийн шинж чанарын ижил талыг электрон бүтцээр тайлбарлах.'],
      ['8.1.5', 'Explain how the position of an element in the Periodic Table can be used to predict its properties.', 'Элементийн үелэх системд эзлэх байрлалаар түүний шинж чанарыг таамаглаж болохыг тайлбарлах.']
    ],
    vocab: [
      ['period', 'үе', 'A horizontal row of elements in the Periodic Table.', 'Үелэх системийн хэвтээ мөр.'],
      ['group', 'бүлэг', 'A vertical column of elements with the same number of outer electrons.', 'Гаднах электроны тоо ижил, босоо багана.']
    ],
    sec: [
      ['Position and charge', 'Байрлал ба цэнэг', 'Group I elements have one outer electron and form +1 ions. Group II form +2 ions. Group VII elements have seven outer electrons and form −1 ions. So the group number tells you the charge of the ion.', 'I бүлгийн элементүүд гаднах 1 электронтой, +1 ион үүсгэнэ. II бүлэг +2. VII бүлэг гаднах 7 электронтой, −1 ион үүсгэнэ. Тиймээс бүлгийн дугаар нь ионы цэнэгийг харуулна.'],
      ['Metallic to non-metallic', 'Металлаас металл бус', 'Moving left to right across Period 3 from sodium to chlorine, the elements change from metals to non-metals. Sodium and magnesium are metals; silicon is a semi-metal; phosphorus, sulfur and chlorine are non-metals.', 'Гуравдугаар үеийг зүүнээс баруун тийш натрийгээс хлор хүртэл явахад металлаас металл бус болно. Натри, магни металл; цахиур хагас металл; фосфор, хүхэр, хлор металл бус.']
    ]
  },
  {
    id: 's-8-2', chapter: 'ch-periodic-table', ref: '8.2', en: 'Group I properties', mn: 'I бүлгийн шинж чанар',
    sumEn: 'The Group I alkali metals (lithium, sodium, potassium) are soft. Going down the group, the melting point falls, density generally rises and reactivity increases.',
    sumMn: 'I бүлгийн шүлтлэг металл (литий, натри, калий) зөөлөн. Бүлгийн дагуу доош явахад хайлах цэг буурч, нягт ерөнхийдөө нэмэгдэж, идэвх нэмэгдэнэ.',
    obj: [
      ['8.2.1', 'Describe Group I alkali metals as soft metals with trends down the group: decreasing melting point, increasing density, increasing reactivity.', 'I бүлгийн шүлтлэг металлыг зөөлөн металл гэж, бүлгийн дагуу хайлах цэг буурч, нягт нэмэгдэж, идэвх нэмэгдэхийг тодорхойлох.'],
      ['8.2.2', 'Predict the properties of other elements in Group I, given information about the elements.', 'Элементийн мэдээллээр I бүлгийн бусад элементийн шинж чанарыг таамаглах.']
    ],
    vocab: [
      ['alkali metal', 'шүлтлэг металл', 'A Group I metal that reacts with water to form an alkaline solution.', 'I бүлгийн металл; усанд урвалд орж шүлтлэг уусмал үүсгэнэ.'],
      ['reactivity', 'идэвх', 'How readily an element reacts.', 'Элемент хэр хурдан урвалд орох чадвар.']
    ],
    sec: [
      ['Reaction with water', 'Усны урвал', 'Lithium, sodium and potassium react with water to form a metal hydroxide and hydrogen: 2Na + 2H₂O → 2NaOH + H₂. Lithium reacts steadily, sodium melts into a ball and potassium reacts so fast that the hydrogen can catch fire with a lilac flame. Reactivity increases down the group.', 'Литий, натри, калий ус рүү урвалд орж металлын гидроксид, устөрөгч өгнө: 2Na + 2H₂O → 2NaOH + H₂. Литий тогтмол урвалдаг, натри хайлж бөмбөлөг болдог, калийн урвал маш хурдан тул устөрөгч нил ягаан дөлтэйгээр шатдаг. Идэвх бүлгийн дагуу нэмэгдэнэ.'],
      ['Density trend', 'Нягтын чиг хандлага', 'Density generally increases down Group I, but potassium is less dense than sodium, so the trend has an exception. Use the trend with care when predicting values for rubidium and caesium.', 'I бүлэгт нягт ерөнхийдөө нэмэгддэг боловч калийн нягт натриас бага, тиймээс энэ чиг хандлагад үл хамаарах тохиолдол бий. Рубидий, цезийн утга таамаглахдаа анхаарна уу.']
    ]
  },
  {
    id: 's-8-3', chapter: 'ch-periodic-table', ref: '8.3', en: 'Group VII properties', mn: 'VII бүлгийн шинж чанар',
    sumEn: 'The halogens (chlorine, bromine, iodine) are diatomic non-metals. Density increases down the group and reactivity decreases. A more reactive halogen displaces a less reactive halide from solution.',
    sumMn: 'Галогенүүд (хлор, бром, иод) хоёр атомт металл бус элемент. Бүлгийн дагуу нягт нэмэгдэж, идэвх буурна. Идэвх өндөр галоген идэвх багатай галогенийн галидыг уусмалаас нүүлгэнэ.',
    obj: [
      ['8.3.1', 'Describe the halogens as diatomic non-metals with trends down the group: increasing density, decreasing reactivity.', 'Галогенийг хоёр атомт металл бус гэж, бүлгийн дагуу нягт нэмэгдэж, идэвх буурахыг тодорхойлох.'],
      ['8.3.2', 'State the appearance at r.t.p. of chlorine (pale yellow-green gas), bromine (red-brown liquid) and iodine (grey-black solid).', 'Хлор (ногоон-шар хий), бром (хүрэн-улаан шингэн), иод (саарал-хар хатуу) гэсэн r.t.p. дахь төлөвийг хэлэх.'],
      ['8.3.3', 'Describe and explain displacement reactions of halogens with other halide ions.', 'Галоген ба бусад галид ионтой нүүлгэх урвалыг тодорхойлж, тайлбарлах.'],
      ['8.3.4', 'Predict the properties of other elements in Group VII, given information about the elements.', 'Элементийн мэдээллээр VII бүлгийн бусад элементийн шинж чанарыг таамаглах.']
    ],
    vocab: [
      ['halogen', 'галоген', 'A Group VII non-metal that forms diatomic molecules.', 'VII бүлгийн, хоёр атомт молекул үүсгэдэг металл бус элемент.'],
      ['displacement reaction', 'орлуулалтын урвал', 'A more reactive element takes the place of a less reactive one in a compound.', 'Идэвх өндөр элемент нэгдэл дэх идэвх багатай элементийг орлоно.']
    ],
    sec: [
      ['Displacement', 'Нүүлгэх урвал', 'Chlorine displaces bromide and iodide: Cl₂ + 2KBr → 2KCl + Br₂. Bromine displaces iodide: Br₂ + 2KI → 2KBr + I₂. Iodine cannot displace chloride or bromide, because it is the least reactive halogen.', 'Хлор бромид, иодыг нүүлгэнэ: Cl₂ + 2KBr → 2KCl + Br₂. Бром иодыг нүүлгэнэ: Br₂ + 2KI → 2KBr + I₂. Иод хамгийн идэвхгүй галоген тул хлорид, бромидыг нүүлгэж чадахгүй.'],
      ['Appearance at r.t.p.', 'r.t.p. дахь төлөв', 'At room temperature chlorine is a pale yellow-green gas, bromine is a red-brown liquid that gives off a brown vapour, and iodine is a grey-black solid that gives a purple vapour when heated.', 'Өрөөний температурт хлор ногоон-шар хий, бром хүрэн-улаан шингэн бөгөөд хүрэн уур ялгаруулна, иод саарал-хар хатуу бөгөөд халахад нил ягаан уур өгнө.']
    ]
  },
  {
    id: 's-8-4', chapter: 'ch-periodic-table', ref: '8.4', en: 'Transition elements', mn: 'Шилжилтийн элемент',
    sumEn: 'Transition metals (iron, copper, chromium) have high densities and melting points, form coloured compounds and often act as catalysts. They form ions with variable oxidation numbers, such as iron(II) and iron(III).',
    sumMn: 'Шилжилтийн металл (төмөр, зэс, хром) нягт, хайлах цэг өндөр, өнгөтэй нэгдэл үүсгэж, ихэвчлэн катализатор болно. Исэлдэлтийн тоо хувьсах ион үүсгэнэ, жишээ нь төмрийн(II) ба төмрийн(III).',
    obj: [
      ['8.4.1', 'Describe the transition elements as metals that have high densities, high melting points, form coloured compounds, and often act as catalysts as elements and in compounds.', 'Шилжилтийн элементийг нягт өндөр, хайлах цэг өндөр, өнгөтэй нэгдэл үүсгэдэг, элемент болон нэгдэлд ихэвчлэн катализатор болдог металл гэж тодорхойлох.'],
      ['8.4.2', 'Describe transition elements as having ions with variable oxidation numbers, including iron(II) and iron(III).', 'Шилжилтийн элемент исэлдэлтийн тоо хувьсах ион үүсгэдгийг, төмрийн(II) ба (III)-ийг жишээ болгон тодорхойлох.']
    ],
    vocab: [
      ['transition element', 'шилжилтийн элемент', 'A metal in the middle block of the Periodic Table with variable oxidation numbers.', 'Үелэх системийн дунд блокийн, исэлдэлтийн тоо хувьсах металл.'],
      ['variable oxidation number', 'хувьсах исэлдэлтийн тоо', 'Transition metals can form ions with more than one charge.', 'Шилжилтийн металл хэд хэдэн цэнэгтэй ион үүсгэж чадна.']
    ],
    sec: [
      ['Coloured compounds and catalysts', 'Өнгөтэй нэгдэл ба катализатор', 'Copper(II) compounds are blue, and iron(II) and iron(III) compounds are green and brown. Iron is the catalyst in the Haber process, and vanadium(V) oxide is the catalyst in the Contact process.', 'Копперийн(II) нэгдэл цэнхэр, төмрийн(II) ба (III) нэгдэл ногоон ба бор. Төмөр Haber процессын, ванадий(V) исэл Contact процессын катализатор.'],
      ['Iron(II) and iron(III)', 'Төмрийн(II) ба (III)', 'Iron(II) (Fe²⁺) and iron(III) (Fe³⁺) are two ions of the same metal. Iron(II) is green with sodium hydroxide, giving a green precipitate; iron(III) gives a red-brown precipitate. This difference is used in identification tests.', 'Төмрийн(II) (Fe²⁺) ба (III) (Fe³⁺) ижил металлын хоёр ион. Төмрийн(II) натрийн гидроксидтай ногоон тунадас, төмрийн(III) улаан-бор тунадас өгнө. Энэ ялгаа таних туршилтад хэрэглэгдэнэ.']
    ]
  },
  {
    id: 's-8-5', chapter: 'ch-periodic-table', ref: '8.5', en: 'Noble gases', mn: 'Инертийн хий',
    sumEn: 'The Group VIII noble gases (helium, neon, argon) are unreactive monatomic gases. Their outer shell is full, so they have no tendency to gain, lose or share electrons.',
    sumMn: 'VIII бүлгийн инертийн хий (гели, неон, аргон) урвалд ордоггүй, моноатом хий. Гаднах бүрхүүл нь бүтэн тул электрон авах, алдах, хуваалцах хандлагагүй.',
    obj: [['8.5.1', 'Describe the Group VIII noble gases as unreactive, monatomic gases and explain this in terms of electronic configuration.', 'VIII бүлгийн инертийн хийг урвалд ордоггүй, моноатом хий гэж тодорхойлж, электрон бүтцээр тайлбарлах.']],
    vocab: [
      ['noble gas', 'инертийн хий', 'A Group VIII element with a full outer shell of electrons.', 'Гаднах электрон бүрхүүл нь бүтэн VIII бүлгийн элемент.'],
      ['monatomic', 'ганц атомт', 'Existing as single atoms.', 'Ганц атом хэлбэрээр байдаг.']
    ],
    sec: [
      ['Why they are unreactive', 'Яагаад урвалд ордоггүй вэ', 'Helium has 2 electrons (full first shell); neon is 2,8 and argon is 2,8,8. Their outer shells are full, so the atoms are stable on their own and do not form bonds. This is why noble gases are used to fill light bulbs and balloons.', 'Гели 2 электронтой (1-р бүрхүүл бүтэн); неон 2,8, аргон 2,8,8. Гаднах бүрхүүл бүтэн тул атом өөрөө тогтвортой, холбоо үүсгэдэггүй. Тиймээс инертийн хийг гэрлийн лампанд, бөмбөлөгт хэрэглэдэг.']
    ]
  }
];

export const TOPICS_B = SPECS.map(buildTopic);
