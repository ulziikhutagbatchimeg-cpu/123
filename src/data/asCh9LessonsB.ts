// AS 9701 chapter 9 (periodicity), lesson 3. It follows the deck 10_Ch10_Periodicity.pptx (slides 31–41): element
// detection from properties, the most-asked MCQs, exam-style questions, the summary and the exit ticket. Every answer
// here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'as9';

export const AS9_LESSONS_B: StatesLesson[] = [
  lesson(
    3,
    bi('Элемент таних, шалгалтын асуултууд ба дүгнэлт', 'Identifying elements, exam questions and the summary'),
    bi(
      'Элементийн шинжээс байрлалыг олох; оксид ба хлоридын шинжээр таних; шалгалтын асуултад тэгшитгэл, хүч, бөөмтэй бүтэн хариулт бичих (слайд 31–41).',
      'Locate an element from its properties, identify it from its oxides and chlorides, and write full exam answers with equations, forces and particles (slides 31–41).'
    ),
    [
      bi('Элементийг шинжээс нь таних: хлорид шингэн + цагаан утаа → ковалент (14–15 бүлэг); хлорид хатуу, усанд уусаад саармаг → ион (1 бүлэг); оксид хоёуланд урвана → амфотер (Al).', 'Identify an element from its properties: a liquid chloride with white fumes → covalent (Groups 14–15); a solid chloride that dissolves to a neutral solution → ionic (Group 1); an oxide that reacts with both acids and alkalis → amphoteric (Al).'),
      bi('Si: хамгийн өндөр хайлах цэг — аварга ковалент (олон хүчтэй ковалент холбоо); P: P₄ энгийн молекул, сул id–id тул бага хайлах цэг.', 'Si has the highest melting point: a giant covalent structure with many strong covalent bonds; P has a low melting point: P₄ simple molecules held by weak id–id forces.'),
      bi('Шалгалтын алдаа: "ковалент холбоо сул" ✗ → "молекул хоорондын хүч сул" ✓. "SiCl₄ уусдаг" ✗ → "гидролиз, HCl утаа" ✓.', 'Exam mistakes: "covalent bonds are weak" ✗ → "the intermolecular forces are weak" ✓. "SiCl₄ dissolves" ✗ → "it hydrolyses, giving HCl fumes" ✓.'),
      bi('Хамгийн их исэлдэлтийн зэрэг = гаднах электрон; S: SO₂ +4, SO₃ +6; PCl₅ +5; Al₂Cl₆-д Al +3.', 'The maximum oxidation number = outer electrons; S: SO₂ +4, SO₃ +6; PCl₅ +5; in Al₂Cl₆, Al is +3.'),
      bi('Бүтэн хариулт: тэгшитгэл + бөөм + хүч. Шалгагчийн тайлбар: "Use equations" — тэгшитгэлгүй бол оноо алдана.', 'A full answer has the equation, the particles and the force. Examiner’s note: "use equations" — without one you lose marks.')
    ],
    lessonSteps(
      [
        [
          bi('Элемент детектив', 'Element detective'),
          bi('Багаар: X, Y, Z … -ийн шинжээс элементийн бүлгийг (1, 2, 15 …) таана. Хариугаа самбарт бичээд дарна.', 'In teams: identify the group (1, 2, 15 …) of elements X, Y, Z … from their properties. Write the answer on a board, then click.'),
          bi('Баг бүр нэг элементийг таана; зөв бол оноо авна.', 'Each team identifies one element and scores a point for each correct answer.'),
          bi('Элементүүд зөв танигдсан эсэх.', 'Elements identified correctly.')
        ],
        [
          bi('Хинж асуулт ба шалгалтын зөвлөмж', 'Hinge questions and exam tips'),
          bi('3-2-1 хинж: амфотер оксид (Al₂O₃), цагаан утаа өгдөг хлорид (SiCl₄), Si-ийн өндөр хайлах цэг. Шалгалтын алдаа: "ковалент холбоо сул" ✗, "ИД-ийн хүч" ✓.', 'Hinges on 3-2-1: the amphoteric oxide (Al₂O₃), the chloride that gives white fumes (SiCl₄), the high melting point of Si. Exam mistakes: "covalent bonds are weak" ✗, "weak id–id forces between molecules" ✓.'),
          bi('A/B/C/D-г хуруугаар нэгэн зэрэг үзүүлнэ; буруу бол дахин тайлбарлана.', 'Show A/B/C/D together with your fingers; if wrong, explain again.'),
          bi('Хинжийн дүн 80%-иас дээш байх.', 'Hinge score above 80 %.')
        ],
        [
          bi('Олон удаа асуудаг MCQ', 'Most-asked MCQs'),
          bi('6 MCQ: радиус, ион, pH, исэлдэлтийн зэрэг, ионы хос, Mg(OH)₂ + HCl. 3-2-1-ээр.', '6 MCQs: radius, ions, pH, oxidation number, ionic pairs and Mg(OH)₂ + HCl. On 3-2-1.'),
          bi('Хариултаа хуруугаар заагаад нэг нэгээр шалгана.', 'Show your answer with your fingers and check each one.'),
          bi('Зөв хариу: 1 B, 2 C, 3 A, 4 D, 5 B, 6 C.', 'Correct answers: 1 B, 2 C, 3 A, 4 D, 5 B, 6 C.')
        ],
        [
          bi('Шалгалтын хэв маягийн асуулт', 'Exam-style questions'),
          bi('Үечилсэн шинжийг тодорхойлох [2]; IE графикийг таних, тайлбарлах [5]; Si ба P-ийн хайлах цэг [5]; Al ба Na-ийн хайлах цэг [4]; бүлгээр радиус [2]. Устай урвал [14] — тэгшитгэлтэй бүтэн хариулт.', 'Define a periodic property [2]; identify and explain the IE graph [5]; the melting points of Si and P [5]; of Al and Na [4]; radius down a group [2]. Compounds with water [14] — full answers with equations.'),
          bi('6 минут ганцаараа бичнэ; дараа нь хосоороо онооны схемээр засна.', 'Write alone for 6 minutes, then mark each other against the scheme.'),
          bi('Бүтэн хариулт: тэгшитгэл, хүч, бөөм бүгд орсон эсэх.', 'Full answers: equations, forces and particles all included.')
        ],
        [
          bi('Дүгнэлт, гарах билет, гэрийн даалгавар', 'Summary, exit ticket and homework'),
          bi('8 цэгийн дүгнэлт: радиус буурна; бүтэц; хайлах цэг; максимум исэлдэлт; оксид; pH; хлорид; тайлбар. Traffic-light гарах билет: Al₂O₃ (2 тэгшитгэл), SiCl₄ + ус. Гэрийн даалгавар: Q1–Q4, Period 3 хүснэгт.', 'Eight-point summary: the radius falls; structure; melting point; maximum oxidation number; oxides; pH; chlorides; explanation. Traffic-light exit ticket: Al₂O₃ (two equations), SiCl₄ + water. Homework: Q1–Q4 and a Period 3 table.'),
          bi('Гурван факт, хоёр холбоос, нэг асуулт — наалттай цаасан дээр бичнэ.', 'Three facts, two links and one question — on a sticky note.'),
          bi('Гарах билетийн оноо, self-evaluation хүснэгт.', 'Exit ticket score and the self-evaluation table.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Period 3-ын дагуу хамгийн их исэлдэлтийн зэрэг P-ийн хлоридод хэд вэ?', 'What is the maximum oxidation number of P in its chloride?'),
        [bi('+3', '+3'), bi('−3', '−3'), bi('+4', '+4'), bi('+5', '+5')],
        3,
        bi('PCl₅: P-ийн 5 гаднах электрон бүгд холбоонд.', 'PCl₅: all 5 outer electrons of P are used in bonding.')
      ),
      exitItem(
        bi('Аль хос хоёулаа ионы холбоотой вэ?', 'Which pair is ionic in both cases?'),
        [bi('AlCl₃, SiCl₄', 'AlCl₃, SiCl₄'), bi('NaCl, MgO', 'NaCl, MgO'), bi('P₄O₁₀, SO₂', 'P₄O₁₀, SO₂'), bi('SiO₂, PCl₅', 'SiO₂, PCl₅')],
        1,
        bi('Металл + металл бус.', 'Metal + non-metal.')
      ),
      exitItem(
        bi('Mg(OH)₂-г HCl-тай урвуулахад юу үүсэх вэ?', 'What forms when Mg(OH)₂ reacts with HCl?'),
        [bi('MgO + H₂', 'MgO + H₂'), bi('MgCl₂ + H₂', 'MgCl₂ + H₂'), bi('MgCl₂ + 2H₂O', 'MgCl₂ + 2H₂O'), bi('урвал явагдахгүй', 'no reaction')],
        2,
        bi('Mg(OH)₂ + 2HCl → MgCl₂ + 2H₂O — үндсэн гидроксид.', 'Mg(OH)₂ + 2HCl → MgCl₂ + 2H₂O — a basic hydroxide.')
      ),
      exitItem(
        bi('Аль нь SO₃-ийн усанд үзүүлэх урвалыг зөв илэрхийлэх вэ?', 'Which statement correctly describes SO₃ with water?'),
        [
          bi('SO₃ + H₂O → H₂SO₄; pH ≈ 1', 'SO₃ + H₂O → H₂SO₄; pH ≈ 1'),
          bi('SO₃ + H₂O → H₂SO₃; pH ≈ 7', 'SO₃ + H₂O → H₂SO₃; pH ≈ 7'),
          bi('Na₂O + H₂O → NaOH; pH ≈ 2', 'Na₂O + H₂O → NaOH; pH ≈ 2'),
          bi('PCl₅ цагаан утаа гаргахгүй', 'PCl₅ gives no white fumes')
        ],
        0,
        bi('SO₃ хүчтэй хүчил өгнө (pH ≈ 1).', 'SO₃ gives a strong acid (pH ≈ 1).')
      )
    ],
    ID
  )
];

export const AS9_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'as9-3': [
    term(bi('Үечилсэн шинж', 'Periodic property'), bi('Атомын дугаараар үе бүр давтагддаг шинж чанар', 'A property that repeats with atomic number, across each period')),
    term(bi('Хамгийн их исэлдэлтийн зэрэг', 'Maximum oxidation number'), bi('Гаднах электроны тоо (холбоонд оролцох бүх электрон)', 'The number of outer electrons (all used in bonding)'))
  ]
};

export const AS9_PRACTICE_B: Record<string, PracticeItem[]> = {
  'as9-3': [
    easy(
      bi('Аль оксид амфотер вэ?', 'Which oxide is amphoteric?'),
      [bi('MgO', 'MgO'), bi('SiO₂', 'SiO₂'), bi('Al₂O₃', 'Al₂O₃'), bi('P₄O₁₀', 'P₄O₁₀')],
      2,
      bi('Al₂O₃ — хүчил ба шүлттэй урвалддаг.', 'Al₂O₃ — reacts with acids and alkalis.')
    ),
    hard(
      bi('Si-ийн хайлах цэг P-ээс яагаад хамаагүй өндөр вэ? (5 оноо)', 'Explain why the melting point of Si is much higher than that of P. (5 marks)'),
      bi('Si аварга ковалент: олон хүчтэй ковалент холбоо тасрах ёстой. P₄ энгийн молекул: молекул хоорондын сул id–id хүч даван туулагдана; ковалент холбоо тасрахгүй.', 'Si is giant covalent: many strong covalent bonds must be broken. P₄ is simple molecular: only the weak id–id forces between the molecules are overcome; covalent bonds are not broken.'),
      bi('Бүтэц ба холбоог ялгах; "covalent bonds break" гэж бичихгүй.', 'Distinguish structure and bonding; do not write that covalent bonds break in P₄.')
    )
  ]
};
