import React, { useState } from 'react';

// The chemistry escape room for grades 9 and 10, played outside lesson time for extra assessment. A team solves four steps,
// one after another. Each step has a one-digit answer, and the four digits in order are the lab's code. Each finished game is
// saved in this browser, so the student's extra assessment is kept.
const STEPS = [
  {
    qEn: 'A chlorine atom has 17 protons. How many electrons are in its outer shell?',
    qMn: 'Хлорын атомд 17 протон байна. Гаднах бүрхүүлд хэдэн электрон байна вэ?',
    answer: '7',
    hintEn: 'Chlorine is in Group VII.',
    hintMn: 'Хлор VII бүлэгт байна.'
  },
  {
    qEn: 'How many chloride ions (Cl⁻) balance one magnesium ion (Mg²⁺) in MgCl₂?',
    qMn: 'MgCl₂-д нэг магнийн ион (Mg²⁺)-ийг хэдэн хлоридын ион (Cl⁻) тэнцүүлэх вэ?',
    answer: '2',
    hintEn: 'Two Cl⁻ ions, each with a charge of −1, balance +2.',
    hintMn: 'Хоёр Cl⁻ (тус бүр −1) нь +2-ыг тэнцүүлнэ.'
  },
  {
    qEn: 'Magnesium reacts with dilute acid and a gas is given off. It burns with a squeaky pop. What is the atomic number of that gas?',
    qMn: 'Магни шингэрүүлсэн хүчилтэй урвалд орж хий ялгарна. Тэр хий "поп" дуугаргаж шатна. Тэр хийн атомын дугаар хэд вэ?',
    answer: '1',
    hintEn: 'The gas is hydrogen.',
    hintMn: 'Энэ хий нь устөрөгч.'
  },
  {
    qEn: 'Silver nitrate reacts with sodium chloride and forms a white precipitate of AgCl. How many ions are in the formula AgCl?',
    qMn: 'Мөнгөний нитрат натрийн хлоридтой урвалд орж AgCl-ийн цагаан тунадас үүсгэнэ. AgCl-ийн томьёонд хэдэн ион байна вэ?',
    answer: '2',
    hintEn: 'One silver ion and one chloride ion.',
    hintMn: 'Нэг мөнгөний ион ба нэг хлоридын ион.'
  }
];
const CODE = STEPS.map(s => s.answer).join('');
const STORE_KEY = 'chem_escape_results';

interface Result {
  date: string;
  steps: number;
  opened: boolean;
}

const readResults = (): Result[] => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as Result[]) : [];
  } catch {
    return [];
  }
};

const saveResult = (r: Result) => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify([r, ...readResults()].slice(0, 20)));
  } catch {
    // Storage can be blocked; this result then is not kept
  }
};

const CARD = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4';

export const EscapeRoom: React.FC<{ mn: boolean; onBack: () => void }> = ({ mn, onBack }) => {
  const [solved, setSolved] = useState<string[]>([]); // the answers of the steps done, in order
  const [input, setInput] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState('');
  const [opened, setOpened] = useState(false);
  const [history, setHistory] = useState<Result[]>(readResults);

  const stepIndex = solved.length;
  const allSteps = stepIndex >= STEPS.length;

  const checkStep = () => {
    const step = STEPS[stepIndex];
    if (input.trim() === step.answer) {
      setSolved([...solved, step.answer]);
      setInput('');
      setMessage(mn ? 'Зөв! Дараагийн алхам руу.' : 'Correct! On to the next step.');
    } else {
      setMessage(mn ? `Буруу. Сэжүүр: ${step.hintMn}` : `Not quite. Clue: ${step.hintEn}`);
    }
  };

  const openLock = () => {
    if (codeInput.trim() !== CODE) {
      setMessage(mn ? 'Код буруу. Алхам бүрийн хариуг дарааллаар нь бодоорой.' : 'Wrong code. Put the step answers in order.');
      return;
    }
    setOpened(true);
    setMessage(mn ? 'Нээгдлээ! Нэмэлт үнэлгээ хадгалагдлаа.' : 'Opened! Your extra assessment is saved.');
    const r = { date: new Date().toISOString().slice(0, 10), steps: STEPS.length, opened: true };
    saveResult(r);
    setHistory(readResults());
  };

  const restart = () => {
    setSolved([]);
    setInput('');
    setCodeInput('');
    setOpened(false);
    setMessage(null);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-800 rounded-3xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-black">{mn ? 'Химийн нууц код (Escape Room)' : 'Chemistry escape room'}</h2>
        <p className="text-sm text-white/90 mt-2">
          {mn
            ? 'Хичээлийн бус цагт багаар (3–4 сурагч) 20–30 минутад тоглоно. Дөрвөн алхамыг дарааллаар нь бодож, дөрвөн оронтой кодыг нээнэ.'
            : 'Play with a team (3–4 students) in 20–30 minutes outside lesson time. Solve the four steps in order, and open the four-digit lock.'}
        </p>
      </div>

      <div className={CARD}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>
            {mn ? 'Алхам' : 'Step'} {Math.min(stepIndex + 1, STEPS.length)} / {STEPS.length}
          </span>
          <span className="font-mono">
            {mn ? 'Код' : 'Code'}: {solved.join('') || '----'}
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(solved.length / STEPS.length) * 100}%` }} />
        </div>

        <ol className="space-y-2">
          {STEPS.map((s, i) => {
            const done = i < solved.length;
            const current = i === stepIndex && !allSteps;
            return (
              <li
                key={i}
                className={`p-3 rounded-2xl border text-sm ${
                  done
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                    : current
                      ? 'bg-violet-50 dark:bg-violet-950/30 border-violet-300 dark:border-violet-800'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {i + 1}. {mn ? s.qMn : s.qEn}
                  </span>
                  {done && <span className="font-mono font-black text-emerald-700 dark:text-emerald-300">{solved[i]}</span>}
                </div>
                {current && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && input.trim() && checkStep()}
                      inputMode="numeric"
                      maxLength={3}
                      placeholder={mn ? 'Хариу' : 'Answer'}
                      className="w-24 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono"
                    />
                    <button
                      onClick={checkStep}
                      disabled={!input.trim()}
                      className="px-3 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-black disabled:opacity-40"
                    >
                      {mn ? 'Шалгах' : 'Check'}
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {allSteps && !opened && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-2">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {mn ? 'Дөрвөн алхам дууслаа. Кодыг оруулаарай (дөрвөн тоо, дарааллаар).' : 'All four steps are done. Enter the code (four digits, in order).'}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={codeInput}
                onChange={e => setCodeInput(e.target.value)}
                inputMode="numeric"
                maxLength={4}
                placeholder="____"
                className="w-28 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono tracking-widest"
              />
              <button onClick={openLock} className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black">
                {mn ? 'Нээх' : 'Open'}
              </button>
            </div>
          </div>
        )}

        {opened && (
          <p className="text-sm font-black text-emerald-700 dark:text-emerald-300">
            {mn ? '🔓 Нээгдлээ! Сайн ажиллалаа.' : '🔓 Opened! Well done.'}
          </p>
        )}

        {message && <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{message}</p>}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button onClick={restart} className="px-3 py-1.5 rounded-xl border border-violet-400 text-xs font-bold text-violet-800 dark:text-violet-200">
            {mn ? 'Дахин эхлэх' : 'Start again'}
          </button>
          <button onClick={onBack} className="text-xs font-bold text-slate-600 dark:text-slate-300">
            {mn ? 'Буцах' : 'Back'}
          </button>
        </div>
      </div>

      <div className={CARD}>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {mn ? 'Нэмэлт үнэлгээний түүх' : 'Extra assessment history'}
        </div>
        {history.length === 0 ? (
          <p className="text-xs text-slate-600 dark:text-slate-300">{mn ? 'Одоохондоо тоглоогүй байна.' : 'No games played yet.'}</p>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {history.map((h, i) => (
              <li key={i} className="py-2 flex items-center justify-between font-mono">
                <span className="text-slate-600 dark:text-slate-300">{h.date}</span>
                <span className="text-slate-900 dark:text-white">
                  {h.steps} / {STEPS.length} {mn ? 'алхам' : 'steps'}
                </span>
                <span className={h.opened ? 'font-bold text-emerald-700 dark:text-emerald-300' : 'text-slate-500'}>
                  {h.opened ? (mn ? 'Нээсэн' : 'Opened') : mn ? 'Нээгээгүй' : 'Not opened'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
