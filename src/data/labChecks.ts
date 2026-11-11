// The two quick questions a student answers when they submit a virtual lab, by lab and by the part (tab) it opened at.
// Each question checks something the student can see in that part of the lab. answer = the index of the right option.
export type LabKey =
  | 'particle-igcse' | 'particle-as' | 'atomic-igcse' | 'atomic-9701'
  | 'bonding' | 'imf' | 'sn1' | 'sn2' | 'electron-flow';

type Bi = { en: string; mn: string };
export interface LabQuestion {
  q: Bi;
  options: Bi[];
  answer: number;
}

const b = (mn: string, en: string): Bi => ({ mn, en });
const Q = (q: Bi, options: Bi[], answer: number): LabQuestion => ({ q, options, answer });

const PARTICLE_STATES = [
  Q(b('Мөс хайлж байх үед (муруйн хэвтээ хэсэг) температур яах вэ?', 'While ice melts (the flat part of the curve), what happens to the temperature?'),
    [b('Өснө', 'It rises'), b('Тогтмол байна', 'It stays the same'), b('Буурна', 'It falls')], 1),
  Q(b('Хатуу биеийн бөөмс хэрхэн хөдөлдөг вэ?', 'How do the particles in a solid move?'),
    [b('Тогтсон байрлалынхаа эргэн тойронд чичирнэ', 'They vibrate about fixed positions'), b('Бие биенийхээ дээр гулсана', 'They slide past each other'), b('Бүх чиглэлд хурдан хөдөлнө', 'They move fast in all directions')], 0)
];
const PARTICLE_DIFFUSION = [
  Q(b('NH₃ ба HCl хоолойд тархахад цагаан цагираг хаана үүсэх вэ?', 'When NH₃ and HCl diffuse along a tube, where does the white ring form?'),
    [b('HCl-ийн үзүүрт ойр', 'Nearer the HCl end'), b('NH₃-ийн үзүүрт ойр', 'Nearer the NH₃ end'), b('Яг дунд', 'Exactly in the middle')], 0),
  Q(b('Температур өсөхөд тархалтын хурд яах вэ?', 'What happens to the rate of diffusion when the temperature rises?'),
    [b('Өснө', 'It increases'), b('Буурна', 'It decreases'), b('Өөрчлөгдөхгүй', 'It does not change')], 0)
];

export const LAB_CHECKS: Record<LabKey, Record<number, LabQuestion[]>> = {
  'particle-igcse': {
    1: PARTICLE_STATES,
    2: PARTICLE_DIFFUSION,
    3: [
      Q(b('Эзлэхүүн тогтмол үед хийг халаахад даралт яах вэ?', 'At constant volume, what happens to the pressure when the gas is heated?'),
        [b('Өснө', 'It rises'), b('Буурна', 'It falls'), b('Өөрчлөгдөхгүй', 'It does not change')], 0),
      Q(b('Яагаад?', 'Why?'),
        [b('Бөөмс хурдан хөдөлж, хананд олон, хүчтэй мөргөлдөнө', 'The particles move faster and hit the walls more often and harder'), b('Бөөмс томорно', 'The particles get bigger'), b('Бөөмсийн тоо нэмэгдэнэ', 'There are more particles')], 0)
    ]
  },
  'particle-as': {
    1: PARTICLE_STATES,
    2: PARTICLE_DIFFUSION,
    3: [
      Q(b('Эзлэхүүн тогтмол үед T-г 293 K-ээс 586 K болгоход даралт хэд дахин өсөх вэ?', 'At constant volume, by what factor does the pressure rise when T goes from 293 K to 586 K?'),
        [b('2 дахин', '2 times'), b('4 дахин', '4 times'), b('Өөрчлөгдөхгүй', 'It does not change')], 0),
      Q(b('Бодит хий идеал хийгээс хамгийн их хазайх нөхцөл аль вэ?', 'Under which conditions does a real gas deviate most from ideal behaviour?'),
        [b('Өндөр даралт, бага температур', 'High pressure, low temperature'), b('Бага даралт, өндөр температур', 'Low pressure, high temperature'), b('Бага даралт, бага температур', 'Low pressure, low temperature')], 0)
    ]
  },
  'atomic-igcse': {
    1: [
      Q(b('²³₁₁Na атомд хэдэн нейтрон байдаг вэ?', 'How many neutrons are in an atom of ²³₁₁Na?'), [b('11', '11'), b('12', '12'), b('23', '23')], 1),
      Q(b('Na⁺ ион үүсэхэд юу өөрчлөгддөг вэ?', 'What changes when a Na⁺ ion forms?'),
        [b('Электроны тоо', 'The number of electrons'), b('Протоны тоо', 'The number of protons'), b('Нейтроны тоо', 'The number of neutrons')], 0)
    ],
    2: [
      Q(b('Хлорын (Z = 17) электрон бүтэц аль нь вэ?', 'What is the electronic configuration of chlorine (Z = 17)?'), [b('2, 8, 7', '2, 8, 7'), b('2, 7, 8', '2, 7, 8'), b('8, 8, 1', '8, 8, 1')], 0),
      Q(b('3 бүрхүүлтэй, гаднах бүрхүүлдээ 2 электронтой элемент хаана байх вэ?', 'Where is an element with 3 shells and 2 outer electrons?'),
        [b('II бүлэг, 3-р үе', 'Group II, Period 3'), b('III бүлэг, 2-р үе', 'Group III, Period 2'), b('II бүлэг, 2-р үе', 'Group II, Period 2')], 0)
    ],
    3: [
      Q(b('Изотопууд юугаараа ялгаатай вэ?', 'How do isotopes differ?'),
        [b('Нейтроны тоогоор', 'In the number of neutrons'), b('Протоны тоогоор', 'In the number of protons'), b('Электроны тоогоор', 'In the number of electrons')], 0),
      Q(b('Хлорын Ar = 35.5 яагаад бүхэл тоо биш вэ?', 'Why is Ar of chlorine 35.5, not a whole number?'),
        [b('Изотопуудын жигнэсэн дундаж', 'It is the weighted mean of the isotopes'), b('Электроны масс нэмэгддэг', 'The electrons add mass'), b('Хэмжилтийн алдаа', 'It is a measuring error')], 0)
    ]
  },
  'atomic-9701': {
    1: [
      Q(b('Ижил хурдтай цацрагуудаас цахилгаан оронд хамгийн их хазайх нь аль вэ?', 'Of beams at the same velocity, which is deflected most in an electric field?'),
        [b('Электрон', 'Electrons'), b('Протон', 'Protons'), b('Нейтрон', 'Neutrons')], 0),
      Q(b('Нейтроны цацраг цахилгаан оронд яах вэ?', 'What does a beam of neutrons do in an electric field?'),
        [b('Шулуун явна', 'It goes straight on'), b('(+) хавтан руу хазайна', 'It bends towards the (+) plate'), b('(−) хавтан руу хазайна', 'It bends towards the (−) plate')], 0)
    ],
    2: [
      Q(b('Харьцангуй атомын масс Ar-ыг юутай харьцуулдаг вэ?', 'Relative atomic mass Ar is compared with what?'),
        [b('¹²C атомын массын 1/12', '1/12 of the mass of a ¹²C atom'), b('¹H атомын масс', 'The mass of a ¹H atom'), b('¹⁶O атомын массын 1/16', '1/16 of the mass of a ¹⁶O atom')], 0),
      Q(b('m/z = 35 ба 37 дээрх оргилын өндөр 3 : 1 бол Ar хэд вэ?', 'Peaks at m/z = 35 and 37 are in the ratio 3 : 1. What is Ar?'),
        [b('35.5', '35.5'), b('36.0', '36.0'), b('35.0', '35.0')], 0)
    ],
    3: [
      Q(b('Fe²⁺-ийн электрон бүтэц аль нь вэ?', 'What is the electronic configuration of Fe²⁺?'),
        [b('[Ar] 3d⁶', '[Ar] 3d⁶'), b('[Ar] 3d⁴ 4s²', '[Ar] 3d⁴ 4s²'), b('[Ar] 3d⁵ 4s¹', '[Ar] 3d⁵ 4s¹')], 0),
      Q(b('Cr атомын үндсэн төлөвийн электрон бүтэц аль нь вэ?', 'What is the ground-state configuration of a Cr atom?'),
        [b('[Ar] 3d⁵ 4s¹', '[Ar] 3d⁵ 4s¹'), b('[Ar] 3d⁴ 4s²', '[Ar] 3d⁴ 4s²'), b('[Ar] 3d⁶', '[Ar] 3d⁶')], 0)
    ],
    4: [
      Q(b('Be → B-д IE₁ яагаад буурдаг вэ?', 'Why does IE₁ fall from Be to B?'),
        [b('B-ийн электрон 2s-ээс өндөр энергитэй 2p-д байдаг', 'B’s electron is in 2p, higher in energy than 2s'), b('B-ийн цөмийн цэнэг бага', 'B has a smaller nuclear charge'), b('B-д нэг орбиталд хос электрон бий', 'B has a pair of electrons in one orbital')], 0),
      Q(b('Хамгийн том үсрэлт IE₃ → IE₄ хооронд бол элемент аль бүлэгт вэ?', 'The biggest jump is between IE₃ and IE₄. Which group is the element in?'),
        [b('13', '13'), b('14', '14'), b('2', '2')], 0)
    ],
    5: [
      Q(b('Zn яагаад шилжилтийн элемент биш вэ?', 'Why is Zn not a transition element?'),
        [b('Түүний ион Zn²⁺ нь 3d¹⁰ (бүрэн)', 'Its ion Zn²⁺ is 3d¹⁰ (full)'), b('Zn d-блокт ордоггүй', 'Zn is not in the d-block'), b('Zn ион үүсгэдэггүй', 'Zn forms no ions')], 0),
      Q(b('Октаэдр цогцолборт d орбиталууд хэрхэн хуваагддаг вэ?', 'How do the d orbitals split in an octahedral complex?'),
        [b('3 доод, 2 дээд', '3 lower, 2 upper'), b('2 доод, 3 дээд', '2 lower, 3 upper'), b('Хуваагддаггүй', 'They do not split')], 0)
    ]
  },
  bonding: {
    1: [
      Q(b('MgO үүсэхэд Mg хэдэн электрон алдах вэ?', 'How many electrons does Mg lose when MgO forms?'), [b('2', '2'), b('1', '1'), b('3', '3')], 0),
      Q(b('Ионы холбоо гэж юу вэ?', 'What is an ionic bond?'),
        [b('Эсрэг цэнэгтэй ионуудын электростатик таталцал', 'The electrostatic attraction between oppositely charged ions'), b('Хуваалцсан электрон хос', 'A shared pair of electrons'), b('Делокалчлагдсан электронууд', 'Delocalised electrons')], 0)
    ],
    2: [
      Q(b('H₂O молекулд хэдэн дан (хуваалцаагүй) электрон хос байдаг вэ?', 'How many lone (non-bonding) pairs are in a H₂O molecule?'), [b('2', '2'), b('1', '1'), b('0', '0')], 0),
      Q(b('N₂ молекулд хэдэн электрон хос хуваалцдаг вэ?', 'How many pairs of electrons are shared in N₂?'), [b('3', '3'), b('2', '2'), b('1', '1')], 0)
    ],
    3: [
      Q(b('Хатуу NaCl яагаад цахилгаан дамжуулдаггүй вэ?', 'Why does solid NaCl not conduct electricity?'),
        [b('Ионууд торонд тогтсон, хөдөлж чадахгүй', 'The ions are held in the lattice and cannot move'), b('Ион огт байхгүй', 'It has no ions'), b('Электрон хэт олон', 'It has too many electrons')], 0),
      Q(b('Графит яагаад цахилгаан дамжуулдаг вэ?', 'Why does graphite conduct electricity?'),
        [b('C бүр 3 холбоотой, 1 электрон нь делокалчлагдсан', 'Each C forms 3 bonds, so one electron is delocalised'), b('Ион агуулдаг', 'It contains ions'), b('C бүр 4 холбоотой', 'Each C forms 4 bonds')], 0)
    ],
    4: [
      Q(b('NH₃-ийн холбооны өнцөг хэд вэ?', 'What is the bond angle in NH₃?'), [b('107°', '107°'), b('109.5°', '109.5°'), b('104.5°', '104.5°')], 0),
      Q(b('CO₂ яагаад туйлгүй вэ?', 'Why is CO₂ non-polar?'),
        [b('Шугаман тул дипольнууд бие биеэ нөхдөг', 'It is linear, so the dipoles cancel'), b('C=O холбоо туйлгүй', 'The C=O bonds are non-polar'), b('Дан хостой', 'It has lone pairs')], 0)
    ],
    5: [
      Q(b('H₂O-ийн буцлах цэг H₂S-ээс өндөр байдгийн шалтгаан юу вэ?', 'Why is the boiling point of H₂O higher than that of H₂S?'),
        [b('Устөрөгчийн холбоо', 'Hydrogen bonding'), b('Электроны тоо их', 'More electrons'), b('Ковалент холбоо хүчтэй', 'Stronger covalent bonds')], 0),
      Q(b('CH₄ → SnH₄ буцлах цэг яагаад өсдөг вэ?', 'Why does the boiling point rise from CH₄ to SnH₄?'),
        [b('Электроны тоо өсч id-id хүч хүчтэй болно', 'More electrons, so stronger id-id forces'), b('Устөрөгчийн холбоо үүснэ', 'Hydrogen bonds form'), b('Молекул туйлт болно', 'The molecules become polar')], 0)
    ]
  },
  imf: {
    1: [
      Q(b('CH₄ буцлахад юу давагддаг вэ?', 'What is overcome when CH₄ boils?'),
        [b('Молекул хоорондын сул хүч', 'The weak intermolecular forces'), b('C–H ковалент холбоо', 'The C–H covalent bonds'), b('Ионы холбоо', 'Ionic bonds')], 0),
      Q(b('I₂-ийн буцлах цэг Cl₂-оос яагаад өндөр вэ?', 'Why is the boiling point of I₂ higher than that of Cl₂?'),
        [b('Молекул том тул молекул хоорондын хүч хүчтэй', 'Larger molecules, so stronger intermolecular forces'), b('I₂ ионы бодис', 'I₂ is ionic'), b('I₂ устөрөгчийн холбоотой', 'I₂ has hydrogen bonds')], 0)
    ],
    2: [
      Q(b('Ar ба HCl хоёулаа 18 электронтой. HCl-ийн буцлах цэг яагаад өндөр вэ?', 'Ar and HCl both have 18 electrons. Why is the boiling point of HCl higher?'),
        [b('HCl туйлт тул pd-pd хүч нэмэгддэг', 'HCl is polar, so pd-pd forces are added'), b('HCl устөрөгчийн холбоотой', 'HCl has hydrogen bonds'), b('Ar-ийн молекул том', 'Ar molecules are larger')], 0),
      Q(b('Устөрөгчийн холбоо үүсэхэд H ямар атомтай холбогдсон байх ёстой вэ?', 'For hydrogen bonding, H must be bonded to which atom?'),
        [b('N, O эсвэл F', 'N, O or F'), b('C эсвэл Cl', 'C or Cl'), b('Ямар ч атом', 'Any atom')], 0)
    ],
    3: [
      Q(b('Алканы гинж урт болоход буцлах цэг яах вэ?', 'What happens to the boiling point as the alkane chain gets longer?'),
        [b('Өснө', 'It rises'), b('Буурна', 'It falls'), b('Өөрчлөгдөхгүй', 'It does not change')], 0),
      Q(b('25 °C-т бром (Br₂) ямар төлөвтэй вэ?', 'What is the state of bromine (Br₂) at 25 °C?'),
        [b('Шингэн', 'Liquid'), b('Хий', 'Gas'), b('Хатуу', 'Solid')], 0)
    ],
    4: [
      Q(b('Мөс яагаад усан дээр хөвдөг вэ?', 'Why does ice float on water?'),
        [b('Устөрөгчийн холбооны нээлттэй тор тул нягт бага', 'Its open lattice of hydrogen bonds makes it less dense'), b('Мөсөнд агаар бий', 'Ice holds air'), b('Мөсний молекул хөнгөн', 'Ice molecules are lighter')], 0),
      Q(b('Мөсөнд нэг H₂O молекул хэдэн устөрөгчийн холбоо үүсгэдэг вэ?', 'How many hydrogen bonds does one H₂O molecule form in ice?'), [b('4', '4'), b('2', '2'), b('1', '1')], 0)
    ]
  },
  sn2: {
    1: [
      Q(b('SN2 механизм хэдэн алхамтай вэ?', 'How many steps does the SN2 mechanism have?'),
        [b('1 (нэг зэрэг)', '1 (all at once)'), b('2', '2'), b('3', '3')], 0),
      Q(b('SN2-д нуклеофил аль талаас довтолдог вэ?', 'From which side does the nucleophile attack in SN2?'),
        [b('Галогены эсрэг (ар) талаас', 'From the side opposite the halogen'), b('Галогены талаас', 'From the halogen’s side'), b('Хажуунаас', 'From the side')], 0)
    ]
  },
  sn1: {
    1: [
      Q(b('SN1-ийн эхний алхамд юу үүсэх вэ?', 'What forms in the first step of SN1?'),
        [b('Карбокатион', 'A carbocation'), b('Карбанион', 'A carbanion'), b('Чөлөөт радикал', 'A free radical')], 0),
      Q(b('Аль галогеналкан голчлон SN1-ээр урвалд ордог вэ?', 'Which halogenoalkane reacts mainly by SN1?'),
        [b('Гуравдагч (3°)', 'Tertiary (3°)'), b('Анхдагч (1°)', 'Primary (1°)'), b('CH₃X', 'CH₃X')], 0)
    ]
  },
  'electron-flow': {
    1: [
      Q(b('Гадаад хэлхээнд гүйдлийг юу зөөдөг вэ?', 'What carries the current in the external circuit?'),
        [b('Электрон', 'Electrons'), b('Ион', 'Ions'), b('Протон', 'Protons')], 0),
      Q(b('Катод дээр катион юу хийдэг вэ?', 'What do cations do at the cathode?'),
        [b('Электрон авч ангижирна', 'They gain electrons (reduction)'), b('Электрон алдаж исэлдэнэ', 'They lose electrons (oxidation)'), b('Өөрчлөгдөхгүй', 'Nothing changes')], 0)
    ]
  }
};

// The questions for a lab at a part; a part with none of its own falls back to the first
export const labQuestions = (key: LabKey, part: number): LabQuestion[] => LAB_CHECKS[key][part] ?? LAB_CHECKS[key][1] ?? [];
