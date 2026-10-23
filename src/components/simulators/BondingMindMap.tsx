import React from 'react';

// The theory of the structure and bonding section on one map. The IGCSE 0620 map groups the bonds between atoms
// (strong) and the forces between molecules (weak). The A Level map follows the 9701 Topic 3 subtopics 3.1–3.5.

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

// The 9701 Topic 3 subtopics (AS Chemical Bonding); the statements are the syllabus wording
const ALEVEL_MAP: MapContent = {
  rootEn: 'Chemical bonding (9701 Topic 3)',
  rootMn: 'Химийн холбоо (9701, сэдэв 3)',
  introEn: 'The branches follow the 9701 Topic 3 subtopics 3.1–3.5. Electronegativity and metallic bonding are named in the topic description.',
  introMn: 'Салбарууд нь 9701-ийн 3-р сэдвийн 3.1–3.5 дэд сэдвээр ангилагдсан. Цахилгаан сөрөг чанар ба металлын холбоо сэдвийн тодорхойлолтод орсон.',
  branches: [
    {
      titleEn: '3.1 Ionic bonding & lattice structures',
      titleMn: '3.1 Ионы холбоо ба талст тор',
      tone: 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200',
      leaves: [
        {
          titleEn: 'Ionic bonding',
          titleMn: 'Ионы холбоо',
          textEn: 'Define ionic bonding as electrostatic attraction between oppositely charged ions in a giant lattice; explain physical properties (melting point, brittleness, conductivity).',
          textMn: 'Ионы холбоог эсрэг цэнэгтэй ионуудын цахилгаан статик таталцал гэж тодорхойлох; хайлах температур, хэврэг чанар, цахилгаан дамжуулалтыг бүтэцтэй нь холбон тайлбарлах.'
        }
      ]
    },
    {
      titleEn: '3.2 Covalent & coordinate bonding',
      titleMn: '3.2 Ковалент ба координацын холбоо',
      tone: 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200',
      leaves: [
        {
          titleEn: 'Single, double and triple bonds; coordinate bonds',
          titleMn: 'Дан, дахар, гурвалсан холбоо; донор-акцепторын холбоо',
          textEn: 'Describe single, double and triple covalent bonds; describe coordinate (dative covalent) bonding in NH₄⁺ and Al₂Cl₆; describe octet expansion in SF₆, PCl₅, and SO₂.',
          textMn: 'Дан, дахар, гурвалсан ковалент холбоо; NH₄⁺ ба Al₂Cl₆ дахь донор-акцепторын холбоо; SF₆, PCl₅, SO₂ дахь октет тэлэлтийг тайлбарлах.'
        }
      ]
    },
    {
      titleEn: '3.3 VSEPR theory & molecular shapes',
      titleMn: '3.3 VSEPR онол ба молекулын хэлбэр',
      tone: 'border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200',
      leaves: [
        {
          titleEn: 'Shapes and bond angles',
          titleMn: 'Хэлбэр ба холбооны өнцөг',
          textEn: 'Use VSEPR theory to explain shapes and bond angles: linear (180° CO₂), trigonal planar (120° BF₃), tetrahedral (109.5° CH₄), pyramidal (107° NH₃), non-linear (104.5° H₂O), trigonal bipyramidal (PF₅), octahedral (90° SF₆).',
          textMn: 'VSEPR онолоор CO₂ (180°), BF₃ (120°), CH₄ (109.5°), NH₃ (107°), H₂O (104.5°), PF₅ (120° ба 90°), SF₆ (90°) молекулын хэлбэр, холбооны өнцгийг тайлбарлах.'
        }
      ]
    },
    {
      titleEn: '3.4 Sigma (σ) and pi (π) bonds',
      titleMn: '3.4 Сигма (σ) ба пи (π) холбоо',
      tone: 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200',
      leaves: [
        {
          titleEn: 'Orbital overlap',
          titleMn: 'Орбиталийн давхцал',
          textEn: 'Describe σ bonds (axial head-on overlap) and π bonds (sideways overlap of p orbitals); explain sp, sp² and sp³ hybridisation in ethane, ethene, ethyne and HCN.',
          textMn: 'Тэнхлэгийн дагуу шууд давхцах σ холбоо ба хажуугаараа давхцах π холбоог дүрслэх; этан, этен, этин ба HCN дахь sp, sp², sp³ гибриджилтийг тайлбарлах.'
        }
      ]
    },
    {
      titleEn: '3.5 Intermolecular forces & hydrogen bonding',
      titleMn: '3.5 Молекул хоорондын хүч ба устөрөгчийн холбоо',
      tone: 'border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200',
      leaves: [
        {
          titleEn: 'id-id, pd-pd and hydrogen bonding',
          titleMn: 'id-id, pd-pd ба устөрөгчийн холбоо',
          textEn: 'Describe id-id (London dispersion), pd-pd and hydrogen bonding; explain anomalous properties of water (density of ice, boiling point, surface tension).',
          textMn: 'Агшин зуурын диполь-индукцийн (id-id), байнгын диполь (pd-pd) ба устөрөгчийн холбоог тайлбарлах; усны гажиг шинжүүдийг (мөсний нягт, буцлах t, гадаргуугийн таталцал) тайлбарлах.'
        }
      ]
    },
    {
      titleEn: 'Electronegativity & metallic bonding',
      titleMn: 'Цахилгаан сөрөг чанар ба металлын холбоо',
      tone: 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200',
      leaves: [
        {
          titleEn: 'Electronegativity',
          titleMn: 'Цахилгаан сөрөг чанар',
          textEn: 'The power of an atom to attract the bonding pair of electrons. A difference in electronegativity gives a polar bond.',
          textMn: 'Атомын холбооны электрон хосыг татах чадвар. Цахилгаан сөрөг чанарын зөрүү нь туйлтай холбоо өгнө.'
        },
        {
          titleEn: 'Metallic bonding',
          titleMn: 'Металлын холбоо',
          textEn: 'Electrostatic attraction between the positive ions in a giant metallic lattice and a sea of delocalised electrons.',
          textMn: 'Аварга металлын торын эерэг ионууд ба ион тусгаарлагдаагүй электроны "далай" хоорондын цахилгаан статик таталцал.'
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
