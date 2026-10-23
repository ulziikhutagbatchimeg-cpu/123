// IGCSE 0620 chapter 1 (States of matter), grouped from its learning outcomes into four 40-minute lessons.
// The lesson shape follows Electrochemistry_40min_Lesson_Plan.xlsx: ten steps on the same timeline (0–40 min),
// each with a teacher activity, a student activity and the evidence the lesson checks. The assessment follows
// eelzhit_hicheeliin_unelgee.xlsx (see lessonRubric.ts). The theory follows the 0620 (2026–2028) syllabus, section 1.

export interface Bi {
  mn: string;
  en: string;
}

export interface LessonStep {
  phase: 'start' | 'core' | 'end';
  from: number; // minute the step starts
  to: number; // minute the step ends
  title: Bi;
  teacher: Bi;
  student: Bi;
  evidence: Bi;
}

export interface QuizItem {
  question: Bi;
  options: Bi[];
  answer: number; // index of the correct option
  explanation: Bi;
}

export interface StatesLesson {
  id: string;
  number: number;
  title: Bi;
  los: Array<{ code: string; core: boolean }>; // learning outcomes covered (core or supplement)
  objective: Bi;
  keyPoints: Bi[];
  steps: LessonStep[];
  quiz: QuizItem[]; // the exit ticket
}

// The shared timeline of the 40-minute lesson (from the Excel)
const TIMELINE: Array<[number, number, LessonStep['phase']]> = [
  [0, 3, 'start'],
  [3, 5, 'start'],
  [5, 6, 'start'],
  [6, 16, 'core'],
  [16, 26, 'core'],
  [26, 31, 'core'],
  [31, 34, 'end'],
  [34, 36, 'end'],
  [36, 39, 'end'],
  [39, 40, 'end']
];

const step = (index: number, body: Omit<LessonStep, 'from' | 'to' | 'phase'>): LessonStep => ({
  phase: TIMELINE[index][2],
  from: TIMELINE[index][0],
  to: TIMELINE[index][1],
  ...body
});

export const STATES_LESSONS: StatesLesson[] = [
  {
    id: 'states-1',
    number: 1,
    title: { mn: 'Хатуу, шингэн, хий: бөөмсийн загвар', en: 'Solids, liquids and gases: the particle model' },
    los: [
      { code: '1.1.1', core: true },
      { code: '1.1.2', core: true }
    ],
    objective: {
      mn: 'Хатуу, шингэн, хийн шинж чанарыг ялгаж, бөөмсийн зай, байрлал, хөдөлгөөнөөр тэдгээрийн бүтцийг тайлбарлах.',
      en: 'Distinguish solids, liquids and gases, and describe their structure by particle separation, arrangement and motion.'
    },
    keyPoints: [
      {
        mn: 'Хатуу: тогтсон хэлбэр ба эзлэхүүн; бөөмс нягт, эмх цэгцтэй байрлана; бөөмс байрандаа чичирнэ (тогтсон байрлалаасаа гарахгүй).',
        en: 'Solid: fixed shape and volume; particles are close together in a regular arrangement and vibrate about fixed positions.'
      },
      {
        mn: 'Шингэн: тогтсон эзлэхүүнтэй, хэлбэргүй (савныхаа хэлбэрийг авна); бөөмс нягт боловч санамсаргүй байрлана; бие биенийхээ дээр гулсаж хөдөлнө.',
        en: 'Liquid: fixed volume but no fixed shape (takes the shape of its container); particles are close together but randomly arranged and slide past each other.'
      },
      {
        mn: 'Хий: тогтсон хэлбэр, эзлэхүүнгүй (савыг бүрэн дүүргэнэ); бөөмс хоорондоо маш хол; санамсаргүй, хурдан хөдөлнө.',
        en: 'Gas: no fixed shape or volume (fills its container); particles are far apart and move rapidly in random directions.'
      }
    ],
    steps: [
      step(0, {
        title: { mn: 'Сурах сэдэл үүсгэх', en: 'Create motivation' },
        teacher: {
          mn: 'Хатуу биет хэлбэрээ хадгалдаг, шингэн савныхаа хэлбэрийг авдаг, агаар шахагддаг — яагаад гэдгийг асууна.',
          en: 'Ask why solids keep their shape, liquids take the shape of the container, and air can be squeezed.'
        },
        student: {
          mn: 'Хариугаа дэвтэр дээр бичиж, өмнөх ойлголтоо хэлнэ.',
          en: 'Write a prediction in the notebook and share the prior idea.'
        },
        evidence: { mn: 'Өмнөх ойлголт илэрсэн.', en: 'Prior ideas are revealed.' }
      }),
      step(1, {
        title: { mn: 'Суралцахуйн зорилгыг томъёолох', en: 'State the learning objective' },
        teacher: {
          mn: 'Зорилгоо "ялгах, тодорхойлох" гэсэн үйл үгээр хэлнэ.',
          en: 'State the objective with the verbs "distinguish" and "describe".'
        },
        student: { mn: 'Зорилгыг өөрийн үгээр давтана.', en: 'Repeat the objective in your own words.' },
        evidence: { mn: 'Сурагч зорилгыг ойлгосон.', en: 'Students understand the objective.' }
      }),
      step(2, {
        title: { mn: 'Суралцахуйн үйл ажиллагааг төлөвлөх', en: 'Plan the learning activity' },
        teacher: {
          mn: 'Бөөмсийн загварын симуляци, карт эрэмбэлэлт, хосоор ярилцах дарааллыг танилцуулна.',
          en: 'Introduce the particle simulation, the card sort and pair discussion.'
        },
        student: { mn: 'Хосоо сонгож, ажлын дарааллыг ойлгоно.', en: 'Choose a partner and follow the sequence.' },
        evidence: { mn: 'Бүх сурагч дэвтэр, үзэгтэй.', en: 'Every student has a notebook and a pen.' }
      }),
      step(3, {
        title: { mn: 'Судлагдахууны агуулгыг элементарчилж эзэмшүүлэх', en: 'Teach the content in small steps' },
        teacher: {
          mn: 'Бөөмсийн загварын симуляцид хатуу, шингэн, хийг сонгож, бөөмсийн зай, байрлал, хөдөлгөөнийг тайлбарлана.',
          en: 'In the particle simulation, select solid, liquid and gas and explain particle separation, arrangement and motion.'
        },
        student: {
          mn: 'Симуляцид гурван төлвийг сонгож, бөөмсийн хөдөлгөөнийг ажиглана.',
          en: 'Select each state in the simulation and observe the particle motion.'
        },
        evidence: {
          mn: 'Хатуу: чичирнэ. Шингэн: гулсана. Хий: хурдан, хоосон зайтай.',
          en: 'Solid: vibrates. Liquid: slides. Gas: fast with large spaces.'
        }
      }),
      step(4, {
        title: { mn: 'Судлагдахууны агуулгад оюуны боловсруулалт хийх', en: 'Think about the content' },
        teacher: {
          mn: 'Найман өгүүлбэрийг хатуу, шингэн, хийн картад эрэмбэлүүлж, ангиллын шалтгааныг асууна.',
          en: 'Ask students to sort eight statements into solid, liquid and gas cards and give a reason for each.'
        },
        student: {
          mn: 'Карт бүрийг эрэмбэлж, шалтгаанаа хосоороо шалгана.',
          en: 'Sort each card and check the reason with your partner.'
        },
        evidence: { mn: 'Найман картын дөрөв ба түүнээс дээш зөв.', en: 'Four or more of the eight cards are correct.' }
      }),
      step(5, {
        title: { mn: 'Олон хэлбэрийн хэрэглээ', en: 'Apply in several ways' },
        teacher: {
          mn: 'Шприцэнд агаар, усыг шахах туршилтыг төсөөлүүлж, яагаад агаар шахагддаг, ус шахагддаггүйг асууна.',
          en: 'Ask students to imagine compressing air and water in a syringe, and explain why air compresses and water does not.'
        },
        student: {
          mn: 'Агаарт хоосон зай байдгийг, усанд бөөмс нягт байдгийг хэрэглэн тайлбарлана.',
          en: 'Explain using the empty space between gas particles and the close packing of liquid particles.'
        },
        evidence: {
          mn: 'Хийн бөөмсийн хоорондох хоосон зайг тайлбарласан.',
          en: 'Explains the empty space between gas particles.'
        }
      }),
      step(6, {
        title: { mn: 'Үйл ажиллагааны гүйцэтгэлийг хянан нэгтгэх', en: 'Summarise the learning' },
        teacher: {
          mn: 'Зайг, байрлалыг, хөдөлгөөнийг гурван багана хүснэгтэд нэгтгэж бичүүлнэ.',
          en: 'Ask students to complete a table of separation, arrangement and motion for each state.'
        },
        student: { mn: 'Хүснэгтийг бөглөж, хосоороо шалгана.', en: 'Fill in the table and check it with a partner.' },
        evidence: { mn: 'Хүснэгт бүрэн, зөв.', en: 'The table is complete and correct.' }
      }),
      step(7, {
        title: { mn: 'Гүйцэтгэлийг сайжруулах арга хэмжээ', en: 'Improve performance' },
        teacher: {
          mn: 'Нийтлэг алдааг (хатуу бөөмс огт хөдөлдөггүй; хий хоосон гэх) танилцуулж, зөвөөр засуулна.',
          en: 'Present the common errors (solid particles do not move at all; a gas is empty) and have students correct them.'
        },
        student: { mn: 'Буруу өгүүлбэрийг зөв болгон бичнэ.', en: 'Rewrite each wrong sentence correctly.' },
        evidence: { mn: 'Хатуу бөөмс чичирнэ; хий хоосон биш, бөөмстэй.', en: 'Solid particles vibrate; a gas is not empty, it contains particles.' }
      }),
      step(8, {
        title: { mn: 'Үр дүнгээ үнэлэх', en: 'Assess the outcome' },
        teacher: {
          mn: 'Гарах билет: гурван асуулт.',
          en: 'Exit ticket: three questions.'
        },
        student: { mn: 'Гурван асуултад бие даан хариулна.', en: 'Answer the three questions on your own.' },
        evidence: { mn: 'Гарах билетийн оноо.', en: 'Exit ticket score.' }
      }),
      step(9, {
        title: { mn: 'Эзэмшсэн мэдлэгийн ач холбогдол', en: 'Why it matters' },
        teacher: {
          mn: 'Үнэр яагаад хурдан тархдагийг, шингэнийг савлахыг бодит жишээнд холбоно.',
          en: 'Connect to real examples: why a smell spreads, and why liquids are poured into containers.'
        },
        student: {
          mn: 'Өдөр тутмын нэг жишээ нэрлэж, дараагийн хичээлд юу сурмаар байгаагаа хэлнэ.',
          en: 'Name one everyday example and say what you would like to learn next.'
        },
        evidence: { mn: 'Өдөр тутмын жишээг холбосон.', en: 'Connects the content to an everyday example.' }
      })
    ],
    quiz: [
      {
        question: {
          mn: 'Хатуу биетийн бөөмс ямар хөдөлгөөнтэй вэ?',
          en: 'How do the particles of a solid move?'
        },
        options: [
          { mn: 'Огт хөдөлдөггүй', en: 'They do not move at all' },
          { mn: 'Тогтсон байрлалынхаа эргэн тойронд чичирдэг', en: 'They vibrate about fixed positions' },
          { mn: 'Савны дагуу хурдан хөдөлдөг', en: 'They move quickly around the container' }
        ],
        answer: 1,
        explanation: {
          mn: 'Хатуу биетийн бөөмс тогтсон байрлалтай тул байрандаа чичирдэг; огт хөдөлдөггүй биш.',
          en: 'Solid particles have fixed positions, so they vibrate about them; they do not stop moving.'
        }
      },
      {
        question: {
          mn: 'Шингэнд бөөмс хоорондоо ямар байдалтай байдаг вэ?',
          en: 'How are the particles of a liquid arranged?'
        },
        options: [
          { mn: 'Хийтэй адил маш хол', en: 'Very far apart, as in a gas' },
          { mn: 'Нягт, санамсаргүй, бие биенээ гулсах боломжтой', en: 'Close together, randomly arranged, able to slide past each other' },
          { mn: 'Нягт, эмх цэгцтэй торонд', en: 'Close together in a regular lattice' }
        ],
        answer: 1,
        explanation: {
          mn: 'Шингэнийн бөөмс хатуутай адил нягт боловч торонд байрлаагүй тул гулсаж чадна.',
          en: 'Liquid particles are as close as solid particles but not in a lattice, so they can slide.'
        }
      },
      {
        question: {
          mn: 'Агаар яагаад шахагддаг вэ?',
          en: 'Why can air be compressed?'
        },
        options: [
          { mn: 'Агаарын бөөмс бие биендээ наалддаг', en: 'Air particles stick to each other' },
          { mn: 'Бөөмсийн хоорондох хоосон зай их', en: 'There is a lot of empty space between the particles' },
          { mn: 'Агаарт бөөмс байдаггүй', en: 'Air has no particles' }
        ],
        answer: 1,
        explanation: {
          mn: 'Хийн бөөмс хоорондоо хол тул шахахад бөөмсүүд ойртож зай багасна. Агаарт бөөмс байдаг.',
          en: 'Gas particles are far apart, so they move closer when compressed. Air does contain particles.'
        }
      }
    ]
  },
  {
    id: 'states-2',
    number: 2,
    title: { mn: 'Төлөв өөрчлөлт ба халаалтын муруй', en: 'Changes of state and heating curves' },
    los: [
      { code: '1.1.3', core: true },
      { code: '1.1.5', core: false }
    ],
    objective: {
      mn: 'Хайлах, буцлах, уурших, хөрөх, конденсацлагдах төлөв өөрчлөлтийг тодорхойлж, халаалтын муруйг бөөмсийн онолоор тайлбарлах.',
      en: 'Describe changes of state as melting, boiling, evaporating, freezing and condensing, and explain heating curves with particle theory.'
    },
    keyPoints: [
      {
        mn: 'Хайлах: хатуу → шингэн. Буцлах: шингэн → хий, шингэний бүх хэсэгт, буцлах цэгт. Уурших: шингэний гадаргуу дээр, ямар ч температурт.',
        en: 'Melting: solid to liquid. Boiling: liquid to gas throughout the liquid, at the boiling point. Evaporating: at the surface, at any temperature.'
      },
      {
        mn: 'Халаалтын муруйн хэвтээ хэсэг (хайлах, буцлах цэг): температур тогтмол; нийлүүлсэн энерги нь бөөмсийн хоорондох татах хүчийг даван туулахад зарцуулагдана.',
        en: 'A flat part of a heating curve (melting or boiling point): the temperature is constant; the energy supplied overcomes the forces between particles.'
      },
      {
        mn: 'Налуу хэсэг: температур өснө, бөөмсийн кинетик энерги нэмэгдэнэ. Хөргөлтөд эсрэг дараалал, энерги ялгарна.',
        en: 'A sloping part: the temperature rises as the kinetic energy of the particles increases. Cooling reverses the sequence and releases energy.'
      }
    ],
    steps: [
      step(0, {
        title: { mn: 'Сурах сэдэл үүсгэх', en: 'Create motivation' },
        teacher: {
          mn: 'Цай буцалж байхад температур яагаад 100 °C-т тогтдог вэ гэж асууна.',
          en: 'Ask why the temperature of boiling water stays at 100 °C.'
        },
        student: { mn: 'Таамаглаж бичнэ.', en: 'Make a prediction and write it down.' },
        evidence: { mn: 'Өмнөх төсөөлөл илэрсэн.', en: 'Prior ideas are revealed.' }
      }),
      step(1, {
        title: { mn: 'Суралцахуйн зорилгыг томъёолох', en: 'State the learning objective' },
        teacher: {
          mn: 'Зорилго: төлөв өөрчлөлтийг тодорхойлох, халаалтын муруйг тайлбарлах.',
          en: 'Objective: describe changes of state and explain a heating curve.'
        },
        student: { mn: 'Зорилгыг давтана.', en: 'Repeat the objective.' },
        evidence: { mn: 'Зорилгыг ойлгосон.', en: 'Understands the objective.' }
      }),
      step(2, {
        title: { mn: 'Суралцахуйн үйл ажиллагааг төлөвлөх', en: 'Plan the learning activity' },
        teacher: {
          mn: 'Таамаглал → ажиглалт → тайлбар (POE) дарааллыг танилцуулна.',
          en: 'Introduce the predict–observe–explain sequence.'
        },
        student: { mn: 'Муруйн хэлбэрийг таамаглана.', en: 'Predict the shape of the curve.' },
        evidence: { mn: 'Таамаглал бичсэн.', en: 'Prediction written.' }
      }),
      step(3, {
        title: { mn: 'Судлагдахууны агуулгыг элементарчилж эзэмшүүлэх', en: 'Teach the content in small steps' },
        teacher: {
          mn: 'Халаалтын симуляцийг асаана: хайлах ба буцлах цэгийн хэвтээ хэсгүүдийг заана.',
          en: 'Run the heating simulation and point to the flat parts at the melting and boiling points.'
        },
        student: { mn: 'Симуляцийг ажиглаж, температур ба бөөмсийн төлвийг харна.', en: 'Watch the temperature and particle state in the simulation.' },
        evidence: { mn: 'Хэвтээ хэсгийг хайлах/буцлах цэгтэй холбосон.', en: 'Connects the flat parts to the melting and boiling points.' }
      }),
      step(4, {
        title: { mn: 'Судлагдахууны агуулгад оюуны боловсруулалт хийх', en: 'Think about the content' },
        teacher: {
          mn: 'Муруйн цэг бүрийн төлөвийг асуух: "Хэвтээ хэсэгт температур юу хийдэг вэ, энерги яах вэ?"',
          en: 'Ask about each point of the curve: "What does the temperature do on a flat part, and where does the energy go?"'
        },
        student: { mn: 'Хосоороо хариулна.', en: 'Answer in pairs.' },
        evidence: { mn: 'Энерги бөөмсийн татах хүчийг даван туулахад зарцуулагдсан гэж хэлсэн.', en: 'States that the energy overcomes the forces between particles.' }
      }),
      step(5, {
        title: { mn: 'Олон хэлбэрийн хэрэглээ', en: 'Apply in several ways' },
        teacher: {
          mn: 'Хөлрөх, гарыг усаар арчихад хүйтэрч байгааг, мөсөн шоо ундааг хөргөхийг асууна.',
          en: 'Ask why sweating cools the body, and why ice cools a drink.'
        },
        student: { mn: 'Уурших ба хайлах үед энерги шингэдгийг тайлбарлана.', en: 'Explain that evaporation and melting take in energy.' },
        evidence: { mn: 'Уурших нь энерги шингээнэ гэж тайлбарласан.', en: 'Explains that evaporation takes in energy.' }
      }),
      step(6, {
        title: { mn: 'Үйл ажиллагааны гүйцэтгэлийг хянан нэгтгэх', en: 'Summarise the learning' },
        teacher: {
          mn: 'Хатуу → (хайлах) → шингэн → (буцлах) → хий; эсрэг чиглэлд (конденсаци, хөрөх) гэсэн сумтай схем зурна.',
          en: 'Draw a flow chart: solid → (melting) → liquid → (boiling) → gas, and the reverse with condensing and freezing.'
        },
        student: { mn: 'Схемийг дэвтэртээ зурна.', en: 'Draw the flow chart in the notebook.' },
        evidence: { mn: 'Схем зөв, сумууд зөв чиглэлтэй.', en: 'The chart is correct and the arrows point the right way.' }
      }),
      step(7, {
        title: { mn: 'Гүйцэтгэлийг сайжруулах арга хэмжээ', en: 'Improve performance' },
        teacher: {
          mn: 'Нийтлэг алдаа: "хайлж байхад температур өснө"; "уурших нь зөвхөн буцлах цэгт явагдана".',
          en: 'Common errors: "the temperature rises while melting"; "evaporation happens only at the boiling point".'
        },
        student: { mn: 'Хоёр өгүүлбэрийг засна.', en: 'Correct both sentences.' },
        evidence: { mn: 'Хайлах үед температур тогтмол; уурших нь ямар ч температурт явагдана.', en: 'Temperature stays constant while melting; evaporation happens at any temperature.' }
      }),
      step(8, {
        title: { mn: 'Үр дүнгээ үнэлэх', en: 'Assess the outcome' },
        teacher: { mn: 'Гарах билет: гурван асуулт.', en: 'Exit ticket: three questions.' },
        student: { mn: 'Бие даан хариулна.', en: 'Answer on your own.' },
        evidence: { mn: 'Гарах билетийн оноо.', en: 'Exit ticket score.' }
      }),
      step(9, {
        title: { mn: 'Эзэмшсэн мэдлэгийн ач холбогдол', en: 'Why it matters' },
        teacher: {
          mn: 'Хөлрөх нь биеийг хөргөдөг, мөсөн шоо ундааг хөргөдөг гэдгийг холбоно.',
          en: 'Connect to sweating cooling the body and ice cooling a drink.'
        },
        student: { mn: 'Өдөр тутмын нэг жишээ нэрлэнэ.', en: 'Name one everyday example.' },
        evidence: { mn: 'Жишээг холбосон.', en: 'Connects an example.' }
      })
    ],
    quiz: [
      {
        question: { mn: 'Мөс 0 °C-т хайлж байх үед температур юу хийдэг вэ?', en: 'What does the temperature do while ice melts at 0 °C?' },
        options: [
          { mn: 'Өснө', en: 'It rises' },
          { mn: 'Тогтмол байна', en: 'It stays constant' },
          { mn: 'Буурна', en: 'It falls' }
        ],
        answer: 1,
        explanation: {
          mn: 'Хайлах үед температур тогтмол; нийлүүлсэн энерги бөөмсийн хоорондын татах хүчийг даван туулахад зарцуулагдана.',
          en: 'During melting the temperature is constant; the energy supplied breaks the forces between particles.'
        }
      },
      {
        question: { mn: 'Уурших тухай аль өгүүлбэр зөв вэ?', en: 'Which statement about evaporation is correct?' },
        options: [
          { mn: 'Зөвхөн буцлах цэгт явагдана', en: 'It happens only at the boiling point' },
          { mn: 'Шингэний гадаргуу дээр ямар ч температурт явагдана', en: 'It happens at the surface at any temperature' },
          { mn: 'Зөвхөн хатуу бодисд явагдана', en: 'It happens only in solids' }
        ],
        answer: 1,
        explanation: {
          mn: 'Уурших нь шингэний гадаргуу дээрх хурдтай бөөмс зугтаж чадахад ямар ч температурт явагдана. Буцлах нь шингэний бүх хэсэгт, буцлах цэгт явагдана.',
          en: 'Evaporation happens at the surface at any temperature; boiling happens throughout the liquid at the boiling point.'
        }
      },
      {
        question: { mn: 'Хөргөлтийн муруйд хөрөх үед энерги хэрхэн явагдана?', en: 'In a cooling curve, what happens to the energy during freezing?' },
        options: [
          { mn: 'Энерги шингээнэ', en: 'Energy is taken in' },
          { mn: 'Энерги ялгарна', en: 'Energy is released' },
          { mn: 'Энерги огт солигдохгүй', en: 'No energy changes' }
        ],
        answer: 1,
        explanation: {
          mn: 'Хөрөх үед шингэний бөөмс эмх цэгцтэй торонд байрлахад энерги ялгарна.',
          en: 'Freezing releases energy as the particles settle into fixed positions.'
        }
      }
    ]
  },
  {
    id: 'states-3',
    number: 3,
    title: { mn: 'Хийн эзлэхүүн: температур ба даралт', en: 'Gas volume: temperature and pressure' },
    los: [
      { code: '1.1.4', core: true },
      { code: '1.1.6', core: false }
    ],
    objective: {
      mn: 'Температур ба даралт хийн эзлэхүүнд үзүүлэх нөлөөг тодорхойлж, кинетик бөөмийн онолоор тайлбарлах.',
      en: 'Describe the effects of temperature and pressure on the volume of a gas, and explain them with kinetic particle theory.'
    },
    keyPoints: [
      {
        mn: 'Хийн даралт нь бөөмс саванзийн ханатай мөргөлдөхөөс үүснэ.',
        en: 'Gas pressure is caused by particles colliding with the walls of the container.'
      },
      {
        mn: 'Температур нэмэгдэхэд бөөмс илүү хурдан хөдөлж, ханатай илүү хүчтэй, илүү олон мөргөлдөнө. Тогтмол даралтанд эзлэхүүн нэмэгдэнэ.',
        en: 'Raising the temperature makes particles move faster, so they hit the walls harder and more often. At constant pressure the volume increases.'
      },
      {
        mn: 'Тогтмол температурт даралт нэмэгдэхэд эзлэхүүн буурна: бөөмс ойртож, секундэд ханатай олон мөргөлдөнө.',
        en: 'At constant temperature, increasing the pressure decreases the volume: the particles are closer and hit the walls more often.'
      }
    ],
    steps: [
      step(0, {
        title: { mn: 'Сурах сэдэл үүсгэх', en: 'Create motivation' },
        teacher: {
          mn: 'Шар бөмбөлөг халуун машинд яагаад томордог вэ гэж асууна.',
          en: 'Ask why a balloon gets bigger in a hot car.'
        },
        student: { mn: 'Таамаглаж бичнэ.', en: 'Make a prediction and write it down.' },
        evidence: { mn: 'Таамаглал илэрсэн.', en: 'Predictions revealed.' }
      }),
      step(1, {
        title: { mn: 'Суралцахуйн зорилгыг томъёолох', en: 'State the learning objective' },
        teacher: {
          mn: 'Зорилго: температур ба даралт эзлэхүүнд хэрхэн нөлөөлөхийг тодорхойлох.',
          en: 'Objective: describe how temperature and pressure affect the volume of a gas.'
        },
        student: { mn: 'Зорилгыг давтана.', en: 'Repeat the objective.' },
        evidence: { mn: 'Зорилгыг ойлгосон.', en: 'Understands the objective.' }
      }),
      step(2, {
        title: { mn: 'Суралцахуйн үйл ажиллагааг төлөвлөх', en: 'Plan the learning activity' },
        teacher: {
          mn: 'Хоёр туршилтын таамаглалыг бичүүлнэ: халаахад; шахахад.',
          en: 'Have students write predictions for two tests: heating, and compressing.'
        },
        student: { mn: 'Хоёр таамаглалаа бичнэ.', en: 'Write two predictions.' },
        evidence: { mn: 'Таамаглал бичсэн.', en: 'Predictions written.' }
      }),
      step(3, {
        title: { mn: 'Судлагдахууны агуулгыг элементарчилж эзэмшүүлэх', en: 'Teach the content in small steps' },
        teacher: {
          mn: 'Хийн симуляцид температурыг өсгөж, поршенийг тогтмол даралтаар тавиад эзлэхүүн өсөхийг харуулна.',
          en: 'In the gas simulation, raise the temperature with a free piston and show the volume increasing.'
        },
        student: { mn: 'Симуляцийг ажиглана.', en: 'Watch the simulation.' },
        evidence: { mn: 'Температур өсөхөд эзлэхүүн өснө гэж ажигласан.', en: 'Observes that the volume increases as the temperature rises.' }
      }),
      step(4, {
        title: { mn: 'Судлагдахууны агуулгад оюуны боловсруулалт хийх', en: 'Think about the content' },
        teacher: {
          mn: 'Шахах туршилт: эзлэхүүн буурахад даралт юу хийхийг асууна.',
          en: 'Compression test: ask what pressure does when the volume decreases.'
        },
        student: { mn: 'Симуляцид шахаж, даралтын өөрчлөлтийг бичнэ.', en: 'Compress in the simulation and record the pressure change.' },
        evidence: { mn: 'Эзлэхүүн буурахад даралт нэмэгдсэн гэж тайлбарласан.', en: 'Explains that the pressure rises as the volume falls.' }
      }),
      step(5, {
        title: { mn: 'Олон хэлбэрийн хэрэглээ', en: 'Apply in several ways' },
        teacher: {
          mn: 'Дугуйн насос, аэрозол савны анхааруулга, машины дугуйн даралтыг хэрэглэн тайлбарлуулна.',
          en: 'Ask students to explain a bicycle pump, the warning on an aerosol can and the pressure in a car tyre.'
        },
        student: { mn: 'Температур, даралтыг бөөмсийн мөргөлдөөнөөр тайлбарлана.', en: 'Explain with collisions of particles.' },
        evidence: { mn: 'Хоёр жишээг тайлбарласан.', en: 'Explains two examples.' }
      }),
      step(6, {
        title: { mn: 'Үйл ажиллагааны гүйцэтгэлийг хянан нэгтгэх', en: 'Summarise the learning' },
        teacher: {
          mn: 'Холбоосын гинжин хэлхээ: температур ↑ → хурд ↑ → мөргөлдөөн ↑ → даралт ↑ → (поршен чөлөөтэй бол) эзлэхүүн ↑.',
          en: 'A chain of links: temperature ↑ → speed ↑ → collisions ↑ → pressure ↑ → (free piston) volume ↑.'
        },
        student: { mn: 'Гинжийг дэвтэртээ бичнэ.', en: 'Write the chain in the notebook.' },
        evidence: { mn: 'Гинж зөв.', en: 'The chain is correct.' }
      }),
      step(7, {
        title: { mn: 'Гүйцэтгэлийг сайжруулах арга хэмжээ', en: 'Improve performance' },
        teacher: {
          mn: 'Нийтлэг алдаа: "халахад бөөмс томордог"; "даралт өсөхөд бөөмсийн хоорондох зай нэмэгддэг".',
          en: 'Common errors: "the particles get bigger when heated"; "the spaces between particles increase when pressure rises".'
        },
        student: { mn: 'Хоёр өгүүлбэрийг засна.', en: 'Correct both sentences.' },
        evidence: { mn: 'Бөөмсийн хэмжээ өөрчлөгдөхгүй; даралт нэмэгдэхэд зай буурна.', en: 'The particle size does not change; the spaces decrease as pressure rises.' }
      }),
      step(8, {
        title: { mn: 'Үр дүнгээ үнэлэх', en: 'Assess the outcome' },
        teacher: { mn: 'Гарах билет: гурван асуулт.', en: 'Exit ticket: three questions.' },
        student: { mn: 'Бие даан хариулна.', en: 'Answer on your own.' },
        evidence: { mn: 'Гарах билетийн оноо.', en: 'Exit ticket score.' }
      }),
      step(9, {
        title: { mn: 'Эзэмшсэн мэдлэгийн ач холбогдол', en: 'Why it matters' },
        teacher: {
          mn: 'Аэрозол савыг халаахгүй байх шалтгааныг бодит аюулаар холбоно.',
          en: 'Connect to the real danger: why aerosol cans must not be heated.'
        },
        student: { mn: 'Нэг аюулгүй байдлын дүрмийг нэрлэнэ.', en: 'Name one safety rule.' },
        evidence: { mn: 'Дүрмийг шалтгаантай холбосон.', en: 'Links the rule to its reason.' }
      })
    ],
    quiz: [
      {
        question: { mn: 'Тогтмол даралтанд хийг халахад эзлэхүүн юу болох вэ?', en: 'At constant pressure, what happens to the volume when a gas is heated?' },
        options: [
          { mn: 'Буурна', en: 'It decreases' },
          { mn: 'Нэмэгдэнэ', en: 'It increases' },
          { mn: 'Өөрчлөгдөхгүй', en: 'It stays the same' }
        ],
        answer: 1,
        explanation: {
          mn: 'Бөөмс хурдан хөдөлж ханатай илүү хүчтэй мөргөлдөнө; поршен урагш түлхэгдэж эзлэхүүн нэмэгдэнэ.',
          en: 'The particles move faster and push harder on the piston, so the volume increases.'
        }
      },
      {
        question: { mn: 'Тогтмол температурт хийг шахвал даралт юу болох вэ?', en: 'At constant temperature, what happens to the pressure when a gas is compressed?' },
        options: [
          { mn: 'Буурна', en: 'It decreases' },
          { mn: 'Нэмэгдэнэ', en: 'It increases' },
          { mn: 'Өөрчлөгдөхгүй', en: 'It stays the same' }
        ],
        answer: 1,
        explanation: {
          mn: 'Эзлэхүүн багасахад бөөмс ойртож, ханатай секундэд илүү олон мөргөлдөнө; даралт нэмэгдэнэ.',
          en: 'Smaller volume brings the particles closer, so they hit the walls more often; the pressure rises.'
        }
      },
      {
        question: { mn: 'Хийн бөөмсийн хэмжээ температураас хамаарах уу?', en: 'Does the size of gas particles depend on temperature?' },
        options: [
          { mn: 'Тийм, халахад томордог', en: 'Yes, they grow when heated' },
          { mn: 'Үгүй, бөөмсийн хэмжээ өөрчлөгдөхгүй', en: 'No, their size does not change' },
          { mn: 'Тийм, хөрөхөд томордог', en: 'Yes, they grow when cooled' }
        ],
        answer: 1,
        explanation: {
          mn: 'Температур өөрчлөгдөхөд өөрчлөгддөг зүйл нь бөөмсийн хурд; бөөмсийн хэмжээ биш.',
          en: 'What changes with temperature is the speed of the particles, not their size.'
        }
      }
    ]
  },
  {
    id: 'states-4',
    number: 4,
    title: { mn: 'Диффуз', en: 'Diffusion' },
    los: [
      { code: '1.2.1', core: true },
      { code: '1.2.2', core: false }
    ],
    objective: {
      mn: 'Диффузийг кинетик бөөмийн онолоор тодорхойлж, тайлбарлах; харьцангуй молекул масс хийн диффузийн хурдад үзүүлэх нөлөөг тайлбарлах.',
      en: 'Describe and explain diffusion with kinetic particle theory, and the effect of relative molecular mass on the rate of diffusion of gases.'
    },
    keyPoints: [
      {
        mn: 'Диффуз: бөөмсийн санамсаргүй хөдөлгөөнөөр, өндөр концентрацаас бага концентраци руу бөөмсийн цэвэр шилжилт.',
        en: 'Diffusion: the net movement of particles from a higher to a lower concentration, caused by their random motion.'
      },
      {
        mn: 'Хийн диффуз шингэнээс хурдан; температур өндөр бол хурдан. Ижил температурт хөнгөн молекул илүү хурдан хөдөлнө.',
        en: 'Diffusion is faster in gases than in liquids, and faster when hot. At the same temperature, lighter molecules move faster.'
      },
      {
        mn: 'NH₃ ба HCl-ийн хоолойд цагаан NH₄Cl-ийн бөгж HCl-ийн үзүүрт ойр үүснэ, учир нь NH₃ хөнгөн тул хурдан тархана.',
        en: 'In the NH₃ and HCl tube the white ring of NH₄Cl forms nearer the HCl end, because the lighter NH₃ diffuses faster.'
      }
    ],
    steps: [
      step(0, {
        title: { mn: 'Сурах сэдэл үүсгэх', en: 'Create motivation' },
        teacher: {
          mn: 'Савны нэг үзүүрт үнэртэй шингэн дуслахад бүх өрөөнд үнэр хэрхэн тархдаг вэ гэж асууна.',
          en: 'Ask how a smell spreads through a whole room after one drop of scented liquid is placed in a corner.'
        },
        student: { mn: 'Таамаглаж бичнэ.', en: 'Make a prediction and write it down.' },
        evidence: { mn: 'Таамаглал илэрсэн.', en: 'Predictions revealed.' }
      }),
      step(1, {
        title: { mn: 'Суралцахуйн зорилгыг томъёолох', en: 'State the learning objective' },
        teacher: {
          mn: 'Зорилго: диффузийг тодорхойлох, молекул массын нөлөөг тайлбарлах.',
          en: 'Objective: describe diffusion and explain the effect of molecular mass.'
        },
        student: { mn: 'Зорилгыг давтана.', en: 'Repeat the objective.' },
        evidence: { mn: 'Зорилгыг ойлгосон.', en: 'Understands the objective.' }
      }),
      step(2, {
        title: { mn: 'Суралцахуйн үйл ажиллагааг төлөвлөх', en: 'Plan the learning activity' },
        teacher: {
          mn: 'POE: NH₃ ба HCl-ийн хоолойд цагаан бөгж аль үзүүрт үүсэхийг таамаглуулна.',
          en: 'POE: students predict which end of the NH₃ and HCl tube the white ring forms nearer.'
        },
        student: { mn: 'Таамаглал бичнэ.', en: 'Write a prediction.' },
        evidence: { mn: 'Таамаглал бичсэн.', en: 'Prediction written.' }
      }),
      step(3, {
        title: { mn: 'Судлагдахууны агуулгыг элементарчилж эзэмшүүлэх', en: 'Teach the content in small steps' },
        teacher: {
          mn: 'Диффузийн симуляцийг асаана; бөөмс санамсаргүй хөдөлж, цагаан бөгж үүснийг тайлбарлана.',
          en: 'Run the diffusion simulation; explain the random motion and the ring forming where the two gases meet.'
        },
        student: { mn: 'Симуляцийг ажиглаж, бөгжийн байрлалыг хэмжинэ.', en: 'Watch the simulation and measure where the ring forms.' },
        evidence: { mn: 'Бөгж HCl-ийн үзүүрт ойр үүснэ гэж ажигласан.', en: 'Observes the ring nearer the HCl end.' }
      }),
      step(4, {
        title: { mn: 'Судлагдахууны агуулгад оюуны боловсруулалт хийх', en: 'Think about the content' },
        teacher: {
          mn: 'Хоёр асуулт: (1) Температур өсвөл яах вэ? (2) Яагаад бөгж яг дундуур биш вэ? Хосоороо хариулна.',
          en: 'Two questions: (1) What if the temperature is higher? (2) Why is the ring not exactly in the middle? Answer in pairs.'
        },
        student: { mn: 'Температурын өөрчлөлтийг симуляцид шалгана.', en: 'Check the temperature change in the simulation.' },
        evidence: { mn: 'Температур өсвөл диффуз хурдан, бөгжийн байрлал ижил гэж хэлсэн.', en: 'States that a higher temperature speeds up diffusion and the ring position stays the same.' }
      }),
      step(5, {
        title: { mn: 'Олон хэлбэрийн хэрэглээ', en: 'Apply in several ways' },
        teacher: {
          mn: 'Үнэрт бодис, бромын уурын тархалт; цайны уутыг усанд хийхэд ус хэрхэн будагдах (шингэн дэх диффуз удаан) гэж асууна.',
          en: 'Ask about perfume, bromine vapour, and how a tea bag colours water (diffusion in liquids is slow).'
        },
        student: { mn: 'Тайлбарлана.', en: 'Explain each one.' },
        evidence: { mn: 'Хий ба шингэний диффузийн хурдыг харьцуулсан.', en: 'Compares diffusion in gases and liquids.' }
      }),
      step(6, {
        title: { mn: 'Үйл ажиллагааны гүйцэтгэлийг хянан нэгтгэх', en: 'Summarise the learning' },
        teacher: {
          mn: 'Харьцуулалтын хүснэгт: хий ба шингэн; халуун ба хүйтэн; хөнгөн ба хүнд молекул.',
          en: 'A comparison table: gas and liquid; hot and cold; light and heavy molecules.'
        },
        student: { mn: 'Хүснэгтийг бөглөнө.', en: 'Fill in the table.' },
        evidence: { mn: 'Хүснэгт зөв.', en: 'The table is correct.' }
      }),
      step(7, {
        title: { mn: 'Гүйцэтгэлийг сайжруулах арга хэмжээ', en: 'Improve performance' },
        teacher: {
          mn: 'Нийтлэг алдаа: "диффуз зөвхөн агаарт явагдана"; "бөөмс урсгалаар зөөгдөнө"; "хөнгөн бөөмс огт хөдөлдөггүй".',
          en: 'Common errors: "diffusion happens only in air"; "particles are carried by a flow"; "light particles do not move".'
        },
        student: { mn: 'Гурван өгүүлбэрийг засна.', en: 'Correct the three sentences.' },
        evidence: { mn: 'Диффуз санамсаргүй хөдөлгөөнөөс үүснэ; бүх бөөмс хөдөлнө.', en: 'Diffusion results from random motion; all particles move.' }
      }),
      step(8, {
        title: { mn: 'Үр дүнгээ үнэлэх', en: 'Assess the outcome' },
        teacher: { mn: 'Гарах билет: гурван асуулт.', en: 'Exit ticket: three questions.' },
        student: { mn: 'Бие даан хариулна.', en: 'Answer on your own.' },
        evidence: { mn: 'Гарах билетийн оноо.', en: 'Exit ticket score.' }
      }),
      step(9, {
        title: { mn: 'Эзэмшсэн мэдлэгийн ач холбогдол', en: 'Why it matters' },
        teacher: {
          mn: 'Амьсгалын үед O₂ ба CO₂ хоорондоо диффуз замаар солилцоно гэдгийг холбоно.',
          en: 'Connect to gas exchange in the lungs, where O₂ and CO₂ move by diffusion.'
        },
        student: { mn: 'Нэг жишээ нэрлэнэ.', en: 'Name one example.' },
        evidence: { mn: 'Жишээг холбосон.', en: 'Connects an example.' }
      })
    ],
    quiz: [
      {
        question: { mn: 'Диффуз ямар шалтгаанаар явагдах вэ?', en: 'What causes diffusion?' },
        options: [
          { mn: 'Урсгал, шахалт', en: 'A flow or a push' },
          { mn: 'Бөөмсийн санамсаргүй хөдөлгөөн', en: 'The random motion of particles' },
          { mn: 'Савны хана', en: 'The walls of the container' }
        ],
        answer: 1,
        explanation: {
          mn: 'Диффуз нь бөөмсийн санамсаргүй хөдөлгөөнөөс үүснэ; өндөр концентрацаас бага концентраци руу цэвэр шилжилт явагдана.',
          en: 'Diffusion results from the random motion of particles; there is a net movement from high to low concentration.'
        }
      },
      {
        question: { mn: 'NH₃ ба HCl-ийн хоолойд цагаан бөгж аль үзүүрт ойр үүсэх вэ?', en: 'Which end is the white ring nearer in the NH₃ and HCl tube?' },
        options: [
          { mn: 'NH₃-ийн үзүүрт', en: 'The NH₃ end' },
          { mn: 'HCl-ийн үзүүрт', en: 'The HCl end' },
          { mn: 'Яг дундуур', en: 'Exactly in the middle' }
        ],
        answer: 1,
        explanation: {
          mn: 'NH₃-ийн молекул масс (17) HCl (36.5)-аас бага тул NH₃ хурдан тархаж, бөгж HCl-ийн үзүүрт ойр үүснэ.',
          en: 'NH₃ (Mr 17) is lighter than HCl (Mr 36.5), so it diffuses faster and the ring forms nearer the HCl end.'
        }
      },
      {
        question: { mn: 'Ижил температурт аль нь хамгийн хурдан диффуз болох вэ?', en: 'At the same temperature, which diffuses fastest?' },
        options: [
          { mn: 'Шингэн дэх хүнд молекул', en: 'A heavy molecule in a liquid' },
          { mn: 'Хий дэх хөнгөн молекул', en: 'A light molecule in a gas' },
          { mn: 'Хатуу биет дэх молекул', en: 'A molecule in a solid' }
        ],
        answer: 1,
        explanation: {
          mn: 'Хий шингэнээс хурдан диффуз; хөнгөн молекул ижил температурт илүү хурдан хөдөлнө.',
          en: 'Diffusion is faster in gases than in liquids, and lighter molecules move faster at the same temperature.'
        }
      }
    ]
  }
];
