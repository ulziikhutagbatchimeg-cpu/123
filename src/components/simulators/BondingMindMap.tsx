import React from 'react';

// The theory of the structure and bonding section on one map. The IGCSE 0620 map groups the bonds between atoms
// (strong) and the forces between molecules (weak). The A Level map follows the official 9701 Topic 3 subsections 3.1–3.7 and 4.2.

type Programme = 'igcse' | 'alevel';

interface Leaf {
  titleEn: string;
  titleMn: string;
  textEn: string;
  textMn: string;
}

interface Branch {
  titleEn: string;
  titleMn: string;
  tone: string;
  leaves: Leaf[];
}

interface MapContent {
  rootEn: string;
  rootMn: string;
  introEn: string;
  introMn: string;
  branches: Branch[];
}

const IGCSE_MAP: MapContent = {
  rootEn: 'Structure and chemical bonding',
  rootMn: 'Бүтэц ба химийн холбоо',
  introEn: 'Bonds between atoms decide the structure. Forces between molecules only decide how easily a simple molecular substance melts and boils.',
  introMn: 'Атом хоорондын холбоо бүтцийг тодорхойлно. Молекул хоорондын хүч зөвхөн энгийн молекулт бодисын хайлах, буцлах цэгийг тодорхойлно.',
  branches: [
    {
      titleEn: 'Bonds between atoms: strong',
      titleMn: 'Атом хоорондын холбоо: хүчтэй',
      tone: 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200',
      leaves: [
        {
          titleEn: 'Ionic',
          titleMn: 'Ионы холбоо',
          textEn: 'Electrons move from a metal to a non-metal (Group I and Group VII), forming cations and anions. The strong electrostatic attraction between them is the ionic bond. High melting and boiling points; conducts when molten or aqueous, but not when solid.',
          textMn: 'Электрон металлаас металл бус руу шилжиж (I ба VII бүлэг) катион, анион үүснэ. Тэдгээрийн хоорондох хүчтэй цахилгаан статик татах хүч нь ионы холбоо. Хайлах, буцлах цэг өндөр; хайлсан эсвэл усан уусмалд дамжуулна, хатуу үед дамжуулахгүй.'
        },
        {
          titleEn: 'Covalent',
          titleMn: 'Ковалент холбоо',
          textEn: 'A shared pair of electrons gives each atom a noble gas configuration. Simple molecules (H₂, Cl₂, H₂O, CH₄, NH₃, HCl) are held together by covalent bonds. Giant covalent structures (diamond, graphite, SiO₂) have strong covalent bonds throughout.',
          textMn: 'Электроны хос хуваалцсанаар атом бүрт инертийн хийн электрон бүтэц үүснэ. Энгийн молекул (H₂, Cl₂, H₂O, CH₄, NH₃, HCl) ковалент холбоогоор холбогдоно. Аварга ковалент бүтэц (алмаз, графит, SiO₂) бүх хэсэгтээ бат ковалент холбоотой.'
        },
        {
          titleEn: 'Metallic',
          titleMn: 'Металлын холбоо',
          textEn: 'Positive ions in a giant lattice are held by electrostatic attraction to a "sea" of delocalised electrons. This explains the good electrical conductivity, malleability and ductility of metals.',
          textMn: 'Аварга торын эерэг ионууд ион тусгаарлагдаагүй "далай" электронтой цахилгаан статик татилцана. Энэ нь металлын сайн цахилгаан дамжуулах, ковалдагдах ба чигжигдэх чанарыг тайлбарлана.'
        }
      ]
    },
    {
      titleEn: 'Forces between molecules: weak',
      titleMn: 'Молекул хоорондын хүч: сул',
      tone: 'border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200',
      leaves: [
        {
          titleEn: 'Low melting and boiling points',
          titleMn: 'Хайлах, буцлах цэг бага',
          textEn: 'Simple molecular substances melt and boil when the weak forces between molecules are overcome. The covalent bonds inside each molecule are not broken.',
          textMn: 'Энгийн молекулт бодис молекул хоорондын сул хүчийг даван туулахад хайлж, буцална. Молекул дотрох ковалент холбоо эвдэрдэггүй.'
        },
        {
          titleEn: 'Poor electrical conductivity',
          titleMn: 'Цахилгаан дамжуулах чадвар муу',
          textEn: 'Simple molecular compounds have no ions or free electrons to carry charge.',
          textMn: 'Энгийн молекулт нэгдэлд цэнэг зөөх ион эсвэл чөлөөт электрон байхгүй.'
        },
        {
          titleEn: 'Size of the forces',
          titleMn: 'Хүчний хэмжээ',
          textEn: 'The specific types of intermolecular forces are not required. Stronger forces between molecules mean a higher boiling point (see the heating simulation below).',
          textMn: 'Молекул хоорондын хүчний төрлийг нэрлэх шаардлагагүй. Молекулын хоорондох хүч илүү хүчтэй бол буцлах цэг өндөр байна (доорх халаалтын симуляцийг харна уу).'
        }
      ]
    }
  ]
};

// The official 9701 (2025-2027) Topic 3 subsections 3.1-3.7 (Chemical bonding); the leaves paraphrase the learning outcomes
const ALEVEL_MAP: MapContent = {
  rootEn: 'Chemical bonding and structure (9701)',
  rootMn: 'Химийн холбоо ба бүтэц (9701)',
  introEn: 'The branches follow the official 9701 (2025–2027) Topic 3 subsections 3.1–3.7, and subsection 4.2 from Topic 4.',
  introMn: 'Салбарууд нь 9701 (2025–2027) албан ёсны 3-р сэдвийн 3.1–3.7 дэд хэсэг, мөн 4-р сэдвийн 4.2 дэд хэсгээр ангилагдсан.',
  branches: [
    {
      titleEn: '3.1 Electronegativity and bonding',
      titleMn: '3.1 Цахилгаан сөрөг чанар ба холбоо',
      tone: 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200',
      leaves: [
        {
          titleEn: 'Electronegativity',
          titleMn: 'Цахилгаан сөрөг чанар',
          textEn: 'The power of an atom to attract electrons to itself. It depends on nuclear charge, atomic radius and shielding by inner shells; it increases across a period and decreases down a group.',
          textMn: 'Атомын электроныг өөртөө татах чадвар. Цөмийн цэнэг, атомын радиус, дотоод бүрхүүлийн халхлалаас хамаарна; үеийн дагуу нэмэгдэж, бүлгийн дагуу буурна.'
        },
        {
          titleEn: 'Predicting the bond type',
          titleMn: 'Холбооны төрлийг таамаглах',
          textEn: 'Use the difference in Pauling electronegativity values to predict whether a bond is ionic or covalent.',
          textMn: 'Паулингийн цахилгаан сөрөг чанарын зөрүүгээр холбоо нь ионы эсвэл ковалент болохыг урьдчилан таамаглах.'
        }
      ]
    },
    {
      titleEn: '3.2 Ionic bonding',
      titleMn: '3.2 Ионы холбоо',
      tone: 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200',
      leaves: [
        {
          titleEn: 'Electrostatic attraction of ions',
          titleMn: 'Ионуудын цахилгаан статик таталцал',
          textEn: 'Ionic bonding is the electrostatic attraction between oppositely charged cations and anions, as in sodium chloride, magnesium oxide and calcium fluoride.',
          textMn: 'Ионы холбоо нь эсрэг цэнэгтэй катион ба анионы хоорондох цахилгаан статик таталцал; жишээ нь натрийн хлорид, магнийн исэл, кальцийн фторид.'
        }
      ]
    },
    {
      titleEn: '3.3 Metallic bonding',
      titleMn: '3.3 Металлын холбоо',
      tone: 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200',
      leaves: [
        {
          titleEn: 'Positive ions and delocalised electrons',
          titleMn: 'Эерэг ион ба ион тусгаарлагдаагүй электрон',
          textEn: 'Metallic bonding is the electrostatic attraction between positive metal ions and delocalised electrons.',
          textMn: 'Металлын холбоо нь эерэг металлын ион ба ион тусгаарлагдаагүй электроны хоорондох цахилгаан статик таталцал.'
        }
      ]
    },
    {
      titleEn: '3.4 Covalent and coordinate bonding',
      titleMn: '3.4 Ковалент ба координацын холбоо',
      tone: 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200',
      leaves: [
        {
          titleEn: 'Covalent bonding and octet expansion',
          titleMn: 'Ковалент холбоо ба октетын тэлэлт',
          textEn: 'A shared pair of electrons held by the attraction of two nuclei, as in H₂, O₂, N₂, Cl₂, HCl, CO₂, NH₃, CH₄, C₂H₆ and C₂H₄. Period 3 elements can expand their octet (SO₂, PCl₅, SF₆).',
          textMn: 'Хоёр цөмийн татах хүчээр барьцалдсан хуваалцсан электрон хос; жишээ нь H₂, O₂, N₂, Cl₂, HCl, CO₂, NH₃, CH₄, C₂H₆, C₂H₄. 3-р үеийн элемент октетоо тэлж чадна (SO₂, PCl₅, SF₆).'
        },
        {
          titleEn: 'Coordinate (dative covalent) bonding',
          titleMn: 'Координацын (донор-акцепторын) холбоо',
          textEn: 'Both electrons of the shared pair come from one atom, as in the ammonium ion NH₄⁺ and in Al₂Cl₆.',
          textMn: 'Хуваалцсан электрон хосын хоёуланг нь нэг атом гаргана; жишээ нь аммонийн ион NH₄⁺ ба Al₂Cl₆.'
        },
        {
          titleEn: 'σ and π bonds, hybridisation',
          titleMn: 'σ ба π холбоо, гибриджилт',
          textEn: 'σ bonds form by direct overlap of orbitals; π bonds form by sideways overlap of p orbitals. Use sp, sp² and sp³ hybridisation (C₂H₆, C₂H₄, HCN, N₂).',
          textMn: 'σ холбоо нь орбиталийн шууд давхцлаар; π холбоо нь p орбиталийн хажуугийн давхцлаар үүснэ. sp, sp², sp³ гибриджилтийг ашиглана (C₂H₆, C₂H₄, HCN, N₂).'
        },
        {
          titleEn: 'Bond energy and bond length',
          titleMn: 'Холбооны энерги ба холбооны урт',
          textEn: 'Bond energy is the energy needed to break one mole of a covalent bond in the gaseous state; bond length is the distance between the two nuclei. Both are used to compare reactivity.',
          textMn: 'Холбооны энерги нь хийн төлөвт нэг моль ковалент холбоо таслахад шаардагдах энерги; холбооны урт нь хоёр цөмийн хоорондох зай. Хоёуланг нь урвалын идэвхийг харьцуулахад ашиглана.'
        }
      ]
    },
    {
      titleEn: '3.5 Shapes of molecules (VSEPR)',
      titleMn: '3.5 Молекулын хэлбэр (VSEPR)',
      tone: 'border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200',
      leaves: [
        {
          titleEn: 'Shapes and bond angles',
          titleMn: 'Хэлбэр ба холбооны өнцөг',
          textEn: 'Use VSEPR theory to explain shapes and bond angles: BF₃ trigonal planar 120°, CO₂ linear 180°, CH₄ tetrahedral 109.5°, NH₃ pyramidal 107°, H₂O non-linear 104.5°, SF₆ octahedral 90°, PF₅ trigonal bipyramidal 120° and 90°.',
          textMn: 'VSEPR онолоор хэлбэр, холбооны өнцгийг тайлбарлах: BF₃ гурвалжин хавтгай 120°, CO₂ шугаман 180°, CH₄ тетраэдр 109.5°, NH₃ пирамид 107°, H₂O шугаман бус 104.5°, SF₆ октаэдр 90°, PF₅ гурвалжин бипирамид 120° ба 90°.'
        }
      ]
    },
    {
      titleEn: '3.6 Intermolecular forces and bond properties',
      titleMn: '3.6 Молекул хоорондын хүч ба холбооны шинж чанар',
      tone: 'border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200',
      leaves: [
        {
          titleEn: 'van der Waals\' forces',
          titleMn: 'Ван дер Ваальсын хүч',
          textEn: 'Instantaneous dipole–induced dipole (id-id, London) and permanent dipole–permanent dipole (pd-pd) forces. Ionic, covalent and metallic bonding are stronger than intermolecular forces.',
          textMn: 'Агшин зуурын диполь–индукцийн диполь (id-id, Лондон) ба байнгын диполь–байнгын диполь (pd-pd) хүч. Ионы, ковалент, металлын холбоо молекул хоорондын хүчнээс хүчтэй.'
        },
        {
          titleEn: 'Hydrogen bonding and water',
          titleMn: 'Устөрөгчийн холбоо ба ус',
          textEn: 'A special case of pd-pd forces, limited to molecules with N–H or O–H groups (ammonia, water). It explains water\'s high melting and boiling points, high surface tension, and ice being less dense than water.',
          textMn: 'pd-pd хүчний онцгой тохиолдол; зөвхөн N–H эсвэл O–H бүлэгтэй молекулд (аммиак, ус). Усны өндөр хайлах, буцлах цэг, өндөр гадаргуугийн таталцал, мөс усаас бага нягттай байхыг тайлбарлана.'
        },
        {
          titleEn: 'Bond polarity and dipole moments',
          titleMn: 'Холбооны туйл ба диполь момент',
          textEn: 'Use electronegativity to explain bond polarity and the dipole moments of molecules.',
          textMn: 'Цахилгаан сөрөг чанараар холбооны туйл ба молекулын диполь моментыг тайлбарлах.'
        }
      ]
    },
    {
      titleEn: '3.7 Dot-and-cross diagrams',
      titleMn: '3.7 Dot-and-cross диаграм',
      tone: 'border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200',
      leaves: [
        {
          titleEn: 'Ionic, covalent and coordinate bonding',
          titleMn: 'Ионы, ковалент ба координацын холбоо',
          textEn: 'Use dot-and-cross diagrams to show ionic, covalent and coordinate bonding, including the compounds in 3.4 and 3.5. Species with an expanded octet or an odd number of electrons may appear.',
          textMn: 'Ионы, ковалент ба координацын холбоог dot-and-cross диаграмаар дүрслэх; 3.4 ба 3.5-д заасан нэгдлүүдийг оруулна. Октетоо тэлсэн эсвэл сондгой электронтой бодис орж болно.'
        }
      ]
    },
    {
      titleEn: '4.2 Bonding and structure',
      titleMn: '4.2 Холбоо ба бүтэц',
      tone: 'border-teal-300 dark:border-teal-700 bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200',
      leaves: [
        {
          titleEn: 'Lattice structures',
          titleMn: 'Талст торын бүтэц',
          textEn: 'Describe the lattice structure of giant ionic (NaCl, MgO), simple molecular (I₂, C₆₀, ice), giant molecular (SiO₂, graphite, diamond) and giant metallic (copper) solids.',
          textMn: 'Аварга ионы (NaCl, MgO), энгийн молекулын (I₂, C₆₀, мөс), аварга молекулын (SiO₂, графит, алмаз) ба аварга металлын (зэс) хатуу биетийн торын бүтцийг тайлбарлах.'
        },
        {
          titleEn: 'Structure and physical properties',
          titleMn: 'Бүтэц ба физик шинж чанар',
          textEn: 'Predict and explain how structure and bonding affect melting point, boiling point, electrical conductivity and solubility; deduce the structure and bonding type from given information.',
          textMn: 'Бүтэц ба холбоо нь хайлах, буцлах цэг, цахилгаан дамжуулалт, уусах чанарт хэрхэн нөлөөлөхийг таамаглаж тайлбарлах; өгөгдлөөс бүтэц, холбооны төрлийг тодорхойлох.'
        }
      ]
    }
  ]
};

const CONTENT: Record<Programme, MapContent> = {
  igcse: IGCSE_MAP,
  alevel: ALEVEL_MAP
};

export const BondingMindMap: React.FC<{ mn: boolean; programme: Programme }> = ({ mn, programme }) => {
  const map = CONTENT[programme];

  return (
    <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 sm:p-6 space-y-5 shadow-xs">
      <div className="space-y-3 text-center">
        <div className="inline-block px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-black">
          {mn ? map.rootMn : map.rootEn}
        </div>
        <p className="mx-auto max-w-2xl text-xs text-slate-600 dark:text-slate-300">
          {mn ? map.introMn : map.introEn}
        </p>
        <div className="mx-auto h-5 w-px bg-slate-300 dark:bg-slate-700" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {map.branches.map(branch => (
          <div key={branch.titleEn} className="space-y-3">
            <div className={`rounded-2xl border px-4 py-2.5 text-sm font-black ${branch.tone}`}>
              {mn ? branch.titleMn : branch.titleEn}
            </div>
            <div className="ml-4 pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-3">
              {branch.leaves.map(leaf => (
                <div key={leaf.titleEn} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 space-y-1">
                  <div className="text-xs font-black text-slate-900 dark:text-white">{mn ? leaf.titleMn : leaf.titleEn}</div>
                  <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">{mn ? leaf.textMn : leaf.textEn}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
