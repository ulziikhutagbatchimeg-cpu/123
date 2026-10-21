import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ChemText } from './common/ChemText';
import { Gamepad2, RotateCcw, Trophy } from 'lucide-react';

const ROUND_SIZE = 6;

interface MatchTerm {
  id: string;
  termEn: string;
  termMn: string;
}

// Every syllabus vocabulary term, de-duplicated by English name
const ALL_TERMS: MatchTerm[] = (() => {
  const seen = new Map<string, MatchTerm>();
  CURRICULUM_CHAPTERS.forEach(c =>
    c.topics.forEach(t =>
      t.vocabulary.forEach(v => {
        const key = v.termEn.trim().toLowerCase();
        if (!seen.has(key)) seen.set(key, { id: v.id, termEn: v.termEn, termMn: v.termMn });
      })
    )
  );
  return Array.from(seen.values());
})();

const shuffle = <T,>(items: T[]): T[] => {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// English term ↔ Mongolian translation matching game built from the syllabus vocabulary.
export const VocabMatchGame: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';

  const [round, setRound] = useState<number>(0);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedMn, setSelectedMn] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [misses, setMisses] = useState<number>(0);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);

  const deck = useMemo(() => shuffle(ALL_TERMS).slice(0, ROUND_SIZE), [round]);
  const leftOrder = useMemo(() => shuffle(deck), [deck]);
  const rightOrder = useMemo(() => shuffle(deck), [deck]);

  // Evaluate each completed pair; a wrong pair flashes briefly and then clears.
  useEffect(() => {
    if (selectedEn === null || selectedMn === null) return;
    if (selectedEn === selectedMn) {
      setMatched(prev => [...prev, selectedEn]);
      setSelectedEn(null);
      setSelectedMn(null);
      return;
    }
    setMisses(m => m + 1);
    setWrongFlash(true);
    const t = window.setTimeout(() => {
      setSelectedEn(null);
      setSelectedMn(null);
      setWrongFlash(false);
    }, 700);
    return () => window.clearTimeout(t);
  }, [selectedEn, selectedMn]);

  const restart = () => {
    setRound(r => r + 1);
    setSelectedEn(null);
    setSelectedMn(null);
    setMatched([]);
    setMisses(0);
    setWrongFlash(false);
  };

  const pickEn = (id: string) => {
    if (wrongFlash || matched.includes(id)) return;
    setSelectedEn(prev => (prev === id ? null : id));
  };

  const pickMn = (id: string) => {
    if (wrongFlash || matched.includes(id)) return;
    setSelectedMn(prev => (prev === id ? null : id));
  };

  const finished = deck.length > 0 && matched.length === deck.length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-amber-500" />
            {mn ? 'Англи – монгол үг таних тоглоом' : 'English – Mongolian word match'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mn
              ? 'Англи нэр томьёог түүний монгол орчуулгатай тааруулна уу.'
              : 'Tap an English term, then its Mongolian translation.'}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
          <span>{mn ? 'Алдаа' : 'Misses'}: {misses}</span>
          <span>{matched.length}/{deck.length}</span>
          <button
            onClick={restart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {mn ? 'Шинэ тоглоом' : 'New round'}
          </button>
        </div>
      </div>

      {deck.length === 0 ? (
        <p className="text-xs text-slate-500">{mn ? 'Үгийн сан хоосон байна.' : 'The vocabulary deck is empty.'}</p>
      ) : finished ? (
        <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center space-y-2">
          <Trophy className="w-8 h-8 mx-auto text-emerald-600" />
          <div className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
            {mn ? `Бүгдийг таарууллаа! Алдаа: ${misses}` : `All matched! Misses: ${misses}`}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            {leftOrder.map(c => {
              const done = matched.includes(c.id);
              const active = selectedEn === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => pickEn(c.id)}
                  disabled={done}
                  className={`w-full p-3 rounded-xl border text-xs font-bold text-left transition-colors ${
                    done
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300 opacity-60'
                      : active
                        ? wrongFlash
                          ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-800 dark:text-rose-200'
                          : 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200'
                        : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <ChemText>{c.termEn}</ChemText>
                </button>
              );
            })}
          </div>
          <div className="space-y-2">
            {rightOrder.map(c => {
              const done = matched.includes(c.id);
              const active = selectedMn === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => pickMn(c.id)}
                  disabled={done}
                  className={`w-full p-3 rounded-xl border text-xs font-bold text-left transition-colors ${
                    done
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300 opacity-60'
                      : active
                        ? wrongFlash
                          ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-800 dark:text-rose-200'
                          : 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200'
                        : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <ChemText>{c.termMn}</ChemText>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
