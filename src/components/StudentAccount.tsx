import React, { useState } from 'react';
import type { User } from 'firebase/auth';
import { Cloud, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { signInStudent, signOutUser, signUpStudent } from '../lib/cloud';
import { isFirebaseConfigured } from '../lib/firebase';
import { FoldCard } from './FoldCard';

interface Props {
  user: User | null;
  hasName: boolean; // the name the teacher sees
  savedAt: string | null; // last successful save to Firebase
  saveError: string | null;
}

const INPUT =
  'w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-900 dark:text-white';
const BUTTON =
  'flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-bold';

// Optional sign-in. A signed-in student's progress is saved to Firebase so the teacher can see it.
export const StudentAccount: React.FC<Props> = ({ user, hasName, savedAt, saveError }) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isFirebaseConfigured) return null;

  const run = async (action: (email: string, password: string) => Promise<unknown>) => {
    setBusy(true);
    setAuthError(null);
    try {
      await action(email.trim(), password);
      setPassword('');
    } catch {
      setAuthError(
        mn
          ? 'Бүртгүүлж эсвэл нэвтэрч чадсангүй. Имэйл, нууц үгээ шалгана уу.'
          : 'Could not register or sign in. Check your email and password.'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <FoldCard
      title={
        <span className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Cloud className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
          {mn ? 'Багшид хадгалах' : 'Save to your teacher'}
        </span>
      }
      summary={
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {user ? (mn ? 'Нэвтэрсэн' : 'Signed in') : mn ? 'Нэвтрээгүй' : 'Not signed in'}
        </span>
      }
      alert={!!user && (!hasName || !!saveError)}
    >
      <div className="text-xs space-y-3">
        {user ? (
          <>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-600 dark:text-slate-300">
                {mn ? 'Явц багшид автоматаар хадгалагдана.' : 'Your progress saves to your teacher automatically.'}
              </span>
              <button
                onClick={() => signOutUser()}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:hover:text-white shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{mn ? 'Гарах' : 'Sign out'}</span>
              </button>
            </div>
            {!hasName && (
              <p className="text-amber-700 dark:text-amber-300">
                {mn ? 'Доорх "Таны нэр" хэсэгт нэрээ оруулбал хадгалагдана.' : 'Type your name in the box below to start saving.'}
              </p>
            )}
            {saveError ? (
              <p className="text-rose-600 dark:text-rose-400">
                {mn ? 'Хадгалж чадсангүй. Интернэт холболтоо шалгана уу.' : 'Could not save. Check your internet connection.'}
              </p>
            ) : savedAt ? (
              <p className="text-slate-500 dark:text-slate-400">
                {mn ? 'Сүүлд хадгалсан:' : 'Last saved:'}{' '}
                {new Date(savedAt).toLocaleTimeString(mn ? 'mn-MN' : 'en-GB', { hour: '2-digit', minute: '2-digit' })}
              </p>
            ) : null}
          </>
        ) : (
          <>
            <p className="text-slate-600 dark:text-slate-300">
              {mn
                ? 'Нэвтэрвэл явцаа багшид автоматаар хадгалуулна. Нэвтрэхгүй бол файлаар илгээж болно.'
                : 'Sign in to save your progress to your teacher automatically. Without signing in, you can still send a file.'}
            </p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={mn ? 'Имэйл' : 'Email'}
              className={INPUT}
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={mn ? 'Нууц үг (дор хаяж 6 тэмдэгт)' : 'Password (at least 6 characters)'}
              className={INPUT}
            />
            <div className="flex gap-2">
              <button
                type="button"
                disabled={busy || !email.trim() || password.length < 6}
                onClick={() => run(signInStudent)}
                className={BUTTON}
              >
                {mn ? 'Нэвтрэх' : 'Sign in'}
              </button>
              <button
                type="button"
                disabled={busy || !email.trim() || password.length < 6}
                onClick={() => run(signUpStudent)}
                className={BUTTON}
              >
                {mn ? 'Бүртгүүлэх' : 'Register'}
              </button>
            </div>
            {authError && <p className="text-rose-600 dark:text-rose-400">{authError}</p>}
          </>
        )}
      </div>
    </FoldCard>
  );
};
