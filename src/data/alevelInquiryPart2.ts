import type { AlevelInquiryPlan } from './alevelInquiryTypes';

// The 40-minute inquiry lessons of 9701 chapters 7 to 11. Written for this course from the syllabus.

export const ALEVEL_INQUIRY_PART2: Record<string, AlevelInquiryPlan> = {
  'al-ch-7': {
    question: { mn: 'Нөхцөл өөрчлөгдөхөд тэнцвэрийн байрлал яаж өөрчлөгдөх вэ?', en: 'How does changing a condition affect the position of an equilibrium?' },
    independent: { mn: 'Температур, даралт эсвэл концентрац', en: 'Temperature, pressure or concentration' },
    dependent: { mn: 'Тэнцвэрийн байрлал (бүтээгдэхүүний гарц)', en: 'Position of the equilibrium (yield of product)' },
    controlled: { mn: 'Ижил эргэх урвал ба холимог', en: 'The same reversible reaction and mixture' },
    limitation: {
      mn: 'Ле Шателийн зарчим чиглэлийг урьдчилан хэлнэ, хурдыг биш. Катализатор хурдыг өөрчилнө, тэнцвэрийн байрлалыг биш.',
      en: 'Le Chatelier’s principle predicts the direction, not the rate. A catalyst changes the rate, not the position.'
    },
    keyPoints: [
      { mn: 'Хаалттай системд урагш ба урвуу урвалын хурд тэнцүү байхад тэнцвэр динамик.', en: 'In a closed system, equilibrium is dynamic: forward and reverse rates are equal.' },
      { mn: 'Ле Шателийн зарчим: системийн өөрчлөлтийг эсэргүүцэх чиглэлд шилжинэ.', en: 'Le Chatelier: the system shifts to oppose a change.' },
      { mn: 'Катализатор тэнцвэрийн байрлалыг өөрчилдөггүй.', en: 'A catalyst does not change the position of equilibrium.' }
    ],
    glossary: [
      { term: { mn: 'Динамик тэнцвэр', en: 'Dynamic equilibrium' }, def: { mn: 'Урагш ба урвуу урвалын хурд тэнцүү, бодисын хэмжээ тогтмол байх төлөв.', en: 'A state where forward and reverse rates are equal and amounts stay constant.' } },
      { term: { mn: 'Ле Шателийн зарчим', en: 'Le Chatelier’s principle' }, def: { mn: 'Тэнцвэр нь өөрчлөлтийг эсэргүүцэх чиглэлд шилжинэ.', en: 'Equilibrium shifts to oppose any change made to it.' } },
      { term: { mn: 'Катализатор', en: 'Catalyst' }, def: { mn: 'Урвалын хурдыг нэмэгдүүлдэг, өөрөө зарцуулагддаггүй бодис.', en: 'A substance that speeds up a reaction and is not used up.' } }
    ],
    structured: {
      prompt: { mn: 'N₂ + 3H₂ ⇌ 2NH₃ тэнцвэрт даралтыг нэмэгдүүлэхэд юу болохыг тайлбарла.', en: 'State and explain the effect of increasing pressure on N₂ + 3H₂ ⇌ 2NH₃.' },
      marks: [
        { mn: 'Тэнцвэр баруун тийш шилжинэ (хийн моль 4 → 2) (1)', en: 'The equilibrium moves to the right (gas moles 4 → 2) (1)' },
        { mn: 'Систем даралтын өсөлтийг эсэргүүцнэ (1)', en: 'The system opposes the increase in pressure (1)' },
        { mn: 'NH₃-ын гарц нэмэгдэнэ (1)', en: 'The yield of NH₃ increases (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Урагш урвал эндотерм байхад тэнцвэрийг баруун тийш шилжүүлэх өөрчлөлт аль нь вэ?', en: 'Which change moves the equilibrium to the right when the forward reaction is endothermic?' },
        options: [{ mn: 'Температурыг бууруулах', en: 'Decrease the temperature' }, { mn: 'Температурыг нэмэгдүүлэх', en: 'Increase the temperature' }, { mn: 'Катализатор нэмэх', en: 'Add a catalyst' }, { mn: 'Хамгийн нь биш', en: 'None of these' }],
        answer: 1,
        explanation: { mn: 'Эндотерм урагш урвал дулаанаас ашиг олдог.', en: 'The endothermic forward reaction benefits from heat.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Катализатор нэмэхэд аммиакийн гарц яагаад өөрчлөгдөхгүй вэ? Тайлбарла.', en: 'Explain why adding a catalyst does not change the equilibrium yield of ammonia.' },
        model: {
          mn: 'Катализатор урагш ба урвуу урвалын хурдыг адил нэмэгдүүлнэ; тиймээс тэнцвэрт хурдан хүрнэ, харин тэнцвэрийн байрлал (гарц) өөрчлөгдөхгүй.',
          en: 'A catalyst speeds up the forward and reverse reactions equally, so equilibrium is reached faster, but the position (yield) does not change.'
        },
        explanation: { mn: 'Тэнцвэрийн байрлалыг термодинамик зарчим тодорхойлдог, катализатор биш.', en: 'The position is set by the thermodynamics, not by the catalyst.' }
      }
    ],
    exit: [
      {
        question: { mn: 'N₂ + 3H₂ ⇌ 2NH₃ (урагш урвал экзотерм). Температур нэмэгдэхэд тэнцвэр аль тийш шилжих вэ?', en: 'N₂ + 3H₂ ⇌ 2NH₃ (forward reaction exothermic). When the temperature increases, which way does equilibrium move?' },
        options: [{ mn: 'Зүүн (реактант тийш)', en: 'Left (towards reactants)' }, { mn: 'Баруун', en: 'Right' }, { mn: 'Өөрчлөгдөхгүй', en: 'No change' }, { mn: 'Тодорхойлох боломжгүй', en: 'Cannot tell' }],
        answer: 0,
        explanation: { mn: 'Экзотерм урагш урвалын эсрэг чиглэлд шилжинэ.', en: 'It moves against the exothermic forward reaction.' }
      },
      {
        question: { mn: 'Даралтыг нэмэгдүүлэхэд тэнцвэр аль талыг илүү дэмжих вэ?', en: 'Increasing the pressure favours the side with:' },
        options: [{ mn: 'Илүү олон хийн моль', en: 'More gas molecules' }, { mn: 'Цөөн хийн моль', en: 'Fewer gas molecules' }, { mn: 'Ижил тоо', en: 'Equal numbers' }, { mn: 'Хийн моль огт байхгүй', en: 'No gas molecules' }],
        answer: 1,
        explanation: { mn: 'Даралтыг бууруулах чиглэлд, цөөн моль рүү шилжинэ.', en: 'The equilibrium moves to reduce the pressure, towards fewer moles of gas.' }
      },
      {
        question: { mn: 'Катализатор тэнцвэрийн байрлалд ямар нөлөө үзүүлэх вэ?', en: 'What effect does a catalyst have on the position of equilibrium?' },
        options: [{ mn: 'Баруун тийш шилжүүлнэ', en: 'Moves it to the right' }, { mn: 'Зүүн тийш шилжүүлнэ', en: 'Moves it to the left' }, { mn: 'Өөрчлөхгүй', en: 'No change' }, { mn: 'Урвалыг зогсооно', en: 'Stops the reaction' }],
        answer: 2,
        explanation: { mn: 'Катализатор хоёр чиглэлийг адил хурдасгана.', en: 'A catalyst speeds up both directions equally.' }
      }
    ]
  },
  'al-ch-8': {
    question: { mn: 'Концентраци урвалын хурдад яаж нөлөөлөх вэ?', en: 'How does the concentration of a reactant affect the rate of a reaction?' },
    independent: { mn: 'Хүчлийн концентраци', en: 'Concentration of the acid' },
    dependent: { mn: 'Хийн эзлэхүүн цуглуулах хурд (эсвэл массын алдагдал)', en: 'Rate of gas collection (or mass loss)' },
    controlled: { mn: 'Температур, гантигийн масс ба гадаргуугийн талбай', en: 'Temperature, mass and surface area of the marble' },
    limitation: {
      mn: 'Мөргөлдөөний онол хандлагыг тайлбарлана; бодит хурд нь хэмжилтээс харагдана, бусад хүчин зүйл (катализатор) нөлөөлж болно.',
      en: 'Collision theory explains the trend; the actual rate comes from measurement, and other factors such as a catalyst may also act.'
    },
    keyPoints: [
      { mn: 'Урвалын хурд = бүтээгдэхүүний хэмжээний өөрчлөлт ÷ хугацаа.', en: 'Rate = change in the amount of product ÷ time.' },
      { mn: 'Мөргөлдөөний онол: амжилттай мөргөлдөөнд бөөмс идэвхжүүлэх энергийг (Eₐ) давах хэрэгтэй.', en: 'Collision theory: successful collisions need energy at least equal to the activation energy (Eₐ).' },
      { mn: 'Концентраци нэмэгдэхэд нэгж эзлэхүүнд бөөм их, мөргөлдөөн жигд.', en: 'Higher concentration means more particles per unit volume and more frequent collisions.' }
    ],
    glossary: [
      { term: { mn: 'Урвалын хурд', en: 'Rate of reaction' }, def: { mn: 'Нэгж хугацаанд бүтээгдэхүүн үүсэх эсвэл реактант зарцуулагдах хурд.', en: 'The change in amount of product (or reactant) per unit time.' } },
      { term: { mn: 'Идэвхжүүлэх энерги (Eₐ)', en: 'Activation energy (Eₐ)' }, def: { mn: 'Урвал эхлэхэд шаардагдах хамгийн бага энерги.', en: 'The minimum energy needed for a reaction to start.' } },
      { term: { mn: 'Мөргөлдөөний онол', en: 'Collision theory' }, def: { mn: 'Урвал бөөмсийн амжилттай мөргөлдөөнөөс үүснэ гэх онол.', en: 'Reactions happen when particles collide with enough energy and the correct orientation.' } }
    ],
    structured: {
      prompt: { mn: 'Мөргөлдөөний онолоор температур нэмэгдэхэд урвалын хурд яагаад нэмэгдэхийг тайлбарла.', en: 'Using collision theory, explain why raising the temperature increases the rate.' },
      marks: [
        { mn: 'Бөөмс илүү хурдан хөдөлж, кинетик энерги нэмэгдэнэ (1)', en: 'Particles move faster and have more kinetic energy (1)' },
        { mn: 'Секундэд мөргөлдөөн илүү олон болно (1)', en: 'There are more collisions per second (1)' },
        { mn: 'Илүү олон мөргөлдөөн Eₐ-аас их энергитэй байна (1)', en: 'More collisions have energy at least equal to Eₐ (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Урвалын хурдны зөв нэгжийг сонго (концентрацаар тооцсон).', en: 'Choose the correct unit for the rate of reaction measured by concentration.' },
        options: [{ mn: 'моль дм⁻³ с⁻¹', en: 'mol dm⁻³ s⁻¹' }, { mn: 'с', en: 's' }, { mn: 'моль', en: 'mol' }, { mn: 'дм³', en: 'dm³' }],
        answer: 0,
        explanation: { mn: 'Концентрацийн өөрчлөлт (моль дм⁻³) ÷ хугацаа (с).', en: 'The change in concentration (mol dm⁻³) divided by time (s).' }
      },
      {
        level: 'hard',
        prompt: { mn: '30 секундэд 60 см³ хий цуглуулав. Дундаж хурдыг см³/с-аар тооцоол.', en: 'In 30 s, 60 cm³ of gas is collected. Calculate the average rate in cm³/s.' },
        model: { mn: '60 ÷ 30 = 2 см³/с', en: '60 ÷ 30 = 2 cm³/s' },
        explanation: { mn: 'Дундаж хурд = цуглуулсан эзлэхүүн ÷ хугацаа.', en: 'Average rate = volume collected ÷ time.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Аль өөрчлөлт идэвхжүүлэх энергийг давсан бөөмсийн хувийг нэмэгдүүлэх вэ?', en: 'Which change increases the proportion of particles with energy above Eₐ?' },
        options: [{ mn: 'Температурыг бууруулах', en: 'Decreasing the temperature' }, { mn: 'Температурыг нэмэгдүүлэх', en: 'Increasing the temperature' }, { mn: 'Концентрацийг бууруулах', en: 'Decreasing the concentration' }, { mn: 'Ус нэмэх', en: 'Adding water' }],
        answer: 1,
        explanation: { mn: 'Температур өсөхөд илүү олон бөөм Eₐ-аас их энергитэй болно.', en: 'At a higher temperature more particles have energy above Eₐ.' }
      },
      {
        question: { mn: 'Катализатор урвалын хурдыг яаж нэмэгдүүлдэг вэ?', en: 'A catalyst increases the rate by:' },
        options: [{ mn: 'Eₐ-г нэмэгдүүлэх', en: 'Increasing Eₐ' }, { mn: 'Eₐ-г бууруулах', en: 'Lowering Eₐ' }, { mn: 'Реактантыг зарцуулах', en: 'Using up the reactants' }, { mn: 'Температурыг нэмэгдүүлэх', en: 'Raising the temperature' }],
        answer: 1,
        explanation: { mn: 'Катализатор өөр, идэвхжүүлэх энерги бага зам өгнө.', en: 'A catalyst provides an alternative route with a lower activation energy.' }
      },
      {
        question: { mn: 'Гантигийн нунтаг нь том хэсгээс хурдан урвалд орох шалтгаан?', en: 'Powdered marble reacts faster than lumps because:' },
        options: [{ mn: 'Eₐ өндөр', en: 'It has a higher Eₐ' }, { mn: 'Гадаргуугийн талбай их, мөргөлдөөн олон', en: 'It has more surface area for collisions' }, { mn: 'Илүү халуун', en: 'It is hotter' }, { mn: 'Илүү цэвэр', en: 'It is purer' }],
        answer: 1,
        explanation: { mn: 'Гадаргуугийн талбай их байвал хүчилтэй мөргөлдөх боломж нэмэгдэнэ.', en: 'A larger surface area gives more places for the acid to collide with the solid.' }
      }
    ]
  },
  'al-ch-9': {
    question: { mn: 'Үе 3-т атомын радиус ба анхдагч ионжих энерги яаж өөрчлөгдөх вэ?', en: 'How do atomic radius and first ionisation energy change across Period 3?' },
    independent: { mn: 'Протоны тоо (Na-аас Ar хүртэл)', en: 'Proton number across Period 3 (Na to Ar)' },
    dependent: { mn: 'Атомын радиус, анхдагч ионжих энерги', en: 'Atomic radius and first ionisation energy' },
    controlled: { mn: 'Нэг үе (ижил бүрхүүлийн тоо)', en: 'Same period (same number of shells)' },
    limitation: {
      mn: 'Хандлага нь идеал утга; Mg→Al, P→S-ийн онцгой утгууд дэд бүрхүүлийн бүтцээс үүдэлтэй.',
      en: 'The trends are idealised; the exceptions (Mg → Al, P → S) come from the subshell structure.'
    },
    keyPoints: [
      { mn: 'Үеэр зүүнээс баруун тийш цөмийн цэнэг нэмэгдэж, радиус буурна.', en: 'Across the period the nuclear charge increases and the radius decreases.' },
      { mn: 'Ионжих энерги ерөнхийдөө нэмэгдэнэ; Al ба S-д бага зэрэг буурна.', en: 'The ionisation energy generally increases; it dips at Al and S.' },
      { mn: 'Al-ийн 3p электрон 3s-ээс илүү хол, илүү өндөр энергитэй.', en: 'In Al the 3p electron is higher in energy and further out than the 3s electrons.' }
    ],
    glossary: [
      { term: { mn: 'Анхдагч ионжих энерги', en: 'First ionisation energy' }, def: { mn: 'Нэг мольд 1 моль нэг цэнэгтэй ион үүсгэх энерги.', en: 'The energy needed to remove one electron from each atom in one mole of gaseous atoms.' } },
      { term: { mn: 'Атомын радиус', en: 'Atomic radius' }, def: { mn: 'Цөмөөс хамгийн гадны электрон хүртэлх зай.', en: 'The distance from the nucleus to the outermost electrons.' } },
      { term: { mn: 'Хамгаалалт (shielding)', en: 'Shielding' }, def: { mn: 'Дотоод электронууд цөмийн татах хүчийг сулруулах нөлөө.', en: 'Inner electrons reducing the pull of the nucleus on the outer electrons.' } }
    ],
    structured: {
      prompt: { mn: 'Үе 3-т зүүнээс баруун тийш атомын радиус яагаад буурах вэ? Тайлбарла.', en: 'Explain why atomic radius decreases across Period 3.' },
      marks: [
        { mn: 'Цөмийн цэнэг нэмэгдэнэ (1)', en: 'The nuclear charge increases (1)' },
        { mn: 'Электронууд ижил бүрхүүлд нэмэгдэнэ (1)', en: 'Electrons are added to the same shell (1)' },
        { mn: 'Их татах хүч электронуудыг цөмд ойртуулна (1)', en: 'The greater attraction pulls the electrons closer (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Үе 3-т аль элемент хамгийн том атомын радиустай вэ?', en: 'Which element in Period 3 has the largest atomic radius?' },
        options: [{ mn: 'Na', en: 'Na' }, { mn: 'Cl', en: 'Cl' }, { mn: 'Ar', en: 'Ar' }, { mn: 'Mg', en: 'Mg' }],
        answer: 0,
        explanation: { mn: 'Na нь үеийн зүүн хэсэгт, цөмийн цэнэг хамгийн бага.', en: 'Na is at the left of the period, with the smallest nuclear charge.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'S-ийн анхдагч ионжих энерги P-ээс яагаад бага вэ? Тайлбарла.', en: 'Explain why S has a lower first ionisation energy than P.' },
        model: {
          mn: 'S-д устгагдах электрон хосолсон 3p орбиталаас гардаг; хосолсон электронуудын түлхэлт нь үүнийг хялбар болгодог.',
          en: 'In S the electron removed comes from a paired 3p orbital; repulsion between the paired electrons makes it easier to remove.'
        },
        explanation: { mn: 'P-д 3p орбиталд нэг бүрчлэн электрон байдаг.', en: 'In P each 3p orbital holds one electron.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Үе 3-т зүүнээс баруун тийш атомын радиус яах вэ?', en: 'Across Period 3, the atomic radius:' },
        options: [{ mn: 'Нэмэгдэнэ', en: 'Increases' }, { mn: 'Буурна', en: 'Decreases' }, { mn: 'Өөрчлөгдөхгүй', en: 'Stays the same' }, { mn: 'Ээлжлэн өөрчлөгдөнө', en: 'Alternates' }],
        answer: 1,
        explanation: { mn: 'Цөмийн цэнэг нэмэгдэж, электронууд ойртоно.', en: 'The nuclear charge increases and the electrons are pulled closer.' }
      },
      {
        question: { mn: 'Аль элементийн анхдагч ионжих энерги үеийн хамгийн өндөр вэ?', en: 'Which element in Period 3 has the highest first ionisation energy?' },
        options: [{ mn: 'Na', en: 'Na' }, { mn: 'Mg', en: 'Mg' }, { mn: 'Cl', en: 'Cl' }, { mn: 'Ar', en: 'Ar' }],
        answer: 3,
        explanation: { mn: 'Ar-ийн бүрхүүл бүтэн, тогтвортой.', en: 'Ar has a full, stable outer shell.' }
      },
      {
        question: { mn: 'Al-ийн анхдагч ионжих энерги Mg-ээс яагаад бага вэ?', en: 'Why does Al have a lower first ionisation energy than Mg?' },
        options: [
          { mn: 'Al-д протон цөөн', en: 'Al has fewer protons' },
          { mn: '3p электрон 3s-ээс хялбар салдаг', en: 'The 3p electron is easier to remove than a 3s electron' },
          { mn: 'Al-д нейтрон илүү', en: 'Al has more neutrons' },
          { mn: 'Al бол металл биш', en: 'Al is not a metal' }
        ],
        answer: 1,
        explanation: { mn: '3p дэд бүрхүүл 3s-ээс өндөр энергитэй тул электрон түүнээс хялбар салдаг.', en: 'The 3p subshell has a higher energy than 3s, so its electron is easier to remove.' }
      }
    ]
  },
  'al-ch-10': {
    question: { mn: 'II бүлгийн металлын идэвх доош бүлэгт яаж өөрчлөгдөх вэ?', en: 'How does the reactivity of Group 2 metals change down the group?' },
    independent: { mn: 'II бүлгийн металл (Mg, Ca, Sr, Ba)', en: 'Group 2 metal (Mg, Ca, Sr, Ba)' },
    dependent: { mn: 'Усанд (эсвэл суларсан хүчилд) урвалын хурд', en: 'Rate of reaction with water (or dilute acid)' },
    controlled: { mn: 'Ижил масс, гадаргуу, температур', en: 'Same mass, surface area and temperature' },
    limitation: {
      mn: 'Магни хүйтэн усанд удаан урвалд орно; хандлага хамгийн тодорхой ижил температур, гадаргуутай үед харагдана.',
      en: 'Magnesium reacts slowly with cold water; the trend is clearest at the same temperature and surface area.'
    },
    keyPoints: [
      { mn: 'Доош бүлэгт идэвх нэмэгдэнэ: гаднах электрон цөмөөс хол, амар алдагдана.', en: 'Reactivity increases down the group: the outer electrons are further out and lost more easily.' },
      { mn: 'Доош бүлэгт карбонатын дулааны тогтвортой байдал нэмэгдэнэ.', en: 'The thermal stability of the carbonates increases down the group.' },
      { mn: 'II бүлгийн металл 2+ ион үүсгэнэ.', en: 'Group 2 metals form 2+ ions.' }
    ],
    glossary: [
      { term: { mn: 'II бүлгийн металл', en: 'Group 2 metal' }, def: { mn: 'Гаднах бүрхүүлд 2 электронтой металл.', en: 'A metal with two electrons in its outer shell.' } },
      { term: { mn: 'Ионжилт', en: 'Ionisation' }, def: { mn: 'Атомаас электрон салгаж ион үүсгэх үйл явц.', en: 'Removing an electron from an atom to form an ion.' } },
      { term: { mn: 'Дулааны задрал', en: 'Thermal decomposition' }, def: { mn: 'Халаах замаар нэгдлийг энгийн бодис болгон задлах.', en: 'Breaking a compound down into simpler substances by heating.' } }
    ],
    structured: {
      prompt: { mn: 'Кальци усттай магнийнээс илүү эрчимтэй урвалд орох шалтгааныг тайлбарла.', en: 'Explain why calcium reacts more vigorously with water than magnesium.' },
      marks: [
        { mn: 'Ca-ийн гаднах электрон цөмөөс илүү хол (1)', en: 'In Ca the outer electrons are further from the nucleus (1)' },
        { mn: 'Тэдгээрийг алдахад бага энерги шаардагдана (1)', en: 'Less energy is needed to lose them (1)' },
        { mn: 'Тиймээс урвал хурдан явагдана (1)', en: 'So the reaction is faster (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'II бүлгийн металл усантай урвалд орох үед ямар хий үүсэх вэ?', en: 'What gas is produced when a Group 2 metal reacts with water?' },
        options: [{ mn: 'Хүчилтөрөгч', en: 'Oxygen' }, { mn: 'Устөрөгч', en: 'Hydrogen' }, { mn: 'Хлор', en: 'Chlorine' }, { mn: 'Нүүрстөрөгчийн диоксид', en: 'Carbon dioxide' }],
        answer: 1,
        explanation: { mn: 'M + 2H₂O → M(OH)₂ + H₂.', en: 'M + 2H₂O → M(OH)₂ + H₂.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'BaCO₃ яагаад MgCO₃-аас илүү өндөр температурт задрах вэ? Тайлбарла.', en: 'Explain why BaCO₃ needs a higher temperature to decompose than MgCO₃.' },
        model: {
          mn: 'Ba²⁺ нь том, цэнэгийн нягтрал бага тул карбонатын ионыг бага туйлшруулдаг; C–O холбоо бэхэвтэй, илүү дулаан шаардана.',
          en: 'Ba²⁺ is larger with a lower charge density, so it polarises the carbonate ion less; the C–O bonds are stronger and need more heat.'
        },
        explanation: { mn: 'Доош бүлэгт катион томорч, туйлшруулах чадвар буурна.', en: 'Down the group the cation gets larger and its polarising power falls.' }
      }
    ],
    exit: [
      {
        question: { mn: 'II бүлэгт доош бүлэгт идэвх яах вэ?', en: 'Down Group 2, the reactivity:' },
        options: [{ mn: 'Буурна', en: 'Decreases' }, { mn: 'Нэмэгдэнэ', en: 'Increases' }, { mn: 'Өөрчлөгдөхгүй', en: 'Stays the same' }, { mn: 'Ээлжлэн өөрчлөгдөнө', en: 'Fluctuates' }],
        answer: 1,
        explanation: { mn: 'Гаднах электрон хялбар алдагдана.', en: 'The outer electrons are lost more easily.' }
      },
      {
        question: { mn: 'II бүлгийн карбонатын дулааны тогтвортой байдал доош бүлэгт яах вэ?', en: 'The thermal stability of Group 2 carbonates down the group:' },
        options: [{ mn: 'Буурна', en: 'Decreases' }, { mn: 'Нэмэгдэнэ', en: 'Increases' }, { mn: 'Өөрчлөгдөхгүй', en: 'Stays the same' }, { mn: 'Тэг болно', en: 'Becomes zero' }],
        answer: 1,
        explanation: { mn: 'Катион томорч, карбонатын ионыг бага туйлшруулдаг.', en: 'The larger cation polarises the carbonate less, so it is more stable.' }
      },
      {
        question: { mn: 'II бүлгийн металлын ион ямар цэнэгтэй вэ?', en: 'The ions of Group 2 metals have a charge of:' },
        options: [{ mn: '+1', en: '+1' }, { mn: '+2', en: '+2' }, { mn: '−2', en: '−2' }, { mn: '0', en: '0' }],
        answer: 1,
        explanation: { mn: 'Гаднах 2 электроныг алдаж 2+ ион үүснэ.', en: 'They lose their two outer electrons to form 2+ ions.' }
      }
    ]
  },
  'al-ch-11': {
    question: { mn: 'VII бүлгийн галогенүүдийн идэвх доош бүлэгт яаж өөрчлөгдөх вэ, яагаад вэ?', en: 'How does the reactivity of the halogens change down Group 17, and why?' },
    independent: { mn: 'Галоген (Cl₂, Br₂, I₂)', en: 'Halogen (Cl₂, Br₂, I₂)' },
    dependent: { mn: 'Галидыг түлхэж гаргах (тийм/үгүй)', en: 'Whether a halide is displaced (yes/no)' },
    controlled: { mn: 'Ижил концентраци, температур, галидын уусмалын эзлэхүүн', en: 'Same concentration, temperature and volume of the halide solution' },
    limitation: {
      mn: 'Түлхэх урвал харьцангуй идэвхийг харуулна; фтор хичээлийн туршилтад хэт эрчимтэй.',
      en: 'Displacement shows relative reactivity; fluorine reacts too violently for school practical work.'
    },
    keyPoints: [
      { mn: 'Доош бүлэгт галогенүүдийн идэвх буурна; буцлах цэг нэмэгдэнэ.', en: 'Down the group the reactivity falls and the boiling point rises.' },
      { mn: 'Идэвх ихтэй галоген идэвх багатай галидыг түлхэж гаргана.', en: 'A more reactive halogen displaces a less reactive halide.' },
      { mn: 'Галогенүүд хоёр атомт молекул (Cl₂, Br₂, I₂).', en: 'The halogens are diatomic molecules (Cl₂, Br₂, I₂).' }
    ],
    glossary: [
      { term: { mn: 'Галоген', en: 'Halogen' }, def: { mn: 'VII бүлгийн элемент; гаднах бүрхүүлд 7 электронтой.', en: 'A Group 17 element with seven electrons in its outer shell.' } },
      { term: { mn: 'Түлхэх урвал', en: 'Displacement reaction' }, def: { mn: 'Идэвх ихтэй элемент идэвх багатай элементийг нэгдлээс гаргах урвал.', en: 'A more reactive element takes the place of a less reactive element in a compound.' } },
      { term: { mn: 'Хоёр атомт', en: 'Diatomic' }, def: { mn: 'Молекул нь хоёр атомтай.', en: 'Molecules containing two atoms.' } }
    ],
    structured: {
      prompt: { mn: 'Хлор калийн бромидын уусмалаас бромыг яагаад түлхэж гаргах бол, харин бром хлоридийг түлхэж чадахгүй вэ?', en: 'Explain why chlorine displaces bromine from potassium bromide solution, but bromine does not displace chlorine.' },
      marks: [
        { mn: 'Cl₂ илүү идэвхтэй (электрон илүү хялбар авна) (1)', en: 'Cl₂ is more reactive (it gains electrons more readily) (1)' },
        { mn: 'Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂ (1)', en: 'Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂ (1)' },
        { mn: 'Br₂ идэвх бага тул Cl⁻-ийг түлхэж чадахгүй (1)', en: 'Br₂ is less reactive, so it cannot displace Cl⁻ (1)' }
      ],
      total: 3
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Өрөөний температурт аль галоген шингэн байдаг вэ?', en: 'Which halogen is a liquid at room temperature?' },
        options: [{ mn: 'Хлор', en: 'Chlorine' }, { mn: 'Бром', en: 'Bromine' }, { mn: 'Иод', en: 'Iodine' }, { mn: 'Фтор', en: 'Fluorine' }],
        answer: 1,
        explanation: { mn: 'Бром өрөөний температурт шингэн.', en: 'Bromine is a liquid at room temperature.' }
      },
      {
        level: 'hard',
        prompt: { mn: 'Хлор иодидын ионтой урвалын ионы тэгшитгэлийг бич.', en: 'Write the ionic equation for the reaction of chlorine with iodide ions.' },
        model: { mn: 'Cl₂ + 2I⁻ → 2Cl⁻ + I₂', en: 'Cl₂ + 2I⁻ → 2Cl⁻ + I₂' },
        explanation: { mn: 'Хлор электрон авч, иодид электрон алдана.', en: 'Chlorine gains electrons and iodide loses them.' }
      }
    ],
    exit: [
      {
        question: { mn: 'Cl₂, Br₂, I₂-оос аль нь хамгийн идэвхтэй вэ?', en: 'Which is the most reactive of Cl₂, Br₂ and I₂?' },
        options: [{ mn: 'I₂', en: 'I₂' }, { mn: 'Br₂', en: 'Br₂' }, { mn: 'Cl₂', en: 'Cl₂' }, { mn: 'Бүгд адил', en: 'All equal' }],
        answer: 2,
        explanation: { mn: 'Доош бүлэгт идэвх буурдаг тул Cl₂ хамгийн идэвхтэй.', en: 'Reactivity falls down the group, so Cl₂ is the most reactive.' }
      },
      {
        question: { mn: 'Хлорын ус калийн иодидод нэмэхэд юу үүсэх вэ?', en: 'Chlorine water is added to potassium iodide. What forms?' },
        options: [{ mn: 'I₂ ба KCl', en: 'I₂ and KCl' }, { mn: 'Урвал явагдахгүй', en: 'No reaction' }, { mn: 'K ба Cl₂', en: 'K and Cl₂' }, { mn: 'KI₂', en: 'KI₂' }],
        answer: 0,
        explanation: { mn: 'Cl₂ + 2KI → 2KCl + I₂.', en: 'Cl₂ + 2KI → 2KCl + I₂.' }
      },
      {
        question: { mn: 'Галогенүүдийн буцлах цэг доош бүлэгт яах вэ?', en: 'The boiling point of the halogens down the group:' },
        options: [{ mn: 'Буурна', en: 'Decreases' }, { mn: 'Нэмэгдэнэ', en: 'Increases' }, { mn: 'Өөрчлөгдөхгүй', en: 'Stays the same' }, { mn: 'Тодорхойгүй', en: 'Is unpredictable' }],
        answer: 1,
        explanation: { mn: 'Том молекул илүү их Ван-дер-Ваальсын хүчтэй.', en: 'Larger molecules have stronger van der Waals forces.' }
      }
    ]
  }
};
