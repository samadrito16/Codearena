export interface ProblemEditorial {
  problemId: string;
  isStaticDemo: true;
  summary: string;
  hints: string[];
  approachTitle: string;
  approachSteps: string[];
  timeComplexity: string;
  spaceComplexity: string;
  pitfalls: string[];
  referenceCode?: {
    language: string;
    code: string;
  };
}

export const staticEditorials: Record<string, ProblemEditorial> = {
  'two-sum': {
    problemId: 'two-sum',
    isStaticDemo: true,
    summary: 'Trade linear extra space for linear time by indexing previously seen numbers in a hash map as you scan the array once.',
    hints: [
      'A brute-force nested loop checks every pair in O(n²). Can you avoid scanning the rest of the array for each element?',
      'For each number nums[i], you know the exact partner value you need: complement = target - nums[i].',
      'Store each visited value -> index in a hash map. Before inserting nums[i], check whether complement is already in the map.',
    ],
    approachTitle: 'One-Pass Hash Map',
    approachSteps: [
      'Create an empty hash map seen that maps each visited value to its index.',
      'Iterate over nums with index i and compute complement = target - nums[i].',
      'If seen contains complement, return [seen.get(complement), i] immediately.',
      'Otherwise record seen.set(nums[i], i) and continue.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      'Check for the complement before inserting nums[i] so you never reuse the same element twice (e.g., nums = [3, 3], target = 6).',
      'Return indices rather than the values themselves.',
    ],
    referenceCode: {
      language: 'JavaScript',
      code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
    },
  },
  'valid-parentheses': {
    problemId: 'valid-parentheses',
    isStaticDemo: true,
    summary: 'Match brackets in last-in, first-out order using a stack so every closing delimiter verifies the most recent unclosed opening delimiter.',
    hints: [
      'The most recently opened bracket must always be the first one to close — which data structure enforces LIFO order?',
      'Push opening brackets onto a stack (or push the closing bracket you expect to see next).',
      'Do not forget to check that the stack is completely empty after reading the entire string.',
    ],
    approachTitle: 'Stack Matching',
    approachSteps: [
      'Map each closing bracket (), [], {} to its matching opening bracket.',
      'Walk through each character ch in s.',
      'If ch is an opening bracket, push it onto the stack.',
      'If ch is a closing bracket, pop the top of the stack and verify it matches the expected opening bracket (if the stack is empty or mismatches, return false).',
      'After the loop, return true only if stack.length === 0.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      'Strings with odd length can never be valid — returning false early is a clean guard.',
      'Leaving unclosed brackets on the stack (like "((") must return false at the end.',
    ],
    referenceCode: {
      language: 'JavaScript',
      code: `function isValid(s) {
  if (s.length % 2 === 1) return false;
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
    },
  },
  'longest-substring': {
    problemId: 'longest-substring',
    isStaticDemo: true,
    summary: 'Maintain a sliding window of unique characters and jump the left pointer past the last occurrence of any repeated character.',
    hints: [
      'Maintain a window [left, right] that always contains distinct characters.',
      'When s[right] is already inside the current window, advance left to lastSeen[s[right]] + 1.',
      'Make sure left never moves backward if a character was seen before the current window started.',
    ],
    approachTitle: 'Sliding Window with Last-Seen Index Map',
    approachSteps: [
      'Initialize left = 0, best = 0, and a map lastIndex from character to its most recent index.',
      'Expand right from 0 to s.length - 1.',
      'If s[right] was seen at index prev >= left, move left = prev + 1.',
      'Update lastIndex.set(s[right], right) and best = Math.max(best, right - left + 1).',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, charset))',
    pitfalls: [
      'Always use left = Math.max(left, prev + 1) (or guard prev >= left) so stale entries outside the window do not pull left backward.',
      'Handle empty string "" cleanly by returning 0.',
    ],
    referenceCode: {
      language: 'JavaScript',
      code: `function lengthOfLongestSubstring(s) {
  const lastIndex = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right += 1) {
    const ch = s[right];
    const prev = lastIndex.get(ch);
    if (prev !== undefined && prev >= left) {
      left = prev + 1;
    }
    lastIndex.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    },
  },
  'container-water': {
    problemId: 'container-water',
    isStaticDemo: true,
    summary: 'Start with the widest possible container using two pointers at both ends and always move the shorter wall inward.',
    hints: [
      'Container area is width * min(height[left], height[right]). Starting at left = 0 and right = n - 1 maximizes width.',
      'Moving the taller pointer inward can only shrink width without increasing the limiting shorter height.',
      'Therefore, only advancing the shorter pointer can potentially find a taller wall that increases area.',
    ],
    approachTitle: 'Greedy Two Pointers',
    approachSteps: [
      'Set left = 0, right = height.length - 1, and best = 0.',
      'While left < right, compute area = (right - left) * Math.min(height[left], height[right]) and update best.',
      'If height[left] < height[right], increment left; otherwise decrement right.',
      'Return best once the pointers meet.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      'Do not sort the array — wall positions determine the container width.',
      'Stop the loop when left === right since width becomes 0.',
    ],
    referenceCode: {
      language: 'JavaScript',
      code: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;
  while (left < right) {
    const area = (right - left) * Math.min(height[left], height[right]);
    best = Math.max(best, area);
    if (height[left] < height[right]) left += 1;
    else right -= 1;
  }
  return best;
}`,
    },
  },
  'median-arrays': {
    problemId: 'median-arrays',
    isStaticDemo: true,
    summary: 'Binary search the partition of the smaller array so that left and right halves have equal size and valid cross-boundary ordering.',
    hints: [
      'To achieve O(log(m+n)), binary search over the partition index of the smaller array rather than merging.',
      'Partitioning nums1 at i implies nums2 must be partitioned at j = (m + n + 1) / 2 - i.',
      'Valid partition requires maxLeft1 <= minRight2 and maxLeft2 <= minRight1.',
    ],
    approachTitle: 'Binary Search Partitioning',
    approachSteps: [
      'Ensure nums1 is the shorter array (swap if nums1.length > nums2.length).',
      'Binary search i in [0, m] with j = Math.floor((m + n + 1) / 2) - i.',
      'Identify maxLeft1, minRight1, maxLeft2, minRight2 using infinity guards at boundaries.',
      'If valid, return max(maxLeft1, maxLeft2) for odd total, or average of boundary medians for even total.',
    ],
    timeComplexity: 'O(log(min(m, n)))',
    spaceComplexity: 'O(1)',
    pitfalls: [
      'Index out of bounds when partition lands at index 0 or length m; use -Infinity and +Infinity.',
      'Always binary search on the smaller array to guarantee j is non-negative.',
    ],
    referenceCode: {
      language: 'Python',
      code: `def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    low, high = 0, m
    while low <= high:
        i = (low + high) // 2
        j = (m + n + 1) // 2 - i
        max_left1 = float('-inf') if i == 0 else nums1[i - 1]
        min_right1 = float('inf') if i == m else nums1[i]
        max_left2 = float('-inf') if j == 0 else nums2[j - 1]
        min_right2 = float('inf') if j == n else nums2[j]
        if max_left1 <= min_right2 and max_left2 <= min_right1:
            if (m + n) % 2 == 1:
                return float(max(max_left1, max_left2))
            return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2.0
        elif max_left1 > min_right2:
            high = i - 1
        else:
            low = i + 1
    return 0.0`,
    },
  },
  'binary-tree-level-order': {
    problemId: 'binary-tree-level-order',
    isStaticDemo: true,
    summary: 'Traverse the binary tree level by level using a queue, snapshotting queue length at the start of each level.',
    hints: [
      'A queue enforces FIFO order, naturally visiting parents before children.',
      'Record the queue size at the beginning of each iteration to batch nodes on the exact same depth.',
    ],
    approachTitle: 'Breadth-First Level Traversal',
    approachSteps: [
      'If root is null, return [].',
      'Initialize queue = [root] and result = [].',
      'While queue is not empty, snapshot levelSize = queue.length and create level = [].',
      'Pop levelSize nodes, pushing values to level and non-null children to queue.',
      'Append level to result.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pitfalls: [
      'Do not use queue.length dynamically inside the loop without snapshotting level size first.',
      'Check for null root before queue initialization.',
    ],
    referenceCode: {
      language: 'JavaScript',
      code: `function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    for (let i = 0; i < levelSize; i += 1) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}`,
    },
  },
  'reverse-linked-list': {
    problemId: 'reverse-linked-list',
    isStaticDemo: true,
    summary: 'Iterate through the linked list, redirecting each node\'s next pointer to its predecessor.',
    hints: [
      'Maintain prev = null and curr = head.',
      'Before rewiring curr.next = prev, temporarily store curr.next in a nextNode variable so you don\'t lose the rest of the list.',
    ],
    approachTitle: 'Iterative Three-Pointer Rewiring',
    approachSteps: [
      'Set prev = null and curr = head.',
      'While curr is not null: save nextNode = curr.next, rewire curr.next = prev, advance prev = curr, advance curr = nextNode.',
      'Return prev as the new head.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      'Losing reference to the remaining list before mutating curr.next.',
      'Returning curr instead of prev after loop exits (curr will be null).',
    ],
    referenceCode: {
      language: 'JavaScript',
      code: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }
  return prev;
}`,
    },
  },
  'climbing-stairs': {
    problemId: 'climbing-stairs',
    isStaticDemo: true,
    summary: 'The number of ways to reach step n is the sum of ways to reach step n-1 and step n-2 (Fibonacci sequence).',
    hints: [
      'To reach step n, you can either take 1 step from n-1 or 2 steps from n-2.',
      'Therefore ways(n) = ways(n-1) + ways(n-2).',
      'Optimize space from an array to two rolling variables.',
    ],
    approachTitle: 'Dynamic Programming with Rolling Variables',
    approachSteps: [
      'Handle base cases: if n <= 2, return n.',
      'Initialize prev2 = 1, prev1 = 2.',
      'Iterate step from 3 to n: current = prev1 + prev2, prev2 = prev1, prev1 = current.',
      'Return prev1.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    pitfalls: [
      'Using naive recursion without memoization leads to O(2ⁿ) Time Limit Exceeded.',
      'Ensure 1-based indexing for steps.',
    ],
    referenceCode: {
      language: 'JavaScript',
      code: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1;
  let prev1 = 2;
  for (let i = 3; i <= n; i += 1) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
    },
  },
};

export function getProblemEditorial(problemId: string): ProblemEditorial | null {
  return staticEditorials[problemId] ?? null;
}
