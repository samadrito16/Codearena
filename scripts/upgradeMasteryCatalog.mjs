import fs from 'fs';
import path from 'path';

const catalogPath = path.resolve('data/mastery/prism_code_first_25_problems.json');
const raw = fs.readFileSync(catalogPath, 'utf8');
const catalog = JSON.parse(raw);

catalog.schema_version = '1.1.0';

// Problem-specific patches matching Section 3 of docs/PATTERN_MASTERY_README.md
const patches = {
  'tp-001': {
    high_risk_lines: [
      { line: 2, note: 'Initialization boundary: right must start at len(nums) - 1, not len(nums).' },
      { line: 3, note: 'Distinct-index guard: use strict < so the same element is never added to itself.' },
      { line: 7, note: 'Boundary reasoning: moving the left pointer is safe only when the sum is too small.' },
    ],
    recommended_tests: [
      'Two-element array where indices 0 and 1 match',
      'No valid pair exists (returns [])',
      'Duplicate values where target equals 2 * nums[i] (must not reuse same index)',
      'Negative numbers and zero target',
    ],
    pattern_diagnosis_options: ['two_pointers', 'hash_maps', 'sliding_window', 'dynamic_programming'],
    ai_avoid_keywords: ['left += 1', 'right -= 1', 'while left < right'],
    starter_code: 'def pair_sum_sorted(nums, target):\n    pass',
  },
  'tp-002': {
    high_risk_lines: [
      { line: 4, note: 'Prefix start: index 0 is already unique for any non-empty array, so writes begin at index 1.' },
      { line: 6, note: 'Boundary reasoning: write - 1 is the final valid element in the unique prefix.' },
    ],
    recommended_tests: [
      'Empty array [] returns 0',
      'Single-element array [5] returns 1',
      'All elements identical [2, 2, 2, 2] returns 1',
      'Already unique array [1, 2, 3, 4] returns 4',
    ],
    pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'breadth_first_search'],
    ai_avoid_keywords: ['write - 1', 'nums[write] = nums[read]', 'write = 1'],
    starter_code: 'def remove_duplicates(nums):\n    pass',
  },
  'tp-003': {
    high_risk_lines: [
      { line: 4, note: 'Inner loop guard: left < right prevents IndexError when the string contains only punctuation or spaces.' },
      { line: 6, note: 'Inner loop guard: keep right from crossing left on non-alphanumeric runs.' },
      { line: 8, note: 'Case normalization: compare lowercase alphanumeric characters only after both skip loops finish.' },
    ],
    recommended_tests: [
      "Empty string or punctuation-only string ',,,' returns True",
      "Mixed case with digits like '0P' returns False",
      'Single alphanumeric character surrounded by spaces',
      'Even-length and odd-length valid palindromes',
    ],
    pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
    ai_avoid_keywords: ['isalnum()', 'lower()', 's[::-1]'],
    starter_code: 'def is_valid_palindrome(s):\n    pass',
  },
  'tp-004': {
    high_risk_lines: [
      { line: 5, note: 'Outer duplicate guard: skip identical numbers at index i > 0 to avoid duplicate triplets.' },
      { line: 7, note: 'Sorted pruning: once the fixed smallest number is positive, no triplet can sum to zero.' },
      { line: 9, note: 'Suffix search: left must start at i + 1 so earlier indices are never reused.' },
      { line: 20, note: 'Inner duplicate skip: advance left past all identical values.' },
      { line: 22, note: 'Duplicate handling: compare against right + 1 after decrementing right.' },
    ],
    recommended_tests: [
      'All zeros [0, 0, 0, 0] returns [[0, 0, 0]] once',
      'Multiple repeated negatives and positives [-2, 0, 0, 2, 2]',
      'All positive or all negative array returns []',
      'Exactly three elements summing to zero',
    ],
    pattern_diagnosis_options: ['two_pointers', 'hash_maps', 'sliding_window', 'dynamic_programming'],
    ai_avoid_keywords: ['nums.sort()', 'nums[i - 1]', 'left = i + 1'],
    starter_code: 'def three_sum(nums):\n    pass',
  },
  'tp-005': {
    high_risk_lines: [
      { line: 6, note: 'Bottleneck formula: container height is bounded by the shorter vertical line.' },
      { line: 8, note: 'Elimination decision: identify which endpoint is the shorter bottleneck before moving.' },
      { line: 9, note: 'Greedy pointer choice: always move the shorter boundary, not the taller one.' },
    ],
    recommended_tests: [
      'Two-element array [1, 1] returns 1',
      'Equal tall heights at both ends [5, 1, 1, 5]',
      'Zero-height walls included [0, 2, 0, 4]',
      'Strictly increasing or decreasing heights',
    ],
    pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'dynamic_programming', 'hash_maps'],
    ai_avoid_keywords: ['min(heights[left]', 'heights[left] < heights[right]', 'left += 1'],
    starter_code: 'def max_container_area(heights):\n    pass',
  },
  'sw-001': {
    high_risk_lines: [
      { line: 4, note: 'Slide start index: the first k elements (0..k-1) are already summed, so sliding starts at index k.' },
      { line: 6, note: 'Window update: subtract the outgoing element nums[right - k] as the window advances.' },
    ],
    recommended_tests: [
      'k == len(nums) (loop executes zero times)',
      'All negative numbers (ensures best is initialized to first window, not 0)',
      'k == 1 returns max element',
      'Maximum window is at the very end of the array',
    ],
    pattern_diagnosis_options: ['sliding_window', 'two_pointers', 'dynamic_programming', 'hash_maps'],
    ai_avoid_keywords: ['right - k', 'range(k, len(nums))', 'window_sum -='],
    starter_code: 'def max_sum_subarray_k(nums, k):\n    pass',
  },
  'sw-002': {
    high_risk_lines: [
      { line: 6, note: 'Revisit check: character must be in last_seen and its recorded index must be >= left to be an active duplicate.' },
      { line: 7, note: 'Pointer jump: move left to one position past the duplicate, not onto the duplicate.' },
      { line: 9, note: 'Window size update: best = max(best, right - left + 1) captures the longest valid window.' },
    ],
    recommended_tests: [
      "Empty string '' returns 0",
      "Duplicate seen before current left like 'abba' (tests >= left guard)",
      "All identical characters 'aaaa' returns 1",
      "All distinct characters 'abcdef' returns 6",
    ],
    pattern_diagnosis_options: ['sliding_window', 'hash_maps', 'two_pointers', 'dynamic_programming'],
    ai_avoid_keywords: ['last_seen[char] >= left', 'last_seen[char] + 1', 'right - left + 1'],
    starter_code: 'def longest_unique_substring(s):\n    pass',
  },
  'sw-003': {
    high_risk_lines: [
      { line: 7, note: 'Shrink loop: use while (not if) because one large new element may allow shrinking multiple left elements.' },
      { line: 8, note: 'Track minimum: best = min(best, right - left + 1) whenever window_sum >= target.' },
      { line: 10, note: 'Shrink window: left += 1 after removing nums[left] from window_sum.' },
    ],
    recommended_tests: [
      'Total sum of entire array < target returns 0',
      'Single element >= target returns 1',
      'Entire array needed to reach target',
      'Large final element triggers multi-step shrink',
    ],
    pattern_diagnosis_options: ['sliding_window', 'two_pointers', 'hash_maps', 'dynamic_programming'],
    ai_avoid_keywords: ['while window_sum >= target', 'right - left + 1', 'window_sum -= nums[left]'],
    starter_code: 'def min_subarray_len(target, nums):\n    pass',
  },
  'sw-004': {
    high_risk_lines: [
      { line: 10, note: "Fixed alphabet mapping: convert 'a'..'z' into indices 0..25 for O(1) comparison." },
      { line: 11, note: 'Boundary check: start removing outgoing characters once right >= width.' },
      { line: 12, note: 'Outgoing index: the character leaving the fixed window is at right - width.' },
      { line: 14, note: 'Match check: once window is full size (right >= width - 1), check if window frequency matches needed frequency.' },
    ],
    recommended_tests: [
      'len(s1) > len(s2) returns False immediately',
      'Match occurs at index 0 (first full window)',
      'Match occurs at the very last window of s2',
      "Same letter set with different counts like s1='aab', s2='abb' returns False",
    ],
    pattern_diagnosis_options: ['sliding_window', 'hash_maps', 'two_pointers', 'breadth_first_search'],
    ai_avoid_keywords: ["ord('a')", 'right - width', 'right >= width - 1'],
    starter_code: 'def contains_permutation(s1, s2):\n    pass',
  },
  'sw-005': {
    high_risk_lines: [
      { line: 8, note: 'Monotonic max count: max_frequency never needs to shrink because smaller frequencies cannot beat the best length.' },
      { line: 9, note: 'Shrink condition: while (right - left + 1) - max_frequency > k, too many replacements are needed.' },
      { line: 10, note: "State sync: decrement the outgoing left character's count before advancing left." },
    ],
    recommended_tests: [
      'k == 0 returns longest contiguous identical run',
      'k >= len(s) returns len(s)',
      'Single character string returns 1',
      "Dominant character shifts mid-string like 'ABBB' with k=1",
    ],
    pattern_diagnosis_options: ['sliding_window', 'hash_maps', 'dynamic_programming', 'two_pointers'],
    ai_avoid_keywords: ['max_frequency', '(right - left + 1) - max_frequency', 'counts[s[left]] -='],
    starter_code: 'def character_replacement(s, k):\n    pass',
  },
  'hm-001': {
    high_risk_lines: [
      { line: 5, note: 'Check-before-insert invariant: look up target - value before storing value so an index never pairs with itself.' },
      { line: 7, note: 'Insertion timing: store the current number only after confirming its complement was not seen earlier.' },
    ],
    recommended_tests: [
      'Element equal to target / 2 appears once (e.g. nums=[3, 2, 4], target=6 must not return [0, 0])',
      'Duplicate values form the answer (e.g. nums=[3, 3], target=6 returns [0, 1])',
      'Negative numbers summing to target',
      'Two-element array',
    ],
    pattern_diagnosis_options: ['hash_maps', 'two_pointers', 'sliding_window', 'dynamic_programming'],
    ai_avoid_keywords: ['target - value', 'complement in seen', 'seen[value] = index'],
    starter_code: 'def two_sum(nums, target):\n    pass',
  },
  'hm-002': {
    high_risk_lines: [
      { line: 4, note: 'Hashable key rule: sorted(word) returns a mutable list (TypeError as dict key); wrap in tuple() to make it hashable.' },
      { line: 7, note: 'Preserve original data: append the original word to the bucket, not the sorted key.' },
    ],
    recommended_tests: [
      "Empty strings ['', ''] grouped together",
      "Single word input ['a']",
      'No anagrams at all (each word in its own group)',
      "Words with repeated letters like 'aab' vs 'abb' stay separate",
    ],
    pattern_diagnosis_options: ['hash_maps', 'two_pointers', 'sliding_window', 'breadth_first_search'],
    ai_avoid_keywords: ['tuple(sorted(', 'groups.values()', 'defaultdict'],
    starter_code: 'def group_anagrams(strs):\n    pass',
  },
  'hm-003': {
    high_risk_lines: [
      { line: 2, note: 'Empty-prefix seed: without {0: 1}, valid subarrays starting at index 0 are missed.' },
      { line: 7, note: 'Cumulative count: answer += prefix_count.get(prefix_sum - k, 0) accumulates all matching prefix boundaries.' },
    ],
    recommended_tests: [
      'Subarray starting at index 0 equals k (tests {0: 1} seed)',
      'k == 0 with non-zero elements (must not count empty subarrays)',
      'Negative numbers causing the same prefix sum to repeat multiple times',
      'Single element equal to k',
    ],
    pattern_diagnosis_options: ['hash_maps', 'sliding_window', 'two_pointers', 'dynamic_programming'],
    ai_avoid_keywords: ['{0: 1}', 'prefix_sum - k', 'prefix_count'],
    starter_code: 'def count_subarrays_sum_k(nums, k):\n    pass',
  },
  'hm-004': {
    high_risk_lines: [
      { line: 4, note: 'Deduplicated iteration: iterate over the set values (not nums) so massive duplicates do not degrade runtime to O(n^2).' },
      { line: 5, note: 'Sequence start check: value - 1 not in values ensures we only begin expanding from the true start of a streak.' },
      { line: 8, note: 'Sequence walk: each number is visited in this while-loop at most once across the entire run.' },
    ],
    recommended_tests: [
      'Empty array [] returns 0',
      'Many duplicate values [1, 2, 2, 3] returns 3',
      'Negative-to-positive sequence [-2, -1, 0, 1]',
      'Disjoint sequences where longest appears second',
    ],
    pattern_diagnosis_options: ['hash_maps', 'two_pointers', 'dynamic_programming', 'sliding_window'],
    ai_avoid_keywords: ['value - 1 not in', 'set(nums)', 'current + 1'],
    starter_code: 'def longest_consecutive(nums):\n    pass',
  },
  'hm-005': {
    high_risk_lines: [
      { line: 4, note: 'Bucket sizing & aliasing: size must be len(nums) + 1 (max frequency is n), and avoid [[]] * n which shares one list reference.' },
      { line: 8, note: 'Reverse scan: walk from highest possible frequency len(nums) down to 1.' },
      { line: 11, note: 'Early termination: if len(answer) == k return answer immediately.' },
    ],
    recommended_tests: [
      'Single element array [7], k=1 (tests bucket index len(nums))',
      'All elements identical [4, 4, 4], k=1',
      'k equals number of distinct elements',
      'Negative numbers in nums',
    ],
    pattern_diagnosis_options: ['hash_maps', 'two_pointers', 'sliding_window', 'dynamic_programming'],
    ai_avoid_keywords: ['buckets[frequency]', 'range(len(nums), 0, -1)', 'Counter'],
    starter_code: 'def top_k_frequent(nums, k):\n    pass',
  },
  'dp-001': {
    high_risk_lines: [
      { line: 5, note: 'Loop bounds: base cases cover steps 1 and 2; range must include n via n + 1.' },
      { line: 6, note: 'State transition: one, two = two, one + two shifts the rolling window forward by one step.' },
    ],
    recommended_tests: [
      'Base cases n = 1 (returns 1) and n = 2 (returns 2)',
      'First recurrence step n = 3 (returns 3)',
      'Larger input n = 45 (verifies linear time, no recursion TLE)',
    ],
    pattern_diagnosis_options: ['dynamic_programming', 'breadth_first_search', 'two_pointers', 'hash_maps'],
    ai_avoid_keywords: ['one, two = two, one + two', 'range(3, n + 1)', 'fibonacci'],
    starter_code: 'def climb_stairs(n):\n    pass',
  },
  'dp-002': {
    high_risk_lines: [
      { line: 5, note: 'Recurrence shift: two_back, one_back = one_back, max(one_back, two_back + money).' },
      { line: 6, note: 'Final state readout: one_back holds the best total through the final house (not two_back).' },
    ],
    recommended_tests: [
      'Single house [5] returns 5',
      'Two houses [2, 9] returns 9',
      'Skipping two houses in a row is optimal [2, 1, 1, 2] returns 4',
      'Houses containing 0 values [0, 0, 0]',
    ],
    pattern_diagnosis_options: ['dynamic_programming', 'sliding_window', 'two_pointers', 'hash_maps'],
    ai_avoid_keywords: ['max(one_back, two_back + money)', 'two_back, one_back ='],
    starter_code: 'def house_robber(nums):\n    pass',
  },
  'dp-003': {
    high_risk_lines: [
      { line: 4, note: 'DP base case: amount 0 requires 0 coins; every reachable state builds upward from this anchor.' },
      { line: 8, note: 'Relaxation: dp[value] = min(dp[value], dp[value - coin] + 1).' },
    ],
    recommended_tests: [
      'amount == 0 returns 0',
      'Impossible amount like coins=[2], amount=3 returns -1',
      'Greedy fails case: coins=[1, 3, 4], amount=6 returns 2 (3+3, not 4+1+1)',
      'Coin larger than amount like coins=[5], amount=3 returns -1',
    ],
    pattern_diagnosis_options: ['dynamic_programming', 'breadth_first_search', 'hash_maps', 'two_pointers'],
    ai_avoid_keywords: ['dp[value - coin] + 1', 'dp[0] = 0', 'amount + 1'],
    starter_code: 'def coin_change(coins, amount):\n    pass',
  },
  'dp-004': {
    high_risk_lines: [
      { line: 5, note: 'Binary search position: position = bisect_left(tails, value) finds the first tail >= value.' },
      { line: 9, note: 'Tail replacement: lowering a tail never reduces existing LIS length and makes future extensions easier.' },
    ],
    recommended_tests: [
      'All equal values [7, 7, 7, 7] returns 1 (tests strict bisect_left)',
      'Strictly decreasing array [5, 4, 3, 2, 1] returns 1',
      'Single element [10] returns 1',
      'Non-contiguous optimal sequence with negative numbers',
    ],
    pattern_diagnosis_options: ['dynamic_programming', 'sliding_window', 'two_pointers', 'hash_maps'],
    ai_avoid_keywords: ['bisect_left', 'tails[position] = value', 'len(tails)'],
    starter_code: 'def longest_increasing_subsequence(nums):\n    pass',
  },
  'dp-005': {
    high_risk_lines: [
      { line: 2, note: 'Row base case: there is exactly 1 way to reach every cell in the top row.' },
      { line: 5, note: 'Accumulation: dp[col] += dp[col - 1] sums the paths coming from above and from the left.' },
    ],
    recommended_tests: [
      '1x1 grid returns 1',
      '1xN or Mx1 single-line grid returns 1',
      'Symmetric check: unique_paths(3, 7) == unique_paths(7, 3) == 28',
    ],
    pattern_diagnosis_options: ['dynamic_programming', 'breadth_first_search', 'two_pointers', 'hash_maps'],
    ai_avoid_keywords: ['dp[col] += dp[col - 1]', 'dp = [1] * n'],
    starter_code: 'def unique_paths(m, n):\n    pass',
  },
  'bfs-001': {
    high_risk_lines: [
      { line: 5, note: 'Queue seeding: seed root only after ruling out root is None, or deque([None]) will crash on node.val.' },
      { line: 8, note: 'Snapshot level size: level_size = len(queue) freezes the count of nodes belonging strictly to the current tier.' },
      { line: 11, note: 'FIFO discipline: popleft() preserves level-by-level left-to-right order; pop() would turn this into DFS.' },
      { line: 17, note: 'Level commit: append the level list once per outer while-iteration, outside the inner for-loop.' },
    ],
    recommended_tests: [
      'Empty tree (root=None) returns []',
      'Single-node tree [1] returns [[1]]',
      'Completely left-skewed or right-skewed tree',
      'Tree with missing inner children (null gaps)',
    ],
    pattern_diagnosis_options: ['breadth_first_search', 'dynamic_programming', 'two_pointers', 'hash_maps'],
    ai_avoid_keywords: ['level_size = len(queue)', 'popleft()', 'deque([root])'],
    starter_code: 'def level_order(root):\n    pass',
  },
  'bfs-002': {
    high_risk_lines: [
      { line: 10, note: "Component trigger: increment islands once when discovering an unvisited '1' before flooding its component." },
      { line: 12, note: "Mark starting land visited: sink root land cell grid[r][c] = '0'." },
      { line: 17, note: "Boundary & land check: 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1'." },
      { line: 18, note: 'Enqueue-time marking: mark neighbor visited BEFORE appending to queue so shared neighbors are not queued multiple times.' },
    ],
    recommended_tests: [
      'All water grid returns 0',
      'All land 3x3 grid returns 1 (tests visited marking against duplicate queue blowup)',
      'Diagonal-only land cells count as separate islands',
      "1x1 grid with '1' or '0'",
    ],
    pattern_diagnosis_options: ['breadth_first_search', 'dynamic_programming', 'sliding_window', 'two_pointers'],
    ai_avoid_keywords: ["grid[nr][nc] = '0'", 'popleft()', 'directions'],
    starter_code: 'def num_islands(grid):\n    pass',
  },
  'bfs-003': {
    high_risk_lines: [
      { line: 9, note: 'Multi-source seeding: enqueue ALL initially rotten oranges before starting BFS so they spread simultaneously.' },
      { line: 14, note: 'Phantom-minute guard: stop as soon as fresh == 0 so the final empty-spread layer does not add an extra minute.' },
      { line: 15, note: 'Batch processing: loop for _ in range(len(queue)) processes all oranges rotting at the current minute.' },
      { line: 19, note: 'Fresh neighbor test: 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1.' },
      { line: 20, note: 'State mutation on enqueue: mark cell rotten immediately to avoid double-decrementing fresh.' },
    ],
    recommended_tests: [
      'No fresh oranges initially returns 0',
      'Isolated fresh orange behind empty cells returns -1',
      'Two simultaneous rotten sources meeting in the middle',
      'Fresh oranges present with zero rotten oranges returns -1',
    ],
    pattern_diagnosis_options: ['breadth_first_search', 'dynamic_programming', 'sliding_window', 'hash_maps'],
    ai_avoid_keywords: ['while queue and fresh > 0', 'for _ in range(len(queue))', 'fresh -= 1'],
    starter_code: 'def oranges_rotting(grid):\n    pass',
  },
  'bfs-004': {
    high_risk_lines: [
      { line: 4, note: 'Endpoint validation: check both top-left and bottom-right before starting BFS.' },
      { line: 7, note: 'Distance base: start at 1 (not 0) because path length counts visited cells including start and end.' },
      { line: 8, note: 'Mark start visited: grid[0][0] = 1 prevents cycling.' },
      { line: 15, note: '8-directional neighbor valid: 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0.' },
    ],
    recommended_tests: [
      '1x1 open grid [[0]] returns 1',
      'Blocked start [[1,0],[0,0]] or blocked end [[0,0],[0,1]] returns -1',
      'Diagonal shortcut beats orthogonal route',
      'Completely walled-off bottom-right returns -1',
    ],
    pattern_diagnosis_options: ['breadth_first_search', 'dynamic_programming', 'two_pointers', 'sliding_window'],
    ai_avoid_keywords: ['(0, 0, 1)', 'grid[nr][nc] = 1', 'dr != 0 or dc != 0'],
    starter_code: 'def shortest_path_binary_matrix(grid):\n    pass',
  },
  'bfs-005': {
    high_risk_lines: [
      { line: 5, note: "Start-blocked edge case: if '0000' is a deadend, return -1 before exploring neighbors." },
      { line: 16, note: 'Cyclic wraparound: modulo 10 wraps 9 + 1 -> 0 and 0 - 1 -> 9 cleanly.' },
      { line: 18, note: 'Unvisited open check: if neighbor not in blocked and neighbor not in visited.' },
      { line: 19, note: 'Visited timing: insert neighbor into visited immediately before enqueueing to prevent exponential duplicates.' },
    ],
    recommended_tests: [
      "Start state '0000' is in deadends returns -1",
      "Target equals '0000' (not blocked) returns 0",
      "Wraparound path using 0 -> 9 (e.g. target '9000' takes 1 move)",
      "All 8 immediate neighbors of '0000' are deadends returns -1",
    ],
    pattern_diagnosis_options: ['breadth_first_search', 'dynamic_programming', 'hash_maps', 'two_pointers'],
    ai_avoid_keywords: ['(digit + delta) % 10', 'visited.add(neighbor)', 'blocked = set(deadends)'],
    starter_code: 'def open_lock(deadends, target):\n    pass',
  },
};

for (const problem of catalog.problems) {
  const patch = patches[problem.id];
  if (!patch) {
    console.warn(`No patch found for problem ID: ${problem.id}`);
    continue;
  }

  // 1. Reset all lines is_high_risk: false
  for (const line of problem.optimal_solution.code_lines) {
    line.is_high_risk = false;
    line.risk_note = null;
  }

  // 2. Apply high risk lines
  for (const { line: lineNum, note } of patch.high_risk_lines) {
    const targetLine = problem.optimal_solution.code_lines.find((l) => l.line_number === lineNum);
    if (targetLine) {
      targetLine.is_high_risk = true;
      targetLine.risk_note = note;
    } else {
      console.error(`Line ${lineNum} not found in problem ${problem.id}`);
    }
  }

  // 3. Sync hardest_lines_to_test
  problem.hardest_lines_to_test = patch.high_risk_lines.map(({ line: lineNum, note }) => {
    const targetLine = problem.optimal_solution.code_lines.find((l) => l.line_number === lineNum);
    return {
      line_number: lineNum,
      code: targetLine ? targetLine.code : '',
      why_it_is_tricky: note,
      recommended_tests: patch.recommended_tests,
    };
  });

  // 4. Add new metadata
  problem.pattern_diagnosis_options = patch.pattern_diagnosis_options;
  problem.ai_avoid_keywords = patch.ai_avoid_keywords;
  problem.starter_code = patch.starter_code;
}

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log('Successfully upgraded prism_code_first_25_problems.json to v1.1.0!');
