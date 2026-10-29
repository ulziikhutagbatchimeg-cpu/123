import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CourseSwitch } from './CourseSwitch';
import { courseMistakes } from '../data/courseScope';
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
  ChevronDown
} from 'lucide-react';

const badgeEl = (count: number) => (
  <span className="ml-1 px-1.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">{count}</span>
);

const activeCls =
  'bg-emerald-50 text-emerald-800 dark:bg-slate-800 dark:text-teal-300 font-bold border border-emerald-200/80 dark:border-slate-700';
const idleCls = 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900';

// The navigation: Dashboard, Lessons, Student area, Periodic table and Teacher. Each opens one page; the Student area page
// holds its own tools, so the bar stays the same for every student.
export const Navbar: React.FC = () => {
  const { mode, setMode } = useLanguage();
  const { activeTab, setActiveTab, role, setRole, mistakes, programme, courseChoice } = useApp();
  const { theme, toggleTheme } = useTheme();
  // The language choices sit behind one button, so the bar stays short
  const [langOpen, setLangOpen] = React.useState(false);
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
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-teal-400 transition-colors shrink-0 flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-teal-500/20 border border-emerald-500/30 dark:border-teal-500/40 flex items-center justify-center text-emerald-600 dark:text-teal-300 shadow-xs">
            <FlaskConical className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline-block min-w-0 truncate max-w-[14rem] xl:max-w-none">Cambridge Chemistry 0620 · 9701 Study Hub</span>
        </button>

        {/* Zone 2: Navigation — five top-level pages */}
        <nav className="hidden xl:flex items-center gap-1">
          {directButton(dashboard)}
          {directButton(curriculum)}
          <button
            onClick={() => setActiveTab('student')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${studentActive ? activeCls : idleCls}`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{studentLabel}</span>
            {studentBadge > 0 && badgeEl(studentBadge)}
          </button>
          {directButton(periodic)}
          {directButton(teacher)}
        </nav>

        {/* Zone 3: Actions (Theme, Language, Role) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Soft Nature Light Mode'}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-teal-400 transition-colors shadow-xs"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Course switch: IGCSE 0620 or AS & A Level 9701. Collapsed it names the course on screen; open, it lists all three. */}
          <CourseSwitch />

          {/* Language Selector Segmented Control */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen(open => !open)}
              aria-expanded={langOpen}
              aria-label={mn ? 'Хэл сонгох' : 'Choose language'}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-black text-slate-800 dark:text-slate-100 shadow-xs"
            >
              {modeLabel}
              <ChevronDown className={`w-4 h-4 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl space-y-1">
                {([
                  { id: 'en', label: 'English (EN)' },
                  { id: 'mn', label: 'Монгол (MN)' },
                  { id: 'dual', label: 'Dual (EN + MN)' }
                ] as const).map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setMode(option.id);
                      setLangOpen(false);
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
            )}
          </div>

          {/* Role Switcher */}
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
        </div>
      </div>

      {/* Mobile: the same five pages, in one row */}
      <div className="xl:hidden bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
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
          {mobileTab('teacher', mn ? 'Багш' : 'Teacher', teacher.icon, activeTab === 'teacher', 0, () => setActiveTab('teacher'))}
        </div>
      </div>
    </header>
  );
};
