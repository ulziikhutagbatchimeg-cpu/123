// IGCSE 0620 chapter 7 (acids, bases and salts), lessons 1–2: acids and bases. They follow the deck
// Ch11_Acids_and_bases.pptx and its plan of two 40-minute lessons (slides 1–12 and 13 on), with the review slides 22–29.
// Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig7';

export const IG7_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Индикатор, pH ба хүчил, суурийн урвал', 'Indicators, pH and the reactions of acids and bases'),
    bi(
      'Хүчил ба суурийн шинж, индикаторын өнгийг тайлбарлах; хүчилд H⁺(aq), шүлтэд OH⁻(aq) байдгийг хэлэх; универсал индикатор ба pH-аар харьцуулах; саармагжилт H⁺ + OH⁻ → H₂O; (E) хүчил протон өгөгч, суурь хүлээн авагч.',
      'Describe the properties of acids and bases, including indicator colours; state that acids contain H⁺(aq) and alkalis OH⁻(aq); compare acidity with universal indicator and pH; neutralisation H⁺ + OH⁻ → H₂O; (E) acids as proton donors and bases as proton acceptors.'
    ),
    [
      bi('Лакмус: хүчилд улаан, шүлтэд цэнхэр; метил улбар шар: улаан / шар; тимолфталеин: өнгөгүй / цэнхэр; универсал индикатор pH 7-д ногоон.', 'Litmus: red in acid, blue in alkali; methyl orange: red / yellow; thymolphthalein: colourless / blue; universal indicator is green at pH 7.'),
      bi('pH < 7 хүчиллэг (бага байх тусам H⁺ их); 7 саармаг; > 7 шүлтлэг (OH⁻ их). pH-метр илүү нарийн.', 'pH < 7 is acidic (the lower, the more H⁺); 7 is neutral; > 7 is alkaline (more OH⁻). A pH meter is more precise.'),
      bi('Хүчил + металл → давс + устөрөгч; + суурь → давс + ус; + карбонат → давс + ус + CO₂. Шүлт = уусдаг суурь; суурь + аммонийн давс → аммиак.', 'Acid + metal → salt + hydrogen; + base → salt + water; + carbonate → salt + water + CO₂. An alkali is a soluble base; base + ammonium salt → ammonia.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi(
          'Том асуулт: нимбэгний шүүс, цуу, аккумуляторын хүчил бүгд хүчил – тэдний нийтлэг зүйл юу, яагаад нэг нь хамаагүй аюултай вэ? "Санал нийлэх үү?" (бүх хүчил аюултай; хүчтэй ба өтгөн нэг утгатай; шүлтэд OH⁻ бий) ба төлөвлөгөө.',
          'Big question: lemon juice, vinegar and battery acid are all acids – what do they have in common, and why is one far more dangerous? "Agree or disagree?" (all acids are dangerous; strong and concentrated mean the same; alkalis contain OH⁻) and the plan.'
        ),
        bi('Хосоороо 60 секунд ярилцаж, эрхий хуруугаар санал өгнө.', 'Think–pair–share for 60 s and vote with thumbs.'),
        bi('Бүгд H⁺ ион агуулна; концентраци ба хүч нь өөр.', 'All contain H⁺ ions; their concentration and strength differ.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi(
          'Суурь ба шүлтийн ялгаа: бүх шүлт суурь, гэхдээ бүх суурь шүлт биш. Зорилгод fist to five. Давталт: HCl, H₂SO₄, HNO₃; NaOH, Ca(OH)₂; устөрөгч ба CO₂-ийн шинжилгээ.',
          'The difference between a base and an alkali: every alkali is a base, but not every base is an alkali. Fist to five on the objectives. Retrieval: HCl, H₂SO₄, HNO₃; NaOH, Ca(OH)₂; the tests for hydrogen and CO₂.'
        ),
        bi('Самбартаа бичээд 3-2-1-д өргөнө.', 'Write on show-me boards and reveal on 3-2-1.'),
        bi('Асаасан модонцор "пүх"; шохойн ус цайдам болно.', 'A lighted splint gives a squeaky pop; limewater turns milky.')
      ],
      [
        bi('Индикатор ба pH; судлах', 'Indicators and pH; explore'),
        bi(
          'Индикаторын хүснэгт; pH шкал (Зураг 11.4): ус 7, ходоодны хүчил ~1–2, саван ~10; универсал индикатор цаас ба pH-метр. Хамтдаа: pH 2 ба 5, цэвэр ус, ягаан өнгө, шүлтийн ион. Судлах: PhET pH Scale.',
          'The indicator table; the pH scale (Figure 11.4): water 7, stomach acid about 1–2, soap about 10; universal indicator paper and a pH meter. Together: pH 2 vs 5, pure water, violet, the ion in alkalis. Explore: PhET pH Scale.'
        ),
        bi('Өнгө бүрийг самбартаа бичнэ; 0–14 pH карттай "хүний шугам" үүсгэнэ; pH-ийг хуруугаараа таамаглана.', 'Write each colour on boards; make a human pH line with cards 0–14; predict each pH with fingers.'),
        bi('A (pH 2) илүү хүчиллэг; ногоон; 13–14; OH⁻.', 'A (pH 2) is more acidic; green; 13–14; OH⁻.')
      ],
      [
        bi('Хүчлийн урвал', 'Reactions of acids'),
        bi(
          'Гурван ерөнхий тэгшитгэл: Mg + 2HCl → MgCl₂ + H₂; CuO + H₂SO₄ → CuSO₄ + H₂O; CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. HCl → хлорид, H₂SO₄ → сульфат, HNO₃ → нитрат. Хамтдаа: үгэн тэгшитгэлийг гүйцээх.',
          'The three general equations: Mg + 2HCl → MgCl₂ + H₂; CuO + H₂SO₄ → CuSO₄ + H₂O; CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. HCl → chlorides, H₂SO₄ → sulfates, HNO₃ → nitrates. Together: complete the word equations.'
        ),
        bi('Odd one out-д хариулж, хосоороо уралдан үгэн тэгшитгэлийг гүйцээнэ.', 'Answer the odd one out, then race in pairs to complete the word equations.'),
        bi('CuO хий өгөхгүй; цайрын сульфат + устөрөгч; Zn + H₂SO₄ → ZnSO₄ + H₂.', 'CuO gives no gas; zinc sulfate + hydrogen; Zn + H₂SO₄ → ZnSO₄ + H₂.')
      ],
      [
        bi('Суурь, саармагжилт, hinge, (E) протон шилжилт', 'Bases, neutralisation, hinge and (E) proton transfer'),
        bi(
          'Суурь = металлын исэл ба гидроксид; шүлт уусдаг (NaOH, KOH, Ca(OH)₂, NH₃(aq)); NaOH + NH₄Cl → NaCl + H₂O + NH₃; H⁺(aq) + OH⁻(aq) → H₂O(l). Hinge 1: давс, ус, CO₂ өгөх хос. (E) H⁺ = протон; HCl + NH₃ → NH₄Cl.',
          'Bases are metal oxides and hydroxides; alkalis dissolve (NaOH, KOH, Ca(OH)₂, NH₃(aq)); NaOH + NH₄Cl → NaCl + H₂O + NH₃; H⁺(aq) + OH⁻(aq) → H₂O(l). Hinge 1: the pair giving salt, water and CO₂. (E) H⁺ is a proton; HCl + NH₃ → NH₄Cl.'
        ),
        bi('CuO яагаад суурь боловч шүлт биш вэ гэдгийг ярилцана; ABCD хуруугаар санал өгнө; "протон" бөмбөг дамжуулна.', 'Discuss why CuO is a base but not an alkali; vote with ABCD fingers; pass a "proton" ball.'),
        bi('Hinge: C (натрийн карбонат + азотын хүчил); HCl протон өгнө, NH₃ авна.', 'Hinge: C (sodium carbonate and nitric acid); HCl donates the proton and NH₃ accepts it.')
      ]
    ]),
    [
      exitItem(
        bi('Тимолфталеин шүлтэнд ямар өнгөтэй вэ?', 'What colour is thymolphthalein in an alkali?'),
        [bi('Өнгөгүй', 'Colourless'), bi('Цэнхэр', 'Blue'), bi('Улаан', 'Red'), bi('Шар', 'Yellow')],
        1,
        bi('Тимолфталеин: хүчилд өнгөгүй, шүлтэд цэнхэр.', 'Thymolphthalein: colourless in acid, blue in alkali.')
      ),
      exitItem(
        bi('A уусмал pH 2, B уусмал pH 5. Аль нь илүү хүчиллэг вэ?', 'Solution A has pH 2 and solution B has pH 5. Which is more acidic?'),
        [bi('A', 'A'), bi('B', 'B'), bi('Ижил', 'They are the same'), bi('Хоёулаа шүлтлэг', 'Both are alkaline')],
        0,
        bi('pH бага = H⁺-ийн концентраци их = илүү хүчиллэг.', 'A lower pH means a higher H⁺ concentration, so it is more acidic.')
      ),
      exitItem(
        bi('Аль хос урвалд орж давс, ус, нүүрстөрөгчийн давхар исэл өгөх вэ?', 'Which pair react to produce a salt, water and carbon dioxide?'),
        [
          bi('Цайр ба давсны хүчил', 'Zinc and hydrochloric acid'),
          bi('Зэс(II)-ын исэл ба хүхрийн хүчил', 'Copper(II) oxide and sulfuric acid'),
          bi('Натрийн карбонат ба азотын хүчил', 'Sodium carbonate and nitric acid'),
          bi('Натрийн гидроксид ба аммонийн хлорид', 'Sodium hydroxide and ammonium chloride')
        ],
        2,
        bi('Хүчил + карбонат → давс + ус + CO₂; цайр устөрөгч, NH₄Cl аммиак өгнө.', 'Acid + carbonate → salt + water + CO₂; zinc gives hydrogen and NH₄Cl gives ammonia.')
      ),
      exitItem(
        bi('Саармагжилтын ионы тэгшитгэл аль нь вэ?', 'What is the ionic equation for neutralisation?'),
        [
          bi('HCl + NaOH → NaCl + H₂O', 'HCl + NaOH → NaCl + H₂O'),
          bi('H⁺(aq) + OH⁻(aq) → H₂O(l)', 'H⁺(aq) + OH⁻(aq) → H₂O(l)'),
          bi('Na⁺(aq) + Cl⁻(aq) → NaCl(s)', 'Na⁺(aq) + Cl⁻(aq) → NaCl(s)'),
          bi('H₂ + O₂ → H₂O', 'H₂ + O₂ → H₂O')
        ],
        1,
        bi('Зөвхөн урвалд орох ионууд: H⁺ ба OH⁻.', 'Only the reacting ions: H⁺ and OH⁻.')
      ),
      exitItem(
        bi('(E) Протоны хувьд суурь гэж юу вэ?', '(E) What is a base in terms of protons?'),
        [bi('Протон өгөгч', 'A proton donor'), bi('Протон хүлээн авагч', 'A proton acceptor'), bi('Электрон өгөгч', 'An electron donor'), bi('Нейтрон хүлээн авагч', 'A neutron acceptor')],
        1,
        bi('OH⁻ + H⁺ → H₂O; NH₃ + H⁺ → NH₄⁺.', 'OH⁻ + H⁺ → H₂O; NH₃ + H⁺ → NH₄⁺.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('(E) Хүчтэй ба сул хүчил, исэл, шалгалтын дасгал', '(E) Strong and weak acids, oxides and exam practice'),
    bi(
      '(E) Хүчтэй ба сул хүчлийг тодорхойлох (HCl хүчтэй, CH₃COOH сул); хүчиллэг ба суурь ислийг ангилах; (E) амфотер исэл Al₂O₃ ба ZnO; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх.',
      '(E) Define strong and weak acids (HCl strong, CH₃COOH weak); classify oxides as acidic or basic; (E) amphoteric oxides Al₂O₃ and ZnO; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('(E) Хүчтэй хүчил усанд бүрэн диссоциацлагдана: HCl(aq) → H⁺ + Cl⁻; сул хүчил хэсэгчлэн: CH₃COOH ⇌ H⁺ + CH₃COO⁻. Ижил концентрацид хүчтэй хүчил H⁺ ихтэй, pH бага, хурдан урвална.', '(E) A strong acid is completely dissociated in water: HCl(aq) → H⁺ + Cl⁻; a weak acid partially: CH₃COOH ⇌ H⁺ + CH₃COO⁻. At the same concentration a strong acid has more H⁺, a lower pH and reacts faster.'),
      bi('Хүчтэй/сул ≠ өтгөн/шингэрүүлсэн: концентраци нь 1 dm³-т хэр их хүчил ууссан.', 'Strong/weak ≠ concentrated/dilute: concentration is how much acid is dissolved per dm³.'),
      bi('Металл бусын исэл (CO₂, SO₂) хүчиллэг; металлын исэл (CuO, CaO) суурь; (E) Al₂O₃, ZnO хүчил ба суурьтай хоёуланд нь урвална – амфотер.', 'Non-metal oxides (CO₂, SO₂) are acidic; metal oxides (CuO, CaO) are basic; (E) Al₂O₃ and ZnO react with both acids and bases – amphoteric.')
    ],
    lessonSteps([
      [
        bi('(E) Хүчтэй ба сул хүчил', '(E) Strong and weak acids'),
        bi('0.1 mol/dm³ HCl (pH 1) ба CH₃COOH (pH ≈ 3)-ийг харьцуулж, Mg-тэй урвалын бөмбөлгийг үзүүлнэ. Хүчтэй/сул ≠ өтгөн/шингэрүүлсэн.', 'Compare 0.1 mol/dm³ HCl (pH 1) and CH₃COOH (pH about 3) and show the bubbles with Mg. Strong/weak ≠ concentrated/dilute.'),
        bi('Сул хүчил өтгөн байж болох уу гэдгийг хосоороо ярилцаж жишээ гаргана.', 'Discuss in pairs whether a weak acid can be concentrated, and give an example.'),
        bi('HCl бүрэн, CH₃COOH хэсэгчлэн диссоциацлагдана.', 'HCl is completely and CH₃COOH partially dissociated.')
      ],
      [
        bi('Бие даан: хүчил ба суурь', 'You do: acids and bases'),
        bi('CaO + азотын хүчлийн давс; (NH₄)₂SO₄ + NaOH-оос ялгарах хий; (E) H₂SO₄ + 2NH₃-д протон хүлээн авагч; (E) 1 mol/dm³ этаны хүчил яагаад HCl-ээс pH өндөр вэ.', 'The salt from CaO + nitric acid; the gas from warming (NH₄)₂SO₄ with NaOH; (E) the proton acceptor in H₂SO₄ + 2NH₃; (E) why 1 mol/dm³ ethanoic acid has a higher pH than HCl.'),
        bi('3 минут чимээгүй бичээд өөр өнгөөр засна.', 'Write in silence for 3 minutes, then mark in a different colour.'),
        bi('Кальцийн нитрат; аммиак; NH₃; этаны хүчил сул – хэсэгчлэн диссоциацлагдана, H⁺ бага.', 'Calcium nitrate; ammonia; NH₃; ethanoic acid is weak – only partially dissociated, so less H⁺.')
      ],
      [
        bi('Хүчиллэг, суурь ба амфотер исэл; hinge 2–3', 'Acidic, basic and amphoteric oxides; hinges 2–3'),
        bi(
          'Зураг 11.11: металл бусын исэл хүчиллэг, металлын исэл суурь; (E) ZnO + 2HCl → ZnCl₂ + H₂O; ZnO + 2NaOH → Na₂ZnO₂ + H₂O. Hinge 2: HCl ба NaOH-той хоёуланд нь урвалдах исэл; hinge 3: ижил концентрацитай HCl ба CH₃COOH.',
          'Figure 11.11: non-metal oxides are acidic, metal oxides basic; (E) ZnO + 2HCl → ZnCl₂ + H₂O; ZnO + 2NaOH → Na₂ZnO₂ + H₂O. Hinge 2: the oxide that reacts with both HCl and NaOH; hinge 3: HCl and CH₃COOH at the same concentration.'
        ),
        bi('SO₂, MgO, ZnO-г A / B / Am гэж самбартаа ангилна; ABCD карт ба хуруугаар санал өгнө.', 'Sort SO₂, MgO and ZnO as A / B / Am on boards; vote with ABCD cards and fingers.'),
        bi('SO₂ – хүчиллэг, MgO – суурь, ZnO – амфотер; hinge 2: C (Al₂O₃); hinge 3: B.', 'SO₂ acidic, MgO basic, ZnO amphoteric; hinge 2: C (Al₂O₃); hinge 3: B.')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi(
          '(a)–(d): метил улбар шарын өнгө, саармагжилтын ионы тэгшитгэл, CaCO₃ + HCl-ийн ажиглалт, (E) сул хүчлийн тодорхойлолт. 4 шалгалтын зөвлөмж. Үнэлэх: хүчиллэг хөрсөнд NaOH ба шохойн чулуун нунтаг. Алдаа засах: саармагжилтын ионы тэгшитгэл.',
          '(a)–(d): the colours of methyl orange, the ionic equation for neutralisation, what is seen when CaCO₃ is added to HCl, (E) the definition of a weak acid. The 4 exam tips. Evaluate: sodium hydroxide versus powdered limestone on acidic soil. Error clinic: the ionic equation for neutralisation.'
        ),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes, swap and tick each marking point; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('Улаан / шар; хөөсрөх, хатуу бодис уусах (CO₂ үүснэ гэх нь ажиглалт биш); шохойн чулуу илүү тохиромжтой.', 'Red / yellow; fizzing and the solid dissolving ("CO₂ is produced" is not an observation); limestone is the better choice.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: тимолфталеин, хүчил + карбонат, SO₂ ба CaO, (E) протоноор суурь. Зорилгод дахин fist to five.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: thymolphthalein, acid + carbonate, SO₂ and CaO, (E) a base in terms of protons. Fist to five on the objectives again.'),
        bi('Гарах билетийг 4 минутад ганцаараа чимээгүй бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone and in silence in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('Цэнхэр; давс + ус + CO₂; SO₂ хүчиллэг, CaO суурь; протон хүлээн авагч.', 'Blue; salt + water + CO₂; SO₂ acidic, CaO basic; a proton acceptor.')
      ]
    ]),
    [
      exitItem(
        bi('(E) Ижил концентрацитай HCl ба CH₃COOH-ийн тухай аль нь зөв бэ?', '(E) Solutions of HCl and CH₃COOH have the same concentration. Which statement is correct?'),
        [
          bi('CH₃COOH-ийн pH бага', 'CH₃COOH has a lower pH'),
          bi('HCl бүрэн, CH₃COOH хэсэгчлэн диссоциацлагдана', 'HCl is completely dissociated; CH₃COOH is partially dissociated'),
          bi('Хоёулаа ижил pH-тэй', 'Both have the same pH'),
          bi('CH₃COOH магнитай хурдан урвална', 'CH₃COOH reacts faster with magnesium')
        ],
        1,
        bi('HCl хүчтэй тул H⁺ их, pH бага.', 'HCl is a strong acid, so its H⁺ concentration is higher and its pH lower.')
      ),
      exitItem(
        bi('(E) Аль исэл давсны хүчил ба натрийн гидроксидын уусмалтай хоёуланд нь урвалддаг вэ?', '(E) Which oxide reacts with both hydrochloric acid and sodium hydroxide solution?'),
        [bi('CaO', 'CaO'), bi('SO₂', 'SO₂'), bi('Al₂O₃', 'Al₂O₃'), bi('CO₂', 'CO₂')],
        2,
        bi('Хөнгөнцагааны исэл амфотер; CaO суурь; SO₂, CO₂ хүчиллэг.', 'Aluminium oxide is amphoteric; CaO is basic; SO₂ and CO₂ are acidic.')
      ),
      exitItem(
        bi('SO₂ ба CaO-г ангил.', 'Classify SO₂ and CaO.'),
        [
          bi('SO₂ хүчиллэг; CaO суурь', 'SO₂ acidic; CaO basic'),
          bi('SO₂ суурь; CaO хүчиллэг', 'SO₂ basic; CaO acidic'),
          bi('Хоёулаа хүчиллэг', 'Both acidic'),
          bi('Хоёулаа амфотер', 'Both amphoteric')
        ],
        0,
        bi('Металл бусын исэл хүчиллэг; металлын исэл суурь.', 'Non-metal oxides are acidic; metal oxides are basic.')
      ),
      exitItem(
        bi('Кальцийн карбонатыг давсны хүчилд нэмэхэд юу АЖИГЛАГДАХ вэ?', 'What would you SEE when calcium carbonate is added to hydrochloric acid?'),
        [
          bi('Нүүрстөрөгчийн давхар исэл үүснэ', 'Carbon dioxide is produced'),
          bi('Хөөсрөнө; хатуу бодис уусаж алга болно', 'Bubbles / fizzing; the solid disappears'),
          bi('Устөрөгч ялгарна', 'Hydrogen is given off'),
          bi('Өнгө нь цэнхэр болно', 'It turns blue')
        ],
        1,
        bi('Ажиглалт = юу харагдаж байгаа; "CO₂ үүснэ" нь дүгнэлт.', 'An observation is what you see; "CO₂ is produced" is a conclusion.')
      ),
      exitItem(
        bi('(E) Сул хүчил гэж юу вэ?', '(E) What is a weak acid?'),
        [
          bi('Шингэрүүлсэн хүчил', 'A dilute acid'),
          bi('Усан уусмалд хэсэгчлэн диссоциацлагддаг хүчил', 'An acid that is partially dissociated in aqueous solution'),
          bi('pH 7-оос их хүчил', 'An acid with pH above 7'),
          bi('Металлтай урвалддаггүй хүчил', 'An acid that does not react with metals')
        ],
        1,
        bi('Сул нь диссоциацийн тухай, концентрацийн тухай биш.', 'Weak is about dissociation, not about concentration.')
      )
    ],
    ID
  )
];

export const IG7_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'ig7-1': [
    term(bi('хүчил', 'acid'), bi('Усанд H⁺ ион үүсгэдэг бодис; (E) протон (H⁺) өгөгч.', 'A substance that produces H⁺ ions in water; (E) a proton (H⁺) donor.')),
    term(bi('суурь / шүлт', 'base / alkali'), bi('Суурь хүчлийг саармагжуулж давс, ус өгнө; шүлт нь уусдаг суурь (OH⁻ ион өгнө).', 'A base neutralises an acid to give a salt and water; an alkali is a soluble base (gives OH⁻ ions).')),
    term(bi('индикатор', 'indicator'), bi('Уусмал хүчиллэг эсвэл шүлтлэгээс хамаарч өнгө өөрчлөгддөг бодис.', 'A substance that changes colour depending on whether a solution is acidic or alkaline.')),
    term(bi('pH', 'pH'), bi('Уусмал хэр хүчиллэг эсвэл шүлтлэгийг харуулах 0–14 шкал; 7 саармаг.', 'A scale from 0 to 14 showing how acidic or alkaline a solution is; 7 is neutral.')),
    term(bi('саармагжилт', 'neutralisation'), bi('Хүчил + суурь → давс + ус; H⁺(aq) + OH⁻(aq) → H₂O(l).', 'Acid + base → salt + water; H⁺(aq) + OH⁻(aq) → H₂O(l).'))
  ],
  'ig7-2': [
    term(bi('хүчтэй / сул хүчил (E)', 'strong / weak acid (E)'), bi('Усан уусмалд бүрэн / хэсэгчлэн диссоциацлагдана (ионждог).', 'Completely / partially dissociated (ionised) in aqueous solution.')),
    term(bi('амфотер исэл (E)', 'amphoteric oxide (E)'), bi('Хүчил ба суурьтай хоёуланд нь урвалдаж давс, ус өгдөг исэл: Al₂O₃, ZnO.', 'An oxide that reacts with both acids and bases to give a salt and water: Al₂O₃, ZnO.'))
  ]
};

export const IG7_PRACTICE_A: Record<string, PracticeItem[]> = {
  'ig7-1': [
    easy(
      bi('Метил улбар шар шүлтэнд ямар өнгөтэй вэ?', 'What colour is methyl orange in alkali?'),
      [bi('Улаан', 'Red'), bi('Улбар шар', 'Orange'), bi('Шар', 'Yellow'), bi('Цэнхэр', 'Blue')],
      2,
      bi('Метил улбар шар: хүчилд улаан, шүлтэд шар ("улбар шар" биш).', 'Methyl orange is red in acid and yellow in alkali (not orange).')
    ),
    easy(
      bi('Натрийн гидроксид + азотын хүчил → ?', 'Sodium hydroxide + nitric acid → ?'),
      [bi('Натрийн нитрат + ус', 'Sodium nitrate + water'), bi('Натрийн нитрид + ус', 'Sodium nitride + water'), bi('Натрийн нитрат + устөрөгч', 'Sodium nitrate + hydrogen'), bi('Натрийн хлорид + ус', 'Sodium chloride + water')],
      0,
      bi('Суурь + хүчил → давс + ус; азотын хүчил → нитрат.', 'Base + acid → salt + water; nitric acid gives nitrates.')
    ),
    hard(
      bi('Азотын хүчлийн Mg, CuO, Na₂CO₃-тэй урвалын тэнцүүлсэн тэгшитгэлийг бич.', 'Write balanced symbol equations for the reactions of nitric acid with Mg, CuO and Na₂CO₃.'),
      bi('Mg + 2HNO₃ → Mg(NO₃)₂ + H₂; CuO + 2HNO₃ → Cu(NO₃)₂ + H₂O; Na₂CO₃ + 2HNO₃ → 2NaNO₃ + H₂O + CO₂.', 'Mg + 2HNO₃ → Mg(NO₃)₂ + H₂; CuO + 2HNO₃ → Cu(NO₃)₂ + H₂O; Na₂CO₃ + 2HNO₃ → 2NaNO₃ + H₂O + CO₂.'),
      bi('Металл + хүчил → давс + устөрөгч (ус биш); карбонатад CO₂-г бүү март.', 'Metal + acid → salt + hydrogen (not water); do not forget CO₂ with a carbonate.')
    )
  ],
  'ig7-2': [
    easy(
      bi('(E) H₂SO₄ + 2NH₃ → (NH₄)₂SO₄ урвалд протон хүлээн авагч аль нь вэ?', '(E) In H₂SO₄ + 2NH₃ → (NH₄)₂SO₄, which substance is the proton acceptor?'),
      [bi('H₂SO₄', 'H₂SO₄'), bi('NH₃', 'NH₃'), bi('(NH₄)₂SO₄', '(NH₄)₂SO₄'), bi('H₂O', 'H₂O')],
      1,
      bi('NH₃ + H⁺ → NH₄⁺; H₂SO₄ протон өгнө.', 'NH₃ + H⁺ → NH₄⁺; H₂SO₄ donates the protons.')
    ),
    easy(
      bi('Аль нь суурь боловч шүлт БИШ вэ?', 'Which is a base but NOT an alkali?'),
      [bi('NaOH', 'NaOH'), bi('KOH', 'KOH'), bi('CuO', 'CuO'), bi('NH₃(aq)', 'NH₃(aq)')],
      2,
      bi('CuO усанд уусдаггүй; шүлт нь уусдаг суурь.', 'CuO does not dissolve in water; an alkali is a soluble base.')
    ),
    hard(
      bi('(E) 1 mol/dm³ этаны хүчил яагаад 1 mol/dm³ давсны хүчлээс pH өндөр байдгийг тайлбарла.', '(E) Explain why 1 mol/dm³ ethanoic acid has a higher pH than 1 mol/dm³ hydrochloric acid.'),
      bi('Этаны хүчил сул – усанд хэсэгчлэн л диссоциацлагдана (CH₃COOH ⇌ H⁺ + CH₃COO⁻), тиймээс H⁺-ийн концентраци бага, pH өндөр. HCl хүчтэй – бүрэн диссоциацлагдана.', 'Ethanoic acid is weak – it is only partially dissociated (CH₃COOH ⇌ H⁺ + CH₃COO⁻), so the H⁺ concentration is lower and the pH higher. HCl is strong – it is completely dissociated.'),
      bi('"Этаны хүчил шингэрүүлсэн" гэвэл буруу – концентраци ижил.', '"Ethanoic acid is dilute" is wrong – the concentrations are the same.')
    )
  ]
};
