import React, { useEffect, useMemo, useState } from 'react';
import { useKeptAnswers } from '../lib/keptAnswers';
import type { Topic } from '../types/chemistry';
import { topicMcq } from '../lib/topicQuestions';
import { cambridgeGrade } from '../lib/grade';
import { useApp } from '../context/AppContext';
import { unitTestId } from '../lib/testAttempts';
import { encourage } from '../lib/encourage';
import { saveReflection, setReflectionReason, type ReasonId } from '../lib/reflection';
import { ScoreReflection } from './TicketReflection';

// The end-of-topic test: the topic's multiple-choice questions. After Submit the student sees the score, what they did well,
// what to revise (each wrong answer names its topic), and the next topic opens above 60%. Under the score the student says
// why the score came out as it did, and gets one button to the step that fits (lib/reflection, components/TicketReflection).
const PASS_ABOVE = 60;
const MIN_QUESTIONS = 3;
// The time for each question, counted from the first answer. When the time is up, the check is submitted with the answers given.
const SECONDS_PER_QUESTION = 60;
const CARD = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4';
const HEADING = 'text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono';

export const TopicCheck: React.FC<{
  topic: Topic;
  mn: boolean;
  nextTopic?: Topic;
  onOpenTopic: (id: string) => void;
  onNext: () => void;
}> = ({ topic, mn, nextTopic, onOpenTopic, onNext }) => {
  const questions = useMemo(() => topicMcq(topic), [topic]);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  // The time starts with the first answer and is kept with the answers, so a reload does not restart it
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [clock, setClock] = useState<number>(() => Date.now());
  // The saved score's id, for its reason; the reason, or 'skip' when the student skipped the question
  const [reflectId, setReflectId] = useState<string | null>(null);
  const [reason, setReason] = useState<ReasonId | 'skip' | null>(null);
  // The answers come back on this page, and on the student's account when signed in; they are cleared by Try again
  useKeptAnswers(`topic_check_${topic.id}`, { picked, submitted, startedAt, reflectId, reason }, saved => {
    // Answers kept for questions this test no longer has (the test was renewed) are left out: the test starts fresh
    const ids = new Set(questions.map(q => q.id));
    if (Object.keys(saved.picked ?? {}).some(id => !ids.has(id))) {
      setPicked({});
      setSubmitted(false);
      setStartedAt(null);
      setReflectId(null);
      setReason(null);
      return;
    }
    setPicked(saved.picked ?? {});
    setSubmitted(!!saved.submitted);
    setStartedAt(saved.startedAt ?? null);
    setReflectId(saved.reflectId ?? null);
    setReason(saved.reason ?? null);
  });
  const { addTestAttempt, markTopicComplete, courseChoice, setActiveTab } = useApp();

  const totalMs = questions.length * SECONDS_PER_QUESTION * 1000;
  const endsAt = startedAt === null ? null : startedAt + totalMs;
  useEffect(() => {
    if (endsAt === null || submitted) return;
    const id = window.setInterval(() => setClock(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [endsAt, submitted]);
  const left = endsAt === null ? null : Math.max(0, Math.ceil((endsAt - clock) / 1000));
  const timeUp = left === 0 && !submitted;
  // When the time is up, the check is submitted with the answers given so far
  useEffect(() => {
    if (timeUp) submit();
  }, [timeUp]);

  // Not enough questions for this topic yet: the student can still go on
  if (questions.length < MIN_QUESTIONS) {
    return (
      <section className={CARD}>
        <div className={HEADING}>{mn ? 'Сэдвийн шалгалт' : 'End-of-topic check'}</div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {mn ? 'Энэ сэдвийн шалгалтын асуулт одоогоор бэлтгэгдээгүй байна.' : 'The questions for this topic are not written yet.'}
        </p>
        {nextTopic && (
          <button onClick={onNext} className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-black">
            {mn ? 'Дараагийн сэдэв рүү' : 'Next topic'} →
          </button>
        )}
      </section>
    );
  }

  const answered = questions.filter(q => picked[q.id]).length;
  const right = questions.filter(q => picked[q.id] === q.correctOption);
  const wrong = questions.filter(q => picked[q.id] && picked[q.id] !== q.correctOption);
  const percent = Math.round((right.length / questions.length) * 100);
  const pass = percent > PASS_ABOVE;
  const grade = cambridgeGrade(percent);
  // What the check is, as the teacher reads it beside the reason
  const topicLabel = { en: `${topic.number} ${topic.titleEn}`, mn: `${topic.number} ${topic.titleMn}` };

  // Submitting saves the check as a test attempt, so the student's Tests list and the teacher's results show it. Above 60% the
  // topic is marked as finished, which opens the next topic where the chapter has no lessons.
  const submit = () => {
    setSubmitted(true);
    encourage('checked');
    if (percent > PASS_ABOVE) markTopicComplete(topic.id);
    addTestAttempt({
      testId: unitTestId(topic.id),
      earned: right.length,
      total: questions.length,
      percent,
      chapters: { [topic.chapterId]: percent }
    });
    // The score is saved for the student's reflection and the teacher; the reason is added when the student gives it
    setReflectId(saveReflection({ course: courseChoice, kind: 'topic', label: topicLabel, percent }));
  };

  const retry = () => {
    setPicked({});
    setSubmitted(false);
    setStartedAt(null);
    setReflectId(null);
    setReason(null);
  };

  // The reason goes on the saved score; a check submitted before the reflection existed is saved now, with its reason
  const chooseReason = (r: ReasonId) => {
    setReason(r);
    if (reflectId) setReflectionReason(reflectId, r);
    else setReflectId(saveReflection({ course: courseChoice, kind: 'topic', label: topicLabel, percent, reason: r }));
  };

  return (
    <section className={CARD}>
      <div className={HEADING}>{mn ? 'Сэдвийн шалгалт' : 'End-of-topic check'}</div>
      {!submitted && (
        <div className={`text-xs font-bold font-mono ${left !== null && left <= 30 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200'}`}>
          {left === null
            ? `${mn ? 'Хугацаа' : 'Time limit'} ${Math.round(totalMs / 60000)} ${mn ? 'мин' : 'min'}, ${mn ? 'эхний хариултаас эхэлнэ' : 'starts with your first answer'}`
            : `${mn ? 'Үлдсэн' : 'Left'} ${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`}
        </div>
      )}

      {questions.map((q, i) => {
        const choice = picked[q.id];
        return (
          <div key={q.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {i + 1}. {mn ? q.questionTextMn : q.questionTextEn}
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {q.options?.map(opt => {
                const isRight = submitted && opt.id === q.correctOption;
                const isWrong = submitted && choice === opt.id && opt.id !== q.correctOption;
                return (
                  <button
                    key={opt.id}
                    disabled={submitted || timeUp}
                    onClick={() => {
                      if (startedAt === null) setStartedAt(Date.now());
                      setPicked(prev => ({ ...prev, [q.id]: opt.id }));
                    }}
                    aria-pressed={choice === opt.id}
                    className={`text-left px-3 py-2 rounded-xl border text-xs transition-colors ${
                      isRight
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isWrong
                          ? 'bg-rose-600 text-white border-rose-600'
                          : choice === opt.id
                            ? 'bg-violet-600 text-white border-violet-600'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-violet-500'
                    }`}
                  >
                    {opt.id}. {mn ? opt.textMn : opt.textEn}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {!submitted ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {mn ? `Хариулсан: ${answered} / ${questions.length}` : `Answered: ${answered} / ${questions.length}`}
          </span>
          <button
            onClick={submit}
            disabled={answered < questions.length}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-xs font-black"
          >
            {mn ? 'Илгээх' : 'Submit'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-violet-300 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 space-y-1">
            <div className="text-sm font-black text-slate-900 dark:text-white">
              {mn ? 'Оноо' : 'Score'}: {right.length} / {questions.length} · {percent}% · {grade.num} ({grade.letter})
            </div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {pass
                ? mn
                  ? '60%-иас дээш байна. Дараагийн сэдэв нээгдлээ.'
                  : 'Above 60%. The next topic is open.'
                : mn
                  ? '60%-иас дээш оноо авбал дараагийн сэдэв нээгдэнэ.'
                  : 'Score above 60% to open the next topic.'}
            </div>
          </div>

          {/* Why the score came out as it did, and the step that fits */}
          <ScoreReflection
            mn={mn}
            percent={percent}
            reason={reason === 'skip' ? null : reason}
            skipped={reason === 'skip'}
            onReason={chooseReason}
            onSkip={() => setReason('skip')}
            actions={{
              slides: { label: { mn: 'Сэдвийг дахин үзэх', en: 'Go over the topic again' }, run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
              practice: { label: { mn: 'Дадлага хийх', en: 'Go to practice' }, run: () => setActiveTab('practice') },
              next: pass && nextTopic ? { label: { mn: 'Дараагийн сэдэв', en: 'Next topic' }, run: onNext } : undefined,
              retry: { label: { mn: 'Дахин оролдох', en: 'Try again' }, run: retry }
            }}
          />

          <div className="space-y-2">
            <div className={HEADING}>{mn ? 'Давуу тал' : 'What you did well'}</div>
            {right.length === 0 ? (
              <p className="text-xs text-slate-600 dark:text-slate-300">{mn ? 'Одоохондоо зөв хариулт алга.' : 'No correct answers yet.'}</p>
            ) : (
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {right.slice(0, 3).map(q => (
                  <li key={q.id}>{mn ? q.titleMn : q.titleEn}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <div className={HEADING}>{mn ? 'Сул тал ба зөвлөгөө' : 'What to work on, and advice'}</div>
            {wrong.length === 0 ? (
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {mn ? 'Бүх асуултад зөв хариулсан. Сайн явж байна.' : 'All answers are correct. Good work.'}
              </p>
            ) : (
              wrong.map(q => (
                <div key={q.id} className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs space-y-1.5">
                  <div className="font-bold text-rose-800 dark:text-rose-300">{mn ? q.titleMn : q.titleEn}</div>
                  <p className="text-slate-700 dark:text-slate-300">{mn ? q.misconceptionDiagnosisMn : q.misconceptionDiagnosisEn}</p>
                  {q.remediationTopicId && q.remediationTopicId !== topic.id && (
                    <button onClick={() => onOpenTopic(q.remediationTopicId)} className="font-bold text-violet-700 dark:text-violet-300 hover:underline">
                      {mn ? 'Энэ хэсгийг дахин үзэх →' : 'Revise this part →'}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={retry} className="px-3 py-2 rounded-xl border border-violet-400 text-xs font-black text-violet-800 dark:text-violet-200">
              {mn ? 'Дахин оролдох' : 'Try again'}
            </button>
            {pass && nextTopic && (
              <button onClick={onNext} className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-black">
                {mn ? 'Дараагийн сэдэв рүү' : 'Next topic'} →
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
