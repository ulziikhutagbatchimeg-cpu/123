import React, { useState } from 'react';
import { Lock, Send } from 'lucide-react';
import { GRADES, type EnrollmentStatus } from '../lib/cloud';

interface EnrollmentGateProps {
  mn: boolean;
  programmeLabel: string;
  status: EnrollmentStatus | null;
  defaultName: string; // the name on the student's Google account
  onRequest: (name: string, grade: string) => Promise<void>;
}

// A full name is at least two words: the surname and the given name
const isFullName = (name: string) => name.trim().split(/\s+/).filter(Boolean).length >= 2;

// Shown to a signed-in student who has no approved enrollment in the programme on screen. It covers that one programme only.
export const EnrollmentGate: React.FC<EnrollmentGateProps> = ({ mn, programmeLabel, status, defaultName, onRequest }) => {
  const [name, setName] = useState(defaultName);
  const [grade, setGrade] = useState('');
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const canRequest = status === null || status === 'rejected';
  const ready = isFullName(name) && grade !== '';

  const send = async () => {
    setSending(true);
    setFailed(false);
    try {
      await onRequest(name, grade);
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
    : status === 'suspended'
      ? (mn
        ? 'Энэ хөтөлбөрт таны эрхийг багш түр хаасан байна. Багштайгаа холбогдоно уу.'
        : 'Your access to this programme is paused by the teacher. Please contact your teacher.')
      : status === 'rejected'
        ? (mn ? 'Таны өмнөх хүсэлтийг багш татгалзсан. Нэр, ангиа шалгаад дахин илгээж болно.' : 'Your last request was declined. Check your name and class, then send it again.')
        : (mn
          ? 'Энэ хөтөлбөрийн хичээлүүд багш зөвшөөрсний дараа нээгдэнэ. Нэр, ангиа бөглөөд хүсэлтээ илгээнэ үү.'
          : 'Lessons in this programme open once your teacher approves your enrollment. Fill in your name and class, then send the request.');

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

      {canRequest && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="space-y-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white">{mn ? 'Овог, нэр' : 'Full name'}</span>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={40}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {!isFullName(name) && (
              <span className="block text-xs text-rose-600 dark:text-rose-400">
                {mn ? 'Овог, нэрээ бүтнээр нь бичнэ үү.' : 'Write your surname and given name.'}
              </span>
            )}
          </label>
          <label className="space-y-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white">{mn ? 'Анги' : 'Class'}</span>
            <select
              value={grade}
              onChange={e => setGrade(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">{mn ? 'Ангиа сонгоно уу' : 'Choose your class'}</option>
              {GRADES.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>
        </div>
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
