import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { useLanguage } from '../context/LanguageContext';

// The address of this site without any query or hash, for example https://.../123/
const siteAddress = (): string => window.location.href.split(/[?#]/)[0];

// The steps a student takes on the sign-in window. Mongolian and English; Dual shows both.
const STEPS: Array<{ mn: [string, string]; en: [string, string] }> = [
  {
    mn: ['Бүртгүүлэх (анх удаа) эсвэл нэвтрэх', 'Имэйл, нууц үг (дор хаяж 6 тэмдэгт).'],
    en: ['Register (first time) or log in', 'Email and a password of at least 6 characters.']
  },
  {
    mn: ['Овог, нэр, анги', 'Нэрээ бүтнээр бичиж ангиа сонгоод «Элсэх хүсэлт илгээх».'],
    en: ['Full name and class', 'Write your full name, choose your class, then send the enrollment request.']
  },
  {
    mn: ['Багш зөвшөөрнө', 'Зөвшөөрсний дараа хичээлүүд автоматаар нээгдэнэ.'],
    en: ['Your teacher approves', 'Once approved, the lessons open by themselves.']
  },
  {
    mn: ['Өөрийн үнэлгээ', 'Таван асуултыг 1–5-аар үнэлсний дараа хичээл нээгдэнэ.'],
    en: ['Rate yourself', 'Rate the five questions from 1 to 5. Then the lessons open.']
  }
];

// A card beside the sign-in window: the steps in text, and a QR code of this site's address
export const SignInGuide: React.FC = () => {
  const { mode } = useLanguage();
  const address = siteAddress();
  const [picture, setPicture] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(address, { width: 200, margin: 1, errorCorrectionLevel: 'M' })
      .then((url: string) => {
        if (!cancelled) setPicture(url);
      })
      .catch(() => {
        if (!cancelled) setPicture(null);
      });
    return () => {
      cancelled = true;
    };
  }, [address]);

  // The first line of a step is the main one; in Dual the other language sits under it
  const lines = (step: (typeof STEPS)[number]) => {
    if (mode === 'en') return { head: step.en[0], body: step.en[1], sub: null };
    if (mode === 'mn') return { head: step.mn[0], body: step.mn[1], sub: null };
    return { head: step.mn[0], body: step.mn[1], sub: step.en[0] };
  };

  return (
    <section className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-base font-black text-slate-900 dark:text-white">
        {mode === 'en' ? 'Sign-in guide' : 'Нэвтрэх заавар'}
        {mode === 'dual' && <span className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-400">Sign-in guide</span>}
      </h2>

      <ol className="mt-4 space-y-3">
        {STEPS.map((step, i) => {
          const t = lines(step);
          return (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">
                {i + 1}
              </span>
              <span className="min-w-0 text-sm">
                <span className="block font-bold text-slate-900 dark:text-white">{t.head}</span>
                <span className="block text-xs leading-snug text-slate-600 dark:text-slate-300">{t.body}</span>
                {t.sub && <span className="block text-[11px] text-slate-500 dark:text-slate-400">{t.sub}</span>}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex items-center gap-4 border-t border-slate-200 pt-4 dark:border-slate-800">
        {picture ? (
          <img src={picture} alt={mode === 'en' ? 'QR code of this address' : 'Энэ хаягийн QR код'} className="h-28 w-28 shrink-0 rounded-lg bg-white" />
        ) : (
          <div className="flex h-28 w-28 shrink-0 items-center justify-center text-xs text-slate-500">…</div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 dark:text-white">{mode === 'en' ? 'Scan to open' : 'Скан хийж нээнэ'}</p>
          <p className="mt-1 break-all text-[11px] text-slate-500 dark:text-slate-400">{address}</p>
        </div>
      </div>
    </section>
  );
};
