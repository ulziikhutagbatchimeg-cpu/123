import React, { useEffect, useRef, useState } from 'react';
import type { GameItem } from './GameArenaView';
import { ChemText } from './common/ChemText';

// A Kahoot-style team game for one room. The host runs it on one screen: the question and four coloured answers are shown,
// and the host taps the answer each player chose. A fast right answer scores more. The results show every team and every
// player, with numbers: points, accuracy, average time, and the longest run of right answers.

type Letter = 'A' | 'B' | 'C' | 'D';
const LETTERS: Letter[] = ['A', 'B', 'C', 'D'];
const TILE = [
  { shape: '▲', cls: 'bg-red-500 text-white' },
  { shape: '◆', cls: 'bg-blue-500 text-white' },
  { shape: '●', cls: 'bg-amber-400 text-slate-900' },
  { shape: '■', cls: 'bg-emerald-500 text-white' }
];
const TEAM_DOT = ['bg-rose-500', 'bg-sky-500', 'bg-amber-500', 'bg-emerald-500'];
const COUNTS = [5, 10, 15];
const LIMITS = [10, 15, 20];

interface Team {
  name: string;
  members: string;
}
interface Player {
  id: string;
  name: string;
  team: number;
}
interface Answer {
  letter: Letter | null;
  correct: boolean;
  ms: number;
  points: number;
}
type Phase = 'setup' | 'play' | 'final';

const splitNames = (text: string) =>
  text
    .split(/[,\n]/)
    .map(s => s.trim())
    .filter(Boolean);

const CARD = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4';

export const KahootGame: React.FC<{ mn: boolean; buildDeck: (count: number) => GameItem[]; onBack: () => void }> = ({
  mn,
  buildDeck,
  onBack
}) => {
  const [phase, setPhase] = useState<Phase>('setup');
  const [teams, setTeams] = useState<Team[]>([
    { name: mn ? 'Баг A' : 'Team A', members: '' },
    { name: mn ? 'Баг B' : 'Team B', members: '' }
  ]);
  const [count, setCount] = useState(10);
  const [limitSec, setLimitSec] = useState(15);
  const [deck, setDeck] = useState<GameItem[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [q, setQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const startedAt = useRef(0);
  const limitMs = limitSec * 1000;

  // The clock of the question: it ends the question when the time runs out
  useEffect(() => {
    if (phase !== 'play' || revealed) return;
    const id = window.setInterval(() => {
      const e = Date.now() - startedAt.current;
      setElapsed(Math.min(e, limitMs));
      if (e >= limitMs) setRevealed(true);
    }, 100);
    return () => window.clearInterval(id);
  }, [phase, revealed, q, limitMs]);

  // The question ends as soon as every player has answered
  useEffect(() => {
    if (phase === 'play' && !revealed && players.length > 0 && players.every(p => answers[q]?.[p.id])) setRevealed(true);
  }, [answers, q, phase, revealed, players]);

  const start = () => {
    const list: Player[] = [];
    teams.forEach((t, ti) => splitNames(t.members).forEach((name, i) => list.push({ id: `p${ti}-${i}`, name, team: ti })));
    const built = buildDeck(count);
    if (list.length === 0 || built.length === 0) return;
    setPlayers(list);
    setDeck(built);
    setAnswers([]);
    setQ(0);
    setRevealed(false);
    setElapsed(0);
    startedAt.current = Date.now();
    setPhase('play');
  };

  const choose = (playerId: string, letter: Letter) => {
    if (revealed || answers[q]?.[playerId]) return;
    const ms = Math.min(limitMs, Date.now() - startedAt.current);
    const correct = deck[q].choices[LETTERS.indexOf(letter)]?.isCorrect ?? false;
    const points = correct ? Math.round(500 + 500 * (1 - ms / limitMs)) : 0;
    setAnswers(prev => {
      const next = [...prev];
      next[q] = { ...(next[q] ?? {}), [playerId]: { letter, correct, ms, points } };
      return next;
    });
  };

  const nextQuestion = () => {
    if (q + 1 >= deck.length) {
      setPhase('final');
      return;
    }
    setQ(q + 1);
    setRevealed(false);
    setElapsed(0);
    startedAt.current = Date.now();
  };

  // Numbers for one player over the whole game
  const playerStats = (p: Player) => {
    let correct = 0;
    let points = 0;
    let run = 0;
    let best = 0;
    let msSum = 0;
    deck.forEach((_, i) => {
      const a = answers[i]?.[p.id];
      if (a?.correct) {
        correct++;
        points += a.points;
        msSum += a.ms;
        run++;
        best = Math.max(best, run);
      } else {
        run = 0;
      }
    });
    return {
      correct,
      points,
      best,
      accuracy: deck.length ? Math.round((correct / deck.length) * 100) : 0,
      avgSec: correct ? msSum / correct / 1000 : 0
    };
  };

  const teamPoints = (ti: number) =>
    players.filter(p => p.team === ti).reduce((n, p) => n + playerStats(p).points, 0);

  // ------------------------------------------------------------------ setup
  if (phase === 'setup') {
    return (
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500 rounded-3xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-black">{mn ? 'Багаар тоглох' : 'Team play'}</h2>
          <p className="text-sm text-white/90 mt-2">
            {mn
              ? 'Багуудаа нэрлээд гишүүдийг нь оруул. Хөтлөгч хариултыг товшино; хурдан, зөв хариулсан нь илүү оноо авна.'
              : 'Name the teams and their members. The host taps each answer; a fast right answer scores more.'}
          </p>
        </div>

        <div className={CARD}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams.map((t, ti) => (
              <div key={ti} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${TEAM_DOT[ti]}`} />
                  <input
                    value={t.name}
                    maxLength={20}
                    onChange={e => setTeams(prev => prev.map((x, i) => (i === ti ? { ...x, name: e.target.value } : x)))}
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-sm font-bold text-slate-900 dark:text-white"
                  />
                  {teams.length > 2 && (
                    <button
                      onClick={() => setTeams(prev => prev.filter((_, i) => i !== ti))}
                      className="text-xs font-bold text-rose-600 dark:text-rose-400"
                    >
                      {mn ? 'Хасах' : 'Remove'}
                    </button>
                  )}
                </div>
                <textarea
                  value={t.members}
                  onChange={e => setTeams(prev => prev.map((x, i) => (i === ti ? { ...x, members: e.target.value } : x)))}
                  rows={3}
                  placeholder={mn ? 'Гишүүд: Бат, Сараа, Ганаа' : 'Members: Sam, Ann, Lee'}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
                />
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {splitNames(t.members).length} {mn ? 'тоглогч' : 'players'}
                </div>
              </div>
            ))}
          </div>

          {teams.length < 4 && (
            <button
              onClick={() => setTeams(prev => [...prev, { name: mn ? `Баг ${prev.length + 1}` : `Team ${prev.length + 1}`, members: '' }])}
              className="px-3 py-1.5 rounded-xl border border-violet-400 text-xs font-bold text-violet-800 dark:text-violet-200"
            >
              {mn ? '+ Баг нэмэх' : '+ Add a team'}
            </button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">{mn ? 'Асуултын тоо' : 'Questions'}</div>
              <div className="flex gap-2">
                {COUNTS.map(c => (
                  <button
                    key={c}
                    onClick={() => setCount(c)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold border ${count === c ? 'bg-violet-600 text-white border-violet-600' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">{mn ? 'Нэг асуултын хугацаа' : 'Time per question'}</div>
              <div className="flex gap-2">
                {LIMITS.map(s => (
                  <button
                    key={s}
                    onClick={() => setLimitSec(s)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold border ${limitSec === s ? 'bg-violet-600 text-white border-violet-600' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
                  >
                    {s}s
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={start}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 text-white text-sm font-black shadow-md"
            >
              {mn ? 'Тоглолтыг эхлүүлэх →' : 'Start the game →'}
            </button>
            <button onClick={onBack} className="text-xs font-bold text-slate-600 dark:text-slate-300">
              {mn ? 'Буцах' : 'Back'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------ play
  if (phase === 'play') {
    const current = deck[q];
    const left = Math.max(0, 1 - elapsed / limitMs);
    const answered = players.filter(p => answers[q]?.[p.id]).length;
    const correctLetter = LETTERS[current.choices.findIndex(c => c.isCorrect)];
    return (
      <div className="space-y-4 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>
            {mn ? 'Асуулт' : 'Question'} {q + 1} / {deck.length}
          </span>
          <span className="font-mono">
            {answered} / {players.length} {mn ? 'хариулсан' : 'answered'}
          </span>
        </div>

        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-100" style={{ width: `${left * 100}%` }} />
        </div>
        <div className="text-right text-xs font-mono text-slate-500">{Math.ceil((limitMs - elapsed) / 1000)}s</div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-lg font-bold text-slate-900 dark:text-white">
          <ChemText>{mn ? current.promptMn : current.promptEn}</ChemText>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {current.choices.map((c, i) => (
            <div
              key={c.key}
              className={`p-4 rounded-2xl font-bold text-sm min-h-[4rem] flex items-center justify-between ${TILE[i].cls} ${
                revealed && c.isCorrect ? 'ring-4 ring-white' : revealed ? 'opacity-40' : ''
              }`}
            >
              <span>
                <ChemText>{mn ? c.textMn : c.textEn}</ChemText>
              </span>
              <span aria-hidden="true">{TILE[i].shape}</span>
            </div>
          ))}
        </div>

        <div className={CARD.replace('space-y-4', 'space-y-2')}>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {mn ? 'Тоглогчдын хариулт' : 'Player answers'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {players.map(p => {
              const a = answers[q]?.[p.id];
              return (
                <div key={p.id} className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                    <span className={`w-2.5 h-2.5 rounded-full ${TEAM_DOT[p.team]}`} />
                    {p.name}
                    <span className="text-[11px] font-normal text-slate-500">{teams[p.team]?.name}</span>
                  </span>
                  <div className="flex gap-1">
                    {LETTERS.map((L, i) => (
                      <button
                        key={L}
                        disabled={revealed || !!a}
                        onClick={() => choose(p.id, L)}
                        className={`w-8 h-8 rounded-lg text-xs font-black ${TILE[i].cls} ${
                          a?.letter === L ? 'ring-2 ring-slate-900 dark:ring-white' : ''
                        } disabled:opacity-40`}
                      >
                        {L}
                      </button>
                    ))}
                  </div>
                  {revealed && (
                    <span className={`w-full text-xs font-bold ${a?.correct ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {!a ? (mn ? '— хариулаагүй' : '— no answer') : a.correct ? `✓ +${a.points}` : '✗ 0'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black"
            >
              {mn ? 'Үр дүнг харуулах' : 'Show the result'}
            </button>
          ) : (
            <>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                {mn ? 'Зөв хариу:' : 'Correct:'} {correctLetter}
              </span>
              <button onClick={nextQuestion} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-black">
                {q + 1 >= deck.length ? (mn ? 'Дүн харах →' : 'See the results →') : mn ? 'Дараагийн асуулт →' : 'Next question →'}
              </button>
            </>
          )}
        </div>

        <div className={CARD.replace('space-y-4', 'space-y-2')}>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {mn ? 'Багуудын оноо (одоогоор)' : 'Team points so far'}
          </div>
          {teams.map((t, ti) => (
            <div key={ti} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <span className={`w-2.5 h-2.5 rounded-full ${TEAM_DOT[ti]}`} />
                {t.name}
              </span>
              <span className="font-mono font-black text-slate-900 dark:text-white">{teamPoints(ti)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------ final results
  const rankedTeams = teams
    .map((t, ti) => ({ ti, name: t.name, points: teamPoints(ti), members: players.filter(p => p.team === ti) }))
    .sort((a, b) => b.points - a.points);
  const rankedPlayers = players
    .map(p => ({ p, s: playerStats(p) }))
    .sort((a, b) => b.s.points - a.s.points);
  const podium = ['🥇', '🥈', '🥉'];

  return (
    <div className="space-y-6 pb-20">
      <div className={CARD}>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{mn ? 'Багуудын байр' : 'Team ranking'}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {rankedTeams.map((t, i) => {
            const accuracy = t.members.length && deck.length
              ? Math.round(
                  (t.members.reduce((n, p) => n + playerStats(p).correct, 0) / (t.members.length * deck.length)) * 100
                )
              : 0;
            return (
              <div key={t.ti} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="text-2xl">{podium[i] ?? `${i + 1}.`}</div>
                <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white">
                  <span className={`w-2.5 h-2.5 rounded-full ${TEAM_DOT[t.ti]}`} />
                  {t.name}
                </div>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">{t.points}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {mn ? 'Нарийвчлал' : 'Accuracy'} {accuracy}% · {t.members.length} {mn ? 'гишүүн' : 'members'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={CARD}>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {mn ? 'Тоглогч бүрийн үр дүн' : 'Each player'}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase text-slate-500 dark:text-slate-400">
              <tr>
                <th className="text-left py-2">#</th>
                <th className="text-left py-2">{mn ? 'Тоглогч' : 'Player'}</th>
                <th className="text-right py-2">{mn ? 'Оноо' : 'Points'}</th>
                <th className="text-right py-2">{mn ? 'Зөв' : 'Right'}</th>
                <th className="text-right py-2">{mn ? 'Нарийвчлал' : 'Accuracy'}</th>
                <th className="text-right py-2">{mn ? 'Дундаж хугацаа' : 'Avg time'}</th>
                <th className="text-right py-2">{mn ? 'Дараалал' : 'Best run'}</th>
              </tr>
            </thead>
            <tbody>
              {rankedPlayers.map(({ p, s }, i) => (
                <tr key={p.id} className="border-t border-slate-200 dark:border-slate-800 font-mono">
                  <td className="py-2 text-slate-500">{i + 1}</td>
                  <td className="py-2 font-sans font-bold text-slate-900 dark:text-white">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${TEAM_DOT[p.team]}`} />
                    {p.name}
                  </td>
                  <td className="py-2 text-right font-black text-slate-900 dark:text-white">{s.points}</td>
                  <td className="py-2 text-right">
                    {s.correct} / {deck.length}
                  </td>
                  <td className="py-2 text-right">{s.accuracy}%</td>
                  <td className="py-2 text-right">{s.correct ? `${s.avgSec.toFixed(1)}s` : '—'}</td>
                  <td className="py-2 text-right">{s.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => setPhase('setup')} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-black">
          {mn ? 'Дахин тоглох' : 'Play again'}
        </button>
        <button onClick={onBack} className="text-xs font-bold text-slate-600 dark:text-slate-300">
          {mn ? 'Буцах' : 'Back'}
        </button>
      </div>
    </div>
  );
};
