import rawCatalog from '../../../data/mastery/prism_code_mastery_catalog.json';
import { MasteryCatalog, MasteryProblem, PatternId } from '../../types/mastery';

export type { PatternId };
export const masteryCatalog: MasteryCatalog = rawCatalog as unknown as MasteryCatalog;

export interface PatternInfo {
  id: PatternId;
  name: string;
  tagline: string;
  description: string;
  triggerClues: string[];
  gradient: string;
  borderColor: string;
  badgeBg: string;
}

export const PATTERN_CONFIG: Record<PatternId, PatternInfo> = {
  two_pointers: {
    id: 'two_pointers',
    name: 'Two Pointers',
    tagline: 'Converging or trailing pointers over ordered structures',
    description: 'Eliminates nested loops by advancing one or both pointers inward or forward based on monotonic properties.',
    triggerClues: [
      'Input array is sorted or can be sorted without invalidating indices',
      'Problem asks to find a pair, triplet, or partition meeting a sum or condition',
      'Comparing elements at both ends allows ruling out entire sub-ranges in O(1)',
    ],
    gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    borderColor: 'border-blue-500/20',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  },
  sliding_window: {
    id: 'sliding_window',
    name: 'Sliding Window',
    tagline: 'Dynamic or fixed contiguous subarrays and substrings',
    description: 'Maintains state across contiguous subsegments by adding incoming elements and dropping outgoing elements in O(1).',
    triggerClues: [
      'Input is a sequence (array or string) requiring a contiguous subarray or substring',
      'Problem asks for min/max size, longest stretch, or exact count meeting a condition',
      'Expanding right increases constraint violations; shrinking left restores validity',
    ],
    gradient: 'from-teal-500/10 via-emerald-500/5 to-transparent',
    borderColor: 'border-teal-500/20',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
  },
  hash_maps: {
    id: 'hash_maps',
    name: 'Hash Maps & Sets',
    tagline: 'Instant O(1) frequency lookup, grouping, and prefix sums',
    description: 'Trades memory for speed by storing previously seen values, frequencies, or prefix sums to answer existence checks in O(1).',
    triggerClues: [
      'Need to check if complement (target - value) or previous state was seen earlier',
      'Counting frequencies or grouping elements by common canonical signature (e.g. sorted string)',
      'Subarray sum problems requiring cumulative prefix sum lookup prefix_sum - k',
    ],
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    borderColor: 'border-amber-500/20',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  },
  dynamic_programming: {
    id: 'dynamic_programming',
    name: 'Dynamic Programming',
    tagline: 'Overlapping subproblems with optimal substructure',
    description: 'Breaks complex optimization problems into smaller recursive subproblems and caches results to eliminate exponential repetition.',
    triggerClues: [
      'Problem asks for maximum/minimum value, total count of ways, or boolean possibility',
      'At each step, a decision is made that depends strictly on optimal answers of earlier states',
      'Choices exhibit clear subproblem recurrence without future side-effects',
    ],
    gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
    borderColor: 'border-purple-500/20',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  },
  breadth_first_search: {
    id: 'breadth_first_search',
    name: 'Breadth-First Search',
    tagline: 'Level-order exploration, shortest paths, and multi-source spreads',
    description: 'Explores unweighted graphs, grids, or state trees layer-by-layer using a FIFO queue to guarantee shortest path discovery.',
    triggerClues: [
      'Finding the shortest path, fewest steps, or minimum transformations in unweighted state space',
      'Layer-by-layer level order traversal in trees or connected component flooding in 2D matrices',
      'Multi-source spread spreading simultaneously from several initial nodes',
    ],
    gradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
    borderColor: 'border-rose-500/20',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  },
};

export const SUPPORTED_PATTERNS: PatternId[] = masteryCatalog.supported_pattern_order;

export function getAllMasteryProblems(): MasteryProblem[] {
  return masteryCatalog.problems;
}

export function getMasteryProblemBySlug(slug: string): MasteryProblem | undefined {
  return masteryCatalog.problems.find((p) => p.slug === slug || p.id === slug);
}

export function getMasteryProblemsByPattern(pattern: PatternId): MasteryProblem[] {
  return masteryCatalog.problems.filter((p) => p.pattern === pattern);
}

export function getProblemsGroupedByPattern(): Record<PatternId, MasteryProblem[]> {
  const grouped: Record<PatternId, MasteryProblem[]> = {
    two_pointers: [],
    sliding_window: [],
    hash_maps: [],
    dynamic_programming: [],
    breadth_first_search: [],
  };

  for (const problem of masteryCatalog.problems) {
    if (grouped[problem.pattern]) {
      grouped[problem.pattern].push(problem);
    }
  }

  return grouped;
}

export function getNextAndPrevProblem(slug: string): { prev?: MasteryProblem; next?: MasteryProblem } {
  const problems = masteryCatalog.problems;
  const index = problems.findIndex((p) => p.slug === slug || p.id === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? problems[index - 1] : undefined,
    next: index < problems.length - 1 ? problems[index + 1] : undefined,
  };
}
