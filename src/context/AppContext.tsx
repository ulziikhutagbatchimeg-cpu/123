import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  MistakeLog, 
  LeitnerCard, 
  StudentStats, 
  CustomTest, 
  ExamQuestion,
  PaperType
} from '../types/chemistry';
import { CURRICULUM_CHAPTERS, INITIAL_LEITNER_CARDS } from '../data/curriculumData';

export type AppTab = 'dashboard' | 'curriculum' | 'labs' | 'calculations' | 'periodictable' | 'exam' | 'flashcards' | 'mistakes' | 'mindmap' | 'skills' | 'teacher';
export type SimulatorType = 'electrolysis' | 'titration' | 'qualitative' | 'stoichiometry' | 'periodic-table' | 'rates' | 'chromatography' | 'gas-collection';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  selectedTopicId: string;
  setSelectedTopicId: (id: string) => void;
  selectedSimulator: SimulatorType;
  setSelectedSimulator: (sim: SimulatorType) => void;
  mistakes: MistakeLog[];
  addMistake: (mistake: Omit<MistakeLog, 'id' | 'timestamp' | 'resolved'>) => void;
  resolveMistake: (id: string) => void;
  leitnerCards: LeitnerCard[];
  updateCardReview: (cardId: string, outcome: 'easy' | 'good' | 'hard') => void;
  stats: StudentStats;
  markTopicComplete: (topicId: string) => void;
  logExamAnswer: (questionId: string, isCorrect: boolean, paper: PaperType) => void;
  customTests: CustomTest[];
  createCustomTest: (test: Omit<CustomTest, 'id' | 'createdAt' | 'shareCode'>) => CustomTest;
  customQuestions: ExamQuestion[];
  addCustomQuestion: (question: ExamQuestion) => void;
  jumpToTopic: (topicId: string) => void;
  jumpToSimulator: (sim: SimulatorType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('top-4-1'); // Default to Electrochemistry
  const [selectedSimulator, setSelectedSimulator] = useState<SimulatorType>('electrolysis');

  // Mistakes persistence
  const [mistakes, setMistakes] = useState<MistakeLog[]>(() => {
    const saved = localStorage.getItem('chem_cambridge_mistakes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Seed with 1 initial authentic mistake so student sees the Mistake Notebook in action
    return [
      {
        id: 'mst-demo-1',
        questionId: 'q-4-p4',
        topicId: 'top-4-1',
        syllabusRef: '0620/4.1',
        timestamp: Date.now() - 3600000 * 4,
        paper: 'Paper 4',
        questionTitleEn: 'Electrolysis of Molten Lead(II) Bromide',
        questionTitleMn: 'Хайлмал хар тугалганы(II) бромидын электролиз',
        studentAnswer: 'Br⁻ gives electrons to form Br at positive cathode',
        correctAnswer: '2Br⁻ → Br₂ + 2e⁻ at positive anode',
        misconceptionDiagnosisEn: 'Confused electrode charge (Anode is positive in electrolysis) and wrote monoatomic Br instead of diatomic Br₂ gas.',
        misconceptionDiagnosisMn: 'Электролизийн анод нь эерэг электрод болохыг андуурсан ба 2 атомт хий Br₂-ийн оронд Br гэж бичсэн.',
        resolved: false
      }
    ];
  });

  // Leitner cards persistence
  const [leitnerCards, setLeitnerCards] = useState<LeitnerCard[]>(() => {
    const saved = localStorage.getItem('chem_cambridge_flashcards');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_LEITNER_CARDS;
  });

  // Student stats
  const [stats, setStats] = useState<StudentStats>(() => {
    const saved = localStorage.getItem('chem_cambridge_stats');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      completedTopics: ['top-1-1'],
      totalQuestionsAnswered: 14,
      correctQuestionsCount: 11,
      paper2Accuracy: 84,
      paper4Accuracy: 75,
      paper6Accuracy: 80,
      studyStreakDays: 3,
      labSimulationsRunCount: 8
    };
  });

  // Custom tests (Teacher created)
  const [customTests, setCustomTests] = useState<CustomTest[]>(() => {
    const saved = localStorage.getItem('chem_cambridge_custom_tests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'ct-sample-1',
        title: 'IGCSE Term 1 Electrolysis & Stoichiometry Drill',
        paper: 'Paper 4',
        timeLimitMinutes: 30,
        questionIds: ['q-3-p2', 'q-4-p2', 'q-4-p4'],
        createdAt: Date.now() - 86400000,
        shareCode: 'CHEM-0620-T1'
      }
    ];
  });

  const [customQuestions, setCustomQuestions] = useState<ExamQuestion[]>(() => {
    const saved = localStorage.getItem('chem_cambridge_custom_questions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('chem_cambridge_mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  useEffect(() => {
    localStorage.setItem('chem_cambridge_flashcards', JSON.stringify(leitnerCards));
  }, [leitnerCards]);

  useEffect(() => {
    localStorage.setItem('chem_cambridge_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('chem_cambridge_custom_tests', JSON.stringify(customTests));
  }, [customTests]);

  useEffect(() => {
    localStorage.setItem('chem_cambridge_custom_questions', JSON.stringify(customQuestions));
  }, [customQuestions]);

  const addMistake = (data: Omit<MistakeLog, 'id' | 'timestamp' | 'resolved'>) => {
    const newMistake: MistakeLog = {
      ...data,
      id: `mst-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      resolved: false
    };
    setMistakes(prev => [newMistake, ...prev]);
  };

  const resolveMistake = (id: string) => {
    setMistakes(prev =>
      prev.map(m => (m.id === id ? { ...m, resolved: !m.resolved } : m))
    );
  };

  const updateCardReview = (cardId: string, outcome: 'easy' | 'good' | 'hard') => {
    setLeitnerCards(prev =>
      prev.map(card => {
        if (card.id !== cardId) return card;
        let newBox = card.box;
        if (outcome === 'easy') newBox = Math.min(5, card.box + 1);
        else if (outcome === 'good') newBox = Math.min(5, card.box);
        else newBox = 1; // back to box 1 on hard

        const intervals = [1, 2, 4, 7, 14]; // days
        const nextReviewDate = Date.now() + intervals[newBox - 1] * 86400000;
        return {
          ...card,
          box: newBox,
          lastReviewDate: Date.now(),
          nextReviewDate
        };
      })
    );
  };

  const markTopicComplete = (topicId: string) => {
    setStats(prev => {
      if (prev.completedTopics.includes(topicId)) return prev;
      return {
        ...prev,
        completedTopics: [...prev.completedTopics, topicId]
      };
    });
  };

  const logExamAnswer = (questionId: string, isCorrect: boolean, paper: PaperType) => {
    setStats(prev => {
      const total = prev.totalQuestionsAnswered + 1;
      const correct = prev.correctQuestionsCount + (isCorrect ? 1 : 0);
      return {
        ...prev,
        totalQuestionsAnswered: total,
        correctQuestionsCount: correct
      };
    });
  };

  const createCustomTest = (testData: Omit<CustomTest, 'id' | 'createdAt' | 'shareCode'>) => {
    const code = `CHEM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTest: CustomTest = {
      ...testData,
      id: `ct-${Date.now()}`,
      createdAt: Date.now(),
      shareCode: code
    };
    setCustomTests(prev => [newTest, ...prev]);
    return newTest;
  };

  const addCustomQuestion = (q: ExamQuestion) => {
    setCustomQuestions(prev => [q, ...prev]);
  };

  const jumpToTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('curriculum');
  };

  const jumpToSimulator = (sim: SimulatorType) => {
    setSelectedSimulator(sim);
    setActiveTab('labs');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        selectedTopicId,
        setSelectedTopicId,
        selectedSimulator,
        setSelectedSimulator,
        mistakes,
        addMistake,
        resolveMistake,
        leitnerCards,
        updateCardReview,
        stats,
        markTopicComplete,
        logExamAnswer,
        customTests,
        createCustomTest,
        customQuestions,
        addCustomQuestion,
        jumpToTopic,
        jumpToSimulator
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
