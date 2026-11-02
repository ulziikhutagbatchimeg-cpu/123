// The starting check tests what the student already knows from the programme before this one: for IGCSE 0620, basic chemistry
// from earlier study; for AS Level 9701, the IGCSE 0620 content; for A Level 9701, the AS Level content. These ten questions are
// written for IGCSE 0620. Each has one correct option and a short note on the usual mistake, in Mongolian and English.

export type ChoiceId = 'A' | 'B' | 'C' | 'D';

export interface StartingItem {
  id: string;
  topicId?: string; // the topic the question comes from, when it is taken from a course
  questionEn: string;
  questionMn: string;
  options: { id: ChoiceId; textEn: string; textMn: string }[];
  correct: ChoiceId;
  explainEn: string;
  explainMn: string;
}

export const IGCSE_STARTING: StartingItem[] = [
  {
    id: 'start-igcse-1',
    questionEn: 'Which is the chemical symbol for sodium?',
    questionMn: 'Натрийн химийн тэмдэг аль нь вэ?',
    options: [
      { id: 'A', textEn: 'Na', textMn: 'Na' },
      { id: 'B', textEn: 'So', textMn: 'So' },
      { id: 'C', textEn: 'Sd', textMn: 'Sd' },
      { id: 'D', textEn: 'Nt', textMn: 'Nt' }
    ],
    correct: 'A',
    explainEn: 'Sodium is Na, from its Latin name natrium. A symbol has one or two letters, and the second letter is lower case.',
    explainMn: 'Натри нь Na, латин нэр нь natrium. Тэмдэг нь нэг эсвэл хоёр үсэгтэй, хоёр дахь үсэг нь жижиг байна.'
  },
  {
    id: 'start-igcse-2',
    questionEn: 'Which of these is an element?',
    questionMn: 'Аль нь элемент вэ?',
    options: [
      { id: 'A', textEn: 'Water (H₂O)', textMn: 'Ус (H₂O)' },
      { id: 'B', textEn: 'Oxygen (O₂)', textMn: 'Хүчилтөрөгч (O₂)' },
      { id: 'C', textEn: 'Carbon dioxide (CO₂)', textMn: 'Нүүрстөрөгчийн давхар исэл (CO₂)' },
      { id: 'D', textEn: 'Salt (NaCl)', textMn: 'Давс (NaCl)' }
    ],
    correct: 'B',
    explainEn: 'An element has only one kind of atom. O₂ contains only oxygen atoms; the others are compounds of two elements.',
    explainMn: 'Элемент нь нэг төрлийн атомтой. O₂-д зөвхөн хүчилтөрөгчийн атом байдаг; бусад нь хоёр элементийн нэгдэл.'
  },
  {
    id: 'start-igcse-3',
    questionEn: 'Which state of matter has a fixed shape and a fixed volume?',
    questionMn: 'Бодисын аль төлөвт тогтмол хэлбэр, тогтмол эзэлхүүн байдаг вэ?',
    options: [
      { id: 'A', textEn: 'Gas', textMn: 'Хий' },
      { id: 'B', textEn: 'Liquid', textMn: 'Шингэн' },
      { id: 'C', textEn: 'Solid', textMn: 'Хатуу' },
      { id: 'D', textEn: 'All of them', textMn: 'Бүгд' }
    ],
    correct: 'C',
    explainEn: 'In a solid the particles are close together and only vibrate about fixed places, so both the shape and the volume stay fixed.',
    explainMn: 'Хатуу бодисын бөөмс нягт, байрандаа чичирдэг тул хэлбэр, эзэлхүүн нь тогтмол байна.'
  },
  {
    id: 'start-igcse-4',
    questionEn: 'What is a compound?',
    questionMn: 'Нэгдэл гэж юу вэ?',
    options: [
      { id: 'A', textEn: 'A mixture of two or more elements', textMn: 'Хоёр ба түүнээс дээш элементийн холимог' },
      { id: 'B', textEn: 'Two or more elements chemically joined', textMn: 'Хоёр ба түүнээс дээш элемент химийн аргаар холбогдсон' },
      { id: 'C', textEn: 'A single type of atom', textMn: 'Нэг төрлийн атом' },
      { id: 'D', textEn: 'A substance that cannot be broken down', textMn: 'Задлах боломжгүй бодис' }
    ],
    correct: 'B',
    explainEn: 'In a compound the elements are chemically bonded in a fixed ratio. A mixture keeps the properties of each substance.',
    explainMn: 'Нэгдэлд элементүүд тогтмол харьцаагаар химийн холбоотой байна. Холимог дахь бодис бүр өөрийн шинж чанараа хадгална.'
  },
  {
    id: 'start-igcse-5',
    questionEn: 'Which gas is made when zinc reacts with dilute hydrochloric acid?',
    questionMn: 'Цайрыг шингэлсэн давсны хүчилтэй урвалд оруулахад аль хий үүсэх вэ?',
    options: [
      { id: 'A', textEn: 'Oxygen', textMn: 'Хүчилтөрөгч' },
      { id: 'B', textEn: 'Hydrogen', textMn: 'Устөрөгч' },
      { id: 'C', textEn: 'Carbon dioxide', textMn: 'Нүүрстөрөгчийн давхар исэл' },
      { id: 'D', textEn: 'Chlorine', textMn: 'Хлор' }
    ],
    correct: 'B',
    explainEn: 'A metal with an acid gives a salt and hydrogen. The hydrogen burns with a squeaky pop.',
    explainMn: 'Металл ба хүчил давс ба устөрөгч өгнө. Устөрөгч шатахдаа чимээтэйгээр дэлбэрнэ.'
  },
  {
    id: 'start-igcse-6',
    questionEn: 'Which method separates salt from salt water?',
    questionMn: 'Давсыг давстай уснаас аль арга тусгаарлах вэ?',
    options: [
      { id: 'A', textEn: 'Filtration', textMn: 'Шүүлт' },
      { id: 'B', textEn: 'Evaporation', textMn: 'Ууршуулалт' },
      { id: 'C', textEn: 'Chromatography', textMn: 'Хроматограф' },
      { id: 'D', textEn: 'Decanting', textMn: 'Цутгах' }
    ],
    correct: 'B',
    explainEn: 'Heating drives the water off as vapour and leaves the salt behind. Filtration cannot separate dissolved salt.',
    explainMn: 'Халаахад ус уур болж ууршиж, давс үлдэнэ. Шүүлт нь уусмал дахь давсыг тусгаарлахгүй.'
  },
  {
    id: 'start-igcse-7',
    questionEn: 'What is the pH of a neutral solution at room temperature?',
    questionMn: 'Өрөөний температурт саармаг уусмалын pH хэд вэ?',
    options: [
      { id: 'A', textEn: '0', textMn: '0' },
      { id: 'B', textEn: '7', textMn: '7' },
      { id: 'C', textEn: '14', textMn: '14' },
      { id: 'D', textEn: '1', textMn: '1' }
    ],
    correct: 'B',
    explainEn: 'Acids have a pH below 7 and alkalis above 7.',
    explainMn: 'Хүчлийн pH 7-оос бага, суурийн pH 7-оос их байдаг.'
  },
  {
    id: 'start-igcse-8',
    questionEn: 'Which particle has a negative charge?',
    questionMn: 'Аль бөөм сөрөг цэнэгтэй вэ?',
    options: [
      { id: 'A', textEn: 'Proton', textMn: 'Протон' },
      { id: 'B', textEn: 'Neutron', textMn: 'Нейтрон' },
      { id: 'C', textEn: 'Electron', textMn: 'Электрон' },
      { id: 'D', textEn: 'Nucleus', textMn: 'Цөм' }
    ],
    correct: 'C',
    explainEn: 'Protons are positive, neutrons have no charge, and electrons are negative.',
    explainMn: 'Протон эерэг, нейтрон цэнэггүй, электрон сөрөг.'
  },
  {
    id: 'start-igcse-9',
    questionEn: 'Which of these is a physical change?',
    questionMn: 'Аль нь физик өөрчлөлт вэ?',
    options: [
      { id: 'A', textEn: 'Burning wood', textMn: 'Мод шатаах' },
      { id: 'B', textEn: 'Melting ice', textMn: 'Мөс хайлах' },
      { id: 'C', textEn: 'Rusting iron', textMn: 'Төмөр зэвших' },
      { id: 'D', textEn: 'Cooking an egg', textMn: 'Өндөг чанах' }
    ],
    correct: 'B',
    explainEn: 'Melting changes the state, but the substance is still water. The others make new substances.',
    explainMn: 'Хайлахад бодисын төлөв өөрчлөгдөнө, гэхдээ ус хэвээр байна. Бусад нь шинэ бодис үүсгэнэ.'
  },
  {
    id: 'start-igcse-10',
    questionEn: 'What is the chemical formula of water?',
    questionMn: 'Усны химийн томьёо аль нь вэ?',
    options: [
      { id: 'A', textEn: 'H₂O', textMn: 'H₂O' },
      { id: 'B', textEn: 'CO₂', textMn: 'CO₂' },
      { id: 'C', textEn: 'NaCl', textMn: 'NaCl' },
      { id: 'D', textEn: 'O₂', textMn: 'O₂' }
    ],
    correct: 'A',
    explainEn: 'Each water molecule has two hydrogen atoms and one oxygen atom.',
    explainMn: 'Ус нэг молекулд хоёр устөрөгч, нэг хүчилтөрөгчийн атомтай.'
  }
];

// Three questions about the student's own way of learning: the web, studying alone, and practical lessons
export const SELF_ITEMS = [
  {
    id: 'web',
    en: 'Using a website for lessons and tasks is easy for me.',
    mn: 'Вэб дээр хичээл үзэж, даалгавар хийх нь надад хялбар.'
  },
  {
    id: 'alone',
    en: 'I can study on my own, without a teacher beside me.',
    mn: 'Багшгүйгээр бие даан суралцах чадвартай.'
  },
  {
    id: 'lab',
    en: 'I have experience of practical (lab) lessons.',
    mn: 'Туршилттай (лабораторийн) хичээлд оролцсон туршлагатай.'
  }
];
