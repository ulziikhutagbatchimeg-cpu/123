import type { ExamQuestion } from '../types/chemistry';
import { topicWriter } from './topicMcqBuild';

// More questions for 9701 AS chapter 1, Atomic structure, filed under its first subsection (al-1.1): multiple-choice
// questions and three open-ended tasks in the Paper 4 style, with mark schemes. They are original, written for the 9701
// syllabus (2025–2027); none is copied from a Cambridge paper.
const w = topicWriter('al-1.1', 'al-ch-1', '9701/1.1');

const tag = (q: ExamQuestion, taxonomy: NonNullable<ExamQuestion['taxonomy']>): ExamQuestion => ({ ...q, taxonomy });

const mcq = [
  tag(w(101, 'Relative atomic mass from isotopes', 'Изотопоос харьцангуй атомын масс',
    'Chlorine has two isotopes: chlorine-35 (75%) and chlorine-37 (25%). Which calculation gives the relative atomic mass of chlorine?',
    'Хлор хоёр изотоптой: хлор-35 (75%) ба хлор-37 (25%). Хлорын харьцангуй атомын массыг аль тооцоо өгөх вэ?',
    [['(35 + 37) ÷ 2 = 36', '(35 + 37) ÷ 2 = 36'], ['(35 × 75 + 37 × 25) ÷ 100 = 35.5', '(35 × 75 + 37 × 25) ÷ 100 = 35.5'], ['35 × 0.75 = 26.25', '35 × 0.75 = 26.25'], ['37 × 0.25 = 9.25', '37 × 0.25 = 9.25']],
    'B', 'Taking a simple mean, which ignores the abundances of the isotopes.', 'Изотопуудын элбэг байдлыг үл тооцсон энгийн дундаж авах.'), 'apply'),
  tag(w(102, 'Why isotopes react alike', 'Изотоп яагаад адил урвалд орох вэ',
    'Why do isotopes of the same element have the same chemical properties?',
    'Нэг элементийн изотопууд яагаад химийн адил шинжтэй вэ?',
    [['They have the same mass number', 'Массын тоо адил'], ['They have the same number of electrons, so the same outer electrons', 'Электроны тоо адил, тиймээс гаднах электрон адил'], ['They have the same number of neutrons', 'Нейтроны тоо адил'], ['They have the same mass', 'Масс адил']],
    'B', 'Thinking the mass, or the neutrons, control how an atom reacts.', 'Масс эсвэл нейтрон атомын урвалыг тодорхойлдог гэж бодох.'), 'analysis'),
  tag(w(103, 'Electrons in a positive ion', 'Эерэг ион дахь электрон',
    'An ion X²⁺ has 12 electrons. What is the proton number of element X?',
    'X²⁺ ион 12 электронтой. X элементийн протоны тоо хэд вэ?',
    [['10', '10'], ['12', '12'], ['14', '14'], ['16', '16']],
    'C', 'Subtracting the charge from the electrons, rather than adding it, which gives 10.', 'Цэнэгийг электронтой хасах, нэмэхийн оронд; энэ нь 10 өгнө.'), 'apply'),
  tag(w(104, 'Evaluating a claim about relative atomic mass', 'Харьцангуй атомын массын мэдэгдэл',
    'A student says: "Relative atomic mass is always a whole number because protons and neutrons each have a mass of 1." Evaluate this statement.',
    'Сурагч: "Протон, нейтрон хоёр тус бүр масс 1 тул харьцангуй атомын масс үргэлж бүхэл тоо." Энэ мэдэгдлийг үнэлнэ үү.',
    [['The statement is correct', 'Мэдэгдэл зөв'], ['The statement is partly wrong: relative atomic mass is a weighted average of the isotopes, so it is often not a whole number', 'Хэсэгчлэн буруу: харьцангуй атомын масс нь изотопуудын жинлэсэн дундаж тул ихэвчлэн бүхэл тоо биш'], ['The statement is correct, because electrons are included', 'Мэдэгдэл зөв, электроныг оруулсан учраас'], ['The statement is wrong: relative atomic mass is the proton number', 'Мэдэгдэл буруу: харьцангуй атомын масс нь протоны тоо']],
    'B', 'Treating every isotope as having the same mass.', 'Изотоп бүрийн масс адил гэж үзэх.'), 'evaluate'),
  tag(w(105, 'Shell energy', 'Бүрхүүлийн энерги',
    'Why do electrons in outer shells have higher energy than electrons in inner shells?',
    'Яагаад гаднах бүрхүүлийн электрон дотоод бүрхүүлийн электронаас өндөр энергитэй вэ?',
    [['Outer shells are filled at random', 'Гаднах бүрхүүл санамсаргүйгээр дүүрдэг'], ['They are further from the nucleus, so the attraction is weaker and they need more energy to be held', 'Цөмөөс хол тул татах хүч сул, барих энерги их хэрэгтэй'], ['They have fewer protons', 'Протон цөөн'], ['They are heavier', 'Хүнд']],
    'B', 'Thinking outer electrons are closer to the nucleus, which would make them more strongly attracted.', 'Гаднах электрон цөмд ойр гэж бодох, энэ нь илүү хүчтэй татагдана гэсэн үг.'), 'analysis'),
  tag(w(106, 'Electron configuration of an ion', 'Ионы электрон бүтэц',
    'Magnesium has proton number 12. Which is the electron configuration of the Mg²⁺ ion?',
    'Магнийн протоны тоо 12. Mg²⁺ ионы электрон бүтэц аль нь вэ?',
    [['1s² 2s² 2p⁶ 3s²', '1s² 2s² 2p⁶ 3s²'], ['1s² 2s² 2p⁶', '1s² 2s² 2p⁶'], ['1s² 2s² 2p⁶ 3s² 3p²', '1s² 2s² 2p⁶ 3s² 3p²'], ['1s² 2s² 2p⁴', '1s² 2s² 2p⁴']],
    'B', 'Keeping the 3s electrons in the ion, although a 2+ ion has lost both of them.', 'Ионд 3s электронуудыг үлдээх, гэтэл 2+ ион хоёуланг нь алдсан.'), 'apply'),
  tag(w(107, 'Evaluating a claim about electrons and mass', 'Электрон ба масс',
    'A student says: "Electrons have a mass of 1, so they count in the mass number just as protons do." Evaluate this statement.',
    'Сурагч: "Электрон масс 1 тул протонтой адил массын тоонд тооцогдоно." Энэ мэдэгдлийг үнэлнэ үү.',
    [['The statement is correct', 'Мэдэгдэл зөв'], ['The statement is wrong: an electron has a negligible mass, and the mass number counts only protons and neutrons', 'Мэдэгдэл буруу: электроны масс маш бага, массын тоо зөвхөн протон, нейтроныг тооцно'], ['The statement is correct, because electrons are heavier than protons', 'Мэдэгдэл зөв, электрон протоноос хүнд учраас'], ['The statement is wrong: the mass number counts electrons only', 'Мэдэгдэл буруу: массын тоо зөвхөн электроныг тооцно']],
    'B', 'Thinking an electron counts as much as a proton in the mass number.', 'Массын тоонд электрон протонтой адил тооцогдоно гэж бодох.'), 'evaluate'),
  tag(w(108, 'Mass number', 'Массын тоо',
    'An atom has 26 protons and 30 neutrons. What is its mass number?',
    'Атомд 26 протон, 30 нейтрон байна. Массын тоо нь хэд вэ?',
    [['26', '26'], ['30', '30'], ['56', '56'], ['4', '4']],
    'C', 'Giving the proton number as the mass number, or subtracting the neutrons.', 'Протоны тоог массын тоо гэж авах эсвэл нейтроныг хасах.'), 'apply'),
  tag(w(109, 'Two peaks for chlorine', 'Хлорын хоёр оргил',
    'A mass spectrum of chlorine shows two peaks, at mass 35 and mass 37. What does this show?',
    'Хлорын масс спектрт масс 35 ба масс 37-д хоёр оргил гарна. Энэ юуг харуулах вэ?',
    [['Chlorine has two isotopes with different masses', 'Хлор өөр масстай хоёр изотоптой'], ['Chlorine forms two different molecules', 'Хлор хоёр өөр молекул үүсгэдэг'], ['Chlorine has two different proton numbers', 'Хлор хоёр өөр протоны тоотой'], ['The spectrometer has a fault', 'Спектрометр эвдэрсэн']],
    'A', 'Thinking the two peaks come from two different elements or from a fault in the instrument.', 'Хоёр оргилыг хоёр өөр элементээс эсвэл багажийн согог гэж бодох.'), 'analysis'),
  tag(w(110, 'Neutrons in chlorine-37', 'Хлор-37 дахь нейтрон',
    'How many neutrons are there in one atom of chlorine-37? (Chlorine has proton number 17.)',
    'Хлор-37-ийн нэг атомд хэдэн нейтрон байна вэ? (Хлорын протоны тоо 17.)',
    [['17', '17'], ['20', '20'], ['37', '37'], ['18', '18']],
    'B', 'Using the mass number as the number of neutrons, which gives 37, or taking 18 as the difference.', 'Массын тоог нейтрон гэж авч 37 гаргах эсвэл зөрүүг 18 гэж авах.'), 'apply')
];

const structured: ExamQuestion[] = [
  {
    id: 'al-1.1-s1',
    topicId: 'al-1.1',
    chapterId: 'al-ch-1',
    syllabusRef: '9701/1.1',
    paper: 'Paper 4',
    difficulty: 'medium',
    taxonomy: 'analysis',
    totalMarks: 2,
    titleEn: 'Why relative atomic mass is not a whole number',
    titleMn: 'Харьцангуй атомын масс яагаад бүхэл тоо биш вэ',
    questionTextEn: 'Explain why the relative atomic mass of an element is often not a whole number.',
    questionTextMn: 'Элементийн харьцангуй атомын масс яагаад ихэвчлэн бүхэл тоо биш байдгийг тайлбарлана уу.',
    type: 'structured',
    markScheme: [
      { pointIndex: 1, criterionEn: 'Relative atomic mass is the weighted average of the masses of the isotopes [1].', criterionMn: 'Харьцангуй атомын масс нь изотопуудын массын жинлэсэн дундаж [1].', marks: 1 },
      { pointIndex: 2, criterionEn: 'The isotopes occur in different abundances, so the average is not a whole number [1].', criterionMn: 'Изотопууд янз бүрийн элбэгтэй тул дундаж бүхэл тоо биш [1].', marks: 1 }
    ],
    misconceptionDiagnosisEn: 'Saying that each isotope has a non-integer mass, rather than that the average is weighted by abundance.',
    misconceptionDiagnosisMn: 'Изотоп бүр бүхэл биш масстай гэж хэлэх, харин дундаж элбэг байдлаар жинлэгддэгийг мартах.',
    remediationTopicId: 'al-1.1'
  },
  {
    id: 'al-1.1-s2',
    topicId: 'al-1.1',
    chapterId: 'al-ch-1',
    syllabusRef: '9701/1.1',
    paper: 'Paper 4',
    difficulty: 'medium',
    taxonomy: 'apply',
    totalMarks: 3,
    titleEn: 'Relative atomic mass from abundances',
    titleMn: 'Элбэг байдлаас харьцангуй атомын масс',
    questionTextEn: 'Element M has two isotopes: M-69 (60%) and M-71 (40%). Calculate the relative atomic mass of M to one decimal place.',
    questionTextMn: 'M элемент хоёр изотоптой: M-69 (60%) ба M-71 (40%). M-ийн харьцангуй атомын массыг аравтын нэг хүртэл тооцоол.',
    type: 'structured',
    markScheme: [
      { pointIndex: 1, criterionEn: 'Uses the abundances as weights: (69 × 60 + 71 × 40) ÷ 100 [1].', criterionMn: 'Элбэг байдлыг жин болгон ашиглах: (69 × 60 + 71 × 40) ÷ 100 [1].', marks: 1 },
      { pointIndex: 2, criterionEn: 'Correct arithmetic: 41.4 + 28.4 = 69.8 [1].', criterionMn: 'Зөв тооцоо: 41.4 + 28.4 = 69.8 [1].', marks: 1 },
      { pointIndex: 3, criterionEn: 'Gives the answer to one decimal place: 69.8 [1].', criterionMn: 'Хариултыг аравтын нэг хүртэл өгөх: 69.8 [1].', marks: 1 }
    ],
    misconceptionDiagnosisEn: 'Taking a simple mean of 69 and 71, which gives 70, instead of weighting by abundance.',
    misconceptionDiagnosisMn: '69 ба 71-ийн энгийн дундажийг (70) элбэг байдлаар жинлэхгүй авах.',
    remediationTopicId: 'al-1.1'
  },
  {
    id: 'al-1.1-s3',
    topicId: 'al-1.1',
    chapterId: 'al-ch-1',
    syllabusRef: '9701/1.1',
    paper: 'Paper 4',
    difficulty: 'hard',
    taxonomy: 'analysis',
    totalMarks: 4,
    titleEn: 'Second ionisation energy of sodium',
    titleMn: 'Натрийн хоёрдугаар ионжих энерги',
    questionTextEn: 'Sodium has a first ionisation energy of 496 kJ/mol and a second ionisation energy of 4562 kJ/mol. Explain, in terms of electrons and the nucleus, why the second value is much larger.',
    questionTextMn: 'Натрийн анхны ионжих энерги 496 кДж/моль, хоёрдугаар нь 4562 кДж/моль. Хоёрдугаар утга яагаад хамаагүй их байгааг электрон ба цөмийн талаас тайлбарлана уу.',
    type: 'structured',
    markScheme: [
      { pointIndex: 1, criterionEn: 'The second electron is removed from an ion that already has lost one electron, so the ion is more positive [1].', criterionMn: 'Хоёрдугаар электронийг аль хэдийн нэг электрон алдсан ионоос авна, тиймээс ион илүү эерэг [1].', marks: 1 },
      { pointIndex: 2, criterionEn: 'The second electron is removed from the inner shell, which is full and closer to the nucleus [1].', criterionMn: 'Хоёрдугаар электронийг цөмд ойр, дүүрсэн дотоод бүрхүүлээс авна [1].', marks: 1 },
      { pointIndex: 3, criterionEn: 'The attraction between the nucleus and this electron is stronger, because there is less shielding [1].', criterionMn: 'Цөм ба энэ электроны хоорондын татах хүч хүчтэй, учир нь далдлалт бага [1].', marks: 1 },
      { pointIndex: 4, criterionEn: 'Much more energy is needed to remove it, so the value is much larger [1].', criterionMn: 'Түүнийг авахад илүү их энерги хэрэгтэй тул утга хамаагүй их [1].', marks: 1 }
    ],
    misconceptionDiagnosisEn: 'Saying that the second electron is simply removed from the same shell, with no change in the attraction of the nucleus.',
    misconceptionDiagnosisMn: 'Хоёрдугаар электронийг ижил бүрхүүлээс авна, цөмийн татах хүчинд өөрчлөлт байхгүй гэж хэлэх.',
    remediationTopicId: 'al-1.1'
  }
];

export const ALEVEL_CHAPTER1_EXTRA: ExamQuestion[] = [...mcq, ...structured];
