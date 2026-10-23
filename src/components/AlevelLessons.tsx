import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ALEVEL_TOPICS } from '../data/alevelTopics';
import { AlertTriangle, BookOpen, CheckCircle2, ChevronRight, Lightbulb, XCircle } from 'lucide-react';

// AS & A Level (9701) revision: one topic at a time, with the facts, the model answers and the pitfalls
export const AlevelLessons: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const [selectedId, setSelectedId] = useState<string>(ALEVEL_TOPICS[0].id);
  const topic = ALEVEL_TOPICS.find(t => t.id === selectedId) ?? ALEVEL_TOPICS[0];

  const card = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm';
  const sectionTitle = 'text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
      {/* Topic list: the topics in the order of the revision deck */}
      <div className="lg:col-span-4 space-y-3">
        <div className={card}>
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
            <BookOpen className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {mn ? 'AS & A Level 9701 — давтлага' : 'AS & A Level 9701 — revision'}
            </h2>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            {mn
              ? `${ALEVEL_TOPICS.length} сэдэв, 9701 Paper 2 ба Paper 3 (Paper 23)-ын давтлагын дарааллаар.`
              : `${ALEVEL_TOPICS.length} topics, in the order of the Paper 2 and Paper 3 (Paper 23) revision deck. The content is in Mongolian for now.`}
          </p>
          <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
            {ALEVEL_TOPICS.map(t => {
              const active = t.id === topic.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={`w-full text-left flex items-center gap-2.5 p-2.5 rounded-xl text-xs transition-all ${
                    active
                      ? 'bg-violet-50 dark:bg-violet-950/50 text-violet-800 dark:text-violet-200 font-bold border border-violet-300 dark:border-violet-700'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <span className="font-mono text-[10px] text-slate-400 w-5 shrink-0">{t.number}</span>
                  <span className="flex-1">{mn ? t.titleMn : t.titleEn}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* The selected topic */}
      <div className="lg:col-span-8 space-y-5">
        <div className={card}>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-violet-700 dark:text-violet-300 font-bold uppercase tracking-wider">
            <span>{mn ? `Сэдэв ${topic.number}` : `Topic ${topic.number}`}</span>
            <span>·</span>
            <span>9701</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {mn ? topic.titleMn : topic.titleEn}
          </h1>
          {topic.examFrequencyMn && (
            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold">{mn ? 'Шалгалтад: ' : 'In the exams: '}</span>
              {topic.examFrequencyMn}
            </div>
          )}
          {topic.tipMn && (
            <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex gap-2">
              <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{topic.tipMn}</span>
            </div>
          )}
        </div>

        {/* Key facts */}
        {topic.factsMn.length > 0 && (
          <div className={card}>
            <h3 className={`${sectionTitle} mb-3`}>{mn ? 'Гол ойлголт' : 'Key facts'}</h3>
            <ul className="space-y-2 text-sm text-slate-800 dark:text-slate-200">
              {topic.factsMn.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-violet-600 dark:text-violet-400 font-mono">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Must-know: the definitions and statements to learn word for word */}
        {topic.mustKnowMn.length > 0 && (
          <div className="rounded-2xl p-5 sm:p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono mb-3">
              {mn ? 'Заавал мэдэх (үгчлэн)' : 'Must know word for word'}
            </h3>
            <ul className="space-y-2 text-sm text-emerald-950 dark:text-emerald-100">
              {topic.mustKnowMn.map((m, i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Worked examples: the model answer with each step */}
        {topic.examplesMn.map((ex, i) => (
          <div key={i} className={card}>
            <h3 className={`${sectionTitle} mb-2`}>{mn ? `Жишээ бодолт ${i + 1}` : `Worked example ${i + 1}`}</h3>
            <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">{ex.titleMn}</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{ex.questionMn}</p>
            <ol className="space-y-1.5 text-sm text-slate-800 dark:text-slate-200 list-decimal pl-5">
              {ex.stepsMn.map((s, j) => (
                <li key={j}>{s}</li>
              ))}
            </ol>
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">{mn ? 'Хариу:' : 'Answer:'}</span>
              <span className="font-mono font-bold text-emerald-700 dark:text-teal-300">{ex.answerMn}</span>
            </div>
            {ex.tipMn && (
              <p className="mt-2 text-xs text-amber-800 dark:text-amber-300">
                <span className="font-bold">{mn ? 'Шалгагчийн шаардлага: ' : 'What the examiner wants: '}</span>
                {ex.tipMn}
              </p>
            )}
          </div>
        ))}

        {/* Quick checks: short questions with the answer */}
        {topic.quickChecksMn.length > 0 && (
          <div className={card}>
            <h3 className={`${sectionTitle} mb-3`}>{mn ? 'Богино шалгалт' : 'Quick checks'}</h3>
            <div className="space-y-3">
              {topic.quickChecksMn.map((q, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm">
                  <p className="font-semibold text-slate-900 dark:text-white">{q.questionMn}</p>
                  <p className="mt-1.5 text-emerald-800 dark:text-emerald-300">
                    <span className="font-bold">{mn ? 'Зөв: ' : 'Correct: '}</span>
                    {q.answerMn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pitfalls: what students write, and what gets the mark */}
        {topic.pitfallsMn.length > 0 && (
          <div className={card}>
            <h3 className={`${sectionTitle} mb-3 flex items-center gap-1.5`}>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              {mn ? 'Оноо алдах урхи' : 'Pitfalls that lose marks'}
            </h3>
            <div className="space-y-2">
              {topic.pitfallsMn.map((p, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex gap-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200">
                    <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{p.wrongMn}</span>
                  </div>
                  <div className="flex gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{p.rightMn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
