import React, { useEffect, useState } from 'react';

// Four interactive simulations for IGCSE chapter 1 (States of matter). Each one shows one idea and lets the student
// change a single variable: the particle model, the heating curve, the gas at constant pressure or temperature,
// and the diffusion of two gases.

type StateKey = 'solid' | 'liquid' | 'gas';

const rnd = () => Math.random();

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number; // anchor: where the particle sits as a solid
  ay: number;
}

// 1. The particle model: solid, liquid, gas (controlled by the student, or by the heating curve)
const PM_W = 320;
const PM_H = 180;

const makeAnchors = (): Particle[] => {
  const ps: Particle[] = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 8; col++) {
      const ax = 36 + col * 36;
      const ay = 30 + row * 32;
      ps.push({ x: ax, y: ay, vx: 0, vy: 0, ax, ay });
    }
  }
  return ps;
};

const stepParticles = (ps: Particle[], state: StateKey): Particle[] =>
  ps.map(p => {
    if (state === 'gas') {
      let x = p.x + p.vx;
      let y = p.y + p.vy;
      let vx = p.vx;
      let vy = p.vy;
      if (x < 10 || x > PM_W - 10) {
        vx = -vx;
        x = Math.min(PM_W - 10, Math.max(10, x));
      }
      if (y < 10 || y > PM_H - 10) {
        vy = -vy;
        y = Math.min(PM_H - 10, Math.max(10, y));
      }
      return { ...p, x, y, vx, vy };
    }
    // Solid: vibrates about its anchor. Liquid: moves about a point near its anchor, so the particles slide past each other.
    const wobble = state === 'solid' ? 1.6 : 7;
    const tx = p.ax + (rnd() - 0.5) * 2 * wobble;
    const ty = p.ay + (rnd() - 0.5) * 2 * wobble;
    const k = state === 'solid' ? 0.7 : 0.25;
    return { ...p, x: p.x + (tx - p.x) * k, y: p.y + (ty - p.y) * k };
  });

const STATE_TEXT = {
  solid: {
    en: ['Solid', 'Very small', 'Regular, close', 'Vibrate about fixed positions', 'Fixed', 'Fixed'],
    mn: ['Хатуу', 'Маш бага', 'Эмх цэгцтэй, нягт', 'Тогтсон байрлалынхаа эргэн тойронд чичирнэ', 'Тогтсон', 'Тогтсон']
  },
  liquid: {
    en: ['Liquid', 'Small', 'Random, close', 'Move and slide past each other', 'Takes the shape of the container', 'Fixed'],
    mn: ['Шингэн', 'Бага', 'Санамсаргүй, нягт', 'Хөдөлж, бие биенийхээ дээр гулсана', 'Савныхаа хэлбэрийг авна', 'Тогтсон']
  },
  gas: {
    en: ['Gas', 'Large', 'Random, far apart', 'Move rapidly in all directions', 'Fills the container', 'Fills the container'],
    mn: ['Хий', 'Их', 'Санамсаргүй, маш хол', 'Хурдан, бүх чиглэлд хөдөлнө', 'Савыг бүрэн дүүргэнэ', 'Савыг бүрэн дүүргэнэ']
  }
} as const;

const PROPERTY_LABELS = {
  en: ['State', 'Separation', 'Arrangement', 'Motion', 'Shape', 'Volume'],
  mn: ['Төлөв', 'Зай', 'Байрлал', 'Хөдөлгөөн', 'Хэлбэр', 'Эзлэхүүн']
} as const;

export const ParticleStateSim: React.FC<{ mn: boolean; state?: StateKey; showButtons?: boolean }> = ({
  mn,
  state: controlled,
  showButtons = true
}) => {
  const [own, setOwn] = useState<StateKey>('solid');
  const state = controlled ?? own;
  const [ps, setPs] = useState<Particle[]>(makeAnchors);

  // A gas starts moving in random directions; solids and liquids stay near their anchors
  useEffect(() => {
    if (state === 'gas') {
      setPs(prev => prev.map(p => ({ ...p, vx: (rnd() - 0.5) * 7, vy: (rnd() - 0.5) * 7 })));
    }
  }, [state]);

  useEffect(() => {
    const id = window.setInterval(() => setPs(prev => stepParticles(prev, state)), 70);
    return () => window.clearInterval(id);
  }, [state]);

  const lang = mn ? 'mn' : 'en';

  return (
    <div className="space-y-3">
      {showButtons && (
        <div className="flex flex-wrap gap-2">
          {(['solid', 'liquid', 'gas'] as const).map(s => (
            <button
              key={s}
              onClick={() => setOwn(s)}
              aria-pressed={state === s}
              className={`px-3 py-1.5 rounded-xl border text-xs font-black transition-colors ${
                state === s
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              {STATE_TEXT[s][lang][0]}
            </button>
          ))}
        </div>
      )}
      <svg viewBox={`0 0 ${PM_W} ${PM_H}`} className="w-full h-auto rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" role="img" aria-label={mn ? 'Бөөмсийн загвар' : 'Particle model'}>
        {ps.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={6} className={state === 'gas' ? 'fill-sky-500' : state === 'liquid' ? 'fill-teal-500' : 'fill-indigo-600'} />
        ))}
      </svg>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-left">
          <tbody>
            {PROPERTY_LABELS[lang].map((label, i) => (
              <tr key={label} className="border-t border-slate-200 dark:border-slate-800">
                <th className="py-1.5 pr-2 font-black text-slate-700 dark:text-slate-200 w-24">{label}</th>
                <td className="py-1.5 text-slate-600 dark:text-slate-300">{STATE_TEXT[state][lang][i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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

// 3. Heating curve: water-like substance (melts at 0 °C, boils at 100 °C). Energy is supplied at a steady rate.
const SEGMENTS = [
  { e0: 0, e1: 20, t0: -20, t1: 0, phase: 'solid' as const },
  { e0: 20, e1: 40, t0: 0, t1: 0, phase: 'melting' as const },
  { e0: 40, e1: 140, t0: 0, t1: 100, phase: 'liquid' as const },
  { e0: 140, e1: 200, t0: 100, t1: 100, phase: 'boiling' as const },
  { e0: 200, e1: 220, t0: 100, t1: 120, phase: 'gas' as const }
];
const E_MAX = 220;

const tempAt = (e: number) => {
  const s = SEGMENTS.find(seg => e <= seg.e1) ?? SEGMENTS[SEGMENTS.length - 1];
  return s.t0 + ((s.t1 - s.t0) * (e - s.e0)) / (s.e1 - s.e0);
};

const phaseAt = (e: number) => (SEGMENTS.find(seg => e <= seg.e1) ?? SEGMENTS[SEGMENTS.length - 1]).phase;

const PHASE_LABEL = {
  solid: { mn: 'Хатуу: температур өснө', en: 'Solid: temperature rises' },
  melting: { mn: 'Хайлж байна: температур тогтмол', en: 'Melting: temperature constant' },
  liquid: { mn: 'Шингэн: температур өснө', en: 'Liquid: temperature rises' },
  boiling: { mn: 'Буцлаж байна: температур тогтмол', en: 'Boiling: temperature constant' },
  gas: { mn: 'Хий: температур өснө', en: 'Gas: temperature rises' }
} as const;

export const HeatingCurveSim: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [e, setE] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setE(prev => {
        const next = prev + 2;
        if (next >= E_MAX) {
          setPlaying(false);
          return E_MAX;
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [playing]);

  const phase = phaseAt(e);
  const temp = tempAt(e);
  const particleState: StateKey =
    phase === 'solid' || (phase === 'melting' && e < 30) ? 'solid' : phase === 'liquid' || phase === 'melting' ? 'liquid' : phase === 'boiling' && e < 170 ? 'liquid' : 'gas';

  // Graph: x = energy supplied, y = temperature (−30 to 130 °C)
  const GX = 40;
  const GY = 10;
  const GW = 280;
  const GH = 160;
  const px = (v: number) => GX + (v / E_MAX) * GW;
  const py = (t: number) => GY + GH - ((t + 30) / 160) * GH;
  const path = SEGMENTS.map(s => `${px(s.e0)},${py(s.t0)} ${px(s.e1)},${py(s.t1)}`).join(' ');
  const pathDrawn: string[] = [];
  for (let v = 0; v <= e; v += 2) pathDrawn.push(`${px(v)},${py(tempAt(v))}`);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="space-y-2">
          <ParticleStateSim mn={mn} state={particleState} showButtons={false} />
          <div className="text-xs font-bold text-violet-700 dark:text-violet-300">{mn ? PHASE_LABEL[phase].mn : PHASE_LABEL[phase].en}</div>
        </div>
        <div className="space-y-2">
          <svg viewBox="0 0 340 200" className="w-full h-auto rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" role="img" aria-label={mn ? 'Халаалтын муруй' : 'Heating curve'}>
            <line x1={GX} y1={py(0)} x2={GX + GW} y2={py(0)} className="stroke-slate-300 dark:stroke-slate-700" strokeDasharray="4 4" />
            <line x1={GX} y1={py(100)} x2={GX + GW} y2={py(100)} className="stroke-slate-300 dark:stroke-slate-700" strokeDasharray="4 4" />
            <polyline points={path} fill="none" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth={1.5} />
            {pathDrawn.length > 1 && <polyline points={pathDrawn.join(' ')} fill="none" className="stroke-violet-600" strokeWidth={3} />}
            <circle cx={px(e)} cy={py(temp)} r={5} className="fill-violet-600" />
            <text x={GX} y={GY + GH + 14} className="fill-slate-500 text-[9px]">{mn ? 'Нийлүүлсэн энерги →' : 'Energy supplied →'}</text>
            <text x={4} y={py(100) - 4} className="fill-slate-500 text-[9px]">100 °C</text>
            <text x={4} y={py(0) - 4} className="fill-slate-500 text-[9px]">0 °C</text>
            <text x={GX + 4} y={py(120) - 4} className="fill-slate-500 text-[9px]">{mn ? 'Температур' : 'Temperature'}</text>
          </svg>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setPlaying(p => !p)}
              className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-black"
            >
              {playing ? (mn ? 'Зогсоох' : 'Pause') : mn ? 'Халаах' : 'Heat'}
            </button>
            <button
              onClick={() => {
                setPlaying(false);
                setE(0);
              }}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold"
            >
              {mn ? 'Дахин эхлэх' : 'Reset'}
            </button>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-300">{Math.round(temp)} °C</span>
          </div>
          <input
            type="range"
            min={0}
            max={E_MAX}
            value={e}
            onChange={ev => {
              setPlaying(false);
              setE(Number(ev.target.value));
            }}
            className="w-full accent-violet-600"
            aria-label={mn ? 'Нийлүүлсэн энерги' : 'Energy supplied'}
          />
        </div>
      </div>
      <p className="text-[11px] text-slate-600 dark:text-slate-300">
        {mn
          ? 'Хэвтээ хэсэгт (0 °C, 100 °C) нийлүүлсэн энерги бөөмсийн хоорондын татах хүчийг даван туулна; температур өсдөггүй.'
          : 'On the flat parts (0 °C, 100 °C) the energy supplied breaks the forces between particles, so the temperature does not rise.'}
      </p>
    </div>
  );
};

// 4. Gas at constant pressure (free piston) or at constant temperature (compression)
const GAS_W = 220;
const GAS_BASE_H = 80; // height at 20 °C, in the same units as the piston position

export const GasPressureSim: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [mode, setMode] = useState<'pressure' | 'temperature'>('pressure');
  const [tC, setTC] = useState(20);
  const [vRel, setVRel] = useState(1); // piston position in constant-temperature mode, relative to 1 at 20 °C
  const [pts, setPts] = useState<Array<{ u: number; v: number; vu: number; vv: number }>>(() =>
    Array.from({ length: 28 }, () => ({ u: rnd(), v: rnd(), vu: (rnd() - 0.5) * 0.04, vv: (rnd() - 0.5) * 0.04 }))
  );

  const tK = tC + 273;
  const speed = Math.sqrt(tK / 293); // particle speed grows with the square root of the absolute temperature
  const volume = mode === 'pressure' ? tK / 293 : vRel;
  const boxH = GAS_BASE_H * volume * 0.9; // scaled so the largest box still fits the drawing
  const pressure = mode === 'pressure' ? 1 : (tK / 293) / vRel; // relative pressure (P ∝ T/V for a fixed amount of gas)

  useEffect(() => {
    const id = window.setInterval(() => {
      setPts(prev =>
        prev.map(p => {
          let u = p.u + p.vu * speed;
          let v = p.v + p.vv * speed;
          let vu = p.vu;
          let vv = p.vv;
          if (u < 0 || u > 1) {
            vu = -vu;
            u = Math.min(1, Math.max(0, u));
          }
          if (v < 0 || v > 1) {
            vv = -vv;
            v = Math.min(1, Math.max(0, v));
          }
          return { u, v, vu, vv };
        })
      );
    }, 60);
    return () => window.clearInterval(id);
  }, [speed]);

  const SVG_H = 190;
  const bottom = SVG_H - 20;
  const top = bottom - boxH;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {(['pressure', 'temperature'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`px-3 py-1.5 rounded-xl border text-xs font-black ${
              mode === m ? 'bg-violet-600 text-white border-violet-600' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            {m === 'pressure'
              ? mn
                ? 'Тогтмол даралт (поршень чөлөөтэй)'
                : 'Constant pressure (free piston)'
              : mn
                ? 'Тогтмол температур (шахах)'
                : 'Constant temperature (compress)'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <svg viewBox={`0 0 ${GAS_W + 60} ${SVG_H}`} className="w-full h-auto rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" role="img" aria-label={mn ? 'Хийн сав' : 'Gas container'}>
          <rect x={30} y={top} width={GAS_W} height={bottom - top} className="fill-white dark:fill-slate-950 stroke-slate-500" strokeWidth={2} />
          <rect x={30} y={top - 8} width={GAS_W} height={8} className="fill-slate-400 dark:fill-slate-600" />
          {pts.map((p, i) => (
            <circle key={i} cx={30 + p.u * GAS_W} cy={top + p.v * (bottom - top)} r={4} className="fill-sky-500" />
          ))}
        </svg>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
              {mn ? 'Температур' : 'Temperature'}: {tC} °C ({tK} K)
            </label>
            <input type="range" min={-20} max={300} step={5} value={tC} onChange={e => setTC(Number(e.target.value))} className="w-full accent-violet-600" aria-label={mn ? 'Температур' : 'Temperature'} />
          </div>
          {mode === 'temperature' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                {mn ? 'Поршений байрлал (эзлэхүүн)' : 'Piston position (volume)'}: {(vRel * 100).toFixed(0)} %
              </label>
              <input type="range" min={0.4} max={1.4} step={0.02} value={vRel} onChange={e => setVRel(Number(e.target.value))} className="w-full accent-violet-600" aria-label={mn ? 'Поршений байрлал' : 'Piston position'} />
            </div>
          )}
          <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-xs text-violet-900 dark:text-violet-200 space-y-1">
            <div>{mn ? `Эзлэхүүн (харьцангуй): ${(volume * 100).toFixed(0)} %` : `Volume (relative): ${(volume * 100).toFixed(0)} %`}</div>
            <div>{mn ? `Даралт (харьцангуй): ${pressure.toFixed(2)}` : `Pressure (relative): ${pressure.toFixed(2)}`}</div>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300">
            {mn
              ? 'Температур өсвөл бөөмс хурдан хөдөлж, ханатай илүү хүчтэй, олон мөргөлдөнө. Тогтмол даралтанд поршень өргөгдөж эзлэхүүн нэмэгдэнэ. Тогтмол температурт шахвал бөөмс ойртож, даралт нэмэгдэнэ.'
              : 'Higher temperature: particles move faster and hit the walls harder and more often. At constant pressure the piston rises and the volume increases. At constant temperature, compressing brings the particles closer and the pressure rises.'}
          </p>
        </div>
      </div>
    </div>
  );
};

// 5. Diffusion of NH3 (Mr 17) and HCl (Mr 36.5) in a tube: the white ring of NH4Cl forms nearer the HCl end
const TUBE_L = 300;
const TUBE_X0 = 20;
const RATE_NH3 = 1 / Math.sqrt(17); // rate of diffusion ∝ 1 / √Mr
const RATE_HCL = 1 / Math.sqrt(36.5);
const MEET_FRAC = RATE_NH3 / (RATE_NH3 + RATE_HCL); // share of the tube the NH₃ travels before the gases meet

export const DiffusionSim: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hot, setHot] = useState(false);
  const T_END = 100; // time to the meeting point at the lower temperature
  const k = hot ? 1.6 : 1; // a higher temperature makes both gases move faster by the same factor

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setT(prev => {
        const next = prev + 1.5;
        if (next >= T_END) {
          setPlaying(false);
          return T_END;
        }
        return next;
      });
    }, 60);
    return () => window.clearInterval(id);
  }, [playing]);

  // Position of each front: NH₃ moves from the left, HCl from the right
  const xNH3 = TUBE_X0 + MEET_FRAC * TUBE_L * (t / T_END) * k;
  const xHCl = TUBE_X0 + TUBE_L - (1 - MEET_FRAC) * TUBE_L * (t / T_END) * k;
  const met = xNH3 >= xHCl;
  const ringX = (xNH3 + xHCl) / 2;
  const fromHCl = met ? Math.round(((TUBE_X0 + TUBE_L - ringX) / TUBE_L) * 100) : null;

  // Deterministic dots inside each front so the picture is stable while the time changes
  const dotsNH3 = Array.from({ length: 16 }, (_, i) => TUBE_X0 + ((i * 37) % 17) / 17 * Math.max(0, Math.min(xNH3, xHCl) - TUBE_X0));
  const dotsHCl = Array.from({ length: 16 }, (_, i) => TUBE_X0 + TUBE_L - ((i * 29) % 17) / 17 * Math.max(0, TUBE_X0 + TUBE_L - Math.max(xHCl, xNH3)));

  return (
    <div className="space-y-3">
      <svg viewBox="0 0 340 110" className="w-full h-auto rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" role="img" aria-label={mn ? 'Диффузийн хоолой' : 'Diffusion tube'}>
        <rect x={TUBE_X0} y={40} width={TUBE_L} height={28} rx={6} className="fill-white dark:fill-slate-950 stroke-slate-500" strokeWidth={2} />
        {dotsNH3.map((x, i) => (
          <circle key={`n${i}`} cx={x} cy={48 + (i % 4) * 4} r={2.5} className="fill-sky-500" />
        ))}
        {dotsHCl.map((x, i) => (
          <circle key={`h${i}`} cx={x} cy={48 + (i % 4) * 4} r={2.5} className="fill-rose-500" />
        ))}
        {met && <rect x={ringX - 3} y={40} width={6} height={28} className="fill-white stroke-slate-400" strokeWidth={1} />}
        {met && <circle cx={ringX} cy={54} r={7} className="fill-white stroke-slate-500" strokeWidth={1.5} />}
        <text x={TUBE_X0} y={28} className="fill-sky-600 text-[10px] font-bold">NH₃ (Mr 17)</text>
        <text x={TUBE_X0 + TUBE_L - 70} y={28} className="fill-rose-600 text-[10px] font-bold">HCl (Mr 36.5)</text>
      </svg>
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setPlaying(p => !p)} className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-black">
          {playing ? (mn ? 'Зогсоох' : 'Pause') : mn ? 'Тархуулах' : 'Run'}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setT(0);
          }}
          className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold"
        >
          {mn ? 'Дахин эхлэх' : 'Reset'}
        </button>
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
          <input type="checkbox" checked={hot} onChange={e => setHot(e.target.checked)} className="accent-violet-600" />
          {mn ? 'Халуун (хурдан)' : 'Hot (faster)'}
        </label>
      </div>
      <input type="range" min={0} max={T_END} value={t} onChange={e => { setPlaying(false); setT(Number(e.target.value)); }} className="w-full accent-violet-600" aria-label={mn ? 'Хугацаа' : 'Time'} />
      <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-xs text-violet-900 dark:text-violet-200">
        {met && fromHCl !== null
          ? mn
            ? `Цагаан бөгж HCl-ийн үзүүрээс ${fromHCl} % урт зайд (HCl-ийн үзүүрт ойр) үүслээ. NH₃ хөнгөн тул хурдан тархсан.`
            : `The white ring formed ${fromHCl}% of the tube length from the HCl end (nearer the HCl end). NH₃ is lighter, so it diffused faster.`
          : mn
            ? 'Хоёр хий тулгарахаар цагаан NH₄Cl-ийн бөгж үүснэ.'
            : 'The white NH₄Cl ring forms where the two gases meet.'}
      </div>
      <p className="text-[11px] text-slate-600 dark:text-slate-300">
        {mn
          ? 'Загвар: хийн диффуз хурд нь харьцангуй молекул массын квадрат язгуурын урвуутай пропорциональ (≈ 1/√Mr). Халуун болгоход хоёр хий хоёулаа хурдан тархаж, бөгжний байрлал өөрчлөгдөхгүй, зөвхөн хугацаа богиносно.'
          : 'Model: the rate of diffusion of a gas is inversely proportional to the square root of its relative molecular mass (≈ 1/√Mr). Heating both gases speeds up both, so the ring keeps its position but forms sooner.'}
      </p>
    </div>
  );
};
