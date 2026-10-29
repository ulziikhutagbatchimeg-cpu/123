import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

// Solubility of salts, as the IGCSE 0620 coursebook gives it (Table 12.2, page 245). The AS coursebook appendix 3 adds the
// precipitate tests for the ions, which only the AS course shows. The practice is for the student to work out each answer.
interface Pair { en: string; mn: string }

const RULE_ROWS: { salt: Pair; soluble: Pair; insoluble: Pair }[] = [
  { salt: { en: 'sodium, potassium, ammonium salts', mn: 'натри, калийн, аммонийн давс' }, soluble: { en: 'all', mn: 'бүгд' }, insoluble: { en: 'none', mn: 'байхгүй' } },
  { salt: { en: 'nitrates', mn: 'нитратууд' }, soluble: { en: 'all', mn: 'бүгд' }, insoluble: { en: 'none', mn: 'байхгүй' } },
  { salt: { en: 'chlorides', mn: 'хлоридууд' }, soluble: { en: 'most', mn: 'ихэнх нь' }, insoluble: { en: 'silver chloride, lead(II) chloride', mn: 'мөнгөний хлорид, хар тугалганы(II) хлорид' } },
  { salt: { en: 'sulfates', mn: 'сульфатууд' }, soluble: { en: 'most', mn: 'ихэнх нь' }, insoluble: { en: 'barium sulfate, lead(II) sulfate, calcium sulfate', mn: 'барийн сульфат, хар тугалганы(II) сульфат, кальцийн сульфат' } },
  { salt: { en: 'carbonates', mn: 'карбонатууд' }, soluble: { en: 'sodium, potassium and ammonium carbonates', mn: 'натри, калий, аммонийн карбонат' }, insoluble: { en: 'most', mn: 'ихэнх нь' } }
];

const TESTS: { ion: Pair; reagent: Pair; result: Pair }[] = [
  { ion: { en: 'Chloride, Cl⁻', mn: 'Хлорид, Cl⁻' }, reagent: { en: 'Ag⁺(aq)', mn: 'Ag⁺(aq)' }, result: { en: 'white precipitate (dissolves in NH₃(aq))', mn: 'цагаан тунадас (NH₃(aq)-д уусна)' } },
  { ion: { en: 'Bromide, Br⁻', mn: 'Бромид, Br⁻' }, reagent: { en: 'Ag⁺(aq)', mn: 'Ag⁺(aq)' }, result: { en: 'cream precipitate (partly dissolves in NH₃(aq))', mn: 'цайвар шаргал тунадас (NH₃(aq)-д хэсэгчлэн уусна)' } },
  { ion: { en: 'Iodide, I⁻', mn: 'Иодид, I⁻' }, reagent: { en: 'Ag⁺(aq)', mn: 'Ag⁺(aq)' }, result: { en: 'yellow precipitate (insoluble in NH₃(aq))', mn: 'шар тунадас (NH₃(aq)-д уусахгүй)' } },
  { ion: { en: 'Sulfate, SO₄²⁻', mn: 'Сульфат, SO₄²⁻' }, reagent: { en: 'Ba²⁺(aq)', mn: 'Ba²⁺(aq)' }, result: { en: 'white precipitate (insoluble in excess dilute strong acid)', mn: 'цагаан тунадас (хүчтэй хүчлийн илүүд уусахгүй)' } },
  { ion: { en: 'Carbonate, CO₃²⁻', mn: 'Карбонат, CO₃²⁻' }, reagent: { en: 'dilute acid', mn: 'сул хүчил' }, result: { en: 'CO₂ gas given off', mn: 'CO₂ хий ялгарна' } }
];

// The practice: each question is a salt or a mix, with the answer and the rule behind it
const SALT_QUESTIONS: { name: Pair; soluble: boolean; why: Pair }[] = [
  { name: { en: 'Sodium nitrate', mn: 'Натрийн нитрат' }, soluble: true, why: { en: 'All nitrates are soluble.', mn: 'Бүх нитрат уусна.' } },
  { name: { en: 'Silver chloride', mn: 'Мөнгөний хлорид' }, soluble: false, why: { en: 'Silver chloride is one of the exceptions among chlorides.', mn: 'Мөнгөний хлорид бол хлоридын үл уусах цөөн үлдэгдлийн нэг.' } },
  { name: { en: 'Calcium carbonate', mn: 'Кальцийн карбонат' }, soluble: false, why: { en: 'Almost all carbonates are insoluble (only Na, K, NH₄ carbonates dissolve).', mn: 'Бараг бүх карбонат уусахгүй (зөвхөн Na, K, NH₄ карбонат уусна).' } },
  { name: { en: 'Potassium carbonate', mn: 'Калийн карбонат' }, soluble: true, why: { en: 'Potassium carbonate is one of the soluble carbonates.', mn: 'Калийн карбонат бол уусах карбонатын нэг.' } },
  { name: { en: 'Barium sulfate', mn: 'Барийн сульфат' }, soluble: false, why: { en: 'Barium sulfate is insoluble; it is used in analytical tests.', mn: 'Барийн сульфат уусахгүй; шинжилгээний тестэд ашиглагддаг.' } },
  { name: { en: 'Magnesium sulfate', mn: 'Магнийн сульфат' }, soluble: true, why: { en: 'Most sulfates are soluble, and magnesium sulfate is one of them.', mn: 'Ихэнх сульфат уусна, магнийн сульфат ч тэдгээрийн нэг.' } },
  { name: { en: 'Lead(II) chloride', mn: 'Хар тугалганы(II) хлорид' }, soluble: false, why: { en: 'Lead(II) chloride is one of the insoluble chlorides.', mn: 'Хар тугалганы(II) хлорид бол уусахгүй хлоридын нэг.' } },
  { name: { en: 'Ammonium chloride', mn: 'Аммонийн хлорид' }, soluble: true, why: { en: 'All ammonium salts are soluble.', mn: 'Бүх аммонийн давс уусна.' } }
];

const MIX_QUESTIONS: { mix: Pair; precipitate: boolean; answer: Pair }[] = [
  { mix: { en: 'silver nitrate(aq) + sodium chloride(aq)', mn: 'мөнгөний нитрат(aq) + натрийн хлорид(aq)' }, precipitate: true, answer: { en: 'white silver chloride', mn: 'цагаан мөнгөний хлорид' } },
  { mix: { en: 'barium chloride(aq) + sodium sulfate(aq)', mn: 'барийн хлорид(aq) + натрийн сульфат(aq)' }, precipitate: true, answer: { en: 'white barium sulfate', mn: 'цагаан барийн сульфат' } },
  { mix: { en: 'sodium nitrate(aq) + potassium chloride(aq)', mn: 'натрийн нитрат(aq) + калийн хлорид(aq)' }, precipitate: false, answer: { en: 'no precipitate: all the possible salts are soluble', mn: 'тунадас үүсэхгүй: боломжит бүх давс уусна' } },
  { mix: { en: 'sodium carbonate(aq) + calcium chloride(aq)', mn: 'натрийн карбонат(aq) + кальцийн хлорид(aq)' }, precipitate: true, answer: { en: 'white calcium carbonate', mn: 'цагаан кальцийн карбонат' } }
];

const pick = (p: Pair, mn: boolean) => (mn ? p.mn : p.en);

const Check: React.FC<{ value?: boolean; onPick: (v: boolean) => void; mn: boolean; labels: [string, string] }> = ({ value, onPick, labels }) => (
  <div className="flex flex-wrap gap-2">
    {[true, false].map((v, i) => (
      <button
        key={String(v)}
        type="button"
        onClick={() => onPick(v)}
        aria-pressed={value === v}
        className={`rounded-xl border px-4 py-2 text-sm font-black ${
          value === v
            ? 'border-violet-500 bg-violet-600 text-white'
            : 'border-slate-300 bg-white text-slate-700 hover:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
        }`}
      >
        {labels[i]}
      </button>
    ))}
  </div>
);

export const SolubilityRules: React.FC = () => {
  const { courseChoice } = useApp();
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const [saltAns, setSaltAns] = useState<Record<number, boolean | undefined>>({});
  const [mixAns, setMixAns] = useState<Record<number, boolean | undefined>>({});
  if (courseChoice === 'a') return null;

  const saltScore = SALT_QUESTIONS.filter((q, i) => saltAns[i] === q.soluble).length;
  const mixScore = MIX_QUESTIONS.filter((q, i) => mixAns[i] === q.precipitate).length;
  const reset = () => { setSaltAns({}); setMixAns({}); };

  return (
    <section className="space-y-6 rounded-3xl border border-violet-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-violet-700 dark:text-violet-300">
          {mn ? 'Уусах чанар · Coursebook 12.2 (хуудас 245)' : 'Solubility · Coursebook 12.2 (page 245)'}
        </div>
        <h3 className="mt-1 text-xl font-black text-slate-900 dark:text-white">{mn ? 'Давсны уусах чанарын дүрэм' : 'Solubility rules for salts'}</h3>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-violet-50 dark:bg-slate-800">
            <tr>
              {(mn ? ['Давс', 'Уусна', 'Уусахгүй'] : ['Salts', 'Soluble', 'Insoluble']).map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-900 dark:text-white">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RULE_ROWS.map((r, i) => (
              <tr key={i} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3 font-black text-slate-900 dark:text-white">{pick(r.salt, mn)}</td>
                <td className="px-4 py-3 font-bold text-emerald-700 dark:text-emerald-300">{pick(r.soluble, mn)}</td>
                <td className="px-4 py-3 font-bold text-rose-700 dark:text-rose-300">{pick(r.insoluble, mn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="list-disc space-y-1 pl-6 text-sm font-bold text-slate-700 dark:text-slate-200">
        <li>{mn ? 'Натри, калий, аммонийн давс бүгд уусна. Нитрат бүгд уусна.' : 'All sodium, potassium and ammonium salts are soluble, and all nitrates are soluble.'}</li>
        <li>{mn ? 'Ихэнх хлорид, сульфат уусна. Гол үл уусах үлдэгдэл: мөнгөний хлорид, барийн сульфат.' : 'Most chlorides and sulfates are soluble; the main exceptions are silver chloride and barium sulfate.'}</li>
        <li>{mn ? 'Бараг бүх карбонат уусахгүй.' : 'Almost all carbonates are insoluble.'}</li>
      </ul>

      {courseChoice === 'as' && (
        <div className="space-y-2">
          <h4 className="font-black text-slate-900 dark:text-white">{mn ? 'AS: ионы тест (Appendix 3)' : 'AS: tests for ions (Appendix 3)'}</h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-violet-50 dark:bg-slate-800">
                <tr>
                  {(mn ? ['Ион', 'Реагент', 'Үр дүн'] : ['Ion', 'Reagent', 'Result']).map(h => (
                    <th key={h} className="px-4 py-3 text-left font-black text-slate-900 dark:text-white">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TESTS.map((t, i) => (
                  <tr key={i} className="border-t border-slate-200 dark:border-slate-800">
                    <td className="px-4 py-3 font-black text-slate-900 dark:text-white">{pick(t.ion, mn)}</td>
                    <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">{pick(t.reagent, mn)}</td>
                    <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">{pick(t.result, mn)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="space-y-4 rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-black text-slate-900 dark:text-white">{mn ? 'Дасгал: өөрөө шийд' : 'Practice: work it out yourself'}</h4>
          <button type="button" onClick={reset} className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-white dark:border-slate-700 dark:text-slate-200">
            {mn ? 'Дахин эхлэх' : 'Start again'}
          </button>
        </div>

        <div className="space-y-3">
          <div className="font-bold text-slate-800 dark:text-slate-100">{mn ? 'A. Давс уусах уу, уусахгүй юу?' : 'A. Does the salt dissolve?'}</div>
          {SALT_QUESTIONS.map((q, i) => (
            <div key={i} className="space-y-2 rounded-xl bg-white p-3 dark:bg-slate-900">
              <div className="font-black text-slate-900 dark:text-white">{pick(q.name, mn)}</div>
              <Check value={saltAns[i]} onPick={v => setSaltAns(a => ({ ...a, [i]: v }))} mn={mn} labels={mn ? ['Уусна', 'Уусахгүй'] : ['Soluble', 'Insoluble']} />
              {saltAns[i] !== undefined && (
                <div className={`text-sm font-bold ${saltAns[i] === q.soluble ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                  {saltAns[i] === q.soluble ? (mn ? 'Зөв. ' : 'Correct. ') : (mn ? 'Буруу. ' : 'Not quite. ')}
                  {pick(q.why, mn)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="font-bold text-slate-800 dark:text-slate-100">{mn ? 'B. Хоёр уусмалыг холиход тунадас үүсэх үү?' : 'B. When the two solutions are mixed, does a precipitate form?'}</div>
          {MIX_QUESTIONS.map((q, i) => (
            <div key={i} className="space-y-2 rounded-xl bg-white p-3 dark:bg-slate-900">
              <div className="font-black text-slate-900 dark:text-white">{pick(q.mix, mn)}</div>
              <Check value={mixAns[i]} onPick={v => setMixAns(a => ({ ...a, [i]: v })) } mn={mn} labels={mn ? ['Тунадас үүснэ', 'Үүсэхгүй'] : ['Precipitate forms', 'No precipitate']} />
              {mixAns[i] !== undefined && (
                <div className={`text-sm font-bold ${mixAns[i] === q.precipitate ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                  {mixAns[i] === q.precipitate ? (mn ? 'Зөв. ' : 'Correct. ') : (mn ? 'Буруу. ' : 'Not quite. ')}
                  {pick(q.answer, mn)}
                </div>
              )}
            </div>
          ))}
        </div>

        {(Object.keys(saltAns).length + Object.keys(mixAns).length) > 0 && (
          <p className="text-base font-black text-slate-900 dark:text-white">
            {mn ? `Давс: ${saltScore}/${SALT_QUESTIONS.length} · Холилт: ${mixScore}/${MIX_QUESTIONS.length}` : `Salts: ${saltScore}/${SALT_QUESTIONS.length} · Mixing: ${mixScore}/${MIX_QUESTIONS.length}`}
          </p>
        )}
      </div>
    </section>
  );
};
