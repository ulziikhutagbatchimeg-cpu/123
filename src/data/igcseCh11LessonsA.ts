// IGCSE 0620 chapter 11 (organic chemistry), lessons 1–2. They follow the deck Ch18_Introduction_to_organic_chemistry.pptx
// and its plan of two 40-minute lessons (slides 1–12 and 13 on), with the review slides 22–29.
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig11';

export const IG11_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Томьёо, гомолог цуваа, алкан ба алкен', 'Formulae, homologous series, alkanes and alkenes'),
    bi(
      'Молекулын, ерөнхий, бүтцийн ба дэлгэрэнгүй (displayed) томьёог бичих; гомолог цуваа, функциональ бүлгийг тайлбарлах; meth-/eth-/prop-/but- нэршил; ханасан ба ханаагүй, бромын усны тест; (E) бүтцийн изомер.',
      'Write molecular, general, structural and displayed formulae; explain homologous series and functional groups; name with meth-/eth-/prop-/but-; saturated vs unsaturated and the bromine-water test; (E) structural isomers.'
    ),
    [
      bi('Этанол: молекулын C₂H₆O, ерөнхий CₙH₂ₙ₊₁OH, бүтцийн CH₃CH₂OH; дэлгэрэнгүй томьёо бүх атом, бүх холбоог харуулна.', 'Ethanol: molecular C₂H₆O, general CₙH₂ₙ₊₁OH, structural CH₃CH₂OH; a displayed formula shows every atom and every bond.'),
      bi('Гомолог цуваа: ижил ерөнхий томьёо, ижил функциональ бүлэг, төстэй химийн шинж; (E) гишүүд CH₂-оор ялгаатай, буцлах цэг гинжний урттай өснө.', 'A homologous series: same general formula, same functional group, similar chemical properties; (E) members differ by CH₂ and boiling point rises with chain length.'),
      bi('Алкан CₙH₂ₙ₊₂ – ханасан; алкен CₙH₂ₙ – C=C, ханаагүй: бромын ус улбар шар → өнгөгүй. (E) Изомер: ижил молекулын томьёо, өөр бүтэц.', 'Alkanes CₙH₂ₙ₊₂ – saturated; alkenes CₙH₂ₙ – C=C, unsaturated: bromine water orange → colourless. (E) Isomers: same molecular formula, different structure.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi('Том асуулт: нүүрстөрөгч бусад бүх элементээс олон нэгдэл үүсгэдэг – химичид тэдгээрийг яаж нэрлэж, ангилдаг вэ? "Санал нийлэх үү?" (бүх органик нэгдэл нүүрстөрөгчтэй; алкен ханасан; изомерын молекулын томьёо өөр) ба төлөвлөгөө.', 'Big question: carbon forms more compounds than all the other elements together – how do chemists name and organise them? "Agree or disagree?" (all organic compounds contain carbon; alkenes are saturated; isomers have different molecular formulae) and the plan.'),
        bi('Нүүрстөрөгч яагаад олон нэгдэл үүсгэдгийг хосоороо 60 секундэд ярилцаж, эрхий хуруугаар санал өгнө.', 'Discuss in pairs for 60 s why carbon forms so many compounds; vote with thumbs.'),
        bi('Нүүрстөрөгч 4 ковалент холбоо үүсгэж, гинж үүсгэнэ; органик ≠ "байгалийн".', 'Carbon forms 4 covalent bonds and makes chains; organic does not mean "natural".')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi('Гомолог цуваа, функциональ бүлэг, ханасан, ханаагүй, нүүрсустөрөгч, (E) бүтцийн изомер. Fist to five. Давталт: C хэдэн холбоо, H ба O хэдэн холбоо, давхар холбоо, метаны бүрэн шаталт.', 'Homologous series, functional group, saturated, unsaturated, hydrocarbon, (E) structural isomers. Fist to five. Retrieval: bonds made by C, by H and O, a double bond, complete combustion of methane.'),
        bi('Нэр томьёог хэлэхгүйгээр тайлбарлаж, хос нь таана; самбартаа бичээд 3-2-1-д өргөнө.', 'Explain a term without saying it while the partner guesses; write on boards and reveal on 3-2-1.'),
        bi('Нүүрсустөрөгч = ЗӨВХӨН H ба C; 4; H 1, O 2; хоёр хос электрон; CO₂ + H₂O.', 'Hydrocarbon = hydrogen and carbon ONLY; 4; H 1, O 2; two shared pairs; CO₂ + H₂O.')
      ],
      [
        bi('Томьёоны төрөл ба гомолог цуваа', 'Types of formula and homologous series'),
        bi('Этанолын 4 төрлийн томьёо. Гомолог цуваа; (E) CH₂-оор ялгаатай, буцлах цэгийн хандлага (Зураг 18.12). Нэршил: meth- 1, eth- 2, prop- 3, but- 4; -ane, -ene, -ol, -oic acid.', 'The 4 types of formula for ethanol. Homologous series; (E) differ by CH₂, trend in boiling point (Figure 18.12). Naming: meth- 1, eth- 2, prop- 3, but- 4; -ane, -ene, -ol, -oic acid.'),
        bi('Этанолын дэлгэрэнгүй томьёог самбартаа зурна; угтварыг 1–4 хуруугаар давтана.', 'Draw the displayed formula of ethanol on boards; chant the prefixes with 1–4 fingers.'),
        bi('O–H холбоог орхихгүй; prop- = 3.', 'Do not leave out the O–H bond; prop- = 3.')
      ],
      [
        bi('Дөрвөн цуваа, нэршил, алкан ба алкен; судлах', 'Four series, naming, alkanes and alkenes; explore'),
        bi('Хүснэгт: алкан CₙH₂ₙ₊₂, алкен CₙH₂ₙ, спирт CₙH₂ₙ₊₁OH, карбоксилын хүчил CₙH₂ₙ₊₁COOH. Хамтдаа: C₃H₈, бутен, CH₃CH₂CH₂OH, пропан хүчил. Бромын усны тест (Зураг 18.6). Судлах: MolView – 5 нүүрстөрөгчтэй алкан.', 'The table: alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ, alcohols CₙH₂ₙ₊₁OH, carboxylic acids CₙH₂ₙ₊₁COOH. Together: C₃H₈, butene, CH₃CH₂CH₂OH, propanoic acid. The bromine-water test (Figure 18.6). Explore: MolView – the alkane with 5 carbons.'),
        bi('Хосоор уралдаж хариулна; аль хуруу улбар шар хэвээр үлдэхийг A/B-гээр таамаглана.', 'Pair race for the answers; predict with A or B which tube stays orange.'),
        bi('propane; C₄H₈; propan-1-ol; CH₃CH₂COOH; "clear" биш "colourless"; этан хүчил CH₃COOH.', 'propane; C₄H₈; propan-1-ol; CH₃CH₂COOH; "colourless", not "clear"; ethanoic acid is CH₃COOH.')
      ],
      [
        bi('Hinge 1 ба (E) бүтцийн изомер', 'Hinge 1 and (E) structural isomers'),
        bi('Hinge 1: аль нэгдэл бромын усыг өнгөгүй болгох вэ. (E) Изомер (Зураг 18.13): C₄H₁₀ – бутан ба 2-метилпропан; C₄H₈ – but-1-ene ба but-2-ene; C₃H₈O – propan-1-ol ба propan-2-ol. Хамтдаа: изомер мөн эсэх.', 'Hinge 1: which compound decolourises bromine water. (E) Isomers (Figure 18.13): C₄H₁₀ – butane and 2-methylpropane; C₄H₈ – but-1-ene and but-2-ene; C₃H₈O – propan-1-ol and propan-2-ol. Together: are they isomers?'),
        bi('ABCD хуруугаар санал өгнө; C₄H₁₀-ийг хоёр янзаар загварчилна; эрхий хуруугаар изомер эсэхийг хэлнэ.', 'Vote with ABCD fingers; build C₄H₁₀ two ways; thumbs up/down: isomers or not.'),
        bi('Hinge: B (C₃H₆ – CₙH₂ₙ). Нугалсан гинж шинэ изомер биш; этан ба этен изомер биш.', 'Hinge: B (C₃H₆ fits CₙH₂ₙ). A bent chain is not a new isomer; ethane and ethene are not isomers.')
      ]
    ]),
    [
      exitItem(
        bi('Нүүрсустөрөгчийн зөв тодорхойлолт аль нь вэ?', 'Which is the correct definition of a hydrocarbon?'),
        [
          bi('Устөрөгч ба нүүрстөрөгч агуулсан нэгдэл', 'A compound that contains hydrogen and carbon'),
          bi('Зөвхөн устөрөгч ба нүүрстөрөгч агуулсан нэгдэл', 'A compound containing hydrogen and carbon only'),
          bi('C=C холбоотой нэгдэл', 'A compound with a C=C bond'),
          bi('–OH бүлэгтэй нэгдэл', 'A compound with an –OH group')
        ],
        1,
        bi('"Only" гэдэг үгийг орхивол оноо алдана.', 'Leaving out "only" loses the mark.')
      ),
      exitItem(
        bi('Аль нэгдэл бромын усыг өнгөгүй болгох вэ?', 'Which compound will decolourise bromine water?'),
        [bi('C₂H₆', 'C₂H₆'), bi('C₃H₆', 'C₃H₆'), bi('C₄H₁₀', 'C₄H₁₀'), bi('CH₄', 'CH₄')],
        1,
        bi('C₃H₆ – CₙH₂ₙ: пропен, C=C-тэй алкен.', 'C₃H₆ fits CₙH₂ₙ: propene, an alkene with a C=C bond.')
      ),
      exitItem(
        bi('Гурван нүүрстөрөгчтэй алкений нэр?', 'Name the alkene with three carbon atoms.'),
        [bi('Пропан', 'Propane'), bi('Пропен', 'Propene'), bi('Бутен', 'Butene'), bi('Этен', 'Ethene')],
        1,
        bi('prop- = 3, -ene = алкен.', 'prop- = 3 and -ene = alkene.')
      ),
      exitItem(
        bi('C₃H₈-ийн нэр?', 'Name C₃H₈.'),
        [bi('Пропан', 'Propane'), bi('Пропен', 'Propene'), bi('Бутан', 'Butane'), bi('Этан', 'Ethane')],
        0,
        bi('C₃H₈ = CₙH₂ₙ₊₂, n = 3 – пропан.', 'C₃H₈ fits CₙH₂ₙ₊₂ with n = 3 – propane.')
      ),
      exitItem(
        bi('(E) Бутан ба 2-метилпропан хоёрын нийтлэг молекулын томьёо?', '(E) Give the molecular formula shared by butane and 2-methylpropane.'),
        [bi('C₄H₈', 'C₄H₈'), bi('C₄H₁₀', 'C₄H₁₀'), bi('C₃H₈', 'C₃H₈'), bi('C₅H₁₂', 'C₅H₁₂')],
        1,
        bi('Ижил молекулын томьёо C₄H₁₀, өөр бүтэц – бүтцийн изомер.', 'Same molecular formula C₄H₁₀, different structures – structural isomers.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Спирт, карбоксилын хүчил, эфир ба шалгалт', 'Alcohols, carboxylic acids, esters and exam practice'),
    bi(
      'Спирт (–OH) ба карбоксилын хүчлийг (–COOH) нэрлэж зурах; (E) спирт ба хүчлээс эфир нэрлэх; гомолог цуваа ба изомерын hinge асуултаар шалгах; шалгалтын асуулт, нийтлэг алдаагаар бүлгийг нэгтгэх.',
      'Name and draw alcohols (–OH) and carboxylic acids (–COOH); (E) name esters from the alcohol and the acid; check homologous series and isomers with hinge questions; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('Спирт –OH: метанол CH₃OH, этанол C₂H₅OH, пропанол, бутанол. Хүчил –COOH: метан хүчил HCOOH, этан хүчил CH₃COOH – COOH-ийн C нэрэнд тоологдоно.', 'Alcohols –OH: methanol CH₃OH, ethanol C₂H₅OH, propanol, butanol. Acids –COOH: methanoic acid HCOOH, ethanoic acid CH₃COOH – the C in COOH is counted in the name.'),
      bi('(E) Карбоксилын хүчил + спирт ⇌ эфир + ус (хүчил катализатор, бүлээн): CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O.', '(E) Carboxylic acid + alcohol ⇌ ester + water (acid catalyst, warm): CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O.'),
      bi('(E) Нэршил: спиртийн хэсэг эхэнд (ethyl), хүчлийн хэсэг дараа нь (ethanoate). Эфир жимсний үнэртэй.', '(E) Naming: the alcohol part first (ethyl), the acid part second (ethanoate). Esters smell fruity.')
    ],
    lessonSteps([
      [
        bi('Спирт ба карбоксилын хүчил', 'Alcohols and carboxylic acids'),
        bi('–OH ба –COOH функциональ бүлэг; этанол ба этан хүчлийн дэлгэрэнгүй томьёо. –COOH: C нь O-тэй давхар, O–H-тэй дан холбоотой.', 'The –OH and –COOH functional groups; displayed formulae of ethanol and ethanoic acid. –COOH: C double-bonded to O and single-bonded to O–H.'),
        bi('–COOH бүлгийг агаарт зурна.', 'Air-draw the –COOH group.'),
        bi('Этан хүчилд C=O-г зурахаа мартахгүй; CH₃COOH-д 2 нүүрстөрөгч.', 'Do not forget C=O in ethanoic acid; CH₃COOH has 2 carbons.')
      ],
      [
        bi('(E) Эфир; бие даан нэрлэх', '(E) Esters; you do: names'),
        bi('(E) Хүчил + спирт ⇌ эфир + ус; этил этаноат; methanol + propanoic acid → methyl propanoate. Бие даан: CH₃CH₂CH₃, CₙH₂ₙ цуваа, бутанолын томьёо, (E) propanol + methanoic acid-ийн эфир.', '(E) Acid + alcohol ⇌ ester + water; ethyl ethanoate; methanol + propanoic acid → methyl propanoate. You do: CH₃CH₂CH₃, the CₙH₂ₙ series, the formula of butanol, (E) the ester from propanol and methanoic acid.'),
        bi('Methanol + ethanoic acid-ийн эфирийг хосоороо нэрлэнэ; 3 минут чимээгүй бичээд өөр өнгөөр засна.', 'Name the ester from methanol + ethanoic acid in pairs; write in silence for 3 minutes, then mark in another colour.'),
        bi('methyl ethanoate; propane; алкен; C₄H₉OH; propyl methanoate (нэрийн дарааллыг солихгүй).', 'methyl ethanoate; propane; alkenes; C₄H₉OH; propyl methanoate (do not swap the order of the name).')
      ],
      [
        bi('Hinge 2–3', 'Hinges 2–3'),
        bi('Hinge 2: аль хос нэг гомолог цувааных вэ. Hinge 3 (E): бүтцийн изомерын зөв тодорхойлолт.', 'Hinge 2: which pair are members of the same homologous series. Hinge 3 (E): the correct statement about structural isomers.'),
        bi('ABCD картаа цээжиндээ барьж 3-2-1-д үзүүлнэ.', 'Hold ABCD cards to the chest and show on 3-2-1.'),
        bi('Hinge 2: B (C₂H₅OH ба C₃H₇OH – CH₂-оор ялгаатай); hinge 3: B. Ижил тооны C ≠ ижил цуваа.', 'Hinge 2: B (C₂H₅OH and C₃H₇OH differ by CH₂); hinge 3: B. The same number of carbons does not mean the same series.')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi('(a) нүүрсустөрөгч тодорхойлох; (b) этан ба этеныг ялгах тест; (c) этан хүчлийн дэлгэрэнгүй томьёо; (d) (E) гомолог цувааны 2 шинж. Зөвлөмж: "only", "colourless", CH₃COOH, нугалсан гинж. Үнэлэх: "бромын ус этан ба этеныг ялгана". Алдаа засах: CH₃CH₂CH₂OH-ийг propanoic acid гэх.', '(a) define a hydrocarbon; (b) a test to tell ethane from ethene; (c) the displayed formula of ethanoic acid; (d) (E) two characteristics of a homologous series. Tips: "only", "colourless", CH₃COOH, bent chains. Evaluate: "bromine water can tell ethane and ethene apart". Error clinic: calling CH₃CH₂CH₂OH propanoic acid.'),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes and peer-mark; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('Бромын ус нэмэх; этен улбар шар → өнгөгүй; этан улбар шар хэвээр. CH₃CH₂CH₂OH = propan-1-ol (–OH, –COOH биш).', 'Add bromine water; ethene orange → colourless; ethane stays orange. CH₃CH₂CH₂OH = propan-1-ol (–OH, not –COOH).')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: спиртийн функциональ бүлэг, 3 C-тэй алкен, ханаагүйг харуулах өнгөний өөрчлөлт, (E) бутаны изомерын томьёо. Fist to five дахин.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: the functional group of alcohols, the alkene with 3 carbons, the colour change for unsaturation, (E) the formula shared by the butane isomers. Fist to five again.'),
        bi('Гарах билетийг 4 минутад ганцаараа бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('–OH; propene; бромын ус улбар шар → өнгөгүй; C₄H₁₀.', '–OH; propene; bromine water orange → colourless; C₄H₁₀.')
      ]
    ]),
    [
      exitItem(
        bi('Спиртийн функциональ бүлэг юу вэ?', 'What is the functional group of the alcohols?'),
        [bi('–COOH', '–COOH'), bi('–OH', '–OH'), bi('C=C', 'C=C'), bi('–COO–', '–COO–')],
        1,
        bi('–COOH нь карбоксилын хүчлийнх.', '–COOH belongs to the carboxylic acids.')
      ),
      exitItem(
        bi('Этан хүчлийн томьёо аль нь вэ?', 'What is the formula of ethanoic acid?'),
        [bi('C₂H₅COOH', 'C₂H₅COOH'), bi('CH₃COOH', 'CH₃COOH'), bi('HCOOH', 'HCOOH'), bi('C₂H₅OH', 'C₂H₅OH')],
        1,
        bi('COOH-ийн C тоологдоно; C₂H₅COOH нь propanoic acid.', 'Count the C in COOH; C₂H₅COOH is propanoic acid.')
      ),
      exitItem(
        bi('Аль хос нэг гомолог цувааны гишүүд вэ?', 'Which pair are members of the same homologous series?'),
        [bi('CH₄ ба C₂H₄', 'CH₄ and C₂H₄'), bi('C₂H₅OH ба C₃H₇OH', 'C₂H₅OH and C₃H₇OH'), bi('C₂H₆ ба CH₃COOH', 'C₂H₆ and CH₃COOH'), bi('C₃H₆ ба C₃H₈', 'C₃H₆ and C₃H₈')],
        1,
        bi('Хоёулаа спирт (–OH), CH₂-оор ялгаатай.', 'Both are alcohols (–OH), differing by CH₂.')
      ),
      exitItem(
        bi('(E) Бүтцийн изомерын тухай зөв өгүүлбэр аль нь вэ?', '(E) Which statement about structural isomers is correct?'),
        [
          bi('Ижил бүтцийн томьёо, өөр молекулын томьёо', 'Same structural formula, different molecular formula'),
          bi('Ижил молекулын томьёо, өөр бүтцийн томьёо', 'Same molecular formula, different structural formula'),
          bi('Ижил тооны C, өөр тооны H', 'Same number of carbon atoms but different numbers of hydrogen atoms'),
          bi('Үргэлж өөр гомолог цуваанд байна', 'They are always in different homologous series')
        ],
        1,
        bi('but-1-ene ба but-2-ene изомер боловч нэг цуваанд.', 'But-1-ene and but-2-ene are isomers in the same series.')
      ),
      exitItem(
        bi('(E) Пропанол ба метан хүчлээс үүсэх эфирийн нэр?', '(E) Name the ester made from propanol and methanoic acid.'),
        [bi('Methyl propanoate', 'Methyl propanoate'), bi('Propyl methanoate', 'Propyl methanoate'), bi('Propyl ethanoate', 'Propyl ethanoate'), bi('Methanoate propyl', 'Methanoate propyl')],
        1,
        bi('Спиртийн хэсэг (propyl) эхэнд, хүчлийн хэсэг (methanoate) дараа нь.', 'The alcohol part (propyl) comes first, the acid part (methanoate) second.')
      )
    ],
    ID
  )
];

export const IG11_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'ig11-1': [
    term(bi('гомолог цуваа', 'homologous series'), bi('Ижил ерөнхий томьёо, ижил функциональ бүлэг, төстэй химийн шинжтэй нэгдлүүдийн бүл.', 'A family of compounds with the same general formula, the same functional group and similar chemical properties.')),
    term(bi('функциональ бүлэг', 'functional group'), bi('Нэгдлийн химийн шинжийг тодорхойлдог атом эсвэл атомын бүлэг.', 'An atom or group of atoms that determines the chemical properties of a compound.')),
    term(bi('ханасан', 'saturated'), bi('Зөвхөн дан C–C холбоотой.', 'Contains only single C–C bonds.')),
    term(bi('ханаагүй', 'unsaturated'), bi('Дор хаяж нэг C=C давхар (эсвэл гурвалсан) холбоотой.', 'Contains at least one C=C double (or triple) bond.')),
    term(bi('нүүрсустөрөгч', 'hydrocarbon'), bi('Зөвхөн устөрөгч ба нүүрстөрөгчөөс тогтсон нэгдэл.', 'A compound containing hydrogen and carbon only.')),
    term(bi('бүтцийн изомер (E)', 'structural isomers (E)'), bi('Ижил молекулын томьёо, өөр бүтцийн томьёотой нэгдлүүд.', 'Same molecular formula, different structural formulae.'))
  ],
  'ig11-2': [
    term(bi('эфир (E)', 'ester (E)'), bi('Карбоксилын хүчил ба спиртээс ус ялгаруулан үүсдэг, жимсний үнэртэй нэгдэл (жишээ нь этил этаноат).', 'A fruity-smelling compound made from a carboxylic acid and an alcohol, with water (e.g. ethyl ethanoate).'))
  ]
};

export const IG11_PRACTICE_A: Record<string, PracticeItem[]> = {
  'ig11-1': [
    easy(
      bi('Бутений молекулын томьёо?', 'Give the molecular formula of butene.'),
      [bi('C₄H₁₀', 'C₄H₁₀'), bi('C₄H₈', 'C₄H₈'), bi('C₃H₆', 'C₃H₆'), bi('C₄H₉OH', 'C₄H₉OH')],
      1,
      bi('Алкен CₙH₂ₙ, n = 4.', 'Alkenes are CₙH₂ₙ, n = 4.')
    ),
    easy(
      bi('CH₃CH₂CH₂OH-ийн нэр?', 'Name CH₃CH₂CH₂OH.'),
      [bi('Propanoic acid', 'Propanoic acid'), bi('Propan-1-ol', 'Propan-1-ol'), bi('Propane', 'Propane'), bi('Butanol', 'Butanol')],
      1,
      bi('3 нүүрстөрөгч ба –OH – спирт.', '3 carbons and –OH – an alcohol.')
    ),
    hard(
      bi('(E) Propan-1-ol-ийн изомерын бүтцийн томьёог бичиж, яагаад изомер болохыг тайлбарла.', '(E) Write the structural formula of the isomer of propan-1-ol and explain why they are isomers.'),
      bi('Propan-2-ol, CH₃CH(OH)CH₃. Хоёулаа C₃H₈O – ижил молекулын томьёо, –OH өөр байрлалд тул бүтэц өөр.', 'Propan-2-ol, CH₃CH(OH)CH₃. Both are C₃H₈O – the same molecular formula, but the –OH is in a different position, so the structures differ.'),
      bi('Нугалсан гинжийг изомер гэж зурвал оноо авахгүй.', 'Drawing a bent chain as an isomer scores nothing.')
    )
  ],
  'ig11-2': [
    easy(
      bi('Пропан хүчлийн бүтцийн томьёо?', 'Give the structural formula of propanoic acid.'),
      [bi('CH₃CH₂CH₂COOH', 'CH₃CH₂CH₂COOH'), bi('CH₃CH₂COOH', 'CH₃CH₂COOH'), bi('CH₃COOH', 'CH₃COOH'), bi('CH₃CH₂CH₂OH', 'CH₃CH₂CH₂OH')],
      1,
      bi('CH₃CH₂CH₂COOH нь butanoic acid.', 'CH₃CH₂CH₂COOH is butanoic acid.')
    ),
    easy(
      bi('(E) Метанол ба этан хүчлээс ямар эфир үүсэх вэ?', '(E) Which ester forms from methanol and ethanoic acid?'),
      [bi('Ethyl methanoate', 'Ethyl methanoate'), bi('Methyl ethanoate', 'Methyl ethanoate'), bi('Ethyl ethanoate', 'Ethyl ethanoate'), bi('Methyl propanoate', 'Methyl propanoate')],
      1,
      bi('Спирт → methyl, хүчил → ethanoate.', 'The alcohol gives methyl, the acid gives ethanoate.')
    ),
    hard(
      bi('Этан ба этеныг ялгах тестийг үр дүнтэй нь тайлбарла. [3]', 'Describe a test to distinguish ethane from ethene, with results. [3]'),
      bi('Бромын ус нэмнэ (1); этен: улбар шар → өнгөгүй (1); этан: улбар шар хэвээр (1).', 'Add bromine water (1); ethene: orange to colourless (1); ethane: stays orange (1).'),
      bi('"Clear" гэвэл оноо алдана – "colourless" гэж бич.', '"Clear" loses the mark – write "colourless".')
    )
  ]
};
