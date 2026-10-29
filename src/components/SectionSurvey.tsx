import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { courseTopics } from '../data/courseScope';
import { useAuthUser } from '../lib/cloud';
import {
  HARDEST_OPTIONS,
  LIKED_OPTIONS,
  loadAnsweredSections,
  saveSectionSurvey,
  type SurveyAnswers
} from '../lib/sectionSurvey';

// After a student marks a section as studied, a short question set appears here for that section. Each section is answered once.
const EMPTY: Partial<SurveyAnswers> = {};

const Scale: React.FC<{ value?: number; onPick: (n: number) => void; mn: boolean; name: string }> = ({ value, onPick, mn, name }) => (
  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
    {[1, 2, 3, 4, 5].map(n => (
      <button
        key={n}
        type="button"
        role="radio"
        aria-checked={value === n}
        onClick={() => onPick(n)}
        className={`min-w-[3rem] rounded-xl border px-3 py-2 text-base font-black transition-colors ${
          value === n
            ? 'border-violet-500 bg-violet-600 text-white'
            : 'border-slate-300 bg-white text-slate-700 hover:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
        }`}
      >
        {n}
      </button>
    ))}
    <span className="self-center text-xs font-bold text-slate-500 dark:text-slate-400">
      {mn ? '1 = огт биш · 5 = маш их' : '1 = not at all · 5 = very much'}
    </span>
  </div>
);

const Choice: React.FC<{ options: { id: string; en: string; mn: string }[]; value?: string; onPick: (id: string) => void; mn: boolean; name: string }> = ({ options, value, onPick, mn, name }) => (
  <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label={name}>
    {options.map(o => (
      <button
        key={o.id}
        type="button"
        role="radio"
        aria-checked={value === o.id}
        onClick={() => onPick(o.id)}
        className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors ${
          value === o.id
            ? 'border-violet-500 bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-200'
            : 'border-slate-300 bg-white text-slate-700 hover:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
        }`}
      >
        {mn ? o.mn : o.en}
      </button>
    ))}
  </div>
);

export const SectionSurvey: React.FC = () => {
  const { stats, courseChoice } = useApp();
  const { mode } = useLanguage();
  const { user } = useAuthUser();
  const mn = mode === 'mn';

  const [answered, setAnswered] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Partial<SurveyAnswers>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    loadAnsweredSections(user.uid).then(setAnswered).catch(() => setAnswered(new Set()));
  }, [user]);

  // Only the sections the student has marked as studied, in this course
  const studied = courseTopics(courseChoice).filter(t => stats.completedTopics.includes(t.id));
  const pending = studied.filter(t => !answered.has(t.id));

  if (studied.length === 0) return null;

  const complete = (a: Partial<SurveyAnswers>): a is SurveyAnswers =>
    !!a.hardest && !!a.liked && a.understood !== undefined && a.selfStudy !== undefined && a.recommend !== undefined;

  const submit = async (topicId: string) => {
    if (!user) return;
    if (!complete(answers)) {
      setError(mn ? 'Бүх асуултад хариулна уу.' : 'Please answer every question.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await saveSectionSurvey(user.uid, topicId, { ...answers, text: (answers.text ?? '').slice(0, 300) });
      setAnswered(prev => new Set(prev).add(topicId));
      setOpenId(null);
      setAnswers(EMPTY);
    } catch {
      setError(mn ? 'Хадгалж чадсангүй. Нэвтэрсэн эсэхээ шалгана уу.' : 'Could not save. Check that you are signed in.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-2xl border border-violet-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">
          {mn ? 'Судалсан хэсэг бүрийн асуулга' : 'Question set for each section you studied'}
        </h3>
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          {pending.length > 0
            ? mn ? `${pending.length} хэсэг хариулт хүлээж байна` : `${pending.length} section(s) waiting for your answers`
            : mn ? 'Бүх судалсан хэсэгт хариулсан байна' : 'You have answered every section you studied'}
        </p>
      </div>

      {!user && pending.length > 0 && (
        <p className="mb-3 rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          {mn ? 'Хариулахын тулд эхлээд нэвтэрнэ үү.' : 'Sign in first to answer.'}
        </p>
      )}

      <ul className="space-y-3">
        {studied.map(t => {
          const done = answered.has(t.id);
          const open = openId === t.id;
          return (
            <li key={t.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-black text-slate-900 dark:text-white">
                  {t.syllabusRef} · {mn ? t.titleMn : t.titleEn}
                </span>
                {done ? (
                  <span className="flex items-center gap-1.5 text-sm font-black text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    {mn ? 'Хариулсан' : 'Answered'}
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={!user}
                    onClick={() => {
                      setOpenId(open ? null : t.id);
                      setAnswers(EMPTY);
                      setError(null);
                    }}
                    className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-black text-white hover:bg-violet-700 disabled:opacity-40"
                  >
                    {open ? (mn ? 'Хаах' : 'Close') : mn ? 'Хариулах' : 'Answer'}
                  </button>
                )}
              </div>

              {open && !done && (
                <div className="mt-4 space-y-5">
                  <div className="space-y-2">
                    <div className="font-bold text-slate-800 dark:text-slate-100">
                      {mn ? '1. Энэ хэсгийг давтахад хамгийн хэцүү зүйл юу байсан бэ?' : '1. What was hardest when you reviewed this section?'}
                    </div>
                    <Choice
                      options={HARDEST_OPTIONS}
                      value={answers.hardest}
                      onPick={id => setAnswers(a => ({ ...a, hardest: id }))}
                      mn={mn}
                      name={mn ? 'Хамгийн хэцүү' : 'Hardest'}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-800 dark:text-slate-100">
                      {mn ? '2. Энэ хэсгийн агуулгыг хэр сайн ойлгосон бэ?' : '2. How well did you understand this section?'}
                    </div>
                    <Scale value={answers.understood} onPick={n => setAnswers(a => ({ ...a, understood: n }))} mn={mn} name={mn ? 'Ойлгосон түвшин' : 'Understanding'} />
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-800 dark:text-slate-100">
                      {mn ? '3. Энэ хэсгийг өөрөө хэр сайн давтсан бэ?' : '3. How well did you review this section on your own?'}
                    </div>
                    <Scale value={answers.selfStudy} onPick={n => setAnswers(a => ({ ...a, selfStudy: n }))} mn={mn} name={mn ? 'Өөрөө давтсан' : 'Self-study'} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor={`text-${t.id}`} className="font-bold text-slate-800 dark:text-slate-100">
                      {mn ? '4. Хэцүү байсан зүйлээ нэг өгүүлбэрээр бичнэ үү (заавал биш)' : '4. What was hard, in one sentence (optional)'}
                    </label>
                    <textarea
                      id={`text-${t.id}`}
                      rows={2}
                      maxLength={300}
                      value={answers.text ?? ''}
                      onChange={e => setAnswers(a => ({ ...a, text: e.target.value }))}
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-800 dark:text-slate-100">
                      {mn ? '5. Веб-ийн аль хэсэг хамгийн их туслав?' : '5. Which part of the web helped you most?'}
                    </div>
                    <Choice
                      options={LIKED_OPTIONS}
                      value={answers.liked}
                      onPick={id => setAnswers(a => ({ ...a, liked: id }))}
                      mn={mn}
                      name={mn ? 'Хамгийн их туслав' : 'Most helpful'}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-800 dark:text-slate-100">
                      {mn ? '6. Найз нөхөддөө энэ веб-ийг зөвлөх үү?' : '6. Would you recommend this web to a friend?'}
                    </div>
                    <Scale value={answers.recommend} onPick={n => setAnswers(a => ({ ...a, recommend: n }))} mn={mn} name={mn ? 'Зөвлөх' : 'Recommend'} />
                  </div>

                  {error && <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{error}</p>}

                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => submit(t.id)}
                    className="rounded-xl bg-violet-600 px-5 py-3 text-base font-black text-white hover:bg-violet-700 disabled:opacity-50"
                  >
                    {saving ? (mn ? 'Хадгалж байна…' : 'Saving…') : mn ? 'Илгээх' : 'Send'}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
