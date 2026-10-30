import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { LeitnerCard } from '../types/chemistry';
import { ChemText } from './common/ChemText';
import { VocabMatchGame } from './VocabMatchGame';
import { KeywordSets } from './KeywordSets';
import {
  Layers,
  RotateCw, 
  Volume2, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const { mode } = useLanguage();
  const { leitnerCards, updateCardReview, jumpToTopic } = useApp();

  const [activeBoxFilter, setActiveBoxFilter] = useState<number | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const filteredCards = leitnerCards.filter(c =>
    activeBoxFilter === 'all' ? true : c.box === activeBoxFilter
  );

  const currentCard: LeitnerCard | undefined = filteredCards[currentIndex] || filteredCards[0];

  const handleReview = (outcome: 'easy' | 'good' | 'hard') => {
    if (!currentCard) return;
    updateCardReview(currentCard.id, outcome);
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const speak = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Box counters
  const boxCounts = [1, 2, 3, 4, 5].map(boxNum => ({
    box: boxNum,
    count: leitnerCards.filter(c => c.box === boxNum).length
  }));

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
              <span>Leitner 5-Box Spaced Repetition</span>
              <span>·</span>
              <span>Cambridge Terminology</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {mode === 'mn' ? 'Химийн нэр томьёоны флаш карт' : 'Scientific Vocabulary Flashcards'}
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {mode === 'mn'
            ? 'Шинжлэх ухааны нэр томьёог тогтооход Лейтнерийн 5 хайрцагт давтамжийн арга хамгийн үр дүнтэй. Сайн мэддэг үгс дээд хайрцаг руу шилжиж цөөн давтагдана.'
            : 'Master crucial definitions and British English pronunciation with the 5-box Leitner system. Mastered terms graduate to higher boxes with spaced intervals.'}
        </p>

        {/* Box Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => {
              setActiveBoxFilter('all');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs ${
              activeBoxFilter === 'all'
                ? 'bg-amber-500 text-white font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {mode === 'mn' ? 'Бүх картууд' : 'All Cards'} ({leitnerCards.length})
          </button>

          {boxCounts.map(b => (
            <button
              key={b.box}
              onClick={() => {
                setActiveBoxFilter(b.box);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shadow-xs ${
                activeBoxFilter === b.box
                  ? 'bg-amber-500 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800'
              }`}
            >
              Box {b.box} ({b.count})
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Card Stage */}
      {currentCard ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono px-2">
            <span>
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 text-emerald-700 dark:text-teal-400 font-bold">
              Box {currentCard.box} / 5
            </span>
          </div>

          {/* Flashcard Body */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[320px] bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50 rounded-3xl p-8 flex flex-col justify-between cursor-pointer transition-all shadow-md relative overflow-hidden group select-none"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">{currentCard.syllabusRef}</span>
              <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-mono font-bold">
                <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                <span>{mode === 'mn' ? 'Эргүүлэх' : 'Click to Flip'}</span>
              </div>
            </div>

            {/* Front & Back Content */}
            {!isFlipped ? (
              /* FRONT: English Term & Phonetic */
              <div className="text-center py-8 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    <ChemText>{currentCard.termEn}</ChemText>
                  </h3>
                  <span className="text-sm font-mono text-slate-500 block">
                    {currentCard.phonetic}
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      speak(currentCard.termEn);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-emerald-700 dark:text-teal-300 text-xs font-bold transition-colors shadow-xs"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>British Pronunciation</span>
                  </button>
                </div>
              </div>
            ) : (
              /* BACK: Definition & Mongolian Translation */
              <div className="space-y-4 py-4">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400 block">Mongolian Equivalent:</span>
                  <div className="text-2xl font-black text-emerald-700 dark:text-teal-300">
                    <ChemText>{currentCard.termMn}</ChemText>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-slate-400 block">Cambridge Definition:</span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    <ChemText>{currentCard.definitionEn}</ChemText>
                  </p>
                </div>

                <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-mono text-slate-400 block">Монгол тайлбар:</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <ChemText>{currentCard.definitionMn}</ChemText>
                  </p>
                </div>
              </div>
            )}

            {/* Bottom jump link */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-[11px] text-slate-400">
              <span>{isFlipped ? (mode === 'mn' ? 'Хайрцаг сонгох' : 'Rate retention below') : (mode === 'mn' ? 'Дарж тайлбарыг харах' : 'Tap to reveal answer')}</span>
              <button
                onClick={e => {
                  e.stopPropagation();
                  jumpToTopic(currentCard.topicId);
                }}
                className="hover:text-emerald-700 dark:hover:text-teal-300 flex items-center gap-1 font-bold text-emerald-600 dark:text-teal-400"
              >
                <span>{mode === 'mn' ? 'Хичээл рүү очих' : 'Go to Lesson'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Rating Buttons: Hard / Good / Easy */}
          {isFlipped && (
            <div className="grid grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => handleReview('hard')}
                className="py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/80 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all shadow-xs flex flex-col items-center gap-0.5"
              >
                <span>{mode === 'mn' ? 'Хүнд байлаа' : 'Hard'}</span>
                <span className="text-[10px] text-rose-500 font-normal">→ Box 1</span>
              </button>

              <button
                onClick={() => handleReview('good')}
                className="py-3 px-4 rounded-2xl bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:hover:bg-sky-900/80 text-sky-800 dark:text-sky-200 border border-sky-200 dark:border-sky-800 text-xs font-bold transition-all shadow-xs flex flex-col items-center gap-0.5"
              >
                <span>{mode === 'mn' ? 'Сайн мэднэ' : 'Good'}</span>
                <span className="text-[10px] text-sky-500 font-normal">→ Box +1</span>
              </button>

              <button
                onClick={() => handleReview('easy')}
                className="py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all shadow-xs flex flex-col items-center gap-0.5"
              >
                <span>{mode === 'mn' ? 'Маш амархан' : 'Easy'}</span>
                <span className="text-[10px] text-emerald-500 font-normal">→ Mastered</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          No cards in this box.
        </div>
      )}

      <VocabMatchGame />
      <KeywordSets />
    </div>
  );
};
