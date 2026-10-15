import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChemText } from './common/ChemText';
import { BookMarked, Eye, Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CommandWord {
  word: string;
  definitionEn: string;
  definitionMn: string;
  exampleEn: string;
  exampleMn: string;
}

const COMMAND_WORDS: CommandWord[] = [
  {
    word: 'State',
    definitionEn: 'Express in clear terms.',
    definitionMn: 'Тодорхой, товч байдлаар нэрлэх эсвэл илэрхийлэх (богино хариулт).',
    exampleEn: 'State the name of the gas produced at the anode.',
    exampleMn: 'Анод дээр ялгарах хийн нэрийг нэрлэнэ үү.'
  },
  {
    word: 'Describe',
    definitionEn: 'State the points of a topic / give characteristics and main features.',
    definitionMn: 'Үзэгдэл, шинж чанар эсвэл дарааллыг дэлгэрэнгүй тайлбарлан өгүүлэх.',
    exampleEn: 'Describe the observation when magnesium is added to dilute acid.',
    exampleMn: 'Магниг шингэрүүлсэн хүчилд хийхэд юу ажиглагдахыг дүрслэнэ үү.'
  },
  {
    word: 'Explain',
    definitionEn: 'Set out purposes or reasons / make the relationships between things evident / provide why and/or how.',
    definitionMn: 'Шалтгаан, учир холбогдлыг гаргаж яагаад, хэрхэн гэдгийг нотлох.',
    exampleEn: 'Explain why ionic compounds conduct electricity when molten but not when solid.',
    exampleMn: 'Ионы нэгдлүүд яагаад хайлмал төлөвтөө цахилгаан дамжуулдаг, хатуудаа дамжуулдаггүйг тайлбарлана уу.'
  },
  {
    word: 'Deduce',
    definitionEn: 'Conclude from available information.',
    definitionMn: 'Өгөгдсөн баримт, туршилтын үр дүнгээс логик дүгнэлт гаргах.',
    exampleEn: 'Deduce the empirical formula of the oxide from the table.',
    exampleMn: 'Хүснэгтийн өгөгдлийг ашиглан ислийн эмпирик томьёог гаргана уу.'
  },
  {
    word: 'Suggest',
    definitionEn: 'Apply knowledge and understanding to situations where there are a range of valid responses.',
    definitionMn: 'Өөрийн мэдлэгт үндэслэн боломжит хувилбар эсвэл таамаглал дэвшүүлэх.',
    exampleEn: 'Suggest an improvement to reduce heat loss in the experiment.',
    exampleMn: 'Туршилтын дулааны алдагдлыг бууруулах сайжруулалтыг санал болгоно уу.'
  },
  {
    word: 'Calculate',
    definitionEn: 'Work out from given facts, figures or information; show working steps.',
    definitionMn: 'Тоон өгөгдлийг ашиглан томьёогоор бодолт хийж, алхам алхмаар харуулах.',
    exampleEn: 'Calculate the volume of 0.25 mol of carbon dioxide gas at r.t.p.',
    exampleMn: '0.25 моль нүүрсхүчлийн хийн эзлэхүүнийг r.t.p нөхцөлд тооцоолно уу.'
  }
];

export const CambridgeSkillsView: React.FC = () => {
  const { mode } = useLanguage();
  const [activeTab, setActiveTab] = useState<'command_words' | 'reading_scales' | 'language_skills'>('command_words');

  // Meniscus interactive test
  const [meniscusGuess, setMeniscusGuess] = useState<string>('');
  const [meniscusFeedback, setMeniscusFeedback] = useState<string | null>(null);

  const checkMeniscus = () => {
    if (meniscusGuess === '24.35' || meniscusGuess === '24.3') {
      setMeniscusFeedback(
        mode === 'mn'
          ? 'Зөв! Хотгорын доод ирмэгээр 24.35 см³ (эсвэл 24.3-24.4 см³) гэж нүдний түвшинд уншина.'
          : 'Correct! Read at eye level from the bottom of the curved meniscus: 24.35 cm³.'
      );
    } else {
      setMeniscusFeedback(
        mode === 'mn'
          ? 'Буруу байна. Шингэний хотгорын ДООД ирмэгээр нүдний түвшинд харж 24.35 см³ гэж уншина.'
          : 'Remember to read at eye level from the bottom of the curved meniscus, not the top edges (approx 24.35 cm³).'
      );
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-teal-400 font-bold uppercase tracking-wider">
              <span>Official Cambridge Coursebook & Skills Workbooks</span>
              <span>·</span>
              <span>IGCSE 0620 Masterclass</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {mode === 'mn' ? 'Кэмбрижийн Шалгалтын ур чадварын сан' : 'Cambridge Exam Skills & Language Toolkit'}
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setActiveTab('command_words')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'command_words'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {mode === 'mn' ? 'Заавар үгс (Command Words)' : 'Command Words'}
            </button>
            <button
              onClick={() => setActiveTab('reading_scales')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'reading_scales'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {mode === 'mn' ? 'Хэмжилт ба Хотгор (Meniscus)' : 'Reading Scales (Meniscus)'}
            </button>
            <button
              onClick={() => setActiveTab('language_skills')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'language_skills'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {mode === 'mn' ? 'Англи хэлний бичвэр' : 'Scientific English'}
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {mode === 'mn'
            ? 'Кэмбрижийн шалгалтад өндөр оноо авахад химийн мэдлэгээс гадна шалгалтын заавар үгсийг ягштал ойлгох, хэмжилтийн алдаагүй унших, шинжлэх ухааны бичвэрийг зөв найруулах зайлшгүй шаардлагатай.'
            : 'Master official Cambridge command words, precision meniscus reading for Paper 6, and scientific cause-and-effect sentence structures from the Cambridge Skills Workbooks.'}
        </p>
      </div>

      {activeTab === 'command_words' && (
        /* COMMAND WORDS GLOSSARY */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMMAND_WORDS.map(cw => (
            <div key={cw.word} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-base font-extrabold text-emerald-700 dark:text-cyan-300 font-mono">
                  {cw.word}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                  Cambridge Criterion
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {mode === 'mn' ? 'Шаардлага:' : 'Expectation:'}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-200 leading-relaxed">
                  <ChemText>{mode === 'mn' ? cw.definitionMn : cw.definitionEn}</ChemText>
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 text-[11px] space-y-1">
                <span className="font-semibold text-slate-500 dark:text-slate-400 block font-mono">
                  {mode === 'mn' ? 'Шалгалтын жишээ:' : 'Example Exam Phrasing:'}
                </span>
                <p className="text-slate-700 dark:text-slate-300 italic">
                  "<ChemText>{mode === 'mn' ? cw.exampleMn : cw.exampleEn}</ChemText>"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reading_scales' && (
        /* READING SCALES & MENISCUS INTERACTIVE TRAINER */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center space-y-4 shadow-sm">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block font-mono">
              Burette Scale Diagram (Eye Level)
            </span>

            {/* SVG Burette Tube with curved meniscus */}
            <div className="w-52 h-72 bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-600 rounded-xl relative p-4 flex flex-col justify-between">
              <svg className="w-full h-full" viewBox="0 0 160 220">
                {/* Tube outline */}
                <rect x="40" y="10" width="80" height="200" fill="#f8fafc" stroke="#64748b" strokeWidth="2" rx="4" className="dark:fill-slate-900" />

                {/* Burette ticks (from 24 to 25 cm³) */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
                  const y = 30 + i * 16;
                  const isMajor = i % 5 === 0;
                  return (
                    <g key={i}>
                      <line
                        x1={isMajor ? 40 : 50}
                        y1={y}
                        x2={70}
                        y2={y}
                        stroke="#64748b"
                        strokeWidth={isMajor ? 1.5 : 1}
                      />
                      {isMajor && (
                        <text x="32" y={y + 3} fill="#475569" fontSize="9" textAnchor="end" fontFamily="monospace" className="dark:fill-slate-300">
                          {24 + i / 10}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Liquid fill */}
                <path
                  d="M 41 86 Q 80 94 119 86 L 119 209 L 41 209 Z"
                  fill="rgba(6, 182, 212, 0.25)"
                />
                {/* Curved Meniscus line */}
                <path
                  d="M 40 86 Q 80 94 120 86"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  fill="none"
                />

                {/* Eye level sight line */}
                <line x1="80" y1="94" x2="155" y2="94" stroke="#f43f5e" strokeDasharray="3,3" strokeWidth="1.5" />
                <circle cx="80" cy="94" r="3" fill="#f43f5e" />
                <text x="145" y="90" fill="#f43f5e" fontSize="8" textAnchor="end" fontWeight="bold">
                  Bottom of Meniscus
                </text>
              </svg>
            </div>

            <div className="text-center text-xs text-slate-500">
              Figure 2.14: Reading burette at the bottom of the meniscus to two decimal places (±0.05 cm³).
            </div>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 text-xs shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
              {mode === 'mn' ? 'Хотгор унших интерактив дасгал' : 'Practice Reading Meniscus'}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {mode === 'mn'
                ? 'Зүүн талын бюреткийн заалтыг харж шингэний хотгорын доод ирмэгээр уншин утгаа оруулна уу (жишээ: 24.35):'
                : 'Inspect the diagram on the left. Enter the burette reading to two decimal places at the bottom of the meniscus:'}
            </p>

            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.05"
                placeholder="e.g. 24.35"
                value={meniscusGuess}
                onChange={e => setMeniscusGuess(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-2 text-xs font-mono"
              />
              <button
                onClick={checkMeniscus}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shrink-0"
              >
                Check
              </button>
            </div>

            {meniscusFeedback && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-cyan-950/40 border border-emerald-200 dark:border-cyan-800 text-emerald-800 dark:text-cyan-200 text-xs leading-relaxed">
                {meniscusFeedback}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
              <span className="font-bold text-amber-700 dark:text-amber-300 block font-mono">
                {mode === 'mn' ? 'Кэмбрижийн албан ёсны 3 алхам:' : 'Cambridge 3 Essential Rules:'}
              </span>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                <li>Always position eyes horizontally level with the liquid surface to avoid parallax error.</li>
                <li>Read from the <strong>bottom</strong> of the meniscus curve for water and aqueous solutions.</li>
                <li>Burettes read from top (0.00 cm³) to bottom (50.00 cm³), increasing downwards!</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'language_skills' && (
        /* SCIENTIFIC ENGLISH LANGUAGE SKILLS */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-sm">
            <span className="font-bold text-emerald-700 dark:text-teal-300 uppercase tracking-wider block font-mono">
              1. Cause and Consequence Connectives
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              In Paper 4, examiners look for precise logical linkers. Use:
            </p>
            <div className="space-y-2 pt-1 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-emerald-700 dark:text-teal-400 font-bold">because / as: </span>
                <span className="text-slate-700 dark:text-slate-300">"The rate increases <em>because</em> particles collide more frequently."</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-emerald-700 dark:text-teal-400 font-bold">therefore / consequently: </span>
                <span className="text-slate-700 dark:text-slate-300">"Ions are fixed in solid; <em>therefore</em> solid NaCl cannot conduct."</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-emerald-700 dark:text-teal-400 font-bold">which suggests that: </span>
                <span className="text-slate-700 dark:text-slate-300">"The solution turns blue, <em>which suggests that</em> copper(II) ions formed."</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-sm">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block font-mono">
              2. Passive Voice in Laboratory Reports
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              In scientific procedures (Paper 6), write using the past passive voice instead of personal pronouns:
            </p>
            <div className="space-y-2 pt-1 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-300">
                ❌ Avoid: "I added 25 cm³ of acid and then I heated the beaker."
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                ✔ Use: "25 cm³ of acid <strong>was added</strong> and the mixture <strong>was heated</strong> gently."
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
