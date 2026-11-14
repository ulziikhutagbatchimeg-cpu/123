import type { GlossaryEntry } from './alevelGlossaryPart1';

// 9701 key terms that the first coursebook pass missed (capital letters, possessives, or multi-word bold phrases), with their
// definitions in Mongolian and English. Each term is also added to the chapter's key-term checklist (alevelKeyTerms.ts).
// A term the chapter already has is skipped when the lists are joined. AS chapters 12 and 19 to 22 have no coursebook list,
// so their terms here, written from the syllabus objectives, are the whole checklist.
export const ALEVEL_GLOSSARY_EXTRA: Record<string, GlossaryEntry[]> = {
  'al-ch-1': [
    { term: { mn: 'нуклон', en: 'nucleon' }, def: { mn: 'Цөмд байгаа протон эсвэл нейтрон.', en: 'A proton or a neutron, the particles in the nucleus.' } },
    { term: { mn: 'саармаг атом', en: 'neutral atom' }, def: { mn: 'Протон ба электроны тоо тэнцүү, тиймээс цахилгаан цэнэггүй атом.', en: 'An atom with equal numbers of protons and electrons, so it has no overall charge.' } },
  ],
  'al-ch-2': [
    { term: { mn: 'Авогадрогийн тогтмол', en: 'Avogadro constant' }, def: { mn: 'Нэг моль дахь бөөмийн тоо, 6.02 × 10²³ моль⁻¹.', en: 'The number of particles in one mole of a substance, 6.02 × 10²³ mol⁻¹.' } },
    { term: { mn: 'молекулын томьёо', en: 'molecular formula' }, def: { mn: 'Молекул дахь элемент бүрийн атомын жинхэнэ тоо; эмпирик томьёоны үржвэр байна.', en: 'The actual number of atoms of each element in one molecule; it is a multiple of the empirical formula.' } },
  ],
  'al-ch-3': [
    { term: { mn: 'ван дер Ваальсын хүч', en: "van der Waals' forces" }, def: { mn: 'Бүх молекулын хооронд үүсэх сул таталцлын хүч; түр зуурын диполь үүсэхтэй холбоотой, электроны тоо их байх тусам хүч нэмэгдэнэ.', en: 'Weak attractive forces between all molecules, arising from temporary dipoles; they grow stronger as the number of electrons increases.' } },
    { term: { mn: 'металлын холбоо', en: 'metallic bond' }, def: { mn: 'Эерэг металл ион ба делокалчлагдсан электронуудын хооронд үүсэх цахилгаан статик таталцал.', en: 'The electrostatic attraction between the positive metal ions and the delocalised electrons.' } },
  ],
  'al-ch-5': [
    { term: { mn: 'Хессийн хууль', en: "Hess's law" }, def: { mn: 'Урвалын энтальпийн өөрчлөлт нь урвал аль ч замаар явагдсанаас үл хамаарна; алхам бүрийн энтальпийн нийлбэртэй тэнцүү.', en: 'The enthalpy change of a reaction is the same whatever route is taken; it equals the sum of the enthalpy changes of the steps.' } },
    { term: { mn: 'стандарт энтальпийн өөрчлөлт (урвал)', en: 'standard enthalpy change of reaction' }, def: { mn: 'Стандарт нөхцөлд, урвалын тэгшитгэлд заасан моль тооны урвалын энтальпийн өөрчлөлт.', en: 'The enthalpy change when the molar quantities in the equation react under standard conditions.' } },
    { term: { mn: 'стандарт энтальпийн өөрчлөлт (үүсэх)', en: 'standard enthalpy change of formation' }, def: { mn: 'Стандарт нөхцөлд 1 моль нэгдэл, элементүүдээс үүсэх энтальпийн өөрчлөлт.', en: 'The enthalpy change when 1 mole of a compound is formed from its elements in their standard states.' } },
    { term: { mn: 'стандарт энтальпийн өөрчлөлт (шатах)', en: 'standard enthalpy change of combustion' }, def: { mn: 'Стандарт нөхцөлд 1 моль бодис хүчилтөрөгчтэй бүрэн шатах үеийн энтальпийн өөрчлөлт.', en: 'The enthalpy change when 1 mole of a substance burns completely in oxygen under standard conditions.' } },
    { term: { mn: 'стандарт энтальпийн өөрчлөлт (саармагжилт)', en: 'standard enthalpy change of neutralisation' }, def: { mn: 'Хүчил ба суурь урвалд орж 1 моль ус үүсэх үеийн энтальпийн өөрчлөлт.', en: 'The enthalpy change when an acid and a base react to form 1 mole of water.' } },
  ],
  'al-ch-6': [
    { term: { mn: 'исэлдүүлэгч', en: 'oxidising agent' }, def: { mn: 'Өөр бодисыг исэлдүүлдэг, өөрөө бууралтад орох бодис (электрон хүлээн авдаг).', en: 'A substance that oxidises another substance, and is itself reduced by accepting electrons.' } },
    { term: { mn: 'бууруулагч', en: 'reducing agent' }, def: { mn: 'Өөр бодисыг бууруулдаг, өөрөө исэлдэх бодис (электрон өгдөг).', en: 'A substance that reduces another substance, and is itself oxidised by giving up electrons.' } },
  ],
  'al-ch-7': [
    { term: { mn: 'Ле Шателийн зарчим', en: "Le Chatelier's principle" }, def: { mn: 'Тэнцвэрт системд нөлөө үзүүлбэл систем тэр нөлөөг бууруулах чиглэлд тэнцвэрээ шилжүүлнэ.', en: 'If a change is made to a system in equilibrium, the position of equilibrium shifts to oppose that change.' } },
  ],
  'al-ch-8': [
    { term: { mn: 'Больцманы тархалт', en: 'Boltzmann distribution' }, def: { mn: 'Тодорхой температурт бөөмсийн энергийн тархалтын муруй; урвалд орох хангалттай энергитэй бөөмийн эзлэх хувийг харуулна.', en: 'The spread of particle energies at a given temperature; it shows the fraction of particles with at least the activation energy.' } },
  ],
  'al-ch-9': [
    { term: { mn: 'цахилгаан дамжуулах чанар', en: 'electrical conductivity' }, def: { mn: 'Бодис цахилгаан гүйдлийг дамжуулах чадвар; металл делокалчлагдсан электроноор дамжуулна.', en: 'The ability of a substance to conduct electricity; metals do so through their delocalised electrons.' } },
  ],
  'al-ch-11': [
    { term: { mn: 'галид', en: 'halide' }, def: { mn: 'Галогений ион (F⁻, Cl⁻, Br⁻, I⁻) эсвэл түүнийг агуулсан нэгдэл.', en: 'A halogen ion (F⁻, Cl⁻, Br⁻ or I⁻) or a compound containing one.' } },
  ],
  'al-ch-13': [
    { term: { mn: 'стереоизомер', en: 'stereoisomer' }, def: { mn: 'Атомын холбогдох дараалал ижил, гэхдээ орон зайд байрлал нь өөр изомер.', en: 'An isomer in which the atoms are bonded in the same order but arranged differently in space.' } },
    { term: { mn: 'нэмэлтийн урвал', en: 'addition reaction' }, def: { mn: 'Энгийн молекул давхар холбоотой молекулын C=C холбоонд нэмэгдэх урвал.', en: 'A reaction in which a simple molecule adds across a C=C double bond.' } },
    { term: { mn: 'задралын урвал', en: 'elimination reaction' }, def: { mn: 'Молекулаас жижиг молекул (жишээ нь H₂O эсвэл HBr) зайлуулж давхар холбоо үүсгэх урвал.', en: 'A reaction in which a small molecule, such as H₂O or HBr, is removed from a molecule to form a double bond.' } },
    { term: { mn: 'орлуулалтын урвал', en: 'substitution reaction' }, def: { mn: 'Молекулын атом эсвэл бүлгийг өөр атом эсвэл бүлгээр солих урвал.', en: 'A reaction in which an atom or group in a molecule is replaced by a different atom or group.' } },
    { term: { mn: 'конденсацийн урвал', en: 'condensation reaction' }, def: { mn: 'Хоёр молекул холбогдож, жижиг молекул (ихэвчлэн ус) ялгарах урвал.', en: 'A reaction in which two molecules join together and a small molecule, usually water, is released.' } },
  ],
  'al-ch-17': [
    { term: { mn: 'Толлений урвалж', en: "Tollens' reagent" }, def: { mn: 'Аммиакт мөнгөн нитрат; альдегидийг исэлдүүлж, мөнгөн толь үүсгэдэг урвалж.', en: 'Ammoniacal silver nitrate, which oxidises aldehydes and forms a silver mirror.' } },
    { term: { mn: 'Фелингийн уусмал', en: 'Fehling’s solution' }, def: { mn: 'Зэсийн(II) ионтой уусмал; альдегидийг исэлдүүлж, улаан зэсийн(I) оксидын тунадас үүсгэдэг.', en: 'An alkaline solution of copper(II) ions, which oxidises aldehydes and forms a red precipitate of copper(I) oxide.' } },
    { term: { mn: 'хазайсан үр дүн', en: 'anomalous result' }, def: { mn: 'Цувралын бусадаас хэт их эсвэл бага байгаа үр дүн; ихэвчлэн дундаж тооцоонд оруулахгүй.', en: 'A result that is much larger or smaller than the others; it is usually left out of the mean.' } },
  ],
  'al-ch-12': [
    { term: { mn: 'гурвалсан холбоо', en: 'triple bond' }, def: { mn: 'N≡N холбоо маш бат бөгөөд туйлгүй тул азотын молекул идэвхгүй байдаг.', en: 'The N≡N bond is very strong and non-polar, which makes nitrogen gas unreactive.' } },
    { term: { mn: 'Бронстед–Лоури суурь', en: 'Brønsted–Lowry base' }, def: { mn: 'Протон (H⁺) хүлээн авагч; аммиак азотын атомын бие даасан электрон хосоор протон холбоно.', en: 'A proton (H⁺) acceptor; ammonia accepts a proton using the lone pair on its nitrogen atom.' } },
    { term: { mn: 'аммонийн ион', en: 'ammonium ion' }, def: { mn: 'NH₄⁺; аммиак протон хүлээн авахад үүсэх ион.', en: 'NH₄⁺, formed when ammonia accepts a proton.' } },
    { term: { mn: 'азотын ислүүд (NOₓ)', en: 'oxides of nitrogen (NOₓ)' }, def: { mn: 'NO ба NO₂; дотоод шаталтын хөдөлгүүрт агаарын азот ба хүчилтөрөгч өндөр температурт урвалд орж үүснэ.', en: 'NO and NO₂, formed in internal combustion engines when nitrogen and oxygen in the air react at high temperature.' } },
    { term: { mn: 'хүчиллэг бороо', en: 'acid rain' }, def: { mn: 'Хүхрийн диоксид ба азотын ислүүд усанд уусч хүчил үүсгэснээр хүчиллэг болсон бороо.', en: 'Rain made acidic when sulfur dioxide and oxides of nitrogen dissolve in water to form acids.' } },
    { term: { mn: 'фотохимийн утаа', en: 'photochemical smog' }, def: { mn: 'NO₂ ба шаталтгүй үлдсэн нүүрсустөрөгчид нарны гэрэлд урвалд орж үүсэх утаа; PAN агуулна.', en: 'Smog formed when NO₂ reacts with unburned hydrocarbons in sunlight; it contains PAN.' } },
    { term: { mn: 'катализаторт хөрвүүлэгч', en: 'catalytic converter' }, def: { mn: 'Хөдөлгүүрийн утаанд байгаа азотын оксидыг катализатор ашиглан азотын хий болгон бууруулах төхөөрөмж.', en: 'A part of the exhaust system that uses a catalyst to convert oxides of nitrogen into nitrogen gas.' } },
    { term: { mn: 'аммонийн давс', en: 'ammonium salt' }, def: { mn: 'NH₄⁺ ионтой давс, жишээ нь NH₄Cl; шүлттэй халаахад хүчил-суурийн урвалаар аммиак ялгарна: NH₄⁺ + OH⁻ → NH₃ + H₂O.', en: 'A salt containing the NH₄⁺ ion, such as NH₄Cl; warmed with an alkali it gives off ammonia in an acid–base reaction: NH₄⁺ + OH⁻ → NH₃ + H₂O.' } },
    { term: { mn: 'пероксиацетил нитрат (PAN)', en: 'peroxyacetyl nitrate (PAN)' }, def: { mn: 'Азотын ислүүд шатаагүй нүүрсустөрөгчтэй нарны гэрэлд урвалд орж үүсдэг бодис; фотохимийн утааны хортой бүрэлдэхүүн.', en: 'A compound formed when oxides of nitrogen react with unburned hydrocarbons in sunlight; a harmful part of photochemical smog.' } },
  ],
  'al-ch-19': [
    { term: { mn: 'анхдагч амин', en: 'primary amine' }, def: { mn: 'Азотын атом нэг нүүрстөрөгчтэй холбогдсон, –NH₂ бүлэгтэй нэгдэл.', en: 'A compound with an –NH₂ group, in which the nitrogen is bonded to one alkyl group.' } },
    { term: { mn: 'хоёрдогч амин', en: 'secondary amine' }, def: { mn: 'Азот хоёр алкил бүлэгтэй холбогдсон амин; галогеналкан илүүдэлтэй байхад анхдагч амин цааш урвалд орж үүснэ.', en: 'An amine whose nitrogen is bonded to two alkyl groups; it forms when the primary amine reacts further with excess halogenoalkane.' } },
    { term: { mn: 'нитрил', en: 'nitrile' }, def: { mn: '–C≡N бүлэгтэй нэгдэл; галогеналканаас KCN-тэй урвалаар үүсгэнэ.', en: 'A compound containing the –C≡N group, made from a halogenoalkane and KCN.' } },
    { term: { mn: 'гидроксинитрил', en: 'hydroxynitrile' }, def: { mn: 'Нэг молекулд –OH ба –CN бүлэгтэй нэгдэл; альдегид эсвэл кетон HCN-тэй урвалд орж үүсэх.', en: 'A compound with both –OH and –CN groups, made when an aldehyde or ketone reacts with HCN.' } },
    { term: { mn: 'нитрилийн гидролиз', en: 'hydrolysis of nitriles' }, def: { mn: 'Нитрилийг шингэлсэн хүчил эсвэл шингэлсэн шүлтээр буцалгаж карбоксилын хүчил үүсгэх урвал; шүлтээр явуулсан бол дараа нь хүчилжүүлнэ.', en: 'Heating a nitrile with dilute acid or dilute alkali to form a carboxylic acid; with alkali, the mixture is then acidified.' } },
  ],
  'al-ch-20': [
    { term: { mn: 'мономер', en: 'monomer' }, def: { mn: 'Олноороо холбогдож полимер үүсгэдэг жижиг молекул; нэмэлтийн полимержилтэд C=C холбоотой байна.', en: 'A small molecule that joins with many others to form a polymer; for addition polymerisation it has a C=C bond.' } },
    { term: { mn: 'нэмэлтийн полимер', en: 'addition polymer' }, def: { mn: 'Давхар холбоотой мономеруудаас бүрдсэн полимер; атом алдагдахгүй.', en: 'A polymer formed from monomers with C=C bonds, with no atoms lost.' } },
    { term: { mn: 'поли(этен)', en: 'poly(ethene)' }, def: { mn: 'Этенээс үүссэн нэмэлтийн полимер; давтагдах нэгж нь –CH₂–CH₂–.', en: 'The addition polymer made from ethene; its repeat unit is –CH₂–CH₂–.' } },
    { term: { mn: 'давтагдах нэгж', en: 'repeat unit' }, def: { mn: 'Полимерийн гинжин дагуу давтагддаг хамгийн жижиг нэгж; мономерийн давхар холбоо нээгдсэн байдалтай адил.', en: 'The smallest unit that is repeated along a polymer chain; it has the monomer’s C=C bond opened.' } },
    { term: { mn: 'поли(хлороэтен), ПВХ', en: 'poly(chloroethene), PVC' }, def: { mn: 'Хлороэтенээс үүссэн нэмэлтийн полимер.', en: 'An addition polymer made from chloroethene.' } },
    { term: { mn: 'биологийн задралгүй чанар', en: 'non-biodegradability' }, def: { mn: 'Полиалкенууд байгальд удаан задрах; шатахад хортой бодис ялгаруулах.', en: 'Poly(alkene)s break down very slowly in nature, and burning them can release harmful products.' } },
  ],
  'al-ch-21': [
    { term: { mn: 'органик синтез', en: 'organic synthesis' }, def: { mn: 'Энгийн эхлэлийн бодисоос урвалын дарааллаар зорилтот органик молекул бүтээх.', en: 'Building a target organic molecule from simpler starting materials through a sequence of reactions.' } },
    { term: { mn: 'зорилтот молекул', en: 'target molecule' }, def: { mn: 'Синтезээр гаргаж авах гэж буй бодис; замыг ихэвчлэн түүнээс ухрааж төлөвлөнө.', en: 'The compound a synthesis sets out to make; the route is often planned by working back from it.' } },
    { term: { mn: 'олон функциональ бүлэгтэй нэгдэл', en: 'polyfunctional compound' }, def: { mn: 'Хэд хэдэн функциональ бүлэгтэй нэгдэл; бүлэг бүр өөрийн урвалаараа урвалд ордог.', en: 'A compound with more than one functional group, each of which can react in its own way.' } },
    { term: { mn: 'синтезийн зам', en: 'synthetic route' }, def: { mn: 'Эхлэлийн бодисоос зорилтот нэгдэлд хүрэх урвалын дараалал; шат бүрт урвалын төрөл ба реагентийг заана.', en: 'The sequence of reactions from a starting material to a target molecule, with the reaction type and reagents for each step.' } },
    { term: { mn: 'дагалдах бүтээгдэхүүн', en: 'by-product' }, def: { mn: 'Урвалд зорилтот бүтээгдэхүүнтэй зэрэгцэн үүссэн бусад бодис.', en: 'A substance formed alongside the desired product in a reaction.' } },
  ],
  'al-ch-22': [
    { term: { mn: 'хэт улаан туяаны (IR) спектроскопи', en: 'infrared spectroscopy' }, def: { mn: 'Молекулын холбоо тодорхой долгионы тоонд IR цацрагийг шингээдгийг ашиглан функциональ бүлгийг тодорхойлох арга.', en: 'A technique that identifies functional groups from the infrared wavenumbers at which the bonds in a molecule absorb.' } },
    { term: { mn: 'долгионы тоо', en: 'wavenumber' }, def: { mn: 'IR спектрийн хэвтээ тэнхлэг, cm⁻¹-ээр; 1 см-т багтах долгионы тоо. Жишээ нь C=O ≈ 1700 cm⁻¹.', en: 'The horizontal axis of an IR spectrum, in cm⁻¹: the number of waves per centimetre. For example, C=O absorbs near 1700 cm⁻¹.' } },
    { term: { mn: 'хурууны хээний муж', en: 'fingerprint region' }, def: { mn: 'IR спектрийн 1500 cm⁻¹-ээс доош муж; нэгдэл бүрт өвөрмөц тул мэдэгдэж буй спектртэй харьцуулж танина.', en: 'The part of an IR spectrum below about 1500 cm⁻¹; it is unique to each compound, so it is matched against known spectra.' } },
    { term: { mn: 'изотопын эзлэх хувь', en: 'isotopic abundance' }, def: { mn: 'Элементийн изотоп бүрийн атомын эзлэх хувь; масс спектрийн пикийн өндрөөр харагдана, Ar-ыг тооцоолоход хэрэглэнэ.', en: 'The proportion of each isotope in a sample of an element; it shows as peak height in a mass spectrum and is used to calculate Ar.' } },
    { term: { mn: 'масс спектрометр', en: 'mass spectrometry' }, def: { mn: 'Ионуудын m/e харьцаа ба эрчмийг хэмжиж молекулын масс, изотопыг тодорхойлох арга.', en: 'A technique that measures the m/e ratio and abundance of ions to find molecular masses and isotopes.' } },
    { term: { mn: 'молекулын ионы пик', en: 'molecular ion peak' }, def: { mn: 'Масс спектрийн M⁺ пик; нэгдлийн харьцангуй молекулын массыг өгнө.', en: 'The M⁺ peak in a mass spectrum, which gives the relative molecular mass of the compound.' } },
    { term: { mn: '[M+1]⁺ ба [M+2]⁺ пик', en: '[M+1]⁺ and [M+2]⁺ peaks' }, def: { mn: '[M+1]⁺ пикээр нүүрстөрөгчийн тоог, [M+2]⁺ пикээр бром эсвэл хлорыг илрүүлнэ.', en: 'The [M+1]⁺ peak gives the number of carbon atoms; the [M+2]⁺ peak shows bromine or chlorine.' } },
    { term: { mn: 'задралын ион', en: 'fragment ion' }, def: { mn: 'Молекулын ион задарч үүсэх жижиг цэнэгтэй ион.', en: 'A smaller charged ion formed when the molecular ion breaks apart.' } },
  ],
};
