import { PlacementCompanyId, CompanyCategory } from '../../types/placement';

export interface CompanyMeta {
  id: PlacementCompanyId;
  name: string;
  shortName: string;
  category: CompanyCategory;
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
    category: 'mass_recruiter',
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
    category: 'mass_recruiter',
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
    category: 'mass_recruiter',
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
    category: 'mass_recruiter',
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
    category: 'mass_recruiter',
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
  zoho: {
    id: 'zoho',
    name: 'Zoho Corporation',
    shortName: 'Zoho',
    category: 'mid_size',
    tagline: 'Software Developer (L1 & L2 Coding Drives)',
    description:
      'Tier 2 & 3 campus favorite. Known for elimination rounds focusing on C/C++/Java logic, string arithmetic, pattern printing, matrix transforms, and zero reliance on built-in libraries.',
    brandColor: '#ef4444', // Red
    badgeBg: 'bg-red-500/10 dark:bg-red-500/20',
    badgeBorder: 'border-red-500/30',
    badgeText: 'text-red-600 dark:text-red-400',
    tracks: [
      {
        name: 'Software Developer (L1)',
        ctcRange: '₹5.6 - ₹6.5 LPA',
        description: 'Standard product developer role evaluating pure problem solving and stdin/stdout programs.',
      },
      {
        name: 'Member Technical Staff (L2)',
        ctcRange: '₹8.4 - ₹10.0 LPA',
        description: 'Advanced track for candidates demonstrating exceptional mathematical algorithms and clean code.',
      },
    ],
    patternSummary: {
      sections: 'General Aptitude, C/Java Output Tracing, Standard I/O Hands-on Coding',
      duration: '90 Minutes',
      calculatorAllowed: false,
      negativeMarking: false,
    },
    keyTopics: ['String Manipulation', 'Matrix Rotation', 'Custom Math', 'Pattern Generation', 'Pointers'],
  },
  persistent: {
    id: 'persistent',
    name: 'Persistent Systems',
    shortName: 'Persistent',
    category: 'mid_size',
    tagline: 'Martian & Engineering Campus Hiring',
    description:
      'Comprehensive campus drive testing Quantitative Reasoning, Advanced CS Core (OS, DBMS, Networks, OOP), SQL queries, and hands-on coding under strict time constraints.',
    brandColor: '#f97316', // Orange
    badgeBg: 'bg-orange-500/10 dark:bg-orange-500/20',
    badgeBorder: 'border-orange-500/30',
    badgeText: 'text-orange-600 dark:text-orange-400',
    tracks: [
      {
        name: 'Software Engineer',
        ctcRange: '₹4.7 - ₹5.0 LPA',
        description: 'Entry engineering track focusing on full-stack fundamentals and clean coding.',
      },
      {
        name: 'Martian Track',
        ctcRange: '₹7.5 - ₹9.0 LPA',
        description: 'Premium upgrade track for top scorers in coding and advanced CS fundamentals.',
      },
    ],
    patternSummary: {
      sections: 'Aptitude, CS Core Fundamentals, SQL Queries, Hands-on Coding',
      duration: '75 Minutes',
      calculatorAllowed: false,
      negativeMarking: false,
    },
    keyTopics: ['SQL Joins', 'Memory Management', 'Network Protocol Suite', 'Dynamic Programming'],
  },
  capgemini: {
    id: 'capgemini',
    name: 'Capgemini',
    shortName: 'Capgemini Exceller',
    category: 'mid_size',
    tagline: 'Exceller Pooled Campus Drive',
    description:
      'Multi-stage evaluation evaluating English Communication, Game-based / Logical Aptitude, Technical Pseudocode Tracing, and two full stdin/stdout coding problems.',
    brandColor: '#0ea5e9', // Sky
    badgeBg: 'bg-sky-500/10 dark:bg-sky-500/20',
    badgeBorder: 'border-sky-500/30',
    badgeText: 'text-sky-600 dark:text-sky-400',
    tracks: [
      {
        name: 'Analyst (A4)',
        ctcRange: '₹4.25 LPA',
        description: 'Core software engineering role across cloud and enterprise application development.',
      },
      {
        name: 'Senior Analyst (A5)',
        ctcRange: '₹5.75 - ₹7.5 LPA',
        description: 'Advanced engineering role unlocked by passing both coding problems with optimal runtime.',
      },
    ],
    patternSummary: {
      sections: 'English Communication, Game/Logical Aptitude, Pseudocode, Hands-on Coding',
      duration: '70 Minutes',
      calculatorAllowed: false,
      negativeMarking: false,
    },
    keyTopics: ['Bitwise Operators', 'Loop Invariants', 'String Compression', 'Critical Reasoning'],
  },
};
