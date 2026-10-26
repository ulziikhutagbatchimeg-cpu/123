import React, { useState } from 'react';
import { Lock, Send } from 'lucide-react';
import type { EnrollmentStatus } from '../lib/cloud';

interface EnrollmentGateProps {
  mn: boolean;
  programmeLabel: string;
  status: EnrollmentStatus | null;
  onRequest: () => Promise<void>;
}

// Shown to a signed-in student who has no approved enrollment in the programme on screen. It covers that one programme only.
export const EnrollmentGate: React.FC<EnrollmentGateProps> = ({ mn, programmeLabel, status, onRequest }) => {
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const canRequest = status === null || status === 'rejected';

  const send = async () => {
    setSending(true);
    setFailed(false);
    try {
      await onRequest();
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const message = status === 'requested'
    ? (mn
      ? 'Таны хүсэлт багшид хүрсэн. Зөвшөөрсний дараа хичээлүүд автоматаар нээгдэнэ.'
      : 'Your request has reached the teacher. Lessons open automatically once it is approved.')
    : status === 'rejected'
      ? (mn ? 'Таны өмнөх хүсэлтийг багш татгалзсан. Дахин илгээж болно.' : 'Your last request was declined. You can send it again.')
      : (mn
        ? 'Энэ хөтөлбөрийн хичээлүүд багш зөвшөөрсний дараа нээгдэнэ. Доорх товчоор элсэх хүсэлтээ илгээнэ үү.'
        : 'Lessons in this programme open once your teacher approves your enrollment. Send a request below.');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Lock className="w-5 h-5 text-slate-500" />
        </div>
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500">{programmeLabel}</p>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {mn ? 'Хөтөлбөрт элсэх' : 'Enroll in this programme'}
          </h2>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{message}</p>

      {failed && (
        <p className="text-sm text-rose-600 dark:text-rose-400">
          {mn ? 'Хүсэлт илгээж чадсангүй. Дахин оролдоно уу.' : 'The request could not be sent. Please try again.'}
        </p>
      )}

      {canRequest && (
        <button
          type="button"
          onClick={send}
          disabled={sending}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-bold transition-colors"
        >
          <Send className="w-4 h-4" />
          {sending ? (mn ? 'Илгээж байна…' : 'Sending…') : (mn ? 'Элсэх хүсэлт илгээх' : 'Send enrollment request')}
        </button>
      )}
    </div>
  );
};
