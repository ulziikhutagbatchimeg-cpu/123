import type { Bi, QuizItem } from './statesLessons';

// Extra material for the four chapter 1 lessons: a quick check after the simulation, and the links to the
// Periodic Table section (8) that the lesson content depends on. Keyed by lesson id.

export interface PeriodicLink {
  ref: '8.2' | '8.3' | '8.5'; // the 0620 subsection in the Periodic Table section
  code: string; // the statement code, for example 8.3.2
  reason: Bi;
}

export const PERIODIC_LINKS: Record<string, PeriodicLink[]> = {
  'states-1': [
    {
      ref: '8.3',
      code: '8.3.2',
      reason: {
        mn: 'r.t.p.-д хлор хий, бром шингэн, иод хатуу. Бөөмсийн загвараар төлөвийн ялгааг тайлбарлана.',
        en: 'At r.t.p. chlorine is a gas, bromine a liquid and iodine a solid. Explain the difference in states with the particle model.'
      }
    },
    {
      ref: '8.5',
      code: '8.5.1',
      reason: {
        mn: 'Инертийн хий моноатом хий: атом бүр ганцаараа байна. Хийн бөөмсийн загварт тохирно.',
        en: 'Noble gases are monatomic gases: each atom exists alone, which fits the gas particle model.'
      }
    }
  ],
  'states-2': [
    {
      ref: '8.2',
      code: '8.2.1',
      reason: {
        mn: 'I бүлгээр доош хайлах цэг буурна. Хайлах цэгийг бүлгээр харьцуулж тайлбарлана.',
        en: 'The melting point decreases down Group I. Compare melting points down the group when explaining changes of state.'
      }
    },
    {
      ref: '8.3',
      code: '8.3.2',
      reason: {
        mn: 'Галогенүүдийн r.t.p. дахь төлөв (хий, шингэн, хатуу) төлөв өөрчлөлтийн жишээ.',
        en: 'The states of the halogens at r.t.p. (gas, liquid, solid) are examples of the states of matter.'
      }
    }
  ],
  'states-3': [
    {
      ref: '8.5',
      code: '8.5.1',
      reason: {
        mn: 'Инертийн хий хий хэлбэрээр байж, савыг бүрэн дүүргэнэ. Эзлэхүүн ба даралтын жишээ.',
        en: 'Noble gases are gases that fill their container. They are an example for gas volume and pressure.'
      }
    }
  ],
  'states-4': [
    {
      ref: '8.3',
      code: '8.3.2',
      reason: {
        mn: 'Бромын шингэн хүрэн уур ялгаруулж, агаарт тархана. Диффузийг харагдуулсан жишээ.',
        en: 'Liquid bromine gives off a brown vapour that spreads through the air. A visible example of diffusion.'
      }
    }
  ]
};

export const QUICK_CHECKS: Record<string, QuizItem[]> = {
  'states-1': [
    {
      question: { mn: 'r.t.p.-д аль галоген шингэн байдаг вэ?', en: 'Which halogen is a liquid at room temperature?' },
      options: [
        { mn: 'Хлор', en: 'Chlorine' },
        { mn: 'Бром', en: 'Bromine' },
        { mn: 'Иод', en: 'Iodine' }
      ],
      answer: 1,
      explanation: {
        mn: 'Хлор хий, бром улаан-хүрэн шингэн, иод саарал-хар хатуу (r.t.p.).',
        en: 'At r.t.p. chlorine is a gas, bromine a red-brown liquid and iodine a grey-black solid.'
      }
    },
    {
      question: { mn: 'Инертийн хий яагаад моноатом (ганц атомтай) байдаг вэ?', en: 'Why are noble gases monatomic?' },
      options: [
        { mn: 'Гаднах бүрхүүл нь бүтэн тул бусадтай электрон хуваалцах шаардлагагүй', en: 'Their outer shell is full, so they do not need to share electrons' },
        { mn: 'Бусад хийгээс хүнд учраас', en: 'Because they are heavier than other gases' },
        { mn: 'Электрон огт байдаггүй учраас', en: 'Because they have no electrons' }
      ],
      answer: 0,
      explanation: {
        mn: 'Бүтэн гаднах бүрхүүлтэй тул урвалд ордоггүй, атом тус бүр ганцаараа хий болдог.',
        en: 'With a full outer shell they are unreactive, and each atom exists alone as a gas.'
      }
    },
    {
      question: { mn: 'Хийн бөөмс хоорондоо ямар байдалтай байдаг вэ?', en: 'How are the particles of a gas arranged?' },
      options: [
        { mn: 'Эмх цэгцтэй торонд нягт', en: 'Touching each other in a regular pattern' },
        { mn: 'Маш хол, санамсаргүй, хурдан хөдөлнө', en: 'Far apart, moving randomly and rapidly' },
        { mn: 'Тогтсон байрлалд бэхлэгдсэн', en: 'Fixed in position' }
      ],
      answer: 1,
      explanation: {
        mn: 'Хийн бөөмс хоорондоо хол, бүх чиглэлд хурдан хөдөлнө.',
        en: 'Gas particles are far apart and move rapidly in all directions.'
      }
    }
  ],
  'states-2': [
    {
      question: { mn: 'Усны халаалтын муруйн 100 °C-ийн хэвтээ хэсэг юуг илэрхийлэх вэ?', en: 'What does the flat part of the water heating curve at 100 °C show?' },
      options: [
        { mn: 'Хайлах', en: 'Melting' },
        { mn: 'Буцлах', en: 'Boiling' },
        { mn: 'Хөрөх', en: 'Freezing' }
      ],
      answer: 1,
      explanation: {
        mn: '100 °C-т шингэн хий болно (буцлах). Энэ үед температур тогтмол, нийлүүлсэн энерги бөөмсийн хоорондын холбоог таслахад зарцуулагдана.',
        en: 'At 100 °C the liquid turns into gas (boiling). The temperature is constant while the energy supplied breaks the forces between particles.'
      }
    },
    {
      question: { mn: 'I бүлгээр доош (Li → Cs) хайлах цэг юу болох вэ?', en: 'Going down Group I (Li → Cs), what happens to the melting point?' },
      options: [
        { mn: 'Нэмэгдэнэ', en: 'It increases' },
        { mn: 'Буурна', en: 'It decreases' },
        { mn: 'Өөрчлөгдөхгүй', en: 'It stays the same' }
      ],
      answer: 1,
      explanation: {
        mn: 'Атом томорч, металлын холбоо сулардаг тул хайлах цэг буурна (8.2.1).',
        en: 'The atoms get larger and the metallic bonding is weaker, so the melting point decreases (8.2.1).'
      }
    },
    {
      question: { mn: 'Буцлах явцад нийлүүлсэн энерги юунд зарцуулагдах вэ?', en: 'During boiling, what is the energy supplied used for?' },
      options: [
        { mn: 'Бөөмсийн кинетик энергийг нэмэгдүүлж температурыг өсгөхөд', en: 'Raising the kinetic energy of the particles so the temperature rises' },
        { mn: 'Бөөмсийн хоорондын татах хүчийг даван туулахад', en: 'Overcoming the forces between particles' },
        { mn: 'Бөөмсийг жижигрүүлэхэд', en: 'Making the particles smaller' }
      ],
      answer: 1,
      explanation: {
        mn: 'Буцлах үед температур тогтмол байдаг, тиймээс энерги бөөмсийн хоорондын хүчийг даван туулахад зарцуулагдана.',
        en: 'The temperature stays constant during boiling, so the energy goes into breaking the forces between particles.'
      }
    }
  ],
  'states-3': [
    {
      question: { mn: 'Хатуу савт битүү хийг халахад даралт юу болох вэ?', en: 'A gas in a rigid sealed container is heated. What happens to its pressure?' },
      options: [
        { mn: 'Буурна', en: 'It decreases' },
        { mn: 'Нэмэгдэнэ', en: 'It increases' },
        { mn: 'Өөрчлөгдөхгүй', en: 'It stays the same' }
      ],
      answer: 1,
      explanation: {
        mn: 'Бөөмс хурдан хөдөлж, саванзийн ханатай илүү хүчтэй, илүү олон мөргөлдөнө.',
        en: 'The particles move faster and hit the walls harder and more often.'
      }
    },
    {
      question: { mn: 'Тогтмол температурт хийг шахахад даралт яагаад нэмэгддэг вэ?', en: 'Why does compressing a gas at constant temperature increase its pressure?' },
      options: [
        { mn: 'Бөөмс ойртож, ханатай илүү олон мөргөлдөнө', en: 'The particles are closer, so they hit the walls more often' },
        { mn: 'Бөөмс томордог', en: 'The particles get bigger' },
        { mn: 'Бөөмс хөдлөхөө больдог', en: 'The particles stop moving' }
      ],
      answer: 0,
      explanation: {
        mn: 'Эзлэхүүн багасахад бөөмсийн нягтрал нэмэгдэж, ханатай секундэд олон мөргөлдөнө.',
        en: 'When the volume falls, the particles are more crowded and hit the walls more often each second.'
      }
    },
    {
      question: { mn: 'Аргон r.t.p.-д хий. Энэ юуны улмаас вэ?', en: 'Argon is a gas at room temperature. Which best explains this?' },
      options: [
        { mn: 'Атом тус бүр ганцаараа байдаг бөгөөд атомуудын хооронд маш сул таталцал байдаг', en: 'Its atoms are monatomic and have very weak attractions between them' },
        { mn: 'Атомууд маш том учраас', en: 'Its atoms are very large' },
        { mn: 'Хайлах цэг маш өндөр учраас', en: 'It has a very high melting point' }
      ],
      answer: 0,
      explanation: {
        mn: 'Аргон моноатом бөгөөд атомын хоорондох татах хүч маш сул тул r.t.p.-д хий байна (8.5.1-тэй холбоотой).',
        en: 'Argon is monatomic with very weak attractions between atoms, so it is a gas at r.t.p. (linked to 8.5.1).'
      }
    }
  ],
  'states-4': [
    {
      question: { mn: 'Аль төлөвт диффуз хамгийн хурдан явагдах вэ?', en: 'In which state does diffusion happen fastest?' },
      options: [
        { mn: 'Хатуу', en: 'Solid' },
        { mn: 'Шингэн', en: 'Liquid' },
        { mn: 'Хий', en: 'Gas' }
      ],
      answer: 2,
      explanation: {
        mn: 'Хийн бөөмс хоорондоо хол, хурдан хөдөлдөг тул диффуз шингэнээс хурдан явагдана.',
        en: 'Gas particles are far apart and move quickly, so diffusion is faster than in liquids.'
      }
    },
    {
      question: { mn: 'NH₃ ба HCl-ийн хоолойг халаавал цагаан бөгж хаана үүсэх вэ?', en: 'If the NH₃ and HCl tube is heated, where does the white ring form?' },
      options: [
        { mn: 'Ижил газарт, гэхдээ илүү хурдан', en: 'In the same place, but sooner' },
        { mn: 'Яг дундуур', en: 'In the exact middle' },
        { mn: 'Огт үүсэхгүй', en: 'It does not form' }
      ],
      answer: 0,
      explanation: {
        mn: 'Халуун болгоход хоёр хий хоёулаа хурдан тархана; хурдны харьцаа өөрчлөгдөхгүй тул бөгж ижил байрлалд үүсэх боловч хурдан үүснэ.',
        en: 'Heating speeds up both gases by the same factor, so the ring keeps its position but forms sooner.'
      }
    },
    {
      question: { mn: 'Цайны уутыг усанд хийхэд ус удаан будагддаг нь юунаас вэ?', en: 'Why does a tea bag colour water slowly?' },
      options: [
        { mn: 'Шингэн дэх бөөмс ойрхон, чөлөөтэй хөдөлж чадахгүй тул диффуз удаан', en: 'Particles in a liquid are close and move less freely, so diffusion is slower' },
        { mn: 'Шингэнд бөөмс байдаггүй', en: 'Liquids have no particles' },
        { mn: 'Цайны уут диффузийг зогсооно', en: 'The tea bag stops diffusion' }
      ],
      answer: 0,
      explanation: {
        mn: 'Шингэний бөөмс нягт тул тэдгээрийн хөдөлгөөн хийнээс удаан; тиймээс диффуз удаан явагдана.',
        en: 'Liquid particles are close together, so they diffuse more slowly than gas particles.'
      }
    }
  ]
};
