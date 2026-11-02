import type { ExamQuestion } from '../types/chemistry';
import type { Taxonomy } from '../lib/taxonomy';
import { topicWriter } from './topicMcqBuild';

// Apply and evaluate questions for chapters 1 to 6, so that every topic has some of each level on the lesson assessment sheet.
// They are original, written for the 0620 syllabus; none is copied from a Cambridge paper.
const CH1 = 'ch-states-of-matter';
const CH2 = 'ch-atoms-bonding';
const CH3 = 'ch-stoichiometry';
const CH4 = 'ch-electrochemistry';
const CH5 = 'ch-energetics';
const CH6 = 'ch-reactions';

const tag = (q: ExamQuestion, taxonomy: Taxonomy): ExamQuestion => ({ ...q, taxonomy });

const d12 = topicWriter('s-1-2', CH1, '0620/1.2');
const d21 = topicWriter('s-2-1', CH2, '0620/2.1');
const d22 = topicWriter('s-2-2', CH2, '0620/2.2');
const d23 = topicWriter('s-2-3', CH2, '0620/2.3');
const d24 = topicWriter('top-2-1', CH2, '0620/2.4');
const d25 = topicWriter('s-2-5', CH2, '0620/2.5');
const d26 = topicWriter('s-2-6', CH2, '0620/2.6');
const d27 = topicWriter('s-2-7', CH2, '0620/2.7');
const d31 = topicWriter('s-3-1', CH3, '0620/3.1');
const d32 = topicWriter('s-3-2', CH3, '0620/3.2');
const d33 = topicWriter('top-3-1', CH3, '0620/3.3');
const d41 = topicWriter('top-4-1', CH4, '0620/4.1');
const d42 = topicWriter('s-4-2', CH4, '0620/4.2');
const d51 = topicWriter('s-5-1', CH5, '0620/5.1');
const d61 = topicWriter('s-6-1', CH6, '0620/6.1');
const d62 = topicWriter('top-8-1', CH6, '0620/6.2');
const d63 = topicWriter('s-6-3', CH6, '0620/6.3');
const d64 = topicWriter('s-6-4', CH6, '0620/6.4');

export const TOPIC_MCQ_LEVELS_A: ExamQuestion[] = [
  // 1.2 Diffusion
  tag(d12(80, 'Diffusion rate and molar mass', 'Диффуз ба молийн масс', 'Hydrogen diffuses 4 times faster than gas X at the same temperature and pressure. What is the approximate relative molecular mass of X?', 'Ижил температур, даралтанд устөрөгч X хийгээс 4 дахин хурдан тархдаг. X-ийн харьцангуй молекул масс ойролцоогоор хэд вэ?',
    [['8', '8'], ['16', '16'], ['32', '32'], ['64', '64']],
    'C', 'Taking the ratio of rates as the ratio of relative molecular masses. Rate is inversely proportional to the square root of Mᵣ, so Mᵣ(X) = 2 × 4² = 32.', 'Хурдны харьцааг молийн массын харьцаатай андуурах. Хурд нь Mᵣ-ийн квадрат язгуурт урвуу пропорциональ тул Mᵣ(X) = 2 × 4² = 32.'), 'apply'),
  tag(d12(81, 'Diffusion in liquids', 'Шингэн дэх диффуз', 'A student says: "Diffusion happens only in gases, not in liquids." Evaluate this statement.', 'Сурагч: "Диффуз зөвхөн хийд явагдаж, шингэнд явагддаггүй." Энэ мэдэгдлийг үнэлнэ үү.',
    [['The statement is correct; diffusion needs a gas', 'Мэдэгдэл зөв; диффуз хий шаардана'], ['The statement is partly wrong: diffusion also happens in liquids, for example when food colouring spreads in water, but more slowly than in gases', 'Хэсэгчлэн буруу: шингэнд ч диффуз явагддаг, жишээ нь хоолны будаг устай хольдог, гэхдээ хийнээс удаан'], ['The statement is correct; liquids cannot mix', 'Мэдэгдэл зөв; шингэн холилддоггүй'], ['The statement is wrong; diffusion needs a solid', 'Мэдэгдэл буруу; диффуз хатуу бодис шаардана']],
    'B', 'Thinking diffusion is only a gas process, because gases are the usual example.', 'Диффузыг зөвхөн хийн үйл явц гэж бодох, учир нь хий хамгийн түгээмэл жишээ.'), 'evaluate'),

  // 2.1 Elements, compounds and mixtures
  tag(d21(80, 'Deducing a compound', 'Нэгдлийг дүгнэх', 'A substance is heated and splits into two different substances that cannot be separated further by physical methods. What can be concluded?', 'Бодисыг халаахад физик аргаар цаашид салгах боломжгүй хоёр өөр бодис болж задарна. Юу гэж дүгнэх вэ?',
    [['It is a mixture of two elements', 'Хоёр элементийн холимог'], ['It is a compound, broken down by a chemical change', 'Химийн өөрчлөлтөөр задардаг нэгдэл'], ['It is an element', 'Элемент'], ['It is air', 'Агаар']],
    'B', 'Thinking a mixture can be split chemically, or that an element can split into two substances.', 'Холимгийг химийн аргаар задалж болно гэж бодох, эсвэл элементийг хоёр бодис болгож задална гэж бодох.'), 'apply'),
  tag(d21(81, 'Is air a compound', 'Агаар нэгдэл үү', 'A student claims: "Air is a compound because it contains oxygen and nitrogen." Evaluate this claim.', 'Сурагч: "Агаар нь хүчилтөрөгч, азот агуулдаг тул нэгдэл." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: air is a compound because it has two gases', 'Зөв: хоёр хий агуулдаг тул агаар нэгдэл'], ['Incorrect: air is a mixture, because its gases are not chemically combined and can be separated by physical methods', 'Буруу: агаар холимог, учир нь хийнүүд химийн аргаар холбогдоогүй, физик аргаар салгагдана'], ['Correct: any gas is a compound', 'Зөв: ямар ч хий нэгдэл'], ['Incorrect: air is an element', 'Буруу: агаар элемент']],
    'B', 'Thinking any substance made of more than one gas is a compound.', 'Хоёроос дээш хий агуулсан бодис бүр нэгдэл гэж бодох.'), 'evaluate'),

  // 2.2 Atomic structure
  tag(d22(80, 'Particles in an atom', 'Атомын бөөмс', 'An atom has proton number 11 and nucleon number 23. How many neutrons and how many electrons does it have?', 'Атомын протоны тоо 11, нуклоны тоо 23. Хичнээн нейтрон, электрон байх вэ?',
    [['12 neutrons, 11 electrons', '12 нейтрон, 11 электрон'], ['11 neutrons, 12 electrons', '11 нейтрон, 12 электрон'], ['23 neutrons, 11 electrons', '23 нейтрон, 11 электрон'], ['12 neutrons, 12 electrons', '12 нейтрон, 12 электрон']],
    'A', 'Taking the nucleon number as the neutron count, or forgetting that a neutral atom has as many electrons as protons.', 'Нуклоны тоог нейтрон гэж авах, эсвэл саармаг атомд протоны тоотой адил электрон байдгийг мартах.'), 'apply'),
  tag(d22(81, 'Mass number and relative atomic mass', 'Массын тоо ба харьцангуй атомын масс', 'A student says: "The mass number of an element is always the same as its relative atomic mass." Evaluate this statement.', 'Сурагч: "Элементийн массын тоо нь үргэлж харьцангуй атомын масстай адил." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: the two are always identical', 'Зөв: хоёр нь үргэлж адил'], ['Partly wrong: relative atomic mass is an average over the isotopes, so it is often not a whole number, while mass number is for one isotope', 'Хэсэгчлэн буруу: харьцангуй атомын масс нь изотопуудын дундаж тул бүхэл тоо биш байж болно, харин массын тоо нэг изотопынх'], ['Correct: they are the same for all elements', 'Зөв: бүх элементэд адил'], ['Wrong: mass number is the number of electrons', 'Буруу: массын тоо нь электроны тоо']],
    'B', 'Thinking the mass number and relative atomic mass are the same thing.', 'Массын тоо ба харьцангуй атомын массыг адилхан гэж бодох.'), 'evaluate'),

  // 2.3 Isotopes
  tag(d23(81, 'Isotopes and chemical properties', 'Изотоп ба химийн шинж', 'A student says: "Isotopes of the same element have different chemical properties because they have different masses." Evaluate this statement.', 'Сурагч: "Нэг элементийн изотопууд массаараа ялгаатай тул химийн шинж чанар нь ялгаатай." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: different masses give different reactions', 'Зөв: өөр масс өөр урвал өгнө'], ['Incorrect: isotopes have the same number of electrons, so they have the same chemical properties; only their mass differs', 'Буруу: изотопуудын электроны тоо адил тул химийн шинж адил; зөвхөн масс нь ялгаатай'], ['Correct: they have different proton numbers', 'Зөв: протоны тоо ялгаатай'], ['Incorrect: isotopes do not exist', 'Буруу: изотоп байдаггүй']],
    'B', 'Thinking the mass of an atom controls how it reacts, rather than its electrons.', 'Атомын масс урвалд орох чадвараа тодорхойлдог гэж бодох, электроныг нь мартах.'), 'evaluate'),

  // 2.4 Ionic, covalent and giant covalent structures
  tag(d24(81, 'Covalent melting points', 'Ковалент хайлах цэг', 'A student says: "All covalent substances have high melting points because covalent bonds are strong." Evaluate this statement.', 'Сурагч: "Бүх ковалент бодисын хайлах цэг өндөр, учир нь ковалент холбоо хүчтэй." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: covalent bonds are always strong', 'Зөв: ковалент холбоо үргэлж хүчтэй'], ['Incorrect: simple covalent molecules have low melting points, because the forces between molecules are weak; only giant covalent structures have high melting points', 'Буруу: энгийн ковалент молекул бага хайлах цэгтэй, учир нь молекул хоорондын хүч сул; зөвхөн томоохон ковалент бүтэц өндөр хайлах цэгтэй'], ['Correct: covalent substances conduct electricity', 'Зөв: ковалент бодис цахилгаан дамжуулдаг'], ['Incorrect: covalent substances are metals', 'Буруу: ковалент бодис металл']],
    'B', 'Confusing the strength of the bonds inside molecules with the forces between molecules.', 'Молекулын доторх холбооны хүчийг молекул хоорондын хүчтэй андуурах.'), 'evaluate'),

  // 2.5 Simple molecules and covalent bonds
  tag(d25(81, 'Methane is covalent', 'Метан ковалент', 'A student claims: "Methane is an ionic compound because it contains carbon and hydrogen." Evaluate this claim.', 'Сурагч: "Метан нь нүүрстөрөгч, устөрөгч агуулдаг тул ионт нэгдэл." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: any compound of two elements is ionic', 'Зөв: хоёр элементийн бүх нэгдэл ионт'], ['Incorrect: methane is covalent, because carbon and hydrogen are both non-metals that share electrons', 'Буруу: метан ковалент, учир нь нүүрстөрөгч, устөрөгч хоёулаа металл бус, электрон хуваалцдаг'], ['Correct: carbon forms ions in methane', 'Зөв: нүүрстөрөгч метанд ион үүсгэдэг'], ['Incorrect: methane is a metal', 'Буруу: метан металл']],
    'B', 'Thinking any compound of two elements must be ionic.', 'Хоёр элементийн ямар ч нэгдэл ионт гэж бодох.'), 'evaluate'),

  // 2.6 Giant covalent structures
  tag(d26(80, 'Predicting the properties of graphite', 'Графитын шинжийг таамаглах', 'Graphite and diamond are both forms of carbon. Graphite has layers of carbon atoms, each atom bonded to three others with one delocalised electron. Which property is predicted for graphite?', 'Графит ба алмаз хоёулаа нүүрстөрөгчийн хэлбэр. Графит нь атом бүр гурван атомтай холбогдсон, нэг чөлөөт электронтой давхаргуудаас бүрддэг. Графитын ямар шинжийг таамаглах вэ?',
    [['Very hard and does not conduct electricity', 'Маш хатуу, цахилгаан дамжуулдаггүй'], ['Soft and conducts electricity through its delocalised electrons', 'Зөөлөн, чөлөөт электрондоо дамжуулан цахилгаан дамжуулдаг'], ['Soft and does not conduct electricity', 'Зөөлөн, цахилгаан дамжуулдаггүй'], ['Brittle and dissolves in water', 'Хугарамтгай, усанд уусдаг']],
    'B', 'Taking graphite to have the same properties as diamond, where every electron is fixed in a bond.', 'Графит нь алмазтай адил шинжтэй гэж бодох, бүх электрон холбоонд тогтсон гэж бодох.'), 'apply'),
  tag(d26(81, 'Is graphite a metal', 'Графит металл уу', 'A student says: "Graphite conducts electricity, so it must be a metal." Evaluate this claim.', 'Сурагч: "Графит цахилгаан дамжуулдаг тул металл байх ёстой." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: conduction shows that a substance is a metal', 'Зөв: дамжуулалт нь металлыг харуулна'], ['Incorrect: graphite is a non-metal giant covalent structure; its conduction comes from delocalised electrons between its layers', 'Буруу: графит металл бус томоохон ковалент бүтэц; дамжуулалт нь давхаргуудын хооронд чөлөөт электронуудаас'], ['Correct: graphite is shiny', 'Зөв: графит гялалздаг'], ['Incorrect: graphite is ionic', 'Буруу: графит ионт']],
    'B', 'Thinking only metals conduct electricity.', 'Зөвхөн металл цахилгаан дамжуулдаг гэж бодох.'), 'evaluate'),

  // 2.7 Metallic bonding
  tag(d27(80, 'Metal shaped by hammering', 'Алхаар хэлбэржүүлсэн металл', 'A metal is hammered into a sheet without breaking. Which prediction follows from metallic bonding?', 'Металлыг хугалахгүйгээр алхаар хуудас болгов. Металлын холбооноос ямар таамаглал гарах вэ?',
    [['The metal shatters into ions', 'Металл ион болж хагарна'], ['The metal deforms: its layers slide while the sea of delocalised electrons keeps the structure together', 'Металл хэлбэрээ өөрчилнө: давхаргууд гулсах ба чөлөөт электронууд бүтцийг хамт барина'], ['Its bonds break into molecules', 'Холбоо нь молекул болж задарна'], ['It melts into a liquid', 'Шингэн болж хайлна']],
    'B', 'Thinking metal bonds are rigid, like the bonds in an ionic crystal.', 'Металлын холбоог ионт талстын холбоо шиг хатуу гэж бодох.'), 'apply'),
  tag(d27(81, 'Why metals conduct', 'Металл яагаад дамжуулдаг вэ', 'A student says: "Metals conduct electricity because their atoms are charged." Evaluate this statement.', 'Сурагч: "Металл цахилгаан дамжуулдаг, учир нь тэдний атом цэнэгтэй." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: the atoms carry a charge', 'Зөв: атом цэнэгтэй'], ['Incorrect: the atoms are neutral; conduction is by delocalised electrons moving through the lattice', 'Буруу: атом саармаг; дамжуулалт нь торын дундуур хөдөлж буй чөлөөт электронуудаас'], ['Correct: the metal ions move', 'Зөв: металл ион хөдөлдөг'], ['Incorrect: metals do not conduct', 'Буруу: металл дамжуулдаггүй']],
    'B', 'Thinking the ions carry the current in a metal, as they do in molten salts.', 'Металлд ион гүйдэл дамжуулдаг гэж бодох, хайлсан давсанд шиг.'), 'evaluate'),

  // 3.1 Formulae and equations
  tag(d31(80, 'Balancing a simple equation', 'Энгийн тэгшитгэл тэнцүүлэх', 'Which balanced equation is correct for: Mg + O₂ → MgO?', 'Mg + O₂ → MgO урвалын зөв тэнцүүлсэн тэгшитгэл аль нь вэ?',
    [['Mg + O₂ → MgO', 'Mg + O₂ → MgO'], ['2Mg + O₂ → 2MgO', '2Mg + O₂ → 2MgO'], ['Mg + 2O₂ → MgO', 'Mg + 2O₂ → MgO'], ['2Mg + 2O₂ → MgO', '2Mg + 2O₂ → MgO']],
    'B', 'Changing only one side, so that the atoms do not balance on both sides.', 'Нэг талыг л өөрчилж, хоёр талын атом тэнцэхгүй болгох.'), 'apply'),
  tag(d31(81, 'Formula of magnesium oxide', 'Магнийн ислийн томьёо', 'A student writes the formula of magnesium oxide as MgO₂, "because oxygen is O₂". Evaluate this.', 'Сурагч магнийн ислийн томьёог MgO₂ гэж бичиж, "хүчилтөрөгч O₂ тул" гэжээ. Үнэлнэ үү.',
    [['Correct: oxygen is O₂, so the formula is MgO₂', 'Зөв: хүчилтөрөгч O₂ тул томьёо MgO₂'], ['Incorrect: Mg²⁺ and O²⁻ combine in a 1:1 ratio, so the formula is MgO', 'Буруу: Mg²⁺ ба O²⁻ 1:1 харьцаагаар нийлдэг тул томьёо MgO'], ['Correct: charges do not affect the formula', 'Зөв: цэнэг томьёонд нөлөөлдөггүй'], ['Incorrect: magnesium is a non-metal', 'Буруу: магни металл бус']],
    'B', 'Copying the formula of the element in the reactant, rather than using the ion charges.', 'Урвалд орогч элементийн томьёог хуулах, ионы цэнэгийг ашиглахгүй байх.'), 'evaluate'),

  // 3.2 Relative masses
  tag(d32(80, 'Relative formula mass', 'Харьцангуй томьёоны масс', 'Calculate the relative formula mass of Ca(OH)₂. (Ar: Ca = 40, O = 16, H = 1)', 'Ca(OH)₂-ийн харьцангуй томьёоны массыг тооцоол. (Ar: Ca = 40, O = 16, H = 1)',
    [['57', '57'], ['74', '74'], ['58', '58'], ['40', '40']],
    'B', 'Forgetting to multiply the OH group by two, so the hydrogen and oxygen are counted only once.', 'OH бүлгийг хоёроор үржүүлэхээ мартаж, устөрөгч, хүчилтөрөгчийг нэг удаа тооцох.'), 'apply'),
  tag(d32(81, 'Mass of carbon dioxide', 'Нүүрсхүчлийн хийн масс', 'A student claims the relative molecular mass of CO₂ is 12, "because it is just carbon". Evaluate this claim.', 'Сурагч CO₂-ийн харьцангуй молекул масс 12 гэж, "зөвхөн нүүрстөрөгч учраас" гэжээ. Үнэлнэ үү.',
    [['Correct: CO₂ is only carbon', 'Зөв: CO₂ зөвхөн нүүрстөрөгч'], ['Incorrect: Mᵣ = 12 + 2 × 16 = 44, so the oxygen must be counted', 'Буруу: Mᵣ = 12 + 2 × 16 = 44, тиймээс хүчилтөрөгчийг тооцох ёстой'], ['Correct: oxygen has no mass', 'Зөв: хүчилтөрөгчид масс байхгүй'], ['Incorrect: Mᵣ is 32', 'Буруу: Mᵣ нь 32']],
    'B', 'Leaving out the oxygen atoms when adding the relative atomic masses.', 'Харьцангуй атомын массыг нэмэхдээ хүчилтөрөгчийн атомыг орхих.'), 'evaluate'),

  // 3.3 Moles, reacting masses and gas volumes
  tag(d33(81, 'Mass of one mole', 'Нэг моль масс', 'A student says: "One mole of any substance has the same mass." Evaluate this statement.', 'Сурагч: "Ямар ч бодисын нэг моль адил масстай." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: a mole is always 6 g', 'Зөв: моль үргэлж 6 г'], ['Incorrect: one mole contains the same number of particles, but its mass depends on the molar mass of the substance', 'Буруу: нэг моль адил тооны бөөмс агуулдаг, харин масс нь бодисын молийн массаас хамаарна'], ['Correct: every mole is a gas volume of 24 dm³', 'Зөв: моль бүр 24 дм³ хийн эзэлхүүн'], ['Incorrect: a mole is a mass unit', 'Буруу: моль бол масс нэгж']],
    'B', 'Thinking a mole is a fixed mass, rather than a fixed number of particles.', 'Моль нь тогтмол масс гэж бодох, тогтмол тооны бөөмс гэдгийг мартах.'), 'evaluate'),

  // 4.1 Electrolysis
  tag(d41(80, 'Copper electrodes in copper(II) sulfate', 'Зэсийн электродтой зэсийн(II) сульфат', 'Copper(II) sulfate solution is electrolysed with copper electrodes. What happens at the anode?', 'Зэсийн(II) сульфатын уусмалыг зэсийн электродоор электролиз хийв. Анодод юу болох вэ?',
    [['Oxygen is produced', 'Хүчилтөрөгч үүсдэг'], ['Copper dissolves from the anode into the solution', 'Анодоос зэс уусмалд уусдаг'], ['Hydrogen is produced', 'Устөрөгч үүсдэг'], ['Copper is deposited on the anode', 'Анод дээр зэс тунадаслаг']],
    'B', 'Thinking the anode stays unchanged, as it does with inert electrodes.', 'Анод инерт электродын нэгэн адил өөрчлөгдөхгүй гэж бодох.'), 'apply'),
  tag(d41(81, 'Products of molten sodium chloride', 'Хайлсан натрийн хлоридын бүтээгдэхүүн', 'A student says: "Electrolysis of molten sodium chloride gives chlorine at the cathode." Evaluate this statement.', 'Сурагч: "Хайлсан натрийн хлоридыг электролиз хийхэд катодод хлор гарна." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: chlorine forms at the cathode', 'Зөв: хлор катодод үүснэ'], ['Incorrect: chlorine forms at the anode, the positive electrode; sodium forms at the cathode', 'Буруу: хлор анодод, эерэг электродод үүснэ; натри катодод үүснэ'], ['Correct: chlorine is negative', 'Зөв: хлор сөрөг'], ['Incorrect: no products form', 'Буруу: ямар ч бүтээгдэхүүн үүсэхгүй']],
    'B', 'Thinking the anode and cathode are the other way round for negative ions.', 'Сөрөг ионд анод, катодыг эсрэгээр бодох.'), 'evaluate'),

  // 4.2 Hydrogen–oxygen fuel cells
  tag(d42(80, 'Water from hydrogen', 'Устөрөгчөөс ус', '2H₂ + O₂ → 2H₂O. How many moles of water are formed from 4 moles of hydrogen?', '2H₂ + O₂ → 2H₂O. 4 моль устөрөгчөөс хэдэн моль ус үүсэх вэ?',
    [['2 mol', '2 моль'], ['4 mol', '4 моль'], ['8 mol', '8 моль'], ['1 mol', '1 моль']],
    'B', 'Halving the moles of hydrogen, rather than matching the ratio of 2 hydrogen to 2 water.', 'Устөрөгчийн молийг хоёр дахин багасгах, 2:2 харьцааг мартах.'), 'apply'),
  tag(d42(81, 'Are fuel cells pollution free', 'Түлшний эс бохирдолгүй юу', 'A student claims a hydrogen fuel cell produces no pollution at all. Evaluate this claim.', 'Сурагч устөрөгчийн түлшний эс ямар ч бохирдол үүсгэдэггүй гэжээ. Үнэлнэ үү.',
    [['Correct: no pollution at all', 'Зөв: огт бохирдолгүй'], ['Partly wrong: the cell itself gives only water, but making the hydrogen can release carbon dioxide and uses energy', 'Хэсэгчлэн буруу: эс өөрөө зөвхөн ус гаргадаг ч устөрөгчийг үйлдвэрлэхэд нүүрсхүчлийн хий ялгарч, энерги зарцуулдаг'], ['Correct: it produces carbon dioxide', 'Зөв: нүүрсхүчлийн хий гаргадаг'], ['Incorrect: it produces only oxygen', 'Буруу: зөвхөн хүчилтөрөгч гаргадаг']],
    'B', 'Judging the cell on its own output, without looking at how the hydrogen is made.', 'Эсийг зөвхөн гаралтаар нь үнэлж, устөрөгчийг хэрхэн гаргаж авч буйг анзаарахгүй байх.'), 'evaluate'),

  // 5.1 Exothermic and endothermic reactions
  tag(d51(80, 'Energy profile of an exothermic reaction', 'Экзотермик урвалын энергийн профайл', 'A reaction has an enthalpy change of −120 kJ/mol. What does its energy profile show?', 'Урвалын энтальпийн өөрчлөлт −120 кДж/моль. Түүний энергийн профайл юуг харуулах вэ?',
    [['The products have more energy than the reactants', 'Бүтээгдэхүүн урвалд орогчоосоо илүү энергитэй'], ['The products have less energy than the reactants', 'Бүтээгдэхүүн урвалд орогчоосоо бага энергитэй'], ['Heat is taken in from the surroundings', 'Орчноос дулаан авдаг'], ['The surroundings become colder', 'Орчин хөрдөг']],
    'B', 'Reading a negative enthalpy change as energy being taken in.', 'Сөрөг энтальпийн өөрчлөлтийг энерги авдаг гэж уншах.'), 'apply'),
  tag(d51(81, 'Dissolving ammonium nitrate', 'Аммонийн нитратыг уусгах', 'A student says: "Dissolving ammonium nitrate in water makes the solution hotter, so the process is exothermic." Evaluate this statement.', 'Сурагч: "Аммонийн нитратыг усанд уусгахад уусмал халуу болдог тул процесс экзотермик." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: the solution gets hotter, so the process is exothermic', 'Зөв: уусмал халуу, тиймээс экзотермик'], ['Incorrect: dissolving ammonium nitrate is endothermic, and the solution gets colder', 'Буруу: аммонийн нитратыг уусгах нь эндотермик, уусмал хөрдөг'], ['Correct: there is no energy change', 'Зөв: энергийн өөрчлөлт байхгүй'], ['Incorrect: the process is a chemical change', 'Буруу: процесс химийн өөрчлөлт']],
    'B', 'Judging the energy change by touch in the wrong direction, or confusing dissolving with a reaction.', 'Энергийн өөрчлөлтийг буруу чиглэлд мэдрэх, эсвэл уусгахыг урвалтай андуурах.'), 'evaluate'),

  // 6.1 Physical and chemical changes
  tag(d61(80, 'A chemical change from evidence', 'Нотолгооноос химийн өөрчлөлт', 'Copper carbonate is heated. Its mass falls, and the gas given off turns limewater milky. What can be concluded?', 'Зэсийн карбонатыг халаахад масс нь буурч, гарсан хий шохойн усыг сүүн мэт болгодог. Юу гэж дүгнэх вэ?',
    [['A physical change only', 'Зөвхөн физик өөрчлөлт'], ['A chemical change occurred, and carbon dioxide was produced', 'Химийн өөрчлөлт явагдаж, нүүрсхүчлийн хий үүссэн'], ['Only dissolving took place', 'Зөвхөн уусах явагдсан'], ['Only melting took place', 'Зөвхөн хайлсан']],
    'B', 'Thinking the mass loss alone shows a physical change, without the test for the gas.', 'Масс алдахыг л физик өөрчлөлтийн нотолгоо гэж бодох, хийн шинжилгээг мартах.'), 'apply'),
  tag(d61(81, 'Burning wood', 'Мод шатаах', 'A student says: "Burning wood is a physical change because the wood changes shape into ash." Evaluate this statement.', 'Сурагч: "Мод шатахад хэлбэр нь үнсэн болж өөрчлөгддөг тул физик өөрчлөлт." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: the wood changes shape', 'Зөв: мод хэлбэрээ өөрчилдөг'], ['Incorrect: new substances such as carbon dioxide, water vapour and ash are formed by a chemical reaction', 'Буруу: нүүрсхүчлийн хий, усны уур, үнс гэх мэт шинэ бодис химийн урвалаар үүсдэг'], ['Correct: only melting happens', 'Зөв: зөвхөн хайлдаг'], ['Incorrect: wood cannot burn', 'Буруу: мод шатахгүй']],
    'B', 'Judging a change by its shape rather than by whether new substances form.', 'Өөрчлөлтийг шинэ бодис үүсэхээс биш хэлбэрээр нь үнэлэх.'), 'evaluate'),

  // 6.2 Factors affecting rate and collision theory
  tag(d62(80, 'Powder and lumps', 'Нунтаг ба хэсэг', 'Powdered marble and lumps of marble of the same mass react with the same acid at the same concentration. Which prediction is correct?', 'Ижил масстай нунтаг гантиг ба хэсэг гантиг ижил концентрацтай ижил хүчилтэй урвалд орно. Аль таамаглал зөв вэ?',
    [['Lumps react faster', 'Хэсэг илүү хурдан урвалд орно'], ['Powder reacts faster, because it has a larger surface area', 'Нунтаг илүү хурдан урвалд орно, учир нь гадаргуугийн талбай том'], ['Both react at the same rate', 'Хоёулаа адил хурдтай'], ['Powder reacts slower', 'Нунтаг удаан урвалд орно']],
    'B', 'Thinking a larger lump has more particles reacting at once, so it reacts faster.', 'Том хэсэг нэг зэрэг олон бөөмстэй урвалд орно гэж бодох.'), 'apply'),
  tag(d62(81, 'Catalyst and product amount', 'Катализатор ба бүтээгдэхүүний хэмжээ', 'A student says: "Adding a catalyst increases the amount of product formed." Evaluate this statement.', 'Сурагч: "Катализатор нэмэхэд үүсэх бүтээгдэхүүний хэмжээ нэмэгдэнэ." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: a catalyst increases the yield', 'Зөв: катализатор гарцыг нэмэгдүүлнэ'], ['Incorrect: a catalyst makes the reaction faster but does not change the amount of product formed', 'Буруу: катализатор урвалыг хурдасгана, гэхдээ үүсэх бүтээгдэхүүний хэмжээг өөрчилдөггүй'], ['Correct: a catalyst is used up and gives more product', 'Зөв: катализатор зарцуулагдаж илүү бүтээгдэхүүн өгдөг'], ['Incorrect: a catalyst stops the reaction', 'Буруу: катализатор урвалыг зогсооно']],
    'B', 'Confusing a faster reaction with more product.', 'Хурдан урвалыг илүү бүтээгдэхүүнтэй андуурах.'), 'evaluate'),

  // 6.3 Reversible reactions and equilibrium
  tag(d63(80, 'Temperature and equilibrium', 'Температур ба тэнцвэр', 'The forward reaction is exothermic. What happens to the position of equilibrium when the temperature is increased?', 'Урагш урвал экзотермик. Температурыг нэмэгдүүлэхэд тэнцвэрийн байрлал юу болох вэ?',
    [['It moves to the right', 'Баруун тийш шилжинэ'], ['It moves to the left', 'Зүүн тийш шилжинэ'], ['It stays the same', 'Адил хэвээр байна'], ['The reaction stops', 'Урвал зогсоно']],
    'B', 'Thinking heating always pushes equilibrium towards the products.', 'Халаах нь тэнцвэрийг үргэлж бүтээгдэхүүн рүү түлхдэг гэж бодох.'), 'apply'),
  tag(d63(81, 'Equilibrium concentrations', 'Тэнцвэрийн концентраци', 'A student says: "At equilibrium, the reactants and products are equal in concentration." Evaluate this statement.', 'Сурагч: "Тэнцвэрт байдалд урвалд орогч ба бүтээгдэхүүний концентраци тэнцүү." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: equilibrium means equal concentrations', 'Зөв: тэнцвэр гэдэг нь тэнцүү концентраци'], ['Incorrect: at equilibrium the forward and backward rates are equal, and the concentrations stay constant, but they are not necessarily equal', 'Буруу: тэнцвэрт байдалд урагш ба буцах хурд тэнцүү, концентраци тогтмол боловч заавал тэнцүү биш'], ['Correct: the reaction has stopped', 'Зөв: урвал зогссон'], ['Incorrect: the concentrations keep changing', 'Буруу: концентраци байнга өөрчлөгддөг']],
    'B', 'Mixing up constant concentrations with equal concentrations.', 'Тогтмол концентрацийг тэнцүү концентрацитай андуурах.'), 'evaluate'),

  // 6.4 Redox
  tag(d64(80, 'Oxidising agent', 'Исэлдүүлэгч бодис', 'In the reaction Zn + CuSO₄ → ZnSO₄ + Cu, which substance is the oxidising agent?', 'Zn + CuSO₄ → ZnSO₄ + Cu урвалд аль бодис исэлдүүлэгч вэ?',
    [['Zn', 'Zn'], ['CuSO₄', 'CuSO₄'], ['ZnSO₄', 'ZnSO₄'], ['Cu', 'Cu']],
    'B', 'Choosing the substance that is oxidised, rather than the one that is reduced.', 'Исэлдсэн бодисыг сонгох, бууралтанд орсон бодисыг биш.'), 'apply'),
  tag(d64(81, 'Definition of reduction', 'Бууралтын тодорхойлолт', 'A student says: "Reduction is the gain of oxygen, so reduction always needs oxygen." Evaluate this statement.', 'Сурагч: "Бууралт бол хүчилтөрөгч олж авах, тиймээс бууралт үргэлж хүчилтөрөгч шаарддаг." Энэ мэдэгдлийг үнэлнэ үү.',
    [['Correct: reduction always needs oxygen', 'Зөв: бууралт үргэлж хүчилтөрөгч шаардана'], ['Incorrect: reduction can be the gain of electrons or a fall in oxidation number, so oxygen is not always involved', 'Буруу: бууралт нь электрон авах эсвэл исэлдэлтийн тоо буурах тул хүчилтөрөгч үргэлж оролцохгүй'], ['Correct: reduction is a loss of electrons', 'Зөв: бууралт бол электрон алдах'], ['Incorrect: reduction is an increase in mass', 'Буруу: бууралт бол масс нэмэгдэх']],
    'B', 'Using the oxygen definition alone, which is only one of the ways to define reduction.', 'Зөвхөн хүчилтөрөгчийн тодорхойлолтыг ашиглах, гэтэл бууралтыг тодорхойлох хэд хэдэн арга байдгийг мартах.'), 'evaluate'),
];
