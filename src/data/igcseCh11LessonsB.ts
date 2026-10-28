// IGCSE 0620 chapter 11 (organic chemistry), lessons 3–4. They follow the deck Ch19_Reactions_of_organic_compounds.pptx
// and its plan of two 40-minute lessons (slides 1–11 and 12 on), with the review slides 22–29.
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig11';

export const IG11_LESSONS_B: StatesLesson[] = [
  lesson(
    3,
    bi('Алканы урвал, крекинг, алкены нэгдэх урвал ба этанол', 'Reactions of alkanes, cracking, addition to alkenes and ethanol'),
    bi(
      'Алканы бүрэн шаталт ба хлортой (UV) орлуулах урвал; крекинг ба түүний хэрэгцээ; алкенд бром, устөрөгч, уур нэмэгдэх урвал; этанолыг исгэх ба гидратжуулах аргаар гаргаж харьцуулах; этанолын шаталт ба хэрэглээ.',
      'Complete combustion of alkanes and substitution with chlorine (UV light); cracking and why it is needed; addition of bromine, hydrogen and steam to alkenes; making ethanol by fermentation and by hydration and comparing them; the combustion and uses of ethanol.'
    ),
    [
      bi('Алкан идэвх муутай боловч шатна: CH₄ + 2O₂ → CO₂ + 2H₂O. UV гэрэлд хлортой орлуулах: CH₄ + Cl₂ → CH₃Cl + HCl; (E) фотохимийн урвал.', 'Alkanes are generally unreactive but burn: CH₄ + 2O₂ → CO₂ + 2H₂O. Substitution with chlorine in UV light: CH₄ + Cl₂ → CH₃Cl + HCl; (E) a photochemical reaction.'),
      bi('Крекинг: том алкан → жижиг алкан + алкен (өндөр температур, катализатор), жишээ C₁₀H₂₂ → C₈H₁₈ + C₂H₄. Алкен нэмэгдэх: Br₂; H₂ (Ni, ~150 °C); уур (H₃PO₄, 300 °C, 6000 kPa).', 'Cracking: large alkanes → smaller alkanes + alkenes (high temperature, catalyst), e.g. C₁₀H₂₂ → C₈H₁₈ + C₂H₄. Addition to alkenes: Br₂; H₂ (Ni, ~150 °C); steam (H₃PO₄, 300 °C, 6000 kPa).'),
      bi('Исгэх: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (мөөгөнцөр, 25–35 °C, агааргүй) – сэргээгдэх, удаан. Гидратжуулах – хурдан, цэвэр, газрын тосноос. Этанол – уусгагч, түлш: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O.', 'Fermentation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (yeast, 25–35 °C, no air) – renewable, slow. Hydration – fast, pure, from crude oil. Ethanol is a solvent and a fuel: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi('Том асуулт: ижил этанолыг элсэн чихрээс мөөгөнцрөөр, эсвэл газрын тосноос үйлдвэрт гаргаж болно – аль нь илүү вэ? "Санал нийлэх үү?" (крекинг урт гинжийг богиносгоно; алкан бромын устай амархан урвална; исгэх ба гидратжуулах хоёулаа этанол өгнө) ба төлөвлөгөө.', 'Big question: the same ethanol can be made from sugar by yeast or from crude oil in a factory – which way is better? "Agree or disagree?" (cracking breaks long chains into shorter ones; alkanes react easily with bromine water; fermentation and hydration both produce ethanol) and the plan.'),
        bi('Элсэн чихрээс этанол гаргах 2 давуу талыг хосоороо 60 секундэд жагсааж, санал өгнө.', 'List two advantages of making ethanol from sugar in 60 s; vote with thumbs.'),
        bi('Исгэх агааргүй явагдана; алкан UV гэрэл шаардана.', 'Fermentation takes place without air; alkanes need UV light.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi('Орлуулах ба нэмэгдэх урвал, крекинг, исгэх, гидратжуулах, (E) эфиржүүлэх. Fist to five. Давталт (бүлэг 18): алкены ерөнхий томьёо, хүчлийн функциональ бүлэг, алкены тест, CH₃CH₂OH-ийн нэр.', 'Substitution and addition reactions, cracking, fermentation, hydration, (E) esterification. Fist to five. Retrieval (chapter 18): general formula of alkenes, functional group of acids, the test for an alkene, the name of CH₃CH₂OH.'),
        bi('Нэр томьёог хэлэхгүйгээр тайлбарлана; самбартаа бичээд 3-2-1-д өргөнө.', 'Explain a term without saying it; write on boards and reveal on 3-2-1.'),
        bi('Нэг бүтээгдэхүүн = нэмэгдэх; CₙH₂ₙ; –COOH; бромын ус улбар шар → өнгөгүй; ethanol.', 'One product = addition; CₙH₂ₙ; –COOH; bromine water orange → colourless; ethanol.')
      ],
      [
        bi('Алканы урвал ба крекинг; судлах', 'Reactions of alkanes and cracking; explore'),
        bi('Пропан ба метаны бүрэн шаталт; CH₄ + Cl₂ → CH₃Cl + HCl (UV, (E) фотохимийн). Крекинг (Зураг 19.12): өндөр температур, Al₂O₃/цахиурын катализатор; C₁₀H₂₂ → C₈H₁₈ + C₂H₄; бензиний эрэлт нийлүүлэлтээс их, полимер ба этанолд алкен хэрэгтэй. Судлах: FuseSchool – крекинг.', 'Complete combustion of propane and methane; CH₄ + Cl₂ → CH₃Cl + HCl (UV, (E) photochemical). Cracking (Figure 19.12): high temperature, aluminium oxide/silica catalyst; C₁₀H₂₂ → C₈H₁₈ + C₂H₄; demand for petrol is greater than supply, and alkenes are needed for polymers and ethanol. Explore: FuseSchool – cracking.'),
        bi('H ба "Cl" сурагч байраа солино; C₁₂H₂₆ → C₈H₁₈ + __C₂H₄-ийг тэнцүүлнэ.', 'An H student swaps places with a "Cl" student; balance C₁₂H₂₆ → C₈H₁₈ + __C₂H₄.'),
        bi('HCl-ийг мартахгүй; коэффициент 2; крекинг шаталт биш – дулааны задрал.', 'Do not forget HCl; the coefficient is 2; cracking is thermal decomposition, not burning.')
      ],
      [
        bi('Алкены нэмэгдэх урвал; hinge 1', 'Addition reactions of alkenes; hinge 1'),
        bi('C=C тул алкен идэвхтэй. C₂H₄ + Br₂ → C₂H₄Br₂; C₂H₄ + H₂ → C₂H₆ (Ni); C₂H₄ + H₂O → C₂H₅OH (H₃PO₄, 300 °C, 6000 kPa). (E) Нэг Br атом нүүрстөрөгч бүрт: 1,2-дибромэтан; пропен → 1,2-дибромпропан. Hinge 1: аль нь орлуулах урвал вэ.', 'Alkenes are reactive because of C=C. C₂H₄ + Br₂ → C₂H₄Br₂; C₂H₄ + H₂ → C₂H₆ (Ni); C₂H₄ + H₂O → C₂H₅OH (H₃PO₄, 300 °C, 6000 kPa). (E) One Br atom adds to each carbon: 1,2-dibromoethane; propene → 1,2-dibromopropane. Hinge 1: which reaction is substitution.'),
        bi('Мөр бүрийн бүтээгдэхүүнийг самбартаа таамаглана; ABCD хуруугаар санал өгнө.', 'Predict the product of each row on boards; vote with ABCD fingers.'),
        bi('Хоёр Br-ийг нэг C дээр зурахгүй; hinge: B (CH₄ + Cl₂ – хоёр бүтээгдэхүүн).', 'Do not put both Br atoms on one carbon; hinge: B (CH₄ + Cl₂ – two products).')
      ],
      [
        bi('Этанол гаргах хоёр арга, хэрэглээ ба шаталт', 'Two ways of making ethanol, uses and combustion'),
        bi('Хүснэгт: тэгшитгэл, нөхцөл, түүхий эд (сэргээгдэх / сэргээгдэхгүй), процесс (batch, удаан / тасралтгүй, хурдан), бүтээгдэхүүн (шингэрүүлсэн – нэрэх / цэвэр). Зураг 19.19. Этанол уусгагч ба түлш; C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O; биотүлш.', 'The table: equation, conditions, raw material (renewable / non-renewable), process (batch, slow / continuous, fast), product (dilute – needs distillation / pure). Figure 19.19. Ethanol as a solvent and a fuel; C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O; a biofuel.'),
        bi('Анги хоёр хуваагдаж исгэх ба гидратжуулахыг хамгаалж 60 секунд мэтгэлцэнэ; шаталтын тэгшитгэлийг тэнцүүлнэ.', 'Half the class argues for fermentation and half for hydration for 60 s; balance the combustion equation.'),
        bi('Агаартай бол цуу болно; O₂-ийн коэффициент 3 (3.5 биш).', 'With air it turns to vinegar; the O₂ coefficient is 3 (not 3.5).')
      ]
    ]),
    [
      exitItem(
        bi('Метан хлортой урвалд орохын тулд юу хэрэгтэй вэ?', 'What is needed for chlorine to react with methane?'),
        [bi('Никель катализатор', 'A nickel catalyst'), bi('Хэт ягаан (UV) гэрэл', 'Ultraviolet light'), bi('Мөөгөнцөр', 'Yeast'), bi('Фосфорын хүчил', 'Phosphoric acid')],
        1,
        bi('UV гэрэл энерги өгнө – фотохимийн орлуулах урвал.', 'UV light provides the energy – photochemical substitution.')
      ),
      exitItem(
        bi('Аль урвал орлуулах урвал вэ?', 'Which reaction is a substitution reaction?'),
        [bi('C₂H₄ + H₂ → C₂H₆', 'C₂H₄ + H₂ → C₂H₆'), bi('CH₄ + Cl₂ → CH₃Cl + HCl', 'CH₄ + Cl₂ → CH₃Cl + HCl'), bi('C₂H₄ + H₂O → C₂H₅OH', 'C₂H₄ + H₂O → C₂H₅OH'), bi('C₁₀H₂₂ → C₈H₁₈ + C₂H₄', 'C₁₀H₂₂ → C₈H₁₈ + C₂H₄')],
        1,
        bi('Cl атом H атомыг орлоно; A ба C – нэмэгдэх, D – крекинг.', 'A Cl atom replaces an H atom; A and C are addition, D is cracking.')
      ),
      exitItem(
        bi('Декан октан ба өөр нэг бодис болж крекинглэгдэхэд нөгөө бүтээгдэхүүн юу вэ?', 'Decane is cracked into octane and one other product. What is it?'),
        [bi('Устөрөгч', 'Hydrogen'), bi('Этен', 'Ethene'), bi('Метан', 'Methane'), bi('Этан', 'Ethane')],
        1,
        bi('C₁₀H₂₂ → C₈H₁₈ + C₂H₄.', 'C₁₀H₂₂ → C₈H₁₈ + C₂H₄.')
      ),
      exitItem(
        bi('Этенийг гидратжуулах нөхцөл аль нь вэ?', 'Which conditions are used for the hydration of ethene?'),
        [
          bi('Мөөгөнцөр, 30 °C, агааргүй', 'Yeast, 30 °C, no air'),
          bi('Уур, 300 °C, 6000 kPa, фосфорын хүчил катализатор', 'Steam, 300 °C, 6000 kPa, phosphoric acid catalyst'),
          bi('Никель катализатор, 150 °C', 'Nickel catalyst, 150 °C'),
          bi('UV гэрэл', 'UV light')
        ],
        1,
        bi('A – исгэх; C – устөрөгч нэмэх; D – хлороор орлуулах.', 'A is fermentation; C is hydrogenation; D is substitution with chlorine.')
      ),
      exitItem(
        bi('Исгэх процесст агаарыг яагаад оруулдаггүй вэ?', 'Why is air kept out during fermentation?'),
        [
          bi('Этанол этан хүчил болж исэлдэхгүйн тулд', 'So that ethanol is not oxidised to ethanoic acid'),
          bi('Урвалыг хурдасгах', 'To speed up the reaction'),
          bi('Температурыг өсгөх', 'To raise the temperature'),
          bi('Мөөгөнцрийг устгах', 'To kill the yeast')
        ],
        0,
        bi('Мөөгөнцөр агааргүй амьсгалж, этанол үүсгэнэ.', 'The yeast respires anaerobically to make ethanol.')
      )
    ],
    ID
  ),
  lesson(
    4,
    bi('Этанол, карбоксилын хүчил, эфиржүүлэх ба шалгалт', 'Ethanol, carboxylic acids, esterification and exam practice'),
    bi(
      'Исгэх ба гидратжуулахыг харьцуулах; этан хүчлийн хүчлийн урвалууд; (E) этанолыг исэлдүүлж этан хүчил гаргах; (E) эфиржүүлэх; урвалын нөхцлийг hinge асуултаар шалгах; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх.',
      'Compare fermentation and hydration; the reactions of ethanoic acid as an acid; (E) oxidising ethanol to ethanoic acid; (E) esterification; check reaction conditions with hinge questions; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('Этан хүчил – сул хүчил: 2CH₃COOH + Mg → (CH₃COO)₂Mg + H₂; CH₃COOH + NaOH → CH₃COONa + H₂O; 2CH₃COOH + CaCO₃ → (CH₃COO)₂Ca + H₂O + CO₂.', 'Ethanoic acid is a weak acid: 2CH₃COOH + Mg → (CH₃COO)₂Mg + H₂; CH₃COOH + NaOH → CH₃COONa + H₂O; 2CH₃COOH + CaCO₃ → (CH₃COO)₂Ca + H₂O + CO₂.'),
      bi('(E) Этанолыг хүчиллэгжүүлсэн калийн манганат(VII)-оор reflux-д халааж исэлдүүлнэ (ягаан → өнгөгүй), эсвэл бактераар (цуу).', '(E) Ethanol is oxidised with acidified potassium manganate(VII), heated under reflux (purple → colourless), or by bacteria (vinegar).'),
      bi('(E) Хүчил + спирт ⇌ эфир + ус (өтгөн хүхрийн хүчил катализатор, бүлээн): CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O; эфир – сүрчиг, хүнсний амтлагч.', '(E) Acid + alcohol ⇌ ester + water (concentrated sulfuric acid catalyst, warm): CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O; esters are used in perfumes and food flavourings.')
    ],
    lessonSteps([
      [
        bi('Хамтдаа: этанол; карбоксилын хүчил', 'We do: ethanol; carboxylic acids'),
        bi('Хамтдаа: агаарыг яагаад оруулахгүй, яагаад ~15%-д зогсох, гидратжуулахын давуу тал, исгэхийн давуу тал. Этан хүчлийн Mg, NaOH, CaCO₃-тай урвал; (E) исэлдэл ба reflux (Зураг 19.22).', 'Together: why air is kept out, why fermentation stops at about 15%, an advantage of hydration, an advantage of fermentation. Ethanoic acid with Mg, NaOH and CaCO₃; (E) oxidation and reflux (Figure 19.22).'),
        bi('Асуулт бүрт өөр сурагч хариулна; урвал бүрийн давсны нэрийг таамаглана.', 'A different student answers each question; predict the salt name for each reaction.'),
        bi('Этанол мөөгөнцрийг устгана; хурдан/цэвэр; сэргээгдэх/бага температур; magnesium ethanoate ("ethanoic magnesium" биш).', 'The ethanol kills the yeast; fast/pure; renewable/low temperature; magnesium ethanoate (not "ethanoic magnesium").')
      ],
      [
        bi('(E) Эфиржүүлэх; бие даан', '(E) Esterification; you do'),
        bi('(E) CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O; methyl propanoate, ethyl methanoate. Бие даан: этен + устөрөгч ба катализатор, этанолын шаталт, этан хүчил + NaOH-ийн давс, (E) CH₄ + Cl₂ UV-д.', '(E) CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O; methyl propanoate, ethyl methanoate. You do: ethene + hydrogen and its catalyst, combustion of ethanol, the salt from ethanoic acid + NaOH, (E) CH₄ + Cl₂ in UV light.'),
        bi('Propanol + ethanoic acid-ийн эфирийг хосоороо нэрлэнэ; дангаараа бичээд хостойгоо шалгана.', 'Name the ester from propanol and ethanoic acid in pairs; write alone, then peer-check.'),
        bi('propyl ethanoate; ethane, nickel ("iron" биш); C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O; sodium ethanoate; chloromethane (+ HCl), фотохимийн орлуулах.', 'propyl ethanoate; ethane, nickel (not "iron"); C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O; sodium ethanoate; chloromethane (+ HCl), photochemical substitution.')
      ],
      [
        bi('Hinge 2–3', 'Hinges 2–3'),
        bi('Hinge 2: этенийг гидратжуулах нөхцөл. Hinge 3: этан хүчил ба кальцийн карбонатын урвалын бүтээгдэхүүн.', 'Hinge 2: the conditions for the hydration of ethene. Hinge 3: the products of ethanoic acid and calcium carbonate.'),
        bi('ABCD картаар санал өгнө.', 'Vote with ABCD cards.'),
        bi('Hinge 2: B (C – устөрөгч нэмэх); hinge 3: A (давс + ус + CO₂; эфир биш).', 'Hinge 2: B (C is hydrogenation); hinge 3: A (salt + water + CO₂; not an ester).')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi('(a) этен + бромын урвалын төрөл; (b) глюкоз исгэх тэгшитгэл; (c) крекинг яагаад чухал; (d) (E) этанолыг исэлдүүлэх бодис ба өнгөний өөрчлөлт. Зөвлөмж: UV, агааргүй, дулааны задрал, "acidified". Үнэлэх: газрын тосгүй оронд исгэх ба гидратжуулах. Алдаа засах: этен + уур → "этан".', '(a) the type of reaction of ethene with bromine; (b) the equation for fermenting glucose; (c) why cracking is important; (d) (E) the reagent that oxidises ethanol and the colour change. Tips: UV, no air, thermal decomposition, "acidified". Evaluate: fermentation vs hydration in a country without oil. Error clinic: ethene + steam → "ethane".'),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes and peer-mark; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('addition; C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂; бензиний эрэлт > нийлүүлэлт, полимерт алкен; acidified KMnO₄, ягаан → өнгөгүй; бүтээгдэхүүн – этанол.', 'addition; C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂; demand for petrol > supply, alkenes for polymers; acidified potassium manganate(VII), purple → colourless; the product is ethanol.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: метан + хлорт юу хэрэгтэй, деканы крекингийн бүтээгдэхүүн, этанолын 2 хэрэглээ, (E) этанол ба этан хүчлийн эфир. Fist to five дахин.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: what methane + chlorine needs, the products of cracking decane, two uses of ethanol, (E) the ester from ethanol and ethanoic acid. Fist to five again.'),
        bi('Гарах билетийг 4 минутад ганцаараа бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('UV гэрэл; октан ба этен; уусгагч, түлш; ethyl ethanoate.', 'UV light; octane and ethene; solvent, fuel; ethyl ethanoate.')
      ]
    ]),
    [
      exitItem(
        bi('Этан хүчил кальцийн карбонаттай урвалд ороход юу үүсэх вэ?', 'What is produced when ethanoic acid reacts with calcium carbonate?'),
        [
          bi('Кальцийн этаноат, ус ба нүүрстөрөгчийн давхар исэл', 'Calcium ethanoate, water and carbon dioxide'),
          bi('Кальцийн этаноат ба устөрөгч', 'Calcium ethanoate and hydrogen'),
          bi('Этил этаноат ба ус', 'Ethyl ethanoate and water'),
          bi('Кальцийн исэл ба этанол', 'Calcium oxide and ethanol')
        ],
        0,
        bi('Хүчил + карбонат → давс + ус + CO₂.', 'Acid + carbonate → salt + water + carbon dioxide.')
      ),
      exitItem(
        bi('Этан хүчил натрийн гидроксидтэй урвалд ороход ямар давс үүсэх вэ?', 'Name the salt formed from ethanoic acid and sodium hydroxide.'),
        [bi('Натрийн этаноат', 'Sodium ethanoate'), bi('Этил натри', 'Ethyl sodium'), bi('Натрийн карбонат', 'Sodium carbonate'), bi('Натрийн метаноат', 'Sodium methanoate')],
        0,
        bi('CH₃COOH + NaOH → CH₃COONa + H₂O.', 'CH₃COOH + NaOH → CH₃COONa + H₂O.')
      ),
      exitItem(
        bi('Этен устөрөгчтэй урвалд ороход аль катализатор хэрэглэх вэ?', 'Which catalyst is used when ethene reacts with hydrogen?'),
        [bi('Төмөр', 'Iron'), bi('Никель', 'Nickel'), bi('Фосфорын хүчил', 'Phosphoric acid'), bi('Мөөгөнцөр', 'Yeast')],
        1,
        bi('Бүтээгдэхүүн – этан; төмөр нь Haber процессынх.', 'The product is ethane; iron belongs to the Haber process.')
      ),
      exitItem(
        bi('(E) Этанолыг этан хүчил болгон исэлдүүлэх бодис ба өнгөний өөрчлөлт?', '(E) Which reagent oxidises ethanol to ethanoic acid, and what is the colour change?'),
        [
          bi('Хүчиллэгжүүлсэн калийн манганат(VII); ягаан → өнгөгүй', 'Acidified potassium manganate(VII); purple to colourless'),
          bi('Бромын ус; улбар шар → өнгөгүй', 'Bromine water; orange to colourless'),
          bi('Калийн манганат(VII); өнгөгүй → ягаан', 'Potassium manganate(VII); colourless to purple'),
          bi('Өтгөн хүхрийн хүчил; өнгө өөрчлөгдөхгүй', 'Concentrated sulfuric acid; no change')
        ],
        0,
        bi('"Acidified" гэдгийг орхивол оноо алдана.', 'Leaving out "acidified" loses the mark.')
      ),
      exitItem(
        bi('(E) Этанол ба этан хүчлээс үүсэх эфирийн нэр?', '(E) Name the ester from ethanol and ethanoic acid.'),
        [bi('Ethyl ethanoate', 'Ethyl ethanoate'), bi('Methyl ethanoate', 'Methyl ethanoate'), bi('Ethyl methanoate', 'Ethyl methanoate'), bi('Ethanoate ethyl', 'Ethanoate ethyl')],
        0,
        bi('CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O.', 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O.')
      )
    ],
    ID
  )
];

export const IG11_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'ig11-3': [
    term(bi('орлуулах урвал', 'substitution reaction'), bi('Нэг атом (бүлэг) өөр атомоор (бүлгээр) солигдох урвал.', 'One atom (or group) is replaced by another atom (or group).')),
    term(bi('нэмэгдэх урвал', 'addition reaction'), bi('Хоёр урвалд орогч нийлж нэг л бүтээгдэхүүн үүсгэх урвал.', 'Two reactants join to form one product (only one product).')),
    term(bi('крекинг', 'cracking'), bi('Том алканыг дулаанаар задалж жижиг алкан ба алкен (ба устөрөгч) гаргах.', 'Thermal decomposition of large alkanes into smaller alkanes and alkenes (and hydrogen).')),
    term(bi('исгэх', 'fermentation'), bi('Глюкоз → этанол + нүүрстөрөгчийн давхар исэл, мөөгөнцрөөр, агааргүй.', 'Glucose → ethanol + carbon dioxide, using yeast, without air.')),
    term(bi('гидратжуулах', 'hydration'), bi('Алкенд ус (уур) нэмж спирт гаргах.', 'Adding water (steam) to an alkene to make an alcohol.'))
  ],
  'ig11-4': [
    term(bi('эфиржүүлэх (E)', 'esterification (E)'), bi('Карбоксилын хүчил + спирт → эфир + ус.', 'Carboxylic acid + alcohol → ester + water.'))
  ]
};

export const IG11_PRACTICE_B: Record<string, PracticeItem[]> = {
  'ig11-3': [
    easy(
      bi('Этен + бромын урвалын төрөл?', 'Name the type of reaction when ethene reacts with bromine.'),
      [bi('Орлуулах', 'Substitution'), bi('Нэмэгдэх', 'Addition'), bi('Крекинг', 'Cracking'), bi('Исэлдэл', 'Oxidation')],
      1,
      bi('Нэг бүтээгдэхүүн – 1,2-дибромэтан.', 'One product – 1,2-dibromoethane.')
    ),
    easy(
      bi('Этанолын бүрэн шаталтын тэнцүүлсэн тэгшитгэл аль нь вэ?', 'Which is the balanced equation for the complete combustion of ethanol?'),
      [bi('C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O', 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O'), bi('C₂H₅OH + 2O₂ → 2CO₂ + 3H₂O', 'C₂H₅OH + 2O₂ → 2CO₂ + 3H₂O'), bi('C₂H₅OH + 3.5O₂ → 2CO₂ + 3H₂O', 'C₂H₅OH + 3.5O₂ → 2CO₂ + 3H₂O'), bi('C₂H₅OH + O₂ → CO₂ + H₂O', 'C₂H₅OH + O₂ → CO₂ + H₂O')],
      0,
      bi('O: 1 + 6 = 4 + 3.', 'O: 1 + 6 = 4 + 3.')
    ),
    hard(
      bi('Крекинг яагаад чухал болохыг тайлбарла. [2]', 'Explain why cracking is important. [2]'),
      bi('Жижиг алкан/бензиний эрэлт газрын тосноос гарах нийлүүлэлтээс их (1); полимер (ба этанол) гаргахад алкен өгнө (1).', 'The demand for smaller alkanes / petrol is greater than the supply from crude oil (1); it produces alkenes for polymers (and ethanol) (1).'),
      bi('Крекингийг "шатаах" гэвэл буруу – дулааны задрал.', 'Calling cracking "burning" is wrong – it is thermal decomposition.')
    )
  ],
  'ig11-4': [
    easy(
      bi('Исгэх процесс яагаад ~15% этанолд зогсдог вэ?', 'Why does fermentation stop at about 15% ethanol?'),
      [bi('Этанол мөөгөнцрийг устгана', 'The ethanol kills the yeast'), bi('Агаар орно', 'Air gets in'), bi('Температур буурна', 'The temperature falls'), bi('CO₂ дуусна', 'The CO₂ runs out')],
      0,
      bi('Шалтгаан нь мөөгөнцөр үхэх.', 'The reason is that the yeast dies.')
    ),
    easy(
      bi('Исгэхийн гидратжуулахаас давуу тал аль нь вэ?', 'Which is an advantage of fermentation over hydration?'),
      [bi('Хурдан', 'It is fast'), bi('Цэвэр бүтээгдэхүүн', 'It gives a pure product'), bi('Сэргээгдэх түүхий эд', 'It uses a renewable raw material'), bi('Тасралтгүй процесс', 'It is a continuous process')],
      2,
      bi('Бусад нь гидратжуулахын давуу тал.', 'The others are advantages of hydration.')
    ),
    hard(
      bi('Глюкоз исгэх тэгшитгэлийг бичиж, нөхцлийг нэрлэ.', 'Write the equation for the fermentation of glucose and give the conditions.'),
      bi('C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂; мөөгөнцөр, 25–35 °C, агааргүй.', 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂; yeast, 25–35 °C, no air (anaerobic).'),
      bi('"Хүчилтөрөгч хэрэгтэй" гэвэл буруу.', '"Oxygen is needed" is wrong.')
    )
  ]
};
