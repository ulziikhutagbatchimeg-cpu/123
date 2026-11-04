import React from 'react';
import type { User } from 'firebase/auth';
import { Cloud, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { signOutUser } from '../lib/cloud';
import { isFirebaseConfigured } from '../lib/firebase';
import { FoldCard } from './FoldCard';
import { LoginForm } from './LoginView';

interface Props {
  user: User | null;
  hasName: boolean; // the name the teacher sees
  savedAt: string | null; // last successful save to Firebase
  saveError: string | null;
  dense?: boolean; // a slimmer heading on a wide screen (the lessons sidebar)
}

// Optional sign-in. A signed-in student's progress is saved to Firebase so the teacher can see it.
export const StudentAccount: React.FC<Props> = ({ user, hasName, savedAt, saveError, dense = false }) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';

  if (!isFirebaseConfigured) return null;

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
      dense={dense}
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
            <LoginForm mn={mn} />
          </>
        )}
      </div>
    </FoldCard>
  );
};
