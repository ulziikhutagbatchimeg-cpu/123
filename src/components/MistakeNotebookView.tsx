import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { ChemText } from './common/ChemText';
import { analyseMistakes, LEVEL_LABEL, LEVEL_STYLE, topicLevel } from '../data/mistakeAnalysis';
import { courseMistakes } from '../data/courseScope';
import { 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

export const MistakeNotebookView: React.FC = () => {
  const { mode } = useLanguage();
  const { mistakes: allMistakes, resolveMistake, jumpToTopic, courseChoice } = useApp();
  // Only the mistakes of the course being studied
  const mistakes = courseMistakes(allMistakes, courseChoice);

  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = mistakes.filter(m => {
    if (filter === 'unresolved' && m.resolved) return false;
    if (filter === 'resolved' && !m.resolved) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        m.questionTitleEn.toLowerCase().includes(q) ||
        m.questionTitleMn.toLowerCase().includes(q) ||
        m.syllabusRef.toLowerCase().includes(q) ||
        m.misconceptionDiagnosisEn.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const unresolvedCount = mistakes.filter(m => !m.resolved).length;
  const resolvedCount = mistakes.filter(m => m.resolved).length;

  // Error analysis: open mistakes grouped by topic. A topic missed twice or more is a repeated error.
  const analysis = analyseMistakes(mistakes);
  const openByTopic = new Map(analysis.topics.map(t => [t.topicId, t.count]));
  const advice = analysis.level === 'repeat'
    ? (mode === 'mn'
      ? 'Тогтмол алдаж буй сэдэв байна. Тэр сэдвийн онолыг дахин үзээд, адил төрлийн 2–3 асуултыг бодоорой. Доорх жагсаалтын эхнийхээс эхэлнэ үү.'
      : 'You keep missing a topic. Review its theory again and work 2–3 similar questions. Start with the top topic below.')
    : (mode === 'mn'
      ? 'Цөөн алдаа байна. Алдсан асуултуудаа дахин бодож, зөв аргыг ойлгоорой.'
      : 'A few misses. Work the missed questions again and make sure you understand the correct method.');

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider">
              <span>Metacognitive Error Analysis</span>
              <span>·</span>
              <span>IGCSE 0620 Diagnostics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {mode === 'mn' ? 'Алдааны сан ба Ойлголтын засвар' : 'Mistake Notebook & Remediation Hub'}
            </h2>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 font-bold">
              {unresolvedCount} {mode === 'mn' ? 'засах шаардлагатай' : 'Needs Review'}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 font-bold">
              {resolvedCount} {mode === 'mn' ? 'засагдсан' : 'Mastered'}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {mode === 'mn'
            ? 'Шалгалтад гаргасан буруу хариулт бүр автоматаар энд бүртгэгдэж, Кэмбрижийн албан ёсны тайлбар болон шалгагчийн сануулгын дагуу дахин алдахгүй байхад тусална.'
            : 'Every exam slip-up is captured with root-cause diagnostic feedback. Review your misconceptions, compare with the mark scheme, and master the material.'}
        </p>

        {/* Controls Bar: Filter pills + Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Filter Pills */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {mode === 'mn' ? `Бүгд (${mistakes.length})` : `All (${mistakes.length})`}
            </button>
            <button
              onClick={() => setFilter('unresolved')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === 'unresolved'
                  ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {mode === 'mn' ? `Засаагүй (${unresolvedCount})` : `Unresolved (${unresolvedCount})`}
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === 'resolved'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {mode === 'mn' ? `Засагдсан (${resolvedCount})` : `Resolved (${resolvedCount})`}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={mode === 'mn' ? 'Алдаа хайх...' : 'Search mistakes...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Error analysis: the topics missed most often, so review time goes where it helps most */}
      {analysis.open > 0 && (
        <div className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${LEVEL_STYLE[analysis.level].box}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className={`text-sm font-extrabold ${LEVEL_STYLE[analysis.level].text}`}>
              {mode === 'mn' ? 'Алдааны анализ' : 'Mistake analysis'}
            </h3>
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${LEVEL_STYLE[analysis.level].badge}`}>
              {LEVEL_LABEL[analysis.level][mode === 'mn' ? 'mn' : 'en']}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{advice}</p>
          <div className="space-y-2">
            {analysis.topics.map(t => {
              const level = topicLevel(t.count);
              return (
                <div
                  key={t.topicId}
                  className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{t.syllabusRef}</span>
                    <span className="text-slate-500">{mode === 'mn' ? `${t.count} засах алдаа` : `${t.count} open`}</span>
                    <span className={`px-2 py-0.5 rounded-lg font-bold border ${LEVEL_STYLE[level].badge}`}>
                      {LEVEL_LABEL[level][mode === 'mn' ? 'mn' : 'en']}
                    </span>
                  </div>
                  <button
                    onClick={() => jumpToTopic(t.topicId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 dark:text-teal-300 hover:underline transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{mode === 'mn' ? 'Сэдвийг давтах' : 'Review topic'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mistake Cards List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {mode === 'mn' ? 'Одоогоор алдаа алга байна!' : 'No Mistakes Logged!'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {mode === 'mn'
                ? 'Та шалгалтын хэсэг эсвэл хичээлийн асуултад буруу хариулбал систем автоматаар энд оношилгоог бүртгэнэ.'
                : 'Whenever you get an exam question wrong, it is diagnosed and recorded here for deliberate review.'}
            </p>
          </div>
        ) : (
          filtered.map(m => (
            <div
              key={m.id}
              className={`p-6 rounded-2xl border transition-all space-y-4 shadow-sm ${
                m.resolved
                  ? 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80 opacity-75'
                  : 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-900/40'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800/60">
                    {m.paper}
                  </span>
                  <span className="text-slate-500 font-bold">{m.syllabusRef}</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-slate-400">
                    {new Date(m.timestamp).toLocaleDateString()}
                  </span>
                  {!m.resolved && (
                    <span className={`px-2 py-0.5 rounded-lg font-sans font-bold border ${LEVEL_STYLE[topicLevel(openByTopic.get(m.topicId) ?? 1)].badge}`}>
                      {LEVEL_LABEL[topicLevel(openByTopic.get(m.topicId) ?? 1)][mode === 'mn' ? 'mn' : 'en']}
                    </span>
                  )}
                </div>

                {/* Resolve toggle */}
                <button
                  onClick={() => resolveMistake(m.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                    m.resolved
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {m.resolved
                      ? (mode === 'mn' ? 'Засагдсан' : 'Marked Resolved')
                      : (mode === 'mn' ? 'Ойлголоо гэж тэмдэглэх' : 'Mark as Mastered')}
                  </span>
                </button>
              </div>

              {/* Question Title */}
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                <ChemText>{mode === 'mn' ? m.questionTitleMn : m.questionTitleEn}</ChemText>
              </h3>

              {/* Compare answers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                {/* Student's answer */}
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-1">
                  <span className="text-rose-700 dark:text-rose-400 font-bold block">
                    {mode === 'mn' ? 'Таны буруу хариулт:' : 'Your Incorrect Answer:'}
                  </span>
                  <p className="text-rose-900 dark:text-rose-200">
                    <ChemText>{m.studentAnswer}</ChemText>
                  </p>
                </div>

                {/* Correct answer */}
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold block">
                    {mode === 'mn' ? 'Кэмбрижийн зөв хариулт:' : 'Cambridge Model Answer:'}
                  </span>
                  <p className="text-emerald-900 dark:text-emerald-200">
                    <ChemText>{m.correctAnswer}</ChemText>
                  </p>
                </div>
              </div>

              {/* Misconception diagnosis */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider block font-mono text-[11px]">
                  {mode === 'mn' ? '🧠 Алдааны шалтгаан ба Ойлголтын тайлбар:' : '🧠 Misconception Root Cause & Remedy:'}
                </span>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                  <ChemText>{mode === 'mn' ? m.misconceptionDiagnosisMn : m.misconceptionDiagnosisEn}</ChemText>
                </p>
                {mode === 'dual' && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800/80 pt-1">
                    <ChemText>{m.misconceptionDiagnosisMn}</ChemText>
                  </p>
                )}
              </div>

              {/* Jump to review lesson */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => jumpToTopic(m.topicId)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 dark:text-teal-300 hover:text-emerald-800 dark:hover:text-teal-200 hover:underline transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{mode === 'mn' ? 'Холбогдох хичээлийн онолыг дахин давтах' : 'Review Topic Lesson'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
