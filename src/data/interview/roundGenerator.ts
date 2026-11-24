import { initialProblems } from '../problems';
import type { Problem } from '../../types';
import { ActiveInterviewRound, InterviewPresetId } from '../../types/interview';
import { getPresetById } from './presets';

export interface PatternCategory {
  name: string;
  keywords: string[];
}

export const INTERVIEW_PATTERNS: PatternCategory[] = [
  { name: 'Two Pointers & Arrays', keywords: ['Two Pointers', 'Array', 'Arrays', 'Sliding Window'] },
  { name: 'Hash Maps & Prefix Sums', keywords: ['Hash Table', 'Prefix Sum', 'Counting', 'Array'] },
  { name: 'Binary Search & Monotonic Space', keywords: ['Binary Search', 'Divide and Conquer'] },
  { name: 'Trees & Hierarchical Traversal', keywords: ['Binary Tree', 'Tree', 'DFS', 'BFS', 'Binary Search Tree'] },
  { name: 'Graphs & Grid Navigation', keywords: ['Graph', 'BFS', 'DFS', 'Matrix', 'Shortest Path'] },
  { name: 'Dynamic Programming & Recurrence', keywords: ['Dynamic Programming', 'Memoization'] },
  { name: 'Greedy & Interval Scheduling', keywords: ['Greedy', 'Sorting', 'Intervals'] },
];

function filterProblems(difficulty: 'Medium' | 'Hard', keywords?: string[]): Problem[] {
  return initialProblems.filter((p) => {
    if (p.difficulty !== difficulty) return false;
    if (!p.starterCode || !p.testCases || p.testCases.length === 0) return false;
    if (keywords && keywords.length > 0) {
      return p.topics.some((t) => keywords.some((k) => k.toLowerCase() === t.toLowerCase()));
    }
    return true;
  });
}

export function generateInterviewRound(
  presetId: InterviewPresetId = 'faang_standard',
  selectedPatternName?: string
): ActiveInterviewRound {
  const preset = getPresetById(presetId);
  const pattern = INTERVIEW_PATTERNS.find((p) => p.name === selectedPatternName);
  const keywords = pattern?.keywords;

  // Problem 1 is strictly Medium as instructed
  let candidateP1 = filterProblems('Medium', keywords);
  if (candidateP1.length === 0) {
    candidateP1 = filterProblems('Medium');
  }

  // Pick random problem 1
  const p1 = candidateP1[Math.floor(Math.random() * candidateP1.length)];

  // Problem 2 is Medium or Hard depending on preset
  let candidateP2 = filterProblems(preset.problem2Difficulty, keywords).filter((p) => p.id !== p1.id);
  if (candidateP2.length === 0) {
    candidateP2 = filterProblems(preset.problem2Difficulty).filter((p) => p.id !== p1.id);
  }
  if (candidateP2.length === 0) {
    // Fallback: pick any Medium or Hard distinct from p1
    candidateP2 = initialProblems.filter(
      (p) => (p.difficulty === 'Medium' || p.difficulty === 'Hard') && p.id !== p1.id
    );
  }

  const p2 = candidateP2[Math.floor(Math.random() * candidateP2.length)];

  const roundId = `round-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const roundTitle = `${preset.title} · ${pattern ? pattern.name : 'General Algorithmic'}`;

  const defaultLang = 'python';

  return {
    id: roundId,
    presetId,
    title: roundTitle,
    patternTheme: pattern ? pattern.name : 'Complementary Patterns',
    durationMinutes: preset.durationMinutes,
    startedAt: Date.now(),
    problem1: p1,
    problem2: p2,
    currentProblemIndex: 0,
    problem1State: {
      problemId: p1.id,
      language: defaultLang,
      code: p1.starterCode?.[defaultLang] || 'def solution():\n    pass\n',
      isSolved: false,
      passedCount: 0,
      totalCount: p1.testCases?.length || 0,
      attemptsCount: 0,
      timeSpentSeconds: 0,
    },
    problem2State: {
      problemId: p2.id,
      language: defaultLang,
      code: p2.starterCode?.[defaultLang] || 'def solution():\n    pass\n',
      isSolved: false,
      passedCount: 0,
      totalCount: p2.testCases?.length || 0,
      attemptsCount: 0,
      timeSpentSeconds: 0,
    },
    remainingSeconds: preset.durationMinutes * 60,
    tabSwitches: 0,
    focusLossSeconds: 0,
    fullscreenExits: 0,
    isCompleted: false,
  };
}
