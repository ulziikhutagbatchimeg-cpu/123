import React from 'react';

// The concept map for IGCSE chapter 1, shown before the four lessons. Each branch names the learning outcomes it
// covers, and the bottom row links to the Periodic Table section (8) that the lessons depend on.

interface Branch {
  title: { mn: string; en: string };
  los: string;
  lines: Array<{ mn: string; en: string }>;
  lesson: string;
}

const BRANCHES: Branch[] = [
  {
    title: { mn: 'Бөөмсийн загвар', en: 'The particle model' },
    los: '1.1.1 – 1.1.2',
    lesson: '1',
    lines: [
      { mn: 'Хатуу: нягт, эмх цэгцтэй, чичирнэ', en: 'Solid: close, regular, vibrates' },
      { mn: 'Шингэн: нягт, санамсаргүй, гулсана', en: 'Liquid: close, random, slides' },
      { mn: 'Хий: хол, санамсаргүй, хурдан', en: 'Gas: far apart, random, fast' }
    ]
  },
  {
    title: { mn: 'Төлөв өөрчлөлт', en: 'Changes of state' },
    los: '1.1.3 · 1.1.5',
    lesson: '2',
    lines: [
      { mn: 'Хайлах, буцлах, уурших, хөрөх, конденсаци', en: 'Melting, boiling, evaporating, freezing, condensing' },
      { mn: 'Халаалтын муруйн хэвтээ хэсэгт температур тогтмол', en: 'On the flat parts of the heating curve the temperature is constant' }
    ]
  },
  {
    title: { mn: 'Хийн эзлэхүүн', en: 'Gas volume' },
    los: '1.1.4 · 1.1.6',
    lesson: '3',
    lines: [
      { mn: 'Температур ↑ → хурд ↑ → эзлэхүүн ↑ (тогтмол даралт)', en: 'Temperature ↑ → speed ↑ → volume ↑ (constant pressure)' },
      { mn: 'Даралт ↑ (тогтмол T) → эзлэхүүн ↓', en: 'Pressure ↑ (constant T) → volume ↓' }
    ]
  },
  {
    title: { mn: 'Диффуз', en: 'Diffusion' },
    los: '1.2.1 · 1.2.2',
    lesson: '4',
    lines: [
      { mn: 'Санамсаргүй хөдөлгөөн: өндөрөөс бага концентраци рүү', en: 'Random motion: from high to low concentration' },
      { mn: 'Хий > шингэн; халуун ↑; хөнгөн молекул (Mr ↓) хурдан', en: 'Gas > liquid; hot ↑; lighter molecules (lower Mr) faster' }
    ]
  }
];

const PERIODIC: Array<{ ref: string; mn: string; en: string }> = [
  { ref: '8.2', mn: 'I бүлэг: хайлах цэг бүлгээр буурна', en: 'Group I: melting point falls down the group' },
  { ref: '8.3', mn: 'VII бүлэг: r.t.p.-д хий, шингэн, хатуу', en: 'Group VII: gas, liquid and solid at r.t.p.' },
  { ref: '8.5', mn: 'VIII бүлэг: моноатом инертийн хий', en: 'Group VIII: monatomic noble gases' }
];

export const StatesConceptMap: React.FC<{ mn: boolean; onOpenTopic?: (id: string) => void }> = ({ mn, onOpenTopic }) => {
  const label = mn ? 'Концепт газрын зураг' : 'Concept map';
  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">{label}</div>

      <div className="flex justify-center">
        <div className="px-5 py-2.5 rounded-2xl bg-violet-600 text-white text-sm font-black text-center">
          {mn ? 'Бодисын төлөв (бүлэг 1)' : 'States of matter (chapter 1)'}
        </div>
      </div>
      <div className="mx-auto h-4 w-px bg-slate-300 dark:bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {BRANCHES.map(b => (
          <div key={b.title.en} className="rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 p-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-black text-violet-900 dark:text-violet-200">{mn ? b.title.mn : b.title.en}</div>
              <span className="text-[10px] font-mono font-bold text-violet-700 dark:text-violet-300">{b.los}</span>
            </div>
            <ul className="space-y-1.5">
              {b.lines.map((line, i) => (
                <li key={i} className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                  • {mn ? line.mn : line.en}
                </li>
              ))}
            </ul>
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
              {mn ? `Хичээл ${b.lesson}` : `Lesson ${b.lesson}`}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="text-[11px] font-black text-slate-700 dark:text-slate-200">
          {mn ? 'Үелэх систем (бүлэг 8)-тэй холбоос' : 'Links to the Periodic Table (section 8)'}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {PERIODIC.map(p => (
            <button
              key={p.ref}
              onClick={() => onOpenTopic?.(`s-8-${p.ref.split('.')[1]}`)}
              disabled={!onOpenTopic}
              className="text-left p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 hover:border-violet-500 disabled:hover:border-slate-300 transition-colors"
            >
              <div className="text-[10px] font-mono font-bold text-violet-700 dark:text-violet-300">8 · {p.ref}</div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300">{mn ? p.mn : p.en}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
