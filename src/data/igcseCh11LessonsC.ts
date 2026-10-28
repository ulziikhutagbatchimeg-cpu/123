// IGCSE 0620 chapter 11 (organic chemistry), lessons 5–6. They follow the deck Ch20_Petrochemicals_and_polymers.pptx
// and its plan of two 40-minute lessons (slides 1–10 and 11 on), with the review slides 22–29.
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig11';

export const IG11_LESSONS_C: StatesLesson[] = [
  lesson(
    5,
    bi('Газрын тос, фракцаар нэрэх ба полимер', 'Petroleum, fractional distillation and polymers'),
    bi(
      'Чулуужсан түлшийг нэрлэх; байгалийн хийн гол бүрэлдэхүүн метан; газрын тосыг фракцаар нэрэх, фракцууд ба хэрэглээ; гинжний урт, дэгдэмхий чанар, буцлах цэг, зуурамтгай чанарын хандлага; полимер ба нэмэгдэх полимержилт.',
      'Name the fossil fuels; methane is the main constituent of natural gas; the fractional distillation of petroleum, its fractions and their uses; trends in chain length, volatility, boiling point and viscosity; polymers and addition polymerisation.'
    ),
    [
      bi('Чулуужсан түлш: нүүрс, байгалийн хий (голдуу метан), газрын тос – нүүрсустөрөгчийн хольц. Баганын доод хэсэг халуун, дээд хэсэг сэрүүн; уур буцлах цэгээрээ өөр өндөрт конденсацлагдана.', 'Fossil fuels: coal, natural gas (mainly methane) and petroleum – a mixture of hydrocarbons. The column is hot at the bottom and cooler at the top; vapours condense at different heights by boiling point.'),
      bi('Фракцууд дээрээс доош: refinery gas (халаах, хоол хийх), бензин (машин), naphtha (химийн түүхий эд), kerosene (онгоцны түлш), diesel (дизель хөдөлгүүр), fuel oil (хөлөг, гэрийн халаалт), lubricating oil (тосолгоо, лав), bitumen (зам).', 'Fractions from top to bottom: refinery gas (heating and cooking), petrol (cars), naphtha (chemical feedstock), kerosene (jet fuel), diesel (diesel engines), fuel oil (ships and home heating), lubricating oil (lubricants, waxes and polishes), bitumen (roads).'),
      bi('Доош: гинж урт, буцлах цэг ба зуурамтгай чанар өснө, дэгдэмхий чанар буурна. Нэмэгдэх полимержилт: n CH₂=CH₂ → –(CH₂–CH₂)ₙ–, нэг л бүтээгдэхүүн.', 'Going down: chains get longer, boiling point and viscosity increase, volatility decreases. Addition polymerisation: n CH₂=CH₂ → –(CH₂–CH₂)ₙ–, only one product.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi('Том асуулт: бензин, гялгар уут, нейлон олс, замын давирхай бүгд нэг хар шингэнээс – газрын тосыг яаж хуваадаг, хуванцар ямар асуудал үүсгэдэг вэ? "Санал нийлэх үү?" (газрын тос нэг нэгдэл; богино гинж бага буцлах цэгтэй; бүх хуванцар задардаг) ба төлөвлөгөө.', 'Big question: petrol, plastic bags, nylon ropes and road tar all come from one black liquid – how is crude oil separated and what problems do plastics cause? "Agree or disagree?" (petroleum is a single compound; shorter chains have lower boiling points; all plastics are biodegradable) and the plan.'),
        bi('Өрөөнд байгаа газрын тосноос гаралтай 5 зүйлийг хосоороо 60 секундэд жагсааж, санал өгнө.', 'List five things in the room made from crude oil in 60 s; vote with thumbs.'),
        bi('Бүгд нүүрсустөрөгчөөс; газрын тос – хольц.', 'All come from hydrocarbons; petroleum is a mixture.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi('Чулуужсан түлш, газрын тос, фракцаар нэрэх, фракц, полимер, (E) конденсацийн полимер. Fist to five. Давталт: нэрэхэд ашиглах шинж, алканы ерөнхий томьёо, крекинг, алкен + бром.', 'Fossil fuels, petroleum, fractional distillation, fraction, polymer, (E) condensation polymer. Fist to five. Retrieval: the property used in distillation, the general formula of alkanes, cracking, alkenes + bromine.'),
        bi('Нэр томьёог хэлэхгүйгээр тайлбарлана; самбартаа бичээд 3-2-1-д өргөнө.', 'Explain a term without saying it; write on boards and reveal on 3-2-1.'),
        bi('Фракц цэвэр бодис биш; буцлах цэгийн ялгаа; CₙH₂ₙ₊₂; крекинг ≠ нэрэх; addition.', 'A fraction is not a pure substance; different boiling points; CₙH₂ₙ₊₂; cracking ≠ distillation; addition.')
      ],
      [
        bi('Фракцаар нэрэх ба фракцууд; судлах', 'Fractional distillation and the fractions; explore'),
        bi('Зураг 20.3: газрын тосыг ууршуулж баганад оруулна; жижиг молекул дээрээс, том молекул доороос гарна – физик процесс. Найман фракц ба хэрэглээ (syllabus-ийн үгээр). Судлах: FuseSchool – фракцаар нэрэх; бензин дээр эсвэл доор цуглах уу?', 'Figure 20.3: petroleum is vaporised and enters the column; small molecules leave at the top, large ones at the bottom – a physical process. The eight fractions and their uses (in syllabus words). Explore: FuseSchool – fractional distillation; does petrol collect near the top or the bottom?'),
        bi('Сурагчид өөр хэмжээтэй молекул болж баганад "авирна"; хос бүр фракцуудыг дээрээс доош цээжээр хэлнэ.', 'Students as molecules of different sizes "climb" the column; pairs recite the fractions top to bottom.'),
        bi('Химийн урвал явагддаггүй; naphtha – химийн түүхий эд (машины түлш биш).', 'No chemical reaction takes place; naphtha is a chemical feedstock (not car fuel).')
      ],
      [
        bi('Баганын хандлага; hinge 1; хамтдаа', 'Trends down the column; hinge 1; we do'),
        bi('Refinery gas C₁–C₄ → bitumen C₇₀+: гинжний урт, буцлах цэг, зуурамтгай чанар өснө; дэгдэмхий чанар буурна. Hinge 1: хамгийн өндөр буцлах цэгтэй, зам хийдэг фракц. Хамтдаа: онгоцны түлш, химийн түүхий эд, бензин ба дизелийн дэгдэмхий чанар, байгалийн хий.', 'Refinery gas C₁–C₄ → bitumen C₇₀+: chain length, boiling point and viscosity increase; volatility decreases. Hinge 1: the fraction with the highest boiling point used for roads. Together: jet fuel, chemical feedstock, the volatility of petrol vs diesel, natural gas.'),
        bi('Гараа доош хөдөлгөж хандлагыг хэлнэ; ABCD хуруугаар санал өгнө; асуулт бүрт өөр сурагч хариулна.', 'Move a hand down while saying the trends; vote with ABCD fingers; a different student answers each question.'),
        bi('Дэгдэмхий чанар БУУРНА; hinge: D (bitumen); kerosene; naphtha; бензин илүү дэгдэмхий; метан.', 'Volatility DECREASES; hinge: D (bitumen); kerosene; naphtha; petrol is more volatile; methane.')
      ],
      [
        bi('Полимер ба нэмэгдэх полимержилт', 'Polymers and addition polymerisation'),
        bi('Полимер – олон жижиг мономероос тогтсон том молекул; хуванцар полимероос. Нэмэгдэх полимержилт: алкен мономерууд нийлж C=C нээгдэнэ; нэг л бүтээгдэхүүн. n CH₂=CH₂ → –(CH₂–CH₂)ₙ– (Зураг 20.8); (E) давтагдах нэгжийг хаалтанд, хоёр талд холбоо, гадна n.', 'A polymer is a large molecule made from many small monomers; plastics are made from polymers. Addition polymerisation: alkene monomers join as the C=C opens; only one product. n CH₂=CH₂ → –(CH₂–CH₂)ₙ– (Figure 20.8); (E) the repeat unit goes in brackets with a bond out on each side and n outside.'),
        bi('Хосоороо гар барилцсан сурагчид (давхар холбоо) нэг гараа тавьж гинж болно.', 'Students holding hands in pairs (double bond) let go of one hand and join into a chain.'),
        bi('Полимерт C=C үлддэггүй.', 'The C=C does not remain in the polymer.')
      ]
    ]),
    [
      exitItem(
        bi('Аль фракц хамгийн өндөр буцлах цэгтэй бөгөөд зам хийхэд хэрэглэгддэг вэ?', 'Which fraction has the highest boiling point and is used for making roads?'),
        [bi('Naphtha', 'Naphtha'), bi('Kerosene', 'Kerosene'), bi('Fuel oil', 'Fuel oil'), bi('Bitumen', 'Bitumen')],
        3,
        bi('Bitumen: хамгийн урт гинж, хамгийн өндөр буцлах цэг, хамгийн зуурамтгай.', 'Bitumen: the longest chains, highest boiling point, most viscous.')
      ),
      exitItem(
        bi('Аль фракцыг онгоцны түлшинд хэрэглэдэг вэ?', 'Which fraction is used as jet fuel?'),
        [bi('Kerosene / paraffin', 'Kerosene / paraffin'), bi('Naphtha', 'Naphtha'), bi('Diesel oil', 'Diesel oil'), bi('Refinery gas', 'Refinery gas')],
        0,
        bi('Naphtha – химийн түүхий эд.', 'Naphtha is a chemical feedstock.')
      ),
      exitItem(
        bi('Байгалийн хийн гол бүрэлдэхүүн юу вэ?', 'What is the main constituent of natural gas?'),
        [bi('Этан', 'Ethane'), bi('Метан', 'Methane'), bi('Пропан', 'Propane'), bi('Устөрөгч', 'Hydrogen')],
        1,
        bi('Байгалийн хий голдуу метан.', 'Natural gas is mainly methane.')
      ),
      exitItem(
        bi('Гинжний урт ихсэхэд дэгдэмхий чанар ба зуурамтгай чанар хэрхэн өөрчлөгдөх вэ?', 'How do volatility and viscosity change as the chain length increases?'),
        [
          bi('Хоёулаа өснө', 'Both increase'),
          bi('Зуурамтгай чанар өсч, дэгдэмхий чанар буурна', 'Viscosity increases and volatility decreases'),
          bi('Дэгдэмхий чанар өсч, зуурамтгай чанар буурна', 'Volatility increases and viscosity decreases'),
          bi('Хоёулаа буурна', 'Both decrease')
        ],
        1,
        bi('Урт гинж – молекул хоорондын хүч их.', 'Longer chains have stronger intermolecular forces.')
      ),
      exitItem(
        bi('Этенээс үүсэх полимерын нэр?', 'Name the polymer made from ethene.'),
        [bi('Poly(ethane)', 'Poly(ethane)'), bi('Poly(ethene)', 'Poly(ethene)'), bi('Poly(propene)', 'Poly(propene)'), bi('PVC', 'PVC')],
        1,
        bi('"Polyethane" гэвэл буруу.', '"Polyethane" is wrong.')
      )
    ],
    ID
  ),
  lesson(
    6,
    bi('Давтагдах нэгж, конденсацийн полимер, хуванцар ба шалгалт', 'Repeat units, condensation polymers, plastics and exam practice'),
    bi(
      '(E) Нэмэгдэх полимерын давтагдах нэгжийг зурж мономерыг тодорхойлох; (E) конденсацийн полимер: нейлон, PET, уураг; нэмэгдэх ба конденсацийг харьцуулах; хуванцрын байгаль орчны асуудал; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх.',
      '(E) Draw repeat units of addition polymers and deduce the monomers; (E) condensation polymers: nylon, PET and proteins; compare addition and condensation; the environmental challenges of plastics; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('(E) Мономер → давтагдах нэгж: C=C-г C–C болгож хоёр талд холбоо нэмнэ. Пропен → –CH₂–CH(CH₃)–; хлорэтен → PVC. Буцаагаад: гол гинжний 2 C-г авч C=C-г сэргээнэ; –CH₃ – хажуугийн бүлэг.', '(E) Monomer → repeat unit: change C=C to C–C and add a bond on each side. Propene → –CH₂–CH(CH₃)–; chloroethene → PVC. Back again: take two carbons of the main chain and restore the C=C; –CH₃ is a side group.'),
      bi('(E) Конденсаци: хоёр функциональ бүлэгтэй хоёр өөр мономер нийлж, холбоос бүрт ус ялгарна. Нейлон – полиамид (–CONH–); PET – полиэфир (–COO–); уураг – амин хүчлээс тогтсон байгалийн полиамид.', '(E) Condensation: two different monomers, each with two functional groups, join and water is lost at each link. Nylon – a polyamide (–CONH–); PET – a polyester (–COO–); proteins – natural polyamides from amino acids.'),
      bi('Ихэнх хуванцар биологийн задралгүй: хогийн цэг, далай (бичил хуванцар), шатаахад хортой хий. Шийдэл: багасгах, дахин ашиглах, дахин боловсруулах.', 'Most plastics are non-biodegradable: landfill, oceans (microplastics), toxic gases when burned. Solutions: reduce, reuse, recycle.')
    ],
    lessonSteps([
      [
        bi('(E) Давтагдах нэгж ба мономер; хамтдаа', '(E) Repeat units and monomers; we do'),
        bi('(E) Зураг 20.10: пропенээс poly(propene); хлорэтенээс PVC; давтагдах нэгжээс мономер руу. Хамтдаа: хлорэтений полимер, poly(propene)-ийн давтагдах нэгж, –CF₂–CF₂–-ийн мономер, яагаад нэг бүтээгдэхүүнтэй.', '(E) Figure 20.10: poly(propene) from propene; PVC from chloroethene; from repeat unit back to monomer. Together: the polymer from chloroethene, the repeat unit of poly(propene), the monomer of –CF₂–CF₂–, why there is only one product.'),
        bi('Poly(chloroethene)-ийн давтагдах нэгжийг самбартаа зурна; хосоороо уралдана.', 'Draw the repeat unit of poly(chloroethene) on boards; pair race.'),
        bi('PVC; –CH₂–CH(CH₃)–; CF₂=CF₂ (полимер биш мономерыг нэрлэ); мономерын бүх атом полимерт орно. Пропеноос 3 C-тэй гол гинж зурахгүй.', 'PVC; –CH₂–CH(CH₃)–; CF₂=CF₂ (name the monomer, not the polymer); all the monomer atoms end up in the polymer. Do not draw a 3-carbon main chain from propene.')
      ],
      [
        bi('(E) Конденсацийн полимер; нэмэгдэх ба конденсаци', '(E) Condensation polymers; addition vs condensation'),
        bi('(E) Нейлон (Зураг 20.16): дикарбоксилын хүчил + диамин → амид холбоо; PET: дикарбоксилын хүчил + диол → эфир холбоо, мономер руу буцааж болно; уураг – амин хүчил. Хүснэгт 20.4: мономер, бүтээгдэхүүний тоо, мономерын төрөл, жишээ.', '(E) Nylon (Figure 20.16): dicarboxylic acid + diamine → amide links; PET: dicarboxylic acid + diol → ester links, and it can be turned back into monomers; proteins from amino acids. Table 20.4: monomers, number of products, types of monomer, examples.'),
        bi('–OH эсвэл –H карттай сурагчид гар барихад "ус" сурагч гарна; хүснэгтийн нүд бүрийг таамаглана.', 'Students with –OH or –H cards join hands and release a "water" student; predict each cell of the table.'),
        bi('Нэмэгдэх – нэг бүтээгдэхүүн; конденсаци – полимер + ус. PET нэмэгдэх полимер биш.', 'Addition – one product; condensation – polymer + water. PET is not an addition polymer.')
      ],
      [
        bi('Хуванцар ба байгаль орчин; hinge 2–3', 'Plastics and the environment; hinges 2–3'),
        bi('Биологийн задралгүй; хогийн цэг олон зуун жил; далай ба зэрлэг амьтан (Зураг 20.27); шатаахад хортой хий; багасгах, дахин ашиглах, дахин боловсруулах. Hinge 2: нэмэгдэх полимержилтийн зөв өгүүлбэр. Hinge 3 (E): poly(propene)-ийн мономер.', 'Non-biodegradable; landfill for hundreds of years; oceans and wildlife (Figure 20.27); toxic gases when burned; reduce, reuse, recycle. Hinge 2: the correct statement about addition polymerisation. Hinge 3 (E): the monomer of poly(propene).'),
        bi('Сургууль хуванцрыг хэрхэн бага хэрэглэхийг санал болгоно; ABCD картаар санал өгнө.', 'Suggest one way the school could use less plastic; vote with ABCD cards.'),
        bi('Шатаахад зөвхөн CO₂ гарахгүй; hinge 2: B (C=C-тэй мономер); hinge 3: C (CH₂=CHCH₃; пропан полимержихгүй).', 'Burning does not give only CO₂; hinge 2: B (monomers with C=C); hinge 3: C (CH₂=CHCH₃; propane cannot polymerise).')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi('(a) газрын тосыг хуваах процесс; (b) гинжний урттай зуурамтгай ба дэгдэмхий чанар; (c) хуванцрын 2 асуудал; (d) (E) нейлон ба PET-ийн холбоо. Зөвлөмж: нэрэх ≠ крекинг; bitumen урт гинж; давтагдах нэгжид C=C байхгүй; шатаахад хортой хий. Үнэлэх: хогийн цэг, шатаах, дахин боловсруулах. Алдаа засах: poly(ethene)-ийн давтагдах нэгжид CH₂=CH₂.', '(a) the process that separates petroleum; (b) viscosity and volatility with chain length; (c) two problems caused by plastics; (d) (E) the linkages in nylon and PET. Tips: distillation ≠ cracking; bitumen has the longest chains; no C=C in a repeat unit; burning gives toxic gases. Evaluate: landfill, burning, recycling. Error clinic: CH₂=CH₂ inside the brackets of poly(ethene).'),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes and peer-mark; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('Фракцаар нэрэх; зуурамтгай өснө, дэгдэмхий буурна; хогийн цэг дүүргэнэ / далайн амьтанд хор / хортой хий; амид, эфир; –[CH₂–CH₂]ₙ–.', 'Fractional distillation; viscosity increases, volatility decreases; fill landfill / harm marine life / toxic gases; amide, ester; –[CH₂–CH₂]ₙ–.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: зам хийх фракц, полимер гэж юу вэ, этенээс үүсэх полимер, (E) нейлон үүсэхэд ялгарах жижиг молекул. Fist to five дахин.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: the fraction for roads, what a polymer is, the polymer from ethene, (E) the small molecule lost when nylon forms. Fist to five again.'),
        bi('Гарах билетийг 4 минутад ганцаараа бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('bitumen; олон жижиг мономероос тогтсон том молекул; poly(ethene); ус.', 'bitumen; a large molecule made from many small monomers; poly(ethene); water.')
      ]
    ]),
    [
      exitItem(
        bi('Нэмэгдэх полимержилтийн тухай зөв өгүүлбэр аль нь вэ?', 'Which statement about addition polymerisation is correct?'),
        [
          bi('Ус ялгарна', 'Water is produced'),
          bi('Мономерууд C=C давхар холбоотой', 'The monomers contain a C=C double bond'),
          bi('Үргэлж хоёр өөр мономер хэрэгтэй', 'Two different monomers are always needed'),
          bi('Нейлон жишээ нь', 'Nylon is an example')
        ],
        1,
        bi('A, C, D – конденсацийн шинж.', 'A, C and D describe condensation.')
      ),
      exitItem(
        bi('(E) Poly(propene)-ийн мономер аль нь вэ?', '(E) What is the monomer of poly(propene)?'),
        [bi('CH₂=CH₂', 'CH₂=CH₂'), bi('CH₃CH₂CH₃', 'CH₃CH₂CH₃'), bi('CH₂=CHCH₃', 'CH₂=CHCH₃'), bi('CH₂=CHCl', 'CH₂=CHCl')],
        2,
        bi('Пропан C=C-гүй тул полимержихгүй.', 'Propane has no C=C, so it cannot polymerise.')
      ),
      exitItem(
        bi('(E) Нейлон үүсэхэд ямар жижиг молекул ялгарах вэ?', '(E) What small molecule is lost when nylon forms?'),
        [bi('Устөрөгч', 'Hydrogen'), bi('Ус', 'Water'), bi('Нүүрстөрөгчийн давхар исэл', 'Carbon dioxide'), bi('Аммиак', 'Ammonia')],
        1,
        bi('Конденсацийн холбоос бүрт ус ялгарна.', 'Water is lost at each condensation link.')
      ),
      exitItem(
        bi('(E) Нейлон ба PET-ийн холбоосын төрөл?', '(E) Name the type of linkage in nylon and in PET.'),
        [bi('Нейлон – эфир; PET – амид', 'Nylon – ester; PET – amide'), bi('Нейлон – амид; PET – эфир', 'Nylon – amide; PET – ester'), bi('Хоёулаа амид', 'Both amide'), bi('Хоёулаа C–C', 'Both C–C')],
        1,
        bi('Нейлон – полиамид; PET – полиэфир.', 'Nylon is a polyamide; PET is a polyester.')
      ),
      exitItem(
        bi('Хуванцрын байгаль орчны асуудал аль нь вэ?', 'Which is an environmental problem caused by plastics?'),
        [
          bi('Биологийн задралгүй тул хогийн цэгийг дүүргэнэ', 'They are non-biodegradable, so they fill landfill sites'),
          bi('Шатаахад зөвхөн CO₂ ба ус гарна', 'They burn to give only CO₂ and water'),
          bi('Бичил биетэн хурдан задална', 'Microorganisms break them down quickly'),
          bi('Усанд уусна', 'They dissolve in water')
        ],
        0,
        bi('Шатаахад хортой хий гарч болно.', 'Burning plastics can produce toxic gases.')
      )
    ],
    ID
  )
];

export const IG11_GLOSSARY_C: Record<string, GlossaryTerm[]> = {
  'ig11-5': [
    term(bi('чулуужсан түлш', 'fossil fuels'), bi('Нүүрс, байгалийн хий, газрын тос – амьд биетийн үлдэгдлээс сая сая жилд үүссэн.', 'Coal, natural gas and petroleum – formed from the remains of living things over millions of years.')),
    term(bi('газрын тос', 'petroleum (crude oil)'), bi('Нүүрсустөрөгчийн хольц.', 'A mixture of hydrocarbons.')),
    term(bi('фракцаар нэрэх', 'fractional distillation'), bi('Газрын тосыг өөр буцлах цэгийн мужтай фракцуудад хуваах.', 'Separation of petroleum into fractions with different boiling point ranges.')),
    term(bi('фракц', 'fraction'), bi('Ойролцоо гинжний урт ба буцлах цэгтэй нүүрсустөрөгчийн бүлэг.', 'A group of hydrocarbons with similar chain lengths and boiling points.')),
    term(bi('полимер', 'polymer'), bi('Мономер гэх олон жижиг молекулаас тогтсон том молекул.', 'A large molecule built up from many smaller molecules called monomers.'))
  ],
  'ig11-6': [
    term(bi('конденсацийн полимер (E)', 'condensation polymer (E)'), bi('Холбоос бүрт жижиг молекул (жишээ нь ус) ялгаруулж үүсдэг полимер.', 'A polymer formed with the loss of a small molecule (e.g. water) at each link.'))
  ]
};

export const IG11_PRACTICE_C: Record<string, PracticeItem[]> = {
  'ig11-5': [
    easy(
      bi('Газрын тосыг фракцуудад хуваах процессын нэр?', 'Name the process used to separate petroleum into fractions.'),
      [bi('Крекинг', 'Cracking'), bi('Фракцаар нэрэх', 'Fractional distillation'), bi('Полимержилт', 'Polymerisation'), bi('Шүүх', 'Filtration')],
      1,
      bi('Крекинг том молекулыг задална – хуваадаггүй.', 'Cracking breaks large molecules – it does not separate them.')
    ),
    easy(
      bi('Аль фракц химийн түүхий эд вэ?', 'Which fraction is a chemical feedstock?'),
      [bi('Naphtha', 'Naphtha'), bi('Bitumen', 'Bitumen'), bi('Kerosene', 'Kerosene'), bi('Fuel oil', 'Fuel oil')],
      0,
      bi('Naphtha бусад химийн бодис гаргахад.', 'Naphtha is used to make other chemicals.')
    ),
    hard(
      bi('Фракцаар нэрэх баганад газрын тос хэрхэн хуваагддагийг тайлбарла.', 'Describe how petroleum is separated in a fractionating column.'),
      bi('Газрын тосыг ууршуулж баганад оруулна; багана доор халуун, дээр сэрүүн; уур дээшилж буцлах цэгээрээ өөр өндөрт конденсацлагдана; жижиг молекул (бага буцлах цэг) дээрээс, том нь доороос гарна.', 'Petroleum is heated until it vaporises and enters the column; the column is hot at the bottom and cooler at the top; vapours rise and condense at different heights by boiling point; small molecules (low b.p.) leave at the top, large ones at the bottom.'),
      bi('Энэ физик процесс – химийн урвал биш.', 'This is a physical process – not a chemical reaction.')
    )
  ],
  'ig11-6': [
    easy(
      bi('(E) –CF₂–CF₂– давтагдах нэгжтэй полимерын мономер?', '(E) A polymer has the repeat unit –CF₂–CF₂–. Name the monomer.'),
      [bi('Poly(tetrafluoroethene)', 'Poly(tetrafluoroethene)'), bi('Tetrafluoroethene, CF₂=CF₂', 'Tetrafluoroethene, CF₂=CF₂'), bi('Chloroethene', 'Chloroethene'), bi('Ethene', 'Ethene')],
      1,
      bi('Полимерыг биш, мономерыг нэрлэ.', 'Name the monomer, not the polymer.')
    ),
    easy(
      bi('(E) Аль нь конденсацийн полимер вэ?', '(E) Which is a condensation polymer?'),
      [bi('Poly(ethene)', 'Poly(ethene)'), bi('PVC', 'PVC'), bi('PET', 'PET'), bi('Poly(propene)', 'Poly(propene)')],
      2,
      bi('PET – полиэфир; бусад нь нэмэгдэх полимер.', 'PET is a polyester; the others are addition polymers.')
    ),
    hard(
      bi('(E) Нэмэгдэх ба конденсацийн полимержилтийг мономер, бүтээгдэхүүний тоо, жишээгээр харьцуул.', '(E) Compare addition and condensation polymerisation: monomers, number of products and examples.'),
      bi('Нэмэгдэх: алкен (C=C) мономер, ихэвчлэн нэг төрөл, зөвхөн полимер – poly(ethene), poly(propene), PVC. Конденсаци: мономер бүр хоёр функциональ бүлэгтэй, ихэвчлэн хоёр өөр мономер, полимер + ус – нейлон, PET, уураг.', 'Addition: alkene (C=C) monomers, usually one type, the polymer only – poly(ethene), poly(propene), PVC. Condensation: each monomer has two functional groups, usually two different monomers, polymer + water – nylon, PET, proteins.'),
      bi('Давтагдах нэгжид C=C зурвал оноо алдана.', 'Drawing C=C in a repeat unit loses the mark.')
    )
  ]
};
