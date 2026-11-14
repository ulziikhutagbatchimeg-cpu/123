import React, { useState } from 'react';
import { PASS_ABOVE, type ChapterRow, type Checklist, type LessonRow } from '../lib/chapterChecklist';

// The checklist of a programme as a table, chapter by chapter, ticked by itself from what the site recorded (lib/chapterChecklist).
// Above it, what keeps the next lesson closed, named part by part. A chapter opens into its lessons (each lesson's parts and
// exit ticket), its end-of-topic tests and its self-check. The student sees it under My progress; the teacher sees the same
// table for each student in the Student record.

type Bi = { en: string; mn: string };

const STATUS: Record<ChapterRow['status'], { mn: string; en: string; tone: string }> = {
  done: { mn: '✅ Дууссан', en: '✅ Done', tone: 'text-emerald-700' },
  doing: { mn: '🟡 Явагдаж буй', en: '🟡 In progress', tone: 'text-amber-700' },
  todo: { mn: '⚪ Эхлээгүй', en: '⚪ Not started', tone: 'text-slate-500' },
  locked: { mn: '🔒 Түгжээтэй', en: '🔒 Locked', tone: 'text-slate-400' }
};

// A count cell: ticked and green when all are done, amber when some are, grey when none; a dash when there is nothing to do
const Count: React.FC<{ done: number; total: number }> = ({ done, total }) => {
  if (total === 0) return <span className="text-slate-400">—</span>;
  const tone = done >= total ? 'bg-emerald-100 text-emerald-800' : done > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600';
  return (
    <span className={`inline-block min-w-[3.5rem] text-center px-1.5 py-0.5 rounded font-bold ${tone}`}>
      {done >= total ? '✓ ' : ''}
      {done}/{total}
    </span>
  );
};

const Tick: React.FC<{ done: boolean }> = ({ done }) => (
  <span className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-black ${done ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-400 text-transparent'}`}>
    ✓
  </span>
);

// The exit ticket of a lesson as one line: passed, taken but below the pass mark, or not taken
const exitLine = (r: LessonRow, mn: boolean): { text: string; done: boolean } =>
  r.passed
    ? { text: mn ? `Гарах билет ${Math.round(r.score ?? 0)}% — давсан` : `Exit ticket ${Math.round(r.score ?? 0)}% — passed`, done: true }
    : r.score !== null
      ? { text: mn ? `Гарах билетээ ${PASS_ABOVE}%-иас дээш авах (одоо ${Math.round(r.score)}%)` : `Get the exit ticket above ${PASS_ABOVE}% (now ${Math.round(r.score)}%)`, done: false }
      : { text: mn ? `Гарах билетээ өгч ${PASS_ABOVE}%-иас дээш авах` : `Take the exit ticket and get above ${PASS_ABOVE}%`, done: false };

const t = (b: Bi, mn: boolean) => (mn ? b.mn : b.en);

export const ChapterChecklist: React.FC<{
  checklist: Checklist;
  mn: boolean;
  teacher?: boolean; // the wording speaks about the student instead of to them
  onGo?: (chapter: ChapterRow) => void; // a button that opens the chapter's lessons (the student's own view)
}> = ({ checklist, mn, teacher = false, onGo }) => {
  const [open, setOpen] = useState<string | null>(() => checklist.next?.chapter.chapterId ?? null);
  const next = checklist.next;

  return (
    <div className="space-y-3">
      {/* What keeps the next lesson closed, part by part */}
      {next && (
        <div className={`rounded-xl border-2 p-3 sm:p-4 space-y-2 ${next.blocking ? 'border-amber-400 bg-amber-50' : 'border-sky-300 bg-sky-50'}`}>
          <div className="text-sm font-black text-slate-900">
            {next.blocking
              ? teacher
                ? mn ? '🔒 Дараагийн хичээл нээгдэхийн тулд энэ сурагч хийх ёстой:' : '🔒 To open the next lesson, this student must do:'
                : mn ? '🔒 Дараагийн хичээл нээгдэхийн тулд хийх ажил:' : '🔒 To open the next lesson, do:'
              : teacher
                ? mn ? '➡️ Дараагийн хийх ажил:' : '➡️ Next to do:'
                : mn ? '➡️ Дараа нь хийх:' : '➡️ Next to do:'}
          </div>
          <div className="text-xs font-bold text-slate-700">
            {next.chapter.number}. {t(next.chapter.title, mn)}
            {next.lesson && ` · ${t(next.lesson.def.code, mn)} ${next.lesson.def.code.en.startsWith('L') ? `· ${t(next.lesson.def.title, mn)}` : ''}`}
          </div>
          <ul className="space-y-1">
            {next.lesson ? (
              <>
                {next.lesson.parts.map(p => (
                  <li key={p.id} className={`flex items-center gap-2 text-xs ${p.done ? 'text-slate-500 line-through' : 'text-slate-900 font-bold'}`}>
                    <Tick done={p.done} />
                    {t(p.label, mn)}
                  </li>
                ))}
                <li className={`flex items-center gap-2 text-xs ${next.lesson.passed ? 'text-slate-500 line-through' : 'text-slate-900 font-bold'}`}>
                  <Tick done={next.lesson.passed} />
                  {exitLine(next.lesson, mn).text}
                </li>
              </>
            ) : (
              <>
                {next.chapter.topics.filter(x => !x.passed).map(x => (
                  <li key={x.id} className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Tick done={false} />
                    {mn ? `${x.label.mn} — сэдвийн шалгалтаа ${PASS_ABOVE}%-иас дээш өгөх` : `${x.label.en} — pass the end-of-topic test above ${PASS_ABOVE}%`}
                  </li>
                ))}
                {next.chapter.lo && next.chapter.lo.rated < next.chapter.lo.total && (
                  <li className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Tick done={false} />
                    {mn ? `Сурах зорилтоо бүгдийг үнэлэх (${next.chapter.lo.rated}/${next.chapter.lo.total})` : `Rate every objective (${next.chapter.lo.rated}/${next.chapter.lo.total})`}
                  </li>
                )}
                {next.chapter.kw && next.chapter.kw.rated < next.chapter.kw.total && (
                  <li className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Tick done={false} />
                    {mn ? `Түлхүүр үгээ бүгдийг үнэлэх (${next.chapter.kw.rated}/${next.chapter.kw.total})` : `Rate every key word (${next.chapter.kw.rated}/${next.chapter.kw.total})`}
                  </li>
                )}
              </>
            )}
          </ul>
          {onGo && (
            <button
              type="button"
              onClick={() => onGo(next.chapter)}
              className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-500"
            >
              {mn ? 'Хичээл рүү очих' : 'Go to the lesson'}
            </button>
          )}
        </div>
      )}

      <p className="text-xs text-slate-700">
        {mn
          ? `${checklist.chapters.length} бүлгээс ${checklist.doneChapters} дууссан · ${checklist.itemsLeft} ажил үлдсэн. Хийсэн ажил өөрөө ✓ болно. Бүлэг дээр дарж дэлгэрэнгүйг харна.`
          : `${checklist.doneChapters} of ${checklist.chapters.length} chapters done · ${checklist.itemsLeft} items left. Each item ticks itself when done. Click a chapter for the details.`}
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white">
        <table className="w-full border-collapse text-xs">
          <thead className="bg-slate-100 border-b border-slate-300">
            <tr>
              {(mn
                ? ['Бүлэг', `Хичээл (${PASS_ABOVE}%+)`, 'Сурах зорилт', 'Түлхүүр үг', `Сэдвийн шалгалт (${PASS_ABOVE}%+)`, 'Төлөв']
                : ['Chapter', `Lessons (${PASS_ABOVE}%+)`, 'Objectives', 'Key words', `Topic tests (${PASS_ABOVE}%+)`, 'Status']
              ).map(h => (
                <th key={h} className="px-2 py-2 text-left text-[11px] font-bold text-slate-600 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {checklist.chapters.map(ch => {
              const isOpen = open === ch.chapterId;
              const st = STATUS[ch.status];
              return (
                <React.Fragment key={ch.chapterId}>
                  <tr
                    onClick={() => setOpen(isOpen ? null : ch.chapterId)}
                    className={`border-b border-slate-200 cursor-pointer ${isOpen ? 'bg-violet-50' : 'hover:bg-slate-50'} ${ch.status === 'locked' ? 'opacity-70' : ''}`}
                  >
                    <td className="px-2 py-2 font-bold text-slate-900">
                      <span className="mr-1 text-slate-400">{isOpen ? '▼' : '▶'}</span>
                      {ch.number}. {t(ch.title, mn)}
                    </td>
                    <td className="px-2 py-2"><Count done={ch.lessons.filter(r => r.passed).length} total={ch.lessons.length} /></td>
                    <td className="px-2 py-2"><Count done={ch.lo?.rated ?? 0} total={ch.lo?.total ?? 0} /></td>
                    <td className="px-2 py-2"><Count done={ch.kw?.rated ?? 0} total={ch.kw?.total ?? 0} /></td>
                    <td className="px-2 py-2"><Count done={ch.topics.filter(x => x.passed).length} total={ch.topics.length} /></td>
                    <td className={`px-2 py-2 font-bold whitespace-nowrap ${st.tone}`}>{mn ? st.mn : st.en}</td>
                  </tr>
                  {isOpen && (
                    <tr className="border-b border-slate-200 bg-slate-50/60">
                      <td colSpan={6} className="px-3 py-3">
                        <ChapterDetail ch={ch} mn={mn} onGo={onGo} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// One chapter opened: each lesson with its parts and exit ticket, the end-of-topic tests and the self-check
const ChapterDetail: React.FC<{ ch: ChapterRow; mn: boolean; onGo?: (chapter: ChapterRow) => void }> = ({ ch, mn, onGo }) => (
  <div className="space-y-3">
    {ch.lessons.length > 0 && (
      <div className="space-y-2">
        <div className="text-[11px] font-black uppercase tracking-wide text-slate-500">{mn ? 'Хичээлүүд' : 'Lessons'}</div>
        {ch.lessons.map(r => {
          const exit = exitLine(r, mn);
          return (
            <div key={r.def.key} className={`rounded-lg border p-2 ${r.passed ? 'border-emerald-300 bg-emerald-50/60' : r.open ? 'border-amber-300 bg-white' : 'border-slate-200 bg-slate-100'}`}>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-900">
                <span>{r.passed ? '✅' : r.open ? '▶️' : '🔒'}</span>
                <span>{t(r.def.code, mn)}</span>
                {r.def.code.en.startsWith('L') && <span className="font-normal text-slate-700">{t(r.def.title, mn)}</span>}
                <span className="ml-auto font-mono">{r.score !== null ? `${Math.round(r.score)}%` : '—'}</span>
              </div>
              {!r.open ? (
                <p className="mt-1 text-[11px] text-slate-500">
                  {mn ? 'Өмнөх хичээлээ давсны дараа нээгдэнэ.' : 'Opens once the lesson before it is passed.'}
                </p>
              ) : (
                <ul className="mt-1.5 grid gap-1 sm:grid-cols-2">
                  {r.parts.map(p => (
                    <li key={p.id} className={`flex items-center gap-1.5 text-[11px] ${p.done ? 'text-slate-500' : 'text-slate-900 font-bold'}`}>
                      <Tick done={p.done || r.passed} />
                      {t(p.label, mn)}
                    </li>
                  ))}
                  <li className={`flex items-center gap-1.5 text-[11px] ${exit.done ? 'text-slate-500' : 'text-slate-900 font-bold'}`}>
                    <Tick done={exit.done} />
                    {exit.text}
                  </li>
                </ul>
              )}
            </div>
          );
        })}
      </div>
    )}
    {ch.topics.length > 0 && (
      <div className="space-y-1">
        <div className="text-[11px] font-black uppercase tracking-wide text-slate-500">
          {mn ? `Сэдвийн шалгалт (${PASS_ABOVE}%-иас дээш)` : `End-of-topic tests (above ${PASS_ABOVE}%)`}
        </div>
        <ul className="grid gap-1 sm:grid-cols-2">
          {ch.topics.map(x => (
            <li key={x.id} className={`flex items-center gap-1.5 text-[11px] ${x.passed ? 'text-slate-500' : 'text-slate-900 font-bold'}`}>
              <Tick done={x.passed} />
              {t(x.label, mn)}
            </li>
          ))}
        </ul>
      </div>
    )}
    {(ch.lo || ch.kw) && (
      <div className="space-y-1">
        <div className="text-[11px] font-black uppercase tracking-wide text-slate-500">{mn ? 'Өөрийн үнэлгээ' : 'Self-check'}</div>
        <ul className="space-y-1">
          {ch.lo && (
            <li className="flex items-center gap-1.5 text-[11px] text-slate-900">
              <Tick done={ch.lo.rated >= ch.lo.total} />
              {mn ? `Сурах зорилт: ${ch.lo.rated}/${ch.lo.total} үнэлсэн (✓ Чадна ${ch.lo.can})` : `Objectives: ${ch.lo.rated}/${ch.lo.total} rated (✓ I can ${ch.lo.can})`}
            </li>
          )}
          {ch.kw && (
            <li className="flex items-center gap-1.5 text-[11px] text-slate-900">
              <Tick done={ch.kw.rated >= ch.kw.total} />
              {mn ? `Түлхүүр үг: ${ch.kw.rated}/${ch.kw.total} үнэлсэн (✓ Чадна ${ch.kw.can})` : `Key words: ${ch.kw.rated}/${ch.kw.total} rated (✓ I can ${ch.kw.can})`}
            </li>
          )}
        </ul>
      </div>
    )}
    {onGo && ch.status !== 'locked' && (
      <button type="button" onClick={() => onGo(ch)} className="px-3 py-1.5 rounded-lg border border-violet-400 bg-white text-xs font-bold text-violet-800 hover:bg-violet-50">
        {mn ? 'Энэ бүлгийн хичээл рүү очих' : 'Go to this chapter’s lessons'}
      </button>
    )}
  </div>
);
