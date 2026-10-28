import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import { ALEVEL_CHAPTERS } from '../data/alevelCurriculum';
import { alevelCourse, visibleChapters } from '../data/alevelSyllabus';
import { courseQuestions } from '../data/courseScope';
import { MOCK_TESTS } from '../data/mockTests';
import { cambridgeGrade } from '../lib/grade';
import { loadRecentResults, loadStudentSummaries, saveResultFeedback, type StudentSummary } from '../lib/cloud';
import type { StoredResult, Tally } from '../lib/resultSync';

// The teacher writes feedback on lesson tickets, full tests and answered questions. Games and the escape room show results only.
const FEEDBACK_KINDS: StoredResult['kind'][] = ['exit', 'question', 'test'];

const HEAD = 'text-[10px] font-bold uppercase tracking-wider text-slate-400';

const pad = (n: number) => String(n).padStart(2, '0');
const dateText = (time: number) => {
  const d = new Date(time);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const percentOf = (t: Tally): number | null => (t.max > 0 ? Math.round((t.earned / t.max) * 100) : null);

// The teacher's comment on one result. It is saved on its own, so each result can be commented on in turn.
const FeedbackBox: React.FC<{ item: StoredResult; mn: boolean; onSave: (text: string) => Promise<void> }> = ({ item, mn, onSave }) => {
  const [text, setText] = useState(item.feedback ?? '');
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const save = () => {
    setBusy(true);
    setFailed(false);
    onSave(text.trim())
      .catch(() => setFailed(true))
      .finally(() => setBusy(false));
  };

  return (
    <div className="space-y-1.5">
      <textarea
        rows={2}
        maxLength={500}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={mn ? 'Сурагчид санал бичих...' : 'Write feedback for the student...'}
        className="w-full bg-slate-950 border border-slate-800 text-white rounded p-2 text-xs"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={save}
          disabled={busy || !text.trim() || text.trim() === (item.feedback ?? '')}
          className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold"
        >
          {mn ? 'Хадгалах' : 'Save feedback'}
        </button>
        {failed && <span className="text-[11px] text-rose-400">{mn ? 'Хадгалж чадсангүй' : 'Could not save'}</span>}
      </div>
    </div>
  );
};

// The teacher's view of each student's results in the programme on screen: totals, the exam results of every chapter, and the
// latest results with the teacher's feedback on them.
export const TeacherResults: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { courseChoice } = useApp();
  const [students, setStudents] = useState<StudentSummary[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [openUid, setOpenUid] = useState<string | null>(null);
  const [recent, setRecent] = useState<Record<string, StoredResult[]>>({});

  useEffect(() => {
    loadStudentSummaries()
      .then(list => setStudents(list))
      .catch(() => setFailed(true));
  }, []);

  const bank = useMemo(() => courseQuestions(courseChoice), [courseChoice]);
  const chapters = useMemo(
    () => (courseChoice === 'igcse' ? CURRICULUM_CHAPTERS : visibleChapters(ALEVEL_CHAPTERS, alevelCourse(courseChoice))),
    [courseChoice]
  );
  // The questions the app holds for each chapter; a chapter with none is shown as missing
  const bankCount = useMemo(
    () =>
      Object.fromEntries(
        chapters.map(ch => {
          const ids = new Set(ch.topics.map(t => t.id));
          return [ch.id, bank.filter(q => ids.has(q.topicId)).length];
        })
      ),
    [chapters, bank]
  );

  // Only the students who have sent results for this programme
  const rows = (students ?? []).filter(s => s.results[courseChoice]);

  const toggle = (uid: string) => {
    if (openUid === uid) {
      setOpenUid(null);
      return;
    }
    setOpenUid(uid);
    if (!recent[uid]) {
      loadRecentResults(uid)
        .then(list => setRecent(prev => ({ ...prev, [uid]: list })))
        .catch(() => setRecent(prev => ({ ...prev, [uid]: [] })));
    }
  };

  const saveFeedback = (uid: string, item: StoredResult, text: string) =>
    saveResultFeedback(uid, item.id, text).then(() =>
      setRecent(prev => ({
        ...prev,
        [uid]: (prev[uid] ?? []).map(r => (r.id === item.id ? { ...r, feedback: text, feedbackAt: new Date().toISOString() } : r))
      }))
    );

  const resultLabel = (r: StoredResult): string => {
    if (r.label) return mn ? r.label.mn : r.label.en;
    if (r.kind === 'test') {
      const test = MOCK_TESTS.find(t => t.id === r.testId);
      return test ? (mn ? test.titleMn : test.titleEn) : r.testId ?? '';
    }
    if (r.kind === 'question') {
      const q = bank.find(x => x.id === r.questionId);
      return q ? (mn ? q.titleMn : q.titleEn) : r.questionId ?? '';
    }
    return r.kind;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">{mn ? 'Сурагчдын үр дүн' : 'Student results'}</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          {mn
            ? 'Хөтөлбөр дээрх сурагч бүрийн дүн: хичээлийн шалгалт, дасгал, бүтэн шалгалт, тоглоом. Хичээлийн шалгалт, бүтэн шалгалт, асуултад санал бичиж болно. Тоглоом, escape room-д зөвхөн үр дүн харагдана.'
            : 'Each student’s results in the programme on screen: lesson tickets, practice, full tests and games. Feedback can be written on lesson tickets, full tests and answered questions. Games and the escape room show results only.'}
        </p>
      </div>

      {failed && (
        <p className="text-sm text-rose-400">{mn ? 'Үр дүнг ачаалж чадсангүй.' : 'Could not load the results.'}</p>
      )}

      {!failed && students === null ? (
        <p className="text-sm text-slate-400">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>
      ) : !failed && rows.length === 0 ? (
        <p className="text-sm text-slate-400">{mn ? 'Одоогоор үр дүн илгээсэн сурагч алга.' : 'No student has sent results yet.'}</p>
      ) : (
        <div className="space-y-2">
          {rows.map(s => {
            const sum = s.results[courseChoice];
            const open = openUid === s.uid;
            const list = recent[s.uid];
            return (
              <div key={s.uid} className="rounded-xl border border-slate-800 bg-slate-950/60">
                <button
                  type="button"
                  onClick={() => toggle(s.uid)}
                  aria-expanded={open}
                  className="w-full text-left p-3 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-white truncate">{s.name}</span>
                    <span className="shrink-0 text-[11px] text-slate-500 font-mono">{s.resultsAt ? dateText(Date.parse(s.resultsAt)) : ''}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-300">
                    <span>
                      {mn ? 'Хичээл' : 'Lessons'}: <b className="font-mono text-white">{sum.lessons.count}</b>
                      {sum.lessons.avg !== null && ` · ${sum.lessons.avg}%`}
                    </span>
                    <span>
                      {mn ? 'Асуулт' : 'Questions'}: <b className="font-mono text-white">{sum.questions.answered}</b>
                      {percentOf(sum.questions) !== null && ` · ${percentOf(sum.questions)}%`}
                    </span>
                    <span>
                      {mn ? 'Бүтэн шалгалт' : 'Full tests'}: <b className="font-mono text-white">{sum.tests.count}</b>
                      {sum.tests.avg !== null && ` · ${sum.tests.avg}%`}
                    </span>
                    <span>
                      {mn ? 'Тоглоом' : 'Games'}: <b className="font-mono text-white">{sum.games.count}</b>
                      {sum.games.avg !== null && ` · ${sum.games.avg}%`}
                    </span>
                  </div>
                </button>

                {open && (
                  <div className="px-3 pb-3 space-y-4">
                    <div className="space-y-1.5">
                      <div className={HEAD}>{mn ? 'Шалгалт бүлгээр' : 'Exams by chapter'}</div>
                      <ul className="space-y-1">
                        {chapters.map(ch => {
                          const t = sum.chapters?.[ch.id];
                          const answered = t?.answered ?? 0;
                          const pct = t ? percentOf(t) : null;
                          return (
                            <li key={ch.id} className="flex justify-between gap-2 text-xs">
                              <span className="truncate text-slate-300">
                                {ch.number}. {mn ? ch.titleMn : ch.titleEn}
                              </span>
                              {bankCount[ch.id] === 0 ? (
                                <span className="shrink-0 italic text-slate-500">{mn ? 'Асуулт бэлэн биш' : 'No questions yet'}</span>
                              ) : answered === 0 ? (
                                <span className="shrink-0 text-slate-500">{mn ? 'Өгөөгүй' : 'Not done yet'}</span>
                              ) : (
                                <span className={`shrink-0 font-mono font-bold ${(pct ?? 0) >= 60 ? 'text-emerald-300' : 'text-rose-300'}`}>
                                  {pct}% · {answered}
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className={HEAD}>{mn ? 'Сүүлийн үр дүн' : 'Latest results'}</div>
                      {!list ? (
                        <p className="text-xs text-slate-400">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>
                      ) : list.length === 0 ? (
                        <p className="text-xs text-slate-400">{mn ? 'Үр дүн алга.' : 'No results yet.'}</p>
                      ) : (
                        <ul className="space-y-3">
                          {list.map(r => (
                            <li key={r.id} className="space-y-1.5">
                              <div className="flex justify-between gap-2 text-xs">
                                <span className="truncate text-slate-200">{resultLabel(r)}</span>
                                <span className="shrink-0 font-mono text-slate-400">
                                  {dateText(r.takenAt)} · {r.percent}%{r.kind === 'exit' ? ` · ${cambridgeGrade(r.percent).letter}` : ''}
                                </span>
                              </div>
                              {FEEDBACK_KINDS.includes(r.kind) ? (
                                <FeedbackBox item={r} mn={mn} onSave={text => saveFeedback(s.uid, r, text)} />
                              ) : (
                                <div className="text-[11px] text-slate-500">{mn ? 'Зөвхөн үр дүн' : 'Results only'}</div>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
