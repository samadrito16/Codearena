export interface RoadmapSection {
  title: string;
  bullets: string[];
}

export interface RoadmapCardData {
  id: string;
  badge: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
  sections: RoadmapSection[];
}

export const platformRoadmapCards: RoadmapCardData[] = [
  {
    id: 'problem-arena',
    badge: 'Practice Arena',
    title: 'Curated Problem Arena',
    description:
      'Solve handcrafted coding challenges spanning Easy, Medium, and Hard tiers. Build algorithmic intuition with automated test suites, edge-case diffing, and multi-language execution telemetry.',
    link: '/problems',
    linkText: 'Explore Problems',
    sections: [
      {
        title: 'Topic Coverage & Fixtures',
        bullets: [
          'Arrays, Strings, Hash Maps, Linked Lists, Trees and Graphs',
          'Dynamic Programming, Two Pointers and Binary Search',
          'Handcrafted input/output fixtures with hidden edge cases',
        ],
      },
      {
        title: 'Test Suite Evaluation',
        bullets: [
          'Instant automated test suite diffing and test case manager',
          'Custom test input harness for interactive experimentation',
          'Order-invariant validation and execution telemetry',
        ],
      },
    ],
  },
  {
    id: 'pattern-mastery',
    badge: '100 Blueprints',
    title: 'Subgoal Pattern Mastery Studio',
    description:
      'Stop memorizing brute-force solutions. Decompose complex DSA problems into foundational mental models, critical boundaries, and optimal subgoal blueprints.',
    link: '/mastery',
    linkText: 'Open Mastery Studio',
    sections: [
      {
        title: '5 Core Algorithmic Paradigms',
        bullets: [
          'Two Pointers: opposite ends, fast & slow, and in-place writes',
          'Sliding Window: dynamic range expansion and contraction',
          'Hash Maps & Sets: amortized O(1) complements and frequency grouping',
          'Dynamic Programming: optimal substructure and state memoization',
          'Breadth-First Search: level-order state and shortest path queues',
        ],
      },
      {
        title: 'Active Cognitive Drills',
        bullets: [
          'Pattern Diagnosis quizzes & clue detection from problem invariants',
          'Active Typed Recall drills testing critical boundary lines from memory',
          'Brute force vs optimal complexity comparison benchmarks',
        ],
      },
    ],
  },
  {
    id: 'ai-code-review',
    badge: 'Senior & AI-Era',
    title: 'Code Review & Debugging Arena',
    description:
      'The critical interview dimension missed by traditional platforms. Audit multi-file broken repositories, detect subtle concurrency race conditions, and catch flawed AI-generated PR code.',
    link: '/review',
    linkText: 'Enter Review Arena',
    sections: [
      {
        title: 'Real-World Broken Scenarios',
        bullets: [
          'Multi-file repositories with cross-module dependency bugs',
          'Async & concurrency flaws: race conditions, missing locks, event loop pitfalls',
          'AI-generated code PR audits with planted regressions',
        ],
      },
      {
        title: 'Structured Review Workflow',
        bullets: [
          'Inline line-level annotation with category tagging (Bug, Perf, Security)',
          'Rubric grading: benchmark how well you caught planted flaws against staff rubric',
          'Progressive investigation hints and staff engineer reference reviews',
        ],
      },
    ],
  },
  {
    id: 'learning-paths',
    badge: '7 Guided Tracks',
    title: 'Guided DSA Learning Paths',
    description:
      'Structured step-by-step curricula taking you from fundamental coding mechanics to advanced interview-ready data structures with progressive prerequisites.',
    link: '/learning-paths',
    linkText: 'Browse Learning Paths',
    sections: [
      {
        title: 'Progressive Curricula',
        bullets: [
          'Linear indexing, prefix sums & array manipulations',
          'Hashing, frequency counting and complement lookups',
          'Two Pointers, variable-size sliding windows and substrings',
          'Stacks, Queues, monotonic structures and balanced delimiters',
          'Binary search over sorted partitions and answer spaces',
        ],
      },
      {
        title: 'Prerequisites & Checkpoints',
        bullets: [
          'Structured module-by-module problem unlocks with milestone tracking',
          'Clear concept primers and theoretical foundations before coding',
          'Path progress percentages and estimated completion pacing',
        ],
      },
    ],
  },
  {
    id: 'cloud-ide',
    badge: '5 Modern Runtimes',
    title: 'Cloud IDE & Container Sandbox',
    description:
      'Experience a modern cloud code editor powered by the VS Code Monaco Engine, paired with isolated Linux Docker containers for safe, instant multi-language execution.',
    link: '/workspace/two-sum',
    linkText: 'Launch Cloud Workspace',
    sections: [
      {
        title: 'Monaco Pro Editor',
        bullets: [
          'VS Code engine with full syntax highlighting & IntelliSense',
          'Configurable themes, custom fonts, minimap and keyboard shortcuts',
          'Local draft persistence and auto-recovery across sessions',
        ],
      },
      {
        title: 'Sandboxed Container Runtime',
        bullets: [
          'Python 3.14, Node.js 24, TypeScript, C++ 14 (GCC), and Java 21',
          'Isolated, resource-controlled containers with strict memory limits',
          'Sub-100ms telemetry: runtime in ms, peak memory in MB, and stdout',
        ],
      },
    ],
  },
  {
    id: 'daily-challenges',
    badge: 'Daily Pacing & Streak',
    title: 'Daily Challenges & 14-Day Streak',
    description:
      'Build disciplined consistency with daily hand-picked algorithmic challenges. Test your speed and edge-case intuition under simulated interview conditions.',
    link: '/daily-challenges',
    linkText: 'Take Daily Challenge',
    sections: [
      {
        title: 'Daily Interview Simulation',
        bullets: [
          'Fresh daily problem hand-selected for interview relevance',
          'Pacing timer with active workspace practice tracking',
          'Bonus challenge reward points upon accepted submission',
        ],
      },
      {
        title: 'Interactive 14-Day Streak System',
        bullets: [
          '14-Day rolling window with daily completion indicators',
          'Active streak counter, personal best records & habit scoring',
          'Day-by-day session inspector with problem review shortcuts',
        ],
      },
    ],
  },
  {
    id: 'competitive-benchmarks',
    badge: 'Percentile Rating',
    title: 'Competitive Benchmarking & Leaderboard',
    description:
      'Every submission is benchmarked against real executions from developers across the platform. Strive for optimal solutions that minimize runtime and memory overhead.',
    link: '/leaderboard',
    linkText: 'View Leaderboard',
    sections: [
      {
        title: 'Percentile Telemetry',
        bullets: [
          '100% test fixture correctness required for benchmark rating',
          'Runtime percentile curves comparing your solution against peers',
          'Memory efficiency telemetry and algorithmic complexity evaluation',
        ],
      },
      {
        title: 'Global Standings',
        bullets: [
          'Community rankings with total problems solved and active streaks',
          'Live developer handles, scores, and avatar badges',
          'Friendly competition to keep your problem-solving sharp',
        ],
      },
    ],
  },
  {
    id: 'progress-analytics',
    badge: '52-Week Heatmap',
    title: 'Progress Analytics & Activity Heatmap',
    description:
      'Visualize your entire engineering growth trajectory with a 52-week GitHub-style contribution heatmap and in-depth performance analytics.',
    link: '/progress',
    linkText: 'Inspect Progress',
    sections: [
      {
        title: 'Activity Heatmap & Practice Volume',
        bullets: [
          '52-Week GitHub-style daily practice heatmap with session tallies',
          'Total practice duration and active workspace time tracking',
          'Estimated average solve times and fastest personal records',
        ],
      },
      {
        title: 'Topic Mastery & Milestone Badges',
        bullets: [
          'Topic mastery meters across Arrays, Trees, Graphs, DP and Hashing',
          'Local attempt acceptance rates and submission logs',
          'Achievement badges unlocking across speed, streak, and difficulty',
        ],
      },
    ],
  },
];
