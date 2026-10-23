import type { Bi } from './statesLessons';

// Support material for the four chapter 1 lessons: the key words glossary (shown first in each lesson) and the
// independent practice, graded by difficulty. The items are written for this course from the 0620 learning outcomes
// of chapter 1 (1.1.1–1.1.6, 1.2.1–1.2.2). They are not copied from the coursebook.

export interface GlossaryTerm {
  term: Bi;
  def: Bi;
}

export const STATES_GLOSSARY: Record<string, GlossaryTerm[]> = {
  'states-1': [
    {
      term: { mn: 'Бөөмс (particle)', en: 'Particle' },
      def: { mn: 'Атом, молекул эсвэл ион; бодисыг бүрдүүлэгч жижиг нэгж.', en: 'An atom, molecule or ion; the small units that make up a substance.' }
    },
    {
      term: { mn: 'Хатуу (solid)', en: 'Solid' },
      def: { mn: 'Тогтсон хэлбэр ба эзлэхүүнтэй; бөөмс нягт, эмх цэгцтэй байрлана.', en: 'Has a fixed shape and volume; particles are close in a regular arrangement.' }
    },
    {
      term: { mn: 'Шингэн (liquid)', en: 'Liquid' },
      def: { mn: 'Тогтсон эзлэхүүнтэй, савныхаа хэлбэрийг авна; бөөмс нягт, санамсаргүй байрлана.', en: 'Has a fixed volume and takes the shape of its container; particles are close and random.' }
    },
    {
      term: { mn: 'Хий (gas)', en: 'Gas' },
      def: { mn: 'Тогтсон хэлбэр, эзлэхүүнгүй; савыг бүрэн дүүргэнэ; бөөмс хоорондоо хол.', en: 'No fixed shape or volume; fills its container; particles are far apart.' }
    },
    {
      term: { mn: 'Чичирхийлэх (vibrate)', en: 'Vibrate' },
      def: { mn: 'Бөөмс тогтсон байрлалынхаа эргэн тойронд түр зуур хөдлөх.', en: 'Particles move back and forth about a fixed position.' }
    },
    {
      term: { mn: 'Кинетик бөөмийн онол', en: 'Kinetic particle theory' },
      def: { mn: 'Бүх бодис хөдөлгөөнтэй бөөмсөөс бүрдэж, төлөв нь бөөмсийн зай, байрлал, хөдөлгөөнөөр тайлагдана гэсэн онол.', en: 'All matter is made of moving particles, and the state is explained by their separation, arrangement and motion.' }
    }
  ],
  'states-2': [
    {
      term: { mn: 'Хайлах (melting)', en: 'Melting' },
      def: { mn: 'Хатуу бодис хайлмал болон шингэн болох төлөв өөрчлөлт.', en: 'The change of state from solid to liquid.' }
    },
    {
      term: { mn: 'Буцлах (boiling)', en: 'Boiling' },
      def: { mn: 'Шингэн бүх эзлэхүүнээрээ буцлаж хий болох; буцлах цэгт явагдана.', en: 'Liquid turns into gas throughout its volume, at the boiling point.' }
    },
    {
      term: { mn: 'Уурших (evaporation)', en: 'Evaporation' },
      def: { mn: 'Шингэний гадаргуу дээрх бөөмс хий болж зугтах; ямар ч температурт явагдана.', en: 'Particles escape from the surface of a liquid into a gas, at any temperature.' }
    },
    {
      term: { mn: 'Хөрөх (freezing)', en: 'Freezing' },
      def: { mn: 'Шингэн хатуу болох төлөв өөрчлөлт; энерги ялгарна.', en: 'The change from liquid to solid; energy is released.' }
    },
    {
      term: { mn: 'Конденсаци (condensation)', en: 'Condensation' },
      def: { mn: 'Хий шингэн болох төлөв өөрчлөлт; энерги ялгарна.', en: 'The change from gas to liquid; energy is released.' }
    },
    {
      term: { mn: 'Халаалтын муруй (heating curve)', en: 'Heating curve' },
      def: { mn: 'Халаах үед температур ба хугацааны график; хэвтээ хэсэгт температур тогтмол байна.', en: 'A graph of temperature against time while heating; the flat parts show constant temperature.' }
    }
  ],
  'states-3': [
    {
      term: { mn: 'Даралт (pressure)', en: 'Pressure' },
      def: { mn: 'Хийн бөөмс саванзийн ханатай мөргөлдөж үүсгэх хүч.', en: 'The force produced by gas particles colliding with the walls of the container.' }
    },
    {
      term: { mn: 'Эзлэхүүн (volume)', en: 'Volume' },
      def: { mn: 'Хийг агуулж буй орон зай; хийн хувьд савны эзлэхүүнтэй тэнцүү.', en: 'The space the gas occupies; for a gas it equals the volume of its container.' }
    },
    {
      term: { mn: 'Мөргөлдөөн (collision)', en: 'Collision' },
      def: { mn: 'Хийн бөөмс савны хана эсвэл бусад бөөмстэй мөргөлдөх.', en: 'A gas particle hitting the container wall or another particle.' }
    },
    {
      term: { mn: 'Температур (temperature)', en: 'Temperature' },
      def: { mn: 'Бөөмсийн дундаж кинетик энергийн хэмжүүр.', en: 'A measure of the average kinetic energy of the particles.' }
    },
    {
      term: { mn: 'Кинетик энерги (kinetic energy)', en: 'Kinetic energy' },
      def: { mn: 'Хөдөлгөөнтэй бөөмсийн энерги.', en: 'The energy a particle has because it is moving.' }
    },
    {
      term: { mn: 'Поршень (piston)', en: 'Piston' },
      def: { mn: 'Саванд хөдөлж чадах хавтан; хийн эзлэхүүнийг өөрчлөхөд ашиглана.', en: 'A plate that moves inside a container; used to change the volume of a gas.' }
    }
  ],
  'states-4': [
    {
      term: { mn: 'Диффуз (diffusion)', en: 'Diffusion' },
      def: { mn: 'Бөөмсийн санамсаргүй хөдөлгөөнөөр өндөр концентрацаас бага концентраци рүү цэвэр шилжилт.', en: 'The net movement of particles from a higher to a lower concentration, caused by their random motion.' }
    },
    {
      term: { mn: 'Концентраци (concentration)', en: 'Concentration' },
      def: { mn: 'Тодорхой эзлэхүүн дэх бөөмсийн тоо.', en: 'The number of particles in a given volume.' }
    },
    {
      term: { mn: 'Санамсаргүй хөдөлгөөн (random motion)', en: 'Random motion' },
      def: { mn: 'Бөөмс аль ч чиглэлд тогтмол бус хөдөлдөг хөдөлгөөн.', en: 'Particles moving in all directions without a fixed pattern.' }
    },
    {
      term: { mn: 'Харьцангуй молекул масс, Mr (relative molecular mass)', en: 'Relative molecular mass, Mr' },
      def: { mn: 'Молекулын масс, ¹²C-ийн массын 1/12-той харьцуулсан харьцаа.', en: 'The mass of a molecule compared with one twelfth of the mass of a carbon-12 atom.' }
    },
    {
      term: { mn: 'Диффузийн хурд (rate of diffusion)', en: 'Rate of diffusion' },
      def: { mn: 'Хийн бөөмс тархах хурд; температур өсөхөд нэмэгдэж, Mr-ээс хамаарна.', en: 'How fast gas particles spread; it increases with temperature and depends on Mr.' }
    }
  ]
};

export interface PracticeItem {
  level: 'easy' | 'medium' | 'hard';
  prompt: Bi;
  options?: Bi[]; // easy and medium: choose one
  answer?: number; // index of the correct option
  model?: Bi; // hard: a model answer to compare with the student's own answer
  explanation: Bi;
}

export const STATES_PRACTICE: Record<string, PracticeItem[]> = {
  'states-1': [
    {
      level: 'easy',
      prompt: { mn: 'Хатуу биетийн бөөмсийн байдлыг аль нь зөв дүрсэлсэн бэ?', en: 'Which statement correctly describes the particles of a solid?' },
      options: [
        { mn: 'Бөөмс хоорондоо хол, санамсаргүй хөдөлнө', en: 'Particles are far apart and move randomly' },
        { mn: 'Бөөмс нягт, эмх цэгцтэй байрлаж, тогтсон байрлалынхаа эргэн тойронд чичирдэг', en: 'Particles are close in a regular arrangement and vibrate about fixed positions' },
        { mn: 'Бөөмс бие биенийхээ дээр гулсдаг', en: 'Particles slide past each other' }
      ],
      answer: 1,
      explanation: { mn: 'Хатуу биетийн бөөмс тогтсон байрлалтай, чичирдэг.', en: 'Solid particles have fixed positions and vibrate about them.' }
    },
    {
      level: 'easy',
      prompt: { mn: 'Шингэний тухай аль өгүүлбэр зөв вэ?', en: 'Which statement about a liquid is correct?' },
      options: [
        { mn: 'Тогтсон хэлбэр, тогтсон эзлэхүүнтэй', en: 'Has a fixed shape and a fixed volume' },
        { mn: 'Тогтсон эзлэхүүнтэй, гэхдээ тогтсон хэлбэргүй', en: 'Has a fixed volume but no fixed shape' },
        { mn: 'Эзлэхүүнгүй', en: 'Has no fixed volume' }
      ],
      answer: 1,
      explanation: { mn: 'Шингэн савныхаа хэлбэрийг авч, эзлэхүүнээ хадгална.', en: 'A liquid takes the shape of its container but keeps its volume.' }
    },
    {
      level: 'medium',
      prompt: { mn: 'Хийг шахаж болдог, шингэнийг бараг шахагддаггүй. Яагаад вэ?', en: 'A gas can be compressed easily but a liquid hardly can. Why?' },
      options: [
        { mn: 'Хийн бөөмс хоорондоо хол тул ойртож чадна; шингэний бөөмс аль хэдийн нягт байдаг', en: 'Gas particles are far apart so they can move closer; liquid particles are already close together' },
        { mn: 'Шингэний бөөмс хэт жижиг', en: 'Liquid particles are too small' },
        { mn: 'Хий ямар ч бөөмсгүй', en: 'Gases have no particles' }
      ],
      answer: 0,
      explanation: { mn: 'Хоосон зай байгаа нь шахалтыг боломжтой болгодог.', en: 'The empty space between gas particles makes compression possible.' }
    },
    {
      level: 'medium',
      prompt: { mn: 'Хийг 2 дм³ саванаас 5 дм³ савд ижил температурт шилжүүлэв. Бөөмсөд юу тохиолдох вэ?', en: 'A gas in a 2 dm³ container is moved to a 5 dm³ container at the same temperature. What happens to the particles?' },
      options: [
        { mn: 'Бөөмс том саванд тархаж, бүх эзлэхүүнийг дүүргэнэ', en: 'They spread out to fill the larger container' },
        { mn: 'Бөөмс томордог', en: 'The particles become larger' },
        { mn: 'Бөөмс хөдөлгөөнөө зогсооно', en: 'The particles stop moving' }
      ],
      answer: 0,
      explanation: { mn: 'Хий савыг бүрэн дүүргэдэг; бөөмсийн тоо, хэмжээ өөрчлөгдөхгүй.', en: 'A gas fills its container; the number and size of particles do not change.' }
    },
    {
      level: 'hard',
      prompt: { mn: 'Бөөмсийн загвараар хатуу болон хийн бөөмсийн зай, байрлал, хөдөлгөөний ялгааг тайлбарла.', en: 'Using the particle model, describe the difference in separation, arrangement and motion between a solid and a gas.' },
      model: {
        mn: 'Хатуу: бөөмс нягт, эмх цэгцтэй торонд байрлана; тогтсон байрлалынхаа эргэн тойронд чичирдэг. Хий: бөөмс хоорондоо маш хол, санамсаргүй байрлалтай; бүх чиглэлд хурдан хөдөлнө.',
        en: 'Solid: particles are close in a regular lattice and vibrate about fixed positions. Gas: particles are far apart in a random arrangement and move rapidly in all directions.'
      },
      explanation: { mn: 'Гурван шинжийг нэг бүрчлэн тайлбарласан эсэхээ шалга: зай, байрлал, хөдөлгөөн.', en: 'Check that you described all three: separation, arrangement and motion.' }
    },
    {
      level: 'hard',
      prompt: { mn: 'Сурагч "хатуу бодисын бөөмс огт хөдөлдөггүй" гэж хэлсэн. Яагаад буруу вэ?', en: 'A student says "the particles in a solid do not move at all". Explain why this is wrong.' },
      model: {
        mn: 'Бөөмс тогтсон байрлалаа хадгалдаг боловч чичирдэг (кинетик энергитэй). Тэдгээр нь огт хөдөлгөөнгүй биш, зөвхөн байрлалаа сольдоггүй.',
        en: 'The particles keep their fixed positions but vibrate, so they have kinetic energy. They do not stop moving; they only do not change their positions.'
      },
      explanation: { mn: 'Тогтсон байрлал ≠ хөдөлгөөнгүй.', en: 'Fixed positions do not mean no motion.' }
    }
  ],
  'states-2': [
    {
      level: 'easy',
      prompt: { mn: 'Шингэн бүх эзлэхүүнээрээ, буцлах цэгт хий болох төлөв өөрчлөлтийг юу гэх вэ?', en: 'What is the change from liquid to gas called?' },
      options: [
        { mn: 'Конденсаци', en: 'Condensation' },
        { mn: 'Буцлах', en: 'Boiling' },
        { mn: 'Хөрөх', en: 'Freezing' }
      ],
      answer: 1,
      explanation: { mn: 'Шингэн хий болох нь буцлах (буцлах цэгт бүх эзлэхүүнд) эсвэл уурших (гадаргуу дээр) байж болно.', en: 'Liquid to gas can happen by boiling (throughout the liquid at the boiling point) or by evaporation (at the surface).' }
    },
    {
      level: 'easy',
      prompt: { mn: 'Цэвэр бодисын халаалтын муруйд температур тогтмол байх хэсэг юунд тохирох вэ?', en: 'In a heating curve of a pure substance, when is the temperature constant?' },
      options: [
        { mn: 'Хатуу бодисыг халаахад', en: 'When heating a solid' },
        { mn: 'Хайлах ба буцлах явцад', en: 'During melting and boiling' },
        { mn: 'Хийг хөргөхөд', en: 'When cooling a gas' }
      ],
      answer: 1,
      explanation: { mn: 'Хайлах ба буцлах явцад нийлүүлсэн энерги бөөмсийн хоорондын холбоог таслахад зарцуулагдана.', en: 'During melting and boiling the energy supplied breaks the forces between particles.' }
    },
    {
      level: 'medium',
      prompt: { mn: '0 °C-т мөс хайлж байна. Яагаад температур нэмэгдэхгүй вэ?', en: 'Ice is melting at 0 °C. Why does the temperature not rise?' },
      options: [
        { mn: 'Нийлүүлсэн энерги бөөмсийн хоорондын татах хүчийг даван туулахад зарцуулагдана', en: 'The energy supplied breaks the forces between particles' },
        { mn: 'Мөс бөөмсгүй', en: 'Ice has no particles' },
        { mn: 'Мөс энерги шингээдэггүй', en: 'Ice does not absorb energy' }
      ],
      answer: 0,
      explanation: { mn: 'Температур бөөмсийн кинетик энергийг илэрхийлдэг; хайлах үед энерги потенциал энергид орно.', en: 'Temperature reflects the kinetic energy of particles; during melting the energy goes into potential energy.' }
    },
    {
      level: 'medium',
      prompt: { mn: 'Уурших тухай аль өгүүлбэр зөв вэ?', en: 'Which statement about evaporation is correct?' },
      options: [
        { mn: 'Зөвхөн буцлах цэгт явагдана', en: 'It happens only at the boiling point' },
        { mn: 'Шингэний гадаргуу дээр ямар ч температурт явагдана', en: 'It happens at the surface at any temperature' },
        { mn: 'Шингэний бүх эзлэхүүнд явагдана', en: 'It happens throughout the liquid' }
      ],
      answer: 1,
      explanation: { mn: 'Буцлах нь бүх эзлэхүүнд, буцлах цэгт явагдана; уурших нь гадаргуу дээр.', en: 'Boiling happens throughout the liquid at the boiling point; evaporation happens at the surface.' }
    },
    {
      level: 'hard',
      prompt: { mn: 'Хөрөх муруйд (шингэн хөрөх) хэвтээ хэсэг, налуу хэсгүүдийг тайлбарла. Энерги хаана яаж хөдөлнө?', en: 'Describe a cooling curve for a liquid that freezes: the sloping and flat parts. Where does the energy go?' },
      model: {
        mn: 'Эхний налуу хэсэгт шингэн хөрч, температур буурна. Хэвтээ хэсэгт (хөрөх цэгт) шингэн хатуу болж байна; температур тогтмол, энерги ялгарч орчинд алдагдана. Сүүлийн налуу хэсэгт хатуу хөрч температур буурна.',
        en: 'First slope: the liquid cools and the temperature falls. Flat part (freezing point): the liquid solidifies; the temperature is constant and energy is released to the surroundings. Last slope: the solid cools and the temperature falls.'
      },
      explanation: { mn: 'Хэвтээ хэсэгт энерги ялгарч байгаа ба температур тогтмол.', en: 'On the flat part energy is released while the temperature stays constant.' }
    },
    {
      level: 'hard',
      prompt: { mn: 'Хөлрөх нь биеийг яагаад хөргөдөг вэ? Бөөмсийн онолоор тайлбарла.', en: 'Why does sweating cool the body? Explain with particle theory.' },
      model: {
        mn: 'Арьсан дээрх ус уурших үед хамгийн хурдан бөөмс (кинетик энергитэй) зугтаж, үлдсэн бөөмсийн дундаж энерги буурдаг. Энэ нь уурших явцад биеэс энерги шингээж, биеийг хөргөнө.',
        en: 'When water on the skin evaporates, the fastest particles (with the most kinetic energy) escape, so the average energy of the remaining particles falls. Evaporation takes in energy from the body, which cools it.'
      },
      explanation: { mn: 'Уурших нь энерги шингээдэг ба хамгийн хурдан бөөмс зугтдаг.', en: 'Evaporation takes in energy and the fastest particles escape.' }
    }
  ],
  'states-3': [
    {
      level: 'easy',
      prompt: { mn: 'Хийг тогтмол даралтанд халахад эзлэхүүн юу болох вэ?', en: 'When a gas is heated at constant pressure, what happens to its volume?' },
      options: [
        { mn: 'Буурна', en: 'It decreases' },
        { mn: 'Нэмэгдэнэ', en: 'It increases' },
        { mn: 'Өөрчлөгдөхгүй', en: 'It stays the same' }
      ],
      answer: 1,
      explanation: { mn: 'Бөөмс хурдан хөдөлж, поршенийг илүү түлхэж эзлэхүүн нэмэгдэнэ.', en: 'The particles move faster and push the piston harder, so the volume increases.' }
    },
    {
      level: 'easy',
      prompt: { mn: 'Хийн даралт юунаас үүсдэг вэ?', en: 'What causes the pressure of a gas?' },
      options: [
        { mn: 'Бөөмс савны ханатай мөргөлдөхөөс', en: 'Particles colliding with the walls of the container' },
        { mn: 'Бөөмс бие биендээ наалдахаас', en: 'Particles sticking to each other' },
        { mn: 'Бөөмс хөдөлгөөнгүй байснаас', en: 'Particles being still' }
      ],
      answer: 0,
      explanation: { mn: 'Хийн даралт нь бөөмсийн савны ханатай мөргөлдөх мөргөлдөөнөөс үүснэ.', en: 'Gas pressure comes from particles hitting the container walls.' }
    },
    {
      level: 'medium',
      prompt: { mn: 'Битүү саванд (тогтмол эзлэхүүн) хийг халахад даралт юу болох вэ?', en: 'A gas in a sealed container of fixed volume is heated. What happens to the pressure?' },
      options: [
        { mn: 'Буурна', en: 'It decreases' },
        { mn: 'Нэмэгдэнэ', en: 'It increases' },
        { mn: 'Өөрчлөгдөхгүй', en: 'It stays the same' }
      ],
      answer: 1,
      explanation: { mn: 'Бөөмс хурдан хөдөлж, ханатай илүү хүчтэй, илүү олон мөргөлдөнө.', en: 'The particles move faster and hit the walls harder and more often.' }
    },
    {
      level: 'medium',
      prompt: { mn: 'Тогтмол температурт хийг шахвал даралт яагаад нэмэгддэг вэ?', en: 'Why does compressing a gas at constant temperature increase the pressure?' },
      options: [
        { mn: 'Бөөмс ойртож, ханатай секундэд илүү олон мөргөлдөнө', en: 'The particles are closer, so they hit the walls more often each second' },
        { mn: 'Бөөмс томордог', en: 'The particles get bigger' },
        { mn: 'Бөөмс хөдлөхөө зогсооно', en: 'The particles stop moving' }
      ],
      answer: 0,
      explanation: { mn: 'Эзлэхүүн буурахад бөөмсийн нягтрал нэмэгдэж, мөргөлдөөн олон болно.', en: 'With less volume the particles are more crowded and collide with the walls more often.' }
    },
    {
      level: 'hard',
      prompt: { mn: 'Кинетик онолоор яагаад халуун өдөр бөмбөлөг томордог вэ? Тайлбарла.', en: 'Using kinetic theory, explain why a balloon expands on a hot day.' },
      model: {
        mn: 'Температур өсөхөд бөөмс хурдан хөдөлж, бөмбөлгийн ханатай илүү хүчтэй, илүү олон мөргөлдөнө. Энэ нь даралтыг нэмэгдүүлж, бөмбөлгийг томруулна.',
        en: 'At higher temperature the particles move faster and hit the balloon wall harder and more often. This raises the pressure inside and the balloon expands.'
      },
      explanation: { mn: 'Температур → хурд → мөргөлдөөн → даралт → эзлэхүүн.', en: 'Temperature → speed → collisions → pressure → volume.' }
    },
    {
      level: 'hard',
      prompt: { mn: 'Тогтмол температурт тодорхой хэмжээ хий 60 см³-т 100 kPa даралттай байна. Эзлэхүүн 30 см³ болбол даралт юу болох вэ? Тайлбарла.', en: 'A fixed mass of gas at constant temperature occupies 60 cm³ at 100 kPa. The volume is reduced to 30 cm³. What happens to the pressure? Explain.' },
      model: {
        mn: 'Даралт нэмэгдэнэ (ойролцоогоор 200 kPa). Температур тогтмол тул бөөмсийн хурд өөрчлөгдөхгүй; эзлэхүүн хагасаар багасахад бөөмс ойртож, ханатай хоёр дахин олон мөргөлдөнө.',
        en: 'The pressure increases (to about 200 kPa). The temperature is constant, so the particle speed is the same; with half the volume the particles are closer and hit the walls about twice as often.'
      },
      explanation: { mn: 'Тогтмол температурт даралт эзлэхүүнтэй урвуу пропорциональ.', en: 'At constant temperature the pressure is inversely proportional to the volume.' }
    }
  ],
  'states-4': [
    {
      level: 'easy',
      prompt: { mn: 'Диффуз юунаас үүсдэг вэ?', en: 'What causes diffusion?' },
      options: [
        { mn: 'Урсгал эсвэл шахалт', en: 'A flow or a push' },
        { mn: 'Бөөмсийн санамсаргүй хөдөлгөөн', en: 'The random motion of particles' },
        { mn: 'Савны хана', en: 'The walls of the container' }
      ],
      answer: 1,
      explanation: { mn: 'Диффуз бөөмсийн санамсаргүй хөдөлгөөнөөс үүснэ.', en: 'Diffusion results from the random motion of particles.' }
    },
    {
      level: 'easy',
      prompt: { mn: 'Диффуз аль төлөвт хамгийн хурдан явагдах вэ?', en: 'In which state does diffusion happen fastest?' },
      options: [
        { mn: 'Хатуу', en: 'Solid' },
        { mn: 'Шингэн', en: 'Liquid' },
        { mn: 'Хий', en: 'Gas' }
      ],
      answer: 2,
      explanation: { mn: 'Хийн бөөмс хоорондоо хол, хурдан хөдөлдөг.', en: 'Gas particles are far apart and move quickly.' }
    },
    {
      level: 'medium',
      prompt: { mn: 'NH₃ ба HCl-ийн хоолойд цагаан бөгж HCl-ийн үзүүрт ойр үүсдэг. Яагаад вэ?', en: 'In the NH₃ and HCl tube the white ring forms nearer the HCl end. Why?' },
      options: [
        { mn: 'NH₃-ийн харьцангуй молекул масс бага тул хурдан тархдаг', en: 'NH₃ has a smaller relative molecular mass, so it diffuses faster' },
        { mn: 'HCl нь хий биш', en: 'HCl is not a gas' },
        { mn: 'NH₃ хоолойн дунд байдаг', en: 'NH₃ stays in the middle of the tube' }
      ],
      answer: 0,
      explanation: { mn: 'Ижил температурт хөнгөн молекул илүү хурдан хөдөлдөг.', en: 'At the same temperature lighter molecules move faster.' }
    },
    {
      level: 'medium',
      prompt: { mn: 'Температур нэмэгдэхэд диффузийн хурд яах вэ?', en: 'How does the rate of diffusion change when the temperature rises?' },
      options: [
        { mn: 'Нэмэгдэнэ, учир нь бөөмсийн кинетик энерги нэмэгддэг', en: 'It increases, because the particles have more kinetic energy' },
        { mn: 'Буурна', en: 'It decreases' },
        { mn: 'Өөрчлөгдөхгүй', en: 'It stays the same' }
      ],
      answer: 0,
      explanation: { mn: 'Температур өсөхөд бөөмс илүү хурдан хөдөлж, диффуз хурдан явагдана.', en: 'When the temperature rises the particles move faster, so diffusion is faster.' }
    },
    {
      level: 'hard',
      prompt: { mn: 'Өрөөний нэг буланд үнэртэй бодис нээхэд халуун өрөөнд хүйтэн өрөөнөөс хурдан тархдаг. Яагаад?', en: 'Scented liquid is opened in a corner of a room. The smell spreads faster in a warm room than in a cold one. Why?' },
      model: {
        mn: 'Халуун өрөөнд бөөмсийн температур өндөр тул кинетик энерги их, илүү хурдан хөдөлнө. Тиймээс бөөмс илүү хурдан тархаж, үнэр хурдан тархана.',
        en: 'In a warm room the particles have more kinetic energy and move faster, so they spread more quickly and the smell travels faster.'
      },
      explanation: { mn: 'Температур → кинетик энерги → хурд → диффуз.', en: 'Temperature → kinetic energy → speed → diffusion.' }
    },
    {
      level: 'hard',
      prompt: { mn: 'Ижил температурт Mr 2 ба Mr 32 хоёр хийн аль нь хурдан тархах вэ? Яагаад, хэдэн дахин?', en: 'At the same temperature, which of two gases with Mr 2 and Mr 32 diffuses faster? Why, and by about how much?' },
      model: {
        mn: 'Mr 2 (устөрөгч) хурдан тархана. Ижил температурт бөөмсийн дундаж кинетик энерги ижил, харин хөнгөн бөөм хурдан хөдөлнө. Диффузийн хурд ≈ 1/√Mr тул ойролцоогоор √(32/2) = 4 дахин хурдан.',
        en: 'Mr 2 (hydrogen) diffuses faster. At the same temperature the average kinetic energy is the same, but the lighter particles move faster. Rate ≈ 1/√Mr, so about √(32/2) = 4 times faster.'
      },
      explanation: { mn: 'Харьцангуй молекул масс бага → хурд их.', en: 'Lower relative molecular mass → higher rate.' }
    }
  ]
};
