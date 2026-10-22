import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp, AppTab } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  BrainCircuit,
  AlertCircle,
  Layers,
  Users,
  LayoutDashboard,
  BookMarked,
  Sun,
  Moon,
  Calculator,
  Grid,
  Gamepad2,
  ChevronDown
} from 'lucide-react';

interface NavLink {
  id: AppTab;
  labelEn: string;
  labelMn: string;
  icon: React.ReactNode;
  badge?: number;
}

const badgeEl = (count: number) => (
  <span className="ml-1 px-1.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">{count}</span>
);

const activeCls =
  'bg-emerald-50 text-emerald-800 dark:bg-slate-800 dark:text-teal-300 font-bold border border-emerald-200/80 dark:border-slate-700';
const idleCls = 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900';

// Desktop dropdown: one button that opens the tools of the student area
const NavDropdown: React.FC<{
  label: string;
  icon: React.ReactNode;
  items: NavLink[];
  activeTab: AppTab;
  mn: boolean;
  onSelect: (id: AppTab) => void;
}> = ({ label, icon, items, activeTab, mn, onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = items.some(i => i.id === activeTab);
  const badge = items.reduce((sum, i) => sum + (i.badge ?? 0), 0);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${isActive ? activeCls : idleCls}`}
      >
        {icon}
        <span>{label}</span>
        {badge > 0 && badgeEl(badge)}
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 min-w-[16rem] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg z-50">
          {items.map(item => {
            const selected = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                  selected
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-slate-800 dark:text-teal-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span className="flex-1">{mn ? item.labelMn : item.labelEn}</span>
                {item.badge !== undefined && badgeEl(item.badge)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const Navbar: React.FC = () => {
  const { mode, setMode } = useLanguage();
  const { activeTab, setActiveTab, role, setRole, mistakes } = useApp();
  const { theme, toggleTheme } = useTheme();
  // Mobile: whether the student-area tools are expanded under the tab bar
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const mn = mode === 'mn';
  const unresolvedMistakesCount = mistakes.filter(m => !m.resolved).length;

  // Top-level tabs
  const dashboard: NavLink = { id: 'dashboard', labelEn: 'Dashboard', labelMn: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> };
  const curriculum: NavLink = { id: 'curriculum', labelEn: 'Syllabus & Lessons', labelMn: 'Хичээлүүд', icon: <BookOpen className="w-4 h-4" /> };
  const periodic: NavLink = { id: 'periodictable', labelEn: 'Periodic Table', labelMn: 'Үелэх хүснэгт', icon: <Grid className="w-4 h-4" /> };
  const teacher: NavLink = { id: 'teacher', labelEn: 'Teacher Area', labelMn: 'Багшийн талбар', icon: <Users className="w-4 h-4" /> };

  // Everything a student uses, grouped under "Student Area"
  const studentLinks: NavLink[] = [
    { id: 'flashcards', labelEn: 'Flashcards', labelMn: 'Үг цээжлэх', icon: <Layers className="w-4 h-4" /> },
    { id: 'mindmap', labelEn: 'Mind Map', labelMn: 'Mind Map', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'skills', labelEn: 'Exam Skills', labelMn: 'Шалгалтын ур чадвар', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'exam', labelEn: 'Past Papers (2017–2024)', labelMn: 'Past Papers', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'games', labelEn: 'Game Arena', labelMn: 'Тоглоом', icon: <Gamepad2 className="w-4 h-4" /> },
    {
      id: 'mistakes',
      labelEn: 'Mistake Notebook',
      labelMn: 'Алдааны сан',
      icon: <AlertCircle className="w-4 h-4" />,
      badge: unresolvedMistakesCount > 0 ? unresolvedMistakesCount : undefined
    },
    { id: 'labs', labelEn: 'Virtual Labs', labelMn: 'Виртуал лаб', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'calculations', labelEn: 'Calculations', labelMn: 'Тооцоот бодлого', icon: <Calculator className="w-4 h-4" /> },
  ];

  const studentLabel = mn ? 'Суралцагчийн талбар' : 'Student Area';
  const studentBadge = studentLinks.reduce((sum, i) => sum + (i.badge ?? 0), 0);
  const studentActive = studentLinks.some(i => i.id === activeTab);

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
  const mobileTab = (
    key: string,
    label: string,
    icon: React.ReactNode,
    active: boolean,
    badge: number,
    onClick: () => void,
    expanded?: boolean
  ) => (
    <button
      key={key}
      onClick={onClick}
      aria-expanded={expanded}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-teal-400 transition-colors shrink-0 flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-teal-500/20 border border-emerald-500/30 dark:border-teal-500/40 flex items-center justify-center text-emerald-600 dark:text-teal-300 shadow-xs">
            <FlaskConical className="w-4 h-4" />
          </div>
          <span>IGCSE Chemistry 0620 Study Hub</span>
        </button>

        {/* Zone 2: Navigation — five top-level tabs, student tools in one dropdown */}
        <nav className="hidden xl:flex items-center gap-1">
          {directButton(dashboard)}
          {directButton(curriculum)}
          <NavDropdown
            label={studentLabel}
            icon={<GraduationCap className="w-4 h-4" />}
            items={studentLinks}
            activeTab={activeTab}
            mn={mn}
            onSelect={setActiveTab}
          />
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

          {/* Language Selector Segmented Control */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs shadow-xs">
            <button
              onClick={() => setMode('en')}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                mode === 'en' ? 'bg-white dark:bg-teal-500/20 text-emerald-800 dark:text-teal-300 font-bold shadow-xs border border-slate-200 dark:border-teal-500/40' : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setMode('mn')}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                mode === 'mn' ? 'bg-white dark:bg-teal-500/20 text-emerald-800 dark:text-teal-300 font-bold shadow-xs border border-slate-200 dark:border-teal-500/40' : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              MN
            </button>
            <button
              onClick={() => setMode('dual')}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                mode === 'dual' ? 'bg-white dark:bg-teal-500/20 text-emerald-800 dark:text-teal-300 font-bold shadow-xs border border-slate-200 dark:border-teal-500/40' : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
              title="Dual English & Mongolian"
            >
              Dual
            </button>
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

      {/* Mobile: five top-level tabs; Student Area opens its tools below the bar */}
      <div className="xl:hidden bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {mobileTab(
            'dashboard',
            mn ? 'Хяналт' : 'Dashboard',
            dashboard.icon,
            activeTab === 'dashboard',
            0,
            () => {
              setMobileOpen(false);
              setActiveTab('dashboard');
            }
          )}
          {mobileTab(
            'curriculum',
            mn ? 'Хичээл' : 'Lessons',
            curriculum.icon,
            activeTab === 'curriculum',
            0,
            () => {
              setMobileOpen(false);
              setActiveTab('curriculum');
            }
          )}
          {mobileTab(
            'student',
            mn ? 'Суралцагч' : 'Student',
            <GraduationCap className="w-4 h-4" />,
            studentActive || mobileOpen,
            studentBadge,
            () => setMobileOpen(o => !o),
            mobileOpen
          )}
          {mobileTab(
            'periodic',
            mn ? 'Үелэх' : 'Periodic',
            periodic.icon,
            activeTab === 'periodictable',
            0,
            () => {
              setMobileOpen(false);
              setActiveTab('periodictable');
            }
          )}
          {mobileTab(
            'teacher',
            mn ? 'Багш' : 'Teacher',
            teacher.icon,
            activeTab === 'teacher',
            0,
            () => {
              setMobileOpen(false);
              setActiveTab('teacher');
            }
          )}
        </div>

        {mobileOpen && (
          <div className="grid grid-cols-2 gap-1.5 px-3 pb-3">
            <div className="col-span-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1 pb-1">{studentLabel}</div>
            {studentLinks.map(item => {
              const selected = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left border transition-colors ${
                    selected
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-teal-500/20 dark:border-teal-500/40 dark:text-teal-300'
                      : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.icon}
                  <span className="flex-1 leading-tight">{mn ? item.labelMn : item.labelEn}</span>
                  {item.badge !== undefined && badgeEl(item.badge)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
