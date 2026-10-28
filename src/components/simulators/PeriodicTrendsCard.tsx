import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

// The periodic trends of the infographic, checked against the Period 3 deck. The direction is "generally" where the
// rule has exceptions; the explanation says where.
type TrendId = 'radius' | 'ie' | 'ea' | 'en';
type Direction = 'increases' | 'decreases';

interface Trend {
  id: TrendId;
  titleEn: string;
  titleMn: string;
  across: Direction;
  down: Direction;
  reason: { en: string; mn: string };
}

const TRENDS: Trend[] = [
  {
    id: 'radius',
    titleEn: 'Atomic radius',
    titleMn: 'Атомын радиус',
    across: 'decreases',
    down: 'increases',
    reason: {
      en: 'Across: the nuclear charge rises, the electrons join the same shell and the shielding stays about the same, so the outer electrons are pulled closer. Down: an extra shell is added.',
      mn: 'Үеэр: цөмийн цэнэг нэмэгдэж, электрон ижил бүрхүүлд нэмэгдэж, хаалт бараг тогтмол тул гаднах электрон цөм рүү татагдана. Бүлгээр: нэмэлт бүрхүүл нэмэгдэнэ.'
    }
  },
  {
    id: 'ie',
    titleEn: 'First ionisation energy',
    titleMn: 'Нэгдүгээр ионжих энерги',
    across: 'increases',
    down: 'decreases',
    reason: {
      en: 'Across: the nuclear charge rises and the radius falls. Down: the outer electron is further away and more shielded. Exceptions: dips at Mg → Al (a 3p electron) and P → S (a paired 3p electron).',
      mn: 'Үеэр: цөмийн цэнэг нэмэгдэж, радиус багасна. Бүлгээр: гаднах электрон цөмөөс хол, хаалт их. Онцгой тохиолдол: Mg → Al (3p электрон) ба P → S (хосолсон 3p электрон) дээр уналт гарна.'
    }
  },
  {
    id: 'ea',
    titleEn: 'Electron affinity',
    titleMn: 'Электрон дүйлцэх энерги (EA)',
    across: 'increases',
    down: 'decreases',
    reason: {
      en: 'Generally: across a period it becomes more negative, down a group less negative. Fluorine is the exception: it is small, so the repulsion between its electrons makes its EA less negative than chlorine’s (F −328, Cl −349 kJ mol⁻¹).',
      mn: 'Ерөнхийдөө: үеэр сөрөг утга нэмэгдэж, бүлгээр багасна. Фтор бол онцгой тохиолдол: жижиг тул электроны хоорондын түлхэлт ихтэй, тиймээс EA нь хлорынхоос бага сөрөг (F −328, Cl −349 кДж моль⁻¹).'
    }
  },
  {
    id: 'en',
    titleEn: 'Electronegativity',
    titleMn: 'Цахилгаан сөрөг чанар',
    across: 'increases',
    down: 'decreases',
    reason: {
      en: 'Across: the nuclear charge rises and the radius falls, so the atom pulls the bonding pair harder. Down: the radius grows and the shielding increases, so it falls.',
      mn: 'Үеэр: цөмийн цэнэг нэмэгдэж, радиус багасна тул атом холбох хосыг илүү хүчтэй татна. Бүлгээр: радиус өсч, хаалт нэмэгдэнэ тул буурна.'
    }
  }
];

// The Period 3 values of the deck (radius in nm, IE₁ in kJ mol⁻¹) and the Pauling electronegativities
const PERIOD3: Record<Exclude<TrendId, 'ea'>, { unit: string; values: Array<[string, number]> }> = {
  radius: {
    unit: 'nm',
    values: [['Na', 0.157], ['Mg', 0.136], ['Al', 0.125], ['Si', 0.117], ['P', 0.110], ['S', 0.104], ['Cl', 0.099]]
  },
  ie: {
    unit: 'kJ mol⁻¹',
    values: [['Na', 494], ['Mg', 736], ['Al', 577], ['Si', 786], ['P', 1060], ['S', 1000], ['Cl', 1260], ['Ar', 1520]]
  },
  en: {
    unit: '',
    values: [['Na', 0.9], ['Mg', 1.2], ['Al', 1.5], ['Si', 1.8], ['P', 2.1], ['S', 2.5], ['Cl', 3.0]]
  }
};

// The main-group part of periods 1–4, with the group of each element (d-block left out)
const TABLE: Array<{ sym: string; period: number; group: number }> = [
  { sym: 'H', period: 1, group: 1 }, { sym: 'He', period: 1, group: 18 },
  { sym: 'Li', period: 2, group: 1 }, { sym: 'Be', period: 2, group: 2 },
  { sym: 'B', period: 2, group: 13 }, { sym: 'C', period: 2, group: 14 }, { sym: 'N', period: 2, group: 15 },
  { sym: 'O', period: 2, group: 16 }, { sym: 'F', period: 2, group: 17 }, { sym: 'Ne', period: 2, group: 18 },
  { sym: 'Na', period: 3, group: 1 }, { sym: 'Mg', period: 3, group: 2 },
  { sym: 'Al', period: 3, group: 13 }, { sym: 'Si', period: 3, group: 14 }, { sym: 'P', period: 3, group: 15 },
  { sym: 'S', period: 3, group: 16 }, { sym: 'Cl', period: 3, group: 17 }, { sym: 'Ar', period: 3, group: 18 },
  { sym: 'K', period: 4, group: 1 }, { sym: 'Ca', period: 4, group: 2 },
  { sym: 'Ga', period: 4, group: 13 }, { sym: 'Ge', period: 4, group: 14 }, { sym: 'As', period: 4, group: 15 },
  { sym: 'Se', period: 4, group: 16 }, { sym: 'Br', period: 4, group: 17 }, { sym: 'Kr', period: 4, group: 18 }
];

const ARROW: Record<Direction, string> = { increases: '↑', decreases: '↓' };

// The periodic trends as an interactive card: pick a trend to see its direction across Period 3 and down Group 1 on a
// mini periodic table, the Period 3 values as bars, and the reason with its exceptions.
export const PeriodicTrendsCard: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const [selected, setSelected] = useState<TrendId>('radius');
  const trend = TRENDS.find(t => t.id === selected) ?? TRENDS[0];
  const bars = selected === 'ea' ? null : PERIOD3[selected];
  const max = bars ? Math.max(...bars.values.map(([, v]) => v)) : 1;

  return (
    <div className="rounded-2xl border border-violet-200 dark:border-violet-900 bg-white dark:bg-slate-900 p-4 sm:p-5 space-y-5">
      <div className="space-y-1">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
          {mn ? 'Интерактив · Үелэх системийн зүй тогтол' : 'Interactive · Periodic trends'}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {mn ? 'Нэг шинжийг сонгоод хандлагыг харна.' : 'Pick a trend to see its direction.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {TRENDS.map(t => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            aria-pressed={selected === t.id}
            className={`p-3 rounded-xl border text-left transition-colors ${
              selected === t.id
                ? 'bg-violet-600 text-white border-violet-600'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-violet-500'
            }`}
          >
            <span className="block text-sm font-black leading-snug">{mn ? t.titleMn : t.titleEn}</span>
            <span className="block text-[11px] font-mono mt-1 opacity-90">
              {mn ? 'Үеэр' : 'Across'} {ARROW[t.across]} · {mn ? 'Бүлгээр' : 'Down'} {ARROW[t.down]}
            </span>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div className="grid w-full gap-0.5" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
          {TABLE.map(e => {
            const acrossRow = e.period === 3;
            const downColumn = e.group === 1;
            const lit = acrossRow || downColumn;
            return (
              <div
                key={e.sym}
                style={{ gridColumn: e.group, gridRow: e.period }}
                className={`min-w-0 text-center rounded py-1 text-[11px] font-bold transition-colors ${
                  acrossRow && selected !== 'ea'
                    ? 'bg-violet-200 dark:bg-violet-800 text-violet-900 dark:text-violet-100'
                    : downColumn && lit
                      ? 'bg-sky-200 dark:bg-sky-800 text-sky-900 dark:text-sky-100'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {e.sym}
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-violet-300 dark:bg-violet-700" />{mn ? '3-р үе: үеэр (→)' : 'Period 3: across (→)'}</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-sky-300 dark:bg-sky-700" />{mn ? '1-р бүлэг: бүлгээр (↓)' : 'Group 1: down (↓)'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {mn ? '3-р үе: утгууд' : 'Period 3 values'}
          </div>
          {bars ? (
            <div className="space-y-1.5">
              {bars.values.map(([sym, v]) => (
                <div key={sym} className="flex items-center gap-2 text-xs font-bold">
                  <span className="w-7 font-mono text-slate-700 dark:text-slate-200">{sym}</span>
                  <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-violet-500" style={{ width: `${(v / max) * 100}%` }} />
                  </div>
                  <span className="w-24 text-right font-mono text-slate-600 dark:text-slate-300">
                    {selected === 'radius' ? v.toFixed(3) : selected === 'en' ? v.toFixed(1) : v} {bars.unit}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {mn
                ? 'EA: фтор −328, хлор −349 кДж моль⁻¹. Ерөнхий хандлага үеэр нэмэгдэж, бүлгээр буурна.'
                : 'EA: fluorine −328, chlorine −349 kJ mol⁻¹. The general trend rises across and falls down.'}
            </p>
          )}
        </div>

        <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900 space-y-2">
          <div className="text-sm font-black text-slate-900 dark:text-white">
            {mn ? trend.titleMn : trend.titleEn}
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{mn ? trend.reason.mn : trend.reason.en}</p>
        </div>
      </div>
    </div>
  );
};
