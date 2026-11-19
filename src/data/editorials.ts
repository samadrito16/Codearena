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
};

export function getProblemEditorial(problemId: string): ProblemEditorial | null {
  return staticEditorials[problemId] ?? null;
}
