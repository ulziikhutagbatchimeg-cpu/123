import React, { useRef, useState } from 'react';
import { ArrowRight, Check, RotateCcw, Send, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { recordActivity } from '../lib/activity';
import { labQuestions, type LabKey, type LabQuestion } from '../data/labChecks';

// A virtual lab in a frame, with a short submit under it. While the student works, the page counts what they do inside the
// lab (the frame is on the site's own address, so it can be read): the controls they use and the parts (tabs) they open.
// "Submit" asks two quick questions on what the lab showed, then scores the work out of 100 with a three-line rubric:
//   tried it themselves (30) · looked at its parts (20) · the two questions (50).
// The score is saved with the student's other results for the teacher, and "Next step" moves the lesson on.
const TRY_FOR_FULL = 8; // uses of the lab's controls that earn the whole "tried it" line
const PARTS_FOR_FULL = 3; // parts (tabs) opened that earn the whole "looked at its parts" line, or all of them if fewer
const W = { tried: 30, seen: 20, questions: 50 };

type Bi = { en: string; mn: string };
// What a lesson passes to a lab inside one of its steps: how to move on once the lab is scored
export interface LabNext {
  onDone?: () => void; // moves the lesson to its next step; absent outside a lesson or when the next step is locked
  nextHint?: string; // said instead of the button when the next step is locked
}
interface Track {
  uses: number;
  seen: Set<string>;
  countTabs: () => number;
  blind: boolean; // the frame could not be read: the student is not marked down for it
  lastInput: number;
}

// The options of a question in a fixed order of its own, so the right answer is not always in the same place
const orderOf = (q: LabQuestion): number[] => {
  const n = q.options.length;
  let h = 0;
  for (const ch of q.q.en) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const shift = h % n;
  return Array.from({ length: n }, (_, i) => (i + shift) % n);
};

export const LabFrame: React.FC<
  {
    src: string;
    title: Bi;
    height: string;
    check: LabKey;
    part?: number;
    mn: boolean;
    frameKey?: string;
    className?: string;
  } & LabNext
> = ({ src, title, height, check, part = 1, mn, frameKey, className, onDone, nextHint }) => {
  const { courseChoice } = useApp();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const track = useRef<Track>({ uses: 0, seen: new Set(), countTabs: () => 0, blind: true, lastInput: 0 });
  const [stage, setStage] = useState<'work' | 'quiz' | 'done'>('work');
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [result, setResult] = useState<{ tried: number; seen: number; right: number; total: number; parts: [number, number] } | null>(null);
  const questions = labQuestions(check, part);
  const t = (en: string, m: string) => (mn ? m : en);

  // Each time the lab loads, start counting afresh inside it
  const onLoad = () => {
    const tr: Track = { uses: 0, seen: new Set(), countTabs: () => 0, blind: true, lastInput: 0 };
    track.current = tr;
    let doc: Document | null = null;
    try {
      doc = frameRef.current?.contentDocument ?? null;
    } catch {
      doc = null;
    }
    if (!doc) return;
    tr.blind = false;
    const win = doc.defaultView;
    const tabs = () =>
      [...doc!.querySelectorAll<HTMLElement>('[role="tab"]')].filter(el => !el.hidden && win?.getComputedStyle(el).display !== 'none');
    tr.countTabs = () => tabs().length;
    tabs().forEach(el => {
      if (el.getAttribute('aria-selected') === 'true') tr.seen.add(el.id || el.textContent || '');
    });
    doc.addEventListener(
      'pointerdown',
      e => {
        const target = e.target as Element | null;
        const tab = target?.closest?.('[role="tab"]') as HTMLElement | null;
        if (tab) tr.seen.add(tab.id || tab.textContent || '');
        if (target?.closest?.('button, input, select, canvas, label, a, [role="tab"], .el')) tr.uses += 1;
      },
      true
    );
    // A slider sends many input events while it moves: one use per short while
    doc.addEventListener(
      'input',
      () => {
        const now = Date.now();
        if (now - tr.lastInput > 400) {
          tr.uses += 1;
          tr.lastInput = now;
        }
      },
      true
    );
  };

  const score = () => {
    const tr = track.current;
    const tabs = Math.min(tr.countTabs(), PARTS_FOR_FULL);
    const triedShare = tr.blind ? 1 : Math.min(1, tr.uses / TRY_FOR_FULL);
    const seenShare = tr.blind ? 1 : tabs <= 1 ? (tr.uses > 0 ? 1 : 0) : Math.min(1, tr.seen.size / tabs);
    const right = questions.filter((q, i) => picked[i] === q.answer).length;
    const tried = Math.round(triedShare * W.tried);
    const seen = Math.round(seenShare * W.seen);
    const qPoints = questions.length ? Math.round((right / questions.length) * W.questions) : W.questions;
    const total = Math.min(100, tried + seen + qPoints);
    setResult({ tried, seen, right, total, parts: [tabs <= 1 ? 1 : Math.min(tr.seen.size, tabs), Math.max(tabs, 1)] });
    setStage('done');
    recordActivity({
      kind: 'practice',
      course: courseChoice,
      percent: total,
      label: { en: `Virtual lab: ${title.en}`, mn: `Виртуал лаб: ${title.mn}` }
    });
  };

  const again = () => {
    setPicked({});
    setResult(null);
    setStage('work');
  };

  const allAnswered = questions.every((_, i) => picked[i] !== undefined);
  const praise = (p: number) =>
    p >= 90 ? t('Excellent!', 'Маш сайн!') : p >= 70 ? t('Well done!', 'Сайн байна!') : t('Try the lab once more and submit again.', 'Лабаа дахин туршаад, дахин илгээгээрэй.');

  return (
    <div className="space-y-2">
      <iframe
        key={frameKey ?? src}
        ref={frameRef}
        src={src}
        title={mn ? title.mn : title.en}
        loading="lazy"
        onLoad={onLoad}
        className={className ?? `w-full ${height} rounded-2xl border border-slate-200 bg-white`}
      />

      <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 text-sm text-slate-800">
        {stage === 'work' && (
          <div className="flex flex-wrap items-center gap-2">
            <span>{t('Finished the lab? Submit it to get your score.', 'Лабаа хийж дуусаад илгээгээрэй, оноо тань гарна.')}</span>
            <button type="button" onClick={() => setStage('quiz')} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-violet-500">
              <Send className="h-3.5 w-3.5" aria-hidden="true" /> {t('Submit', 'Илгээх')}
            </button>
          </div>
        )}

        {stage === 'quiz' && (
          <div className="space-y-3">
            <div className="text-xs font-bold text-violet-800">{t('Two quick questions on what you saw', 'Ажигласан зүйлээсээ 2 богино асуулт')}</div>
            {questions.map((q, i) => (
              <div key={i} className="space-y-1.5">
                <div className="font-bold">{i + 1}. {mn ? q.q.mn : q.q.en}</div>
                <div className="flex flex-wrap gap-1.5">
                  {orderOf(q).map(o => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setPicked(prev => ({ ...prev, [i]: o }))}
                      aria-pressed={picked[i] === o}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${picked[i] === o ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300 bg-white text-slate-800 hover:border-violet-400'}`}
                    >
                      {mn ? q.options[o].mn : q.options[o].en}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" disabled={!allAnswered} onClick={score} className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-violet-500 disabled:opacity-40">
                <Check className="h-3.5 w-3.5" aria-hidden="true" /> {t('See my score', 'Дүнгээ харах')}
              </button>
              <button type="button" onClick={() => setStage('work')} className="text-xs font-bold text-slate-600 hover:underline">
                {t('Back to the lab', 'Лаб руу буцах')}
              </button>
            </div>
          </div>
        )}

        {stage === 'done' && result && (
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-extrabold text-violet-800">{result.total}%</span>
              <span className="font-bold">{praise(result.total)}</span>
            </div>
            <table className="w-full max-w-md text-xs">
              <tbody>
                <tr><td className="py-0.5">{t('Tried the lab yourself', 'Өөрөө туршсан')}</td><td className="py-0.5 text-right font-mono">{result.tried} / {W.tried}</td></tr>
                <tr><td className="py-0.5">{t(`Looked at its parts (${result.parts[0]} of ${result.parts[1]})`, `Хэсгүүдийг үзсэн (${result.parts[1]}-ээс ${result.parts[0]})`)}</td><td className="py-0.5 text-right font-mono">{result.seen} / {W.seen}</td></tr>
                <tr><td className="py-0.5">{t(`Questions (${result.right} of ${questions.length} right)`, `Асуулт (${questions.length}-оос ${result.right} зөв)`)}</td><td className="py-0.5 text-right font-mono">{result.total - result.tried - result.seen} / {W.questions}</td></tr>
              </tbody>
            </table>
            {questions.some((q, i) => picked[i] !== q.answer) && (
              <ul className="space-y-0.5 text-xs text-slate-700">
                {questions.map((q, i) =>
                  picked[i] === q.answer ? null : (
                    <li key={i} className="flex gap-1.5">
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-600" aria-hidden="true" />
                      <span>{mn ? q.q.mn : q.q.en} → <b>{mn ? q.options[q.answer].mn : q.options[q.answer].en}</b></span>
                    </li>
                  )
                )}
              </ul>
            )}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {onDone ? (
                <button type="button" onClick={onDone} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500">
                  {t('Next step', 'Дараагийн алхам')} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : nextHint ? (
                <span className="text-xs text-slate-600">{nextHint}</span>
              ) : null}
              <button type="button" onClick={again} className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:underline">
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> {t('Try again', 'Дахин хийх')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
