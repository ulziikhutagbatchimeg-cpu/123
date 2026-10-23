// Extended lesson content (Supplement statements) for the sub-topics that have them.
// Shown only when the student chooses Extended; Core students see the core sections only.
export interface ExtendedSection {
  titleEn: string;
  titleMn: string;
  contentEn: string;
  contentMn: string;
}

export const EXTENDED_SECTIONS: Record<string, ExtendedSection> = {
  '1.1': {
    titleEn: 'Heating curves and the effect of temperature and pressure on gases',
    titleMn: 'Халаалтын муруй ба температур, даралтын нөлөө хийд',
    contentEn: 'On a heating curve the flat sections mark changes of state: the energy supplied breaks forces between particles, so the temperature stays constant. For a gas, higher temperature gives the particles more kinetic energy, so the volume increases at constant pressure. Higher pressure pushes the particles closer together, so the volume decreases.',
    contentMn: 'Халаалтын муруйн хэвтээ хэсэг нь төлөв өөрчлөлтийг заана: өгсөн энерги бөөмсийн хоорондох хүчийг эвдэх тул температур тогтмол байна. Хийн хувьд температур өсөхөд бөөмийн кинетик энерги нэмэгдэж, тогтмол даралтад эзлэхүүн өснө. Даралт өсөхөд бөөмс ойртож, эзлэхүүн буурна.'
  },
  '1.2': {
    titleEn: 'Relative molecular mass and the rate of diffusion',
    titleMn: 'Харьцангуй молекул масс ба диффузийн хурд',
    contentEn: 'At the same temperature, lighter gas molecules move faster, so they diffuse faster. Gases with a lower relative molecular mass spread more quickly through the air or through a porous plug. Explain this with the kinetic particle model, not by quoting a formula.',
    contentMn: 'Ижил температурт бага масстай хийн молекул илүү хурдан хөдөлж, илүү хурдан тархана. Харьцангуй молекул масс бага хий агаар эсвэл нүхтэй бөглөөгөөр илүү хурдан тархана. Үүнийг томьёогоор биш, кинетик бөөмийн загвараар тайлбарла.'
  },
  '2.3': {
    titleEn: 'Isotopes and the calculation of relative atomic mass',
    titleMn: 'Изотоп ба харьцангуй атомын масс тооцоолох',
    contentEn: 'Isotopes have the same number of electrons, so they share a chemistry, but their masses differ. The relative atomic mass is a weighted mean: Aᵣ = (abundance₁ × mass₁ + abundance₂ × mass₂) ÷ 100. Chlorine with 75% ³⁵Cl and 25% ³⁷Cl gives Aᵣ = 35.5.',
    contentMn: 'Изотопууд ижил тооны электронтой тул химийн шинж чанар нь ижил, харин масс нь өөр. Харьцангуй атомын масс нь жигнэсэн дундаж: Aᵣ = (хувь₁ × масс₁ + хувь₂ × масс₂) ÷ 100. 75% ³⁵Cl ба 25% ³⁷Cl агуулсан хлорын Aᵣ = 35.5.'
  },
  '2.4': {
    titleEn: 'The giant ionic lattice and why ionic compounds conduct when molten',
    titleMn: 'Ионы аварга тор ба хайлмалд дамжуулах чадвар',
    contentEn: 'An ionic compound is a regular lattice of alternating positive and negative ions, held by strong electrostatic forces. Much energy is needed to break the lattice, so melting points are high. In the solid the ions are fixed, but when molten or dissolved they are free to move and carry the current.',
    contentMn: 'Ионы нэгдэл нь эерэг, сөрөг ионыг ээлжлэн байрлуулсан тогтмол тор бөгөөд хүчтэй цахилгаан таталцалаар барьцалдсан. Торыг эвдэхэд их энерги хэрэгтэй тул хайлах цэг өндөр. Хатуу байхад ионууд байрлалаа хадгалдаг, харин хайлсан эсвэл уусгасан үед чөлөөтэй хөдөлж гүйдэл дамжуулна.'
  },
  '2.5': {
    titleEn: 'Covalent molecules and the weak forces between them',
    titleMn: 'Ковалент молекул ба тэдгээрийн хоорондох сул хүч',
    contentEn: 'Molecules such as CH₃OH, C₂H₄, O₂, CO₂ and N₂ are built from covalent bonds, but the molecules are held to each other only by weak intermolecular forces. Melting or boiling overcomes these weak forces while the covalent bonds stay intact, which is why simple molecular substances melt and boil easily and do not conduct.',
    contentMn: 'CH₃OH, C₂H₄, O₂, CO₂, N₂ зэрэг молекул ковалент холбоогоор бүтсэн боловч молекулууд бие биедээ зөвхөн сул молекул хоорондын хүчээр барьцалдана. Хайлах, буцлахад эдгээр сул хүч эвдэрч, ковалент холбоо хэвээр үлддэг; тиймээс энгийн молекул бодис хурдан хайлж, буцалж, цахилгаан дамжуулахгүй.'
  },
  '2.6': {
    titleEn: 'Silicon(IV) oxide compared with diamond',
    titleMn: 'Силикон(IV) исэл ба алмазын харьцуулалт',
    contentEn: 'Silicon(IV) oxide, SiO₂, has a giant covalent structure like diamond: each silicon bonds to four oxygens and each oxygen to two silicons. The strong covalent network gives it a high melting point and hardness, and it does not conduct electricity, just like diamond.',
    contentMn: 'Силикон(IV) исэл SiO₂ нь алмазтай адил аварга ковалент бүтэцтэй: силикон бүр дөрвөн хүчилтөрөгчтэй, хүчилтөрөгч бүр хоёр силиконтой холбогдоно. Хүчтэй ковалент сүлжээ нь хайлах цэг, хатуулаг өндөр болгож, алмаз шиг цахилгаан дамжуулахгүй.'
  },
  '3.1': {
    titleEn: 'Empirical formulae and ionic formulae from charges',
    titleMn: 'Эмпирик томьёо ба цэнэгээс гаргах ионы томьёо',
    contentEn: 'The empirical formula is the simplest whole-number ratio of atoms or ions: glucose, C₆H₁₂O₆, has the empirical formula CH₂O. Ionic formulae are deduced from the charges: Mg²⁺ and Cl⁻ give MgCl₂. Ionic equations show only the ions that react, e.g. Ag⁺(aq) + Cl⁻(aq) → AgCl(s).',
    contentMn: 'Эмпирик томьёо нь атом эсвэл ионы хамгийн энгийн бүхэл харьцаа: глюкоз C₆H₁₂O₆-ийн эмпирик томьёо CH₂O. Ионы томьёог цэнэгээс гаргана: Mg²⁺ ба Cl⁻ нь MgCl₂ өгнө. Ионы тэгшитгэлд зөвхөн урвалд орох ионыг бичнэ, жишээ нь Ag⁺(aq) + Cl⁻(aq) → AgCl(s).'
  },
  '3.3': {
    titleEn: 'Mole calculations from titration and percentage yield',
    titleMn: 'Титрлэлтээс моль тооцоолох ба гарцын хувь',
    contentEn: 'Amount in moles n = mass ÷ molar mass, and from a titration n = concentration × volume (dm³). For H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O the mole ratio 1 : 2 links the two solutions. Percentage yield = actual yield ÷ theoretical yield × 100.',
    contentMn: 'Бодисын хэмжээ n = масс ÷ молийн масс, титрлэлтээр n = концентраци × эзлэхүүн (дм³). H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O урвалд 1 : 2 молийн харьцаа хоёр уусмалыг холбоно. Гарцын хувь = бодит гарц ÷ онолын гарц × 100.'
  },
  '4.1': {
    titleEn: 'Transfer of charge and the products of electrolysis',
    titleMn: 'Цэнэгийн шилжилт ба электролизийн бүтээгдэхүүн',
    contentEn: 'Electrons flow through the external circuit; at the cathode they are gained (reduction), and at the anode they are lost (oxidation). Ions move in the electrolyte: cations to the cathode and anions to the anode. Dilute aqueous halides give oxygen at the anode, while concentrated solutions give the halogen, e.g. concentrated NaCl gives Cl₂. With copper electrodes in copper(II) sulfate, copper dissolves at the anode and is deposited at the cathode.',
    contentMn: 'Электрон гадаад хэлхээгээр урсана; катодод электрон авч (бууралт), анодод алдана (исэлдэлт). Электролитд ионууд хөдөлнө: катион катод руу, анион анод руу. Шингэрүүлсэн галидын уусмалд анодод хүчилтөрөгч, өтгөрүүлсэн уусмалд галоген гарна, жишээ нь өтгөрүүлсэн NaCl Cl₂ өгнө. Копперийн(II) сульфатад зэс электродтой үед зэс анодод уусч, катодод тунана.'
  },
  '4.2': {
    titleEn: 'Advantages and disadvantages of the hydrogen fuel cell',
    titleMn: 'Устөрөгчийн түлшний элементийн давуу ба сул тал',
    contentEn: 'Advantages: no carbon dioxide or pollutants at the point of use, and water is the only product. Disadvantages: hydrogen is difficult to store and transport, most hydrogen is currently made from fossil fuels, and the fuel cells need expensive catalysts. Petrol engines benefit from an existing fuel distribution network.',
    contentMn: 'Давуу тал: ашиглах газар нүүрсхүчлийн хий, бохирдуулагч гаргахгүй, цорын ганц бүтээгдэхүүн нь ус. Сул тал: устөрөгчийг хадгалах, тээвэрлэхэд хэцүү, одоогоор ихэнх устөрөгчийг чулуужсан түлшнээс гаргадаг, түлшний элементэд үнэтэй катализатор хэрэгтэй. Бензин хөдөлгүүр түлшний хангамжийн одоо байгаа сүлжээтэй.'
  },
  '5.1': {
    titleEn: 'Enthalpy change, activation energy and bond energies',
    titleMn: 'Энтальпийн өөрчлөлт, идэвхжүүлэх энерги ба холбооны энерги',
    contentEn: 'ΔH is negative for exothermic and positive for endothermic reactions. The activation energy is the energy hump on the pathway, and a catalyst lowers it. Using bond energies: ΔH = (total energy of bonds broken) − (total energy of bonds made).',
    contentMn: 'ΔH нь экзотермд сөрөг, эндотермд эерэг. Идэвхжүүлэх энерги нь энергийн муруйн дээд цэг бөгөөд катализатор үүнийг бууруулна. Холбооны энергээр: ΔH = (таслагдсан холбооны нийт энерги) − (үүссэн холбооны нийт энерги).'
  },
  '6.2': {
    titleEn: 'Collision theory: why concentration, pressure, surface area and temperature change the rate',
    titleMn: 'Мөргөлдөөний онол: концентраци, даралт, гадаргуу, температур яагаад хурдад нөлөөлдөг вэ',
    contentEn: 'Higher concentration or pressure puts more particles into the same volume, so collisions are more frequent. Higher temperature raises the kinetic energy, so a larger share of collisions have energy at least equal to Eₐ. A larger surface area exposes more particles to collisions. A catalyst lowers Eₐ, so more collisions are successful.',
    contentMn: 'Концентраци эсвэл даралт нэмэгдэхэд ижил эзлэхүүнд илүү бөөмс байж, мөргөлдөөн давтамжтай болно. Температур нэмэгдэхэд кинетик энерги өсч, мөргөлдөөний илүү хэсэг нь Eₐ-тай тэнцүү эсвэл түүнээс их энергитэй болно. Гадаргуугийн талбай ихсэхэд мөргөлдөөнд илүү бөөмс оролцоно. Катализатор Eₐ-г бууруулж, илүү олон мөргөлдөөн амжилттай болно.'
  },
  '6.3': {
    titleEn: 'Le Chatelier’s principle and the compromise conditions in industry',
    titleMn: 'Ле Шательегийн зарчим ба үйлдвэрлэлийн компромисс нөхцөл',
    contentEn: 'A system at equilibrium shifts to oppose a change. Higher pressure favours the side with fewer gas molecules, so the Haber reaction moves to the right. A lower temperature favours the exothermic forward reaction, but slows the rate, so about 450 °C is a compromise. A catalyst speeds up both directions equally and does not change the position of equilibrium.',
    contentMn: 'Тэнцвэрт систем өөрчлөлтийг эсэргүүцэх чиглэлд шилжинэ. Даралт нэмэгдэхэд хийн молекул цөөн тал руу шилжих тул Haber урвал баруун тийш шилжинэ. Температур бага байвал экзотерм урагш урвалд тустай боловч хурд буурна, тиймээс ойролцоогоор 450 °C компромисс. Катализатор хоёр чиглэлийг адил хурдасгаж, тэнцвэрийн байрлалыг өөрчлөхгүй.'
  },
  '6.4': {
    titleEn: 'Oxidation numbers and oxidising and reducing agents',
    titleMn: 'Исэлдэлтийн тоо, исэлдүүлэгч ба бууруулагч',
    contentEn: 'Rules: uncombined elements are 0, a monatomic ion equals its charge, a compound sums to 0 and an ion sums to its charge. In Cr₂O₇²⁻, chromium is +6. An oxidising agent is reduced and a reducing agent is oxidised: acidified KMnO₄ oxidises Fe²⁺ to Fe³⁺ while Mn(VII) is reduced to Mn²⁺, which turns the purple colour colourless.',
    contentMn: 'Дүрэм: холбоогүй элемент 0, моноатом ион нь цэнэгтэй тэнцүү, нэгдэлд нийлбэр 0, ионд цэнэгтэй тэнцүү. Cr₂O₇²⁻-д хром +6. Исэлдүүлэгч бууралтад орж, бууруулагч исэлдэнэ: хүчиллэг KMnO₄ Fe²⁺-ийг Fe³⁺ болгож, Mn(VII) нь Mn²⁺ болж бууралтад орно; ягаан өнгө алга болно.'
  },
  '7.1': {
    titleEn: 'Strong and weak acids and proton transfer',
    titleMn: 'Хүчтэй ба сул хүчил, протон шилжилт',
    contentEn: 'Acids are proton (H⁺) donors and bases are proton acceptors. A strong acid such as HCl dissociates completely, so at the same concentration it has a higher [H⁺] and a lower pH than a weak acid. A weak acid such as ethanoic acid dissociates only partly, so its equilibrium lies to the left.',
    contentMn: 'Хүчил бол протон (H⁺) өгөгч, суурь бол протон авагч. HCl гэх мэт хүчтэй хүчил бүрэн задардаг тул ижил концентрацид [H⁺] өндөр, pH бага. Цууны хүчил гэх мэт сул хүчил хэсэгчлэн задардаг тул тэнцвэр зүүн тийш байна.'
  },
  '7.2': {
    titleEn: 'Amphoteric oxides',
    titleMn: 'Амфотер исэл',
    contentEn: 'Amphoteric oxides such as aluminium oxide and zinc oxide react with acids, behaving as bases, and with alkalis, behaving as acids. For example, Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O, and Al₂O₃ reacts with hot concentrated sodium hydroxide to form a salt called an aluminate.',
    contentMn: 'Алюминийн исэл, цайрын исэл зэрэг амфотер исэл нь хүчилтэй суурийн адил, шүлттэй хүчлийн адил урвалд ордог. Жишээ нь Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O; Al₂O₃ халуун өтгөрүүлсэн натрийн гидроксидтой урвалд орж алюминат гэх давс үүсгэнэ.'
  },
  '7.3': {
    titleEn: 'Precipitation and water of crystallisation',
    titleMn: 'Тунадасжилт ба талстын ус',
    contentEn: 'An insoluble salt is made by precipitation: mix solutions that contain the required ions, filter the precipitate, wash it and dry it. A hydrated salt contains water of crystallisation, e.g. CuSO₄·5H₂O, which loses its water on heating to give anhydrous CuSO₄.',
    contentMn: 'Уусдаггүй давсыг тунадасжуулалтаар гаргана: шаардлагатай ионтой хоёр уусмалыг холиж, тунадасыг шүүж, угаан, хатаана. Усан давс талстын ус агуулна, жишээ нь CuSO₄·5H₂O; халаахад ус алдаж, усгүй CuSO₄ болно.'
  },
  '8.1': {
    titleEn: 'Trends in groups and periods explained by electronic configuration',
    titleMn: 'Бүлэг, үеийн чиг хандлагыг электрон бүтцээр тайлбарлах',
    contentEn: 'Down a group, atoms have more shells, so the outer electrons are further from the nucleus and are more easily lost; metals become more reactive. Across a period the number of outer electrons increases and the elements change from metals to non-metals, which gain or share electrons. Predict properties from the group and period.',
    contentMn: 'Бүлгийн дагуу доош явахад атом илүү бүрхүүлтэй, гаднах электрон цөмөөс холдож, амархан алддаг; металл илүү идэвхтэй болно. Үеийн дагуу гаднах электроны тоо нэмэгдэж, элементүүд металлаас металл бус болно, тэд электрон авах, хуваалцах хандлагатай. Шинж чанарыг бүлэг, үеэр таамагла.'
  },
  '8.4': {
    titleEn: 'Iron(II) and iron(III) ions',
    titleMn: 'Төмрийн(II) ба төмрийн(III) ион',
    contentEn: 'Transition elements form ions with different charges, such as Fe²⁺ and Fe³⁺. Iron(II) solutions are pale green, iron(III) solutions are yellow-brown. Fe²⁺ is easily oxidised to Fe³⁺, so iron(II) solutions should be kept fresh.',
    contentMn: 'Шилжилтийн элемент өөр цэнэгтэй ион үүсгэнэ, жишээ нь Fe²⁺ ба Fe³⁺. Төмрийн(II) уусмал бараан-ногоон-цайвар, төмрийн(III) уусмал шар-бор. Fe²⁺ амархан Fe³⁺ болж исэлддэг тул төмрийн(II) уусмалыг шинэ байлгах хэрэгтэй.'
  },
  '9.3': {
    titleEn: 'Why alloys are harder: the layers cannot slide',
    titleMn: 'Хайлш яагаад хатуу вэ: давхарга гулсахгүй',
    contentEn: 'In a pure metal all the atoms are the same size, so the layers of atoms slide over each other when a force is applied. In an alloy the different-sized atoms distort the regular arrangement, so the layers cannot slide easily. This makes the alloy harder and stronger.',
    contentMn: 'Цэвэр металлд бүх атом ижил хэмжээтэй тул хүч үйлчлэхэд давхарга гулсана. Хайлшид өөр хэмжээтэй атом тогтмол байрлалыг гажуудуулж, давхарга амархан гулсахгүй. Тиймээс хайлш хатуу, бат.'
  },
  '9.4': {
    titleEn: 'Displacement reactions and the role of the oxide layer',
    titleMn: 'Нүүлгэх урвал ба исэлийн давхаргын үүрэг',
    contentEn: 'A more reactive metal displaces a less reactive metal from its salt solution, for example Zn + CuSO₄ → ZnSO₄ + Cu. Aluminium is very reactive, but the oxide layer on its surface slows its reaction; scraping the surface speeds the reaction up.',
    contentMn: 'Идэвх өндөр металл нь идэвх багатай металлыг түүний давсны уусмалаас нүүлгэнэ, жишээ нь Zn + CuSO₄ → ZnSO₄ + Cu. Алюминий маш идэвхтэй боловч гадаргуун исэлийн давхарга урвалыг удаашруулна; гадаргууг хусвал урвал хурдасна.'
  },
  '9.5': {
    titleEn: 'Sacrificial protection and electron loss',
    titleMn: 'Золиослолт хамгаалалт ба электрон алдалт',
    contentEn: 'Zinc is more reactive than iron, so zinc loses electrons (Zn → Zn²⁺ + 2e⁻) and corrodes first, while the iron is protected. Magnesium blocks fixed to ship hulls protect the steel in the same way.',
    contentMn: 'Цайр төмрөөс идэвхтэй тул цайр электрон алдаж (Zn → Zn²⁺ + 2e⁻) эхлээд зэврэнэ, төмөр хамгаалагдана. Хөлөг онгоцны бие дээр бэхэлсэн магнийн блок ган-г ижил аргаар хамгаална.'
  },
  '9.6': {
    titleEn: 'Blast furnace and aluminium electrolysis equations',
    titleMn: 'Домны зуух ба алюминийн электролизийн тэгшитгэл',
    contentEn: 'Blast furnace: C + O₂ → CO₂; CO₂ + C → 2CO; Fe₂O₃ + 3CO → 2Fe + 3CO₂; CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃ (slag). Aluminium: Al³⁺ + 3e⁻ → Al at the cathode, and 2O²⁻ → O₂ + 4e⁻ at the anode, where the carbon anodes burn away and must be replaced.',
    contentMn: 'Домны зуух: C + O₂ → CO₂; CO₂ + C → 2CO; Fe₂O₃ + 3CO → 2Fe + 3CO₂; CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃ (шаар). Алюминий: катодод Al³⁺ + 3e⁻ → Al, анодод 2O²⁻ → O₂ + 4e⁻; нүүрстөрөгчийн анод шатаж элэгддэг тул солих хэрэгтэй.'
  },
  '10.3': {
    titleEn: 'The greenhouse effect and the catalytic converter',
    titleMn: 'Хүлэмжийн эффект ба катализаторын хөрвүүлэгч',
    contentEn: 'Carbon dioxide and methane absorb thermal (infrared) energy radiated from the Earth and re-emit it, reducing the heat lost to space. In car engines the high temperature makes nitrogen and oxygen react, forming oxides of nitrogen. A catalytic converter changes these and carbon monoxide into harmless gases: 2CO + 2NO → 2CO₂ + N₂.',
    contentMn: 'Нүүрсхүчлийн хий ба метан Дэлхийгээс цацарсан дулааны (хэт улаан туяа) энергийг шингээж дахин ялгаруулж, сансарт алдагдах дулааныг багасгана. Машины хөдөлгүүрт өндөр температур азот, хүчилтөрөгчийг урвалд оруулж азотын исэл үүсгэнэ. Катализаторын хөрвүүлэгч эдгээр болон нүүрстөрөгчийн монооксидыг аюултай бус хий болгоно: 2CO + 2NO → 2CO₂ + N₂.'
  },
  '11.1': {
    titleEn: 'Homologous series, structural isomers and saturation',
    titleMn: 'Гомолог цуваа, бүтцийн изомер ба ханасан байдал',
    contentEn: 'Each member of a homologous series differs from the next by a –CH₂– unit. C₄H₁₀ has two structural isomers, butane and methylpropane. C₄H₈ has several, including but-1-ene, but-2-ene and methylpropene. A saturated compound has only C–C single bonds; an unsaturated compound has at least one C=C or C≡C bond.',
    contentMn: 'Гомолог цувралын гишүүн бүр дараагийнхаасаа –CH₂– нэгжээр ялгаатай. C₄H₁₀-д хоёр бүтцийн изомер байна: бутан ба метилпропан. C₄H₈-д олон изомер байна: but-1-ene, but-2-ene, метилпропен. Ханасан нэгдэлд зөвхөн C–C ганц холбоо; ханаагүй нэгдэлд дор хаяж нэг C=C эсвэл C≡C холбоо байна.'
  },
  '11.2': {
    titleEn: 'Naming unbranched compounds and esters',
    titleMn: 'Салбаргүй нэгдлийн нэршил ба эфир',
    contentEn: 'Number the carbon chain to give the double bond or –OH group the lowest number: but-1-ene and but-2-ene differ by the position of the C=C, and propan-1-ol and propan-2-ol differ by the position of –OH. An ester is named as an alkyl alkanoate, e.g. ethyl ethanoate and methyl propanoate.',
    contentMn: 'Нүүрстөрөгчийн гинжийг давхар холбоо эсвэл –OH бүлэгт хамгийн бага тоо өгөхөөр тоолно: but-1-ene ба but-2-ene нь C=C-ийн байрлалаар, propan-1-ol ба propan-2-ol нь –OH-ийн байрлалаар ялгаатай. Эфирийг алкил алканоат гэж нэрлэнэ, жишээ нь этил этаноат, метил пропаноат.'
  },
  '11.4': {
    titleEn: 'Substitution of alkanes with chlorine in ultraviolet light',
    titleMn: 'Алканы хлоротой орлуулалт хэт ягаан гэрэлд',
    contentEn: 'Ultraviolet light supplies the activation energy to split Cl₂ into chlorine atoms, which then replace a hydrogen on the alkane: CH₄ + Cl₂ → CH₃Cl + HCl. The syllabus requires only the monosubstitution product, although further substitution can occur.',
    contentMn: 'Хэт ягаан гэрэл Cl₂-г хлорын атом болгон задлах идэвхжүүлэх энергийг өгч, атомууд алкан дээрх устөрөгчийг орлуулна: CH₄ + Cl₂ → CH₃Cl + HCl. Syllabus-д зөвхөн моно орлуулалтын бүтээгдэхүүн шаардагдах ч дараагийн орлуулалт явагдаж болно.'
  },
  '11.5': {
    titleEn: 'Addition reactions of alkenes give a single product',
    titleMn: 'Алкены нэмэлтийн урвал нэг бүтээгдэхүүн өгнө',
    contentEn: 'In an addition reaction the reactants join across the C=C bond to give a single product: ethene + Br₂ → 1,2-dibromoethane; ethene + H₂ → ethane (nickel catalyst); ethene + H₂O → ethanol (steam, acid catalyst, 300 °C, 60 atm).',
    contentMn: 'Нэмэлтийн урвалд урвалжууд C=C холбоогоор нийлж нэг бүтээгдэхүүн өгнө: этен + Br₂ → 1,2-дибромоэтан; этен + H₂ → этан (никель катализатор); этен + H₂O → этанол (уур, хүчил катализатор, 300 °C, 60 atm).'
  },
  '11.6': {
    titleEn: 'Advantages and disadvantages of the two ethanol processes',
    titleMn: 'Этанол үйлдвэрлэх хоёр аргын давуу ба сул тал',
    contentEn: 'Fermentation uses renewable sugar and needs no fossil fuel, but it is slow, gives a dilute solution (around 15% ethanol) and the ethanol must be separated. Steam addition to ethene is fast and gives pure ethanol, but it uses non-renewable petroleum and needs high temperature and pressure.',
    contentMn: 'Исгэлт нь сэргээгдэх сахар ашигладаг, чулуужсан түлш хэрэггүй боловч удаан, шингэрүүлсэн уусмал (ойролцоогоор 15% этанол) өгч, этанолыг салгах шаардлагатай. Этенд уур нэмэх арга хурдан, цэвэр этанол өгөх боловч сэргээгдэхгүй нефтийг ашиглаж, өндөр температур, даралт хэрэгтэй.'
  },
  '11.7': {
    titleEn: 'Oxidising ethanol to ethanoic acid and making esters',
    titleMn: 'Этанолыг цууны хүчил болгож исэлдүүлэх ба эфир үйлдвэрлэх',
    contentEn: 'Acidified potassium manganate(VII) oxidises ethanol to ethanoic acid, and its purple colour fades. In vinegar production bacteria oxidise ethanol in air. Esterification: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O, with an acid catalyst.',
    contentMn: 'Хүчиллэг калийн перманганат(VII) этанолыг цууны хүчил болгон исэлдүүлэх ба түүний ягаан өнгө алга болно. Цагаан цуу үйлдвэрлэхэд бактери агаарт этанолыг исэлдүүлнэ. Эфиржилт: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O; хүчил катализатортой.'
  },
  '11.8': {
    titleEn: 'Condensation polymers, PET recycling and proteins',
    titleMn: 'Конденсацийн полимер, PET-ийн дахин боловсруулалт ба уураг',
    contentEn: 'An addition polymer such as poly(ethene) has the same repeat unit as its alkene monomer. Condensation polymers such as nylon (a polyamide from a dicarboxylic acid and a diamine) and PET (a polyester from a dicarboxylic acid and a diol) also release a small molecule, usually water. PET can be broken back into monomers and re-polymerised, which supports recycling. Proteins are natural polyamides made from amino acids.',
    contentMn: 'Поли(этен) гэх нэмэлтийн полимер нь мономер алкентэй ижил давтагдах нэгжтэй. Нейлон (дикарбоксилын хүчил ба диаминаас полиамид), PET (дикарбоксилын хүчил ба диолоос полиэфир) зэрэг конденсацийн полимер нь жижиг молекул, ихэвчлэн ус ялгаруулна. PET-ийг мономер болгон задлаад дахин полимержүүлж болох тул дахин боловсруулахад тусална. Уураг нь амин хүчлээс бүтсэн байгалийн полиамид.'
  },
  '12.3': {
    titleEn: 'Rf values and locating colourless substances',
    titleMn: 'Rf утга ба өнгөгүй бодисыг илрүүлэх',
    contentEn: 'Rf = distance moved by the substance ÷ distance moved by the solvent front. It lies between 0 and 1 and is characteristic of the substance under fixed conditions. Colourless substances need a locating agent (for example, ninhydrin for amino acids) applied after the run to make the spots visible.',
    contentMn: 'Rf = бодисын явсан зай ÷ уусгагчийн зах явсан зай. 0-ээс 1 хооронд байх ба тогтмол нөхцөлд бодисын онцлог шинж. Өнгөгүй бодис гүйлгэсний дараа илрүүлэгч бодис (жишээ нь амин хүчлийн нингидрин) шаардана.'
  }
};
