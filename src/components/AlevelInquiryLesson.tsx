import React, { useRef, useState } from 'react';
import type { AlevelInquiryPlan } from '../data/alevelInquiryTypes';
import type { Bi, QuizItem } from '../data/statesLessons';
import { cambridgeGrade } from '../lib/grade';
import { PracticeSet, PredictionBox, StructuredQuestion } from './InteractiveChapterOne';
import { lessonSlides, lessonStepParts, partsKey, slideRangeLabel, type SlidePart } from '../data/chapterSlides';
import { SlideViewer } from './SlideViewer';
import { KeyTermTracker } from './KeyTermTracker';

// The 40-minute inquiry lesson of one AS & A Level 9701 chapter, with the same five steps as the IGCSE chapter 1
// lessons. Only the open step is shown. The exit ticket is submitted for a Cambridge-style grade.

const CARD = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4';
const HEADING = 'text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono';
const SCORE_KEY = 'alevel-inquiry-scores';

const STEPS: Array<{ from: number; to: number; title: Bi; prompt: Bi }> = [
  {
    from: 0,
    to: 5,
    title: { mn: 'Асуулт, таамаглал', en: 'Question and prediction' },
    prompt: { mn: 'Асуултыг уншаад таамаглал, шалтгаан хамт бичнэ.', en: 'Read the question. Write a prediction with a reason.' }
  },
  {
    from: 5,
    to: 15,
    title: { mn: 'Туршилт', en: 'Test' },
    prompt: { mn: 'Нэг хувьсагчийг өөрчилж, бусдыг тогтмол байлгана.', en: 'Change one variable and keep the others the same.' }
  },
  {
    from: 15,
    to: 25,
    title: { mn: 'Тайлбар', en: 'Explain' },
    prompt: { mn: 'Үр дүнг өөрийн үгээр, гол санаануудтай холбож тайлбарлана.', en: 'Explain the result in your own words, linking it to the key points.' }
  },
  {
    from: 25,
    to: 34,
    title: { mn: 'Хэрэглэх, шалгах', en: 'Apply and check' },
    prompt: { mn: 'Бүтэцтэй хариулт бичиж, хүндрэлийн түвшингээр дасгал хийнэ.', en: 'Write the structured answer, then do the practice by difficulty.' }
  },
  {
    from: 34,
    to: 40,
    title: { mn: 'Дүгнэлт, хязгаар', en: 'Conclude and evaluate' },
    prompt: { mn: 'Загварын хязгаарыг тодорхойлоод гарах билетээ илгээнэ.', en: 'State the limit of the model, then submit the exit ticket.' }
  }
];

const readScores = (): Record<string, number> => {
  try {
    const raw = window.localStorage.getItem(SCORE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
};

const writeScores = (scores: Record<string, number>) => {
  try {
    window.localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
  } catch {
    // Storage can be blocked; the grade then lasts only for this visit
  }
};

// The exit ticket: every question is answered, then Submit gives the percentage and the Cambridge grade
const ExitTest: React.FC<{ items: QuizItem[]; mn: boolean; onSubmit: (percent: number) => void }> = ({ items, mn, onSubmit }) => {
  const [picked, setPicked] = useState<Record<number, number | undefined>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = items.filter((q, i) => picked[i] === q.answer).length;
  const answered = items.filter((_, i) => picked[i] !== undefined).length;
  const complete = items.length > 0 && answered === items.length;
  const percent = items.length > 0 ? Math.round((score / items.length) * 100) : 0;
  const grade = cambridgeGrade(percent);

  const submit = () => {
    setSubmitted(true);
    onSubmit(percent);
  };

  const retry = () => {
    setPicked({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-4">
      {items.map((q, i) => {
        const choice = picked[i];
        return (
          <div key={i} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {i + 1}. {mn ? q.question.mn : q.question.en}
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {q.options.map((opt, j) => {
                const isRight = submitted && j === q.answer;
                const isWrong = submitted && j === choice && j !== q.answer;
                const isChosen = !submitted && j === choice;
                return (
                  <button
                    key={j}
                    disabled={submitted}
                    onClick={() => setPicked(prev => ({ ...prev, [i]: j }))}
                    aria-pressed={isChosen}
                    className={`text-left px-3 py-2 rounded-xl border text-xs transition-colors ${
                      isRight
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isWrong
                          ? 'bg-rose-600 text-white border-rose-600'
                          : isChosen
                            ? 'bg-violet-600 text-white border-violet-600'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
                    }`}
                  >
                    {mn ? opt.mn : opt.en}
                  </button>
                );
              })}
            </div>
            {submitted && <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? q.explanation.mn : q.explanation.en}</p>}
          </div>
        );
      })}

      {!submitted ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {mn ? `Хариулсан: ${answered} / ${items.length}` : `Answered: ${answered} / ${items.length}`}
          </span>
          <button
            onClick={submit}
            disabled={!complete}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-xs font-black"
          >
            {mn ? 'Илгээх (Submit)' : 'Submit'}
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-2xl border border-violet-300 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 space-y-2">
          <div className="text-sm font-black text-slate-900 dark:text-white">
            {mn ? 'Үнэлгээ' : 'Grade'}: {grade.num} ({grade.letter}) · {percent}% · {score} / {items.length}
          </div>
          <button onClick={retry} className="px-3 py-1.5 rounded-xl border border-violet-400 text-xs font-black text-violet-800 dark:text-violet-200">
            {mn ? 'Дахин оролдох' : 'Try again'}
          </button>
        </div>
      )}
    </div>
  );
};

// One step of the lesson. It is kept mounted when it is not the open step, so what the student typed is kept.
const Step: React.FC<{ index: number; active: number; mn: boolean; slides: SlidePart[]; children: React.ReactNode }> = ({
  index,
  active,
  mn,
  slides,
  children
}) => {
  const s = STEPS[index];
  return (
    <section className={active === index ? CARD : 'hidden'}>
      <div className="space-y-1">
        <div className={HEADING}>
          {index + 1} · {mn ? s.title.mn : s.title.en} · {s.from}–{s.to} {mn ? 'мин' : 'min'}
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
          {mn ? 'Багшийн асуулт: ' : 'Teacher prompt: '}
          {mn ? s.prompt.mn : s.prompt.en}
        </p>
      </div>
      {/* The slides of this step sit in front of its content, so the student watches them while they work */}
      {slides.length > 0 && <SlideViewer key={partsKey(slides)} parts={slides} mn={mn} />}
      {children}
    </section>
  );
};

export const AlevelInquiryLesson: React.FC<{ plan: AlevelInquiryPlan; chapterId: string; chapterTitle: Bi; mn: boolean }> = ({
  plan,
  chapterId,
  chapterTitle,
  mn
}) => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>(readScores);
  // A 9701 chapter's decks are its whole lesson, so the lesson number is not needed; the slides are shared out over the steps
  const stepParts = lessonStepParts(lessonSlides(chapterId, 1));
  const stepTopRef = useRef<HTMLDivElement>(null);

  // Moves to the next or previous step and brings the step list into view, so the new step's slides show from the top
  const goStep = (s: number) => {
    setStep(s);
    stepTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Records the exit-ticket percentage for this chapter, for the grade shown in the header
  const submitExit = (percent: number) => {
    const next = { ...scores, [chapterId]: percent };
    setScores(next);
    writeScores(next);
  };

  const score = scores[chapterId];
  const grade = score === undefined ? null : cambridgeGrade(score);

  return (
    <div className="space-y-5">
      <div className={CARD}>
        <div className="space-y-1">
          <div className={HEADING}>AS & A Level 9701 · {mn ? '40 минутын хичээл' : '40-minute lesson'}</div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">{mn ? chapterTitle.mn : chapterTitle.en}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
          <span>{mn ? 'Гарах билетийн үнэлгээ:' : 'Exit-ticket grade:'}</span>
          <span className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700">
            {grade ? `${grade.num} (${grade.letter}) · ${score}%` : mn ? 'өгөөгүй' : 'not yet'}
          </span>
        </div>
      </div>

      <div className={CARD}>
        <div className={HEADING}>{mn ? 'Түлхүүр үгийн сан (glossary)' : 'Key words glossary'}</div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {plan.glossary.map((g, i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <dt className="text-xs font-black text-violet-800 dark:text-violet-300">{mn ? g.term.mn : g.term.en}</dt>
              <dd className="mt-1 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{mn ? g.def.mn : g.def.en}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The key terms of the chapter as a checklist, so the student can see what is still to master */}
      <KeyTermTracker chapterId={chapterId} mn={mn} />

      <div ref={stepTopRef} className={CARD}>
        <div className={HEADING}>{mn ? 'Алхам' : 'Step'}</div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-pressed={step === i}
              className={`p-2.5 rounded-xl border text-left transition-colors ${
                step === i
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
              }`}
            >
              <span className="block text-[11px] font-black">
                {i + 1} · {s.from}–{s.to} {mn ? 'мин' : 'min'}
              </span>
              <span className="block text-[11px] font-bold leading-snug">{mn ? s.title.mn : s.title.en}</span>
              <span className="block text-[10px] font-mono opacity-80">{slideRangeLabel(stepParts[i], mn)}</span>
            </button>
          ))}
        </div>
      </div>

      <Step index={0} active={step} mn={mn} slides={stepParts[0]}>
        <div className="p-3.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-sm font-bold text-violet-900 dark:text-violet-200">
          {mn ? plan.question.mn : plan.question.en}
        </div>
        <PredictionBox key={chapterId} mn={mn} />
      </Step>

      <Step index={1} active={step} mn={mn} slides={stepParts[1]}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { label: mn ? 'Өөрчлөх хувьсагч' : 'Change (independent)', value: plan.independent },
            { label: mn ? 'Ажиглах хувьсагч' : 'Measure (dependent)', value: plan.dependent },
            { label: mn ? 'Тогтмол байлгах' : 'Keep the same (controlled)', value: plan.controlled }
          ].map(v => (
            <div key={v.label} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <div className="text-[10px] font-black uppercase tracking-wider text-violet-700 dark:text-violet-300">{v.label}</div>
              <div className="mt-1 text-xs text-slate-700 dark:text-slate-300">{mn ? v.value.mn : v.value.en}</div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400">
          {mn
            ? 'Туршилтын дүрсийг дээрх слайд show-оос (click бүрээр) үзнэ.'
            : 'Watch the test in the slide show above, one click at a time.'}
        </p>
      </Step>

      <Step index={2} active={step} mn={mn} slides={stepParts[2]}>
        <ul className="space-y-1.5">
          {plan.keyPoints.map((kp, i) => (
            <li key={i} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              • {mn ? kp.mn : kp.en}
            </li>
          ))}
        </ul>
      </Step>

      <Step index={3} active={step} mn={mn} slides={stepParts[3]}>
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Шалгалтын хэв маягийн асуулт' : 'Exam-style question'}</div>
          <StructuredQuestion key={chapterId} item={plan.structured} mn={mn} />
        </div>
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Бие даан ажиллах дасгал (хүндрэлийн түвшингээр)' : 'Independent practice (by difficulty)'}</div>
          <PracticeSet key={chapterId} items={plan.practice} mn={mn} />
        </div>
      </Step>

      <Step index={4} active={step} mn={mn} slides={stepParts[4]}>
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <span className="font-black">{mn ? 'Загварын хязгаар: ' : 'Limit of the model: '}</span>
          {mn ? plan.limitation.mn : plan.limitation.en}
        </div>
        <div className="space-y-2">
          <div className={HEADING}>{mn ? 'Гарах билет (үнэлгээ)' : 'Exit ticket (assessment)'}</div>
          <ExitTest key={chapterId} items={plan.exit} mn={mn} onSubmit={submitExit} />
        </div>
      </Step>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => goStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-40"
        >
          ← {mn ? 'Өмнөх алхам' : 'Previous step'}
        </button>
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
          {step + 1} / {STEPS.length}
        </span>
        <button
          onClick={() => goStep(Math.min(STEPS.length - 1, step + 1))}
          disabled={step === STEPS.length - 1}
          className="px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-xs font-black"
        >
          {mn ? 'Дараагийн алхам' : 'Next step'} →
        </button>
      </div>
    </div>
  );
};
