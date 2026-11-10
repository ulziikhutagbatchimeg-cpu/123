import { useEffect, useState } from 'react';
import { subscribeWaitingEnrollments, type Enrollment } from './cloud';

// The enrolment requests waiting for the teacher, kept up to date. Only the teacher may read them; anyone else gets none.
export const useWaitingEnrollments = (): Enrollment[] => {
  const [list, setList] = useState<Enrollment[]>([]);
  useEffect(() => subscribeWaitingEnrollments(setList, () => setList([])), []);
  return list;
};

// The browser's own pop-up notice (the one that shows even while another tab is in front). The teacher turns it on once
// with the button in the Enrollments tab; the browser then asks for permission.
export type DesktopNoticeState = 'unsupported' | 'default' | 'granted' | 'denied';
export const desktopNoticeState = (): DesktopNoticeState => {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  return Notification.permission as DesktopNoticeState;
};
export const askDesktopNotices = async (): Promise<DesktopNoticeState> => {
  if (desktopNoticeState() === 'unsupported') return 'unsupported';
  try {
    return (await Notification.requestPermission()) as DesktopNoticeState;
  } catch {
    return desktopNoticeState();
  }
};
export const showDesktopNotice = (title: string, body: string) => {
  if (desktopNoticeState() !== 'granted') return;
  try {
    new Notification(title, { body, tag: 'chem-enrolment-request' });
  } catch {
    // Some browsers only allow notices from a service worker; the bell and the badges still show the request
  }
};
