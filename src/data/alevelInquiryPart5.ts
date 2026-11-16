import type { AlevelInquiryPlan } from './alevelInquiryTypes';

// The 40-minute inquiry lessons of the A Level 9701 chapters (syllabus topics 23–37), one chapter at a time, written for this
// course from the syllabus learning outcomes (2025–2027). Each has the prediction question, a test with one changed variable,
// the explanation with a three-question quick check, an exam-style structured question, practice by difficulty and a
// five-question exit ticket. The E⦵ values are those of the 9701 data booklet.

export const ALEVEL_INQUIRY_PART5: Record<string, AlevelInquiryPlan> = {
  // Topic 24: electrolysis (24.1) and electrode potentials, cell potentials and the Nernst equation (24.2)
  'al-ch-24': {
    question: {
      mn: 'Zn–Cu элементийн хүчдэл стандарт нөхцөлд 1.10 V. Зэсийн хагас элемент дэх Cu²⁺-ийн концентрацийг 100 дахин шингэлбэл хүчдэл ихсэх үү, багасах уу, яагаад?',
      en: 'A Zn–Cu cell gives 1.10 V under standard conditions. If the Cu²⁺ in the copper half-cell is diluted 100 times, does the voltage rise or fall, and why?'
    },
    independent: { mn: 'Зэсийн хагас элемент дэх Cu²⁺-ийн концентраци: 1.0, 0.10, 0.010 моль дм⁻³', en: 'The concentration of Cu²⁺ in the copper half-cell: 1.0, 0.10 and 0.010 mol dm⁻³' },
    dependent: { mn: 'Өндөр эсэргүүцэлтэй вольтметрээр хэмжсэн элементийн хүчдэл (V)', en: 'The cell voltage measured with a high-resistance voltmeter (V)' },
    controlled: {
      mn: 'Zn²⁺ 1.0 моль дм⁻³, 298 K, ижил цайр ба зэс электрод, ижил давсны гүүр (KNO₃), гүйдэл бараг гүйхгүй',
      en: 'Zn²⁺ at 1.0 mol dm⁻³, 298 K, the same zinc and copper electrodes, the same salt bridge (KNO₃), almost no current drawn'
    },
    limitation: {
      mn: 'E⦵ ба Нернстийн тэгшитгэл урвал явагдах боломжтой эсэхийг л заана, хурдыг заахгүй: боломжтой урвал маш удаан байж болно. Гүйдэл гүйх үед элементийн дотоод эсэргүүцлээс болж хэмжсэн хүчдэл тооцоолсноос бага гарна.',
      en: 'E⦵ values and the Nernst equation say only whether a reaction is feasible, not how fast it goes: a feasible reaction can be very slow. When a current flows, the cell’s internal resistance makes the measured voltage lower than the calculated one.'
    },
    keyPoints: [
      {
        mn: 'Стандарт электродын потенциал E⦵ нь хагас элементийг стандарт устөрөгчийн электродтой (H₂ 100 kPa, H⁺ 1.00 моль дм⁻³, 298 K, Pt электрод, E⦵ = 0.00 V) давсны гүүр ба өндөр эсэргүүцэлтэй вольтметрээр холбож хэмжсэн потенциал. Нэг элементийн хоёр ион (Fe³⁺/Fe²⁺) бол хоёулаа 1.00 моль дм⁻³ уусмалд Pt электрод хийнэ.',
        en: 'The standard electrode potential E⦵ is the potential of a half-cell measured against the standard hydrogen electrode (H₂ at 100 kPa, H⁺ at 1.00 mol dm⁻³, 298 K, Pt electrode, E⦵ = 0.00 V), joined by a salt bridge and read on a high-resistance voltmeter. For two ions of one element (Fe³⁺/Fe²⁺), a Pt electrode dips into a solution of both at 1.00 mol dm⁻³.'
      },
      {
        mn: 'E⦵cell = E⦵(эерэг электрод) − E⦵(сөрөг электрод). E⦵ нь илүү сөрөг хагас элемент сөрөг туйл болж, гаднах хэлхээгээр электрон түүнээс илүү эерэг электрод руу урсана.',
        en: 'E⦵cell = E⦵(positive electrode) − E⦵(negative electrode). The half-cell with the more negative E⦵ is the negative pole, and electrons flow from it through the external circuit to the more positive electrode.'
      },
      {
        mn: 'E⦵ илүү эерэг бол зүүн талын бодис илүү хүчтэй исэлдүүлэгч (Cl₂ > Br₂ > I₂); илүү сөрөг бол баруун талын бодис илүү хүчтэй ангижруулагч (Mg > Zn). E⦵cell эерэг бол урвал явагдах боломжтой. Редокс тэгшитгэлийг хоёр хагас тэгшитгэлийн электроны тоог тэнцүүлж нэмж бичнэ.',
        en: 'The more positive the E⦵, the stronger the species on the left as an oxidising agent (Cl₂ > Br₂ > I₂); the more negative, the stronger the species on the right as a reducing agent (Mg > Zn). A reaction is feasible when E⦵cell is positive. A redox equation is built by balancing the electrons of two half-equations and adding them.'
      },
      {
        mn: 'Нернстийн тэгшитгэл: E = E⦵ + (0.059/z) log([исэлдсэн хэлбэр]/[ангижирсан хэлбэр]). Cu²⁺-ийг 0.010 моль дм⁻³ болговол E = 0.34 + 0.0295 × (−2) = 0.28 V болж, Zn–Cu элементийн хүчдэл 1.10-аас 1.04 V болж буурна. ΔG⦵ = −nE⦵cellF: E⦵cell эерэг бол ΔG⦵ сөрөг.',
        en: 'The Nernst equation: E = E⦵ + (0.059/z) log([oxidised form]/[reduced form]). With Cu²⁺ at 0.010 mol dm⁻³, E = 0.34 + 0.0295 × (−2) = 0.28 V, so the Zn–Cu cell falls from 1.10 to 1.04 V. ΔG⦵ = −nE⦵cellF: a positive E⦵cell means a negative ΔG⦵.'
      },
      {
        mn: 'Электролиз: Q = It; F = Le = 96 500 Кл моль⁻¹, электроны моль = Q ÷ F. Бүтээгдэхүүн нь электролитийн төлөв, E⦵ ба концентрацаас хамаарна: NaCl-ийн төвлөрсөн уусмалаас анод дээр Cl₂, шингэн уусмалаас O₂ ялгарна. CuSO₄-ийг зэс электродоор электролиз хийж, катодын масс ба цэнэгээс Авогадрогийн тогтмол L = F ÷ e-г олж болно.',
        en: 'Electrolysis: Q = It; F = Le = 96 500 C mol⁻¹, and moles of electrons = Q ÷ F. The products depend on the state of the electrolyte, E⦵ and concentration: concentrated aqueous NaCl gives Cl₂ at the anode, dilute gives O₂. Electrolysing CuSO₄ with copper electrodes, the cathode’s gain in mass and the charge passed give the Avogadro constant, L = F ÷ e.'
      }
    ],
    quick: [
      {
        question: { mn: 'Стандарт устөрөгчийн электродын E⦵ хэд вэ?', en: 'What is E⦵ of the standard hydrogen electrode?' },
        options: [
          { mn: '+1.00 V', en: '+1.00 V' },
          { mn: '0.00 V', en: '0.00 V' },
          { mn: '−0.76 V', en: '−0.76 V' },
          { mn: '+0.34 V', en: '+0.34 V' }
        ],
        answer: 1,
        explanation: { mn: 'Бусад бүх E⦵-г хэмждэг эталон тул 0.00 V гэж тогтоосон.', en: 'It is the reference every other E⦵ is measured against, so it is defined as 0.00 V.' }
      },
      {
        question: {
          mn: 'Cl₂/Cl⁻ E⦵ = +1.36 V, Br₂/Br⁻ E⦵ = +1.07 V. Аль нь илүү хүчтэй исэлдүүлэгч вэ?',
          en: 'Cl₂/Cl⁻ E⦵ = +1.36 V and Br₂/Br⁻ E⦵ = +1.07 V. Which is the stronger oxidising agent?'
        },
        options: [
          { mn: 'Cl₂', en: 'Cl₂' },
          { mn: 'Br₂', en: 'Br₂' },
          { mn: 'Cl⁻', en: 'Cl⁻' },
          { mn: 'Br⁻', en: 'Br⁻' }
        ],
        answer: 0,
        explanation: { mn: 'E⦵ илүү эерэг хагас урвалын зүүн талын бодис электроныг илүү хүчтэй татна.', en: 'The species on the left of the half-equation with the more positive E⦵ pulls electrons in more strongly.' }
      },
      {
        question: { mn: 'Энгийн элементэд гаднах хэлхээгээр электрон аль чиглэлд урсах вэ?', en: 'In a simple cell, which way do electrons flow in the external circuit?' },
        options: [
          { mn: 'E⦵ илүү эерэг электродоос илүү сөрөг рүү', en: 'From the more positive E⦵ electrode to the more negative' },
          { mn: 'E⦵ илүү сөрөг электродоос илүү эерэг рүү', en: 'From the more negative E⦵ electrode to the more positive' },
          { mn: 'Давсны гүүрээр', en: 'Through the salt bridge' },
          { mn: 'Хоёр тийш ээлжлэн', en: 'Both ways in turn' }
        ],
        answer: 1,
        explanation: {
          mn: 'Илүү сөрөг электрод исэлдэж электрон алдана, тэр электрон утсаар эерэг электрод руу явна. Давсны гүүрээр электрон биш ион хөдөлнө.',
          en: 'The more negative electrode is oxidised and loses electrons, which travel along the wire to the positive electrode. Ions, not electrons, move through the salt bridge.'
        }
      }
    ],
    glossary: [
      {
        term: { mn: 'Нернстийн тэгшитгэл', en: 'Nernst equation' },
        def: { mn: 'E = E⦵ + (0.059/z) log([исэлдсэн]/[ангижирсан]); стандарт бус концентрацийн электродын потенциалыг өгнө.', en: 'E = E⦵ + (0.059/z) log([oxidised]/[reduced]), which gives the electrode potential at non-standard concentrations.' }
      },
      {
        term: { mn: 'Исэлдүүлэгч', en: 'Oxidising agent' },
        def: { mn: 'Өөр бодисоос электрон авч, өөрөө ангижрах бодис; E⦵ илүү эерэг бол илүү хүчтэй.', en: 'A species that takes electrons from another and is itself reduced; the more positive its E⦵, the stronger it is.' }
      },
      {
        term: { mn: 'Электролиз', en: 'Electrolysis' },
        def: { mn: 'Хайлмал эсвэл уусмал электролитоор тогтмол гүйдэл гүйлгэж задлах үйл явц.', en: 'The breaking down of a molten or aqueous electrolyte by passing a direct current through it.' }
      }
    ],
    structured: {
      prompt: {
        mn: 'Zn²⁺/Zn (E⦵ = −0.76 V) ба Cu²⁺/Cu (E⦵ = +0.34 V) хагас элементээс элемент бүтээв. (а) E⦵cell-ийг тооцоол. (б) Гаднах хэлхээнд электрон аль чиглэлд урсахыг хэл. (в) Зэсийн хагас элемент дэх [Cu²⁺]-ийг багасгавал элементийн хүчдэл юу болохыг тайлбарла.',
        en: 'A cell is built from Zn²⁺/Zn (E⦵ = −0.76 V) and Cu²⁺/Cu (E⦵ = +0.34 V) half-cells. (a) Calculate E⦵cell. (b) State the direction of electron flow in the external circuit. (c) Explain what happens to the cell voltage when [Cu²⁺] in the copper half-cell is lowered.'
      },
      marks: [
        { mn: 'E⦵cell = +0.34 − (−0.76) = +1.10 V (1)', en: 'E⦵cell = +0.34 − (−0.76) = +1.10 V (1)' },
        { mn: 'Электрон цайраас зэс рүү гаднах хэлхээгээр урсана (1)', en: 'Electrons flow from the zinc to the copper through the external circuit (1)' },
        {
          mn: '[Cu²⁺] багасвал Cu²⁺ + 2e⁻ ⇌ Cu тэнцвэр зүүн тийш шилжиж, E(Cu²⁺/Cu) бага эерэг болно (эсвэл Нернстийн тэгшитгэлээр) (1)',
          en: 'Lower [Cu²⁺] moves Cu²⁺ + 2e⁻ ⇌ Cu to the left, so E(Cu²⁺/Cu) becomes less positive (or by the Nernst equation) (1)'
        },
        { mn: 'Тиймээс элементийн хүчдэл буурна (1)', en: 'So the cell voltage decreases (1)' }
      ],
      total: 4
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Стандарт устөрөгчийн электродын нөхцөл аль нь вэ?', en: 'Which are the conditions of the standard hydrogen electrode?' },
        options: [
          { mn: '273 K, 100 kPa H₂, H⁺ 1.00 моль дм⁻³, Cu электрод', en: '273 K, H₂ at 100 kPa, H⁺ at 1.00 mol dm⁻³, Cu electrode' },
          { mn: '298 K, 100 kPa H₂, H⁺ 1.00 моль дм⁻³, Pt электрод', en: '298 K, H₂ at 100 kPa, H⁺ at 1.00 mol dm⁻³, Pt electrode' },
          { mn: '298 K, 100 kPa H₂, H⁺ 0.10 моль дм⁻³, Pt электрод', en: '298 K, H₂ at 100 kPa, H⁺ at 0.10 mol dm⁻³, Pt electrode' },
          { mn: '373 K, 200 kPa H₂, H⁺ 1.00 моль дм⁻³, Pt электрод', en: '373 K, H₂ at 200 kPa, H⁺ at 1.00 mol dm⁻³, Pt electrode' }
        ],
        answer: 1,
        explanation: { mn: 'Стандарт нөхцөл: 298 K, 100 kPa, 1.00 моль дм⁻³; урвалд ордоггүй Pt электрод.', en: 'Standard conditions are 298 K, 100 kPa and 1.00 mol dm⁻³, with an inert Pt electrode.' }
      },
      {
        level: 'medium',
        prompt: {
          mn: 'Ag⁺/Ag (E⦵ = +0.80 V) ба Fe²⁺/Fe (E⦵ = −0.44 V) хагас элементийн E⦵cell хэд вэ?',
          en: 'What is E⦵cell for the Ag⁺/Ag (E⦵ = +0.80 V) and Fe²⁺/Fe (E⦵ = −0.44 V) half-cells?'
        },
        options: [
          { mn: '0.36 V', en: '0.36 V' },
          { mn: '1.24 V', en: '1.24 V' },
          { mn: '2.04 V', en: '2.04 V' },
          { mn: '−1.24 V', en: '−1.24 V' }
        ],
        answer: 1,
        explanation: {
          mn: 'E⦵cell = +0.80 − (−0.44) = +1.24 V. Тэгшитгэлд мөнгө 2 дахин орсон ч E⦵-г 2-оор үржүүлэхгүй (2.04 гэх алдаа).',
          en: 'E⦵cell = +0.80 − (−0.44) = +1.24 V. Silver appears twice in the equation, but E⦵ is never multiplied by 2 (the 2.04 error).'
        }
      },
      {
        level: 'hard',
        prompt: {
          mn: 'CuSO₄-ийн уусмалаар 0.50 A гүйдлийг 30 минут гүйлгэв. Катод дээр хэдэн грамм зэс ялгарахыг тооцоол (Ar Cu = 63.5, F = 96 500 Кл моль⁻¹).',
          en: 'A current of 0.50 A passes through aqueous CuSO₄ for 30 minutes. Calculate the mass of copper deposited at the cathode (Ar Cu = 63.5, F = 96 500 C mol⁻¹).'
        },
        model: {
          mn: 'Q = It = 0.50 × 1800 = 900 Кл. Электроны моль = 900 ÷ 96 500 = 9.33 × 10⁻³. Cu²⁺ + 2e⁻ → Cu тул Cu-ийн моль = 4.66 × 10⁻³. Масс = 4.66 × 10⁻³ × 63.5 = 0.30 г.',
          en: 'Q = It = 0.50 × 1800 = 900 C. Moles of electrons = 900 ÷ 96 500 = 9.33 × 10⁻³. Cu²⁺ + 2e⁻ → Cu, so moles of Cu = 4.66 × 10⁻³. Mass = 4.66 × 10⁻³ × 63.5 = 0.30 g.'
        },
        explanation: {
          mn: 'Хугацааг секунд болгож, нэг Cu-д 2 электрон хэрэгтэйг мартахгүй байх нь гол.',
          en: 'The key steps: turn the time into seconds, and remember that each Cu needs 2 electrons.'
        }
      }
    ],
    exit: [
      {
        question: {
          mn: 'Mg²⁺/Mg (E⦵ = −2.38 V) ба Cu²⁺/Cu (E⦵ = +0.34 V) элементийн E⦵cell хэд вэ?',
          en: 'What is E⦵cell for a cell made of Mg²⁺/Mg (E⦵ = −2.38 V) and Cu²⁺/Cu (E⦵ = +0.34 V)?'
        },
        options: [
          { mn: '2.04 V', en: '2.04 V' },
          { mn: '2.72 V', en: '2.72 V' },
          { mn: '−2.72 V', en: '−2.72 V' },
          { mn: '3.06 V', en: '3.06 V' }
        ],
        answer: 1,
        explanation: { mn: 'E⦵cell = +0.34 − (−2.38) = +2.72 V.', en: 'E⦵cell = +0.34 − (−2.38) = +2.72 V.' }
      },
      {
        question: {
          mn: 'Fe³⁺/Fe²⁺ E⦵ = +0.77 V, I₂/I⁻ E⦵ = +0.54 V. Fe³⁺ нь I⁻-ийг I₂ болгон исэлдүүлэх боломжтой юу?',
          en: 'Fe³⁺/Fe²⁺ E⦵ = +0.77 V and I₂/I⁻ E⦵ = +0.54 V. Can Fe³⁺ oxidise I⁻ to I₂?'
        },
        options: [
          { mn: 'Тийм, E⦵cell = +0.23 V', en: 'Yes, E⦵cell = +0.23 V' },
          { mn: 'Үгүй, E⦵cell = −0.23 V', en: 'No, E⦵cell = −0.23 V' },
          { mn: 'Тийм, E⦵cell = +1.31 V', en: 'Yes, E⦵cell = +1.31 V' },
          { mn: 'Хэлж болохгүй', en: 'It cannot be told' }
        ],
        answer: 0,
        explanation: {
          mn: 'Fe³⁺ ангижирна (эерэг тал), I⁻ исэлдэнэ: E⦵cell = 0.77 − 0.54 = +0.23 V, эерэг тул боломжтой. 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂.',
          en: 'Fe³⁺ is reduced (the positive side) and I⁻ is oxidised: E⦵cell = 0.77 − 0.54 = +0.23 V, positive, so it is feasible. 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂.'
        }
      },
      {
        question: {
          mn: 'Нернстийн тэгшитгэлээр 0.010 моль дм⁻³ Cu²⁺ дахь Cu²⁺/Cu-ийн E-г ол (E⦵ = +0.34 V).',
          en: 'Use the Nernst equation to find E for Cu²⁺/Cu with Cu²⁺ at 0.010 mol dm⁻³ (E⦵ = +0.34 V).'
        },
        options: [
          { mn: '+0.40 V', en: '+0.40 V' },
          { mn: '+0.34 V', en: '+0.34 V' },
          { mn: '+0.28 V', en: '+0.28 V' },
          { mn: '+0.22 V', en: '+0.22 V' }
        ],
        answer: 2,
        explanation: {
          mn: 'E = 0.34 + (0.059/2) log 0.010 = 0.34 + 0.0295 × (−2) = +0.28 V. z = 2-ыг мартвал 0.22 гарна.',
          en: 'E = 0.34 + (0.059/2) log 0.010 = 0.34 + 0.0295 × (−2) = +0.28 V. Forgetting z = 2 gives 0.22.'
        }
      },
      {
        question: {
          mn: 'n = 2, E⦵cell = +1.10 V элементийн ΔG⦵ хэд вэ? (F = 96 500 Кл моль⁻¹)',
          en: 'What is ΔG⦵ for a cell with n = 2 and E⦵cell = +1.10 V? (F = 96 500 C mol⁻¹)'
        },
        options: [
          { mn: '−212 кЖ моль⁻¹', en: '−212 kJ mol⁻¹' },
          { mn: '+212 кЖ моль⁻¹', en: '+212 kJ mol⁻¹' },
          { mn: '−106 кЖ моль⁻¹', en: '−106 kJ mol⁻¹' },
          { mn: '−21.2 кЖ моль⁻¹', en: '−21.2 kJ mol⁻¹' }
        ],
        answer: 0,
        explanation: {
          mn: 'ΔG⦵ = −nE⦵cellF = −2 × 1.10 × 96 500 = −212 300 Ж моль⁻¹ ≈ −212 кЖ моль⁻¹; сөрөг тул урвал боломжтой.',
          en: 'ΔG⦵ = −nE⦵cellF = −2 × 1.10 × 96 500 = −212 300 J mol⁻¹ ≈ −212 kJ mol⁻¹; negative, so the reaction is feasible.'
        }
      },
      {
        question: {
          mn: 'NaCl-ийн төвлөрсөн уусмалыг инертэн электродоор электролиз хийхэд анод дээр юу ялгарах вэ?',
          en: 'In the electrolysis of concentrated aqueous NaCl with inert electrodes, what is given off at the anode?'
        },
        options: [
          { mn: 'O₂', en: 'O₂' },
          { mn: 'Cl₂', en: 'Cl₂' },
          { mn: 'H₂', en: 'H₂' },
          { mn: 'Na', en: 'Na' }
        ],
        answer: 1,
        explanation: {
          mn: 'Cl⁻-ийн концентраци их тул E⦵-ийн дагуу хүлээгдэх O₂-ийн оронд Cl₂ ялгарна; шингэн уусмалд O₂ давамгайлна.',
          en: 'The high concentration of Cl⁻ means Cl₂ is given off rather than the O₂ that E⦵ alone would predict; in dilute solution O₂ wins.'
        }
      }
    ]
  },

  // Topic 25: acids and bases, buffers and the solubility product (25.1), and partition coefficients (25.2)
  'al-ch-25': {
    question: {
      mn: '50 см³ цэвэр усанд 1.0 моль дм⁻³ HCl-ийн 5 дусал нэмэхэд pH 7-оос 3 орчим болж унадаг. Харин этаны хүчил ба натрийн этаноатын холимогт ижил дусал нэмэхэд pH бараг өөрчлөгддөггүй. Яагаад?',
      en: 'Five drops of 1.0 mol dm⁻³ HCl added to 50 cm³ of pure water drop its pH from 7 to about 3. The same drops added to a mixture of ethanoic acid and sodium ethanoate hardly change its pH. Why?'
    },
    independent: {
      mn: 'Уусмал: цэвэр ус эсвэл буфер (CH₃COOH ба CH₃COONa тус бүр 0.10 моль дм⁻³), мөн нэмсэн HCl эсвэл NaOH-ийн дуслын тоо',
      en: 'The solution: pure water or a buffer (CH₃COOH and CH₃COONa, each 0.10 mol dm⁻³), and the number of drops of HCl or NaOH added'
    },
    dependent: { mn: 'Тохируулсан pH метрээр хэмжсэн pH', en: 'The pH read on a calibrated pH meter' },
    controlled: {
      mn: 'Уусмалын эзэлхүүн 50 см³, HCl ба NaOH 1.0 моль дм⁻³, 298 K, дусал бүрийн дараа хутгах',
      en: 'The volume of solution (50 cm³), HCl and NaOH at 1.0 mol dm⁻³, 298 K, stirring after each drop'
    },
    limitation: {
      mn: 'Буфер зөвхөн бага хэмжээний хүчил, шүлтийг эсэргүүцнэ: HA эсвэл A⁻ дуусвал pH огцом өөрчлөгдөнө. Сул хүчлийн [H⁺] ≈ √(Ka c) нь задрал бага, усны өөрийн H⁺-ийг тооцохгүй гэсэн ойролцоолол бөгөөд бүх тооцоо 298 K-д хамаарна.',
      en: 'A buffer resists only small amounts of acid or alkali: once the HA or the A⁻ runs out, the pH changes sharply. [H⁺] ≈ √(Ka c) for a weak acid assumes little dissociation and ignores water’s own H⁺, and every value here holds at 298 K.'
    },
    keyPoints: [
      {
        mn: 'Бронстед–Лоуригийн хүчил H⁺ өгнө, суурь H⁺ авна. Хосмог хос нэг H⁺-ээр ялгаатай: CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺ урвалд CH₃COOH/CH₃COO⁻ ба H₃O⁺/H₂O хоёр хосмог хос байна.',
        en: 'A Brønsted–Lowry acid gives H⁺ and a base takes it. A conjugate pair differs by one H⁺: in CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺, the pairs are CH₃COOH/CH₃COO⁻ and H₃O⁺/H₂O.'
      },
      {
        mn: 'pH = −log[H⁺]; Kw = [H⁺][OH⁻] = 1.00 × 10⁻¹⁴ моль² дм⁻⁶ (298 K). Хүчтэй хүчил: [H⁺] = c (0.010 HCl → pH 2.00). Хүчтэй шүлт: [H⁺] = Kw ÷ [OH⁻] (0.010 NaOH → pH 12.00). Сул хүчил: Ka = [H⁺][A⁻] ÷ [HA], [H⁺] ≈ √(Ka c), pKa = −log Ka (0.10 CH₃COOH, Ka = 1.7 × 10⁻⁵ → pH 2.88).',
        en: 'pH = −log[H⁺]; Kw = [H⁺][OH⁻] = 1.00 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K. Strong acid: [H⁺] = c (0.010 HCl → pH 2.00). Strong alkali: [H⁺] = Kw ÷ [OH⁻] (0.010 NaOH → pH 12.00). Weak acid: Ka = [H⁺][A⁻] ÷ [HA], [H⁺] ≈ √(Ka c), pKa = −log Ka (0.10 CH₃COOH with Ka = 1.7 × 10⁻⁵ → pH 2.88).'
      },
      {
        mn: 'Буфер = сул хүчил ба түүний хосмог суурийн давс (эсвэл сул суурь ба түүний давс). Нэмсэн H⁺: CH₃COO⁻ + H⁺ → CH₃COOH; нэмсэн OH⁻: CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O. HA ба A⁻ их нөөцтэй тул харьцаа бараг өөрчлөгдөхгүй: [H⁺] = Ka × [HA] ÷ [A⁻]. Цусанд HCO₃⁻ нэмэгдсэн H⁺-ийг H₂CO₃ болгож, pH-ийг 7.4 орчим барина.',
        en: 'A buffer is a weak acid with a salt of its conjugate base (or a weak base with its salt). Added H⁺: CH₃COO⁻ + H⁺ → CH₃COOH; added OH⁻: CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O. With large amounts of HA and A⁻ their ratio barely changes: [H⁺] = Ka × [HA] ÷ [A⁻]. In blood, HCO₃⁻ turns added H⁺ into H₂CO₃ and keeps the pH near 7.4.'
      },
      {
        mn: 'Уусах чанарын үржвэр: бага уусдаг давсны ханасан уусмалд Ksp = [Mⁿ⁺]ˣ[Xᵐ⁻]ʸ, жишээ нь CaF₂: Ksp = [Ca²⁺][F⁻]². AgCl-ийн Ksp = 1.8 × 10⁻¹⁰ моль² дм⁻⁶: усанд s = √Ksp = 1.3 × 10⁻⁵ моль дм⁻³, харин 0.10 моль дм⁻³ NaCl-д нийтлэг ион Cl⁻-ээс болж s = 1.8 × 10⁻⁹ моль дм⁻³ болж буурна.',
        en: 'Solubility product: in a saturated solution of a sparingly soluble salt, Ksp = [Mⁿ⁺]ˣ[Xᵐ⁻]ʸ, for example CaF₂: Ksp = [Ca²⁺][F⁻]². For AgCl, Ksp = 1.8 × 10⁻¹⁰ mol² dm⁻⁶: in water s = √Ksp = 1.3 × 10⁻⁵ mol dm⁻³, but in 0.10 mol dm⁻³ NaCl the common ion Cl⁻ lowers it to s = 1.8 × 10⁻⁹ mol dm⁻³.'
      },
      {
        mn: 'Тархалтын коэффициент: тэнцвэрт Kpc = [X уусгагч 1-д] ÷ [X уусгагч 2-т], X хоёр уусгагчид ижил төлөвтэй. Туйлгүй I₂ туйлгүй гександ илүү уусдаг тул гексан/усны Kpc их (жишээ нь 85).',
        en: 'Partition coefficient: at equilibrium Kpc = [X in solvent 1] ÷ [X in solvent 2], with X in the same state in both. Non-polar I₂ dissolves better in non-polar hexane, so its hexane/water Kpc is large (for example 85).'
      }
    ],
    quick: [
      {
        question: { mn: 'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ урвалд NH₃-ийн хосмог хүчил аль нь вэ?', en: 'In NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, what is the conjugate acid of NH₃?' },
        options: [
          { mn: 'NH₄⁺', en: 'NH₄⁺' },
          { mn: 'OH⁻', en: 'OH⁻' },
          { mn: 'H₂O', en: 'H₂O' },
          { mn: 'NH₂⁻', en: 'NH₂⁻' }
        ],
        answer: 0,
        explanation: { mn: 'NH₃ H⁺ авч NH₄⁺ болно; тэдгээр нэг H⁺-ээр ялгаатай хосмог хос.', en: 'NH₃ takes H⁺ to become NH₄⁺; they differ by one H⁺, a conjugate pair.' }
      },
      {
        question: { mn: '0.010 моль дм⁻³ HCl-ийн pH хэд вэ?', en: 'What is the pH of 0.010 mol dm⁻³ HCl?' },
        options: [
          { mn: '1.00', en: '1.00' },
          { mn: '2.00', en: '2.00' },
          { mn: '12.00', en: '12.00' },
          { mn: '0.010', en: '0.010' }
        ],
        answer: 1,
        explanation: { mn: 'Хүчтэй хүчил бүрэн задарна: [H⁺] = 0.010, pH = −log 0.010 = 2.00.', en: 'A strong acid dissociates fully: [H⁺] = 0.010, pH = −log 0.010 = 2.00.' }
      },
      {
        question: { mn: 'Буферийн уусмалыг юунаас бэлтгэх вэ?', en: 'Which makes a buffer solution?' },
        options: [
          { mn: 'Хүчтэй хүчил ба түүний давс', en: 'A strong acid and its salt' },
          { mn: 'Сул хүчил ба түүний хосмог суурийн давс', en: 'A weak acid and a salt of its conjugate base' },
          { mn: 'Хүчтэй хүчил ба хүчтэй шүлт', en: 'A strong acid and a strong alkali' },
          { mn: 'Зөвхөн цэвэр ус', en: 'Pure water alone' }
        ],
        answer: 1,
        explanation: {
          mn: 'Сул хүчил (HA) нэмэгдсэн OH⁻-ийг, хосмог суурь (A⁻) нэмэгдсэн H⁺-ийг саармагжуулна.',
          en: 'The weak acid (HA) removes added OH⁻ and the conjugate base (A⁻) removes added H⁺.'
        }
      }
    ],
    glossary: [
      { term: { mn: 'Хосмог суурь', en: 'Conjugate base' }, def: { mn: 'Хүчил H⁺ өгсний дараа үлдэх бөөм, жишээ нь CH₃COOH-ийн хосмог суурь CH₃COO⁻.', en: 'The species left when an acid has given H⁺, for example CH₃COO⁻ from CH₃COOH.' } },
      { term: { mn: 'Хүчтэй хүчил', en: 'Strong acid' }, def: { mn: 'Усан уусмалд бүрэн задардаг хүчил, жишээ нь HCl.', en: 'An acid that dissociates fully in aqueous solution, for example HCl.' } },
      { term: { mn: 'Тархалтын коэффициент Kpc', en: 'Partition coefficient Kpc' }, def: { mn: 'Хоёр холилдохгүй уусгагчид тэнцвэрт байгаа бодисын концентрацийн харьцаа.', en: 'The ratio of the concentrations of a solute in two immiscible solvents at equilibrium.' } }
    ],
    structured: {
      prompt: {
        mn: 'Буфер нь этаны хүчил ба натрийн этаноат агуулна. (а) Нэмсэн H⁺ ба нэмсэн OH⁻-ийг хэрхэн саармагжуулахыг тэгшитгэлээр харуул. (б) [CH₃COOH] = 0.20, [CH₃COO⁻] = 0.10 моль дм⁻³ үеийн pH-ийг тооцоол (Ka = 1.7 × 10⁻⁵ моль дм⁻³).',
        en: 'A buffer contains ethanoic acid and sodium ethanoate. (a) Use equations to show how it removes added H⁺ and added OH⁻. (b) Calculate its pH when [CH₃COOH] = 0.20 and [CH₃COO⁻] = 0.10 mol dm⁻³ (Ka = 1.7 × 10⁻⁵ mol dm⁻³).'
      },
      marks: [
        { mn: 'CH₃COO⁻ + H⁺ → CH₃COOH (1)', en: 'CH₃COO⁻ + H⁺ → CH₃COOH (1)' },
        { mn: 'CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O (1)', en: 'CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O (1)' },
        { mn: '[H⁺] = Ka × [HA] ÷ [A⁻] = 1.7 × 10⁻⁵ × 0.20 ÷ 0.10 = 3.4 × 10⁻⁵ моль дм⁻³ (1)', en: '[H⁺] = Ka × [HA] ÷ [A⁻] = 1.7 × 10⁻⁵ × 0.20 ÷ 0.10 = 3.4 × 10⁻⁵ mol dm⁻³ (1)' },
        { mn: 'pH = −log(3.4 × 10⁻⁵) = 4.47 (1)', en: 'pH = −log(3.4 × 10⁻⁵) = 4.47 (1)' }
      ],
      total: 4
    },
    practice: [
      {
        level: 'easy',
        prompt: { mn: 'Аль нь хосмог хүчил–суурийн хос вэ?', en: 'Which is a conjugate acid–base pair?' },
        options: [
          { mn: 'HCl / Cl⁻', en: 'HCl / Cl⁻' },
          { mn: 'H₂SO₄ / SO₄²⁻', en: 'H₂SO₄ / SO₄²⁻' },
          { mn: 'NaOH / Na⁺', en: 'NaOH / Na⁺' },
          { mn: 'H₂O / O²⁻', en: 'H₂O / O²⁻' }
        ],
        answer: 0,
        explanation: {
          mn: 'Хосмог хос яг нэг H⁺-ээр ялгаатай. H₂SO₄/SO₄²⁻ ба H₂O/O²⁻ хоёр H⁺-ээр ялгаатай; NaOH/Na⁺ хосмог хос биш.',
          en: 'A conjugate pair differs by exactly one H⁺. H₂SO₄/SO₄²⁻ and H₂O/O²⁻ differ by two; NaOH/Na⁺ is not a conjugate pair.'
        }
      },
      {
        level: 'medium',
        prompt: { mn: '0.10 моль дм⁻³ этаны хүчлийн pH хэд вэ? (Ka = 1.7 × 10⁻⁵ моль дм⁻³)', en: 'What is the pH of 0.10 mol dm⁻³ ethanoic acid? (Ka = 1.7 × 10⁻⁵ mol dm⁻³)' },
        options: [
          { mn: '1.00', en: '1.00' },
          { mn: '2.88', en: '2.88' },
          { mn: '4.77', en: '4.77' },
          { mn: '5.77', en: '5.77' }
        ],
        answer: 1,
        explanation: {
          mn: '[H⁺] ≈ √(Ka c) = √(1.7 × 10⁻⁶) = 1.3 × 10⁻³, pH = 2.88. 1.00 гэвэл хүчтэй хүчил мэт бүрэн задарсан гэж тооцсон алдаа.',
          en: '[H⁺] ≈ √(Ka c) = √(1.7 × 10⁻⁶) = 1.3 × 10⁻³, pH = 2.88. 1.00 would treat it as fully dissociated, like a strong acid.'
        }
      },
      {
        level: 'hard',
        prompt: {
          mn: 'AgCl-ийн Ksp = 1.8 × 10⁻¹⁰ моль² дм⁻⁶ (298 K). Түүний уусах чанарыг усанд ба 0.10 моль дм⁻³ NaCl-д тооцоолж, ялгааг тайлбарла.',
          en: 'Ksp of AgCl is 1.8 × 10⁻¹⁰ mol² dm⁻⁶ at 298 K. Calculate its solubility in water and in 0.10 mol dm⁻³ NaCl, and explain the difference.'
        },
        model: {
          mn: 'Усанд: s² = 1.8 × 10⁻¹⁰, s = 1.3 × 10⁻⁵ моль дм⁻³. NaCl-д [Cl⁻] ≈ 0.10, s = 1.8 × 10⁻¹⁰ ÷ 0.10 = 1.8 × 10⁻⁹ моль дм⁻³. Нийтлэг ион Cl⁻ нь AgCl(s) ⇌ Ag⁺ + Cl⁻ тэнцвэрийг зүүн тийш шилжүүлж уусах чанарыг бууруулна.',
          en: 'In water: s² = 1.8 × 10⁻¹⁰, s = 1.3 × 10⁻⁵ mol dm⁻³. In NaCl, [Cl⁻] ≈ 0.10, so s = 1.8 × 10⁻¹⁰ ÷ 0.10 = 1.8 × 10⁻⁹ mol dm⁻³. The common ion Cl⁻ moves AgCl(s) ⇌ Ag⁺ + Cl⁻ to the left, lowering the solubility.'
        },
        explanation: {
          mn: 'NaCl-д Cl⁻-ийн концентрацийг 0.10 гэж авч болно, учир нь AgCl-ээс нэмэгдэх Cl⁻ хэт бага.',
          en: 'In NaCl the Cl⁻ concentration can be taken as 0.10, because the Cl⁻ added by AgCl is tiny.'
        }
      }
    ],
    exit: [
      {
        question: { mn: '298 K-д 0.010 моль дм⁻³ NaOH-ийн pH хэд вэ?', en: 'What is the pH of 0.010 mol dm⁻³ NaOH at 298 K?' },
        options: [
          { mn: '2.00', en: '2.00' },
          { mn: '12.00', en: '12.00' },
          { mn: '10.00', en: '10.00' },
          { mn: '14.00', en: '14.00' }
        ],
        answer: 1,
        explanation: { mn: '[H⁺] = Kw ÷ [OH⁻] = 1.00 × 10⁻¹⁴ ÷ 0.010 = 1.00 × 10⁻¹², pH = 12.00.', en: '[H⁺] = Kw ÷ [OH⁻] = 1.00 × 10⁻¹⁴ ÷ 0.010 = 1.00 × 10⁻¹², pH = 12.00.' }
      },
      {
        question: {
          mn: 'Этаны хүчил ба натрийн этаноат тус бүр 0.10 моль дм⁻³ буферийн pH хэд вэ? (Ka = 1.7 × 10⁻⁵ моль дм⁻³)',
          en: 'What is the pH of a buffer with ethanoic acid and sodium ethanoate each at 0.10 mol dm⁻³? (Ka = 1.7 × 10⁻⁵ mol dm⁻³)'
        },
        options: [
          { mn: '4.77', en: '4.77' },
          { mn: '2.88', en: '2.88' },
          { mn: '7.00', en: '7.00' },
          { mn: '9.23', en: '9.23' }
        ],
        answer: 0,
        explanation: { mn: '[HA] = [A⁻] тул [H⁺] = Ka, pH = pKa = −log(1.7 × 10⁻⁵) = 4.77.', en: 'With [HA] = [A⁻], [H⁺] = Ka, so pH = pKa = −log(1.7 × 10⁻⁵) = 4.77.' }
      },
      {
        question: { mn: 'CaF₂-ийн Ksp-ийн илэрхийлэл аль нь вэ?', en: 'Which is the Ksp expression for CaF₂?' },
        options: [
          { mn: '[Ca²⁺][F⁻]', en: '[Ca²⁺][F⁻]' },
          { mn: '[Ca²⁺][F⁻]²', en: '[Ca²⁺][F⁻]²' },
          { mn: '[Ca²⁺][2F⁻]', en: '[Ca²⁺][2F⁻]' },
          { mn: '[Ca²⁺]²[F⁻]', en: '[Ca²⁺]²[F⁻]' }
        ],
        answer: 1,
        explanation: { mn: 'CaF₂(s) ⇌ Ca²⁺ + 2F⁻; коэффициент 2 нь F⁻-ийн зэрэг болно.', en: 'CaF₂(s) ⇌ Ca²⁺ + 2F⁻; the 2 becomes the power on [F⁻].' }
      },
      {
        question: { mn: 'Цусанд HCO₃⁻ нэмэгдсэн H⁺-ийг хэрхэн саармагжуулах вэ?', en: 'How does HCO₃⁻ in blood remove added H⁺?' },
        options: [
          { mn: 'HCO₃⁻ + H⁺ → H₂CO₃', en: 'HCO₃⁻ + H⁺ → H₂CO₃' },
          { mn: 'HCO₃⁻ + OH⁻ → CO₃²⁻ + H₂O', en: 'HCO₃⁻ + OH⁻ → CO₃²⁻ + H₂O' },
          { mn: 'H₂CO₃ → 2H⁺ + CO₃²⁻', en: 'H₂CO₃ → 2H⁺ + CO₃²⁻' },
          { mn: 'HCO₃⁻ → H⁺ + CO₃²⁻', en: 'HCO₃⁻ → H⁺ + CO₃²⁻' }
        ],
        answer: 0,
        explanation: { mn: 'HCO₃⁻ хосмог суурийн үүргээр H⁺ авч H₂CO₃ болж, pH-ийг 7.4 орчим барина.', en: 'HCO₃⁻ acts as the conjugate base: it takes H⁺ to form H₂CO₃ and keeps the pH near 7.4.' }
      },
      {
        question: {
          mn: 'Гексан ба усыг иодтой сэгсрэв. Тэнцвэрт гексан дахь [I₂] = 0.085, ус дахь [I₂] = 0.0010 моль дм⁻³. Гексан/усны Kpc хэд вэ?',
          en: 'Hexane and water are shaken with iodine. At equilibrium [I₂] in hexane = 0.085 and in water = 0.0010 mol dm⁻³. What is the hexane/water Kpc?'
        },
        options: [
          { mn: '85', en: '85' },
          { mn: '0.012', en: '0.012' },
          { mn: '8.5', en: '8.5' },
          { mn: '850', en: '850' }
        ],
        answer: 0,
        explanation: { mn: 'Kpc = 0.085 ÷ 0.0010 = 85; туйлгүй I₂ туйлгүй гександ илүү уусна.', en: 'Kpc = 0.085 ÷ 0.0010 = 85; non-polar I₂ dissolves better in non-polar hexane.' }
      }
    ]
  }
};
