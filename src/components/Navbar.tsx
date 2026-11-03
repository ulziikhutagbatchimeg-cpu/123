import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CourseSwitch } from './CourseSwitch';
import { courseMistakes } from '../data/courseScope';
import { isTeacher, useAuthUser } from '../lib/cloud';
import { isFirebaseConfigured } from '../lib/firebase';
import { useTheme } from '../context/ThemeContext';
import { buildStudentGroups, navGroupBadge, type NavLink } from '../lib/studentMenu';
import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  Users,
  LayoutDashboard,
  Sun,
  Moon,
  Grid,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogIn,
  Settings
} from 'lucide-react';

const badgeEl = (count: number) => (
  <span className="ml-1 px-1.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">{count}</span>
);

const activeCls =
  'bg-emerald-50 text-emerald-800 dark:bg-slate-800 dark:text-teal-300 font-bold border border-emerald-200/80 dark:border-slate-700';
const idleCls = 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900';

// The columns of the tab row: the four pages, then the Log in tab and the Teacher tab when they show
const TAB_COLUMNS = ['grid-cols-4', 'grid-cols-5', 'grid-cols-6'];

// The navigation: Dashboard, Lessons, Student area, Periodic table and Teacher. Each opens one page; the Student area page
// holds its own tools, so the bar stays the same for every student.
export const Navbar: React.FC = () => {
  const { mode, setMode } = useLanguage();
  const { activeTab, setActiveTab, role, setRole, mistakes, programme, courseChoice } = useApp();
  const { theme, toggleTheme } = useTheme();
  // The teacher's pages and the role switch are for the teacher's signed-in account only
  const { user } = useAuthUser();
  const teacherSignedIn = isTeacher(user);
  const extraTabs = (isFirebaseConfigured ? 1 : 0) + (teacherSignedIn ? 1 : 0);
  // The language and the light or dark theme sit behind one Settings button, so the bar stays short
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const modeLabel = mode === 'en' ? 'EN' : mode === 'mn' ? 'MN' : 'Dual';

  const mn = mode === 'mn';
  const unresolvedMistakesCount = courseMistakes(mistakes, courseChoice).filter(m => !m.resolved).length;

  // Top-level tabs
  const dashboard: NavLink = {
    id: 'dashboard',
    labelEn: 'Dashboard',
    labelMn: 'Dashboard',
    descEn: '',
    descMn: '',
    icon: <LayoutDashboard className="w-4 h-4" />
  };
  const curriculum: NavLink = {
    id: 'curriculum',
    labelEn: 'Syllabus & Lessons',
    labelMn: 'Хичээлүүд',
    descEn: '',
    descMn: '',
    icon: <BookOpen className="w-4 h-4" />
  };
  const periodic: NavLink = {
    id: 'periodictable',
    labelEn: 'Periodic Table',
    labelMn: 'Үелэх хүснэгт',
    descEn: '',
    descMn: '',
    icon: <Grid className="w-4 h-4" />
  };
  const teacher: NavLink = {
    id: 'teacher',
    labelEn: 'Teacher Area',
    labelMn: 'Багшийн талбар',
    descEn: '',
    descMn: '',
    icon: <Users className="w-4 h-4" />
  };

  // The student tools, grouped the same way on the Student area page. The badge counts what needs attention.
  const studentGroups = buildStudentGroups(programme, unresolvedMistakesCount);
  const studentLinks = studentGroups.flatMap(g => g.items);
  const studentLabel = mn ? 'Суралцагчийн талбар' : 'Student Area';
  const studentBadge = studentGroups.reduce((sum, g) => sum + navGroupBadge(g), 0);
  const studentActive = activeTab === 'student' || studentLinks.some(i => i.id === activeTab);

  const directButton = (link: NavLink) => {
    const active = activeTab === link.id;
    return (
      <button
        onClick={() => setActiveTab(link.id)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${active ? activeCls : idleCls}`}
      >
        {link.icon}
        <span>{mn ? link.labelMn : link.labelEn}</span>
      </button>
    );
  };

  // Mobile top-level tab: icon + short label, dot when something needs attention
  const mobileTab = (key: string, label: string, icon: React.ReactNode, active: boolean, badge: number, onClick: () => void) => (
    <button
      key={key}
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl text-[11px] font-semibold transition-colors ${
        active ? 'bg-emerald-100 text-emerald-800 dark:bg-teal-500/20 dark:text-teal-300 font-bold' : 'text-slate-600 dark:text-slate-400'
      }`}
    >
      {icon}
      <span className="truncate max-w-full">{label}</span>
      {badge > 0 && <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500" />}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-xs transition-colors">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark, with small back and forward arrows to the page before and after, as in the browser */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-teal-400 transition-colors shrink-0 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-teal-500/20 border border-emerald-500/30 dark:border-teal-500/40 flex items-center justify-center text-emerald-600 dark:text-teal-300 shadow-xs">
              <FlaskConical className="w-4 h-4" />
            </div>
            <span className="hidden lg:inline-block min-w-0 truncate max-w-[14rem] xl:max-w-none">Cambridge Chemistry 0620 · 9701 Study Hub</span>
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            aria-label={mn ? 'Өмнөх хуудас' : 'Previous page'}
            title={mn ? 'Өмнөх хуудас' : 'Previous page'}
            className="hidden sm:block p-1 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => window.history.forward()}
            aria-label={mn ? 'Дараагийн хуудас' : 'Next page'}
            title={mn ? 'Дараагийн хуудас' : 'Next page'}
            className="hidden sm:block p-1 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* The course on screen, next to the page arrows */}
          <div className="ml-3">
            <CourseSwitch />
          </div>
        </div>

        {/* Zone 3: Actions (Settings, Course, Role) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Settings: the language and the light or dark theme, behind one button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSettingsOpen(open => !open)}
              aria-expanded={settingsOpen}
              aria-label={mn ? 'Тохиргоо' : 'Settings'}
              title={mn ? 'Тохиргоо' : 'Settings'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-100"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{modeLabel}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
            </button>
            {settingsOpen && (
              <div className="absolute right-0 z-50 mt-2 w-56 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl space-y-2">
                <div className="px-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {mn ? 'Хэл' : 'Language'}
                </div>
                <div className="space-y-1">
                  {([
                    { id: 'en', label: 'English (EN)' },
                    { id: 'mn', label: 'Монгол (MN)' },
                    { id: 'dual', label: 'Dual (EN үндсэн + MN)' }
                  ] as const).map(option => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setMode(option.id);
                        setSettingsOpen(false);
                      }}
                      className={`w-full px-3 py-2.5 rounded-xl text-left text-sm font-bold transition-colors ${
                        mode === option.id
                          ? 'bg-emerald-50 dark:bg-teal-500/20 text-emerald-800 dark:text-teal-300'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="px-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {mn ? 'Харагдац' : 'Appearance'}
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <span>
                    {theme === 'light'
                      ? mn ? 'Харанхуй горим' : 'Dark mode'
                      : mn ? 'Гэрэлтэй горим' : 'Light mode'}
                  </span>
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Role Switcher: only for the teacher's signed-in account */}
          {teacherSignedIn && (
          <button
            onClick={() => setRole(role === 'student' ? 'teacher' : 'student')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap hidden sm:flex items-center gap-1.5 shadow-xs ${
              role === 'teacher'
                ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-600 text-purple-800 dark:text-purple-200'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{role === 'student' ? (mn ? 'Сурагч' : 'Student') : (mn ? 'Багш' : 'Teacher')}</span>
          </button>
          )}
        </div>
      </div>

      {/* The pages in one row under the top bar, on every width: icon above label, the row filling the width */}
      <div className="bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
        <div className={`max-w-[1600px] mx-auto grid ${TAB_COLUMNS[extraTabs]} gap-1 px-2 py-2 sm:px-6`}>
          {mobileTab('dashboard', mn ? 'Хяналт' : 'Dashboard', dashboard.icon, activeTab === 'dashboard', 0, () => setActiveTab('dashboard'))}
          {mobileTab('curriculum', mn ? 'Хичээл' : 'Lessons', curriculum.icon, activeTab === 'curriculum', 0, () => setActiveTab('curriculum'))}
          {mobileTab(
            'student',
            mn ? 'Суралцагч' : 'Student',
            <GraduationCap className="w-4 h-4" />,
            studentActive,
            studentBadge,
            () => setActiveTab('student')
          )}
          {mobileTab('periodic', mn ? 'Үелэх' : 'Periodic', periodic.icon, activeTab === 'periodictable', 0, () => setActiveTab('periodictable'))}
          {teacherSignedIn && mobileTab('teacher', mn ? 'Багш' : 'Teacher', teacher.icon, activeTab === 'teacher', 0, () => setActiveTab('teacher'))}
          {isFirebaseConfigured &&
            mobileTab(
              'login',
              user ? (mn ? 'Данс' : 'Account') : (mn ? 'Нэвтрэх' : 'Log in'),
              <LogIn className="w-4 h-4" />,
              activeTab === 'login',
              0,
              () => setActiveTab('login')
            )}
        </div>
      </div>
    </header>
  );
};
