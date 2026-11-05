import React, { useEffect, useMemo, useState } from 'react';
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
const plain = `${btn} text-slate-200 border-slate-600 hover:bg-slate-700`;
const danger = `${btn} text-rose-300 border-rose-500/40 hover:bg-rose-500/10`;
const field = 'px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-slate-100 border border-slate-600';

// The teacher's enrollment panel. Students are placed here: one row per student per programme, with search, filters, and
// decisions for one student or for many at once.
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
      .filter(e => gradeFilter === 'all' || e.grade === gradeFilter)
      .filter(e => !q || e.name.toLowerCase().includes(q) || (e.grade ?? '').toLowerCase().includes(q))
      .sort((a, b) => (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9) || b.requestedAt.localeCompare(a.requestedAt));
  }, [items, query, courseFilter, statusFilter, gradeFilter]);

  const chosen = items.filter(e => selected.has(e.id));
  const requestedCount = items.filter(e => e.status === 'requested').length;
  const allVisibleSelected = visible.length > 0 && visible.every(e => selected.has(e.id));

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
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">{mn ? 'Элсэлт' : 'Enrollments'}</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          {mn
            ? 'Сурагч нэр, ангиа бөглөөд хүсэлт илгээнэ. Та хөтөлбөр, горим, track-ийг сонгоод зөвшөөрнө. "Үе шаттай" бол хичээл нэг нэгээр нээгдэнэ: өмнөхийг 60%-иас дээш давсны дараа дараагийнх нь нээгдэнэ. "Бүтэн" бол бүх хичээл нээгдэнэ.'
            : 'Students send a request with their name and class. You choose the programme, the access and the IGCSE track, then approve. "Gated" opens the lessons one after another, each once the one before is passed above 60%. "Full" opens every lesson.'}
        </p>
        <p className="text-xs text-slate-300 mt-2 font-bold">
          {mn ? `Нийт ${items.length} · Хүлээгдэж буй ${requestedCount}` : `Total ${items.length} · Waiting ${requestedCount}`}
        </p>
      </div>

      {failed && (
        isTeacher(user) ? (
          <p className="text-sm text-rose-400">
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
          <span className="text-sm font-bold text-white">
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
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-amber-500/50 bg-amber-950/30">
          <span className="text-sm font-bold text-white">
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

      {loading ? (
        <p className="text-sm text-slate-400">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>
      ) : visible.length === 0 ? (
        <p className="text-sm text-slate-400">{mn ? 'Энэ шүүлтэд тохирох хүсэлт алга.' : 'No requests match this filter.'}</p>
      ) : (
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} />
            {mn ? `Шүүсэн ${visible.length}-ийг бүгдийг сонгох` : `Select all ${visible.length} shown`}
          </label>
          {visible.map(e => (
            <div
              key={e.id}
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 rounded-xl border border-slate-700 bg-slate-900/60"
            >
              <div className="flex items-start gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={selected.has(e.id)}
                  onChange={() => toggle(e.id)}
                  className="mt-1"
                  aria-label={e.name}
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    {e.name} <span className="font-mono text-emerald-300">· {e.grade ?? (mn ? 'анги алга' : 'no class')}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    {placeOf(e, mn)} · {statusOf(e, mn)}
                    {e.requestedAt && ` · ${new Date(e.requestedAt).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
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
    </div>
  );
};
