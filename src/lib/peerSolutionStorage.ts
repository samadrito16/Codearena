import { PeerSolution } from '../types';

const STORAGE_PREFIX = 'prismcode_peer_solutions_';
const UPVOTED_PREFIX = 'prismcode_peer_solution_upvoted_';

/**
 * Initial peer solutions map (empty by default; populated by genuine user submissions).
 */
const DEFAULT_PEER_SOLUTIONS: Record<string, PeerSolution[]> = {};

function getUpvotedSet(): Set<string> {
  try {
    const raw = localStorage.getItem(UPVOTED_PREFIX);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveUpvotedSet(set: Set<string>): void {
  try {
    localStorage.setItem(UPVOTED_PREFIX, JSON.stringify(Array.from(set)));
  } catch {
    // Ignore storage quota
  }
}

/**
 * Retrieve all peer solutions for a problem from local storage or pre-seeded defaults.
 */
export function getStoredPeerSolutions(problemId: string): PeerSolution[] {
  const upvoted = getUpvotedSet();
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + problemId);
    let list: PeerSolution[] = [];
    if (raw) {
      list = JSON.parse(raw);
    } else if (DEFAULT_PEER_SOLUTIONS[problemId]) {
      list = [...DEFAULT_PEER_SOLUTIONS[problemId]];
    }

    return list.map((sol) => ({
      ...sol,
      hasUpvoted: upvoted.has(sol.id),
    }));
  } catch {
    const def = DEFAULT_PEER_SOLUTIONS[problemId] || [];
    return def.map((sol) => ({
      ...sol,
      hasUpvoted: upvoted.has(sol.id),
    }));
  }
}

/**
 * Save a newly authored peer solution.
 */
export function savePeerSolution(
  problemId: string,
  solutionData: Omit<PeerSolution, 'id' | 'problemId' | 'createdAt' | 'upvotes' | 'hasUpvoted'>
): PeerSolution {
  const current = getStoredPeerSolutions(problemId);
  const newSol: PeerSolution = {
    ...solutionData,
    id: `sol_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    problemId,
    upvotes: 1, // Author automatically upvotes their own post
    hasUpvoted: true,
    createdAt: new Date().toISOString(),
  };

  const updated = [newSol, ...current];
  try {
    localStorage.setItem(STORAGE_PREFIX + problemId, JSON.stringify(updated));
  } catch {
    // Ignore storage issues
  }

  // Mark author as upvoted
  const upvoted = getUpvotedSet();
  upvoted.add(newSol.id);
  saveUpvotedSet(upvoted);

  return newSol;
}

/**
 * Toggle upvote for a peer solution.
 */
export function togglePeerSolutionUpvote(
  problemId: string,
  solutionId: string
): { upvotes: number; hasUpvoted: boolean } {
  const solutions = getStoredPeerSolutions(problemId);
  const upvoted = getUpvotedSet();
  const currentlyUpvoted = upvoted.has(solutionId);

  let targetUpvotes = 0;
  let newHasUpvoted = false;

  const updated = solutions.map((sol) => {
    if (sol.id === solutionId) {
      if (currentlyUpvoted) {
        sol.upvotes = Math.max(0, sol.upvotes - 1);
        newHasUpvoted = false;
      } else {
        sol.upvotes += 1;
        newHasUpvoted = true;
      }
      targetUpvotes = sol.upvotes;
    }
    return sol;
  });

  if (newHasUpvoted) {
    upvoted.add(solutionId);
  } else {
    upvoted.delete(solutionId);
  }

  try {
    localStorage.setItem(STORAGE_PREFIX + problemId, JSON.stringify(updated));
    saveUpvotedSet(upvoted);
  } catch {
    // Ignore storage quota
  }

  return { upvotes: targetUpvotes, hasUpvoted: newHasUpvoted };
}
