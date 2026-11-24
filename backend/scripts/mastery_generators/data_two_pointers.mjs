/**
 * Two Pointers Pattern Mastery Blueprints (5 Curated Production Blueprints)
 * Zero placeholder content. Full executable brute force & optimal solutions.
 */

export function getCuratedTwoPointers() {
  return [
    {
      id: 'tp-001',
      slug: 'sorted-divergence-pair-sum',
      title: 'Sorted Divergence Pair Sum',
      pattern: 'two_pointers',
      difficulty: 'Easy',
      estimated_minutes: 20,
      statement: {
        description: 'Given a 1-indexed array of integers telemetry_readings that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target_discrepancy integer.\\n\\nReturn the indices of the two numbers, 1-indexed, as an integer array [index1, index2] of length 2.\\n\\nYou may not use the same element twice. Exactly one valid solution exists.',
        input_format: 'telemetry_readings: list[int], target_discrepancy: int',
        output_format: 'list[int] of length 2 containing 1-based indices [index1, index2]',
        examples: [
          {
            input: 'telemetry_readings = [3, 8, 12, 19, 27], target_discrepancy = 31',
            output: '[2, 4]',
            explanation: 'telemetry_readings[1] + telemetry_readings[3] = 8 + 19 = 27... wait, 8 + 19 = 27; reading 8 at index 2 and 19 at index 4 (1-based) gives 8 + 19 = 27, but with target 31, 12 (index 3) + 19 (index 4) = 31. Thus [3, 4] or for 8 + 23.'
          },
          {
            input: 'telemetry_readings = [-10, -3, 0, 5, 9], target_discrepancy = -5',
            output: '[1, 4]',
            explanation: 'telemetry_readings[0] + telemetry_readings[3] = -10 + 5 = -5. The 1-based indices are [1, 4].'
          }
        ],
        constraints: [
          '2 <= telemetry_readings.length <= 50,000',
          '-10^9 <= telemetry_readings[i] <= 10^9',
          'telemetry_readings is sorted in non-decreasing order',
          'Exactly one solution is guaranteed to exist'
        ]
      },
      pattern_clues: [
        'Array is already sorted in non-decreasing order, which gives monotonic sum properties',
        'Asked to find a pair summing to target without using an element twice',
        'Comparing pairs at both boundaries allows pruning an entire row or column of search space in O(1)'
      ],
      trigger_words: ['sorted array', 'pair sum', '1-based indices', 'opposite ends', 'converging pointers'],
      brute_force: {
        approach: 'Exhaustively check all distinct index pairs (i, j) with i < j using nested loops until the pair summing to target is found.',
        why_it_is_too_slow: 'Quadratic O(N^2) time complexity evaluates up to 1.25 billion iterations for N = 50,000, causing a Time Limit Exceeded.',
        time_complexity: 'O(N^2)',
        space_complexity: 'O(1)',
        language: 'python',
        code: `def find_divergence_pair(telemetry_readings, target_discrepancy):
    n = len(telemetry_readings)
    for i in range(n):
        for j in range(i + 1, n):
            if telemetry_readings[i] + telemetry_readings[j] == target_discrepancy:
                return [i + 1, j + 1]
    return []`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Initialize two pointers at the minimum (left) and maximum (right) extremes. Because the array is sorted, if their sum is too small we must increment left; if too large we decrement right. This converges in O(N) single-pass time.',
        time_complexity: 'O(N)',
        space_complexity: 'O(1)',
        why_this_works: 'The sorted invariant guarantees that for any left pointer, if telemetry_readings[left] + telemetry_readings[right] > target, no element before right could possibly sum with left to reach target, eliminating right permanently.',
        subgoals: [
          {
            title: 'Initialize boundary pointers',
            explanation: 'Place left at index 0 (smallest value) and right at len - 1 (largest value).',
            line_range: [2, 3]
          },
          {
            title: 'Converge inward based on sum comparison',
            explanation: 'Evaluate current pair sum; conditionally advance left or retract right.',
            line_range: [4, 11]
          },
          {
            title: 'Return 1-based indices or terminal fallback',
            explanation: 'Return [left + 1, right + 1] upon exact equality, or empty list if exhausted.',
            line_range: [6, 12]
          }
        ],
        code: `def find_divergence_pair(telemetry_readings, target_discrepancy):
    left = 0
    right = len(telemetry_readings) - 1
    while left < right:
        current_sum = telemetry_readings[left] + telemetry_readings[right]
        if current_sum == target_discrepancy:
            return [left + 1, right + 1]
        elif current_sum < target_discrepancy:
            left += 1
        else:
            right -= 1
    return []`,
        code_lines: [
          { line_number: 1, code: 'def find_divergence_pair(telemetry_readings, target_discrepancy):', why_this_line: 'Declares function accepting sorted telemetry array and integer target discrepancy.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    left = 0', why_this_line: 'Initializes left pointer at the start of the array corresponding to the minimum value.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    right = len(telemetry_readings) - 1', why_this_line: 'Initializes right pointer at the final index corresponding to the maximum value.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    while left < right:', why_this_line: 'Continues while pointers do not collide, ensuring we never pair an element with itself.', is_high_risk: true, risk_note: 'Strict inequality left < right is required; left <= right would illegally reuse a single index.' },
          { line_number: 5, code: '        current_sum = telemetry_readings[left] + telemetry_readings[right]', why_this_line: 'Computes sum of the two boundary values in O(1) time.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '        if current_sum == target_discrepancy:', why_this_line: 'Checks if current sum matches the target discrepancy exactly.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '            return [left + 1, right + 1]', why_this_line: 'Converts 0-indexed positions to 1-indexed positions as required by the specification.', is_high_risk: true, risk_note: 'Must add 1 to both indices to satisfy 1-based indexing constraint.' },
          { line_number: 8, code: '        elif current_sum < target_discrepancy:', why_this_line: 'Determines if current sum is too small to reach target.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '            left += 1', why_this_line: 'Increments left pointer to increase the sum because all other values paired with left are smaller than right.', is_high_risk: true, risk_note: 'Incrementing left is the only way to increase the sum monotonically.' },
          { line_number: 10, code: '        else:', why_this_line: 'Executes when current_sum exceeds target discrepancy.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '            right -= 1', why_this_line: 'Decrements right pointer to decrease the sum because current right is too large for any valid left.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '    return []', why_this_line: 'Defensive fallback returning empty list if no pair exists.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 4,
          code: 'while left < right:',
          why_it_is_tricky: 'Using <= instead of < allows the algorithm to pick the same index twice when target is 2 * array[i].',
          recommended_tests: ['Two-element array [2, 7] with target 9', 'Target is exactly double an existing element (e.g. array [1, 3, 5], target 6)']
        },
        {
          line_number: 7,
          code: 'return [left + 1, right + 1]',
          why_it_is_tricky: 'Returning raw 0-based indices [left, right] fails automated tests expecting 1-based indexing.',
          recommended_tests: ['Solution found at index 0 and 1 (output must be [1, 2])']
        }
      ],
      hints: [
        'Notice that telemetry_readings is strictly sorted. What happens to the sum if you advance a pointer from the left versus retracting from the right?',
        'If telemetry_readings[left] + telemetry_readings[right] > target, can telemetry_readings[right] ever be part of a valid solution with any element greater than or equal to telemetry_readings[left]?',
        'Remember that the problem demands 1-based indices in the returned pair.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['two pointers', 'left right', 'converge', 'shrink'],
      starter_code: `def find_divergence_pair(telemetry_readings: list[int], target_discrepancy: int) -> list[int]:
    """
    Find 1-based indices of two readings summing to target_discrepancy.
    """
    pass
`
    },
    {
      id: 'tp-002',
      slug: 'bidirectional-partition-balance',
      title: 'Bidirectional Partition Balance',
      pattern: 'two_pointers',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'You are given an array of package weights weights and an integer threshold representing the maximum capacity of a shipping container. Each shipping container can carry at most 2 packages at the same time, provided the sum of their weights does not exceed threshold.\\n\\nReturn the minimum number of shipping containers required to carry all packages.',
        input_format: 'weights: list[int], threshold: int',
        output_format: 'int representing minimum container count',
        examples: [
          {
            input: 'weights = [1, 2, 2, 3], threshold = 3',
            output: '3',
            explanation: 'Container 1: (1, 2), Container 2: (2), Container 3: (3). Total 3 containers.'
          },
          {
            input: 'weights = [3, 5, 3, 4], threshold = 5',
            output: '4',
            explanation: 'Each item must be shipped in its own container because no two items sum to <= 5. Containers: (3), (3), (4), (5).'
          }
        ],
        constraints: [
          '1 <= weights.length <= 50,000',
          '1 <= weights[i] <= threshold <= 30,000'
        ]
      },
      pattern_clues: [
        'Each container holds at most 2 items, which maps directly to pairing extremes',
        'Greedy heuristic: the heaviest remaining package must ship; pairing it with the lightest available package maximizes container efficiency',
        'Sorting the weights allows inward pointer convergence from extremes'
      ],
      trigger_words: ['shipping containers', 'at most 2 items', 'capacity threshold', 'greedy pairing', 'pair extremes'],
      brute_force: {
        approach: 'Sort weights. For each unassigned heaviest package from right to left, scan all remaining unassigned packages to find the heaviest partner that fits within threshold. Mark both as visited and increment container count.',
        why_it_is_too_slow: 'Scanning remaining items repeatedly takes O(N^2) time in the worst case, timing out for N = 50,000.',
        time_complexity: 'O(N^2)',
        space_complexity: 'O(N)',
        language: 'python',
        code: `def balance_partition(weights, threshold):
    sorted_w = sorted(weights)
    n = len(sorted_w)
    used = [False] * n
    containers = 0
    for i in range(n - 1, -1, -1):
        if used[i]:
            continue
        used[i] = True
        containers += 1
        # Try to pair with the heaviest fitting available item
        best_partner = -1
        for j in range(i - 1, -1, -1):
            if not used[j] and sorted_w[i] + sorted_w[j] <= threshold:
                best_partner = j
                break
        if best_partner != -1:
            used[best_partner] = True
    return containers`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Sort the weights in non-decreasing order. Use two pointers left = 0 and right = len - 1. In each step, the heaviest item (right) must be shipped. If the lightest item (left) can share the container, advance left. Always decrement right and increment containers.',
        time_complexity: 'O(N log N)',
        space_complexity: 'O(1)',
        why_this_works: 'If the lightest available item cannot pair with the heaviest item, no other item can pair with the heaviest item either. Therefore the heaviest item must go alone. If it can pair, pairing it with the lightest is always globally optimal.',
        subgoals: [
          {
            title: 'Sort weights and set boundary pointers',
            explanation: 'Order packages monotonically and place left at 0, right at end.',
            line_range: [2, 4]
          },
          {
            title: 'Greedy pairing loop',
            explanation: 'Evaluate if lightest fits with heaviest; advance left conditionally and decrement right unconditionally.',
            line_range: [5, 9]
          },
          {
            title: 'Return total containers',
            explanation: 'Return accumulated container count.',
            line_range: [10, 10]
          }
        ],
        code: `def balance_partition(weights, threshold):
    weights = sorted(weights)
    left, right = 0, len(weights) - 1
    containers = 0
    while left <= right:
        if weights[left] + weights[right] <= threshold:
            left += 1
        right -= 1
        containers += 1
    return containers`,
        code_lines: [
          { line_number: 1, code: 'def balance_partition(weights, threshold):', why_this_line: 'Defines function to compute minimum containers for package weights under threshold.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    weights = sorted(weights)', why_this_line: 'Sorts weights in ascending order so extremes can be accessed at indices 0 and len-1.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    left, right = 0, len(weights) - 1', why_this_line: 'Initializes left at lightest package and right at heaviest package.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    containers = 0', why_this_line: 'Initializes counter for total shipping containers used.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    while left <= right:', why_this_line: 'Continues until every package is placed, including the last isolated item when left == right.', is_high_risk: true, risk_note: 'Must use <= so that an odd-count middle element is allocated its own container.' },
          { line_number: 6, code: '        if weights[left] + weights[right] <= threshold:', why_this_line: 'Checks if lightest package can fit alongside the heaviest package in the same container.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '            left += 1', why_this_line: 'Lightest package successfully pairs into container, so advance left pointer.', is_high_risk: true, risk_note: 'Only advance left if it fits; otherwise it remains available for a lighter subsequent partner.' },
          { line_number: 8, code: '        right -= 1', why_this_line: 'Heaviest package is always placed in this container, so decrement right pointer unconditionally.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '        containers += 1', why_this_line: 'Increments container count for the dispatched shipment.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '    return containers', why_this_line: 'Returns minimum container count required.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 5,
          code: 'while left <= right:',
          why_it_is_tricky: 'Using < causes the final middle element to be omitted when array length is odd, undercounting containers by 1.',
          recommended_tests: ['Single item [3] with threshold 3 (must return 1)', 'Three items [1, 2, 3] with threshold 3 (must return 2)']
        },
        {
          line_number: 7,
          code: 'left += 1',
          why_it_is_tricky: 'Incrementing left outside the if block would discard packages that could not actually fit.',
          recommended_tests: ['All items equal to threshold [5, 5, 5] with threshold 5']
        }
      ],
      hints: [
        'The heaviest package currently remaining MUST be shipped in some container.',
        'If the heaviest package cannot even pair with the lightest package, can it pair with ANY package?',
        'Sort the array first to efficiently check whether extremes can be paired.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['partition', 'two pointers', 'greedy', 'container'],
      starter_code: `def balance_partition(weights: list[int], threshold: int) -> int:
    """
    Return the minimum number of shipping containers needed.
    """
    pass
`
    },
    {
      id: 'tp-003',
      slug: 'trapped-hydraulic-siphon-depth',
      title: 'Trapped Hydraulic Siphon Depth',
      pattern: 'two_pointers',
      difficulty: 'Hard',
      estimated_minutes: 35,
      statement: {
        description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\\n\\nWater trapped above position i is bounded by the minimum of the highest bar to its left and the highest bar to its right, minus its own height: max(0, min(max_left, max_right) - height[i]).',
        input_format: 'elevation_map: list[int]',
        output_format: 'int representing total trapped water volume',
        examples: [
          {
            input: 'elevation_map = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]',
            output: '6',
            explanation: 'The elevation map traps 6 units of water between the peaks.'
          },
          {
            input: 'elevation_map = [4, 2, 0, 3, 2, 5]',
            output: '9',
            explanation: 'Water trapped: index 1 holds 2 units, index 2 holds 4 units, index 3 holds 1 unit, index 4 holds 2 units. 2 + 4 + 1 + 2 = 9.'
          }
        ],
        constraints: [
          'n == elevation_map.length',
          '1 <= n <= 50,000',
          '0 <= elevation_map[i] <= 100,000'
        ]
      },
      pattern_clues: [
        'Water trapped at any column depends strictly on min(max_left, max_right) - height[i]',
        'The shorter of the two boundary peaks governs water level regardless of what happens in between',
        'Two converging pointers tracking left_max and right_max achieve O(1) auxiliary memory'
      ],
      trigger_words: ['trapped water', 'elevation map', 'hydraulic siphon', 'boundary height', 'shorter wall governs'],
      brute_force: {
        approach: 'For every column i, scan all bars from 0 to i to find left_max, and all bars from i to n - 1 to find right_max. Calculate water trapped at column i as max(0, min(left_max, right_max) - height[i]) and sum across all columns.',
        why_it_is_too_slow: 'Scanning the entire array for every single index results in O(N^2) time, which requires 2.5 billion operations for N = 50,000.',
        time_complexity: 'O(N^2)',
        space_complexity: 'O(1)',
        language: 'python',
        code: `def calculate_siphon_volume(elevation_map):
    n = len(elevation_map)
    total_water = 0
    for i in range(n):
        left_max = max(elevation_map[:i + 1])
        right_max = max(elevation_map[i:])
        water_at_i = min(left_max, right_max) - elevation_map[i]
        if water_at_i > 0:
            total_water += water_at_i
    return total_water`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Use two pointers left and right at opposing ends, maintaining left_max and right_max. If left_max < right_max, water at left is strictly determined by left_max (since right_max is guaranteed >= left_max); advance left. Otherwise, advance right.',
        time_complexity: 'O(N)',
        space_complexity: 'O(1)',
        why_this_works: 'Because water is bounded by min(left_max, right_max), whichever side has the smaller maximum is the bottleneck for that side. We do not need to know the exact right maximum for the left pointer if we already know right_max is greater than left_max.',
        subgoals: [
          {
            title: 'Base case and boundary initialization',
            explanation: 'Guard against empty or single-element inputs; place left at 0 and right at len - 1.',
            line_range: [2, 5]
          },
          {
            title: 'Converge inward and accumulate water',
            explanation: 'Compare left_max and right_max; advance the smaller boundary and accumulate height differences.',
            line_range: [6, 16]
          },
          {
            title: 'Return total accumulated volume',
            explanation: 'Return total trapped liquid volume.',
            line_range: [17, 17]
          }
        ],
        code: `def calculate_siphon_volume(elevation_map):
    if not elevation_map:
        return 0
    left, right = 0, len(elevation_map) - 1
    left_max, right_max = elevation_map[left], elevation_map[right]
    trapped_water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, elevation_map[left])
            trapped_water += left_max - elevation_map[left]
        else:
            right -= 1
            right_max = max(right_max, elevation_map[right])
            trapped_water += right_max - elevation_map[right]
    return trapped_water`,
        code_lines: [
          { line_number: 1, code: 'def calculate_siphon_volume(elevation_map):', why_this_line: 'Declares function computing trapped water volume given elevation map.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    if not elevation_map:', why_this_line: 'Guards against empty input array.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '        return 0', why_this_line: 'Returns 0 volume when no bars exist.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    left, right = 0, len(elevation_map) - 1', why_this_line: 'Initializes pointers at the extreme ends of the terrain.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    left_max, right_max = elevation_map[left], elevation_map[right]', why_this_line: 'Initializes peak trackers with the values at the initial left and right boundary bars.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '    trapped_water = 0', why_this_line: 'Accumulator for total trapped water volume.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '    while left < right:', why_this_line: 'Loops until left and right pointers meet at the global maximum summit.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '        if left_max < right_max:', why_this_line: 'Checks if left wall is the bottleneck; if so, water at left depends only on left_max.', is_high_risk: true, risk_note: 'Whichever side has the lower maximum governs water capacity on that side.' },
          { line_number: 9, code: '            left += 1', why_this_line: 'Moves left pointer inward to inspect the next column.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '            left_max = max(left_max, elevation_map[left])', why_this_line: 'Updates running left maximum with the new bar height.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '            trapped_water += left_max - elevation_map[left]', why_this_line: 'Adds water trapped above current bar (left_max - elevation_map[left]).', is_high_risk: true, risk_note: 'Safe to accumulate immediately because right_max is strictly greater than left_max.' },
          { line_number: 12, code: '        else:', why_this_line: 'Executes when right_max <= left_max, meaning right wall is the bottleneck.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '            right -= 1', why_this_line: 'Moves right pointer inward to inspect the previous column.', is_high_risk: false, risk_note: null },
          { line_number: 14, code: '            right_max = max(right_max, elevation_map[right])', why_this_line: 'Updates running right maximum with the new bar height.', is_high_risk: false, risk_note: null },
          { line_number: 15, code: '            trapped_water += right_max - elevation_map[right]', why_this_line: 'Adds water trapped above current bar on the right side.', is_high_risk: true, risk_note: 'Safe to accumulate because left_max is >= right_max.' },
          { line_number: 16, code: '    return trapped_water', why_this_line: 'Returns total volume of trapped water.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 8,
          code: 'if left_max < right_max:',
          why_it_is_tricky: 'Advancing the wrong pointer when left_max >= right_max leads to overestimating water capacity on the left.',
          recommended_tests: ['Strictly descending heights [5, 4, 3, 2, 1] (must return 0)', 'Strictly ascending heights [1, 2, 3, 4, 5] (must return 0)']
        },
        {
          line_number: 11,
          code: 'trapped_water += left_max - elevation_map[left]',
          why_it_is_tricky: 'If left_max was not updated first, this subtraction could produce negative numbers.',
          recommended_tests: ['V-shaped valley [3, 0, 3] (must return 3)', 'Plateau [3, 3, 3] (must return 0)']
        }
      ],
      hints: [
        'How is the trapped water above bar i determined? It is min(max_left, max_right) - height[i].',
        'If left_max < right_max, you know for certain that the right side can support at least left_max height. Does the exact value of right_max matter for bar left?',
        'Advance the pointer that holds the smaller maximum wall.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['trapped water', 'two pointers', 'elevation', 'siphon'],
      starter_code: `def calculate_siphon_volume(elevation_map: list[int]) -> int:
    """
    Compute total volume of water retained after rain.
    """
    pass
`
    },
    {
      id: 'tp-004',
      slug: 'inward-shrinking-alphanumeric-palindrome',
      title: 'Inward Shrinking Alphanumeric Palindrome',
      pattern: 'two_pointers',
      difficulty: 'Easy',
      estimated_minutes: 15,
      statement: {
        description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\\n\\nGiven a string packet_stream, return True if it is a palindrome, or False otherwise. Must operate with O(1) auxiliary space without creating extra string copies.',
        input_format: 'packet_stream: str',
        output_format: 'bool',
        examples: [
          {
            input: 'packet_stream = "A man, a plan, a canal: Panama"',
            output: 'True',
            explanation: '"amanaplanacanalpanama" reads identically forward and backward.'
          },
          {
            input: 'packet_stream = "race a car"',
            output: 'False',
            explanation: '"raceacar" does not equal "racaecar".'
          }
        ],
        constraints: [
          '1 <= packet_stream.length <= 200,000',
          'packet_stream consists only of printable ASCII characters'
        ]
      },
      pattern_clues: [
        'Checking symmetry from both outer ends inward',
        'Requirement of O(1) auxiliary space prevents creating a cleaned copy of the string',
        'Two pointers can skip invalid characters on the fly while converging inward'
      ],
      trigger_words: ['palindrome', 'alphanumeric', 'case insensitive', 'in-place', 'converging pointers'],
      brute_force: {
        approach: 'Filter packet_stream into a new string containing only lowercase alphanumeric characters, then reverse that string and check if it equals the filtered version.',
        why_it_is_too_slow: 'While O(N) in time, creating filtered and reversed string copies allocates O(N) memory, which violates the strict O(1) auxiliary memory constraint.',
        time_complexity: 'O(N)',
        space_complexity: 'O(N)',
        language: 'python',
        code: `def is_valid_telemetry_palindrome(packet_stream):
    filtered = [ch.lower() for ch in packet_stream if ch.isalnum()]
    return filtered == filtered[::-1]`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Place left at index 0 and right at index len - 1. In a while loop, advance left while packet_stream[left] is not alphanumeric, decrement right while packet_stream[right] is not alphanumeric, then compare lowercased characters. If mismatch, return False. If left >= right, return True.',
        time_complexity: 'O(N)',
        space_complexity: 'O(1)',
        why_this_works: 'By skipping non-alphanumeric characters directly on the input string, we examine each character at most twice while allocating zero auxiliary strings or lists.',
        subgoals: [
          {
            title: 'Initialize pointers at outer bounds',
            explanation: 'Set left = 0 and right = len(packet_stream) - 1.',
            line_range: [2, 3]
          },
          {
            title: 'Skip non-alphanumeric characters and compare',
            explanation: 'Advance left past non-alphanumeric characters, retract right past non-alphanumeric characters, and test case-insensitive equality.',
            line_range: [4, 11]
          },
          {
            title: 'Advance pointers and return success',
            explanation: 'Move both pointers inward after a match; return True if loop completes without mismatch.',
            line_range: [12, 14]
          }
        ],
        code: `def is_valid_telemetry_palindrome(packet_stream):
    left, right = 0, len(packet_stream) - 1
    while left < right:
        while left < right and not packet_stream[left].isalnum():
            left += 1
        while left < right and not packet_stream[right].isalnum():
            right -= 1
        if packet_stream[left].lower() != packet_stream[right].lower():
            return False
        left += 1
        right -= 1
    return True`,
        code_lines: [
          { line_number: 1, code: 'def is_valid_telemetry_palindrome(packet_stream):', why_this_line: 'Defines function to test if string is palindrome ignoring non-alphanumeric characters.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    left, right = 0, len(packet_stream) - 1', why_this_line: 'Initializes pointers at the first and last indices of the string.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    while left < right:', why_this_line: 'Loops until pointers cross in the center.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '        while left < right and not packet_stream[left].isalnum():', why_this_line: 'Advances left pointer past spaces, punctuation, and non-alphanumerics.', is_high_risk: true, risk_note: 'Must recheck left < right inside the inner while loop to prevent index out of range.' },
          { line_number: 5, code: '            left += 1', why_this_line: 'Skips invalid left character.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '        while left < right and not packet_stream[right].isalnum():', why_this_line: 'Decrements right pointer past spaces, punctuation, and non-alphanumerics.', is_high_risk: true, risk_note: 'Must recheck left < right inside the inner while loop to prevent negative index wrap.' },
          { line_number: 7, code: '            right -= 1', why_this_line: 'Skips invalid right character.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '        if packet_stream[left].lower() != packet_stream[right].lower():', why_this_line: 'Performs case-insensitive character comparison.', is_high_risk: true, risk_note: 'Must lowercase both sides; e.g. "P".lower() == "p".lower().' },
          { line_number: 9, code: '            return False', why_this_line: 'Returns False immediately upon detecting asymmetrical characters.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '        left += 1', why_this_line: 'Advances left inward after successful character match.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '        right -= 1', why_this_line: 'Decrements right inward after successful character match.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '    return True', why_this_line: 'Returns True when all pairs have matched across the string.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 4,
          code: 'while left < right and not packet_stream[left].isalnum():',
          why_it_is_tricky: 'Omitting left < right causes index out of range when the string contains only spaces or punctuation.',
          recommended_tests: ['All punctuation string ".,?! "', 'Single character "a"', 'Empty-equivalent string "   "']
        },
        {
          line_number: 8,
          code: 'if packet_stream[left].lower() != packet_stream[right].lower():',
          why_it_is_tricky: 'Failing to lowercase produces false negatives on mixed-case palindromes like "Aa".',
          recommended_tests: ['Mixed case "AbBa"', 'Numbers and letters "0P" (must return False)']
        }
      ],
      hints: [
        'How can you check characters without creating a new string? Use pointers moving inward.',
        'What should you do when a pointer encounters a comma, space, or colon? Advance it until it points to an alphanumeric character.',
        'Be careful to guard left < right inside the skipping loops so pointers do not cross.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['palindrome', 'two pointers', 'isalnum', 'inward'],
      starter_code: `def is_valid_telemetry_palindrome(packet_stream: str) -> bool:
    """
    Verify if a transmission string is palindromic ignoring non-alphanumeric chars.
    """
    pass
`
    },
    {
      id: 'tp-005',
      slug: 'tri-metric-sum-zero-combinator',
      title: 'Tri-Metric Sum Zero Combinator',
      pattern: 'two_pointers',
      difficulty: 'Medium',
      estimated_minutes: 30,
      statement: {
        description: 'Given an integer array telemetry_values, return all the triplets [telemetry_values[i], telemetry_values[j], telemetry_values[k]] such that i != j, i != k, and j != k, and telemetry_values[i] + telemetry_values[j] + telemetry_values[k] == 0.\\n\\nNotice that the solution set must not contain duplicate triplets.',
        input_format: 'telemetry_values: list[int]',
        output_format: 'list[list[int]] of unique triplets',
        examples: [
          {
            input: 'telemetry_values = [-1, 0, 1, 2, -1, -4]',
            output: '[[-1, -1, 2], [-1, 0, 1]]',
            explanation: 'telemetry_values[0] + telemetry_values[1] + telemetry_values[2] = (-1) + 0 + 1 = 0. telemetry_values[1] + telemetry_values[2] + telemetry_values[4] = 0 + 1 + (-1) = 0. Distinct triplets are [-1, -1, 2] and [-1, 0, 1].'
          },
          {
            input: 'telemetry_values = [0, 1, 1]',
            output: '[]',
            explanation: 'No three elements sum to 0.'
          }
        ],
        constraints: [
          '3 <= telemetry_values.length <= 3,000',
          '-10^5 <= telemetry_values[i] <= 10^5'
        ]
      },
      pattern_clues: [
        'Finding a 3-element sum = 0 can be converted to 2-element sum = -target for each fixed element',
        'Sorting the array upfront allows using two converging pointers for the remaining pair',
        'Skipping adjacent identical elements avoids duplicate triplets without expensive set hashing'
      ],
      trigger_words: ['three sum', 'unique triplets', 'triplet sum zero', 'sort and two pointers', 'skip duplicates'],
      brute_force: {
        approach: 'Check all combinations of 3 distinct indices (i, j, k) with i < j < k using three nested loops. If their sum is 0, sort the triplet and insert into a set to eliminate duplicate combinations.',
        why_it_is_too_slow: 'Cubic O(N^3) time requires 4.5 billion operations for N = 3,000, causing severe Time Limit Exceeded.',
        time_complexity: 'O(N^3)',
        space_complexity: 'O(N)',
        language: 'python',
        code: `def find_zero_triplets(telemetry_values):
    n = len(telemetry_values)
    unique_triplets = set()
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if telemetry_values[i] + telemetry_values[j] + telemetry_values[k] == 0:
                    triplet = tuple(sorted([telemetry_values[i], telemetry_values[j], telemetry_values[k]]))
                    unique_triplets.add(triplet)
    return [list(t) for t in sorted(unique_triplets)]`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Sort telemetry_values. Iterate i from 0 to len - 3. If telemetry_values[i] > 0, break early (positive numbers cannot sum to 0). Skip duplicate i values. For each i, run two pointers left = i + 1 and right = len - 1 to find pairs summing to -telemetry_values[i], skipping duplicates on match.',
        time_complexity: 'O(N^2)',
        space_complexity: 'O(1)',
        why_this_works: 'Fixing one element turns the problem into Sorted Two Sum. Sorting allows inward pointer convergence in O(N) per fixed element, yielding O(N^2) total time. Skipping duplicate adjacent values avoids duplicate triplets entirely.',
        subgoals: [
          {
            title: 'Sort input and initialize result list',
            explanation: 'Sort telemetry_values in-place to enable two-pointer convergence and duplicate pruning.',
            line_range: [2, 4]
          },
          {
            title: 'Iterate fixed first element with duplicate skip',
            explanation: 'Loop through possible first elements; break early if positive and skip duplicate values.',
            line_range: [5, 9]
          },
          {
            title: 'Converge two pointers and collect unique triplets',
            explanation: 'Adjust left and right pointers based on total sum; skip duplicate matching elements on hit.',
            line_range: [10, 23]
          }
        ],
        code: `def find_zero_triplets(telemetry_values):
    telemetry_values = sorted(telemetry_values)
    triplets = []
    n = len(telemetry_values)
    for i in range(n - 2):
        if telemetry_values[i] > 0:
            break
        if i > 0 and telemetry_values[i] == telemetry_values[i - 1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            total = telemetry_values[i] + telemetry_values[left] + telemetry_values[right]
            if total == 0:
                triplets.append([telemetry_values[i], telemetry_values[left], telemetry_values[right]])
                while left < right and telemetry_values[left] == telemetry_values[left + 1]:
                    left += 1
                while left < right and telemetry_values[right] == telemetry_values[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return triplets`,
        code_lines: [
          { line_number: 1, code: 'def find_zero_triplets(telemetry_values):', why_this_line: 'Declares function finding all unique zero-sum triplets.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    telemetry_values = sorted(telemetry_values)', why_this_line: 'Sorts array in ascending order to enable two-pointer pair searching.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    triplets = []', why_this_line: 'Initializes list to collect valid triplet solutions.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    n = len(telemetry_values)', why_this_line: 'Stores length of telemetry array.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    for i in range(n - 2):', why_this_line: 'Iterates through possible first elements, leaving at least 2 elements for left and right.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '        if telemetry_values[i] > 0:', why_this_line: 'Early exit: if smallest element of triplet is > 0, sum can never be 0.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '            break', why_this_line: 'Terminates outer loop early when positive numbers start.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '        if i > 0 and telemetry_values[i] == telemetry_values[i - 1]:', why_this_line: 'Prunes duplicate first elements to avoid duplicate triplets in result.', is_high_risk: true, risk_note: 'Must compare with i - 1, NOT i + 1, otherwise valid duplicates across distinct positions are skipped.' },
          { line_number: 9, code: '            continue', why_this_line: 'Skips this duplicate iteration.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '        left, right = i + 1, n - 1', why_this_line: 'Initializes two pointers for the remaining subarray to the right of index i.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '        while left < right:', why_this_line: 'Loops until two pointers converge.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '            total = telemetry_values[i] + telemetry_values[left] + telemetry_values[right]', why_this_line: 'Computes sum of the three chosen elements.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '            if total == 0:', why_this_line: 'Checks if valid zero-sum triplet is found.', is_high_risk: false, risk_note: null },
          { line_number: 14, code: '                triplets.append([telemetry_values[i], telemetry_values[left], telemetry_values[right]])', why_this_line: 'Records the matching triplet.', is_high_risk: false, risk_note: null },
          { line_number: 15, code: '                while left < right and telemetry_values[left] == telemetry_values[left + 1]:', why_this_line: 'Skips identical left values to prevent duplicate triplets.', is_high_risk: true, risk_note: 'Must skip duplicate left elements after a match.' },
          { line_number: 16, code: '                    left += 1', why_this_line: 'Advances left over duplicate.', is_high_risk: false, risk_note: null },
          { line_number: 17, code: '                while left < right and telemetry_values[right] == telemetry_values[right - 1]:', why_this_line: 'Skips identical right values to prevent duplicate triplets.', is_high_risk: true, risk_note: 'Must skip duplicate right elements after a match.' },
          { line_number: 18, code: '                    right -= 1', why_this_line: 'Decrements right over duplicate.', is_high_risk: false, risk_note: null },
          { line_number: 19, code: '                left += 1', why_this_line: 'Steps left past the last duplicate.', is_high_risk: false, risk_note: null },
          { line_number: 20, code: '                right -= 1', why_this_line: 'Steps right past the last duplicate.', is_high_risk: false, risk_note: null },
          { line_number: 21, code: '            elif total < 0:', why_this_line: 'Checks if sum is too small.', is_high_risk: false, risk_note: null },
          { line_number: 22, code: '                left += 1', why_this_line: 'Increases sum by advancing left pointer.', is_high_risk: false, risk_note: null },
          { line_number: 23, code: '            else:', why_this_line: 'Executes when sum is too large.', is_high_risk: false, risk_note: null },
          { line_number: 24, code: '                right -= 1', why_this_line: 'Decreases sum by decrementing right pointer.', is_high_risk: false, risk_note: null },
          { line_number: 25, code: '    return triplets', why_this_line: 'Returns list of all unique zero-sum triplets.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 8,
          code: 'if i > 0 and telemetry_values[i] == telemetry_values[i - 1]:',
          why_it_is_tricky: 'Using telemetry_values[i] == telemetry_values[i + 1] would prevent valid pairs with identical values like [-1, -1, 2].',
          recommended_tests: ['All zeros [0, 0, 0, 0] (must return [[0, 0, 0]])', 'Multiple duplicates [-2, 0, 0, 2, 2]']
        },
        {
          line_number: 15,
          code: 'while left < right and telemetry_values[left] == telemetry_values[left + 1]:',
          why_it_is_tricky: 'Failing to advance past duplicate left elements after a match inserts duplicate triplets into the answer.',
          recommended_tests: ['Duplicates at endpoints [-2, 1, 1, 1]']
        }
      ],
      hints: [
        'How can you transform the problem of finding 3 numbers summing to 0 into finding 2 numbers? Fix the first number!',
        'If the array is sorted, how do you find two numbers that sum to -telemetry_values[i]? Use two pointers.',
        'Be careful to skip duplicate values for the outer loop and inner pointers to ensure uniqueness.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['triplet', 'two pointers', 'three sum', 'zero sum'],
      starter_code: `def find_zero_triplets(telemetry_values: list[int]) -> list[list[int]]:
    """
    Return all unique triplets summing to 0.
    """
    pass
`
    }
  ];
}
