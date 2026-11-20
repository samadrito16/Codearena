import type { Problem } from '../types/index.js';

export const initialProblems: Problem[] = [
  {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "acceptance": "48.2%",
    "submissions": "2.4M",
    "description": "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice.",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "nums = [3, 2, 4], target = 6",
        "output": "[1, 2]"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10⁴",
      "-10⁹ <= nums[i] <= 10⁹",
      "Only one valid answer exists."
    ],
    "starterCode": {
      "javascript": "function twoSum(nums, target) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def two_sum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "orderInvariant": true,
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2, 7, 11, 15], target = 9",
        "expected": "[0, 1]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3, 2, 4], target = 6",
        "expected": "[1, 2]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [3, 3], target = 6",
        "expected": "[0, 1]",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "nums = [-1, -2, -3, -4, -5], target = -8",
        "expected": "[2, 4]",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "nums = [0, 4, 3, 0], target = 0",
        "expected": "[0, 3]",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "nums = [1000000000, 500000000, -1000000000], target = 0",
        "expected": "[0, 2]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "valid-parentheses",
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Stack"
    ],
    "acceptance": "40.1%",
    "submissions": "1.8M",
    "description": "Given a string s containing only the characters (){}[], determine whether the input string is valid. An input string is valid when brackets close in the correct order and every opening bracket has a matching closing bracket.",
    "examples": [
      {
        "input": "s = \"()[]{}\"",
        "output": "true"
      },
      {
        "input": "s = \"(]\"",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10⁴",
      "s consists of parentheses only: ()[]{}."
    ],
    "starterCode": {
      "javascript": "function isValid(s) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def is_valid(s: str) -> bool:\n    # Write your solution here\n    return False\n",
      "java": "class Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"()[]{}\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"(]\"",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "s = \"{[]}\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "s = \"([)]\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "s = \"[\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "s = \"]\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "s = \"\"",
        "expected": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "longest-substring",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "34.7%",
    "submissions": "1.5M",
    "description": "Given a string s, find the length of the longest substring without repeating characters.",
    "examples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "The answer is \"abc\", with a length of 3."
      },
      {
        "input": "s = \"bbbbb\"",
        "output": "1"
      }
    ],
    "constraints": [
      "0 <= s.length <= 5 × 10⁴",
      "s consists of English letters, digits, symbols and spaces."
    ],
    "starterCode": {
      "javascript": "function lengthOfLongestSubstring(s) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def length_of_longest_substring(s: str) -> int:\n    # Write your solution here\n    return 0\n",
      "java": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"abcabcbb\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"bbbbb\"",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "s = \"pwwkew\"",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "s = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "s = \" \"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "s = \"au\"",
        "expected": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "container-water",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Greedy"
    ],
    "acceptance": "55.4%",
    "submissions": "900K",
    "description": "You are given an integer array height of length n. There are n vertical lines. Find two lines that together with the x-axis form a container that holds the maximum amount of water.",
    "examples": [
      {
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "output": "49"
      },
      {
        "input": "height = [1,1]",
        "output": "1"
      }
    ],
    "constraints": [
      "n == height.length",
      "2 <= n <= 10⁵",
      "0 <= height[i] <= 10⁴"
    ],
    "starterCode": {
      "javascript": "function maxArea(height) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_area(height: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "java": "class Solution {\n    public int maxArea(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "expected": "49",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "height = [1,1]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "height = [1, 1]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "height = [4, 3, 2, 1, 4]",
        "expected": "16",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "height = [1, 2, 1]",
        "expected": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "median-arrays",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Binary Search",
      "Divide and Conquer"
    ],
    "acceptance": "36.5%",
    "submissions": "750K",
    "description": "Given two sorted arrays nums1 and nums2 of size m and n, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).",
    "examples": [
      {
        "input": "nums1 = [1,3], nums2 = [2]",
        "output": "2.0"
      },
      {
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "output": "2.5"
      }
    ],
    "constraints": [
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000"
    ],
    "starterCode": {
      "javascript": "function findMedianSortedArrays(nums1, nums2) {\n  // Write your solution here\n  return 0.0;\n}\n",
      "python": "def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:\n    # Write your solution here\n    return 0.0\n",
      "java": "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Write your solution here\n        return 0.0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Write your solution here\n        return 0.0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums1 = [1,3], nums2 = [2]",
        "expected": "2.0",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "expected": "2.5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums1 = [0, 0], nums2 = [0, 0]",
        "expected": "0.00000",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "nums1 = [], nums2 = [1]",
        "expected": "1.00000",
        "isHidden": true
      },
      {
        "caseNumber": 3,
        "input": "nums1 = [2], nums2 = []",
        "expected": "2.00000",
        "isHidden": true
      }
    ]
  },
  {
    "id": "binary-tree-level-order",
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "topics": [
      "Tree",
      "Graph"
    ],
    "acceptance": "65.8%",
    "submissions": "680K",
    "description": "Given the root of a binary tree, return the level order traversal of its nodes’ values. (That is, from left to right, level by level.)",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "[[3],[9,20],[15,7]]"
      },
      {
        "input": "root = [1]",
        "output": "[[1]]"
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 <= Node.val <= 1000"
    ],
    "starterCode": {
      "javascript": "function levelOrder(root) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def level_order(root) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "root = [3,9,20,null,null,15,7]",
        "expected": "[[3],[9,20],[15,7]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "root = [1]",
        "expected": "[[1]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "hash-001",
    "title": "Count Distinct Labels",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "68.4%",
    "submissions": "49.0K",
    "description": "Count how many distinct integer labels appear in the input list.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countDistinctLabels(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_distinct_labels(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countDistinctLabels(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countDistinctLabels(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-002",
    "title": "First Repeated Value",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "73.0%",
    "submissions": "30.8K",
    "description": "Return the value whose second occurrence appears earliest while scanning left to right.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction firstRepeatedValue(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def first_repeated_value(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object firstRepeatedValue(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto firstRepeatedValue(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-003",
    "title": "Unique Occurrence Count",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "65.7%",
    "submissions": "42.4K",
    "description": "Count values that occur exactly once.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction uniqueOccurrenceCount(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def unique_occurrence_count(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object uniqueOccurrenceCount(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto uniqueOccurrenceCount(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-004",
    "title": "Most Frequent Label",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "70.6%",
    "submissions": "46.0K",
    "description": "Return the most frequent value; break ties by choosing the smallest value.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction mostFrequentLabel(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def most_frequent_label(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object mostFrequentLabel(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto mostFrequentLabel(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-005",
    "title": "Frequency of Target",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "65.2%",
    "submissions": "47.1K",
    "description": "Return the number of times a given target value appears.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction frequencyOfTarget(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def frequency_of_target(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object frequencyOfTarget(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto frequencyOfTarget(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-006",
    "title": "Shared Values of Two Lists",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "69.8%",
    "submissions": "28.0K",
    "description": "Return distinct values present in both lists, sorted ascending.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction sharedValuesOfTwoLists(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def shared_values_of_two_lists(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object sharedValuesOfTwoLists(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto sharedValuesOfTwoLists(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-007",
    "title": "Missing Labels in Range",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "63.7%",
    "submissions": "32.0K",
    "description": "Given values in [lo, hi], return all absent labels in ascending order.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction missingLabelsInRange(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def missing_labels_in_range(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object missingLabelsInRange(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto missingLabelsInRange(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-008",
    "title": "Pair Sum Exists",
    "difficulty": "Easy",
    "topics": [
      "Hash Table",
      "Two Pointers"
    ],
    "acceptance": "71.4%",
    "submissions": "49.7K",
    "description": "Determine whether any two distinct indices sum to target.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction pairSumExists(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def pair_sum_exists(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object pairSumExists(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto pairSumExists(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-009",
    "title": "Duplicate Within Distance",
    "difficulty": "Easy",
    "topics": [
      "Hash Table",
      "Sliding Window"
    ],
    "acceptance": "74.3%",
    "submissions": "43.3K",
    "description": "Determine whether equal values occur at indices at most k apart.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction duplicateWithinDistance(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def duplicate_within_distance(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object duplicateWithinDistance(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto duplicateWithinDistance(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-010",
    "title": "Frequency Difference",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "66.9%",
    "submissions": "39.2K",
    "description": "Return keys whose frequencies differ between two lists and their signed differences.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction frequencyDifference(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def frequency_difference(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object frequencyDifference(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto frequencyDifference(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-011",
    "title": "Most Common Word Code",
    "difficulty": "Easy",
    "topics": [
      "Hash Table",
      "Graph"
    ],
    "acceptance": "72.2%",
    "submissions": "37.5K",
    "description": "Return the most frequent token; ties resolved lexicographically.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction mostCommonWordCode(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def most_common_word_code(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object mostCommonWordCode(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto mostCommonWordCode(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-012",
    "title": "Unique Pair Sums",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "70.1%",
    "submissions": "46.3K",
    "description": "Count distinct sums formed by pairs of different indices.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction uniquePairSums(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def unique_pair_sums(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object uniquePairSums(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto uniquePairSums(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-013",
    "title": "Set Equality Ignoring Order",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "76.2%",
    "submissions": "37.0K",
    "description": "Determine whether two lists contain the same multiset of values.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction setEqualityIgnoringOrder(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def set_equality_ignoring_order(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object setEqualityIgnoringOrder(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto setEqualityIgnoringOrder(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-014",
    "title": "Common Multiplicity",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "68.4%",
    "submissions": "39.0K",
    "description": "Return the sum of minimum frequencies for values shared by two lists.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction commonMultiplicity(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def common_multiplicity(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object commonMultiplicity(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto commonMultiplicity(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-015",
    "title": "First Unique Index",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "67.6%",
    "submissions": "21.2K",
    "description": "Return the earliest index whose value occurs exactly once, or -1.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction firstUniqueIndex(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def first_unique_index(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object firstUniqueIndex(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto firstUniqueIndex(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-016",
    "title": "Mode Count",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "69.2%",
    "submissions": "17.3K",
    "description": "Return how many distinct values share the maximum frequency.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction modeCount(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def mode_count(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object modeCount(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto modeCount(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-017",
    "title": "Nearby Duplicate Distance",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "66.4%",
    "submissions": "29.1K",
    "description": "Return the minimum index gap between equal values, or -1 if none.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction nearbyDuplicateDistance(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def nearby_duplicate_distance(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object nearbyDuplicateDistance(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto nearbyDuplicateDistance(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-018",
    "title": "Frequency Bucket Summary",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "67.2%",
    "submissions": "37.2K",
    "description": "Return a mapping from frequency to how many values have that frequency.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction frequencyBucketSummary(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def frequency_bucket_summary(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object frequencyBucketSummary(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto frequencyBucketSummary(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-019",
    "title": "Distinct Window Values",
    "difficulty": "Easy",
    "topics": [
      "Hash Table",
      "Sliding Window"
    ],
    "acceptance": "72.3%",
    "submissions": "18.0K",
    "description": "For each window of width k, return its number of distinct values.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction distinctWindowValues(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def distinct_window_values(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object distinctWindowValues(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto distinctWindowValues(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-020",
    "title": "Repeated Pair Tracker",
    "difficulty": "Easy",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "72.5%",
    "submissions": "15.4K",
    "description": "Return all values that reach their second occurrence, in encounter order.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction repeatedPairTracker(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def repeated_pair_tracker(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object repeatedPairTracker(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto repeatedPairTracker(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-021",
    "title": "Longest Balanced Binary Segment",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "48.2%",
    "submissions": "18.2K",
    "description": "Find the longest contiguous segment with equal counts of 0 and 1 using prefix balance hashing.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestBalancedBinarySegment(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_balanced_binary_segment(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestBalancedBinarySegment(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestBalancedBinarySegment(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-022",
    "title": "Subarray Sum Target Count",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Array",
      "Prefix Sum"
    ],
    "acceptance": "49.5%",
    "submissions": "25.1K",
    "description": "Count contiguous subarrays whose sum equals target using prefix-sum frequencies.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction subarraySumTargetCount(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def subarray_sum_target_count(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object subarraySumTargetCount(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto subarraySumTargetCount(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-023",
    "title": "Longest Target-Sum Segment",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Array",
      "Prefix Sum"
    ],
    "acceptance": "55.0%",
    "submissions": "14.8K",
    "description": "Return the maximum length of a contiguous subarray summing to target.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestTargetSumSegment(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_target_sum_segment(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestTargetSumSegment(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestTargetSumSegment(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-024",
    "title": "Zero-Sum Subarray Witness",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "51.1%",
    "submissions": "11.4K",
    "description": "Return the earliest zero-sum subarray endpoints, preferring smallest ending index.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction zeroSumSubarrayWitness(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def zero_sum_subarray_witness(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object zeroSumSubarrayWitness(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto zeroSumSubarrayWitness(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-025",
    "title": "Pair Count with Difference",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "49.2%",
    "submissions": "12.4K",
    "description": "Count index pairs with absolute difference exactly k, respecting duplicate multiplicity.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction pairCountWithDifference(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def pair_count_with_difference(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object pairCountWithDifference(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto pairCountWithDifference(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-026",
    "title": "Triplet Sum Frequency",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "47.6%",
    "submissions": "22.7K",
    "description": "Count index triplets whose values sum to target; each index combination counts once.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction tripletSumFrequency(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def triplet_sum_frequency(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object tripletSumFrequency(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto tripletSumFrequency(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-027",
    "title": "Anagram Signature Groups",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "47.9%",
    "submissions": "27.2K",
    "description": "Group words by character-frequency signature; preserve original order inside groups.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction anagramSignatureGroups(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def anagram_signature_groups(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object anagramSignatureGroups(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto anagramSignatureGroups(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-028",
    "title": "Canonical Rotation Groups",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "String"
    ],
    "acceptance": "56.9%",
    "submissions": "9.7K",
    "description": "Group strings that are rotations of each other using canonical keys.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction canonicalRotationGroups(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def canonical_rotation_groups(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object canonicalRotationGroups(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto canonicalRotationGroups(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-029",
    "title": "Longest Consecutive Value Run",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "44.8%",
    "submissions": "22.2K",
    "description": "Find the longest run of consecutive integer values regardless of input order.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestConsecutiveValueRun(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_consecutive_value_run(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestConsecutiveValueRun(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestConsecutiveValueRun(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-030",
    "title": "Subarrays with K Distinct Values",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "49.1%",
    "submissions": "11.4K",
    "description": "Count subarrays containing exactly k distinct values.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction subarraysWithKDistinctValues(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def subarrays_with_k_distinct_values(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object subarraysWithKDistinctValues(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto subarraysWithKDistinctValues(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-031",
    "title": "Subarrays with At Most K Distinct",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "54.2%",
    "submissions": "12.6K",
    "description": "Count subarrays containing at most k distinct values.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction subarraysWithAtMostKDistinct(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def subarrays_with_at_most_k_distinct(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object subarraysWithAtMostKDistinct(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto subarraysWithAtMostKDistinct(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-032",
    "title": "Distinct Values After Updates",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "46.8%",
    "submissions": "24.7K",
    "description": "Process point updates and report distinct count after each update.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction distinctValuesAfterUpdates(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def distinct_values_after_updates(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object distinctValuesAfterUpdates(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto distinctValuesAfterUpdates(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-033",
    "title": "First Missing Positive via Set",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "57.6%",
    "submissions": "10.1K",
    "description": "Find the smallest positive integer absent from an unsorted list.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction firstMissingPositiveViaSet(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def first_missing_positive_via_set(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object firstMissingPositiveViaSet(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto firstMissingPositiveViaSet(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-034",
    "title": "Longest Duplicate-Free Segment",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "45.9%",
    "submissions": "19.7K",
    "description": "Return length and boundaries of the longest segment with no repeated values.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestDuplicateFreeSegment(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_duplicate_free_segment(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestDuplicateFreeSegment(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestDuplicateFreeSegment(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-035",
    "title": "Equal Frequency Prefix",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "46.7%",
    "submissions": "19.5K",
    "description": "Find the longest prefix that can become uniform-frequency by deleting one item.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction equalFrequencyPrefix(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def equal_frequency_prefix(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object equalFrequencyPrefix(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto equalFrequencyPrefix(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-036",
    "title": "Subarray Divisible by M",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "54.6%",
    "submissions": "16.1K",
    "description": "Count subarrays whose sum is divisible by m using remainder frequencies.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction subarrayDivisibleByM(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def subarray_divisible_by_m(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object subarrayDivisibleByM(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto subarrayDivisibleByM(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-037",
    "title": "Longest Divisible Segment",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "52.3%",
    "submissions": "15.6K",
    "description": "Find the longest subarray whose sum is divisible by m.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestDivisibleSegment(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_divisible_segment(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestDivisibleSegment(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestDivisibleSegment(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-038",
    "title": "Count Equal 0-1-2 Segments",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "49.0%",
    "submissions": "14.3K",
    "description": "Count subarrays where 0, 1, and 2 appear equally often via paired prefix states.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countEqual012Segments(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_equal012_segments(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countEqual012Segments(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countEqual012Segments(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-039",
    "title": "Rectangle Sum Signature",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Matrix"
    ],
    "acceptance": "49.7%",
    "submissions": "23.1K",
    "description": "Count pairs of rows whose compressed column sums produce a target submatrix sum.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction rectangleSumSignature(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def rectangle_sum_signature(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object rectangleSumSignature(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto rectangleSumSignature(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-040",
    "title": "Matrix Row Equivalence",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Matrix"
    ],
    "acceptance": "57.2%",
    "submissions": "24.3K",
    "description": "Count groups of rows that are identical after normalizing a specified value mapping.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction matrixRowEquivalence(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def matrix_row_equivalence(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object matrixRowEquivalence(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto matrixRowEquivalence(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-041",
    "title": "Column Pattern Frequency",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Matrix"
    ],
    "acceptance": "55.6%",
    "submissions": "18.4K",
    "description": "Return the most frequent column pattern in a binary matrix with tie-breaking.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction columnPatternFrequency(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def column_pattern_frequency(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object columnPatternFrequency(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto columnPatternFrequency(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-042",
    "title": "Repeated DNA-like Codes",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "String"
    ],
    "acceptance": "54.6%",
    "submissions": "8.4K",
    "description": "Find length-L substrings that appear at least twice using encoded or hashed keys.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction repeatedDNALikeCodes(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def repeated_d_n_a_like_codes(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object repeatedDNALikeCodes(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto repeatedDNALikeCodes(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-043",
    "title": "Longest Prefix with Equal Counts",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "47.4%",
    "submissions": "20.5K",
    "description": "Find the longest prefix where each present category has equal frequency.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestPrefixWithEqualCounts(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_prefix_with_equal_counts(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestPrefixWithEqualCounts(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestPrefixWithEqualCounts(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-044",
    "title": "Count Pairs with Same Remainder",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "49.6%",
    "submissions": "24.1K",
    "description": "Count pairs whose values have the same remainder modulo m.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countPairsWithSameRemainder(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_pairs_with_same_remainder(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countPairsWithSameRemainder(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countPairsWithSameRemainder(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-045",
    "title": "Frequency-Constrained Selection",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "47.7%",
    "submissions": "25.6K",
    "description": "Select values occurring at least f times, ordered by frequency then value.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction frequencyConstrainedSelection(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def frequency_constrained_selection(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object frequencyConstrainedSelection(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto frequencyConstrainedSelection(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-046",
    "title": "Unique Intersection Across Many Lists",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "50.6%",
    "submissions": "26.1K",
    "description": "Return values appearing in every list without repeated output.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction uniqueIntersectionAcrossManyLists(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def unique_intersection_across_many_lists(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object uniqueIntersectionAcrossManyLists(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto uniqueIntersectionAcrossManyLists(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-047",
    "title": "Symmetric Difference Multiplicity",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "55.7%",
    "submissions": "17.7K",
    "description": "Return values and absolute frequency differences for two multisets.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction symmetricDifferenceMultiplicity(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def symmetric_difference_multiplicity(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object symmetricDifferenceMultiplicity(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto symmetricDifferenceMultiplicity(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-048",
    "title": "Two Sum with Lexicographic Witness",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Graph"
    ],
    "acceptance": "53.3%",
    "submissions": "17.3K",
    "description": "Return the lexicographically smallest valid index pair for a target sum.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction twoSumWithLexicographicWitness(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def two_sum_with_lexicographic_witness(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object twoSumWithLexicographicWitness(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto twoSumWithLexicographicWitness(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-049",
    "title": "Count Pairs of Equal Products",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "49.7%",
    "submissions": "17.2K",
    "description": "Count distinct unordered pairs of pairs whose products match.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countPairsOfEqualProducts(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_pairs_of_equal_products(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countPairsOfEqualProducts(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countPairsOfEqualProducts(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-050",
    "title": "Subarray XOR Target Count",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Array",
      "Bit Manipulation"
    ],
    "acceptance": "56.0%",
    "submissions": "16.3K",
    "description": "Count subarrays with XOR equal to target using prefix XOR hashing.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction subarrayXORTargetCount(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def subarray_x_o_r_target_count(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object subarrayXORTargetCount(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto subarrayXORTargetCount(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-051",
    "title": "Longest XOR-Zero Segment",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Bit Manipulation"
    ],
    "acceptance": "52.8%",
    "submissions": "22.4K",
    "description": "Find the longest contiguous segment whose XOR is zero.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestXORZeroSegment(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_x_o_r_zero_segment(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestXORZeroSegment(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestXORZeroSegment(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-052",
    "title": "Prefix State Collision Count",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "49.0%",
    "submissions": "14.5K",
    "description": "Count repeated prefix states under a custom cumulative transformation.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction prefixStateCollisionCount(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def prefix_state_collision_count(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object prefixStateCollisionCount(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto prefixStateCollisionCount(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-053",
    "title": "Distinct Substrings by Hash Key",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "String"
    ],
    "acceptance": "45.7%",
    "submissions": "23.0K",
    "description": "Count distinct substrings of fixed length using rolling hash keys.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction distinctSubstringsByHashKey(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def distinct_substrings_by_hash_key(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object distinctSubstringsByHashKey(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto distinctSubstringsByHashKey(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-054",
    "title": "Near-Identical Records",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "44.2%",
    "submissions": "18.3K",
    "description": "Group records whose normalized field signatures match.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction nearIdenticalRecords(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def near_identical_records(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object nearIdenticalRecords(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto nearIdenticalRecords(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-055",
    "title": "Top K Frequent with Stable Ties",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Heap"
    ],
    "acceptance": "53.5%",
    "submissions": "23.3K",
    "description": "Return the top k values by frequency, then first-seen position.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction topKFrequentWithStableTies(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def top_k_frequent_with_stable_ties(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object topKFrequentWithStableTies(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto topKFrequentWithStableTies(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-056",
    "title": "Sliding Window Anagram Match",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Sliding Window"
    ],
    "acceptance": "46.8%",
    "submissions": "16.3K",
    "description": "Return start indices where a window matches a target multiset.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction slidingWindowAnagramMatch(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def sliding_window_anagram_match(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object slidingWindowAnagramMatch(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto slidingWindowAnagramMatch(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-057",
    "title": "Count Subarrays with Equal Odd-Even",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "50.8%",
    "submissions": "24.6K",
    "description": "Count segments with equal odd and even counts using prefix-state hashing.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countSubarraysWithEqualOddEven(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_subarrays_with_equal_odd_even(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countSubarraysWithEqualOddEven(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countSubarraysWithEqualOddEven(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-058",
    "title": "Longest Same-Sum Across Two Arrays",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Array",
      "Prefix Sum"
    ],
    "acceptance": "44.9%",
    "submissions": "15.0K",
    "description": "Find the longest aligned span where two arrays have equal cumulative sums.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestSameSumAcrossTwoArrays(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_same_sum_across_two_arrays(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestSameSumAcrossTwoArrays(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestSameSumAcrossTwoArrays(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-059",
    "title": "Matrix Equal Row-Column Pairs",
    "difficulty": "Medium",
    "topics": [
      "Hash Table",
      "Matrix"
    ],
    "acceptance": "45.6%",
    "submissions": "24.4K",
    "description": "Count row-column pairs with identical sequences using tuple keys.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction matrixEqualRowColumnPairs(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def matrix_equal_row_column_pairs(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object matrixEqualRowColumnPairs(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto matrixEqualRowColumnPairs(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-060",
    "title": "Distinct Paths Signature Count",
    "difficulty": "Medium",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "56.8%",
    "submissions": "18.7K",
    "description": "Count unique path signatures generated from repeated step labels.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction distinctPathsSignatureCount(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def distinct_paths_signature_count(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object distinctPathsSignatureCount(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto distinctPathsSignatureCount(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-061",
    "title": "Subarray Sum in Multiple Ranges",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array",
      "Prefix Sum"
    ],
    "acceptance": "39.7%",
    "submissions": "12.0K",
    "description": "Answer many range queries for subarrays with a target sum using indexed prefix-frequency structures.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction subarraySumInMultipleRanges(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def subarray_sum_in_multiple_ranges(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object subarraySumInMultipleRanges(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto subarraySumInMultipleRanges(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-062",
    "title": "Dynamic Pair Sum Queries",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Dynamic Programming"
    ],
    "acceptance": "29.7%",
    "submissions": "8.8K",
    "description": "Support insertions, removals, and pair-sum count queries with frequency maps.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction dynamicPairSumQueries(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def dynamic_pair_sum_queries(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object dynamicPairSumQueries(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto dynamicPairSumQueries(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-063",
    "title": "Online Distinct Count with Undo",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "31.2%",
    "submissions": "11.5K",
    "description": "Process add/remove operations, report distinct count, and support rollback snapshots.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction onlineDistinctCountWithUndo(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def online_distinct_count_with_undo(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object onlineDistinctCountWithUndo(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto onlineDistinctCountWithUndo(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-064",
    "title": "Longest Subarray with Frequency Cap",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "35.8%",
    "submissions": "9.6K",
    "description": "Find the longest segment where no value occurs more than c times.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestSubarrayWithFrequencyCap(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_subarray_with_frequency_cap(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestSubarrayWithFrequencyCap(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestSubarrayWithFrequencyCap(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-065",
    "title": "Minimum Window Covering Multiset",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "37.6%",
    "submissions": "3.0K",
    "description": "Find the shortest segment covering a required multiset; tie-break by earliest start.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction minimumWindowCoveringMultiset(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def minimum_window_covering_multiset(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object minimumWindowCoveringMultiset(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto minimumWindowCoveringMultiset(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-066",
    "title": "Count Subarrays with Exactly Two Odd Frequencies",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "37.5%",
    "submissions": "14.5K",
    "description": "Count segments whose frequency map has exactly two odd-count keys.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countSubarraysWithExactlyTwoOddFrequencies(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_subarrays_with_exactly_two_odd_frequencies(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countSubarraysWithExactlyTwoOddFrequencies(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countSubarraysWithExactlyTwoOddFrequencies(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-067",
    "title": "Three Prefix States Collision",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "37.4%",
    "submissions": "13.7K",
    "description": "Count subarrays satisfying equality among three transformed prefix counters.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction threePrefixStatesCollision(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def three_prefix_states_collision(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object threePrefixStatesCollision(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto threePrefixStatesCollision(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-068",
    "title": "Largest Submatrix with Target Sum",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Matrix"
    ],
    "acceptance": "32.0%",
    "submissions": "7.1K",
    "description": "Find maximum-area submatrix whose sum equals target using row-pair compression and hashing.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction largestSubmatrixWithTargetSum(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def largest_submatrix_with_target_sum(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object largestSubmatrixWithTargetSum(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto largestSubmatrixWithTargetSum(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-069",
    "title": "Submatrix Sum Frequency Map",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Matrix"
    ],
    "acceptance": "32.8%",
    "submissions": "3.6K",
    "description": "Build a map of all submatrix sums and return requested frequency statistics.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction submatrixSumFrequencyMap(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def submatrix_sum_frequency_map(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object submatrixSumFrequencyMap(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto submatrixSumFrequencyMap(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-070",
    "title": "Dynamic Matrix Pattern Queries",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Dynamic Programming",
      "Matrix"
    ],
    "acceptance": "37.4%",
    "submissions": "13.4K",
    "description": "Handle cell changes and queries for repeated row/column patterns.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction dynamicMatrixPatternQueries(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def dynamic_matrix_pattern_queries(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object dynamicMatrixPatternQueries(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto dynamicMatrixPatternQueries(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-071",
    "title": "Longest Arithmetic Segment after Reordering",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "36.5%",
    "submissions": "4.7K",
    "description": "Find maximum length subset forming an arithmetic progression using value-to-index hashing.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestArithmeticSegmentAfterReordering(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_arithmetic_segment_after_reordering(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestArithmeticSegmentAfterReordering(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestArithmeticSegmentAfterReordering(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-072",
    "title": "Count Distinct Subarrays under Value Bound",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "39.0%",
    "submissions": "5.8K",
    "description": "Count distinct subarrays whose product or value condition is bounded using normalized signatures.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countDistinctSubarraysUnderValueBound(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_distinct_subarrays_under_value_bound(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countDistinctSubarraysUnderValueBound(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countDistinctSubarraysUnderValueBound(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-073",
    "title": "Subarray Sum Closest to Target",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array",
      "Prefix Sum"
    ],
    "acceptance": "32.0%",
    "submissions": "7.4K",
    "description": "Find subarray sum closest to target with tie-breaking on length then indices.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction subarraySumClosestToTarget(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def subarray_sum_closest_to_target(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object subarraySumClosestToTarget(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto subarraySumClosestToTarget(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-074",
    "title": "Maximum Subarray Frequency Score",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "29.3%",
    "submissions": "4.1K",
    "description": "Choose a segment maximizing a score based on value frequencies and weighted costs.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction maximumSubarrayFrequencyScore(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def maximum_subarray_frequency_score(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object maximumSubarrayFrequencyScore(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto maximumSubarrayFrequencyScore(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-075",
    "title": "Count Pairs of Subarrays with Equal Sum",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "37.1%",
    "submissions": "10.7K",
    "description": "Count pairs of non-overlapping subarrays that share a specified sum.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countPairsOfSubarraysWithEqualSum(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_pairs_of_subarrays_with_equal_sum(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countPairsOfSubarraysWithEqualSum(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countPairsOfSubarraysWithEqualSum(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-076",
    "title": "Hash-Based Range Merge",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Greedy"
    ],
    "acceptance": "28.7%",
    "submissions": "10.7K",
    "description": "Merge intervals represented by endpoint records while tracking endpoint multiplicities and duplicate IDs.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction hashBasedRangeMerge(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def hash_based_range_merge(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object hashBasedRangeMerge(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto hashBasedRangeMerge(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-077",
    "title": "Streaming Heavy Hitters",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "30.7%",
    "submissions": "6.3K",
    "description": "Approximate or exact top frequent items in a stream under a memory budget.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction streamingHeavyHitters(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def streaming_heavy_hitters(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object streamingHeavyHitters(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto streamingHeavyHitters(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-078",
    "title": "Sliding Window Median by Frequency Map",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Sliding Window"
    ],
    "acceptance": "28.9%",
    "submissions": "12.3K",
    "description": "Maintain median in a sliding window using counted ordered values; hashing tracks removals.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction slidingWindowMedianByFrequencyMap(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def sliding_window_median_by_frequency_map(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object slidingWindowMedianByFrequencyMap(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto slidingWindowMedianByFrequencyMap(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-079",
    "title": "Longest Segment with K Frequency Classes",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "35.9%",
    "submissions": "10.1K",
    "description": "Find longest segment whose distinct values have exactly k different frequency counts.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestSegmentWithKFrequencyClasses(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_segment_with_k_frequency_classes(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestSegmentWithKFrequencyClasses(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestSegmentWithKFrequencyClasses(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-080",
    "title": "Count Subarrays with Frequency Signature",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "39.0%",
    "submissions": "5.5K",
    "description": "Count subarrays whose frequency vector matches a target signature.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countSubarraysWithFrequencySignature(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_subarrays_with_frequency_signature(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countSubarraysWithFrequencySignature(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countSubarraysWithFrequencySignature(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-081",
    "title": "Distinct Palindrome Substrings by Hash",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "String"
    ],
    "acceptance": "39.8%",
    "submissions": "13.1K",
    "description": "Count unique palindromic substrings using paired rolling hashes and collision verification.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction distinctPalindromeSubstringsByHash(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def distinct_palindrome_substrings_by_hash(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object distinctPalindromeSubstringsByHash(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto distinctPalindromeSubstringsByHash(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-082",
    "title": "Pattern Match with Wildcard Hash Blocks",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "37.0%",
    "submissions": "9.0K",
    "description": "Match a pattern with wildcard blocks by combining hashed fixed fragments.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction patternMatchWithWildcardHashBlocks(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def pattern_match_with_wildcard_hash_blocks(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object patternMatchWithWildcardHashBlocks(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto patternMatchWithWildcardHashBlocks(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-083",
    "title": "Duplicate Documents under Normalization",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "31.6%",
    "submissions": "3.0K",
    "description": "Detect duplicate documents after token normalization and order-independent hashing.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction duplicateDocumentsUnderNormalization(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def duplicate_documents_under_normalization(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object duplicateDocumentsUnderNormalization(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto duplicateDocumentsUnderNormalization(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-084",
    "title": "Near Duplicate Numeric Vectors",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "39.5%",
    "submissions": "10.4K",
    "description": "Group vectors whose sparse coordinate-frequency signatures match under tolerance rules.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction nearDuplicateNumericVectors(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def near_duplicate_numeric_vectors(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object nearDuplicateNumericVectors(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto nearDuplicateNumericVectors(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-085",
    "title": "Hash Join Three Streams",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "34.5%",
    "submissions": "8.8K",
    "description": "Join three key-value streams and report records satisfying key and timestamp constraints.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction hashJoinThreeStreams(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def hash_join_three_streams(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object hashJoinThreeStreams(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto hashJoinThreeStreams(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-086",
    "title": "Dynamic Multiset Rank Queries",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Dynamic Programming"
    ],
    "acceptance": "34.3%",
    "submissions": "6.0K",
    "description": "Support insertion/deletion and queries for kth value plus frequency using indexed counts.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction dynamicMultisetRankQueries(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def dynamic_multiset_rank_queries(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object dynamicMultisetRankQueries(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto dynamicMultisetRankQueries(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-087",
    "title": "Count Quadruples with Equal Sum",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "37.6%",
    "submissions": "3.6K",
    "description": "Count quadruples from four arrays whose combined sum equals target.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countQuadruplesWithEqualSum(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_quadruples_with_equal_sum(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countQuadruplesWithEqualSum(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countQuadruplesWithEqualSum(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-088",
    "title": "Count Quadruples with Equal XOR",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Bit Manipulation"
    ],
    "acceptance": "39.9%",
    "submissions": "14.5K",
    "description": "Count index quadruples whose XOR equals target using pair-XOR frequencies.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countQuadruplesWithEqualXOR(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_quadruples_with_equal_x_o_r(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countQuadruplesWithEqualXOR(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countQuadruplesWithEqualXOR(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-089",
    "title": "Longest Subarray with Repeated Prefix Signature",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "36.3%",
    "submissions": "14.8K",
    "description": "Find longest segment where a multi-dimensional prefix signature repeats.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestSubarrayWithRepeatedPrefixSignature(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_subarray_with_repeated_prefix_signature(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestSubarrayWithRepeatedPrefixSignature(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestSubarrayWithRepeatedPrefixSignature(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-090",
    "title": "Subarray Remainder Vector Queries",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Array"
    ],
    "acceptance": "35.5%",
    "submissions": "6.0K",
    "description": "Answer queries counting subarrays with specified remainder signatures.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction subarrayRemainderVectorQueries(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def subarray_remainder_vector_queries(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object subarrayRemainderVectorQueries(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto subarrayRemainderVectorQueries(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-091",
    "title": "Dynamic Distinct Values in Subranges",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Dynamic Programming"
    ],
    "acceptance": "35.1%",
    "submissions": "14.8K",
    "description": "Support point updates and distinct-count range queries using block decomposition and frequency maps.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction dynamicDistinctValuesInSubranges(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def dynamic_distinct_values_in_subranges(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object dynamicDistinctValuesInSubranges(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto dynamicDistinctValuesInSubranges(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-092",
    "title": "Offline Range Frequency Queries",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "32.0%",
    "submissions": "7.1K",
    "description": "Answer range queries for the frequency of requested values using occurrence indexes.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction offlineRangeFrequencyQueries(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def offline_range_frequency_queries(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object offlineRangeFrequencyQueries(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto offlineRangeFrequencyQueries(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-093",
    "title": "Count Substrings with At Most D Distinct",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "String"
    ],
    "acceptance": "34.4%",
    "submissions": "7.7K",
    "description": "Count all substrings satisfying a distinct-character bound with frequency tracking.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction countSubstringsWithAtMostDDistinct(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_substrings_with_at_most_d_distinct(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countSubstringsWithAtMostDDistinct(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countSubstringsWithAtMostDDistinct(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-094",
    "title": "Longest Substring with Frequency Constraints",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "String"
    ],
    "acceptance": "38.3%",
    "submissions": "10.1K",
    "description": "Find the longest substring where every present character count lies within given bounds.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction longestSubstringWithFrequencyConstraints(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_substring_with_frequency_constraints(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestSubstringWithFrequencyConstraints(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestSubstringWithFrequencyConstraints(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-095",
    "title": "Multi-Pattern Anagram Search",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "32.2%",
    "submissions": "9.0K",
    "description": "Find occurrences of several target signatures in one text with shared frequency-state processing.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction multiPatternAnagramSearch(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def multi_pattern_anagram_search(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object multiPatternAnagramSearch(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto multiPatternAnagramSearch(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-096",
    "title": "Hash Collision Audit",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "39.3%",
    "submissions": "8.2K",
    "description": "Given hash buckets and keys, identify collisions and compute the largest bucket with deterministic ordering.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction hashCollisionAudit(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def hash_collision_audit(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object hashCollisionAudit(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto hashCollisionAudit(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-097",
    "title": "Canonical Graph Neighborhoods",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Graph"
    ],
    "acceptance": "29.6%",
    "submissions": "7.7K",
    "description": "Group vertices whose sorted neighbor-label signatures match, ignoring vertex IDs.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction canonicalGraphNeighborhoods(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def canonical_graph_neighborhoods(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object canonicalGraphNeighborhoods(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto canonicalGraphNeighborhoods(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-098",
    "title": "Repeated Subtree Signature Counter",
    "difficulty": "Hard",
    "topics": [
      "Hash Table",
      "Tree"
    ],
    "acceptance": "30.0%",
    "submissions": "11.8K",
    "description": "Count duplicate rooted subtree signatures from structured node records.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction repeatedSubtreeSignatureCounter(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def repeated_subtree_signature_counter(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object repeatedSubtreeSignatureCounter(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto repeatedSubtreeSignatureCounter(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-099",
    "title": "Versioned Key Frequency Store",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "39.4%",
    "submissions": "9.0K",
    "description": "Implement a key-frequency store supporting version snapshots and historical queries.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction versionedKeyFrequencyStore(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def versioned_key_frequency_store(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object versionedKeyFrequencyStore(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto versionedKeyFrequencyStore(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "hash-100",
    "title": "Bounded Cache with Frequency Eviction",
    "difficulty": "Hard",
    "topics": [
      "Hash Table"
    ],
    "acceptance": "38.6%",
    "submissions": "13.7K",
    "description": "Design a cache that evicts by frequency, then recency, with O(1) average operations.\n\n### Input Format\n- `data`: Problem-specific collection or stream described in the statement\n- `parameters`: Any target, threshold, range, or operation list required by the task\n\n### Output Format\nReturn the requested value, indices, grouping, or query results as defined by the problem statement.\n\n### Expected Time Complexity\n`Target complexity depends on the required hash operations; average O(1) lookup is assumed unless otherwise stated.`\n\n### Expected Space Complexity\n`O(number of distinct keys or stored states), unless the problem permits streaming reduction.`",
    "examples": [
      {
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "output": "4",
        "explanation": "Processed according to the specified hashing rules."
      }
    ],
    "constraints": [
      "Input size is within the stated limits.",
      "Keys and values use the specified integer/string domain.",
      "Return results in the required deterministic order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} data\n * @param {any} parameters\n * @return {result}\n */\nfunction boundedCacheWithFrequencyEviction(data, parameters) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def bounded_cache_with_frequency_eviction(data: Any, parameters: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object boundedCacheWithFrequencyEviction(Object data, Object parameters) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto boundedCacheWithFrequencyEviction(auto data, auto parameters) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "data = [1, 2, 2, 3, 1, 4]",
        "expected": "4",
        "isHidden": false
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "str-001",
    "title": "Count Vowels in a Selected Range",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "71.0%",
    "submissions": "45.5K",
    "description": "Given text and two indices start and end, count the English vowels (a, e, i, o, u) in the half-open range text[start:end], ignoring letter case. Other characters do not count.\n\n### Input Format\n- `text`: string\n- `start`: inclusive integer index\n- `end`: exclusive integer index\n\n### Output Format\nAn integer vowel count.\n\n### Expected Time Complexity\n`O(end-start)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"Notebook\", start = 1, end = 6",
        "output": "3",
        "explanation": "The selected characters are o, t, e, b, o."
      },
      {
        "input": "text = \"AEIOUxyz\", start = 0, end = 5",
        "output": "5",
        "explanation": "All five selected characters are vowels."
      }
    ],
    "constraints": [
      "0 <= start <= end <= len(text)",
      "text contains at most 100000 ASCII characters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} start\n * @param {int} end\n * @return {int}\n */\nfunction countVowelsInRange(text, start, end) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_vowels_in_range(text: str, start: int, end: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countVowelsInRange(String text, int start, int end) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countVowelsInRange(string text, int start, int end) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"Notebook\", start = 1, end = 6",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"AEIOUxyz\", start = 0, end = 5",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", start = 0, end = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"education\", start = 3, end = 3",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"rhythm\", start = 0, end = 6",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"bOoK\", start = 0, end = 4",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"area\", start = 0, end = 3",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-002",
    "title": "Describe the Longest Character Run",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "70.0%",
    "submissions": "20.4K",
    "description": "Find the longest contiguous run of one repeated character. Return its character, length, and starting index. If several runs have the same maximum length, return the leftmost one. For an empty string return null.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn object {\"character\": string, \"length\": integer, \"start_index\": integer}, or null.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"baaaaccdd\"",
        "output": "{\"character\":\"a\",\"length\":4,\"start_index\":1}",
        "explanation": "The four a characters form the longest run."
      },
      {
        "input": "text = \"aabbcc\"",
        "output": "{\"character\":\"a\",\"length\":2,\"start_index\":0}",
        "explanation": "All runs tie, so the leftmost run is returned."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "text may contain any visible ASCII character"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {object|null}\n */\nfunction longestRun(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_run(text: str) -> dict:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestRun(String text) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestRun(string text) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"baaaaccdd\"",
        "expected": "{\"character\":\"a\",\"length\":4,\"start_index\":1}",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aabbcc\"",
        "expected": "{\"character\":\"a\",\"length\":2,\"start_index\":0}",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"z\"",
        "expected": "{\"character\":\"z\",\"length\":1,\"start_index\":0}",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"wxyz\"",
        "expected": "{\"character\":\"w\",\"length\":1,\"start_index\":0}",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"mmmm\"",
        "expected": "{\"character\":\"m\",\"length\":4,\"start_index\":0}",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abccc\"",
        "expected": "{\"character\":\"c\",\"length\":3,\"start_index\":2}",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-003",
    "title": "Count Character Categories",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "64.7%",
    "submissions": "17.7K",
    "description": "Count uppercase ASCII letters, lowercase ASCII letters, decimal digits, whitespace characters, and all remaining characters in a string. Return all five counts.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn object with integer fields uppercase, lowercase, digits, whitespace, and other.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"Hi 7!\"",
        "output": "{\"uppercase\":1,\"lowercase\":1,\"digits\":1,\"whitespace\":1,\"other\":1}",
        "explanation": "Each character belongs to exactly one category."
      },
      {
        "input": "text = \"ABC09\"",
        "output": "{\"uppercase\":3,\"lowercase\":0,\"digits\":2,\"whitespace\":0,\"other\":0}",
        "explanation": "The input contains only uppercase letters and digits."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "ASCII classification is used"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {object}\n */\nfunction countCharacterCategories(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_character_categories(text: str) -> dict:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countCharacterCategories(String text) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countCharacterCategories(string text) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"Hi 7!\"",
        "expected": "{\"uppercase\":1,\"lowercase\":1,\"digits\":1,\"whitespace\":1,\"other\":1}",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"ABC09\"",
        "expected": "{\"uppercase\":3,\"lowercase\":0,\"digits\":2,\"whitespace\":0,\"other\":0}",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "{\"uppercase\":0,\"lowercase\":0,\"digits\":0,\"whitespace\":0,\"other\":0}",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \" \\t\\n\"",
        "expected": "{\"uppercase\":0,\"lowercase\":0,\"digits\":0,\"whitespace\":3,\"other\":0}",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"!?-_\"",
        "expected": "{\"uppercase\":0,\"lowercase\":0,\"digits\":0,\"whitespace\":0,\"other\":4}",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"Az0\"",
        "expected": "{\"uppercase\":1,\"lowercase\":1,\"digits\":1,\"whitespace\":0,\"other\":0}",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"$$$\"",
        "expected": "{\"uppercase\":0,\"lowercase\":0,\"digits\":0,\"whitespace\":0,\"other\":3}",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-004",
    "title": "Collapse a Chosen Separator",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "69.9%",
    "submissions": "39.7K",
    "description": "Given text and a one-character separator, replace every maximal consecutive run of that separator with a single separator. Leave all other characters and their order unchanged.\n\n### Input Format\n- `text`: string\n- `separator`: single-character string\n\n### Output Format\nThe transformed string.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"red---blue----green\", separator = \"-\"",
        "output": "red-blue-green",
        "explanation": "Each hyphen run is reduced to one hyphen."
      },
      {
        "input": "text = \"a,,b,c,,\", separator = \",\"",
        "output": "a,b,c,",
        "explanation": "Single commas remain and repeated commas collapse."
      }
    ],
    "constraints": [
      "separator has length exactly 1",
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string} separator\n * @return {string}\n */\nfunction collapseSeparator(text, separator) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def collapse_separator(text: str, separator: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String collapseSeparator(String text, String separator) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string collapseSeparator(string text, string separator) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"red---blue----green\", separator = \"-\"",
        "expected": "red-blue-green",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"a,,b,c,,\", separator = \",\"",
        "expected": "a,b,c,",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", separator = \",\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"hello\", separator = \"-\"",
        "expected": "hello",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"/////\", separator = \"/\"",
        "expected": "/",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"a/b/c\", separator = \"/\"",
        "expected": "a/b/c",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"--x---\", separator = \"-\"",
        "expected": "-x-",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-005",
    "title": "Find the First Character with a Target Frequency",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Hash Table"
    ],
    "acceptance": "68.6%",
    "submissions": "41.1K",
    "description": "Return the first character, scanning from left to right, whose total frequency in the entire string equals k. Return null when no character has that frequency.\n\n### Input Format\n- `text`: string\n- `k`: positive integer\n\n### Output Format\nA one-character string or null.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(u), where u is the number of distinct characters`",
    "examples": [
      {
        "input": "text = \"swiss\", k = 1",
        "output": "w",
        "explanation": "w is the first character whose total frequency is one."
      },
      {
        "input": "text = \"aabbccc\", k = 2",
        "output": "a",
        "explanation": "a and b have frequency two; a appears first."
      }
    ],
    "constraints": [
      "1 <= k <= 100000",
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {string|null}\n */\nfunction firstCharacterWithFrequency(text, k) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def first_character_with_frequency(text: str, k: int) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String firstCharacterWithFrequency(String text, int k) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string firstCharacterWithFrequency(string text, int k) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"swiss\", k = 1",
        "expected": "w",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aabbccc\", k = 2",
        "expected": "a",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 1",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", k = 4",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"zzzz\", k = 4",
        "expected": "z",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aabb\", k = 3",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"AaA\", k = 1",
        "expected": "a",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "str-006",
    "title": "Count Maximal Digit Groups",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "65.1%",
    "submissions": "46.1K",
    "description": "Count how many maximal contiguous groups of decimal digits appear in text. A digit group begins at a digit whose previous character is not a digit.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer number of digit groups.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"A12B003C9\"",
        "output": "3",
        "explanation": "The digit groups are 12, 003, and 9."
      },
      {
        "input": "text = \"2026\"",
        "output": "1",
        "explanation": "The entire string is one digit group."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "Digits are ASCII 0 through 9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction countDigitGroups(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_digit_groups(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countDigitGroups(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countDigitGroups(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"A12B003C9\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"2026\"",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abcXYZ\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"00700\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"a1b2c3\"",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"42abc8\"",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-007",
    "title": "Count Case-Change Boundaries",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "65.9%",
    "submissions": "34.3K",
    "description": "Count adjacent positions i and i+1 where both characters are ASCII letters and one is uppercase while the other is lowercase. Nonletters break a boundary.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer boundary count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"aBcD\"",
        "output": "3",
        "explanation": "Every adjacent pair changes case."
      },
      {
        "input": "text = \"Ab-BA\"",
        "output": "1",
        "explanation": "The hyphen prevents comparisons across it."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction countCaseChangeBoundaries(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_case_change_boundaries(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countCaseChangeBoundaries(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countCaseChangeBoundaries(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aBcD\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"Ab-BA\"",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"A\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abcDEF\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"a1B\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aAaA\"",
        "expected": "3",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-008",
    "title": "Check Alphabetical Order Ignoring Separators",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "77.3%",
    "submissions": "38.0K",
    "description": "Check whether the letters in text appear in nondecreasing alphabetical order when compared case-insensitively. Ignore all non-ASCII-letter characters. Return true for zero or one letter.\n\n### Input Format\n- `text`: string\n\n### Output Format\nA boolean.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"A-b c!\"",
        "output": "true",
        "explanation": "The letters a, b, c are in nondecreasing order."
      },
      {
        "input": "text = \"b-A-c\"",
        "output": "false",
        "explanation": "The sequence b, a, c decreases at the second letter."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "Only ASCII letters participate"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {bool}\n */\nfunction lettersAreOrdered(text) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def letters_are_ordered(text: str) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean lettersAreOrdered(String text) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool lettersAreOrdered(string text) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"A-b c!\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"b-A-c\"",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"Q\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"123-!? \"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"azY\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aAaB\"",
        "expected": "true",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-009",
    "title": "Flip the Case of ASCII Letters",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "71.6%",
    "submissions": "26.0K",
    "description": "Create a new string in which each ASCII uppercase letter becomes lowercase and each ASCII lowercase letter becomes uppercase. Leave digits, punctuation, and whitespace unchanged.\n\n### Input Format\n- `text`: string\n\n### Output Format\nThe transformed string.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"Hello, World 42!\"",
        "output": "hELLO, wORLD 42!",
        "explanation": "Only ASCII letters change case."
      },
      {
        "input": "text = \"aZ09\"",
        "output": "Az09",
        "explanation": "Digits are preserved."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {string}\n */\nfunction flipAsciiCase(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def flip_ascii_case(text: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String flipAsciiCase(String text) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string flipAsciiCase(string text) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"Hello, World 42!\"",
        "expected": "hELLO, wORLD 42!",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aZ09\"",
        "expected": "Az09",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"ABC\"",
        "expected": "abc",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"xyz\"",
        "expected": "XYZ",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"123!? \"",
        "expected": "123!? ",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"Aa-Bb_Cc\"",
        "expected": "aA-bB_cC",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-010",
    "title": "Rotate Letters While Preserving Layout",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Math"
    ],
    "acceptance": "63.3%",
    "submissions": "43.4K",
    "description": "Shift each ASCII letter forward by shift positions in the alphabet, wrapping after z or Z. Preserve case and leave every nonletter unchanged. Negative shifts are allowed.\n\n### Input Format\n- `text`: string\n- `shift`: integer shift, possibly negative\n\n### Output Format\nThe transformed string.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"Ab-z!\", shift = 2",
        "output": "Cd-b!",
        "explanation": "Letters wrap within their original case."
      },
      {
        "input": "text = \"Zoo 9\", shift = -1",
        "output": "Ynn 9",
        "explanation": "A negative shift moves letters backward."
      }
    ],
    "constraints": [
      "-1000000 <= shift <= 1000000",
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} shift\n * @return {string}\n */\nfunction rotateLetters(text, shift) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def rotate_letters(text: str, shift: int) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String rotateLetters(String text, int shift) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string rotateLetters(string text, int shift) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"Ab-z!\", shift = 2",
        "expected": "Cd-b!",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"Zoo 9\", shift = -1",
        "expected": "Ynn 9",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", shift = 5",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"Mix-42\", shift = 0",
        "expected": "Mix-42",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"Az\", shift = 26",
        "expected": "Az",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"a\", shift = -27",
        "expected": "z",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"!? 123\", shift = 99",
        "expected": "!? 123",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-011",
    "title": "Measure the Longest Whitespace-Delimited Token",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "71.3%",
    "submissions": "48.7K",
    "description": "Split text into tokens using one or more whitespace characters. Return the maximum token length, or zero when there are no tokens.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer maximum token length.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"  code   builds tools \"",
        "output": "6",
        "explanation": "The longest token is builds, with length five."
      },
      {
        "input": "text = \"one two three\"",
        "output": "5",
        "explanation": "The token three has length five."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction longestTokenLength(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_token_length(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestTokenLength(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestTokenLength(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"  code   builds tools \"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"one two three\"",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \" \\t\\n \"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"algorithm\"",
        "expected": "9",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"cat dog pig\"",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"  hi  \"",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-012",
    "title": "Count Words Starting with a Letter",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "77.6%",
    "submissions": "26.1K",
    "description": "Count whitespace-delimited words whose first character is the requested ASCII letter, ignoring case. Words beginning with punctuation or digits do not match.\n\n### Input Format\n- `text`: string\n- `letter`: one ASCII letter\n\n### Output Format\nAn integer count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"River road, red roof\", letter = \"r\"",
        "output": "4",
        "explanation": "River, road, and red start with r; roof is also r, so the count is four."
      },
      {
        "input": "text = \"Apple apricot 8pear _avocado\", letter = \"a\"",
        "output": "2",
        "explanation": "Only Apple and apricot begin with the requested letter."
      }
    ],
    "constraints": [
      "letter has length 1 and is an ASCII letter",
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string} letter\n * @return {int}\n */\nfunction countWordsStartingWith(text, letter) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_words_starting_with(text: str, letter: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countWordsStartingWith(String text, String letter) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countWordsStartingWith(string text, string letter) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"River road, red roof\", letter = \"r\"",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"Apple apricot 8pear _avocado\", letter = \"a\"",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", letter = \"a\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"blue green violet\", letter = \"r\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"Sun sea SKY\", letter = \"s\"",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"!sun ?sea sun\", letter = \"s\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"A an ant\", letter = \"a\"",
        "expected": "3",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-013",
    "title": "Mask the Middle of an Identifier",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "66.9%",
    "submissions": "29.6K",
    "description": "Replace every character except the first and last with an asterisk. Strings of length zero, one, or two remain unchanged.\n\n### Input Format\n- `identifier`: string\n\n### Output Format\nThe masked string.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "identifier = \"account42\"",
        "output": "a*******2",
        "explanation": "The first and last characters are retained."
      },
      {
        "input": "identifier = \"xy\"",
        "output": "xy",
        "explanation": "A two-character identifier has no middle characters."
      }
    ],
    "constraints": [
      "0 <= len(identifier) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} identifier\n * @return {string}\n */\nfunction maskIdentifier(identifier) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def mask_identifier(identifier: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String maskIdentifier(String identifier) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string maskIdentifier(string identifier) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "identifier = \"account42\"",
        "expected": "a*******2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "identifier = \"xy\"",
        "expected": "xy",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "identifier = \"\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "identifier = \"Q\"",
        "expected": "Q",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "identifier = \"ab\"",
        "expected": "ab",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "identifier = \"cat\"",
        "expected": "c*t",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "identifier = \"aaaaa\"",
        "expected": "a***a",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-014",
    "title": "Sum Individual Digit Values",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "76.4%",
    "submissions": "39.0K",
    "description": "Add the numeric value of every decimal digit character in text. Adjacent digits are added separately rather than interpreted as a multi-digit number.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer digit sum.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"a12b4\"",
        "output": "7",
        "explanation": "The digits contribute 1 + 2 + 4."
      },
      {
        "input": "text = \"Room 305\"",
        "output": "8",
        "explanation": "The digits contribute 3 + 0 + 5."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "The maximum possible sum fits a signed 64-bit integer"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction sumDigitCharacters(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def sum_digit_characters(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int sumDigitCharacters(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int sumDigitCharacters(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"a12b4\"",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"Room 305\"",
        "expected": "8",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"letters\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"0000\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"999\"",
        "expected": "27",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"1-a-2\"",
        "expected": "3",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-015",
    "title": "Count Non-Overlapping Pattern Matches",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "66.5%",
    "submissions": "30.2K",
    "description": "Count occurrences of pattern in text from left to right, requiring matches not to overlap. After a match, resume scanning immediately after its final character. An empty pattern has count zero.\n\n### Input Format\n- `text`: string\n- `pattern`: string\n\n### Output Format\nAn integer occurrence count.\n\n### Expected Time Complexity\n`O(n*m) worst case with direct comparison`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"aaaaa\", pattern = \"aa\"",
        "output": "2",
        "explanation": "Matches use positions 0–1 and 2–3; the final a is unused."
      },
      {
        "input": "text = \"one fish two fish\", pattern = \"fish\"",
        "output": "2",
        "explanation": "The word fish occurs twice without overlap."
      }
    ],
    "constraints": [
      "0 <= len(text), len(pattern) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string} pattern\n * @return {int}\n */\nfunction countNonOverlapping(text, pattern) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_non_overlapping(text: str, pattern: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countNonOverlapping(String text, String pattern) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countNonOverlapping(string text, string pattern) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aaaaa\", pattern = \"aa\"",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"one fish two fish\", pattern = \"fish\"",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", pattern = \"a\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", pattern = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"ab\", pattern = \"abcd\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"match\", pattern = \"match\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaaa\", pattern = \"aaa\"",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-016",
    "title": "Remove a Supplied Set of Characters",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "72.7%",
    "submissions": "22.8K",
    "description": "Given text and a string remove_chars, return text with every character appearing in remove_chars deleted. Matching is case-sensitive and the remaining order is preserved.\n\n### Input Format\n- `text`: string\n- `remove_chars`: string containing characters to delete\n\n### Output Format\nThe filtered string.\n\n### Expected Time Complexity\n`O(n+m)`\n\n### Expected Space Complexity\n`O(u+n)`",
    "examples": [
      {
        "input": "text = \"balloon\", remove_chars = \"lo\"",
        "output": "ban",
        "explanation": "Every l and o is removed."
      },
      {
        "input": "text = \"AaBbAa\", remove_chars = \"A\"",
        "output": "aBba",
        "explanation": "Only uppercase A characters are removed."
      }
    ],
    "constraints": [
      "0 <= len(text), len(remove_chars) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string} remove_chars\n * @return {string}\n */\nfunction removeListedCharacters(text, remove_chars) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def remove_listed_characters(text: str, remove_chars: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String removeListedCharacters(String text, String remove_chars) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string removeListedCharacters(string text, string remove_chars) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"balloon\", remove_chars = \"lo\"",
        "expected": "ban",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"AaBbAa\", remove_chars = \"A\"",
        "expected": "aBba",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", remove_chars = \"x\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"keep me\", remove_chars = \"\"",
        "expected": "keep me",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"aaaa\", remove_chars = \"a\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"AaAa\", remove_chars = \"a\"",
        "expected": "AA",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"banana\", remove_chars = \"nnn\"",
        "expected": "baaa",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-017",
    "title": "Count Letter–Digit Category Switches",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "63.7%",
    "submissions": "17.0K",
    "description": "Count adjacent pairs where one character is an ASCII letter and the other is an ASCII digit. Punctuation and whitespace do not form a switch.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"ab12-c3\"",
        "output": "2",
        "explanation": "The switches are b→1 and 2→c."
      },
      {
        "input": "text = \"A9B8\"",
        "output": "3",
        "explanation": "Every adjacent pair changes between letter and digit."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction countLetterDigitSwitches(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_letter_digit_switches(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countLetterDigitSwitches(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countLetterDigitSwitches(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"ab12-c3\"",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"A9B8\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"7\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abc\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"1234\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"a-1\"",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-018",
    "title": "Count Words Within a Length Interval",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Greedy"
    ],
    "acceptance": "67.0%",
    "submissions": "45.1K",
    "description": "Count whitespace-delimited words whose lengths are between min_len and max_len, inclusive.\n\n### Input Format\n- `text`: string\n- `min_len`: nonnegative integer\n- `max_len`: integer >= min_len\n\n### Output Format\nAn integer count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"a to the moon\", min_len = 2, max_len = 3",
        "output": "2",
        "explanation": "The words to and the qualify."
      },
      {
        "input": "text = \"red blue gold\", min_len = 3, max_len = 4",
        "output": "3",
        "explanation": "All three tokens have lengths from three to four."
      }
    ],
    "constraints": [
      "0 <= min_len <= max_len <= 100000",
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} min_len\n * @param {int} max_len\n * @return {int}\n */\nfunction countWordsInLengthRange(text, min_len, max_len) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_words_in_length_range(text: str, min_len: int, max_len: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countWordsInLengthRange(String text, int min_len, int max_len) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countWordsInLengthRange(string text, int min_len, int max_len) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"a to the moon\", min_len = 2, max_len = 3",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"red blue gold\", min_len = 3, max_len = 4",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", min_len = 1, max_len = 5",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"   \", min_len = 0, max_len = 10",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"a bb ccc\", min_len = 2, max_len = 3",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"four five six\", min_len = 3, max_len = 4",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"longer words\", min_len = 1, max_len = 2",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-019",
    "title": "Validate a Parenthesis-Only Sequence",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Stack"
    ],
    "acceptance": "66.9%",
    "submissions": "39.7K",
    "description": "Determine whether a string made only of opening and closing parentheses is balanced. Every opening parenthesis must be closed later, and no prefix may contain more closing than opening parentheses.\n\n### Input Format\n- `text`: string containing only ( and )\n\n### Output Format\nA boolean.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"(()())\"",
        "output": "true",
        "explanation": "Every opening parenthesis is matched in the correct order."
      },
      {
        "input": "text = \"())(\"",
        "output": "false",
        "explanation": "A prefix closes more parentheses than it has opened."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {bool}\n */\nfunction isParenthesisSequenceBalanced(text) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def is_parenthesis_sequence_balanced(text: str) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean isParenthesisSequenceBalanced(String text) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isParenthesisSequenceBalanced(string text) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"(()())\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"())(\"",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"(((\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \")))\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"((()))\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"(()))\"",
        "expected": "false",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-020",
    "title": "Find the Common Prefix of a Word List",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Array"
    ],
    "acceptance": "73.9%",
    "submissions": "19.7K",
    "description": "Return the longest prefix shared by every string in words. Return an empty string for an empty list. Matching is case-sensitive.\n\n### Input Format\n- `words`: array of strings\n\n### Output Format\nThe longest common prefix string.\n\n### Expected Time Complexity\n`O(total characters inspected)`\n\n### Expected Space Complexity\n`O(1) auxiliary space apart from output`",
    "examples": [
      {
        "input": "words = [\"interview\",\"internet\",\"internal\"]",
        "output": "inter",
        "explanation": "All words begin with inter, but the next character differs."
      },
      {
        "input": "words = [\"same\",\"same\"]",
        "output": "same",
        "explanation": "Identical words share the entire string."
      }
    ],
    "constraints": [
      "0 <= words.length <= 10000",
      "0 <= words[i].length <= 10000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string[]} words\n * @return {string}\n */\nfunction commonPrefix(words) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def common_prefix(words: list[str]) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String commonPrefix(String[] words) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string commonPrefix(vector<string>& words) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "words = [\"interview\",\"internet\",\"internal\"]",
        "expected": "inter",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "words = [\"same\",\"same\"]",
        "expected": "same",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "words = []",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "words = [\"\"]",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "words = [\"solo\"]",
        "expected": "solo",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "words = [\"cat\",\"dog\"]",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "words = [\"car\",\"careful\",\"care\"]",
        "expected": "car",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-021",
    "title": "Count Substrings with Exactly K Distinct Symbols",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "44.8%",
    "submissions": "8.1K",
    "description": "Count nonempty contiguous substrings of text that contain exactly k distinct characters. The count can be large; return it as a 64-bit integer.\n\n### Input Format\n- `text`: string\n- `k`: integer\n\n### Output Format\nA 64-bit integer count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(u)`",
    "examples": [
      {
        "input": "text = \"abac\", k = 2",
        "output": "4",
        "explanation": "The qualifying substrings are ab, aba, ba, and ac."
      },
      {
        "input": "text = \"aaaa\", k = 1",
        "output": "10",
        "explanation": "Every nonempty substring has exactly one distinct character."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "0 <= k <= 52",
      "text contains ASCII letters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {long}\n */\nfunction countSubstringsExactlyKDistinct(text, k) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_substrings_exactly_k_distinct(text: str, k: int) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countSubstringsExactlyKDistinct(String text, int k) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countSubstringsExactlyKDistinct(string text, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abac\", k = 2",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaaa\", k = 1",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 1",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", k = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"aab\", k = 3",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"zzzz\", k = 2",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abcd\", k = 1",
        "expected": "4",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-022",
    "title": "Longest Window with a Distinct-Symbol Limit",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "50.1%",
    "submissions": "13.3K",
    "description": "Find the maximum length of a contiguous substring containing at most k distinct characters. Return zero when k is zero or text is empty.\n\n### Input Format\n- `text`: string\n- `k`: nonnegative integer\n\n### Output Format\nAn integer maximum length.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(u)`",
    "examples": [
      {
        "input": "text = \"eceba\", k = 2",
        "output": "3",
        "explanation": "The substring ece has two distinct symbols and length three."
      },
      {
        "input": "text = \"aaabbb\", k = 1",
        "output": "3",
        "explanation": "The longest valid window is aaa or bbb."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "0 <= k <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {int}\n */\nfunction longestWindowAtMostKDistinct(text, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_window_at_most_k_distinct(text: str, k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestWindowAtMostKDistinct(String text, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestWindowAtMostKDistinct(string text, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"eceba\", k = 2",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaabbb\", k = 1",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 2",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", k = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abc\", k = 10",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aaaa\", k = 1",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"ababab\", k = 2",
        "expected": "6",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "str-023",
    "title": "Locate Permutation Windows",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Array"
    ],
    "acceptance": "56.8%",
    "submissions": "8.3K",
    "description": "Return every start index where a substring of text is a permutation of pattern. Indices are zero-based and must be reported in increasing order. If pattern is empty, return an empty list.\n\n### Input Format\n- `text`: string\n- `pattern`: string\n\n### Output Format\nAn array of integer start indices.\n\n### Expected Time Complexity\n`O(n + alphabet)`\n\n### Expected Space Complexity\n`O(alphabet)`",
    "examples": [
      {
        "input": "text = \"cbaebabacd\", pattern = \"abc\"",
        "output": "[0,6]",
        "explanation": "The windows cba and bac are permutations of abc."
      },
      {
        "input": "text = \"abab\", pattern = \"ab\"",
        "output": "[0,1,2]",
        "explanation": "All three length-two windows have the same character counts."
      }
    ],
    "constraints": [
      "0 <= len(text), len(pattern) <= 100000",
      "text and pattern contain lowercase English letters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string} pattern\n * @return {int[]}\n */\nfunction permutationWindowStarts(text, pattern) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def permutation_window_starts(text: str, pattern: str) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] permutationWindowStarts(String text, String pattern) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> permutationWindowStarts(string text, string pattern) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"cbaebabacd\", pattern = \"abc\"",
        "expected": "[0,6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"abab\", pattern = \"ab\"",
        "expected": "[0,1,2]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", pattern = \"a\"",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", pattern = \"\"",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"ab\", pattern = \"abc\"",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"bca\", pattern = \"abc\"",
        "expected": "[0]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aababa\", pattern = \"aab\"",
        "expected": "[0,1,3]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-024",
    "title": "Group Words by Character Inventory",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Hash Table",
      "Array"
    ],
    "acceptance": "48.6%",
    "submissions": "10.8K",
    "description": "Group words that contain exactly the same multiset of lowercase letters. Preserve input order within each group, and order groups by the first input index of any member.\n\n### Input Format\n- `words`: array of lowercase strings\n\n### Output Format\nAn array of arrays of strings.\n\n### Expected Time Complexity\n`O(total characters + words log words)`\n\n### Expected Space Complexity\n`O(total characters)`",
    "examples": [
      {
        "input": "words = [\"arc\",\"car\",\"elbow\",\"below\",\"state\",\"taste\"]",
        "output": "[[\"arc\",\"car\"],[\"elbow\",\"below\"],[\"state\",\"taste\"]]",
        "explanation": "Each group has identical letter frequencies."
      },
      {
        "input": "words = [\"ab\",\"ba\",\"abc\"]",
        "output": "[[\"ab\",\"ba\"],[\"abc\"]]",
        "explanation": "The first two words share an inventory."
      }
    ],
    "constraints": [
      "1 <= words.length <= 20000",
      "0 <= words[i].length <= 1000",
      "words contain lowercase English letters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string[]} words\n * @return {string[][]}\n */\nfunction groupByCharacterInventory(words) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def group_by_character_inventory(words: list[str]) -> list[str]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String[] groupByCharacterInventory(String[] words) {\n        // Write your solution here\n        return new String[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> groupByCharacterInventory(vector<string>& words) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "words = [\"arc\",\"car\",\"elbow\",\"below\",\"state\",\"taste\"]",
        "expected": "[[\"arc\",\"car\"],[\"elbow\",\"below\"],[\"state\",\"taste\"]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "words = [\"ab\",\"ba\",\"abc\"]",
        "expected": "[[\"ab\",\"ba\"],[\"abc\"]]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "words = [\"solo\"]",
        "expected": "[[\"solo\"]]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "words = [\"a\",\"a\",\"a\"]",
        "expected": "[[\"a\",\"a\",\"a\"]]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "words = [\"\",\"a\",\"\"]",
        "expected": "[[\"\",\"\"],[\"a\"]]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "words = [\"ab\",\"ac\",\"ad\"]",
        "expected": "[[\"ab\"],[\"ac\"],[\"ad\"]]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "words = [\"aab\",\"aba\",\"abb\"]",
        "expected": "[[\"aab\",\"aba\"],[\"abb\"]]",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "str-025",
    "title": "Find the Shortest Unique Prefix for Each Word",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Trie",
      "Prefix Sum",
      "Array"
    ],
    "acceptance": "56.4%",
    "submissions": "16.7K",
    "description": "For each word, return its shortest prefix that is not a prefix of any other input word. If a word is duplicated, or no prefix is unique because another word extends it, return null for that word. Results stay in input order.\n\n### Input Format\n- `words`: array of lowercase strings\n\n### Output Format\nAn array of strings or null values.\n\n### Expected Time Complexity\n`O(total characters)`\n\n### Expected Space Complexity\n`O(total characters)`",
    "examples": [
      {
        "input": "words = [\"dog\",\"dove\",\"duck\",\"zebra\"]",
        "output": "[\"dog\",\"dov\",\"du\",\"z\"]",
        "explanation": "Each returned prefix identifies exactly one input word."
      },
      {
        "input": "words = [\"app\",\"apple\",\"ape\"]",
        "output": "[null,\"appl\",\"ape\"]",
        "explanation": "A word that prefixes another needs a longer distinguishing prefix if available."
      }
    ],
    "constraints": [
      "1 <= words.length <= 20000",
      "1 <= words[i].length <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string[]} words\n * @return {(string|null)[]}\n */\nfunction shortestUniquePrefixes(words) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def shortest_unique_prefixes(words: list[str]) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String shortestUniquePrefixes(String[] words) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string shortestUniquePrefixes(vector<string>& words) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "words = [\"dog\",\"dove\",\"duck\",\"zebra\"]",
        "expected": "[\"dog\",\"dov\",\"du\",\"z\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "words = [\"app\",\"apple\",\"ape\"]",
        "expected": "[null,\"appl\",\"ape\"]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "words = [\"solo\"]",
        "expected": "[\"s\"]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "words = [\"cat\",\"cat\"]",
        "expected": "[null,null]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "words = [\"a\",\"ab\"]",
        "expected": "[null,\"ab\"]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "words = [\"ant\",\"bee\",\"cat\"]",
        "expected": "[\"a\",\"b\",\"c\"]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "words = [\"prefixOne\",\"prefixTwo\"]",
        "expected": "[\"prefixO\",\"prefixT\"]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-026",
    "title": "Reduce Runs of Exactly K Characters",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Stack"
    ],
    "acceptance": "57.8%",
    "submissions": "20.8K",
    "description": "Repeatedly remove any contiguous run of exactly k equal characters. After a removal, newly adjacent runs may combine and become removable. Continue until no exact-k run remains. When several runs are removable, any removal order must lead to the same final string.\n\n### Input Format\n- `text`: string\n- `k`: integer >= 2\n\n### Output Format\nThe fully reduced string.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"deeedbbcccbdaa\", k = 3",
        "output": "aa",
        "explanation": "Repeated removals expose additional runs."
      },
      {
        "input": "text = \"pbbcggttciiippooaais\", k = 2",
        "output": "ps",
        "explanation": "Adjacent pairs are removed until stable."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "2 <= k <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {string}\n */\nfunction reduceExactRuns(text, k) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def reduce_exact_runs(text: str, k: int) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String reduceExactRuns(String text, int k) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string reduceExactRuns(string text, int k) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"deeedbbcccbdaa\", k = 3",
        "expected": "aa",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"pbbcggttciiippooaais\", k = 2",
        "expected": "ps",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 2",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"aabb\", k = 5",
        "expected": "aabb",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abcd\", k = 2",
        "expected": "abcd",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"xxxx\", k = 4",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abcccbbaa\", k = 3",
        "expected": "",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-027",
    "title": "Minimum Deletions to Make Two Texts Equal",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "acceptance": "56.3%",
    "submissions": "13.3K",
    "description": "You may delete characters from either string but may not reorder the remaining characters. Return the minimum total number of deletions needed to make the two resulting strings identical.\n\n### Input Format\n- `a`: string\n- `b`: string\n\n### Output Format\nAn integer minimum deletion count.\n\n### Expected Time Complexity\n`O(n*m)`\n\n### Expected Space Complexity\n`O(min(n,m)) with rolling rows`",
    "examples": [
      {
        "input": "a = \"sea\", b = \"eat\"",
        "output": "2",
        "explanation": "The common subsequence ea is retained; one character is deleted from each string."
      },
      {
        "input": "a = \"abc\", b = \"abc\"",
        "output": "0",
        "explanation": "The strings already match."
      }
    ],
    "constraints": [
      "0 <= len(a), len(b) <= 2000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} a\n * @param {string} b\n * @return {int}\n */\nfunction minimumDeletionsToEqual(a, b) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def minimum_deletions_to_equal(a: str, b: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minimumDeletionsToEqual(String a, String b) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minimumDeletionsToEqual(string a, string b) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"sea\", b = \"eat\"",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"abc\", b = \"abc\"",
        "expected": "0",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = \"\", b = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = \"abc\", b = \"\"",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = \"ab\", b = \"CD\"",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = \"abc\", b = \"xby\"",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = \"aaaa\", b = \"aa\"",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-028",
    "title": "Longest Shared Contiguous Fragment",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "acceptance": "50.7%",
    "submissions": "11.4K",
    "description": "Find the length of the longest contiguous substring that appears in both a and b. Characters must be consecutive in each string; subsequences do not qualify.\n\n### Input Format\n- `a`: string\n- `b`: string\n\n### Output Format\nAn integer length.\n\n### Expected Time Complexity\n`O(n*m)`\n\n### Expected Space Complexity\n`O(min(n,m))`",
    "examples": [
      {
        "input": "a = \"xabcdz\", b = \"yabcq\"",
        "output": "3",
        "explanation": "The longest shared contiguous fragment is abc."
      },
      {
        "input": "a = \"12345\", b = \"34567\"",
        "output": "3",
        "explanation": "The shared fragment is 345."
      }
    ],
    "constraints": [
      "0 <= len(a), len(b) <= 3000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} a\n * @param {string} b\n * @return {int}\n */\nfunction longestSharedFragmentLength(a, b) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_shared_fragment_length(a: str, b: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestSharedFragmentLength(String a, String b) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestSharedFragmentLength(string a, string b) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"xabcdz\", b = \"yabcq\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"12345\", b = \"34567\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = \"\", b = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = \"abc\", b = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = \"abc\", b = \"XYZ\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = \"xxhello\", b = \"hello\"",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = \"abc\", b = \"ac\"",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-029",
    "title": "Count Ways a Target Appears as a Subsequence",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "acceptance": "45.0%",
    "submissions": "8.7K",
    "description": "Count the number of index selections in source that spell target in order. Chosen indices must be strictly increasing. Return the exact count as an arbitrary-precision integer.\n\n### Input Format\n- `source`: string\n- `target`: string\n\n### Output Format\nA nonnegative integer count.\n\n### Expected Time Complexity\n`O(n*m)`\n\n### Expected Space Complexity\n`O(m)`",
    "examples": [
      {
        "input": "source = \"babgbag\", target = \"bag\"",
        "output": "5",
        "explanation": "There are five distinct index selections spelling bag."
      },
      {
        "input": "source = \"aaaa\", target = \"aa\"",
        "output": "6",
        "explanation": "Any two of the four indices can be selected."
      }
    ],
    "constraints": [
      "0 <= len(source) <= 2000",
      "0 <= len(target) <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} source\n * @param {string} target\n * @return {big_integer}\n */\nfunction countTargetSubsequences(source, target) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_target_subsequences(source: str, target: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countTargetSubsequences(String source, String target) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countTargetSubsequences(string source, string target) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "source = \"babgbag\", target = \"bag\"",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "source = \"aaaa\", target = \"aa\"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "source = \"\", target = \"\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "source = \"abc\", target = \"\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "source = \"ab\", target = \"abc\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "source = \"abc\", target = \"z\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "source = \"aaaaa\", target = \"aaa\"",
        "expected": "10",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-030",
    "title": "Check a One-to-One Character Mapping",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Hash Table"
    ],
    "acceptance": "48.2%",
    "submissions": "20.4K",
    "description": "Determine whether characters in a and b can be mapped consistently in both directions so that replacing every character of a produces b. Each source character maps to exactly one target character, and distinct source characters must map to distinct target characters.\n\n### Input Format\n- `a`: string\n- `b`: string\n\n### Output Format\nA boolean.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(u)`",
    "examples": [
      {
        "input": "a = \"paper\", b = \"title\"",
        "output": "true",
        "explanation": "Each distinct character has a consistent unique partner."
      },
      {
        "input": "a = \"ab\", b = \"cc\"",
        "output": "false",
        "explanation": "Two different source characters would map to the same target."
      }
    ],
    "constraints": [
      "0 <= len(a), len(b) <= 100000",
      "a and b contain arbitrary ASCII characters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} a\n * @param {string} b\n * @return {bool}\n */\nfunction hasBijectiveCharacterMapping(a, b) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def has_bijective_character_mapping(a: str, b: str) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean hasBijectiveCharacterMapping(String a, String b) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool hasBijectiveCharacterMapping(string a, string b) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"paper\", b = \"title\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"ab\", b = \"cc\"",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = \"\", b = \"\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = \"ab\", b = \"a\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = \"level\", b = \"level\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = \"foo\", b = \"bar\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = \"ab\", b = \"aa\"",
        "expected": "false",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "str-031",
    "title": "Find All Substring Matches for a Set of Words",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Trie",
      "Array",
      "Hash Table"
    ],
    "acceptance": "55.6%",
    "submissions": "22.0K",
    "description": "Given a text and a list of distinct nonempty patterns, return for each pattern the sorted list of all starting indices where it occurs in text. Overlapping matches are allowed. Omit no pattern from the output; patterns with no matches map to an empty list.\n\n### Input Format\n- `text`: string\n- `patterns`: array of distinct nonempty strings\n\n### Output Format\nAn object mapping each pattern to an array of integer indices.\n\n### Expected Time Complexity\n`O(n + total pattern length + matches) expected with trie`\n\n### Expected Space Complexity\n`O(total pattern length + matches)`",
    "examples": [
      {
        "input": "text = \"bananaban\", patterns = [\"ana\",\"ban\",\"x\"]",
        "output": "{\"ana\":[1,3],\"ban\":[0,6],\"x\":[]}",
        "explanation": "The ana matches overlap at positions one and three."
      },
      {
        "input": "text = \"aaaa\", patterns = [\"a\",\"aa\",\"aaa\"]",
        "output": "{\"a\":[0,1,2,3],\"aa\":[0,1,2],\"aaa\":[0,1]}",
        "explanation": "All overlapping occurrences are reported."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "1 <= patterns.length <= 1000",
      "1 <= len(patterns[i]) <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string[]} patterns\n * @return {map}\n */\nfunction findAllPatternPositions(text, patterns) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def find_all_pattern_positions(text: str, patterns: list[str]) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object findAllPatternPositions(String text, String[] patterns) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto findAllPatternPositions(string text, vector<string>& patterns) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"bananaban\", patterns = [\"ana\",\"ban\",\"x\"]",
        "expected": "{\"ana\":[1,3],\"ban\":[0,6],\"x\":[]}",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaaa\", patterns = [\"a\",\"aa\",\"aaa\"]",
        "expected": "{\"a\":[0,1,2,3],\"aa\":[0,1,2],\"aaa\":[0,1]}",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", patterns = [\"a\"]",
        "expected": "{\"a\":[]}",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"ab\", patterns = [\"abcd\"]",
        "expected": "{\"abcd\":[]}",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"cat\", patterns = [\"cat\"]",
        "expected": "{\"cat\":[0]}",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aaaaa\", patterns = [\"aaa\"]",
        "expected": "{\"aaa\":[0,1,2]}",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"hello\", patterns = [\"xyz\",\"world\"]",
        "expected": "{\"xyz\":[],\"world\":[]}",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-032",
    "title": "Find the Shortest Window Covering Required Characters",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "45.3%",
    "submissions": "15.0K",
    "description": "Return the shortest substring of source containing every character in required with at least the same multiplicity. If multiple windows have the same minimum length, return the leftmost. Return an empty string if no valid window exists or required is empty.\n\n### Input Format\n- `source`: string\n- `required`: string multiset\n\n### Output Format\nThe selected substring.\n\n### Expected Time Complexity\n`O(n + m)`\n\n### Expected Space Complexity\n`O(u)`",
    "examples": [
      {
        "input": "source = \"ADOBECODEBANC\", required = \"ABC\"",
        "output": "BANC",
        "explanation": "BANC is the shortest window containing A, B, and C."
      },
      {
        "input": "source = \"aaabcbc\", required = \"aabc\"",
        "output": "aabc",
        "explanation": "The shortest window must contain two a characters, one b, and one c."
      }
    ],
    "constraints": [
      "0 <= len(source), len(required) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} source\n * @param {string} required\n * @return {string}\n */\nfunction minimumCoveringWindow(source, required) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def minimum_covering_window(source: str, required: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String minimumCoveringWindow(String source, String required) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minimumCoveringWindow(string source, string required) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "source = \"ADOBECODEBANC\", required = \"ABC\"",
        "expected": "BANC",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "source = \"aaabcbc\", required = \"aabc\"",
        "expected": "aabc",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "source = \"\", required = \"a\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "source = \"abc\", required = \"\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "source = \"ab\", required = \"aabc\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "source = \"aabb\", required = \"aabb\"",
        "expected": "aabb",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "source = \"abaca\", required = \"aa\"",
        "expected": "aba",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-033",
    "title": "Longest Uniformizable Window",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "55.7%",
    "submissions": "9.3K",
    "description": "You may replace at most k characters within one contiguous substring so that every character in that substring becomes identical. Return the maximum achievable substring length.\n\n### Input Format\n- `text`: uppercase string\n- `k`: nonnegative integer\n\n### Output Format\nAn integer maximum length.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(26)`",
    "examples": [
      {
        "input": "text = \"AABABBA\", k = 1",
        "output": "4",
        "explanation": "A substring of length four can be made uniform with one replacement."
      },
      {
        "input": "text = \"ABBB\", k = 0",
        "output": "3",
        "explanation": "With no replacements, the longest existing run has length three."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "0 <= k <= len(text)",
      "text contains uppercase English letters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {int}\n */\nfunction longestUniformizableWindow(text, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_uniformizable_window(text: str, k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestUniformizableWindow(String text, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestUniformizableWindow(string text, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"AABABBA\", k = 1",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"ABBB\", k = 0",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 2",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"AABCC\", k = 0",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"ABCD\", k = 4",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"ZZZZ\", k = 0",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"Q\", k = 0",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-034",
    "title": "Compare Dotted Numeric Labels",
    "difficulty": "Medium",
    "topics": [
      "String"
    ],
    "acceptance": "44.4%",
    "submissions": "26.3K",
    "description": "Compare two dotted numeric labels component by component. Components contain decimal digits only. Leading zeroes are ignored; missing trailing components are treated as zero. Return -1, 0, or 1 according to the numeric ordering.\n\n### Input Format\n- `a`: dotted numeric string\n- `b`: dotted numeric string\n\n### Output Format\nAn integer: -1 if a<b, 0 if equal, 1 if a>b.\n\n### Expected Time Complexity\n`O(total input length)`\n\n### Expected Space Complexity\n`O(number of components)`",
    "examples": [
      {
        "input": "a = \"2.09.0\", b = \"2.9\"",
        "output": "0",
        "explanation": "Leading zeroes and trailing zero components do not affect equality."
      },
      {
        "input": "a = \"1.12\", b = \"1.3.8\"",
        "output": "1",
        "explanation": "At the second component, 12 is greater than 3."
      }
    ],
    "constraints": [
      "Each label has 1 to 100 components",
      "Each component has 1 to 1000 digits",
      "Labels contain only digits and dots"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} a\n * @param {string} b\n * @return {int}\n */\nfunction compareNumericLabels(a, b) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def compare_numeric_labels(a: str, b: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int compareNumericLabels(String a, String b) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int compareNumericLabels(string a, string b) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"2.09.0\", b = \"2.9\"",
        "expected": "0",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"1.12\", b = \"1.3.8\"",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = \"1.0\", b = \"1\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = \"10\", b = \"2\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = \"99999999999999999999\", b = \"100000000000000000000\"",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = \"0004.02\", b = \"4.2\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = \"3.4.0.0\", b = \"3.4\"",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-035",
    "title": "Validate a Numeric Word Abbreviation",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "acceptance": "51.4%",
    "submissions": "26.1K",
    "description": "A word abbreviation contains literal lowercase letters and decimal numbers. A number skips that many characters in the original word; numbers may not have leading zeroes. Determine whether the abbreviation consumes the word exactly and every literal matches.\n\n### Input Format\n- `word`: lowercase string\n- `abbreviation`: letters and digit runs\n\n### Output Format\nA boolean.\n\n### Expected Time Complexity\n`O(n+m)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "word = \"international\", abbreviation = \"i11l\"",
        "output": "true",
        "explanation": "The abbreviation is parsed as i, n, t, 5, n, l and does not consume the word correctly."
      },
      {
        "input": "word = \"substitution\", abbreviation = \"s10n\"",
        "output": "true",
        "explanation": "The first s and final n match, with ten skipped characters between."
      }
    ],
    "constraints": [
      "0 <= len(word), len(abbreviation) <= 100000",
      "word contains lowercase letters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} word\n * @param {string} abbreviation\n * @return {bool}\n */\nfunction isNumericWordAbbreviationValid(word, abbreviation) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def is_numeric_word_abbreviation_valid(word: str, abbreviation: str) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean isNumericWordAbbreviationValid(String word, String abbreviation) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isNumericWordAbbreviationValid(string word, string abbreviation) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "word = \"international\", abbreviation = \"i11l\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "word = \"substitution\", abbreviation = \"s10n\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "word = \"\", abbreviation = \"\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "word = \"cat\", abbreviation = \"\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "word = \"abc\", abbreviation = \"a02\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "word = \"cat\", abbreviation = \"4\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "word = \"cat\", abbreviation = \"b2\"",
        "expected": "false",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-036",
    "title": "Parse Escaped Delimited Records",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Array"
    ],
    "acceptance": "49.4%",
    "submissions": "18.8K",
    "description": "Split a line on unescaped pipe characters. A backslash escapes the next character, so an escaped pipe belongs to the current field and an escaped backslash becomes a literal backslash. Preserve empty fields, including leading and trailing ones. A trailing unmatched backslash is treated as a literal backslash.\n\n### Input Format\n- `line`: string\n\n### Output Format\nAn array of parsed field strings.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "line = \"red|blue\\\\|green||gold\"",
        "output": "[\"red\",\"blue|green\",\"\",\"gold\"]",
        "explanation": "The escaped pipe remains inside the second field."
      },
      {
        "input": "line = \"a\\\\\\\\b|c\"",
        "output": "[\"a\\\\b\",\"c\"]",
        "explanation": "The escaped backslash becomes one literal backslash."
      }
    ],
    "constraints": [
      "0 <= len(line) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} line\n * @return {string[]}\n */\nfunction parseEscapedPipeFields(line) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def parse_escaped_pipe_fields(line: str) -> list[str]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String[] parseEscapedPipeFields(String line) {\n        // Write your solution here\n        return new String[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> parseEscapedPipeFields(string line) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "line = \"red|blue\\\\|green||gold\"",
        "expected": "[\"red\",\"blue|green\",\"\",\"gold\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "line = \"a\\\\\\\\b|c\"",
        "expected": "[\"a\\\\b\",\"c\"]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "line = \"\"",
        "expected": "[\"\"]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "line = \"|\"",
        "expected": "[\"\",\"\"]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "line = \"a|\"",
        "expected": "[\"a\",\"\"]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "line = \"\\\\|\"",
        "expected": "[\"|\"]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "line = \"abc\\\\\"",
        "expected": "[\"abc\\\\\"]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-037",
    "title": "Reorder Tokens by a Custom Alphabet",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sorting",
      "Array",
      "Graph"
    ],
    "acceptance": "56.9%",
    "submissions": "23.1K",
    "description": "Sort the supplied words according to a custom alphabet order. Compare words lexicographically using the rank of each character; if one word is a prefix of another, the shorter word comes first. Preserve original order for equal words.\n\n### Input Format\n- `words`: array of strings\n- `alphabet`: permutation of all characters used in words\n\n### Output Format\nThe sorted array of words.\n\n### Expected Time Complexity\n`O(total characters + w log w)`\n\n### Expected Space Complexity\n`O(u + w)`",
    "examples": [
      {
        "input": "words = [\"ba\",\"ab\",\"aa\",\"b\"], alphabet = \"ba\"",
        "output": "[\"b\",\"ba\",\"aa\",\"ab\"]",
        "explanation": "The custom order places b before a."
      },
      {
        "input": "words = [\"car\",\"cat\",\"ca\"], alphabet = \"abcdefghijklmnopqrstuvwxyz\"",
        "output": "[\"ca\",\"car\",\"cat\"]",
        "explanation": "A prefix sorts before longer words that begin with it."
      }
    ],
    "constraints": [
      "0 <= words.length <= 20000",
      "Total word length <= 200000",
      "alphabet contains every character in words exactly once"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string[]} words\n * @param {string} alphabet\n * @return {string[]}\n */\nfunction sortByCustomAlphabet(words, alphabet) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def sort_by_custom_alphabet(words: list[str], alphabet: str) -> list[str]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String[] sortByCustomAlphabet(String[] words, String alphabet) {\n        // Write your solution here\n        return new String[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> sortByCustomAlphabet(vector<string>& words, string alphabet) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "words = [\"ba\",\"ab\",\"aa\",\"b\"], alphabet = \"ba\"",
        "expected": "[\"b\",\"ba\",\"aa\",\"ab\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "words = [\"car\",\"cat\",\"ca\"], alphabet = \"abcdefghijklmnopqrstuvwxyz\"",
        "expected": "[\"ca\",\"car\",\"cat\"]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "words = [], alphabet = \"abc\"",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "words = [\"cab\"], alphabet = \"abc\"",
        "expected": "[\"cab\"]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "words = [\"ab\",\"ab\"], alphabet = \"ab\"",
        "expected": "[\"ab\",\"ab\"]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "words = [\"abc\",\"ab\"], alphabet = \"abc\"",
        "expected": "[\"ab\",\"abc\"]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "words = [\"a\",\"b\",\"c\"], alphabet = \"cba\"",
        "expected": "[\"c\",\"b\",\"a\"]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-038",
    "title": "Compare Two Texts with Erase Markers",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Stack",
      "Hash Table"
    ],
    "acceptance": "52.9%",
    "submissions": "17.1K",
    "description": "Process each string from left to right: a hash character erases the most recent non-erased character if one exists; otherwise it does nothing. Return whether the two resulting strings are identical.\n\n### Input Format\n- `a`: string\n- `b`: string\n\n### Output Format\nA boolean.\n\n### Expected Time Complexity\n`O(n+m)`\n\n### Expected Space Complexity\n`O(n+m) with explicit stacks; O(1) extra possible backward scan`",
    "examples": [
      {
        "input": "a = \"ab#c\", b = \"ad#c\"",
        "output": "true",
        "explanation": "Both process to ac."
      },
      {
        "input": "a = \"a##\", b = \"\"",
        "output": "true",
        "explanation": "Erasing an empty stack has no effect."
      }
    ],
    "constraints": [
      "0 <= len(a), len(b) <= 100000",
      "The erase marker is #"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} a\n * @param {string} b\n * @return {bool}\n */\nfunction textsEqualAfterErasing(a, b) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def texts_equal_after_erasing(a: str, b: str) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean textsEqualAfterErasing(String a, String b) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool textsEqualAfterErasing(string a, string b) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"ab#c\", b = \"ad#c\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"a##\", b = \"\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = \"\", b = \"\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = \"#a\", b = \"a\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = \"abc###\", b = \"\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = \"hello\", b = \"hello\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = \"ab#d\", b = \"ac#d\"",
        "expected": "true",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-039",
    "title": "Find the Longest Prefix That Is Also a Suffix",
    "difficulty": "Medium",
    "topics": [
      "String"
    ],
    "acceptance": "57.6%",
    "submissions": "26.0K",
    "description": "Return the length of the longest proper prefix of text that is also a suffix. The prefix must be shorter than the entire string. Overlap between the prefix and suffix is allowed.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer length.\n\n### Expected Time Complexity\n`O(n) using prefix-function`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"abacababa\"",
        "output": "3",
        "explanation": "aba is both a proper prefix and a suffix."
      },
      {
        "input": "text = \"aaaa\"",
        "output": "3",
        "explanation": "The longest proper border is aaa."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 1000000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction longestProperBorderLength(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_proper_border_length(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestProperBorderLength(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestProperBorderLength(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abacababa\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaaa\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"x\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abcd\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"zzzzz\"",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abcabc\"",
        "expected": "3",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-040",
    "title": "Find the First Repeated Character",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Hash Table"
    ],
    "acceptance": "46.9%",
    "submissions": "23.1K",
    "description": "Scan text from left to right and return the first character whose current occurrence has appeared earlier. Return null if every character is distinct.\n\n### Input Format\n- `text`: string\n\n### Output Format\nA one-character string or null.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(u)`",
    "examples": [
      {
        "input": "text = \"abca\"",
        "output": "a",
        "explanation": "The final a is the first character encountered for a second time."
      },
      {
        "input": "text = \"mississippi\"",
        "output": "s",
        "explanation": "The second character s is the first repeat."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {string|null}\n */\nfunction firstRepeatedCharacter(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def first_repeated_character(text: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String firstRepeatedCharacter(String text) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string firstRepeatedCharacter(string text) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abca\"",
        "expected": "a",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"mississippi\"",
        "expected": "s",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"a\"",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abcd\"",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aa\"",
        "expected": "a",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aA\"",
        "expected": "null",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "str-041",
    "title": "Count Substrings with No Symbol Used More Than Twice",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "51.6%",
    "submissions": "10.1K",
    "description": "Count all nonempty contiguous substrings in which every distinct character appears at most twice.\n\n### Input Format\n- `text`: string\n\n### Output Format\nA 64-bit integer count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(u)`",
    "examples": [
      {
        "input": "text = \"abca\"",
        "output": "10",
        "explanation": "All nine nonempty substrings satisfy the frequency limit."
      },
      {
        "input": "text = \"aaaa\"",
        "output": "5",
        "explanation": "Only windows of lengths one and two qualify: four plus three."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {long}\n */\nfunction countWindowsWithMaxFrequencyTwo(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_windows_with_max_frequency_two(text: str) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countWindowsWithMaxFrequencyTwo(String text) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countWindowsWithMaxFrequencyTwo(string text) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abca\"",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaaa\"",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"x\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abcd\"",
        "expected": "10",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aaa\"",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aabb\"",
        "expected": "10",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-042",
    "title": "Append the Shortest Suffix to Make a Palindrome",
    "difficulty": "Medium",
    "topics": [
      "String"
    ],
    "acceptance": "49.9%",
    "submissions": "21.2K",
    "description": "Append the fewest characters to text so that the entire result is a palindrome. Return only the appended suffix. If text is already a palindrome, return an empty string.\n\n### Input Format\n- `text`: string\n\n### Output Format\nThe suffix that must be appended.\n\n### Expected Time Complexity\n`O(n) using a prefix-function or KMP construction`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"race\"",
        "output": "car",
        "explanation": "Appending the reverse of the prefix before the longest palindromic suffix gives racecar."
      },
      {
        "input": "text = \"abca\"",
        "output": "cba",
        "explanation": "Appending ba produces abcaba, which is a palindrome."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {string}\n */\nfunction shortestSuffixForPalindrome(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def shortest_suffix_for_palindrome(text: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String shortestSuffixForPalindrome(String text) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string shortestSuffixForPalindrome(string text) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"race\"",
        "expected": "car",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"abca\"",
        "expected": "cba",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"x\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"level\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abcd\"",
        "expected": "cba",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abba\"",
        "expected": "",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-043",
    "title": "Find the Longest Substring Containing Every Vowel",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window"
    ],
    "acceptance": "55.0%",
    "submissions": "8.3K",
    "description": "Find the maximum length of a contiguous substring that contains each of the five lowercase English vowels at least once. Other characters may appear anywhere in the window. Matching is case-sensitive.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer maximum length, or zero if no valid window exists.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"abecidofu\"",
        "output": "9",
        "explanation": "The entire string contains a, e, i, o, and u."
      },
      {
        "input": "text = \"xxaeioubb\"",
        "output": "9",
        "explanation": "The shortest covering portion aeiou can be extended to a window of length six? The maximum covering window is aeioub, length six."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "text contains lowercase English letters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction longestSubstringWithAllVowels(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_substring_with_all_vowels(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestSubstringWithAllVowels(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestSubstringWithAllVowels(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abecidofu\"",
        "expected": "9",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"xxaeioubb\"",
        "expected": "9",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"aeiobcdf\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"aeiou\"",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"a-x-e-y-i-z-o-w-u\"",
        "expected": "17",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaeeiioouu\"",
        "expected": "10",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-044",
    "title": "Find the Minimum Insertions for Balanced Brackets",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Greedy",
      "Stack"
    ],
    "acceptance": "56.4%",
    "submissions": "12.1K",
    "description": "Given a string containing only opening and closing parentheses, return the minimum number of parentheses that must be inserted to make the sequence balanced. Existing characters cannot be removed or reordered.\n\n### Input Format\n- `text`: string of parentheses\n\n### Output Format\nAn integer minimum insertion count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"()))((\"",
        "output": "4",
        "explanation": "Two closing parentheses need earlier openings and two final openings need closings."
      },
      {
        "input": "text = \"(()\"",
        "output": "1",
        "explanation": "One closing parenthesis completes the final opening."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction minimumParenthesisInsertions(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def minimum_parenthesis_insertions(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minimumParenthesisInsertions(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minimumParenthesisInsertions(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"()))((\"",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"(()\"",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"((((\"",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \")))\"",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"()()\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"(())\"",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-045",
    "title": "Determine Whether a Dictionary Can Segment Text",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Dynamic Programming",
      "Array",
      "Hash Table"
    ],
    "acceptance": "49.2%",
    "submissions": "10.4K",
    "description": "Determine whether text can be split into a sequence of one or more dictionary words, with no spaces or characters omitted. A dictionary word may be reused any number of times. Empty text is segmentable.\n\n### Input Format\n- `text`: string\n- `dictionary`: array of distinct nonempty strings\n\n### Output Format\nA boolean.\n\n### Expected Time Complexity\n`O(n^2) with hash-set checks`\n\n### Expected Space Complexity\n`O(n + dictionary size)`",
    "examples": [
      {
        "input": "text = \"blueberrypie\", dictionary = [\"blue\",\"berry\",\"pie\"]",
        "output": "true",
        "explanation": "The text can be split into blue, berry, and pie."
      },
      {
        "input": "text = \"blueberrpie\", dictionary = [\"blue\",\"berry\",\"pie\"]",
        "output": "false",
        "explanation": "The missing y prevents a complete segmentation."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 5000",
      "1 <= dictionary.length <= 10000",
      "Total dictionary length <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string[]} dictionary\n * @return {bool}\n */\nfunction canSegmentText(text, dictionary) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def can_segment_text(text: str, dictionary: list[str]) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean canSegmentText(String text, String[] dictionary) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canSegmentText(string text, vector<string>& dictionary) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"blueberrypie\", dictionary = [\"blue\",\"berry\",\"pie\"]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"blueberrpie\", dictionary = [\"blue\",\"berry\",\"pie\"]",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", dictionary = [\"a\"]",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", dictionary = []",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"cat\", dictionary = [\"cat\"]",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"catsandog\", dictionary = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaaaaa\", dictionary = [\"aa\"]",
        "expected": "true",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-046",
    "title": "Count All Dictionary Segmentations",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Dynamic Programming",
      "Array",
      "Hash Table"
    ],
    "acceptance": "48.3%",
    "submissions": "21.0K",
    "description": "Count the number of different ways to segment text into dictionary words. Reuse is allowed, and different word-boundary choices count as different segmentations. Return an arbitrary-precision integer.\n\n### Input Format\n- `text`: string\n- `dictionary`: array of distinct nonempty strings\n\n### Output Format\nA nonnegative integer count.\n\n### Expected Time Complexity\n`O(n^2) expected with hash-set checks`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"aaaa\", dictionary = [\"a\",\"aa\"]",
        "output": "5",
        "explanation": "The five segmentations correspond to compositions of four using parts one and two."
      },
      {
        "input": "text = \"catsand\", dictionary = [\"cat\",\"cats\",\"and\",\"sand\"]",
        "output": "2",
        "explanation": "The valid segmentations are cat+sand and cats+and."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 5000",
      "1 <= dictionary.length <= 10000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string[]} dictionary\n * @return {big_integer}\n */\nfunction countTextSegmentations(text, dictionary) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_text_segmentations(text: str, dictionary: list[str]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countTextSegmentations(String text, String[] dictionary) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countTextSegmentations(string text, vector<string>& dictionary) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aaaa\", dictionary = [\"a\",\"aa\"]",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"catsand\", dictionary = [\"cat\",\"cats\",\"and\",\"sand\"]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", dictionary = [\"a\"]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", dictionary = [\"x\"]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"home\", dictionary = [\"home\",\"ho\",\"me\"]",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aaaa\", dictionary = [\"a\"]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaa\", dictionary = [\"a\",\"aa\"]",
        "expected": "3",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-047",
    "title": "Count Pairs with a Prefix Relationship",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Trie",
      "Prefix Sum",
      "Array"
    ],
    "acceptance": "53.6%",
    "submissions": "10.1K",
    "description": "Count index pairs (i, j) with i < j such that one word is a strict prefix of the other. Equal words do not count as a strict-prefix pair. Each pair of indices is counted once.\n\n### Input Format\n- `words`: array of strings\n\n### Output Format\nA 64-bit integer pair count.\n\n### Expected Time Complexity\n`O(total characters + pairs output count)`\n\n### Expected Space Complexity\n`O(total characters)`",
    "examples": [
      {
        "input": "words = [\"app\",\"apple\",\"ape\",\"bat\",\"batch\"]",
        "output": "2",
        "explanation": "The pairs are app/apple and bat/batch."
      },
      {
        "input": "words = [\"a\",\"ab\",\"abc\"]",
        "output": "3",
        "explanation": "Every earlier shorter word is a strict prefix of each later longer word."
      }
    ],
    "constraints": [
      "0 <= words.length <= 50000",
      "0 <= len(words[i]) <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string[]} words\n * @return {long}\n */\nfunction countStrictPrefixPairs(words) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_strict_prefix_pairs(words: list[str]) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countStrictPrefixPairs(String[] words) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countStrictPrefixPairs(vector<string>& words) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "words = [\"app\",\"apple\",\"ape\",\"bat\",\"batch\"]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "words = [\"a\",\"ab\",\"abc\"]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "words = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "words = [\"abc\"]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "words = [\"go\",\"go\",\"go\"]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "words = [\"\",\"a\",\"ab\"]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "words = [\"apple\",\"app\"]",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-048",
    "title": "Find Repeated Fixed-Length Fragments",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Hash Table",
      "Array"
    ],
    "acceptance": "57.3%",
    "submissions": "19.1K",
    "description": "Return all distinct substrings of length k that appear at least twice in text. Preserve the order in which each repeated fragment reaches its second occurrence.\n\n### Input Format\n- `text`: string\n- `k`: positive integer\n\n### Output Format\nAn array of repeated substrings in second-occurrence order.\n\n### Expected Time Complexity\n`O(n*k) with direct slicing; O(n) with rolling hashes`\n\n### Expected Space Complexity\n`O(number of distinct windows)`",
    "examples": [
      {
        "input": "text = \"abcabcab\", k = 3",
        "output": "[\"abc\",\"bca\",\"cab\"]",
        "explanation": "Each listed length-three fragment appears at least twice."
      },
      {
        "input": "text = \"aaaaa\", k = 2",
        "output": "[\"aa\"]",
        "explanation": "The same fragment repeats in overlapping windows."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "1 <= k <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {string[]}\n */\nfunction repeatedFragments(text, k) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def repeated_fragments(text: str, k: int) -> list[str]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String[] repeatedFragments(String text, int k) {\n        // Write your solution here\n        return new String[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> repeatedFragments(string text, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abcabcab\", k = 3",
        "expected": "[\"abc\",\"bca\",\"cab\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaaaa\", k = 2",
        "expected": "[\"aa\"]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 2",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", k = 4",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abcdef\", k = 2",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"zzzz\", k = 1",
        "expected": "[\"z\"]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abc\", k = 3",
        "expected": "[]",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "str-049",
    "title": "Find the Longest Substring with At Most One Adjacent Repeat Block",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window"
    ],
    "acceptance": "54.0%",
    "submissions": "14.5K",
    "description": "Find the longest contiguous substring in which at most one maximal run has length greater than one. Other runs must have length exactly one. Return the maximum length.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer maximum length.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"abccdefggg\"",
        "output": "8",
        "explanation": "The window abccde contains one repeated run, cc, and length six."
      },
      {
        "input": "text = \"aabbcc\"",
        "output": "4",
        "explanation": "Any length-three window can include at most one doubled run."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction longestWindowWithOneRepeatedRun(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_window_with_one_repeated_run(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestWindowWithOneRepeatedRun(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestWindowWithOneRepeatedRun(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abccdefggg\"",
        "expected": "8",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aabbcc\"",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abcdef\"",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"aaabcdef\"",
        "expected": "8",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aabbcc\"",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaaaa\"",
        "expected": "5",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-050",
    "title": "Find the Longest Alternating Letter-Digit Substring",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "acceptance": "56.7%",
    "submissions": "13.0K",
    "description": "Find the longest contiguous substring whose characters alternate between ASCII letters and decimal digits at every adjacent position. Punctuation is not allowed inside a valid substring.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer maximum length.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"a1B2cX33d\"",
        "output": "5",
        "explanation": "The substring a1B2c alternates letter and digit."
      },
      {
        "input": "text = \"12ab34\"",
        "output": "2",
        "explanation": "The substring 2ab3 has length four and alternates digit, letter, letter? The correct longest alternating window is 2a or b3, length two."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction longestAlternatingLetterDigit(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_alternating_letter_digit(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestAlternatingLetterDigit(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestAlternatingLetterDigit(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"a1B2cX33d\"",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"12ab34\"",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"1234\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"a1b2c3\"",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"a1-b2\"",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-051",
    "title": "Normalize Runs of Spaces Without Touching Other Whitespace",
    "difficulty": "Medium",
    "topics": [
      "String"
    ],
    "acceptance": "57.7%",
    "submissions": "11.4K",
    "description": "Replace every maximal run of ordinary space characters with one ordinary space. Tabs and line breaks are not collapsed or converted. Preserve all leading and trailing whitespace except that repeated ordinary spaces collapse to one.\n\n### Input Format\n- `text`: string\n\n### Output Format\nThe normalized string.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"  alpha   beta  \"",
        "output": " alpha beta ",
        "explanation": "Only ordinary spaces are collapsed."
      },
      {
        "input": "text = \"a\\t  b\\n c\"",
        "output": "a\t b\n c",
        "explanation": "Tabs and line breaks remain in place."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {string}\n */\nfunction collapseOrdinarySpaces(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def collapse_ordinary_spaces(text: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String collapseOrdinarySpaces(String text) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string collapseOrdinarySpaces(string text) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"  alpha   beta  \"",
        "expected": " alpha beta ",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"a\\t  b\\n c\"",
        "expected": "a\t b\n c",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\"",
        "expected": "abc",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"     \"",
        "expected": " ",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"a b c\"",
        "expected": "a b c",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"\\t\\t\"",
        "expected": "\t\t",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-052",
    "title": "Find the Shortest Prefix Window Matching a Pattern",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Two Pointers",
      "Dynamic Programming"
    ],
    "acceptance": "54.1%",
    "submissions": "25.6K",
    "description": "Find the shortest contiguous substring of source in which pattern appears as a subsequence. If multiple windows have equal length, return the leftmost. Return an empty string when no such window exists or pattern is empty.\n\n### Input Format\n- `source`: string\n- `pattern`: string\n\n### Output Format\nThe shortest matching window.\n\n### Expected Time Complexity\n`O(n*m) two-pointer or DP approach`\n\n### Expected Space Complexity\n`O(m)`",
    "examples": [
      {
        "input": "source = \"abcdebdde\", pattern = \"bde\"",
        "output": "bcde",
        "explanation": "The window bcde contains b, d, e in order."
      },
      {
        "input": "source = \"axbycz\", pattern = \"abc\"",
        "output": "axbyc",
        "explanation": "The shortest substring containing a, b, c in order is axbyc."
      }
    ],
    "constraints": [
      "0 <= len(source) <= 10000",
      "0 <= len(pattern) <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} source\n * @param {string} pattern\n * @return {string}\n */\nfunction shortestWindowContainingSubsequence(source, pattern) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def shortest_window_containing_subsequence(source: str, pattern: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String shortestWindowContainingSubsequence(String source, String pattern) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string shortestWindowContainingSubsequence(string source, string pattern) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "source = \"abcdebdde\", pattern = \"bde\"",
        "expected": "bcde",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "source = \"axbycz\", pattern = \"abc\"",
        "expected": "axbyc",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "source = \"\", pattern = \"a\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "source = \"abc\", pattern = \"\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "source = \"ab\", pattern = \"abc\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "source = \"abc\", pattern = \"abc\"",
        "expected": "abc",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "source = \"aaabca\", pattern = \"ac\"",
        "expected": "abc",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-053",
    "title": "Count Substrings with Exactly K Digits",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window"
    ],
    "acceptance": "46.2%",
    "submissions": "12.2K",
    "description": "Count substrings containing exactly k ASCII digits. All other characters are unrestricted. Return a 64-bit integer.\n\n### Input Format\n- `text`: string\n- `k`: nonnegative integer\n\n### Output Format\nA 64-bit integer count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"a1b2\", k = 1",
        "output": "6",
        "explanation": "The six substrings containing exactly one digit are counted."
      },
      {
        "input": "text = \"123\", k = 2",
        "output": "2",
        "explanation": "The two length-two windows each contain exactly two digits."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "0 <= k <= len(text)"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {long}\n */\nfunction countSubstringsWithExactlyKDigits(text, k) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_substrings_with_exactly_k_digits(text: str, k: int) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countSubstringsWithExactlyKDigits(String text, int k) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countSubstringsWithExactlyKDigits(string text, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"a1b2\", k = 1",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"123\", k = 2",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", k = 1",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abc\", k = 0",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"1234\", k = 2",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"a1\", k = 3",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-054",
    "title": "Reconstruct a Word from Run-Length Tokens",
    "difficulty": "Medium",
    "topics": [
      "String"
    ],
    "acceptance": "47.6%",
    "submissions": "28.1K",
    "description": "Decode a sequence of tokens where each token consists of one lowercase letter followed by a positive decimal count. Expand each token by repeating its letter count times. Reject malformed tokens or a decoded length above max_output by returning null.\n\n### Input Format\n- `encoded`: token string\n- `max_output`: maximum decoded length\n\n### Output Format\nThe decoded string, or null for invalid/oversized input.\n\n### Expected Time Complexity\n`O(encoded length + output length)`\n\n### Expected Space Complexity\n`O(output length)`",
    "examples": [
      {
        "input": "encoded = \"a3b2c1\", max_output = 10",
        "output": "aaabbc",
        "explanation": "Each letter is repeated by its following count."
      },
      {
        "input": "encoded = \"x1y4\", max_output = 5",
        "output": "xyyyy",
        "explanation": "The decoded length is exactly five."
      }
    ],
    "constraints": [
      "encoded length <= 100000",
      "0 <= max_output <= 1000000",
      "Counts are positive and have no leading zeroes"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} encoded\n * @param {int} max_output\n * @return {string|null}\n */\nfunction decodeLetterCounts(encoded, max_output) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def decode_letter_counts(encoded: str, max_output: int) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String decodeLetterCounts(String encoded, int max_output) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string decodeLetterCounts(string encoded, int max_output) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "encoded = \"a3b2c1\", max_output = 10",
        "expected": "aaabbc",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "encoded = \"x1y4\", max_output = 5",
        "expected": "xyyyy",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "encoded = \"\", max_output = 0",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "encoded = \"a0\", max_output = 10",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "encoded = \"a03\", max_output = 10",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "encoded = \"a100\", max_output = 99",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "encoded = \"ab2\", max_output = 10",
        "expected": "null",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-055",
    "title": "Multiply Two Nonnegative Integer Texts",
    "difficulty": "Medium",
    "topics": [
      "String"
    ],
    "acceptance": "55.4%",
    "submissions": "18.7K",
    "description": "Multiply two nonnegative integers represented as decimal strings. Inputs may contain leading zeroes. Return the normalized decimal product without leading zeroes, except that zero is represented as \"0\".\n\n### Input Format\n- `a`: decimal digit string\n- `b`: decimal digit string\n\n### Output Format\nA normalized decimal product string.\n\n### Expected Time Complexity\n`O(n*m)`\n\n### Expected Space Complexity\n`O(n+m)`",
    "examples": [
      {
        "input": "a = \"123\", b = \"45\"",
        "output": "5535",
        "explanation": "123 multiplied by 45 equals 5535."
      },
      {
        "input": "a = \"0007\", b = \"08\"",
        "output": "56",
        "explanation": "Leading zeroes are ignored in the normalized result."
      }
    ],
    "constraints": [
      "1 <= len(a), len(b) <= 2000",
      "Inputs contain only decimal digits"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} a\n * @param {string} b\n * @return {string}\n */\nfunction multiplyIntegerStrings(a, b) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def multiply_integer_strings(a: str, b: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String multiplyIntegerStrings(String a, String b) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string multiplyIntegerStrings(string a, string b) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"123\", b = \"45\"",
        "expected": "5535",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"0007\", b = \"08\"",
        "expected": "56",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = \"0\", b = \"987\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = \"123\", b = \"0\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = \"9\", b = \"9\"",
        "expected": "81",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = \"00012\", b = \"0003\"",
        "expected": "36",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = \"99\", b = \"99\"",
        "expected": "9801",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-056",
    "title": "Add Signed Integer Texts",
    "difficulty": "Medium",
    "topics": [
      "String"
    ],
    "acceptance": "48.8%",
    "submissions": "8.0K",
    "description": "Add two signed base-10 integers represented as strings. Inputs may include an optional leading sign and leading zeroes. Return a canonical representation with no plus sign and no unnecessary leading zeroes.\n\n### Input Format\n- `a`: signed integer string\n- `b`: signed integer string\n\n### Output Format\nA canonical signed integer string.\n\n### Expected Time Complexity\n`O(n+m)`\n\n### Expected Space Complexity\n`O(max(n,m))`",
    "examples": [
      {
        "input": "a = \"-120\", b = \"45\"",
        "output": "-75",
        "explanation": "The magnitudes are subtracted because signs differ."
      },
      {
        "input": "a = \"00099\", b = \"1\"",
        "output": "100",
        "explanation": "Leading zeroes are removed from the result."
      }
    ],
    "constraints": [
      "1 <= len(a), len(b) <= 2000",
      "Each input is a valid signed decimal integer"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} a\n * @param {string} b\n * @return {string}\n */\nfunction addSignedIntegerStrings(a, b) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def add_signed_integer_strings(a: str, b: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String addSignedIntegerStrings(String a, String b) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string addSignedIntegerStrings(string a, string b) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"-120\", b = \"45\"",
        "expected": "-75",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"00099\", b = \"1\"",
        "expected": "100",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = \"0\", b = \"-0\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = \"-999\", b = \"999\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = \"-12\", b = \"-8\"",
        "expected": "-20",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = \"999\", b = \"1\"",
        "expected": "1000",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = \"+7\", b = \"-3\"",
        "expected": "4",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-057",
    "title": "Return the Longest Prefix Repeated at Least R Times",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Prefix Sum"
    ],
    "acceptance": "56.7%",
    "submissions": "29.2K",
    "description": "Find the longest nonempty prefix of text that occurs as a substring at least r times, allowing overlapping occurrences. If none qualifies, return an empty string.\n\n### Input Format\n- `text`: string\n- `r`: integer >= 1\n\n### Output Format\nThe longest qualifying prefix.\n\n### Expected Time Complexity\n`O(n^2) direct or O(n log n) with suffix structures`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"abcababc\", r = 2",
        "output": "abc",
        "explanation": "The prefix ab occurs at positions 0, 3, and 5."
      },
      {
        "input": "text = \"aaaaa\", r = 3",
        "output": "aaa",
        "explanation": "The prefix aaa occurs at positions 0, 1, and 2, with overlaps allowed."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "1 <= r <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} r\n * @return {string}\n */\nfunction longestPrefixRepeated(text, r) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_prefix_repeated(text: str, r: int) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String longestPrefixRepeated(String text, int r) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestPrefixRepeated(string text, int r) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abcababc\", r = 2",
        "expected": "abc",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaaaa\", r = 3",
        "expected": "aaa",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", r = 1",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", r = 1",
        "expected": "abc",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abc\", r = 5",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abcd\", r = 2",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaaa\", r = 2",
        "expected": "aaa",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-058",
    "title": "Minimum Adjacent Swaps to Group a Chosen Character",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Greedy",
      "Sliding Window"
    ],
    "acceptance": "53.3%",
    "submissions": "15.0K",
    "description": "Given a string and a chosen character ch, find the minimum number of adjacent swaps needed to make all occurrences of ch contiguous. Other characters may appear in any order. Return zero when ch occurs fewer than two times.\n\n### Input Format\n- `text`: string\n- `ch`: single character\n\n### Output Format\nAn integer minimum swap count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(number of occurrences)`",
    "examples": [
      {
        "input": "text = \"aXaaYa\", ch = \"a\"",
        "output": "2",
        "explanation": "The a positions can be shifted together with two adjacent swaps."
      },
      {
        "input": "text = \"xxxyxxx\", ch = \"x\"",
        "output": "3",
        "explanation": "All x characters are already in one contiguous block? They are separated by y, so the minimum is 1."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "ch has length one"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string} ch\n * @return {long}\n */\nfunction minimumAdjacentSwapsToGroup(text, ch) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def minimum_adjacent_swaps_to_group(text: str, ch: str) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object minimumAdjacentSwapsToGroup(String text, String ch) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto minimumAdjacentSwapsToGroup(string text, string ch) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aXaaYa\", ch = \"a\"",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"xxxyxxx\", ch = \"x\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", ch = \"a\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", ch = \"x\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abca\", ch = \"b\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"xxabxx\", ch = \"x\"",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaaa\", ch = \"a\"",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-059",
    "title": "Find the Longest Chain of Word Extensions",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "45.2%",
    "submissions": "28.8K",
    "description": "A word can follow another word if deleting exactly one character from the longer word produces the shorter word without changing the order of remaining characters. Find the maximum number of words in a chain from the input list. Duplicate entries may be used only once.\n\n### Input Format\n- `words`: array of lowercase strings\n\n### Output Format\nAn integer maximum chain length.\n\n### Expected Time Complexity\n`O(total characters * average word length)`\n\n### Expected Space Complexity\n`O(total words)`",
    "examples": [
      {
        "input": "words = [\"a\",\"ba\",\"bca\",\"bda\",\"bdca\"]",
        "output": "4",
        "explanation": "One longest chain is a → ba → bca → bdca."
      },
      {
        "input": "words = [\"at\",\"cat\",\"coat\",\"coast\"]",
        "output": "4",
        "explanation": "Each word can be obtained by inserting one character into its predecessor."
      }
    ],
    "constraints": [
      "1 <= words.length <= 20000",
      "1 <= len(words[i]) <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string[]} words\n * @return {int}\n */\nfunction longestWordExtensionChain(words) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_word_extension_chain(words: list[str]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestWordExtensionChain(String[] words) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestWordExtensionChain(vector<string>& words) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "words = [\"a\",\"ba\",\"bca\",\"bda\",\"bdca\"]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "words = [\"at\",\"cat\",\"coat\",\"coast\"]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "words = [\"solo\"]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "words = [\"cat\",\"dog\",\"sun\"]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "words = [\"abcd\",\"a\",\"abc\",\"ab\"]",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "words = [\"a\",\"a\",\"ab\"]",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "words = [\"a\",\"b\",\"c\"]",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-060",
    "title": "Find the Minimum Characters to Add at the End for a Target Prefix",
    "difficulty": "Medium",
    "topics": [
      "String"
    ],
    "acceptance": "44.2%",
    "submissions": "14.4K",
    "description": "Append the fewest characters to text so that target becomes a suffix of the resulting string. Characters already at the end of text may be reused as the beginning of target through overlap. Return the appended suffix.\n\n### Input Format\n- `text`: string\n- `target`: string\n\n### Output Format\nThe string that must be appended.\n\n### Expected Time Complexity\n`O(n+m)`\n\n### Expected Space Complexity\n`O(n+m)`",
    "examples": [
      {
        "input": "text = \"abracad\", target = \"cadabra\"",
        "output": "abra",
        "explanation": "The existing suffix cad overlaps the target prefix cad."
      },
      {
        "input": "text = \"hello\", target = \"world\"",
        "output": "world",
        "explanation": "No suffix-prefix overlap is available."
      }
    ],
    "constraints": [
      "0 <= len(text), len(target) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string} target\n * @return {string}\n */\nfunction appendToEndForTargetSuffix(text, target) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def append_to_end_for_target_suffix(text: str, target: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String appendToEndForTargetSuffix(String text, String target) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string appendToEndForTargetSuffix(string text, string target) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abracad\", target = \"cadabra\"",
        "expected": "abra",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"hello\", target = \"world\"",
        "expected": "world",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", target = \"\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", target = \"\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"\", target = \"abc\"",
        "expected": "abc",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abcXYZ\", target = \"XYZ\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"ababa\", target = \"aba\"",
        "expected": "",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-061",
    "title": "Find the First Non-Repeating Character After Updates",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Hash Table",
      "Array"
    ],
    "acceptance": "31.1%",
    "submissions": "10.7K",
    "description": "Process a sequence of operations on a mutable text: append one character or remove the final character. After each operation, report the first character whose current frequency is one, or null if none exists.\n\n### Input Format\n- `operations`: array of {type: append|pop, value for append}\n\n### Output Format\nAn array of character-or-null answers, one after each operation.\n\n### Expected Time Complexity\n`O(n) total with indexed counts and queue`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "operations = [{\"type\":\"append\",\"value\":\"a\"},{\"type\":\"append\",\"value\":\"b\"},{\"type\":\"append\",\"value\":\"a\"},{\"type\":\"pop\"}]",
        "output": "[\"a\",\"a\",\"b\",\"a\"]",
        "explanation": "The first unique character changes as the text is updated."
      },
      {
        "input": "operations = [{\"type\":\"append\",\"value\":\"x\"},{\"type\":\"append\",\"value\":\"x\"}]",
        "output": "[\"x\",null]",
        "explanation": "The second x makes every current character repeated."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100000",
      "pop is only issued when the text is nonempty"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {object[]} operations\n * @return {(string|null)[]}\n */\nfunction firstUniqueAfterEachUpdate(operations) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def first_unique_after_each_update(operations: dict) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String firstUniqueAfterEachUpdate(Object operations) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string firstUniqueAfterEachUpdate(auto operations) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "operations = [{\"type\":\"append\",\"value\":\"a\"},{\"type\":\"append\",\"value\":\"b\"},{\"type\":\"append\",\"value\":\"a\"},{\"type\":\"pop\"}]",
        "expected": "[\"a\",\"a\",\"b\",\"a\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "operations = [{\"type\":\"append\",\"value\":\"x\"},{\"type\":\"append\",\"value\":\"x\"}]",
        "expected": "[\"x\",null]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "operations = [{\"type\":\"append\",\"value\":\"q\"}]",
        "expected": "[\"q\"]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "operations = [{\"type\":\"append\",\"value\":\"q\"},{\"type\":\"append\",\"value\":\"q\"}]",
        "expected": "[\"q\",null]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "operations = [{\"type\":\"append\",\"value\":\"a\"},{\"type\":\"pop\"}]",
        "expected": "[\"a\",null]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "operations = [{\"type\":\"append\",\"value\":\"a\"},{\"type\":\"append\",\"value\":\"b\"},{\"type\":\"append\",\"value\":\"a\"},{\"type\":\"pop\"}]",
        "expected": "[\"a\",\"a\",\"b\",\"a\"]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "operations = [{\"type\":\"append\",\"value\":\"a\"},{\"type\":\"append\",\"value\":\"b\"},{\"type\":\"append\",\"value\":\"c\"}]",
        "expected": "[\"a\",\"a\",\"a\"]",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "str-062",
    "title": "Find the Longest Substring with Equal Letter and Digit Counts",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Prefix Sum",
      "Hash Table"
    ],
    "acceptance": "36.1%",
    "submissions": "12.3K",
    "description": "Find the maximum length of a contiguous substring containing the same number of ASCII letters and decimal digits. Other characters are not allowed inside a valid substring.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer maximum length.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"a1b2cX34\"",
        "output": "8",
        "explanation": "The substring a1b2 has two letters and two digits."
      },
      {
        "input": "text = \"123abc\"",
        "output": "6",
        "explanation": "The entire string contains three letters and three digits."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction longestEqualLetterDigitSubstring(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_equal_letter_digit_substring(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestEqualLetterDigitSubstring(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestEqualLetterDigitSubstring(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"a1b2cX34\"",
        "expected": "8",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"123abc\"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"123\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"a1\"",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"a-1\"",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "str-063",
    "title": "Count Substrings That Begin and End with the Same Symbol",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Math",
      "Hash Table"
    ],
    "acceptance": "34.7%",
    "submissions": "10.4K",
    "description": "Count nonempty substrings whose first and last characters are equal. Single-character substrings count. Return a 64-bit integer.\n\n### Input Format\n- `text`: string\n\n### Output Format\nA 64-bit integer count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(u)`",
    "examples": [
      {
        "input": "text = \"abca\"",
        "output": "5",
        "explanation": "The single-character substrings contribute four, and the substring a...a contributes one."
      },
      {
        "input": "text = \"aaaa\"",
        "output": "10",
        "explanation": "Every substring has matching endpoints."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 1000000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {long}\n */\nfunction countSameEndpointSubstrings(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_same_endpoint_substrings(text: str) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countSameEndpointSubstrings(String text) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countSameEndpointSubstrings(string text) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abca\"",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaaa\"",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"x\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abcd\"",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aba\"",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aA\"",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-064",
    "title": "Sort Characters by Frequency with Stable Ties",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Hash Table"
    ],
    "acceptance": "32.3%",
    "submissions": "10.4K",
    "description": "Rearrange text so characters appear in descending order of total frequency. When two characters have equal frequency, order them by the position of their first appearance in the original text. All copies of a character stay together.\n\n### Input Format\n- `text`: string\n\n### Output Format\nThe rearranged string.\n\n### Expected Time Complexity\n`O(n + u log u)`\n\n### Expected Space Complexity\n`O(u+n)`",
    "examples": [
      {
        "input": "text = \"treehouse\"",
        "output": "eeetrhous",
        "explanation": "Characters are grouped by frequency; equal-frequency groups follow first appearance."
      },
      {
        "input": "text = \"bbAa\"",
        "output": "bbAa",
        "explanation": "b and A each occur twice; b appears first."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {string}\n */\nfunction sortCharactersByStableFrequency(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def sort_characters_by_stable_frequency(text: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String sortCharactersByStableFrequency(String text) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string sortCharactersByStableFrequency(string text) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"treehouse\"",
        "expected": "eeetrhous",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"bbAa\"",
        "expected": "bbAa",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"z\"",
        "expected": "z",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"aaaa\"",
        "expected": "aaaa",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abcd\"",
        "expected": "abcd",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"!!aa??\"",
        "expected": "!!aa??",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "str-065",
    "title": "Find the Longest Substring with No Palindrome of Length Three",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Sliding Window"
    ],
    "acceptance": "35.7%",
    "submissions": "8.8K",
    "description": "Find the longest contiguous substring that contains no palindromic substring of length exactly three. A length-three palindrome occurs when the first and third characters are equal.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer maximum length.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"abacdef\"",
        "output": "6",
        "explanation": "The longest valid substring is cdef; any window containing aba is invalid."
      },
      {
        "input": "text = \"abcdef\"",
        "output": "6",
        "explanation": "No length-three palindrome exists."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction longestWithoutLengthThreePalindrome(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_without_length_three_palindrome(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestWithoutLengthThreePalindrome(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestWithoutLengthThreePalindrome(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abacdef\"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"abcdef\"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"ab\"",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"aaaa\"",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abcde\"",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abcdc\"",
        "expected": "4",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-066",
    "title": "Generate a Canonical Token Signature",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Sorting",
      "Array"
    ],
    "acceptance": "28.9%",
    "submissions": "12.3K",
    "description": "For each input word, normalize it by converting ASCII letters to lowercase, removing nonletters, and sorting the remaining letters. Return the signatures in input order.\n\n### Input Format\n- `words`: array of strings\n\n### Output Format\nAn array of normalized signature strings.\n\n### Expected Time Complexity\n`O(total characters log maximum word length)`\n\n### Expected Space Complexity\n`O(total characters)`",
    "examples": [
      {
        "input": "words = [\"Dormitory!\",\"Dirty room\",\"Listen\",\"Silent\"]",
        "output": "[\"dimoorrty\",\"dimoorrty\",\"eilnst\",\"eilnst\"]",
        "explanation": "Punctuation and spaces are removed before sorting."
      },
      {
        "input": "words = [\"123\",\"---\",\"A-b\"]",
        "output": "[\"\",\"\",\"ab\"]",
        "explanation": "Only ASCII letters participate."
      }
    ],
    "constraints": [
      "0 <= words.length <= 20000",
      "0 <= len(words[i]) <= 10000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string[]} words\n * @return {string[]}\n */\nfunction canonicalLetterSignatures(words) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def canonical_letter_signatures(words: list[str]) -> list[str]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String[] canonicalLetterSignatures(String[] words) {\n        // Write your solution here\n        return new String[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> canonicalLetterSignatures(vector<string>& words) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "words = [\"Dormitory!\",\"Dirty room\",\"Listen\",\"Silent\"]",
        "expected": "[\"dimoorrty\",\"dimoorrty\",\"eilnst\",\"eilnst\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "words = [\"123\",\"---\",\"A-b\"]",
        "expected": "[\"\",\"\",\"ab\"]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "words = []",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "words = [\"\"]",
        "expected": "[\"\"]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "words = [\"!? 42\"]",
        "expected": "[\"\"]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "words = [\"AaBb\"]",
        "expected": "[\"aabb\"]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "words = [\"banana\"]",
        "expected": "[\"aaabnn\"]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-067",
    "title": "Find the Maximum Score from Non-Overlapping Word Matches",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "33.1%",
    "submissions": "6.6K",
    "description": "Given text and a dictionary whose entries each have a positive score, choose non-overlapping occurrences of dictionary words in text to maximize the sum of their scores. A position may be unused. Return the maximum score.\n\n### Input Format\n- `text`: string\n- `entries`: array of {word, score}\n\n### Output Format\nA nonnegative integer maximum score.\n\n### Expected Time Complexity\n`O(n * maxWordLength * dictionary lookup)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"ababa\", entries = [{\"word\":\"aba\",\"score\":5},{\"word\":\"ba\",\"score\":3},{\"word\":\"a\",\"score\":1}]",
        "output": "8",
        "explanation": "The disjoint matches aba and ba can be selected for a total score of eight."
      },
      {
        "input": "text = \"catdog\", entries = [{\"word\":\"cat\",\"score\":4},{\"word\":\"dog\",\"score\":7}]",
        "output": "11",
        "explanation": "Both non-overlapping words can be selected."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 5000",
      "1 <= entries.length <= 5000",
      "1 <= len(word) <= 100",
      "1 <= score <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {object[]} entries\n * @return {int}\n */\nfunction maximumNonOverlappingWordScore(text, entries) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def maximum_non_overlapping_word_score(text: str, entries: dict) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maximumNonOverlappingWordScore(String text, Object entries) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maximumNonOverlappingWordScore(string text, auto entries) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"ababa\", entries = [{\"word\":\"aba\",\"score\":5},{\"word\":\"ba\",\"score\":3},{\"word\":\"a\",\"score\":1}]",
        "expected": "8",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"catdog\", entries = [{\"word\":\"cat\",\"score\":4},{\"word\":\"dog\",\"score\":7}]",
        "expected": "11",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", entries = [{\"word\":\"a\",\"score\":1}]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"xyz\", entries = [{\"word\":\"cat\",\"score\":9}]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"cat\", entries = [{\"word\":\"cat\",\"score\":5}]",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aaaa\", entries = [{\"word\":\"aaa\",\"score\":5},{\"word\":\"aa\",\"score\":4}]",
        "expected": "8",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"hi\", entries = [{\"word\":\"hi\",\"score\":2},{\"word\":\"hi\",\"score\":5}]",
        "expected": "5",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-068",
    "title": "Check Whether Two Strings Interleave",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "acceptance": "28.2%",
    "submissions": "5.2K",
    "description": "Determine whether target can be formed by interleaving all characters of a and b while preserving the relative order of characters from each source. Every character from both sources must be used exactly once.\n\n### Input Format\n- `a`: string\n- `b`: string\n- `target`: string\n\n### Output Format\nA boolean.\n\n### Expected Time Complexity\n`O(n*m)`\n\n### Expected Space Complexity\n`O(min(n,m))`",
    "examples": [
      {
        "input": "a = \"abc\", b = \"XYZ\", target = \"aXbYcZ\"",
        "output": "true",
        "explanation": "Characters from each source remain in their original order."
      },
      {
        "input": "a = \"abc\", b = \"XYZ\", target = \"aXbZcY\"",
        "output": "false",
        "explanation": "The order of Y and Z from the second source is reversed."
      }
    ],
    "constraints": [
      "0 <= len(a), len(b) <= 2000",
      "len(target) <= 4000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} a\n * @param {string} b\n * @param {string} target\n * @return {bool}\n */\nfunction isInterleaving(a, b, target) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def is_interleaving(a: str, b: str, target: str) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean isInterleaving(String a, String b, String target) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isInterleaving(string a, string b, string target) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"abc\", b = \"XYZ\", target = \"aXbYcZ\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"abc\", b = \"XYZ\", target = \"aXbZcY\"",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = \"\", b = \"\", target = \"\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = \"a\", b = \"b\", target = \"a\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = \"abc\", b = \"\", target = \"abc\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = \"aa\", b = \"a\", target = \"aaa\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = \"ab\", b = \"cd\", target = \"abce\"",
        "expected": "false",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-069",
    "title": "Count Distinct Subsequences Modulo a Prime",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming",
      "Hash Table"
    ],
    "acceptance": "35.2%",
    "submissions": "3.3K",
    "description": "Count distinct nonempty subsequence strings of text, modulo 1000000007. Different index selections that produce the same resulting string count only once.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer between 0 and 1000000006.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(26)`",
    "examples": [
      {
        "input": "text = \"aba\"",
        "output": "6",
        "explanation": "The distinct nonempty subsequences are a, b, aa, ab, ba, and aba."
      },
      {
        "input": "text = \"aaa\"",
        "output": "3",
        "explanation": "The distinct nonempty strings are a, aa, and aaa."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 200000",
      "text contains lowercase English letters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction countDistinctNonemptySubsequences(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_distinct_nonempty_subsequences(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countDistinctNonemptySubsequences(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countDistinctNonemptySubsequences(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aba\"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaa\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"x\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abc\"",
        "expected": "7",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aaaa\"",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abab\"",
        "expected": "11",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-070",
    "title": "Find the Longest Substring with At Least K Copies of Every Used Character",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Divide and Conquer",
      "Hash Table"
    ],
    "acceptance": "38.8%",
    "submissions": "3.6K",
    "description": "Find the maximum length of a substring in which every character that appears in the substring occurs at least k times. A character absent from the substring imposes no condition.\n\n### Input Format\n- `text`: lowercase string\n- `k`: positive integer\n\n### Output Format\nAn integer maximum length.\n\n### Expected Time Complexity\n`O(26*n) divide-and-conquer or O(26*n) window counts`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"aaabbcc\", k = 3",
        "output": "3",
        "explanation": "Only aaa qualifies as a length-three substring meeting the frequency requirement."
      },
      {
        "input": "text = \"ababbc\", k = 2",
        "output": "5",
        "explanation": "The substring ababb has a count of a=2 and b=3."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 10000",
      "1 <= k <= 10000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {int}\n */\nfunction longestSubstringEveryUsedCharacterAtLeastK(text, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_substring_every_used_character_at_least_k(text: str, k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestSubstringEveryUsedCharacterAtLeastK(String text, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestSubstringEveryUsedCharacterAtLeastK(string text, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aaabbcc\", k = 3",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"ababbc\", k = 2",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 2",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", k = 1",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abc\", k = 4",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"zzzz\", k = 2",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaabcc\", k = 3",
        "expected": "3",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-071",
    "title": "Find the Minimum Number of Words in a Segmentation",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming",
      "Array",
      "Hash Table"
    ],
    "acceptance": "37.7%",
    "submissions": "4.4K",
    "description": "Segment text into dictionary words while minimizing the number of words used. Return -1 if no complete segmentation exists. Dictionary words may be reused.\n\n### Input Format\n- `text`: string\n- `dictionary`: array of distinct nonempty strings\n\n### Output Format\nMinimum word count, or -1 if impossible; empty text returns 0.\n\n### Expected Time Complexity\n`O(n^2) expected with dictionary lookup`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"pineapplepenapple\", dictionary = [\"pine\",\"pineapple\",\"pen\",\"apple\",\"applepen\"]",
        "output": "3",
        "explanation": "A minimum segmentation is pineapple + pen + apple."
      },
      {
        "input": "text = \"aaaa\", dictionary = [\"a\",\"aa\",\"aaa\"]",
        "output": "2",
        "explanation": "Two words aa + aa are sufficient."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 5000",
      "1 <= dictionary.length <= 10000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string[]} dictionary\n * @return {int}\n */\nfunction minimumWordsToSegment(text, dictionary) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def minimum_words_to_segment(text: str, dictionary: list[str]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minimumWordsToSegment(String text, String[] dictionary) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minimumWordsToSegment(string text, vector<string>& dictionary) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"pineapplepenapple\", dictionary = [\"pine\",\"pineapple\",\"pen\",\"apple\",\"applepen\"]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaaa\", dictionary = [\"a\",\"aa\",\"aaa\"]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", dictionary = [\"a\"]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"catsandog\", dictionary = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"home\", dictionary = [\"home\",\"h\",\"ome\"]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abc\", dictionary = [\"a\",\"b\",\"c\"]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaaaaa\", dictionary = [\"aa\",\"aaa\"]",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-072",
    "title": "Minimum Adjacent Swaps to Transform One Anagram into Another",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Greedy",
      "Tree"
    ],
    "acceptance": "37.8%",
    "submissions": "5.8K",
    "description": "Given two strings that contain the same character multiset, find the minimum number of adjacent swaps needed to transform source into target. If their character multisets differ, return -1. Duplicate characters must be matched in their left-to-right occurrence order.\n\n### Input Format\n- `source`: string\n- `target`: string\n\n### Output Format\nA 64-bit minimum swap count, or -1.\n\n### Expected Time Complexity\n`O(n log n) using a Fenwick tree`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "source = \"aabb\", target = \"bbaa\"",
        "output": "4",
        "explanation": "Moving the two b characters before both a characters takes four adjacent swaps."
      },
      {
        "input": "source = \"aabc\", target = \"abac\"",
        "output": "1",
        "explanation": "Swapping the second a with b produces the target in one move."
      }
    ],
    "constraints": [
      "0 <= len(source), len(target) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} source\n * @param {string} target\n * @return {long}\n */\nfunction minimumAdjacentSwapsBetweenAnagrams(source, target) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def minimum_adjacent_swaps_between_anagrams(source: str, target: str) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object minimumAdjacentSwapsBetweenAnagrams(String source, String target) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto minimumAdjacentSwapsBetweenAnagrams(string source, string target) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "source = \"aabb\", target = \"bbaa\"",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "source = \"aabc\", target = \"abac\"",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "source = \"\", target = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "source = \"abc\", target = \"ab\"",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "source = \"aab\", target = \"abb\"",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "source = \"listen\", target = \"listen\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "source = \"aabb\", target = \"abab\"",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-073",
    "title": "Find All Maximal Runs Meeting a Threshold",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Array"
    ],
    "acceptance": "36.6%",
    "submissions": "5.2K",
    "description": "Return every maximal run whose length is at least k, in left-to-right order. Each result contains the character, inclusive start index, and run length.\n\n### Input Format\n- `text`: string\n- `k`: positive integer\n\n### Output Format\nAn array of {character, start_index, length} objects.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(number of qualifying runs)`",
    "examples": [
      {
        "input": "text = \"aaabbccccd\", k = 3",
        "output": "[{\"character\":\"a\",\"start_index\":0,\"length\":3},{\"character\":\"c\",\"start_index\":4,\"length\":4}]",
        "explanation": "Only maximal runs of length at least three are returned."
      },
      {
        "input": "text = \"xxxyyyz\", k = 3",
        "output": "[{\"character\":\"x\",\"start_index\":0,\"length\":3},{\"character\":\"y\",\"start_index\":3,\"length\":3}]",
        "explanation": "Both qualifying runs are reported in order."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "1 <= k <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {object[]}\n */\nfunction maximalRunsAtLeastK(text, k) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def maximal_runs_at_least_k(text: str, k: int) -> dict:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object maximalRunsAtLeastK(String text, int k) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto maximalRunsAtLeastK(string text, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aaabbccccd\", k = 3",
        "expected": "[{\"character\":\"a\",\"start_index\":0,\"length\":3},{\"character\":\"c\",\"start_index\":4,\"length\":4}]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"xxxyyyz\", k = 3",
        "expected": "[{\"character\":\"x\",\"start_index\":0,\"length\":3},{\"character\":\"y\",\"start_index\":3,\"length\":3}]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 1",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"aaaa\", k = 5",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"bbbbb\", k = 5",
        "expected": "[{\"character\":\"b\",\"start_index\":0,\"length\":5}]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abcd\", k = 2",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abccc\", k = 3",
        "expected": "[{\"character\":\"c\",\"start_index\":2,\"length\":3}]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-074",
    "title": "Find the Longest Substring with No Repeated Adjacent Pair",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Sliding Window"
    ],
    "acceptance": "38.5%",
    "submissions": "12.3K",
    "description": "Find the longest contiguous substring in which no adjacent pair of characters is equal. The same character may appear again later as long as equal copies are not adjacent.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer maximum length.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"aabccde\"",
        "output": "3",
        "explanation": "The longest valid substring is bcde."
      },
      {
        "input": "text = \"ababa\"",
        "output": "5",
        "explanation": "No equal adjacent pair exists."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction longestWithoutEqualNeighbors(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_without_equal_neighbors(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestWithoutEqualNeighbors(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestWithoutEqualNeighbors(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aabccde\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"ababa\"",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"x\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"aaaa\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"ababab\"",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abca\"",
        "expected": "4",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-075",
    "title": "Reconstruct a String from Unordered Overlapping Fragments",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Graph",
      "Array"
    ],
    "acceptance": "34.8%",
    "submissions": "11.5K",
    "description": "Each fragment is a length-k substring of an unknown original string, and every fragment must be used exactly once. Reorder the fragments so the suffix of each fragment except the last equals the prefix of the next fragment except the first. Return the lexicographically smallest assembled string when an arrangement exists; otherwise return null. If several identical fragments appear, each occurrence is a separate fragment.\n\n### Input Format\n- `fragments`: array of equal-length strings\n\n### Output Format\nThe assembled string, or null if no valid arrangement exists. An empty array returns an empty string.\n\n### Expected Time Complexity\n`O(E log E) for sorting adjacency choices plus Euler path construction`\n\n### Expected Space Complexity\n`O(total fragment length)`",
    "examples": [
      {
        "input": "fragments = [\"abc\",\"bcd\",\"cde\"]",
        "output": "abcde",
        "explanation": "The fragments connect through their overlapping two-character boundaries."
      },
      {
        "input": "fragments = [\"ab\",\"ba\"]",
        "output": "aba",
        "explanation": "The two directed overlaps form an Euler trail that spells aba."
      }
    ],
    "constraints": [
      "0 <= fragments.length <= 100000",
      "1 <= fragment length <= 100",
      "All fragments have the same length"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string[]} fragments\n * @return {string|null}\n */\nfunction reconstructFromOverlappingFragments(fragments) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def reconstruct_from_overlapping_fragments(fragments: list[str]) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String reconstructFromOverlappingFragments(String[] fragments) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string reconstructFromOverlappingFragments(vector<string>& fragments) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "fragments = [\"abc\",\"bcd\",\"cde\"]",
        "expected": "abcde",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "fragments = [\"ab\",\"ba\"]",
        "expected": "aba",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "fragments = []",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "fragments = [\"code\"]",
        "expected": "code",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "fragments = [\"ab\",\"cd\"]",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "fragments = [\"aa\",\"aa\"]",
        "expected": "aaa",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "fragments = [\"ab\",\"ac\",\"ca\"]",
        "expected": "acab",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-076",
    "title": "Find the Maximum Score by Deleting Adjacent Pairs",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Greedy",
      "Stack"
    ],
    "acceptance": "30.1%",
    "submissions": "12.3K",
    "description": "You may repeatedly delete any adjacent pair of equal characters, earning the supplied score for that character. Each character has a nonnegative score. Return the maximum total score obtainable after any sequence of deletions.\n\n### Input Format\n- `text`: string\n- `scores`: map from character to nonnegative integer\n\n### Output Format\nA 64-bit integer maximum score.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"abbaac\", scores = {\"a\":2,\"b\":5,\"c\":1}",
        "output": "7",
        "explanation": "Deleting bb earns 5; the remaining three a characters allow one aa deletion earning 2."
      },
      {
        "input": "text = \"aabb\", scores = {\"a\":3,\"b\":4}",
        "output": "7",
        "explanation": "One aa pair and one bb pair can both be removed."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "Every character in text has a score",
      "0 <= score <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {map} scores\n * @return {long}\n */\nfunction maximumScoreDeletingEqualPairs(text, scores) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def maximum_score_deleting_equal_pairs(text: str, scores: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object maximumScoreDeletingEqualPairs(String text, Object scores) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto maximumScoreDeletingEqualPairs(string text, auto scores) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abbaac\", scores = {\"a\":2,\"b\":5,\"c\":1}",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aabb\", scores = {\"a\":3,\"b\":4}",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", scores = {}",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", scores = {\"a\":1,\"b\":1,\"c\":1}",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"xx\", scores = {\"x\":9}",
        "expected": "9",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abccba\", scores = {\"a\":1,\"b\":2,\"c\":3}",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aabb\", scores = {\"a\":0,\"b\":0}",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-077",
    "title": "Check Whether a String Is a Rotation by Block Shift",
    "difficulty": "Hard",
    "topics": [
      "String"
    ],
    "acceptance": "30.0%",
    "submissions": "11.5K",
    "description": "Determine whether candidate can be formed by cutting text at one position and swapping the two resulting blocks. The cut may be at either end. Empty strings are rotations of each other.\n\n### Input Format\n- `text`: string\n- `candidate`: string\n\n### Output Format\nA boolean.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n) or O(1) with two-way matching`",
    "examples": [
      {
        "input": "text = \"rotation\", candidate = \"tionrota\"",
        "output": "true",
        "explanation": "Cutting before the suffix tion produces tionrota."
      },
      {
        "input": "text = \"abc\", candidate = \"acb\"",
        "output": "false",
        "explanation": "The candidate cannot be obtained by one cyclic cut."
      }
    ],
    "constraints": [
      "0 <= len(text), len(candidate) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string} candidate\n * @return {bool}\n */\nfunction isBlockRotation(text, candidate) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def is_block_rotation(text: str, candidate: str) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean isBlockRotation(String text, String candidate) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isBlockRotation(string text, string candidate) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"rotation\", candidate = \"tionrota\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"abc\", candidate = \"acb\"",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", candidate = \"\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", candidate = \"ab\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abc\", candidate = \"abc\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aaaa\", candidate = \"aaaa\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"x\", candidate = \"x\"",
        "expected": "true",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-078",
    "title": "Count Distinct Character Pairs with a Fixed Distance",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Math",
      "Hash Table"
    ],
    "acceptance": "39.4%",
    "submissions": "9.6K",
    "description": "Count unordered pairs of distinct character values whose first-occurrence positions differ by exactly d. A character value contributes only its first position; repeated later occurrences are ignored.\n\n### Input Format\n- `text`: string\n- `d`: nonnegative integer\n\n### Output Format\nAn integer pair count.\n\n### Expected Time Complexity\n`O(n + u)`\n\n### Expected Space Complexity\n`O(u)`",
    "examples": [
      {
        "input": "text = \"abacbd\", d = 2",
        "output": "2",
        "explanation": "First positions are a=0, b=1, c=3, d=5; pairs at distance two are (b,c) and (c,d)."
      },
      {
        "input": "text = \"abcde\", d = 1",
        "output": "4",
        "explanation": "Each neighboring pair of first-occurrence positions qualifies."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "0 <= d <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} d\n * @return {int}\n */\nfunction countFirstPositionPairs(text, d) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_first_position_pairs(text: str, d: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countFirstPositionPairs(String text, int d) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countFirstPositionPairs(string text, int d) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abacbd\", d = 2",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"abcde\", d = 1",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", d = 1",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", d = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"aaaa\", d = 1",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abc\", d = 10",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aabbcc\", d = 2",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-079",
    "title": "Find the Minimum Number of Character Replacements for Alternating Parity",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Greedy"
    ],
    "acceptance": "32.1%",
    "submissions": "8.8K",
    "description": "Given a string of decimal digits, replace as few digits as possible so adjacent digits alternate between even and odd. Return the minimum replacement count; each replacement may choose any decimal digit of the opposite parity.\n\n### Input Format\n- `digits`: decimal digit string\n\n### Output Format\nAn integer minimum replacement count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "digits = \"11234\"",
        "output": "1",
        "explanation": "The parity sequence is odd, odd, even, odd, even; one of the first two digits and one later position must change to form alternation."
      },
      {
        "input": "digits = \"2468\"",
        "output": "2",
        "explanation": "Four even digits require at least three replacements."
      }
    ],
    "constraints": [
      "0 <= len(digits) <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} digits\n * @return {int}\n */\nfunction minimumReplacementsForAlternatingParity(digits) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def minimum_replacements_for_alternating_parity(digits: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minimumReplacementsForAlternatingParity(String digits) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minimumReplacementsForAlternatingParity(string digits) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "digits = \"11234\"",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "digits = \"2468\"",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "digits = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "digits = \"7\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "digits = \"1234\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "digits = \"0000\"",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "digits = \"999\"",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-080",
    "title": "Find the Longest Substring with a Bounded Number of Vowels",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Sliding Window"
    ],
    "acceptance": "30.1%",
    "submissions": "12.6K",
    "description": "Find the longest contiguous substring containing at most k vowels. Vowels are a, e, i, o, u in either case; all other characters are non-vowels.\n\n### Input Format\n- `text`: string\n- `k`: nonnegative integer\n\n### Output Format\nAn integer maximum length.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "text = \"beautifulday\", k = 3",
        "output": "8",
        "explanation": "The longest valid window has at most three vowels."
      },
      {
        "input": "text = \"rhythm\", k = 0",
        "output": "6",
        "explanation": "There are no vowels, so the whole string qualifies."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "0 <= k <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {int}\n */\nfunction longestSubstringAtMostKVowels(text, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_substring_at_most_k_vowels(text: str, k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestSubstringAtMostKVowels(String text, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestSubstringAtMostKVowels(string text, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"beautifulday\", k = 3",
        "expected": "8",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"rhythm\", k = 0",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 1",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"aei\", k = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"hello\", k = 10",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aeiou\", k = 2",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"AbCdE\", k = 1",
        "expected": "4",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-081",
    "title": "Weighted Edit Distance with Position-Dependent Costs",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming",
      "Array",
      "Matrix"
    ],
    "acceptance": "36.2%",
    "submissions": "13.7K",
    "description": "Transform source into target using insertions, deletions, and substitutions. The cost of each operation depends on the current target position: insertion costs insert_cost[j], deletion costs delete_cost[i], and substitution costs substitute_cost[i][j]. Return the minimum total cost.\n\n### Input Format\n- `source`: string\n- `target`: string\n- `insert_cost`: array indexed by target gap\n- `delete_cost`: array indexed by source character\n- `substitute_cost`: matrix source length x target length\n\n### Output Format\nA 64-bit minimum cost.\n\n### Expected Time Complexity\n`O(n*m)`\n\n### Expected Space Complexity\n`O(min(n,m)) when costs are accessible by index`",
    "examples": [
      {
        "input": "source = \"ab\", target = \"ac\", insert_cost = [1,1,1], delete_cost = [1,1], substitute_cost = [[2,3],[3,1]]",
        "output": "1",
        "explanation": "Only b needs substitution at its aligned position, costing one."
      },
      {
        "input": "source = \"a\", target = \"ba\", insert_cost = [2,2,2], delete_cost = [3], substitute_cost = [[5,5]]",
        "output": "2",
        "explanation": "Inserting b before a is cheaper than replacing a."
      }
    ],
    "constraints": [
      "0 <= len(source), len(target) <= 500",
      "All costs are nonnegative integers <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} source\n * @param {any} target\n * @param {any} costs\n * @return {long}\n */\nfunction weightedEditDistance(source, target, costs) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def weighted_edit_distance(source: Any, target: Any, costs: Any) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object weightedEditDistance(Object source, Object target, Object costs) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto weightedEditDistance(auto source, auto target, auto costs) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "source = \"ab\", target = \"ac\", insert_cost = [1,1,1], delete_cost = [1,1], substitute_cost = [[2,3],[3,1]]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "source = \"a\", target = \"ba\", insert_cost = [2,2,2], delete_cost = [3], substitute_cost = [[5,5]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "source = \"\", target = \"\", insert_cost = [1], delete_cost = [], substitute_cost = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "source = \"abc\", target = \"\", insert_cost = [1], delete_cost = [2,2,2], substitute_cost = [[],[],[]]",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "source = \"\", target = \"xyz\", insert_cost = [1,2,3], delete_cost = [], substitute_cost = []",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "source = \"abc\", target = \"abc\", insert_cost = [9,9,9,9], delete_cost = [9,9,9], substitute_cost = [[9,9,9],[9,9,9],[9,9,9]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "source = \"a\", target = \"b\", insert_cost = [5,5], delete_cost = [5], substitute_cost = [[0]]",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-082",
    "title": "Build the Lexicographically Smallest Shortest Common Supersequence",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming",
      "Graph"
    ],
    "acceptance": "32.9%",
    "submissions": "4.1K",
    "description": "Return the lexicographically smallest among all shortest strings that contain a and b as subsequences. The alphabet is ASCII and comparison is byte-wise.\n\n### Input Format\n- `a`: string\n- `b`: string\n\n### Output Format\nA lexicographically smallest shortest common supersequence.\n\n### Expected Time Complexity\n`O(n*m + output length)`\n\n### Expected Space Complexity\n`O(n*m)`",
    "examples": [
      {
        "input": "a = \"abac\", b = \"cab\"",
        "output": "cabac",
        "explanation": "The result is shortest and lexicographically smaller than other shortest candidates."
      },
      {
        "input": "a = \"ab\", b = \"ac\"",
        "output": "abc",
        "explanation": "Both inputs are subsequences, and abc is the lexicographically smallest shortest result."
      }
    ],
    "constraints": [
      "0 <= len(a), len(b) <= 2000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} a\n * @param {string} b\n * @return {string}\n */\nfunction smallestShortestCommonSupersequence(a, b) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def smallest_shortest_common_supersequence(a: str, b: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String smallestShortestCommonSupersequence(String a, String b) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string smallestShortestCommonSupersequence(string a, string b) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"abac\", b = \"cab\"",
        "expected": "cabac",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"ab\", b = \"ac\"",
        "expected": "abc",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = \"\", b = \"\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = \"abc\", b = \"\"",
        "expected": "abc",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = \"same\", b = \"same\"",
        "expected": "same",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = \"ab\", b = \"CD\"",
        "expected": "CDab",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = \"abc\", b = \"ac\"",
        "expected": "abc",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-083",
    "title": "Count Distinct Palindromic Subsequences",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming",
      "Hash Table"
    ],
    "acceptance": "37.6%",
    "submissions": "3.3K",
    "description": "Count distinct nonempty palindromic subsequence strings in text. Different index selections that produce the same palindrome count once. Return the exact count as an arbitrary-precision integer.\n\n### Input Format\n- `text`: string\n\n### Output Format\nA nonnegative integer count.\n\n### Expected Time Complexity\n`O(n^2) with next/previous occurrence tables`\n\n### Expected Space Complexity\n`O(n^2)`",
    "examples": [
      {
        "input": "text = \"bccb\"",
        "output": "6",
        "explanation": "The distinct palindromic subsequences are b, c, bb, cc, bcb, and bccb."
      },
      {
        "input": "text = \"aaa\"",
        "output": "3",
        "explanation": "The distinct palindromic subsequences are a, aa, and aaa."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 1000",
      "text contains lowercase English letters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {big_integer}\n */\nfunction countDistinctPalindromicSubsequences(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_distinct_palindromic_subsequences(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countDistinctPalindromicSubsequences(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countDistinctPalindromicSubsequences(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"bccb\"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaa\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"x\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"ab\"",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aaaa\"",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abc\"",
        "expected": "3",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-084",
    "title": "Find the Minimum Palindrome Partition Count",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "acceptance": "29.0%",
    "submissions": "13.4K",
    "description": "Partition text into the fewest nonempty contiguous palindromic substrings. Return the minimum number of pieces; empty text requires zero pieces.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn integer minimum piece count.\n\n### Expected Time Complexity\n`O(n^2) using palindrome expansion or DP`\n\n### Expected Space Complexity\n`O(n^2) or O(n)`",
    "examples": [
      {
        "input": "text = \"aabcc\"",
        "output": "3",
        "explanation": "One optimal partition is aa | b | cc."
      },
      {
        "input": "text = \"racecar\"",
        "output": "1",
        "explanation": "The entire string is a palindrome."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 3000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {int}\n */\nfunction minimumPalindromePieces(text) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def minimum_palindrome_pieces(text: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minimumPalindromePieces(String text) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minimumPalindromePieces(string text) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aabcc\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"racecar\"",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"z\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"aaaa\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abcd\"",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abccbaX\"",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-085",
    "title": "Partition into Exactly K Palindromes with Minimum Replacements",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "acceptance": "31.5%",
    "submissions": "14.5K",
    "description": "Change the fewest characters so text can be partitioned into exactly k nonempty contiguous palindromic pieces. Return -1 if k is outside the feasible range.\n\n### Input Format\n- `text`: string\n- `k`: number of pieces\n\n### Output Format\nAn integer minimum replacement count, or -1.\n\n### Expected Time Complexity\n`O(k*n^2)`\n\n### Expected Space Complexity\n`O(k*n)`",
    "examples": [
      {
        "input": "text = \"abc\", k = 2",
        "output": "1",
        "explanation": "One optimal partition is a | bc, with one change to make bc palindromic."
      },
      {
        "input": "text = \"abc\", k = 1",
        "output": "1",
        "explanation": "Changing the middle? For a single palindrome abc needs one replacement to make aba or cbc."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 1000",
      "0 <= k <= len(text)"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {int}\n */\nfunction minimumChangesForKPalindromePieces(text, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def minimum_changes_for_k_palindrome_pieces(text: str, k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minimumChangesForKPalindromePieces(String text, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minimumChangesForKPalindromePieces(string text, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abc\", k = 2",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"abc\", k = 1",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"\", k = 1",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abcd\", k = 4",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"racecar\", k = 1",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abc\", k = 4",
        "expected": "-1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-086",
    "title": "Match a Pattern with Literals, Dot, and Repetition Operators",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "acceptance": "28.8%",
    "submissions": "11.5K",
    "description": "Implement full-string matching for a pattern where a literal matches itself, dot matches any single character, and an immediately following asterisk means zero or more repetitions of the preceding atom. The entire text must match.\n\n### Input Format\n- `text`: string\n- `pattern`: string using literals, dot, and asterisk\n\n### Output Format\nA boolean match result.\n\n### Expected Time Complexity\n`O(n*m)`\n\n### Expected Space Complexity\n`O(n*m) or O(m)`",
    "examples": [
      {
        "input": "text = \"aab\", pattern = \"c*a*b\"",
        "output": "true",
        "explanation": "c* matches zero c characters, a* matches aa, and b matches b."
      },
      {
        "input": "text = \"miss\", pattern = \"mis.\"",
        "output": "true",
        "explanation": "The dot matches the final s."
      }
    ],
    "constraints": [
      "0 <= len(text), len(pattern) <= 500",
      "Asterisk always follows a valid atom and never repeats directly"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string} pattern\n * @return {bool}\n */\nfunction matchesSimpleRegularExpression(text, pattern) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def matches_simple_regular_expression(text: str, pattern: str) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean matchesSimpleRegularExpression(String text, String pattern) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool matchesSimpleRegularExpression(string text, string pattern) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aab\", pattern = \"c*a*b\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"miss\", pattern = \"mis.\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", pattern = \"\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"\", pattern = \"a*\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abc\", pattern = \"ab\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"x\", pattern = \".\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaaa\", pattern = \"a*\"",
        "expected": "true",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-087",
    "title": "Match a Glob Pattern with Character Classes and Escapes",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "acceptance": "32.1%",
    "submissions": "8.2K",
    "description": "Implement full-string glob matching. Question mark matches one character; asterisk matches any sequence, including empty; [abc] matches one listed character; [a-z] matches a range; and backslash escapes the next pattern character. Malformed classes or a trailing escape make the pattern invalid and return false.\n\n### Input Format\n- `text`: string\n- `pattern`: glob expression\n\n### Output Format\nA boolean.\n\n### Expected Time Complexity\n`O(n*m) dynamic programming`\n\n### Expected Space Complexity\n`O(n*m) or O(m)`",
    "examples": [
      {
        "input": "text = \"file7.txt\", pattern = \"file[0-9].*\"",
        "output": "true",
        "explanation": "The class matches 7 and the final star matches .txt."
      },
      {
        "input": "text = \"report?.csv\", pattern = \"report\\\\?.csv\"",
        "output": "true",
        "explanation": "The escaped question mark is treated literally."
      }
    ],
    "constraints": [
      "0 <= len(text), len(pattern) <= 2000",
      "Character classes are nonempty and use ascending ASCII ranges"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string} pattern\n * @return {bool}\n */\nfunction matchesAdvancedGlob(text, pattern) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def matches_advanced_glob(text: str, pattern: str) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean matchesAdvancedGlob(String text, String pattern) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool matchesAdvancedGlob(string text, string pattern) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"file7.txt\", pattern = \"file[0-9].*\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"report?.csv\", pattern = \"report\\\\?.csv\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", pattern = \"\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"\", pattern = \"*\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"\", pattern = \"?\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"a\", pattern = \"[abc\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"a\", pattern = \"a\\\\\"",
        "expected": "false",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-088",
    "title": "Find the Longest Repeated Substring Without Overlap",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Binary Search",
      "Hash Table",
      "Graph"
    ],
    "acceptance": "34.2%",
    "submissions": "5.8K",
    "description": "Find the maximum length of a substring that occurs at least twice in text using two non-overlapping occurrences. If several substrings have the same maximum length, return the lexicographically smallest. Return an empty string if no repeated nonempty fragment exists.\n\n### Input Format\n- `text`: string\n\n### Output Format\nThe selected substring.\n\n### Expected Time Complexity\n`O(n log n) expected with rolling hash and binary search`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"banana\"",
        "output": "an",
        "explanation": "The two occurrences of an can be chosen without overlapping."
      },
      {
        "input": "text = \"abcabcx\"",
        "output": "abc",
        "explanation": "The fragments abc at positions zero and three do not overlap."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 50000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {string}\n */\nfunction longestNonOverlappingRepeatedSubstring(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_non_overlapping_repeated_substring(text: str) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String longestNonOverlappingRepeatedSubstring(String text) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestNonOverlappingRepeatedSubstring(string text) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"banana\"",
        "expected": "an",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"abcabcx\"",
        "expected": "abc",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"a\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abcd\"",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"xyzxyz\"",
        "expected": "xyz",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaaa\"",
        "expected": "aa",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "str-089",
    "title": "Return the K-th Lexicographic Distinct Substring",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Math",
      "Array",
      "Hash Table",
      "Graph"
    ],
    "acceptance": "37.9%",
    "submissions": "6.3K",
    "description": "List all distinct nonempty substrings of text in lexicographic order and return the one-based k-th item. Return null if k is out of range. Lexicographic ordering uses ASCII comparison.\n\n### Input Format\n- `text`: string\n- `k`: one-based integer\n\n### Output Format\nA substring string or null.\n\n### Expected Time Complexity\n`O(n log n) or O(n^2) with suffix array and LCP`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"aba\", k = 3",
        "output": "aba",
        "explanation": "The distinct substrings in order are a, ab, aba, b, ba."
      },
      {
        "input": "text = \"banana\", k = 5",
        "output": "anana",
        "explanation": "The fifth lexicographic distinct substring is anana."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 5000",
      "1 <= k <= 1000000000000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {long} k\n * @return {string|null}\n */\nfunction kthDistinctSubstring(text, k) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def kth_distinct_substring(text: str, k: Any) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String kthDistinctSubstring(String text, Object k) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string kthDistinctSubstring(string text, auto k) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aba\", k = 3",
        "expected": "aba",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"banana\", k = 5",
        "expected": "anana",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 1",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", k = 0",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abc\", k = 99",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"x\", k = 1",
        "expected": "x",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaaa\", k = 3",
        "expected": "aaa",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-090",
    "title": "Build a Suffix Array and Adjacent LCP Values",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Array",
      "Graph"
    ],
    "acceptance": "32.4%",
    "submissions": "11.8K",
    "description": "Construct the suffix array of text: the starting indices of all suffixes in lexicographic order. Also return lcp[i], the longest common prefix length of suffixes at suffix_array[i] and suffix_array[i-1], with lcp[0] equal to zero.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn object {suffix_array: integer[], lcp: integer[]}.\n\n### Expected Time Complexity\n`O(n log n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "text = \"banana\"",
        "output": "{\"suffix_array\":[5,3,1,0,4,2],\"lcp\":[0,1,3,0,0,2]}",
        "explanation": "Suffixes are sorted lexicographically; LCP stores neighboring common-prefix lengths."
      },
      {
        "input": "text = \"aba\"",
        "output": "{\"suffix_array\":[2,0,1],\"lcp\":[0,1,0]}",
        "explanation": "The suffixes a, aba, and ba are in lexicographic order."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 100000",
      "text contains ASCII characters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {object}\n */\nfunction buildSuffixArrayAndLCP(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def build_suffix_array_and_l_c_p(text: str) -> dict:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object buildSuffixArrayAndLCP(String text) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto buildSuffixArrayAndLCP(string text) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"banana\"",
        "expected": "{\"suffix_array\":[5,3,1,0,4,2],\"lcp\":[0,1,3,0,0,2]}",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aba\"",
        "expected": "{\"suffix_array\":[2,0,1],\"lcp\":[0,1,0]}",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "{\"suffix_array\":[],\"lcp\":[]}",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"z\"",
        "expected": "{\"suffix_array\":[0],\"lcp\":[0]}",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"aaa\"",
        "expected": "{\"suffix_array\":[2,1,0],\"lcp\":[0,1,2]}",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abc\"",
        "expected": "{\"suffix_array\":[0,1,2],\"lcp\":[0,0,0]}",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abab\"",
        "expected": "{\"suffix_array\":[2,0,3,1],\"lcp\":[0,2,0,1]}",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-091",
    "title": "Find the Lexicographically Smallest Rotation and Its Start Index",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Graph"
    ],
    "acceptance": "36.6%",
    "submissions": "5.2K",
    "description": "Among all cyclic rotations of text, find the lexicographically smallest rotation and return both the rotated string and its starting index in the original text. If multiple starts produce the same smallest rotation, return the smallest index. Empty text returns an empty string and index zero.\n\n### Input Format\n- `text`: string\n\n### Output Format\nAn object {rotation: string, start_index: integer}.\n\n### Expected Time Complexity\n`O(n) using a two-candidate algorithm`\n\n### Expected Space Complexity\n`O(n) for returned rotation; O(1) auxiliary`",
    "examples": [
      {
        "input": "text = \"baca\"",
        "output": "{\"rotation\":\"abac\",\"start_index\":3}",
        "explanation": "The rotation starting at index three is smallest."
      },
      {
        "input": "text = \"aaaa\"",
        "output": "{\"rotation\":\"aaaa\",\"start_index\":0}",
        "explanation": "All rotations tie, so index zero wins."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 1000000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @return {object}\n */\nfunction minimalRotationWithIndex(text) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def minimal_rotation_with_index(text: str) -> dict:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object minimalRotationWithIndex(String text) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto minimalRotationWithIndex(string text) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"baca\"",
        "expected": "{\"rotation\":\"abac\",\"start_index\":3}",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaaa\"",
        "expected": "{\"rotation\":\"aaaa\",\"start_index\":0}",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\"",
        "expected": "{\"rotation\":\"\",\"start_index\":0}",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"q\"",
        "expected": "{\"rotation\":\"q\",\"start_index\":0}",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abcd\"",
        "expected": "{\"rotation\":\"abcd\",\"start_index\":0}",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"caba\"",
        "expected": "{\"rotation\":\"abac\",\"start_index\":1}",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abab\"",
        "expected": "{\"rotation\":\"abab\",\"start_index\":0}",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-092",
    "title": "Find the Minimum Window Containing Multiple Subsequences",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "38.9%",
    "submissions": "4.7K",
    "description": "Given source and an array of required patterns, find the shortest contiguous substring of source in which every pattern appears as a subsequence. Patterns may share source positions. Break ties by choosing the leftmost window. Return an empty string if any pattern cannot be embedded.\n\n### Input Format\n- `source`: string\n- `patterns`: array of nonempty strings\n\n### Output Format\nThe shortest covering substring or empty string.\n\n### Expected Time Complexity\n`O(patterns * n * maxPatternLength) or optimized DP`\n\n### Expected Space Complexity\n`O(patterns*n)`",
    "examples": [
      {
        "input": "source = \"abacbdc\", patterns = [\"abc\",\"bd\"]",
        "output": "acbdc",
        "explanation": "The window contains abc as a subsequence and bd as a subsequence."
      },
      {
        "input": "source = \"axbycz\", patterns = [\"abc\",\"xyz\"]",
        "output": "axbycz",
        "explanation": "Both required patterns can be embedded in the whole source."
      }
    ],
    "constraints": [
      "0 <= len(source) <= 5000",
      "1 <= patterns.length <= 10",
      "1 <= len(patterns[i]) <= 100"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} source\n * @param {string[]} patterns\n * @return {string}\n */\nfunction minimumWindowForAllSubsequences(source, patterns) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def minimum_window_for_all_subsequences(source: str, patterns: list[str]) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String minimumWindowForAllSubsequences(String source, String[] patterns) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minimumWindowForAllSubsequences(string source, vector<string>& patterns) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "source = \"abacbdc\", patterns = [\"abc\",\"bd\"]",
        "expected": "acbdc",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "source = \"axbycz\", patterns = [\"abc\",\"xyz\"]",
        "expected": "axbycz",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "source = \"\", patterns = [\"a\"]",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "source = \"abc\", patterns = []",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "source = \"abc\", patterns = [\"z\",\"ab\"]",
        "expected": "",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "source = \"abc\", patterns = [\"abc\"]",
        "expected": "abc",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "source = \"abc\", patterns = [\"ac\",\"bc\"]",
        "expected": "abc",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-093",
    "title": "Count All Shortest Transformation Sequences",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Graph",
      "Array",
      "Hash Table"
    ],
    "acceptance": "30.1%",
    "submissions": "12.6K",
    "description": "Given begin_word, end_word, and a dictionary of equal-length words, each step may change exactly one character and must produce a dictionary word. Return the number of distinct shortest transformation sequences. The end word must be in the dictionary.\n\n### Input Format\n- `begin_word`: string\n- `end_word`: string\n- `dictionary`: array of equal-length strings\n\n### Output Format\nA nonnegative integer sequence count.\n\n### Expected Time Complexity\n`O(N*L*alphabet + edges)`\n\n### Expected Space Complexity\n`O(N*L)`",
    "examples": [
      {
        "input": "begin_word = \"cold\", end_word = \"warm\", dictionary = [\"cord\",\"card\",\"ward\",\"warm\",\"word\",\"worm\"]",
        "output": "2",
        "explanation": "Two shortest paths are cold→cord→card→ward→warm and cold→cord→word→worm→warm."
      },
      {
        "input": "begin_word = \"a\", end_word = \"c\", dictionary = [\"b\",\"c\"]",
        "output": "1",
        "explanation": "Only a→c changes one character in one step."
      }
    ],
    "constraints": [
      "1 <= word length <= 10",
      "1 <= dictionary.length <= 50000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} begin_word\n * @param {any} end_word\n * @param {any} dictionary\n * @return {int}\n */\nfunction countShortestWordTransformations(begin_word, end_word, dictionary) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_shortest_word_transformations(begin_word: Any, end_word: Any, dictionary: Any) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countShortestWordTransformations(Object begin_word, Object end_word, Object dictionary) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countShortestWordTransformations(auto begin_word, auto end_word, auto dictionary) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "begin_word = \"cold\", end_word = \"warm\", dictionary = [\"cord\",\"card\",\"ward\",\"warm\",\"word\",\"worm\"]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "begin_word = \"a\", end_word = \"c\", dictionary = [\"b\",\"c\"]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "begin_word = \"same\", end_word = \"same\", dictionary = [\"same\"]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "begin_word = \"hit\", end_word = \"cog\", dictionary = [\"hot\",\"dot\"]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "begin_word = \"aaa\", end_word = \"bbb\", dictionary = [\"aab\",\"xxx\"]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "begin_word = \"cat\", end_word = \"dog\", dictionary = [\"cot\",\"cog\",\"dog\"]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "begin_word = \"hit\", end_word = \"cog\", dictionary = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-094",
    "title": "Determine Whether Two Strings Are Scramble Equivalent",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Greedy"
    ],
    "acceptance": "34.4%",
    "submissions": "7.4K",
    "description": "Two strings are scramble-equivalent if one can be transformed into the other by recursively splitting a string into two nonempty parts and optionally swapping the parts at any split. Determine whether a and b are scramble-equivalent.\n\n### Input Format\n- `a`: string\n- `b`: string\n\n### Output Format\nA boolean.\n\n### Expected Time Complexity\n`O(n^4) memoized interval DP with pruning`\n\n### Expected Space Complexity\n`O(n^3)`",
    "examples": [
      {
        "input": "a = \"great\", b = \"rgeat\"",
        "output": "true",
        "explanation": "A sequence of recursive splits and swaps transforms great into rgeat."
      },
      {
        "input": "a = \"abcde\", b = \"caebd\"",
        "output": "false",
        "explanation": "No valid recursive split-and-swap sequence produces the second string."
      }
    ],
    "constraints": [
      "0 <= len(a), len(b) <= 30",
      "Strings contain lowercase English letters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} a\n * @param {string} b\n * @return {bool}\n */\nfunction areScrambleEquivalent(a, b) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def are_scramble_equivalent(a: str, b: str) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean areScrambleEquivalent(String a, String b) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool areScrambleEquivalent(string a, string b) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"great\", b = \"rgeat\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"abcde\", b = \"caebd\"",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = \"\", b = \"\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = \"abc\", b = \"ab\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = \"x\", b = \"x\"",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = \"x\", b = \"y\"",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = \"aabb\", b = \"abbb\"",
        "expected": "false",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-095",
    "title": "Count the Number of Interleavings of Two Sources",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming",
      "Hash Table"
    ],
    "acceptance": "29.4%",
    "submissions": "5.5K",
    "description": "Count the distinct ways to interleave all characters of a and b to produce target while preserving order within each source. Different choices of source indices count as different ways, even when characters are equal. Return the exact count.\n\n### Input Format\n- `a`: string\n- `b`: string\n- `target`: string\n\n### Output Format\nAn arbitrary-precision integer count.\n\n### Expected Time Complexity\n`O(n*m)`\n\n### Expected Space Complexity\n`O(min(n,m))`",
    "examples": [
      {
        "input": "a = \"aa\", b = \"a\", target = \"aaa\"",
        "output": "3",
        "explanation": "Any one of the three target positions can be supplied by b."
      },
      {
        "input": "a = \"ab\", b = \"cd\", target = \"acbd\"",
        "output": "1",
        "explanation": "Only one source-choice sequence preserves both source orders."
      }
    ],
    "constraints": [
      "0 <= len(a), len(b) <= 2000",
      "len(target) = len(a) + len(b)"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} a\n * @param {string} b\n * @param {string} target\n * @return {big_integer}\n */\nfunction countInterleavings(a, b, target) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_interleavings(a: str, b: str, target: str) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countInterleavings(String a, String b, String target) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countInterleavings(string a, string b, string target) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"aa\", b = \"a\", target = \"aaa\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"ab\", b = \"cd\", target = \"acbd\"",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = \"\", b = \"\", target = \"\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = \"a\", b = \"b\", target = \"a\"",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = \"abc\", b = \"\", target = \"abc\"",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = \"aa\", b = \"aa\", target = \"aaaa\"",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = \"ab\", b = \"cd\", target = \"acbe\"",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-096",
    "title": "Compress a String with Optimal Deletions",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming"
    ],
    "acceptance": "33.6%",
    "submissions": "11.2K",
    "description": "Delete at most k characters and then run-length encode the remaining string as each character followed by its count when the count exceeds one. Return the minimum possible encoded length. The empty remaining string has encoded length zero.\n\n### Input Format\n- `text`: string\n- `k`: maximum deletions\n\n### Output Format\nAn integer minimum encoded length.\n\n### Expected Time Complexity\n`O(n^2*k)`\n\n### Expected Space Complexity\n`O(n*k)`",
    "examples": [
      {
        "input": "text = \"aaabcccd\", k = 2",
        "output": "4",
        "explanation": "Deleting b and d yields aaaccc, encoded as a3c3 with length four."
      },
      {
        "input": "text = \"abcdef\", k = 2",
        "output": "4",
        "explanation": "Deleting two characters leaves four singleton runs, encoded length four."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 200",
      "0 <= k <= len(text)"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {int} k\n * @return {int}\n */\nfunction minimumEncodedLengthAfterDeletions(text, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def minimum_encoded_length_after_deletions(text: str, k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minimumEncodedLengthAfterDeletions(String text, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minimumEncodedLengthAfterDeletions(string text, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"aaabcccd\", k = 2",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"abcdef\", k = 2",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", k = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", k = 3",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"aaaa\"",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"abcd\", k = 0",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"aaaaaaaaaa\", k = 1",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-097",
    "title": "Find the Shortest String Containing Every Required Pattern",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Trie",
      "Array",
      "Graph"
    ],
    "acceptance": "32.1%",
    "submissions": "8.5K",
    "description": "Given a list of up to eight required nonempty patterns over a small alphabet, construct the shortest string that contains every pattern as a contiguous substring. Among shortest answers, return the lexicographically smallest. Patterns may overlap.\n\n### Input Format\n- `patterns`: array of 1 to 8 strings\n\n### Output Format\nA shortest containing string.\n\n### Expected Time Complexity\n`O(2^p * p^2 * L^2) using overlap DP`\n\n### Expected Space Complexity\n`O(2^p * p)`",
    "examples": [
      {
        "input": "patterns = [\"abc\",\"bcd\",\"cde\"]",
        "output": "abcde",
        "explanation": "The patterns overlap by two characters in sequence."
      },
      {
        "input": "patterns = [\"ab\",\"ba\"]",
        "output": "aba",
        "explanation": "Either aba or bab is shortest; aba is lexicographically smaller."
      }
    ],
    "constraints": [
      "1 <= patterns.length <= 8",
      "1 <= len(patterns[i]) <= 20",
      "Patterns contain lowercase English letters"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string[]} patterns\n * @return {string}\n */\nfunction shortestStringContainingPatterns(patterns) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def shortest_string_containing_patterns(patterns: list[str]) -> str:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public String shortestStringContainingPatterns(String[] patterns) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string shortestStringContainingPatterns(vector<string>& patterns) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "patterns = [\"abc\",\"bcd\",\"cde\"]",
        "expected": "abcde",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "patterns = [\"ab\",\"ba\"]",
        "expected": "aba",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "patterns = [\"hello\"]",
        "expected": "hello",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "patterns = [\"abc\",\"abc\"]",
        "expected": "abc",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "patterns = [\"bc\",\"abcd\"]",
        "expected": "abcd",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "patterns = [\"z\",\"a\"]",
        "expected": "az",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "patterns = [\"aaaa\",\"aaab\",\"baaa\"]",
        "expected": "baaaab",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-098",
    "title": "Find the Longest Substring Avoiding a Forbidden Pattern Set",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Sliding Window",
      "Array"
    ],
    "acceptance": "28.1%",
    "submissions": "4.7K",
    "description": "Given text and a set of forbidden nonempty patterns, find the longest substring that contains none of the forbidden patterns as a substring. If several windows have equal length, return the leftmost window.\n\n### Input Format\n- `text`: string\n- `forbidden`: array of nonempty strings\n\n### Output Format\nAn object {substring: string, start_index: integer, length: integer}.\n\n### Expected Time Complexity\n`O(n + total pattern length + matches) using Aho-Corasick and window bounds`\n\n### Expected Space Complexity\n`O(total pattern length + n)`",
    "examples": [
      {
        "input": "text = \"abccxyzab\", forbidden = [\"cc\",\"xyz\"]",
        "output": "{\"substring\":\"zab\",\"start_index\":6,\"length\":3}",
        "explanation": "The first forbidden occurrence ends early; the best valid substring has length two."
      },
      {
        "input": "text = \"abcdef\", forbidden = [\"xy\",\"zz\"]",
        "output": "{\"substring\":\"abcdef\",\"start_index\":0,\"length\":6}",
        "explanation": "No forbidden pattern appears."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 200000",
      "1 <= forbidden.length <= 5000",
      "Total forbidden length <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {string[]} forbidden\n * @return {object}\n */\nfunction longestSubstringAvoidingPatterns(text, forbidden) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def longest_substring_avoiding_patterns(text: str, forbidden: list[str]) -> dict:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object longestSubstringAvoidingPatterns(String text, String[] forbidden) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto longestSubstringAvoidingPatterns(string text, vector<string>& forbidden) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"abccxyzab\", forbidden = [\"cc\",\"xyz\"]",
        "expected": "{\"substring\":\"zab\",\"start_index\":6,\"length\":3}",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"abcdef\", forbidden = [\"xy\",\"zz\"]",
        "expected": "{\"substring\":\"abcdef\",\"start_index\":0,\"length\":6}",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", forbidden = [\"a\"]",
        "expected": "{\"substring\":\"\",\"start_index\":0,\"length\":0}",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", forbidden = []",
        "expected": "{\"substring\":\"abc\",\"start_index\":0,\"length\":3}",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"abc\", forbidden = [\"abc\"]",
        "expected": "{\"substring\":\"ab\",\"start_index\":0,\"length\":2}",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"banana\", forbidden = [\"a\"]",
        "expected": "{\"substring\":\"b\",\"start_index\":0,\"length\":1}",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"abXXcd\", forbidden = [\"XX\"]",
        "expected": "{\"substring\":\"ab\",\"start_index\":0,\"length\":2}",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-099",
    "title": "Evaluate Expressions with Unary Signs and Exponentiation",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Stack"
    ],
    "acceptance": "28.7%",
    "submissions": "10.4K",
    "description": "Evaluate an expression containing nonnegative integer literals, unary plus and minus, binary +, -, *, /, exponentiation ^, and parentheses. Exponentiation is right-associative and has higher precedence than unary signs; division truncates toward zero. Return an integer. Invalid expressions are outside the input contract.\n\n### Input Format\n- `expression`: valid arithmetic expression string\n\n### Output Format\nAn integer result.\n\n### Expected Time Complexity\n`O(n) parsing plus big-integer arithmetic cost`\n\n### Expected Space Complexity\n`O(n) parser stack`",
    "examples": [
      {
        "input": "expression = \"-2^2 + 3*(4-1)\"",
        "output": "5",
        "explanation": "Exponentiation precedes unary minus: -4 + 9 = 5."
      },
      {
        "input": "expression = \"2^3^2\"",
        "output": "512",
        "explanation": "Exponentiation is right-associative: 2^(3^2)."
      }
    ],
    "constraints": [
      "1 <= len(expression) <= 10000",
      "Intermediate absolute values fit signed 64-bit",
      "Division by zero does not occur",
      "Exponents are nonnegative integers <= 10"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} expression\n * @return {long}\n */\nfunction evaluateAdvancedExpression(expression) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def evaluate_advanced_expression(expression: str) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object evaluateAdvancedExpression(String expression) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto evaluateAdvancedExpression(string expression) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "expression = \"-2^2 + 3*(4-1)\"",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "expression = \"2^3^2\"",
        "expected": "512",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "expression = \"42\"",
        "expected": "42",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "expression = \"((2+3)*4)\"",
        "expected": "20",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "expression = \"7*-2\"",
        "expected": "-14",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "expression = \"-7/3\"",
        "expected": "-2",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "expression = \"2^2^3\"",
        "expected": "256",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "str-100",
    "title": "Find the Minimum-Cost Segmentation with Word-Specific Penalties",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Dynamic Programming",
      "Trie",
      "Array",
      "Graph"
    ],
    "acceptance": "28.5%",
    "submissions": "8.8K",
    "description": "Segment text completely into dictionary words. Each dictionary entry has a positive usage cost and may be reused. Minimize total cost; among equal-cost segmentations, minimize the number of words; among remaining ties, choose the lexicographically smallest sequence of words. Return the chosen words and total cost, or null if segmentation is impossible.\n\n### Input Format\n- `text`: string\n- `entries`: array of {word, cost}\n\n### Output Format\nAn object {words: string[], total_cost: integer}, or null.\n\n### Expected Time Complexity\n`O(n * maxWordLength * log D)`\n\n### Expected Space Complexity\n`O(n + dictionary size)`",
    "examples": [
      {
        "input": "text = \"pineapplepenapple\", entries = [{\"word\":\"pine\",\"cost\":2},{\"word\":\"apple\",\"cost\":3},{\"word\":\"pineapple\",\"cost\":4},{\"word\":\"pen\",\"cost\":1}]",
        "output": "{\"words\":[\"pineapple\",\"pen\",\"apple\"],\"total_cost\":8}",
        "explanation": "The selected segmentation has total cost four + one + three."
      },
      {
        "input": "text = \"aaaa\", entries = [{\"word\":\"a\",\"cost\":2},{\"word\":\"aa\",\"cost\":3},{\"word\":\"aaa\",\"cost\":8}]",
        "output": "{\"words\":[\"aa\",\"aa\"],\"total_cost\":6}",
        "explanation": "Two aa words cost six, less than four single-character words."
      }
    ],
    "constraints": [
      "0 <= len(text) <= 10000",
      "1 <= entries.length <= 20000",
      "1 <= len(word) <= 100",
      "1 <= cost <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} text\n * @param {object[]} entries\n * @return {object|null}\n */\nfunction minimumCostLexicographicSegmentation(text, entries) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def minimum_cost_lexicographic_segmentation(text: str, entries: dict) -> dict:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object minimumCostLexicographicSegmentation(String text, Object entries) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto minimumCostLexicographicSegmentation(string text, auto entries) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"pineapplepenapple\", entries = [{\"word\":\"pine\",\"cost\":2},{\"word\":\"apple\",\"cost\":3},{\"word\":\"pineapple\",\"cost\":4},{\"word\":\"pen\",\"cost\":1}]",
        "expected": "{\"words\":[\"pineapple\",\"pen\",\"apple\"],\"total_cost\":8}",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"aaaa\", entries = [{\"word\":\"a\",\"cost\":2},{\"word\":\"aa\",\"cost\":3},{\"word\":\"aaa\",\"cost\":8}]",
        "expected": "{\"words\":[\"aa\",\"aa\"],\"total_cost\":6}",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "text = \"\", entries = [{\"word\":\"a\",\"cost\":1}]",
        "expected": "{\"words\":[],\"total_cost\":0}",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "text = \"abc\", entries = [{\"word\":\"ab\",\"cost\":1}]",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "text = \"home\", entries = [{\"word\":\"home\",\"cost\":5},{\"word\":\"ho\",\"cost\":2},{\"word\":\"me\",\"cost\":4}]",
        "expected": "{\"words\":[\"home\"],\"total_cost\":5}",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "text = \"aaaa\", entries = [{\"word\":\"a\",\"cost\":1},{\"word\":\"aa\",\"cost\":2}]",
        "expected": "{\"words\":[\"aa\",\"aa\"],\"total_cost\":4}",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "text = \"ab\", entries = [{\"word\":\"a\",\"cost\":1},{\"word\":\"ab\",\"cost\":2},{\"word\":\"b\",\"cost\":1}]",
        "expected": "{\"words\":[\"ab\"],\"total_cost\":2}",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-001",
    "title": "Count Positive Elements",
    "difficulty": "Easy",
    "topics": [
      "Array"
    ],
    "acceptance": "70.6%",
    "submissions": "31.0K",
    "description": "Given an integer array nums, return the number of elements strictly greater than zero. Zero is not positive.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nAn integer count.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [-2,0,4,7,-1]",
        "output": "2",
        "explanation": "Only 4 and 7 are strictly positive."
      },
      {
        "input": "nums = [3,5,8]",
        "output": "3",
        "explanation": "Every element is positive."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction countPositive(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_positive(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countPositive(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countPositive(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [-2,0,4,7,-1]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3,5,8]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [0,0,0]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [-9,-1,-4]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [-3,0,2]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-1000000000,1000000000]",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-002",
    "title": "Second Largest Distinct Value",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "acceptance": "65.9%",
    "submissions": "34.1K",
    "description": "Given an integer array nums, return its second-largest distinct value. Return null when fewer than two distinct values exist.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe second-largest distinct integer, or null.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [8,3,8,5,2]",
        "output": "5",
        "explanation": "The distinct values in descending order begin with 8 and 5."
      },
      {
        "input": "nums = [-7,-2,-9]",
        "output": "-7",
        "explanation": "-2 is largest and -7 is second largest."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer | null}\n */\nfunction secondLargestDistinct(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def second_largest_distinct(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int secondLargestDistinct(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int secondLargestDistinct(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [8,3,8,5,2]",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [-7,-2,-9]",
        "expected": "-7",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [4]",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [6,6,6]",
        "expected": "null",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,1,9,9]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-10,-3,-8]",
        "expected": "-8",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-003",
    "title": "Rotate Array Left",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Math"
    ],
    "acceptance": "70.2%",
    "submissions": "22.4K",
    "description": "Given an array nums and a non-negative integer k, rotate the array left by k positions. Return the rotated array. Rotating an empty array returns an empty array.\n\n### Input Format\n- `nums`: Integer array\n- `k`: Non-negative rotation count\n\n### Output Format\nA new array containing nums rotated left by k positions.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n) for returned array`",
    "examples": [
      {
        "input": "nums = [1,2,3,4,5], k = 2",
        "output": "[3,4,5,1,2]",
        "explanation": "The first two elements move to the end."
      },
      {
        "input": "nums = [10,-1,7], k = 1",
        "output": "[-1,7,10]",
        "explanation": "One left rotation shifts the first element to the end."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "0 <= k <= 10^18",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer[]}\n */\nfunction rotateLeft(nums, k) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def rotate_left(nums: list[int], k: int) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] rotateLeft(int[] nums, int k) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> rotateLeft(vector<int>& nums, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,3,4,5], k = 2",
        "expected": "[3,4,5,1,2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [10,-1,7], k = 1",
        "expected": "[-1,7,10]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [], k = 8",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [1,2,3], k = 0",
        "expected": "[1,2,3]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [4,5,6], k = 3",
        "expected": "[4,5,6]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,2,3,4], k = 10",
        "expected": "[3,4,1,2]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-5], k = 999",
        "expected": "[-5]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-004",
    "title": "Move Zeroes to the End",
    "difficulty": "Easy",
    "topics": [
      "Array"
    ],
    "acceptance": "77.2%",
    "submissions": "27.3K",
    "description": "Given an integer array nums, move every zero to the end while preserving the relative order of all non-zero elements. Modify the array in place and return it.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe modified array with non-zero elements in original order followed by all zeroes.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1) auxiliary space`",
    "examples": [
      {
        "input": "nums = [0,1,0,3,12]",
        "output": "[1,3,12,0,0]",
        "explanation": "Non-zero values retain their original order."
      },
      {
        "input": "nums = [2,0,-1,0,4]",
        "output": "[2,-1,4,0,0]",
        "explanation": "Negative non-zero values remain in sequence."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer[]}\n */\nfunction moveZeroes(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def move_zeroes(nums: list[int]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] moveZeroes(int[] nums) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> moveZeroes(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [0,1,0,3,12]",
        "expected": "[1,3,12,0,0]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [2,0,-1,0,4]",
        "expected": "[2,-1,4,0,0]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [3,-1,5]",
        "expected": "[3,-1,5]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [0,0,0]",
        "expected": "[0,0,0]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [0,2,0,3,0]",
        "expected": "[2,3,0,0,0]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [0]",
        "expected": "[0]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-005",
    "title": "Longest Run of Ones",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "String"
    ],
    "acceptance": "62.4%",
    "submissions": "39.2K",
    "description": "Given a binary array nums, return the length of the longest contiguous run of 1s.\n\n### Input Format\n- `nums`: Array containing only 0 and 1\n\n### Output Format\nThe maximum length of a contiguous run of ones.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [1,1,0,1,1,1]",
        "output": "3",
        "explanation": "The final run contains three consecutive ones."
      },
      {
        "input": "nums = [1,1,1,1]",
        "output": "4",
        "explanation": "The entire array is one run."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "nums[i] is either 0 or 1"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction longestOnes(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_ones(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestOnes(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestOnes(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,1,0,1,1,1]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,1,1,1]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [0,0,0]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,0,1,0,1]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [0,0,1,1,1]",
        "expected": "3",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-006",
    "title": "Transpose a Rectangular Matrix",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "76.3%",
    "submissions": "38.7K",
    "description": "Given an m by n matrix, return its transpose. The transpose has n rows and m columns, with element (i, j) equal to the original element (j, i). An empty matrix returns an empty matrix.\n\n### Input Format\n- `matrix`: Rectangular matrix of integers\n\n### Output Format\nA new matrix representing the transpose.\n\n### Expected Time Complexity\n`O(m*n)`\n\n### Expected Space Complexity\n`O(m*n) for output`",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6]]",
        "output": "[[1,4],[2,5],[3,6]]",
        "explanation": "Rows become columns."
      },
      {
        "input": "matrix = [[7,-2]]",
        "output": "[[7],[-2]]",
        "explanation": "A one-row matrix becomes a one-column matrix."
      }
    ],
    "constraints": [
      "0 <= m, n <= 1000",
      "-10^9 <= matrix[i][j] <= 10^9",
      "If m is zero, matrix is []"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {integer[][]}\n */\nfunction transpose(matrix) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def transpose(matrix: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[][] transpose(int[][] matrix) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> transpose(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,2,3],[4,5,6]]",
        "expected": "[[1,4],[2,5],[3,6]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[7,-2]]",
        "expected": "[[7],[-2]]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = []",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[5,8,9]]",
        "expected": "[[5],[8],[9]]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[2],[4],[6]]",
        "expected": "[[2,4,6]]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[-3]]",
        "expected": "[[-3]]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[0,-1],[2,-3]]",
        "expected": "[[0,2],[-1,-3]]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-007",
    "title": "Sum of Both Matrix Diagonals",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "66.5%",
    "submissions": "20.4K",
    "description": "Given a square integer matrix, return the sum of its primary diagonal and secondary diagonal. If the matrix has odd size, count the center cell only once.\n\n### Input Format\n- `matrix`: n by n integer matrix\n\n### Output Format\nA single integer diagonal sum.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "25",
        "explanation": "The diagonal cells sum to 1+5+9+3+7; the center is counted once."
      },
      {
        "input": "matrix = [[1,2],[3,4]]",
        "output": "10",
        "explanation": "For even n, the two diagonals do not overlap."
      }
    ],
    "constraints": [
      "1 <= n <= 1000",
      "-10^6 <= matrix[i][j] <= 10^6"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {integer}\n */\nfunction diagonalSum(matrix) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def diagonal_sum(matrix: list[list[int]]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int diagonalSum(int[][] matrix) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int diagonalSum(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "expected": "25",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1,2],[3,4]]",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[-6]]",
        "expected": "-6",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[0,0],[0,0]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[1,0,2],[0,-5,0],[3,0,4]]",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[1,2],[3,4]]",
        "expected": "10",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[1000000,0],[0,-1000000]]",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-008",
    "title": "Merge Two Sorted Arrays",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "64.3%",
    "submissions": "23.6K",
    "description": "Given two non-decreasing integer arrays a and b, return one non-decreasing array containing every element from both inputs, including duplicates.\n\n### Input Format\n- `a`: First non-decreasing integer array\n- `b`: Second non-decreasing integer array\n\n### Output Format\nA merged non-decreasing integer array.\n\n### Expected Time Complexity\n`O(n+m)`\n\n### Expected Space Complexity\n`O(n+m) for output`",
    "examples": [
      {
        "input": "a = [1,3,5], b = [2,4,6]",
        "output": "[1,2,3,4,5,6]",
        "explanation": "The two sorted sequences are merged in order."
      },
      {
        "input": "a = [1,2,2], b = [2,3]",
        "output": "[1,2,2,2,3]",
        "explanation": "Duplicates from both inputs are retained."
      }
    ],
    "constraints": [
      "0 <= a.length, b.length <= 100000",
      "-10^9 <= values <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} a\n * @param {integer[]} b\n * @return {integer[]}\n */\nfunction mergeSortedArrays(a, b) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def merge_sorted_arrays(a: list[int], b: list[int]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] mergeSortedArrays(int[] a, int[] b) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> mergeSortedArrays(vector<int>& a, vector<int>& b) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = [1,3,5], b = [2,4,6]",
        "expected": "[1,2,3,4,5,6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = [1,2,2], b = [2,3]",
        "expected": "[1,2,2,2,3]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = [], b = []",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = [], b = [-2,0,4]",
        "expected": "[-2,0,4]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = [2,2], b = [2,2,2]",
        "expected": "[2,2,2,2,2]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = [-5,-3], b = [7,9]",
        "expected": "[-5,-3,7,9]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = [-4,0], b = [-3,-1]",
        "expected": "[-4,-3,-1,0]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-009",
    "title": "Find the Missing Number",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "acceptance": "76.2%",
    "submissions": "47.5K",
    "description": "An array nums contains n distinct integers chosen from the range [0, n]. Return the single number in that range that is missing.\n\n### Input Format\n- `nums`: n distinct integers from 0 through n, with one missing\n\n### Output Format\nThe missing integer.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [3,0,1]",
        "output": "2",
        "explanation": "The range is 0 through 3 and 2 is absent."
      },
      {
        "input": "nums = [0,1,2,4]",
        "output": "3",
        "explanation": "The missing value is between present values."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "0 <= nums[i] <= nums.length",
      "All nums[i] are distinct"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction missingNumber(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def missing_number(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int missingNumber(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [3,0,1]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0,1,2,4]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [1,2,3]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [0,1,2]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [0,2]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [4,1,0,3]",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "arrmat-010",
    "title": "First Index at Least Target",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Binary Search"
    ],
    "acceptance": "69.4%",
    "submissions": "39.1K",
    "description": "Given a non-decreasing integer array nums and an integer target, return the first index i such that nums[i] is greater than or equal to target. Return nums.length if no such index exists.\n\n### Input Format\n- `nums`: Non-decreasing integer array\n- `target`: Integer target\n\n### Output Format\nThe lower-bound index in the range [0, nums.length].\n\n### Expected Time Complexity\n`O(log n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [1,2,2,2,5], target = 2",
        "output": "1",
        "explanation": "Index 1 is the first occurrence that is not below 2."
      },
      {
        "input": "nums = [1,3,5], target = 4",
        "output": "2",
        "explanation": "The first value at least 4 is 5 at index 2."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 1000000",
      "-10^9 <= nums[i], target <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} target\n * @return {integer}\n */\nfunction lowerBound(nums, target) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def lower_bound(nums: list[int], target: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int lowerBound(int[] nums, int target) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lowerBound(vector<int>& nums, int target) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,2,2,5], target = 2",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,3,5], target = 4",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [], target = 10",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [2,4,6], target = 1",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [2,4,6], target = 9",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,3,3,3,8], target = 3",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-8,-4,-1], target = -5",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-011",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "topics": [
      "Array"
    ],
    "acceptance": "48.2%",
    "submissions": "8.1K",
    "description": "Given an integer array nums, return an array answer where answer[i] is the product of every element of nums except nums[i]. Do not use division. Assume every output fits in a signed 64-bit integer.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nAn integer array of the same length containing products excluding each position.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1) auxiliary space excluding output`",
    "examples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "[24,12,8,6]",
        "explanation": "Each output is the product of the other three values."
      },
      {
        "input": "nums = [-1,1,0,-3,3]",
        "output": "[0,0,9,0,0]",
        "explanation": "A single zero makes all products except at its position zero."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 100000",
      "-1000 <= nums[i] <= 1000",
      "Every required product fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer[]}\n */\nfunction productExceptSelf(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def product_except_self(nums: list[int]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,3,4]",
        "expected": "[24,12,8,6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [-1,1,0,-3,3]",
        "expected": "[0,0,9,0,0]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [2,0,4]",
        "expected": "[0,8,0]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [0,3,0]",
        "expected": "[0,0,0]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [-2,3,-4]",
        "expected": "[-12,8,-6]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,1,1]",
        "expected": "[1,1,1]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1000,1000,1000]",
        "expected": "[1000000,1000000,1000000]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-012",
    "title": "Maximum Subarray Sum",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Prefix Sum"
    ],
    "acceptance": "56.1%",
    "submissions": "9.4K",
    "description": "Given a non-empty integer array nums, find the contiguous non-empty subarray with the largest sum and return that sum.\n\n### Input Format\n- `nums`: Non-empty integer array\n\n### Output Format\nThe maximum sum over all non-empty contiguous subarrays.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "output": "6",
        "explanation": "The subarray [4,-1,2,1] has sum 6."
      },
      {
        "input": "nums = [5,4,-1,7,8]",
        "output": "23",
        "explanation": "The entire array has the maximum sum."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 200000",
      "-10^9 <= nums[i] <= 10^9",
      "The answer fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction maxSubarraySum(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_subarray_sum(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxSubarraySum(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubarraySum(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [5,4,-1,7,8]",
        "expected": "23",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [-8,-2,-5]",
        "expected": "-2",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-7]",
        "expected": "-7",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [-4,-1,6,-8]",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [0,0,0]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1000000000,1000000000,-1]",
        "expected": "1999999999",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-013",
    "title": "Count Subarrays With Sum K",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Prefix Sum",
      "Hash Table"
    ],
    "acceptance": "48.1%",
    "submissions": "25.4K",
    "description": "Given an integer array nums and an integer k, return the number of non-empty contiguous subarrays whose elements sum exactly to k.\n\n### Input Format\n- `nums`: Integer array\n- `k`: Target sum\n\n### Output Format\nAn integer count of qualifying subarrays.\n\n### Expected Time Complexity\n`O(n) expected`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [1,1,1], k = 2",
        "output": "2",
        "explanation": "The two length-two subarrays each sum to 2."
      },
      {
        "input": "nums = [1,-1,0], k = 0",
        "output": "3",
        "explanation": "The qualifying subarrays are [1,-1], [0], and [1,-1,0]."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 200000",
      "-10^9 <= nums[i], k <= 10^9",
      "The answer fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer}\n */\nfunction countSubarraysWithSumK(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_subarrays_with_sum_k(nums: list[int], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countSubarraysWithSumK(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countSubarraysWithSumK(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,1,1], k = 2",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,-1,0], k = 0",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [], k = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [5], k = 5",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [0,0,0], k = 0",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [-2,3,-1], k = 0",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [2,4,6], k = 5",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "arrmat-014",
    "title": "Sort an Array of Three Colors",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "49.0%",
    "submissions": "10.7K",
    "description": "Given an array nums containing only 0, 1, and 2, sort it in non-decreasing order in place. Do not use a library sorting function.\n\n### Input Format\n- `nums`: Array containing only 0, 1, and 2\n\n### Output Format\nThe sorted array [all 0s, then all 1s, then all 2s].\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [2,0,2,1,1,0]",
        "output": "[0,0,1,1,2,2]",
        "explanation": "Values are grouped in ascending order."
      },
      {
        "input": "nums = [1,2,0]",
        "output": "[0,1,2]",
        "explanation": "One occurrence of each color is sorted."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "nums[i] is one of 0, 1, or 2"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer[]}\n */\nfunction sortColors(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def sort_colors(nums: list[int]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] sortColors(int[] nums) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> sortColors(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2,0,2,1,1,0]",
        "expected": "[0,0,1,1,2,2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,2,0]",
        "expected": "[0,1,2]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [1,1,1]",
        "expected": "[1,1,1]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [2,2,1,1,0,0]",
        "expected": "[0,0,1,1,2,2]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [2,0,2,0]",
        "expected": "[0,0,2,2]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [2]",
        "expected": "[2]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-015",
    "title": "Spiral Matrix Traversal",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "44.0%",
    "submissions": "10.4K",
    "description": "Given an m by n matrix, return all elements in clockwise spiral order, starting at the top-left corner. An empty matrix returns an empty list.\n\n### Input Format\n- `matrix`: Rectangular integer matrix\n\n### Output Format\nA one-dimensional list containing each matrix element exactly once in spiral order.\n\n### Expected Time Complexity\n`O(m*n)`\n\n### Expected Space Complexity\n`O(1) auxiliary space excluding output`",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "[1,2,3,6,9,8,7,4,5]",
        "explanation": "Traverse top, right, bottom, then left while shrinking boundaries."
      },
      {
        "input": "matrix = [[1,2,3,4]]",
        "output": "[1,2,3,4]",
        "explanation": "A single row is traversed once."
      }
    ],
    "constraints": [
      "0 <= m, n <= 500",
      "-10^9 <= matrix[i][j] <= 10^9",
      "Rows have equal length"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {integer[]}\n */\nfunction spiralOrder(matrix) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def spiral_order(matrix: list[list[int]]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] spiralOrder(int[][] matrix) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "expected": "[1,2,3,6,9,8,7,4,5]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1,2,3,4]]",
        "expected": "[1,2,3,4]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = []",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[1],[2],[3]]",
        "expected": "[1,2,3]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[-5]]",
        "expected": "[-5]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[1,2,3],[4,5,6]]",
        "expected": "[1,2,3,6,5,4]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[1,2],[3,4],[5,6],[7,8]]",
        "expected": "[1,2,4,6,8,7,5,3]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-016",
    "title": "Set Matrix Rows and Columns to Zero",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "47.2%",
    "submissions": "16.8K",
    "description": "Given an m by n integer matrix, if any cell is zero, set every cell in that cell's row and column to zero. Perform the transformation in place using O(1) auxiliary space.\n\n### Input Format\n- `matrix`: Rectangular integer matrix\n\n### Output Format\nThe modified matrix after all required rows and columns are zeroed.\n\n### Expected Time Complexity\n`O(m*n)`\n\n### Expected Space Complexity\n`O(1) auxiliary space`",
    "examples": [
      {
        "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
        "output": "[[1,0,1],[0,0,0],[1,0,1]]",
        "explanation": "The zero at the center clears its full row and column."
      },
      {
        "input": "matrix = [[0,1,2],[3,4,5]]",
        "output": "[[0,0,0],[0,4,5]]",
        "explanation": "The first row and first column are cleared."
      }
    ],
    "constraints": [
      "1 <= m, n <= 500",
      "-10^9 <= matrix[i][j] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {integer[][]}\n */\nfunction setZeroes(matrix) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def set_zeroes(matrix: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[][] setZeroes(int[][] matrix) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> setZeroes(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
        "expected": "[[1,0,1],[0,0,0],[1,0,1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[0,1,2],[3,4,5]]",
        "expected": "[[0,0,0],[0,4,5]]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[0,2],[3,4]]",
        "expected": "[[0,0],[0,4]]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[1,2],[3,4]]",
        "expected": "[[1,2],[3,4]]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[0,0],[0,0]]",
        "expected": "[[0,0],[0,0]]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[1,0,3]]",
        "expected": "[[0,0,0]]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[1],[0],[3]]",
        "expected": "[[0],[0],[0]]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-017",
    "title": "Longest Consecutive Integer Run",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "acceptance": "53.3%",
    "submissions": "25.2K",
    "description": "Given an unsorted integer array nums, return the length of the longest set of consecutive integer values. Values need not be adjacent in the original array, and duplicates do not extend a run.\n\n### Input Format\n- `nums`: Unsorted integer array\n\n### Output Format\nThe maximum number of distinct consecutive values present.\n\n### Expected Time Complexity\n`O(n) expected`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [100,4,200,1,3,2]",
        "output": "4",
        "explanation": "The values 1, 2, 3, and 4 form the longest run."
      },
      {
        "input": "nums = [0,0,-1,1]",
        "output": "3",
        "explanation": "The distinct values -1, 0, and 1 form a run."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 200000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction longestConsecutive(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_consecutive(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestConsecutive(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [100,4,200,1,3,2]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0,0,-1,1]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [9]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [5,5,5]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [-3,-1,-2,-5]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-1000000000,-999999999,1000000000]",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "arrmat-018",
    "title": "Count Subarrays With Sum Divisible by K",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Prefix Sum"
    ],
    "acceptance": "52.0%",
    "submissions": "8.0K",
    "description": "Given an integer array nums and a positive integer k, count non-empty contiguous subarrays whose sum is divisible by k. Negative values are allowed.\n\n### Input Format\n- `nums`: Integer array\n- `k`: Positive divisor\n\n### Output Format\nThe number of qualifying subarrays.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(min(n,k))`",
    "examples": [
      {
        "input": "nums = [4,5,0,-2,-3,1], k = 5",
        "output": "7",
        "explanation": "Seven contiguous subarrays have sums divisible by five."
      },
      {
        "input": "nums = [5], k = 5",
        "output": "1",
        "explanation": "The one-element sum is divisible by five."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 200000",
      "1 <= k <= 10^9",
      "-10^9 <= nums[i] <= 10^9",
      "The answer fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer}\n */\nfunction countSubarraysDivisibleByK(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_subarrays_divisible_by_k(nums: list[int], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countSubarraysDivisibleByK(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countSubarraysDivisibleByK(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [4,5,0,-2,-3,1], k = 5",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [5], k = 5",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [], k = 3",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-2,3,4], k = 1",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [-1,2,-1], k = 2",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [0,0,0], k = 7",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,2,3], k = 100",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-019",
    "title": "Rotate Square Matrix Clockwise",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "49.3%",
    "submissions": "13.1K",
    "description": "Given an n by n matrix, rotate it 90 degrees clockwise in place. Do not allocate another n by n matrix.\n\n### Input Format\n- `matrix`: Square integer matrix\n\n### Output Format\nThe same matrix after a 90-degree clockwise rotation.\n\n### Expected Time Complexity\n`O(n^2)`\n\n### Expected Space Complexity\n`O(1) auxiliary space`",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "[[7,4,1],[8,5,2],[9,6,3]]",
        "explanation": "The first column becomes the first row in reverse row order."
      },
      {
        "input": "matrix = [[1,2],[3,4]]",
        "output": "[[3,1],[4,2]]",
        "explanation": "The four corners rotate clockwise."
      }
    ],
    "constraints": [
      "1 <= n <= 500",
      "-10^9 <= matrix[i][j] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {integer[][]}\n */\nfunction rotateClockwise(matrix) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def rotate_clockwise(matrix: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[][] rotateClockwise(int[][] matrix) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> rotateClockwise(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "expected": "[[7,4,1],[8,5,2],[9,6,3]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1,2],[3,4]]",
        "expected": "[[3,1],[4,2]]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[7]]",
        "expected": "[[7]]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[1,2],[3,4]]",
        "expected": "[[3,1],[4,2]]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[5,5],[5,5]]",
        "expected": "[[5,5],[5,5]]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[-1,-2],[-3,-4]]",
        "expected": "[[-3,-1],[-4,-2]]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "expected": "[[7,4,1],[8,5,2],[9,6,3]]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-020",
    "title": "Three Sum Unique Triplets",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sorting",
      "Two Pointers"
    ],
    "acceptance": "53.5%",
    "submissions": "29.0K",
    "description": "Given an integer array nums, return all unique triplets [a,b,c] whose values come from three different indices and satisfy a+b+c=0. The result must not contain duplicate triplets; each triplet should be internally sorted, and result order may be arbitrary.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nA list of unique zero-sum triplets.\n\n### Expected Time Complexity\n`O(n^2)`\n\n### Expected Space Complexity\n`O(1) auxiliary space excluding sorting and output`",
    "examples": [
      {
        "input": "nums = [-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]",
        "explanation": "There are two distinct value triplets that sum to zero."
      },
      {
        "input": "nums = [0,0,0,0]",
        "output": "[[0,0,0]]",
        "explanation": "Repeated indices can produce one unique value triplet."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer[][]}\n */\nfunction threeSum(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def three_sum(nums: list[int]) -> list[list[int]]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[][] threeSum(int[] nums) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [-1,0,1,2,-1,-4]",
        "expected": "[[-1,-1,2],[-1,0,1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0,0,0,0]",
        "expected": "[[0,0,0]]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [1,2,4]",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-1,0,1]",
        "expected": "[[-1,0,1]]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [-2,-2,0,0,2,2]",
        "expected": "[[-2,0,2]]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [0,0,0,0,0]",
        "expected": "[[0,0,0]]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-100000,-1,100001,0]",
        "expected": "[[-100000,-1,100001]]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-021",
    "title": "Maximum Water Container Area",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Greedy"
    ],
    "acceptance": "45.4%",
    "submissions": "24.5K",
    "description": "Given an array height where height[i] is a non-negative vertical line height at position i, choose two lines that, with the x-axis, contain the most water. Return the maximum area. The width is the index difference.\n\n### Input Format\n- `height`: Non-negative integer array\n\n### Output Format\nThe maximum container area as an integer.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "output": "49",
        "explanation": "Lines at indices 1 and 8 give width 7 and height 7."
      },
      {
        "input": "height = [1,1]",
        "output": "1",
        "explanation": "The only pair has width one and height one."
      }
    ],
    "constraints": [
      "2 <= height.length <= 100000",
      "0 <= height[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} height\n * @return {integer}\n */\nfunction maxContainerArea(height) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_container_area(height: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxContainerArea(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxContainerArea(vector<int>& height) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "expected": "49",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "height = [1,1]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "height = [0,0,0]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "height = [5,9]",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "height = [1,2,3,4]",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "height = [100,1,1,100]",
        "expected": "300",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "height = [1000000000,1000000000]",
        "expected": "1000000000",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-022",
    "title": "Next Lexicographical Permutation",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Graph"
    ],
    "acceptance": "55.6%",
    "submissions": "26.4K",
    "description": "Given an integer array nums, rearrange it into the next lexicographically greater permutation. If no greater permutation exists, rearrange it into ascending order. Modify nums in place and return it.\n\n### Input Format\n- `nums`: Integer array representing a permutation with possible duplicate values\n\n### Output Format\nThe next lexicographical arrangement, or the smallest arrangement if the input is maximal.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[1,3,2]",
        "explanation": "The next permutation after [1,2,3] is [1,3,2]."
      },
      {
        "input": "nums = [3,2,1]",
        "output": "[1,2,3]",
        "explanation": "The descending arrangement is maximal, so wrap to ascending order."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer[]}\n */\nfunction nextPermutation(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def next_permutation(nums: list[int]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] nextPermutation(int[] nums) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> nextPermutation(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,3]",
        "expected": "[1,3,2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3,2,1]",
        "expected": "[1,2,3]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [4]",
        "expected": "[4]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [1,2]",
        "expected": "[2,1]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [2,1]",
        "expected": "[1,2]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,1,5]",
        "expected": "[1,5,1]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,5,4,3,2]",
        "expected": "[2,1,3,4,5]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-023",
    "title": "Merge Overlapping Intervals",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Greedy",
      "Sorting"
    ],
    "acceptance": "46.0%",
    "submissions": "24.6K",
    "description": "Given a collection of closed intervals [start,end], merge all intervals that overlap or touch at an endpoint. Return the resulting intervals sorted by start.\n\n### Input Format\n- `intervals`: List of closed integer intervals\n\n### Output Format\nA list of pairwise non-overlapping intervals sorted by start.\n\n### Expected Time Complexity\n`O(n log n)`\n\n### Expected Space Complexity\n`O(n) for output`",
    "examples": [
      {
        "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        "output": "[[1,6],[8,10],[15,18]]",
        "explanation": "[1,3] and [2,6] overlap and merge."
      },
      {
        "input": "intervals = [[1,4],[4,5]]",
        "output": "[[1,5]]",
        "explanation": "Closed intervals sharing endpoint 4 overlap."
      }
    ],
    "constraints": [
      "0 <= intervals.length <= 100000",
      "-10^9 <= start <= end <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} intervals\n * @return {integer[][]}\n */\nfunction mergeIntervals(intervals) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[][] mergeIntervals(int[][] intervals) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        "expected": "[[1,6],[8,10],[15,18]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "intervals = [[1,4],[4,5]]",
        "expected": "[[1,5]]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "intervals = []",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "intervals = [[-2,3]]",
        "expected": "[[-2,3]]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "intervals = [[1,2],[4,5],[7,8]]",
        "expected": "[[1,2],[4,5],[7,8]]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "intervals = [[1,10],[2,3],[4,8]]",
        "expected": "[[1,10]]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "intervals = [[-8,-3],[-5,0],[2,4]]",
        "expected": "[[-8,0],[2,4]]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-024",
    "title": "Find the Repeated Number",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "acceptance": "47.9%",
    "submissions": "11.7K",
    "description": "An array nums of length n+1 contains integers in the range [1,n]. Exactly one distinct value is repeated one or more times; all other values appear exactly once. Return the repeated value without modifying nums and using O(1) extra space.\n\n### Input Format\n- `nums`: Array of length n+1 with values in [1,n]\n\n### Output Format\nThe duplicated integer.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [1,3,4,2,2]",
        "output": "2",
        "explanation": "The value 2 occurs twice."
      },
      {
        "input": "nums = [3,1,3,4,2]",
        "output": "3",
        "explanation": "The value 3 is the repeated value."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 100001",
      "1 <= nums[i] <= nums.length - 1",
      "Exactly one distinct value is duplicated"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction findDuplicate(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def find_duplicate(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int findDuplicate(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findDuplicate(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,3,4,2,2]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3,1,3,4,2]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [1,1]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [2,2,2,1,3]",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,2,3,4,4]",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [4,1,3,2,3]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,1,2,3,4]",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-025",
    "title": "Kth Largest Element",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Heap"
    ],
    "acceptance": "45.4%",
    "submissions": "24.3K",
    "description": "Given an integer array nums and an integer k, return the kth largest element when values are ordered with duplicates included. Do not fully sort the array as the required approach target is average O(n).\n\n### Input Format\n- `nums`: Integer array\n- `k`: 1-based rank from largest\n\n### Output Format\nThe kth largest value, counting duplicate occurrences.\n\n### Expected Time Complexity\n`O(n) average`\n\n### Expected Space Complexity\n`O(1) average for in-place quickselect; O(n) worst-case depending on strategy`",
    "examples": [
      {
        "input": "nums = [3,2,1,5,6,4], k = 2",
        "output": "5",
        "explanation": "The sorted descending values begin 6, 5."
      },
      {
        "input": "nums = [3,2,3,1,2,4,5,5,6], k = 4",
        "output": "4",
        "explanation": "Duplicates occupy separate ranks."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 200000",
      "1 <= k <= nums.length",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer}\n */\nfunction kthLargest(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def kth_largest(nums: list[int], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int kthLargest(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int kthLargest(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [3,2,1,5,6,4], k = 2",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3,2,3,1,2,4,5,5,6], k = 4",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [-4,7,2], k = 1",
        "expected": "7",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-4,7,2], k = 3",
        "expected": "-4",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [5,5,5,5], k = 3",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [-8,-2,-5], k = 2",
        "expected": "-5",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [9,9,1,2], k = 2",
        "expected": "9",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-026",
    "title": "Search a Row-and-Column Sorted Matrix",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "44.8%",
    "submissions": "24.0K",
    "description": "Given an m by n matrix where each row is non-decreasing from left to right and each column is non-decreasing from top to bottom, determine whether target exists in the matrix.\n\n### Input Format\n- `matrix`: Rectangular matrix sorted by rows and columns\n- `target`: Integer target\n\n### Output Format\nA boolean indicating whether target occurs in the matrix.\n\n### Expected Time Complexity\n`O(m+n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 6",
        "output": "true",
        "explanation": "6 is present in the third row, second column."
      },
      {
        "input": "matrix = [[1,3,5],[2,4,6]], target = 7",
        "output": "false",
        "explanation": "7 is not present."
      }
    ],
    "constraints": [
      "1 <= m, n <= 1000",
      "-10^9 <= matrix[i][j], target <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @param {integer} target\n * @return {boolean}\n */\nfunction searchSortedMatrix(matrix, target) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def search_sorted_matrix(matrix: list[list[int]], target: int) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean searchSortedMatrix(int[][] matrix, int target) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool searchSortedMatrix(vector<vector<int>>& matrix, int target) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 6",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1,3,5],[2,4,6]], target = 7",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[5]], target = 5",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[-2]], target = 0",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[2,4],[3,5]], target = 1",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[2,4],[3,5]], target = 8",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[1,2,2],[2,3,4]], target = 2",
        "expected": "true",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-027",
    "title": "Count Subarrays With XOR K",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Hash Table",
      "Bit Manipulation"
    ],
    "acceptance": "47.4%",
    "submissions": "10.8K",
    "description": "Given an integer array nums and an integer k, return the number of non-empty contiguous subarrays whose bitwise XOR equals k. Treat values as non-negative integers.\n\n### Input Format\n- `nums`: Non-negative integer array\n- `k`: Non-negative XOR target\n\n### Output Format\nThe number of qualifying contiguous subarrays.\n\n### Expected Time Complexity\n`O(n) expected`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [4,2,2,6,4], k = 6",
        "output": "4",
        "explanation": "Four contiguous ranges have XOR equal to 6."
      },
      {
        "input": "nums = [1,1,1], k = 0",
        "output": "2",
        "explanation": "The two length-two subarrays have XOR zero."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 200000",
      "0 <= nums[i], k <= 2^31-1",
      "The answer fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer}\n */\nfunction countSubarraysWithXorK(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_subarrays_with_xor_k(nums: list[int], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countSubarraysWithXorK(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countSubarraysWithXorK(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [4,2,2,6,4], k = 6",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,1,1], k = 0",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [], k = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [7], k = 7",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [0,0,0], k = 0",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,2,4], k = 8",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [2147483647,2147483647], k = 0",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "arrmat-028",
    "title": "Maximum Product Subarray",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Dynamic Programming"
    ],
    "acceptance": "47.4%",
    "submissions": "22.3K",
    "description": "Given a non-empty integer array nums, find the contiguous non-empty subarray with the largest product and return that product. Products fit in signed 64-bit range.\n\n### Input Format\n- `nums`: Non-empty integer array\n\n### Output Format\nThe maximum contiguous subarray product.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [2,3,-2,4]",
        "output": "6",
        "explanation": "The subarray [2,3] has product 6."
      },
      {
        "input": "nums = [-2,0,-1]",
        "output": "0",
        "explanation": "The zero is larger than either negative singleton product."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 200000",
      "-10 <= nums[i] <= 10",
      "Every candidate product fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction maxProductSubarray(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_product_subarray(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxProductSubarray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProductSubarray(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2,3,-2,4]",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [-2,0,-1]",
        "expected": "0",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [-5]",
        "expected": "-5",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [0]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [-2,-3]",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [-2,0,-3,-4]",
        "expected": "12",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-1,2,-3,4]",
        "expected": "24",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-029",
    "title": "Find All Right-Side Leaders",
    "difficulty": "Medium",
    "topics": [
      "Array"
    ],
    "acceptance": "57.1%",
    "submissions": "19.7K",
    "description": "An element nums[i] is a leader if it is strictly greater than every element to its right. The final element is always a leader. Return all leaders in their original left-to-right order.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nAn array containing the leader values in original order.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n) for output`",
    "examples": [
      {
        "input": "nums = [16,17,4,3,5,2]",
        "output": "[17,5,2]",
        "explanation": "17, 5, and the final value 2 exceed every value to their right."
      },
      {
        "input": "nums = [5,4,3]",
        "output": "[5,4,3]",
        "explanation": "Every element is a leader in a strictly decreasing array."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 200000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer[]}\n */\nfunction rightLeaders(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def right_leaders(nums: list[int]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] rightLeaders(int[] nums) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> rightLeaders(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [16,17,4,3,5,2]",
        "expected": "[17,5,2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [5,4,3]",
        "expected": "[5,4,3]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [-1]",
        "expected": "[-1]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [1,2,3,4]",
        "expected": "[4]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [5,5,4]",
        "expected": "[5,4]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [2,2,2]",
        "expected": "[2]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-5,-2,-8]",
        "expected": "[-2,-8]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-030",
    "title": "Maximum Sum of a Fixed-Length Subarray",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window"
    ],
    "acceptance": "47.8%",
    "submissions": "26.5K",
    "description": "Given an integer array nums and an integer k, return the maximum sum among all contiguous subarrays of exactly k elements.\n\n### Input Format\n- `nums`: Integer array\n- `k`: Window length\n\n### Output Format\nThe largest sum of any length-k contiguous subarray.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [2,1,5,1,3,2], k = 3",
        "output": "9",
        "explanation": "The window [5,1,3] has the maximum sum 9."
      },
      {
        "input": "nums = [-5,-2,-3,-1], k = 2",
        "output": "-4",
        "explanation": "The window [-3,-1] has the largest sum."
      }
    ],
    "constraints": [
      "1 <= k <= nums.length <= 200000",
      "-10^9 <= nums[i] <= 10^9",
      "The answer fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer}\n */\nfunction maxFixedWindowSum(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_fixed_window_sum(nums: list[int], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxFixedWindowSum(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxFixedWindowSum(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2,1,5,1,3,2], k = 3",
        "expected": "9",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [-5,-2,-3,-1], k = 2",
        "expected": "-4",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [1,-2,4], k = 3",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-4,7,2], k = 1",
        "expected": "7",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [-8,-2,-5], k = 2",
        "expected": "-7",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,1,1,1], k = 2",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1000000000,1000000000,-1000000000], k = 2",
        "expected": "2000000000",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-031",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Binary Search"
    ],
    "acceptance": "39.0%",
    "submissions": "5.8K",
    "description": "Given two non-decreasing arrays a and b, return the median of the combined multiset. The combined length is at least one. If the total length is even, return the arithmetic mean of the two middle values. The target time complexity is O(log(min(n,m)+1)).\n\n### Input Format\n- `a`: Non-decreasing integer array\n- `b`: Non-decreasing integer array\n\n### Output Format\nThe median as a number; it may end in .5.\n\n### Expected Time Complexity\n`O(log(min(n,m)+1))`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "a = [1,3], b = [2]",
        "output": "2",
        "explanation": "The combined sequence is [1,2,3]."
      },
      {
        "input": "a = [1,2], b = [3,4]",
        "output": "2.5",
        "explanation": "The middle values are 2 and 3."
      }
    ],
    "constraints": [
      "0 <= a.length, b.length <= 1000000",
      "a.length + b.length >= 1",
      "-10^9 <= values <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} a\n * @param {integer[]} b\n * @return {number}\n */\nfunction medianOfTwoSortedArrays(a, b) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def median_of_two_sorted_arrays(a: list[int], b: list[int]) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object medianOfTwoSortedArrays(int[] a, int[] b) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto medianOfTwoSortedArrays(vector<int>& a, vector<int>& b) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = [1,3], b = [2]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = [1,2], b = [3,4]",
        "expected": "2.5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "a = [], b = [-3,7]",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "a = [1,2,3], b = []",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "a = [], b = [-8]",
        "expected": "-8",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "a = [1000000000], b = [1,2,3,4,5,6,7]",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "a = [2,2,2], b = [2,2,2,2]",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-032",
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "28.5%",
    "submissions": "8.5K",
    "description": "Given an array height of non-negative bar heights, compute how much water can be trapped after raining. Each bar has width one.\n\n### Input Format\n- `height`: Non-negative integer array\n\n### Output Format\nThe total trapped water as an integer.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "output": "6",
        "explanation": "The elevations form several basins that hold six units in total."
      },
      {
        "input": "height = [4,2,0,3,2,5]",
        "output": "9",
        "explanation": "The bounded valleys hold nine units."
      }
    ],
    "constraints": [
      "0 <= height.length <= 200000",
      "0 <= height[i] <= 10^9",
      "The result fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} height\n * @return {integer}\n */\nfunction trapRainWater(height) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def trap_rain_water(height: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int trapRainWater(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int trapRainWater(vector<int>& height) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "height = [4,2,0,3,2,5]",
        "expected": "9",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "height = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "height = [3,0]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "height = [1,2,3,4]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "height = [4,3,2,1]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "height = [5,0,0,5]",
        "expected": "10",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-033",
    "title": "Largest Rectangle in a Histogram",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Stack"
    ],
    "acceptance": "38.5%",
    "submissions": "12.3K",
    "description": "Given an array heights where each bar has width one and non-negative height, return the area of the largest rectangle that can be formed using one or more consecutive bars.\n\n### Input Format\n- `heights`: Non-negative integer array\n\n### Output Format\nThe maximum rectangle area.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "heights = [2,1,5,6,2,3]",
        "output": "10",
        "explanation": "Bars of heights 5 and 6 form a width-two rectangle of area 10."
      },
      {
        "input": "heights = [2,4]",
        "output": "4",
        "explanation": "The taller bar alone gives area 4."
      }
    ],
    "constraints": [
      "0 <= heights.length <= 200000",
      "0 <= heights[i] <= 10^9",
      "The answer fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} heights\n * @return {integer}\n */\nfunction largestRectangleArea(heights) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def largest_rectangle_area(heights: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int largestRectangleArea(int[] heights) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "heights = [2,1,5,6,2,3]",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "heights = [2,4]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "heights = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "heights = [0,0,0]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "heights = [7]",
        "expected": "7",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "heights = [1,2,3,4]",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "heights = [3,3,3,3]",
        "expected": "12",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-034",
    "title": "Maximal Rectangle of Ones",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Matrix",
      "Stack"
    ],
    "acceptance": "32.3%",
    "submissions": "10.4K",
    "description": "Given a matrix of characters '0' and '1', find the area of the largest axis-aligned rectangle containing only '1' cells. Return zero for an empty matrix.\n\n### Input Format\n- `matrix`: Rectangular character matrix containing only '0' and '1'\n\n### Output Format\nThe maximum all-ones rectangle area.\n\n### Expected Time Complexity\n`O(m*n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
        "output": "6",
        "explanation": "The largest all-ones rectangle has three rows and two columns."
      },
      {
        "input": "matrix = [[\"1\",\"1\"],[\"1\",\"1\"]]",
        "output": "4",
        "explanation": "The entire 2 by 2 matrix is filled with ones."
      }
    ],
    "constraints": [
      "0 <= m, n <= 200",
      "matrix[i][j] is '0' or '1'",
      "If m is zero, matrix is []"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {character[][]} matrix\n * @return {integer}\n */\nfunction maximalRectangle(matrix) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def maximal_rectangle(matrix: Any) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maximalRectangle(Object matrix) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maximalRectangle(auto matrix) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[\"1\",\"1\"],[\"1\",\"1\"]]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[\"0\"]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[\"1\"]]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[\"0\",\"0\"],[\"0\",\"0\"]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[\"1\",\"1\",\"1\",\"1\"]]",
        "expected": "4",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-035",
    "title": "First Missing Positive Integer",
    "difficulty": "Hard",
    "topics": [
      "Array"
    ],
    "acceptance": "31.7%",
    "submissions": "4.4K",
    "description": "Given an unsorted integer array nums, return the smallest positive integer that does not appear in nums. The algorithm must run in O(n) time and use O(1) extra space by modifying the array in place.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe smallest missing positive integer.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [1,2,0]",
        "output": "3",
        "explanation": "1 and 2 are present, so 3 is missing."
      },
      {
        "input": "nums = [3,4,-1,1]",
        "output": "2",
        "explanation": "The smallest missing positive is 2."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 200000",
      "-2^31 <= nums[i] <= 2^31-1"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction firstMissingPositive(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def first_missing_positive(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int firstMissingPositive(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,0]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3,4,-1,1]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [0,-1,-5]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,2,3,4]",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,1,2,2]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1000000,2,1]",
        "expected": "3",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-036",
    "title": "Shortest Subarray With Sum At Least K",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Prefix Sum",
      "Stack"
    ],
    "acceptance": "34.4%",
    "submissions": "7.4K",
    "description": "Given an integer array nums, which may contain negative values, and an integer k, return the length of the shortest non-empty contiguous subarray whose sum is at least k. Return -1 if no such subarray exists.\n\n### Input Format\n- `nums`: Integer array, possibly containing negative values\n- `k`: Integer threshold\n\n### Output Format\nThe shortest qualifying length, or -1.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [2,-1,2], k = 3",
        "output": "3",
        "explanation": "The whole array sums to 3 and no shorter segment reaches 3."
      },
      {
        "input": "nums = [84,-37,32,40,95], k = 167",
        "output": "3",
        "explanation": "The segment [32,40,95] sums to 167."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 200000",
      "-10^9 <= nums[i], k <= 10^9",
      "Prefix sums fit in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer}\n */\nfunction shortestSubarrayAtLeastK(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def shortest_subarray_at_least_k(nums: list[int], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int shortestSubarrayAtLeastK(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestSubarrayAtLeastK(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2,-1,2], k = 3",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [84,-37,32,40,95], k = 167",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [], k = 1",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [5], k = 5",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [-2], k = 1",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [3,-2,5], k = 6",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-5,-2], k = -2",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-037",
    "title": "Count Range-Sum Subarrays",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Prefix Sum",
      "Divide and Conquer"
    ],
    "acceptance": "39.0%",
    "submissions": "5.8K",
    "description": "Given an integer array nums and integers lower and upper, count non-empty contiguous subarrays whose sum lies in the inclusive range [lower, upper]. The target time complexity is O(n log n).\n\n### Input Format\n- `nums`: Integer array\n- `lower`: Inclusive minimum sum\n- `upper`: Inclusive maximum sum\n\n### Output Format\nThe number of qualifying subarrays.\n\n### Expected Time Complexity\n`O(n log n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [-2,5,-1], lower = -2, upper = 2",
        "output": "3",
        "explanation": "The qualifying subarray sums are -2, 1, and -1."
      },
      {
        "input": "nums = [0,0], lower = 0, upper = 0",
        "output": "3",
        "explanation": "All three non-empty subarrays have sum zero."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 200000",
      "-10^9 <= nums[i] <= 10^9",
      "lower <= upper",
      "The answer fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} lower\n * @param {integer} upper\n * @return {integer}\n */\nfunction countRangeSum(nums, lower, upper) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_range_sum(nums: list[int], lower: int, upper: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countRangeSum(int[] nums, int lower, int upper) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countRangeSum(vector<int>& nums, int lower, int upper) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [-2,5,-1], lower = -2, upper = 2",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0,0], lower = 0, upper = 0",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [], lower = -1, upper = 1",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [4,-1,2], lower = 4, upper = 4",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [0,0,0], lower = 0, upper = 0",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [-3,-2,-1], lower = -5, upper = -2",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,2,3], lower = 10, upper = 20",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-038",
    "title": "Count Important Reverse Pairs",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Divide and Conquer"
    ],
    "acceptance": "36.3%",
    "submissions": "14.2K",
    "description": "Given an integer array nums, count pairs (i,j) such that i < j and nums[i] > 2 * nums[j]. The comparison must be evaluated without integer overflow. The target time complexity is O(n log n).\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe number of important reverse pairs.\n\n### Expected Time Complexity\n`O(n log n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [1,3,2,3,1]",
        "output": "2",
        "explanation": "The qualifying pairs are (3,1) at two positions."
      },
      {
        "input": "nums = [2,4,3,5,1]",
        "output": "3",
        "explanation": "Three index pairs satisfy the strict doubled comparison."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 200000",
      "-2^31 <= nums[i] <= 2^31-1",
      "The answer fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction countImportantReversePairs(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_important_reverse_pairs(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countImportantReversePairs(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countImportantReversePairs(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,3,2,3,1]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [2,4,3,5,1]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-5]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [2,1]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [-5,-3]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [2147483647,-2147483648]",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-039",
    "title": "Split Array to Minimize Largest Segment Sum",
    "difficulty": "Hard",
    "topics": [
      "Array"
    ],
    "acceptance": "35.2%",
    "submissions": "3.0K",
    "description": "Given a non-empty array of non-negative integers nums and an integer m, split nums into exactly m non-empty contiguous parts. Minimize the largest part sum and return that minimum possible value.\n\n### Input Format\n- `nums`: Non-negative integer array\n- `m`: Required number of non-empty contiguous parts\n\n### Output Format\nThe minimum achievable maximum segment sum.\n\n### Expected Time Complexity\n`O(n log(sum(nums)))`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [7,2,5,10,8], m = 2",
        "output": "18",
        "explanation": "Splitting [7,2,5] and [10,8] gives largest sum 18, which is optimal."
      },
      {
        "input": "nums = [1,2,3,4,5], m = 2",
        "output": "9",
        "explanation": "The split [1,2,3] and [4,5] has maximum sum 9."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "0 <= nums[i] <= 10^9",
      "1 <= m <= nums.length",
      "The answer fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} m\n * @return {integer}\n */\nfunction splitArrayMinLargestSum(nums, m) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def split_array_min_largest_sum(nums: list[int], m: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int splitArrayMinLargestSum(int[] nums, int m) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int splitArrayMinLargestSum(vector<int>& nums, int m) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [7,2,5,10,8], m = 2",
        "expected": "18",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,2,3,4,5], m = 2",
        "expected": "9",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [1,2,3], m = 1",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [1,2,3], m = 3",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [0,0,0,0], m = 2",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,1000000000,1], m = 2",
        "expected": "1000000000",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [0,0], m = 2",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-040",
    "title": "Maximum Sum Rectangle No Larger Than K",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Matrix",
      "Prefix Sum"
    ],
    "acceptance": "38.2%",
    "submissions": "9.3K",
    "description": "Given a non-empty m by n integer matrix and an integer k, find the maximum sum of any non-empty axis-aligned rectangular submatrix whose sum is less than or equal to k. It is guaranteed that at least one rectangle has sum <= k.\n\n### Input Format\n- `matrix`: Non-empty rectangular integer matrix\n- `k`: Maximum allowed rectangle sum\n\n### Output Format\nThe largest rectangle sum that does not exceed k.\n\n### Expected Time Complexity\n`O(min(m,n)^2 * max(m,n) log(max(m,n)))`\n\n### Expected Space Complexity\n`O(max(m,n))`",
    "examples": [
      {
        "input": "matrix = [[1,0,1],[0,-2,3]], k = 2",
        "output": "2",
        "explanation": "The best rectangle with sum at most two has sum 2."
      },
      {
        "input": "matrix = [[2,2,-1]], k = 3",
        "output": "3",
        "explanation": "The whole row sums to 3."
      }
    ],
    "constraints": [
      "1 <= m, n <= 100",
      "-10^6 <= matrix[i][j], k <= 10^6"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @param {integer} k\n * @return {integer}\n */\nfunction maxRectangleSumNoGreaterThanK(matrix, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_rectangle_sum_no_greater_than_k(matrix: list[list[int]], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxRectangleSumNoGreaterThanK(int[][] matrix, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxRectangleSumNoGreaterThanK(vector<vector<int>>& matrix, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,0,1],[0,-2,3]], k = 2",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[2,2,-1]], k = 3",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[-4]], k = -3",
        "expected": "-4",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[-5,-2],[-3,-4]], k = -4",
        "expected": "-4",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[1,2],[3,4]], k = 5",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[3,-2,5,-1]], k = 4",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[3],[-2],[5],[-1]], k = 4",
        "expected": "4",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "arrmat-041",
    "title": "Count Smaller Values After Each Element",
    "difficulty": "Hard",
    "topics": [
      "Array"
    ],
    "acceptance": "32.5%",
    "submissions": "12.6K",
    "description": "Given an integer array nums, return an array counts where counts[i] is the number of elements strictly smaller than nums[i] that appear to its right. Equal values are not counted.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nAn integer array of counts with the same length as nums.\n\n### Expected Time Complexity\n`O(n log n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [5,2,6,1]",
        "output": "[2,1,1,0]",
        "explanation": "To the right of 5 are 2 and 1; to the right of 2 is 1; to the right of 6 is 1."
      },
      {
        "input": "nums = [-1,-1]",
        "output": "[0,0]",
        "explanation": "Equal values are not strictly smaller."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 200000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer[]}\n */\nfunction countSmallerToRight(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def count_smaller_to_right(nums: list[int]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] countSmallerToRight(int[] nums) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> countSmallerToRight(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [5,2,6,1]",
        "expected": "[2,1,1,0]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [-1,-1]",
        "expected": "[0,0]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [4]",
        "expected": "[0]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,2,3,4]",
        "expected": "[0,0,0,0]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [4,3,2,1]",
        "expected": "[3,2,1,0]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [7,7,7,7]",
        "expected": "[0,0,0,0]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-042",
    "title": "Sliding Window Maximum",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Stack",
      "Sliding Window"
    ],
    "acceptance": "34.2%",
    "submissions": "5.8K",
    "description": "Given an integer array nums and a window size k, slide a window of length k from left to right. Return the maximum value in each window.\n\n### Input Format\n- `nums`: Integer array\n- `k`: Window size\n\n### Output Format\nAn array containing one maximum per window.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(k)`",
    "examples": [
      {
        "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        "output": "[3,3,5,5,6,7]",
        "explanation": "Each output is the maximum of a consecutive length-three window."
      },
      {
        "input": "nums = [1,-1], k = 1",
        "output": "[1,-1]",
        "explanation": "A size-one window returns each element."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 200000",
      "1 <= k <= nums.length",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer[]}\n */\nfunction slidingWindowMaximum(nums, k) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def sliding_window_maximum(nums: list[int], k: int) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] slidingWindowMaximum(int[] nums, int k) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> slidingWindowMaximum(vector<int>& nums, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        "expected": "[3,3,5,5,6,7]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,-1], k = 1",
        "expected": "[1,-1]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [2,1,5], k = 3",
        "expected": "[5]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-2,0,3], k = 1",
        "expected": "[-2,0,3]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [4,4,4,4], k = 2",
        "expected": "[4,4,4]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [9,7,5,3,1], k = 3",
        "expected": "[9,7,5]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-8,-3,-6,-2], k = 2",
        "expected": "[-3,-3,-2]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-043",
    "title": "Maximum Sum of Three Non-Overlapping Windows",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Sliding Window",
      "Dynamic Programming",
      "Graph"
    ],
    "acceptance": "35.3%",
    "submissions": "4.4K",
    "description": "Given an integer array nums and a positive window length k, choose three non-overlapping subarrays, each of length k, to maximize their total sum. Return their starting indices in increasing order. If multiple choices have the same maximum sum, return the lexicographically smallest index triple.\n\n### Input Format\n- `nums`: Integer array\n- `k`: Common positive length of the three windows\n\n### Output Format\nThree starting indices [i,j,l] with i+k <= j and j+k <= l.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [1,2,1,2,6,7,5,1], k = 2",
        "output": "[0,3,5]",
        "explanation": "The windows [1,2], [2,6], and [7,5] total 23."
      },
      {
        "input": "nums = [1,1,1,1,1,1,1,1,1], k = 2",
        "output": "[0,2,4]",
        "explanation": "All valid triples tie, so the lexicographically smallest is selected."
      }
    ],
    "constraints": [
      "3*k <= nums.length <= 200000",
      "-10^6 <= nums[i] <= 10^6",
      "1 <= k <= 10000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer[]}\n */\nfunction maxSumOfThreeWindows(nums, k) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def max_sum_of_three_windows(nums: list[int], k: int) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] maxSumOfThreeWindows(int[] nums, int k) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> maxSumOfThreeWindows(vector<int>& nums, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,1,2,6,7,5,1], k = 2",
        "expected": "[0,3,5]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,1,1,1,1,1,1,1,1], k = 2",
        "expected": "[0,2,4]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [5,1,4], k = 1",
        "expected": "[0,1,2]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-5,-1,-4,-2,-3,-6], k = 1",
        "expected": "[1,3,4]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [0,0,0,0,0,0,0,0,0], k = 2",
        "expected": "[0,2,4]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,100,1,1,100,1,1,100,1], k = 2",
        "expected": "[0,3,6]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1000000,1000000,1000000,1000000,1000000,1000000], k = 1",
        "expected": "[0,1,2]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-044",
    "title": "Sum of Subarray Minimums",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Stack"
    ],
    "acceptance": "33.0%",
    "submissions": "5.2K",
    "description": "Given an integer array arr, compute the sum of the minimum value of every non-empty contiguous subarray. Return the result modulo 1,000,000,007. Duplicate values must be assigned consistently so each subarray is counted exactly once.\n\n### Input Format\n- `arr`: Integer array of non-negative values\n\n### Output Format\nThe sum of all subarray minimums modulo 1,000,000,007.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "arr = [3,1,2,4]",
        "output": "17",
        "explanation": "The subarray minima sum to 3+1+1+1+2+1+2+4+1+2."
      },
      {
        "input": "arr = [11,81,94,43,3]",
        "output": "444",
        "explanation": "The sum of all contiguous-subarray minimums is 444."
      }
    ],
    "constraints": [
      "1 <= arr.length <= 200000",
      "0 <= arr[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} arr\n * @return {integer}\n */\nfunction sumSubarrayMinimums(arr) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def sum_subarray_minimums(arr: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int sumSubarrayMinimums(int[] arr) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int sumSubarrayMinimums(vector<int>& arr) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "arr = [3,1,2,4]",
        "expected": "17",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "arr = [11,81,94,43,3]",
        "expected": "444",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "arr = [7]",
        "expected": "7",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "arr = [0,0,0]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "arr = [2,2,2]",
        "expected": "12",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "arr = [1,2,3]",
        "expected": "10",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "arr = [1000000000,1000000000]",
        "expected": "999999986",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-045",
    "title": "Count Submatrices With Target Sum",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Matrix",
      "Hash Table"
    ],
    "acceptance": "28.4%",
    "submissions": "7.1K",
    "description": "Given an m by n integer matrix and an integer target, count the number of non-empty rectangular submatrices whose element sum equals target.\n\n### Input Format\n- `matrix`: Rectangular integer matrix\n- `target`: Required submatrix sum\n\n### Output Format\nThe number of target-sum rectangular submatrices.\n\n### Expected Time Complexity\n`O(min(m,n)^2 * max(m,n)) expected`\n\n### Expected Space Complexity\n`O(max(m,n))`",
    "examples": [
      {
        "input": "matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0",
        "output": "4",
        "explanation": "There are four non-empty rectangles with sum zero."
      },
      {
        "input": "matrix = [[1,-1],[-1,1]], target = 0",
        "output": "5",
        "explanation": "Five rectangular submatrices sum to zero."
      }
    ],
    "constraints": [
      "1 <= m, n <= 100",
      "-1000 <= matrix[i][j], target <= 1000",
      "The answer fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @param {integer} target\n * @return {integer}\n */\nfunction countSubmatricesWithTarget(matrix, target) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_submatrices_with_target(matrix: list[list[int]], target: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countSubmatricesWithTarget(int[][] matrix, int target) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countSubmatricesWithTarget(vector<vector<int>>& matrix, int target) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1,-1],[-1,1]], target = 0",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[5]], target = 5",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[5]], target = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[0,0],[0,0]], target = 0",
        "expected": "9",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[-1,-2],[-3,-4]], target = -3",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[1,2,-1]], target = 2",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "arrmat-046",
    "title": "Kth Smallest Pair Distance",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Two Pointers",
      "Heap"
    ],
    "acceptance": "39.1%",
    "submissions": "6.6K",
    "description": "Given an integer array nums and an integer k, consider the absolute differences |nums[i]-nums[j]| for all index pairs i<j. Return the kth smallest distance when these distances are sorted, including duplicates.\n\n### Input Format\n- `nums`: Integer array\n- `k`: 1-based rank among all index pairs\n\n### Output Format\nThe kth smallest absolute pair difference.\n\n### Expected Time Complexity\n`O(n log n + n log W), W=max(nums)-min(nums)`\n\n### Expected Space Complexity\n`O(1) auxiliary space after sorting`",
    "examples": [
      {
        "input": "nums = [1,3,1], k = 1",
        "output": "0",
        "explanation": "The pair of equal values has distance zero."
      },
      {
        "input": "nums = [1,6,1], k = 3",
        "output": "5",
        "explanation": "The sorted pair distances are 0, 5, and 5."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 100000",
      "1 <= k <= n*(n-1)/2",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer}\n */\nfunction kthSmallestPairDistance(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def kth_smallest_pair_distance(nums: list[int], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int kthSmallestPairDistance(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int kthSmallestPairDistance(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,3,1], k = 1",
        "expected": "0",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,6,1], k = 3",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [4,4,4], k = 2",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-5,7], k = 1",
        "expected": "12",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,1,4,7], k = 2",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [-10,0,5], k = 2",
        "expected": "10",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-1000000000,1000000000], k = 1",
        "expected": "2000000000",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-047",
    "title": "Kth Smallest Element in a Row-and-Column Sorted Matrix",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Matrix",
      "Heap"
    ],
    "acceptance": "31.4%",
    "submissions": "13.7K",
    "description": "Given an n by n matrix where each row and each column is sorted in non-decreasing order, return the kth smallest element in the matrix. Count repeated values as separate elements.\n\n### Input Format\n- `matrix`: n by n integer matrix sorted by rows and columns\n- `k`: 1-based rank from smallest\n\n### Output Format\nThe kth smallest matrix value.\n\n### Expected Time Complexity\n`O(n log(maxValue-minValue+1))`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8",
        "output": "13",
        "explanation": "The eighth value in sorted order is 13."
      },
      {
        "input": "matrix = [[-5]], k = 1",
        "output": "-5",
        "explanation": "The only matrix element is the first smallest."
      }
    ],
    "constraints": [
      "1 <= n <= 500",
      "1 <= k <= n*n",
      "-10^9 <= matrix[i][j] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @param {integer} k\n * @return {integer}\n */\nfunction kthSmallestSortedMatrix(matrix, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def kth_smallest_sorted_matrix(matrix: list[list[int]], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int kthSmallestSortedMatrix(int[][] matrix, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int kthSmallestSortedMatrix(vector<vector<int>>& matrix, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8",
        "expected": "13",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[-5]], k = 1",
        "expected": "-5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[7]], k = 1",
        "expected": "7",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[1,2],[3,4]], k = 4",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[2,2],[2,2]], k = 3",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[-9,-4],[-6,-1]], k = 2",
        "expected": "-6",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[1,2,2],[2,2,3],[2,3,4]], k = 6",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-048",
    "title": "Maximum Difference Between Successive Sorted Elements",
    "difficulty": "Hard",
    "topics": [
      "Array"
    ],
    "acceptance": "38.8%",
    "submissions": "3.0K",
    "description": "Given an unsorted integer array nums, sort its values conceptually and return the maximum difference between adjacent values in that sorted order. If fewer than two elements exist, return zero. The target time complexity is O(n) with O(n) extra space.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe maximum adjacent gap after sorting.\n\n### Expected Time Complexity\n`O(n) expected`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [3,6,9,1]",
        "output": "3",
        "explanation": "The sorted values are [1,3,6,9], with maximum gap 3."
      },
      {
        "input": "nums = [10]",
        "output": "0",
        "explanation": "A single value has no adjacent pair."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 200000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction maximumAdjacentGap(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def maximum_adjacent_gap(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maximumAdjacentGap(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maximumAdjacentGap(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [3,6,9,1]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [10]",
        "expected": "0",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-5,7]",
        "expected": "12",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [4,4,4,4]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,1,100,100]",
        "expected": "99",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-1000000000,1000000000]",
        "expected": "2000000000",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-049",
    "title": "Create Sorted Array With Minimum Insertion Cost",
    "difficulty": "Hard",
    "topics": [
      "Array"
    ],
    "acceptance": "35.5%",
    "submissions": "6.6K",
    "description": "You are given an integer array instructions. Process values from left to right, inserting each into a growing array in sorted order. Before inserting x, its cost is the smaller of (1) the count of existing values strictly less than x and (2) the count strictly greater than x. Equal values contribute to neither count. Return the total cost modulo 1,000,000,007.\n\n### Input Format\n- `instructions`: Integer array\n\n### Output Format\nThe total insertion cost modulo 1,000,000,007.\n\n### Expected Time Complexity\n`O(n log U)`\n\n### Expected Space Complexity\n`O(U) where U is the value domain`",
    "examples": [
      {
        "input": "instructions = [1,5,6,2]",
        "output": "1",
        "explanation": "The insertion costs are 0, 0, 0, and 1; only the final insertion has a positive cost."
      },
      {
        "input": "instructions = [1,2,3,4,5]",
        "output": "0",
        "explanation": "Every new value is greater than all existing values, so the smaller side is zero."
      }
    ],
    "constraints": [
      "1 <= instructions.length <= 100000",
      "1 <= instructions[i] <= 100000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} instructions\n * @return {integer}\n */\nfunction createSortedArrayCost(instructions) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def create_sorted_array_cost(instructions: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int createSortedArrayCost(int[] instructions) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int createSortedArrayCost(vector<int>& instructions) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "instructions = [1,5,6,2]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "instructions = [1,2,3,4,5]",
        "expected": "0",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "instructions = [9]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "instructions = [4,4,4,4]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "instructions = [5,4,3,2,1]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "instructions = [1,100000,50000,75000]",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "instructions = [2,1,2,1,2]",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-050",
    "title": "Maximum Sum of Two Non-Overlapping Subarrays",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Prefix Sum",
      "Dynamic Programming"
    ],
    "acceptance": "29.6%",
    "submissions": "7.1K",
    "description": "Given an integer array nums and positive lengths firstLen and secondLen, choose one contiguous subarray of each length so that they do not overlap. Either subarray may appear first. Return the maximum possible sum of their combined elements.\n\n### Input Format\n- `nums`: Integer array\n- `firstLen`: Length of the first chosen subarray\n- `secondLen`: Length of the second chosen subarray\n\n### Output Format\nThe maximum combined sum of two non-overlapping windows.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n) for prefix sums; can be reduced to O(1) extra space`",
    "examples": [
      {
        "input": "nums = [0,6,5,2,2,5,1,9,4], firstLen = 1, secondLen = 2",
        "output": "20",
        "explanation": "Choose [9] and [6,5], which do not overlap."
      },
      {
        "input": "nums = [3,8,1,3,2,1,8,9,0], firstLen = 2, secondLen = 3",
        "output": "29",
        "explanation": "The best pair has combined sum 29, considering both possible orders."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 200000",
      "1 <= firstLen, secondLen",
      "firstLen + secondLen <= nums.length",
      "-10^6 <= nums[i] <= 10^6"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} firstLen\n * @param {integer} secondLen\n * @return {integer}\n */\nfunction maxTwoNonOverlappingSubarraySum(nums, firstLen, secondLen) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_two_non_overlapping_subarray_sum(nums: list[int], firstLen: int, secondLen: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxTwoNonOverlappingSubarraySum(int[] nums, int firstLen, int secondLen) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxTwoNonOverlappingSubarraySum(vector<int>& nums, int firstLen, int secondLen) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [0,6,5,2,2,5,1,9,4], firstLen = 1, secondLen = 2",
        "expected": "20",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3,8,1,3,2,1,8,9,0], firstLen = 2, secondLen = 3",
        "expected": "29",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [1,2,3], firstLen = 1, secondLen = 2",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-5,4,3,-1], firstLen = 1, secondLen = 1",
        "expected": "7",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [-8,-2,-5,-1], firstLen = 1, secondLen = 1",
        "expected": "-3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [5,1,1,10], firstLen = 2, secondLen = 1",
        "expected": "16",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [5,5,5,5,5], firstLen = 2, secondLen = 2",
        "expected": "20",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-051",
    "title": "Add Two Matrices Elementwise",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "76.9%",
    "submissions": "29.3K",
    "description": "Given two rectangular integer matrices A and B with identical dimensions, return a matrix C where C[i][j] = A[i][j] + B[i][j].\n\n### Input Format\n- `A`: Rectangular integer matrix\n- `B`: Rectangular integer matrix with the same dimensions as A\n\n### Output Format\nA matrix with the same dimensions, containing the elementwise sums.\n\n### Expected Time Complexity\n`O(rows * columns)`\n\n### Expected Space Complexity\n`O(rows * columns) for output`",
    "examples": [
      {
        "input": "A = [[1,2],[3,4]], B = [[5,6],[7,8]]",
        "output": "[[6,8],[10,12]]",
        "explanation": "Corresponding cells are added independently."
      },
      {
        "input": "A = [[1,-2,0]], B = [[-1,2,4]]",
        "output": "[[0,0,4]]",
        "explanation": "Negative values and zero are added normally."
      }
    ],
    "constraints": [
      "1 <= rows, columns <= 1000",
      "rows * columns <= 200000",
      "-10^9 <= A[i][j], B[i][j] <= 10^9",
      "Every output value fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} A\n * @param {integer[][]} B\n * @return {long[][]}\n */\nfunction addMatrices(A, B) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def add_matrices(A: list[list[int]], B: list[list[int]]) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object addMatrices(int[][] A, int[][] B) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto addMatrices(vector<vector<int>>& A, vector<vector<int>>& B) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "A = [[1,2],[3,4]], B = [[5,6],[7,8]]",
        "expected": "[[6,8],[10,12]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "A = [[1,-2,0]], B = [[-1,2,4]]",
        "expected": "[[0,0,4]]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "A = [[3]], B = [[-5]]",
        "expected": "[[-2]]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "A = [[0,0],[0,0]], B = [[0,0],[0,0]]",
        "expected": "[[0,0],[0,0]]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "A = [[-3,-7]], B = [[-2,10]]",
        "expected": "[[-5,3]]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "A = [[1,2,3],[4,5,6]], B = [[6,5,4],[3,2,1]]",
        "expected": "[[7,7,7],[7,7,7]]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "A = [[1000000000]], B = [[1000000000]]",
        "expected": "[[2000000000]]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-052",
    "title": "Check Non-Decreasing Order",
    "difficulty": "Easy",
    "topics": [
      "Array"
    ],
    "acceptance": "62.0%",
    "submissions": "30.5K",
    "description": "Given an integer array nums, return true if every element is less than or equal to the element immediately after it. An empty or single-element array is considered non-decreasing.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nA boolean indicating whether nums is non-decreasing.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [1,2,2,4]",
        "output": "true",
        "explanation": "Equal adjacent values are allowed and no value decreases."
      },
      {
        "input": "nums = [3,1,2]",
        "output": "false",
        "explanation": "The first adjacent pair decreases from 3 to 1."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {boolean}\n */\nfunction isNonDecreasing(nums) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def is_non_decreasing(nums: list[int]) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean isNonDecreasing(int[] nums) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isNonDecreasing(vector<int>& nums) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,2,4]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3,1,2]",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [9]",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [4,4,4,4]",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [5,4,3,2]",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-3,-3,-2]",
        "expected": "true",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-053",
    "title": "Build Running Prefix Totals",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Prefix Sum"
    ],
    "acceptance": "77.0%",
    "submissions": "25.4K",
    "description": "Given an integer array nums, return an array prefix where prefix[i] is the sum of nums[0] through nums[i], inclusive. Use a signed 64-bit integer for sums.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nAn integer array of the same length containing inclusive prefix sums.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n) for the output`",
    "examples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "[1,3,6,10]",
        "explanation": "Each position stores the cumulative sum up to that index."
      },
      {
        "input": "nums = [-2,5,-1]",
        "output": "[-2,3,2]",
        "explanation": "Negative values reduce the running total."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9",
      "Every prefix sum fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {long[]}\n */\nfunction prefixTotals(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def prefix_totals(nums: list[int]) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object prefixTotals(int[] nums) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto prefixTotals(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,3,4]",
        "expected": "[1,3,6,10]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [-2,5,-1]",
        "expected": "[-2,3,2]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [0]",
        "expected": "[0]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [0,0,0]",
        "expected": "[0,0,0]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [-1,-2,-3]",
        "expected": "[-1,-3,-6]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1000000000,1000000000,-1000000000]",
        "expected": "[1000000000,2000000000,1000000000]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-054",
    "title": "Reverse an Array",
    "difficulty": "Easy",
    "topics": [
      "Array"
    ],
    "acceptance": "74.3%",
    "submissions": "33.1K",
    "description": "Given an integer array nums, return its elements in reverse order. The output must not contain any additional values.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nA new array containing nums in reverse order.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n) for returned array; O(1) auxiliary if in-place`",
    "examples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "[4,3,2,1]",
        "explanation": "The order of all elements is reversed."
      },
      {
        "input": "nums = [7,-2,7]",
        "output": "[7,-2,7]",
        "explanation": "A palindromic input remains unchanged."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer[]}\n */\nfunction reverseArray(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def reverse_array(nums: list[int]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] reverseArray(int[] nums) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> reverseArray(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,3,4]",
        "expected": "[4,3,2,1]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [7,-2,7]",
        "expected": "[7,-2,7]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [5]",
        "expected": "[5]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,9]",
        "expected": "[9,1]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [3,3,1,3]",
        "expected": "[3,1,3,3]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-1,0,2]",
        "expected": "[2,0,-1]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-055",
    "title": "Find the Row With Maximum Sum",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "76.9%",
    "submissions": "49.4K",
    "description": "Given a non-empty rectangular integer matrix, return the zero-based index of the row with the largest sum. If multiple rows share the maximum sum, return the smallest index.\n\n### Input Format\n- `matrix`: Non-empty rectangular integer matrix\n\n### Output Format\nThe zero-based index of the row with the greatest sum.\n\n### Expected Time Complexity\n`O(rows * columns)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "2",
        "explanation": "The row sums are 6, 15, and 24; row 2 is largest."
      },
      {
        "input": "matrix = [[5,-5],[4,-4],[3,-3]]",
        "output": "0",
        "explanation": "Every row sums to zero, so the first row wins the tie."
      }
    ],
    "constraints": [
      "1 <= matrix.length <= 10000",
      "1 <= matrix[i].length <= 10000",
      "matrix has at most 200000 total elements",
      "-10^6 <= matrix[i][j] <= 10^6"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {integer}\n */\nfunction rowWithMaximumSum(matrix) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def row_with_maximum_sum(matrix: list[list[int]]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int rowWithMaximumSum(int[][] matrix) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rowWithMaximumSum(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[5,-5],[4,-4],[3,-3]]",
        "expected": "0",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[8]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[-5,-2,-9]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[1,1],[0,3],[2,0]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[-8,-2],[-5,-6],[-20,1]]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[0,0,0],[0,1,0],[0,0,0]]",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-056",
    "title": "Count Values Occurring Exactly Once",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "acceptance": "64.9%",
    "submissions": "34.0K",
    "description": "Given an integer array nums, return the number of distinct values that occur exactly once in the array.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nAn integer count of values whose frequency is exactly one.\n\n### Expected Time Complexity\n`O(n) expected`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [1,2,2,3,4,4]",
        "output": "2",
        "explanation": "Only 1 and 3 occur exactly once."
      },
      {
        "input": "nums = [7,7,8,9]",
        "output": "2",
        "explanation": "The values 8 and 9 each occur once."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction countUniqueOccurrences(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_unique_occurrences(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countUniqueOccurrences(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countUniqueOccurrences(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,2,3,4,4]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [7,7,8,9]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [4]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [2,2,3,3]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [-1,0,1]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [5,1,2,5]",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "arrmat-057",
    "title": "Reshape a Matrix",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "66.2%",
    "submissions": "37.3K",
    "description": "Given a rectangular matrix and target dimensions r and c, reshape the matrix into r rows and c columns using row-major order. If the total number of elements does not equal r*c, return the original matrix unchanged.\n\n### Input Format\n- `matrix`: Rectangular integer matrix\n- `r`: Target row count\n- `c`: Target column count\n\n### Output Format\nThe reshaped matrix, or the original matrix if reshaping is impossible.\n\n### Expected Time Complexity\n`O(m*n)`\n\n### Expected Space Complexity\n`O(m*n) for output`",
    "examples": [
      {
        "input": "matrix = [[1,2],[3,4]], r = 1, c = 4",
        "output": "[[1,2,3,4]]",
        "explanation": "Elements are read row by row and placed into one row."
      },
      {
        "input": "matrix = [[1,2],[3,4]], r = 4, c = 1",
        "output": "[[1],[2],[3],[4]]",
        "explanation": "The same row-major sequence is distributed across four rows."
      }
    ],
    "constraints": [
      "1 <= matrix.length <= 1000",
      "1 <= matrix[i].length <= 1000",
      "1 <= r,c <= 1000",
      "The matrix is rectangular"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @param {integer} r\n * @param {integer} c\n * @return {integer[][]}\n */\nfunction reshapeMatrix(matrix, r, c) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def reshape_matrix(matrix: list[list[int]], r: int, c: int) -> list[list[int]]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[][] reshapeMatrix(int[][] matrix, int r, int c) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> reshapeMatrix(vector<vector<int>>& matrix, int r, int c) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,2],[3,4]], r = 1, c = 4",
        "expected": "[[1,2,3,4]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1,2],[3,4]], r = 4, c = 1",
        "expected": "[[1],[2],[3],[4]]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[1,2],[3,4]], r = 2, c = 2",
        "expected": "[[1,2],[3,4]]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[8,9,10]], r = 1, c = 3",
        "expected": "[[8,9,10]]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[8,9,10]], r = 3, c = 1",
        "expected": "[[8],[9],[10]]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[1,2],[3,4]], r = 3, c = 2",
        "expected": "[[1,2],[3,4]]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[6]], r = 1, c = 1",
        "expected": "[[6]]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-058",
    "title": "Check Whether a Matrix Is Toeplitz",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "65.9%",
    "submissions": "24.6K",
    "description": "Given a rectangular matrix, return true if every value is equal to the value immediately above-left of it whenever that neighbor exists. In other words, every top-left to bottom-right diagonal is constant.\n\n### Input Format\n- `matrix`: Rectangular integer matrix\n\n### Output Format\nA boolean indicating whether the matrix is Toeplitz.\n\n### Expected Time Complexity\n`O(rows * columns)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,1,2],[5,4,1]]",
        "output": "true",
        "explanation": "Every cell from row 1 and column 1 onward matches its above-left neighbor."
      },
      {
        "input": "matrix = [[1,2],[2,2]]",
        "output": "false",
        "explanation": "The bottom-right value differs from the top-left value."
      }
    ],
    "constraints": [
      "1 <= rows, columns <= 1000",
      "rows * columns <= 200000",
      "-10^9 <= matrix[i][j] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {boolean}\n */\nfunction isToeplitzMatrix(matrix) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def is_toeplitz_matrix(matrix: list[list[int]]) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean isToeplitzMatrix(int[][] matrix) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isToeplitzMatrix(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,2,3],[4,1,2],[5,4,1]]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1,2],[2,2]]",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[7]]",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[1,2,3,4]]",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[1],[2],[3]]",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[0,0],[0,0],[0,0]]",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[1,2,3],[4,1,2],[5,4,9]]",
        "expected": "false",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-059",
    "title": "Sum the Boundary of a Matrix",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "65.5%",
    "submissions": "40.2K",
    "description": "Given a non-empty rectangular integer matrix, return the sum of all boundary cells. Each cell must be included exactly once, including corners. If the matrix has one row or one column, every cell is a boundary cell.\n\n### Input Format\n- `matrix`: Non-empty rectangular integer matrix\n\n### Output Format\nThe sum of the boundary cells as a 64-bit integer.\n\n### Expected Time Complexity\n`O(rows * columns) or O(rows+columns)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "40",
        "explanation": "All cells except the center 5 are on the boundary."
      },
      {
        "input": "matrix = [[1,2,3,4],[5,6,7,8]]",
        "output": "36",
        "explanation": "With two rows, every cell lies on the boundary."
      }
    ],
    "constraints": [
      "1 <= rows, columns <= 10000",
      "rows * columns <= 200000",
      "-10^6 <= matrix[i][j] <= 10^6"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {long}\n */\nfunction boundarySum(matrix) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def boundary_sum(matrix: list[list[int]]) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object boundarySum(int[][] matrix) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto boundarySum(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "expected": "40",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1,2,3,4],[5,6,7,8]]",
        "expected": "36",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[9]]",
        "expected": "9",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[1,2,3,4]]",
        "expected": "10",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[1],[2],[3]]",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[1,2],[3,4]]",
        "expected": "10",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[-1,-2],[-3,-4]]",
        "expected": "-10",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-060",
    "title": "Count Adjacent Equal Pairs",
    "difficulty": "Easy",
    "topics": [
      "Array"
    ],
    "acceptance": "68.0%",
    "submissions": "15.0K",
    "description": "Given an integer array nums, count the indices i for which nums[i] equals nums[i+1]. Overlapping pairs are counted separately; for example, an array of four equal values contains three adjacent equal pairs.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nAn integer count of adjacent equal pairs.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [1,1,2,2,2,3]",
        "output": "3",
        "explanation": "The equal adjacent pairs occur at indices 0, 2, and 3."
      },
      {
        "input": "nums = [4,4,4]",
        "output": "2",
        "explanation": "The pairs at indices 0 and 1 are both counted."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction countAdjacentEqualPairs(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_adjacent_equal_pairs(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countAdjacentEqualPairs(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countAdjacentEqualPairs(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,1,2,2,2,3]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [4,4,4]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [5]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,2,3,4]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [0,0,0,0]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-1,-1,0,0,-1]",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-061",
    "title": "Find a Peak Element Index",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Binary Search",
      "Hash Table"
    ],
    "acceptance": "45.4%",
    "submissions": "14.6K",
    "description": "Given an array nums whose adjacent elements are distinct, return any index i such that nums[i] is strictly greater than its existing neighbors. Treat a missing neighbor beyond either array boundary as negative infinity. A peak is guaranteed to exist.\n\n### Input Format\n- `nums`: Non-empty integer array with unequal adjacent elements\n\n### Output Format\nAn index of any peak element.\n\n### Expected Time Complexity\n`O(log n) expected`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "2",
        "explanation": "The value 3 is greater than both neighbors."
      },
      {
        "input": "nums = [1,2,1,3,5,6,4]",
        "output": "5",
        "explanation": "The value 6 at index 5 is a peak."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "-2^31 <= nums[i] <= 2^31-1",
      "nums[i] != nums[i+1] for every valid adjacent pair"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction findPeakIndex(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def find_peak_index(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int findPeakIndex(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findPeakIndex(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,3,1]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,2,1,3,5,6,4]",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [1]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [1,2]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [2,1]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,2,3,4]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [4,3,2,1]",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-062",
    "title": "Longest Turbulent Subarray",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window"
    ],
    "acceptance": "48.2%",
    "submissions": "8.8K",
    "description": "Given an integer array nums, return the length of its longest contiguous subarray in which every adjacent comparison alternates strictly between greater-than and less-than. A subarray of length one is turbulent.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe maximum turbulent subarray length.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [9,4,2,10,7,8,8,1,9]",
        "output": "5",
        "explanation": "The subarray [4,2,10,7,8] has alternating comparisons."
      },
      {
        "input": "nums = [4,8,12,16]",
        "output": "2",
        "explanation": "Each adjacent pair differs, but three consecutive comparisons do not alternate."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction longestTurbulentSubarray(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_turbulent_subarray(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestTurbulentSubarray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestTurbulentSubarray(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [9,4,2,10,7,8,8,1,9]",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [4,8,12,16]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [5]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,3]",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [5,5,5]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,3,2,4,3]",
        "expected": "5",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-063",
    "title": "Minimum Swaps to Group Values at Most K",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window"
    ],
    "acceptance": "45.4%",
    "submissions": "18.8K",
    "description": "Given an integer array nums and an integer k, find the minimum number of arbitrary swaps needed to make all values less than or equal to k occupy one contiguous block. A swap may exchange any two positions.\n\n### Input Format\n- `nums`: Integer array\n- `k`: Integer threshold\n\n### Output Format\nThe minimum number of swaps.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [2,1,5,6,3], k = 3",
        "output": "1",
        "explanation": "There are three qualifying values; the best window of length three contains one non-qualifying value."
      },
      {
        "input": "nums = [2,7,9,5,8,7,4], k = 5",
        "output": "2",
        "explanation": "The best block for the three qualifying values needs two replacements."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "-10^9 <= nums[i], k <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer}\n */\nfunction minSwapsToGroupAtMostK(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def min_swaps_to_group_at_most_k(nums: list[int], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minSwapsToGroupAtMostK(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minSwapsToGroupAtMostK(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2,1,5,6,3], k = 3",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [2,7,9,5,8,7,4], k = 5",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [5,6,7], k = 3",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [1,2,3], k = 3",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [8,2,9], k = 2",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [4,3,4,5], k = 4",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,9,8,2], k = 2",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-064",
    "title": "Shortest Unsorted Continuous Subarray",
    "difficulty": "Medium",
    "topics": [
      "Array"
    ],
    "acceptance": "48.2%",
    "submissions": "26.6K",
    "description": "Given an integer array nums, return the length of the shortest contiguous subarray which, if sorted in non-decreasing order, makes the entire array non-decreasing. Return 0 if the array is already sorted.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe minimum subarray length that must be sorted.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [2,6,4,8,10,9,15]",
        "output": "5",
        "explanation": "Sorting [6,4,8,10,9] makes the full array sorted."
      },
      {
        "input": "nums = [1,2,3,4]",
        "output": "0",
        "explanation": "The input is already non-decreasing."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction shortestUnsortedSubarray(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def shortest_unsorted_subarray(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int shortestUnsortedSubarray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestUnsortedSubarray(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2,6,4,8,10,9,15]",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,2,3,4]",
        "expected": "0",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [4]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [5,4,3]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,3,2,2,2]",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,2,3,0]",
        "expected": "4",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-065",
    "title": "Minimum Increments to Make Values Unique",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sorting",
      "Hash Table"
    ],
    "acceptance": "54.9%",
    "submissions": "9.5K",
    "description": "Given an integer array nums, you may increment any element by one any number of times. Return the minimum total number of increments needed so that all final values are distinct.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe minimum total number of unit increments.\n\n### Expected Time Complexity\n`O(n log n)`\n\n### Expected Space Complexity\n`O(1) auxiliary space after sorting`",
    "examples": [
      {
        "input": "nums = [1,2,2]",
        "output": "1",
        "explanation": "One of the two occurrences of 2 is increased to 3."
      },
      {
        "input": "nums = [3,2,1,2,1,7]",
        "output": "6",
        "explanation": "A sorted unique arrangement is [1,2,3,4,5,7], requiring six increments."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {long}\n */\nfunction minIncrementsForUnique(nums) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def min_increments_for_unique(nums: list[int]) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object minIncrementsForUnique(int[] nums) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto minIncrementsForUnique(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,2]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3,2,1,2,1,7]",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [5]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [-1,-1]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [2,2,2]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [3,-1,8,0]",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-066",
    "title": "Find a Pair With a Given Difference",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Hash Table"
    ],
    "acceptance": "57.1%",
    "submissions": "15.0K",
    "description": "Given a non-decreasing integer array nums and a non-negative integer d, determine whether there are two distinct indices i and j such that i < j and nums[j] - nums[i] = d. Return true if such a pair exists.\n\n### Input Format\n- `nums`: Non-decreasing integer array\n- `d`: Non-negative target difference\n\n### Output Format\nA boolean indicating whether a qualifying pair exists.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [1,3,5,7], d = 2",
        "output": "true",
        "explanation": "The pairs (1,3), (3,5), and (5,7) have difference 2."
      },
      {
        "input": "nums = [1,2,4], d = 0",
        "output": "false",
        "explanation": "No value appears more than once."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "0 <= d <= 2*10^9",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} d\n * @return {boolean}\n */\nfunction hasPairWithDifference(nums, d) {\n  // Write your solution here\n  return false;\n}\n",
      "python": "def has_pair_with_difference(nums: list[int], d: int) -> bool:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public boolean hasPairWithDifference(int[] nums, int d) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool hasPairWithDifference(vector<int>& nums, int d) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,3,5,7], d = 2",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,2,4], d = 0",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [], d = 0",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [4], d = 0",
        "expected": "false",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [2,2,5], d = 0",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [-5,-1,3], d = 4",
        "expected": "true",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-2,0,3], d = 10",
        "expected": "false",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-067",
    "title": "Diagonal Zigzag Matrix Traversal",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "44.3%",
    "submissions": "23.0K",
    "description": "Given a non-empty rectangular matrix, return all values in diagonal order. Traverse diagonals by increasing row-plus-column index; alternate direction so the first diagonal is traversed upward-right, the next downward-left, and so on.\n\n### Input Format\n- `matrix`: Non-empty rectangular integer matrix\n\n### Output Format\nA one-dimensional array containing every matrix value exactly once in diagonal zigzag order.\n\n### Expected Time Complexity\n`O(rows * columns)`\n\n### Expected Space Complexity\n`O(rows * columns) for output`",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "[1,2,4,7,5,3,6,8,9]",
        "explanation": "The traversal alternates direction on each diagonal."
      },
      {
        "input": "matrix = [[1,2,3],[4,5,6]]",
        "output": "[1,2,4,5,3,6]",
        "explanation": "The shorter rectangular shape still follows the same diagonal rule."
      }
    ],
    "constraints": [
      "1 <= rows, columns <= 1000",
      "rows * columns <= 200000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {integer[]}\n */\nfunction diagonalZigzag(matrix) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def diagonal_zigzag(matrix: list[list[int]]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] diagonalZigzag(int[][] matrix) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> diagonalZigzag(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "expected": "[1,2,4,7,5,3,6,8,9]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1,2,3],[4,5,6]]",
        "expected": "[1,2,4,5,3,6]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[8]]",
        "expected": "[8]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[1,2,3,4]]",
        "expected": "[1,2,3,4]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[1],[2],[3]]",
        "expected": "[1,2,3]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[1,2],[3,4]]",
        "expected": "[1,2,3,4]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[-1,-2],[-3,-4]]",
        "expected": "[-1,-2,-3,-4]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-068",
    "title": "Multiply Two Rectangular Matrices",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "57.2%",
    "submissions": "8.5K",
    "description": "Given matrices A and B, compute their matrix product A*B. The number of columns in A equals the number of rows in B. Return a matrix with A.rows rows and B.columns columns.\n\n### Input Format\n- `A`: Integer matrix of shape m by n\n- `B`: Integer matrix of shape n by p\n\n### Output Format\nThe m by p product matrix.\n\n### Expected Time Complexity\n`O(m*n*p)`\n\n### Expected Space Complexity\n`O(m*p) for output`",
    "examples": [
      {
        "input": "A = [[1,2,3],[4,5,6]], B = [[7,8],[9,10],[11,12]]",
        "output": "[[58,64],[139,154]]",
        "explanation": "Each output cell is the dot product of one row of A and one column of B."
      },
      {
        "input": "A = [[2,-1]], B = [[3],[4]]",
        "output": "[[2]]",
        "explanation": "The single result is 2*3 + (-1)*4."
      }
    ],
    "constraints": [
      "1 <= m,n,p <= 100",
      "-1000 <= A[i][j], B[i][j] <= 1000",
      "Every output value fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} A\n * @param {integer[][]} B\n * @return {long[][]}\n */\nfunction multiplyMatrices(A, B) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def multiply_matrices(A: list[list[int]], B: list[list[int]]) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object multiplyMatrices(int[][] A, int[][] B) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto multiplyMatrices(vector<vector<int>>& A, vector<vector<int>>& B) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "A = [[1,2,3],[4,5,6]], B = [[7,8],[9,10],[11,12]]",
        "expected": "[[58,64],[139,154]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "A = [[2,-1]], B = [[3],[4]]",
        "expected": "[[2]]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "A = [[7]], B = [[6]]",
        "expected": "[[42]]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "A = [[0,0],[0,0]], B = [[1,2],[3,4]]",
        "expected": "[[0,0],[0,0]]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "A = [[1,0],[0,1]], B = [[5,6],[7,8]]",
        "expected": "[[5,6],[7,8]]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "A = [[-2,3]], B = [[4],[-1]]",
        "expected": "[[-11]]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "A = [[1,2]], B = [[3,4,5],[6,7,8]]",
        "expected": "[[15,18,21]]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-069",
    "title": "Flood Fill a Connected Region",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Graph",
      "Matrix",
      "Stack"
    ],
    "acceptance": "57.6%",
    "submissions": "10.2K",
    "description": "Given an image matrix, a starting cell (sr, sc), and a new color, recolor the starting cell and every cell connected to it through up, down, left, or right moves that originally had the same color as the starting cell. Return the modified image. Diagonal adjacency does not count.\n\n### Input Format\n- `image`: Non-empty rectangular matrix of color integers\n- `sr`: Starting row index\n- `sc`: Starting column index\n- `newColor`: Replacement color\n\n### Output Format\nThe recolored image matrix.\n\n### Expected Time Complexity\n`O(rows * columns)`\n\n### Expected Space Complexity\n`O(rows * columns) worst-case for visited structure or BFS stack`",
    "examples": [
      {
        "input": "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2",
        "output": "[[2,2,2],[2,2,0],[2,0,1]]",
        "explanation": "The six connected 1-cells in the upper-left region are recolored."
      },
      {
        "input": "image = [[0,0],[0,0]], sr = 0, sc = 0, newColor = 3",
        "output": "[[3,3],[3,3]]",
        "explanation": "All four cells are connected by four-direction moves."
      }
    ],
    "constraints": [
      "1 <= rows, columns <= 500",
      "0 <= image[i][j] <= 10^9",
      "0 <= sr < rows; 0 <= sc < columns"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} image\n * @param {integer} sr\n * @param {integer} sc\n * @param {integer} newColor\n * @return {integer[][]}\n */\nfunction floodFill(image, sr, sc, newColor) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def flood_fill(image: list[list[int]], sr: int, sc: int, newColor: int) -> list[list[int]]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2",
        "expected": "[[2,2,2],[2,2,0],[2,0,1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "image = [[0,0],[0,0]], sr = 0, sc = 0, newColor = 3",
        "expected": "[[3,3],[3,3]]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "image = [[1]], sr = 0, sc = 0, newColor = 2",
        "expected": "[[2]]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "image = [[1,1],[1,0]], sr = 0, sc = 0, newColor = 1",
        "expected": "[[1,1],[1,0]]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "image = [[1,2],[2,2]], sr = 0, sc = 0, newColor = 9",
        "expected": "[[9,2],[2,2]]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "image = [[1,1,0],[1,0,0],[1,1,1]], sr = 0, sc = 0, newColor = 4",
        "expected": "[[4,4,0],[4,0,0],[4,4,4]]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "image = [[5,6,5]], sr = 0, sc = 1, newColor = 8",
        "expected": "[[5,8,5]]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-070",
    "title": "Apply One Step of Conway’s Game of Life",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Matrix"
    ],
    "acceptance": "46.0%",
    "submissions": "20.1K",
    "description": "Given a binary matrix board, compute one simultaneous update of Conway’s Game of Life. A live cell survives with two or three live neighbors; a dead cell becomes live with exactly three live neighbors; all other cells become dead. Neighbors include the eight surrounding positions, and cells outside the board are dead.\n\n### Input Format\n- `board`: Rectangular matrix containing only 0 (dead) and 1 (live)\n\n### Output Format\nThe board after exactly one simultaneous update.\n\n### Expected Time Complexity\n`O(rows * columns)`\n\n### Expected Space Complexity\n`O(1) auxiliary if states are encoded in-place; otherwise O(rows * columns)`",
    "examples": [
      {
        "input": "board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]",
        "output": "[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]",
        "explanation": "Every new state is based on the original board, not on already-updated neighbors."
      },
      {
        "input": "board = [[1,1],[1,1]]",
        "output": "[[1,1],[1,1]]",
        "explanation": "Each cell has exactly three live neighbors and survives."
      }
    ],
    "constraints": [
      "1 <= rows, columns <= 1000",
      "rows * columns <= 200000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} board\n * @return {integer[][]}\n */\nfunction gameOfLifeStep(board) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def game_of_life_step(board: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[][] gameOfLifeStep(int[][] board) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> gameOfLifeStep(vector<vector<int>>& board) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]",
        "expected": "[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "board = [[1,1],[1,1]]",
        "expected": "[[1,1],[1,1]]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "board = [[1]]",
        "expected": "[[0]]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "board = [[0]]",
        "expected": "[[0]]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "board = [[1,1]]",
        "expected": "[[0,0]]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "board = [[1,1],[1,1]]",
        "expected": "[[1,1],[1,1]]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "board = [[0,1,0],[0,1,0],[0,1,0]]",
        "expected": "[[0,0,0],[1,1,1],[0,0,0]]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-071",
    "title": "Find Lucky Numbers in a Matrix",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Matrix",
      "Hash Table"
    ],
    "acceptance": "45.4%",
    "submissions": "24.7K",
    "description": "A value in a matrix is lucky if it is the minimum value in its row and simultaneously the maximum value in its column. Return all lucky values in any order. Assume all matrix values are distinct.\n\n### Input Format\n- `matrix`: Non-empty rectangular matrix with distinct values\n\n### Output Format\nAn array containing every lucky value; it may be empty.\n\n### Expected Time Complexity\n`O(rows * columns)`\n\n### Expected Space Complexity\n`O(rows + columns)`",
    "examples": [
      {
        "input": "matrix = [[3,7,8],[9,11,13],[15,16,17]]",
        "output": "[15]",
        "explanation": "15 is the minimum in its row and maximum in its column."
      },
      {
        "input": "matrix = [[7,8],[1,2]]",
        "output": "[7]",
        "explanation": "7 is the first row minimum and the first column maximum."
      }
    ],
    "constraints": [
      "1 <= rows, columns <= 500",
      "rows * columns <= 100000",
      "-10^9 <= matrix[i][j] <= 10^9",
      "All matrix values are distinct"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {integer[]}\n */\nfunction luckyNumbers(matrix) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def lucky_numbers(matrix: list[list[int]]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] luckyNumbers(int[][] matrix) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> luckyNumbers(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[3,7,8],[9,11,13],[15,16,17]]",
        "expected": "[15]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[7,8],[1,2]]",
        "expected": "[7]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[4]]",
        "expected": "[4]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[3,1,2]]",
        "expected": "[1]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[3],[1],[2]]",
        "expected": "[3]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[1,2],[3,4]]",
        "expected": "[]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[-5,-2],[-7,-3]]",
        "expected": "[-5]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-072",
    "title": "Find the Row With the Most Ones",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Matrix",
      "Binary Search"
    ],
    "acceptance": "47.2%",
    "submissions": "12.2K",
    "description": "Each row of a binary matrix is sorted in non-decreasing order. Return the index of the row containing the most ones. If multiple rows tie, return the smallest index. Return -1 if the matrix contains no ones.\n\n### Input Format\n- `matrix`: Non-empty rectangular binary matrix with sorted rows\n\n### Output Format\nThe zero-based index of the row with the most ones, or -1 if no one exists.\n\n### Expected Time Complexity\n`O(rows * log(columns))`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "matrix = [[0,0,1],[0,1,1],[1,1,1]]",
        "output": "2",
        "explanation": "The third row contains three ones, the most in the matrix."
      },
      {
        "input": "matrix = [[0,0],[0,1],[0,1]]",
        "output": "1",
        "explanation": "Rows 1 and 2 tie, so the smaller index is returned."
      }
    ],
    "constraints": [
      "1 <= rows, columns <= 100000",
      "rows * columns <= 200000",
      "matrix[i][j] is either 0 or 1",
      "Each row consists of zeroes followed by ones"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {integer}\n */\nfunction rowWithMostOnes(matrix) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def row_with_most_ones(matrix: list[list[int]]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int rowWithMostOnes(int[][] matrix) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rowWithMostOnes(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[0,0,1],[0,1,1],[1,1,1]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[0,0],[0,1],[0,1]]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = [[0,0],[0,0]]",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[1,1],[1,1]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[1]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[0]]",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[0,0,0,1,1]]",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-073",
    "title": "Count Subarrays With Bounded Maximum",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window",
      "Binary Search"
    ],
    "acceptance": "51.2%",
    "submissions": "12.6K",
    "description": "Given an integer array nums and integers left and right with left <= right, count contiguous subarrays whose maximum element lies in the inclusive range [left, right]. Return the count as a 64-bit integer.\n\n### Input Format\n- `nums`: Integer array\n- `left`: Inclusive lower bound\n- `right`: Inclusive upper bound\n\n### Output Format\nA 64-bit count of qualifying contiguous subarrays.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [2,1,4,3], left = 2, right = 3",
        "output": "3",
        "explanation": "The qualifying subarrays are [2], [2,1], and [3]."
      },
      {
        "input": "nums = [1,2,3,4], left = 2, right = 3",
        "output": "5",
        "explanation": "The five qualifying subarrays lie within the first three positions and contain at least one 2 or 3."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i], left, right <= 10^9",
      "left <= right"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} left\n * @param {integer} right\n * @return {long}\n */\nfunction countSubarraysWithBoundedMaximum(nums, left, right) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_subarrays_with_bounded_maximum(nums: list[int], left: int, right: int) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countSubarraysWithBoundedMaximum(int[] nums, int left, int right) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countSubarraysWithBoundedMaximum(vector<int>& nums, int left, int right) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2,1,4,3], left = 2, right = 3",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,2,3,4], left = 2, right = 3",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [], left = 1, right = 2",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [0,1,0], left = 2, right = 4",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [2,3,2], left = 2, right = 3",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [5,6,7], left = 1, right = 4",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-4,-2,-3], left = -3, right = -2",
        "expected": "5",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-074",
    "title": "Maximum Circular Subarray Sum",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Prefix Sum"
    ],
    "acceptance": "47.4%",
    "submissions": "10.8K",
    "description": "Given a non-empty integer array nums arranged in a circle, return the maximum sum of any non-empty contiguous segment. A segment may wrap from the end of the array to the beginning, but it may not use an element more than once.\n\n### Input Format\n- `nums`: Non-empty integer array\n\n### Output Format\nThe maximum circular contiguous-subarray sum.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [5,-3,5]",
        "output": "10",
        "explanation": "The wrapping segment [5,5] has sum 10."
      },
      {
        "input": "nums = [1,-2,3,-2]",
        "output": "3",
        "explanation": "The non-wrapping segment [3] is optimal."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "-10^6 <= nums[i] <= 10^6"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction maxCircularSubarraySum(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_circular_subarray_sum(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxCircularSubarraySum(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxCircularSubarraySum(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [5,-3,5]",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,-2,3,-2]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [-4]",
        "expected": "-4",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-3,-1,-2]",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,2,3]",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [0,0,0]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [8,-10,8]",
        "expected": "16",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-075",
    "title": "Longest Subarray With At Most Two Distinct Values",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "53.3%",
    "submissions": "25.4K",
    "description": "Given an integer array nums, return the maximum length of a contiguous subarray containing at most two distinct values.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe maximum qualifying subarray length.\n\n### Expected Time Complexity\n`O(n) expected`\n\n### Expected Space Complexity\n`O(1) distinct keys in the active window`",
    "examples": [
      {
        "input": "nums = [1,2,1,2,3]",
        "output": "4",
        "explanation": "The subarray [1,2,1,2] contains two distinct values."
      },
      {
        "input": "nums = [0,1,2,2]",
        "output": "3",
        "explanation": "The longest valid subarray is [1,2,2]."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction longestSubarrayAtMostTwoDistinct(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def longest_subarray_at_most_two_distinct(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int longestSubarrayAtMostTwoDistinct(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestSubarrayAtMostTwoDistinct(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,1,2,3]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0,1,2,2]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [9]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [4,4,4,4]",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,2,1,2]",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,2,3,1,2,3]",
        "expected": "2",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-076",
    "title": "Find the Largest Array Nesting Cycle",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Graph",
      "Hash Table"
    ],
    "acceptance": "54.4%",
    "submissions": "12.8K",
    "description": "nums is a permutation of the integers from 0 through n-1. Starting from index i, repeatedly set the current index to nums[current] until an index repeats. Return the maximum number of distinct indices visited over every starting index.\n\n### Input Format\n- `nums`: A permutation of [0, 1, ..., n-1]\n\n### Output Format\nThe maximum cycle length in the permutation.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [5,4,0,3,1,6,2]",
        "output": "4",
        "explanation": "The cycle 0 -> 5 -> 6 -> 2 -> 0 contains four distinct indices."
      },
      {
        "input": "nums = [0,1,2]",
        "output": "1",
        "explanation": "Every index forms a self-cycle."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "nums contains each integer from 0 through n-1 exactly once"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction maxArrayNesting(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_array_nesting(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxArrayNesting(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArrayNesting(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [5,4,0,3,1,6,2]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0,1,2]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [0]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [0,1,2,3]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,2,0]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,0,3,2]",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [2,0,1,4,3]",
        "expected": "3",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "arrmat-077",
    "title": "Apply Range Addition Updates",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Prefix Sum"
    ],
    "acceptance": "49.7%",
    "submissions": "21.7K",
    "description": "Start with an array of length n filled with zeroes. Each update [start, end, delta] adds delta to every index from start through end, inclusive. Apply all updates and return the final array.\n\n### Input Format\n- `n`: Length of the zero-initialized array\n- `updates`: Array of [start, end, delta] updates\n\n### Output Format\nThe resulting integer array.\n\n### Expected Time Complexity\n`O(n + updates.length)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "n = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]",
        "output": "[-2,0,3,5,3]",
        "explanation": "The updates overlap and their increments are added at each affected index."
      },
      {
        "input": "n = 3, updates = [[0,1,5]]",
        "output": "[5,5,0]",
        "explanation": "Only the first two positions receive the increment."
      }
    ],
    "constraints": [
      "1 <= n <= 200000",
      "0 <= updates.length <= 200000",
      "0 <= start <= end < n",
      "-10^9 <= delta <= 10^9",
      "Every final value fits in signed 64-bit range"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer} n\n * @param {integer[][]} updates\n * @return {long[]}\n */\nfunction rangeAddition(n, updates) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def range_addition(n: int, updates: list[list[int]]) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object rangeAddition(int n, int[][] updates) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto rangeAddition(int n, vector<vector<int>>& updates) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]",
        "expected": "[-2,0,3,5,3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 3, updates = [[0,1,5]]",
        "expected": "[5,5,0]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "n = 3, updates = []",
        "expected": "[0,0,0]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "n = 1, updates = [[0,0,7]]",
        "expected": "[7]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "n = 4, updates = [[0,3,-2]]",
        "expected": "[-2,-2,-2,-2]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "n = 3, updates = [[0,2,5],[1,2,-5]]",
        "expected": "[5,0,0]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "n = 2, updates = [[0,1,0]]",
        "expected": "[0,0]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-078",
    "title": "Shortest Removal to Make an Array Non-Decreasing",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Prefix Sum",
      "Two Pointers"
    ],
    "acceptance": "48.1%",
    "submissions": "21.2K",
    "description": "Given an integer array nums, remove one contiguous subarray (possibly empty) so that the remaining elements, concatenated in their original order, are non-decreasing. Return the minimum possible length of the removed subarray.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe minimum number of contiguous elements to remove.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [1,2,3,10,4,2,3,5]",
        "output": "3",
        "explanation": "Removing [10,4,2] leaves [1,2,3,3,5]."
      },
      {
        "input": "nums = [5,4,3,2,1]",
        "output": "4",
        "explanation": "Keeping one element is the best possible non-decreasing remainder."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction minRemovalForNonDecreasing(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def min_removal_for_non_decreasing(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minRemovalForNonDecreasing(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minRemovalForNonDecreasing(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,3,10,4,2,3,5]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [5,4,3,2,1]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [1,2,2,4]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [7]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [4,3,2,1]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,2,3,0]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [5,1,2,3]",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-079",
    "title": "Count Distinct Duplicate Rows",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Matrix",
      "Hash Table"
    ],
    "acceptance": "57.7%",
    "submissions": "19.2K",
    "description": "Given a rectangular integer matrix, count how many distinct row patterns appear at least twice. Two rows are considered the same only if they have equal lengths and equal values at every column.\n\n### Input Format\n- `matrix`: Rectangular integer matrix\n\n### Output Format\nThe number of distinct row patterns whose frequency is at least two.\n\n### Expected Time Complexity\n`O(rows * columns) expected`\n\n### Expected Space Complexity\n`O(rows * columns)`",
    "examples": [
      {
        "input": "matrix = [[1,0],[0,1],[1,0],[1,1],[0,1]]",
        "output": "2",
        "explanation": "The patterns [1,0] and [0,1] each appear more than once."
      },
      {
        "input": "matrix = [[1,2],[2,1],[3,4]]",
        "output": "0",
        "explanation": "Every row pattern is distinct."
      }
    ],
    "constraints": [
      "0 <= rows <= 100000",
      "0 <= columns <= 1000",
      "rows * columns <= 200000",
      "-10^9 <= matrix[i][j] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} matrix\n * @return {integer}\n */\nfunction countDistinctDuplicateRows(matrix) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_distinct_duplicate_rows(matrix: list[list[int]]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countDistinctDuplicateRows(int[][] matrix) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countDistinctDuplicateRows(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1,0],[0,1],[1,0],[1,1],[0,1]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1,2],[2,1],[3,4]]",
        "expected": "0",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "matrix = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "matrix = [[1,1]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "matrix = [[2,2],[2,2],[2,2]]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "matrix = [[1],[2],[1],[2]]",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "matrix = [[1,2,3],[1,2,4],[1,2,3]]",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "arrmat-080",
    "title": "Maximum Distance Across Two Sorted Arrays",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Greedy"
    ],
    "acceptance": "55.5%",
    "submissions": "9.3K",
    "description": "You are given at least two non-empty non-decreasing arrays. Choose one value from an array and another value from a different array. Return the maximum possible absolute difference between the two chosen values.\n\n### Input Format\n- `arrays`: List of at least two non-empty non-decreasing integer arrays\n\n### Output Format\nThe maximum absolute difference between values from different arrays.\n\n### Expected Time Complexity\n`O(total elements)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "arrays = [[1,2,3],[4,5],[1,2,3]]",
        "output": "4",
        "explanation": "Choosing 1 from one array and 5 from another gives distance 4."
      },
      {
        "input": "arrays = [[-10,-5],[0,10],[2,3]]",
        "output": "20",
        "explanation": "The values -10 and 10 come from different arrays."
      }
    ],
    "constraints": [
      "2 <= arrays.length <= 100000",
      "1 <= arrays[i].length",
      "Total number of elements <= 200000",
      "-10^9 <= values <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} arrays\n * @return {integer}\n */\nfunction maxDistanceAcrossArrays(arrays) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_distance_across_arrays(arrays: list[list[int]]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxDistanceAcrossArrays(int[][] arrays) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxDistanceAcrossArrays(vector<vector<int>>& arrays) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "arrays = [[1,2,3],[4,5],[1,2,3]]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "arrays = [[-10,-5],[0,10],[2,3]]",
        "expected": "20",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "arrays = [[-5],[7]]",
        "expected": "12",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "arrays = [[3,3],[3],[3,3,3]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "arrays = [[-9,-6],[-5,-2]]",
        "expected": "7",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "arrays = [[-100,100],[0]]",
        "expected": "100",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "arrays = [[1,2],[2,3],[3,4]]",
        "expected": "3",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-081",
    "title": "Maximum Stock Profit With At Most K Transactions",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Dynamic Programming"
    ],
    "acceptance": "29.3%",
    "submissions": "4.7K",
    "description": "Given an array prices where prices[i] is the stock price on day i, and an integer k, return the maximum profit achievable using at most k buy-sell transactions. You must sell before buying again, and you may hold at most one share at a time.\n\n### Input Format\n- `prices`: Non-negative daily stock prices\n- `k`: Maximum number of transactions\n\n### Output Format\nThe maximum achievable profit.\n\n### Expected Time Complexity\n`O(k*n) after unlimited-transactions optimization`\n\n### Expected Space Complexity\n`O(k)`",
    "examples": [
      {
        "input": "prices = [2,4,1], k = 2",
        "output": "2",
        "explanation": "Buy at 2 and sell at 4 for profit 2."
      },
      {
        "input": "prices = [3,2,6,5,0,3], k = 2",
        "output": "7",
        "explanation": "The best plan earns 4 from 2 to 6 and 3 from 0 to 3."
      }
    ],
    "constraints": [
      "0 <= prices.length <= 1000",
      "0 <= k <= 100",
      "0 <= prices[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} prices\n * @param {integer} k\n * @return {long}\n */\nfunction maxProfitAtMostK(prices, k) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def max_profit_at_most_k(prices: list[int], k: int) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object maxProfitAtMostK(int[] prices, int k) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto maxProfitAtMostK(vector<int>& prices, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "prices = [2,4,1], k = 2",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "prices = [3,2,6,5,0,3], k = 2",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "prices = [1,5,2], k = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "prices = [], k = 3",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "prices = [8], k = 2",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "prices = [9,7,4,1], k = 3",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "prices = [1,3,2,5], k = 10",
        "expected": "5",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-082",
    "title": "Sum of Total Strength of Wizards",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Stack",
      "Prefix Sum"
    ],
    "acceptance": "35.4%",
    "submissions": "5.5K",
    "description": "Given a positive integer array strength, consider every non-empty contiguous subarray. Its strength is the minimum element multiplied by the sum of all its elements. Return the sum of the strengths of all subarrays modulo 1,000,000,007.\n\n### Input Format\n- `strength`: Array of positive integers\n\n### Output Format\nThe total subarray strength modulo 1,000,000,007.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "strength = [1,3,1,2]",
        "output": "44",
        "explanation": "Adding minimum-times-sum over all ten subarrays gives 44."
      },
      {
        "input": "strength = [5,4,6]",
        "output": "213",
        "explanation": "Each subarray contributes its minimum multiplied by its own sum."
      }
    ],
    "constraints": [
      "1 <= strength.length <= 100000",
      "1 <= strength[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} strength\n * @return {integer}\n */\nfunction sumOfTotalStrength(strength) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def sum_of_total_strength(strength: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int sumOfTotalStrength(int[] strength) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int sumOfTotalStrength(vector<int>& strength) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "strength = [1,3,1,2]",
        "expected": "44",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "strength = [5,4,6]",
        "expected": "213",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "strength = [7]",
        "expected": "49",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "strength = [1,1]",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "strength = [2,2,2]",
        "expected": "40",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "strength = [1,2,3]",
        "expected": "33",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "strength = [1000000000,1000000000]",
        "expected": "196",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-083",
    "title": "Count Subarrays Where the Global Maximum Appears at Least K Times",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Sliding Window"
    ],
    "acceptance": "28.0%",
    "submissions": "3.6K",
    "description": "Given an integer array nums and a positive integer k, count contiguous subarrays in which the maximum value of the entire array appears at least k times. Return a 64-bit count.\n\n### Input Format\n- `nums`: Non-empty integer array\n- `k`: Required number of occurrences of the global maximum\n\n### Output Format\nThe number of qualifying subarrays.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "nums = [1,3,2,3,3], k = 2",
        "output": "6",
        "explanation": "There are six subarrays containing at least two occurrences of the global maximum 3."
      },
      {
        "input": "nums = [1,4,2,1,4], k = 1",
        "output": "11",
        "explanation": "Eleven subarrays contain at least one occurrence of the global maximum 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "1 <= k <= nums.length",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {long}\n */\nfunction countSubarraysWithGlobalMaxAtLeastK(nums, k) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_subarrays_with_global_max_at_least_k(nums: list[int], k: int) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countSubarraysWithGlobalMaxAtLeastK(int[] nums, int k) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countSubarraysWithGlobalMaxAtLeastK(vector<int>& nums, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,3,2,3,3], k = 2",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,4,2,1,4], k = 1",
        "expected": "11",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [5], k = 1",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [1,3,2,3], k = 3",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [2,2,2], k = 2",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,5,2,3], k = 1",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [5,1,1,5], k = 2",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-084",
    "title": "Two Robots Collect Maximum Grid Reward",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Matrix",
      "Dynamic Programming"
    ],
    "acceptance": "35.4%",
    "submissions": "5.5K",
    "description": "Given an m by n matrix grid of non-negative rewards, two robots start at the top row: robot 1 at column 0 and robot 2 at column n-1. In each move, both robots move down exactly one row and may change their column by -1, 0, or +1. Each robot collects the reward in its cell. If both robots occupy the same cell in a row, that cell is counted only once. Return the maximum total reward they can collect after visiting every row.\n\n### Input Format\n- `grid`: Non-empty rectangular matrix of non-negative integer rewards\n\n### Output Format\nThe maximum total reward collected by the two robots.\n\n### Expected Time Complexity\n`O(rows * columns^2)`\n\n### Expected Space Complexity\n`O(columns^2) with rolling row states`",
    "examples": [
      {
        "input": "grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]",
        "output": "24",
        "explanation": "An optimal pair of paths collects 24 while counting a shared cell only once."
      },
      {
        "input": "grid = [[1,2],[3,4]]",
        "output": "10",
        "explanation": "The robots collect 1 and 2 on the first row, then 3 and 4 on the second row."
      }
    ],
    "constraints": [
      "1 <= rows, columns <= 70",
      "0 <= grid[i][j] <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} grid\n * @return {integer}\n */\nfunction maxTwoRobotGridReward(grid) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_two_robot_grid_reward(grid: list[list[int]]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxTwoRobotGridReward(int[][] grid) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxTwoRobotGridReward(vector<vector<int>>& grid) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]",
        "expected": "24",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "grid = [[1,2],[3,4]]",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "grid = [[7]]",
        "expected": "7",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "grid = [[1],[2],[3]]",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "grid = [[4,1,3,2]]",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "grid = [[0,0],[0,0],[0,0]]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "grid = [[1,1,1],[1,9,1],[1,1,1]]",
        "expected": "14",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-085",
    "title": "Minimum Cost to Merge K Consecutive Piles",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Prefix Sum",
      "Greedy"
    ],
    "acceptance": "32.5%",
    "submissions": "12.0K",
    "description": "Given positive pile weights stones and an integer k, one operation merges exactly k consecutive piles into one pile whose weight is their sum; the operation cost equals that sum. Return the minimum total cost to merge all piles into one, or -1 if it is impossible.\n\n### Input Format\n- `stones`: Array of positive pile weights\n- `k`: Number of consecutive piles merged per operation\n\n### Output Format\nThe minimum total merge cost, or -1 when no complete merge is possible.\n\n### Expected Time Complexity\n`O(n^3 / k) with interval DP`\n\n### Expected Space Complexity\n`O(n^2)`",
    "examples": [
      {
        "input": "stones = [3,2,4,1], k = 2",
        "output": "20",
        "explanation": "Merging 3+2, then 4+1, then the two resulting piles costs 5+5+10=20."
      },
      {
        "input": "stones = [3,2,4,1], k = 3",
        "output": "-1",
        "explanation": "With k=3, the pile count cannot be reduced from four to one."
      }
    ],
    "constraints": [
      "1 <= stones.length <= 30",
      "2 <= k <= 6",
      "1 <= stones[i] <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} stones\n * @param {integer} k\n * @return {integer}\n */\nfunction minCostToMergePiles(stones, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def min_cost_to_merge_piles(stones: list[int], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minCostToMergePiles(int[] stones, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minCostToMergePiles(vector<int>& stones, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "stones = [3,2,4,1], k = 2",
        "expected": "20",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "stones = [3,2,4,1], k = 3",
        "expected": "-1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "stones = [9], k = 2",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "stones = [1,2], k = 3",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "stones = [1,2,3], k = 3",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "stones = [4,5], k = 2",
        "expected": "9",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "stones = [1,1,1,1,1], k = 2",
        "expected": "12",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-086",
    "title": "Smallest Range Covering Elements From K Sorted Lists",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Heap",
      "Greedy"
    ],
    "acceptance": "36.3%",
    "submissions": "14.5K",
    "description": "You are given k non-empty lists, each sorted in non-decreasing order. Find the smallest inclusive interval [low, high] that contains at least one element from every list. Minimize interval width; if widths tie, choose the interval with the smaller low endpoint.\n\n### Input Format\n- `lists`: List of k non-empty non-decreasing integer arrays\n\n### Output Format\nA two-element array [low, high] describing the selected interval.\n\n### Expected Time Complexity\n`O(N log k), N=total elements`\n\n### Expected Space Complexity\n`O(k)`",
    "examples": [
      {
        "input": "lists = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]",
        "output": "[20,24]",
        "explanation": "The interval [20,24] contains 24, 20, and 22 from the three lists."
      },
      {
        "input": "lists = [[1,2,3],[1,2,3],[1,2,3]]",
        "output": "[1,1]",
        "explanation": "The same value from all lists gives a zero-width range."
      }
    ],
    "constraints": [
      "1 <= lists.length <= 3500",
      "1 <= lists[i].length <= 50",
      "-10^5 <= lists[i][j] <= 10^5"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} lists\n * @return {integer[]}\n */\nfunction smallestCoveringRange(lists) {\n  // Write your solution here\n  return [];\n}\n",
      "python": "def smallest_covering_range(lists: list[list[int]]) -> list[int]:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int[] smallestCoveringRange(int[][] lists) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> smallestCoveringRange(vector<vector<int>>& lists) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "lists = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]",
        "expected": "[20,24]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "lists = [[1,2,3],[1,2,3],[1,2,3]]",
        "expected": "[1,1]",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "lists = [[3,7,9]]",
        "expected": "[3,3]",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "lists = [[-5],[0],[4]]",
        "expected": "[-5,4]",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "lists = [[1,1,5],[1,2,6],[1,3,7]]",
        "expected": "[1,1]",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "lists = [[-10,-2],[-8,0],[-9,3]]",
        "expected": "[-10,-8]",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "lists = [[1,5],[2,6]]",
        "expected": "[1,2]",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-087",
    "title": "Minimum Swaps to Make Two Sequences Strictly Increasing",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Dynamic Programming"
    ],
    "acceptance": "36.1%",
    "submissions": "12.3K",
    "description": "You are given two integer arrays A and B of equal length. At any index, you may swap A[i] with B[i]. Return the minimum number of swaps needed so that both resulting arrays are strictly increasing. Return -1 if it is impossible.\n\n### Input Format\n- `A`: Integer array\n- `B`: Integer array of the same length\n\n### Output Format\nThe minimum number of index-wise swaps, or -1 if no solution exists.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(1)`",
    "examples": [
      {
        "input": "A = [1,3,5,4], B = [1,2,3,7]",
        "output": "1",
        "explanation": "Swapping the final pair produces [1,3,5,7] and [1,2,3,4]."
      },
      {
        "input": "A = [0,3,5,8,9], B = [2,1,4,6,9]",
        "output": "1",
        "explanation": "One swap at index 1 makes both sequences strictly increasing."
      }
    ],
    "constraints": [
      "1 <= A.length == B.length <= 100000",
      "-10^9 <= A[i], B[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} A\n * @param {integer[]} B\n * @return {integer}\n */\nfunction minSwapsToMakeIncreasing(A, B) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def min_swaps_to_make_increasing(A: list[int], B: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minSwapsToMakeIncreasing(int[] A, int[] B) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minSwapsToMakeIncreasing(vector<int>& A, vector<int>& B) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "A = [1,3,5,4], B = [1,2,3,7]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "A = [0,3,5,8,9], B = [2,1,4,6,9]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "A = [2], B = [1]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "A = [1,2,3], B = [4,5,6]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "A = [1,4,3], B = [2,3,5]",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "A = [1,1], B = [2,2]",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "A = [-3,-1,2], B = [-2,0,3]",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-088",
    "title": "Burst Balloons for Maximum Coins",
    "difficulty": "Hard",
    "topics": [
      "Array"
    ],
    "acceptance": "39.9%",
    "submissions": "14.5K",
    "description": "You are given an array nums of non-negative balloon values. When balloon i is burst, you earn leftValue * nums[i] * rightValue, where leftValue and rightValue are the values of the nearest unburst balloons on either side, or 1 if no such balloon exists. Return the maximum coins obtainable by bursting every balloon.\n\n### Input Format\n- `nums`: Array of non-negative integers\n\n### Output Format\nThe maximum number of coins obtainable.\n\n### Expected Time Complexity\n`O(n^3)`\n\n### Expected Space Complexity\n`O(n^2)`",
    "examples": [
      {
        "input": "nums = [3,1,5,8]",
        "output": "167",
        "explanation": "An optimal bursting order earns 167 coins."
      },
      {
        "input": "nums = [1,5]",
        "output": "10",
        "explanation": "Bursting 1 first earns 5, then bursting 5 earns 5, for a total of 10."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 300",
      "0 <= nums[i] <= 100"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction maxCoinsBurstBalloons(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_coins_burst_balloons(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxCoinsBurstBalloons(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxCoinsBurstBalloons(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [3,1,5,8]",
        "expected": "167",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,5]",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [5]",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [0]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,1,1]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [2,3]",
        "expected": "9",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-089",
    "title": "Maximum Value of an Equation From Points",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Stack",
      "Sliding Window"
    ],
    "acceptance": "39.9%",
    "submissions": "14.2K",
    "description": "You are given points sorted by strictly increasing x-coordinate. For a pair i < j satisfying x[j] - x[i] <= k, compute y[i] + y[j] + x[j] - x[i]. Return the maximum value over all valid pairs. At least one valid pair is guaranteed.\n\n### Input Format\n- `points`: Array of [x, y] pairs sorted by strictly increasing x\n- `k`: Maximum allowed x-coordinate difference\n\n### Output Format\nThe maximum equation value among valid pairs.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "points = [[1,3],[2,0],[5,10],[6,-10]], k = 1",
        "output": "4",
        "explanation": "The first two points yield 3+0+(2-1)=4."
      },
      {
        "input": "points = [[0,0],[2,3],[3,1]], k = 3",
        "output": "5",
        "explanation": "The pair [0,0] and [2,3] yields 0+3+2=5; [2,3] and [3,1] also yields 5."
      }
    ],
    "constraints": [
      "2 <= points.length <= 100000",
      "-10^8 <= x,y <= 10^8",
      "1 <= k <= 2*10^8",
      "At least one valid pair exists"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} points\n * @param {integer} k\n * @return {long}\n */\nfunction maxValueOfEquation(points, k) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def max_value_of_equation(points: list[list[int]], k: int) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object maxValueOfEquation(int[][] points, int k) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto maxValueOfEquation(vector<vector<int>>& points, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "points = [[1,3],[2,0],[5,10],[6,-10]], k = 1",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "points = [[0,0],[2,3],[3,1]], k = 3",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "points = [[-2,4],[0,5]], k = 2",
        "expected": "11",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "points = [[0,-5],[1,-2],[2,-4]], k = 2",
        "expected": "-5",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "points = [[0,1],[3,2]], k = 3",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "points = [[0,0],[1,5],[10,10]], k = 1",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "points = [[-100000000,100000000],[100000000,-100000000]], k = 200000000",
        "expected": "200000000",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-090",
    "title": "Minimum Refueling Stops",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Greedy",
      "Binary Search"
    ],
    "acceptance": "37.7%",
    "submissions": "4.1K",
    "description": "A vehicle starts at position 0 with startFuel units of fuel. It consumes one unit of fuel per unit of distance and has an effectively unlimited tank. Given a target distance and fuel stations [position, fuel] sorted by position, return the minimum number of stops needed to reach the target, or -1 if it is impossible. At a station, any amount of its fuel may be taken, up to its available amount.\n\n### Input Format\n- `target`: Destination distance\n- `startFuel`: Initial fuel amount\n- `stations`: Sorted array of [position, available fuel]\n\n### Output Format\nThe minimum number of refueling stops, or -1 if the target is unreachable.\n\n### Expected Time Complexity\n`O(n log n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]",
        "output": "2",
        "explanation": "Refuel at positions 10 and 60 to reach the destination with two stops."
      },
      {
        "input": "target = 100, startFuel = 1, stations = [[10,100]]",
        "output": "-1",
        "explanation": "The vehicle cannot reach the first station."
      }
    ],
    "constraints": [
      "1 <= target <= 10^9",
      "0 <= startFuel <= 10^9",
      "0 <= stations.length <= 500",
      "0 < stations[i][0] < target",
      "0 <= stations[i][1] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer} target\n * @param {integer} startFuel\n * @param {integer[][]} stations\n * @return {integer}\n */\nfunction minRefuelStops(target, startFuel, stations) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def min_refuel_stops(target: int, startFuel: int, stations: list[list[int]]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minRefuelStops(int target, int startFuel, int[][] stations) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "target = 100, startFuel = 1, stations = [[10,100]]",
        "expected": "-1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "target = 50, startFuel = 50, stations = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "target = 20, startFuel = 10, stations = []",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "target = 30, startFuel = 10, stations = [[10,20]]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "target = 100, startFuel = 5, stations = [[6,100]]",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "target = 100, startFuel = 50, stations = [[25,100],[60,10]]",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-091",
    "title": "Maximum Score After Pairing Numbers",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Math"
    ],
    "acceptance": "29.4%",
    "submissions": "5.5K",
    "description": "Given an array nums of even length 2n, perform n operations. In operation i (1-based), choose two remaining values at indices p and q, remove them, and earn i * gcd(nums[p], nums[q]) points. Return the maximum total score obtainable by choosing the pairs and their order optimally.\n\n### Input Format\n- `nums`: Array of positive integers with even length\n\n### Output Format\nThe maximum total score.\n\n### Expected Time Complexity\n`O(n^2 * 2^n), where n is the number of pairs (half the array length)`\n\n### Expected Space Complexity\n`O(2^n) states over pair-selection masks`",
    "examples": [
      {
        "input": "nums = [1,2]",
        "output": "1",
        "explanation": "The only pair has gcd 1 and is used in operation 1."
      },
      {
        "input": "nums = [3,4,6,8]",
        "output": "11",
        "explanation": "Pairing 3 with 6 in operation 1 and 4 with 8 in operation 2 earns 3+8=11."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 14",
      "nums.length is even",
      "1 <= nums[i] <= 10^6"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction maxPairingScore(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_pairing_score(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxPairingScore(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxPairingScore(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3,4,6,8]",
        "expected": "11",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [5,5]",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [2,3,5,7]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [4,4,4,4]",
        "expected": "12",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [2,4,6,8]",
        "expected": "10",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]",
        "expected": "138",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-092",
    "title": "Count Subarrays With Exactly K Distinct Values",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "29.3%",
    "submissions": "4.7K",
    "description": "Given an integer array nums and a positive integer k, return the number of contiguous subarrays containing exactly k distinct values. Return the count as a 64-bit integer.\n\n### Input Format\n- `nums`: Integer array\n- `k`: Positive target number of distinct values\n\n### Output Format\nThe number of subarrays with exactly k distinct values.\n\n### Expected Time Complexity\n`O(n) expected`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [1,2,1,2,3], k = 2",
        "output": "7",
        "explanation": "Seven contiguous subarrays contain exactly two distinct values."
      },
      {
        "input": "nums = [1,2,1,3,4], k = 3",
        "output": "3",
        "explanation": "The three qualifying subarrays are [1,2,1,3], [2,1,3], and [1,3,4]."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100000",
      "0 <= k <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {long}\n */\nfunction countSubarraysExactlyKDistinct(nums, k) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def count_subarrays_exactly_k_distinct(nums: list[int], k: int) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object countSubarraysExactlyKDistinct(int[] nums, int k) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto countSubarraysExactlyKDistinct(vector<int>& nums, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,1,2,3], k = 2",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,2,1,3,4], k = 3",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [], k = 1",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [1,2], k = 0",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,1,2], k = 3",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [4,4,4], k = 1",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,2,3,4], k = 1",
        "expected": "4",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-093",
    "title": "Make an Array Strictly Increasing With Replacements",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Binary Search"
    ],
    "acceptance": "32.8%",
    "submissions": "3.0K",
    "description": "Given arrays arr1 and arr2, you may replace any element of arr1 with any element from arr2. Each replacement costs one operation, and values from arr2 may be reused. Return the minimum number of replacements needed to make arr1 strictly increasing, or -1 if it is impossible.\n\n### Input Format\n- `arr1`: Integer array to modify\n- `arr2`: Integer array of replacement values\n\n### Output Format\nThe minimum number of replacements, or -1 if impossible.\n\n### Expected Time Complexity\n`O(n*m log m) or better after sorting arr2`\n\n### Expected Space Complexity\n`O(n*m) worst-case for a direct state representation`",
    "examples": [
      {
        "input": "arr1 = [1,5,3,6,7], arr2 = [1,3,2,4]",
        "output": "1",
        "explanation": "Replacing 5 with 2 gives [1,2,3,6,7]."
      },
      {
        "input": "arr1 = [1,5,3,6,7], arr2 = [4,3,1]",
        "output": "2",
        "explanation": "Two replacements are necessary to obtain a strictly increasing sequence."
      }
    ],
    "constraints": [
      "1 <= arr1.length <= 2000",
      "0 <= arr2.length <= 2000",
      "-10^9 <= values <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} arr1\n * @param {integer[]} arr2\n * @return {integer}\n */\nfunction minReplacementsForIncreasing(arr1, arr2) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def min_replacements_for_increasing(arr1: list[int], arr2: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minReplacementsForIncreasing(int[] arr1, int[] arr2) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minReplacementsForIncreasing(vector<int>& arr1, vector<int>& arr2) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "arr1 = [1,5,3,6,7], arr2 = [1,3,2,4]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "arr1 = [1,5,3,6,7], arr2 = [4,3,1]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "arr1 = [1,2,3], arr2 = []",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "arr1 = [5], arr2 = [1]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "arr1 = [3,2], arr2 = []",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "arr1 = [1,1], arr2 = [2,2,3]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "arr1 = [-5,-2,-2,4], arr2 = [-3,0]",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-094",
    "title": "Minimum Removals to Form a Mountain Subsequence",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Dynamic Programming"
    ],
    "acceptance": "34.2%",
    "submissions": "5.2K",
    "description": "Given an integer array nums, remove as few elements as possible, without changing the order of the remaining elements, so that the remaining sequence is a mountain: it has at least three elements, strictly increases to one interior peak, then strictly decreases. Return the minimum removals, or -1 if no mountain subsequence exists.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe minimum number of removals, or -1 if no valid mountain subsequence exists.\n\n### Expected Time Complexity\n`O(n log n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [2,1,1,5,6,2,3,1]",
        "output": "3",
        "explanation": "A longest mountain subsequence has length five, so three elements are removed."
      },
      {
        "input": "nums = [1,3,1]",
        "output": "0",
        "explanation": "The full array is already a valid mountain."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction minRemovalsForMountain(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def min_removals_for_mountain(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minRemovalsForMountain(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minRemovalsForMountain(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2,1,1,5,6,2,3,1]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,3,1]",
        "expected": "0",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [1,2]",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [1,2,3,4]",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [4,3,2,1]",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [2,2,2,2]",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,2,2,1]",
        "expected": "1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-095",
    "title": "Maximum Points With Cost in a Grid",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Matrix"
    ],
    "acceptance": "35.2%",
    "submissions": "3.6K",
    "description": "Given an m by n integer matrix points, choose exactly one cell from each row. If column c is chosen in one row and column d in the next row, subtract abs(c-d) from the sum of chosen cell values. Return the maximum total score over all choices.\n\n### Input Format\n- `points`: Integer matrix of cell scores\n\n### Output Format\nThe maximum achievable total score as a 64-bit integer.\n\n### Expected Time Complexity\n`O(rows * columns)`\n\n### Expected Space Complexity\n`O(columns)`",
    "examples": [
      {
        "input": "points = [[1,2,3],[1,5,1],[3,1,1]]",
        "output": "9",
        "explanation": "Choosing columns 2, 1, and 0 gives 3 + 5 + 3 - 1 - 1 = 9."
      },
      {
        "input": "points = [[1,5],[2,3],[4,2]]",
        "output": "11",
        "explanation": "Choosing column 1 for the first two rows and column 0 for the last row gives 5+3+4-1=11."
      }
    ],
    "constraints": [
      "1 <= m,n <= 1000",
      "m*n <= 200000",
      "-10^6 <= points[i][j] <= 10^6"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[][]} points\n * @return {long}\n */\nfunction maxPointsWithCost(points) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def max_points_with_cost(points: list[list[int]]) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object maxPointsWithCost(int[][] points) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto maxPointsWithCost(vector<vector<int>>& points) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "points = [[1,2,3],[1,5,1],[3,1,1]]",
        "expected": "9",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "points = [[1,5],[2,3],[4,2]]",
        "expected": "11",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "points = [[7]]",
        "expected": "7",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "points = [[1,9,3]]",
        "expected": "9",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "points = [[1],[5],[-2]]",
        "expected": "4",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "points = [[2,2],[3,3]]",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "points = [[10,0,0],[0,0,10]]",
        "expected": "18",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-096",
    "title": "Minimum Number of K-Consecutive Bit Flips",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Greedy",
      "Bit Manipulation"
    ],
    "acceptance": "28.0%",
    "submissions": "3.0K",
    "description": "Given a binary array nums and a positive integer k, one operation flips exactly k consecutive bits (0 becomes 1 and 1 becomes 0). Return the minimum number of operations needed to make every bit equal to 1, or -1 if it is impossible.\n\n### Input Format\n- `nums`: Binary integer array\n- `k`: Fixed flip window length\n\n### Output Format\nThe minimum number of flips, or -1 if no valid sequence of flips exists.\n\n### Expected Time Complexity\n`O(n)`\n\n### Expected Space Complexity\n`O(n) auxiliary for a simple difference array; O(1) with in-place markers`",
    "examples": [
      {
        "input": "nums = [0,1,0], k = 1",
        "output": "2",
        "explanation": "Flip the first and third bits individually."
      },
      {
        "input": "nums = [1,1,0,0,1], k = 3",
        "output": "-1",
        "explanation": "No sequence of length-three flips can make all positions one."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "1 <= k <= nums.length",
      "nums[i] is either 0 or 1"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @param {integer} k\n * @return {integer}\n */\nfunction minKBitFlips(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def min_k_bit_flips(nums: list[int], k: int) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minKBitFlips(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minKBitFlips(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [0,1,0], k = 1",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,1,0,0,1], k = 3",
        "expected": "-1",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [1,1,1], k = 2",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [0,1,0,1], k = 1",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [0,1,1], k = 2",
        "expected": "-1",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [0,0,0], k = 3",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [0,1,1], k = 2",
        "expected": "-1",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-097",
    "title": "Minimize Deviation in an Array",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Greedy"
    ],
    "acceptance": "29.6%",
    "submissions": "7.4K",
    "description": "Given a non-empty array of positive integers, you may repeatedly halve an even value or double an odd value. Return the minimum possible difference between the maximum and minimum array values after any number of allowed operations.\n\n### Input Format\n- `nums`: Array of positive integers\n\n### Output Format\nThe minimum achievable maximum-minus-minimum deviation.\n\n### Expected Time Complexity\n`O(n log M)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "1",
        "explanation": "Transforming the values to [2,2,3,2] gives a maximum-minus-minimum difference of 1."
      },
      {
        "input": "nums = [4,1,5,20,3]",
        "output": "3",
        "explanation": "Repeatedly reducing the largest even value and tracking the minimum yields deviation 3."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "1 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction minimizeDeviation(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def minimize_deviation(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int minimizeDeviation(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minimizeDeviation(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,2,3,4]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [4,1,5,20,3]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [9]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [4,4,4]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [2,4,8]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1,3,5]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1000000000,1]",
        "expected": "1953123",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-098",
    "title": "Maximum Balanced Subsequence Sum",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Sorting",
      "Dynamic Programming"
    ],
    "acceptance": "39.7%",
    "submissions": "12.3K",
    "description": "Given an integer array nums, choose a non-empty subsequence with indices i1 < i2 < ... such that nums[ij] - ij is non-decreasing across the chosen indices (using zero-based indices). Return the maximum possible sum of the chosen values.\n\n### Input Format\n- `nums`: Integer array\n\n### Output Format\nThe maximum sum of a valid non-empty balanced subsequence.\n\n### Expected Time Complexity\n`O(n log n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [3,3,5,6]",
        "output": "14",
        "explanation": "The subsequence [3,5,6] at indices 0,2,3 is balanced and sums to 14."
      },
      {
        "input": "nums = [5,-1,-3,8]",
        "output": "13",
        "explanation": "Selecting 5 at index 0 and 8 at index 3 gives a balanced sum of 13."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {long}\n */\nfunction maxBalancedSubsequenceSum(nums) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def max_balanced_subsequence_sum(nums: list[int]) -> Any:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public Object maxBalancedSubsequenceSum(int[] nums) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    auto maxBalancedSubsequenceSum(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [3,3,5,6]",
        "expected": "14",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [5,-1,-3,8]",
        "expected": "13",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [-7]",
        "expected": "-7",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [-5,-2,-8]",
        "expected": "-2",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [1,2,3]",
        "expected": "6",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [4,5,6]",
        "expected": "15",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [-1000000000,1000000000]",
        "expected": "1000000000",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  },
  {
    "id": "arrmat-099",
    "title": "Maximum Total Reward With Increasing Choices",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Bit Manipulation"
    ],
    "acceptance": "32.8%",
    "submissions": "3.0K",
    "description": "You are given a multiset of positive integer reward values and start with a total reward of zero. You may choose a value v that has not been chosen before only when v is strictly greater than your current total; your total then increases by v. Return the maximum total reward achievable.\n\n### Input Format\n- `rewardValues`: Array of positive integer reward values; each array position is a separately available reward\n\n### Output Format\nThe maximum total reward achievable.\n\n### Expected Time Complexity\n`O(n * maxReward) with bitset optimization`\n\n### Expected Space Complexity\n`O(maxReward) bits`",
    "examples": [
      {
        "input": "rewardValues = [1,1,3,3]",
        "output": "4",
        "explanation": "Choose one reward 1, then one reward 3; the total becomes 4."
      },
      {
        "input": "rewardValues = [1,6,4,3,2]",
        "output": "11",
        "explanation": "Choose 1, then 4, then 6; each chosen reward is greater than the total before it is added."
      }
    ],
    "constraints": [
      "1 <= rewardValues.length <= 2000",
      "1 <= rewardValues[i] <= 2000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} rewardValues\n * @return {integer}\n */\nfunction maxTotalReward(rewardValues) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def max_total_reward(rewardValues: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int maxTotalReward(int[] rewardValues) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxTotalReward(vector<int>& rewardValues) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "rewardValues = [1,1,3,3]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "rewardValues = [1,6,4,3,2]",
        "expected": "11",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "rewardValues = [5]",
        "expected": "5",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "rewardValues = [2,2]",
        "expected": "2",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "rewardValues = [1,2,4]",
        "expected": "7",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "rewardValues = [3,3,3]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "rewardValues = [7,8]",
        "expected": "15",
        "isHidden": true
      }
    ],
    "orderInvariant": true
  },
  {
    "id": "arrmat-100",
    "title": "Count Ways to Split an Array Into Three Ordered Parts",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Prefix Sum",
      "Binary Search"
    ],
    "acceptance": "33.8%",
    "submissions": "13.4K",
    "description": "Given an array nums of non-negative integers, count the ways to split it into three non-empty contiguous parts with sums left, middle, and right such that left <= middle <= right. Return the count modulo 1,000,000,007.\n\n### Input Format\n- `nums`: Array of non-negative integers\n\n### Output Format\nThe number of valid split pairs modulo 1,000,000,007.\n\n### Expected Time Complexity\n`O(n log n)`\n\n### Expected Space Complexity\n`O(n)`",
    "examples": [
      {
        "input": "nums = [1,1,1]",
        "output": "1",
        "explanation": "The only split has sums 1, 1, and 1."
      },
      {
        "input": "nums = [1,2,2,2,5,0]",
        "output": "3",
        "explanation": "There are three split positions satisfying left <= middle <= right."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 100000",
      "0 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {integer[]} nums\n * @return {integer}\n */\nfunction countThreeWayNondecreasingSplits(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def count_three_way_nondecreasing_splits(nums: list[int]) -> int:\n    # Write your solution here\n    pass\n",
      "java": "class Solution {\n    public int countThreeWayNondecreasingSplits(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countThreeWayNondecreasingSplits(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1,1,1]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1,2,2,2,5,0]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "nums = [0,0,0]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 4,
        "input": "nums = [10,1,1]",
        "expected": "0",
        "isHidden": true
      },
      {
        "caseNumber": 5,
        "input": "nums = [0,0,0,0]",
        "expected": "3",
        "isHidden": true
      },
      {
        "caseNumber": 6,
        "input": "nums = [1000000000,1000000000,1000000000]",
        "expected": "1",
        "isHidden": true
      },
      {
        "caseNumber": 7,
        "input": "nums = [1,1,0,0,0]",
        "expected": "0",
        "isHidden": true
      }
    ],
    "orderInvariant": false
  }
];
