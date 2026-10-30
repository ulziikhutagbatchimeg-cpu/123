import React, { useRef, useState } from 'react';
import { Lock } from 'lucide-react';
import type { Bi, StatesLesson } from '../data/statesLessons';
import type { GlossaryTerm, PracticeItem } from '../data/statesLessonSupport';
import { cambridgeGrade } from '../lib/grade';
import { recordActivity } from '../lib/activity';
import { useApp } from '../context/AppContext';
import { lessonSlides, lessonStepParts, slideRangeLabel } from '../data/chapterSlides';
import { StatesGlossary } from './StatesGlossary';
import { Block, ExitTest, PracticeSet, PredictionBox } from './InteractiveChapterOne';
import { LessonCelebration } from './LessonCelebration';

// A chapter taught as a series of 40-minute lessons, laid out as the IGCSE chapter 1 lessons: a lesson picker, exit-ticket
// tiles, the key words, five steps with their slides, the practice and the exit ticket. Used for every chapter with a deck.
const CARD = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4';
const HEADING = 'text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono';
export const UNLOCK_ABOVE = 60;

// An interactive shown inside one step of a lesson (for example the periodic-trends card in the radius step)
export interface LessonWidget {
  step: number; // the 0-based step the widget sits in
  component: React.ComponentType;
}

export interface LessonSeriesData {
  chapterId: string;
  eyebrow: Bi;
  title: Bi;
  storageKey: string; // where the exit-ticket scores are kept on this browser
  lessons: StatesLesson[];
  glossary: Record<string, GlossaryTerm[]>;
  practice: Record<string, PracticeItem[]>;
  widgets?: Record<string, LessonWidget>; // keyed by lesson id
}

export const readScores = (key: string): Record<string, number> => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
};

const writeScores = (key: string, scores: Record<string, number>) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(scores));
  } catch {
    // Storage can be blocked; the scores then last only for this visit
  }
};

// level: a Core student sees the Core lessons only; an Extended student sees every lesson
// isOpen decides which lessons the student may open (the curriculum works out the course order); onNext moves the student on
// to the next chapter once the last lesson of this one is passed
export const LessonSeries: React.FC<{
  data: LessonSeriesData;
  mn: boolean;
  level?: 'core' | 'extended';
  isOpen?: (lessonId: string) => boolean;
  onNext?: () => void;
}> = ({ data, mn, level = 'extended', isOpen, onNext }) => {
  const { chapterId, eyebrow, title, storageKey, glossary, practice, widgets } = data;
  const lessons = data.lessons.filter(l => level === 'extended' || l.tier !== 'extended');
  const { courseChoice } = useApp();
  const [active, setActive] = useState(0);
  const [block, setBlock] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>(() => readScores(storageKey));
  // Counts the lessons passed in this view, so each pass shows the celebration once
  const [celebrate, setCelebrate] = useState(0);
  const stepTopRef = useRef<HTMLDivElement>(null);
  // Every lesson of this chapter is Extended and the student is on the Core track: nothing to show
  if (lessons.length === 0) return null;

  // A lesson opens after the one before it has an exit-ticket score above UNLOCK_ABOVE
  // AS 9701 is open to every student for the test, so every lesson opens without passing the one before
  const unlocked = (index: number) => {
    if (isOpen) return isOpen(lessons[index].id);
    return courseChoice === 'as' || index === 0 || (scores[lessons[index - 1].id] ?? -1) > UNLOCK_ABOVE;
  };
  const lesson = lessons[active];
  const widget = widgets?.[lesson.id];
  // Each step shows the slides the lesson names for it; otherwise the lesson's slides are shared out over its steps
  // in proportion to the minutes of each step
  const stepMinutes = lesson.steps.map(s => s.to - s.from);
  const lessonParts = lessonSlides(chapterId, lesson.number);
  const stepParts =
    lesson.stepSlides && lessonParts.length > 0
      ? lesson.stepSlides.map(runs => runs.map(([from, to]) => ({ deck: lessonParts[0].deck, from, to })))
      : lessonStepParts(lessonParts, stepMinutes);

  const chooseLesson = (index: number) => {
    if (!unlocked(index)) return;
    setActive(index);
    setBlock(0);
    setNotice(null);
  };

  const goBlock = (index: number) => {
    setBlock(index);
    stepTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Records the exit-ticket score of this lesson, and says which lesson opened
  const submitExit = (percent: number) => {
    const next = { ...scores, [lesson.id]: percent };
    setScores(next);
    writeScores(storageKey, next);
    recordActivity({
      kind: 'exit',
      course: courseChoice,
      percent,
      label: { en: `Lesson ${lesson.number} · ${lesson.title.en}`, mn: `${lesson.number}-р хичээл · ${lesson.title.mn}` }
    });
    if (percent > UNLOCK_ABOVE) setCelebrate(c => c + 1);
    if (percent <= UNLOCK_ABOVE) return;
    const grade = cambridgeGrade(percent);
    if (active + 1 < lessons.length) {
      const following = lessons[active + 1].number;
      // The next lesson is open now, so the student moves on to it
      setActive(active + 1);
      setBlock(0);
      setNotice(
        mn
          ? `${lesson.number}-р хичээл: ${grade.num} (${grade.letter}). ${following}-р хичээл нээгдлээ.`
          : `Lesson ${lesson.number}: ${grade.num} (${grade.letter}). Lesson ${following} is open.`
      );
    } else {
      // The last lesson of this chapter: the first lesson of the next chapter is open now
      onNext?.();
      setNotice(mn ? `Бүх хичээлийг дуусгалаа: ${grade.num} (${grade.letter}).` : `All lessons completed: ${grade.num} (${grade.letter}).`);
    }
  };

  const tone = (score: number | undefined) =>
    score === undefined
      ? 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
      : score > UNLOCK_ABOVE
        ? 'border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
        : 'border-rose-400 bg-rose-50/60 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300';

  return (
    <div className="space-y-5">
      {celebrate > 0 && <LessonCelebration key={celebrate} mn={mn} />}
      <div className={CARD}>
        <div className="space-y-1">
          <div className={HEADING}>{mn ? eyebrow.mn : eyebrow.en}</div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">{mn ? title.mn : title.en}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {lessons.map((l, i) => {
            const open = unlocked(i);
            return (
              <button
                key={l.id}
                onClick={() => chooseLesson(i)}
                disabled={!open}
                aria-pressed={active === i}
                className={`flex items-start gap-2 p-3 rounded-xl border text-left transition-colors ${
                  active === i
                    ? 'bg-violet-600 text-white border-violet-600'
                    : open
                      ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-violet-500'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                {!open && <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden />}
                <span className="min-w-0 space-y-0.5">
                  <span className="block text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                    {mn ? `Хичээл ${l.number}` : `Lesson ${l.number}`}
                  </span>
                  <span className="block text-sm font-black leading-snug">{mn ? l.title.mn : l.title.en}</span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          {mn
            ? `Гарах билетийн оноо ${UNLOCK_ABOVE}%-иас дээш бол дараагийн хичээл нээгдэнэ.`
            : `An exit-ticket score above ${UNLOCK_ABOVE}% opens the next lesson.`}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {lessons.map(l => {
            const s = scores[l.id];
            const g = s === undefined ? null : cambridgeGrade(s);
            return (
              <div key={l.id} className={`p-2.5 rounded-xl border ${tone(s)}`}>
                <div className="text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                  {mn ? `Хичээл ${l.number}` : `Lesson ${l.number}`}
                </div>
                <div className="text-sm font-black">{g ? `${s}%` : '—'}</div>
                <div className="text-sm font-bold">{g ? `${g.num} (${g.letter})` : mn ? 'Өгөөгүй' : 'Not yet'}</div>
              </div>
            );
          })}
        </div>
        {notice && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-sm font-bold text-emerald-900 dark:text-emerald-200">
            {notice}
          </div>
        )}
      </div>

      <div className={CARD}>
        <div className="space-y-1">
          <div className={HEADING}>{mn ? `Хичээл ${lesson.number}` : `Lesson ${lesson.number}`}</div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">{mn ? lesson.title.mn : lesson.title.en}</h3>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? lesson.objective.mn : lesson.objective.en}</p>
        <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {lesson.keyPoints.map((k, i) => (
            <li key={i}>• {mn ? k.mn : k.en}</li>
          ))}
        </ul>
      </div>

      <div className={CARD}>
        <div className={HEADING}>{mn ? 'Түлхүүр үгийн сан (glossary)' : 'Key words glossary'}</div>
        {(glossary[lesson.id] ?? []).length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mn ? 'Энэ хичээлийн түлхүүр үг одоогоор бэлтгэгдээгүй байна.' : 'Key words for this lesson are not written yet.'}
          </p>
        ) : (
          <StatesGlossary key={lesson.id} items={glossary[lesson.id]} mn={mn} />
        )}
      </div>

      <div ref={stepTopRef} className={CARD}>
        <div className={HEADING}>{mn ? 'Алхам' : 'Step'}</div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {lesson.steps.map((s, i) => (
            <button
              key={i}
              onClick={() => goBlock(i)}
              aria-pressed={block === i}
              className={`p-2.5 rounded-xl border text-left transition-colors ${
                block === i
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
              }`}
            >
              <span className="block text-sm font-black">
                {i + 1} · {s.from}–{s.to} {mn ? 'мин' : 'min'}
              </span>
              <span className="block text-sm font-bold leading-snug">{mn ? s.title.mn : s.title.en}</span>
              <span className="block text-xs font-mono opacity-80">{slideRangeLabel(stepParts[i], mn)}</span>
            </button>
          ))}
        </div>
      </div>

      {lesson.steps.map((s, i) => (
        <Block
          key={`${lesson.id}-${i}`}
          show={block === i}
          no={i + 1}
          from={s.from}
          to={s.to}
          title={s.title}
          steps={[s]}
          mn={mn}
          slides={stepParts[i]}
        >
          {widget && widget.step === i && <widget.component />}
          {i === 0 && <PredictionBox key={lesson.id} mn={mn} />}
          {i === 3 && (
            <PracticeSet
              key={lesson.id}
              items={practice[lesson.id] ?? []}
              mn={mn}
              label={{ en: `Lesson ${lesson.number} · ${lesson.title.en}`, mn: `${lesson.number}-р хичээл · ${lesson.title.mn}` }}
            />
          )}
          {i === 4 && (
            <div className="space-y-3">
              <div className={HEADING}>{mn ? 'Гарах билет (үнэлгээ)' : 'Exit ticket (assessment)'}</div>
              <ExitTest key={lesson.id} items={lesson.quiz} mn={mn} onSubmit={submitExit} />
            </div>
          )}
        </Block>
      ))}

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => goBlock(Math.max(0, block - 1))}
          disabled={block === 0}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-200 disabled:opacity-40"
        >
          ← {mn ? 'Өмнөх алхам' : 'Previous step'}
        </button>
        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
          {block + 1} / {lesson.steps.length}
        </span>
        <button
          onClick={() => goBlock(Math.min(lesson.steps.length - 1, block + 1))}
          disabled={block === lesson.steps.length - 1}
          className="px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-sm font-black"
        >
          {mn ? 'Дараагийн алхам' : 'Next step'} →
        </button>
      </div>
    </div>
  );
};
