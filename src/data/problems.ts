import type { Problem } from '../types';

export const initialProblems: Problem[] = [
  {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "nums = [3, 2, 4], target = 6",
        "output": "[1, 2]"
      },
      {
        "input": "nums = [3, 3], target = 6",
        "output": "[0, 1]"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10⁴",
      "-10⁹ <= nums[i] <= 10⁹",
      "-10⁹ <= target <= 10⁹",
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
    "acceptance": "—",
    "submissions": "0",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    "examples": [
      {
        "input": "s = \"()\"",
        "output": "true"
      },
      {
        "input": "s = \"()[]{}\"",
        "output": "true"
      },
      {
        "input": "s = \"(]\"",
        "output": "false"
      },
      {
        "input": "s = \"([])\"",
        "output": "true"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10⁴",
      "s consists of parentheses only '()[]{}'."
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
        "input": "s = \"()\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"()[]{}\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 3,
        "input": "s = \"(]\"",
        "expected": "false",
        "isHidden": false
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
    "acceptance": "—",
    "submissions": "0",
    "description": "Given a string s, find the length of the longest substring without repeating characters.",
    "examples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "The answer is \"abc\", with the length of 3."
      },
      {
        "input": "s = \"bbbbb\"",
        "output": "1",
        "explanation": "The answer is \"b\", with the length of 1."
      },
      {
        "input": "s = \"pwwkew\"",
        "output": "3",
        "explanation": "The answer is \"wke\", with the length of 3."
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
    "acceptance": "—",
    "submissions": "0",
    "description": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
    "examples": [
      {
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "output": "49",
        "explanation": "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49."
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
    "acceptance": "—",
    "submissions": "0",
    "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
    "examples": [
      {
        "input": "nums1 = [1,3], nums2 = [2]",
        "output": "2.00000",
        "explanation": "merged array = [1,2,3] and median is 2."
      },
      {
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "output": "2.50000",
        "explanation": "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    "constraints": [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10⁶ <= nums1[i], nums2[i] <= 10⁶"
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
        "expected": "2.00000",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "expected": "2.50000",
        "isHidden": false
      }
    ]
  },
  {
    "id": "binary-tree-level-order",
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "topics": [
      "Tree",
      "Binary Tree",
      "Breadth-First Search"
    ],
    "acceptance": "—",
    "submissions": "0",
    "description": "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "[[3],[9,20],[15,7]]"
      },
      {
        "input": "root = [1]",
        "output": "[[1]]"
      },
      {
        "input": "root = []",
        "output": "[]"
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
    "id": "reverse-linked-list",
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "description": "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[5,4,3,2,1]"
      },
      {
        "input": "head = [1,2]",
        "output": "[2,1]"
      },
      {
        "input": "head = []",
        "output": "[]"
      }
    ],
    "constraints": [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    "starterCode": {
      "javascript": "function reverseList(head) {\n  // Write your solution here\n  return null;\n}\n",
      "python": "def reverse_list(head):\n    # Write your solution here\n    return None\n",
      "java": "class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your solution here\n        return null;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write your solution here\n        return nullptr;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "head = [1,2,3,4,5]",
        "expected": "[5,4,3,2,1]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "head = [1,2]",
        "expected": "[2,1]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "climbing-stairs",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "topics": [
      "Dynamic Programming",
      "Math",
      "Memoization"
    ],
    "acceptance": "—",
    "submissions": "0",
    "description": "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "examples": [
      {
        "input": "n = 2",
        "output": "2",
        "explanation": "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps"
      },
      {
        "input": "n = 3",
        "output": "3",
        "explanation": "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
      }
    ],
    "constraints": [
      "1 <= n <= 45"
    ],
    "starterCode": {
      "javascript": "function climbStairs(n) {\n  // Write your solution here\n  return 0;\n}\n",
      "python": "def climb_stairs(n: int) -> int:\n    # Write your solution here\n    return 0\n",
      "java": "class Solution {\n    public int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 2",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 3",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "maximum-subarray",
    "title": "Maximum Subarray",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Kadane"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums`, find the contiguous subarray with the largest sum and return its sum.",
    "examples": [
      {
        "input": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        "output": "6",
        "explanation": "Subarray [4, -1, 2, 1] has the largest sum 6."
      },
      {
        "input": "nums = [1]",
        "output": "1",
        "explanation": "Single element subarray."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def max_subarray(nums: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxSubArray(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "move-zeroes",
    "title": "Move Zeroes",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements, and return the modified array.",
    "examples": [
      {
        "input": "nums = [0, 1, 0, 3, 12]",
        "output": "[1, 3, 12, 0, 0]",
        "explanation": "Non-zeros keep relative order [1, 3, 12] followed by zeros."
      },
      {
        "input": "nums = [0]",
        "output": "[0]",
        "explanation": "Single zero stays in place."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def move_zeroes(nums: list[int]) -> list[int]:\n    # Write your solution here\n    return nums\n",
      "javascript": "function moveZeroes(nums) {\n  // Write your solution here\n  return nums;\n}\n",
      "java": "class Solution {\n    public int[] moveZeroes(int[] nums) {\n        // Write your solution here\n        return nums;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> moveZeroes(vector<int>& nums) {\n        // Write your solution here\n        return nums;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [0, 1, 0, 3, 12]",
        "expected": "[1, 3, 12, 0, 0]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0]",
        "expected": "[0]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "find-disappeared-numbers",
    "title": "Find All Numbers Disappeared in an Array",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Cyclic Sort"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array `nums` of `n` integers where `nums[i]` is in the range `[1, n]`, return an array of all integers in `[1, n]` that do not appear in `nums` using O(1) extra space (excluding output).",
    "examples": [
      {
        "input": "nums = [4, 3, 2, 7, 8, 2, 3, 1]",
        "output": "[5, 6]",
        "explanation": "5 and 6 never appear in nums."
      },
      {
        "input": "nums = [1, 1]",
        "output": "[2]",
        "explanation": "2 is missing from [1, 2]."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "1 <= nums[i] <= nums.length"
    ],
    "starterCode": {
      "python": "def find_disappeared_numbers(nums: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function findDisappearedNumbers(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> findDisappearedNumbers(int[] nums) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> findDisappearedNumbers(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [4, 3, 2, 7, 8, 2, 3, 1]",
        "expected": "[5, 6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 1]",
        "expected": "[2]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "spiral-matrix",
    "title": "Spiral Matrix",
    "difficulty": "Medium",
    "topics": [
      "Matrix",
      "Array",
      "Simulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `m x n` `matrix`, return all elements of the matrix in clockwise spiral order.",
    "examples": [
      {
        "input": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "output": "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
        "explanation": "Clockwise outer ring followed by center 5."
      },
      {
        "input": "matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]",
        "output": "[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
        "explanation": "Rectangular 3x4 spiral traversal."
      }
    ],
    "constraints": [
      "1 <= m, n <= 10",
      "-100 <= matrix[i][j] <= 100"
    ],
    "starterCode": {
      "python": "def spiral_order(matrix: list[list[int]]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function spiralOrder(matrix) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "expected": "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]",
        "expected": "[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "rotate-image",
    "title": "Rotate Image",
    "difficulty": "Medium",
    "topics": [
      "Matrix",
      "Array",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an `n x n` 2D `matrix` representing an image. Rotate the image by 90 degrees clockwise in-place and return the rotated matrix.",
    "examples": [
      {
        "input": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "output": "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
        "explanation": "Rotated 90 degrees clockwise."
      },
      {
        "input": "matrix = [[1, 2], [3, 4]]",
        "output": "[[3, 1], [4, 2]]",
        "explanation": "2x2 clockwise rotation."
      }
    ],
    "constraints": [
      "1 <= n <= 20",
      "-1000 <= matrix[i][j] <= 1000"
    ],
    "starterCode": {
      "python": "def rotate_image(matrix: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    return matrix\n",
      "javascript": "function rotateImage(matrix) {\n  // Write your solution here\n  return matrix;\n}\n",
      "java": "class Solution {\n    public int[][] rotateImage(int[][] matrix) {\n        // Write your solution here\n        return matrix;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> rotateImage(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return matrix;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "expected": "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1, 2], [3, 4]]",
        "expected": "[[3, 1], [4, 2]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "set-matrix-zeroes",
    "title": "Set Matrix Zeroes",
    "difficulty": "Medium",
    "topics": [
      "Matrix",
      "Array",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `m x n` integer `matrix`, if an element is `0`, set its entire row and column to `0` in-place using O(1) extra space, and return the modified matrix.",
    "examples": [
      {
        "input": "matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]",
        "output": "[[1, 0, 1], [0, 0, 0], [1, 0, 1]]",
        "explanation": "Row 1 and column 1 become zero."
      },
      {
        "input": "matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]",
        "output": "[[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]",
        "explanation": "Row 0, col 0, and col 3 become zero."
      }
    ],
    "constraints": [
      "1 <= m, n <= 200",
      "-2^31 <= matrix[i][j] <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def set_zeroes(matrix: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    return matrix\n",
      "javascript": "function setZeroes(matrix) {\n  // Write your solution here\n  return matrix;\n}\n",
      "java": "class Solution {\n    public int[][] setZeroes(int[][] matrix) {\n        // Write your solution here\n        return matrix;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> setZeroes(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return matrix;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]",
        "expected": "[[1, 0, 1], [0, 0, 0], [1, 0, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]",
        "expected": "[[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "insert-interval",
    "title": "Insert Interval",
    "difficulty": "Medium",
    "topics": [
      "Intervals",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an array of non-overlapping `intervals` sorted by start time and a `new_interval`. Insert `new_interval` into `intervals` such that the result remains sorted and non-overlapping (merging overlapping intervals if necessary).",
    "examples": [
      {
        "input": "intervals = [[1, 3], [6, 9]], new_interval = [2, 5]",
        "output": "[[1, 5], [6, 9]]",
        "explanation": "[2, 5] overlaps [1, 3] and merges into [1, 5]."
      },
      {
        "input": "intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], new_interval = [4, 8]",
        "output": "[[1, 2], [3, 10], [12, 16]]",
        "explanation": "[4, 8] merges [3, 5], [6, 7], and [8, 10]."
      }
    ],
    "constraints": [
      "0 <= intervals.length <= 10^4",
      "intervals is sorted in ascending order by start time."
    ],
    "starterCode": {
      "python": "def insert_interval(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function insertInterval(intervals, newInterval) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[][] insertInterval(int[][] intervals, int[] newInterval) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> insertInterval(vector<vector<int>>& intervals, vector<int>& newInterval) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "intervals = [[1, 3], [6, 9]], new_interval = [2, 5]",
        "expected": "[[1, 5], [6, 9]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], new_interval = [4, 8]",
        "expected": "[[1, 2], [3, 10], [12, 16]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "non-overlapping-intervals",
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "topics": [
      "Intervals",
      "Greedy",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of `intervals`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping (touching endpoints like `[1, 2]` and `[2, 3]` are non-overlapping).",
    "examples": [
      {
        "input": "intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]",
        "output": "1",
        "explanation": "Removing [1, 3] leaves three non-overlapping intervals."
      },
      {
        "input": "intervals = [[1, 2], [1, 2], [1, 2]]",
        "output": "2",
        "explanation": "Keep one [1, 2] and remove two."
      }
    ],
    "constraints": [
      "1 <= intervals.length <= 10^5",
      "-5 * 10^4 <= start < end <= 5 * 10^4"
    ],
    "starterCode": {
      "python": "def erase_overlap_intervals(intervals: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function eraseOverlapIntervals(intervals) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "intervals = [[1, 2], [1, 2], [1, 2]]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "meeting-rooms-ii",
    "title": "Meeting Rooms II",
    "difficulty": "Medium",
    "topics": [
      "Intervals",
      "Heap",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of meeting time `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of conference rooms required.",
    "examples": [
      {
        "input": "intervals = [[0, 30], [5, 10], [15, 20]]",
        "output": "2",
        "explanation": "[0, 30] overlaps with [5, 10] and [15, 20], needing 2 rooms."
      },
      {
        "input": "intervals = [[7, 10], [2, 4]]",
        "output": "1",
        "explanation": "No overlap, so 1 room suffices."
      }
    ],
    "constraints": [
      "1 <= intervals.length <= 10^4",
      "0 <= start_i < end_i <= 10^6"
    ],
    "starterCode": {
      "python": "def min_meeting_rooms(intervals: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minMeetingRooms(intervals) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minMeetingRooms(int[][] intervals) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minMeetingRooms(vector<vector<int>>& intervals) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "intervals = [[0, 30], [5, 10], [15, 20]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "intervals = [[7, 10], [2, 4]]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "contiguous-array",
    "title": "Contiguous Array",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Hash Table",
      "Prefix Sum"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary array `nums` containing only `0`s and `1`s, return the maximum length of a contiguous subarray with an equal number of `0` and `1`.",
    "examples": [
      {
        "input": "nums = [0, 1]",
        "output": "2",
        "explanation": "[0, 1] has one 0 and one 1."
      },
      {
        "input": "nums = [0, 1, 0]",
        "output": "2",
        "explanation": "[0, 1] or [1, 0] has length 2."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "nums[i] is either 0 or 1."
    ],
    "starterCode": {
      "python": "def find_max_length(nums: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function findMaxLength(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int findMaxLength(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findMaxLength(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [0, 1]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0, 1, 0]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "subarray-sums-divisible-by-k",
    "title": "Subarray Sums Divisible by K",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Hash Table",
      "Prefix Sum"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums` and an integer `k`, return the number of non-empty contiguous subarrays that have a sum divisible by `k`.",
    "examples": [
      {
        "input": "nums = [4, 5, 0, -2, -3, 1], k = 5",
        "output": "7",
        "explanation": "7 subarrays have sums divisible by 5."
      },
      {
        "input": "nums = [5], k = 9",
        "output": "0",
        "explanation": "5 is not divisible by 9."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "2 <= k <= 10^4"
    ],
    "starterCode": {
      "python": "def subarrays_div_by_k(nums: list[int], k: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function subarraysDivByK(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int subarraysDivByK(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int subarraysDivByK(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [4, 5, 0, -2, -3, 1], k = 5",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [5], k = 9",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "four-sum",
    "title": "4Sum",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given an array `nums` of `n` integers and an integer `target`, return all unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` with distinct indices that sum to `target`.",
    "examples": [
      {
        "input": "nums = [1, 0, -1, 0, -2, 2], target = 0",
        "output": "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]",
        "explanation": "Three unique quadruplets sum to 0."
      },
      {
        "input": "nums = [2, 2, 2, 2, 2], target = 8",
        "output": "[[2, 2, 2, 2]]",
        "explanation": "Single unique quadruplet."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 200",
      "-10^9 <= nums[i], target <= 10^9"
    ],
    "starterCode": {
      "python": "def four_sum(nums: list[int], target: int) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function fourSum(nums, target) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> fourSum(int[] nums, int target) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> fourSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 0, -1, 0, -2, 2], target = 0",
        "expected": "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [2, 2, 2, 2, 2], target = 8",
        "expected": "[[2, 2, 2, 2]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "next-permutation",
    "title": "Next Permutation",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of integers `nums`, rearrange it in-place into its lexicographically next greater permutation (or the lowest sorted order if no greater permutation exists), and return `nums`.",
    "examples": [
      {
        "input": "nums = [1, 2, 3]",
        "output": "[1, 3, 2]",
        "explanation": "Next lexicographical permutation of [1, 2, 3]."
      },
      {
        "input": "nums = [3, 2, 1]",
        "output": "[1, 2, 3]",
        "explanation": "Already highest, so wraps to lowest permutation."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 100"
    ],
    "starterCode": {
      "python": "def next_permutation(nums: list[int]) -> list[int]:\n    # Write your solution here\n    return nums\n",
      "javascript": "function nextPermutation(nums) {\n  // Write your solution here\n  return nums;\n}\n",
      "java": "class Solution {\n    public int[] nextPermutation(int[] nums) {\n        // Write your solution here\n        return nums;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> nextPermutation(vector<int>& nums) {\n        // Write your solution here\n        return nums;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 2, 3]",
        "expected": "[1, 3, 2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3, 2, 1]",
        "expected": "[1, 2, 3]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "pascals-triangle",
    "title": "Pascal's Triangle",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer `num_rows`, return the first `num_rows` of Pascal's triangle.",
    "examples": [
      {
        "input": "num_rows = 5",
        "output": "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]",
        "explanation": "Each interior number is the sum of the two numbers directly above it."
      },
      {
        "input": "num_rows = 1",
        "output": "[[1]]",
        "explanation": "Single row."
      }
    ],
    "constraints": [
      "1 <= num_rows <= 30"
    ],
    "starterCode": {
      "python": "def generate_pascal(num_rows: int) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function generatePascal(numRows) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> generatePascal(int numRows) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> generatePascal(int numRows) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "num_rows = 5",
        "expected": "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "num_rows = 1",
        "expected": "[[1]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "merge-sorted-array-inplace",
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given two sorted integer arrays `nums1` (length `m + n`, with trailing `0` placeholders) and `nums2` (length `n`), along with `m` and `n`. Merge `nums2` into `nums1` in-place in non-decreasing order and return `nums1`.",
    "examples": [
      {
        "input": "nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3",
        "output": "[1, 2, 2, 3, 5, 6]",
        "explanation": "Merged from back to front without extra space."
      },
      {
        "input": "nums1 = [1], m = 1, nums2 = [], n = 0",
        "output": "[1]",
        "explanation": "Empty nums2 leaves nums1 unchanged."
      }
    ],
    "constraints": [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 <= m, n <= 200"
    ],
    "starterCode": {
      "python": "def merge_sorted_array(nums1: list[int], m: int, nums2: list[int], n: int) -> list[int]:\n    # Write your solution here\n    return nums1\n",
      "javascript": "function mergeSortedArray(nums1, m, nums2, n) {\n  // Write your solution here\n  return nums1;\n}\n",
      "java": "class Solution {\n    public int[] mergeSortedArray(int[] nums1, int m, int[] nums2, int n) {\n        // Write your solution here\n        return nums1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> mergeSortedArray(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        // Write your solution here\n        return nums1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3",
        "expected": "[1, 2, 2, 3, 5, 6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums1 = [1], m = 1, nums2 = [], n = 0",
        "expected": "[1]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "intersection-of-two-arrays-ii",
    "title": "Intersection of Two Arrays II",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given two integer arrays `nums1` and `nums2`, return an array of their intersection where each element appears as many times as it shows in both arrays. You may return the result in any order.",
    "examples": [
      {
        "input": "nums1 = [1, 2, 2, 1], nums2 = [2, 2]",
        "output": "[2, 2]",
        "explanation": "2 appears twice in both arrays."
      },
      {
        "input": "nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]",
        "output": "[4, 9]",
        "explanation": "4 and 9 appear at least once in both."
      }
    ],
    "constraints": [
      "1 <= nums1.length, nums2.length <= 1000",
      "0 <= nums1[i], nums2[i] <= 1000"
    ],
    "starterCode": {
      "python": "def intersect_arrays(nums1: list[int], nums2: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function intersectArrays(nums1, nums2) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] intersectArrays(int[] nums1, int[] nums2) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> intersectArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums1 = [1, 2, 2, 1], nums2 = [2, 2]",
        "expected": "[2, 2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]",
        "expected": "[4, 9]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "isomorphic-strings",
    "title": "Isomorphic Strings",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two strings `s` and `t` of equal length, determine if they are isomorphic: characters in `s` can be replaced with a one-to-one (bijective) mapping to get `t` while preserving order.",
    "examples": [
      {
        "input": "s = \"egg\", t = \"add\"",
        "output": "true",
        "explanation": "e -> a and g -> d is a valid bijection."
      },
      {
        "input": "s = \"foo\", t = \"bar\"",
        "output": "false",
        "explanation": "'o' cannot map to both 'a' and 'r'."
      }
    ],
    "constraints": [
      "1 <= s.length == t.length <= 5 * 10^4",
      "s and t consist of any valid ASCII character."
    ],
    "starterCode": {
      "python": "def is_isomorphic(s: str, t: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isIsomorphic(s, t) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isIsomorphic(String s, String t) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isIsomorphic(string s, string t) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"egg\", t = \"add\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"foo\", t = \"bar\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "word-pattern",
    "title": "Word Pattern",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a `pattern` and a space-separated string `s`, return `true` if `s` follows the exact same bijection between each letter in `pattern` and each non-empty word in `s`.",
    "examples": [
      {
        "input": "pattern = \"abba\", s = \"dog cat cat dog\"",
        "output": "true",
        "explanation": "a <-> dog, b <-> cat."
      },
      {
        "input": "pattern = \"abba\", s = \"dog dog dog dog\"",
        "output": "false",
        "explanation": "a and b cannot both map to \"dog\"."
      }
    ],
    "constraints": [
      "1 <= pattern.length <= 300",
      "1 <= s.length <= 3000"
    ],
    "starterCode": {
      "python": "def word_pattern(pattern: str, s: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function wordPattern(pattern, s) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean wordPattern(String pattern, String s) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool wordPattern(string pattern, string s) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "pattern = \"abba\", s = \"dog cat cat dog\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "pattern = \"abba\", s = \"dog dog dog dog\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ransom-note",
    "title": "Ransom Note",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Hash Table",
      "Counting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two strings `ransom_note` and `magazine`, return `true` if `ransom_note` can be constructed by using the letters from `magazine` (each letter in `magazine` can only be used once), and `false` otherwise.",
    "examples": [
      {
        "input": "ransom_note = \"aa\", magazine = \"aab\"",
        "output": "true",
        "explanation": "Two 'a's are available in \"aab\"."
      },
      {
        "input": "ransom_note = \"aa\", magazine = \"ab\"",
        "output": "false",
        "explanation": "Only one 'a' is available."
      }
    ],
    "constraints": [
      "1 <= ransom_note.length, magazine.length <= 10^5",
      "Both consist of lowercase English letters."
    ],
    "starterCode": {
      "python": "def can_construct(ransom_note: str, magazine: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function canConstruct(ransomNote, magazine) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean canConstruct(String ransomNote, String magazine) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canConstruct(string ransomNote, string magazine) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ransom_note = \"aa\", magazine = \"aab\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ransom_note = \"aa\", magazine = \"ab\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "find-all-anagrams-in-a-string",
    "title": "Find All Anagrams in a String",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s` in ascending order.",
    "examples": [
      {
        "input": "s = \"cbaebabacd\", p = \"abc\"",
        "output": "[0, 6]",
        "explanation": "\"cba\" at 0 and \"bac\" at 6 are anagrams of \"abc\"."
      },
      {
        "input": "s = \"abab\", p = \"ab\"",
        "output": "[0, 1, 2]",
        "explanation": "\"ab\", \"ba\", and \"ab\" start at indices 0, 1, 2."
      }
    ],
    "constraints": [
      "1 <= s.length, p.length <= 3 * 10^4",
      "s and p consist of lowercase English letters."
    ],
    "starterCode": {
      "python": "def find_anagrams(s: str, p: str) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function findAnagrams(s, p) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> findAnagrams(String s, String p) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> findAnagrams(string s, string p) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"cbaebabacd\", p = \"abc\"",
        "expected": "[0, 6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"abab\", p = \"ab\"",
        "expected": "[0, 1, 2]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "permutation-in-string",
    "title": "Permutation in String",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.",
    "examples": [
      {
        "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
        "output": "true",
        "explanation": "s2 contains \"ba\", which is a permutation of \"ab\"."
      },
      {
        "input": "s1 = \"ab\", s2 = \"eidboaoo\"",
        "output": "false",
        "explanation": "No contiguous substring of length 2 is a permutation of \"ab\"."
      }
    ],
    "constraints": [
      "1 <= s1.length, s2.length <= 10^4",
      "Lowercase English letters only."
    ],
    "starterCode": {
      "python": "def check_inclusion(s1: str, s2: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function checkInclusion(s1, s2) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean checkInclusion(String s1, String s2) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool checkInclusion(string s1, string s2) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s1 = \"ab\", s2 = \"eidboaoo\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "max-consecutive-ones-iii",
    "title": "Max Consecutive Ones III",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary array `nums` and an integer `k`, return the maximum number of consecutive `1`'s in the array if you can flip at most `k` `0`'s.",
    "examples": [
      {
        "input": "nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k = 2",
        "output": "6",
        "explanation": "Flipping two 0s yields 6 consecutive 1s."
      },
      {
        "input": "nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k = 3",
        "output": "10",
        "explanation": "Flipping three 0s yields length 10."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "nums[i] is 0 or 1",
      "0 <= k <= nums.length"
    ],
    "starterCode": {
      "python": "def longest_ones(nums: list[int], k: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestOnes(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestOnes(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestOnes(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k = 2",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k = 3",
        "expected": "10",
        "isHidden": false
      }
    ]
  },
  {
    "id": "fruit-into-baskets",
    "title": "Fruit Into Baskets",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `fruits` where `fruits[i]` is the type of fruit the `i`-th tree produces, return the length of the longest contiguous subarray containing at most `2` distinct fruit types.",
    "examples": [
      {
        "input": "fruits = [1, 2, 1]",
        "output": "3",
        "explanation": "All 3 trees have at most 2 fruit types."
      },
      {
        "input": "fruits = [1, 2, 3, 2, 2]",
        "output": "4",
        "explanation": "Subarray [2, 3, 2, 2] has length 4."
      }
    ],
    "constraints": [
      "1 <= fruits.length <= 10^5",
      "0 <= fruits[i] < fruits.length"
    ],
    "starterCode": {
      "python": "def total_fruit(fruits: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function totalFruit(fruits) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int totalFruit(int[] fruits) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int totalFruit(vector<int>& fruits) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "fruits = [1, 2, 1]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "fruits = [1, 2, 3, 2, 2]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "subarray-product-less-than-k",
    "title": "Subarray Product Less Than K",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of positive integers `nums` and an integer `k`, return the number of contiguous subarrays where the product of all elements in the subarray is strictly less than `k`.",
    "examples": [
      {
        "input": "nums = [10, 5, 2, 6], k = 100",
        "output": "8",
        "explanation": "8 subarrays have product < 100."
      },
      {
        "input": "nums = [1, 2, 3], k = 0",
        "output": "0",
        "explanation": "Positive products cannot be strictly less than 0."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "1 <= nums[i] <= 1000",
      "0 <= k <= 10^6"
    ],
    "starterCode": {
      "python": "def num_subarray_product_less_than_k(nums: list[int], k: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function numSubarrayProductLessThanK(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int numSubarrayProductLessThanK(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numSubarrayProductLessThanK(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [10, 5, 2, 6], k = 100",
        "expected": "8",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 2, 3], k = 0",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "boats-to-save-people",
    "title": "Boats to Save People",
    "difficulty": "Medium",
    "topics": [
      "Two Pointers",
      "Greedy",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an array `people` where `people[i]` is the weight of the `i`-th person, and each boat carries at most two people with combined weight at most `limit`. Return the minimum number of boats to carry every given person.",
    "examples": [
      {
        "input": "people = [1, 2], limit = 3",
        "output": "1",
        "explanation": "One boat carries (1, 2)."
      },
      {
        "input": "people = [3, 2, 2, 1], limit = 3",
        "output": "3",
        "explanation": "Boats: (1, 2), (2), (3)."
      }
    ],
    "constraints": [
      "1 <= people.length <= 5 * 10^4",
      "1 <= people[i] <= limit <= 3 * 10^4"
    ],
    "starterCode": {
      "python": "def num_rescue_boats(people: list[int], limit: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function numRescueBoats(people, limit) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int numRescueBoats(int[] people, int limit) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numRescueBoats(vector<int>& people, int limit) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "people = [1, 2], limit = 3",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "people = [3, 2, 2, 1], limit = 3",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "backspace-string-compare",
    "title": "Backspace String Compare",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Two Pointers",
      "Stack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two strings `s` and `t`, return `true` if they are equal when both are typed into empty text editors where `'#'` means a backspace character.",
    "examples": [
      {
        "input": "s = \"ab#c\", t = \"ad#c\"",
        "output": "true",
        "explanation": "Both become \"ac\"."
      },
      {
        "input": "s = \"a#c\", t = \"b\"",
        "output": "false",
        "explanation": "s becomes \"c\" while t becomes \"b\"."
      }
    ],
    "constraints": [
      "1 <= s.length, t.length <= 200",
      "s and t contain only lowercase letters and '#' characters."
    ],
    "starterCode": {
      "python": "def backspace_compare(s: str, t: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function backspaceCompare(s, t) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean backspaceCompare(String s, String t) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool backspaceCompare(string s, string t) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"ab#c\", t = \"ad#c\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"a#c\", t = \"b\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "roman-to-integer",
    "title": "Roman to Integer",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Hash Table",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a valid Roman numeral string `s` (in range 1 to 3999), convert it to an integer.",
    "examples": [
      {
        "input": "s = \"LVIII\"",
        "output": "58",
        "explanation": "L = 50, V = 5, III = 3."
      },
      {
        "input": "s = \"MCMXCIV\"",
        "output": "1994",
        "explanation": "M = 1000, CM = 900, XC = 90, IV = 4."
      }
    ],
    "constraints": [
      "1 <= s.length <= 15",
      "s is a valid Roman numeral in [1, 3999]."
    ],
    "starterCode": {
      "python": "def roman_to_int(s: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function romanToInt(s) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int romanToInt(String s) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int romanToInt(string s) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"LVIII\"",
        "expected": "58",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"MCMXCIV\"",
        "expected": "1994",
        "isHidden": false
      }
    ]
  },
  {
    "id": "integer-to-roman",
    "title": "Integer to Roman",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Greedy",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer `num` in the range `[1, 3999]`, convert it to a Roman numeral.",
    "examples": [
      {
        "input": "num = 3749",
        "output": "\"MMMDCCXLIX\"",
        "explanation": "3000 + 700 + 40 + 9."
      },
      {
        "input": "num = 58",
        "output": "\"LVIII\"",
        "explanation": "50 + 5 + 3."
      }
    ],
    "constraints": [
      "1 <= num <= 3999"
    ],
    "starterCode": {
      "python": "def int_to_roman(num: int) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function intToRoman(num) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String intToRoman(int num) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string intToRoman(int num) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "num = 3749",
        "expected": "\"MMMDCCXLIX\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "num = 58",
        "expected": "\"LVIII\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "multiply-strings",
    "title": "Multiply Strings",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Math",
      "Simulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string, without converting the inputs directly to big integers.",
    "examples": [
      {
        "input": "num1 = \"2\", num2 = \"3\"",
        "output": "\"6\"",
        "explanation": "2 * 3 = 6."
      },
      {
        "input": "num1 = \"123\", num2 = \"456\"",
        "output": "\"56088\"",
        "explanation": "123 * 456 = 56088."
      }
    ],
    "constraints": [
      "1 <= num1.length, num2.length <= 200",
      "Digits only, no leading zeros except \"0\"."
    ],
    "starterCode": {
      "python": "def multiply_strings(num1: str, num2: str) -> str:\n    # Write your solution here\n    return \"0\"\n",
      "javascript": "function multiplyStrings(num1, num2) {\n  // Write your solution here\n  return \"0\";\n}\n",
      "java": "class Solution {\n    public String multiplyStrings(String num1, String num2) {\n        // Write your solution here\n        return \"0\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string multiplyStrings(string num1, string num2) {\n        // Write your solution here\n        return \"0\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "num1 = \"2\", num2 = \"3\"",
        "expected": "\"6\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "num1 = \"123\", num2 = \"456\"",
        "expected": "\"56088\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "add-binary",
    "title": "Add Binary",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Bit Manipulation",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two binary strings `a` and `b`, return their sum as a binary string.",
    "examples": [
      {
        "input": "a = \"11\", b = \"1\"",
        "output": "\"100\"",
        "explanation": "3 + 1 = 4 (100 in binary)."
      },
      {
        "input": "a = \"1010\", b = \"1011\"",
        "output": "\"10101\"",
        "explanation": "10 + 11 = 21."
      }
    ],
    "constraints": [
      "1 <= a.length, b.length <= 10^4",
      "a and b consist only of '0' or '1'."
    ],
    "starterCode": {
      "python": "def add_binary(a: str, b: str) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function addBinary(a, b) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String addBinary(String a, String b) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string addBinary(string a, string b) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"11\", b = \"1\"",
        "expected": "\"100\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"1010\", b = \"1011\"",
        "expected": "\"10101\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "string-compression",
    "title": "String Compression",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of characters `chars`, compress consecutive repeating characters in-place: a single character stays as is, while a group of length `> 1` is followed by the digits of its count. Return the compressed list of characters.",
    "examples": [
      {
        "input": "chars = [\"a\", \"a\", \"b\", \"b\", \"c\", \"c\", \"c\"]",
        "output": "[\"a\", \"2\", \"b\", \"2\", \"c\", \"3\"]",
        "explanation": "Groups are \"aa\", \"bb\", \"ccc\"."
      },
      {
        "input": "chars = [\"a\"]",
        "output": "[\"a\"]",
        "explanation": "Single character has no count digit."
      }
    ],
    "constraints": [
      "1 <= chars.length <= 2000",
      "chars[i] is a printable ASCII character."
    ],
    "starterCode": {
      "python": "def compress_chars(chars: list[str]) -> list[str]:\n    # Write your solution here\n    return []\n",
      "javascript": "function compressChars(chars) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public char[] compressChars(char[] chars) {\n        // Write your solution here\n        return new char[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<char> compressChars(vector<char>& chars) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "chars = [\"a\", \"a\", \"b\", \"b\", \"c\", \"c\", \"c\"]",
        "expected": "[\"a\", \"2\", \"b\", \"2\", \"c\", \"3\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "chars = [\"a\"]",
        "expected": "[\"a\"]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "remove-k-digits",
    "title": "Remove K Digits",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Monotonic Stack",
      "Greedy",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a string `num` representing a non-negative integer and an integer `k`, return the smallest possible integer as a string after removing `k` digits from `num` (with no leading zeros).",
    "examples": [
      {
        "input": "num = \"1432219\", k = 3",
        "output": "\"1219\"",
        "explanation": "Remove 4, 3, 2 to form 1219."
      },
      {
        "input": "num = \"10200\", k = 1",
        "output": "\"200\"",
        "explanation": "Removing 1 leaves 0200 -> 200."
      }
    ],
    "constraints": [
      "1 <= k <= num.length <= 10^5",
      "num consists of digits only."
    ],
    "starterCode": {
      "python": "def remove_k_digits(num: str, k: int) -> str:\n    # Write your solution here\n    return \"0\"\n",
      "javascript": "function removeKDigits(num, k) {\n  // Write your solution here\n  return \"0\";\n}\n",
      "java": "class Solution {\n    public String removeKDigits(String num, int k) {\n        // Write your solution here\n        return \"0\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string removeKDigits(string num, int k) {\n        // Write your solution here\n        return \"0\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "num = \"1432219\", k = 3",
        "expected": "\"1219\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "num = \"10200\", k = 1",
        "expected": "\"200\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "online-stock-span",
    "title": "Online Stock Span",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Monotonic Stack",
      "Design"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of daily stock `prices`, return an array where the `i`-th value is the span of the stock's price on day `i`: the maximum number of consecutive days (ending at day `i`) for which the stock price was less than or equal to `prices[i]`.",
    "examples": [
      {
        "input": "prices = [100, 80, 60, 70, 60, 75, 85]",
        "output": "[1, 1, 1, 2, 1, 4, 6]",
        "explanation": "Day 6 (85) spans [80, 60, 70, 60, 75, 85] = 6 days."
      },
      {
        "input": "prices = [10, 20, 30]",
        "output": "[1, 2, 3]",
        "explanation": "Strictly rising prices accumulate span."
      }
    ],
    "constraints": [
      "1 <= prices.length <= 10^4",
      "1 <= prices[i] <= 10^5"
    ],
    "starterCode": {
      "python": "def stock_span(prices: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function stockSpan(prices) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] stockSpan(int[] prices) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> stockSpan(vector<int>& prices) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "prices = [100, 80, 60, 70, 60, 75, 85]",
        "expected": "[1, 1, 1, 2, 1, 4, 6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "prices = [10, 20, 30]",
        "expected": "[1, 2, 3]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sum-of-subarray-minimums",
    "title": "Sum of Subarray Minimums",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Monotonic Stack",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of integers `arr`, find the sum of `min(b)` over every contiguous subarray `b` of `arr`. Return the answer modulo `10^9 + 7`.",
    "examples": [
      {
        "input": "arr = [3, 1, 2, 4]",
        "output": "17",
        "explanation": "Subarray minimums sum to 3+1+2+4+1+1+2+1+1+1 = 17."
      },
      {
        "input": "arr = [11, 81, 94, 43, 3]",
        "output": "444",
        "explanation": "Sum of all subarray minimums is 444."
      }
    ],
    "constraints": [
      "1 <= arr.length <= 3 * 10^4",
      "1 <= arr[i] <= 3 * 10^4"
    ],
    "starterCode": {
      "python": "def sum_subarray_mins(arr: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function sumSubarrayMins(arr) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int sumSubarrayMins(int[] arr) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int sumSubarrayMins(vector<int>& arr) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "arr = [3, 1, 2, 4]",
        "expected": "17",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "arr = [11, 81, 94, 43, 3]",
        "expected": "444",
        "isHidden": false
      }
    ]
  },
  {
    "id": "maximal-rectangle",
    "title": "Maximal Rectangle",
    "difficulty": "Hard",
    "topics": [
      "Matrix",
      "Stack",
      "Monotonic Stack",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a `rows x cols` binary `matrix` filled with `'0'`s and `'1'`s, find the largest rectangle containing only `'1'`s and return its area.",
    "examples": [
      {
        "input": "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
        "output": "6",
        "explanation": "2x3 rectangle of 1s has area 6."
      },
      {
        "input": "matrix = [[\"0\"]]",
        "output": "0",
        "explanation": "No 1s present."
      }
    ],
    "constraints": [
      "1 <= rows, cols <= 200",
      "matrix[i][j] is '0' or '1'."
    ],
    "starterCode": {
      "python": "def maximal_rectangle(matrix: list[list[str]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maximalRectangle(matrix) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maximalRectangle(char[][] matrix) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maximalRectangle(vector<vector<char>>& matrix) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
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
        "input": "matrix = [[\"0\"]]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "basic-calculator-parentheses",
    "title": "Basic Calculator",
    "difficulty": "Hard",
    "topics": [
      "Stack",
      "String",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a string `s` representing a valid expression with integers, `'+'`, `'-'`, `'('`, `')'`, and spaces, evaluate it and return the result.",
    "examples": [
      {
        "input": "s = \"(1+(4+5+2)-3)+(6+8)\"",
        "output": "23",
        "explanation": "Nested parentheses evaluated in order."
      },
      {
        "input": "s = \" 2-1 + 2 \"",
        "output": "3",
        "explanation": "Spaces ignored; 2 - 1 + 2 = 3."
      }
    ],
    "constraints": [
      "1 <= s.length <= 3 * 10^5",
      "s represents a valid expression."
    ],
    "starterCode": {
      "python": "def calculate_expr(s: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function calculateExpr(s) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int calculateExpr(String s) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int calculateExpr(string s) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"(1+(4+5+2)-3)+(6+8)\"",
        "expected": "23",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \" 2-1 + 2 \"",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "implement-queue-using-stacks",
    "title": "Implement Queue using Stacks",
    "difficulty": "Easy",
    "topics": [
      "Stack",
      "Queue",
      "Design"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Simulate a FIFO queue using only two LIFO stacks with amortized O(1) operations. Given `ops` containing `[\"push\", x]`, `[\"pop\"]`, `[\"peek\"]`, or `[\"empty\"]`, return the list of outputs from `pop`, `peek`, and `empty`.",
    "examples": [
      {
        "input": "ops = [[\"push\", 1], [\"push\", 2], [\"peek\"], [\"pop\"], [\"empty\"]]",
        "output": "[1, 1, false]",
        "explanation": "FIFO order returns 1 on peek and pop; 2 remains so empty is false."
      },
      {
        "input": "ops = [[\"empty\"], [\"push\", 7], [\"pop\"], [\"empty\"]]",
        "output": "[true, 7, true]",
        "explanation": "Queue starts and ends empty."
      }
    ],
    "constraints": [
      "1 <= ops.length <= 100",
      "pop and peek are only called on non-empty queues."
    ],
    "starterCode": {
      "python": "def run_two_stack_queue(ops: list[list]) -> list:\n    # Write your solution here\n    return []\n",
      "javascript": "function runTwoStackQueue(ops) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Object> runTwoStackQueue(List<List<Object>> ops) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> runTwoStackQueue(vector<vector<string>>& ops) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ops = [[\"push\", 1], [\"push\", 2], [\"peek\"], [\"pop\"], [\"empty\"]]",
        "expected": "[1, 1, false]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ops = [[\"empty\"], [\"push\", 7], [\"pop\"], [\"empty\"]]",
        "expected": "[true, 7, true]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "remove-all-adjacent-duplicates",
    "title": "Remove All Adjacent Duplicates In String",
    "difficulty": "Easy",
    "topics": [
      "Stack",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a string `s`, repeatedly remove pairs of adjacent equal letters until no more can be removed, and return the final string.",
    "examples": [
      {
        "input": "s = \"abbaca\"",
        "output": "\"ca\"",
        "explanation": "\"bb\" cancels leaving \"aaca\", then \"aa\" cancels leaving \"ca\"."
      },
      {
        "input": "s = \"azxxzy\"",
        "output": "\"ay\"",
        "explanation": "xx -> zz -> ay."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of lowercase English letters."
    ],
    "starterCode": {
      "python": "def remove_duplicates_str(s: str) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function removeDuplicatesStr(s) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String removeDuplicatesStr(String s) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string removeDuplicatesStr(string s) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"abbaca\"",
        "expected": "\"ca\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"azxxzy\"",
        "expected": "\"ay\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "minimum-remove-to-make-valid-parentheses",
    "title": "Minimum Remove to Make Valid Parentheses",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a string `s` of `'('`, `')'`, and lowercase English characters, remove the minimum number of unmatched parentheses (removing unmatched `')'` immediately and rightmost unmatched `'('` at the end) so that the resulting string is valid.",
    "examples": [
      {
        "input": "s = \"lee(t(c)o)de)\"",
        "output": "\"lee(t(c)o)de\"",
        "explanation": "The trailing ')' is unmatched and removed."
      },
      {
        "input": "s = \"))((\"",
        "output": "\"\"",
        "explanation": "All four parentheses are unmatched."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s[i] is '(', ')', or a lowercase letter."
    ],
    "starterCode": {
      "python": "def min_remove_to_make_valid(s: str) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function minRemoveToMakeValid(s) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String minRemoveToMakeValid(String s) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minRemoveToMakeValid(string s) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"lee(t(c)o)de)\"",
        "expected": "\"lee(t(c)o)de\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"))((\"",
        "expected": "\"\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "score-of-parentheses",
    "title": "Score of Parentheses",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a balanced parentheses string `s`, return its score where `\"()\"` has score `1`, `AB` has score `A + B`, and `(A)` has score `2 * A`.",
    "examples": [
      {
        "input": "s = \"(()(()))\"",
        "output": "6",
        "explanation": "2 * (1 + 2 * 1) = 6."
      },
      {
        "input": "s = \"()()\"",
        "output": "2",
        "explanation": "1 + 1 = 2."
      }
    ],
    "constraints": [
      "2 <= s.length <= 50",
      "s is a balanced parentheses string."
    ],
    "starterCode": {
      "python": "def score_of_parentheses(s: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function scoreOfParentheses(s) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int scoreOfParentheses(String s) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int scoreOfParentheses(string s) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"(()(()))\"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"()()\"",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "palindrome-linked-list",
    "title": "Palindrome Linked List",
    "difficulty": "Easy",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given the values of a singly linked list `values`, return `true` if the linked list is a palindrome, or `false` otherwise.",
    "examples": [
      {
        "input": "values = [1, 2, 2, 1]",
        "output": "true",
        "explanation": "Reads the same forward and backward."
      },
      {
        "input": "values = [1, 2]",
        "output": "false",
        "explanation": "Not symmetric."
      }
    ],
    "constraints": [
      "1 <= values.length <= 10^5",
      "0 <= values[i] <= 9"
    ],
    "starterCode": {
      "python": "def is_palindrome_list(values: list[int]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isPalindromeList(values) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isPalindromeList(int[] values) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindromeList(vector<int>& values) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "values = [1, 2, 2, 1]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "values = [1, 2]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "middle-of-the-linked-list",
    "title": "Middle of the Linked List",
    "difficulty": "Easy",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a non-empty singly linked list represented by `values`, return the sublist starting from the middle node to the end. If there are two middle nodes, start from the second middle node.",
    "examples": [
      {
        "input": "values = [1, 2, 3, 4, 5]",
        "output": "[3, 4, 5]",
        "explanation": "Middle node is 3."
      },
      {
        "input": "values = [1, 2, 3, 4, 5, 6]",
        "output": "[4, 5, 6]",
        "explanation": "Second middle node is 4."
      }
    ],
    "constraints": [
      "1 <= values.length <= 100",
      "1 <= values[i] <= 100"
    ],
    "starterCode": {
      "python": "def middle_node(values: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function middleNode(values) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] middleNode(int[] values) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> middleNode(vector<int>& values) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "values = [1, 2, 3, 4, 5]",
        "expected": "[3, 4, 5]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "values = [1, 2, 3, 4, 5, 6]",
        "expected": "[4, 5, 6]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "remove-duplicates-from-sorted-list",
    "title": "Remove Duplicates from Sorted List",
    "difficulty": "Easy",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a sorted linked list represented by `values`, delete all duplicates such that each element appears only once and return the sorted list.",
    "examples": [
      {
        "input": "values = [1, 1, 2]",
        "output": "[1, 2]",
        "explanation": "Duplicate 1 is removed."
      },
      {
        "input": "values = [1, 1, 2, 3, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Unique elements preserved in order."
      }
    ],
    "constraints": [
      "0 <= values.length <= 300",
      "values is sorted in ascending order."
    ],
    "starterCode": {
      "python": "def delete_duplicates(values: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function deleteDuplicates(values) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] deleteDuplicates(int[] values) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> deleteDuplicates(vector<int>& values) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "values = [1, 1, 2]",
        "expected": "[1, 2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "values = [1, 1, 2, 3, 3]",
        "expected": "[1, 2, 3]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "odd-even-linked-list",
    "title": "Odd Even Linked List",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a singly linked list represented by `values`, group all nodes at odd 1-based positions together followed by the nodes at even 1-based positions (preserving relative order within each group) and return the reordered list.",
    "examples": [
      {
        "input": "values = [1, 2, 3, 4, 5]",
        "output": "[1, 3, 5, 2, 4]",
        "explanation": "Odd positions [1, 3, 5] followed by even positions [2, 4]."
      },
      {
        "input": "values = [2, 1, 3, 5, 6, 4, 7]",
        "output": "[2, 3, 6, 7, 1, 5, 4]",
        "explanation": "Positions 1,3,5,7 then 2,4,6."
      }
    ],
    "constraints": [
      "0 <= values.length <= 10^4",
      "-10^6 <= values[i] <= 10^6"
    ],
    "starterCode": {
      "python": "def odd_even_list(values: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function oddEvenList(values) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] oddEvenList(int[] values) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> oddEvenList(vector<int>& values) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "values = [1, 2, 3, 4, 5]",
        "expected": "[1, 3, 5, 2, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "values = [2, 1, 3, 5, 6, 4, 7]",
        "expected": "[2, 3, 6, 7, 1, 5, 4]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "swap-nodes-in-pairs",
    "title": "Swap Nodes in Pairs",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Recursion"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a linked list represented by `values`, swap every two adjacent nodes and return the modified list.",
    "examples": [
      {
        "input": "values = [1, 2, 3, 4]",
        "output": "[2, 1, 4, 3]",
        "explanation": "Pairs (1,2) and (3,4) are swapped."
      },
      {
        "input": "values = [1, 2, 3]",
        "output": "[2, 1, 3]",
        "explanation": "Trailing unpaired node 3 stays in place."
      }
    ],
    "constraints": [
      "0 <= values.length <= 100",
      "0 <= values[i] <= 100"
    ],
    "starterCode": {
      "python": "def swap_pairs(values: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function swapPairs(values) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] swapPairs(int[] values) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> swapPairs(vector<int>& values) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "values = [1, 2, 3, 4]",
        "expected": "[2, 1, 4, 3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "values = [1, 2, 3]",
        "expected": "[2, 1, 3]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "rotate-linked-list",
    "title": "Rotate List",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a linked list represented by `values`, rotate the list to the right by `k` places and return the rotated list.",
    "examples": [
      {
        "input": "values = [1, 2, 3, 4, 5], k = 2",
        "output": "[4, 5, 1, 2, 3]",
        "explanation": "Rotated right by 2 places."
      },
      {
        "input": "values = [0, 1, 2], k = 4",
        "output": "[2, 0, 1]",
        "explanation": "4 % 3 == 1 right rotation."
      }
    ],
    "constraints": [
      "0 <= values.length <= 500",
      "0 <= k <= 2 * 10^9"
    ],
    "starterCode": {
      "python": "def rotate_list(values: list[int], k: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function rotateList(values, k) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] rotateList(int[] values, int k) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> rotateList(vector<int>& values, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "values = [1, 2, 3, 4, 5], k = 2",
        "expected": "[4, 5, 1, 2, 3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "values = [0, 1, 2], k = 4",
        "expected": "[2, 0, 1]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "partition-linked-list",
    "title": "Partition List",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a linked list represented by `values` and a pivot `x`, partition it such that all nodes less than `x` come before nodes greater than or equal to `x`, preserving the original relative order in each partition.",
    "examples": [
      {
        "input": "values = [1, 4, 3, 2, 5, 2], x = 3",
        "output": "[1, 2, 2, 4, 3, 5]",
        "explanation": "Values < 3 are [1, 2, 2]; values >= 3 are [4, 3, 5]."
      },
      {
        "input": "values = [2, 1], x = 2",
        "output": "[1, 2]",
        "explanation": "1 < 2 precedes 2."
      }
    ],
    "constraints": [
      "0 <= values.length <= 200",
      "-100 <= values[i] <= 100"
    ],
    "starterCode": {
      "python": "def partition_list(values: list[int], x: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function partitionList(values, x) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] partitionList(int[] values, int x) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> partitionList(vector<int>& values, int x) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "values = [1, 4, 3, 2, 5, 2], x = 3",
        "expected": "[1, 2, 2, 4, 3, 5]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "values = [2, 1], x = 2",
        "expected": "[1, 2]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sort-linked-list",
    "title": "Sort List",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Sorting",
      "Divide and Conquer"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a linked list represented by `values`, sort it in ascending order in `O(n log n)` time using merge sort and return the sorted values.",
    "examples": [
      {
        "input": "values = [4, 2, 1, 3]",
        "output": "[1, 2, 3, 4]",
        "explanation": "Sorted ascending via merge sort."
      },
      {
        "input": "values = [-1, 5, 3, 4, 0]",
        "output": "[-1, 0, 3, 4, 5]",
        "explanation": "Handles negative and positive values."
      }
    ],
    "constraints": [
      "0 <= values.length <= 5 * 10^4",
      "-10^5 <= values[i] <= 10^5"
    ],
    "starterCode": {
      "python": "def sort_list(values: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function sortList(values) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] sortList(int[] values) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> sortList(vector<int>& values) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "values = [4, 2, 1, 3]",
        "expected": "[1, 2, 3, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "values = [-1, 5, 3, 4, 0]",
        "expected": "[-1, 0, 3, 4, 5]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "search-insert-position",
    "title": "Search Insert Position",
    "difficulty": "Easy",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a sorted array of distinct integers `nums` and a `target` value, return the index if `target` is found. If not, return the index where it would be if it were inserted in order, in `O(log n)` time.",
    "examples": [
      {
        "input": "nums = [1, 3, 5, 6], target = 5",
        "output": "2",
        "explanation": "5 is found at index 2."
      },
      {
        "input": "nums = [1, 3, 5, 6], target = 2",
        "output": "1",
        "explanation": "2 would be inserted at index 1."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "nums contains distinct values sorted ascending."
    ],
    "starterCode": {
      "python": "def search_insert(nums: list[int], target: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function searchInsert(nums, target) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int searchInsert(int[] nums, int target) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 3, 5, 6], target = 5",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 3, 5, 6], target = 2",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sqrt-x-integer",
    "title": "Sqrt(x)",
    "difficulty": "Easy",
    "topics": [
      "Binary Search",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a non-negative integer `x`, return the square root of `x` rounded down to the nearest integer without using any built-in exponent or square root operator.",
    "examples": [
      {
        "input": "x = 4",
        "output": "2",
        "explanation": "sqrt(4) = 2."
      },
      {
        "input": "x = 8",
        "output": "2",
        "explanation": "sqrt(8) = 2.828..., floored to 2."
      }
    ],
    "constraints": [
      "0 <= x <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def my_sqrt(x: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function mySqrt(x) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int mySqrt(int x) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int mySqrt(int x) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "x = 4",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "x = 8",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "find-peak-element",
    "title": "Find Peak Element",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A peak element is strictly greater than its neighbors (assuming out-of-bounds neighbors are `-inf`). Given an array `nums` where `nums[i] != nums[i + 1]`, find a peak element's index in `O(log n)` time.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 1]",
        "output": "2",
        "explanation": "nums[2] = 3 is strictly greater than 2 and 1."
      },
      {
        "input": "nums = [1, 2, 1, 3, 5, 6, 4]",
        "output": "5",
        "explanation": "Index 5 (value 6) is a valid peak."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 1000",
      "nums[i] != nums[i + 1] for all valid i."
    ],
    "starterCode": {
      "python": "def find_peak_element(nums: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function findPeakElement(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int findPeakElement(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 2, 3, 1]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 2, 1, 3, 5, 6, 4]",
        "expected": "5",
        "isHidden": false
      }
    ]
  },
  {
    "id": "capacity-to-ship-packages-within-d-days",
    "title": "Capacity To Ship Packages Within D Days",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Array",
      "Greedy"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Packages with weights `weights[i]` must be shipped in order on a conveyor belt within `days` days. Return the least weight capacity of the ship that will result in all packages being shipped within `days` days.",
    "examples": [
      {
        "input": "weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], days = 5",
        "output": "15",
        "explanation": "Shipments: [1..5], [6,7], [8], [9], [10] -> capacity 15."
      },
      {
        "input": "weights = [3, 2, 2, 4, 1, 4], days = 3",
        "output": "6",
        "explanation": "Shipments: [3,2], [2,4], [1,4] -> capacity 6."
      }
    ],
    "constraints": [
      "1 <= days <= weights.length <= 5 * 10^4",
      "1 <= weights[i] <= 500"
    ],
    "starterCode": {
      "python": "def ship_within_days(weights: list[int], days: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function shipWithinDays(weights, days) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int shipWithinDays(int[] weights, int days) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shipWithinDays(vector<int>& weights, int days) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], days = 5",
        "expected": "15",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "weights = [3, 2, 2, 4, 1, 4], days = 3",
        "expected": "6",
        "isHidden": false
      }
    ]
  },
  {
    "id": "split-array-largest-sum",
    "title": "Split Array Largest Sum",
    "difficulty": "Hard",
    "topics": [
      "Binary Search",
      "Greedy",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums` of non-negative integers and an integer `k`, split `nums` into `k` non-empty contiguous subarrays such that the largest sum among these `k` subarrays is minimized. Return the minimized largest sum.",
    "examples": [
      {
        "input": "nums = [7, 2, 5, 10, 8], k = 2",
        "output": "18",
        "explanation": "Split into [7, 2, 5] (14) and [10, 8] (18)."
      },
      {
        "input": "nums = [1, 2, 3, 4, 5], k = 2",
        "output": "9",
        "explanation": "Split into [1, 2, 3] (6) and [4, 5] (9)."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 1000",
      "0 <= nums[i] <= 10^6",
      "1 <= k <= min(50, nums.length)"
    ],
    "starterCode": {
      "python": "def split_array(nums: list[int], k: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function splitArray(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int splitArray(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int splitArray(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [7, 2, 5, 10, 8], k = 2",
        "expected": "18",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 2, 3, 4, 5], k = 2",
        "expected": "9",
        "isHidden": false
      }
    ]
  },
  {
    "id": "single-element-in-a-sorted-array",
    "title": "Single Element in a Sorted Array",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given a sorted array `nums` consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Return the single element in `O(log n)` time and `O(1)` space.",
    "examples": [
      {
        "input": "nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]",
        "output": "2",
        "explanation": "2 appears once while all others appear twice."
      },
      {
        "input": "nums = [3, 3, 7, 7, 10, 11, 11]",
        "output": "10",
        "explanation": "10 is the unique element."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "nums.length is odd."
    ],
    "starterCode": {
      "python": "def single_non_duplicate(nums: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function singleNonDuplicate(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int singleNonDuplicate(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int singleNonDuplicate(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3, 3, 7, 7, 10, 11, 11]",
        "expected": "10",
        "isHidden": false
      }
    ]
  },
  {
    "id": "search-a-2d-matrix-ii",
    "title": "Search a 2D Matrix II",
    "difficulty": "Medium",
    "topics": [
      "Matrix",
      "Binary Search",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Write an efficient algorithm that searches for `target` in an `m x n` integer `matrix` where every row is sorted left-to-right and every column is sorted top-to-bottom.",
    "examples": [
      {
        "input": "matrix = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]], target = 5",
        "output": "true",
        "explanation": "5 is at (1, 1)."
      },
      {
        "input": "matrix = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]], target = 20",
        "output": "false",
        "explanation": "20 is not present."
      }
    ],
    "constraints": [
      "1 <= m, n <= 300",
      "Rows and columns are sorted ascending."
    ],
    "starterCode": {
      "python": "def search_matrix_ii(matrix: list[list[int]], target: int) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function searchMatrixII(matrix, target) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean searchMatrixII(int[][] matrix, int target) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool searchMatrixII(vector<vector<int>>& matrix, int target) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]], target = 5",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]], target = 20",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "h-index-sorted",
    "title": "H-Index II",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of integers `citations` sorted in ascending order where `citations[i]` is the number of citations a researcher received for their `i`-th paper, return the researcher's h-index in `O(log n)` time.",
    "examples": [
      {
        "input": "citations = [0, 1, 3, 5, 6]",
        "output": "3",
        "explanation": "3 papers have at least 3 citations each."
      },
      {
        "input": "citations = [1, 2, 100]",
        "output": "2",
        "explanation": "2 papers have at least 2 citations."
      }
    ],
    "constraints": [
      "1 <= citations.length <= 10^5",
      "citations is sorted ascending."
    ],
    "starterCode": {
      "python": "def h_index_sorted(citations: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function hIndexSorted(citations) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int hIndexSorted(int[] citations) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int hIndexSorted(vector<int>& citations) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "citations = [0, 1, 3, 5, 6]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "citations = [1, 2, 100]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "largest-number-concat",
    "title": "Largest Number",
    "difficulty": "Medium",
    "topics": [
      "Sorting",
      "String",
      "Greedy"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a list of non-negative integers `nums`, arrange them such that they form the largest number and return it as a string.",
    "examples": [
      {
        "input": "nums = [10, 2]",
        "output": "\"210\"",
        "explanation": "\"2\" + \"10\" > \"10\" + \"2\"."
      },
      {
        "input": "nums = [3, 30, 34, 5, 9]",
        "output": "\"9534330\"",
        "explanation": "Optimal concatenation order."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "python": "def largest_number(nums: list[int]) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function largestNumber(nums) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String largestNumber(int[] nums) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string largestNumber(vector<int>& nums) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [10, 2]",
        "expected": "\"210\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [3, 30, 34, 5, 9]",
        "expected": "\"9534330\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "wiggle-sort-adjacent",
    "title": "Wiggle Sort",
    "difficulty": "Medium",
    "topics": [
      "Sorting",
      "Greedy",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums`, reorder it in-place such that `nums[0] <= nums[1] >= nums[2] <= nums[3] ...` by swapping adjacent out-of-order elements in one pass, and return `nums`.",
    "examples": [
      {
        "input": "nums = [3, 5, 2, 1, 6, 4]",
        "output": "[3, 5, 1, 6, 2, 4]",
        "explanation": "Satisfies 3 <= 5 >= 1 <= 6 >= 2 <= 4."
      },
      {
        "input": "nums = [6, 6, 5, 6, 3, 8]",
        "output": "[6, 6, 5, 6, 3, 8]",
        "explanation": "Already satisfies wiggle inequalities."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5 * 10^4",
      "0 <= nums[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def wiggle_sort(nums: list[int]) -> list[int]:\n    # Write your solution here\n    return nums\n",
      "javascript": "function wiggleSort(nums) {\n  // Write your solution here\n  return nums;\n}\n",
      "java": "class Solution {\n    public int[] wiggleSort(int[] nums) {\n        // Write your solution here\n        return nums;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> wiggleSort(vector<int>& nums) {\n        // Write your solution here\n        return nums;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [3, 5, 2, 1, 6, 4]",
        "expected": "[3, 5, 1, 6, 2, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [6, 6, 5, 6, 3, 8]",
        "expected": "[6, 6, 5, 6, 3, 8]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "count-of-smaller-numbers-after-self",
    "title": "Count of Smaller Numbers After Self",
    "difficulty": "Hard",
    "topics": [
      "Divide and Conquer",
      "Sorting",
      "Binary Indexed Tree"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums`, return an integer array `counts` where `counts[i]` is the number of smaller elements strictly to the right of `nums[i]`.",
    "examples": [
      {
        "input": "nums = [5, 2, 6, 1]",
        "output": "[2, 1, 1, 0]",
        "explanation": "Right of 5: 2,1 (2); right of 2: 1 (1); right of 6: 1 (1); right of 1: none (0)."
      },
      {
        "input": "nums = [-1, -1]",
        "output": "[0, 0]",
        "explanation": "No strictly smaller elements to the right."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def count_smaller(nums: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function countSmaller(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> countSmaller(int[] nums) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> countSmaller(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [5, 2, 6, 1]",
        "expected": "[2, 1, 1, 0]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [-1, -1]",
        "expected": "[0, 0]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "reverse-pairs",
    "title": "Reverse Pairs",
    "difficulty": "Hard",
    "topics": [
      "Divide and Conquer",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums`, return the number of reverse pairs in the array: pairs `(i, j)` where `0 <= i < j < nums.length` and `nums[i] > 2 * nums[j]`.",
    "examples": [
      {
        "input": "nums = [1, 3, 2, 3, 1]",
        "output": "2",
        "explanation": "Reverse pairs are (1, 4): 3 > 2*1 and (3, 4): 3 > 2*1."
      },
      {
        "input": "nums = [2, 4, 3, 5, 1]",
        "output": "3",
        "explanation": "(1,4), (2,4), (3,4) satisfy nums[i] > 2*nums[j]."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5 * 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def reverse_pairs(nums: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function reversePairs(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int reversePairs(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int reversePairs(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 3, 2, 3, 1]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [2, 4, 3, 5, 1]",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "same-tree",
    "title": "Same Tree",
    "difficulty": "Easy",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two binary trees in trimmed level-order representation `p` and `q`, return `true` if they are structurally identical and have the same node values.",
    "examples": [
      {
        "input": "p = [1, 2, 3], q = [1, 2, 3]",
        "output": "true",
        "explanation": "Identical structure and values."
      },
      {
        "input": "p = [1, 2], q = [1, null, 2]",
        "output": "false",
        "explanation": "Different child positions."
      }
    ],
    "constraints": [
      "0 <= number of nodes <= 100",
      "-10^4 <= Node.val <= 10^4"
    ],
    "starterCode": {
      "python": "def is_same_tree(p: list, q: list) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isSameTree(p, q) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isSameTree(List<Integer> p, List<Integer> q) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isSameTree(vector<optional<int>>& p, vector<optional<int>>& q) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "p = [1, 2, 3], q = [1, 2, 3]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "p = [1, 2], q = [1, null, 2]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "symmetric-tree",
    "title": "Symmetric Tree",
    "difficulty": "Easy",
    "topics": [
      "Binary Tree",
      "DFS",
      "BFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary tree in level-order representation `tree`, check whether it is a mirror of itself (symmetric around its center).",
    "examples": [
      {
        "input": "tree = [1, 2, 2, 3, 4, 4, 3]",
        "output": "true",
        "explanation": "Left and right subtrees are mirror images."
      },
      {
        "input": "tree = [1, 2, 2, null, 3, null, 3]",
        "output": "false",
        "explanation": "Both 3s are right children, not mirrored."
      }
    ],
    "constraints": [
      "1 <= number of nodes <= 1000",
      "-100 <= Node.val <= 100"
    ],
    "starterCode": {
      "python": "def is_symmetric(tree: list) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isSymmetric(tree) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isSymmetric(List<Integer> tree) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isSymmetric(vector<optional<int>>& tree) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [1, 2, 2, 3, 4, 4, 3]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [1, 2, 2, null, 3, null, 3]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "balanced-binary-tree",
    "title": "Balanced Binary Tree",
    "difficulty": "Easy",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary tree in level-order representation `tree`, determine if it is height-balanced (for every node, the depths of its left and right subtrees differ by at most `1`).",
    "examples": [
      {
        "input": "tree = [3, 9, 20, null, null, 15, 7]",
        "output": "true",
        "explanation": "All subtree height differences are <= 1."
      },
      {
        "input": "tree = [1, 2, 2, 3, 3, null, null, 4, 4]",
        "output": "false",
        "explanation": "Left subtree has height 3 while right has height 1."
      }
    ],
    "constraints": [
      "0 <= number of nodes <= 5000",
      "-10^4 <= Node.val <= 10^4"
    ],
    "starterCode": {
      "python": "def is_balanced(tree: list) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isBalanced(tree) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isBalanced(List<Integer> tree) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isBalanced(vector<optional<int>>& tree) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [3, 9, 20, null, null, 15, 7]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [1, 2, 2, 3, 3, null, null, 4, 4]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "path-sum-root-to-leaf",
    "title": "Path Sum",
    "difficulty": "Easy",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary tree in level-order representation `tree` and an integer `target_sum`, return `true` if the tree has a root-to-leaf path such that adding up all values along the path equals `target_sum`.",
    "examples": [
      {
        "input": "tree = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], target_sum = 22",
        "output": "true",
        "explanation": "Path 5 -> 4 -> 11 -> 2 sums to 22."
      },
      {
        "input": "tree = [1, 2, 3], target_sum = 5",
        "output": "false",
        "explanation": "Root-to-leaf sums are 3 and 4."
      }
    ],
    "constraints": [
      "0 <= number of nodes <= 5000",
      "-1000 <= Node.val, target_sum <= 1000"
    ],
    "starterCode": {
      "python": "def has_path_sum(tree: list, target_sum: int) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function hasPathSum(tree, targetSum) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean hasPathSum(List<Integer> tree, int targetSum) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool hasPathSum(vector<optional<int>>& tree, int targetSum) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], target_sum = 22",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [1, 2, 3], target_sum = 5",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "binary-tree-right-side-view",
    "title": "Binary Tree Right Side View",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "BFS",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary tree in level-order representation `tree`, imagine yourself standing on the right side of it; return the values of the nodes you can see ordered from top to bottom.",
    "examples": [
      {
        "input": "tree = [1, 2, 3, null, 5, null, 4]",
        "output": "[1, 3, 4]",
        "explanation": "Rightmost nodes at levels 0, 1, 2 are 1, 3, 4."
      },
      {
        "input": "tree = [1, 2, 3, 4]",
        "output": "[1, 3, 4]",
        "explanation": "Level 2 only has node 4 on the left, which is visible from the right."
      }
    ],
    "constraints": [
      "0 <= number of nodes <= 100",
      "-100 <= Node.val <= 100"
    ],
    "starterCode": {
      "python": "def right_side_view(tree: list) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function rightSideView(tree) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> rightSideView(List<Integer> tree) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> rightSideView(vector<optional<int>>& tree) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [1, 2, 3, null, 5, null, 4]",
        "expected": "[1, 3, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [1, 2, 3, 4]",
        "expected": "[1, 3, 4]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "binary-tree-zigzag-level-order",
    "title": "Binary Tree Zigzag Level Order Traversal",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "BFS",
      "Queue"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary tree in level-order representation `tree`, return its zigzag level-order traversal (left-to-right at level 0, right-to-left at level 1, alternating thereafter).",
    "examples": [
      {
        "input": "tree = [3, 9, 20, null, null, 15, 7]",
        "output": "[[3], [20, 9], [15, 7]]",
        "explanation": "Level 1 is reversed to [20, 9]."
      },
      {
        "input": "tree = [1]",
        "output": "[[1]]",
        "explanation": "Single node."
      }
    ],
    "constraints": [
      "0 <= number of nodes <= 2000",
      "-100 <= Node.val <= 100"
    ],
    "starterCode": {
      "python": "def zigzag_level_order(tree: list) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function zigzagLevelOrder(tree) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> zigzagLevelOrder(List<Integer> tree) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> zigzagLevelOrder(vector<optional<int>>& tree) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [3, 9, 20, null, null, 15, 7]",
        "expected": "[[3], [20, 9], [15, 7]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [1]",
        "expected": "[[1]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "count-good-nodes-in-binary-tree",
    "title": "Count Good Nodes in Binary Tree",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary tree in level-order representation `tree`, a node `X` is named good if on the path from root to `X` there are no nodes with a value strictly greater than `X`. Return the number of good nodes.",
    "examples": [
      {
        "input": "tree = [3, 1, 4, 3, null, 1, 5]",
        "output": "4",
        "explanation": "Good nodes are 3(root), 3(left-left), 4, and 5."
      },
      {
        "input": "tree = [3, 3, null, 4, 2]",
        "output": "3",
        "explanation": "Good nodes are 3, 3, and 4."
      }
    ],
    "constraints": [
      "1 <= number of nodes <= 10^5",
      "-10^4 <= Node.val <= 10^4"
    ],
    "starterCode": {
      "python": "def good_nodes(tree: list) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function goodNodes(tree) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int goodNodes(List<Integer> tree) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int goodNodes(vector<optional<int>>& tree) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [3, 1, 4, 3, null, 1, 5]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [3, 3, null, 4, 2]",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "lowest-common-ancestor-binary-tree",
    "title": "Lowest Common Ancestor of a Binary Tree",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary tree of unique values in level-order representation `tree` and two node values `p` and `q`, return the value of their Lowest Common Ancestor (LCA).",
    "examples": [
      {
        "input": "tree = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1",
        "output": "3",
        "explanation": "LCA of 5 and 1 is 3."
      },
      {
        "input": "tree = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 4",
        "output": "5",
        "explanation": "Node 5 is an ancestor of 4."
      }
    ],
    "constraints": [
      "2 <= number of nodes <= 10^5",
      "All Node.val are unique.",
      "p and q exist in the tree."
    ],
    "starterCode": {
      "python": "def lca_binary_tree(tree: list, p: int, q: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function lcaBinaryTree(tree, p, q) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int lcaBinaryTree(List<Integer> tree, int p, int q) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lcaBinaryTree(vector<optional<int>>& tree, int p, int q) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 4",
        "expected": "5",
        "isHidden": false
      }
    ]
  },
  {
    "id": "flatten-binary-tree-to-preorder",
    "title": "Flatten Binary Tree to Preorder List",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "DFS",
      "Linked List"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary tree in level-order representation `tree`, flatten it in-place into a right-skewed linked list following preorder traversal (root, left, right) and return the sequence of values.",
    "examples": [
      {
        "input": "tree = [1, 2, 5, 3, 4, null, 6]",
        "output": "[1, 2, 3, 4, 5, 6]",
        "explanation": "Preorder traversal produces [1, 2, 3, 4, 5, 6]."
      },
      {
        "input": "tree = []",
        "output": "[]",
        "explanation": "Empty tree flattens to empty list."
      }
    ],
    "constraints": [
      "0 <= number of nodes <= 2000",
      "-100 <= Node.val <= 100"
    ],
    "starterCode": {
      "python": "def flatten_tree(tree: list) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function flattenTree(tree) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> flattenTree(List<Integer> tree) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> flattenTree(vector<optional<int>>& tree) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [1, 2, 5, 3, 4, null, 6]",
        "expected": "[1, 2, 3, 4, 5, 6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = []",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sum-root-to-leaf-numbers",
    "title": "Sum Root to Leaf Numbers",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary tree of digits (`0`–`9`) in level-order representation `tree`, each root-to-leaf path represents a decimal number. Return the total sum of all root-to-leaf numbers.",
    "examples": [
      {
        "input": "tree = [1, 2, 3]",
        "output": "25",
        "explanation": "Paths 1->2 (12) and 1->3 (13) sum to 25."
      },
      {
        "input": "tree = [4, 9, 0, 5, 1]",
        "output": "1026",
        "explanation": "495 + 491 + 40 = 1026."
      }
    ],
    "constraints": [
      "1 <= number of nodes <= 1000",
      "0 <= Node.val <= 9"
    ],
    "starterCode": {
      "python": "def sum_numbers(tree: list) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function sumNumbers(tree) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int sumNumbers(List<Integer> tree) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int sumNumbers(vector<optional<int>>& tree) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [1, 2, 3]",
        "expected": "25",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [4, 9, 0, 5, 1]",
        "expected": "1026",
        "isHidden": false
      }
    ]
  },
  {
    "id": "flood-fill",
    "title": "Flood Fill",
    "difficulty": "Easy",
    "topics": [
      "Graph",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `m x n` integer grid `image`, a starting pixel `(sr, sc)`, and a new `color`, perform a 4-directional flood fill starting from `(sr, sc)` replacing all connected pixels of the original color with `color`, and return the modified image.",
    "examples": [
      {
        "input": "image = [[1, 1, 1], [1, 1, 0], [1, 0, 1]], sr = 1, sc = 1, color = 2",
        "output": "[[2, 2, 2], [2, 2, 0], [2, 0, 1]]",
        "explanation": "Connected 1s become 2; bottom-right 1 is isolated."
      },
      {
        "input": "image = [[0, 0, 0], [0, 0, 0]], sr = 0, sc = 0, color = 0",
        "output": "[[0, 0, 0], [0, 0, 0]]",
        "explanation": "Target color equals original color."
      }
    ],
    "constraints": [
      "1 <= m, n <= 50",
      "0 <= image[i][j], color < 2^16"
    ],
    "starterCode": {
      "python": "def flood_fill(image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:\n    # Write your solution here\n    return image\n",
      "javascript": "function floodFill(image, sr, sc, color) {\n  // Write your solution here\n  return image;\n}\n",
      "java": "class Solution {\n    public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n        // Write your solution here\n        return image;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {\n        // Write your solution here\n        return image;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "image = [[1, 1, 1], [1, 1, 0], [1, 0, 1]], sr = 1, sc = 1, color = 2",
        "expected": "[[2, 2, 2], [2, 2, 0], [2, 0, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "image = [[0, 0, 0], [0, 0, 0]], sr = 0, sc = 0, color = 0",
        "expected": "[[0, 0, 0], [0, 0, 0]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "max-area-of-island",
    "title": "Max Area of Island",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "DFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `m x n` binary matrix `grid` where `1` represents land and `0` represents water, return the maximum area (number of 4-directionally connected `1`s) of an island in `grid`, or `0` if there is no island.",
    "examples": [
      {
        "input": "grid = [[0, 1, 1, 0], [0, 1, 0, 0], [1, 0, 0, 1]]",
        "output": "3",
        "explanation": "Largest island has 3 connected 1s."
      },
      {
        "input": "grid = [[0, 0, 0]]",
        "output": "0",
        "explanation": "No land cells."
      }
    ],
    "constraints": [
      "1 <= m, n <= 50",
      "grid[i][j] is 0 or 1."
    ],
    "starterCode": {
      "python": "def max_area_of_island(grid: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxAreaOfIsland(grid) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxAreaOfIsland(int[][] grid) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxAreaOfIsland(vector<vector<int>>& grid) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "grid = [[0, 1, 1, 0], [0, 1, 0, 0], [1, 0, 0, 1]]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "grid = [[0, 0, 0]]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "surrounded-regions",
    "title": "Surrounded Regions",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `m x n` `board` containing `'X'` and `'O'`, capture all regions of `'O'` that are 4-directionally surrounded by `'X'` (i.e. not connected to any border `'O'`) by flipping them to `'X'`, and return the board.",
    "examples": [
      {
        "input": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
        "output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
        "explanation": "Bottom-row 'O' is on the border and escapes capture."
      },
      {
        "input": "board = [[\"X\"]]",
        "output": "[[\"X\"]]",
        "explanation": "No 'O' cells."
      }
    ],
    "constraints": [
      "1 <= m, n <= 200",
      "board[i][j] is 'X' or 'O'."
    ],
    "starterCode": {
      "python": "def solve_surrounded(board: list[list[str]]) -> list[list[str]]:\n    # Write your solution here\n    return board\n",
      "javascript": "function solveSurrounded(board) {\n  // Write your solution here\n  return board;\n}\n",
      "java": "class Solution {\n    public char[][] solveSurrounded(char[][] board) {\n        // Write your solution here\n        return board;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<char>> solveSurrounded(vector<vector<char>>& board) {\n        // Write your solution here\n        return board;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
        "expected": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "board = [[\"X\"]]",
        "expected": "[[\"X\"]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "pacific-atlantic-water-flow",
    "title": "Pacific Atlantic Water Flow",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given an `m x n` matrix `heights` where the Pacific Ocean touches the top and left edges and the Atlantic Ocean touches the bottom and right edges, water can flow to 4-directional neighbors of equal or lower height. Return all `[r, c]` coordinates from which water can flow to both oceans.",
    "examples": [
      {
        "input": "heights = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]",
        "output": "[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]",
        "explanation": "Cells forming the ridge can drain to both oceans."
      },
      {
        "input": "heights = [[1]]",
        "output": "[[0, 0]]",
        "explanation": "Single cell borders both oceans."
      }
    ],
    "constraints": [
      "1 <= m, n <= 200",
      "0 <= heights[r][c] <= 10^5"
    ],
    "starterCode": {
      "python": "def pacific_atlantic(heights: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function pacificAtlantic(heights) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "heights = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]",
        "expected": "[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "heights = [[1]]",
        "expected": "[[0, 0]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "shortest-path-in-binary-matrix",
    "title": "Shortest Path in Binary Matrix",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `n x n` binary matrix `grid`, return the length of the shortest clear path from `(0, 0)` to `(n - 1, n - 1)` moving 8-directionally through `0` cells (counting the number of visited cells), or `-1` if no clear path exists.",
    "examples": [
      {
        "input": "grid = [[0, 1], [1, 0]]",
        "output": "2",
        "explanation": "Diagonal move (0,0) -> (1,1) visits 2 cells."
      },
      {
        "input": "grid = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]",
        "output": "4",
        "explanation": "(0,0)->(0,1)->(1,2)->(2,2) has length 4."
      }
    ],
    "constraints": [
      "1 <= n <= 100",
      "grid[i][j] is 0 or 1."
    ],
    "starterCode": {
      "python": "def shortest_path_binary_matrix(grid: list[list[int]]) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function shortestPathBinaryMatrix(grid) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int shortestPathBinaryMatrix(int[][] grid) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "grid = [[0, 1], [1, 0]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "grid = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "all-paths-from-source-to-target",
    "title": "All Paths From Source to Target",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "DFS",
      "Backtracking"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given a directed acyclic graph (DAG) of `n` nodes labeled `0` to `n - 1` as an adjacency list `graph`, find all possible paths from node `0` to node `n - 1`.",
    "examples": [
      {
        "input": "graph = [[1, 2], [3], [3], []]",
        "output": "[[0, 1, 3], [0, 2, 3]]",
        "explanation": "Two paths from 0 to 3."
      },
      {
        "input": "graph = [[4, 3, 1], [3, 2, 4], [3], [4], []]",
        "output": "[[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]]",
        "explanation": "Five distinct paths to node 4."
      }
    ],
    "constraints": [
      "2 <= n <= 15",
      "graph is a DAG."
    ],
    "starterCode": {
      "python": "def all_paths_source_target(graph: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function allPathsSourceTarget(graph) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> allPathsSourceTarget(int[][] graph) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "graph = [[1, 2], [3], [3], []]",
        "expected": "[[0, 1, 3], [0, 2, 3]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "graph = [[4, 3, 1], [3, 2, 4], [3], [4], []]",
        "expected": "[[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "keys-and-rooms",
    "title": "Keys and Rooms",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "There are `n` rooms labeled `0` to `n - 1`; only room `0` is unlocked initially. `rooms[i]` lists the keys found inside room `i`. Return `true` if you can visit all `n` rooms.",
    "examples": [
      {
        "input": "rooms = [[1], [2], [3], []]",
        "output": "true",
        "explanation": "Visit 0 -> 1 -> 2 -> 3."
      },
      {
        "input": "rooms = [[1, 3], [3, 0, 1], [2], [0]]",
        "output": "false",
        "explanation": "Room 2 is never unlocked."
      }
    ],
    "constraints": [
      "2 <= rooms.length <= 1000",
      "0 <= rooms[i][j] < rooms.length"
    ],
    "starterCode": {
      "python": "def can_visit_all_rooms(rooms: list[list[int]]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function canVisitAllRooms(rooms) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean canVisitAllRooms(List<List<Integer>> rooms) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canVisitAllRooms(vector<vector<int>>& rooms) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "rooms = [[1], [2], [3], []]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "rooms = [[1, 3], [3, 0, 1], [2], [0]]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "find-eventual-safe-states",
    "title": "Find Eventual Safe States",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "Topological Sort",
      "BFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "In a directed graph given as adjacency list `graph`, a node is terminal if it has no outgoing edges, and safe if every possible path starting from that node leads to a terminal node. Return an array of all safe nodes sorted in ascending order.",
    "examples": [
      {
        "input": "graph = [[1, 2], [2, 3], [5], [0], [5], [], []]",
        "output": "[2, 4, 5, 6]",
        "explanation": "Nodes 0, 1, 3 participate in cycle 0->1->3->0."
      },
      {
        "input": "graph = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]",
        "output": "[4]",
        "explanation": "Only terminal node 4 is safe."
      }
    ],
    "constraints": [
      "1 <= graph.length <= 10^4"
    ],
    "starterCode": {
      "python": "def eventual_safe_nodes(graph: list[list[int]]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function eventualSafeNodes(graph) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> eventualSafeNodes(int[][] graph) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "graph = [[1, 2], [2, 3], [5], [0], [5], [], []]",
        "expected": "[2, 4, 5, 6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "graph = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]",
        "expected": "[4]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "swim-in-rising-water",
    "title": "Swim in Rising Water",
    "difficulty": "Hard",
    "topics": [
      "Graph",
      "Dijkstra",
      "Heap",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an `n x n` integer matrix `grid` where `grid[i][j]` represents elevation. At time `t`, you can swim between 4-directionally adjacent cells if both have elevation `<= t`. Return the least time until you can reach `(n - 1, n - 1)` from `(0, 0)`.",
    "examples": [
      {
        "input": "grid = [[0, 2], [1, 3]]",
        "output": "3",
        "explanation": "At t=3 all cells are submerged, reaching (1,1)."
      },
      {
        "input": "grid = [[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]",
        "output": "16",
        "explanation": "Follow the spiral path peaking at elevation 16."
      }
    ],
    "constraints": [
      "1 <= n <= 50",
      "grid[i][j] is a permutation of [0, n^2 - 1]."
    ],
    "starterCode": {
      "python": "def swim_in_water(grid: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function swimInWater(grid) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int swimInWater(int[][] grid) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int swimInWater(vector<vector<int>>& grid) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "grid = [[0, 2], [1, 3]]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "grid = [[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]",
        "expected": "16",
        "isHidden": false
      }
    ]
  },
  {
    "id": "alien-dictionary-order",
    "title": "Alien Dictionary",
    "difficulty": "Hard",
    "topics": [
      "Graph",
      "Topological Sort",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a list of `words` sorted lexicographically according to an unknown alien alphabet, derive a valid character ordering (preferring standard alphabetical order on ties for determinism), or return `\"\"` if the ordering is invalid.",
    "examples": [
      {
        "input": "words = [\"wrt\", \"wrf\", \"er\", \"ett\", \"rftt\"]",
        "output": "\"wertf\"",
        "explanation": "Edges t->f, w->e, r->t, e->r give \"wertf\"."
      },
      {
        "input": "words = [\"z\", \"x\", \"z\"]",
        "output": "\"\"",
        "explanation": "Cycle z->x->z makes ordering invalid."
      }
    ],
    "constraints": [
      "1 <= words.length <= 100",
      "1 <= words[i].length <= 100"
    ],
    "starterCode": {
      "python": "def alien_order(words: list[str]) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function alienOrder(words) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String alienOrder(String[] words) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string alienOrder(vector<string>& words) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "words = [\"wrt\", \"wrf\", \"er\", \"ett\", \"rftt\"]",
        "expected": "\"wertf\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "words = [\"z\", \"x\", \"z\"]",
        "expected": "\"\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "house-robber-ii",
    "title": "House Robber II",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "All houses are arranged in a circle so the first house is adjacent to the last house. Given an integer array `nums` representing money at each house, return the maximum amount you can rob without robbing two adjacent houses.",
    "examples": [
      {
        "input": "nums = [2, 3, 2]",
        "output": "3",
        "explanation": "Cannot rob house 0 and house 2 together; rob house 1 (3)."
      },
      {
        "input": "nums = [1, 2, 3, 1]",
        "output": "4",
        "explanation": "Rob house 0 (1) and house 2 (3) = 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 1000"
    ],
    "starterCode": {
      "python": "def rob_circular(nums: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function robCircular(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int robCircular(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int robCircular(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2, 3, 2]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 2, 3, 1]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "decode-ways",
    "title": "Decode Ways",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A message of letters `'A'`–`'Z'` is encoded as `'1'`–`'26'`. Given a string `s` containing only digits, return the number of ways to decode it.",
    "examples": [
      {
        "input": "s = \"12\"",
        "output": "2",
        "explanation": "\"12\" decodes as \"AB\" (1 2) or \"L\" (12)."
      },
      {
        "input": "s = \"226\"",
        "output": "3",
        "explanation": "\"226\" decodes as \"BZ\" (2 26), \"VF\" (22 6), or \"BBF\" (2 2 6)."
      }
    ],
    "constraints": [
      "1 <= s.length <= 100",
      "s contains only digits."
    ],
    "starterCode": {
      "python": "def num_decodings(s: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function numDecodings(s) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int numDecodings(String s) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numDecodings(string s) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"12\"",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"226\"",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "coin-change-ii",
    "title": "Coin Change II",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Knapsack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `coins` representing unique coin denominations and an integer `amount`, return the number of combinations (order does not matter) that make up `amount`.",
    "examples": [
      {
        "input": "amount = 5, coins = [1, 2, 5]",
        "output": "4",
        "explanation": "5, 2+2+1, 2+1+1+1, 1+1+1+1+1."
      },
      {
        "input": "amount = 3, coins = [2]",
        "output": "0",
        "explanation": "Cannot form 3 with only 2s."
      }
    ],
    "constraints": [
      "1 <= coins.length <= 300",
      "0 <= amount <= 5000"
    ],
    "starterCode": {
      "python": "def change_ways(amount: int, coins: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function changeWays(amount, coins) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int changeWays(int amount, int[] coins) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int changeWays(int amount, vector<int>& coins) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "amount = 5, coins = [1, 2, 5]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "amount = 3, coins = [2]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "target-sum-ways",
    "title": "Target Sum",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Knapsack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an integer array `nums` of non-negative integers and an integer `target`. Assign either `'+'` or `'-'` before each integer in `nums` and return the number of different expressions that evaluate to `target`.",
    "examples": [
      {
        "input": "nums = [1, 1, 1, 1, 1], target = 3",
        "output": "5",
        "explanation": "Five ways to place one minus sign and four plus signs."
      },
      {
        "input": "nums = [1], target = 1",
        "output": "1",
        "explanation": "+1 = 1."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 20",
      "0 <= nums[i] <= 1000",
      "0 <= sum(nums) <= 1000"
    ],
    "starterCode": {
      "python": "def find_target_sum_ways(nums: list[int], target: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function findTargetSumWays(nums, target) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int findTargetSumWays(int[] nums, int target) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findTargetSumWays(vector<int>& nums, int target) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 1, 1, 1, 1], target = 3",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1], target = 1",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "minimum-path-sum",
    "title": "Minimum Path Sum",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `m x n` `grid` filled with non-negative integers, find a path from top-left `(0, 0)` to bottom-right `(m - 1, n - 1)` moving only down or right that minimizes the sum of all numbers along its path.",
    "examples": [
      {
        "input": "grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]",
        "output": "7",
        "explanation": "Path 1 -> 3 -> 1 -> 1 -> 1 minimizes sum to 7."
      },
      {
        "input": "grid = [[1, 2, 3], [4, 5, 6]]",
        "output": "12",
        "explanation": "Path 1 -> 2 -> 3 -> 6 = 12."
      }
    ],
    "constraints": [
      "1 <= m, n <= 200",
      "0 <= grid[i][j] <= 200"
    ],
    "starterCode": {
      "python": "def min_path_sum(grid: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minPathSum(grid) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minPathSum(int[][] grid) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minPathSum(vector<vector<int>>& grid) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "grid = [[1, 2, 3], [4, 5, 6]]",
        "expected": "12",
        "isHidden": false
      }
    ]
  },
  {
    "id": "triangle-min-path-sum",
    "title": "Triangle",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a `triangle` array, return the minimum path sum from top to bottom where at each step you may move to index `i` or `i + 1` on the row below.",
    "examples": [
      {
        "input": "triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]",
        "output": "11",
        "explanation": "Path 2 -> 3 -> 5 -> 1 sums to 11."
      },
      {
        "input": "triangle = [[-10]]",
        "output": "-10",
        "explanation": "Single element."
      }
    ],
    "constraints": [
      "1 <= triangle.length <= 200",
      "triangle[i].length == i + 1"
    ],
    "starterCode": {
      "python": "def minimum_total(triangle: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minimumTotal(triangle) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minimumTotal(List<List<Integer>> triangle) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minimumTotal(vector<vector<int>>& triangle) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]",
        "expected": "11",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "triangle = [[-10]]",
        "expected": "-10",
        "isHidden": false
      }
    ]
  },
  {
    "id": "longest-palindromic-subsequence",
    "title": "Longest Palindromic Subsequence",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a string `s`, find the length of the longest palindromic subsequence in `s`.",
    "examples": [
      {
        "input": "s = \"bbbab\"",
        "output": "4",
        "explanation": "Longest palindromic subsequence is \"bbbb\"."
      },
      {
        "input": "s = \"cbbd\"",
        "output": "2",
        "explanation": "Longest palindromic subsequence is \"bb\"."
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "s consists of lowercase English letters."
    ],
    "starterCode": {
      "python": "def longest_palindrome_subseq(s: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestPalindromeSubseq(s) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestPalindromeSubseq(String s) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestPalindromeSubseq(string s) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"bbbab\"",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"cbbd\"",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "distinct-subsequences",
    "title": "Distinct Subsequences",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equal `t`.",
    "examples": [
      {
        "input": "s = \"rabbbit\", t = \"rabbit\"",
        "output": "3",
        "explanation": "Three ways to omit one of the three 'b's."
      },
      {
        "input": "s = \"babgbag\", t = \"bag\"",
        "output": "5",
        "explanation": "Five distinct index combinations spell \"bag\"."
      }
    ],
    "constraints": [
      "1 <= s.length, t.length <= 1000",
      "s and t consist of English letters."
    ],
    "starterCode": {
      "python": "def num_distinct(s: str, t: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function numDistinct(s, t) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int numDistinct(String s, String t) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numDistinct(string s, string t) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"rabbbit\", t = \"rabbit\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"babgbag\", t = \"bag\"",
        "expected": "5",
        "isHidden": false
      }
    ]
  },
  {
    "id": "interleaving-string",
    "title": "Interleaving String",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given strings `s1`, `s2`, and `s3`, return `true` if `s3` is formed by an interleaving of `s1` and `s2` (preserving the relative order of characters from both `s1` and `s2`).",
    "examples": [
      {
        "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"",
        "output": "true",
        "explanation": "Valid interleaving exists."
      },
      {
        "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbbaccc\"",
        "output": "false",
        "explanation": "No valid interleaving."
      }
    ],
    "constraints": [
      "0 <= s1.length, s2.length <= 100",
      "0 <= s3.length <= 200"
    ],
    "starterCode": {
      "python": "def is_interleave(s1: str, s2: str, s3: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isInterleave(s1, s2, s3) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isInterleave(String s1, String s2, String s3) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isInterleave(string s1, string s2, string s3) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbbaccc\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "regular-expression-matching",
    "title": "Regular Expression Matching",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "String",
      "Recursion"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an input string `s` and a pattern `p`, implement regular expression matching with support for `'.'` (matches any single character) and `'*'` (matches zero or more of the preceding element). The matching must cover the entire input string.",
    "examples": [
      {
        "input": "s = \"aa\", p = \"a*\"",
        "output": "true",
        "explanation": "'*' repeats 'a' twice."
      },
      {
        "input": "s = \"ab\", p = \".*\"",
        "output": "true",
        "explanation": "'.*' matches any sequence of characters."
      }
    ],
    "constraints": [
      "1 <= s.length <= 20",
      "1 <= p.length <= 20",
      "Every '*' is preceded by a valid character."
    ],
    "starterCode": {
      "python": "def is_regex_match(s: str, p: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isRegexMatch(s, p) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isRegexMatch(String s, String p) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isRegexMatch(string s, string p) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"aa\", p = \"a*\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"ab\", p = \".*\"",
        "expected": "true",
        "isHidden": false
      }
    ]
  },
  {
    "id": "jump-game-ii",
    "title": "Jump Game II",
    "difficulty": "Medium",
    "topics": [
      "Greedy",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an integer array `nums` where `nums[i]` is the maximum jump length from index `i`. Return the minimum number of jumps to reach the last index (guaranteed reachable).",
    "examples": [
      {
        "input": "nums = [2, 3, 1, 1, 4]",
        "output": "2",
        "explanation": "Jump from index 0 to 1, then to index 4."
      },
      {
        "input": "nums = [2, 3, 0, 1, 4]",
        "output": "2",
        "explanation": "Index 0 -> 1 -> 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 1000"
    ],
    "starterCode": {
      "python": "def min_jumps(nums: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minJumps(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minJumps(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minJumps(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2, 3, 1, 1, 4]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [2, 3, 0, 1, 4]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "candy-distribution",
    "title": "Candy",
    "difficulty": "Hard",
    "topics": [
      "Greedy",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "There are `n` children standing in a line with integer `ratings`. Each child must receive at least 1 candy, and children with a higher rating than an immediate neighbor must receive more candies than that neighbor. Return the minimum total candies needed.",
    "examples": [
      {
        "input": "ratings = [1, 0, 2]",
        "output": "5",
        "explanation": "Allocate [2, 1, 2] -> sum 5."
      },
      {
        "input": "ratings = [1, 2, 2]",
        "output": "4",
        "explanation": "Allocate [1, 2, 1] -> sum 4."
      }
    ],
    "constraints": [
      "1 <= ratings.length <= 2 * 10^4",
      "0 <= ratings[i] <= 2 * 10^4"
    ],
    "starterCode": {
      "python": "def min_candies(ratings: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minCandies(ratings) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minCandies(int[] ratings) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minCandies(vector<int>& ratings) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ratings = [1, 0, 2]",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ratings = [1, 2, 2]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "partition-labels",
    "title": "Partition Labels",
    "difficulty": "Medium",
    "topics": [
      "Greedy",
      "Two Pointers",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a string `s`, partition `s` into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.",
    "examples": [
      {
        "input": "s = \"ababcbacadefegdehijhklij\"",
        "output": "[9, 7, 8]",
        "explanation": "Partitions are \"ababcbaca\", \"defegde\", \"hijhklij\"."
      },
      {
        "input": "s = \"eccbbbbdec\"",
        "output": "[10]",
        "explanation": "All characters overlap into a single partition."
      }
    ],
    "constraints": [
      "1 <= s.length <= 500",
      "s consists of lowercase English letters."
    ],
    "starterCode": {
      "python": "def partition_labels(s: str) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function partitionLabels(s) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> partitionLabels(String s) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"ababcbacadefegdehijhklij\"",
        "expected": "[9, 7, 8]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"eccbbbbdec\"",
        "expected": "[10]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "permutations-all",
    "title": "Permutations",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given an array `nums` of distinct integers, return all possible permutations in any order.",
    "examples": [
      {
        "input": "nums = [1, 2, 3]",
        "output": "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
        "explanation": "All 3! = 6 permutations."
      },
      {
        "input": "nums = [0, 1]",
        "output": "[[0, 1], [1, 0]]",
        "explanation": "All 2! = 2 permutations."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 6",
      "All integers of nums are unique."
    ],
    "starterCode": {
      "python": "def permute(nums: list[int]) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function permute(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 2, 3]",
        "expected": "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0, 1]",
        "expected": "[[0, 1], [1, 0]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "letter-combinations-of-a-phone-number",
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "String",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given a string containing digits from `2`–`9` inclusive, return all possible letter combinations that the number could represent on a telephone keypad. Return `[]` if `digits` is empty.",
    "examples": [
      {
        "input": "digits = \"23\"",
        "output": "[\"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\"]",
        "explanation": "2 -> abc, 3 -> def."
      },
      {
        "input": "digits = \"\"",
        "output": "[]",
        "explanation": "Empty input yields empty list."
      }
    ],
    "constraints": [
      "0 <= digits.length <= 4",
      "digits[i] is in '2'-'9'."
    ],
    "starterCode": {
      "python": "def letter_combinations(digits: str) -> list[str]:\n    # Write your solution here\n    return []\n",
      "javascript": "function letterCombinations(digits) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<String> letterCombinations(String digits) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "digits = \"23\"",
        "expected": "[\"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "digits = \"\"",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "generate-parentheses",
    "title": "Generate Parentheses",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "String",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    "examples": [
      {
        "input": "n = 3",
        "output": "[\"((()))\", \"(()())\", \"(())()\", \"()(())\", \"()()()\"]",
        "explanation": "All 5 valid combinations for n=3 (Catalan number C_3 = 5)."
      },
      {
        "input": "n = 1",
        "output": "[\"()\"]",
        "explanation": "Single valid pair."
      }
    ],
    "constraints": [
      "1 <= n <= 8"
    ],
    "starterCode": {
      "python": "def generate_parenthesis(n: int) -> list[str]:\n    # Write your solution here\n    return []\n",
      "javascript": "function generateParenthesis(n) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<String> generateParenthesis(int n) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 3",
        "expected": "[\"((()))\", \"(()())\", \"(())()\", \"()(())\", \"()()()\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 1",
        "expected": "[\"()\"]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "word-search-grid",
    "title": "Word Search",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Matrix",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid via 4-directionally adjacent cells without reusing the same cell twice.",
    "examples": [
      {
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
        "output": "true",
        "explanation": "Path A->B->C->C->E->D exists."
      },
      {
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"",
        "output": "false",
        "explanation": "Cannot reuse cell 'B'."
      }
    ],
    "constraints": [
      "1 <= m, n <= 6",
      "1 <= word.length <= 15"
    ],
    "starterCode": {
      "python": "def exist_word(board: list[list[str]], word: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function existWord(board, word) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean existWord(char[][] board, String word) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool existWord(vector<vector<char>>& board, string word) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "find-median-from-data-stream",
    "title": "Find Median from Data Stream",
    "difficulty": "Hard",
    "topics": [
      "Heap",
      "Design",
      "Two Heaps"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Design a data structure supporting `addNum(x)` and `findMedian()`. Given `ops` containing `[\"addNum\", x]` or `[\"findMedian\"]`, return the list of float medians for every `findMedian` call.",
    "examples": [
      {
        "input": "ops = [[\"addNum\", 1], [\"addNum\", 2], [\"findMedian\"], [\"addNum\", 3], [\"findMedian\"]]",
        "output": "[1.5, 2.0]",
        "explanation": "Median of [1,2] is 1.5; median of [1,2,3] is 2.0."
      },
      {
        "input": "ops = [[\"addNum\", 5], [\"findMedian\"]]",
        "output": "[5.0]",
        "explanation": "Single element median is 5.0."
      }
    ],
    "constraints": [
      "1 <= ops.length <= 5 * 10^4",
      "findMedian is only called after at least one addNum."
    ],
    "starterCode": {
      "python": "def run_median_finder(ops: list[list]) -> list[float]:\n    # Write your solution here\n    return []\n",
      "javascript": "function runMedianFinder(ops) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Double> runMedianFinder(List<List<Object>> ops) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<double> runMedianFinder(vector<vector<string>>& ops) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ops = [[\"addNum\", 1], [\"addNum\", 2], [\"findMedian\"], [\"addNum\", 3], [\"findMedian\"]]",
        "expected": "[1.5, 2.0]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ops = [[\"addNum\", 5], [\"findMedian\"]]",
        "expected": "[5.0]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "number-of-1-bits",
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "topics": [
      "Bit Manipulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Write a function that takes a non-negative integer `n` and returns the number of set bits (`1` bits) it has in its binary representation (Hamming weight).",
    "examples": [
      {
        "input": "n = 11",
        "output": "3",
        "explanation": "11 in binary is 1011, which has three 1 bits."
      },
      {
        "input": "n = 128",
        "output": "1",
        "explanation": "128 is 10000000 in binary."
      }
    ],
    "constraints": [
      "0 <= n <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def hamming_weight(n: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function hammingWeight(n) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int hammingWeight(int n) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int hammingWeight(int n) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 11",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 128",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "power-of-two",
    "title": "Power of Two",
    "difficulty": "Easy",
    "topics": [
      "Bit Manipulation",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer `n`, return `true` if it is a power of two (there exists an integer `x` such that `n == 2^x`), otherwise return `false`.",
    "examples": [
      {
        "input": "n = 1",
        "output": "true",
        "explanation": "2^0 = 1."
      },
      {
        "input": "n = 16",
        "output": "true",
        "explanation": "2^4 = 16."
      }
    ],
    "constraints": [
      "-2^31 <= n <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def is_power_of_two(n: int) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isPowerOfTwo(n) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isPowerOfTwo(int n) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPowerOfTwo(int n) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 1",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 16",
        "expected": "true",
        "isHidden": false
      }
    ]
  },
  {
    "id": "missing-sequence-number",
    "title": "Missing Number in Range",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Bit Manipulation",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array `nums` containing `n` distinct integers taken from the range `[0, n]`, return the single integer in `[0, n]` that is missing from `nums` in `O(n)` time and `O(1)` space.",
    "examples": [
      {
        "input": "nums = [3, 0, 1]",
        "output": "2",
        "explanation": "Range is [0..3]; 2 is missing."
      },
      {
        "input": "nums = [0, 1]",
        "output": "2",
        "explanation": "Range is [0..2]; 2 is missing."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= n",
      "All numbers are unique."
    ],
    "starterCode": {
      "python": "def missing_number(nums: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function missingNumber(nums) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int missingNumber(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [3, 0, 1]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0, 1]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "squares-of-sorted-array",
    "title": "Squares of a Sorted Array",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums` sorted in non-decreasing order (which may contain negatives), return an array of the squares of each number sorted in non-decreasing order in `O(n)` time.",
    "examples": [
      {
        "input": "nums = [-4, -1, 0, 3, 10]",
        "output": "[0, 1, 9, 16, 100]",
        "explanation": "Squared and sorted ascending."
      },
      {
        "input": "nums = [-7, -3, 2, 3, 11]",
        "output": "[4, 9, 9, 49, 121]",
        "explanation": "Sorted squares."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def sorted_squares(nums: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function sortedSquares(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] sortedSquares(int[] nums) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> sortedSquares(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [-4, -1, 0, 3, 10]",
        "expected": "[0, 1, 9, 16, 100]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [-7, -3, 2, 3, 11]",
        "expected": "[4, 9, 9, 49, 121]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "lemonade-change-counter",
    "title": "Lemonade Change",
    "difficulty": "Easy",
    "topics": [
      "Greedy",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Customers queue to buy a $5 item paying with `$5`, `$10`, or `$20` bills listed in `bills`. Starting with zero change, return `true` if you can provide exact change to every customer in order.",
    "examples": [
      {
        "input": "bills = [5, 5, 5, 10, 20]",
        "output": "true",
        "explanation": "All customers receive exact change."
      },
      {
        "input": "bills = [5, 5, 10, 10, 20]",
        "output": "false",
        "explanation": "Cannot give $15 change to the last customer."
      }
    ],
    "constraints": [
      "1 <= bills.length <= 10^5",
      "bills[i] in {5, 10, 20}."
    ],
    "starterCode": {
      "python": "def lemonade_change(bills: list[int]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function lemonadeChange(bills) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean lemonadeChange(int[] bills) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool lemonadeChange(vector<int>& bills) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "bills = [5, 5, 5, 10, 20]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "bills = [5, 5, 10, 10, 20]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "can-place-flowers-beds",
    "title": "Can Place Flowers",
    "difficulty": "Easy",
    "topics": [
      "Greedy",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A flowerbed is represented as binary array `bed` (`0` = empty, `1` = planted) where no two flowers can be planted in adjacent plots. Return `true` if `n` new flowers can be planted without violating the no-adjacent rule.",
    "examples": [
      {
        "input": "bed = [1, 0, 0, 0, 1], n = 1",
        "output": "true",
        "explanation": "Plant at index 2."
      },
      {
        "input": "bed = [1, 0, 0, 0, 1], n = 2",
        "output": "false",
        "explanation": "Only 1 valid empty spot exists."
      }
    ],
    "constraints": [
      "1 <= bed.length <= 2 * 10^4",
      "0 <= n <= bed.length"
    ],
    "starterCode": {
      "python": "def can_place_flowers(bed: list[int], n: int) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function canPlaceFlowers(bed, n) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean canPlaceFlowers(int[] bed, int n) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canPlaceFlowers(vector<int>& bed, int n) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "bed = [1, 0, 0, 0, 1], n = 1",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "bed = [1, 0, 0, 0, 1], n = 2",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "three-sum-closest-target",
    "title": "3Sum Closest",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that their sum is closest to `target` and return that sum.",
    "examples": [
      {
        "input": "nums = [-1, 2, 1, -4], target = 1",
        "output": "2",
        "explanation": "-1 + 2 + 1 = 2 is closest to 1."
      },
      {
        "input": "nums = [0, 0, 0], target = 1",
        "output": "0",
        "explanation": "Only possible sum is 0."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 500"
    ],
    "starterCode": {
      "python": "def three_sum_closest(nums: list[int], target: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function threeSumClosest(nums, target) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int threeSumClosest(int[] nums, int target) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int threeSumClosest(vector<int>& nums, int target) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [-1, 2, 1, -4], target = 1",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0, 0, 0], target = 1",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "continuous-subarray-sum-multiple-k",
    "title": "Continuous Subarray Sum (Multiple of K)",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Hash Table",
      "Prefix Sum"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums` and an integer `k`, return `true` if `nums` has a contiguous subarray of length at least `2` whose sum is a multiple of `k` (`0` is always a multiple of `k`).",
    "examples": [
      {
        "input": "nums = [23, 2, 4, 6, 7], k = 6",
        "output": "true",
        "explanation": "[2, 4] has length 2 and sums to 6."
      },
      {
        "input": "nums = [23, 2, 6, 4, 7], k = 13",
        "output": "false",
        "explanation": "No length>=2 subarray sums to a multiple of 13."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "1 <= k <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def check_subarray_sum(nums: list[int], k: int) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function checkSubarraySum(nums, k) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean checkSubarraySum(int[] nums, int k) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool checkSubarraySum(vector<int>& nums, int k) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [23, 2, 4, 6, 7], k = 6",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [23, 2, 6, 4, 7], k = 13",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "max-points-from-cards",
    "title": "Maximum Points You Can Obtain from Cards",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Cards are arranged in a row with points `cards`. In each step you may take one card from either the beginning or the end of the row, for a total of `k` cards. Return the maximum score you can obtain.",
    "examples": [
      {
        "input": "cards = [1, 2, 3, 4, 5, 6, 1], k = 3",
        "output": "12",
        "explanation": "Take the last three cards 5 + 6 + 1 = 12."
      },
      {
        "input": "cards = [9, 7, 7, 9, 7, 7, 9], k = 7",
        "output": "55",
        "explanation": "Take all 7 cards."
      }
    ],
    "constraints": [
      "1 <= k <= cards.length <= 10^5"
    ],
    "starterCode": {
      "python": "def max_card_score(cards: list[int], k: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxCardScore(cards, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxCardScore(int[] cards, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxCardScore(vector<int>& cards, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "cards = [1, 2, 3, 4, 5, 6, 1], k = 3",
        "expected": "12",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "cards = [9, 7, 7, 9, 7, 7, 9], k = 7",
        "expected": "55",
        "isHidden": false
      }
    ]
  },
  {
    "id": "min-ops-reduce-x-to-zero",
    "title": "Minimum Operations to Reduce X to Zero",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array of positive integers `nums` and an integer `x`, in one operation you may remove either the leftmost or rightmost element and subtract its value from `x`. Return the minimum operations to reduce `x` to exactly `0`, or `-1` if impossible.",
    "examples": [
      {
        "input": "nums = [1, 1, 4, 2, 3], x = 5",
        "output": "2",
        "explanation": "Remove 3 and 2 from the right."
      },
      {
        "input": "nums = [5, 6, 7, 8, 9], x = 4",
        "output": "-1",
        "explanation": "Every element exceeds 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "1 <= nums[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def min_operations_x(nums: list[int], x: int) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function minOperationsX(nums, x) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int minOperationsX(int[] nums, int x) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minOperationsX(vector<int>& nums, int x) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 1, 4, 2, 3], x = 5",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [5, 6, 7, 8, 9], x = 4",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "next-greater-element-circular",
    "title": "Next Greater Element II (Circular Array)",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Monotonic Stack",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a circular integer array `nums` (the next element of `nums[n - 1]` is `nums[0]`), return an array `ans` where `ans[i]` is the first strictly greater number traversing circularly after `nums[i]`, or `-1` if none exists.",
    "examples": [
      {
        "input": "nums = [1, 2, 1]",
        "output": "[2, -1, 2]",
        "explanation": "Last 1 wraps around to find 2."
      },
      {
        "input": "nums = [1, 2, 3, 4, 3]",
        "output": "[2, 3, 4, -1, 4]",
        "explanation": "Last 3 wraps to 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4"
    ],
    "starterCode": {
      "python": "def next_greater_circular(nums: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function nextGreaterCircular(nums) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] nextGreaterCircular(int[] nums) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> nextGreaterCircular(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 2, 1]",
        "expected": "[2, -1, 2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 2, 3, 4, 3]",
        "expected": "[2, 3, 4, -1, 4]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "pattern-132-detector",
    "title": "132 Pattern Subsequence",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Monotonic Stack",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums`, return `true` if there exist indices `i < j < k` such that `nums[i] < nums[k] < nums[j]` (a 132 pattern), or `false` otherwise.",
    "examples": [
      {
        "input": "nums = [3, 1, 4, 2]",
        "output": "true",
        "explanation": "Subsequence [1, 4, 2] satisfies 1 < 2 < 4."
      },
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "false",
        "explanation": "Strictly increasing array has no 132 pattern."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5"
    ],
    "starterCode": {
      "python": "def find_132_pattern(nums: list[int]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function find132Pattern(nums) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean find132Pattern(int[] nums) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool find132Pattern(vector<int>& nums) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [3, 1, 4, 2]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 2, 3, 4]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "k-closest-points-origin",
    "title": "K Closest Points to Origin",
    "difficulty": "Medium",
    "topics": [
      "Heap",
      "Sorting",
      "Geometry"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given an array of 2D coordinates `points` and an integer `k`, return the `k` closest points to the origin `(0, 0)` by Euclidean distance in any order.",
    "examples": [
      {
        "input": "points = [[1, 3], [-2, 2]], k = 1",
        "output": "[[-2, 2]]",
        "explanation": "(-2)^2+2^2 = 8 < 1^2+3^2 = 10."
      },
      {
        "input": "points = [[3, 3], [5, -1], [-2, 4]], k = 2",
        "output": "[[3, 3], [-2, 4]]",
        "explanation": "Distances squared: 18, 26, 20."
      }
    ],
    "constraints": [
      "1 <= k <= points.length <= 10^4"
    ],
    "starterCode": {
      "python": "def k_closest_points(points: list[list[int]], k: int) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function kClosestPoints(points, k) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[][] kClosestPoints(int[][] points, int k) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> kClosestPoints(vector<vector<int>>& points, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "points = [[1, 3], [-2, 2]], k = 1",
        "expected": "[[-2, 2]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "points = [[3, 3], [5, -1], [-2, 4]], k = 2",
        "expected": "[[3, 3], [-2, 4]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "reorganize-string-no-adjacent",
    "title": "Reorganize String (No Adjacent Duplicates)",
    "difficulty": "Medium",
    "topics": [
      "Heap",
      "Greedy",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a lowercase string `s`, check if its letters can be rearranged so no two adjacent characters are identical. Return `true` if a valid rearrangement exists, or `false` otherwise.",
    "examples": [
      {
        "input": "s = \"aab\"",
        "output": "true",
        "explanation": "\"aba\" has no adjacent duplicates."
      },
      {
        "input": "s = \"aaab\"",
        "output": "false",
        "explanation": "Three 'a's cannot be separated by one 'b'."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5"
    ],
    "starterCode": {
      "python": "def can_reorganize_string(s: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function canReorganizeString(s) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean canReorganizeString(String s) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canReorganizeString(string s) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"aab\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"aaab\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "shortest-subarray-sum-at-least-k",
    "title": "Shortest Subarray with Sum at Least K",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Prefix Sum",
      "Monotonic Queue"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums` (which may contain negative integers) and an integer `k`, return the length of the shortest non-empty contiguous subarray of `nums` with a sum of at least `k`, or `-1` if none exists.",
    "examples": [
      {
        "input": "nums = [2, -1, 2], k = 3",
        "output": "3",
        "explanation": "Entire array sums to 3."
      },
      {
        "input": "nums = [1, 2], k = 4",
        "output": "-1",
        "explanation": "Max sum is 3 < 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^5 <= nums[i] <= 10^5",
      "1 <= k <= 10^9"
    ],
    "starterCode": {
      "python": "def shortest_subarray_k(nums: list[int], k: int) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function shortestSubarrayK(nums, k) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int shortestSubarrayK(int[] nums, int k) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestSubarrayK(vector<int>& nums, int k) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [2, -1, 2], k = 3",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 2], k = 4",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "min-refueling-stops-highway",
    "title": "Minimum Number of Refueling Stops",
    "difficulty": "Hard",
    "topics": [
      "Heap",
      "Greedy",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A car drives `target` miles starting with `start_fuel` gallons (1 gallon per mile). Along the route are `stations[i] = [pos_i, fuel_i]` sorted by position. Return the minimum number of refueling stops needed to reach `target`, or `-1` if impossible.",
    "examples": [
      {
        "input": "target = 100, start_fuel = 10, stations = [[10, 60], [20, 30], [30, 30], [60, 40]]",
        "output": "2",
        "explanation": "Stop at mile 10 (+60) and mile 60 (+40)."
      },
      {
        "input": "target = 100, start_fuel = 1, stations = [[10, 100]]",
        "output": "-1",
        "explanation": "Cannot even reach mile 10."
      }
    ],
    "constraints": [
      "1 <= target, start_fuel <= 10^9",
      "0 <= stations.length <= 500"
    ],
    "starterCode": {
      "python": "def min_refuel_stops(target: int, start_fuel: int, stations: list[list[int]]) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function minRefuelStops(target, startFuel, stations) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int minRefuelStops(int target, int startFuel, int[][] stations) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "target = 100, start_fuel = 10, stations = [[10, 60], [20, 30], [30, 30], [60, 40]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "target = 100, start_fuel = 1, stations = [[10, 100]]",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ipo-maximize-capital",
    "title": "IPO — Maximize Capital with K Projects",
    "difficulty": "Hard",
    "topics": [
      "Heap",
      "Greedy",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Starting with initial capital `w`, you may complete at most `k` distinct projects. Project `i` requires minimum capital `capital[i]` to start and adds `profits[i]` to your capital upon completion. Return the maximum final capital.",
    "examples": [
      {
        "input": "k = 2, w = 0, profits = [1, 2, 3], capital = [0, 1, 1]",
        "output": "4",
        "explanation": "Do project 0 (+1 -> w=1), then project 2 (+3 -> w=4)."
      },
      {
        "input": "k = 3, w = 0, profits = [1, 2, 3], capital = [0, 1, 2]",
        "output": "6",
        "explanation": "Do all three projects in sequence."
      }
    ],
    "constraints": [
      "1 <= k <= 10^5",
      "0 <= w <= 10^9",
      "1 <= profits.length == capital.length <= 10^5"
    ],
    "starterCode": {
      "python": "def find_maximized_capital(k: int, w: int, profits: list[int], capital: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function findMaximizedCapital(k, w, profits, capital) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "k = 2, w = 0, profits = [1, 2, 3], capital = [0, 1, 1]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "k = 3, w = 0, profits = [1, 2, 3], capital = [0, 1, 2]",
        "expected": "6",
        "isHidden": false
      }
    ]
  },
  {
    "id": "subarrays-with-k-different-integers",
    "title": "Subarrays with K Different Integers",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums` and an integer `k`, return the number of contiguous subarrays that contain exactly `k` distinct integers.",
    "examples": [
      {
        "input": "nums = [1, 2, 1, 2, 3], k = 2",
        "output": "7",
        "explanation": "7 subarrays have exactly 2 distinct values."
      },
      {
        "input": "nums = [1, 2, 1, 3, 4], k = 3",
        "output": "3",
        "explanation": "[1,2,1,3], [2,1,3], [1,3,4]."
      }
    ],
    "constraints": [
      "1 <= k <= nums.length <= 2 * 10^4"
    ],
    "starterCode": {
      "python": "def subarrays_with_k_distinct(nums: list[int], k: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function subarraysWithKDistinct(nums, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int subarraysWithKDistinct(int[] nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int subarraysWithKDistinct(vector<int>& nums, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 2, 1, 2, 3], k = 2",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 2, 1, 3, 4], k = 3",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "course-schedule-iii-deadlines",
    "title": "Course Schedule III (Max Courses with Deadlines)",
    "difficulty": "Hard",
    "topics": [
      "Heap",
      "Greedy",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given `courses[i] = [duration_i, last_day_i]` where course `i` takes `duration_i` consecutive days and must finish on or before `last_day_i`, return the maximum number of courses you can take starting on day 0.",
    "examples": [
      {
        "input": "courses = [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]",
        "output": "3",
        "explanation": "Take courses [100, 200], [1000, 1250], and [2000, 3200] (3 courses)."
      },
      {
        "input": "courses = [[3, 2], [4, 3]]",
        "output": "0",
        "explanation": "Neither course fits before its deadline."
      }
    ],
    "constraints": [
      "1 <= courses.length <= 10^4",
      "1 <= duration, last_day <= 10^4"
    ],
    "starterCode": {
      "python": "def schedule_max_courses(courses: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function scheduleMaxCourses(courses) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int scheduleMaxCourses(int[][] courses) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int scheduleMaxCourses(vector<vector<int>>& courses) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "courses = [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "courses = [[3, 2], [4, 3]]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "patching-array-min-additions",
    "title": "Patching Array (Minimum Range Coverage Additions)",
    "difficulty": "Hard",
    "topics": [
      "Greedy",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a sorted positive integer array `nums` and an integer `n`, add the minimum number of patches (positive integers) to `nums` so that every integer in `[1, n]` can be formed as the sum of some subset of elements. Return the minimum number of patches.",
    "examples": [
      {
        "input": "nums = [1, 3], n = 6",
        "output": "1",
        "explanation": "Adding 2 covers [1..6]."
      },
      {
        "input": "nums = [1, 5, 10], n = 20",
        "output": "2",
        "explanation": "Adding 2 and 4 covers [1..20]."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 1000",
      "1 <= n <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def min_patches(nums: list[int], n: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minPatches(nums, n) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minPatches(int[] nums, int n) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minPatches(vector<int>& nums, int n) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 3], n = 6",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 5, 10], n = 20",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "max-frequency-stack-design",
    "title": "Maximum Frequency Stack",
    "difficulty": "Hard",
    "topics": [
      "Stack",
      "Hash Table",
      "Design"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Simulate a stack where `pop` removes and returns the most frequent element (breaking ties by most recently pushed). Given `ops` (`[\"push\", x]` or `[\"pop\"]`), return the list of popped values.",
    "examples": [
      {
        "input": "ops = [[\"push\", 5], [\"push\", 7], [\"push\", 5], [\"push\", 7], [\"push\", 4], [\"push\", 5], [\"pop\"], [\"pop\"], [\"pop\"], [\"pop\"]]",
        "output": "[5, 7, 5, 4]",
        "explanation": "Pops 5 (freq 3), 7 (freq 2, newer than 5), 5 (freq 2), 4 (freq 1, newest)."
      },
      {
        "input": "ops = [[\"push\", 1], [\"pop\"]]",
        "output": "[1]",
        "explanation": "Single element."
      }
    ],
    "constraints": [
      "1 <= ops.length <= 2 * 10^4"
    ],
    "starterCode": {
      "python": "def run_freq_stack(ops: list[list]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function runFreqStack(ops) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> runFreqStack(List<List<Object>> ops) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> runFreqStack(vector<vector<string>>& ops) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ops = [[\"push\", 5], [\"push\", 7], [\"push\", 5], [\"push\", 7], [\"push\", 4], [\"push\", 5], [\"pop\"], [\"pop\"], [\"pop\"], [\"pop\"]]",
        "expected": "[5, 7, 5, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ops = [[\"push\", 1], [\"pop\"]]",
        "expected": "[1]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "min-cost-to-hire-k-workers",
    "title": "Minimum Cost to Hire K Workers",
    "difficulty": "Hard",
    "topics": [
      "Heap",
      "Greedy",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "There are `n` workers with `quality[i]` and minimum wage `wage[i]`. Hiring `k` workers requires paying each worker proportional to their quality and at least their minimum wage. Return the least total cost rounded to 5 decimal places.",
    "examples": [
      {
        "input": "quality = [10, 20, 5], wage = [70, 50, 30], k = 2",
        "output": "105.0",
        "explanation": "Hire workers 0 and 2 at ratio 7.0 -> 7*(10+5) = 105.0."
      },
      {
        "input": "quality = [3, 1, 10, 10, 1], wage = [4, 8, 2, 2, 7], k = 3",
        "output": "30.66667",
        "explanation": "Hire workers 0, 2, 3 at ratio 4/3 -> (4/3)*23 = 30.66667."
      }
    ],
    "constraints": [
      "1 <= k <= quality.length <= 10^4"
    ],
    "starterCode": {
      "python": "def min_hire_cost(quality: list[int], wage: list[int], k: int) -> float:\n    # Write your solution here\n    return 0.0\n",
      "javascript": "function minHireCost(quality, wage, k) {\n  // Write your solution here\n  return 0.0;\n}\n",
      "java": "class Solution {\n    public double minHireCost(int[] quality, int[] wage, int k) {\n        // Write your solution here\n        return 0.0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    double minHireCost(vector<int>& quality, vector<int>& wage, int k) {\n        // Write your solution here\n        return 0.0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "quality = [10, 20, 5], wage = [70, 50, 30], k = 2",
        "expected": "105.0",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "quality = [3, 1, 10, 10, 1], wage = [4, 8, 2, 2, 7], k = 3",
        "expected": "30.66667",
        "isHidden": false
      }
    ]
  },
  {
    "id": "min-cost-climbing-stairs",
    "title": "Min Cost Climbing Stairs",
    "difficulty": "Easy",
    "topics": [
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `cost` where `cost[i]` is the cost of stepping on stair `i`, you may start at step `0` or step `1` and advance `1` or `2` steps at a time. Return the minimum cost to reach the top (past the last index).",
    "examples": [
      {
        "input": "cost = [10, 15, 20]",
        "output": "15",
        "explanation": "Start at index 1 (15) and jump 2 steps to top."
      },
      {
        "input": "cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]",
        "output": "6",
        "explanation": "Avoid all 100s for total cost 6."
      }
    ],
    "constraints": [
      "2 <= cost.length <= 1000",
      "0 <= cost[i] <= 999"
    ],
    "starterCode": {
      "python": "def min_cost_stairs(cost: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minCostStairs(cost) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minCostStairs(int[] cost) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minCostStairs(vector<int>& cost) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "cost = [10, 15, 20]",
        "expected": "15",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]",
        "expected": "6",
        "isHidden": false
      }
    ]
  },
  {
    "id": "happy-number-cycle",
    "title": "Happy Number",
    "difficulty": "Easy",
    "topics": [
      "Math",
      "Hash Table",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Starting with any positive integer `n`, repeatedly replace the number by the sum of the squares of its decimal digits. Return `true` if the process reaches `1`, or `false` if it loops endlessly.",
    "examples": [
      {
        "input": "n = 19",
        "output": "true",
        "explanation": "19 -> 82 -> 68 -> 100 -> 1."
      },
      {
        "input": "n = 2",
        "output": "false",
        "explanation": "Enters cycle containing 4."
      }
    ],
    "constraints": [
      "1 <= n <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def is_happy(n: int) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isHappy(n) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isHappy(int n) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isHappy(int n) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 19",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 2",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "plus-one-digit-array",
    "title": "Plus One",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given a large non-negative integer represented as an array of decimal `digits` (most-significant digit first). Increment the integer by one and return the resulting array of digits.",
    "examples": [
      {
        "input": "digits = [1, 2, 3]",
        "output": "[1, 2, 4]",
        "explanation": "123 + 1 = 124."
      },
      {
        "input": "digits = [9, 9]",
        "output": "[1, 0, 0]",
        "explanation": "99 + 1 = 100."
      }
    ],
    "constraints": [
      "1 <= digits.length <= 100",
      "0 <= digits[i] <= 9"
    ],
    "starterCode": {
      "python": "def plus_one(digits: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function plusOne(digits) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] plusOne(int[] digits) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "digits = [1, 2, 3]",
        "expected": "[1, 2, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "digits = [9, 9]",
        "expected": "[1, 0, 0]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "excel-sheet-column-number",
    "title": "Excel Sheet Column Number",
    "difficulty": "Easy",
    "topics": [
      "Math",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a spreadsheet column title `col` (`\"A\" -> 1, \"B\" -> 2, ..., \"Z\" -> 26, \"AA\" -> 27, ...`), return its corresponding 1-based column number.",
    "examples": [
      {
        "input": "col = \"AB\"",
        "output": "28",
        "explanation": "1 * 26 + 2 = 28."
      },
      {
        "input": "col = \"ZY\"",
        "output": "701",
        "explanation": "26 * 26 + 25 = 701."
      }
    ],
    "constraints": [
      "1 <= col.length <= 7",
      "Uppercase English letters only."
    ],
    "starterCode": {
      "python": "def title_to_number(col: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function titleToNumber(col) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int titleToNumber(String col) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int titleToNumber(string col) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "col = \"AB\"",
        "expected": "28",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "col = \"ZY\"",
        "expected": "701",
        "isHidden": false
      }
    ]
  },
  {
    "id": "perfect-squares-min-sum",
    "title": "Perfect Squares",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "BFS",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer `n`, return the least number of perfect square numbers (`1, 4, 9, 16, ...`) that sum to `n`.",
    "examples": [
      {
        "input": "n = 12",
        "output": "3",
        "explanation": "12 = 4 + 4 + 4."
      },
      {
        "input": "n = 13",
        "output": "2",
        "explanation": "13 = 4 + 9."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4"
    ],
    "starterCode": {
      "python": "def num_squares(n: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function numSquares(n) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int numSquares(int n) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numSquares(int n) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 12",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 13",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "integer-break-max-product",
    "title": "Integer Break",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Math",
      "Greedy"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer `n >= 2`, break it into the sum of `k >= 2` positive integers and maximize the product of those integers. Return the maximum product.",
    "examples": [
      {
        "input": "n = 10",
        "output": "36",
        "explanation": "10 = 3 + 3 + 4 -> 3 * 3 * 4 = 36."
      },
      {
        "input": "n = 2",
        "output": "1",
        "explanation": "2 = 1 + 1 -> 1 * 1 = 1."
      }
    ],
    "constraints": [
      "2 <= n <= 58"
    ],
    "starterCode": {
      "python": "def integer_break(n: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function integerBreak(n) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int integerBreak(int n) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int integerBreak(int n) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 10",
        "expected": "36",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 2",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "combination-sum-iv-ordered",
    "title": "Combination Sum IV (Ordered Sequences)",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of distinct positive integers `nums` and a `target`, return the number of possible ordered sequences that add up to `target` (different orders count as distinct sequences).",
    "examples": [
      {
        "input": "nums = [1, 2, 3], target = 4",
        "output": "7",
        "explanation": "7 ordered sequences sum to 4."
      },
      {
        "input": "nums = [9], target = 3",
        "output": "0",
        "explanation": "Cannot sum to 3."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 200",
      "1 <= target <= 1000"
    ],
    "starterCode": {
      "python": "def combination_sum4(nums: list[int], target: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function combinationSum4(nums, target) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int combinationSum4(int[] nums, int target) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int combinationSum4(vector<int>& nums, int target) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 2, 3], target = 4",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [9], target = 3",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ones-and-zeroes-2d-knapsack",
    "title": "Ones and Zeroes (2D 0/1 Knapsack)",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Knapsack",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of binary strings `strs` and two budgets `m` (max `'0'`s) and `n` (max `'1'`s), return the size of the largest subset of `strs` containing at most `m` `'0'`s and `n` `'1'`s in total.",
    "examples": [
      {
        "input": "strs = [\"10\", \"0001\", \"111001\", \"1\", \"0\"], m = 5, n = 3",
        "output": "4",
        "explanation": "Subset {\"10\", \"0001\", \"1\", \"0\"} uses 5 zeros and 3 ones."
      },
      {
        "input": "strs = [\"10\", \"0\", \"1\"], m = 1, n = 1",
        "output": "2",
        "explanation": "{\"0\", \"1\"} has size 2."
      }
    ],
    "constraints": [
      "1 <= strs.length <= 600",
      "1 <= m, n <= 100"
    ],
    "starterCode": {
      "python": "def find_max_form(strs: list[str], m: int, n: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function findMaxForm(strs, m, n) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int findMaxForm(String[] strs, int m, int n) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findMaxForm(vector<string>& strs, int m, int n) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "strs = [\"10\", \"0001\", \"111001\", \"1\", \"0\"], m = 5, n = 3",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "strs = [\"10\", \"0\", \"1\"], m = 1, n = 1",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "maximal-square-binary-grid",
    "title": "Maximal Square",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `m x n` binary matrix filled with `'0'`s and `'1'`s, find the largest square containing only `'1'`s and return its area.",
    "examples": [
      {
        "input": "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
        "output": "4",
        "explanation": "Largest all-1 square is 2x2 (area 4)."
      },
      {
        "input": "matrix = [[\"0\"]]",
        "output": "0",
        "explanation": "No 1s present."
      }
    ],
    "constraints": [
      "1 <= m, n <= 300"
    ],
    "starterCode": {
      "python": "def maximal_square(matrix: list[list[str]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maximalSquare(matrix) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maximalSquare(char[][] matrix) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maximalSquare(vector<vector<char>>& matrix) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[\"0\"]]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "longest-string-chain",
    "title": "Longest String Chain",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Hash Table",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Word `a` is a predecessor of word `b` if inserting exactly one letter anywhere in `a` yields `b`. Given a list of `words`, return the length of the longest possible word chain using words from `words`.",
    "examples": [
      {
        "input": "words = [\"a\", \"b\", \"ba\", \"bca\", \"bda\", \"bdca\"]",
        "output": "4",
        "explanation": "Chain: a -> ba -> bda -> bdca (length 4)."
      },
      {
        "input": "words = [\"xbc\", \"pcxbcf\", \"xb\", \"cxbc\", \"pcxbc\"]",
        "output": "5",
        "explanation": "All 5 words form one chain."
      }
    ],
    "constraints": [
      "1 <= words.length <= 1000",
      "1 <= words[i].length <= 16"
    ],
    "starterCode": {
      "python": "def longest_str_chain(words: list[str]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestStrChain(words) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestStrChain(String[] words) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestStrChain(vector<string>& words) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "words = [\"a\", \"b\", \"ba\", \"bca\", \"bda\", \"bdca\"]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "words = [\"xbc\", \"pcxbcf\", \"xb\", \"cxbc\", \"pcxbc\"]",
        "expected": "5",
        "isHidden": false
      }
    ]
  },
  {
    "id": "predict-the-winner-game-dp",
    "title": "Predict the Winner (Two-Player End-Pick Game)",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Game Theory"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Two players take turns picking either the first or last number from integer array `nums`, adding it to their score. Both play optimally. Return `true` if Player 1 can achieve a score greater than or equal to Player 2.",
    "examples": [
      {
        "input": "nums = [1, 5, 2]",
        "output": "false",
        "explanation": "Player 1 picks 1 or 2, Player 2 takes 5 and wins."
      },
      {
        "input": "nums = [1, 5, 233, 7]",
        "output": "true",
        "explanation": "Player 1 picks 1, then secures 233."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 20"
    ],
    "starterCode": {
      "python": "def predict_winner(nums: list[int]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function predictWinner(nums) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean predictWinner(int[] nums) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool predictWinner(vector<int>& nums) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 5, 2]",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 5, 233, 7]",
        "expected": "true",
        "isHidden": false
      }
    ]
  },
  {
    "id": "min-falling-path-sum-grid",
    "title": "Minimum Falling Path Sum",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `n x n` integer `matrix`, return the minimum sum of any falling path starting at any element in the first row and moving down each row to column `c - 1`, `c`, or `c + 1`.",
    "examples": [
      {
        "input": "matrix = [[2, 1, 3], [6, 5, 4], [7, 8, 9]]",
        "output": "13",
        "explanation": "1 -> 5 -> 7 (or 1 -> 4 -> 8) = 13."
      },
      {
        "input": "matrix = [[-19, 57], [-40, -5]]",
        "output": "-59",
        "explanation": "-19 + (-40) = -59."
      }
    ],
    "constraints": [
      "1 <= n <= 100",
      "-100 <= matrix[i][j] <= 100"
    ],
    "starterCode": {
      "python": "def min_falling_path(matrix: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minFallingPath(matrix) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minFallingPath(int[][] matrix) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minFallingPath(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[2, 1, 3], [6, 5, 4], [7, 8, 9]]",
        "expected": "13",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[-19, 57], [-40, -5]]",
        "expected": "-59",
        "isHidden": false
      }
    ]
  },
  {
    "id": "longest-increasing-path-matrix",
    "title": "Longest Increasing Path in a Matrix",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "DFS",
      "Matrix",
      "Graph"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `m x n` integer `matrix`, return the length of the longest strictly increasing 4-directional path in `matrix`.",
    "examples": [
      {
        "input": "matrix = [[9, 9, 4], [6, 6, 8], [2, 1, 1]]",
        "output": "4",
        "explanation": "Path 1 -> 2 -> 6 -> 9 has length 4."
      },
      {
        "input": "matrix = [[3, 4, 5], [3, 2, 6], [2, 2, 1]]",
        "output": "4",
        "explanation": "Path 3 -> 4 -> 5 -> 6 has length 4."
      }
    ],
    "constraints": [
      "1 <= m, n <= 200"
    ],
    "starterCode": {
      "python": "def longest_increasing_path(matrix: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestIncreasingPath(matrix) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestIncreasingPath(int[][] matrix) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestIncreasingPath(vector<vector<int>>& matrix) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "matrix = [[9, 9, 4], [6, 6, 8], [2, 1, 1]]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "matrix = [[3, 4, 5], [3, 2, 6], [2, 2, 1]]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "min-cost-to-cut-a-stick",
    "title": "Minimum Cost to Cut a Stick",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "Interval DP"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a wooden stick of length `n` and an array `cuts` of integer cut positions, the cost of making a cut is the current length of the stick being cut. Return the minimum total cost to perform all cuts in any order.",
    "examples": [
      {
        "input": "n = 7, cuts = [1, 3, 4, 5]",
        "output": "16",
        "explanation": "Cut at 3 (7), 5 (4), 1 (3), 4 (2) -> 16."
      },
      {
        "input": "n = 9, cuts = [5, 6, 1, 4, 2]",
        "output": "22",
        "explanation": "Optimal order costs 22."
      }
    ],
    "constraints": [
      "2 <= n <= 10^6",
      "1 <= cuts.length <= 100"
    ],
    "starterCode": {
      "python": "def min_cut_cost(n: int, cuts: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minCutCost(n, cuts) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minCutCost(int n, int[] cuts) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minCutCost(int n, vector<int>& cuts) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 7, cuts = [1, 3, 4, 5]",
        "expected": "16",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 9, cuts = [5, 6, 1, 4, 2]",
        "expected": "22",
        "isHidden": false
      }
    ]
  },
  {
    "id": "russian-doll-envelopes",
    "title": "Russian Doll Envelopes",
    "difficulty": "Hard",
    "topics": [
      "Binary Search",
      "Dynamic Programming",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given `envelopes[i] = [w_i, h_i]`, one envelope fits inside another iff both its width and height are strictly smaller (no rotation). Return the maximum number of envelopes you can nest.",
    "examples": [
      {
        "input": "envelopes = [[5, 4], [6, 4], [6, 7], [2, 3]]",
        "output": "3",
        "explanation": "[2,3] -> [5,4] -> [6,7]."
      },
      {
        "input": "envelopes = [[1, 1], [1, 1], [1, 1]]",
        "output": "1",
        "explanation": "Equal dimensions cannot nest."
      }
    ],
    "constraints": [
      "1 <= envelopes.length <= 10^5"
    ],
    "starterCode": {
      "python": "def max_envelopes(envelopes: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxEnvelopes(envelopes) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxEnvelopes(int[][] envelopes) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxEnvelopes(vector<vector<int>>& envelopes) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "envelopes = [[5, 4], [6, 4], [6, 7], [2, 3]]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "envelopes = [[1, 1], [1, 1], [1, 1]]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "wildcard-pattern-matching",
    "title": "Wildcard Matching (? and *)",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Greedy",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an input string `s` and a wildcard pattern `p` where `'?'` matches any single character and `'*'` matches any sequence of characters (including empty), return `true` if `p` matches the entire string `s`.",
    "examples": [
      {
        "input": "s = \"adceb\", p = \"*a*b\"",
        "output": "true",
        "explanation": "First '*' matches empty, second '*' matches \"dce\"."
      },
      {
        "input": "s = \"cb\", p = \"?a\"",
        "output": "false",
        "explanation": "'b' != 'a'."
      }
    ],
    "constraints": [
      "0 <= s.length, p.length <= 2000"
    ],
    "starterCode": {
      "python": "def is_wildcard_match(s: str, p: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isWildcardMatch(s, p) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isWildcardMatch(String s, String p) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isWildcardMatch(string s, string p) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"adceb\", p = \"*a*b\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"cb\", p = \"?a\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "dungeon-game-min-hp",
    "title": "Dungeon Game (Minimum Initial Health)",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A knight moves only right or down from `(0, 0)` to `(m - 1, n - 1)` in an `m x n` grid `dungeon` (negative = damage, positive = healing). Health must stay `>= 1` at every room. Return the minimum positive initial health required.",
    "examples": [
      {
        "input": "dungeon = [[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]",
        "output": "7",
        "explanation": "Path R->R->D->D needs initial health 7."
      },
      {
        "input": "dungeon = [[0]]",
        "output": "1",
        "explanation": "Must start with at least 1 HP."
      }
    ],
    "constraints": [
      "1 <= m, n <= 200"
    ],
    "starterCode": {
      "python": "def calculate_min_hp(dungeon: list[list[int]]) -> int:\n    # Write your solution here\n    return 1\n",
      "javascript": "function calculateMinHp(dungeon) {\n  // Write your solution here\n  return 1;\n}\n",
      "java": "class Solution {\n    public int calculateMinHp(int[][] dungeon) {\n        // Write your solution here\n        return 1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int calculateMinHp(vector<vector<int>>& dungeon) {\n        // Write your solution here\n        return 1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "dungeon = [[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "dungeon = [[0]]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "best-time-stock-k-transactions",
    "title": "Best Time to Buy and Sell Stock IV (At Most K Trades)",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer `k` and daily stock `prices`, return the maximum profit achievable with at most `k` buy-sell transactions (you may hold at most one share at a time).",
    "examples": [
      {
        "input": "k = 2, prices = [3, 2, 6, 5, 0, 3]",
        "output": "7",
        "explanation": "Buy 2 sell 6 (+4), buy 0 sell 3 (+3) -> 7."
      },
      {
        "input": "k = 2, prices = [2, 4, 1]",
        "output": "2",
        "explanation": "Buy 2 sell 4 (+2)."
      }
    ],
    "constraints": [
      "0 <= k <= 100",
      "0 <= prices.length <= 1000"
    ],
    "starterCode": {
      "python": "def max_profit_k_trades(k: int, prices: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxProfitKTrades(k, prices) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxProfitKTrades(int k, int[] prices) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProfitKTrades(int k, vector<int>& prices) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "k = 2, prices = [3, 2, 6, 5, 0, 3]",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "k = 2, prices = [2, 4, 1]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "max-profit-job-scheduling",
    "title": "Maximum Profit in Job Scheduling",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "Binary Search",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given `start_time`, `end_time`, and `profit` arrays for `n` jobs, return the maximum profit from any subset of non-overlapping jobs (a job ending at time `X` allows another to start at time `X`).",
    "examples": [
      {
        "input": "start_time = [1, 2, 3, 3], end_time = [3, 4, 5, 6], profit = [50, 10, 40, 70]",
        "output": "120",
        "explanation": "Pick job 0 (50) and job 3 (70) -> 120."
      },
      {
        "input": "start_time = [1, 2, 3, 4, 6], end_time = [3, 5, 10, 6, 9], profit = [20, 20, 100, 70, 60]",
        "output": "150",
        "explanation": "Pick jobs 0 (20), 3 (70), 4 (60) -> 150."
      }
    ],
    "constraints": [
      "1 <= n <= 5 * 10^4"
    ],
    "starterCode": {
      "python": "def job_scheduling(start_time: list[int], end_time: list[int], profit: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function jobScheduling(startTime, endTime, profit) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "start_time = [1, 2, 3, 3], end_time = [3, 4, 5, 6], profit = [50, 10, 40, 70]",
        "expected": "120",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "start_time = [1, 2, 3, 4, 6], end_time = [3, 5, 10, 6, 9], profit = [20, 20, 100, 70, 60]",
        "expected": "150",
        "isHidden": false
      }
    ]
  },
  {
    "id": "min-insertions-make-palindrome",
    "title": "Minimum Insertion Steps to Make a String Palindrome",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a string `s`, return the minimum number of character insertions at any positions needed to turn `s` into a palindrome.",
    "examples": [
      {
        "input": "s = \"mbadm\"",
        "output": "2",
        "explanation": "Insert 'b' and 'd' -> \"mbdadbm\"."
      },
      {
        "input": "s = \"codebase\"",
        "output": "5",
        "explanation": "Requires 5 insertions."
      }
    ],
    "constraints": [
      "1 <= s.length <= 500"
    ],
    "starterCode": {
      "python": "def min_insertions_palindrome(s: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minInsertionsPalindrome(s) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minInsertionsPalindrome(String s) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minInsertionsPalindrome(string s) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = \"mbadm\"",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = \"codebase\"",
        "expected": "5",
        "isHidden": false
      }
    ]
  },
  {
    "id": "town-judge-finder",
    "title": "Find the Town Judge",
    "difficulty": "Easy",
    "topics": [
      "Graphs",
      "Arrays",
      "Counting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "In a town of `n` people labeled from `1` to `n`, there is a rumor that one person is secretly the town judge. If the town judge exists, then: (1) the town judge trusts nobody, and (2) everybody else (all `n - 1` other people) trusts the town judge. You are given `n` and an array `trust` where `trust[i] = [a, b]` means person `a` trusts person `b`. Return the label of the town judge if one exists and can be uniquely identified, or `-1` otherwise.",
    "examples": [
      {
        "input": "n = 2, trust = [[1, 2]]",
        "output": "2",
        "explanation": "Person 1 trusts person 2, and person 2 trusts nobody."
      },
      {
        "input": "n = 3, trust = [[1, 3], [2, 3], [3, 1]]",
        "output": "-1",
        "explanation": "Person 3 trusts person 1, so no one satisfies both conditions."
      }
    ],
    "constraints": [
      "1 <= n <= 1000",
      "0 <= trust.length <= 10^4",
      "trust[i].length == 2",
      "All pairs in trust are unique and a != b"
    ],
    "starterCode": {
      "python": "def findJudge(n: int, trust: list[list[int]]) -> int:\n    pass\n",
      "javascript": "function findJudge(n, trust) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int findJudge(int n, int[][] trust) {\n        return -1;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findJudge(int n, vector<vector<int>>& trust) {\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 2, trust = [[1, 2]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 3, trust = [[1, 3], [2, 3], [3, 1]]",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "graph-path-existence",
    "title": "Check If Path Exists in Graph",
    "difficulty": "Easy",
    "topics": [
      "Graphs",
      "BFS",
      "DFS",
      "Union Find"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an undirected graph with `n` vertices labeled from `0` to `n - 1`, represented by an edge list `edges` where `edges[i] = [u, v]` denotes a bidirectional edge between `u` and `v`. Determine whether there is a valid path from `source` to `destination`.",
    "examples": [
      {
        "input": "n = 3, edges = [[0, 1], [1, 2], [2, 0]], source = 0, destination = 2",
        "output": "true",
        "explanation": "There are two paths from 0 to 2: 0 -> 2 and 0 -> 1 -> 2."
      },
      {
        "input": "n = 6, edges = [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], source = 0, destination = 5",
        "output": "false",
        "explanation": "Vertices 0 and 5 are in disconnected components."
      }
    ],
    "constraints": [
      "1 <= n <= 2 * 10^5",
      "0 <= edges.length <= 2 * 10^5",
      "0 <= source, destination < n"
    ],
    "starterCode": {
      "python": "def validPath(n: int, edges: list[list[int]], source: int, destination: int) -> bool:\n    pass\n",
      "javascript": "function validPath(n, edges, source, destination) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public boolean validPath(int n, int[][] edges, int source, int destination) {\n        return false;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool validPath(int n, vector<vector<int>>& edges, int source, int destination) {\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 3, edges = [[0, 1], [1, 2], [2, 0]], source = 0, destination = 2",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 6, edges = [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], source = 0, destination = 5",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "valid-mountain-peak",
    "title": "Valid Mountain Array",
    "difficulty": "Easy",
    "topics": [
      "Arrays",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of integers `arr`, return `true` if and only if it is a valid mountain array. An array is a mountain array if `arr.length >= 3` and there exists some index `i` with `0 < i < arr.length - 1` such that `arr[0] < arr[1] < ... < arr[i]` and `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`.",
    "examples": [
      {
        "input": "arr = [0, 3, 2, 1]",
        "output": "true",
        "explanation": "Strictly increases up to 3, then strictly decreases to 1."
      },
      {
        "input": "arr = [3, 5, 5]",
        "output": "false",
        "explanation": "Adjacent equal values violate strict monotonicity."
      }
    ],
    "constraints": [
      "1 <= arr.length <= 10^4",
      "0 <= arr[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def validMountainArray(arr: list[int]) -> bool:\n    pass\n",
      "javascript": "function validMountainArray(arr) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public boolean validMountainArray(int[] arr) {\n        return false;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool validMountainArray(vector<int>& arr) {\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "arr = [0, 3, 2, 1]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "arr = [3, 5, 5]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "monotonic-sequence-check",
    "title": "Monotonic Array",
    "difficulty": "Easy",
    "topics": [
      "Arrays"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An array is monotonic if it is either monotone non-decreasing (`nums[i] <= nums[j]` for all `i <= j`) or monotone non-increasing (`nums[i] >= nums[j]` for all `i <= j`). Given an integer array `nums`, return `true` if the given array is monotonic, or `false` otherwise.",
    "examples": [
      {
        "input": "nums = [1, 2, 2, 3]",
        "output": "true",
        "explanation": "Every element is less than or equal to the next."
      },
      {
        "input": "nums = [1, 3, 2]",
        "output": "false",
        "explanation": "It increases from 1 to 3 and then decreases to 2."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "starterCode": {
      "python": "def isMonotonic(nums: list[int]) -> bool:\n    pass\n",
      "javascript": "function isMonotonic(nums) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public boolean isMonotonic(int[] nums) {\n        return false;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isMonotonic(vector<int>& nums) {\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 2, 2, 3]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 3, 2]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "combination-lock-bfs",
    "title": "Open the Combination Lock",
    "difficulty": "Medium",
    "topics": [
      "Graphs",
      "BFS",
      "Strings",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A digital vault lock has 4 circular wheels, each displaying digits `'0'` through `'9'`. Each wheel can rotate one slot forward or backward, wrapping around between `'9'` and `'0'`. The lock starts at `'0000'`. You are given a list of `deadends`—if the lock displays any deadend code, its wheels freeze permanently—and a `target` code. Return the minimum number of turns required to reach `target`, or `-1` if it is impossible.",
    "examples": [
      {
        "input": "deadends = ['0201', '0101', '0102', '1212', '2002'], target = '0202'",
        "output": "6",
        "explanation": "One shortest sequence is 0000 -> 1000 -> 1100 -> 1200 -> 1201 -> 1202 -> 0202."
      },
      {
        "input": "deadends = ['8888'], target = '0009'",
        "output": "1",
        "explanation": "Rotate the last wheel backward once from '0' to '9'."
      }
    ],
    "constraints": [
      "1 <= deadends.length <= 500",
      "deadends[i].length == 4",
      "target.length == 4"
    ],
    "starterCode": {
      "python": "def openLock(deadends: list[str], target: str) -> int:\n    pass\n",
      "javascript": "function openLock(deadends, target) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int openLock(String[] deadends, String target) {\n        return -1;\n    }\n}\n",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int openLock(vector<string>& deadends, string target) {\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "deadends = ['0201', '0101', '0102', '1212', '2002'], target = '0202'",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "deadends = ['8888'], target = '0009'",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "genetic-mutation-steps",
    "title": "Minimum Genetic Mutation",
    "difficulty": "Medium",
    "topics": [
      "Graphs",
      "BFS",
      "Strings",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A gene string is represented by an 8-character string consisting of `'A'`, `'C'`, `'G'`, and `'T'`. A single mutation changes exactly one character in the gene string. Given `startGene`, `endGene`, and a list of valid intermediate gene strings `bank`, return the minimum number of mutations needed to transform `startGene` into `endGene` such that every intermediate gene is in `bank`. Return `-1` if no such sequence exists.",
    "examples": [
      {
        "input": "startGene = 'AACCGGTT', endGene = 'AACCGGTA', bank = ['AACCGGTA']",
        "output": "1",
        "explanation": "One mutation at the last position reaches endGene."
      },
      {
        "input": "startGene = 'AACCGGTT', endGene = 'AAACGGTA', bank = ['AACCGGTA', 'AACCGCTA', 'AAACGGTA']",
        "output": "2",
        "explanation": "AACCGGTT -> AACCGGTA -> AAACGGTA."
      }
    ],
    "constraints": [
      "startGene.length == endGene.length == 8",
      "0 <= bank.length <= 10",
      "All strings consist only of 'A', 'C', 'G', 'T'"
    ],
    "starterCode": {
      "python": "def minMutation(startGene: str, endGene: str, bank: list[str]) -> int:\n    pass\n",
      "javascript": "function minMutation(startGene, endGene, bank) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int minMutation(String startGene, String endGene, String[] bank) {\n        return -1;\n    }\n}\n",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minMutation(string startGene, string endGene, vector<string>& bank) {\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "startGene = 'AACCGGTT', endGene = 'AACCGGTA', bank = ['AACCGGTA']",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "startGene = 'AACCGGTT', endGene = 'AAACGGTA', bank = ['AACCGGTA', 'AACCGCTA', 'AAACGGTA']",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "employee-inform-time",
    "title": "Time Needed to Inform All Employees",
    "difficulty": "Medium",
    "topics": [
      "Trees",
      "Graphs",
      "DFS",
      "BFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A company has `n` employees with unique IDs from `0` to `n - 1`. The company head has ID `headID`. Each employee `i` has one direct manager given by `manager[i]` (with `manager[headID] == -1`). When the head announces urgent news, employee `i` needs `informTime[i]` minutes to notify all of their direct subordinates simultaneously. Return the total number of minutes needed for every employee in the company to receive the news.",
    "examples": [
      {
        "input": "n = 1, headID = 0, manager = [-1], informTime = [0]",
        "output": "0",
        "explanation": "The head is the only employee, so 0 minutes are needed."
      },
      {
        "input": "n = 6, headID = 2, manager = [2, 2, -1, 2, 2, 2], informTime = [0, 0, 1, 0, 0, 0]",
        "output": "1",
        "explanation": "Employee 2 informs all 5 direct reports in 1 minute."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "0 <= headID < n",
      "manager.length == informTime.length == n",
      "0 <= informTime[i] <= 1000"
    ],
    "starterCode": {
      "python": "def numOfMinutes(n: int, headID: int, manager: list[int], informTime: list[int]) -> int:\n    pass\n",
      "javascript": "function numOfMinutes(n, headID, manager, informTime) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int numOfMinutes(int n, int headID, int[] manager, int[] informTime) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 1, headID = 0, manager = [-1], informTime = [0]",
        "expected": "0",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 6, headID = 2, manager = [2, 2, -1, 2, 2, 2], informTime = [0, 0, 1, 0, 0, 0]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "min-effort-grid-path",
    "title": "Path With Minimum Effort",
    "difficulty": "Medium",
    "topics": [
      "Graphs",
      "Dijkstra",
      "Heap",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are hiking across a 2D terrain grid `heights` of size `rows x cols`, where `heights[r][c]` is the elevation at cell `(r, c)`. Starting at `(0, 0)`, you want to reach `(rows - 1, cols - 1)` by moving up, down, left, or right. A route's effort is the maximum absolute elevation difference between any two consecutive cells along the route. Return the minimum effort required to travel from the top-left cell to the bottom-right cell.",
    "examples": [
      {
        "input": "heights = [[1, 2, 2], [3, 8, 2], [5, 3, 5]]",
        "output": "2",
        "explanation": "The route [1, 3, 5, 3, 5] has a maximum adjacent elevation jump of 2."
      },
      {
        "input": "heights = [[1, 2, 3], [3, 8, 4], [5, 3, 5]]",
        "output": "1",
        "explanation": "The route [1, 2, 3, 4, 5] has a maximum step difference of 1."
      }
    ],
    "constraints": [
      "1 <= rows, cols <= 100",
      "1 <= heights[r][c] <= 10^6"
    ],
    "starterCode": {
      "python": "def minimumEffortPath(heights: list[list[int]]) -> int:\n    pass\n",
      "javascript": "function minimumEffortPath(heights) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int minimumEffortPath(int[][] heights) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minimumEffortPath(vector<vector<int>>& heights) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "heights = [[1, 2, 2], [3, 8, 2], [5, 3, 5]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "heights = [[1, 2, 3], [3, 8, 4], [5, 3, 5]]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "city-smallest-neighbors",
    "title": "Find the City With Smallest Neighbors at Threshold",
    "difficulty": "Medium",
    "topics": [
      "Graphs",
      "Shortest Path",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "There are `n` cities numbered from `0` to `n - 1`. Given an array `edges` where `edges[i] = [u, v, w]` represents a bidirectional weighted road between cities `u` and `v` of length `w`, and an integer `distanceThreshold`, return the city with the smallest number of other cities reachable through some path whose total distance is at most `distanceThreshold`. If multiple cities tie for the smallest count, return the city with the greatest number.",
    "examples": [
      {
        "input": "n = 4, edges = [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], distanceThreshold = 4",
        "output": "3",
        "explanation": "Cities 0 and 3 each reach 2 neighbors within distance 4; return the larger index 3."
      },
      {
        "input": "n = 5, edges = [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], distanceThreshold = 2",
        "output": "0",
        "explanation": "City 0 only reaches city 1 within distance 2."
      }
    ],
    "constraints": [
      "2 <= n <= 100",
      "1 <= edges.length <= n * (n - 1) / 2",
      "1 <= w, distanceThreshold <= 10^4"
    ],
    "starterCode": {
      "python": "def findTheCity(n: int, edges: list[list[int]], distanceThreshold: int) -> int:\n    pass\n",
      "javascript": "function findTheCity(n, edges, distanceThreshold) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int findTheCity(int n, int[][] edges, int distanceThreshold) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 4, edges = [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], distanceThreshold = 4",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 5, edges = [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], distanceThreshold = 2",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "minimum-height-trees-roots",
    "title": "Minimum Height Trees",
    "difficulty": "Medium",
    "topics": [
      "Graphs",
      "Topological Sort",
      "BFS",
      "Trees"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given an undirected tree of `n` nodes labeled from `0` to `n - 1` and its `n - 1` edges in `edges`, you can choose any node as the root. The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf. Return a list of all root labels that produce a tree of minimum possible height. You may return the answer in any order.",
    "examples": [
      {
        "input": "n = 4, edges = [[1, 0], [1, 2], [1, 3]]",
        "output": "[1]",
        "explanation": "Rooting at 1 yields height 1, whereas any other root yields height 2."
      },
      {
        "input": "n = 6, edges = [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]",
        "output": "[3, 4]",
        "explanation": "Rooting at either 3 or 4 produces the minimum height of 2."
      }
    ],
    "constraints": [
      "1 <= n <= 2 * 10^4",
      "edges.length == n - 1",
      "The input is guaranteed to be a tree"
    ],
    "starterCode": {
      "python": "def findMinHeightTrees(n: int, edges: list[list[int]]) -> list[int]:\n    pass\n",
      "javascript": "function findMinHeightTrees(n, edges) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<Integer> findMinHeightTrees(int n, int[][] edges) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 4, edges = [[1, 0], [1, 2], [1, 3]]",
        "expected": "[1]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 6, edges = [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]",
        "expected": "[3, 4]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "evaluate-division-queries",
    "title": "Evaluate Division Ratios",
    "difficulty": "Medium",
    "topics": [
      "Graphs",
      "DFS",
      "BFS",
      "Union Find"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an array of variable pairs `equations` and an array of real numbers `values`, where `equations[i] = [A_i, B_i]` and `values[i]` represent the equation `A_i / B_i = values[i]`. You are also given `queries` where `queries[j] = [C_j, D_j]` asks for the value of `C_j / D_j`. Return an array of answers rounded to 5 decimal places, using `-1.0` whenever a query cannot be determined.",
    "examples": [
      {
        "input": "equations = [['a', 'b'], ['b', 'c']], values = [2.0, 3.0], queries = [['a', 'c'], ['b', 'a'], ['a', 'e'], ['a', 'a'], ['x', 'x']]",
        "output": "[6.0, 0.5, -1.0, 1.0, -1.0]",
        "explanation": "a/c = 2*3 = 6.0, b/a = 0.5, e and x are unknown."
      },
      {
        "input": "equations = [['a', 'b']], values = [0.5], queries = [['a', 'b'], ['b', 'a'], ['a', 'c']]",
        "output": "[0.5, 2.0, -1.0]",
        "explanation": "Direct edge gives 0.5, reverse edge gives 2.0, and c is unknown."
      }
    ],
    "constraints": [
      "1 <= equations.length <= 20",
      "values[i] > 0.0",
      "1 <= queries.length <= 20",
      "No contradictions exist in the input"
    ],
    "starterCode": {
      "python": "def calcEquation(equations: list[list[str]], values: list[float], queries: list[list[str]]) -> list[float]:\n    pass\n",
      "javascript": "function calcEquation(equations, values, queries) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {\n        return new double[0];\n    }\n}\n",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "equations = [['a', 'b'], ['b', 'c']], values = [2.0, 3.0], queries = [['a', 'c'], ['b', 'a'], ['a', 'e'], ['a', 'a'], ['x', 'x']]",
        "expected": "[6.0, 0.5, -1.0, 1.0, -1.0]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "equations = [['a', 'b']], values = [0.5], queries = [['a', 'b'], ['b', 'a'], ['a', 'c']]",
        "expected": "[0.5, 2.0, -1.0]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "merge-user-accounts-dsu",
    "title": "Accounts Merge",
    "difficulty": "Medium",
    "topics": [
      "Graphs",
      "Union Find",
      "Hash Table",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given a list `accounts` where each element `accounts[i]` is a list of strings with the first element being a user's name and the remaining elements being emails belonging to that account, merge any two accounts that share at least one common email address. Note that two accounts with the same name may belong to different people if they share no emails. Return the merged accounts where each account starts with the user's name followed by their unique emails in sorted lexicographical order.",
    "examples": [
      {
        "input": "accounts = [['John', 'johnsmith@mail.com', 'john_newyork@mail.com'], ['John', 'johnsmith@mail.com', 'john00@mail.com'], ['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com']]",
        "output": "[['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'], ['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com']]",
        "explanation": "The first two John accounts share johnsmith@mail.com and are merged."
      },
      {
        "input": "accounts = [['Alex', 'a@x.com', 'b@x.com'], ['Alex', 'b@x.com', 'c@x.com']]",
        "output": "[['Alex', 'a@x.com', 'b@x.com', 'c@x.com']]",
        "explanation": "Both accounts share b@x.com."
      }
    ],
    "constraints": [
      "1 <= accounts.length <= 1000",
      "2 <= accounts[i].length <= 10",
      "1 <= accounts[i][j].length <= 30"
    ],
    "starterCode": {
      "python": "def accountsMerge(accounts: list[list[str]]) -> list[list[str]]:\n    pass\n",
      "javascript": "function accountsMerge(accounts) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<String>> accountsMerge(List<List<String>> accounts) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "accounts = [['John', 'johnsmith@mail.com', 'john_newyork@mail.com'], ['John', 'johnsmith@mail.com', 'john00@mail.com'], ['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com']]",
        "expected": "[['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'], ['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com']]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "accounts = [['Alex', 'a@x.com', 'b@x.com'], ['Alex', 'b@x.com', 'c@x.com']]",
        "expected": "[['Alex', 'a@x.com', 'b@x.com', 'c@x.com']]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "critical-network-bridges",
    "title": "Critical Connections in a Network",
    "difficulty": "Hard",
    "topics": [
      "Graphs",
      "DFS",
      "Tarjan"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "A data center has `n` servers numbered `0` to `n - 1` connected by undirected network cables given in `connections`, where `connections[i] = [u, v]`. A connection is critical (a bridge) if removing it disconnects some servers from reaching others. Return all critical connections in the network as `[min(u, v), max(u, v)]` pairs in any order.",
    "examples": [
      {
        "input": "n = 4, connections = [[0, 1], [1, 2], [2, 0], [1, 3]]",
        "output": "[[1, 3]]",
        "explanation": "Edges (0,1), (1,2), (2,0) form a cycle; only [1, 3] is a bridge."
      },
      {
        "input": "n = 2, connections = [[0, 1]]",
        "output": "[[0, 1]]",
        "explanation": "Removing [0, 1] disconnects server 0 from server 1."
      }
    ],
    "constraints": [
      "2 <= n <= 10^5",
      "n - 1 <= connections.length <= 10^5",
      "No self-loops or duplicate edges"
    ],
    "starterCode": {
      "python": "def criticalConnections(n: int, connections: list[list[int]]) -> list[list[int]]:\n    pass\n",
      "javascript": "function criticalConnections(n, connections) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 4, connections = [[0, 1], [1, 2], [2, 0], [1, 3]]",
        "expected": "[[1, 3]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 2, connections = [[0, 1]]",
        "expected": "[[0, 1]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "bus-routes-min-transfers",
    "title": "Bus Routes Minimum Transfers",
    "difficulty": "Hard",
    "topics": [
      "Graphs",
      "BFS",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an array `routes` representing city bus routes where `routes[i]` is the list of bus stops that bus `i` visits repeatedly in a loop. You start at bus stop `source` and want to reach bus stop `target`. You can board any bus at your current stop and transfer to another bus at any shared stop. Return the minimum number of buses you must take to travel from `source` to `target`, or `-1` if it is impossible.",
    "examples": [
      {
        "input": "routes = [[1, 2, 7], [3, 6, 7]], source = 1, target = 6",
        "output": "2",
        "explanation": "Take bus 0 to stop 7, then transfer to bus 1 to reach stop 6."
      },
      {
        "input": "routes = [[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]], source = 15, target = 12",
        "output": "-1",
        "explanation": "No sequence of bus transfers connects stop 15 to stop 12."
      }
    ],
    "constraints": [
      "1 <= routes.length <= 500",
      "1 <= routes[i].length <= 10^5",
      "Sum of routes[i].length <= 10^5",
      "0 <= source, target < 10^6"
    ],
    "starterCode": {
      "python": "def numBusesToDestination(routes: list[list[int]], source: int, target: int) -> int:\n    pass\n",
      "javascript": "function numBusesToDestination(routes, source, target) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int numBusesToDestination(int[][] routes, int source, int target) {\n        return -1;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numBusesToDestination(vector<vector<int>>& routes, int source, int target) {\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "routes = [[1, 2, 7], [3, 6, 7]], source = 1, target = 6",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "routes = [[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]], source = 15, target = 12",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "shortest-path-all-nodes",
    "title": "Shortest Path Visiting All Nodes",
    "difficulty": "Hard",
    "topics": [
      "Graphs",
      "BFS",
      "Bit Manipulation",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You have an undirected connected graph of `n` nodes labeled from `0` to `n - 1`, given as an adjacency list `graph` where `graph[i]` is a list of all nodes connected to node `i`. Return the length (number of edges) of the shortest path that visits every node at least once. You may start and stop at any node, and you may revisit nodes and reuse edges.",
    "examples": [
      {
        "input": "graph = [[1, 2, 3], [0], [0], [0]]",
        "output": "4",
        "explanation": "One shortest path is 1 -> 0 -> 2 -> 0 -> 3 (4 edges)."
      },
      {
        "input": "graph = [[1], [0, 2, 4], [1, 3, 4], [2], [1, 2]]",
        "output": "4",
        "explanation": "One shortest path is 0 -> 1 -> 4 -> 2 -> 3 (4 edges)."
      }
    ],
    "constraints": [
      "1 <= graph.length <= 12",
      "The graph is connected and undirected"
    ],
    "starterCode": {
      "python": "def shortestPathLength(graph: list[list[int]]) -> int:\n    pass\n",
      "javascript": "function shortestPathLength(graph) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int shortestPathLength(int[][] graph) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestPathLength(vector<vector<int>>& graph) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "graph = [[1, 2, 3], [0], [0], [0]]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "graph = [[1], [0, 2, 4], [1, 3, 4], [2], [1, 2]]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "min-cost-valid-grid-path",
    "title": "Minimum Cost to Make at Least One Valid Path",
    "difficulty": "Hard",
    "topics": [
      "Graphs",
      "BFS",
      "Shortest Path",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an `m x n` grid where each cell contains an arrow sign: `1` points right, `2` points left, `3` points down, and `4` points up. Starting at `(0, 0)`, following a cell's existing arrow costs `0`, while modifying a cell's arrow to point in any of the other 3 directions costs `1`. Return the minimum total cost to ensure there is at least one valid path from `(0, 0)` to `(m - 1, n - 1)`.",
    "examples": [
      {
        "input": "grid = [[1, 1, 1, 1], [2, 2, 2, 2], [1, 1, 1, 1], [2, 2, 2, 2]]",
        "output": "3",
        "explanation": "Change three arrows at row ends to snake down to (3, 3)."
      },
      {
        "input": "grid = [[1, 1, 3], [3, 2, 2], [1, 1, 4]]",
        "output": "0",
        "explanation": "Following the existing arrows already reaches (2, 2) with cost 0."
      }
    ],
    "constraints": [
      "1 <= m, n <= 100",
      "grid[r][c] is in {1, 2, 3, 4}"
    ],
    "starterCode": {
      "python": "def minCost(grid: list[list[int]]) -> int:\n    pass\n",
      "javascript": "function minCost(grid) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int minCost(int[][] grid) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minCost(vector<vector<int>>& grid) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "grid = [[1, 1, 1, 1], [2, 2, 2, 2], [1, 1, 1, 1], [2, 2, 2, 2]]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "grid = [[1, 1, 3], [3, 2, 2], [1, 1, 4]]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "reconstruct-flight-itinerary",
    "title": "Reconstruct Flight Itinerary",
    "difficulty": "Hard",
    "topics": [
      "Graphs",
      "DFS",
      "Eulerian Path",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given a list of airline `tickets` where `tickets[i] = [from_i, to_i]` represents a one-way flight. Reconstruct the itinerary in order and return it. All itineraries start at `'JFK'` and must use every ticket exactly once. If multiple valid itineraries exist, return the one that has the smallest lexicographical order when read as a single list of airport codes.",
    "examples": [
      {
        "input": "tickets = [['MUC', 'LHR'], ['JFK', 'MUC'], ['SFO', 'SJC'], ['LHR', 'SFO']]",
        "output": "['JFK', 'MUC', 'LHR', 'SFO', 'SJC']",
        "explanation": "There is a single valid path using all four tickets."
      },
      {
        "input": "tickets = [['JFK', 'SFO'], ['JFK', 'ATL'], ['SFO', 'ATL'], ['ATL', 'JFK'], ['ATL', 'SFO']]",
        "output": "['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO']",
        "explanation": "Choosing ATL before SFO yields the lexicographically smallest itinerary."
      }
    ],
    "constraints": [
      "1 <= tickets.length <= 300",
      "Airport codes consist of 3 uppercase English letters",
      "At least one valid itinerary exists"
    ],
    "starterCode": {
      "python": "def findItinerary(tickets: list[list[str]]) -> list[str]:\n    pass\n",
      "javascript": "function findItinerary(tickets) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<String> findItinerary(List<List<String>> tickets) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> findItinerary(vector<vector<string>>& tickets) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tickets = [['MUC', 'LHR'], ['JFK', 'MUC'], ['SFO', 'SJC'], ['LHR', 'SFO']]",
        "expected": "['JFK', 'MUC', 'LHR', 'SFO', 'SJC']",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tickets = [['JFK', 'SFO'], ['JFK', 'ATL'], ['SFO', 'ATL'], ['ATL', 'JFK'], ['ATL', 'SFO']]",
        "expected": "['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO']",
        "isHidden": false
      }
    ]
  },
  {
    "id": "making-a-large-island",
    "title": "Making a Large Island",
    "difficulty": "Hard",
    "topics": [
      "Graphs",
      "DFS",
      "BFS",
      "Matrix",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an `n x n` binary matrix `grid` where `1` represents land and `0` represents water. You are allowed to change at most one `0` cell into a `1`. Return the size of the largest 4-directionally connected island of `1`s after performing at most one such change.",
    "examples": [
      {
        "input": "grid = [[1, 0], [0, 1]]",
        "output": "3",
        "explanation": "Flipping either 0 connects the two 1s into an island of size 3."
      },
      {
        "input": "grid = [[1, 1], [1, 1]]",
        "output": "4",
        "explanation": "All cells are already land, so the largest island has size 4."
      }
    ],
    "constraints": [
      "1 <= n <= 500",
      "grid[r][c] is 0 or 1"
    ],
    "starterCode": {
      "python": "def largestIsland(grid: list[list[int]]) -> int:\n    pass\n",
      "javascript": "function largestIsland(grid) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int largestIsland(int[][] grid) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int largestIsland(vector<vector<int>>& grid) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "grid = [[1, 0], [0, 1]]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "grid = [[1, 1], [1, 1]]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "parallel-courses-iii-time",
    "title": "Parallel Courses III",
    "difficulty": "Hard",
    "topics": [
      "Graphs",
      "Topological Sort",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given `n` courses labeled from `1` to `n`, an array `relations` where `relations[j] = [prevCourse, nextCourse]` indicates that `prevCourse` must be completed before `nextCourse` can start, and an array `time` where `time[i]` is the number of months required to complete course `i + 1`. You may take any number of courses simultaneously as long as their prerequisites are finished. Return the minimum number of months required to complete all `n` courses.",
    "examples": [
      {
        "input": "n = 3, relations = [[1, 3], [2, 3]], time = [3, 2, 5]",
        "output": "8",
        "explanation": "Take courses 1 (3 months) and 2 (2 months) in parallel; after 3 months start course 3 (5 months) for a total of 8 months."
      },
      {
        "input": "n = 5, relations = [[1, 5], [2, 5], [3, 5], [3, 4], [4, 5]], time = [1, 2, 3, 4, 5]",
        "output": "12",
        "explanation": "Longest prerequisite chain is 3 -> 4 -> 5 with total duration 3 + 4 + 5 = 12."
      }
    ],
    "constraints": [
      "1 <= n <= 5 * 10^4",
      "0 <= relations.length <= min(n * (n - 1) / 2, 5 * 10^4)",
      "The prerequisite graph is a DAG"
    ],
    "starterCode": {
      "python": "def minimumTime(n: int, relations: list[list[int]], time: list[int]) -> int:\n    pass\n",
      "javascript": "function minimumTime(n, relations, time) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int minimumTime(int n, int[][] relations, int[] time) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minimumTime(int n, vector<vector<int>>& relations, vector<int>& time) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 3, relations = [[1, 3], [2, 3]], time = [3, 2, 5]",
        "expected": "8",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 5, relations = [[1, 5], [2, 5], [3, 5], [3, 4], [4, 5]], time = [1, 2, 3, 4, 5]",
        "expected": "12",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ways-to-arrive-destination",
    "title": "Number of Ways to Arrive at Destination",
    "difficulty": "Hard",
    "topics": [
      "Graphs",
      "Dijkstra",
      "Dynamic Programming",
      "Heap"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are navigating a city with `n` intersections numbered `0` to `n - 1` connected by bidirectional roads given in `roads`, where `roads[i] = [u, v, t]` indicates a road taking `t` minutes to traverse. Return the number of distinct shortest-time paths from intersection `0` to intersection `n - 1`, modulo `10^9 + 7`.",
    "examples": [
      {
        "input": "n = 7, roads = [[0, 6, 7], [0, 1, 2], [1, 2, 3], [1, 3, 3], [6, 3, 3], [3, 5, 1], [6, 5, 1], [2, 5, 1], [0, 4, 5], [4, 6, 2]]",
        "output": "4",
        "explanation": "The shortest travel time from 0 to 6 is 7 minutes, achievable via 4 distinct paths."
      },
      {
        "input": "n = 2, roads = [[1, 0, 10]]",
        "output": "1",
        "explanation": "There is only one road connecting 0 and 1."
      }
    ],
    "constraints": [
      "1 <= n <= 200",
      "n - 1 <= roads.length <= n * (n - 1) / 2",
      "1 <= t <= 10^9"
    ],
    "starterCode": {
      "python": "def countPaths(n: int, roads: list[list[int]]) -> int:\n    pass\n",
      "javascript": "function countPaths(n, roads) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int countPaths(int n, int[][] roads) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countPaths(int n, vector<vector<int>>& roads) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 7, roads = [[0, 6, 7], [0, 1, 2], [1, 2, 3], [1, 3, 3], [6, 3, 3], [3, 5, 1], [6, 5, 1], [2, 5, 1], [0, 4, 5], [4, 6, 2]]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 2, roads = [[1, 0, 10]]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "bst-range-sum-query",
    "title": "Range Sum of BST",
    "difficulty": "Easy",
    "topics": [
      "Trees",
      "Binary Search Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given the `root` of a Binary Search Tree (serialized as a level-order list with `null` for missing nodes) and two integers `low` and `high`, return the sum of values of all nodes with a value in the inclusive range `[low, high]`.",
    "examples": [
      {
        "input": "root = [10, 5, 15, 3, 7, null, 18], low = 7, high = 15",
        "output": "32",
        "explanation": "Nodes 7, 10, and 15 fall within [7, 15], summing to 32."
      },
      {
        "input": "root = [10, 5, 15, 3, 7, 13, 18, 1, null, 6], low = 6, high = 10",
        "output": "23",
        "explanation": "Nodes 6, 7, and 10 fall within [6, 10], summing to 23."
      }
    ],
    "constraints": [
      "1 <= number of nodes <= 2 * 10^4",
      "1 <= Node.val <= 10^5",
      "1 <= low <= high <= 10^5",
      "All node values are unique"
    ],
    "starterCode": {
      "python": "def rangeSumBST(root: list[int | None], low: int, high: int) -> int:\n    pass\n",
      "javascript": "function rangeSumBST(root, low, high) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int rangeSumBST(Integer[] root, int low, int high) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\n#include <optional>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rangeSumBST(vector<optional<int>>& root, int low, int high) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "root = [10, 5, 15, 3, 7, null, 18], low = 7, high = 15",
        "expected": "32",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "root = [10, 5, 15, 3, 7, 13, 18, 1, null, 6], low = 6, high = 10",
        "expected": "23",
        "isHidden": false
      }
    ]
  },
  {
    "id": "bst-min-absolute-diff",
    "title": "Minimum Absolute Difference in BST",
    "difficulty": "Easy",
    "topics": [
      "Trees",
      "Binary Search Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given the `root` of a Binary Search Tree (serialized as a level-order list with `null` for missing nodes), return the minimum absolute difference between the values of any two distinct nodes in the tree.",
    "examples": [
      {
        "input": "root = [4, 2, 6, 1, 3]",
        "output": "1",
        "explanation": "Sorted values are [1, 2, 3, 4, 6]; the minimum difference between adjacent values is 1."
      },
      {
        "input": "root = [1, 0, 48, null, null, 12, 49]",
        "output": "1",
        "explanation": "Nodes 0 and 1 (and 48 and 49) differ by 1."
      }
    ],
    "constraints": [
      "2 <= number of nodes <= 10^4",
      "0 <= Node.val <= 10^5"
    ],
    "starterCode": {
      "python": "def getMinimumDifference(root: list[int | None]) -> int:\n    pass\n",
      "javascript": "function getMinimumDifference(root) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int getMinimumDifference(Integer[] root) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\n#include <optional>\nusing namespace std;\n\nclass Solution {\npublic:\n    int getMinimumDifference(vector<optional<int>>& root) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "root = [4, 2, 6, 1, 3]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "root = [1, 0, 48, null, null, 12, 49]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "baseball-score-tracker",
    "title": "Baseball Game Score Tracker",
    "difficulty": "Easy",
    "topics": [
      "Stack",
      "Simulation",
      "Arrays"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are keeping score for a game with special rules. Given a list of strings `operations` where each operation is one of: an integer `x` (record a new score of `x`), `'+'` (record a new score equal to the sum of the previous two scores), `'D'` (record a new score equal to double the previous score), or `'C'` (invalidate and remove the previous score), return the sum of all valid scores remaining on the record.",
    "examples": [
      {
        "input": "operations = ['5', '2', 'C', 'D', '+']",
        "output": "30",
        "explanation": "Record becomes [5, 10, 15], whose sum is 30."
      },
      {
        "input": "operations = ['5', '-2', '4', 'C', 'D', '9', '+', '+']",
        "output": "27",
        "explanation": "Record becomes [5, -2, -4, 9, 5, 14], summing to 27."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 1000",
      "All operations are valid with enough prior scores on the stack"
    ],
    "starterCode": {
      "python": "def calPoints(operations: list[str]) -> int:\n    pass\n",
      "javascript": "function calPoints(operations) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int calPoints(String[] operations) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int calPoints(vector<string>& operations) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "operations = ['5', '2', 'C', 'D', '+']",
        "expected": "30",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "operations = ['5', '-2', '4', 'C', 'D', '9', '+', '+']",
        "expected": "27",
        "isHidden": false
      }
    ]
  },
  {
    "id": "strip-outer-parentheses",
    "title": "Remove Outermost Parentheses",
    "difficulty": "Easy",
    "topics": [
      "Strings",
      "Stack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A valid parentheses string `s` can be decomposed into primitive valid parentheses substrings `s = P_1 + P_2 + ... + P_k`, where each `P_i` is nonempty and cannot be split into two nonempty valid parentheses strings. Remove the outermost `'('` and `')'` of every primitive substring in `s` and return the resulting string.",
    "examples": [
      {
        "input": "s = '(()())(())'",
        "output": "'()()()'",
        "explanation": "Primitive decomposition is '(()())' + '(())'. Stripping outer pairs gives '()()' + '()'."
      },
      {
        "input": "s = '()()'",
        "output": "''",
        "explanation": "Each primitive '()' becomes empty."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s is a valid parentheses string"
    ],
    "starterCode": {
      "python": "def removeOuterParentheses(s: str) -> str:\n    pass\n",
      "javascript": "function removeOuterParentheses(s) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public String removeOuterParentheses(String s) {\n        return \"\";\n    }\n}\n",
      "cpp": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string removeOuterParentheses(string s) {\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = '(()())(())'",
        "expected": "'()()()'",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = '()()'",
        "expected": "''",
        "isHidden": false
      }
    ]
  },
  {
    "id": "house-robber-tree-dp",
    "title": "House Robber III",
    "difficulty": "Medium",
    "topics": [
      "Trees",
      "Dynamic Programming",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Houses in a neighborhood are arranged in a binary tree (serialized as a level-order list `root` with `null` for missing nodes). Each node's value is the amount of money stored in that house. If two directly linked houses (a parent and its child) are robbed on the same night, an alarm triggers. Return the maximum amount of money you can rob without triggering the alarm.",
    "examples": [
      {
        "input": "root = [3, 2, 3, null, 3, null, 1]",
        "output": "7",
        "explanation": "Robbing 3 + 3 + 1 = 7 gives the maximum total."
      },
      {
        "input": "root = [3, 4, 5, 1, 3, null, 1]",
        "output": "9",
        "explanation": "Robbing 4 + 5 = 9 beats robbing the root and leaves."
      }
    ],
    "constraints": [
      "1 <= number of nodes <= 10^4",
      "0 <= Node.val <= 10^4"
    ],
    "starterCode": {
      "python": "def rob(root: list[int | None]) -> int:\n    pass\n",
      "javascript": "function rob(root) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int rob(Integer[] root) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\n#include <optional>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<optional<int>>& root) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "root = [3, 2, 3, null, 3, null, 1]",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "root = [3, 4, 5, 1, 3, null, 1]",
        "expected": "9",
        "isHidden": false
      }
    ]
  },
  {
    "id": "binary-tree-path-sum-iii",
    "title": "Path Sum III",
    "difficulty": "Medium",
    "topics": [
      "Trees",
      "DFS",
      "Prefix Sum",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given the `root` of a binary tree (serialized as a level-order list with `null` for missing nodes) and an integer `targetSum`, return the number of downward paths where the sum of node values along the path equals `targetSum`. A path does not need to start at the root or end at a leaf, but it must travel strictly downward from parent to child.",
    "examples": [
      {
        "input": "root = [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], targetSum = 8",
        "output": "3",
        "explanation": "Paths summing to 8 are [5, 3], [5, 2, 1], and [-3, 11]."
      },
      {
        "input": "root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], targetSum = 22",
        "output": "3",
        "explanation": "There are 3 downward paths summing to 22."
      }
    ],
    "constraints": [
      "0 <= number of nodes <= 1000",
      "-10^9 <= Node.val <= 10^9",
      "-1000 <= targetSum <= 1000"
    ],
    "starterCode": {
      "python": "def pathSum(root: list[int | None], targetSum: int) -> int:\n    pass\n",
      "javascript": "function pathSum(root, targetSum) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int pathSum(Integer[] root, int targetSum) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\n#include <optional>\nusing namespace std;\n\nclass Solution {\npublic:\n    int pathSum(vector<optional<int>>& root, int targetSum) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "root = [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], targetSum = 8",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], targetSum = 22",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "bst-delete-key-node",
    "title": "Delete Node in a BST",
    "difficulty": "Medium",
    "topics": [
      "Trees",
      "Binary Search Tree"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given the `root` of a Binary Search Tree (serialized as a trimmed level-order list with `null` for missing nodes) and an integer `key`, delete the node with value `key` if it exists while preserving the BST property. When deleting a node with two children, replace its value with its in-order successor (the minimum node in its right subtree) and delete that successor. Return the resulting BST serialized as a trimmed level-order list.",
    "examples": [
      {
        "input": "root = [5, 3, 6, 2, 4, null, 7], key = 3",
        "output": "[5, 4, 6, 2, null, null, 7]",
        "explanation": "Node 3 has two children; replacing it with its in-order successor 4 yields [5, 4, 6, 2, null, null, 7]."
      },
      {
        "input": "root = [5, 3, 6, 2, 4, null, 7], key = 0",
        "output": "[5, 3, 6, 2, 4, null, 7]",
        "explanation": "Key 0 does not exist in the BST, so the tree is unchanged."
      }
    ],
    "constraints": [
      "0 <= number of nodes <= 10^4",
      "-10^5 <= Node.val, key <= 10^5",
      "All node values are unique"
    ],
    "starterCode": {
      "python": "def deleteNode(root: list[int | None], key: int) -> list[int | None]:\n    pass\n",
      "javascript": "function deleteNode(root, key) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<Integer> deleteNode(Integer[] root, int key) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\n#include <optional>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<optional<int>> deleteNode(vector<optional<int>>& root, int key) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "root = [5, 3, 6, 2, 4, null, 7], key = 3",
        "expected": "[5, 4, 6, 2, null, null, 7]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "root = [5, 3, 6, 2, 4, null, 7], key = 0",
        "expected": "[5, 3, 6, 2, 4, null, 7]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "validate-stack-push-pop",
    "title": "Validate Stack Sequences",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Arrays",
      "Simulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two integer arrays `pushed` and `popped`, each containing distinct values, return `true` if and only if this could have been the result of a sequence of push and pop operations on an initially empty stack.",
    "examples": [
      {
        "input": "pushed = [1, 2, 3, 4, 5], popped = [4, 5, 3, 2, 1]",
        "output": "true",
        "explanation": "Push 1..4, pop 4, push 5, pop 5, 3, 2, 1."
      },
      {
        "input": "pushed = [1, 2, 3, 4, 5], popped = [4, 3, 5, 1, 2]",
        "output": "false",
        "explanation": "1 cannot be popped before 2."
      }
    ],
    "constraints": [
      "1 <= pushed.length <= 1000",
      "popped is a permutation of pushed"
    ],
    "starterCode": {
      "python": "def validateStackSequences(pushed: list[int], popped: list[int]) -> bool:\n    pass\n",
      "javascript": "function validateStackSequences(pushed, popped) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public boolean validateStackSequences(int[] pushed, int[] popped) {\n        return false;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "pushed = [1, 2, 3, 4, 5], popped = [4, 5, 3, 2, 1]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "pushed = [1, 2, 3, 4, 5], popped = [4, 3, 5, 1, 2]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "unique-combination-sum-ii",
    "title": "Combination Sum II",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Arrays",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given a collection of candidate integers `candidates` (which may contain duplicates) and a target integer `target`, find all unique combinations in `candidates` where the chosen numbers sum to `target`. Each element in `candidates` may be used at most once in a combination, and the solution set must not contain duplicate combinations. Return each combination sorted in non-decreasing order.",
    "examples": [
      {
        "input": "candidates = [10, 1, 2, 7, 6, 1, 5], target = 8",
        "output": "[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]",
        "explanation": "Four unique combinations sum to 8."
      },
      {
        "input": "candidates = [2, 5, 2, 1, 2], target = 5",
        "output": "[[1, 2, 2], [5]]",
        "explanation": "Two unique combinations sum to 5."
      }
    ],
    "constraints": [
      "1 <= candidates.length <= 100",
      "1 <= candidates[i] <= 50",
      "1 <= target <= 30"
    ],
    "starterCode": {
      "python": "def combinationSum2(candidates: list[int], target: int) -> list[list[int]]:\n    pass\n",
      "javascript": "function combinationSum2(candidates, target) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "candidates = [10, 1, 2, 7, 6, 1, 5], target = 8",
        "expected": "[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "candidates = [2, 5, 2, 1, 2], target = 5",
        "expected": "[[1, 2, 2], [5]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "subsets-with-duplicates",
    "title": "Subsets II",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Arrays",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given an integer array `nums` that may contain duplicates, return all possible unique subsets (the power set). Each subset should be sorted in non-decreasing order, and the solution set must not contain duplicate subsets.",
    "examples": [
      {
        "input": "nums = [1, 2, 2]",
        "output": "[[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]",
        "explanation": "All 6 distinct subsets of [1, 2, 2]."
      },
      {
        "input": "nums = [0]",
        "output": "[[], [0]]",
        "explanation": "Empty subset and singleton [0]."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10"
    ],
    "starterCode": {
      "python": "def subsetsWithDup(nums: list[int]) -> list[list[int]]:\n    pass\n",
      "javascript": "function subsetsWithDup(nums) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> subsetsWithDup(int[] nums) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> subsetsWithDup(vector<int>& nums) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 2, 2]",
        "expected": "[[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0]",
        "expected": "[[], [0]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "all-palindrome-partitions",
    "title": "Palindrome Partitioning",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Strings",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of `s`.",
    "examples": [
      {
        "input": "s = 'aab'",
        "output": "[['a', 'a', 'b'], ['aa', 'b']]",
        "explanation": "Both partitions split 'aab' entirely into palindromic substrings."
      },
      {
        "input": "s = 'a'",
        "output": "[['a']]",
        "explanation": "Single character is trivially a palindrome."
      }
    ],
    "constraints": [
      "1 <= s.length <= 16",
      "s contains only lowercase English letters"
    ],
    "starterCode": {
      "python": "def partition(s: str) -> list[list[str]]:\n    pass\n",
      "javascript": "function partition(s) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<String>> partition(String s) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> partition(string s) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = 'aab'",
        "expected": "[['a', 'a', 'b'], ['aa', 'b']]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = 'a'",
        "expected": "[['a']]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "restore-valid-ip-addresses",
    "title": "Restore IP Addresses",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Strings"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "A valid IPv4 address consists of exactly four integers separated by single dots, where each integer is between `0` and `255` (inclusive) and cannot have leading zeros (except `'0'` itself). Given a string `s` containing only digits, return all possible valid IP addresses that can be formed by inserting three dots into `s`.",
    "examples": [
      {
        "input": "s = '25525511135'",
        "output": "['255.255.11.135', '255.255.111.35']",
        "explanation": "Two valid placements of three dots exist."
      },
      {
        "input": "s = '0000'",
        "output": "['0.0.0.0']",
        "explanation": "Only one valid partition exists."
      }
    ],
    "constraints": [
      "1 <= s.length <= 20",
      "s consists of digits only"
    ],
    "starterCode": {
      "python": "def restoreIpAddresses(s: str) -> list[str]:\n    pass\n",
      "javascript": "function restoreIpAddresses(s) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<String> restoreIpAddresses(String s) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> restoreIpAddresses(string s) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = '25525511135'",
        "expected": "['255.255.11.135', '255.255.111.35']",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = '0000'",
        "expected": "['0.0.0.0']",
        "isHidden": false
      }
    ]
  },
  {
    "id": "lfu-cache-design",
    "title": "LFU Cache Operations",
    "difficulty": "Hard",
    "topics": [
      "Design",
      "Hash Table",
      "Linked List"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Simulate a Least Frequently Used (LFU) cache with capacity `capacity`. You are given a list of `operations` where each operation is either `['put', key, value]` or `['get', key]`. `get(key)` returns the cached value if present (and increments its use count) or `-1` otherwise. `put(key, value)` inserts or updates `key` (incrementing its use count; if at capacity, evicts the least frequently used key, breaking ties by evicting the least recently used key). Return the list of results for all `'get'` operations in order.",
    "examples": [
      {
        "input": "capacity = 2, operations = [['put', 1, 1], ['put', 2, 2], ['get', 1], ['put', 3, 3], ['get', 2], ['get', 3], ['put', 4, 4], ['get', 1], ['get', 3], ['get', 4]]",
        "output": "[1, -1, 3, -1, 3, 4]",
        "explanation": "Key 2 is evicted when 3 is inserted (freq 1 < 2); when 4 is inserted, keys 1 and 3 both have freq 2, so the least recently used key 1 is evicted."
      },
      {
        "input": "capacity = 0, operations = [['put', 1, 1], ['get', 1]]",
        "output": "[-1]",
        "explanation": "Zero capacity cache stores nothing."
      }
    ],
    "constraints": [
      "0 <= capacity <= 10^4",
      "1 <= operations.length <= 2 * 10^5",
      "All operations must run in O(1) average time"
    ],
    "starterCode": {
      "python": "def simulateLFU(capacity: int, operations: list[list]) -> list[int]:\n    pass\n",
      "javascript": "function simulateLFU(capacity, operations) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<Integer> simulateLFU(int capacity, Object[][] operations) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> simulateLFU(int capacity, vector<vector<string>>& operations) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "capacity = 2, operations = [['put', 1, 1], ['put', 2, 2], ['get', 1], ['put', 3, 3], ['get', 2], ['get', 3], ['put', 4, 4], ['get', 1], ['get', 3], ['get', 4]]",
        "expected": "[1, -1, 3, -1, 3, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "capacity = 0, operations = [['put', 1, 1], ['get', 1]]",
        "expected": "[-1]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "binary-tree-cameras-min",
    "title": "Binary Tree Cameras",
    "difficulty": "Hard",
    "topics": [
      "Trees",
      "Greedy",
      "DFS",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given the `root` of a binary tree (serialized as a level-order list with `null` for missing nodes). A security camera placed at a node can monitor its parent, itself, and its immediate children. Return the minimum number of cameras needed to monitor every node in the tree.",
    "examples": [
      {
        "input": "root = [0, 0, null, 0, 0]",
        "output": "1",
        "explanation": "One camera placed at the left child of the root covers all 4 nodes."
      },
      {
        "input": "root = [0, 0, null, 0, null, 0, null, null, 0]",
        "output": "2",
        "explanation": "At least two cameras are needed to monitor all 5 nodes."
      }
    ],
    "constraints": [
      "1 <= number of nodes <= 1000",
      "Node.val == 0"
    ],
    "starterCode": {
      "python": "def minCameraCover(root: list[int | None]) -> int:\n    pass\n",
      "javascript": "function minCameraCover(root) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int minCameraCover(Integer[] root) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\n#include <optional>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minCameraCover(vector<optional<int>>& root) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "root = [0, 0, null, 0, 0]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "root = [0, 0, null, 0, null, 0, null, null, 0]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "tree-vertical-order-traversal",
    "title": "Vertical Order Traversal of a Binary Tree",
    "difficulty": "Hard",
    "topics": [
      "Trees",
      "BFS",
      "Sorting",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given the `root` of a binary tree (serialized as a level-order list with `null` for missing nodes), assign the root position `(row = 0, col = 0)`. For any node at `(r, c)`, its left child is at `(r + 1, c - 1)` and its right child is at `(r + 1, c + 1)`. Return the vertical order traversal of the tree from the leftmost column to the rightmost column. Within each column, sort nodes by row ascending, and break ties at the exact same `(row, col)` by node value ascending.",
    "examples": [
      {
        "input": "root = [3, 9, 20, null, null, 15, 7]",
        "output": "[[9], [3, 15], [20], [7]]",
        "explanation": "Columns -1, 0, 1, 2 contain [9], [3, 15], [20], [7]."
      },
      {
        "input": "root = [1, 2, 3, 4, 5, 6, 7]",
        "output": "[[4], [2], [1, 5, 6], [3], [7]]",
        "explanation": "Nodes 5 and 6 share (row=2, col=0), so 5 precedes 6 by value."
      }
    ],
    "constraints": [
      "1 <= number of nodes <= 1000",
      "0 <= Node.val <= 1000"
    ],
    "starterCode": {
      "python": "def verticalTraversal(root: list[int | None]) -> list[list[int]]:\n    pass\n",
      "javascript": "function verticalTraversal(root) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> verticalTraversal(Integer[] root) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\n#include <optional>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> verticalTraversal(vector<optional<int>>& root) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "root = [3, 9, 20, null, null, 15, 7]",
        "expected": "[[9], [3, 15], [20], [7]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "root = [1, 2, 3, 4, 5, 6, 7]",
        "expected": "[[4], [2], [1, 5, 6], [3], [7]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "serialize-deserialize-tree",
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "Hard",
    "topics": [
      "Trees",
      "Design",
      "BFS",
      "DFS",
      "Strings"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Design a round-trip codec for binary trees: given a binary tree `root` (as a trimmed level-order list with `null` for missing nodes), encode it into a compact preorder string representation using `'#'` for null pointers and `','` as delimiters, and then decode that string back into the exact trimmed level-order list. Return the decoded trimmed level-order list to verify lossless round-trip serialization.",
    "examples": [
      {
        "input": "root = [1, 2, 3, null, null, 4, 5]",
        "output": "[1, 2, 3, null, null, 4, 5]",
        "explanation": "Preorder encoding '1,2,#,#,3,4,#,#,5,#,#' decodes back to the exact original tree."
      },
      {
        "input": "root = []",
        "output": "[]",
        "explanation": "Empty tree encodes to '#' and decodes back to []."
      }
    ],
    "constraints": [
      "0 <= number of nodes <= 10^4",
      "-1000 <= Node.val <= 1000"
    ],
    "starterCode": {
      "python": "def roundTripTree(root: list[int | None]) -> list[int | None]:\n    pass\n",
      "javascript": "function roundTripTree(root) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<Integer> roundTripTree(Integer[] root) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\n#include <optional>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<optional<int>> roundTripTree(vector<optional<int>>& root) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "root = [1, 2, 3, null, null, 4, 5]",
        "expected": "[1, 2, 3, null, null, 4, 5]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "root = []",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "recover-swapped-bst",
    "title": "Recover Binary Search Tree",
    "difficulty": "Hard",
    "topics": [
      "Trees",
      "Binary Search Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given the `root` of a Binary Search Tree (serialized as a trimmed level-order list) in which the values of exactly two nodes have been swapped by mistake. Recover the BST without changing its structure and return the corrected tree as a trimmed level-order list.",
    "examples": [
      {
        "input": "root = [1, 3, null, null, 2]",
        "output": "[3, 1, null, null, 2]",
        "explanation": "Nodes 1 and 3 were swapped; swapping them back restores the valid BST."
      },
      {
        "input": "root = [3, 1, 4, null, null, 2]",
        "output": "[2, 1, 4, null, null, 3]",
        "explanation": "Nodes 2 and 3 were swapped."
      }
    ],
    "constraints": [
      "2 <= number of nodes <= 1000",
      "-2^31 <= Node.val <= 2^31 - 1",
      "All node values are distinct"
    ],
    "starterCode": {
      "python": "def recoverTree(root: list[int | None]) -> list[int | None]:\n    pass\n",
      "javascript": "function recoverTree(root) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<Integer> recoverTree(Integer[] root) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\n#include <optional>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<optional<int>> recoverTree(vector<optional<int>>& root) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "root = [1, 3, null, null, 2]",
        "expected": "[3, 1, null, null, 2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "root = [3, 1, 4, null, null, 2]",
        "expected": "[2, 1, 4, null, null, 3]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "expression-add-operators",
    "title": "Expression Add Operators",
    "difficulty": "Hard",
    "topics": [
      "Backtracking",
      "Strings",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given a string `num` containing only digits and an integer `target`, return all possibilities to insert the binary operators `'+'`, `'-'`, and/or `'*'` between the digits of `num` so that the resulting expression evaluates to `target`. Operands in the returned expressions must not contain leading zeros (except `'0'` itself).",
    "examples": [
      {
        "input": "num = '123', target = 6",
        "output": "['1+2+3', '1*2*3']",
        "explanation": "Both 1+2+3 and 1*2*3 evaluate to 6."
      },
      {
        "input": "num = '232', target = 8",
        "output": "['2*3+2', '2+3*2']",
        "explanation": "Both expressions evaluate to 8 under standard operator precedence."
      }
    ],
    "constraints": [
      "1 <= num.length <= 10",
      "num consists only of digits",
      "-2^31 <= target <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def addOperators(num: str, target: int) -> list[str]:\n    pass\n",
      "javascript": "function addOperators(num, target) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<String> addOperators(String num, int target) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> addOperators(string num, int target) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "num = '123', target = 6",
        "expected": "['1+2+3', '1*2*3']",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "num = '232', target = 8",
        "expected": "['2*3+2', '2+3*2']",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sliding-window-median",
    "title": "Sliding Window Median",
    "difficulty": "Hard",
    "topics": [
      "Heap",
      "Sliding Window",
      "Two Heaps",
      "Design"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums` and a window size `k`, a window of size `k` slides from the very left of `nums` to the very right by one position at a time. Return an array of the median value for each window position as floating-point numbers.",
    "examples": [
      {
        "input": "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
        "output": "[1.0, -1.0, -1.0, 3.0, 5.0, 6.0]",
        "explanation": "Each window of size 3 has an odd length, so its median is the middle sorted element."
      },
      {
        "input": "nums = [1, 2, 3, 4, 2, 3, 1, 4, 2], k = 4",
        "output": "[2.5, 2.5, 3.0, 2.5, 2.5, 2.5]",
        "explanation": "For even k, the median is the average of the two middle elements."
      }
    ],
    "constraints": [
      "1 <= k <= nums.length <= 10^5",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def medianSlidingWindow(nums: list[int], k: int) -> list[float]:\n    pass\n",
      "javascript": "function medianSlidingWindow(nums, k) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public double[] medianSlidingWindow(int[] nums, int k) {\n        return new double[0];\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<double> medianSlidingWindow(vector<int>& nums, int k) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
        "expected": "[1.0, -1.0, -1.0, 3.0, 5.0, 6.0]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 2, 3, 4, 2, 3, 1, 4, 2], k = 4",
        "expected": "[2.5, 2.5, 3.0, 2.5, 2.5, 2.5]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "longest-valid-obstacle-course",
    "title": "Find the Longest Valid Obstacle Course at Each Position",
    "difficulty": "Hard",
    "topics": [
      "Binary Search",
      "Dynamic Programming",
      "Arrays"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are designing an obstacle course given an array `obstacles` of length `n`, where `obstacles[i]` is the height of the `i`-th obstacle. For every index `i` from `0` to `n - 1`, find the length of the longest non-decreasing subsequence of `obstacles[0..i]` that ends at index `i` (i.e., includes `obstacles[i]`). Return an array `ans` of length `n` with these lengths.",
    "examples": [
      {
        "input": "obstacles = [1, 2, 3, 2]",
        "output": "[1, 2, 3, 3]",
        "explanation": "At index 3 (height 2), the longest non-decreasing course ending there is [1, 2, 2] of length 3."
      },
      {
        "input": "obstacles = [3, 1, 5, 6, 4, 2]",
        "output": "[1, 1, 2, 3, 2, 2]",
        "explanation": "At index 4 (height 4), [1, 4] or [3, 4] has length 2; at index 5 (height 2), [1, 2] has length 2."
      }
    ],
    "constraints": [
      "1 <= obstacles.length <= 10^5",
      "1 <= obstacles[i] <= 10^7"
    ],
    "starterCode": {
      "python": "def longestObstacleCourseAtEachPosition(obstacles: list[int]) -> list[int]:\n    pass\n",
      "javascript": "function longestObstacleCourseAtEachPosition(obstacles) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int[] longestObstacleCourseAtEachPosition(int[] obstacles) {\n        return new int[0];\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> longestObstacleCourseAtEachPosition(vector<int>& obstacles) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "obstacles = [1, 2, 3, 2]",
        "expected": "[1, 2, 3, 3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "obstacles = [3, 1, 5, 6, 4, 2]",
        "expected": "[1, 1, 2, 3, 2, 2]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ugly-number-factor-check",
    "title": "Ugly Number",
    "difficulty": "Easy",
    "topics": [
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An ugly number is a positive integer whose prime factors are limited to `2`, `3`, and `5`. Given an integer `n`, return `true` if `n` is an ugly number, or `false` otherwise.",
    "examples": [
      {
        "input": "n = 6",
        "output": "true",
        "explanation": "6 = 2 * 3, which only uses prime factors 2 and 3."
      },
      {
        "input": "n = 14",
        "output": "false",
        "explanation": "14 = 2 * 7 includes the disallowed prime factor 7."
      }
    ],
    "constraints": [
      "-2^31 <= n <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def isUgly(n: int) -> bool:\n    pass\n",
      "javascript": "function isUgly(n) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public boolean isUgly(int n) {\n        return false;\n    }\n}\n",
      "cpp": "class Solution {\npublic:\n    bool isUgly(int n) {\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 6",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 14",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "assign-cookies-greedy",
    "title": "Assign Cookies",
    "difficulty": "Easy",
    "topics": [
      "Greedy",
      "Sorting",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are distributing cookies to children. Each child `i` has a greed factor `g[i]`, which is the minimum cookie size that satisfies them, and each cookie `j` has size `s[j]`. You can give each child at most one cookie, and a child is satisfied if `s[j] >= g[i]`. Return the maximum number of children you can satisfy.",
    "examples": [
      {
        "input": "g = [1, 2, 3], s = [1, 1]",
        "output": "1",
        "explanation": "Only the child with greed factor 1 can be satisfied."
      },
      {
        "input": "g = [1, 2], s = [1, 2, 3]",
        "output": "2",
        "explanation": "Both children can be satisfied with cookies of size 1 and 2."
      }
    ],
    "constraints": [
      "1 <= g.length <= 3 * 10^4",
      "0 <= s.length <= 3 * 10^4",
      "1 <= g[i], s[j] <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def findContentChildren(g: list[int], s: list[int]) -> int:\n    pass\n",
      "javascript": "function findContentChildren(g, s) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int findContentChildren(int[] g, int[] s) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findContentChildren(vector<int>& g, vector<int>& s) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "g = [1, 2, 3], s = [1, 1]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "g = [1, 2], s = [1, 2, 3]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "fibonacci-sequence-nth",
    "title": "Fibonacci Number",
    "difficulty": "Easy",
    "topics": [
      "Math",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "The Fibonacci sequence is defined by `F(0) = 0`, `F(1) = 1`, and `F(n) = F(n - 1) + F(n - 2)` for `n > 1`. Given `n`, calculate and return `F(n)`.",
    "examples": [
      {
        "input": "n = 4",
        "output": "3",
        "explanation": "F(4) = F(3) + F(2) = 2 + 1 = 3."
      },
      {
        "input": "n = 10",
        "output": "55",
        "explanation": "The 10th Fibonacci number is 55."
      }
    ],
    "constraints": [
      "0 <= n <= 30"
    ],
    "starterCode": {
      "python": "def fib(n: int) -> int:\n    pass\n",
      "javascript": "function fib(n) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int fib(int n) {\n        return 0;\n    }\n}\n",
      "cpp": "class Solution {\npublic:\n    int fib(int n) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 4",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 10",
        "expected": "55",
        "isHidden": false
      }
    ]
  },
  {
    "id": "longest-harmonious-subseq",
    "title": "Longest Harmonious Subsequence",
    "difficulty": "Easy",
    "topics": [
      "Hash Table",
      "Arrays",
      "Counting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A harmonious array is an array where the difference between its maximum value and its minimum value is exactly `1`. Given an integer array `nums`, return the length of its longest harmonious subsequence among all possible subsequences.",
    "examples": [
      {
        "input": "nums = [1, 3, 2, 2, 5, 2, 3, 7]",
        "output": "5",
        "explanation": "The longest harmonious subsequence is [3, 2, 2, 2, 3] of length 5."
      },
      {
        "input": "nums = [1, 1, 1, 1]",
        "output": "0",
        "explanation": "No two elements differ by exactly 1."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "python": "def findLHS(nums: list[int]) -> int:\n    pass\n",
      "javascript": "function findLHS(nums) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int findLHS(int[] nums) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findLHS(vector<int>& nums) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 3, 2, 2, 5, 2, 3, 7]",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 1, 1, 1]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "knight-dialer-moves",
    "title": "Knight Dialer",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Graphs"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A chess knight is placed on any numeric key (`0` through `9`) of a standard phone keypad (`1-2-3`, `4-5-6`, `7-8-9`, `*-0-#`). Given an integer `n`, return how many distinct phone numbers of length `n` the knight can dial by making `n - 1` valid L-shaped knight jumps, modulo `10^9 + 7`.",
    "examples": [
      {
        "input": "n = 1",
        "output": "10",
        "explanation": "The knight can start on any of the 10 digits."
      },
      {
        "input": "n = 2",
        "output": "20",
        "explanation": "There are 20 valid 2-digit sequences."
      }
    ],
    "constraints": [
      "1 <= n <= 5000"
    ],
    "starterCode": {
      "python": "def knightDialer(n: int) -> int:\n    pass\n",
      "javascript": "function knightDialer(n) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int knightDialer(int n) {\n        return 0;\n    }\n}\n",
      "cpp": "class Solution {\npublic:\n    int knightDialer(int n) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 1",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 2",
        "expected": "20",
        "isHidden": false
      }
    ]
  },
  {
    "id": "min-delete-two-strings",
    "title": "Delete Operation for Two Strings",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Strings"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two strings `word1` and `word2`, return the minimum number of single-character deletion steps required to make `word1` and `word2` identical.",
    "examples": [
      {
        "input": "word1 = 'sea', word2 = 'eat'",
        "output": "2",
        "explanation": "Delete 's' from 'sea' and 't' from 'eat' to leave 'ea'."
      },
      {
        "input": "word1 = 'codearena', word2 = 'arena'",
        "output": "4",
        "explanation": "Delete 'c', 'o', 'd', 'e' from 'codearena'."
      }
    ],
    "constraints": [
      "1 <= word1.length, word2.length <= 500",
      "Both strings consist of lowercase English letters"
    ],
    "starterCode": {
      "python": "def minDistance(word1: str, word2: str) -> int:\n    pass\n",
      "javascript": "function minDistance(word1, word2) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int minDistance(String word1, String word2) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "word1 = 'sea', word2 = 'eat'",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "word1 = 'codearena', word2 = 'arena'",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "stone-game-optimal-dp",
    "title": "Stone Game",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Game Theory",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Alice and Bob play a game with an even number of piles of stones arranged in a row, where `piles[i]` is the number of stones in the `i`-th pile and the total number of stones is odd (so there are no ties). Players alternate turns taking an entire pile from either the left or right end, with Alice going first. Assuming both players play optimally, return `true` if Alice wins and `false` if Bob wins.",
    "examples": [
      {
        "input": "piles = [5, 3, 4, 5]",
        "output": "true",
        "explanation": "Alice can take 5, forcing a win regardless of Bob's move."
      },
      {
        "input": "piles = [3, 7, 2, 3]",
        "output": "true",
        "explanation": "Alice can guarantee collecting more stones than Bob."
      }
    ],
    "constraints": [
      "2 <= piles.length <= 500",
      "piles.length is even",
      "sum(piles) is odd"
    ],
    "starterCode": {
      "python": "def stoneGame(piles: list[int]) -> bool:\n    pass\n",
      "javascript": "function stoneGame(piles) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public boolean stoneGame(int[] piles) {\n        return false;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool stoneGame(vector<int>& piles) {\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "piles = [5, 3, 4, 5]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "piles = [3, 7, 2, 3]",
        "expected": "true",
        "isHidden": false
      }
    ]
  },
  {
    "id": "partition-k-equal-subsets",
    "title": "Partition to K Equal Sum Subsets",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Dynamic Programming",
      "Bit Manipulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums` and an integer `k`, return `true` if it is possible to divide `nums` into `k` non-empty subsets whose sums are all equal, or `false` otherwise.",
    "examples": [
      {
        "input": "nums = [4, 3, 2, 3, 5, 2, 1], k = 4",
        "output": "true",
        "explanation": "Subsets (5), (1, 4), (2, 3), and (2, 3) each sum to 5."
      },
      {
        "input": "nums = [1, 2, 3, 4], k = 3",
        "output": "false",
        "explanation": "Total sum 10 is not divisible by 3."
      }
    ],
    "constraints": [
      "1 <= k <= nums.length <= 16",
      "1 <= nums[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def canPartitionKSubsets(nums: list[int], k: int) -> bool:\n    pass\n",
      "javascript": "function canPartitionKSubsets(nums, k) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public boolean canPartitionKSubsets(int[] nums, int k) {\n        return false;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canPartitionKSubsets(vector<int>& nums, int k) {\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [4, 3, 2, 3, 5, 2, 1], k = 4",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 2, 3, 4], k = 3",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "unique-permutations-ii",
    "title": "Permutations II",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Arrays",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given a collection of numbers `nums` that might contain duplicates, return all possible unique permutations in any order.",
    "examples": [
      {
        "input": "nums = [1, 1, 2]",
        "output": "[[1, 1, 2], [1, 2, 1], [2, 1, 1]]",
        "explanation": "There are 3 distinct permutations."
      },
      {
        "input": "nums = [1, 2, 3]",
        "output": "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
        "explanation": "All 6 permutations of 3 distinct elements."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 8",
      "-10 <= nums[i] <= 10"
    ],
    "starterCode": {
      "python": "def permuteUnique(nums: list[int]) -> list[list[int]]:\n    pass\n",
      "javascript": "function permuteUnique(nums) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> permuteUnique(int[] nums) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> permuteUnique(vector<int>& nums) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [1, 1, 2]",
        "expected": "[[1, 1, 2], [1, 2, 1], [2, 1, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 2, 3]",
        "expected": "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "longest-mountain-subarray",
    "title": "Longest Mountain in Array",
    "difficulty": "Medium",
    "topics": [
      "Arrays",
      "Two Pointers",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A subarray `B` of `arr` is a mountain if `len(B) >= 3` and there exists some interior peak index `i` (`0 < i < len(B) - 1`) such that `B[0] < B[1] < ... < B[i]` and `B[i] > B[i + 1] > ... > B[len(B) - 1]`. Given an integer array `arr`, return the length of the longest mountain subarray, or `0` if none exists.",
    "examples": [
      {
        "input": "arr = [2, 1, 4, 7, 3, 2, 5]",
        "output": "5",
        "explanation": "The longest mountain is [1, 4, 7, 3, 2] with length 5."
      },
      {
        "input": "arr = [2, 2, 2]",
        "output": "0",
        "explanation": "There is no strictly increasing then strictly decreasing subarray."
      }
    ],
    "constraints": [
      "1 <= arr.length <= 10^4",
      "0 <= arr[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def longestMountain(arr: list[int]) -> int:\n    pass\n",
      "javascript": "function longestMountain(arr) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int longestMountain(int[] arr) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestMountain(vector<int>& arr) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "arr = [2, 1, 4, 7, 3, 2, 5]",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "arr = [2, 2, 2]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "snakes-and-ladders-bfs",
    "title": "Snakes and Ladders",
    "difficulty": "Medium",
    "topics": [
      "Graphs",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an `n x n` integer matrix `board` where cells are labeled `1` to `n^2` in Boustrophedon (alternating left-to-right and right-to-left) order starting from the bottom-left cell `(n - 1, 0)`. You start on square `1` and each move rolls a 6-sided die to advance to `curr + 1 .. min(curr + 6, n^2)`. If the destination square has `board[r][c] != -1`, you must immediately jump to square `board[r][c]` (at most one jump per roll). Return the minimum number of die rolls required to reach square `n^2`, or `-1` if impossible.",
    "examples": [
      {
        "input": "board = [[-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, 35, -1, -1, 13, -1], [-1, -1, -1, -1, -1, -1], [-1, 15, -1, -1, -1, -1]]",
        "output": "4",
        "explanation": "Move 1 -> 2 (ladder to 15) -> 17 (snake to 13) -> 14 (ladder to 35) -> 36 in 4 rolls."
      },
      {
        "input": "board = [[-1, -1], [-1, 3]]",
        "output": "1",
        "explanation": "Rolling 3 reaches square 4 directly from square 1."
      }
    ],
    "constraints": [
      "2 <= n <= 20",
      "board[r][c] is -1 or in [1, n^2]",
      "Squares 1 and n^2 have no snake or ladder"
    ],
    "starterCode": {
      "python": "def snakesAndLadders(board: list[list[int]]) -> int:\n    pass\n",
      "javascript": "function snakesAndLadders(board) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int snakesAndLadders(int[][] board) {\n        return -1;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int snakesAndLadders(vector<vector<int>>& board) {\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "board = [[-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, 35, -1, -1, 13, -1], [-1, -1, -1, -1, -1, -1], [-1, 15, -1, -1, -1, -1]]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "board = [[-1, -1], [-1, 3]]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sorted-array-to-balanced-bst",
    "title": "Convert Sorted Array to Binary Search Tree",
    "difficulty": "Medium",
    "topics": [
      "Trees",
      "Binary Search Tree",
      "Divide and Conquer"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums` sorted in strictly ascending order, convert it into a height-balanced Binary Search Tree by always choosing the left-middle element `mid = (left + right) // 2` as the root of each subarray `[left..right]`. Return the resulting BST serialized as a trimmed level-order list with `null` for missing nodes.",
    "examples": [
      {
        "input": "nums = [-10, -3, 0, 5, 9]",
        "output": "[0, -10, 5, null, -3, null, 9]",
        "explanation": "Choosing mid = (l + r) // 2 places 0 at the root, -10 as left child, and 5 as right child."
      },
      {
        "input": "nums = [1, 3]",
        "output": "[1, null, 3]",
        "explanation": "mid = 0 selects 1 as root with 3 as its right child."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "nums is sorted in strictly increasing order"
    ],
    "starterCode": {
      "python": "def sortedArrayToBST(nums: list[int]) -> list[int | None]:\n    pass\n",
      "javascript": "function sortedArrayToBST(nums) {\n  // Write your code here\n}\n",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<Integer> sortedArrayToBST(int[] nums) {\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <vector>\n#include <optional>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<optional<int>> sortedArrayToBST(vector<int>& nums) {\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [-10, -3, 0, 5, 9]",
        "expected": "[0, -10, 5, null, -3, null, 9]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [1, 3]",
        "expected": "[1, null, 3]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "palindrome-partition-min-cuts",
    "title": "Palindrome Partitioning II",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "Strings"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return the minimum number of cuts needed for a palindrome partitioning of `s`.",
    "examples": [
      {
        "input": "s = 'aab'",
        "output": "1",
        "explanation": "One cut produces ['aa', 'b'], both palindromes."
      },
      {
        "input": "s = 'ab'",
        "output": "1",
        "explanation": "One cut produces ['a', 'b']."
      }
    ],
    "constraints": [
      "1 <= s.length <= 2000",
      "s consists of lowercase English letters"
    ],
    "starterCode": {
      "python": "def minCut(s: str) -> int:\n    pass\n",
      "javascript": "function minCut(s) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int minCut(String s) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minCut(string s) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s = 'aab'",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s = 'ab'",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "shortest-common-supersequence",
    "title": "Shortest Common Supersequence",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "Strings"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two strings `str1` and `str2`, return the length of the shortest string that contains both `str1` and `str2` as subsequences.",
    "examples": [
      {
        "input": "str1 = 'abac', str2 = 'cab'",
        "output": "5",
        "explanation": "'cabac' has length 5 and contains both 'abac' and 'cab' as subsequences."
      },
      {
        "input": "str1 = 'aaaaaaaa', str2 = 'aaaaaaaa'",
        "output": "8",
        "explanation": "Both strings are identical, so the shortest common supersequence has length 8."
      }
    ],
    "constraints": [
      "1 <= str1.length, str2.length <= 1000",
      "str1 and str2 consist of lowercase English letters"
    ],
    "starterCode": {
      "python": "def shortestCommonSupersequenceLength(str1: str, str2: str) -> int:\n    pass\n",
      "javascript": "function shortestCommonSupersequenceLength(str1, str2) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int shortestCommonSupersequenceLength(String str1, String str2) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestCommonSupersequenceLength(string str1, string str2) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "str1 = 'abac', str2 = 'cab'",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "str1 = 'aaaaaaaa', str2 = 'aaaaaaaa'",
        "expected": "8",
        "isHidden": false
      }
    ]
  },
  {
    "id": "frog-jump-river-stones",
    "title": "Frog Jump",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "Hash Table",
      "Arrays"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A frog is crossing a river with stones at sorted positions given by `stones`. Initially, the frog is on the first stone (`stones[0] == 0`) and assumes its first jump must be `1` unit. If the frog's last jump was `k` units, its next jump must be `k - 1`, `k`, or `k + 1` units (strictly forward, so jump size > 0). Return `true` if the frog can reach the last stone, or `false` otherwise.",
    "examples": [
      {
        "input": "stones = [0, 1, 3, 5, 6, 8, 12, 17]",
        "output": "true",
        "explanation": "Jumps of sizes 1, 2, 2, 3, 4, 5 reach stone 17."
      },
      {
        "input": "stones = [0, 1, 2, 3, 4, 8, 9, 11]",
        "output": "false",
        "explanation": "The gap between stone 4 and stone 8 is too large to cross."
      }
    ],
    "constraints": [
      "2 <= stones.length <= 2000",
      "0 <= stones[i] <= 2^31 - 1",
      "stones[0] == 0 and stones is strictly increasing"
    ],
    "starterCode": {
      "python": "def canCross(stones: list[int]) -> bool:\n    pass\n",
      "javascript": "function canCross(stones) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public boolean canCross(int[] stones) {\n        return false;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canCross(vector<int>& stones) {\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "stones = [0, 1, 3, 5, 6, 8, 12, 17]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "stones = [0, 1, 2, 3, 4, 8, 9, 11]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "cherry-pickup-ii-robots",
    "title": "Cherry Pickup II",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an `rows x cols` matrix `grid` representing a field of cherries where `grid[r][c]` is the number of cherries at cell `(r, c)`. Two robots start at `(0, 0)` and `(0, cols - 1)`. At each step, both robots move down one row simultaneously, and each robot can stay in its column or move 1 column left or right (`c - 1`, `c`, or `c + 1`). When both robots land on the same cell, only one collects its cherries. Return the maximum total cherries both robots can collect upon reaching the bottom row.",
    "examples": [
      {
        "input": "grid = [[3, 1, 1], [2, 5, 1], [1, 5, 5], [2, 1, 1]]",
        "output": "24",
        "explanation": "Robot 1 collects 3+2+5+2=12 and Robot 2 collects 1+5+5+1=12 for a total of 24."
      },
      {
        "input": "grid = [[1, 0, 0, 0, 0, 0, 1], [2, 0, 0, 0, 0, 3, 0], [2, 0, 9, 0, 0, 0, 0], [0, 3, 0, 5, 4, 0, 0], [1, 0, 2, 3, 0, 0, 6]]",
        "output": "28",
        "explanation": "Optimal paths yield 28 cherries."
      }
    ],
    "constraints": [
      "2 <= rows, cols <= 70",
      "0 <= grid[r][c] <= 100"
    ],
    "starterCode": {
      "python": "def cherryPickup(grid: list[list[int]]) -> int:\n    pass\n",
      "javascript": "function cherryPickup(grid) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int cherryPickup(int[][] grid) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int cherryPickup(vector<vector<int>>& grid) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "grid = [[3, 1, 1], [2, 5, 1], [1, 5, 5], [2, 1, 1]]",
        "expected": "24",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "grid = [[1, 0, 0, 0, 0, 0, 1], [2, 0, 0, 0, 0, 3, 0], [2, 0, 9, 0, 0, 0, 0], [0, 3, 0, 5, 4, 0, 0], [1, 0, 2, 3, 0, 0, 6]]",
        "expected": "28",
        "isHidden": false
      }
    ]
  },
  {
    "id": "count-of-range-sum-mergesort",
    "title": "Count of Range Sum",
    "difficulty": "Hard",
    "topics": [
      "Divide and Conquer",
      "Merge Sort",
      "Prefix Sum"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer array `nums` and two integers `lower` and `upper`, return the number of non-empty contiguous subarrays `nums[i..j]` (`0 <= i <= j < nums.length`) whose sum lies in the inclusive range `[lower, upper]`.",
    "examples": [
      {
        "input": "nums = [-2, 5, -1], lower = -2, upper = 2",
        "output": "3",
        "explanation": "Valid subarrays are [0,0] (sum -2), [2,2] (sum -1), and [0,2] (sum 2)."
      },
      {
        "input": "nums = [0], lower = 0, upper = 0",
        "output": "1",
        "explanation": "Subarray [0,0] has sum 0."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "-10^5 <= lower <= upper <= 10^5"
    ],
    "starterCode": {
      "python": "def countRangeSum(nums: list[int], lower: int, upper: int) -> int:\n    pass\n",
      "javascript": "function countRangeSum(nums, lower, upper) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int countRangeSum(int[] nums, int lower, int upper) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countRangeSum(vector<int>& nums, int lower, int upper) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [-2, 5, -1], lower = -2, upper = 2",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [0], lower = 0, upper = 0",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "min-window-subsequence",
    "title": "Minimum Window Subsequence",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "Strings",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given strings `s1` and `s2`, return the minimum contiguous substring `W` of `s1` such that `s2` is a subsequence of `W`. If there is no such substring, return the empty string `''`. If multiple minimum-length substrings exist, return the one with the leftmost starting index.",
    "examples": [
      {
        "input": "s1 = 'abcdebdde', s2 = 'bde'",
        "output": "'bcde'",
        "explanation": "'bcde' occurs before 'bdde' and both have minimum length 4."
      },
      {
        "input": "s1 = 'jmeqksfrsdcmsiwvaovztaqenprpvnbstl', s2 = 'u'",
        "output": "''",
        "explanation": "'u' does not appear in s1."
      }
    ],
    "constraints": [
      "1 <= s1.length <= 2 * 10^4",
      "1 <= s2.length <= 100",
      "Both strings consist of lowercase English letters"
    ],
    "starterCode": {
      "python": "def minWindowSubsequence(s1: str, s2: str) -> str:\n    pass\n",
      "javascript": "function minWindowSubsequence(s1, s2) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public String minWindowSubsequence(String s1, String s2) {\n        return \"\";\n    }\n}\n",
      "cpp": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minWindowSubsequence(string s1, string s2) {\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "s1 = 'abcdebdde', s2 = 'bde'",
        "expected": "'bcde'",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "s1 = 'jmeqksfrsdcmsiwvaovztaqenprpvnbstl', s2 = 'u'",
        "expected": "''",
        "isHidden": false
      }
    ]
  },
  {
    "id": "largest-component-common-factor",
    "title": "Largest Component Size by Common Factor",
    "difficulty": "Hard",
    "topics": [
      "Graphs",
      "Union Find",
      "Math",
      "Number Theory"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an integer array of unique positive integers `nums`. Consider an undirected graph where each element of `nums` is a node, and there is an edge between `nums[i]` and `nums[j]` if they share a common factor greater than `1`. Return the size of the largest connected component in this graph.",
    "examples": [
      {
        "input": "nums = [4, 6, 15, 35]",
        "output": "4",
        "explanation": "4-6 (factor 2), 6-15 (factor 3), 15-35 (factor 5) form one connected component of size 4."
      },
      {
        "input": "nums = [20, 50, 9, 63]",
        "output": "2",
        "explanation": "Components are {20, 50} and {9, 63}, each of size 2."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^4",
      "1 <= nums[i] <= 10^5",
      "All values in nums are unique"
    ],
    "starterCode": {
      "python": "def largestComponentSize(nums: list[int]) -> int:\n    pass\n",
      "javascript": "function largestComponentSize(nums) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int largestComponentSize(int[] nums) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int largestComponentSize(vector<int>& nums) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "nums = [4, 6, 15, 35]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "nums = [20, 50, 9, 63]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "stock-profit-two-transactions",
    "title": "Best Time to Buy and Sell Stock III",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "Arrays"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day. Find the maximum profit you can achieve by completing at most two transactions. You may not engage in multiple transactions simultaneously (you must sell the stock before you buy again).",
    "examples": [
      {
        "input": "prices = [3, 3, 5, 0, 0, 3, 1, 4]",
        "output": "6",
        "explanation": "Buy at 0, sell at 3 (profit 3), then buy at 1, sell at 4 (profit 3) for total profit 6."
      },
      {
        "input": "prices = [1, 2, 3, 4, 5]",
        "output": "4",
        "explanation": "Buy at 1 and sell at 5 in a single transaction for profit 4."
      }
    ],
    "constraints": [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^5"
    ],
    "starterCode": {
      "python": "def maxProfitTwoTrades(prices: list[int]) -> int:\n    pass\n",
      "javascript": "function maxProfitTwoTrades(prices) {\n  // Write your code here\n}\n",
      "java": "class Solution {\n    public int maxProfitTwoTrades(int[] prices) {\n        return 0;\n    }\n}\n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProfitTwoTrades(vector<int>& prices) {\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "prices = [3, 3, 5, 0, 0, 3, 1, 4]",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "prices = [1, 2, 3, 4, 5]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "substation-harmonic-modulo-windows",
    "title": "Power Substation Harmonic-Multiple Windows",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Hash Table",
      "Prefix Sum"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A power substation logs net phase imbalances `phases` every second. Count how many non-empty contiguous time windows have a total imbalance divisible by harmonic factor `harm`.",
    "examples": [
      {
        "input": "phases = [4, 5, 0, -2, -3, 1], harm = 5",
        "output": "7",
        "explanation": "Seven contiguous windows sum to a multiple of 5."
      },
      {
        "input": "phases = [7], harm = 4",
        "output": "0",
        "explanation": "7 is not divisible by 4."
      }
    ],
    "constraints": [
      "1 <= phases.length <= 3 * 10^4",
      "2 <= harm <= 10^4"
    ],
    "starterCode": {
      "python": "def count_harmonic_windows(phases: list[int], harm: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countHarmonicWindows(phases, harm) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countHarmonicWindows(int[] phases, int harm) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countHarmonicWindows(vector<int>& phases, int harm) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "phases = [4, 5, 0, -2, -3, 1], harm = 5",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "phases = [7], harm = 4",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "dispatch-next-route-sequence",
    "title": "Rail Yard Next Lexicographical Car Sequence",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A rail yard numbers freight cars in sequence `cars`. Rearrange `cars` in-place into the lexicographically next greater ordering (or the lowest ascending ordering if already at the highest), and return `cars`.",
    "examples": [
      {
        "input": "cars = [2, 4, 3]",
        "output": "[3, 2, 4]",
        "explanation": "Next ordering after [2, 4, 3] is [3, 2, 4]."
      },
      {
        "input": "cars = [5, 4, 1]",
        "output": "[1, 4, 5]",
        "explanation": "Wraps around to lowest ordering."
      }
    ],
    "constraints": [
      "1 <= cars.length <= 200"
    ],
    "starterCode": {
      "python": "def next_car_sequence(cars: list[int]) -> list[int]:\n    # Write your solution here\n    return cars\n",
      "javascript": "function nextCarSequence(cars) {\n  // Write your solution here\n  return cars;\n}\n",
      "java": "class Solution {\n    public int[] nextCarSequence(int[] cars) {\n        // Write your solution here\n        return cars;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> nextCarSequence(vector<int>& cars) {\n        // Write your solution here\n        return cars;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "cars = [2, 4, 3]",
        "expected": "[3, 2, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "cars = [5, 4, 1]",
        "expected": "[1, 4, 5]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "inventory-audit-missing-lot-ids",
    "title": "Pharmacy Inventory Unscanned Lot IDs",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Cyclic Sort"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A pharmacy expected lot numbers `1..n` (`n = len(scanned)`), but duplicates caused some lots to be skipped in `scanned`. Return all missing lot numbers in ascending order using O(1) extra space (excluding output).",
    "examples": [
      {
        "input": "scanned = [3, 1, 3, 4, 1]",
        "output": "[2, 5]",
        "explanation": "Lots 2 and 5 never appeared."
      },
      {
        "input": "scanned = [1, 2, 3]",
        "output": "[]",
        "explanation": "All lots accounted for."
      }
    ],
    "constraints": [
      "1 <= scanned.length <= 10^5",
      "1 <= scanned[i] <= n"
    ],
    "starterCode": {
      "python": "def missing_lot_ids(scanned: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function missingLotIds(scanned) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> missingLotIds(int[] scanned) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> missingLotIds(vector<int>& scanned) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "scanned = [3, 1, 3, 4, 1]",
        "expected": "[2, 5]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "scanned = [1, 2, 3]",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "stock-ledger-shared-skus",
    "title": "Dual-Warehouse Shared SKU Multiplicity",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Two regional warehouses report SKU arrays `west` and `east`. Return an array of SKUs present in both warehouses, where each SKU appears as many times as its minimum count across both lists.",
    "examples": [
      {
        "input": "west = [10, 20, 20, 30], east = [20, 20, 40]",
        "output": "[20, 20]",
        "explanation": "SKU 20 appears twice in both warehouses."
      },
      {
        "input": "west = [1, 2], east = [3, 4]",
        "output": "[]",
        "explanation": "No overlapping SKUs."
      }
    ],
    "constraints": [
      "1 <= west.length, east.length <= 5000"
    ],
    "starterCode": {
      "python": "def shared_skus(west: list[int], east: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function sharedSkus(west, east) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] sharedSkus(int[] west, int[] east) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> sharedSkus(vector<int>& west, vector<int>& east) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "west = [10, 20, 20, 30], east = [20, 20, 40]",
        "expected": "[20, 20]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "west = [1, 2], east = [3, 4]",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "cipher-bijection-auditor",
    "title": "Substitution Cipher Bijection Auditor",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A cryptography test checks whether plaintext `plain` and ciphertext `cipher` (equal length) could be produced by a strict one-to-one monoalphabetic substitution cipher. Return `true` iff a bijection exists.",
    "examples": [
      {
        "input": "plain = \"data\", cipher = \"xyzw\"",
        "output": "false",
        "explanation": "'a' would have to map to both 'y' and 'w'."
      },
      {
        "input": "plain = \"noon\", cipher = \"abba\"",
        "output": "true",
        "explanation": "n<->a and o<->b is a valid bijection."
      }
    ],
    "constraints": [
      "1 <= plain.length == cipher.length <= 5 * 10^4"
    ],
    "starterCode": {
      "python": "def is_valid_cipher(plain: str, cipher: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isValidCipher(plain, cipher) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isValidCipher(String plain, String cipher) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValidCipher(string plain, string cipher) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "plain = \"data\", cipher = \"xyzw\"",
        "expected": "false",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "plain = \"noon\", cipher = \"abba\"",
        "expected": "true",
        "isHidden": false
      }
    ]
  },
  {
    "id": "dna-motif-anagram-positions",
    "title": "Genome Scanner Scrambled Motif Offsets",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A genomics tool scans a lowercase DNA sequence `seq` for every start index where a contiguous substring of length `len(motif)` is an anagram (character permutation) of `motif`. Return all start indices in ascending order.",
    "examples": [
      {
        "input": "seq = \"catgactga\", motif = \"act\"",
        "output": "[0, 4]",
        "explanation": "\"cat\" at 0 and \"act\" at 4 are permutations of \"act\"."
      },
      {
        "input": "seq = \"abab\", motif = \"ab\"",
        "output": "[0, 1, 2]",
        "explanation": "Matches at 0, 1, and 2."
      }
    ],
    "constraints": [
      "1 <= seq.length, motif.length <= 3 * 10^4"
    ],
    "starterCode": {
      "python": "def find_motif_offsets(seq: str, motif: str) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function findMotifOffsets(seq, motif) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> findMotifOffsets(String seq, String motif) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> findMotifOffsets(string seq, string motif) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "seq = \"catgactga\", motif = \"act\"",
        "expected": "[0, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "seq = \"abab\", motif = \"ab\"",
        "expected": "[0, 1, 2]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "gain-chain-subarray-budget",
    "title": "Audio Signal Gain-Chain Bounded Sub-Windows",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An audio DSP pipeline applies positive integer gain stages `gains`. Count how many contiguous sequences of stages have a combined multiplicative gain strictly less than `ceiling`.",
    "examples": [
      {
        "input": "gains = [2, 5, 3, 4], ceiling = 20",
        "output": "7",
        "explanation": "Valid contiguous chains with product < 20 total 7."
      },
      {
        "input": "gains = [5, 5], ceiling = 1",
        "output": "0",
        "explanation": "No positive product is < 1."
      }
    ],
    "constraints": [
      "1 <= gains.length <= 3 * 10^4",
      "1 <= gains[i] <= 1000"
    ],
    "starterCode": {
      "python": "def count_safe_gain_chains(gains: list[int], ceiling: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countSafeGainChains(gains, ceiling) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countSafeGainChains(int[] gains, int ceiling) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countSafeGainChains(vector<int>& gains, int ceiling) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "gains = [2, 5, 3, 4], ceiling = 20",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "gains = [5, 5], ceiling = 1",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "big-ledger-decimal-multiplier",
    "title": "Arbitrary-Precision Invoice String Multiplier",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Math",
      "Simulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A billing engine multiplies two non-negative decimal integer strings `a` and `b` without converting them directly to native big integers. Return their product as a decimal string.",
    "examples": [
      {
        "input": "a = \"25\", b = \"40\"",
        "output": "\"1000\"",
        "explanation": "25 * 40 = 1000."
      },
      {
        "input": "a = \"0\", b = \"98765\"",
        "output": "\"0\"",
        "explanation": "Zero product."
      }
    ],
    "constraints": [
      "1 <= a.length, b.length <= 200",
      "Digits only."
    ],
    "starterCode": {
      "python": "def multiply_decimal_strings(a: str, b: str) -> str:\n    # Write your solution here\n    return \"0\"\n",
      "javascript": "function multiplyDecimalStrings(a, b) {\n  // Write your solution here\n  return \"0\";\n}\n",
      "java": "class Solution {\n    public String multiplyDecimalStrings(String a, String b) {\n        // Write your solution here\n        return \"0\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string multiplyDecimalStrings(string a, string b) {\n        // Write your solution here\n        return \"0\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "a = \"25\", b = \"40\"",
        "expected": "\"1000\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "a = \"0\", b = \"98765\"",
        "expected": "\"0\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "bitstream-binary-adder",
    "title": "FPGA Bit-Register String Adder",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Bit Manipulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Two FPGA registers output unsigned binary strings `reg_a` and `reg_b`. Compute their binary sum and return it as a binary string without leading zeros (except `\"0\"`).",
    "examples": [
      {
        "input": "reg_a = \"101\", reg_b = \"11\"",
        "output": "\"1000\"",
        "explanation": "5 + 3 = 8 (1000)."
      },
      {
        "input": "reg_a = \"0\", reg_b = \"0\"",
        "output": "\"0\"",
        "explanation": "Zero sum."
      }
    ],
    "constraints": [
      "1 <= reg_a.length, reg_b.length <= 10^4"
    ],
    "starterCode": {
      "python": "def add_bit_registers(reg_a: str, reg_b: str) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function addBitRegisters(regA, regB) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String addBitRegisters(String regA, String regB) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string addBitRegisters(string regA, string regB) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "reg_a = \"101\", reg_b = \"11\"",
        "expected": "\"1000\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "reg_a = \"0\", reg_b = \"0\"",
        "expected": "\"0\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "pressure-sensor-lookback-span",
    "title": "Barometer Consecutive Lower-Or-Equal Span",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Monotonic Stack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A weather buoy logs daily barometric readings `readings`. For each day `i`, compute the maximum number of consecutive days ending at day `i` (inclusive) whose pressure was less than or equal to `readings[i]`.",
    "examples": [
      {
        "input": "readings = [100, 80, 60, 70, 60, 75, 85]",
        "output": "[1, 1, 1, 2, 1, 4, 6]",
        "explanation": "Day 6 (85) spans 6 consecutive days."
      },
      {
        "input": "readings = [50, 50, 50]",
        "output": "[1, 2, 3]",
        "explanation": "Equal readings extend the span."
      }
    ],
    "constraints": [
      "1 <= readings.length <= 10^4"
    ],
    "starterCode": {
      "python": "def barometer_spans(readings: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function barometerSpans(readings) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] barometerSpans(int[] readings) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> barometerSpans(vector<int>& readings) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "readings = [100, 80, 60, 70, 60, 75, 85]",
        "expected": "[1, 1, 1, 2, 1, 4, 6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "readings = [50, 50, 50]",
        "expected": "[1, 2, 3]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "floor-risk-subarray-floor-sum",
    "title": "Portfolio Contiguous Window Floor-Value Sum",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Monotonic Stack",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A risk engine evaluates every contiguous window of daily NAV values `navs` by its minimum value. Return the sum of the minimum value across all contiguous windows of `navs`, modulo `10^9 + 7`.",
    "examples": [
      {
        "input": "navs = [3, 1, 2, 4]",
        "output": "17",
        "explanation": "Sum of window minimums is 17."
      },
      {
        "input": "navs = [5]",
        "output": "5",
        "explanation": "Single window."
      }
    ],
    "constraints": [
      "1 <= navs.length <= 3 * 10^4",
      "1 <= navs[i] <= 3 * 10^4"
    ],
    "starterCode": {
      "python": "def sum_window_floors(navs: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function sumWindowFloors(navs) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int sumWindowFloors(int[] navs) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int sumWindowFloors(vector<int>& navs) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "navs = [3, 1, 2, 4]",
        "expected": "17",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "navs = [5]",
        "expected": "5",
        "isHidden": false
      }
    ]
  },
  {
    "id": "wafer-defect-free-rectangle",
    "title": "Silicon Wafer Largest Clean Rectangular Die",
    "difficulty": "Hard",
    "topics": [
      "Matrix",
      "Stack",
      "Monotonic Stack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A semiconductor wafer map `wafer` uses `'1'` for clean silicon cells and `'0'` for defective cells. Return the maximum area of an axis-aligned rectangle consisting entirely of `'1'`s.",
    "examples": [
      {
        "input": "wafer = [[\"1\",\"0\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\"],[\"0\",\"1\",\"1\",\"1\"]]",
        "output": "6",
        "explanation": "2x3 clean rectangle on the right has area 6."
      },
      {
        "input": "wafer = [[\"0\"]]",
        "output": "0",
        "explanation": "No clean cells."
      }
    ],
    "constraints": [
      "1 <= rows, cols <= 200"
    ],
    "starterCode": {
      "python": "def max_clean_die(wafer: list[list[str]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxCleanDie(wafer) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxCleanDie(char[][] wafer) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxCleanDie(vector<vector<char>>& wafer) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "wafer = [[\"1\",\"0\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\"],[\"0\",\"1\",\"1\",\"1\"]]",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "wafer = [[\"0\"]]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "formula-nested-signed-eval",
    "title": "Accounting Rule Nested Signed Evaluator",
    "difficulty": "Hard",
    "topics": [
      "Stack",
      "String",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Evaluate a valid financial rule string `rule` containing integers, `'+'`, `'-'`, `'('`, `')'`, and spaces, and return its integer result.",
    "examples": [
      {
        "input": "rule = \"10 - (3 + (4 - 2))\"",
        "output": "5",
        "explanation": "10 - (3 + 2) = 5."
      },
      {
        "input": "rule = \"-(5 + 7)\"",
        "output": "-12",
        "explanation": "Unary minus distributes across parentheses."
      }
    ],
    "constraints": [
      "1 <= rule.length <= 10^5"
    ],
    "starterCode": {
      "python": "def eval_signed_rule(rule: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function evalSignedRule(rule) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int evalSignedRule(String rule) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int evalSignedRule(string rule) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "rule = \"10 - (3 + (4 - 2))\"",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "rule = \"-(5 + 7)\"",
        "expected": "-12",
        "isHidden": false
      }
    ]
  },
  {
    "id": "message-broker-two-stack-fifo",
    "title": "Message Broker Two-Stack FIFO Simulator",
    "difficulty": "Easy",
    "topics": [
      "Stack",
      "Queue",
      "Design"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Implement a FIFO message queue using two LIFO stacks with amortized O(1) operations. Process `ops` (`[\"enq\", x]`, `[\"deq\"]`, `[\"front\"]`, `[\"isEmpty\"]`) and return all outputs produced by `deq`, `front`, and `isEmpty`.",
    "examples": [
      {
        "input": "ops = [[\"enq\", 10], [\"enq\", 20], [\"front\"], [\"deq\"], [\"isEmpty\"]]",
        "output": "[10, 10, false]",
        "explanation": "FIFO returns 10 first; 20 remains."
      },
      {
        "input": "ops = [[\"isEmpty\"], [\"enq\", 5], [\"deq\"], [\"isEmpty\"]]",
        "output": "[true, 5, true]",
        "explanation": "Empty before and after."
      }
    ],
    "constraints": [
      "1 <= ops.length <= 1000"
    ],
    "starterCode": {
      "python": "def run_broker_queue(ops: list[list]) -> list:\n    # Write your solution here\n    return []\n",
      "javascript": "function runBrokerQueue(ops) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Object> runBrokerQueue(List<List<Object>> ops) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> runBrokerQueue(vector<vector<string>>& ops) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ops = [[\"enq\", 10], [\"enq\", 20], [\"front\"], [\"deq\"], [\"isEmpty\"]]",
        "expected": "[10, 10, false]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ops = [[\"isEmpty\"], [\"enq\", 5], [\"deq\"], [\"isEmpty\"]]",
        "expected": "[true, 5, true]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "signal-adjacent-pair-cancel",
    "title": "Noise Filter Adjacent Duplicate Canceler",
    "difficulty": "Easy",
    "topics": [
      "Stack",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A glitch filter processes a lowercase symbol string `stream` by repeatedly canceling any two adjacent identical characters until none remain. Return the cleaned string.",
    "examples": [
      {
        "input": "stream = \"xbbxay\"",
        "output": "\"ay\"",
        "explanation": "bb cancels -> xx cancels -> ay."
      },
      {
        "input": "stream = \"abc\"",
        "output": "\"abc\"",
        "explanation": "No adjacent duplicates."
      }
    ],
    "constraints": [
      "1 <= stream.length <= 10^5"
    ],
    "starterCode": {
      "python": "def cancel_adjacent_pairs(stream: str) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function cancelAdjacentPairs(stream) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String cancelAdjacentPairs(String stream) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string cancelAdjacentPairs(string stream) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "stream = \"xbbxay\"",
        "expected": "\"ay\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "stream = \"abc\"",
        "expected": "\"abc\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "query-filter-paren-repair",
    "title": "Search Filter Minimal Parenthesis Repair",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A search query `query` contains lowercase letters, `'('`, and `')'`. Remove the minimum number of unmatched parentheses (dropping unmatched `')'` immediately and rightmost unmatched `'('` at the end) so the query is balanced, and return it.",
    "examples": [
      {
        "input": "query = \"a)b(c)d)\"",
        "output": "\"ab(c)d\"",
        "explanation": "Unmatched closing parens removed."
      },
      {
        "input": "query = \"))((\"",
        "output": "\"\"",
        "explanation": "All parens unmatched."
      }
    ],
    "constraints": [
      "1 <= query.length <= 10^5"
    ],
    "starterCode": {
      "python": "def repair_query_parens(query: str) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function repairQueryParens(query) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String repairQueryParens(String query) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string repairQueryParens(string query) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "query = \"a)b(c)d)\"",
        "expected": "\"ab(c)d\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "query = \"))((\"",
        "expected": "\"\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ast-nesting-weight-scorer",
    "title": "Balanced Scope Tree Nesting Scorer",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A compiler computes a complexity score for a balanced block string `blocks` (`'('` and `')'`) where `\"()\"` scores `1`, concatenated blocks `AB` score `A + B`, and nested `(A)` scores `2 * A`. Return the total score.",
    "examples": [
      {
        "input": "blocks = \"(()(()))\"",
        "output": "6",
        "explanation": "2 * (1 + 2*1) = 6."
      },
      {
        "input": "blocks = \"()()()\"",
        "output": "3",
        "explanation": "1 + 1 + 1 = 3."
      }
    ],
    "constraints": [
      "2 <= blocks.length <= 50",
      "Balanced parentheses."
    ],
    "starterCode": {
      "python": "def score_block_nesting(blocks: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function scoreBlockNesting(blocks) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int scoreBlockNesting(String blocks) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int scoreBlockNesting(string blocks) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "blocks = \"(()(()))\"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "blocks = \"()()()\"",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "pascal-binomial-risk-table",
    "title": "Actuarial Binomial Coefficient Triangle",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An actuarial modeling tool precomputes the first `tiers` rows of Pascal's binomial coefficient triangle. Return the triangle as a list of integer rows.",
    "examples": [
      {
        "input": "tiers = 4",
        "output": "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]",
        "explanation": "First 4 rows of binomial coefficients."
      },
      {
        "input": "tiers = 1",
        "output": "[[1]]",
        "explanation": "Single apex row."
      }
    ],
    "constraints": [
      "1 <= tiers <= 30"
    ],
    "starterCode": {
      "python": "def build_binomial_tiers(tiers: int) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function buildBinomialTiers(tiers) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> buildBinomialTiers(int tiers) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> buildBinomialTiers(int tiers) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tiers = 4",
        "expected": "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tiers = 1",
        "expected": "[[1]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "log-shard-inplace-merge",
    "title": "Sorted Log Buffer In-Place Tail Merge",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A pre-allocated sorted log buffer `buf` holds `m` valid timestamps followed by `n` trailing `0` slots. Merge a second sorted timestamp array `extra` (length `n`) into `buf` in-place in ascending order and return `buf`.",
    "examples": [
      {
        "input": "buf = [10, 30, 50, 0, 0], m = 3, extra = [20, 40], n = 2",
        "output": "[10, 20, 30, 40, 50]",
        "explanation": "Merged from back to front without extra allocation."
      },
      {
        "input": "buf = [0, 0], m = 0, extra = [5, 9], n = 2",
        "output": "[5, 9]",
        "explanation": "Copies extra into empty buffer."
      }
    ],
    "constraints": [
      "buf.length == m + n",
      "extra.length == n"
    ],
    "starterCode": {
      "python": "def merge_log_buffers(buf: list[int], m: int, extra: list[int], n: int) -> list[int]:\n    # Write your solution here\n    return buf\n",
      "javascript": "function mergeLogBuffers(buf, m, extra, n) {\n  // Write your solution here\n  return buf;\n}\n",
      "java": "class Solution {\n    public int[] mergeLogBuffers(int[] buf, int m, int[] extra, int n) {\n        // Write your solution here\n        return buf;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> mergeLogBuffers(vector<int>& buf, int m, vector<int>& extra, int n) {\n        // Write your solution here\n        return buf;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "buf = [10, 30, 50, 0, 0], m = 3, extra = [20, 40], n = 2",
        "expected": "[10, 20, 30, 40, 50]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "buf = [0, 0], m = 0, extra = [5, 9], n = 2",
        "expected": "[5, 9]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "campaign-budget-quad-match",
    "title": "Ad-Campaign Four-Channel Exact Spend",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "A marketing planner evaluates candidate channel budgets `budgets` (which may include rebates/negatives). Return all unique sorted quadruplets `[a, b, c, d]` from four distinct entries summing exactly to `goal`.",
    "examples": [
      {
        "input": "budgets = [1, 0, -1, 0, -2, 2], goal = 0",
        "output": "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]",
        "explanation": "Three distinct zero-sum quadruplets."
      },
      {
        "input": "budgets = [3, 3, 3, 3], goal = 12",
        "output": "[[3, 3, 3, 3]]",
        "explanation": "Single unique quadruplet."
      }
    ],
    "constraints": [
      "1 <= budgets.length <= 200"
    ],
    "starterCode": {
      "python": "def exact_quad_budgets(budgets: list[int], goal: int) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function exactQuadBudgets(budgets, goal) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> exactQuadBudgets(int[] budgets, int goal) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> exactQuadBudgets(vector<int>& budgets, int goal) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "budgets = [1, 0, -1, 0, -2, 2], goal = 0",
        "expected": "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "budgets = [3, 3, 3, 3], goal = 12",
        "expected": "[[3, 3, 3, 3]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "playlist-odd-even-lane-split",
    "title": "Audio Mixer Odd-Even Channel Regrouping",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A multi-track mixer receives sample IDs `samples` in a linked chain. Regroup all samples at odd 1-based positions first followed by all samples at even 1-based positions, preserving relative order within each group.",
    "examples": [
      {
        "input": "samples = [10, 20, 30, 40, 50]",
        "output": "[10, 30, 50, 20, 40]",
        "explanation": "Odd slots [10,30,50] precede even slots [20,40]."
      },
      {
        "input": "samples = []",
        "output": "[]",
        "explanation": "Empty chain."
      }
    ],
    "constraints": [
      "0 <= samples.length <= 10^4"
    ],
    "starterCode": {
      "python": "def regroup_channels(samples: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function regroupChannels(samples) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] regroupChannels(int[] samples) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> regroupChannels(vector<int>& samples) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "samples = [10, 20, 30, 40, 50]",
        "expected": "[10, 30, 50, 20, 40]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "samples = []",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ledger-adjacent-pair-swap",
    "title": "Double-Entry Tape Adjacent Pair Reversal",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Recursion"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A legacy data converter swaps every two adjacent entries in an entry stream `entries` (leaving a lone trailing entry untouched if the length is odd). Return the converted stream.",
    "examples": [
      {
        "input": "entries = [10, 20, 30, 40]",
        "output": "[20, 10, 40, 30]",
        "explanation": "Pairs (10,20) and (30,40) swap."
      },
      {
        "input": "entries = [1, 2, 3]",
        "output": "[2, 1, 3]",
        "explanation": "Final 3 stays in place."
      }
    ],
    "constraints": [
      "0 <= entries.length <= 1000"
    ],
    "starterCode": {
      "python": "def swap_adjacent_entries(entries: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function swapAdjacentEntries(entries) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] swapAdjacentEntries(int[] entries) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> swapAdjacentEntries(vector<int>& entries) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "entries = [10, 20, 30, 40]",
        "expected": "[20, 10, 40, 30]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "entries = [1, 2, 3]",
        "expected": "[2, 1, 3]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "priority-queue-threshold-partition",
    "title": "Ticket Queue Priority Threshold Partition",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A support queue holds ticket severity scores `scores`. Partition `scores` stably so all tickets with severity strictly less than `cutoff` come before tickets `>= cutoff`, preserving original arrival order inside both groups.",
    "examples": [
      {
        "input": "scores = [5, 2, 8, 1, 5, 3], cutoff = 5",
        "output": "[2, 1, 3, 5, 8, 5]",
        "explanation": "Scores < 5 ([2,1,3]) precede scores >= 5 ([5,8,5])."
      },
      {
        "input": "scores = [4, 2], cutoff = 3",
        "output": "[2, 4]",
        "explanation": "2 precedes 4."
      }
    ],
    "constraints": [
      "0 <= scores.length <= 2000"
    ],
    "starterCode": {
      "python": "def partition_tickets(scores: list[int], cutoff: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function partitionTickets(scores, cutoff) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] partitionTickets(int[] scores, int cutoff) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> partitionTickets(vector<int>& scores, int cutoff) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "scores = [5, 2, 8, 1, 5, 3], cutoff = 5",
        "expected": "[2, 1, 3, 5, 8, 5]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "scores = [4, 2], cutoff = 3",
        "expected": "[2, 4]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sorted-feed-k-way-aggregator",
    "title": "Multi-Exchange K-Way Sorted Feed Merger",
    "difficulty": "Hard",
    "topics": [
      "Heap",
      "Linked List",
      "Divide and Conquer"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An aggregator receives `k` already-sorted ascending timestamp arrays in `feeds`. Merge all `k` feeds into one globally sorted ascending array in `O(N log k)` time.",
    "examples": [
      {
        "input": "feeds = [[1, 5, 9], [2, 6], [0, 3, 8]]",
        "output": "[0, 1, 2, 3, 5, 6, 8, 9]",
        "explanation": "All three sorted streams merged."
      },
      {
        "input": "feeds = [[], []]",
        "output": "[]",
        "explanation": "All empty feeds."
      }
    ],
    "constraints": [
      "0 <= feeds.length <= 10^4",
      "Total elements <= 10^4."
    ],
    "starterCode": {
      "python": "def merge_sorted_feeds(feeds: list[list[int]]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function mergeSortedFeeds(feeds) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] mergeSortedFeeds(int[][] feeds) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> mergeSortedFeeds(vector<vector<int>>& feeds) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "feeds = [[1, 5, 9], [2, 6], [0, 3, 8]]",
        "expected": "[0, 1, 2, 3, 5, 6, 8, 9]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "feeds = [[], []]",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "catalog-sorted-insert-slot",
    "title": "Sorted Catalog Binary Insertion Slot",
    "difficulty": "Easy",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A catalog stores strictly increasing integer product IDs in `ids`. Given a `new_id`, return its index if already present, or the index where it should be inserted to preserve sorted order, in `O(log n)` time.",
    "examples": [
      {
        "input": "ids = [10, 20, 30, 40], new_id = 25",
        "output": "2",
        "explanation": "25 belongs at index 2."
      },
      {
        "input": "ids = [10, 20, 30], new_id = 50",
        "output": "3",
        "explanation": "Appends at index 3."
      }
    ],
    "constraints": [
      "1 <= ids.length <= 10^4",
      "Strictly increasing."
    ],
    "starterCode": {
      "python": "def catalog_insert_slot(ids: list[int], new_id: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function catalogInsertSlot(ids, newId) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int catalogInsertSlot(int[] ids, int newId) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int catalogInsertSlot(vector<int>& ids, int newId) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ids = [10, 20, 30, 40], new_id = 25",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ids = [10, 20, 30], new_id = 50",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "tile-mosaic-square-side",
    "title": "Floor Tile Maximum Square Dimension",
    "difficulty": "Easy",
    "topics": [
      "Binary Search",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A contractor has `tiles` identical 1x1 ceramic tiles and wants to lay the largest possible solid square patio (`side * side <= tiles`). Return the integer `side` without using built-in square root functions.",
    "examples": [
      {
        "input": "tiles = 20",
        "output": "4",
        "explanation": "4x4 = 16 <= 20 < 25 = 5x5."
      },
      {
        "input": "tiles = 0",
        "output": "0",
        "explanation": "Zero tiles form side 0."
      }
    ],
    "constraints": [
      "0 <= tiles <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def max_square_side(tiles: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxSquareSide(tiles) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxSquareSide(int tiles) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSquareSide(int tiles) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tiles = 20",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tiles = 0",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "serial-concat-max-badge",
    "title": "Asset Tag Maximum Concatenated Code",
    "difficulty": "Medium",
    "topics": [
      "Sorting",
      "String",
      "Greedy"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a list of non-negative integer fragment codes `frags`, arrange and concatenate them to produce the numerically largest possible string code.",
    "examples": [
      {
        "input": "frags = [9, 34, 30, 3, 5]",
        "output": "\"9534330\"",
        "explanation": "Optimal concatenation order."
      },
      {
        "input": "frags = [0, 0, 0]",
        "output": "\"0\"",
        "explanation": "Collapse all-zero result to \"0\"."
      }
    ],
    "constraints": [
      "1 <= frags.length <= 200",
      "0 <= frags[i] <= 10^9"
    ],
    "starterCode": {
      "python": "def max_concat_code(frags: list[int]) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function maxConcatCode(frags) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String maxConcatCode(int[] frags) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string maxConcatCode(vector<int>& frags) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "frags = [9, 34, 30, 3, 5]",
        "expected": "\"9534330\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "frags = [0, 0, 0]",
        "expected": "\"0\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "audio-wave-alternating-peaks",
    "title": "Waveform Alternating Valley-Peak Reorder",
    "difficulty": "Medium",
    "topics": [
      "Sorting",
      "Greedy",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an integer amplitude array `amps`, reorder it in-place in one linear pass so `amps[0] <= amps[1] >= amps[2] <= amps[3] ...` by swapping adjacent out-of-order pairs, and return `amps`.",
    "examples": [
      {
        "input": "amps = [3, 5, 2, 1, 6, 4]",
        "output": "[3, 5, 1, 6, 2, 4]",
        "explanation": "Satisfies alternating <= and >=."
      },
      {
        "input": "amps = [1, 2, 3, 4]",
        "output": "[1, 3, 2, 4]",
        "explanation": "Swaps (2, 3) to satisfy wiggle pattern."
      }
    ],
    "constraints": [
      "1 <= amps.length <= 5 * 10^4"
    ],
    "starterCode": {
      "python": "def wiggle_amplitudes(amps: list[int]) -> list[int]:\n    # Write your solution here\n    return amps\n",
      "javascript": "function wiggleAmplitudes(amps) {\n  // Write your solution here\n  return amps;\n}\n",
      "java": "class Solution {\n    public int[] wiggleAmplitudes(int[] amps) {\n        // Write your solution here\n        return amps;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> wiggleAmplitudes(vector<int>& amps) {\n        // Write your solution here\n        return amps;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "amps = [3, 5, 2, 1, 6, 4]",
        "expected": "[3, 5, 1, 6, 2, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "amps = [1, 2, 3, 4]",
        "expected": "[1, 3, 2, 4]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "auction-trailing-lower-bids",
    "title": "Auction Feed Trailing Lower-Bid Counter",
    "difficulty": "Hard",
    "topics": [
      "Binary Indexed Tree",
      "Divide and Conquer",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given chronological auction bids `bids`, return an array `lower_after` where `lower_after[i]` is the count of strictly lower bids submitted after bid `i` (`j > i` and `bids[j] < bids[i]`).",
    "examples": [
      {
        "input": "bids = [50, 20, 60, 10]",
        "output": "[2, 1, 1, 0]",
        "explanation": "After 50: 20,10 (2); after 20: 10 (1); after 60: 10 (1)."
      },
      {
        "input": "bids = [10, 20, 30]",
        "output": "[0, 0, 0]",
        "explanation": "Bids strictly increase."
      }
    ],
    "constraints": [
      "1 <= bids.length <= 10^5"
    ],
    "starterCode": {
      "python": "def count_lower_bids_after(bids: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function countLowerBidsAfter(bids) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> countLowerBidsAfter(int[] bids) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> countLowerBidsAfter(vector<int>& bids) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "bids = [50, 20, 60, 10]",
        "expected": "[2, 1, 1, 0]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "bids = [10, 20, 30]",
        "expected": "[0, 0, 0]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "price-crash-double-inversion-pairs",
    "title": "Market Crash Double-Drop Pair Counter",
    "difficulty": "Hard",
    "topics": [
      "Divide and Conquer",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given chronological asset prices `prices`, count the number of severe crash pairs `(i, j)` such that `i < j` and `prices[i] > 2 * prices[j]`.",
    "examples": [
      {
        "input": "prices = [10, 30, 20, 30, 10]",
        "output": "2",
        "explanation": "(1, 4): 30 > 20 and (3, 4): 30 > 20."
      },
      {
        "input": "prices = [2, 4, 3, 5, 1]",
        "output": "3",
        "explanation": "4, 3, and 5 all exceed 2 * 1."
      }
    ],
    "constraints": [
      "1 <= prices.length <= 5 * 10^4"
    ],
    "starterCode": {
      "python": "def count_crash_pairs(prices: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countCrashPairs(prices) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countCrashPairs(int[] prices) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countCrashPairs(vector<int>& prices) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "prices = [10, 30, 20, 30, 10]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "prices = [2, 4, 3, 5, 1]",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "tree-schema-equality-check",
    "title": "Config AST Structural Equality Check",
    "difficulty": "Easy",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Two binary configuration ASTs are serialized in level-order as `ast_a` and `ast_b`. Return `true` iff they have identical shape and matching node values at every position.",
    "examples": [
      {
        "input": "ast_a = [1, 2, 3], ast_b = [1, 2, 3]",
        "output": "true",
        "explanation": "Identical ASTs."
      },
      {
        "input": "ast_a = [1, 2], ast_b = [1, null, 2]",
        "output": "false",
        "explanation": "Child positions differ."
      }
    ],
    "constraints": [
      "0 <= nodes <= 200"
    ],
    "starterCode": {
      "python": "def same_config_ast(ast_a: list, ast_b: list) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function sameConfigAst(astA, astB) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean sameConfigAst(List<Integer> astA, List<Integer> astB) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool sameConfigAst(vector<optional<int>>& astA, vector<optional<int>>& astB) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ast_a = [1, 2, 3], ast_b = [1, 2, 3]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ast_a = [1, 2], ast_b = [1, null, 2]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "load-balancer-tree-symmetry",
    "title": "Load-Balancer Tree Mirror Symmetry Check",
    "difficulty": "Easy",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A binary routing tree is serialized in level-order as `tree`. Return `true` iff the left and right subtrees of the root are exact mirror images of each other.",
    "examples": [
      {
        "input": "tree = [1, 2, 2, 3, 4, 4, 3]",
        "output": "true",
        "explanation": "Symmetric around center."
      },
      {
        "input": "tree = [1, 2, 2, null, 3, null, 3]",
        "output": "false",
        "explanation": "Not mirrored."
      }
    ],
    "constraints": [
      "1 <= nodes <= 1000"
    ],
    "starterCode": {
      "python": "def is_mirror_topology(tree: list) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isMirrorTopology(tree) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isMirrorTopology(List<Integer> tree) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isMirrorTopology(vector<optional<int>>& tree) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [1, 2, 2, 3, 4, 4, 3]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [1, 2, 2, null, 3, null, 3]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sharding-tree-height-balance",
    "title": "Shard Tree Height-Balance Verifier",
    "difficulty": "Easy",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A binary partition tree is given in level-order `tree`. Return `true` iff for every node the heights of its left and right subtrees differ by at most `1`.",
    "examples": [
      {
        "input": "tree = [1, 2, 3, 4, 5]",
        "output": "true",
        "explanation": "All subtree height diffs <= 1."
      },
      {
        "input": "tree = [1, 2, null, 3, null, 4]",
        "output": "false",
        "explanation": "Left-skewed chain is unbalanced."
      }
    ],
    "constraints": [
      "0 <= nodes <= 5000"
    ],
    "starterCode": {
      "python": "def is_height_balanced(tree: list) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isHeightBalanced(tree) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isHeightBalanced(List<Integer> tree) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isHeightBalanced(vector<optional<int>>& tree) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [1, 2, 3, 4, 5]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [1, 2, null, 3, null, 4]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "budget-tree-exact-leaf-sum",
    "title": "Budget Allocation Root-to-Leaf Target Check",
    "difficulty": "Easy",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A binary cost tree is given in level-order `tree`. Return `true` iff there exists a path from the root to any leaf whose node values sum exactly to `budget`.",
    "examples": [
      {
        "input": "tree = [5, 4, 8, 11, null, 13, 4, 7, 2], budget = 22",
        "output": "true",
        "explanation": "5 + 4 + 11 + 2 = 22."
      },
      {
        "input": "tree = [1, 2], budget = 1",
        "output": "false",
        "explanation": "Root 1 is not a leaf."
      }
    ],
    "constraints": [
      "0 <= nodes <= 5000"
    ],
    "starterCode": {
      "python": "def has_budget_path(tree: list, budget: int) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function hasBudgetPath(tree, budget) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean hasBudgetPath(List<Integer> tree, int budget) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool hasBudgetPath(vector<optional<int>>& tree, int budget) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [5, 4, 8, 11, null, 13, 4, 7, 2], budget = 22",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [1, 2], budget = 1",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "skyline-tree-right-profile",
    "title": "Hierarchy Tree Right-Edge Profile",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "BFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary tree in level-order `tree`, return the value of the rightmost node at every depth level from top to bottom.",
    "examples": [
      {
        "input": "tree = [1, 2, 3, null, 5, null, 4]",
        "output": "[1, 3, 4]",
        "explanation": "Rightmost nodes per level are 1, 3, 4."
      },
      {
        "input": "tree = [1, 2, 3, 4]",
        "output": "[1, 3, 4]",
        "explanation": "Node 4 is the only node on level 2."
      }
    ],
    "constraints": [
      "0 <= nodes <= 1000"
    ],
    "starterCode": {
      "python": "def right_edge_profile(tree: list) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function rightEdgeProfile(tree) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> rightEdgeProfile(List<Integer> tree) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> rightEdgeProfile(vector<optional<int>>& tree) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [1, 2, 3, null, 5, null, 4]",
        "expected": "[1, 3, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [1, 2, 3, 4]",
        "expected": "[1, 3, 4]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "printer-zigzag-tier-order",
    "title": "Bi-Directional Printhead Tree Tier Sweep",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "BFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A bi-directional plotter prints nodes of a binary tree (`tree` in level-order) alternating sweep directions: left-to-right on even levels and right-to-left on odd levels. Return the grouped tier lists.",
    "examples": [
      {
        "input": "tree = [3, 9, 20, null, null, 15, 7]",
        "output": "[[3], [20, 9], [15, 7]]",
        "explanation": "Level 1 sweeps right-to-left."
      },
      {
        "input": "tree = []",
        "output": "[]",
        "explanation": "Empty tree."
      }
    ],
    "constraints": [
      "0 <= nodes <= 2000"
    ],
    "starterCode": {
      "python": "def zigzag_tier_sweep(tree: list) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function zigzagTierSweep(tree) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> zigzagTierSweep(List<Integer> tree) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> zigzagTierSweep(vector<optional<int>>& tree) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [3, 9, 20, null, null, 15, 7]",
        "expected": "[[3], [20, 9], [15, 7]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = []",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "telemetry-tree-dominant-nodes",
    "title": "Telemetry Tree Path-Dominant Node Count",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "In a binary telemetry tree (`tree` in level-order), a node is dominant if no ancestor on the path from the root to that node has a strictly larger value. Return the total count of dominant nodes.",
    "examples": [
      {
        "input": "tree = [3, 1, 4, 3, null, 1, 5]",
        "output": "4",
        "explanation": "Dominant nodes: 3(root), 3, 4, 5."
      },
      {
        "input": "tree = [-2, -5, -1]",
        "output": "2",
        "explanation": "Root -2 and right child -1 are dominant."
      }
    ],
    "constraints": [
      "1 <= nodes <= 10^4"
    ],
    "starterCode": {
      "python": "def count_dominant_nodes(tree: list) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countDominantNodes(tree) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countDominantNodes(List<Integer> tree) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countDominantNodes(vector<optional<int>>& tree) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [3, 1, 4, 3, null, 1, 5]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [-2, -5, -1]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "lineage-tree-common-ancestor",
    "title": "Genealogy Binary Tree Common Ancestor",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a general binary tree of unique IDs in level-order `tree` and two IDs `x` and `y` present in the tree, return the ID of their Lowest Common Ancestor.",
    "examples": [
      {
        "input": "tree = [3, 5, 1, 6, 2, 0, 8], x = 6, y = 2",
        "output": "5",
        "explanation": "6 and 2 meet at ancestor 5."
      },
      {
        "input": "tree = [3, 5, 1], x = 3, y = 1",
        "output": "3",
        "explanation": "Root 3 is an ancestor of 1."
      }
    ],
    "constraints": [
      "2 <= nodes <= 10^4",
      "All IDs unique."
    ],
    "starterCode": {
      "python": "def common_lineage_node(tree: list, x: int, y: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function commonLineageNode(tree, x, y) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int commonLineageNode(List<Integer> tree, int x, int y) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int commonLineageNode(vector<optional<int>>& tree, int x, int y) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [3, 5, 1, 6, 2, 0, 8], x = 6, y = 2",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [3, 5, 1], x = 3, y = 1",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "digit-tree-path-checksum",
    "title": "Trie-Digit Tree Root-to-Leaf Checksum",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A binary tree of single decimal digits (`0..9`) is serialized in level-order `tree`. Each root-to-leaf path forms a decimal integer. Return the sum of all root-to-leaf decimal integers.",
    "examples": [
      {
        "input": "tree = [1, 2, 3]",
        "output": "25",
        "explanation": "12 + 13 = 25."
      },
      {
        "input": "tree = [4, 9, 0, 5, 1]",
        "output": "1026",
        "explanation": "495 + 491 + 40 = 1026."
      }
    ],
    "constraints": [
      "1 <= nodes <= 1000",
      "0 <= val <= 9"
    ],
    "starterCode": {
      "python": "def sum_leaf_codes(tree: list) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function sumLeafCodes(tree) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int sumLeafCodes(List<Integer> tree) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int sumLeafCodes(vector<optional<int>>& tree) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [1, 2, 3]",
        "expected": "25",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [4, 9, 0, 5, 1]",
        "expected": "1026",
        "isHidden": false
      }
    ]
  },
  {
    "id": "pixel-canvas-region-recolor",
    "title": "Vector Editor Connected Pixel Bucket Fill",
    "difficulty": "Easy",
    "topics": [
      "Graph",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "In an `m x n` integer pixel map `canvas`, clicking pixel `(sr, sc)` with paint `paint` recolors all 4-directionally connected pixels sharing the original color of `(sr, sc)`. Return the updated `canvas`.",
    "examples": [
      {
        "input": "canvas = [[1, 1, 0], [1, 0, 0], [0, 0, 1]], sr = 0, sc = 0, paint = 9",
        "output": "[[9, 9, 0], [9, 0, 0], [0, 0, 1]]",
        "explanation": "Connected top-left 1s become 9."
      },
      {
        "input": "canvas = [[2, 2]], sr = 0, sc = 0, paint = 2",
        "output": "[[2, 2]]",
        "explanation": "Same color leaves canvas unchanged."
      }
    ],
    "constraints": [
      "1 <= m, n <= 100"
    ],
    "starterCode": {
      "python": "def bucket_fill(canvas: list[list[int]], sr: int, sc: int, paint: int) -> list[list[int]]:\n    # Write your solution here\n    return canvas\n",
      "javascript": "function bucketFill(canvas, sr, sc, paint) {\n  // Write your solution here\n  return canvas;\n}\n",
      "java": "class Solution {\n    public int[][] bucketFill(int[][] canvas, int sr, int sc, int paint) {\n        // Write your solution here\n        return canvas;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> bucketFill(vector<vector<int>>& canvas, int sr, int sc, int paint) {\n        // Write your solution here\n        return canvas;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "canvas = [[1, 1, 0], [1, 0, 0], [0, 0, 1]], sr = 0, sc = 0, paint = 9",
        "expected": "[[9, 9, 0], [9, 0, 0], [0, 0, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "canvas = [[2, 2]], sr = 0, sc = 0, paint = 2",
        "expected": "[[2, 2]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "reef-satellite-largest-coral",
    "title": "Marine Survey Largest Connected Reef Patch",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A satellite sonar map `reef` uses `1` for living coral cells and `0` for open sand. Return the area (cell count) of the largest 4-directionally connected coral patch, or `0` if none exists.",
    "examples": [
      {
        "input": "reef = [[0, 1, 1], [0, 1, 0], [1, 0, 1]]",
        "output": "3",
        "explanation": "Largest patch has 3 connected cells."
      },
      {
        "input": "reef = [[0, 0]]",
        "output": "0",
        "explanation": "No coral cells."
      }
    ],
    "constraints": [
      "1 <= m, n <= 100"
    ],
    "starterCode": {
      "python": "def largest_reef_patch(reef: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function largestReefPatch(reef) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int largestReefPatch(int[][] reef) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int largestReefPatch(vector<vector<int>>& reef) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "reef = [[0, 1, 1], [0, 1, 0], [1, 0, 1]]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "reef = [[0, 0]]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "quarantine-zone-enclosed-capture",
    "title": "Bio-Containment Enclosed Zone Sealing",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A containment grid `zone` marks barriers as `'X'` and open chambers as `'O'`. Seal (`'O' -> 'X'`) every chamber region that cannot reach the outer grid border via 4-directional `'O'` steps, and return `zone`.",
    "examples": [
      {
        "input": "zone = [[\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\"],[\"X\",\"X\",\"X\"]]",
        "output": "[[\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\"]]",
        "explanation": "Center 'O' is completely enclosed."
      },
      {
        "input": "zone = [[\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\"],[\"X\",\"X\",\"X\"]]",
        "output": "[[\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\"],[\"X\",\"X\",\"X\"]]",
        "explanation": "Connected to top border so remains open."
      }
    ],
    "constraints": [
      "1 <= m, n <= 200"
    ],
    "starterCode": {
      "python": "def seal_enclosed_zones(zone: list[list[str]]) -> list[list[str]]:\n    # Write your solution here\n    return zone\n",
      "javascript": "function sealEnclosedZones(zone) {\n  // Write your solution here\n  return zone;\n}\n",
      "java": "class Solution {\n    public char[][] sealEnclosedZones(char[][] zone) {\n        // Write your solution here\n        return zone;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<char>> sealEnclosedZones(vector<vector<char>>& zone) {\n        // Write your solution here\n        return zone;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "zone = [[\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\"],[\"X\",\"X\",\"X\"]]",
        "expected": "[[\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\"]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "zone = [[\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\"],[\"X\",\"X\",\"X\"]]",
        "expected": "[[\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\"],[\"X\",\"X\",\"X\"]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "watershed-dual-basin-ridge",
    "title": "Continental Divide Dual-Basin Watershed Cells",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "In an `m x n` elevation map `terrain`, rainwater flows to 4-directional neighbors of equal or lower elevation. Top/left borders drain to the North Basin and bottom/right borders drain to the South Basin. Return all `[r, c]` cells that drain to both basins.",
    "examples": [
      {
        "input": "terrain = [[1, 2], [2, 1]]",
        "output": "[[0, 1], [1, 0]]",
        "explanation": "High cells (0,1) and (1,0) drain to both basins."
      },
      {
        "input": "terrain = [[5]]",
        "output": "[[0, 0]]",
        "explanation": "Single cell touches both borders."
      }
    ],
    "constraints": [
      "1 <= m, n <= 200"
    ],
    "starterCode": {
      "python": "def dual_basin_cells(terrain: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function dualBasinCells(terrain) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> dualBasinCells(int[][] terrain) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> dualBasinCells(vector<vector<int>>& terrain) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "terrain = [[1, 2], [2, 1]]",
        "expected": "[[0, 1], [1, 0]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "terrain = [[5]]",
        "expected": "[[0, 0]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "workflow-dag-all-execution-paths",
    "title": "Workflow Engine All Start-to-Finish Paths",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "DFS",
      "Backtracking"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "A CI workflow DAG has stages `0..n-1` given as adjacency list `stages`. Enumerate all distinct execution paths from stage `0` to final stage `n - 1`.",
    "examples": [
      {
        "input": "stages = [[1, 2], [3], [3], []]",
        "output": "[[0, 1, 3], [0, 2, 3]]",
        "explanation": "Two parallel paths reach stage 3."
      },
      {
        "input": "stages = [[1], []]",
        "output": "[[0, 1]]",
        "explanation": "Single direct path."
      }
    ],
    "constraints": [
      "2 <= stages.length <= 15",
      "Acyclic directed graph."
    ],
    "starterCode": {
      "python": "def all_workflow_paths(stages: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function allWorkflowPaths(stages) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> allWorkflowPaths(int[][] stages) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> allWorkflowPaths(vector<vector<int>>& stages) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "stages = [[1, 2], [3], [3], []]",
        "expected": "[[0, 1, 3], [0, 2, 3]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "stages = [[1], []]",
        "expected": "[[0, 1]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "vault-badge-full-access-check",
    "title": "Facility Security Full Vault Reachability",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A research lab has `n` vaults (`0..n-1`); only vault `0` starts unlocked. `badges[i]` lists the vault numbers whose keycards are stored inside vault `i`. Return `true` if a technician can open every vault.",
    "examples": [
      {
        "input": "badges = [[1], [2], [3], []]",
        "output": "true",
        "explanation": "0 -> 1 -> 2 -> 3 opens all 4 vaults."
      },
      {
        "input": "badges = [[1], [0], [3], [2]]",
        "output": "false",
        "explanation": "Vaults 2 and 3 are unreachable from 0."
      }
    ],
    "constraints": [
      "1 <= badges.length <= 1000"
    ],
    "starterCode": {
      "python": "def can_open_all_vaults(badges: list[list[int]]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function canOpenAllVaults(badges) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean canOpenAllVaults(List<List<Integer>> badges) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canOpenAllVaults(vector<vector<int>>& badges) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "badges = [[1], [2], [3], []]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "badges = [[1], [0], [3], [2]]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "state-machine-guaranteed-halt-nodes",
    "title": "Protocol State Machine Guaranteed-Halt States",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "Topological Sort",
      "BFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A finite state machine is given as directed adjacency list `trans`. A state is guaranteed-halting if every possible transition path from it ends at a terminal state (a state with `0` outgoing edges). Return all guaranteed-halting state indices in ascending order.",
    "examples": [
      {
        "input": "trans = [[1, 2], [2, 3], [5], [0], [5], [], []]",
        "output": "[2, 4, 5, 6]",
        "explanation": "States 0, 1, 3 can loop forever."
      },
      {
        "input": "trans = [[0]]",
        "output": "[]",
        "explanation": "Self-loop never halts."
      }
    ],
    "constraints": [
      "1 <= trans.length <= 10^4"
    ],
    "starterCode": {
      "python": "def halting_states(trans: list[list[int]]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function haltingStates(trans) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> haltingStates(int[][] trans) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> haltingStates(vector<vector<int>>& trans) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "trans = [[1, 2], [2, 3], [5], [0], [5], [], []]",
        "expected": "[2, 4, 5, 6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "trans = [[0]]",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "unknown-script-lexicon-order",
    "title": "Ciphered Archive Alphabet Order Recovery",
    "difficulty": "Hard",
    "topics": [
      "Graph",
      "Topological Sort",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An archived list of lowercase words `entries` is sorted according to a custom alphabet permutation. Recover the lexicographically smallest valid alphabet string consistent with `entries`, or return `\"\"` if `entries` is contradictory.",
    "examples": [
      {
        "input": "entries = [\"wrt\", \"wrf\", \"er\", \"ett\", \"rftt\"]",
        "output": "\"wertf\"",
        "explanation": "Precedence constraints yield \"wertf\"."
      },
      {
        "input": "entries = [\"abc\", \"ab\"]",
        "output": "\"\"",
        "explanation": "Longer prefix word cannot precede shorter prefix."
      }
    ],
    "constraints": [
      "1 <= entries.length <= 100"
    ],
    "starterCode": {
      "python": "def recover_alphabet(entries: list[str]) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function recoverAlphabet(entries) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String recoverAlphabet(String[] entries) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string recoverAlphabet(vector<string>& entries) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "entries = [\"wrt\", \"wrf\", \"er\", \"ett\", \"rftt\"]",
        "expected": "\"wertf\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "entries = [\"abc\", \"ab\"]",
        "expected": "\"\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "network-cluster-island-count",
    "title": "Peer Mesh Isolated Cluster Counter",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "Union Find"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A cluster has `n` nodes (`0..n-1`) and undirected peer connections `links`. Return the number of separate connected server clusters.",
    "examples": [
      {
        "input": "n = 5, links = [[0, 1], [1, 2], [3, 4]]",
        "output": "2",
        "explanation": "Clusters {0,1,2} and {3,4}."
      },
      {
        "input": "n = 4, links = []",
        "output": "4",
        "explanation": "Four isolated servers."
      }
    ],
    "constraints": [
      "1 <= n <= 5000"
    ],
    "starterCode": {
      "python": "def count_server_clusters(n: int, links: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countServerClusters(n, links) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countServerClusters(int n, int[][] links) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countServerClusters(int n, vector<vector<int>>& links) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 5, links = [[0, 1], [1, 2], [3, 4]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 4, links = []",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "dictionary-one-char-hop-distance",
    "title": "Codeword Single-Mutation Shortest Chain",
    "difficulty": "Hard",
    "topics": [
      "Graph",
      "BFS",
      "Hash Table",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given equal-length codewords `start_code`, `end_code`, and a whitelist `allowed`, each step mutates exactly one character to produce another word in `allowed`. Return the minimum number of words in the chain from `start_code` to `end_code` (inclusive), or `0` if impossible.",
    "examples": [
      {
        "input": "start_code = \"hit\", end_code = \"cog\", allowed = [\"hot\", \"dot\", \"dog\", \"lot\", \"log\", \"cog\"]",
        "output": "5",
        "explanation": "hit -> hot -> dot -> dog -> cog (5 words)."
      },
      {
        "input": "start_code = \"cat\", end_code = \"dog\", allowed = [\"cot\", \"cog\"]",
        "output": "0",
        "explanation": "\"dog\" is not in allowed."
      }
    ],
    "constraints": [
      "1 <= start_code.length <= 10",
      "1 <= allowed.length <= 5000"
    ],
    "starterCode": {
      "python": "def min_mutation_chain(start_code: str, end_code: str, allowed: list[str]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minMutationChain(startCode, endCode, allowed) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minMutationChain(String startCode, String endCode, List<String> allowed) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minMutationChain(string startCode, string endCode, vector<string>& allowed) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "start_code = \"hit\", end_code = \"cog\", allowed = [\"hot\", \"dot\", \"dog\", \"lot\", \"log\", \"cog\"]",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "start_code = \"cat\", end_code = \"dog\", allowed = [\"cot\", \"cog\"]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "deployment-order-all-permutations",
    "title": "Microservice Rollout All Deployment Orders",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given a list of unique service IDs `services`, return all possible sequential rollout permutations in any order.",
    "examples": [
      {
        "input": "services = [1, 2, 3]",
        "output": "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
        "explanation": "All 6 rollout orders."
      },
      {
        "input": "services = [9]",
        "output": "[[9]]",
        "explanation": "Single service."
      }
    ],
    "constraints": [
      "1 <= services.length <= 6"
    ],
    "starterCode": {
      "python": "def all_rollout_orders(services: list[int]) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function allRolloutOrders(services) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> allRolloutOrders(int[] services) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> allRolloutOrders(vector<int>& services) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "services = [1, 2, 3]",
        "expected": "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "services = [9]",
        "expected": "[[9]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "keypad-mnemonic-all-codes",
    "title": "IVR Phone-Tree Letter Mnemonic Generator",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "String",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "An IVR hotline maps keypad digits `'2'`–`'9'` to standard phone letters (`2->abc, ..., 9->wxyz`). Given a digit string `keys`, return all possible letter mnemonics, or `[]` if `keys` is empty.",
    "examples": [
      {
        "input": "keys = \"23\"",
        "output": "[\"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\"]",
        "explanation": "Cartesian product of abc and def."
      },
      {
        "input": "keys = \"\"",
        "output": "[]",
        "explanation": "Empty keypad sequence."
      }
    ],
    "constraints": [
      "0 <= keys.length <= 4"
    ],
    "starterCode": {
      "python": "def keypad_mnemonics(keys: str) -> list[str]:\n    # Write your solution here\n    return []\n",
      "javascript": "function keypadMnemonics(keys) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<String> keypadMnemonics(String keys) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> keypadMnemonics(string keys) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "keys = \"23\"",
        "expected": "[\"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "keys = \"\"",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "balanced-tag-pair-generator",
    "title": "Fuzz Tester Balanced Delimiter Generator",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "A parser fuzzer needs every valid balanced string consisting of `pairs` pairs of `'('` and `')'`. Return all well-formed combinations.",
    "examples": [
      {
        "input": "pairs = 2",
        "output": "[\"(())\", \"()()\"]",
        "explanation": "Two balanced 2-pair strings."
      },
      {
        "input": "pairs = 1",
        "output": "[\"()\"]",
        "explanation": "One pair."
      }
    ],
    "constraints": [
      "1 <= pairs <= 8"
    ],
    "starterCode": {
      "python": "def fuzz_balanced_pairs(pairs: int) -> list[str]:\n    # Write your solution here\n    return []\n",
      "javascript": "function fuzzBalancedPairs(pairs) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<String> fuzzBalancedPairs(int pairs) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> fuzzBalancedPairs(int pairs) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "pairs = 2",
        "expected": "[\"(())\", \"()()\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "pairs = 1",
        "expected": "[\"()\"]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "boggle-sensor-grid-trace",
    "title": "PCB Letter-Matrix Signature Tracer",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Matrix",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an `m x n` character grid `board` and a target signature string `sig`, return `true` if `sig` can be traced across 4-directionally adjacent cells without reusing any cell.",
    "examples": [
      {
        "input": "board = [[\"C\",\"A\",\"T\"],[\"X\",\"R\",\"E\"],[\"Z\",\"S\",\"T\"]], sig = \"CARE\"",
        "output": "true",
        "explanation": "C(0,0)->A(0,1)->R(1,1)->E(1,2)."
      },
      {
        "input": "board = [[\"A\",\"B\"],[\"C\",\"D\"]], sig = \"ABA\"",
        "output": "false",
        "explanation": "Cannot revisit cell A."
      }
    ],
    "constraints": [
      "1 <= m, n <= 6",
      "1 <= sig.length <= 15"
    ],
    "starterCode": {
      "python": "def trace_grid_signature(board: list[list[str]], sig: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function traceGridSignature(board, sig) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean traceGridSignature(char[][] board, String sig) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool traceGridSignature(vector<vector<char>>& board, string sig) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "board = [[\"C\",\"A\",\"T\"],[\"X\",\"R\",\"E\"],[\"Z\",\"S\",\"T\"]], sig = \"CARE\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "board = [[\"A\",\"B\"],[\"C\",\"D\"]], sig = \"ABA\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "stream-label-minimal-cuts",
    "title": "Log Stream Non-Overlapping Event Shards",
    "difficulty": "Medium",
    "topics": [
      "Greedy",
      "Two Pointers",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A log stream `events` consists of lowercase event-type letters. Partition `events` into as many contiguous shards as possible so that each event type appears in at most one shard. Return the list of shard lengths.",
    "examples": [
      {
        "input": "events = \"abacdc\"",
        "output": "[3, 3]",
        "explanation": "Shards \"aba\" and \"cdc\" have lengths [3, 3]."
      },
      {
        "input": "events = \"abcd\"",
        "output": "[1, 1, 1, 1]",
        "explanation": "Every distinct letter forms its own shard."
      }
    ],
    "constraints": [
      "1 <= events.length <= 10^4"
    ],
    "starterCode": {
      "python": "def shard_event_stream(events: str) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function shardEventStream(events) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> shardEventStream(String events) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> shardEventStream(string events) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "events = \"abacdc\"",
        "expected": "[3, 3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "events = \"abcd\"",
        "expected": "[1, 1, 1, 1]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "relay-hop-minimum-jumps",
    "title": "Mesh Backbone Minimum Signal Hops",
    "difficulty": "Medium",
    "topics": [
      "Greedy",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Linear mesh repeaters have forward reach `reaches[i]`. Guaranteed that the last repeater is reachable from repeater `0`, return the minimum number of hops needed to reach the final repeater.",
    "examples": [
      {
        "input": "reaches = [2, 3, 1, 1, 4]",
        "output": "2",
        "explanation": "0 -> 1 -> 4 uses 2 hops."
      },
      {
        "input": "reaches = [1, 1, 1, 1]",
        "output": "3",
        "explanation": "One hop per repeater."
      }
    ],
    "constraints": [
      "1 <= reaches.length <= 10^4"
    ],
    "starterCode": {
      "python": "def min_signal_hops(reaches: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minSignalHops(reaches) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minSignalHops(int[] reaches) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minSignalHops(vector<int>& reaches) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "reaches = [2, 3, 1, 1, 4]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "reaches = [1, 1, 1, 1]",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "romans-legacy-invoice-parser",
    "title": "Archival Roman-Numeral Batch Decoder",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Hash Table",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A museum archive stores catalog numbers as valid Roman numerals (`1..3999`) in `code`. Convert `code` to its integer value.",
    "examples": [
      {
        "input": "code = \"XLII\"",
        "output": "42",
        "explanation": "XL (40) + II (2) = 42."
      },
      {
        "input": "code = \"MCMXCIV\"",
        "output": "1994",
        "explanation": "1000 + 900 + 90 + 4 = 1994."
      }
    ],
    "constraints": [
      "1 <= code.length <= 15"
    ],
    "starterCode": {
      "python": "def decode_roman_batch(code: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function decodeRomanBatch(code) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int decodeRomanBatch(String code) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int decodeRomanBatch(string code) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "code = \"XLII\"",
        "expected": "42",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "code = \"MCMXCIV\"",
        "expected": "1994",
        "isHidden": false
      }
    ]
  },
  {
    "id": "romans-batch-code-formatter",
    "title": "Archival Roman-Numeral Batch Formatter",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Greedy",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Convert a positive integer catalog ID `num` (`1 <= num <= 3999`) into its canonical Roman numeral string.",
    "examples": [
      {
        "input": "num = 42",
        "output": "\"XLII\"",
        "explanation": "40 (XL) + 2 (II)."
      },
      {
        "input": "num = 2026",
        "output": "\"MMXXVI\"",
        "explanation": "2000 + 20 + 6."
      }
    ],
    "constraints": [
      "1 <= num <= 3999"
    ],
    "starterCode": {
      "python": "def format_roman_batch(num: int) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function formatRomanBatch(num) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String formatRomanBatch(int num) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string formatRomanBatch(int num) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "num = 42",
        "expected": "\"XLII\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "num = 2026",
        "expected": "\"MMXXVI\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "protocol-word-bijection-check",
    "title": "Protocol Frame Token-Pattern Bijection",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a schema pattern `schema` (single letters) and a space-separated token frame `frame`, return `true` iff there is a strict one-to-one bijection between each letter of `schema` and each word of `frame`.",
    "examples": [
      {
        "input": "schema = \"xyyx\", frame = \"ack syn syn ack\"",
        "output": "true",
        "explanation": "x<->ack, y<->syn."
      },
      {
        "input": "schema = \"xyyx\", frame = \"ack ack ack ack\"",
        "output": "false",
        "explanation": "x and y cannot both map to ack."
      }
    ],
    "constraints": [
      "1 <= schema.length <= 300"
    ],
    "starterCode": {
      "python": "def matches_frame_schema(schema: str, frame: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function matchesFrameSchema(schema, frame) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean matchesFrameSchema(String schema, String frame) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool matchesFrameSchema(string schema, string frame) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "schema = \"xyyx\", frame = \"ack syn syn ack\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "schema = \"xyyx\", frame = \"ack ack ack ack\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "parts-kit-supply-verifier",
    "title": "Assembly Kit Component Supply Verifier",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Hash Table",
      "Counting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A repair kit requires component codes listed in `blueprint` (lowercase letters), and the warehouse bin holds available parts `bin_parts`. Return `true` if every required component in `blueprint` can be drawn from `bin_parts` without reuse.",
    "examples": [
      {
        "input": "blueprint = \"aab\", bin_parts = \"abac\"",
        "output": "true",
        "explanation": "Bin contains two a's and one b."
      },
      {
        "input": "blueprint = \"aab\", bin_parts = \"abc\"",
        "output": "false",
        "explanation": "Only one 'a' is in stock."
      }
    ],
    "constraints": [
      "1 <= blueprint.length, bin_parts.length <= 10^5"
    ],
    "starterCode": {
      "python": "def can_assemble_kit(blueprint: str, bin_parts: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function canAssembleKit(blueprint, binParts) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean canAssembleKit(String blueprint, String binParts) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canAssembleKit(string blueprint, string binParts) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "blueprint = \"aab\", bin_parts = \"abac\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "blueprint = \"aab\", bin_parts = \"abc\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "stream-sliding-permutation-alert",
    "title": "IDS Packet Stream Scrambled Signature Detector",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An intrusion detector watches a lowercase byte stream `stream` for any contiguous slice that is a permutation of alert signature `sig`. Return `true` if such a slice exists.",
    "examples": [
      {
        "input": "sig = \"abc\", stream = \"zzcbazz\"",
        "output": "true",
        "explanation": "\"cba\" is a permutation of \"abc\"."
      },
      {
        "input": "sig = \"abc\", stream = \"zzabzzc\"",
        "output": "false",
        "explanation": "Characters are not contiguous."
      }
    ],
    "constraints": [
      "1 <= sig.length, stream.length <= 10^4"
    ],
    "starterCode": {
      "python": "def has_scrambled_sig(sig: str, stream: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function hasScrambledSig(sig, stream) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean hasScrambledSig(String sig, String stream) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool hasScrambledSig(string sig, string stream) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "sig = \"abc\", stream = \"zzcbazz\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "sig = \"abc\", stream = \"zzabzzc\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ring-road-nonadjacent-tolls",
    "title": "Ring Highway Non-Adjacent Toll Revenue",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Toll gates sit around a circular beltway with expected daily revenues `tolls` (gate 0 is adjacent to gate `n - 1`). Traffic regulations forbid activating two adjacent gates. Return the maximum daily revenue.",
    "examples": [
      {
        "input": "tolls = [10, 25, 15]",
        "output": "25",
        "explanation": "All three are mutually adjacent; pick 25."
      },
      {
        "input": "tolls = [10, 20, 30, 15]",
        "output": "40",
        "explanation": "Gates 0 (10) and 2 (30) yield 40."
      }
    ],
    "constraints": [
      "1 <= tolls.length <= 1000"
    ],
    "starterCode": {
      "python": "def max_ring_tolls(tolls: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxRingTolls(tolls) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxRingTolls(int[] tolls) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxRingTolls(vector<int>& tolls) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tolls = [10, 25, 15]",
        "expected": "25",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tolls = [10, 20, 30, 15]",
        "expected": "40",
        "isHidden": false
      }
    ]
  },
  {
    "id": "digit-message-decoding-count",
    "title": "Telemetry Numeric-Cipher Decoding Count",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A legacy pager encodes letters `'A'`–`'Z'` as `'1'`–`'26'`. Given a digit string `digits`, return how many distinct letter messages it can decode into.",
    "examples": [
      {
        "input": "digits = \"226\"",
        "output": "3",
        "explanation": "2-2-6, 22-6, or 2-26."
      },
      {
        "input": "digits = \"06\"",
        "output": "0",
        "explanation": "Leading zero cannot decode."
      }
    ],
    "constraints": [
      "1 <= digits.length <= 100"
    ],
    "starterCode": {
      "python": "def count_pager_decodings(digits: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countPagerDecodings(digits) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countPagerDecodings(String digits) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countPagerDecodings(string digits) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "digits = \"226\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "digits = \"06\"",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "token-dispenser-combo-count",
    "title": "Arcade Token Dispenser Combination Ways",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Knapsack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given distinct token denominations `tokens` (unlimited supply) and a target value `total`, return the number of unordered combinations that sum to `total`.",
    "examples": [
      {
        "input": "total = 5, tokens = [1, 2, 5]",
        "output": "4",
        "explanation": "Four unordered combinations."
      },
      {
        "input": "total = 3, tokens = [2]",
        "output": "0",
        "explanation": "Impossible to make 3."
      }
    ],
    "constraints": [
      "0 <= total <= 5000",
      "1 <= tokens.length <= 300"
    ],
    "starterCode": {
      "python": "def token_combinations(total: int, tokens: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function tokenCombinations(total, tokens) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int tokenCombinations(int total, int[] tokens) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int tokenCombinations(int total, vector<int>& tokens) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "total = 5, tokens = [1, 2, 5]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "total = 3, tokens = [2]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sensor-bias-sign-assignment",
    "title": "Calibration Offset Sign-Assignment Ways",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Knapsack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A lab instrument has non-negative calibration weights `weights`. Assigning either `'+'` or `'-'` to each weight, return how many distinct sign assignments sum exactly to `goal`.",
    "examples": [
      {
        "input": "weights = [1, 1, 1, 1, 1], goal = 3",
        "output": "5",
        "explanation": "Five ways to pick one minus sign."
      },
      {
        "input": "weights = [2, 2], goal = 0",
        "output": "2",
        "explanation": "+2-2 and -2+2."
      }
    ],
    "constraints": [
      "1 <= weights.length <= 20",
      "0 <= sum(weights) <= 1000"
    ],
    "starterCode": {
      "python": "def count_sign_assignments(weights: list[int], goal: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countSignAssignments(weights, goal) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countSignAssignments(int[] weights, int goal) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countSignAssignments(vector<int>& weights, int goal) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "weights = [1, 1, 1, 1, 1], goal = 3",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "weights = [2, 2], goal = 0",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "warehouse-grid-min-energy-path",
    "title": "AGV Floor Minimum Energy Traversal",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An automated guided vehicle crosses an `m x n` floor `energy` from `(0, 0)` to `(m - 1, n - 1)` moving only down or right. Return the minimum total energy consumed along any path.",
    "examples": [
      {
        "input": "energy = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]",
        "output": "7",
        "explanation": "1->3->1->1->1 = 7."
      },
      {
        "input": "energy = [[2, 4], [1, 3]]",
        "output": "6",
        "explanation": "2->1->3 = 6."
      }
    ],
    "constraints": [
      "1 <= m, n <= 200"
    ],
    "starterCode": {
      "python": "def min_agv_energy(energy: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minAgvEnergy(energy) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minAgvEnergy(int[][] energy) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minAgvEnergy(vector<vector<int>>& energy) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "energy = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "energy = [[2, 4], [1, 3]]",
        "expected": "6",
        "isHidden": false
      }
    ]
  },
  {
    "id": "pyramid-descent-min-cost",
    "title": "Decision Pyramid Minimum Cost Descent",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a triangular cost table `pyramid` where row `r` has `r + 1` integers, find the minimum total cost from apex `(0, 0)` to the bottom row moving at each step from index `i` to `i` or `i + 1` on the row below.",
    "examples": [
      {
        "input": "pyramid = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]",
        "output": "11",
        "explanation": "2 + 3 + 5 + 1 = 11."
      },
      {
        "input": "pyramid = [[-5]]",
        "output": "-5",
        "explanation": "Single apex cell."
      }
    ],
    "constraints": [
      "1 <= pyramid.length <= 200"
    ],
    "starterCode": {
      "python": "def min_pyramid_descent(pyramid: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minPyramidDescent(pyramid) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minPyramidDescent(List<List<Integer>> pyramid) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minPyramidDescent(vector<vector<int>>& pyramid) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "pyramid = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]",
        "expected": "11",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "pyramid = [[-5]]",
        "expected": "-5",
        "isHidden": false
      }
    ]
  },
  {
    "id": "rna-folding-palindromic-subseq",
    "title": "RNA Strand Longest Palindromic Folding",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an uppercase RNA base sequence `rna`, return the length of the longest palindromic subsequence (not necessarily contiguous) inside `rna`.",
    "examples": [
      {
        "input": "rna = \"AUGGUA\"",
        "output": "6",
        "explanation": "Entire strand is palindromic."
      },
      {
        "input": "rna = \"AUUG\"",
        "output": "2",
        "explanation": "\"UU\" has length 2."
      }
    ],
    "constraints": [
      "1 <= rna.length <= 1000"
    ],
    "starterCode": {
      "python": "def longest_rna_palindrome(rna: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestRnaPalindrome(rna) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestRnaPalindrome(String rna) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestRnaPalindrome(string rna) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "rna = \"AUGGUA\"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "rna = \"AUUG\"",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "log-pattern-distinct-matches",
    "title": "Audit Stream Distinct Subsequence Matches",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an event stream `stream` and a target signature `sig`, return the number of distinct index subsequences of `stream` that spell `sig`.",
    "examples": [
      {
        "input": "stream = \"rabbbit\", sig = \"rabbit\"",
        "output": "3",
        "explanation": "Three ways to pick two 'b's out of three."
      },
      {
        "input": "stream = \"abc\", sig = \"xyz\"",
        "output": "0",
        "explanation": "No matches."
      }
    ],
    "constraints": [
      "1 <= stream.length, sig.length <= 1000"
    ],
    "starterCode": {
      "python": "def count_subseq_matches(stream: str, sig: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countSubseqMatches(stream, sig) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countSubseqMatches(String stream, String sig) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countSubseqMatches(string stream, string sig) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "stream = \"rabbbit\", sig = \"rabbit\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "stream = \"abc\", sig = \"xyz\"",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "dual-stream-interleave-verifier",
    "title": "Dual-Channel Log Interleave Verifier",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Two ordered log channels `ch_a` and `ch_b` were multiplexed into `merged`. Return `true` iff `merged` is a valid order-preserving interleaving of `ch_a` and `ch_b`.",
    "examples": [
      {
        "input": "ch_a = \"abc\", ch_b = \"123\", merged = \"a1b2c3\"",
        "output": "true",
        "explanation": "Preserves order of both channels."
      },
      {
        "input": "ch_a = \"ab\", ch_b = \"cd\", merged = \"acbd\"",
        "output": "true",
        "explanation": "Valid interleaving."
      }
    ],
    "constraints": [
      "0 <= ch_a.length, ch_b.length <= 100"
    ],
    "starterCode": {
      "python": "def is_valid_multiplex(ch_a: str, ch_b: str, merged: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isValidMultiplex(chA, chB, merged) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isValidMultiplex(String chA, String chB, String merged) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValidMultiplex(string chA, string chB, string merged) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ch_a = \"abc\", ch_b = \"123\", merged = \"a1b2c3\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ch_a = \"ab\", ch_b = \"cd\", merged = \"acbd\"",
        "expected": "true",
        "isHidden": false
      }
    ]
  },
  {
    "id": "wildcard-star-dot-matcher",
    "title": "Firewall Rule Regex Dot-Star Matcher",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "String",
      "Recursion"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Implement full-string matching of packet header `text` against rule `pattern` supporting `'.'` (any single character) and `'*'` (zero or more of the preceding token).",
    "examples": [
      {
        "input": "text = \"aab\", pattern = \"c*a*b\"",
        "output": "true",
        "explanation": "c* matches empty, a* matches aa, b matches b."
      },
      {
        "input": "text = \"mississippi\", pattern = \"mis*is*p*.\"",
        "output": "false",
        "explanation": "Pattern cannot cover second 'i'."
      }
    ],
    "constraints": [
      "1 <= text.length, pattern.length <= 25"
    ],
    "starterCode": {
      "python": "def match_firewall_rule(text: str, pattern: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function matchFirewallRule(text, pattern) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean matchFirewallRule(String text, String pattern) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool matchFirewallRule(string text, string pattern) {\n        // Write your solution here\n        return false;\n    }\n};\n"
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
        "input": "text = \"mississippi\", pattern = \"mis*is*p*.\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "balloon-demolition-max-payout",
    "title": "Mine-Clearance Coupled Target Max Score",
    "difficulty": "Hard",
    "topics": [
      "Dynamic Programming",
      "Interval DP"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A simulation lists target multipliers `vals` in a row. Clearing target `i` awards `vals[i - 1] * vals[i] * vals[i + 1]` points (out-of-bounds boundaries count as `1`) and merges its left and right neighbors. Return the maximum total points achievable by clearing all targets.",
    "examples": [
      {
        "input": "vals = [3, 1, 5, 8]",
        "output": "167",
        "explanation": "Optimal clearing order awards 167 points."
      },
      {
        "input": "vals = [2, 4]",
        "output": "12",
        "explanation": "Clear 2 (8) then 4 (4) = 12."
      }
    ],
    "constraints": [
      "1 <= vals.length <= 200",
      "0 <= vals[i] <= 100"
    ],
    "starterCode": {
      "python": "def max_clearance_score(vals: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxClearanceScore(vals) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxClearanceScore(int[] vals) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxClearanceScore(vector<int>& vals) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "vals = [3, 1, 5, 8]",
        "expected": "167",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "vals = [2, 4]",
        "expected": "12",
        "isHidden": false
      }
    ]
  },
  {
    "id": "bit-counter-range-popcounts",
    "title": "Telemetry Feature-Mask Popcount Table",
    "difficulty": "Easy",
    "topics": [
      "Bit Manipulation",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Precompute an array `table` of length `max_mask + 1` where `table[i]` is the number of active `1` bits in the binary representation of `i`.",
    "examples": [
      {
        "input": "max_mask = 5",
        "output": "[0, 1, 1, 2, 1, 2]",
        "explanation": "Popcounts for 0..5."
      },
      {
        "input": "max_mask = 0",
        "output": "[0]",
        "explanation": "Zero has 0 set bits."
      }
    ],
    "constraints": [
      "0 <= max_mask <= 10^5"
    ],
    "starterCode": {
      "python": "def popcount_table(max_mask: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function popcountTable(maxMask) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] popcountTable(int maxMask) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> popcountTable(int maxMask) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "max_mask = 5",
        "expected": "[0, 1, 1, 2, 1, 2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "max_mask = 0",
        "expected": "[0]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "hamming-active-flags-count",
    "title": "Feature Flag Active Bit Counter",
    "difficulty": "Easy",
    "topics": [
      "Bit Manipulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a non-negative integer bitmask `mask` representing enabled feature flags, return the count of enabled (`1`) flags.",
    "examples": [
      {
        "input": "mask = 13",
        "output": "3",
        "explanation": "13 = 1101 in binary has three 1s."
      },
      {
        "input": "mask = 0",
        "output": "0",
        "explanation": "No flags enabled."
      }
    ],
    "constraints": [
      "0 <= mask <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def count_active_flags(mask: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countActiveFlags(mask) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countActiveFlags(int mask) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countActiveFlags(int mask) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "mask = 13",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "mask = 0",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "palindrome-chain-verifier",
    "title": "Packet Chain Mirror Symmetry Check",
    "difficulty": "Easy",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a linked sequence of integer tags `tags`, return `true` if the sequence reads identically from front-to-back and back-to-front.",
    "examples": [
      {
        "input": "tags = [4, 7, 7, 4]",
        "output": "true",
        "explanation": "Symmetric sequence."
      },
      {
        "input": "tags = [4, 7, 8]",
        "output": "false",
        "explanation": "Asymmetric sequence."
      }
    ],
    "constraints": [
      "1 <= tags.length <= 10^5"
    ],
    "starterCode": {
      "python": "def is_symmetric_chain(tags: list[int]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isSymmetricChain(tags) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isSymmetricChain(int[] tags) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isSymmetricChain(vector<int>& tags) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tags = [4, 7, 7, 4]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tags = [4, 7, 8]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "chain-midpoint-suffix",
    "title": "Stream Midpoint Second-Half Extractor",
    "difficulty": "Easy",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a non-empty linked stream of IDs `stream`, return the tail starting from the middle node (if there are two middle nodes, start from the second middle node).",
    "examples": [
      {
        "input": "stream = [10, 20, 30, 40, 50]",
        "output": "[30, 40, 50]",
        "explanation": "Middle is 30."
      },
      {
        "input": "stream = [10, 20, 30, 40]",
        "output": "[30, 40]",
        "explanation": "Second middle is 30."
      }
    ],
    "constraints": [
      "1 <= stream.length <= 10^4"
    ],
    "starterCode": {
      "python": "def midpoint_tail(stream: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function midpointTail(stream) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] midpointTail(int[] stream) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> midpointTail(vector<int>& stream) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "stream = [10, 20, 30, 40, 50]",
        "expected": "[30, 40, 50]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "stream = [10, 20, 30, 40]",
        "expected": "[30, 40]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sorted-chain-deduplicator",
    "title": "Sorted Telemetry Chain Deduplicator",
    "difficulty": "Easy",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a sorted ascending chain of sensor keys `keys`, remove duplicate entries so each distinct key appears once and return the deduplicated list.",
    "examples": [
      {
        "input": "keys = [1, 1, 2, 3, 3, 3]",
        "output": "[1, 2, 3]",
        "explanation": "Consecutive duplicates collapsed."
      },
      {
        "input": "keys = []",
        "output": "[]",
        "explanation": "Empty chain."
      }
    ],
    "constraints": [
      "0 <= keys.length <= 10^4"
    ],
    "starterCode": {
      "python": "def dedup_sorted_chain(keys: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function dedupSortedChain(keys) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] dedupSortedChain(int[] keys) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> dedupSortedChain(vector<int>& keys) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "keys = [1, 1, 2, 3, 3, 3]",
        "expected": "[1, 2, 3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "keys = []",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "circular-playlist-right-shift",
    "title": "Carousel Queue Right-Shift Rotation",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A digital signage carousel stores slide IDs `slides`. Rotate `slides` to the right by `steps` positions (`steps` may exceed `len(slides)`) and return the rotated list.",
    "examples": [
      {
        "input": "slides = [1, 2, 3, 4, 5], steps = 2",
        "output": "[4, 5, 1, 2, 3]",
        "explanation": "Last 2 slides move to front."
      },
      {
        "input": "slides = [10, 20, 30], steps = 4",
        "output": "[30, 10, 20]",
        "explanation": "4 % 3 == 1 right shift."
      }
    ],
    "constraints": [
      "0 <= slides.length <= 5000",
      "0 <= steps <= 2 * 10^9"
    ],
    "starterCode": {
      "python": "def shift_carousel(slides: list[int], steps: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function shiftCarousel(slides, steps) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] shiftCarousel(int[] slides, int steps) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> shiftCarousel(vector<int>& slides, int steps) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "slides = [1, 2, 3, 4, 5], steps = 2",
        "expected": "[4, 5, 1, 2, 3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "slides = [10, 20, 30], steps = 4",
        "expected": "[30, 10, 20]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "chain-merge-sorter",
    "title": "Linked Record Stream O(n log n) Sorter",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Sorting",
      "Divide and Conquer"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Sort an unsorted linked record stream `records` in ascending order using top-down merge sort in `O(n log n)` time and return the sorted list.",
    "examples": [
      {
        "input": "records = [4, 2, 1, 3]",
        "output": "[1, 2, 3, 4]",
        "explanation": "Sorted ascending."
      },
      {
        "input": "records = []",
        "output": "[]",
        "explanation": "Empty stream."
      }
    ],
    "constraints": [
      "0 <= records.length <= 5 * 10^4"
    ],
    "starterCode": {
      "python": "def merge_sort_records(records: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function mergeSortRecords(records) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] mergeSortRecords(int[] records) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> mergeSortRecords(vector<int>& records) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "records = [4, 2, 1, 3]",
        "expected": "[1, 2, 3, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "records = []",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "tree-preorder-chain-flatten",
    "title": "Binary Menu Tree Preorder Linearizer",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "DFS",
      "Linked List"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary menu tree in level-order `tree`, flatten it in-place into a right-linked preorder sequence (root, left, right) and return its values.",
    "examples": [
      {
        "input": "tree = [1, 2, 5, 3, 4, null, 6]",
        "output": "[1, 2, 3, 4, 5, 6]",
        "explanation": "Preorder traversal sequence."
      },
      {
        "input": "tree = []",
        "output": "[]",
        "explanation": "Empty tree."
      }
    ],
    "constraints": [
      "0 <= nodes <= 2000"
    ],
    "starterCode": {
      "python": "def linearize_menu_tree(tree: list) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function linearizeMenuTree(tree) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> linearizeMenuTree(List<Integer> tree) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> linearizeMenuTree(vector<optional<int>>& tree) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [1, 2, 5, 3, 4, null, 6]",
        "expected": "[1, 2, 3, 4, 5, 6]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = []",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "tree-rebuild-pre-in-arrays",
    "title": "Binary Tree Reconstructor from Dual Logs",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "Divide and Conquer",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given `preorder` and `inorder` traversal logs of a binary tree with unique node IDs, reconstruct the tree and return its trimmed level-order list.",
    "examples": [
      {
        "input": "preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]",
        "output": "[3, 9, 20, null, null, 15, 7]",
        "explanation": "Root 3 splits inorder into [9] and [15, 20, 7]."
      },
      {
        "input": "preorder = [1], inorder = [1]",
        "output": "[1]",
        "explanation": "Single node."
      }
    ],
    "constraints": [
      "1 <= preorder.length <= 3000"
    ],
    "starterCode": {
      "python": "def rebuild_binary_tree(preorder: list[int], inorder: list[int]) -> list:\n    # Write your solution here\n    return []\n",
      "javascript": "function rebuildBinaryTree(preorder, inorder) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> rebuildBinaryTree(int[] preorder, int[] inorder) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<optional<int>> rebuildBinaryTree(vector<int>& preorder, vector<int>& inorder) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]",
        "expected": "[3, 9, 20, null, null, 15, 7]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "preorder = [1], inorder = [1]",
        "expected": "[1]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "packet-payload-kmp-needle",
    "title": "Packet Inspector First Signature Offset",
    "difficulty": "Easy",
    "topics": [
      "String",
      "KMP",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A deep-packet inspector searches a lowercase payload `payload` for the first index where signature `sig` occurs as a contiguous substring, returning `-1` if absent.",
    "examples": [
      {
        "input": "payload = \"mississippi\", sig = \"issip\"",
        "output": "4",
        "explanation": "\"issip\" starts at index 4."
      },
      {
        "input": "payload = \"telemetry\", sig = \"xyz\"",
        "output": "-1",
        "explanation": "Signature not found."
      }
    ],
    "constraints": [
      "1 <= payload.length, sig.length <= 10^4"
    ],
    "starterCode": {
      "python": "def find_sig_offset(payload: str, sig: str) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function findSigOffset(payload, sig) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int findSigOffset(String payload, String sig) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findSigOffset(string payload, string sig) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "payload = \"mississippi\", sig = \"issip\"",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "payload = \"telemetry\", sig = \"xyz\"",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "dna-longest-mirror-segment",
    "title": "Genomics Longest Mirror-Palindrome Segment",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a sequence string `seq`, return the longest contiguous palindromic substring (if multiple tie for maximum length, return the earliest one).",
    "examples": [
      {
        "input": "seq = \"babad\"",
        "output": "\"bab\"",
        "explanation": "\"bab\" is the earliest length-3 palindrome."
      },
      {
        "input": "seq = \"cbbd\"",
        "output": "\"bb\"",
        "explanation": "Longest mirror segment is \"bb\"."
      }
    ],
    "constraints": [
      "1 <= seq.length <= 1000"
    ],
    "starterCode": {
      "python": "def longest_mirror_segment(seq: str) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function longestMirrorSegment(seq) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String longestMirrorSegment(String seq) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestMirrorSegment(string seq) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "seq = \"babad\"",
        "expected": "\"bab\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "seq = \"cbbd\"",
        "expected": "\"bb\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "motif-palindrome-counter",
    "title": "Sequence Symmetry Substring Counter",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a lowercase string `seq`, return the total number of contiguous palindromic substrings (counting substrings with different start or end indices separately).",
    "examples": [
      {
        "input": "seq = \"aaa\"",
        "output": "6",
        "explanation": "Three 'a', two 'aa', one 'aaa'."
      },
      {
        "input": "seq = \"abc\"",
        "output": "3",
        "explanation": "Only single characters."
      }
    ],
    "constraints": [
      "1 <= seq.length <= 1000"
    ],
    "starterCode": {
      "python": "def count_mirror_segments(seq: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countMirrorSegments(seq) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countMirrorSegments(String seq) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countMirrorSegments(string seq) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "seq = \"aaa\"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "seq = \"abc\"",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "log-phrase-word-reverser",
    "title": "CLI Command Token-Order Reverser",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a raw command string `line` with arbitrary leading, trailing, and repeated spaces, reverse the order of its non-space word tokens separated by single spaces.",
    "examples": [
      {
        "input": "line = \"  alpha   beta gamma  \"",
        "output": "\"gamma beta alpha\"",
        "explanation": "Extra whitespace collapsed and tokens reversed."
      },
      {
        "input": "line = \"solo\"",
        "output": "\"solo\"",
        "explanation": "Single token."
      }
    ],
    "constraints": [
      "1 <= line.length <= 10^4"
    ],
    "starterCode": {
      "python": "def reverse_command_tokens(line: str) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function reverseCommandTokens(line) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String reverseCommandTokens(String line) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string reverseCommandTokens(string line) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "line = \"  alpha   beta gamma  \"",
        "expected": "\"gamma beta alpha\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "line = \"solo\"",
        "expected": "\"solo\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "legacy-form-int32-parser",
    "title": "Legacy Form Clamped 32-Bit Integer Parser",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Parsing"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Parse a raw text field `raw` into a 32-bit signed integer: skip leading spaces, read an optional `'+'`/`'-'` sign, read consecutive decimal digits until a non-digit, and clamp the result to `[-2^31, 2^31 - 1]`.",
    "examples": [
      {
        "input": "raw = \"   -0042xyz\"",
        "output": "-42",
        "explanation": "Leading spaces/zeros skipped; stops at 'x'."
      },
      {
        "input": "raw = \"99999999999\"",
        "output": "2147483647",
        "explanation": "Clamped to INT32_MAX."
      }
    ],
    "constraints": [
      "0 <= raw.length <= 200"
    ],
    "starterCode": {
      "python": "def parse_clamped_int32(raw: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function parseClampedInt32(raw) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int parseClampedInt32(String raw) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int parseClampedInt32(string raw) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "raw = \"   -0042xyz\"",
        "expected": "-42",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "raw = \"99999999999\"",
        "expected": "2147483647",
        "isHidden": false
      }
    ]
  },
  {
    "id": "rail-fence-cipher-encoder",
    "title": "Rail-Fence Zigzag Cipher Encoder",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Simulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Encode a plaintext string `text` using a `rails`-row rail-fence zigzag pattern (writing diagonally down and up across `rails` rows, then reading row by row).",
    "examples": [
      {
        "input": "text = \"PAYPALISHIRING\", rails = 3",
        "output": "\"PAHNAPLSIIGYIR\"",
        "explanation": "3-rail zigzag readout produces PAHNAPLSIIGYIR."
      },
      {
        "input": "text = \"HELLO\", rails = 1",
        "output": "\"HELLO\"",
        "explanation": "Single rail leaves text unchanged."
      }
    ],
    "constraints": [
      "1 <= text.length <= 1000",
      "1 <= rails <= 1000"
    ],
    "starterCode": {
      "python": "def encode_rail_fence(text: str, rails: int) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function encodeRailFence(text, rails) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String encodeRailFence(String text, int rails) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string encodeRailFence(string text, int rails) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "text = \"PAYPALISHIRING\", rails = 3",
        "expected": "\"PAHNAPLSIIGYIR\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "text = \"HELLO\", rails = 1",
        "expected": "\"HELLO\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "metric-next-higher-lookup",
    "title": "Benchmark Next-Higher Metric Query",
    "difficulty": "Easy",
    "topics": [
      "Stack",
      "Monotonic Stack",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two arrays of unique integers `queries` (a subset of `series`) and `series`, return an array where each entry is the first value strictly to the right of `queries[i]` in `series` that is greater than `queries[i]`, or `-1` if none exists.",
    "examples": [
      {
        "input": "queries = [4, 1, 2], series = [1, 3, 4, 2]",
        "output": "[-1, 3, -1]",
        "explanation": "Next greater in series: 4->-1, 1->3, 2->-1."
      },
      {
        "input": "queries = [2, 4], series = [1, 2, 3, 4]",
        "output": "[3, -1]",
        "explanation": "2->3, 4->-1."
      }
    ],
    "constraints": [
      "1 <= queries.length <= series.length <= 5000"
    ],
    "starterCode": {
      "python": "def next_higher_metrics(queries: list[int], series: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function nextHigherMetrics(queries, series) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] nextHigherMetrics(int[] queries, int[] series) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> nextHigherMetrics(vector<int>& queries, vector<int>& series) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "queries = [4, 1, 2], series = [1, 3, 4, 2]",
        "expected": "[-1, 3, -1]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "queries = [2, 4], series = [1, 2, 3, 4]",
        "expected": "[3, -1]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "telemetry-min-tracker-stack",
    "title": "Sensor Buffer O(1) Running-Minimum Stack",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Design"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Simulate a stack supporting `push`, `pop`, `peek`, and `min` in O(1) time. Given `cmds` (`[\"push\", x]`, `[\"pop\"]`, `[\"peek\"]`, `[\"min\"]`), return the outputs of all `peek` and `min` calls.",
    "examples": [
      {
        "input": "cmds = [[\"push\", 4], [\"push\", 2], [\"min\"], [\"pop\"], [\"min\"], [\"peek\"]]",
        "output": "[2, 4, 4]",
        "explanation": "Min drops to 2 then returns to 4 after pop."
      },
      {
        "input": "cmds = [[\"push\", -5], [\"min\"]]",
        "output": "[-5]",
        "explanation": "Single element."
      }
    ],
    "constraints": [
      "1 <= cmds.length <= 2 * 10^4"
    ],
    "starterCode": {
      "python": "def run_min_buffer(cmds: list[list]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function runMinBuffer(cmds) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> runMinBuffer(List<List<Object>> cmds) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> runMinBuffer(vector<vector<string>>& cmds) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "cmds = [[\"push\", 4], [\"push\", 2], [\"min\"], [\"pop\"], [\"min\"], [\"peek\"]]",
        "expected": "[2, 4, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "cmds = [[\"push\", -5], [\"min\"]]",
        "expected": "[-5]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "syntax-longest-balanced-span",
    "title": "Parser Longest Well-Formed Block Span",
    "difficulty": "Hard",
    "topics": [
      "Stack",
      "String",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a stream `tokens` of `'('` and `')'`, return the length of the longest contiguous well-formed (balanced) parenthesis substring.",
    "examples": [
      {
        "input": "tokens = \")()())\"",
        "output": "4",
        "explanation": "\"()()\" has length 4."
      },
      {
        "input": "tokens = \"(()\"",
        "output": "2",
        "explanation": "\"()\" has length 2."
      }
    ],
    "constraints": [
      "0 <= tokens.length <= 3 * 10^4"
    ],
    "starterCode": {
      "python": "def longest_balanced_span(tokens: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestBalancedSpan(tokens) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestBalancedSpan(String tokens) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestBalancedSpan(string tokens) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tokens = \")()())\"",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tokens = \"(()\"",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sorted-log-event-span-bounds",
    "title": "Sorted Index First-and-Last Key Bounds",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a sorted non-decreasing integer array `keys` and a `target`, return `[first_idx, last_idx]` of `target` in `O(log n)` time, or `[-1, -1]` if absent.",
    "examples": [
      {
        "input": "keys = [5, 7, 7, 8, 8, 10], target = 8",
        "output": "[3, 4]",
        "explanation": "8 spans indices 3..4."
      },
      {
        "input": "keys = [5, 7, 7, 8], target = 6",
        "output": "[-1, -1]",
        "explanation": "6 is absent."
      }
    ],
    "constraints": [
      "0 <= keys.length <= 10^5"
    ],
    "starterCode": {
      "python": "def find_key_span(keys: list[int], target: int) -> list[int]:\n    # Write your solution here\n    return [-1, -1]\n",
      "javascript": "function findKeySpan(keys, target) {\n  // Write your solution here\n  return [-1, -1];\n}\n",
      "java": "class Solution {\n    public int[] findKeySpan(int[] keys, int target) {\n        // Write your solution here\n        return new int[]{-1, -1};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> findKeySpan(vector<int>& keys, int target) {\n        // Write your solution here\n        return {-1, -1};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "keys = [5, 7, 7, 8, 8, 10], target = 8",
        "expected": "[3, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "keys = [5, 7, 7, 8], target = 6",
        "expected": "[-1, -1]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "telemetry-top-k-error-codes",
    "title": "Monitoring Top-K Most Frequent Error Codes",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Hash Table",
      "Bucket Sort"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "Given an integer array of HTTP error codes `codes` and an integer `k`, return the `k` most frequent error codes in any order in `O(n)` time.",
    "examples": [
      {
        "input": "codes = [500, 500, 500, 404, 404, 502], k = 2",
        "output": "[500, 404]",
        "explanation": "500 (3x) and 404 (2x)."
      },
      {
        "input": "codes = [503], k = 1",
        "output": "[503]",
        "explanation": "Only one error code."
      }
    ],
    "constraints": [
      "1 <= codes.length <= 10^5",
      "1 <= k <= unique codes."
    ],
    "starterCode": {
      "python": "def top_k_errors(codes: list[int], k: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function topKErrors(codes, k) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] topKErrors(int[] codes, int k) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> topKErrors(vector<int>& codes, int k) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "codes = [500, 500, 500, 404, 404, 502], k = 2",
        "expected": "[500, 404]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "codes = [503], k = 1",
        "expected": "[503]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "consensus-quorum-leader-vote",
    "title": "Consensus Quorum Strict-Majority Ballot",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Boyer-Moore"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "In a distributed vote log `ballots` of length `n`, one candidate ID is guaranteed to appear strictly more than `floor(n / 2)` times. Find that quorum leader in `O(n)` time and `O(1)` space.",
    "examples": [
      {
        "input": "ballots = [7, 2, 7, 7, 3]",
        "output": "7",
        "explanation": "7 appears 3 out of 5 times."
      },
      {
        "input": "ballots = [9]",
        "output": "9",
        "explanation": "Single ballot."
      }
    ],
    "constraints": [
      "1 <= ballots.length <= 5 * 10^4"
    ],
    "starterCode": {
      "python": "def quorum_leader(ballots: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function quorumLeader(ballots) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int quorumLeader(int[] ballots) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int quorumLeader(vector<int>& ballots) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ballots = [7, 2, 7, 7, 3]",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ballots = [9]",
        "expected": "9",
        "isHidden": false
      }
    ]
  },
  {
    "id": "shift-roster-inplace-rotation",
    "title": "On-Call Roster Cyclic Right Rotation",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Rotate an on-call engineer roster `roster` to the right by `shifts` positions in-place using O(1) extra space and return `roster`.",
    "examples": [
      {
        "input": "roster = [1, 2, 3, 4, 5], shifts = 2",
        "output": "[4, 5, 1, 2, 3]",
        "explanation": "Shifts right by 2."
      },
      {
        "input": "roster = [10, 20], shifts = 3",
        "output": "[20, 10]",
        "explanation": "3 % 2 == 1."
      }
    ],
    "constraints": [
      "1 <= roster.length <= 10^5",
      "0 <= shifts <= 10^5"
    ],
    "starterCode": {
      "python": "def rotate_roster(roster: list[int], shifts: int) -> list[int]:\n    # Write your solution here\n    return roster\n",
      "javascript": "function rotateRoster(roster, shifts) {\n  // Write your solution here\n  return roster;\n}\n",
      "java": "class Solution {\n    public int[] rotateRoster(int[] roster, int shifts) {\n        // Write your solution here\n        return roster;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> rotateRoster(vector<int>& roster, int shifts) {\n        // Write your solution here\n        return roster;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "roster = [1, 2, 3, 4, 5], shifts = 2",
        "expected": "[4, 5, 1, 2, 3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "roster = [10, 20], shifts = 3",
        "expected": "[20, 10]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sorted-catalog-pair-budget",
    "title": "Sorted Catalog 1-Indexed Pair Budget",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a sorted non-decreasing price list `prices` and a target `budget`, find the unique 1-indexed pair `[idx1, idx2]` (`idx1 < idx2`) whose prices sum to `budget` using O(1) extra space.",
    "examples": [
      {
        "input": "prices = [5, 10, 15, 25], budget = 30",
        "output": "[1, 4]",
        "explanation": "5 + 25 = 30 -> 1-indexed [1, 4]."
      },
      {
        "input": "prices = [2, 4, 6], budget = 10",
        "output": "[2, 3]",
        "explanation": "4 + 6 = 10 -> [2, 3]."
      }
    ],
    "constraints": [
      "2 <= prices.length <= 3 * 10^4",
      "Sorted non-decreasing."
    ],
    "starterCode": {
      "python": "def sorted_pair_budget(prices: list[int], budget: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function sortedPairBudget(prices, budget) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] sortedPairBudget(int[] prices, int budget) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> sortedPairBudget(vector<int>& prices, int budget) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "prices = [5, 10, 15, 25], budget = 30",
        "expected": "[1, 4]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "prices = [2, 4, 6], budget = 10",
        "expected": "[2, 3]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "telemetry-uniform-patch-window",
    "title": "Telemetry Signal Longest Uniform-State Window",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A sensor state log `states` uses uppercase letters `'A'`–`'Z'`. You may override at most `edits` noisy readings to any state letter. Return the length of the longest contiguous window of identical state letters achievable.",
    "examples": [
      {
        "input": "states = \"AABABBA\", edits = 1",
        "output": "4",
        "explanation": "Override one 'A' to 'B' to get \"BBBB\" (length 4)."
      },
      {
        "input": "states = \"ABAB\", edits = 2",
        "output": "4",
        "explanation": "Override two chars to make all 4 match."
      }
    ],
    "constraints": [
      "1 <= states.length <= 10^5",
      "0 <= edits <= states.length"
    ],
    "starterCode": {
      "python": "def longest_uniform_states(states: str, edits: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestUniformStates(states, edits) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestUniformStates(String states, int edits) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestUniformStates(string states, int edits) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "states = \"AABABBA\", edits = 1",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "states = \"ABAB\", edits = 2",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ledger-infix-precedence-eval",
    "title": "Billing Infix Expression Evaluator",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "String",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Evaluate an infix billing expression string `expr` containing non-negative integers, `'+'`, `'-'`, `'*'`, `'/'` (truncating toward zero), and spaces, obeying standard operator precedence.",
    "examples": [
      {
        "input": "expr = \"3 + 2 * 4\"",
        "output": "11",
        "explanation": "Multiplication precedes addition: 3 + 8 = 11."
      },
      {
        "input": "expr = \"14 - 3 / 2\"",
        "output": "13",
        "explanation": "3 / 2 truncates to 1; 14 - 1 = 13."
      }
    ],
    "constraints": [
      "1 <= expr.length <= 10^5"
    ],
    "starterCode": {
      "python": "def eval_billing_expr(expr: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function evalBillingExpr(expr) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int evalBillingExpr(String expr) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int evalBillingExpr(string expr) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "expr = \"3 + 2 * 4\"",
        "expected": "11",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "expr = \"14 - 3 / 2\"",
        "expected": "13",
        "isHidden": false
      }
    ]
  },
  {
    "id": "pigeonhole-duplicate-badge-finder",
    "title": "Read-Only Badge Log Duplicate Finder",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A read-only array `badges` contains `n + 1` badge IDs where every ID is in `[1, n]` and exactly one ID is duplicated. Find that duplicate ID in `O(n)` time and `O(1)` extra space without modifying `badges`.",
    "examples": [
      {
        "input": "badges = [1, 3, 4, 2, 2]",
        "output": "2",
        "explanation": "2 is repeated."
      },
      {
        "input": "badges = [3, 1, 3, 4, 2]",
        "output": "3",
        "explanation": "3 is repeated."
      }
    ],
    "constraints": [
      "2 <= badges.length <= 10^5"
    ],
    "starterCode": {
      "python": "def find_duplicate_badge(badges: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function findDuplicateBadge(badges) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int findDuplicateBadge(int[] badges) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findDuplicateBadge(vector<int>& badges) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "badges = [1, 3, 4, 2, 2]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "badges = [3, 1, 3, 4, 2]",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "audit-queue-drop-nth-tail",
    "title": "Audit Queue One-Pass Drop-Nth-From-End",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an audit queue `items` and an integer `n` (`1 <= n <= len(items)`), remove the `n`-th item from the tail of the queue and return the remaining list.",
    "examples": [
      {
        "input": "items = [10, 20, 30, 40, 50], n = 2",
        "output": "[10, 20, 30, 50]",
        "explanation": "2nd from end (40) is dropped."
      },
      {
        "input": "items = [99], n = 1",
        "output": "[]",
        "explanation": "Single item dropped."
      }
    ],
    "constraints": [
      "1 <= n <= items.length <= 1000"
    ],
    "starterCode": {
      "python": "def drop_nth_from_tail(items: list[int], n: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function dropNthFromTail(items, n) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] dropNthFromTail(int[] items, int n) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> dropNthFromTail(vector<int>& items, int n) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "items = [10, 20, 30, 40, 50], n = 2",
        "expected": "[10, 20, 30, 50]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "items = [99], n = 1",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "deck-alternating-end-interleave",
    "title": "Packet Buffer Front-Back Interleaver",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a buffer of packet IDs `buf = [p0, p1, ..., pn-1]`, interleave from front and back alternately to produce `[p0, pn-1, p1, pn-2, ...]` and return the reordered buffer.",
    "examples": [
      {
        "input": "buf = [1, 2, 3, 4, 5]",
        "output": "[1, 5, 2, 4, 3]",
        "explanation": "Alternates front and back."
      },
      {
        "input": "buf = [10, 20, 30, 40]",
        "output": "[10, 40, 20, 30]",
        "explanation": "Even-length interleaving."
      }
    ],
    "constraints": [
      "1 <= buf.length <= 5 * 10^4"
    ],
    "starterCode": {
      "python": "def interleave_front_back(buf: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function interleaveFrontBack(buf) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] interleaveFrontBack(int[] buf) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> interleaveFrontBack(vector<int>& buf) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "buf = [1, 2, 3, 4, 5]",
        "expected": "[1, 5, 2, 4, 3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "buf = [10, 20, 30, 40]",
        "expected": "[10, 40, 20, 30]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "skyline-bar-max-billboard",
    "title": "City Skyline Largest Rectangular Billboard",
    "difficulty": "Hard",
    "topics": [
      "Stack",
      "Monotonic Stack",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Adjacent unit-width buildings along a boulevard have heights `heights`. Mount the largest rectangular billboard fully supported against consecutive buildings and return its maximum area.",
    "examples": [
      {
        "input": "heights = [2, 1, 5, 6, 2, 3]",
        "output": "10",
        "explanation": "Buildings 5 and 6 support a 5x2 = 10 billboard."
      },
      {
        "input": "heights = [3, 3, 3]",
        "output": "9",
        "explanation": "3 * 3 = 9."
      }
    ],
    "constraints": [
      "1 <= heights.length <= 10^5",
      "0 <= heights[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def max_billboard_area(heights: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxBillboardArea(heights) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxBillboardArea(int[] heights) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxBillboardArea(vector<int>& heights) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "heights = [2, 1, 5, 6, 2, 3]",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "heights = [3, 3, 3]",
        "expected": "9",
        "isHidden": false
      }
    ]
  },
  {
    "id": "warehouse-aisle-pair-budget",
    "title": "Warehouse Aisle Pallet Pairing",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "A fulfillment center loads cargo pods that require an exact combined weight `pod_limit`. Given an array `pallets` where `pallets[i]` is the weight of the pallet at bay `i`, return the two distinct bay indices `[i, j]` whose pallet weights sum exactly to `pod_limit`. Exactly one valid pair is guaranteed.",
    "examples": [
      {
        "input": "pallets = [14, 27, 35, 19], pod_limit = 46",
        "output": "[1, 3]",
        "explanation": "Bay 1 (27 kg) + Bay 3 (19 kg) = 46 kg."
      },
      {
        "input": "pallets = [8, 12, 8], pod_limit = 16",
        "output": "[0, 2]",
        "explanation": "Bays 0 and 2 both weigh 8 kg."
      }
    ],
    "constraints": [
      "2 <= pallets.length <= 10^4",
      "-10^9 <= pallets[i], pod_limit <= 10^9"
    ],
    "starterCode": {
      "python": "def find_pallet_pair(pallets: list[int], pod_limit: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function findPalletPair(pallets, podLimit) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] findPalletPair(int[] pallets, int podLimit) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> findPalletPair(vector<int>& pallets, int podLimit) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "pallets = [14, 27, 35, 19], pod_limit = 46",
        "expected": "[1, 3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "pallets = [8, 12, 8], pod_limit = 16",
        "expected": "[0, 2]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "solar-grid-peak-surplus",
    "title": "Microgrid Peak Net Surplus Window",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Dynamic Programming",
      "Kadane"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An energy operator logs hourly net power flow `net_kw` (positive for solar surplus, negative for battery drain). Return the maximum cumulative net energy generated over any non-empty contiguous block of hours.",
    "examples": [
      {
        "input": "net_kw = [-4, 6, -2, 7, -1, 3, -8, 2]",
        "output": "13",
        "explanation": "Hours 1..5 ([6, -2, 7, -1, 3]) yield 13 kWh."
      },
      {
        "input": "net_kw = [-5, -2, -9]",
        "output": "-2",
        "explanation": "Best single hour is -2 kWh."
      }
    ],
    "constraints": [
      "1 <= net_kw.length <= 10^5",
      "-10^4 <= net_kw[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def peak_net_surplus(net_kw: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function peakNetSurplus(netKw) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int peakNetSurplus(int[] netKw) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int peakNetSurplus(vector<int>& netKw) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "net_kw = [-4, 6, -2, 7, -1, 3, -8, 2]",
        "expected": "13",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "net_kw = [-5, -2, -9]",
        "expected": "-2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "courier-parcel-balance-point",
    "title": "Conveyor Belt Load Balance Pivot",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Prefix Sum"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A sorting belt carries parcels with weights `loads`. An inspector needs the leftmost pivot index `i` where the sum of parcel weights strictly to the left of `i` equals the sum of parcel weights strictly to the right of `i`. Return `-1` if no such balance pivot exists.",
    "examples": [
      {
        "input": "loads = [2, 3, 5, 1, 4]",
        "output": "2",
        "explanation": "Left of index 2 is 2+3=5; right of index 2 is 1+4=5."
      },
      {
        "input": "loads = [4, 1, 2]",
        "output": "-1",
        "explanation": "No index balances left and right sums."
      }
    ],
    "constraints": [
      "1 <= loads.length <= 10^4",
      "-1000 <= loads[i] <= 1000"
    ],
    "starterCode": {
      "python": "def find_balance_pivot(loads: list[int]) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function findBalancePivot(loads) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int findBalancePivot(int[] loads) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findBalancePivot(vector<int>& loads) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "loads = [2, 3, 5, 1, 4]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "loads = [4, 1, 2]",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "telemetry-duplicate-sensor-window",
    "title": "IoT Sensor Stuck-Reading Detector",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A factory sensor emits integer readings `readings` once per second. A fault is flagged if the exact same reading appears twice within `max_gap` seconds (`|i - j| <= max_gap`). Return `true` if a fault is detected, otherwise `false`.",
    "examples": [
      {
        "input": "readings = [10, 20, 30, 10], max_gap = 3",
        "output": "true",
        "explanation": "Reading 10 repeats at indices 0 and 3 (gap 3 <= 3)."
      },
      {
        "input": "readings = [10, 20, 30, 10], max_gap = 2",
        "output": "false",
        "explanation": "Gap is 3 > 2."
      }
    ],
    "constraints": [
      "1 <= readings.length <= 10^5",
      "0 <= max_gap <= 10^5"
    ],
    "starterCode": {
      "python": "def has_nearby_repeat(readings: list[int], max_gap: int) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function hasNearbyRepeat(readings, maxGap) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean hasNearbyRepeat(int[] readings, int maxGap) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool hasNearbyRepeat(vector<int>& readings, int maxGap) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "readings = [10, 20, 30, 10], max_gap = 3",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "readings = [10, 20, 30, 10], max_gap = 2",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "retail-shelf-sku-consolidation",
    "title": "Retail Shelf Active SKU Compaction",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A store display shelf is represented by an array `slots` where `0` marks an empty slot and positive integers represent product SKUs. Slide all active SKUs to the left preserving their order while pushing empty `0` slots to the right end in-place, and return `slots`.",
    "examples": [
      {
        "input": "slots = [0, 104, 0, 209, 315]",
        "output": "[104, 209, 315, 0, 0]",
        "explanation": "Active SKUs shift left; empty slots move to the right."
      },
      {
        "input": "slots = [0, 0]",
        "output": "[0, 0]",
        "explanation": "All slots are empty."
      }
    ],
    "constraints": [
      "1 <= slots.length <= 10^4",
      "0 <= slots[i] <= 10^6"
    ],
    "starterCode": {
      "python": "def compact_shelf(slots: list[int]) -> list[int]:\n    # Write your solution here\n    return slots\n",
      "javascript": "function compactShelf(slots) {\n  // Write your solution here\n  return slots;\n}\n",
      "java": "class Solution {\n    public int[] compactShelf(int[] slots) {\n        // Write your solution here\n        return slots;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> compactShelf(vector<int>& slots) {\n        // Write your solution here\n        return slots;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "slots = [0, 104, 0, 209, 315]",
        "expected": "[104, 209, 315, 0, 0]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "slots = [0, 0]",
        "expected": "[0, 0]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "cloud-billing-spike-window",
    "title": "Cloud SLA Uptime Stretch with Error Budget",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A cloud monitoring feed logs minute-by-minute status `uptime` where `1` means healthy and `0` means an error minute. Your SLA error budget allows forgiving at most `budget` error minutes. Return the length of the longest continuous compliant stretch.",
    "examples": [
      {
        "input": "uptime = [1, 1, 0, 0, 1, 1, 1, 0, 1], budget = 2",
        "output": "7",
        "explanation": "Forgiving two 0s yields a 7-minute compliant stretch."
      },
      {
        "input": "uptime = [0, 0, 1, 0], budget = 0",
        "output": "1",
        "explanation": "Zero error budget allows only the single healthy minute."
      }
    ],
    "constraints": [
      "1 <= uptime.length <= 10^5",
      "uptime[i] is 0 or 1",
      "0 <= budget <= uptime.length"
    ],
    "starterCode": {
      "python": "def longest_sla_stretch(uptime: list[int], budget: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestSlaStretch(uptime, budget) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestSlaStretch(int[] uptime, int budget) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestSlaStretch(vector<int>& uptime, int budget) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "uptime = [1, 1, 0, 0, 1, 1, 1, 0, 1], budget = 2",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "uptime = [0, 0, 1, 0], budget = 0",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ride-share-fare-triplet-match",
    "title": "Ride-Share Zero-Net Subsidy Triplets",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "A mobility platform evaluates integer fare adjustments `deltas` (positive surcharges, negative discounts). Return all unique sorted triplets `[a, b, c]` from distinct entries in `deltas` whose adjustments net out to exactly `0`.",
    "examples": [
      {
        "input": "deltas = [-3, 1, 2, -1, 0, 2]",
        "output": "[[-3, 1, 2], [-1, 0, 1]]",
        "explanation": "Two distinct zero-net triplets."
      },
      {
        "input": "deltas = [1, 2, 3]",
        "output": "[]",
        "explanation": "All adjustments are positive."
      }
    ],
    "constraints": [
      "3 <= deltas.length <= 2000",
      "-10^5 <= deltas[i] <= 10^5"
    ],
    "starterCode": {
      "python": "def zero_net_triplets(deltas: list[int]) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function zeroNetTriplets(deltas) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> zeroNetTriplets(int[] deltas) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> zeroNetTriplets(vector<int>& deltas) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "deltas = [-3, 1, 2, -1, 0, 2]",
        "expected": "[[-3, 1, 2], [-1, 0, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "deltas = [1, 2, 3]",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "factory-conveyor-batch-rebalance",
    "title": "Factory Shift Quota Sub-Runs",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Hash Table",
      "Prefix Sum"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An assembly line logs net unit adjustments per hour in `hourly_net` (positive for output, negative for rework deductions). Count how many contiguous hour intervals achieved an exact net total of `quota`.",
    "examples": [
      {
        "input": "hourly_net = [2, 3, -1, 4, 1], quota = 5",
        "output": "2",
        "explanation": "[2, 3] and [4, 1] both total 5."
      },
      {
        "input": "hourly_net = [1, -1, 1, -1], quota = 0",
        "output": "4",
        "explanation": "Four contiguous sub-runs sum to 0."
      }
    ],
    "constraints": [
      "1 <= hourly_net.length <= 2 * 10^4",
      "-1000 <= hourly_net[i] <= 1000"
    ],
    "starterCode": {
      "python": "def count_quota_runs(hourly_net: list[int], quota: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countQuotaRuns(hourlyNet, quota) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countQuotaRuns(int[] hourlyNet, int quota) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countQuotaRuns(vector<int>& hourlyNet, int quota) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "hourly_net = [2, 3, -1, 4, 1], quota = 5",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "hourly_net = [1, -1, 1, -1], quota = 0",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "trading-desk-drawdown-recovery",
    "title": "Commodity Contract Optimal Entry-Exit Spread",
    "difficulty": "Easy",
    "topics": [
      "Array",
      "Greedy"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A desk records hourly spot quotes `quotes` for a single commodity. You may open at most one long position at hour `i` and close it at a later hour `j > i`. Return the maximum spread `quotes[j] - quotes[i]`, or `0` if no profitable trade exists.",
    "examples": [
      {
        "input": "quotes = [42, 38, 45, 39, 51, 47]",
        "output": "13",
        "explanation": "Buy at 38 (hour 1) and sell at 51 (hour 4) -> spread 13."
      },
      {
        "input": "quotes = [90, 85, 80, 70]",
        "output": "0",
        "explanation": "Monotonically falling quotes give 0 profit."
      }
    ],
    "constraints": [
      "1 <= quotes.length <= 10^5",
      "0 <= quotes[i] <= 10^5"
    ],
    "starterCode": {
      "python": "def max_contract_spread(quotes: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxContractSpread(quotes) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxContractSpread(int[] quotes) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxContractSpread(vector<int>& quotes) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "quotes = [42, 38, 45, 39, 51, 47]",
        "expected": "13",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "quotes = [90, 85, 80, 70]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "cdn-bandwidth-burst-quota",
    "title": "CDN Shortest Burst Reaching Bandwidth Quota",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A CDN edge node logs positive request sizes in kilobytes `payloads`. Return the minimal number of consecutive requests whose combined payload is at least `quota`, or `0` if the entire log sums to less than `quota`.",
    "examples": [
      {
        "input": "quota = 15, payloads = [4, 2, 7, 3, 9, 6]",
        "output": "2",
        "explanation": "Consecutive requests [9, 6] sum to 15 in length 2."
      },
      {
        "input": "quota = 50, payloads = [5, 5, 5]",
        "output": "0",
        "explanation": "Total payload is 15 < 50."
      }
    ],
    "constraints": [
      "1 <= payloads.length <= 10^5",
      "1 <= payloads[i] <= 10^4",
      "1 <= quota <= 10^9"
    ],
    "starterCode": {
      "python": "def shortest_burst(quota: int, payloads: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function shortestBurst(quota, payloads) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int shortestBurst(int quota, int[] payloads) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestBurst(int quota, vector<int>& payloads) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "quota = 15, payloads = [4, 2, 7, 3, 9, 6]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "quota = 50, payloads = [5, 5, 5]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "cold-chain-sensor-drift-range",
    "title": "Cold-Chain Rolling Peak Temperature Audit",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Sliding Window",
      "Monotonic Queue"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A pharmaceutical refrigerator logs temperature readings `temps` every minute. An audit requires reporting the peak temperature observed within every contiguous `window` minutes from start to finish.",
    "examples": [
      {
        "input": "temps = [4, 7, 2, 5, 9, 3, 6], window = 3",
        "output": "[7, 7, 9, 9, 9]",
        "explanation": "Rolling 3-minute peaks."
      },
      {
        "input": "temps = [-5, -2, -8], window = 2",
        "output": "[-2, -2]",
        "explanation": "Works with negative freezer temperatures."
      }
    ],
    "constraints": [
      "1 <= window <= temps.length <= 10^5",
      "-10^4 <= temps[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def rolling_peak_temps(temps: list[int], window: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function rollingPeakTemps(temps, window) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] rollingPeakTemps(int[] temps, int window) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> rollingPeakTemps(vector<int>& temps, int window) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "temps = [4, 7, 2, 5, 9, 3, 6], window = 3",
        "expected": "[7, 7, 9, 9, 9]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "temps = [-5, -2, -8], window = 2",
        "expected": "[-2, -2]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "fleet-fuel-tank-equalization",
    "title": "Highway Grade Balanced Elevation Segment",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Hash Table",
      "Prefix Sum"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A route telemetry file encodes each kilometer as `1` (uphill) or `0` (downhill) in `grades`. Find the length of the longest contiguous stretch of road containing an equal number of uphill and downhill kilometers.",
    "examples": [
      {
        "input": "grades = [1, 0, 1, 1, 0, 0]",
        "output": "6",
        "explanation": "Entire 6 km route has three 1s and three 0s."
      },
      {
        "input": "grades = [1, 1, 0, 1, 1]",
        "output": "2",
        "explanation": "[1, 0] or [0, 1] has length 2."
      }
    ],
    "constraints": [
      "1 <= grades.length <= 10^5",
      "grades[i] is 0 or 1."
    ],
    "starterCode": {
      "python": "def longest_balanced_grade(grades: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestBalancedGrade(grades) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestBalancedGrade(int[] grades) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestBalancedGrade(vector<int>& grades) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "grades = [1, 0, 1, 1, 0, 0]",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "grades = [1, 1, 0, 1, 1]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "port-crane-container-reservoir",
    "title": "Port Bulkhead Maximum Flood Basin",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Two Pointers",
      "Greedy"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Along a dockside channel, vertical steel bulkheads of heights `walls` stand 1 meter apart. Choose two bulkheads to form a temporary retention basin holding the maximum cross-sectional area `(j - i) * min(walls[i], walls[j])`.",
    "examples": [
      {
        "input": "walls = [3, 9, 4, 2, 8, 5, 7]",
        "output": "35",
        "explanation": "Walls at index 1 (height 9) and index 6 (height 7) enclose 5 * 7 = 35."
      },
      {
        "input": "walls = [2, 2]",
        "output": "2",
        "explanation": "1 * min(2, 2) = 2."
      }
    ],
    "constraints": [
      "2 <= walls.length <= 10^5",
      "0 <= walls[i] <= 10^4"
    ],
    "starterCode": {
      "python": "def max_basin_area(walls: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxBasinArea(walls) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxBasinArea(int[] walls) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxBasinArea(vector<int>& walls) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "walls = [3, 9, 4, 2, 8, 5, 7]",
        "expected": "35",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "walls = [2, 2]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "smart-irrigation-terrace-capture",
    "title": "Terraced Farm Rainwater Retention",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A hillside farm is graded into unit-width concrete terraces with non-negative integer elevations `terraces`. After a storm, compute how many total units of rainwater remain pooled in the depressions between higher terraces.",
    "examples": [
      {
        "input": "terraces = [3, 0, 2, 0, 4]",
        "output": "7",
        "explanation": "Pools of depth 3, 1, 3 hold 7 units."
      },
      {
        "input": "terraces = [1, 2, 3, 2, 1]",
        "output": "0",
        "explanation": "Peak shape drains outward with 0 retention."
      }
    ],
    "constraints": [
      "1 <= terraces.length <= 2 * 10^4",
      "0 <= terraces[i] <= 10^5"
    ],
    "starterCode": {
      "python": "def retained_rainwater(terraces: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function retainedRainwater(terraces) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int retainedRainwater(int[] terraces) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int retainedRainwater(vector<int>& terraces) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "terraces = [3, 0, 2, 0, 4]",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "terraces = [1, 2, 3, 2, 1]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "grocery-aisle-two-brand-showcase",
    "title": "Supermarket Two-Brand Promotional Span",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A supermarket aisle lists the supplier ID of each shelf bay in `brands`. A promotional banner can cover any contiguous sequence of bays as long as it spans at most `2` distinct supplier IDs. Return the maximum number of bays the banner can cover.",
    "examples": [
      {
        "input": "brands = [10, 20, 10, 30, 20, 20]",
        "output": "3",
        "explanation": "[10, 20, 10] and [30, 20, 20] each span 3 bays with 2 brands."
      },
      {
        "input": "brands = [7, 7, 7, 7]",
        "output": "4",
        "explanation": "Single brand covers all 4 bays."
      }
    ],
    "constraints": [
      "1 <= brands.length <= 10^5",
      "0 <= brands[i] <= 10^5"
    ],
    "starterCode": {
      "python": "def max_two_brand_span(brands: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxTwoBrandSpan(brands) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxTwoBrandSpan(int[] brands) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxTwoBrandSpan(vector<int>& brands) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "brands = [10, 20, 10, 30, 20, 20]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "brands = [7, 7, 7, 7]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "auction-bid-multiplier-excluding-self",
    "title": "Risk-Factor Peer Multiplier Array",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Prefix Sum"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "In a syndicated loan desk, each participant has an integer risk multiplier `factors[i]`. Compute an array `peer_prod` where `peer_prod[i]` is the product of all participants' multipliers except participant `i`, in `O(n)` time without using division.",
    "examples": [
      {
        "input": "factors = [2, 3, 4, 5]",
        "output": "[60, 40, 30, 24]",
        "explanation": "Excluding each factor gives 60, 40, 30, 24."
      },
      {
        "input": "factors = [3, 0, 2]",
        "output": "[0, 6, 0]",
        "explanation": "Only index 1 excludes the 0 factor."
      }
    ],
    "constraints": [
      "2 <= factors.length <= 10^5",
      "-30 <= factors[i] <= 30"
    ],
    "starterCode": {
      "python": "def peer_risk_products(factors: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function peerRiskProducts(factors) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] peerRiskProducts(int[] factors) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> peerRiskProducts(vector<int>& factors) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "factors = [2, 3, 4, 5]",
        "expected": "[60, 40, 30, 24]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "factors = [3, 0, 2]",
        "expected": "[0, 6, 0]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ticket-kiosk-consecutive-seat-block",
    "title": "Stadium Longest Contiguous Seat Block",
    "difficulty": "Medium",
    "topics": [
      "Array",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A ticket kiosk receives an unsorted list of reserved seat numbers `seats` along a single massive row. Return the length of the longest block of consecutive integer seat numbers in `O(n)` time.",
    "examples": [
      {
        "input": "seats = [45, 12, 14, 13, 80, 15]",
        "output": "4",
        "explanation": "Seats 12, 13, 14, 15 form a block of length 4."
      },
      {
        "input": "seats = []",
        "output": "0",
        "explanation": "No reservations."
      }
    ],
    "constraints": [
      "0 <= seats.length <= 10^5",
      "-10^9 <= seats[i] <= 10^9"
    ],
    "starterCode": {
      "python": "def longest_seat_block(seats: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestSeatBlock(seats) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestSeatBlock(int[] seats) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestSeatBlock(vector<int>& seats) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "seats = [45, 12, 14, 13, 80, 15]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "seats = []",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "api-rate-limiter-burst-window",
    "title": "API Gateway Longest Unique-Route Streak",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An API gateway encodes each incoming request's route as a single ASCII character in `trace`. Return the length of the longest contiguous request streak in which every route character is distinct.",
    "examples": [
      {
        "input": "trace = \"abcaefgb\"",
        "output": "6",
        "explanation": "\"caefgb\" has 6 distinct routes."
      },
      {
        "input": "trace = \"zzzz\"",
        "output": "1",
        "explanation": "All requests hit the same route."
      }
    ],
    "constraints": [
      "0 <= trace.length <= 5 * 10^4",
      "Printable ASCII characters."
    ],
    "starterCode": {
      "python": "def longest_unique_trace(trace: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestUniqueTrace(trace) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestUniqueTrace(String trace) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestUniqueTrace(string trace) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "trace = \"abcaefgb\"",
        "expected": "6",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "trace = \"zzzz\"",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "fulfillment-crate-smallest-missing-tag",
    "title": "Crate Barcode Lowest Unassigned Positive ID",
    "difficulty": "Hard",
    "topics": [
      "Array",
      "Cyclic Sort"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A shipping manifest contains an unsorted array of integer crate tags `tags` (which may include zeros, negatives, or duplicates). Find the smallest positive integer tag (`>= 1`) not present in `tags`, in `O(n)` time and `O(1)` extra space.",
    "examples": [
      {
        "input": "tags = [4, 1, -2, 2]",
        "output": "3",
        "explanation": "1 and 2 are assigned; 3 is the lowest missing positive ID."
      },
      {
        "input": "tags = [10, 20, 30]",
        "output": "1",
        "explanation": "1 is unassigned."
      }
    ],
    "constraints": [
      "1 <= tags.length <= 10^5",
      "-2^31 <= tags[i] <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def lowest_unassigned_tag(tags: list[int]) -> int:\n    # Write your solution here\n    return 1\n",
      "javascript": "function lowestUnassignedTag(tags) {\n  // Write your solution here\n  return 1;\n}\n",
      "java": "class Solution {\n    public int lowestUnassignedTag(int[] tags) {\n        // Write your solution here\n        return 1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lowestUnassignedTag(vector<int>& tags) {\n        // Write your solution here\n        return 1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tags = [4, 1, -2, 2]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tags = [10, 20, 30]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "freight-ferry-paired-vehicle-load",
    "title": "Ferry Deck Minimum Vehicle Crossings",
    "difficulty": "Medium",
    "topics": [
      "Two Pointers",
      "Greedy",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A river ferry can carry at most two vehicles per crossing with a combined weight not exceeding `deck_cap`. Given vehicle weights `vehicles` (each `<= deck_cap`), return the minimum number of crossings needed to transport all vehicles.",
    "examples": [
      {
        "input": "vehicles = [12, 18, 15, 10], deck_cap = 30",
        "output": "2",
        "explanation": "Crossings: (10, 18) and (12, 15)."
      },
      {
        "input": "vehicles = [25, 20, 15, 10], deck_cap = 30",
        "output": "3",
        "explanation": "Crossings: (10, 20), (15), (25)."
      }
    ],
    "constraints": [
      "1 <= vehicles.length <= 5 * 10^4",
      "1 <= vehicles[i] <= deck_cap <= 10^5"
    ],
    "starterCode": {
      "python": "def min_ferry_crossings(vehicles: list[int], deck_cap: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minFerryCrossings(vehicles, deckCap) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minFerryCrossings(int[] vehicles, int deckCap) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minFerryCrossings(vector<int>& vehicles, int deckCap) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "vehicles = [12, 18, 15, 10], deck_cap = 30",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "vehicles = [25, 20, 15, 10], deck_cap = 30",
        "expected": "3",
        "isHidden": false
      }
    ]
  },
  {
    "id": "log-sanitizer-palindrome-check",
    "title": "Telemetry Signature Symmetry Verifier",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A hardware diagnostic tool emits a string `sig`. Ignore all non-alphanumeric delimiters and letter casing; return `true` if the sanitized signature reads identically forward and backward.",
    "examples": [
      {
        "input": "sig = \"X-42:a:24-x\"",
        "output": "true",
        "explanation": "Sanitized \"x42a24x\" is symmetric."
      },
      {
        "input": "sig = \"node_12\"",
        "output": "false",
        "explanation": "\"node12\" is not symmetric."
      }
    ],
    "constraints": [
      "1 <= sig.length <= 2 * 10^5",
      "Printable ASCII characters."
    ],
    "starterCode": {
      "python": "def is_symmetric_sig(sig: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isSymmetricSig(sig) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isSymmetricSig(String sig) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isSymmetricSig(string sig) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "sig = \"X-42:a:24-x\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "sig = \"node_12\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "config-template-bracket-linter",
    "title": "DSL Template Delimiter Linter",
    "difficulty": "Easy",
    "topics": [
      "Stack",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A config linter strips everything except brackets `()[]{}` into a string `expr`. Return `true` if every opened delimiter is closed by the matching type in proper nested order.",
    "examples": [
      {
        "input": "expr = \"{[(())][]}\"",
        "output": "true",
        "explanation": "All blocks close in valid LIFO order."
      },
      {
        "input": "expr = \"{[}]\"",
        "output": "false",
        "explanation": "`}` cannot close `[`."
      }
    ],
    "constraints": [
      "1 <= expr.length <= 10^4",
      "expr contains only '()[]{}'."
    ],
    "starterCode": {
      "python": "def lint_delimiters(expr: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function lintDelimiters(expr) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean lintDelimiters(String expr) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool lintDelimiters(string expr) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "expr = \"{[(())][]}\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "expr = \"{[}]\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "spreadsheet-postfix-formula-engine",
    "title": "Spreadsheet Postfix Formula Evaluator",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A spreadsheet engine compiles cell formulas into postfix token arrays `formula` containing integer strings and operators `'+'`, `'-'`, `'*'`, `'/'` (where division truncates toward zero). Evaluate and return the integer result.",
    "examples": [
      {
        "input": "formula = [\"5\", \"3\", \"+\", \"4\", \"*\"]",
        "output": "32",
        "explanation": "(5 + 3) * 4 = 32."
      },
      {
        "input": "formula = [\"-9\", \"4\", \"/\"]",
        "output": "-2",
        "explanation": "-9 / 4 truncates toward zero to -2."
      }
    ],
    "constraints": [
      "1 <= formula.length <= 10^4",
      "Valid postfix expression."
    ],
    "starterCode": {
      "python": "def eval_formula(formula: list[str]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function evalFormula(formula) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int evalFormula(String[] formula) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int evalFormula(vector<string>& formula) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "formula = [\"5\", \"3\", \"+\", \"4\", \"*\"]",
        "expected": "32",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "formula = [\"-9\", \"4\", \"/\"]",
        "expected": "-2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "weather-station-warmer-forecast-wait",
    "title": "Observatory Next-Peak Wind Gust Wait",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Monotonic Stack",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A coastal weather station records hourly peak wind speeds `gusts`. For each hour `i`, return how many hours must pass until a strictly stronger gust occurs, or `0` if no stronger gust appears later in the log.",
    "examples": [
      {
        "input": "gusts = [20, 25, 22, 18, 28, 21]",
        "output": "[1, 3, 2, 1, 0, 0]",
        "explanation": "Hour 1 (25) waits 3 hours for hour 4 (28)."
      },
      {
        "input": "gusts = [40, 30, 20]",
        "output": "[0, 0, 0]",
        "explanation": "Strictly falling wind speeds."
      }
    ],
    "constraints": [
      "1 <= gusts.length <= 10^5",
      "0 <= gusts[i] <= 300"
    ],
    "starterCode": {
      "python": "def hours_until_stronger_gust(gusts: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function hoursUntilStrongerGust(gusts) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] hoursUntilStrongerGust(int[] gusts) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> hoursUntilStrongerGust(vector<int>& gusts) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "gusts = [20, 25, 22, 18, 28, 21]",
        "expected": "[1, 3, 2, 1, 0, 0]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "gusts = [40, 30, 20]",
        "expected": "[0, 0, 0]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "drone-corridor-head-on-resolution",
    "title": "Autonomous Drone Tunnel Collision Simulator",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Simulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Delivery drones fly along a narrow 1D tunnel at equal speed. Each entry in `drones` gives mass (absolute value) and direction (`> 0` eastbound, `< 0` westbound). On a head-on collision, the lighter drone is grounded; if equal mass, both are grounded. Return the surviving drones in order.",
    "examples": [
      {
        "input": "drones = [6, 12, -8]",
        "output": "[6, 12]",
        "explanation": "12 grounds -8."
      },
      {
        "input": "drones = [9, -9]",
        "output": "[]",
        "explanation": "Equal masses ground both drones."
      }
    ],
    "constraints": [
      "1 <= drones.length <= 10^4",
      "-1000 <= drones[i] <= 1000",
      "drones[i] != 0"
    ],
    "starterCode": {
      "python": "def surviving_drones(drones: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function survivingDrones(drones) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] survivingDrones(int[] drones) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> survivingDrones(vector<int>& drones) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "drones = [6, 12, -8]",
        "expected": "[6, 12]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "drones = [9, -9]",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "macro-expander-nested-repeat",
    "title": "Hardware Test-Vector Macro Expander",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A chip verification tool compresses signal sequences using `k[seq]`, meaning `seq` repeats `k` times (with arbitrary nesting). Expand `vector_code` and return the uncompressed signal string.",
    "examples": [
      {
        "input": "vector_code = \"2[hi]3[lo]\"",
        "output": "\"hihilololo\"",
        "explanation": "Repeats hi twice and lo thrice."
      },
      {
        "input": "vector_code = \"2[a3[b]]\"",
        "output": "\"abbbabbb\"",
        "explanation": "Inner 3[b] expands to bbb first."
      }
    ],
    "constraints": [
      "1 <= vector_code.length <= 50",
      "Multipliers are in [1, 300]."
    ],
    "starterCode": {
      "python": "def expand_macro(vector_code: str) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function expandMacro(vectorCode) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String expandMacro(String vectorCode) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string expandMacro(string vectorCode) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "vector_code = \"2[hi]3[lo]\"",
        "expected": "\"hihilololo\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "vector_code = \"2[a3[b]]\"",
        "expected": "\"abbbabbb\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "cli-filesystem-canonical-resolver",
    "title": "Container Mount Path Normalizer",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A container runtime normalizes user-supplied absolute mount paths `raw_path`. Collapse repeated `'/'`, ignore `'.'` segments, pop the parent directory on `'..'`, and return the canonical path starting with `'/'`.",
    "examples": [
      {
        "input": "raw_path = \"/var/log/../lib//cache/\"",
        "output": "\"/var/lib/cache\"",
        "explanation": "`..` pops `log`, double slash collapses."
      },
      {
        "input": "raw_path = \"/a/../../\"",
        "output": "\"/\"",
        "explanation": "Cannot ascend above root."
      }
    ],
    "constraints": [
      "1 <= raw_path.length <= 3000",
      "Starts with '/'."
    ],
    "starterCode": {
      "python": "def normalize_mount_path(raw_path: str) -> str:\n    # Write your solution here\n    return \"/\"\n",
      "javascript": "function normalizeMountPath(rawPath) {\n  // Write your solution here\n  return \"/\";\n}\n",
      "java": "class Solution {\n    public String normalizeMountPath(String rawPath) {\n        // Write your solution here\n        return \"/\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string normalizeMountPath(string rawPath) {\n        // Write your solution here\n        return \"/\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "raw_path = \"/var/log/../lib//cache/\"",
        "expected": "\"/var/lib/cache\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "raw_path = \"/a/../../\"",
        "expected": "\"/\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "shipping-lane-convoy-clusters",
    "title": "Single-Lane Freight Convoy Counter",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Autonomous freight trucks travel toward a port at milepost `port_mile` on a single-lane highway without overtaking. Given starting mileposts `starts` and cruising `speeds`, a faster trailing truck merges into a slower convoy ahead. Return how many distinct convoys reach the port.",
    "examples": [
      {
        "input": "port_mile = 20, starts = [16, 12, 4, 8], speeds = [2, 4, 2, 3]",
        "output": "3",
        "explanation": "Trucks at 16 and 12 merge (ETA 2.0), followed by 8 (ETA 4.0) and 4 (ETA 8.0) -> 3 convoys."
      },
      {
        "input": "port_mile = 10, starts = [5], speeds = [5]",
        "output": "1",
        "explanation": "Single truck."
      }
    ],
    "constraints": [
      "1 <= starts.length == speeds.length <= 10^5",
      "All starts are distinct and < port_mile."
    ],
    "starterCode": {
      "python": "def count_convoys(port_mile: int, starts: list[int], speeds: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countConvoys(portMile, starts, speeds) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countConvoys(int portMile, int[] starts, int[] speeds) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countConvoys(int portMile, vector<int>& starts, vector<int>& speeds) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "port_mile = 20, starts = [16, 12, 4, 8], speeds = [2, 4, 2, 3]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "port_mile = 10, starts = [5], speeds = [5]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ledger-code-anagram-bucketing",
    "title": "Transaction Checksum Anagram Clustering",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "A fraud-detection pipeline inspects lowercase alphabetic transaction codes `codes`. Cluster together all codes that are character-rearrangements (anagrams) of one another and return the clusters in any order.",
    "examples": [
      {
        "input": "codes = [\"arc\", \"car\", \"tap\", \"pat\", \"rat\"]",
        "output": "[[\"arc\", \"car\"], [\"tap\", \"pat\"], [\"rat\"]]",
        "explanation": "Grouped by identical letter frequencies."
      },
      {
        "input": "codes = [\"xyz\"]",
        "output": "[[\"xyz\"]]",
        "explanation": "Single cluster."
      }
    ],
    "constraints": [
      "1 <= codes.length <= 10^4",
      "0 <= codes[i].length <= 100"
    ],
    "starterCode": {
      "python": "def cluster_codes(codes: list[str]) -> list[list[str]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function clusterCodes(codes) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<String>> clusterCodes(String[] codes) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> clusterCodes(vector<string>& codes) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "codes = [\"arc\", \"car\", \"tap\", \"pat\", \"rat\"]",
        "expected": "[[\"arc\", \"car\"], [\"tap\", \"pat\"], [\"rat\"]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "codes = [\"xyz\"]",
        "expected": "[[\"xyz\"]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "dns-label-shared-prefix",
    "title": "Service Hostname Common Prefix Extractor",
    "difficulty": "Easy",
    "topics": [
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a list of lowercase microservice hostnames `hosts`, return the longest shared prefix string present at the start of every hostname, or `\"\"` if none exists.",
    "examples": [
      {
        "input": "hosts = [\"prod-api-1\", \"prod-api-2\", \"prod-auth\"]",
        "output": "\"prod-a\"",
        "explanation": "All hostnames begin with \"prod-a\"."
      },
      {
        "input": "hosts = [\"alpha\", \"beta\"]",
        "output": "\"\"",
        "explanation": "No shared leading character."
      }
    ],
    "constraints": [
      "1 <= hosts.length <= 200",
      "0 <= hosts[i].length <= 200"
    ],
    "starterCode": {
      "python": "def shared_host_prefix(hosts: list[str]) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function sharedHostPrefix(hosts) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String sharedHostPrefix(String[] hosts) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string sharedHostPrefix(vector<string>& hosts) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "hosts = [\"prod-api-1\", \"prod-api-2\", \"prod-auth\"]",
        "expected": "\"prod-a\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "hosts = [\"alpha\", \"beta\"]",
        "expected": "\"\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "packet-framing-codec-roundtrip",
    "title": "Telemetry Packet Length-Prefixed Codec",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Design"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A network agent bundles arbitrary ASCII log messages `packets` into a single wire string and unpacks them on the receiving end. Implement `wire_roundtrip(packets)` using length-prefixed framing (`<len>:<payload>`) and return the decoded list.",
    "examples": [
      {
        "input": "packets = [\"ok:200\", \"err:500\", \"\"]",
        "output": "[\"ok:200\", \"err:500\", \"\"]",
        "explanation": "Colons and empty strings survive roundtrip intact."
      },
      {
        "input": "packets = []",
        "output": "[]",
        "explanation": "Empty list encodes and decodes to empty list."
      }
    ],
    "constraints": [
      "0 <= packets.length <= 200",
      "Any ASCII characters permitted."
    ],
    "starterCode": {
      "python": "def wire_roundtrip(packets: list[str]) -> list[str]:\n    # Write your solution here\n    return []\n",
      "javascript": "function wireRoundtrip(packets) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<String> wireRoundtrip(List<String> packets) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> wireRoundtrip(vector<string>& packets) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "packets = [\"ok:200\", \"err:500\", \"\"]",
        "expected": "[\"ok:200\", \"err:500\", \"\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "packets = []",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sensor-stream-run-length-packer",
    "title": "Telemetry State Run-Length Packer",
    "difficulty": "Medium",
    "topics": [
      "String",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A low-bandwidth satellite transmits state symbols `states` as a character array. Compress consecutive identical symbols in-place: emit the symbol once, followed by the individual decimal digits of the run length only if the run length is `> 1`. Return the packed character list.",
    "examples": [
      {
        "input": "states = [\"H\", \"H\", \"H\", \"L\", \"M\", \"M\"]",
        "output": "[\"H\", \"3\", \"L\", \"M\", \"2\"]",
        "explanation": "Runs H(3), L(1), M(2)."
      },
      {
        "input": "states = [\"X\"]",
        "output": "[\"X\"]",
        "explanation": "Single symbol stays uncompressed."
      }
    ],
    "constraints": [
      "1 <= states.length <= 2000"
    ],
    "starterCode": {
      "python": "def pack_states(states: list[str]) -> list[str]:\n    # Write your solution here\n    return []\n",
      "javascript": "function packStates(states) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public char[] packStates(char[] states) {\n        // Write your solution here\n        return new char[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<char> packStates(vector<char>& states) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "states = [\"H\", \"H\", \"H\", \"L\", \"M\", \"M\"]",
        "expected": "[\"H\", \"3\", \"L\", \"M\", \"2\"]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "states = [\"X\"]",
        "expected": "[\"X\"]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "badge-id-minimize-after-deletions",
    "title": "Badge Serial Minimum Code After Pruning",
    "difficulty": "Medium",
    "topics": [
      "Stack",
      "Monotonic Stack",
      "Greedy",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A security system shortens numeric badge serial `serial` by deleting exactly `drops` digits while keeping remaining digits in order. Return the numerically smallest possible resulting string (with no leading zeros, or `\"0\"` if zero).",
    "examples": [
      {
        "input": "serial = \"531429\", drops = 2",
        "output": "\"1429\"",
        "explanation": "Deleting 5 and 3 yields 1429."
      },
      {
        "input": "serial = \"10050\", drops = 1",
        "output": "\"50\"",
        "explanation": "Deleting 1 leaves 0050 -> 50."
      }
    ],
    "constraints": [
      "1 <= drops <= serial.length <= 10^5",
      "Digits only."
    ],
    "starterCode": {
      "python": "def smallest_badge_code(serial: str, drops: int) -> str:\n    # Write your solution here\n    return \"0\"\n",
      "javascript": "function smallestBadgeCode(serial, drops) {\n  // Write your solution here\n  return \"0\";\n}\n",
      "java": "class Solution {\n    public String smallestBadgeCode(String serial, int drops) {\n        // Write your solution here\n        return \"0\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string smallestBadgeCode(string serial, int drops) {\n        // Write your solution here\n        return \"0\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "serial = \"531429\", drops = 2",
        "expected": "\"1429\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "serial = \"10050\", drops = 1",
        "expected": "\"50\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "audit-trail-window-matcher",
    "title": "SIEM Shortest Compliance Log Slice",
    "difficulty": "Hard",
    "topics": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A SIEM engine scans an event stream `stream` for the shortest contiguous slice containing every required event code in `required` (respecting duplicate counts). Return that shortest slice, or `\"\"` if no slice satisfies `required`.",
    "examples": [
      {
        "input": "stream = \"XABYZDABC\", required = \"ABC\"",
        "output": "\"ABC\"",
        "explanation": "Final 3 characters contain A, B, and C."
      },
      {
        "input": "stream = \"AB\", required = \"ABB\"",
        "output": "\"\"",
        "explanation": "Stream only has one B."
      }
    ],
    "constraints": [
      "1 <= stream.length, required.length <= 10^5"
    ],
    "starterCode": {
      "python": "def shortest_audit_slice(stream: str, required: str) -> str:\n    # Write your solution here\n    return \"\"\n",
      "javascript": "function shortestAuditSlice(stream, required) {\n  // Write your solution here\n  return \"\";\n}\n",
      "java": "class Solution {\n    public String shortestAuditSlice(String stream, String required) {\n        // Write your solution here\n        return \"\";\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    string shortestAuditSlice(string stream, string required) {\n        // Write your solution here\n        return \"\";\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "stream = \"XABYZDABC\", required = \"ABC\"",
        "expected": "\"ABC\"",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "stream = \"AB\", required = \"ABB\"",
        "expected": "\"\"",
        "isHidden": false
      }
    ]
  },
  {
    "id": "terminal-buffer-backspace-equivalence",
    "title": "CLI Keystroke Buffer Equivalence",
    "difficulty": "Easy",
    "topics": [
      "String",
      "Two Pointers",
      "Stack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Two remote operators type command strings `log_a` and `log_b` where `'#'` represents a backspace key. Return `true` if both operators end up with the exact same final terminal buffer.",
    "examples": [
      {
        "input": "log_a = \"ls -a#l\", log_b = \"ls -l\"",
        "output": "true",
        "explanation": "Both resolve to \"ls -l\"."
      },
      {
        "input": "log_a = \"rm#\", log_b = \"mv#\"",
        "output": "false",
        "explanation": "Resolves to \"r\" vs \"m\"."
      }
    ],
    "constraints": [
      "1 <= log_a.length, log_b.length <= 500"
    ],
    "starterCode": {
      "python": "def same_terminal_buffer(log_a: str, log_b: str) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function sameTerminalBuffer(logA, logB) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean sameTerminalBuffer(String logA, String logB) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool sameTerminalBuffer(string logA, string logB) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "log_a = \"ls -a#l\", log_b = \"ls -l\"",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "log_a = \"rm#\", log_b = \"mv#\"",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "playlist-queue-reverse-segments",
    "title": "Streaming Queue Block-Size Reversal",
    "difficulty": "Hard",
    "topics": [
      "Linked List",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A media server stores track IDs in a linked playback queue `tracks`. Reverse every full consecutive block of `block_size` tracks, leaving any trailing partial block of fewer than `block_size` tracks in its original order.",
    "examples": [
      {
        "input": "tracks = [10, 20, 30, 40, 50], block_size = 2",
        "output": "[20, 10, 40, 30, 50]",
        "explanation": "Blocks [10,20] and [30,40] reverse; [50] stays."
      },
      {
        "input": "tracks = [1, 2, 3, 4, 5], block_size = 3",
        "output": "[3, 2, 1, 4, 5]",
        "explanation": "[1,2,3] reverses; [4,5] stays."
      }
    ],
    "constraints": [
      "1 <= block_size <= tracks.length <= 5000"
    ],
    "starterCode": {
      "python": "def reverse_track_blocks(tracks: list[int], block_size: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function reverseTrackBlocks(tracks, blockSize) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] reverseTrackBlocks(int[] tracks, int blockSize) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> reverseTrackBlocks(vector<int>& tracks, int blockSize) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tracks = [10, 20, 30, 40, 50], block_size = 2",
        "expected": "[20, 10, 40, 30, 50]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tracks = [1, 2, 3, 4, 5], block_size = 3",
        "expected": "[3, 2, 1, 4, 5]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "telemetry-buffer-lru-eviction",
    "title": "IoT Gateway LRU Edge Cache Simulator",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Hash Table",
      "Design"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An edge gateway caches sensor lookups with maximum size `cap`. Given a sequence of commands `cmds` (`[\"set\", k, v]` or `[\"read\", k]`), evict the least-recently-used key when capacity is exceeded and return the list of integer results from all `read` commands (`-1` on cache miss).",
    "examples": [
      {
        "input": "cap = 2, cmds = [[\"set\", 1, 10], [\"set\", 2, 20], [\"read\", 1], [\"set\", 3, 30], [\"read\", 2], [\"read\", 3]]",
        "output": "[10, -1, 30]",
        "explanation": "Reading 1 refreshes it, so 2 is evicted when 3 arrives."
      },
      {
        "input": "cap = 1, cmds = [[\"set\", 5, 50], [\"set\", 6, 60], [\"read\", 5], [\"read\", 6]]",
        "output": "[-1, 60]",
        "explanation": "Capacity 1 evicts 5 immediately."
      }
    ],
    "constraints": [
      "1 <= cap <= 3000",
      "1 <= cmds.length <= 10^5"
    ],
    "starterCode": {
      "python": "def simulate_edge_cache(cap: int, cmds: list[list]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function simulateEdgeCache(cap, cmds) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> simulateEdgeCache(int cap, List<List<Object>> cmds) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> simulateEdgeCache(int cap, vector<vector<string>>& cmds) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "cap = 2, cmds = [[\"set\", 1, 10], [\"set\", 2, 20], [\"read\", 1], [\"set\", 3, 30], [\"read\", 2], [\"read\", 3]]",
        "expected": "[10, -1, 30]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "cap = 1, cmds = [[\"set\", 5, 50], [\"set\", 6, 60], [\"read\", 5], [\"read\", 6]]",
        "expected": "[-1, 60]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "routing-ring-loop-detector",
    "title": "Packet Forwarding Table Loop Detector",
    "difficulty": "Easy",
    "topics": [
      "Linked List",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A router chain is represented by `next_hop` where router `i` forwards to `next_hop[i]` (`-1` terminates delivery). Starting at router `0`, return `true` if a packet enters an infinite routing loop using O(1) extra space.",
    "examples": [
      {
        "input": "next_hop = [1, 2, 3, 1]",
        "output": "true",
        "explanation": "Packet cycles 1 -> 2 -> 3 -> 1."
      },
      {
        "input": "next_hop = [1, 2, -1]",
        "output": "false",
        "explanation": "Packet terminates at router 2."
      }
    ],
    "constraints": [
      "1 <= next_hop.length <= 10^5",
      "-1 <= next_hop[i] < next_hop.length"
    ],
    "starterCode": {
      "python": "def has_routing_loop(next_hop: list[int]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function hasRoutingLoop(nextHop) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean hasRoutingLoop(int[] nextHop) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool hasRoutingLoop(vector<int>& nextHop) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "next_hop = [1, 2, 3, 1]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "next_hop = [1, 2, -1]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "invoice-digit-stream-adder",
    "title": "Legacy Tape Reverse-Digit Ledger Adder",
    "difficulty": "Medium",
    "topics": [
      "Linked List",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Two legacy accounting tapes store non-negative integers in reverse decimal digit order (`tape_a` and `tape_b`). Sum the two amounts and return the result in the same reverse-digit list format.",
    "examples": [
      {
        "input": "tape_a = [4, 7, 1], tape_b = [6, 2, 8]",
        "output": "[0, 0, 0, 1]",
        "explanation": "174 + 826 = 1000."
      },
      {
        "input": "tape_a = [5, 1], tape_b = [3]",
        "output": "[8, 1]",
        "explanation": "15 + 3 = 18."
      }
    ],
    "constraints": [
      "1 <= tape_a.length, tape_b.length <= 100",
      "0 <= digit <= 9"
    ],
    "starterCode": {
      "python": "def add_ledger_tapes(tape_a: list[int], tape_b: list[int]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function addLedgerTapes(tapeA, tapeB) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] addLedgerTapes(int[] tapeA, int[] tapeB) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> addLedgerTapes(vector<int>& tapeA, vector<int>& tapeB) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tape_a = [4, 7, 1], tape_b = [6, 2, 8]",
        "expected": "[0, 0, 0, 1]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tape_a = [5, 1], tape_b = [3]",
        "expected": "[8, 1]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "heartbeat-monitor-rolling-3sec",
    "title": "Microservice Trailing-Window Heartbeat Counter",
    "difficulty": "Easy",
    "topics": [
      "Queue",
      "Sliding Window"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A health monitor receives strictly increasing millisecond timestamps `beats` and a sliding window duration `span_ms`. For each incoming heartbeat `t`, return how many heartbeats occurred in the inclusive window `[t - span_ms, t]`.",
    "examples": [
      {
        "input": "beats = [100, 500, 1200, 1600], span_ms = 1000",
        "output": "[1, 2, 2, 2]",
        "explanation": "At 1200, 100 expires leaving [500, 1200]; at 1600, 500 expires leaving [1200, 1600]."
      },
      {
        "input": "beats = [10, 20, 30], span_ms = 50",
        "output": "[1, 2, 3]",
        "explanation": "All beats stay within 50ms."
      }
    ],
    "constraints": [
      "1 <= beats.length <= 10^4",
      "0 <= span_ms <= 10^9"
    ],
    "starterCode": {
      "python": "def count_active_beats(beats: list[int], span_ms: int) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function countActiveBeats(beats, spanMs) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] countActiveBeats(int[] beats, int spanMs) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> countActiveBeats(vector<int>& beats, int spanMs) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "beats = [100, 500, 1200, 1600], span_ms = 1000",
        "expected": "[1, 2, 2, 2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "beats = [10, 20, 30], span_ms = 50",
        "expected": "[1, 2, 3]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "log-archive-timestamp-lookup",
    "title": "Append-Only Log Timestamp Binary Lookup",
    "difficulty": "Easy",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An append-only audit log stores strictly increasing integer epoch timestamps in `epochs`. Return the index of `query_epoch` in `O(log n)` time, or `-1` if absent.",
    "examples": [
      {
        "input": "epochs = [100, 250, 400, 750, 900], query_epoch = 750",
        "output": "3",
        "explanation": "750 is at index 3."
      },
      {
        "input": "epochs = [100, 250, 400], query_epoch = 300",
        "output": "-1",
        "explanation": "300 is not present."
      }
    ],
    "constraints": [
      "1 <= epochs.length <= 10^5",
      "Strictly increasing integers."
    ],
    "starterCode": {
      "python": "def lookup_epoch(epochs: list[int], query_epoch: int) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function lookupEpoch(epochs, queryEpoch) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int lookupEpoch(int[] epochs, int queryEpoch) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lookupEpoch(vector<int>& epochs, int queryEpoch) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "epochs = [100, 250, 400, 750, 900], query_epoch = 750",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "epochs = [100, 250, 400], query_epoch = 300",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "rotated-ring-buffer-lookup",
    "title": "Circular Ring-Buffer Sequence Search",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A circular telemetry buffer stores unique ascending sequence IDs `ring` that wrapped around an unknown rotation point. Find the index of `seq_id` in `O(log n)` time, or return `-1` if missing.",
    "examples": [
      {
        "input": "ring = [50, 60, 70, 10, 20, 30], seq_id = 20",
        "output": "4",
        "explanation": "20 is at index 4."
      },
      {
        "input": "ring = [50, 60, 10, 20], seq_id = 40",
        "output": "-1",
        "explanation": "40 is absent."
      }
    ],
    "constraints": [
      "1 <= ring.length <= 10^4",
      "All values are unique."
    ],
    "starterCode": {
      "python": "def search_ring_buffer(ring: list[int], seq_id: int) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function searchRingBuffer(ring, seqId) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int searchRingBuffer(int[] ring, int seqId) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int searchRingBuffer(vector<int>& ring, int seqId) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ring = [50, 60, 70, 10, 20, 30], seq_id = 20",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ring = [50, 60, 10, 20], seq_id = 40",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ring-buffer-start-offset",
    "title": "Circular Buffer Oldest Sequence Value",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A rotated ring buffer `ring` holds unique ascending sequence IDs wrapped at an unknown offset. Return the oldest (smallest) sequence ID in `O(log n)` time.",
    "examples": [
      {
        "input": "ring = [40, 50, 60, 10, 20, 30]",
        "output": "10",
        "explanation": "Oldest sequence ID is 10."
      },
      {
        "input": "ring = [5, 10, 15]",
        "output": "5",
        "explanation": "Unrotated buffer starts at 5."
      }
    ],
    "constraints": [
      "1 <= ring.length <= 10^4",
      "All values unique."
    ],
    "starterCode": {
      "python": "def oldest_ring_seq(ring: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function oldestRingSeq(ring) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int oldestRingSeq(int[] ring) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int oldestRingSeq(vector<int>& ring) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ring = [40, 50, 60, 10, 20, 30]",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ring = [5, 10, 15]",
        "expected": "5",
        "isHidden": false
      }
    ]
  },
  {
    "id": "video-transcoder-min-bitrate",
    "title": "Media Pipeline Minimum Transcode Speed",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A media server has `clips` (each entry is clip size in MB) to transcode within `deadline_hrs` hours. Each hour it processes up to `rate` MB from one clip (starting a new clip only on the next hour). Return the minimum integer `rate` (MB/hr) to finish all clips within `deadline_hrs`.",
    "examples": [
      {
        "input": "clips = [10, 20, 30], deadline_hrs = 5",
        "output": "15",
        "explanation": "At 15 MB/hr: ceil(10/15)+ceil(20/15)+ceil(30/15) = 1+2+2 = 5 hrs."
      },
      {
        "input": "clips = [25, 40, 15], deadline_hrs = 3",
        "output": "40",
        "explanation": "One hour per clip requires rate = max(clips) = 40."
      }
    ],
    "constraints": [
      "1 <= clips.length <= deadline_hrs <= 10^9",
      "1 <= clips[i] <= 10^9"
    ],
    "starterCode": {
      "python": "def min_transcode_rate(clips: list[int], deadline_hrs: int) -> int:\n    # Write your solution here\n    return 1\n",
      "javascript": "function minTranscodeRate(clips, deadlineHrs) {\n  // Write your solution here\n  return 1;\n}\n",
      "java": "class Solution {\n    public int minTranscodeRate(int[] clips, int deadlineHrs) {\n        // Write your solution here\n        return 1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minTranscodeRate(vector<int>& clips, int deadlineHrs) {\n        // Write your solution here\n        return 1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "clips = [10, 20, 30], deadline_hrs = 5",
        "expected": "15",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "clips = [25, 40, 15], deadline_hrs = 3",
        "expected": "40",
        "isHidden": false
      }
    ]
  },
  {
    "id": "cargo-vessel-daily-tonnage",
    "title": "Freight Manifest Minimum Barge Capacity",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Greedy"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Ordered cargo lots with weights `tons` must be dispatched sequentially by barge within `max_days` voyages. Return the smallest barge tonnage capacity that dispatches all lots within `max_days`.",
    "examples": [
      {
        "input": "tons = [4, 5, 6, 7, 8], max_days = 3",
        "output": "13",
        "explanation": "At capacity 13: voyages [4, 5] (9), [6, 7] (13), and [8] (8) complete in 3 days."
      },
      {
        "input": "tons = [10, 10, 10], max_days = 3",
        "output": "10",
        "explanation": "One lot per voyage needs capacity 10."
      }
    ],
    "constraints": [
      "1 <= max_days <= tons.length <= 5 * 10^4",
      "1 <= tons[i] <= 1000"
    ],
    "starterCode": {
      "python": "def min_barge_capacity(tons: list[int], max_days: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minBargeCapacity(tons, maxDays) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minBargeCapacity(int[] tons, int maxDays) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minBargeCapacity(vector<int>& tons, int maxDays) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tons = [4, 5, 6, 7, 8], max_days = 3",
        "expected": "13",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tons = [10, 10, 10], max_days = 3",
        "expected": "10",
        "isHidden": false
      }
    ]
  },
  {
    "id": "batch-job-cluster-partition",
    "title": "Ordered Batch Pipeline Min-Max Worker Load",
    "difficulty": "Hard",
    "topics": [
      "Binary Search",
      "Greedy"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A CI pipeline runs `jobs` in strict order, where `jobs[i]` is duration in seconds. Partition `jobs` into `workers` non-empty contiguous batches so that the longest batch duration is minimized. Return that minimized peak duration.",
    "examples": [
      {
        "input": "jobs = [8, 3, 6, 11, 7], workers = 2",
        "output": "18",
        "explanation": "Split [8, 3, 6] (17) and [11, 7] (18)."
      },
      {
        "input": "jobs = [5, 5, 5, 5], workers = 4",
        "output": "5",
        "explanation": "One job per worker."
      }
    ],
    "constraints": [
      "1 <= workers <= jobs.length <= 1000",
      "0 <= jobs[i] <= 10^6"
    ],
    "starterCode": {
      "python": "def min_peak_worker_load(jobs: list[int], workers: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minPeakWorkerLoad(jobs, workers) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minPeakWorkerLoad(int[] jobs, int workers) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minPeakWorkerLoad(vector<int>& jobs, int workers) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "jobs = [8, 3, 6, 11, 7], workers = 2",
        "expected": "18",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "jobs = [5, 5, 5, 5], workers = 4",
        "expected": "5",
        "isHidden": false
      }
    ]
  },
  {
    "id": "radar-elevation-local-crest",
    "title": "Terrain Radar Local Ridge Finder",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A drone lidar scan records altitudes `alt` where adjacent readings never tie (`alt[i] != alt[i + 1]`) and beyond-boundary altitudes are `-inf`. Find the index of a local ridge strictly taller than its neighbors in `O(log n)` time.",
    "examples": [
      {
        "input": "alt = [10, 30, 50, 20]",
        "output": "2",
        "explanation": "Index 2 (50) exceeds both neighbors."
      },
      {
        "input": "alt = [5, 15, 10, 25, 40, 35]",
        "output": "4",
        "explanation": "Index 4 (40) is a local ridge."
      }
    ],
    "constraints": [
      "1 <= alt.length <= 10^4",
      "alt[i] != alt[i + 1]"
    ],
    "starterCode": {
      "python": "def find_ridge_index(alt: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function findRidgeIndex(alt) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int findRidgeIndex(int[] alt) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findRidgeIndex(vector<int>& alt) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "alt = [10, 30, 50, 20]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "alt = [5, 15, 10, 25, 40, 35]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sorted-shard-matrix-lookup",
    "title": "Sharded Keyspace 2D Matrix Lookup",
    "difficulty": "Medium",
    "topics": [
      "Matrix",
      "Binary Search",
      "Two Pointers"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A distributed key-value store organizes integer keys into an `m x n` grid `shards` where every row is sorted ascending left-to-right and every column is sorted ascending top-to-bottom. Return `true` if `key` exists in `shards`.",
    "examples": [
      {
        "input": "shards = [[2, 5, 9], [4, 7, 12], [8, 11, 15]], key = 7",
        "output": "true",
        "explanation": "7 is located at (1, 1)."
      },
      {
        "input": "shards = [[2, 5, 9], [4, 7, 12]], key = 6",
        "output": "false",
        "explanation": "6 is absent."
      }
    ],
    "constraints": [
      "1 <= m, n <= 300"
    ],
    "starterCode": {
      "python": "def shard_contains_key(shards: list[list[int]], key: int) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function shardContainsKey(shards, key) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean shardContainsKey(int[][] shards, int key) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool shardContainsKey(vector<vector<int>>& shards, int key) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "shards = [[2, 5, 9], [4, 7, 12], [8, 11, 15]], key = 7",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "shards = [[2, 5, 9], [4, 7, 12]], key = 6",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "clinic-appointment-merge",
    "title": "Clinic Busy-Block Schedule Consolidator",
    "difficulty": "Medium",
    "topics": [
      "Intervals",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A medical clinic receives unsorted appointment blocks `bookings` where each entry is `[start_min, end_min]`. Consolidate all overlapping or touching blocks into sorted non-overlapping busy blocks.",
    "examples": [
      {
        "input": "bookings = [[10, 30], [20, 45], [60, 75]]",
        "output": "[[10, 45], [60, 75]]",
        "explanation": "[10,30] and [20,45] merge into [10,45]."
      },
      {
        "input": "bookings = [[5, 10], [10, 15]]",
        "output": "[[5, 15]]",
        "explanation": "Touching endpoints merge."
      }
    ],
    "constraints": [
      "1 <= bookings.length <= 10^4",
      "0 <= start <= end <= 10^5"
    ],
    "starterCode": {
      "python": "def consolidate_bookings(bookings: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function consolidateBookings(bookings) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[][] consolidateBookings(int[][] bookings) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> consolidateBookings(vector<vector<int>>& bookings) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "bookings = [[10, 30], [20, 45], [60, 75]]",
        "expected": "[[10, 45], [60, 75]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "bookings = [[5, 10], [10, 15]]",
        "expected": "[[5, 15]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "maintenance-window-insert",
    "title": "Emergency Downtime Window Insertion",
    "difficulty": "Medium",
    "topics": [
      "Intervals",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a sorted list of non-overlapping scheduled maintenance windows `windows` and an emergency patch window `patch`, insert `patch` and merge any overlapping windows, returning the updated sorted schedule.",
    "examples": [
      {
        "input": "windows = [[1, 4], [8, 12]], patch = [3, 9]",
        "output": "[[1, 12]]",
        "explanation": "[3,9] bridges both existing windows."
      },
      {
        "input": "windows = [[1, 2], [5, 6]], patch = [3, 4]",
        "output": "[[1, 2], [3, 4], [5, 6]]",
        "explanation": "Fits cleanly in the gap."
      }
    ],
    "constraints": [
      "0 <= windows.length <= 10^4"
    ],
    "starterCode": {
      "python": "def insert_patch_window(windows: list[list[int]], patch: list[int]) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function insertPatchWindow(windows, patch) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[][] insertPatchWindow(int[][] windows, int[] patch) {\n        // Write your solution here\n        return new int[][]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> insertPatchWindow(vector<vector<int>>& windows, vector<int>& patch) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "windows = [[1, 4], [8, 12]], patch = [3, 9]",
        "expected": "[[1, 12]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "windows = [[1, 2], [5, 6]], patch = [3, 4]",
        "expected": "[[1, 2], [3, 4], [5, 6]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "satellite-pass-min-drops",
    "title": "Ground-Station Satellite Pass Conflict Pruner",
    "difficulty": "Medium",
    "topics": [
      "Intervals",
      "Greedy",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A single dish antenna receives requested satellite downlink windows `passes` (`[start, end]`). Touching windows (`end == start`) do not conflict. Return the minimum number of passes to drop so the remaining passes have zero overlap.",
    "examples": [
      {
        "input": "passes = [[1, 3], [2, 4], [3, 5], [5, 7]]",
        "output": "1",
        "explanation": "Drop [2, 4] to keep 3 non-overlapping passes."
      },
      {
        "input": "passes = [[0, 10], [0, 10], [0, 10]]",
        "output": "2",
        "explanation": "Only one pass can use [0, 10]."
      }
    ],
    "constraints": [
      "1 <= passes.length <= 10^5"
    ],
    "starterCode": {
      "python": "def min_dropped_passes(passes: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minDroppedPasses(passes) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minDroppedPasses(int[][] passes) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minDroppedPasses(vector<vector<int>>& passes) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "passes = [[1, 3], [2, 4], [3, 5], [5, 7]]",
        "expected": "1",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "passes = [[0, 10], [0, 10], [0, 10]]",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "operating-room-peak-suites",
    "title": "Hospital Surgical Suite Peak Allocation",
    "difficulty": "Medium",
    "topics": [
      "Intervals",
      "Heap",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A hospital schedules surgeries with intervals `surgeries` (`[start_min, end_min]`). A suite vacated at minute `t` can immediately host a surgery starting at minute `t`. Return the minimum number of operating suites required.",
    "examples": [
      {
        "input": "surgeries = [[10, 50], [20, 35], [40, 60]]",
        "output": "2",
        "explanation": "Max 2 surgeries overlap at once."
      },
      {
        "input": "surgeries = [[0, 15], [15, 30]]",
        "output": "1",
        "explanation": "Back-to-back surgeries share 1 suite."
      }
    ],
    "constraints": [
      "1 <= surgeries.length <= 10^4"
    ],
    "starterCode": {
      "python": "def min_operating_suites(surgeries: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minOperatingSuites(surgeries) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minOperatingSuites(int[][] surgeries) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minOperatingSuites(vector<vector<int>>& surgeries) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "surgeries = [[10, 50], [20, 35], [40, 60]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "surgeries = [[0, 15], [15, 30]]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "priority-lane-three-tier-sort",
    "title": "Network QoS Three-Tier Packet Partition",
    "difficulty": "Medium",
    "topics": [
      "Sorting",
      "Two Pointers",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A router buffer holds packet priority tags `tiers` where `0` is urgent, `1` is normal, and `2` is bulk. Partition `tiers` in-place into `[0...0, 1...1, 2...2]` in a single pass without calling a built-in sort, and return `tiers`.",
    "examples": [
      {
        "input": "tiers = [2, 0, 1, 2, 0, 1]",
        "output": "[0, 0, 1, 1, 2, 2]",
        "explanation": "Grouped by QoS tier 0, 1, 2."
      },
      {
        "input": "tiers = [1, 0]",
        "output": "[0, 1]",
        "explanation": "Urgent precedes normal."
      }
    ],
    "constraints": [
      "1 <= tiers.length <= 10^4",
      "tiers[i] in {0, 1, 2}."
    ],
    "starterCode": {
      "python": "def partition_qos_tiers(tiers: list[int]) -> list[int]:\n    # Write your solution here\n    return tiers\n",
      "javascript": "function partitionQosTiers(tiers) {\n  // Write your solution here\n  return tiers;\n}\n",
      "java": "class Solution {\n    public int[] partitionQosTiers(int[] tiers) {\n        // Write your solution here\n        return tiers;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> partitionQosTiers(vector<int>& tiers) {\n        // Write your solution here\n        return tiers;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tiers = [2, 0, 1, 2, 0, 1]",
        "expected": "[0, 0, 1, 1, 2, 2]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tiers = [1, 0]",
        "expected": "[0, 1]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "telemetry-kth-highest-latency",
    "title": "RPC Trace Kth-Highest Latency Spike",
    "difficulty": "Medium",
    "topics": [
      "Heap",
      "Sorting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an unsorted array of RPC response times in milliseconds `latencies` and an integer `k`, return the `k`-th highest latency measurement (counting duplicates).",
    "examples": [
      {
        "input": "latencies = [12, 45, 23, 67, 45, 19], k = 2",
        "output": "45",
        "explanation": "Sorted descending: [67, 45, 45, 23, 19, 12]; 2nd is 45."
      },
      {
        "input": "latencies = [5, 10, 15], k = 1",
        "output": "15",
        "explanation": "Peak latency is 15."
      }
    ],
    "constraints": [
      "1 <= k <= latencies.length <= 10^5"
    ],
    "starterCode": {
      "python": "def kth_highest_latency(latencies: list[int], k: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function kthHighestLatency(latencies, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int kthHighestLatency(int[] latencies, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int kthHighestLatency(vector<int>& latencies, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "latencies = [12, 45, 23, 67, 45, 19], k = 2",
        "expected": "45",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "latencies = [5, 10, 15], k = 1",
        "expected": "15",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sensor-grid-spiral-sweep",
    "title": "Robotic Inspection Grid Clockwise Spiral",
    "difficulty": "Medium",
    "topics": [
      "Matrix",
      "Simulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An optical inspection camera sweeps an `m x n` circuit board `cells` starting at `(0, 0)` and moving in a clockwise inward spiral. Return the inspected cell values in visit order.",
    "examples": [
      {
        "input": "cells = [[1, 2, 3], [8, 9, 4], [7, 6, 5]]",
        "output": "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
        "explanation": "Visits 1 through 9 in clockwise spiral."
      },
      {
        "input": "cells = [[10, 20]]",
        "output": "[10, 20]",
        "explanation": "Single row."
      }
    ],
    "constraints": [
      "1 <= m, n <= 50"
    ],
    "starterCode": {
      "python": "def spiral_inspection(cells: list[list[int]]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function spiralInspection(cells) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> spiralInspection(int[][] cells) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> spiralInspection(vector<vector<int>>& cells) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "cells = [[1, 2, 3], [8, 9, 4], [7, 6, 5]]",
        "expected": "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "cells = [[10, 20]]",
        "expected": "[10, 20]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "blueprint-90-degree-rotation",
    "title": "CAD Floorplan 90-Degree In-Place Rotation",
    "difficulty": "Medium",
    "topics": [
      "Matrix",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An architectural tool stores an `n x n` square tile blueprint in `plan`. Rotate `plan` 90 degrees clockwise in-place and return it.",
    "examples": [
      {
        "input": "plan = [[1, 2], [3, 4]]",
        "output": "[[3, 1], [4, 2]]",
        "explanation": "Clockwise 90-degree turn."
      },
      {
        "input": "plan = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "output": "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
        "explanation": "3x3 clockwise turn."
      }
    ],
    "constraints": [
      "1 <= n <= 50"
    ],
    "starterCode": {
      "python": "def rotate_blueprint(plan: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    return plan\n",
      "javascript": "function rotateBlueprint(plan) {\n  // Write your solution here\n  return plan;\n}\n",
      "java": "class Solution {\n    public int[][] rotateBlueprint(int[][] plan) {\n        // Write your solution here\n        return plan;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> rotateBlueprint(vector<vector<int>>& plan) {\n        // Write your solution here\n        return plan;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "plan = [[1, 2], [3, 4]]",
        "expected": "[[3, 1], [4, 2]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "plan = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "expected": "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "datacenter-rack-fault-mask",
    "title": "Datacenter Power-Bus Fault Isolation",
    "difficulty": "Medium",
    "topics": [
      "Matrix",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A datacenter floor is an `m x n` grid `racks` where `0` indicates a tripped breaker. Safety interlocks shut down the entire row and column of every tripped breaker. Apply the shutdown in-place using O(1) extra space and return `racks`.",
    "examples": [
      {
        "input": "racks = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]",
        "output": "[[1, 0, 1], [0, 0, 0], [1, 0, 1]]",
        "explanation": "Row 1 and column 1 shut down."
      },
      {
        "input": "racks = [[0, 1], [1, 1]]",
        "output": "[[0, 0], [0, 1]]",
        "explanation": "Row 0 and column 0 shut down."
      }
    ],
    "constraints": [
      "1 <= m, n <= 200"
    ],
    "starterCode": {
      "python": "def isolate_faults(racks: list[list[int]]) -> list[list[int]]:\n    # Write your solution here\n    return racks\n",
      "javascript": "function isolateFaults(racks) {\n  // Write your solution here\n  return racks;\n}\n",
      "java": "class Solution {\n    public int[][] isolateFaults(int[][] racks) {\n        // Write your solution here\n        return racks;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> isolateFaults(vector<vector<int>>& racks) {\n        // Write your solution here\n        return racks;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "racks = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]",
        "expected": "[[1, 0, 1], [0, 0, 0], [1, 0, 1]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "racks = [[0, 1], [1, 1]]",
        "expected": "[[0, 0], [0, 1]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "citation-impact-threshold",
    "title": "App Store Quality-Score H-Index",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A developer's published apps have sorted non-decreasing download scores `scores` (in thousands). Compute the developer's quality index `h`: the largest integer `h` such that at least `h` apps have a score `>= h`, in `O(log n)` time.",
    "examples": [
      {
        "input": "scores = [0, 1, 4, 5, 8]",
        "output": "3",
        "explanation": "3 apps have scores >= 3 (4, 5, 8)."
      },
      {
        "input": "scores = [0, 0, 0]",
        "output": "0",
        "explanation": "No apps with positive score."
      }
    ],
    "constraints": [
      "1 <= scores.length <= 10^5",
      "Sorted ascending."
    ],
    "starterCode": {
      "python": "def developer_h_index(scores: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function developerHIndex(scores) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int developerHIndex(int[] scores) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int developerHIndex(vector<int>& scores) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "scores = [0, 1, 4, 5, 8]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "scores = [0, 0, 0]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "paired-sensor-lone-reading",
    "title": "Dual-Redundant Sensor Unpaired Signal",
    "difficulty": "Medium",
    "topics": [
      "Binary Search",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Two redundant sensors log identical readings into a sorted array `signals`, so every value appears twice consecutively except one corrupted reading that appears only once. Return the single unpaired reading in `O(log n)` time.",
    "examples": [
      {
        "input": "signals = [10, 10, 20, 30, 30, 40, 40]",
        "output": "20",
        "explanation": "20 lacks a matching pair."
      },
      {
        "input": "signals = [7]",
        "output": "7",
        "explanation": "Single reading."
      }
    ],
    "constraints": [
      "1 <= signals.length <= 10^5",
      "Length is odd."
    ],
    "starterCode": {
      "python": "def find_unpaired_signal(signals: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function findUnpairedSignal(signals) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int findUnpairedSignal(int[] signals) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findUnpairedSignal(vector<int>& signals) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "signals = [10, 10, 20, 30, 30, 40, 40]",
        "expected": "20",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "signals = [7]",
        "expected": "7",
        "isHidden": false
      }
    ]
  },
  {
    "id": "two-feed-combined-median",
    "title": "Dual Market-Feed Exact Median",
    "difficulty": "Hard",
    "topics": [
      "Binary Search",
      "Divide and Conquer"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Two exchanges publish sorted integer quote arrays `feed_a` and `feed_b`. Compute the exact combined median as a float in `O(log(min(m, n)))` time without merging the arrays.",
    "examples": [
      {
        "input": "feed_a = [10, 30], feed_b = [20]",
        "output": "20.0",
        "explanation": "Combined [10, 20, 30] has median 20.0."
      },
      {
        "input": "feed_a = [10, 20], feed_b = [30, 40]",
        "output": "25.0",
        "explanation": "Average of 20 and 30 is 25.0."
      }
    ],
    "constraints": [
      "0 <= m, n <= 1000",
      "1 <= m + n <= 2000"
    ],
    "starterCode": {
      "python": "def combined_feed_median(feed_a: list[int], feed_b: list[int]) -> float:\n    # Write your solution here\n    return 0.0\n",
      "javascript": "function combinedFeedMedian(feedA, feedB) {\n  // Write your solution here\n  return 0.0;\n}\n",
      "java": "class Solution {\n    public double combinedFeedMedian(int[] feedA, int[] feedB) {\n        // Write your solution here\n        return 0.0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    double combinedFeedMedian(vector<int>& feedA, vector<int>& feedB) {\n        // Write your solution here\n        return 0.0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "feed_a = [10, 30], feed_b = [20]",
        "expected": "20.0",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "feed_a = [10, 20], feed_b = [30, 40]",
        "expected": "25.0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "org-chart-mirror-layout",
    "title": "Binary Org-Chart Left-Right Mirror",
    "difficulty": "Easy",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A UI renders a binary management tree serialized in level-order as `chart` (`null` for missing reports). Flip the entire org chart horizontally (recursively swapping left and right direct reports) and return its trimmed level-order array.",
    "examples": [
      {
        "input": "chart = [10, 20, 30, 40, 50]",
        "output": "[10, 30, 20, null, null, 50, 40]",
        "explanation": "Children swap recursively at every level."
      },
      {
        "input": "chart = [1, 2, 3]",
        "output": "[1, 3, 2]",
        "explanation": "Direct reports 2 and 3 swap."
      }
    ],
    "constraints": [
      "0 <= nodes <= 100"
    ],
    "starterCode": {
      "python": "def mirror_org_chart(chart: list) -> list:\n    # Write your solution here\n    return []\n",
      "javascript": "function mirrorOrgChart(chart) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Integer> mirrorOrgChart(List<Integer> chart) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<optional<int>> mirrorOrgChart(vector<optional<int>>& chart) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "chart = [10, 20, 30, 40, 50]",
        "expected": "[10, 30, 20, null, null, 50, 40]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "chart = [1, 2, 3]",
        "expected": "[1, 3, 2]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "org-chart-max-reporting-depth",
    "title": "Decision Tree Deepest Escalation Chain",
    "difficulty": "Easy",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary escalation tree in level-order representation `tree`, return the maximum number of nodes along any path from the root down to a leaf.",
    "examples": [
      {
        "input": "tree = [1, 2, 3, null, null, 4, 5]",
        "output": "3",
        "explanation": "Deepest chain is 1 -> 3 -> 4 (3 nodes)."
      },
      {
        "input": "tree = []",
        "output": "0",
        "explanation": "Empty tree has depth 0."
      }
    ],
    "constraints": [
      "0 <= nodes <= 10^4"
    ],
    "starterCode": {
      "python": "def deepest_chain(tree: list) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function deepestChain(tree) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int deepestChain(List<Integer> tree) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int deepestChain(vector<optional<int>>& tree) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [1, 2, 3, null, null, 4, 5]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = []",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "circuit-tree-longest-wire",
    "title": "Binary Circuit Tree Longest Wire Span",
    "difficulty": "Easy",
    "topics": [
      "Binary Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A binary clock-distribution tree is given in level-order `tree`. Return the maximum number of edges (hops) between any two components in the tree (the path need not pass through the root).",
    "examples": [
      {
        "input": "tree = [1, 2, 3, 4, 5]",
        "output": "3",
        "explanation": "4 -> 2 -> 1 -> 3 uses 3 edges."
      },
      {
        "input": "tree = [1]",
        "output": "0",
        "explanation": "Single node has 0 hops."
      }
    ],
    "constraints": [
      "1 <= nodes <= 10^4"
    ],
    "starterCode": {
      "python": "def longest_wire_span(tree: list) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestWireSpan(tree) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestWireSpan(List<Integer> tree) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestWireSpan(vector<optional<int>>& tree) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [1, 2, 3, 4, 5]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [1]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "alert-tree-tier-grouping",
    "title": "Alert Escalation Tree Tier Grouping",
    "difficulty": "Medium",
    "topics": [
      "Binary Tree",
      "BFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a binary alert tree in level-order `tree`, group all node IDs by depth tier from top to bottom (left-to-right within each tier).",
    "examples": [
      {
        "input": "tree = [10, 20, 30, null, null, 40, 50]",
        "output": "[[10], [20, 30], [40, 50]]",
        "explanation": "Three depth tiers."
      },
      {
        "input": "tree = []",
        "output": "[]",
        "explanation": "Empty tree."
      }
    ],
    "constraints": [
      "0 <= nodes <= 2000"
    ],
    "starterCode": {
      "python": "def group_by_tier(tree: list) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function groupByTier(tree) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> groupByTier(List<Integer> tree) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> groupByTier(vector<optional<int>>& tree) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [10, 20, 30, null, null, 40, 50]",
        "expected": "[[10], [20, 30], [40, 50]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = []",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "index-tree-bst-integrity",
    "title": "Database Index Tree Ordering Auditor",
    "difficulty": "Medium",
    "topics": [
      "Binary Search Tree",
      "DFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A storage engine dumps a binary key index in level-order `tree`. Return `true` iff every node strictly exceeds all keys in its left subtree and is strictly less than all keys in its right subtree.",
    "examples": [
      {
        "input": "tree = [50, 30, 70, 20, 40]",
        "output": "true",
        "explanation": "Valid strict BST."
      },
      {
        "input": "tree = [50, 30, 70, null, null, 45, 80]",
        "output": "false",
        "explanation": "45 is in the right subtree of 50."
      }
    ],
    "constraints": [
      "1 <= nodes <= 10^4"
    ],
    "starterCode": {
      "python": "def audit_bst_index(tree: list) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function auditBstIndex(tree) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean auditBstIndex(List<Integer> tree) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool auditBstIndex(vector<optional<int>>& tree) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [50, 30, 70, 20, 40]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [50, 30, 70, null, null, 45, 80]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "leaderboard-bst-kth-rank",
    "title": "BST Score Index Kth-Lowest Query",
    "difficulty": "Medium",
    "topics": [
      "Binary Search Tree",
      "DFS",
      "Stack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a valid BST of player latency scores in level-order `tree` and a 1-based rank `k`, return the `k`-th smallest score in the tree.",
    "examples": [
      {
        "input": "tree = [30, 15, 45, 10, 20], k = 3",
        "output": "20",
        "explanation": "Sorted scores: [10, 15, 20, 30, 45]; 3rd is 20."
      },
      {
        "input": "tree = [5, 2, 8], k = 1",
        "output": "2",
        "explanation": "Lowest score is 2."
      }
    ],
    "constraints": [
      "1 <= k <= nodes <= 10^4"
    ],
    "starterCode": {
      "python": "def kth_lowest_score(tree: list, k: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function kthLowestScore(tree, k) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int kthLowestScore(List<Integer> tree, int k) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int kthLowestScore(vector<optional<int>>& tree, int k) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [30, 15, 45, 10, 20], k = 3",
        "expected": "20",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [5, 2, 8], k = 1",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "routing-bst-common-hub",
    "title": "BST Routing Hierarchy Common Hub",
    "difficulty": "Medium",
    "topics": [
      "Binary Search Tree",
      "Tree"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A BST of unique router IDs is given in level-order `tree`. Given two router IDs `a` and `b` present in the tree, return the ID of their lowest common ancestor hub.",
    "examples": [
      {
        "input": "tree = [50, 25, 75, 10, 35, 60, 90], a = 10, b = 35",
        "output": "25",
        "explanation": "10 and 35 split at hub 25."
      },
      {
        "input": "tree = [50, 25, 75], a = 50, b = 75",
        "output": "50",
        "explanation": "Hub 50 is an ancestor of 75."
      }
    ],
    "constraints": [
      "2 <= nodes <= 10^4",
      "All IDs unique."
    ],
    "starterCode": {
      "python": "def common_bst_hub(tree: list, a: int, b: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function commonBstHub(tree, a, b) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int commonBstHub(List<Integer> tree, int a, int b) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int commonBstHub(vector<optional<int>>& tree, int a, int b) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [50, 25, 75, 10, 35, 60, 90], a = 10, b = 35",
        "expected": "25",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [50, 25, 75], a = 50, b = 75",
        "expected": "50",
        "isHidden": false
      }
    ]
  },
  {
    "id": "pipeline-tree-peak-profit-path",
    "title": "Binary Supply Tree Peak Margin Path",
    "difficulty": "Hard",
    "topics": [
      "Binary Tree",
      "DFS",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Each station in a binary distribution tree (`tree` in level-order) yields an integer net margin (positive or negative). Return the maximum total margin along any non-empty simple path connecting adjacent stations.",
    "examples": [
      {
        "input": "tree = [-5, 8, 12, null, null, 7, 9]",
        "output": "28",
        "explanation": "Path 7 -> 12 -> 9 yields 28."
      },
      {
        "input": "tree = [-10]",
        "output": "-10",
        "explanation": "Must include at least one station."
      }
    ],
    "constraints": [
      "1 <= nodes <= 3 * 10^4",
      "-1000 <= val <= 1000"
    ],
    "starterCode": {
      "python": "def peak_margin_path(tree: list) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function peakMarginPath(tree) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int peakMarginPath(List<Integer> tree) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int peakMarginPath(vector<optional<int>>& tree) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "tree = [-5, 8, 12, null, null, 7, 9]",
        "expected": "28",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "tree = [-10]",
        "expected": "-10",
        "isHidden": false
      }
    ]
  },
  {
    "id": "autocomplete-prefix-directory",
    "title": "Search Bar Prefix Directory Engine",
    "difficulty": "Medium",
    "topics": [
      "Trie",
      "Design",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Implement a prefix directory supporting `add`, `exact`, and `prefix` commands in `cmds` (`[\"add\", term]`, `[\"exact\", term]`, `[\"prefix\", pre]`). Return the list of boolean answers for all `exact` and `prefix` queries.",
    "examples": [
      {
        "input": "cmds = [[\"add\", \"cloud\"], [\"exact\", \"cloud\"], [\"exact\", \"clo\"], [\"prefix\", \"clo\"]]",
        "output": "[true, false, true]",
        "explanation": "\"clo\" is a prefix of \"cloud\" but not an exact term."
      },
      {
        "input": "cmds = [[\"prefix\", \"x\"]]",
        "output": "[false]",
        "explanation": "Empty directory."
      }
    ],
    "constraints": [
      "1 <= cmds.length <= 2 * 10^4",
      "Lowercase English letters."
    ],
    "starterCode": {
      "python": "def run_prefix_dir(cmds: list[list[str]]) -> list[bool]:\n    # Write your solution here\n    return []\n",
      "javascript": "function runPrefixDir(cmds) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Boolean> runPrefixDir(List<List<String>> cmds) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<bool> runPrefixDir(vector<vector<string>>& cmds) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "cmds = [[\"add\", \"cloud\"], [\"exact\", \"cloud\"], [\"exact\", \"clo\"], [\"prefix\", \"clo\"]]",
        "expected": "[true, false, true]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "cmds = [[\"prefix\", \"x\"]]",
        "expected": "[false]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "solar-farm-panel-clusters",
    "title": "Rooftop Active Solar Array Counter",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A rooftop telemetry map `panels` uses `'1'` for active solar cells and `'0'` for empty roof tiles. Return the number of separate 4-directionally connected active solar clusters.",
    "examples": [
      {
        "input": "panels = [[\"1\",\"1\",\"0\"],[\"0\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]",
        "output": "2",
        "explanation": "Two disconnected active clusters."
      },
      {
        "input": "panels = [[\"0\",\"0\"]]",
        "output": "0",
        "explanation": "No active cells."
      }
    ],
    "constraints": [
      "1 <= m, n <= 200"
    ],
    "starterCode": {
      "python": "def count_panel_clusters(panels: list[list[str]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countPanelClusters(panels) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countPanelClusters(char[][] panels) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countPanelClusters(vector<vector<char>>& panels) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "panels = [[\"1\",\"1\",\"0\"],[\"0\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "panels = [[\"0\",\"0\"]]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "server-rack-thermal-spread",
    "title": "Server Hall Thermal Runaway Timer",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A server floor `hall` has `0` (aisle), `1` (healthy rack), and `2` (overheating rack). Every minute, overheating spreads to all 4-directionally adjacent healthy racks. Return the minutes until no healthy rack remains, or `-1` if some healthy rack is isolated.",
    "examples": [
      {
        "input": "hall = [[2, 1, 1], [1, 0, 1], [0, 1, 1]]",
        "output": "5",
        "explanation": "All racks overheat by minute 5."
      },
      {
        "input": "hall = [[2, 0, 1]]",
        "output": "-1",
        "explanation": "Aisle isolates rack at (0, 2)."
      }
    ],
    "constraints": [
      "1 <= m, n <= 50"
    ],
    "starterCode": {
      "python": "def thermal_spread_minutes(hall: list[list[int]]) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function thermalSpreadMinutes(hall) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int thermalSpreadMinutes(int[][] hall) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int thermalSpreadMinutes(vector<vector<int>>& hall) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "hall = [[2, 1, 1], [1, 0, 1], [0, 1, 1]]",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "hall = [[2, 0, 1]]",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "build-pipeline-cycle-check",
    "title": "Microservice Build DAG Feasibility",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "Topological Sort",
      "BFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A monorepo has `num_pkgs` packages (`0..num_pkgs-1`) and dependency pairs `deps` where `[a, b]` means package `b` must be built before package `a`. Return `true` if all packages can be built without circular dependencies.",
    "examples": [
      {
        "input": "num_pkgs = 3, deps = [[1, 0], [2, 1]]",
        "output": "true",
        "explanation": "Build order 0 -> 1 -> 2."
      },
      {
        "input": "num_pkgs = 2, deps = [[0, 1], [1, 0]]",
        "output": "false",
        "explanation": "Circular dependency 0 <-> 1."
      }
    ],
    "constraints": [
      "1 <= num_pkgs <= 2000",
      "0 <= deps.length <= 5000"
    ],
    "starterCode": {
      "python": "def can_build_all(num_pkgs: int, deps: list[list[int]]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function canBuildAll(numPkgs, deps) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean canBuildAll(int numPkgs, int[][] deps) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canBuildAll(int numPkgs, vector<vector<int>>& deps) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "num_pkgs = 3, deps = [[1, 0], [2, 1]]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "num_pkgs = 2, deps = [[0, 1], [1, 0]]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "build-pipeline-execution-order",
    "title": "Deterministic Package Build Scheduler",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "Topological Sort",
      "Heap"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given `num_pkgs` packages (`0..num_pkgs-1`) and dependencies `deps` where `[a, b]` means `b` precedes `a`, return the lexicographically smallest valid build order, or `[]` if a cycle prevents building all packages.",
    "examples": [
      {
        "input": "num_pkgs = 4, deps = [[1, 0], [2, 0], [3, 1], [3, 2]]",
        "output": "[0, 1, 2, 3]",
        "explanation": "0 unlocks 1 and 2, then 3."
      },
      {
        "input": "num_pkgs = 2, deps = [[0, 1], [1, 0]]",
        "output": "[]",
        "explanation": "Cycle makes build impossible."
      }
    ],
    "constraints": [
      "1 <= num_pkgs <= 2000"
    ],
    "starterCode": {
      "python": "def build_schedule(num_pkgs: int, deps: list[list[int]]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function buildSchedule(numPkgs, deps) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] buildSchedule(int numPkgs, int[][] deps) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> buildSchedule(int numPkgs, vector<vector<int>>& deps) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "num_pkgs = 4, deps = [[1, 0], [2, 0], [3, 1], [3, 2]]",
        "expected": "[0, 1, 2, 3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "num_pkgs = 2, deps = [[0, 1], [1, 0]]",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "mesh-broadcast-propagation-time",
    "title": "Service Mesh Broadcast Convergence Time",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "Dijkstra",
      "Heap"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A mesh has `n` servers (`1..n`) connected by directed latency links `links[i] = [u, v, ms]`. Server `origin` broadcasts a config update. Return the minimum milliseconds until all `n` servers receive it, or `-1` if any server is unreachable.",
    "examples": [
      {
        "input": "links = [[1, 2, 5], [1, 3, 2], [3, 2, 1], [2, 4, 4]], n = 4, origin = 1",
        "output": "7",
        "explanation": "Fastest path to 4 is 1->3->2->4 = 2+1+4 = 7 ms."
      },
      {
        "input": "links = [[1, 2, 3]], n = 3, origin = 1",
        "output": "-1",
        "explanation": "Node 3 is unreachable."
      }
    ],
    "constraints": [
      "1 <= origin <= n <= 100",
      "0 <= ms <= 1000"
    ],
    "starterCode": {
      "python": "def broadcast_convergence(links: list[list[int]], n: int, origin: int) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function broadcastConvergence(links, n, origin) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int broadcastConvergence(int[][] links, int n, int origin) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int broadcastConvergence(vector<vector<int>>& links, int n, int origin) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "links = [[1, 2, 5], [1, 3, 2], [3, 2, 1], [2, 4, 4]], n = 4, origin = 1",
        "expected": "7",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "links = [[1, 2, 3]], n = 3, origin = 1",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "fiber-network-redundant-link",
    "title": "Campus Fiber Ring Redundant Cable",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "Union Find"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An undirected fiber network of `n` hubs (`1..n`) began as a tree before one redundant cable was laid. Given `cables`, return the cable that closes the cycle (the last such cable in `cables` if multiple could break the cycle).",
    "examples": [
      {
        "input": "cables = [[1, 2], [2, 3], [1, 3]]",
        "output": "[1, 3]",
        "explanation": "[1, 3] closes the 1-2-3 cycle."
      },
      {
        "input": "cables = [[1, 2], [2, 3], [3, 4], [4, 2]]",
        "output": "[4, 2]",
        "explanation": "[4, 2] connects already-linked hubs."
      }
    ],
    "constraints": [
      "3 <= cables.length <= 1000"
    ],
    "starterCode": {
      "python": "def find_redundant_cable(cables: list[list[int]]) -> list[int]:\n    # Write your solution here\n    return []\n",
      "javascript": "function findRedundantCable(cables) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public int[] findRedundantCable(int[][] cables) {\n        // Write your solution here\n        return new int[]{};\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> findRedundantCable(vector<vector<int>>& cables) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "cables = [[1, 2], [2, 3], [1, 3]]",
        "expected": "[1, 3]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "cables = [[1, 2], [2, 3], [3, 4], [4, 2]]",
        "expected": "[4, 2]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "two-team-conflict-partition",
    "title": "Shift Scheduler Conflict-Free Two-Team Split",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An undirected adjacency list `conflicts` lists pairs of engineers (`0..n-1`) who cannot work the same shift. Return `true` iff all engineers can be assigned to two shifts (Day and Night) with zero intra-shift conflicts.",
    "examples": [
      {
        "input": "conflicts = [[1, 3], [0, 2], [1, 3], [0, 2]]",
        "output": "true",
        "explanation": "Day: {0, 2}, Night: {1, 3}."
      },
      {
        "input": "conflicts = [[1, 2], [0, 2], [0, 1]]",
        "output": "false",
        "explanation": "3-person triangle cannot be 2-colored."
      }
    ],
    "constraints": [
      "1 <= conflicts.length <= 200"
    ],
    "starterCode": {
      "python": "def can_split_shifts(conflicts: list[list[int]]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function canSplitShifts(conflicts) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean canSplitShifts(int[][] conflicts) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canSplitShifts(vector<vector<int>>& conflicts) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "conflicts = [[1, 3], [0, 2], [1, 3], [0, 2]]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "conflicts = [[1, 2], [0, 2], [0, 1]]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "airline-budget-k-layovers",
    "title": "Freight Charter Cheapest K-Layover Route",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "Bellman-Ford",
      "Dynamic Programming"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given `n` airports (`0..n-1`) and directed charter legs `legs[i] = [u, v, cost]`, return the cheapest total cost from `src` to `dst` using at most `max_layovers` intermediate stops, or `-1` if no route exists.",
    "examples": [
      {
        "input": "n = 3, legs = [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src = 0, dst = 2, max_layovers = 0",
        "output": "500",
        "explanation": "Direct leg only."
      },
      {
        "input": "n = 3, legs = [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src = 0, dst = 2, max_layovers = 1",
        "output": "200",
        "explanation": "0 -> 1 -> 2 costs 200 with 1 layover."
      }
    ],
    "constraints": [
      "1 <= n <= 100",
      "0 <= max_layovers < n"
    ],
    "starterCode": {
      "python": "def cheapest_charter(n: int, legs: list[list[int]], src: int, dst: int, max_layovers: int) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function cheapestCharter(n, legs, src, dst, maxLayovers) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int cheapestCharter(int n, int[][] legs, int src, int dst, int maxLayovers) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int cheapestCharter(int n, vector<vector<int>>& legs, int src, int dst, int maxLayovers) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 3, legs = [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src = 0, dst = 2, max_layovers = 0",
        "expected": "500",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 3, legs = [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src = 0, dst = 2, max_layovers = 1",
        "expected": "200",
        "isHidden": false
      }
    ]
  },
  {
    "id": "campus-fiber-minimum-trench",
    "title": "Campus Fiber Minimum Manhattan Trench",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "Minimum Spanning Tree",
      "Prim"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A university plans to connect all buildings located at 2D integer grid coordinates `coords` using underground trenches dug strictly along north-south and east-west grid lines (Manhattan distance). Return the minimum total trench length to connect all buildings.",
    "examples": [
      {
        "input": "coords = [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]",
        "output": "20",
        "explanation": "MST Manhattan trench sum is 20."
      },
      {
        "input": "coords = [[1, 1]]",
        "output": "0",
        "explanation": "Single building needs 0 trenching."
      }
    ],
    "constraints": [
      "1 <= coords.length <= 1000"
    ],
    "starterCode": {
      "python": "def min_trench_length(coords: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minTrenchLength(coords) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minTrenchLength(int[][] coords) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minTrenchLength(vector<vector<int>>& coords) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "coords = [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]",
        "expected": "20",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "coords = [[1, 1]]",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "warehouse-robot-clear-corridor",
    "title": "Autonomous Rover 8-Way Shortest Path",
    "difficulty": "Medium",
    "topics": [
      "Graph",
      "BFS",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An autonomous rover navigates an `n x n` floor map `floor` (`0` = open, `1` = obstacle) from `(0, 0)` to `(n - 1, n - 1)` moving 8-directionally. Return the fewest cells visited along a valid path, or `-1` if blocked.",
    "examples": [
      {
        "input": "floor = [[0, 1], [1, 0]]",
        "output": "2",
        "explanation": "Diagonal step visits 2 cells."
      },
      {
        "input": "floor = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]",
        "output": "4",
        "explanation": "4-cell path around obstacle."
      }
    ],
    "constraints": [
      "1 <= n <= 100"
    ],
    "starterCode": {
      "python": "def shortest_rover_path(floor: list[list[int]]) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function shortestRoverPath(floor) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int shortestRoverPath(int[][] floor) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestRoverPath(vector<vector<int>>& floor) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "floor = [[0, 1], [1, 0]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "floor = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "flood-zone-escape-elevation",
    "title": "Rescue Boat Minimum Flood-Depth Route",
    "difficulty": "Hard",
    "topics": [
      "Graph",
      "Dijkstra",
      "Heap",
      "Matrix"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A rescue hovercraft must cross an `n x n` terrain map `elev` from `(0, 0)` to `(n - 1, n - 1)` via 4-directional steps. It can traverse any cell whose elevation is `<= water_level`. Return the minimum `water_level` needed to complete the crossing.",
    "examples": [
      {
        "input": "elev = [[0, 3], [2, 1]]",
        "output": "2",
        "explanation": "Path (0,0)->(1,0)->(1,1) peaks at elevation 2."
      },
      {
        "input": "elev = [[5]]",
        "output": "5",
        "explanation": "Single cell requires level 5."
      }
    ],
    "constraints": [
      "1 <= n <= 50",
      "0 <= elev[i][j] <= 10^4"
    ],
    "starterCode": {
      "python": "def min_crossing_level(elev: list[list[int]]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minCrossingLevel(elev) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minCrossingLevel(int[][] elev) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minCrossingLevel(vector<vector<int>>& elev) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "elev = [[0, 3], [2, 1]]",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "elev = [[5]]",
        "expected": "5",
        "isHidden": false
      }
    ]
  },
  {
    "id": "stairway-step-combinations",
    "title": "Warehouse Bot Dock-Ramp Step Plans",
    "difficulty": "Easy",
    "topics": [
      "Dynamic Programming",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A bipedal warehouse robot climbs a loading dock with `steps` risers, advancing either `1` or `2` risers per stride. Return the number of distinct stride sequences that reach the top.",
    "examples": [
      {
        "input": "steps = 4",
        "output": "5",
        "explanation": "5 sequences: 1111, 112, 121, 211, 22."
      },
      {
        "input": "steps = 1",
        "output": "1",
        "explanation": "Single 1-step stride."
      }
    ],
    "constraints": [
      "1 <= steps <= 45"
    ],
    "starterCode": {
      "python": "def count_stride_plans(steps: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countStridePlans(steps) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countStridePlans(int steps) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countStridePlans(int steps) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "steps = 4",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "steps = 1",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "windmill-nonadjacent-yield",
    "title": "Ridge Wind-Turbine Non-Adjacent Yield",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An array `megawatts` lists potential power output at candidate turbine sites along a mountain ridge. Wake turbulence forbids building on two adjacent sites. Return the maximum total megawatts achievable.",
    "examples": [
      {
        "input": "megawatts = [4, 1, 2, 9, 3]",
        "output": "13",
        "explanation": "Sites 0 (4) and 3 (9) yield 13 MW."
      },
      {
        "input": "megawatts = [5, 8, 5]",
        "output": "10",
        "explanation": "Sites 0 and 2 yield 10 MW."
      }
    ],
    "constraints": [
      "1 <= megawatts.length <= 10^4",
      "0 <= megawatts[i] <= 1000"
    ],
    "starterCode": {
      "python": "def max_turbine_yield(megawatts: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function maxTurbineYield(megawatts) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int maxTurbineYield(int[] megawatts) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxTurbineYield(vector<int>& megawatts) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "megawatts = [4, 1, 2, 9, 3]",
        "expected": "13",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "megawatts = [5, 8, 5]",
        "expected": "10",
        "isHidden": false
      }
    ]
  },
  {
    "id": "vending-machine-min-coins",
    "title": "Transit Kiosk Minimal Token Dispenser",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Knapsack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A transit kiosk stocks unlimited tokens of denominations `denoms`. Return the fewest number of tokens required to refund exact change `due`, or `-1` if `due` cannot be formed.",
    "examples": [
      {
        "input": "denoms = [1, 3, 4], due = 6",
        "output": "2",
        "explanation": "3 + 3 uses 2 tokens (greedy 4+1+1 uses 3)."
      },
      {
        "input": "denoms = [5], due = 3",
        "output": "-1",
        "explanation": "Cannot form 3 with 5s."
      }
    ],
    "constraints": [
      "1 <= denoms.length <= 20",
      "0 <= due <= 10^4"
    ],
    "starterCode": {
      "python": "def min_tokens(denoms: list[int], due: int) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function minTokens(denoms, due) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int minTokens(int[] denoms, int due) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minTokens(vector<int>& denoms, int due) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "denoms = [1, 3, 4], due = 6",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "denoms = [5], due = 3",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "sensor-strictly-rising-trend",
    "title": "Quarterly Metrics Longest Strictly Rising Trend",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Binary Search"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given an array of quarterly revenue integers `rev`, return the length of the longest strictly increasing subsequence of quarters (not necessarily consecutive).",
    "examples": [
      {
        "input": "rev = [12, 5, 8, 6, 14, 15, 9]",
        "output": "4",
        "explanation": "[5, 6, 14, 15] has length 4."
      },
      {
        "input": "rev = [9, 9, 9]",
        "output": "1",
        "explanation": "Strictly increasing means ties cannot extend."
      }
    ],
    "constraints": [
      "1 <= rev.length <= 5000"
    ],
    "starterCode": {
      "python": "def longest_rising_trend(rev: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function longestRisingTrend(rev) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int longestRisingTrend(int[] rev) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestRisingTrend(vector<int>& rev) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "rev = [12, 5, 8, 6, 14, 15, 9]",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "rev = [9, 9, 9]",
        "expected": "1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "dna-primer-shared-backbone",
    "title": "Bioinformatics Shared Genetic Backbone",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given two DNA primer strings `strand_a` and `strand_b` consisting of `'A'`, `'C'`, `'G'`, `'T'`, return the length of their longest common subsequence.",
    "examples": [
      {
        "input": "strand_a = \"ACGTGA\", strand_b = \"ATGCA\"",
        "output": "4",
        "explanation": "\"ATGA\" (or \"ACGA\") has length 4."
      },
      {
        "input": "strand_a = \"AAAA\", strand_b = \"CCCC\"",
        "output": "0",
        "explanation": "No common bases."
      }
    ],
    "constraints": [
      "1 <= strand_a.length, strand_b.length <= 1000"
    ],
    "starterCode": {
      "python": "def shared_backbone_len(strand_a: str, strand_b: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function sharedBackboneLen(strandA, strandB) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int sharedBackboneLen(String strandA, String strandB) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int sharedBackboneLen(string strandA, string strandB) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "strand_a = \"ACGTGA\", strand_b = \"ATGCA\"",
        "expected": "4",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "strand_a = \"AAAA\", strand_b = \"CCCC\"",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "spellcheck-minimum-edits",
    "title": "Search Autocorrect Minimum Keystroke Edits",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Given a misspelled query `typed` and a target dictionary word `target`, return the minimum number of single-character insertions, deletions, or substitutions needed to transform `typed` into `target`.",
    "examples": [
      {
        "input": "typed = \"kittn\", target = \"sitting\"",
        "output": "3",
        "explanation": "Replace k->s, insert i, insert g (3 edits)."
      },
      {
        "input": "typed = \"cloud\", target = \"cloud\"",
        "output": "0",
        "explanation": "Already identical."
      }
    ],
    "constraints": [
      "0 <= typed.length, target.length <= 500"
    ],
    "starterCode": {
      "python": "def min_keystroke_edits(typed: str, target: str) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minKeystrokeEdits(typed, target) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minKeystrokeEdits(String typed, String target) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minKeystrokeEdits(string typed, string target) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "typed = \"kittn\", target = \"sitting\"",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "typed = \"cloud\", target = \"cloud\"",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "url-slug-dictionary-split",
    "title": "Domain Slug Valid Lexicon Segmentation",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Hash Table",
      "String"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A domain registrar checks whether a concatenated lowercase slug `slug` can be cleanly partitioned into one or more words from `lexicon` (words may be reused). Return `true` if a full segmentation exists.",
    "examples": [
      {
        "input": "slug = \"fastclouddata\", lexicon = [\"fast\", \"cloud\", \"data\"]",
        "output": "true",
        "explanation": "Splits into fast + cloud + data."
      },
      {
        "input": "slug = \"fastclouddat\", lexicon = [\"fast\", \"cloud\", \"data\"]",
        "output": "false",
        "explanation": "Trailing \"dat\" is not in lexicon."
      }
    ],
    "constraints": [
      "1 <= slug.length <= 300",
      "1 <= lexicon.length <= 1000"
    ],
    "starterCode": {
      "python": "def can_segment_slug(slug: str, lexicon: list[str]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function canSegmentSlug(slug, lexicon) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean canSegmentSlug(String slug, List<String> lexicon) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canSegmentSlug(string slug, vector<string>& lexicon) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "slug = \"fastclouddata\", lexicon = [\"fast\", \"cloud\", \"data\"]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "slug = \"fastclouddat\", lexicon = [\"fast\", \"cloud\", \"data\"]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "cargo-twin-container-balance",
    "title": "Twin Cargo Container Exact Weight Split",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Knapsack"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A cargo plane must load crates with positive integer weights `crates` into left and right wing pods such that both pods carry the exact same total weight. Return `true` if such a split is possible.",
    "examples": [
      {
        "input": "crates = [4, 10, 6, 8]",
        "output": "true",
        "explanation": "Pods [4, 10] and [6, 8] both weigh 14."
      },
      {
        "input": "crates = [3, 5, 7]",
        "output": "false",
        "explanation": "Total weight 15 is odd."
      }
    ],
    "constraints": [
      "1 <= crates.length <= 200",
      "1 <= crates[i] <= 100"
    ],
    "starterCode": {
      "python": "def can_balance_pods(crates: list[int]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function canBalancePods(crates) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean canBalancePods(int[] crates) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canBalancePods(vector<int>& crates) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "crates = [4, 10, 6, 8]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "crates = [3, 5, 7]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "drone-grid-route-count",
    "title": "Airspace Sector Monotonic Flight Paths",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A delivery quadcopter flies across an `rows x cols` airspace grid from `(0, 0)` to `(rows - 1, cols - 1)`, moving only south or east. Return the total number of distinct flight paths.",
    "examples": [
      {
        "input": "rows = 3, cols = 4",
        "output": "10",
        "explanation": "C(5, 2) = 10 paths."
      },
      {
        "input": "rows = 2, cols = 2",
        "output": "2",
        "explanation": "East-South or South-East."
      }
    ],
    "constraints": [
      "1 <= rows, cols <= 100"
    ],
    "starterCode": {
      "python": "def count_flight_paths(rows: int, cols: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countFlightPaths(rows, cols) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countFlightPaths(int rows, int cols) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countFlightPaths(int rows, int cols) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "rows = 3, cols = 4",
        "expected": "10",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "rows = 2, cols = 2",
        "expected": "2",
        "isHidden": false
      }
    ]
  },
  {
    "id": "compound-return-peak-streak",
    "title": "Portfolio Multiplier Peak Contiguous Product",
    "difficulty": "Medium",
    "topics": [
      "Dynamic Programming",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A backtester models daily leverage factors as an integer array `factors` (positive, zero, or negative). Return the largest possible product of any non-empty contiguous streak of days.",
    "examples": [
      {
        "input": "factors = [-2, 3, -4]",
        "output": "24",
        "explanation": "Entire array multiplies to (-2)*3*(-4) = 24."
      },
      {
        "input": "factors = [2, 3, 0, -2, 5]",
        "output": "6",
        "explanation": "[2, 3] yields 6."
      }
    ],
    "constraints": [
      "1 <= factors.length <= 2 * 10^4",
      "-10 <= factors[i] <= 10"
    ],
    "starterCode": {
      "python": "def peak_factor_product(factors: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function peakFactorProduct(factors) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int peakFactorProduct(int[] factors) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int peakFactorProduct(vector<int>& factors) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "factors = [-2, 3, -4]",
        "expected": "24",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "factors = [2, 3, 0, -2, 5]",
        "expected": "6",
        "isHidden": false
      }
    ]
  },
  {
    "id": "relay-tower-end-to-end-reach",
    "title": "Radio Relay Chain End-to-End Connectivity",
    "difficulty": "Medium",
    "topics": [
      "Greedy",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Radio relay towers stand in a line with integer transmission ranges `ranges`, where tower `i` can forward a signal to any tower up to `i + ranges[i]`. Starting from tower `0`, return `true` if the signal can reach the final tower.",
    "examples": [
      {
        "input": "ranges = [2, 3, 1, 1, 4]",
        "output": "true",
        "explanation": "Tower 0 -> 1 -> 4 reaches the end."
      },
      {
        "input": "ranges = [3, 2, 1, 0, 4]",
        "output": "false",
        "explanation": "Signal dead-ends at tower 3."
      }
    ],
    "constraints": [
      "1 <= ranges.length <= 10^4",
      "0 <= ranges[i] <= 10^5"
    ],
    "starterCode": {
      "python": "def can_reach_last_tower(ranges: list[int]) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function canReachLastTower(ranges) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean canReachLastTower(int[] ranges) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canReachLastTower(vector<int>& ranges) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "ranges = [2, 3, 1, 1, 4]",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "ranges = [3, 2, 1, 0, 4]",
        "expected": "false",
        "isHidden": false
      }
    ]
  },
  {
    "id": "ev-charging-loop-start-station",
    "title": "EV Delivery Loop Viable Starting Depot",
    "difficulty": "Medium",
    "topics": [
      "Greedy",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "An electric van runs a circular route of `n` depots. Depot `i` provides `charge[i]` kWh and driving to `(i + 1) % n` consumes `drain[i]` kWh. Return the unique starting depot index that completes the loop with non-negative battery, or `-1` if impossible.",
    "examples": [
      {
        "input": "charge = [1, 2, 3, 4, 5], drain = [3, 4, 5, 1, 2]",
        "output": "3",
        "explanation": "Starting at depot 3 completes the loop."
      },
      {
        "input": "charge = [2, 3, 4], drain = [3, 4, 3]",
        "output": "-1",
        "explanation": "Total charge < total drain."
      }
    ],
    "constraints": [
      "1 <= charge.length == drain.length <= 10^5"
    ],
    "starterCode": {
      "python": "def find_start_depot(charge: list[int], drain: list[int]) -> int:\n    # Write your solution here\n    return -1\n",
      "javascript": "function findStartDepot(charge, drain) {\n  // Write your solution here\n  return -1;\n}\n",
      "java": "class Solution {\n    public int findStartDepot(int[] charge, int[] drain) {\n        // Write your solution here\n        return -1;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findStartDepot(vector<int>& charge, vector<int>& drain) {\n        // Write your solution here\n        return -1;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "charge = [1, 2, 3, 4, 5], drain = [3, 4, 5, 1, 2]",
        "expected": "3",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "charge = [2, 3, 4], drain = [3, 4, 3]",
        "expected": "-1",
        "isHidden": false
      }
    ]
  },
  {
    "id": "gpu-job-cooldown-scheduler",
    "title": "GPU Kernel Cooldown Minimum Cycles",
    "difficulty": "Medium",
    "topics": [
      "Greedy",
      "Counting"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A GPU scheduler executes labeled kernel jobs `kernels` (uppercase letters). Identical kernels require at least `cooldown` cycles between executions. Return the minimum total cycles needed to complete all jobs.",
    "examples": [
      {
        "input": "kernels = [\"A\", \"A\", \"A\", \"B\", \"B\", \"B\"], cooldown = 2",
        "output": "8",
        "explanation": "A, B, idle, A, B, idle, A, B -> 8 cycles."
      },
      {
        "input": "kernels = [\"A\", \"A\", \"B\", \"C\"], cooldown = 0",
        "output": "4",
        "explanation": "No cooldown needed."
      }
    ],
    "constraints": [
      "1 <= kernels.length <= 10^4",
      "0 <= cooldown <= 100"
    ],
    "starterCode": {
      "python": "def min_gpu_cycles(kernels: list[str], cooldown: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minGpuCycles(kernels, cooldown) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minGpuCycles(char[] kernels, int cooldown) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minGpuCycles(vector<char>& kernels, int cooldown) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "kernels = [\"A\", \"A\", \"A\", \"B\", \"B\", \"B\"], cooldown = 2",
        "expected": "8",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "kernels = [\"A\", \"A\", \"B\", \"C\"], cooldown = 0",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "feature-flag-power-set",
    "title": "Experimentation Matrix All Flag Combinations",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Bit Manipulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "An A/B testing harness accepts a list of unique integer feature flag IDs `flags`. Return all possible subsets of enabled flags (the power set) with no duplicate subsets.",
    "examples": [
      {
        "input": "flags = [10, 20]",
        "output": "[[], [10], [10, 20], [20]]",
        "explanation": "All 2^2 = 4 flag configurations."
      },
      {
        "input": "flags = [5]",
        "output": "[[], [5]]",
        "explanation": "Off or on."
      }
    ],
    "constraints": [
      "1 <= flags.length <= 10",
      "All IDs unique."
    ],
    "starterCode": {
      "python": "def all_flag_configs(flags: list[int]) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function allFlagConfigs(flags) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> allFlagConfigs(int[] flags) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> allFlagConfigs(vector<int>& flags) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "flags = [10, 20]",
        "expected": "[[], [10], [10, 20], [20]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "flags = [5]",
        "expected": "[[], [5]]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "bundle-pricing-exact-combos",
    "title": "Gift-Card Exact Bundle Combinations",
    "difficulty": "Medium",
    "topics": [
      "Backtracking",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": true,
    "description": "A store offers distinct positive integer item prices `prices`. Customers can buy any item unlimited times. Return all unique price combinations that spend a gift card `credit` down to exactly `0`.",
    "examples": [
      {
        "input": "prices = [3, 5, 8], credit = 8",
        "output": "[[3, 5], [8]]",
        "explanation": "3+5=8 and 8=8."
      },
      {
        "input": "prices = [4], credit = 3",
        "output": "[]",
        "explanation": "No combination sums to 3."
      }
    ],
    "constraints": [
      "1 <= prices.length <= 30",
      "1 <= credit <= 40"
    ],
    "starterCode": {
      "python": "def exact_bundles(prices: list[int], credit: int) -> list[list[int]]:\n    # Write your solution here\n    return []\n",
      "javascript": "function exactBundles(prices, credit) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<List<Integer>> exactBundles(int[] prices, int credit) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> exactBundles(vector<int>& prices, int credit) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "prices = [3, 5, 8], credit = 8",
        "expected": "[[3, 5], [8]]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "prices = [4], credit = 3",
        "expected": "[]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "server-rack-nonattacking-sensors",
    "title": "Cleanroom Grid Non-Interfering Laser Scanners",
    "difficulty": "Hard",
    "topics": [
      "Backtracking",
      "Bit Manipulation"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Place `n` laser scanners on an `n x n` cleanroom floor grid so that no two scanners share the same row, column, or diagonal beam line. Return the number of distinct valid placements.",
    "examples": [
      {
        "input": "n = 4",
        "output": "2",
        "explanation": "Two valid 4x4 arrangements."
      },
      {
        "input": "n = 3",
        "output": "0",
        "explanation": "Impossible on a 3x3 grid."
      }
    ],
    "constraints": [
      "1 <= n <= 9"
    ],
    "starterCode": {
      "python": "def count_scanner_layouts(n: int) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function countScannerLayouts(n) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int countScannerLayouts(int n) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countScannerLayouts(int n) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "n = 4",
        "expected": "2",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "n = 3",
        "expected": "0",
        "isHidden": false
      }
    ]
  },
  {
    "id": "bonus-tier-neighbor-allocation",
    "title": "Sales Floor Neighbor-Fair Minimum Bonus Pool",
    "difficulty": "Hard",
    "topics": [
      "Greedy",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Sales reps sit in a row with quarterly performance scores `scores`. Every rep gets at least 1 bonus token, and any rep with a strictly higher score than an adjacent neighbor must receive strictly more tokens than that neighbor. Return the minimum total bonus tokens required.",
    "examples": [
      {
        "input": "scores = [10, 5, 20]",
        "output": "5",
        "explanation": "Tokens [2, 1, 2] sum to 5."
      },
      {
        "input": "scores = [10, 20, 20]",
        "output": "4",
        "explanation": "Tokens [1, 2, 1] sum to 4."
      }
    ],
    "constraints": [
      "1 <= scores.length <= 2 * 10^4"
    ],
    "starterCode": {
      "python": "def min_bonus_pool(scores: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function minBonusPool(scores) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int minBonusPool(int[] scores) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minBonusPool(vector<int>& scores) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "scores = [10, 5, 20]",
        "expected": "5",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "scores = [10, 20, 20]",
        "expected": "4",
        "isHidden": false
      }
    ]
  },
  {
    "id": "telemetry-stream-live-median",
    "title": "Pressure Gauge Live Streaming Median",
    "difficulty": "Hard",
    "topics": [
      "Heap",
      "Design",
      "Two Heaps"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A pipeline telemetry service processes `events`: `[\"log\", val]` records an integer pressure reading, and `[\"median\"]` queries the current median as a float. Return the list of float results for all `median` queries.",
    "examples": [
      {
        "input": "events = [[\"log\", 10], [\"log\", 20], [\"median\"], [\"log\", 30], [\"median\"]]",
        "output": "[15.0, 20.0]",
        "explanation": "Median of [10,20] is 15.0; median of [10,20,30] is 20.0."
      },
      {
        "input": "events = [[\"log\", 7], [\"median\"]]",
        "output": "[7.0]",
        "explanation": "Single reading."
      }
    ],
    "constraints": [
      "1 <= events.length <= 5 * 10^4",
      "At least one log precedes any median query."
    ],
    "starterCode": {
      "python": "def stream_medians(events: list[list]) -> list[float]:\n    # Write your solution here\n    return []\n",
      "javascript": "function streamMedians(events) {\n  // Write your solution here\n  return [];\n}\n",
      "java": "class Solution {\n    public List<Double> streamMedians(List<List<Object>> events) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<double> streamMedians(vector<vector<string>>& events) {\n        // Write your solution here\n        return {};\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "events = [[\"log\", 10], [\"log\", 20], [\"median\"], [\"log\", 30], [\"median\"]]",
        "expected": "[15.0, 20.0]",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "events = [[\"log\", 7], [\"median\"]]",
        "expected": "[7.0]",
        "isHidden": false
      }
    ]
  },
  {
    "id": "parity-check-unmatched-packet",
    "title": "ACK Log Unmatched Packet Identifier",
    "difficulty": "Easy",
    "topics": [
      "Bit Manipulation",
      "Array"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "Every transmitted packet logs its integer ID twice in `log_ids` (once on send, once on ACK), except one unacknowledged packet that appears only once. Return that lone packet ID in `O(n)` time and `O(1)` space.",
    "examples": [
      {
        "input": "log_ids = [101, 205, 101, 309, 205]",
        "output": "309",
        "explanation": "309 was never acknowledged."
      },
      {
        "input": "log_ids = [7]",
        "output": "7",
        "explanation": "Single unmatched packet."
      }
    ],
    "constraints": [
      "1 <= log_ids.length <= 5 * 10^4"
    ],
    "starterCode": {
      "python": "def find_unacked_packet(log_ids: list[int]) -> int:\n    # Write your solution here\n    return 0\n",
      "javascript": "function findUnackedPacket(logIds) {\n  // Write your solution here\n  return 0;\n}\n",
      "java": "class Solution {\n    public int findUnackedPacket(int[] logIds) {\n        // Write your solution here\n        return 0;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findUnackedPacket(vector<int>& logIds) {\n        // Write your solution here\n        return 0;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "log_ids = [101, 205, 101, 309, 205]",
        "expected": "309",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "log_ids = [7]",
        "expected": "7",
        "isHidden": false
      }
    ]
  },
  {
    "id": "memory-page-alignment-check",
    "title": "Allocator Power-of-Two Page Size Validator",
    "difficulty": "Easy",
    "topics": [
      "Bit Manipulation",
      "Math"
    ],
    "acceptance": "—",
    "submissions": "0",
    "orderInvariant": false,
    "description": "A kernel slab allocator only accepts block sizes `block_bytes` that are exact powers of two (`1, 2, 4, 8, ...`). Return `true` if `block_bytes` is a valid power of two in `O(1)` time without loops.",
    "examples": [
      {
        "input": "block_bytes = 4096",
        "output": "true",
        "explanation": "4096 = 2^12."
      },
      {
        "input": "block_bytes = 3072",
        "output": "false",
        "explanation": "3072 is not a power of two."
      }
    ],
    "constraints": [
      "-2^31 <= block_bytes <= 2^31 - 1"
    ],
    "starterCode": {
      "python": "def is_valid_page_size(block_bytes: int) -> bool:\n    # Write your solution here\n    return False\n",
      "javascript": "function isValidPageSize(blockBytes) {\n  // Write your solution here\n  return false;\n}\n",
      "java": "class Solution {\n    public boolean isValidPageSize(int blockBytes) {\n        // Write your solution here\n        return false;\n    }\n}\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValidPageSize(int blockBytes) {\n        // Write your solution here\n        return false;\n    }\n};\n"
    },
    "testCases": [
      {
        "caseNumber": 1,
        "input": "block_bytes = 4096",
        "expected": "true",
        "isHidden": false
      },
      {
        "caseNumber": 2,
        "input": "block_bytes = 3072",
        "expected": "false",
        "isHidden": false
      }
    ]
  }
];
