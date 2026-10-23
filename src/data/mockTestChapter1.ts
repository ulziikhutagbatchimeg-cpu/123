import type { ExamQuestion } from '../types/chemistry';

// The end-of-chapter test for 0620 chapter 1 (States of matter), 22 marks in four parts: changes of state, the cooling
// curve, gas particles and diffusion. The questions are written for this course from the chapter's learning outcomes;
// they are not copied from a Cambridge test. Each question names the topic to revise when it is answered wrongly.
export const CHAPTER1_QUESTIONS: ExamQuestion[] = [
  {
    id: 'ch1-t-01',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 2',
    totalMarks: 1,
    type: 'mcq',
    titleEn: 'Gas to liquid',
    titleMn: 'Хийээс шингэн',
    questionTextEn: 'Which change of state turns a gas directly into a liquid?',
    questionTextMn: 'Хий шууд шингэн болох төлөвийн өөрчлөлт аль нь вэ?',
    options: [
      { id: 'A', textEn: 'Sublimation', textMn: 'Сублимаци', rationaleEn: 'Sublimation changes a solid directly into a gas.', rationaleMn: 'Сублимаци нь хатуу бодисыг шууд хий болгоно.' },
      { id: 'B', textEn: 'Condensation', textMn: 'Конденсаци', rationaleEn: 'Correct. Condensation turns a gas into a liquid as it cools.', rationaleMn: 'Зөв. Конденсаци хий хөхөхөд шингэн болгоно.' },
      { id: 'C', textEn: 'Melting', textMn: 'Хайлах', rationaleEn: 'Melting changes a solid into a liquid.', rationaleMn: 'Хайлах нь хатуу бодисыг шингэн болгоно.' },
      { id: 'D', textEn: 'Boiling', textMn: 'Буцлах', rationaleEn: 'Boiling changes a liquid into a gas.', rationaleMn: 'Буцлах нь шингэнийг хий болгоно.' }
    ],
    correctOption: 'B',
    misconceptionDiagnosisEn: 'Condensation is the reverse of boiling; it goes from gas to liquid.',
    misconceptionDiagnosisMn: 'Конденсаци нь буцлахын урвуу; хийээс шингэн рүү явна.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'ch1-t-02',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 4',
    totalMarks: 2,
    type: 'structured',
    titleEn: 'Particles in a liquid',
    titleMn: 'Шингэн дэх бөөмс',
    questionTextEn: 'A solid is heated until it melts. Describe the arrangement and the movement of the particles in the liquid.',
    questionTextMn: 'Хатуу бодисыг хайтал халаана. Шингэн дэх бөөмсийн байрлал, хөдөлгөөнийг тайлбарла.',
    markScheme: [
      { criterionEn: 'Arrangement', criterionMn: 'Байрлал', pointEn: 'The particles are close together with no regular pattern', pointMn: 'Бөөмс нягт, тогтсон хэв маяггүй байрлана', marks: 1 },
      { criterionEn: 'Movement', criterionMn: 'Хөдөлгөөн', pointEn: 'The particles move randomly and slide past each other', pointMn: 'Бөөмс санамсаргүй хөдөлж, бие биенийхээ дээр гулсана', marks: 1 }
    ],
    modelAnswerEn: 'The particles are close together but not in a regular arrangement. They move randomly and slide past one another.',
    modelAnswerMn: 'Бөөмс нягт боловч тогтсон байрлалгүй. Санамсаргүй хөдөлж, бие биенийхээ дээр гулсана.',
    misconceptionDiagnosisEn: 'Liquid particles are not fixed in place as they are in a solid.',
    misconceptionDiagnosisMn: 'Шингэний бөөмс хатуу бодисын адил тогтсон байрлалд байдаггүй.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'ch1-t-03',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 4',
    totalMarks: 2,
    type: 'structured',
    titleEn: 'Changes that take in energy',
    titleMn: 'Энерги авдаг өөрчлөлтүүд',
    questionTextEn: 'Name two changes of state in which the particles take in energy from their surroundings.',
    questionTextMn: 'Бөөмс орчноосоо энерги авдаг хоёр төлөвийн өөрчлөлтийг нэрлэ.',
    markScheme: [
      { criterionEn: 'First change', criterionMn: 'Эхний өөрчлөлт', pointEn: 'Melting, boiling or evaporating (or sublimation)', pointMn: 'Хайлах, буцлах эсвэл уурших (эсвэл сублимаци)', marks: 1 },
      { criterionEn: 'Second change', criterionMn: 'Хоёр дахь өөрчлөлт', pointEn: 'A different change from the list above', pointMn: 'Дээрх жагсаалтаас өөр нэг өөрчлөлт', marks: 1 }
    ],
    modelAnswerEn: 'Melting and boiling.',
    modelAnswerMn: 'Хайлах ба буцлах.',
    misconceptionDiagnosisEn: 'Freezing and condensing give energy out; the reverse changes take energy in.',
    misconceptionDiagnosisMn: 'Хөрөх ба конденсаци энерги ялгаруулдаг; урвуу өөрчлөлтүүд энерги авдаг.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'ch1-t-04',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 2',
    totalMarks: 1,
    type: 'mcq',
    titleEn: 'Solid to gas',
    titleMn: 'Хатуунаас хий',
    questionTextEn: 'What is the name for the change in which a solid turns directly into a gas?',
    questionTextMn: 'Хатуу бодис шууд хий болох өөрчлөлтийн нэр юу вэ?',
    options: [
      { id: 'A', textEn: 'Condensation', textMn: 'Конденсаци', rationaleEn: 'Condensation changes a gas into a liquid.', rationaleMn: 'Конденсаци нь хийг шингэн болгоно.' },
      { id: 'B', textEn: 'Freezing', textMn: 'Хөрөх', rationaleEn: 'Freezing changes a liquid into a solid.', rationaleMn: 'Хөрөх нь шингэнийг хатуу болгоно.' },
      { id: 'C', textEn: 'Sublimation', textMn: 'Сублимаци', rationaleEn: 'Correct. Sublimation skips the liquid state.', rationaleMn: 'Зөв. Сублимаци шингэн төлөвийг алгасна.' },
      { id: 'D', textEn: 'Evaporation', textMn: 'Уурших', rationaleEn: 'Evaporation changes a liquid into a gas.', rationaleMn: 'Уурших нь шингэнийг хий болгоно.' }
    ],
    correctOption: 'C',
    misconceptionDiagnosisEn: 'Evaporation needs a liquid first; sublimation goes straight from solid to gas.',
    misconceptionDiagnosisMn: 'Уурших нь эхлээд шингэн шаарддаг; сублимаци хатуунаас шууд хий рүү явна.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'ch1-t-05',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 4',
    totalMarks: 2,
    type: 'structured',
    titleEn: 'Particles in a solid',
    titleMn: 'Хатуу бодис дахь бөөмс',
    questionTextEn: 'A pure substance is cooled from a liquid until it is completely solid. Describe the arrangement and the movement of the particles in the solid.',
    questionTextMn: 'Цэвэр бодисыг шингэнээс бүрэн хатуу болтол хөргөнө. Хатуу дахь бөөмсийн байрлал, хөдөлгөөнийг тайлбарла.',
    markScheme: [
      { criterionEn: 'Arrangement', criterionMn: 'Байрлал', pointEn: 'The particles are close together in a regular arrangement', pointMn: 'Бөөмс нягт, тогтмол байрлалтай', marks: 1 },
      { criterionEn: 'Movement', criterionMn: 'Хөдөлгөөн', pointEn: 'The particles vibrate about fixed positions', pointMn: 'Бөөмс тогтсон байрлалынхаа эргэн тойронд чичирнэ', marks: 1 }
    ],
    modelAnswerEn: 'The particles are close together in a regular pattern and vibrate about fixed positions.',
    modelAnswerMn: 'Бөөмс нягт, тогтмол хэв маягтай, тогтсон байрлалынхаа эргэн тойронд чичирнэ.',
    misconceptionDiagnosisEn: 'Particles in a solid do not stop moving; they only vibrate.',
    misconceptionDiagnosisMn: 'Хатуу бодисын бөөмс бүрэн зогсохгүй; зөвхөн чичирнэ.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'ch1-t-06',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 4',
    totalMarks: 2,
    type: 'structured',
    titleEn: 'Flat part of a cooling curve',
    titleMn: 'Хөрөх муруйн хэвтээ хэсэг',
    questionTextEn: 'During the flat part of the cooling curve of a pure substance, its temperature stays constant. Explain why.',
    questionTextMn: 'Цэвэр бодисын хөрөх муруйн хэвтээ хэсэгт температур тогтмол байна. Яагаад гэдгийг тайлбарла.',
    markScheme: [
      { criterionEn: 'Change', criterionMn: 'Өөрчлөлт', pointEn: 'The liquid is freezing (changing state)', pointMn: 'Шингэн хөрч байна (төлөв өөрчлөгдөж байна)', marks: 1 },
      { criterionEn: 'Energy', criterionMn: 'Энерги', pointEn: 'Energy released as attractions form between particles balances the heat lost to the surroundings', pointMn: 'Бөөмсийн хооронд татах хүч үүсэхэд ялгарах энерги орчинд алдагдах дулааг нөхнө', marks: 1 }
    ],
    modelAnswerEn: 'The liquid is freezing. Energy is released as particles form attractions, and this balances the heat lost, so the temperature stays constant.',
    modelAnswerMn: 'Шингэн хөрч байна. Бөөмс татах хүч үүсгэхэд энерги ялгарч, алдагдсан дулааг нөхөж, температур тогтмол байна.',
    misconceptionDiagnosisEn: 'Students think the temperature stays constant because heat stops leaving; heat does still leave.',
    misconceptionDiagnosisMn: 'Дулаан гарахаа больдог гэж бодох нь буруу; дулаан үргэлж гардаг.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'ch1-t-07',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 4',
    totalMarks: 2,
    type: 'structured',
    titleEn: 'Kinetic energy in the flat part',
    titleMn: 'Хэвтээ хэсгийн кинетик энерги',
    questionTextEn: 'Describe how the average kinetic energy of the particles changes during the flat part of the cooling curve, and say why.',
    questionTextMn: 'Хөрөх муруйн хэвтээ хэсэгт бөөмсийн дундаж кинетик энерги хэрхэн өөрчлөгдөхийг тайлбарлаж, яагаад гэдгийг хэл.',
    markScheme: [
      { criterionEn: 'Change', criterionMn: 'Өөрчлөлт', pointEn: 'The average kinetic energy stays the same', pointMn: 'Дундаж кинетик энерги тогтмол байна', marks: 1 },
      { criterionEn: 'Reason', criterionMn: 'Шалтгаан', pointEn: 'The temperature is constant, and temperature measures the average kinetic energy', pointMn: 'Температур тогтмол, температур нь дундаж кинетик энергийг хэмжинэ', marks: 1 }
    ],
    modelAnswerEn: 'The average kinetic energy stays the same, because the temperature is constant and temperature is a measure of the average kinetic energy.',
    modelAnswerMn: 'Дундаж кинетик энерги тогтмол, учир нь температур тогтмол бөгөөд температур нь дундаж кинетик энергийн хэмжүүр.',
    misconceptionDiagnosisEn: 'The energy released during freezing does not raise the particles\' kinetic energy.',
    misconceptionDiagnosisMn: 'Хөрөх үед ялгарах энерги бөөмсийн кинетик энергийг нэмэхгүй.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'ch1-t-08',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 4',
    totalMarks: 2,
    type: 'structured',
    titleEn: 'Temperature after freezing',
    titleMn: 'Хөрсний дараах температур',
    questionTextEn: 'Once all the liquid has frozen, the temperature falls again. Explain why.',
    questionTextMn: 'Бүх шингэн хөрсний дараа температур дахин буурна. Яагаад гэдгийг тайлбарла.',
    markScheme: [
      { criterionEn: 'No more energy from freezing', criterionMn: 'Хөрөхөөс энерги гарахгүй', pointEn: 'Freezing has finished, so no more energy is released', pointMn: 'Хөрөлт дууссан тул энерги ялгарахгүй', marks: 1 },
      { criterionEn: 'Heat lost', criterionMn: 'Дулаан алдагдах', pointEn: 'Heat is lost to the surroundings, so the particles lose kinetic energy', pointMn: 'Орчинд дулаан алдагдаж, бөөмс кинетик энерги алдана', marks: 1 }
    ],
    modelAnswerEn: 'Freezing has finished, so no more energy is released. Heat continues to leave, so the particles lose kinetic energy and the temperature falls.',
    modelAnswerMn: 'Хөрөлт дууссан тул энерги ялгарахгүй. Дулаан үргэлжлэн алдагдаж, бөөмс кинетик энерги алдаж, температур буурна.',
    misconceptionDiagnosisEn: 'The temperature falls once freezing ends because no energy is released to keep it steady.',
    misconceptionDiagnosisMn: 'Хөрөлт дуусахад температур буурдаг, учир нь түүнийг тогтмол байлгах энерги ялгарахгүй.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'ch1-t-09',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 4',
    totalMarks: 1,
    type: 'structured',
    titleEn: 'Compressing a gas',
    titleMn: 'Хийг шахах',
    questionTextEn: 'A gas in a cylinder is compressed by pushing a piston inwards. Describe what happens to the particles of the gas.',
    questionTextMn: 'Цилиндр дэх хийг поршеныг дотогш түлхэж шахна. Хийн бөөмсөд юу тохиолдохыг тайлбарла.',
    markScheme: [
      { criterionEn: 'Particles', criterionMn: 'Бөөмс', pointEn: 'The particles are forced into a smaller volume, so they are closer together', pointMn: 'Бөөмс бага эзлэхүүнд шахагдаж, нягтарна', marks: 1 }
    ],
    modelAnswerEn: 'The particles are pushed into a smaller space, so they are closer together.',
    modelAnswerMn: 'Бөөмс бага зайд шахагдаж, илүү нягт болно.',
    misconceptionDiagnosisEn: 'The particles themselves do not get smaller; the space between them does.',
    misconceptionDiagnosisMn: 'Бөөмс өөрөө жижигрэхгүй; тэдгээрийн хоорондох зай багасна.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'ch1-t-10',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 4',
    totalMarks: 1,
    type: 'structured',
    titleEn: 'Pressure on compression',
    titleMn: 'Шахах үеийн даралт',
    questionTextEn: 'What happens to the pressure of the gas when it is compressed in this way?',
    questionTextMn: 'Хий ингэж шахагдахад даралт юу болох вэ?',
    markScheme: [
      { criterionEn: 'Pressure', criterionMn: 'Даралт', pointEn: 'The pressure increases', pointMn: 'Даралт нэмэгдэнэ', marks: 1 }
    ],
    modelAnswerEn: 'The pressure increases.',
    modelAnswerMn: 'Даралт нэмэгдэнэ.',
    misconceptionDiagnosisEn: 'Compressing a gas makes it collide with the container walls more often, which raises the pressure.',
    misconceptionDiagnosisMn: 'Хийг шахахад сав ханатай илүү олон удаа мөргөлдөж, даралт нэмэгдэнэ.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'ch1-t-11',
    topicId: 'top-1-1',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.1',
    paper: 'Paper 4',
    totalMarks: 2,
    type: 'structured',
    titleEn: 'Heating a gas',
    titleMn: 'Хийг халаах',
    questionTextEn: 'The gas in the cylinder is now heated. Explain the change in the movement of its particles and what happens to the piston.',
    questionTextMn: 'Цилиндр дэх хийг одоо халаана. Бөөмсийн хөдөлгөөний өөрчлөлт, поршений хөдөлгөөнийг тайлбарла.',
    markScheme: [
      { criterionEn: 'Movement', criterionMn: 'Хөдөлгөөн', pointEn: 'The particles move faster, with more kinetic energy', pointMn: 'Бөөмс илүү хурдан, илүү кинетик энергитэй хөдөлнө', marks: 1 },
      { criterionEn: 'Piston', criterionMn: 'Поршень', pointEn: 'They hit the piston harder and more often, so it is pushed outwards', pointMn: 'Поршенд илүү хүчтэй, илүү олон удаа цохиж, гадагш түлхэнэ', marks: 1 }
    ],
    modelAnswerEn: 'The particles move faster and hit the piston with more force, so the piston is pushed outwards.',
    modelAnswerMn: 'Бөөмс хурдан хөдөлж, поршенд илүү хүчтэй цохиж, поршеныг гадагш түлхэнэ.',
    misconceptionDiagnosisEn: 'Heating a gas makes the particles bigger is wrong; they move faster.',
    misconceptionDiagnosisMn: 'Хийг халаахад бөөмс томордог гэж бодох нь буруу; тэд хурдан хөдөлдөг.',
    remediationTopicId: 'top-1-1'
  },
  {
    id: 'ch1-t-12',
    topicId: 'top-1-2',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.2',
    paper: 'Paper 4',
    totalMarks: 2,
    type: 'structured',
    titleEn: 'Define diffusion',
    titleMn: 'Диффузыг тодорхойл',
    questionTextEn: 'Define diffusion.',
    questionTextMn: 'Диффузыг тодорхойл.',
    markScheme: [
      { criterionEn: 'Random movement', criterionMn: 'Санамсаргүй хөдөлгөөн', pointEn: 'The random movement of particles', pointMn: 'Бөөмсийн санамсаргүй хөдөлгөөн', marks: 1 },
      { criterionEn: 'Direction', criterionMn: 'Чиглэл', pointEn: 'from a region of higher concentration to a region of lower concentration', pointMn: 'өндөр концентрацитай хэсгээс бага концентрацитай хэсэг рүү', marks: 1 }
    ],
    modelAnswerEn: 'Diffusion is the random movement of particles from a region of higher concentration to a region of lower concentration.',
    modelAnswerMn: 'Диффуз гэдэг нь бөөмсийн өндөр концентрацитай хэсгээс бага концентрацитай хэсэг рүү санамсаргүй хөдөлгөөн юм.',
    misconceptionDiagnosisEn: 'Diffusion is not caused by a force pushing the particles; it happens by random movement alone.',
    misconceptionDiagnosisMn: 'Диффуз нь бөөмсийг түлхэх хүчээр биш, зөвхөн санамсаргүй хөдөлгөөнөөр явагдана.',
    remediationTopicId: 'top-1-2'
  },
  {
    id: 'ch1-t-13',
    topicId: 'top-1-2',
    chapterId: 'ch-states-of-matter',
    syllabusRef: '0620/1.2',
    paper: 'Paper 4',
    totalMarks: 2,
    type: 'structured',
    titleEn: 'Which gas diffuses faster',
    titleMn: 'Аль хий хурдан тархах вэ',
    questionTextEn: 'Hydrogen (Mr = 2) and oxygen (Mr = 32) are released at the same time and at the same temperature, at one end of a long tube. Which gas diffuses faster, and why?',
    questionTextMn: 'Устөрөгч (Mr = 2) ба хүчилтөрөгч (Mr = 32) урт хоолойн нэг үзүүрээс адил үед, адил температурт гарна. Аль хий хурдан тархах вэ, яагаад?',
    markScheme: [
      { criterionEn: 'Gas', criterionMn: 'Хий', pointEn: 'Hydrogen', pointMn: 'Устөрөгч', marks: 1 },
      { criterionEn: 'Reason', criterionMn: 'Шалтгаан', pointEn: 'It has the lower mass, so its particles move faster on average at the same temperature', pointMn: 'Масс бага тул адил температурт бөөмс нь дундажаар хурдан хөдөлнө', marks: 1 }
    ],
    modelAnswerEn: 'Hydrogen diffuses faster because its particles have a lower mass, so at the same temperature they move faster on average.',
    modelAnswerMn: 'Устөрөгч хурдан тархана, учир нь түүний бөөмс бага масстай тул адил температурт дундажаар хурдан хөдөлнө.',
    misconceptionDiagnosisEn: 'The heavier gas does not diffuse faster; mass affects the speed of the particles.',
    misconceptionDiagnosisMn: 'Хүнд хий хурдан тархдаггүй; масс нь бөөмсийн хурдад нөлөөлнө.',
    remediationTopicId: 'top-1-2'
  }
];
