export interface LearningModule {
  id: string;
  order: number;
  title: string;
  summary: string;
  concepts: string[];
  problemIds: string[];
  topicTags: string[];
}

export interface LearningPath {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  estimatedHours: string;
  accent: 'a' | 'b' | 'c';
  modules: LearningModule[];
}

export const learningPaths: LearningPath[] = [
  {
    id: 'arrays-and-hashing',
    order: 1,
    title: 'Arrays and Hashing',
    subtitle: 'Foundational lookups & frequency maps',
    description: 'Master constant-time lookups, complement indexing, frequency counting, and linear array scans.',
    topics: ['Array', 'Hash Table'],
    estimatedHours: '2–3 hrs',
    accent: 'a',
    modules: [
      {
        id: 'ah-hash-lookups',
        order: 1,
        title: 'Hash Map Complements & Indexing',
        summary: 'Trade linear memory for O(n) scans by indexing values as you iterate.',
        concepts: ['Hash Map', 'Complement lookup', 'One-pass scan'],
        problemIds: ['two-sum'],
        topicTags: ['Hash Table'],
      },
      {
        id: 'ah-frequency-patterns',
        order: 2,
        title: 'Frequency Counting & Grouping',
        summary: 'Bucket items by canonical signatures and track character/element counts efficiently.',
        concepts: ['Frequency map', 'Grouping keys', 'Prefix sums'],
        problemIds: [],
        topicTags: ['Array', 'Hash Table'],
      },
    ],
  },
  {
    id: 'two-pointers-and-sliding-window',
    order: 2,
    title: 'Two Pointers and Sliding Window',
    subtitle: 'Linear range & boundary techniques',
    description: 'Shrink nested loops into linear passes by advancing left and right pointers with invariants.',
    topics: ['Two Pointers', 'Sliding Window', 'String'],
    estimatedHours: '3–4 hrs',
    accent: 'b',
    modules: [
      {
        id: 'tp-opposite-ends',
        order: 1,
        title: 'Opposite-Ends Two Pointers',
        summary: 'Start from both boundaries and advance the limiting side to eliminate suboptimal pairs.',
        concepts: ['Opposite pointers', 'Area/sum invariants', 'O(1) space'],
        problemIds: ['container-water'],
        topicTags: ['Two Pointers'],
      },
      {
        id: 'tp-variable-window',
        order: 2,
        title: 'Variable-Size Sliding Window',
        summary: 'Expand the right edge and contract the left edge whenever a window constraint breaks.',
        concepts: ['Window invariant', 'Last-seen map', 'Subarray/substring scans'],
        problemIds: ['longest-substring'],
        topicTags: ['Sliding Window'],
      },
    ],
  },
  {
    id: 'stack-and-queues',
    order: 3,
    title: 'Stack and Queues',
    subtitle: 'LIFO nesting & FIFO ordering',
    description: 'Model balanced structures, expression parsing, monotonic sequences, and level-based queues.',
    topics: ['Stack', 'Queue', 'String'],
    estimatedHours: '2–3 hrs',
    accent: 'c',
    modules: [
      {
        id: 'sq-bracket-matching',
        order: 1,
        title: 'Balanced Structures & LIFO Matching',
        summary: 'Use a stack to validate nested scopes and match opening/closing delimiters.',
        concepts: ['LIFO order', 'Delimiter pairs', 'Empty-stack check'],
        problemIds: ['valid-parentheses'],
        topicTags: ['Stack'],
      },
      {
        id: 'sq-monotonic-structures',
        order: 2,
        title: 'Monotonic Stack & Deque Patterns',
        summary: 'Find next greater/smaller elements and sliding window extrema in amortized O(n) time.',
        concepts: ['Monotonic stack', 'Deque', 'Amortized O(n)'],
        problemIds: [],
        topicTags: ['Queue', 'Monotonic Stack'],
      },
    ],
  },
  {
    id: 'binary-search',
    order: 4,
    title: 'Binary Search',
    subtitle: 'Logarithmic halving & partitioning',
    description: 'Exploit sorted order and monotonic predicates to cut the search space in half each step.',
    topics: ['Binary Search', 'Divide and Conquer'],
    estimatedHours: '3–4 hrs',
    accent: 'a',
    modules: [
      {
        id: 'bs-sorted-partition',
        order: 1,
        title: 'Partitioning Sorted Arrays',
        summary: 'Binary search over partition boundaries to locate order statistics in logarithmic time.',
        concepts: ['Partition invariant', 'Boundary guards', 'O(log(min(m, n)))'],
        problemIds: ['median-arrays'],
        topicTags: ['Binary Search', 'Divide and Conquer'],
      },
      {
        id: 'bs-answer-space',
        order: 2,
        title: 'Binary Search on Answer Space',
        summary: 'Apply monotonic feasibility checks to minimize or maximize thresholds.',
        concepts: ['Monotonic predicate', 'Lower/upper bound', 'Overflow-safe mid'],
        problemIds: [],
        topicTags: ['Binary Search'],
      },
    ],
  },
  {
    id: 'linked-lists',
    order: 5,
    title: 'Linked Lists',
    subtitle: 'Pointer rewiring & cycle detection',
    description: 'Practice in-place node reversal, sentinel heads, merging sorted lists, and fast/slow pointers.',
    topics: ['Linked List', 'Two Pointers'],
    estimatedHours: '2–3 hrs',
    accent: 'b',
    modules: [
      {
        id: 'll-reversal-dummy',
        order: 1,
        title: 'Sentinel Nodes & In-Place Reversal',
        summary: 'Avoid head edge cases with dummy nodes and rewire next pointers safely.',
        concepts: ['Dummy head', 'Iterative reversal', 'Pointer tracking'],
        problemIds: [],
        topicTags: ['Linked List'],
      },
      {
        id: 'll-fast-slow',
        order: 2,
        title: 'Fast & Slow Pointers',
        summary: 'Detect cycles, find midpoints, and locate kth-from-end nodes in O(1) space.',
        concepts: ['Floyd cycle detection', 'Midpoint split', 'Merge lists'],
        problemIds: [],
        topicTags: ['Linked List'],
      },
    ],
  },
  {
    id: 'trees-and-graphs',
    order: 6,
    title: 'Trees and Graphs',
    subtitle: 'BFS, DFS & hierarchical traversals',
    description: 'Traverse trees level by level, reason recursively over subtrees, and navigate connected graphs.',
    topics: ['Tree', 'Binary Tree', 'Breadth-First Search', 'Graph'],
    estimatedHours: '4–5 hrs',
    accent: 'c',
    modules: [
      {
        id: 'tg-level-order-bfs',
        order: 1,
        title: 'Breadth-First & Level-Order Traversal',
        summary: 'Process tree nodes layer by layer using a FIFO queue and snapshot level sizes.',
        concepts: ['BFS queue', 'Level batching', 'Tree height'],
        problemIds: ['binary-tree-level-order'],
        topicTags: ['Tree', 'Binary Tree', 'Breadth-First Search'],
      },
      {
        id: 'tg-dfs-graphs',
        order: 2,
        title: 'Recursive DFS & Graph Search',
        summary: 'Explore subtrees, detect cycles, and track visited nodes across adjacency lists.',
        concepts: ['DFS recursion', 'Visited set', 'Topological sort'],
        problemIds: [],
        topicTags: ['Graph', 'Depth-First Search'],
      },
    ],
  },
  {
    id: 'greedy-algorithms',
    order: 7,
    title: 'Greedy Algorithms',
    subtitle: 'Locally optimal choices & proofs',
    description: 'Identify when greedy exchange arguments guarantee global optimality without full search.',
    topics: ['Greedy', 'Sorting', 'Intervals'],
    estimatedHours: '2–3 hrs',
    accent: 'a',
    modules: [
      {
        id: 'gr-choice-invariant',
        order: 1,
        title: 'Greedy Elimination & Choice Invariants',
        summary: 'Prove why discarding the weaker option preserves the optimal solution.',
        concepts: ['Exchange argument', 'Bounding choice', 'Linear scan'],
        problemIds: ['container-water'],
        topicTags: ['Greedy'],
      },
      {
        id: 'gr-intervals',
        order: 2,
        title: 'Interval Scheduling & Merging',
        summary: 'Sort by start or end boundary to merge overlaps and maximize non-overlapping intervals.',
        concepts: ['Sort by boundary', 'Overlap merge', 'Activity selection'],
        problemIds: [],
        topicTags: ['Greedy', 'Intervals'],
      },
    ],
  },
  {
    id: 'dynamic-programming',
    order: 8,
    title: 'Dynamic Programming',
    subtitle: 'Overlapping subproblems & state transitions',
    description: 'Break complex optimization and counting problems into clean states, recurrences, and base cases.',
    topics: ['Dynamic Programming', 'Memoization'],
    estimatedHours: '5–6 hrs',
    accent: 'b',
    modules: [
      {
        id: 'dp-1d-states',
        order: 1,
        title: '1D State Transitions & Memoization',
        summary: 'Formulate recurrence relations, cache overlapping calls, and optimize rolling space.',
        concepts: ['Top-down memo', 'Bottom-up table', 'Rolling variables'],
        problemIds: [],
        topicTags: ['Dynamic Programming', 'Memoization'],
      },
      {
        id: 'dp-2d-subsequences',
        order: 2,
        title: '2D Grids, Knapsack & Subsequences',
        summary: 'Design two-dimensional DP tables for sequence alignment and capacity constraints.',
        concepts: ['2D state table', 'Take/skip choice', 'LCS & Edit Distance'],
        problemIds: [],
        topicTags: ['Dynamic Programming'],
      },
    ],
  },
];
