import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';
import type { GlossaryTerm } from '../data/statesLessonSupport';
import { useLanguage } from '../context/LanguageContext';
import { StepSticker } from './StepSticker';

// Shuffles a list, so the order of the questions and of the choices is not the same every time
const mix = <T,>(list: T[]): T[] => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

interface StatesGlossaryProps {
  items: GlossaryTerm[];
  mn: boolean;
}

// A lesson's key words, read as a list of terms with their definitions, or as a quiz: each definition is shown with three terms,
// and the student guesses the right one. A right answer earns a star sticker, a wrong one stays open for another try.
export const StatesGlossary: React.FC<StatesGlossaryProps> = ({ items, mn }) => {
  const { mode: lang } = useLanguage();
  // English only, Mongolian only, or both in Dual (English first, Mongolian beside it in a lighter tone)
  const tx = (en: string, mongolian: string): ReactNode => {
    if (lang === 'en') return en;
    if (lang === 'mn') return mongolian;
    return (
      <>
        {en}
        <span className="block text-xs font-normal opacity-75">{mongolian}</span>
      </>
    );
  };
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<'read' | 'quiz'>('read');
  const [seed, setSeed] = useState(0);
  const n = items.length;
  // Each question is one term's definition, with its right term and two others, all in a random order
  const questions = useMemo(
    () =>
      mix(Array.from({ length: n }, (_, i) => i)).map(answer => ({
        answer,
        options: mix(Array.from(new Set([answer, (answer + 1) % n, (answer + 2) % n])))
      })),
    [n, seed]
  );
  const [pos, setPos] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wrongPick, setWrongPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const finished = pos >= n;

  const pick = (option: number) => {
    if (solved) return;
    if (option === questions[pos].answer) {
      setSolved(true);
      setWrongPick(null);
      setScore(s => s + 1);
    } else {
      setWrongPick(option);
    }
  };

  const next = () => {
    setPos(p => p + 1);
    setSolved(false);
    setWrongPick(null);
  };

  const restart = () => {
    setSeed(s => s + 1);
    setPos(0);
    setSolved(false);
    setWrongPick(null);
    setScore(0);
  };

  const choiceClass = (isRight: boolean, isWrong: boolean) =>
    `w-full p-3 rounded-xl border text-sm font-bold text-left leading-snug transition-colors disabled:cursor-default ${
      isRight
        ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
        : isWrong
          ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-violet-500'
    }`;

  return (
    <div className="space-y-3">
      <div className="inline-flex p-0.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-bold">
        {(['read', 'quiz'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mode === m ? 'bg-violet-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {m === 'read' ? (mn ? 'Тайлбар' : 'Read') : mn ? 'Таах' : 'Quiz'}
          </button>
        ))}
      </div>

      {mode === 'read' ? (
        n === 0 ? null : (
          <div className="space-y-3">
            {/* The terms side by side; the one chosen shows its definition in the dark panel below */}
            <div className="flex flex-wrap gap-2" role="list">
              {items.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`px-3 py-1.5 rounded-full border text-sm font-bold text-left leading-snug transition-colors ${
                    active === i
                      ? 'bg-violet-600 border-violet-600 text-white'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-violet-800 dark:text-violet-300 hover:border-violet-500'
                  }`}
                >
                  {tx(g.term.en, g.term.mn)}
                </button>
              ))}
            </div>
            <div className="rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 p-5 space-y-2 shadow-sm">
              <div className="text-sm font-black text-violet-300">{tx(items[active].term.en, items[active].term.mn)}</div>
              <p className="text-sm leading-relaxed text-slate-100">{tx(items[active].def.en, items[active].def.mn)}</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActive(a => Math.max(0, a - 1))}
                disabled={active === 0}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-200 disabled:opacity-40"
              >
                ← {tx('Previous', 'Өмнөх')}
              </button>
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                {active + 1} / {n}
              </span>
              <button
                type="button"
                onClick={() => setActive(a => Math.min(n - 1, a + 1))}
                disabled={active === n - 1}
                className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-sm font-black"
              >
                {tx('Next', 'Дараагийн')} →
              </button>
            </div>
          </div>
        )
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
            <span>{mn ? `Асуулт ${Math.min(pos + 1, n)} / ${n}` : `Question ${Math.min(pos + 1, n)} / ${n}`}</span>
            <span className="inline-flex items-center gap-2">
              <StepSticker step={score} />
              {mn ? `Зөв: ${score}` : `Correct: ${score}`}
            </span>
          </div>

          {!finished && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {mn ? 'Энэ тайлбарт тохирох нэр томьёо аль нь вэ?' : 'Which term matches this definition?'}
              </p>
              <p className="text-base leading-relaxed text-slate-900 dark:text-white">
                {mn ? items[questions[pos].answer].def.mn : items[questions[pos].answer].def.en}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {questions[pos].options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => pick(opt)}
                    disabled={solved}
                    className={choiceClass(solved && opt === questions[pos].answer, wrongPick === opt)}
                  >
                    {mn ? items[opt].term.mn : items[opt].term.en}
                  </button>
                ))}
              </div>
              {solved && (
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">{mn ? 'Зөв!' : 'Correct!'}</p>
                  <button
                    onClick={next}
                    className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-black"
                  >
                    {pos + 1 >= n ? (mn ? 'Дуусгах' : 'Finish') : mn ? 'Дараагийн асуулт →' : 'Next question →'}
                  </button>
                </div>
              )}
            </div>
          )}

          {finished && (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-3 text-center">
              <div className="flex justify-center">
                <StepSticker step={score} />
              </div>
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                {mn ? `Зөв: ${score} / ${n}` : `Correct: ${score} / ${n}`}
              </p>
              <button
                onClick={restart}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {mn ? 'Дахин эхлүүлэх' : 'Start again'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
