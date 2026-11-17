import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { saveProgrammeChapters, useProgrammeChapters, type EnrollmentProgramme } from '../lib/cloud';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { visibleChapters } from '../data/alevelSyllabus';

// The chapters of a programme, for opening or closing them for every student or for chosen students
export const chaptersOfProgramme = (p: EnrollmentProgramme) => (p === 'igcse' ? CURRICULUM_CHAPTERS : visibleChapters(ALEVEL_CHAPTERS, p));

const PROGRAMMES: { id: EnrollmentProgramme; label: string }[] = [
  { id: 'igcse', label: 'IGCSE 0620' },
  { id: 'as', label: 'AS Level 9701' },
  { id: 'a', label: 'A Level 9701' }
];

type Mode = 'default' | 'open' | 'closed';
const MODES: { id: Mode; mn: string; en: string; on: string }[] = [
  { id: 'default', mn: 'Ердийн', en: 'Usual', on: 'border-slate-600 bg-slate-600 text-white' },
  { id: 'open', mn: 'Нээлттэй', en: 'Open', on: 'border-emerald-600 bg-emerald-600 text-white' },
  { id: 'closed', mn: 'Хаалттай', en: 'Closed', on: 'border-rose-600 bg-rose-600 text-white' }
];

// The teacher's choice, for every student of one programme, of which chapters are open and which are closed (lib/
// programmeChapters). It applies to the students enrolled now and to those who join later; a choice made for one student on
// this page wins over it. Folded, it says what is open and closed in the programme chosen.
export const ProgrammeChapterPanel: React.FC<{ mn: boolean }> = ({ mn }) => {
  const { courseChoice } = useApp();
  const [programme, setProgramme] = useState<EnrollmentProgramme>(courseChoice);
  const state = useProgrammeChapters(programme, true);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const chapters = chaptersOfProgramme(programme);
  const label = PROGRAMMES.find(p => p.id === programme)?.label ?? programme;

  const modeOf = (id: string): Mode => (state.closed.includes(id) ? 'closed' : state.open.includes(id) ? 'open' : 'default');
  const numbersOf = (ids: string[]) => chapters.filter(c => ids.includes(c.id)).map(c => c.number).join(', ') || '—';

  // Saves the programme's whole choice with these chapters set to one mode
  const choose = async (ids: string[], mode: Mode) => {
    const open = state.open.filter(id => !ids.includes(id));
    const closed = state.closed.filter(id => !ids.includes(id));
    if (mode === 'open') open.push(...ids);
    if (mode === 'closed') closed.push(...ids);
    setBusy(true);
    setNote(null);
    try {
      await saveProgrammeChapters(programme, { open, closed });
      const what = MODES.find(m => m.id === mode)!;
      setNote({
        ok: true,
        text:
          ids.length === 1
            ? mn
              ? `${label}: ${numbersOf(ids)}-р бүлэг «${what.mn}» боллоо.`
              : `${label}: chapter ${numbersOf(ids)} is now "${what.en}".`
            : mn
              ? `${label}: бүх бүлэг «${what.mn}» боллоо.`
              : `${label}: every chapter is now "${what.en}".`
      });
    } catch (e) {
      const code = String((e as { code?: string }).code ?? (e as Error).message);
      setNote({
        ok: false,
        text: mn
          ? `Хадгалж чадсангүй (${code}). Firestore-ийн шинэ дүрэм нийтлэгдээгүй байж магадгүй.`
          : `Could not save (${code}). The new Firestore rules may not be published yet.`
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <details className="group rounded-xl border-2 border-emerald-500 bg-white">
      <summary className="flex cursor-pointer list-none items-start gap-2 px-4 py-3 [&::-webkit-details-marker]:hidden">
        <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 transition-transform group-open:rotate-180" aria-hidden="true" />
        <span className="min-w-0">
          <span className="block text-sm font-black text-slate-900">
            {mn ? '🔓 Бүх сурагчид: бүлэг нээх, хаах' : '🔓 Every student: open or close chapters'}
          </span>
          <span className="block text-xs text-slate-600">
            {mn
              ? `${label} · Нээлттэй: ${numbersOf(state.open)} · Хаалттай: ${numbersOf(state.closed)}${state.saved ? '' : ' (анхны тохиргоо)'}`
              : `${label} · Open: ${numbersOf(state.open)} · Closed: ${numbersOf(state.closed)}${state.saved ? '' : ' (default)'}`}
          </span>
        </span>
      </summary>

      <div className="space-y-3 border-t border-emerald-200 px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          {PROGRAMMES.map(p => (
            <button
              key={p.id}
              type="button"
              aria-pressed={programme === p.id}
              onClick={() => {
                setProgramme(p.id);
                setNote(null);
              }}
              className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${
                programme === p.id ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-400 bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <p className="max-w-3xl text-xs leading-relaxed text-slate-600">
          {mn
            ? 'Энд сонгосон нь тухайн хөтөлбөрийн бүх сурагчид, дараа элсэх сурагчдад ч шууд мөрдөгдөнө. Ердийн: хичээл дарааллаараа нээгдэнэ (өмнөх хичээлийн гарах билетээс 60%-иас дээш авбал дараагийнх нь). Нээлттэй: бүлгийн бүх хичээл, сэдэв шууд нээгдэнэ. Хаалттай: бүлэг бүхэлдээ түгжигдэнэ. Доор нэг сурагчид тусад нь сонгосон нь үүнээс давуу.'
            : 'What you choose here applies at once to every student of the programme, and to those who join later. Usual: the lessons open in order (each once the exit ticket before it is above 60%). Open: every lesson and topic of the chapter opens at once. Closed: the whole chapter is locked. A choice made below for one student wins over this.'}
        </p>

        {state.error && (
          <p className="text-xs font-bold text-amber-700">
            {mn
              ? `Хадгалсан тохиргоог уншиж чадсангүй (${state.error}); анхны тохиргоог харуулж байна.`
              : `Could not read the saved choice (${state.error}); the default is shown.`}
          </p>
        )}

        <div className="divide-y divide-slate-200 rounded-lg border border-slate-300">
          {chapters.map(ch => {
            const mode = modeOf(ch.id);
            return (
              <div key={ch.id} className="flex flex-wrap items-center gap-2 px-3 py-1.5">
                <span className="min-w-0 flex-1 text-xs font-bold text-slate-800">
                  {ch.number}. {mn ? ch.titleMn : ch.titleEn}
                </span>
                <span className="inline-flex overflow-hidden rounded-lg border border-slate-300" role="group" aria-label={`${ch.number}`}>
                  {MODES.map(m => (
                    <button
                      key={m.id}
                      type="button"
                      disabled={busy}
                      aria-pressed={mode === m.id}
                      onClick={() => mode !== m.id && choose([ch.id], m.id)}
                      className={`border-l px-2.5 py-1 text-[11px] font-bold first:border-l-0 disabled:opacity-60 ${
                        mode === m.id ? m.on : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {mn ? m.mn : m.en}
                    </button>
                  ))}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={busy || (state.open.length === 0 && state.closed.length === 0)}
            onClick={() => choose(chapters.map(c => c.id), 'default')}
            className="rounded-lg border border-slate-400 px-2.5 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-200 disabled:opacity-50"
          >
            {mn ? 'Бүгдийг ердийн болгох' : 'Set every chapter to usual'}
          </button>
          {note && <span className={`text-xs font-bold ${note.ok ? 'text-emerald-800' : 'text-rose-700'}`}>{note.text}</span>}
        </div>
      </div>
    </details>
  );
};
