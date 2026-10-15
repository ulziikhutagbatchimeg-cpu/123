import React from 'react';
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
  Grid
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { mode, setMode } = useLanguage();
  const { activeTab, setActiveTab, role, setRole, mistakes } = useApp();
  const { theme, toggleTheme } = useTheme();

  const unresolvedMistakesCount = mistakes.filter(m => !m.resolved).length;

  const navLinks: { id: AppTab; labelEn: string; labelMn: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', labelEn: 'Dashboard', labelMn: 'Хяналт', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'curriculum', labelEn: 'Syllabus & Lessons', labelMn: 'Хичээлүүд', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'labs', labelEn: 'Virtual Labs', labelMn: 'Виртуал Лаб', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'periodictable', labelEn: 'Periodic Table', labelMn: 'Үелэх систем', icon: <Grid className="w-4 h-4" /> },
    { id: 'calculations', labelEn: 'Calculations', labelMn: 'Тооцоот бодлого', icon: <Calculator className="w-4 h-4" /> },
    { id: 'exam', labelEn: 'Past Papers (2017–2024)', labelMn: 'Past Papers / Шалгалт', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', labelEn: 'Exam Skills', labelMn: 'Ур чадвар', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'flashcards', labelEn: 'Flashcards', labelMn: 'Үг цээжлэх', icon: <Layers className="w-4 h-4" /> },
    { 
      id: 'mistakes', 
      labelEn: 'Mistake Notebook', 
      labelMn: 'Алдааны сан', 
      icon: <AlertCircle className="w-4 h-4" />,
      badge: unresolvedMistakesCount > 0 ? unresolvedMistakesCount : undefined
    },
    { id: 'mindmap', labelEn: 'Mind Map Creator', labelMn: 'Mind Map бүтээгч', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'teacher', labelEn: 'Teacher Portal', labelMn: 'Багшийн булан', icon: <Users className="w-4 h-4" /> },
  ];

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
          <span>ChemCambridge 0620</span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
          {navLinks.map(link => {
            const active = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors relative ${
                  active
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-slate-800 dark:text-teal-300 font-bold border border-emerald-200/80 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {link.icon}
                <span>{mode === 'mn' ? link.labelMn : link.labelEn}</span>
                {link.badge && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
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
            <span>{role === 'student' ? (mode === 'mn' ? 'Сурагч' : 'Student') : (mode === 'mn' ? 'Багш' : 'Teacher')}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div className="xl:hidden flex items-center gap-1 px-4 py-2 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 overflow-x-auto text-xs">
        {navLinks.map(link => {
          const active = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap ${
                active ? 'bg-emerald-100 text-emerald-800 dark:bg-teal-500/20 dark:text-teal-300 font-bold' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {link.icon}
              <span>{mode === 'mn' ? link.labelMn : link.labelEn}</span>
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
