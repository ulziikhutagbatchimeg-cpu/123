import React, { useState } from 'react';
import { Lock, Send } from 'lucide-react';
import type { EnrollmentStatus, EnrollmentTrack } from '../lib/cloud';

interface EnrollmentGateProps {
  mn: boolean;
  programmeLabel: string;
  status: EnrollmentStatus | null;
  trackChoice: boolean; // IGCSE: the student picks Core or Extended before the request is sent
  onRequest: (track?: EnrollmentTrack) => Promise<void>;
}

const TRACKS: Array<{ id: EnrollmentTrack; labelEn: string; descEn: string; descMn: string }> = [
  { id: 'core', labelEn: 'Core', descEn: 'Core content for every candidate.', descMn: 'Бүх сурагчдад зориулсан Core агуулга.' },
  {
    id: 'extended',
    labelEn: 'Extended',
    descEn: 'Core and Extended (Supplement) content together.',
    descMn: 'Core болон Extended (Supplement) агуулга хамт.'
  }
];

// Shown to a signed-in student who has no approved enrollment in the programme on screen. It covers that one programme only.
export const EnrollmentGate: React.FC<EnrollmentGateProps> = ({ mn, programmeLabel, status, trackChoice, onRequest }) => {
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [track, setTrack] = useState<EnrollmentTrack | null>(null);
  const canRequest = status === null || status === 'rejected';
  const ready = !trackChoice || track !== null;

  const send = async () => {
    setSending(true);
    setFailed(false);
    try {
      await onRequest(trackChoice && track ? track : undefined);
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

      {canRequest && trackChoice && (
        <fieldset className="space-y-2">
          <legend className="text-sm font-bold text-slate-900 dark:text-white">
            {mn ? 'Аль агуулгаар суралцах вэ?' : 'Which content will you study?'}
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TRACKS.map(t => (
              <button
                key={t.id}
                type="button"
                aria-pressed={track === t.id}
                onClick={() => setTrack(t.id)}
                className={`p-3 rounded-xl border text-left transition-colors ${
                  track === t.id
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-emerald-500'
                }`}
              >
                <span className="block text-sm font-black">{t.labelEn}</span>
                <span className={`block text-xs mt-0.5 ${track === t.id ? 'text-emerald-50' : 'text-slate-600 dark:text-slate-400'}`}>
                  {mn ? t.descMn : t.descEn}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {failed && (
        <p className="text-sm text-rose-600 dark:text-rose-400">
          {mn ? 'Хүсэлт илгээж чадсангүй. Дахин оролдоно уу.' : 'The request could not be sent. Please try again.'}
        </p>
      )}

      {canRequest && (
        <button
          type="button"
          onClick={send}
          disabled={sending || !ready}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-bold transition-colors"
        >
          <Send className="w-4 h-4" />
          {sending ? (mn ? 'Илгээж байна…' : 'Sending…') : (mn ? 'Элсэх хүсэлт илгээх' : 'Send enrollment request')}
        </button>
      )}
    </div>
  );
};
