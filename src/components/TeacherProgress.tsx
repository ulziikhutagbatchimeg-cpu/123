import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CURRICULUM_CHAPTERS } from '../data/curriculumData';
import {
  REPORT_KEY,
  ChapterCount,
  Level,
  StudentReport,
  downloadText,
  parseReport,
  statementRates,
  statementsAt,
  studentStats
} from '../data/progressReport';
import { Download, Trash2, Upload, User } from 'lucide-react';
import { isTeacher, loadStudentReports, signInTeacher, signOutUser, useAuthUser } from '../lib/cloud';
import { isFirebaseConfigured } from '../lib/firebase';

const readReports = (): StudentReport[] => {
  try {
    const raw = localStorage.getItem(REPORT_KEY);
    return raw ? (JSON.parse(raw) as StudentReport[]) : [];
  } catch {
    return [];
  }
};

const writeReports = (list: StudentReport[]) => {
  try {
    localStorage.setItem(REPORT_KEY, JSON.stringify(list));
  } catch {
    // Storage can be blocked; the reports then last only until the page is closed
  }
};

// One report per student name: the newest export replaces older ones
const mergeReports = (current: StudentReport[], incoming: StudentReport[]): StudentReport[] => {
  const byName = new Map<string, StudentReport>();
  [...current, ...incoming].forEach(r => {
    const prev = byName.get(r.name);
    if (!prev || r.date >= prev.date) byName.set(r.name, r);
  });
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
};

const pctOf = (c: ChapterCount): number | null => (c.total ? Math.round((c.done / c.total) * 100) : null);

const STALE_DAYS = 7;

// A report older than STALE_DAYS, or with no date, may no longer match the student's ticks
const isStale = (iso: string) => !iso || Date.now() - new Date(iso).getTime() > STALE_DAYS * 86400000;

const toneBar = (pct: number) => (pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500');

const toneCell = (pct: number | null) => {
  if (pct === null) return 'bg-slate-800 text-slate-500';
  if (pct >= 75) return 'bg-emerald-600/70 text-white';
  if (pct >= 50) return 'bg-amber-500/60 text-white';
  return 'bg-rose-600/60 text-white';
};

const segment = (active: boolean) =>
  `px-3 py-1.5 rounded-md font-bold transition-colors ${
    active ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
  }`;

const csvCell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

// One row per student, 1 or 0 for each statement at this level. The BOM lets Excel read Mongolian names.
const classCsv = (reports: StudentReport[], level: Level): string => {
  const rows = statementsAt(level);
  const header = ['Student', 'Overall %', ...rows.map(s => s.id)];
  const lines = reports.map(r => {
    const st = studentStats(r, level);
    return [r.name, st.pct, ...rows.map(s => (r.checks[s.id] ? 1 : 0))].map(csvCell).join(',');
  });
  return '﻿' + [header.map(csvCell).join(','), ...lines].join('\n');
};

const chapterLabel = (ch: { number: number; titleEn: string; titleMn: string }, mn: boolean) =>
  `${ch.number}. ${mn ? ch.titleMn : ch.titleEn}`;

const StatCard: React.FC<{ label: string; value: string; sub?: string; tone: string }> = ({ label, value, sub, tone }) => (
  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
    <span className="text-xs font-mono text-slate-400 block mb-1">{label}</span>
    <span className={`text-2xl font-bold font-mono ${tone}`}>{value}</span>
    {sub && <span className="text-[11px] text-slate-500 block mt-1">{sub}</span>}
  </div>
);

const Bar: React.FC<{ pct: number | null }> = ({ pct }) => (
  <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
    <div
      className={`h-full transition-all duration-300 ${pct === null ? '' : toneBar(pct)}`}
      style={{ width: `${pct ?? 0}%` }}
    />
  </div>
);

export const TeacherProgress: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const fileRef = useRef<HTMLInputElement>(null);

  const [reports, setReports] = useState<StudentReport[]>(readReports);
  const [view, setView] = useState<'student' | 'class'>('class');
  const [level, setLevel] = useState<Level>('extended');
  const [selected, setSelected] = useState<string>('');
  const [notice, setNotice] = useState<string | null>(null);

  const save = (next: StudentReport[]) => {
    setReports(next);
    writeReports(next);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const parsed = await Promise.all(Array.from(files).map(f => f.text().then(parseReport)));
    const good = parsed.filter((r): r is StudentReport => r !== null);
    const bad = parsed.length - good.length;
    if (good.length) {
      save(mergeReports(reports, good));
      setSelected(good[0].name);
    }
    setNotice(
      mn
        ? `${good.length} тайлан ачаалагдлаа${bad ? `, ${bad} файл танигдсангүй` : ''}`
        : `${good.length} report(s) loaded${bad ? `, ${bad} file(s) not recognised` : ''}`
    );
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeStudent = (name: string) => save(reports.filter(r => r.name !== name));

  const { user, ready } = useAuthUser();
  const [cloudNotice, setCloudNotice] = useState<string | null>(null);

  // Teacher only: pull every student's saved progress from Firebase into this view
  const loadFromCloud = async () => {
    try {
      const cloud = await loadStudentReports();
      save(mergeReports(reports, cloud));
      setCloudNotice(mn ? `Firebase-аас ${cloud.length} сурагч ачаалагдлаа` : `Loaded ${cloud.length} student(s) from Firebase`);
    } catch {
      setCloudNotice(mn ? 'Firebase-аас ачаалж чадсангүй' : 'Could not load from Firebase');
    }
  };

  useEffect(() => {
    if (isTeacher(user)) loadFromCloud();
  }, [user]);

  const teacherSignIn = () => {
    signInTeacher().catch(() => setCloudNotice(mn ? 'Нэвтрэх цонх хаагдлаа' : 'Sign-in was cancelled'));
  };

  const clearAll = () => {
    if (window.confirm(mn ? 'Бүх тайланг устгах уу?' : 'Delete all loaded reports?')) save([]);
  };

  const current = reports.find(r => r.name === selected) ?? reports[0];
  const currentStats = current ? studentStats(current, level) : null;
  const doneChapters = currentStats
    ? Object.values(currentStats.byChapter).filter(c => c.total > 0 && c.done === c.total).length
    : 0;

  const perStudent = useMemo(() => reports.map(r => studentStats(r, level)), [reports, level]);
  const rates = useMemo(() => statementRates(reports, level), [reports, level]);

  const classAvg = perStudent.length
    ? Math.round(perStudent.reduce((sum, s) => sum + s.pct, 0) / perStudent.length)
    : 0;
  const fullCount = perStudent.filter(s => s.pct === 100).length;
  const chapterAverages = CURRICULUM_CHAPTERS.map(ch => {
    const pcts = perStudent.map(s => pctOf(s.byChapter[ch.number])).filter((p): p is number => p !== null);
    return { ch, avg: pcts.length ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : null };
  });

  const fmtDate = (iso: string) => (iso ? new Date(iso).toLocaleDateString(mn ? 'mn-MN' : 'en-GB') : '—');

  const exportCsv = () =>
    downloadText(`class-0620-${level}.csv`, classCsv(reports, level), 'text/csv;charset=utf-8');

  const emptyState = (
    <div className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-8 text-sm text-slate-300 space-y-3">
      <p className="font-bold text-white">
        {mn ? 'Одоохондоо тайлан ачаалагдаагүй байна' : 'No reports loaded yet'}
      </p>
      <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-400">
        <li>
          {mn
            ? 'Сурагч "Суралцахуйн зорилтууд" хэсэгт нэрээ оруулаад "Багшдаа тайлан хадгалах" дарна.'
            : 'The student types their name in the lesson checklist and clicks "Save report for teacher".'}
        </li>
        <li>
          {mn
            ? 'Тайлангийн .json файлуудыг дээрх "Тайлан ачаалах" товчоор оруулна (олноороо зэрэг оруулж болно).'
            : 'Load the .json files with "Load reports" above. Several files at once is fine.'}
        </li>
        <li>
          {mn
            ? 'Нэг сурагч эсвэл бүх ангийн дүнг график, хүснэгтээр харна.'
            : 'View one student or the whole class as charts and tables.'}
        </li>
      </ol>
      <p className="text-[11px] text-slate-500">
        {mn
          ? 'Өгөгдөл зөвхөн таны браузерт хадгалагдана, ямар ч серверт илгээгдэхгүй.'
          : 'Data stays in this browser only. Nothing is sent to a server.'}
      </p>
    </div>
  );

  const studentView = current && currentStats && (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <User className="w-4 h-4 text-purple-400" />
        <select
          value={current.name}
          onChange={e => setSelected(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-1.5 text-sm"
        >
          {reports.map(r => (
            <option key={r.name} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
        <span className="text-[11px] font-mono text-slate-500">
          {mn ? 'Экспорт:' : 'Exported:'} {fmtDate(current.date)}
        </span>
        <button
          onClick={() => removeStudent(current.name)}
          className="ml-auto flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{mn ? 'Устгах' : 'Remove'}</span>
        </button>
      </div>

      {isStale(current.date) && (
        <p className="text-xs text-amber-300 bg-amber-950/30 border border-amber-800/60 rounded-lg px-3 py-2">
          {mn
            ? `Тайлан ${STALE_DAYS}-с дээш хоногийн өмнөх байна. Сурагчаас шинэ тайлан авна уу.`
            : `This report is older than ${STALE_DAYS} days. Ask the student for a new one.`}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label={mn ? 'Нийт явц' : 'Overall progress'}
          value={`${currentStats.pct}%`}
          sub={`${currentStats.done} / ${currentStats.total}`}
          tone="text-teal-400"
        />
        <StatCard
          label={mn ? 'Бүрэн бүлэг' : 'Chapters complete'}
          value={`${doneChapters} / ${CURRICULUM_CHAPTERS.length}`}
          tone="text-purple-400"
        />
        <StatCard
          label={mn ? 'Тэмдэглээгүй' : 'Not ticked yet'}
          value={`${currentStats.missing.length}`}
          sub={mn ? 'зорилт' : 'statements'}
          tone="text-amber-400"
        />
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{mn ? 'Бүлгээр' : 'By chapter'}</h4>
        {CURRICULUM_CHAPTERS.map(ch => {
          const c = currentStats.byChapter[ch.number];
          return (
            <div key={ch.id} className="flex items-center gap-3 text-xs">
              <span className="w-44 sm:w-64 truncate text-slate-300" title={chapterLabel(ch, mn)}>
                {chapterLabel(ch, mn)}
              </span>
              <Bar pct={pctOf(c)} />
              <span className="w-14 text-right font-mono text-slate-400">
                {c.done}/{c.total}
              </span>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
          {mn ? 'Тэмдэглээгүй зорилтууд' : 'Statements not ticked yet'} ({currentStats.missing.length})
        </h4>
        {currentStats.missing.length === 0 && (
          <p className="text-xs text-emerald-400">
            {mn ? 'Энэ түвшний бүх зорилтыг тэмдэглэсэн байна.' : 'All statements at this level are ticked.'}
          </p>
        )}
        {CURRICULUM_CHAPTERS.map(ch => {
          const rows = currentStats.missing.filter(s => s.chapterNo === ch.number);
          if (rows.length === 0) return null;
          return (
            <div key={ch.id} className="space-y-1.5">
              <div className="text-[11px] font-mono text-slate-500">{chapterLabel(ch, mn)}</div>
              {rows.map(s => (
                <div
                  key={s.id}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                >
                  <span className="font-mono text-[10px] text-teal-400 shrink-0 pt-0.5">{s.id}</span>
                  <span className="text-slate-300">{mn ? s.mn : s.en}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );

  const staleCount = reports.filter(r => isStale(r.date)).length;

  const classView = reports.length > 0 && (
    <div className="space-y-4">
      {staleCount > 0 && (
        <p className="text-xs text-amber-300 bg-amber-950/30 border border-amber-800/60 rounded-lg px-3 py-2">
          {mn
            ? `${staleCount} сурагчийн тайлан ${STALE_DAYS}-с дээш хоногийн өмнөх байна.`
            : `${staleCount} student report(s) are older than ${STALE_DAYS} days.`}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label={mn ? 'Сурагчдын тоо' : 'Students'} value={`${reports.length}`} tone="text-indigo-400" />
        <StatCard label={mn ? 'Ангийн дундаж' : 'Class average'} value={`${classAvg}%`} tone="text-teal-400" />
        <StatCard
          label={mn ? 'Бүрэн (100%)' : 'Fully complete'}
          value={`${fullCount}`}
          sub={mn ? 'сурагч' : 'students'}
          tone="text-purple-400"
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
          {mn ? 'Бүлгээр дундаж' : 'Average by chapter'}
        </h4>
        {chapterAverages.map(({ ch, avg }) => (
          <div key={ch.id} className="flex items-center gap-3 text-xs">
            <span className="w-44 sm:w-64 truncate text-slate-300" title={chapterLabel(ch, mn)}>
              {chapterLabel(ch, mn)}
            </span>
            <Bar pct={avg} />
            <span className="w-12 text-right font-mono text-slate-400">{avg === null ? '—' : `${avg}%`}</span>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
          {mn ? 'Сурагч × бүлгийн хүснэгт' : 'Student × chapter table'}
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-separate border-spacing-1">
            <thead>
              <tr className="text-slate-400 font-mono">
                <th className="text-left font-normal pr-2 whitespace-nowrap">{mn ? 'Сурагч' : 'Student'}</th>
                {CURRICULUM_CHAPTERS.map(ch => (
                  <th key={ch.id} title={chapterLabel(ch, mn)} className="font-normal w-8 text-center">
                    {ch.number}
                  </th>
                ))}
                <th className="font-normal text-right pl-2">{mn ? 'Нийт' : 'Total'}</th>
                <th className="font-normal text-right pl-2">{mn ? 'Огноо' : 'Date'}</th>
              </tr>
            </thead>
            <tbody>
              {perStudent.map(s => (
                <tr key={s.name}>
                  <td className="pr-2 text-slate-200 whitespace-nowrap">{s.name}</td>
                  {CURRICULUM_CHAPTERS.map(ch => {
                    const pct = pctOf(s.byChapter[ch.number]);
                    return (
                      <td
                        key={ch.id}
                        title={`${s.name}: ${chapterLabel(ch, mn)} — ${pct === null ? '—' : `${pct}%`}`}
                        className={`rounded text-center font-mono py-1.5 ${toneCell(pct)}`}
                      >
                        {pct === null ? '—' : pct}
                      </td>
                    );
                  })}
                  <td className="pl-2 text-right font-mono font-bold text-white">{s.pct}%</td>
                  <td
                    className={`pl-2 text-right font-mono whitespace-nowrap ${
                      isStale(s.date) ? 'text-amber-300' : 'text-slate-400'
                    }`}
                  >
                    {fmtDate(s.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500">
          {mn
            ? 'Өнгө: ногоон ≥75%, шар 50–74%, улаан <50%'
            : 'Colours: green 75%+, amber 50–74%, red below 50%'}
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
          {mn ? 'Хамгийн бага тэмдэглэгдсэн 10 зорилт' : '10 least-ticked statements'}
        </h4>
        {rates.slice(0, 10).map(s => (
          <div key={s.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="font-mono text-[10px] text-teal-400 shrink-0 pt-0.5">{s.id}</span>
              <span className="text-slate-300">{mn ? s.mn : s.en}</span>
            </div>
            <div className="flex items-center gap-3">
              <Bar pct={s.rate} />
              <span className="w-28 text-right font-mono text-slate-400">
                {s.ticked}/{reports.length} · {s.rate}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Course material and class data are for the teacher account only */}
      {isTeacher(user) && (
        <div className="flex justify-end">
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{mn ? 'Ангийн хүснэгт (CSV) татах' : 'Download class table (CSV)'}</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {isFirebaseConfigured && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center gap-3 text-xs">
          {!ready ? null : isTeacher(user) ? (
            <>
              <span className="text-slate-300">
                {mn ? 'Багшаар нэвтэрсэн:' : 'Signed in as teacher:'} {user?.email}
              </span>
              <button
                onClick={() => loadFromCloud()}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white"
              >
                {mn ? 'Дахин ачаалах' : 'Reload from Firebase'}
              </button>
              <button onClick={() => signOutUser()} className="ml-auto text-slate-400 hover:text-white">
                {mn ? 'Гарах' : 'Sign out'}
              </button>
            </>
          ) : user ? (
            <>
              <span className="text-amber-300">
                {mn ? 'Энэ бүртгэл багшийн эрхгүй байна.' : 'This account does not have teacher access.'}
              </span>
              <button onClick={() => signOutUser()} className="ml-auto text-slate-400 hover:text-white">
                {mn ? 'Гарах' : 'Sign out'}
              </button>
            </>
          ) : (
            <button
              onClick={teacherSignIn}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold"
            >
              {mn ? 'Багшаар Google-ээр нэвтрэх' : 'Sign in as teacher with Google'}
            </button>
          )}
          {cloudNotice && <p className="w-full text-teal-400">{cloudNotice}</p>}
        </div>
      )}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {mn ? 'Сурагчдын явц' : 'Student progress'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {mn ? `Ачаалсан тайлан: ${reports.length} сурагч` : `Loaded reports: ${reports.length} student(s)`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileRef}
              type="file"
              accept=".json,application/json"
              multiple
              className="hidden"
              onChange={e => handleFiles(e.target.files)}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{mn ? 'Тайлан ачаалах (.json)' : 'Load reports (.json)'}</span>
            </button>
            {reports.length > 0 && (
              <button
                onClick={clearAll}
                className="px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-white"
              >
                {mn ? 'Бүгдийг устгах' : 'Clear all'}
              </button>
            )}
          </div>
        </div>

        {reports.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="inline-flex p-0.5 bg-slate-950 border border-slate-800 rounded-lg">
              <button onClick={() => setView('class')} className={segment(view === 'class')}>
                {mn ? 'Бүх анги' : 'Whole class'}
              </button>
              <button onClick={() => setView('student')} className={segment(view === 'student')}>
                {mn ? 'Нэг сурагч' : 'One student'}
              </button>
            </div>
            <div className="inline-flex p-0.5 bg-slate-950 border border-slate-800 rounded-lg">
              {(['core', 'extended'] as const).map(l => (
                <button key={l} onClick={() => setLevel(l)} className={segment(level === l)}>
                  {l === 'core' ? 'Core' : 'Extended'}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-500">
              {mn
                ? 'Core = бүх сурагчид; Extended = Core + нэмэлт (A*–C)'
                : 'Core = all candidates; Extended = Core + supplement (A*–C)'}
            </span>
          </div>
        )}

        {notice && <p className="text-xs text-teal-400">{notice}</p>}
      </div>

      {reports.length === 0 ? emptyState : view === 'class' ? classView : studentView}
    </div>
  );
};
