import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { CAMBRIDGE_PAST_PAPERS_2017_2024 } from '../data/pastPapersData';
import { ALEVEL_GLOSSARY } from '../data/alevelGlossary';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { useApp } from '../context/AppContext';
import { ExamQuestion } from '../types/chemistry';
import { ChemText } from './common/ChemText';
import { Gamepad2, Heart, Flame, Zap, Trophy, Timer, Scissors, RotateCcw, Play } from 'lucide-react';

type Mode = 'classic' | 'streak' | 'survival';
type Phase = 'setup' | 'question' | 'feedback' | 'results';

interface Choice {
  key: string;
  textEn: string;
  textMn: string;
  isCorrect: boolean;
  reasonEn?: string;
  reasonMn?: string;
}

interface GameItem {
  id: string;
  chapterId: string;
  syllabusRef: string;
  promptEn: string;
  promptMn: string;
  choices: Choice[];
}

interface ScoreEntry {
  name: string;
  mode: Mode;
  score: number;
  correct: number;
  total: number;
  date: number;
}

interface VocabTerm {
  chapterId: string;
  syllabusRef: string;
  termEn: string;
  termMn: string;
  definitionEn: string;
  definitionMn: string;
}

const SCORE_KEY = 'chem_cambridge_game_scores';
const NAME_KEY = 'chem_cambridge_game_name';

// Kahoot-style answer tiles: colour and shape per answer slot
const TILE_STYLE = [
  { shape: '▲', cls: 'bg-red-500 hover:bg-red-600 text-white' },
  { shape: '◆', cls: 'bg-blue-500 hover:bg-blue-600 text-white' },
  { shape: '●', cls: 'bg-amber-400 hover:bg-amber-500 text-slate-900' },
  { shape: '■', cls: 'bg-emerald-500 hover:bg-emerald-600 text-white' }
];

const shuffle = <T,>(items: T[]): T[] => {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const readScores = (): ScoreEntry[] => {
  try {
    const raw = localStorage.getItem(SCORE_KEY);
    return raw ? (JSON.parse(raw) as ScoreEntry[]) : [];
  } catch {
    return [];
  }
};

const writeScores = (entries: ScoreEntry[]) => {
  try {
    localStorage.setItem(SCORE_KEY, JSON.stringify(entries));
  } catch {
    // Storage can be blocked (private window); the game still works without a leaderboard
  }
};

const readName = (): string => {
  try {
    return localStorage.getItem(NAME_KEY) ?? '';
  } catch {
    return '';
  }
};

// Multiple-choice questions from the syllabus and past papers
const MCQ_SOURCE: ExamQuestion[] = (() => {
  const map = new Map<string, ExamQuestion>();
  [...CURRICULUM_CHAPTERS.flatMap(c => c.topics.flatMap(t => t.questions)), ...CAMBRIDGE_PAST_PAPERS_2017_2024].forEach(q => {
    if (!map.has(q.id)) map.set(q.id, q);
  });
  return Array.from(map.values()).filter(q => q.type === 'mcq' && !!q.options && q.options.length >= 2 && !!q.correctOption);
})();

// Vocabulary terms with their definitions, de-duplicated by English name
const VOCAB_TERMS: VocabTerm[] = (() => {
  const seen = new Map<string, VocabTerm>();
  CURRICULUM_CHAPTERS.forEach(c =>
    c.topics.forEach(t =>
      t.vocabulary.forEach(v => {
        const key = v.termEn.trim().toLowerCase();
        if (!seen.has(key)) {
          seen.set(key, {
            chapterId: c.id,
            syllabusRef: t.syllabusRef,
            termEn: v.termEn,
            termMn: v.termMn,
            definitionEn: v.definitionEn,
            definitionMn: v.definitionMn
          });
        }
      })
    )
  );
  return Array.from(seen.values());
})();

// Builds a shuffled deck: MCQs plus "definition → term" questions, with shuffled answer order
const buildDeck = (chapterId: string, count: number): GameItem[] => {
  const inChapter = (id: string) => chapterId === 'all' || id === chapterId;

  const mcqItems: GameItem[] = MCQ_SOURCE.filter(q => inChapter(q.chapterId)).map(q => ({
    id: `mcq-${q.id}`,
    chapterId: q.chapterId,
    syllabusRef: q.syllabusRef,
    promptEn: q.questionTextEn,
    promptMn: q.questionTextMn,
    choices: (q.options ?? []).map(o => ({
      key: o.id,
      textEn: o.textEn,
      textMn: o.textMn,
      isCorrect: o.id === q.correctOption,
      reasonEn: o.rationaleEn,
      reasonMn: o.rationaleMn
    }))
  }));

  const vocabItems: GameItem[] = VOCAB_TERMS.filter(v => inChapter(v.chapterId)).map(term => {
    const sameChapter = shuffle(VOCAB_TERMS.filter(o => o.termEn !== term.termEn && o.chapterId === term.chapterId));
    const others = shuffle(VOCAB_TERMS.filter(o => o.termEn !== term.termEn && o.chapterId !== term.chapterId));
    const distractors = [...sameChapter, ...others].slice(0, 3);
    const options = [term, ...distractors].map((o, i) => ({
      key: `v${i}`,
      textEn: o.termEn,
      textMn: o.termMn,
      isCorrect: o === term,
      reasonEn: o === term ? term.definitionEn : undefined,
      reasonMn: o === term ? term.definitionMn : undefined
    }));
    return {
      id: `vocab-${term.termEn}`,
      chapterId: term.chapterId,
      syllabusRef: term.syllabusRef,
      promptEn: term.definitionEn,
      promptMn: term.definitionMn,
      choices: options
    };
  });

  return shuffle([...mcqItems, ...vocabItems])
    .slice(0, count)
    .map(item => ({ ...item, choices: shuffle(item.choices) }));
};

// The 9701 key-term game: each glossary term of the chosen chapters is shown by its definition, and the student picks the term.
// The other choices are terms of the same chapter first, so the game tests the chapter, not random words.
const FOCUS_KEY = 'chem_game_focus';

// The chapter the key-term checklist asked for ("Тоглож цээжлэх"), if any
const readFocus = (): string | null => {
  try {
    return localStorage.getItem(FOCUS_KEY);
  } catch {
    return null;
  }
};

const buildKeyTermDeck = (chapterId: string, count: number): GameItem[] => {
  const chapters = chapterId === 'all' ? Object.keys(ALEVEL_GLOSSARY) : [chapterId];
  const entries = chapters.flatMap(id => (ALEVEL_GLOSSARY[id] ?? []).map(entry => ({ chapterId: id, entry })));
  const items: GameItem[] = entries.map(current => {
    const sameChapter = shuffle(entries.filter(o => o !== current && o.chapterId === current.chapterId));
    const others = shuffle(entries.filter(o => o !== current && o.chapterId !== current.chapterId));
    const distractors = [...sameChapter, ...others].slice(0, 3);
    const options = [current, ...distractors].map((o, i) => ({
      key: `k${i}`,
      textEn: o.entry.term.en,
      textMn: o.entry.term.mn,
      isCorrect: o === current
    }));
    return {
      id: `key-${current.chapterId}-${current.entry.term.en}`,
      chapterId: current.chapterId,
      syllabusRef: current.chapterId,
      promptEn: current.entry.def.en,
      promptMn: current.entry.def.mn,
      choices: options
    };
  });
  return shuffle(items)
    .slice(0, count)
    .map(item => ({ ...item, choices: shuffle(item.choices) }));
};

export const GameArenaView: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  // The course chosen for the whole app: 9701 plays its key terms, 0620 plays its questions and vocabulary
  const { programme } = useApp();
  const alevel = programme === 'alevel';

  const [phase, setPhase] = useState<Phase>('setup');
  const [gameMode, setGameMode] = useState<Mode>('classic');
  // A chapter asked for from the key-term checklist opens here; the request is used once
  const [chapterId, setChapterId] = useState<string>(() => readFocus() ?? 'all');
  useEffect(() => {
    try {
      localStorage.removeItem(FOCUS_KEY);
    } catch {
      // Storage can be blocked; the chapter then stays as the student set it
    }
  }, []);
  const [count, setCount] = useState<number>(10);
  const [limitSec, setLimitSec] = useState<number>(15);
  const [nickname, setNickname] = useState<string>(readName);
  const [deck, setDeck] = useState<GameItem[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const [hidden, setHidden] = useState<string[]>([]);
  const [fiftyLeft, setFiftyLeft] = useState<boolean>(true);
  const [picked, setPicked] = useState<string | null>(null);
  const [lastGain, setLastGain] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);
  const [scores, setScores] = useState<ScoreEntry[]>(readScores);

  const qStart = useRef<number>(0);
  const savedRef = useRef<boolean>(false);

  const current = deck[index];
  const limitMs = limitSec * 1000;

  // A 9701 chapter only in 9701, an IGCSE topic only in 0620; otherwise the game falls back to all topics
  const isAlevelChapter = (id: string) => id.startsWith('al-');
  const chapter = alevel
    ? chapterId === 'all' || isAlevelChapter(chapterId) ? chapterId : 'all'
    : isAlevelChapter(chapterId) ? 'all' : chapterId;
  const makeDeck = (id: string, n: number) => (alevel ? buildKeyTermDeck(id, n) : buildDeck(id, n));

  // Keep the name for next time (per-viewer convenience only)
  useEffect(() => {
    try {
      localStorage.setItem(NAME_KEY, nickname);
    } catch {
      // ignore
    }
  }, [nickname]);

  const resolve = (key: string | null) => {
    if (phase !== 'question' || !current) return;
    const took = Math.min(Date.now() - qStart.current, limitMs);
    const choice = current.choices.find(c => c.key === key);
    const isRight = !!choice?.isCorrect;
    const newStreak = isRight ? streak + 1 : 0;

    let gain = 0;
    if (isRight) {
      // Faster answers score more: 1000 at once, 500 at the time limit
      const speed = 1 - (took / limitMs) * 0.5;
      // Streak Rush multiplies points by up to 3x for a long run of correct answers
      const boost = gameMode === 'streak' ? 1 + Math.min(newStreak, 5) * 0.4 : 1;
      gain = Math.round(1000 * speed * boost);
    }

    setPicked(key);
    setLastGain(gain);
    setScore(s => s + gain);
    setCorrect(c => c + (isRight ? 1 : 0));
    setStreak(newStreak);
    setBestStreak(b => Math.max(b, newStreak));
    if (gameMode === 'survival' && !isRight) setHearts(h => Math.max(0, h - 1));
    setPhase('feedback');
  };

  // The timer reads the latest resolver so it never acts on stale state
  const resolveRef = useRef(resolve);
  resolveRef.current = resolve;

  // Per-question countdown: ticks every 100 ms and counts a timeout as a wrong answer
  useEffect(() => {
    if (phase !== 'question') return;
    const id = window.setInterval(() => {
      const e = Date.now() - qStart.current;
      setElapsed(e);
      if (e >= limitMs) resolveRef.current(null);
    }, 100);
    return () => window.clearInterval(id);
  }, [phase, limitMs, index]);

  // Keyboard shortcuts 1–4 pick answers
  useEffect(() => {
    if (phase !== 'question' || !current) return;
    const onKey = (e: KeyboardEvent) => {
      const i = ['1', '2', '3', '4'].indexOf(e.key);
      if (i < 0) return;
      const c = current.choices[i];
      if (c && !hidden.includes(c.key)) resolveRef.current(c.key);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, current, hidden]);

  // Record the finished game once
  useEffect(() => {
    if (phase !== 'results' || savedRef.current) return;
    savedRef.current = true;
    const entry: ScoreEntry = {
      name: nickname.trim() || (mn ? 'Зочин' : 'Guest'),
      mode: gameMode,
      score,
      correct,
      total: deck.length,
      date: Date.now()
    };
    const next = [entry, ...scores].slice(0, 50);
    setScores(next);
    writeScores(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const startGame = () => {
    const items = makeDeck(chapter, count);
    if (items.length === 0) return;
    setDeck(items);
    setIndex(0);
    setScore(0);
    setCorrect(0);
    setStreak(0);
    setBestStreak(0);
    setHearts(3);
    setHidden([]);
    setFiftyLeft(true);
    setPicked(null);
    setElapsed(0);
    qStart.current = Date.now();
    savedRef.current = false;
    setPhase('question');
  };

  const nextQuestion = () => {
    const over = index + 1 >= deck.length || (gameMode === 'survival' && hearts <= 0);
    if (over) {
      setPhase('results');
      return;
    }
    setIndex(i => i + 1);
    setPicked(null);
    setHidden([]);
    setElapsed(0);
    qStart.current = Date.now();
    setPhase('question');
  };

  // 50/50 power-up: hides two wrong answers (once per game)
  const useFifty = () => {
    if (!fiftyLeft || phase !== 'question' || !current) return;
    const wrong = current.choices.filter(c => !c.isCorrect && !hidden.includes(c.key));
    const toHide = shuffle(wrong).slice(0, 2).map(c => c.key);
    setHidden(prev => [...prev, ...toHide]);
    setFiftyLeft(false);
  };

  const modeInfo: { id: Mode; icon: React.ReactNode; titleEn: string; titleMn: string; descEn: string; descMn: string }[] = [
    {
      id: 'classic',
      icon: <Zap className="w-5 h-5" />,
      titleEn: 'Classic',
      titleMn: 'Классик',
      descEn: 'The faster you answer, the more points you get (up to 1000).',
      descMn: 'Хурдан хариулах тусам илүү оноо авна (хамгийн ихдээ 1000).'
    },
    {
      id: 'streak',
      icon: <Flame className="w-5 h-5" />,
      titleEn: 'Streak Rush',
      titleMn: 'Дараалал',
      descEn: 'Chain correct answers to multiply your points, up to 3×.',
      descMn: 'Зөв хариултуудаа дараалуулан оноогоо 3 дахин хүртэл нэмэгдүүл.'
    },
    {
      id: 'survival',
      icon: <Heart className="w-5 h-5" />,
      titleEn: 'Survival',
      titleMn: 'Амьд үлдэх',
      descEn: 'You have 3 hearts. A wrong answer or a timeout costs one.',
      descMn: 'Танд 3 зүрх бий. Буруу хариулт эсвэл цаг дуусвал нэг зүрх алдана.'
    }
  ];

  const topScores = [...scores].sort((a, b) => b.score - a.score).slice(0, 5);
  const accuracy = deck.length ? Math.round((correct / deck.length) * 100) : 0;
  const timeLeftPct = Math.max(0, 1 - elapsed / limitMs) * 100;

  // ------------------------------------------------------------------ setup
  if (phase === 'setup') {
    const available = makeDeck(chapter, 1000).length;
    return (
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Gamepad2 className="w-7 h-7" />
            {mn ? 'Химийн тоглоомын арена' : 'Chemistry Game Arena'}
          </h2>
          <p className="text-sm text-white/90 mt-2 max-w-2xl">
            {mn
              ? 'Хичээлийн асуултууд, үг цээжлэх карт тоглоом шиг хурдан, хөгжилтэйгээр. Хариултаа таваар сонгоод оноогоо өсгө!'
              : 'Syllabus questions and vocabulary turned into a fast, fun quiz. Pick your answer and climb the leaderboard!'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-1.5 block">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{mn ? 'Таны нэр (онооны самбарт)' : 'Your nickname (for the leaderboard)'}</span>
              <input
                value={nickname}
                maxLength={20}
                onChange={e => setNickname(e.target.value)}
                placeholder={mn ? 'Жишээ: Бат' : 'e.g. Sam'}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
              />
            </label>
            <label className="space-y-1.5 block">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{mn ? 'Сэдэв' : 'Topic'}</span>
              <select
                value={chapter}
                onChange={e => setChapterId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
              >
                <option value="all">{mn ? 'Бүх сэдэв' : 'All topics'}</option>
                {(alevel ? ALEVEL_CHAPTERS : CURRICULUM_CHAPTERS).map(c => (
                  <option key={c.id} value={c.id}>
                    {c.number}. {mn ? c.titleMn : c.titleEn}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">{mn ? 'Тоглоомын горим' : 'Game mode'}</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {modeInfo.map(m => (
                <button
                  key={m.id}
                  onClick={() => setGameMode(m.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all ${
                    gameMode === m.id
                      ? 'border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-950/40 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 text-fuchsia-700 dark:text-fuchsia-300 font-black">
                    {m.icon}
                    {mn ? m.titleMn : m.titleEn}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5">{mn ? m.descMn : m.descEn}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">{mn ? 'Асуултын тоо' : 'Questions'}</div>
              <div className="flex gap-2">
                {[5, 10, 15].map(n => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`flex-1 py-2 rounded-xl text-sm font-black border-2 ${count === n ? 'border-violet-500 bg-violet-600 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">{mn ? 'Нэг асуултын хугацаа' : 'Time per question'}</div>
              <div className="flex gap-2">
                {[10, 15, 20].map(s => (
                  <button
                    key={s}
                    onClick={() => setLimitSec(s)}
                    className={`flex-1 py-2 rounded-xl text-sm font-black border-2 ${limitSec === s ? 'border-violet-500 bg-violet-600 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
                  >
                    {s}s
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={startGame}
              disabled={available === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-rose-500 hover:brightness-110 disabled:opacity-40 text-white font-black shadow-md"
            >
              <Play className="w-5 h-5" />
              {mn ? 'Тоглоом эхлүүлэх' : 'Start game'}
            </button>
            <span className="text-xs text-slate-500">
              {mn ? `Боломжит асуулт: ${available}` : `Available questions: ${available}`}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-amber-500" />
            {mn ? 'Онооны самбар' : 'Leaderboard'}
          </h3>
          {topScores.length === 0 ? (
            <p className="text-xs text-slate-500">{mn ? 'Одоохондоо оноо алга. Эхний тоглолтоо хийгээрэй!' : 'No scores yet. Play your first game!'}</p>
          ) : (
            <ol className="space-y-2">
              {topScores.map((s, i) => (
                <li key={`${s.date}-${i}`} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black bg-amber-400 text-slate-900">{i + 1}</span>
                  <span className="flex-1 text-sm font-bold text-slate-900 dark:text-white truncate">{s.name}</span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {s.correct}/{s.total}
                  </span>
                  <span className="text-sm font-black font-mono text-fuchsia-700 dark:text-fuchsia-300">{s.score}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- results
  if (phase === 'results') {
    const verdict =
      accuracy >= 80
        ? mn ? 'Маш сайн! Та сэдвээ сайн мэдэж байна.' : 'Excellent! You know this material well.'
        : accuracy >= 50
          ? mn ? 'Сайн байна, үргэлжлүүлээрэй!' : 'Good work, keep going!'
          : mn ? 'Дахин оролдоод үзээрэй. Алдсан асуултуудаа Алдааны сангаас харна уу.' : 'Try again. Review missed questions in your Mistake Notebook.';
    return (
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white text-center shadow-lg">
          <Trophy className="w-12 h-12 mx-auto" />
          <div className="text-sm font-bold mt-2 opacity-90">{mn ? 'Нийт оноо' : 'Final score'}</div>
          <div className="text-5xl font-black">{score}</div>
          <div className="text-sm mt-2 font-semibold">{verdict}</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-[11px] font-bold text-slate-500">{mn ? 'Зөв' : 'Correct'}</div>
            <div className="text-xl font-black text-slate-900 dark:text-white">{correct}/{deck.length}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-[11px] font-bold text-slate-500">{mn ? 'Нарийвчлал' : 'Accuracy'}</div>
            <div className="text-xl font-black text-slate-900 dark:text-white">{accuracy}%</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-[11px] font-bold text-slate-500">{mn ? 'Хамгийн урт дараалал' : 'Best streak'}</div>
            <div className="text-xl font-black text-slate-900 dark:text-white">🔥 {bestStreak}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-black"
          >
            <RotateCcw className="w-4 h-4" />
            {mn ? 'Дахин тоглох' : 'Play again'}
          </button>
          <button
            onClick={() => setPhase('setup')}
            className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700"
          >
            {mn ? 'Тохиргоо руу' : 'Back to setup'}
          </button>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------- question/feedback
  if (!current) return null;
  const isFeedback = phase === 'feedback';
  const correctChoice = current.choices.find(c => c.isCorrect);
  const wasRight = isFeedback && picked !== null && picked === correctChoice?.key;
  const isLast = index + 1 >= deck.length || (gameMode === 'survival' && hearts <= 0);

  return (
    <div className="space-y-4 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 shadow-sm">
        <div className="text-xs font-black text-slate-600 dark:text-slate-300">
          {mn ? 'Асуулт' : 'Question'} {index + 1}/{deck.length}
        </div>
        <div className="flex items-center gap-4 text-sm font-black">
          <span className="text-fuchsia-700 dark:text-fuchsia-300">{score}</span>
          <span className="flex items-center gap-1 text-orange-600">
            <Flame className="w-4 h-4" />
            {streak}
          </span>
          {gameMode === 'survival' && (
            <span className="flex items-center gap-0.5 text-rose-600">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart key={i} className={`w-4 h-4 ${i < hearts ? 'fill-rose-500' : 'opacity-25'}`} />
              ))}
            </span>
          )}
        </div>
        <button
          onClick={useFifty}
          disabled={!fiftyLeft || isFeedback}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-violet-100 dark:bg-violet-950/50 text-violet-800 dark:text-violet-200 disabled:opacity-40"
        >
          <Scissors className="w-3.5 h-3.5" />
          50/50
        </button>
      </div>

      <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full transition-[width] duration-100 ${timeLeftPct < 30 ? 'bg-rose-500' : 'bg-emerald-500'}`}
          style={{ width: isFeedback ? '0%' : `${timeLeftPct}%` }}
        />
      </div>
      {!isFeedback && (
        <div className="flex items-center justify-end gap-1 text-xs font-mono text-slate-500">
          <Timer className="w-3.5 h-3.5" />
          {Math.max(0, Math.ceil((limitMs - elapsed) / 1000))}s
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-sm min-h-[8rem] flex flex-col items-center justify-center">
        <div className="text-[11px] font-mono text-slate-400 mb-2">{current.syllabusRef}</div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
          <ChemText>{mn ? current.promptMn : current.promptEn}</ChemText>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {current.choices.map((c, i) => {
          const style = TILE_STYLE[i] ?? TILE_STYLE[0];
          const isHidden = hidden.includes(c.key);
          const isThePick = picked === c.key;
          const ring = isFeedback && c.isCorrect ? 'ring-4 ring-white dark:ring-slate-900 outline outline-4 outline-emerald-400' : '';
          const dim = isFeedback && !c.isCorrect ? 'opacity-50' : '';
          return (
            <button
              key={c.key}
              disabled={isFeedback || isHidden}
              onClick={() => resolve(c.key)}
              className={`relative min-h-[5.5rem] rounded-2xl px-5 py-4 text-left font-bold text-base shadow-md transition-all disabled:cursor-default ${style.cls} ${ring} ${dim} ${
                isHidden ? 'invisible' : ''
              } ${isThePick && !c.isCorrect ? 'grayscale' : ''}`}
            >
              <span className="absolute top-3 right-4 text-xl opacity-80">{style.shape}</span>
              <span className="block pr-8">
                <ChemText>{mn ? c.textMn : c.textEn}</ChemText>
              </span>
              {!isFeedback && <span className="absolute bottom-2 right-3 text-[10px] font-mono opacity-70">{i + 1}</span>}
            </button>
          );
        })}
      </div>

      {isFeedback && (
        <div
          className={`rounded-2xl p-4 border-2 space-y-2 ${
            wasRight
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400'
          }`}
        >
          <div className="text-lg font-black text-slate-900 dark:text-white">
            {picked === null
              ? mn ? '⏰ Цаг дууслаа' : "⏰ Time's up"
              : wasRight
                ? mn ? `✅ Зөв! +${lastGain}` : `✅ Correct! +${lastGain}`
                : mn ? '❌ Буруу' : '❌ Not quite'}
          </div>
          {correctChoice && (
            <div className="text-sm text-slate-700 dark:text-slate-300">
              {mn ? 'Зөв хариулт: ' : 'Correct answer: '}
              <strong>
                <ChemText>{mn ? correctChoice.textMn : correctChoice.textEn}</ChemText>
              </strong>
            </div>
          )}
          {(mn ? correctChoice?.reasonMn : correctChoice?.reasonEn) && (
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <ChemText>{mn ? correctChoice?.reasonMn ?? '' : correctChoice?.reasonEn ?? ''}</ChemText>
            </div>
          )}
          <button
            onClick={nextQuestion}
            className="mt-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-fuchsia-600 text-white text-sm font-black"
          >
            {isLast ? (mn ? 'Үр дүн харах' : 'See results') : mn ? 'Дараагийн асуулт' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  );
};
