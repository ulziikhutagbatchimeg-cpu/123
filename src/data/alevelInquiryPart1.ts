import type { AlevelInquiryPlan } from './alevelInquiryTypes';

// The 40-minute inquiry lessons of 9701 chapters 1 to 6. Written for this course from the syllabus; not copied from the
// Cambridge or the textbook material.

export const ALEVEL_INQUIRY_PART1: Record<string, AlevelInquiryPlan> = {
  'al-ch-1': {
    question: {
      mn: 'Масс спектр элементийн изотоптой болохыг яаж харуулах вэ?',
      en: 'How can a mass spectrum show that an element has isotopes?'
    },
    independent: { mn: 'Ижил элементийн изотоп (массын тоо)', en: 'Isotope of the same element (mass number)' },
    dependent: { mn: 'Оргил бүрийн байрлал (m/z) ба өндөр', en: 'Position (m/z) and height of each peak' },
    controlled: { mn: 'Ижил элемент, ижил ионжуулах арга, нэг цэнэгтэй ион', en: 'Same element, same ionisation method, singly charged ions' },
    limitation: {
      mn: 'Масс спектр нь атомын тоо биш, харьцангуй элбэгшилийг харуулна; мөн нэг цэнэгтэй ион гэж үзнэ.',
      en: 'A mass spectrum shows relative abundance, not the number of atoms, and assumes singly charged ions.'
    },
    keyPoints: [
      { mn: 'Изотопууд ижил протоны тоотой, нейтроны тоо нь өөр.', en: 'Isotopes have the same proton number and different neutron numbers.' },
      { mn: 'Изотоп бүр тусдаа оргил өгнө; оргилын өндөр нь түүний элбэгшилийг харуулна.', en: 'Each isotope gives its own peak; the peak height shows its abundance.' },
      { mn: 'Харьцангуй атомын масс (Ar) нь изотопуудын элбэгшилээр жинлэсэн дундаж масс.', en: 'Relative atomic mass (Ar) is the average isotope mass, weighted by abundance.' }
    ],
    glossary: [
      { term: { mn: 'Изотоп', en: 'Isotope' }, def: { mn: 'Ижил протоны тоотой, нейтроны тоо өөр нэг элементийн атомууд.', en: 'Atoms of the same element with the same proton number but a different neutron number.' } },
      { term: { mn: 'Массын тоо', en: 'Mass number' }, def: { mn: 'Цөм дэх протон ба нейтроны нийлбэр.', en: 'The protons plus neutrons in the nucleus.' } },
      { term: { mn: 'Харьцангуй атомын масс (Ar)', en: 'Relative atomic mass (Ar)' }, def: { mn: 'Изотопуудын жинлэсэн дундаж масс, нүүрстөрөгч-12-той харьцуулсан.', en: 'The weighted mean mass of the isotopes, compared with carbon-12.' } }
    ],
    structured: {
      prompt: { mn: 'Масс спектр элементийн хоёр изотоптой болохыг яаж харуулахыг тайлбарла.', en: 'Explain how a mass spectrum shows that an element has two isotopes.' },
      marks: [
        { mn: 'Өөр m/z утгатай хоёр оргил (1)', en: 'Two peaks at different m/z values (1)' },
        { mn: 'Оргил бүр нэг изотоп (1)', en: 'Each peak is one isotope (1)' },
        { mn: 'Оргилын өндөр харьцангуй элбэгшилийг харуулна (1)', en: 'The peak heights show the relative abundances (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Аль бөөм цахилгаан цэнэггүй вэ?', en: 'Which particle has no charge?' },
        options: [
          { mn: 'Протон', en: 'Proton' },
          { mn: 'Нейтрон', en: 'Neutron' },
          { mn: 'Электрон', en: 'Electron' },
          { mn: 'Ион', en: 'Ion' }
        ],
        answer: 1,
        explanation: { mn: 'Нейтрон цэнэггүй; протон +1, электрон −1.', en: 'A neutron has no charge; a proton is +1 and an electron is −1.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Бор хоёр изотоптой: 10B (20%) ба 11B (80%). Борын харьцангуй атомын массыг тооцоол.', en: 'Boron has two isotopes: 10B (20%) and 11B (80%). Calculate the relative atomic mass of boron.' },
        model: { mn: '(10 × 20 + 11 × 80) ÷ 100 = 10.8', en: '(10 × 20 + 11 × 80) ÷ 100 = 10.8' },
        explanation: { mn: 'Масс бүрийг элбэгшилийн хувиар үржүүлж, нийлбэрийг 100-д хуваана.', en: 'Multiply each mass by its percentage abundance, add them, and divide by 100.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Атомд 17 протон, 18 нейтрон байна. Түүний массын тоо хэд вэ?', en: 'An atom has 17 protons and 18 neutrons. What is its mass number?' },
        options: [{ mn: '17', en: '17' }, { mn: '18', en: '18' }, { mn: '35', en: '35' }, { mn: '1', en: '1' }],
        answer: 2,
        explanation: { mn: 'Массын тоо = протон + нейтрон = 17 + 18 = 35.', en: 'Mass number = protons + neutrons = 17 + 18 = 35.' }
      },
      {
        question: { mn: 'Ижил элементийн изотопуудын тухай аль мэдэгдэл зөв вэ?', en: 'Which statement about isotopes of the same element is correct?' },
        options: [
          { mn: 'Нейтроны тоо ижил.', en: 'They have the same number of neutrons.' },
          { mn: 'Протоны тоо өөр.', en: 'They have different numbers of protons.' },
          { mn: 'Протоны тоо ижил, нейтроны тоо өөр.', en: 'They have the same number of protons but different numbers of neutrons.' },
          { mn: 'Өөр элемент.', en: 'They are different elements.' }
        ],
        answer: 2,
        explanation: { mn: 'Изотопууд ижил протоны тоотой (энэ нь элементийг тодорхойлно), нейтроны тоо өөр.', en: 'Isotopes have the same proton number, which defines the element, and different neutron numbers.' }
      },
      {
        question: { mn: 'Хлорын Ar = 35.5. Энэ утга юуг илэрхийлэх вэ?', en: 'Chlorine has Ar = 35.5. What does this value represent?' },
        options: [
          { mn: 'Хамгийн элбэг изотопын масс.', en: 'The mass of its most common isotope.' },
          { mn: 'Изотопуудын элбэгшилээр жинлэсэн дундаж масс.', en: 'The average mass of its isotopes, weighted by abundance.' },
          { mn: 'Протон ба нейтроны нийлбэр.', en: 'The sum of its protons and neutrons.' },
          { mn: 'Нэг электроны масс.', en: 'The mass of one electron.' }
        ],
        answer: 1,
        explanation: { mn: 'Ar нь изотопын массаар жинлэсэн дундаж тул бүхэл тоо биш.', en: 'Ar is a weighted mean of the isotope masses, so it is not a whole number.' }
      }
    ]
  },
  'al-ch-2': {
    question: {
      mn: 'Өгөгдсөн реактантын массаас хэдэн моль, хэдэн грамм бүтээгдэхүүн үүсэх вэ?',
      en: 'How many moles and grams of product form from a given mass of reactant?'
    },
    independent: { mn: 'Реактантын масс', en: 'Mass of the reactant' },
    dependent: { mn: 'Бүтээгдэхүүний моль ба масс', en: 'Moles and mass of the product' },
    controlled: { mn: 'Тэнцвэржсэн тэгшитгэл, цэвэр реактант, бүрэн урвал', en: 'Balanced equation, pure reactant, complete reaction' },
    limitation: {
      mn: 'Лабораторид гарц үргэлж 100%-иас бага байдаг; тооцоо 100% гарц гэж үзнэ.',
      en: 'In the lab the yield is always below 100%; the calculation assumes a 100% yield.'
    },
    keyPoints: [
      { mn: 'Моль = масс ÷ Mr.', en: 'Moles = mass ÷ Mr.' },
      { mn: 'Тэнцвэржсэн тэгшитгэл моль харьцааг өгнө.', en: 'The balanced equation gives the mole ratio.' },
      { mn: 'Гарц (%) = бодит масс ÷ онолын масс × 100.', en: 'Percentage yield = actual mass ÷ theoretical mass × 100.' }
    ],
    glossary: [
      { term: { mn: 'Моль', en: 'Mole' }, def: { mn: 'Ямар нэгэн бөөмийн 6.02 × 10²³ ширхэг.', en: 'The amount containing 6.02 × 10²³ particles.' } },
      { term: { mn: 'Харьцангуй томьёоны масс (Mr)', en: 'Relative formula mass (Mr)' }, def: { mn: 'Томьёоны бүх атомын Ar-ийн нийлбэр.', en: 'The sum of the Ar values of all the atoms in the formula.' } },
      { term: { mn: 'Хязгаарлагч реактант', en: 'Limiting reactant' }, def: { mn: 'Эхэлж дуусдаг, урвалын бүтээгдэхүүний хэмжээг хязгаарлах реактант.', en: 'The reactant that runs out first and limits the amount of product.' } }
    ],
    structured: {
      prompt: { mn: '10.0 г CaCO₃-аас CO₂-ийн массыг тооцоол: CaCO₃ → CaO + CO₂ (Mr CaCO₃ = 100, CO₂ = 44).', en: 'Calculate the mass of CO₂ from 10.0 g of CaCO₃: CaCO₃ → CaO + CO₂ (Mr CaCO₃ = 100, CO₂ = 44).' },
      marks: [
        { mn: 'CaCO₃-ын моль = 10.0 ÷ 100 = 0.100 (1)', en: 'Moles of CaCO₃ = 10.0 ÷ 100 = 0.100 (1)' },
        { mn: 'Моль харьцаа 1 : 1, тиймээс 0.100 моль CO₂ (1)', en: 'The ratio is 1 : 1, so 0.100 mol CO₂ (1)' },
        { mn: 'Масс = 0.100 × 44 = 4.4 г (1)', en: 'Mass = 0.100 × 44 = 4.4 g (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: '2 моль усны масс хэд вэ? (Mr H₂O = 18)', en: 'What is the mass of 2 mol of water? (Mr H₂O = 18)' },
        options: [{ mn: '9 г', en: '9 g' }, { mn: '18 г', en: '18 g' }, { mn: '36 г', en: '36 g' }, { mn: '2 г', en: '2 g' }],
        answer: 2,
        explanation: { mn: 'Масс = моль × Mr = 2 × 18 = 36 г.', en: 'Mass = moles × Mr = 2 × 18 = 36 g.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Өрөөний температур, даралтад 2.4 дм³ устөрөгчийн хэдэн моль вэ?', en: 'How many moles are in 2.4 dm³ of hydrogen at room temperature and pressure?' },
        model: { mn: '2.4 ÷ 24 = 0.10 моль (1 моль хий = 24 дм³)', en: '2.4 ÷ 24 = 0.10 mol (1 mol of gas = 24 dm³)' },
        explanation: { mn: 'Хийн эзлэхүүнийг 24 дм³/моль-оор хувааж моль олно.', en: 'Divide the gas volume by 24 dm³ per mole to find the moles.' }
      }
    ],
    exit: [
      {
        question: { mn: 'CaCO₃-ын Mr (Ca 40, C 12, O 16) хэд вэ?', en: 'What is the Mr of CaCO₃ (Ca 40, C 12, O 16)?' },
        options: [{ mn: '52', en: '52' }, { mn: '68', en: '68' }, { mn: '100', en: '100' }, { mn: '116', en: '116' }],
        answer: 2,
        explanation: { mn: '40 + 12 + 3 × 16 = 100.', en: '40 + 12 + 3 × 16 = 100.' }
      },
      {
        question: { mn: '4.0 г NaOH-д (Mr 40) хэдэн моль байна?', en: 'How many moles are in 4.0 g of NaOH (Mr 40)?' },
        options: [{ mn: '0.1', en: '0.1' }, { mn: '0.4', en: '0.4' }, { mn: '4.0', en: '4.0' }, { mn: '160', en: '160' }],
        answer: 0,
        explanation: { mn: 'Моль = 4.0 ÷ 40 = 0.1.', en: 'Moles = 4.0 ÷ 40 = 0.1.' }
      },
      {
        question: { mn: 'Онолын 6.0 г-аас 4.5 г бүтээгдэхүүн авлаа. Гарц хэд вэ?', en: 'From a theoretical 6.0 g, 4.5 g of product is made. What is the percentage yield?' },
        options: [{ mn: '25%', en: '25%' }, { mn: '75%', en: '75%' }, { mn: '133%', en: '133%' }, { mn: '150%', en: '150%' }],
        answer: 1,
        explanation: { mn: '4.5 ÷ 6.0 × 100 = 75%.', en: '4.5 ÷ 6.0 × 100 = 75%.' }
      }
    ]
  },
  'al-ch-3': {
    question: { mn: 'Ионы, ковалент, металл бодисууд яагаад өөр шинж чанартай вэ?', en: 'Why do ionic, covalent and metallic substances have different properties?' },
    independent: { mn: 'Холбооны төрөл', en: 'Type of bonding' },
    dependent: { mn: 'Хайлах цэг ба цахилгаан дамжуулах чадвар', en: 'Melting point and electrical conductivity' },
    controlled: { mn: 'Ижил температур, ижил хэмжээний бөөм', en: 'Same temperature and similar particle sizes' },
    limitation: {
      mn: 'Холбоог загвараар дүрсэлнэ; бодит холбоо ионы ба ковалент төрлийн хооронд шилжилттэй (туйлт ковалент).',
      en: 'Bonding is shown as a model; real bonds lie between types (polar covalent bonds).'
    },
    keyPoints: [
      { mn: 'Ионы бодис: ионы торууд, өндөр хайлах цэг; хайлсан эсвэл уусмалд цахилгаан дамжуулна.', en: 'Ionic: lattices of ions, high melting point; conducts when molten or dissolved.' },
      { mn: 'Энгийн ковалент молекул: сул молекул хоорондын хүч, бага хайлах цэг; дамжуулахгүй.', en: 'Simple covalent: weak intermolecular forces, low melting point; does not conduct.' },
      { mn: 'Металл: чөлөөт электрон; хатуу төлөвт ч цахилгаан дамжуулна.', en: 'Metallic: delocalised electrons; conducts even as a solid.' }
    ],
    glossary: [
      { term: { mn: 'Ионы холбоо', en: 'Ionic bond' }, def: { mn: 'Эсрэг цэнэгтэй ионуудын цахилгаан таталцал.', en: 'The electrostatic attraction between oppositely charged ions.' } },
      { term: { mn: 'Ковалент холбоо', en: 'Covalent bond' }, def: { mn: 'Хоёр атом электрон хос хамтран ашигладаг холбоо.', en: 'A bond formed when two atoms share a pair of electrons.' } },
      { term: { mn: 'Тархсан электрон', en: 'Delocalised electron' }, def: { mn: 'Нэг атомд харьяалагдахгүй, бүтцээр чөлөөтэй хөдөлж чадах электрон.', en: 'An electron not held by one atom, free to move through the structure.' } }
    ],
    structured: {
      prompt: { mn: 'Натрийн хлорид хайлсан үед дамжуулдаг, харин хатуу байхад дамжуулдаггүй яагаад вэ? Тайлбарла.', en: 'Explain why sodium chloride conducts when molten but not as a solid.' },
      marks: [
        { mn: 'Хатуу төлөвт ионууд торонд бэхлэгдсэн (1)', en: 'In the solid the ions are fixed in a lattice (1)' },
        { mn: 'Хайлсан үед ионууд чөлөөтэй хөдөлнө (1)', en: 'When molten the ions are free to move (1)' },
        { mn: 'Хөдөлж буй ионууд цахилгаан цэнэгийг зөөнө (1)', en: 'The moving ions carry the charge (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Аль холбоо электрон хосыг хамтран ашиглахаар үүснэ вэ?', en: 'Which bond is formed by sharing pairs of electrons?' },
        options: [{ mn: 'Ионы', en: 'Ionic' }, { mn: 'Ковалент', en: 'Covalent' }, { mn: 'Металл', en: 'Metallic' }, { mn: 'Ван-дер-Ваальсын', en: 'Van der Waals' }],
        answer: 1,
        explanation: { mn: 'Ковалент холбоонд атомууд электрон хосыг хамтран ашигладаг.', en: 'In a covalent bond the atoms share pairs of electrons.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Яагаад графит цахилгаан дамжуулдаг, харин алмаз дамжуулдаггүй вэ? Электроноор тайлбарла.', en: 'Explain, using electrons, why graphite conducts electricity but diamond does not.' },
        model: {
          mn: 'Графитын давхаргуудын хооронд тархсан электрон байдаг тул хөдөлж чадна; алмазт нүүрстөрөгч бүр 4 гаднах электроныг ковалент холбоонд ашигладаг тул чөлөөт электрон байхгүй.',
          en: 'Graphite has delocalised electrons between its layers that can move; in diamond every carbon uses all four outer electrons in covalent bonds, so there are no free electrons.'
        },
        explanation: { mn: 'Чөлөөт (тархсан) электрон цахилгаан дамжуулах гол шалтгаан.', en: 'Free (delocalised) electrons are the reason a substance conducts.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Аль бодис хатуу төлөвтөө цахилгаан дамжуулах вэ?', en: 'Which substance conducts electricity as a solid?' },
        options: [{ mn: 'NaCl', en: 'NaCl' }, { mn: 'I₂', en: 'I₂' }, { mn: 'Cu', en: 'Cu' }, { mn: 'SiO₂', en: 'SiO₂' }],
        answer: 2,
        explanation: { mn: 'Зэс металл, тархсан электронтой.', en: 'Copper is a metal with delocalised electrons.' }
      },
      {
        question: { mn: 'Энгийн ковалент бодисын хайлах цэг бага байгаа шалтгаан?', en: 'Why does a simple covalent substance have a low melting point?' },
        options: [
          { mn: 'Атомын хоорондын ковалент холбоо сулардаг.', en: 'The covalent bonds between the atoms are weak.' },
          { mn: 'Молекул хоорондын сул хүч даван туулагдана.', en: 'The weak forces between the molecules are overcome.' },
          { mn: 'Ионууд салдаг.', en: 'The ions separate.' },
          { mn: 'Электрон байдаггүй.', en: 'There are no electrons.' }
        ],
        answer: 1,
        explanation: { mn: 'Хайлахад молекул хоорондын хүч таслагдана, ковалент холбоо эвдэрдэггүй.', en: 'Melting breaks the forces between molecules; the covalent bonds inside them stay intact.' }
      },
      {
        question: { mn: 'N≡N холбоонд хэдэн электрон хос хамтран ашиглагдах вэ?', en: 'How many shared electron pairs are there in N≡N?' },
        options: [{ mn: '1', en: '1' }, { mn: '2', en: '2' }, { mn: '3', en: '3' }, { mn: '6', en: '6' }],
        answer: 2,
        explanation: { mn: 'Гурвалсан холбоо нь гурван электрон хос.', en: 'A triple bond contains three shared pairs.' }
      }
    ]
  },
  'al-ch-4': {
    question: { mn: 'Хатуу бодис хайлахад бөөмсийн энерги хэрхэн өөрчлөгдөх вэ?', en: 'How does the energy of particles change when a solid melts?' },
    independent: { mn: 'Нийлүүлсэн дулаан (энерги)', en: 'Heat (energy) supplied' },
    dependent: { mn: 'Хайлах явцын температур ба төлөв', en: 'Temperature and state during melting' },
    controlled: { mn: 'Даралт, бодисын масс', en: 'Pressure and mass of the substance' },
    limitation: {
      mn: 'Бөөмсийн загвар бол энгийн дүрслэл; хүчийг тодорхой харуулдаггүй.',
      en: 'The particle model is a simplified picture; it does not show the forces explicitly.'
    },
    keyPoints: [
      { mn: 'Цэвэр бодис хайлах явцад температур тогтмол; нийлүүлсэн энерги бөөмсийн хоорондын хүчийг даван туулна.', en: 'A pure substance melts at a constant temperature; the energy supplied overcomes the forces between particles.' },
      { mn: 'Бөөмсийн кинетик энерги температуртай холбоотой.', en: 'The kinetic energy of the particles is related to the temperature.' },
      { mn: 'Хий: бөөмс хол, санамсаргүй хөдөлгөөнтэй.', en: 'Gas: particles far apart and moving randomly.' }
    ],
    glossary: [
      { term: { mn: 'Хайлах цэг', en: 'Melting point' }, def: { mn: 'Хатуу бодис шингэн болох температур.', en: 'The temperature at which a solid becomes a liquid.' } },
      { term: { mn: 'Бөөмсийн кинетик онол', en: 'Kinetic particle theory' }, def: { mn: 'Бүх бодис хөдөлгөөнтэй бөөмсөөс бүрдэнэ гэх онол.', en: 'All matter is made of moving particles.' } },
      { term: { mn: 'Сублимаци', en: 'Sublimation' }, def: { mn: 'Хатуу бодис шингэнгүйгээр шууд хий болох.', en: 'A solid changing directly into a gas without becoming a liquid.' } }
    ],
    structured: {
      prompt: { mn: 'Бөөмсийн үүднээс шингэн буцлах үед юу болохыг тайлбарла.', en: 'Describe, in terms of particles, what happens when a liquid boils.' },
      marks: [
        { mn: 'Бөөмс энерги авна (1)', en: 'The particles gain energy (1)' },
        { mn: 'Бөөмсийн хоорондын хүчийг даван туулна (1)', en: 'They overcome the forces between the particles (1)' },
        { mn: 'Хий болж тархан хөдөлнө (1)', en: 'They escape as a gas and spread out (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Аль төлөв тогтмол эзлэхүүнтэй, гэхдээ тогтмол хэлбэргүй вэ?', en: 'Which state has a fixed volume but no fixed shape?' },
        options: [{ mn: 'Хатуу', en: 'Solid' }, { mn: 'Шингэн', en: 'Liquid' }, { mn: 'Хий', en: 'Gas' }, { mn: 'Хамгийн нь биш', en: 'None of these' }],
        answer: 1,
        explanation: { mn: 'Шингэн савныхаа хэлбэрийг авна, гэхдээ эзлэхүүн нь тогтмол.', en: 'A liquid takes the shape of its container but keeps its volume.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Ус буцалж байхад температур яагаад 100 °C-т тогтмол байх вэ? Тайлбарла.', en: 'Explain why the temperature of boiling water stays at 100 °C even when it is heated.' },
        model: {
          mn: 'Нийлүүлсэн энерги бөөмсийн хоорондын хүчийг таслахад зарцуулагдана; тиймээс кинетик энерги, улмаар температур нэмэгдэхгүй.',
          en: 'The energy supplied breaks the forces between the particles, so their kinetic energy, and therefore the temperature, does not rise.'
        },
        explanation: { mn: 'Хайлах, буцлах үед энерги төлөв өөрчлөхөд зарцуулагдана.', en: 'During melting and boiling the energy is used to change the state.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Цэвэр хатуу бодис хайлах үед температур юу болох вэ?', en: 'What happens to the temperature of a pure solid while it melts?' },
        options: [{ mn: 'Өснө', en: 'It rises' }, { mn: 'Тогтмол байна', en: 'It stays constant' }, { mn: 'Буурна', en: 'It falls' }, { mn: 'Тэг болно', en: 'It becomes zero' }],
        answer: 1,
        explanation: { mn: 'Хайлах цэгт температур бүх бодис хайлтал тогтмол.', en: 'At the melting point the temperature stays constant until all the solid has melted.' }
      },
      {
        question: { mn: 'Аль төлөвт бөөмс хамгийн их зайтай байдаг вэ?', en: 'Which state has the particles furthest apart?' },
        options: [{ mn: 'Хатуу', en: 'Solid' }, { mn: 'Шингэн', en: 'Liquid' }, { mn: 'Хий', en: 'Gas' }, { mn: 'Бүгд ижил', en: 'All equal' }],
        answer: 2,
        explanation: { mn: 'Хийн бөөмс хоорондоо хамгийн хол.', en: 'Gas particles are the furthest apart.' }
      },
      {
        question: { mn: 'Сублимаци гэж юу вэ?', en: 'What is sublimation?' },
        options: [
          { mn: 'Хатуу → хий', en: 'Solid → gas' },
          { mn: 'Шингэн → хий', en: 'Liquid → gas' },
          { mn: 'Хий → шингэн', en: 'Gas → liquid' },
          { mn: 'Хатуу → шингэн', en: 'Solid → liquid' }
        ],
        answer: 0,
        explanation: { mn: 'Сублимаци нь хатуу бодисыг шингэнгүйгээр шууд хий болгоно.', en: 'Sublimation changes a solid directly into a gas.' }
      }
    ]
  },
  'al-ch-5': {
    question: { mn: 'Урвал экзотерм эсвэл эндотерм вэ, холбооны энерги яаж тайлбарлах вэ?', en: 'Is a reaction exothermic or endothermic, and how do bond energies explain it?' },
    independent: { mn: 'Таслагдсан ба үүссэн холбоо (холбооны энерги)', en: 'Bonds broken and bonds formed (bond energies)' },
    dependent: { mn: 'Энтальпийн өөрчлөлт ΔH (тэмдэг ба хэмжээ)', en: 'Enthalpy change ΔH (sign and size)' },
    controlled: { mn: 'Ижил реактант ба бүтээгдэхүүн, стандарт нөхцөл', en: 'Same reactants and products, standard conditions' },
    limitation: {
      mn: 'Холбооны энерги нь дундаж утга; бодит ΔH-тай бага зэрэг ялгаатай байж болно.',
      en: 'Bond energies are average values, so the real ΔH may differ slightly.'
    },
    keyPoints: [
      { mn: 'ΔH = (таслагдсан холбооны энерги) − (үүссэн холбооны энерги).', en: 'ΔH = (energy to break bonds) − (energy released forming bonds).' },
      { mn: 'Экзотерм: ΔH сөрөг, энерги ялгарна. Эндотерм: ΔH эерэг.', en: 'Exothermic: ΔH is negative, energy is released. Endothermic: ΔH is positive.' },
      { mn: 'Энергийн диаграмм: бүтээгдэхүүний түвшин реактантаас доош бол экзотерм.', en: 'In an energy profile, products below reactants means exothermic.' }
    ],
    glossary: [
      { term: { mn: 'Энтальпийн өөрчлөлт (ΔH)', en: 'Enthalpy change (ΔH)' }, def: { mn: 'Тогтмол даралтад урвалд ялгарсан эсвэл авсан дулаан.', en: 'The heat change of a reaction at constant pressure.' } },
      { term: { mn: 'Экзотерм урвал', en: 'Exothermic reaction' }, def: { mn: 'Орчинд дулаан ялгаруулдаг урвал; ΔH < 0.', en: 'A reaction that gives out heat to the surroundings; ΔH < 0.' } },
      { term: { mn: 'Холбооны энерги', en: 'Bond energy' }, def: { mn: '1 моль холбоог таслахад шаардагдах энерги.', en: 'The energy needed to break 1 mole of a bond.' } }
    ],
    structured: {
      prompt: { mn: 'H₂ + Cl₂ → 2HCl урвалын ΔH-г холбооны энергиэр тооцоол (H–H 436, Cl–Cl 242, H–Cl 431 кДж/моль).', en: 'Use bond energies to calculate ΔH for H₂ + Cl₂ → 2HCl (H–H 436, Cl–Cl 242, H–Cl 431 kJ/mol).' },
      marks: [
        { mn: 'Таслагдсан холбоо = 436 + 242 = 678 кДж (1)', en: 'Bonds broken = 436 + 242 = 678 kJ (1)' },
        { mn: 'Үүссэн холбоо = 2 × 431 = 862 кДж (1)', en: 'Bonds made = 2 × 431 = 862 kJ (1)' },
        { mn: 'ΔH = 678 − 862 = −184 кДж/моль, экзотерм (1)', en: 'ΔH = 678 − 862 = −184 kJ/mol, exothermic (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Экзотерм урвалын ΔH-ийн тэмдэг аль нь вэ?', en: 'What is the sign of ΔH for an exothermic reaction?' },
        options: [{ mn: '+', en: '+' }, { mn: '−', en: '−' }, { mn: '0', en: '0' }, { mn: 'Тэмдэггүй', en: 'No sign' }],
        answer: 1,
        explanation: { mn: 'Экзотерм урвалд энерги ялгардаг тул ΔH сөрөг.', en: 'Energy is released in an exothermic reaction, so ΔH is negative.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'CH₄ + 2O₂ → CO₂ + 2H₂O урвалын ΔH-г тооцоол: C–H 412, O=O 498, C=O 805, O–H 463 кДж/моль.', en: 'Calculate ΔH for CH₄ + 2O₂ → CO₂ + 2H₂O using C–H 412, O=O 498, C=O 805, O–H 463 kJ/mol.' },
        model: { mn: 'Таслагдсан: 4×412 + 2×498 = 2644; үүссэн: 2×805 + 4×463 = 3462; ΔH = 2644 − 3462 = −818 кДж/моль', en: 'Broken: 4×412 + 2×498 = 2644; made: 2×805 + 4×463 = 3462; ΔH = 2644 − 3462 = −818 kJ/mol' },
        explanation: { mn: 'Бүх таслагдсан холбоог нийлбэрлэж, бүх үүссэн холбоотой харьцуулна.', en: 'Add all the bonds broken, add all the bonds made, then subtract.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Таслагдсан холбоо 1000 кДж, үүссэн холбоо 1200 кДж. ΔH хэд вэ?', en: 'Bonds broken total 1000 kJ and bonds made total 1200 kJ. What is ΔH?' },
        options: [{ mn: '+2200 кДж', en: '+2200 kJ' }, { mn: '+200 кДж', en: '+200 kJ' }, { mn: '−200 кДж', en: '−200 kJ' }, { mn: '−2200 кДж', en: '−2200 kJ' }],
        answer: 2,
        explanation: { mn: 'ΔH = 1000 − 1200 = −200 кДж.', en: 'ΔH = 1000 − 1200 = −200 kJ.' }
      },
      {
        question: { mn: 'Аль нь эндотерм урвалыг тодорхойлох вэ?', en: 'Which describes an endothermic reaction?' },
        options: [
          { mn: 'Орчинд энерги ялгаруулна', en: 'Energy is given out to the surroundings' },
          { mn: 'Температур өснө', en: 'The temperature rises' },
          { mn: 'Орчноос энерги авна', en: 'Energy is taken in from the surroundings' },
          { mn: 'ΔH сөрөг', en: 'ΔH is negative' }
        ],
        answer: 2,
        explanation: { mn: 'Эндотерм урвал орчноос дулаан авдаг; ΔH эерэг.', en: 'An endothermic reaction takes in heat from the surroundings; ΔH is positive.' }
      },
      {
        question: { mn: 'Экзотерм урвалын энергийн диаграммд бүтээгдэхүүн реактантаас юу байх вэ?', en: 'In the energy profile of an exothermic reaction, where are the products compared with the reactants?' },
        options: [{ mn: 'Дээр', en: 'Higher' }, { mn: 'Доор', en: 'Lower' }, { mn: 'Адил', en: 'Equal' }, { mn: 'Тодорхойлох боломжгүй', en: 'Cannot be told' }],
        answer: 1,
        explanation: { mn: 'Энерги ялгарсан тул бүтээгдэхүүний энерги бага.', en: 'Energy is released, so the products have less energy.' }
      }
    ]
  },
  'al-ch-6': {
    question: { mn: 'Урвалд исэлдэлт ба бууралтыг яаж тодорхойлох вэ?', en: 'How can oxidation and reduction be identified in a reaction?' },
    independent: { mn: 'Элементийн исэлдэлтийн дугаарын өөрчлөлт', en: 'Change in the oxidation number of an element' },
    dependent: { mn: 'Бөөм электрон авах уу, алдах уу', en: 'Whether the species gains or loses electrons' },
    controlled: { mn: 'Ижил урвалын тэгшитгэл', en: 'The same reaction equation' },
    limitation: {
      mn: 'Исэлдэлтийн дугаар бол тооцооны арга; ковалент нэгдэлд атомын бодит цэнэг биш.',
      en: 'Oxidation numbers are a bookkeeping method; in covalent compounds they are not real charges on atoms.'
    },
    keyPoints: [
      { mn: 'OIL RIG: исэлдэлт бол электрон алдах, бууралт бол электрон авах.', en: 'OIL RIG: oxidation is loss of electrons, reduction is gain of electrons.' },
      { mn: 'Исэлдэлтийн дугаарын дүрмүүдийг ашиглана (жишээ нь O = −2, H = +1).', en: 'Use the oxidation-number rules (for example O = −2, H = +1).' },
      { mn: 'Исэлдүүлэгч бодис өөрөө бууралтад орно.', en: 'The oxidising agent is itself reduced.' }
    ],
    glossary: [
      { term: { mn: 'Исэлдэлт', en: 'Oxidation' }, def: { mn: 'Электрон алдах, исэлдэлтийн дугаар нэмэгдэх.', en: 'Loss of electrons; the oxidation number increases.' } },
      { term: { mn: 'Бууралт', en: 'Reduction' }, def: { mn: 'Электрон авах, исэлдэлтийн дугаар буурах.', en: 'Gain of electrons; the oxidation number decreases.' } },
      { term: { mn: 'Исэлдэлтийн дугаар', en: 'Oxidation number' }, def: { mn: 'Атомд тооцсон цэнэгийн тоо, дүрмийн дагуу.', en: 'A number assigned to an atom by a set of rules.' } }
    ],
    structured: {
      prompt: { mn: '2Mg + O₂ → 2MgO яагаад redox урвал болох вэ?', en: 'Explain why 2Mg + O₂ → 2MgO is a redox reaction.' },
      marks: [
        { mn: 'Mg электрон алдана, исэлдэлтийн дугаар 0 → +2 (1)', en: 'Mg loses electrons, oxidation number 0 → +2 (1)' },
        { mn: 'O электрон авна, исэлдэлтийн дугаар 0 → −2 (1)', en: 'O gains electrons, oxidation number 0 → −2 (1)' },
        { mn: 'Электрон шилжилт явагдана (1)', en: 'Electrons are transferred (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'H₂O-д устөрөгчийн исэлдэлтийн дугаар хэд вэ?', en: 'What is the oxidation number of hydrogen in H₂O?' },
        options: [{ mn: '−1', en: '−1' }, { mn: '+1', en: '+1' }, { mn: '0', en: '0' }, { mn: '+2', en: '+2' }],
        answer: 1,
        explanation: { mn: 'Устөрөгч нь ихэвчлэн +1 (металлын гидридээс бусад).', en: 'Hydrogen is usually +1 (except in metal hydrides).' }
      },
      {
        level: 'hard',
        prompt: { mn: 'SO₄²⁻-ийн S-ийн исэлдэлтийн дугаарыг тооцоол.', en: 'Calculate the oxidation number of S in SO₄²⁻.' },
        model: { mn: 'x + 4(−2) = −2 → x = +6', en: 'x + 4(−2) = −2 → x = +6' },
        explanation: { mn: 'Ионы нийт цэнэг нь бүх исэлдэлтийн дугаарын нийлбэртэй тэнцүү.', en: 'The total charge of the ion equals the sum of the oxidation numbers.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Zn + Cu²⁺ → Zn²⁺ + Cu урвалд аль нь исэлдэх вэ?', en: 'In Zn + Cu²⁺ → Zn²⁺ + Cu, which is oxidised?' },
        options: [{ mn: 'Zn', en: 'Zn' }, { mn: 'Cu²⁺', en: 'Cu²⁺' }, { mn: 'Cu', en: 'Cu' }, { mn: 'Zn²⁺', en: 'Zn²⁺' }],
        answer: 0,
        explanation: { mn: 'Zn 2 электрон алдаж Zn²⁺ болно.', en: 'Zn loses 2 electrons to form Zn²⁺.' }
      },
      {
        question: { mn: 'MnO₄⁻-ийн Mn-ийн исэлдэлтийн дугаар хэд вэ?', en: 'What is the oxidation number of Mn in MnO₄⁻?' },
        options: [{ mn: '+2', en: '+2' }, { mn: '+4', en: '+4' }, { mn: '+7', en: '+7' }, { mn: '−1', en: '−1' }],
        answer: 2,
        explanation: { mn: 'x + 4(−2) = −1 → x = +7.', en: 'x + 4(−2) = −1 → x = +7.' }
      },
      {
        question: { mn: 'Бууруулагч бодис аль нь вэ?', en: 'Which substance is the reducing agent?' },
        options: [
          { mn: 'Электрон авсан бодис', en: 'The substance that gains electrons' },
          { mn: 'Бууралтад орсон бодис', en: 'The substance that is reduced' },
          { mn: 'Электрон алдсан (исэлдсэн) бодис', en: 'The substance that loses electrons (is oxidised)' },
          { mn: 'Ус', en: 'Water' }
        ],
        answer: 2,
        explanation: { mn: 'Бууруулагч бодис өөрөө исэлдэж, бусдыг бууруулна.', en: 'A reducing agent is itself oxidised and reduces another species.' }
      }
    ]
  }
};
