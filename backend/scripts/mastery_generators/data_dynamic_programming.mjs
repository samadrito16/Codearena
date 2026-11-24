/**
 * Dynamic Programming Pattern Mastery Blueprints (5 Curated Production Blueprints)
 * Zero placeholder content. Full executable brute force & optimal solutions.
 */

export function getCuratedDynamicProgramming() {
  return [
    {
      id: 'dp-001',
      slug: 'energy-vault-multi-step-elevation-climb',
      title: 'Energy Vault Multi-Step Elevation Climb',
      pattern: 'dynamic_programming',
      difficulty: 'Easy',
      estimated_minutes: 15,
      statement: {
        description: 'You are climbing an energy staircase. It takes total_steps steps to reach the top.\\n\\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\\n\\nMust achieve O(N) time with O(1) auxiliary memory.',
        input_format: 'total_steps: int',
        output_format: 'int representing total distinct climbing combinations',
        examples: [
          {
            input: 'total_steps = 3',
            output: '3',
            explanation: 'There are three ways to reach the top: 1 step + 1 step + 1 step, 1 step + 2 steps, 2 steps + 1 step.'
          },
          {
            input: 'total_steps = 5',
            output: '8',
            explanation: 'The 8 combinations correspond to Fibonacci(6) = 8.'
          }
        ],
        constraints: [
          '1 <= total_steps <= 45'
        ]
      },
      pattern_clues: [
        'Optimal substructure: reaching step N can only happen from step N - 1 (with 1 step) or step N - 2 (with 2 steps)',
        'Overlapping subproblems: ways(N) = ways(N - 1) + ways(N - 2), exhibiting Fibonacci recurrence',
        'State depends only on previous 2 numbers, allowing O(1) rolling space optimization'
      ],
      trigger_words: ['distinct ways to climb', 'step 1 or 2', 'fibonacci recurrence', 'overlapping subproblems', 'rolling variables'],
      brute_force: {
        approach: 'Use pure recursive branching: def climb(n): if n <= 2: return n; return climb(n - 1) + climb(n - 2).',
        why_it_is_too_slow: 'Exponential O(2^N) time branches recursively into 2^45 (over 35 trillion) calls, causing a severe Time Limit Exceeded.',
        time_complexity: 'O(2^N)',
        space_complexity: 'O(N)',
        language: 'python',
        code: `def count_distinct_climbing_ways(total_steps):
    if total_steps <= 2:
        return total_steps
    return count_distinct_climbing_ways(total_steps - 1) + count_distinct_climbing_ways(total_steps - 2)`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Recognize the recurrence ways(n) = ways(n - 1) + ways(n - 2) with base cases ways(1) = 1 and ways(2) = 2. Use two rolling integer variables prev2 and prev1 initialized to 1 and 2, updating iteratively from step 3 up to total_steps.',
        time_complexity: 'O(N)',
        space_complexity: 'O(1)',
        why_this_works: 'Each state depends strictly on the two immediately preceding values. Maintaining two variables eliminates an O(N) array allocation while calculating the solution in a single linear pass of N iterations.',
        subgoals: [
          {
            title: 'Handle base cases',
            explanation: 'Return total_steps directly if total_steps <= 2 (1 step has 1 way, 2 steps have 2 ways).',
            line_range: [2, 3]
          },
          {
            title: 'Initialize rolling state variables',
            explanation: 'Set prev2 = 1 (step 1 ways) and prev1 = 2 (step 2 ways).',
            line_range: [4, 4]
          },
          {
            title: 'Iterative transition loop',
            explanation: 'Iterate from 3 to total_steps, computing curr = prev1 + prev2 and shifting rolling variables.',
            line_range: [5, 8]
          },
          {
            title: 'Return total distinct paths',
            explanation: 'Return prev1 holding total ways to reach top.',
            line_range: [9, 9]
          }
        ],
        code: `def count_distinct_climbing_ways(total_steps):
    if total_steps <= 2:
        return total_steps
    prev2, prev1 = 1, 2
    for _ in range(3, total_steps + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1`,
        code_lines: [
          { line_number: 1, code: 'def count_distinct_climbing_ways(total_steps):', why_this_line: 'Declares function to compute number of distinct ways to climb staircase.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    if total_steps <= 2:', why_this_line: 'Base cases: 1 step has 1 way, 2 steps has 2 ways.', is_high_risk: true, risk_note: 'Guards against running the loop for inputs 1 and 2.' },
          { line_number: 3, code: '        return total_steps', why_this_line: 'Returns early for base steps 1 and 2.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    prev2, prev1 = 1, 2', why_this_line: 'Initializes rolling state for step 1 (prev2 = 1) and step 2 (prev1 = 2).', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    for _ in range(3, total_steps + 1):', why_this_line: 'Iterates from step 3 through total_steps inclusive.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '        curr = prev1 + prev2', why_this_line: 'Computes distinct ways to reach current step: ways(n-1) + ways(n-2).', is_high_risk: true, risk_note: 'Recurrence relation adds ways to reach from 1 step below and 2 steps below.' },
          { line_number: 7, code: '        prev2 = prev1', why_this_line: 'Shifts prev1 into prev2 for the next step.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '        prev1 = curr', why_this_line: 'Shifts curr into prev1 for the next step.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '    return prev1', why_this_line: 'Returns accumulated ways to reach the final top step.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 2,
          code: 'if total_steps <= 2: return total_steps',
          why_it_is_tricky: 'Failing to guard small steps causes loop range(3, 2) to skip, returning incorrect uninitialized values.',
          recommended_tests: ['Step 1 (must return 1)', 'Step 2 (must return 2)']
        },
        {
          line_number: 7,
          code: 'prev2 = prev1',
          why_it_is_tricky: 'Reversing assignment order (prev1 = curr before prev2 = prev1) overwrites prev1 before prev2 gets its value.',
          recommended_tests: ['Step 4 (must return 5)', 'Max constraint Step 45 (must return 1836311903)']
        }
      ],
      hints: [
        'How many ways are there to reach step 1? 1 way. Step 2? 2 ways (1+1 or 2).',
        'To reach step 3, you either take 1 step from step 2, or 2 steps from step 1. So ways(3) = ways(2) + ways(1).',
        'Do you need an entire array to store all previous answers? Only the last two values are ever needed!'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['climb stairs', 'fibonacci', 'prev1 prev2', 'dp'],
      starter_code: `def count_distinct_climbing_ways(total_steps: int) -> int:
    """
    Return distinct ways to climb total_steps taking 1 or 2 steps.
    """
    pass
`
    },
    {
      id: 'dp-002',
      slug: 'non-adjacent-security-node-optimizer',
      title: 'Non-Adjacent Security Node Optimizer',
      pattern: 'dynamic_programming',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'You are planning to harvest energy from a street of security nodes represented by an array of non-negative integers node_capacities. Adjacent nodes have security interlocks: if two adjacent nodes are harvested on the same night, an alarm triggers.\\n\\nReturn the maximum amount of energy you can harvest without alerting security.',
        input_format: 'node_capacities: list[int]',
        output_format: 'int representing maximum harvested energy sum',
        examples: [
          {
            input: 'node_capacities = [2, 7, 9, 3, 1]',
            output: '12',
            explanation: 'Harvest node 0 (2), node 2 (9), and node 4 (1). Total energy = 2 + 9 + 1 = 12.'
          },
          {
            input: 'node_capacities = [2, 1, 1, 2]',
            output: '4',
            explanation: 'Harvest node 0 (2) and node 3 (2). Total energy = 2 + 2 = 4.'
          }
        ],
        constraints: [
          '1 <= node_capacities.length <= 10,000',
          '0 <= node_capacities[i] <= 1,000'
        ]
      },
      pattern_clues: [
        'At each node i, we face a binary choice: harvest node i (yields node_capacities[i] + optimal(i - 2)) OR skip node i (yields optimal(i - 1))',
        'Non-overlapping independent subproblems exhibit the House Robber recurrence: dp[i] = max(dp[i - 1], dp[i - 2] + val)',
        'State only depends on the previous two maximums, allowing O(1) space optimization'
      ],
      trigger_words: ['non-adjacent elements', 'maximum energy harvest', 'skip or take decision', 'house robber', 'rolling dp'],
      brute_force: {
        approach: 'Use recursive backtracking to explore all 2^N subsets of non-adjacent indices. For each node, either take it and recurse on i + 2, or skip it and recurse on i + 1. Return the maximum yield.',
        why_it_is_too_slow: 'Without memoization, the recursive tree branches into O(2^N) states, which overflows the stack and hangs for N > 30.',
        time_complexity: 'O(2^N)',
        space_complexity: 'O(N)',
        language: 'python',
        code: `def max_non_adjacent_energy_yield(node_capacities):
    def harvest(idx):
        if idx >= len(node_capacities):
            return 0
        take = node_capacities[idx] + harvest(idx + 2)
        skip = harvest(idx + 1)
        return max(take, skip)
    return harvest(0)`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Maintain two rolling variables prev2 and prev1 representing maximum energy harvestable up to i - 2 and i - 1. For each node, compute curr = max(prev1, prev2 + node_capacities[i]), then shift prev2 = prev1 and prev1 = curr.',
        time_complexity: 'O(N)',
        space_complexity: 'O(1)',
        why_this_works: 'The decision at node i depends only on whether skipping (prev1) or taking (prev2 + val) yields a higher total. By preserving the optimal decision for the previous two subproblems, we find the global maximum in linear time with O(1) memory.',
        subgoals: [
          {
            title: 'Handle base cases',
            explanation: 'Return 0 if empty; return single element if len is 1; return max of first two if len is 2.',
            line_range: [2, 5]
          },
          {
            title: 'Initialize rolling subproblem trackers',
            explanation: 'Set prev2 = node_capacities[0] and prev1 = max(node_capacities[0], node_capacities[1]).',
            line_range: [6, 7]
          },
          {
            title: 'Iterate through nodes with take-or-skip decision',
            explanation: 'From index 2 to end, compute curr = max(prev1, prev2 + val) and advance rolling state.',
            line_range: [8, 12]
          },
          {
            title: 'Return optimal harvest total',
            explanation: 'Return prev1 holding global maximum energy.',
            line_range: [13, 13]
          }
        ],
        code: `def max_non_adjacent_energy_yield(node_capacities):
    if not node_capacities:
        return 0
    if len(node_capacities) <= 2:
        return max(node_capacities)
    prev2 = node_capacities[0]
    prev1 = max(node_capacities[0], node_capacities[1])
    for i in range(2, len(node_capacities)):
        curr = max(prev1, prev2 + node_capacities[i])
        prev2 = prev1
        prev1 = curr
    return prev1`,
        code_lines: [
          { line_number: 1, code: 'def max_non_adjacent_energy_yield(node_capacities):', why_this_line: 'Declares function computing maximum non-adjacent energy yield.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    if not node_capacities:', why_this_line: 'Guards against empty array.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '        return 0', why_this_line: 'Returns 0 when no nodes exist.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    if len(node_capacities) <= 2:', why_this_line: 'Handles base inputs with 1 or 2 nodes.', is_high_risk: true, risk_note: 'For 2 nodes, must choose the maximum of the two since adjacent harvesting is forbidden.' },
          { line_number: 5, code: '        return max(node_capacities)', why_this_line: 'Returns max of base elements.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '    prev2 = node_capacities[0]', why_this_line: 'Optimal harvest for subproblem of length 1 (node 0).', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '    prev1 = max(node_capacities[0], node_capacities[1])', why_this_line: 'Optimal harvest for subproblem of length 2 (max of node 0 or node 1).', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '    for i in range(2, len(node_capacities)):', why_this_line: 'Iterates through remaining nodes starting at index 2.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '        curr = max(prev1, prev2 + node_capacities[i])', why_this_line: 'Evaluates optimal choice: skip current node (prev1) OR harvest current node (prev2 + val).', is_high_risk: true, risk_note: 'Fundamental recurrence: max(skip, take).' },
          { line_number: 10, code: '        prev2 = prev1', why_this_line: 'Shifts prev1 into prev2 for next iteration.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '        prev1 = curr', why_this_line: 'Shifts curr into prev1 for next iteration.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '    return prev1', why_this_line: 'Returns global maximum energy harvestable.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 4,
          code: 'if len(node_capacities) <= 2: return max(node_capacities)',
          why_it_is_tricky: 'Failing to handle 2 elements with max() causes index errors or summing both adjacent elements.',
          recommended_tests: ['Single element [10] (must return 10)', 'Two elements [20, 50] (must return 50)']
        },
        {
          line_number: 9,
          code: 'curr = max(prev1, prev2 + node_capacities[i])',
          why_it_is_tricky: 'Adding node_capacities[i] to prev1 instead of prev2 illegally combines adjacent nodes.',
          recommended_tests: ['Strictly increasing [1, 2, 3, 4, 5] (must return 1 + 3 + 5 = 9)']
        }
      ],
      hints: [
        'At each house/node, what are your choices? Either you harvest it (and cannot harvest the previous one), or you skip it.',
        'If you harvest node i, your maximum yield is node_capacities[i] plus the best answer up to node i - 2.',
        'If you skip node i, your maximum yield is the best answer up to node i - 1. Take the max of both!'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['house robber', 'non-adjacent', 'capacities', 'dp'],
      starter_code: `def max_non_adjacent_energy_yield(node_capacities: list[int]) -> int:
    """
    Return maximum energy harvestable without choosing adjacent nodes.
    """
    pass
`
    },
    {
      id: 'dp-003',
      slug: 'unbounded-denomination-change-minimizer',
      title: 'Unbounded Denomination Change Minimizer',
      pattern: 'dynamic_programming',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'You are given an integer array token_types representing tokens of different denominations and an integer target_cost representing a total amount of cost.\\n\\nReturn the fewest number of tokens that you need to make up that amount. If that amount of money cannot be made up by any combination of the tokens, return -1.\\n\\nYou may assume that you have an infinite number of each kind of token.',
        input_format: 'token_types: list[int], target_cost: int',
        output_format: 'int representing minimal token count, or -1',
        examples: [
          {
            input: 'token_types = [1, 2, 5], target_cost = 11',
            output: '3',
            explanation: '11 = 5 + 5 + 1 (3 tokens total).'
          },
          {
            input: 'token_types = [2], target_cost = 3',
            output: '-1',
            explanation: 'No combination of 2s can sum to odd number 3.'
          }
        ],
        constraints: [
          '1 <= token_types.length <= 12',
          '1 <= token_types[i] <= 2^31 - 1',
          '0 <= target_cost <= 10,000'
        ]
      },
      pattern_clues: [
        'Unbounded knapsack: each coin denomination can be reused unlimited times',
        'Finding minimum items to reach a target sum',
        'Bottom-up dynamic programming table dp[amount] = min(dp[amount], dp[amount - token] + 1)'
      ],
      trigger_words: ['coin change', 'fewest tokens', 'unbounded knapsack', 'minimum denominations', 'bottom up table'],
      brute_force: {
        approach: 'Recursive depth-first search trying every token denomination from target_cost down to 0: solve(rem) = 1 + min(solve(rem - c) for c in tokens). If rem == 0 return 0; if rem < 0 return infinity.',
        why_it_is_too_slow: 'Exponential O(T^C) branching explores redundant subproblems repeatedly, hanging the system for target_cost > 30.',
        time_complexity: 'O(C^target)',
        space_complexity: 'O(target)',
        language: 'python',
        code: `def min_token_denominations_for_amount(token_types, target_cost):
    def solve(rem):
        if rem == 0:
            return 0
        if rem < 0:
            return float('inf')
        min_tokens = float('inf')
        for t in token_types:
            res = solve(rem - t)
            if res != float('inf'):
                min_tokens = min(min_tokens, res + 1)
        return min_tokens
    ans = solve(target_cost)
    return ans if ans != float('inf') else -1`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Create a DP array dp of size target_cost + 1 initialized to infinity, with base case dp[0] = 0. For each token in token_types, iterate amount from token to target_cost and update dp[amount] = min(dp[amount], dp[amount - token] + 1). Return dp[target_cost] if not infinity else -1.',
        time_complexity: 'O(C * target_cost)',
        space_complexity: 'O(target_cost)',
        why_this_works: 'By solving smaller sub-amounts first and iterating amount forward from token to target_cost, we naturally allow multiple selections of the same denomination in linear time per token denomination.',
        subgoals: [
          {
            title: 'Initialize DP table and base case',
            explanation: 'Allocate array of size target_cost + 1 filled with infinity; set dp[0] = 0.',
            line_range: [2, 3]
          },
          {
            title: 'Bottom-up unbounded knapsack iteration',
            explanation: 'For each token, update all amounts from token up to target_cost using previous subproblems.',
            line_range: [4, 7]
          },
          {
            title: 'Return minimum tokens or -1 fallback',
            explanation: 'Return dp[target_cost] if reachable, otherwise -1.',
            line_range: [8, 8]
          }
        ],
        code: `def min_token_denominations_for_amount(token_types, target_cost):
    dp = [float("inf")] * (target_cost + 1)
    dp[0] = 0
    for token in token_types:
        for amount in range(token, target_cost + 1):
            if dp[amount - token] + 1 < dp[amount]:
                dp[amount] = dp[amount - token] + 1
    return dp[target_cost] if dp[target_cost] != float("inf") else -1`,
        code_lines: [
          { line_number: 1, code: 'def min_token_denominations_for_amount(token_types, target_cost):', why_this_line: 'Declares function to find minimum token count to make target cost.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    dp = [float("inf")] * (target_cost + 1)', why_this_line: 'Initializes DP table with infinity representing unreachable states.', is_high_risk: true, risk_note: 'Must use target_cost + 1 so index target_cost is accessible.' },
          { line_number: 3, code: '    dp[0] = 0', why_this_line: 'Foundational base case: making an amount of 0 requires 0 tokens.', is_high_risk: true, risk_note: 'Without dp[0] = 0, no positive amount can ever be reached.' },
          { line_number: 4, code: '    for token in token_types:', why_this_line: 'Iterates through each available token denomination.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '        for amount in range(token, target_cost + 1):', why_this_line: 'Iterates forward from token to target_cost, enabling multiple reuse of the same token.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '            if dp[amount - token] + 1 < dp[amount]:', why_this_line: 'Checks if using current token yields fewer tokens than historical minimum for this amount.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '                dp[amount] = dp[amount - token] + 1', why_this_line: 'Updates DP table with new minimum token count.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '    return dp[target_cost] if dp[target_cost] != float("inf") else -1', why_this_line: 'Returns minimum tokens if target is reachable, otherwise returns -1.', is_high_risk: true, risk_note: 'Must return -1 when amount cannot be formed.' }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 3,
          code: 'dp[0] = 0',
          why_it_is_tricky: 'If target_cost is 0, the function must return 0 immediately without taking any tokens.',
          recommended_tests: ['target_cost = 0 with tokens [1] (must return 0)', 'Impossible amount [2] with target 3 (must return -1)']
        },
        {
          line_number: 5,
          code: 'for amount in range(token, target_cost + 1):',
          why_it_is_tricky: 'Starting range from 1 instead of token causes negative index out of bounds.',
          recommended_tests: ['Token larger than target_cost [10] with target 5 (must return -1)']
        }
      ],
      hints: [
        'What is the base case? It takes 0 tokens to make an amount of 0.',
        'If you know the minimum tokens needed to make amount (x - token), how many tokens does it take to make amount x? Just add 1 token!',
        'Loop through amounts from token to target_cost so you can reuse the same token denomination.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['coin change', 'tokens', 'denominations', 'knapsack'],
      starter_code: `def min_token_denominations_for_amount(token_types: list[int], target_cost: int) -> int:
    """
    Return fewest tokens needed to make target_cost, or -1.
    """
    pass
`
    },
    {
      id: 'dp-004',
      slug: 'strictly-ascending-telemetry-subsequence-span',
      title: 'Strictly Ascending Telemetry Subsequence Span',
      pattern: 'dynamic_programming',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'Given an integer array signal_values, return the length of the longest strictly increasing subsequence.\\n\\nA subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.\\n\\nMust achieve O(N log N) time complexity.',
        input_format: 'signal_values: list[int]',
        output_format: 'int representing length of longest strictly increasing subsequence',
        examples: [
          {
            input: 'signal_values = [10, 9, 2, 5, 3, 7, 101, 18]',
            output: '4',
            explanation: 'The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4. Another valid one is [2, 5, 7, 101].'
          },
          {
            input: 'signal_values = [7, 7, 7, 7, 7]',
            output: '1',
            explanation: 'Because the subsequence must be STRICTLY increasing, identical elements cannot be chained together. Length is 1.'
          }
        ],
        constraints: [
          '1 <= signal_values.length <= 2,500',
          '-10^4 <= signal_values[i] <= 10^4'
        ]
      },
      pattern_clues: [
        'Finding longest strictly increasing subsequence in O(N log N) time',
        'Patience sorting invariant: tails[i] stores the smallest tail value among all increasing subsequences of length i + 1',
        'Binary search (bisect_left) finds insertion or replacement index in O(log N) time per element'
      ],
      trigger_words: ['longest increasing subsequence', 'patience sort', 'bisect_left', 'tails array', 'O(N log N)'],
      brute_force: {
        approach: 'Standard quadratic dynamic programming: dp[i] = max(dp[j] + 1) for all j < i with signal_values[j] < signal_values[i]. Check all previous elements for each index.',
        why_it_is_too_slow: 'Quadratic O(N^2) evaluates N * (N - 1) / 2 comparisons, which fails to meet the strict O(N log N) requirement.',
        time_complexity: 'O(N^2)',
        space_complexity: 'O(N)',
        language: 'python',
        code: `def length_of_strictly_ascending_run(signal_values):
    if not signal_values:
        return 0
    n = len(signal_values)
    dp = [1] * n
    for i in range(1, n):
        for j in range(i):
            if signal_values[j] < signal_values[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Maintain a list tails where tails[k] stores the smallest tail of all strictly increasing subsequences of length k + 1. For each x in signal_values, use binary search (bisect_left) to find the first tail >= x. If idx == len(tails), append x; otherwise replace tails[idx] = x. The length of tails is the answer.',
        time_complexity: 'O(N log N)',
        space_complexity: 'O(N)',
        why_this_works: 'The tails array is always strictly sorted. Replacing tails[idx] with a smaller x gives subsequent elements a better chance to build a longer subsequence without shortening the existing length, running in O(N log N) total time.',
        subgoals: [
          {
            title: 'Initialize patience sort tails array',
            explanation: 'Create empty list tails to store minimal tail values for each subsequence length.',
            line_range: [3, 4]
          },
          {
            title: 'Binary search insertion position',
            explanation: 'For each signal value, find its position in tails using bisect_left to maintain sorted order.',
            line_range: [5, 6]
          },
          {
            title: 'Extend or replace tails and return length',
            explanation: 'Append if greater than all tails, else replace tails[idx]; return len(tails).',
            line_range: [7, 11]
          }
        ],
        code: `import bisect

def length_of_strictly_ascending_run(signal_values):
    tails = []
    for x in signal_values:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)`,
        code_lines: [
          { line_number: 1, code: 'import bisect', why_this_line: 'Imports Python binary search library for O(log N) insertion position queries.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '', why_this_line: 'Blank separator line.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: 'def length_of_strictly_ascending_run(signal_values):', why_this_line: 'Declares function returning length of longest strictly increasing subsequence.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    tails = []', why_this_line: 'Maintains smallest tail value for each subsequence length.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    for x in signal_values:', why_this_line: 'Iterates through each number in the input stream.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '        idx = bisect.bisect_left(tails, x)', why_this_line: 'Finds first index where tails[idx] >= x in O(log N) time.', is_high_risk: true, risk_note: 'Must use bisect_left (not bisect_right) to enforce STRICTLY increasing property.' },
          { line_number: 7, code: '        if idx == len(tails):', why_this_line: 'Checks if x is strictly greater than all elements currently in tails.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '            tails.append(x)', why_this_line: 'Extends longest subsequence length by 1.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '        else:', why_this_line: 'Executes when x can replace an existing larger tail value.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '            tails[idx] = x', why_this_line: 'Lowers the minimum tail for subsequence of length idx + 1.', is_high_risk: true, risk_note: 'Lowering tails[idx] makes it easier for future numbers to extend this length.' },
          { line_number: 11, code: '    return len(tails)', why_this_line: 'Returns length of tails, which equals length of longest increasing subsequence.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 6,
          code: 'idx = bisect.bisect_left(tails, x)',
          why_it_is_tricky: 'Using bisect_right treats duplicates as strictly increasing, erroneously returning 5 for [7, 7, 7, 7, 7] instead of 1.',
          recommended_tests: ['All identical elements [7, 7, 7, 7] (must return 1)', 'Strictly decreasing [5, 4, 3, 2, 1] (must return 1)']
        },
        {
          line_number: 10,
          code: 'tails[idx] = x',
          why_it_is_tricky: 'Overwriting the entire array instead of index idx corrupts the sorted tails invariant.',
          recommended_tests: ['Interleaved elements [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15] (must return 6)']
        }
      ],
      hints: [
        'Standard DP takes O(N^2). Can you use binary search to reach O(N log N)?',
        'Maintain a list where tails[i] stores the smallest tail of all increasing subsequences of length i + 1.',
        'Use bisect_left to find where the current element fits into tails, and either append or replace.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['increasing subsequence', 'bisect', 'tails', 'patience'],
      starter_code: `def length_of_strictly_ascending_run(signal_values: list[int]) -> int:
    """
    Return length of longest strictly increasing subsequence in O(N log N).
    """
    pass
`
    },
    {
      id: 'dp-005',
      slug: 'grid-routing-coordinate-combinator',
      title: 'Grid Routing Coordinate Combinator',
      pattern: 'dynamic_programming',
      difficulty: 'Medium',
      estimated_minutes: 20,
      statement: {
        description: 'There is a robot on an grid_rows x grid_cols grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[grid_rows - 1][grid_cols - 1]). The robot can only move either down or right at any point in time.\\n\\nGiven the two integers grid_rows and grid_cols, return the number of possible unique paths that the robot can take to reach the bottom-right corner.\\n\\nMust achieve O(grid_cols) auxiliary memory.',
        input_format: 'grid_rows: int, grid_cols: int',
        output_format: 'int representing total unique paths',
        examples: [
          {
            input: 'grid_rows = 3, grid_cols = 7',
            output: '28',
            explanation: 'From (0, 0) to (2, 6) there are 28 unique combinations of moving down and right.'
          },
          {
            input: 'grid_rows = 3, grid_cols = 2',
            output: '3',
            explanation: 'From (0, 0) to (2, 1) there are 3 paths: 1. Down -> Down -> Right, 2. Down -> Right -> Down, 3. Right -> Down -> Down.'
          }
        ],
        constraints: [
          '1 <= grid_rows, grid_cols <= 100'
        ]
      },
      pattern_clues: [
        'Grid transition rule: path(r, c) = path(r - 1, c) + path(r, c - 1)',
        'Boundary cells along top row and left column have exactly 1 path',
        'State for the current row depends only on the current row and the row immediately above it, allowing 1D array space optimization'
      ],
      trigger_words: ['unique paths', 'grid routing', 'down or right', '1D rolling array', 'pascal triangle grid'],
      brute_force: {
        approach: 'Use recursive branching from (0, 0): paths(r, c) = paths(r + 1, c) + paths(r, c + 1). If r == rows - 1 and c == cols - 1 return 1; if out of bounds return 0.',
        why_it_is_too_slow: 'Exponential O(2^(R + C)) time without memoization requires over 10^12 operations for a 20x20 grid, causing a timeout.',
        time_complexity: 'O(2^(R + C))',
        space_complexity: 'O(R + C)',
        language: 'python',
        code: `def count_unique_grid_paths(grid_rows, grid_cols):
    def count(r, c):
        if r == grid_rows - 1 and c == grid_cols - 1:
            return 1
        if r >= grid_rows or c >= grid_cols:
            return 0
        return count(r + 1, c) + count(r, c + 1)
    return count(0, 0)`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Initialize a 1D array dp of size grid_cols with all 1s (representing the first row). For each subsequent row from 1 to grid_rows - 1, iterate column c from 1 to grid_cols - 1 and update dp[c] += dp[c - 1]. Return dp[-1].',
        time_complexity: 'O(R * C)',
        space_complexity: 'O(C)',
        why_this_works: 'In 2D grid DP, dp[r][c] = dp[r-1][c] + dp[r][c-1]. In a 1D rolling array, before updating, dp[c] holds the value from the row above (r-1, c), and dp[c-1] holds the newly computed value to the left (r, c-1). Adding them in-place computes the next cell in O(1) space per column.',
        subgoals: [
          {
            title: 'Initialize 1D rolling array for first row',
            explanation: 'Allocate array of size grid_cols filled with 1s since top row has only 1 incoming path.',
            line_range: [2, 2]
          },
          {
            title: 'Iterate row by row updating path counts',
            explanation: 'For each row, update columns 1 to grid_cols - 1 with dp[c] += dp[c - 1].',
            line_range: [3, 5]
          },
          {
            title: 'Return bottom-right coordinate paths',
            explanation: 'Return dp[-1] holding unique paths to bottom-right corner.',
            line_range: [6, 6]
          }
        ],
        code: `def count_unique_grid_paths(grid_rows, grid_cols):
    dp = [1] * grid_cols
    for _ in range(1, grid_rows):
        for c in range(1, grid_cols):
            dp[c] += dp[c - 1]
    return dp[-1]`,
        code_lines: [
          { line_number: 1, code: 'def count_unique_grid_paths(grid_rows, grid_cols):', why_this_line: 'Declares function computing unique paths to bottom-right grid corner.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    dp = [1] * grid_cols', why_this_line: 'Initializes 1D DP table for row 0 with 1s since top row can only be traversed rightward.', is_high_risk: true, risk_note: 'Base row must be all 1s; every cell in the first row has exactly 1 path from the start.' },
          { line_number: 3, code: '    for _ in range(1, grid_rows):', why_this_line: 'Iterates through each remaining row from 1 to grid_rows - 1.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '        for c in range(1, grid_cols):', why_this_line: 'Iterates through columns starting at index 1.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '            dp[c] += dp[c - 1]', why_this_line: 'In-place update: new dp[c] = old dp[c] (from above) + dp[c-1] (from left).', is_high_risk: true, risk_note: 'Maintains 2D recurrence using only 1D memory.' },
          { line_number: 6, code: '    return dp[-1]', why_this_line: 'Returns final bottom-right cell count at dp[grid_cols - 1].', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 2,
          code: 'dp = [1] * grid_cols',
          why_it_is_tricky: 'Single row or single column grids (1 x N or N x 1) should return 1 immediately without entering the row loop.',
          recommended_tests: ['Single cell grid 1 x 1 (must return 1)', 'Single row 1 x 5 (must return 1)', 'Single column 5 x 1 (must return 1)']
        },
        {
          line_number: 5,
          code: 'dp[c] += dp[c - 1]',
          why_it_is_tricky: 'Starting column loop from 0 instead of 1 will add dp[-1] into dp[0], wrapping around erroneously.',
          recommended_tests: ['2 x 2 grid (must return 2)', '3 x 3 grid (must return 6)']
        }
      ],
      hints: [
        'How many ways can the robot reach any cell in the first row? Only 1 (moving right). The first column? Only 1 (moving down).',
        'For any other cell (r, c), how can the robot reach it? Either from the cell above (r - 1, c) or from the cell to the left (r, c - 1).',
        'Can you optimize space from a 2D matrix to a 1D array of size grid_cols? Yes, dp[c] += dp[c-1]!'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['unique paths', 'grid rows', 'cols', 'robot'],
      starter_code: `def count_unique_grid_paths(grid_rows: int, grid_cols: int) -> int:
    """
    Return unique paths to bottom-right corner of grid_rows x grid_cols matrix.
    """
    pass
`
    }
  ];
}
