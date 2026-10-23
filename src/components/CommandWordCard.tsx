import React, { useState } from 'react';
import type { CommandWord } from '../data/commandWords';
import { ChemText } from './common/ChemText';

// One command word: its meaning, then its practice tasks. The student writes an answer, opens the model answer and ticks the
// check points. The extra task opens only after the first one is opened, and only when the student asks for it.
export const CommandWordCard: React.FC<{ cw: CommandWord; mn: boolean }> = ({ cw, mn }) => {
  const [shown, setShown] = useState(1);
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [ticked, setTicked] = useState<Record<string, boolean>>({});

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <span className="text-base font-extrabold text-emerald-700 dark:text-cyan-300 font-mono">
          {mn ? cw.wordMn : cw.word}
        </span>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
          {mn ? cw.word : cw.wordMn}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-200 leading-relaxed">
        <ChemText>{mn ? cw.definitionMn : cw.definitionEn}</ChemText>
      </p>

      {cw.tasks.slice(0, shown).map((task, i) => (
        <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-2">
          <span className="text-[10px] font-bold uppercase font-mono text-slate-500 dark:text-slate-400">
            {i === 0 ? (mn ? 'Даалгавар 1' : 'Task 1') : mn ? 'Нэмэлт даалгавар' : 'Extra task'}
          </span>
          <p className="text-xs text-slate-800 dark:text-slate-100 leading-relaxed">
            <ChemText>{mn ? task.questionMn : task.questionEn}</ChemText>
          </p>
          <textarea
            value={drafts[i] ?? ''}
            onChange={e => setDrafts(d => ({ ...d, [i]: e.target.value }))}
            rows={2}
            placeholder={mn ? 'Хариугаа энд бичнэ' : 'Write your answer here'}
            className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-2"
          />

          {!open[i] ? (
            <button
              onClick={() => setOpen(o => ({ ...o, [i]: true }))}
              className="text-xs font-bold text-violet-700 dark:text-violet-300 hover:underline"
            >
              {mn ? 'Хариу харах' : 'Show the model answer'}
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-bold">{mn ? 'Загвар хариу: ' : 'Model answer: '}</span>
                <ChemText>{mn ? task.answerMn : task.answerEn}</ChemText>
              </p>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase font-mono text-slate-500 dark:text-slate-400">
                  {mn ? 'Өөрийн хариуг шалгах' : 'Check your answer'}
                </span>
                {(mn ? task.checkMn : task.checkEn).map((c, j) => {
                  const key = `${i}-${j}`;
                  return (
                    <label key={key} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={!!ticked[key]}
                        onChange={() => setTicked(t => ({ ...t, [key]: !t[key] }))}
                        className="mt-0.5"
                      />
                      <span>{c}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}

      {shown < cw.tasks.length && open[shown - 1] && (
        <button
          onClick={() => setShown(s => s + 1)}
          className="px-3 py-1.5 rounded-lg border border-violet-400 text-xs font-bold text-violet-800 dark:text-violet-200"
        >
          {mn ? 'Нэмэлт даалгавар нээх' : 'Open the extra task'}
        </button>
      )}
    </div>
  );
};
