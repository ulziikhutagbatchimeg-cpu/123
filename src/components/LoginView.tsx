import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import {
  isValidEmail,
  resetStudentPassword,
  signInStudent,
  signInTeacher,
  setRememberMe,
  setStudentName,
  signOutUser,
  signUpStudent,
  useAuthUser
} from '../lib/cloud';
import { SITE_ADDRESSES } from './SiteAddresses';

const CARD =
  'max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4';
const INPUT =
  'w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white';
const BUTTON =
  'flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-white text-xs font-bold';
const LINK =
  'text-xs font-bold text-violet-700 dark:text-violet-300 hover:underline disabled:opacity-40 disabled:cursor-not-allowed';

const WRONG_LOGIN = ['auth/invalid-credential', 'auth/invalid-login-credentials', 'auth/wrong-password', 'auth/user-not-found'];

// The message for an error, in the language on screen. Setup problems name the step to fix. Any other code is shown
// as it is, so it can be looked up in the Firebase console.
const errorText = (code: string, mn: boolean, action: 'in' | 'up' | 'reset') => {
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
  if (code === 'auth/operation-not-allowed') {
    return mn
      ? 'Имэйлээр нэвтрэх Firebase дээр идэвхжээгүй байна: Authentication → Sign-in method → Email/Password.'
      : 'Email sign-in is not turned on. In Firebase: Authentication → Sign-in method → Email/Password.';
  }
  if (code === 'auth/unauthorized-domain') {
    return mn
      ? 'Энэ сайтын хаяг Firebase-д зөвшөөрөгдөөгүй байна: Authentication → Settings → Authorized domains.'
      : 'This site address is not authorized. In Firebase: Authentication → Settings → Authorized domains.';
  }
  if (code === 'auth/invalid-api-key' || code === 'auth/api-key-not-valid' || code === 'auth/configuration-not-found') {
    return mn
      ? `Firebase-ийн тохиргоо буруу эсвэл дутуу байна (.env.local). Код: ${code}`
      : `The Firebase setup is wrong or incomplete (.env.local). Code: ${code}`;
  }
  if (action === 'in' && WRONG_LOGIN.includes(code)) {
    return mn ? 'Имэйл эсвэл нууц үг буруу байна.' : 'The email or password is not right.';
  }
  const reason =
    action === 'up'
      ? mn ? 'Бүртгүүлж чадсангүй.' : 'Could not register.'
      : action === 'reset'
        ? mn ? 'Сэргээх холбоос илгээж чадсангүй.' : 'Could not send the reset link.'
        : mn ? 'Нэвтэрч чадсангүй.' : 'Could not sign in.';
  if (!code) return `${reason} ${mn ? 'Дахин оролдоно уу.' : 'Try again.'}`;
  return `${reason} ${mn ? 'Код:' : 'Code:'} ${code}`;
};

// The message for a teacher sign-in error. A closed pop-up is not an error, so it gives no message.
const teacherErrorText = (code: string, mn: boolean): string | null => {
  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return null;
  if (code === 'auth/popup-blocked') {
    return mn
      ? 'Браузер popup цонхыг хаасан байна. Энэ сайтад popup зөвшөөрөөд дахин оролдоно уу.'
      : 'The browser blocked the sign-in window. Allow pop-ups for this site and try again.';
  }
  if (code === 'auth/operation-not-allowed') {
    return mn
      ? 'Google-ээр нэвтрэх Firebase дээр идэвхжээгүй байна: Authentication → Sign-in method → Google.'
      : 'Google sign-in is not turned on. In Firebase: Authentication → Sign-in method → Google.';
  }
  if (code === 'auth/unauthorized-domain') {
    return mn
      ? 'Энэ сайтын хаяг Firebase-д зөвшөөрөгдөөгүй байна: Authentication → Settings → Authorized domains.'
      : 'This site address is not authorized. In Firebase: Authentication → Settings → Authorized domains.';
  }
  if (code === 'auth/auth-domain-config-required' || code === 'auth/invalid-auth-domain') {
    return mn
      ? 'Firebase тохиргоонд VITE_FIREBASE_AUTH_DOMAIN дутуу байна (.env.local).'
      : 'The Firebase setup has no VITE_FIREBASE_AUTH_DOMAIN (.env.local).';
  }
  if (!code) {
    return mn ? 'Firebase тохиргоо дутуу байна (.env.local).' : 'The Firebase setup is missing (.env.local).';
  }
  return mn ? `Багшаар нэвтэрч чадсангүй. Код: ${code}` : `Teacher sign-in failed. Code: ${code}`;
};

// The student's sign-in card: the login name (the email) and the password, Forgot password, Remember me. A new student
// switches to Register, which asks for a name as well. Both use the email and the password.
const FORM_LABEL = 'block text-sm font-bold text-slate-800 dark:text-slate-100 mb-1.5';
export const LoginForm: React.FC<{ mn: boolean; onDone?: () => void }> = ({ mn, onDone }) => {
  const [registering, setRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const emailOk = isValidEmail(email);
  const filled = emailOk && password.length >= 6 && (!registering || name.trim().length > 0);

  const submit = async () => {
    if (!emailOk) {
      setError(mn ? 'Имэйл хаягаа зөв бичнэ үү.' : 'Enter a valid email address.');
      return;
    }
    if (registering && !name.trim()) {
      setError(mn ? 'Нэрээ оруулна уу.' : 'Enter your name.');
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await setRememberMe(remember);
      if (registering) {
        await signUpStudent(email, password);
        await setStudentName(name);
      } else {
        await signInStudent(email, password);
      }
      setPassword('');
      onDone?.();
    } catch (err) {
      setError(errorText((err as { code?: string }).code ?? '', mn, registering ? 'up' : 'in'));
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
        setError(errorText(code, mn, 'reset'));
      }
    } finally {
      setBusy(false);
    }
  };

  const switchMode = () => {
    setRegistering(r => !r);
    setError(null);
    setNotice(null);
  };

  return (
    <div className="space-y-4">
      {registering && (
        <div>
          <label className={FORM_LABEL}>{mn ? 'Нэр' : 'Name'}</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={40}
            autoComplete="name"
            className={INPUT}
          />
        </div>
      )}

      <div>
        <label className={FORM_LABEL}>{mn ? 'Нэвтрэх нэр' : 'Login name'}</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={mn ? 'Имэйл хаяг' : 'Email address'}
          autoComplete="email"
          className={INPUT}
        />
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <label className={FORM_LABEL}>{mn ? 'Нууц үг' : 'Password'}</label>
          {!registering && (
            <button type="button" disabled={busy || !emailOk} onClick={forgot} className={LINK}>
              {mn ? 'Нууц үг сэргээх?' : 'Forgot password?'}
            </button>
          )}
        </div>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder={mn ? 'Дор хаяж 6 тэмдэгт' : 'At least 6 characters'}
          autoComplete={registering ? 'new-password' : 'current-password'}
          className={INPUT}
        />
      </div>

      {!registering && (
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
          {mn ? 'Нэвтрэх эрхээ сануулах' : 'Keep me signed in'}
        </label>
      )}

      <button type="button" disabled={busy || !filled} onClick={submit} className={`${BUTTON} w-full`}>
        {registering ? (mn ? 'Бүртгүүлэх' : 'Register') : mn ? 'Нэвтрэх' : 'Log in'} →
      </button>

      <p className="text-center text-sm text-slate-600 dark:text-slate-300">
        {registering ? (mn ? 'Бүртгэлтэй юу?' : 'Already registered?') : mn ? 'Бүртгэлгүй юу?' : 'No account yet?'}{' '}
        <button type="button" onClick={switchMode} className={LINK}>
          {registering ? (mn ? 'Нэвтрэх' : 'Log in') : mn ? 'Бүртгүүлэх' : 'Register'}
        </button>
      </p>

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
  const [teacherError, setTeacherError] = useState<string | null>(null);

  // The error is shown on the page, so a failed Google sign-in is no longer silent
  const teacherSignIn = () => {
    setTeacherError(null);
    signInTeacher().catch((err: unknown) => {
      setTeacherError(teacherErrorText((err as { code?: string }).code ?? '', mn));
    });
  };

  return (
    <section className={CARD}>
      <h1 className="text-lg font-black text-slate-900 dark:text-white">{mn ? 'Нэвтрэх' : 'Log in'}</h1>

      {/* The three programme sites, one tap each, so a student does not have to search for their own */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {mn ? 'Хөтөлбөрөө сонгох' : 'Choose your programme'}
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {SITE_ADDRESSES.map(site => (
            <a
              key={site.id}
              href={site.url}
              className="block rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2.5 text-sm font-bold text-slate-900 dark:text-white hover:border-emerald-500"
            >
              {site.label}
            </a>
          ))}
        </div>
      </div>

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
              onClick={teacherSignIn}
              className="text-xs font-bold text-violet-700 dark:text-violet-300 hover:underline"
            >
              {mn ? 'Багш нэвтрэх (Google)' : 'Teacher sign-in (Google)'}
            </button>
            {teacherError && <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">{teacherError}</p>}
          </div>
        </>
      )}
    </section>
  );
};
