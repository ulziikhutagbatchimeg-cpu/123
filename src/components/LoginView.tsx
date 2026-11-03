import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import {
  isValidEmail,
  resetStudentPassword,
  signInStudent,
  signInTeacher,
  signOutUser,
  signUpStudent,
  useAuthUser
} from '../lib/cloud';

const CARD =
  'max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4';
const INPUT =
  'w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white';
const BUTTON =
  'flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-white text-xs font-bold';
const LINK =
  'text-xs font-bold text-violet-700 dark:text-violet-300 hover:underline disabled:opacity-40 disabled:cursor-not-allowed';

// The message for an error, in the language on screen
const errorText = (code: string, mn: boolean, registering: boolean) => {
  if (code === 'auth/email-already-in-use') {
    return mn ? 'Энэ имэйл бүртгэлтэй байна. Нэвтэрнэ үү.' : 'This email is already registered. Sign in instead.';
  }
  if (code === 'auth/invalid-email') {
    return mn ? 'Имэйл хаяг буруу байна.' : 'The email address is not valid.';
  }
  if (code === 'auth/weak-password') {
    return mn ? 'Нууц үг дор хаяж 6 тэмдэгт байх ёстой.' : 'The password needs at least 6 characters.';
  }
  if (code === 'auth/too-many-requests') {
    return mn ? 'Хэт олон оролдлого. Түр хүлээгээд дахин оролдоно уу.' : 'Too many attempts. Wait a little and try again.';
  }
  if (code === 'auth/network-request-failed') {
    return mn ? 'Интернэт холболтоо шалгана уу.' : 'Check your internet connection.';
  }
  if (registering) {
    return mn ? 'Бүртгүүлж чадсангүй. Дахин оролдоно уу.' : 'Could not register. Try again.';
  }
  return mn ? 'Имэйл эсвэл нууц үг буруу байна.' : 'The email or password is not right.';
};

// The student's sign-in: an email and a password. Register creates the account; Forgot password sends a reset link.
export const LoginForm: React.FC<{ mn: boolean; onDone?: () => void }> = ({ mn, onDone }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const emailOk = isValidEmail(email);
  const filled = emailOk && password.length >= 6;

  const run = async (registering: boolean) => {
    if (!emailOk) {
      setError(mn ? 'Имэйл хаягаа зөв бичнэ үү.' : 'Enter a valid email address.');
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (registering) await signUpStudent(email, password);
      else await signInStudent(email, password);
      setPassword('');
      onDone?.();
    } catch (err) {
      setError(errorText((err as { code?: string }).code ?? '', mn, registering));
    } finally {
      setBusy(false);
    }
  };

  const forgot = async () => {
    if (!emailOk) {
      setError(mn ? 'Имэйл хаягаа зөв бичнэ үү.' : 'Enter a valid email address.');
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await resetStudentPassword(email);
      setNotice(
        mn
          ? 'Хэрвээ энэ имэйл бүртгэлтэй бол нууц үг сэргээх холбоос очлоо. Имэйлээ шалгана уу.'
          : 'If this email has an account, a reset link has been sent. Check your inbox.'
      );
    } catch (err) {
      const code = (err as { code?: string }).code ?? '';
      // Same message for an unknown address, so the form does not reveal which emails have accounts
      if (code === 'auth/user-not-found') {
        setNotice(
          mn
            ? 'Хэрвээ энэ имэйл бүртгэлтэй бол нууц үг сэргээх холбоос очлоо. Имэйлээ шалгана уу.'
            : 'If this email has an account, a reset link has been sent. Check your inbox.'
        );
      } else {
        setError(errorText(code, mn, false));
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2.5">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={mn ? 'Имэйл' : 'Email'}
        autoComplete="email"
        className={INPUT}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder={mn ? 'Нууц үг (дор хаяж 6 тэмдэгт)' : 'Password (at least 6 characters)'}
        autoComplete="current-password"
        className={INPUT}
      />
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        {mn
          ? 'Анх удаа бол Бүртгүүлэх дээр дарна уу. Нууц үг сэргээхэд энэ имэйл хэрэгтэй.'
          : 'New here? Press Register. This email is needed to reset your password.'}
      </p>
      <div className="flex gap-2">
        <button type="button" disabled={busy || !filled} onClick={() => run(false)} className={BUTTON}>
          {mn ? 'Нэвтрэх' : 'Log in'}
        </button>
        <button type="button" disabled={busy || !filled} onClick={() => run(true)} className={BUTTON}>
          {mn ? 'Бүртгүүлэх' : 'Register'}
        </button>
      </div>
      <button type="button" disabled={busy || !emailOk} onClick={forgot} className={LINK}>
        {mn ? 'Нууц үг мартсан' : 'Forgot password'}
      </button>
      {notice && <p className="text-xs text-emerald-700 dark:text-emerald-300">{notice}</p>}
      {error && <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  );
};

// The Log in tab: the student's sign-in or register and the teacher's Google sign-in. Once signed in, it shows Sign out.
export const LoginView: React.FC = () => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const { setActiveTab } = useApp();
  const { user } = useAuthUser();

  return (
    <section className={CARD}>
      <h1 className="text-lg font-black text-slate-900 dark:text-white">{mn ? 'Нэвтрэх' : 'Log in'}</h1>

      {user ? (
        <div className="space-y-3">
          <p className="text-sm text-slate-700 dark:text-slate-300">{mn ? 'Та нэвтэрсэн байна.' : 'You are signed in.'}</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => setActiveTab('dashboard')} className={BUTTON}>
              {mn ? 'Хяналт руу' : 'Go to Dashboard'}
            </button>
            <button
              type="button"
              onClick={() => signOutUser()}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              {mn ? 'Гарах' : 'Sign out'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <LoginForm mn={mn} onDone={() => setActiveTab('dashboard')} />
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
            <button
              type="button"
              onClick={() => signInTeacher().catch(() => undefined)}
              className="text-xs font-bold text-violet-700 dark:text-violet-300 hover:underline"
            >
              {mn ? 'Багш нэвтрэх (Google)' : 'Teacher sign-in (Google)'}
            </button>
          </div>
        </>
      )}
    </section>
  );
};
