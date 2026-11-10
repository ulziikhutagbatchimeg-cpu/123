import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  decideEnrollment,
  deleteEnrollment,
  GRADES,
  isTeacher,
  loadEnrollments,
  moveEnrollment,
  useAuthUser,
  type Enrollment,
  type EnrollmentAccess,
  type EnrollmentProgramme,
  type EnrollmentStatus,
  type EnrollmentTrack
} from '../lib/cloud';
import { TeacherSignInNotice } from './TeacherSignInNotice';
import { classTone } from '../lib/classTone';

type CourseFilter = 'all' | Enrollment['programme'];
type StatusFilter = 'all' | EnrollmentStatus;

const STATUS_ORDER: Record<EnrollmentStatus, number> = { requested: 0, approved: 1, suspended: 2, rejected: 3 };

const PROGRAMME_LABEL: Record<EnrollmentProgramme, string> = { igcse: 'IGCSE 0620', as: 'AS Level 9701', a: 'A Level 9701' };

// Where a student is placed: IGCSE Core, IGCSE Extended, AS 9701 or A Level 9701. The IGCSE track is the teacher's choice.
const placeOf = (e: Enrollment, mn: boolean) => {
  if (e.programme === 'as') return 'AS Level 9701';
  if (e.programme === 'a') return 'A Level 9701';
  const track = e.track === 'extended' ? 'Extended' : e.track === 'core' ? 'Core' : (mn ? 'track сонгоогүй' : 'track not set');
  return `IGCSE 0620 · ${track}`;
};

const statusOf = (e: Enrollment, mn: boolean) => {
  if (e.status === 'requested') return mn ? 'Хүлээгдэж буй' : 'Waiting';
  if (e.status === 'rejected') return mn ? 'Татгалзсан' : 'Rejected';
  if (e.status === 'suspended') return mn ? 'Түр хаасан' : 'Paused';
  return e.access === 'full' ? (mn ? 'Зөвшөөрсөн · бүтэн' : 'Approved · full') : (mn ? 'Зөвшөөрсөн · үе шаттай' : 'Approved · gated');
};

const btn = 'px-2.5 py-1.5 rounded-lg text-xs font-bold border disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
const primary = `${btn} bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700`;
const plain = `${btn} text-slate-800 border-slate-400 hover:bg-slate-300`;
const danger = `${btn} text-rose-700 border-rose-500/40 hover:bg-rose-500/10`;
// The place of a class in the school's order, 7A first; a student with no class goes last
const classRank = (g?: string): number => {
  const i = g ? GRADES.indexOf(g) : -1;
  return i < 0 ? 999 : i;
};
const field = 'px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-200 text-slate-900 border border-slate-400';
// Where the teacher's open and folded class cards are kept on this browser
const OPEN_KEY = 'chem_enrol_open_classes';
// The class tabs share the journal's tab shape
const tabBase ='inline-flex items-center justify-center min-w-[3.5rem] px-3 py-1.5 rounded-lg text-xs border transition-colors';

// The teacher's enrollment panel. Students are placed here: one row per student per programme, with search, filters, and
// decisions for one student or for many at once. The rows sit in one card per class, side by side, each card foldable.
export const EnrollmentRequests: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { user } = useAuthUser();
  const [items, setItems] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState<CourseFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [tracks, setTracks] = useState<Record<string, EnrollmentTrack>>({});
  const [bulkTrack, setBulkTrack] = useState<EnrollmentTrack>('core');
  const [confirm, setConfirm] = useState<{ status: 'approved' | 'rejected'; access: EnrollmentAccess; count: number } | null>(null);

  const refresh = () => {
    setFailed(false);
    return loadEnrollments()
      .then(list => setItems(list))
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  const trackOf = (e: Enrollment): EnrollmentTrack => tracks[e.id] ?? e.track ?? 'core';

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter(e => courseFilter === 'all' || e.programme === courseFilter)
      .filter(e => statusFilter === 'all' || e.status === statusFilter)
      .filter(e => gradeFilter === 'all' || (e.grade ?? '—') === gradeFilter)
      .filter(e => !q || e.name.toLowerCase().includes(q) || (e.grade ?? '').toLowerCase().includes(q))
      .sort((a, b) => classRank(a.grade) - classRank(b.grade) || (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9) || b.requestedAt.localeCompare(a.requestedAt));
  }, [items, query, courseFilter, statusFilter, gradeFilter]);

  const chosen = items.filter(e => selected.has(e.id));
  const requestedCount = items.filter(e => e.status === 'requested').length;
  const allVisibleSelected = visible.length > 0 && visible.every(e => selected.has(e.id));
  // One tab per class, in the school's order; a student with no class has the tab —
  const classTabs = useMemo(() => [...new Set(items.map(e => e.grade ?? '—'))].sort((a, b) => classRank(a) - classRank(b)), [items]);
  // The rows shown, one group per class, in the school's order
  const groups = useMemo(() => {
    const out: { grade: string; list: Enrollment[] }[] = [];
    visible.forEach(e => {
      const g = e.grade ?? '—';
      const last = out[out.length - 1];
      if (last && last.grade === g) last.list.push(e);
      else out.push({ grade: g, list: [e] });
    });
    return out;
  }, [visible]);
  // Which class cards are open, kept on this browser. A class the teacher has not folded or opened is open while it has
  // a request waiting, and folded otherwise; a class shown on its own (its tab picked) is always open.
  const [openState, setOpenState] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(window.localStorage.getItem(OPEN_KEY) || '{}') as Record<string, boolean>;
    } catch {
      return {};
    }
  });
  const saveOpen = (next: Record<string, boolean>) => {
    setOpenState(next);
    try {
      window.localStorage.setItem(OPEN_KEY, JSON.stringify(next));
    } catch {
      // Storage can be blocked; the cards then fold back to the default on the next visit
    }
  };
  const isOpen = (grade: string, list: Enrollment[]) =>
    groups.length === 1 || (openState[grade] ?? list.some(e => e.status === 'requested'));
  const toggleOpen = (grade: string, open: boolean) => saveOpen({ ...openState, [grade]: !open });
  const setAllOpen = (open: boolean) => saveOpen({ ...openState, ...Object.fromEntries(groups.map(g => [g.grade, open])) });
  // The tick on a class heading chooses (or clears) every student of that class shown
  const toggleClass = (list: Enrollment[], allChosen: boolean) =>
    setSelected(prev => {
      const next = new Set(prev);
      list.forEach(e => (allChosen ? next.delete(e.id) : next.add(e.id)));
      return next;
    });

  // One student's decision, then the list again
  const decideOne = (e: Enrollment, status: EnrollmentStatus, access: EnrollmentAccess) => {
    setBusy(true);
    setFailed(false);
    decideEnrollment(e, status, access, e.programme === 'igcse' ? trackOf(e) : undefined)
      .then(refresh)
      .catch(() => setFailed(true))
      .finally(() => setBusy(false));
  };

  // Removes the enrolment record for good. The student's results are kept; the student simply is no longer enrolled here.
  const removeOne = (e: Enrollment) => {
    const question = mn
      ? `${e.name}-г ${PROGRAMME_LABEL[e.programme]} элсэлтээс бүрмөсөн устгах уу? Сурагчийн үр дүн хадгалагдана.`
      : `Remove ${e.name} from ${PROGRAMME_LABEL[e.programme]} for good? Their results are kept.`;
    if (!window.confirm(question)) return;
    setBusy(true);
    setFailed(false);
    deleteEnrollment(e)
      .then(refresh)
      .catch(() => setFailed(true))
      .finally(() => setBusy(false));
  };

  // The same decision for every chosen student, one after another
  const runBulk = async (status: 'approved' | 'rejected', access: EnrollmentAccess) => {
    setBusy(true);
    setFailed(false);
    try {
      for (const e of chosen) {
        await decideEnrollment(e, status, access, e.programme === 'igcse' ? bulkTrack : undefined);
      }
      setSelected(new Set());
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
      setConfirm(null);
      refresh();
    }
  };

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => setSelected(allVisibleSelected ? new Set() : new Set(visible.map(e => e.id)));

  const trackSelect = (value: EnrollmentTrack, onChange: (t: EnrollmentTrack) => void) => (
    <select value={value} onChange={ev => onChange(ev.target.value as EnrollmentTrack)} className={field} aria-label="IGCSE track">
      <option value="core">Core</option>
      <option value="extended">Extended</option>
    </select>
  );

  // Move the student to another programme: this one is closed, and the other is approved at once (the teacher's choice)
  const moveTo = (e: Enrollment, target: EnrollmentProgramme) => {
    const label = PROGRAMME_LABEL[target];
    if (!window.confirm(mn ? `${e.name}-г ${label} руу зөөх үү? Одоогийн хөтөлбөр хаагдана.` : `Move ${e.name} to ${label}? The current programme closes.`)) return;
    setBusy(true);
    setFailed(false);
    moveEnrollment(e, target, e.access, target === 'igcse' ? trackOf(e) : undefined)
      .then(refresh)
      .catch(() => setFailed(true))
      .finally(() => setBusy(false));
  };

  const movesOf = (e: Enrollment) => (
    <>
      {(['igcse', 'as', 'a'] as EnrollmentProgramme[])
        .filter(p => p !== e.programme)
        .map(p => (
          <button key={p} type="button" className={plain} disabled={busy} onClick={() => moveTo(e, p)}>
            {mn ? `${PROGRAMME_LABEL[p]} руу зөөх` : `Move to ${PROGRAMME_LABEL[p]}`}
          </button>
        ))}
    </>
  );

  const rowActions = (e: Enrollment) => {
    if (e.status === 'requested' || e.status === 'rejected') {
      return (
        <>
          <button type="button" className={primary} disabled={busy} onClick={() => decideOne(e, 'approved', 'full')}>
            {mn ? 'Бүтэн зөвшөөрөх' : 'Approve: full'}
          </button>
          <button type="button" className={plain} disabled={busy} onClick={() => decideOne(e, 'approved', 'gated')}>
            {mn ? 'Үе шаттай зөвшөөрөх' : 'Approve: gated'}
          </button>
          {e.status === 'requested' && (
            <button type="button" className={danger} disabled={busy} onClick={() => decideOne(e, 'rejected', e.access)}>
              {mn ? 'Татгалзах' : 'Reject'}
            </button>
          )}
        </>
      );
    }
    if (e.status === 'approved') {
      return (
        <>
          <button
            type="button"
            className={plain}
            disabled={busy}
            onClick={() => decideOne(e, 'approved', e.access === 'full' ? 'gated' : 'full')}
          >
            {e.access === 'full' ? (mn ? 'Үе шаттай болгох' : 'Set: gated') : (mn ? 'Бүтэн болгох' : 'Set: full')}
          </button>
          <button type="button" className={danger} disabled={busy} onClick={() => decideOne(e, 'suspended', e.access)}>
            {mn ? 'Түр хаах' : 'Pause'}
          </button>
          <button type="button" className={danger} disabled={busy} onClick={() => decideOne(e, 'rejected', e.access)}>
            {mn ? 'Хасах' : 'Unenroll'}
          </button>
          {movesOf(e)}
        </>
      );
    }
    if (e.status === 'suspended') {
      return (
        <>
          <button type="button" className={primary} disabled={busy} onClick={() => decideOne(e, 'approved', e.access)}>
            {mn ? 'Сэргээх' : 'Restore'}
          </button>
          <button type="button" className={danger} disabled={busy} onClick={() => decideOne(e, 'rejected', e.access)}>
            {mn ? 'Хасах' : 'Unenroll'}
          </button>
        </>
      );
    }
    return (
      <button type="button" className={primary} disabled={busy} onClick={() => decideOne(e, 'approved', e.access)}>
        {mn ? 'Сэргээх' : 'Restore'}
      </button>
    );
  };

  return (
    <div className="bg-slate-100 border border-slate-400 rounded-2xl p-6 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{mn ? 'Элсэлт' : 'Enrollments'}</h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          {mn
            ? 'Сурагч нэр, ангиа бөглөөд хүсэлт илгээнэ. Та хөтөлбөр, горим, track-ийг сонгоод зөвшөөрнө. "Үе шаттай" бол хичээл нэг нэгээр нээгдэнэ: өмнөхийг 60%-иас дээш давсны дараа дараагийнх нь нээгдэнэ. "Бүтэн" бол бүх хичээл нээгдэнэ.'
            : 'Students send a request with their name and class. You choose the programme, the access and the IGCSE track, then approve. "Gated" opens the lessons one after another, each once the one before is passed above 60%. "Full" opens every lesson.'}
        </p>
        <p className="text-xs text-slate-700 mt-2 font-bold">
          {mn ? `Нийт ${items.length} · Хүлээгдэж буй ${requestedCount}` : `Total ${items.length} · Waiting ${requestedCount}`}
        </p>
      </div>

      {failed && (
        isTeacher(user) ? (
          <p className="text-sm text-rose-700">
            {mn ? 'Жагсаалтыг ачаалах эсвэл шинэчлэхэд алдаа гарлаа.' : 'Could not load or update the requests.'}
          </p>
        ) : (
          <TeacherSignInNotice mn={mn} />
        )
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={mn ? 'Нэр эсвэл анги (жишээ: 10A)' : 'Name or class (for example 10A)'}
          className={`${field} min-w-[12rem] flex-1`}
        />
        <select value={courseFilter} onChange={e => setCourseFilter(e.target.value as CourseFilter)} className={field} aria-label={mn ? 'Курс' : 'Course'}>
          <option value="all">{mn ? 'Бүх курс' : 'All courses'}</option>
          <option value="igcse">IGCSE 0620</option>
          <option value="as">AS Level 9701</option>
          <option value="a">A Level 9701</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as StatusFilter)} className={field} aria-label={mn ? 'Төлөв' : 'Status'}>
          <option value="all">{mn ? 'Бүх төлөв' : 'All statuses'}</option>
          <option value="requested">{mn ? 'Хүлээгдэж буй' : 'Waiting'}</option>
          <option value="approved">{mn ? 'Зөвшөөрсөн' : 'Approved'}</option>
          <option value="suspended">{mn ? 'Түр хаасан' : 'Paused'}</option>
          <option value="rejected">{mn ? 'Татгалзсан' : 'Rejected'}</option>
        </select>
        <select value={gradeFilter} onChange={e => setGradeFilter(e.target.value)} className={field} aria-label={mn ? 'Анги' : 'Class'}>
          <option value="all">{mn ? 'Бүх анги' : 'All classes'}</option>
          {GRADES.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {chosen.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-emerald-600/50 bg-emerald-950/30">
          <span className="text-sm font-bold text-slate-900">
            {mn ? `${chosen.length} сурагч сонгосон` : `${chosen.length} selected`}
          </span>
          {chosen.some(e => e.programme === 'igcse') && trackSelect(bulkTrack, setBulkTrack)}
          <button type="button" className={primary} disabled={busy} onClick={() => setConfirm({ status: 'approved', access: 'full', count: chosen.length })}>
            {mn ? 'Бүтэн зөвшөөрөх' : 'Approve: full'}
          </button>
          <button type="button" className={plain} disabled={busy} onClick={() => setConfirm({ status: 'approved', access: 'gated', count: chosen.length })}>
            {mn ? 'Үе шаттай зөвшөөрөх' : 'Approve: gated'}
          </button>
          <button type="button" className={danger} disabled={busy} onClick={() => setConfirm({ status: 'rejected', access: 'gated', count: chosen.length })}>
            {mn ? 'Татгалзах' : 'Reject'}
          </button>
          <button type="button" className={plain} disabled={busy} onClick={() => setSelected(new Set())}>
            {mn ? 'Сонголт цуцлах' : 'Clear selection'}
          </button>
        </div>
      )}

      {confirm && (
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-amber-500/50 bg-amber-100">
          <span className="text-sm font-bold text-slate-900">
            {mn
              ? `${confirm.count} сурагчийг ${confirm.status === 'rejected' ? 'татгалзах' : confirm.access === 'full' ? 'бүтэн горимоор зөвшөөрөх' : 'үе шаттай горимоор зөвшөөрөх'} уу?`
              : `${confirm.status === 'rejected' ? 'Reject' : confirm.access === 'full' ? 'Approve in full' : 'Approve gated'} ${confirm.count} student(s)?`}
          </span>
          <button type="button" className={primary} disabled={busy} onClick={() => runBulk(confirm.status, confirm.access)}>
            {mn ? 'Баталгаажуулах' : 'Confirm'}
          </button>
          <button type="button" className={plain} disabled={busy} onClick={() => setConfirm(null)}>
            {mn ? 'Болих' : 'Cancel'}
          </button>
        </div>
      )}

      {/* One tab per class, as in the journal: the class picked is the only one listed. The tabs stay even when a filter hides every row */}
      {!loading && classTabs.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-20 shrink-0 text-xs font-bold text-slate-600">{mn ? 'Анги' : 'Class'}</span>
          {classTabs.map(g => {
            const tone = classTone(g);
            const on = gradeFilter === g;
            const count = items.filter(e => (e.grade ?? '—') === g).length;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGradeFilter(g)}
                aria-pressed={on}
                className={on ? `${tabBase} font-bold ${tone.head} ${tone.text} ${tone.bar}` : `${tabBase} font-bold text-slate-700 border-slate-400 hover:bg-slate-300`}
              >
                {g} <span className="font-normal opacity-80">· {count}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setGradeFilter('all')}
            aria-pressed={gradeFilter === 'all'}
            className={gradeFilter === 'all' ? `${tabBase} font-bold bg-emerald-600 text-white border-emerald-500` : `${tabBase} font-bold text-slate-700 border-slate-400 hover:bg-slate-300`}
          >
            {mn ? 'Бүгд' : 'All'}
          </button>
        </div>
      )}
      {loading ? (
        <p className="text-sm text-slate-600">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>
      ) : visible.length === 0 ? (
        <p className="text-sm text-slate-600">{mn ? 'Энэ шүүлтэд тохирох хүсэлт алга.' : 'No requests match this filter.'}</p>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mr-auto">
              <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} />
              {mn ? `Шүүсэн ${visible.length}-ийг бүгдийг сонгох` : `Select all ${visible.length} shown`}
            </label>
            <button type="button" className={plain} onClick={() => setAllOpen(true)}>
              {mn ? 'Бүгдийг дэлгэх' : 'Expand all'}
            </button>
            <button type="button" className={plain} onClick={() => setAllOpen(false)}>
              {mn ? 'Бүгдийг хураах' : 'Collapse all'}
            </button>
          </div>
          {/* One card per class, side by side; each folds away on its heading */}
          <div className="grid items-start gap-3 lg:grid-cols-2 2xl:grid-cols-3">
            {groups.map(({ grade, list }) => {
              const tone = classTone(grade === '—' ? '' : grade);
              const open = isOpen(grade, list);
              const waiting = list.filter(e => e.status === 'requested').length;
              const allChosen = list.every(e => selected.has(e.id));
              return (
                <section key={grade} className="rounded-xl border border-slate-400 bg-slate-100 overflow-hidden">
                  <div className={`flex items-center gap-2 px-3 py-2 ${tone.head} ${tone.text}`}>
                    <input
                      type="checkbox"
                      checked={allChosen}
                      onChange={() => toggleClass(list, allChosen)}
                      aria-label={mn ? `${grade} ангийг бүгдийг сонгох` : `Select all of ${grade}`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleOpen(grade, open)}
                      aria-expanded={open}
                      className="flex flex-1 items-center gap-2 text-left min-w-0"
                    >
                      <span className="text-sm font-black tracking-wide">{grade === '—' ? (mn ? 'Анги алга' : 'No class') : grade}</span>
                      <span className="text-xs opacity-80">· {mn ? `${list.length} сурагч` : `${list.length} students`}</span>
                      {waiting > 0 && (
                        <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[11px] font-bold text-white">
                          {mn ? `${waiting} хүлээгдэж буй` : `${waiting} waiting`}
                        </span>
                      )}
                      <ChevronDown aria-hidden="true" className={`ml-auto h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {open && (
                    <div className="space-y-2 p-2">
                      {list.map(e => (
                        <div key={e.id} className="relative flex flex-col gap-2 p-3 pl-4 rounded-xl border border-slate-300 bg-white overflow-hidden">
                          <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${tone.solid}`} />
                          <div className="flex items-start gap-3 min-w-0">
                            <input
                              type="checkbox"
                              checked={selected.has(e.id)}
                              onChange={() => toggle(e.id)}
                              className="mt-1"
                              aria-label={e.name}
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-900 truncate">{e.name}</p>
                              <p className="text-xs text-slate-600">
                                {placeOf(e, mn)} · {statusOf(e, mn)}
                                {e.requestedAt && ` · ${new Date(e.requestedAt).toLocaleDateString()}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 pl-7">
                            {e.programme === 'igcse' && trackSelect(trackOf(e), t => setTracks(prev => ({ ...prev, [e.id]: t })))}
                            {rowActions(e)}
                            <button type="button" className={danger} disabled={busy} onClick={() => removeOne(e)}>
                              {mn ? 'Устгах' : 'Remove'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
