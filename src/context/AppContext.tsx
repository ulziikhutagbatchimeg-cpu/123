import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  MistakeLog, 
  LeitnerCard, 
  StudentStats, 
  CustomTest, 
  ExamQuestion,
  PaperType,
  TestAttempt,
  QuestionAttempt
} from '../types/chemistry';
import { CURRICULUM_CHAPTERS, INITIAL_LEITNER_CARDS } from '../data/curriculumData';

export type AppTab = 'dashboard' | 'curriculum' | 'labs' | 'calculations' | 'periodictable' | 'exam' | 'flashcards' | 'games' | 'mistakes' | 'mindmap' | 'skills' | 'teacher';
export type SimulatorType = 'electrolysis' | 'titration' | 'qualitative' | 'stoichiometry' | 'periodic-table' | 'rates' | 'chromatography' | 'gas-collection' | 'vsepr';

// The course the whole app shows: IGCSE 0620 or AS & A Level 9701
export type Programme = 'igcse' | 'alevel';
// The 9701 level: AS Level (topics 1–22) or A Level (all topics). The course choice is IGCSE 0620, AS Level or A Level.
export type AlevelLevel = 'as' | 'a';
export type CourseChoice = 'igcse' | AlevelLevel;
export const COURSE_CHOICES: { id: CourseChoice; labelEn: string; labelMn: string }[] = [
  { id: 'igcse', labelEn: 'IGCSE 0620', labelMn: 'IGCSE 0620' },
  { id: 'as', labelEn: 'AS Level 9701', labelMn: 'AS Level 9701' },
  { id: 'a', labelEn: 'A Level 9701', labelMn: 'A Level 9701' }
];

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  programme: Programme;
  setProgramme: (programme: Programme) => void;
  alevelLevel: AlevelLevel;
  setAlevelLevel: (level: AlevelLevel) => void;
  courseChoice: CourseChoice;
  chooseCourse: (choice: CourseChoice) => void;
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
  logExamAnswer: (question: Pick<ExamQuestion, 'id' | 'topicId' | 'paper' | 'totalMarks'>, earned: number) => void;
  customTests: CustomTest[];
  createCustomTest: (test: Omit<CustomTest, 'id' | 'createdAt' | 'shareCode'>) => CustomTest;
  customQuestions: ExamQuestion[];
  addCustomQuestion: (question: ExamQuestion) => void;
  jumpToTopic: (topicId: string) => void;
  jumpToSimulator: (sim: SimulatorType) => void;
  calcChapterId: string | null;
  setCalcChapterId: (id: string | null) => void;
  jumpToCalculation: (chapterId: string) => void;
  testAttempts: TestAttempt[];
  addTestAttempt: (attempt: Omit<TestAttempt, 'id' | 'takenAt'>) => void;
  attempts: QuestionAttempt[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('top-4-1'); // Default to Electrochemistry
  const [selectedSimulator, setSelectedSimulator] = useState<SimulatorType>('electrolysis');
  // The curriculum chapter the Calculations tab opens on, set when a lesson links to it
  const [calcChapterId, setCalcChapterId] = useState<string | null>(null);

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
      try {
        // Cards added since the student's last save (the new glossary terms) join the saved deck
        const cards: LeitnerCard[] = JSON.parse(saved);
        const ids = new Set(cards.map(c => c.id));
        return [...cards, ...INITIAL_LEITNER_CARDS.filter(c => !ids.has(c.id))];
      } catch (e) { /* ignore */ }
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

  // Course test attempts (date, score), one entry per saved test run, kept in this browser
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>(() => {
    const saved = localStorage.getItem('chem_cambridge_test_attempts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('chem_cambridge_test_attempts', JSON.stringify(testAttempts));
  }, [testAttempts]);

  const addTestAttempt = (attempt: Omit<TestAttempt, 'id' | 'takenAt'>) => {
    const entry: TestAttempt = {
      ...attempt,
      id: `ta-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      takenAt: Date.now()
    };
    setTestAttempts(prev => [entry, ...prev]);
  };

  // Every answered question, newest first: its paper and topic, and the marks earned. Kept in this browser.
  const [attempts, setAttempts] = useState<QuestionAttempt[]>(() => {
    const saved = localStorage.getItem('chem_cambridge_attempts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('chem_cambridge_attempts', JSON.stringify(attempts));
  }, [attempts]);

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

  // Records one answered question with the marks earned. The student's own check reads these: accuracy by paper and by topic.
  const logExamAnswer = (question: Pick<ExamQuestion, 'id' | 'topicId' | 'paper' | 'totalMarks'>, earned: number) => {
    const max = question.totalMarks > 0 ? question.totalMarks : 1;
    const got = Math.min(max, Math.max(0, earned));
    setStats(prev => ({
      ...prev,
      totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
      correctQuestionsCount: prev.correctQuestionsCount + (got === max ? 1 : 0)
    }));
    const entry: QuestionAttempt = {
      id: `qa-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      questionId: question.id,
      topicId: question.topicId,
      paper: question.paper,
      earned: got,
      max,
      takenAt: Date.now()
    };
    setAttempts(prev => [entry, ...prev].slice(0, 2000));
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

  const jumpToCalculation = (chapterId: string) => {
    setCalcChapterId(chapterId);
    setActiveTab('calculations');
  };

  // The programme is kept between visits, so a student who chose 9701 opens 9701 again
  const [programme, setProgrammeState] = useState<Programme>(() => {
    try {
      return localStorage.getItem('chem_programme') === 'alevel' ? 'alevel' : 'igcse';
    } catch (e) {
      return 'igcse';
    }
  });
  const setProgramme = (next: Programme) => {
    setProgrammeState(next);
    try { localStorage.setItem('chem_programme', next); } catch (e) { /* storage may be blocked */ }
  };

  // The 9701 level is kept between visits too; A Level is the default, since it includes every AS topic
  const [alevelLevel, setAlevelLevelState] = useState<AlevelLevel>(() => {
    try {
      return localStorage.getItem('chem_alevel_level') === 'as' ? 'as' : 'a';
    } catch (e) {
      return 'a';
    }
  });
  const setAlevelLevel = (next: AlevelLevel) => {
    setAlevelLevelState(next);
    try { localStorage.setItem('chem_alevel_level', next); } catch (e) { /* storage may be blocked */ }
  };
  const courseChoice: CourseChoice = programme === 'igcse' ? 'igcse' : alevelLevel;
  const chooseCourse = (choice: CourseChoice) => {
    if (choice === 'igcse') {
      setProgramme('igcse');
      return;
    }
    setAlevelLevel(choice);
    setProgramme('alevel');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        programme,
        setProgramme,
        alevelLevel,
        setAlevelLevel,
        courseChoice,
        chooseCourse,
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
        jumpToSimulator,
        calcChapterId,
        setCalcChapterId,
        jumpToCalculation,
        testAttempts,
        addTestAttempt,
        attempts
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
