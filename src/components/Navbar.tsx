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

// Learning flow: start → learn → lab & calculations → practice → review → teacher tools
type Group = 'start' | 'learn' | 'lab' | 'practice' | 'teacher';

interface NavLink {
  id: AppTab;
  group: Group;
  labelEn: string;
  labelMn: string;
  icon: React.ReactNode;
  badge?: number;
}

// Thin divider wherever the group changes (used by the mobile strip)
const withDividers = (links: NavLink[], renderLink: (link: NavLink) => React.ReactNode) =>
  links.flatMap((link, i) => {
    const prev = links[i - 1];
    const divider =
      prev && prev.group !== link.group ? (
        <span key={`sep-${link.id}`} aria-hidden="true" className="w-px h-5 mx-1 shrink-0 bg-slate-200 dark:bg-slate-700" />
      ) : null;
    return [divider, <React.Fragment key={link.id}>{renderLink(link)}</React.Fragment>];
  });

const badgeEl = (count: number) => (
  <span className="ml-1 px-1.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">{count}</span>
);

const activeCls =
  'bg-emerald-50 text-emerald-800 dark:bg-slate-800 dark:text-teal-300 font-bold border border-emerald-200/80 dark:border-slate-700';
const idleCls = 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900';

// Desktop dropdown: one button that opens the tools of a section
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
        <div className="absolute left-0 top-full mt-1.5 min-w-[15rem] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg z-50">
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

  const mn = mode === 'mn';
  const unresolvedMistakesCount = mistakes.filter(m => !m.resolved).length;

  const navLinks: NavLink[] = [
    { id: 'dashboard', group: 'start', labelEn: 'Dashboard', labelMn: 'Хяналт', icon: <LayoutDashboard className="w-4 h-4" /> },

    { id: 'curriculum', group: 'learn', labelEn: 'Syllabus & Lessons', labelMn: 'Хичээлүүд', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'skills', group: 'learn', labelEn: 'Exam Skills', labelMn: 'Шалгалтын ур чадвар', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'flashcards', group: 'learn', labelEn: 'Flashcards', labelMn: 'Үг цээжлэх', icon: <Layers className="w-4 h-4" /> },
    { id: 'mindmap', group: 'learn', labelEn: 'Mind Map', labelMn: 'Mind Map', icon: <BrainCircuit className="w-4 h-4" /> },

    { id: 'labs', group: 'lab', labelEn: 'Virtual Labs', labelMn: 'Виртуал лаб', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'periodictable', group: 'lab', labelEn: 'Periodic Table', labelMn: 'Үелэх систем', icon: <Grid className="w-4 h-4" /> },
    { id: 'calculations', group: 'lab', labelEn: 'Calculations', labelMn: 'Тооцоот бодлого', icon: <Calculator className="w-4 h-4" /> },

    { id: 'exam', group: 'practice', labelEn: 'Past Papers (2017–2024)', labelMn: 'Past Papers', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'games', group: 'practice', labelEn: 'Game Arena', labelMn: 'Тоглоом', icon: <Gamepad2 className="w-4 h-4" /> },
    {
      id: 'mistakes',
      group: 'practice',
      labelEn: 'Mistake Notebook',
      labelMn: 'Алдааны сан',
      icon: <AlertCircle className="w-4 h-4" />,
      badge: unresolvedMistakesCount > 0 ? unresolvedMistakesCount : undefined
    },

    { id: 'teacher', group: 'teacher', labelEn: 'Teacher Portal', labelMn: 'Багшийн булан', icon: <Users className="w-4 h-4" /> },
  ];

  const inGroup = (g: Group) => navLinks.filter(l => l.group === g);
  const dashboardLink = inGroup('start')[0];
  const teacherLink = inGroup('teacher')[0];

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

        {/* Zone 2: Navigation — sections as dropdowns on desktop */}
        <nav className="hidden xl:flex items-center gap-1">
          {directButton(dashboardLink)}
          <NavDropdown
            label={mn ? 'Суралцах' : 'Learn'}
            icon={<BookOpen className="w-4 h-4" />}
            items={inGroup('learn')}
            activeTab={activeTab}
            mn={mn}
            onSelect={setActiveTab}
          />
          <NavDropdown
            label={mn ? 'Лаб ба тооцоо' : 'Labs & Calc'}
            icon={<FlaskConical className="w-4 h-4" />}
            items={inGroup('lab')}
            activeTab={activeTab}
            mn={mn}
            onSelect={setActiveTab}
          />
          <NavDropdown
            label={mn ? 'Дасгал' : 'Practice'}
            icon={<GraduationCap className="w-4 h-4" />}
            items={inGroup('practice')}
            activeTab={activeTab}
            mn={mn}
            onSelect={setActiveTab}
          />
          {directButton(teacherLink)}
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

      {/* Mobile Nav Drawer: one scrollable row, dividers between sections */}
      <div className="xl:hidden flex items-center gap-1 px-4 py-2 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 overflow-x-auto text-xs">
        {withDividers(navLinks, link => {
          const active = activeTab === link.id;
          return (
            <button
              onClick={() => setActiveTab(link.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap ${
                active ? 'bg-emerald-100 text-emerald-800 dark:bg-teal-500/20 dark:text-teal-300 font-bold' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {link.icon}
              <span>{mn ? link.labelMn : link.labelEn}</span>
              {link.badge && (
                <span className="w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
