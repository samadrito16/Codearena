import { CompanyAssessment, CodingPlacementQuestion } from '../../types/placement';
import { APTITUDE_QUESTION_BANK } from './questions/aptitudeQuestions';
import { CS_QUESTION_BANK } from './questions/csQuestions';

// Common Coding Questions for Mocks
const CODING_TCS_NINJA: CodingPlacementQuestion = {
  id: 'tcs-code-ninja-1',
  type: 'coding',
  section: 'coding',
  subject: 'cs_pseudocode',
  subtopic: 'Array Processing',
  difficulty: 'Easy',
  marks: 15,
  negativeMarks: 0,
  problemId: 'two-sum',
  title: 'Target Pair Identification',
  description:
    'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input has exactly one valid solution, and you may not use the same element twice. You can return the answer in any order formatted as a comma-separated list or array.',
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Exactly one valid answer exists.',
  ],
  examples: [
    {
      input: 'nums = [2, 7, 11, 15], target = 9',
      output: '[0, 1]',
      explanation: 'Because nums[0] + nums[1] == 2 + 7 == 9, we return indices [0, 1].',
    },
    {
      input: 'nums = [3, 2, 4], target = 6',
      output: '[1, 2]',
      explanation: 'nums[1] + nums[2] == 2 + 4 == 6.',
    },
  ],
  starterCode: {
    javascript: `function solve(nums, target) {
  // Write your code here
  return [0, 1];
}`,
    python: `def solve(nums: list[int], target: int) -> list[int]:
    # Write your code here
    return [0, 1]`,
    java: `import java.util.*;

class Solution {
    public int[] solve(int[] nums, int target) {
        // Write your code here
        return new int[]{0, 1};
    }
}`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> solve(vector<int>& nums, int target) {
    // Write your code here
    return {0, 1};
}`,
  },
  testCases: [
    {
      caseNumber: 1,
      input: 'nums = [2, 7, 11, 15], target = 9',
      expected: '[0, 1]',
      isHidden: false,
    },
    {
      caseNumber: 2,
      input: 'nums = [3, 2, 4], target = 6',
      expected: '[1, 2]',
      isHidden: false,
    },
    {
      caseNumber: 3,
      input: 'nums = [3, 3], target = 6',
      expected: '[0, 1]',
      isHidden: true,
    },
  ],
  referenceCode: {
    language: 'python',
    code: `def solve(nums: list[int], target: int) -> list[int]:
    lookup = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            return [lookup[complement], i]
        lookup[num] = i
    return []`,
  },
  explanation: {
    summary: 'Use a hash map to achieve O(N) time complexity by looking up the complement for each element.',
    steps: [
      'Iterate through the array while maintaining a map of seen numbers to their indices.',
      'For each number x, check if (target - x) is in the map.',
      'If present, return [map[target - x], currentIndex].',
      'Otherwise, insert x into the map.',
    ],
    formulaOrShortcut: 'O(N) Time Complexity, O(N) Space Complexity using Hash Table.',
  },
};

const CODING_TCS_DIGITAL: CodingPlacementQuestion = {
  id: 'tcs-code-digital-1',
  type: 'coding',
  section: 'coding',
  subject: 'cs_pseudocode',
  subtopic: 'Dynamic Programming & Arrays',
  difficulty: 'Medium',
  marks: 25,
  negativeMarks: 0,
  problemId: 'maximum-subarray',
  title: 'Maximum Contiguous Subarray Sum',
  description:
    'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.',
  constraints: [
    '1 <= nums.length <= 10^5',
    '-10^4 <= nums[i] <= 10^4',
  ],
  examples: [
    {
      input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
      output: '6',
      explanation: 'The subarray [4, -1, 2, 1] has the largest sum 6.',
    },
    {
      input: 'nums = [1]',
      output: '1',
      explanation: 'Single element array.',
    },
    {
      input: 'nums = [5, 4, -1, 7, 8]',
      output: '23',
      explanation: 'Entire array sum is 23.',
    },
  ],
  starterCode: {
    javascript: `function maxSubArray(nums) {
  // Write your code here
  return 0;
}`,
    python: `def max_sub_array(nums: list[int]) -> int:
    # Write your code here
    return 0`,
    java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here
        return 0;
    }
}`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Write your code here
    return 0;
}`,
  },
  testCases: [
    {
      caseNumber: 1,
      input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
      expected: '6',
      isHidden: false,
    },
    {
      caseNumber: 2,
      input: 'nums = [5, 4, -1, 7, 8]',
      expected: '23',
      isHidden: false,
    },
    {
      caseNumber: 3,
      input: 'nums = [-1, -2, -3]',
      expected: '-1',
      isHidden: true,
    },
  ],
  referenceCode: {
    language: 'python',
    code: `def max_sub_array(nums: list[int]) -> int:
    max_so_far = nums[0]
    curr_max = nums[0]
    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    return max_so_far`,
  },
  explanation: {
    summary: "Kadane's algorithm solves this in linear time O(N) and O(1) auxiliary space.",
    steps: [
      'Maintain two variables: `curr_max` (the maximum sum ending at the current index) and `max_so_far`.',
      'For each element, decide whether to add it to existing subarray or start fresh: `curr_max = max(x, curr_max + x)`.',
      'Update `max_so_far = max(max_so_far, curr_max)`.',
    ],
    formulaOrShortcut: "Kadane's algorithm: O(N) Time, O(1) Space.",
  },
};

const CODING_INFOSYS_1: CodingPlacementQuestion = {
  id: 'infy-code-1',
  type: 'coding',
  section: 'coding',
  subject: 'cs_pseudocode',
  subtopic: 'Greedy Algorithms',
  difficulty: 'Medium',
  marks: 20,
  negativeMarks: 0,
  problemId: 'jump-game',
  title: 'Minimum Energy Jump Game',
  description:
    'You are given an integer array `nums`. You are initially positioned at the array\'s first index, and each element represents your maximum jump length at that position.\n\nReturn `true` if you can reach the last index, or `false` otherwise.',
  constraints: [
    '1 <= nums.length <= 10^4',
    '0 <= nums[i] <= 10^5',
  ],
  examples: [
    {
      input: 'nums = [2, 3, 1, 1, 4]',
      output: 'true',
      explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.',
    },
    {
      input: 'nums = [3, 2, 1, 0, 4]',
      output: 'false',
      explanation: 'You will always arrive at index 3. Its maximum jump length is 0, making it impossible to reach the end.',
    },
  ],
  starterCode: {
    javascript: `function canJump(nums) {
  // Write your code here
  return true;
}`,
    python: `def can_jump(nums: list[int]) -> bool:
    # Write your code here
    return True`,
    java: `class Solution {
    public boolean canJump(int[] nums) {
        // Write your code here
        return true;
    }
}`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool canJump(vector<int>& nums) {
    // Write your code here
    return true;
}`,
  },
  testCases: [
    {
      caseNumber: 1,
      input: 'nums = [2, 3, 1, 1, 4]',
      expected: 'true',
      isHidden: false,
    },
    {
      caseNumber: 2,
      input: 'nums = [3, 2, 1, 0, 4]',
      expected: 'false',
      isHidden: false,
    },
    {
      caseNumber: 3,
      input: 'nums = [0]',
      expected: 'true',
      isHidden: true,
    },
  ],
  referenceCode: {
    language: 'python',
    code: `def can_jump(nums: list[int]) -> bool:
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + jump)
    return True`,
  },
  explanation: {
    summary: 'Greedy tracking of maximum reachable index.',
    steps: [
      'Initialize `max_reach = 0`.',
      'Traverse array: if current index `i > max_reach`, we cannot reach this point, return `false`.',
      'Otherwise update `max_reach = max(max_reach, i + nums[i])`.',
      'If traversal completes, return `true`.',
    ],
    formulaOrShortcut: 'Greedy approach: O(N) Time, O(1) Space.',
  },
};

const CODING_ACCENTURE_1: CodingPlacementQuestion = {
  id: 'acc-code-1',
  type: 'coding',
  section: 'coding',
  subject: 'cs_pseudocode',
  subtopic: 'String Manipulation',
  difficulty: 'Easy',
  marks: 15,
  negativeMarks: 0,
  problemId: 'valid-parentheses',
  title: 'Balanced Bracket Validator',
  description:
    'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets in the correct order, and every close bracket has a corresponding open bracket.',
  constraints: [
    '1 <= s.length <= 10^4',
    's consists of parentheses only "()[]{}"',
  ],
  examples: [
    {
      input: 's = "()"',
      output: 'true',
    },
    {
      input: 's = "()[]{}"',
      output: 'true',
    },
    {
      input: 's = "(]"',
      output: 'false',
    },
  ],
  starterCode: {
    javascript: `function isValid(s) {
  // Write your code here
  return true;
}`,
    python: `def is_valid(s: str) -> bool:
    # Write your code here
    return True`,
    java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        return true;
    }
}`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool isValid(string s) {
    // Write your code here
    return true;
}`,
  },
  testCases: [
    {
      caseNumber: 1,
      input: 's = "()"',
      expected: 'true',
      isHidden: false,
    },
    {
      caseNumber: 2,
      input: 's = "(]"',
      expected: 'false',
      isHidden: false,
    },
    {
      caseNumber: 3,
      input: 's = "{[]}"',
      expected: 'true',
      isHidden: true,
    },
  ],
  referenceCode: {
    language: 'python',
    code: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
  },
  explanation: {
    summary: 'Use a LIFO stack to match closing brackets with recent opening brackets.',
    steps: [
      'Push opening brackets onto stack.',
      'When encounter closing bracket, pop from stack and check match.',
      'At end, stack must be empty for string to be balanced.',
    ],
    formulaOrShortcut: 'Stack LIFO: O(N) Time, O(N) Space.',
  },
};

// ==========================================
// 5 FLAGSHIP COMPANY ASSESSMENTS
// ==========================================

export const COMPANY_ASSESSMENTS: CompanyAssessment[] = [
  // 1. TCS NQT
  {
    id: 'tcs-nqt-mock-1',
    companyId: 'tcs',
    companyName: 'Tata Consultancy Services',
    title: 'TCS NQT Complete Assessment (Ninja & Digital)',
    track: 'Ninja & Digital',
    tierLabel: 'Flagship Qualifier',
    description:
      'Realistic simulation of the TCS National Qualifier Test. Features Cognitive Foundation (Numerical & Reasoning), CS Core (OOP, DBMS, OS, Networks), and 2 Hands-on Coding questions.',
    difficulty: 'Intermediate',
    totalDurationMinutes: 75,
    enforceSectionLock: true,
    allowBacktrackingWithinSection: true,
    totalMarks: 60,
    tags: ['TCS iON', 'Ninja ₹3.6 LPA', 'Digital ₹7.5 LPA', 'Calculator Enabled'],
    cutoffTiers: [
      {
        trackName: 'TCS Ninja Shortlist',
        minOverallPercentage: 62,
        badgeColor: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
        description: 'Qualifies for Ninja Interview Round (₹3.6 LPA package).',
      },
      {
        trackName: 'TCS Digital Shortlist',
        minOverallPercentage: 80,
        badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
        description: 'Elite Digital Interview Round (₹7.0 - ₹7.5 LPA package). Requires strong CS Core and passing both coding questions.',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Below national qualifying threshold. Review weak subjects in the diagnostic breakdown.',
      },
    ],
    sections: [
      {
        id: 'sec-tcs-1',
        title: 'Section 1: Numerical Ability',
        type: 'quantitative',
        durationMinutes: 20,
        allowCalculator: true,
        instructions: 'Numerical questions with on-screen calculator access. No negative marks.',
        questions: APTITUDE_QUESTION_BANK.filter((q) => q.section === 'quantitative').slice(0, 5),
      },
      {
        id: 'sec-tcs-2',
        title: 'Section 2: Reasoning & Verbal Ability',
        type: 'reasoning',
        durationMinutes: 20,
        allowCalculator: false,
        instructions: 'Logical deduction, syllogisms, and sentence construction.',
        questions: [
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'reasoning').slice(0, 3),
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'verbal').slice(0, 2),
        ],
      },
      {
        id: 'sec-tcs-3',
        title: 'Section 3: Advanced CS Fundamentals',
        type: 'cs_fundamentals',
        durationMinutes: 15,
        allowCalculator: false,
        instructions: 'Core engineering concepts: OOPs virtual dispatch, DBMS ACID, OS scheduling & paging.',
        questions: CS_QUESTION_BANK.filter((q) => q.section === 'cs_fundamentals').slice(0, 4),
      },
      {
        id: 'sec-tcs-4',
        title: 'Section 4: Hands-on Coding (2 Problems)',
        type: 'coding',
        durationMinutes: 20,
        allowCalculator: false,
        instructions: 'Problem 1 is Ninja standard; Problem 2 is Digital standard.',
        questions: [CODING_TCS_NINJA, CODING_TCS_DIGITAL],
      },
    ],
  },

  // 2. INFOSYS
  {
    id: 'infosys-sp-mock-1',
    companyId: 'infosys',
    companyName: 'Infosys Limited',
    title: 'Infosys Specialist Programmer & DSE Mock',
    track: 'Systems Engineer & SP',
    tierLabel: 'InfyTQ Simulation',
    description:
      'Challenging assessment emphasizing recursive pseudocode tracing, bitwise puzzles, logical seating arrangements, and dynamic programming.',
    difficulty: 'Challenging',
    totalDurationMinutes: 70,
    enforceSectionLock: true,
    allowBacktrackingWithinSection: true,
    totalMarks: 55,
    tags: ['InfyTQ', 'Specialist ₹9.5 LPA', 'DSE ₹6.5 LPA', 'Negative Marking'],
    cutoffTiers: [
      {
        trackName: 'Infosys Systems Engineer',
        minOverallPercentage: 60,
        badgeColor: 'text-sky-500 bg-sky-500/10 border-sky-500/30',
        description: 'Qualifies for Systems Engineer profile.',
      },
      {
        trackName: 'Infosys DSE / Specialist Programmer',
        minOverallPercentage: 78,
        badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
        description: 'Direct shortlist for Specialist Programmer (SP) or Digital Specialist Engineer (DSE).',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Review pseudocode stack tracing and recurrence relations.',
      },
    ],
    sections: [
      {
        id: 'sec-infy-1',
        title: 'Section 1: Logical & Analytical Reasoning',
        type: 'reasoning',
        durationMinutes: 20,
        allowCalculator: false,
        questions: APTITUDE_QUESTION_BANK.filter((q) => q.section === 'reasoning').slice(0, 4),
      },
      {
        id: 'sec-infy-2',
        title: 'Section 2: Technical Pseudocode Tracing',
        type: 'pseudocode',
        durationMinutes: 20,
        allowCalculator: false,
        questions: CS_QUESTION_BANK.filter((q) => q.section === 'pseudocode').slice(0, 3),
      },
      {
        id: 'sec-infy-3',
        title: 'Section 3: Algorithmic Coding Challenge',
        type: 'coding',
        durationMinutes: 30,
        allowCalculator: false,
        questions: [CODING_INFOSYS_1, CODING_TCS_DIGITAL],
      },
    ],
  },

  // 3. ACCENTURE
  {
    id: 'accenture-tech-mock-1',
    companyId: 'accenture',
    companyName: 'Accenture',
    title: 'Accenture Cognitive & Technical Assessment',
    track: 'ASE & Advanced ASE',
    tierLabel: 'Two-Stage Selection',
    description:
      'Tests Critical Reasoning, English Verbal Ability, Cloud/Network fundamentals, and Hands-on Coding.',
    difficulty: 'Intermediate',
    totalDurationMinutes: 60,
    enforceSectionLock: false,
    allowBacktrackingWithinSection: true,
    totalMarks: 50,
    tags: ['Cognitive Round', 'Cloud & Networks', 'ASE ₹4.5 LPA', 'A-ASE ₹6.5 LPA'],
    cutoffTiers: [
      {
        trackName: 'Accenture ASE Cleared',
        minOverallPercentage: 65,
        badgeColor: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
        description: 'Cleared cognitive and tech cutoff for Associate Software Engineer.',
      },
      {
        trackName: 'Accenture Advanced ASE Cleared',
        minOverallPercentage: 82,
        badgeColor: 'text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/30',
        description: 'Shortlisted for Advanced ASE role.',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Below cutoff.',
      },
    ],
    sections: [
      {
        id: 'sec-acc-1',
        title: 'Section 1: Critical Thinking & English',
        type: 'verbal',
        durationMinutes: 20,
        questions: [
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'verbal'),
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'reasoning').slice(0, 2),
        ],
      },
      {
        id: 'sec-acc-2',
        title: 'Section 2: Technical Fundamentals & Networks',
        type: 'cs_fundamentals',
        durationMinutes: 20,
        questions: [
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_networks'),
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_dbms'),
        ],
      },
      {
        id: 'sec-acc-3',
        title: 'Section 3: Coding Assessment',
        type: 'coding',
        durationMinutes: 20,
        questions: [CODING_ACCENTURE_1, CODING_TCS_NINJA],
      },
    ],
  },

  // 4. WIPRO
  {
    id: 'wipro-elite-mock-1',
    companyId: 'wipro',
    companyName: 'Wipro Limited',
    title: 'Wipro Elite NTH Assessment',
    track: 'Project Engineer & Turbo',
    tierLabel: 'AMCAT Pattern',
    description:
      'AMCAT-pattern mock exam covering Quantitative Aptitude, Logical Reasoning, Computer Programming principles, and two coding problems.',
    difficulty: 'Intermediate',
    totalDurationMinutes: 65,
    enforceSectionLock: true,
    allowBacktrackingWithinSection: true,
    totalMarks: 50,
    tags: ['AMCAT', 'Elite NTH', 'Turbo ₹7 LPA', 'Negative Marking'],
    cutoffTiers: [
      {
        trackName: 'Wipro Elite Shortlist',
        minOverallPercentage: 60,
        badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
        description: 'Qualifies for Project Engineer role.',
      },
      {
        trackName: 'Wipro Turbo Upgrade',
        minOverallPercentage: 78,
        badgeColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
        description: 'Turbo upgrade interview invitation (₹6.5 - ₹7.0 LPA).',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Below national cutoff.',
      },
    ],
    sections: [
      {
        id: 'sec-wipro-1',
        title: 'Section 1: Quantitative & Numerical Ability',
        type: 'quantitative',
        durationMinutes: 20,
        questions: APTITUDE_QUESTION_BANK.filter((q) => q.section === 'quantitative').slice(2, 6),
      },
      {
        id: 'sec-wipro-2',
        title: 'Section 2: Computer Science Concepts',
        type: 'cs_fundamentals',
        durationMinutes: 20,
        questions: CS_QUESTION_BANK.filter((q) => q.section === 'cs_fundamentals').slice(1, 5),
      },
      {
        id: 'sec-wipro-3',
        title: 'Section 3: Coding Round',
        type: 'coding',
        durationMinutes: 25,
        questions: [CODING_ACCENTURE_1, CODING_TCS_NINJA],
      },
    ],
  },

  // 5. COGNIZANT
  {
    id: 'cognizant-genc-mock-1',
    companyId: 'cognizant',
    companyName: 'Cognizant Technology Solutions',
    title: 'Cognizant GenC & GenC Next Selection Drive',
    track: 'GenC & GenC Next',
    tierLabel: 'Campus Drive',
    description:
      'High-yield test assessing Analytical Thinking, Quantitative Acumen, Core CS Concepts (DBMS, OS, OOPs), and Coding.',
    difficulty: 'Intermediate',
    totalDurationMinutes: 65,
    enforceSectionLock: false,
    allowBacktrackingWithinSection: true,
    totalMarks: 50,
    tags: ['GenC ₹4.0 LPA', 'GenC Next ₹7.0 LPA', 'Core CS'],
    cutoffTiers: [
      {
        trackName: 'Cognizant GenC Cleared',
        minOverallPercentage: 62,
        badgeColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/30',
        description: 'Qualifies for GenC Core Developer offer.',
      },
      {
        trackName: 'Cognizant GenC Next Shortlist',
        minOverallPercentage: 80,
        badgeColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30',
        description: 'Selected for GenC Next high-package track (₹6.75 - ₹7.0 LPA).',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Below qualification benchmark.',
      },
    ],
    sections: [
      {
        id: 'sec-cog-1',
        title: 'Section 1: Analytical & Numerical Reasoning',
        type: 'quantitative',
        durationMinutes: 20,
        questions: [
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'quantitative').slice(0, 3),
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'reasoning').slice(0, 2),
        ],
      },
      {
        id: 'sec-cog-2',
        title: 'Section 2: CS Core Engineering',
        type: 'cs_fundamentals',
        durationMinutes: 20,
        questions: [
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_oops'),
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_os'),
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_dbms'),
        ],
      },
      {
        id: 'sec-cog-3',
        title: 'Section 3: Hands-on Coding',
        type: 'coding',
        durationMinutes: 25,
        questions: [CODING_TCS_NINJA, CODING_INFOSYS_1],
      },
    ],
  },
];
