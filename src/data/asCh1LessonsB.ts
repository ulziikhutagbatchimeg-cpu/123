// AS 9701 chapter 1 (atomic structure), lessons 3–5. They follow the deck 02_Ch2_Electrons_in_Atoms.pptx and its plan of
// three 60-minute lessons (slides 1–20, 21–38 and 39 on). Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { BLOCKS_60, bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'as1';

export const AS1_LESSONS_B: StatesLesson[] = [
  lesson(
    3,
    bi('Бүрхүүл, дэд бүрхүүл, орбитал ба электрон бүтэц', 'Shells, sub-shells, orbitals and electronic configurations'),
    bi(
      'Бүрхүүл, дэд бүрхүүл, орбитал, n ба үндсэн төлөвийг хэрэглэх; s, p, d-ийн орбитал ба электроны тоо; s ба p орбиталын хэлбэр; дүүргэх дүрэм; атомын бүрэн ба товч электрон бүтэц; Cr ба Cu-ийн онцгой бүтэц (хөтөлбөр 1.3).',
      'Use shells, sub-shells, orbitals, n and the ground state; the numbers of orbitals and electrons in s, p and d; the shapes of s and p orbitals; the filling rules; full and shorthand configurations of atoms; the exceptions Cr and Cu (syllabus 1.3).'
    ),
    [
      bi('Бүрхүүл n = 1, 2, 3 … (n = 1 цөмд ойр, бага энергитэй; 2n²: 2, 8, 18, 32). Орбитал – нэг эсвэл хоёр электрон байх орон зай. s: 1 орбитал → 2 e⁻; p: 3 → 6; d: 5 → 10.', 'Shells n = 1, 2, 3 … (n = 1 is closest, lowest energy; 2n²: 2, 8, 18, 32). An orbital is a region of space that can hold one or two electrons. s: 1 orbital → 2 e⁻; p: 3 → 6; d: 5 → 10.'),
      bi('s – бөмбөрцөг; p – хоёр дэлбээтэй, px, py, pz бие биендээ 90°-д. Дүүргэх: 1s 2s 2p 3s 3p 4s 3d 4p; орбиталд ≤ 2 эсрэг спинтэй; дэд бүрхүүлд эхлээд тус тусад нь, дараа нь хосолно.', 's is spherical; p has two lobes, with px, py, pz at 90° to each other. Filling: 1s 2s 2p 3s 3p 4s 3d 4p; ≤ 2 electrons of opposite spin per orbital; in a sub-shell, separate orbitals first, then pair.'),
      bi('Fe: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² = [Ar] 3d⁶ 4s²; дээд индексийн нийлбэр = Z. Cr [Ar] 3d⁵ 4s¹, Cu [Ar] 3d¹⁰ 4s¹ – илүү тогтвортой.', 'Fe: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² = [Ar] 3d⁶ 4s²; the superscripts add up to Z. Cr [Ar] 3d⁵ 4s¹, Cu [Ar] 3d¹⁰ 4s¹ – more stable.')
    ],
    lessonSteps(
      [
        [
          bi('Нээлт, түлхүүр үг, шалгуур, сэргээн санах', 'Opening, key terms, criteria and retrieval'),
          bi('"Калийн 19 дэх электрон яагаад 3d биш 4s-д ордог вэ?" Түлхүүр үг (16): бүрхүүл, n, дэд бүрхүүл, орбитал, үндсэн төлөв, spin-pair repulsion, чөлөөт радикал, IE₁ … 9 шалгуурт fist to five. Сэргээн санах: p ба e, Ca 2,8,8,2, инертийн хий, Mg → Mg²⁺ + 2e⁻, kJ mol⁻¹.', '"Why does potassium’s 19th electron go into 4s, not 3d?" Key terms (16): shell, n, sub-shell, orbital, ground state, spin-pair repulsion, free radical, IE₁ … Fist to five on the 9 criteria. Retrieval: p and e, Ca 2,8,8,2, the noble gases, Mg → Mg²⁺ + 2e⁻, kJ mol⁻¹.'),
          bi('Утгын баганыг хааж хосоороо асууна; мини самбарт бичээд 3-2-1-д өргөнө.', 'Cover the meanings and test a partner; write on mini whiteboards and show on 3-2-1.'),
          bi('Бүрхүүл ≠ дэд бүрхүүл ≠ орбитал; гадаад бүрхүүл дүүрэн тул идэвхгүй; нэгжийг сөрөг зэрэгтээр бичнэ.', 'Shell ≠ sub-shell ≠ orbital; a full outer shell makes them unreactive; write units with negative indices.')
        ],
        [
          bi('Бүрхүүл; дэд бүрхүүл ба орбитал; хамтдаа хүснэгт', 'Shells; sub-shells and orbitals; we do the table'),
          bi('Энгийн бүтэц: Li 2,1 · Ne 2,8 · Cl 2,8,7; бие даан S, Mg, F, K, C. Орбитал: s 1 (2 e⁻), p 3 (6), d 5 (10); бүрхүүлд s < p < d; аргоны дараа 4s нь 3d-ээс доор. Хүснэгт: n = 1 – 1s (1, 2); n = 2 – 2s, 2p (4, 8); n = 3 – 3s, 3p, 3d (9, 18); n = 4 (16, 32).', 'Simple structures: Li 2,1 · Ne 2,8 · Cl 2,8,7; you do S, Mg, F, K, C. Orbitals: s 1 (2 e⁻), p 3 (6), d 5 (10); in a shell s < p < d; after argon, 4s is below 3d. Table: n = 1 – 1s (1, 2); n = 2 – 2s, 2p (4, 8); n = 3 – 3s, 3p, 3d (9, 18); n = 4 (16, 32).'),
          bi('Na, S, Ar-ийн гадаад электроныг хуруугаар үзүүлнэ; "электрон зочид буудал" (давхар = бүрхүүл, коридор = дэд бүрхүүл, өрөө = орбитал); мөр бүрийг бүгд хэлнэ.', 'Show outer electrons of Na, S, Ar with fingers; the "electron hotel" (floor = shell, corridor = sub-shell, room = orbital); the class says each row.'),
          bi('S 2,8,6 · Mg 2,8,2 · F 2,7 · K 2,8,8,1 · C 2,4. Орбитал бүрт ≤ 2 (дэд бүрхүүлд биш).', 'S 2,8,6 · Mg 2,8,2 · F 2,7 · K 2,8,8,1 · C 2,4. At most 2 per orbital (not per sub-shell).')
        ],
        [
          bi('s ба p орбиталын хэлбэр; дүүргэх дүрэм', 'Shapes of s and p orbitals; filling rules'),
          bi('s – бөмбөрцөг, 2s нь 1s-ээс том; p – хоёр дэлбээ, x, y, z тэнхлэгийн дагуу, ижил энергитэй. Самбарт зурж харьцуулна. Гурван дүрэм: бага энерги эхэлж; ≤ 2 эсрэг спинтэй; эхлээд тус тусдаа (түлхэлтийг багасгана). Дараагийн дэд бүрхүүл: 2p → 3s, 3p → 4s, 4s → 3d, 3d → 4p; Sc – эхний 3d, Ga – эхний 4p.', 's is spherical, 2s larger than 1s; p has two lobes along the x, y, z axes, all the same energy. Sketch on boards and compare. Three rules: lowest energy first; ≤ 2 of opposite spin; separate orbitals first (to minimise repulsion). Next sub-shell: 2p → 3s, 3p → 4s, 4s → 3d, 3d → 4p; Sc has the first 3d, Ga the first 4p.'),
          bi('Гараараа s, px, py, pz-ийг агаарт зурна; дүүргэх дарааллыг чангаар давтана; бүх анги хариулаад дарна.', 'Air-draw s, px, py, pz with hands; chant the filling order; the class answers aloud before each click.'),
          bi('Цөмийг төвд тэмдэглэ; 3p → 3d гэх нь хамгийн түгээмэл алдаа (4s).', 'Mark the nucleus at the centre; 3p → 3d is the most common mistake (it is 4s).')
        ],
        [
          bi('Электрон бүтэц бичих; алхамтай жишээ; эхний 18 элемент', 'Writing configurations; worked example; the first 18 elements'),
          bi('1s¹ уншлага; [Ar] = 1s² 2s² 2p⁶ 3s² 3p⁶; Fe бүрэн ба товч. "Use 1s² notation" бол бүрнээр. Алхамтай жишээ: S 1s² 2s² 2p⁶ 3s² 3p⁴; V 1s² 2s² 2p⁶ 3s² 3p⁶ 3d³ 4s². Хамтдаа: N, Na, Al, Cl, Ar.', 'Reading 1s¹; [Ar] = 1s² 2s² 2p⁶ 3s² 3p⁶; Fe full and shorthand. "Use 1s² notation" means the full form. Worked example: S 1s² 2s² 2p⁶ 3s² 3p⁴; V 1s² 2s² 2p⁶ 3s² 3p⁶ 3d³ 4s². Together: N, Na, Al, Cl, Ar.'),
          bi('Дээд индексийг нэмж Z гарах эсэхийг шалгана; хуруугаар 2, 4, 10, 12, 18, 20 гэж тоолно; нэг сурагч самбарт бичиж анги шалгана.', 'Add the superscripts to check they give Z; count on fingers 2, 4, 10, 12, 18, 20; one learner writes on the board and the class checks.'),
          bi('Багтаамжаас хэтрүүлэхгүй: s 2, p 6, d 10. N 1s² 2s² 2p³; Cl 1s² 2s² 2p⁶ 3s² 3p⁵.', 'Do not overfill: s 2, p 6, d 10. N 1s² 2s² 2p³; Cl 1s² 2s² 2p⁶ 3s² 3p⁵.')
        ],
        [
          bi('Бие даан: атомын бүтэц; Cr ба Cu; 19–36-р элемент', 'You do: atoms; Cr and Cu; elements 19–36'),
          bi('Бие даан: Z = 6, 9, 20, Se (34), Cu (29). Cr [Ar] 3d⁵ 4s¹ (хагас дүүрсэн 3d), Cu [Ar] 3d¹⁰ 4s¹ (дүүрсэн 3d). Интерактив: K, Ca, Sc, Cr, Mn.', 'You do: Z = 6, 9, 20, Se (34), Cu (29). Cr [Ar] 3d⁵ 4s¹ (half-filled 3d), Cu [Ar] 3d¹⁰ 4s¹ (full 3d). Interactive: K, Ca, Sc, Cr, Mn.'),
          bi('Ганцаараа бичнэ; Cr ба Cu-г гурав дахин цээжээр бичээд хааж шалгана; хосоор нэг нь бичиж нөгөө нь шалгана.', 'Write alone; write Cr and Cu three times from memory, then cover and check; in pairs one writes and the other checks.'),
          bi('Se [Ar] 3d¹⁰ 4s² 4p⁴; Cu-г 3d⁹ 4s² гэвэл оноо алдана; Sc [Ar] 3d¹ 4s²; Mn [Ar] 3d⁵ 4s².', 'Se [Ar] 3d¹⁰ 4s² 4p⁴; writing Cu as 3d⁹ 4s² loses the mark; Sc [Ar] 3d¹ 4s²; Mn [Ar] 3d⁵ 4s².')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('d дэд бүрхүүлд хэдэн орбитал, хамгийн ихдээ хэдэн электрон байх вэ?', 'How many orbitals are in a d sub-shell, and how many electrons at most?'),
        [bi('3 ба 6', '3 and 6'), bi('1 ба 2', '1 and 2'), bi('10 ба 10', '10 and 10'), bi('5 ба 10', '5 and 10')],
        3,
        bi('5 орбитал × 2.', '5 orbitals × 2.')
      ),
      exitItem(
        bi('Cr-ийн үндсэн төлөвийн электрон бүтэц?', 'What is the ground-state configuration of Cr?'),
        [bi('[Ar] 3d⁴ 4s²', '[Ar] 3d⁴ 4s²'), bi('[Ar] 3d⁵ 4s¹', '[Ar] 3d⁵ 4s¹'), bi('[Ar] 3d⁶', '[Ar] 3d⁶'), bi('[Ar] 4s² 4p⁴', '[Ar] 4s² 4p⁴')],
        1,
        bi('3d⁵ 4s¹ илүү тогтвортой.', '3d⁵ 4s¹ is more stable.')
      ),
      exitItem(
        bi('3p дүүрсний дараа аль дэд бүрхүүл дүүрэх вэ?', 'Which sub-shell fills after 3p?'),
        [bi('3d', '3d'), bi('4s', '4s'), bi('4p', '4p'), bi('4d', '4d')],
        1,
        bi('Аргоны дараа 4s нь 3d-ээс бага энергитэй.', 'After argon, 4s is lower in energy than 3d.')
      ),
      exitItem(
        bi('Ванади (Z = 23)-ийн 1s² бичлэг аль нь вэ?', 'What is the 1s² notation for vanadium (Z = 23)?'),
        [
          bi('1s² 2s² 2p⁶ 3s² 3p⁶ 3d³ 4s²', '1s² 2s² 2p⁶ 3s² 3p⁶ 3d³ 4s²'),
          bi('1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵', '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵'),
          bi('1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 4p³', '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 4p³'),
          bi('1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁴ 4s¹', '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁴ 4s¹')
        ],
        0,
        bi('3p⁶ 4s²-ийн дараа 3d; нийлбэр 23.', 'After 3p⁶ 4s² comes 3d; the total is 23.')
      ),
      exitItem(
        bi('p орбиталын хэлбэр ямар вэ?', 'What is the shape of a p orbital?'),
        [bi('Бөмбөрцөг', 'Spherical'), bi('Хоёр дэлбээтэй (dumbbell)', 'Two lobes (dumbbell)'), bi('Цагираг', 'A ring'), bi('Хавтгай', 'Flat')],
        1,
        bi('px, py, pz тэнхлэгийн дагуу, бие биендээ 90°-д.', 'px, py and pz lie along the axes at 90° to each other.')
      )
    ],
    ID
  ),
  lesson(
    4,
    bi('Хайрцган бичлэг, чөлөөт радикал, ион ба ионжилтын энерги', 'Electrons in boxes, free radicals, ions and ionisation energy'),
    bi(
      'Хайрцган бичлэг ба хосгүй электрон; s-, p-, d-блок; чөлөөт радикалыг таних; ионы электрон бүтэц (d-блокт 4s эхэлж алдагдана); анхны ионжилтын энергийг тодорхойлж тэгшитгэл бичих; IE-д нөлөөлөх 4 хүчин зүйл; дараалсан IE (хөтөлбөр 1.3–1.4).',
      'Electrons in boxes and unpaired electrons; the s-, p- and d-blocks; identifying free radicals; configurations of ions (d-block ions lose 4s first); define first ionisation energy and write IE equations; the 4 factors affecting IE; successive IE (syllabus 1.3–1.4).'
    ),
    [
      bi('Хайрцаг = орбитал, сум = электрон, ↑↓ = эсрэг спин; хоосон орбитал үлдээгүй үед л хосолно (N 2p ↑ ↑ ↑). Чөлөөт радикал – нэг буюу түүнээс олон хосгүй электронтой бөөм (Cl·, H₃C·).', 'Box = orbital, arrow = electron, ↑↓ = opposite spins; electrons pair only when no empty orbital is left (N 2p ↑ ↑ ↑). A free radical is a species with one or more unpaired electrons (Cl·, H₃C·).'),
      bi('Ион: Na⁺ 1s² 2s² 2p⁶; d-блокт 4s эхэлж дүүрч, эхэлж хоосорно: Ti²⁺ [Ar] 3d², Cr³⁺ [Ar] 3d³, Fe³⁺ [Ar] 3d⁵. IE₁: нэг моль хийн атомын атом бүрээс нэг электрон салгаж нэг моль хийн 1+ ион үүсгэх энерги; Ca(g) → Ca⁺(g) + e⁻, 590 kJ mol⁻¹.', 'Ions: Na⁺ 1s² 2s² 2p⁶; in the d-block 4s fills first and empties first: Ti²⁺ [Ar] 3d², Cr³⁺ [Ar] 3d³, Fe³⁺ [Ar] 3d⁵. IE₁: the energy to remove one electron from each atom in one mole of gaseous atoms to form one mole of gaseous 1+ ions; Ca(g) → Ca⁺(g) + e⁻, 590 kJ mol⁻¹.'),
      bi('IE: цөмийн цэнэг ↑ → IE ↑; зай ↑, хаалт ↑, spin-pair repulsion → IE ↓. Дараалсан IE үргэлж өснө; том үсрэлт = цөмд ойр шинэ бүрхүүл (Na: 2, 8, 1).', 'IE: nuclear charge ↑ → IE ↑; distance ↑, shielding ↑, spin-pair repulsion → IE ↓. Successive IEs always increase; a big jump = a new shell closer to the nucleus (Na: 2, 8, 1).')
    ],
    lessonSteps(
      [
        [
          bi('19–36-р элемент; орбитал ба үелэх систем; блок ба бүлэг', 'Elements 19–36; orbitals and the Periodic Table; blocks and groups'),
          bi('Cu, Zn, Ga, Br, Kr-ийн товч бүтэц. s-блок (1, 2-р бүлэг), p-блок (13–18), d-блок; гадаад s + p электрон → бүлэг. Бие даан: …3d⁵ 4s¹ блок; …4d¹⁰ 5s² 5p⁵ блок, бүлэг, элемент; P-ийн s ба p электрон; …3d⁸ 4s² элемент.', 'The shorthand of Cu, Zn, Ga, Br, Kr. s-block (Groups 1, 2), p-block (13–18), d-block; outer s + p electrons → group. You do: the block of …3d⁵ 4s¹; block, group and element of …4d¹⁰ 5s² 5p⁵; the s- and p-electrons of P; the element with …3d⁸ 4s².'),
          bi('Хосоор нэг нь бичиж нөгөө нь шалгана; Ca, Br, Fe, Ga-ийн блокийг үелэх систем дээр заана; ганцаараа бичнэ.', 'In pairs one writes and the other checks; point to the blocks of Ca, Br, Fe, Ga on the Periodic Table; write alone.'),
          bi('Zn 3d¹⁰ 4s² тул 4p Ga-аас эхэлнэ; He s-блок боловч 18-р бүлэг; d-блок (Cr); p-блок, 17, иод; 2 s, 3 p; Ni.', 'Zn is 3d¹⁰ 4s², so 4p starts at Ga; He is s-block but in Group 18; d-block (Cr); p-block, 17, iodine; 2 s, 3 p; Ni.')
        ],
        [
          bi('Хайрцган бичлэг; хосгүй электрон; чөлөөт радикал', 'Electrons in boxes; unpaired electrons; free radicals'),
          bi('B, C, N, O-ийн хайрцаг. 2-р үе: B 1, C 2, N 3, O 2, F 1, Ne 0 хосгүй. Бие даан: P, S, Fe, Cr, Cl. Чөлөөт радикал: Cl· (3p⁵), H₃C·; "species" = аливаа бөөм. Радикал уу: H атом, Na⁺, Cl атом, Cl⁻, CH₃, O атом.', 'Boxes for B, C, N, O. Period 2: B 1, C 2, N 3, O 2, F 1, Ne 0 unpaired. You do: P, S, Fe, Cr, Cl. Free radicals: Cl· (3p⁵), H₃C·; "species" = any particle. Radical or not: H atom, Na⁺, Cl atom, Cl⁻, CH₃, O atom.'),
          bi('C, N, O-г 40 секундэд хайрцгаар зурна; эхлээд зураад дарна; радикал бол босно, үгүй бол сууна.', 'Draw C, N and O in boxes in 40 s; draw first, then click; stand up for a free radical, sit for not.'),
          bi('C-д 2p ↑↓ ↑ _ гэж зурахгүй; P 3, S 2, Fe 4, Cr 6, Cl 1; H, Cl, CH₃, O – радикал; Na⁺, Cl⁻ – бүгд хостой.', 'Do not draw C as 2p ↑↓ ↑ _; P 3, S 2, Fe 4, Cr 6, Cl 1; H, Cl, CH₃ and O are radicals; Na⁺ and Cl⁻ are all paired.')
        ],
        [
          bi('Ионы электрон бүтэц; Fe³⁺; hinge', 'Configurations of ions; Fe³⁺; hinges'),
          bi('Na⁺ (Ne шиг), S²⁻ (Ar шиг); d-блок 4s-ээ эхэлж алдана: Ti²⁺ [Ar] 3d², Cr³⁺ [Ar] 3d³. Алхамтай жишээ Fe³⁺: 4s-ээс 2, 3d-ээс 1 → 3d⁵. Бие даан: Al³⁺, O²⁻, Fe²⁺, Cu²⁺, Cu⁺, Ni²⁺. Hinge: Cr, Mn²⁺, d дэд бүрхүүл.', 'Na⁺ (like Ne), S²⁻ (like Ar); the d-block loses 4s first: Ti²⁺ [Ar] 3d², Cr³⁺ [Ar] 3d³. Worked example Fe³⁺: 2 from 4s, 1 from 3d → 3d⁵. You do: Al³⁺, O²⁻, Fe²⁺, Cu²⁺, Cu⁺, Ni²⁺. Hinges: Cr, Mn²⁺, the d sub-shell.'),
          bi('Na⁺, Mg²⁺, Cl⁻, F⁻-ээс неон шиг биш нэгийг олно; сүүлийн алхмыг таамаглана; ABCD хуруугаар санал өгнө.', 'Find which of Na⁺, Mg²⁺, Cl⁻, F⁻ is not like neon; predict the last step; vote with ABCD fingers.'),
          bi('Fe²⁺ [Ar] 3d⁶ (3d⁴ 4s² биш); Cu²⁺ [Ar] 3d⁹; Cu⁺ 3d¹⁰; Ni²⁺ 3d⁸. Hinge: 1 B · 2 C · 3 D.', 'Fe²⁺ is [Ar] 3d⁶ (not 3d⁴ 4s²); Cu²⁺ [Ar] 3d⁹; Cu⁺ 3d¹⁰; Ni²⁺ 3d⁸. Hinges: 1 B · 2 C · 3 D.')
        ],
        [
          bi('Анхны ионжилтын энерги; IE-ийн тэгшитгэл', 'First ionisation energy; IE equations'),
          bi('Тодорхойлолт; Ca IE₁ 590, IE₂ 1150, IE₃ 4940 kJ mol⁻¹; баруун талын цэнэг = IE-ийн дугаар; бүгд (g). Алхамтай жишээ: Al⁺(g) → Al²⁺(g) + e⁻; Mg²⁺(g) → Mg³⁺(g) + e⁻. Бие даан: Ca IE₁, K IE₃, Li IE₂, S IE₅; Mg³⁺ → Mg⁴⁺ ба Al⁵⁺ → Al⁶⁺ ямар IE.', 'The definition; Ca IE₁ 590, IE₂ 1150, IE₃ 4940 kJ mol⁻¹; the charge on the right = the number of the IE; all (g). Worked example: Al⁺(g) → Al²⁺(g) + e⁻; Mg²⁺(g) → Mg³⁺(g) + e⁻. You do: IE₁ of Ca, IE₃ of K, IE₂ of Li, IE₅ of S; which IE Mg³⁺ → Mg⁴⁺ and Al⁵⁺ → Al⁶⁺ are.'),
          bi('Тодорхойлолтын 5 гол үгийг 20 секундэд дугуйлна; алхам бүрийг дарахаас өмнө хэлнэ; ганцаараа бичнэ.', 'Circle the 5 key words of the definition in 20 s; say each step before the click; write alone.'),
          bi('(g)-г мартахгүй; IE үргэлж эерэг (шингээнэ); IE₃-т зүүн 2+, баруун 3+ – нэг электрон; Mg-ийн 4-р, Al-ийн 6-р IE.', 'Do not forget (g); IE is always positive (absorbed); for IE₃ the left is 2+, the right 3+ – one electron; the 4th IE of Mg, the 6th IE of Al.')
        ],
        [
          bi('IE-д нөлөөлөх 4 хүчин зүйл; аль нь давамгайлах; дараалсан IE', 'Four factors that affect IE; which factor wins; successive IE'),
          bi('Цөмийн цэнэг, зай, хаалт, spin-pair repulsion; тайлбарт "attraction between the nucleus and the outer electron". Харьцуулах: Na < Li, Mg > Na, O < N, B < Be, Li ≪ He, IE₃ > IE₂. Натрийн log IE: үсрэлт 1 ба 9-ийн дараа → 2, 8, 1.', 'Nuclear charge, distance, shielding, spin-pair repulsion; explanations use "attraction between the nucleus and the outer electron". Compare: Na < Li, Mg > Na, O < N, B < Be, Li ≪ He, IE₃ > IE₂. Sodium’s log IE: jumps after 1 and 9 → 2, 8, 1.'),
          bi('Хүчин зүйл бүрийг дохиогоор үзүүлнэ (нударга, гар, алга, 2 хуруу); графикийн "хадан цохио"-г агаарт зурна.', 'Show each factor with a gesture (fist, arms, hand, 2 fingers); trace the cliffs of the graph in the air.'),
          bi('"Атом илүү тогтвортой" гэх тайлбар оноо өгөхгүй; том үсрэлт = цөмд ОЙР шинэ бүрхүүл; электрон бүр илүү эерэг ионоос салгагдана.', '"The atom is more stable" scores nothing; a big jump = a new shell CLOSER to the nucleus; each electron is removed from a more positive ion.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Mn²⁺ (Z = 25)-ийн электрон бүтэц?', 'What is the configuration of Mn²⁺ (Z = 25)?'),
        [bi('[Ar] 3d³ 4s²', '[Ar] 3d³ 4s²'), bi('[Ar] 3d⁴ 4s¹', '[Ar] 3d⁴ 4s¹'), bi('[Ar] 3d⁵', '[Ar] 3d⁵'), bi('[Ar] 3d⁶', '[Ar] 3d⁶')],
        2,
        bi('4s эхэлж алдагдана.', '4s is lost first.')
      ),
      exitItem(
        bi('Хлорын анхны ионжилтын энергийг аль тэгшитгэл илэрхийлэх вэ?', 'Which equation represents the first ionisation energy of chlorine?'),
        [bi('Cl(g) + e⁻ → Cl⁻(g)', 'Cl(g) + e⁻ → Cl⁻(g)'), bi('½Cl₂(g) → Cl⁺(g) + e⁻', '½Cl₂(g) → Cl⁺(g) + e⁻'), bi('Cl(g) → Cl⁺(g) + e⁻', 'Cl(g) → Cl⁺(g) + e⁻'), bi('Cl₂(g) → 2Cl⁺(g) + 2e⁻', 'Cl₂(g) → 2Cl⁺(g) + 2e⁻')],
        2,
        bi('Хийн атом → хийн 1+ ион.', 'Gaseous atom → gaseous 1+ ion.')
      ),
      exitItem(
        bi('Аль бөөм 3 хосгүй электронтой вэ?', 'Which species has 3 unpaired electrons?'),
        [bi('O', 'O'), bi('P', 'P'), bi('Cl', 'Cl'), bi('Ne', 'Ne')],
        1,
        bi('P: 3p ↑ ↑ ↑.', 'P: 3p ↑ ↑ ↑.')
      ),
      exitItem(
        bi('Аль нь чөлөөт радикал вэ?', 'Which is a free radical?'),
        [bi('Na⁺', 'Na⁺'), bi('Cl⁻', 'Cl⁻'), bi('Cl атом', 'A Cl atom'), bi('Ne атом', 'A Ne atom')],
        2,
        bi('Cl: 3p⁵ – нэг хосгүй электрон.', 'Cl: 3p⁵ – one unpaired electron.')
      ),
      exitItem(
        bi('Na-ийн IE₁ яагаад Li-ийнхээс бага вэ?', 'Why is IE₁ of Na lower than that of Li?'),
        [
          bi('3s электрон хол, илүү хаагдсан – цөмийн их цэнэгээс давна', 'The 3s electron is further away and more shielded – this outweighs the larger nuclear charge'),
          bi('Na-ийн цөмийн цэнэг бага', 'Na has a smaller nuclear charge'),
          bi('Na-д spin-pair repulsion бий', 'Na has spin-pair repulsion'),
          bi('Na илүү тогтвортой', 'Na is more stable')
        ],
        0,
        bi('Таталцлын хэлээр: зай ба хаалт.', 'Explain with attraction: distance and shielding.')
      )
    ],
    ID
  ),
  lesson(
    5,
    bi('Дараалсан IE, радиус, IE-ийн хандлага ба шалгалт', 'Successive IE, radii, IE trends and exam practice'),
    bi(
      'Дараалсан IE-ээс бүлэг ба бүтцийг гаргах; үе ба бүлэг дэх атомын ба ионы радиусын хандлага; IE₁ үеэр өсөх, Be → B ба N → O-ийн бууралт, бүлгээр буурахыг тайлбарлах; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх (хөтөлбөр 1.1(7), 1.4).',
      'Deduce the group and configuration from successive IE data; trends in atomic and ionic radius across a period and down a group; explain the rise of IE₁ across a period, the dips at Be → B and N → O, and the fall down a group; pull the chapter together with exam questions and common mistakes (syllabus 1.1(7), 1.4).'
    ),
    [
      bi('Том үсрэлтийг IEₙ₊₁ ÷ IEₙ харьцаагаар олно: X-д 6 ба 7-ийн хооронд (8500 → 27 100) → 6 гадаад электрон → 16-р бүлэг (S).', 'Find the big jump from IEₙ₊₁ ÷ IEₙ: for X it lies between the 6th and 7th (8500 → 27 100) → 6 outer electrons → Group 16 (S).'),
      bi('Радиус: бүлгээр доош ↑ (нэмэлт бүрхүүл, хаалт); үеэр ↓ (цөмийн цэнэг ↑, ижил бүрхүүл). Катион < атом; анион > атом; Na⁺ > Mg²⁺ > Al³⁺ (ижил 10 e⁻, протон олон).', 'Radius: increases down a group (extra shell, shielding); decreases across a period (nuclear charge ↑, same shell). Cation < atom; anion > atom; Na⁺ > Mg²⁺ > Al³⁺ (same 10 e⁻, more protons).'),
      bi('IE₁ үеэр өснө (цөмийн цэнэг ↑); He → Li, Ne → Na огцом буурна (шинэ бүрхүүл). Be → B: 2p хол, 2s-ээр хаагдана; N → O: хостой 2p электрон – spin-pair repulsion. Бүлгээр доош буурна: Li 519, Na 494, K 418, Rb 403.', 'IE₁ rises across a period (nuclear charge ↑); it falls sharply He → Li, Ne → Na (new shell). Be → B: the 2p is further and shielded by 2s; N → O: a paired 2p electron – spin-pair repulsion. It falls down a group: Li 519, Na 494, K 418, Rb 403.')
    ],
    lessonSteps(
      [
        [
          bi('Аль бүлэг вэ; мэдээллийн мөрдөгч; бие даан', 'Which group; data detective; you do'),
          bi('Алхамтай жишээ: X-ийн 10 IE → үсрэлт 6-аас 7 (×3.2) → 16-р бүлэг. Exam Q7: A–E-ийн эхний 5 IE-ээс бүлэг. Бие даан: бор (3 амархан + 2 хэцүү → 2, 3); 1090 … 37 800 → 14-р бүлэг; Mg-ийн эхний 2 электрон. Al, P, Cl, Mg, K-ийн үсрэлтийг таамаглана.', 'Worked example: the 10 IEs of X → the jump from 6th to 7th (×3.2) → Group 16. Exam Q7: the group from the first 5 IEs of A–E. You do: boron (3 easy + 2 hard → 2, 3); 1090 … 37 800 → Group 14; the first two electrons of Mg. Predict the jumps for Al, P, Cl, Mg, K.'),
          bi('15 секундэд "хадан цохио"-г олно; тооцооны машинаар IE бүрийг өмнөхөд нь хуваана; Al-ийн log IE графикийг зурна.', 'Find the cliff in 15 s; divide each IE by the one before on a calculator; sketch the log IE graph for Al.'),
          bi('1000 → 2260 (×2.3) үсрэлт биш; A 14 · B 2 · C 1 · D 14 · E 13; Al 3 ба 11-ийн дараа; K 1, 9, 17-ийн дараа.', '1000 → 2260 (×2.3) is not a jump; A 14 · B 2 · C 1 · D 14 · E 13; Al after the 3rd and 11th; K after the 1st, 9th and 17th.')
        ],
        [
          bi('Атомын ба ионы радиус', 'Atomic and ionic radius'),
          bi('Бүлгээр доош ↑, үеэр ↓; катион жижиг (гадаад бүрхүүл алдсан), анион том (нэмэлт электрон, түлхэлт); Na⁺ > Mg²⁺ > Al³⁺; P³⁻ > S²⁻ > Cl⁻. Аль нь том: Na/Cl, Na/Na⁺, Cl/Cl⁻, Na⁺/Mg²⁺, Mg²⁺/Ca²⁺, Al³⁺/P³⁻. Бие даан: 3-р үеийн анион яагаад том, Na → Cl, Li → K, Mg²⁺ < Mg.', 'Down a group ↑, across a period ↓; a cation is smaller (outer shell lost), an anion larger (extra electrons, more repulsion); Na⁺ > Mg²⁺ > Al³⁺; P³⁻ > S²⁻ > Cl⁻. Which is larger: Na/Cl, Na/Na⁺, Cl/Cl⁻, Na⁺/Mg²⁺, Mg²⁺/Ca²⁺, Al³⁺/P³⁻. You do: why Period 3 anions are larger, Na → Cl, Li → K, why Mg²⁺ < Mg.'),
          bi('Үелэх систем дээр радиусын хоёр сум зурна; зүүн/баруун гараар санал өгнө; ганцаараа тайлбар бичнэ.', 'Draw two radius arrows on the Periodic Table; vote with left or right hand; write explanations alone.'),
          bi('"Электрон нэмэгдсэн тул жижгэрнэ" – буруу, цөмийн цэнэгийг хэл. Na, Na, Cl⁻, Na⁺, Ca²⁺, P³⁻. Анион 3 бүрхүүлтэй (2,8,8), катион 2 (2,8).', '"It gets smaller because electrons are added" is wrong – mention nuclear charge. Na, Na, Cl⁻, Na⁺, Ca²⁺, P³⁻. Anions have 3 shells (2,8,8), cations 2 (2,8).')
        ],
        [
          bi('IE₁ үеэр ба бүлгээр; хоёр бууралт; Al < Mg тайлбар', 'IE₁ across a period and down a group; two dips; why Al < Mg'),
          bi('H-ээс Na хүртэл IE₁: ерөнхий өсөлт; He → Li, Ne → Na огцом бууралт. Be → B (Mg → Al) ба N → O (P → S). Бүлгээр доош: Li 519 → Rb 403. Алхамтай жишээ [4]: Mg 736, Al 577. Бие даан: Na → Si, F > I, P > S, K-ийн IE₁. График тааруулах (15-р бүлгээс, D); exam Q3 A–J.', 'IE₁ from H to Na: the general rise; sharp falls He → Li, Ne → Na. Be → B (Mg → Al) and N → O (P → S). Down a group: Li 519 → Rb 403. Worked example [4]: Mg 736, Al 577. You do: Na → Si, F > I, P > S, IE₁ of K. Graph match (from Group 15, D); exam Q3 A–J.'),
          bi('Mg график дээр хаана байхыг таамаглана; N ба O-ийн 2p хайрцгийг зурж салгах электроныг дугуйлна; хариултыг 4 цэгээр бичнэ.', 'Predict where Mg goes on the graph; draw the N and O 2p boxes and circle the electron removed; write the answer as 4 bullet points.'),
          bi('O-ийн бууралтыг "хагас дүүрсэн тогтвортой" гэвэл хангалтгүй – spin-pair repulsion. Al: 3p, хол, 3s-ээр хаагдана → цөмийн цэнэгээс давна. F > I: ойр, хаалт бага. K ≈ 418. Q3: C (1-р бүлэг), D (Mg), J ≈ 1500.', 'Explaining the O dip as "half-filled is stable" is not enough – say spin-pair repulsion. Al: 3p, further, shielded by 3s → outweighs nuclear charge. F > I: closer, less shielding. K ≈ 418. Q3: C (Group 1), D (Mg), J ≈ 1500.')
        ],
        [
          bi('Шалгалтын зөвлөмж, MCQ, бүтэцтэй асуулт', 'Exam tips, MCQs and structured questions'),
          bi('Зөвлөмж: d-блокийн ион 4s-ээ эхэлж алдана, Cr ба Cu, "1s² notation", p-г тус тусад нь дүүргэх; IE-ийн тэгшитгэлд (g), 2-р IE нэг электрон, таталцлын хэлээр, бүлгээр доош. MCQ 1–6. Exam-style: хөнгөн цагаан [12]; 3-р үе ба никель.', 'Tips: d-block ions lose 4s first, Cr and Cu, "1s² notation", fill p singly; (g) in IE equations, the 2nd IE removes one electron, explain with attraction, down a group. MCQs 1–6. Exam-style: aluminium [12]; Period 3 and nickel.'),
          bi('Зөвлөмж бүрийг өөрийн хариулттай тулгана; ABCD хуруугаар санал өгнө; 6 минут шалгалтын нөхцөлд бичээд хостойгоо засна.', 'Check each tip against their answers; vote with ABCD fingers; write for 6 minutes under exam conditions, then peer-mark.'),
          bi('MCQ: 1 C · 2 A · 3 D · 4 B · 5 B · 6 C. Al: 3 ба 11-ийн дараа үсрэлт – 3, 8, 2; Al⁺(g) → Al²⁺(g) + e⁻; Al³⁺ 1s² 2s² 2p⁶; X²⁺ …3d⁸; 4p; Mg⁴⁺(g) → Mg⁵⁺(g) + e⁻.', 'MCQs: 1 C · 2 A · 3 D · 4 B · 5 B · 6 C. Al: jumps after the 3rd and 11th – 3, 8, 2; Al⁺(g) → Al²⁺(g) + e⁻; Al³⁺ 1s² 2s² 2p⁶; X²⁺ …3d⁸; 4p; Mg⁴⁺(g) → Mg⁵⁺(g) + e⁻.')
        ],
        [
          bi('Дүгнэлт, гарах билет, эргэцүүлэл', 'Summary, exit ticket and reflection'),
          bi('8 гол санаа. Гарах билет: Co²⁺-ийн 1s² бичлэг; хүхрийн эхний том үсрэлт; O-ийн IE₁ яагаад N-ээс бага. Шалгуурыг дахин үнэлнэ. Гэрийн даалгавар: exam-style Q1–Q8, Z = 1–20-ийн IE₁ баганан график, өөрийн үнэлгээ.', 'The 8 key ideas. Exit ticket: Co²⁺ in 1s² notation; the first big jump for sulfur; why IE₁ of O is lower than N. Re-rate the criteria. Homework: exam-style Q1–Q8, a bar chart of IE₁ for Z = 1–20, the self-evaluation table.'),
          bi('3-2-1 наалттай цаас; гарах билетийг цаасан дээр 4 минутад бичнэ; ногоон/шар/улаан овоолго.', '3-2-1 sticky note; the exit ticket on paper in 4 minutes; green, amber or red pile.'),
          bi('1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁷; 6 ба 7-ийн хооронд – 7 дахь электрон 2-р бүрхүүлээс, ойр, хаалт бага; O хостой 2p электроноо алдана – spin-pair repulsion.', '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁷; between the 6th and 7th – the 7th electron comes from the 2nd shell, closer and less shielded; O loses a paired 2p electron – spin-pair repulsion.')
        ]
      ],
      BLOCKS_60
    ),
    [
      exitItem(
        bi('Co²⁺ (Z = 27)-ийн 1s² бичлэг?', 'What is Co²⁺ (Z = 27) in 1s² notation?'),
        [
          bi('1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁷', '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁷'),
          bi('1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s²', '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s²'),
          bi('1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁹', '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁹'),
          bi('1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s¹', '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s¹')
        ],
        0,
        bi('Co [Ar] 3d⁷ 4s² → 4s² эхэлж алдагдана.', 'Co [Ar] 3d⁷ 4s² → the 4s² is lost first.')
      ),
      exitItem(
        bi('O-ийн IE₁ яагаад N-ийнхээс бага вэ?', 'Why is IE₁ of oxygen lower than that of nitrogen?'),
        [
          bi('O хостой 2p орбиталаас электрон алдана – spin-pair repulsion', 'O loses an electron from a paired 2p orbital – spin-pair repulsion'),
          bi('O-ийн цөмийн цэнэг бага', 'O has a smaller nuclear charge'),
          bi('O-д шинэ бүрхүүл бий', 'O has a new shell'),
          bi('O хагас дүүрсэн тул тогтвортой', 'O is stable because it is half-filled')
        ],
        0,
        bi('N 2p ↑ ↑ ↑; O 2p ↑↓ ↑ ↑.', 'N 2p ↑ ↑ ↑; O 2p ↑↓ ↑ ↑.')
      ),
      exitItem(
        bi('IE (kJ mol⁻¹): 738, 1451, 7733, 10 541 … Аль бүлэг вэ?', 'IE (kJ mol⁻¹): 738, 1451, 7733, 10 541 … Which group?'),
        [bi('1', '1'), bi('13', '13'), bi('14', '14'), bi('2', '2')],
        3,
        bi('2-р IE-ийн дараа үсрэлт.', 'The jump comes after the 2nd IE.')
      ),
      exitItem(
        bi('Аль ион хамгийн жижиг вэ?', 'Which ion is the smallest?'),
        [bi('Na⁺', 'Na⁺'), bi('Al³⁺', 'Al³⁺'), bi('Mg²⁺', 'Mg²⁺'), bi('F⁻', 'F⁻')],
        1,
        bi('10 электрон, хамгийн олон протон.', '10 electrons and the most protons.')
      ),
      exitItem(
        bi('Аль хос элемент хоёулаа өмнөх элементээсээ бага IE₁-тэй вэ?', 'Which pair of elements both have a lower IE₁ than the element before them?'),
        [bi('C ба N', 'C and N'), bi('Na ба Mg', 'Na and Mg'), bi('B ба O', 'B and O'), bi('Li ба Be', 'Li and Be')],
        2,
        bi('B (2p) ба O (хостой электрон).', 'B (2p) and O (a paired electron).')
      )
    ],
    ID
  )
];

export const AS1_GLOSSARY_B: Record<string, GlossaryTerm[]> = {
  'as1-3': [
    term(bi('бүрхүүл (үндсэн квант бүрхүүл)', 'shell (principal quantum shell)'), bi('n = 1, 2, 3 … гэж дугаарласан үндсэн энергийн түвшин.', 'A main energy level, numbered n = 1, 2, 3 …')),
    term(bi('дэд бүрхүүл', 'sub-shell'), bi('Бүрхүүлийн s, p эсвэл d хуваалт; 2, 6, 10 электрон.', 'An s, p or d division of a shell; holds 2, 6 or 10 electrons.')),
    term(bi('атомын орбитал', 'atomic orbital'), bi('Нэг эсвэл хоёр электрон байж болох орон зай.', 'A region of space that can hold one or two electrons.')),
    term(bi('электрон бүтэц', 'electronic configuration'), bi('Бүрхүүл, дэд бүрхүүл, орбитал дахь электроны зохион байгуулалт.', 'The arrangement of electrons in shells, sub-shells and orbitals.')),
    term(bi('үндсэн төлөв', 'ground state'), bi('Хамгийн бага энергитэй электрон бүтэц.', 'The lowest-energy electronic configuration.'))
  ],
  'as1-4': [
    term(bi('spin-pair repulsion', 'spin-pair repulsion'), bi('Нэг орбитал дахь хоёр электроны нэмэлт түлхэлт.', 'The extra repulsion between two electrons in one orbital.')),
    term(bi('чөлөөт радикал', 'free radical'), bi('Нэг буюу түүнээс олон хосгүй электронтой бөөм.', 'A species with one or more unpaired electrons.')),
    term(bi('анхны ионжилтын энерги, IE₁', 'first ionisation energy, IE₁'), bi('Нэг моль хийн атомын атом бүрээс нэг электрон салгаж нэг моль хийн 1+ ион үүсгэх энерги.', 'The energy to remove one electron from each atom in one mole of gaseous atoms to form one mole of gaseous 1+ ions.')),
    term(bi('хаалт (shielding)', 'shielding'), bi('Дотоод бүрхүүлийн электрон гадаад электроныг түлхэх.', 'The repulsion of outer electrons by inner shells of electrons.'))
  ],
  'as1-5': [
    term(bi('атомын радиус', 'atomic radius'), bi('Цөмөөс атомын гадаад электрон хүртэлх зай.', 'The distance from the nucleus to the outer electrons of an atom.')),
    term(bi('ионы радиус', 'ionic radius'), bi('Ионы радиус (катион атомаас жижиг, анион том).', 'The radius of an ion (a cation is smaller, an anion larger than the atom).')),
    term(bi('дараалсан ионжилтын энерги', 'successive ionisation energies'), bi('IE₁, IE₂, IE₃ … – электроныг нэг нэгээр салгах.', 'IE₁, IE₂, IE₃ … – removing electrons one by one.'))
  ]
};

export const AS1_PRACTICE_B: Record<string, PracticeItem[]> = {
  'as1-3': [
    easy(
      bi('Эхний 3d электронтой элемент аль нь вэ?', 'Which is the first element with a 3d electron?'),
      [bi('K', 'K'), bi('Ca', 'Ca'), bi('Sc', 'Sc'), bi('Ga', 'Ga')],
      2,
      bi('Sc, Z = 21: [Ar] 3d¹ 4s².', 'Sc, Z = 21: [Ar] 3d¹ 4s².')
    ),
    easy(
      bi('Зэс (Z = 29)-ийн электрон бүтэц?', 'What is the configuration of copper (Z = 29)?'),
      [bi('[Ar] 3d⁹ 4s²', '[Ar] 3d⁹ 4s²'), bi('[Ar] 3d¹⁰ 4s¹', '[Ar] 3d¹⁰ 4s¹'), bi('[Ar] 3d¹⁰ 4s²', '[Ar] 3d¹⁰ 4s²'), bi('[Ar] 3d⁸ 4s²', '[Ar] 3d⁸ 4s²')],
      1,
      bi('Дүүрсэн 3d илүү тогтвортой.', 'A full 3d is more stable.')
    ),
    hard(
      bi('Селен (Z = 34)-ийн 1s² бичлэгийг гаргаж, яагаад 4p-ээс өмнө 3d дүүрдгийг тайлбарла.', 'Write selenium (Z = 34) in 1s² notation and explain why 3d fills before 4p.'),
      bi('1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁴. Хамгийн бага энергитэй дэд бүрхүүл эхэлж дүүрнэ: 4s < 3d < 4p; нийлбэр 34.', '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁴. The lowest-energy sub-shell fills first: 4s < 3d < 4p; the total is 34.'),
      bi('Дээд индексийн нийлбэрийг Z-тэй тулгаж шалга.', 'Check the superscripts add up to Z.')
    )
  ],
  'as1-4': [
    easy(
      bi('Калийн 3-р IE-ийн тэгшитгэл?', 'What is the equation for the 3rd ionisation energy of potassium?'),
      [bi('K(g) → K³⁺(g) + 3e⁻', 'K(g) → K³⁺(g) + 3e⁻'), bi('K²⁺(g) → K³⁺(g) + e⁻', 'K²⁺(g) → K³⁺(g) + e⁻'), bi('K²⁺(aq) → K³⁺(aq) + e⁻', 'K²⁺(aq) → K³⁺(aq) + e⁻'), bi('K³⁺(g) → K⁴⁺(g) + e⁻', 'K³⁺(g) → K⁴⁺(g) + e⁻')],
      1,
      bi('Нэг электрон, бүгд (g).', 'One electron, all (g).')
    ),
    easy(
      bi('Төмөр (Z = 26)-д хэдэн хосгүй электрон байх вэ?', 'How many unpaired electrons does iron (Z = 26) have?'),
      [bi('2', '2'), bi('4', '4'), bi('6', '6'), bi('0', '0')],
      1,
      bi('3d ↑↓ ↑ ↑ ↑ ↑ · 4s ↑↓.', '3d ↑↓ ↑ ↑ ↑ ↑ · 4s ↑↓.')
    ),
    hard(
      bi('Fe³⁺ (Z = 26)-ийн электрон бүтцийг 1s² бичлэгээр алхмаар гарга.', 'Deduce the configuration of Fe³⁺ (Z = 26) in 1s² notation, step by step.'),
      bi('Атом: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² (26 e⁻); эхлээд 4s-ээс 2 электрон, дараа нь 3d-ээс 1 → 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ (23 e⁻).', 'Atom: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² (26 e⁻); remove 2 electrons from 4s first, then 1 from 3d → 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ (23 e⁻).'),
      bi('3d-ээс эхэлж салгавал буруу.', 'Removing from 3d first is wrong.')
    )
  ],
  'as1-5': [
    easy(
      bi('Бүлгээр доош IE₁ яагаад буурдаг вэ?', 'Why does IE₁ decrease down a group?'),
      [
        bi('Зай ба хаалт ихсэж цөмийн цэнэгийн өсөлтөөс давна', 'Distance and shielding increase and outweigh the increased nuclear charge'),
        bi('Цөмийн цэнэг буурна', 'Nuclear charge decreases'),
        bi('Spin-pair repulsion ихсэнэ', 'Spin-pair repulsion increases'),
        bi('Атом илүү тогтвортой болно', 'The atom becomes more stable')
      ],
      0,
      bi('"Цөмийн цэнэг ихсэх тул IE ихсэнэ" – буруу дүгнэлт.', '"Nuclear charge increases, so IE increases" is the wrong conclusion.')
    ),
    easy(
      bi('Аль нь том вэ: Mg²⁺ эсвэл Ca²⁺?', 'Which is larger: Mg²⁺ or Ca²⁺?'),
      [bi('Mg²⁺', 'Mg²⁺'), bi('Ca²⁺', 'Ca²⁺'), bi('Тэнцүү', 'They are the same'), bi('Хэлэх боломжгүй', 'Cannot tell')],
      1,
      bi('Ca²⁺ нэг илүү бүрхүүлтэй.', 'Ca²⁺ has one more shell.')
    ),
    hard(
      bi('IE₁: Mg 736, Al 577 kJ mol⁻¹. Al яагаад Mg-ээс бага IE₁-тэйг тайлбарла. [4]', 'IE₁: Mg 736, Al 577 kJ mol⁻¹. Explain why aluminium has a lower first ionisation energy than magnesium. [4]'),
      bi('Mg [Ne] 3s², Al [Ne] 3s² 3p¹ (1); Al 3p электроноо алдана – өндөр энергитэй, цөмөөс бага зэрэг хол (1); 3p электрон 3s электроноор хаагдана (1); эдгээр нь Al-ийн их цөмийн цэнэгээс давж бага энерги шаардана (1).', 'Mg [Ne] 3s², Al [Ne] 3s² 3p¹ (1); Al loses a 3p electron – higher energy, slightly further from the nucleus (1); the 3p electron is shielded by the 3s electrons (1); these outweigh Al’s larger nuclear charge, so less energy is needed (1).'),
      bi('"Al-ийн 3p¹ тогтворгүй" гэх тайлбар оноо өгөхгүй.', '"Al’s 3p¹ is unstable" scores nothing.')
    )
  ]
};
