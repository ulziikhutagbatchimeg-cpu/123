import React, { useState } from 'react';
import { isTeacher, signInTeacher, signOutUser } from '../lib/cloud';

// Shown where a part of the Teacher Hub needs the teacher's account and the visitor is not signed in as the teacher. It says so in
// plain words and offers the sign-in, so the visitor does not read a raw error code.
export const TeacherSignInNotice: React.FC<{ mn: boolean }> = ({ mn }) => {
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const signIn = async () => {
    setBusy(true);
    setNote(null);
    try {
      const result = await signInTeacher();
      // Any other Google account is signed out again at once
      if (!isTeacher(result.user)) {
        await signOutUser();
        setNote(mn ? 'Энэ данс багшийн данс биш байна.' : 'This is not the teacher account.');
      }
    } catch {
      setNote(mn ? 'Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.' : 'Sign-in failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 space-y-3">
      <div className="text-sm font-bold text-amber-800">
        {mn ? 'Энэ хэсэг зөвхөн багшид зориулагдсан' : 'This part is for the teacher only'}
      </div>
      <p className="text-xs leading-relaxed text-amber-100/90">
        {mn
          ? 'Сурагчдын үр дүнг зөвхөн багшийн данс харна. Сурагч бол энэ хэсгийг нээх шаардлагагүй.'
          : 'Students’ results are shown only to the teacher’s account. If you are a student, you do not need this part.'}
      </p>
      <button
        type="button"
        onClick={signIn}
        disabled={busy}
        className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-black text-slate-900 hover:bg-amber-300 disabled:opacity-50"
      >
        {busy ? (mn ? 'Нэвтэрч байна…' : 'Signing in…') : mn ? 'Багшаар нэвтрэх' : 'Sign in as the teacher'}
      </button>
      {note && <p className="text-xs text-rose-700">{note}</p>}
    </div>
  );
};
