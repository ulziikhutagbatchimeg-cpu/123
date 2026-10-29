import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// A gentle rating for the student: one tap on a face, a thank-you, and a way to change it. The choice stays on this browser.
const KEY = 'chem_web_rating';

const FACES = [
  { value: 1, emoji: '😕', en: 'Not for me', mn: 'Таалагдахгүй' },
  { value: 2, emoji: '😐', en: 'Okay', mn: 'Дундаж' },
  { value: 3, emoji: '🙂', en: 'Good', mn: 'Сайн' },
  { value: 4, emoji: '😄', en: 'Great', mn: 'Маш сайн' },
  { value: 5, emoji: '🤩', en: 'Amazing', mn: 'Гайхалтай' }
];

const readRating = (): number | null => {
  try {
    const raw = window.localStorage.getItem(KEY);
    const value = raw ? Number(raw) : NaN;
    return value >= 1 && value <= 5 ? value : null;
  } catch {
    return null;
  }
};

const saveRating = (value: number) => {
  try {
    window.localStorage.setItem(KEY, String(value));
  } catch {
    // Storage can be blocked; the thank-you still shows
  }
};

export const WebRating: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const [rating, setRating] = useState<number | null>(readRating);
  const [changing, setChanging] = useState(false);

  const choose = (value: number) => {
    saveRating(value);
    setRating(value);
    setChanging(false);
  };

  const showFaces = rating === null || changing;
  const chosen = FACES.find(f => f.value === rating);

  return (
    <section className="rounded-2xl border border-violet-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {showFaces ? (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {mn ? 'Энэ веб танд таалагдаж байна уу?' : 'How do you like this site?'}
            </h3>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
              {mn ? 'Нэг нүүр дээр дараад хэлээрэй. Таны санал бидэнд тусална.' : 'Tap one face. Your opinion helps us.'}
            </p>
          </div>
          <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label={mn ? 'Үнэлгээ' : 'Rating'}>
            {FACES.map(face => (
              <button
                key={face.value}
                type="button"
                role="radio"
                aria-checked={rating === face.value}
                onClick={() => choose(face.value)}
                className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 transition-transform hover:-translate-y-0.5 ${
                  rating === face.value
                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/40'
                    : 'border-slate-200 bg-slate-50 hover:border-violet-300 dark:border-slate-700 dark:bg-slate-800'
                }`}
              >
                <span className="text-3xl" aria-hidden="true">{face.emoji}</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 sm:text-sm">{mn ? face.mn : face.en}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl" aria-hidden="true">{chosen?.emoji}</span>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white">
                {mn ? 'Баярлалаа!' : 'Thank you!'}
              </div>
              <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
                {mn ? `Таны санал: ${chosen?.mn}` : `Your answer: ${chosen?.en}`}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setChanging(true)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {mn ? 'Өөрчлөх' : 'Change'}
          </button>
        </div>
      )}
    </section>
  );
};
