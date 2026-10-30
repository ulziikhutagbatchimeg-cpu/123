import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { recordActivity } from '../../lib/activity';

// Short check questions after the theory. Each question has one right answer; the explanation shows after a choice.
// The IGCSE questions follow the 0620 (2026–2028) statements in section 8; the A Level questions cover the rest.
export type Programme = 'igcse' | 'alevel';

interface Choice {
  en: string;
  mn: string;
}

interface CheckQuestion {
  promptEn: string;
  promptMn: string;
  choices: Choice[];
  correct: number;
  explainEn: string;
  explainMn: string;
}

const QUESTIONS: Record<Programme, CheckQuestion[]> = {
  igcse: [
    {
      promptEn: 'Going down Group I (Li → Cs), the melting point ...',
      promptMn: 'I бүлэгт (Li → Cs) доошлоход хайлах цэг ...',
      choices: [
        { en: 'decreases', mn: 'буурна' },
        { en: 'increases', mn: 'нэмэгдэнэ' },
        { en: 'stays the same', mn: 'өөрчлөгдөхгүй' }
      ],
      correct: 0,
      explainEn: 'Li melts at about 181 °C and Cs at about 28 °C, so the melting point falls down the group (section 8.2).',
      explainMn: 'Li ≈ 181 °C-д, Cs ≈ 28 °C-д хайлдаг тул бүлгийн дагуу хайлах цэг буурна (8.2).'
    },
    {
      promptEn: 'Chlorine water is added to potassium bromide solution. What is seen?',
      promptMn: 'Калийн бромидын уусмалд хлорын ус нэмэхэд юу ажиглагдах вэ?',
      choices: [
        { en: 'The solution turns orange-red (bromine is displaced)', mn: 'Уусмал улбар шар-улаан болно (бром түлхэгдэнэ)' },
        { en: 'Nothing happens', mn: 'Юу ч өөрчлөгдөхгүй' },
        { en: 'A white precipitate forms', mn: 'Цагаан тунадас үүснэ' }
      ],
      correct: 0,
      explainEn: 'Chlorine is more reactive than bromine, so it displaces bromide: Cl₂ + 2KBr → 2KCl + Br₂ (section 8.3).',
      explainMn: 'Хлор бромоос идэвхтэй тул бромидыг түлхэнэ: Cl₂ + 2KBr → 2KCl + Br₂ (8.3).'
    },
    {
      promptEn: 'What is iodine at room temperature?',
      promptMn: 'Иод өрөөний температурт ямар төлөвтэй вэ?',
      choices: [
        { en: 'a grey-black solid', mn: 'саарал-хар хатуу' },
        { en: 'a red-brown liquid', mn: 'хүрэн-улаан шингэн' },
        { en: 'a pale yellow-green gas', mn: 'шар-ногоон хий' }
      ],
      correct: 0,
      explainEn: 'Chlorine is a pale yellow-green gas, bromine a red-brown liquid and iodine a grey-black solid (section 8.3).',
      explainMn: 'Хлор шар-ногоон хий, бром хүрэн-улаан шингэн, иод саарал-хар хатуу (8.3).'
    },
    {
      promptEn: 'Why are the noble gases unreactive?',
      promptMn: 'Яагаад инертийн хийнүүд урвалд орохгүй вэ?',
      choices: [
        { en: 'They have a full outer shell', mn: 'Гаднах бүрхүүл нь бүтэн' },
        { en: 'They have no protons', mn: 'Протон байхгүй' },
        { en: 'They are all metals', mn: 'Бүгд металл' }
      ],
      correct: 0,
      explainEn: 'A full outer shell means no electrons need to be gained, lost or shared (section 8.5).',
      explainMn: 'Гаднах бүрхүүл бүтэн тул электрон авах, алдах, хуваалцах шаардлагагүй (8.5).'
    },
    {
      promptEn: 'Across Period 3, from sodium to chlorine, the elements change from ...',
      promptMn: '3-р үеийн дагуу натриас хлор хүртэл элементүүд ... шинж рүү шилжинэ.',
      choices: [
        { en: 'metallic to non-metallic', mn: 'металлаас металл бус' },
        { en: 'non-metallic to metallic', mn: 'металл бусаас металл' },
        { en: 'metallic to metallic', mn: 'металлаас металл' }
      ],
      correct: 0,
      explainEn: 'Metallic character falls across a period (section 8.1).',
      explainMn: 'Үеийн дагуу металл шинж буурна (8.1).'
    }
  ],
  alevel: [
    {
      promptEn: 'Why does the first ionisation energy increase across Period 3?',
      promptMn: 'Яагаад 3-р үеийн дагуу IE₁ нэмэгддэг вэ?',
      choices: [
        { en: 'The nuclear charge rises while the outer electrons stay in the same shell', mn: 'Цөмийн цэнэг нэмэгдэж, гаднах электрон ижил бүрхүүлд үлдэнэ' },
        { en: 'The atoms get larger', mn: 'Атом томорно' },
        { en: 'The shielding increases', mn: 'Халхлал нэмэгдэнэ' }
      ],
      correct: 0,
      explainEn: 'More protons pull the outer electron harder while the shielding stays about the same, so more energy is needed to remove it.',
      explainMn: 'Протон нэмэгдэхэд гаднах электроныг илүү хүчтэй татна, харин халхлал бараг өөрчлөгдөхгүй тул салгахад илүү энерги хэрэгтэй.'
    },
    {
      promptEn: 'Why does atomic radius decrease across a period?',
      promptMn: 'Яагаад атомын радиус үеийн дагуу буурдаг вэ?',
      choices: [
        { en: 'More protons pull the same shell closer', mn: 'Протон нэмэгдэж ижил бүрхүүлийг төв рүү татна' },
        { en: 'More shells are added', mn: 'Бүрхүүл нэмэгдэнэ' },
        { en: 'Electrons are removed', mn: 'Электрон хасагдана' }
      ],
      correct: 0,
      explainEn: 'The nuclear charge increases while the electrons stay in the same shell, so the atom shrinks.',
      explainMn: 'Цөмийн цэнэг нэмэгдэж, электрон ижил бүрхүүлд үлдэнэ, тиймээс атом агшина.'
    },
    {
      promptEn: 'Which atom is more electronegative, fluorine or chlorine?',
      promptMn: 'Аль атом илүү цахилгаан сөрөг вэ: фтор уу, хлор уу?',
      choices: [
        { en: 'Fluorine (4.0 against 3.2)', mn: 'Фтор (4.0, харьцуулахад 3.2)' },
        { en: 'Chlorine', mn: 'Хлор' },
        { en: 'They are equal', mn: 'Тэнцүү' }
      ],
      correct: 0,
      explainEn: 'Fluorine is the most electronegative element (4.0); chlorine is about 3.2.',
      explainMn: 'Фтор хамгийн их цахилгаан сөрөг элемент (4.0); хлор ≈ 3.2.'
    },
    {
      promptEn: 'Why is the first ionisation energy lower for Rb than for Li?',
      promptMn: 'Яагаад Rb-ийн IE₁ нь Li-ээс бага вэ?',
      choices: [
        { en: 'The outer electron is further from the nucleus and more shielded', mn: 'Гаднах электрон цөмөөс холдож, илүү халхлагдсан' },
        { en: 'Rb has fewer protons', mn: 'Rb-д протон цөөн' },
        { en: 'Rb has a smaller atomic radius', mn: 'Rb-ийн радиус бага' }
      ],
      correct: 0,
      explainEn: 'Each extra shell moves the outer electron further away and adds shielding, moving down a group.',
      explainMn: 'Бүрхүүл бүр нэмэгдэх тусам гаднах электрон холдож, халхлал нэмэгдэнэ (бүлгийн дагуу).'
    },
    {
      promptEn: 'Why does the reactivity of the halogens fall down Group VII?',
      promptMn: 'Яагаад VII бүлгийн галогенүүдийн идэвх доошлоход буурдаг вэ?',
      choices: [
        { en: 'Atoms get larger, so the attraction for an extra electron weakens', mn: 'Атом томорч, нэмэлт электроныг татах хүч суларна' },
        { en: 'Halogens lose electrons more easily', mn: 'Галоген электроноо илүү амар алдана' },
        { en: 'Atoms get smaller', mn: 'Атом жижиглэнэ' }
      ],
      correct: 0,
      explainEn: 'The incoming electron is attracted from further away, through more shielding, so attraction weakens down the group.',
      explainMn: 'Орж ирэх электрон хол, илүү халхлалтай газраас татагдана тул бүлгийн дагуу татах хүч суларна.'
    }
  ]
};

export const TheoryCheck: React.FC<{ mn: boolean; programme: Programme }> = ({ mn, programme }) => {
  const questions = QUESTIONS[programme];
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));

  const answered = answers.filter(a => a !== null).length;
  const score = questions.reduce((sum, q, i) => sum + (answers[i] === q.correct ? 1 : 0), 0);
  const { courseChoice } = useApp();
  // One result per round: saved once every question is answered, and again only after the round is reset
  const saved = useRef(false);
  useEffect(() => {
    if (answered === 0) saved.current = false;
    if (answered === questions.length && !saved.current) {
      saved.current = true;
      recordActivity({
        kind: 'practice',
        course: courseChoice,
        percent: Math.round((score / questions.length) * 100),
        label: { en: 'Quick check · theory', mn: 'Богино шалгалт · онол' }
      });
    }
  }, [answered, score, questions.length, courseChoice]);

  const choose = (qi: number, ci: number) => {
    setAnswers(prev => prev.map((v, i) => (i === qi && v === null ? ci : v)));
  };

  return (
    <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 sm:p-6 space-y-5 shadow-xs">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-300 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30 text-[11px] font-mono font-bold">
            {programme === 'igcse' ? 'IGCSE 0620' : 'AS & A Level 9701'}
          </span>
          <h3 className="text-base font-black text-slate-900 dark:text-white">{mn ? 'Богино шалгалт' : 'Quick check'}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {mn ? 'Асуултад хариулаад тайлбарыг уншаарай.' : 'Answer each question, then read the explanation.'}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="font-black text-slate-900 dark:text-white">
            {score} / {questions.length} {mn ? 'зөв' : 'correct'}
          </span>
          {answered > 0 && (
            <button
              onClick={() => setAnswers(questions.map(() => null))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:border-indigo-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{mn ? 'Дахин оролдох' : 'Try again'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, qi) => {
          const picked = answers[qi];
          const isRight = picked === q.correct;
          return (
            <div key={qi} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">{qi + 1}</span>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{mn ? q.promptMn : q.promptEn}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pl-9">
                {q.choices.map((c, ci) => {
                  const isPicked = picked === ci;
                  const isCorrect = ci === q.correct;
                  const reveal = picked !== null;
                  let tone = 'bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400';
                  if (reveal && isCorrect) tone = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200';
                  else if (reveal && isPicked) tone = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200';
                  return (
                    <button
                      key={ci}
                      disabled={reveal}
                      onClick={() => choose(qi, ci)}
                      className={`px-3 py-2.5 rounded-xl border text-left text-xs font-semibold leading-snug transition-all disabled:cursor-default ${tone}`}
                    >
                      {mn ? c.mn : c.en}
                    </button>
                  );
                })}
              </div>

              {picked !== null && (
                <div
                  className={`ml-9 flex items-start gap-2 p-3 rounded-xl text-xs leading-relaxed ${
                    isRight
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  {isRight ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                  <span>
                    <span className="font-black">{isRight ? (mn ? 'Зөв! ' : 'Correct! ') : mn ? 'Буруу. ' : 'Not quite. '}</span>
                    {mn ? q.explainMn : q.explainEn}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
