import sections from '../../../backend/src/data/questionSections.json';
import rawCatalog from '../../data/review/prism_review_scenarios.json';
import { getReviewTestSuite } from '../../data/review/reviewTestSuites';
import {
  ReviewCatalog,
  ReviewCategory,
  ReviewScenario,
} from '../../types/review';

const parsedCatalog = rawCatalog as unknown as ReviewCatalog;

export const reviewCatalog: ReviewCatalog = {
  ...parsedCatalog,
  scenarios: parsedCatalog.scenarios.filter(s => sections.review.some(entry => entry.id === s.id)).map((s) => ({
    ...s,
    testSuite: getReviewTestSuite(s.id),
  })),
};

export interface CategoryInfo {
  id: ReviewCategory;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  borderColor: string;
  badgeBg: string;
  iconName: 'Zap' | 'Bot' | 'Layers' | 'Shield' | 'Cpu';
}

export const CATEGORY_CONFIG: Record<ReviewCategory, CategoryInfo> = {
  async_concurrency: {
    id: 'async_concurrency',
    name: 'Async & Concurrency',
    tagline: 'Race conditions, event-loop microtasks, and task leakage',
    description: 'Debug check-then-act hazards, unhandled promise rejections, and background task leaks across async runtimes.',
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    borderColor: 'border-amber-500/20',
    badgeBg: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    iconName: 'Zap',
  },
  ai_gen_audit: {
    id: 'ai_gen_audit',
    name: 'AI Generation Audits',
    tagline: 'Cryptographic flaws, dropped remainders, and silent omissions',
    description: 'Spot subtle algorithmic regressions and security holes that look superficially correct in Copilot/LLM generated PRs.',
    gradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    borderColor: 'border-purple-500/20',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    iconName: 'Bot',
  },
  multi_file_logic: {
    id: 'multi_file_logic',
    name: 'Multi-File Architecture',
    tagline: 'Cross-module state mutations and circular require crashes',
    description: 'Trace state corruption, uninitialized singleton exports, and lifecycle ordering across complex multi-file modules.',
    gradient: 'from-teal-500/10 via-emerald-500/5 to-transparent',
    borderColor: 'border-teal-500/20',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    iconName: 'Layers',
  },
  security_audit: {
    id: 'security_audit',
    name: 'Security & Exploits',
    tagline: 'SSRF, prototype pollution, and sanitization bypasses',
    description: 'Audit production vulnerabilities before deployment and enforce zero-trust boundary validation.',
    gradient: 'from-rose-500/10 via-red-500/5 to-transparent',
    borderColor: 'border-rose-500/20',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    iconName: 'Shield',
  },
  performance_regression: {
    id: 'performance_regression',
    name: 'Performance Regressions',
    tagline: 'N+1 event leaks, unindexed queries, and O(N²) bottlenecks',
    description: 'Catch severe throughput degradation hidden in innocent-looking code reviews.',
    gradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
    borderColor: 'border-blue-500/20',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    iconName: 'Cpu',
  },
};

export const SUPPORTED_REVIEW_CATEGORIES: ReviewCategory[] = reviewCatalog.categories;

export function getAllReviewScenarios(): ReviewScenario[] {
  return reviewCatalog.scenarios;
}

export function getReviewScenarioBySlug(slug: string): ReviewScenario | undefined {
  return reviewCatalog.scenarios.find((s) => s.slug === slug || s.id === slug);
}

export function getReviewScenariosByCategory(category: ReviewCategory): ReviewScenario[] {
  return reviewCatalog.scenarios.filter((s) => s.category === category);
}

export function getScenariosGroupedByCategory(): Record<ReviewCategory, ReviewScenario[]> {
  const grouped: Record<ReviewCategory, ReviewScenario[]> = {
    async_concurrency: [],
    ai_gen_audit: [],
    multi_file_logic: [],
    security_audit: [],
    performance_regression: [],
  };

  for (const scenario of reviewCatalog.scenarios) {
    if (grouped[scenario.category]) {
      grouped[scenario.category].push(scenario);
    }
  }

  return grouped;
}

export function getNextAndPrevScenario(currentSlug: string): {
  prev?: ReviewScenario;
  next?: ReviewScenario;
} {
  const list = reviewCatalog.scenarios;
  const idx = list.findIndex((s) => s.slug === currentSlug || s.id === currentSlug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? list[idx - 1] : undefined,
    next: idx < list.length - 1 ? list[idx + 1] : undefined,
  };
}
