import type { Problem } from '../types/index.js';

export const initialProblems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Table'],
    acceptance: '48.2%',
    submissions: '2.4M',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10⁴',
      '-10⁹ <= nums[i] <= 10⁹',
      '-10⁹ <= target <= 10⁹',
      'Only one valid answer exists.',
    ],
    starterCode: {
      javascript: 'function twoSum(nums, target) {\n  // Write your solution here\n  return [];\n}\n',
      python: 'def two_sum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here\n    return []\n',
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};\n',
    },
    orderInvariant: true,
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
      {
        caseNumber: 4,
        input: 'nums = [-1, -2, -3, -4, -5], target = -8',
        expected: '[2, 4]',
        isHidden: true,
      },
      {
        caseNumber: 5,
        input: 'nums = [0, 4, 3, 0], target = 0',
        expected: '[0, 3]',
        isHidden: true,
      },
    ],
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topics: ['String', 'Stack'],
    acceptance: '40.1%',
    submissions: '1.8M',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
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
      {
        input: 's = "([])"',
        output: 'true',
      },
    ],
    constraints: [
      '1 <= s.length <= 10⁴',
      's consists of parentheses only \'()[]{}\'.',
    ],
    starterCode: {
      javascript: 'function isValid(s) {\n  // Write your solution here\n  return false;\n}\n',
      python: 'def is_valid(s: str) -> bool:\n    # Write your solution here\n    return False\n',
      java: 'class Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n        return false;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your solution here\n        return false;\n    }\n};\n',
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
        input: 's = "()[]{}"',
        expected: 'true',
        isHidden: false,
      },
      {
        caseNumber: 3,
        input: 's = "(]"',
        expected: 'false',
        isHidden: false,
      },
      {
        caseNumber: 4,
        input: 's = "([)]"',
        expected: 'false',
        isHidden: true,
      },
      {
        caseNumber: 5,
        input: 's = "{[]}"',
        expected: 'true',
        isHidden: true,
      },
    ],
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topics: ['String', 'Sliding Window', 'Hash Table'],
    acceptance: '34.7%',
    submissions: '1.5M',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    constraints: [
      '0 <= s.length <= 5 × 10⁴',
      's consists of English letters, digits, symbols and spaces.',
    ],
    starterCode: {
      javascript: 'function lengthOfLongestSubstring(s) {\n  // Write your solution here\n  return 0;\n}\n',
      python: 'def length_of_longest_substring(s: str) -> int:\n    # Write your solution here\n    return 0\n',
      java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your solution here\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your solution here\n        return 0;\n    }\n};\n',
    },
    testCases: [
      {
        caseNumber: 1,
        input: 's = "abcabcbb"',
        expected: '3',
        isHidden: false,
      },
      {
        caseNumber: 2,
        input: 's = "bbbbb"',
        expected: '1',
        isHidden: false,
      },
      {
        caseNumber: 3,
        input: 's = "pwwkew"',
        expected: '3',
        isHidden: true,
      },
      {
        caseNumber: 4,
        input: 's = ""',
        expected: '0',
        isHidden: true,
      },
      {
        caseNumber: 5,
        input: 's = "au"',
        expected: '2',
        isHidden: true,
      },
    ],
  },
  {
    id: 'container-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    topics: ['Array', 'Two Pointers', 'Greedy'],
    acceptance: '55.4%',
    submissions: '900K',
    description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.',
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.',
      },
      {
        input: 'height = [1,1]',
        output: '1',
      },
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10⁵',
      '0 <= height[i] <= 10⁴',
    ],
    starterCode: {
      javascript: 'function maxArea(height) {\n  // Write your solution here\n  return 0;\n}\n',
      python: 'def max_area(height: list[int]) -> int:\n    # Write your solution here\n    return 0\n',
      java: 'class Solution {\n    public int maxArea(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your solution here\n        return 0;\n    }\n};\n',
    },
    testCases: [
      {
        caseNumber: 1,
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        expected: '49',
        isHidden: false,
      },
      {
        caseNumber: 2,
        input: 'height = [1,1]',
        expected: '1',
        isHidden: false,
      },
      {
        caseNumber: 3,
        input: 'height = [4,3,2,1,4]',
        expected: '16',
        isHidden: true,
      },
      {
        caseNumber: 4,
        input: 'height = [1,2,1]',
        expected: '2',
        isHidden: true,
      },
    ],
  },
  {
    id: 'median-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    topics: ['Array', 'Binary Search', 'Divide and Conquer'],
    acceptance: '36.5%',
    submissions: '750K',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).',
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.',
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.',
      },
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10⁶ <= nums1[i], nums2[i] <= 10⁶',
    ],
    starterCode: {
      javascript: 'function findMedianSortedArrays(nums1, nums2) {\n  // Write your solution here\n  return 0.0;\n}\n',
      python: 'def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:\n    # Write your solution here\n    return 0.0\n',
      java: 'class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Write your solution here\n        return 0.0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Write your solution here\n        return 0.0;\n    }\n};\n',
    },
    testCases: [
      {
        caseNumber: 1,
        input: 'nums1 = [1,3], nums2 = [2]',
        expected: '2.00000',
        isHidden: false,
      },
      {
        caseNumber: 2,
        input: 'nums1 = [1,2], nums2 = [3,4]',
        expected: '2.50000',
        isHidden: false,
      },
      {
        caseNumber: 3,
        input: 'nums1 = [0,0], nums2 = [0,0]',
        expected: '0.00000',
        isHidden: true,
      },
      {
        caseNumber: 4,
        input: 'nums1 = [], nums2 = [1]',
        expected: '1.00000',
        isHidden: true,
      },
    ],
  },
  {
    id: 'binary-tree-level-order',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topics: ['Tree', 'Binary Tree', 'Breadth-First Search'],
    acceptance: '65.8%',
    submissions: '680K',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
      },
      {
        input: 'root = [1]',
        output: '[[1]]',
      },
      {
        input: 'root = []',
        output: '[]',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000',
    ],
    starterCode: {
      javascript: 'function levelOrder(root) {\n  // Write your solution here\n  return [];\n}\n',
      python: 'def level_order(root) -> list[list[int]]:\n    # Write your solution here\n    return []\n',
      java: 'import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        // Write your solution here\n        return {};\n    }\n};\n',
    },
    testCases: [
      {
        caseNumber: 1,
        input: 'root = [3,9,20,null,null,15,7]',
        expected: '[[3],[9,20],[15,7]]',
        isHidden: false,
      },
      {
        caseNumber: 2,
        input: 'root = [1]',
        expected: '[[1]]',
        isHidden: false,
      },
      {
        caseNumber: 3,
        input: 'root = []',
        expected: '[]',
        isHidden: true,
      },
    ],
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    topics: ['Linked List', 'Two Pointers'],
    acceptance: '74.2%',
    submissions: '2.9M',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
      },
      {
        input: 'head = [1,2]',
        output: '[2,1]',
      },
      {
        input: 'head = []',
        output: '[]',
      },
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000',
    ],
    starterCode: {
      javascript: 'function reverseList(head) {\n  // Write your solution here\n  return null;\n}\n',
      python: 'def reverse_list(head):\n    # Write your solution here\n    return None\n',
      java: 'class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your solution here\n        return null;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write your solution here\n        return nullptr;\n    }\n};\n',
    },
    testCases: [
      {
        caseNumber: 1,
        input: 'head = [1,2,3,4,5]',
        expected: '[5,4,3,2,1]',
        isHidden: false,
      },
      {
        caseNumber: 2,
        input: 'head = [1,2]',
        expected: '[2,1]',
        isHidden: false,
      },
      {
        caseNumber: 3,
        input: 'head = []',
        expected: '[]',
        isHidden: true,
      },
    ],
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topics: ['Dynamic Programming', 'Math', 'Memoization'],
    acceptance: '52.6%',
    submissions: '2.5M',
    description: 'You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps',
      },
      {
        input: 'n = 3',
        output: '3',
        explanation: 'There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step',
      },
    ],
    constraints: [
      '1 <= n <= 45',
    ],
    starterCode: {
      javascript: 'function climbStairs(n) {\n  // Write your solution here\n  return 0;\n}\n',
      python: 'def climb_stairs(n: int) -> int:\n    # Write your solution here\n    return 0\n',
      java: 'class Solution {\n    public int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n};\n',
    },
    testCases: [
      {
        caseNumber: 1,
        input: 'n = 2',
        expected: '2',
        isHidden: false,
      },
      {
        caseNumber: 2,
        input: 'n = 3',
        expected: '3',
        isHidden: false,
      },
      {
        caseNumber: 3,
        input: 'n = 5',
        expected: '8',
        isHidden: true,
      },
      {
        caseNumber: 4,
        input: 'n = 1',
        expected: '1',
        isHidden: true,
      },
    ],
  },
];
