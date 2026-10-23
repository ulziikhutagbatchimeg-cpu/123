import React from 'react';

// The theory of the structure and bonding section on one map. Bonds between atoms are strong and decide the
// structure; forces between molecules are weak and only decide how easily a simple molecular substance melts and boils.

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

const BRANCHES: Branch[] = [
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
];

export const BondingMindMap: React.FC<{ mn: boolean }> = ({ mn }) => (
  <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 sm:p-6 space-y-5 shadow-xs">
    <div className="space-y-3 text-center">
      <div className="inline-block px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-black">
        {mn ? 'Бүтэц ба химийн холбоо' : 'Structure and chemical bonding'}
      </div>
      <p className="mx-auto max-w-2xl text-xs text-slate-600 dark:text-slate-300">
        {mn
          ? 'Атом хоорондын холбоо бүтцийг тодорхойлно. Молекул хоорондын хүч зөвхөн энгийн молекулт бодисын хайлах, буцлах цэгийг тодорхойлно.'
          : 'Bonds between atoms decide the structure. Forces between molecules only decide how easily a simple molecular substance melts and boils.'}
      </p>
      <div className="mx-auto h-5 w-px bg-slate-300 dark:bg-slate-700" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {BRANCHES.map(branch => (
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
