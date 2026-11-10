import React, { useState } from 'react';

// The card sort for IGCSE chapter 1 (States of matter): eight statements, each placed in the state it describes. The
// chapter's simulations (states and the heating curve, diffusion, gas pressure) are the teacher's particle-model lab.

type StateKey = 'solid' | 'liquid' | 'gas';

// 2. Card sort: eight statements, each to be placed in the state it describes
const CARD_DATA: Array<{ state: StateKey; mn: string; en: string }> = [
  { state: 'solid', mn: 'Тогтсон хэлбэртэй', en: 'Has a fixed shape' },
  { state: 'solid', mn: 'Бөөмс тогтсон байрлалынхаа эргэн тойронд чичирдэг', en: 'Particles vibrate about fixed positions' },
  { state: 'liquid', mn: 'Тогтсон эзлэхүүнтэй, хэлбэргүй', en: 'Fixed volume, no fixed shape' },
  { state: 'liquid', mn: 'Бөөмс нягт, санамсаргүй байрлалтай', en: 'Particles are close and randomly arranged' },
  { state: 'liquid', mn: 'Бөөмс бие биенийхээ дээр гулсаж чадна', en: 'Particles can slide past each other' },
  { state: 'gas', mn: 'Бөөмс хоорондоо маш хол', en: 'Particles are very far apart' },
  { state: 'gas', mn: 'Савыг бүрэн дүүргэдэг', en: 'Fills its container completely' },
  { state: 'gas', mn: 'Бөөмс санамсаргүй, хурдан хөдөлнө', en: 'Particles move randomly and rapidly' }
];

export const CardSort: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [picked, setPicked] = useState<Record<number, StateKey | undefined>>({});
  const [checked, setChecked] = useState(false);
  const lang = mn ? 'mn' : 'en';
  const names: Record<StateKey, string> = mn ? { solid: 'Хатуу', liquid: 'Шингэн', gas: 'Хий' } : { solid: 'Solid', liquid: 'Liquid', gas: 'Gas' };
  const correct = CARD_DATA.filter((c, i) => picked[i] === c.state).length;

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {CARD_DATA.map((card, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex-1 text-xs text-slate-700 dark:text-slate-200">{card[lang]}</div>
            <div className="flex gap-1.5">
              {(['solid', 'liquid', 'gas'] as const).map(s => {
                const active = picked[i] === s;
                const isRight = checked && s === card.state;
                const isWrong = checked && active && s !== card.state;
                return (
                  <button
                    key={s}
                    onClick={() => setPicked(prev => ({ ...prev, [i]: s }))}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-colors ${
                      isRight
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isWrong
                          ? 'bg-rose-600 text-white border-rose-600'
                          : active
                            ? 'bg-violet-600 text-white border-violet-600'
                            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {names[s]}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setChecked(true)}
          className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-black"
        >
          {mn ? 'Шалгах' : 'Check'}
        </button>
        {checked && (
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {mn ? `${correct} / ${CARD_DATA.length} зөв` : `${correct} / ${CARD_DATA.length} correct`}
          </span>
        )}
      </div>
    </div>
  );
};
