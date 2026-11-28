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
    typescript: 'function twoSum(nums: number[], target: number): number[] {\n  // Write your solution here\n  return [];\n}\n',
    java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};\n',
    c: '#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write your solution here\n    *returnSize = 0;\n    return NULL;\n}\n',
    go: 'package main\n\nfunc twoSum(nums []int, target int) []int {\n\t// Write your solution here\n\treturn []int{}\n}\n',
    rust: 'fn twoSum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n    // Write your solution here\n    Vec::new()\n}\n',
  },
  'valid-parentheses': {
    javascript: 'function isValid(s) {\n  // Write your solution here\n  return false;\n}\n',
    python: 'def is_valid(s: str) -> bool:\n    # Write your solution here\n    return False\n',
    typescript: 'function isValid(s: string): boolean {\n  // Write your solution here\n  return false;\n}\n',
    java: 'class Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n        return false;\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your solution here\n        return false;\n    }\n};\n',
    c: '#include <stdbool.h>\n\nbool isValid(char* s) {\n    // Write your solution here\n    return false;\n}\n',
    go: 'package main\n\nfunc isValid(s string) bool {\n\t// Write your solution here\n\treturn false\n}\n',
    rust: 'fn isValid(s: String) -> bool {\n    // Write your solution here\n    false\n}\n',
  },
  'longest-substring': {
    javascript: 'function lengthOfLongestSubstring(s) {\n  // Write your solution here\n  return 0;\n}\n',
    python: 'def length_of_longest_substring(s: str) -> int:\n    # Write your solution here\n    return 0\n',
    typescript: 'function lengthOfLongestSubstring(s: string): number {\n  // Write your solution here\n  return 0;\n}\n',
    java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your solution here\n        return 0;\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your solution here\n        return 0;\n    }\n};\n',
    c: 'int lengthOfLongestSubstring(char* s) {\n    // Write your solution here\n    return 0;\n}\n',
    go: 'package main\n\nfunc lengthOfLongestSubstring(s string) int {\n\t// Write your solution here\n\treturn 0\n}\n',
    rust: 'fn lengthOfLongestSubstring(s: String) -> i32 {\n    // Write your solution here\n    0\n}\n',
  },
  'container-water': {
    javascript: 'function maxArea(height) {\n  // Write your solution here\n  return 0;\n}\n',
    python: 'def max_area(height: list[int]) -> int:\n    # Write your solution here\n    return 0\n',
    typescript: 'function maxArea(height: number[]): number {\n  // Write your solution here\n  return 0;\n}\n',
    java: 'class Solution {\n    public int maxArea(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your solution here\n        return 0;\n    }\n};\n',
    c: 'int maxArea(int* height, int heightSize) {\n    // Write your solution here\n    return 0;\n}\n',
    go: 'package main\n\nfunc maxArea(height []int) int {\n\t// Write your solution here\n\treturn 0\n}\n',
    rust: 'fn maxArea(height: Vec<i32>) -> i32 {\n    // Write your solution here\n    0\n}\n',
  },
  'median-arrays': {
    javascript: 'function findMedianSortedArrays(nums1, nums2) {\n  // Write your solution here\n  return 0.0;\n}\n',
    python: 'def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:\n    # Write your solution here\n    return 0.0\n',
    typescript: 'function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n  // Write your solution here\n  return 0.0;\n}\n',
    java: 'class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Write your solution here\n        return 0.0;\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Write your solution here\n        return 0.0;\n    }\n};\n',
    c: 'double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {\n    // Write your solution here\n    return 0.0;\n}\n',
    go: 'package main\n\nfunc findMedianSortedArrays(nums1 []int, nums2 []int) float64 {\n\t// Write your solution here\n\treturn 0.0\n}\n',
    rust: 'fn findMedianSortedArrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {\n    // Write your solution here\n    0.0\n}\n',
  },
  'binary-tree-level-order': {
    javascript: 'function levelOrder(root) {\n  // Write your solution here\n  return [];\n}\n',
    python: 'def level_order(root) -> list[list[int]]:\n    # Write your solution here\n    return []\n',
    typescript: 'function levelOrder(root: (number | null)[]): number[][] {\n  // Write your solution here\n  return [];\n}\n',
    java: 'import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n',
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        // Write your solution here\n        return {};\n    }\n};\n',
    c: '#include <stdbool.h>\n#include <stdlib.h>\n\n#ifndef OPTIONAL_INT_DEFINED\n#define OPTIONAL_INT_DEFINED\ntypedef struct {\n    bool hasValue;\n    int value;\n} OptionalInt;\n#endif\n\nint** levelOrder(OptionalInt* root, int rootSize, int* returnSize, int** returnColumnSizes) {\n    // Write your solution here\n    *returnSize = 0;\n    *returnColumnSizes = NULL;\n    return NULL;\n}\n',
    go: 'package main\n\nfunc levelOrder(root []*int) [][]int {\n\t// Write your solution here\n\treturn [][]int{}\n}\n',
    rust: 'fn levelOrder(root: Vec<Option<i32>>) -> Vec<Vec<i32>> {\n    // Write your solution here\n    Vec::new()\n}\n',
  },
};
