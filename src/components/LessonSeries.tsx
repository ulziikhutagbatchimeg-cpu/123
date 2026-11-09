import React, { useEffect, useRef, useState } from 'react';
import { PROGRESS_RESTORED } from '../lib/progressRestore';
import { Lock } from 'lucide-react';
import type { Bi, StatesLesson } from '../data/statesLessons';
import type { GlossaryTerm, PracticeItem } from '../data/statesLessonSupport';
import { cambridgeGrade } from '../lib/grade';
import { recordActivity } from '../lib/activity';
import { useApp } from '../context/AppContext';
import { lessonSlides, lessonStepParts, slideRangeLabel } from '../data/chapterSlides';
import { StatesGlossary } from './StatesGlossary';
import { Block, ExitTest, PracticeSet, PredictionBox } from './InteractiveChapterOne';
import { StepSticker } from './StepSticker';
import { LessonCelebration } from './LessonCelebration';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { useAuthUser } from '../lib/cloud';
import { pinLesson } from '../lib/notebook';
import { useStudyTime } from '../lib/studyTime';

// The lesson's code, for example Ch2 / L3: the chapter's number in the syllabus, then the lesson in that chapter
const lessonCode = (chapterId: string, lessonNumber: number): string => {
  const chapter = chapterId.startsWith('al-ch-')
    ? chapterId.slice('al-ch-'.length)
    : String(CURRICULUM_CHAPTERS.find(c => c.id === chapterId)?.number ?? '');
  return `Ch${chapter} / L${lessonNumber}`;
};

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
  // Pinning a lesson to the student's notebook, on the account
  const { user: pinUser } = useAuthUser();
  const [pinned, setPinned] = useState(false);
  const [pinning, setPinning] = useState(false);
  const [pinNote, setPinNote] = useState<string | null>(null);
  const lessons = data.lessons.filter(l => level === 'extended' || l.tier !== 'extended');
  const { courseChoice } = useApp();
  const [active, setActive] = useState(0);
  const [block, setBlock] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>(() => readScores(storageKey));
  // Scores read back from the student's account after sign-in (another device) are shown at once
  useEffect(() => {
    const again = () => setScores(readScores(storageKey));
    window.addEventListener(PROGRESS_RESTORED, again);
    return () => window.removeEventListener(PROGRESS_RESTORED, again);
  }, [storageKey]);
  // Counts the lessons passed in this view, so each pass shows the celebration once
  const [celebrate, setCelebrate] = useState(0);
  const stepTopRef = useRef<HTMLDivElement>(null);
  // The time with the lesson on show is counted for the teacher; this runs before the early return below
  useStudyTime({
    course: courseChoice,
    chapterId,
    lessonId: lessons[active]?.id ?? null,
    lessonTitle: lessons[active]?.title,
    enabled: lessons.length > 0
  });
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
      label: { en: lessonCode(chapterId, lesson.number), mn: lessonCode(chapterId, lesson.number) }
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
            // The lesson's own exit-ticket score sits under its title, so the score is read beside the lesson it belongs to
            const s = scores[l.id];
            const g = s === undefined ? null : cambridgeGrade(s);
            return (
              <button
                key={l.id}
                onClick={() => chooseLesson(i)}
                disabled={!open}
                aria-pressed={active === i}
                className={`flex items-start gap-2 px-2.5 py-2 rounded-xl border text-left transition-colors ${
                  active === i
                    ? 'bg-violet-600 text-white border-violet-600'
                    : open
                      ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-violet-500'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                {!open && <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden />}
                <span className="min-w-0 space-y-0.5">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wide opacity-80">
                    {mn ? `Хичээл ${l.number}` : `Lesson ${l.number}`}
                  </span>
                  <span className="block text-[13px] font-bold leading-snug">{mn ? l.title.mn : l.title.en}</span>
                  <span
                    className={`block pt-0.5 font-mono text-[10px] font-bold ${
                      active === i
                        ? 'text-white/90'
                        : g
                          ? s > UNLOCK_ABOVE
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : 'text-rose-700 dark:text-rose-300'
                          : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {g ? `${s}% · ${g.num} (${g.letter})` : mn ? 'Өгөөгүй' : 'Not yet'}
                  </span>
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
          <button
            type="button"
            disabled={pinning || pinned}
            onClick={async () => {
              if (!pinUser) {
                setPinNote(mn ? 'Дэвтэрт хадахын тулд нэвтэрнэ үү.' : 'Sign in to pin it to your notebook.');
                return;
              }
              setPinning(true);
              setPinNote(null);
              try {
                const code = lessonCode(chapterId, lesson.number);
                await pinLesson(pinUser.uid, code, mn ? `${lesson.number}-р хичээл · ${lesson.title.mn}` : `Lesson ${lesson.number} · ${lesson.title.en}`);
                setPinned(true);
              } catch {
                setPinNote(mn ? 'Дэвтэрт хадаж чадсангүй.' : 'Could not pin it.');
              } finally {
                setPinning(false);
              }
            }}
            className="print:hidden self-start px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-60"
          >
            {pinned ? (mn ? 'Дэвтэрт хадсан' : 'Pinned to notebook') : mn ? 'Дэвтэрт хадах' : 'Pin to notebook'}
          </button>
          {pinNote && <p className="text-xs text-slate-600 dark:text-slate-300">{pinNote}</p>}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? lesson.objective.mn : lesson.objective.en}</p>
        <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {lesson.keyPoints.map((k, i) => (
            <li key={i}>• {mn ? k.mn : k.en}</li>
          ))}
        </ul>
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
              <span className="flex items-start gap-2">
                <StepSticker step={i + 1} />
                <span className="min-w-0">
                  <span className="block text-sm font-black">
                    {i + 1} · {s.from}–{s.to} {mn ? 'мин' : 'min'}
                  </span>
                  <span className="block text-sm font-bold leading-snug">{mn ? s.title.mn : s.title.en}</span>
                  <span className="block text-xs font-mono opacity-80">{slideRangeLabel(stepParts[i], mn)}</span>
                </span>
              </span>
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
              items={practice[lesson.id] ?? []} storageKey={`chem_ls_practice_${lesson.id}`}
              mn={mn}
              label={{ en: `Lesson ${lesson.number} · ${lesson.title.en}`, mn: `${lesson.number}-р хичээл · ${lesson.title.mn}` }}
            />
          )}
          {i === 4 && (
            <div className="space-y-3">
              <div className={HEADING}>{mn ? 'Гарах билет (үнэлгээ)' : 'Exit ticket (assessment)'}</div>
              <ExitTest key={lesson.id} items={lesson.quiz} mn={mn} onSubmit={submitExit} storageKey={`chem_ls_exit_${lesson.id}`} />
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

      {/* The key words sit at the foot, folded, so the steps come first */}
      <details className={CARD}>
        <summary className={`${HEADING} cursor-pointer`}>{mn ? 'Түлхүүр үгийн сан (glossary)' : 'Key words glossary'}</summary>
        {(glossary[lesson.id] ?? []).length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mn ? 'Энэ хичээлийн түлхүүр үг одоогоор бэлтгэгдээгүй байна.' : 'Key words for this lesson are not written yet.'}
          </p>
        ) : (
          <StatesGlossary key={lesson.id} items={glossary[lesson.id]} mn={mn} />
        )}
      </details>
    </div>
  );
};
