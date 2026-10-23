import React, { useMemo, useState } from 'react';
import type { Topic } from '../types/chemistry';
import { topicMcq } from '../lib/topicQuestions';
import { cambridgeGrade } from '../lib/grade';

// The end-of-topic test: the topic's multiple-choice questions. After Submit the student sees the score, what they did well,
// what to revise (each wrong answer names its topic), and the next topic opens above 60%.
const PASS_ABOVE = 60;
const MIN_QUESTIONS = 3;
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

  const retry = () => {
    setPicked({});
    setSubmitted(false);
  };

  return (
    <section className={CARD}>
      <div className={HEADING}>{mn ? 'Сэдвийн шалгалт' : 'End-of-topic check'}</div>

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
                    disabled={submitted}
                    onClick={() => setPicked(prev => ({ ...prev, [q.id]: opt.id }))}
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
            onClick={() => setSubmitted(true)}
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
