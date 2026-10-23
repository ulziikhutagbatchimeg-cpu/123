import type { ALevelSubsection } from './alevelSubsectionTypes';

// 9701 (2025–2027) subject content, sections 23–37 (A Level). Every learning outcome, English and Mongolian.
export const ALEVEL_SECTIONS_23_37: ALevelSubsection[] = [
  {
    ref: '23.1',
    en: 'Lattice energy and Born–Haber cycles',
    mn: 'Торын энерги ба Борн–Хабер мөчлөг',
    obj: [
      [1, 'Define and use the terms: enthalpy change of atomisation, ΔHat; and lattice energy, ΔHlatt (the change from gas-phase ions to solid lattice).', 'Дараах нэр томъёог тодорхойлж, ашиглах: атомжуулах энтальпийн өөрчлөлт ΔHat; торын энерги ΔHlatt (хийн төлөвийн ионоос хатуу тор үүсэх өөрчлөлт).'],
      [2, 'Define and use the term first electron affinity, EA; explain the factors affecting the electron affinities of elements; and describe and explain the trends in the electron affinities of the Group 16 and Group 17 elements.', 'Анхны электрон дүйцэх чадвар EA гэдгийг тодорхойлж, ашиглах; элементийн электрон дүйцэх чадварт нөлөөлөх хүчин зүйлсийг тайлбарлах; VI ба VII бүлгийн элементийн электрон дүйцэх чадварын чиг хандлагыг тодорхойлж, тайлбарлах.'],
      [3, 'Construct and use Born–Haber cycles for ionic solids (limited to +1 and +2 cations, −1 and −2 anions).', 'Ионы хатуу биетийн Борн–Хабер мөчлөгийг зурж, ашиглах (зөвхөн +1 ба +2 катион, −1 ба −2 анион).'],
      [4, 'Carry out calculations involving Born–Haber cycles.', 'Борн–Хабер мөчлөгтэй холбоотой тооцоо хийх.'],
      [5, 'Explain, in qualitative terms, the effect of ionic charge and of ionic radius on the numerical magnitude of a lattice energy.', 'Ионы цэнэг ба ионы радиус торын энергийн тоон утгад хэрхэн нөлөөлөхийг чанарын хувьд тайлбарлах.']
    ]
  },
  {
    ref: '23.2',
    en: 'Enthalpies of solution and hydration',
    mn: 'Уусах ба гидратжих энтальп',
    obj: [
      [1, 'Define and use the term enthalpy change with reference to hydration, ΔHhyd, and solution, ΔHsol.', 'Гидратжилт ΔHhyd ба уусалтын ΔHsol энтальпийн өөрчлөлтийн нэр томъёог тодорхойлж, ашиглах.'],
      [2, 'Construct and use an energy cycle involving the enthalpy change of solution, lattice energy and enthalpy change of hydration.', 'Уусалтын энтальпи, торын энерги, гидратжилтын энтальпийг хамарсан энергийн мөчлөг зурж, ашиглах.'],
      [3, 'Carry out calculations involving the energy cycles in 23.2.2.', '23.2.2-т заасан энергийн мөчлөгтэй холбоотой тооцоо хийх.'],
      [4, 'Explain, in qualitative terms, the effect of ionic charge and of ionic radius on the numerical magnitude of an enthalpy change of hydration.', 'Ионы цэнэг ба ионы радиус гидратжилтын энтальпийн өөрчлөлтийн тоон утгад хэрхэн нөлөөлөхийг чанарын хувьд тайлбарлах.']
    ]
  },
  {
    ref: '23.3',
    en: 'Entropy change, ΔS',
    mn: 'Энтропийн өөрчлөлт, ΔS',
    obj: [
      [1, 'Define the term entropy, S, as the number of possible arrangements of the particles and their energy in a given system.', 'Энтропи S-г өгөгдсөн системд бөөмс ба тэдгээрийн энергийн боломжит байрлалын тоо гэж тодорхойлох.'],
      [2, 'Predict and explain the sign of the entropy changes that occur during a change in state (for example melting, boiling and dissolving, and their reverse), during a temperature change, and during a reaction in which there is a change in the number of gaseous molecules.', 'Төлөвийн өөрчлөлт (жишээ нь хайлах, буцлах, уусах ба эсрэг урвал), температурын өөрчлөлт, хийн молекулын тоо өөрчлөгдөх урвалын үеийн энтропийн өөрчлөлтийн тэмдгийг урьдчилан таамаглаж, тайлбарлах.'],
      [3, 'Calculate the entropy change for a reaction, ΔS⦵, given the standard entropies of the reactants and products, ΔS⦵ = ΣS⦵(products) − ΣS⦵(reactants) (use of ΔS⦵ = ΔSsurr + ΔSsys is not required).', 'Урвалж ба бүтээгдэхүүний стандарт энтропи S⦵ өгөгдсөн үед урвалын энтропийн өөрчлөлт ΔS⦵-ийг тооцоолох: ΔS⦵ = ΣS⦵(бүтээгдэхүүн) − ΣS⦵(урвалж) (ΔS⦵ = ΔSsurr + ΔSsys-ийг ашиглах шаардлагагүй).']
    ]
  },
  {
    ref: '23.4',
    en: 'Gibbs free energy change, ΔG',
    mn: 'Гиббсийн чөлөөт энергийн өөрчлөлт, ΔG',
    obj: [
      [1, 'State and use the Gibbs equation ΔG⦵ = ΔH⦵ − TΔS⦵.', 'Гиббсийн тэгшитгэл ΔG⦵ = ΔH⦵ − TΔS⦵-г хэлж, ашиглах.'],
      [2, 'Perform calculations using the equation ΔG⦵ = ΔH⦵ − TΔS⦵.', 'ΔG⦵ = ΔH⦵ − TΔS⦵ тэгшитгэлээр тооцоо хийх.'],
      [3, 'State whether a reaction or process will be feasible by using the sign of ΔG.', 'ΔG-ийн тэмдгийг ашиглан урвал эсвэл үйл явц боломжтой эсэхийг хэлэх.'],
      [4, 'Predict the effect of temperature change on the feasibility of a reaction, given standard enthalpy and entropy changes.', 'Стандарт энтальпи ба энтропийн өөрчлөлт өгөгдсөн үед температурын өөрчлөлт урвалын боломжтой байдалд хэрхэн нөлөөлөхийг урьдчилан таамаглах.']
    ]
  },
  {
    ref: '24.1',
    en: 'Electrolysis',
    mn: 'Электролиз',
    obj: [
      [1, 'Predict the identities of substances liberated during electrolysis from the state of the electrolyte (molten or aqueous), the position in the redox series (electrode potential) and the concentration.', 'Электролитийн төлөв (хайлмал эсвэл уусмал), редокс цувааны байрлал (электродын потенциал) ба концентрацаас электролизийн үед ялгарах бодисыг урьдчилан таамаглах.'],
      [2, 'State and apply the relationship F = Le between the Faraday constant, F, the Avogadro constant, L, and the charge on the electron, e.', 'Фарадейн тогтмол F, Авогадрогийн тогтмол L ба электроны цэнэг e-ийн хоорондын хамаарлыг F = Le хэлж, хэрэглэх.'],
      [3, 'Calculate: (a) the quantity of charge passed during electrolysis, using Q = It; (b) the mass and/or volume of substance liberated during electrolysis.', 'Тооцоолох: (а) электролизийн үед дамжсан цэнэгийн хэмжээг Q = It-аар; (б) электролизийн үед ялгарсан бодисын масс ба/эсвэл эзлэхүүн.'],
      [4, 'Describe the determination of a value of the Avogadro constant by an electrolytic method.', 'Электролизийн аргаар Авогадрогийн тогтмолын утгыг тодорхойлохыг тайлбарлах.']
    ]
  },
  {
    ref: '24.2',
    en: 'Standard electrode potentials E⦵, standard cell potentials E⦵cell and the Nernst equation',
    mn: 'Стандарт электродын потенциал E⦵, стандарт эсийн потенциал E⦵cell ба Нернстийн тэгшитгэл',
    obj: [
      [1, 'Define the terms: (a) standard electrode (reduction) potential; (b) standard cell potential.', 'Дараах нэр томъёог тодорхойлох: (а) стандарт электродын (бууралтын) потенциал; (б) стандарт эсийн потенциал.'],
      [2, 'Describe the standard hydrogen electrode.', 'Стандарт устөрөгчийн электродыг тодорхойлох.'],
      [3, 'Describe methods used to measure the standard electrode potentials of: (a) metals or non-metals in contact with their ions in aqueous solution; (b) ions of the same element in different oxidation states.', 'Дараах бодисын стандарт электродын потенциалыг хэмжих аргыг тодорхойлох: (а) уусмал дахь ионтойгоо харьцаж буй металл эсвэл металл бус; (б) ижил элементийн өөр исэлдэлтийн зэргийн ионууд.'],
      [4, 'Calculate a standard cell potential by combining two standard electrode potentials.', 'Хоёр стандарт электродын потенциалыг нэгтгэж стандарт эсийн потенциалыг тооцоолох.'],
      [5, 'Use standard cell potentials to: (a) deduce the polarity of each electrode and hence explain or deduce the direction of electron flow in the external circuit of a simple cell; (b) predict the feasibility of a reaction.', 'Стандарт эсийн потенциалыг ашиглан: (а) электрод бүрийн туйлыг тодорхойлж, энгийн эсийн гаднах хэлхээний электроны чиглэлийг тайлбарлах эсвэл тодорхойлох; (б) урвалын боломжтой байдлыг урьдчилан таамаглах.'],
      [6, 'Deduce from E⦵ values the relative reactivity of elements, compounds and ions as oxidising agents or as reducing agents.', 'E⦵ утгаас элемент, нэгдэл ба ионы исэлдүүлэгч эсвэл ангижруулагч болох харьцангуй идэвхийг тодорхойлох.'],
      [7, 'Construct redox equations using the relevant half-equations.', 'Холбогдох хагас тэгшитгэлийг ашиглан редокс тэгшитгэл бичих.'],
      [8, 'Predict qualitatively how the value of an electrode potential, E, varies with the concentrations of the aqueous ions.', 'Уусмал дахь ионы концентрациар электродын потенциал E-ийн утга хэрхэн өөрчлөгдөхийг чанарын хувьд урьдчилан таамаглах.'],
      [9, 'Use the Nernst equation, E = E⦵ + (0.059/z) log([oxidised species]/[reduced species]), to predict quantitatively how the value of an electrode potential varies with the concentrations of the aqueous ions (for example Cu²⁺(aq) + 2e⁻ ⇌ Cu(s) and Fe³⁺(aq) + e⁻ ⇌ Fe²⁺(aq)).', 'Нернстийн тэгшитгэл E = E⦵ + (0.059/z) log([исэлдсэн бодис]/[ангижирсан бодис])-ийг ашиглан уусмал дахь ионы концентрациар электродын потенциалын утга хэрхэн өөрчлөгдөхийг тоон хувьд урьдчилан таамаглах (жишээ нь Cu²⁺(aq) + 2e⁻ ⇌ Cu(s), Fe³⁺(aq) + e⁻ ⇌ Fe²⁺(aq)).'],
      [10, 'Understand and use the equation ΔG⦵ = −nE⦵cellF.', 'ΔG⦵ = −nE⦵cellF тэгшитгэлийг ойлгож, ашиглах.']
    ]
  },
  {
    ref: '25.1',
    en: 'Acids and bases',
    mn: 'Хүчил ба суурь',
    obj: [
      [1, 'Understand and use the terms conjugate acid and conjugate base.', 'Хосмог хүчил ба хосмог суурь гэсэн нэр томъёог ойлгож, ашиглах.'],
      [2, 'Define conjugate acid–base pairs, identifying such pairs in reactions.', 'Хосмог хүчил–суурийн хосыг тодорхойлж, урвалд ийм хосыг таних.'],
      [3, 'Define mathematically the terms pH, Ka, pKa and Kw and use them in calculations (Kb and the equation Kw = Ka × Kb will not be tested).', 'pH, Ka, pKa ба Kw гэсэн нэр томъёог математикийн хувьд тодорхойлж, тооцоонд ашиглах (Kb ба Kw = Ka × Kb-ийн тэгшитгэлийг үнэлэхгүй).'],
      [4, 'Calculate [H⁺(aq)] and pH values for: (a) strong acids; (b) strong alkalis; (c) weak acids.', '[H⁺(aq)] ба pH утгыг тооцоолох: (а) хүчтэй хүчил; (б) хүчтэй шүлт; (в) сул хүчил.'],
      [5, 'Define a buffer solution; explain how a buffer solution can be made; explain how buffer solutions control pH using chemical equations; and describe and explain the uses of buffer solutions, including the role of HCO₃⁻ in controlling pH in blood.', 'Буферийн уусмалыг тодорхойлох; буферийн уусмал хэрхэн бэлтгэгдэхийг тайлбарлах; химийн тэгшитгэлээр буферийн уусмал pH-ийг хэрхэн хянахыг тайлбарлах; буферийн уусмалын хэрэглээг, түүний дотор HCO₃⁻-ийн цусны pH-ийг хянах үүргийг тодорхойлж, тайлбарлах.'],
      [6, 'Calculate the pH of buffer solutions, given appropriate data.', 'Тохирох мэдээлэл өгөгдсөн үед буферийн уусмалын pH-ийг тооцоолох.'],
      [7, 'Understand and use the term solubility product, Ksp.', 'Уусах чанарын үржвэр Ksp гэдгийг ойлгож, ашиглах.'],
      [8, 'Write an expression for Ksp.', 'Ksp-ийн илэрхийллийг бичих.'],
      [9, 'Calculate Ksp from concentrations and vice versa.', 'Концентрациар Ksp-ийг тооцоолох, мөн эсрэгээр.'],
      [10, 'Understand and use the common ion effect to explain the different solubility of a compound in a solution containing a common ion; and perform calculations using Ksp values and the concentration of a common ion.', 'Нийтлэг ионы нөлөөг ойлгож, ашиглан нийтлэг ион агуулсан уусмалд нэгдлийн уусах чанар ялгаатайг тайлбарлах; Ksp утга ба нийтлэг ионы концентрацийг ашиглан тооцоо хийх.']
    ]
  },
  {
    ref: '25.2',
    en: 'Partition coefficients',
    mn: 'Тархалтын коэффициент',
    obj: [
      [1, 'State what is meant by the term partition coefficient, Kpc.', 'Тархалтын коэффициент Kpc гэдэг нэр томъёоны утгыг хэлэх.'],
      [2, 'Calculate and use a partition coefficient for a system in which the solute is in the same physical state in the two solvents.', 'Уусагдах бодис хоёр уусгагчид ижил физик төлөвтэй байх системийн тархалтын коэффициентийг тооцоолж, ашиглах.'],
      [3, 'Understand the factors affecting the numerical value of a partition coefficient in terms of the polarities of the solute and the solvents used.', 'Уусагдах бодис ба уусгагчийн туйлшралаар тархалтын коэффициентийн тоон утгад нөлөөлөх хүчин зүйлсийг ойлгох.']
    ]
  },
  {
    ref: '26.1',
    en: 'Simple rate equations, orders of reaction and rate constants',
    mn: 'Энгийн хурдны тэгшитгэл, урвалын эрэмбэ ба хурдны тогтмол',
    obj: [
      [1, 'Explain and use the terms rate equation, order of reaction, overall order of reaction, rate constant, half-life, rate-determining step and intermediate.', 'Хурдны тэгшитгэл, урвалын эрэмбэ, нийт эрэмбэ, хурдны тогтмол, хагас задралын хугацаа, хурд тодорхойлогч алхам, завсрын бодис гэсэн нэр томъёог тайлбарлаж, ашиглах.'],
      [2, 'Understand and use rate equations of the form rate = k[A]ᵐ[B]ⁿ (m and n are 0, 1 or 2); deduce the order of a reaction from concentration–time graphs or from experimental data using the initial rates method and the half-life method; interpret experimental data in graphical form, including concentration–time and rate–concentration graphs; calculate an initial rate using concentration data; and construct a rate equation.', 'rate = k[A]ᵐ[B]ⁿ хэлбэрийн хурдны тэгшитгэлийг ойлгож, ашиглах (m ба n нь 0, 1 эсвэл 2); урвалын эрэмбийг концентраци–хугацааны график эсвэл анхны хурд ба хагас задралын хугацааны аргаар туршилтын өгөгдлөөс тодорхойлох; график хэлбэрийн өгөгдлийг (концентраци–хугацаа, хурд–концентраци) тайлбарлах; концентрацийн өгөгдлөөр анхны хурдыг тооцоолж, хурдны тэгшитгэл бичих.'],
      [3, 'Show understanding that the half-life of a first-order reaction is independent of concentration, and use the half-life of a first-order reaction in calculations.', 'Нэгдүгээр эрэмбийн урвалын хагас задралын хугацаа концентрациас хамаарахгүйг ойлгож, тооцоонд ашиглах.'],
      [4, 'Calculate the numerical value of a rate constant, for example by using the initial rates and the rate equation, or using the half-life t½ and the equation k = 0.693/t½.', 'Хурдны тогтмолын тоон утгыг тооцоолох: анхны хурд ба хурдны тэгшитгэлээр, эсвэл хагас задралын хугацаа t½ ба k = 0.693/t½ томьёогоор.'],
      [5, 'For a multi-step reaction: suggest a reaction mechanism consistent with the rate equation and the overall equation; predict the order from a given mechanism and rate-determining step; deduce a rate equation from a given mechanism; identify an intermediate or catalyst from a given mechanism; and identify the rate-determining step from a rate equation and a given mechanism.', 'Олон алхамт урвалд: хурдны тэгшитгэл ба нийт тэгшитгэлтэй нийцэх урвалын механизм санал болгох; өгөгдсөн механизм ба хурд тодорхойлогч алхмаар эрэмбийг урьдчилан таамаглах; өгөгдсөн механизмаар хурдны тэгшитгэл гаргах; механизмаас завсрын бодис эсвэл катализаторыг таних; хурдны тэгшитгэл ба механизмаас хурд тодорхойлогч алхмыг таних.'],
      [6, 'Describe qualitatively the effect of temperature change on the rate constant and hence the rate of a reaction.', 'Температурын өөрчлөлт хурдны тогтмолд, улмаар урвалын хурдад хэрхэн нөлөөлөхийг чанарын хувьд тодорхойлох.']
    ]
  },
  {
    ref: '26.2',
    en: 'Homogeneous and heterogeneous catalysts',
    mn: 'Гомоген ба гетероген катализатор',
    obj: [
      [1, 'Explain that catalysts can be homogeneous or heterogeneous.', 'Катализатор гомоген эсвэл гетероген байж болохыг тайлбарлах.'],
      [2, 'Describe the mode of action of a heterogeneous catalyst to include adsorption of reactants, bond weakening and desorption of products, for example: (a) iron in the Haber process; (b) palladium, platinum and rhodium in the catalytic removal of oxides of nitrogen from car exhaust gases.', 'Гетероген катализаторын үйл ажиллагааг тодорхойлох: урвалжийн адсорбц, холбоо сулрах, бүтээгдэхүүний десорбц; жишээ нь (а) Хаберийн процессын төмөр; (б) машины утааны азотын исэлийг катализаар зайлуулах палладий, платин, родий.'],
      [3, 'Describe the mode of action of a homogeneous catalyst by being used in one step and reformed in a later step, for example: (a) atmospheric oxides of nitrogen in the oxidation of atmospheric sulfur dioxide; (b) Fe²⁺ or Fe³⁺ in the I⁻/S₂O₈²⁻ reaction.', 'Гомоген катализаторын үйл ажиллагааг тодорхойлох: нэг алхамд ашиглагдаж дараагийн алхамд дахин үүсэх; жишээ нь (а) агаар мандлын азотын исэл агаар мандлын SO₂-ийн исэлдэлтэд; (б) I⁻/S₂O₈²⁻ урвалд Fe²⁺ эсвэл Fe³⁺.']
    ]
  },
  {
    ref: '27.1',
    en: 'Similarities and trends in the properties of the Group 2 metals, magnesium to barium, and their compounds',
    mn: 'II бүлгийн металлууд (магни–барий) ба тэдгээрийн нэгдлийн шинж чанарын ижил тал ба чиг хандлага',
    obj: [
      [1, 'Describe and explain qualitatively the trend in the thermal stability of the nitrates and carbonates, including the effect of ionic radius on the polarisation of the large anion.', 'Нитрат ба карбонатын дулааны тогтвортой байдлын чиг хандлагыг чанарын хувьд тодорхойлж, тайлбарлах, мөн ионы радиус том анионы туйлшралд хэрхэн нөлөөлөхийг оруулах.'],
      [2, 'Describe and explain qualitatively the variation in solubility, and in the enthalpy change of solution ΔH⦵sol, of the hydroxides and sulfates in terms of the relative magnitudes of the enthalpy change of hydration and the lattice energy.', 'Гидроксид ба сульфатын уусах чанар ба уусалтын энтальпи ΔH⦵sol-ийн өөрчлөлтийг гидратжилтын энтальпи ба торын энергийн харьцангуй хэмжээгээр чанарын хувьд тодорхойлж, тайлбарлах.']
    ]
  },
  {
    ref: '28.1',
    en: 'General physical and chemical properties of the first row of transition elements, titanium to copper',
    mn: 'Шилжилтийн элементийн эхний эгнээ (титан–зэс): ерөнхий физик ба химийн шинж чанар',
    obj: [
      [1, 'Define a transition element as a d-block element which forms one or more stable ions with incomplete d orbitals.', 'Шилжилтийн элементийг дутуу d орбиталтай нэг буюу хэд хэдэн тогтвортой ион үүсгэдэг d-блокийн элемент гэж тодорхойлох.'],
      [2, 'Sketch the shape of a 3dxy orbital and a 3dz² orbital.', '3dxy орбиталь ба 3dz² орбиталийн хэлбэрийг зурах.'],
      [3, 'Understand that transition elements have the following properties: (a) variable oxidation states; (b) they behave as catalysts; (c) they form complex ions; (d) they form coloured compounds.', 'Шилжилтийн элементүүд дараах шинж чанартай гэдгийг ойлгох: (а) хувьсах исэлдэлтийн зэрэгтэй; (б) катализатор шиг ажилладаг; (в) цогцолбор ион үүсгэдэг; (г) өнгөтэй нэгдэл үүсгэдэг.'],
      [4, 'Explain why transition elements have variable oxidation states in terms of the similarity in energy of the 3d and 4s sub-shells.', 'Шилжилтийн элементүүд яагаад хувьсах исэлдэлтийн зэрэгтэй байдгийг 3d ба 4s дэд бүрхүүлийн энергийн ойролцоо байдлаар тайлбарлах.'],
      [5, 'Explain why transition elements behave as catalysts in terms of having more than one stable oxidation state, and vacant d orbitals that are energetically accessible and can form dative bonds with ligands.', 'Шилжилтийн элементүүд яагаад катализатор шиг ажилладагийг нэгээс олон тогтвортой исэлдэлтийн зэрэг, энергийн хувьд хүрч болохуйц хоосон d орбитал, лигандтай донор-акцепторын холбоо үүсгэх чадвараар тайлбарлах.'],
      [6, 'Explain why transition elements form complex ions in terms of vacant d orbitals that are energetically accessible.', 'Шилжилтийн элементүүд яагаад цогцолбор ион үүсгэдгийг энергийн хувьд хүрч болохуйц хоосон d орбиталаар тайлбарлах.']
    ]
  },
  {
    ref: '28.2',
    en: 'General characteristic chemical properties of the first set of transition elements, titanium to copper',
    mn: 'Шилжилтийн элементийн эхний багцын (титан–зэс) ерөнхий химийн шинж чанар',
    obj: [
      [1, 'Describe and explain the reactions of transition elements with ligands to form complexes, including the complexes of copper(II) and cobalt(II) ions with water and ammonia molecules and with hydroxide and chloride ions.', 'Шилжилтийн элементүүдийн лигандтай урвалыг цогцолбор үүсгэхээр тодорхойлж, тайлбарлах; зэс(II) ба кобальт(II) ионы ус ба аммиакийн молекул, гидроксид ба хлоридын ионтой цогцолборыг оруулах.'],
      [2, 'Define the term ligand as a species that contains a lone pair of electrons that forms a dative covalent bond to a central metal atom or ion.', 'Лигандыг төв металлын атом эсвэл ионтой донор-акцепторын ковалент холбоо үүсгэх чөлөөт электрон хостой бөөм гэж тодорхойлох.'],
      [3, 'Understand and use the terms: (a) monodentate ligand (for example H₂O, NH₃, Cl⁻ and CN⁻); (b) bidentate ligand (for example 1,2-diaminoethane, en, H₂NCH₂CH₂NH₂, and the ethanedioate ion, C₂O₄²⁻); (c) polydentate ligand (for example EDTA⁴⁻).', 'Дараах нэр томъёог ойлгож, ашиглах: (а) моно-дентат лиганд (жишээ нь H₂O, NH₃, Cl⁻, CN⁻); (б) би-дентат лиганд (жишээ нь 1,2-диаминоэтан en, H₂NCH₂CH₂NH₂, ба этандиоат ион C₂O₄²⁻); (в) поли-дентат лиганд (жишээ нь EDTA⁴⁻).'],
      [4, 'Define the term complex as a molecule or ion formed by a central metal atom or ion surrounded by one or more ligands.', 'Цогцолборыг нэг буюу хэд хэдэн лигандаар хүрээлэгдсэн төв металлын атом эсвэл ионоор үүссэн молекул эсвэл ион гэж тодорхойлох.'],
      [5, 'Describe the geometry (shape and bond angles) of transition element complexes which are linear, square planar, tetrahedral or octahedral.', 'Шугаман, дөрвөн өнцөгт хавтгай, тетраэдр эсвэл октаэдр шилжилтийн элементийн цогцолборын геометр (хэлбэр ба холбооны өнцөг)-ийг тодорхойлох.'],
      [6, 'State what is meant by the coordination number; and predict the formula and charge of a complex ion, given the metal ion, its charge or oxidation state, the ligand and its coordination number or geometry.', 'Координацын тоо гэдгийг хэлэх; металлын ион, түүний цэнэг эсвэл исэлдэлтийн зэрэг, лиганд ба түүний координацын тоо эсвэл геометр өгөгдсөн үед цогцолбор ионы томьёо ба цэнэгийг урьдчилан таамаглах.'],
      [7, 'Explain qualitatively that ligand exchange can occur, including the complexes of copper(II) and cobalt(II) ions with water and ammonia molecules and with hydroxide and chloride ions.', 'Лиганд солилцох боломжтойг чанарын хувьд тайлбарлах, мөн зэс(II) ба кобальт(II) ионы ус, аммиак, гидроксид, хлоридтой цогцолборыг оруулах.'],
      [8, 'Predict, using E⦵ values, the feasibility of redox reactions involving transition elements and their ions.', 'E⦵ утгыг ашиглан шилжилтийн элемент ба тэдгээрийн ионтой редокс урвалын боломжтой байдлыг урьдчилан таамаглах.'],
      [9, 'Describe the reactions of, and perform calculations involving: (a) MnO₄⁻/C₂O₄²⁻ in acid solution; (b) MnO₄⁻/Fe²⁺ in acid solution; (c) Cu²⁺/I⁻, given suitable data.', 'Дараах урвалыг тодорхойлж, тооцоо хийх, тохирох мэдээлэл өгөгдсөн үед: (а) хүчиллэг уусмалд MnO₄⁻/C₂O₄²⁻; (б) хүчиллэг уусмалд MnO₄⁻/Fe²⁺; (в) Cu²⁺/I⁻.'],
      [10, 'Perform calculations involving other redox systems given suitable data.', 'Тохирох мэдээлэл өгөгдсөн үед бусад редокс системтэй холбоотой тооцоо хийх.']
    ]
  },
  {
    ref: '28.3',
    en: 'Colour of complexes',
    mn: 'Цогцолборын өнгө',
    obj: [
      [1, 'Define and use the terms degenerate and non-degenerate d orbitals.', 'Дегенерат ба дегенерат бус d орбиталь гэсэн нэр томъёог тодорхойлж, ашиглах.'],
      [2, 'Describe the splitting of degenerate d orbitals into two non-degenerate sets of d orbitals of higher energy, and use ΔE in: (a) octahedral complexes (two higher and three lower d orbitals); (b) tetrahedral complexes (three higher and two lower d orbitals).', 'Дегенерат d орбиталь нь энергийн өндөр хоёр, нам гурван (октаэдр) эсвэл өндөр гурван, нам хоёр (тетраэдр) дегенерат бус багц болж хуваагдахыг тодорхойлж, ΔE-г ашиглах.'],
      [3, 'Explain why transition elements form coloured compounds in terms of the frequency of light absorbed as an electron is promoted between two non-degenerate d orbitals.', 'Шилжилтийн элементүүд яагаад өнгөтэй нэгдэл үүсгэхийг электрон хоёр дегенерат бус d орбиталийн хооронд шилжихэд шингээх гэрлийн давтамжаар тайлбарлах.'],
      [4, 'Describe, in qualitative terms, the effects of different ligands on ΔE, the frequency of light absorbed, and hence the complementary colour that is observed.', 'Өөр өөр лиганд ΔE, шингээх гэрлийн давтамж, улмаар ажиглагдах нэмэлт өнгөд хэрхэн нөлөөлөхийг чанарын хувьд тодорхойлох.'],
      [5, 'Use the complexes of copper(II) and cobalt(II) ions with water and ammonia molecules and with hydroxide and chloride ions as examples of ligand exchange affecting the colour observed.', 'Зэс(II) ба кобальт(II) ионы ус, аммиак, гидроксид, хлоридтой цогцолборыг лиганд солилцож ажиглагдах өнгөнд нөлөөлөх жишээ болгон ашиглах.']
    ]
  },
  {
    ref: '28.4',
    en: 'Stereoisomerism in transition element complexes',
    mn: 'Шилжилтийн элементийн цогцолборын стереоизомер',
    obj: [
      [1, 'Describe the types of stereoisomerism shown by complexes, including those associated with bidentate ligands: (a) geometrical (cis/trans) isomerism, for example square planar [Pt(NH₃)₂Cl₂] and octahedral [Co(NH₃)₄(H₂O)₂]²⁺ and [Ni(H₂NCH₂CH₂NH₂)₂(H₂O)₂]²⁺; (b) optical isomerism, for example [Ni(H₂NCH₂CH₂NH₂)₃]²⁺ and [Ni(H₂NCH₂CH₂NH₂)₂(H₂O)₂]²⁺.', 'Цогцолборын үзүүлэх стереоизомерийн төрлийг тодорхойлох (би-дентат лигандтай холбоотойг оруулан): (а) геометр (cis/trans) изомер, жишээ нь дөрвөн өнцөгт хавтгай [Pt(NH₃)₂Cl₂], октаэдр [Co(NH₃)₄(H₂O)₂]²⁺ ба [Ni(H₂NCH₂CH₂NH₂)₂(H₂O)₂]²⁺; (б) оптик изомер, жишээ нь [Ni(H₂NCH₂CH₂NH₂)₃]²⁺ ба [Ni(H₂NCH₂CH₂NH₂)₂(H₂O)₂]²⁺.'],
      [2, 'Deduce the overall polarity of complexes such as those described in 28.4.1(a) and 28.4.1(b).', '28.4.1(а) ба (б)-д заасантай адил цогцолборын нийт туйлшралыг тодорхойлох.']
    ]
  },
  {
    ref: '28.5',
    en: 'Stability constants, Kstab',
    mn: 'Тогтвортой байдлын тогтмол, Kstab',
    obj: [
      [1, 'Define the stability constant, Kstab, of a complex as the equilibrium constant for the formation of the complex ion in a solvent (from its constituent ions or molecules).', 'Цогцолборын тогтвортой байдлын тогтмол Kstab-ийг уусгагчид цогцолбор ион үүсэх (түүнийг бүрдүүлэгч ион эсвэл молекулаас) тэнцвэрийн тогтмол гэж тодорхойлох.'],
      [2, 'Write an expression for the Kstab of a complex (the [H₂O] should not be included).', 'Цогцолборын Kstab-ийн илэрхийллийг бичих ([H₂O]-г оруулахгүй).'],
      [3, 'Use Kstab expressions to perform calculations.', 'Kstab-ийн илэрхийллийг ашиглан тооцоо хийх.'],
      [4, 'Describe and explain ligand exchanges in terms of Kstab values, and understand that a large Kstab is due to the formation of a stable complex ion.', 'Лиганд солилцолтыг Kstab-ийн утгаар тодорхойлж, тайлбарлах; том Kstab нь тогтвортой цогцолбор ион үүсэхтэй холбоотойг ойлгох.']
    ]
  },
  {
    ref: '29.1',
    en: 'Formulas, functional groups and the naming of organic compounds',
    mn: 'Томьёо, функциональ бүлэг ба органик нэгдлийн нэршил',
    obj: [
      [1, 'Understand that the compounds in the table of functional groups contain a functional group which dictates their physical and chemical properties.', 'Функциональ бүлгийн хүснэгтийн нэгдлүүд физик ба химийн шинж чанарыг тодорхойлдог функциональ бүлэгтэй гэдгийг ойлгох.'],
      [2, 'Interpret and use the general, structural, displayed and skeletal formulas of the classes of compound stated in the table.', 'Хүснэгтэд заасан нэгдлийн ангиудын ерөнхий, бүтцийн, дэлгэрэнгүй ба араг ясны томьёог тайлбарлаж, ашиглах.'],
      [3, 'Understand and use systematic nomenclature of simple aliphatic organic molecules (including cyclic compounds containing a single ring of up to six carbon atoms) with the functional groups in the table, up to six carbon atoms (six plus six for esters and amides; straight chains only for esters and nitriles).', 'Хүснэгтийн функциональ бүлэгтэй энгийн алифатик органик молекулын (зургаа хүртэл нүүрстөрөгчтэй нэг цагираг бүхий циклик нэгдлийг оруулан) системтэй нэршлийг ойлгож, ашиглах.'],
      [4, 'Understand and use systematic nomenclature of simple aromatic molecules with one benzene ring and one or more simple substituents, for example 3-nitrobenzoic acid or 2,4,6-tribromophenol.', 'Нэг бензолын цагираг ба нэг буюу хэд хэдэн энгийн орлуулагчтай энгийн ароматик молекулын системтэй нэршлийг ойлгож, ашиглах (жишээ нь 3-нитробензойн хүчил, 2,4,6-трибромфенол).']
    ]
  },
  {
    ref: '29.2',
    en: 'Characteristic organic reactions',
    mn: 'Органик нэгдлийн шинж чанарын урвалууд',
    obj: [
      [1, 'Understand and use the terminology associated with types of organic mechanisms: (a) electrophilic substitution; (b) addition–elimination.', 'Органик механизмын төрөлтэй холбоотой нэр томъёог ойлгож, ашиглах: (а) электрофилийн орлуулалт; (б) нэмэлт–салгалт.']
    ]
  },
  {
    ref: '29.3',
    en: 'Shapes of aromatic organic molecules; σ and π bonds',
    mn: 'Ароматик органик молекулын хэлбэр; σ ба π холбоо',
    obj: [
      [1, 'Describe and explain the shape of benzene and other aromatic molecules, including sp² hybridisation, in terms of σ bonds and a delocalised π system.', 'Бензол ба бусад ароматик молекулын хэлбэрийг sp² гибриджилт оруулан, σ холбоо ба ион тусгаарлагдсан π системээр тодорхойлж, тайлбарлах.']
    ]
  },
  {
    ref: '29.4',
    en: 'Isomerism: optical',
    mn: 'Изомер: оптик',
    obj: [
      [1, 'Understand that enantiomers have identical physical and chemical properties apart from their ability to rotate plane-polarised light and their potential biological activity.', 'Энантиомер нь хавтгай туйлширсан гэрлийг эргүүлэх чадвар ба биологийн идэвхээс бусад тохиолдолд физик ба химийн шинж чанар адил гэдгийг ойлгох.'],
      [2, 'Understand and use the terms optically active and racemic mixture.', 'Оптикийн идэвхтэй ба рацемат хольц гэсэн нэр томъёог ойлгож, ашиглах.'],
      [3, 'Describe the effect on plane-polarised light of the two optical isomers of a single substance.', 'Нэг бодисын хоёр оптик изомерын хавтгай туйлширсан гэрэлд үзүүлэх нөлөөг тодорхойлох.'],
      [4, 'Explain the relevance of chirality to the synthetic preparation of drug molecules, including: (a) the potential different biological activity of the two enantiomers; (b) the need to separate a racemic mixture into two pure enantiomers; (c) the use of chiral catalysts to produce a single pure optical isomer.', 'Хиральтай байдал эмийн молекулын синтезд хэрхэн хамаарахыг тайлбарлах, түүний дотор: (а) хоёр энантиомерын биологийн идэвх ялгаатай байж болох; (б) рацемат хольцыг хоёр цэвэр энантиомерт салгах хэрэгцээ; (в) нэг цэвэр оптик изомер үүсгэхийн тулд хиральт катализатор ашиглах.']
    ]
  },
  {
    ref: '30.1',
    en: 'Arenes',
    mn: 'Аренууд',
    obj: [
      [1, 'Describe the chemistry of arenes as exemplified by the following reactions of benzene and methylbenzene: (a) substitution with Cl₂ and Br₂ in the presence of AlCl₃ or AlBr₃ catalyst to form halogenoarenes; (b) nitration with concentrated HNO₃ and concentrated H₂SO₄ at 25–60 °C; (c) Friedel–Crafts alkylation by CH₃Cl and AlCl₃ with heat; (d) Friedel–Crafts acylation by CH₃COCl and AlCl₃ with heat; (e) complete oxidation of the side-chain by hot alkaline KMnO₄, then dilute acid, to give a benzoic acid; (f) hydrogenation of the benzene ring with H₂ and Pt/Ni catalyst with heat to form a cyclohexane ring.', 'Бензол ба метилбензолын дараах урвалаар аренүүдийн химийг тодорхойлох: (а) AlCl₃ эсвэл AlBr₃ катализатортайгаар Cl₂, Br₂-оор орлуулж галогеноарен үүсгэх; (б) өтгөн HNO₃ ба өтгөн H₂SO₄-оор 25–60 °C-д нитрлэх; (в) CH₃Cl ба AlCl₃-аар халаахад Фридель–Крафтсын алкилжилт; (г) CH₃COCl ба AlCl₃-аар халаахад Фридель–Крафтсын ацилжилт; (д) халуун шүлтлэг KMnO₄-ээр, дараа нь шингэрүүлсэн хүчлээр хажуугийн гинжийг бүрэн исэлдүүлж бензойн хүчил үүсгэх; (е) H₂ ба Pt/Ni катализатортайгаар халаахад бензолын цагиргийг гидрогенжүүлж циклогексан цагираг үүсгэх.'],
      [2, 'Describe the mechanism of electrophilic substitution in arenes: (a) as exemplified by the formation of nitrobenzene and bromobenzene; (b) with regard to the effect of delocalisation (aromatic stabilisation) of electrons in arenes in explaining the predominance of substitution over addition.', 'Аренд электрофилийн орлуулалтын механизмыг тодорхойлох: (а) нитробензол ба бромбензол үүсэхээр жишээлэн; (б) аренд электроныг ион тусгаарлах (ароматик тогтвортой байдал) нөлөөгөөр нэмэлтээс орлуулалт давамгайлахыг тайлбарлах.'],
      [3, 'Predict whether halogenation will occur in the side-chain or in the aromatic ring in arenes, depending on reaction conditions.', 'Урвалын нөхцөлөөс хамаарч аренд галогенжилт хажуугийн гинжинд эсвэл ароматик цагиргт явагдахыг урьдчилан таамаглах.'],
      [4, 'Describe that in the electrophilic substitution of arenes, different substituents direct to different ring positions (limited to the directing effects of –NH₂, –OH, –R, –NO₂, –COOH and –COR).', 'Аренд электрофилийн орлуулалтад өөр өөр орлуулагч цагиргийн өөр байрлалд чиглүүлдгийг тодорхойлох (–NH₂, –OH, –R, –NO₂, –COOH, –COR-ийн чиглүүлэх нөлөөгөөр хязгаарлагдана).']
    ]
  },
  {
    ref: '31.1',
    en: 'Halogen compounds',
    mn: 'Галоген нэгдлүүд',
    obj: [
      [1, 'Recall the reactions by which halogenoarenes can be produced: substitution of an arene with Cl₂ or Br₂ in the presence of AlCl₃ or AlBr₃ catalyst to form a halogenoarene, exemplified by benzene to chlorobenzene, and methylbenzene to 2-chloromethylbenzene and 4-chloromethylbenzene.', 'Галогеноаренийг гарган авах урвалыг санах: AlCl₃ эсвэл AlBr₃ катализатортайгаар аренийг Cl₂ эсвэл Br₂-оор орлуулж галогеноарен үүсгэх (бензол → хлорбензол; метилбензол → 2-хлорметилбензол ба 4-хлорметилбензол).'],
      [2, 'Explain the difference in reactivity between a halogenoalkane and a halogenoarene, exemplified by chloroethane and chlorobenzene.', 'Галогеналкан ба галогеноарены идэвхийн ялгааг хлорэтан ба хлорбензолоор жишээлэн тайлбарлах.']
    ]
  },
  {
    ref: '32.1',
    en: 'Alcohols',
    mn: 'Спиртүүд',
    obj: [
      [1, 'Describe the reaction with acyl chlorides to form esters, using ethyl ethanoate as an example.', 'Ацил хлоридтой урвалд эфир үүсгэхийг этил этаноатыг жишээ болгон тодорхойлох.']
    ]
  },
  {
    ref: '32.2',
    en: 'Phenol',
    mn: 'Фенол',
    obj: [
      [1, 'Recall the reactions by which phenol can be produced: reaction of phenylamine with HNO₂ or NaNO₂ and dilute acid below 10 °C to produce a diazonium salt; further warming of the diazonium salt with H₂O to give phenol.', 'Фенолыг гарган авах урвалыг санах: фениламиныг 10 °C-аас доош HNO₂ эсвэл NaNO₂ ба шингэрүүлсэн хүчилтэй урвалд оруулж диазонийн давс үүсгэх; диазонийн давсыг H₂O-тай цаашид халаж фенол гаргах.'],
      [2, 'Recall the chemistry of phenol, exemplified by: (a) reaction with bases, for example NaOH(aq) to produce sodium phenoxide; (b) reaction with Na(s) to produce sodium phenoxide and H₂(g); (c) reaction with diazonium salts in NaOH(aq) to give azo compounds; (d) nitration of the aromatic ring with dilute HNO₃(aq) at room temperature to give a mixture of 2-nitrophenol and 4-nitrophenol; (e) bromination of the aromatic ring with Br₂(aq) to form 2,4,6-tribromophenol.', 'Фенолын химийг санах, жишээ нь: (а) суурьтай урвал, жишээ нь NaOH(aq) ба натрийн фенокси үүсгэх; (б) Na(s)-тэй урвал, натрийн фенокси ба H₂(g) үүсгэх; (в) NaOH(aq) дахь диазонийн давстай урвал, азо нэгдэл үүсгэх; (г) өрөөний температурт шингэрүүлсэн HNO₃(aq)-аар ароматик цагиргийг нитрлэж 2-нитрофенол ба 4-нитрофенолын холимог гаргах; (д) Br₂(aq)-аар ароматик цагиргийг бромжуулж 2,4,6-трибромфенол үүсгэх.'],
      [3, 'Explain the acidity of phenol.', 'Фенолын хүчиллэг чанарыг тайлбарлах.'],
      [4, 'Describe and explain the relative acidities of water, phenol and ethanol.', 'Ус, фенол ба этанолын харьцангуй хүчиллэг чанарыг тодорхойлж, тайлбарлах.'],
      [5, 'Explain why the reagents and conditions for the nitration and bromination of phenol are different from those for benzene.', 'Фенолын нитрлэх ба бромжуулах урвалж ба нөхцөл бензолынхоос яагаад ялгаатайг тайлбарлах.'],
      [6, 'Recall that the hydroxyl group of a phenol directs to the 2-, 4- and 6-positions.', 'Фенолын гидроксил бүлэг 2-, 4- ба 6-р байрлалд чиглүүлдгийг санах.'],
      [7, 'Apply knowledge of the reactions of phenol to those of other phenolic compounds, for example naphthol.', 'Фенолын урвалын мэдлэгийг бусад фенолын нэгдэл, жишээ нь нафтолд хэрэглэх.']
    ]
  },
  {
    ref: '33.1',
    en: 'Carboxylic acids',
    mn: 'Карбоксилын хүчил',
    obj: [
      [1, 'Recall the reaction by which benzoic acid can be produced: reaction of an alkylbenzene with hot alkaline KMnO₄ and then dilute acid, exemplified by methylbenzene.', 'Бензойн хүчлийг гарган авах урвалыг санах: алкилбензолыг халуун шүлтлэг KMnO₄, дараа нь шингэрүүлсэн хүчлээр урвалд оруулах (метилбензолоор жишээлсэн).'],
      [2, 'Describe the reaction of carboxylic acids with PCl₃ and heat, PCl₅ or SOCl₂ to form acyl chlorides.', 'Карбоксилын хүчлийг PCl₃ ба халаалт, PCl₅ эсвэл SOCl₂-тай урвалд оруулж ацил хлорид үүсгэхийг тодорхойлох.'],
      [3, 'Recognise that some carboxylic acids can be further oxidised: (a) methanoic acid, HCOOH, is oxidised by Fehling’s reagent, Tollens’ reagent, acidified KMnO₄ or acidified K₂Cr₂O₇ to carbon dioxide and water; (b) ethanedioic acid, HOOCCOOH, is oxidised by warm acidified KMnO₄ to carbon dioxide.', 'Зарим карбоксилын хүчлийг цаашид исэлдэж болохыг таних: (а) метанойн хүчил HCOOH нь Фелингийн, Толлений реагент, хүчиллэг KMnO₄ эсвэл K₂Cr₂O₇-оор нүүрсхүчлийн хий ба ус болж исэлдэнэ; (б) этандиойн хүчил HOOCCOOH нь халуун хүчиллэг KMnO₄-ээр нүүрсхүчлийн хий болж исэлдэнэ.'],
      [4, 'Describe and explain the relative acidities of carboxylic acids, phenols and alcohols.', 'Карбоксилын хүчил, фенол ба спиртүүдийн харьцангуй хүчиллэг чанарыг тодорхойлж, тайлбарлах.'],
      [5, 'Describe and explain the relative acidities of chlorine-substituted carboxylic acids.', 'Хлороор орлуулагдсан карбоксилын хүчлийн харьцангуй хүчиллэг чанарыг тодорхойлж, тайлбарлах.']
    ]
  },
  {
    ref: '33.2',
    en: 'Esters',
    mn: 'Эфир',
    obj: [
      [1, 'Recall the reaction by which esters can be produced: reaction of alcohols with acyl chlorides, using the formation of ethyl ethanoate and phenyl benzoate as examples.', 'Эфирийг гарган авах урвалыг санах: спиртийг ацил хлоридтой урвалд оруулах; этил этаноат ба фенил бензоатын үүсэхийг жишээ болгон авах.']
    ]
  },
  {
    ref: '33.3',
    en: 'Acyl chlorides',
    mn: 'Ацил хлоридууд',
    obj: [
      [1, 'Recall the reactions (reagents and conditions) by which acyl chlorides can be produced: reaction of carboxylic acids with PCl₃ and heat, PCl₅ or SOCl₂.', 'Ацил хлоридыг гарган авах урвалыг (урвалж, нөхцөл) санах: карбоксилын хүчлийг PCl₃ ба халаалт, PCl₅ эсвэл SOCl₂-тай урвалд оруулах.'],
      [2, 'Describe the following reactions of acyl chlorides: (a) hydrolysis with water at room temperature to give the carboxylic acid and HCl; (b) reaction with an alcohol at room temperature to produce an ester and HCl; (c) reaction with phenol at room temperature to produce an ester and HCl; (d) reaction with ammonia at room temperature to produce an amide and HCl; (e) reaction with a primary or secondary amine at room temperature to produce an amide and HCl.', 'Ацил хлоридын дараах урвалыг тодорхойлох: (а) өрөөний температурт усаар гидролиз хийж карбоксилын хүчил ба HCl гаргах; (б) өрөөний температурт спирттэй урвалд орж эфир ба HCl үүсгэх; (в) өрөөний температурт фенолтой урвалд орж эфир ба HCl үүсгэх; (г) өрөөний температурт аммиактай урвалд орж амид ба HCl үүсгэх; (д) өрөөний температурт анхдагч эсвэл хоёрдогч аминтай урвалд орж амид ба HCl үүсгэх.'],
      [3, 'Describe the addition–elimination mechanism of acyl chlorides in the reactions in 33.3.2(a)–(e).', '33.3.2(а)–(д)-д заасан ацил хлоридын урвалын нэмэлт–салгалтын механизмыг тодорхойлох.'],
      [4, 'Explain the relative ease of hydrolysis of acyl chlorides, alkyl chlorides and halogenoarenes (aryl chlorides).', 'Ацил хлорид, алкил хлорид ба галогеноарены (арил хлорид) гидролизийн харьцангуй хялбар байдлыг тайлбарлах.']
    ]
  },
  {
    ref: '34.1',
    en: 'Primary and secondary amines',
    mn: 'Анхдагч ба хоёрдогч аминууд',
    obj: [
      [1, 'Recall the reactions (reagents and conditions) by which primary and secondary amines are produced: (a) reaction of halogenoalkanes with NH₃ in ethanol heated under pressure; (b) reaction of halogenoalkanes with primary amines in ethanol, heated in a sealed tube or under pressure; (c) reduction of amides with LiAlH₄; (d) reduction of nitriles with LiAlH₄ or H₂/Ni.', 'Анхдагч ба хоёрдогч аминыг гарган авах урвалыг (урвалж, нөхцөл) санах: (а) галогеналканыг этанол дахь NH₃-тай даралтын дор халаах; (б) галогеналканыг этанол дахь анхдагч аминтай битүү хоолойд эсвэл даралтын дор халаах; (в) амидыг LiAlH₄-аар ангижруулах; (г) нитрилийг LiAlH₄ эсвэл H₂/Ni-ээр ангижруулах.'],
      [2, 'Describe the condensation reaction of ammonia or an amine with an acyl chloride at room temperature to give an amide.', 'Аммиак эсвэл аминыг өрөөний температурт ацил хлоридтой конденсацийн урвалд оруулж амид үүсгэхийг тодорхойлох.'],
      [3, 'Describe and explain the basicity of aqueous solutions of amines.', 'Аминийн усан уусмалын суурийн чанарыг тодорхойлж, тайлбарлах.']
    ]
  },
  {
    ref: '34.2',
    en: 'Phenylamine and azo compounds',
    mn: 'Фениламин ба азо нэгдлүүд',
    obj: [
      [1, 'Describe the preparation of phenylamine via the nitration of benzene to form nitrobenzene, followed by reduction with hot Sn/concentrated HCl and then NaOH(aq).', 'Фениламиныг гарган авах: бензолыг нитрлэж нитробензол үүсгэх, дараа нь халуун Sn/өтгөн HCl-ээр ангижруулж, дараа нь NaOH(aq)-ээр хүчиллийг саармагжуулах.'],
      [2, 'Describe: (a) the reaction of phenylamine with Br₂(aq) at room temperature; (b) the reaction of phenylamine with HNO₂ or NaNO₂ and dilute acid below 10 °C to produce a diazonium salt, and further warming of the diazonium salt with H₂O to give phenol.', 'Тодорхойлох: (а) фениламины Br₂(aq)-тай өрөөний температурт урвал; (б) фениламиныг 10 °C-аас доош HNO₂ эсвэл NaNO₂ ба шингэрүүлсэн хүчилтэй урвалд оруулж диазонийн давс үүсгэх, дараа нь H₂O-тай халааж фенол гаргах.'],
      [3, 'Describe and explain the relative basicities of aqueous ammonia, ethylamine and phenylamine.', 'Усан аммиак, этиламин ба фениламиний харьцангуй суурийн чанарыг тодорхойлж, тайлбарлах.'],
      [4, 'Recall the following about azo compounds: (a) describe the coupling of benzenediazonium chloride with phenol in NaOH(aq) to form an azo compound; (b) identify the azo group; (c) state that azo compounds are often used as dyes; (d) that other azo dyes can be formed via a similar route.', 'Азо нэгдлийн тухай дараахыг санах: (а) NaOH(aq) дахь бензолдиазонийн хлоридыг фенолтой холбоход азо нэгдэл үүсэхийг тодорхойлох; (б) азо бүлгийг таних; (в) азо нэгдлийг ихэвчлэн будагт ашигладагийг хэлэх; (г) ижил замаар бусад азо будаг үүсэж болохыг.']
    ]
  },
  {
    ref: '34.3',
    en: 'Amides',
    mn: 'Амидууд',
    obj: [
      [1, 'Recall the reactions (reagents and conditions) by which amides are produced: (a) the reaction between ammonia and an acyl chloride at room temperature; (b) the reaction between a primary amine and an acyl chloride at room temperature.', 'Амидыг гарган авах урвалыг (урвалж, нөхцөл) санах: (а) аммиак ба ацил хлоридын өрөөний температурт урвал; (б) анхдагч амин ба ацил хлоридын өрөөний температурт урвал.'],
      [2, 'Describe the reactions of amides: (a) hydrolysis with aqueous alkali or aqueous acid; (b) the reduction of the C=O group in amides with LiAlH₄ to form an amine.', 'Амидын урвалыг тодорхойлох: (а) усан шүлт эсвэл усан хүчлээр гидролиз; (б) амид дахь C=O бүлгийг LiAlH₄-аар ангижруулж амин үүсгэх.'],
      [3, 'State and explain why amides are much weaker bases than amines.', 'Амид яагаад аминаас хамаагүй сул суурь болохыг хэлж, тайлбарлах.']
    ]
  },
  {
    ref: '34.4',
    en: 'Amino acids',
    mn: 'Амино хүчил',
    obj: [
      [1, 'Describe the acid/base properties of amino acids and the formation of zwitterions, including the isoelectric point.', 'Амино хүчлийн хүчил/суурийн шинж чанар ба цвиттер ион үүсэхийг, түүний дотор изоцахилгаан цэгийг тодорхойлох.'],
      [2, 'Describe the formation of amide (peptide) bonds between amino acids to give di- and tripeptides.', 'Амино хүчлүүдийн хооронд амид (пептид) холбоо үүсэж дипептид ба трипептид үүсэхийг тодорхойлох.'],
      [3, 'Interpret and predict the results of electrophoresis on mixtures of amino acids and dipeptides at varying pHs (the assembling of the apparatus will not be tested).', 'Янз бүрийн pH-д амино хүчил ба дипептидийн холимгийн электрофорезын үр дүнг тайлбарлах, урьдчилан таамаглах (аппаратыг угсрах нь шалгагдахгүй).']
    ]
  },
  {
    ref: '35.1',
    en: 'Condensation polymerisation',
    mn: 'Конденсацийн полимержилт',
    obj: [
      [1, 'Describe the formation of polyesters: (a) the reaction between a diol and a dicarboxylic acid or dioyl chloride; (b) the reaction of a hydroxycarboxylic acid.', 'Полиэфир үүсэхийг тодорхойлох: (а) диол ба дикарбоксилын хүчил эсвэл диоил хлоридын урвал; (б) гидроксикарбоксилын хүчлийн урвал.'],
      [2, 'Describe the formation of polyamides: (a) the reaction between a diamine and a dicarboxylic acid or dioyl chloride; (b) the reaction of an aminocarboxylic acid; (c) the reaction between amino acids.', 'Полиамид үүсэхийг тодорхойлох: (а) диамин ба дикарбоксилын хүчил эсвэл диоил хлоридын урвал; (б) аминокарбоксилын хүчлийн урвал; (в) амино хүчлүүдийн хоорондын урвал.'],
      [3, 'Deduce the repeat unit of a condensation polymer obtained from a given monomer or pair of monomers.', 'Өгөгдсөн монометр эсвэл монометрийн хослолоос үүссэн конденсацийн полимерийн давтагдах нэгжийг тодорхойлох.'],
      [4, 'Identify the monomer(s) present in a given section of a condensation polymer molecule.', 'Конденсацийн полимерийн молекулын өгөгдсөн хэсэгт байгаа монометрийг таних.']
    ]
  },
  {
    ref: '35.2',
    en: 'Predicting the type of polymerisation',
    mn: 'Полимержилтийн төрлийг таамаглах',
    obj: [
      [1, 'Predict the type of polymerisation reaction for a given monomer or pair of monomers.', 'Өгөгдсөн монометр эсвэл монометрийн хослолын полимержилтийн урвалын төрлийг урьдчилан таамаглах.'],
      [2, 'Deduce the type of polymerisation reaction which produces a given section of a polymer molecule.', 'Полимерийн молекулын өгөгдсөн хэсгийг үүсгэх полимержилтийн урвалын төрлийг тодорхойлох.']
    ]
  },
  {
    ref: '35.3',
    en: 'Degradable polymers',
    mn: 'Задардаг полимер',
    obj: [
      [1, 'Recognise that poly(alkenes) are chemically inert and can therefore be difficult to biodegrade.', 'Поли(алкен) нь химийн хувьд идэвхгүй тул биологийн задралд хүндрэлтэй байж болохыг таних.'],
      [2, 'Recognise that some polymers can be degraded by the action of light.', 'Зарим полимер гэрлийн нөлөөгөөр задарч болохыг таних.'],
      [3, 'Recognise that polyesters and polyamides are biodegradable by acidic and alkaline hydrolysis.', 'Полиэфир ба полиамид хүчиллэг ба шүлтлэг гидролизээр биологийн аргаар задардаг болохыг таних.']
    ]
  },
  {
    ref: '36.1',
    en: 'Organic synthesis',
    mn: 'Органик синтез',
    obj: [
      [1, 'For an organic molecule containing several functional groups: (a) identify organic functional groups using the reactions in the syllabus; (b) predict properties and reactions.', 'Олон функциональ бүлэгтэй органик молекулд: (а) хөтөлбөрийн урвалаар функциональ бүлгийг таних; (б) шинж чанар ба урвалыг урьдчилан таамаглах.'],
      [2, 'Devise multi-step synthetic routes for preparing organic molecules using the reactions in the syllabus.', 'Хөтөлбөрийн урвалуудыг ашиглан органик молекул бэлтгэх олон алхамт синтезийн замыг зохиох.'],
      [3, 'Analyse a given synthetic route in terms of type of reaction and reagents used for each step of it, and possible by-products.', 'Өгөгдсөн синтезийн замыг алхам бүрийн урвалын төрөл, ашигласан урвалж ба боломжит побочный бүтээгдэхүүнээр шинжлэх.']
    ]
  },
  {
    ref: '37.1',
    en: 'Thin-layer chromatography',
    mn: 'Нимгэн давхаргын хроматографи',
    obj: [
      [1, 'Describe and understand the terms: (a) stationary phase, for example aluminium oxide (on a solid support); (b) mobile phase, a polar or non-polar solvent; (c) Rf value; (d) solvent front and baseline.', 'Дараах нэр томъёог тодорхойлж, ойлгох: (а) тогтмол фаз, жишээ нь хатуу тулгуур дээрх алюминий исэл; (б) хөдөлгөөнт фаз, туйлт эсвэл туйлгүй уусгагч; (в) Rf утга; (г) уусгагчийн фронт ба суурь шугам.'],
      [2, 'Interpret Rf values.', 'Rf утгыг тайлбарлах.'],
      [3, 'Explain the differences in Rf values in terms of interaction with the stationary phase and of relative solubility in the mobile phase.', 'Rf утгын ялгааг тогтмол фазтай харилцан үйлчлэл ба хөдөлгөөнт фазад харьцангуй уусах чанараар тайлбарлах.']
    ]
  },
  {
    ref: '37.2',
    en: 'Gas / liquid chromatography',
    mn: 'Хий / шингэн хроматографи',
    obj: [
      [1, 'Describe and understand the terms: (a) stationary phase, a high boiling point non-polar liquid (on a solid support); (b) mobile phase, an unreactive gas; (c) retention time.', 'Дараах нэр томъёог тодорхойлж, ойлгох: (а) тогтмол фаз, буцлах цэг өндөр туйлгүй шингэн (хатуу тулгуур дээр); (б) хөдөлгөөнт фаз, идэвхгүй хий; (в) барьцаалах хугацаа.'],
      [2, 'Interpret gas / liquid chromatograms in terms of the percentage composition of a mixture.', 'Хий / шингэн хроматограммыг холимгийн хувийн найрлагаар тайлбарлах.'],
      [3, 'Explain retention times in terms of interaction with the stationary phase.', 'Барьцаалах хугацааг тогтмол фазтай харилцан үйлчлэлээр тайлбарлах.']
    ]
  },
  {
    ref: '37.3',
    en: 'Carbon-13 NMR spectroscopy',
    mn: 'Нүүрстөрөгч-13 ЯМР спектроскопи',
    obj: [
      [1, 'Analyse and interpret a carbon-13 NMR spectrum of a simple molecule to deduce: (a) the different environments of the carbon atoms present; (b) the possible structures for the molecule.', 'Энгийн молекулын нүүрстөрөгч-13 ЯМР спектрийг шинжилж, тайлбарлаж дараахыг тодорхойлох: (а) нүүрстөрөгчийн атомуудын өөр өөр орчин; (б) молекулын боломжит бүтэц.'],
      [2, 'Predict or explain the number of peaks in a carbon-13 NMR spectrum for a given molecule.', 'Өгөгдсөн молекулын нүүрстөрөгч-13 ЯМР спектрийн оргилын тоог урьдчилан таамаглах эсвэл тайлбарлах.']
    ]
  },
  {
    ref: '37.4',
    en: 'Proton (¹H) NMR spectroscopy',
    mn: 'Протоны (¹H) ЯМР спектроскопи',
    obj: [
      [1, 'Analyse and interpret a proton (¹H) NMR spectrum of a simple molecule to deduce: (a) the different environments of protons, using chemical shift values; (b) the relative numbers of each type of proton, from relative peak areas; (c) the number of equivalent protons on the adjacent carbon atom, from the splitting pattern, using the n + 1 rule (limited to singlet, doublet, triplet, quartet and multiplet); (d) the possible structures for the molecule.', 'Энгийн молекулын протоны (¹H) ЯМР спектрийг шинжилж, тайлбарлаж дараахыг тодорхойлох: (а) химийн шилжилтийн утгаар протоны өөр өөр орчин; (б) оргилын талбайгаар протоны төрөл бүрийн харьцангуй тоо; (в) n + 1 дүрмээр ойр зэргэлдээх нүүрстөрөгч дээрх адилхан протоны тоо (singlet, doublet, triplet, quartet, multiplet-ээр хязгаарлагдана); (г) молекулын боломжит бүтэц.'],
      [2, 'Predict the chemical shifts and splitting patterns of the protons in a given molecule.', 'Өгөгдсөн молекулын протоны химийн шилжилт ба задралын загварыг урьдчилан таамаглах.'],
      [3, 'Describe the use of tetramethylsilane, TMS, as the standard for chemical shift measurements.', 'Химийн шилжилтийг хэмжихэд стандарт болгон тетраметилсилан (TMS) ашиглахыг тодорхойлох.'],
      [4, 'State the need for deuterated solvents, for example CDCl₃, when obtaining a proton NMR spectrum.', 'Протоны ЯМР спектр авахад дейтерийн уусгагч, жишээ нь CDCl₃ хэрэгтэйг хэлэх.'],
      [5, 'Describe the identification of O–H and N–H protons by proton exchange using D₂O.', 'D₂O ашиглан протон солилцоогоор O–H ба N–H протоныг таних аргыг тодорхойлох.']
    ]
  }
];
