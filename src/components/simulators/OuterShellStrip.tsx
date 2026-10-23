import React from 'react';
import type { PeriodicElement } from '../../data/periodicTableData';
import './atomView.css';

// The atoms that share the chosen number of outer electrons, each drawn as a moving atom.
// Every shell orbits at its own speed, and the outer shell is drawn in amber, so the count can be seen on the atom.

const RING_BASE = 36; // diameter of the innermost shell, in px
const RING_STEP = 11; // extra diameter for each shell further out

const MiniAtom: React.FC<{ el: PeriodicElement; selected: boolean; onClick: () => void; mn: boolean }> = ({ el, selected, onClick, mn }) => {
  const shells = el.electronConfig;
  const outerIndex = shells.length - 1;

  return (
    <button
      onClick={onClick}
      className={`shrink-0 w-32 rounded-2xl border p-2 flex flex-col items-center gap-1 bg-white dark:bg-slate-900 hover:border-emerald-500 transition-colors ${
        selected ? 'border-emerald-600 ring-2 ring-emerald-500' : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="relative w-28 h-28">
        {/* Nucleus, kept upright over the orbits */}
        <div className="absolute left-1/2 top-1/2 w-6 h-6 -ml-3 -mt-3 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black z-10 shadow-[0_0_10px_rgba(16,185,129,0.7)]">
          {el.symbol}
        </div>

        {shells.map((count, i) => {
          const diameter = RING_BASE + i * RING_STEP;
          const isOuter = i === outerIndex;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full border border-slate-300 dark:border-slate-600"
              style={{ width: diameter, height: diameter, marginLeft: -diameter / 2, marginTop: -diameter / 2 }}
            >
              <div className="atom-orbit absolute inset-0" style={{ animationDuration: `${4 + i * 1.5}s` }}>
                {Array.from({ length: count }).map((_, e) => (
                  <div key={e} className="absolute inset-0" style={{ transform: `rotateZ(${(e * 360) / count}deg)` }}>
                    <span
                      className={`absolute w-1.5 h-1.5 rounded-full ${isOuter ? 'bg-amber-400' : 'bg-sky-400'}`}
                      style={{ left: 'calc(100% - 3px)', top: 'calc(50% - 3px)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-[11px] font-mono text-slate-700 dark:text-slate-200">
        <span className="font-black">{el.symbol}</span> · {el.z}
      </div>
      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate w-full text-center">{mn ? el.nameMn : el.nameEn}</div>
    </button>
  );
};

interface Props {
  elements: PeriodicElement[];
  outer: number;
  selectedZ: number;
  onSelect: (z: number) => void;
  mn: boolean;
}

export const OuterShellStrip: React.FC<Props> = ({ elements, outer, selectedZ, onSelect, mn }) => (
  <div className="space-y-2">
    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
      {mn
        ? `Гадаад бүрхүүлд ${outer} электронтой атомууд (${elements.length}) · хөдөлгөөнт загвар, амьд харагдац`
        : `Atoms with ${outer} outer electron${outer === 1 ? '' : 's'} (${elements.length}) · moving atom model`}
    </div>
    {elements.length === 0 ? (
      <p className="text-xs text-slate-500">{mn ? 'Энэ тоотой атом алга.' : 'No atom has this count.'}</p>
    ) : (
      <div className="flex gap-3 overflow-x-auto pb-2">
        {elements.map(el => (
          <MiniAtom key={el.z} el={el} selected={el.z === selectedZ} onClick={() => onSelect(el.z)} mn={mn} />
        ))}
      </div>
    )}
  </div>
);
