// AS 9701 chapter 1 (atomic structure), lessons 1–2. They follow the deck 01_Ch1_Atomic_Structure.pptx and its plan of
// two 60-minute lessons (slides 1–16 and 17 on). Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'as1';

export const AS1_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Атомын дотор: бөөмс, масс, цэнэг ба цацраг', 'Inside the atom: particles, mass, charge and beams'),
    bi(
      'Атомыг жижиг, нягт цөм ба бүрхүүл дэх электроноор тайлбарлах; p, n, e-ийн харьцангуй масс ба цэнэг; атом дахь масс ба цэнэгийн тархалт; p, n, e цацраг цахилгаан оронд хэрхэн хазайхыг гаргах (хөтөлбөр 1.1).',
      'Describe the atom as a tiny dense nucleus with electrons in shells; the relative masses and charges of p, n and e; the distribution of mass and charge in an atom; deduce how beams of p, n and e behave in an electric field (syllabus 1.1).'
    ),
    [
      bi('Атом – протон + нейтрон (нуклон) бүхий жижиг, нягт цөм ба бүрхүүл дэх электрон; ихэнх нь хоосон орон зай (атом ≈ 10⁻¹⁰ m, цөм ≈ 10⁻¹⁵ m – 100 000 дахин).', 'An atom is a tiny, dense nucleus of protons + neutrons (nucleons) with electrons in shells; mostly empty space (atom ≈ 10⁻¹⁰ m, nucleus ≈ 10⁻¹⁵ m – 100 000 times).'),
      bi('Протон: масс 1, цэнэг +1, цөмд; нейтрон: 1, 0, цөмд; электрон: 1/1836, −1, бүрхүүлд. Масс цөмд төвлөрнө; эерэг цэнэг цөмд, сөрөг цэнэг бүрхүүлд.', 'Proton: mass 1, charge +1, in the nucleus; neutron: 1, 0, nucleus; electron: 1/1836, −1, shells. Mass is concentrated in the nucleus; positive charge in the nucleus, negative charge in the shells.'),
      bi('Цахилгаан оронд: электрон + руу их хазайна; протон − руу бага хазайна; нейтрон шулуун. Ижил хурдтай үед хазайлт ∝ цэнэг ÷ масс (⁴He²⁺: 2/4 = ½).', 'In an electric field: electrons bend strongly towards +; protons bend slightly towards −; neutrons go straight. At the same velocity, deflection ∝ charge ÷ mass (⁴He²⁺: 2/4 = ½).')
    ],
    lessonSteps(
      [
        [
          bi('Нээлт, түлхүүр үг, шалгуур, сэргээн санах', 'Opening, key terms, criteria and retrieval'),
          bi('"Атомыг харж чадахгүй бол дотор нь юу байгааг яаж мэдэх вэ?" Түлхүүр үг: цөм, нуклон, Z, A, изотоп, ион, катион/анион, бүрхүүл. 8 шалгуурт fist to five. Сэргээн санах: Cl⁻ ба Al³⁺, Na⁺ ба O²⁻-ийн цэнэг, ижил ба эсрэг цэнэг, гурван бөөм, K/Fe/Na/Pb.', '"If we cannot see an atom, how do we know what is inside it?" Key terms: nucleus, nucleon, Z, A, isotopes, ion, cation/anion, shell. Fist to five on the 8 criteria. Retrieval: Cl⁻ and Al³⁺, the charges of Na⁺ and O²⁻, like and opposite charges, the three particles, K/Fe/Na/Pb.'),
          bi('Утгын баганыг хааж хосоороо 60 сек асууна (quiz–quiz–trade); мини самбарт бичээд 3-2-1-д өргөнө.', 'Cover the meanings and test a partner for 60 s (quiz–quiz–trade); write on mini whiteboards and show on 3-2-1.'),
          bi('Изотоп – "ижил элементийн АТОМ"; Na 1 e⁻ алдана (11 p, 10 e), O 2 e⁻ авна (8 p, 10 e); ижил цэнэг түлхэлцэнэ, эсрэг цэнэг татагдана.', 'Isotopes are "ATOMS of the same element"; Na loses 1 e⁻ (11 p, 10 e), O gains 2 e⁻ (8 p, 10 e); like charges repel, opposite charges attract.')
        ],
        [
          bi('Элементийн сорил, атомын загвар, Резерфордын туршилт', 'Element challenge, models of the atom, Rutherford’s experiment'),
          bi('Al, Si, Br, Ca, Ne, Fe-ийн үе, бүлэг, төрөл. Дальтон → Томсон → Резерфорд (Гейгер, Марсден): 0.0005 mm алтан фольгод α бөөм. Виртуал лаб: ихэнх нь шулуун, цөөн нь хазайна, ≈ 20 000-д 1 буцаж ойно → хоосон орон зай, жижиг эерэг цөм, масс цөмд. Атомын дотор: цөм = p + n, бүрхүүлд электрон.', 'Period, group and type of Al, Si, Br, Ca, Ne, Fe. Dalton → Thomson → Rutherford (Geiger, Marsden): α-particles at gold foil 0.0005 mm thick. Virtual lab: most pass straight through, a few are deflected, ≈ 1 in 20 000 bounces back → mostly empty space, a tiny positive nucleus, the mass in the nucleus. Inside the atom: nucleus = p + n, electrons in shells.'),
          bi('Хосоор нэг нь нэрлэж нөгөө нь шалгана; Томсоны загвар юу таамаглахыг 30 сек ярилцана; эрхий хуруугаар α-ийн замыг таамаглана.', 'In pairs one names and one checks; turn & talk for 30 s on what Thomson would predict; predict the α path with thumbs.'),
          bi('Al – 13-р бүлэг; Томсоны загвараар бүгд шулуун нэвтэрнэ; цөм эерэг тул α түлхэгдэнэ (электрон биш).', 'Al is in Group 13; on Thomson’s model all would pass straight through; the α is repelled because the nucleus is positive (not by electrons).')
        ],
        [
          bi('Атом хэр хоосон вэ; бөөмсийн масс ба цэнэг', 'How empty is an atom; masses and charges of the particles'),
          bi('Алхамтай жишээ: 10⁻¹⁰ ÷ 10⁻¹⁵ = 10⁵; 100 m цэнгэлдэх → 1 mm цөм. Бие даан: 1.673 × 10⁻²⁷ ÷ 9.109 × 10⁻³¹ = 1836 → электроны харьцангуй масс 1/1836. Хүснэгт: p 1, +1; n 1, 0; e 1/1836, −1. Масс цөмд; + цөмд, − бүрхүүлд.', 'Worked example: 10⁻¹⁰ ÷ 10⁻¹⁵ = 10⁵; a 100 m stadium → a 1 mm nucleus. You do: 1.673 × 10⁻²⁷ ÷ 9.109 × 10⁻³¹ = 1836 → relative mass of an electron 1/1836. Table: p 1, +1; n 1, 0; e 1/1836, −1. Mass in the nucleus; + in the nucleus, − in the shells.'),
          bi('Эхлээд таамаглана (элсний ширхэг, бөмбөг, машин?); тооцооны машинаар ганцаараа бодно; бүх анги утга бүрийг чангаар хэлнэ; атом зурж массын байрыг будна.', 'Estimate first (grain of sand, football or car?); calculate alone with a calculator; the class says each value aloud; sketch an atom and shade where the mass is.'),
          bi('Зэрэгтийг хасна (10⁵); харьцаа нэгжгүй; нейтроны цэнэг 0 ("−" эсвэл "1" биш); электроны масс 1/1836 ("0" биш).', 'Subtract the indices (10⁵); a ratio has no units; the neutron charge is 0 (not "−" or "1"); the electron mass is 1/1836 (not "0").')
        ],
        [
          bi('Цахилгаан орон дахь цацраг; симуляц; хазайлтын тооцоо', 'Beams in an electric field; simulation; comparing deflections'),
          bi('Практик 1.1: электрон + руу (сөрөг, их хазайлт); протон − руу (эерэг, бага хазайлт, хүнд); нейтрон хазайхгүй. Симуляц: e, p, n, α (He²⁺ – протоны хагас). Алхамтай жишээ: протон +8° → ²H⁺ 1 ÷ 2 → +4°; ⁴He²⁺ 2 ÷ 4 → +4°.', 'Practical 1.1: electrons towards + (negative, large deflection); protons towards − (positive, small deflection, heavy); neutrons not deflected. Simulation: e, p, n, α (He²⁺ – half the proton deflection). Worked example: protons +8° → ²H⁺ 1 ÷ 2 → +4°; ⁴He²⁺ 2 ÷ 4 → +4°.'),
          bi('Гараараа дээш (+), доош (−), хэвтээ (хазайхгүй) үзүүлнэ; цацраг бүрийн замыг таамаглаад дарна; бөөм бүрийн цэнэг ÷ массыг уралдан бодно.', 'Show hands up (towards +), down (towards −), flat (no deflection); predict each beam’s path, then click; race to work out charge ÷ mass for each particle.'),
          bi('Чиглэл – цэнэгийн тэмдгээр, хэмжээ – цэнэг ÷ массаар; электрон хамгийн их (1/1836); сөрөг ион эсрэг чиглэлд.', 'Direction comes from the sign of the charge, size from charge ÷ mass; the electron is deflected most (1/1836); a negative ion goes the opposite way.')
        ],
        [
          bi('Бие даан: цацраг цахилгаан оронд', 'You do: beams in an electric field'),
          bi('Coursebook Q1 ба exam-style Q2(d): электрон − хавтангаас холдвол протон яах вэ; нейтрон; аль нь хамгийн их хазайх; протон 8° бол ³He²⁺. Ганцаараа, ном хаалттай; дараа нь хос дэвтрээ сольж засна.', 'Coursebook Q1 and exam-style Q2(d): electrons are deflected away from a negative plate – what do protons do; neutrons; which is deflected most; ³He²⁺ when protons give 8°. Alone, books closed; then swap and mark.'),
          bi('Шалгалтын нөхцөлд бичиж, алдсан алхмыг улаан үзгээр тэмдэглэнэ.', 'Write under exam conditions and mark missed steps in red.'),
          bi('− хавтан руу (эсрэг цэнэг татагдана); хазайхгүй (цэнэггүй); электрон (хамгийн бага масс); 2 ÷ 3 × 8° = +5.3°. "Describe" ба "explain" хоёуланд хариулна.', 'Towards the − plate (opposite charges attract); not deflected (no charge); the electron (smallest mass); 2 ÷ 3 × 8° = +5.3°. Answer both "describe" and "explain".')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Цөмийн тухай зөв өгүүлбэр аль нь вэ?', 'Which statement about the nucleus is correct?'),
        [bi('Бүх электроныг агуулна', 'It contains all the electrons'), bi('Сөрөг цэнэгтэй', 'It is negatively charged'), bi('Атомын бараг бүх массыг агуулна', 'It holds nearly all the mass'), bi('Атомын ихэнх хэсгийг эзэлнэ', 'It fills most of the atom')],
        2,
        bi('Цөм жижиг, эерэг, нягт.', 'The nucleus is tiny, positive and dense.')
      ),
      exitItem(
        bi('Нейтроны харьцангуй цэнэг ба харьцангуй масс?', 'What are the relative charge and relative mass of a neutron?'),
        [bi('−1 ба 1/1836', '−1 and 1/1836'), bi('0 ба 1', '0 and 1'), bi('+1 ба 1', '+1 and 1'), bi('0 ба 0', '0 and 0')],
        1,
        bi('Саармаг, протонтой ижил масстай.', 'Neutral, with the same mass as a proton.')
      ),
      exitItem(
        bi('Ижил хурдтай үед цахилгаан оронд аль цацраг хамгийн их хазайх вэ?', 'At the same velocity, which beam bends most in an electric field?'),
        [bi('Протон', 'Proton'), bi('Нейтрон', 'Neutron'), bi('⁴He²⁺', '⁴He²⁺'), bi('Электрон', 'Electron')],
        3,
        bi('Цэнэг ÷ масс хамгийн их.', 'It has the largest charge ÷ mass.')
      ),
      exitItem(
        bi('Резерфордын туршилтад α бөөмийн ихэнх нь фольгоор шулуун нэвтэрсэн нь юуг харуулсан бэ?', 'In Rutherford’s experiment most α-particles passed straight through the foil. What did this show?'),
        [bi('Атомын ихэнх нь хоосон орон зай', 'The atom is mostly empty space'), bi('Цөм сөрөг цэнэгтэй', 'The nucleus is negative'), bi('Электрон α-г ойлгоно', 'Electrons reflect α-particles'), bi('Атом хуваагдахгүй', 'Atoms cannot be divided')],
        0,
        bi('Цөөн нь буцаж ойсон нь жижиг, эерэг цөмийг харуулна.', 'The few that bounced back showed a tiny, positive nucleus.')
      ),
      exitItem(
        bi('Протоны цацраг +8° хазайдаг бол ижил нөхцөлд ⁴He²⁺ хэд хазайх вэ?', 'Protons are deflected by +8°. Under the same conditions, what is the deflection of ⁴He²⁺?'),
        [bi('+16°', '+16°'), bi('+8°', '+8°'), bi('+4°', '+4°'), bi('−4°', '−4°')],
        2,
        bi('Цэнэг 2, масс 4: 2 ÷ 4 = ½ → +4°.', 'Charge 2, mass 4: 2 ÷ 4 = ½ → +4°.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Z ба A, изотоп, ион ба шалгалтын дасгал', 'Z and A, isotopes, ions and exam practice'),
    bi(
      'Атомын (протоны) дугаар ба массын (нуклоны) тоог хэрэглэх; атом ба ион дахь p, n, e-ийн тоог гаргах; изотопыг тодорхойлж ᴬ_ZX тэмдэглэгээг хэрэглэх; изотопууд яагаад химийн шинжээрээ ижил, физик шинжээрээ ялгаатайг тайлбарлах (хөтөлбөр 1.1–1.2).',
      'Use atomic (proton) number and mass (nucleon) number; deduce the numbers of p, n and e in atoms and ions; define isotope and use the notation ᴬ_ZX; explain why isotopes have the same chemical but different physical properties (syllabus 1.1–1.2).'
    ),
    [
      bi('Z = протоны тоо (элементийг тодорхойлно); A = протон + нейтрон; нейтрон = A − Z. Саармаг атомд e = p. Тэмдэглэгээнд A дээр, Z доор.', 'Z = number of protons (defines the element); A = protons + neutrons; neutrons = A − Z. In a neutral atom e = p. In the symbol, A goes on top and Z at the bottom.'),
      bi('Изотоп: ижил элементийн, протоны тоо ижил, нейтроны тоо өөр атомууд. Электроны тоо (ба зохион байгуулалт) ижил тул химийн шинж ижил; нейтрон өөр тул масс, нягт өөр (D₂O мөс усанд живнэ).', 'Isotopes: atoms of the same element with the same number of protons but different numbers of neutrons. The same number (and arrangement) of electrons gives the same chemical properties; different neutrons give different mass and density (D₂O ice sinks in water).'),
      bi('Эерэг ион: e = Z − цэнэг; сөрөг ион: e = Z + цэнэг; нейтроны тоо өөрчлөгдөхгүй. Жишээ ⁵²₂₄Cr²⁺: 24 p, 28 n, 22 e. Ar(Cl) = 35.5 → 75% ³⁵Cl, 25% ³⁷Cl.', 'Positive ion: e = Z − charge; negative ion: e = Z + charge; the number of neutrons does not change. Example ⁵²₂₄Cr²⁺: 24 p, 28 n, 22 e. Ar(Cl) = 35.5 → 75% ³⁵Cl, 25% ³⁷Cl.')
    ],
    lessonSteps(
      [
        [
          bi('Hinge асуулт; Z ба A; атом дахь бөөмс', 'Hinge questions; Z and A; particles in atoms'),
          bi('Hinge: цөм, нейтрон, аль цацраг их хазайх (80%-иас доош бол давтана). Z = протон, A = p + n, n = A − Z (Al: 27 − 13 = 14). Алхамтай жишээ: ванади A 51, Z 23 → 23 p, 23 e, 28 n. Бие даан: Sr-88, P-31, ¹¹B, ⁹¹Zr, ²⁴Mg, ²⁷Al.', 'Hinges: the nucleus, the neutron, which beam bends most (revisit if below 80%). Z = protons, A = p + n, n = A − Z (Al: 27 − 13 = 14). Worked example: vanadium A 51, Z 23 → 23 p, 23 e, 28 n. You do: Sr-88, P-31, ¹¹B, ⁹¹Zr, ²⁴Mg, ²⁷Al.'),
          bi('ABCD хуруугаар санал өгнө; аль тоо дээр байрлахыг заана; дүрмийг чангаар хэлнэ; хостойгоо мөр бүрээр уралдана.', 'Vote with ABCD fingers; point to which number goes on top; say the rule aloud; race a partner row by row.'),
          bi('1 C · 2 B · 3 D. A ба Z-ийг солихгүй; үелэх системийн Ar (35.5) массын тоо биш. Sr 38/50/38; P 15/16/15; Zr 40/51/40.', '1 C · 2 B · 3 D. Do not swap A and Z; the Ar on the Periodic Table (35.5) is not a mass number. Sr 38/50/38; P 15/16/15; Zr 40/51/40.')
        ],
        [
          bi('Изотоп: тодорхойлолт, ижил ба ялгаатай шинж, тэмдэглэгээ', 'Isotopes: definition, same and different properties, symbols'),
          bi('Тодорхойлолт; протий, дейтерий, тритий; хэрэглээ. Cl-35 ба Cl-37: протон, электрон, химийн шинж ИЖИЛ; нейтрон, массын тоо, нягт ӨӨР. Электрон урвалд оролцдог тул химийн шинж ижил; D₂O мөс живнэ. Бие даан: Br-81, Ca-44, Fe-58, Pd-110, 40 p ба 91 нуклонтой Zr.', 'The definition; protium, deuterium, tritium; uses. Cl-35 and Cl-37: protons, electrons and chemical properties SAME; neutrons, mass number and density DIFFERENT. Electrons take part in reactions, so chemical properties are the same; D₂O ice sinks. You do: Br-81, Ca-44, Fe-58, Pd-110, Zr with 40 protons and 91 nucleons.'),
          bi('Тодорхойлолтын 3 гол үгийг дугуйлна; бүх анги SAME/DIFFERENT гэж хашгирна; самбараа сольж дээр A, доор Z эсэхийг шалгана.', 'Circle the 3 key words of the definition; the class calls out SAME/DIFFERENT; swap boards and check A on top, Z below.'),
          bi('"Different number of nucleons" бүрэн биш – "neutrons"; тайлбарт "electrons" гэдэг үг заавал; ⁹¹₄₀Zr – 51 нейтрон.', '"Different number of nucleons" is incomplete – say "neutrons"; the word "electrons" must be in the explanation; ⁹¹₄₀Zr has 51 neutrons.')
        ],
        [
          bi('Ион; ион дахь электрон; бөөмийг таних; изотоп ба Ar', 'Ions; electrons in ions; identifying species; isotopes and Ar'),
          bi('Cl + e⁻ → Cl⁻ (17 p, 18 e); Mg → Mg²⁺ + 2e⁻ (12 p, 10 e); OH⁻ ба NH₄⁺ – 10 e. Алхамтай жишээ: ⁵²₂₄Cr²⁺ (24, 28, 22), ³³₁₆S²⁻ (16, 17, 18). Бие даан: K⁺, N³⁻, O²⁻, Ga³⁺, Br⁻, Ce³⁺, Hf²⁺, U²⁺; урвуу асуулт (12 p 13 n 10 e → ²⁵Mg²⁺). Ar(Cl) = 35.5: 35x + 37(100 − x) = 3550 → x = 75.', 'Cl + e⁻ → Cl⁻ (17 p, 18 e); Mg → Mg²⁺ + 2e⁻ (12 p, 10 e); OH⁻ and NH₄⁺ have 10 e. Worked example: ⁵²₂₄Cr²⁺ (24, 28, 22), ³³₁₆S²⁻ (16, 17, 18). You do: K⁺, N³⁻, O²⁻, Ga³⁺, Br⁻, Ce³⁺, Hf²⁺, U²⁺; reverse questions (12 p 13 n 10 e → ²⁵Mg²⁺). Ar(Cl) = 35.5: 35x + 37(100 − x) = 3550 → x = 75.'),
          bi('Эрхий хуруугаар электрон алдсан/авсныг үзүүлнэ; хосоор "мөрдөгч" болж p → элемент, p + n → A, p − e → цэнэг; эхлээд Ar 35 эсвэл 37-д ойр эсэхийг таамаглана.', 'Thumbs show electrons lost or gained; detective pairs: p → element, p + n → A, p − e → charge; first estimate whether Ar is nearer 35 or 37.'),
          bi('Эерэг ионд ХАСНА, сөрөг ионд НЭМНЭ; K⁺ 19/21/18; Ce³⁺ 58/82/55; Hf²⁺ 72/108/70; OH⁻, NH₄⁺, Na⁺ – 10 e (Cl⁻ 18); 3 : 1 (тэнцүү бол 36.0).', 'SUBTRACT for a positive ion, ADD for a negative ion; K⁺ 19/21/18; Ce³⁺ 58/82/55; Hf²⁺ 72/108/70; OH⁻, NH₄⁺ and Na⁺ have 10 e (Cl⁻ 18); 3 : 1 (equal amounts would give 36.0).')
        ],
        [
          bi('Шалгалтын зөвлөмж, MCQ, бүтэцтэй асуулт', 'Exam tips, MCQs and structured questions'),
          bi('Оноо алддаг газар: изотопын тодорхойлолт, ион дахь электрон, электроны масс, тэмдэглэгээ; тайлбар (химийн шинж – электрон; физик – масс, нягт; цацраг; саармаг атом). MCQ 1–6. Exam-style: бор [10] ба Zr, Hf, U.', 'Where marks are lost: the isotope definition, electrons in ions, the electron’s mass, the symbol; explanations (chemical properties – electrons; physical – mass, density; beams; neutral atoms). MCQs 1–6. Exam-style: boron [10] and Zr, Hf, U.'),
          bi('Зөвлөмж бүрийг өөрийн хариулттай тулгана; ABCD хуруугаар санал өгнө; 6 минут шалгалтын нөхцөлд бичээд хостойгоо засна.', 'Check each tip against their own answers; vote with ABCD fingers; write for 6 minutes under exam conditions, then peer-mark.'),
          bi('MCQ: 1 C · 2 D (26 − 2) · 3 A · 4 A (18 ба 18) · 5 C · 6 B. ¹¹B: 5 p, 6 n, 5 e; атом саармаг – p = e; 9 протон бол фтор; электроны масс маш бага; ²³⁵U ба ²³⁸U – ижил p ба e (92), нейтрон 143 ба 146.', 'MCQs: 1 C · 2 D (26 − 2) · 3 A · 4 A (18 and 18) · 5 C · 6 B. ¹¹B: 5 p, 6 n, 5 e; atoms are neutral because p = e; 9 protons would be fluorine; the electron’s mass is negligible; ²³⁵U and ²³⁸U have the same p and e (92), neutrons 143 and 146.')
        ],
        [
          bi('Дүгнэлт, гарах билет, эргэцүүлэл', 'Summary, exit ticket and reflection'),
          bi('8 гол санаа. Гарах билет: ³⁷₁₇Cl⁻-ийн p, n, e; ³⁵Cl⁻ ба ³⁷Cl⁻ яагаад химийн шинжээрээ ижил. Шалгуурыг дахин үнэлнэ. Эргэцүүлэл ба гэрийн даалгавар: exam-style Q1–Q5, өөрийн үнэлгээ, Дальтон → Бор цагийн хэлхээс.', 'The 8 key ideas. Exit ticket: p, n and e in ³⁷₁₇Cl⁻; why ³⁵Cl⁻ and ³⁷Cl⁻ have the same chemical properties. Re-rate the criteria. Reflection and homework: exam-style Q1–Q5, the self-evaluation table, a Dalton → Bohr timeline.'),
          bi('3-2-1 наалттай цаас; гарах билетийг цаасан дээр ганцаараа 3 минутад бичнэ; ногоон/шар/улаан овоолго.', '3-2-1 sticky note; the exit ticket alone on paper in 3 minutes; green, amber or red pile.'),
          bi('17 p, 20 n, 18 e; электроны тоо (ба зохион байгуулалт) ижил, химийн урвалд электрон оролцоно.', '17 p, 20 n, 18 e; the same number (and arrangement) of electrons, and chemical reactions involve electrons.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('³⁷₁₇Cl⁻-д хэдэн протон, нейтрон, электрон байх вэ?', 'How many protons, neutrons and electrons are in ³⁷₁₇Cl⁻?'),
        [bi('17 p, 20 n, 18 e', '17 p, 20 n, 18 e'), bi('17 p, 20 n, 16 e', '17 p, 20 n, 16 e'), bi('17 p, 37 n, 18 e', '17 p, 37 n, 18 e'), bi('18 p, 19 n, 17 e', '18 p, 19 n, 17 e')],
        0,
        bi('Сөрөг ион – электрон нэмнэ: 17 + 1 = 18; n = 37 − 17 = 20.', 'A negative ion – add electrons: 17 + 1 = 18; n = 37 − 17 = 20.')
      ),
      exitItem(
        bi('³⁵Cl⁻ ба ³⁷Cl⁻ яагаад химийн шинжээрээ ижил вэ?', 'Why do ³⁵Cl⁻ and ³⁷Cl⁻ have the same chemical properties?'),
        [
          bi('Протоны тоо ижил', 'They have the same number of protons'),
          bi('Электроны тоо (ба зохион байгуулалт) ижил; урвалд электрон оролцоно', 'They have the same number (and arrangement) of electrons; reactions involve electrons'),
          bi('Нейтроны тоо ижил', 'They have the same number of neutrons'),
          bi('Масс ижил', 'They have the same mass')
        ],
        1,
        bi('"Same number of protons" гэвэл оноо авахгүй.', '"Same number of protons" scores nothing.')
      ),
      exitItem(
        bi('⁵⁶₂₆Fe²⁺-д хэдэн электрон байх вэ?', 'How many electrons are in ⁵⁶₂₆Fe²⁺?'),
        [bi('28', '28'), bi('30', '30'), bi('26', '26'), bi('24', '24')],
        3,
        bi('26 − 2 = 24.', '26 − 2 = 24.')
      ),
      exitItem(
        bi('Аль хос ижил тооны электронтой вэ?', 'Which pair has the same number of electrons?'),
        [bi('Ca²⁺ ба Cl⁻', 'Ca²⁺ and Cl⁻'), bi('Na⁺ ба Cl⁻', 'Na⁺ and Cl⁻'), bi('Mg²⁺ ба S²⁻', 'Mg²⁺ and S²⁻'), bi('K⁺ ба F⁻', 'K⁺ and F⁻')],
        0,
        bi('Хоёулаа 18 электронтой.', 'Both have 18 electrons.')
      ),
      exitItem(
        bi('Нэг элементийн изотопууд юугаараа ялгаатай вэ?', 'Isotopes of an element have different …'),
        [bi('протоны тоо', 'numbers of protons'), bi('нягт', 'densities'), bi('электроны зохион байгуулалт', 'electron arrangements'), bi('химийн урвал', 'chemical reactions')],
        1,
        bi('Нейтрон өөр → масс ба нягт өөр.', 'Different neutrons → different mass and density.')
      )
    ],
    ID
  )
];

export const AS1_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'as1-1': [
    term(bi('цөм', 'nucleus'), bi('Атомын жижиг, нягт төв: протон + нейтрон.', 'The tiny, dense centre of an atom: protons + neutrons.')),
    term(bi('нуклон', 'nucleon'), bi('Цөм дэх бөөм: протон эсвэл нейтрон.', 'A particle in the nucleus: a proton or a neutron.')),
    term(bi('бүрхүүл (энергийн түвшин)', 'shell (energy level)'), bi('Цөмийг тойрон электрон байрлах муж.', 'A region around the nucleus where electrons are found.'))
  ],
  'as1-2': [
    term(bi('атомын (протоны) дугаар, Z', 'atomic (proton) number, Z'), bi('Цөм дэх протоны тоо.', 'The number of protons in the nucleus.')),
    term(bi('массын (нуклоны) тоо, A', 'mass (nucleon) number, A'), bi('Протон + нейтроны тоо.', 'The number of protons + neutrons.')),
    term(bi('изотоп', 'isotopes'), bi('Ижил элементийн, протоны тоо ижил, нейтроны тоо өөр атомууд.', 'Atoms of the same element with the same number of protons and different numbers of neutrons.')),
    term(bi('ион', 'ion'), bi('Атом электрон алдах эсвэл авахад үүсэх цэнэгтэй бөөм.', 'A charged particle formed when an atom loses or gains electrons.')),
    term(bi('катион / анион', 'cation / anion'), bi('Эерэг ион (электрон алдсан) / сөрөг ион (электрон авсан).', 'A positive ion (electrons lost) / a negative ion (electrons gained).'))
  ]
};

export const AS1_PRACTICE_A: Record<string, PracticeItem[]> = {
  'as1-1': [
    easy(
      bi('Протоны масс электроны массаас хэд дахин их вэ?', 'How many times heavier is a proton than an electron?'),
      [bi('≈ 18', '≈ 18'), bi('≈ 1836', '≈ 1836'), bi('≈ 10⁵', '≈ 10⁵'), bi('Ижил', 'The same')],
      1,
      bi('1.673 × 10⁻²⁷ ÷ 9.109 × 10⁻³¹ = 1836.', '1.673 × 10⁻²⁷ ÷ 9.109 × 10⁻³¹ = 1836.')
    ),
    easy(
      bi('Нейтроны цацраг цахилгаан оронд яах вэ?', 'What happens to a beam of neutrons in an electric field?'),
      [bi('+ руу хазайна', 'It bends towards +'), bi('− руу хазайна', 'It bends towards −'), bi('Хазайхгүй', 'It is not deflected'), bi('Буцаж ойно', 'It bounces back')],
      2,
      bi('Нейтрон цэнэггүй.', 'Neutrons are uncharged.')
    ),
    hard(
      bi('Ижил нөхцөлд протоны цацраг +8° хазайдаг. ²H⁺ ба ³He²⁺-ийн хазайлтыг тайлбартай нь таамагла.', 'Protons are deflected by +8°. Predict, with reasons, the deflections of ²H⁺ and ³He²⁺ under the same conditions.'),
      bi('Өнцөг ∝ цэнэг ÷ масс. ²H⁺: 1 ÷ 2 = ½ → +4°; ³He²⁺: 2 ÷ 3 → 2/3 × 8° = +5.3°; хоёулаа эерэг тул − хавтан руу.', 'Angle ∝ charge ÷ mass. ²H⁺: 1 ÷ 2 = ½ → +4°; ³He²⁺: 2 ÷ 3 → 2/3 × 8° = +5.3°; both are positive, so both bend towards the − plate.'),
      bi('Масс ба цэнэгийг харьцангуй утгаар (p = 1, +1) авна.', 'Use relative masses and charges (p = 1, +1).')
    )
  ],
  'as1-2': [
    easy(
      bi('Аль бөөм электроноосоо олон нейтронтой вэ?', 'Which species has more neutrons than electrons?'),
      [bi('²³₁₁Na', '²³₁₁Na'), bi('¹⁹₉F⁻', '¹⁹₉F⁻'), bi('¹⁶₈O', '¹⁶₈O'), bi('¹₁H', '¹₁H')],
      0,
      bi('Na: 12 n, 11 e; F⁻: 10 ба 10.', 'Na: 12 n, 11 e; F⁻: 10 and 10.')
    ),
    easy(
      bi('26 протон, 30 нейтрон, 23 электронтой бөөм аль нь вэ?', 'Which species has 26 protons, 30 neutrons and 23 electrons?'),
      [bi('⁵⁶₂₆Fe²⁺', '⁵⁶₂₆Fe²⁺'), bi('⁵⁶₂₆Fe³⁺', '⁵⁶₂₆Fe³⁺'), bi('⁵⁶₂₆Fe', '⁵⁶₂₆Fe'), bi('³⁰₂₆Fe³⁺', '³⁰₂₆Fe³⁺')],
      1,
      bi('p → Fe; p + n = 56; p − e = +3.', 'p → Fe; p + n = 56; p − e = +3.')
    ),
    hard(
      bi('Хлор ³⁵Cl ба ³⁷Cl гэсэн хоёр изотоптой, Ar(Cl) = 35.5. Тэдгээрийн эзлэх хувийг тооцоол.', 'Chlorine has two isotopes, ³⁵Cl and ³⁷Cl, and Ar(Cl) = 35.5. Work out their abundances.'),
      bi('35x + 37(100 − x) = 3550 → 3700 − 2x = 3550 → x = 75: 75% ³⁵Cl, 25% ³⁷Cl (3 : 1); ³⁵Cl их тул Ar 35-д ойр.', '35x + 37(100 − x) = 3550 → 3700 − 2x = 3550 → x = 75: 75% ³⁵Cl, 25% ³⁷Cl (3 : 1); ³⁵Cl is more abundant, so Ar is nearer 35.'),
      bi('"Тэнцүү" гэвэл Ar 36.0 болох байсан.', 'Equal amounts would give an Ar of 36.0.')
    )
  ]
};
