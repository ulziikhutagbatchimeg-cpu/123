export type LanguageMode = 'en' | 'mn' | 'dual';

export type UserRole = 'student' | 'teacher';

export type PaperType = 'Paper 2' | 'Paper 4' | 'Paper 6';

export type AssessmentObjective = 'AO1' | 'AO2' | 'AO3'; // AO1: Knowledge, AO2: Handling info, AO3: Experimental skills

// Core = all candidates; Extended = Supplement content (grades A*–C candidates)
export type SyllabusTier = 'core' | 'extended';

export interface LearningObjective {
  id: string;
  code: string;
  en: string;
  mn: string;
  ao: AssessmentObjective;
  tier?: SyllabusTier; // undefined = core
}

export interface VocabularyTerm {
  id: string;
  termEn: string;
  termMn: string;
  phonetic: string;
  definitionEn: string;
  definitionMn: string;
  exampleEn: string;
  exampleMn: string;
  memoryTipEn?: string;
  memoryTipMn?: string;
  box?: number; // 1 to 5 for Leitner system
}

export interface WorkedExample {
  id: string;
  titleEn: string;
  titleMn: string;
  questionEn: string;
  questionMn: string;
  stepsEn: string[];
  stepsMn: string[];
  finalAnswerEn: string;
  finalAnswerMn: string;
  examinerTipEn: string;
  examinerTipMn: string;
  commonMistakeEn: string;
  commonMistakeMn: string;
}

export interface LessonSection {
  id: string;
  titleEn: string;
  titleMn: string;
  contentEn: string;
  contentMn: string;
  formulaOrEquation?: string;
  keyRuleEn?: string;
  keyRuleMn?: string;
  tier?: SyllabusTier; // undefined = core
}

export interface ExamOption {
  id: 'A' | 'B' | 'C' | 'D';
  textEn: string;
  textMn: string;
  rationaleEn?: string;
  rationaleMn?: string;
}

export interface MarkSchemePoint {
  pointIndex?: number;
  criterionEn?: string;
  criterionMn?: string;
  pointEn?: string;
  pointMn?: string;
  marks: number;
  examinerNoteEn?: string;
  examinerNoteMn?: string;
}

export interface ExamQuestion {
  id: string;
  topicId: string;
  chapterId: string;
  syllabusRef: string;
  paper: PaperType;
  year?: number;
  series?: 'M/J' | 'O/N' | 'F/M';
  paperCode?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  difficultyScore?: number; // 1 (easiest recall) to 10 (hardest multi-step distinction)
  totalMarks: number;
  titleEn: string;
  titleMn: string;
  questionTextEn: string;
  questionTextMn: string;
  type: 'mcq' | 'structured' | 'practical';
  options?: ExamOption[];
  correctOption?: 'A' | 'B' | 'C' | 'D';
  markScheme?: MarkSchemePoint[];
  modelAnswerEn?: string;
  modelAnswerMn?: string;
  practicalContext?: {
    apparatusEn: string;
    apparatusMn: string;
    diagramDescription?: string;
    expectedUnit?: string;
  };
  misconceptionDiagnosisEn: string;
  misconceptionDiagnosisMn: string;
  remediationTopicId: string;
}

export interface Topic {
  id: string;
  chapterId: string;
  syllabusRef: string;
  number: string;
  titleEn: string;
  titleMn: string;
  summaryEn: string;
  summaryMn: string;
  learningObjectives: LearningObjective[];
  vocabulary: VocabularyTerm[];
  sections: LessonSection[];
  workedExample?: WorkedExample; // not every syllabus sub-topic has a worked example yet
  recommendedSimulator?: 'electrolysis' | 'titration' | 'qualitative' | 'stoichiometry' | 'periodic-table' | 'rates' | 'chromatography';
  questions: ExamQuestion[];
}

export interface Chapter {
  id: string;
  number: number;
  titleEn: string;
  titleMn: string;
  descriptionEn: string;
  descriptionMn: string;
  iconName: string;
  color: string;
  topics: Topic[];
}

export interface MistakeLog {
  id: string;
  questionId: string;
  topicId: string;
  syllabusRef: string;
  timestamp: number;
  paper: PaperType;
  questionTitleEn: string;
  questionTitleMn: string;
  studentAnswer: string;
  correctAnswer: string;
  misconceptionDiagnosisEn: string;
  misconceptionDiagnosisMn: string;
  resolved: boolean;
}

export interface LeitnerCard {
  id: string;
  termEn: string;
  termMn: string;
  definitionEn: string;
  definitionMn: string;
  phonetic: string;
  topicId: string;
  syllabusRef: string;
  box: number; // 1 to 5
  lastReviewDate: number;
  nextReviewDate: number;
}

export interface StudentStats {
  completedTopics: string[];
  totalQuestionsAnswered: number;
  correctQuestionsCount: number;
  paper2Accuracy: number;
  paper4Accuracy: number;
  paper6Accuracy: number;
  studyStreakDays: number;
  labSimulationsRunCount: number;
}

export interface CustomTest {
  id: string;
  title: string;
  paper: PaperType;
  timeLimitMinutes: number;
  questionIds: string[];
  createdAt: number;
  shareCode: string;
}
