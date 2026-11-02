import React, { useState } from 'react';

// The symbols of the first twenty elements, so the atom can be named
const SYMBOLS = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
// How many electrons each shell holds, from the inside out (the first twenty elements need four shells)
const SHELL_CAPACITY = [2, 8, 8, 2];
// The radius of each shell in the drawing
const SHELL_RADIUS = [46, 74, 102, 126];

// The electrons in each shell, filling the inner shell first
const shellsFor = (electrons: number): number[] => {
  let left = electrons;
  return SHELL_CAPACITY.map(cap => {
    const n = Math.min(cap, Math.max(0, left));
    left -= n;
    return n;
  }).filter(n => n > 0);
};

// Interactive atom: change the protons, the neutrons and the charge, and the atom, its isotope and its electron shells change.
// Protons set the element; neutrons make an isotope; electrons differ from protons when the atom is an ion.
export const AtomBuilder: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [protons, setProtons] = useState<number>(17);
  const [neutrons, setNeutrons] = useState<number>(18);
  const [charge, setCharge] = useState<number>(0);

  const electrons = Math.max(0, protons - charge);
  const massNumber = protons + neutrons;
  const symbol = SYMBOLS[protons - 1] ?? '?';
  const shells = shellsFor(electrons);
  const chargeText = charge === 0 ? '' : `${Math.abs(charge)}${charge > 0 ? '+' : '−'}`;

  // The protons and neutrons, packed in the nucleus
  const nucleusDots = (count: number, colour: string, offset: number) =>
    Array.from({ length: count }, (_, i) => {
      const angle = (i + offset) * 2.4;
      const r = 3.2 * Math.sqrt(i + 1);
      return <circle key={`${colour}-${i}`} cx={130 + r * Math.cos(angle)} cy={130 + r * Math.sin(angle)} r={3.6} fill={colour} />;
    });

  return (
    <div className="space-y-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
        {mn ? 'Симуляц: атомын бүтэц' : 'Simulation: atomic structure'}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <svg viewBox="0 0 260 260" className="w-full max-w-sm mx-auto" role="img" aria-label={mn ? 'Атомын зураг' : 'Atom drawing'}>
          {SHELL_RADIUS.slice(0, shells.length).map((r, k) => (
            <circle key={`shell-${k}`} cx={130} cy={130} r={r} fill="none" className="stroke-slate-300 dark:stroke-slate-700" strokeDasharray="4 4" />
          ))}
          {shells.map((n, k) =>
            Array.from({ length: n }, (_, j) => {
              const angle = (2 * Math.PI * j) / n - Math.PI / 2;
              return (
                <circle
                  key={`e-${k}-${j}`}
                  cx={130 + SHELL_RADIUS[k] * Math.cos(angle)}
                  cy={130 + SHELL_RADIUS[k] * Math.sin(angle)}
                  r={5}
                  className="fill-sky-500"
                />
              );
            })
          )}
          {nucleusDots(protons, '#e11d48', 0)}
          {nucleusDots(neutrons, '#64748b', 7)}
        </svg>

        <div className="space-y-3">
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            <sup className="text-sm">{massNumber}</sup>
            {symbol}
            {chargeText && <sup className="text-sm">{chargeText}</sup>}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200">{mn ? 'Протон (Z)' : 'Protons (Z)'}: <b>{protons}</b></div>
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">{mn ? 'Нейтрон (N)' : 'Neutrons (N)'}: <b>{neutrons}</b></div>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200">{mn ? 'Электрон' : 'Electrons'}: <b>{electrons}</b></div>
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">{mn ? 'Массын тоо (A)' : 'Mass number (A)'}: <b>{massNumber}</b></div>
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300">
            {mn ? 'Электроны бүрхүүл: ' : 'Electron shells: '}
            <b className="font-mono">{shells.join(', ')}</b>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <label className="space-y-1">
          <span className="font-bold text-slate-700 dark:text-slate-200">{mn ? 'Протон (Z)' : 'Protons (Z)'}: {protons}</span>
          <input type="range" min={1} max={20} step={1} value={protons} onChange={e => setProtons(Number(e.target.value))} className="w-full accent-rose-600" />
        </label>
        <label className="space-y-1">
          <span className="font-bold text-slate-700 dark:text-slate-200">{mn ? 'Нейтрон (N)' : 'Neutrons (N)'}: {neutrons}</span>
          <input type="range" min={0} max={24} step={1} value={neutrons} onChange={e => setNeutrons(Number(e.target.value))} className="w-full accent-slate-600" />
        </label>
        <label className="space-y-1">
          <span className="font-bold text-slate-700 dark:text-slate-200">{mn ? 'Цахилгаан цэнэг' : 'Charge'}: {charge > 0 ? `+${charge}` : charge}</span>
          <input type="range" min={-2} max={2} step={1} value={charge} onChange={e => setCharge(Number(e.target.value))} className="w-full accent-sky-600" />
        </label>
      </div>

      <p className="text-[11px] text-slate-600 dark:text-slate-400">
        {mn
          ? 'Протоны элементийг тодорхойлно. Нейтроны тоог өөрчилбөл изотоп үүснэ. Цэнэг нь электроны тоог протоноос ялгана (ион).'
          : 'Protons set the element. Changing the neutrons makes an isotope. The charge makes the electrons differ from the protons (an ion).'}
      </p>
    </div>
  );
};
