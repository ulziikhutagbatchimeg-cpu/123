import type { ExamQuestion } from '../types/chemistry';
import { topUp } from './topUpBuild';

// IGCSE 0620 chapters 6 Chemical reactions and 7 Acids, bases and salts: medium and hard questions for the topic quizzes.
// Original questions in the style of the teacher's decks Ch08–Ch12.
const t61 = topUp('s-6-1', 'ch-reactions', '0620/6.1');
const t62 = topUp('top-8-1', 'ch-reactions', '0620/6.2');
const t63 = topUp('s-6-3', 'ch-reactions', '0620/6.3');
const t64 = topUp('s-6-4', 'ch-reactions', '0620/6.4');
const t71 = topUp('s-7-1', 'ch-acids-bases', '0620/7.1');
const t72 = topUp('s-7-2', 'ch-acids-bases', '0620/7.2');
const t73 = topUp('top-7-1', 'ch-acids-bases', '0620/7.3');

export const TOP_UP_IG_06: ExamQuestion[] = [
  // 6.1 Physical and chemical changes
  t61('m', 'Melting ice', 'Мөс хайлах',
    'Why is melting ice a physical change?', 'Мөс хайлах нь яагаад физик өөрчлөлт вэ?',
    [['No new substance forms and it is easily reversed', 'Шинэ бодис үүсэхгүй, амархан буцна'], ['Heat is taken in', 'Дулаан шингээнэ'], ['The water changes colour', 'Ус өнгө өөрчилнө'], ['A gas is given off', 'Хий ялгарна']], 'A',
    'Ice and water are the same substance, H₂O, in different states.', 'Мөс ба ус нь өөр төлөвт байгаа ижил бодис H₂O.'),
  t61('h', 'Dissolving sugar', 'Элсэн чихэр уусах',
    'A student says: "Dissolving sugar in water is a chemical change because the sugar disappears." Evaluate this.', 'Сурагч: "Элсэн чихэр усанд уусах нь химийн өөрчлөлт, учир нь чихэр алга болдог." Үүнийг үнэлнэ үү.',
    [['Correct: a new substance forms', 'Зөв: шинэ бодис үүснэ'], ['Incorrect: it is a physical change; the sugar can be recovered by evaporating the water', 'Буруу: физик өөрчлөлт; усыг ууршуулж чихрийг буцааж авч болно'], ['Correct: the mass changes', 'Зөв: масс өөрчлөгдөнө'], ['Incorrect: sugar does not dissolve', 'Буруу: чихэр уусдаггүй']], 'B',
    'The sugar particles spread out between water particles but are unchanged.', 'Чихрийн бөөмс усны бөөмсийн хооронд тархах боловч өөрчлөгдөхгүй.'),
  t61('m', 'Not proof of a reaction', 'Урвалын нотолгоо биш',
    'Which observation on its own does NOT show that a chemical reaction has happened?', 'Аль ажиглалт дангаараа химийн урвал явагдсаныг харуулахгүй вэ?',
    [['A gas is given off when two solutions mix', 'Хоёр уусмал холиход хий ялгарах'], ['A solid melts', 'Хатуу бодис хайлах'], ['A precipitate forms', 'Тунадас үүсэх'], ['The colour changes permanently', 'Өнгө байнга өөрчлөгдөх']], 'B',
    'Melting is a change of state: no new substance forms.', 'Хайлах нь төлөвийн өөрчлөлт: шинэ бодис үүсэхгүй.'),
  t61('h', 'Heating copper in air', 'Зэсийг агаарт халаах',
    'Copper turns black when heated in air and its mass increases. Why does the mass increase?', 'Зэсийг агаарт халаахад хар болж масс нь өснө. Масс яагаад өсдөг вэ?',
    [['Copper absorbs heat', 'Зэс дулаан шингээнэ'], ['Oxygen from the air combines with the copper to form copper(II) oxide', 'Агаарын хүчилтөрөгч зэстэй нэгдэж зэсийн(II) исэл үүсгэнэ'], ['The copper melts', 'Зэс хайлна'], ['Water from the air condenses on it', 'Агаарын ус түүн дээр конденсацлагдана']], 'B',
    'Mass is conserved: the extra mass is the oxygen that has joined the copper.', 'Масс хадгалагдана: нэмэгдсэн масс нь зэстэй нэгдсэн хүчилтөрөгч.'),

  // 6.2 Rate of reaction
  t62('m', 'Measuring rate with gas', 'Хийгээр хурд хэмжих',
    'Marble chips react with hydrochloric acid. Which measurement gives the rate of reaction?', 'Гантиг чулууны хэлтэрхий давсны хүчилтэй урвалд орно. Аль хэмжилт урвалын хурдыг өгөх вэ?',
    [['The volume of carbon dioxide collected each minute', 'Минут бүр цуглуулсан нүүрсхүчлийн хийн эзлэхүүн'], ['The final temperature only', 'Зөвхөн эцсийн температур'], ['The colour of the acid', 'Хүчлийн өнгө'], ['The size of the beaker', 'Аяганы хэмжээ']], 'A',
    'Rate is how much product forms (or reactant is used) per unit time.', 'Хурд нь нэгж хугацаанд үүсэх бүтээгдэхүүн (эсвэл зарцуулагдах урвалж).'),
  t62('h', 'A warmer reaction', 'Илүү бүлээн урвал',
    'The same reaction is done at 20 °C and at 40 °C with the same amounts of reactants. How do the gas-volume curves compare?', 'Ижил урвалыг ижил хэмжээний урвалжаар 20 °C ба 40 °C-т хийв. Хийн эзлэхүүний муруйнууд хэрхэн ялгаатай вэ?',
    [['At 40 °C the curve is steeper at the start but reaches the same final volume', '40 °C-т эхэндээ огцом боловч ижил эцсийн эзлэхүүнд хүрнэ'], ['At 40 °C more gas is made in the end', '40 °C-т эцэст нь илүү их хий үүснэ'], ['At 40 °C the curve is less steep', '40 °C-т муруй бага налуу'], ['The curves are the same', 'Муруйнууд ижил']], 'A',
    'Temperature changes how fast, not how much: the amount of reactant fixes the final volume.', 'Температур хэр хурдан болохыг өөрчилнө, хэр их болохыг биш: урвалжийн хэмжээ эцсийн эзлэхүүнийг тогтооно.'),
  t62('m', 'Why heating speeds a reaction', 'Халаалт яагаад урвалыг хурдасгадаг вэ',
    'Why does increasing the temperature increase the rate of reaction?', 'Температурыг өсгөхөд урвалын хурд яагаад өсдөг вэ?',
    [['The particles get bigger', 'Бөөмс томорно'], ['The particles move faster, so they collide more often and more collisions have enough energy', 'Бөөмс хурдан хөдөлж, олон мөргөлдөж, илүү олон мөргөлдөөн хангалттай энергитэй болно'], ['The activation energy increases', 'Идэвхжлийн энерги өснө'], ['More product is made', 'Илүү их бүтээгдэхүүн үүснэ']], 'B',
    'Both the collision frequency and the share of successful collisions rise.', 'Мөргөлдөөний давтамж ба амжилттай мөргөлдөөний хувь хоёулаа өснө.'),
  t62('h', 'More marble', 'Илүү их гантиг',
    'The mass of marble chips is doubled while the acid stays in excess. What happens to the total volume of gas produced?', 'Хүчил илүүдэлтэй хэвээр, гантигийн массыг хоёр дахин нэмэв. Үүсэх хийн нийт эзлэхүүн яах вэ?',
    [['It stays the same', 'Ижил хэвээр'], ['It doubles', 'Хоёр дахин өснө'], ['It halves', 'Хоёр дахин буурна'], ['It becomes zero', 'Тэг болно']], 'B',
    'The marble is the limiting reactant, so twice as much gives twice the carbon dioxide.', 'Гантиг хязгаарлагч урвалж тул хоёр дахин их нь хоёр дахин их нүүрсхүчлийн хий өгнө.'),

  // 6.3 Reversible reactions and equilibrium
  t63('m', 'Water and copper(II) sulfate', 'Ус ба зэсийн(II) сульфат',
    'Water is added to white anhydrous copper(II) sulfate. What is seen?', 'Цагаан усгүй зэсийн(II) сульфатад ус нэмэв. Юу ажиглагдах вэ?',
    [['It turns blue and gets warm', 'Цэнхэр болж бүлээснэ'], ['It turns pink', 'Ягаан болно'], ['It stays white', 'Цагаан хэвээр'], ['It gives off a gas', 'Хий ялгаруулна']], 'A',
    'The reverse of the endothermic dehydration is exothermic, and the hydrated salt is blue.', 'Эндотерм усгүйжилтийн урвуу нь экзотерм, усжилттай давс цэнхэр.'),
  t63('h', 'Pressure in the Haber process', 'Хаберын процесс дахь даралт',
    'For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), why does a higher pressure increase the yield of ammonia?', 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)-д өндөр даралт яагаад аммиакийн гарцыг өсгөдөг вэ?',
    [['The equilibrium shifts to the side with fewer gas molecules', 'Тэнцвэр цөөн хийн молекултай тал руу шилжинэ'], ['The reaction becomes exothermic', 'Урвал экзотерм болно'], ['The catalyst works better', 'Катализатор сайн ажиллана'], ['Ammonia becomes a liquid', 'Аммиак шингэн болно']], 'A',
    'Four molecules of gas form two, so the forward reaction lowers the pressure.', 'Дөрвөн хийн молекулаас хоёр үүсэх тул шууд урвал даралтыг бууруулна.'),
  t63('m', 'Heating ammonium chloride', 'Аммонийн хлоридыг халаах',
    'Solid ammonium chloride is heated in a tube; a white solid reappears at the cool top. Which equation shows this?', 'Хатуу аммонийн хлоридыг хоолойд халаав; хүйтэн дээд хэсэгт цагаан хатуу бодис дахин үүснэ. Аль тэгшитгэл үүнийг харуулах вэ?',
    [['NH₄Cl(s) ⇌ NH₃(g) + HCl(g)', 'NH₄Cl(s) ⇌ NH₃(g) + HCl(g)'], ['NH₄Cl(s) → N₂(g) + H₂(g) + Cl₂(g)', 'NH₄Cl(s) → N₂(g) + H₂(g) + Cl₂(g)'], ['NH₄Cl(s) → NH₄Cl(l)', 'NH₄Cl(s) → NH₄Cl(l)'], ['NH₃(g) + HCl(g) → NH₄Cl(aq)', 'NH₃(g) + HCl(g) → NH₄Cl(aq)']], 'A',
    'It decomposes when hot and the gases recombine when cool: a reversible reaction.', 'Халуунд задарч, хүйтэнд хийнүүд дахин нэгдэнэ: буцах урвал.'),
  t63('h', 'Testing for water', 'Ус шалгах',
    'Blue cobalt(II) chloride paper is used to test for water. What colour change shows that water is present?', 'Усыг шалгахад цэнхэр кобальтын(II) хлоридын цаас хэрэглэдэг. Ямар өнгөний өөрчлөлт ус байгааг харуулах вэ?',
    [['Blue to pink', 'Цэнхэрээс ягаан'], ['Pink to blue', 'Ягаанаас цэнхэр'], ['Blue to white', 'Цэнхэрээс цагаан'], ['White to blue', 'Цагаанаас цэнхэр']], 'A',
    'Anhydrous cobalt(II) chloride is blue; the hydrated form is pink. White to blue is the copper(II) sulfate test.', 'Усгүй кобальтын(II) хлорид цэнхэр; усжилттай нь ягаан. Цагаанаас цэнхэр нь зэсийн(II) сульфатын сорил.'),

  // 6.4 Redox
  t64('m', 'Oxidation and oxygen', 'Исэлдэлт ба хүчилтөрөгч',
    'In terms of oxygen, what is oxidation?', 'Хүчилтөрөгчийн хувьд исэлдэлт гэж юу вэ?',
    [['Gain of oxygen', 'Хүчилтөрөгч авах'], ['Loss of oxygen', 'Хүчилтөрөгч алдах'], ['Gain of hydrogen', 'Устөрөгч авах'], ['Gain of electrons', 'Электрон авах']], 'A',
    'Oxidation is gain of oxygen or loss of electrons; reduction is the opposite.', 'Исэлдэлт нь хүчилтөрөгч авах эсвэл электрон алдах; ангижрал эсрэгээрээ.'),
  t64('h', 'The reducing agent', 'Ангижруулагч',
    'In CuO + H₂ → Cu + H₂O, which substance is the reducing agent?', 'CuO + H₂ → Cu + H₂O-д аль бодис ангижруулагч вэ?',
    [['CuO', 'CuO'], ['H₂', 'H₂'], ['Cu', 'Cu'], ['H₂O', 'H₂O']], 'B',
    'Hydrogen takes the oxygen from copper(II) oxide, so it reduces it and is itself oxidised.', 'Устөрөгч зэсийн(II) ислээс хүчилтөрөгчийг авч ангижруулах ба өөрөө исэлдэнэ.'),
  t64('m', 'Iron in iron(III) oxide', 'Төмрийн(III) исэл дэх төмөр',
    'What is the oxidation number of iron in Fe₂O₃?', 'Fe₂O₃-д төмрийн исэлдэлтийн зэрэг хэд вэ?',
    [['+2', '+2'], ['+3', '+3'], ['+6', '+6'], ['−3', '−3']], 'B',
    '2x + 3(−2) = 0, so x = +3; the name iron(III) oxide says this too.', '2x + 3(−2) = 0, x = +3; нэр нь төмрийн(III) исэл гэж үүнийг заана.'),
  t64('h', 'Manganate(VII) decolourised', 'Манганат(VII) өнгөгүй болох',
    'Acidified potassium manganate(VII) turns from purple to colourless when a substance is added. What does this show about the substance?', 'Бодис нэмэхэд хүчилжүүлсэн калийн манганат(VII) нил ягаанаас өнгөгүй болов. Энэ бодисын талаар юуг харуулах вэ?',
    [['It is an oxidising agent', 'Исэлдүүлэгч'], ['It is a reducing agent', 'Ангижруулагч'], ['It is an acid', 'Хүчил'], ['It is a catalyst', 'Катализатор']], 'B',
    'The manganate(VII) is reduced, so the substance added must be a reducing agent.', 'Манганат(VII) ангижирсан тул нэмсэн бодис ангижруулагч байх ёстой.'),

  // 7.1 Acids and bases
  t71('m', 'Universal indicator', 'Универсал индикатор',
    'What colour is universal indicator in a solution of pH 1?', 'pH 1 уусмалд универсал индикатор ямар өнгөтэй вэ?',
    [['Red', 'Улаан'], ['Green', 'Ногоон'], ['Blue', 'Цэнхэр'], ['Purple', 'Нил ягаан']], 'A',
    'Strong acids turn it red, neutral is green and strong alkalis purple.', 'Хүчтэй хүчил улаан, саармаг ногоон, хүчтэй шүлт нил ягаан болгоно.'),
  t71('h', 'Zinc carbonate and acid', 'Цайрын карбонат ба хүчил',
    'Zinc carbonate reacts with hydrochloric acid. What are the products?', 'Цайрын карбонат давсны хүчилтэй урвалд орно. Бүтээгдэхүүн нь юу вэ?',
    [['Zinc chloride and hydrogen', 'Цайрын хлорид ба устөрөгч'], ['Zinc chloride, water and carbon dioxide', 'Цайрын хлорид, ус ба нүүрсхүчлийн хий'], ['Zinc oxide and chlorine', 'Цайрын исэл ба хлор'], ['Zinc and carbonic acid', 'Цайр ба нүүрсний хүчил']], 'B',
    'Acid + carbonate → salt + water + carbon dioxide; hydrogen comes from a metal, not a carbonate.', 'Хүчил + карбонат → давс + ус + нүүрсхүчлийн хий; устөрөгч карбонатаас биш металлаас гарна.'),
  t71('m', 'The ion in alkalis', 'Шүлт дэх ион',
    'Which ion is present in all alkaline solutions?', 'Бүх шүлтлэг уусмалд ямар ион байдаг вэ?',
    [['H⁺', 'H⁺'], ['OH⁻', 'OH⁻'], ['Na⁺', 'Na⁺'], ['Cl⁻', 'Cl⁻']], 'B',
    'Alkalis are soluble bases that give hydroxide ions in water.', 'Шүлт нь усанд гидроксид ион өгөх уусдаг суурь.'),
  t71('h', 'Strong and weak acids', 'Хүчтэй, сул хүчил',
    'Hydrochloric acid and ethanoic acid have the same concentration. Why does ethanoic acid have a higher pH?', 'Давсны хүчил, цууны хүчил ижил концентрацитай. Цууны хүчил яагаад өндөр pH-тэй вэ?',
    [['It is more concentrated', 'Илүү өтгөн'], ['It only partly ionises, so it gives fewer H⁺ ions', 'Зөвхөн хэсэгчлэн ионждог тул цөөн H⁺ ион өгнө'], ['It contains OH⁻ ions', 'OH⁻ ион агуулна'], ['It is a base', 'Суурь']], 'B',
    'A weak acid is partly dissociated; a strong acid is fully dissociated.', 'Сул хүчил хэсэгчлэн, хүчтэй хүчил бүрэн диссоциацлагдана.'),

  // 7.2 Oxides
  t72('m', 'A neutral oxide', 'Саармаг исэл',
    'Which oxide is neutral?', 'Аль исэл саармаг вэ?',
    [['Carbon monoxide', 'Нүүрстөрөгчийн дан исэл'], ['Carbon dioxide', 'Нүүрсхүчлийн хий'], ['Sulfur dioxide', 'Хүхрийн давхар исэл'], ['Calcium oxide', 'Кальцийн исэл']], 'A',
    'CO reacts with neither acids nor bases; CO₂ and SO₂ are acidic and CaO is basic.', 'CO хүчил, суурийн алинтай нь ч урвалд ордоггүй; CO₂, SO₂ хүчиллэг, CaO суурийн.'),
  t72('h', 'Zinc oxide', 'Цайрын исэл',
    'Zinc oxide reacts with hydrochloric acid and also with sodium hydroxide solution. What type of oxide is it?', 'Цайрын исэл давсны хүчилтэй ч, натрийн гидроксидын уусмалтай ч урвалд орно. Ямар төрлийн исэл вэ?',
    [['Acidic', 'Хүчиллэг'], ['Basic', 'Суурийн'], ['Neutral', 'Саармаг'], ['Amphoteric', 'Амфотер']], 'D',
    'Reacting with both acids and bases is what amphoteric means; aluminium oxide is another.', 'Хүчил, суурь хоёуланд урвалд орох нь амфотер гэсэн утга; хөнгөн цагааны исэл бас ийм.'),
  t72('m', 'Copper(II) oxide and acid', 'Зэсийн(II) исэл ба хүчил',
    'What forms when copper(II) oxide reacts with dilute sulfuric acid?', 'Зэсийн(II) исэл шингэрүүлсэн хүхрийн хүчилтэй урвалд ороход юу үүсэх вэ?',
    [['Copper(II) sulfate and water', 'Зэсийн(II) сульфат ба ус'], ['Copper and hydrogen', 'Зэс ба устөрөгч'], ['Copper(II) sulfate and hydrogen', 'Зэсийн(II) сульфат ба устөрөгч'], ['Copper(II) hydroxide', 'Зэсийн(II) гидроксид']], 'A',
    'A basic oxide + acid → salt + water.', 'Суурийн исэл + хүчил → давс + ус.'),
  t72('h', 'Classifying an oxide from pH', 'pH-аас ислийг ангилах',
    'An oxide dissolves in water to give a solution of pH 3. What is the oxide most likely to be?', 'Исэл усанд уусаж pH 3 уусмал өгнө. Энэ исэл юу байх магадлалтай вэ?',
    [['An acidic oxide of a non-metal', 'Металл бусын хүчиллэг исэл'], ['A basic oxide of a metal', 'Металлын суурийн исэл'], ['A neutral oxide', 'Саармаг исэл'], ['An amphoteric oxide of a metal', 'Металлын амфотер исэл']], 'A',
    'Soluble non-metal oxides such as SO₂ form acidic solutions.', 'SO₂ шиг уусдаг металл бусын исэл хүчиллэг уусмал үүсгэнэ.'),

  // 7.3 Preparation of salts
  t73('m', 'An insoluble salt', 'Уусдаггүй давс',
    'Which pair of solutions can be mixed to make insoluble barium sulfate?', 'Уусдаггүй барийн сульфат гаргахын тулд аль хос уусмалыг холих вэ?',
    [['Barium chloride and sodium sulfate', 'Барийн хлорид ба натрийн сульфат'], ['Barium sulfate and water', 'Барийн сульфат ба ус'], ['Sodium chloride and sulfuric acid', 'Натрийн хлорид ба хүхрийн хүчил'], ['Barium and copper(II) sulfate', 'Бари ба зэсийн(II) сульфат']], 'A',
    'Precipitation: Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s), then filter, wash and dry.', 'Тунадасжилт: Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s), дараа нь шүүж, угааж, хатаана.'),
  t73('h', 'Excess base', 'Илүүдэл суурь',
    'When making copper(II) sulfate from copper(II) oxide and sulfuric acid, why is the oxide added in excess and then filtered off?', 'Зэсийн(II) исэл, хүхрийн хүчлээс зэсийн(II) сульфат гаргахад ислийг яагаад илүүдэлтэй нэмээд шүүдэг вэ?',
    [['To make sure all the acid reacts, and to remove the unreacted oxide', 'Бүх хүчил урвалд орж, урвалд ороогүй ислийг зайлуулахын тулд'], ['To speed up the reaction', 'Урвалыг хурдасгахын тулд'], ['To make the salt insoluble', 'Давсыг уусдаггүй болгохын тулд'], ['To add water of crystallisation', 'Талстжилтын ус нэмэхийн тулд']], 'A',
    'The filtrate is then only copper(II) sulfate solution, ready to crystallise.', 'Шүүдэс нь зөвхөн зэсийн(II) сульфатын уусмал болж, талстжуулахад бэлэн.'),
  t73('m', 'A salt by titration', 'Титрлэлтээр давс',
    'Sodium chloride is made by titrating hydrochloric acid with sodium hydroxide. What is done after the exact volumes are found?', 'Давсны хүчлийг натрийн гидроксидоор титрлэж натрийн хлорид гаргана. Яг эзлэхүүнийг олсны дараа юу хийх вэ?',
    [['Mix the same volumes without indicator, then evaporate to crystallise', 'Индикаторгүйгээр ижил эзлэхүүнийг холиод ууршуулж талстжуулна'], ['Filter off the salt', 'Давсыг шүүж авна'], ['Add excess acid', 'Илүүдэл хүчил нэмнэ'], ['Heat the indicator', 'Индикаторыг халаана']], 'A',
    'Repeating without indicator gives a pure salt solution.', 'Индикаторгүй давтахад цэвэр давсны уусмал гарна.'),
  t73('h', 'Choosing a starting material', 'Эхлэх бодисыг сонгох',
    'Why is copper(II) sulfate made from copper(II) oxide rather than from copper metal and dilute sulfuric acid?', 'Зэсийн(II) сульфатыг яагаад зэс металл, шингэрүүлсэн хүхрийн хүчлээс биш зэсийн(II) ислээс гаргадаг вэ?',
    [['Copper does not react with dilute sulfuric acid', 'Зэс шингэрүүлсэн хүхрийн хүчилтэй урвалд ордоггүй'], ['Copper reacts too violently', 'Зэс хэт ширүүн урвалд орно'], ['Copper(II) oxide is soluble', 'Зэсийн(II) исэл уусдаг'], ['Copper is too expensive', 'Зэс хэт үнэтэй']], 'A',
    'Copper is below hydrogen in the reactivity series.', 'Зэс идэвхийн эгнээнд устөрөгчөөс доор байна.')
];
