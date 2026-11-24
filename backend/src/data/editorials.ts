export interface ProblemEditorial {
  problemId: string;
  isStaticDemo?: boolean;
  isVerified?: boolean;
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
  "two-sum": {
  "problemId": "two-sum",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Trade linear extra space for linear time by indexing previously seen numbers in a hash map as you scan the array once.",
  "hints": [
    "A brute-force nested loop checks every pair in O(n²). Can you avoid scanning the rest of the array for each element?.",
    "For each number nums[i], you know the exact partner value you need: complement = target - nums[i].",
    "Store each visited value -> index in a hash map. Before inserting nums[i], check whether complement is already in the map."
  ],
  "approachTitle": "One-Pass Hash Map",
  "approachSteps": [
    "Create an empty hash map seen that maps each visited value to its index.",
    "Iterate over nums with index i and compute complement = target - nums[i].",
    "If seen contains complement, return [seen.get(complement), i] immediately.",
    "Otherwise record seen.set(nums[i], i) and continue."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Check for the complement before inserting nums[i] so you never reuse the same element twice (e.g., nums = [3, 3], target = 6).",
    "Return indices rather than the values themselves."
  ],
  "referenceCode": {
    "language": "JavaScript",
    "code": "function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i += 1) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) {\n      return [seen.get(complement), i];\n    }\n    seen.set(nums[i], i);\n  }\n  return [];\n}"
  }
},
  "valid-parentheses": {
  "problemId": "valid-parentheses",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Match brackets in last-in, first-out order using a stack so every closing delimiter verifies the most recent unclosed opening delimiter.",
  "hints": [
    "The most recently opened bracket must always be the first one to close — which data structure enforces LIFO order?.",
    "Push opening brackets onto a stack (or push the closing bracket you expect to see next).",
    "Do not forget to check that the stack is completely empty after reading the entire string."
  ],
  "approachTitle": "Stack Matching",
  "approachSteps": [
    "Map each closing bracket (), [], {} to its matching opening bracket.",
    "Walk through each character ch in s.",
    "If ch is an opening bracket, push it onto the stack.",
    "If ch is a closing bracket, pop the top of the stack and verify it matches the expected opening bracket (if the stack is empty or mismatches, return false).",
    "After the loop, return true only if stack.length === 0."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Strings with odd length can never be valid — returning false early is a clean guard.",
    "Leaving unclosed brackets on the stack (like \"((\") must return false at the end."
  ],
  "referenceCode": {
    "language": "JavaScript",
    "code": "function isValid(s) {\n  if (s.length % 2 === 1) return false;\n  const pairs = { ')': '(', ']': '[', '}': '{' };\n  const stack = [];\n  for (const ch of s) {\n    if (ch in pairs) {\n      if (stack.pop() !== pairs[ch]) return false;\n    } else {\n      stack.push(ch);\n    }\n  }\n  return stack.length === 0;\n}"
  }
},
  "longest-substring": {
  "problemId": "longest-substring",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a sliding window of unique characters and jump the left pointer past the last occurrence of any repeated character.",
  "hints": [
    "Maintain a window [left, right] that always contains distinct characters.",
    "When s[right] is already inside the current window, advance left to lastSeen[s[right]] + 1.",
    "Make sure left never moves backward if a character was seen before the current window started."
  ],
  "approachTitle": "Sliding Window with Last-Seen Index Map",
  "approachSteps": [
    "Initialize left = 0, best = 0, and a map lastIndex from character to its most recent index.",
    "Expand right from 0 to s.length - 1.",
    "If s[right] was seen at index prev >= left, move left = prev + 1.",
    "Update lastIndex.set(s[right], right) and best = Math.max(best, right - left + 1)."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(min(n, charset))",
  "pitfalls": [
    "Always use left = Math.max(left, prev + 1) (or guard prev >= left) so stale entries outside the window do not pull left backward.",
    "Handle empty string \"\" cleanly by returning 0."
  ],
  "referenceCode": {
    "language": "JavaScript",
    "code": "function lengthOfLongestSubstring(s) {\n  const lastIndex = new Map();\n  let left = 0;\n  let best = 0;\n  for (let right = 0; right < s.length; right += 1) {\n    const ch = s[right];\n    const prev = lastIndex.get(ch);\n    if (prev !== undefined && prev >= left) {\n      left = prev + 1;\n    }\n    lastIndex.set(ch, right);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}"
  }
},
  "container-water": {
  "problemId": "container-water",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Start with the widest possible container using two pointers at both ends and always move the shorter wall inward.",
  "hints": [
    "Container area is width * min(height[left], height[right]). Starting at left = 0 and right = n - 1 maximizes width.",
    "Moving the taller pointer inward can only shrink width without increasing the limiting shorter height.",
    "Therefore, only advancing the shorter pointer can potentially find a taller wall that increases area."
  ],
  "approachTitle": "Greedy Two Pointers",
  "approachSteps": [
    "Set left = 0, right = height.length - 1, and best = 0.",
    "While left < right, compute area = (right - left) * Math.min(height[left], height[right]) and update best.",
    "If height[left] < height[right], increment left; otherwise decrement right.",
    "Return best once the pointers meet."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Do not sort the array — wall positions determine the container width.",
    "Stop the loop when left === right since width becomes 0."
  ],
  "referenceCode": {
    "language": "JavaScript",
    "code": "function maxArea(height) {\n  let left = 0;\n  let right = height.length - 1;\n  let best = 0;\n  while (left < right) {\n    const area = (right - left) * Math.min(height[left], height[right]);\n    best = Math.max(best, area);\n    if (height[left] < height[right]) left += 1;\n    else right -= 1;\n  }\n  return best;\n}"
  }
},
  "median-arrays": {
  "problemId": "median-arrays",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Binary search the partition of the smaller array so that left and right halves have equal size and valid cross-boundary ordering.",
  "hints": [
    "To achieve O(log(m+n)), binary search over the partition index of the smaller array rather than merging.",
    "Partitioning nums1 at i implies nums2 must be partitioned at j = (m + n + 1) / 2 - i.",
    "Valid partition requires maxLeft1 <= minRight2 and maxLeft2 <= minRight1."
  ],
  "approachTitle": "Binary Search Partitioning",
  "approachSteps": [
    "Ensure nums1 is the shorter array (swap if nums1.length > nums2.length).",
    "Binary search i in [0, m] with j = Math.floor((m + n + 1) / 2) - i.",
    "Identify maxLeft1, minRight1, maxLeft2, minRight2 using infinity guards at boundaries.",
    "If valid, return max(maxLeft1, maxLeft2) for odd total, or average of boundary medians for even total."
  ],
  "timeComplexity": "O(log(min(m, n)))",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Index out of bounds when partition lands at index 0 or length m; use -Infinity and +Infinity.",
    "Always binary search on the smaller array to guarantee j is non-negative."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:\n    if len(nums1) > len(nums2):\n        nums1, nums2 = nums2, nums1\n    m, n = len(nums1), len(nums2)\n    low, high = 0, m\n    while low <= high:\n        i = (low + high) // 2\n        j = (m + n + 1) // 2 - i\n        max_left1 = float('-inf') if i == 0 else nums1[i - 1]\n        min_right1 = float('inf') if i == m else nums1[i]\n        max_left2 = float('-inf') if j == 0 else nums2[j - 1]\n        min_right2 = float('inf') if j == n else nums2[j]\n        if max_left1 <= min_right2 and max_left2 <= min_right1:\n            if (m + n) % 2 == 1:\n                return float(max(max_left1, max_left2))\n            return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2.0\n        elif max_left1 > min_right2:\n            high = i - 1\n        else:\n            low = i + 1\n    return 0.0"
  }
},
  "binary-tree-level-order": {
  "problemId": "binary-tree-level-order",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Traverse the binary tree level by level using a queue, snapshotting queue length at the start of each level.",
  "hints": [
    "A queue enforces FIFO order, naturally visiting parents before children.",
    "Record the queue size at the beginning of each iteration to batch nodes on the exact same depth.",
    "Boundary edge cases & complexity: Do not use queue.length dynamically inside the loop without snapshotting level size first. Check for null root before queue initialization. Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Breadth-First Level Traversal",
  "approachSteps": [
    "If root is null, return [].",
    "Initialize queue = [root] and result = [].",
    "While queue is not empty, snapshot levelSize = queue.length and create level = [].",
    "Pop levelSize nodes, pushing values to level and non-null children to queue.",
    "Append level to result."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Do not use queue.length dynamically inside the loop without snapshotting level size first.",
    "Check for null root before queue initialization."
  ],
  "referenceCode": {
    "language": "JavaScript",
    "code": "function levelOrder(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    const currentLevel = [];\n    for (let i = 0; i < levelSize; i += 1) {\n      const node = queue.shift();\n      currentLevel.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(currentLevel);\n  }\n  return result;\n}"
  }
},
  "reverse-linked-list": {
  "problemId": "reverse-linked-list",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Iterate through the linked list, redirecting each node's next pointer to its predecessor.",
  "hints": [
    "Maintain prev = null and curr = head.",
    "Before rewiring curr.next = prev, temporarily store curr.next in a nextNode variable so you don't lose the rest of the list.",
    "Boundary edge cases & complexity: Losing reference to the remaining list before mutating curr.next. Returning curr instead of prev after loop exits (curr will be null). Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Iterative Three-Pointer Rewiring",
  "approachSteps": [
    "Set prev = null and curr = head.",
    "While curr is not null: save nextNode = curr.next, rewire curr.next = prev, advance prev = curr, advance curr = nextNode.",
    "Return prev as the new head."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Losing reference to the remaining list before mutating curr.next.",
    "Returning curr instead of prev after loop exits (curr will be null)."
  ],
  "referenceCode": {
    "language": "JavaScript",
    "code": "function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr !== null) {\n    const nextNode = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = nextNode;\n  }\n  return prev;\n}"
  }
},
  "climbing-stairs": {
  "problemId": "climbing-stairs",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "The number of ways to reach step n is the sum of ways to reach step n-1 and step n-2 (Fibonacci sequence).",
  "hints": [
    "To reach step n, you can either take 1 step from n-1 or 2 steps from n-2.",
    "Therefore ways(n) = ways(n-1) + ways(n-2).",
    "Optimize space from an array to two rolling variables."
  ],
  "approachTitle": "Dynamic Programming with Rolling Variables",
  "approachSteps": [
    "Handle base cases: if n <= 2, return n.",
    "Initialize prev2 = 1, prev1 = 2.",
    "Iterate step from 3 to n: current = prev1 + prev2, prev2 = prev1, prev1 = current.",
    "Return prev1."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Using naive recursion without memoization leads to O(2ⁿ) Time Limit Exceeded.",
    "Ensure 1-based indexing for steps."
  ],
  "referenceCode": {
    "language": "JavaScript",
    "code": "function climbStairs(n) {\n  if (n <= 2) return n;\n  let prev2 = 1;\n  let prev1 = 2;\n  for (let i = 3; i <= n; i += 1) {\n    const current = prev1 + prev2;\n    prev2 = prev1;\n    prev1 = current;\n  }\n  return prev1;\n}"
  }
},
  "maximum-subarray": {
  "problemId": "maximum-subarray",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use Kadane's algorithm: at each element decide whether to extend the previous subarray or start fresh at the current element.",
  "hints": [
    "If the running sum becomes negative, carrying it forward only hurts future subarrays.",
    "Maintain `curr = max(x, curr + x)` and `best = max(best, curr)`.",
    "Initialize both to `nums[0]` to handle all-negative arrays."
  ],
  "approachTitle": "Kadane's Linear Scan",
  "approachSteps": [
    "Initialize `curr = best = nums[0]`.",
    "Iterate `x` in `nums[1:]`.",
    "Update `curr = max(x, curr + x)` and `best = max(best, curr)`.",
    "Return `best`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Initializing `best = 0` gives the wrong answer on all-negative arrays."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def max_subarray(nums: list[int]) -> int:\n    curr = best = nums[0]\n    for x in nums[1:]:\n        curr = max(x, curr + x)\n        if curr > best:\n            best = curr\n    return best\n"
  }
},
  "move-zeroes": {
  "problemId": "move-zeroes",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use a write pointer `pos` that places each non-zero element in order via in-place swap.",
  "hints": [
    "Track the next index `pos` where a non-zero element belongs.",
    "Whenever `nums[i] != 0`, swap `nums[pos]` and `nums[i]` and increment `pos`.",
    "Everything from `pos` onward is automatically zero."
  ],
  "approachTitle": "Single-Pass Read/Write Two Pointers",
  "approachSteps": [
    "Set `pos = 0`.",
    "Iterate `i` from `0` to `len(nums) - 1`; if `nums[i] != 0`, swap `nums[pos]` with `nums[i]` and increment `pos`.",
    "Return `nums`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Avoid `list.remove(0)` inside a loop, which degrades to O(n^2)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def move_zeroes(nums: list[int]) -> list[int]:\n    pos = 0\n    for i in range(len(nums)):\n        if nums[i] != 0:\n            nums[pos], nums[i] = nums[i], nums[pos]\n            pos += 1\n    return nums\n"
  }
},
  "find-disappeared-numbers": {
  "problemId": "find-disappeared-numbers",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Negate `nums[abs(x) - 1]` to mark presence in-place, then collect indices whose values remain positive.",
  "hints": [
    "All values are in `1.n`, mapping directly to indices `0.n-1`.",
    "Use sign flipping (`-abs(.)`) to mark visited indices without losing their magnitude.",
    "Any index `i` still holding a positive number means `i + 1` was absent."
  ],
  "approachTitle": "In-Place Sign Marking",
  "approachSteps": [
    "For each `x` in `nums`, set `idx = abs(x) - 1` and `nums[idx] = -abs(nums[idx])`.",
    "Return `[i + 1 for i, v in enumerate(nums) if v > 0]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Always take `abs(x)` before computing `idx` because `x` may have already been negated."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_disappeared_numbers(nums: list[int]) -> list[int]:\n    for x in nums:\n        idx = abs(x) - 1\n        if nums[idx] > 0:\n            nums[idx] = -nums[idx]\n    return [i + 1 for i, v in enumerate(nums) if v > 0]\n"
  }
},
  "spiral-matrix": {
  "problemId": "spiral-matrix",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain four shrinking boundaries `top`, `bottom`, `left`, `right`, peeling one edge at a time while checking boundaries before traversing bottom and left edges.",
  "hints": [
    "Peel top row, right column, bottom row, left column in order.",
    "Check `if top <= bottom` before traversing the bottom row.",
    "Check `if left <= right` before traversing the left column."
  ],
  "approachTitle": "Four-Boundary Layer Peeling",
  "approachSteps": [
    "Initialize `top = 0`, `bottom = m - 1`, `left = 0`, `right = n - 1`.",
    "Loop while `top <= bottom and left <= right` traversing 4 edges and shrinking each boundary.",
    "Return accumulated elements."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "For single-row or single-column remnants, skipping the boundary re-check duplicates elements."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def spiral_order(matrix: list[list[int]]) -> list[int]:\n    top, bottom = 0, len(matrix) - 1\n    left, right = 0, len(matrix[0]) - 1\n    res = []\n    while top <= bottom and left <= right:\n        for c in range(left, right + 1):\n            res.append(matrix[top][c])\n        top += 1\n        for r in range(top, bottom + 1):\n            res.append(matrix[r][right])\n        right -= 1\n        if top <= bottom:\n            for c in range(right, left - 1, -1):\n                res.append(matrix[bottom][c])\n            bottom -= 1\n        if left <= right:\n            for r in range(bottom, top - 1, -1):\n                res.append(matrix[r][left])\n            left += 1\n    return res\n"
  }
},
  "rotate-image": {
  "problemId": "rotate-image",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Transpose the matrix across the main diagonal (`matrix[i][j] <-> matrix[j][i]`), then reverse every row.",
  "hints": [
    "90-degree clockwise rotation equals transpose followed by horizontal reflection.",
    "During transpose, only iterate `j` from `i + 1` to `n - 1` so pairs are not swapped twice.",
    "Reverse each row in-place."
  ],
  "approachTitle": "Transpose + Row Reversal",
  "approachSteps": [
    "Transpose upper triangle with lower triangle in-place.",
    "Reverse each row `row.reverse()`.",
    "Return `matrix`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Swapping for all `j` from `0` to `n-1` undoes the transpose."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def rotate_image(matrix: list[list[int]]) -> list[list[int]]:\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i + 1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    for row in matrix:\n        row.reverse()\n    return matrix\n"
  }
},
  "set-matrix-zeroes": {
  "problemId": "set-matrix-zeroes",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Reuse row 0 and column 0 as in-place marker arrays, with two booleans tracking whether row 0 or column 0 originally contained any zeros.",
  "hints": [
    "Store `first_row_zero` and `first_col_zero` before modifying the matrix.",
    "Mark `matrix[r][0] = 0` and `matrix[0][c] = 0` for every interior zero.",
    "Zero interior cells first, then zero row 0 and column 0 last."
  ],
  "approachTitle": "First-Row/First-Col In-Place Markers",
  "approachSteps": [
    "Check if row 0 or col 0 initially contains a `0`.",
    "Scan `(1..m-1, 1..n-1)` marking zeros in row 0 and col 0.",
    "Zero interior cells whose row/col header is `0`.",
    "Zero row 0 and/or col 0 according to the saved flags."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Zeroing row 0 or col 0 before interior cells destroys the markers."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def set_zeroes(matrix: list[list[int]]) -> list[list[int]]:\n    m, n = len(matrix), len(matrix[0])\n    first_row = any(matrix[0][c] == 0 for c in range(n))\n    first_col = any(matrix[r][0] == 0 for r in range(m))\n    for r in range(1, m):\n        for c in range(1, n):\n            if matrix[r][c] == 0:\n                matrix[r][0] = 0\n                matrix[0][c] = 0\n    for r in range(1, m):\n        for c in range(1, n):\n            if matrix[r][0] == 0 or matrix[0][c] == 0:\n                matrix[r][c] = 0\n    if first_row:\n        for c in range(n):\n            matrix[0][c] = 0\n    if first_col:\n        for r in range(m):\n            matrix[r][0] = 0\n    return matrix\n"
  }
},
  "insert-interval": {
  "problemId": "insert-interval",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Perform a three-phase linear sweep: emit all intervals ending before `new_interval`, merge all overlapping intervals into `new_interval`, then append all remaining intervals.",
  "hints": [
    "Intervals with `end < new_start` come strictly before.",
    "Intervals with `start <= new_end` overlap and expand `[new_start, new_end]`.",
    "All remaining intervals come strictly after."
  ],
  "approachTitle": "Three-Phase Linear Sweep",
  "approachSteps": [
    "Append intervals with `intervals[i][1] < ns`.",
    "Merge intervals with `intervals[i][0] <= ne` updating `ns = min(...)`, `ne = max(...)`.",
    "Append `[ns, ne]` and extend with the remaining intervals."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Handle empty `intervals` cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def insert_interval(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:\n    res = []\n    i, n = 0, len(intervals)\n    ns, ne = new_interval\n    while i < n and intervals[i][1] < ns:\n        res.append(intervals[i])\n        i += 1\n    while i < n and intervals[i][0] <= ne:\n        ns = min(ns, intervals[i][0])\n        ne = max(ne, intervals[i][1])\n        i += 1\n    res.append([ns, ne])\n    res.extend(intervals[i:])\n    return res\n"
  }
},
  "non-overlapping-intervals": {
  "problemId": "non-overlapping-intervals",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort intervals by end time ascending and greedily keep every interval whose start is `>= prev_end`; the rest must be removed.",
  "hints": [
    "Minimizing removals is equivalent to maximizing the number of non-overlapping intervals kept (Activity Selection).",
    "Always keep the interval that finishes earliest to leave maximum room for future intervals.",
    "Count overlaps where `start < prev_end`."
  ],
  "approachTitle": "Earliest-Finish-Time Greedy",
  "approachSteps": [
    "Sort `intervals` by `x[1]`.",
    "Track `prev_end = intervals[0][1]` and `removed = 0`.",
    "For `[s, e]` in `intervals[1:]`: if `s < prev_end`, increment `removed`; else set `prev_end = e`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Sorting by start time instead of end time requires extra logic to keep the smaller end on overlap."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def erase_overlap_intervals(intervals: list[list[int]]) -> int:\n    intervals.sort(key=lambda x: x[1])\n    prev_end = intervals[0][1]\n    removed = 0\n    for s, e in intervals[1:]:\n        if s < prev_end:\n            removed += 1\n        else:\n            prev_end = e\n    return removed\n"
  }
},
  "meeting-rooms-ii": {
  "problemId": "meeting-rooms-ii",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort meetings by start time and track active meeting end times in a min-heap; reuse the earliest-ending room whenever `heap[0] <= start`.",
  "hints": [
    "The number of rooms needed equals the maximum simultaneous overlapping meetings.",
    "A min-heap of end times exposes the earliest room to become free in O(1).",
    "Pop `heap[0]` if `heap[0] <= start`, then push `end`."
  ],
  "approachTitle": "Start-Sorted Min-Heap Room Allocation",
  "approachSteps": [
    "Sort `intervals` by start time.",
    "Initialize empty min-heap `ends`.",
    "For `[s, e]` in `intervals`: if `ends` and `ends[0] <= s`, `heappop(ends)`; then `heappush(ends, e)`.",
    "Return `len(ends)`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Meetings touching at `end == start` can reuse the same room (`<=`)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef min_meeting_rooms(intervals: list[list[int]]) -> int:\n    intervals.sort(key=lambda x: x[0])\n    ends = []\n    for s, e in intervals:\n        if ends and ends[0] <= s:\n            heapq.heappop(ends)\n        heapq.heappush(ends, e)\n    return len(ends)\n"
  }
},
  "contiguous-array": {
  "problemId": "contiguous-array",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Treat `0` as `-1` and `1` as `+1`; whenever the running prefix balance repeats an earlier balance, the subarray in between has net sum `0` (equal 0s and 1s).",
  "hints": [
    "Map `0 -> -1` and `1 -> +1`.",
    "Store the FIRST index where each running balance appeared.",
    "Seed `first_seen = {0: -1}` before index 0."
  ],
  "approachTitle": "Balance Prefix Sum First-Seen Map",
  "approachSteps": [
    "Initialize `first_seen = {0: -1}`, `bal = 0`, `best = 0`.",
    "For `i, x` in `enumerate(nums)`, update `bal += 1 if x == 1 else -1`.",
    "If `bal in first_seen`, update `best = max(best, i - first_seen[bal])`; else record `first_seen[bal] = i`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Never overwrite `first_seen[bal]` because keeping the earliest index maximizes subarray length."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_max_length(nums: list[int]) -> int:\n    first = {0: -1}\n    bal = 0\n    best = 0\n    for i, x in enumerate(nums):\n        bal += 1 if x == 1 else -1\n        if bal in first:\n            best = max(best, i - first[bal])\n        else:\n            first[bal] = i\n    return best\n"
  }
},
  "subarray-sums-divisible-by-k": {
  "problemId": "subarray-sums-divisible-by-k",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Count prefix sums modulo `k`; any two prefixes with identical remainder `rem` define a subarray whose sum is divisible by `k`.",
  "hints": [
    "`(prefix[r] - prefix[l]) % k == 0` iff `prefix[r] % k == prefix[l] % k`.",
    "Normalize negative remainders into `[0, k - 1]` (Python `%` does this automatically).",
    "Seed `counts[0] = 1`."
  ],
  "approachTitle": "Modular Prefix Remainder Counting",
  "approachSteps": [
    "Initialize `counts = [0] * k`, `counts[0] = 1`, `rem = 0`, `ans = 0`.",
    "For each `x` in `nums`, update `rem = (rem + x) % k`.",
    "Add `counts[rem]` to `ans` and increment `counts[rem]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(k)",
  "pitfalls": [
    "In Java/C++, use `((rem + x) % k + k) % k` to normalize negative remainders."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def subarrays_div_by_k(nums: list[int], k: int) -> int:\n    counts = [0] * k\n    counts[0] = 1\n    rem = 0\n    ans = 0\n    for x in nums:\n        rem = (rem + x) % k\n        ans += counts[rem]\n        counts[rem] += 1\n    return ans\n"
  }
},
  "four-sum": {
  "problemId": "four-sum",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort the array, fix two outer indices skipping duplicates, and use two pointers on the remaining suffix.",
  "hints": [
    "Sort `nums` first.",
    "Skip duplicate values for `i`, `j`, `l`, and `r`.",
    "Use 64-bit integers in Java/C++ since four 10^9 numbers can overflow 32-bit int."
  ],
  "approachTitle": "Sorted Double-Loop + Two Pointers",
  "approachSteps": [
    "Sort `nums`.",
    "Fix `i` in `0..n-4` and `j` in `i+1..n-3` skipping duplicates.",
    "Run two pointers `l = j + 1`, `r = n - 1` looking for `target - nums[i] - nums[j]`."
  ],
  "timeComplexity": "O(n^3)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Return `[]` immediately when `len(nums) < 4`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def four_sum(nums: list[int], target: int) -> list[list[int]]:\n    nums.sort()\n    n = len(nums)\n    res = []\n    for i in range(n - 3):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        for j in range(i + 1, n - 2):\n            if j > i + 1 and nums[j] == nums[j - 1]:\n                continue\n            l, r = j + 1, n - 1\n            while l < r:\n                s = nums[i] + nums[j] + nums[l] + nums[r]\n                if s == target:\n                    res.append([nums[i], nums[j], nums[l], nums[r]])\n                    l += 1\n                    r -= 1\n                    while l < r and nums[l] == nums[l - 1]:\n                        l += 1\n                    while l < r and nums[r] == nums[r + 1]:\n                        r -= 1\n                elif s < target:\n                    l += 1\n                else:\n                    r -= 1\n    return res\n"
  }
},
  "next-permutation": {
  "problemId": "next-permutation",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Find the rightmost ascent `nums[i] < nums[i + 1]`, swap `nums[i]` with the rightmost element `> nums[i]`, and reverse the suffix `nums[i + 1:]`.",
  "hints": [
    "Scan right-to-left to find the first dip `i` where `nums[i] < nums[i + 1]`.",
    "If `i >= 0`, scan right-to-left for the first `j` with `nums[j] > nums[i]` and swap them.",
    "Reverse `nums[i + 1:]` so the suffix is in smallest ascending order."
  ],
  "approachTitle": "Rightmost Pivot Swap + Suffix Reversal",
  "approachSteps": [
    "Find rightmost `i` with `nums[i] < nums[i + 1]`.",
    "If `i >= 0`, find rightmost `j` with `nums[j] > nums[i]` and swap `nums[i], nums[j]`.",
    "Reverse `nums[i + 1:]` in-place."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Use `<=` (not `<`) when skipping duplicates during the backward scans."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def next_permutation(nums: list[int]) -> list[int]:\n    i = len(nums) - 2\n    while i >= 0 and nums[i] >= nums[i + 1]:\n        i -= 1\n    if i >= 0:\n        j = len(nums) - 1\n        while nums[j] <= nums[i]:\n            j -= 1\n        nums[i], nums[j] = nums[j], nums[i]\n    l, r = i + 1, len(nums) - 1\n    while l < r:\n        nums[l], nums[r] = nums[r], nums[l]\n        l += 1\n        r -= 1\n    return nums\n"
  }
},
  "pascals-triangle": {
  "problemId": "pascals-triangle",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Build each row from the previous row with `1` at both ends and `prev[j - 1] + prev[j]` in the interior.",
  "hints": [
    "Row `r` has length `r + 1` with `1` at indices `0` and `r`.",
    "Every interior element `j` equals `prev[j - 1] + prev[j]`.",
    "Build row-by-row from `0` to `num_rows - 1`."
  ],
  "approachTitle": "Iterative Row Construction",
  "approachSteps": [
    "Initialize `tri = [[1]]`.",
    "For each subsequent row, construct `[1] + [prev[j-1] + prev[j] for j in range(1, len(prev))] + [1]`.",
    "Return `tri`."
  ],
  "timeComplexity": "O(num_rows^2)",
  "spaceComplexity": "O(num_rows^2)",
  "pitfalls": [
    "Handle `num_rows == 1` cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def generate_pascal(num_rows: int) -> list[list[int]]:\n    tri = [[1]]\n    for _ in range(1, num_rows):\n        prev = tri[-1]\n        row = [1] + [prev[j - 1] + prev[j] for j in range(1, len(prev))] + [1]\n        tri.append(row)\n    return tri\n"
  }
},
  "merge-sorted-array-inplace": {
  "problemId": "merge-sorted-array-inplace",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Fill `nums1` from the back (`m + n - 1` down to `0`) by comparing the largest remaining elements of `nums1` and `nums2`.",
  "hints": [
    "Filling forward overwrites unread values in `nums1`.",
    "Filling backward writes into the empty trailing zeros first.",
    "Once `j < 0` (`nums2` exhausted), the remaining elements of `nums1` are already in place."
  ],
  "approachTitle": "Backward Three-Pointer Merge",
  "approachSteps": [
    "Set `i = m - 1`, `j = n - 1`, `k = m + n - 1`.",
    "While `j >= 0`, write the larger of `nums1[i]` (if `i >= 0`) and `nums2[j]` to `nums1[k]` and decrement pointers.",
    "Return `nums1`."
  ],
  "timeComplexity": "O(m + n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Always check `i >= 0` before reading `nums1[i]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def merge_sorted_array(nums1: list[int], m: int, nums2: list[int], n: int) -> list[int]:\n    i, j, k = m - 1, n - 1, m + n - 1\n    while j >= 0:\n        if i >= 0 and nums1[i] > nums2[j]:\n            nums1[k] = nums1[i]\n            i -= 1\n        else:\n            nums1[k] = nums2[j]\n            j -= 1\n        k -= 1\n    return nums1\n"
  }
},
  "intersection-of-two-arrays-ii": {
  "problemId": "intersection-of-two-arrays-ii",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Count frequencies in the smaller array using a hash map, then scan the larger array decrementing counts on each match.",
  "hints": [
    "Count the smaller array to minimize memory usage.",
    "For each `x` in the second array, if `counts[x] > 0`, append `x` and decrement `counts[x]`.",
    "Boundary edge cases & complexity: Decrement the count after each match so duplicates aren't over-emitted. Verify your solution strictly meets O(n + m) time and O(min(n, m)) space limits."
  ],
  "approachTitle": "Frequency Counter Intersection",
  "approachSteps": [
    "Build `counts = Counter(nums1)`.",
    "Iterate `x` in `nums2`: if `counts[x] > 0`, append `x` to `res` and decrement `counts[x]`.",
    "Return `res`."
  ],
  "timeComplexity": "O(n + m)",
  "spaceComplexity": "O(min(n, m))",
  "pitfalls": [
    "Decrement the count after each match so duplicates aren't over-emitted."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import Counter\n\ndef intersect_arrays(nums1: list[int], nums2: list[int]) -> list[int]:\n    if len(nums1) > len(nums2):\n        nums1, nums2 = nums2, nums1\n    counts = Counter(nums1)\n    res = []\n    for x in nums2:\n        if counts[x] > 0:\n            res.append(x)\n            counts[x] -= 1\n    return res\n"
  }
},
  "isomorphic-strings": {
  "problemId": "isomorphic-strings",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain two hash maps (`s -> t` and `t -> s`) to enforce a strict one-to-one bijection between characters.",
  "hints": [
    "A single forward map misses cases where two different characters in `s` map to the same character in `t` (e.g. `badc` vs `baba`).",
    "Check both `s_to_t` and `t_to_s` at every position.",
    "Boundary edge cases & complexity: Checking only `s -> t` fails when two distinct letters in `s` collide on one letter in `t`. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Bidirectional Hash Map Bijection",
  "approachSteps": [
    "Initialize `s2t = {}` and `t2s = {}`.",
    "For `a, b` in `zip(s, t)`: if `(a in s2t and s2t[a] != b)` or `(b in t2s and t2s[b] != a)`, return `False`.",
    "Store `s2t[a] = b` and `t2s[b] = a`; return `True`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Checking only `s -> t` fails when two distinct letters in `s` collide on one letter in `t`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def is_isomorphic(s: str, t: str) -> bool:\n    s2t, t2s = {}, {}\n    for a, b in zip(s, t):\n        if (a in s2t and s2t[a] != b) or (b in t2s and t2s[b] != a):\n            return False\n        s2t[a] = b\n        t2s[b] = a\n    return True\n"
  }
},
  "word-pattern": {
  "problemId": "word-pattern",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Split `s` into words, verify equal length with `pattern`, and enforce a bidirectional mapping between characters and words.",
  "hints": [
    "First check `len(words) == len(pattern)`.",
    "Use two dictionaries `c2w` and `w2c` to verify a bijection.",
    "Boundary edge cases & complexity: Don't forget to check that the number of words equals `len(pattern)`. Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Bidirectional Char-Word Map",
  "approachSteps": [
    "Split `s` into `words = s.split()`.",
    "If `len(words) != len(pattern)`, return `False`.",
    "Check and populate `c2w` and `w2c` for every `(ch, w)` pair."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Don't forget to check that the number of words equals `len(pattern)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def word_pattern(pattern: str, s: str) -> bool:\n    words = s.split()\n    if len(words) != len(pattern):\n        return False\n    c2w, w2c = {}, {}\n    for c, w in zip(pattern, words):\n        if (c in c2w and c2w[c] != w) or (w in w2c and w2c[w] != c):\n            return False\n        c2w[c] = w\n        w2c[w] = c\n    return True\n"
  }
},
  "ransom-note": {
  "problemId": "ransom-note",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Count character frequencies in `magazine` and verify every character in `ransom_note` has sufficient count.",
  "hints": [
    "If `len(ransom_note) > len(magazine)`, return `False` immediately.",
    "Count `magazine` letters and decrement as you scan `ransom_note`.",
    "Boundary edge cases & complexity: Check `< 0` after decrementing to catch missing letters. Verify your solution strictly meets O(n + m) time and O(1) space limits."
  ],
  "approachTitle": "Character Supply Counter",
  "approachSteps": [
    "Count letters in `magazine`.",
    "For each `ch` in `ransom_note`, decrement `counts[ch]`; if `< 0`, return `False`.",
    "Return `True`."
  ],
  "timeComplexity": "O(n + m)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Check `< 0` after decrementing to catch missing letters."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import Counter\n\ndef can_construct(ransom_note: str, magazine: str) -> bool:\n    return not (Counter(ransom_note) - Counter(magazine))\n"
  }
},
  "find-all-anagrams-in-a-string": {
  "problemId": "find-all-anagrams-in-a-string",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Slide a fixed-length window of size `len(p)` across `s`, maintaining a 26-element frequency array and comparing against `p`'s frequency array in O(26) = O(1) per step.",
  "hints": [
    "If `len(p) > len(s)`, return `[]`.",
    "Maintain two 26-element arrays `p_cnt` and `win_cnt`.",
    "Each step adds `s[i]` and removes `s[i - len(p)]`."
  ],
  "approachTitle": "Fixed-Width Frequency Sliding Window",
  "approachSteps": [
    "Build `p_cnt` and initial `win_cnt` for the first `len(p)` chars.",
    "Record index `0` if equal.",
    "Slide `i` from `len(p)` to `len(s) - 1`, updating counts and recording `i - len(p) + 1` on match."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Return `[]` early when `len(p) > len(s)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_anagrams(s: str, p: str) -> list[int]:\n    ns, np = len(s), len(p)\n    if np > ns:\n        return []\n    p_cnt = [0] * 26\n    w_cnt = [0] * 26\n    for ch in p:\n        p_cnt[ord(ch) - 97] += 1\n    for i in range(np):\n        w_cnt[ord(s[i]) - 97] += 1\n    res = [0] if w_cnt == p_cnt else []\n    for i in range(np, ns):\n        w_cnt[ord(s[i]) - 97] += 1\n        w_cnt[ord(s[i - np]) - 97] -= 1\n        if w_cnt == p_cnt:\n            res.append(i - np + 1)\n    return res\n"
  }
},
  "permutation-in-string": {
  "problemId": "permutation-in-string",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Slide a window of size `len(s1)` across `s2` comparing 26-letter frequency arrays and return `True` on the first match.",
  "hints": [
    "A permutation of `s1` has the exact same length and character counts as `s1`.",
    "Return `False` immediately if `len(s1) > len(s2)`.",
    "Boundary edge cases & complexity: Check the initial window at index 0 before sliding. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Fixed-Size Frequency Window",
  "approachSteps": [
    "Count `s1` and the first `len(s1)` chars of `s2`.",
    "Slide across `s2` updating entering/leaving counts.",
    "Return `True` if counts match, else `False`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Check the initial window at index 0 before sliding."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def check_inclusion(s1: str, s2: str) -> bool:\n    n1, n2 = len(s1), len(s2)\n    if n1 > n2:\n        return False\n    c1, c2 = [0] * 26, [0] * 26\n    for ch in s1:\n        c1[ord(ch) - 97] += 1\n    for i in range(n1):\n        c2[ord(s2[i]) - 97] += 1\n    if c1 == c2:\n        return True\n    for i in range(n1, n2):\n        c2[ord(s2[i]) - 97] += 1\n        c2[ord(s2[i - n1]) - 97] -= 1\n        if c1 == c2:\n            return True\n    return False\n"
  }
},
  "max-consecutive-ones-iii": {
  "problemId": "max-consecutive-ones-iii",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a sliding window containing at most `k` zeros; shrink the left boundary whenever `zeros > k`.",
  "hints": [
    "Rephrase: find the longest subarray with at most `k` zeros.",
    "Increment `zeros` when `nums[r] == 0`, decrement when `nums[l] == 0`.",
    "Boundary edge cases & complexity: Handle `k == 0` naturally with `while zeros > k`. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Zero-Budget Sliding Window",
  "approachSteps": [
    "Initialize `l = 0`, `zeros = 0`, `best = 0`.",
    "Expand `r`: if `nums[r] == 0`, increment `zeros`.",
    "While `zeros > k`, decrement `zeros` if `nums[l] == 0` and increment `l`.",
    "Update `best = max(best, r - l + 1)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle `k == 0` naturally with `while zeros > k`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def longest_ones(nums: list[int], k: int) -> int:\n    l = zeros = best = 0\n    for r, x in enumerate(nums):\n        if x == 0:\n            zeros += 1\n        while zeros > k:\n            if nums[l] == 0:\n                zeros -= 1\n            l += 1\n        if r - l + 1 > best:\n            best = r - l + 1\n    return best\n"
  }
},
  "fruit-into-baskets": {
  "problemId": "fruit-into-baskets",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Find the longest subarray with at most 2 distinct values using a sliding window and a frequency map.",
  "hints": [
    "Track counts of each fruit type inside `[l.r]`.",
    "When `len(counts) > 2`, decrement `counts[fruits[l]]`, delete the key if it hits `0`, and increment `l`.",
    "Boundary edge cases & complexity: Delete keys whose count drops to `0` so `len(counts)` accurately reflects distinct types. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "At-Most-2-Distinct Sliding Window",
  "approachSteps": [
    "Initialize `counts = {}`, `l = 0`, `best = 0`.",
    "Expand `r` adding `fruits[r]` to `counts`.",
    "While `len(counts) > 2`, remove `fruits[l]` and advance `l`.",
    "Update `best = max(best, r - l + 1)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Delete keys whose count drops to `0` so `len(counts)` accurately reflects distinct types."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict\n\ndef total_fruit(fruits: list[int]) -> int:\n    counts = defaultdict(int)\n    l = best = 0\n    for r, f in enumerate(fruits):\n        counts[f] += 1\n        while len(counts) > 2:\n            left_f = fruits[l]\n            counts[left_f] -= 1\n            if counts[left_f] == 0:\n                del counts[left_f]\n            l += 1\n        best = max(best, r - l + 1)\n    return best\n"
  }
},
  "subarray-product-less-than-k": {
  "problemId": "subarray-product-less-than-k",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Since all elements are positive, maintain a sliding window whose product is `< k`; at each `r`, exactly `r - l + 1` new valid subarrays end at `r`.",
  "hints": [
    "If `k <= 1`, no positive product can be strictly less than `k`, so return `0`.",
    "Divide out `nums[l]` while `prod >= k`.",
    "Add `r - l + 1` to the answer for each `r`."
  ],
  "approachTitle": "Multiplicative Sliding Window",
  "approachSteps": [
    "If `k <= 1`, return `0`.",
    "Set `prod = 1`, `l = 0`, `ans = 0`.",
    "Multiply `prod *= nums[r]`, divide out `nums[l]` while `prod >= k`, and add `r - l + 1`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle `k <= 1` early to prevent `l` advancing past `r`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def num_subarray_product_less_than_k(nums: list[int], k: int) -> int:\n    if k <= 1:\n        return 0\n    prod = 1\n    l = ans = 0\n    for r, x in enumerate(nums):\n        prod *= x\n        while prod >= k:\n            prod //= nums[l]\n            l += 1\n        ans += r - l + 1\n    return ans\n"
  }
},
  "boats-to-save-people": {
  "problemId": "boats-to-save-people",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort weights and greedily pair the heaviest remaining person with the lightest remaining person whenever their sum is `<= limit`.",
  "hints": [
    "Each boat holds at most 2 people.",
    "If the lightest person cannot pair with the heaviest, nobody else can pair with the heaviest either.",
    "Always board the heaviest person `r`, and also board `l` if `people[l] + people[r] <= limit`."
  ],
  "approachTitle": "Sorted Lightest-Heaviest Pairing",
  "approachSteps": [
    "Sort `people` ascending.",
    "Set `l = 0`, `r = len(people) - 1`, `boats = 0`.",
    "While `l <= r`: if `people[l] + people[r] <= limit`, `l += 1`; always `r -= 1` and `boats += 1`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Use `l <= r` so a single remaining middle person gets a boat."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def num_rescue_boats(people: list[int], limit: int) -> int:\n    people.sort()\n    l, r = 0, len(people) - 1\n    boats = 0\n    while l <= r:\n        if people[l] + people[r] <= limit:\n            l += 1\n        r -= 1\n        boats += 1\n    return boats\n"
  }
},
  "backspace-string-compare": {
  "problemId": "backspace-string-compare",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Scan both strings backward skipping characters canceled by `'#'` to compare in O(1) space (or build final stacks).",
  "hints": [
    "Iterating in reverse tells you immediately how many upcoming characters must be skipped.",
    "Maintain a `skip` counter for each string.",
    "Compare the next surviving characters from right to left."
  ],
  "approachTitle": "Reverse Two-Pointer Skip",
  "approachSteps": [
    "Define generator yielding surviving characters from right to left.",
    "Compare pairs from both generators using `zip_longest`."
  ],
  "timeComplexity": "O(n + m)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Backspacing on an empty editor simply leaves it empty."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from itertools import zip_longest\n\ndef backspace_compare(s: str, t: str) -> bool:\n    def gen(st: str):\n        skip = 0\n        for ch in reversed(st):\n            if ch == '#':\n                skip += 1\n            elif skip > 0:\n                skip -= 1\n            else:\n                yield ch\n    return all(a == b for a, b in zip_longest(gen(s), gen(t)))\n"
  }
},
  "roman-to-integer": {
  "problemId": "roman-to-integer",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Scan left-to-right: if the current symbol has a smaller value than the next symbol, subtract it; otherwise add it.",
  "hints": [
    "Subtractive pairs like `IV`, `IX`, `XL`, `CM` always have `val[i] < val[i + 1]`.",
    "All other symbols simply add to the total.",
    "Boundary edge cases & complexity: Guard `i + 1 < len(s)` before inspecting the next character. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Lookahead Subtractive Scan",
  "approachSteps": [
    "Map `'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000`.",
    "For each index `i`, subtract `val[s[i]]` if `i + 1 < n and val[s[i]] < val[s[i + 1]]`, else add it."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Guard `i + 1 < len(s)` before inspecting the next character."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def roman_to_int(s: str) -> int:\n    vals = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}\n    total = 0\n    for i, ch in enumerate(s):\n        if i + 1 < len(s) and vals[ch] < vals[s[i + 1]]:\n            total -= vals[ch]\n        else:\n            total += vals[ch]\n    return total\n"
  }
},
  "integer-to-roman": {
  "problemId": "integer-to-roman",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Include the 6 subtractive tokens (`CM`, `CD`, `XC`, `XL`, `IX`, `IV`) in a descending lookup table and greedily emit the largest value fitting into `num`.",
  "hints": [
    "There are 13 canonical Roman tokens from 1000 down to 1.",
    "Use `count, num = divmod(num, val)` for each token.",
    "Boundary edge cases & complexity: Include all 6 subtractive pairs in strictly descending order. Verify your solution strictly meets O(1) time and O(1) space limits."
  ],
  "approachTitle": "Greedy Value-Token Decomposition",
  "approachSteps": [
    "Define descending `(value, symbol)` table of 13 entries.",
    "For each `(v, sym)`, append `sym * (num // v)` and update `num %= v`.",
    "Join and return."
  ],
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Include all 6 subtractive pairs in strictly descending order."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def int_to_roman(num: int) -> str:\n    table = [\n        (1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'),\n        (100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'),\n        (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')\n    ]\n    out = []\n    for v, sym in table:\n        if num == 0:\n            break\n        cnt, num = divmod(num, v)\n        if cnt:\n            out.append(sym * cnt)\n    return \"\".join(out)\n"
  }
},
  "multiply-strings": {
  "problemId": "multiply-strings",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Allocate a digit array of length `m + n`; the product of digits at `i` and `j` contributes directly to positions `i + j + 1` (ones) and `i + j` (carry).",
  "hints": [
    "The product of an `m`-digit and `n`-digit number has at most `m + n` digits.",
    "Iterate `i` and `j` backward so carries propagate cleanly.",
    "Strip leading zeros, returning `\"0\"` if either input is `\"0\"`."
  ],
  "approachTitle": "Grade-School Positional Digit Array",
  "approachSteps": [
    "If `num1 == '0'` or `num2 == '0'`, return `'0'`.",
    "Initialize `pos = [0] * (m + n)`.",
    "For `i` from `m-1` down to `0` and `j` from `n-1` down to `0`, add `d1 * d2 + pos[i + j + 1]` and split into `pos[i + j + 1]` and `pos[i + j]`.",
    "Strip leading zeros and join."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m + n)",
  "pitfalls": [
    "Strip leading zeros carefully without emptying `\"0\"`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def multiply_strings(num1: str, num2: str) -> str:\n    if num1 == '0' or num2 == '0':\n        return '0'\n    m, n = len(num1), len(num2)\n    pos = [0] * (m + n)\n    for i in range(m - 1, -1, -1):\n        d1 = ord(num1[i]) - 48\n        for j in range(n - 1, -1, -1):\n            d2 = ord(num2[j]) - 48\n            total = d1 * d2 + pos[i + j + 1]\n            pos[i + j + 1] = total % 10\n            pos[i + j] += total // 10\n    start = 0\n    while start < len(pos) - 1 and pos[start] == 0:\n        start += 1\n    return \"\".join(str(d) for d in pos[start:])\n"
  }
},
  "add-binary": {
  "problemId": "add-binary",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Walk both strings from right to left summing bit values plus `carry`, emitting `total % 2`, and reversing the collected bits.",
  "hints": [
    "Process from least-significant bit (end of string) backward.",
    "Continue while `i >= 0 or j >= 0 or carry`.",
    "Boundary edge cases & complexity: Do not forget the final carry bit when both strings end. Verify your solution strictly meets O(max(n, m)) time and O(max(n, m)) space limits."
  ],
  "approachTitle": "Right-to-Left Binary Carry Addition",
  "approachSteps": [
    "Set `i = len(a) - 1`, `j = len(b) - 1`, `carry = 0`, `out = []`.",
    "Loop summing available bits and `carry`, append `str(s & 1)`, set `carry = s >> 1`.",
    "Reverse and join `out`."
  ],
  "timeComplexity": "O(max(n, m))",
  "spaceComplexity": "O(max(n, m))",
  "pitfalls": [
    "Do not forget the final carry bit when both strings end."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def add_binary(a: str, b: str) -> str:\n    i, j, carry = len(a) - 1, len(b) - 1, 0\n    out = []\n    while i >= 0 or j >= 0 or carry:\n        s = carry\n        if i >= 0:\n            s += a[i] == '1'\n            i -= 1\n        if j >= 0:\n            s += b[j] == '1'\n            j -= 1\n        out.append(str(s & 1))\n        carry = s >> 1\n    return \"\".join(reversed(out))\n"
  }
},
  "string-compression": {
  "problemId": "string-compression",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use read and write pointers to measure each run of identical characters, writing the character and each digit of `str(count)` when `count > 1`.",
  "hints": [
    "Counts >= 10 must be split into individual character digits (`'1'`, `'2'`).",
    "Write pointer never overtakes read pointer.",
    "Boundary edge cases & complexity: Split multi-digit counts into separate single-character elements. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "In-Place Run-Length Encoding",
  "approachSteps": [
    "Initialize `write = 0`, `read = 0`.",
    "Measure run `end` where `chars[end] == chars[read]`.",
    "Write `chars[read]` and digits of `end - read` if `> 1`; advance `read = end`.",
    "Return `chars[:write]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Split multi-digit counts into separate single-character elements."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def compress_chars(chars: list[str]) -> list[str]:\n    write = read = 0\n    n = len(chars)\n    while read < n:\n        ch = chars[read]\n        end = read\n        while end < n and chars[end] == ch:\n            end += 1\n        chars[write] = ch\n        write += 1\n        cnt = end - read\n        if cnt > 1:\n            for d in str(cnt):\n                chars[write] = d\n                write += 1\n        read = end\n    return chars[:write]\n"
  }
},
  "remove-k-digits": {
  "problemId": "remove-k-digits",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a monotonic increasing digit stack: pop larger previous digits while `k > 0`, trim any remaining `k` digits from the end, and strip leading zeros.",
  "hints": [
    "Removing a larger digit to the left of a smaller digit always reduces the number.",
    "If digits are already non-decreasing, remove the remaining `k` digits from the right.",
    "Return `\"0\"` if stripping leading zeros leaves an empty string."
  ],
  "approachTitle": "Greedy Monotonic Increasing Stack",
  "approachSteps": [
    "Initialize empty `stack`.",
    "For each digit `d` in `num`: while `k > 0 and stack and stack[-1] > d`, pop and decrement `k`; push `d`.",
    "If `k > 0`, slice `stack = stack[:-k]`.",
    "Strip leading `'0'`s and return `res or '0'`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Handle leftover `k > 0` (e.g. `num = '112', k = 1`) and all-zero outcomes."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def remove_k_digits(num: str, k: int) -> str:\n    stack = []\n    for d in num:\n        while k > 0 and stack and stack[-1] > d:\n            stack.pop()\n            k -= 1\n        stack.append(d)\n    if k > 0:\n        stack = stack[:-k]\n    res = \"\".join(stack).lstrip('0')\n    return res if res else '0'\n"
  }
},
  "online-stock-span": {
  "problemId": "online-stock-span",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a decreasing monotonic stack of `(price, span)` pairs, absorbing spans of all popped elements `<= current price`.",
  "hints": [
    "Store `(price, span)` on a stack.",
    "While `stack and stack[-1][0] <= price`, add `stack.pop()[1]` to `span`.",
    "Boundary edge cases & complexity: Use `<=` because equal prices count toward the span. Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Monotonic Decreasing Span Stack",
  "approachSteps": [
    "Initialize `stack = []` and `res = []`.",
    "For each `p`, start `span = 1`; while `stack and stack[-1][0] <= p`, `span += stack.pop()[1]`.",
    "Push `(p, span)` and append `span` to `res`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Use `<=` because equal prices count toward the span."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def stock_span(prices: list[int]) -> list[int]:\n    stack = []\n    res = []\n    for p in prices:\n        span = 1\n        while stack and stack[-1][0] <= p:\n            span += stack.pop()[1]\n        stack.append((p, span))\n        res.append(span)\n    return res\n"
  }
},
  "sum-of-subarray-minimums": {
  "problemId": "sum-of-subarray-minimums",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use a monotonic increasing stack to compute each element's contribution `arr[mid] * (mid - left) * (right - mid)` using strict `<` on one side and `<=` on the other to avoid double-counting duplicates.",
  "hints": [
    "Each element `arr[mid]` is the minimum of `(mid - prev_smaller) * (next_smaller_or_eq - mid)` subarrays.",
    "Append a sentinel `0` at the end to flush all elements.",
    "Take modulo `10^9 + 7`."
  ],
  "approachTitle": "Contribution Technique + Monotonic Stack",
  "approachSteps": [
    "Initialize `stack = []`, `ans = 0`, `MOD = 10**9 + 7`.",
    "Iterate `i, x` over `enumerate(arr + [0])`.",
    "While `stack and arr[stack[-1]] >= x`, pop `mid`, set `left = stack[-1] if stack else -1`, and add `arr[mid] * (mid - left) * (i - mid)`.",
    "Return `ans % MOD`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Use `>=` when popping so duplicate values are uniquely owned by one boundary."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def sum_subarray_mins(arr: list[int]) -> int:\n    MOD = 10**9 + 7\n    stack = []\n    ans = 0\n    for i, x in enumerate(arr + [0]):\n        while stack and arr[stack[-1]] >= x:\n            mid = stack.pop()\n            left = stack[-1] if stack else -1\n            ans = (ans + arr[mid] * (mid - left) * (i - mid)) % MOD\n        stack.append(i)\n    return ans\n"
  }
},
  "maximal-rectangle": {
  "problemId": "maximal-rectangle",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Build a running column-height histogram row by row and apply the O(cols) monotonic stack Largest Rectangle in Histogram algorithm to each row.",
  "hints": [
    "For each row, `heights[c] = heights[c] + 1` if `matrix[r][c] == '1'` else `0`.",
    "Run Largest Rectangle in Histogram on `heights` after each row.",
    "Boundary edge cases & complexity: Reset `heights[c] = 0` whenever a `'0'` cell is encountered. Verify your solution strictly meets O(rows * cols) time and O(cols) space limits."
  ],
  "approachTitle": "Row-by-Row Histogram Monotonic Stack",
  "approachSteps": [
    "Initialize `heights = [0] * (cols + 1)` (trailing 0 sentinel) and `best = 0`.",
    "For each row, update `heights[0..cols-1]`.",
    "Run monotonic increasing stack over `heights` updating `best`."
  ],
  "timeComplexity": "O(rows * cols)",
  "spaceComplexity": "O(cols)",
  "pitfalls": [
    "Reset `heights[c] = 0` whenever a `'0'` cell is encountered."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def maximal_rectangle(matrix: list[list[str]]) -> int:\n    if not matrix:\n        return 0\n    cols = len(matrix[0])\n    heights = [0] * (cols + 1)\n    best = 0\n    for row in matrix:\n        for c in range(cols):\n            heights[c] = heights[c] + 1 if row[c] == '1' else 0\n        stack = []\n        for i, h in enumerate(heights):\n            while stack and heights[stack[-1]] > h:\n                height = heights[stack.pop()]\n                width = i if not stack else i - stack[-1] - 1\n                best = max(best, height * width)\n            stack.append(i)\n    return best\n"
  }
},
  "basic-calculator-parentheses": {
  "problemId": "basic-calculator-parentheses",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain running `res`, `num`, and `sign`, pushing `(res, sign)` onto a stack on `'('` and combining on `')'`.",
  "hints": [
    "Unary minus works naturally because `res` starts at `0` before `'-'`.",
    "On `'('`, save `(res, sign)` and reset `res = 0, sign = 1`.",
    "On `')'`, flush `num`, multiply by popped `sign`, and add popped `res`."
  ],
  "approachTitle": "Parenthesis-Scope Stack Evaluator",
  "approachSteps": [
    "Initialize `stack = []`, `res = 0`, `num = 0`, `sign = 1`.",
    "Process digits, `+`, `-`, `(`, `)` updating `res` and `stack`.",
    "Return `res + sign * num`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Flush the last `num` after the loop ends."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def calculate_expr(s: str) -> int:\n    stack = []\n    res = num = 0\n    sign = 1\n    for ch in s:\n        if ch.isdigit():\n            num = num * 10 + int(ch)\n        elif ch == '+':\n            res += sign * num\n            num = 0\n            sign = 1\n        elif ch == '-':\n            res += sign * num\n            num = 0\n            sign = -1\n        elif ch == '(':\n            stack.append((res, sign))\n            res = 0\n            sign = 1\n        elif ch == ')':\n            res += sign * num\n            num = 0\n            prev_res, prev_sign = stack.pop()\n            res = prev_res + prev_sign * res\n    return res + sign * num\n"
  }
},
  "implement-queue-using-stacks": {
  "problemId": "implement-queue-using-stacks",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Push new elements onto `in_stack`, and lazily pour `in_stack` into `out_stack` only when `out_stack` is empty during `pop` or `peek`.",
  "hints": [
    "Moving an element from `in_stack` to `out_stack` reverses its order into FIFO.",
    "Each element is pushed/popped at most twice, giving amortized O(1) time.",
    "Boundary edge cases & complexity: Never pour `in_s` into `out_s` while `out_s` still has elements. Verify your solution strictly meets O(1) amortized time and O(n) space limits."
  ],
  "approachTitle": "Lazy Two-Stack Pour",
  "approachSteps": [
    "Maintain `in_s` and `out_s`.",
    "On `push(x)`, append to `in_s`.",
    "On `pop`/`peek`, if `out_s` is empty pour all of `in_s` into `out_s`, then pop/peek `out_s`.",
    "On `empty`, check `not in_s and not out_s`."
  ],
  "timeComplexity": "O(1) amortized",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Never pour `in_s` into `out_s` while `out_s` still has elements."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def run_two_stack_queue(ops: list[list]) -> list:\n    in_s, out_s, res = [], [], []\n    def pour():\n        if not out_s:\n            while in_s:\n                out_s.append(in_s.pop())\n    for op in ops:\n        if op[0] == 'push':\n            in_s.append(op[1])\n        elif op[0] == 'pop':\n            pour()\n            res.append(out_s.pop())\n        elif op[0] == 'peek':\n            pour()\n            res.append(out_s[-1])\n        elif op[0] == 'empty':\n            res.append(not in_s and not out_s)\n    return res\n"
  }
},
  "remove-all-adjacent-duplicates": {
  "problemId": "remove-all-adjacent-duplicates",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use a character stack: if the top matches the incoming character, pop it; otherwise push.",
  "hints": [
    "A stack automatically exposes newly adjacent characters after a cancellation.",
    "Join the stack at the end.",
    "Boundary edge cases & complexity: Only remove pairs (2 identical characters), not all 3 of `'aaa'` (which becomes `'a'`). Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Adjacent-Cancellation Stack",
  "approachSteps": [
    "Initialize empty `stack`.",
    "For each `ch` in `s`: if `stack and stack[-1] == ch`, pop; else append `ch`.",
    "Return `''.join(stack)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Only remove pairs (2 identical characters), not all 3 of `'aaa'` (which becomes `'a'`)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def remove_duplicates_str(s: str) -> str:\n    stack = []\n    for ch in s:\n        if stack and stack[-1] == ch:\n            stack.pop()\n        else:\n            stack.append(ch)\n    return \"\".join(stack)\n"
  }
},
  "minimum-remove-to-make-valid-parentheses": {
  "problemId": "minimum-remove-to-make-valid-parentheses",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track indices of unmatched `'('` on a stack and record indices of unmatched `')'` in a removal set, then rebuild the string omitting all marked indices.",
  "hints": [
    "Store index `i` on the stack for every `'('`.",
    "If `')'` sees an empty stack, add `i` to `remove`; otherwise pop a matching `'('`.",
    "Any indices left in the stack at the end are unmatched `'('` and also go into `remove`."
  ],
  "approachTitle": "Index-Stack Unmatched Marking",
  "approachSteps": [
    "Initialize `stack = []` and `remove = set()`.",
    "Scan `s` pushing `'('` indices, popping on matched `')'`, or marking unmatched `')'`.",
    "Union remaining `stack` into `remove` and join surviving characters."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Convert `remove` to a set so membership checks during reconstruction are O(1)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_remove_to_make_valid(s: str) -> str:\n    stack = []\n    remove = set()\n    for i, ch in enumerate(s):\n        if ch == '(':\n            stack.append(i)\n        elif ch == ')':\n            if stack:\n                stack.pop()\n            else:\n                remove.add(i)\n    remove.update(stack)\n    return \"\".join(ch for i, ch in enumerate(s) if i not in remove)\n"
  }
},
  "score-of-parentheses": {
  "problemId": "score-of-parentheses",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Every core pair `\"()\"` at nesting depth `d` contributes `2^d` to the total score; sum `1 << depth` whenever `s[i - 1:i + 1] == '()'`. ",
  "hints": [
    "Distributing `2 * (A + B)` gives `2A + 2B`, so only innermost `()` cores contribute weight.",
    "Track nesting `depth`: increment on `'('`, decrement on `')'`.",
    "When `s[i] == ')'` and `s[i - 1] == '('`, add `1 << depth`."
  ],
  "approachTitle": "Depth-Weighted Core Counting",
  "approachSteps": [
    "Initialize `depth = 0`, `score = 0`.",
    "Iterate `i, ch` over `enumerate(s)`: increment `depth` on `'('`; on `')'`, decrement `depth` and if `s[i - 1] == '('`, add `1 << depth`.",
    "Return `score`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Decrement `depth` BEFORE computing `1 << depth` so top-level `\"()\"` adds `1 << 0 = 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def score_of_parentheses(s: str) -> int:\n    depth = score = 0\n    for i, ch in enumerate(s):\n        if ch == '(':\n            depth += 1\n        else:\n            depth -= 1\n            if s[i - 1] == '(':\n                score += 1 << depth\n    return score\n"
  }
},
  "palindrome-linked-list": {
  "problemId": "palindrome-linked-list",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Find the midpoint with fast/slow pointers, reverse the second half in-place, and compare both halves node by node.",
  "hints": [
    "Slow/fast pointers locate the middle in O(n) time.",
    "Reverse the second half to compare in O(1) space.",
    "Boundary edge cases & complexity: Odd-length lists have a middle node that does not need to match anything. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Midpoint Reverse and Compare",
  "approachSteps": [
    "Compare elements symmetrically from both ends (or reverse second half of linked list).",
    "Return `True` iff all mirrored pairs match."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Odd-length lists have a middle node that does not need to match anything."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def is_palindrome_list(values: list[int]) -> bool:\n    return values == values[::-1]\n"
  }
},
  "middle-of-the-linked-list": {
  "problemId": "middle-of-the-linked-list",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Advance `slow` by 1 and `fast` by 2 until `fast` reaches the end; `slow` lands at index `len // 2`.",
  "hints": [
    "When `fast` moves twice as fast as `slow`, `slow` is halfway when `fast` finishes.",
    "For even length `2k`, index `k` is the second middle node.",
    "Boundary edge cases & complexity: Check `fast and fast.next` in the loop condition. Verify your solution strictly meets O(n) time and O(1) auxiliary space limits."
  ],
  "approachTitle": "Fast and Slow Pointers",
  "approachSteps": [
    "Compute midpoint index `len(values) // 2` via slow/fast traversal.",
    "Return the suffix starting at that node."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Check `fast and fast.next` in the loop condition."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def middle_node(values: list[int]) -> list[int]:\n    return values[len(values) // 2:]\n"
  }
},
  "remove-duplicates-from-sorted-list": {
  "problemId": "remove-duplicates-from-sorted-list",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Walk through the sorted list skipping any node whose value equals the previous kept node.",
  "hints": [
    "Because the list is sorted, duplicates are always adjacent.",
    "Only advance `curr` when `curr.next.val != curr.val`.",
    "Boundary edge cases & complexity: Handle empty list without raising IndexError. Verify your solution strictly meets O(n) time and O(1) auxiliary space limits."
  ],
  "approachTitle": "Adjacent Duplicate Skip",
  "approachSteps": [
    "Initialize `res = []`.",
    "For each `v` in `values`, append `v` if `not res or res[-1] != v`.",
    "Return `res`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Handle empty list without raising IndexError."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def delete_duplicates(values: list[int]) -> list[int]:\n    res = []\n    for v in values:\n        if not res or res[-1] != v:\n            res.append(v)\n    return res\n"
  }
},
  "odd-even-linked-list": {
  "problemId": "odd-even-linked-list",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain separate `odd` and `even` pointer chains and attach `even_head` to the tail of the `odd` chain.",
  "hints": [
    "Grouping is by node index (1st, 3rd, 5th.), NOT by node value parity.",
    "Save `even_head = head.next` before rewiring.",
    "Boundary edge cases & complexity: Do not group by `val % 2`; group by position. Verify your solution strictly meets O(n) time and O(1) auxiliary space limits."
  ],
  "approachTitle": "Dual Odd/Even Pointer Chains",
  "approachSteps": [
    "Collect indices `0, 2, 4, ...` followed by `1, 3, 5, ...`.",
    "Return concatenated list."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Do not group by `val % 2`; group by position."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def odd_even_list(values: list[int]) -> list[int]:\n    return values[0::2] + values[1::2]\n"
  }
},
  "swap-nodes-in-pairs": {
  "problemId": "swap-nodes-in-pairs",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Step through the list two nodes at a time, swapping adjacent pairs `(i, i + 1)` while `i + 1 < n`.",
  "hints": [
    "Use a dummy node when rewiring linked list pointers so `prev.next` updates cleanly.",
    "Leave the last node untouched if length is odd.",
    "Boundary edge cases & complexity: Stop at `len(res) - 1` so an odd final element does not trigger IndexError. Verify your solution strictly meets O(n) time and O(1) auxiliary space limits."
  ],
  "approachTitle": "Iterative Pairwise Swap",
  "approachSteps": [
    "Copy `values` to `res`.",
    "For `i` in `range(0, len(res) - 1, 2)`, swap `res[i], res[i + 1]`.",
    "Return `res`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Stop at `len(res) - 1` so an odd final element does not trigger IndexError."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def swap_pairs(values: list[int]) -> list[int]:\n    res = list(values)\n    for i in range(0, len(res) - 1, 2):\n        res[i], res[i + 1] = res[i + 1], res[i]\n    return res\n"
  }
},
  "rotate-linked-list": {
  "problemId": "rotate-linked-list",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Connect tail to head to form a ring, reduce `k %= n`, and break the ring after `n - k` nodes.",
  "hints": [
    "Always handle empty lists before computing `k % n`.",
    "Rotating right by `k % n` moves the last `k % n` nodes to the front.",
    "Boundary edge cases & complexity: Modulo by zero occurs if you don't guard `not values`. Verify your solution strictly meets O(n) time and O(1) auxiliary space limits."
  ],
  "approachTitle": "Circular Tail-to-Head Cut",
  "approachSteps": [
    "If `not values`, return `[]`.",
    "Compute `k %= len(values)`.",
    "If `k == 0`, return `values`; else return `values[-k:] + values[:-k]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Modulo by zero occurs if you don't guard `not values`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def rotate_list(values: list[int], k: int) -> list[int]:\n    if not values:\n        return []\n    k %= len(values)\n    return values[-k:] + values[:-k] if k else list(values)\n"
  }
},
  "partition-linked-list": {
  "problemId": "partition-linked-list",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Build two dummy-headed lists (`before` for `< x` and `after` for `>= x`), then link `before.tail -> after.head`.",
  "hints": [
    "Preserve relative order inside both partitions.",
    "In pointer-based linked lists, remember to set `after_tail.next = None` to prevent a cycle.",
    "Boundary edge cases & complexity: Nodes equal to `x` belong to the second (`>= x`) partition. Verify your solution strictly meets O(n) time and O(1) auxiliary space limits."
  ],
  "approachTitle": "Two-Bucket Stable Partition",
  "approachSteps": [
    "Partition elements into `less` (`v < x`) and `ge` (`v >= x`).",
    "Return `less + ge`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Nodes equal to `x` belong to the second (`>= x`) partition."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def partition_list(values: list[int], x: int) -> list[int]:\n    return [v for v in values if v < x] + [v for v in values if v >= x]\n"
  }
},
  "sort-linked-list": {
  "problemId": "sort-linked-list",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Split the list at its midpoint recursively and merge the two sorted halves in linear time.",
  "hints": [
    "Merge sort guarantees O(n log n) worst-case time on linked lists.",
    "Base case is a list of length `<= 1`.",
    "Boundary edge cases & complexity: On linked lists, disconnect the left half's tail (`prev.next = None`) before recursing. Verify your solution strictly meets O(n log n) time and O(log n) recursion space limits."
  ],
  "approachTitle": "Top-Down Merge Sort",
  "approachSteps": [
    "If `len(arr) <= 1`, return `arr`.",
    "Recursively sort left half and right half.",
    "Merge the two sorted halves."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(log n) recursion",
  "pitfalls": [
    "On linked lists, disconnect the left half's tail (`prev.next = None`) before recursing."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def sort_list(values: list[int]) -> list[int]:\n    if len(values) <= 1:\n        return list(values)\n    mid = len(values) // 2\n    left = sort_list(values[:mid])\n    right = sort_list(values[mid:])\n    res = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            res.append(left[i]); i += 1\n        else:\n            res.append(right[j]); j += 1\n    res.extend(left[i:])\n    res.extend(right[j:])\n    return res\n"
  }
},
  "search-insert-position": {
  "problemId": "search-insert-position",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Find the first index `l` where `nums[l] >= target` (lower bound) using binary search on `[0, len(nums)]`.",
  "hints": [
    "Set `r = len(nums)` so targets greater than all elements can return `len(nums)`.",
    "Shrink `[l, r)` until `l == r`.",
    "Boundary edge cases & complexity: Upper bound must include `len(nums)` for insertion after the last element. Verify your solution strictly meets O(log n) time and O(1) space limits."
  ],
  "approachTitle": "Lower-Bound Binary Search",
  "approachSteps": [
    "Set `l = 0`, `r = len(nums)`.",
    "While `l < r`, compute `mid = (l + r) // 2`; if `nums[mid] < target`, `l = mid + 1`; else `r = mid`.",
    "Return `l`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Upper bound must include `len(nums)` for insertion after the last element."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def search_insert(nums: list[int], target: int) -> int:\n    l, r = 0, len(nums)\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] < target:\n            l = mid + 1\n        else:\n            r = mid\n    return l\n"
  }
},
  "sqrt-x-integer": {
  "problemId": "sqrt-x-integer",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Binary search for the largest integer `mid` in `[0, x]` satisfying `mid * mid <= x`.",
  "hints": [
    "If `x < 2`, return `x` directly.",
    "Binary search in `[1, x // 2]` comparing `mid * mid` with `x`.",
    "Boundary edge cases & complexity: In 32-bit languages, compare `mid <= x / mid` instead of `mid * mid <= x` to avoid overflow. Verify your solution strictly meets O(log x) time and O(1) space limits."
  ],
  "approachTitle": "Monotonic Square Binary Search",
  "approachSteps": [
    "If `x < 2`, return `x`.",
    "Set `l = 1`, `r = x // 2`.",
    "While `l <= r`, compute `mid`; if `mid * mid <= x`, `l = mid + 1`; else `r = mid - 1`.",
    "Return `r`."
  ],
  "timeComplexity": "O(log x)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "In 32-bit languages, compare `mid <= x / mid` instead of `mid * mid <= x` to avoid overflow."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def my_sqrt(x: int) -> int:\n    if x < 2:\n        return x\n    l, r = 1, x // 2\n    while l <= r:\n        mid = (l + r) // 2\n        sq = mid * mid\n        if sq == x:\n            return mid\n        if sq < x:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return r\n"
  }
},
  "find-peak-element": {
  "problemId": "find-peak-element",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Compare `nums[mid]` with `nums[mid + 1]`: always climb uphill (`l = mid + 1` if rising, `r = mid` if falling) until `l == r`.",
  "hints": [
    "If `nums[mid] < nums[mid + 1]`, a peak is guaranteed to exist on the right side.",
    "Otherwise a peak is guaranteed on the left side including `mid`.",
    "Boundary edge cases & complexity: Because `l < r`, `mid + 1` is always strictly in bounds. Verify your solution strictly meets O(log n) time and O(1) space limits."
  ],
  "approachTitle": "Uphill Slope Binary Search",
  "approachSteps": [
    "Set `l = 0`, `r = len(nums) - 1`.",
    "While `l < r`, compute `mid = (l + r) // 2`; if `nums[mid] < nums[mid + 1]`, `l = mid + 1`; else `r = mid`.",
    "Return `l`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Because `l < r`, `mid + 1` is always strictly in bounds."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_peak_element(nums: list[int]) -> int:\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] < nums[mid + 1]:\n            l = mid + 1\n        else:\n            r = mid\n    return l\n"
  }
},
  "capacity-to-ship-packages-within-d-days": {
  "problemId": "capacity-to-ship-packages-within-d-days",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Binary search the ship capacity in `[max(weights), sum(weights)]`, greedily packing each day up to `mid` to count required days.",
  "hints": [
    "Capacity must be at least `max(weights)` so the heaviest single package fits.",
    "Greedy linear packing checks feasibility in O(n).",
    "Boundary edge cases & complexity: Initialize `needed = 1` (the first day) before scanning `weights`. Verify your solution strictly meets O(n log(sum(weights))) time and O(1) space limits."
  ],
  "approachTitle": "Binary Search on Capacity",
  "approachSteps": [
    "Set `l = max(weights)`, `r = sum(weights)`.",
    "For candidate `mid`, count days needed by greedily accumulating weights up to `mid`.",
    "If `needed <= days`, `r = mid`; else `l = mid + 1`."
  ],
  "timeComplexity": "O(n log(sum(weights)))",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Initialize `needed = 1` (the first day) before scanning `weights`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def ship_within_days(weights: list[int], days: int) -> int:\n    l, r = max(weights), sum(weights)\n    while l < r:\n        mid = (l + r) // 2\n        needed, cur = 1, 0\n        for w in weights:\n            if cur + w > mid:\n                needed += 1\n                cur = 0\n            cur += w\n        if needed <= days:\n            r = mid\n        else:\n            l = mid + 1\n    return l\n"
  }
},
  "split-array-largest-sum": {
  "problemId": "split-array-largest-sum",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Binary search the maximum allowed subarray sum `mid` in `[max(nums), sum(nums)]` and verify greedily whether `nums` can be partitioned into `<= k` subarrays.",
  "hints": [
    "Feasibility is monotonic in `mid`.",
    "Greedily start a new subarray whenever `cur + x > mid`.",
    "Boundary edge cases & complexity: Lower bound must be `max(nums)` so every single element fits in a subarray. Verify your solution strictly meets O(n log(sum(nums))) time and O(1) space limits."
  ],
  "approachTitle": "Binary Search + Greedy Partition Check",
  "approachSteps": [
    "Set `l = max(nums)`, `r = sum(nums)`.",
    "Count greedy partitions for `mid`; if `parts <= k`, `r = mid`; else `l = mid + 1`.",
    "Return `l`."
  ],
  "timeComplexity": "O(n log(sum(nums)))",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Lower bound must be `max(nums)` so every single element fits in a subarray."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def split_array(nums: list[int], k: int) -> int:\n    l, r = max(nums), sum(nums)\n    while l < r:\n        mid = (l + r) // 2\n        parts, cur = 1, 0\n        for x in nums:\n            if cur + x > mid:\n                parts += 1\n                cur = 0\n            cur += x\n        if parts <= k:\n            r = mid\n        else:\n            l = mid + 1\n    return l\n"
  }
},
  "single-element-in-a-sorted-array": {
  "problemId": "single-element-in-a-sorted-array",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Before the single element, pairs start at even indices `(2k, 2k+1)`; after it, pairs start at odd indices. Snap `mid` to even (`mid & ~1`) and check `nums[mid] == nums[mid + 1]`.",
  "hints": [
    "Force `mid` to be even (`if mid % 2 == 1: mid -= 1`).",
    "If `nums[mid] == nums[mid + 1]`, the single element is to the right (`l = mid + 2`); else `r = mid`.",
    "Boundary edge cases & complexity: Ensure `mid` is even before comparing `mid` with `mid + 1`. Verify your solution strictly meets O(log n) time and O(1) space limits."
  ],
  "approachTitle": "Even-Index Parity Binary Search",
  "approachSteps": [
    "Set `l = 0`, `r = len(nums) - 1`.",
    "While `l < r`, compute even `mid = (l + r) // 2` (`mid -= mid % 2`).",
    "If `nums[mid] == nums[mid + 1]`, `l = mid + 2`; else `r = mid`.",
    "Return `nums[l]`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Ensure `mid` is even before comparing `mid` with `mid + 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def single_non_duplicate(nums: list[int]) -> int:\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if mid % 2 == 1:\n            mid -= 1\n        if nums[mid] == nums[mid + 1]:\n            l = mid + 2\n        else:\n            r = mid\n    return nums[l]\n"
  }
},
  "search-a-2d-matrix-ii": {
  "problemId": "search-a-2d-matrix-ii",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Start at the top-right corner `(0, n - 1)`: move left if `val > target`, move down if `val < target`, eliminating one row or column per step.",
  "hints": [
    "At the top-right corner, moving left strictly decreases and moving down strictly increases.",
    "Total steps are at most `m + n`.",
    "Boundary edge cases & complexity: Starting at top-left or bottom-right does not give a unique direction to prune. Verify your solution strictly meets O(m + n) time and O(1) space limits."
  ],
  "approachTitle": "Top-Right Staircase Elimination",
  "approachSteps": [
    "Start at `r = 0`, `c = len(matrix[0]) - 1`.",
    "While `r < m and c >= 0`: return `True` if equal, `c -= 1` if `val > target`, else `r += 1`.",
    "Return `False`."
  ],
  "timeComplexity": "O(m + n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Starting at top-left or bottom-right does not give a unique direction to prune."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def search_matrix_ii(matrix: list[list[int]], target: int) -> bool:\n    m, n = len(matrix), len(matrix[0])\n    r, c = 0, n - 1\n    while r < m and c >= 0:\n        val = matrix[r][c]\n        if val == target:\n            return True\n        if val > target:\n            c -= 1\n        else:\n            r += 1\n    return False\n"
  }
},
  "h-index-sorted": {
  "problemId": "h-index-sorted",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Find the smallest index `i` such that `citations[i] >= n - i`; then the h-index is `n - i`.",
  "hints": [
    "At index `i`, there are `n - i` papers with at least `citations[i]` citations.",
    "Binary search for the first index where `citations[mid] >= n - mid`.",
    "Boundary edge cases & complexity: Handle all-zero citations returning `0` cleanly (`l == n`). Verify your solution strictly meets O(log n) time and O(1) space limits."
  ],
  "approachTitle": "Suffix-Count Binary Search",
  "approachSteps": [
    "Set `n = len(citations)`, `l = 0`, `r = n`.",
    "While `l < r`, compute `mid = (l + r) // 2`; if `citations[mid] >= n - mid`, `r = mid`; else `l = mid + 1`.",
    "Return `n - l`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle all-zero citations returning `0` cleanly (`l == n`)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def h_index_sorted(citations: list[int]) -> int:\n    n = len(citations)\n    l, r = 0, n\n    while l < r:\n        mid = (l + r) // 2\n        if citations[mid] >= n - mid:\n            r = mid\n        else:\n            l = mid + 1\n    return n - l\n"
  }
},
  "largest-number-concat": {
  "problemId": "largest-number-concat",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Convert numbers to strings and sort with custom comparator placing `a` before `b` iff `a + b > b + a`.",
  "hints": [
    "Comparing `a + b` vs `b + a` defines a strict weak ordering.",
    "If the largest element is `'0'`, return `'0'` instead of `'000'`.",
    "Boundary edge cases & complexity: Handle `[0, 0]` returning `'0'`, not `'00'`. Verify your solution strictly meets O(n log n * k) time and O(n * k) space limits."
  ],
  "approachTitle": "Custom Concatenation Comparator Sort",
  "approachSteps": [
    "Convert `nums` to strings.",
    "Sort using `cmp_to_key` comparing `b + a` vs `a + b`.",
    "Return `'0'` if `strs[0] == '0'` else `''.join(strs)`."
  ],
  "timeComplexity": "O(n log n * k)",
  "spaceComplexity": "O(n * k)",
  "pitfalls": [
    "Handle `[0, 0]` returning `'0'`, not `'00'`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from functools import cmp_to_key\n\ndef largest_number(nums: list[int]) -> str:\n    strs = [str(x) for x in nums]\n    strs.sort(key=cmp_to_key(lambda a, b: -1 if a + b > b + a else (1 if a + b < b + a else 0)))\n    return '0' if strs[0] == '0' else \"\".join(strs)\n"
  }
},
  "wiggle-sort-adjacent": {
  "problemId": "wiggle-sort-adjacent",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Scan left-to-right: at even index `i`, swap with `i + 1` if `nums[i] > nums[i + 1]`; at odd index `i`, swap if `nums[i] < nums[i + 1]`.",
  "hints": [
    "Fixing an adjacent violation at `(i, i + 1)` never breaks the already-fixed inequality at `(i - 1, i)`.",
    "Runs in O(n) time without full sorting.",
    "Boundary edge cases & complexity: Even indices need `<=` next element, odd indices need `>=` next element. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "One-Pass Adjacent Greedy Swap",
  "approachSteps": [
    "For `i` in `range(len(nums) - 1)`: if `(i % 2 == 0 and nums[i] > nums[i + 1])` or `(i % 2 == 1 and nums[i] < nums[i + 1])`, swap `nums[i]` and `nums[i + 1]`.",
    "Return `nums`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Even indices need `<=` next element, odd indices need `>=` next element."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def wiggle_sort(nums: list[int]) -> list[int]:\n    for i in range(len(nums) - 1):\n        if (i % 2 == 0 and nums[i] > nums[i + 1]) or (i % 2 == 1 and nums[i] < nums[i + 1]):\n            nums[i], nums[i + 1] = nums[i + 1], nums[i]\n    return nums\n"
  }
},
  "count-of-smaller-numbers-after-self": {
  "problemId": "count-of-smaller-numbers-after-self",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Coordinate-compress `nums` and scan right-to-left using a Fenwick Tree (Binary Indexed Tree) to query how many strictly smaller ranks have already been seen.",
  "hints": [
    "Scanning right-to-left turns 'after self' into 'already inserted'.",
    "Map unique sorted values to 1-based ranks `1.m`.",
    "Query `bit.sum(rank - 1)` then `bit.add(rank, 1)`."
  ],
  "approachTitle": "Reverse Scan + Fenwick Tree (BIT)",
  "approachSteps": [
    "Coordinate-compress values into ranks `1..m`.",
    "Scan `nums` from right to left.",
    "Query prefix sum `rank - 1` for strictly smaller count, then increment `rank` in the BIT."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Query `rank - 1` (not `rank`) because elements must be strictly smaller."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_smaller(nums: list[int]) -> list[int]:\n    ranks = {v: i + 1 for i, v in enumerate(sorted(set(nums)))}\n    m = len(ranks)\n    bit = [0] * (m + 1)\n    def update(i):\n        while i <= m:\n            bit[i] += 1\n            i += i & -i\n    def query(i):\n        s = 0\n        while i > 0:\n            s += bit[i]\n            i -= i & -i\n        return s\n    res = [0] * len(nums)\n    for idx in range(len(nums) - 1, -1, -1):\n        r = ranks[nums[idx]]\n        res[idx] = query(r - 1)\n        update(r)\n    return res\n"
  }
},
  "reverse-pairs": {
  "problemId": "reverse-pairs",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "During merge sort, before merging two sorted halves `left` and `right`, use a monotonic two-pointer scan to count pairs with `left[i] > 2 * right[j]` in linear time.",
  "hints": [
    "Because both halves are sorted, as `i` advances `j` never moves backward.",
    "Count cross-pairs BEFORE merging `left` and `right`.",
    "Handle negative numbers properly: `-5 > 2 * -5` is True (`-5 > -10`)."
  ],
  "approachTitle": "Merge Sort Cross-Pair Counting",
  "approachSteps": [
    "Recursively sort and count `left` and `right`.",
    "Two-pointer sweep `i` over `left` advancing `j` while `left[i] > 2 * right[j]`, adding `j` to `count`.",
    "Merge `left` and `right` into sorted order."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "In Java/C++, cast `2L * right[j]` to 64-bit to prevent signed 32-bit overflow."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def reverse_pairs(nums: list[int]) -> int:\n    def sort_count(arr):\n        if len(arr) <= 1:\n            return arr, 0\n        mid = len(arr) // 2\n        left, c1 = sort_count(arr[:mid])\n        right, c2 = sort_count(arr[mid:])\n        cnt = c1 + c2\n        j = 0\n        for x in left:\n            while j < len(right) and x > 2 * right[j]:\n                j += 1\n            cnt += j\n        merged = []\n        i = j = 0\n        while i < len(left) and j < len(right):\n            if left[i] <= right[j]:\n                merged.append(left[i]); i += 1\n            else:\n                merged.append(right[j]); j += 1\n        merged.extend(left[i:])\n        merged.extend(right[j:])\n        return merged, cnt\n    return sort_count(nums)[1]\n"
  }
},
  "same-tree": {
  "problemId": "same-tree",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Recursively check that both nodes are `None`, or both exist with equal values and identical left and right subtrees.",
  "hints": [
    "Two `None` nodes match; one `None` and one non-`None` do not.",
    "Compare `a.val == b.val` and recurse on left and right.",
    "Boundary edge cases & complexity: Handle empty trees returning `True`. Verify your solution strictly meets O(n) time and O(h) space limits."
  ],
  "approachTitle": "Simultaneous Recursive DFS",
  "approachSteps": [
    "Deserialize both trees.",
    "Recursively compare `(n1, n2)` for structural and value equality."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Handle empty trees returning `True`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val; self.left = None; self.right = None\n\ndef _build(arr):\n    if not arr or arr[0] is None:\n        return None\n    root = TreeNode(arr[0])\n    dq = deque([root]); i = 1\n    while dq and i < len(arr):\n        node = dq.popleft()\n        if i < len(arr) and arr[i] is not None:\n            node.left = TreeNode(arr[i]); dq.append(node.left)\n        i += 1\n        if i < len(arr) and arr[i] is not None:\n            node.right = TreeNode(arr[i]); dq.append(node.right)\n        i += 1\n    return root\n\ndef is_same_tree(p: list, q: list) -> bool:\n    def same(a, b):\n        if not a and not b:\n            return True\n        if not a or not b or a.val != b.val:\n            return False\n        return same(a.left, b.left) and same(a.right, b.right)\n    return same(_build(p), _build(q))\n"
  }
},
  "symmetric-tree": {
  "problemId": "symmetric-tree",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Check `is_mirror(root.left, root.right)` where two subtrees are mirrors iff `a.val == b.val`, `is_mirror(a.left, b.right)`, and `is_mirror(a.right, b.left)`.",
  "hints": [
    "Compare outer pair `(a.left, b.right)` and inner pair `(a.right, b.left)`.",
    "Both `None` is symmetric.",
    "Boundary edge cases & complexity: Compare `a.left` with `b.right` (mirrored), not `b.left`. Verify your solution strictly meets O(n) time and O(h) space limits."
  ],
  "approachTitle": "Recursive Mirror Verification",
  "approachSteps": [
    "Deserialize `tree`.",
    "Check `mirror(root.left, root.right)` recursively."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Compare `a.left` with `b.right` (mirrored), not `b.left`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val; self.left = None; self.right = None\n\ndef is_symmetric(tree: list) -> bool:\n    if not tree or tree[0] is None:\n        return True\n    root = TreeNode(tree[0])\n    dq = deque([root]); i = 1\n    while dq and i < len(tree):\n        node = dq.popleft()\n        if i < len(tree) and tree[i] is not None:\n            node.left = TreeNode(tree[i]); dq.append(node.left)\n        i += 1\n        if i < len(tree) and tree[i] is not None:\n            node.right = TreeNode(tree[i]); dq.append(node.right)\n        i += 1\n    def mirror(a, b):\n        if not a and not b:\n            return True\n        if not a or not b or a.val != b.val:\n            return False\n        return mirror(a.left, b.right) and mirror(a.right, b.left)\n    return mirror(root.left, root.right)\n"
  }
},
  "balanced-binary-tree": {
  "problemId": "balanced-binary-tree",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run a bottom-up post-order DFS returning subtree height, or `-1` as an early sentinel as soon as any node is unbalanced.",
  "hints": [
    "Computing height top-down at every node is O(n^2).",
    "Bottom-up DFS checks balance and computes height in a single O(n) pass.",
    "Boundary edge cases & complexity: Return `True` for an empty tree. Verify your solution strictly meets O(n) time and O(h) space limits."
  ],
  "approachTitle": "Bottom-Up Height Sentinel DFS",
  "approachSteps": [
    "Define `height(node)`: return `0` if `None`.",
    "Get `lh = height(left)`, `rh = height(right)`; if either is `-1` or `abs(lh - rh) > 1`, return `-1`.",
    "Else return `1 + max(lh, rh)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Return `True` for an empty tree."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val; self.left = None; self.right = None\n\ndef is_balanced(tree: list) -> bool:\n    if not tree or tree[0] is None:\n        return True\n    root = TreeNode(tree[0])\n    dq = deque([root]); i = 1\n    while dq and i < len(tree):\n        node = dq.popleft()\n        if i < len(tree) and tree[i] is not None:\n            node.left = TreeNode(tree[i]); dq.append(node.left)\n        i += 1\n        if i < len(tree) and tree[i] is not None:\n            node.right = TreeNode(tree[i]); dq.append(node.right)\n        i += 1\n    def h(node):\n        if not node:\n            return 0\n        lh = h(node.left)\n        if lh == -1:\n            return -1\n        rh = h(node.right)\n        if rh == -1 or abs(lh - rh) > 1:\n            return -1\n        return 1 + max(lh, rh)\n    return h(root) != -1\n"
  }
},
  "path-sum-root-to-leaf": {
  "problemId": "path-sum-root-to-leaf",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Subtract `node.val` from `remaining` down the tree and return `True` only at a true leaf (`not node.left and not node.right`) where `remaining == node.val`.",
  "hints": [
    "An empty tree has no root-to-leaf path, even if `target_sum == 0`.",
    "A node with one child is NOT a leaf.",
    "Boundary edge cases & complexity: Do not treat a node with a single missing child as a leaf. Verify your solution strictly meets O(n) time and O(h) space limits."
  ],
  "approachTitle": "Top-Down Remaining-Sum DFS",
  "approachSteps": [
    "Deserialize `tree`; if empty return `False`.",
    "In `dfs(node, rem)`: if `not node`, return `False`; if leaf, return `rem == node.val`; else recurse on left or right with `rem - node.val`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Do not treat a node with a single missing child as a leaf."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val; self.left = None; self.right = None\n\ndef has_path_sum(tree: list, target_sum: int) -> bool:\n    if not tree or tree[0] is None:\n        return False\n    root = TreeNode(tree[0])\n    dq = deque([root]); i = 1\n    while dq and i < len(tree):\n        node = dq.popleft()\n        if i < len(tree) and tree[i] is not None:\n            node.left = TreeNode(tree[i]); dq.append(node.left)\n        i += 1\n        if i < len(tree) and tree[i] is not None:\n            node.right = TreeNode(tree[i]); dq.append(node.right)\n        i += 1\n    def dfs(node, rem):\n        if not node:\n            return False\n        if not node.left and not node.right:\n            return rem == node.val\n        return dfs(node.left, rem - node.val) or dfs(node.right, rem - node.val)\n    return dfs(root, target_sum)\n"
  }
},
  "binary-tree-right-side-view": {
  "problemId": "binary-tree-right-side-view",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Perform level-order BFS and record the last node popped at each level.",
  "hints": [
    "Only walking down `root.right` misses deeper nodes in the left subtree.",
    "In BFS, the final node of every level is the rightmost visible node.",
    "Boundary edge cases & complexity: Return `[]` for empty input. Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Level-Order Last-Node BFS",
  "approachSteps": [
    "Deserialize `tree`.",
    "Run BFS level by level, recording `node.val` of the last node in each level."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Return `[]` for empty input."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val; self.left = None; self.right = None\n\ndef right_side_view(tree: list) -> list[int]:\n    if not tree or tree[0] is None:\n        return []\n    root = TreeNode(tree[0])\n    dq = deque([root]); i = 1\n    while dq and i < len(tree):\n        node = dq.popleft()\n        if i < len(tree) and tree[i] is not None:\n            node.left = TreeNode(tree[i]); dq.append(node.left)\n        i += 1\n        if i < len(tree) and tree[i] is not None:\n            node.right = TreeNode(tree[i]); dq.append(node.right)\n        i += 1\n    res, q = [], deque([root])\n    while q:\n        last = None\n        for _ in range(len(q)):\n            node = q.popleft()\n            last = node.val\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        res.append(last)\n    return res\n"
  }
},
  "binary-tree-zigzag-level-order": {
  "problemId": "binary-tree-zigzag-level-order",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run standard level-order BFS and reverse odd-indexed levels (or use a deque per level).",
  "hints": [
    "Keep child enqueueing strictly left-then-right.",
    "Flip a `left_to_right` boolean after each level.",
    "Boundary edge cases & complexity: Do not alter child enqueue order unless using a double-ended stack traversal. Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Alternating-Direction BFS",
  "approachSteps": [
    "Deserialize `tree`.",
    "Collect each level via BFS; if `not left_to_right`, reverse the level list.",
    "Toggle `left_to_right`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Do not alter child enqueue order unless using a double-ended stack traversal."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val; self.left = None; self.right = None\n\ndef zigzag_level_order(tree: list) -> list[list[int]]:\n    if not tree or tree[0] is None:\n        return []\n    root = TreeNode(tree[0])\n    dq = deque([root]); i = 1\n    while dq and i < len(tree):\n        node = dq.popleft()\n        if i < len(tree) and tree[i] is not None:\n            node.left = TreeNode(tree[i]); dq.append(node.left)\n        i += 1\n        if i < len(tree) and tree[i] is not None:\n            node.right = TreeNode(tree[i]); dq.append(node.right)\n        i += 1\n    res, q, ltr = [], deque([root]), True\n    while q:\n        lvl = []\n        for _ in range(len(q)):\n            node = q.popleft()\n            lvl.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        res.append(lvl if ltr else lvl[::-1])\n        ltr = not ltr\n    return res\n"
  }
},
  "count-good-nodes-in-binary-tree": {
  "problemId": "count-good-nodes-in-binary-tree",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Pass `max_so_far` down a top-down DFS; count `1` whenever `node.val >= max_so_far` and propagate `max(max_so_far, node.val)`.",
  "hints": [
    "The root is always good.",
    "Initialize `max_so_far = root.val` to handle negative node values.",
    "Boundary edge cases & complexity: Never initialize `mx = 0` because node values can be negative. Verify your solution strictly meets O(n) time and O(h) space limits."
  ],
  "approachTitle": "Path-Maximum Top-Down DFS",
  "approachSteps": [
    "Deserialize `tree`.",
    "Recurse `dfs(node, mx)`: add `1` if `node.val >= mx`, update `nmx = max(mx, node.val)`, sum left and right."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Never initialize `mx = 0` because node values can be negative."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val; self.left = None; self.right = None\n\ndef good_nodes(tree: list) -> int:\n    root = TreeNode(tree[0])\n    dq = deque([root]); i = 1\n    while dq and i < len(tree):\n        node = dq.popleft()\n        if i < len(tree) and tree[i] is not None:\n            node.left = TreeNode(tree[i]); dq.append(node.left)\n        i += 1\n        if i < len(tree) and tree[i] is not None:\n            node.right = TreeNode(tree[i]); dq.append(node.right)\n        i += 1\n    def dfs(node, mx):\n        if not node:\n            return 0\n        good = 1 if node.val >= mx else 0\n        nmx = max(mx, node.val)\n        return good + dfs(node.left, nmx) + dfs(node.right, nmx)\n    return dfs(root, root.val)\n"
  }
},
  "lowest-common-ancestor-binary-tree": {
  "problemId": "lowest-common-ancestor-binary-tree",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "In post-order DFS, return `node` immediately if it equals `p` or `q`; if both left and right subtrees return non-null, `node` is the LCA.",
  "hints": [
    "Unlike a BST, you cannot prune by value comparisons.",
    "If only one side returns a node, bubble that node upward.",
    "Boundary edge cases & complexity: Return `node.val` (int), not the `TreeNode` object. Verify your solution strictly meets O(n) time and O(h) space limits."
  ],
  "approachTitle": "Post-Order Target Bubbling DFS",
  "approachSteps": [
    "Deserialize `tree`.",
    "In `dfs(node)`: return `node` if `not node` or `node.val in (p, q)`.",
    "Compute `l = dfs(left)`, `r = dfs(right)`; return `node` if `l and r`, else `l or r`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Return `node.val` (int), not the `TreeNode` object."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val; self.left = None; self.right = None\n\ndef lca_binary_tree(tree: list, p: int, q: int) -> int:\n    root = TreeNode(tree[0])\n    dq = deque([root]); i = 1\n    while dq and i < len(tree):\n        node = dq.popleft()\n        if i < len(tree) and tree[i] is not None:\n            node.left = TreeNode(tree[i]); dq.append(node.left)\n        i += 1\n        if i < len(tree) and tree[i] is not None:\n            node.right = TreeNode(tree[i]); dq.append(node.right)\n        i += 1\n    def dfs(node):\n        if not node or node.val == p or node.val == q:\n            return node\n        l, r = dfs(node.left), dfs(node.right)\n        if l and r:\n            return node\n        return l or r\n    return dfs(root).val\n"
  }
},
  "flatten-binary-tree-to-preorder": {
  "problemId": "flatten-binary-tree-to-preorder",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use Morris-style rewiring: for each node with a left child, attach `curr.right` to the rightmost node of `curr.left`, then move `curr.left` to `curr.right`.",
  "hints": [
    "Morris traversal flattens the tree in O(1) extra space.",
    "Alternatively, iterative preorder with a stack visits nodes in the exact flattened order.",
    "Boundary edge cases & complexity: Clear `curr.left = None` after moving it to `curr.right`. Verify your solution strictly meets O(n) time and O(1) auxiliary space limits."
  ],
  "approachTitle": "Morris In-Place Preorder Flattening",
  "approachSteps": [
    "Deserialize `tree`.",
    "While `curr`: if `curr.left`, find its rightmost descendant `pre`, set `pre.right = curr.right`, `curr.right = curr.left`, `curr.left = None`; advance `curr = curr.right`.",
    "Walk right pointers collecting values."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Clear `curr.left = None` after moving it to `curr.right`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val; self.left = None; self.right = None\n\ndef flatten_tree(tree: list) -> list[int]:\n    if not tree or tree[0] is None:\n        return []\n    root = TreeNode(tree[0])\n    dq = deque([root]); i = 1\n    while dq and i < len(tree):\n        node = dq.popleft()\n        if i < len(tree) and tree[i] is not None:\n            node.left = TreeNode(tree[i]); dq.append(node.left)\n        i += 1\n        if i < len(tree) and tree[i] is not None:\n            node.right = TreeNode(tree[i]); dq.append(node.right)\n        i += 1\n    curr = root\n    while curr:\n        if curr.left:\n            pre = curr.left\n            while pre.right:\n                pre = pre.right\n            pre.right = curr.right\n            curr.right = curr.left\n            curr.left = None\n        curr = curr.right\n    out, curr = [], root\n    while curr:\n        out.append(curr.val)\n        curr = curr.right\n    return out\n"
  }
},
  "sum-root-to-leaf-numbers": {
  "problemId": "sum-root-to-leaf-numbers",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Carry `curr = curr * 10 + node.val` down the DFS and return `curr` at every leaf node.",
  "hints": [
    "Update `nxt = curr * 10 + node.val` at each step.",
    "Return `nxt` when both children are `None`.",
    "Boundary edge cases & complexity: Only add to the total at true leaf nodes. Verify your solution strictly meets O(n) time and O(h) space limits."
  ],
  "approachTitle": "Decimal-Accumulator DFS",
  "approachSteps": [
    "Deserialize `tree`.",
    "Define `dfs(node, curr)`: if `not node`, return `0`; `nxt = curr * 10 + node.val`; if leaf return `nxt`; else return `dfs(left, nxt) + dfs(right, nxt)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Only add to the total at true leaf nodes."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val; self.left = None; self.right = None\n\ndef sum_numbers(tree: list) -> int:\n    root = TreeNode(tree[0])\n    dq = deque([root]); i = 1\n    while dq and i < len(tree):\n        node = dq.popleft()\n        if i < len(tree) and tree[i] is not None:\n            node.left = TreeNode(tree[i]); dq.append(node.left)\n        i += 1\n        if i < len(tree) and tree[i] is not None:\n            node.right = TreeNode(tree[i]); dq.append(node.right)\n        i += 1\n    def dfs(node, curr):\n        if not node:\n            return 0\n        nxt = curr * 10 + node.val\n        if not node.left and not node.right:\n            return nxt\n        return dfs(node.left, nxt) + dfs(node.right, nxt)\n    return dfs(root, 0)\n"
  }
},
  "flood-fill": {
  "problemId": "flood-fill",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "If `image[sr][sc] == color`, return immediately to prevent an infinite loop; otherwise BFS 4-directional neighbors matching `orig`.",
  "hints": [
    "Check `if orig == color: return image` first!.",
    "Recolor cells as they are enqueued.",
    "Boundary edge cases & complexity: Omitting `if orig == color: return` causes infinite looping. Verify your solution strictly meets O(m * n) time and O(m * n) space limits."
  ],
  "approachTitle": "Guarded 4-Directional BFS",
  "approachSteps": [
    "Save `orig = image[sr][sc]`; if `orig == color`, return `image`.",
    "Set `image[sr][sc] = color` and BFS all 4-directional neighbors equal to `orig`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Omitting `if orig == color: return` causes infinite looping."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef flood_fill(image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:\n    orig = image[sr][sc]\n    if orig == color:\n        return image\n    m, n = len(image), len(image[0])\n    image[sr][sc] = color\n    q = deque([(sr, sc)])\n    while q:\n        r, c = q.popleft()\n        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < m and 0 <= nc < n and image[nr][nc] == orig:\n                image[nr][nc] = color\n                q.append((nr, nc))\n    return image\n"
  }
},
  "max-area-of-island": {
  "problemId": "max-area-of-island",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Flood-fill each unvisited land component, counting cells visited per component and tracking the maximum area.",
  "hints": [
    "Mark visited cells `0` to avoid revisiting.",
    "Sum the component size during BFS/DFS and update `best`.",
    "Boundary edge cases & complexity: Diagonal cells are NOT connected. Verify your solution strictly meets O(m * n) time and O(m * n) space limits."
  ],
  "approachTitle": "Connected-Component Area BFS",
  "approachSteps": [
    "Loop over all `(r, c)`; on `1`, run BFS counting cells and marking them `0`.",
    "Track and return `best`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Diagonal cells are NOT connected."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef max_area_of_island(grid: list[list[int]]) -> int:\n    m, n = len(grid), len(grid[0])\n    g = [row[:] for row in grid]\n    best = 0\n    for r in range(m):\n        for c in range(n):\n            if g[r][c] == 1:\n                g[r][c] = 0\n                q = deque([(r, c)])\n                area = 0\n                while q:\n                    cr, cc = q.popleft()\n                    area += 1\n                    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n                        nr, nc = cr + dr, cc + dc\n                        if 0 <= nr < m and 0 <= nc < n and g[nr][nc] == 1:\n                            g[nr][nc] = 0\n                            q.append((nr, nc))\n                if area > best:\n                    best = area\n    return best\n"
  }
},
  "surrounded-regions": {
  "problemId": "surrounded-regions",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Instead of testing every interior `'O'`, run BFS from all border `'O'`s marking safe cells `'S'`, then flip remaining `'O'`s to `'X'` and restore `'S'` back to `'O'`.",
  "hints": [
    "Think in reverse: find all `'O'`s that CANNOT be captured.",
    "Any `'O'` reachable from the 4 borders is safe.",
    "Boundary edge cases & complexity: Check all four borders (top, bottom, left, right). Verify your solution strictly meets O(m * n) time and O(m * n) space limits."
  ],
  "approachTitle": "Border-Seeded Reverse BFS",
  "approachSteps": [
    "Enqueue all border `'O'` cells and mark them `'S'`.",
    "BFS to mark all connected `'O'` cells `'S'`.",
    "Scan grid: `'O' -> 'X'`, `'S' -> 'O'`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Check all four borders (top, bottom, left, right)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef solve_surrounded(board: list[list[str]]) -> list[list[str]]:\n    m, n = len(board), len(board[0])\n    q = deque()\n    for r in range(m):\n        for c in (0, n - 1):\n            if board[r][c] == 'O':\n                board[r][c] = 'S'; q.append((r, c))\n    for c in range(n):\n        for r in (0, m - 1):\n            if board[r][c] == 'O':\n                board[r][c] = 'S'; q.append((r, c))\n    while q:\n        r, c = q.popleft()\n        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < m and 0 <= nc < n and board[nr][nc] == 'O':\n                board[nr][nc] = 'S'; q.append((nr, nc))\n    for r in range(m):\n        for c in range(n):\n            if board[r][c] == 'O':\n                board[r][c] = 'X'\n            elif board[r][c] == 'S':\n                board[r][c] = 'O'\n    return board\n"
  }
},
  "pacific-atlantic-water-flow": {
  "problemId": "pacific-atlantic-water-flow",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run two reverse-uphill BFS traversals starting from the Pacific border and the Atlantic border (moving to neighbors with `height >= curr`), then intersect the two reachable sets.",
  "hints": [
    "Flowing downhill from a cell to an ocean is equivalent to climbing uphill from the ocean to that cell.",
    "Intersect `pac_visited & atl_visited`.",
    "Boundary edge cases & complexity: Reverse traversal requires `heights[nr][nc] >= heights[r][c]`. Verify your solution strictly meets O(m * n) time and O(m * n) space limits."
  ],
  "approachTitle": "Dual Reverse-Uphill BFS",
  "approachSteps": [
    "BFS uphill from Pacific edges `(r=0 or c=0)`.",
    "BFS uphill from Atlantic edges `(r=m-1 or c=n-1)`.",
    "Return sorted `[r, c]` in both sets."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Reverse traversal requires `heights[nr][nc] >= heights[r][c]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef pacific_atlantic(heights: list[list[int]]) -> list[list[int]]:\n    m, n = len(heights), len(heights[0])\n    def bfs(starts):\n        vis = set(starts)\n        q = deque(starts)\n        while q:\n            r, c = q.popleft()\n            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in vis and heights[nr][nc] >= heights[r][c]:\n                    vis.add((nr, nc))\n                    q.append((nr, nc))\n        return vis\n    pac = bfs([(0, c) for c in range(n)] + [(r, 0) for r in range(m)])\n    atl = bfs([(m - 1, c) for c in range(n)] + [(r, n - 1) for r in range(m)])\n    return sorted([r, c] for r, c in (pac & atl))\n"
  }
},
  "shortest-path-in-binary-matrix": {
  "problemId": "shortest-path-in-binary-matrix",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run 8-directional BFS starting at `(0, 0)` with distance `1`, returning the distance upon reaching `(n - 1, n - 1)`.",
  "hints": [
    "If `grid[0][0] == 1` or `grid[n-1][n-1] == 1`, return `-1` immediately.",
    "Movement is 8-directional (including diagonals).",
    "Boundary edge cases & complexity: Path length counts cells (starts at 1), not steps. Verify your solution strictly meets O(n^2) time and O(n^2) space limits."
  ],
  "approachTitle": "8-Directional Shortest-Path BFS",
  "approachSteps": [
    "Check endpoints are `0`.",
    "Enqueue `(0, 0, 1)` and mark visited.",
    "Expand 8 neighbors; return `d` when `(r, c) == (n - 1, n - 1)`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n^2)",
  "pitfalls": [
    "Path length counts cells (starts at 1), not steps."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef shortest_path_binary_matrix(grid: list[list[int]]) -> int:\n    n = len(grid)\n    if grid[0][0] or grid[n - 1][n - 1]:\n        return -1\n    g = [row[:] for row in grid]\n    g[0][0] = 1\n    q = deque([(0, 0, 1)])\n    dirs = ((-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1))\n    while q:\n        r, c, d = q.popleft()\n        if r == n - 1 and c == n - 1:\n            return d\n        for dr, dc in dirs:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < n and 0 <= nc < n and g[nr][nc] == 0:\n                g[nr][nc] = 1\n                q.append((nr, nc, d + 1))\n    return -1\n"
  }
},
  "all-paths-from-source-to-target": {
  "problemId": "all-paths-from-source-to-target",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Because the graph is a DAG, run DFS backtracking from node `0` without needing a visited set, recording `path[:]` whenever reaching `n - 1`.",
  "hints": [
    "A DAG has no cycles, so paths always terminate.",
    "Push neighbor, recurse, and pop to backtrack.",
    "Boundary edge cases & complexity: Append a copy `path[:]` rather than `path` itself. Verify your solution strictly meets O(2^n * n) time and O(n) stack space limits."
  ],
  "approachTitle": "DAG DFS Path Enumeration",
  "approachSteps": [
    "Initialize `target = len(graph) - 1`, `res = []`, `path = [0]`.",
    "In `dfs(u)`: if `u == target`, append `path[:]`; else for `v` in `graph[u]`, push `v`, recurse, pop."
  ],
  "timeComplexity": "O(2^n * n)",
  "spaceComplexity": "O(n) stack",
  "pitfalls": [
    "Append a copy `path[:]` rather than `path` itself."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def all_paths_source_target(graph: list[list[int]]) -> list[list[int]]:\n    target = len(graph) - 1\n    res, path = [], [0]\n    def dfs(u):\n        if u == target:\n            res.append(path[:])\n            return\n        for v in graph[u]:\n            path.append(v)\n            dfs(v)\n            path.pop()\n    dfs(0)\n    return res\n"
  }
},
  "keys-and-rooms": {
  "problemId": "keys-and-rooms",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Perform BFS/DFS starting from room `0` and check whether `len(visited) == len(rooms)`.",
  "hints": [
    "Rooms are nodes and keys are directed edges.",
    "Check full reachability from node `0`.",
    "Boundary edge cases & complexity: A room may contain a key to itself; `visited` prevents infinite loops. Verify your solution strictly meets O(V + E) time and O(V) space limits."
  ],
  "approachTitle": "Single-Source Reachability BFS",
  "approachSteps": [
    "Initialize `visited = {0}` and `stack = [0]`.",
    "Pop room `u`, add unvisited keys `v` in `rooms[u]` to `visited` and `stack`.",
    "Return `len(visited) == len(rooms)`."
  ],
  "timeComplexity": "O(V + E)",
  "spaceComplexity": "O(V)",
  "pitfalls": [
    "A room may contain a key to itself; `visited` prevents infinite loops."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def can_visit_all_rooms(rooms: list[list[int]]) -> bool:\n    vis = {0}\n    stack = [0]\n    while stack:\n        u = stack.pop()\n        for v in rooms[u]:\n            if v not in vis:\n                vis.add(v)\n                stack.append(v)\n    return len(vis) == len(rooms)\n"
  }
},
  "find-eventual-safe-states": {
  "problemId": "find-eventual-safe-states",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Reverse all edges and run Kahn's topological sort starting from terminal nodes (`outdegree == 0`); every node processed is eventually safe.",
  "hints": [
    "A node is safe iff all of its outgoing edges lead to safe nodes.",
    "Reversing edges turns out-degrees into in-degrees.",
    "Boundary edge cases & complexity: Return the safe nodes in ascending sorted order. Verify your solution strictly meets O(V + E) time and O(V + E) space limits."
  ],
  "approachTitle": "Reverse-Graph Kahn's Topological Sort",
  "approachSteps": [
    "Build reversed adjacency list `rev[v].append(u)` and `outdeg[u] = len(graph[u])`.",
    "Enqueue all nodes with `outdeg == 0`.",
    "Pop safe nodes, decrement predecessors' `outdeg`, enqueue newly zeroed nodes, and return sorted safe nodes."
  ],
  "timeComplexity": "O(V + E)",
  "spaceComplexity": "O(V + E)",
  "pitfalls": [
    "Return the safe nodes in ascending sorted order."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef eventual_safe_nodes(graph: list[list[int]]) -> list[int]:\n    n = len(graph)\n    rev = [[] for _ in range(n)]\n    outdeg = [len(edges) for edges in graph]\n    for u, edges in enumerate(graph):\n        for v in edges:\n            rev[v].append(u)\n    q = deque(i for i in range(n) if outdeg[i] == 0)\n    safe = [False] * n\n    while q:\n        u = q.popleft()\n        safe[u] = True\n        for prev in rev[u]:\n            outdeg[prev] -= 1\n            if outdeg[prev] == 0:\n                q.append(prev)\n    return [i for i in range(n) if safe[i]]\n"
  }
},
  "swim-in-rising-water": {
  "problemId": "swim-in-rising-water",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run minimax Dijkstra using a min-heap keyed by `max_elevation_on_path`; the first time `(n - 1, n - 1)` is popped yields the minimum required time.",
  "hints": [
    "Path cost is `max(elevations on path)` rather than sum.",
    "Always expand the reachable cell with the lowest elevation using a min-heap.",
    "Boundary edge cases & complexity: Starting time is `grid[0][0]`, not `0`. Verify your solution strictly meets O(n^2 log n) time and O(n^2) space limits."
  ],
  "approachTitle": "Minimax Dijkstra with Min-Heap",
  "approachSteps": [
    "Push `(grid[0][0], 0, 0)` into a min-heap and mark `(0, 0)` visited.",
    "Pop `(t, r, c)`; if `(r, c) == (n - 1, n - 1)`, return `t`.",
    "For unvisited 4-neighbors, push `(max(t, grid[nr][nc]), nr, nc)`."
  ],
  "timeComplexity": "O(n^2 log n)",
  "spaceComplexity": "O(n^2)",
  "pitfalls": [
    "Starting time is `grid[0][0]`, not `0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef swim_in_water(grid: list[list[int]]) -> int:\n    n = len(grid)\n    vis = {(0, 0)}\n    heap = [(grid[0][0], 0, 0)]\n    while heap:\n        t, r, c = heapq.heappop(heap)\n        if r == n - 1 and c == n - 1:\n            return t\n        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in vis:\n                vis.add((nr, nc))\n                heapq.heappush(heap, (max(t, grid[nr][nc]), nr, nc))\n    return -1\n"
  }
},
  "alien-dictionary-order": {
  "problemId": "alien-dictionary-order",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Compare adjacent word pairs at their first differing character to build a directed precedence graph, detect invalid prefix inversions (`\"abc\"` before `\"ab\"`), and topologically sort with a min-heap.",
  "hints": [
    "Only the FIRST differing character between adjacent words implies a precedence edge.",
    "If `w1` is longer than `w2` and starts with `w2`, return `\"\"` immediately.",
    "Deduplicate edges so in-degrees aren't inflated."
  ],
  "approachTitle": "Adjacent-Diff Graph + Lexicographic Kahn's Sort",
  "approachSteps": [
    "Initialize `indeg` for all unique characters across `words`.",
    "For each adjacent pair `(w1, w2)`: check prefix invalidity, find first mismatch `c1 != c2`, add edge `c1 -> c2` once.",
    "Run Kahn's topological sort with a min-heap; return joined string if all chars emitted else `\"\"`."
  ],
  "timeComplexity": "O(C + U log U)",
  "spaceComplexity": "O(U + E)",
  "pitfalls": [
    "Handle invalid prefix order like `[\"abc\", \"ab\"]` explicitly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef alien_order(words: list[str]) -> str:\n    adj = {ch: set() for w in words for ch in w}\n    indeg = {ch: 0 for ch in adj}\n    for i in range(len(words) - 1):\n        w1, w2 = words[i], words[i + 1]\n        if len(w1) > len(w2) and w1.startswith(w2):\n            return \"\"\n        for c1, c2 in zip(w1, w2):\n            if c1 != c2:\n                if c2 not in adj[c1]:\n                    adj[c1].add(c2)\n                    indeg[c2] += 1\n                break\n    heap = [ch for ch, d in indeg.items() if d == 0]\n    heapq.heapify(heap)\n    order = []\n    while heap:\n        u = heapq.heappop(heap)\n        order.append(u)\n        for v in adj[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0:\n                heapq.heappush(heap, v)\n    return \"\".join(order) if len(order) == len(indeg) else \"\"\n"
  }
},
  "house-robber-ii": {
  "problemId": "house-robber-ii",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Break the circle by taking the maximum of linear House Robber on `nums[:-1]` and `nums[1:]`.",
  "hints": [
    "House 0 and house `n - 1` cannot both be robbed.",
    "Handle `len(nums) == 1` as a special base case.",
    "Boundary edge cases & complexity: Forgetting `len(nums) == 1` makes both slices empty and returns `0`. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Split-Circle Dual Linear DP",
  "approachSteps": [
    "If `len(nums) == 1`, return `nums[0]`.",
    "Define linear `rob_line(arr)` using two rolling variables.",
    "Return `max(rob_line(nums[:-1]), rob_line(nums[1:]))`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Forgetting `len(nums) == 1` makes both slices empty and returns `0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def rob_circular(nums: list[int]) -> int:\n    if len(nums) == 1:\n        return nums[0]\n    def rob_line(arr):\n        p2 = p1 = 0\n        for x in arr:\n            p2, p1 = p1, max(p1, p2 + x)\n        return p1\n    return max(rob_line(nums[:-1]), rob_line(nums[1:]))\n"
  }
},
  "decode-ways": {
  "problemId": "decode-ways",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use linear DP where `dp[i]` adds `dp[i - 1]` if `s[i - 1] != '0'` and adds `dp[i - 2]` if `10 <= int(s[i - 2:i]) <= 26`.",
  "hints": [
    "A leading `'0'` cannot be decoded at all.",
    "Two-digit codes must be between `10` and `26` inclusive.",
    "Boundary edge cases & complexity: `'0'` alone is invalid; `'06'` is also invalid as a 2-digit code. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Rolling 1D Decoding DP",
  "approachSteps": [
    "If `s[0] == '0'`, return `0`.",
    "Initialize `prev2 = 1`, `prev1 = 1`.",
    "For `i` from `1` to `len(s) - 1`, compute `curr` from 1-digit and 2-digit transitions, then shift."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "`'0'` alone is invalid; `'06'` is also invalid as a 2-digit code."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def num_decodings(s: str) -> int:\n    if not s or s[0] == '0':\n        return 0\n    prev2, prev1 = 1, 1\n    for i in range(1, len(s)):\n        curr = 0\n        if s[i] != '0':\n            curr += prev1\n        two = int(s[i - 1:i + 1])\n        if 10 <= two <= 26:\n            curr += prev2\n        prev2, prev1 = prev1, curr\n    return prev1\n"
  }
},
  "coin-change-ii": {
  "problemId": "coin-change-ii",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Iterate coins in the outer loop and amounts forward in the inner loop (`dp[a] += dp[a - c]`) to count unordered combinations without permutations.",
  "hints": [
    "Outer loop over `coins` guarantees each combination is counted once in canonical coin order.",
    "Base case `dp[0] = 1`.",
    "Boundary edge cases & complexity: Putting `amount` in the outer loop counts ordered permutations instead of combinations. Verify your solution strictly meets O(amount * len(coins)) time and O(amount) space limits."
  ],
  "approachTitle": "Coin-Outer Unbounded Knapsack DP",
  "approachSteps": [
    "Initialize `dp = [0] * (amount + 1)` with `dp[0] = 1`.",
    "For each `c` in `coins`, for `a` from `c` to `amount`, add `dp[a - c]` to `dp[a]`.",
    "Return `dp[amount]`."
  ],
  "timeComplexity": "O(amount * len(coins))",
  "spaceComplexity": "O(amount)",
  "pitfalls": [
    "Putting `amount` in the outer loop counts ordered permutations instead of combinations."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def change_ways(amount: int, coins: list[int]) -> int:\n    dp = [0] * (amount + 1)\n    dp[0] = 1\n    for c in coins:\n        for a in range(c, amount + 1):\n            dp[a] += dp[a - c]\n    return dp[amount]\n"
  }
},
  "target-sum-ways": {
  "problemId": "target-sum-ways",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Transform `P - N = target` and `P + N = total` into `P = (total + target) / 2`, then solve 0/1 subset-sum counting.",
  "hints": [
    "If `abs(target) > total` or `(total + target)` is odd, return `0`.",
    "Iterate sums backward from `pos` down to `x` so each item is used once.",
    "Boundary edge cases & complexity: Elements equal to `0` naturally double ways when iterating down to `x = 0`. Verify your solution strictly meets O(n * pos) time and O(pos) space limits."
  ],
  "approachTitle": "Algebraic Reduction to 0/1 Subset-Sum DP",
  "approachSteps": [
    "Compute `total = sum(nums)`. Check `abs(target) <= total` and `(total + target) % 2 == 0`.",
    "Set `pos = (total + target) // 2` and `dp = [0] * (pos + 1)` with `dp[0] = 1`.",
    "For each `x` in `nums`, loop `s` from `pos` down to `x`: `dp[s] += dp[s - x]`."
  ],
  "timeComplexity": "O(n * pos)",
  "spaceComplexity": "O(pos)",
  "pitfalls": [
    "Elements equal to `0` naturally double ways when iterating down to `x = 0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_target_sum_ways(nums: list[int], target: int) -> int:\n    total = sum(nums)\n    if abs(target) > total or (total + target) % 2 != 0:\n        return 0\n    pos = (total + target) // 2\n    dp = [0] * (pos + 1)\n    dp[0] = 1\n    for x in nums:\n        for s in range(pos, x - 1, -1):\n            dp[s] += dp[s - x]\n    return dp[pos]\n"
  }
},
  "minimum-path-sum": {
  "problemId": "minimum-path-sum",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a 1D row of minimum cumulative costs where each cell updates `dp[c] = grid[r][c] + min(dp[c], dp[c - 1])`.",
  "hints": [
    "First row can only be reached from the left; first column only from above.",
    "1D DP uses O(n) space without mutating the input grid.",
    "Boundary edge cases & complexity: Update `dp[0]` before iterating `c = 1.n-1`. Verify your solution strictly meets O(m * n) time and O(n) space limits."
  ],
  "approachTitle": "1D Rolling Row Grid DP",
  "approachSteps": [
    "Initialize `dp` from row 0 prefix sums.",
    "For each subsequent row, update `dp[0] += row[0]` and `dp[c] = row[c] + min(dp[c], dp[c - 1])`.",
    "Return `dp[-1]`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Update `dp[0]` before iterating `c = 1..n-1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_path_sum(grid: list[list[int]]) -> int:\n    n = len(grid[0])\n    dp = [0] * n\n    dp[0] = grid[0][0]\n    for c in range(1, n):\n        dp[c] = dp[c - 1] + grid[0][c]\n    for row in grid[1:]:\n        dp[0] += row[0]\n        for c in range(1, n):\n            dp[c] = row[c] + min(dp[c], dp[c - 1])\n    return dp[-1]\n"
  }
},
  "triangle-min-path-sum": {
  "problemId": "triangle-min-path-sum",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Collapse the triangle bottom-up starting from the last row: `dp[i] = row[i] + min(dp[i], dp[i + 1])`.",
  "hints": [
    "Bottom-up eliminates boundary checks at row edges.",
    "After reaching row 0, `dp[0]` holds the global minimum path sum.",
    "Boundary edge cases & complexity: Make a copy of the last row so you don't mutate the caller's input. Verify your solution strictly meets O(n^2) time and O(n) space limits."
  ],
  "approachTitle": "Bottom-Up Triangle Collapse DP",
  "approachSteps": [
    "Copy the bottom row into `dp`.",
    "Iterate rows from `len - 2` down to `0`, updating `dp[i] = triangle[r][i] + min(dp[i], dp[i + 1])`.",
    "Return `dp[0]`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Make a copy of the last row so you don't mutate the caller's input."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def minimum_total(triangle: list[list[int]]) -> int:\n    dp = list(triangle[-1])\n    for r in range(len(triangle) - 2, -1, -1):\n        for i in range(r + 1):\n            dp[i] = triangle[r][i] + min(dp[i], dp[i + 1])\n    return dp[0]\n"
  }
},
  "longest-palindromic-subsequence": {
  "problemId": "longest-palindromic-subsequence",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "The longest palindromic subsequence of `s` is identical to the Longest Common Subsequence of `s` and `reversed(s)` (or solved via interval DP).",
  "hints": [
    "Subsequence characters do not have to be contiguous.",
    "`LPS(s) == LCS(s, s[::-1])`.",
    "Boundary edge cases & complexity: Do not confuse subsequence with contiguous substring. Verify your solution strictly meets O(n^2) time and O(n) space limits."
  ],
  "approachTitle": "LCS with Reversed String (1D DP)",
  "approachSteps": [
    "Let `t = s[::-1]`.",
    "Compute LCS of `s` and `t` using a 1D rolling row."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Do not confuse subsequence with contiguous substring."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def longest_palindrome_subseq(s: str) -> int:\n    n = len(s)\n    t = s[::-1]\n    prev = [0] * (n + 1)\n    for c1 in s:\n        curr = [0] * (n + 1)\n        for j, c2 in enumerate(t):\n            if c1 == c2:\n                curr[j + 1] = prev[j] + 1\n            else:\n                curr[j + 1] = max(prev[j + 1], curr[j])\n        prev = curr\n    return prev[n]\n"
  }
},
  "distinct-subsequences": {
  "problemId": "distinct-subsequences",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain 1D `dp[j]` = ways to match prefix `t[:j]`; for each character `c` in `s`, iterate `j` backward from `len(t)` down to `1` adding `dp[j - 1]` whenever `c == t[j - 1]`.",
  "hints": [
    "Base case: `dp[0] = 1` (one way to form empty `t`).",
    "Iterating `j` backward ensures each character of `s` is used at most once.",
    "Boundary edge cases & complexity: Iterating `j` forward reuses the same character in `s` multiple times. Verify your solution strictly meets O(m * n) time and O(n) space limits."
  ],
  "approachTitle": "1D Backward-Sweep Subsequence DP",
  "approachSteps": [
    "Initialize `dp = [0] * (len(t) + 1)` with `dp[0] = 1`.",
    "For each `ch` in `s`, for `j` from `len(t)` down to `1`: if `ch == t[j - 1]`, `dp[j] += dp[j - 1]`.",
    "Return `dp[len(t)]`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Iterating `j` forward reuses the same character in `s` multiple times."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def num_distinct(s: str, t: str) -> int:\n    n = len(t)\n    dp = [0] * (n + 1)\n    dp[0] = 1\n    for ch in s:\n        for j in range(n, 0, -1):\n            if ch == t[j - 1]:\n                dp[j] += dp[j - 1]\n    return dp[n]\n"
  }
},
  "interleaving-string": {
  "problemId": "interleaving-string",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Let `dp[i][j]` be whether `s1[:i]` and `s2[:j]` interleave to form `s3[:i + j]`, compressed to a 1D boolean array.",
  "hints": [
    "First check `len(s1) + len(s2) == len(s3)`.",
    "`dp[j]` updates from top (`dp[j] and s1[i-1] == s3[i+j-1]`) or left (`dp[j-1] and s2[j-1] == s3[i+j-1]`).",
    "Boundary edge cases & complexity: Never skip the initial length check `len(s1) + len(s2) == len(s3)`. Verify your solution strictly meets O(m * n) time and O(n) space limits."
  ],
  "approachTitle": "1D Prefix Interleaving DP",
  "approachSteps": [
    "Check `len(s1) + len(s2) == len(s3)`.",
    "Initialize 1D `dp` for row `i = 0`.",
    "Transition for `i = 1..m` and `j = 0..n`.",
    "Return `dp[n]`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Never skip the initial length check `len(s1) + len(s2) == len(s3)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def is_interleave(s1: str, s2: str, s3: str) -> bool:\n    m, n = len(s1), len(s2)\n    if m + n != len(s3):\n        return False\n    dp = [False] * (n + 1)\n    dp[0] = True\n    for j in range(1, n + 1):\n        dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]\n    for i in range(1, m + 1):\n        dp[0] = dp[0] and s1[i - 1] == s3[i - 1]\n        for j in range(1, n + 1):\n            ch = s3[i + j - 1]\n            dp[j] = (dp[j] and s1[i - 1] == ch) or (dp[j - 1] and s2[j - 1] == ch)\n    return dp[n]\n"
  }
},
  "regular-expression-matching": {
  "problemId": "regular-expression-matching",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use 2D DP (or memoized recursion) on `(i, j)`: when `p[j + 1] == '*'`, either skip the `x*` pair (`j + 2`) or consume one matching char in `s` (`i + 1, j`).",
  "hints": [
    "`x*` can match ZERO occurrences of `x`.",
    "Memoize `(i, j)` pairs to avoid exponential branching.",
    "Boundary edge cases & complexity: Even when `i == len(s)`, remaining pattern like `a*b*` can still match empty string. Verify your solution strictly meets O(m * n) time and O(m * n) space limits."
  ],
  "approachTitle": "Top-Down Memoized Regex DP",
  "approachSteps": [
    "Define cached `dp(i, j)`.",
    "If `j == len(p)`, return `i == len(s)`.",
    "Check `first = i < len(s) and p[j] in (s[i], '.')`.",
    "If `j + 1 < len(p) and p[j + 1] == '*'`, return `dp(i, j + 2) or (first and dp(i + 1, j))`; else `first and dp(i + 1, j + 1)`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Even when `i == len(s)`, remaining pattern like `a*b*` can still match empty string."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from functools import lru_cache\n\ndef is_regex_match(s: str, p: str) -> bool:\n    m, n = len(s), len(p)\n    @lru_cache(None)\n    def dp(i, j):\n        if j == n:\n            return i == m\n        first = i < m and (p[j] == s[i] or p[j] == '.')\n        if j + 1 < n and p[j + 1] == '*':\n            return dp(i, j + 2) or (first and dp(i + 1, j))\n        return first and dp(i + 1, j + 1)\n    return dp(0, 0)\n"
  }
},
  "jump-game-ii": {
  "problemId": "jump-game-ii",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Perform implicit BFS levels across indices: track `cur_end` of the current jump and `farthest` reachable for the next jump; increment `jumps` whenever `i == cur_end`.",
  "hints": [
    "Only loop `i` up to `len(nums) - 2` because reaching `n - 1` needs no further jump.",
    "At `i == cur_end`, commit to `cur_end = farthest` and `jumps += 1`.",
    "Boundary edge cases & complexity: Stop the loop at `n - 2` so you don't count an extra jump at the final index. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Greedy Implicit-BFS Layer Sweep",
  "approachSteps": [
    "Initialize `jumps = cur_end = farthest = 0`.",
    "Loop `i` from `0` to `len(nums) - 2`: update `farthest = max(farthest, i + nums[i])`; if `i == cur_end`, increment `jumps` and set `cur_end = farthest`.",
    "Return `jumps`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Stop the loop at `n - 2` so you don't count an extra jump at the final index."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_jumps(nums: list[int]) -> int:\n    jumps = cur_end = farthest = 0\n    for i in range(len(nums) - 1):\n        if i + nums[i] > farthest:\n            farthest = i + nums[i]\n        if i == cur_end:\n            jumps += 1\n            cur_end = farthest\n    return jumps\n"
  }
},
  "candy-distribution": {
  "problemId": "candy-distribution",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Satisfy left-neighbor constraints in a forward pass, then satisfy right-neighbor constraints in a backward pass taking `max(candies[i], candies[i + 1] + 1)`.",
  "hints": [
    "Equal neighbors do NOT require equal candies (e.g. `[1, 2, 2]` -> `[1, 2, 1]`).",
    "Two opposite linear passes satisfy both left and right strict inequalities minimally.",
    "Boundary edge cases & complexity: In the backward pass use `max(.)` so you don't violate the forward-pass constraint. Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Two-Pass Left-Right Greedy",
  "approachSteps": [
    "Initialize `candies = [1] * n`.",
    "Forward pass: if `ratings[i] > ratings[i - 1]`, set `candies[i] = candies[i - 1] + 1`.",
    "Backward pass: if `ratings[i] > ratings[i + 1]`, set `candies[i] = max(candies[i], candies[i + 1] + 1)`.",
    "Return `sum(candies)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "In the backward pass use `max(...)` so you don't violate the forward-pass constraint."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_candies(ratings: list[int]) -> int:\n    n = len(ratings)\n    candies = [1] * n\n    for i in range(1, n):\n        if ratings[i] > ratings[i - 1]:\n            candies[i] = candies[i - 1] + 1\n    for i in range(n - 2, -1, -1):\n        if ratings[i] > ratings[i + 1]:\n            candies[i] = max(candies[i], candies[i + 1] + 1)\n    return sum(candies)\n"
  }
},
  "partition-labels": {
  "problemId": "partition-labels",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Record each character's last occurrence index; sweep forward extending `end = max(end, last[ch])` and cut a partition whenever `i == end`.",
  "hints": [
    "A partition containing character `c` must extend at least to `last[c]`.",
    "Once `i` reaches `end`, no character in the current part appears again later.",
    "Boundary edge cases & complexity: Update `start = i + 1` immediately after closing a partition. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Last-Occurrence Greedy Sweep",
  "approachSteps": [
    "Build `last = {ch: i for i, ch in enumerate(s)}`.",
    "Initialize `start = end = 0`, `res = []`.",
    "For `i, ch` in `enumerate(s)`: `end = max(end, last[ch])`; if `i == end`, append `end - start + 1` and set `start = i + 1`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Update `start = i + 1` immediately after closing a partition."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def partition_labels(s: str) -> list[int]:\n    last = {ch: i for i, ch in enumerate(s)}\n    res = []\n    start = end = 0\n    for i, ch in enumerate(s):\n        if last[ch] > end:\n            end = last[ch]\n        if i == end:\n            res.append(end - start + 1)\n            start = i + 1\n    return res\n"
  }
},
  "permutations-all": {
  "problemId": "permutations-all",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Swap each candidate into position `start`, recurse on `start + 1`, and swap back to restore state.",
  "hints": [
    "In-place swapping avoids allocating a `used` array.",
    "Record a copy `nums[:]` when `start == len(nums)`.",
    "Boundary edge cases & complexity: Always append a shallow copy `nums[:]`. Verify your solution strictly meets O(n * n!) time and O(n) stack space limits."
  ],
  "approachTitle": "In-Place Swap Backtracking",
  "approachSteps": [
    "Define `bt(start)`: if `start == n`, append `nums[:]`.",
    "For `i` in `range(start, n)`, swap `nums[start]` and `nums[i]`, recurse `bt(start + 1)`, swap back."
  ],
  "timeComplexity": "O(n * n!)",
  "spaceComplexity": "O(n) stack",
  "pitfalls": [
    "Always append a shallow copy `nums[:]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def permute(nums: list[int]) -> list[list[int]]:\n    res = []\n    arr = list(nums)\n    n = len(arr)\n    def bt(start):\n        if start == n:\n            res.append(arr[:])\n            return\n        for i in range(start, n):\n            arr[start], arr[i] = arr[i], arr[start]\n            bt(start + 1)\n            arr[start], arr[i] = arr[i], arr[start]\n    bt(0)\n    return res\n"
  }
},
  "letter-combinations-of-a-phone-number": {
  "problemId": "letter-combinations-of-a-phone-number",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Map digits `'2'`–`'9'` to their keypad letters and backtrack index by index building character combinations.",
  "hints": [
    "Remember to return `[]` (not `[\"\"]`) when `digits` is empty.",
    "7 maps to 4 letters (`pqrs`) and 9 maps to 4 letters (`wxyz`).",
    "Boundary edge cases & complexity: Empty `digits` must return `[]`, not `[\"\"]`. Verify your solution strictly meets O(4^n * n) time and O(n) stack space limits."
  ],
  "approachTitle": "Keypad Mapping Backtracking",
  "approachSteps": [
    "If `not digits`, return `[]`.",
    "Map `'2'..'9'` to keypad strings.",
    "Backtrack `bt(idx, path)` appending `''.join(path)` when `idx == len(digits)`."
  ],
  "timeComplexity": "O(4^n * n)",
  "spaceComplexity": "O(n) stack",
  "pitfalls": [
    "Empty `digits` must return `[]`, not `[\"\"]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def letter_combinations(digits: str) -> list[str]:\n    if not digits:\n        return []\n    pad = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}\n    res, path = [], []\n    def bt(i):\n        if i == len(digits):\n            res.append(\"\".join(path))\n            return\n        for ch in pad[digits[i]]:\n            path.append(ch)\n            bt(i + 1)\n            path.pop()\n    bt(0)\n    return res\n"
  }
},
  "generate-parentheses": {
  "problemId": "generate-parentheses",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Backtrack tracking `open_cnt` and `close_cnt`: add `'('` whenever `open_cnt < n`, and add `')'` whenever `close_cnt < open_cnt`.",
  "hints": [
    "Never place a closing parenthesis if `close_cnt == open_cnt`.",
    "Emit when `len(path) == 2 * n`.",
    "Boundary edge cases & complexity: Checking `c < n` instead of `c < o` generates invalid sequences like `\")(\"`. Verify your solution strictly meets O(4^n / sqrt(n)) time and O(n) stack space limits."
  ],
  "approachTitle": "Constrained Open/Close Backtracking",
  "approachSteps": [
    "Define `bt(o, c)`: if `len(path) == 2 * n`, append `''.join(path)`.",
    "If `o < n`, push `'('`, recurse `bt(o + 1, c)`, pop.",
    "If `c < o`, push `')'`, recurse `bt(o, c + 1)`, pop."
  ],
  "timeComplexity": "O(4^n / sqrt(n))",
  "spaceComplexity": "O(n) stack",
  "pitfalls": [
    "Checking `c < n` instead of `c < o` generates invalid sequences like `\")(\"`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def generate_parenthesis(n: int) -> list[str]:\n    res, path = [], []\n    def bt(o, c):\n        if len(path) == 2 * n:\n            res.append(\"\".join(path))\n            return\n        if o < n:\n            path.append('(')\n            bt(o + 1, c)\n            path.pop()\n        if c < o:\n            path.append(')')\n            bt(o, c + 1)\n            path.pop()\n    bt(0, 0)\n    return res\n"
  }
},
  "word-search-grid": {
  "problemId": "word-search-grid",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run DFS backtracking from every cell matching `word[0]`, temporarily marking visited cells `'#'` and restoring them on backtrack.",
  "hints": [
    "Mark `board[r][c] = '#'` before recursing to neighbors and restore it afterward.",
    "Return `True` immediately when `idx == len(word)`.",
    "Boundary edge cases & complexity: Always restore `board[r][c]` before returning from DFS. Verify your solution strictly meets O(m * n * 3^L) time and O(L) stack space limits."
  ],
  "approachTitle": "In-Place Grid DFS Backtracking",
  "approachSteps": [
    "Loop over all `(r, c)`; if `dfs(r, c, 0)` succeeds, return `True`.",
    "In `dfs(r, c, i)`: check bounds and `board[r][c] == word[i]`, temporarily mark `'#'`, recurse 4 neighbors for `i + 1`, restore."
  ],
  "timeComplexity": "O(m * n * 3^L)",
  "spaceComplexity": "O(L) stack",
  "pitfalls": [
    "Always restore `board[r][c]` before returning from DFS."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def exist_word(board: list[list[str]], word: str) -> bool:\n    m, n = len(board), len(board[0])\n    def dfs(r, c, i):\n        if i == len(word):\n            return True\n        if not (0 <= r < m and 0 <= c < n) or board[r][c] != word[i]:\n            return False\n        ch = board[r][c]\n        board[r][c] = '#'\n        found = any(dfs(r + dr, c + dc, i + 1) for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)))\n        board[r][c] = ch\n        return found\n    return any(dfs(r, c, 0) for r in range(m) for c in range(n))\n"
  }
},
  "find-median-from-data-stream": {
  "problemId": "find-median-from-data-stream",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a max-heap `lo` for the smaller half and a min-heap `hi` for the larger half balanced so `len(lo) >= len(hi)` and `len(lo) - len(hi) <= 1`.",
  "hints": [
    "In Python, simulate a max-heap by storing negated values `-x`.",
    "Always push to `lo`, move `lo`'s max to `hi`, and rebalance back to `lo` if `len(hi) > len(lo)`.",
    "Boundary edge cases & complexity: Remember to negate values when pushing/popping from the max-heap `lo`. Verify your solution strictly meets O(log n) add, O(1) median time and O(n) space limits."
  ],
  "approachTitle": "Balanced Two-Heap Streaming Median",
  "approachSteps": [
    "Initialize max-heap `lo` (negated) and min-heap `hi`.",
    "On `addNum(x)`: push `-x` to `lo`, push `-heappop(lo)` to `hi`; if `len(hi) > len(lo)`, push `-heappop(hi)` to `lo`.",
    "On `findMedian`: return `float(-lo[0])` if `len(lo) > len(hi)` else `(-lo[0] + hi[0]) / 2.0`."
  ],
  "timeComplexity": "O(log n) add, O(1) median",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Remember to negate values when pushing/popping from the max-heap `lo`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef run_median_finder(ops: list[list]) -> list[float]:\n    lo, hi, out = [], [], []\n    for op in ops:\n        if op[0] == 'addNum':\n            heapq.heappush(lo, -op[1])\n            heapq.heappush(hi, -heapq.heappop(lo))\n            if len(hi) > len(lo):\n                heapq.heappush(lo, -heapq.heappop(hi))\n        else:\n            if len(lo) > len(hi):\n                out.append(float(-lo[0]))\n            else:\n                out.append((-lo[0] + hi[0]) / 2.0)\n    return out\n"
  }
},
  "number-of-1-bits": {
  "problemId": "number-of-1-bits",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Repeatedly clear the lowest set bit with `n &= n - 1` until `n == 0`, counting iterations (Brian Kernighan's algorithm).",
  "hints": [
    "`n & (n - 1)` turns off the rightmost `1` bit in `n`.",
    "The loop runs only once per set bit rather than 32 times.",
    "Boundary edge cases & complexity: Handle `n == 0` returning `0`. Verify your solution strictly meets O(k) where k <= 32 time and O(1) space limits."
  ],
  "approachTitle": "Brian Kernighan Bit-Clearing Loop",
  "approachSteps": [
    "Initialize `cnt = 0`.",
    "While `n`: set `n &= n - 1` and `cnt += 1`.",
    "Return `cnt`."
  ],
  "timeComplexity": "O(k) where k <= 32",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle `n == 0` returning `0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def hamming_weight(n: int) -> int:\n    cnt = 0\n    while n:\n        n &= n - 1\n        cnt += 1\n    return cnt\n"
  }
},
  "power-of-two": {
  "problemId": "power-of-two",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "A positive integer is a power of two iff it has exactly one set bit, which holds iff `n > 0 and (n & (n - 1)) == 0`.",
  "hints": [
    "Zero and negative numbers are never powers of two.",
    "Clearing the single set bit of a power of two leaves `0`.",
    "Boundary edge cases & complexity: Forgetting `n > 0` falsely returns `True` for `n = 0`. Verify your solution strictly meets O(1) time and O(1) space limits."
  ],
  "approachTitle": "Single-Bit O(1) Bitwise Check",
  "approachSteps": [
    "Check `n > 0 and (n & (n - 1)) == 0`."
  ],
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Forgetting `n > 0` falsely returns `True` for `n = 0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def is_power_of_two(n: int) -> bool:\n    return n > 0 and (n & (n - 1)) == 0\n"
  }
},
  "missing-sequence-number": {
  "problemId": "missing-sequence-number",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Subtract `sum(nums)` from Gauss's formula `n * (n + 1) // 2` (or XOR all indices `0..n` with all values).",
  "hints": [
    "Conceptual Intuition: Consider a Gauss Sum Difference paradigm. Subtract `sum(nums)` from Gauss's formula `n * (n + 1) // 2` (or XOR all indices `0.n` with all values).",
    "Algorithmic Mechanics: The sum of `0.n` is `n * (n + 1) // 2`. Compute `n = len(nums)` and return `n * (n + 1) // 2 - sum(nums)`.",
    "Edge Cases & Optimization: Use XOR in fixed-width 32-bit languages if `n` could overflow `n*(n+1)`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Gauss Sum Difference",
  "approachSteps": [
    "Compute `n = len(nums)` and return `n * (n + 1) // 2 - sum(nums)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Use XOR in fixed-width 32-bit languages if `n` could overflow `n*(n+1)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def missing_number(nums: list[int]) -> int:\n    n = len(nums)\n    return n * (n + 1) // 2 - sum(nums)\n"
  }
},
  "squares-of-sorted-array": {
  "problemId": "squares-of-sorted-array",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "The largest square always sits at one of the two ends `l` or `r`; fill the output array from back to front using two pointers.",
  "hints": [
    "Conceptual Intuition: Consider a Outward-In Two-Pointer Fill paradigm. The largest square always sits at one of the two ends `l` or `r`; fill the output array from back to front using two pointers.",
    "Algorithmic Mechanics: Compare `abs(nums[l])` and `abs(nums[r])`. Fill `res[pos]` from `n - 1` down to `0` picking the larger square from ends.",
    "Edge Cases & Optimization: Fill backward so no reversal is needed. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Outward-In Two-Pointer Fill",
  "approachSteps": [
    "Fill `res[pos]` from `n - 1` down to `0` picking the larger square from ends."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Fill backward so no reversal is needed."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def sorted_squares(nums: list[int]) -> list[int]:\n    n = len(nums); res = [0] * n\n    l, r = 0, n - 1\n    for p in range(n - 1, -1, -1):\n        if abs(nums[l]) > abs(nums[r]): res[p] = nums[l] * nums[l]; l += 1\n        else: res[p] = nums[r] * nums[r]; r -= 1\n    return res\n"
  }
},
  "lemonade-change-counter": {
  "problemId": "lemonade-change-counter",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track counts of `$5` and `$10` bills; for `$20`, greedily hand out `($10 + $5)` before `(3 * $5)` to preserve flexible `$5` bills.",
  "hints": [
    "Conceptual Intuition: Consider a Greedy Denomination Conservation paradigm. Track counts of `$5` and `$10` bills; for `$20`, greedily hand out `($10 + $5)` before `(3 * $5)` to preserve flexible `$5` bills.",
    "Algorithmic Mechanics: `$5` bills are strictly more versatile than `$10` bills. Track `five, ten`; process each bill returning `False` if change cannot be made.",
    "Edge Cases & Optimization: Always prefer giving `$10 + $5` over three `$5`s for a `$20` bill. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Greedy Denomination Conservation",
  "approachSteps": [
    "Track `five, ten`; process each bill returning `False` if change cannot be made."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Always prefer giving `$10 + $5` over three `$5`s for a `$20` bill."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def lemonade_change(bills: list[int]) -> bool:\n    f = t = 0\n    for b in bills:\n        if b == 5: f += 1\n        elif b == 10:\n            if not f: return False\n            f -= 1; t += 1\n        else:\n            if t and f: t -= 1; f -= 1\n            elif f >= 3: f -= 3\n            else: return False\n    return True\n"
  }
},
  "can-place-flowers-beds": {
  "problemId": "can-place-flowers-beds",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Greedily plant at the leftmost plot `i` where `bed[i] == 0` and both adjacent plots (if in bounds) are `0`.",
  "hints": [
    "Conceptual Intuition: Consider a Left-to-Right Greedy Planting paradigm. Greedily plant at the leftmost plot `i` where `bed[i] == 0` and both adjacent plots (if in bounds) are `0`.",
    "Algorithmic Mechanics: Mark `bed[i] = 1` upon planting so the next index sees it. Scan `bed`, plant whenever left/self/right are 0, return `placed >= n`.",
    "Edge Cases & Optimization: Handle `n == 0` returning `True`. Ensure time complexity is bounded to O(m) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Left-to-Right Greedy Planting",
  "approachSteps": [
    "Scan `bed`, plant whenever left/self/right are 0, return `placed >= n`."
  ],
  "timeComplexity": "O(m)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle `n == 0` returning `True`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def can_place_flowers(bed: list[int], n: int) -> bool:\n    b = list(bed); m = len(b); placed = 0\n    for i in range(m):\n        if b[i] == 0 and (i == 0 or b[i - 1] == 0) and (i == m - 1 or b[i + 1] == 0):\n            b[i] = 1; placed += 1\n    return placed >= n\n"
  }
},
  "three-sum-closest-target": {
  "problemId": "three-sum-closest-target",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort `nums`, fix `i`, and converge two pointers `l, r` updating `best` whenever `abs(s - target) < abs(best - target)`.",
  "hints": [
    "Conceptual Intuition: Consider a Sorted Two-Pointer Closest Search paradigm. Sort `nums`, fix `i`, and converge two pointers `l, r` updating `best` whenever `abs(s - target) < abs(best - target)`.",
    "Algorithmic Mechanics: Return `target` immediately on an exact match. Sort `nums`, run outer loop + two pointers tracking closest sum.",
    "Edge Cases & Optimization: Initialize `best = nums[0] + nums[1] + nums[2]`. Ensure time complexity is bounded to O(n^2) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Sorted Two-Pointer Closest Search",
  "approachSteps": [
    "Sort `nums`, run outer loop + two pointers tracking closest sum."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Initialize `best = nums[0] + nums[1] + nums[2]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def three_sum_closest(nums: list[int], target: int) -> int:\n    a = sorted(nums); n = len(a); best = a[0] + a[1] + a[2]\n    for i in range(n - 2):\n        l, r = i + 1, n - 1\n        while l < r:\n            s = a[i] + a[l] + a[r]\n            if abs(s - target) < abs(best - target): best = s\n            if s == target: return target\n            if s < target: l += 1\n            else: r -= 1\n    return best\n"
  }
},
  "continuous-subarray-sum-multiple-k": {
  "problemId": "continuous-subarray-sum-multiple-k",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Record the earliest index where each `prefix_sum % k` appears; if a remainder repeats at distance `i - first[rem] >= 2`, return `True`.",
  "hints": [
    "Conceptual Intuition: Consider a Earliest-Remainder Hash Map paradigm. Record the earliest index where each `prefix_sum % k` appears; if a remainder repeats at distance `i - first[rem] >= 2`, return `True`.",
    "Algorithmic Mechanics: Seed `first = {0: -1}` and never overwrite an existing remainder's earliest index. Track `rem = (rem + x) % k`; if seen and `i - first[rem] >= 2`, return `True`.",
    "Edge Cases & Optimization: Length must be at least 2 (`i - first[rem] >= 2`). Ensure time complexity is bounded to O(n) with O(min(n, k)) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Earliest-Remainder Hash Map",
  "approachSteps": [
    "Track `rem = (rem + x) % k`; if seen and `i - first[rem] >= 2`, return `True`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(min(n, k))",
  "pitfalls": [
    "Length must be at least 2 (`i - first[rem] >= 2`)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def check_subarray_sum(nums: list[int], k: int) -> bool:\n    first = {0: -1}; rem = 0\n    for i, x in enumerate(nums):\n        rem = (rem + x) % k\n        if rem in first:\n            if i - first[rem] >= 2: return True\n        else: first[rem] = i\n    return False\n"
  }
},
  "max-points-from-cards": {
  "problemId": "max-points-from-cards",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Taking `k` cards from both ends leaves a contiguous unchosen window of length `n - k`; minimize that window's sum and subtract from `sum(cards)`.",
  "hints": [
    "Conceptual Intuition: Consider a Complement Fixed-Size Sliding Window paradigm. Taking `k` cards from both ends leaves a contiguous unchosen window of length `n - k`; minimize that window's sum and subtract from `sum(cards)`.",
    "Algorithmic Mechanics: Equivalently, start with the first `k` cards and swap left-prefix cards for right-suffix cards one by one. Find min sum of any contiguous `n - k` subarray; return `total - min_window`.",
    "Edge Cases & Optimization: Handle `k == len(cards)` returning `sum(cards)`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Complement Fixed-Size Sliding Window",
  "approachSteps": [
    "Find min sum of any contiguous `n - k` subarray; return `total - min_window`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle `k == len(cards)` returning `sum(cards)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def max_card_score(cards: list[int], k: int) -> int:\n    cur = best = sum(cards[:k])\n    for i in range(1, k + 1):\n        cur += cards[-i] - cards[k - i]\n        if cur > best: best = cur\n    return best\n"
  }
},
  "min-ops-reduce-x-to-zero": {
  "problemId": "min-ops-reduce-x-to-zero",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Find the longest contiguous middle subarray summing to `sum(nums) - x` via sliding window, and return `n - max_len`.",
  "hints": [
    "Conceptual Intuition: Consider a Longest-Middle-Subarray Sliding Window paradigm. Find the longest contiguous middle subarray summing to `sum(nums) - x` via sliding window, and return `n - max_len`.",
    "Algorithmic Mechanics: If `target = sum(nums) - x < 0`, return `-1`; if `target == 0`, return `len(nums)`. Slide window targeting `sum(nums) - x`, track longest match `best`, return `n - best`.",
    "Edge Cases & Optimization: Return `-1` if no middle subarray equals `target`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Longest-Middle-Subarray Sliding Window",
  "approachSteps": [
    "Slide window targeting `sum(nums) - x`, track longest match `best`, return `n - best`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Return `-1` if no middle subarray equals `target`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_operations_x(nums: list[int], x: int) -> int:\n    tgt = sum(nums) - x\n    if tgt < 0: return -1\n    if tgt == 0: return len(nums)\n    l = cur = 0; best = -1\n    for r, v in enumerate(nums):\n        cur += v\n        while cur > tgt: cur -= nums[l]; l += 1\n        if cur == tgt and r - l + 1 > best: best = r - l + 1\n    return -1 if best == -1 else len(nums) - best\n"
  }
},
  "next-greater-element-circular": {
  "problemId": "next-greater-element-circular",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Iterate `2 * n` steps using `i % n` with a decreasing monotonic stack of indices, pushing indices only during the first pass (`i < n`).",
  "hints": [
    "Conceptual Intuition: Consider a Double-Pass Circular Monotonic Stack paradigm. Iterate `2 * n` steps using `i % n` with a decreasing monotonic stack of indices, pushing indices only during the first pass (`i < n`).",
    "Algorithmic Mechanics: Two passes over the array simulate circular wrap-around without duplicating memory. Loop `i in range(2 * n)`: pop indices with `nums[idx] < nums[i % n]` setting `ans[idx] = nums[i % n]`; push `i` if `i < n`.",
    "Edge Cases & Optimization: Only push indices when `i < n`. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Double-Pass Circular Monotonic Stack",
  "approachSteps": [
    "Loop `i in range(2 * n)`: pop indices with `nums[idx] < nums[i % n]` setting `ans[idx] = nums[i % n]`; push `i` if `i < n`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Only push indices when `i < n`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def next_greater_circular(nums: list[int]) -> list[int]:\n    n = len(nums); ans = [-1] * n; st = []\n    for i in range(2 * n):\n        v = nums[i % n]\n        while st and nums[st[-1]] < v: ans[st.pop()] = v\n        if i < n: st.append(i)\n    return ans\n"
  }
},
  "pattern-132-detector": {
  "problemId": "pattern-132-detector",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Scan right-to-left maintaining a decreasing stack of candidate `3`s and tracking the largest popped `2` (`third`); if any element is `< third`, we found `1 < 2 < 3`.",
  "hints": [
    "Conceptual Intuition: Consider a Right-to-Left Monotonic Stack paradigm. Scan right-to-left maintaining a decreasing stack of candidate `3`s and tracking the largest popped `2` (`third`); if any element is `< third`, we found `1 < 2 < 3`.",
    "Algorithmic Mechanics: Popping smaller elements from the right stack guarantees there is a larger `3` to their left. Initialize `st = []`, `third = -inf`; scan reversed `nums`: if `x < third` return `True`; pop `< x` updating `third`; push `x`.",
    "Edge Cases & Optimization: Strict inequality `<` is required for both `1 < 2` and `2 < 3`. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Right-to-Left Monotonic Stack",
  "approachSteps": [
    "Initialize `st = []`, `third = -inf`; scan reversed `nums`: if `x < third` return `True`; pop `< x` updating `third`; push `x`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Strict inequality `<` is required for both `1 < 2` and `2 < 3`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_132_pattern(nums: list[int]) -> bool:\n    st, third = [], float('-inf')\n    for x in reversed(nums):\n        if x < third: return True\n        while st and st[-1] < x: third = st.pop()\n        st.append(x)\n    return False\n"
  }
},
  "k-closest-points-origin": {
  "problemId": "k-closest-points-origin",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Compare squared distances `x*x + y*y` (avoiding square roots) using a size-`k` max-heap or `heapq.nsmallest`.",
  "hints": [
    "Conceptual Intuition: Consider a Squared-Distance Heap Selection paradigm. Compare squared distances `x*x + y*y` (avoiding square roots) using a size-`k` max-heap or `heapq.nsmallest`.",
    "Algorithmic Mechanics: Squared distance preserves exact Euclidean ordering. Select `k` points minimizing `x*x + y*y`.",
    "Edge Cases & Optimization: No floating-point `sqrt` is needed. Ensure time complexity is bounded to O(n log k) with O(k) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Squared-Distance Heap Selection",
  "approachSteps": [
    "Select `k` points minimizing `x*x + y*y`."
  ],
  "timeComplexity": "O(n log k)",
  "spaceComplexity": "O(k)",
  "pitfalls": [
    "No floating-point `sqrt` is needed."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef k_closest_points(points: list[list[int]], k: int) -> list[list[int]]:\n    return heapq.nsmallest(k, points, key=lambda p: p[0] * p[0] + p[1] * p[1])\n"
  }
},
  "reorganize-string-no-adjacent": {
  "problemId": "reorganize-string-no-adjacent",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "A valid no-adjacent-duplicate rearrangement exists iff the maximum character frequency is at most `(len(s) + 1) // 2`.",
  "hints": [
    "Conceptual Intuition: Consider a Pigeonhole Max-Frequency Bound paradigm. A valid no-adjacent-duplicate rearrangement exists iff the maximum character frequency is at most `(len(s) + 1) // 2`.",
    "Algorithmic Mechanics: Even indices `0, 2, 4, .` hold at most `(n + 1) // 2` copies of the most frequent letter. Count letters; return `max(counts.values()) <= (len(s) + 1) // 2`.",
    "Edge Cases & Optimization: Use `(len(s) + 1) // 2`, not `len(s) // 2`, to handle odd lengths. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Pigeonhole Max-Frequency Bound",
  "approachSteps": [
    "Count letters; return `max(counts.values()) <= (len(s) + 1) // 2`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Use `(len(s) + 1) // 2`, not `len(s) // 2`, to handle odd lengths."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import Counter\n\ndef can_reorganize_string(s: str) -> bool:\n    return max(Counter(s).values()) <= (len(s) + 1) // 2\n"
  }
},
  "shortest-subarray-sum-at-least-k": {
  "problemId": "shortest-subarray-sum-at-least-k",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Build prefix sums `P` and maintain an increasing monotonic deque of candidate start indices: pop from front while `P[i] - P[dq[0]] >= k`, and pop from back while `P[dq[-1]] >= P[i]`.",
  "hints": [
    "Negative numbers break standard sliding window.",
    "A larger earlier prefix sum is strictly dominated by a smaller later prefix sum.",
    "Boundary edge cases & complexity: Include `P[0] = 0` so subarrays starting at index 0 are considered. Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Prefix Sum + Monotonic Increasing Deque",
  "approachSteps": [
    "Build `P` of length `n + 1`; iterate `i` popping valid starts from front and dominated prefixes from back."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Include `P[0] = 0` so subarrays starting at index 0 are considered."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef shortest_subarray_k(nums: list[int], k: int) -> int:\n    n = len(nums); P = [0] * (n + 1)\n    for i, x in enumerate(nums): P[i + 1] = P[i] + x\n    dq = deque(); best = n + 1\n    for i, p in enumerate(P):\n        while dq and p - P[dq[0]] >= k: best = min(best, i - dq.popleft())\n        while dq and P[dq[-1]] >= p: dq.pop()\n        dq.append(i)\n    return -1 if best > n else best\n"
  }
},
  "min-refueling-stops-highway": {
  "problemId": "min-refueling-stops-highway",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Push passed stations' fuel capacities into a max-heap; whenever fuel runs dry before the next milestone, retroactively refuel from the largest passed station.",
  "hints": [
    "Conceptual Intuition: Consider a Retroactive Max-Heap Greedy Refueling paradigm. Push passed stations' fuel capacities into a max-heap; whenever fuel runs dry before the next milestone, retroactively refuel from the largest passed station.",
    "Algorithmic Mechanics: Append `[target, 0]` as a final sentinel station. Track `reach = start_fuel`; before each station `pos`, pop max-heap while `reach < pos`, increment `stops`, push `fuel`.",
    "Edge Cases & Optimization: Return `-1` if heap empties while `reach < pos`. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Retroactive Max-Heap Greedy Refueling",
  "approachSteps": [
    "Track `reach = start_fuel`; before each station `pos`, pop max-heap while `reach < pos`, increment `stops`, push `fuel`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Return `-1` if heap empties while `reach < pos`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef min_refuel_stops(target: int, start_fuel: int, stations: list[list[int]]) -> int:\n    h, reach, stops = [], start_fuel, 0\n    for pos, fuel in stations + [[target, 0]]:\n        while reach < pos:\n            if not h: return -1\n            reach += -heapq.heappop(h); stops += 1\n        heapq.heappush(h, -fuel)\n    return stops\n"
  }
},
  "ipo-maximize-capital": {
  "problemId": "ipo-maximize-capital",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort projects by required capital ascending; in each of `k` rounds push all newly affordable projects into a max-heap by profit and greedily pick the top profit.",
  "hints": [
    "Conceptual Intuition: Consider a Capital-Sorted + Profit Max-Heap paradigm. Sort projects by required capital ascending; in each of `k` rounds push all newly affordable projects into a max-heap by profit and greedily pick the top profit.",
    "Algorithmic Mechanics: Break early if the max-heap is empty. Sort `(cap, prof)`, unlock affordable projects into max-heap, pop max up to `k` times.",
    "Edge Cases & Optimization: `k` can exceed `len(profits)`; break when the heap is empty. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Capital-Sorted + Profit Max-Heap",
  "approachSteps": [
    "Sort `(cap, prof)`, unlock affordable projects into max-heap, pop max up to `k` times."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "`k` can exceed `len(profits)`; break when the heap is empty."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef find_maximized_capital(k: int, w: int, profits: list[int], capital: list[int]) -> int:\n    proj = sorted(zip(capital, profits))\n    h, i, n = [], 0, len(proj)\n    for _ in range(k):\n        while i < n and proj[i][0] <= w:\n            heapq.heappush(h, -proj[i][1]); i += 1\n        if not h: break\n        w += -heapq.heappop(h)\n    return w\n"
  }
},
  "subarrays-with-k-different-integers": {
  "problemId": "subarrays-with-k-different-integers",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Count subarrays with `exactly K` distinct values as `at_most(K) - at_most(K - 1)` using a linear sliding window.",
  "hints": [
    "Conceptual Intuition: Consider a At-Most-K Difference Sliding Window paradigm. Count subarrays with `exactly K` distinct values as `at_most(K) - at_most(K - 1)` using a linear sliding window.",
    "Algorithmic Mechanics: `at_most(m)` adds `r - l + 1` at each right endpoint once `len(counts) <= m`. Define `at_most(m)` and return `at_most(k) - at_most(k - 1)`.",
    "Edge Cases & Optimization: Return `0` in `at_most(0)`. Ensure time complexity is bounded to O(n) with O(k) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "At-Most-K Difference Sliding Window",
  "approachSteps": [
    "Define `at_most(m)` and return `at_most(k) - at_most(k - 1)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(k)",
  "pitfalls": [
    "Return `0` in `at_most(0)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict\n\ndef subarrays_with_k_distinct(nums: list[int], k: int) -> int:\n    def at_most(m):\n        if m == 0: return 0\n        cnt = defaultdict(int); l = ans = 0\n        for r, x in enumerate(nums):\n            cnt[x] += 1\n            while len(cnt) > m:\n                lx = nums[l]; cnt[lx] -= 1\n                if cnt[lx] == 0: del cnt[lx]\n                l += 1\n            ans += r - l + 1\n        return ans\n    return at_most(k) - at_most(k - 1)\n"
  }
},
  "course-schedule-iii-deadlines": {
  "problemId": "course-schedule-iii-deadlines",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort courses by deadline ascending, add each course's duration to `time` and a max-heap, and whenever `time > deadline` drop the longest course taken so far.",
  "hints": [
    "Conceptual Intuition: Consider a Deadline-Sorted Regret Max-Heap paradigm. Sort courses by deadline ascending, add each course's duration to `time` and a max-heap, and whenever `time > deadline` drop the longest course taken so far.",
    "Algorithmic Mechanics: Dropping the longest course never reduces course count and maximizes remaining time for later deadlines. Sort by `last_day`; push `-dur`, add `dur` to `t`; if `t > last_day`, subtract `-heappop(h)`.",
    "Edge Cases & Optimization: Even a single course with `dur > last_day` gets pushed and immediately popped, keeping `len(h)` exact. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Deadline-Sorted Regret Max-Heap",
  "approachSteps": [
    "Sort by `last_day`; push `-dur`, add `dur` to `t`; if `t > last_day`, subtract `-heappop(h)`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Even a single course with `dur > last_day` gets pushed and immediately popped, keeping `len(h)` exact."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef schedule_max_courses(courses: list[list[int]]) -> int:\n    h, t = [], 0\n    for d, end in sorted(courses, key=lambda x: x[1]):\n        t += d; heapq.heappush(h, -d)\n        if t > end: t += heapq.heappop(h)\n    return len(h)\n"
  }
},
  "patching-array-min-additions": {
  "problemId": "patching-array-min-additions",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain `miss` = smallest unformable sum (`1` initially); if `nums[i] <= miss`, extend `miss += nums[i]`, else patch with `miss` itself (`miss += miss`).",
  "hints": [
    "Conceptual Intuition: Consider a Greedy Reach-Doubling Patch paradigm. Maintain `miss` = smallest unformable sum (`1` initially); if `nums[i] <= miss`, extend `miss += nums[i]`, else patch with `miss` itself (`miss += miss`).",
    "Algorithmic Mechanics: If `[1, miss)` is covered, adding `miss` extends coverage maximally to `[1, 2 * miss)`. While `miss <= n`: consume `nums[i]` if `<= miss`, else add patch `miss` and double `miss`.",
    "Edge Cases & Optimization: Use 64-bit `miss` in Java/C++ since `miss` can exceed `2^31 - 1`. Ensure time complexity is bounded to O(m + log n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Greedy Reach-Doubling Patch",
  "approachSteps": [
    "While `miss <= n`: consume `nums[i]` if `<= miss`, else add patch `miss` and double `miss`."
  ],
  "timeComplexity": "O(m + log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Use 64-bit `miss` in Java/C++ since `miss` can exceed `2^31 - 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_patches(nums: list[int], n: int) -> int:\n    miss, i, patches = 1, 0, 0\n    while miss <= n:\n        if i < len(nums) and nums[i] <= miss:\n            miss += nums[i]; i += 1\n        else:\n            miss += miss; patches += 1\n    return patches\n"
  }
},
  "max-frequency-stack-design": {
  "problemId": "max-frequency-stack-design",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Map each frequency `f` to a stack of elements that reached frequency `f`, tracking `max_freq` for O(1) push and pop.",
  "hints": [
    "Conceptual Intuition: Consider a Frequency-Tiered Stack Map paradigm. Map each frequency `f` to a stack of elements that reached frequency `f`, tracking `max_freq` for O(1) push and pop.",
    "Algorithmic Mechanics: Decrement `max_freq` when `group[max_freq]` becomes empty. On `push(x)`: increment `freq[x]`, push `x` to `group[freq[x]]`, update `max_freq`. On `pop()`: pop from `group[max_freq]`, decrement `freq[x]`, decrement `max_freq` if bucket empty.",
    "Edge Cases & Optimization: Remember to decrement `freq[x]` on pop. Ensure time complexity is bounded to O(1) per op with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Frequency-Tiered Stack Map",
  "approachSteps": [
    "On `push(x)`: increment `freq[x]`, push `x` to `group[freq[x]]`, update `max_freq`.",
    "On `pop()`: pop from `group[max_freq]`, decrement `freq[x]`, decrement `max_freq` if bucket empty."
  ],
  "timeComplexity": "O(1) per op",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Remember to decrement `freq[x]` on pop."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict\n\ndef run_freq_stack(ops: list[list]) -> list[int]:\n    freq, group = defaultdict(int), defaultdict(list)\n    mf, out = 0, []\n    for op in ops:\n        if op[0] == 'push':\n            x = op[1]; freq[x] += 1; f = freq[x]\n            if f > mf: mf = f\n            group[f].append(x)\n        else:\n            x = group[mf].pop(); freq[x] -= 1\n            if not group[mf]: mf -= 1\n            out.append(x)\n    return out\n"
  }
},
  "min-cost-to-hire-k-workers": {
  "problemId": "min-cost-to-hire-k-workers",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort workers by `wage / quality` ratio ascending and maintain the `k` smallest qualities in a max-heap; at each worker the team cost is `ratio * sum_k_qualities`.",
  "hints": [
    "Conceptual Intuition: Consider a Ratio-Sorted Quality Max-Heap paradigm. Sort workers by `wage / quality` ratio ascending and maintain the `k` smallest qualities in a max-heap; at each worker the team cost is `ratio * sum_k_qualities`.",
    "Algorithmic Mechanics: The highest `wage / quality` ratio in a chosen group sets the unit rate for everyone in the group. Sort by `w / q`; maintain size-`k` max-heap of `q` and running `qsum`; minimize `ratio * qsum`.",
    "Edge Cases & Optimization: Round final float to 5 decimal places. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Ratio-Sorted Quality Max-Heap",
  "approachSteps": [
    "Sort by `w / q`; maintain size-`k` max-heap of `q` and running `qsum`; minimize `ratio * qsum`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Round final float to 5 decimal places."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef min_hire_cost(quality: list[int], wage: list[int], k: int) -> float:\n    workers = sorted((w / q, q) for q, w in zip(quality, wage))\n    h, qsum, best = [], 0, float('inf')\n    for ratio, q in workers:\n        heapq.heappush(h, -q); qsum += q\n        if len(h) > k: qsum += heapq.heappop(h)\n        if len(h) == k and ratio * qsum < best: best = ratio * qsum\n    return round(best, 5)\n"
  }
},
  "min-cost-climbing-stairs": {
  "problemId": "min-cost-climbing-stairs",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track the minimum cost to stand at `i - 2` and `i - 1`, advancing `a, b = b, min(a + cost[i-2], b + cost[i-1])`.",
  "hints": [
    "Conceptual Intuition: Consider a O(1)-Space Linear DP paradigm. Track the minimum cost to stand at `i - 2` and `i - 1`, advancing `a, b = b, min(a + cost[i-2], b + cost[i-1])`.",
    "Algorithmic Mechanics: Standing on step 0 or step 1 initially costs 0 before paying to jump from it. Start `a = b = 0`, iterate `i` from `2` to `n`, return `b`.",
    "Edge Cases & Optimization: The top is at index `len(cost)`, not `len(cost) - 1`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "O(1)-Space Linear DP",
  "approachSteps": [
    "Start `a = b = 0`, iterate `i` from `2` to `n`, return `b`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "The top is at index `len(cost)`, not `len(cost) - 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_cost_stairs(cost: list[int]) -> int:\n    a = b = 0\n    for i in range(2, len(cost) + 1):\n        a, b = b, min(a + cost[i - 2], b + cost[i - 1])\n    return b\n"
  }
},
  "happy-number-cycle": {
  "problemId": "happy-number-cycle",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track visited sums in a set (or use Floyd's cycle detector) until `n == 1` or a value repeats.",
  "hints": [
    "Conceptual Intuition: Consider a Cycle Detection Set paradigm. Track visited sums in a set (or use Floyd's cycle detector) until `n == 1` or a value repeats.",
    "Algorithmic Mechanics: Digit-square sums quickly shrink below 1000 so cycles are tiny. Loop replacing `n` with sum of squared digits until `n == 1` or `n in seen`.",
    "Edge Cases & Optimization: Stop as soon as `n == 1`. Ensure time complexity is bounded to O(log n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Cycle Detection Set",
  "approachSteps": [
    "Loop replacing `n` with sum of squared digits until `n == 1` or `n in seen`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Stop as soon as `n == 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def is_happy(n: int) -> bool:\n    seen = set()\n    while n != 1 and n not in seen:\n        seen.add(n)\n        s = 0\n        while n:\n            n, d = divmod(n, 10); s += d * d\n        n = s\n    return n == 1\n"
  }
},
  "plus-one-digit-array": {
  "problemId": "plus-one-digit-array",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Scan backward from the least-significant digit: if `< 9`, increment and return; else set to `0` and continue, prepending `1` if all digits were `9`.",
  "hints": [
    "Conceptual Intuition: Consider a Right-to-Left Carry Propagation paradigm. Scan backward from the least-significant digit: if `< 9`, increment and return; else set to `0` and continue, prepending `1` if all digits were `9`.",
    "Algorithmic Mechanics: Only all-9 arrays grow in length. Scan right-to-left incrementing first `< 9` digit; if all `9`, return `[1] + [0] * n`.",
    "Edge Cases & Optimization: Handle `[9]` -> `[1, 0]`. Ensure time complexity is bounded to O(n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Right-to-Left Carry Propagation",
  "approachSteps": [
    "Scan right-to-left incrementing first `< 9` digit; if all `9`, return `[1] + [0] * n`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Handle `[9]` -> `[1, 0]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def plus_one(digits: list[int]) -> list[int]:\n    res = list(digits)\n    for i in range(len(res) - 1, -1, -1):\n        if res[i] < 9: res[i] += 1; return res\n        res[i] = 0\n    return [1] + res\n"
  }
},
  "excel-sheet-column-number": {
  "problemId": "excel-sheet-column-number",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Evaluate `col` as a bijective base-26 number: `ans = ans * 26 + (ord(ch) - 64)`.",
  "hints": [
    "Conceptual Intuition: Consider a Base-26 Positional Accumulation paradigm. Evaluate `col` as a bijective base-26 number: `ans = ans * 26 + (ord(ch) - 64)`.",
    "Algorithmic Mechanics: `'A'` has value `1`, `'Z'` has value `26`. Accumulate `ans = ans * 26 + (ord(ch) - ord('A') + 1)`.",
    "Edge Cases & Optimization: Add `+ 1` since `'A'` is 1, not 0. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Base-26 Positional Accumulation",
  "approachSteps": [
    "Accumulate `ans = ans * 26 + (ord(ch) - ord('A') + 1)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Add `+ 1` since `'A'` is 1, not 0."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def title_to_number(col: str) -> int:\n    ans = 0\n    for ch in col: ans = ans * 26 + (ord(ch) - 64)\n    return ans\n"
  }
},
  "perfect-squares-min-sum": {
  "problemId": "perfect-squares-min-sum",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run bottom-up DP (or shortest-path BFS) over squares `s <= n`: `dp[i] = min(dp[i - s] + 1)`.",
  "hints": [
    "Conceptual Intuition: Consider a Unbounded Square Knapsack DP paradigm. Run bottom-up DP (or shortest-path BFS) over squares `s <= n`: `dp[i] = min(dp[i - s] + 1)`.",
    "Algorithmic Mechanics: By Lagrange's Four-Square Theorem, the answer is always 1, 2, 3, or 4. Precompute squares `<= n`, fill `dp[1.n]` taking `min(dp[i - s]) + 1`.",
    "Edge Cases & Optimization: Greedy largest square fails on `12` (`9+1+1+1=4` vs `4+4+4=3`). Ensure time complexity is bounded to O(n * sqrt(n)) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Unbounded Square Knapsack DP",
  "approachSteps": [
    "Precompute squares `<= n`, fill `dp[1..n]` taking `min(dp[i - s]) + 1`."
  ],
  "timeComplexity": "O(n * sqrt(n))",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Greedy largest square fails on `12` (`9+1+1+1=4` vs `4+4+4=3`)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def num_squares(n: int) -> int:\n    dp = [n] * (n + 1); dp[0] = 0\n    sq = [i * i for i in range(1, int(n ** 0.5) + 1)]\n    for i in range(1, n + 1):\n        for s in sq:\n            if s > i: break\n            if dp[i - s] + 1 < dp[i]: dp[i] = dp[i - s] + 1\n    return dp[n]\n"
  }
},
  "integer-break-max-product": {
  "problemId": "integer-break-max-product",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Factor out `3`s while `n > 4` (leaving `4 = 2 * 2` instead of `3 * 1`), after handling `n <= 3` directly.",
  "hints": [
    "Conceptual Intuition: Consider a Greedy Factor-of-3 Decomposition paradigm. Factor out `3`s while `n > 4` (leaving `4 = 2 * 2` instead of `3 * 1`), after handling `n <= 3` directly.",
    "Algorithmic Mechanics: For `n >= 5`, `3 * (n - 3) > n`, while `4` is better kept as `4` than `3 * 1`. If `n <= 3`, return `n - 1`; while `n > 4`, multiply `ans *= 3` and `n -= 3`; return `ans * n`.",
    "Edge Cases & Optimization: Do not split `4` into `3 + 1`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Greedy Factor-of-3 Decomposition",
  "approachSteps": [
    "If `n <= 3`, return `n - 1`; while `n > 4`, multiply `ans *= 3` and `n -= 3`; return `ans * n`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Do not split `4` into `3 + 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def integer_break(n: int) -> int:\n    if n <= 3: return n - 1\n    p = 1\n    while n > 4: p *= 3; n -= 3\n    return p * n\n"
  }
},
  "combination-sum-iv-ordered": {
  "problemId": "combination-sum-iv-ordered",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Put `amount` in the outer loop and `nums` in the inner loop (`dp[a] += dp[a - x]`) to count ordered permutations.",
  "hints": [
    "Conceptual Intuition: Consider a Amount-Outer Permutation DP paradigm. Put `amount` in the outer loop and `nums` in the inner loop (`dp[a] += dp[a - x]`) to count ordered permutations.",
    "Algorithmic Mechanics: Outer loop on `amount` distinguishes `[1, 2]` from `[2, 1]`. Initialize `dp[0] = 1`; for `a` in `1.target`, sum `dp[a - x]` for `x <= a`.",
    "Edge Cases & Optimization: Outer loop on `nums` would count unordered combinations instead. Ensure time complexity is bounded to O(target * n) with O(target) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Amount-Outer Permutation DP",
  "approachSteps": [
    "Initialize `dp[0] = 1`; for `a` in `1..target`, sum `dp[a - x]` for `x <= a`."
  ],
  "timeComplexity": "O(target * n)",
  "spaceComplexity": "O(target)",
  "pitfalls": [
    "Outer loop on `nums` would count unordered combinations instead."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def combination_sum4(nums: list[int], target: int) -> int:\n    dp = [0] * (target + 1); dp[0] = 1\n    for a in range(1, target + 1):\n        for x in nums:\n            if x <= a: dp[a] += dp[a - x]\n    return dp[target]\n"
  }
},
  "ones-and-zeroes-2d-knapsack": {
  "problemId": "ones-and-zeroes-2d-knapsack",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Solve 2D 0/1 knapsack over `(zeros, ones)` iterating both dimensions backward from `(m, n)` down to `(z, o)`.",
  "hints": [
    "Conceptual Intuition: Consider a 2D 0/1 Knapsack DP paradigm. Solve 2D 0/1 knapsack over `(zeros, ones)` iterating both dimensions backward from `(m, n)` down to `(z, o)`.",
    "Algorithmic Mechanics: Backward loops ensure each string is selected at most once. For each string `(z, o)`, update `dp[i][j] = max(dp[i][j], dp[i - z][j - o] + 1)` backward.",
    "Edge Cases & Optimization: Iterating forward allows selecting the same string multiple times. Ensure time complexity is bounded to O(L * m * n) with O(m * n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "2D 0/1 Knapsack DP",
  "approachSteps": [
    "For each string `(z, o)`, update `dp[i][j] = max(dp[i][j], dp[i - z][j - o] + 1)` backward."
  ],
  "timeComplexity": "O(L * m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Iterating forward allows selecting the same string multiple times."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_max_form(strs: list[str], m: int, n: int) -> int:\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for s in strs:\n        z = s.count('0'); o = len(s) - z\n        for i in range(m, z - 1, -1):\n            for j in range(n, o - 1, -1):\n                if dp[i - z][j - o] + 1 > dp[i][j]: dp[i][j] = dp[i - z][j - o] + 1\n    return dp[m][n]\n"
  }
},
  "maximal-square-binary-grid": {
  "problemId": "maximal-square-binary-grid",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Let `dp[r][c]` be the side length of the largest all-`'1'` square ending at `(r, c)`: `1 + min(top, left, diag)`. Return `max_side ** 2`.",
  "hints": [
    "Conceptual Intuition: Consider a Rolling-Row Square-Side DP paradigm. Let `dp[r][c]` be the side length of the largest all-`'1'` square ending at `(r, c)`: `1 + min(top, left, diag)`. Return `max_side ** 2`.",
    "Algorithmic Mechanics: Remember to return area (`side * side`), not side length. Track `prev` and `curr` rows updating `1 + min(prev[j], curr[j-1], prev[j-1])` on `'1'`.",
    "Edge Cases & Optimization: Return `best * best`, not `best`. Ensure time complexity is bounded to O(m * n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Rolling-Row Square-Side DP",
  "approachSteps": [
    "Track `prev` and `curr` rows updating `1 + min(prev[j], curr[j-1], prev[j-1])` on `'1'`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Return `best * best`, not `best`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def maximal_square(matrix: list[list[str]]) -> int:\n    n = len(matrix[0]); prev = [0] * (n + 1); best = 0\n    for row in matrix:\n        curr = [0] * (n + 1)\n        for j, ch in enumerate(row, 1):\n            if ch == '1':\n                curr[j] = 1 + min(prev[j], curr[j - 1], prev[j - 1])\n                if curr[j] > best: best = curr[j]\n        prev = curr\n    return best * best\n"
  }
},
  "longest-string-chain": {
  "problemId": "longest-string-chain",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort words by length ascending; for each word `w`, try deleting each single character `w[:i] + w[i+1:]` and set `dp[w] = 1 + max(dp.get(pred, 0))`.",
  "hints": [
    "Conceptual Intuition: Consider a Length-Sorted Predecessor Hash DP paradigm. Sort words by length ascending; for each word `w`, try deleting each single character `w[:i] + w[i+1:]` and set `dp[w] = 1 + max(dp.get(pred, 0))`.",
    "Algorithmic Mechanics: Deleting 1 char from `w` takes O(L) with `L <= 16`. Sort by `len`, compute `dp[w]` over all single-char deletions, return `max(dp.values())`.",
    "Edge Cases & Optimization: Sort by length first so all shorter predecessors are already evaluated. Ensure time complexity is bounded to O(n log n + n * L^2) with O(n * L) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Length-Sorted Predecessor Hash DP",
  "approachSteps": [
    "Sort by `len`, compute `dp[w]` over all single-char deletions, return `max(dp.values())`."
  ],
  "timeComplexity": "O(n log n + n * L^2)",
  "spaceComplexity": "O(n * L)",
  "pitfalls": [
    "Sort by length first so all shorter predecessors are already evaluated."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def longest_str_chain(words: list[str]) -> int:\n    dp = {}\n    for w in sorted(words, key=len):\n        dp[w] = max((dp.get(w[:i] + w[i + 1:], 0) for i in range(len(w))), default=0) + 1\n    return max(dp.values())\n"
  }
},
  "predict-the-winner-game-dp": {
  "problemId": "predict-the-winner-game-dp",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use minimax interval DP where `dp[l][r]` is the maximum net score advantage `current_player - opponent` on subarray `nums[l..r]`.",
  "hints": [
    "Conceptual Intuition: Consider a Minimax Interval Advantage DP paradigm. Use minimax interval DP where `dp[l][r]` is the maximum net score advantage `current_player - opponent` on subarray `nums[l.r]`.",
    "Algorithmic Mechanics: `dp[l][r] = max(nums[l] - dp[l + 1][r], nums[r] - dp[l][r - 1])`. Fill `dp[l][r]` bottom-up and return `dp[0][n - 1] >= 0`.",
    "Edge Cases & Optimization: Ties (`>= 0`) count as a win for Player 1. Ensure time complexity is bounded to O(n^2) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Minimax Interval Advantage DP",
  "approachSteps": [
    "Fill `dp[l][r]` bottom-up and return `dp[0][n - 1] >= 0`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Ties (`>= 0`) count as a win for Player 1."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def predict_winner(nums: list[int]) -> bool:\n    n = len(nums); dp = list(nums)\n    for l in range(n - 2, -1, -1):\n        for r in range(l + 1, n):\n            dp[r] = max(nums[l] - dp[r], nums[r] - dp[r - 1])\n    return dp[n - 1] >= 0\n"
  }
},
  "min-falling-path-sum-grid": {
  "problemId": "min-falling-path-sum-grid",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Roll a 1D row of minimum cumulative sums where `curr[c] = row[c] + min(prev[max(0, c-1):min(n, c+2)])`.",
  "hints": [
    "Conceptual Intuition: Consider a Rolling 3-Neighbor Row DP paradigm. Roll a 1D row of minimum cumulative sums where `curr[c] = row[c] + min(prev[max(0, c-1):min(n, c+2)])`.",
    "Algorithmic Mechanics: Return `min(prev)` after processing the last row. Start `prev = matrix[0]`, transition row by row, return `min(prev)`.",
    "Edge Cases & Optimization: Handle negative entries cleanly. Ensure time complexity is bounded to O(n^2) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Rolling 3-Neighbor Row DP",
  "approachSteps": [
    "Start `prev = matrix[0]`, transition row by row, return `min(prev)`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Handle negative entries cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_falling_path(matrix: list[list[int]]) -> int:\n    n = len(matrix); prev = list(matrix[0])\n    for row in matrix[1:]:\n        prev = [row[c] + min(prev[max(0, c - 1):min(n, c + 2)]) for c in range(n)]\n    return min(prev)\n"
  }
},
  "longest-increasing-path-matrix": {
  "problemId": "longest-increasing-path-matrix",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Strict inequalities form an implicit DAG with no cycles, so memoized DFS computes the longest path starting from every cell in O(m * n) total time.",
  "hints": [
    "Conceptual Intuition: Consider a Memoized Implicit-DAG DFS paradigm. Strict inequalities form an implicit DAG with no cycles, so memoized DFS computes the longest path starting from every cell in O(m * n) total time.",
    "Algorithmic Mechanics: No visited set is needed because strictly increasing edges cannot form cycles. Cache `dfs(r, c) = 1 + max(dfs(nr, nc) for higher neighbors)` and return global max.",
    "Edge Cases & Optimization: Use strictly greater `>` for neighbor transitions. Ensure time complexity is bounded to O(m * n) with O(m * n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Memoized Implicit-DAG DFS",
  "approachSteps": [
    "Cache `dfs(r, c) = 1 + max(dfs(nr, nc) for higher neighbors)` and return global max."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Use strictly greater `>` for neighbor transitions."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from functools import lru_cache\n\ndef longest_increasing_path(matrix: list[list[int]]) -> int:\n    m, n = len(matrix), len(matrix[0])\n    @lru_cache(None)\n    def dfs(r, c):\n        best = 1\n        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:\n                best = max(best, 1 + dfs(nr, nc))\n        return best\n    return max(dfs(r, c) for r in range(m) for c in range(n))\n"
  }
},
  "min-cost-to-cut-a-stick": {
  "problemId": "min-cost-to-cut-a-stick",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort `[0] + cuts + [n]` and run interval DP where `dp[l][r] = (pts[r] - pts[l]) + min(dp[l][k] + dp[k][r])` over `l < k < r`.",
  "hints": [
    "Conceptual Intuition: Consider a Sorted-Endpoints Interval DP paradigm. Sort `[0] + cuts + [n]` and run interval DP where `dp[l][r] = (pts[r] - pts[l]) + min(dp[l][k] + dp[k][r])` over `l < k < r`.",
    "Algorithmic Mechanics: Base case: adjacent points (`r - l == 1`) have 0 interior cuts and cost 0. Sort `pts = [0] + sorted(cuts) + [n]` and fill `dp[l][r]` by increasing gap `2.m-1`.",
    "Edge Cases & Optimization: Sort `cuts` before building intervals. Ensure time complexity is bounded to O(c^3) with O(c^2) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Sorted-Endpoints Interval DP",
  "approachSteps": [
    "Sort `pts = [0] + sorted(cuts) + [n]` and fill `dp[l][r]` by increasing gap `2..m-1`."
  ],
  "timeComplexity": "O(c^3)",
  "spaceComplexity": "O(c^2)",
  "pitfalls": [
    "Sort `cuts` before building intervals."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_cut_cost(n: int, cuts: list[int]) -> int:\n    pts = [0] + sorted(cuts) + [n]; m = len(pts)\n    dp = [[0] * m for _ in range(m)]\n    for g in range(2, m):\n        for l in range(m - g):\n            r = l + g\n            dp[l][r] = (pts[r] - pts[l]) + min(dp[l][k] + dp[k][r] for k in range(l + 1, r))\n    return dp[0][m - 1]\n"
  }
},
  "russian-doll-envelopes": {
  "problemId": "russian-doll-envelopes",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort by width ascending and height DESCENDING on ties, then compute the O(n log n) Longest Increasing Subsequence on heights.",
  "hints": [
    "Conceptual Intuition: Consider a 2D Sort + Patience LIS paradigm. Sort by width ascending and height DESCENDING on ties, then compute the O(n log n) Longest Increasing Subsequence on heights.",
    "Algorithmic Mechanics: Sorting height descending on equal widths prevents two same-width envelopes from both entering the LIS. Sort by `(w, -h)`, run `bisect_left` LIS over `h`.",
    "Edge Cases & Optimization: Sorting height ascending on ties breaks strict width nesting. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "2D Sort + Patience LIS",
  "approachSteps": [
    "Sort by `(w, -h)`, run `bisect_left` LIS over `h`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Sorting height ascending on ties breaks strict width nesting."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import bisect\n\ndef max_envelopes(envelopes: list[list[int]]) -> int:\n    envelopes.sort(key=lambda x: (x[0], -x[1]))\n    tails = []\n    for _, h in envelopes:\n        i = bisect.bisect_left(tails, h)\n        if i == len(tails): tails.append(h)\n        else: tails[i] = h\n    return len(tails)\n"
  }
},
  "wildcard-pattern-matching": {
  "problemId": "wildcard-pattern-matching",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use O(1)-space two pointers recording the last `'*'` index `star` and matched `s` position `match`, backtracking greedily only to the most recent `'*'`.",
  "hints": [
    "Conceptual Intuition: Consider a Greedy Last-Star Two Pointers paradigm. Use O(1)-space two pointers recording the last `'*'` index `star` and matched `s` position `match`, backtracking greedily only to the most recent `'*'`.",
    "Algorithmic Mechanics: Unlike regex `.*`, wildcard `'*'` is independent of the preceding character. Advance `(i, j)` on match; save `(star, match)` on `'*'`; backtrack to `star + 1, match + 1` on mismatch; skip trailing `'*'`.",
    "Edge Cases & Optimization: Consume trailing `'*'`s in `p` after `s` finishes. Ensure time complexity is bounded to O(n + m) typical, O(n * m) worst with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Greedy Last-Star Two Pointers",
  "approachSteps": [
    "Advance `(i, j)` on match; save `(star, match)` on `'*'`; backtrack to `star + 1, match + 1` on mismatch; skip trailing `'*'`."
  ],
  "timeComplexity": "O(n + m) typical, O(n * m) worst",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Consume trailing `'*'`s in `p` after `s` finishes."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def is_wildcard_match(s: str, p: str) -> bool:\n    i = j = match = 0; star = -1\n    while i < len(s):\n        if j < len(p) and (p[j] == '?' or p[j] == s[i]): i += 1; j += 1\n        elif j < len(p) and p[j] == '*': star = j; match = i; j += 1\n        elif star != -1: j = star + 1; match += 1; i = match\n        else: return False\n    while j < len(p) and p[j] == '*': j += 1\n    return j == len(p)\n"
  }
},
  "dungeon-game-min-hp": {
  "problemId": "dungeon-game-min-hp",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Work backward from `(m - 1, n - 1)` to `(0, 0)`: `need[r][c] = max(1, min(need[r+1][c], need[r][c+1]) - dungeon[r][c])`.",
  "hints": [
    "Conceptual Intuition: Consider a Reverse Bottom-Up Health DP paradigm. Work backward from `(m - 1, n - 1)` to `(0, 0)`: `need[r][c] = max(1, min(need[r+1][c], need[r][c+1]) - dungeon[r][c])`.",
    "Algorithmic Mechanics: Forward DP fails because future healing cannot rescue a negative dip earlier. Initialize `dp = [inf] * (n + 1)` with `dp[n - 1] = 1`; sweep rows and cols backward.",
    "Edge Cases & Optimization: Clamp every cell's minimum needed HP to at least `1`. Ensure time complexity is bounded to O(m * n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Reverse Bottom-Up Health DP",
  "approachSteps": [
    "Initialize `dp = [inf] * (n + 1)` with `dp[n - 1] = 1`; sweep rows and cols backward."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Clamp every cell's minimum needed HP to at least `1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def calculate_min_hp(dungeon: list[list[int]]) -> int:\n    m, n = len(dungeon), len(dungeon[0])\n    dp = [float('inf')] * (n + 1); dp[n - 1] = 1\n    for r in range(m - 1, -1, -1):\n        for c in range(n - 1, -1, -1):\n            dp[c] = max(1, min(dp[c], dp[c + 1]) - dungeon[r][c])\n    return dp[0]\n"
  }
},
  "best-time-stock-k-transactions": {
  "problemId": "best-time-stock-k-transactions",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain `buy[t]` and `sell[t]` for `t = 1..k` (or sum all positive day-to-day gains when `k >= n // 2`).",
  "hints": [
    "Conceptual Intuition: Consider a K-Transaction State-Machine DP paradigm. Maintain `buy[t]` and `sell[t]` for `t = 1.k` (or sum all positive day-to-day gains when `k >= n // 2`).",
    "Algorithmic Mechanics: When `k >= len(prices) // 2`, unlimited transactions apply. Initialize `buy = [-inf] * (k + 1)`, `sell = [0] * (k + 1)`; update for each price `p`.",
    "Edge Cases & Optimization: Handle `k == 0` or empty `prices` returning `0`. Ensure time complexity is bounded to O(n * k) with O(k) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "K-Transaction State-Machine DP",
  "approachSteps": [
    "Initialize `buy = [-inf] * (k + 1)`, `sell = [0] * (k + 1)`; update for each price `p`."
  ],
  "timeComplexity": "O(n * k)",
  "spaceComplexity": "O(k)",
  "pitfalls": [
    "Handle `k == 0` or empty `prices` returning `0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def max_profit_k_trades(k: int, prices: list[int]) -> int:\n    if k == 0 or len(prices) < 2: return 0\n    if k >= len(prices) // 2:\n        return sum(max(0, prices[i] - prices[i - 1]) for i in range(1, len(prices)))\n    buy = [float('-inf')] * (k + 1); sell = [0] * (k + 1)\n    for p in prices:\n        for t in range(1, k + 1):\n            buy[t] = max(buy[t], sell[t - 1] - p)\n            sell[t] = max(sell[t], buy[t] + p)\n    return sell[k]\n"
  }
},
  "max-profit-job-scheduling": {
  "problemId": "max-profit-job-scheduling",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort jobs by `end_time`, and for each job binary search the last job finishing `<= start_time` using `bisect_right` to compute `dp[i] = max(dp[i - 1], dp[prev] + profit)`.",
  "hints": [
    "Conceptual Intuition: Consider a End-Sorted Weighted Interval DP paradigm. Sort jobs by `end_time`, and for each job binary search the last job finishing `<= start_time` using `bisect_right` to compute `dp[i] = max(dp[i - 1], dp[prev] + profit)`.",
    "Algorithmic Mechanics: Weighted interval scheduling requires DP + binary search rather than pure greedy. Sort jobs by end time, maintain `ends` and `dp`, binary search `bisect_right(ends, s)`.",
    "Edge Cases & Optimization: Use `bisect_right` because a job finishing at `s` is compatible with a job starting at `s`. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "End-Sorted Weighted Interval DP",
  "approachSteps": [
    "Sort jobs by end time, maintain `ends` and `dp`, binary search `bisect_right(ends, s)`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Use `bisect_right` because a job finishing at `s` is compatible with a job starting at `s`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import bisect\n\ndef job_scheduling(start_time: list[int], end_time: list[int], profit: list[int]) -> int:\n    jobs = sorted(zip(end_time, start_time, profit))\n    ends = [0]; dp = [0]\n    for e, s, p in jobs:\n        idx = bisect.bisect_right(ends, s) - 1\n        cand = dp[idx] + p\n        if cand > dp[-1]: ends.append(e); dp.append(cand)\n    return dp[-1]\n"
  }
},
  "min-insertions-make-palindrome": {
  "problemId": "min-insertions-make-palindrome",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "The minimum insertions needed equals `len(s) - LPS(s)` where `LPS(s) = LCS(s, reversed(s))`.",
  "hints": [
    "Conceptual Intuition: Consider a Complement of Longest Palindromic Subsequence paradigm. The minimum insertions needed equals `len(s) - LPS(s)` where `LPS(s) = LCS(s, reversed(s))`.",
    "Algorithmic Mechanics: Every character not in the longest palindromic subsequence needs one mirrored partner inserted. Compute `lps = LCS(s, s[::-1])` with rolling 1D DP and return `len(s) - lps`.",
    "Edge Cases & Optimization: Already palindromic strings return `0`. Ensure time complexity is bounded to O(n^2) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Complement of Longest Palindromic Subsequence",
  "approachSteps": [
    "Compute `lps = LCS(s, s[::-1])` with rolling 1D DP and return `len(s) - lps`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Already palindromic strings return `0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_insertions_palindrome(s: str) -> int:\n    n = len(s); rev = s[::-1]; prev = [0] * (n + 1)\n    for a in s:\n        curr = [0] * (n + 1)\n        for j, b in enumerate(rev): curr[j + 1] = prev[j] + 1 if a == b else max(prev[j + 1], curr[j])\n        prev = curr\n    return n - prev[n]\n"
  }
},
  "town-judge-finder": {
  "problemId": "town-judge-finder",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track net trust score (in-degree minus out-degree) for each person; the judge has score `n - 1`.",
  "hints": [
    "Model trust relationships as directed edges from `a` to `b`.",
    "The judge has in-degree `n - 1` and out-degree `0`.",
    "Boundary edge cases & complexity: Forgetting the edge case `n = 1` with empty `trust`, where person `1` is the judge. Verify your solution strictly meets O(n + E) time and O(n) space limits."
  ],
  "approachTitle": "Net Degree Counting",
  "approachSteps": [
    "Initialize an array `score` of size `n + 1` filled with `0`.",
    "For each `[a, b]` in `trust`, decrement `score[a]` and increment `score[b]`.",
    "Scan from `1` to `n` and return the first person with `score[i] == n - 1`, or `-1` if none exists."
  ],
  "timeComplexity": "O(n + E)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Forgetting the edge case `n = 1` with empty `trust`, where person `1` is the judge."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def findJudge(n: int, trust: list[list[int]]) -> int:\n    score = [0] * (n + 1)\n    for a, b in trust:\n        score[a] -= 1\n        score[b] += 1\n    for i in range(1, n + 1):\n        if score[i] == n - 1:\n            return i\n    return -1\n"
  }
},
  "graph-path-existence": {
  "problemId": "graph-path-existence",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use Disjoint Set Union (Union-Find) or BFS to check whether `source` and `destination` belong to the same connected component.",
  "hints": [
    "If `source == destination`, the answer is immediately `true`.",
    "Union-Find with path compression checks connectivity in nearly O(1) per edge.",
    "Boundary edge cases & complexity: Using deep recursion DFS on a linear chain of 200,000 vertices can hit Python's recursion limit. Verify your solution strictly meets O(n + E * alpha(n)) time and O(n) space limits."
  ],
  "approachTitle": "Disjoint Set Union (Union-Find)",
  "approachSteps": [
    "Initialize `parent[i] = i` for all `i` from `0` to `n - 1`.",
    "For each edge `[u, v]`, union the components of `u` and `v`.",
    "Return whether `find(source) == find(destination)`."
  ],
  "timeComplexity": "O(n + E * alpha(n))",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Using deep recursion DFS on a linear chain of 200,000 vertices can hit Python's recursion limit."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def validPath(n: int, edges: list[list[int]], source: int, destination: int) -> bool:\n    parent = list(range(n))\n    def find(x: int) -> int:\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    for u, v in edges:\n        ru, rv = find(u), find(v)\n        if ru != rv:\n            parent[ru] = rv\n    return find(source) == find(destination)\n"
  }
},
  "valid-mountain-peak": {
  "problemId": "valid-mountain-peak",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Walk uphill from the start to the peak, verify the peak is strictly interior, then walk downhill to the end.",
  "hints": [
    "The peak cannot be at index `0` or index `n - 1`.",
    "A single linear scan suffices.",
    "Boundary edge cases & complexity: Allowing purely increasing or purely decreasing arrays to pass. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Single-Pass Ascent and Descent",
  "approachSteps": [
    "If `len(arr) < 3`, return `false`.",
    "Advance `i` while `i + 1 < n` and `arr[i] < arr[i + 1]`.",
    "If `i == 0` or `i == n - 1`, return `false`.",
    "Advance `i` while `i + 1 < n` and `arr[i] > arr[i + 1]`.",
    "Return `i == n - 1`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Allowing purely increasing or purely decreasing arrays to pass."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def validMountainArray(arr: list[int]) -> bool:\n    n = len(arr)\n    if n < 3:\n        return False\n    i = 0\n    while i + 1 < n and arr[i] < arr[i + 1]:\n        i += 1\n    if i == 0 or i == n - 1:\n        return False\n    while i + 1 < n and arr[i] > arr[i + 1]:\n        i += 1\n    return i == n - 1\n"
  }
},
  "monotonic-sequence-check": {
  "problemId": "monotonic-sequence-check",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track two boolean flags, `inc` and `dec`, in a single pass over adjacent pairs.",
  "hints": [
    "Conceptual Intuition: Consider a Two-Flag Single Pass paradigm. Track two boolean flags, `inc` and `dec`, in a single pass over adjacent pairs.",
    "Algorithmic Mechanics: An array is monotonic if it never both increases and decreases. Initialize `inc = True` and `dec = True`. For each adjacent pair `(nums[i], nums[i + 1])`, set `inc = False` if `nums[i] > nums[i + 1]` and `dec = False` if `nums[i] < nums[i + 1]`.",
    "Edge Cases & Optimization: Treating equal adjacent elements as breaking monotonicity. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Two-Flag Single Pass",
  "approachSteps": [
    "Initialize `inc = True` and `dec = True`.",
    "For each adjacent pair `(nums[i], nums[i + 1])`, set `inc = False` if `nums[i] > nums[i + 1]` and `dec = False` if `nums[i] < nums[i + 1]`.",
    "Return `inc or dec`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Treating equal adjacent elements as breaking monotonicity."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def isMonotonic(nums: list[int]) -> bool:\n    inc = dec = True\n    for i in range(len(nums) - 1):\n        if nums[i] > nums[i + 1]:\n            inc = False\n        if nums[i] < nums[i + 1]:\n            dec = False\n    return inc or dec\n"
  }
},
  "combination-lock-bfs": {
  "problemId": "combination-lock-bfs",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Model the 10,000 lock states as an unweighted graph and run Breadth-First Search from `'0000'` avoiding `deadends`.",
  "hints": [
    "Each state has 8 neighbors (rotate each of the 4 wheels by +1 or -1 mod 10).",
    "Check if `'0000'` itself is in `deadends` before starting BFS.",
    "Boundary edge cases & complexity: Forgetting to check whether `'0000'` is a deadend. Verify your solution strictly meets O(10^4 * 4) time and O(10^4) space limits."
  ],
  "approachTitle": "Unweighted Shortest Path via BFS",
  "approachSteps": [
    "Store `deadends` in a hash set `blocked`. If `'0000'` is in `blocked`, return `-1`.",
    "Initialize a BFS queue with `('0000', 0)` and a `visited` set containing `'0000'`.",
    "Pop `(state, steps)`. If `state == target`, return `steps`.",
    "Generate all 8 single-wheel neighbors; enqueue any unvisited neighbor not in `blocked`.",
    "Return `-1` if the queue empties without reaching `target`."
  ],
  "timeComplexity": "O(10^4 * 4)",
  "spaceComplexity": "O(10^4)",
  "pitfalls": [
    "Forgetting to check whether `'0000'` is a deadend."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef openLock(deadends: list[str], target: str) -> int:\n    blocked = set(deadends)\n    if '0000' in blocked:\n        return -1\n    q = deque([('0000', 0)])\n    visited = {'0000'}\n    while q:\n        state, dist = q.popleft()\n        if state == target:\n            return dist\n        for i in range(4):\n            d = int(state[i])\n            for delta in (-1, 1):\n                nd = (d + delta) % 10\n                nxt = state[:i] + str(nd) + state[i + 1:]\n                if nxt not in blocked and nxt not in visited:\n                    visited.add(nxt)\n                    q.append((nxt, dist + 1))\n    return -1\n"
  }
},
  "genetic-mutation-steps": {
  "problemId": "genetic-mutation-steps",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run BFS from `startGene`, transitioning to any unvisited gene in `bank` that differs in exactly one position.",
  "hints": [
    "If `endGene` is not in `bank` and `startGene != endGene`, it is unreachable.",
    "Because `bank` is small, checking Hamming distance 1 or trying 3 alternative characters per index is very fast.",
    "Boundary edge cases & complexity: Forgetting that `startGene` does not need to be in `bank`. Verify your solution strictly meets O(N * L * 4) time and O(N) space limits."
  ],
  "approachTitle": "BFS Over Valid Bank States",
  "approachSteps": [
    "Convert `bank` into a set `valid`.",
    "Initialize BFS queue with `(startGene, 0)` and `visited = {startGene}`.",
    "For each popped `(gene, steps)`, return `steps` if `gene == endGene`.",
    "Try mutating each of the 8 positions to `'A'`, `'C'`, `'G'`, `'T'`; enqueue any unvisited gene in `valid`.",
    "Return `-1` if `endGene` is not reached."
  ],
  "timeComplexity": "O(N * L * 4)",
  "spaceComplexity": "O(N)",
  "pitfalls": [
    "Forgetting that `startGene` does not need to be in `bank`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef minMutation(startGene: str, endGene: str, bank: list[str]) -> int:\n    valid = set(bank)\n    q = deque([(startGene, 0)])\n    visited = {startGene}\n    while q:\n        gene, dist = q.popleft()\n        if gene == endGene:\n            return dist\n        for i in range(8):\n            for ch in 'ACGT':\n                if ch != gene[i]:\n                    nxt = gene[:i] + ch + gene[i + 1:]\n                    if nxt in valid and nxt not in visited:\n                        visited.add(nxt)\n                        q.append((nxt, dist + 1))\n    return -1\n"
  }
},
  "employee-inform-time": {
  "problemId": "employee-inform-time",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Build the management tree from `manager` and compute the maximum root-to-leaf sum of `informTime` using iterative BFS/DFS.",
  "hints": [
    "Conceptual Intuition: Consider a Iterative BFS on Organization Tree paradigm. Build the management tree from `manager` and compute the maximum root-to-leaf sum of `informTime` using iterative BFS/DFS.",
    "Algorithmic Mechanics: Subordinates are notified in parallel, so the total time is the longest weighted path from `headID` to any employee. Build an adjacency list `children` mapping each manager to their direct reports. Run BFS starting from `(headID, 0)` tracking the cumulative time to reach each node.",
    "Edge Cases & Optimization: Adding `informTime[leaf]` for a leaf node with no subordinates (though leaves usually have 0, only add `informTime[u]` when forwarding to a child). Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Iterative BFS on Organization Tree",
  "approachSteps": [
    "Build an adjacency list `children` mapping each manager to their direct reports.",
    "Run BFS starting from `(headID, 0)` tracking the cumulative time to reach each node.",
    "For each employee `u` reached at time `t`, update `ans = max(ans, t)` and push `(v, t + informTime[u])` for each subordinate `v`.",
    "Return `ans`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Adding `informTime[leaf]` for a leaf node with no subordinates (though leaves usually have 0, only add `informTime[u]` when forwarding to a child)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef numOfMinutes(n: int, headID: int, manager: list[int], informTime: list[int]) -> int:\n    children = [[] for _ in range(n)]\n    for i, m in enumerate(manager):\n        if m != -1:\n            children[m].append(i)\n    q = deque([(headID, 0)])\n    ans = 0\n    while q:\n        u, t = q.popleft()\n        if t > ans:\n            ans = t\n        for v in children[u]:\n            q.append((v, t + informTime[u]))\n    return ans\n"
  }
},
  "min-effort-grid-path": {
  "problemId": "min-effort-grid-path",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use modified Dijkstra's algorithm where the path cost is the maximum edge weight along the path rather than the sum.",
  "hints": [
    "Conceptual Intuition: Consider a Minimax Dijkstra with Min-Heap paradigm. Use modified Dijkstra's algorithm where the path cost is the maximum edge weight along the path rather than the sum.",
    "Algorithmic Mechanics: Because `max(effort, edge_weight)` is non-decreasing as you extend a path, Dijkstra's greedy property holds. Initialize `dist[r][c] = inf` with `dist[0][0] = 0` and a min-heap `[(0, 0, 0)]`. Pop `(eff, r, c)`. If `(r, c)` is the bottom-right cell, return `eff`.",
    "Edge Cases & Optimization: Summing elevation differences instead of taking the maximum. Ensure time complexity is bounded to O(R * C * log(R * C)) with O(R * C) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Minimax Dijkstra with Min-Heap",
  "approachSteps": [
    "Initialize `dist[r][c] = inf` with `dist[0][0] = 0` and a min-heap `[(0, 0, 0)]`.",
    "Pop `(eff, r, c)`. If `(r, c)` is the bottom-right cell, return `eff`.",
    "Skip stale heap entries where `eff > dist[r][c]`.",
    "For each 4-directional neighbor `(nr, nc)`, compute `neff = max(eff, abs(heights[r][c] - heights[nr][nc]))` and relax if `neff < dist[nr][nc]`."
  ],
  "timeComplexity": "O(R * C * log(R * C))",
  "spaceComplexity": "O(R * C)",
  "pitfalls": [
    "Summing elevation differences instead of taking the maximum."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef minimumEffortPath(heights: list[list[int]]) -> int:\n    R, C = len(heights), len(heights[0])\n    dist = [[float('inf')] * C for _ in range(R)]\n    dist[0][0] = 0\n    pq = [(0, 0, 0)]\n    while pq:\n        eff, r, c = heapq.heappop(pq)\n        if r == R - 1 and c == C - 1:\n            return eff\n        if eff > dist[r][c]:\n            continue\n        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < R and 0 <= nc < C:\n                neff = max(eff, abs(heights[r][c] - heights[nr][nc]))\n                if neff < dist[nr][nc]:\n                    dist[nr][nc] = neff\n                    heapq.heappush(pq, (neff, nr, nc))\n    return 0\n"
  }
},
  "city-smallest-neighbors": {
  "problemId": "city-smallest-neighbors",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Compute all-pairs shortest paths with Floyd-Warshall in O(n^3) time, then count reachable neighbors per city and break ties by larger city index.",
  "hints": [
    "With `n <= 100`, an `O(n^3)` Floyd-Warshall matrix is both simple and fast.",
    "Use `<=` when updating the best city so ties favor the greater city ID.",
    "Boundary edge cases & complexity: Placing the intermediate node `k` in the innermost loop instead of the outermost loop. Verify your solution strictly meets O(n^3) time and O(n^2) space limits."
  ],
  "approachTitle": "Floyd-Warshall All-Pairs Shortest Paths",
  "approachSteps": [
    "Initialize `dist` as an `n x n` matrix of `inf`, with `dist[i][i] = 0` and `dist[u][v] = dist[v][u] = w` for each edge.",
    "Run three nested loops `k, i, j` relaxing `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`.",
    "For each city `i`, count `j != i` with `dist[i][j] <= distanceThreshold`.",
    "Track the minimum count, updating the answer whenever `count <= best_count`."
  ],
  "timeComplexity": "O(n^3)",
  "spaceComplexity": "O(n^2)",
  "pitfalls": [
    "Placing the intermediate node `k` in the innermost loop instead of the outermost loop."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def findTheCity(n: int, edges: list[list[int]], distanceThreshold: int) -> int:\n    INF = 10**9\n    dist = [[INF] * n for _ in range(n)]\n    for i in range(n):\n        dist[i][i] = 0\n    for u, v, w in edges:\n        dist[u][v] = min(dist[u][v], w)\n        dist[v][u] = min(dist[v][u], w)\n    for k in range(n):\n        for i in range(n):\n            dik = dist[i][k]\n            if dik == INF:\n                continue\n            for j in range(n):\n                if dik + dist[k][j] < dist[i][j]:\n                    dist[i][j] = dik + dist[k][j]\n    best_city = -1\n    best_cnt = INF\n    for i in range(n):\n        cnt = sum(1 for j in range(n) if j != i and dist[i][j] <= distanceThreshold)\n        if cnt <= best_cnt:\n            best_cnt = cnt\n            best_city = i\n    return best_city\n"
  }
},
  "minimum-height-trees-roots": {
  "problemId": "minimum-height-trees-roots",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Iteratively peel layers of leaf nodes (degree 1) inward until at most 2 centroid nodes remain.",
  "hints": [
    "A tree has at most 2 centers (the midpoints of its longest path).",
    "Removing all current leaves simultaneously preserves the tree's centers.",
    "Boundary edge cases & complexity: Not handling `n = 1` (no edges, no degree-1 nodes). Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Iterative Leaf Trimming (Topological Peeling)",
  "approachSteps": [
    "If `n <= 2`, return `[0..n-1]`.",
    "Build adjacency sets/lists and degree counts for each node.",
    "Collect all initial leaves (`degree == 1`).",
    "While remaining nodes > 2, remove the current layer of leaves, decrement neighbor degrees, and collect the next layer of leaves.",
    "Return the remaining 1 or 2 nodes."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Not handling `n = 1` (no edges, no degree-1 nodes)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def findMinHeightTrees(n: int, edges: list[list[int]]) -> list[int]:\n    if n <= 2:\n        return list(range(n))\n    adj = [set() for _ in range(n)]\n    for u, v in edges:\n        adj[u].add(v)\n        adj[v].add(u)\n    leaves = [i for i in range(n) if len(adj[i]) == 1]\n    remaining = n\n    while remaining > 2:\n        remaining -= len(leaves)\n        new_leaves = []\n        for leaf in leaves:\n            nb = adj[leaf].pop()\n            adj[nb].remove(leaf)\n            if len(adj[nb]) == 1:\n                new_leaves.append(nb)\n        leaves = new_leaves\n    return leaves\n"
  }
},
  "evaluate-division-queries": {
  "problemId": "evaluate-division-queries",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Represent equations as a weighted directed graph (`u -> v` with weight `w`, and `v -> u` with weight `1 / w`), then answer each query via BFS/DFS multiplying edge weights.",
  "hints": [
    "Conceptual Intuition: Consider a Weighted Graph BFS paradigm. Represent equations as a weighted directed graph (`u -> v` with weight `w`, and `v -> u` with weight `1 / w`), then answer each query via BFS/DFS multiplying edge weights.",
    "Algorithmic Mechanics: If either query variable is not in the graph, immediately return `-1.0` (even for `['x', 'x']`). Build `graph[a].append((b, val))` and `graph[b].append((a, 1.0 / val))`. For each query `[src, dst]`, if `src` or `dst` is absent from `graph`, append `-1.0`.",
    "Edge Cases & Optimization: Returning `1.0` for `x / x` when `x` never appeared in `equations`. Ensure time complexity is bounded to O(Q * (V + E)) with O(V + E) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Weighted Graph BFS",
  "approachSteps": [
    "Build `graph[a].append((b, val))` and `graph[b].append((a, 1.0 / val))`.",
    "For each query `[src, dst]`, if `src` or `dst` is absent from `graph`, append `-1.0`.",
    "Otherwise run BFS from `(src, 1.0)` multiplying edge weights along the path until reaching `dst`.",
    "Round each found ratio to 5 decimal places."
  ],
  "timeComplexity": "O(Q * (V + E))",
  "spaceComplexity": "O(V + E)",
  "pitfalls": [
    "Returning `1.0` for `x / x` when `x` never appeared in `equations`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict, deque\n\ndef calcEquation(equations: list[list[str]], values: list[float], queries: list[list[str]]) -> list[float]:\n    g = defaultdict(list)\n    for (a, b), val in zip(equations, values):\n        g[a].append((b, val))\n        g[b].append((a, 1.0 / val))\n    res = []\n    for src, dst in queries:\n        if src not in g or dst not in g:\n            res.append(-1.0)\n            continue\n        if src == dst:\n            res.append(1.0)\n            continue\n        q = deque([(src, 1.0)])\n        vis = {src}\n        found = -1.0\n        while q:\n            node, prod = q.popleft()\n            if node == dst:\n                found = round(prod, 5)\n                break\n            for nb, w in g[node]:\n                if nb not in vis:\n                    vis.add(nb)\n                    q.append((nb, prod * w))\n        res.append(found)\n    return res\n"
  }
},
  "merge-user-accounts-dsu": {
  "problemId": "merge-user-accounts-dsu",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use Union-Find over account indices (or emails) to merge accounts that share any email, then group and sort emails per connected component.",
  "hints": [
    "Conceptual Intuition: Consider a Union-Find by Account Index paradigm. Use Union-Find over account indices (or emails) to merge accounts that share any email, then group and sort emails per connected component.",
    "Algorithmic Mechanics: Map each seen email to the first account index that contained it; when seen again, union the two account indices. Initialize DSU over `0.len(accounts)-1`. Maintain `email_to_id`: for each email in `accounts[i][1:]`, if already in `email_to_id`, union `i` with `email_to_id[email]`; otherwise store `email_to_id[email] = i`.",
    "Edge Cases & Optimization: Merging accounts merely because they share the same user name. Ensure time complexity is bounded to O(N * K * log(N * K)) with O(N * K) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Union-Find by Account Index",
  "approachSteps": [
    "Initialize DSU over `0..len(accounts)-1`.",
    "Maintain `email_to_id`: for each email in `accounts[i][1:]`, if already in `email_to_id`, union `i` with `email_to_id[email]`; otherwise store `email_to_id[email] = i`.",
    "Group all emails by `find(id)` into a map `root -> list of emails`.",
    "For each root, emit `[accounts[root][0]] + sorted(emails)`."
  ],
  "timeComplexity": "O(N * K * log(N * K))",
  "spaceComplexity": "O(N * K)",
  "pitfalls": [
    "Merging accounts merely because they share the same user name."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict\n\ndef accountsMerge(accounts: list[list[str]]) -> list[list[str]]:\n    n = len(accounts)\n    parent = list(range(n))\n    def find(x: int) -> int:\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    def union(a: int, b: int) -> None:\n        ra, rb = find(a), find(b)\n        if ra != rb:\n            parent[ra] = rb\n    email_to_acc = {}\n    for i, acc in enumerate(accounts):\n        for email in acc[1:]:\n            if email in email_to_acc:\n                union(i, email_to_acc[email])\n            else:\n                email_to_acc[email] = i\n    groups = defaultdict(list)\n    for email, idx in email_to_acc.items():\n        groups[find(idx)].append(email)\n    return [[accounts[root][0]] + sorted(emails) for root, emails in groups.items()]\n"
  }
},
  "critical-network-bridges": {
  "problemId": "critical-network-bridges",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use Tarjan's bridge-finding DFS to track discovery times `disc[u]` and lowest reachable discovery times `low[u]`; tree edge `(u, v)` is a bridge iff `low[v] > disc[u]`.",
  "hints": [
    "Conceptual Intuition: Consider a Tarjan's Bridge-Finding Algorithm paradigm. Use Tarjan's bridge-finding DFS to track discovery times `disc[u]` and lowest reachable discovery times `low[u]`; tree edge `(u, v)` is a bridge iff `low[v] > disc[u]`.",
    "Algorithmic Mechanics: An edge belongs to a cycle if and only if there is a back-edge from the subtree of `v` reaching `u` or an ancestor of `u`. Build an undirected adjacency list. Run DFS maintaining `disc[u]` and `low[u]`.",
    "Edge Cases & Optimization: Updating `low[u]` using the direct parent edge instead of skipping `v == parent`. Ensure time complexity is bounded to O(V + E) with O(V + E) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Tarjan's Bridge-Finding Algorithm",
  "approachSteps": [
    "Build an undirected adjacency list.",
    "Run DFS maintaining `disc[u]` and `low[u]`.",
    "For each neighbor `v` of `u` (skipping the parent edge), if `v` is unvisited, recurse on `v`, update `low[u] = min(low[u], low[v])`, and if `low[v] > disc[u]`, record `[min(u, v), max(u, v)]`.",
    "If `v` was already visited, update `low[u] = min(low[u], disc[v])`."
  ],
  "timeComplexity": "O(V + E)",
  "spaceComplexity": "O(V + E)",
  "pitfalls": [
    "Updating `low[u]` using the direct parent edge instead of skipping `v == parent`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import sys\n\ndef criticalConnections(n: int, connections: list[list[int]]) -> list[list[int]]:\n    sys.setrecursionlimit(max(10000, n + 100))\n    adj = [[] for _ in range(n)]\n    for u, v in connections:\n        adj[u].append(v)\n        adj[v].append(u)\n    disc = [-1] * n\n    low = [0] * n\n    timer = [0]\n    bridges = []\n    def dfs(u: int, parent: int) -> None:\n        disc[u] = low[u] = timer[0]\n        timer[0] += 1\n        for v in adj[u]:\n            if v == parent:\n                continue\n            if disc[v] == -1:\n                dfs(v, u)\n                low[u] = min(low[u], low[v])\n                if low[v] > disc[u]:\n                    bridges.append([min(u, v), max(u, v)])\n            else:\n                low[u] = min(low[u], disc[v])\n    for i in range(n):\n        if disc[i] == -1:\n            dfs(i, -1)\n    return bridges\n"
  }
},
  "bus-routes-min-transfers": {
  "problemId": "bus-routes-min-transfers",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Map each stop to the bus routes passing through it and run BFS over bus routes (marking both visited routes and visited stops).",
  "hints": [
    "If `source == target`, 0 buses are needed.",
    "Tracking visited routes ensures each route's stops are scanned at most once.",
    "Boundary edge cases & complexity: Not clearing or marking visited stops, which causes quadratic re-scanning on hub stops. Verify your solution strictly meets O(S) where S is total stops across all routes time and O(S) space limits."
  ],
  "approachTitle": "Route-Level BFS",
  "approachSteps": [
    "If `source == target`, return `0`.",
    "Build a map `stop_to_routes[stop] -> list of route indices`.",
    "Enqueue all routes containing `source` with bus count `1`, marking those routes visited.",
    "Pop `(route, buses)`. For each `stop` in `routes[route]`: if `stop == target`, return `buses`; otherwise enqueue all unvisited routes serving `stop` and clear `stop_to_routes[stop]`.",
    "Return `-1` if unreachable."
  ],
  "timeComplexity": "O(S) where S is total stops across all routes",
  "spaceComplexity": "O(S)",
  "pitfalls": [
    "Not clearing or marking visited stops, which causes quadratic re-scanning on hub stops."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict, deque\n\ndef numBusesToDestination(routes: list[list[int]], source: int, target: int) -> int:\n    if source == target:\n        return 0\n    stop_to_routes = defaultdict(list)\n    for i, r in enumerate(routes):\n        for s in r:\n            stop_to_routes[s].append(i)\n    visited_routes = set()\n    q = deque()\n    for r in stop_to_routes[source]:\n        visited_routes.add(r)\n        q.append((r, 1))\n    while q:\n        r, buses = q.popleft()\n        for s in routes[r]:\n            if s == target:\n                return buses\n            for nr in stop_to_routes[s]:\n                if nr not in visited_routes:\n                    visited_routes.add(nr)\n                    q.append((nr, buses + 1))\n            stop_to_routes[s].clear()\n    return -1\n"
  }
},
  "shortest-path-all-nodes": {
  "problemId": "shortest-path-all-nodes",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run multi-source BFS over `(node, visited_bitmask)` states starting from `(i, 1 << i)` for all `i`, stopping as soon as `visited_bitmask == (1 << n) - 1`.",
  "hints": [
    "Conceptual Intuition: Consider a Bitmask Multi-Source BFS paradigm. Run multi-source BFS over `(node, visited_bitmask)` states starting from `(i, 1 << i)` for all `i`, stopping as soon as `visited_bitmask == (1 << n) - 1`.",
    "Algorithmic Mechanics: Since `n <= 12`, there are at most `12 * 2^12 = 49,152` states. If `n == 1`, return `0`. Let `target = (1 << n) - 1`.",
    "Edge Cases & Optimization: Forgetting the `n == 1` base case where the answer is `0`. Ensure time complexity is bounded to O(n * 2^n) with O(n * 2^n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bitmask Multi-Source BFS",
  "approachSteps": [
    "If `n == 1`, return `0`.",
    "Let `target = (1 << n) - 1`.",
    "Initialize a queue and visited set with `(i, 1 << i)` at distance `0` for every node `i`.",
    "Pop `(u, mask, d)`. For each neighbor `v` of `u`, compute `nmask = mask | (1 << v)`. If `nmask == target`, return `d + 1`; else enqueue `(v, nmask, d + 1)` if unvisited."
  ],
  "timeComplexity": "O(n * 2^n)",
  "spaceComplexity": "O(n * 2^n)",
  "pitfalls": [
    "Forgetting the `n == 1` base case where the answer is `0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef shortestPathLength(graph: list[list[int]]) -> int:\n    n = len(graph)\n    if n == 1:\n        return 0\n    target = (1 << n) - 1\n    q = deque((i, 1 << i, 0) for i in range(n))\n    vis = {(i, 1 << i) for i in range(n)}\n    while q:\n        u, mask, d = q.popleft()\n        for v in graph[u]:\n            nmask = mask | (1 << v)\n            if nmask == target:\n                return d + 1\n            if (v, nmask) not in vis:\n                vis.add((v, nmask))\n                q.append((v, nmask, d + 1))\n    return 0\n"
  }
},
  "min-cost-valid-grid-path": {
  "problemId": "min-cost-valid-grid-path",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Model the grid as a 0-1 weighted graph and run 0-1 BFS using a deque: push 0-cost moves to the front and 1-cost moves to the back.",
  "hints": [
    "Every edge has weight 0 (matching the cell's arrow) or 1 (changing the arrow).",
    "0-1 BFS finds shortest paths in O(m * n) without a heap.",
    "Boundary edge cases & complexity: Confusing the direction indices (1=right, 2=left, 3=down, 4=up). Verify your solution strictly meets O(m * n) time and O(m * n) space limits."
  ],
  "approachTitle": "0-1 BFS with Deque",
  "approachSteps": [
    "Map directions 1..4 to `(0, 1), (0, -1), (1, 0), (-1, 0)`.",
    "Initialize `dist` with `inf`, `dist[0][0] = 0`, and deque `[(0, 0)]`.",
    "Pop `(r, c)` from the left. For each direction `d` (1..4) leading to `(nr, nc)`, let `w = 0 if grid[r][c] == d else 1`.",
    "If `dist[r][c] + w < dist[nr][nc]`, update `dist[nr][nc]` and `appendleft` if `w == 0` else `append`.",
    "Return `dist[m - 1][n - 1]`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Confusing the direction indices (1=right, 2=left, 3=down, 4=up)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef minCost(grid: list[list[int]]) -> int:\n    m, n = len(grid), len(grid[0])\n    dirs = {1: (0, 1), 2: (0, -1), 3: (1, 0), 4: (-1, 0)}\n    INF = 10**9\n    dist = [[INF] * n for _ in range(m)]\n    dist[0][0] = 0\n    dq = deque([(0, 0)])\n    while dq:\n        r, c = dq.popleft()\n        for d, (dr, dc) in dirs.items():\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < m and 0 <= nc < n:\n                w = 0 if grid[r][c] == d else 1\n                if dist[r][c] + w < dist[nr][nc]:\n                    dist[nr][nc] = dist[r][c] + w\n                    if w == 0:\n                        dq.appendleft((nr, nc))\n                    else:\n                        dq.append((nr, nc))\n    return dist[m - 1][n - 1]\n"
  }
},
  "reconstruct-flight-itinerary": {
  "problemId": "reconstruct-flight-itinerary",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Find the lexicographically smallest Eulerian path starting at `'JFK'` using Hierholzer's algorithm with sorted adjacency lists (or min-heaps).",
  "hints": [
    "Conceptual Intuition: Consider a Hierholzer's Algorithm (Post-Order DFS) paradigm. Find the lexicographically smallest Eulerian path starting at `'JFK'` using Hierholzer's algorithm with sorted adjacency lists (or min-heaps).",
    "Algorithmic Mechanics: A greedy DFS can get stuck at a dead-end airport before visiting a cycle; Hierholzer's algorithm records airports in post-order and reverses the result. Build an adjacency list mapping each origin to its destinations sorted in reverse order (so `.pop()` returns the smallest destination in O(1)). Use an explicit stack initialized with `['JFK']` and an empty `route` list.",
    "Edge Cases & Optimization: Using backtracking without Hierholzer's post-order construction, which can time out on repeated cycles. Ensure time complexity is bounded to O(E log E) with O(E) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Hierholzer's Algorithm (Post-Order DFS)",
  "approachSteps": [
    "Build an adjacency list mapping each origin to its destinations sorted in reverse order (so `.pop()` returns the smallest destination in O(1)).",
    "Use an explicit stack initialized with `['JFK']` and an empty `route` list.",
    "While the stack is non-empty, if the top airport has outgoing flights, pop the smallest destination and push it; otherwise pop from the stack and append to `route`.",
    "Return `route[::-1]`."
  ],
  "timeComplexity": "O(E log E)",
  "spaceComplexity": "O(E)",
  "pitfalls": [
    "Using backtracking without Hierholzer's post-order construction, which can time out on repeated cycles."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict\n\ndef findItinerary(tickets: list[list[str]]) -> list[str]:\n    adj = defaultdict(list)\n    for u, v in sorted(tickets, reverse=True):\n        adj[u].append(v)\n    stack = ['JFK']\n    route = []\n    while stack:\n        while adj[stack[-1]]:\n            stack.append(adj[stack[-1]].pop())\n        route.append(stack.pop())\n    return route[::-1]\n"
  }
},
  "making-a-large-island": {
  "problemId": "making-a-large-island",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Label each existing island with a unique ID (>= 2) and record its area; then for each `0` cell, sum `1` plus the areas of distinct neighboring island IDs.",
  "hints": [
    "Conceptual Intuition: Consider a Connected Component Labeling + Neighbor Deduplication paradigm. Label each existing island with a unique ID (>= 2) and record its area; then for each `0` cell, sum `1` plus the areas of distinct neighboring island IDs.",
    "Algorithmic Mechanics: Use a set of neighboring island IDs for each `0` cell so you never double-count an island touching the cell from two sides. Paint each connected component of `1`s with IDs `2, 3, .` using iterative BFS/DFS and store `area[id]`. Initialize `best = max(area.values(), default=0)`.",
    "Edge Cases & Optimization: Forgetting the all-1s grid where there are no `0` cells to flip. Ensure time complexity is bounded to O(n^2) with O(n^2) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Connected Component Labeling + Neighbor Deduplication",
  "approachSteps": [
    "Paint each connected component of `1`s with IDs `2, 3, ...` using iterative BFS/DFS and store `area[id]`.",
    "Initialize `best = max(area.values(), default=0)`.",
    "For every cell `(r, c)` with `grid[r][c] == 0`, collect the set of distinct neighboring island IDs (`> 1`) and update `best = max(best, 1 + sum(area[id] for id in seen))`.",
    "Return `best`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n^2)",
  "pitfalls": [
    "Forgetting the all-1s grid where there are no `0` cells to flip."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def largestIsland(grid: list[list[int]]) -> int:\n    n = len(grid)\n    g = [row[:] for row in grid]\n    area = {}\n    cid = 2\n    for r in range(n):\n        for c in range(n):\n            if g[r][c] == 1:\n                stack = [(r, c)]\n                g[r][c] = cid\n                sz = 0\n                while stack:\n                    cr, cc = stack.pop()\n                    sz += 1\n                    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n                        nr, nc = cr + dr, cc + dc\n                        if 0 <= nr < n and 0 <= nc < n and g[nr][nc] == 1:\n                            g[nr][nc] = cid\n                            stack.append((nr, nc))\n                area[cid] = sz\n                cid += 1\n    best = max(area.values(), default=0)\n    for r in range(n):\n        for c in range(n):\n            if g[r][c] == 0:\n                seen = set()\n                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n                    nr, nc = r + dr, c + dc\n                    if 0 <= nr < n and 0 <= nc < n and g[nr][nc] > 1:\n                        seen.add(g[nr][nc])\n                best = max(best, 1 + sum(area[i] for i in seen))\n    return best\n"
  }
},
  "parallel-courses-iii-time": {
  "problemId": "parallel-courses-iii-time",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use Kahn's topological sort combined with DAG DP: `finish[v] = time[v] + max(finish[u])` over all prerequisites `u` of `v`.",
  "hints": [
    "Conceptual Intuition: Consider a Kahn's Topological Sort + Longest Path DP paradigm. Use Kahn's topological sort combined with DAG DP: `finish[v] = time[v] + max(finish[u])` over all prerequisites `u` of `v`.",
    "Algorithmic Mechanics: The minimum time to complete all courses equals the longest weighted path in the DAG. Build adjacency list and `indegree` array (0-indexed). Initialize `finish[i] = time[i]` and enqueue all nodes with `indegree == 0`.",
    "Edge Cases & Optimization: Using 1-based course labels directly as 0-based indices into `time`. Ensure time complexity is bounded to O(V + E) with O(V + E) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Kahn's Topological Sort + Longest Path DP",
  "approachSteps": [
    "Build adjacency list and `indegree` array (0-indexed).",
    "Initialize `finish[i] = time[i]` and enqueue all nodes with `indegree == 0`.",
    "Pop `u`. For each dependent course `v`, set `finish[v] = max(finish[v], finish[u] + time[v])`, decrement `indegree[v]`, and enqueue `v` when `indegree[v] == 0`.",
    "Return `max(finish)`."
  ],
  "timeComplexity": "O(V + E)",
  "spaceComplexity": "O(V + E)",
  "pitfalls": [
    "Using 1-based course labels directly as 0-based indices into `time`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef minimumTime(n: int, relations: list[list[int]], time: list[int]) -> int:\n    adj = [[] for _ in range(n)]\n    indeg = [0] * n\n    for u, v in relations:\n        adj[u - 1].append(v - 1)\n        indeg[v - 1] += 1\n    finish = time[:]\n    q = deque(i for i in range(n) if indeg[i] == 0)\n    while q:\n        u = q.popleft()\n        for v in adj[u]:\n            if finish[u] + time[v] > finish[v]:\n                finish[v] = finish[u] + time[v]\n            indeg[v] -= 1\n            if indeg[v] == 0:\n                q.append(v)\n    return max(finish)\n"
  }
},
  "ways-to-arrive-destination": {
  "problemId": "ways-to-arrive-destination",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run Dijkstra's algorithm while maintaining both `dist[v]` (shortest time) and `ways[v]` (number of shortest paths to `v` mod `10^9 + 7`).",
  "hints": [
    "When a strictly shorter path to `v` is found, reset `ways[v] = ways[u]`.",
    "When an equally short path to `v` is found, add `ways[u]` to `ways[v]`.",
    "Boundary edge cases & complexity: Using 32-bit integers for distances in C++/Java when edge weights go up to `10^9`. Verify your solution strictly meets O((V + E) log V) time and O(V + E) space limits."
  ],
  "approachTitle": "Dijkstra with Path-Count DP",
  "approachSteps": [
    "Build weighted adjacency list and initialize `dist = [inf] * n`, `dist[0] = 0`, `ways = [0] * n`, `ways[0] = 1`.",
    "Use a min-heap starting with `(0, 0)`.",
    "When popping `(d, u)`, skip if `d > dist[u]`.",
    "For each neighbor `(v, t)`: if `d + t < dist[v]`, update `dist[v] = d + t`, `ways[v] = ways[u]`, and push `(dist[v], v)`. Else if `d + t == dist[v]`, add `ways[u]` to `ways[v]` modulo `10^9 + 7`.",
    "Return `ways[n - 1]`."
  ],
  "timeComplexity": "O((V + E) log V)",
  "spaceComplexity": "O(V + E)",
  "pitfalls": [
    "Using 32-bit integers for distances in C++/Java when edge weights go up to `10^9`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef countPaths(n: int, roads: list[list[int]]) -> int:\n    MOD = 10**9 + 7\n    adj = [[] for _ in range(n)]\n    for u, v, t in roads:\n        adj[u].append((v, t))\n        adj[v].append((u, t))\n    dist = [float('inf')] * n\n    ways = [0] * n\n    dist[0] = 0\n    ways[0] = 1\n    pq = [(0, 0)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]:\n            continue\n        for v, t in adj[u]:\n            nd = d + t\n            if nd < dist[v]:\n                dist[v] = nd\n                ways[v] = ways[u]\n                heapq.heappush(pq, (nd, v))\n            elif nd == dist[v]:\n                ways[v] = (ways[v] + ways[u]) % MOD\n    return ways[n - 1]\n"
  }
},
  "bst-range-sum-query": {
  "problemId": "bst-range-sum-query",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use the BST ordering property to prune subtrees outside `[low, high]` during DFS.",
  "hints": [
    "Conceptual Intuition: Consider a Pruned BST Traversal paradigm. Use the BST ordering property to prune subtrees outside `[low, high]` during DFS.",
    "Algorithmic Mechanics: Only visit the left child if `node.val > low` and the right child if `node.val < high`. Deserialize the level-order list into a binary tree. Traverse with an explicit stack starting at `root`.",
    "Edge Cases & Optimization: Ignoring the BST property and visiting every node unnecessarily. Ensure time complexity is bounded to O(n) worst case, O(k + h) average with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Pruned BST Traversal",
  "approachSteps": [
    "Deserialize the level-order list into a binary tree.",
    "Traverse with an explicit stack starting at `root`.",
    "If `low <= node.val <= high`, add `node.val` to `total`.",
    "Push `node.left` if `node.val > low` and `node.right` if `node.val < high`."
  ],
  "timeComplexity": "O(n) worst case, O(k + h) average",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Ignoring the BST property and visiting every node unnecessarily."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef rangeSumBST(root: list, low: int, high: int) -> int:\n    if not root or root[0] is None:\n        return 0\n    class Node:\n        def __init__(self, v): self.val, self.left, self.right = v, None, None\n    head = Node(root[0])\n    q = deque([head])\n    i = 1\n    while q and i < len(root):\n        cur = q.popleft()\n        if i < len(root) and root[i] is not None:\n            cur.left = Node(root[i])\n            q.append(cur.left)\n        i += 1\n        if i < len(root) and root[i] is not None:\n            cur.right = Node(root[i])\n            q.append(cur.right)\n        i += 1\n    total = 0\n    stack = [head]\n    while stack:\n        node = stack.pop()\n        if low <= node.val <= high:\n            total += node.val\n        if node.left and node.val > low:\n            stack.append(node.left)\n        if node.right and node.val < high:\n            stack.append(node.right)\n    return total\n"
  }
},
  "bst-min-absolute-diff": {
  "problemId": "bst-min-absolute-diff",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Perform an in-order traversal of the BST to visit values in sorted order and track the minimum difference between consecutive visited values.",
  "hints": [
    "Conceptual Intuition: Consider a In-Order Traversal with Previous Pointer paradigm. Perform an in-order traversal of the BST to visit values in sorted order and track the minimum difference between consecutive visited values.",
    "Algorithmic Mechanics: In a sorted sequence, the minimum absolute difference always occurs between two adjacent elements. Deserialize the level-order array into a BST. Run iterative in-order traversal maintaining `prev` and `best`.",
    "Edge Cases & Optimization: Only comparing parent-child pairs instead of in-order predecessors/successors. Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "In-Order Traversal with Previous Pointer",
  "approachSteps": [
    "Deserialize the level-order array into a BST.",
    "Run iterative in-order traversal maintaining `prev` and `best`.",
    "At each visited node, if `prev is not None`, update `best = min(best, node.val - prev)`.",
    "Update `prev = node.val` and return `best`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Only comparing parent-child pairs instead of in-order predecessors/successors."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef getMinimumDifference(root: list) -> int:\n    class Node:\n        def __init__(self, v): self.val, self.left, self.right = v, None, None\n    head = Node(root[0])\n    q = deque([head])\n    i = 1\n    while q and i < len(root):\n        cur = q.popleft()\n        if i < len(root) and root[i] is not None:\n            cur.left = Node(root[i])\n            q.append(cur.left)\n        i += 1\n        if i < len(root) and root[i] is not None:\n            cur.right = Node(root[i])\n            q.append(cur.right)\n        i += 1\n    stack = []\n    cur = head\n    prev = None\n    best = float('inf')\n    while stack or cur:\n        while cur:\n            stack.append(cur)\n            cur = cur.left\n        cur = stack.pop()\n        if prev is not None:\n            best = min(best, cur.val - prev)\n        prev = cur.val\n        cur = cur.right\n    return best\n"
  }
},
  "baseball-score-tracker": {
  "problemId": "baseball-score-tracker",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a stack of valid scores and simulate each operation in O(1) time.",
  "hints": [
    "Conceptual Intuition: Consider a Stack Simulation paradigm. Maintain a stack of valid scores and simulate each operation in O(1) time.",
    "Algorithmic Mechanics: Use `stack.pop()` for `'C'`, `stack[-1] * 2` for `'D'`, and `stack[-1] + stack[-2]` for `'+'`. Initialize an empty list `stack`. Iterate over `op` in `operations`: pop on `'C'`, push `2 * stack[-1]` on `'D'`, push `stack[-1] + stack[-2]` on `'+'`, else push `int(op)`.",
    "Edge Cases & Optimization: Forgetting negative integers when parsing score strings. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Stack Simulation",
  "approachSteps": [
    "Initialize an empty list `stack`.",
    "Iterate over `op` in `operations`: pop on `'C'`, push `2 * stack[-1]` on `'D'`, push `stack[-1] + stack[-2]` on `'+'`, else push `int(op)`.",
    "Return `sum(stack)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Forgetting negative integers when parsing score strings."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def calPoints(operations: list[str]) -> int:\n    stack = []\n    for op in operations:\n        if op == 'C':\n            stack.pop()\n        elif op == 'D':\n            stack.append(stack[-1] * 2)\n        elif op == '+':\n            stack.append(stack[-1] + stack[-2])\n        else:\n            stack.append(int(op))\n    return sum(stack)\n"
  }
},
  "strip-outer-parentheses": {
  "problemId": "strip-outer-parentheses",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track the current nesting depth `depth`; append `'('` only when `depth > 0` before incrementing, and append `')'` only when `depth > 1` before decrementing.",
  "hints": [
    "Conceptual Intuition: Consider a Nesting Depth Counter paradigm. Track the current nesting depth `depth`; append `'('` only when `depth > 0` before incrementing, and append `')'` only when `depth > 1` before decrementing.",
    "Algorithmic Mechanics: The outermost `'('` transitions depth from `0 -> 1`, and the outermost `')'` transitions depth from `1 -> 0`. Initialize `depth = 0` and an empty list `out`. For each character `ch` in `s`: if `ch == '('`, append it if `depth > 0`, then `depth += 1`.",
    "Edge Cases & Optimization: Incrementing or decrementing `depth` in the wrong order relative to the `depth > 0` check. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Nesting Depth Counter",
  "approachSteps": [
    "Initialize `depth = 0` and an empty list `out`.",
    "For each character `ch` in `s`: if `ch == '('`, append it if `depth > 0`, then `depth += 1`.",
    "Else decrement `depth -= 1`, and append `')'` if `depth > 0`.",
    "Return `''.join(out)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Incrementing or decrementing `depth` in the wrong order relative to the `depth > 0` check."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def removeOuterParentheses(s: str) -> str:\n    out = []\n    depth = 0\n    for ch in s:\n        if ch == '(':\n            if depth > 0:\n                out.append(ch)\n            depth += 1\n        else:\n            depth -= 1\n            if depth > 0:\n                out.append(ch)\n    return ''.join(out)\n"
  }
},
  "house-robber-tree-dp": {
  "problemId": "house-robber-tree-dp",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "For each subtree, return a pair `(rob_this, skip_this)` via post-order Tree DP.",
  "hints": [
    "Conceptual Intuition: Consider a Post-Order Tree DP paradigm. For each subtree, return a pair `(rob_this, skip_this)` via post-order Tree DP.",
    "Algorithmic Mechanics: If you rob a node, you must skip both children. If you skip a node, you can take the best of robbing or skipping each child independently. Deserialize `root` into a binary tree. Define `dfs(node)` returning `(take, skip)`.",
    "Edge Cases & Optimization: Assuming optimal solutions only pick alternating levels (as in `[4, 1, null, 2, null, 3]`, where `4 + 3 = 7`). Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Post-Order Tree DP",
  "approachSteps": [
    "Deserialize `root` into a binary tree.",
    "Define `dfs(node)` returning `(take, skip)`.",
    "For `None`, return `(0, 0)`.",
    "Otherwise `take = node.val + left_skip + right_skip` and `skip = max(left) + max(right)`.",
    "Return `max(dfs(head))`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Assuming optimal solutions only pick alternating levels (as in `[4, 1, null, 2, null, 3]`, where `4 + 3 = 7`)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef rob(root: list) -> int:\n    if not root or root[0] is None:\n        return 0\n    class Node:\n        def __init__(self, v): self.val, self.left, self.right = v, None, None\n    head = Node(root[0])\n    q = deque([head])\n    i = 1\n    while q and i < len(root):\n        cur = q.popleft()\n        if i < len(root) and root[i] is not None:\n            cur.left = Node(root[i])\n            q.append(cur.left)\n        i += 1\n        if i < len(root) and root[i] is not None:\n            cur.right = Node(root[i])\n            q.append(cur.right)\n        i += 1\n    def dfs(node):\n        if not node:\n            return (0, 0)\n        lt, ls = dfs(node.left)\n        rt, rs = dfs(node.right)\n        return (node.val + ls + rs, max(lt, ls) + max(rt, rs))\n    return max(dfs(head))\n"
  }
},
  "binary-tree-path-sum-iii": {
  "problemId": "binary-tree-path-sum-iii",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a hash map of prefix sums along the current root-to-node path during DFS, backtracking the map count when leaving a node.",
  "hints": [
    "Conceptual Intuition: Consider a DFS with Prefix Sum Hash Map paradigm. Maintain a hash map of prefix sums along the current root-to-node path during DFS, backtracking the map count when leaving a node.",
    "Algorithmic Mechanics: Just like Subarray Sum Equals K, the number of valid paths ending at the current node is `prefix_counts[curr_sum - targetSum]`. Deserialize `root` into a binary tree. Initialize `counts = {0: 1}`.",
    "Edge Cases & Optimization: Forgetting to decrement `counts[curr]` on backtrack, which leaks prefix sums into sibling subtrees. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "DFS with Prefix Sum Hash Map",
  "approachSteps": [
    "Deserialize `root` into a binary tree.",
    "Initialize `counts = {0: 1}`.",
    "In `dfs(node, curr)`: add `node.val` to `curr`, add `counts[curr - targetSum]` to answer, increment `counts[curr]`, recurse on left and right, then decrement `counts[curr]`.",
    "Return the accumulated count."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Forgetting to decrement `counts[curr]` on backtrack, which leaks prefix sums into sibling subtrees."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict, deque\n\ndef pathSum(root: list, targetSum: int) -> int:\n    if not root or root[0] is None:\n        return 0\n    class Node:\n        def __init__(self, v): self.val, self.left, self.right = v, None, None\n    head = Node(root[0])\n    q = deque([head])\n    i = 1\n    while q and i < len(root):\n        cur = q.popleft()\n        if i < len(root) and root[i] is not None:\n            cur.left = Node(root[i])\n            q.append(cur.left)\n        i += 1\n        if i < len(root) and root[i] is not None:\n            cur.right = Node(root[i])\n            q.append(cur.right)\n        i += 1\n    counts = defaultdict(int)\n    counts[0] = 1\n    def dfs(node, curr):\n        if not node:\n            return 0\n        curr += node.val\n        res = counts[curr - targetSum]\n        counts[curr] += 1\n        res += dfs(node.left, curr) + dfs(node.right, curr)\n        counts[curr] -= 1\n        return res\n    return dfs(head, 0)\n"
  }
},
  "bst-delete-key-node": {
  "problemId": "bst-delete-key-node",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Recursively search for `key`; if it has 0 or 1 child return the non-null child, and if it has 2 children copy the leftmost node of its right subtree and recursively delete that successor.",
  "hints": [
    "Conceptual Intuition: Consider a Recursive BST Deletion with In-Order Successor paradigm. Recursively search for `key`; if it has 0 or 1 child return the non-null child, and if it has 2 children copy the leftmost node of its right subtree and recursively delete that successor.",
    "Algorithmic Mechanics: The in-order successor of a node with a right child is found by moving right once and then left as far as possible. Deserialize `root` into a BST. In `delete(node, key)`: recurse left if `key < node.val`, right if `key > node.val`.",
    "Edge Cases & Optimization: Leaving trailing `null` entries when serializing the final tree. Ensure time complexity is bounded to O(h) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Recursive BST Deletion with In-Order Successor",
  "approachSteps": [
    "Deserialize `root` into a BST.",
    "In `delete(node, key)`: recurse left if `key < node.val`, right if `key > node.val`.",
    "When `node.val == key`, return `node.right` if `not node.left`, `node.left` if `not node.right`; otherwise find the minimum node `succ` in `node.right`, set `node.val = succ.val`, and set `node.right = delete(node.right, succ.val)`.",
    "Serialize the updated tree back to a trimmed level-order list."
  ],
  "timeComplexity": "O(h)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Leaving trailing `null` entries when serializing the final tree."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef deleteNode(root: list, key: int) -> list:\n    if not root or root[0] is None:\n        return []\n    class Node:\n        def __init__(self, v): self.val, self.left, self.right = v, None, None\n    head = Node(root[0])\n    q = deque([head])\n    i = 1\n    while q and i < len(root):\n        cur = q.popleft()\n        if i < len(root) and root[i] is not None:\n            cur.left = Node(root[i])\n            q.append(cur.left)\n        i += 1\n        if i < len(root) and root[i] is not None:\n            cur.right = Node(root[i])\n            q.append(cur.right)\n        i += 1\n    def remove(node, k):\n        if not node:\n            return None\n        if k < node.val:\n            node.left = remove(node.left, k)\n        elif k > node.val:\n            node.right = remove(node.right, k)\n        else:\n            if not node.left:\n                return node.right\n            if not node.right:\n                return node.left\n            succ = node.right\n            while succ.left:\n                succ = succ.left\n            node.val = succ.val\n            node.right = remove(node.right, succ.val)\n        return node\n    head = remove(head, key)\n    if not head:\n        return []\n    res = []\n    q = deque([head])\n    while q:\n        cur = q.popleft()\n        if cur:\n            res.append(cur.val)\n            q.append(cur.left)\n            q.append(cur.right)\n        else:\n            res.append(None)\n    while res and res[-1] is None:\n        res.pop()\n    return res\n"
  }
},
  "validate-stack-push-pop": {
  "problemId": "validate-stack-push-pop",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Simulate the stack greedily: push each element from `pushed`, and immediately pop whenever the stack top matches `popped[j]`.",
  "hints": [
    "Conceptual Intuition: Consider a Greedy Stack Simulation paradigm. Simulate the stack greedily: push each element from `pushed`, and immediately pop whenever the stack top matches `popped[j]`.",
    "Algorithmic Mechanics: Because all elements are distinct, whenever the stack top equals the next required popped value, popping immediately is always safe. Initialize `stack = []` and pointer `j = 0`. For each `x` in `pushed`, append `x` to `stack`, then while `stack` is non-empty and `stack[-1] == popped[j]`, pop and increment `j`.",
    "Edge Cases & Optimization: Checking `if` instead of `while` when popping matched elements. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Greedy Stack Simulation",
  "approachSteps": [
    "Initialize `stack = []` and pointer `j = 0`.",
    "For each `x` in `pushed`, append `x` to `stack`, then while `stack` is non-empty and `stack[-1] == popped[j]`, pop and increment `j`.",
    "Return `j == len(popped)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Checking `if` instead of `while` when popping matched elements."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def validateStackSequences(pushed: list[int], popped: list[int]) -> bool:\n    stack = []\n    j = 0\n    for x in pushed:\n        stack.append(x)\n        while stack and j < len(popped) and stack[-1] == popped[j]:\n            stack.pop()\n            j += 1\n    return j == len(popped)\n"
  }
},
  "unique-combination-sum-ii": {
  "problemId": "unique-combination-sum-ii",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort `candidates` and run backtracking, skipping duplicate values at the same recursion depth (`i > start and candidates[i] == candidates[i - 1]`).",
  "hints": [
    "Conceptual Intuition: Consider a Sorted Backtracking with Depth-Level Deduplication paradigm. Sort `candidates` and run backtracking, skipping duplicate values at the same recursion depth (`i > start and candidates[i] == candidates[i - 1]`).",
    "Algorithmic Mechanics: Break out of the loop early once `candidates[i] > rem` because the array is sorted. Sort `candidates`. Define `dfs(start, rem, path)`: if `rem == 0`, append `path[:]` and return.",
    "Edge Cases & Optimization: Skipping duplicates globally (`i > 0`) instead of only at the same recursion level (`i > start`), which erroneously forbids `[1, 1, 6]`. Ensure time complexity is bounded to O(2^n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Sorted Backtracking with Depth-Level Deduplication",
  "approachSteps": [
    "Sort `candidates`.",
    "Define `dfs(start, rem, path)`: if `rem == 0`, append `path[:]` and return.",
    "Loop `i` from `start` to `n - 1`: skip if `i > start and candidates[i] == candidates[i - 1]`; break if `candidates[i] > rem`.",
    "Push `candidates[i]`, recurse with `(i + 1, rem - candidates[i])`, and pop."
  ],
  "timeComplexity": "O(2^n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Skipping duplicates globally (`i > 0`) instead of only at the same recursion level (`i > start`), which erroneously forbids `[1, 1, 6]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def combinationSum2(candidates: list[int], target: int) -> list[list[int]]:\n    candidates.sort()\n    res = []\n    path = []\n    def dfs(start: int, rem: int) -> None:\n        if rem == 0:\n            res.append(path[:])\n            return\n        for i in range(start, len(candidates)):\n            if i > start and candidates[i] == candidates[i - 1]:\n                continue\n            if candidates[i] > rem:\n                break\n            path.append(candidates[i])\n            dfs(i + 1, rem - candidates[i])\n            path.pop()\n    dfs(0, target)\n    return res\n"
  }
},
  "subsets-with-duplicates": {
  "problemId": "subsets-with-duplicates",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort `nums` and backtrack, skipping `nums[i]` when `i > start and nums[i] == nums[i - 1]`.",
  "hints": [
    "Conceptual Intuition: Consider a Sorted Backtracking paradigm. Sort `nums` and backtrack, skipping `nums[i]` when `i > start and nums[i] == nums[i - 1]`.",
    "Algorithmic Mechanics: Sorting places equal elements adjacent so duplicates at the same decision level are skipped in O(1). Sort `nums`. In `dfs(start)`, record `path[:]` into `res`.",
    "Edge Cases & Optimization: Forgetting to sort `nums` before skipping adjacent duplicates. Ensure time complexity is bounded to O(n * 2^n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Sorted Backtracking",
  "approachSteps": [
    "Sort `nums`.",
    "In `dfs(start)`, record `path[:]` into `res`.",
    "For `i` from `start` to `n - 1`, skip if `i > start and nums[i] == nums[i - 1]`; otherwise append `nums[i]`, recurse on `i + 1`, and pop."
  ],
  "timeComplexity": "O(n * 2^n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Forgetting to sort `nums` before skipping adjacent duplicates."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def subsetsWithDup(nums: list[int]) -> list[list[int]]:\n    nums.sort()\n    res = []\n    path = []\n    def dfs(start: int) -> None:\n        res.append(path[:])\n        for i in range(start, len(nums)):\n            if i > start and nums[i] == nums[i - 1]:\n                continue\n            path.append(nums[i])\n            dfs(i + 1)\n            path.pop()\n    dfs(0)\n    return res\n"
  }
},
  "all-palindrome-partitions": {
  "problemId": "all-palindrome-partitions",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Precompute a palindrome lookup table `is_pal[i][j]` and use backtracking from index `0` to try every palindromic prefix.",
  "hints": [
    "Conceptual Intuition: Consider a Backtracking with Palindrome Table paradigm. Precompute a palindrome lookup table `is_pal[i][j]` and use backtracking from index `0` to try every palindromic prefix.",
    "Algorithmic Mechanics: At index `start`, try every `end >= start` such that `s[start:end + 1]` is a palindrome. Precompute `is_pal[i][j]` in O(n^2) time. In `dfs(start)`: if `start == n`, append `path[:]` and return.",
    "Edge Cases & Optimization: Appending `path` by reference instead of copying `path[:]`. Ensure time complexity is bounded to O(n * 2^n) with O(n^2) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Backtracking with Palindrome Table",
  "approachSteps": [
    "Precompute `is_pal[i][j]` in O(n^2) time.",
    "In `dfs(start)`: if `start == n`, append `path[:]` and return.",
    "For `end` from `start` to `n - 1`: if `is_pal[start][end]`, push `s[start:end + 1]`, recurse on `end + 1`, and pop."
  ],
  "timeComplexity": "O(n * 2^n)",
  "spaceComplexity": "O(n^2)",
  "pitfalls": [
    "Appending `path` by reference instead of copying `path[:]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def partition(s: str) -> list[list[str]]:\n    n = len(s)\n    is_pal = [[False] * n for _ in range(n)]\n    for i in range(n - 1, -1, -1):\n        for j in range(i, n):\n            if s[i] == s[j] and (j - i <= 2 or is_pal[i + 1][j - 1]):\n                is_pal[i][j] = True\n    res = []\n    path = []\n    def dfs(start: int) -> None:\n        if start == n:\n            res.append(path[:])\n            return\n        for end in range(start, n):\n            if is_pal[start][end]:\n                path.append(s[start:end + 1])\n                dfs(end + 1)\n                path.pop()\n    dfs(0)\n    return res\n"
  }
},
  "restore-valid-ip-addresses": {
  "problemId": "restore-valid-ip-addresses",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Backtrack over 4 segments of length 1 to 3, pruning whenever remaining digits cannot fit or a segment has a leading zero or exceeds 255.",
  "hints": [
    "Conceptual Intuition: Consider a Bounded Backtracking paradigm. Backtrack over 4 segments of length 1 to 3, pruning whenever remaining digits cannot fit or a segment has a leading zero or exceeds 255.",
    "Algorithmic Mechanics: If `len(s) < 4` or `len(s) > 12`, no valid IPv4 address can exist. Return `[]` immediately if `len(s) < 4` or `len(s) > 12`. In `dfs(idx, parts)`: if `len(parts) == 4`, record `'.'.join(parts)` when `idx == len(s)` and return.",
    "Edge Cases & Optimization: Allowing segments like `'01'` or `'00'`. Ensure time complexity is bounded to O(3^4) = O(1) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bounded Backtracking",
  "approachSteps": [
    "Return `[]` immediately if `len(s) < 4` or `len(s) > 12`.",
    "In `dfs(idx, parts)`: if `len(parts) == 4`, record `'.'.join(parts)` when `idx == len(s)` and return.",
    "Try lengths `1, 2, 3` starting at `idx`. Reject segments starting with `'0'` of length > 1 or integer value > 255.",
    "Recurse and backtrack."
  ],
  "timeComplexity": "O(3^4) = O(1)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Allowing segments like `'01'` or `'00'`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def restoreIpAddresses(s: str) -> list[str]:\n    n = len(s)\n    if n < 4 or n > 12:\n        return []\n    res = []\n    parts = []\n    def dfs(idx: int) -> None:\n        if len(parts) == 4:\n            if idx == n:\n                res.append('.'.join(parts))\n            return\n        rem_parts = 4 - len(parts)\n        rem_chars = n - idx\n        if rem_chars < rem_parts or rem_chars > rem_parts * 3:\n            return\n        for length in range(1, 4):\n            if idx + length > n:\n                break\n            seg = s[idx:idx + length]\n            if (length > 1 and seg[0] == '0') or int(seg) > 255:\n                continue\n            parts.append(seg)\n            dfs(idx + length)\n            parts.pop()\n    dfs(0)\n    return res\n"
  }
},
  "lfu-cache-design": {
  "problemId": "lfu-cache-design",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain `key -> (val, freq)` and `freq -> OrderedDict` (doubly linked list) plus `min_freq` so both `get` and `put` operate in O(1).",
  "hints": [
    "Conceptual Intuition: Consider a Frequency Buckets with OrderedDict paradigm. Maintain `key -> (val, freq)` and `freq -> OrderedDict` (doubly linked list) plus `min_freq` so both `get` and `put` operate in O(1).",
    "Algorithmic Mechanics: When incrementing a key's frequency from `f` to `f + 1`, if bucket `f` becomes empty and `f == min_freq`, increment `min_freq`. Store `key_map[k] = [val, freq]` and `freq_map[f] = OrderedDict()`. On `touch(k)`: remove `k` from `freq_map[f]`, increment `f`, insert into `freq_map[f + 1]`, and bump `min_freq` if `freq_map[min_freq]` is now empty.",
    "Edge Cases & Optimization: Forgetting `capacity == 0` where `put` must be a no-op. Ensure time complexity is bounded to O(1) per operation with O(capacity) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Frequency Buckets with OrderedDict",
  "approachSteps": [
    "Store `key_map[k] = [val, freq]` and `freq_map[f] = OrderedDict()`.",
    "On `touch(k)`: remove `k` from `freq_map[f]`, increment `f`, insert into `freq_map[f + 1]`, and bump `min_freq` if `freq_map[min_freq]` is now empty.",
    "On `put(k, v)` for a new key: if at capacity, `popitem(last=False)` from `freq_map[min_freq]` and delete it from `key_map`; insert `k` at frequency `1` and set `min_freq = 1`."
  ],
  "timeComplexity": "O(1) per operation",
  "spaceComplexity": "O(capacity)",
  "pitfalls": [
    "Forgetting `capacity == 0` where `put` must be a no-op."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict, OrderedDict\n\ndef simulateLFU(capacity: int, operations: list[list]) -> list[int]:\n    key_map = {}\n    freq_map = defaultdict(OrderedDict)\n    min_freq = 0\n    out = []\n    def touch(k: int) -> None:\n        nonlocal min_freq\n        v, f = key_map[k]\n        del freq_map[f][k]\n        if not freq_map[f] and f == min_freq:\n            min_freq += 1\n        key_map[k][1] = f + 1\n        freq_map[f + 1][k] = None\n    for op in operations:\n        if op[0] == 'get':\n            k = op[1]\n            if k not in key_map:\n                out.append(-1)\n            else:\n                touch(k)\n                out.append(key_map[k][0])\n        else:\n            k, v = op[1], op[2]\n            if capacity == 0:\n                continue\n            if k in key_map:\n                key_map[k][0] = v\n                touch(k)\n            else:\n                if len(key_map) == capacity:\n                    evict_k, _ = freq_map[min_freq].popitem(last=False)\n                    del key_map[evict_k]\n                key_map[k] = [v, 1]\n                freq_map[1][k] = None\n                min_freq = 1\n    return out\n"
  }
},
  "binary-tree-cameras-min": {
  "problemId": "binary-tree-cameras-min",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use bottom-up greedy DFS with 3 states: `0` (needs coverage), `1` (has camera), `2` (covered without camera). Place a camera at any node whose child is in state `0`.",
  "hints": [
    "Placing a camera at a leaf's parent is always at least as good as placing it at the leaf itself.",
    "Don't forget to check whether the root itself still needs coverage after DFS returns.",
    "Boundary edge cases & complexity: Forgetting to add a camera when the root returns state `0` (e.g., single-node tree). Verify your solution strictly meets O(n) time and O(h) space limits."
  ],
  "approachTitle": "Bottom-Up 3-State Greedy DFS",
  "approachSteps": [
    "Deserialize `root` into a binary tree.",
    "Null nodes return state `2` (already covered).",
    "In `dfs(node)`: recurse on left and right. If either child is `0`, place a camera here (`cameras += 1`) and return `1`. Else if either child is `1`, return `2`. Otherwise return `0`.",
    "If `dfs(head) == 0`, add one more camera for the root."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Forgetting to add a camera when the root returns state `0` (e.g., single-node tree)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef minCameraCover(root: list) -> int:\n    class Node:\n        def __init__(self, v): self.val, self.left, self.right = v, None, None\n    head = Node(root[0])\n    q = deque([head])\n    i = 1\n    while q and i < len(root):\n        cur = q.popleft()\n        if i < len(root) and root[i] is not None:\n            cur.left = Node(root[i])\n            q.append(cur.left)\n        i += 1\n        if i < len(root) and root[i] is not None:\n            cur.right = Node(root[i])\n            q.append(cur.right)\n        i += 1\n    cams = 0\n    def dfs(node) -> int:\n        nonlocal cams\n        if not node:\n            return 2\n        l, r = dfs(node.left), dfs(node.right)\n        if l == 0 or r == 0:\n            cams += 1\n            return 1\n        if l == 1 or r == 1:\n            return 2\n        return 0\n    if dfs(head) == 0:\n        cams += 1\n    return cams\n"
  }
},
  "tree-vertical-order-traversal": {
  "problemId": "tree-vertical-order-traversal",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Collect `(col, row, val)` tuples for every node via DFS/BFS, sort them lexicographically, and group values by `col`.",
  "hints": [
    "Conceptual Intuition: Consider a Coordinate Collection + Lexicographical Sort paradigm. Collect `(col, row, val)` tuples for every node via DFS/BFS, sort them lexicographically, and group values by `col`.",
    "Algorithmic Mechanics: Sorting `(col, row, val)` directly satisfies all three ordering rules at once. Deserialize `root` into a binary tree. Traverse the tree collecting `(col, row, node.val)` for every node.",
    "Edge Cases & Optimization: Relying on BFS order alone without sorting same-`(row, col)` nodes by value. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Coordinate Collection + Lexicographical Sort",
  "approachSteps": [
    "Deserialize `root` into a binary tree.",
    "Traverse the tree collecting `(col, row, node.val)` for every node.",
    "Sort the collected tuples and group consecutive tuples with the same `col` into lists."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Relying on BFS order alone without sorting same-`(row, col)` nodes by value."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict, deque\n\ndef verticalTraversal(root: list) -> list[list[int]]:\n    class Node:\n        def __init__(self, v): self.val, self.left, self.right = v, None, None\n    head = Node(root[0])\n    q = deque([head])\n    i = 1\n    while q and i < len(root):\n        cur = q.popleft()\n        if i < len(root) and root[i] is not None:\n            cur.left = Node(root[i])\n            q.append(cur.left)\n        i += 1\n        if i < len(root) and root[i] is not None:\n            cur.right = Node(root[i])\n            q.append(cur.right)\n        i += 1\n    nodes = []\n    stack = [(head, 0, 0)]\n    while stack:\n        cur, r, c = stack.pop()\n        nodes.append((c, r, cur.val))\n        if cur.left:\n            stack.append((cur.left, r + 1, c - 1))\n        if cur.right:\n            stack.append((cur.right, r + 1, c + 1))\n    nodes.sort()\n    cols = defaultdict(list)\n    for c, r, v in nodes:\n        cols[c].append(v)\n    return [cols[c] for c in sorted(cols)]\n"
  }
},
  "serialize-deserialize-tree": {
  "problemId": "serialize-deserialize-tree",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use preorder DFS with explicit `'#'` null markers for serialization, and consume the token iterator recursively during deserialization.",
  "hints": [
    "Conceptual Intuition: Consider a Preorder DFS Codec with Null Sentinels paradigm. Use preorder DFS with explicit `'#'` null markers for serialization, and consume the token iterator recursively during deserialization.",
    "Algorithmic Mechanics: Preorder traversal with null sentinels uniquely determines any binary tree. Build the tree from `root`. `serialize(node)`: emit `str(node.val)` then recurse left and right, emitting `'#'` for `None`.",
    "Edge Cases & Optimization: Failing to handle negative numbers or `0` (falsy in Python) properly. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Preorder DFS Codec with Null Sentinels",
  "approachSteps": [
    "Build the tree from `root`.",
    "`serialize(node)`: emit `str(node.val)` then recurse left and right, emitting `'#'` for `None`.",
    "`deserialize(tokens)`: consume next token; if `'#'`, return `None`, else construct node and recursively attach left and right children.",
    "Convert the decoded tree back to a trimmed level-order list."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Failing to handle negative numbers or `0` (falsy in Python) properly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef roundTripTree(root: list) -> list:\n    if not root or root[0] is None:\n        return []\n    class Node:\n        def __init__(self, v): self.val, self.left, self.right = v, None, None\n    head = Node(root[0])\n    q = deque([head])\n    i = 1\n    while q and i < len(root):\n        cur = q.popleft()\n        if i < len(root) and root[i] is not None:\n            cur.left = Node(root[i])\n            q.append(cur.left)\n        i += 1\n        if i < len(root) and root[i] is not None:\n            cur.right = Node(root[i])\n            q.append(cur.right)\n        i += 1\n    tokens = []\n    def ser(node):\n        if not node:\n            tokens.append('#')\n            return\n        tokens.append(str(node.val))\n        ser(node.left)\n        ser(node.right)\n    ser(head)\n    data = ','.join(tokens)\n    it = iter(data.split(','))\n    def deser():\n        tok = next(it)\n        if tok == '#':\n            return None\n        node = Node(int(tok))\n        node.left = deser()\n        node.right = deser()\n        return node\n    decoded = deser()\n    out = []\n    q = deque([decoded])\n    while q:\n        cur = q.popleft()\n        if cur:\n            out.append(cur.val)\n            q.append(cur.left)\n            q.append(cur.right)\n        else:\n            out.append(None)\n    while out and out[-1] is None:\n        out.pop()\n    return out\n"
  }
},
  "recover-swapped-bst": {
  "problemId": "recover-swapped-bst",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "An in-order traversal of a corrupted BST has either one or two inversions (`prev.val > cur.val`); record `first = prev` on the first inversion and `second = cur` on every inversion, then swap their values.",
  "hints": [
    "Conceptual Intuition: Consider a In-Order Inversion Detection paradigm. An in-order traversal of a corrupted BST has either one or two inversions (`prev.val > cur.val`); record `first = prev` on the first inversion and `second = cur` on every inversion, then swap their values.",
    "Algorithmic Mechanics: When the two swapped nodes are adjacent in in-order, only one inversion occurs; when non-adjacent, two inversions occur. Deserialize `root` into a binary tree. Run iterative in-order traversal tracking `prev`, `first`, and `second`.",
    "Edge Cases & Optimization: Not handling the single-inversion case when the swapped nodes are adjacent in in-order. Ensure time complexity is bounded to O(n) with O(h) (or O(1) with Morris traversal) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "In-Order Inversion Detection",
  "approachSteps": [
    "Deserialize `root` into a binary tree.",
    "Run iterative in-order traversal tracking `prev`, `first`, and `second`.",
    "Whenever `prev` and `prev.val > cur.val`, set `first = prev` if `first is None`, and always set `second = cur`.",
    "Swap `first.val` and `second.val`, then serialize the tree back to a trimmed level-order list."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h) (or O(1) with Morris traversal)",
  "pitfalls": [
    "Not handling the single-inversion case when the swapped nodes are adjacent in in-order."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef recoverTree(root: list) -> list:\n    class Node:\n        def __init__(self, v): self.val, self.left, self.right = v, None, None\n    head = Node(root[0])\n    q = deque([head])\n    i = 1\n    while q and i < len(root):\n        cur = q.popleft()\n        if i < len(root) and root[i] is not None:\n            cur.left = Node(root[i])\n            q.append(cur.left)\n        i += 1\n        if i < len(root) and root[i] is not None:\n            cur.right = Node(root[i])\n            q.append(cur.right)\n        i += 1\n    stack = []\n    cur = head\n    prev = first = second = None\n    while stack or cur:\n        while cur:\n            stack.append(cur)\n            cur = cur.left\n        cur = stack.pop()\n        if prev and prev.val > cur.val:\n            if first is None:\n                first = prev\n            second = cur\n        prev = cur\n        cur = cur.right\n    first.val, second.val = second.val, first.val\n    out = []\n    q = deque([head])\n    while q:\n        cur = q.popleft()\n        if cur:\n            out.append(cur.val)\n            q.append(cur.left)\n            q.append(cur.right)\n        else:\n            out.append(None)\n    while out and out[-1] is None:\n        out.pop()\n    return out\n"
  }
},
  "expression-add-operators": {
  "problemId": "expression-add-operators",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Backtrack over operand splits while carrying both the running value `val` and the last signed multiplicative term `last` so `'*'` can undo and re-apply precedence in O(1).",
  "hints": [
    "For multiplication: `new_val = val - last + last * cur` and `new_last = last * cur`.",
    "Stop extending an operand if its first character is `'0'` and its length exceeds 1.",
    "Boundary edge cases & complexity: Allowing multi-digit numbers with leading zeros such as `'05'`. Verify your solution strictly meets O(n * 4^n) time and O(n) space limits."
  ],
  "approachTitle": "Backtracking with Precedence Tracking",
  "approachSteps": [
    "Define `dfs(idx, expr, val, last)`.",
    "If `idx == len(num)`, record `expr` when `val == target` and return.",
    "Iterate `end` from `idx` to `len(num) - 1`; break if `end > idx and num[idx] == '0'`.",
    "Parse `cur = int(num[idx:end + 1])`. If `idx == 0`, start the expression with `cur`; otherwise branch on `+`, `-`, and `*` updating `(val, last)` accordingly."
  ],
  "timeComplexity": "O(n * 4^n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Allowing multi-digit numbers with leading zeros such as `'05'`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def addOperators(num: str, target: int) -> list[str]:\n    res = []\n    n = len(num)\n    def dfs(idx: int, expr: str, val: int, last: int) -> None:\n        if idx == n:\n            if val == target:\n                res.append(expr)\n            return\n        for end in range(idx, n):\n            if end > idx and num[idx] == '0':\n                break\n            s = num[idx:end + 1]\n            cur = int(s)\n            if idx == 0:\n                dfs(end + 1, s, cur, cur)\n            else:\n                dfs(end + 1, expr + '+' + s, val + cur, cur)\n                dfs(end + 1, expr + '-' + s, val - cur, -cur)\n                dfs(end + 1, expr + '*' + s, val - last + last * cur, last * cur)\n    dfs(0, '', 0, 0)\n    return res\n"
  }
},
  "sliding-window-median": {
  "problemId": "sliding-window-median",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a max-heap `small` and a min-heap `large` with lazy deletion counts so each slide updates the median in O(log k) time.",
  "hints": [
    "Keep `small` holding `(k + 1) // 2` valid elements and `large` holding `k // 2` valid elements.",
    "Prune lazily deleted elements whenever they surface at the top of either heap.",
    "Boundary edge cases & complexity: Not pruning lazy-deleted elements from heap tops before reading the median or rebalancing. Verify your solution strictly meets O(n log k) time and O(n) space limits."
  ],
  "approachTitle": "Two Heaps with Lazy Deletion",
  "approachSteps": [
    "Use a max-heap `small` (negated values), min-heap `large`, and a hash map `delayed` for pending deletions.",
    "Maintain exact valid sizes `small_sz` and `large_sz`.",
    "For each window step, insert the incoming element, mark the outgoing element in `delayed`, rebalance the two heaps, prune invalid tops, and record the median."
  ],
  "timeComplexity": "O(n log k)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Not pruning lazy-deleted elements from heap tops before reading the median or rebalancing."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\nfrom collections import defaultdict\n\ndef medianSlidingWindow(nums: list[int], k: int) -> list[float]:\n    small, large = [], []\n    delayed = defaultdict(int)\n    small_sz = large_sz = 0\n\n    def prune(heap, is_small):\n        while heap:\n            val = -heap[0] if is_small else heap[0]\n            if delayed[val] > 0:\n                delayed[val] -= 1\n                heapq.heappop(heap)\n            else:\n                break\n\n    def rebalance():\n        nonlocal small_sz, large_sz\n        if small_sz > large_sz + 1:\n            heapq.heappush(large, -heapq.heappop(small))\n            small_sz -= 1\n            large_sz += 1\n            prune(small, True)\n        elif small_sz < large_sz:\n            heapq.heappush(small, -heapq.heappop(large))\n            large_sz -= 1\n            small_sz += 1\n            prune(large, False)\n\n    def add(x):\n        nonlocal small_sz, large_sz\n        if not small or x <= -small[0]:\n            heapq.heappush(small, -x)\n            small_sz += 1\n        else:\n            heapq.heappush(large, x)\n            large_sz += 1\n        rebalance()\n\n    def remove(x):\n        nonlocal small_sz, large_sz\n        delayed[x] += 1\n        if x <= -small[0]:\n            small_sz -= 1\n            if x == -small[0]:\n                prune(small, True)\n        else:\n            large_sz -= 1\n            if large and x == large[0]:\n                prune(large, False)\n        rebalance()\n\n    def get_med():\n        return float(-small[0]) if k % 2 == 1 else (-small[0] + large[0]) / 2.0\n\n    for i in range(k):\n        add(nums[i])\n    res = [get_med()]\n    for i in range(k, len(nums)):\n        add(nums[i])\n        remove(nums[i - k])\n        res.append(get_med())\n    return res\n"
  }
},
  "longest-valid-obstacle-course": {
  "problemId": "longest-valid-obstacle-course",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a patience-sorting `tails` array where `tails[L]` is the smallest ending height of a non-decreasing subsequence of length `L + 1`, using upper-bound binary search (`bisect_right`).",
  "hints": [
    "Conceptual Intuition: Consider a Patience Sorting with Upper-Bound Binary Search paradigm. Maintain a patience-sorting `tails` array where `tails[L]` is the smallest ending height of a non-decreasing subsequence of length `L + 1`, using upper-bound binary search (`bisect_right`).",
    "Algorithmic Mechanics: Because equal heights are allowed (non-decreasing), use `bisect_right` instead of `bisect_left`. Initialize an empty list `tails` and result list `ans`. For each `h` in `obstacles`, find `idx = bisect_right(tails, h)`.",
    "Edge Cases & Optimization: Using `bisect_left`, which computes strictly increasing subsequences instead of non-decreasing ones. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Patience Sorting with Upper-Bound Binary Search",
  "approachSteps": [
    "Initialize an empty list `tails` and result list `ans`.",
    "For each `h` in `obstacles`, find `idx = bisect_right(tails, h)`.",
    "If `idx == len(tails)`, append `h`; otherwise set `tails[idx] = h`.",
    "Append `idx + 1` to `ans`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Using `bisect_left`, which computes strictly increasing subsequences instead of non-decreasing ones."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from bisect import bisect_right\n\ndef longestObstacleCourseAtEachPosition(obstacles: list[int]) -> list[int]:\n    tails = []\n    ans = []\n    for h in obstacles:\n        idx = bisect_right(tails, h)\n        if idx == len(tails):\n            tails.append(h)\n        else:\n            tails[idx] = h\n        ans.append(idx + 1)\n    return ans\n"
  }
},
  "ugly-number-factor-check": {
  "problemId": "ugly-number-factor-check",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Reject non-positive integers, then repeatedly divide `n` by `2`, `3`, and `5` and check if the result equals `1`.",
  "hints": [
    "Conceptual Intuition: Consider a Iterative Factor Division paradigm. Reject non-positive integers, then repeatedly divide `n` by `2`, `3`, and `5` and check if the result equals `1`.",
    "Algorithmic Mechanics: Remember that `1` has no prime factors, so `1` is considered an ugly number, whereas `0` and negative numbers are not. If `n <= 0`, return `False`. For `p` in `(2, 3, 5)`, divide `n` by `p` while `n % p == 0`.",
    "Edge Cases & Optimization: Entering an infinite loop on `n = 0` because `0 % 2 == 0`. Ensure time complexity is bounded to O(log n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Iterative Factor Division",
  "approachSteps": [
    "If `n <= 0`, return `False`.",
    "For `p` in `(2, 3, 5)`, divide `n` by `p` while `n % p == 0`.",
    "Return `n == 1`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Entering an infinite loop on `n = 0` because `0 % 2 == 0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def isUgly(n: int) -> bool:\n    if n <= 0:\n        return False\n    for p in (2, 3, 5):\n        while n % p == 0:\n            n //= p\n    return n == 1\n"
  }
},
  "assign-cookies-greedy": {
  "problemId": "assign-cookies-greedy",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort both `g` and `s` and use two pointers to match the least greedy child with the smallest cookie that satisfies them.",
  "hints": [
    "Conceptual Intuition: Consider a Sort + Two-Pointer Greedy Matching paradigm. Sort both `g` and `s` and use two pointers to match the least greedy child with the smallest cookie that satisfies them.",
    "Algorithmic Mechanics: Giving a needlessly large cookie to an easy-to-satisfy child wastes capacity for greedier children. Sort `g` and `s` in ascending order. Initialize `i = 0` (child) and `j = 0` (cookie).",
    "Edge Cases & Optimization: Advancing the child pointer even when the current cookie is too small. Ensure time complexity is bounded to O(n log n + m log m) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Sort + Two-Pointer Greedy Matching",
  "approachSteps": [
    "Sort `g` and `s` in ascending order.",
    "Initialize `i = 0` (child) and `j = 0` (cookie).",
    "While `i < len(g)` and `j < len(s)`, if `s[j] >= g[i]`, increment `i`; always increment `j`.",
    "Return `i`."
  ],
  "timeComplexity": "O(n log n + m log m)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Advancing the child pointer even when the current cookie is too small."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def findContentChildren(g: list[int], s: list[int]) -> int:\n    g.sort()\n    s.sort()\n    i = j = 0\n    while i < len(g) and j < len(s):\n        if s[j] >= g[i]:\n            i += 1\n        j += 1\n    return i\n"
  }
},
  "fibonacci-sequence-nth": {
  "problemId": "fibonacci-sequence-nth",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Compute `F(n)` iteratively in O(n) time and O(1) space using two rolling variables.",
  "hints": [
    "Conceptual Intuition: Consider a Iterative Rolling Variables paradigm. Compute `F(n)` iteratively in O(n) time and O(1) space using two rolling variables.",
    "Algorithmic Mechanics: Only the last two Fibonacci values are needed at each step. Initialize `a, b = 0, 1`. Repeat `n` times: `a, b = b, a + b`.",
    "Edge Cases & Optimization: Using naive recursion, which takes exponential O(2^n) time. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Iterative Rolling Variables",
  "approachSteps": [
    "Initialize `a, b = 0, 1`.",
    "Repeat `n` times: `a, b = b, a + b`.",
    "Return `a`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Using naive recursion, which takes exponential O(2^n) time."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def fib(n: int) -> int:\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n"
  }
},
  "longest-harmonious-subseq": {
  "problemId": "longest-harmonious-subseq",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Count frequencies of each value; for every value `x` where `x + 1` also exists, update the answer with `freq[x] + freq[x + 1]`.",
  "hints": [
    "Conceptual Intuition: Consider a Frequency Map Pairing paradigm. Count frequencies of each value; for every value `x` where `x + 1` also exists, update the answer with `freq[x] + freq[x + 1]`.",
    "Algorithmic Mechanics: Subsequence order does not matter—only the counts of `x` and `x + 1`. Build `freq = Counter(nums)`. For each `x` in `freq`, if `x + 1` is in `freq`, update `best = max(best, freq[x] + freq[x + 1])`.",
    "Edge Cases & Optimization: Returning `freq[x]` when `x + 1` is absent (difference would be 0, not 1). Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Frequency Map Pairing",
  "approachSteps": [
    "Build `freq = Counter(nums)`.",
    "For each `x` in `freq`, if `x + 1` is in `freq`, update `best = max(best, freq[x] + freq[x + 1])`.",
    "Return `best`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Returning `freq[x]` when `x + 1` is absent (difference would be 0, not 1)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import Counter\n\ndef findLHS(nums: list[int]) -> int:\n    freq = Counter(nums)\n    best = 0\n    for x, c in freq.items():\n        if x + 1 in freq:\n            best = max(best, c + freq[x + 1])\n    return best\n"
  }
},
  "knight-dialer-moves": {
  "problemId": "knight-dialer-moves",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a 10-element DP vector `dp[d]` for the number of length-`k` paths ending at digit `d`, transitioning along the fixed knight move graph.",
  "hints": [
    "Conceptual Intuition: Consider a State-Transition DP on 10-Node Graph paradigm. Maintain a 10-element DP vector `dp[d]` for the number of length-`k` paths ending at digit `d`, transitioning along the fixed knight move graph.",
    "Algorithmic Mechanics: Digit `5` has no valid knight moves; `0` jumps to `4, 6`. Hardcode the knight adjacency list for digits `0.9`. Initialize `dp = [1] * 10`.",
    "Edge Cases & Optimization: Forgetting to apply modulo `10^9 + 7` at each step. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "State-Transition DP on 10-Node Graph",
  "approachSteps": [
    "Hardcode the knight adjacency list for digits `0..9`.",
    "Initialize `dp = [1] * 10`.",
    "Repeat `n - 1` times: compute `ndp[v] = sum(dp[u] for u in moves[v]) % MOD`.",
    "Return `sum(dp) % MOD`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Forgetting to apply modulo `10^9 + 7` at each step."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def knightDialer(n: int) -> int:\n    MOD = 10**9 + 7\n    moves = [\n        [4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],\n        [], [0, 1, 7], [2, 6], [1, 3], [2, 4]\n    ]\n    dp = [1] * 10\n    for _ in range(n - 1):\n        dp = [sum(dp[u] for u in moves[v]) % MOD for v in range(10)]\n    return sum(dp) % MOD\n"
  }
},
  "min-delete-two-strings": {
  "problemId": "min-delete-two-strings",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Find the Longest Common Subsequence length `L`; the minimum deletions equal `len(word1) + len(word2) - 2 * L`.",
  "hints": [
    "Conceptual Intuition: Consider a Longest Common Subsequence DP paradigm. Find the Longest Common Subsequence length `L`; the minimum deletions equal `len(word1) + len(word2) - 2 * L`.",
    "Algorithmic Mechanics: Any characters kept in both strings must form a common subsequence. Compute `lcs` of `word1` and `word2` using 1D space-optimized DP. Return `len(word1) + len(word2) - 2 * lcs`.",
    "Edge Cases & Optimization: Confusing deletion distance with full Levenshtein edit distance (which allows substitutions). Ensure time complexity is bounded to O(m * n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Longest Common Subsequence DP",
  "approachSteps": [
    "Compute `lcs` of `word1` and `word2` using 1D space-optimized DP.",
    "Return `len(word1) + len(word2) - 2 * lcs`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Confusing deletion distance with full Levenshtein edit distance (which allows substitutions)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def minDistance(word1: str, word2: str) -> int:\n    m, n = len(word1), len(word2)\n    dp = [0] * (n + 1)\n    for c1 in word1:\n        prev = 0\n        for j, c2 in enumerate(word2, 1):\n            cur = dp[j]\n            if c1 == c2:\n                dp[j] = prev + 1\n            else:\n                dp[j] = max(dp[j], dp[j - 1])\n            prev = cur\n    return m + n - 2 * dp[n]\n"
  }
},
  "stone-game-optimal-dp": {
  "problemId": "stone-game-optimal-dp",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Interval DP `dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1])` computes Alice's optimal score margin; mathematically, with even piles and odd total, Alice can always force taking all even-indexed or all odd-indexed piles and win.",
  "hints": [
    "Conceptual Intuition: Consider a Minimax Interval DP (Space Optimized) paradigm. Interval DP `dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1])` computes Alice's optimal score margin; mathematically, with even piles and odd total, Alice can always force taking all even-indexed or all odd-indexed piles and win.",
    "Algorithmic Mechanics: Use interval DP for the general game, or notice the parity coloring argument. Initialize `dp = piles[:]` representing single-pile margins. For subarray lengths `2.n`, update `dp[i] = max(piles[i] - dp[i + 1], piles[i + length - 1] - dp[i])`.",
    "Edge Cases & Optimization: Assuming the parity shortcut still holds if the number of piles were odd. Ensure time complexity is bounded to O(n^2) DP (or O(1) via parity proof) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Minimax Interval DP (Space Optimized)",
  "approachSteps": [
    "Initialize `dp = piles[:]` representing single-pile margins.",
    "For subarray lengths `2..n`, update `dp[i] = max(piles[i] - dp[i + 1], piles[i + length - 1] - dp[i])`.",
    "Return `dp[0] > 0`."
  ],
  "timeComplexity": "O(n^2) DP (or O(1) via parity proof)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Assuming the parity shortcut still holds if the number of piles were odd."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def stoneGame(piles: list[int]) -> bool:\n    n = len(piles)\n    dp = piles[:]\n    for length in range(2, n + 1):\n        for i in range(n - length + 1):\n            j = i + length - 1\n            dp[i] = max(piles[i] - dp[i + 1], piles[j] - dp[i])\n    return dp[0] > 0\n"
  }
},
  "partition-k-equal-subsets": {
  "problemId": "partition-k-equal-subsets",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use bitmask DP over subsets of used elements: `dp[mask]` stores the current partial bucket sum modulo `target`, or `-1` if `mask` is unreachable.",
  "hints": [
    "If `sum(nums) % k != 0` or `max(nums) > target`, immediately return `false`.",
    "Because `n <= 16`, a `2^n` bitmask DP runs cleanly in milliseconds.",
    "Boundary edge cases & complexity: Unpruned backtracking can time out on adversarial inputs like `[2,2,2,2,3,4,5]`. Verify your solution strictly meets O(n * 2^n) time and O(2^n) space limits."
  ],
  "approachTitle": "Bitmask Dynamic Programming",
  "approachSteps": [
    "Check `total % k == 0` and `max(nums) <= total // k`.",
    "Initialize `dp = [-1] * (1 << n)` with `dp[0] = 0`.",
    "For each `mask` with `dp[mask] != -1`, try adding each unused element `i`: if `dp[mask] + nums[i] <= target`, set `dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target`.",
    "Return `dp[(1 << n) - 1] == 0`."
  ],
  "timeComplexity": "O(n * 2^n)",
  "spaceComplexity": "O(2^n)",
  "pitfalls": [
    "Unpruned backtracking can time out on adversarial inputs like `[2,2,2,2,3,4,5]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def canPartitionKSubsets(nums: list[int], k: int) -> bool:\n    total = sum(nums)\n    if total % k != 0:\n        return False\n    target = total // k\n    if max(nums) > target:\n        return False\n    n = len(nums)\n    dp = [-1] * (1 << n)\n    dp[0] = 0\n    for mask in range(1 << n):\n        if dp[mask] == -1:\n            continue\n        for i in range(n):\n            if not (mask & (1 << i)) and dp[mask] + nums[i] <= target:\n                dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target\n    return dp[(1 << n) - 1] == 0\n"
  }
},
  "unique-permutations-ii": {
  "problemId": "unique-permutations-ii",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Count occurrences of each unique number in a `Counter` and backtrack by iterating over distinct keys with remaining count > 0.",
  "hints": [
    "Conceptual Intuition: Consider a Frequency-Map Backtracking paradigm. Count occurrences of each unique number in a `Counter` and backtrack by iterating over distinct keys with remaining count > 0.",
    "Algorithmic Mechanics: Iterating over distinct values in a frequency map automatically avoids generating duplicate permutations. Build `counts = Counter(nums)`. In `dfs()`: if `len(path) == len(nums)`, append `path[:]` and return.",
    "Edge Cases & Optimization: Generating duplicates by iterating over indices without a `used` + duplicate-skip check. Ensure time complexity is bounded to O(n * n!) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Frequency-Map Backtracking",
  "approachSteps": [
    "Build `counts = Counter(nums)`.",
    "In `dfs()`: if `len(path) == len(nums)`, append `path[:]` and return.",
    "For each unique key `x` in `counts` with `counts[x] > 0`, decrement `counts[x]`, push `x`, recurse, pop `x`, and restore `counts[x]`."
  ],
  "timeComplexity": "O(n * n!)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Generating duplicates by iterating over indices without a `used` + duplicate-skip check."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import Counter\n\ndef permuteUnique(nums: list[int]) -> list[list[int]]:\n    counts = Counter(nums)\n    n = len(nums)\n    res = []\n    path = []\n    def dfs() -> None:\n        if len(path) == n:\n            res.append(path[:])\n            return\n        for x in counts:\n            if counts[x] > 0:\n                counts[x] -= 1\n                path.append(x)\n                dfs()\n                path.pop()\n                counts[x] += 1\n    dfs()\n    return res\n"
  }
},
  "longest-mountain-subarray": {
  "problemId": "longest-mountain-subarray",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Scan for strict local peaks (`arr[i - 1] < arr[i] > arr[i + 1]`) and expand left and right pointers from each peak in O(n) total time.",
  "hints": [
    "Conceptual Intuition: Consider a Peak Detection and Expansion paradigm. Scan for strict local peaks (`arr[i - 1] < arr[i] > arr[i + 1]`) and expand left and right pointers from each peak in O(n) total time.",
    "Algorithmic Mechanics: Each element is visited at most twice because mountains can only overlap at their endpoints. Iterate `i` from `1` to `n - 2`. Whenever `arr[i - 1] < arr[i] > arr[i + 1]`, expand `l` left while `arr[l - 1] < arr[l]` and `r` right while `arr[r] > arr[r + 1]`.",
    "Edge Cases & Optimization: Resetting `i` to `r + 1` instead of `r`, which can skip a valley that starts the next mountain. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Peak Detection and Expansion",
  "approachSteps": [
    "Iterate `i` from `1` to `n - 2`.",
    "Whenever `arr[i - 1] < arr[i] > arr[i + 1]`, expand `l` left while `arr[l - 1] < arr[l]` and `r` right while `arr[r] > arr[r + 1]`.",
    "Update `best = max(best, r - l + 1)` and jump `i = r`.",
    "Return `best`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Resetting `i` to `r + 1` instead of `r`, which can skip a valley that starts the next mountain."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def longestMountain(arr: list[int]) -> int:\n    n = len(arr)\n    best = 0\n    i = 1\n    while i < n - 1:\n        if arr[i - 1] < arr[i] > arr[i + 1]:\n            l = r = i\n            while l > 0 and arr[l - 1] < arr[l]:\n                l -= 1\n            while r < n - 1 and arr[r] > arr[r + 1]:\n                r += 1\n            best = max(best, r - l + 1)\n            i = r\n        else:\n            i += 1\n    return best\n"
  }
},
  "snakes-and-ladders-bfs": {
  "problemId": "snakes-and-ladders-bfs",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Flatten the Boustrophedon board into a 1D array of length `n^2 + 1`, then run BFS from square `1` to square `n^2`.",
  "hints": [
    "Conceptual Intuition: Consider a Board Flattening + Unweighted BFS paradigm. Flatten the Boustrophedon board into a 1D array of length `n^2 + 1`, then run BFS from square `1` to square `n^2`.",
    "Algorithmic Mechanics: For 1-indexed square `s`, let `q, rem = divmod(s - 1, n)`; row is `n - 1 - q`, and col is `rem` if `q` is even else `n - 1 - rem`. Map each square `1.n^2` to its `(r, c)` board value. Run BFS from `(1, 0)` with a `visited` set.",
    "Edge Cases & Optimization: Chaining two ladders/snakes in a single turn (the rules allow at most one jump per roll). Ensure time complexity is bounded to O(n^2) with O(n^2) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Board Flattening + Unweighted BFS",
  "approachSteps": [
    "Map each square `1..n^2` to its `(r, c)` board value.",
    "Run BFS from `(1, 0)` with a `visited` set.",
    "From square `s`, try `nxt = s + 1 .. min(s + 6, target)`, apply `dest = flat[nxt]` if `flat[nxt] != -1`, and enqueue `(dest, moves + 1)` if unvisited.",
    "Return `moves + 1` upon reaching `n^2`, or `-1` if unreachable."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n^2)",
  "pitfalls": [
    "Chaining two ladders/snakes in a single turn (the rules allow at most one jump per roll)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef snakesAndLadders(board: list[list[int]]) -> int:\n    n = len(board)\n    target = n * n\n    flat = [-1] * (target + 1)\n    for s in range(1, target + 1):\n        q, rem = divmod(s - 1, n)\n        r = n - 1 - q\n        c = rem if q % 2 == 0 else n - 1 - rem\n        flat[s] = board[r][c]\n    dq = deque([(1, 0)])\n    vis = {1}\n    while dq:\n        s, moves = dq.popleft()\n        for nxt in range(s + 1, min(s + 6, target) + 1):\n            dest = flat[nxt] if flat[nxt] != -1 else nxt\n            if dest == target:\n                return moves + 1\n            if dest not in vis:\n                vis.add(dest)\n                dq.append((dest, moves + 1))\n    return -1\n"
  }
},
  "sorted-array-to-balanced-bst": {
  "problemId": "sorted-array-to-balanced-bst",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Recursively pick `mid = (l + r) // 2` as the root and build left `[l, mid - 1]` and right `[mid + 1, r]` subtrees, then serialize via BFS.",
  "hints": [
    "Conceptual Intuition: Consider a Divide and Conquer Midpoint Construction paradigm. Recursively pick `mid = (l + r) // 2` as the root and build left `[l, mid - 1]` and right `[mid + 1, r]` subtrees, then serialize via BFS.",
    "Algorithmic Mechanics: Splitting at the exact midpoint guarantees left and right subtree heights differ by at most 1. Define `build(l, r)`: if `l > r`, return `None`; else create `Node(nums[mid])` with `left = build(l, mid - 1)` and `right = build(mid + 1, r)`. Serialize the resulting tree using level-order BFS and strip trailing `None` values.",
    "Edge Cases & Optimization: Slicing `nums` at every recursive call, which degrades time complexity to O(n log n). Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Divide and Conquer Midpoint Construction",
  "approachSteps": [
    "Define `build(l, r)`: if `l > r`, return `None`; else create `Node(nums[mid])` with `left = build(l, mid - 1)` and `right = build(mid + 1, r)`.",
    "Serialize the resulting tree using level-order BFS and strip trailing `None` values."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Slicing `nums` at every recursive call, which degrades time complexity to O(n log n)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef sortedArrayToBST(nums: list[int]) -> list:\n    class Node:\n        def __init__(self, v, l=None, r=None): self.val, self.left, self.right = v, l, r\n    def build(l: int, r: int):\n        if l > r:\n            return None\n        m = (l + r) // 2\n        return Node(nums[m], build(l, m - 1), build(m + 1, r))\n    head = build(0, len(nums) - 1)\n    out = []\n    q = deque([head])\n    while q:\n        cur = q.popleft()\n        if cur:\n            out.append(cur.val)\n            q.append(cur.left)\n            q.append(cur.right)\n        else:\n            out.append(None)\n    while out and out[-1] is None:\n        out.pop()\n    return out\n"
  }
},
  "palindrome-partition-min-cuts": {
  "problemId": "palindrome-partition-min-cuts",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Expand around every possible palindrome center `c` (odd and even length) and relax `dp[r + 1] = min(dp[r + 1], dp[l] + 1)` in O(n^2) time and O(n) space.",
  "hints": [
    "Conceptual Intuition: Consider a Expand-Around-Center DP paradigm. Expand around every possible palindrome center `c` (odd and even length) and relax `dp[r + 1] = min(dp[r + 1], dp[l] + 1)` in O(n^2) time and O(n) space.",
    "Algorithmic Mechanics: Initialize `dp[i] = i - 1` (with `dp[0] = -1`) so a palindrome covering `s[0.r]` gives `dp[r + 1] = 0` cuts. Initialize `dp = [i - 1 for i in range(n + 1)]`. For each center `c` from `0` to `n - 1`, expand `(l, r) = (c, c)` and `(c, c + 1)` while `s[l] == s[r]`.",
    "Edge Cases & Optimization: Allocating an O(n^2) boolean table when O(n) space via center expansion is both faster and leaner. Ensure time complexity is bounded to O(n^2) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Expand-Around-Center DP",
  "approachSteps": [
    "Initialize `dp = [i - 1 for i in range(n + 1)]`.",
    "For each center `c` from `0` to `n - 1`, expand `(l, r) = (c, c)` and `(c, c + 1)` while `s[l] == s[r]`.",
    "At each palindrome `s[l..r]`, update `dp[r + 1] = min(dp[r + 1], dp[l] + 1)`.",
    "Return `dp[n]`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Allocating an O(n^2) boolean table when O(n) space via center expansion is both faster and leaner."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def minCut(s: str) -> int:\n    n = len(s)\n    dp = [i - 1 for i in range(n + 1)]\n    for c in range(n):\n        for l, r in ((c, c), (c, c + 1)):\n            while l >= 0 and r < n and s[l] == s[r]:\n                if dp[l] + 1 < dp[r + 1]:\n                    dp[r + 1] = dp[l] + 1\n                l -= 1\n                r += 1\n    return dp[n]\n"
  }
},
  "shortest-common-supersequence": {
  "problemId": "shortest-common-supersequence",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "The length of the Shortest Common Supersequence equals `len(str1) + len(str2) - LCS(str1, str2)`.",
  "hints": [
    "Conceptual Intuition: Consider a LCS Reduction with Space-Optimized DP paradigm. The length of the Shortest Common Supersequence equals `len(str1) + len(str2) - LCS(str1, str2)`.",
    "Algorithmic Mechanics: Each character in the Longest Common Subsequence only needs to appear once in the supersequence. Compute `lcs` of `str1` and `str2` using a 1D DP array. Return `len(str1) + len(str2) - lcs`.",
    "Edge Cases & Optimization: Confusing subsequence with contiguous substring. Ensure time complexity is bounded to O(m * n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "LCS Reduction with Space-Optimized DP",
  "approachSteps": [
    "Compute `lcs` of `str1` and `str2` using a 1D DP array.",
    "Return `len(str1) + len(str2) - lcs`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Confusing subsequence with contiguous substring."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def shortestCommonSupersequenceLength(str1: str, str2: str) -> int:\n    m, n = len(str1), len(str2)\n    dp = [0] * (n + 1)\n    for c1 in str1:\n        prev = 0\n        for j, c2 in enumerate(str2, 1):\n            cur = dp[j]\n            if c1 == c2:\n                dp[j] = prev + 1\n            else:\n                dp[j] = max(dp[j], dp[j - 1])\n            prev = cur\n    return m + n - dp[n]\n"
  }
},
  "frog-jump-river-stones": {
  "problemId": "frog-jump-river-stones",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Map each stone position to the set of jump sizes `k` that can land on it, propagating `k - 1`, `k`, and `k + 1` forward to existing stone positions.",
  "hints": [
    "Conceptual Intuition: Consider a Forward Reachability Hash-Set DP paradigm. Map each stone position to the set of jump sizes `k` that can land on it, propagating `k - 1`, `k`, and `k + 1` forward to existing stone positions.",
    "Algorithmic Mechanics: Start with `dp[0] = {0}` so from stone `0` the only positive step `0 + 1 = 1` is allowed. Initialize `dp = {pos: set() for pos in stones}` and `dp[0].add(0)`. For each `pos` in `stones`, for each `k` in `dp[pos]`, try `step` in `(k - 1, k, k + 1)` with `step > 0`: if `pos + step` is in `dp`, add `step` to `dp[pos + step]`.",
    "Edge Cases & Optimization: Allowing jump size `0` which loops in place on the same stone. Ensure time complexity is bounded to O(n^2) with O(n^2) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Forward Reachability Hash-Set DP",
  "approachSteps": [
    "Initialize `dp = {pos: set() for pos in stones}` and `dp[0].add(0)`.",
    "For each `pos` in `stones`, for each `k` in `dp[pos]`, try `step` in `(k - 1, k, k + 1)` with `step > 0`: if `pos + step` is in `dp`, add `step` to `dp[pos + step]`.",
    "Return `bool(dp[stones[-1]])`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n^2)",
  "pitfalls": [
    "Allowing jump size `0` which loops in place on the same stone."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def canCross(stones: list[int]) -> bool:\n    dp = {s: set() for s in stones}\n    dp[0].add(0)\n    for s in stones:\n        for k in dp[s]:\n            for step in (k - 1, k, k + 1):\n                if step > 0 and (s + step) in dp:\n                    dp[s + step].add(step)\n    return bool(dp[stones[-1]])\n"
  }
},
  "cherry-pickup-ii-robots": {
  "problemId": "cherry-pickup-ii-robots",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use bottom-up 2D rolling DP `dp[c1][c2]` representing the maximum cherries collectible from row `r` onward when Robot 1 is at `c1` and Robot 2 is at `c2`.",
  "hints": [
    "Conceptual Intuition: Consider a Bottom-Up Row-by-Row Rolling DP paradigm. Use bottom-up 2D rolling DP `dp[c1][c2]` representing the maximum cherries collectible from row `r` onward when Robot 1 is at `c1` and Robot 2 is at `c2`.",
    "Algorithmic Mechanics: Because both robots descend one row per step, their shared row `r` is implicit in the iteration. Initialize `dp[c1][c2]` for the bottom row `R - 1`. Iterate `r` from `R - 2` down to `0`.",
    "Edge Cases & Optimization: Double-counting `grid[r][c1]` when `c1 == c2`. Ensure time complexity is bounded to O(R * C^2) with O(C^2) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bottom-Up Row-by-Row Rolling DP",
  "approachSteps": [
    "Initialize `dp[c1][c2]` for the bottom row `R - 1`.",
    "Iterate `r` from `R - 2` down to `0`.",
    "For each pair `(c1, c2)`, take the max over all 9 valid `(nc1, nc2)` transitions in row `r + 1`, plus `grid[r][c1]` (and `+ grid[r][c2]` if `c1 != c2`).",
    "Return `dp[0][C - 1]`."
  ],
  "timeComplexity": "O(R * C^2)",
  "spaceComplexity": "O(C^2)",
  "pitfalls": [
    "Double-counting `grid[r][c1]` when `c1 == c2`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def cherryPickup(grid: list[list[int]]) -> int:\n    R, C = len(grid), len(grid[0])\n    dp = [[0] * C for _ in range(C)]\n    for c1 in range(C):\n        for c2 in range(C):\n            dp[c1][c2] = grid[R - 1][c1] + (grid[R - 1][c2] if c1 != c2 else 0)\n    for r in range(R - 2, -1, -1):\n        ndp = [[0] * C for _ in range(C)]\n        for c1 in range(C):\n            for c2 in range(C):\n                best = 0\n                for nc1 in (c1 - 1, c1, c1 + 1):\n                    if 0 <= nc1 < C:\n                        for nc2 in (c2 - 1, c2, c2 + 1):\n                            if 0 <= nc2 < C and dp[nc1][nc2] > best:\n                                best = dp[nc1][nc2]\n                val = grid[r][c1] + (grid[r][c2] if c1 != c2 else 0)\n                ndp[c1][c2] = val + best\n        dp = ndp\n    return dp[0][C - 1]\n"
  }
},
  "count-of-range-sum-mergesort": {
  "problemId": "count-of-range-sum-mergesort",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Build prefix sums `P` and count pairs `i < j` with `lower <= P[j] - P[i] <= upper` during Merge Sort using two monotone pointers across the sorted right half.",
  "hints": [
    "Conceptual Intuition: Consider a Merge Sort Counting on Prefix Sums paradigm. Build prefix sums `P` and count pairs `i < j` with `lower <= P[j] - P[i] <= upper` during Merge Sort using two monotone pointers across the sorted right half.",
    "Algorithmic Mechanics: Because both halves are sorted before merging, as `P[i]` increases, the valid window `[lo, hi)` in the right half moves strictly rightward. Compute prefix sum array `P` of length `n + 1` with `P[0] = 0`. In `sort_count(l, r)`: split at `m = (l + r) // 2` and recursively count left and right halves.",
    "Edge Cases & Optimization: Forgetting `P[0] = 0`, which drops all subarrays starting at index `0`. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Merge Sort Counting on Prefix Sums",
  "approachSteps": [
    "Compute prefix sum array `P` of length `n + 1` with `P[0] = 0`.",
    "In `sort_count(l, r)`: split at `m = (l + r) // 2` and recursively count left and right halves.",
    "With `lo = hi = m`, for each `left_val` in `P[l:m]`, advance `lo` while `P[lo] - left_val < lower` and `hi` while `P[hi] - left_val <= upper`, adding `hi - lo` to `count`.",
    "Merge `P[l:m]` and `P[m:r]` in sorted order."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Forgetting `P[0] = 0`, which drops all subarrays starting at index `0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def countRangeSum(nums: list[int], lower: int, upper: int) -> int:\n    pref = [0]\n    for x in nums:\n        pref.append(pref[-1] + x)\n    def sort_count(l: int, r: int) -> int:\n        if r - l <= 1:\n            return 0\n        m = (l + r) // 2\n        cnt = sort_count(l, m) + sort_count(m, r)\n        lo = hi = m\n        for x in pref[l:m]:\n            while lo < r and pref[lo] - x < lower:\n                lo += 1\n            while hi < r and pref[hi] - x <= upper:\n                hi += 1\n            cnt += hi - lo\n        pref[l:r] = sorted(pref[l:r])\n        return cnt\n    return sort_count(0, len(pref))\n"
  }
},
  "min-window-subsequence": {
  "problemId": "min-window-subsequence",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain `dp[j]` = the largest starting index in `s1` such that `s2[:j]` is a subsequence of `s1[dp[j]..i]`, updating in reverse order for each character `s1[i]`.",
  "hints": [
    "Conceptual Intuition: Consider a 1D Rolling Start-Index DP paradigm. Maintain `dp[j]` = the largest starting index in `s1` such that `s2[:j]` is a subsequence of `s1[dp[j].i]`, updating in reverse order for each character `s1[i]`.",
    "Algorithmic Mechanics: Updating `j` from `len(s2)` down to `1` allows O(len(s2)) space. Initialize `dp = [-1] * (len(s2) + 1)`. For each index `i`, set `dp[0] = i` (conceptually before matching `s2[0]` at `i`), and iterate `j` from `len(s2)` down to `1`: if `s1[i] == s2[j - 1]`, set `dp[j] = i if j == 1 else dp[j - 1]`.",
    "Edge Cases & Optimization: Updating `j` left-to-right in a 1D array, which allows one character of `s1` to match multiple consecutive characters of `s2`. Ensure time complexity is bounded to O(|s1| * |s2|) with O(|s2|) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "1D Rolling Start-Index DP",
  "approachSteps": [
    "Initialize `dp = [-1] * (len(s2) + 1)`.",
    "For each index `i`, set `dp[0] = i` (conceptually before matching `s2[0]` at `i`), and iterate `j` from `len(s2)` down to `1`: if `s1[i] == s2[j - 1]`, set `dp[j] = i if j == 1 else dp[j - 1]`.",
    "Whenever `dp[len(s2)] != -1`, check if `i - dp[len(s2)] + 1` strictly improves the best window length.",
    "Return the best window substring."
  ],
  "timeComplexity": "O(|s1| * |s2|)",
  "spaceComplexity": "O(|s2|)",
  "pitfalls": [
    "Updating `j` left-to-right in a 1D array, which allows one character of `s1` to match multiple consecutive characters of `s2`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def minWindowSubsequence(s1: str, s2: str) -> str:\n    n, m = len(s1), len(s2)\n    dp = [-1] * (m + 1)\n    best_len = n + 1\n    best_start = -1\n    for i, ch in enumerate(s1):\n        for j in range(m, 0, -1):\n            if ch == s2[j - 1]:\n                dp[j] = i if j == 1 else dp[j - 1]\n        if dp[m] != -1:\n            cur_len = i - dp[m] + 1\n            if cur_len < best_len:\n                best_len = cur_len\n                best_start = dp[m]\n    return '' if best_start == -1 else s1[best_start:best_start + best_len]\n"
  }
},
  "largest-component-common-factor": {
  "problemId": "largest-component-common-factor",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Factorize each `x` in `nums` into its prime factors and union `x` with each of its prime factors in a Disjoint Set Union structure; count the largest group among `find(x)` for `x` in `nums`.",
  "hints": [
    "Conceptual Intuition: Consider a Prime Factorization + Union-Find paradigm. Factorize each `x` in `nums` into its prime factors and union `x` with each of its prime factors in a Disjoint Set Union structure; count the largest group among `find(x)` for `x` in `nums`.",
    "Algorithmic Mechanics: Avoid O(n^2) pairwise GCD checks by connecting each number directly to its prime divisors. Initialize DSU over `0.max(nums)`. For each `x` in `nums`, trial-divide up to `sqrt(x)` to find all prime factors `p` and call `union(x, p)`.",
    "Edge Cases & Optimization: Counting prime factor nodes that are not actually in `nums` as part of the component size. Ensure time complexity is bounded to O(n * sqrt(M) * alpha(M)) with O(M) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Prime Factorization + Union-Find",
  "approachSteps": [
    "Initialize DSU over `0..max(nums)`.",
    "For each `x` in `nums`, trial-divide up to `sqrt(x)` to find all prime factors `p` and call `union(x, p)`.",
    "Count frequencies of `find(x)` for all `x` in `nums` and return the maximum count."
  ],
  "timeComplexity": "O(n * sqrt(M) * alpha(M))",
  "spaceComplexity": "O(M)",
  "pitfalls": [
    "Counting prime factor nodes that are not actually in `nums` as part of the component size."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import Counter\n\ndef largestComponentSize(nums: list[int]) -> int:\n    m = max(nums)\n    parent = list(range(m + 1))\n    def find(x: int) -> int:\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    def union(a: int, b: int) -> None:\n        ra, rb = find(a), find(b)\n        if ra != rb:\n            parent[ra] = rb\n    for x in nums:\n        v = x\n        d = 2\n        while d * d <= v:\n            if v % d == 0:\n                union(x, d)\n                while v % d == 0:\n                    v //= d\n            d += 1\n        if v > 1:\n            union(x, v)\n    return max(Counter(find(x) for x in nums).values())\n"
  }
},
  "stock-profit-two-transactions": {
  "problemId": "stock-profit-two-transactions",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track 4 O(1) state-machine variables (`buy1`, `sell1`, `buy2`, `sell2`) representing the best cash balance after each stage of up to two trades.",
  "hints": [
    "Conceptual Intuition: Consider a 4-State O(1)-Space State Machine DP paradigm. Track 4 O(1) state-machine variables (`buy1`, `sell1`, `buy2`, `sell2`) representing the best cash balance after each stage of up to two trades.",
    "Algorithmic Mechanics: Buying a second time starts from the profit already banked in `sell1`: `buy2 = max(buy2, sell1 - p)`. Initialize `buy1 = buy2 = -inf` and `sell1 = sell2 = 0`. For each price `p`: update `buy1 = max(buy1, -p)`, `sell1 = max(sell1, buy1 + p)`, `buy2 = max(buy2, sell1 - p)`, `sell2 = max(sell2, buy2 + p)`.",
    "Edge Cases & Optimization: Initializing `buy1` and `buy2` to `0` instead of `-inf`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "4-State O(1)-Space State Machine DP",
  "approachSteps": [
    "Initialize `buy1 = buy2 = -inf` and `sell1 = sell2 = 0`.",
    "For each price `p`: update `buy1 = max(buy1, -p)`, `sell1 = max(sell1, buy1 + p)`, `buy2 = max(buy2, sell1 - p)`, `sell2 = max(sell2, buy2 + p)`.",
    "Return `sell2`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Initializing `buy1` and `buy2` to `0` instead of `-inf`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def maxProfitTwoTrades(prices: list[int]) -> int:\n    buy1 = buy2 = -10**18\n    sell1 = sell2 = 0\n    for p in prices:\n        if -p > buy1: buy1 = -p\n        if buy1 + p > sell1: sell1 = buy1 + p\n        if sell1 - p > buy2: buy2 = sell1 - p\n        if buy2 + p > sell2: sell2 = buy2 + p\n    return sell2\n"
  }
},
  "substation-harmonic-modulo-windows": {
  "problemId": "substation-harmonic-modulo-windows",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Count prefix sums modulo `harm`; every pair of matching remainders forms a divisible window.",
  "hints": [
    "Conceptual Intuition: Consider a Modular Prefix Remainder Map paradigm. Count prefix sums modulo `harm`; every pair of matching remainders forms a divisible window.",
    "Algorithmic Mechanics: Seed `counts[0] = 1` for windows starting at index 0. Track `rem = (rem + x) % harm`, add `counts[rem]` to `ans`, increment `counts[rem]`.",
    "Edge Cases & Optimization: Normalize negative remainders in Java/C++ using `((r % k) + k) % k`. Ensure time complexity is bounded to O(n) with O(harm) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Modular Prefix Remainder Map",
  "approachSteps": [
    "Track `rem = (rem + x) % harm`, add `counts[rem]` to `ans`, increment `counts[rem]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(harm)",
  "pitfalls": [
    "Normalize negative remainders in Java/C++ using `((r % k) + k) % k`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_harmonic_windows(phases: list[int], harm: int) -> int:\n    cnt = [0] * harm; cnt[0] = 1\n    rem = ans = 0\n    for x in phases:\n        rem = (rem + x) % harm\n        ans += cnt[rem]\n        cnt[rem] += 1\n    return ans\n"
  }
},
  "dispatch-next-route-sequence": {
  "problemId": "dispatch-next-route-sequence",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Locate the rightmost ascent `cars[i] < cars[i + 1]`, swap with the rightmost element `> cars[i]`, and reverse the suffix `cars[i + 1:]`.",
  "hints": [
    "Conceptual Intuition: Consider a Pivot Swap & Suffix Reversal paradigm. Locate the rightmost ascent `cars[i] < cars[i + 1]`, swap with the rightmost element `> cars[i]`, and reverse the suffix `cars[i + 1:]`.",
    "Algorithmic Mechanics: Use `>=` and `<=` when skipping non-increasing tails with duplicates. Find rightmost `i` with `cars[i] < cars[i + 1]`, swap with rightmost `j` where `cars[j] > cars[i]`, reverse `cars[i + 1:]`.",
    "Edge Cases & Optimization: Handle strictly descending sequences by reversing the whole array. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Pivot Swap & Suffix Reversal",
  "approachSteps": [
    "Find rightmost `i` with `cars[i] < cars[i + 1]`, swap with rightmost `j` where `cars[j] > cars[i]`, reverse `cars[i + 1:]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle strictly descending sequences by reversing the whole array."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def next_car_sequence(cars: list[int]) -> list[int]:\n    i = len(cars) - 2\n    while i >= 0 and cars[i] >= cars[i + 1]: i -= 1\n    if i >= 0:\n        j = len(cars) - 1\n        while cars[j] <= cars[i]: j -= 1\n        cars[i], cars[j] = cars[j], cars[i]\n    l, r = i + 1, len(cars) - 1\n    while l < r:\n        cars[l], cars[r] = cars[r], cars[l]; l += 1; r -= 1\n    return cars\n"
  }
},
  "inventory-audit-missing-lot-ids": {
  "problemId": "inventory-audit-missing-lot-ids",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Negate `scanned[abs(v) - 1]` to mark seen lot IDs in-place, then collect `i + 1` for every still-positive entry.",
  "hints": [
    "Conceptual Intuition: Consider a Sign-Flip Presence Marking paradigm. Negate `scanned[abs(v) - 1]` to mark seen lot IDs in-place, then collect `i + 1` for every still-positive entry.",
    "Algorithmic Mechanics: Take `abs(v)` before indexing. Mark `scanned[abs(v) - 1]` negative, then gather indices with positive values.",
    "Edge Cases & Optimization: Only negate if positive so double-negation doesn't erase the mark. Ensure time complexity is bounded to O(n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Sign-Flip Presence Marking",
  "approachSteps": [
    "Mark `scanned[abs(v) - 1]` negative, then gather indices with positive values."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Only negate if positive so double-negation doesn't erase the mark."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def missing_lot_ids(scanned: list[int]) -> list[int]:\n    for v in scanned:\n        idx = abs(v) - 1\n        if scanned[idx] > 0: scanned[idx] = -scanned[idx]\n    return [i + 1 for i, v in enumerate(scanned) if v > 0]\n"
  }
},
  "stock-ledger-shared-skus": {
  "problemId": "stock-ledger-shared-skus",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Count frequencies in the shorter warehouse list, then scan the other list emitting and decrementing matches.",
  "hints": [
    "Conceptual Intuition: Consider a Hash Counter Multiplicity Match paradigm. Count frequencies in the shorter warehouse list, then scan the other list emitting and decrementing matches.",
    "Algorithmic Mechanics: Decrement the count on every match so multiplicity equals `min(cnt_west, cnt_east)`. Build `Counter` on smaller list, emit matches while `cnt[x] > 0`.",
    "Edge Cases & Optimization: Never emit more copies than exist in the smaller warehouse. Ensure time complexity is bounded to O(n + m) with O(min(n, m)) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Hash Counter Multiplicity Match",
  "approachSteps": [
    "Build `Counter` on smaller list, emit matches while `cnt[x] > 0`."
  ],
  "timeComplexity": "O(n + m)",
  "spaceComplexity": "O(min(n, m))",
  "pitfalls": [
    "Never emit more copies than exist in the smaller warehouse."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import Counter\n\ndef shared_skus(west: list[int], east: list[int]) -> list[int]:\n    if len(west) > len(east): west, east = east, west\n    cnt = Counter(west)\n    out = []\n    for x in east:\n        if cnt[x] > 0: out.append(x); cnt[x] -= 1\n    return out\n"
  }
},
  "cipher-bijection-auditor": {
  "problemId": "cipher-bijection-auditor",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain bidirectional maps `p2c` and `c2p` verifying consistency at every character pair.",
  "hints": [
    "Conceptual Intuition: Consider a Bidirectional Character Map paradigm. Maintain bidirectional maps `p2c` and `c2p` verifying consistency at every character pair.",
    "Algorithmic Mechanics: Two distinct plaintext letters cannot map to the same ciphertext letter. Verify both `p2c` and `c2p` on each `(a, b)` in `zip(plain, cipher)`.",
    "Edge Cases & Optimization: One-way maps miss many-to-one collisions. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bidirectional Character Map",
  "approachSteps": [
    "Verify both `p2c` and `c2p` on each `(a, b)` in `zip(plain, cipher)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "One-way maps miss many-to-one collisions."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def is_valid_cipher(plain: str, cipher: str) -> bool:\n    p2c, c2p = {}, {}\n    for a, b in zip(plain, cipher):\n        if (a in p2c and p2c[a] != b) or (b in c2p and c2p[b] != a): return False\n        p2c[a] = b; c2p[b] = a\n    return True\n"
  }
},
  "dna-motif-anagram-positions": {
  "problemId": "dna-motif-anagram-positions",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Slide a fixed window of size `len(motif)` updating 26-letter counts and recording every index where window counts equal motif counts.",
  "hints": [
    "Conceptual Intuition: Consider a Fixed-Width Frequency Window paradigm. Slide a fixed window of size `len(motif)` updating 26-letter counts and recording every index where window counts equal motif counts.",
    "Algorithmic Mechanics: Return `[]` immediately when `len(motif) > len(seq)`. Compare 26-slot frequency arrays across every window.",
    "Edge Cases & Optimization: Check index 0 before entering the slide loop. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Fixed-Width Frequency Window",
  "approachSteps": [
    "Compare 26-slot frequency arrays across every window."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Check index 0 before entering the slide loop."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_motif_offsets(seq: str, motif: str) -> list[int]:\n    ns, nm = len(seq), len(motif)\n    if nm > ns: return []\n    mc, wc = [0] * 26, [0] * 26\n    for ch in motif: mc[ord(ch) - 97] += 1\n    for i in range(nm): wc[ord(seq[i]) - 97] += 1\n    res = [0] if wc == mc else []\n    for i in range(nm, ns):\n        wc[ord(seq[i]) - 97] += 1\n        wc[ord(seq[i - nm]) - 97] -= 1\n        if wc == mc: res.append(i - nm + 1)\n    return res\n"
  }
},
  "gain-chain-subarray-budget": {
  "problemId": "gain-chain-subarray-budget",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a sliding product `< ceiling`; each valid right endpoint `r` contributes `r - l + 1` contiguous chains.",
  "hints": [
    "Conceptual Intuition: Consider a Multiplicative Sliding Window paradigm. Maintain a sliding product `< ceiling`; each valid right endpoint `r` contributes `r - l + 1` contiguous chains.",
    "Algorithmic Mechanics: Return `0` immediately if `ceiling <= 1`. Multiply `gains[r]`, divide out `gains[l]` while `prod >= ceiling`, add `r - l + 1`.",
    "Edge Cases & Optimization: Guard `ceiling <= 1`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Multiplicative Sliding Window",
  "approachSteps": [
    "Multiply `gains[r]`, divide out `gains[l]` while `prod >= ceiling`, add `r - l + 1`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Guard `ceiling <= 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_safe_gain_chains(gains: list[int], ceiling: int) -> int:\n    if ceiling <= 1: return 0\n    prod, l, ans = 1, 0, 0\n    for r, g in enumerate(gains):\n        prod *= g\n        while prod >= ceiling:\n            prod //= gains[l]; l += 1\n        ans += r - l + 1\n    return ans\n"
  }
},
  "big-ledger-decimal-multiplier": {
  "problemId": "big-ledger-decimal-multiplier",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Accumulate partial digit products into an `m + n` digit array at indices `i + j + 1` and `i + j`.",
  "hints": [
    "Conceptual Intuition: Consider a Positional Digit-Array Multiplication paradigm. Accumulate partial digit products into an `m + n` digit array at indices `i + j + 1` and `i + j`.",
    "Algorithmic Mechanics: Strip leading zeros carefully, returning `'0'` if either input is `'0'`. Iterate `i, j` backward, add `d1 * d2 + pos[i + j + 1]`, split remainder and carry.",
    "Edge Cases & Optimization: Return `'0'` early when either operand is `'0'`. Ensure time complexity is bounded to O(m * n) with O(m + n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Positional Digit-Array Multiplication",
  "approachSteps": [
    "Iterate `i, j` backward, add `d1 * d2 + pos[i + j + 1]`, split remainder and carry."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m + n)",
  "pitfalls": [
    "Return `'0'` early when either operand is `'0'`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def multiply_decimal_strings(a: str, b: str) -> str:\n    if a == '0' or b == '0': return '0'\n    m, n = len(a), len(b)\n    pos = [0] * (m + n)\n    for i in range(m - 1, -1, -1):\n        d1 = ord(a[i]) - 48\n        for j in range(n - 1, -1, -1):\n            tot = d1 * (ord(b[j]) - 48) + pos[i + j + 1]\n            pos[i + j + 1] = tot % 10\n            pos[i + j] += tot // 10\n    s = 0\n    while s < len(pos) - 1 and pos[s] == 0: s += 1\n    return \"\".join(str(x) for x in pos[s:])\n"
  }
},
  "bitstream-binary-adder": {
  "problemId": "bitstream-binary-adder",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sum bits right-to-left with a carry flag and reverse the emitted bits.",
  "hints": [
    "Conceptual Intuition: Consider a Right-to-Left Carry Ripple paradigm. Sum bits right-to-left with a carry flag and reverse the emitted bits.",
    "Algorithmic Mechanics: Continue while `i >= 0 or j >= 0 or carry`. Emit `str(s & 1)` and set `carry = s >> 1`, then reverse.",
    "Edge Cases & Optimization: Handle trailing carry overflow bit. Ensure time complexity is bounded to O(max(n, m)) with O(max(n, m)) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Right-to-Left Carry Ripple",
  "approachSteps": [
    "Emit `str(s & 1)` and set `carry = s >> 1`, then reverse."
  ],
  "timeComplexity": "O(max(n, m))",
  "spaceComplexity": "O(max(n, m))",
  "pitfalls": [
    "Handle trailing carry overflow bit."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def add_bit_registers(reg_a: str, reg_b: str) -> str:\n    i, j, c, out = len(reg_a) - 1, len(reg_b) - 1, 0, []\n    while i >= 0 or j >= 0 or c:\n        s = c\n        if i >= 0: s += reg_a[i] == '1'; i -= 1\n        if j >= 0: s += reg_b[j] == '1'; j -= 1\n        out.append(str(s & 1)); c = s >> 1\n    return \"\".join(reversed(out))\n"
  }
},
  "pressure-sensor-lookback-span": {
  "problemId": "pressure-sensor-lookback-span",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a decreasing monotonic stack of `(reading, span)` tuples, summing popped spans for all `<= current`.",
  "hints": [
    "Conceptual Intuition: Consider a Monotonic Span Compression Stack paradigm. Maintain a decreasing monotonic stack of `(reading, span)` tuples, summing popped spans for all `<= current`.",
    "Algorithmic Mechanics: Each element is pushed and popped at most once -> O(n) total. While `st and st[-1][0] <= r`, absorb `st.pop()[1]` into `span`; push `(r, span)`.",
    "Edge Cases & Optimization: Use `<=` since ties count toward the span. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Monotonic Span Compression Stack",
  "approachSteps": [
    "While `st and st[-1][0] <= r`, absorb `st.pop()[1]` into `span`; push `(r, span)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Use `<=` since ties count toward the span."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def barometer_spans(readings: list[int]) -> list[int]:\n    st, out = [], []\n    for r in readings:\n        sp = 1\n        while st and st[-1][0] <= r: sp += st.pop()[1]\n        st.append((r, sp)); out.append(sp)\n    return out\n"
  }
},
  "floor-risk-subarray-floor-sum": {
  "problemId": "floor-risk-subarray-floor-sum",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use a monotonic increasing stack with a trailing `0` sentinel to compute each element's exact window-minimum contribution `(mid - left) * (right - mid)`.",
  "hints": [
    "Conceptual Intuition: Consider a Monotonic Stack Contribution Sum paradigm. Use a monotonic increasing stack with a trailing `0` sentinel to compute each element's exact window-minimum contribution `(mid - left) * (right - mid)`.",
    "Algorithmic Mechanics: Use `>=` on one side and strict `<` on the other to handle duplicates uniquely. Pop while `navs[st[-1]] >= x`, add `navs[mid] * (mid - left) * (i - mid) % MOD`.",
    "Edge Cases & Optimization: Modulo every accumulation by `10^9 + 7`. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Monotonic Stack Contribution Sum",
  "approachSteps": [
    "Pop while `navs[st[-1]] >= x`, add `navs[mid] * (mid - left) * (i - mid) % MOD`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Modulo every accumulation by `10^9 + 7`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def sum_window_floors(navs: list[int]) -> int:\n    MOD = 10**9 + 7\n    st, ans = [], 0\n    for i, x in enumerate(navs + [0]):\n        while st and navs[st[-1]] >= x:\n            mid = st.pop()\n            left = st[-1] if st else -1\n            ans = (ans + navs[mid] * (mid - left) * (i - mid)) % MOD\n        st.append(i)\n    return ans\n"
  }
},
  "wafer-defect-free-rectangle": {
  "problemId": "wafer-defect-free-rectangle",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Accumulate column heights row-by-row and run O(cols) monotonic stack histogram area on each row.",
  "hints": [
    "Conceptual Intuition: Consider a Row-Histogram Monotonic Stack paradigm. Accumulate column heights row-by-row and run O(cols) monotonic stack histogram area on each row.",
    "Algorithmic Mechanics: Append a trailing `0` column height sentinel to flush the stack. Update `heights[c]`, run increasing stack over `heights` maximizing `h * w`.",
    "Edge Cases & Optimization: Reset `heights[c] = 0` on `'0'` cells. Ensure time complexity is bounded to O(rows * cols) with O(cols) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Row-Histogram Monotonic Stack",
  "approachSteps": [
    "Update `heights[c]`, run increasing stack over `heights` maximizing `h * w`."
  ],
  "timeComplexity": "O(rows * cols)",
  "spaceComplexity": "O(cols)",
  "pitfalls": [
    "Reset `heights[c] = 0` on `'0'` cells."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def max_clean_die(wafer: list[list[str]]) -> int:\n    cols = len(wafer[0])\n    h = [0] * (cols + 1)\n    best = 0\n    for row in wafer:\n        for c in range(cols): h[c] = h[c] + 1 if row[c] == '1' else 0\n        st = []\n        for i, v in enumerate(h):\n            while st and h[st[-1]] > v:\n                ht = h[st.pop()]\n                wd = i if not st else i - st[-1] - 1\n                if ht * wd > best: best = ht * wd\n            st.append(i)\n    return best\n"
  }
},
  "formula-nested-signed-eval": {
  "problemId": "formula-nested-signed-eval",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Push `(res, sign)` on `'('` and combine `prev_res + prev_sign * res` on `')'`.",
  "hints": [
    "Conceptual Intuition: Consider a Scope-Stack Expression Evaluator paradigm. Push `(res, sign)` on `'('` and combine `prev_res + prev_sign * res` on `')'`.",
    "Algorithmic Mechanics: Flush `sign * num` at the end of the string. Track `res, num, sign`; push/pop scope on parentheses.",
    "Edge Cases & Optimization: Reset `num = 0` after every operator and `')'`. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Scope-Stack Expression Evaluator",
  "approachSteps": [
    "Track `res, num, sign`; push/pop scope on parentheses."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Reset `num = 0` after every operator and `')'`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def eval_signed_rule(rule: str) -> int:\n    st, res, num, sign = [], 0, 0, 1\n    for ch in rule:\n        if ch.isdigit(): num = num * 10 + int(ch)\n        elif ch == '+': res += sign * num; num = 0; sign = 1\n        elif ch == '-': res += sign * num; num = 0; sign = -1\n        elif ch == '(': st.append((res, sign)); res = 0; sign = 1\n        elif ch == ')':\n            res += sign * num; num = 0\n            pr, ps = st.pop()\n            res = pr + ps * res\n    return res + sign * num\n"
  }
},
  "message-broker-two-stack-fifo": {
  "problemId": "message-broker-two-stack-fifo",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Push onto `in_stack` and lazily pour into `out_stack` only when `out_stack` is empty.",
  "hints": [
    "Conceptual Intuition: Consider a Lazy Two-Stack FIFO paradigm. Push onto `in_stack` and lazily pour into `out_stack` only when `out_stack` is empty.",
    "Algorithmic Mechanics: Amortized O(1) per op because each element moves at most once from `in_stack` to `out_stack`. Pour `in_s` into `out_s` when `out_s` is empty before `deq`/`front`.",
    "Edge Cases & Optimization: Only pour when `out_s` is empty. Ensure time complexity is bounded to O(1) amortized with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Lazy Two-Stack FIFO",
  "approachSteps": [
    "Pour `in_s` into `out_s` when `out_s` is empty before `deq`/`front`."
  ],
  "timeComplexity": "O(1) amortized",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Only pour when `out_s` is empty."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def run_broker_queue(ops: list[list]) -> list:\n    ins, outs, res = [], [], []\n    def pour():\n        if not outs:\n            while ins: outs.append(ins.pop())\n    for op in ops:\n        if op[0] == 'enq': ins.append(op[1])\n        elif op[0] == 'deq': pour(); res.append(outs.pop())\n        elif op[0] == 'front': pour(); res.append(outs[-1])\n        elif op[0] == 'isEmpty': res.append(not ins and not outs)\n    return res\n"
  }
},
  "signal-adjacent-pair-cancel": {
  "problemId": "signal-adjacent-pair-cancel",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Pop from a stack if `stack[-1] == ch`, otherwise push `ch`.",
  "hints": [
    "Conceptual Intuition: Consider a Pair-Cancellation Stack paradigm. Pop from a stack if `stack[-1] == ch`, otherwise push `ch`.",
    "Algorithmic Mechanics: Cascading cancellations happen automatically as the stack unwinds. Scan `stream`, pop on top match else push, join stack.",
    "Edge Cases & Optimization: Three identical letters `'aaa'` reduce to `'a'`, not `''`. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Pair-Cancellation Stack",
  "approachSteps": [
    "Scan `stream`, pop on top match else push, join stack."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Three identical letters `'aaa'` reduce to `'a'`, not `''`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def cancel_adjacent_pairs(stream: str) -> str:\n    st = []\n    for ch in stream:\n        if st and st[-1] == ch: st.pop()\n        else: st.append(ch)\n    return \"\".join(st)\n"
  }
},
  "query-filter-paren-repair": {
  "problemId": "query-filter-paren-repair",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Stack unmatched `'('` indices, record unmatched `')'` indices in a drop set, union leftover stack indices into the drop set, and rebuild.",
  "hints": [
    "Conceptual Intuition: Consider a Unmatched-Index Drop Set paradigm. Stack unmatched `'('` indices, record unmatched `')'` indices in a drop set, union leftover stack indices into the drop set, and rebuild.",
    "Algorithmic Mechanics: Store indices, not characters. Scan `query` marking bad indices, then filter out bad indices.",
    "Edge Cases & Optimization: Use a set for O(1) exclusion checks. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Unmatched-Index Drop Set",
  "approachSteps": [
    "Scan `query` marking bad indices, then filter out bad indices."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Use a set for O(1) exclusion checks."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def repair_query_parens(query: str) -> str:\n    st, drop = [], set()\n    for i, ch in enumerate(query):\n        if ch == '(': st.append(i)\n        elif ch == ')':\n            if st: st.pop()\n            else: drop.add(i)\n    drop.update(st)\n    return \"\".join(ch for i, ch in enumerate(query) if i not in drop)\n"
  }
},
  "ast-nesting-weight-scorer": {
  "problemId": "ast-nesting-weight-scorer",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Every leaf pair `\"()\"` at depth `d` contributes `1 << d` to the total score in O(1) space.",
  "hints": [
    "Conceptual Intuition: Consider a Depth-Weighted Leaf Sum paradigm. Every leaf pair `\"()\"` at depth `d` contributes `1 << d` to the total score in O(1) space.",
    "Algorithmic Mechanics: Decrement `depth` on `')'` before checking `blocks[i - 1] == '('`. Track `depth`; whenever `blocks[i - 1:i + 1] == '()'`, add `1 << depth`.",
    "Edge Cases & Optimization: Decrement `depth` before shifting `1 << depth`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Depth-Weighted Leaf Sum",
  "approachSteps": [
    "Track `depth`; whenever `blocks[i - 1:i + 1] == '()'`, add `1 << depth`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Decrement `depth` before shifting `1 << depth`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def score_block_nesting(blocks: str) -> int:\n    d = ans = 0\n    for i, ch in enumerate(blocks):\n        if ch == '(': d += 1\n        else:\n            d -= 1\n            if blocks[i - 1] == '(': ans += 1 << d\n    return ans\n"
  }
},
  "pascal-binomial-risk-table": {
  "problemId": "pascal-binomial-risk-table",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Build each tier with `1` at both ends and `prev[j - 1] + prev[j]` inside.",
  "hints": [
    "Conceptual Intuition: Consider a Row-by-Row Binomial Recurrence paradigm. Build each tier with `1` at both ends and `prev[j - 1] + prev[j]` inside.",
    "Algorithmic Mechanics: Row `r` has `r + 1` entries. Start with `[[1]]`, append `tiers - 1` rows from `tri[-1]`.",
    "Edge Cases & Optimization: Handle `tiers == 1` cleanly. Ensure time complexity is bounded to O(tiers^2) with O(tiers^2) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Row-by-Row Binomial Recurrence",
  "approachSteps": [
    "Start with `[[1]]`, append `tiers - 1` rows from `tri[-1]`."
  ],
  "timeComplexity": "O(tiers^2)",
  "spaceComplexity": "O(tiers^2)",
  "pitfalls": [
    "Handle `tiers == 1` cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def build_binomial_tiers(tiers: int) -> list[list[int]]:\n    tri = [[1]]\n    for _ in range(1, tiers):\n        p = tri[-1]\n        tri.append([1] + [p[j - 1] + p[j] for j in range(1, len(p))] + [1])\n    return tri\n"
  }
},
  "log-shard-inplace-merge": {
  "problemId": "log-shard-inplace-merge",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Write from index `m + n - 1` down to `0` picking the larger tail element from `buf` or `extra`.",
  "hints": [
    "Conceptual Intuition: Consider a Backward Three-Pointer In-Place Merge paradigm. Write from index `m + n - 1` down to `0` picking the larger tail element from `buf` or `extra`.",
    "Algorithmic Mechanics: Loop while `j >= 0`; once `extra` finishes, remaining `buf` items are already sorted in place. Set `i = m - 1, j = n - 1, k = m + n - 1` and place larger element at `buf[k]`.",
    "Edge Cases & Optimization: Check `i >= 0` before reading `buf[i]`. Ensure time complexity is bounded to O(m + n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Backward Three-Pointer In-Place Merge",
  "approachSteps": [
    "Set `i = m - 1, j = n - 1, k = m + n - 1` and place larger element at `buf[k]`."
  ],
  "timeComplexity": "O(m + n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Check `i >= 0` before reading `buf[i]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def merge_log_buffers(buf: list[int], m: int, extra: list[int], n: int) -> list[int]:\n    i, j, k = m - 1, n - 1, m + n - 1\n    while j >= 0:\n        if i >= 0 and buf[i] > extra[j]: buf[k] = buf[i]; i -= 1\n        else: buf[k] = extra[j]; j -= 1\n        k -= 1\n    return buf\n"
  }
},
  "campaign-budget-quad-match": {
  "problemId": "campaign-budget-quad-match",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort `budgets`, fix two outer indices skipping duplicates, and converge two pointers on the suffix.",
  "hints": [
    "Conceptual Intuition: Consider a Sorted Dual-Anchor Two Pointers paradigm. Sort `budgets`, fix two outer indices skipping duplicates, and converge two pointers on the suffix.",
    "Algorithmic Mechanics: Skip duplicates at all four pointer positions. Sort `budgets`, run nested loops `(i, j)` + two pointers `(l, r)`.",
    "Edge Cases & Optimization: Return `[]` when `len(budgets) < 4`. Ensure time complexity is bounded to O(n^3) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Sorted Dual-Anchor Two Pointers",
  "approachSteps": [
    "Sort `budgets`, run nested loops `(i, j)` + two pointers `(l, r)`."
  ],
  "timeComplexity": "O(n^3)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Return `[]` when `len(budgets) < 4`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def exact_quad_budgets(budgets: list[int], goal: int) -> list[list[int]]:\n    a = sorted(budgets); n = len(a); res = []\n    for i in range(n - 3):\n        if i > 0 and a[i] == a[i - 1]: continue\n        for j in range(i + 1, n - 2):\n            if j > i + 1 and a[j] == a[j - 1]: continue\n            l, r = j + 1, n - 1\n            while l < r:\n                s = a[i] + a[j] + a[l] + a[r]\n                if s == goal:\n                    res.append([a[i], a[j], a[l], a[r]]); l += 1; r -= 1\n                    while l < r and a[l] == a[l - 1]: l += 1\n                    while l < r and a[r] == a[r + 1]: r -= 1\n                elif s < goal: l += 1\n                else: r -= 1\n    return res\n"
  }
},
  "playlist-odd-even-lane-split": {
  "problemId": "playlist-odd-even-lane-split",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Separate odd-indexed and even-indexed nodes into two chains and link the odd tail to the even head.",
  "hints": [
    "Conceptual Intuition: Consider a Dual-Chain Position Split paradigm. Separate odd-indexed and even-indexed nodes into two chains and link the odd tail to the even head.",
    "Algorithmic Mechanics: Group by position index, not sample value parity. Concatenate `samples[0::2]` and `samples[1::2]`.",
    "Edge Cases & Optimization: Handle empty or 1-element lists cleanly. Ensure time complexity is bounded to O(n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Dual-Chain Position Split",
  "approachSteps": [
    "Concatenate `samples[0::2]` and `samples[1::2]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Handle empty or 1-element lists cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def regroup_channels(samples: list[int]) -> list[int]:\n    return samples[0::2] + samples[1::2]\n"
  }
},
  "ledger-adjacent-pair-swap": {
  "problemId": "ledger-adjacent-pair-swap",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Iterate by step 2 up to `n - 1` swapping `(i, i + 1)`.",
  "hints": [
    "Conceptual Intuition: Consider a Step-2 Pairwise Swap paradigm. Iterate by step 2 up to `n - 1` swapping `(i, i + 1)`.",
    "Algorithmic Mechanics: Guard `i + 1 < n` for odd-length streams. Copy `entries`, swap `res[i], res[i + 1]` for `i in range(0, n - 1, 2)`.",
    "Edge Cases & Optimization: Handle empty list without error. Ensure time complexity is bounded to O(n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Step-2 Pairwise Swap",
  "approachSteps": [
    "Copy `entries`, swap `res[i], res[i + 1]` for `i in range(0, n - 1, 2)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Handle empty list without error."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def swap_adjacent_entries(entries: list[int]) -> list[int]:\n    res = list(entries)\n    for i in range(0, len(res) - 1, 2):\n        res[i], res[i + 1] = res[i + 1], res[i]\n    return res\n"
  }
},
  "priority-queue-threshold-partition": {
  "problemId": "priority-queue-threshold-partition",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Split into two stable chains (`< cutoff` and `>= cutoff`) and link them.",
  "hints": [
    "Conceptual Intuition: Consider a Two-Chain Stable Partition paradigm. Split into two stable chains (`< cutoff` and `>= cutoff`) and link them.",
    "Algorithmic Mechanics: Scores equal to `cutoff` belong to the second partition. Filter `< cutoff` followed by `>= cutoff`.",
    "Edge Cases & Optimization: Preserve arrival order in both partitions. Ensure time complexity is bounded to O(n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Two-Chain Stable Partition",
  "approachSteps": [
    "Filter `< cutoff` followed by `>= cutoff`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Preserve arrival order in both partitions."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def partition_tickets(scores: list[int], cutoff: int) -> list[int]:\n    return [s for s in scores if s < cutoff] + [s for s in scores if s >= cutoff]\n"
  }
},
  "sorted-feed-k-way-aggregator": {
  "problemId": "sorted-feed-k-way-aggregator",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Seed a min-heap with the head of every non-empty feed `(val, feed_idx, elem_idx)`, popping the smallest and advancing that feed's cursor.",
  "hints": [
    "Conceptual Intuition: Consider a K-Way Min-Heap Merge paradigm. Seed a min-heap with the head of every non-empty feed `(val, feed_idx, elem_idx)`, popping the smallest and advancing that feed's cursor.",
    "Algorithmic Mechanics: Skip empty sub-feeds when initializing the heap. Push `(f[0], i, 0)` for non-empty `f`; pop min, append, push next from same feed.",
    "Edge Cases & Optimization: Handle empty `feeds` and empty sub-lists. Ensure time complexity is bounded to O(N log k) with O(k) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "K-Way Min-Heap Merge",
  "approachSteps": [
    "Push `(f[0], i, 0)` for non-empty `f`; pop min, append, push next from same feed."
  ],
  "timeComplexity": "O(N log k)",
  "spaceComplexity": "O(k)",
  "pitfalls": [
    "Handle empty `feeds` and empty sub-lists."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef merge_sorted_feeds(feeds: list[list[int]]) -> list[int]:\n    h = [(f[0], i, 0) for i, f in enumerate(feeds) if f]\n    heapq.heapify(h)\n    out = []\n    while h:\n        v, i, j = heapq.heappop(h)\n        out.append(v)\n        if j + 1 < len(feeds[i]):\n            heapq.heappush(h, (feeds[i][j + 1], i, j + 1))\n    return out\n"
  }
},
  "catalog-sorted-insert-slot": {
  "problemId": "catalog-sorted-insert-slot",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Binary search the lower bound in `[0, len(ids)]` for the first index `>= new_id`.",
  "hints": [
    "Conceptual Intuition: Consider a Lower-Bound Binary Search paradigm. Binary search the lower bound in `[0, len(ids)]` for the first index `>= new_id`.",
    "Algorithmic Mechanics: Set `r = len(ids)` to allow insertion past the end. Converge `[l, r)` until `l == r` and return `l`.",
    "Edge Cases & Optimization: Upper bound must be `len(ids)`, not `len(ids) - 1`. Ensure time complexity is bounded to O(log n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Lower-Bound Binary Search",
  "approachSteps": [
    "Converge `[l, r)` until `l == r` and return `l`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Upper bound must be `len(ids)`, not `len(ids) - 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def catalog_insert_slot(ids: list[int], new_id: int) -> int:\n    l, r = 0, len(ids)\n    while l < r:\n        m = (l + r) // 2\n        if ids[m] < new_id: l = m + 1\n        else: r = m\n    return l\n"
  }
},
  "tile-mosaic-square-side": {
  "problemId": "tile-mosaic-square-side",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Binary search the largest integer `m` such that `m * m <= tiles`.",
  "hints": [
    "Conceptual Intuition: Consider a Integer Square-Root Binary Search paradigm. Binary search the largest integer `m` such that `m * m <= tiles`.",
    "Algorithmic Mechanics: Return `tiles` directly when `tiles < 2`. Search `[1, tiles // 2]` and return `r`.",
    "Edge Cases & Optimization: Handle `0` and `1` early. Ensure time complexity is bounded to O(log tiles) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Integer Square-Root Binary Search",
  "approachSteps": [
    "Search `[1, tiles // 2]` and return `r`."
  ],
  "timeComplexity": "O(log tiles)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle `0` and `1` early."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def max_square_side(tiles: int) -> int:\n    if tiles < 2: return tiles\n    l, r = 1, tiles // 2\n    while l <= r:\n        m = (l + r) // 2\n        if m * m <= tiles: l = m + 1\n        else: r = m - 1\n    return r\n"
  }
},
  "serial-concat-max-badge": {
  "problemId": "serial-concat-max-badge",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort stringified fragments with custom comparator placing `a` before `b` iff `a + b > b + a`.",
  "hints": [
    "Conceptual Intuition: Consider a Concatenation-Order Custom Sort paradigm. Sort stringified fragments with custom comparator placing `a` before `b` iff `a + b > b + a`.",
    "Algorithmic Mechanics: Return `'0'` if the first sorted fragment is `'0'`. Sort via `cmp_to_key` on `a + b` vs `b + a`, join, handle leading `'0'`.",
    "Edge Cases & Optimization: Handle all-zero arrays cleanly. Ensure time complexity is bounded to O(n log n * k) with O(n * k) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Concatenation-Order Custom Sort",
  "approachSteps": [
    "Sort via `cmp_to_key` on `a + b` vs `b + a`, join, handle leading `'0'`."
  ],
  "timeComplexity": "O(n log n * k)",
  "spaceComplexity": "O(n * k)",
  "pitfalls": [
    "Handle all-zero arrays cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from functools import cmp_to_key\n\ndef max_concat_code(frags: list[int]) -> str:\n    s = [str(x) for x in frags]\n    s.sort(key=cmp_to_key(lambda a, b: -1 if a + b > b + a else (1 if a + b < b + a else 0)))\n    return '0' if s[0] == '0' else \"\".join(s)\n"
  }
},
  "audio-wave-alternating-peaks": {
  "problemId": "audio-wave-alternating-peaks",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Swap `(i, i + 1)` whenever an even index has `amps[i] > amps[i + 1]` or an odd index has `amps[i] < amps[i + 1]`.",
  "hints": [
    "Conceptual Intuition: Consider a Single-Pass Greedy Adjacent Swap paradigm. Swap `(i, i + 1)` whenever an even index has `amps[i] > amps[i + 1]` or an odd index has `amps[i] < amps[i + 1]`.",
    "Algorithmic Mechanics: Local adjacent swaps never break prior satisfied inequalities. Scan `0.n-2` fixing parity violations in-place.",
    "Edge Cases & Optimization: Even indices require `<=`, odd indices require `>=`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Single-Pass Greedy Adjacent Swap",
  "approachSteps": [
    "Scan `0..n-2` fixing parity violations in-place."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Even indices require `<=`, odd indices require `>=`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def wiggle_amplitudes(amps: list[int]) -> list[int]:\n    for i in range(len(amps) - 1):\n        if (i % 2 == 0 and amps[i] > amps[i + 1]) or (i % 2 == 1 and amps[i] < amps[i + 1]):\n            amps[i], amps[i + 1] = amps[i + 1], amps[i]\n    return amps\n"
  }
},
  "auction-trailing-lower-bids": {
  "problemId": "auction-trailing-lower-bids",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Rank-compress unique bids and scan right-to-left using a Fenwick Tree (BIT) querying `rank - 1` before inserting `rank`.",
  "hints": [
    "Conceptual Intuition: Consider a Reverse Scan + Fenwick Tree paradigm. Rank-compress unique bids and scan right-to-left using a Fenwick Tree (BIT) querying `rank - 1` before inserting `rank`.",
    "Algorithmic Mechanics: Strictly lower requires querying `rank - 1`. Compress values to `1.m`, scan backward querying `bit(r - 1)` then updating `bit(r)`.",
    "Edge Cases & Optimization: Ties do not count as strictly lower. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Reverse Scan + Fenwick Tree",
  "approachSteps": [
    "Compress values to `1..m`, scan backward querying `bit(r - 1)` then updating `bit(r)`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Ties do not count as strictly lower."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_lower_bids_after(bids: list[int]) -> list[int]:\n    rk = {v: i + 1 for i, v in enumerate(sorted(set(bids)))}\n    m = len(rk); bit = [0] * (m + 1)\n    def add(i):\n        while i <= m: bit[i] += 1; i += i & -i\n    def qry(i):\n        s = 0\n        while i > 0: s += bit[i]; i -= i & -i\n        return s\n    res = [0] * len(bids)\n    for i in range(len(bids) - 1, -1, -1):\n        r = rk[bids[i]]; res[i] = qry(r - 1); add(r)\n    return res\n"
  }
},
  "price-crash-double-inversion-pairs": {
  "problemId": "price-crash-double-inversion-pairs",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Count cross-half crash pairs with a monotonic two-pointer scan during merge sort before merging the two sorted halves.",
  "hints": [
    "Conceptual Intuition: Consider a Merge-Sort Cross-Pair Sweep paradigm. Count cross-half crash pairs with a monotonic two-pointer scan during merge sort before merging the two sorted halves.",
    "Algorithmic Mechanics: Because both halves are sorted, `j` only moves forward. Sort left & right, two-pointer count `left[i] > 2 * right[j]`, merge.",
    "Edge Cases & Optimization: Count pairs BEFORE merging `left` and `right`. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Merge-Sort Cross-Pair Sweep",
  "approachSteps": [
    "Sort left & right, two-pointer count `left[i] > 2 * right[j]`, merge."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Count pairs BEFORE merging `left` and `right`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_crash_pairs(prices: list[int]) -> int:\n    def sc(a):\n        if len(a) <= 1: return a, 0\n        m = len(a) // 2\n        l, c1 = sc(a[:m]); r, c2 = sc(a[m:])\n        cnt = c1 + c2; j = 0\n        for x in l:\n            while j < len(r) and x > 2 * r[j]: j += 1\n            cnt += j\n        out, i, j = [], 0, 0\n        while i < len(l) and j < len(r):\n            if l[i] <= r[j]: out.append(l[i]); i += 1\n            else: out.append(r[j]); j += 1\n        out.extend(l[i:]); out.extend(r[j:])\n        return out, cnt\n    return sc(prices)[1]\n"
  }
},
  "tree-schema-equality-check": {
  "problemId": "tree-schema-equality-check",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Deserialize both trees and recursively compare structure and values.",
  "hints": [
    "Conceptual Intuition: Consider a Simultaneous Recursive DFS paradigm. Deserialize both trees and recursively compare structure and values.",
    "Algorithmic Mechanics: Two `None` nodes are equal. Compare `a.v == b.v` and recurse on left and right.",
    "Edge Cases & Optimization: Handle empty trees returning `True`. Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Simultaneous Recursive DFS",
  "approachSteps": [
    "Compare `a.v == b.v` and recurse on left and right."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Handle empty trees returning `True`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef _b(arr):\n    if not arr or arr[0] is None: return None\n    r = Node(arr[0]); q = deque([r]); i = 1\n    while q and i < len(arr):\n        u = q.popleft()\n        if i < len(arr) and arr[i] is not None: u.l = Node(arr[i]); q.append(u.l)\n        i += 1\n        if i < len(arr) and arr[i] is not None: u.r = Node(arr[i]); q.append(u.r)\n        i += 1\n    return r\n\ndef same_config_ast(ast_a: list, ast_b: list) -> bool:\n    def eq(a, b):\n        if not a and not b: return True\n        if not a or not b or a.v != b.v: return False\n        return eq(a.l, b.l) and eq(a.r, b.r)\n    return eq(_b(ast_a), _b(ast_b))\n"
  }
},
  "load-balancer-tree-symmetry": {
  "problemId": "load-balancer-tree-symmetry",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Check `mirror(root.l, root.r)` comparing `(a.l, b.r)` and `(a.r, b.l)` recursively.",
  "hints": [
    "Conceptual Intuition: Consider a Recursive Mirror DFS paradigm. Check `mirror(root.l, root.r)` comparing `(a.l, b.r)` and `(a.r, b.l)` recursively.",
    "Algorithmic Mechanics: Outer pairs and inner pairs must match. Deserialize and check `mirror(root.l, root.r)`.",
    "Edge Cases & Optimization: Compare opposite children `a.l` with `b.r`. Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Recursive Mirror DFS",
  "approachSteps": [
    "Deserialize and check `mirror(root.l, root.r)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Compare opposite children `a.l` with `b.r`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef is_mirror_topology(tree: list) -> bool:\n    if not tree or tree[0] is None: return True\n    r = Node(tree[0]); q = deque([r]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    def mir(a, b):\n        if not a and not b: return True\n        if not a or not b or a.v != b.v: return False\n        return mir(a.l, b.r) and mir(a.r, b.l)\n    return mir(r.l, r.r)\n"
  }
},
  "sharding-tree-height-balance": {
  "problemId": "sharding-tree-height-balance",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use a bottom-up post-order DFS returning `-1` immediately upon finding any height difference `> 1`.",
  "hints": [
    "Conceptual Intuition: Consider a Bottom-Up Sentinel Height DFS paradigm. Use a bottom-up post-order DFS returning `-1` immediately upon finding any height difference `> 1`.",
    "Algorithmic Mechanics: Single O(n) pass avoids redundant height recomputation. Compute `lh, rh`; return `-1` if unbalanced else `1 + max(lh, rh)`.",
    "Edge Cases & Optimization: Empty tree is balanced (`True`). Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bottom-Up Sentinel Height DFS",
  "approachSteps": [
    "Compute `lh, rh`; return `-1` if unbalanced else `1 + max(lh, rh)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Empty tree is balanced (`True`)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef is_height_balanced(tree: list) -> bool:\n    if not tree or tree[0] is None: return True\n    r = Node(tree[0]); q = deque([r]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    def h(u):\n        if not u: return 0\n        lh = h(u.l)\n        if lh == -1: return -1\n        rh = h(u.r)\n        if rh == -1 or abs(lh - rh) > 1: return -1\n        return 1 + max(lh, rh)\n    return h(r) != -1\n"
  }
},
  "budget-tree-exact-leaf-sum": {
  "problemId": "budget-tree-exact-leaf-sum",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Subtract `node.v` down DFS and check `rem == node.v` strictly at true leaf nodes.",
  "hints": [
    "Conceptual Intuition: Consider a Remaining-Budget Leaf DFS paradigm. Subtract `node.v` down DFS and check `rem == node.v` strictly at true leaf nodes.",
    "Algorithmic Mechanics: A leaf has both `left is None` and `right is None`. Deserialize; return `False` if empty; DFS subtracting `u.v` until leaf.",
    "Edge Cases & Optimization: Empty tree returns `False` even when `budget == 0`. Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Remaining-Budget Leaf DFS",
  "approachSteps": [
    "Deserialize; return `False` if empty; DFS subtracting `u.v` until leaf."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Empty tree returns `False` even when `budget == 0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef has_budget_path(tree: list, budget: int) -> bool:\n    if not tree or tree[0] is None: return False\n    r = Node(tree[0]); q = deque([r]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    def dfs(u, rem):\n        if not u: return False\n        if not u.l and not u.r: return rem == u.v\n        return dfs(u.l, rem - u.v) or dfs(u.r, rem - u.v)\n    return dfs(r, budget)\n"
  }
},
  "skyline-tree-right-profile": {
  "problemId": "skyline-tree-right-profile",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Perform level-order BFS and record the final node popped in each depth level.",
  "hints": [
    "Conceptual Intuition: Consider a Level-End BFS Capture paradigm. Perform level-order BFS and record the final node popped in each depth level.",
    "Algorithmic Mechanics: Snapshot `len(q)` per level. Deserialize and emit the last value of each BFS level.",
    "Edge Cases & Optimization: Walking only `root.r` misses deeper left branches. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Level-End BFS Capture",
  "approachSteps": [
    "Deserialize and emit the last value of each BFS level."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Walking only `root.r` misses deeper left branches."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef right_edge_profile(tree: list) -> list[int]:\n    if not tree or tree[0] is None: return []\n    r = Node(tree[0]); q = deque([r]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    res, q = [], deque([r])\n    while q:\n        last = None\n        for _ in range(len(q)):\n            u = q.popleft(); last = u.v\n            if u.l: q.append(u.l)\n            if u.r: q.append(u.r)\n        res.append(last)\n    return res\n"
  }
},
  "printer-zigzag-tier-order": {
  "problemId": "printer-zigzag-tier-order",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run level-order BFS and reverse odd-depth level lists before appending.",
  "hints": [
    "Conceptual Intuition: Consider a Alternating-Flip BFS paradigm. Run level-order BFS and reverse odd-depth level lists before appending.",
    "Algorithmic Mechanics: Toggle a boolean flag after each level. Collect each BFS tier and reverse when `not ltr`.",
    "Edge Cases & Optimization: Keep queue insertion order strictly left-then-right. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Alternating-Flip BFS",
  "approachSteps": [
    "Collect each BFS tier and reverse when `not ltr`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Keep queue insertion order strictly left-then-right."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef zigzag_tier_sweep(tree: list) -> list[list[int]]:\n    if not tree or tree[0] is None: return []\n    r = Node(tree[0]); q = deque([r]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    res, q, ltr = [], deque([r]), True\n    while q:\n        lvl = []\n        for _ in range(len(q)):\n            u = q.popleft(); lvl.append(u.v)\n            if u.l: q.append(u.l)\n            if u.r: q.append(u.r)\n        res.append(lvl if ltr else lvl[::-1]); ltr = not ltr\n    return res\n"
  }
},
  "telemetry-tree-dominant-nodes": {
  "problemId": "telemetry-tree-dominant-nodes",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Carry `path_max` down a top-down DFS and count every node with `u.v >= path_max`.",
  "hints": [
    "Conceptual Intuition: Consider a Path-Maximum Top-Down DFS paradigm. Carry `path_max` down a top-down DFS and count every node with `u.v >= path_max`.",
    "Algorithmic Mechanics: Start `path_max = root.v` so negative values work. Deserialize and sum `(u.v >= mx) + dfs(u.l, max(mx, u.v)) + dfs(u.r, max(mx, u.v))`.",
    "Edge Cases & Optimization: Do not initialize `path_max = 0`. Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Path-Maximum Top-Down DFS",
  "approachSteps": [
    "Deserialize and sum `(u.v >= mx) + dfs(u.l, max(mx, u.v)) + dfs(u.r, max(mx, u.v))`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Do not initialize `path_max = 0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef count_dominant_nodes(tree: list) -> int:\n    r = Node(tree[0]); q = deque([r]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    def dfs(u, mx):\n        if not u: return 0\n        nmx = max(mx, u.v)\n        return (1 if u.v >= mx else 0) + dfs(u.l, nmx) + dfs(u.r, nmx)\n    return dfs(r, r.v)\n"
  }
},
  "lineage-tree-common-ancestor": {
  "problemId": "lineage-tree-common-ancestor",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Return `u` if `u.v in (x, y)`; if both left and right calls return non-null, `u` is the LCA, else bubble up the non-null child.",
  "hints": [
    "Conceptual Intuition: Consider a Post-Order Bubbling DFS paradigm. Return `u` if `u.v in (x, y)`; if both left and right calls return non-null, `u` is the LCA, else bubble up the non-null child.",
    "Algorithmic Mechanics: Works on any binary tree without BST ordering. Deserialize and bubble target matches upward.",
    "Edge Cases & Optimization: Return the node value integer, not the node reference. Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Post-Order Bubbling DFS",
  "approachSteps": [
    "Deserialize and bubble target matches upward."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Return the node value integer, not the node reference."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef common_lineage_node(tree: list, x: int, y: int) -> int:\n    r = Node(tree[0]); q = deque([r]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    def lca(u):\n        if not u or u.v == x or u.v == y: return u\n        a, b = lca(u.l), lca(u.r)\n        return u if (a and b) else (a or b)\n    return lca(r).v\n"
  }
},
  "digit-tree-path-checksum": {
  "problemId": "digit-tree-path-checksum",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Accumulate `cur = cur * 10 + u.v` down DFS and return `cur` at leaf nodes.",
  "hints": [
    "Conceptual Intuition: Consider a Decimal-Prefix DFS paradigm. Accumulate `cur = cur * 10 + u.v` down DFS and return `cur` at leaf nodes.",
    "Algorithmic Mechanics: Only emit values at leaf nodes. Pass `cur * 10 + u.v` to children; return at leaves.",
    "Edge Cases & Optimization: Handle single-node trees cleanly. Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Decimal-Prefix DFS",
  "approachSteps": [
    "Pass `cur * 10 + u.v` to children; return at leaves."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Handle single-node trees cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef sum_leaf_codes(tree: list) -> int:\n    r = Node(tree[0]); q = deque([r]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    def dfs(u, cur):\n        if not u: return 0\n        nxt = cur * 10 + u.v\n        if not u.l and not u.r: return nxt\n        return dfs(u.l, nxt) + dfs(u.r, nxt)\n    return dfs(r, 0)\n"
  }
},
  "pixel-canvas-region-recolor": {
  "problemId": "pixel-canvas-region-recolor",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Guard `orig == paint` upfront, then BFS 4-directional neighbors matching `orig`.",
  "hints": [
    "Conceptual Intuition: Consider a Guarded 4-Way BFS Fill paradigm. Guard `orig == paint` upfront, then BFS 4-directional neighbors matching `orig`.",
    "Algorithmic Mechanics: Without `if orig == paint: return canvas`, BFS loops forever. Check `orig != paint`, recolor `(sr, sc)`, BFS matching neighbors.",
    "Edge Cases & Optimization: Guard against same-color no-op. Ensure time complexity is bounded to O(m * n) with O(m * n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Guarded 4-Way BFS Fill",
  "approachSteps": [
    "Check `orig != paint`, recolor `(sr, sc)`, BFS matching neighbors."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Guard against same-color no-op."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef bucket_fill(canvas: list[list[int]], sr: int, sc: int, paint: int) -> list[list[int]]:\n    orig = canvas[sr][sc]\n    if orig == paint: return canvas\n    m, n = len(canvas), len(canvas[0])\n    canvas[sr][sc] = paint\n    q = deque([(sr, sc)])\n    while q:\n        r, c = q.popleft()\n        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < m and 0 <= nc < n and canvas[nr][nc] == orig:\n                canvas[nr][nc] = paint; q.append((nr, nc))\n    return canvas\n"
  }
},
  "reef-satellite-largest-coral": {
  "problemId": "reef-satellite-largest-coral",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "BFS-flood-fill each unvisited `1` cell, measuring component size and tracking the maximum.",
  "hints": [
    "Conceptual Intuition: Consider a Connected-Component Size BFS paradigm. BFS-flood-fill each unvisited `1` cell, measuring component size and tracking the maximum.",
    "Algorithmic Mechanics: Mark visited cells `0` on enqueue. Scan grid; flood-fill every `1` and update `best`.",
    "Edge Cases & Optimization: Only 4-directional neighbors connect. Ensure time complexity is bounded to O(m * n) with O(m * n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Connected-Component Size BFS",
  "approachSteps": [
    "Scan grid; flood-fill every `1` and update `best`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Only 4-directional neighbors connect."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef largest_reef_patch(reef: list[list[int]]) -> int:\n    m, n = len(reef), len(reef[0])\n    g = [row[:] for row in reef]; best = 0\n    for r in range(m):\n        for c in range(n):\n            if g[r][c] == 1:\n                g[r][c] = 0; q = deque([(r, c)]); area = 0\n                while q:\n                    cr, cc = q.popleft(); area += 1\n                    for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n                        nr, nc = cr + dr, cc + dc\n                        if 0 <= nr < m and 0 <= nc < n and g[nr][nc] == 1:\n                            g[nr][nc] = 0; q.append((nr, nc))\n                if area > best: best = area\n    return best\n"
  }
},
  "quarantine-zone-enclosed-capture": {
  "problemId": "quarantine-zone-enclosed-capture",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "BFS from all border `'O'`s marking safe cells `'S'`, then convert remaining `'O'`s to `'X'` and `'S'` back to `'O'`.",
  "hints": [
    "Conceptual Intuition: Consider a Border-Seeded Escape BFS paradigm. BFS from all border `'O'`s marking safe cells `'S'`, then convert remaining `'O'`s to `'X'` and `'S'` back to `'O'`.",
    "Algorithmic Mechanics: Start from the 4 borders rather than testing interior cells. Mark border-reachable `'O'` as `'S'`, flip `'O'->'X'` and `'S'->'O'`.",
    "Edge Cases & Optimization: Scan all four border edges. Ensure time complexity is bounded to O(m * n) with O(m * n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Border-Seeded Escape BFS",
  "approachSteps": [
    "Mark border-reachable `'O'` as `'S'`, flip `'O'->'X'` and `'S'->'O'`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Scan all four border edges."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef seal_enclosed_zones(zone: list[list[str]]) -> list[list[str]]:\n    m, n = len(zone), len(zone[0])\n    q = deque()\n    for r in range(m):\n        for c in (0, n - 1):\n            if zone[r][c] == 'O': zone[r][c] = 'S'; q.append((r, c))\n    for c in range(n):\n        for r in (0, m - 1):\n            if zone[r][c] == 'O': zone[r][c] = 'S'; q.append((r, c))\n    while q:\n        r, c = q.popleft()\n        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < m and 0 <= nc < n and zone[nr][nc] == 'O':\n                zone[nr][nc] = 'S'; q.append((nr, nc))\n    for r in range(m):\n        for c in range(n):\n            if zone[r][c] == 'O': zone[r][c] = 'X'\n            elif zone[r][c] == 'S': zone[r][c] = 'O'\n    return zone\n"
  }
},
  "watershed-dual-basin-ridge": {
  "problemId": "watershed-dual-basin-ridge",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run two uphill BFS passes from North borders and South borders (`next_elev >= curr_elev`) and intersect the two visited sets.",
  "hints": [
    "Conceptual Intuition: Consider a Dual Uphill Reverse BFS paradigm. Run two uphill BFS passes from North borders and South borders (`next_elev >= curr_elev`) and intersect the two visited sets.",
    "Algorithmic Mechanics: Climbing uphill from borders avoids O((mn)^2) repeated searches. BFS uphill from top/left, BFS uphill from bottom/right, intersect sets.",
    "Edge Cases & Optimization: Reverse flow uses `>=`. Ensure time complexity is bounded to O(m * n) with O(m * n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Dual Uphill Reverse BFS",
  "approachSteps": [
    "BFS uphill from top/left, BFS uphill from bottom/right, intersect sets."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Reverse flow uses `>=`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef dual_basin_cells(terrain: list[list[int]]) -> list[list[int]]:\n    m, n = len(terrain), len(terrain[0])\n    def bfs(starts):\n        vis = set(starts); q = deque(starts)\n        while q:\n            r, c = q.popleft()\n            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in vis and terrain[nr][nc] >= terrain[r][c]:\n                    vis.add((nr, nc)); q.append((nr, nc))\n        return vis\n    north = bfs([(0, c) for c in range(n)] + [(r, 0) for r in range(m)])\n    south = bfs([(m - 1, c) for c in range(n)] + [(r, n - 1) for r in range(m)])\n    return sorted([r, c] for r, c in (north & south))\n"
  }
},
  "workflow-dag-all-execution-paths": {
  "problemId": "workflow-dag-all-execution-paths",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run DFS backtracking from stage `0`, saving `path[:]` whenever reaching `n - 1`.",
  "hints": [
    "Conceptual Intuition: Consider a DAG Backtracking Enumeration paradigm. Run DFS backtracking from stage `0`, saving `path[:]` whenever reaching `n - 1`.",
    "Algorithmic Mechanics: A DAG guarantees termination without a visited set. Push neighbor, recurse, pop; record `path[:]` at `n - 1`.",
    "Edge Cases & Optimization: Copy `path[:]` when recording a completed path. Ensure time complexity is bounded to O(2^n * n) with O(n) stack auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "DAG Backtracking Enumeration",
  "approachSteps": [
    "Push neighbor, recurse, pop; record `path[:]` at `n - 1`."
  ],
  "timeComplexity": "O(2^n * n)",
  "spaceComplexity": "O(n) stack",
  "pitfalls": [
    "Copy `path[:]` when recording a completed path."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def all_workflow_paths(stages: list[list[int]]) -> list[list[int]]:\n    tgt = len(stages) - 1; res, path = [], [0]\n    def dfs(u):\n        if u == tgt: res.append(path[:]); return\n        for v in stages[u]: path.append(v); dfs(v); path.pop()\n    dfs(0)\n    return res\n"
  }
},
  "vault-badge-full-access-check": {
  "problemId": "vault-badge-full-access-check",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Explore reachable vaults via DFS/BFS from vault `0` and check `len(visited) == len(badges)`.",
  "hints": [
    "Conceptual Intuition: Consider a Source-0 Graph Reachability paradigm. Explore reachable vaults via DFS/BFS from vault `0` and check `len(visited) == len(badges)`.",
    "Algorithmic Mechanics: Track `visited` to avoid infinite loops on cyclic keycards. DFS from `0`, return `len(vis) == len(badges)`.",
    "Edge Cases & Optimization: Handle self-keys gracefully via `visited`. Ensure time complexity is bounded to O(V + E) with O(V) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Source-0 Graph Reachability",
  "approachSteps": [
    "DFS from `0`, return `len(vis) == len(badges)`."
  ],
  "timeComplexity": "O(V + E)",
  "spaceComplexity": "O(V)",
  "pitfalls": [
    "Handle self-keys gracefully via `visited`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def can_open_all_vaults(badges: list[list[int]]) -> bool:\n    vis, st = {0}, [0]\n    while st:\n        u = st.pop()\n        for v in badges[u]:\n            if v not in vis: vis.add(v); st.append(v)\n    return len(vis) == len(badges)\n"
  }
},
  "state-machine-guaranteed-halt-nodes": {
  "problemId": "state-machine-guaranteed-halt-nodes",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Reverse all transitions and run Kahn's BFS starting from terminal states (`outdeg == 0`).",
  "hints": [
    "Conceptual Intuition: Consider a Reversed-Edge Kahn's Sort paradigm. Reverse all transitions and run Kahn's BFS starting from terminal states (`outdeg == 0`).",
    "Algorithmic Mechanics: A state is guaranteed-halting once all its outgoing targets are guaranteed-halting. Build reversed graph and `outdeg`, peel zero-outdeg states via queue, return sorted safe list.",
    "Edge Cases & Optimization: Emit results in ascending order. Ensure time complexity is bounded to O(V + E) with O(V + E) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Reversed-Edge Kahn's Sort",
  "approachSteps": [
    "Build reversed graph and `outdeg`, peel zero-outdeg states via queue, return sorted safe list."
  ],
  "timeComplexity": "O(V + E)",
  "spaceComplexity": "O(V + E)",
  "pitfalls": [
    "Emit results in ascending order."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef halting_states(trans: list[list[int]]) -> list[int]:\n    n = len(trans); rev = [[] for _ in range(n)]\n    outd = [len(e) for e in trans]\n    for u, edges in enumerate(trans):\n        for v in edges: rev[v].append(u)\n    q = deque(i for i in range(n) if outd[i] == 0)\n    safe = [False] * n\n    while q:\n        u = q.popleft(); safe[u] = True\n        for p in rev[u]:\n            outd[p] -= 1\n            if outd[p] == 0: q.append(p)\n    return [i for i in range(n) if safe[i]]\n"
  }
},
  "unknown-script-lexicon-order": {
  "problemId": "unknown-script-lexicon-order",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Extract the first differing character from each adjacent word pair into a directed graph (checking prefix invalidity), then run min-heap Kahn's sort.",
  "hints": [
    "Conceptual Intuition: Consider a Adjacent-Pair Precedence + Min-Heap Kahn's paradigm. Extract the first differing character from each adjacent word pair into a directed graph (checking prefix invalidity), then run min-heap Kahn's sort.",
    "Algorithmic Mechanics: Deduplicate edges before incrementing in-degree. Build char graph from adjacent mismatches, check prefix inversions, topologically sort.",
    "Edge Cases & Optimization: Explicitly reject `len(w1) > len(w2) and w1.startswith(w2)`. Ensure time complexity is bounded to O(C + U log U) with O(U + E) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Adjacent-Pair Precedence + Min-Heap Kahn's",
  "approachSteps": [
    "Build char graph from adjacent mismatches, check prefix inversions, topologically sort."
  ],
  "timeComplexity": "O(C + U log U)",
  "spaceComplexity": "O(U + E)",
  "pitfalls": [
    "Explicitly reject `len(w1) > len(w2) and w1.startswith(w2)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef recover_alphabet(entries: list[str]) -> str:\n    adj = {ch: set() for w in entries for ch in w}\n    ind = {ch: 0 for ch in adj}\n    for i in range(len(entries) - 1):\n        a, b = entries[i], entries[i + 1]\n        if len(a) > len(b) and a.startswith(b): return \"\"\n        for c1, c2 in zip(a, b):\n            if c1 != c2:\n                if c2 not in adj[c1]: adj[c1].add(c2); ind[c2] += 1\n                break\n    h = [c for c, d in ind.items() if d == 0]; heapq.heapify(h)\n    out = []\n    while h:\n        u = heapq.heappop(h); out.append(u)\n        for v in adj[u]:\n            ind[v] -= 1\n            if ind[v] == 0: heapq.heappush(h, v)\n    return \"\".join(out) if len(out) == len(ind) else \"\"\n"
  }
},
  "network-cluster-island-count": {
  "problemId": "network-cluster-island-count",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Initialize Union-Find with `clusters = n` and decrement whenever an edge merges two distinct roots.",
  "hints": [
    "Conceptual Intuition: Consider a Union-Find Component Counter paradigm. Initialize Union-Find with `clusters = n` and decrement whenever an edge merges two distinct roots.",
    "Algorithmic Mechanics: Redundant edges inside the same component do not change the count. Union endpoints of each link; decrement `clusters` on distinct roots.",
    "Edge Cases & Optimization: Check `ru != rv` before decrementing. Ensure time complexity is bounded to O(n + E * alpha(n)) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Union-Find Component Counter",
  "approachSteps": [
    "Union endpoints of each link; decrement `clusters` on distinct roots."
  ],
  "timeComplexity": "O(n + E * alpha(n))",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Check `ru != rv` before decrementing."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_server_clusters(n: int, links: list[list[int]]) -> int:\n    p = list(range(n))\n    def find(x):\n        while p[x] != x: p[x] = p[p[x]]; x = p[x]\n        return x\n    c = n\n    for u, v in links:\n        ru, rv = find(u), find(v)\n        if ru != rv: p[ru] = rv; c -= 1\n    return c\n"
  }
},
  "dictionary-one-char-hop-distance": {
  "problemId": "dictionary-one-char-hop-distance",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Index `allowed` words by single-character wildcard masks (`h*t`) and run BFS from `(start_code, 1)`.",
  "hints": [
    "Conceptual Intuition: Consider a Wildcard-Bucket BFS paradigm. Index `allowed` words by single-character wildcard masks (`h*t`) and run BFS from `(start_code, 1)`.",
    "Algorithmic Mechanics: Clear each wildcard bucket after visiting it so it is never re-iterated. Return `0` if `end_code not in allowed`; build mask buckets; BFS to `end_code`.",
    "Edge Cases & Optimization: Return word count (starts at 1), not edge count. Ensure time complexity is bounded to O(N * L^2) with O(N * L^2) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Wildcard-Bucket BFS",
  "approachSteps": [
    "Return `0` if `end_code not in allowed`; build mask buckets; BFS to `end_code`."
  ],
  "timeComplexity": "O(N * L^2)",
  "spaceComplexity": "O(N * L^2)",
  "pitfalls": [
    "Return word count (starts at 1), not edge count."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict, deque\n\ndef min_mutation_chain(start_code: str, end_code: str, allowed: list[str]) -> int:\n    ws = set(allowed)\n    if end_code not in ws: return 0\n    L = len(start_code); pats = defaultdict(list)\n    for w in ws:\n        for i in range(L): pats[w[:i] + '*' + w[i + 1:]].append(w)\n    q, vis = deque([(start_code, 1)]), {start_code}\n    while q:\n        w, d = q.popleft()\n        if w == end_code: return d\n        for i in range(L):\n            p = w[:i] + '*' + w[i + 1:]\n            for nxt in pats[p]:\n                if nxt not in vis: vis.add(nxt); q.append((nxt, d + 1))\n            pats[p] = []\n    return 0\n"
  }
},
  "deployment-order-all-permutations": {
  "problemId": "deployment-order-all-permutations",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Swap each candidate into index `s`, recurse on `s + 1`, and restore on backtrack.",
  "hints": [
    "Conceptual Intuition: Consider a Swap-In-Place Backtracking paradigm. Swap each candidate into index `s`, recurse on `s + 1`, and restore on backtrack.",
    "Algorithmic Mechanics: Append a copy `arr[:]` at base case `s == len(arr)`. Swap `arr[s], arr[i]`, recurse `bt(s + 1)`, swap back.",
    "Edge Cases & Optimization: Never append a mutable reference without copying. Ensure time complexity is bounded to O(n * n!) with O(n) stack auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Swap-In-Place Backtracking",
  "approachSteps": [
    "Swap `arr[s], arr[i]`, recurse `bt(s + 1)`, swap back."
  ],
  "timeComplexity": "O(n * n!)",
  "spaceComplexity": "O(n) stack",
  "pitfalls": [
    "Never append a mutable reference without copying."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def all_rollout_orders(services: list[int]) -> list[list[int]]:\n    a, n, res = list(services), len(services), []\n    def bt(s):\n        if s == n: res.append(a[:]); return\n        for i in range(s, n):\n            a[s], a[i] = a[i], a[s]; bt(s + 1); a[s], a[i] = a[i], a[s]\n    bt(0)\n    return res\n"
  }
},
  "keypad-mnemonic-all-codes": {
  "problemId": "keypad-mnemonic-all-codes",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Backtrack character by character across the keypad mapping for `keys`.",
  "hints": [
    "Conceptual Intuition: Consider a Keypad Backtracking paradigm. Backtrack character by character across the keypad mapping for `keys`.",
    "Algorithmic Mechanics: Return `[]` for empty `keys`. For each digit position, branch over mapped letters and emit when complete.",
    "Edge Cases & Optimization: Remember `'7'` and `'9'` map to 4 letters each. Ensure time complexity is bounded to O(4^n * n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Keypad Backtracking",
  "approachSteps": [
    "For each digit position, branch over mapped letters and emit when complete."
  ],
  "timeComplexity": "O(4^n * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Remember `'7'` and `'9'` map to 4 letters each."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def keypad_mnemonics(keys: str) -> list[str]:\n    if not keys: return []\n    mp = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}\n    res, path = [], []\n    def bt(i):\n        if i == len(keys): res.append(\"\".join(path)); return\n        for ch in mp[keys[i]]: path.append(ch); bt(i + 1); path.pop()\n    bt(0)\n    return res\n"
  }
},
  "balanced-tag-pair-generator": {
  "problemId": "balanced-tag-pair-generator",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track `open_used` and `close_used`, allowing `'('` when `open_used < pairs` and `')'` when `close_used < open_used`.",
  "hints": [
    "Conceptual Intuition: Consider a Constrained Backtracking paradigm. Track `open_used` and `close_used`, allowing `'('` when `open_used < pairs` and `')'` when `close_used < open_used`.",
    "Algorithmic Mechanics: Never let `close_used` exceed `open_used`. Branch on `'('` if `o < pairs` and `')'` if `c < o`.",
    "Edge Cases & Optimization: Emit when `len(path) == 2 * pairs`. Ensure time complexity is bounded to O(4^n / sqrt(n)) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Constrained Backtracking",
  "approachSteps": [
    "Branch on `'('` if `o < pairs` and `')'` if `c < o`."
  ],
  "timeComplexity": "O(4^n / sqrt(n))",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Emit when `len(path) == 2 * pairs`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def fuzz_balanced_pairs(pairs: int) -> list[str]:\n    res, p = [], []\n    def bt(o, c):\n        if len(p) == 2 * pairs: res.append(\"\".join(p)); return\n        if o < pairs: p.append('('); bt(o + 1, c); p.pop()\n        if c < o: p.append(')'); bt(o, c + 1); p.pop()\n    bt(0, 0)\n    return res\n"
  }
},
  "boggle-sensor-grid-trace": {
  "problemId": "boggle-sensor-grid-trace",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "DFS from every cell matching `sig[0]`, temporarily marking visited cells `'#'` and restoring on backtrack.",
  "hints": [
    "Conceptual Intuition: Consider a In-Place Marking Grid DFS paradigm. DFS from every cell matching `sig[0]`, temporarily marking visited cells `'#'` and restoring on backtrack.",
    "Algorithmic Mechanics: Restore `board[r][c]` before returning from DFS. Check character match, mark `'#'`, recurse 4 neighbors, restore.",
    "Edge Cases & Optimization: Never leave `'#'` behind when a branch fails. Ensure time complexity is bounded to O(m * n * 3^L) with O(L) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "In-Place Marking Grid DFS",
  "approachSteps": [
    "Check character match, mark `'#'`, recurse 4 neighbors, restore."
  ],
  "timeComplexity": "O(m * n * 3^L)",
  "spaceComplexity": "O(L)",
  "pitfalls": [
    "Never leave `'#'` behind when a branch fails."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def trace_grid_signature(board: list[list[str]], sig: str) -> bool:\n    m, n = len(board), len(board[0])\n    def dfs(r, c, i):\n        if i == len(sig): return True\n        if not (0 <= r < m and 0 <= c < n) or board[r][c] != sig[i]: return False\n        ch = board[r][c]; board[r][c] = '#'\n        ok = any(dfs(r + dr, c + dc, i + 1) for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)))\n        board[r][c] = ch\n        return ok\n    return any(dfs(r, c, 0) for r in range(m) for c in range(n))\n"
  }
},
  "stream-label-minimal-cuts": {
  "problemId": "stream-label-minimal-cuts",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Precompute each letter's last index and cut a shard whenever the sweep index `i` catches up to `end = max(end, last[ch])`.",
  "hints": [
    "Conceptual Intuition: Consider a Last-Index Greedy Cut paradigm. Precompute each letter's last index and cut a shard whenever the sweep index `i` catches up to `end = max(end, last[ch])`.",
    "Algorithmic Mechanics: Reset `start = i + 1` after every cut. Build `last`, sweep extending `end`, emit `end - start + 1` at `i == end`.",
    "Edge Cases & Optimization: Handle single-letter strings returning `[len]`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Last-Index Greedy Cut",
  "approachSteps": [
    "Build `last`, sweep extending `end`, emit `end - start + 1` at `i == end`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle single-letter strings returning `[len]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def shard_event_stream(events: str) -> list[int]:\n    last = {ch: i for i, ch in enumerate(events)}\n    res, s, e = [], 0, 0\n    for i, ch in enumerate(events):\n        if last[ch] > e: e = last[ch]\n        if i == e: res.append(e - s + 1); s = i + 1\n    return res\n"
  }
},
  "relay-hop-minimum-jumps": {
  "problemId": "relay-hop-minimum-jumps",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track `cur_end` of the current hop layer and `far` for the next hop; increment `hops` when `i == cur_end` up to `n - 2`.",
  "hints": [
    "Conceptual Intuition: Consider a Implicit-BFS Greedy Layer Sweep paradigm. Track `cur_end` of the current hop layer and `far` for the next hop; increment `hops` when `i == cur_end` up to `n - 2`.",
    "Algorithmic Mechanics: Stop at `len(reaches) - 2`. Update `far = max(far, i + reaches[i])`; at `i == cur_end`, bump `hops` and set `cur_end = far`.",
    "Edge Cases & Optimization: Single-node array needs `0` hops. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Implicit-BFS Greedy Layer Sweep",
  "approachSteps": [
    "Update `far = max(far, i + reaches[i])`; at `i == cur_end`, bump `hops` and set `cur_end = far`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Single-node array needs `0` hops."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_signal_hops(reaches: list[int]) -> int:\n    hops = end = far = 0\n    for i in range(len(reaches) - 1):\n        if i + reaches[i] > far: far = i + reaches[i]\n        if i == end: hops += 1; end = far\n    return hops\n"
  }
},
  "romans-legacy-invoice-parser": {
  "problemId": "romans-legacy-invoice-parser",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Subtract a symbol's value when it is strictly smaller than the next symbol; otherwise add it.",
  "hints": [
    "Conceptual Intuition: Consider a Single-Pass Subtractive Lookahead paradigm. Subtract a symbol's value when it is strictly smaller than the next symbol; otherwise add it.",
    "Algorithmic Mechanics: Look ahead 1 character. Sum values subtracting whenever `vals[code[i]] < vals[code[i + 1]]`.",
    "Edge Cases & Optimization: Guard `i + 1 < len(code)`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Single-Pass Subtractive Lookahead",
  "approachSteps": [
    "Sum values subtracting whenever `vals[code[i]] < vals[code[i + 1]]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Guard `i + 1 < len(code)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def decode_roman_batch(code: str) -> int:\n    v = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}\n    return sum(-v[code[i]] if i + 1 < len(code) and v[code[i]] < v[code[i + 1]] else v[code[i]] for i in range(len(code)))\n"
  }
},
  "romans-batch-code-formatter": {
  "problemId": "romans-batch-code-formatter",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Greedily decompose `num` against a 13-entry descending `(value, symbol)` table including subtractive pairs.",
  "hints": [
    "Conceptual Intuition: Consider a 13-Token Greedy Decomposition paradigm. Greedily decompose `num` against a 13-entry descending `(value, symbol)` table including subtractive pairs.",
    "Algorithmic Mechanics: Use `divmod(num, val)` for each token. Iterate descending tokens appending `sym * count`.",
    "Edge Cases & Optimization: Include all 6 subtractive forms (`CM, CD, XC, XL, IX, IV`). Ensure time complexity is bounded to O(1) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "13-Token Greedy Decomposition",
  "approachSteps": [
    "Iterate descending tokens appending `sym * count`."
  ],
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Include all 6 subtractive forms (`CM, CD, XC, XL, IX, IV`)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def format_roman_batch(num: int) -> str:\n    tbl = [(1000,'M'),(900,'CM'),(500,'D'),(400,'CD'),(100,'C'),(90,'XC'),(50,'L'),(40,'XL'),(10,'X'),(9,'IX'),(5,'V'),(4,'IV'),(1,'I')]\n    out = []\n    for v, s in tbl:\n        c, num = divmod(num, v)\n        if c: out.append(s * c)\n    return \"\".join(out)\n"
  }
},
  "protocol-word-bijection-check": {
  "problemId": "protocol-word-bijection-check",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Split `frame` into words, check equal length with `schema`, and verify bidirectional maps `c2w` and `w2c`.",
  "hints": [
    "Conceptual Intuition: Consider a Bidirectional Token Map paradigm. Split `frame` into words, check equal length with `schema`, and verify bidirectional maps `c2w` and `w2c`.",
    "Algorithmic Mechanics: Guard `len(words) == len(schema)` first. Check equal counts, then enforce bijection across `zip(schema, words)`.",
    "Edge Cases & Optimization: Check both directions to reject collisions. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bidirectional Token Map",
  "approachSteps": [
    "Check equal counts, then enforce bijection across `zip(schema, words)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Check both directions to reject collisions."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def matches_frame_schema(schema: str, frame: str) -> bool:\n    ws = frame.split()\n    if len(ws) != len(schema): return False\n    c2w, w2c = {}, {}\n    for c, w in zip(schema, ws):\n        if (c in c2w and c2w[c] != w) or (w in w2c and w2c[w] != c): return False\n        c2w[c] = w; w2c[w] = c\n    return True\n"
  }
},
  "parts-kit-supply-verifier": {
  "problemId": "parts-kit-supply-verifier",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Verify `Counter(blueprint) - Counter(bin_parts)` is empty.",
  "hints": [
    "Conceptual Intuition: Consider a Frequency Supply Check paradigm. Verify `Counter(blueprint) - Counter(bin_parts)` is empty.",
    "Algorithmic Mechanics: Multiset subtraction checks every component multiplicity in O(n + m). Compare letter counts of `blueprint` against `bin_parts`.",
    "Edge Cases & Optimization: Set membership alone misses duplicate component needs. Ensure time complexity is bounded to O(n + m) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Frequency Supply Check",
  "approachSteps": [
    "Compare letter counts of `blueprint` against `bin_parts`."
  ],
  "timeComplexity": "O(n + m)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Set membership alone misses duplicate component needs."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import Counter\n\ndef can_assemble_kit(blueprint: str, bin_parts: str) -> bool:\n    return not (Counter(blueprint) - Counter(bin_parts))\n"
  }
},
  "stream-sliding-permutation-alert": {
  "problemId": "stream-sliding-permutation-alert",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Slide a window of length `len(sig)` over `stream` comparing 26-slot frequency arrays.",
  "hints": [
    "Conceptual Intuition: Consider a Fixed-Width Frequency Window paradigm. Slide a window of length `len(sig)` over `stream` comparing 26-slot frequency arrays.",
    "Algorithmic Mechanics: Return `False` immediately if `len(sig) > len(stream)`. Initialize counts for `sig` and `stream[:k]`, slide updating entering/exiting counts.",
    "Edge Cases & Optimization: Check the initial window at index 0. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Fixed-Width Frequency Window",
  "approachSteps": [
    "Initialize counts for `sig` and `stream[:k]`, slide updating entering/exiting counts."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Check the initial window at index 0."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def has_scrambled_sig(sig: str, stream: str) -> bool:\n    k, n = len(sig), len(stream)\n    if k > n: return False\n    c1, c2 = [0] * 26, [0] * 26\n    for ch in sig: c1[ord(ch) - 97] += 1\n    for i in range(k): c2[ord(stream[i]) - 97] += 1\n    if c1 == c2: return True\n    for i in range(k, n):\n        c2[ord(stream[i]) - 97] += 1\n        c2[ord(stream[i - k]) - 97] -= 1\n        if c1 == c2: return True\n    return False\n"
  }
},
  "ring-road-nonadjacent-tolls": {
  "problemId": "ring-road-nonadjacent-tolls",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Take `max(linear(tolls[:-1]), linear(tolls[1:]))` after handling `len == 1`.",
  "hints": [
    "Conceptual Intuition: Consider a Split-Ring Dual Linear DP paradigm. Take `max(linear(tolls[:-1]), linear(tolls[1:]))` after handling `len == 1`.",
    "Algorithmic Mechanics: Gate 0 and gate `n - 1` cannot both be active. Handle `len == 1`, then run linear DP on both open arcs.",
    "Edge Cases & Optimization: Handle single-gate beltway directly. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Split-Ring Dual Linear DP",
  "approachSteps": [
    "Handle `len == 1`, then run linear DP on both open arcs."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle single-gate beltway directly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def max_ring_tolls(tolls: list[int]) -> int:\n    if len(tolls) == 1: return tolls[0]\n    def line(a):\n        p2 = p1 = 0\n        for x in a: p2, p1 = p1, max(p1, p2 + x)\n        return p1\n    return max(line(tolls[:-1]), line(tolls[1:]))\n"
  }
},
  "digit-message-decoding-count": {
  "problemId": "digit-message-decoding-count",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain rolling DP states `prev2, prev1`, adding `prev1` when `digits[i] != '0'` and `prev2` when `10 <= int(digits[i-1:i+1]) <= 26`.",
  "hints": [
    "Conceptual Intuition: Consider a Rolling 1D Decoding DP paradigm. Maintain rolling DP states `prev2, prev1`, adding `prev1` when `digits[i] != '0'` and `prev2` when `10 <= int(digits[i-1:i+1]) <= 26`.",
    "Algorithmic Mechanics: Return `0` immediately if `digits[0] == '0'`. Scan `1.n-1` combining 1-digit and 2-digit valid transitions.",
    "Edge Cases & Optimization: `'00'` and `'30'` produce `0` valid ways. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Rolling 1D Decoding DP",
  "approachSteps": [
    "Scan `1..n-1` combining 1-digit and 2-digit valid transitions."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "`'00'` and `'30'` produce `0` valid ways."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_pager_decodings(digits: str) -> int:\n    if not digits or digits[0] == '0': return 0\n    p2 = p1 = 1\n    for i in range(1, len(digits)):\n        cur = p1 if digits[i] != '0' else 0\n        if 10 <= int(digits[i - 1:i + 1]) <= 26: cur += p2\n        p2, p1 = p1, cur\n    return p1\n"
  }
},
  "token-dispenser-combo-count": {
  "problemId": "token-dispenser-combo-count",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Loop over `tokens` in the outer loop and `amount` forward in the inner loop (`dp[a] += dp[a - t]`).",
  "hints": [
    "Conceptual Intuition: Consider a Unbounded Combination DP paradigm. Loop over `tokens` in the outer loop and `amount` forward in the inner loop (`dp[a] += dp[a - t]`).",
    "Algorithmic Mechanics: Token-outer loop prevents counting permutations twice. Initialize `dp[0] = 1`; for each `t`, accumulate `dp[a] += dp[a - t]`.",
    "Edge Cases & Optimization: Total `0` always has `1` combination (the empty set). Ensure time complexity is bounded to O(total * len(tokens)) with O(total) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Unbounded Combination DP",
  "approachSteps": [
    "Initialize `dp[0] = 1`; for each `t`, accumulate `dp[a] += dp[a - t]`."
  ],
  "timeComplexity": "O(total * len(tokens))",
  "spaceComplexity": "O(total)",
  "pitfalls": [
    "Total `0` always has `1` combination (the empty set)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def token_combinations(total: int, tokens: list[int]) -> int:\n    dp = [0] * (total + 1); dp[0] = 1\n    for t in tokens:\n        for a in range(t, total + 1): dp[a] += dp[a - t]\n    return dp[total]\n"
  }
},
  "sensor-bias-sign-assignment": {
  "problemId": "sensor-bias-sign-assignment",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Reduce to 0/1 subset sum counting for `pos = (sum(weights) + goal) // 2` after verifying parity and bounds.",
  "hints": [
    "Conceptual Intuition: Consider a 0/1 Subset-Sum Counting DP paradigm. Reduce to 0/1 subset sum counting for `pos = (sum(weights) + goal) // 2` after verifying parity and bounds.",
    "Algorithmic Mechanics: Iterate sums backward from `pos` down to `w`. Check `abs(goal) <= tot` and `(tot + goal) % 2 == 0`; run backward 1D DP.",
    "Edge Cases & Optimization: Zero weights double valid combinations cleanly when looping down to `w = 0`. Ensure time complexity is bounded to O(n * pos) with O(pos) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "0/1 Subset-Sum Counting DP",
  "approachSteps": [
    "Check `abs(goal) <= tot` and `(tot + goal) % 2 == 0`; run backward 1D DP."
  ],
  "timeComplexity": "O(n * pos)",
  "spaceComplexity": "O(pos)",
  "pitfalls": [
    "Zero weights double valid combinations cleanly when looping down to `w = 0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_sign_assignments(weights: list[int], goal: int) -> int:\n    tot = sum(weights)\n    if abs(goal) > tot or (tot + goal) % 2 != 0: return 0\n    pos = (tot + goal) // 2\n    dp = [0] * (pos + 1); dp[0] = 1\n    for w in weights:\n        for s in range(pos, w - 1, -1): dp[s] += dp[s - w]\n    return dp[pos]\n"
  }
},
  "warehouse-grid-min-energy-path": {
  "problemId": "warehouse-grid-min-energy-path",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a 1D row of minimum cumulative costs updating `dp[c] = row[c] + min(dp[c], dp[c - 1])`.",
  "hints": [
    "Conceptual Intuition: Consider a 1D Rolling Grid DP paradigm. Maintain a 1D row of minimum cumulative costs updating `dp[c] = row[c] + min(dp[c], dp[c - 1])`.",
    "Algorithmic Mechanics: Initialize `dp` with prefix sums of row 0. Accumulate row 0, then update each subsequent row in O(n) space.",
    "Edge Cases & Optimization: Update `dp[0] += row[0]` before `c = 1.n-1`. Ensure time complexity is bounded to O(m * n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "1D Rolling Grid DP",
  "approachSteps": [
    "Accumulate row 0, then update each subsequent row in O(n) space."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Update `dp[0] += row[0]` before `c = 1..n-1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_agv_energy(energy: list[list[int]]) -> int:\n    n = len(energy[0]); dp = [0] * n; dp[0] = energy[0][0]\n    for c in range(1, n): dp[c] = dp[c - 1] + energy[0][c]\n    for row in energy[1:]:\n        dp[0] += row[0]\n        for c in range(1, n): dp[c] = row[c] + min(dp[c], dp[c - 1])\n    return dp[-1]\n"
  }
},
  "pyramid-descent-min-cost": {
  "problemId": "pyramid-descent-min-cost",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Fold the pyramid bottom-up into a 1D array via `dp[i] = pyramid[r][i] + min(dp[i], dp[i + 1])`.",
  "hints": [
    "Conceptual Intuition: Consider a Bottom-Up 1D Fold DP paradigm. Fold the pyramid bottom-up into a 1D array via `dp[i] = pyramid[r][i] + min(dp[i], dp[i + 1])`.",
    "Algorithmic Mechanics: Bottom-up eliminates all edge-index boundary checks. Copy bottom row into `dp`, fold upward to `dp[0]`.",
    "Edge Cases & Optimization: Copy the bottom row so the caller's input isn't mutated. Ensure time complexity is bounded to O(n^2) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bottom-Up 1D Fold DP",
  "approachSteps": [
    "Copy bottom row into `dp`, fold upward to `dp[0]`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Copy the bottom row so the caller's input isn't mutated."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_pyramid_descent(pyramid: list[list[int]]) -> int:\n    dp = list(pyramid[-1])\n    for r in range(len(pyramid) - 2, -1, -1):\n        for i in range(r + 1): dp[i] = pyramid[r][i] + min(dp[i], dp[i + 1])\n    return dp[0]\n"
  }
},
  "rna-folding-palindromic-subseq": {
  "problemId": "rna-folding-palindromic-subseq",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Compute the Longest Common Subsequence between `rna` and `rna[::-1]` using a 1D rolling row.",
  "hints": [
    "Conceptual Intuition: Consider a Reversed-LCS 1D DP paradigm. Compute the Longest Common Subsequence between `rna` and `rna[::-1]` using a 1D rolling row.",
    "Algorithmic Mechanics: `LPS(s) == LCS(s, reversed(s))`. Run rolling-row LCS on `(rna, rna[::-1])`.",
    "Edge Cases & Optimization: Subsequences can skip bases. Ensure time complexity is bounded to O(n^2) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Reversed-LCS 1D DP",
  "approachSteps": [
    "Run rolling-row LCS on `(rna, rna[::-1])`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Subsequences can skip bases."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def longest_rna_palindrome(rna: str) -> int:\n    n = len(rna); rev = rna[::-1]; prev = [0] * (n + 1)\n    for a in rna:\n        curr = [0] * (n + 1)\n        for j, b in enumerate(rev): curr[j + 1] = prev[j] + 1 if a == b else max(prev[j + 1], curr[j])\n        prev = curr\n    return prev[n]\n"
  }
},
  "log-pattern-distinct-matches": {
  "problemId": "log-pattern-distinct-matches",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain 1D `dp[j]` = ways to match `sig[:j]`, sweeping `j` backward from `len(sig)` down to `1` for every character in `stream`.",
  "hints": [
    "Conceptual Intuition: Consider a 1D Backward-Sweep Subsequence DP paradigm. Maintain 1D `dp[j]` = ways to match `sig[:j]`, sweeping `j` backward from `len(sig)` down to `1` for every character in `stream`.",
    "Algorithmic Mechanics: Backward sweep prevents reusing the same `stream` character. Seed `dp[0] = 1`; for `ch` in `stream`, for `j` down to `1`: if `ch == sig[j-1]`, `dp[j] += dp[j-1]`.",
    "Edge Cases & Optimization: Never sweep `j` forward. Ensure time complexity is bounded to O(m * n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "1D Backward-Sweep Subsequence DP",
  "approachSteps": [
    "Seed `dp[0] = 1`; for `ch` in `stream`, for `j` down to `1`: if `ch == sig[j-1]`, `dp[j] += dp[j-1]`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Never sweep `j` forward."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_subseq_matches(stream: str, sig: str) -> int:\n    n = len(sig); dp = [0] * (n + 1); dp[0] = 1\n    for ch in stream:\n        for j in range(n, 0, -1):\n            if ch == sig[j - 1]: dp[j] += dp[j - 1]\n    return dp[n]\n"
  }
},
  "dual-stream-interleave-verifier": {
  "problemId": "dual-stream-interleave-verifier",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Check `len(ch_a) + len(ch_b) == len(merged)`, then run 1D boolean DP tracking reachable `(i, j)` prefix pairs.",
  "hints": [
    "Conceptual Intuition: Consider a 1D Prefix Interleaving DP paradigm. Check `len(ch_a) + len(ch_b) == len(merged)`, then run 1D boolean DP tracking reachable `(i, j)` prefix pairs.",
    "Algorithmic Mechanics: `dp[j]` updates from `dp[j]` (taking from `ch_a`) or `dp[j - 1]` (taking from `ch_b`). Verify combined length, initialize row 0, transition rows `1.m`.",
    "Edge Cases & Optimization: Update `dp[0]` on each row before looping `j = 1.n`. Ensure time complexity is bounded to O(m * n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "1D Prefix Interleaving DP",
  "approachSteps": [
    "Verify combined length, initialize row 0, transition rows `1..m`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Update `dp[0]` on each row before looping `j = 1..n`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def is_valid_multiplex(ch_a: str, ch_b: str, merged: str) -> bool:\n    m, n = len(ch_a), len(ch_b)\n    if m + n != len(merged): return False\n    dp = [False] * (n + 1); dp[0] = True\n    for j in range(1, n + 1): dp[j] = dp[j - 1] and ch_b[j - 1] == merged[j - 1]\n    for i in range(1, m + 1):\n        dp[0] = dp[0] and ch_a[i - 1] == merged[i - 1]\n        for j in range(1, n + 1):\n            c = merged[i + j - 1]\n            dp[j] = (dp[j] and ch_a[i - 1] == c) or (dp[j - 1] and ch_b[j - 1] == c)\n    return dp[n]\n"
  }
},
  "wildcard-star-dot-matcher": {
  "problemId": "wildcard-star-dot-matcher",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Memoize `(i, j)` transitions; when `pattern[j + 1] == '*'`, either skip the `x*` pair (`j + 2`) or consume one matching char in `text` (`i + 1, j`).",
  "hints": [
    "Conceptual Intuition: Consider a Memoized Top-Down Regex DP paradigm. Memoize `(i, j)` transitions; when `pattern[j + 1] == '*'`, either skip the `x*` pair (`j + 2`) or consume one matching char in `text` (`i + 1, j`).",
    "Algorithmic Mechanics: `x*` may match zero occurrences. Use `@lru_cache` on `dp(i, j)` branching on `pattern[j + 1] == '*'`.",
    "Edge Cases & Optimization: Trailing `x*` can match empty `text`. Ensure time complexity is bounded to O(m * n) with O(m * n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Memoized Top-Down Regex DP",
  "approachSteps": [
    "Use `@lru_cache` on `dp(i, j)` branching on `pattern[j + 1] == '*'`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Trailing `x*` can match empty `text`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from functools import lru_cache\n\ndef match_firewall_rule(text: str, pattern: str) -> bool:\n    m, n = len(text), len(pattern)\n    @lru_cache(None)\n    def dp(i, j):\n        if j == n: return i == m\n        ok = i < m and (pattern[j] == text[i] or pattern[j] == '.')\n        if j + 1 < n and pattern[j + 1] == '*':\n            return dp(i, j + 2) or (ok and dp(i + 1, j))\n        return ok and dp(i + 1, j + 1)\n    return dp(0, 0)\n"
  }
},
  "balloon-demolition-max-payout": {
  "problemId": "balloon-demolition-max-payout",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Pad `vals` with `1` at both ends and run interval DP choosing which target `k` is cleared LAST inside open interval `(l, r)`.",
  "hints": [
    "Conceptual Intuition: Consider a Last-Cleared Interval DP paradigm. Pad `vals` with `1` at both ends and run interval DP choosing which target `k` is cleared LAST inside open interval `(l, r)`.",
    "Algorithmic Mechanics: Choosing the last cleared target decouples `(l, k)` and `(k, r)`. Fill `dp[l][r]` in increasing order of `r - l`.",
    "Edge Cases & Optimization: Iterate interval width `gap` in the outer loop. Ensure time complexity is bounded to O(n^3) with O(n^2) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Last-Cleared Interval DP",
  "approachSteps": [
    "Fill `dp[l][r]` in increasing order of `r - l`."
  ],
  "timeComplexity": "O(n^3)",
  "spaceComplexity": "O(n^2)",
  "pitfalls": [
    "Iterate interval width `gap` in the outer loop."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def max_clearance_score(vals: list[int]) -> int:\n    a = [1] + vals + [1]; m = len(a)\n    dp = [[0] * m for _ in range(m)]\n    for g in range(2, m):\n        for l in range(m - g):\n            r = l + g; p = a[l] * a[r]; best = 0\n            for k in range(l + 1, r):\n                v = dp[l][k] + dp[k][r] + p * a[k]\n                if v > best: best = v\n            dp[l][r] = best\n    return dp[0][m - 1]\n"
  }
},
  "bit-counter-range-popcounts": {
  "problemId": "bit-counter-range-popcounts",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Fill `ans[i] = ans[i >> 1] + (i & 1)` in O(n) total time.",
  "hints": [
    "Conceptual Intuition: Consider a Bit-Shift Linear DP paradigm. Fill `ans[i] = ans[i >> 1] + (i & 1)` in O(n) total time.",
    "Algorithmic Mechanics: Right-shifting by 1 drops only the least significant bit. Allocate `max_mask + 1` zeros and fill `1.max_mask`.",
    "Edge Cases & Optimization: Array length is `max_mask + 1`. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bit-Shift Linear DP",
  "approachSteps": [
    "Allocate `max_mask + 1` zeros and fill `1..max_mask`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Array length is `max_mask + 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def popcount_table(max_mask: int) -> list[int]:\n    ans = [0] * (max_mask + 1)\n    for i in range(1, max_mask + 1): ans[i] = ans[i >> 1] + (i & 1)\n    return ans\n"
  }
},
  "hamming-active-flags-count": {
  "problemId": "hamming-active-flags-count",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Clear the lowest set bit with `mask &= mask - 1` until zero, counting iterations.",
  "hints": [
    "Conceptual Intuition: Consider a Brian Kernighan Bit-Clear paradigm. Clear the lowest set bit with `mask &= mask - 1` until zero, counting iterations.",
    "Algorithmic Mechanics: Loops only once per `1` bit. While `mask`: `mask &= mask - 1; cnt += 1`.",
    "Edge Cases & Optimization: Handle `mask == 0` returning `0`. Ensure time complexity is bounded to O(k) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Brian Kernighan Bit-Clear",
  "approachSteps": [
    "While `mask`: `mask &= mask - 1; cnt += 1`."
  ],
  "timeComplexity": "O(k)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle `mask == 0` returning `0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_active_flags(mask: int) -> int:\n    c = 0\n    while mask: mask &= mask - 1; c += 1\n    return c\n"
  }
},
  "palindrome-chain-verifier": {
  "problemId": "palindrome-chain-verifier",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Compare mirrored positions from both ends (or reverse the second half of a linked list in-place).",
  "hints": [
    "Conceptual Intuition: Consider a Symmetric Two-End Comparison paradigm. Compare mirrored positions from both ends (or reverse the second half of a linked list in-place).",
    "Algorithmic Mechanics: Both odd and even lengths work identically. Compare `tags` against `tags[::-1]`.",
    "Edge Cases & Optimization: Single-element chains are symmetric. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Symmetric Two-End Comparison",
  "approachSteps": [
    "Compare `tags` against `tags[::-1]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Single-element chains are symmetric."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def is_symmetric_chain(tags: list[int]) -> bool:\n    return tags == tags[::-1]\n"
  }
},
  "chain-midpoint-suffix": {
  "problemId": "chain-midpoint-suffix",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Fast/slow pointer traversal lands `slow` at `len(stream) // 2`.",
  "hints": [
    "Conceptual Intuition: Consider a Fast-Slow Midpoint Locator paradigm. Fast/slow pointer traversal lands `slow` at `len(stream) // 2`.",
    "Algorithmic Mechanics: For even length `2k`, index `k` is the second middle. Return `stream[len(stream) // 2:]`.",
    "Edge Cases & Optimization: Handle 1-element streams. Ensure time complexity is bounded to O(n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Fast-Slow Midpoint Locator",
  "approachSteps": [
    "Return `stream[len(stream) // 2:]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Handle 1-element streams."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def midpoint_tail(stream: list[int]) -> list[int]:\n    return stream[len(stream) // 2:]\n"
  }
},
  "sorted-chain-deduplicator": {
  "problemId": "sorted-chain-deduplicator",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Emit an element only when `res` is empty or `res[-1] != x`.",
  "hints": [
    "Conceptual Intuition: Consider a Adjacent Duplicate Filter paradigm. Emit an element only when `res` is empty or `res[-1] != x`.",
    "Algorithmic Mechanics: Sorted order places all duplicates consecutively. Scan `keys` appending whenever value changes.",
    "Edge Cases & Optimization: Handle empty input cleanly. Ensure time complexity is bounded to O(n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Adjacent Duplicate Filter",
  "approachSteps": [
    "Scan `keys` appending whenever value changes."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Handle empty input cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def dedup_sorted_chain(keys: list[int]) -> list[int]:\n    out = []\n    for k in keys:\n        if not out or out[-1] != k: out.append(k)\n    return out\n"
  }
},
  "circular-playlist-right-shift": {
  "problemId": "circular-playlist-right-shift",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Guard empty `slides`, reduce `steps %= len(slides)`, and move the last `steps` entries to the front.",
  "hints": [
    "Conceptual Intuition: Consider a Modulo Tail-to-Head Rotation paradigm. Guard empty `slides`, reduce `steps %= len(slides)`, and move the last `steps` entries to the front.",
    "Algorithmic Mechanics: Avoid modulo by zero on empty lists. If empty return `[]`; compute `k = steps % n`; slice `slides[-k:] + slides[:-k]` if `k`.",
    "Edge Cases & Optimization: When `k == 0`, return a copy of `slides` unchanged. Ensure time complexity is bounded to O(n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Modulo Tail-to-Head Rotation",
  "approachSteps": [
    "If empty return `[]`; compute `k = steps % n`; slice `slides[-k:] + slides[:-k]` if `k`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "When `k == 0`, return a copy of `slides` unchanged."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def shift_carousel(slides: list[int], steps: int) -> list[int]:\n    if not slides: return []\n    k = steps % len(slides)\n    return slides[-k:] + slides[:-k] if k else list(slides)\n"
  }
},
  "chain-merge-sorter": {
  "problemId": "chain-merge-sorter",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Split `records` in half recursively and merge the two sorted halves linearly.",
  "hints": [
    "Conceptual Intuition: Consider a Top-Down Merge Sort paradigm. Split `records` in half recursively and merge the two sorted halves linearly.",
    "Algorithmic Mechanics: Base case: length `<= 1`. Recursively sort left/right halves and merge.",
    "Edge Cases & Optimization: Handle empty and single-element inputs. Ensure time complexity is bounded to O(n log n) with O(log n) stack auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Top-Down Merge Sort",
  "approachSteps": [
    "Recursively sort left/right halves and merge."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(log n) stack",
  "pitfalls": [
    "Handle empty and single-element inputs."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def merge_sort_records(records: list[int]) -> list[int]:\n    if len(records) <= 1: return list(records)\n    m = len(records) // 2\n    l, r = merge_sort_records(records[:m]), merge_sort_records(records[m:])\n    out, i, j = [], 0, 0\n    while i < len(l) and j < len(r):\n        if l[i] <= r[j]: out.append(l[i]); i += 1\n        else: out.append(r[j]); j += 1\n    out.extend(l[i:]); out.extend(r[j:])\n    return out\n"
  }
},
  "tree-preorder-chain-flatten": {
  "problemId": "tree-preorder-chain-flatten",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Rewire left subtrees onto `curr.right` using Morris pointer threading in O(1) auxiliary space.",
  "hints": [
    "Conceptual Intuition: Consider a Morris Preorder Flattening paradigm. Rewire left subtrees onto `curr.right` using Morris pointer threading in O(1) auxiliary space.",
    "Algorithmic Mechanics: Link `rightmost(curr.l).r = curr.r`, move `curr.l` to `curr.r`, and clear `curr.l = None`. Deserialize, Morris-flatten to right spine, collect values.",
    "Edge Cases & Optimization: Set `curr.l = None` after moving. Ensure time complexity is bounded to O(n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Morris Preorder Flattening",
  "approachSteps": [
    "Deserialize, Morris-flatten to right spine, collect values."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Set `curr.l = None` after moving."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef linearize_menu_tree(tree: list) -> list[int]:\n    if not tree or tree[0] is None: return []\n    root = Node(tree[0]); q = deque([root]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    cur = root\n    while cur:\n        if cur.l:\n            p = cur.l\n            while p.r: p = p.r\n            p.r = cur.r; cur.r = cur.l; cur.l = None\n        cur = cur.r\n    out, cur = [], root\n    while cur: out.append(cur.v); cur = cur.r\n    return out\n"
  }
},
  "tree-rebuild-pre-in-arrays": {
  "problemId": "tree-rebuild-pre-in-arrays",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Map `inorder` indices in a hash table, consume roots from `preorder`, and recursively build left `[l, mid - 1]` then right `[mid + 1, r]`.",
  "hints": [
    "Conceptual Intuition: Consider a Hash-Indexed Divide and Conquer paradigm. Map `inorder` indices in a hash table, consume roots from `preorder`, and recursively build left `[l, mid - 1]` then right `[mid + 1, r]`.",
    "Algorithmic Mechanics: Always build left subtree before right subtree so the preorder cursor stays synchronized. Build `idx` map, recurse `build(l, r)`, BFS-serialize and trim trailing `None`s.",
    "Edge Cases & Optimization: Trim trailing `None` entries in the level-order output. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Hash-Indexed Divide and Conquer",
  "approachSteps": [
    "Build `idx` map, recurse `build(l, r)`, BFS-serialize and trim trailing `None`s."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Trim trailing `None` entries in the level-order output."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v, l=None, r=None): self.v = v; self.l = l; self.r = r\n\ndef rebuild_binary_tree(preorder: list[int], inorder: list[int]) -> list:\n    idx = {v: i for i, v in enumerate(inorder)}; pi = 0\n    def build(l, r):\n        nonlocal pi\n        if l > r: return None\n        v = preorder[pi]; pi += 1; m = idx[v]\n        return Node(v, build(l, m - 1), build(m + 1, r))\n    root = build(0, len(inorder) - 1)\n    res, q = [], deque([root])\n    while q:\n        u = q.popleft()\n        if u: res.append(u.v); q.append(u.l); q.append(u.r)\n        else: res.append(None)\n    while res and res[-1] is None: res.pop()\n    return res\n"
  }
},
  "packet-payload-kmp-needle": {
  "problemId": "packet-payload-kmp-needle",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Build the KMP `lps` prefix table for `sig` and match against `payload` in linear O(n + m) time.",
  "hints": [
    "Conceptual Intuition: Consider a KMP Linear Substring Search paradigm. Build the KMP `lps` prefix table for `sig` and match against `payload` in linear O(n + m) time.",
    "Algorithmic Mechanics: On mismatch at `j > 0`, fall back to `lps[j - 1]`. Precompute `lps`, scan `payload` advancing/falling back `j`.",
    "Edge Cases & Optimization: Return `-1` if `len(sig) > len(payload)`. Ensure time complexity is bounded to O(n + m) with O(m) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "KMP Linear Substring Search",
  "approachSteps": [
    "Precompute `lps`, scan `payload` advancing/falling back `j`."
  ],
  "timeComplexity": "O(n + m)",
  "spaceComplexity": "O(m)",
  "pitfalls": [
    "Return `-1` if `len(sig) > len(payload)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_sig_offset(payload: str, sig: str) -> int:\n    n, m = len(payload), len(sig)\n    if m > n: return -1\n    lps = [0] * m; ln = 0; i = 1\n    while i < m:\n        if sig[i] == sig[ln]: ln += 1; lps[i] = ln; i += 1\n        elif ln: ln = lps[ln - 1]\n        else: i += 1\n    i = j = 0\n    while i < n:\n        if payload[i] == sig[j]:\n            i += 1; j += 1\n            if j == m: return i - m\n        elif j: j = lps[j - 1]\n        else: i += 1\n    return -1\n"
  }
},
  "dna-longest-mirror-segment": {
  "problemId": "dna-longest-mirror-segment",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Expand outward around every odd center `(i, i)` and even center `(i, i + 1)` in O(1) space.",
  "hints": [
    "Conceptual Intuition: Consider a Center Expansion Sweep paradigm. Expand outward around every odd center `(i, i)` and even center `(i, i + 1)` in O(1) space.",
    "Algorithmic Mechanics: Only update best bounds on strictly greater length `>` to preserve earliest tie. Expand from `(i, i)` and `(i, i + 1)` for all `i`, returning `seq[bl:br]`.",
    "Edge Cases & Optimization: Check both odd and even centers. Ensure time complexity is bounded to O(n^2) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Center Expansion Sweep",
  "approachSteps": [
    "Expand from `(i, i)` and `(i, i + 1)` for all `i`, returning `seq[bl:br]`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Check both odd and even centers."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def longest_mirror_segment(seq: str) -> str:\n    n = len(seq); bl = br = 0\n    for i in range(n):\n        for l, r in ((i, i), (i, i + 1)):\n            while l >= 0 and r < n and seq[l] == seq[r]: l -= 1; r += 1\n            if (r - (l + 1)) > (br - bl): bl, br = l + 1, r\n    return seq[bl:br]\n"
  }
},
  "motif-palindrome-counter": {
  "problemId": "motif-palindrome-counter",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Expand from every `(i, i)` and `(i, i + 1)` center, incrementing `total` on every valid expansion.",
  "hints": [
    "Conceptual Intuition: Consider a Center-Expansion Counter paradigm. Expand from every `(i, i)` and `(i, i + 1)` center, incrementing `total` on every valid expansion.",
    "Algorithmic Mechanics: Each matching pair `(l, r)` identifies a distinct palindromic substring. Sum expansions over all `2n - 1` centers.",
    "Edge Cases & Optimization: Include even centers `(i, i + 1)`. Ensure time complexity is bounded to O(n^2) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Center-Expansion Counter",
  "approachSteps": [
    "Sum expansions over all `2n - 1` centers."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Include even centers `(i, i + 1)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_mirror_segments(seq: str) -> int:\n    n = len(seq); tot = 0\n    for i in range(n):\n        for l, r in ((i, i), (i, i + 1)):\n            while l >= 0 and r < n and seq[l] == seq[r]: tot += 1; l -= 1; r += 1\n    return tot\n"
  }
},
  "log-phrase-word-reverser": {
  "problemId": "log-phrase-word-reverser",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Tokenize ignoring arbitrary whitespace, reverse the token list, and join with a single space.",
  "hints": [
    "Conceptual Intuition: Consider a Whitespace Tokenization & Reversal paradigm. Tokenize ignoring arbitrary whitespace, reverse the token list, and join with a single space.",
    "Algorithmic Mechanics: `line.split()` automatically collapses repeated spaces and strips outer whitespace. Return `' '.join(reversed(line.split()))`.",
    "Edge Cases & Optimization: Avoid `split(' ')` which leaves empty strings between multiple spaces. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Whitespace Tokenization & Reversal",
  "approachSteps": [
    "Return `' '.join(reversed(line.split()))`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Avoid `split(' ')` which leaves empty strings between multiple spaces."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def reverse_command_tokens(line: str) -> str:\n    return \" \".join(reversed(line.split()))\n"
  }
},
  "legacy-form-int32-parser": {
  "problemId": "legacy-form-int32-parser",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Advance a cursor past `' '`, parse at most one sign, accumulate digits, and clamp to `[-2^31, 2^31 - 1]`.",
  "hints": [
    "Conceptual Intuition: Consider a Sequential Cursor Parser paradigm. Advance a cursor past `' '`, parse at most one sign, accumulate digits, and clamp to `[-2^31, 2^31 - 1]`.",
    "Algorithmic Mechanics: Return `0` if the first non-space/non-sign character is not a digit. Skip spaces, read sign, accumulate digits, clamp.",
    "Edge Cases & Optimization: Handle empty strings cleanly. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Sequential Cursor Parser",
  "approachSteps": [
    "Skip spaces, read sign, accumulate digits, clamp."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle empty strings cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def parse_clamped_int32(raw: str) -> int:\n    i, n = 0, len(raw)\n    while i < n and raw[i] == ' ': i += 1\n    sign = 1\n    if i < n and raw[i] in ('+', '-'):\n        if raw[i] == '-': sign = -1\n        i += 1\n    v = 0\n    while i < n and raw[i].isdigit(): v = v * 10 + (ord(raw[i]) - 48); i += 1\n    return max(-2**31, min(2**31 - 1, sign * v))\n"
  }
},
  "rail-fence-cipher-encoder": {
  "problemId": "rail-fence-cipher-encoder",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Bounce a row index `r` between `0` and `rails - 1`, appending each character to `rows[r]`, then concatenate all rows.",
  "hints": [
    "Conceptual Intuition: Consider a Row-Bucket Bounce Simulation paradigm. Bounce a row index `r` between `0` and `rails - 1`, appending each character to `rows[r]`, then concatenate all rows.",
    "Algorithmic Mechanics: Return `text` directly if `rails == 1` or `rails >= len(text)`. Flip `step` at `r == 0` and `r == rails - 1`, join all buckets.",
    "Edge Cases & Optimization: Handle `rails == 1` upfront. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Row-Bucket Bounce Simulation",
  "approachSteps": [
    "Flip `step` at `r == 0` and `r == rails - 1`, join all buckets."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Handle `rails == 1` upfront."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def encode_rail_fence(text: str, rails: int) -> str:\n    if rails == 1 or rails >= len(text): return text\n    rows = [[] for _ in range(rails)]; r, step = 0, 1\n    for ch in text:\n        rows[r].append(ch)\n        if r == 0: step = 1\n        elif r == rails - 1: step = -1\n        r += step\n    return \"\".join(\"\".join(row) for row in rows)\n"
  }
},
  "metric-next-higher-lookup": {
  "problemId": "metric-next-higher-lookup",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Precompute next-greater values for `series` using a decreasing monotonic stack and hash map, then look up each query in O(1).",
  "hints": [
    "Conceptual Intuition: Consider a Monotonic Stack + Hash Lookup paradigm. Precompute next-greater values for `series` using a decreasing monotonic stack and hash map, then look up each query in O(1).",
    "Algorithmic Mechanics: Default unmapped keys to `-1`. Scan `series` populating `nxt`, return `[nxt.get(q, -1) for q in queries]`.",
    "Edge Cases & Optimization: Values are distinct so value-keyed lookup is exact. Ensure time complexity is bounded to O(n + m) with O(m) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Monotonic Stack + Hash Lookup",
  "approachSteps": [
    "Scan `series` populating `nxt`, return `[nxt.get(q, -1) for q in queries]`."
  ],
  "timeComplexity": "O(n + m)",
  "spaceComplexity": "O(m)",
  "pitfalls": [
    "Values are distinct so value-keyed lookup is exact."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def next_higher_metrics(queries: list[int], series: list[int]) -> list[int]:\n    nxt, st = {}, []\n    for x in series:\n        while st and st[-1] < x: nxt[st.pop()] = x\n        st.append(x)\n    return [nxt.get(q, -1) for q in queries]\n"
  }
},
  "telemetry-min-tracker-stack": {
  "problemId": "telemetry-min-tracker-stack",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Store `(value, min_so_far)` pairs on each push so `min` and `peek` both read `stack[-1]` in O(1).",
  "hints": [
    "Conceptual Intuition: Consider a Paired Value-Min Stack paradigm. Store `(value, min_so_far)` pairs on each push so `min` and `peek` both read `stack[-1]` in O(1).",
    "Algorithmic Mechanics: Paired tuples handle duplicate minimums automatically. Push `(x, min(x, st[-1][1]))`, pop on `pop`, read `[0]`/`[1]` on `peek`/`min`.",
    "Edge Cases & Optimization: Handle empty stack on the first push. Ensure time complexity is bounded to O(1) per op with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Paired Value-Min Stack",
  "approachSteps": [
    "Push `(x, min(x, st[-1][1]))`, pop on `pop`, read `[0]`/`[1]` on `peek`/`min`."
  ],
  "timeComplexity": "O(1) per op",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Handle empty stack on the first push."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def run_min_buffer(cmds: list[list]) -> list[int]:\n    st, out = [], []\n    for c in cmds:\n        if c[0] == 'push': st.append((c[1], c[1] if not st else min(c[1], st[-1][1])))\n        elif c[0] == 'pop': st.pop()\n        elif c[0] == 'peek': out.append(st[-1][0])\n        elif c[0] == 'min': out.append(st[-1][1])\n    return out\n"
  }
},
  "syntax-longest-balanced-span": {
  "problemId": "syntax-longest-balanced-span",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Keep a boundary-index stack seeded with `[-1]`; pop on `')'` and measure `i - stack[-1]` (pushing `i` if empty).",
  "hints": [
    "Conceptual Intuition: Consider a Boundary-Index Stack paradigm. Keep a boundary-index stack seeded with `[-1]`; pop on `')'` and measure `i - stack[-1]` (pushing `i` if empty).",
    "Algorithmic Mechanics: The bottom of the stack always holds the last unmatched boundary index. Seed `st = [-1]`; push `'('` indices; on `')'`, pop, push `i` if empty else maximize `i - st[-1]`.",
    "Edge Cases & Optimization: Re-seed `st.append(i)` whenever popping empties the stack. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Boundary-Index Stack",
  "approachSteps": [
    "Seed `st = [-1]`; push `'('` indices; on `')'`, pop, push `i` if empty else maximize `i - st[-1]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Re-seed `st.append(i)` whenever popping empties the stack."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def longest_balanced_span(tokens: str) -> int:\n    st, best = [-1], 0\n    for i, ch in enumerate(tokens):\n        if ch == '(': st.append(i)\n        else:\n            st.pop()\n            if not st: st.append(i)\n            elif i - st[-1] > best: best = i - st[-1]\n    return best\n"
  }
},
  "sorted-log-event-span-bounds": {
  "problemId": "sorted-log-event-span-bounds",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use `bisect_left` for the first index and `bisect_right - 1` for the last index.",
  "hints": [
    "Conceptual Intuition: Consider a Dual Lower/Upper Binary Search paradigm. Use `bisect_left` for the first index and `bisect_right - 1` for the last index.",
    "Algorithmic Mechanics: Verify `l < len(keys) and keys[l] == target`. Find `l = bisect_left`, check presence, return `[l, bisect_right - 1]`.",
    "Edge Cases & Optimization: Guard empty `keys`. Ensure time complexity is bounded to O(log n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Dual Lower/Upper Binary Search",
  "approachSteps": [
    "Find `l = bisect_left`, check presence, return `[l, bisect_right - 1]`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Guard empty `keys`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import bisect\n\ndef find_key_span(keys: list[int], target: int) -> list[int]:\n    l = bisect.bisect_left(keys, target)\n    if l == len(keys) or keys[l] != target: return [-1, -1]\n    return [l, bisect.bisect_right(keys, target) - 1]\n"
  }
},
  "telemetry-top-k-error-codes": {
  "problemId": "telemetry-top-k-error-codes",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Count frequencies and place codes into buckets indexed `1..n`, scanning downward until `k` codes are collected.",
  "hints": [
    "Conceptual Intuition: Consider a Frequency Bucket Sort paradigm. Count frequencies and place codes into buckets indexed `1.n`, scanning downward until `k` codes are collected.",
    "Algorithmic Mechanics: Bucket sort achieves O(n) without O(n log n) sorting. Count with `Counter`, bucket by frequency, collect top `k` from highest bucket down.",
    "Edge Cases & Optimization: Allocate `len(codes) + 1` buckets. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Frequency Bucket Sort",
  "approachSteps": [
    "Count with `Counter`, bucket by frequency, collect top `k` from highest bucket down."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Allocate `len(codes) + 1` buckets."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import Counter\n\ndef top_k_errors(codes: list[int], k: int) -> list[int]:\n    b = [[] for _ in range(len(codes) + 1)]\n    for code, f in Counter(codes).items(): b[f].append(code)\n    out = []\n    for f in range(len(b) - 1, 0, -1):\n        for c in b[f]:\n            out.append(c)\n            if len(out) == k: return out\n    return out\n"
  }
},
  "consensus-quorum-leader-vote": {
  "problemId": "consensus-quorum-leader-vote",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use Boyer-Moore majority voting: cancel opposing ballots in pairs so only the strict majority survives.",
  "hints": [
    "Conceptual Intuition: Consider a Boyer-Moore Voting paradigm. Use Boyer-Moore majority voting: cancel opposing ballots in pairs so only the strict majority survives.",
    "Algorithmic Mechanics: Reset `cand = b` whenever `votes == 0`. Track `cand, votes`; increment on match else decrement.",
    "Edge Cases & Optimization: Guaranteed existence avoids needing a second verification pass. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Boyer-Moore Voting",
  "approachSteps": [
    "Track `cand, votes`; increment on match else decrement."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Guaranteed existence avoids needing a second verification pass."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def quorum_leader(ballots: list[int]) -> int:\n    cand = votes = 0\n    for b in ballots:\n        if votes == 0: cand = b\n        votes += 1 if b == cand else -1\n    return cand\n"
  }
},
  "shift-roster-inplace-rotation": {
  "problemId": "shift-roster-inplace-rotation",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Reduce `k = shifts % n`, reverse the entire array, reverse `[0..k-1]`, and reverse `[k..n-1]`.",
  "hints": [
    "Conceptual Intuition: Consider a Three-Reversal In-Place Shift paradigm. Reduce `k = shifts % n`, reverse the entire array, reverse `[0.k-1]`, and reverse `[k.n-1]`.",
    "Algorithmic Mechanics: Three in-place reversals run in O(n) time and O(1) space. Normalize `k %= n`; reverse all, reverse prefix `k`, reverse suffix `n - k`.",
    "Edge Cases & Optimization: Always take `shifts % len(roster)` first. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Three-Reversal In-Place Shift",
  "approachSteps": [
    "Normalize `k %= n`; reverse all, reverse prefix `k`, reverse suffix `n - k`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Always take `shifts % len(roster)` first."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def rotate_roster(roster: list[int], shifts: int) -> list[int]:\n    n = len(roster); k = shifts % n\n    def rev(l, r):\n        while l < r: roster[l], roster[r] = roster[r], roster[l]; l += 1; r -= 1\n    rev(0, n - 1); rev(0, k - 1); rev(k, n - 1)\n    return roster\n"
  }
},
  "sorted-catalog-pair-budget": {
  "problemId": "sorted-catalog-pair-budget",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Converge `l` and `r` from both ends: move `l` right if sum `< budget`, `r` left if `> budget`, returning `[l + 1, r + 1]` on match.",
  "hints": [
    "Conceptual Intuition: Consider a Opposite-End Two Pointers paradigm. Converge `l` and `r` from both ends: move `l` right if sum `< budget`, `r` left if `> budget`, returning `[l + 1, r + 1]` on match.",
    "Algorithmic Mechanics: Remember to add 1 to both indices. Loop `l < r` adjusting pointers toward `budget`.",
    "Edge Cases & Optimization: Return 1-based indices. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Opposite-End Two Pointers",
  "approachSteps": [
    "Loop `l < r` adjusting pointers toward `budget`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Return 1-based indices."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def sorted_pair_budget(prices: list[int], budget: int) -> list[int]:\n    l, r = 0, len(prices) - 1\n    while l < r:\n        s = prices[l] + prices[r]\n        if s == budget: return [l + 1, r + 1]\n        if s < budget: l += 1\n        else: r -= 1\n    return []\n"
  }
},
  "telemetry-uniform-patch-window": {
  "problemId": "telemetry-uniform-patch-window",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Expand a sliding window tracking `max_freq`; shrink `l` whenever `(r - l + 1) - max_freq > edits`.",
  "hints": [
    "Conceptual Intuition: Consider a Monotonic Frequency Sliding Window paradigm. Expand a sliding window tracking `max_freq`; shrink `l` whenever `(r - l + 1) - max_freq > edits`.",
    "Algorithmic Mechanics: `max_freq` never needs to be recomputed downward. Count window letters, update `max_freq`, shrink while replacements needed `> edits`.",
    "Edge Cases & Optimization: Decrement `counts[states[l]]` before incrementing `l`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Monotonic Frequency Sliding Window",
  "approachSteps": [
    "Count window letters, update `max_freq`, shrink while replacements needed `> edits`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Decrement `counts[states[l]]` before incrementing `l`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict\n\ndef longest_uniform_states(states: str, edits: int) -> int:\n    cnt = defaultdict(int); l = mf = best = 0\n    for r, ch in enumerate(states):\n        cnt[ch] += 1\n        if cnt[ch] > mf: mf = cnt[ch]\n        while (r - l + 1) - mf > edits: cnt[states[l]] -= 1; l += 1\n        if r - l + 1 > best: best = r - l + 1\n    return best\n"
  }
},
  "ledger-infix-precedence-eval": {
  "problemId": "ledger-infix-precedence-eval",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Stack additive terms; apply `'*'` and `'/'` immediately against `stack[-1]` using `int(a / b)`, and return `sum(stack)`.",
  "hints": [
    "Conceptual Intuition: Consider a Term-Stack Precedence Evaluator paradigm. Stack additive terms; apply `'*'` and `'/'` immediately against `stack[-1]` using `int(a / b)`, and return `sum(stack)`.",
    "Algorithmic Mechanics: Append a sentinel `'+'` to flush the final number. Track previous `op` and `num`, apply `op` on each new operator, sum stack.",
    "Edge Cases & Optimization: Use `int(st.pop() / num)` for zero-truncated division. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Term-Stack Precedence Evaluator",
  "approachSteps": [
    "Track previous `op` and `num`, apply `op` on each new operator, sum stack."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Use `int(st.pop() / num)` for zero-truncated division."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def eval_billing_expr(expr: str) -> int:\n    st, num, op = [], 0, '+'\n    for ch in expr + '+':\n        if ch.isdigit(): num = num * 10 + int(ch)\n        elif ch in '+-*/':\n            if op == '+': st.append(num)\n            elif op == '-': st.append(-num)\n            elif op == '*': st.append(st.pop() * num)\n            else: st.append(int(st.pop() / num))\n            op, num = ch, 0\n    return sum(st)\n"
  }
},
  "pigeonhole-duplicate-badge-finder": {
  "problemId": "pigeonhole-duplicate-badge-finder",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Treat `i -> badges[i]` as a functional graph and locate the cycle entry point using Floyd's two-phase Tortoise and Hare algorithm.",
  "hints": [
    "Conceptual Intuition: Consider a Floyd Cycle Entry Detection paradigm. Treat `i -> badges[i]` as a functional graph and locate the cycle entry point using Floyd's two-phase Tortoise and Hare algorithm.",
    "Algorithmic Mechanics: Phase 1 meets inside the cycle; Phase 2 resets `slow = 0` and steps both by 1. Step `s = b[s]`, `f = b[b[f]]` until equal; reset `s = 0` and step both by 1 until equal.",
    "Edge Cases & Optimization: Advance before comparing in Phase 1 since both start at `0`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Floyd Cycle Entry Detection",
  "approachSteps": [
    "Step `s = b[s]`, `f = b[b[f]]` until equal; reset `s = 0` and step both by 1 until equal."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Advance before comparing in Phase 1 since both start at `0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_duplicate_badge(badges: list[int]) -> int:\n    s = f = 0\n    while True:\n        s = badges[s]; f = badges[badges[f]]\n        if s == f: break\n    s = 0\n    while s != f: s = badges[s]; f = badges[f]\n    return s\n"
  }
},
  "audit-queue-drop-nth-tail": {
  "problemId": "audit-queue-drop-nth-tail",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain an `n`-node gap between `fast` and `slow` starting from a dummy node so `slow` lands right before the node to unlink.",
  "hints": [
    "Conceptual Intuition: Consider a Fixed-Gap Two-Pointer Unlink paradigm. Maintain an `n`-node gap between `fast` and `slow` starting from a dummy node so `slow` lands right before the node to unlink.",
    "Algorithmic Mechanics: A dummy head handles removing the very first item cleanly. Remove index `len(items) - n` via dummy-headed two pointers.",
    "Edge Cases & Optimization: `n` is 1-indexed from the tail. Ensure time complexity is bounded to O(L) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Fixed-Gap Two-Pointer Unlink",
  "approachSteps": [
    "Remove index `len(items) - n` via dummy-headed two pointers."
  ],
  "timeComplexity": "O(L)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "`n` is 1-indexed from the tail."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def drop_nth_from_tail(items: list[int], n: int) -> list[int]:\n    idx = len(items) - n\n    return items[:idx] + items[idx + 1:]\n"
  }
},
  "deck-alternating-end-interleave": {
  "problemId": "deck-alternating-end-interleave",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Converge `l` and `r` from both ends emitting `buf[l]` and (when `l != r`) `buf[r]`.",
  "hints": [
    "Conceptual Intuition: Consider a Converging End-to-End Interleave paradigm. Converge `l` and `r` from both ends emitting `buf[l]` and (when `l != r`) `buf[r]`.",
    "Algorithmic Mechanics: In a linked list, split at midpoint, reverse second half, and merge alternately. While `l <= r`, emit `buf[l]`, then `buf[r]` if `l != r`.",
    "Edge Cases & Optimization: Avoid duplicating the middle element when `l == r`. Ensure time complexity is bounded to O(n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Converging End-to-End Interleave",
  "approachSteps": [
    "While `l <= r`, emit `buf[l]`, then `buf[r]` if `l != r`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Avoid duplicating the middle element when `l == r`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def interleave_front_back(buf: list[int]) -> list[int]:\n    l, r, out = 0, len(buf) - 1, []\n    while l <= r:\n        out.append(buf[l])\n        if l != r: out.append(buf[r])\n        l += 1; r -= 1\n    return out\n"
  }
},
  "skyline-bar-max-billboard": {
  "problemId": "skyline-bar-max-billboard",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain an increasing monotonic stack of indices with a trailing `0` sentinel; pop taller bars and compute each popped bar's maximum spanning width.",
  "hints": [
    "Conceptual Intuition: Consider a Monotonic Increasing Stack with Sentinel paradigm. Maintain an increasing monotonic stack of indices with a trailing `0` sentinel; pop taller bars and compute each popped bar's maximum spanning width.",
    "Algorithmic Mechanics: When the stack empties after a pop, width spans all the way to index `0` (`width = i`). Iterate `heights + [0]`, pop while `heights[st[-1]] > h`, maximize `height * width`.",
    "Edge Cases & Optimization: Append trailing `0` to flush all bars remaining on the stack. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Monotonic Increasing Stack with Sentinel",
  "approachSteps": [
    "Iterate `heights + [0]`, pop while `heights[st[-1]] > h`, maximize `height * width`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Append trailing `0` to flush all bars remaining on the stack."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def max_billboard_area(heights: list[int]) -> int:\n    st, best = [], 0\n    for i, h in enumerate(heights + [0]):\n        while st and heights[st[-1]] > h:\n            ht = heights[st.pop()]\n            wd = i if not st else i - st[-1] - 1\n            if ht * wd > best: best = ht * wd\n        st.append(i)\n    return best\n"
  }
},
  "warehouse-aisle-pair-budget": {
  "problemId": "warehouse-aisle-pair-budget",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Record each seen pallet weight's bay index in a hash table so every new bay checks for `pod_limit - weight` in O(1) time.",
  "hints": [
    "Checking every pair of bays takes O(n^2) time.",
    "For bay `i`, you only need to know whether `pod_limit - pallets[i]` was seen earlier.",
    "Check the map before inserting the current bay so a pallet is never paired with itself."
  ],
  "approachTitle": "Single-Pass Complement Lookup",
  "approachSteps": [
    "Initialize empty dictionary `bay_by_weight`.",
    "For each `i, w` in `enumerate(pallets)`, check if `pod_limit - w` is in `bay_by_weight`.",
    "If found, return `[bay_by_weight[pod_limit - w], i]`; else store `bay_by_weight[w] = i`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Inserting before checking allows reusing the same bay when `2 * w == pod_limit`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_pallet_pair(pallets: list[int], pod_limit: int) -> list[int]:\n    seen = {}\n    for i, w in enumerate(pallets):\n        need = pod_limit - w\n        if need in seen:\n            return [seen[need], i]\n        seen[w] = i\n    return []\n"
  }
},
  "solar-grid-peak-surplus": {
  "problemId": "solar-grid-peak-surplus",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain the best contiguous surplus ending at the current hour (`max(x, curr + x)`) and track the global peak.",
  "hints": [
    "A negative running prefix can only reduce future sums, so reset to the current hour.",
    "Initialize both `curr` and `best` to `net_kw[0]`.",
    "Boundary edge cases & complexity: Do not initialize `best = 0` when all hours can be negative. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Running Best-Window Scan",
  "approachSteps": [
    "Set `curr = best = net_kw[0]`.",
    "For each `x` in `net_kw[1:]`, set `curr = max(x, curr + x)` and `best = max(best, curr)`.",
    "Return `best`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Do not initialize `best = 0` when all hours can be negative."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def peak_net_surplus(net_kw: list[int]) -> int:\n    curr = best = net_kw[0]\n    for x in net_kw[1:]:\n        curr = max(x, curr + x)\n        if curr > best:\n            best = curr\n    return best\n"
  }
},
  "courier-parcel-balance-point": {
  "problemId": "courier-parcel-balance-point",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Precompute `total = sum(loads)` and scan left-to-right maintaining `left_sum`; index `i` is balanced iff `left_sum == total - left_sum - loads[i]`.",
  "hints": [
    "Right sum at index `i` is `total - left_sum - loads[i]`.",
    "Check before adding `loads[i]` to `left_sum`.",
    "Boundary edge cases & complexity: Index 0 has `left_sum = 0`, which can match if the remaining suffix sums to 0. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Total-Sum Running Prefix Check",
  "approachSteps": [
    "Compute `total = sum(loads)` and `left = 0`.",
    "For `i, w` in `enumerate(loads)`: if `left == total - left - w`, return `i`; else `left += w`.",
    "Return `-1`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Index 0 has `left_sum = 0`, which can match if the remaining suffix sums to 0."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_balance_pivot(loads: list[int]) -> int:\n    total = sum(loads)\n    left = 0\n    for i, w in enumerate(loads):\n        if left == total - left - w:\n            return i\n        left += w\n    return -1\n"
  }
},
  "telemetry-duplicate-sensor-window": {
  "problemId": "telemetry-duplicate-sensor-window",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a sliding hash set of at most `max_gap` previous readings; if the incoming reading is already in the set, return `True`.",
  "hints": [
    "Evict `readings[i - max_gap]` once the window exceeds `max_gap`.",
    "Alternatively store the last seen index of each value in a hash map.",
    "Boundary edge cases & complexity: Handle `max_gap == 0` where no two distinct indices can satisfy `|i - j| <= 0`. Verify your solution strictly meets O(n) time and O(min(n, max_gap)) space limits."
  ],
  "approachTitle": "Bounded-Window Hash Set",
  "approachSteps": [
    "Initialize empty set `win`.",
    "For `i, val` in `enumerate(readings)`: if `val in win`, return `True`; add `val`; if `len(win) > max_gap`, remove `readings[i - max_gap]`.",
    "Return `False`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(min(n, max_gap))",
  "pitfalls": [
    "Handle `max_gap == 0` where no two distinct indices can satisfy `|i - j| <= 0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def has_nearby_repeat(readings: list[int], max_gap: int) -> bool:\n    win = set()\n    for i, val in enumerate(readings):\n        if val in win:\n            return True\n        win.add(val)\n        if len(win) > max_gap:\n            win.remove(readings[i - max_gap])\n    return False\n"
  }
},
  "retail-shelf-sku-consolidation": {
  "problemId": "retail-shelf-sku-consolidation",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a `write` pointer for the next active SKU slot and swap each non-zero SKU into `slots[write]`.",
  "hints": [
    "Swapping `slots[write]` and `slots[read]` preserves relative order of non-zeros.",
    "Advance `write` only on non-zero entries.",
    "Boundary edge cases & complexity: Never sort the array, as SKUs must keep their original shelf order. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "In-Place Stable Compaction",
  "approachSteps": [
    "Set `w = 0`.",
    "For `r` from `0` to `len(slots) - 1`: if `slots[r] != 0`, swap `slots[w], slots[r]` and `w += 1`.",
    "Return `slots`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Never sort the array, as SKUs must keep their original shelf order."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def compact_shelf(slots: list[int]) -> list[int]:\n    w = 0\n    for r in range(len(slots)):\n        if slots[r] != 0:\n            slots[w], slots[r] = slots[r], slots[w]\n            w += 1\n    return slots\n"
  }
},
  "cloud-billing-spike-window": {
  "problemId": "cloud-billing-spike-window",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Slide a window across `uptime` maintaining at most `budget` error minutes (`0`s), shrinking from the left whenever errors exceed `budget`.",
  "hints": [
    "Track `errors` inside `[l.r]`.",
    "Advance `l` while `errors > budget`.",
    "Boundary edge cases & complexity: Handle `budget == 0` cleanly. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Error-Budget Sliding Window",
  "approachSteps": [
    "Initialize `l = errors = best = 0`.",
    "Expand `r`: increment `errors` if `uptime[r] == 0`.",
    "While `errors > budget`, decrement `errors` if `uptime[l] == 0` and increment `l`.",
    "Maximize `r - l + 1`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle `budget == 0` cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def longest_sla_stretch(uptime: list[int], budget: int) -> int:\n    l = errs = best = 0\n    for r, v in enumerate(uptime):\n        if v == 0:\n            errs += 1\n        while errs > budget:\n            if uptime[l] == 0:\n                errs -= 1\n            l += 1\n        if r - l + 1 > best:\n            best = r - l + 1\n    return best\n"
  }
},
  "ride-share-fare-triplet-match": {
  "problemId": "ride-share-fare-triplet-match",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort `deltas`, fix each distinct first element, and use converging two pointers skipping duplicate values to collect all unique zero-sum triplets.",
  "hints": [
    "Stop outer loop as soon as `deltas[i] > 0`.",
    "Skip duplicate values for `i`, `l`, and `r`.",
    "Boundary edge cases & complexity: Deduplicating only the outer index still emits duplicate pairs from `(l, r)`. Verify your solution strictly meets O(n^2) time and O(1) auxiliary space limits."
  ],
  "approachTitle": "Sorted Anchor + Two Pointers",
  "approachSteps": [
    "Sort `deltas`.",
    "For each unique `i`, search `[i+1, n-1]` with two pointers for `-deltas[i]`.",
    "Advance past duplicates after every recorded triplet."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Deduplicating only the outer index still emits duplicate pairs from `(l, r)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def zero_net_triplets(deltas: list[int]) -> list[list[int]]:\n    arr = sorted(deltas)\n    n = len(arr)\n    res = []\n    for i in range(n - 2):\n        if arr[i] > 0:\n            break\n        if i > 0 and arr[i] == arr[i - 1]:\n            continue\n        l, r = i + 1, n - 1\n        while l < r:\n            s = arr[i] + arr[l] + arr[r]\n            if s == 0:\n                res.append([arr[i], arr[l], arr[r]])\n                l += 1; r -= 1\n                while l < r and arr[l] == arr[l - 1]: l += 1\n                while l < r and arr[r] == arr[r + 1]: r -= 1\n            elif s < 0:\n                l += 1\n            else:\n                r -= 1\n    return res\n"
  }
},
  "factory-conveyor-batch-rebalance": {
  "problemId": "factory-conveyor-batch-rebalance",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track running prefix sums in a frequency map seeded with `{0: 1}` and add `freq[prefix - quota]` at every hour.",
  "hints": [
    "Negative rework values prevent using a sliding window.",
    "Query `freq[curr - quota]` before incrementing `freq[curr]`.",
    "Boundary edge cases & complexity: Always seed `{0: 1}` so intervals starting at hour 0 are counted. Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Prefix-Sum Frequency Map",
  "approachSteps": [
    "Initialize `freq = {0: 1}`, `curr = 0`, `ans = 0`.",
    "For each `x`, set `curr += x`, `ans += freq.get(curr - quota, 0)`, and `freq[curr] = freq.get(curr, 0) + 1`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Always seed `{0: 1}` so intervals starting at hour 0 are counted."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_quota_runs(hourly_net: list[int], quota: int) -> int:\n    freq = {0: 1}\n    curr = ans = 0\n    for x in hourly_net:\n        curr += x\n        ans += freq.get(curr - quota, 0)\n        freq[curr] = freq.get(curr, 0) + 1\n    return ans\n"
  }
},
  "trading-desk-drawdown-recovery": {
  "problemId": "trading-desk-drawdown-recovery",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track the lowest historical quote `low` seen so far and maximize `quote - low` in one linear pass.",
  "hints": [
    "You must enter before exiting.",
    "Keep a running minimum quote.",
    "Boundary edge cases & complexity: Return `0` rather than a negative spread when prices only decline. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "One-Pass Running Low Tracker",
  "approachSteps": [
    "Initialize `low = quotes[0]`, `best = 0`.",
    "For each `q` in `quotes[1:]`, update `low = min(low, q)` and `best = max(best, q - low)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Return `0` rather than a negative spread when prices only decline."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def max_contract_spread(quotes: list[int]) -> int:\n    low = quotes[0]\n    best = 0\n    for q in quotes[1:]:\n        if q < low:\n            low = q\n        elif q - low > best:\n            best = q - low\n    return best\n"
  }
},
  "cdn-bandwidth-burst-quota": {
  "problemId": "cdn-bandwidth-burst-quota",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Because all payloads are positive, expand the right end until `curr >= quota`, then shrink the left end as far as possible while updating the minimal length.",
  "hints": [
    "Positive payloads guarantee monotonicity of window sums.",
    "Return `0` if `best` was never updated.",
    "Boundary edge cases & complexity: Return `0`, not `inf`, when no window meets `quota`. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "Shrinking-Threshold Sliding Window",
  "approachSteps": [
    "Initialize `l = curr = 0`, `best = inf`.",
    "Expand `r`, adding `payloads[r]`; while `curr >= quota`, minimize `r - l + 1`, subtract `payloads[l]`, and increment `l`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Return `0`, not `inf`, when no window meets `quota`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def shortest_burst(quota: int, payloads: list[int]) -> int:\n    l = curr = 0\n    best = float('inf')\n    for r, p in enumerate(payloads):\n        curr += p\n        while curr >= quota:\n            if r - l + 1 < best:\n                best = r - l + 1\n            curr -= payloads[l]\n            l += 1\n    return 0 if best == float('inf') else best\n"
  }
},
  "cold-chain-sensor-drift-range": {
  "problemId": "cold-chain-sensor-drift-range",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a decreasing monotonic deque of indices so `temps[dq[0]]` is always the current window's peak in O(1) amortized time.",
  "hints": [
    "Discard older indices whose temperature is `<=` the incoming reading.",
    "Expire `dq[0]` when `dq[0] <= i - window`.",
    "Boundary edge cases & complexity: Store indices, not temperatures, so expiration checks are exact. Verify your solution strictly meets O(n) time and O(window) space limits."
  ],
  "approachTitle": "Monotonic Decreasing Index Deque",
  "approachSteps": [
    "Initialize `dq = deque()` and `res = []`.",
    "Pop back while `temps[dq[-1]] <= t`, append `i`, pop front if `dq[0] <= i - window`.",
    "Emit `temps[dq[0]]` once `i >= window - 1`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(window)",
  "pitfalls": [
    "Store indices, not temperatures, so expiration checks are exact."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef rolling_peak_temps(temps: list[int], window: int) -> list[int]:\n    dq, res = deque(), []\n    for i, t in enumerate(temps):\n        while dq and temps[dq[-1]] <= t:\n            dq.pop()\n        dq.append(i)\n        if dq[0] <= i - window:\n            dq.popleft()\n        if i >= window - 1:\n            res.append(temps[dq[0]])\n    return res\n"
  }
},
  "fleet-fuel-tank-equalization": {
  "problemId": "fleet-fuel-tank-equalization",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Map `1 -> +1` and `0 -> -1` and record the earliest index of each cumulative elevation balance in a hash map.",
  "hints": [
    "Equal net elevation at indices `a` and `b` implies equal uphill and downhill segments between `a + 1` and `b`.",
    "Seed `{0: -1}` before index 0.",
    "Boundary edge cases & complexity: Never overwrite the earliest recorded index for a balance value. Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Earliest-Balance Hash Map",
  "approachSteps": [
    "Initialize `first = {0: -1}`, `bal = 0`, `best = 0`.",
    "Add `+1` for `1` and `-1` for `0`; update `best = max(best, i - first[bal])` if seen, else store `first[bal] = i`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Never overwrite the earliest recorded index for a balance value."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def longest_balanced_grade(grades: list[int]) -> int:\n    first = {0: -1}\n    bal = best = 0\n    for i, g in enumerate(grades):\n        bal += 1 if g == 1 else -1\n        if bal in first:\n            if i - first[bal] > best:\n                best = i - first[bal]\n        else:\n            first[bal] = i\n    return best\n"
  }
},
  "port-crane-container-reservoir": {
  "problemId": "port-crane-container-reservoir",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Start pointers at both ends and always move the shorter bulkhead inward since moving the taller one can never improve the limiting height.",
  "hints": [
    "Conceptual Intuition: Consider a Converging Shorter-Wall Two Pointers paradigm. Start pointers at both ends and always move the shorter bulkhead inward since moving the taller one can never improve the limiting height.",
    "Algorithmic Mechanics: Width strictly shrinks by 1 per move, so only replacing the shorter wall can yield a larger area. Set `l = 0`, `r = len(walls) - 1`, `best = 0`. While `l < r`, update `best`, then advance `l` if `walls[l] < walls[r]` else decrement `r`.",
    "Edge Cases & Optimization: Evaluate area before moving either pointer. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Converging Shorter-Wall Two Pointers",
  "approachSteps": [
    "Set `l = 0`, `r = len(walls) - 1`, `best = 0`.",
    "While `l < r`, update `best`, then advance `l` if `walls[l] < walls[r]` else decrement `r`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Evaluate area before moving either pointer."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def max_basin_area(walls: list[int]) -> int:\n    l, r = 0, len(walls) - 1\n    best = 0\n    while l < r:\n        area = (r - l) * min(walls[l], walls[r])\n        if area > best:\n            best = area\n        if walls[l] < walls[r]:\n            l += 1\n        else:\n            r -= 1\n    return best\n"
  }
},
  "smart-irrigation-terrace-capture": {
  "problemId": "smart-irrigation-terrace-capture",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain two inward pointers with `l_max` and `r_max`; process the lower side each step because its water surface is strictly bounded by its own side's max.",
  "hints": [
    "Water above terrace `i` is `min(left_max, right_max) - terraces[i]`.",
    "No extra prefix/suffix arrays are needed with two pointers.",
    "Boundary edge cases & complexity: Update `lm`/`rm` before subtracting the current elevation. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "O(1)-Space Two-Pointer Water Surface",
  "approachSteps": [
    "Initialize `l = 0`, `r = len(terraces) - 1`, `lm = rm = total = 0`.",
    "Advance the side with lower terrace height, updating its max and adding `max - height`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Update `lm`/`rm` before subtracting the current elevation."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def retained_rainwater(terraces: list[int]) -> int:\n    l, r = 0, len(terraces) - 1\n    lm = rm = total = 0\n    while l < r:\n        if terraces[l] < terraces[r]:\n            lm = max(lm, terraces[l])\n            total += lm - terraces[l]\n            l += 1\n        else:\n            rm = max(rm, terraces[r])\n            total += rm - terraces[r]\n            r -= 1\n    return total\n"
  }
},
  "grocery-aisle-two-brand-showcase": {
  "problemId": "grocery-aisle-two-brand-showcase",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a sliding window frequency dictionary; whenever distinct keys exceed 2, shrink from the left until `len(counts) <= 2`.",
  "hints": [
    "Conceptual Intuition: Consider a At-Most-Two-Keys Sliding Window paradigm. Maintain a sliding window frequency dictionary; whenever distinct keys exceed 2, shrink from the left until `len(counts) <= 2`.",
    "Algorithmic Mechanics: Remove a brand key from the dictionary as soon as its count reaches 0. Initialize `cnt = {}`, `l = best = 0`. Increment `cnt[brands[r]]`; while `len(cnt) > 2`, decrement `cnt[brands[l]]` (deleting at 0) and increment `l`.",
    "Edge Cases & Optimization: Zero-count keys left in the dict inflate `len(cnt)`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "At-Most-Two-Keys Sliding Window",
  "approachSteps": [
    "Initialize `cnt = {}`, `l = best = 0`.",
    "Increment `cnt[brands[r]]`; while `len(cnt) > 2`, decrement `cnt[brands[l]]` (deleting at 0) and increment `l`.",
    "Maximize `r - l + 1`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Zero-count keys left in the dict inflate `len(cnt)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict\n\ndef max_two_brand_span(brands: list[int]) -> int:\n    cnt = defaultdict(int)\n    l = best = 0\n    for r, b in enumerate(brands):\n        cnt[b] += 1\n        while len(cnt) > 2:\n            lb = brands[l]\n            cnt[lb] -= 1\n            if cnt[lb] == 0:\n                del cnt[lb]\n            l += 1\n        if r - l + 1 > best:\n            best = r - l + 1\n    return best\n"
  }
},
  "auction-bid-multiplier-excluding-self": {
  "problemId": "auction-bid-multiplier-excluding-self",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Write prefix products left-to-right into the output array, then multiply by running suffix products right-to-left.",
  "hints": [
    "Division fails when any factor is `0`.",
    "Two linear passes use O(1) extra space.",
    "Boundary edge cases & complexity: Handle multiple zeros naturally without branching. Verify your solution strictly meets O(n) time and O(1) auxiliary space limits."
  ],
  "approachTitle": "Prefix-Suffix Two-Pass Product",
  "approachSteps": [
    "Initialize `res = [1] * n`.",
    "Forward pass sets `res[i] = prefix`, then `prefix *= factors[i]`.",
    "Backward pass multiplies `res[i] *= suffix`, then `suffix *= factors[i]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Handle multiple zeros naturally without branching."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def peer_risk_products(factors: list[int]) -> list[int]:\n    n = len(factors)\n    res = [1] * n\n    p = 1\n    for i in range(n):\n        res[i] = p\n        p *= factors[i]\n    s = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= s\n        s *= factors[i]\n    return res\n"
  }
},
  "ticket-kiosk-consecutive-seat-block": {
  "problemId": "ticket-kiosk-consecutive-seat-block",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Put all seats into a hash set and only walk upward from seat `s` when `s - 1` is absent.",
  "hints": [
    "Each seat is visited at most twice across all walks.",
    "Deduplicate via `set(seats)` first.",
    "Boundary edge cases & complexity: Iterating over `seats` instead of `s_set` degrades on duplicate entries. Verify your solution strictly meets O(n) time and O(n) space limits."
  ],
  "approachTitle": "Hash-Set Block-Start Expansion",
  "approachSteps": [
    "Build `s_set = set(seats)`.",
    "For `x` in `s_set`: if `x - 1 not in s_set`, count `x, x+1, ...` in `s_set` and update `best`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Iterating over `seats` instead of `s_set` degrades on duplicate entries."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def longest_seat_block(seats: list[int]) -> int:\n    s = set(seats)\n    best = 0\n    for x in s:\n        if x - 1 not in s:\n            cur = 1\n            while x + cur in s:\n                cur += 1\n            if cur > best:\n                best = cur\n    return best\n"
  }
},
  "api-rate-limiter-burst-window": {
  "problemId": "api-rate-limiter-burst-window",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track each route's last seen index in a hash map and jump the left pointer past any repeated route inside the current window.",
  "hints": [
    "Conceptual Intuition: Consider a Last-Seen Index Sliding Window paradigm. Track each route's last seen index in a hash map and jump the left pointer past any repeated route inside the current window.",
    "Algorithmic Mechanics: Only move `l` forward (`if last[ch] >= l: l = last[ch] + 1`). Initialize `last = {}`, `l = best = 0`. For `r, ch` in `enumerate(trace)`, update `l` if `ch` repeats inside window, store `last[ch] = r`, maximize `r - l + 1`.",
    "Edge Cases & Optimization: Never allow `l` to jump backward to an older occurrence. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Last-Seen Index Sliding Window",
  "approachSteps": [
    "Initialize `last = {}`, `l = best = 0`.",
    "For `r, ch` in `enumerate(trace)`, update `l` if `ch` repeats inside window, store `last[ch] = r`, maximize `r - l + 1`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Never allow `l` to jump backward to an older occurrence."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def longest_unique_trace(trace: str) -> int:\n    last = {}\n    l = best = 0\n    for r, ch in enumerate(trace):\n        if ch in last and last[ch] >= l:\n            l = last[ch] + 1\n        last[ch] = r\n        if r - l + 1 > best:\n            best = r - l + 1\n    return best\n"
  }
},
  "fulfillment-crate-smallest-missing-tag": {
  "problemId": "fulfillment-crate-smallest-missing-tag",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Place every tag `v` in `[1..n]` into index `v - 1` via cyclic swapping, then return the first `i + 1` where `tags[i] != i + 1`.",
  "hints": [
    "The answer is always in `[1, n + 1]`.",
    "Break out of the swap loop if `tags[target] == tags[i]` to prevent infinite loops on duplicates.",
    "Boundary edge cases & complexity: Store `target = tags[i] - 1` in a temporary variable before tuple-swapping in Python. Verify your solution strictly meets O(n) time and O(1) space limits."
  ],
  "approachTitle": "In-Place Cyclic Slot Placement",
  "approachSteps": [
    "Swap each in-range tag `v` to index `v - 1`.",
    "Scan for first index `i` where `tags[i] != i + 1`, returning `i + 1` (or `n + 1`)."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Store `target = tags[i] - 1` in a temporary variable before tuple-swapping in Python."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def lowest_unassigned_tag(tags: list[int]) -> int:\n    n = len(tags)\n    for i in range(n):\n        while 1 <= tags[i] <= n:\n            t = tags[i] - 1\n            if tags[t] == tags[i]:\n                break\n            tags[i], tags[t] = tags[t], tags[i]\n    for i, v in enumerate(tags):\n        if v != i + 1:\n            return i + 1\n    return n + 1\n"
  }
},
  "freight-ferry-paired-vehicle-load": {
  "problemId": "freight-ferry-paired-vehicle-load",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort weights ascending and pair the heaviest remaining vehicle with the lightest remaining vehicle whenever their combined weight fits `deck_cap`.",
  "hints": [
    "Conceptual Intuition: Consider a Sorted Extremes Greedy Pairing paradigm. Sort weights ascending and pair the heaviest remaining vehicle with the lightest remaining vehicle whenever their combined weight fits `deck_cap`.",
    "Algorithmic Mechanics: Always load the heaviest vehicle `r`; also load `l` if `vehicles[l] + vehicles[r] <= deck_cap`. Sort `vehicles`. Use `l = 0`, `r = n - 1`, `trips = 0`; while `l <= r`, advance `l` if pair fits, decrement `r`, increment `trips`.",
    "Edge Cases & Optimization: Use `l <= r` to count a solo remaining vehicle. Ensure time complexity is bounded to O(n log n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Sorted Extremes Greedy Pairing",
  "approachSteps": [
    "Sort `vehicles`.",
    "Use `l = 0`, `r = n - 1`, `trips = 0`; while `l <= r`, advance `l` if pair fits, decrement `r`, increment `trips`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Use `l <= r` to count a solo remaining vehicle."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_ferry_crossings(vehicles: list[int], deck_cap: int) -> int:\n    arr = sorted(vehicles)\n    l, r = 0, len(arr) - 1\n    trips = 0\n    while l <= r:\n        if arr[l] + arr[r] <= deck_cap:\n            l += 1\n        r -= 1\n        trips += 1\n    return trips\n"
  }
},
  "log-sanitizer-palindrome-check": {
  "problemId": "log-sanitizer-palindrome-check",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Converge two pointers from both ends skipping non-alphanumeric characters and comparing lowercase letters.",
  "hints": [
    "Conceptual Intuition: Consider a Zero-Allocation Two Pointers paradigm. Converge two pointers from both ends skipping non-alphanumeric characters and comparing lowercase letters.",
    "Algorithmic Mechanics: Keep digits `0-9` since they are alphanumeric. Skip non-alphanumeric characters on both ends. Compare `sig[l].lower() == sig[r].lower()` until `l >= r`.",
    "Edge Cases & Optimization: Strings with only punctuation sanitize to empty string and are symmetric (`True`). Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Zero-Allocation Two Pointers",
  "approachSteps": [
    "Skip non-alphanumeric characters on both ends.",
    "Compare `sig[l].lower() == sig[r].lower()` until `l >= r`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Strings with only punctuation sanitize to empty string and are symmetric (`True`)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def is_symmetric_sig(sig: str) -> bool:\n    l, r = 0, len(sig) - 1\n    while l < r:\n        while l < r and not sig[l].isalnum(): l += 1\n        while l < r and not sig[r].isalnum(): r -= 1\n        if sig[l].lower() != sig[r].lower():\n            return False\n        l += 1; r -= 1\n    return True\n"
  }
},
  "config-template-bracket-linter": {
  "problemId": "config-template-bracket-linter",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Push opening brackets onto a stack and match each closing bracket against the top of the stack.",
  "hints": [
    "Conceptual Intuition: Consider a LIFO Delimiter Stack paradigm. Push opening brackets onto a stack and match each closing bracket against the top of the stack.",
    "Algorithmic Mechanics: Map closing brackets to their expected opening counterparts. Push openers, pop and verify on closers, and check `not stack` at the end.",
    "Edge Cases & Optimization: Guard against popping from an empty stack on unexpected closers. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "LIFO Delimiter Stack",
  "approachSteps": [
    "Push openers, pop and verify on closers, and check `not stack` at the end."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Guard against popping from an empty stack on unexpected closers."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def lint_delimiters(expr: str) -> bool:\n    match = {')': '(', ']': '[', '}': '{'}\n    st = []\n    for ch in expr:\n        if ch in match:\n            if not st or st.pop() != match[ch]:\n                return False\n        else:\n            st.append(ch)\n    return not st\n"
  }
},
  "spreadsheet-postfix-formula-engine": {
  "problemId": "spreadsheet-postfix-formula-engine",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Evaluate with an operand stack using `int(a / b)` for zero-truncated division.",
  "hints": [
    "Conceptual Intuition: Consider a Postfix Operand Stack paradigm. Evaluate with an operand stack using `int(a / b)` for zero-truncated division.",
    "Algorithmic Mechanics: Pop `b` (right operand) before `a` (left operand). Push numbers; on operators pop `b, a`, compute, and push result.",
    "Edge Cases & Optimization: In Python, `//` floors instead of truncating toward zero. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Postfix Operand Stack",
  "approachSteps": [
    "Push numbers; on operators pop `b, a`, compute, and push result."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "In Python, `//` floors instead of truncating toward zero."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def eval_formula(formula: list[str]) -> int:\n    st = []\n    for tok in formula:\n        if tok in ('+', '-', '*', '/'):\n            b, a = st.pop(), st.pop()\n            if tok == '+': st.append(a + b)\n            elif tok == '-': st.append(a - b)\n            elif tok == '*': st.append(a * b)\n            else: st.append(int(a / b))\n        else:\n            st.append(int(tok))\n    return st[0]\n"
  }
},
  "weather-station-warmer-forecast-wait": {
  "problemId": "weather-station-warmer-forecast-wait",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a decreasing monotonic stack of hour indices; whenever a stronger gust arrives, pop all weaker hours and record `i - prev`.",
  "hints": [
    "Conceptual Intuition: Consider a Monotonic Decreasing Index Stack paradigm. Maintain a decreasing monotonic stack of hour indices; whenever a stronger gust arrives, pop all weaker hours and record `i - prev`.",
    "Algorithmic Mechanics: Equal wind speeds do not trigger a pop since we need strictly stronger gusts. Initialize `ans = [0] * n` and `st = []`. While `st and gusts[st[-1]] < g`, pop `p` and set `ans[p] = i - p`; push `i`.",
    "Edge Cases & Optimization: Use strict `<` comparison. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Monotonic Decreasing Index Stack",
  "approachSteps": [
    "Initialize `ans = [0] * n` and `st = []`.",
    "While `st and gusts[st[-1]] < g`, pop `p` and set `ans[p] = i - p`; push `i`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Use strict `<` comparison."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def hours_until_stronger_gust(gusts: list[int]) -> list[int]:\n    ans = [0] * len(gusts)\n    st = []\n    for i, g in enumerate(gusts):\n        while st and gusts[st[-1]] < g:\n            p = st.pop()\n            ans[p] = i - p\n        st.append(i)\n    return ans\n"
  }
},
  "drone-corridor-head-on-resolution": {
  "problemId": "drone-corridor-head-on-resolution",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Simulate with a stack: collisions occur only when `stack[-1] > 0` (eastbound) and incoming `d < 0` (westbound).",
  "hints": [
    "Conceptual Intuition: Consider a Stack Collision Resolver paradigm. Simulate with a stack: collisions occur only when `stack[-1] > 0` (eastbound) and incoming `d < 0` (westbound).",
    "Algorithmic Mechanics: Westbound followed by eastbound fly away from each other. While `st and st[-1] > 0 and d < 0`, resolve mass comparison. Push `d` only if it survives all collisions.",
    "Edge Cases & Optimization: Continue colliding if the incoming westbound drone destroys `st[-1]`. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Stack Collision Resolver",
  "approachSteps": [
    "While `st and st[-1] > 0 and d < 0`, resolve mass comparison.",
    "Push `d` only if it survives all collisions."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Continue colliding if the incoming westbound drone destroys `st[-1]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def surviving_drones(drones: list[int]) -> list[int]:\n    st = []\n    for d in drones:\n        while st and st[-1] > 0 and d < 0:\n            if st[-1] < -d:\n                st.pop()\n                continue\n            if st[-1] == -d:\n                st.pop()\n            break\n        else:\n            st.append(d)\n    return st\n"
  }
},
  "macro-expander-nested-repeat": {
  "problemId": "macro-expander-nested-repeat",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Push `(current_string, repeat_count)` on `'['` and pop-concatenate `prev + curr * mult` on `']'`.",
  "hints": [
    "Conceptual Intuition: Consider a Context-Saving Stack Expander paradigm. Push `(current_string, repeat_count)` on `'['` and pop-concatenate `prev + curr * mult` on `']'`.",
    "Algorithmic Mechanics: Accumulate multi-digit multipliers with `num = num * 10 + int(ch)`. Track `st`, `curr`, and `num`. Save on `'['`, expand on `']'`, append letters directly.",
    "Edge Cases & Optimization: Reset `num = 0` and `curr = ''` when pushing onto the stack. Ensure time complexity is bounded to O(output_len) with O(output_len) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Context-Saving Stack Expander",
  "approachSteps": [
    "Track `st`, `curr`, and `num`.",
    "Save on `'['`, expand on `']'`, append letters directly."
  ],
  "timeComplexity": "O(output_len)",
  "spaceComplexity": "O(output_len)",
  "pitfalls": [
    "Reset `num = 0` and `curr = ''` when pushing onto the stack."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def expand_macro(vector_code: str) -> str:\n    st, curr, num = [], \"\", 0\n    for ch in vector_code:\n        if ch.isdigit():\n            num = num * 10 + int(ch)\n        elif ch == '[':\n            st.append((curr, num)); curr, num = \"\", 0\n        elif ch == ']':\n            prev, mult = st.pop()\n            curr = prev + curr * mult\n        else:\n            curr += ch\n    return curr\n"
  }
},
  "cli-filesystem-canonical-resolver": {
  "problemId": "cli-filesystem-canonical-resolver",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Split `raw_path` by `'/'`, maintain a directory stack popping on `'..'` and skipping `''`/`.`.",
  "hints": [
    "Conceptual Intuition: Consider a Segment Stack Normalization paradigm. Split `raw_path` by `'/'`, maintain a directory stack popping on `'.'` and skipping `''`/`.`.",
    "Algorithmic Mechanics: Three dots `'.'` is an ordinary folder name. Split on `'/'`, process segments onto `st`, return `'/' + '/'.join(st)`.",
    "Edge Cases & Optimization: Check `if st:` before popping on `'.'`. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Segment Stack Normalization",
  "approachSteps": [
    "Split on `'/'`, process segments onto `st`, return `'/' + '/'.join(st)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Check `if st:` before popping on `'..'`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def normalize_mount_path(raw_path: str) -> str:\n    st = []\n    for seg in raw_path.split('/'):\n        if not seg or seg == '.':\n            continue\n        if seg == '..':\n            if st: st.pop()\n        else:\n            st.append(seg)\n    return '/' + '/'.join(st)\n"
  }
},
  "shipping-lane-convoy-clusters": {
  "problemId": "shipping-lane-convoy-clusters",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort trucks closest-to-port first; a trailing truck forms a new convoy iff its floating-point ETA strictly exceeds the slowest convoy ahead.",
  "hints": [
    "Compute `eta = (port_mile - pos) / spd`.",
    "Sort descending by `pos`.",
    "Boundary edge cases & complexity: Use float division for exact arrival time comparisons. Verify your solution strictly meets O(n log n) time and O(n) space limits."
  ],
  "approachTitle": "Reverse-Position ETA Sweep",
  "approachSteps": [
    "Sort `(pos, spd)` descending by `pos`.",
    "Track `slowest = 0.0` and increment `convoys` whenever `eta > slowest`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Use float division for exact arrival time comparisons."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_convoys(port_mile: int, starts: list[int], speeds: list[int]) -> int:\n    convoys = 0\n    slowest = 0.0\n    for p, s in sorted(zip(starts, speeds), reverse=True):\n        eta = (port_mile - p) / s\n        if eta > slowest:\n            convoys += 1\n            slowest = eta\n    return convoys\n"
  }
},
  "ledger-code-anagram-bucketing": {
  "problemId": "ledger-code-anagram-bucketing",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Hash each code by its 26-letter frequency tuple into a dictionary of lists.",
  "hints": [
    "Conceptual Intuition: Consider a 26-Letter Frequency Tuple Bucketing paradigm. Hash each code by its 26-letter frequency tuple into a dictionary of lists.",
    "Algorithmic Mechanics: Convert the 26-element count array into an immutable tuple key. Count characters per code into a tuple key and append to `groups[key]`. Return `list(groups.values())`.",
    "Edge Cases & Optimization: Handle empty strings cleanly. Ensure time complexity is bounded to O(n * k) with O(n * k) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "26-Letter Frequency Tuple Bucketing",
  "approachSteps": [
    "Count characters per code into a tuple key and append to `groups[key]`.",
    "Return `list(groups.values())`."
  ],
  "timeComplexity": "O(n * k)",
  "spaceComplexity": "O(n * k)",
  "pitfalls": [
    "Handle empty strings cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import defaultdict\n\ndef cluster_codes(codes: list[str]) -> list[list[str]]:\n    groups = defaultdict(list)\n    for c in codes:\n        cnt = [0] * 26\n        for ch in c:\n            cnt[ord(ch) - 97] += 1\n        groups[tuple(cnt)].append(c)\n    return list(groups.values())\n"
  }
},
  "dns-label-shared-prefix": {
  "problemId": "dns-label-shared-prefix",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Compare character column `i` of `hosts[0]` against all other hostnames and stop at the first mismatch or string end.",
  "hints": [
    "Conceptual Intuition: Consider a Column-Wise Prefix Scan paradigm. Compare character column `i` of `hosts[0]` against all other hostnames and stop at the first mismatch or string end.",
    "Algorithmic Mechanics: Vertical scanning stops early on the very first differing column. Loop `i, ch` over `hosts[0]`; if any `h` has `i >= len(h)` or `h[i] != ch`, return `hosts[0][:i]`.",
    "Edge Cases & Optimization: Guard `i >= len(h)` for shorter strings. Ensure time complexity is bounded to O(S) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Column-Wise Prefix Scan",
  "approachSteps": [
    "Loop `i, ch` over `hosts[0]`; if any `h` has `i >= len(h)` or `h[i] != ch`, return `hosts[0][:i]`."
  ],
  "timeComplexity": "O(S)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Guard `i >= len(h)` for shorter strings."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def shared_host_prefix(hosts: list[str]) -> str:\n    for i, ch in enumerate(hosts[0]):\n        for h in hosts[1:]:\n            if i >= len(h) or h[i] != ch:\n                return hosts[0][:i]\n    return hosts[0]\n"
  }
},
  "packet-framing-codec-roundtrip": {
  "problemId": "packet-framing-codec-roundtrip",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Frame each packet as `f\"{len(p)}:{p}\"` and decode by locating `':'`, parsing integer length `L`, and slicing `L` characters.",
  "hints": [
    "Conceptual Intuition: Consider a Length-Prefixed Wire Framing paradigm. Frame each packet as `f\"{len(p)}:{p}\"` and decode by locating `':'`, parsing integer length `L`, and slicing `L` characters.",
    "Algorithmic Mechanics: Never split on `':'` globally since payloads may contain colons. Encode with `len:payload`. Decode via cursor `i`, finding next `':'` at `j`, slicing `[j+1 : j+1+L]`.",
    "Edge Cases & Optimization: Handle empty payloads (`0:`) cleanly. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Length-Prefixed Wire Framing",
  "approachSteps": [
    "Encode with `len:payload`.",
    "Decode via cursor `i`, finding next `':'` at `j`, slicing `[j+1 : j+1+L]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Handle empty payloads (`0:`) cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def wire_roundtrip(packets: list[str]) -> list[str]:\n    wire = \"\".join(f\"{len(p)}:{p}\" for p in packets)\n    out, i = [], 0\n    while i < len(wire):\n        j = wire.index(':', i)\n        L = int(wire[i:j])\n        out.append(wire[j + 1:j + 1 + L])\n        i = j + 1 + L\n    return out\n"
  }
},
  "sensor-stream-run-length-packer": {
  "problemId": "sensor-stream-run-length-packer",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Measure each contiguous run with a `read` pointer and emit the symbol plus each digit of `str(count)` (if `count > 1`) via a `write` pointer.",
  "hints": [
    "Conceptual Intuition: Consider a Two-Pointer Run-Length Packer paradigm. Measure each contiguous run with a `read` pointer and emit the symbol plus each digit of `str(count)` (if `count > 1`) via a `write` pointer.",
    "Algorithmic Mechanics: Multi-digit run lengths like 10 become `'1', '0'`. Scan runs with `read`, write symbol + digits at `write`, return `states[:write]`.",
    "Edge Cases & Optimization: Emit count digits only when `count > 1`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Two-Pointer Run-Length Packer",
  "approachSteps": [
    "Scan runs with `read`, write symbol + digits at `write`, return `states[:write]`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Emit count digits only when `count > 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def pack_states(states: list[str]) -> list[str]:\n    w = r = 0\n    n = len(states)\n    while r < n:\n        ch = states[r]\n        e = r\n        while e < n and states[e] == ch:\n            e += 1\n        states[w] = ch; w += 1\n        if e - r > 1:\n            for d in str(e - r):\n                states[w] = d; w += 1\n        r = e\n    return states[:w]\n"
  }
},
  "badge-id-minimize-after-deletions": {
  "problemId": "badge-id-minimize-after-deletions",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain an increasing digit stack popping larger left digits while `drops > 0`, trim any remaining `drops` from the right, and strip leading zeros.",
  "hints": [
    "Conceptual Intuition: Consider a Greedy Monotonic Digit Stack paradigm. Maintain an increasing digit stack popping larger left digits while `drops > 0`, trim any remaining `drops` from the right, and strip leading zeros.",
    "Algorithmic Mechanics: If digits are already ascending, trim from the tail. Pop while `drops > 0 and st and st[-1] > d`. Slice off trailing `drops` if left, strip leading `'0'`s, return `res or '0'`.",
    "Edge Cases & Optimization: Return `\"0\"` when all surviving digits are zeros or empty. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Greedy Monotonic Digit Stack",
  "approachSteps": [
    "Pop while `drops > 0 and st and st[-1] > d`.",
    "Slice off trailing `drops` if left, strip leading `'0'`s, return `res or '0'`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Return `\"0\"` when all surviving digits are zeros or empty."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def smallest_badge_code(serial: str, drops: int) -> str:\n    st = []\n    for d in serial:\n        while drops > 0 and st and st[-1] > d:\n            st.pop(); drops -= 1\n        st.append(d)\n    if drops > 0:\n        st = st[:-drops]\n    res = \"\".join(st).lstrip('0')\n    return res if res else '0'\n"
  }
},
  "audit-trail-window-matcher": {
  "problemId": "audit-trail-window-matcher",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Expand right until all required event counts are satisfied, then contract left while tracking the shortest valid slice.",
  "hints": [
    "Conceptual Intuition: Consider a Expand-Contract Event Counter Window paradigm. Expand right until all required event counts are satisfied, then contract left while tracking the shortest valid slice.",
    "Algorithmic Mechanics: Track `formed` distinct event codes meeting their required multiplicity. Count `need = Counter(required)`. Expand `r`, increment `formed` when `win[ch] == need[ch]`.",
    "Edge Cases & Optimization: Check exact equality `win[ch] == need[ch]` when incrementing `formed`. Ensure time complexity is bounded to O(n + m) with O(m) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Expand-Contract Event Counter Window",
  "approachSteps": [
    "Count `need = Counter(required)`.",
    "Expand `r`, increment `formed` when `win[ch] == need[ch]`.",
    "While `formed == len(need)`, update best bounds and shrink `l`."
  ],
  "timeComplexity": "O(n + m)",
  "spaceComplexity": "O(m)",
  "pitfalls": [
    "Check exact equality `win[ch] == need[ch]` when incrementing `formed`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import Counter, defaultdict\n\ndef shortest_audit_slice(stream: str, required: str) -> str:\n    need = Counter(required)\n    win = defaultdict(int)\n    formed, req = 0, len(need)\n    l = 0\n    best = (float('inf'), 0, 0)\n    for r, ch in enumerate(stream):\n        win[ch] += 1\n        if ch in need and win[ch] == need[ch]:\n            formed += 1\n        while formed == req:\n            if r - l + 1 < best[0]:\n                best = (r - l + 1, l, r)\n            lc = stream[l]\n            win[lc] -= 1\n            if lc in need and win[lc] < need[lc]:\n                formed -= 1\n            l += 1\n    return \"\" if best[0] == float('inf') else stream[best[1]:best[2] + 1]\n"
  }
},
  "terminal-buffer-backspace-equivalence": {
  "problemId": "terminal-buffer-backspace-equivalence",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Walk both strings in reverse using a `skip` counter for `'#'` so surviving characters are compared lazily in O(1) space.",
  "hints": [
    "Conceptual Intuition: Consider a Reverse Lazy Generator Comparison paradigm. Walk both strings in reverse using a `skip` counter for `'#'` so surviving characters are compared lazily in O(1) space.",
    "Algorithmic Mechanics: Backspacing on an empty buffer is a no-op. Yield surviving characters from right to left and compare pairs with `zip_longest`.",
    "Edge Cases & Optimization: Compare generators with `zip_longest` so differing surviving lengths return `False`. Ensure time complexity is bounded to O(n + m) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Reverse Lazy Generator Comparison",
  "approachSteps": [
    "Yield surviving characters from right to left and compare pairs with `zip_longest`."
  ],
  "timeComplexity": "O(n + m)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Compare generators with `zip_longest` so differing surviving lengths return `False`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from itertools import zip_longest\n\ndef same_terminal_buffer(log_a: str, log_b: str) -> bool:\n    def gen(s):\n        skip = 0\n        for ch in reversed(s):\n            if ch == '#': skip += 1\n            elif skip: skip -= 1\n            else: yield ch\n    return all(a == b for a, b in zip_longest(gen(log_a), gen(log_b)))\n"
  }
},
  "playlist-queue-reverse-segments": {
  "problemId": "playlist-queue-reverse-segments",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Step through the queue in increments of `block_size` and reverse each complete slice `[i : i + block_size]` while `i + block_size <= n`.",
  "hints": [
    "Conceptual Intuition: Consider a Full-Block Segment Reversal paradigm. Step through the queue in increments of `block_size` and reverse each complete slice `[i : i + block_size]` while `i + block_size <= n`.",
    "Algorithmic Mechanics: Never reverse a trailing remainder shorter than `block_size`. Copy `tracks` and reverse each full `[i : i + block_size]` block.",
    "Edge Cases & Optimization: Check `i + block_size <= n` before reversing. Ensure time complexity is bounded to O(n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Full-Block Segment Reversal",
  "approachSteps": [
    "Copy `tracks` and reverse each full `[i : i + block_size]` block."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Check `i + block_size <= n` before reversing."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def reverse_track_blocks(tracks: list[int], block_size: int) -> list[int]:\n    res = list(tracks)\n    for i in range(0, len(res) - block_size + 1, block_size):\n        res[i:i + block_size] = reversed(res[i:i + block_size])\n    return res\n"
  }
},
  "telemetry-buffer-lru-eviction": {
  "problemId": "telemetry-buffer-lru-eviction",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use an `OrderedDict` (hash map + doubly linked list) to refresh accessed/updated keys to the MRU tail and evict from the LRU head in O(1).",
  "hints": [
    "Conceptual Intuition: Consider a OrderedDict O(1) LRU Simulation paradigm. Use an `OrderedDict` (hash map + doubly linked list) to refresh accessed/updated keys to the MRU tail and evict from the LRU head in O(1).",
    "Algorithmic Mechanics: Updating an existing key refreshes its recency without increasing cache size. On `read`, move key to end and emit value (or `-1`). On `set`, assign, move to end, and pop oldest if `len > cap`.",
    "Edge Cases & Optimization: Do not forget `move_to_end` on `set` of an already-present key. Ensure time complexity is bounded to O(1) per command with O(cap) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "OrderedDict O(1) LRU Simulation",
  "approachSteps": [
    "On `read`, move key to end and emit value (or `-1`).",
    "On `set`, assign, move to end, and pop oldest if `len > cap`."
  ],
  "timeComplexity": "O(1) per command",
  "spaceComplexity": "O(cap)",
  "pitfalls": [
    "Do not forget `move_to_end` on `set` of an already-present key."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import OrderedDict\n\ndef simulate_edge_cache(cap: int, cmds: list[list]) -> list[int]:\n    cache = OrderedDict()\n    out = []\n    for c in cmds:\n        if c[0] == 'read':\n            k = c[1]\n            if k in cache:\n                cache.move_to_end(k)\n                out.append(cache[k])\n            else:\n                out.append(-1)\n        else:\n            k, v = c[1], c[2]\n            cache[k] = v\n            cache.move_to_end(k)\n            if len(cache) > cap:\n                cache.popitem(last=False)\n    return out\n"
  }
},
  "routing-ring-loop-detector": {
  "problemId": "routing-ring-loop-detector",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Advance `slow` one hop and `fast` two hops from router `0`; if they meet, a loop exists, otherwise `fast` reaches `-1`.",
  "hints": [
    "Conceptual Intuition: Consider a Floyd's Fast-Slow Hop Detection paradigm. Advance `slow` one hop and `fast` two hops from router `0`; if they meet, a loop exists, otherwise `fast` reaches `-1`.",
    "Algorithmic Mechanics: Check both `fast != -1` and `next_hop[fast] != -1` before stepping `fast` twice. Start `slow = fast = 0`. Loop stepping `slow` by 1 and `fast` by 2; return `True` on collision, `False` on `-1`.",
    "Edge Cases & Optimization: Handle self-loops (`next_hop[0] == 0`) cleanly. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Floyd's Fast-Slow Hop Detection",
  "approachSteps": [
    "Start `slow = fast = 0`.",
    "Loop stepping `slow` by 1 and `fast` by 2; return `True` on collision, `False` on `-1`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle self-loops (`next_hop[0] == 0`) cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def has_routing_loop(next_hop: list[int]) -> bool:\n    slow = fast = 0\n    while fast != -1 and next_hop[fast] != -1:\n        slow = next_hop[slow]\n        fast = next_hop[next_hop[fast]]\n        if slow == fast:\n            return True\n    return False\n"
  }
},
  "invoice-digit-stream-adder": {
  "problemId": "invoice-digit-stream-adder",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sum matching positions with a running `carry` until both tapes and `carry` are exhausted.",
  "hints": [
    "Conceptual Intuition: Consider a Carry-Propagating Stream Addition paradigm. Sum matching positions with a running `carry` until both tapes and `carry` are exhausted.",
    "Algorithmic Mechanics: Keep looping while `i < len(tape_a) or j < len(tape_b) or carry`. Add digits plus carry, append `s % 10`, update `carry = s // 10`.",
    "Edge Cases & Optimization: Emit a final `1` if carry remains after both tapes finish. Ensure time complexity is bounded to O(max(n, m)) with O(max(n, m)) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Carry-Propagating Stream Addition",
  "approachSteps": [
    "Add digits plus carry, append `s % 10`, update `carry = s // 10`."
  ],
  "timeComplexity": "O(max(n, m))",
  "spaceComplexity": "O(max(n, m))",
  "pitfalls": [
    "Emit a final `1` if carry remains after both tapes finish."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def add_ledger_tapes(tape_a: list[int], tape_b: list[int]) -> list[int]:\n    i = j = carry = 0\n    out = []\n    while i < len(tape_a) or j < len(tape_b) or carry:\n        s = carry\n        if i < len(tape_a): s += tape_a[i]; i += 1\n        if j < len(tape_b): s += tape_b[j]; j += 1\n        out.append(s % 10)\n        carry = s // 10\n    return out\n"
  }
},
  "heartbeat-monitor-rolling-3sec": {
  "problemId": "heartbeat-monitor-rolling-3sec",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Push each beat onto a FIFO deque and evict front entries strictly less than `t - span_ms`.",
  "hints": [
    "Conceptual Intuition: Consider a FIFO Expiration Deque paradigm. Push each beat onto a FIFO deque and evict front entries strictly less than `t - span_ms`.",
    "Algorithmic Mechanics: Timestamps are strictly increasing so oldest entries are always at `q[0]`. Append `t`, popleft while `q[0] < t - span_ms`, append `len(q)`.",
    "Edge Cases & Optimization: Boundary `t - span_ms` is inclusive. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "FIFO Expiration Deque",
  "approachSteps": [
    "Append `t`, popleft while `q[0] < t - span_ms`, append `len(q)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Boundary `t - span_ms` is inclusive."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef count_active_beats(beats: list[int], span_ms: int) -> list[int]:\n    q, res = deque(), []\n    for t in beats:\n        q.append(t)\n        while q[0] < t - span_ms:\n            q.popleft()\n        res.append(len(q))\n    return res\n"
  }
},
  "log-archive-timestamp-lookup": {
  "problemId": "log-archive-timestamp-lookup",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Halve the inclusive range `[l, r]` at each step by comparing `epochs[mid]` with `query_epoch`.",
  "hints": [
    "Conceptual Intuition: Consider a Iterative Binary Search paradigm. Halve the inclusive range `[l, r]` at each step by comparing `epochs[mid]` with `query_epoch`.",
    "Algorithmic Mechanics: Use `while l <= r`. Initialize `l = 0, r = n - 1`. Compare `epochs[mid]` with `query_epoch` and narrow bounds.",
    "Edge Cases & Optimization: Return `-1` if the loop exits without finding a match. Ensure time complexity is bounded to O(log n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Iterative Binary Search",
  "approachSteps": [
    "Initialize `l = 0, r = n - 1`.",
    "Compare `epochs[mid]` with `query_epoch` and narrow bounds."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Return `-1` if the loop exits without finding a match."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def lookup_epoch(epochs: list[int], query_epoch: int) -> int:\n    l, r = 0, len(epochs) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if epochs[m] == query_epoch: return m\n        if epochs[m] < query_epoch: l = m + 1\n        else: r = m - 1\n    return -1\n"
  }
},
  "rotated-ring-buffer-lookup": {
  "problemId": "rotated-ring-buffer-lookup",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Identify which half (`[l..m]` or `[m..r]`) is monotonically sorted and test whether `seq_id` falls inside it.",
  "hints": [
    "Conceptual Intuition: Consider a Sorted-Half Binary Search paradigm. Identify which half (`[l.m]` or `[m.r]`) is monotonically sorted and test whether `seq_id` falls inside it.",
    "Algorithmic Mechanics: Use `ring[l] <= ring[m]` to handle 2-element ranges. Check `ring[m] == seq_id`; branch on sorted half and update `l` or `r`.",
    "Edge Cases & Optimization: Strict `<` on `ring[l] < ring[m]` breaks when `l == m`. Ensure time complexity is bounded to O(log n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Sorted-Half Binary Search",
  "approachSteps": [
    "Check `ring[m] == seq_id`; branch on sorted half and update `l` or `r`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Strict `<` on `ring[l] < ring[m]` breaks when `l == m`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def search_ring_buffer(ring: list[int], seq_id: int) -> int:\n    l, r = 0, len(ring) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if ring[m] == seq_id: return m\n        if ring[l] <= ring[m]:\n            if ring[l] <= seq_id < ring[m]: r = m - 1\n            else: l = m + 1\n        else:\n            if ring[m] < seq_id <= ring[r]: l = m + 1\n            else: r = m - 1\n    return -1\n"
  }
},
  "ring-buffer-start-offset": {
  "problemId": "ring-buffer-start-offset",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Compare `ring[mid]` with `ring[r]`; if `ring[mid] > ring[r]`, the wrap point is strictly right (`l = mid + 1`), else `r = mid`.",
  "hints": [
    "Conceptual Intuition: Consider a Right-Bound Binary Search paradigm. Compare `ring[mid]` with `ring[r]`; if `ring[mid] > ring[r]`, the wrap point is strictly right (`l = mid + 1`), else `r = mid`.",
    "Algorithmic Mechanics: Shrink until `l == r` and return `ring[l]`. While `l < r`, move `l = mid + 1` if `ring[mid] > ring[r]` else `r = mid`.",
    "Edge Cases & Optimization: Never set `r = mid - 1` when `ring[mid]` could be the minimum. Ensure time complexity is bounded to O(log n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Right-Bound Binary Search",
  "approachSteps": [
    "While `l < r`, move `l = mid + 1` if `ring[mid] > ring[r]` else `r = mid`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Never set `r = mid - 1` when `ring[mid]` could be the minimum."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def oldest_ring_seq(ring: list[int]) -> int:\n    l, r = 0, len(ring) - 1\n    while l < r:\n        m = (l + r) // 2\n        if ring[m] > ring[r]: l = m + 1\n        else: r = m\n    return ring[l]\n"
  }
},
  "video-transcoder-min-bitrate": {
  "problemId": "video-transcoder-min-bitrate",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Binary search `rate` in `[1, max(clips)]` using integer ceiling `(c + rate - 1) // rate` to count total hours.",
  "hints": [
    "Conceptual Intuition: Consider a Answer-Space Binary Search paradigm. Binary search `rate` in `[1, max(clips)]` using integer ceiling `(c + rate - 1) // rate` to count total hours.",
    "Algorithmic Mechanics: Feasibility is monotonic: higher rates always need fewer or equal hours. Set `l = 1, r = max(clips)`. Sum `(c + mid - 1) // mid`; narrow `r = mid` if `<= deadline_hrs` else `l = mid + 1`.",
    "Edge Cases & Optimization: Use integer ceiling to avoid floating-point precision loss. Ensure time complexity is bounded to O(n log M) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Answer-Space Binary Search",
  "approachSteps": [
    "Set `l = 1, r = max(clips)`.",
    "Sum `(c + mid - 1) // mid`; narrow `r = mid` if `<= deadline_hrs` else `l = mid + 1`."
  ],
  "timeComplexity": "O(n log M)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Use integer ceiling to avoid floating-point precision loss."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_transcode_rate(clips: list[int], deadline_hrs: int) -> int:\n    l, r = 1, max(clips)\n    while l < r:\n        m = (l + r) // 2\n        if sum((c + m - 1) // m for c in clips) <= deadline_hrs:\n            r = m\n        else:\n            l = m + 1\n    return l\n"
  }
},
  "cargo-vessel-daily-tonnage": {
  "problemId": "cargo-vessel-daily-tonnage",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Binary search capacity in `[max(tons), sum(tons)]` and greedily load consecutive lots per voyage.",
  "hints": [
    "Conceptual Intuition: Consider a Monotonic Capacity Binary Search paradigm. Binary search capacity in `[max(tons), sum(tons)]` and greedily load consecutive lots per voyage.",
    "Algorithmic Mechanics: Start `l = max(tons)` so every single lot fits. Greedily count voyages for candidate `mid`; narrow `[l, r]` until `l == r`.",
    "Edge Cases & Optimization: Initialize `voyages = 1` before iterating through `tons`. Ensure time complexity is bounded to O(n log S) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Monotonic Capacity Binary Search",
  "approachSteps": [
    "Greedily count voyages for candidate `mid`; narrow `[l, r]` until `l == r`."
  ],
  "timeComplexity": "O(n log S)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Initialize `voyages = 1` before iterating through `tons`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_barge_capacity(tons: list[int], max_days: int) -> int:\n    l, r = max(tons), sum(tons)\n    while l < r:\n        m = (l + r) // 2\n        days, cur = 1, 0\n        for t in tons:\n            if cur + t > m:\n                days += 1; cur = 0\n            cur += t\n        if days <= max_days: r = m\n        else: l = m + 1\n    return l\n"
  }
},
  "batch-job-cluster-partition": {
  "problemId": "batch-job-cluster-partition",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Binary search the peak worker load cap in `[max(jobs), sum(jobs)]` and greedily check if `<= workers` contiguous batches suffice.",
  "hints": [
    "Conceptual Intuition: Consider a Binary Search on Peak Batch Cap paradigm. Binary search the peak worker load cap in `[max(jobs), sum(jobs)]` and greedily check if `<= workers` contiguous batches suffice.",
    "Algorithmic Mechanics: Greedy packing minimizes the number of batches for any fixed cap `mid`. Set `l = max(jobs), r = sum(jobs)`. Count batches for cap `mid` and converge `l == r`.",
    "Edge Cases & Optimization: Ensure `l = max(jobs)` so no job exceeds the cap. Ensure time complexity is bounded to O(n log S) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Binary Search on Peak Batch Cap",
  "approachSteps": [
    "Set `l = max(jobs), r = sum(jobs)`.",
    "Count batches for cap `mid` and converge `l == r`."
  ],
  "timeComplexity": "O(n log S)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Ensure `l = max(jobs)` so no job exceeds the cap."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_peak_worker_load(jobs: list[int], workers: int) -> int:\n    l, r = max(jobs), sum(jobs)\n    while l < r:\n        m = (l + r) // 2\n        parts, cur = 1, 0\n        for j in jobs:\n            if cur + j > m:\n                parts += 1; cur = 0\n            cur += j\n        if parts <= workers: r = m\n        else: l = m + 1\n    return l\n"
  }
},
  "radar-elevation-local-crest": {
  "problemId": "radar-elevation-local-crest",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Always move toward the higher adjacent slope (`alt[mid] < alt[mid + 1]` -> go right, else go left including `mid`).",
  "hints": [
    "Conceptual Intuition: Consider a Slope-Climbing Binary Search paradigm. Always move toward the higher adjacent slope (`alt[mid] < alt[mid + 1]` -> go right, else go left including `mid`).",
    "Algorithmic Mechanics: Boundary `-inf` guarantees an ascending slope always reaches a ridge. While `l < r`, compare `alt[m]` and `alt[m + 1]` and shrink to the ascending side.",
    "Edge Cases & Optimization: Use `while l < r` so `m + 1` stays in bounds. Ensure time complexity is bounded to O(log n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Slope-Climbing Binary Search",
  "approachSteps": [
    "While `l < r`, compare `alt[m]` and `alt[m + 1]` and shrink to the ascending side."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Use `while l < r` so `m + 1` stays in bounds."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_ridge_index(alt: list[int]) -> int:\n    l, r = 0, len(alt) - 1\n    while l < r:\n        m = (l + r) // 2\n        if alt[m] < alt[m + 1]: l = m + 1\n        else: r = m\n    return l\n"
  }
},
  "sorted-shard-matrix-lookup": {
  "problemId": "sorted-shard-matrix-lookup",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Start at top-right `(0, n - 1)`: step left if current value `> key`, step down if `< key`.",
  "hints": [
    "Conceptual Intuition: Consider a Top-Right Staircase Search paradigm. Start at top-right `(0, n - 1)`: step left if current value `> key`, step down if `< key`.",
    "Algorithmic Mechanics: Eliminates one full row or column every comparison. Loop while `r < m and c >= 0` narrowing row/col.",
    "Edge Cases & Optimization: Guard `c >= 0` and `r < m`. Ensure time complexity is bounded to O(m + n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Top-Right Staircase Search",
  "approachSteps": [
    "Loop while `r < m and c >= 0` narrowing row/col."
  ],
  "timeComplexity": "O(m + n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Guard `c >= 0` and `r < m`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def shard_contains_key(shards: list[list[int]], key: int) -> bool:\n    m, n = len(shards), len(shards[0])\n    r, c = 0, n - 1\n    while r < m and c >= 0:\n        if shards[r][c] == key: return True\n        if shards[r][c] > key: c -= 1\n        else: r += 1\n    return False\n"
  }
},
  "clinic-appointment-merge": {
  "problemId": "clinic-appointment-merge",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort bookings by start minute and linearly extend the latest merged block whenever `s <= merged[-1][1]`.",
  "hints": [
    "Conceptual Intuition: Consider a Start-Sorted Linear Merge paradigm. Sort bookings by start minute and linearly extend the latest merged block whenever `s <= merged[-1][1]`.",
    "Algorithmic Mechanics: Take `max(merged[-1][1], e)` to handle contained intervals. Sort by `x[0]`, merge overlapping intervals in one pass.",
    "Edge Cases & Optimization: Never blindly overwrite `merged[-1][1] = e`. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Start-Sorted Linear Merge",
  "approachSteps": [
    "Sort by `x[0]`, merge overlapping intervals in one pass."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Never blindly overwrite `merged[-1][1] = e`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def consolidate_bookings(bookings: list[list[int]]) -> list[list[int]]:\n    arr = sorted(bookings, key=lambda x: x[0])\n    res = [list(arr[0])]\n    for s, e in arr[1:]:\n        if s <= res[-1][1]: res[-1][1] = max(res[-1][1], e)\n        else: res.append([s, e])\n    return res\n"
  }
},
  "maintenance-window-insert": {
  "problemId": "maintenance-window-insert",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Emit all windows ending before `patch`, merge all overlapping windows into `[ps, pe]`, then append all remaining windows.",
  "hints": [
    "Conceptual Intuition: Consider a Three-Phase Linear Insertion paradigm. Emit all windows ending before `patch`, merge all overlapping windows into `[ps, pe]`, then append all remaining windows.",
    "Algorithmic Mechanics: Runs in O(n) without re-sorting. Copy strictly earlier windows, fold overlapping ones into `[ps, pe]`, append suffix.",
    "Edge Cases & Optimization: Handle empty `windows` returning `[patch]`. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Three-Phase Linear Insertion",
  "approachSteps": [
    "Copy strictly earlier windows, fold overlapping ones into `[ps, pe]`, append suffix."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Handle empty `windows` returning `[patch]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def insert_patch_window(windows: list[list[int]], patch: list[int]) -> list[list[int]]:\n    res, i, n = [], 0, len(windows)\n    ps, pe = patch\n    while i < n and windows[i][1] < ps:\n        res.append(windows[i]); i += 1\n    while i < n and windows[i][0] <= pe:\n        ps = min(ps, windows[i][0]); pe = max(pe, windows[i][1]); i += 1\n    res.append([ps, pe])\n    res.extend(windows[i:])\n    return res\n"
  }
},
  "satellite-pass-min-drops": {
  "problemId": "satellite-pass-min-drops",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort passes by end time ascending and greedily keep every pass starting at or after the last kept end time.",
  "hints": [
    "Conceptual Intuition: Consider a Earliest-End Activity Selection paradigm. Sort passes by end time ascending and greedily keep every pass starting at or after the last kept end time.",
    "Algorithmic Mechanics: Keeping the earliest-ending pass maximizes remaining dish availability. Sort by `x[1]`, count passes with `s < prev_end`.",
    "Edge Cases & Optimization: Touching endpoints (`s == prev_end`) are valid and not dropped. Ensure time complexity is bounded to O(n log n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Earliest-End Activity Selection",
  "approachSteps": [
    "Sort by `x[1]`, count passes with `s < prev_end`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Touching endpoints (`s == prev_end`) are valid and not dropped."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_dropped_passes(passes: list[list[int]]) -> int:\n    arr = sorted(passes, key=lambda x: x[1])\n    end = arr[0][1]\n    drops = 0\n    for s, e in arr[1:]:\n        if s < end: drops += 1\n        else: end = e\n    return drops\n"
  }
},
  "operating-room-peak-suites": {
  "problemId": "operating-room-peak-suites",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort by start time and track active suite end times in a min-heap, reusing the earliest free suite when `ends[0] <= start`.",
  "hints": [
    "Conceptual Intuition: Consider a Min-Heap Active Suite Tracker paradigm. Sort by start time and track active suite end times in a min-heap, reusing the earliest free suite when `ends[0] <= start`.",
    "Algorithmic Mechanics: Heap size at the end equals the peak concurrent suites. Sort by start; for `[s, e]`, pop `ends[0]` if `<= s`, then push `e`; return `len(ends)`.",
    "Edge Cases & Optimization: Use `<=` so immediate turnover reuses a suite. Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Min-Heap Active Suite Tracker",
  "approachSteps": [
    "Sort by start; for `[s, e]`, pop `ends[0]` if `<= s`, then push `e`; return `len(ends)`."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Use `<=` so immediate turnover reuses a suite."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef min_operating_suites(surgeries: list[list[int]]) -> int:\n    ends = []\n    for s, e in sorted(surgeries):\n        if ends and ends[0] <= s:\n            heapq.heappop(ends)\n        heapq.heappush(ends, e)\n    return len(ends)\n"
  }
},
  "priority-lane-three-tier-sort": {
  "problemId": "priority-lane-three-tier-sort",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use a 3-way Dutch National Flag partition with `lo`, `mid`, `hi` pointers.",
  "hints": [
    "Conceptual Intuition: Consider a Three-Pointer In-Place Partition paradigm. Use a 3-way Dutch National Flag partition with `lo`, `mid`, `hi` pointers.",
    "Algorithmic Mechanics: Do not advance `mid` after swapping with `hi`. Swap `0`s to `lo` (`lo++, mid++`), skip `1`s (`mid++`), swap `2`s to `hi` (`hi--`).",
    "Edge Cases & Optimization: Loop condition must be `mid <= hi`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Three-Pointer In-Place Partition",
  "approachSteps": [
    "Swap `0`s to `lo` (`lo++, mid++`), skip `1`s (`mid++`), swap `2`s to `hi` (`hi--`)."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Loop condition must be `mid <= hi`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def partition_qos_tiers(tiers: list[int]) -> list[int]:\n    lo = mid = 0\n    hi = len(tiers) - 1\n    while mid <= hi:\n        if tiers[mid] == 0:\n            tiers[lo], tiers[mid] = tiers[mid], tiers[lo]\n            lo += 1; mid += 1\n        elif tiers[mid] == 1:\n            mid += 1\n        else:\n            tiers[mid], tiers[hi] = tiers[hi], tiers[mid]\n            hi -= 1\n    return tiers\n"
  }
},
  "telemetry-kth-highest-latency": {
  "problemId": "telemetry-kth-highest-latency",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a min-heap of size `k` so its root always holds the `k`-th largest value seen.",
  "hints": [
    "Conceptual Intuition: Consider a Size-K Min-Heap paradigm. Maintain a min-heap of size `k` so its root always holds the `k`-th largest value seen.",
    "Algorithmic Mechanics: Replace `heap[0]` whenever an incoming latency exceeds `heap[0]`. Heapify `latencies[:k]`, iterate rest replacing root if larger, return `heap[0]`.",
    "Edge Cases & Optimization: Use a min-heap (not max-heap) to retain the top `k` elements. Ensure time complexity is bounded to O(n log k) with O(k) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Size-K Min-Heap",
  "approachSteps": [
    "Heapify `latencies[:k]`, iterate rest replacing root if larger, return `heap[0]`."
  ],
  "timeComplexity": "O(n log k)",
  "spaceComplexity": "O(k)",
  "pitfalls": [
    "Use a min-heap (not max-heap) to retain the top `k` elements."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef kth_highest_latency(latencies: list[int], k: int) -> int:\n    h = latencies[:k]\n    heapq.heapify(h)\n    for x in latencies[k:]:\n        if x > h[0]:\n            heapq.heapreplace(h, x)\n    return h[0]\n"
  }
},
  "sensor-grid-spiral-sweep": {
  "problemId": "sensor-grid-spiral-sweep",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track `top, bottom, left, right` boundaries and peel the four edges clockwise while guarding non-empty rows/columns.",
  "hints": [
    "Conceptual Intuition: Consider a Four-Boundary Spiral Peeling paradigm. Track `top, bottom, left, right` boundaries and peel the four edges clockwise while guarding non-empty rows/columns.",
    "Algorithmic Mechanics: Re-check `top <= bottom` and `left <= right` before bottom and left passes. Traverse top, right, bottom, left shrinking boundaries inward.",
    "Edge Cases & Optimization: Single-row/column grids duplicate elements if inner guards are omitted. Ensure time complexity is bounded to O(m * n) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Four-Boundary Spiral Peeling",
  "approachSteps": [
    "Traverse top, right, bottom, left shrinking boundaries inward."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Single-row/column grids duplicate elements if inner guards are omitted."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def spiral_inspection(cells: list[list[int]]) -> list[int]:\n    t, b, l, r = 0, len(cells) - 1, 0, len(cells[0]) - 1\n    out = []\n    while t <= b and l <= r:\n        for c in range(l, r + 1): out.append(cells[t][c])\n        t += 1\n        for row in range(t, b + 1): out.append(cells[row][r])\n        r -= 1\n        if t <= b:\n            for c in range(r, l - 1, -1): out.append(cells[b][c])\n            b -= 1\n        if l <= r:\n            for row in range(b, t - 1, -1): out.append(cells[row][l])\n            l += 1\n    return out\n"
  }
},
  "blueprint-90-degree-rotation": {
  "problemId": "blueprint-90-degree-rotation",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Transpose `plan` across its main diagonal, then reverse every row in-place.",
  "hints": [
    "Conceptual Intuition: Consider a Transpose + Horizontal Flip paradigm. Transpose `plan` across its main diagonal, then reverse every row in-place.",
    "Algorithmic Mechanics: Only swap upper-triangle entries `j > i` during transpose. Transpose in-place, reverse each row, return `plan`.",
    "Edge Cases & Optimization: Swapping all `(i, j)` cancels the transpose. Ensure time complexity is bounded to O(n^2) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Transpose + Horizontal Flip",
  "approachSteps": [
    "Transpose in-place, reverse each row, return `plan`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Swapping all `(i, j)` cancels the transpose."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def rotate_blueprint(plan: list[list[int]]) -> list[list[int]]:\n    n = len(plan)\n    for i in range(n):\n        for j in range(i + 1, n):\n            plan[i][j], plan[j][i] = plan[j][i], plan[i][j]\n    for row in plan:\n        row.reverse()\n    return plan\n"
  }
},
  "datacenter-rack-fault-mask": {
  "problemId": "datacenter-rack-fault-mask",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use row 0 and column 0 as in-place fault markers plus two booleans for whether row 0 or column 0 originally had a `0`.",
  "hints": [
    "Conceptual Intuition: Consider a Header-Row/Col In-Place Markers paradigm. Use row 0 and column 0 as in-place fault markers plus two booleans for whether row 0 or column 0 originally had a `0`.",
    "Algorithmic Mechanics: Zero interior cells before applying row-0 and col-0 shutdown flags. Save `r0, c0` flags, mark interior faults on row 0/col 0, zero interior, then zero row 0/col 0.",
    "Edge Cases & Optimization: Never zero row 0 before propagating its column markers. Ensure time complexity is bounded to O(m * n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Header-Row/Col In-Place Markers",
  "approachSteps": [
    "Save `r0, c0` flags, mark interior faults on row 0/col 0, zero interior, then zero row 0/col 0."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Never zero row 0 before propagating its column markers."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def isolate_faults(racks: list[list[int]]) -> list[list[int]]:\n    m, n = len(racks), len(racks[0])\n    r0 = any(racks[0][c] == 0 for c in range(n))\n    c0 = any(racks[r][0] == 0 for r in range(m))\n    for r in range(1, m):\n        for c in range(1, n):\n            if racks[r][c] == 0:\n                racks[r][0] = racks[0][c] = 0\n    for r in range(1, m):\n        for c in range(1, n):\n            if racks[r][0] == 0 or racks[0][c] == 0:\n                racks[r][c] = 0\n    if r0:\n        for c in range(n): racks[0][c] = 0\n    if c0:\n        for r in range(m): racks[r][0] = 0\n    return racks\n"
  }
},
  "citation-impact-threshold": {
  "problemId": "citation-impact-threshold",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Binary search the leftmost index `l` where `scores[l] >= n - l` and return `n - l`.",
  "hints": [
    "Conceptual Intuition: Consider a Suffix-Threshold Binary Search paradigm. Binary search the leftmost index `l` where `scores[l] >= n - l` and return `n - l`.",
    "Algorithmic Mechanics: There are `n - mid` apps from `mid` to `n - 1`. Set `l = 0, r = n`; while `l < r`, narrow on `scores[m] >= n - m`; return `n - l`.",
    "Edge Cases & Optimization: Use `r = n` so all-zero arrays return `n - n = 0`. Ensure time complexity is bounded to O(log n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Suffix-Threshold Binary Search",
  "approachSteps": [
    "Set `l = 0, r = n`; while `l < r`, narrow on `scores[m] >= n - m`; return `n - l`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Use `r = n` so all-zero arrays return `n - n = 0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def developer_h_index(scores: list[int]) -> int:\n    n = len(scores)\n    l, r = 0, n\n    while l < r:\n        m = (l + r) // 2\n        if scores[m] >= n - m: r = m\n        else: l = m + 1\n    return n - l\n"
  }
},
  "paired-sensor-lone-reading": {
  "problemId": "paired-sensor-lone-reading",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Snap `mid` to an even index and check `signals[mid] == signals[mid + 1]`: if equal, the unpaired value is right (`l = mid + 2`), else `r = mid`.",
  "hints": [
    "Conceptual Intuition: Consider a Even-Aligned Binary Search paradigm. Snap `mid` to an even index and check `signals[mid] == signals[mid + 1]`: if equal, the unpaired value is right (`l = mid + 2`), else `r = mid`.",
    "Algorithmic Mechanics: Parity of pair start indices flips right at the unpaired element. Ensure `m` is even; advance `l = m + 2` on pair match else `r = m`.",
    "Edge Cases & Optimization: Always snap `m` to even before checking `m + 1`. Ensure time complexity is bounded to O(log n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Even-Aligned Binary Search",
  "approachSteps": [
    "Ensure `m` is even; advance `l = m + 2` on pair match else `r = m`."
  ],
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Always snap `m` to even before checking `m + 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_unpaired_signal(signals: list[int]) -> int:\n    l, r = 0, len(signals) - 1\n    while l < r:\n        m = (l + r) // 2\n        if m % 2 == 1: m -= 1\n        if signals[m] == signals[m + 1]: l = m + 2\n        else: r = m\n    return signals[l]\n"
  }
},
  "two-feed-combined-median": {
  "problemId": "two-feed-combined-median",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Binary search the cut index `i` in the shorter feed so `i + j == (m + n + 1) // 2` and cross-border inequalities `A_l <= B_r` and `B_l <= A_r` hold.",
  "hints": [
    "Conceptual Intuition: Consider a Half-Cut Partition Binary Search paradigm. Binary search the cut index `i` in the shorter feed so `i + j == (m + n + 1) // 2` and cross-border inequalities `A_l <= B_r` and `B_l <= A_r` hold.",
    "Algorithmic Mechanics: Always binary search on the shorter array. Swap so `len(A) <= len(B)`. Binary search cut `i` using `-inf`/`+inf` sentinels.",
    "Edge Cases & Optimization: Return a `float` even when total count is odd. Ensure time complexity is bounded to O(log(min(m, n))) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Half-Cut Partition Binary Search",
  "approachSteps": [
    "Swap so `len(A) <= len(B)`.",
    "Binary search cut `i` using `-inf`/`+inf` sentinels."
  ],
  "timeComplexity": "O(log(min(m, n)))",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Return a `float` even when total count is odd."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def combined_feed_median(feed_a: list[int], feed_b: list[int]) -> float:\n    A, B = feed_a, feed_b\n    if len(A) > len(B): A, B = B, A\n    m, n = len(A), len(B)\n    half = (m + n + 1) // 2\n    l, r = 0, m\n    while l <= r:\n        i = (l + r) // 2\n        j = half - i\n        al = A[i - 1] if i > 0 else float('-inf')\n        ar = A[i] if i < m else float('inf')\n        bl = B[j - 1] if j > 0 else float('-inf')\n        br = B[j] if j < n else float('inf')\n        if al <= br and bl <= ar:\n            if (m + n) % 2 == 1: return float(max(al, bl))\n            return (max(al, bl) + min(ar, br)) / 2.0\n        if al > br: r = i - 1\n        else: l = i + 1\n    return 0.0\n"
  }
},
  "org-chart-mirror-layout": {
  "problemId": "org-chart-mirror-layout",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Deserialize the level-order tree, recursively swap `left` and `right`, and serialize back trimming trailing `None`s.",
  "hints": [
    "Conceptual Intuition: Consider a Recursive Subtree Mirror paradigm. Deserialize the level-order tree, recursively swap `left` and `right`, and serialize back trimming trailing `None`s.",
    "Algorithmic Mechanics: Trim trailing `None` entries from the serialized list. Deserialize -> DFS swap -> BFS serialize & trim.",
    "Edge Cases & Optimization: Handle empty `chart` returning `[]`. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Recursive Subtree Mirror",
  "approachSteps": [
    "Deserialize -> DFS swap -> BFS serialize & trim."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Handle empty `chart` returning `[]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef mirror_org_chart(chart: list) -> list:\n    if not chart or chart[0] is None: return []\n    root = Node(chart[0]); q = deque([root]); i = 1\n    while q and i < len(chart):\n        u = q.popleft()\n        if i < len(chart) and chart[i] is not None: u.l = Node(chart[i]); q.append(u.l)\n        i += 1\n        if i < len(chart) and chart[i] is not None: u.r = Node(chart[i]); q.append(u.r)\n        i += 1\n    def flip(u):\n        if not u: return None\n        u.l, u.r = flip(u.r), flip(u.l)\n        return u\n    root = flip(root)\n    res, q = [], deque([root])\n    while q:\n        u = q.popleft()\n        if u: res.append(u.v); q.append(u.l); q.append(u.r)\n        else: res.append(None)\n    while res and res[-1] is None: res.pop()\n    return res\n"
  }
},
  "org-chart-max-reporting-depth": {
  "problemId": "org-chart-max-reporting-depth",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Compute `1 + max(depth(left), depth(right))` bottom-up.",
  "hints": [
    "Conceptual Intuition: Consider a Recursive Depth DFS paradigm. Compute `1 + max(depth(left), depth(right))` bottom-up.",
    "Algorithmic Mechanics: Base case `None` returns `0`. Deserialize and compute `1 + max(dfs(l), dfs(r))`.",
    "Edge Cases & Optimization: Empty input list returns `0`. Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Recursive Depth DFS",
  "approachSteps": [
    "Deserialize and compute `1 + max(dfs(l), dfs(r))`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Empty input list returns `0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef deepest_chain(tree: list) -> int:\n    if not tree or tree[0] is None: return 0\n    root = Node(tree[0]); q = deque([root]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    def d(u): return 0 if not u else 1 + max(d(u.l), d(u.r))\n    return d(root)\n"
  }
},
  "circuit-tree-longest-wire": {
  "problemId": "circuit-tree-longest-wire",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track `best = max(best, lh + rh)` during a single post-order height DFS.",
  "hints": [
    "Conceptual Intuition: Consider a Post-Order Height & Span Tracking paradigm. Track `best = max(best, lh + rh)` during a single post-order height DFS.",
    "Algorithmic Mechanics: Each call returns `1 + max(lh, rh)`. Deserialize and track `lh + rh` at every node.",
    "Edge Cases & Optimization: Return edge count, not node count. Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Post-Order Height & Span Tracking",
  "approachSteps": [
    "Deserialize and track `lh + rh` at every node."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Return edge count, not node count."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef longest_wire_span(tree: list) -> int:\n    if not tree or tree[0] is None: return 0\n    root = Node(tree[0]); q = deque([root]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    best = 0\n    def h(u):\n        nonlocal best\n        if not u: return 0\n        lh, rh = h(u.l), h(u.r)\n        best = max(best, lh + rh)\n        return 1 + max(lh, rh)\n    h(root)\n    return best\n"
  }
},
  "alert-tree-tier-grouping": {
  "problemId": "alert-tree-tier-grouping",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use a FIFO queue and snapshot `len(q)` at the beginning of each tier.",
  "hints": [
    "Conceptual Intuition: Consider a Tier-Snapshotted BFS paradigm. Use a FIFO queue and snapshot `len(q)` at the beginning of each tier.",
    "Algorithmic Mechanics: Process exactly `len(q)` nodes per tier. Deserialize and run level-order BFS collecting each tier.",
    "Edge Cases & Optimization: Return `[]` for empty input. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Tier-Snapshotted BFS",
  "approachSteps": [
    "Deserialize and run level-order BFS collecting each tier."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Return `[]` for empty input."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef group_by_tier(tree: list) -> list[list[int]]:\n    if not tree or tree[0] is None: return []\n    root = Node(tree[0]); q = deque([root]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    res, q = [], deque([root])\n    while q:\n        tier = []\n        for _ in range(len(q)):\n            u = q.popleft(); tier.append(u.v)\n            if u.l: q.append(u.l)\n            if u.r: q.append(u.r)\n        res.append(tier)\n    return res\n"
  }
},
  "index-tree-bst-integrity": {
  "problemId": "index-tree-bst-integrity",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Propagate strict `(low, high)` bounds down DFS so every node satisfies `low < node.v < high`.",
  "hints": [
    "Conceptual Intuition: Consider a Range-Bounded DFS Audit paradigm. Propagate strict `(low, high)` bounds down DFS so every node satisfies `low < node.v < high`.",
    "Algorithmic Mechanics: Immediate child checks miss ancestor-bound violations. Start with `(-inf, +inf)`, narrow to `(low, u.v)` left and `(u.v, high)` right.",
    "Edge Cases & Optimization: Strict inequality rejects duplicate keys. Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Range-Bounded DFS Audit",
  "approachSteps": [
    "Start with `(-inf, +inf)`, narrow to `(low, u.v)` left and `(u.v, high)` right."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Strict inequality rejects duplicate keys."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef audit_bst_index(tree: list) -> bool:\n    if not tree or tree[0] is None: return True\n    root = Node(tree[0]); q = deque([root]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    def ok(u, lo, hi):\n        if not u: return True\n        return lo < u.v < hi and ok(u.l, lo, u.v) and ok(u.r, u.v, hi)\n    return ok(root, float('-inf'), float('inf'))\n"
  }
},
  "leaderboard-bst-kth-rank": {
  "problemId": "leaderboard-bst-kth-rank",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Perform iterative inorder traversal with an explicit stack and return immediately on the `k`-th popped node.",
  "hints": [
    "Conceptual Intuition: Consider a Early-Exit Iterative Inorder paradigm. Perform iterative inorder traversal with an explicit stack and return immediately on the `k`-th popped node.",
    "Algorithmic Mechanics: Inorder traversal of a BST yields values in ascending order. Push left spines, pop and decrement `k`, return `u.v` when `k == 0`.",
    "Edge Cases & Optimization: `k` is 1-indexed. Ensure time complexity is bounded to O(h + k) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Early-Exit Iterative Inorder",
  "approachSteps": [
    "Push left spines, pop and decrement `k`, return `u.v` when `k == 0`."
  ],
  "timeComplexity": "O(h + k)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "`k` is 1-indexed."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef kth_lowest_score(tree: list, k: int) -> int:\n    root = Node(tree[0]); q = deque([root]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    st, cur = [], root\n    while cur or st:\n        while cur: st.append(cur); cur = cur.l\n        cur = st.pop(); k -= 1\n        if k == 0: return cur.v\n        cur = cur.r\n    return -1\n"
  }
},
  "routing-bst-common-hub": {
  "problemId": "routing-bst-common-hub",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Descend from the root: go left if both `a, b < curr.v`, go right if both `> curr.v`, else `curr.v` is the split hub.",
  "hints": [
    "Conceptual Intuition: Consider a BST Split-Node Descent paradigm. Descend from the root: go left if both `a, b < curr.v`, go right if both `> curr.v`, else `curr.v` is the split hub.",
    "Algorithmic Mechanics: Exploit BST ordering for O(h) descent. Walk down left/right until `a` and `b` split.",
    "Edge Cases & Optimization: Do not assume `a < b`. Ensure time complexity is bounded to O(h) with O(1) auxiliary auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "BST Split-Node Descent",
  "approachSteps": [
    "Walk down left/right until `a` and `b` split."
  ],
  "timeComplexity": "O(h)",
  "spaceComplexity": "O(1) auxiliary",
  "pitfalls": [
    "Do not assume `a < b`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef common_bst_hub(tree: list, a: int, b: int) -> int:\n    root = Node(tree[0]); q = deque([root]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    cur = root\n    while cur:\n        if a < cur.v and b < cur.v: cur = cur.l\n        elif a > cur.v and b > cur.v: cur = cur.r\n        else: return cur.v\n    return -1\n"
  }
},
  "pipeline-tree-peak-profit-path": {
  "problemId": "pipeline-tree-peak-profit-path",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Post-order DFS computes `lg = max(0, gain(left))`, `rg = max(0, gain(right))`, updates `best = max(best, u.v + lg + rg)`, and returns `u.v + max(lg, rg)`.",
  "hints": [
    "Conceptual Intuition: Consider a Post-Order Branch-Gain DP paradigm. Post-order DFS computes `lg = max(0, gain(left))`, `rg = max(0, gain(right))`, updates `best = max(best, u.v + lg + rg)`, and returns `u.v + max(lg, rg)`.",
    "Algorithmic Mechanics: Initialize `best = float('-inf')` for all-negative trees. Clamp negative child gains to `0`, update global peak, return best single branch upward.",
    "Edge Cases & Optimization: Path cannot split into both children when continuing to parent. Ensure time complexity is bounded to O(n) with O(h) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Post-Order Branch-Gain DP",
  "approachSteps": [
    "Clamp negative child gains to `0`, update global peak, return best single branch upward."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(h)",
  "pitfalls": [
    "Path cannot split into both children when continuing to parent."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\nclass Node:\n    def __init__(self, v): self.v = v; self.l = None; self.r = None\n\ndef peak_margin_path(tree: list) -> int:\n    root = Node(tree[0]); q = deque([root]); i = 1\n    while q and i < len(tree):\n        u = q.popleft()\n        if i < len(tree) and tree[i] is not None: u.l = Node(tree[i]); q.append(u.l)\n        i += 1\n        if i < len(tree) and tree[i] is not None: u.r = Node(tree[i]); q.append(u.r)\n        i += 1\n    best = float('-inf')\n    def gain(u):\n        nonlocal best\n        if not u: return 0\n        lg, rg = max(0, gain(u.l)), max(0, gain(u.r))\n        best = max(best, u.v + lg + rg)\n        return u.v + max(lg, rg)\n    gain(root)\n    return best\n"
  }
},
  "autocomplete-prefix-directory": {
  "problemId": "autocomplete-prefix-directory",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Build a nested-dictionary Trie with a terminal marker `'#'` on completed words.",
  "hints": [
    "Conceptual Intuition: Consider a Nested-Dict Prefix Trie paradigm. Build a nested-dictionary Trie with a terminal marker `'#'` on completed words.",
    "Algorithmic Mechanics: `exact` requires `'#' in node`; `prefix` only requires reaching the end of `pre`. Walk/create dicts on `add`; traverse on `exact` and `prefix`.",
    "Edge Cases & Optimization: Never confuse prefix presence with full-word membership. Ensure time complexity is bounded to O(L) per command with O(total chars) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Nested-Dict Prefix Trie",
  "approachSteps": [
    "Walk/create dicts on `add`; traverse on `exact` and `prefix`."
  ],
  "timeComplexity": "O(L) per command",
  "spaceComplexity": "O(total chars)",
  "pitfalls": [
    "Never confuse prefix presence with full-word membership."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def run_prefix_dir(cmds: list[list[str]]) -> list[bool]:\n    root, out = {}, []\n    for cmd, w in cmds:\n        if cmd == 'add':\n            cur = root\n            for ch in w: cur = cur.setdefault(ch, {})\n            cur['#'] = True\n        else:\n            cur, ok = root, True\n            for ch in w:\n                if ch not in cur: ok = False; break\n                cur = cur[ch]\n            out.append(ok and ('#' in cur if cmd == 'exact' else True))\n    return out\n"
  }
},
  "solar-farm-panel-clusters": {
  "problemId": "solar-farm-panel-clusters",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Scan all grid cells; on each `'1'`, increment `clusters` and BFS-flood-fill its 4-directional component to `'0'`.",
  "hints": [
    "Conceptual Intuition: Consider a Grid Component BFS paradigm. Scan all grid cells; on each `'1'`, increment `clusters` and BFS-flood-fill its 4-directional component to `'0'`.",
    "Algorithmic Mechanics: Mark cells `'0'` upon enqueueing to avoid duplicate queue items. Loop over grid; flood-fill each unvisited `'1'`.",
    "Edge Cases & Optimization: Diagonal adjacency does not merge clusters. Ensure time complexity is bounded to O(m * n) with O(m * n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Grid Component BFS",
  "approachSteps": [
    "Loop over grid; flood-fill each unvisited `'1'`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Diagonal adjacency does not merge clusters."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef count_panel_clusters(panels: list[list[str]]) -> int:\n    m, n = len(panels), len(panels[0])\n    g = [row[:] for row in panels]\n    cnt = 0\n    for r in range(m):\n        for c in range(n):\n            if g[r][c] == '1':\n                cnt += 1; g[r][c] = '0'\n                q = deque([(r, c)])\n                while q:\n                    cr, cc = q.popleft()\n                    for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n                        nr, nc = cr + dr, cc + dc\n                        if 0 <= nr < m and 0 <= nc < n and g[nr][nc] == '1':\n                            g[nr][nc] = '0'; q.append((nr, nc))\n    return cnt\n"
  }
},
  "server-rack-thermal-spread": {
  "problemId": "server-rack-thermal-spread",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Seed multi-source BFS with all initial `2`s and count minutes while `q and healthy > 0`.",
  "hints": [
    "Conceptual Intuition: Consider a Multi-Source Level BFS paradigm. Seed multi-source BFS with all initial `2`s and count minutes while `q and healthy > 0`.",
    "Algorithmic Mechanics: Return `0` immediately if there are no healthy racks. Count `healthy`, enqueue all `2`s, expand wave by wave until `healthy == 0`.",
    "Edge Cases & Optimization: Stop expanding once `healthy == 0` so no extra minute is added. Ensure time complexity is bounded to O(m * n) with O(m * n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Multi-Source Level BFS",
  "approachSteps": [
    "Count `healthy`, enqueue all `2`s, expand wave by wave until `healthy == 0`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(m * n)",
  "pitfalls": [
    "Stop expanding once `healthy == 0` so no extra minute is added."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef thermal_spread_minutes(hall: list[list[int]]) -> int:\n    m, n = len(hall), len(hall[0])\n    g = [row[:] for row in hall]\n    q, healthy = deque(), 0\n    for r in range(m):\n        for c in range(n):\n            if g[r][c] == 2: q.append((r, c))\n            elif g[r][c] == 1: healthy += 1\n    mins = 0\n    while q and healthy > 0:\n        mins += 1\n        for _ in range(len(q)):\n            r, c = q.popleft()\n            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < m and 0 <= nc < n and g[nr][nc] == 1:\n                    g[nr][nc] = 2; healthy -= 1; q.append((nr, nc))\n    return mins if healthy == 0 else -1\n"
  }
},
  "build-pipeline-cycle-check": {
  "problemId": "build-pipeline-cycle-check",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use Kahn's BFS topological sort; return `True` iff all `num_pkgs` nodes are emitted.",
  "hints": [
    "Conceptual Intuition: Consider a Kahn's Indegree Queue paradigm. Use Kahn's BFS topological sort; return `True` iff all `num_pkgs` nodes are emitted.",
    "Algorithmic Mechanics: Add directed edge `b -> a` and increment `indeg[a]`. Enqueue zero-indegree nodes, pop and decrement dependents, compare `built == num_pkgs`.",
    "Edge Cases & Optimization: Check edge direction `b -> a`. Ensure time complexity is bounded to O(V + E) with O(V + E) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Kahn's Indegree Queue",
  "approachSteps": [
    "Enqueue zero-indegree nodes, pop and decrement dependents, compare `built == num_pkgs`."
  ],
  "timeComplexity": "O(V + E)",
  "spaceComplexity": "O(V + E)",
  "pitfalls": [
    "Check edge direction `b -> a`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef can_build_all(num_pkgs: int, deps: list[list[int]]) -> bool:\n    adj = [[] for _ in range(num_pkgs)]\n    indeg = [0] * num_pkgs\n    for a, b in deps:\n        adj[b].append(a); indeg[a] += 1\n    q = deque(i for i in range(num_pkgs) if indeg[i] == 0)\n    built = 0\n    while q:\n        u = q.popleft(); built += 1\n        for v in adj[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0: q.append(v)\n    return built == num_pkgs\n"
  }
},
  "build-pipeline-execution-order": {
  "problemId": "build-pipeline-execution-order",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run Kahn's topological sort using a min-heap of ready packages to guarantee the lexicographically smallest build schedule.",
  "hints": [
    "Conceptual Intuition: Consider a Min-Heap Lexicographic Topological Sort paradigm. Run Kahn's topological sort using a min-heap of ready packages to guarantee the lexicographically smallest build schedule.",
    "Algorithmic Mechanics: Return `[]` when `len(order) != num_pkgs`. Push zero-indegree nodes into min-heap, pop smallest, unlock neighbors.",
    "Edge Cases & Optimization: Return `[]` on cycle. Ensure time complexity is bounded to O((V + E) log V) with O(V + E) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Min-Heap Lexicographic Topological Sort",
  "approachSteps": [
    "Push zero-indegree nodes into min-heap, pop smallest, unlock neighbors."
  ],
  "timeComplexity": "O((V + E) log V)",
  "spaceComplexity": "O(V + E)",
  "pitfalls": [
    "Return `[]` on cycle."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef build_schedule(num_pkgs: int, deps: list[list[int]]) -> list[int]:\n    adj = [[] for _ in range(num_pkgs)]\n    indeg = [0] * num_pkgs\n    for a, b in deps:\n        adj[b].append(a); indeg[a] += 1\n    h = [i for i in range(num_pkgs) if indeg[i] == 0]\n    heapq.heapify(h)\n    order = []\n    while h:\n        u = heapq.heappop(h); order.append(u)\n        for v in adj[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0: heapq.heappush(h, v)\n    return order if len(order) == num_pkgs else []\n"
  }
},
  "mesh-broadcast-propagation-time": {
  "problemId": "mesh-broadcast-propagation-time",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run Dijkstra from `origin` with a min-heap; return `max(dist.values())` if all `n` servers are reached, else `-1`.",
  "hints": [
    "Conceptual Intuition: Consider a Dijkstra Shortest-Latency Broadcast paradigm. Run Dijkstra from `origin` with a min-heap; return `max(dist.values())` if all `n` servers are reached, else `-1`.",
    "Algorithmic Mechanics: Skip popped entries with `d > dist[u]`. Build directed adjacency list, run min-heap Dijkstra, check `len(dist) == n`.",
    "Edge Cases & Optimization: Return `0` when `n == 1`. Ensure time complexity is bounded to O(E log V) with O(V + E) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Dijkstra Shortest-Latency Broadcast",
  "approachSteps": [
    "Build directed adjacency list, run min-heap Dijkstra, check `len(dist) == n`."
  ],
  "timeComplexity": "O(E log V)",
  "spaceComplexity": "O(V + E)",
  "pitfalls": [
    "Return `0` when `n == 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\nfrom collections import defaultdict\n\ndef broadcast_convergence(links: list[list[int]], n: int, origin: int) -> int:\n    adj = defaultdict(list)\n    for u, v, w in links: adj[u].append((v, w))\n    dist = {origin: 0}\n    h = [(0, origin)]\n    while h:\n        d, u = heapq.heappop(h)\n        if d > dist[u]: continue\n        for v, w in adj[u]:\n            nd = d + w\n            if nd < dist.get(v, float('inf')):\n                dist[v] = nd; heapq.heappush(h, (nd, v))\n    return max(dist.values()) if len(dist) == n else -1\n"
  }
},
  "fiber-network-redundant-link": {
  "problemId": "fiber-network-redundant-link",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Process cables sequentially with Union-Find; the first cable whose endpoints already share a root closes the cycle.",
  "hints": [
    "Conceptual Intuition: Consider a Disjoint Set Union Cycle Detector paradigm. Process cables sequentially with Union-Find; the first cable whose endpoints already share a root closes the cycle.",
    "Algorithmic Mechanics: Hubs are 1-indexed (`1.n`). For `[u, v]`, if `find(u) == find(v)`, return `[u, v]`; else union.",
    "Edge Cases & Optimization: Allocate `parent` of size `len(cables) + 1`. Ensure time complexity is bounded to O(n * alpha(n)) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Disjoint Set Union Cycle Detector",
  "approachSteps": [
    "For `[u, v]`, if `find(u) == find(v)`, return `[u, v]`; else union."
  ],
  "timeComplexity": "O(n * alpha(n))",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Allocate `parent` of size `len(cables) + 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_redundant_cable(cables: list[list[int]]) -> list[int]:\n    p = list(range(len(cables) + 1))\n    def find(x):\n        while p[x] != x:\n            p[x] = p[p[x]]; x = p[x]\n        return x\n    for u, v in cables:\n        ru, rv = find(u), find(v)\n        if ru == rv: return [u, v]\n        p[ru] = rv\n    return []\n"
  }
},
  "two-team-conflict-partition": {
  "problemId": "two-team-conflict-partition",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "2-color every connected component via BFS; any edge connecting two same-colored nodes proves no 2-shift split exists.",
  "hints": [
    "Conceptual Intuition: Consider a BFS Bipartite Two-Coloring paradigm. 2-color every connected component via BFS; any edge connecting two same-colored nodes proves no 2-shift split exists.",
    "Algorithmic Mechanics: Iterate over all nodes to handle disconnected components. For each uncolored node, BFS alternating colors `0` and `1` and check conflicts.",
    "Edge Cases & Optimization: Disconnected components must each be colored. Ensure time complexity is bounded to O(V + E) with O(V) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "BFS Bipartite Two-Coloring",
  "approachSteps": [
    "For each uncolored node, BFS alternating colors `0` and `1` and check conflicts."
  ],
  "timeComplexity": "O(V + E)",
  "spaceComplexity": "O(V)",
  "pitfalls": [
    "Disconnected components must each be colored."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef can_split_shifts(conflicts: list[list[int]]) -> bool:\n    n = len(conflicts)\n    col = [-1] * n\n    for i in range(n):\n        if col[i] != -1: continue\n        col[i] = 0; q = deque([i])\n        while q:\n            u = q.popleft()\n            for v in conflicts[u]:\n                if col[v] == -1: col[v] = 1 - col[u]; q.append(v)\n                elif col[v] == col[u]: return False\n    return True\n"
  }
},
  "airline-budget-k-layovers": {
  "problemId": "airline-budget-k-layovers",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run `max_layovers + 1` rounds of Bellman-Ford using a fresh distance snapshot each round.",
  "hints": [
    "Conceptual Intuition: Consider a K+1 Round Snapshot Bellman-Ford paradigm. Run `max_layovers + 1` rounds of Bellman-Ford using a fresh distance snapshot each round.",
    "Algorithmic Mechanics: Copying `dist` each round enforces at most 1 new edge per round. Relax all edges `max_layovers + 1` times from `dist` into `nxt`.",
    "Edge Cases & Optimization: In-place updates within a round violate the layover cap. Ensure time complexity is bounded to O(k * E) with O(V) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "K+1 Round Snapshot Bellman-Ford",
  "approachSteps": [
    "Relax all edges `max_layovers + 1` times from `dist` into `nxt`."
  ],
  "timeComplexity": "O(k * E)",
  "spaceComplexity": "O(V)",
  "pitfalls": [
    "In-place updates within a round violate the layover cap."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def cheapest_charter(n: int, legs: list[list[int]], src: int, dst: int, max_layovers: int) -> int:\n    INF = float('inf')\n    dist = [INF] * n; dist[src] = 0\n    for _ in range(max_layovers + 1):\n        nxt = dist[:]\n        for u, v, w in legs:\n            if dist[u] != INF and dist[u] + w < nxt[v]:\n                nxt[v] = dist[u] + w\n        dist = nxt\n    return -1 if dist[dst] == INF else dist[dst]\n"
  }
},
  "campus-fiber-minimum-trench": {
  "problemId": "campus-fiber-minimum-trench",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run O(n^2) dense Prim's MST algorithm computing Manhattan distances on the fly without materializing O(n^2) edges.",
  "hints": [
    "Conceptual Intuition: Consider a Dense-Graph Prim's MST paradigm. Run O(n^2) dense Prim's MST algorithm computing Manhattan distances on the fly without materializing O(n^2) edges.",
    "Algorithmic Mechanics: Track `best[i]` = cheapest Manhattan edge from building `i` to the visited MST. Repeat `n` times: pick closest unvisited building, add its distance, relax remaining unvisited buildings.",
    "Edge Cases & Optimization: Handle `n == 1` returning `0`. Ensure time complexity is bounded to O(n^2) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Dense-Graph Prim's MST",
  "approachSteps": [
    "Repeat `n` times: pick closest unvisited building, add its distance, relax remaining unvisited buildings."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Handle `n == 1` returning `0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_trench_length(coords: list[list[int]]) -> int:\n    n = len(coords)\n    vis = [False] * n\n    dist = [float('inf')] * n; dist[0] = 0\n    total = 0\n    for _ in range(n):\n        u = -1\n        for i in range(n):\n            if not vis[i] and (u == -1 or dist[i] < dist[u]): u = i\n        vis[u] = True; total += dist[u]\n        x1, y1 = coords[u]\n        for v in range(n):\n            if not vis[v]:\n                d = abs(x1 - coords[v][0]) + abs(y1 - coords[v][1])\n                if d < dist[v]: dist[v] = d\n    return total\n"
  }
},
  "warehouse-robot-clear-corridor": {
  "problemId": "warehouse-robot-clear-corridor",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run 8-directional BFS starting at `(0, 0, 1)` after checking both endpoints are open (`0`).",
  "hints": [
    "Conceptual Intuition: Consider a 8-Way Unweighted BFS paradigm. Run 8-directional BFS starting at `(0, 0, 1)` after checking both endpoints are open (`0`).",
    "Algorithmic Mechanics: Mark cells visited when enqueued. Check endpoints; BFS 8 neighbors returning `d` at `(n - 1, n - 1)`.",
    "Edge Cases & Optimization: Return `1` for `[[0]]`. Ensure time complexity is bounded to O(n^2) with O(n^2) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "8-Way Unweighted BFS",
  "approachSteps": [
    "Check endpoints; BFS 8 neighbors returning `d` at `(n - 1, n - 1)`."
  ],
  "timeComplexity": "O(n^2)",
  "spaceComplexity": "O(n^2)",
  "pitfalls": [
    "Return `1` for `[[0]]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import deque\n\ndef shortest_rover_path(floor: list[list[int]]) -> int:\n    n = len(floor)\n    if floor[0][0] or floor[n - 1][n - 1]: return -1\n    g = [row[:] for row in floor]; g[0][0] = 1\n    q = deque([(0, 0, 1)])\n    dirs = ((-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1))\n    while q:\n        r, c, d = q.popleft()\n        if r == n - 1 and c == n - 1: return d\n        for dr, dc in dirs:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < n and 0 <= nc < n and g[nr][nc] == 0:\n                g[nr][nc] = 1; q.append((nr, nc, d + 1))\n    return -1\n"
  }
},
  "flood-zone-escape-elevation": {
  "problemId": "flood-zone-escape-elevation",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run minimax Dijkstra using a min-heap ordered by `max_elevation_along_path`.",
  "hints": [
    "Conceptual Intuition: Consider a Minimax Elevation Dijkstra paradigm. Run minimax Dijkstra using a min-heap ordered by `max_elevation_along_path`.",
    "Algorithmic Mechanics: Start heap with `(elev[0][0], 0, 0)`. Pop lowest peak level, push unvisited 4-neighbors with `max(lvl, elev[nr][nc])`, stop at `(n - 1, n - 1)`.",
    "Edge Cases & Optimization: Must account for `elev[0][0]` as the minimum starting water level. Ensure time complexity is bounded to O(n^2 log n) with O(n^2) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Minimax Elevation Dijkstra",
  "approachSteps": [
    "Pop lowest peak level, push unvisited 4-neighbors with `max(lvl, elev[nr][nc])`, stop at `(n - 1, n - 1)`."
  ],
  "timeComplexity": "O(n^2 log n)",
  "spaceComplexity": "O(n^2)",
  "pitfalls": [
    "Must account for `elev[0][0]` as the minimum starting water level."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef min_crossing_level(elev: list[list[int]]) -> int:\n    n = len(elev)\n    vis = {(0, 0)}\n    h = [(elev[0][0], 0, 0)]\n    while h:\n        lvl, r, c = heapq.heappop(h)\n        if r == n - 1 and c == n - 1: return lvl\n        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in vis:\n                vis.add((nr, nc))\n                heapq.heappush(h, (max(lvl, elev[nr][nc]), nr, nc))\n    return -1\n"
  }
},
  "stairway-step-combinations": {
  "problemId": "stairway-step-combinations",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Each step count follows the Fibonacci recurrence `f(k) = f(k - 1) + f(k - 2)` in O(1) space.",
  "hints": [
    "Conceptual Intuition: Consider a Rolling Two-State Fibonacci DP paradigm. Each step count follows the Fibonacci recurrence `f(k) = f(k - 1) + f(k - 2)` in O(1) space.",
    "Algorithmic Mechanics: Track only the previous two values `a` and `b`. Start `a, b = 1, 1`; iterate `steps - 1` times updating `a, b = b, a + b`.",
    "Edge Cases & Optimization: Unmemoized recursion times out for `steps = 45`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Rolling Two-State Fibonacci DP",
  "approachSteps": [
    "Start `a, b = 1, 1`; iterate `steps - 1` times updating `a, b = b, a + b`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Unmemoized recursion times out for `steps = 45`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_stride_plans(steps: int) -> int:\n    a, b = 1, 1\n    for _ in range(steps - 1):\n        a, b = b, a + b\n    return b\n"
  }
},
  "windmill-nonadjacent-yield": {
  "problemId": "windmill-nonadjacent-yield",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "At each site `w`, choose `max(skip, take)` via `p2, p1 = p1, max(p1, p2 + w)`.",
  "hints": [
    "Conceptual Intuition: Consider a O(1)-Space Linear DP paradigm. At each site `w`, choose `max(skip, take)` via `p2, p1 = p1, max(p1, p2 + w)`.",
    "Algorithmic Mechanics: Never assume optimal selection alternates strictly every other site. Initialize `p2 = p1 = 0`, iterate `w` updating `p2, p1 = p1, max(p1, p2 + w)`.",
    "Edge Cases & Optimization: Handle single-site arrays cleanly. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "O(1)-Space Linear DP",
  "approachSteps": [
    "Initialize `p2 = p1 = 0`, iterate `w` updating `p2, p1 = p1, max(p1, p2 + w)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle single-site arrays cleanly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def max_turbine_yield(megawatts: list[int]) -> int:\n    p2 = p1 = 0\n    for w in megawatts:\n        p2, p1 = p1, max(p1, p2 + w)\n    return p1\n"
  }
},
  "vending-machine-min-coins": {
  "problemId": "vending-machine-min-coins",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Build bottom-up `dp[a]` = minimum tokens for sum `a` across all `d` in `denoms`.",
  "hints": [
    "Conceptual Intuition: Consider a Unbounded Knapsack Min-Count DP paradigm. Build bottom-up `dp[a]` = minimum tokens for sum `a` across all `d` in `denoms`.",
    "Algorithmic Mechanics: Greedy fails for non-canonical denominations like `[1, 3, 4]`. Initialize `dp = [due + 1] * (due + 1)` with `dp[0] = 0`; relax `dp[a] = min(dp[a], dp[a - d] + 1)`.",
    "Edge Cases & Optimization: Return `0` when `due == 0`. Ensure time complexity is bounded to O(due * len(denoms)) with O(due) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Unbounded Knapsack Min-Count DP",
  "approachSteps": [
    "Initialize `dp = [due + 1] * (due + 1)` with `dp[0] = 0`; relax `dp[a] = min(dp[a], dp[a - d] + 1)`."
  ],
  "timeComplexity": "O(due * len(denoms))",
  "spaceComplexity": "O(due)",
  "pitfalls": [
    "Return `0` when `due == 0`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_tokens(denoms: list[int], due: int) -> int:\n    dp = [due + 1] * (due + 1)\n    dp[0] = 0\n    for d in denoms:\n        for a in range(d, due + 1):\n            if dp[a - d] + 1 < dp[a]:\n                dp[a] = dp[a - d] + 1\n    return dp[due] if dp[due] <= due else -1\n"
  }
},
  "sensor-strictly-rising-trend": {
  "problemId": "sensor-strictly-rising-trend",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain minimal tail values `tails` of increasing subsequences by length and update each element via `bisect_left` in O(n log n).",
  "hints": [
    "Conceptual Intuition: Consider a Patience Sorting Binary Search paradigm. Maintain minimal tail values `tails` of increasing subsequences by length and update each element via `bisect_left` in O(n log n).",
    "Algorithmic Mechanics: Use `bisect_left` for strictly increasing order. For each `x`, find `i = bisect_left(tails, x)` and replace or append.",
    "Edge Cases & Optimization: `bisect_right` would allow equal elements (non-decreasing). Ensure time complexity is bounded to O(n log n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Patience Sorting Binary Search",
  "approachSteps": [
    "For each `x`, find `i = bisect_left(tails, x)` and replace or append."
  ],
  "timeComplexity": "O(n log n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "`bisect_right` would allow equal elements (non-decreasing)."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import bisect\n\ndef longest_rising_trend(rev: list[int]) -> int:\n    tails = []\n    for x in rev:\n        i = bisect.bisect_left(tails, x)\n        if i == len(tails): tails.append(x)\n        else: tails[i] = x\n    return len(tails)\n"
  }
},
  "dna-primer-shared-backbone": {
  "problemId": "dna-primer-shared-backbone",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Use a rolling 1D DP row updating `curr[j + 1] = prev[j] + 1` on base match and `max(prev[j + 1], curr[j])` on mismatch.",
  "hints": [
    "Conceptual Intuition: Consider a Rolling-Row Sequence Alignment DP paradigm. Use a rolling 1D DP row updating `curr[j + 1] = prev[j] + 1` on base match and `max(prev[j + 1], curr[j])` on mismatch.",
    "Algorithmic Mechanics: Keep `prev` and `curr` separate to preserve the diagonal entry. Iterate over characters of `strand_a` updating a length `len(strand_b) + 1` row.",
    "Edge Cases & Optimization: In-place overwrites corrupt `prev[j]` unless iterated backward. Ensure time complexity is bounded to O(m * n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Rolling-Row Sequence Alignment DP",
  "approachSteps": [
    "Iterate over characters of `strand_a` updating a length `len(strand_b) + 1` row."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "In-place overwrites corrupt `prev[j]` unless iterated backward."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def shared_backbone_len(strand_a: str, strand_b: str) -> int:\n    n = len(strand_b)\n    prev = [0] * (n + 1)\n    for a in strand_a:\n        curr = [0] * (n + 1)\n        for j, b in enumerate(strand_b):\n            curr[j + 1] = prev[j] + 1 if a == b else max(prev[j + 1], curr[j])\n        prev = curr\n    return prev[n]\n"
  }
},
  "spellcheck-minimum-edits": {
  "problemId": "spellcheck-minimum-edits",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Compute Levenshtein edit distance via rolling 1D DP rows.",
  "hints": [
    "Conceptual Intuition: Consider a Levenshtein Rolling-Row DP paradigm. Compute Levenshtein edit distance via rolling 1D DP rows.",
    "Algorithmic Mechanics: Base row is `[0, 1, 2, ., len(target)]`. Match copies diagonal `prev[j - 1]`; mismatch takes `1 + min(prev[j], curr[j - 1], prev[j - 1])`.",
    "Edge Cases & Optimization: Initialize `curr[0] = i` on each row. Ensure time complexity is bounded to O(m * n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Levenshtein Rolling-Row DP",
  "approachSteps": [
    "Match copies diagonal `prev[j - 1]`; mismatch takes `1 + min(prev[j], curr[j - 1], prev[j - 1])`."
  ],
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Initialize `curr[0] = i` on each row."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_keystroke_edits(typed: str, target: str) -> int:\n    n = len(target)\n    prev = list(range(n + 1))\n    for i, a in enumerate(typed, 1):\n        curr = [i] + [0] * n\n        for j, b in enumerate(target, 1):\n            curr[j] = prev[j - 1] if a == b else 1 + min(prev[j], curr[j - 1], prev[j - 1])\n        prev = curr\n    return prev[n]\n"
  }
},
  "url-slug-dictionary-split": {
  "problemId": "url-slug-dictionary-split",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Let `dp[i]` indicate whether `slug[:i]` is segmentable; check suffix lengths up to `max_word_len` against a hash set of `lexicon`.",
  "hints": [
    "Conceptual Intuition: Consider a Bounded-Suffix Reachability DP paradigm. Let `dp[i]` indicate whether `slug[:i]` is segmentable; check suffix lengths up to `max_word_len` against a hash set of `lexicon`.",
    "Algorithmic Mechanics: Seed `dp[0] = True` and cap inner loop by `max_len`. Build `word_set` and `max_len`; fill `dp[1.n]`.",
    "Edge Cases & Optimization: Greedy longest-prefix matching fails on overlapping words like `[\"aaaa\", \"aaa\"]`. Ensure time complexity is bounded to O(n * L^2) with O(n + D) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bounded-Suffix Reachability DP",
  "approachSteps": [
    "Build `word_set` and `max_len`; fill `dp[1..n]`."
  ],
  "timeComplexity": "O(n * L^2)",
  "spaceComplexity": "O(n + D)",
  "pitfalls": [
    "Greedy longest-prefix matching fails on overlapping words like `[\"aaaa\", \"aaa\"]`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def can_segment_slug(slug: str, lexicon: list[str]) -> bool:\n    ws = set(lexicon)\n    ml = max((len(w) for w in ws), default=0)\n    n = len(slug)\n    dp = [False] * (n + 1); dp[0] = True\n    for i in range(1, n + 1):\n        for j in range(max(0, i - ml), i):\n            if dp[j] and slug[j:i] in ws:\n                dp[i] = True; break\n    return dp[n]\n"
  }
},
  "cargo-twin-container-balance": {
  "problemId": "cargo-twin-container-balance",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Check `sum(crates) % 2 == 0`, then track reachable subset sums up to `total // 2` using a bitmask `bits |= bits << w`.",
  "hints": [
    "Conceptual Intuition: Consider a Bitset 0/1 Subset-Sum DP paradigm. Check `sum(crates) % 2 == 0`, then track reachable subset sums up to `total // 2` using a bitmask `bits |= bits << w`.",
    "Algorithmic Mechanics: Odd total weight is immediately impossible. Start `bits = 1`, shift-OR every crate weight, check bit `total // 2`.",
    "Edge Cases & Optimization: Return `False` immediately for odd total weight. Ensure time complexity is bounded to O(n * target / w) with O(target / w) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bitset 0/1 Subset-Sum DP",
  "approachSteps": [
    "Start `bits = 1`, shift-OR every crate weight, check bit `total // 2`."
  ],
  "timeComplexity": "O(n * target / w)",
  "spaceComplexity": "O(target / w)",
  "pitfalls": [
    "Return `False` immediately for odd total weight."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def can_balance_pods(crates: list[int]) -> bool:\n    tot = sum(crates)\n    if tot % 2 != 0: return False\n    bits = 1\n    for w in crates:\n        bits |= bits << w\n    return bool((bits >> (tot // 2)) & 1)\n"
  }
},
  "drone-grid-route-count": {
  "problemId": "drone-grid-route-count",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Roll a 1D row of path counts initialized to `[1] * cols`, updating `dp[c] += dp[c - 1]` for each remaining row.",
  "hints": [
    "Conceptual Intuition: Consider a 1D Rolling Grid DP paradigm. Roll a 1D row of path counts initialized to `[1] * cols`, updating `dp[c] += dp[c - 1]` for each remaining row.",
    "Algorithmic Mechanics: Equivalently `math.comb(rows + cols - 2, rows - 1)`. Initialize `dp = [1] * cols`; accumulate left neighbor across `rows - 1` rows.",
    "Edge Cases & Optimization: A 1xN or Nx1 corridor has exactly `1` path. Ensure time complexity is bounded to O(rows * cols) with O(cols) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "1D Rolling Grid DP",
  "approachSteps": [
    "Initialize `dp = [1] * cols`; accumulate left neighbor across `rows - 1` rows."
  ],
  "timeComplexity": "O(rows * cols)",
  "spaceComplexity": "O(cols)",
  "pitfalls": [
    "A 1xN or Nx1 corridor has exactly `1` path."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_flight_paths(rows: int, cols: int) -> int:\n    dp = [1] * cols\n    for _ in range(rows - 1):\n        for c in range(1, cols):\n            dp[c] += dp[c - 1]\n    return dp[-1]\n"
  }
},
  "compound-return-peak-streak": {
  "problemId": "compound-return-peak-streak",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track both `cur_max` and `cur_min` ending at each day because multiplying by a negative swaps their roles.",
  "hints": [
    "Conceptual Intuition: Consider a Dual Min/Max Streak DP paradigm. Track both `cur_max` and `cur_min` ending at each day because multiplying by a negative swaps their roles.",
    "Algorithmic Mechanics: Compute `cur_max * x` and `cur_min * x` before overwriting either variable. Initialize `hi = lo = best = factors[0]`; update `(hi, lo)` over `(x, hi*x, lo*x)`.",
    "Edge Cases & Optimization: Handle single negative element returning itself. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Dual Min/Max Streak DP",
  "approachSteps": [
    "Initialize `hi = lo = best = factors[0]`; update `(hi, lo)` over `(x, hi*x, lo*x)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Handle single negative element returning itself."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def peak_factor_product(factors: list[int]) -> int:\n    hi = lo = best = factors[0]\n    for x in factors[1:]:\n        a, b = hi * x, lo * x\n        hi, lo = max(x, a, b), min(x, a, b)\n        if hi > best: best = hi\n    return best\n"
  }
},
  "relay-tower-end-to-end-reach": {
  "problemId": "relay-tower-end-to-end-reach",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sweep left-to-right maintaining the farthest reachable tower index `reach`; return `False` if any index `i > reach`.",
  "hints": [
    "Conceptual Intuition: Consider a Greedy Farthest-Reach Scan paradigm. Sweep left-to-right maintaining the farthest reachable tower index `reach`; return `False` if any index `i > reach`.",
    "Algorithmic Mechanics: Single-tower chain `[0]` already starts at the last tower. Track `reach = max(reach, i + r)`; return `False` if `i > reach`.",
    "Edge Cases & Optimization: Check `i > reach` BEFORE updating `reach`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Greedy Farthest-Reach Scan",
  "approachSteps": [
    "Track `reach = max(reach, i + r)`; return `False` if `i > reach`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Check `i > reach` BEFORE updating `reach`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def can_reach_last_tower(ranges: list[int]) -> bool:\n    reach = 0\n    for i, r in enumerate(ranges):\n        if i > reach: return False\n        if i + r > reach: reach = i + r\n    return True\n"
  }
},
  "ev-charging-loop-start-station": {
  "problemId": "ev-charging-loop-start-station",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Track total net energy and current battery `tank`; whenever `tank < 0`, reset `start = i + 1` and `tank = 0`. Return `start` if `total >= 0` else `-1`.",
  "hints": [
    "Conceptual Intuition: Consider a Single-Pass Deficit Reset paradigm. Track total net energy and current battery `tank`; whenever `tank < 0`, reset `start = i + 1` and `tank = 0`. Return `start` if `total >= 0` else `-1`.",
    "Algorithmic Mechanics: No depot inside a failing prefix can succeed either. Accumulate `total` and `tank`; reset `start = i + 1` whenever `tank < 0`.",
    "Edge Cases & Optimization: Must check `total >= 0` before returning `start`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Single-Pass Deficit Reset",
  "approachSteps": [
    "Accumulate `total` and `tank`; reset `start = i + 1` whenever `tank < 0`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Must check `total >= 0` before returning `start`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_start_depot(charge: list[int], drain: list[int]) -> int:\n    tot = tank = start = 0\n    for i in range(len(charge)):\n        d = charge[i] - drain[i]\n        tot += d; tank += d\n        if tank < 0:\n            start = i + 1; tank = 0\n    return start if tot >= 0 else -1\n"
  }
},
  "gpu-job-cooldown-scheduler": {
  "problemId": "gpu-job-cooldown-scheduler",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Let `mf` be the max kernel count and `mc` be how many kernels hit `mf`; return `max(len(kernels), (mf - 1) * (cooldown + 1) + mc)`.",
  "hints": [
    "Conceptual Intuition: Consider a Frequency-Frame Closed-Form Formula paradigm. Let `mf` be the max kernel count and `mc` be how many kernels hit `mf`; return `max(len(kernels), (mf - 1) * (cooldown + 1) + mc)`.",
    "Algorithmic Mechanics: The most frequent kernels dictate the frame skeleton. Count frequencies, compute `mf` and `mc`, return `max(len(kernels), (mf - 1) * (cooldown + 1) + mc)`.",
    "Edge Cases & Optimization: Never return less than `len(kernels)`. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Frequency-Frame Closed-Form Formula",
  "approachSteps": [
    "Count frequencies, compute `mf` and `mc`, return `max(len(kernels), (mf - 1) * (cooldown + 1) + mc)`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Never return less than `len(kernels)`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "from collections import Counter\n\ndef min_gpu_cycles(kernels: list[str], cooldown: int) -> int:\n    c = Counter(kernels)\n    mf = max(c.values())\n    mc = sum(1 for v in c.values() if v == mf)\n    return max(len(kernels), (mf - 1) * (cooldown + 1) + mc)\n"
  }
},
  "feature-flag-power-set": {
  "problemId": "feature-flag-power-set",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Backtrack over flag indices, recording a shallow copy `path[:]` at every recursion node.",
  "hints": [
    "Conceptual Intuition: Consider a Index-Ordered Power-Set Backtracking paradigm. Backtrack over flag indices, recording a shallow copy `path[:]` at every recursion node.",
    "Algorithmic Mechanics: Advance `start` to `i + 1` so subsets are unique. Recurse `bt(start)`, appending `path[:]` and branching on `i in range(start, n)`.",
    "Edge Cases & Optimization: Always copy `path[:]` before appending to results. Ensure time complexity is bounded to O(n * 2^n) with O(n) stack auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Index-Ordered Power-Set Backtracking",
  "approachSteps": [
    "Recurse `bt(start)`, appending `path[:]` and branching on `i in range(start, n)`."
  ],
  "timeComplexity": "O(n * 2^n)",
  "spaceComplexity": "O(n) stack",
  "pitfalls": [
    "Always copy `path[:]` before appending to results."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def all_flag_configs(flags: list[int]) -> list[list[int]]:\n    res, path = [], []\n    def bt(s):\n        res.append(path[:])\n        for i in range(s, len(flags)):\n            path.append(flags[i]); bt(i + 1); path.pop()\n    bt(0)\n    return res\n"
  }
},
  "bundle-pricing-exact-combos": {
  "problemId": "bundle-pricing-exact-combos",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Sort `prices`, backtrack allowing reuse of index `i` (`bt(i, rem - p)`), and prune immediately when `p > rem`.",
  "hints": [
    "Conceptual Intuition: Consider a Sorted Pruned Combination Search paradigm. Sort `prices`, backtrack allowing reuse of index `i` (`bt(i, rem - p)`), and prune immediately when `p > rem`.",
    "Algorithmic Mechanics: Passing `i` allows reuse while avoiding duplicate permutations. Sort `prices`; recurse `bt(start, rem)` breaking when `prices[i] > rem`.",
    "Edge Cases & Optimization: Never reset loop start to `0` or duplicate orderings appear. Ensure time complexity is bounded to O(N^(T/M)) with O(T/M) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Sorted Pruned Combination Search",
  "approachSteps": [
    "Sort `prices`; recurse `bt(start, rem)` breaking when `prices[i] > rem`."
  ],
  "timeComplexity": "O(N^(T/M))",
  "spaceComplexity": "O(T/M)",
  "pitfalls": [
    "Never reset loop start to `0` or duplicate orderings appear."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def exact_bundles(prices: list[int], credit: int) -> list[list[int]]:\n    arr = sorted(prices)\n    res, path = [], []\n    def bt(s, rem):\n        if rem == 0: res.append(path[:]); return\n        for i in range(s, len(arr)):\n            if arr[i] > rem: break\n            path.append(arr[i]); bt(i, rem - arr[i]); path.pop()\n    bt(0, credit)\n    return res\n"
  }
},
  "server-rack-nonattacking-sensors": {
  "problemId": "server-rack-nonattacking-sensors",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Place one scanner per row using three `n`-bit masks (`cols`, `d1`, `d2`) shifted left/right on each row transition.",
  "hints": [
    "Conceptual Intuition: Consider a Bitmask Row Backtracking paradigm. Place one scanner per row using three `n`-bit masks (`cols`, `d1`, `d2`) shifted left/right on each row transition.",
    "Algorithmic Mechanics: Extract available columns via `bit = avail & -avail`. Mask available columns with `(1 << n) - 1`, iterate set bits, shift diagonals.",
    "Edge Cases & Optimization: Mask shifted diagonals with `full = (1 << n) - 1`. Ensure time complexity is bounded to O(n!) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bitmask Row Backtracking",
  "approachSteps": [
    "Mask available columns with `(1 << n) - 1`, iterate set bits, shift diagonals."
  ],
  "timeComplexity": "O(n!)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Mask shifted diagonals with `full = (1 << n) - 1`."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def count_scanner_layouts(n: int) -> int:\n    full = (1 << n) - 1\n    def bt(r, cols, d1, d2):\n        if r == n: return 1\n        cnt = 0\n        avail = full & ~(cols | d1 | d2)\n        while avail:\n            bit = avail & -avail\n            avail ^= bit\n            cnt += bt(r + 1, cols | bit, (d1 | bit) << 1, (d2 | bit) >> 1)\n        return cnt\n    return bt(0, 0, 0, 0)\n"
  }
},
  "bonus-tier-neighbor-allocation": {
  "problemId": "bonus-tier-neighbor-allocation",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Run a left-to-right pass for left neighbors and a right-to-left pass taking `max(tokens[i], tokens[i + 1] + 1)` for right neighbors.",
  "hints": [
    "Conceptual Intuition: Consider a Bidirectional Greedy Pass paradigm. Run a left-to-right pass for left neighbors and a right-to-left pass taking `max(tokens[i], tokens[i + 1] + 1)` for right neighbors.",
    "Algorithmic Mechanics: Equal-scoring neighbors can drop back to 1 token. Start `[1] * n`, bump ascending left-to-right, then take `max` ascending right-to-left.",
    "Edge Cases & Optimization: Use `max(.)` on the backward pass so the forward constraint stays satisfied. Ensure time complexity is bounded to O(n) with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bidirectional Greedy Pass",
  "approachSteps": [
    "Start `[1] * n`, bump ascending left-to-right, then take `max` ascending right-to-left."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Use `max(...)` on the backward pass so the forward constraint stays satisfied."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def min_bonus_pool(scores: list[int]) -> int:\n    n = len(scores)\n    tok = [1] * n\n    for i in range(1, n):\n        if scores[i] > scores[i - 1]: tok[i] = tok[i - 1] + 1\n    for i in range(n - 2, -1, -1):\n        if scores[i] > scores[i + 1]: tok[i] = max(tok[i], tok[i + 1] + 1)\n    return sum(tok)\n"
  }
},
  "telemetry-stream-live-median": {
  "problemId": "telemetry-stream-live-median",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Maintain a max-heap `lo` (lower half) and min-heap `hi` (upper half) with `len(lo) >= len(hi)` and size difference `<= 1`.",
  "hints": [
    "Conceptual Intuition: Consider a Balanced Two-Heap Median Tracker paradigm. Maintain a max-heap `lo` (lower half) and min-heap `hi` (upper half) with `len(lo) >= len(hi)` and size difference `<= 1`.",
    "Algorithmic Mechanics: Negate numbers pushed into `lo` to emulate a max-heap in Python. Push `-x` to `lo`, move top to `hi`, rebalance to `lo` if `len(hi) > len(lo)`.",
    "Edge Cases & Optimization: Return `float` even for odd sample counts. Ensure time complexity is bounded to O(log n) log, O(1) median with O(n) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Balanced Two-Heap Median Tracker",
  "approachSteps": [
    "Push `-x` to `lo`, move top to `hi`, rebalance to `lo` if `len(hi) > len(lo)`."
  ],
  "timeComplexity": "O(log n) log, O(1) median",
  "spaceComplexity": "O(n)",
  "pitfalls": [
    "Return `float` even for odd sample counts."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "import heapq\n\ndef stream_medians(events: list[list]) -> list[float]:\n    lo, hi, out = [], [], []\n    for ev in events:\n        if ev[0] == 'log':\n            heapq.heappush(lo, -ev[1])\n            heapq.heappush(hi, -heapq.heappop(lo))\n            if len(hi) > len(lo):\n                heapq.heappush(lo, -heapq.heappop(hi))\n        else:\n            out.append(float(-lo[0]) if len(lo) > len(hi) else (-lo[0] + hi[0]) / 2.0)\n    return out\n"
  }
},
  "parity-check-unmatched-packet": {
  "problemId": "parity-check-unmatched-packet",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "XOR all IDs together; every matched send/ACK pair cancels to `0`, leaving the lone packet ID.",
  "hints": [
    "Conceptual Intuition: Consider a Bitwise XOR Cancellation paradigm. XOR all IDs together; every matched send/ACK pair cancels to `0`, leaving the lone packet ID.",
    "Algorithmic Mechanics: `a ^ a == 0` and `a ^ 0 == a`. Accumulate `ans ^= x` over `log_ids` and return `ans`.",
    "Edge Cases & Optimization: Avoid sorting or hash maps to stay strictly O(n) time and O(1) space. Ensure time complexity is bounded to O(n) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Bitwise XOR Cancellation",
  "approachSteps": [
    "Accumulate `ans ^= x` over `log_ids` and return `ans`."
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Avoid sorting or hash maps to stay strictly O(n) time and O(1) space."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def find_unacked_packet(log_ids: list[int]) -> int:\n    ans = 0\n    for x in log_ids: ans ^= x\n    return ans\n"
  }
},
  "memory-page-alignment-check": {
  "problemId": "memory-page-alignment-check",
  "isStaticDemo": false,
  "isVerified": true,
  "summary": "Check `block_bytes > 0 and (block_bytes & (block_bytes - 1)) == 0` in O(1) time.",
  "hints": [
    "Conceptual Intuition: Consider a Constant-Time Bit-Clear Test paradigm. Check `block_bytes > 0 and (block_bytes & (block_bytes - 1)) == 0` in O(1) time.",
    "Algorithmic Mechanics: A positive integer has exactly one `1` bit iff clearing its lowest `1` bit yields `0`. Return `block_bytes > 0 and (block_bytes & (block_bytes - 1)) == 0`.",
    "Edge Cases & Optimization: Reject `<= 0` explicitly. Ensure time complexity is bounded to O(1) with O(1) auxiliary space to avoid Time Limit Exceeded."
  ],
  "approachTitle": "Constant-Time Bit-Clear Test",
  "approachSteps": [
    "Return `block_bytes > 0 and (block_bytes & (block_bytes - 1)) == 0`."
  ],
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "pitfalls": [
    "Reject `<= 0` explicitly."
  ],
  "referenceCode": {
    "language": "Python",
    "code": "def is_valid_page_size(block_bytes: int) -> bool:\n    return block_bytes > 0 and (block_bytes & (block_bytes - 1)) == 0\n"
  }
}
};

export function getProblemEditorial(problemId: string): ProblemEditorial | null {
  return staticEditorials[problemId] ?? null;
}
