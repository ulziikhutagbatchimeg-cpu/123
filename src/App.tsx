import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { CurriculumView } from './components/CurriculumView';
import { VirtualLabsView } from './components/VirtualLabsView';
import { ExamPrepView } from './components/ExamPrepView';
import { TestsView } from './components/TestsView';
import { CourseNotReady } from './components/CourseNotReady';
import { FlashcardsView } from './components/FlashcardsView';
import { GameArenaView } from './components/GameArenaView';
import { MistakeNotebookView } from './components/MistakeNotebookView';
import { TeacherPortalView } from './components/TeacherPortalView';
import { CambridgeSkillsView } from './components/CambridgeSkillsView';
import { CalculationsView } from './components/CalculationsView';
import { PeriodicTableExplorer } from './components/simulators/PeriodicTableExplorer';
import { StudentArea } from './components/StudentArea';
import { FlaskConical } from 'lucide-react';
import { useResultSync } from './lib/resultSync';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, programme } = useApp();
  // Keeps the signed-in student's results in the teacher's copy, whichever tab is open
  useResultSync();
  const { mode } = useLanguage();

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'curriculum' && <CurriculumView />}
        {activeTab === 'student' && <StudentArea />}
        {activeTab === 'labs' && <VirtualLabsView />}
        {activeTab === 'periodictable' && <PeriodicTableExplorer />}
        {activeTab === 'calculations' && <CalculationsView />}
        {/* The past papers are 0620 papers; 9701 gets its own note until its papers are added */}
        {activeTab === 'exam' && (programme === 'igcse' ? <ExamPrepView /> : <CourseNotReady titleEn="Past Papers" titleMn="Өмнөх жилийн шалгалт" />)}
        {activeTab === 'tests' && <TestsView />}
        {activeTab === 'skills' && <CambridgeSkillsView />}
        {activeTab === 'flashcards' && <FlashcardsView />}
        {activeTab === 'games' && <GameArenaView />}
        {activeTab === 'mistakes' && <MistakeNotebookView />}
        {activeTab === 'teacher' && <TeacherPortalView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 py-8 px-4 text-xs text-slate-600 dark:text-slate-400">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
            <span className="font-bold text-slate-800 dark:text-slate-200">Cambridge Chemistry 0620 · 9701 Study Hub</span>
            <span>·</span>
            <span>Cambridge IGCSE Chemistry (0620) Syllabus 2026–2028</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <button onClick={() => setActiveTab('curriculum')} className="hover:text-black dark:hover:text-white transition-colors">
              {mode === 'mn' ? 'Хичээлүүд' : 'Syllabus'}
            </button>
            <button onClick={() => setActiveTab('labs')} className="hover:text-black dark:hover:text-white transition-colors">
              {mode === 'mn' ? 'Виртуал лаб' : 'Simulators'}
            </button>
            <button onClick={() => setActiveTab('exam')} className="hover:text-black dark:hover:text-white transition-colors">
              {mode === 'mn' ? 'Шалгалт (P2/4/6)' : 'Exam Papers'}
            </button>
            <button onClick={() => setActiveTab('skills')} className="hover:text-black dark:hover:text-white transition-colors">
              {mode === 'mn' ? 'Шалгалтын ур чадвар' : 'Exam Skills'}
            </button>
            <button onClick={() => setActiveTab('mistakes')} className="hover:text-black dark:hover:text-white transition-colors">
              {mode === 'mn' ? 'Алдааны сан' : 'Mistake Notebook'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
