export type PlacementCompanyId = 'tcs' | 'infosys' | 'wipro' | 'cognizant' | 'accenture';

export type SectionType =
  | 'quantitative'
  | 'reasoning'
  | 'verbal'
  | 'cs_fundamentals'
  | 'pseudocode'
  | 'coding';

export type QuestionSubject =
  | 'quant_arithmetic'
  | 'quant_algebra'
  | 'quant_geometry'
  | 'quant_pnc_prob'
  | 'quant_numbers'
  | 'reasoning_deductive'
  | 'reasoning_analytical'
  | 'reasoning_verbal'
  | 'verbal_grammar'
  | 'verbal_vocabulary'
  | 'verbal_comprehension'
  | 'cs_oops'
  | 'cs_dbms'
  | 'cs_os'
  | 'cs_networks'
  | 'cs_pseudocode';

export interface McqOption {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface BasePlacementQuestion {
  id: string;
  section: SectionType;
  subject: QuestionSubject;
  subtopic: string; // e.g. "Time & Work", "Paging & Virtual Memory", "Deadlocks"
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks: number;
  negativeMarks: number; // e.g. 0 or 0.25 or 0.33
  explanation: {
    summary: string;
    steps: string[];
    formulaOrShortcut?: string;
  };
}

export interface McqPlacementQuestion extends BasePlacementQuestion {
  type: 'mcq';
  question: string;
  codeSnippet?: {
    language: 'cpp' | 'java' | 'python' | 'c' | 'sql';
    code: string;
  };
  options: McqOption[];
  correctOptionId: string;
}

export interface CodingPlacementQuestion extends BasePlacementQuestion {
  type: 'coding';
  problemId: string; // unique identifier, or mapped to problem list
  title: string;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: Record<string, string>; // language -> code
  testCases: {
    caseNumber?: number;
    input: string;
    expected: string;
    isHidden?: boolean;
  }[];
  referenceCode?: {
    language: string;
    code: string;
  };
}

export type PlacementQuestion = McqPlacementQuestion | CodingPlacementQuestion;

export interface AssessmentSection {
  id: string;
  title: string;
  type: SectionType;
  durationMinutes: number;
  questions: PlacementQuestion[];
  instructions?: string;
  allowCalculator?: boolean;
}

export interface CompanyCutoffTier {
  trackName: string; // e.g. "Ninja", "Digital", "Prime", "Specialist Programmer", "DSE"
  minOverallPercentage: number;
  minSectionalPercentage?: Record<SectionType, number>;
  badgeColor: string;
  description: string;
}

export interface CompanyAssessment {
  id: string;
  companyId: PlacementCompanyId;
  companyName: string;
  title: string;
  track: string; // e.g. "Ninja & Digital", "Specialist Programmer", "Elite NTH"
  tierLabel: string; // e.g. "Flagship Mock"
  description: string;
  difficulty: 'Intermediate' | 'Advanced' | 'Challenging';
  totalDurationMinutes: number;
  sections: AssessmentSection[];
  cutoffTiers: CompanyCutoffTier[];
  enforceSectionLock: boolean;
  allowBacktrackingWithinSection: boolean;
  totalMarks: number;
  tags: string[];
}

export type QuestionStatus =
  | 'not_visited'
  | 'not_answered'
  | 'answered'
  | 'marked_for_review'
  | 'answered_and_marked';

export interface CodingSubmissionResult {
  code: string;
  language: string;
  passedCases: number;
  totalCases: number;
  verdict: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error' | 'Pending';
  runtimeMs?: number;
}

export interface ActiveAssessmentSession {
  assessmentId: string;
  startedAt: number;
  currentSectionIndex: number;
  currentQuestionIndex: number;
  sectionRemainingSeconds: Record<string, number>;
  answers: Record<string, string>; // questionId -> selectedOptionId
  markedForReview: Record<string, boolean>;
  visitedQuestions: Record<string, boolean>;
  codingSubmissions: Record<string, CodingSubmissionResult>;
  isCompleted: boolean;
  submittedAt?: number;
  autoSubmitted?: boolean;
  tabSwitchCount: number;
}

export interface SectionScoreReport {
  sectionId: string;
  sectionTitle: string;
  sectionType: SectionType;
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  maxScore: number;
  percentage: number;
  cutoffRequired?: number;
  clearedCutoff: boolean;
  timeSpentSeconds: number;
}

export interface TopicDiagnostics {
  subject: QuestionSubject;
  subjectTitle: string;
  total: number;
  correct: number;
  percentage: number;
  strength: 'Strong' | 'Moderate' | 'Needs Practice';
}

export interface AssessmentReport {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  companyId: PlacementCompanyId;
  companyName: string;
  track: string;
  completedAt: number;
  durationSeconds: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  projectedPercentile: number;
  verdictTier: CompanyCutoffTier;
  allTiers: CompanyCutoffTier[];
  sectionalReports: SectionScoreReport[];
  topicDiagnostics: TopicDiagnostics[];
  summaryFeedback: string[];
}
