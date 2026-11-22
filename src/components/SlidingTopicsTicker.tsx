import { Link } from 'react-router-dom';
import {
  Binary,
  Boxes,
  Code2,
  Compass,
  Cpu,
  Database,
  Flame,
  GitBranch,
  GitCommit,
  GitFork,
  GitMerge,
  Grid,
  HardDrive,
  Hash,
  Layers,
  Network,
  RotateCcw,
  Search,
  Share2,
  Sliders,
  Sparkles,
  Split,
  Trophy,
  Workflow,
  Zap,
} from 'lucide-react';

interface TopicItem {
  id: string;
  name: string;
  icon: typeof Code2;
  link: string;
}

// Upper line: slides LEFT (16 distinct topics)
const row1Topics: TopicItem[] = [
  { id: 'two-pointers', name: 'Two pointers', icon: GitFork, link: '/mastery' },
  { id: 'sliding-window', name: 'Sliding window', icon: Split, link: '/mastery' },
  { id: 'dynamic-programming', name: 'Dynamic programming', icon: Boxes, link: '/problems' },
  { id: 'binary-search', name: 'Binary search', icon: Search, link: '/mastery' },
  { id: 'monotonic-stack', name: 'Monotonic stack', icon: Layers, link: '/mastery' },
  { id: 'trie', name: 'Trie & prefix trees', icon: Network, link: '/problems' },
  { id: 'top-k-heaps', name: 'Top K elements & heaps', icon: Trophy, link: '/mastery' },
  { id: 'fast-slow-pointers', name: 'Fast & slow pointers', icon: Compass, link: '/mastery' },
  { id: 'bit-manipulation', name: 'Bit manipulation', icon: Cpu, link: '/problems' },
  { id: 'in-place-linked-list', name: 'In-place linked lists', icon: Workflow, link: '/mastery' },
  { id: 'greedy', name: 'Greedy heuristics', icon: Flame, link: '/problems' },
  { id: 'math-modular', name: 'Modular arithmetic', icon: Hash, link: '/problems' },
  { id: 'kadanes-algorithm', name: "Kadane's algorithm", icon: Sparkles, link: '/problems' },
  { id: 'interval-merge', name: 'Interval scheduling', icon: Sliders, link: '/mastery' },
  { id: 'string-hashing', name: 'String pattern matching', icon: Code2, link: '/problems' },
  { id: 'recursion-trees', name: 'Recursion state trees', icon: GitBranch, link: '/problems' },
];

// Lower line: slides RIGHT (16 distinct topics)
const row2Topics: TopicItem[] = [
  { id: 'bfs', name: 'Breadth-first search (BFS)', icon: Share2, link: '/mastery' },
  { id: 'dfs', name: 'Depth-first search (DFS)', icon: GitCommit, link: '/mastery' },
  { id: 'hash-maps', name: 'Hash maps & sets', icon: Database, link: '/mastery' },
  { id: 'backtracking', name: 'Backtracking & recursion', icon: RotateCcw, link: '/problems' },
  { id: 'graph-topo', name: 'Graph topological sort', icon: GitBranch, link: '/problems' },
  { id: 'prefix-sums', name: 'Prefix sums & intervals', icon: Sliders, link: '/mastery' },
  { id: 'tree-traversals', name: 'Tree traversals', icon: Binary, link: '/problems' },
  { id: 'matrix-search', name: 'Matrix & 2D grid search', icon: Grid, link: '/problems' },
  { id: 'union-find', name: 'Union-find / Disjoint set', icon: GitMerge, link: '/problems' },
  { id: 'segment-trees', name: 'Segment tree queries', icon: Layers, link: '/problems' },
  { id: 'lru-cache', name: 'LRU cache system design', icon: HardDrive, link: '/workspace/two-sum' },
  { id: 'divide-conquer', name: 'Divide & conquer', icon: Zap, link: '/problems' },
  { id: 'shortest-path', name: "Dijkstra's shortest path", icon: Compass, link: '/problems' },
  { id: 'mst', name: 'Minimum spanning tree', icon: Workflow, link: '/problems' },
  { id: 'bitmask-dp', name: 'Bitmask dynamic programming', icon: Cpu, link: '/problems' },
  { id: 'fenwick-tree', name: 'Binary indexed tree', icon: Boxes, link: '/problems' },
];

function PillItem({ item }: { item: TopicItem }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.link}
      className="group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium border border-slate-200/90 bg-white/70 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-white dark:border-neutral-800/90 dark:bg-neutral-900/60 dark:text-neutral-400 dark:hover:text-white dark:hover:border-neutral-700 dark:hover:bg-neutral-800/80 transition-all select-none shadow-sm shrink-0 whitespace-nowrap cursor-pointer"
    >
      <Icon
        size={13}
        className="text-slate-500 group-hover:text-amber-600 dark:text-neutral-400 dark:group-hover:text-amber-400 transition-colors shrink-0"
      />
      <span>{item.name}</span>
    </Link>
  );
}

export default function SlidingTopicsTicker() {
  return (
    <section
      aria-label="Popular topics and algorithmic patterns"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw] overflow-hidden py-3 space-y-3"
    >
      {/* Left and Right Smooth Edge Fade Overlays */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 bg-gradient-to-r from-[var(--ca-canvas)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 bg-gradient-to-l from-[var(--ca-canvas)] to-transparent" />

      {/* Edge Fade Mask Container */}
      <div className="marquee-fade-mask w-full overflow-hidden">
        {/* Row 1: Sliding LEFT */}
        <div className="flex w-max animate-marquee-left gap-3 py-1">
          {/* Double items for continuous seamless loop */}
          {row1Topics.map((item, idx) => (
            <PillItem key={`r1-a-${item.id}-${idx}`} item={item} />
          ))}
          {row1Topics.map((item, idx) => (
            <PillItem key={`r1-b-${item.id}-${idx}`} item={item} />
          ))}
        </div>

        {/* Row 2: Sliding RIGHT */}
        <div className="flex w-max animate-marquee-right gap-3 py-1">
          {/* Double items for continuous seamless loop */}
          {row2Topics.map((item, idx) => (
            <PillItem key={`r2-a-${item.id}-${idx}`} item={item} />
          ))}
          {row2Topics.map((item, idx) => (
            <PillItem key={`r2-b-${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
