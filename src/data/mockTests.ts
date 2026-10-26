import type { ExamQuestion } from '../types/chemistry';
import { END_MCQ_QUESTIONS } from './mockTestsMcq';
import { CHAPTER1_QUESTIONS } from './mockTestChapter1';

// The four course tests for the Student area: a diagnostic test, a mid-point test, an end-of-course multiple choice test
// and an end-of-course structured test. Questions are written for this course from the 0620 learning outcomes and are
// not copied from the Cambridge tests. Every question names the topic to revise when it is answered wrongly.

export interface MockTest {
  id: string;
  titleEn: string;
  titleMn: string;
  descriptionEn: string;
  descriptionMn: string;
  minutes: number;
  questions: ExamQuestion[];
}

const DIAGNOSTIC_QUESTIONS: ExamQuestion[] = [
  {
    id: 'mt-a-01',
    topicId: 's-9-1',
    chapterId: 'ch-metals',
    syllabusRef: '0620/9.1',
    paper: 'Paper 2',
    totalMarks: 1,
    type: 'mcq',
    titleEn: 'Properties of metals',
    titleMn: 'Металлын шинж чанар',
    questionTextEn: 'Which description fits a metal?',
    questionTextMn: 'Металлд аль тодорхойлолт тохирох вэ?',
    options: [
      { id: 'A', textEn: 'Dull, brittle and a poor conductor', textMn: 'Гялгар бус, эвдрэмтгий, муу дамжуулагч', rationaleEn: 'Metals are shiny and malleable, and they conduct well.', rationaleMn: 'Металл гялгар, нугалах чадвартай, сайн дамжуулна.' },
      { id: 'B', textEn: 'Shiny, malleable and a good conductor', textMn: 'Гялгар, нугалах чадвартай, сайн дамжуулагч', rationaleEn: 'Correct. Delocalised electrons carry charge and the layers can slide.', rationaleMn: 'Зөв. Чөлөөт электрон цахилгаан зөөж, давхрагууд гулсах чадвартай.' },
      { id: 'C', textEn: 'Low melting point and an insulator', textMn: 'Хайлах цэг бага, тусгаарлагч', rationaleEn: 'Most metals have high melting points and conduct electricity.', rationaleMn: 'Ихэнх металл өндөр хайлах цэгтэй, цахилгаан дамжуулна.' },
      { id: 'D', textEn: 'Soft and a gas at room temperature', textMn: 'Зөөлөн, өрөөний температурт хий', rationaleEn: 'Most metals are hard solids at room temperature.', rationaleMn: 'Ихэнх металл өрөөний температурт хатуу бодис.' }
    ],
    correctOption: 'B',
    misconceptionDiagnosisEn: 'Metal properties are confused with non-metal properties.',
    misconceptionDiagnosisMn: 'Металлын шинж чанарыг металл бус бодисын шинж чанартай андуурдаг.',
    remediationTopicId: 's-9-1'
  },
  {
    id: 'mt-a-02',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 2',
    totalMarks: 1,
    type: 'mcq',
    titleEn: 'Gas to liquid',
    titleMn: 'Хийгээс шингэн рүү',
    questionTextEn: 'Which change of state happens when a gas changes into a liquid?',
    questionTextMn: 'Хий шингэн болоход ямар төлөв өөрчлөлт явагдах вэ?',
    options: [
      { id: 'A', textEn: 'Evaporation', textMn: 'Уурших', rationaleEn: 'Evaporation changes a liquid into a gas.', rationaleMn: 'Уурших нь шингэнийг хий болгоно.' },
      { id: 'B', textEn: 'Condensation', textMn: 'Конденсаци', rationaleEn: 'Correct. Condensation changes a gas into a liquid.', rationaleMn: 'Зөв. Конденсаци нь хийг шингэн болгоно.' },
      { id: 'C', textEn: 'Sublimation', textMn: 'Сублимаци', rationaleEn: 'Sublimation changes a solid directly into a gas.', rationaleMn: 'Сублимаци нь хатуу бодисыг шууд хий болгоно.' },
      { id: 'D', textEn: 'Melting', textMn: 'Хайлах', rationaleEn: 'Melting changes a solid into a liquid.', rationaleMn: 'Хайлах нь хатуу бодисыг шингэн болгоно.' }
    ],
    correctOption: 'B',
    misconceptionDiagnosisEn: 'Condensation and evaporation are reversed.',
    misconceptionDiagnosisMn: 'Конденсаци ба уурши хоёрыг буруугаар ойлгодог.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'mt-a-03',
    topicId: 's-7-1',
    chapterId: 'ch-acids-bases',
    syllabusRef: '0620/7.1',
    paper: 'Paper 2',
    totalMarks: 1,
    type: 'mcq',
    titleEn: 'Acid and litmus',
    titleMn: 'Хүчил ба лакмус',
    questionTextEn: 'Which substance turns blue litmus paper red?',
    questionTextMn: 'Аль бодис хөх лакмус цаасыг улаан болгох вэ?',
    options: [
      { id: 'A', textEn: 'Sodium hydroxide solution', textMn: 'Натрийн гидроксидын уусмал', rationaleEn: 'This is an alkali; it turns red litmus blue.', rationaleMn: 'Энэ бол суурь; улаан лакмусыг хөх болгоно.' },
      { id: 'B', textEn: 'Water', textMn: 'Ус', rationaleEn: 'Pure water is neutral and does not change litmus.', rationaleMn: 'Цэвэр ус саармаг; лакмусыг өөрчлөхгүй.' },
      { id: 'C', textEn: 'Hydrochloric acid', textMn: 'Давсны хүчил', rationaleEn: 'Correct. Acids turn blue litmus red.', rationaleMn: 'Зөв. Хүчил хөх лакмусыг улаан болгоно.' },
      { id: 'D', textEn: 'Sodium chloride solution', textMn: 'Натрийн хлоридын уусмал', rationaleEn: 'This is neutral.', rationaleMn: 'Энэ саармаг.' }
    ],
    correctOption: 'C',
    misconceptionDiagnosisEn: 'Alkalis and acids are confused in litmus tests.',
    misconceptionDiagnosisMn: 'Лакмусын туршилтад суурь ба хүчлийг андуурдаг.',
    remediationTopicId: 's-7-1'
  },
  {
    id: 'mt-a-04',
    topicId: 's-2-1',
    chapterId: 'ch-atoms-bonding',
    syllabusRef: '0620/2.1',
    paper: 'Paper 2',
    totalMarks: 1,
    type: 'mcq',
    titleEn: 'Element or compound',
    titleMn: 'Элемент эсвэл нэгдэл',
    questionTextEn: 'Which substance is an element?',
    questionTextMn: 'Аль бодис элемент вэ?',
    options: [
      { id: 'A', textEn: 'Carbon dioxide', textMn: 'Нүүрстөрөгчийн диоксид', rationaleEn: 'This is a compound of carbon and oxygen.', rationaleMn: 'Энэ бол нүүрстөрөгч ба хүчилтөрөгчийн нэгдэл.' },
      { id: 'B', textEn: 'Sodium chloride', textMn: 'Натрийн хлорид', rationaleEn: 'This is a compound of sodium and chlorine.', rationaleMn: 'Энэ бол натри ба хлорын нэгдэл.' },
      { id: 'C', textEn: 'Copper', textMn: 'Зэс', rationaleEn: 'Correct. Copper contains only one type of atom.', rationaleMn: 'Зөв. Зэс зөвхөн нэг төрлийн атомтай.' },
      { id: 'D', textEn: 'Air', textMn: 'Агаар', rationaleEn: 'Air is a mixture of gases.', rationaleMn: 'Агаар бол хийн холимог.' }
    ],
    correctOption: 'C',
    misconceptionDiagnosisEn: 'Mixtures and compounds are confused with elements.',
    misconceptionDiagnosisMn: 'Холимог ба нэгдлийг элементтэй андуурдаг.',
    remediationTopicId: 's-2-1'
  },
  {
    id: 'mt-a-05',
    topicId: 's-8-5',
    chapterId: 'ch-periodic-table',
    syllabusRef: '0620/8.5',
    paper: 'Paper 2',
    totalMarks: 1,
    type: 'mcq',
    titleEn: 'Unreactive gas in air',
    titleMn: 'Агаарт байдаг идэвхгүй хий',
    questionTextEn: 'Which gas in the air is unreactive?',
    questionTextMn: 'Агаар дахь аль хий идэвхгүй вэ?',
    options: [
      { id: 'A', textEn: 'Oxygen', textMn: 'Хүчилтөрөгч', rationaleEn: 'Oxygen is reactive and supports burning.', rationaleMn: 'Хүчилтөрөгч идэвхтэй, шатах үйлдлийг дэмжинэ.' },
      { id: 'B', textEn: 'Argon', textMn: 'Аргон', rationaleEn: 'Correct. Argon is a noble gas and does not react easily.', rationaleMn: 'Зөв. Аргон бол инертийн хий, амархан урвалд ордоггүй.' },
      { id: 'C', textEn: 'Aluminium', textMn: 'Хөнгөн цагаан', rationaleEn: 'Aluminium is a metal, not a gas.', rationaleMn: 'Хөнгөн цагаан бол металл, хий биш.' },
      { id: 'D', textEn: 'Sulfur', textMn: 'Хүхэр', rationaleEn: 'Sulfur is a solid element, not an air gas.', rationaleMn: 'Хүхэр бол хатуу элемент, агаарын хий биш.' }
    ],
    correctOption: 'B',
    misconceptionDiagnosisEn: 'Noble gases are not recognised as unreactive.',
    misconceptionDiagnosisMn: 'Инертийн хийг идэвхгүй гэдгийг таньдаггүй.',
    remediationTopicId: 's-8-5'
  },
  {
    id: 'mt-a-06',
    topicId: 's-12-4',
    chapterId: 'ch-experimental-analysis',
    syllabusRef: '0620/12.4',
    paper: 'Paper 4',
    totalMarks: 3,
    type: 'structured',
    titleEn: 'Getting crystals from a solution',
    titleMn: 'Уусмалаас болор авах',
    questionTextEn: 'A student has a solution of copper(II) sulfate in water. Describe how crystals of copper(II) sulfate can be obtained from the solution.',
    questionTextMn: 'Оюутан усан дахь зэс(II) сульфатын уусмалтай. Уусмалаас зэс(II) сульфатын болор хэрхэн гаргаж авах вэ? Тайлбарла.',
    markScheme: [
      { criterionEn: 'Concentrate', criterionMn: 'Төвлөрүүлэх', pointEn: 'Heat (evaporate) some of the water to make a concentrated, saturated solution', pointMn: 'Усны зарим хэсгийг халааж (ууршуулж) төвлөрсөн, ханасан уусмал гаргана', marks: 1 },
      { criterionEn: 'Crystallise', criterionMn: 'Болор үүсгэх', pointEn: 'Leave the solution to cool so that crystals form', pointMn: 'Уусмалыг хөрүүлж болор үүсгэнэ', marks: 1 },
      { criterionEn: 'Collect', criterionMn: 'Цуглуулах', pointEn: 'Filter off the crystals and dry them', pointMn: 'Болорыг шүүж, хатаана', marks: 1 }
    ],
    modelAnswerEn: 'Heat the solution to evaporate some water until it is saturated. Leave it to cool so crystals form, then filter off the crystals and dry them.',
    modelAnswerMn: 'Уусмалыг халааж, усны зарим хэсгийг ууршуулан ханасан уусмал гаргана. Хөргөж болор үүсгэн, шүүж хатаана.',
    misconceptionDiagnosisEn: 'Evaporating to dryness is confused with crystallisation, which needs a saturated solution to cool.',
    misconceptionDiagnosisMn: 'Бүрэн хатаахыг болор үүсгэхтэй андуурдаг; болор үүсгэхэд ханасан уусмал хөрөх хэрэгтэй.',
    remediationTopicId: 's-12-4'
  },
  {
    id: 'mt-a-07',
    topicId: 'top-8-1',
    chapterId: 'ch-reactions',
    syllabusRef: '0620/6.2',
    paper: 'Paper 4',
    totalMarks: 3,
    type: 'structured',
    titleEn: 'Changing the rate of a reaction',
    titleMn: 'Урвалын хурдыг өөрчлөх',
    questionTextEn: 'Marble chips react with dilute hydrochloric acid. For each change, say whether the rate increases or decreases, and explain why: (a) using larger lumps of marble; (b) using a more concentrated acid; (c) heating the acid.',
    questionTextMn: 'Гантигийн хэсгүүд суларсан давсны хүчилтэй урвалд орно. Өөрчлөлт бүрийн хувьд урвалын хурд нэмэгдэх эсвэл буурах эсэхийг хэлээд, учрыг тайлбарла: (a) том гантиг хэрэглэх; (b) илүү төвлөрсөн хүчил хэрэглэх; (в) хүчлийг халаах.',
    markScheme: [
      { criterionEn: '(a) Larger lumps', criterionMn: '(a) Том хэсэг', pointEn: 'Rate decreases: smaller surface area, so fewer collisions per second', pointMn: 'Хурд буурна: гадаргуугийн талбай бага тул секундэд мөргөлдөөн цөөрнө', marks: 1 },
      { criterionEn: '(b) More concentrated acid', criterionMn: '(b) Илүү төвлөрсөн хүчил', pointEn: 'Rate increases: more particles per unit volume, so more frequent collisions', pointMn: 'Хурд нэмэгдэнэ: нэгж эзлэхүүнд илүү бөөмс байгаа тул мөргөлдөөн нэмэгдэнэ', marks: 1 },
      { criterionEn: '(c) Heating', criterionMn: '(в) Халаалт', pointEn: 'Rate increases: particles have more energy, so more collisions are successful', pointMn: 'Хурд нэмэгдэнэ: бөөмс илүү энергитэй тул амжилттай мөргөлдөөн нэмэгдэнэ', marks: 1 }
    ],
    modelAnswerEn: '(a) Decreases: smaller surface area, fewer collisions per second. (b) Increases: more particles per unit volume, more frequent collisions. (c) Increases: more energetic particles and more successful collisions.',
    modelAnswerMn: '(a) Буурна: гадаргуугийн талбай бага, секундэд мөргөлдөөн цөөрнө. (b) Нэмэгдэнэ: нэгж эзлэхүүнд бөөмс олон, мөргөлдөөн жигд. (в) Нэмэгдэнэ: бөөмс илүү энергитэй, амжилттай мөргөлдөөн нэмэгдэнэ.',
    misconceptionDiagnosisEn: 'Surface area and concentration are both explained as changing the energy of particles.',
    misconceptionDiagnosisMn: 'Гадаргуугийн талбай ба концентрацийг бөөмсийн энергийг өөрчилдөг гэж тайлбарладаг.',
    remediationTopicId: 'top-8-1'
  },
  {
    id: 'mt-a-08',
    topicId: 's-9-1',
    chapterId: 'ch-metals',
    syllabusRef: '0620/9.1',
    paper: 'Paper 4',
    totalMarks: 3,
    type: 'structured',
    titleEn: 'Testing whether a solid is a metal',
    titleMn: 'Хатуу бодис металл мөн эсэхийг шалгах',
    questionTextEn: 'Describe an experiment to find out whether an unknown solid is a metal.',
    questionTextMn: 'Тодорхойгүй хатуу бодис металл мөн эсэхийг олох туршилтыг тайлбарла.',
    markScheme: [
      { criterionEn: 'Appearance', criterionMn: 'Гадаад байдал', pointEn: 'Look for a shiny (lustrous) surface', pointMn: 'Гялгар гадаргууг харна', marks: 1 },
      { criterionEn: 'Malleability', criterionMn: 'Нугалах чадвар', pointEn: 'Try to bend or hammer it: a metal is malleable and does not shatter', pointMn: 'Нугалах эсвэл алхаар цохино: металл нугалагдана, хагардаггүй', marks: 1 },
      { criterionEn: 'Conductivity', criterionMn: 'Дамжуулах чадвар', pointEn: 'Connect it in a circuit with a bulb or meter to test whether it conducts electricity', pointMn: 'Лаа эсвэл хэмжигчтэй хэлхээнд холбож цахилгаан дамжуулахыг шалгана', marks: 1 }
    ],
    modelAnswerEn: 'Check for a shiny surface, try to bend or hammer it, and test whether it conducts electricity in a circuit with a bulb.',
    modelAnswerMn: 'Гялгар гадаргууг шалгаж, нугалах эсвэл цохиж үзнэ, мөн лаатай хэлхээнд цахилгаан дамжуулахыг шалгана.',
    misconceptionDiagnosisEn: 'Reaction with acid is suggested as a test, but not all metals react with acid.',
    misconceptionDiagnosisMn: 'Хүчилтэй урвалд орох туршилтыг санал болгодог, гэвч бүх металл хүчилтэй урвалд ордоггүй.',
    remediationTopicId: 's-9-1'
  }
];

const MIDPOINT_QUESTIONS: ExamQuestion[] = [
  {
    id: 'mt-b-01',
    topicId: 's-6-4',
    chapterId: 'ch-reactions',
    syllabusRef: '0620/6.4',
    paper: 'Paper 4',
    totalMarks: 10,
    type: 'structured',
    titleEn: 'Redox and yield of copper',
    titleMn: 'Redox ба зэсийн гарц',
    questionTextEn: 'Iron reacts with copper(II) sulfate solution: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s). (a) Explain why this is a redox reaction. Name the substance that is reduced and write an ionic equation. [3] (b) 5.6 g of iron is added to excess copper(II) sulfate solution. (i) Calculate the moles of iron (Fe = 56). (ii) Calculate the mass of copper produced (Cu = 64). [3] (c) The actual mass of copper obtained is 5.0 g. Calculate the percentage yield. [2] (d) Suggest one reason why less copper than predicted was obtained. [1] (e) Name the type of reaction in which one metal displaces another from its compound. [1]',
    questionTextMn: 'Төмөр зэс(II) сульфатын уусмалтай урвалд орно: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s). (a) Энэ яагаад redox урвал болохыг тайлбарла. Бууралтад орсон бодисыг нэрлээд ионы тэгшитгэл бич. [3] (b) 5.6 г төмрийг илүүдэл зэс(II) сульфатын уусмалд хийв. (i) Төмрийн молийг тооцоол (Fe = 56). (ii) Үүссэн зэсийн массыг тооцоол (Cu = 64). [3] (c) Бодит гаргасан зэсийн масс 5.0 г. Гарцыг (хувиар) тооцоол. [2] (d) Урьдчилан тооцсоноос бага зэс гарсны нэг шалтгааныг бич. [1] (e) Нэг металл нь нэгдэлээс нөгөө металлыг түлхэн гаргах урвалыг юу гэх вэ? [1]',
    markScheme: [
      { criterionEn: '(a) Redox', criterionMn: '(a) Redox', pointEn: 'Copper(II) ions are reduced: they gain electrons', pointMn: 'Зэс(II) ион бууралтад орно: электрон авна', marks: 1 },
      { criterionEn: '(a) Redox', criterionMn: '(a) Redox', pointEn: 'Iron is oxidised: it loses electrons, so electrons are transferred', pointMn: 'Төмөр исэлдэнэ: электрон алдана, тиймээс электрон шилжинэ', marks: 1 },
      { criterionEn: '(a) Ionic equation', criterionMn: '(a) Ионы тэгшитгэл', pointEn: 'Fe + Cu²⁺ → Fe²⁺ + Cu', pointMn: 'Fe + Cu²⁺ → Fe²⁺ + Cu', marks: 1 },
      { criterionEn: '(b)(i) Moles of iron', criterionMn: '(b)(i) Төмрийн мол', pointEn: 'Moles of Fe = 5.6 ÷ 56 = 0.1 mol', pointMn: 'Fe-ийн мол = 5.6 ÷ 56 = 0.1 моль', marks: 1 },
      { criterionEn: '(b)(ii) Moles of copper', criterionMn: '(b)(ii) Зэсийн мол', pointEn: 'The mole ratio Fe : Cu is 1 : 1, so 0.1 mol of Cu', pointMn: 'Fe : Cu моль харьцаа 1 : 1 тул 0.1 моль Cu', marks: 1 },
      { criterionEn: '(b)(ii) Mass of copper', criterionMn: '(b)(ii) Зэсийн масс', pointEn: 'Mass = 0.1 × 64 = 6.4 g', pointMn: 'Масс = 0.1 × 64 = 6.4 г', marks: 1 },
      { criterionEn: '(c) Percentage yield', criterionMn: '(c) Гарц', pointEn: 'Percentage yield = actual ÷ predicted × 100 = 5.0 ÷ 6.4 × 100', pointMn: 'Гарц = бодит ÷ тооцоолсон × 100 = 5.0 ÷ 6.4 × 100', marks: 1 },
      { criterionEn: '(c) Percentage yield', criterionMn: '(c) Гарц', pointEn: 'Answer: 78% (78.1%)', pointMn: 'Хариу: 78% (78.1%)', marks: 1 },
      { criterionEn: '(d) Reason', criterionMn: '(d) Шалтгаан', pointEn: 'Any one: copper lost during filtering or transfer, the reaction was not complete, or the iron was impure', pointMn: 'Аль нэг: шүүх ба шилжүүлэх явцад зэс алдагдсан, урвал бүрэн дуусаагүй, эсвэл төмөр цэвэр бус байсан', marks: 1 },
      { criterionEn: '(e) Type of reaction', criterionMn: '(e) Урвалын төрөл', pointEn: 'Displacement', pointMn: 'Түлхэх (displacement) урвал', marks: 1 }
    ],
    modelAnswerEn: '(a) Cu²⁺ is reduced (gains electrons); Fe is oxidised (loses electrons). Fe + Cu²⁺ → Fe²⁺ + Cu. (b) (i) 0.1 mol; (ii) 0.1 mol Cu, 6.4 g. (c) 78%. (d) e.g. copper lost on filtering. (e) Displacement.',
    modelAnswerMn: '(a) Cu²⁺ бууралтад орно (электрон авна); Fe исэлдэнэ (электрон алдана). Fe + Cu²⁺ → Fe²⁺ + Cu. (b) (i) 0.1 моль; (ii) 0.1 моль Cu, 6.4 г. (c) 78%. (d) жишээ нь шүүх явцад зэс алдагдсан. (e) Түлхэх урвал.',
    misconceptionDiagnosisEn: 'Which species is reduced is confused with the metal that loses electrons; percentage yield uses the wrong denominator.',
    misconceptionDiagnosisMn: 'Аль бөөм бууралтад орох вэ гэдгийг электрон алдах металлтай андуурдаг; гарцын хуваарьт буруу тоо авдаг.',
    remediationTopicId: 's-6-4'
  },
  {
    id: 'mt-b-02',
    topicId: 'top-8-1',
    chapterId: 'ch-reactions',
    syllabusRef: '0620/6.2',
    paper: 'Paper 4',
    totalMarks: 5,
    type: 'structured',
    titleEn: 'Reading a mass-loss table',
    titleMn: 'Массын алдагдлын хүснэгт унших',
    questionTextEn: 'Marble reacts with excess dilute hydrochloric acid. The mass lost (carbon dioxide escaping) is measured: time 0 s, 20 s, 40 s, 60 s, 80 s, 100 s; mass lost 0.00 g, 0.25 g, 0.37 g, 0.42 g, 0.44 g, 0.44 g. (a) At what time did the reaction stop? [1] (b) Explain why the rate decreases over time. [2] (c) The experiment is repeated with the same volume of more dilute acid and excess marble. Describe two differences in the graph. [2]',
    questionTextMn: 'Гантиг илүүдэл суларсан давсны хүчилтэй урвалд орно. Алдагдсан масс (гарсан нүүрстөрөгчийн диоксид) хэмжигдэв: хугацаа 0 с, 20 с, 40 с, 60 с, 80 с, 100 с; алдсан масс 0.00 г, 0.25 г, 0.37 г, 0.42 г, 0.44 г, 0.44 г. (a) Урвал хэдэн секундэд зогсох вэ? [1] (b) Урвалын хурд цаг хугацааны явцад яагаад буурдаг вэ? [2] (c) Ижил эзлэхүүнтэй, илүү суларсан хүчлээр, илүүдэл гантигтай туршилтыг давтав. Графикийн хоёр ялгааг тайлбарла. [2]',
    markScheme: [
      { criterionEn: '(a) Time', criterionMn: '(a) Хугацаа', pointEn: '80 s (the mass stops changing)', pointMn: '80 с (масс өөрчлөгдөхөө больдог)', marks: 1 },
      { criterionEn: '(b) Concentration', criterionMn: '(b) Концентраци', pointEn: 'The acid concentration falls as it is used up', pointMn: 'Хүчлийн концентраци хэрэглэгдэх тусам буурна', marks: 1 },
      { criterionEn: '(b) Collisions', criterionMn: '(b) Мөргөлдөөн', pointEn: 'So there are fewer collisions per second, and the rate slows', pointMn: 'Тиймээс секундэд мөргөлдөөн цөөрч, хурд удааширна', marks: 1 },
      { criterionEn: '(c) Initial gradient', criterionMn: '(c) Эхний налуу', pointEn: 'The curve is less steep at the start, so the initial rate is slower', pointMn: 'Эхэнд муруй бага налуутай, эхний хурд удаан', marks: 1 },
      { criterionEn: '(c) Final mass', criterionMn: '(c) Эцсийн масс', pointEn: 'The final mass lost is smaller, because there is less acid to react', pointMn: 'Эцсийн алдагдсан масс бага, учир нь урвалд орох хүчил цөөн', marks: 1 }
    ],
    modelAnswerEn: '(a) 80 s. (b) Acid is used up, so the concentration falls and collisions become less frequent. (c) Less steep at the start; smaller final mass loss because there is less acid.',
    modelAnswerMn: '(a) 80 с. (b) Хүчил зарцуулагдаж концентраци буурч, мөргөлдөөн ховордог. (c) Эхэнд бага налуу; хүчил цөөн тул эцсийн алдагдсан масс бага.',
    misconceptionDiagnosisEn: 'The reaction is said to stop when the line stops rising, but the fall in rate is not linked to concentration.',
    misconceptionDiagnosisMn: 'Шугам өсөхөө больсон үед урвал зогсдог гэж бодох, мөн хурд буурахыг концентрацитай холбохгүй.',
    remediationTopicId: 'top-8-1'
  },
  {
    id: 'mt-b-03',
    topicId: 's-5-1',
    chapterId: 'ch-energetics',
    syllabusRef: '0620/5.1',
    paper: 'Paper 4',
    totalMarks: 8,
    type: 'structured',
    titleEn: 'Energy change from bond energies',
    titleMn: 'Холбооны энергиэс энергийн өөрчлөлт',
    questionTextEn: 'Hydrogen reacts with chlorine: H₂(g) + Cl₂(g) → 2HCl(g). Bond energies: H–H = 436, Cl–Cl = 242, H–Cl = 431 kJ/mol. (a) Calculate the energy needed to break the bonds in 1 mol of H₂ and 1 mol of Cl₂. [1] (b) Calculate the energy released when the H–Cl bonds form in 2 mol of HCl. [1] (c) Calculate the energy change ΔH and state whether the reaction is exothermic or endothermic. [3] (d) Limestone decomposes: CaCO₃ → CaO + CO₂ (endothermic). State how the energy is supplied. [1] (e) The reaction is run in an open container and CO₂ escapes. Explain why the reaction does not reach equilibrium. [2]',
    questionTextMn: 'Устөрөгч хлортой урвалд орно: H₂(g) + Cl₂(g) → 2HCl(g). Холбооны энерги: H–H = 436, Cl–Cl = 242, H–Cl = 431 кДж/моль. (a) 1 моль H₂ ба 1 моль Cl₂-ийн холбоог таслахад шаардагдах энергийг тооцоол. [1] (b) 2 моль HCl-ийн H–Cl холбоо үүсэхэд ялгарах энергийг тооцоол. [1] (c) Энергийн өөрчлөлт ΔH-г тооцоолж, урвал экзотерм эсвэл эндотерм эсэхийг хэл. [3] (d) Шохойн чулуу задарна: CaCO₃ → CaO + CO₂ (эндотерм). Энергийг хэрхэн нийлүүлдэг вэ? [1] (e) Урвалыг нээлттэй саванд явуулж, CO₂ гарч байна. Урвал яагаад тэнцвэрт хүрэхгүй байгааг тайлбарла. [2]',
    markScheme: [
      { criterionEn: '(a) Breaking bonds', criterionMn: '(a) Холбоо таслах', pointEn: 'Energy to break bonds = 436 + 242 = 678 kJ', pointMn: 'Холбоо таслах энерги = 436 + 242 = 678 кДж', marks: 1 },
      { criterionEn: '(b) Forming bonds', criterionMn: '(b) Холбоо үүсгэх', pointEn: 'Energy released = 2 × 431 = 862 kJ', pointMn: 'Ялгарах энерги = 2 × 431 = 862 кДж', marks: 1 },
      { criterionEn: '(c) ΔH', criterionMn: '(c) ΔH', pointEn: 'ΔH = 678 − 862', pointMn: 'ΔH = 678 − 862', marks: 1 },
      { criterionEn: '(c) ΔH', criterionMn: '(c) ΔH', pointEn: 'ΔH = −184 kJ/mol', pointMn: 'ΔH = −184 кДж/моль', marks: 1 },
      { criterionEn: '(c) Type', criterionMn: '(c) Төрөл', pointEn: 'Exothermic, because the energy change is negative (energy is given out)', pointMn: 'Экзотерм, учир нь энергийн өөрчлөлт сөрөг (энерги ялгарна)', marks: 1 },
      { criterionEn: '(d) Energy supply', criterionMn: '(d) Энергийн эх үүсвэр', pointEn: 'The limestone is heated (energy is supplied as heat)', pointMn: 'Шохойн чулууг халаана (энерги дулаанаар нийлүүлнэ)', marks: 1 },
      { criterionEn: '(e) CO₂ escapes', criterionMn: '(e) CO₂ гарна', pointEn: 'CO₂ escapes from the open container', pointMn: 'CO₂ нээлттэй саванаас гарна', marks: 1 },
      { criterionEn: '(e) Reverse reaction', criterionMn: '(e) Урвуу урвал', pointEn: 'So the reverse reaction cannot happen, and equilibrium is not reached', pointMn: 'Тиймээс урвуу урвал явахгүй, тэнцвэрт хүрэхгүй', marks: 1 }
    ],
    modelAnswerEn: '(a) 678 kJ. (b) 862 kJ. (c) ΔH = 678 − 862 = −184 kJ/mol; exothermic. (d) By heating. (e) CO₂ escapes, so the reverse reaction cannot take place.',
    modelAnswerMn: '(a) 678 кДж. (b) 862 кДж. (c) ΔH = 678 − 862 = −184 кДж/моль; экзотерм. (d) Халаалтаар. (e) CO₂ гарч, урвуу урвал явж чадахгүй.',
    misconceptionDiagnosisEn: 'Energy taken in and energy given out are subtracted the wrong way round.',
    misconceptionDiagnosisMn: 'Авсан ба ялгарсан энергийг буруу дарааллаар хасдаг.',
    remediationTopicId: 's-5-1'
  },
  {
    id: 'mt-b-04',
    topicId: 's-12-2',
    chapterId: 'ch-experimental-analysis',
    syllabusRef: '0620/12.2',
    paper: 'Paper 4',
    totalMarks: 6,
    type: 'structured',
    titleEn: 'Titration and making a salt',
    titleMn: 'Титрлэл ба давс бэлтгэх',
    questionTextEn: 'A student uses titration to make sodium sulfate from sodium hydroxide and dilute sulfuric acid. (a) Which alkali should be placed in the flask? [1] (b) Name a suitable indicator. [1] (c) Why was the indicator left out when the titration was repeated? [1] (d) Describe how crystals of sodium sulfate can be obtained from the solution. [3]',
    questionTextMn: 'Оюутан натрийн гидроксид ба суларсан хүхрийн хүчлээс титрлэлээр натрийн сульфат бэлтгэв. (a) Колбонд аль суурь хийх вэ? [1] (b) Тохирох индикатор нэрлэ. [1] (c) Титрлэлийг давтахад индикатор яагаад хэрэглээгүй вэ? [1] (d) Уусмалаас натрийн сульфатын болор хэрхэн гаргаж авах вэ? Тайлбарла. [3]',
    markScheme: [
      { criterionEn: '(a) Alkali', criterionMn: '(a) Суурь', pointEn: 'Sodium hydroxide solution', pointMn: 'Натрийн гидроксидын уусмал', marks: 1 },
      { criterionEn: '(b) Indicator', criterionMn: '(b) Индикатор', pointEn: 'Methyl orange or phenolphthalein', pointMn: 'Метил улбар шар эсвэл фенолфталеин', marks: 1 },
      { criterionEn: '(c) Reason', criterionMn: '(c) Шалтгаан', pointEn: 'So that the salt solution is not contaminated by the indicator', pointMn: 'Давсны уусмалд индикатор холилдохгүйн тулд', marks: 1 },
      { criterionEn: '(d) Concentrate', criterionMn: '(d) Төвлөрүүлэх', pointEn: 'Heat (evaporate) the solution to make it saturated', pointMn: 'Уусмалыг халааж (ууршуулж) ханасан болгоно', marks: 1 },
      { criterionEn: '(d) Crystallise', criterionMn: '(d) Болор үүсгэх', pointEn: 'Cool it so crystals form', pointMn: 'Хөргөж болор үүсгэнэ', marks: 1 },
      { criterionEn: '(d) Collect', criterionMn: '(d) Цуглуулах', pointEn: 'Filter off the crystals and dry them', pointMn: 'Болорыг шүүж, хатаана', marks: 1 }
    ],
    modelAnswerEn: '(a) Sodium hydroxide. (b) Methyl orange or phenolphthalein. (c) To keep the salt solution free of indicator. (d) Evaporate to saturation, cool to crystallise, filter and dry.',
    modelAnswerMn: '(a) Натрийн гидроксид. (b) Метил улбар шар эсвэл фенолфталеин. (c) Давсны уусмалыг индикатороос цэвэр байлгахын тулд. (d) Ууршуулж ханасан болгоно, хөргөж болор үүсгэнэ, шүүж хатаана.',
    misconceptionDiagnosisEn: 'Evaporating to dryness is used instead of saturating and cooling the solution.',
    misconceptionDiagnosisMn: 'Уусмалыг ханасан болгож хөргөхийн оронд бүрэн хатаадаг.',
    remediationTopicId: 's-12-2'
  },
  {
    id: 'mt-b-05',
    topicId: 's-2-5',
    chapterId: 'ch-atoms-bonding',
    syllabusRef: '0620/2.5',
    paper: 'Paper 4',
    totalMarks: 6,
    type: 'structured',
    titleEn: 'Ions, covalent bonds and isotopes',
    titleMn: 'Ион, ковалент холбоо ба изотоп',
    questionTextEn: '(a) Define a cation. [1] (b) Describe how sodium and chlorine form sodium chloride. [2] (c) Explain how a covalent bond forms between two oxygen atoms in an O₂ molecule. [2] (d) Define isotopes. [1]',
    questionTextMn: '(a) Катионыг тодорхойлоорой. [1] (b) Натри ба хлор натрийн хлорид хэрхэн үүсгэхийг тайлбарла. [2] (c) O₂ молекул дахь хоёр хүчилтөрөгчийн атомын хооронд ковалент холбоо хэрхэн үүсэхийг тайлбарла. [2] (d) Изотопыг тодорхойлоорой. [1]',
    markScheme: [
      { criterionEn: '(a) Cation', criterionMn: '(a) Катион', pointEn: 'A positive ion formed when an atom loses electrons', pointMn: 'Атом электрон алдахад үүсэх эерэг ион', marks: 1 },
      { criterionEn: '(b) Electron transfer', criterionMn: '(b) Электрон шилжилт', pointEn: 'Sodium transfers one electron to chlorine', pointMn: 'Натри нэг электроныг хлорт шилжүүлнэ', marks: 1 },
      { criterionEn: '(b) Ionic bond', criterionMn: '(b) Ионы холбоо', pointEn: 'The oppositely charged ions attract each other (ionic bond)', pointMn: 'Эсрэг цэнэгтэй ионууд бие биенээ татна (ионы холбоо)', marks: 1 },
      { criterionEn: '(c) Shared pairs', criterionMn: '(c) Хамтарсан хос', pointEn: 'Each oxygen atom needs two more electrons, so two pairs are shared', pointMn: 'Хүчилтөрөгчийн атом бүр хоёр электрон дутуу, тиймээс хоёр хос хамтран ашиглана', marks: 1 },
      { criterionEn: '(c) Covalent bond', criterionMn: '(c) Ковалент холбоо', pointEn: 'The shared pairs are attracted to both nuclei, forming a covalent bond', pointMn: 'Хамтарсан хос хоёр цөмд татагдаж, ковалент холбоо үүсгэнэ', marks: 1 },
      { criterionEn: '(d) Isotopes', criterionMn: '(d) Изотоп', pointEn: 'Atoms of the same element with the same number of protons but different numbers of neutrons', pointMn: 'Ижил протоны тоотой, нейтроны тоо өөр ижил элементийн атомууд', marks: 1 }
    ],
    modelAnswerEn: '(a) A positive ion formed by losing electrons. (b) Sodium gives one electron to chlorine; the ions attract. (c) Two shared pairs of electrons bond the atoms. (d) Same protons, different neutrons.',
    modelAnswerMn: '(a) Электрон алдаж үүссэн эерэг ион. (b) Натри хлорт нэг электрон өгнө; ионууд татагдана. (c) Хоёр хамтарсан хос электрон атомуудыг холбоно. (d) Ижил протон, өөр нейтрон.',
    misconceptionDiagnosisEn: 'Ionic and covalent bonding are described with the same wording.',
    misconceptionDiagnosisMn: 'Ионы ба ковалент холбоог адил үгээр тайлбарладаг.',
    remediationTopicId: 's-2-5'
  }
];

const END_STRUCTURED_QUESTIONS: ExamQuestion[] = [
  {
    id: 'mt-d-01',
    topicId: 's-8-2',
    chapterId: 'ch-periodic-table',
    syllabusRef: '0620/8.2',
    paper: 'Paper 4',
    totalMarks: 8,
    type: 'structured',
    titleEn: 'Group I metals and water',
    titleMn: 'I бүлгийн металл ба ус',
    questionTextEn: 'Sodium, potassium and lithium are in Group I. (a) Describe what is seen when a small piece of sodium is added to water. [2] (b) Explain why potassium reacts more vigorously than sodium. [2] (c) Write a balanced symbol equation for potassium reacting with water. [2] (d) Explain why the solution turns pink when phenolphthalein is added to the product. [2]',
    questionTextMn: 'Натри, калий, литий нь I бүлэгт багтана. (a) Натрийн жижиг хэсгийг усанд хийхэд юу харагдахыг тайлбарла. [2] (b) Калий натригаас яагаад илүү хүчтэй урвалд орох вэ? Тайлбарла. [2] (c) Калий устай урвалд орох тэнцвэржсэн томьёоны тэгшитгэлийг бич. [2] (d) Үүссэн уусмалд фенолфталеин нэмэхэд яагаад ягаан болох вэ? Тайлбарла. [2]',
    markScheme: [
      { criterionEn: '(a) Observation', criterionMn: '(a) Ажиглалт', pointEn: 'The sodium moves about on the surface and fizzes', pointMn: 'Натри гадаргуу дээр хөдөлж, бужигнана', marks: 1 },
      { criterionEn: '(a) Gas', criterionMn: '(a) Хий', pointEn: 'A gas (hydrogen) is given off and the sodium melts into a ball', pointMn: 'Хий (устөрөгч) ялгарч, натри бөмбөлөг болон хайлна', marks: 1 },
      { criterionEn: '(b) Outer electron', criterionMn: '(b) Гаднах электрон', pointEn: 'The outer electron of potassium is further from the nucleus', pointMn: 'Калийн гаднах электрон цөмөөс илүү хол байна', marks: 1 },
      { criterionEn: '(b) Ease of loss', criterionMn: '(b) Алдах амар байдал', pointEn: 'It is lost more easily (weaker attraction), so it reacts faster', pointMn: 'Амар алдагдана (сул татах хүч), тиймээс хурдан урвалд орно', marks: 1 },
      { criterionEn: '(c) Products', criterionMn: '(c) Бүтээгдэхүүн', pointEn: 'Correct products: KOH and H₂', pointMn: 'Зөв бүтээгдэхүүн: KOH ба H₂', marks: 1 },
      { criterionEn: '(c) Balancing', criterionMn: '(c) Тэнцвэржүүлэлт', pointEn: '2K + 2H₂O → 2KOH + H₂ (balanced)', pointMn: '2K + 2H₂O → 2KOH + H₂ (тэнцвэржсэн)', marks: 1 },
      { criterionEn: '(d) Alkali', criterionMn: '(d) Суурь', pointEn: 'The solution is alkaline because it contains OH⁻ ions', pointMn: 'Уусмал суурьт, учир нь OH⁻ ион агуулна', marks: 1 },
      { criterionEn: '(d) Indicator', criterionMn: '(d) Индикатор', pointEn: 'Phenolphthalein turns pink in an alkali', pointMn: 'Фенолфталеин суурьт ягаан болно', marks: 1 }
    ],
    modelAnswerEn: '(a) Sodium moves on the water and fizzes; hydrogen is given off. (b) Outer electron is further from the nucleus and is lost more easily. (c) 2K + 2H₂O → 2KOH + H₂. (d) An alkali (OH⁻) is formed; phenolphthalein turns pink.',
    modelAnswerMn: '(a) Натри ус дээр хөдөлж бужигнана; устөрөгч ялгарна. (b) Гаднах электрон цөмөөс хол, амар алдагдана. (c) 2K + 2H₂O → 2KOH + H₂. (d) Суурь (OH⁻) үүснэ; фенолфталеин ягаан болно.',
    misconceptionDiagnosisEn: 'Reactivity down Group I is said to decrease because the atoms get heavier.',
    misconceptionDiagnosisMn: 'I бүлгээр доош идэвх буурдаг гэж атом хүндэрдэг гэсэн шалтгаанаар тайлбарладаг.',
    remediationTopicId: 's-8-2'
  },
  {
    id: 'mt-d-02',
    topicId: 's-10-1',
    chapterId: 'ch-environment',
    syllabusRef: '0620/10.1',
    paper: 'Paper 4',
    totalMarks: 8,
    type: 'structured',
    titleEn: 'Water: tests and treatment',
    titleMn: 'Ус: туршилт ба цэвэршүүлэлт',
    questionTextEn: '(a) Describe a test to show that water is present, with the result. [2] (b) Describe how tap water is made safe to drink. [2] (c) Describe a test for chloride ions, with the result. [2] (d) Explain how distillation produces pure water. [2]',
    questionTextMn: '(a) Ус байгааг харуулах туршилтыг үр дүнгийн хамт тайлбарла. [2] (b) Усны хоолойн усыг уухад аюулгүй болгох аргыг тайлбарла. [2] (c) Хлорын ионыг илрүүлэх туршилтыг үр дүнгийн хамт тайлбарла. [2] (d) Нэрэлтээр цэвэр ус хэрхэн гарч байгааг тайлбарла. [2]',
    markScheme: [
      { criterionEn: '(a) Test', criterionMn: '(a) Туршилт', pointEn: 'Add anhydrous copper(II) sulfate', pointMn: 'Услаг бус зэс(II) сульфат нэмнэ', marks: 1 },
      { criterionEn: '(a) Result', criterionMn: '(a) Үр дүн', pointEn: 'It turns from white to blue if water is present', pointMn: 'Ус байвал цагаанаас цэнхэр болно', marks: 1 },
      { criterionEn: '(b) Filtration', criterionMn: '(b) Шүүлт', pointEn: 'Filtration removes insoluble solids', pointMn: 'Шүүлтээр уусахгүй хатуу хэсгийг авна', marks: 1 },
      { criterionEn: '(b) Sterilising', criterionMn: '(b) Ариутгал', pointEn: 'Chlorine kills microorganisms', pointMn: 'Хлор бичил биетийг устгана', marks: 1 },
      { criterionEn: '(c) Test', criterionMn: '(c) Туршилт', pointEn: 'Add dilute nitric acid, then aqueous silver nitrate', pointMn: 'Суларсан азотын хүчил, дараа нь мөнгөн нитратын уусмал нэмнэ', marks: 1 },
      { criterionEn: '(c) Result', criterionMn: '(c) Үр дүн', pointEn: 'A white precipitate shows chloride ions are present', pointMn: 'Цагаан утуурмаг нь хлорын ион байгааг харуулна', marks: 1 },
      { criterionEn: '(d) Evaporation', criterionMn: '(d) Ууршилт', pointEn: 'The water evaporates, leaving the dissolved substances behind', pointMn: 'Ус ууршиж, уусмал дахь бодисыг үлдээнэ', marks: 1 },
      { criterionEn: '(d) Condensation', criterionMn: '(d) Конденсаци', pointEn: 'The vapour condenses back into pure liquid water', pointMn: 'Уур конденсацлаад цэвэр шингэн ус болно', marks: 1 }
    ],
    modelAnswerEn: '(a) Anhydrous copper(II) sulfate turns from white to blue. (b) Filter, then add chlorine to kill microorganisms. (c) Dilute nitric acid, then silver nitrate: white precipitate. (d) Water evaporates and condenses, leaving dissolved solids behind.',
    modelAnswerMn: '(a) Услаг бус зэс(II) сульфат цагаанаас цэнхэр болно. (b) Шүүгээд, хлор нэмж бичил биетийг устгана. (c) Суларсан азотын хүчил, дараа нь мөнгөн нитрат: цагаан утуурмаг. (d) Ус ууршаад конденсацлагдаж, уусмал дахь бодисыг үлдээнэ.',
    misconceptionDiagnosisEn: 'Filtration and distillation are confused; the chloride test omits the acid.',
    misconceptionDiagnosisMn: 'Шүүлт ба нэрэлтийг андуурдаг; хлорын туршилтанд хүчлийг орхигдуулдаг.',
    remediationTopicId: 's-10-1'
  },
  {
    id: 'mt-d-03',
    topicId: 's-11-6',
    chapterId: 'ch-organic',
    syllabusRef: '0620/11.6',
    paper: 'Paper 4',
    totalMarks: 8,
    type: 'structured',
    titleEn: 'Making ethanol',
    titleMn: 'Этанол гаргах',
    questionTextEn: 'Ethanol can be made by fermentation of glucose or by hydration of ethene. (a) Give two conditions needed for fermentation. [2] (b) Write a word equation for the hydration of ethene. [1] (c) Give one advantage and one disadvantage of hydration compared with fermentation. [2] (d) Name a suitable oxidising agent to convert ethanol into ethanoic acid. [1] (e) Name the ester formed when ethanol reacts with ethanoic acid. [1] (f) Give the molecular formula of ethanol. [1]',
    questionTextMn: 'Этанолыг глюкозыг исгэх буюу этенийг гидратжуулах замаар гаргаж болно. (a) Исгэлтэд шаардлагатай хоёр нөхцөлийг бич. [2] (b) Этенийг гидратжуулах урвалын үгэн тэгшитгэлийг бич. [1] (c) Исгэлттэй харьцуулахад гидратжуулалтын нэг давуу ба нэг сул талыг бич. [2] (d) Этанолыг этанойн хүчил болгох тохирох исэлдүүлэгчийг нэрлэ. [1] (e) Этанол ба этанойн хүчлийн урвалаар үүсэх эфирийг нэрлэ. [1] (f) Этанолын молекул томьёог бич. [1]',
    markScheme: [
      { criterionEn: '(a) Catalyst', criterionMn: '(a) Катализатор', pointEn: 'Yeast (enzymes in yeast) is used', pointMn: 'Исгэгч (ачаалдаг) хамаарах бичил биетийн фермент хэрэглэнэ', marks: 1 },
      { criterionEn: '(a) Conditions', criterionMn: '(a) Нөхцөл', pointEn: 'No oxygen (anaerobic conditions)', pointMn: 'Хүчилтөрөгчгүй (анаэроб) нөхцөл', marks: 1 },
      { criterionEn: '(b) Equation', criterionMn: '(b) Тэгшитгэл', pointEn: 'ethene + water → ethanol (with a catalyst)', pointMn: 'этен + ус → этанол (катализатортойгоор)', marks: 1 },
      { criterionEn: '(c) Advantage', criterionMn: '(c) Давуу тал', pointEn: 'Faster reaction, or a purer product, or continuous production', pointMn: 'Илүү хурдан урвал, илүү цэвэр бүтээгдэхүүн, эсвэл тасралтгүй үйлдвэрлэл', marks: 1 },
      { criterionEn: '(c) Disadvantage', criterionMn: '(c) Сул тал', pointEn: 'It uses non-renewable crude oil and needs high temperature and pressure', pointMn: 'Сэргээгдэхгүй хүйтэн тос хэрэглэж, өндөр температур, даралт шаарддаг', marks: 1 },
      { criterionEn: '(d) Oxidising agent', criterionMn: '(d) Исэлдүүлэгч', pointEn: 'Acidified potassium dichromate(VI)', pointMn: 'Хүчиллэгжсэн калийн дихромат(VI)', marks: 1 },
      { criterionEn: '(e) Ester', criterionMn: '(e) Эфир', pointEn: 'Ethyl ethanoate', pointMn: 'Этил этаноат', marks: 1 },
      { criterionEn: '(f) Formula', criterionMn: '(f) Томьёо', pointEn: 'C₂H₅OH (or C₂H₆O)', pointMn: 'C₂H₅OH (эсвэл C₂H₆O)', marks: 1 }
    ],
    modelAnswerEn: '(a) Yeast; no oxygen. (b) ethene + water → ethanol. (c) Faster or purer; uses crude oil (non-renewable). (d) Acidified potassium dichromate(VI). (e) Ethyl ethanoate. (f) C₂H₅OH.',
    modelAnswerMn: '(a) Исгэгч; хүчилтөрөгчгүй. (b) этен + ус → этанол. (c) Илүү хурдан эсвэл цэвэр; сэргээгдэхгүй тос хэрэглэнэ. (d) Хүчиллэгжсэн калийн дихромат(VI). (e) Этил этаноат. (f) C₂H₅OH.',
    misconceptionDiagnosisEn: 'Fermentation and hydration are not distinguished by their conditions and raw materials.',
    misconceptionDiagnosisMn: 'Исгэлт ба гидратжуулалтыг нөхцөл, түүхий эдээр нь ялгадаггүй.',
    remediationTopicId: 's-11-6'
  },
  {
    id: 'mt-d-04',
    topicId: 's-9-6',
    chapterId: 'ch-metals',
    syllabusRef: '0620/9.6',
    paper: 'Paper 4',
    totalMarks: 8,
    type: 'structured',
    titleEn: 'Extraction and purification of copper',
    titleMn: 'Зэсийг олборлох ба цэвэршүүлэх',
    questionTextEn: 'Copper is made from copper(II) sulfate solution by displacement with iron. (a) Write an ionic equation for the displacement. [2] (b) Name the electrode made of impure copper when copper is purified by electrolysis. [1] (c) Describe what happens at each electrode during this purification. [2] (d) Iron is extracted from haematite in a blast furnace: write a balanced equation for the reduction of iron(III) oxide by carbon monoxide. [2] (e) State the type of reaction in part (a). [1]',
    questionTextMn: 'Зэсийг зэс(II) сульфатын уусмалаас төмрөөр түлхэх замаар гаргана. (a) Түлхэх урвалын ионы тэгшитгэлийг бич. [2] (b) Бохир зэсийг электролизээр цэвэршүүлэхэд ямар электрод бохир зэсээс хийгдсэн вэ? [1] (c) Энэ цэвэршүүлэлтийн явцад электрод бүр дээр юу болохыг тайлбарла. [2] (d) Тогтоо-урвалын төмрийн(III) исэлийг CO-оор бууруулах тэнцвэржсэн тэгшитгэлийг бич. [2] (e) (a) хэсгийн урвалын төрлийг нэрлэ. [1]',
    markScheme: [
      { criterionEn: '(a) Species', criterionMn: '(a) Бөөмс', pointEn: 'Fe + Cu²⁺ → Fe²⁺ + Cu with the correct species', pointMn: 'Fe + Cu²⁺ → Fe²⁺ + Cu зөв бөөмтэй', marks: 1 },
      { criterionEn: '(a) Balancing', criterionMn: '(a) Тэнцвэржүүлэлт', pointEn: 'Charges and atoms balance', pointMn: 'Цэнэг ба атом тэнцнэ', marks: 1 },
      { criterionEn: '(b) Anode', criterionMn: '(b) Анод', pointEn: 'The impure copper is the anode', pointMn: 'Бохир зэс анод болно', marks: 1 },
      { criterionEn: '(c) Anode', criterionMn: '(c) Анод', pointEn: 'Copper dissolves at the anode', pointMn: 'Анод дээр зэс уусна', marks: 1 },
      { criterionEn: '(c) Cathode', criterionMn: '(c) Катод', pointEn: 'Pure copper is deposited at the cathode', pointMn: 'Катод дээр цэвэр зэс шингэнэ', marks: 1 },
      { criterionEn: '(d) Products', criterionMn: '(d) Бүтээгдэхүүн', pointEn: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂ with the correct products', pointMn: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂ зөв бүтээгдэхүүнтэй', marks: 1 },
      { criterionEn: '(d) Balancing', criterionMn: '(d) Тэнцвэржүүлэлт', pointEn: 'The equation is balanced', pointMn: 'Тэгшитгэл тэнцвэржсэн', marks: 1 },
      { criterionEn: '(e) Type', criterionMn: '(e) Төрөл', pointEn: 'Redox (a displacement in which electrons are transferred)', pointMn: 'Redox (электрон шилжих түлхэх урвал)', marks: 1 }
    ],
    modelAnswerEn: '(a) Fe + Cu²⁺ → Fe²⁺ + Cu. (b) The anode. (c) Copper dissolves at the anode; pure copper is deposited at the cathode. (d) Fe₂O₃ + 3CO → 2Fe + 3CO₂. (e) Redox (displacement).',
    modelAnswerMn: '(a) Fe + Cu²⁺ → Fe²⁺ + Cu. (b) Анод. (c) Анод дээр зэс уусна; катод дээр цэвэр зэс шингэнэ. (d) Fe₂O₃ + 3CO → 2Fe + 3CO₂. (e) Redox (түлхэх урвал).',
    misconceptionDiagnosisEn: 'The electrode names in electrolysis are swapped.',
    misconceptionDiagnosisMn: 'Электролиз дэх электродын нэрийг сольдог.',
    remediationTopicId: 's-9-6'
  },
  {
    id: 'mt-d-05',
    topicId: 's-12-1',
    chapterId: 'ch-experimental-analysis',
    syllabusRef: '0620/12.1',
    paper: 'Paper 4',
    totalMarks: 8,
    type: 'structured',
    titleEn: 'Identifying ions and gases',
    titleMn: 'Ион ба хийг таних',
    questionTextEn: '(a) Describe a test for carbonate ions, with the result. [2] (b) A solution gives a brick-red flame in a flame test. Name the cation. [1] (c) State the colour of the precipitate formed when sodium hydroxide solution is added to copper(II) ions. [1] (d) Describe a test for ammonia gas, with the result. [2] (e) Describe a test for chloride ions, with the result. [2]',
    questionTextMn: '(a) Карбонатын ионыг илрүүлэх туршилтыг үр дүнгийн хамт тайлбарла. [2] (b) Дөлний туршилтад шаргал-улаан дөл гарсан уусмалын катионыг нэрлэ. [1] (c) Натрийн гидроксидын уусмалыг зэс(II) ионд нэмэхэд үүсэх утуурмагийн өнгийг бич. [1] (d) Аммиак хийг илрүүлэх туршилтыг үр дүнгийн хамт тайлбарла. [2] (e) Хлорын ионыг илрүүлэх туршилтыг үр дүнгийн хамт тайлбарла. [2]',
    markScheme: [
      { criterionEn: '(a) Test', criterionMn: '(a) Туршилт', pointEn: 'Add dilute acid to the solid', pointMn: 'Бодист суларсан хүчил нэмнэ', marks: 1 },
      { criterionEn: '(a) Result', criterionMn: '(a) Үр дүн', pointEn: 'A colourless gas is given off that turns limewater milky', pointMn: 'Өнгөгүй хий ялгарч, шохойн усыг сүүн мэт болгоно', marks: 1 },
      { criterionEn: '(b) Cation', criterionMn: '(b) Катион', pointEn: 'Calcium', pointMn: 'Кальци', marks: 1 },
      { criterionEn: '(c) Colour', criterionMn: '(c) Өнгө', pointEn: 'Blue precipitate', pointMn: 'Цэнхэр утуурмаг', marks: 1 },
      { criterionEn: '(d) Test', criterionMn: '(d) Туршилт', pointEn: 'Hold damp red litmus paper at the gas', pointMn: 'Норсон улаан лакмус цаасыг хийн дэргэд барина', marks: 1 },
      { criterionEn: '(d) Result', criterionMn: '(d) Үр дүн', pointEn: 'The paper turns blue', pointMn: 'Цаас хөх болно', marks: 1 },
      { criterionEn: '(e) Test', criterionMn: '(e) Туршилт', pointEn: 'Add dilute nitric acid, then aqueous silver nitrate', pointMn: 'Суларсан азотын хүчил, дараа нь мөнгөн нитратын уусмал нэмнэ', marks: 1 },
      { criterionEn: '(e) Result', criterionMn: '(e) Үр дүн', pointEn: 'A white precipitate forms', pointMn: 'Цагаан утуурмаг үүснэ', marks: 1 }
    ],
    modelAnswerEn: '(a) Add dilute acid; colourless gas turns limewater milky. (b) Calcium. (c) Blue. (d) Damp red litmus turns blue. (e) Dilute nitric acid then silver nitrate: white precipitate.',
    modelAnswerMn: '(a) Суларсан хүчил нэмнэ; өнгөгүй хий шохойн усыг сүүн мэт болгоно. (b) Кальци. (c) Цэнхэр. (d) Норсон улаан лакмус хөх болно. (e) Суларсан азотын хүчил, дараа нь мөнгөн нитрат: цагаан утуурмаг.',
    misconceptionDiagnosisEn: 'Ammonia and other gases are confused in the gas tests.',
    misconceptionDiagnosisMn: 'Хийн туршилтад аммиак ба бусад хийг андуурдаг.',
    remediationTopicId: 's-12-1'
  },
  {
    id: 'mt-d-06',
    topicId: 'top-8-1',
    chapterId: 'ch-reactions',
    syllabusRef: '0620/6.2',
    paper: 'Paper 4',
    totalMarks: 8,
    type: 'structured',
    titleEn: 'Gas volume, rate and energy',
    titleMn: 'Хийн эзлэхүүн, хурд ба энерги',
    questionTextEn: 'Magnesium reacts with excess dilute hydrochloric acid: Mg + 2HCl → MgCl₂ + H₂. (a) Calculate the volume of hydrogen at room temperature and pressure from 0.12 g of magnesium (Ar Mg = 24; 1 mol of gas = 24 000 cm³). [3] (b) Explain why the reaction slows down as time passes. [2] (c) Is the reaction exothermic or endothermic? Explain your answer. [2] (d) Name the gas that gives a squeaky pop with a lighted splint. [1]',
    questionTextMn: 'Магни илүүдэл суларсан давсны хүчилтэй урвалд орно: Mg + 2HCl → MgCl₂ + H₂. (a) 0.12 г магнигаас өрөөний температур, даралтад үүсэх устөрөгчийн эзлэхүүнийг тооцоол (Ar Mg = 24; 1 моль хий = 24 000 см³). [3] (b) Урвал хугацааны явцад яагаад удаашрах вэ? Тайлбарла. [2] (c) Урвал экзотерм эсвэл эндотерм вэ? Хариултаа тайлбарла. [2] (d) Шатаж буй шүршүүрээр цохиход чимээтэй дэлбэрэх хийг нэрлэ. [1]',
    markScheme: [
      { criterionEn: '(a) Moles of Mg', criterionMn: '(a) Магнийн мол', pointEn: 'Moles of Mg = 0.12 ÷ 24 = 0.005 mol', pointMn: 'Mg-ийн мол = 0.12 ÷ 24 = 0.005 моль', marks: 1 },
      { criterionEn: '(a) Ratio', criterionMn: '(a) Харьцаа', pointEn: 'Mole ratio Mg : H₂ = 1 : 1, so 0.005 mol H₂', pointMn: 'Mg : H₂ моль харьцаа 1 : 1 тул 0.005 моль H₂', marks: 1 },
      { criterionEn: '(a) Volume', criterionMn: '(a) Эзлэхүүн', pointEn: 'Volume = 0.005 × 24 000 = 120 cm³', pointMn: 'Эзлэхүүн = 0.005 × 24 000 = 120 см³', marks: 1 },
      { criterionEn: '(b) Concentration', criterionMn: '(b) Концентраци', pointEn: 'The acid concentration falls as it is used up', pointMn: 'Хүчлийн концентраци хэрэглэгдэх тусам буурна', marks: 1 },
      { criterionEn: '(b) Collisions', criterionMn: '(b) Мөргөлдөөн', pointEn: 'Fewer collisions per second, so the rate slows', pointMn: 'Секундэд мөргөлдөөн цөөрч, хурд удаашрана', marks: 1 },
      { criterionEn: '(c) Type', criterionMn: '(c) Төрөл', pointEn: 'Exothermic', pointMn: 'Экзотерм', marks: 1 },
      { criterionEn: '(c) Reason', criterionMn: '(c) Шалтгаан', pointEn: 'Energy is given out to the surroundings (the temperature rises)', pointMn: 'Орчинд энерги ялгарна (температур өснө)', marks: 1 },
      { criterionEn: '(d) Gas', criterionMn: '(d) Хий', pointEn: 'Hydrogen', pointMn: 'Устөрөгч', marks: 1 }
    ],
    modelAnswerEn: '(a) 0.005 mol Mg → 0.005 mol H₂ → 120 cm³. (b) Acid is used up, so collisions become less frequent. (c) Exothermic: energy is given out and the temperature rises. (d) Hydrogen.',
    modelAnswerMn: '(a) 0.005 моль Mg → 0.005 моль H₂ → 120 см³. (b) Хүчил зарцуулагдаж, мөргөлдөөн ховордог. (c) Экзотерм: энерги ялгарч, температур өснө. (d) Устөрөгч.',
    misconceptionDiagnosisEn: 'The volume is calculated from the mass without changing to moles first.',
    misconceptionDiagnosisMn: 'Эзлэхүүнийг эхлээд молид шилжүүлэлгүйгээр массаас тооцдог.',
    remediationTopicId: 'top-8-1'
  }
];

export const MOCK_TESTS: MockTest[] = [
  {
    id: 'diagnostic',
    titleEn: 'Diagnostic test',
    titleMn: 'Оношлогоо тест',
    descriptionEn: 'Before you start the course: find out what you already know, and which lessons to start with.',
    descriptionMn: 'Хичээлээ эхлэхээс өмнө: юу мэдэж байгаагаа шалгаж, аль хичээлээс эхлэхээ тодорхойл.',
    minutes: 20,
    questions: DIAGNOSTIC_QUESTIONS
  },
  {
    id: 'midpoint',
    titleEn: 'Mid-point test',
    titleMn: 'Дунд шалгалт',
    descriptionEn: 'Atomic structure, bonding, redox, rates, energetics and titration.',
    descriptionMn: 'Атомын бүтэц, холбоо, redox, урвалын хурд, энергетик, титрлэл.',
    minutes: 40,
    questions: MIDPOINT_QUESTIONS
  },
  {
    id: 'end-mcq',
    titleEn: 'End-of-course test 1 (multiple choice)',
    titleMn: 'Хичээлийн эцсийн тест 1 (сонгох хариулт)',
    descriptionEn: 'Twenty questions across the whole course, one mark each.',
    descriptionMn: 'Бүх хичээлийг хамарсан 20 асуулт, асуулт бүр 1 оноотой.',
    minutes: 25,
    questions: END_MCQ_QUESTIONS
  },
  {
    id: 'end-structured',
    titleEn: 'End-of-course test 2 (structured)',
    titleMn: 'Хичээлийн эцсийн тест 2 (бүтэцтэй)',
    descriptionEn: 'Structured questions with mark points. Mark your own answers after the test.',
    descriptionMn: 'Оноо авах зүйлстэй бүтэцтэй асуултууд. Шалгалтын дараа өөрөө дүгнэнэ.',
    minutes: 50,
    questions: END_STRUCTURED_QUESTIONS
  },
  {
    id: 'chapter-1',
    titleEn: 'Chapter 1 end-of-chapter test: States of matter',
    titleMn: 'Бүлэг 1-ийн шалгалт: Бодисын төлөв',
    descriptionEn: 'Twenty-two marks on changes of state, the cooling curve, gas particles and diffusion. Mark your own answers after the test.',
    descriptionMn: 'Төлөвийн өөрчлөлт, хөрөх муруй, хийн бөөмс, диффуз дээр 22 оноо. Шалгалтын дараа өөрөө дүгнэнэ.',
    minutes: 30,
    questions: CHAPTER1_QUESTIONS
  }
];
