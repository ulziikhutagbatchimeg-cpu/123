import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { COURSE_CHOICES } from '../context/AppContext';
import { decideEnrollment, loadEnrollments, type Enrollment, type EnrollmentAccess } from '../lib/cloud';

const STATUS_ORDER = { requested: 0, approved: 1, rejected: 2 };

// The teacher's list of enrollment requests, one row per student per programme. Each can be approved with gated or full
// access, or rejected.
export const EnrollmentRequests: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const [items, setItems] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

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

  const decide = (item: Enrollment, status: 'approved' | 'rejected', access: EnrollmentAccess) => {
    decideEnrollment(item, status, access)
      .then(refresh)
      .catch(() => setFailed(true));
  };

  const programmeLabel = (id: Enrollment['programme']) => COURSE_CHOICES.find(c => c.id === id)?.labelEn ?? id;

  const statusLabel = (item: Enrollment) => {
    if (item.status === 'requested') return mn ? 'Хүлээгдэж буй' : 'Waiting for approval';
    if (item.status === 'rejected') return mn ? 'Татгалзсан' : 'Rejected';
    if (item.access === 'full') return mn ? 'Зөвшөөрсөн · бүтэн' : 'Approved · full';
    return mn ? 'Зөвшөөрсөн · үе шаттай' : 'Approved · gated';
  };

  const sorted = [...items].sort(
    (a, b) => (STATUS_ORDER[a.status] ?? 3) - (STATUS_ORDER[b.status] ?? 3) || b.requestedAt.localeCompare(a.requestedAt)
  );

  const choiceClass = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
      active
        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
        : 'text-slate-300 border-slate-700 hover:bg-slate-800'
    }`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">{mn ? 'Элсэлтийн хүсэлтүүд' : 'Enrollment requests'}</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          {mn
            ? 'Сурагч хөтөлбөр бүрт тусад нь хүсэлт илгээнэ. "Үе шаттай" бол хичээл нэг нэгээр нээгдэнэ: өмнөхийг 60%-иас дээш давсны дараа дараагийнх нь нээгдэнэ. "Бүтэн" бол бүх хичээл нээгдэнэ.'
            : 'Students request each programme separately. "Gated" opens the lessons one after another, each once the one before is passed above 60%. "Full" opens every lesson.'}
        </p>
      </div>

      {failed && (
        <p className="text-sm text-rose-400">
          {mn ? 'Жагсаалтыг ачаалах эсвэл шинэчлэхэд алдаа гарлаа.' : 'Could not load or update the requests.'}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-slate-400">{mn ? 'Ачаалж байна…' : 'Loading…'}</p>
      ) : sorted.length === 0 ? (
        <p className="text-sm text-slate-400">{mn ? 'Одоогоор хүсэлт алга.' : 'No requests yet.'}</p>
      ) : (
        <div className="space-y-2">
          {sorted.map(item => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950/60"
            >
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{item.name}</p>
                <p className="text-xs text-slate-400">
                  {programmeLabel(item.programme)} · {statusLabel(item)}
                  {item.requestedAt && ` · ${new Date(item.requestedAt).toLocaleDateString()}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => decide(item, 'approved', 'gated')}
                  className={choiceClass(item.status === 'approved' && item.access === 'gated')}
                >
                  {mn ? 'Үе шаттай зөвшөөрөх' : 'Approve: gated'}
                </button>
                <button
                  onClick={() => decide(item, 'approved', 'full')}
                  className={choiceClass(item.status === 'approved' && item.access === 'full')}
                >
                  {mn ? 'Бүтэн зөвшөөрөх' : 'Approve: full'}
                </button>
                <button
                  onClick={() => decide(item, 'rejected', item.access)}
                  className={choiceClass(item.status === 'rejected')}
                >
                  {mn ? 'Татгалзах' : 'Reject'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
