# Prism Code — Feature 1: Pattern Mastery (25 Curated Blueprints)

> **Purpose of this file:** Drop this `PATTERN_MASTERY_README.md` and your `prism_code_first_25_problems.json` into your **Prism Code** repository, then follow the **Antigravity Execution Prompts** in Section 7 to build and polish Feature 1 inside VS Code.

---

## 1. Strict Product Boundary (Why This Is Separate From `/problems`)

Prism Code already has ~300 standard algorithmic practice problems. **Do NOT mix these 25 problems into the existing `/problems` listing, database table, or problem solver UI.**

| Aspect | Normal Section (`/problems`) | New Pattern Mastery Section (`/mastery`) |
| --- | --- | --- |
| **Goal** | Open-ended practice & volume | Active pattern construction, blueprint comprehension, and spaced recall |
| **Content** | ~300 standard problems & flat solutions | 25 curated problems across 5 foundational patterns with structured metadata |
| **Pattern Tag** | Shown upfront | Hidden behind a **Pattern Clue Diagnosis** check first |
| **Solution Format** | Single flat code block | Grouped into **Subgoal Logic Blocks** + **Line-by-Line "Why This Line"** inspector |
| **Memory Targeting** | None (every line treated equally) | Hardest **20%–25% of lines** flagged (`is_high_risk: true`) with `risk_note` & mask-to-recall preview |
| **Future Monetization** | Free practice catalog | Foundation for Pro exclusives (48-hour recall drills, FSRS interview countdown, visual scrubber, Socratic AI) |

**Non-Negotiable Isolation Rule for Antigravity:**
1. Keep all new routes under `/mastery` (e.g., `/mastery`, `/mastery/[pattern]`, `/mastery/[pattern]/[slug]`).
2. Keep all new data, types, and UI components in dedicated `mastery/` folders.
3. Add only **one** navigation link (`Pattern Mastery` with a `Core 25` or `New` pill badge) to the existing site navbar—do not alter existing `/problems` routes, queries, or components.

---

## 2. Audit & Required Upgrades to `prism_code_first_25_problems.json` (`v1.0.0` -> `v1.1.0`)

Your attached `prism_code_first_25_problems.json` already has an excellent foundation (`pattern_clues`, `brute_force`, `subgoals`, `code_lines`, `hints`, `trigger_words`). However, a line-by-line audit revealed **four gaps** that must be patched before building the UI:

1. **Missing High-Risk Lines (`hm-001` and `hm-002`):** Both `Two Sum` and `Group Anagrams` currently have `hardest_lines_to_test: []` and zero lines marked `is_high_risk: true`. Future recall drills would have nothing to test on these problems.
2. **Under-Flagged High-Risk Coverage (~6%–10% instead of 20%–25%):** Most problems only flag 1 line out of 10–20 lines. Upgrading each problem to flag the **hardest 20%–25% of lines** (2 to 5 critical logic/boundary lines per problem) ensures drills test real algorithmic reasoning without testing boilerplate.
3. **Copy-Pasted `recommended_tests` Strings:** Several non-sliding-window problems (`tp-001`, `tp-002`, `tp-003`, `tp-005`, `hm-005`, `bfs-001`, `bfs-002`, `bfs-004`) currently contain `"A window that becomes valid or invalid at the boundary"`, and `bfs-005` contains `"Several equal values next to one another"`. These must be replaced with accurate problem-specific edge tests.
4. **Missing Metadata Needed for Feature 1 UI & Future Features:**
   - `schema_version`: bump from `"1.0.0"` to `"1.1.0"`.
   - `pattern_diagnosis_options`: 4 multiple-choice pattern IDs (1 correct + 3 plausible distractors) for the interactive Clue Diagnosis gate.
   - `ai_avoid_keywords`: 3–5 spoiler keywords to block when Feature 7 (Socratic AI Tutor) is added later.
   - `starter_code`: function signature stub ready for Feature 2 (Browser Code Runner).

---

## 3. Complete Upgrade Spec for All 25 Problems

Apply the following exact patches to `prism_code_first_25_problems.json`. Every `line_number` below matches the exact `optimal_solution.code_lines` numbering in your JSON file.

### Pattern 1: Two Pointers (`two_pointers`)

#### 1. `tp-001` — Pair Sum in a Sorted Array (11 lines | Target: 3 lines = 27%)
- **Set `is_high_risk: true` on lines:** `[2, 3, 7]`
  - **Line 2** (`left, right = 0, len(nums) - 1`): `risk_note`: `"Initialization boundary: right must start at len(nums) - 1, not len(nums)."`
  - **Line 3** (`while left < right:`): `risk_note`: `"Distinct-index guard: use strict < so the same element is never added to itself."`
  - **Line 7** (`if current < target:`): *(Keep existing note)* `"Boundary reasoning: moving the left pointer is safe only when the sum is too small."`
- **Replace `recommended_tests`:** `["Two-element array where indices 0 and 1 match", "No valid pair exists (returns [])", "Duplicate values where target equals 2 * nums[i] (must not reuse same index)", "Negative numbers and zero target"]`
- **`pattern_diagnosis_options`:** `["two_pointers", "hash_maps", "sliding_window", "dynamic_programming"]`
- **`ai_avoid_keywords`:** `["left += 1", "right -= 1", "while left < right"]`
- **`starter_code`:** `def pair_sum_sorted(nums, target):\n    pass`

#### 2. `tp-002` — Remove Duplicates from a Sorted Array (9 lines | Target: 2 lines = 22%)
- **Set `is_high_risk: true` on lines:** `[4, 6]`
  - **Line 4** (`write = 1`): `risk_note`: `"Prefix start: index 0 is already unique for any non-empty array, so writes begin at index 1."`
  - **Line 6** (`if nums[read] != nums[write - 1]:`): *(Keep existing note)* `"Boundary reasoning: write - 1 is the final valid element in the unique prefix."`
- **Replace `recommended_tests`:** `["Empty array [] returns 0", "Single-element array [5] returns 1", "All elements identical [2, 2, 2, 2] returns 1", "Already unique array [1, 2, 3, 4] returns 4"]`
- **`pattern_diagnosis_options`:** `["two_pointers", "sliding_window", "hash_maps", "breadth_first_search"]`
- **`ai_avoid_keywords`:** `["write - 1", "nums[write] = nums[read]", "write = 1"]`
- **`starter_code`:** `def remove_duplicates(nums):\n    pass`

#### 3. `tp-003` — Valid Palindrome (12 lines | Target: 3 lines = 25%)
- **Set `is_high_risk: true` on lines:** `[4, 6, 8]`
  - **Line 4** (`while left < right and not s[left].isalnum():`): `risk_note`: `"Inner loop guard: left < right prevents IndexError when the string contains only punctuation or spaces."`
  - **Line 6** (`while left < right and not s[right].isalnum():`): `risk_note`: `"Inner loop guard: keep right from crossing left on non-alphanumeric runs."`
  - **Line 8** (`if s[left].lower() != s[right].lower():`): *(Keep existing note)* `"Case normalization: compare lowercase alphanumeric characters only after both skip loops finish."`
- **Replace `recommended_tests`:** `["Empty string or punctuation-only string ',,,' returns True", "Mixed case with digits like '0P' returns False", "Single alphanumeric character surrounded by spaces", "Even-length and odd-length valid palindromes"]`
- **`pattern_diagnosis_options`:** `["two_pointers", "sliding_window", "hash_maps", "dynamic_programming"]`
- **`ai_avoid_keywords`:** `["isalnum()", "lower()", "s[::-1]"]`
- **`starter_code`:** `def is_valid_palindrome(s):\n    pass`

#### 4. `tp-004` — Three Sum (24 lines | Target: 5 lines = 21%)
- **Set `is_high_risk: true` on lines:** `[5, 7, 9, 20, 22]`
  - **Line 5** (`if i > 0 and nums[i] == nums[i - 1]:`): *(Keep existing note)*
  - **Line 7** (`if nums[i] > 0:`): `risk_note`: `"Sorted pruning: once the fixed smallest number is positive, no triplet can sum to zero."`
  - **Line 9** (`left, right = i + 1, len(nums) - 1`): `risk_note`: `"Suffix search: left must start at i + 1 so earlier indices are never reused."`
  - **Line 20** (`while left < right and nums[left] == nums[left - 1]:`): *(Keep existing note)*
  - **Line 22** (`while left < right and nums[right] == nums[right + 1]:`): `risk_note`: `"Duplicate handling: compare against right + 1 after decrementing right."`
- **Replace `recommended_tests`:** `["All zeros [0, 0, 0, 0] returns [[0, 0, 0]] once", "Multiple repeated negatives and positives [-2, 0, 0, 2, 2]", "All positive or all negative array returns []", "Exactly three elements summing to zero"]`
- **`pattern_diagnosis_options`:** `["two_pointers", "hash_maps", "sliding_window", "dynamic_programming"]`
- **`ai_avoid_keywords`:** `["nums.sort()", "nums[i - 1]", "left = i + 1"]`
- **`starter_code`:** `def three_sum(nums):\n    pass`

#### 5. `tp-005` — Container With Most Water (12 lines | Target: 3 lines = 25%)
- **Set `is_high_risk: true` on lines:** `[6, 8, 9]`
  - **Line 6** (`limiting_height = min(heights[left], heights[right])`): `risk_note`: `"Bottleneck formula: container height is bounded by the shorter vertical line."`
  - **Line 8** (`if heights[left] < heights[right]:`): `risk_note`: `"Elimination decision: identify which endpoint is the shorter bottleneck before moving."`
  - **Line 9** (`left += 1`): *(Keep existing note)* `"Greedy pointer choice: always move the shorter boundary, not the taller one."`
- **Replace `recommended_tests`:** `["Two-element array [1, 1] returns 1", "Equal tall heights at both ends [5, 1, 1, 5]", "Zero-height walls included [0, 2, 0, 4]", "Strictly increasing or decreasing heights"]`
- **`pattern_diagnosis_options`:** `["two_pointers", "sliding_window", "dynamic_programming", "hash_maps"]`
- **`ai_avoid_keywords`:** `["min(heights[left]", "heights[left] < heights[right]", "left += 1"]`
- **`starter_code`:** `def max_container_area(heights):\n    pass`

---

### Pattern 2: Sliding Window (`sliding_window`)

#### 6. `sw-001` — Maximum Sum Subarray of Size K (8 lines | Target: 2 lines = 25%)
- **Set `is_high_risk: true` on lines:** `[4, 6]`
  - **Line 4** (`for right in range(k, len(nums)):`): `risk_note`: `"Slide start index: the first k elements (0..k-1) are already summed, so sliding starts at index k."`
  - **Line 6** (`window_sum -= nums[right - k]`): *(Keep existing note)*
- **Replace `recommended_tests`:** `["k == len(nums) (loop executes zero times)", "All negative numbers (ensures best is initialized to first window, not 0)", "k == 1 returns max element", "Maximum window is at the very end of the array"]`
- **`pattern_diagnosis_options`:** `["sliding_window", "two_pointers", "dynamic_programming", "hash_maps"]`
- **`ai_avoid_keywords`:** `["right - k", "range(k, len(nums))", "window_sum -="]`
- **`starter_code`:** `def max_sum_subarray_k(nums, k):\n    pass`

#### 7. `sw-002` — Longest Substring Without Repeating Characters (10 lines | Target: 3 lines = 30%)
- **Set `is_high_risk: true` on lines:** `[6, 7, 9]`
  - **Line 6** (`if char in last_seen and last_seen[char] >= left:`): *(Keep existing note)*
  - **Line 7** (`left = last_seen[char] + 1`): `risk_note`: `"Pointer jump: move left to one position past the duplicate, not onto the duplicate."`
  - **Line 9** (`best = max(best, right - left + 1)`): *(Keep existing note)*
- **Replace `recommended_tests`:** `["Empty string '' returns 0", "Duplicate seen before current left like 'abba' (tests >= left guard)", "All identical characters 'aaaa' returns 1", "All distinct characters 'abcdef' returns 6"]`
- **`pattern_diagnosis_options`:** `["sliding_window", "hash_maps", "two_pointers", "dynamic_programming"]`
- **`ai_avoid_keywords`:** `["last_seen[char] >= left", "last_seen[char] + 1", "right - left + 1"]`
- **`starter_code`:** `def longest_unique_substring(s):\n    pass`

#### 8. `sw-003` — Minimum Size Subarray Sum (11 lines | Target: 3 lines = 27%)
- **Set `is_high_risk: true` on lines:** `[7, 8, 10]`
  - **Line 7** (`while window_sum >= target:`): `risk_note`: `"Shrink loop: use while (not if) because one large new element may allow shrinking multiple left elements."`
  - **Line 8** (`best = min(best, right - left + 1)`): *(Keep existing note)*
  - **Line 10** (`left += 1`): *(Keep existing note)*
- **Replace `recommended_tests`:** `["Total sum of entire array < target returns 0", "Single element >= target returns 1", "Entire array needed to reach target", "Large final element triggers multi-step shrink"]`
- **`pattern_diagnosis_options`:** `["sliding_window", "two_pointers", "hash_maps", "dynamic_programming"]`
- **`ai_avoid_keywords`:** `["while window_sum >= target", "right - left + 1", "window_sum -= nums[left]"]`
- **`starter_code`:** `def min_subarray_len(target, nums):\n    pass`

#### 9. `sw-004` — Permutation in a String (16 lines | Target: 4 lines = 25%)
- **Set `is_high_risk: true` on lines:** `[10, 11, 12, 14]`
  - **Line 10** (`window[ord(char) - ord('a')] += 1`): `risk_note`: `"Fixed alphabet mapping: convert 'a'..'z' into indices 0..25 for O(1) comparison."`
  - **Line 11** (`if right >= width:`): *(Keep existing note)*
  - **Line 12** (`outgoing = s2[right - width]`): `risk_note`: `"Outgoing index: the character leaving the fixed window is at right - width."`
  - **Line 14** (`if right >= width - 1 and window == need:`): *(Keep existing note)*
- **Replace `recommended_tests`:** `["len(s1) > len(s2) returns False immediately", "Match occurs at index 0 (first full window)", "Match occurs at the very last window of s2", "Same letter set with different counts like s1='aab', s2='abb' returns False"]`
- **`pattern_diagnosis_options`:** `["sliding_window", "hash_maps", "two_pointers", "breadth_first_search"]`
- **`ai_avoid_keywords`:** `["ord('a')", "right - width", "right >= width - 1"]`
- **`starter_code`:** `def contains_permutation(s1, s2):\n    pass`

#### 10. `sw-005` — Longest Repeating Character Replacement (13 lines | Target: 3 lines = 23%)
- **Set `is_high_risk: true` on lines:** `[8, 9, 10]`
  - **Line 8** (`max_frequency = max(max_frequency, counts[char])`): `risk_note`: `"Monotonic max count: max_frequency never needs to shrink because smaller frequencies cannot beat the best length."`
  - **Line 9** (`while (right - left + 1) - max_frequency > k:`): *(Keep existing note)*
  - **Line 10** (`counts[s[left]] -= 1`): `risk_note`: `"State sync: decrement the outgoing left character's count before advancing left."`
- **Replace `recommended_tests`:** `["k == 0 returns longest contiguous identical run", "k >= len(s) returns len(s)", "Single character string returns 1", "Dominant character shifts mid-string like 'ABBB' with k=1"]`
- **`pattern_diagnosis_options`:** `["sliding_window", "hash_maps", "dynamic_programming", "two_pointers"]`
- **`ai_avoid_keywords`:** `["max_frequency", "(right - left + 1) - max_frequency", "counts[s[left]] -="]`
- **`starter_code`:** `def character_replacement(s, k):\n    pass`

---

### Pattern 3: Hash Maps (`hash_maps`)

#### 11. `hm-001` — Two Sum (8 lines | Target: 2 lines = 25%) **[CRITICAL FIX: Was 0 lines]**
- **Set `is_high_risk: true` on lines:** `[5, 7]`
  - **Line 5** (`if complement in seen:`): `risk_note`: `"Check-before-insert invariant: look up target - value before storing value so an index never pairs with itself."`
  - **Line 7** (`seen[value] = index`): `risk_note`: `"Insertion timing: store the current number only after confirming its complement was not seen earlier."`
- **Populate `hardest_lines_to_test`** with lines `5` and `7`, and **`recommended_tests`:** `["Element equal to target / 2 appears once (e.g. nums=[3, 2, 4], target=6 must not return [0, 0])", "Duplicate values form the answer (e.g. nums=[3, 3], target=6 returns [0, 1])", "Negative numbers summing to target", "Two-element array"]`
- **`pattern_diagnosis_options`:** `["hash_maps", "two_pointers", "sliding_window", "dynamic_programming"]`
- **`ai_avoid_keywords`:** `["target - value", "complement in seen", "seen[value] = index"]`
- **`starter_code`:** `def two_sum(nums, target):\n    pass`

#### 12. `hm-002` — Group Anagrams (8 lines | Target: 2 lines = 25%) **[CRITICAL FIX: Was 0 lines]**
- **Set `is_high_risk: true` on lines:** `[4, 7]`
  - **Line 4** (`key = tuple(sorted(word))`): `risk_note`: `"Hashable key rule: sorted(word) returns a mutable list (TypeError as dict key); wrap in tuple() to make it hashable."`
  - **Line 7** (`groups[key].append(word)`): `risk_note`: `"Preserve original data: append the original word to the bucket, not the sorted key."`
- **Populate `hardest_lines_to_test`** with lines `4` and `7`, and **`recommended_tests`:** `["Empty strings ['', ''] grouped together", "Single word input ['a']", "No anagrams at all (each word in its own group)", "Words with repeated letters like 'aab' vs 'abb' stay separate"]`
- **`pattern_diagnosis_options`:** `["hash_maps", "two_pointers", "sliding_window", "breadth_first_search"]`
- **`ai_avoid_keywords`:** `["tuple(sorted(", "groups.values()", "defaultdict"]`
- **`starter_code`:** `def group_anagrams(strs):\n    pass`

#### 13. `hm-003` — Subarray Sum Equals K (9 lines | Target: 2 lines = 22%)
- **Set `is_high_risk: true` on lines:** `[2, 7]`
  - **Line 2** (`prefix_count = {0: 1}`): `risk_note`: `"Empty-prefix seed: without {0: 1}, valid subarrays starting at index 0 are missed."`
  - **Line 7** (`answer += prefix_count.get(prefix_sum - k, 0)`): *(Keep existing note)*
- **Replace `recommended_tests`:** `["Subarray starting at index 0 equals k (tests {0: 1} seed)", "k == 0 with non-zero elements (must not count empty subarrays)", "Negative numbers causing the same prefix sum to repeat multiple times", "Single element equal to k"]`
- **`pattern_diagnosis_options`:** `["hash_maps", "sliding_window", "two_pointers", "dynamic_programming"]`
- **`ai_avoid_keywords`:** `["{0: 1}", "prefix_sum - k", "prefix_count"]`
- **`starter_code`:** `def count_subarrays_sum_k(nums, k):\n    pass`

#### 14. `hm-004` — Longest Consecutive Sequence (12 lines | Target: 3 lines = 25%)
- **Set `is_high_risk: true` on lines:** `[4, 5, 8]`
  - **Line 4** (`for value in values:`): `risk_note`: `"Deduplicated iteration: iterate over the set values (not nums) so massive duplicates do not degrade runtime to O(n^2)."`
  - **Line 5** (`if value - 1 not in values:`): *(Keep existing note)*
  - **Line 8** (`while current + 1 in values:`): `risk_note`: `"Sequence walk: each number is visited in this while-loop at most once across the entire run."`
- **Replace `recommended_tests`:** `["Empty array [] returns 0", "Many duplicate values [1, 2, 2, 3] returns 3", "Negative-to-positive sequence [-2, -1, 0, 1]", "Disjoint sequences where longest appears second"]`
- **`pattern_diagnosis_options`:** `["hash_maps", "two_pointers", "dynamic_programming", "sliding_window"]`
- **`ai_avoid_keywords`:** `["value - 1 not in", "set(nums)", "current + 1"]`
- **`starter_code`:** `def longest_consecutive(nums):\n    pass`

#### 15. `hm-005` — Top K Frequent Elements (12 lines | Target: 3 lines = 25%)
- **Set `is_high_risk: true` on lines:** `[4, 8, 11]`
  - **Line 4** (`buckets = [[] for _ in range(len(nums) + 1)]`): `risk_note`: `"Bucket sizing & aliasing: size must be len(nums) + 1 (max frequency is n), and avoid [[]] * n which shares one list reference."`
  - **Line 8** (`for frequency in range(len(nums), 0, -1):`): `risk_note`: `"Reverse scan: walk from highest possible frequency len(nums) down to 1."`
  - **Line 11** (`if len(answer) == k:`): *(Keep existing note)*
- **Replace `recommended_tests`:** `["Single element array [7], k=1 (tests bucket index len(nums))", "All elements identical [4, 4, 4], k=1", "k equals number of distinct elements", "Negative numbers in nums"]`
- **`pattern_diagnosis_options`:** `["hash_maps", "two_pointers", "sliding_window", "dynamic_programming"]`
- **`ai_avoid_keywords`:** `["buckets[frequency]", "range(len(nums), 0, -1)", "Counter"]`
- **`starter_code`:** `def top_k_frequent(nums, k):\n    pass`

---

### Pattern 4: Dynamic Programming (`dynamic_programming`)

#### 16. `dp-001` — Climbing Stairs (7 lines | Target: 2 lines = 29%)
- **Set `is_high_risk: true` on lines:** `[5, 6]`
  - **Line 5** (`for _ in range(3, n + 1):`): `risk_note`: `"Loop bounds: base cases cover steps 1 and 2; range must include n via n + 1."`
  - **Line 6** (`one, two = two, one + two`): *(Keep existing note)*
- **Replace `recommended_tests`:** `["Base cases n = 1 (returns 1) and n = 2 (returns 2)", "First recurrence step n = 3 (returns 3)", "Larger input n = 45 (verifies linear time, no recursion TLE)"]`
- **`pattern_diagnosis_options`:** `["dynamic_programming", "breadth_first_search", "two_pointers", "hash_maps"]`
- **`ai_avoid_keywords`:** `["one, two = two, one + two", "range(3, n + 1)", "fibonacci"]`
- **`starter_code`:** `def climb_stairs(n):\n    pass`

#### 17. `dp-002` — House Robber (6 lines | Target: 2 lines = 33%)
- **Set `is_high_risk: true` on lines:** `[5, 6]`
  - **Line 5** (`two_back, one_back = one_back, max(one_back, two_back + money)`): *(Keep existing note)*
  - **Line 6** (`return one_back`): `risk_note`: `"Final state readout: one_back holds the best total through the final house (not two_back)."`
- **Replace `recommended_tests`:** `["Single house [5] returns 5", "Two houses [2, 9] returns 9", "Skipping two houses in a row is optimal [2, 1, 1, 2] returns 4", "Houses containing 0 values [0, 0, 0]"]`
- **`pattern_diagnosis_options`:** `["dynamic_programming", "sliding_window", "two_pointers", "hash_maps"]`
- **`ai_avoid_keywords`:** `["max(one_back, two_back + money)", "two_back, one_back ="]`
- **`starter_code`:** `def house_robber(nums):\n    pass`

#### 18. `dp-003` — Coin Change (9 lines | Target: 2 lines = 22%)
- **Set `is_high_risk: true` on lines:** `[4, 8]`
  - **Line 4** (`dp[0] = 0`): `risk_note`: `"DP base case: amount 0 requires 0 coins; every reachable state builds upward from this anchor."`
  - **Line 8** (`dp[value] = min(dp[value], dp[value - coin] + 1)`): *(Keep existing note)*
- **Replace `recommended_tests`:** `["amount == 0 returns 0", "Impossible amount like coins=[2], amount=3 returns -1", "Greedy fails case: coins=[1, 3, 4], amount=6 returns 2 (3+3, not 4+1+1)", "Coin larger than amount like coins=[5], amount=3 returns -1"]`
- **`pattern_diagnosis_options`:** `["dynamic_programming", "breadth_first_search", "hash_maps", "two_pointers"]`
- **`ai_avoid_keywords`:** `["dp[value - coin] + 1", "dp[0] = 0", "amount + 1"]`
- **`starter_code`:** `def coin_change(coins, amount):\n    pass`

#### 19. `dp-004` — Longest Increasing Subsequence (10 lines | Target: 2 lines = 20%)
- **Set `is_high_risk: true` on lines:** `[5, 9]`
  - **Line 5** (`position = bisect_left(tails, value)`): *(Keep existing note)*
  - **Line 9** (`tails[position] = value`): `risk_note`: `"Tail replacement: lowering a tail never reduces existing LIS length and makes future extensions easier."`
- **Replace `recommended_tests`:** `["All equal values [7, 7, 7, 7] returns 1 (tests strict bisect_left)", "Strictly decreasing array [5, 4, 3, 2, 1] returns 1", "Single element [10] returns 1", "Non-contiguous optimal sequence with negative numbers"]`
- **`pattern_diagnosis_options`:** `["dynamic_programming", "sliding_window", "two_pointers", "hash_maps"]`
- **`ai_avoid_keywords`:** `["bisect_left", "tails[position] = value", "len(tails)"]`
- **`starter_code`:** `def longest_increasing_subsequence(nums):\n    pass`

#### 20. `dp-005` — Unique Paths (6 lines | Target: 2 lines = 33%)
- **Set `is_high_risk: true` on lines:** `[2, 5]`
  - **Line 2** (`dp = [1] * n`): `risk_note`: `"Row base case: there is exactly 1 way to reach every cell in the top row."`
  - **Line 5** (`dp[col] += dp[col - 1]`): *(Keep existing note)*
- **Replace `recommended_tests`:** `["1x1 grid returns 1", "1xN or Mx1 single-line grid returns 1", "Symmetric check: unique_paths(3, 7) == unique_paths(7, 3) == 28"]`
- **`pattern_diagnosis_options`:** `["dynamic_programming", "breadth_first_search", "two_pointers", "hash_maps"]`
- **`ai_avoid_keywords`:** `["dp[col] += dp[col - 1]", "dp = [1] * n"]`
- **`starter_code`:** `def unique_paths(m, n):\n    pass`

---

### Pattern 5: Breadth-First Search (`breadth_first_search`)

#### 21. `bfs-001` — Binary Tree Level Order Traversal (18 lines | Target: 4 lines = 22%)
- **Set `is_high_risk: true` on lines:** `[5, 8, 11, 17]`
  - **Line 5** (`queue = deque([root])`): `risk_note`: `"Queue seeding: seed root only after ruling out root is None, or deque([None]) will crash on node.val."`
  - **Line 8** (`level_size = len(queue)`): *(Keep existing note)*
  - **Line 11** (`node = queue.popleft()`): `risk_note`: `"FIFO discipline: popleft() preserves level-by-level left-to-right order; pop() would turn this into DFS."`
  - **Line 17** (`result.append(level)`): `risk_note`: `"Level commit: append the level list once per outer while-iteration, outside the inner for-loop."`
- **Replace `recommended_tests`:** `["Empty tree (root=None) returns []", "Single-node tree [1] returns [[1]]", "Completely left-skewed or right-skewed tree", "Tree with missing inner children (null gaps)"]`
- **`pattern_diagnosis_options`:** `["breadth_first_search", "dynamic_programming", "two_pointers", "hash_maps"]`
- **`ai_avoid_keywords`:** `["level_size = len(queue)", "popleft()", "deque([root])"]`
- **`starter_code`:** `def level_order(root):\n    pass`

#### 22. `bfs-002` — Number of Islands (20 lines | Target: 4 lines = 20%)
- **Set `is_high_risk: true` on lines:** `[10, 12, 17, 18]`
  - **Line 10** (`islands += 1`): `risk_note`: `"Component trigger: increment islands once when discovering an unvisited '1' before flooding its component."`
  - **Line 12** (`grid[r][c] = '0'`): *(Keep existing note)*
  - **Line 17** (`if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':`): *(Keep existing note — also note string `'1'` vs integer `1`)*
  - **Line 18** (`grid[nr][nc] = '0'`): `risk_note`: `"Enqueue-time marking: mark neighbor visited BEFORE appending to queue so shared neighbors are not queued multiple times."`
- **Replace `recommended_tests`:** `["All water grid returns 0", "All land 3x3 grid returns 1 (tests visited marking against duplicate queue blowup)", "Diagonal-only land cells count as separate islands", "1x1 grid with '1' or '0'"]`
- **`pattern_diagnosis_options`:** `["breadth_first_search", "dynamic_programming", "sliding_window", "two_pointers"]`
- **`ai_avoid_keywords`:** `["grid[nr][nc] = '0'", "popleft()", "directions"]`
- **`starter_code`:** `def num_islands(grid):\n    pass`

#### 23. `bfs-003` — Rotting Oranges (24 lines | Target: 5 lines = 21%)
- **Set `is_high_risk: true` on lines:** `[9, 14, 15, 19, 20]`
  - **Line 9** (`queue.append((r, c))`): `risk_note`: `"Multi-source seeding: enqueue ALL initially rotten oranges before starting BFS so they spread simultaneously."`
  - **Line 14** (`while queue and fresh > 0:`): `risk_note`: `"Phantom-minute guard: stop as soon as fresh == 0 so the final empty-spread layer does not add an extra minute."`
  - **Line 15** (`for _ in range(len(queue)):`): *(Keep existing note)*
  - **Line 19** (`if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:`): *(Keep existing note)*
  - **Line 20** (`grid[nr][nc] = 2`): `risk_note`: `"State mutation on enqueue: mark cell rotten immediately to avoid double-decrementing fresh."`
- **Replace `recommended_tests`:** `["No fresh oranges initially returns 0", "Isolated fresh orange behind empty cells returns -1", "Two simultaneous rotten sources meeting in the middle", "Fresh oranges present with zero rotten oranges returns -1"]`
- **`pattern_diagnosis_options`:** `["breadth_first_search", "dynamic_programming", "sliding_window", "hash_maps"]`
- **`ai_avoid_keywords`:** `["while queue and fresh > 0", "for _ in range(len(queue))", "fresh -= 1"]`
- **`starter_code`:** `def oranges_rotting(grid):\n    pass`

#### 24. `bfs-004` — Shortest Path in a Binary Matrix (18 lines | Target: 4 lines = 22%)
- **Set `is_high_risk: true` on lines:** `[4, 7, 8, 15]`
  - **Line 4** (`if grid[0][0] == 1 or grid[n - 1][n - 1] == 1:`): `risk_note`: `"Endpoint validation: check both top-left and bottom-right before starting BFS."`
  - **Line 7** (`queue = deque([(0, 0, 1)])`): `risk_note`: `"Distance base: start at 1 (not 0) because path length counts visited cells including start and end."`
  - **Line 8** (`grid[0][0] = 1`): *(Keep existing note)*
  - **Line 15** (`if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:`): *(Keep existing note)*
- **Replace `recommended_tests`:** `["1x1 open grid [[0]] returns 1", "Blocked start [[1,0],[0,0]] or blocked end [[0,0],[0,1]] returns -1", "Diagonal shortcut beats orthogonal route", "Completely walled-off bottom-right returns -1"]`
- **`pattern_diagnosis_options`:** `["breadth_first_search", "dynamic_programming", "two_pointers", "sliding_window"]`
- **`ai_avoid_keywords`:** `["(0, 0, 1)", "grid[nr][nc] = 1", "dr != 0 or dc != 0"]`
- **`starter_code`:** `def shortest_path_binary_matrix(grid):\n    pass`

#### 25. `bfs-005` — Open the Lock (21 lines | Target: 4 lines = 19%)
- **Set `is_high_risk: true` on lines:** `[5, 16, 18, 19]`
  - **Line 5** (`if start in blocked:`): `risk_note`: `"Start-blocked edge case: if '0000' is a deadend, return -1 before exploring neighbors."`
  - **Line 16** (`next_digit = (digit + delta) % 10`): `risk_note`: `"Cyclic wraparound: modulo 10 wraps 9 + 1 -> 0 and 0 - 1 -> 9 cleanly."`
  - **Line 18** (`if neighbor not in blocked and neighbor not in visited:`): *(Keep existing note)*
  - **Line 19** (`visited.add(neighbor)`): `risk_note`: `"Visited timing: insert neighbor into visited immediately before enqueueing to prevent exponential duplicates."`
- **Replace `recommended_tests`:** `["Start state '0000' is in deadends returns -1", "Target equals '0000' (not blocked) returns 0", "Wraparound path using 0 -> 9 (e.g. target '9000' takes 1 move)", "All 8 immediate neighbors of '0000' are deadends returns -1"]`
- **`pattern_diagnosis_options`:** `["breadth_first_search", "dynamic_programming", "hash_maps", "two_pointers"]`
- **`ai_avoid_keywords`:** `["(digit + delta) % 10", "visited.add(neighbor)", "blocked = set(deadends)"]`
- **`starter_code`:** `def open_lock(deadends, target):\n    pass`

---

## 4. Recommended File & Folder Architecture (Isolated From Normal `/problems`)

Adapt folder prefixes (`src/app/` for Next.js App Router, `src/pages/` for Vite/React Router) to match your existing Prism Code project structure, while keeping the `mastery` namespace strictly isolated:

```text
prism-code/
├── docs/
│   └── PATTERN_MASTERY_README.md               # This file
├── data/
│   └── mastery/
│       └── prism_code_first_25_problems.json   # Patched v1.1.0 catalog (source of truth)
├── types/
│   └── mastery.ts                              # Strict TypeScript interfaces for the JSON schema
├── lib/
│   └── mastery/
│       ├── catalog.ts                          # Typed loader, pattern grouping, slug lookup
│       └── progress.ts                         # Client localStorage (Phase 1) / DB adapter hook
├── components/
│   └── mastery/
│       ├── PatternHubCard.tsx                  # Pattern card on /mastery hub
│       ├── PatternClueQuiz.tsx                 # Interactive pattern-diagnosis gate
│       ├── BruteForceCompare.tsx               # Brute-force bottleneck vs optimal summary
│       ├── LockedHintLadder.tsx                # Progressive 1-by-1 hint revealer
│       ├── SubgoalBlueprintViewer.tsx          # THE CORE UI: subgoals + line inspector + 25% highlighter + mask mode
│       └── MistakeNoteBox.tsx                  # Per-problem personal mistake note
└── app/ (or pages/)
    └── mastery/
        ├── page.tsx                            # /mastery — 5-Pattern Curriculum Hub
        └── [slug]/
            └── page.tsx                        # /mastery/tp-001 — Active Blueprint Studio
```

> **Route Design Tip:** Using `/mastery/[slug]` (e.g., `/mastery/tp-001`) keeps URLs clean and prevents accidental collisions with `/problems/[slug]`.

---

## 5. Feature 1 UI/UX Specification (What Makes It Feel Exclusive)

Feature 1 does **not** require a code runner or backend AI yet. Its job is to make studying these 100 problems feel radically better than reading a flat textbook editorial.

### Page A: `/mastery` — Pattern Mastery Hub
1. **Hero Banner:** Clear positioning copy: *"Don't memorize 300 solutions. Master the 5 foundational blueprints through trigger diagnosis, subgoal architecture, and targeted line recall."*
2. **Overall Progress Bar:** `X / 25 Blueprints Studied` + `Y High-Risk Lines Tested`.
3. **5 Ordered Pattern Sections** (rendered strictly in `supported_pattern_order`):
   - `1. Two Pointers` (`tp-001` to `tp-005`)
   - `2. Sliding Window` (`sw-001` to `sw-005`)
   - `3. Hash Maps` (`hm-001` to `hm-005`)
   - `4. Dynamic Programming` (`dp-001` to `dp-005`)
   - `5. Breadth-First Search` (`bfs-001` to `bfs-005`)
4. **Problem Row / Card:** Displays title, difficulty badge, estimated minutes, count of high-risk lines (`e.g., 3 critical lines`), and status (`Not Started` | `Diagnosed` | `Blueprint Studied`).

### Page B: `/mastery/[slug]` — Active Blueprint Studio
Design this as a **clean, distraction-free vertical or split-pane studio** with **5 progressive modules**:

1. **Module 1: Problem Statement & Constraints (Pattern Hidden by Default)**
   - Render `statement.description`, `input_format`, `output_format`, `examples`, and `constraints`.
   - **Important:** Do NOT display the pattern name (`Sliding Window`, `Two Pointers`, etc.) in the top header until the user completes Module 2 (or clicks *"Reveal Pattern"*).

2. **Module 2: Pattern Trigger Diagnosis (Active Gate)**
   - Prompt: *"Before looking at code, which pattern do these clues point to?"*
   - Show the 4 options from `pattern_diagnosis_options` in randomized/shuffled order.
   - Once answered:
     - Highlight `trigger_words` inline or as glowing chips.
     - Reveal `pattern_clues` explaining *why* this structure triggers the pattern.
     - Unlock Modules 3, 4, and 5 (keep a small *"Skip gate"* link for returning reviewers).

3. **Module 3: Why Brute Force Fails + Locked Hint Ladder**
   - **Brute Force Card:** Show `brute_force.time_complexity` vs `optimal_solution.time_complexity` side by side, `why_it_is_too_slow`, and a collapsible `brute_force.code` block.
   - **Locked Hint Ladder:** Show `Hint 1` collapsed; clicking reveals Hint 1 and unlocks the `Hint 2` button, continuing through `hints.length`. Never show all hints expanded at once.

4. **Module 4: Interactive Subgoal Blueprint Viewer (The Signature Feature)**
   Build a segmented toolbar at the top of the optimal solution card with **3 Modes**:
   - **Mode 1 — Blueprint Mode (Default):**
     - Group `optimal_solution.code_lines` into visual containers based on `optimal_solution.subgoals` (`line_range: [start, end]`).
     - Above each group, render the subgoal `title` and 1-sentence `explanation`.
     - Clicking or hovering **any line of code** shows its `why_this_line` explanation cleanly in an inline callout or right-hand inspector panel.
   - **Mode 2 — Hardest 25% Focus Mode:**
     - Dim standard boilerplate lines (`is_high_risk: false`) slightly and highlight `is_high_risk: true` lines with an amber border + `Critical Line` badge.
     - Display each critical line's `risk_note` and the problem's `recommended_tests` checklist right below.
   - **Mode 3 — Quick Recall Check (Preview of Feature 4):**
     - Hide the code text of every `is_high_risk: true` line behind an interactive blur/blank box (`[ Click to recall this critical line ]`) while showing the subgoal label and `why_this_line` prompt as a clue.
     - Clicking reveals the exact line so the user can check themselves (`Got it` / `Missed it`).
   - Below the code viewer, display `optimal_solution.why_this_works`, `time_complexity`, and `space_complexity`.

5. **Module 5: Personal Mistake Log & Mark Complete**
   - A lightweight textarea: *"What tripped you up or what boundary condition should you remember 48 hours from now?"*
   - Persist progress + personal note in `localStorage` under a namespaced key (`prism_mastery_progress_v1`) so Feature 1 works immediately with zero database migrations (ready to sync to your user DB later).
   - Footer navigation: `Previous Problem` and `Next Problem in Track`.

---

## 6. Feature 1 Polish Checklist (Do Not Move to Feature 2 Until All Pass)

- [ ] **Zero Impact on Normal Site:** `/problems` and `/problems/[slug]` work identically to before with zero regressions.
- [ ] **Schema Validation Passes:** A validation script confirms all 25 problems have:
  - valid `subgoals` whose `line_range` covers `1..code_lines.length` with no gaps or out-of-bounds indices,
  - at least 2 `is_high_risk: true` lines per problem (19%–33% coverage),
  - `hardest_lines_to_test` synced 1-to-1 with `code_lines` where `is_high_risk === true`,
  - zero copy-pasted `"A window that becomes valid..."` strings on non-sliding-window problems.
- [ ] **Pattern Tag Is Actually Hidden** until Module 2 is answered (no accidental spoilers in page titles, breadcrumbs, or URLs if you use `/mastery/tp-001` vs `/mastery/two_pointers/...`).
- [ ] **Subgoal Viewer Feels Effortless:** Clicking any line smoothly updates the `"Why this line"` explanation without layout jumps; switching between *Blueprint*, *Hardest 25%*, and *Quick Recall* modes is instant.
- [ ] **Responsive & Readable:** Code blocks scroll horizontally cleanly on mobile without breaking layout; syntax highlighting matches Prism Code's existing theme (dark/light).
- [ ] **Human Polish Test:** Have 1 friend read 3 problems (`tp-001`, `sw-002`, `bfs-003`)—they should understand *why* every critical line exists without needing an external video.

---

## 7. Step-by-Step Prompts for Antigravity in VS Code

Run these **5 prompts one by one** inside Antigravity. After each prompt, inspect the preview in your browser and polish any visual glitches before pasting the next prompt.

### Before Prompt 1 (Setup)
1. Save your JSON file to `data/mastery/prism_code_first_25_problems.json`.
2. Save this Markdown file to `docs/PATTERN_MASTERY_README.md`.

---

### Prompt 1 — Inspect Stack, Patch the 25-Problem JSON, & Validate
```text
Read docs/PATTERN_MASTERY_README.md completely first.

Before writing any UI code:
1. Inspect my existing Prism Code repository structure (framework, styling library, router, theme colors, and existing navbar). Do NOT modify any files in the existing /problems section.
2. Upgrade data/mastery/prism_code_first_25_problems.json from v1.0.0 to v1.1.0 by applying EVERY patch listed in Section 3 of docs/PATTERN_MASTERY_README.md across all 25 problems:
   - Update is_high_risk and risk_note on every specified line_number in optimal_solution.code_lines.
   - Sync hardest_lines_to_test with all is_high_risk: true lines and replace recommended_tests with the exact problem-specific tests in Section 3.
   - Add pattern_diagnosis_options, ai_avoid_keywords, and starter_code to every problem.
3. Create a strict TypeScript types file (types/mastery.ts) and a Node validation script (scripts/validateMasteryCatalog.mjs) that checks all 25 problems for line-number alignment, subgoal range integrity, high-risk coverage, and required fields.
4. Run the validation script and show me the summary table of all 25 problems confirming 0 errors.
```

---

### Prompt 2 — Build Isolated Data Loader, Progress Store & Navbar Entry
```text
Now implement the isolated data layer for the Pattern Mastery section following Section 4 of docs/PATTERN_MASTERY_README.md:
1. Create lib/mastery/catalog.ts to load prism_code_first_25_problems.json with full TypeScript typing, helper functions to group problems by supported_pattern_order, get a problem by slug, and get previous/next problem links.
2. Create lib/mastery/progress.ts using localStorage (namespaced key: prism_mastery_progress_v1) to store per-problem state: diagnosed (boolean), hintsUnlocked (number), recallResults (record of lineNumber -> 'got_it' | 'missed'), mistakeNote (string), and completed (boolean).
3. Add a single navigation link titled "Pattern Mastery" (with a subtle "Core 25" badge) to the existing top navbar pointing to /mastery. Do NOT touch /problems or any existing problem components.
```

---

### Prompt 3 — Build the `/mastery` Curriculum Hub Page
```text
Create the dedicated /mastery hub page matching Prism Code's existing design system and theme (dark/light mode, typography, spacing), following Page A in Section 5 of docs/PATTERN_MASTERY_README.md:
1. Hero header explaining the active pattern-construction approach (5 core patterns, 25 blueprints, trigger clues, subgoals, hardest 25% lines).
2. Overall progress summary bar pulling from lib/mastery/progress.ts.
3. All 5 patterns rendered strictly in supported_pattern_order with pattern descriptions, per-pattern progress indicator, and clean problem cards showing title, difficulty pill, estimated minutes, count of high-risk lines, and completion state.
4. Clicking a problem navigates to /mastery/[slug].
5. Verify the page renders cleanly on desktop and mobile with zero console errors.
```

---

### Prompt 4 — Build the `/mastery/[slug]` Active Blueprint Studio
```text
Create the /mastery/[slug] page and modular components under components/mastery/ following Page B in Section 5 of docs/PATTERN_MASTERY_README.md:
1. Problem Statement Header: Show title, difficulty, time estimate, statement, examples, and constraints. Hide the pattern badge until the user completes PatternClueQuiz (or clicks "Reveal Pattern").
2. PatternClueQuiz: Multiple-choice pattern check using pattern_diagnosis_options. Upon answering, reveal pattern_clues and highlight trigger_words.
3. BruteForceCompare & LockedHintLadder: Side-by-side Big-O comparison, why_it_is_too_slow, collapsible brute-force code, and progressive 1-by-1 hint buttons.
4. SubgoalBlueprintViewer (polish this to perfection):
   - Renders optimal_solution.code_lines grouped inside labeled subgoal blocks (using subgoals line_range).
   - 3 instant view-mode tabs:
     a) "Blueprint Mode": Click any line to inspect why_this_line in a sticky side/inline panel.
     b) "Hardest 25%": Highlights is_high_risk lines with risk_note callouts and displays recommended_tests.
     c) "Quick Recall": Blurs/masks is_high_risk lines while showing subgoal title + why_this_line as a clue; clicking reveals the line with "Got it" / "Missed" self-check buttons saved to progress.
   - Show why_this_works and complexity cards below.
5. MistakeNoteBox (auto-saves personal note) + "Mark Blueprint Studied" button + Previous/Next problem navigation.
```

---

### Prompt 5 — QA, Visual Polish & Regression Audit
```text
Perform a thorough polish pass on Feature 1 using the checklist in Section 6 of docs/PATTERN_MASTERY_README.md:
1. Run the build/typecheck and fix any TypeScript, ESLint, or hydration warnings.
2. Verify in the browser:
   - /problems still loads normally with zero changes or regressions.
   - /mastery loads all 5 patterns and 25 problems accurately.
   - Test /mastery/tp-001, /mastery/hm-001, /mastery/hm-002, /mastery/sw-004, and /mastery/bfs-003 end-to-end across all 3 SubgoalBlueprintViewer modes.
   - Confirm no spoiler leaks (pattern name stays hidden before diagnosis) and mobile horizontal code scrolling works smoothly.
3. Summarize any remaining edge cases or visual tweaks needed.
```

---

## 8. How Feature 1 Plugs Directly Into Feature 2, 3, 4 & 5 (No Rewrite Needed)

Because we upgraded the schema to `v1.1.0` now, your next features snap straight onto this exact JSON file:
- **Feature 2 (Browser Code Runner):** Uses `starter_code` + test cases inside Web Workers (JS/TS) or client-side Pyodide (Python).
- **Feature 3 (8-Step Guided Solver):** Reuses `PatternClueQuiz`, `BruteForceCompare`, `LockedHintLadder`, and adds an editor + subgoal fading toggle (`Stage 1` -> `Stage 4`).
- **Feature 4 (3-Minute Fill-in-the-Blank Recall Drills):** Upgrades Mode 3 (*Quick Recall*) from click-to-reveal into a real typed fill-in-the-blank input for every `is_high_risk: true` line.
- **Feature 5 (FSRS Spaced Recall + Interview Countdown):** Uses `recallResults` and `mistakeNote` to schedule 48-hour and long-term reviews via `ts-fsrs`.