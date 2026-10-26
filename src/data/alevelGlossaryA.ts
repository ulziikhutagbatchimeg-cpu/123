import type { GlossaryEntry } from './alevelGlossaryPart1';

// The key terms of the A Level-only chapters (syllabus topics 23–37). Each term has its definition in Mongolian and English.
// The terms follow the learning outcomes of each topic in the 9701 syllabus (2025–2027).
export const ALEVEL_GLOSSARY_A: Record<string, GlossaryEntry[]> = {
  'al-ch-23': [
    { term: { mn: 'торын энерги', en: 'lattice energy' }, def: { mn: 'Хийн төлөвт байгаа ионуудаас 1 моль ионт хатуу бодис үүсэх үеийн энтальпийн өөрчлөлт.', en: 'The enthalpy change when one mole of a solid ionic compound is formed from its gaseous ions.' } },
    { term: { mn: 'Борн–Хабер мөчлөг', en: 'Born–Haber cycle' }, def: { mn: 'Ионт нэгдлийн үүсэх энтальпийг торын энерги болон бусад энтальпийн өөрчлөлттэй холбосон Хессийн мөчлөг.', en: 'A Hess cycle that links the enthalpy of formation of an ionic compound to its lattice energy and other enthalpy changes.' } },
    { term: { mn: 'гидратацийн энтальпи', en: 'enthalpy of hydration' }, def: { mn: 'Нэг моль хийн ионыг усаар хүрээлэх үеийн энтальпийн өөрчлөлт.', en: 'The enthalpy change when one mole of gaseous ions becomes surrounded by water molecules.' } },
    { term: { mn: 'уусах энтальпи', en: 'enthalpy of solution' }, def: { mn: 'Нэг моль бодис хангалттай их уусгагчид уусахад гарах энтальпийн өөрчлөлт.', en: 'The enthalpy change when one mole of a substance dissolves in enough solvent to form a solution.' } },
    { term: { mn: 'энтропи', en: 'entropy' }, def: { mn: 'Системийн эмх замбараагүй байдлын хэмжүүр; S, J K⁻¹ моль⁻¹.', en: 'A measure of the disorder of a system; its units are J K⁻¹ mol⁻¹.' } },
    { term: { mn: 'Гиббсийн чөлөөт энерги', en: 'Gibbs free energy' }, def: { mn: 'ΔG = ΔH − TΔS; урвал явагдах боломжийг заана.', en: 'A quantity given by ΔG = ΔH − TΔS, which shows whether a reaction is feasible.' } },
    { term: { mn: 'боломжтой байдал', en: 'feasibility' }, def: { mn: 'Урвал тодорхой нөхцөлд өөрөө явагдах чадвар; ΔG сөрөг үед боломжтой.', en: 'Whether a reaction can happen by itself under given conditions; it is feasible when ΔG is negative.' } }
  ],
  'al-ch-24': [
    { term: { mn: 'стандарт электродын потенциал', en: 'standard electrode potential' }, def: { mn: 'Стандарт нөхцөлд хагас элементийн потенциал, стандарт устөрөгчийн электродтой харьцуулсан утга (E°).', en: 'The potential of a half-cell under standard conditions, measured against the standard hydrogen electrode (E°).' } },
    { term: { mn: 'стандарт устөрөгчийн электрод', en: 'standard hydrogen electrode' }, def: { mn: 'Потенциалын эталон: 298 K, 100 kPa, H⁺ 1 моль/дм³ дээрх устөрөгчийн электрод; E° = 0 V.', en: 'The reference electrode at 298 K, 100 kPa and 1 mol/dm³ H⁺, with E° defined as 0.00 V.' } },
    { term: { mn: 'электрохимийн цуврал', en: 'electrochemical series' }, def: { mn: 'Хагас урвалуудыг стандарт электродын потенциалаар нь эрэмбэлсэн жагсаалт.', en: 'A list of half-equations arranged by their standard electrode potentials.' } },
    { term: { mn: 'хагас элемент', en: 'half-cell' }, def: { mn: 'Исэлдэх ба ангижрах хэлбэрийн нэг хос бүхий электрод ба түүний электролит.', en: 'An electrode with its electrolyte, containing the oxidised and the reduced forms of one redox pair.' } },
    { term: { mn: 'элементийн ЭМХ (E°cell)', en: 'standard cell potential (E°cell)' }, def: { mn: 'E°cell = E°(эерэг электрод) − E°(сөрөг электрод).', en: 'E°cell = E°(positive electrode) − E°(negative electrode).' } },
    { term: { mn: 'давсны гүүр', en: 'salt bridge' }, def: { mn: 'Хоёр хагас элементийг холбож, ионы хөдөлгөөнөөр хэлхээг бүрэн болгодог хэсэг.', en: 'A link between two half-cells that completes the circuit by allowing ions to move.' } },
    { term: { mn: 'Фарадейн тогтмол', en: 'Faraday constant' }, def: { mn: 'Нэг моль электроны цэнэг, F = 96 500 C моль⁻¹.', en: 'The charge on one mole of electrons, F = 96 500 C mol⁻¹.' } }
  ],
  'al-ch-25': [
    { term: { mn: 'тэнцвэрийн тогтмол Kc', en: 'equilibrium constant Kc' }, def: { mn: 'Тэнцвэрт бүтээгдэхүүн ба урвалд орох бодисын концентрацийн харьцаа; стехиометрийн коэффициентээр дэвшүүлсэн.', en: 'The ratio of product to reactant concentrations at equilibrium, each raised to the power of its coefficient.' } },
    { term: { mn: 'тэнцвэрийн тогтмол Kp', en: 'equilibrium constant Kp' }, def: { mn: 'Хийн парциал даралтаар илэрхийлсэн тэнцвэрийн тогтмол.', en: 'The equilibrium constant expressed in partial pressures of the gases.' } },
    { term: { mn: 'хүчлийн задралын тогтмол Ka', en: 'acid dissociation constant Ka' }, def: { mn: 'Сул хүчлийн задралын тэнцвэрийн тогтмол; Ka = [H⁺][A⁻] ÷ [HA].', en: 'The equilibrium constant for the dissociation of a weak acid, Ka = [H⁺][A⁻] ÷ [HA].' } },
    { term: { mn: 'pKa', en: 'pKa' }, def: { mn: 'pKa = −log Ka; pKa бага байх тусам хүчил хүчтэй.', en: 'pKa = −log Ka; a smaller pKa means a stronger acid.' } },
    { term: { mn: 'усны ионы бүтээгдэхүүн Kw', en: 'ionic product of water Kw' }, def: { mn: 'Kw = [H⁺][OH⁻] = 1.00 × 10⁻¹⁴ моль² дм⁻⁶ (298 K).', en: 'The ionic product of water, Kw = [H⁺][OH⁻] = 1.00 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K.' } },
    { term: { mn: 'буферийн уусмал', en: 'buffer solution' }, def: { mn: 'Жижиг хэмжээний хүчил эсвэл суурь нэмэхэд pH бага өөрчлөгддөг уусмал; жишээ нь сул хүчил ба түүний давсны холимог.', en: 'A solution whose pH changes little when small amounts of acid or alkali are added, for example a weak acid and its salt.' } },
    { term: { mn: 'уусах бүтээгдэхүүний тогтмол Ksp', en: 'solubility product Ksp' }, def: { mn: 'Бага уусдаг давсны ханасан уусмал дахь ионы концентрацийн үржвэр.', en: 'For a sparingly soluble salt, the product of the ion concentrations in a saturated solution.' } },
    { term: { mn: 'нийтлэг ионы нөлөө', en: 'common ion effect' }, def: { mn: 'Ижил ионтой өөр давсыг нэмэхэд давсны уусах чадвар буурах үзэгдэл.', en: 'The decrease in solubility of a salt when another salt with a common ion is added.' } }
  ],
  'al-ch-26': [
    { term: { mn: 'хурдны тэгшитгэл', en: 'rate equation' }, def: { mn: 'Урвалын хурдыг концентраци ба хурдны тогтмолоор илэрхийлсэн тэгшитгэл, жишээ нь rate = k[A]ᵐ[B]ⁿ.', en: 'An equation that expresses the rate of reaction in terms of reactant concentrations and a rate constant, for example rate = k[A]ᵐ[B]ⁿ.' } },
    { term: { mn: 'урвалын эрэмбэ', en: 'order of reaction' }, def: { mn: 'Хурдны тэгшитгэлд бодисын концентрацийн үзүүлэгч; туршилтаар тодорхойлно.', en: 'The power to which a reactant concentration is raised in the rate equation; found by experiment.' } },
    { term: { mn: 'хурдны тогтмол k', en: 'rate constant k' }, def: { mn: 'Температураас хамаарах тогтмол; хурдыг концентрацитай холбоно.', en: 'A constant, dependent on temperature, that links the rate to the concentrations in the rate equation.' } },
    { term: { mn: 'хагас задралын хугацаа', en: 'half-life' }, def: { mn: 'Бодисын концентраци анхныхаа хагасад буурах хугацаа; эхний эрэмбийн урвалд тогтмол.', en: 'The time for the concentration of a reactant to fall to half its initial value; constant for a first-order reaction.' } },
    { term: { mn: 'хурдыг тодорхойлох алхам', en: 'rate-determining step' }, def: { mn: 'Урвалын механизмын хамгийн удаан алхам; нийт хурдыг тодорхойлно.', en: 'The slowest step of a reaction mechanism, which controls the overall rate.' } },
    { term: { mn: 'Аррениусын тэгшитгэл', en: 'Arrhenius equation' }, def: { mn: 'k = A e^(−Eₐ/RT); хурдны тогтмолыг температур ба идэвхжүүлэх энергитэй холбоно.', en: 'k = A e^(−Eₐ/RT), which relates the rate constant to temperature and the activation energy.' } },
    { term: { mn: 'гетероген катализатор', en: 'heterogeneous catalyst' }, def: { mn: 'Урвалын бодисоос өөр фазад байгаа катализатор, ихэвчлэн хатуу бодис.', en: 'A catalyst in a different physical phase from the reactants, usually a solid.' } },
    { term: { mn: 'гомоген катализатор', en: 'homogeneous catalyst' }, def: { mn: 'Урвалын бодистой ижил фазад байгаа катализатор.', en: 'A catalyst in the same physical phase as the reactants.' } }
  ],
  'al-ch-27': [
    { term: { mn: 'карбонат ба нитратын дулааны тогтвортой байдал', en: 'thermal stability of carbonates and nitrates' }, def: { mn: 'II бүлгийн доош явах тусам карбонат ба нитрат илүү тогтвортой; задрах температур нэмэгдэнэ.', en: 'Group 2 carbonates and nitrates become more thermally stable down the group.' } },
    { term: { mn: 'гидроксидын уусах чадвар', en: 'solubility of hydroxides' }, def: { mn: 'II бүлгийн доош гидроксидын уусах чадвар нэмэгдэнэ (Mg(OH)₂ бага, Ba(OH)₂ их уусна).', en: 'Group 2 hydroxides become more soluble down the group.' } },
    { term: { mn: 'сульфатын уусах чадвар', en: 'solubility of sulfates' }, def: { mn: 'II бүлгийн доош сульфатын уусах чадвар буурна; барийн сульфат уусдаггүй.', en: 'Group 2 sulfates become less soluble down the group; barium sulfate is insoluble.' } },
    { term: { mn: 'гидратацийн энерги', en: 'hydration energy' }, def: { mn: 'Ионыг усаар хүрээлэх үед ялгарах энерги; жижиг, их цэнэгтэй ионд их байна.', en: 'The energy released when an ion becomes surrounded by water molecules; it is larger for small, highly charged ions.' } }
  ],
  'al-ch-28': [
    { term: { mn: 'шилжилтийн элемент', en: 'transition element' }, def: { mn: 'Дор хаяж нэг ионд d-дэд бүрхүүл хэсэгчлэн дүүрсэн элемент.', en: 'An element that forms at least one ion with a partly filled d sub-shell.' } },
    { term: { mn: 'комплекс ион', en: 'complex ion' }, def: { mn: 'Төв металл ионыг түүнд холбогдсон лигандууд хүрээлсэн ион.', en: 'An ion formed from a central metal ion surrounded by ligands bonded to it.' } },
    { term: { mn: 'лиганд', en: 'ligand' }, def: { mn: 'Металл ионтой координатын холбоо үүсгэдэг хосгүй электрон хостой молекул эсвэл ион.', en: 'A molecule or ion with a lone pair that forms a coordinate bond to a metal ion.' } },
    { term: { mn: 'координацийн тоо', en: 'coordination number' }, def: { mn: 'Төв металл ионд холбогдсон координатын холбооны тоо.', en: 'The number of coordinate bonds from the ligands to the central metal ion.' } },
    { term: { mn: 'хувьсах исэлдэлтийн төлөв', en: 'variable oxidation state' }, def: { mn: 'Шилжилтийн элемент хэд хэдэн исэлдэлтийн төлөвтэй нэгдэл үүсгэх чадвар.', en: 'The ability of transition elements to form compounds with more than one oxidation state.' } },
    { term: { mn: 'лигандын орлуулалт', en: 'ligand substitution' }, def: { mn: 'Комплекс дэх нэг лигандыг өөр лигандаар солих урвал.', en: 'A reaction in which one ligand in a complex is replaced by another.' } },
    { term: { mn: 'катализын идэвх', en: 'catalytic activity' }, def: { mn: 'Шилжилтийн металл ба тэдгээрийн нэгдэл исэлдэлтийн төлвөө өөрчилж катализатор болох чадвар.', en: 'The ability of transition metals and their compounds to act as catalysts, often by changing their oxidation state.' } },
    { term: { mn: 'комплексийн өнгө', en: 'colour of complexes' }, def: { mn: 'd-электронууд хуваагдсаны улмаас тодорхой харагдах гэрлийг шингээж, өнгөтэй харагдах комплекс.', en: 'Coloured complexes absorb certain visible light when the d-electron energy levels are split by the ligands.' } }
  ],
  'al-ch-29': [
    { term: { mn: 'муруй сум', en: 'curly arrow' }, def: { mn: 'Механизмд электрон хосын шилжилтийг заах сум.', en: 'An arrow showing the movement of an electron pair in a reaction mechanism.' } },
    { term: { mn: 'гомолитийн таслалт', en: 'homolytic fission' }, def: { mn: 'Ковалент холбоо таслагдахад хамтын электрон тус бүр атомд үлдэж, радикал үүснэ.', en: 'Breaking of a covalent bond so that each atom keeps one electron, forming radicals.' } },
    { term: { mn: 'электрофилийн нэмэлт', en: 'electrophilic addition' }, def: { mn: 'Электрофил C=C давхар холбоонд дайрч, нэмэгдэх урвал.', en: 'A reaction in which an electrophile is attacked by the electrons of a C=C double bond, forming an addition product.' } },
    { term: { mn: 'цис–транс изомер', en: 'cis–trans isomer' }, def: { mn: 'Давхар холбооны хоёр талд байрлах бүлгүүд нэг талд эсвэл эсрэг талд байх геометрийн изомер.', en: 'A geometric isomer in which groups are on the same side (cis) or opposite sides (trans) of a C=C bond.' } },
    { term: { mn: 'карбокатионы тогтвортой байдал', en: 'carbocation stability' }, def: { mn: 'Орлуулагдсан их карбокатион илүү тогтвортой; алкил бүлэг электрон нягтыг түлхдэг.', en: 'More substituted carbocations are more stable because alkyl groups donate electron density to the positive carbon.' } }
  ],
  'al-ch-30': [
    { term: { mn: 'арен', en: 'arene' }, def: { mn: 'Бензолын цагиргтай ароматик нүүрсустөрөгч.', en: 'An aromatic hydrocarbon containing a benzene ring.' } },
    { term: { mn: 'делокалчлагдсан π систем', en: 'delocalised π system' }, def: { mn: 'Бензолын цагирагийн 6 π электроныг цагирагийн бүх нүүрстөрөгчид хуваасан систем.', en: 'The six π electrons of benzene shared over all six carbon atoms of the ring.' } },
    { term: { mn: 'электрофил орлуулалт', en: 'electrophilic substitution' }, def: { mn: 'Электрофил бензолын цагирагийн устөрөгчийг орлох урвал.', en: 'A reaction in which an electrophile replaces a hydrogen atom on the benzene ring.' } },
    { term: { mn: 'нитрацлалт', en: 'nitration' }, def: { mn: 'Бензолыг төвлөрсөн HNO₃ ба H₂SO₄-ийн холимгоор нитробензол болгох урвал.', en: 'The reaction of benzene with concentrated nitric and sulfuric acids to form nitrobenzene.' } },
    { term: { mn: 'Фридель–Крафтсын урвал', en: 'Friedel–Crafts reaction' }, def: { mn: 'Галогенэлкан ба AlCl₃ катализатороор арен цагирагийг алкилжих урвал.', en: 'The reaction of an arene with a halogenoalkane in the presence of aluminium chloride, which alkylates the ring.' } },
    { term: { mn: 'чиглэлт нөлөө', en: 'directing effect' }, def: { mn: 'Цагирагт байгаа орлуулагч дараагийн орлуулалт аль байрлалд явахыг тодорхойлно.', en: 'A substituent on the ring directs a further electrophilic substitution to particular positions.' } }
  ],
  'al-ch-31': [
    { term: { mn: 'SN1 урвал', en: 'SN1 reaction' }, def: { mn: 'Хоёр алхамт нуклеофилийн орлуулалт; карбокатион завсрын бүтээгдэхүүн болно.', en: 'A two-step nucleophilic substitution that goes through a carbocation intermediate.' } },
    { term: { mn: 'SN2 урвал', en: 'SN2 reaction' }, def: { mn: 'Нэг алхамт нуклеофилийн орлуулалт; нуклеофил дайрах үед гарч явах бүлэг зэрэг салдаг.', en: 'A single-step nucleophilic substitution in which the nucleophile attacks as the leaving group departs.' } },
    { term: { mn: 'гарч явах бүлэг', en: 'leaving group' }, def: { mn: 'Нуклеофилийн орлуулалтад электрон хостойгоо холбооноос салж гарах атом эсвэл бүлэг.', en: 'The atom or group that leaves with the electron pair from the carbon in a nucleophilic substitution.' } },
    { term: { mn: 'галогенэлканы усжилт', en: 'hydrolysis of halogenoalkanes' }, def: { mn: 'C–X холбооны энерги бага байх тусам (C–I < C–Br < C–Cl) усжих хурд их.', en: 'Halogenoalkanes hydrolyse faster when the C–X bond enthalpy is smaller (C–I < C–Br < C–Cl).' } },
    { term: { mn: 'элиминацийн урвал', en: 'elimination reaction' }, def: { mn: 'Галогенэлкан HX алдаж алкен үүсгэх урвал; ихэвчлэн этанол дахь суурьтай халаахад явагдана.', en: 'A reaction in which a halogenoalkane loses HX to form an alkene, often when heated with alkali in ethanol.' } }
  ],
  'al-ch-32': [
    { term: { mn: 'нэгдүгээр спиртийн исэлдэлт', en: 'oxidation of primary alcohols' }, def: { mn: 'Нэгдүгээр спирт эхлээд альдегид, дараа нь карбоксилын хүчил болж исэлдэнэ.', en: 'A primary alcohol is oxidised to an aldehyde and then to a carboxylic acid.' } },
    { term: { mn: 'хоёрдугаар спиртийн исэлдэлт', en: 'oxidation of secondary alcohols' }, def: { mn: 'Хоёрдугаар спирт кетон болж исэлдэнэ; кетон цаашид исэлдэхгүй.', en: 'A secondary alcohol is oxidised to a ketone, which cannot be oxidised further.' } },
    { term: { mn: 'фенол', en: 'phenol' }, def: { mn: 'OH бүлэг бензолын цагиргт шууд холбогдсон нэгдэл; спиртээс илүү хүчиллэг.', en: 'A compound with an OH group bonded directly to a benzene ring; more acidic than alcohols.' } },
    { term: { mn: 'фенолын хүчиллэг байдал', en: 'acidity of phenol' }, def: { mn: 'Фенолын протон салахад үүсэх фенокси ионы сөрөг цэнэг цагирагт делокалчлагдаж тогтворждог.', en: 'Phenol is weakly acidic because the negative charge of the phenoxide ion is delocalised into the ring.' } }
  ],
  'al-ch-33': [
    { term: { mn: 'ацил бүлэг', en: 'acyl group' }, def: { mn: 'R–C=O бүлэг; карбоксилын хүчил ба түүний деривативт байна.', en: 'The R–C=O group found in carboxylic acids and their derivatives.' } },
    { term: { mn: 'хүчлийн ангидрид', en: 'acid anhydride' }, def: { mn: 'Хоёр карбоксилын хүчлийн молекулаас ус зайлсны улмаас үүсэх нэгдэл, жишээ нь этаноат ангидрид.', en: 'A compound formed when water is removed from two carboxylic acid molecules, for example ethanoic anhydride.' } },
    { term: { mn: 'амид', en: 'amide' }, def: { mn: '–CONH₂ бүлэг агуулсан нэгдэл.', en: 'A compound containing the –CONH₂ group.' } },
    { term: { mn: 'нуклеофилийн нэмэлт–салгалтын урвал', en: 'nucleophilic addition–elimination' }, def: { mn: 'Нуклеофил карбонилын нүүрстөрөгчид нэмэгдэж, дараа нь гарч явах бүлэг салах урвал.', en: 'A reaction in which a nucleophile adds to the carbonyl carbon and then a leaving group is eliminated.' } },
    { term: { mn: 'LiAlH₄-ээр ангижруулах', en: 'reduction by LiAlH₄' }, def: { mn: 'Карбоксилын хүчлийг нэгдүгээр спирт болгон ангижруулдаг хүчтэй ангижруулагч.', en: 'A strong reducing agent, lithium tetrahydridoaluminate, which reduces carboxylic acids to primary alcohols.' } }
  ],
  'al-ch-34': [
    { term: { mn: 'нэгдүгээр амин', en: 'primary amine' }, def: { mn: 'Азотод нэг алкил бүлэг холбогдсон амин, –NH₂.', en: 'An amine with one alkyl group bonded to the nitrogen atom.' } },
    { term: { mn: 'амины суурьшил', en: 'basicity of amines' }, def: { mn: 'Азотын хосгүй электрон хос протон хүлээн авч чаддаг тул амин суурь болно.', en: 'Amines are bases because the lone pair on nitrogen can accept a proton.' } },
    { term: { mn: 'амин хүчил', en: 'amino acid' }, def: { mn: 'Амино бүлэг (–NH₂) ба карбоксил бүлэг (–COOH) хоёуланг агуулсан нэгдэл.', en: 'A compound containing both an amino group and a carboxylic acid group.' } },
    { term: { mn: 'цвиттер ион', en: 'zwitterion' }, def: { mn: 'Амин хүчил саармаг уусмалд үүсгэдэг, эерэг ба сөрөг цэнэгтэй (–NH₃⁺, –COO⁻) ион.', en: 'The ion, with both a positive and a negative charge, that an amino acid forms in neutral solution.' } },
    { term: { mn: 'диазони давс', en: 'diazonium salt' }, def: { mn: 'Ароматик нэгдлийн нэгдүгээр аминыг бага температурт нитрит хүчилтэй урвалд оруулахад үүсэх давс.', en: 'A salt formed when a primary aromatic amine reacts with nitrous acid at low temperature.' } },
    { term: { mn: 'нитрил', en: 'nitrile' }, def: { mn: '–C≡N бүлэг агуулсан нэгдэл.', en: 'A compound containing the –C≡N group.' } }
  ],
  'al-ch-35': [
    { term: { mn: 'полипептид', en: 'polypeptide' }, def: { mn: 'Амин хүчлүүд пептидийн холбоогоор холбогдсон конденсацийн полимер.', en: 'A condensation polymer of amino acids linked by peptide bonds.' } },
    { term: { mn: 'полиэфирийн гидролиз', en: 'hydrolysis of polyesters' }, def: { mn: 'Полиэфир ус ба хүчил эсвэл суурийн нөлөөгөөр задарч мономер болно; ингэж дахин ашиглах боломжтой.', en: 'Polyesters can be hydrolysed back into their monomers, which allows them to be recycled.' } },
    { term: { mn: 'хөндлөнгийн холбоо', en: 'cross-linking' }, def: { mn: 'Полимерийн гинжнүүдийг холбох ковалент холбоо; полимерийг хатуу болгоно.', en: 'Covalent links between polymer chains, which make the polymer rigid.' } },
    { term: { mn: 'термоцэтэр полимер', en: 'thermosetting polymer' }, def: { mn: 'Хөндлөнгийн холбоотой, халаахад зөөлрөхгүй хатуу полимер.', en: 'A cross-linked polymer that does not soften on heating.' } },
    { term: { mn: 'термопласт', en: 'thermoplastic polymer' }, def: { mn: 'Халаахад зөөлөрч дахин хэлбэржиж болдог полимер.', en: 'A polymer that softens on heating and can be remoulded.' } }
  ],
  'al-ch-36': [
    { term: { mn: 'ретросинтез', en: 'retrosynthesis' }, def: { mn: 'Зорилтот молекулаас эхлэн урвуу алхмаар энгийн эх бодис хүртэл синтезийг төлөвлөх арга.', en: 'Planning a synthesis backwards from the target molecule to simple starting materials.' } },
    { term: { mn: 'функциональ бүлгийн хувиргалт', en: 'functional group interconversion' }, def: { mn: 'Синтезийн алхамд нэг функциональ бүлгийг өөр бүлэг болгон хувиргах.', en: 'Converting one functional group into another as one step of a synthesis.' } },
    { term: { mn: 'олон алхамт гарц', en: 'overall yield of a multi-step synthesis' }, def: { mn: 'Алхам бүрийн гарцын үржвэр нь нийт гарц.', en: 'In a multi-step synthesis the overall yield is the product of the yields of each step.' } },
    { term: { mn: 'реагент ба нөхцөл', en: 'reagents and conditions' }, def: { mn: 'Алхам бүрт хэрэглэх бодис, температур, катализатор, уусгагч.', en: 'The substances and the conditions (temperature, catalyst, solvent) needed for each step.' } }
  ],
  'al-ch-37': [
    { term: { mn: 'үндсэн оргил', en: 'base peak' }, def: { mn: 'Масс спектрийн хамгийн эрчимтэй оргил; харьцангуй эрчим 100%.', en: 'The most intense peak in a mass spectrum, with a relative abundance of 100%.' } },
    { term: { mn: 'химийн шилжилт (δ)', en: 'chemical shift' }, def: { mn: 'NMR оргилын байрлал, ppm-ээр; протоны орчноос хамаарна.', en: 'The position of an NMR peak in ppm, which depends on the electronic environment of the proton.' } },
    { term: { mn: 'спин–спин хуваагдал', en: 'spin–spin splitting' }, def: { mn: 'Хөрш протоны тоо n бол NMR оргил (n + 1) оргил болж хуваагдана.', en: 'The splitting of an NMR peak into (n + 1) peaks, where n is the number of neighbouring protons.' } },
    { term: { mn: 'оргилын талбай', en: 'integration' }, def: { mn: 'NMR оргилын талбай нь тухайн дохиог өгч буй протоны тоонд пропорциональ.', en: 'The area under an NMR peak is proportional to the number of protons giving that signal.' } },
    { term: { mn: 'ТМС (тетраметилсилан)', en: 'TMS (tetramethylsilane)' }, def: { mn: 'NMR-ийн эталон бодис; химийн шилжилт 0 ppm.', en: 'The reference compound in NMR, set at 0 ppm.' } },
    { term: { mn: 'хийн хроматографи', en: 'gas chromatography' }, def: { mn: 'Ууршдаг холимгийг хий хөдөлгөөнт фазаар багана дамжуулж салгах арга.', en: 'A separation method in which a volatile mixture is carried by a gas through a column.' } },
    { term: { mn: 'хадгалалтын хугацаа', en: 'retention time' }, def: { mn: 'Бодис баганад орснооос гарах хүртэлх хугацаа; бодисыг тодорхойлоход ашиглана.', en: 'The time a component takes to pass through the column, used to identify it.' } }
  ]
};
