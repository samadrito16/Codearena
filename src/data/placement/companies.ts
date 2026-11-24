import { PlacementCompanyId } from '../../types/placement';

export interface CompanyMeta {
  id: PlacementCompanyId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  brandColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  tracks: {
    name: string;
    ctcRange: string;
    description: string;
  }[];
  patternSummary: {
    sections: string;
    duration: string;
    calculatorAllowed: boolean;
    negativeMarking: boolean;
  };
  keyTopics: string[];
}

export const PLACEMENT_COMPANIES: Record<PlacementCompanyId, CompanyMeta> = {
  tcs: {
    id: 'tcs',
    name: 'Tata Consultancy Services',
    shortName: 'TCS NQT',
    tagline: 'National Qualifier Test (Ninja & Digital Tracks)',
    description:
      'The largest campus hiring assessment in India. Evaluates foundation cognitive skills (Numerical, Reasoning, Verbal), Advanced CS Concepts (OOPs, DBMS, OS), and two multi-language coding questions.',
    brandColor: '#2563eb', // Blue
    badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    badgeBorder: 'border-blue-500/30',
    badgeText: 'text-blue-600 dark:text-blue-400',
    tracks: [
      {
        name: 'Ninja',
        ctcRange: '₹3.36 - ₹3.6 LPA',
        description: 'Standard foundational software development role with focus on strong aptitude and coding essentials.',
      },
      {
        name: 'Digital',
        ctcRange: '₹7.0 - ₹7.5 LPA',
        description: 'Premium engineering role unlocked by top percentile scores (>80%) and solving both coding problems.',
      },
      {
        name: 'Prime',
        ctcRange: '₹9.0 - ₹11.5 LPA',
        description: 'Elite R&D / systems architecture track for candidates scoring in the top 3% nationally.',
      },
    ],
    patternSummary: {
      sections: 'Numerical, Reasoning, Verbal, CS Fundamentals & Hands-on Coding',
      duration: '75 Minutes',
      calculatorAllowed: true,
      negativeMarking: false,
    },
    keyTopics: ['Time & Work', 'Speed-Distance', 'OS Paging', 'SQL Queries', 'Array Reversals'],
  },
  infosys: {
    id: 'infosys',
    name: 'Infosys Limited',
    shortName: 'Infosys',
    tagline: 'Specialist Programmer & Systems Engineer (InfyTQ / HackWithInfy)',
    description:
      'Rigorous elimination testing focusing heavily on deductive pseudocode tracing, advanced logical reasoning, mathematical puzzles, and complex algorithmic coding challenges.',
    brandColor: '#0284c7', // Sky
    badgeBg: 'bg-sky-500/10 dark:bg-sky-500/20',
    badgeBorder: 'border-sky-500/30',
    badgeText: 'text-sky-600 dark:text-sky-400',
    tracks: [
      {
        name: 'Systems Engineer (SE)',
        ctcRange: '₹3.6 - ₹4.0 LPA',
        description: 'Standard software engineer intake requiring passing sectional cutoffs across reasoning & aptitude.',
      },
      {
        name: 'Digital Specialist Engineer (DSE)',
        ctcRange: '₹6.25 - ₹6.5 LPA',
        description: 'Accelerated track requiring solving at least 1 complex coding challenge and high pseudocode accuracy.',
      },
      {
        name: 'Specialist Programmer (SP)',
        ctcRange: '₹9.5 - ₹10.0 LPA',
        description: 'Flagship competitive engineering role requiring full test case passes on dynamic programming/graphs.',
      },
    ],
    patternSummary: {
      sections: 'Reasoning Ability, Technical Pseudocode Tracing & Hands-on Coding',
      duration: '70 Minutes',
      calculatorAllowed: false,
      negativeMarking: true,
    },
    keyTopics: ['Recursive Tracing', 'Bitwise Hacks', 'Syllogisms', 'Greedy / DP', 'Data Structures'],
  },
  accenture: {
    id: 'accenture',
    name: 'Accenture',
    shortName: 'Accenture',
    tagline: 'Cognitive & Technical Assessment (ASE & FSE Tracks)',
    description:
      'Two-stage evaluation: Stage 1 tests Cognitive & Critical Thinking alongside Cloud Fundamentals, Networks, and MS Office concepts. Clearing Stage 1 unlocks the Hands-on Coding Round.',
    brandColor: '#a855f7', // Purple
    badgeBg: 'bg-purple-500/10 dark:bg-purple-500/20',
    badgeBorder: 'border-purple-500/30',
    badgeText: 'text-purple-600 dark:text-purple-400',
    tracks: [
      {
        name: 'Associate Software Engineer (ASE)',
        ctcRange: '₹4.5 LPA',
        description: 'Foundation engineering role focusing on cloud fundamentals, modern web, and clean code.',
      },
      {
        name: 'Advanced Associate Software Engineer (A-ASE)',
        ctcRange: '₹6.5 LPA',
        description: 'Unlocked by clearing cognitive with >75% and passing all test cases in the coding challenge.',
      },
    ],
    patternSummary: {
      sections: 'Critical Thinking, English Ability, Cloud & Tech Core, Coding Round',
      duration: '60 Minutes',
      calculatorAllowed: false,
      negativeMarking: false,
    },
    keyTopics: ['Cloud Concepts', 'Network Subnetting', 'Critical Reasoning', 'String Operations'],
  },
  wipro: {
    id: 'wipro',
    name: 'Wipro Limited',
    shortName: 'Wipro Elite',
    tagline: 'Elite National Talent Hunt (NTH)',
    description:
      'AMCAT-powered online assessment testing Quantitative Aptitude, Logical Reasoning, Computer Programming principles, and two coding problems in Wipro’s standard runtime environment.',
    brandColor: '#10b981', // Emerald
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    badgeBorder: 'border-emerald-500/30',
    badgeText: 'text-emerald-600 dark:text-emerald-400',
    tracks: [
      {
        name: 'Project Engineer (Elite)',
        ctcRange: '₹3.5 - ₹3.8 LPA',
        description: 'National talent hunt flagship entry tier for general software development services.',
      },
      {
        name: 'Turbo Track',
        ctcRange: '₹6.5 - ₹7.0 LPA',
        description: 'Premium upgrade offer given to candidates with high programming efficiency and clean architecture.',
      },
    ],
    patternSummary: {
      sections: 'Quantitative Aptitude, Logical Reasoning, CS Concepts, Coding Round',
      duration: '65 Minutes',
      calculatorAllowed: false,
      negativeMarking: true,
    },
    keyTopics: ['Permutations & Prob', 'Blood Relations', 'OOP Virtual Methods', 'Array Math'],
  },
  cognizant: {
    id: 'cognizant',
    name: 'Cognizant Technology Solutions',
    shortName: 'Cognizant GenC',
    tagline: 'GenC & GenC Next Selection Drive',
    description:
      'Assesses quantitative acumen, analytical thinking, and core computer science fundamentals (DBMS, OS, and OOPs), concluding with hands-on coding problem solving.',
    brandColor: '#06b6d4', // Cyan
    badgeBg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    badgeBorder: 'border-cyan-500/30',
    badgeText: 'text-cyan-600 dark:text-cyan-400',
    tracks: [
      {
        name: 'GenC',
        ctcRange: '₹4.0 LPA',
        description: 'Core software engineering role across cloud, enterprise Java, and data services.',
      },
      {
        name: 'GenC Next',
        ctcRange: '₹6.75 - ₹7.0 LPA',
        description: 'Advanced development role for top performers solving multi-testcase coding problems.',
      },
    ],
    patternSummary: {
      sections: 'Analytical Ability, Numerical Acumen, Core CS Concepts, Hands-on Coding',
      duration: '65 Minutes',
      calculatorAllowed: false,
      negativeMarking: false,
    },
    keyTopics: ['Number Properties', 'Analytical Puzzles', 'DBMS Joins', 'Deadlock Detection'],
  },
};
