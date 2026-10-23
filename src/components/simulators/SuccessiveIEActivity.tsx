import React, { useState } from 'react';
import { SUCCESSIVE_IE } from '../../data/successiveIE';

// A practice on successive ionisation energies. The student is given the IE values of a mystery element and works out,
// step by step, where the big jump is, how many outer electrons there are, the group, the element, and why the jump is large.
// Every answer comes from the data, and each step opens only when the step before is right.

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Rotate a list so that the right answer does not always come first
const rotate = <T,>(xs: T[], k: number): T[] => xs.map((_, i) => xs[(i + k) % xs.length]);

const choiceClass = (active: boolean, tone: 'neutral' | 'right' | 'wrong' = 'neutral') => {
  if (tone === 'right') return 'px-3 py-1.5 rounded-xl border text-xs font-bold bg-emerald-600 text-white border-emerald-600';
  if (tone === 'wrong') return 'px-3 py-1.5 rounded-xl border text-xs font-bold bg-rose-500 text-white border-rose-500';
  return `px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
    active
      ? 'bg-emerald-600 text-white border-emerald-600'
      : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
  }`;
};

// The jump: the largest ratio IE(n+1) / IE(n). An element with n outer electrons jumps after IE(n).
const jumpOf = (ie: number[]) => {
  let best = 0;
  let bestRatio = 0;
  for (let i = 0; i < ie.length - 1; i++) {
    const ratio = ie[i + 1] / ie[i];
    if (ratio > bestRatio) {
      bestRatio = ratio;
      best = i;
    }
  }
  return best + 1;
};

const REASONS = [
  {
    en: 'The next electron comes from an inner shell, closer to the nucleus, so it is held more strongly.',
    mn: 'Дараагийн электрон цөмд ойр дотоод бүрхүүлээс авагдана, тиймээс илүү хүчтэй барьдаг.'
  },
  {
    en: 'The next electron comes from the outer shell, so it takes very little energy.',
    mn: 'Дараагийн электрон гадна бүрхүүлээс авагдана, тиймээс маш бага энерги шаардана.'
  },
  {
    en: 'The nucleus gets weaker with each electron removed, so the energy jumps.',
    mn: 'Электрон бүрийг авахад цөм сулардаг тул энерги огцом өснө.'
  }
];

interface Props {
  mn: boolean;
}

export const SuccessiveIEActivity: React.FC<Props> = ({ mn }) => {
  const [pick, setPick] = useState(0);
  const [answers, setAnswers] = useState<{ jump?: number; outer?: number; group?: string; name?: number; reason?: number }>({});

  const element = SUCCESSIVE_IE[pick];
  const n = jumpOf(element.ie);
  const groupRoman = ROMAN[n - 1];

  // Options for each question, with the right one at a changing position
  const k = element.z % 4;
  const jumpOptions = Array.from({ length: 7 }, (_, i) => i + 1);
  const outerOptions = Array.from({ length: 8 }, (_, i) => i + 1);
  const groupOptions = rotate([groupRoman, ...ROMAN.filter(r => r !== groupRoman).slice(0, 3)], k);
  const nameIndexes = rotate(
    [pick, ...SUCCESSIVE_IE.map((_, i) => i).filter(i => i !== pick).slice(0, 3)],
    k
  );
  const reasonOrder = rotate([0, 1, 2], k);

  const stage = (() => {
    if (answers.jump !== n) return 1;
    if (answers.outer !== n) return 2;
    if (answers.group !== groupRoman) return 3;
    if (answers.name !== pick) return 4;
    if (answers.reason !== 0) return 5;
    return 6;
  })();
  const done = stage === 6;

  // The chart: a log scale, so the early values and the jump can both be seen
  const logOf = (v: number) => Math.log10(v);
  const minLog = logOf(400);
  const maxLog = logOf(40000);
  const barHeight = (v: number) => ((logOf(v) - minLog) / (maxLog - minLog)) * 150;

  const selectMystery = (i: number) => {
    setPick(i);
    setAnswers({});
  };

  const Task: React.FC<{ n: number; title: string; hint: string; open: boolean; ok: boolean; children: React.ReactNode }> = ({ n: num, title, hint, open, ok, children }) => (
    <div className={`space-y-3 rounded-2xl border p-4 ${open ? 'border-slate-200 dark:border-slate-800' : 'border-dashed border-slate-300 dark:border-slate-700 opacity-60'}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-black text-slate-900 dark:text-white">
          {num}. {title}
        </span>
        <span className={`text-[11px] font-bold ${ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
          {ok ? (mn ? '✔ Дууссан' : '✔ Done') : open ? (mn ? 'Одоо хийнэ' : 'Your turn') : mn ? 'Түгжээтэй' : 'Locked'}
        </span>
      </div>
      {open && (
        <>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{hint}</p>
          {children}
        </>
      )}
    </div>
  );

  return (
    <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-5 shadow-xs">
      <div className="space-y-1">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          {mn ? 'Дараалсан ионжих энерги' : 'Successive ionisation energies'}
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {mn
            ? 'Электроныг нэг нэгээр авах тусам энерги огцом өснө. Огцом үсрэлт харагдах газраас гадна бүрхүүлийн электроны тоог олж болно.'
            : 'Each electron removed takes more energy. The point where the energy jumps sharply shows how many electrons are in the outer shell.'}
        </p>
      </div>

      {/* The mystery element */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-black text-slate-900 dark:text-white">{mn ? 'Нууцлаг элемент:' : 'Mystery element:'}</span>
        {LETTERS.slice(0, SUCCESSIVE_IE.length).map((letter, i) => (
          <button key={letter} onClick={() => selectMystery(i)} className={choiceClass(pick === i)}>
            {mn ? 'Элемент' : 'Element'} {letter}
          </button>
        ))}
      </div>

      {/* The data table, and the chart on a log scale */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="text-xs font-black text-slate-900 dark:text-white">
          {mn ? 'Өгөгдөл: дараалсан IE (кДж/моль)' : 'Data: successive IE (kJ/mol)'}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead className="text-slate-500 dark:text-slate-400">
              <tr>
                {element.ie.map((_, i) => (
                  <th key={i} className="py-1 pr-2 text-right">
                    IE{i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {element.ie.map((v, i) => (
                  <td key={i} className="py-1 pr-2 text-right text-slate-900 dark:text-slate-100">
                    {v}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <svg viewBox="0 0 640 190" className="w-full h-auto">
          {element.ie.map((v, i) => {
            const x = 40 + i * 70;
            const h = barHeight(v);
            const isJump = done && i === n;
            return (
              <g key={i}>
                <rect x={x} y={160 - h} width={44} height={h} fill={i < n ? '#0ea5e9' : '#94a3b8'} opacity={0.85} />
                {isJump && <rect x={x - 6} y={0} width={56} height={170} fill="none" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 4" />}
                <text x={x + 22} y={176} textAnchor="middle" fontSize="11" className="fill-slate-600 dark:fill-slate-300">
                  IE{i + 1}
                </text>
              </g>
            );
          })}
          <line x1={30} x2={620} y1={160} y2={160} stroke="#94a3b8" />
        </svg>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {mn ? 'Босоо тэнхлэг логарифмын масштабтай. Хөх баганууд нь гадна бүрхүүлийн электронууд.' : 'The vertical scale is logarithmic. The blue bars are the outer-shell electrons.'}
        </p>
      </div>

      {/* 1. The jump */}
      <Task
        n={1}
        title={mn ? 'Хамгийн том үсрэлт хаана байна?' : 'Where is the biggest jump?'}
        hint={mn ? 'IEₙ₊₁ ÷ IEₙ харьцаа хамгийн том байгаа хосыг ол.' : 'Find the pair IEₙ₊₁ ÷ IEₙ with the largest ratio.'}
        open
        ok={answers.jump === n}
      >
        <div className="flex flex-wrap gap-2">
          {jumpOptions.map(j => {
            const picked = answers.jump === j;
            const tone = picked ? (j === n ? 'right' : 'wrong') : 'neutral';
            return (
              <button key={j} onClick={() => setAnswers(a => ({ ...a, jump: j, outer: undefined, group: undefined, name: undefined, reason: undefined }))} className={choiceClass(picked, tone)}>
                IE{j} → IE{j + 1}
              </button>
            );
          })}
        </div>
        {answers.jump !== undefined && answers.jump !== n && (
          <p className="text-[11px] text-rose-600 dark:text-rose-400">{mn ? 'Дахин харьцуулаарай.' : 'Compare the ratios again.'}</p>
        )}
      </Task>

      {/* 2. Outer electrons */}
      <Task
        n={2}
        title={mn ? 'Гадна бүрхүүлд хэдэн электрон байна вэ?' : 'How many electrons are in the outer shell?'}
        hint={mn ? 'Үсрэлтийн өмнөх электроныг тоол.' : 'Count the electrons before the jump.'}
        open={stage >= 2}
        ok={answers.outer === n}
      >
        <div className="flex flex-wrap gap-2">
          {outerOptions.map(o => {
            const picked = answers.outer === o;
            const tone = picked ? (o === n ? 'right' : 'wrong') : 'neutral';
            return (
              <button key={o} onClick={() => setAnswers(a => ({ ...a, outer: o, group: undefined, name: undefined, reason: undefined }))} className={choiceClass(picked, tone)}>
                {o}
              </button>
            );
          })}
        </div>
      </Task>

      {/* 3. Group */}
      <Task
        n={3}
        title={mn ? 'Энэ элемент ямар бүлэгт байна вэ?' : 'Which group is the element in?'}
        hint={mn ? 'Гадна электроны тоо нь бүлгийн дугаартай тэнцүү.' : 'The number of outer electrons is the group number.'}
        open={stage >= 3}
        ok={answers.group === groupRoman}
      >
        <div className="flex flex-wrap gap-2">
          {groupOptions.map(g => {
            const picked = answers.group === g;
            const tone = picked ? (g === groupRoman ? 'right' : 'wrong') : 'neutral';
            return (
              <button key={g} onClick={() => setAnswers(a => ({ ...a, group: g, name: undefined, reason: undefined }))} className={choiceClass(picked, tone)}>
                {mn ? `Бүлэг ${g}` : `Group ${g}`}
              </button>
            );
          })}
        </div>
      </Task>

      {/* 4. The element */}
      <Task
        n={4}
        title={mn ? 'Аль элемент вэ?' : 'Which element is it?'}
        hint={mn ? 'Эдгээр элементүүд бүгд 3-р үед байна, тиймээс бүлгээр нь ялгана.' : 'All these elements are in period 3, so the group tells them apart.'}
        open={stage >= 4}
        ok={answers.name === pick}
      >
        <div className="flex flex-wrap gap-2">
          {nameIndexes.map(i => {
            const e = SUCCESSIVE_IE[i];
            const picked = answers.name === i;
            const tone = picked ? (i === pick ? 'right' : 'wrong') : 'neutral';
            return (
              <button key={e.z} onClick={() => setAnswers(a => ({ ...a, name: i, reason: undefined }))} className={choiceClass(picked, tone)}>
                {mn ? e.nameMn : e.nameEn} ({e.symbol})
              </button>
            );
          })}
        </div>
      </Task>

      {/* 5. The reason */}
      <Task
        n={5}
        title={mn ? 'Яагаад үсрэлт ийм том вэ?' : 'Why is the jump so large?'}
        hint={mn ? 'Дараагийн электрон хаанаас авагдаж байгааг бод.' : 'Think about where the next electron is taken from.'}
        open={stage >= 5}
        ok={answers.reason === 0}
      >
        <div className="flex flex-col gap-2">
          {reasonOrder.map(r => {
            const picked = answers.reason === r;
            const tone = picked ? (r === 0 ? 'right' : 'wrong') : 'neutral';
            return (
              <button key={r} onClick={() => setAnswers(a => ({ ...a, reason: r }))} className={`text-left ${choiceClass(picked, tone)}`}>
                {mn ? REASONS[r].mn : REASONS[r].en}
              </button>
            );
          })}
        </div>
      </Task>

      {/* The result */}
      {done && (
        <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 text-xs text-slate-800 dark:text-slate-100 leading-relaxed space-y-1">
          <div className="font-black">{mn ? 'Зөв үр дүн' : 'The correct result'}</div>
          <div>
            {mn
              ? `Элемент ${LETTERS[pick]} = ${element.nameMn} (${element.symbol}). IE${n} → IE${n + 1} дээр үсрэлт гарна, тиймээс гадна бүрхүүлд ${n} электрон, бүлэг ${groupRoman}.`
              : `Element ${LETTERS[pick]} = ${element.nameEn} (${element.symbol}). The jump is between IE${n} and IE${n + 1}, so there are ${n} outer electrons and it is in Group ${groupRoman}.`}
          </div>
          <div>
            {mn ? 'Учир нь: ' : 'Because: '}
            {mn ? REASONS[0].mn : REASONS[0].en}
          </div>
          <button
            onClick={() => selectMystery((pick + 1) % SUCCESSIVE_IE.length)}
            className="mt-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800"
          >
            {mn ? 'Дараагийн элемент' : 'Next element'}
          </button>
        </div>
      )}
    </section>
  );
};
