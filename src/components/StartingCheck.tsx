import React, { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { courseTopics } from '../data/courseScope';
import { topicQuizMcq } from '../lib/topicQuestions';
import { recordActivity } from '../lib/activity';
import { encourage } from '../lib/encourage';
import { ChemText } from './common/ChemText';

// The starting check: a few questions from the first topics of the course, to show where the student is starting. Each answer
// is marked at once. The last result is kept on this device, and each finished check is recorded as a practice result.
const SIZE = 5;
const RESULT_KEY = 'chem_starting_check';

interface SavedResult {
  courseId: string;
  score: number;
  total: number;
  at: number;
}

const readSaved = (courseId: string): SavedResult | null => {
  try {
    const raw = window.localStorage.getItem(`${RESULT_KEY}_${courseId}`);
    return raw ? (JSON.parse(raw) as SavedResult) : null;
  } catch {
    return null;
  }
};

const writeSaved = (result: SavedResult) => {
  try {
    window.localStorage.setItem(`${RESULT_KEY}_${result.courseId}`, JSON.stringify(result));
  } catch {
    // Storage can be blocked; the result then shows for this visit only
  }
};

export const StartingCheck: React.FC = () => {
  const { mode } = useLanguage();
  const { courseChoice, jumpToTopic } = useApp();
  const mn = mode === 'mn';

  // One question from each of the first topics that have questions
  const questions = useMemo(
    () =>
      courseTopics(courseChoice).flatMap(topic => {
        const first = topicQuizMcq(topic)[0];
        return first ? [first] : [];
      }).slice(0, SIZE),
    [courseChoice]
  );

  const [picked, setPicked] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<SavedResult | null>(() => readSaved(courseChoice));

  const answered = questions.filter(q => picked[q.id] !== undefined).length;
  const score = questions.filter(q => picked[q.id] !== undefined && picked[q.id] === q.correctOption).length;
  const finished = questions.length > 0 && answered === questions.length;
  const wrong = questions.filter(q => picked[q.id] !== undefined && picked[q.id] !== q.correctOption);

  const choose = (questionId: string, optionId: string, right: boolean) => {
    if (picked[questionId] !== undefined) return;
    const next = { ...picked, [questionId]: optionId };
    setPicked(next);
    encourage(right ? 'correct' : 'wrong');
    const nowAnswered = questions.filter(q => next[q.id] !== undefined);
    if (nowAnswered.length === questions.length) {
      const total = questions.length;
      const nowScore = questions.filter(q => next[q.id] === q.correctOption).length;
      const result: SavedResult = { courseId: courseChoice, score: nowScore, total, at: Date.now() };
      writeSaved(result);
      setSaved(result);
      recordActivity({
        kind: 'practice',
        course: courseChoice,
        percent: Math.round((nowScore / total) * 100),
        label: {
          en: 'Starting check',
          mn: 'Гарааны үнэлгээ'
        }
      });
    }
  };

  const restart = () => setPicked({});

  if (questions.length === 0) return null;

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="text-sm font-extrabold text-slate-900 dark:text-white">
            {mn ? 'Гарааны үнэлгээ' : 'Starting check'}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {mn
              ? `${questions.length} асуулт. Таны эхлэх түвшинг харуулна. Хариултаа сонгоход шууд үнэлнэ.`
              : `${questions.length} questions to show where you are starting. Each answer is marked at once.`}
          </p>
        </div>
        {saved && saved.courseId === courseChoice && (
          <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 font-mono text-xs font-bold text-emerald-800 dark:bg-teal-950/60 dark:text-teal-300">
            {mn ? 'Сүүлд' : 'Last'}: {saved.score} / {saved.total}
          </span>
        )}
      </div>

      <ol className="space-y-4">
        {questions.map((q, i) => {
          const choice = picked[q.id];
          const isAnswered = choice !== undefined;
          return (
            <li key={q.id} className="space-y-2.5">
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {i + 1}. <ChemText>{mn ? q.questionTextMn : q.questionTextEn}</ChemText>
              </div>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {(q.options ?? []).map(opt => {
                  const right = opt.id === q.correctOption;
                  const isChosen = choice === opt.id;
                  const tone = !isAnswered
                    ? 'border-slate-300 bg-slate-50 text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                    : right
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : isChosen
                        ? 'border-rose-600 bg-rose-600 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-500';
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => choose(q.id, opt.id, right)}
                      className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors disabled:cursor-default ${tone}`}
                    >
                      <ChemText>{mn ? opt.textMn : opt.textEn}</ChemText>
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  <ChemText>{mn ? q.misconceptionDiagnosisMn : q.misconceptionDiagnosisEn}</ChemText>
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {finished && (
        <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-teal-800/60 dark:bg-teal-950/40">
          <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-900 dark:text-teal-200">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {mn ? `Таны оноо: ${score} / ${questions.length}` : `Your score: ${score} / ${questions.length}`}
          </div>
          {wrong.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
              <span>{mn ? 'Дараагийн алхам: эдгээр сэдвийг дахин үзээрэй.' : 'Next step: go over these topics again.'}</span>
              {wrong.slice(0, 2).map(q => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => jumpToTopic(q.topicId)}
                  className="rounded-lg border border-emerald-300 bg-white px-2.5 py-1 font-bold text-emerald-800 hover:bg-emerald-100 dark:border-teal-700 dark:bg-slate-900 dark:text-teal-300"
                >
                  {q.topicId} →
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-700 dark:text-slate-300">
              {mn ? 'Бүгдэд зөв хариулсан. Сайн эхэлжээ!' : 'All correct. A strong start!'}
            </p>
          )}
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline dark:text-teal-300"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            {mn ? 'Дахин өгөх' : 'Try again'}
          </button>
        </div>
      )}
    </section>
  );
};
