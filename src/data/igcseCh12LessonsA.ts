// IGCSE 0620 chapter 12 (experimental techniques and chemical analysis), lessons 1–2. They follow the deck
// Ch21_Experimental_design_and_separation.pptx and its plan of two 40-minute lessons (slides 1–10 and 11 on),
// with the review slides 22–29. Every question, answer and definition here comes from that deck.
import type { GlossaryTerm, PracticeItem } from './statesLessonSupport';
import type { StatesLesson } from './statesLessons';
import { bi, easy, exitItem, hard, lesson, lessonSteps, term } from './latticeBuilders';

const ID = 'ig12';

export const IG12_LESSONS_A: StatesLesson[] = [
  lesson(
    1,
    bi('Хэмжих багаж, хувьсагч ба салгах аргууд', 'Measuring apparatus, variables and separation methods'),
    bi(
      'Хугацаа, температур, масс, эзэлхүүн хэмжих багажийг нэрлэх; бие даасан, хамаарах, хяналтын хувьсагч; шүүх, талсжуулах, энгийн ба фракцаар нэрэх аргыг тайлбарлах; хольцод тохирох салгах аргыг сонгох.',
      'Name apparatus for measuring time, temperature, mass and volume; independent, dependent and control variables; describe filtration, crystallisation, simple and fractional distillation; choose a suitable separation method for a mixture.'
    ),
    [
      bi('Хугацаа – секундомер; температур – термометр; масс – жин (0.01 g); шингэний эзэлхүүн – бюретка, пипетка, хэмжих цилиндр (бюретка ба пипетка хамгийн нарийвчлалтай); хийн эзэлхүүн – хийн тариур.', 'Time – stopwatch; temperature – thermometer; mass – balance (to 0.01 g); volume of liquid – burette, volumetric pipette, measuring cylinder (burette and pipette are the most accurate); volume of gas – gas syringe.'),
      bi('Шүүх – уусдаггүй хатуу бодисыг (үлдэгдэл) шингэнээс (шүүдэс); талсжуулах – ханасан уусмал хүртэл ууршуулж хөргөх; энгийн нэрэх – уусмалаас уусгагчийг (далайн уснаас цэвэр ус).', 'Filtration – an insoluble solid (residue) from a liquid (filtrate); crystallisation – evaporate to a saturated solution, then cool; simple distillation – a solvent from a solution (pure water from sea water).'),
      bi('Фракцаар нэрэх – буцлах цэг өөр, холилддог шингэнүүдийг (этанол 78 °C ба ус 100 °C); буцлах цэг бага нь эхэлж нэрэгдэнэ.', 'Fractional distillation – miscible liquids with different boiling points (ethanol 78 °C and water 100 °C); the lower boiling point distils first.')
    ],
    lessonSteps([
      [
        bi('Эхлэл, санал хураалт, төлөвлөгөө', 'Start, vote and plan'),
        bi('Том асуулт: далайн уснаас ундны ус яаж гаргах, хүнсний будаг хориотой биш гэдгийг яаж батлах вэ? "Санал нийлэх үү?" (хэмжих цилиндр бюреткаас нарийвчлалтай; цэвэр бодис нэг толбо өгнө; энгийн нэрэх ойролцоо буцлах цэгтэй шингэнийг салгана) ба төлөвлөгөө.', 'Big question: how do you get pure drinking water from sea water, or prove that a food colouring is not a banned dye? "Agree or disagree?" (a measuring cylinder is more precise than a burette; a pure substance gives one spot; simple distillation separates liquids with close boiling points) and the plan.'),
        bi('Далайн уснаас цэвэр ус гаргах аргыг хосоороо 60 секундэд ярилцаж, эрхий хуруугаар санал өгнө.', 'Discuss in pairs for 60 s how to get pure water from sea water; vote with thumbs.'),
        bi('Ууссан давсыг шүүлтүүрээр салгаж болохгүй; бюретка 0.05 cm³ хүртэл хэмжинэ.', 'Dissolved salt cannot be removed by filtering; a burette measures to 0.05 cm³.')
      ],
      [
        bi('Түлхүүр үг, зорилго, давталт', 'Key terms, objectives and retrieval'),
        bi('Уусгагч/уусах бодис/уусмал, ханасан уусмал, үлдэгдэл/шүүдэс, нэрмэл, Rf, (E) илрүүлэх бодис. Fist to five. Давталт: цэвэр мөсний хайлах цэг, хольц буцлах цэгт, талсжуулахад хуурай болтол ууршуулдаггүй шалтгаан, фракцаар нэрэхийн шинж.', 'Solvent/solute/solution, saturated solution, residue/filtrate, distillate, Rf, (E) locating agent. Fist to five. Retrieval: the melting point of pure ice, how an impurity changes boiling point, why a salt solution is not evaporated to dryness, the property used in fractional distillation.'),
        bi('Нэр томьёог хэлэхгүйгээр тайлбарлана; самбартаа бичээд 3-2-1-д өргөнө.', 'Explain a term without saying it; write on boards and reveal on 3-2-1.'),
        bi('Үлдэгдэл ба шүүдсийг солихгүй; 0 °C; өсгөнө (100 °C-ээс дээш); усжсан талст; өөр буцлах цэг.', 'Do not swap residue and filtrate; 0 °C; it raises it (above 100 °C); hydrated crystals; different boiling points.')
      ],
      [
        bi('Хэмжих багаж ба хувьсагч', 'Measuring apparatus and variables'),
        bi('Хэмжигдэхүүн бүрийн багаж ба нэгж; пипетка – тогтмол эзэлхүүн, бюретка – хувьсах эзэлхүүн. Хувьсагч (Зураг 21.3): бие даасан – өөрчилдөг (температур); хамаарах – хэмждэг (загалмай алга болох хугацаа); хяналтын – тогтмол (эзэлхүүн, концентраци). Давтаж дундажлах, гажсан үр дүнг олох.', 'The apparatus and unit for each quantity; pipette – a fixed volume, burette – a variable volume. Variables (Figure 21.3): independent – changed (temperature); dependent – measured (time for the cross to disappear); control – kept the same (volume, concentration). Repeat and take a mean; identify anomalous results.'),
        bi('Багажийг самбартаа таамаглана; температур, хугацаа, эзэлхүүнийг I, D, C гэж тэмдэглэнэ.', 'Predict the apparatus on boards; label temperature, time and volume I, D or C.'),
        bi('Аяга (beaker)-аар эзэлхүүн хэмждэггүй; бие даасан ба хамаарахыг солихгүй.', 'A beaker is not used to measure volume; do not swap independent and dependent.')
      ],
      [
        bi('Шүүх, талсжуулах, энгийн нэрэх', 'Filtration, crystallisation and simple distillation'),
        bi('Шүүх (Зураг 21.8): үлдэгдэл ба шүүдэс. Талсжуулах: ханасан уусмал хүртэл ууршуулж хөргөх, талстыг шүүж, бага хүйтэн уусгагчаар угааж хатаах. Элс + давс. Энгийн нэрэх (Зураг 21.11): хөргөгчийн ус доороос орж дээрээс гарна; термометрийн бөмбөлөг хажуу хоолойн түвшинд; буцалгах мөхлөг.', 'Filtration (Figure 21.8): residue and filtrate. Crystallisation: evaporate to a saturated solution, cool, filter off the crystals, wash with a little cold solvent and dry. Sand + salt. Simple distillation (Figure 21.11): condenser water enters at the bottom and leaves at the top; the thermometer bulb is level with the side arm; anti-bumping granules.'),
        bi('"Уусгах, шүүх, ууршуулах, хөргөх, шүүх, хатаах"-ыг хосоороо дараалуулна; хөргөгч, термометр, нэрмэлийг зураг дээр тэмдэглэнэ.', 'Put "dissolve, filter, evaporate, cool, filter, dry" in order in pairs; label condenser, thermometer and distillate on a sketch.'),
        bi('Хөргөгчийн усыг дээрээс оруулахгүй; термометрийг уусмалд дүрэхгүй.', 'Condenser water does not enter at the top; the thermometer is not dipped in the solution.')
      ],
      [
        bi('Фракцаар нэрэх; салгах аргыг сонгох', 'Fractional distillation; choosing a separation method'),
        bi('Фракцаар нэрэх (Зураг 21.12): шилэн бөмбөлөгтэй багана – олон дахин конденсацлах ба уурших гадаргуу; этанол бүгд гартал 78 °C тогтмол, дараа нь өснө; газрын тос, шингэн агаар. Хамтдаа: элс/ус, CuSO₄ талст, давсны уусмалаас ус, этанол/ус, бэх дэх будаг, төмрийн үртэс/хүхэр.', 'Fractional distillation (Figure 21.12): a column of glass beads gives a large surface area for repeated condensation and evaporation; the temperature stays at 78 °C until all the ethanol is collected, then rises; crude oil and liquid air. Together: sand/water, copper(II) sulfate crystals, pure water from salt solution, ethanol/water, dyes in ink, iron filings/sulfur.'),
        bi('Бүх этанол нэрэгдсэний дараах термометрийн заалтыг таамаглана; арга бүрийг самбартаа бичнэ.', 'Predict the thermometer reading once all the ethanol has distilled; write each method on boards.'),
        bi('100 °C руу өснө; шүүх; талсжуулах; энгийн нэрэх; фракцаар нэрэх; цаасан хроматограф; соронз.', 'It rises towards 100 °C; filtration; crystallisation; simple distillation; fractional distillation; paper chromatography; a magnet.')
      ]
    ]),
    [
      exitItem(
        bi('Шүүх цаасанд үлдсэн хатуу бодисыг юу гэж нэрлэх вэ?', 'What name is given to the solid left in the filter paper?'),
        [bi('Шүүдэс', 'Filtrate'), bi('Үлдэгдэл', 'Residue'), bi('Нэрмэл', 'Distillate'), bi('Уусах бодис', 'Solute')],
        1,
        bi('Шүүлтүүрээр нэвтэрсэн шингэн – шүүдэс.', 'The liquid that passes through is the filtrate.')
      ),
      exitItem(
        bi('Далайн уснаас цэвэр ус гаргах арга аль нь вэ?', 'Which method gives pure water from sea water?'),
        [bi('Шүүх', 'Filtration'), bi('Энгийн нэрэх', 'Simple distillation'), bi('Хроматограф', 'Chromatography'), bi('Талсжуулах', 'Crystallisation')],
        1,
        bi('Уусгагчийг уусмалаас салгана; нэрмэл нь цэвэр ус.', 'It separates the solvent from the solution; the distillate is pure water.')
      ),
      exitItem(
        bi('Этанолыг (b.p. 78 °C) уснаас ямар аргаар салгах вэ?', 'Which method separates ethanol (b.p. 78 °C) from water?'),
        [bi('Шүүх', 'Filtration'), bi('Талсжуулах', 'Crystallisation'), bi('Фракцаар нэрэх', 'Fractional distillation'), bi('Хроматограф', 'Chromatography')],
        2,
        bi('Шингэнүүд холилддог бөгөөд буцлах цэг нь өөр.', 'The liquids are miscible and have different boiling points.')
      ),
      exitItem(
        bi('Яг 25.0 cm³ уусмал хэмжих багаж аль нь вэ?', 'Which apparatus measures exactly 25.0 cm³ of a solution?'),
        [bi('Аяга (beaker)', 'Beaker'), bi('Хэмжих цилиндр', 'Measuring cylinder'), bi('Эзэлхүүний пипетка', 'Volumetric pipette'), bi('Хийн тариур', 'Gas syringe')],
        2,
        bi('Пипетка тогтмол эзэлхүүнийг нарийн хэмжинэ.', 'A pipette measures a fixed volume accurately.')
      ),
      exitItem(
        bi('"Загалмай алга болох" туршилтад температурыг өөрчилж, хугацааг хэмжвэл хугацаа ямар хувьсагч вэ?', 'In the disappearing-cross experiment the temperature is changed and the time is measured. What kind of variable is the time?'),
        [bi('Бие даасан', 'Independent'), bi('Хамаарах', 'Dependent'), bi('Хяналтын', 'Control'), bi('Гажсан', 'Anomalous')],
        1,
        bi('Хэмждэг хувьсагч – хамаарах; эзэлхүүн – хяналтын.', 'The variable you measure is dependent; the volume is a control variable.')
      )
    ],
    ID
  ),
  lesson(
    2,
    bi('Цаасан хроматограф, Rf, цэвэр байдал ба шалгалт', 'Paper chromatography, Rf, purity and exam practice'),
    bi(
      'Цаасан хроматографийг тайлбарлаж Rf утгыг бодох; хайлах/буцлах цэг ба хроматограммаар цэвэр байдлыг үнэлэх; (E) өнгөгүй бодисыг илрүүлэх бодис; шалгалтын асуулт ба нийтлэг алдаагаар бүлгийг нэгтгэх.',
      'Describe paper chromatography and calculate Rf values; assess purity from melting/boiling points and chromatograms; (E) locating agents for colourless substances; pull the chapter together with exam questions and common mistakes.'
    ),
    [
      bi('Суурь шугамыг харандаагаар (уусдаггүй) зурж, уусгагчийн түвшнээс дээр байлгана; цэвэр бодис нэг толбо; X нь A ба C-тэй ижил өндөрт бол X-д A ба C байна.', 'Draw the baseline in pencil (it does not dissolve) above the solvent level; a pure substance gives one spot; if X matches A and C at the same heights, X contains A and C.'),
      bi('Rf = бодисын явсан зай ÷ уусгагчийн фронтын явсан зай (суурь шугамаас); нэгжгүй, үргэлж 1-ээс бага. Жишээ: 8 ÷ 12 = 0.67.', 'Rf = distance moved by substance ÷ distance moved by solvent front (from the baseline); no units, always less than 1. Example: 8 ÷ 12 = 0.67.'),
      bi('Цэвэр бодис хурц, тогтмол хайлах/буцлах цэгтэй; хольц хайлах цэгийг бууруулж мужийг өргөсгөнө, буцлах цэгийг өсгөнө. (E) Илрүүлэх бодис өнгөгүй толбыг харагдуулна.', 'Pure substances have sharp, fixed melting and boiling points; impurities lower and widen the melting range and raise the boiling point. (E) A locating agent makes colourless spots visible.')
    ],
    lessonSteps([
      [
        bi('Hinge 1 ба цаасан хроматограф; судлах', 'Hinge 1 and paper chromatography; explore'),
        bi('Hinge 1: этанолыг уснаас салгах арга. Хроматограф (Зураг 21.16): харандаан суурь шугам, уусгагчаас дээр; уусгагч дээшилж бодисыг өөр зайд зөөнө; X-ийг A, B, C-тэй харьцуулах. Судлах: Paper Chromatography симуляц – аль будаг хамгийн хол явах вэ.', 'Hinge 1: the method that separates ethanol from water. Chromatography (Figure 21.16): pencil baseline above the solvent; the solvent moves up and carries substances different distances; compare X with A, B and C. Explore: the Paper Chromatography simulation – which dye travels furthest?'),
        bi('ABCD хуруугаар санал өгнө; суурь шугамыг яагаад бэхээр биш харандаагаар зурдгийг 30 секунд ярилцана.', 'Vote with ABCD fingers; discuss for 30 s why the baseline is drawn in pencil, not ink.'),
        bi('Hinge: C. Бэх ч мөн салж явна; суурь шугамыг уусгагчид дүрвэл толбо уусна.', 'Hinge: C. Ink would also separate; if the baseline is under the solvent, the spots dissolve into it.')
      ],
      [
        bi('Rf бодох; бие даан', 'Calculating Rf; you do'),
        bi('Зураг 21.17: A 8 ÷ 12 = 0.67; B 3 ÷ 12 = 0.25 – толбоны төвөөс хэмжинэ. Бие даан: 2.3 ÷ 2.8; том цаасан дээр 9.7 cm фронттой үед толбо хэр явах; хоёр толбо юуг харуулах; (E) өнгөгүй амин хүчлийг харах.', 'Figure 21.17: A 8 ÷ 12 = 0.67; B 3 ÷ 12 = 0.25 – measure to the centre of the spot. You do: 2.3 ÷ 2.8; how far the same spot moves when the front moves 9.7 cm; what two spots show; (E) seeing colourless amino acids.'),
        bi('A-гийн Rf-ийг урьдчилан тооцоолно; нэг нь бодож нөгөө нь тооны машинаар шалгаад Q2-т солино.', 'Estimate Rf for A first; one partner calculates and the other checks on a calculator, swapping for Q2.'),
        bi('0.82; 0.82 × 9.7 ≈ 8.0 cm (9.7 ÷ 0.82 биш); хольц; илрүүлэх бодис цацаж хатаана/халаана.', '0.82; 0.82 × 9.7 ≈ 8.0 cm (not 9.7 ÷ 0.82); a mixture; spray with a locating agent, then dry/heat.')
      ],
      [
        bi('Цэвэр байдал; hinge 2–3', 'Purity; hinges 2–3'),
        bi('Цэвэр ус 0 °C ба 100 °C; хольц хайлах цэгийг бууруулж, буцлах цэгийг өсгөнө; нэг толбо = цэвэр; хоол, ундаа, эм цэвэр байх ёстой (Зураг 21.13). Hinge 2: 4.0 ÷ 10.0. Hinge 3: 112–118 °C-д хайлдаг, цэвэр нь 122 °C.', 'Pure water 0 °C and 100 °C; impurities lower the melting point and raise the boiling point; one spot = pure; food, drinks and medicines must be pure (Figure 21.13). Hinge 2: 4.0 ÷ 10.0. Hinge 3: melts at 112–118 °C, the pure substance at 122 °C.'),
        bi('Эм яагаад маш цэвэр байх ёстойг хосоороо ярилцана; ABCD картаар санал өгнө.', 'Discuss in pairs why medicines must be very pure; vote with ABCD cards.'),
        bi('Hinge 2: A (0.40, нэгжгүй); hinge 3: B (цэвэр биш). Хольц хайлах цэгийг өсгөхгүй.', 'Hinge 2: A (0.40, no units); hinge 3: B (impure). Impurities do not raise the melting point.')
      ],
      [
        bi('Шалгалтын дасгал, зөвлөмж, үнэлэх, алдаа засах', 'Exam practice, tips, evaluate and error clinic'),
        bi('(a) 25.0 cm³ хэмжих багаж; (b) давс + элснээс цэвэр, хуурай давс [4]; (c) суурь шугам уусгагчаас дээр байх шалтгаан; (d) (E) илрүүлэх бодисын зорилго. Зөвлөмж: Rf урвуу биш, харандаа, хайлах цэг буурна, хөргөгчийн ус доороос. Үнэлэх: суурь шугамыг бэхээр зурах. Алдаа засах: Rf = 6.0 ÷ 3.0.', '(a) apparatus for 25.0 cm³; (b) pure, dry salt from salt + sand [4]; (c) why the baseline is above the solvent; (d) (E) why a locating agent is used. Tips: Rf not upside down, pencil, melting point falls, condenser water in at the bottom. Evaluate: a baseline drawn in ink. Error clinic: Rf = 6.0 ÷ 3.0.'),
        bi('4 минут бичээд хостойгоо оноо тэмдэглэнэ; загвар өгүүлбэрээр үнэлнэ; алдааг ногоон үзгээр засна.', 'Write for 4 minutes and peer-mark; evaluate with the sentence frame; fix a mistake in green pen.'),
        bi('Пипетка; ус нэмж уусгах, шүүх (элс – үлдэгдэл), шүүдсийг талсжих цэг хүртэл халаах, хөргөж шүүгээд хатаах (хуурай болтол биш); толбо уусахгүй; өнгөгүй толбыг харагдуулах; Rf = 3.0 ÷ 6.0 = 0.50.', 'Pipette; add water and dissolve, filter (sand is the residue), heat the filtrate to crystallisation point, cool, filter and dry (not to dryness); so the spots do not dissolve; to make colourless spots visible; Rf = 3.0 ÷ 6.0 = 0.50.')
      ],
      [
        bi('Дүгнэлт ба гарах билет', 'Summary and exit ticket'),
        bi('Таван гол санаа ба концепт зураглал; эхний санал хураалт руу буцна. Гарах билет: шүүх цаасанд үлдэх бодис, далайн уснаас цэвэр ус, 5 ÷ 8 Rf, цэвэр бодисыг хроматограммаар таних. Fist to five дахин.', 'The five key ideas and the concept map; return to the opening vote. Exit ticket: the solid left in the filter paper, pure water from sea water, Rf for 5 ÷ 8, telling from a chromatogram that a substance is pure. Fist to five again.'),
        bi('Гарах билетийг 4 минутад ганцаараа бичнэ; 🟢🟡🔴-ээр үнэлнэ.', 'Complete the exit ticket alone in 4 minutes; rate themselves 🟢🟡🔴.'),
        bi('residue; энгийн нэрэх; 0.625 ≈ 0.63 (8 ÷ 5 биш); ганцхан толбо.', 'residue; simple distillation; 0.625 ≈ 0.63 (not 8 ÷ 5); only one spot.')
      ]
    ]),
    [
      exitItem(
        bi('Уусгагч 10.0 cm, толбо 4.0 cm явсан. Rf утга?', 'The solvent moved 10.0 cm and a spot moved 4.0 cm. What is the Rf value?'),
        [bi('0.40', '0.40'), bi('2.5', '2.5'), bi('4.0 cm', '4.0 cm'), bi('6.0', '6.0')],
        0,
        bi('4.0 ÷ 10.0 = 0.40 – нэгжгүй, 1-ээс бага.', '4.0 ÷ 10.0 = 0.40 – no units, less than 1.')
      ),
      exitItem(
        bi('Хатуу бодис 112–118 °C-д хайлдаг, цэвэр бодис 122 °C-д хайлдаг. Энэ юуг харуулах вэ?', 'A solid melts between 112 °C and 118 °C. The pure substance melts at 122 °C. What does this show?'),
        [bi('Цэвэр', 'The solid is pure'), bi('Цэвэр биш', 'The solid is impure'), bi('Тасалгааны температурт шингэн', 'It is a liquid at room temperature'), bi('Термометр эвдэрсэн', 'The thermometer is broken')],
        1,
        bi('Хольц хайлах цэгийг бууруулж, мужид хайлуулна.', 'Impurities lower the melting point and make it melt over a range.')
      ),
      exitItem(
        bi('Хроматограммаар бодис цэвэр болохыг яаж мэдэх вэ?', 'How can you tell from a chromatogram that a substance is pure?'),
        [bi('Ганцхан толбо өгнө', 'It gives only one spot'), bi('Суурь шугам дээр үлдэнэ', 'It stays on the baseline'), bi('Хоёр толбо өгнө', 'It gives two spots'), bi('Rf нь 1-ээс их', 'Its Rf is greater than 1')],
        0,
        bi('Хольц нэгээс олон толбо өгнө.', 'A mixture gives more than one spot.')
      ),
      exitItem(
        bi('Суурь шугамыг яагаад харандаагаар зурдаг вэ?', 'Why is the baseline drawn in pencil?'),
        [bi('Харандаа уусгагчид уусдаггүй', 'Pencil does not dissolve in the solvent'), bi('Илүү тод харагдана', 'It is easier to see'), bi('Бэх хурдан хатдаг', 'Ink dries too fast'), bi('Харандаа толбыг татна', 'Pencil attracts the spots')],
        0,
        bi('Бэх уусч, бусад будгийн хамт салж явна.', 'Ink would dissolve and separate with the other dyes.')
      ),
      exitItem(
        bi('(E) Өнгөгүй амин хүчлийг хроматограмм дээр яаж харах вэ?', '(E) How can colourless amino acids be seen on a chromatogram?'),
        [bi('Илрүүлэх бодис цацна', 'Spray with a locating agent'), bi('Бэхээр будна', 'Colour them with ink'), bi('Цаасыг усанд дүрнэ', 'Dip the paper in water'), bi('Шүүнэ', 'Filter them')],
        0,
        bi('Цацаад хатааж/халаахад толбо өнгөтэй болно.', 'After spraying and drying/heating the spots become coloured.')
      )
    ],
    ID
  )
];

export const IG12_GLOSSARY_A: Record<string, GlossaryTerm[]> = {
  'ig12-1': [
    term(bi('уусгагч / уусах бодис / уусмал', 'solvent / solute / solution'), bi('Уусгадаг шингэн / ууссан бодис / үүссэн хольц.', 'The liquid that dissolves / the substance dissolved / the mixture formed.')),
    term(bi('ханасан уусмал', 'saturated solution'), bi('Тухайн температурт уусах бодисын хамгийн их концентрацтай уусмал.', 'A solution that contains the maximum concentration of solute at that temperature.')),
    term(bi('үлдэгдэл / шүүдэс', 'residue / filtrate'), bi('Шүүх цаасанд үлдсэн хатуу бодис / нэвтэрсэн шингэн.', 'The solid left in the filter paper / the liquid that passes through.')),
    term(bi('нэрмэл', 'distillate'), bi('Нэрэлтийн дараа цуглуулсан шингэн.', 'The liquid collected after distillation.'))
  ],
  'ig12-2': [
    term(bi('Rf утга', 'Rf value'), bi('Бодисын явсан зай ÷ уусгагчийн фронтын явсан зай.', 'Distance moved by the substance ÷ distance moved by the solvent front.')),
    term(bi('илрүүлэх бодис (E)', 'locating agent (E)'), bi('Хроматограмм дээрх өнгөгүй толбыг харагдуулдаг бодис.', 'A substance that makes colourless spots visible on a chromatogram.'))
  ]
};

export const IG12_PRACTICE_A: Record<string, PracticeItem[]> = {
  'ig12-1': [
    easy(
      bi('Хийн эзэлхүүнийг ямар багажаар хэмжих вэ?', 'Which apparatus measures the volume of a gas?'),
      [bi('Бюретка', 'Burette'), bi('Хийн тариур', 'Gas syringe'), bi('Пипетка', 'Pipette'), bi('Жин', 'Balance')],
      1,
      bi('Хийн эзэлхүүн cm³-ээр хийн тариураар.', 'Gas volume in cm³ with a gas syringe.')
    ),
    easy(
      bi('Зэс(II) сульфатын талстыг уусмалаас нь ямар аргаар гаргах вэ?', 'Which method obtains copper(II) sulfate crystals from its solution?'),
      [bi('Шүүх', 'Filtration'), bi('Талсжуулах', 'Crystallisation'), bi('Фракцаар нэрэх', 'Fractional distillation'), bi('Соронз', 'A magnet')],
      1,
      bi('Уусдаг хатуу бодисыг уусмалаас – талсжуулах.', 'A soluble solid from a solution – crystallisation.')
    ),
    hard(
      bi('Энгийн нэрэлтэд хөргөгч ба термометрийг хэрхэн байрлуулах, яагаад гэдгийг тайлбарла.', 'Explain how the condenser and the thermometer are set up in simple distillation, and why.'),
      bi('Хөргөгчийн ус доороос орж дээрээс гарна – хөргөгч бүрэн дүүрч хамгийн сайн хөргөнө. Термометрийн бөмбөлөг хажуу хоолойн түвшинд – уурын буцлах цэгийг хэмжинэ. Буцалгах мөхлөг жигд буцалгана.', 'Condenser water enters at the bottom and leaves at the top – the condenser stays full and cools best. The thermometer bulb is level with the side arm – it measures the boiling point of the vapour. Anti-bumping granules give smooth boiling.'),
      bi('Термометрийг уусмалд дүрвэл буруу.', 'Dipping the thermometer in the solution is wrong.')
    )
  ],
  'ig12-2': [
    easy(
      bi('Уусгагч 2.8 cm, толбо 2.3 cm явсан. Rf (2 аравтын орон)?', 'The solvent front moved 2.8 cm and a spot moved 2.3 cm. Calculate Rf (2 d.p.).'),
      [bi('0.82', '0.82'), bi('1.22', '1.22'), bi('0.50', '0.50'), bi('2.3 cm', '2.3 cm')],
      0,
      bi('2.3 ÷ 2.8 = 0.82.', '2.3 ÷ 2.8 = 0.82.')
    ),
    easy(
      bi('Хольц цэвэр усны буцлах цэгийг яах вэ?', 'How does an impurity change the boiling point of water?'),
      [bi('Бууруулна', 'Lowers it'), bi('Өсгөнө (100 °C-ээс дээш)', 'Raises it (above 100 °C)'), bi('Өөрчлөхгүй', 'No change'), bi('0 °C болгоно', 'Makes it 0 °C')],
      1,
      bi('Хайлах цэгийг харин бууруулна.', 'The melting point, by contrast, is lowered.')
    ),
    hard(
      bi('Давс ба элсний хольцоос цэвэр, хуурай давсыг хэрхэн гаргахыг тайлбарла. [4]', 'Describe how to obtain pure, dry salt from a mixture of salt and sand. [4]'),
      bi('Ус нэмж хутгаад давсыг уусгана (1); шүүнэ – элс үлдэгдэл (1); шүүдсийг талсжих цэг хүртэл халааж ууршуулна (1); хөргөөд талстыг шүүж хатаана (1).', 'Add water and stir to dissolve the salt (1); filter – sand is the residue (1); heat the filtrate to crystallisation point / evaporate (1); cool, filter and dry the crystals (1).'),
      bi('"Хуурай болтол ууршуулна" гэвэл оноо алдана.', '"Evaporate to dryness" loses the mark.')
    )
  ]
};
