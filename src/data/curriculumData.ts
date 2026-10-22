import { Chapter, LeitnerCard } from '../types/chemistry';
import { buildCurriculum } from './syllabusBuilders';
import { DECK_EXAMPLES } from './deckExamples';
import { TOPICS_A } from './syllabusTopicsA';
import { TOPICS_B } from './syllabusTopicsB';
import { TOPICS_C } from './syllabusTopicsC';
import { TOPICS_D } from './syllabusTopicsD';

// Original detailed topics (worked examples, questions, simulators)
const BASE_CHAPTERS: Chapter[] = [
  {
    id: 'ch-states-of-matter',
    number: 1,
    titleEn: 'States of Matter & Particle Theory',
    titleMn: 'Бодисын төлөв ба бөөмийн онол',
    descriptionEn: 'Kinetic particle model, changes of state, heating/cooling curves, and diffusion rates.',
    descriptionMn: 'Бөөмийн кинетик загвар, төлөвийн шилжилт, халаалт/хөрөлтийн муруй, диффузийн хурд.',
    iconName: 'Atom',
    color: 'emerald',
    topics: [
      {
        id: 'top-1-1',
        chapterId: 'ch-states-of-matter',
        syllabusRef: '0620/1.1',
        number: '1.1',
        titleEn: 'Kinetic Particle Theory & Changes of State',
        titleMn: 'Бөөмийн кинетик онол ба төлөвийн шилжилт',
        summaryEn: 'Arrangement, separation, and motion of particles in solids, liquids, and gases; energy changes during melting, boiling, evaporating, condensing, freezing, and subliming.',
        summaryMn: 'Хатуу, шингэн, хийн төлөв дэх бөөмсийн байрлал, хоорондын зай, хөдөлгөөн; хайлах, буцлах, уурших, конденсацлах, хөлдөх ба сублимацын үеийн энергийн өөрчлөлт.',
        learningObjectives: [
          {
            id: 'lo-1-1-1',
            code: '1.1.1',
            en: 'State the distinguishing properties of solids, liquids and gases.',
            mn: 'Хатуу, шингэн, хий төлөвийн үндсэн ялгагдах шинжүүдийг нэрлэх.',
            ao: 'AO1'
          },
          {
            id: 'lo-1-1-2',
            code: '1.1.2',
            en: 'Describe changes of state in terms of kinetic particle theory and understand why temperature remains constant during phase transitions.',
            mn: 'Бөөмийн кинетик онолын үүднээс төлөвийн шилжилтийг тайлбарлах, фазын шилжилтийн үед температур яагаад тогтмол байдгийг ойлгох.',
            ao: 'AO2'
          },
          {
            id: 'lo-1-1-3',
            code: '1.1.3',
            en: 'Explain diffusion in terms of the random movement of particles and the effect of relative molecular mass ($M_r$) on diffusion rate.',
            mn: 'Бөөмсийн эмх замбараагүй хөдөлгөөнөөр диффузийг тайлбарлах ба харьцангуй молекул масс ($M_r$) диффузийн хурдад хэрхэн нөлөөлдгийг тайлбарлах.',
            ao: 'AO2'
          }
        ],
        vocabulary: [
          {
            id: 'voc-1',
            termEn: 'Kinetic Particle Theory',
            termMn: 'Бөөмийн кинетик онол',
            phonetic: '/kɪˈnetɪk ˈpɑːtɪkl ˈθɪəri/',
            definitionEn: 'The model explaining that all matter is composed of tiny, constantly moving particles possessing kinetic energy.',
            definitionMn: 'Бүх бодис кинетик энерги бүхий тасралтгүй хөдөлдөг маш жижиг бөөмсөөс тогтдог болохыг тайлбарласан онолын загвар.',
            exampleEn: 'Particles in a gas move rapidly and randomly in straight lines until they collide.',
            exampleMn: 'Хийн бөөмс хоорондоо мөргөлдөх хүртлээ шулуун замаар маш хурдан, эмх замбараагүй хөдөлдөг.',
            memoryTipEn: 'Kinetic means motion. Higher temperature = higher kinetic energy = faster motion.',
            memoryTipMn: 'Кинетик гэдэг нь хөдөлгөөн. Температур өндөр = кинетик энерги их = хөдөлгөөн хурдан.',
            box: 1
          },
          {
            id: 'voc-2',
            termEn: 'Diffusion',
            termMn: 'Диффуз',
            phonetic: '/dɪˈfjuːʒn/',
            definitionEn: 'The net movement of particles from a region of higher concentration to a region of lower concentration down a concentration gradient as a result of their random movement.',
            definitionMn: 'Бөөмсийн эмх замбараагүй хөдөлгөөний үр дүнд өндөр концентрацитай хэсгээс бага концентрацитай хэсэг рүү чиглэсэн цэвэр шилжилт.',
            exampleEn: 'Ammonia ($M_r = 17$) diffuses faster than hydrogen chloride ($M_r = 36.5$).',
            exampleMn: 'Аммиак ($M_r = 17$) нь хлорт устөрөгчөөс ($M_r = 36.5$) илүү хурдан диффузлэн тархдаг.',
            memoryTipEn: 'Lighter gas ($lower M_r$) travels faster; denser gas travels slower.',
            memoryTipMn: 'Хөнгөн хий ($M_r$ бага) илүү хурдан тархана, хүнд хий удаан тархана.',
            box: 2
          },
          {
            id: 'voc-3',
            termEn: 'Sublimation',
            termMn: 'Сублимац (Хуурай ууршилт)',
            phonetic: '/ˌsʌblɪˈmeɪʃn/',
            definitionEn: 'The direct transition of a substance from the solid phase to the gas phase without passing through the intermediate liquid state.',
            definitionMn: 'Бодис завсрын шингэн төлөвийг алгасан хатуу төлөвөөс шууд хийн төлөвт шилжих үзэгдэл.',
            exampleEn: 'Dry ice (solid $CO_2$) and solid iodine undergo sublimation upon gentle heating.',
            exampleMn: 'Хуурай мөс (хатуу $CO_2$) болон хатуу иод зөөлөн халаахад шууд сублимацлан хий болдог.',
            box: 3
          }
        ],
        sections: [
          {
            id: 'sec-1-1',
            titleEn: '1. Particle Arrangement in 3 States',
            titleMn: '1. Бодисын 3 төлөв дэх бөөмийн байрлал',
            contentEn: 'In solids, particles are tightly packed in a regular fixed lattice, vibrating only about fixed positions. In liquids, particles are closely packed but arranged irregularly and can roll over one another. In gases, particles are far apart, with negligible intermolecular forces, moving at high speeds in random directions.',
            contentMn: 'Хатуу бодист бөөмс тогтмол оронт торонд маш нягт байрлаж, зөвхөн байрандаа хэлбэлздэг. Шингэнд бөөмс ойрхон боловч эмх замбараагүй байрлаж, бие биенийхээ дээгүүр гулсан хөдөлдөг. Хийд бөөмс хоорондоо хол зайтай, харилцан үйлчлэлийн хүч маш сул, эмх замбараагүй чиглэлд их хурдтай хөдөлдөг.',
            keyRuleEn: 'Solid: fixed shape & volume; Liquid: fixed volume, takes container shape; Gas: fills entire container, easily compressed.',
            keyRuleMn: 'Хатуу: тодорхой хэлбэр ба эзлэхүүнтэй; Шингэн: тодорхой эзлэхүүнтэй, савны хэлбэрийг дагадаг; Хий: бүх эзлэхүүнийг дүүргэдэг, хялбар шахагддаг.'
          },
          {
            id: 'sec-1-2',
            titleEn: '2. Heating Curves & Latent Heat',
            titleMn: '2. Халаалтын муруй ба далд дулаан',
            contentEn: 'During melting and boiling, heat energy supplied is used to overcome attractive forces between particles rather than increasing their average kinetic energy. Therefore, the temperature graph displays flat horizontal plateaus at the melting point and boiling point.',
            contentMn: 'Хайлах болон буцлах үед өгсөн дулааны энерги нь бөөмсийн дундаж кинетик энергийг нэмэгдүүлэх биш, бөөмс хоорондын таталцлын хүчийг таслахад зарцуулагддаг. Иймээс хайлах цэг болон буцлах цэг дээр температурын график хэвтээ шугам (плато) үүсгэдэг.',
            keyRuleEn: 'Flat plateau on graph = phase transition taking place (temperature stays constant).',
            keyRuleMn: 'График дээрх хэвтээ шугам = фазын шилжилт явагдаж байна (температур тогтмол хадгалагдана).'
          }
        ],
        workedExample: {
          id: 'we-1',
          titleEn: 'Graham’s Law of Diffusion Experiment',
          titleMn: 'Грэхэмийн диффузийн туршилтын бодлого',
          questionEn: 'A glass tube has cotton wool soaked in concentrated aqueous ammonia placed at one end, and cotton wool soaked in concentrated hydrochloric acid placed at the other end. A white ring of ammonium chloride ($NH_4Cl$) forms inside the tube. Explain why the white ring does not form in the exact middle of the tube.',
          questionMn: 'Шилэн хоолойн нэг талд өтгөрүүлсэн аммиак шингээсэн хөвөн, нөгөө талд өтгөрүүлсэн давсны хүчил шингээсэн хөвөн байрлуулав. Хоолой дотор аммонийн хлоридын ($NH_4Cl$) цагаан цагираг тунадас үүснэ. Цагаан цагираг яагаад хоолойн яг голд үүсдэггүйг тайлбарлана уу.',
          stepsEn: [
            'Step 1: Calculate relative molecular mass ($M_r$) of ammonia ($NH_3$): 14 + (3 × 1) = 17.',
            'Step 2: Calculate relative molecular mass ($M_r$) of hydrogen chloride ($HCl$): 1 + 35.5 = 36.5.',
            'Step 3: Relate mass to diffusion speed: Ammonia has a lower relative molecular mass, so its molecules move faster and diffuse at a higher rate.',
            'Step 4: Conclusion: Ammonia travels further in the same time period; thus the white ring forms closer to the hydrochloric acid end.'
          ],
          stepsMn: [
            'Алхам 1: Аммиакын ($NH_3$) харьцангуй молекул массыг олно: 14 + (3 × 1) = 17.',
            'Алхам 2: Хлорт устөрөгчийн ($HCl$) харьцангуй молекул массыг олно: 1 + 35.5 = 36.5.',
            'Алхам 3: Масс ба диффузийн хурдыг холбоно: Аммиак нь молекул масс багатай тул бөөмс нь илүү хурдан хөдөлж, өндөр хурдаар диффузлэнэ.',
            'Алхам 4: Дүгнэлт: Ижил хугацаанд аммиак хол зайг туулдаг тул цагаан цагираг нь давсны хүчилтэй хөвөнтэй илүү ойр байрлалд үүснэ.'
          ],
          finalAnswerEn: 'Ammonia has lower $M_r$ (17 vs 36.5), so it diffuses faster and the white ring forms closer to the $HCl$ end.',
          finalAnswerMn: 'Аммиак нь $M_r$ багатай (17 ба 36.5) тул илүү хурдан диффузлэгдэж, цагаан цагираг $HCl$-ийн үзүүрт илүү ойр үүснэ.',
          examinerTipEn: 'Always quote the numerical $M_r$ values or state explicitly "lower relative molecular mass diffuses faster" for full marks.',
          examinerTipMn: 'Бүрэн оноо авахын тулд тоон $M_r$ утгыг дурдах эсвэл "харьцангуй молекул масс багатай нь илүү хурдан диффузлэнэ" гэж тодорхой бичнэ үү.',
          commonMistakeEn: 'Saying "ammonia is a smaller atom" instead of "molecules with lower $M_r$ move faster".',
          commonMistakeMn: '"Молекул масс багатай молекулууд хурдан хөдөлдөг" гэхийн оронд "аммиак жижиг атомтай" гэж буруу бичих.'
        },
        questions: [
          {
            id: 'q-1-p2',
            topicId: 'top-1-1',
            chapterId: 'ch-states-of-matter',
            syllabusRef: '0620/1.1',
            paper: 'Paper 2',
            totalMarks: 1,
            titleEn: 'Diffusion Rate Comparison',
            titleMn: 'Диффузийн хурдыг харьцуулах',
            questionTextEn: 'Which gas diffuses at the fastest rate under standard conditions of temperature and pressure?',
            questionTextMn: 'Стандарт нөхцөлд дараах хийнүүдээс аль нь хамгийн их хурдтай диффузлэх вэ?',
            type: 'mcq',
            options: [
              {
                id: 'A',
                textEn: 'Methane, CH₄ (Mᵣ = 16)',
                textMn: 'Метан, CH₄ (Mᵣ = 16)',
                rationaleEn: 'Correct. Methane has the smallest relative molecular mass (Mᵣ = 16) among all choices, thus its particles travel at highest average speed.',
                rationaleMn: 'Зөв. Метан нь өгөгдсөн сонголтуудаас хамгийн бага харьцангуй молекул масстай (Mᵣ = 16) тул хамгийн хурдан тархана.'
              },
              {
                id: 'B',
                textEn: 'Ammonia, NH₃ (Mᵣ = 17)',
                textMn: 'Аммиак, NH₃ (Mᵣ = 17)',
                rationaleEn: 'Incorrect. Mᵣ of 17 is slightly heavier than methane (16).',
                rationaleMn: 'Буруу. Mᵣ = 17 нь метанаас (16) үл ялиг хүнд.'
              },
              {
                id: 'C',
                textEn: 'Oxygen, O₂ (Mᵣ = 32)',
                textMn: 'Хүчилтөрөгч, O₂ (Mᵣ = 32)',
                rationaleEn: 'Incorrect. Oxygen is twice as heavy as methane and diffuses considerably slower.',
                rationaleMn: 'Буруу. Хүчилтөрөгч метанаас 2 дахин хүнд бөгөөд удаан тархана.'
              },
              {
                id: 'D',
                textEn: 'Carbon dioxide, CO₂ (Mᵣ = 44)',
                textMn: 'Нүүрсхүчлийн хий, CO₂ (Mᵣ = 44)',
                rationaleEn: 'Incorrect. CO₂ is the heaviest gas listed and will diffuse slowest.',
                rationaleMn: 'Буруу. CO₂ нь хамгийн хүнд хий тул хамгийн удаан диффузлэнэ.'
              }
            ],
            correctOption: 'A',
            misconceptionDiagnosisEn: 'Confusing diffusion rate with reactivity or boiling point rather than inverse dependence on molecular mass ($M_r$).',
            misconceptionDiagnosisMn: 'Диффузийн хурдыг молекул масстай урвуу хамааралтай гэж үзэхийн оронд урвалын идэвх эсвэл буцлах цэгтэй андуурсан.',
            remediationTopicId: 'top-1-1'
          },
          {
            id: 'q-1-p4',
            topicId: 'top-1-1',
            chapterId: 'ch-states-of-matter',
            syllabusRef: '0620/1.1',
            paper: 'Paper 4',
            totalMarks: 3,
            titleEn: 'Heating Curve Plateau Analysis',
            titleMn: 'Халаалтын муруйн плато задлан шинжлэл',
            questionTextEn: 'A pure sample of solid substance X is heated steadily at a uniform rate. Describe and explain what happens to the temperature and the particles between the melting point and boiling point, and during boiling.',
            questionTextMn: 'Хатуу төлөвтэй цэвэр X бодисыг жигд хурдаар тасралтгүй халаав. Хайлах цэгээс буцлах цэг хүртэл, мөн буцлах үед температур болон бөөмст юу тохиолдохыг тайлбарлана уу.',
            type: 'structured',
            markScheme: [
              {
                pointIndex: 1,
                criterionEn: 'Between melting and boiling points: temperature increases because particles gain kinetic energy and move/roll past each other faster [1].',
                criterionMn: 'Хайлах болон буцлах цэгийн хооронд: бөөмс кинетик энерги авч илүү хурдан хөдлөх тул температур өснө [1].',
                marks: 1
              },
              {
                pointIndex: 2,
                criterionEn: 'During boiling: temperature remains constant / horizontal plateau [1].',
                criterionMn: 'Буцлах үед: температур тогтмол хадгалагдана / хэвтээ плато үүснэ [1].',
                marks: 1
              },
              {
                pointIndex: 3,
                criterionEn: 'Explanation: energy is absorbed to break/overcome all remaining intermolecular attractive forces between liquid particles to form a gas [1].',
                criterionMn: 'Шалтгаан: дулааны энерги нь шингэний бөөмс хоорондын үлдсэн таталцлын хүчийг бүрэн тасалж хий үүсгэхэд зарцуулагдана [1].',
                marks: 1,
                examinerNoteEn: 'Do NOT accept "breaking bonds within the molecule" for simple molecular substances—it must be intermolecular forces.',
                examinerNoteMn: 'Энгийн молекулт бодисын хувьд "молекул доторх холбоо тасрах" гэсэн хариулт оноо авахгүй, зөвхөн "молекул хоорондын хүч" байх ёстой.'
              }
            ],
            misconceptionDiagnosisEn: 'Saying covalent bonds break during boiling rather than intermolecular forces between molecules.',
            misconceptionDiagnosisMn: 'Буцлах үед молекул хоорондын хүч тасардаг гэхийн оронд молекул доторх ковалент холбоо тасардаг гэж андуурсан.',
            remediationTopicId: 'top-1-1'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-atoms-bonding',
    number: 2,
    titleEn: 'Atoms, Elements & Chemical Bonding',
    titleMn: 'Атом, элемент ба химийн холбоо',
    descriptionEn: 'Atomic structure, isotopes, ionic lattices, covalent molecules, giant structures (diamond, graphite, silica), and metallic bonding.',
    descriptionMn: 'Атомын бүтэц, изотоп, ионы оронт тор, ковалент молекул, аварга бүтэц (алмааз, бал чулуу, цахиурын давхар исэл), металлын холбоо.',
    iconName: 'Shapes',
    color: 'indigo',
    topics: [
      {
        id: 'top-2-1',
        chapterId: 'ch-atoms-bonding',
        syllabusRef: '0620/2.3',
        number: '2.1',
        titleEn: 'Ionic vs Covalent vs Giant Covalent Structures',
        titleMn: 'Ионы, ковалентын ба аварга ковалент бүтэц',
        summaryEn: 'How transfer and sharing of valence electrons determine physical properties: melting points, electrical conductivity, volatility, and hardness.',
        summaryMn: 'Валентын электроны шилжилт болон дундын хос үүсэлт нь хайлах цэг, цахилгаан дамжуулалт, дэгдэмхий чанар, хатуулаг зэрэг физик шинжийг хэрхэн тодорхойлдог вэ.',
        learningObjectives: [
          {
            id: 'lo-2-1-1',
            code: '2.3.1',
            en: 'Describe the formation of ionic bonds between metals and non-metals by electron transfer.',
            mn: 'Металл ба металл бишийн хооронд электрон шилжилтээр ионы холбоо үүсэхийг дүрслэх.',
            ao: 'AO1'
          },
          {
            id: 'lo-2-1-2',
            code: '2.3.2',
            en: 'Explain why ionic compounds conduct electricity when molten or aqueous, but not when solid.',
            mn: 'Ионы нэгдлүүд яагаад шингэрүүлсэн уусмал эсвэл хайлмал төлөвтөө цахилгаан дамжуулдаг, харин хатуу төлөвтөө дамжуулдаггүйг тайлбарлах.',
            ao: 'AO2'
          },
          {
            id: 'lo-2-1-3',
            code: '2.4.1',
            en: 'Explain the high melting point and electrical conductivity of graphite compared to diamond.',
            mn: 'Бал чулууны (графайт) цахилгаан дамжуулалт болон хайлах өндөр цэгийг алмаазтай харьцуулан тайлбарлах.',
            ao: 'AO2'
          }
        ],
        vocabulary: [
          {
            id: 'voc-4',
            termEn: 'Giant Ionic Lattice',
            termMn: 'Аварга ионы оронт тор',
            phonetic: '/ˈdʒaɪənt aɪˈɒnɪk ˈlætɪs/',
            definitionEn: 'A regular three-dimensional arrangement of alternating positive and negative ions held by strong electrostatic attractions.',
            definitionMn: 'Эсрэг цэнэгтэй эерэг ба сөрөг ионууд цахилгаан таталцлын хүчээр бат бөх холбогдсон 3 хэмжээст тогтмол бүтэц.',
            exampleEn: 'Sodium chloride ($NaCl$) forms a giant cubic ionic lattice with high melting point ($801^\\circ C$).',
            exampleMn: 'Натрийн хлорид ($NaCl$) нь хайлах өндөр цэгтэй ($801^\\circ C$) куб хэлбэрийн аварга ионы оронт тор үүсгэдэг.',
            box: 2
          },
          {
            id: 'voc-5',
            termEn: 'Delocalised Electrons',
            termMn: 'Делокалчлагдсан (чөлөөт) электронууд',
            phonetic: '/diːˈləʊkəlaɪzd ɪˈlektrɒnz/',
            definitionEn: 'Electrons that are not associated with a single atom or covalent bond, free to move throughout the entire structure.',
            definitionMn: 'Нэг атом эсвэл холбоонд харьяалагдахгүй, бүтцийн дагуу чөлөөтэй хөдлөх боломжтой электронууд.',
            exampleEn: 'Graphite conducts electricity because each carbon atom has one delocalised electron between its layers.',
            exampleMn: 'Бал чулууны нүүрстөрөгчийн атом бүр үе хоорондоо нэг делокалчлагдсан электронтой тул цахилгаан дамжуулдаг.',
            box: 3
          }
        ],
        sections: [
          {
            id: 'sec-2-1',
            titleEn: '1. Giant Ionic Structures ($NaCl$)',
            titleMn: '1. Аварга ионы бүтэц ($NaCl$)',
            contentEn: 'Ionic bonds form between metals (lose electrons to become cations) and non-metals (gain electrons to become anions). Strong electrostatic attractions between oppositely charged ions require vast thermal energy to break, giving them high melting points. In solid state, ions are locked in fixed positions and cannot move; when molten or dissolved in water, ions become mobile and carry electrical charge.',
            contentMn: 'Ионы холбоо нь металл (электрон алдаж катион болно) ба металл бишийн (электрон авч анион болно) хооронд үүсдэг. Эсрэг цэнэгтэй ионуудын хоорондох хүчтэй цахилгаан таталцлыг эвдэхэд их энерги шаардагдах тул хайлах цэг өндөр байдаг. Хатуу төлөвт ионууд бэхлэгдсэн байрлалтай тул цахилгаан дамжуулахгүй; хайлмал эсвэл усанд ууссан үед ионууд чөлөөтэй хөдөлж цахилгаан цэнэг зөөнө.',
            keyRuleEn: 'Solid ionic = No conductivity (ions cannot move). Molten/aqueous = Conducts (free-moving ions).',
            keyRuleMn: 'Хатуу ионы = Цахилгаан дамжуулахгүй (ионууд хөдөлгөөнгүй). Хайлмал/уусмал = Цахилгаан дамжуулна (чөлөөт ионуудтай).'
          },
          {
            id: 'sec-2-2',
            titleEn: '2. Allotropes of Carbon: Diamond vs Graphite',
            titleMn: '2. Нүүрстөрөгчийн аллотропи: Алмааз ба Бал чулуу',
            contentEn: 'Diamond: Each carbon is covalently bonded to 4 other carbons tetrahedrally. Extremely hard, zero electrical conductivity (all valence electrons localized in bonds). Graphite: Each carbon is bonded to 3 other carbons in hexagonal planar layers. Weak forces between layers allow them to slide (used as lubricant). Each carbon has one delocalised electron that moves between layers, allowing it to conduct electricity.',
            contentMn: 'Алмааз: Нүүрстөрөгчийн атом бүр 4 нүүрстөрөгчтэй тетраэдр хэлбэрээр бат бөх ковалент холбогддог. Маш хатуу, цахилгаан дамжуулахгүй (бүх валентын электрон холбоонд оролцсон). Бал чулуу: Нүүрстөрөгчийн атом бүр 3 нүүрстөрөгчтэй зургаан өнцөгт үе үүсгэн холбогдоно. Үе хоорондын хүч сул тул гулсдаг (тосолгоонд хэрэглэнэ). Атом бүрт нэг делокалчлагдсан электрон үлдэж үеийн дагуу хөдлөх тул цахилгаан дамжуулдаг.',
            keyRuleEn: 'Diamond: 4 bonds/carbon, insulator. Graphite: 3 bonds/carbon, 1 delocalised electron/carbon, conductor.',
            keyRuleMn: 'Алмааз: 4 холбоо/атом, тусгаарлагч. Бал чулуу: 3 холбоо/атом, 1 делокалчлагдсан электрон/атом, дамжуулагч.'
          }
        ],
        workedExample: {
          id: 'we-2',
          titleEn: 'Explaining Electrical Conductivity in Exam Answers',
          titleMn: 'Шалгалтын асуултад цахилгаан дамжуулалтыг зөв тайлбарлах',
          questionEn: 'State and explain the difference in electrical conductivity between solid magnesium chloride and molten magnesium chloride.',
          questionMn: 'Хатуу магнийн хлорид ба хайлмал магнийн хлоридын цахилгаан дамжуулах чанарын ялгааг нэрлэж, учир шалтгааныг тайлбарлана уу.',
          stepsEn: [
            'Step 1: State the conductivity difference: Solid $MgCl_2$ does not conduct electricity, whereas molten $MgCl_2$ conducts electricity.',
            'Step 2: Explain solid state: In solid $MgCl_2$, ions ($Mg^{2+}$ and $Cl^-$) are held in fixed positions within the giant lattice and cannot move.',
            'Step 3: Explain molten state: In molten state, the electrostatic bonds have broken and ions are free to move and carry the electric charge.',
            'Step 4: Cambridge check: Ensure you explicitly use the word "IONS", never "electrons".'
          ],
          stepsMn: [
            'Алхам 1: Ялгааг тодорхой дурдах: Хатуу $MgCl_2$ цахилгаан дамжуулахгүй, хайлмал $MgCl_2$ цахилгаан дамжуулна.',
            'Алхам 2: Хатуу төлөвийг тайлбарлах: Хатуу $MgCl_2$-д ионууд ($Mg^{2+}$ ба $Cl^-$) оронт торондоо бэхлэгдсэн, хөдлөх боломжгүй.',
            'Алхам 3: Хайлмал төлөвийг тайлбарлах: Хайлмал төлөвт оронт тор эвдэрч, ионууд чөлөөтэй хөдөлж цахилгаан цэнэг зөөнө.',
            'Алхам 4: Анхаарах зүйл: Ионы нэгдлийн хувьд заавал "ИОНУУД" гэсэн үг хэрэглэх бөгөөд хэзээ ч "электронууд" гэж бичиж болохгүй.'
          ],
          finalAnswerEn: 'Solid $MgCl_2$ does not conduct because ions are fixed in lattice; molten conducts because ions ($Mg^{2+}, Cl^-$) are free to move.',
          finalAnswerMn: 'Хатуу $MgCl_2$ нь ионууд оронт торонд бэхлэгдсэн тул дамжуулахгүй; хайлмал нь ионууд ($Mg^{2+}, Cl^-$) чөлөөтэй хөдөлдөг тул дамжуулна.',
          examinerTipEn: 'Examiners award zero marks if you state that "electrons are moving" in an ionic compound. Only metals and graphite have free electrons; molten/aqueous salts have mobile ions.',
          examinerTipMn: 'Ионы нэгдэлд "электрон хөдөлдөг" гэж бичвэл 0 оноо авна! Зөвхөн металл ба бал чулуунд чөлөөт электрон байдаг бол хайлмал/уусмал давсанд хөдөлгөөнт ИОНУУД цэнэг зөөдөг.',
          commonMistakeEn: 'Writing "electrons carry charge in molten $NaCl$" instead of "mobile ions".',
          commonMistakeMn: '"Хөдөлгөөнт ионууд" гэхийн оронд "хайлмал $NaCl$-д электронууд цэнэг зөөнө" гэж бичих.'
        },
        recommendedSimulator: 'periodic-table',
        questions: [
          {
            id: 'q-2-p2',
            topicId: 'top-2-1',
            chapterId: 'ch-atoms-bonding',
            syllabusRef: '0620/2.3',
            paper: 'Paper 2',
            totalMarks: 1,
            titleEn: 'Conductivity in Substances',
            titleMn: 'Бодисын цахилгаан дамжуулалт',
            questionTextEn: 'Which substance conducts electricity both in the solid state and when molten?',
            questionTextMn: 'Хатуу болон хайлмал төлөвийн аль алинд нь цахилгаан дамжуулдаг бодис аль нь вэ?',
            type: 'mcq',
            options: [
              {
                id: 'A',
                textEn: 'Copper metal',
                textMn: 'Зэс металл',
                rationaleEn: 'Correct. Metals have delocalised sea of electrons that are free to move in both solid and liquid states.',
                rationaleMn: 'Зөв. Металлууд хатуу болон шингэн төлөвтөө чөлөөтэй хөдөлдөг делокалчлагдсан электронуудын далайтай байдаг.'
              },
              {
                id: 'B',
                textEn: 'Sodium chloride',
                textMn: 'Натрийн хлорид',
                rationaleEn: 'Incorrect. $NaCl$ does NOT conduct electricity when solid because ions are fixed.',
                rationaleMn: 'Буруу. $NaCl$ нь хатуу төлөвтөө ионууд бэхлэгдсэн тул цахилгаан дамжуулдаггүй.'
              },
              {
                id: 'C',
                textEn: 'Diamond',
                textMn: 'Алмааз',
                rationaleEn: 'Incorrect. Diamond has no mobile electrons or ions and never conducts.',
                rationaleMn: 'Буруу. Алмаазад хөдөлгөөнт электрон эсвэл ион байхгүй тул хэзээ ч дамжуулахгүй.'
              },
              {
                id: 'D',
                textEn: 'Sulfur',
                textMn: 'Хүхэр',
                rationaleEn: 'Incorrect. Simple molecular non-metal, does not conduct in any state.',
                rationaleMn: 'Буруу. Энгийн молекулт металл биш бөгөөд ямар ч төлөвт цахилгаан дамжуулахгүй.'
              }
            ],
            correctOption: 'A',
            misconceptionDiagnosisEn: 'Assuming ionic compounds conduct in the solid state.',
            misconceptionDiagnosisMn: 'Ионы нэгдлийг хатуу төлөвтөө цахилгаан дамжуулдаг гэж буруу таамагласан.',
            remediationTopicId: 'top-2-1'
          },
          {
            id: 'q-2-p4',
            topicId: 'top-2-1',
            chapterId: 'ch-atoms-bonding',
            syllabusRef: '0620/2.4',
            paper: 'Paper 4',
            totalMarks: 4,
            titleEn: 'Structure and Properties of Silicon(IV) Oxide',
            titleMn: 'Цахиурын (IV) ислийн бүтэц ба шинж чанар',
            questionTextEn: 'Silicon(IV) oxide, $SiO_2$, has a macromolecular (giant covalent) structure similar to diamond. Deduce two physical properties of $SiO_2$ and explain them in terms of its structure and bonding.',
            questionTextMn: 'Цахиурын (IV) исэл, $SiO_2$ нь алмаазтай төстэй аварга ковалент бүтэцтэй. Түүний бүтэц болон холбоонд үндэслэн $SiO_2$-ийн 2 физик шинжийг гаргаж, тайлбарлана уу.',
            type: 'structured',
            markScheme: [
              {
                pointIndex: 1,
                criterionEn: 'Property 1: Very high melting / boiling point [1].',
                criterionMn: 'Шинж 1: Хайлах / буцлах цэг маш өндөр [1].',
                marks: 1
              },
              {
                pointIndex: 2,
                criterionEn: 'Explanation 1: Many strong covalent bonds in the giant 3D lattice require very large amounts of thermal energy to break [1].',
                criterionMn: 'Тайлбар 1: 3 хэмжээст аварга торон дахь маш олон тооны бат бөх ковалент холбоог таслахад асар их дулааны энерги шаардагдана [1].',
                marks: 1
              },
              {
                pointIndex: 3,
                criterionEn: 'Property 2: Does not conduct electricity / electrical insulator [1].',
                criterionMn: 'Шинж 2: Цахилгаан дамжуулахгүй / тусгаарлагч [1].',
                marks: 1
              },
              {
                pointIndex: 4,
                criterionEn: 'Explanation 2: No mobile ions or delocalised electrons to carry electric charge [1].',
                criterionMn: 'Тайлбар 2: Цахилгаан цэнэг зөөх хөдөлгөөнт ион эсвэл делокалчлагдсан чөлөөт электрон байхгүй [1].',
                marks: 1
              }
            ],
            misconceptionDiagnosisEn: 'Assuming $SiO_2$ is simple molecular like $CO_2$ with weak intermolecular forces.',
            misconceptionDiagnosisMn: '$SiO_2$-ийг $CO_2$ шиг молекул хоорондын хүч султай энгийн молекулт бодис гэж андуурсан.',
            remediationTopicId: 'top-2-1'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-stoichiometry',
    number: 3,
    titleEn: 'Stoichiometry & The Mole Concept',
    titleMn: 'Стехиометр ба молийн тухай ойлголт',
    descriptionEn: 'Formulas, balanced equations, molar mass $M_r$, reacting masses, molar gas volume ($24\\text{ dm}^3$), solutions concentration ($c = n/V$), and percentage yield.',
    descriptionMn: 'Томьёо, тэгшитгэл тэнцүүлэлт, молийн масс $M_r$, урвалд орох масс, хийн молийн эзлэхүүн ($24\\text{ дм}^3$), уусмалын концентраци ($c = n/V$), ба гарцын хувь.',
    iconName: 'Calculator',
    color: 'amber',
    topics: [
      {
        id: 'top-3-1',
        chapterId: 'ch-stoichiometry',
        syllabusRef: '0620/3.2',
        number: '3.1',
        titleEn: 'Moles, Reacting Masses & Gas Volumes',
        titleMn: 'Моль, урвалд орох масс ба хийн эзлэхүүн',
        summaryEn: 'Mastering the fundamental mole relationships: $n = \\frac{m}{M_r}$, $V = n \\times 24\\text{ dm}^3$ at r.t.p., and $n = c \\times V$.',
        summaryMn: 'Молийн үндсэн томьёонуудыг эзэмших: $n = \\frac{m}{M_r}$, $V = n \\times 24\\text{ дм}^3$ (өрөөний температур ба даралтад), ба $n = c \\times V$.',
        learningObjectives: [
          {
            id: 'lo-3-1-1',
            code: '3.2.1',
            en: 'Define the mole as $6.02 \\times 10^{23}$ particles (Avogadro constant).',
            mn: 'Молийг $6.02 \\times 10^{23}$ бөөмсийн тоо (Авогадрогийн тогтмол) гэж тодорхойлох.',
            ao: 'AO1'
          },
          {
            id: 'lo-3-1-2',
            code: '3.2.2',
            en: 'Calculate reacting masses from balanced chemical equations.',
            mn: 'Тэнцүүлсэн химийн урвалын тэгшитгэлээс урвалд орох бодисын массыг тооцоолох.',
            ao: 'AO2'
          },
          {
            id: 'lo-3-1-3',
            code: '3.2.3',
            en: 'Calculate gas volumes using the molar gas volume of $24\\text{ dm}^3$ at room temperature and pressure (r.t.p.).',
            mn: 'Өрөөний температур ба даралтад (r.t.p.) хийн молийн эзлэхүүн болох $24\\text{ дм}^3$-ийг ашиглан хийн эзлэхүүнийг тооцоолох.',
            ao: 'AO2'
          }
        ],
        vocabulary: [
          {
            id: 'voc-6',
            termEn: 'The Mole',
            termMn: 'Моль',
            phonetic: '/məʊl/',
            definitionEn: 'The SI unit for amount of substance; one mole contains exactly $6.022 \\times 10^{23}$ elementary entities.',
            definitionMn: 'Бодисын тоо хэмжээг илэрхийлэх СИ системийн үндсэн нэгж; нэг моль нь яг $6.022 \\times 10^{23}$ ширхэг эгэл бөөмийг агуулна.',
            exampleEn: 'One mole of Carbon-12 atoms weighs exactly 12.0 grams.',
            exampleMn: 'Нүүрстөрөгч-12-ийн нэг моль атом яг 12.0 грамм жинтэй байна.',
            box: 1
          },
          {
            id: 'voc-7',
            termEn: 'Molar Gas Volume',
            termMn: 'Хийн молийн эзлэхүүн',
            phonetic: '/ˈməʊlə ɡæs ˈvɒljuːm/',
            definitionEn: 'The volume occupied by one mole of any gas at room temperature and pressure (r.t.p.), equal to $24\\text{ dm}^3$ ($24,000\\text{ cm}^3$).',
            definitionMn: 'Өрөөний температур ба даралтад дурын хийн нэг молийн эзлэх эзлэхүүн бөгөөд $24\\text{ дм}^3$ ($24,000\\text{ см}^3$)-тэй тэнцүү.',
            exampleEn: '$0.5\\text{ mol}$ of $CO_2$ gas occupies $0.5 \\times 24 = 12\\text{ dm}^3$ at r.t.p.',
            exampleMn: '$0.5\\text{ моль}$ $CO_2$ хий нь r.t.p нөхцөлд $0.5 \\times 24 = 12\\text{ дм}^3$ эзлэхүүн эзэлнэ.',
            box: 2
          }
        ],
        sections: [
          {
            id: 'sec-3-1',
            titleEn: '1. The Golden Mole Equations',
            titleMn: '1. Молийн алтан 3 тэгшитгэл',
            contentEn: 'Equation 1 (Mass): $\\text{Moles } (n) = \\frac{\\text{Mass in grams } (m)}{\\text{Molar mass } (M_r)}$\nEquation 2 (Gas Volume): $\\text{Moles } (n) = \\frac{\\text{Volume in dm}^3 (V)}{24\\text{ dm}^3}$\nEquation 3 (Solution): $\\text{Moles } (n) = \\text{Concentration } (c) \\times \\text{Volume in dm}^3 (V)$ where $1\\text{ dm}^3 = 1000\\text{ cm}^3$.',
            contentMn: 'Тэгшитгэл 1 (Масс): $\\text{Моль } (n) = \\frac{\\text{Масс (грамм)} (m)}{\\text{Молийн масс } (M_r)}$\nТэгшитгэл 2 (Хийн эзлэхүүн): $\\text{Моль } (n) = \\frac{\\text{Эзлэхүүн (дм}^3) (V)}{24\\text{ дм}^3}$\nТэгшитгэл 3 (Уусмал): $\\text{Моль } (n) = \\text{Концентраци } (c) \\times \\text{Эзлэхүүн (дм}^3) (V)$ ($1\\text{ дм}^3 = 1000\\text{ см}^3$).',
            keyRuleEn: 'Always convert $\\text{cm}^3$ to $\\text{dm}^3$ by dividing by 1000 before multiplying by concentration.',
            keyRuleMn: 'Уусмалын тооцоонд $\\text{см}^3$-ийг концентрациар үржүүлэхийн өмнө 1000-д хувааж $\\text{дм}^3$ болгож шилжүүлнэ.'
          }
        ],
        workedExample: {
          id: 'we-3',
          titleEn: 'Calculating Mass and Gas Volume from an Equation',
          titleMn: 'Урвалын тэгшитгэлээс масс ба хийн эзлэхүүнийг тооцоолох',
          questionEn: 'Calcium carbonate decomposes on heating according to the equation:\n$CaCO_3(s) \\rightarrow CaO(s) + CO_2(g)$\nCalculate the volume of carbon dioxide gas measured at r.t.p. produced when $25.0\\text{ g}$ of $CaCO_3$ is completely decomposed. ($A_r: Ca=40, C=12, O=16$)',
          questionMn: 'Кальцийн карбонат халаахад дараах тэгшитгэлээр задардаг:\n$CaCO_3(s) \\rightarrow CaO(s) + CO_2(g)$\n$25.0\\text{ г}$ $CaCO_3$ бүрэн задрахад үүсэх нүүрсхүчлийн хийн ($CO_2$) эзлэхүүнийг r.t.p нөхцөлд тооцоолно уу. ($A_r: Ca=40, C=12, O=16$)',
          stepsEn: [
            'Step 1: Calculate $M_r$ of $CaCO_3$: $40 + 12 + (3 \\times 16) = 100\\text{ g/mol}$.',
            'Step 2: Find moles of $CaCO_3$: $n = \\frac{m}{M_r} = \\frac{25.0}{100} = 0.25\\text{ mol}$.',
            'Step 3: Check mole ratio from balanced equation: $1\\text{ mol } CaCO_3 : 1\\text{ mol } CO_2$. Therefore, moles of $CO_2 = 0.25\\text{ mol}$.',
            'Step 4: Calculate gas volume: $V = n \\times 24\\text{ dm}^3 = 0.25 \\times 24 = 6.0\\text{ dm}^3$ (or $6000\\text{ cm}^3$).'
          ],
          stepsMn: [
            'Алхам 1: $CaCO_3$-ийн $M_r$-ийг олно: $40 + 12 + (3 \\times 16) = 100\\text{ г/моль}$.',
            'Алхам 2: $CaCO_3$-ийн молийг олно: $n = \\frac{m}{M_r} = \\frac{25.0}{100} = 0.25\\text{ моль}$.',
            'Алхам 3: Урвалын харьцааг шалгана: $1\\text{ моль } CaCO_3 : 1\\text{ моль } CO_2$. Иймд $CO_2$-ийн моль = $0.25\\text{ моль}$.',
            'Алхам 4: Хийн эзлэхүүнийг тооцоолно: $V = n \\times 24\\text{ дм}^3 = 0.25 \\times 24 = 6.0\\text{ дм}^3$ (эсвэл $6000\\text{ см}^3$).'
          ],
          finalAnswerEn: '$6.0\\text{ dm}^3$ of $CO_2$ gas.',
          finalAnswerMn: '$6.0\\text{ дм}^3$ $CO_2$ хий үүснэ.',
          examinerTipEn: 'State your units clearly! If the question asks for $\\text{dm}^3$, do not leave your answer as $6000\\text{ cm}^3$ without specifying.',
          examinerTipMn: 'Нэгжийг заавал тодорхой бич! Хэрэв бодлого $\\text{дм}^3$-ээр нэхсэн бол зөв нэгжтэй нь бичнэ үү.',
          commonMistakeEn: 'Multiplying mass (25.0 g) directly by 24 without converting to moles first.',
          commonMistakeMn: 'Массыг (25.0 г) моль болгож хувиргалгүй шууд 24-өөр үржүүлж алдах.'
        },
        recommendedSimulator: 'stoichiometry',
        questions: [
          {
            id: 'q-3-p2',
            topicId: 'top-3-1',
            chapterId: 'ch-stoichiometry',
            syllabusRef: '0620/3.2',
            paper: 'Paper 2',
            totalMarks: 1,
            titleEn: 'Moles of Gas Volume',
            titleMn: 'Хийн эзлэхүүний моль',
            questionTextEn: 'What is the volume occupied by $8.8\\text{ g}$ of carbon dioxide, $CO_2$, at room temperature and pressure? ($M_r: CO_2 = 44$)',
            questionTextMn: 'Өрөөний температур ба даралтад $8.8\\text{ г}$ нүүрсхүчлийн хий ($CO_2$) ямар эзлэхүүн эзлэх вэ? ($M_r: CO_2 = 44$)',
            type: 'mcq',
            options: [
              {
                id: 'A',
                textEn: '$4.8\\text{ dm}^3$',
                textMn: '$4.8\\text{ дм}^3$',
                rationaleEn: 'Correct. Moles $n = 8.8 / 44 = 0.2\\text{ mol}$. Volume $V = 0.2 \\times 24 = 4.8\\text{ dm}^3$.',
                rationaleMn: 'Зөв. Моль $n = 8.8 / 44 = 0.2\\text{ моль}$. Эзлэхүүн $V = 0.2 \\times 24 = 4.8\\text{ дм}^3$.'
              },
              {
                id: 'B',
                textEn: '$2.4\\text{ dm}^3$',
                textMn: '$2.4\\text{ дм}^3$',
                rationaleEn: 'Incorrect. Corresponds to $0.1\\text{ mol}$ ($4.4\\text{ g}$).',
                rationaleMn: 'Буруу. $0.1\\text{ моль}$ ($4.4\\text{ г}$)-д харгалзах утга.'
              },
              {
                id: 'C',
                textEn: '$9.6\\text{ dm}^3$',
                textMn: '$9.6\\text{ дм}^3$',
                rationaleEn: 'Incorrect. Corresponds to $0.4\\text{ mol}$.',
                rationaleMn: 'Буруу. $0.4\\text{ моль}$-д харгалзах утга.'
              },
              {
                id: 'D',
                textEn: '$211.2\\text{ dm}^3$',
                textMn: '$211.2\\text{ дм}^3$',
                rationaleEn: 'Incorrect. Result of multiplying mass 8.8 directly by 24.',
                rationaleMn: 'Буруу. 8.8 массыг шууд 24-өөр үржүүлсэн алдаатай утга.'
              }
            ],
            correctOption: 'A',
            misconceptionDiagnosisEn: 'Multiplying mass by 24 without dividing by molar mass first.',
            misconceptionDiagnosisMn: 'Массыг молийн масс 44-т хуваалгүй шууд 24-өөр үржүүлж алдсан.',
            remediationTopicId: 'top-3-1'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-electrochemistry',
    number: 4,
    titleEn: 'Electrochemistry & Electrolysis',
    titleMn: 'Цахилгаан хими ба Электролиз',
    descriptionEn: 'Electrolysis of molten and aqueous electrolytes, cathode/anode discharge rules, half-equations, electroplating, and fuel cells.',
    descriptionMn: 'Хайлмал ба усан уусмалын электролиз, катод/анод дээр ялгарах дүрэм, хагас тэгшитгэлүүд, гальваностеги (бүрүүлэлт), түлшний элемент.',
    iconName: 'Zap',
    color: 'teal',
    topics: [
      {
        id: 'top-4-1',
        chapterId: 'ch-electrochemistry',
        syllabusRef: '0620/4.1',
        number: '4.1',
        titleEn: 'Electrolysis of Molten & Aqueous Electrolytes',
        titleMn: 'Хайлмал ба усан уусмалын электролиз',
        summaryEn: 'Predicting products at anode and cathode using the reactivity of ions, writing balanced ionic half-equations with state symbols and electron loss/gain.',
        summaryMn: 'Ионуудын идэвхэд үндэслэн анод ба катод дээр ялгарах бүтээгдэхүүнийг урьдчилан таамаглах, электрон алдах/авах хагас урвалын тэгшитгэл бичих.',
        learningObjectives: [
          {
            id: 'lo-4-1-1',
            code: '4.1.1',
            en: 'Define electrolysis as the breakdown of an ionic compound, molten or in aqueous solution, by the passage of electricity.',
            mn: 'Электролизийг цахилгаан гүйдэл дамжуулах замаар хайлмал эсвэл усан уусмал дахь ионы нэгдлийг задлах үзэгдэл гэж тодорхойлох.',
            ao: 'AO1'
          },
          {
            id: 'lo-4-1-2',
            code: '4.1.2',
            en: 'Identify the products formed at the positive anode and negative cathode during the electrolysis of molten lead(II) bromide, dilute sulfuric acid, and concentrated aqueous sodium chloride (brine).',
            mn: 'Хайлмал хар тугалганы(II) бромид, шингэрүүлсэн хүхрийн хүчил, өтгөрүүлсэн натрийн хлоридын (давсны уусмал) электролизийн үед эерэг анод ба сөрөг катод дээр үүсэх бүтээгдэхүүнийг тодорхойлох.',
            ao: 'AO2'
          },
          {
            id: 'lo-4-1-3',
            code: '4.1.3',
            en: 'Construct ionic half-equations for reactions at the cathode (reduction) and anode (oxidation).',
            mn: 'Катод (ангижрах) ба анод (исэлдэх) дээр явагдах хагас урвалын ионы тэгшитгэлийг зохиох.',
            ao: 'AO2'
          }
        ],
        vocabulary: [
          {
            id: 'voc-8',
            termEn: 'Electrolyte',
            termMn: 'Электролит',
            phonetic: '/ɪˈlektrəlaɪt/',
            definitionEn: 'A molten ionic compound or aqueous solution containing mobile ions that conducts electricity and decomposes in the process.',
            definitionMn: 'Хөдөлгөөнт ионуудыг агуулж, цахилгаан гүйдэл дамжуулдаг ба үйл явцын явцад задардаг хайлмал эсвэл усан уусмал.',
            exampleEn: 'Dilute $H_2SO_4(aq)$ is an electrolyte because $H^+$ and $SO_4^{2-}$ ions are free to move.',
            exampleMn: 'Шингэрүүлсэн $H_2SO_4(aq)$ нь $H^+$ ба $SO_4^{2-}$ ионууд чөлөөтэй хөдөлдөг тул электролит юм.',
            box: 1
          },
          {
            id: 'voc-9',
            termEn: 'Cathode',
            termMn: 'Катод',
            phonetic: '/ˈkæθəʊd/',
            definitionEn: 'The negative electrode in an electrolytic cell where reduction (gain of electrons) takes place.',
            definitionMn: 'Электролизийн элементийн сөрөг электрод бөгөөд энд ангижрах (электрон нэгдүүлэх) урвал явагдана.',
            exampleEn: 'Cations ($Pb^{2+}, Cu^{2+}, H^+$) are attracted to the cathode: $Pb^{2+} + 2e^- \\rightarrow Pb$.',
            exampleMn: 'Катионууд ($Pb^{2+}, Cu^{2+}, H^+$) катод руу татагдана: $Pb^{2+} + 2e^- \\rightarrow Pb$.',
            memoryTipEn: 'PANIC mnemonic: Positive Anode, Negative Is Cathode. OIL RIG: Oxidation Is Loss, Reduction Is Gain.',
            memoryTipMn: 'Катод = Сөрөг (-), энд ангижралт (электрон авах) явагдана. Анод = Эерэг (+), энд исэлдэлт (электрон алдах) явагдана.',
            box: 1
          },
          {
            id: 'voc-10',
            termEn: 'Anode',
            termMn: 'Анод',
            phonetic: '/ˈænəʊd/',
            definitionEn: 'The positive electrode in an electrolytic cell where oxidation (loss of electrons) occurs.',
            definitionMn: 'Электролизийн элементийн эерэг электрод бөгөөд энд исэлдэх (электрон алдах) урвал явагдана.',
            exampleEn: 'Chloride ions are discharged at the anode: $2Cl^- \\rightarrow Cl_2 + 2e^-$.',
            exampleMn: 'Хлорид ионууд анод дээр ялгарна: $2Cl^- \\rightarrow Cl_2 + 2e^-$.',
            box: 2
          }
        ],
        sections: [
          {
            id: 'sec-4-1',
            titleEn: '1. Rules for Predicting Aqueous Electrolysis Products',
            titleMn: '1. Усан уусмалын электролизийн бүтээгдэхүүнийг таамаглах дүрэм',
            contentEn: 'At the Cathode (Negative Electrode):\n• If the metal is LESS reactive than hydrogen (copper, silver, gold), the metal forms.\n• If the metal is MORE reactive than hydrogen (sodium, potassium, magnesium), hydrogen gas ($H_2$) forms: $2H^+ + 2e^- \\rightarrow H_2$.\n\nAt the Anode (Positive Electrode):\n• If concentrated halide ions ($Cl^-, Br^-, I^-$) are present, halogen gas forms ($Cl_2, Br_2, I_2$).\n• If sulfate ($SO_4^{2-}$), nitrate ($NO_3^-$), or dilute solution is used, hydroxide ($OH^-$) discharges to form oxygen gas ($O_2$): $4OH^- \\rightarrow O_2 + 2H_2O + 4e^-$.',
            contentMn: 'Катод дээр (Сөрөг электрод):\n• Хэрэв металл нь устөрөгчөөс БАГА идэвхтэй бол (зэс, мөнгө), металл өөрөө ялгарна.\n• Хэрэв металл нь устөрөгчөөс ИЛҮҮ идэвхтэй бол (натри, кали, магни), устөрөгчийн хий ($H_2$) ялгарна: $2H^+ + 2e^- \\rightarrow H_2$.\n\nАнод дээр (Эерэг электрод):\n• Өтгөрүүлсэн галид ион ($Cl^-, Br^-, I^-$) байвал галоген хий ($Cl_2, Br_2, I_2$) ялгарна.\n• Сульфат ($SO_4^{2-}$), нитрат ($NO_3^-$) эсвэл шингэрүүлсэн уусмал байвал гидроксид ион ($OH^-$) исэлдэж хүчилтөрөгчийн хий ($O_2$) ялгарна: $4OH^- \\rightarrow O_2 + 2H_2O + 4e^-$.',
            keyRuleEn: 'Cathode: Hydrogen forms UNLESS metal is below H in reactivity (Cu, Ag). Anode: Halogen forms if concentrated halide, otherwise Oxygen.',
            keyRuleMn: 'Катод: Устөрөгчөөс доогуур (Cu, Ag) биш л бол $H_2$ ялгарна. Анод: Өтгөрүүлсэн галид бол галоген, бусад үед $O_2$ ялгарна.'
          }
        ],
        workedExample: {
          id: 'we-4',
          titleEn: 'Electrolysis of Concentrated Aqueous Sodium Chloride (Brine)',
          titleMn: 'Өтгөрүүлсэн натрийн хлоридын (давсны уусмал) электролиз',
          questionEn: 'Concentrated aqueous sodium chloride is electrolysed using inert carbon electrodes. Name the products formed at the anode and cathode, write the ionic half-equations, and state what substance remains in the solution.',
          questionMn: 'Өтгөрүүлсэн натрийн хлоридын уусмалыг идэвхгүй нүүрстөрөгчийн электрод ашиглан электролиз явуулав. Анод ба катод дээр үүсэх бодисуудыг нэрлэж, хагас урвалын тэгшитгэлийг бичин, уусмалд ямар бодис үлдэхийг тодорхойлно уу.',
          stepsEn: [
            'Step 1: List all ions present in aqueous solution: From $NaCl \\rightarrow Na^+, Cl^-$. From water $H_2O \\rightleftharpoons H^+, OH^-$.',
            'Step 2: At Cathode (-): $Na^+$ vs $H^+$. Sodium is more reactive than hydrogen, so $H^+$ ions are discharged preferentially. Product: Hydrogen gas ($H_2$). Equation: $2H^+ + 2e^- \\rightarrow H_2$.',
            'Step 3: At Anode (+): $Cl^-$ vs $OH^-$. The solution is concentrated in chloride ions, so $Cl^-$ is discharged preferentially. Product: Chlorine gas ($Cl_2$). Equation: $2Cl^- \\rightarrow Cl_2 + 2e^-$.',
            'Step 4: Remaining in solution: $Na^+$ and $OH^-$ ions remain unreacted, leaving an alkaline solution of sodium hydroxide ($NaOH$).'
          ],
          stepsMn: [
            'Алхам 1: Уусмал дахь бүх ионуудыг бичнэ: $NaCl$-аас $\\rightarrow Na^+, Cl^-$; уснаас $\\rightarrow H^+, OH^-$.',
            'Алхам 2: Катод дээр (-): $Na^+$ ба $H^+$. Натри нь устөрөгчөөс илүү идэвхтэй тул устөрөгч ($H^+$) түрүүлж ялгарна. Бүтээгдэхүүн: Устөрөгчийн хий ($H_2$). Тэгшитгэл: $2H^+ + 2e^- \\rightarrow H_2$.',
            'Алхам 3: Анод дээр (+): $Cl^-$ ба $OH^-$. Хлоридын өтгөрүүлсэн уусмал тул $Cl^-$ түрүүлж ялгарна. Бүтээгдэхүүн: Хлорын хий ($Cl_2$). Тэгшитгэл: $2Cl^- \\rightarrow Cl_2 + 2e^-$.',
            'Алхам 4: Үлдэх бодис: Урвалд ороогүй үлдсэн $Na^+$ ба $OH^-$ ионууд нэгдэж шүлтлэг натрийн гидроксидын ($NaOH$) уусмал үүсгэнэ.'
          ],
          finalAnswerEn: 'Cathode: $H_2(g)$ ($2H^+ + 2e^- \\rightarrow H_2$). Anode: $Cl_2(g)$ ($2Cl^- \\rightarrow Cl_2 + 2e^-$). Remaining solution: Sodium hydroxide, $NaOH$.',
          finalAnswerMn: 'Катод: $H_2(g)$ ($2H^+ + 2e^- \\rightarrow H_2$). Анод: $Cl_2(g)$ ($2Cl^- \\rightarrow Cl_2 + 2e^-$). Үлдэх уусмал: Натрийн гидроксид, $NaOH$.',
          examinerTipEn: 'Do not write sodium metal ($Na$) at the cathode! Sodium reacts violently with water and cannot be discharged in aqueous solution.',
          examinerTipMn: 'Катод дээр натри металл ($Na$) ялгарна гэж хэзээ ч бүү бич! Натри нь устай шууд тэсрэлттэй урвалд ордог тул усан уусмалаас металл натри ялгарах боломжгүй.',
          commonMistakeEn: 'Stating sodium forms at the cathode instead of hydrogen gas in aqueous $NaCl$.',
          commonMistakeMn: 'Усан уусмал дахь $NaCl$-ийн катод дээр устөрөгчийн оронд натри үүснэ гэж алдах.'
        },
        recommendedSimulator: 'electrolysis',
        questions: [
          {
            id: 'q-4-p2',
            topicId: 'top-4-1',
            chapterId: 'ch-electrochemistry',
            syllabusRef: '0620/4.1',
            paper: 'Paper 2',
            totalMarks: 1,
            titleEn: 'Products of Aqueous Copper(II) Sulfate Electrolysis',
            titleMn: 'Зэсийн (II) сульфатын усан уусмалын электролиз',
            questionTextEn: 'Aqueous copper(II) sulfate is electrolysed using inert platinum electrodes. What is observed at the negative cathode?',
            questionTextMn: 'Зэсийн (II) сульфатын усан уусмалыг идэвхгүй цагаан алтан электрод ашиглан электролиз явуулав. Сөрөг катод дээр юу ажиглагдах вэ?',
            type: 'mcq',
            options: [
              {
                id: 'A',
                textEn: 'A pink-brown solid forms on the electrode',
                textMn: 'Электрод дээр ягаан-хүрэн өнгөтэй хатуу бодис бүрхэж тогтоно',
                rationaleEn: 'Correct. $Cu^{2+}$ ions are discharged at the cathode ($Cu^{2+} + 2e^- \\rightarrow Cu(s)$) forming a reddish-brown/pink copper deposit.',
                rationaleMn: 'Зөв. Катод дээр $Cu^{2+}$ ион ангижирч ($Cu^{2+} + 2e^- \\rightarrow Cu(s)$) зэсийн улаан хүрэн/ягаан өнгийн металл ялгарч наалдана.'
              },
              {
                id: 'B',
                textEn: 'Colorless bubbles of hydrogen gas form',
                textMn: 'Өнгөгүй устөрөгчийн хийн бөмбөлгүүд ялгарна',
                rationaleEn: 'Incorrect. Copper is less reactive than hydrogen, so copper forms, not hydrogen.',
                rationaleMn: 'Буруу. Зэс нь устөрөгчөөс бага идэвхтэй тул устөрөгч бус зэс металл ялгарна.'
              },
              {
                id: 'C',
                textEn: 'Pungent green-yellow gas is produced',
                textMn: 'Хурц үнэртэй ногоон-шаргал хий үүснэ',
                rationaleEn: 'Incorrect. There is no chloride in copper(II) sulfate.',
                rationaleMn: 'Буруу. Зэсийн сульфатад хлорид ион байхгүй.'
              },
              {
                id: 'D',
                textEn: 'The electrode completely dissolves',
                textMn: 'Электрод бүрэн уусна',
                rationaleEn: 'Incorrect. Platinum is an inert electrode, and the cathode never dissolves in electrolysis.',
                rationaleMn: 'Буруу. Цагаан алт нь идэвхгүй электрод бөгөөд катод электролизоор уусдаггүй.'
              }
            ],
            correctOption: 'A',
            misconceptionDiagnosisEn: 'Forgetting that copper is below hydrogen in the reactivity series and is discharged instead of hydrogen gas.',
            misconceptionDiagnosisMn: 'Зэс нь металлын идэвхийн эгнээнд устөрөгчөөс доор байрладаг тул устөрөгчийн оронд түрүүлж ялгардаг болохыг мартсан.',
            remediationTopicId: 'top-4-1'
          },
          {
            id: 'q-4-p4',
            topicId: 'top-4-1',
            chapterId: 'ch-electrochemistry',
            syllabusRef: '0620/4.1',
            paper: 'Paper 4',
            totalMarks: 4,
            titleEn: 'Electrolysis of Molten Lead(II) Bromide',
            titleMn: 'Хайлмал хар тугалганы(II) бромидын электролиз',
            questionTextEn: 'Molten lead(II) bromide, $PbBr_2$, is electrolysed using graphite electrodes.\n(a) State the observation at the positive anode.\n(b) Write the ionic half-equation for the reaction at the anode.\n(c) Name the product formed at the cathode.\n(d) Explain why solid lead(II) bromide does not undergo electrolysis.',
            questionTextMn: 'Хайлмал хар тугалганы(II) бромид, $PbBr_2$-ийг бал чулуун электрод ашиглан электролиздов.\n(a) Эерэг анод дээр ямар үзэгдэл ажиглагдах вэ?\n(b) Анод дээрх хагас урвалын ионы тэгшитгэлийг бичнэ үү.\n(c) Катод дээр үүсэх бүтээгдэхүүнийг нэрлэнэ үү.\n(d) Хатуу хар тугалганы(II) бромид яагаад электролизд ордоггүйг тайлбарлана уу.',
            type: 'structured',
            markScheme: [
              {
                pointIndex: 1,
                criterionEn: 'Observation at anode: Red-brown vapor / gas formed [1].',
                criterionMn: 'Анодын ажиглалт: Улаан-хүрэн өнгийн уур / хий үүснэ [1].',
                marks: 1
              },
              {
                pointIndex: 2,
                criterionEn: 'Anode equation: $2Br^- \\rightarrow Br_2 + 2e^-$ (or $2Br^- - 2e^- \\rightarrow Br_2$) [1].',
                criterionMn: 'Анодын тэгшитгэл: $2Br^- \\rightarrow Br_2 + 2e^-$ [1].',
                marks: 1
              },
              {
                pointIndex: 3,
                criterionEn: 'Product at cathode: Lead / $Pb$ (silvery liquid metal droplet) [1].',
                criterionMn: 'Катодын бүтээгдэхүүн: Хар тугалга / $Pb$ (мөнгөлөг шингэн металл дусал) [1].',
                marks: 1
              },
              {
                pointIndex: 4,
                criterionEn: 'Explanation for solid: In the solid state, ions are held in a fixed lattice and cannot move to carry current [1].',
                criterionMn: 'Хатуугийн тайлбар: Хатуу төлөвт ионууд оронт торонд бэхлэгдсэн тул чөлөөтэй хөдөлж гүйдэл дамжуулах боломжгүй [1].',
                marks: 1
              }
            ],
            misconceptionDiagnosisEn: 'Writing bromine as $Br$ instead of diatomic molecule $Br_2$ or confusing anode color with chlorine.',
            misconceptionDiagnosisMn: 'Бромыг хоёр атомт $Br_2$ гэхийн оронд $Br$ гэж дангаар бичих эсвэл хлорын өнгөтэй андуурсан.',
            remediationTopicId: 'top-4-1'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-acids-bases',
    number: 7,
    titleEn: 'Acids, Bases & Salt Preparation',
    titleMn: 'Хүчил, суурь ба давс гарган авах',
    descriptionEn: 'The pH scale, proton transfer ($H^+$ donors/acceptors), oxide classifications, salt preparation methods, and volumetric titration.',
    descriptionMn: 'pH хуваарь, протоны шилжилт ($H^+$ донор/акцептор), ислийн ангилал, давс гарган авах арга замууд, ба эзлэхүүний титрлэлт.',
    iconName: 'FlaskConical',
    color: 'rose',
    topics: [
      {
        id: 'top-7-1',
        chapterId: 'ch-acids-bases',
        syllabusRef: '0620/7.2',
        number: '7.1',
        titleEn: 'Salt Preparation Methods & Titration',
        titleMn: 'Давс гарган авах арга замууд ба Титрлэлт',
        summaryEn: 'Choosing the right method: excess insoluble reactant, acid-alkali titration, and precipitation; carrying out accurate titrations with concordant results.',
        summaryMn: 'Зөв аргыг сонгох: илүүдэл уусдаггүй бодис нэмэх арга, хүчил-шүлтийн титрлэлт, ба тунадасжуулах арга; зөрүүгүй (concordant) үр дүнтэй титрлэлт хийх.',
        learningObjectives: [
          {
            id: 'lo-7-1-1',
            code: '7.2.1',
            en: 'Classify oxides as acidic (non-metals), basic (metals), neutral ($CO, NO$), or amphoteric ($Al_2O_3, ZnO$).',
            mn: 'Исүүдийг хүчлийн (металл биш), суурийн (металл), саармаг ($CO, NO$), эсвэл амфотер ($Al_2O_3, ZnO$) гэж ангилах.',
            ao: 'AO1'
          },
          {
            id: 'lo-7-1-2',
            code: '7.2.2',
            en: 'Describe the preparation of soluble salts from an insoluble base/metal/carbonate and dilute acid.',
            mn: 'Уусдаггүй суурь/металл/карбонат ба шингэрүүлсэн хүчлээс уусдаг давс гарган авах дарааллыг тайлбарлах.',
            ao: 'AO2'
          },
          {
            id: 'lo-7-1-3',
            code: '7.2.3',
            en: 'Describe titration procedure using burette, pipette and suitable indicator to prepare salts of Group I metals or ammonium.',
            mn: 'I бүлгийн металл эсвэл аммонийн давс гарган авахад бюретка, пипетка, тохирох индикатор ашиглан титрлэх дарааллыг тайлбарлах.',
            ao: 'AO3'
          }
        ],
        vocabulary: [
          {
            id: 'voc-11',
            termEn: 'Titration',
            termMn: 'Титрлэлт',
            phonetic: '/taɪˈtreɪʃn/',
            definitionEn: 'A precise analytical method where a solution of known concentration is added from a burette to a known volume of another solution until neutralization occurs.',
            definitionMn: 'Мэдэгдэж буй концентрацитай уусмалыг бюреткээс өөр нэг бодисын тодорхой эзлэхүүнтэй уусмал дээр саармагжих хүртэл нь дусааж хэмждэг аналитик арга.',
            exampleEn: 'Titration using phenolphthalein changes from pink in alkaline $NaOH$ to colorless at the exact neutral endpoint.',
            exampleMn: 'Фенолфталеин ашигласан титрлэлт нь шүлтлэг $NaOH$-д ягаан байснаа яг саармагжих төгсгөлийн цэгт өнгөгүй болж хувирдаг.',
            box: 1
          },
          {
            id: 'voc-12',
            termEn: 'Concordant Titres',
            termMn: 'Зөрүүгүй (тохирсон) титрүүд',
            phonetic: '/kənˈkɔːdənt ˈtaɪtəz/',
            definitionEn: 'Burette readings from repeated titrations that agree within $\\pm 0.10\\text{ cm}^3$ of each other.',
            definitionMn: 'Давтан хийсэн титрлэлтүүдийн бюреткийн заалтууд бие биенээсээ $\\pm 0.10\\text{ см}^3$-ийн дотор тохирч байх үр дүнгүүд.',
            exampleEn: 'Titres of $23.40\\text{ cm}^3$ and $23.50\\text{ cm}^3$ are concordant and averaged to give $23.45\\text{ cm}^3$.',
            exampleMn: '$23.40\\text{ см}^3$ ба $23.50\\text{ см}^3$ заалтууд нь зөрүүгүй тохирч байгаа тул дундаж нь $23.45\\text{ см}^3$ болно.',
            memoryTipEn: 'In Paper 6: Always exclude the rough trial and average ONLY concordant titres within $0.1\\text{ cm}^3$.',
            memoryTipMn: 'Paper 6-д: Анхны баримжаа (rough) туршилтыг заавал хасч, зөвхөн $\\pm 0.1\\text{ см}^3$ дотор тохирсон үр дүнгүүдийн дунджийг олно.',
            box: 3
          }
        ],
        sections: [
          {
            id: 'sec-7-1',
            titleEn: '1. The 3 Salt Preparation Strategies',
            titleMn: '1. Давс гарган авах 3 үндсэн арга',
            contentEn: 'Method 1: Excess Insoluble Reactant (e.g. making $CuSO_4$):\nAdd excess copper(II) oxide to warm dilute sulfuric acid until no more dissolves. Filter to remove unreacted solid. Heat filtrate to saturation point. Leave to cool and crystallize. Pat dry with filter paper.\n\nMethod 2: Titration (for Soluble Base + Acid e.g. $NaCl$, $KNO_3$):\nUse pipette to measure acid/alkali. Titrate with indicator to find exact titre volume. Repeat without indicator using exact same volumes. Crystallize clean salt.\n\nMethod 3: Precipitation (for Insoluble Salts e.g. $BaSO_4, PbI_2$):\nMix two aqueous solutions. Filter the insoluble precipitate. Wash with distilled water. Dry in a warm oven.',
            contentMn: 'Арга 1: Илүүдэл уусдаггүй бодис нэмэх арга (Жишээ нь: $CuSO_4$ бэлтгэх):\nБүлээн шингэрүүлсэн хүхрийн хүчил дээр зэсийн(II) ислийг уусахаа болих хүртэл илүүдлээр нэмнэ. Урвалд ороогүй хатуу үлдэгдлийг шүүнэ. Шүүгдсийг ханасан уусмал болтол халаана. Хөргөж талсжуулна. Шүүлтүүрийн цаасаар хатаана.\n\nАрга 2: Титрлэлт (Уусдаг суурь + хүчил, жишээ нь: $NaCl$, $KNO_3$):\nПипеткаар уусмалыг хэмжинэ. Индикатор ашиглан яг саармагжих эзлэхүүнийг тодорхойлно. Дараа нь индикаторгүйгээр яг ижил эзлэхүүнээр давтан холиод талсжуулж цэвэр давс гаргана.\n\nАрга 3: Тунадасжуулах арга (Уусдаггүй давс гаргах, жишээ нь: $BaSO_4, PbI_2$):\nХоёр уусдаг давсны уусмалыг холино. Үүссэн уусдаггүй тунадсыг шүүж авна. Нэрмэл усаар угаана. Дулаан шүүгээнд хатаана.',
            keyRuleEn: 'Is the salt soluble? If NO -> Precipitation. If YES: Is the base soluble (Group 1/ammonia)? If YES -> Titration; If NO -> Excess base method.',
            keyRuleMn: 'Давс уусдаг уу? Хэрэв ҮГҮЙ бол -> Тунадасжуулах арга. Хэрэв ТИЙМ бол: Суурь нь уусдаг уу (1-р бүлэг/аммиак)? ТИЙМ бол -> Титрлэлт; ҮГҮЙ бол -> Илүүдэл суурь нэмэх арга.'
          }
        ],
        workedExample: {
          id: 'we-7',
          titleEn: 'Preparation of Pure Dry Crystals of Copper(II) Sulfate',
          titleMn: 'Зэсийн (II) сульфатын цэвэр, хуурай талст бэлтгэх',
          questionEn: 'Describe the four essential steps to prepare pure, dry crystals of hydrated copper(II) sulfate from insoluble copper(II) oxide and dilute sulfuric acid.',
          questionMn: 'Уусдаггүй зэсийн(II) исэл болон шингэрүүлсэн хүхрийн хүчлээс зэсийн(II) сульфатын цэвэр, хуурай талст бэлтгэх 4 үндсэн шат дамжлагыг тайлбарлана уу.',
          stepsEn: [
            'Step 1 (Reaction): Warm dilute sulfuric acid gently and add copper(II) oxide in excess, stirring until black powder stops dissolving (ensures all acid has reacted).',
            'Step 2 (Filtration): Filter the hot mixture using filter paper and a funnel to remove the unreacted excess copper(II) oxide.',
            'Step 3 (Crystallisation): Heat the clear blue filtrate in an evaporating basin to the crystallisation point (until crystals form on a cold glass rod), then leave to cool slowly.',
            'Step 4 (Drying): Filter the formed crystals, wash with a small volume of ice-cold distilled water, and dry gently between two sheets of filter paper (or warm oven).'
          ],
          stepsMn: [
            'Алхам 1 (Урвал): Шингэрүүлсэн хүхрийн хүчлийг зөөлөн халааж, хар өнгийн зэсийн исэл уусахаа болих хүртэл илүүдлээр нэмж хутгана (бүх хүчил урвалд орсныг баталгаажуулна).',
            'Алхам 2 (Шүүлт): Урвалд ороогүй илүүдэл зэсийн ислийг ялгахын тулд шүүлтүүрийн цаас болон юүлүүр ашиглан шүүнэ.',
            'Алхам 3 (Талсжилт): Цэнхэр шүүгдсийг ууршуулах аяганд талсжих цэг хүртэл (хүйтэн шилэн саваа дээр талст үүсэх хүртэл) халаагаад, аажмаар хөргөнө.',
            'Алхам 4 (Хатаалт): Үүссэн талстыг шүүж аваад, бага зэргийн хүйтэн нэрмэл усаар угааж, хоёр шүүлтүүрийн цаасны хооронд хатаана.'
          ],
          finalAnswerEn: '1. Add excess CuO to warm acid. 2. Filter out excess solid. 3. Evaporate to crystallisation point & cool. 4. Filter, wash and dry crystals.',
          finalAnswerMn: '1. Бүлээн хүчилд илүүдэл CuO нэмэх. 2. Илүүдэл хатууг шүүх. 3. Талсжих цэг хүртэл ууршуулж хөргөх. 4. Талстыг шүүж, угааж хатаах.',
          examinerTipEn: 'Do NOT say "evaporate to dryness"—that produces anhydrous white powder or thermal decomposition instead of hydrated blue crystals!',
          examinerTipMn: '"Бүрэн хуурай болтол ууршуулна" гэж хэзээ ч бүү бич—тэгвэл цэнхэр талст биш усгүй цагаан нунтаг болох эсвэл задарна!',
          commonMistakeEn: 'Evaporating to dryness instead of crystallization point.',
          commonMistakeMn: 'Талсжих цэг хүртэл ууршуулахын оронд бүх усыг нь ширгэтэл халаана гэж бичих.'
        },
        recommendedSimulator: 'titration',
        questions: [
          {
            id: 'q-7-p6',
            topicId: 'top-7-1',
            chapterId: 'ch-acids-bases',
            syllabusRef: '0620/7.2',
            paper: 'Paper 6',
            totalMarks: 3,
            titleEn: 'Reading Burette & Concordant Titres',
            titleMn: 'Бюреткийн заалт унших ба зөрүүгүй титр',
            questionTextEn: 'A student conducted three titration experiments to determine the concentration of hydrochloric acid using $25.0\\text{ cm}^3$ of $0.10\\text{ mol/dm}^3$ sodium hydroxide solution. The burette readings (in $\\text{cm}^3$) were:\nTrial 1 (rough): Initial = 0.00, Final = 24.30\nTrial 2: Initial = 0.00, Final = 23.70\nTrial 3: Initial = 23.70, Final = 47.50\n(a) Calculate the titre for Trial 2 and Trial 3.\n(b) State which titres are concordant and calculate the average titre.',
            questionTextMn: 'Сурагч $25.0\\text{ см}^3$ $0.10\\text{ моль/дм}^3$ натрийн гидроксидын уусмалыг саармагжуулахад орсон давсны хүчлийн эзлэхүүнийг олохоор 3 удаа титрлэлт хийв. Бюреткийн заалтууд ($\\text{см}^3$):\nТуршилт 1 (баримжаа): Эхний = 0.00, Төгсгөлийн = 24.30\nТуршилт 2: Эхний = 0.00, Төгсгөлийн = 23.70\nТуршилт 3: Эхний = 23.70, Төгсгөлийн = 47.50\n(a) Туршилт 2 ба 3-ын титрийн эзлэхүүнийг олно уу.\n(b) Аль үр дүнгүүд зөрүүгүй тохирч байгааг зааж, дундаж титрийг тооцоолно уу.',
            type: 'practical',
            practicalContext: {
              apparatusEn: 'Graduated $50.0\\text{ cm}^3$ glass burette read at the bottom of the meniscus at eye level.',
              apparatusMn: 'Шингэний түвшний хотгорын доод ирмэгээр нүдний түвшинд уншдаг $50.0\\text{ см}^3$ шилэн бюретка.',
              expectedUnit: 'cm³'
            },
            markScheme: [
              {
                pointIndex: 1,
                criterionEn: 'Trial 2 titre = $23.70 - 0.00 = 23.70\\text{ cm}^3$ and Trial 3 titre = $47.50 - 23.70 = 23.80\\text{ cm}^3$ [1].',
                criterionMn: 'Туршилт 2-ын титр = $23.70\\text{ см}^3$, Туршилт 3-ын титр = $23.80\\text{ см}^3$ [1].',
                marks: 1
              },
              {
                pointIndex: 2,
                criterionEn: 'Identification: Trial 2 and Trial 3 are concordant (within $0.10\\text{ cm}^3$ of each other) [1].',
                criterionMn: 'Тодорхойлолт: Туршилт 2 ба 3 нь зөрүүгүй тохирсон (хоорондоо $0.10\\text{ см}^3$-ийн зөрүүтэй) [1].',
                marks: 1
              },
              {
                pointIndex: 3,
                criterionEn: 'Average titre calculation: $\\frac{23.70 + 23.80}{2} = 23.75\\text{ cm}^3$ (Trial 1 excluded as it was a rough trial) [1].',
                criterionMn: 'Дундаж титр: $\\frac{23.70 + 23.80}{2} = 23.75\\text{ см}^3$ (Туршилт 1 нь баримжаа тул хасна) [1].',
                marks: 1
              }
            ],
            misconceptionDiagnosisEn: 'Including the rough trial in the average or not calculating subtraction for Trial 3 initial reading.',
            misconceptionDiagnosisMn: 'Баримжаа (rough) туршилтыг дундаж олохдоо оруулж тооцсон эсвэл 3-р туршилтын эхний заалтыг хасаагүй алдсан.',
            remediationTopicId: 'top-7-1'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-experimental-analysis',
    number: 12,
    titleEn: 'Experimental Techniques & Chemical Analysis (Paper 6)',
    titleMn: 'Туршилтын арга зүй ба химийн шинжилгээ (Paper 6)',
    descriptionEn: 'Qualitative analysis for cations, anions, gases, flame tests, chromatography, and evaluation of experimental errors.',
    descriptionMn: 'Катион, анион, хий таних чанарын урвалууд, дөлний сорил, хроматографи, ба туршилтын алдааг үнэлэх.',
    iconName: 'TestTube2',
    color: 'purple',
    topics: [
      {
        id: 'top-12-1',
        chapterId: 'ch-experimental-analysis',
        syllabusRef: '0620/12.1',
        number: '12.1',
        titleEn: 'Qualitative Analysis: Cation & Anion Tests',
        titleMn: 'Чанарын шинжилгээ: Катион ба Анионыг таних сорил',
        summaryEn: 'Complete identification of unknown salts using aqueous sodium hydroxide, aqueous ammonia, acid-silver nitrate, barium nitrate, and flame tests.',
        summaryMn: 'Натрийн гидроксид, аммиакийн уусмал, мөнгөний нитрат, барийн нитрат болон дөлний сорил ашиглан үл мэдэгдэх давсыг таних.',
        learningObjectives: [
          {
            id: 'lo-12-1-1',
            code: '12.1.1',
            en: 'Describe tests to identify aqueous cations: $Cu^{2+}, Fe^{2+}, Fe^{3+}, Al^{3+}, Zn^{2+}, Ca^{2+}, NH_4^+$.',
            mn: 'Уусмал дахь катионуудыг ($Cu^{2+}, Fe^{2+}, Fe^{3+}, Al^{3+}, Zn^{2+}, Ca^{2+}, NH_4^+$) таних туршилтыг тайлбарлах.',
            ao: 'AO3'
          },
          {
            id: 'lo-12-1-2',
            code: '12.1.2',
            en: 'Describe tests to identify anions: carbonate ($CO_3^{2-}$), chloride ($Cl^-$), bromide ($Br^-$), iodide ($I^-$), sulfate ($SO_4^{2-}$).',
            mn: 'Анионуудыг (карбонат $CO_3^{2-}$, хлорид $Cl^-$, бромид $Br^-$, иодид $I^-$, сульфат $SO_4^{2-}$) таних сорилыг тайлбарлах.',
            ao: 'AO3'
          },
          {
            id: 'lo-12-1-3',
            code: '12.1.3',
            en: 'Recall the flame test colors for $Li^+$ (red), $Na^+$ (yellow), $K^+$ (lilac), $Ca^{2+}$ (orange-red), $Ba^{2+}$ (light green), $Cu^{2+}$ (blue-green).',
            mn: 'Дөлний сорилын өнгийг санах: $Li^+$ (улаан), $Na^+$ (шар), $K^+$ (голт борын нил), $Ca^{2+}$ (улбар шар-улаан), $Ba^{2+}$ (цайвар ногоон), $Cu^{2+}$ (цэнхэр-ногоон).',
            ao: 'AO1'
          }
        ],
        vocabulary: [
          {
            id: 'voc-13',
            termEn: 'Precipitate',
            termMn: 'Тунадас',
            phonetic: '/prɪˈsɪpɪteɪt/',
            definitionEn: 'An insoluble solid that emerges from a liquid solution during a chemical reaction.',
            definitionMn: 'Химийн урвалын явцад уусмалаас ялгарч буй уусдаггүй хатуу бодис.',
            exampleEn: 'Adding aqueous $NaOH$ to copper(II) sulfate produces a light blue precipitate of copper(II) hydroxide.',
            exampleMn: 'Зэсийн сульфат дээр $NaOH$ нэмэхэд зэсийн(II) гидроксидын цайвар цэнхэр тунадас үүснэ.',
            box: 1
          },
          {
            id: 'voc-14',
            termEn: 'Flame Test',
            termMn: 'Дөлний сорил',
            phonetic: '/fleɪm test/',
            definitionEn: 'An analytical procedure used to detect the presence of certain metal ions based on each element’s characteristic emission spectrum in a Bunsen burner flame.',
            definitionMn: 'Бунзен дөлд металлын ион бүрийн цацруулдаг өвөрмөц өнгөнд үндэслэн тухайн металлыг таних шинжилгээний арга.',
            exampleEn: 'Potassium compounds give a distinctive lilac flame.',
            exampleMn: 'Калийн нэгдлүүд голт борын нил ягаан өнгийн өвөрмөц дөл үүсгэдэг.',
            box: 2
          }
        ],
        sections: [
          {
            id: 'sec-12-1',
            titleEn: '1. Cation Identification Table (Paper 6 Key Reference)',
            titleMn: '1. Катион таних үндсэн хүснэгт (Paper 6-ийн гол лавлах)',
            contentEn: '• Copper(II) ($Cu^{2+}$): Light blue ppt with $NaOH$, insoluble in excess. Light blue ppt with $NH_3$, dissolves in excess to give deep blue solution.\n• Iron(II) ($Fe^{2+}$): Green ppt, insoluble in excess $NaOH$ and $NH_3$. Turns brown on surface.\n• Iron(III) ($Fe^{3+}$): Red-brown ppt, insoluble in excess $NaOH$ and $NH_3$.\n• Zinc ($Zn^{2+}$): White ppt, soluble in excess $NaOH$ and soluble in excess $NH_3$ (giving colorless solutions in both).\n• Aluminium ($Al^{3+}$): White ppt, soluble in excess $NaOH$ (colorless), but INSOLUBLE in excess $NH_3$.\n• Calcium ($Ca^{2+}$): White ppt with $NaOH$, insoluble in excess; no ppt with $NH_3$.\n• Ammonium ($NH_4^+$): Ammonia gas produced on warming with $NaOH$ (turns damp red litmus paper blue).',
            contentMn: '• Зэс(II) ($Cu^{2+}$): $NaOH$-аар цайвар цэнхэр тунадас үүсч, илүүдэлд уусахгүй. $NH_3$-аар цайвар цэнхэр тунадас үүсч, илүүдэлд нь уусч ГҮН ЦЭНХЭР уусмал болно.\n• Төмөр(II) ($Fe^{2+}$): Ногоон тунадас, илүүдэл $NaOH$ ба $NH_3$-д уусахгүй. Агаартай шүргэлцэхэд гадарга нь хүрэн болно.\n• Төмөр(III) ($Fe^{3+}$): Улаан-хүрэн тунадас, илүүдэлд уусахгүй.\n• Цайр ($Zn^{2+}$): Цагаан тунадас, илүүдэл $NaOH$ БОЛОН илүүдэл $NH_3$-д хоёуланд нь уусч өнгөгүй уусмал болно.\n• Хөнгөн цагаан ($Al^{3+}$): Цагаан тунадас, илүүдэл $NaOH$-д уусна, харин илүүдэл $NH_3$-д УУСАХГҮЙ.\n• Кальци ($Ca^{2+}$): $NaOH$-аар цагаан тунадас, илүүдэлд уусахгүй; $NH_3$-аар тунадас үүсэхгүй.\n• Аммони ($NH_4^+$): $NaOH$-тай халаахад аммиак хий ялгарч чийгтэй улаан лакмусыг хөх өнгөтэй болгоно.',
            keyRuleEn: 'Distinguish Al³⁺ vs Zn²⁺: Add excess aqueous ammonia. Zn²⁺ dissolves; Al³⁺ remains insoluble!',
            keyRuleMn: 'Al³⁺ ба Zn²⁺-ийг ялгах гол арга: Илүүдэл аммиакийн уусмал ($NH_3$) нэмэхэд Zn²⁺ уусдаг бол Al³⁺ уусахгүй үлдэнэ!'
          }
        ],
        workedExample: {
          id: 'we-12',
          titleEn: 'Identifying Unknown Salt Solid W',
          titleMn: 'Үл мэдэгдэх W хатуу давсыг таних бодлого',
          questionEn: 'Solid W is an inorganic salt. Tests on W produce the following observations:\n1. A flame test gives an apple-green flame.\n2. When aqueous sodium hydroxide is added to a solution of W, a green precipitate forms which does not dissolve in excess.\n3. When dilute nitric acid and aqueous silver nitrate are added to a solution of W, a pale cream precipitate forms.\nIdentify the ions present in W and name the compound.',
          questionMn: 'Хатуу W бодис нь органик бус давс юм. Туршилтын үр дүнгүүд:\n1. Дөлний сорилоор цайвар ногоон (apple-green) дөл үүсгэв.\n2. W-ийн уусмал дээр натрийн гидроксид нэмэхэд ногоон тунадас бууж, илүүдэлд нь уусаагүй.\n3. W-ийн уусмал дээр шингэрүүлсэн азотын хүчил болон мөнгөний нитрат нэмэхэд шаргал цагаан (pale cream) тунадас үүсэв.\nW бодис дахь катион ба анионыг тодорхойлж, бодисыг нэрлэнэ үү.',
          stepsEn: [
            'Step 1 (Cation test 2): Green precipitate with $NaOH$ insoluble in excess indicates iron(II) ion, $Fe^{2+}$.',
            'Step 2 (Anion test 3): Dilute nitric acid + silver nitrate gives pale cream precipitate, which confirms bromide ion, $Br^-$ (white = $Cl^-$, cream = $Br^-$, yellow = $I^-$).',
            'Step 3 (Re-check flame vs iron): The green precipitate is the primary diagnostic test for $Fe^{2+}$. (Note: if $Ba^{2+}$ was considered from flame, it gives no ppt with $NaOH$). Hence the cation is $Fe^{2+}$.',
            'Step 4: Combine ions: $Fe^{2+}$ and $Br^-$ form Iron(II) bromide, $FeBr_2$.'
          ],
          stepsMn: [
            'Алхам 1 (Катионы сорил 2): $NaOH$-аар ногоон тунадас үүсч илүүдэлд уусахгүй байгаа нь төмөр(II) ион, $Fe^{2+}$ болохыг заана.',
            'Алхам 2 (Анионы сорил 3): Азотын хүчил + мөнгөний нитратаар шаргал цагаан (cream) тунадас өгч байгаа нь бромид ион, $Br^-$ болохыг батална (цагаан = $Cl^-$, цөцгийн цайвар шар = $Br^-$, шар = $I^-$).',
            'Алхам 3: Катион нь $Fe^{2+}$, анион нь $Br^-$ байна.',
            'Алхам 4: Нэгдлийг нэрлэх: Төмрийн(II) бромид, $FeBr_2$.'
          ],
          finalAnswerEn: 'Cation: $Fe^{2+}$, Anion: $Br^-$. Name: Iron(II) bromide ($FeBr_2$).',
          finalAnswerMn: 'Катион: $Fe^{2+}$, Анион: $Br^-$. Бодисын нэр: Төмрийн(II) бромид ($FeBr_2$).',
          examinerTipEn: 'Always specify the oxidation state in roman numerals: "Iron(II) bromide", not just "iron bromide".',
          examinerTipMn: 'Ром тоогоор исэлдэхүйн хэмийг заавал бич: "Төмрийн бромид" гэвэл оноо алдана, заавал "Төмрийн(II) бромид" гэх ёстой.',
          commonMistakeEn: 'Forgetting roman numeral II, or confusing cream ppt (bromide) with yellow ppt (iodide).',
          commonMistakeMn: 'Ром тоо II-г орхих эсвэл бромидын cream өнгийг иодидын шар тунадастай андуурах.'
        },
        recommendedSimulator: 'qualitative',
        questions: [
          {
            id: 'q-12-p6',
            topicId: 'top-12-1',
            chapterId: 'ch-experimental-analysis',
            syllabusRef: '0620/12.1',
            paper: 'Paper 6',
            totalMarks: 3,
            titleEn: 'Identifying Unknown Solution Z',
            titleMn: 'Үл мэдэгдэх Z уусмалыг таних',
            questionTextEn: 'A student is given aqueous solution Z containing one cation and one anion. When dilute nitric acid followed by aqueous barium nitrate is added, a dense white precipitate forms. When aqueous sodium hydroxide is added dropwise, a white precipitate forms that dissolves when excess sodium hydroxide is added to form a colorless solution. When aqueous ammonia is added to Z, a white precipitate forms that does NOT dissolve in excess ammonia.\n(a) Identify the anion in Z.\n(b) Identify the cation in Z.\n(c) Write the chemical formula of Z.',
            questionTextMn: 'Сурагчид нэг катион, нэг анион агуулсан Z уусмал өгөгдөв. Шингэрүүлсэн азотын хүчил нэмээд барийн нитратын уусмал дусаахад цагаан тунадас үүсэв. Z дээр натрийн гидроксид дусаахад цагаан тунадас үүсч, илүүдэл $NaOH$ нэмэхэд тунадас уусаж өнгөгүй уусмал болов. Харин Z дээр аммиакийн уусмал нэмэхэд цагаан тунадас үүсч, илүүдэл аммиакт УУССАНГҮЙ.\n(a) Z дээрх анионыг тодорхойлно уу.\n(b) Z дээрх катионыг тодорхойлно уу.\n(c) Z бодисын химийн томьёог бичнэ үү.',
            type: 'practical',
            markScheme: [
              {
                pointIndex: 1,
                criterionEn: 'Anion: Sulfate / $SO_4^{2-}$ (barium nitrate test with nitric acid gives white precipitate of $BaSO_4$) [1].',
                criterionMn: 'Анион: Сульфат / $SO_4^{2-}$ (азотын хүчилтэй барийн нитрат цагаан тунадас өгсөн) [1].',
                marks: 1
              },
              {
                pointIndex: 2,
                criterionEn: 'Cation: Aluminium / $Al^{3+}$ (dissolves in excess $NaOH$ but insoluble in excess $NH_3$) [1].',
                criterionMn: 'Катион: Хөнгөн цагаан / $Al^{3+}$ (илүүдэл $NaOH$-д ууссан боловч илүүдэл $NH_3$-д уусаагүй) [1].',
                marks: 1
              },
              {
                pointIndex: 3,
                criterionEn: 'Formula: $Al_2(SO_4)_3$ [1].',
                criterionMn: 'Томьёо: $Al_2(SO_4)_3$ [1].',
                marks: 1
              }
            ],
            misconceptionDiagnosisEn: 'Confusing aluminium ($Al^{3+}$) with zinc ($Zn^{2+}$). Zinc dissolves in BOTH excess $NaOH$ and excess $NH_3$. Aluminium only dissolves in excess $NaOH$.',
            misconceptionDiagnosisMn: 'Хөнгөн цагааныг ($Al^{3+}$) цайртай ($Zn^{2+}$) андуурсан. Цайр нь $NaOH$ болон $NH_3$-ийн хоёулангийнх нь илүүдэлд уусдаг бол хөнгөн цагаан зөвхөн $NaOH$-д уусдаг.',
            remediationTopicId: 'top-12-1'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-rates-of-reaction',
    number: 8,
    titleEn: 'Rates of Reaction & Collision Theory',
    titleMn: 'Урвалын хурд ба Мөргөлдөлтийн онол',
    descriptionEn: 'Factors affecting rate of reaction (concentration, pressure, surface area, temperature, catalyst), Maxwell-Boltzmann idea, and evaluating gas collection methods.',
    descriptionMn: 'Урвалын хурдад нөлөөлөх хүчин зүйлс (концентраци, даралт, гадаргын талбай, температур, катализатор), хий цуглуулах аргыг үнэлэх.',
    iconName: 'TrendingUp',
    color: 'emerald',
    topics: [
      {
        id: 'top-8-1',
        chapterId: 'ch-rates-of-reaction',
        syllabusRef: '0620/8.1',
        number: '8.1',
        titleEn: 'Factors Affecting Rate & Collision Theory',
        titleMn: 'Урвалын хурд ба Мөргөлдөлтийн онол',
        summaryEn: 'How particles collide with activation energy ($E_a$); measuring gas volume using a gas syringe or measuring cylinder over water; interpreting curves and tangents.',
        summaryMn: 'Идэвхжлийн энергитэй ($E_a$) бөөмсийн мөргөлдөөн; хийн шприцээр ялгарсан хийг хэмжих; муруйн налалт (тангенс)-аар хурдыг тооцоолох.',
        learningObjectives: [
          {
            id: 'lo-8-1-1',
            code: '8.1.1',
            en: 'Describe practical methods for investigating the rate of a reaction which produces a gas.',
            mn: 'Хий ялгаруулдаг урвалын хурдыг судлах туршилтын аргуудыг (хийн шприц, электрон жин) дүрслэх.',
            ao: 'AO3'
          },
          {
            id: 'lo-8-1-2',
            code: '8.1.2',
            en: 'Explain the effect of changes in concentration, pressure, surface area, and temperature on reaction rate using collision theory.',
            mn: 'Концентраци, даралт, гадаргын талбай ба температурын өөрчлөлт нь урвалын хурдад хэрхэн нөлөөлдгийг мөргөлдөлтийн онолоор тайлбарлах.',
            ao: 'AO2'
          }
        ],
        vocabulary: [
          {
            id: 'voc-8-1',
            termEn: 'Activation Energy (Ea)',
            termMn: 'Идэвхжлийн энерги (Ea)',
            phonetic: '/ˌæktɪˈveɪʃn ˈenədʒi/',
            definitionEn: 'The minimum amount of energy colliding particles must possess in order to react.',
            definitionMn: 'Химийн урвалд орохын тулд мөргөлдөж буй бөөмсүүдэд байх шаардлагатай хамгийн бага энерги.',
            exampleEn: 'A catalyst increases the rate of reaction by providing an alternative pathway with lower activation energy.',
            exampleMn: 'Катализатор нь бага идэвхжлийн энергитэй өөр зам үүсгэснээр урвалын хурдыг ихэсгэдэг.',
            box: 1
          },
          {
            id: 'voc-8-2',
            termEn: 'Collision Frequency',
            termMn: 'Мөргөлдөлтийн давтамж',
            phonetic: '/kəˈlɪʒn ˈfriːkwənsi/',
            definitionEn: 'The number of collisions between reactant particles per unit volume per unit time.',
            definitionMn: 'Нэгж хугацаанд, нэгж эзлэхүүн дэх урвалд орж буй бөөмсүүдийн мөргөлдөлтийн тоо.',
            exampleEn: 'Increasing concentration increases collision frequency because more particles occupy the same volume.',
            exampleMn: 'Концентрацийг ихэсгэхэд нэгж эзлэхүүнд олон бөөмс байх тул мөргөлдөлтийн давтамж нэмэгдэнэ.',
            box: 2
          }
        ],
        sections: [
          {
            id: 'sec-8-1',
            titleEn: '1. Collision Theory Core Rules',
            titleMn: '1. Мөргөлдөлтийн онолын үндсэн дүрэм',
            contentEn: 'For a chemical reaction to occur: 1) Particles must collide, 2) With energy equal to or greater than activation energy ($E_a$), 3) In correct collision orientation.\n• Temperature: Higher temperature gives particles more kinetic energy. They move faster (slightly higher collision frequency) AND a much higher proportion of particles possess $E \\ge E_a$.\n• Surface area: Powder has vastly higher surface area than large lumps, exposing far more reactant atoms.',
            contentMn: 'Урвал явагдах 3 нөхцөл: 1) Бөөмс хоорондоо мөргөлдөх, 2) Идэвхжлийн энергитэй тэнцүү буюу түүнээс их энергитэй байх ($E \\ge E_a$), 3) Зөв чиглэлтэй мөргөлдөх.\n• Температур: Өндөр температурт бөөмс их кинетик энерги авна. Тэд хурдан хөдөлж мөргөлдөхийн зэрэгцээ хамгийн гол нь $E \\ge E_a$ энергитэй бөөмсийн эзлэх хувь огцом өснө.\n• Гадаргын талбай: Нунтаг бодис нь том хэлтэрхийнээс хамаагүй их гадаргуутай тул нэгэн зэрэг олон бөөмс хүчилтэй шүргэлцэнэ.'
          }
        ],
        workedExample: {
          id: 'we-8',
          titleEn: 'Calculating Rate from a Tangent to a Curve',
          titleMn: 'Муруйн тангенсаар урвалын агшин зуурын хурдыг тооцоолох',
          questionEn: 'A student plots the volume of hydrogen gas ($cm^3$) produced against time ($s$). At $t = 30\\text{ s}$, a tangent drawn to the curve passes through coordinates $(0, 5)$ and $(60, 41)$. Calculate the rate of reaction at $30\\text{ s}$ with appropriate units.',
          questionMn: 'Сурагч ялгарсан устөрөгчийн хийн эзлэхүүнийг хугацаанаас хамааруулан график зурав. $t = 30\\text{ с}$ цэг дээр татсан тангенс шугам $(0, 5)$ ба $(60, 41)$ цэгийг дайрав. $30\\text{ с}$ дахь урвалын хурдыг нэгжтэй нь тооцоолно уу.',
          stepsEn: [
            'Step 1: Formula for gradient: $\\text{Rate} = \\frac{\\Delta y}{\\Delta x} = \\frac{V_2 - V_1}{t_2 - t_1}$.',
            'Step 2: Substitute values: $\\text{Rate} = \\frac{41 - 5}{60 - 0} = \\frac{36}{60} = 0.60$.',
            'Step 3: Units: $y$-axis is $cm^3$, $x$-axis is $s$. Unit is $cm^3/s$ (or $cm^3\\ s^{-1}$).',
            'Step 4: Final answer: $0.60\\text{ cm}^3/\\text{s}$.'
          ],
          stepsMn: [
            'Алхам 1: Тангенсын налалтын томьёо: $\\text{Хурд} = \\frac{\\Delta y}{\\Delta x} = \\frac{V_2 - V_1}{t_2 - t_1}$.',
            'Алхам 2: Утгуудыг орлуулах: $\\text{Хурд} = \\frac{41 - 5}{60 - 0} = \\frac{36}{60} = 0.60$.',
            'Алхам 3: Нэгжийг тодорхойлох: $y$-тэнхлэг $cm^3$, $x$-тэнхлэг $s$ тул нэгж нь $cm^3/s$ болно.',
            'Алхам 4: Эцсийн хариу: $0.60\\text{ см}^3/\\text{с}$.'
          ],
          finalAnswerEn: 'Rate = $0.60\\text{ cm}^3/\\text{s}$',
          finalAnswerMn: 'Урвалын хурд = $0.60\\text{ см}^3/\\text{с}$',
          examinerTipEn: 'Do not simply divide volume at 30s by 30! You MUST construct a straight tangent line at that point and determine its gradient.',
          examinerTipMn: '30 секунд дахь эзлэхүүнийг шууд 30-д хувааж болохгүй! Заавал тухайн цэгт тангенс татаж, түүнийхээ налалтыг олдог.',
          commonMistakeEn: 'Forgetting units or miscalculating $\\Delta y / \\Delta x$.',
          commonMistakeMn: 'Нэгжийг орхих эсвэл налалтын хуваах үйлдлийг буруу хийх.'
        },
        recommendedSimulator: 'rates',
        questions: [
          {
            id: 'q-8-p2',
            topicId: 'top-8-1',
            chapterId: 'ch-rates-of-reaction',
            syllabusRef: '0620/8.1',
            paper: 'Paper 2',
            totalMarks: 1,
            titleEn: 'Rate Comparison for Calcium Carbonate and Acid',
            titleMn: 'Гантиг чулуу ба хүчлийн урвалын хурд',
            questionTextEn: 'Which reaction condition will produce the fastest initial rate of reaction between calcium carbonate and dilute hydrochloric acid?',
            questionTextMn: 'Кальцийн карбонат ба шингэрүүлсэн давсны хүчлийн хоорондох дараах нөхцөлүүдээс аль нь хамгийн их анхны хурдтай байх вэ?',
            type: 'mcq',
            options: [
              {
                id: 'A',
                textEn: 'Powdered calcium carbonate with 2.0 mol/dm³ HCl at 40°C',
                textMn: 'Нунтаг кальцийн карбонат, 2.0 моль/дм³ HCl, 40°C',
                rationaleEn: 'Correct. High surface area (powder), highest concentration (2.0 M), and highest temperature (40°C) maximize collision frequency and effective collisions.',
                rationaleMn: 'Зөв. Их гадарга (нунтаг), өндөр концентраци (2.0 M), ба өндөр температур (40°C) нь үр дүнтэй мөргөлдөлтийг дээд зэрэгт хүргэнэ.'
              },
              {
                id: 'B',
                textEn: 'Large marble chips with 2.0 mol/dm³ HCl at 40°C',
                textMn: 'Том гантиг чулуу, 2.0 моль/дм³ HCl, 40°C',
                rationaleEn: 'Incorrect. Large chips have much smaller surface area than powder.',
                rationaleMn: 'Буруу. Том чулуу нь нунтгийг бодвол бага гадаргатай.'
              },
              {
                id: 'C',
                textEn: 'Powdered calcium carbonate with 0.5 mol/dm³ HCl at 20°C',
                textMn: 'Нунтаг кальцийн карбонат, 0.5 моль/дм³ HCl, 20°C',
                rationaleEn: 'Incorrect. Low concentration and low temperature reduce collision frequency.',
                rationaleMn: 'Буруу. Бага концентраци ба бага температур нь хурдыг удаашруулна.'
              },
              {
                id: 'D',
                textEn: 'Large marble chips with 0.5 mol/dm³ HCl at 20°C',
                textMn: 'Том гантиг чулуу, 0.5 моль/дм³ HCl, 20°C',
                rationaleEn: 'Incorrect. This combination produces the slowest rate.',
                rationaleMn: 'Буруу. Энэ нь хамгийн удаан урвалын нөхцөл юм.'
              }
            ],
            correctOption: 'A',
            misconceptionDiagnosisEn: 'Overlooking that powder exposes much greater surface area than chips.',
            misconceptionDiagnosisMn: 'Нунтаг нь том хэлтэрхийнээс илүү их гадаргын талбайтай болохыг анзаараагүй.',
            remediationTopicId: 'top-8-1'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-separation-techniques',
    number: 21,
    titleEn: 'Experimental Design & Separation Techniques',
    titleMn: 'Туршилтын арга зүй ба Бодис ялгах аргууд',
    descriptionEn: 'Filtration, crystallisation, simple and fractional distillation, chromatography ($R_f$ values), and evaluating sources of error.',
    descriptionMn: 'Шүүлтүүр, талсжуулалт, энгийн ба фракцын нэрлэг, цаасан хроматографи ($R_f$ утга), туршилтын алдааг үнэлэх.',
    iconName: 'Layers',
    color: 'cyan',
    topics: [
      {
        id: 'top-21-1',
        chapterId: 'ch-separation-techniques',
        syllabusRef: '0620/21.3',
        number: '21.3',
        titleEn: 'Paper Chromatography & Rf Calculation',
        titleMn: 'Цаасан хроматографи ба Rf утга тооцоолох',
        summaryEn: 'Separating soluble coloured substances, locating agents, pencil baseline rules, solvent front, and calculating $R_f = \\frac{\\text{distance by spot}}{\\text{distance by solvent front}}$.',
        summaryMn: 'Уусдаг өнгөт бодисыг ялгах, илрүүлэгч бодис, харандаагаар эхлэлийн шугам зурах дүрэм, уусгагчийн фронт, $R_f$ тооцоолол.',
        learningObjectives: [
          {
            id: 'lo-21-1-1',
            code: '21.3.1',
            en: 'Describe how paper chromatography can be used to separate and identify mixtures of pigments.',
            mn: 'Цаасан хроматографийг ашиглан өнгөт пигментүүдийн хольцыг ялгах, таних дарааллыг тайлбарлах.',
            ao: 'AO3'
          },
          {
            id: 'lo-21-1-2',
            code: '21.3.2',
            en: 'Calculate and use $R_f$ values to identify components in a mixture.',
            mn: 'Хольц дахь бүрэлдэхүүн хэсгийг тодорхойлоход $R_f$ утгыг тооцоолж ашиглах.',
            ao: 'AO2'
          }
        ],
        vocabulary: [
          {
            id: 'voc-21-1',
            termEn: 'Retention Factor (Rf)',
            termMn: 'Хадгалалтын хүчин зүйл (Rf)',
            phonetic: '/rɪˈtenʃn ˈfæktə/',
            definitionEn: 'The ratio of the distance travelled by the solute spot to the distance travelled by the solvent front.',
            definitionMn: 'Ууссан бодисын туулсан зайг уусгагчийн фронтын туулсан зайд харьцуулсан харьцаа.',
            exampleEn: 'An Rf value of 0.65 means the spot travelled 65% of the distance to the solvent front.',
            exampleMn: 'Rf = 0.65 гэдэг нь тухайн толбо уусгагчийн туулсан замын 65%-тай тэнцэх зайг туулсныг илтгэнэ.',
            box: 2
          }
        ],
        sections: [
          {
            id: 'sec-21-1',
            titleEn: '1. Paper 6 Chromatography Setup Rules',
            titleMn: '1. Paper 6 Хроматографийн 2 алтан дүрэм',
            contentEn: '1. Baseline MUST be drawn in pencil: Graphite is insoluble in water/organic solvent, so it will not dissolve or produce misleading spots. Never use pen ink.\n2. Solvent level MUST be below the baseline: If the solvent sits above the baseline, the spotted dyes dissolve directly into the liquid reservoir rather than travelling up the paper.',
            contentMn: '1. Эхлэлийн шугамыг ЗААВАЛ харандаагаар зурна: Бал чулуу нь усанд болон органик уусгагчид уусдаггүй тул өнгө ялгаруулж хуурамч толбо үүсгэхгүй. Үзгээр зурж хэзээ ч болохгүй.\n2. Уусгагчийн түвшин заавал эхлэлийн шугамаас ДООР байх ёстой: Хэрэв уусгагч шугамнаас дээш гарвал дээжүүд цаас руу биш шууд шилэн савны уусгагч руу уусч урсана.'
          }
        ],
        workedExample: {
          id: 'we-21',
          titleEn: 'Calculating Rf from Measurements',
          titleMn: 'Хэмжилтээс Rf утгыг тооцоолох',
          questionEn: 'In a chromatography experiment, the baseline is at 0 mm and the solvent front reaches 100 mm. A purple dye produces a blue spot at 35 mm and a red spot at 80 mm. Calculate the $R_f$ value for both spots and state which dye is more soluble in the mobile phase.',
          questionMn: 'Хроматографийн туршилтад эхлэлийн шугам 0 мм, уусгагчийн фронт 100 мм хүрэв. Нил ягаан бэх нь 35 мм-т цэнхэр, 80 мм-т улаан толбо үүсгэв. Хоёр толбоны $R_f$ утгыг олж, аль нь хөдөлгөөнт фазад илүү сайн уусдаг болохыг заана уу.',
          stepsEn: [
            'Step 1: Calculate Rf of blue spot: $R_f = \\frac{35}{100} = 0.35$.',
            'Step 2: Calculate Rf of red spot: $R_f = \\frac{80}{100} = 0.80$.',
            'Step 3: Relate Rf to solubility: Higher Rf value indicates higher solubility in the mobile solvent phase and weaker attraction to paper fibres.',
            'Step 4: Conclusion: The red dye is more soluble in the solvent.'
          ],
          stepsMn: [
            'Алхам 1: Цэнхэр толбоны Rf: $R_f = \\frac{35}{100} = 0.35$.',
            'Алхам 2: Улаан толбоны Rf: $R_f = \\frac{80}{100} = 0.80$.',
            'Алхам 3: Rf ба уусах чанарыг холбох: Rf өндөр байх тусам уусгагчид сайн уусч, цаасанд бага татагдаж хол туулна.',
            'Алхам 4: Дүгнэлт: Улаан бэх нь уусгагчид илүү сайн уусдаг.'
          ],
          finalAnswerEn: 'Blue spot Rf = 0.35, Red spot Rf = 0.80. Red dye is more soluble.',
          finalAnswerMn: 'Цэнхэр толбо Rf = 0.35, Улаан толбо Rf = 0.80. Улаан будаг илүү сайн уусна.',
          examinerTipEn: 'Rf values must be between 0 and 1, and have NO units.',
          examinerTipMn: 'Rf утга нь 0 ба 1-ийн хооронд байх ба ямар ч нэгжгүй байна.',
          commonMistakeEn: 'Inverting the fraction (dividing solvent front by spot distance).',
          commonMistakeMn: 'Харьцааг урвуу хувааж 1-ээс их тоо гаргах.'
        },
        recommendedSimulator: 'chromatography',
        questions: [
          {
            id: 'q-21-p6',
            topicId: 'top-21-1',
            chapterId: 'ch-separation-techniques',
            syllabusRef: '0620/21.3',
            paper: 'Paper 6',
            totalMarks: 2,
            titleEn: 'Evaluating Experimental Error in Chromatography',
            titleMn: 'Хроматографийн алдааг үнэлэх',
            questionTextEn: 'A student drew the baseline on chromatography paper using blue ink and placed the paper in a beaker where the water level was higher than the baseline. State two reasons why this experiment failed.',
            questionTextMn: 'Сурагч хроматографийн эхлэлийн шугамыг цэнхэр үзгээр зурж, уусгагч усыг уг шугамаас дээгүүр байхаар саванд хийжээ. Энэ туршилт яагаад амжилтгүй болсон 2 шалтгааныг нэрлэнэ үү.',
            type: 'structured',
            markScheme: [
              {
                pointIndex: 1,
                criterionEn: 'Reason 1: The ink baseline would dissolve in the solvent and separate into dyes, interfering with the sample [1].',
                criterionMn: 'Шалтгаан 1: Цэнхэр бэхний шугам нь усанд уусаж будагнууд болон салж, туршилтын үр дүнг бохирдуулна [1].',
                marks: 1
              },
              {
                pointIndex: 2,
                criterionEn: 'Reason 2: Because the solvent level was above the baseline, the sample spots dissolved directly into the water instead of moving up the paper [1].',
                criterionMn: 'Шалтгаан 2: Усны түвшин дээш байсан тул дээжүүд цаас руу дээшээ өгсөхгүй, шууд усанд уусаж урсана [1].',
                marks: 1
              }
            ],
            misconceptionDiagnosisEn: 'Thinking ink is fine or not realising the sample washes into the beaker if submerged.',
            misconceptionDiagnosisMn: 'Үзэгний бэх уусдаг болохыг тооцоогүй эсвэл дээж усанд живбэл цаас руу өгсөхгүйг мартсан.',
            remediationTopicId: 'top-21-1'
          }
        ]
      }
    ]
  }
];

// The full 0620 syllabus, 12 chapters: the original topics re-numbered, plus every sub-topic
// from the syllabus content files (1.1–12.5)
const BUILT_CHAPTERS = buildCurriculum(BASE_CHAPTERS, [
  ...TOPICS_A,
  ...TOPICS_B,
  ...TOPICS_C,
  ...TOPICS_D
]);

// Attach the worked examples from the revision deck to the topic with the same syllabus reference
export const CURRICULUM_CHAPTERS: Chapter[] = BUILT_CHAPTERS.map(ch => ({
  ...ch,
  topics: ch.topics.map(t => ({ ...t, workedExamples: DECK_EXAMPLES[t.number] }))
}));

export const INITIAL_LEITNER_CARDS: LeitnerCard[] = [
  {
    id: 'lc-1',
    termEn: 'Diffusion',
    termMn: 'Диффуз',
    definitionEn: 'Net movement of particles from high to low concentration down a concentration gradient.',
    definitionMn: 'Бөөмсийн эмх замбараагүй хөдөлгөөнөөр өндөр концентрацитай хэсгээс бага концентрацитай хэсэг рүү чиглэсэн шилжилт.',
    phonetic: '/dɪˈfjuːʒn/',
    topicId: 'top-1-1',
    syllabusRef: '0620/1.1',
    box: 1,
    lastReviewDate: Date.now() - 86400000 * 2,
    nextReviewDate: Date.now()
  },
  {
    id: 'lc-2',
    termEn: 'Electrolyte',
    termMn: 'Электролит',
    definitionEn: 'Molten or aqueous ionic compound with mobile ions that conducts electricity.',
    definitionMn: 'Чөлөөт хөдөлгөөнт ионуудтай, цахилгаан гүйдэл дамжуулдаг хайлмал эсвэл уусмал.',
    phonetic: '/ɪˈlektrəlaɪt/',
    topicId: 'top-4-1',
    syllabusRef: '0620/4.1',
    box: 1,
    lastReviewDate: Date.now() - 86400000,
    nextReviewDate: Date.now()
  },
  {
    id: 'lc-3',
    termEn: 'Giant Ionic Lattice',
    termMn: 'Аварга ионы оронт тор',
    definitionEn: '3D arrangement of alternating positive and negative ions held by strong electrostatic attractions.',
    definitionMn: 'Эсрэг цэнэгтэй ионууд цахилгаан таталцлын хүчээр бат бөх холбогдсон 3 хэмжээст тогтмол бүтэц.',
    phonetic: '/ˈdʒaɪənt aɪˈɒnɪk ˈlætɪs/',
    topicId: 'top-2-1',
    syllabusRef: '0620/2.3',
    box: 2,
    lastReviewDate: Date.now() - 86400000 * 3,
    nextReviewDate: Date.now()
  },
  {
    id: 'lc-4',
    termEn: 'Concordant Titres',
    termMn: 'Зөрүүгүй титрүүд',
    definitionEn: 'Burette reading volumes within ±0.10 cm³ of each other in repeated titration trials.',
    definitionMn: 'Давтан хийсэн титрлэлтүүдийн бюреткийн заалт бие биенээсээ ±0.10 см³-ийн дотор тохирсон үр дүнгүүд.',
    phonetic: '/kənˈkɔːdənt ˈtaɪtəz/',
    topicId: 'top-7-1',
    syllabusRef: '0620/7.2',
    box: 3,
    lastReviewDate: Date.now() - 86400000 * 5,
    nextReviewDate: Date.now()
  }
];
