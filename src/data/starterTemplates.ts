import type { CodeLanguage } from '../types';

/**
 * Static starter-code templates for seeded demo problems.
 * Isolated under src/data/ so future API-backed problems can supply `problem.starterCode`
 * directly without modifying local draft storage logic.
 */
export const starterCodeByProblemId: Record<string, Partial<Record<CodeLanguage, string>>> = {
  'two-sum': {
    javascript: 'function twoSum(nums, target) {\n  // Write your solution here\n  return [];\n}\n',
    python: 'def two_sum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here\n    return []\n',
    java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};\n',
  },
  'valid-parentheses': {
    javascript: 'function isValid(s) {\n  // Write your solution here\n  return false;\n}\n',
    python: 'def is_valid(s: str) -> bool:\n    # Write your solution here\n    return False\n',
    java: 'class Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n        return false;\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your solution here\n        return false;\n    }\n};\n',
  },
  'longest-substring': {
    javascript: 'function lengthOfLongestSubstring(s) {\n  // Write your solution here\n  return 0;\n}\n',
    python: 'def length_of_longest_substring(s: str) -> int:\n    # Write your solution here\n    return 0\n',
    java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your solution here\n        return 0;\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your solution here\n        return 0;\n    }\n};\n',
  },
  'container-water': {
    javascript: 'function maxArea(height) {\n  // Write your solution here\n  return 0;\n}\n',
    python: 'def max_area(height: list[int]) -> int:\n    # Write your solution here\n    return 0\n',
    java: 'class Solution {\n    public int maxArea(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your solution here\n        return 0;\n    }\n};\n',
  },
  'median-arrays': {
    javascript: 'function findMedianSortedArrays(nums1, nums2) {\n  // Write your solution here\n  return 0.0;\n}\n',
    python: 'def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:\n    # Write your solution here\n    return 0.0\n',
    java: 'class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Write your solution here\n        return 0.0;\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Write your solution here\n        return 0.0;\n    }\n};\n',
  },
  'binary-tree-level-order': {
    javascript: 'function levelOrder(root) {\n  // Write your solution here\n  return [];\n}\n',
    python: 'def level_order(root) -> list[list[int]]:\n    # Write your solution here\n    return []\n',
    java: 'import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        // Write your solution here\n        return {};\n    }\n};\n',
  },
};

