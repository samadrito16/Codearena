/**
 * Sliding Window Pattern Mastery Blueprints (5 Curated Production Blueprints)
 * Zero placeholder content. Full executable brute force & optimal solutions.
 */

export function getCuratedSlidingWindow() {
  return [
    {
      id: 'sw-001',
      slug: 'fixed-telemetry-window-peak-average',
      title: 'Fixed Telemetry Window Peak Average',
      pattern: 'sliding_window',
      difficulty: 'Easy',
      estimated_minutes: 15,
      statement: {
        description: 'You are given an integer array data_stream consisting of n elements, and an integer window_size.\\n\\nFind a contiguous subarray whose length is equal to window_size that has the maximum average value and return this value. Any answer with a calculation error less than 10^-5 will be accepted.',
        input_format: 'data_stream: list[int], window_size: int',
        output_format: 'float representing maximum average value',
        examples: [
          {
            input: 'data_stream = [1, 12, -5, -6, 50, 3], window_size = 4',
            output: '12.75',
            explanation: 'Subarray [12, -5, -6, 50] has sum 51, and average 51 / 4 = 12.75.'
          },
          {
            input: 'data_stream = [5], window_size = 1',
            output: '5.0',
            explanation: 'Single element subarray has average 5 / 1 = 5.0.'
          }
        ],
        constraints: [
          '1 <= window_size <= data_stream.length <= 100,000',
          '-10^4 <= data_stream[i] <= 10^4'
        ]
      },
      pattern_clues: [
        'Problem specifies a contiguous subarray of fixed length window_size',
        'Adjacent windows of length k share k - 1 elements in common',
        'Maintaining rolling sum avoids re-summing k elements for each position'
      ],
      trigger_words: ['fixed window size', 'contiguous subarray', 'maximum average', 'rolling sum', 'slide window'],
      brute_force: {
        approach: 'Iterate through all possible starting indices i from 0 to n - window_size, and sum window_size elements data_stream[i:i + window_size] from scratch using a loop.',
        why_it_is_too_slow: 'Recomputing the sum of window_size elements for each of the (N - K + 1) windows takes O(N * K) time, which takes up to 10 billion operations for N = 100,000 and K = 50,000.',
        time_complexity: 'O(N * K)',
        space_complexity: 'O(1)',
        language: 'python',
        code: `def find_max_average_window(data_stream, window_size):
    n = len(data_stream)
    max_sum = float('-inf')
    for i in range(n - window_size + 1):
        curr_sum = 0
        for j in range(i, i + window_size):
            curr_sum += data_stream[j]
        if curr_sum > max_sum:
            max_sum = curr_sum
    return max_sum / window_size`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Compute the sum of the first window_size elements. Then slide the window from index window_size to the end of the array, adding the incoming element data_stream[i] and subtracting the outgoing element data_stream[i - window_size] in O(1) time.',
        time_complexity: 'O(N)',
        space_complexity: 'O(1)',
        why_this_works: 'When a window moves right by 1 index, only two elements change: the leftmost element leaves the window and a new rightmost element enters. Maintaining the running sum in O(1) per step achieves strict O(N) total runtime.',
        subgoals: [
          {
            title: 'Compute initial window sum',
            explanation: 'Sum first window_size elements to bootstrap rolling window state.',
            line_range: [2, 3]
          },
          {
            title: 'Slide window across remaining stream',
            explanation: 'Update sum in O(1) by adding incoming and subtracting outgoing element; track maximum sum.',
            line_range: [4, 7]
          },
          {
            title: 'Compute and return maximum average',
            explanation: 'Divide maximum accumulated sum by window_size.',
            line_range: [8, 8]
          }
        ],
        code: `def find_max_average_window(data_stream, window_size):
    window_sum = sum(data_stream[:window_size])
    max_sum = window_sum
    for i in range(window_size, len(data_stream)):
        window_sum += data_stream[i] - data_stream[i - window_size]
        if window_sum > max_sum:
            max_sum = window_sum
    return max_sum / window_size`,
        code_lines: [
          { line_number: 1, code: 'def find_max_average_window(data_stream, window_size):', why_this_line: 'Declares function to find maximum contiguous subarray average of fixed length.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    window_sum = sum(data_stream[:window_size])', why_this_line: 'Calculates the sum of the initial window of length window_size in O(K) time.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    max_sum = window_sum', why_this_line: 'Initializes maximum sum tracker with the first window sum.', is_high_risk: true, risk_note: 'Must initialize with first window sum, NOT 0, to handle all-negative arrays correctly.' },
          { line_number: 4, code: '    for i in range(window_size, len(data_stream)):', why_this_line: 'Slides the window across the remaining elements from index window_size to n - 1.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '        window_sum += data_stream[i] - data_stream[i - window_size]', why_this_line: 'Adds new incoming element data_stream[i] and subtracts exiting element data_stream[i - window_size] in O(1).', is_high_risk: true, risk_note: 'Off-by-one trap: outgoing element index is i - window_size.' },
          { line_number: 6, code: '        if window_sum > max_sum:', why_this_line: 'Checks if current sliding window sum exceeds historical maximum sum.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '            max_sum = window_sum', why_this_line: 'Updates maximum sum with new peak window sum.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '    return max_sum / window_size', why_this_line: 'Divides optimal sum by window_size once at the end to minimize floating point operations.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 3,
          code: 'max_sum = window_sum',
          why_it_is_tricky: 'Initializing max_sum to 0 fails when all numbers in the array are negative (e.g. [-1], k=1 returns 0 instead of -1.0).',
          recommended_tests: ['All negative numbers [-5, -3, -8] with k=2', 'Single negative element [-10] with k=1']
        },
        {
          line_number: 5,
          code: 'window_sum += data_stream[i] - data_stream[i - window_size]',
          why_it_is_tricky: 'Subtracting i - window_size - 1 or i + window_size causes IndexErrors or corrupted sums.',
          recommended_tests: ['window_size == len(data_stream) (loop should not execute)']
        }
      ],
      hints: [
        'Notice that two adjacent windows of size k share k - 1 elements in common.',
        'Instead of recalculating the sum from scratch each time, add the element that just entered the window and subtract the element that just left.',
        'Be careful with negative numbers: do not initialize max_sum to 0.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['sliding window', 'rolling sum', 'average', 'window_size'],
      starter_code: `def find_max_average_window(data_stream: list[int], window_size: int) -> float:
    """
    Find maximum average of any contiguous subarray of length window_size.
    """
    pass
`
    },
    {
      id: 'sw-002',
      slug: 'longest-continuous-unique-substream',
      title: 'Longest Continuous Unique Substream',
      pattern: 'sliding_window',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'Given a string data_packets, find the length of the longest substring without repeating characters.\\n\\nA substring is a contiguous non-empty sequence of characters within a string.',
        input_format: 'data_packets: str',
        output_format: 'int representing length of longest unique substring',
        examples: [
          {
            input: 'data_packets = "pwwkew"',
            output: '3',
            explanation: 'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence and not a substring.'
          },
          {
            input: 'data_packets = "bbbbb"',
            output: '1',
            explanation: 'The answer is "b", with the length of 1.'
          }
        ],
        constraints: [
          '0 <= data_packets.length <= 100,000',
          'data_packets consists of English letters, digits, symbols and spaces'
        ]
      },
      pattern_clues: [
        'Looking for the longest contiguous substring meeting a condition (uniqueness)',
        'When a duplicate character appears at the right boundary, the window becomes invalid',
        'Advancing the left boundary directly past the duplicate restores validity in O(1)'
      ],
      trigger_words: ['longest substring', 'without repeating characters', 'unique characters', 'sliding window', 'last seen map'],
      brute_force: {
        approach: 'Check all possible substrings data_packets[i:j + 1]. For each substring, insert characters into a set; if the set size equals substring length, all characters are unique, so update max length.',
        why_it_is_too_slow: 'Generating and checking all O(N^2) substrings takes O(N^3) time, taking trillions of operations for N = 100,000.',
        time_complexity: 'O(N^3)',
        space_complexity: 'O(min(N, M))',
        language: 'python',
        code: `def longest_unique_substream_len(data_packets):
    n = len(data_packets)
    max_len = 0
    for i in range(n):
        seen = set()
        for j in range(i, n):
            if data_packets[j] in seen:
                break
            seen.add(data_packets[j])
            max_len = max(max_len, j - i + 1)
    return max_len`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Use a sliding window [left, right] and a hash map last_seen mapping each character to its most recent index. As right advances, if character was seen at index >= left, jump left to last_seen[char] + 1. Update last_seen[char] = right and max_len = max(max_len, right - left + 1).',
        time_complexity: 'O(N)',
        space_complexity: 'O(min(N, Sigma))',
        why_this_works: 'Jumping left directly past the previous occurrence skips all intermediate invalid windows in a single step, ensuring right moves forward exactly N times without backtracking.',
        subgoals: [
          {
            title: 'Initialize window state and index map',
            explanation: 'Create last_seen dictionary and initialize left pointer and max_len to 0.',
            line_range: [2, 4]
          },
          {
            title: 'Expand right boundary and resolve duplicates',
            explanation: 'Advance right pointer; if char was seen inside current window, jump left pointer past it.',
            line_range: [5, 9]
          },
          {
            title: 'Update tracking map and record maximum span',
            explanation: 'Update latest character index and track maximum window span right - left + 1.',
            line_range: [10, 13]
          }
        ],
        code: `def longest_unique_substream_len(data_packets):
    last_seen = {}
    left = 0
    max_len = 0
    for right in range(len(data_packets)):
        char = data_packets[right]
        if char in last_seen and last_seen[char] >= left:
            left = last_seen[char] + 1
        last_seen[char] = right
        curr_len = right - left + 1
        if curr_len > max_len:
            max_len = curr_len
    return max_len`,
        code_lines: [
          { line_number: 1, code: 'def longest_unique_substream_len(data_packets):', why_this_line: 'Declares function returning length of longest unique substring.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    last_seen = {}', why_this_line: 'Hash map tracking character -> latest seen 0-based index.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    left = 0', why_this_line: 'Left boundary of the active unique window.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    max_len = 0', why_this_line: 'Accumulator for longest valid window span observed.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    for right in range(len(data_packets)):', why_this_line: 'Advances right boundary one character at a time.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '        char = data_packets[right]', why_this_line: 'Extracts current incoming character at right boundary.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '        if char in last_seen and last_seen[char] >= left:', why_this_line: 'Checks if incoming character appeared previously inside the CURRENT window boundary.', is_high_risk: true, risk_note: 'Crucial: last_seen[char] >= left prevents left pointer from jumping backward to older duplicate occurrences outside the active window.' },
          { line_number: 8, code: '            left = last_seen[char] + 1', why_this_line: 'Jumps left pointer directly past the previous occurrence of this character.', is_high_risk: true, risk_note: 'Direct index jump avoids slow while-loop increments.' },
          { line_number: 9, code: '        last_seen[char] = right', why_this_line: 'Registers current position as the latest occurrence of char.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '        curr_len = right - left + 1', why_this_line: 'Computes current valid window length (inclusive bounds).', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '        if curr_len > max_len:', why_this_line: 'Checks if current window exceeds historical maximum.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '            max_len = curr_len', why_this_line: 'Updates maximum length with new peak window length.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '    return max_len', why_this_line: 'Returns length of longest unique substring found.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 7,
          code: 'if char in last_seen and last_seen[char] >= left:',
          why_it_is_tricky: 'Omitting >= left allows left to move backward when seeing an old duplicate from a previous window (e.g. "abba").',
          recommended_tests: ['Duplicate sandwich "abba" (must return 2, not 3)', 'Empty string "" (must return 0)', 'All identical "aaaa" (must return 1)']
        },
        {
          line_number: 10,
          code: 'curr_len = right - left + 1',
          why_it_is_tricky: 'Using right - left without +1 undercounts length by 1.',
          recommended_tests: ['Single character "z" (must return 1)']
        }
      ],
      hints: [
        'Think of the substring as a window [left, right] that expands to the right.',
        'When you encounter a character already in the window, what must you do with left?',
        'If you store each characters last seen index in a map, can you jump left directly without stepping one by one?'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['sliding window', 'unique', 'substring', 'longest'],
      starter_code: `def longest_unique_substream_len(data_packets: str) -> int:
    """
    Find length of the longest continuous substring without repeating characters.
    """
    pass
`
    },
    {
      id: 'sw-003',
      slug: 'minimum-bounded-sum-sliding-frame',
      title: 'Minimum Bounded Sum Sliding Frame',
      pattern: 'sliding_window',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'Given an array of positive integers energy_readings and a positive integer target_threshold, return the minimal length of a subarray whose sum is greater than or equal to target_threshold. If there is no such subarray, return 0 instead.',
        input_format: 'target_threshold: int, energy_readings: list[int]',
        output_format: 'int representing minimal valid subarray length, or 0',
        examples: [
          {
            input: 'target_threshold = 7, energy_readings = [2, 3, 1, 2, 4, 3]',
            output: '2',
            explanation: 'The subarray [4, 3] has the minimal length 2 with sum 7 >= 7.'
          },
          {
            input: 'target_threshold = 11, energy_readings = [1, 1, 1, 1, 1, 1]',
            output: '0',
            explanation: 'The sum of all elements is 6, which never reaches target_threshold 11.'
          }
        ],
        constraints: [
          '1 <= target_threshold <= 10^9',
          '1 <= energy_readings.length <= 100,000',
          '1 <= energy_readings[i] <= 10^4'
        ]
      },
      pattern_clues: [
        'All elements are positive integers, ensuring monotonicity: expanding right strictly increases sum; shrinking left strictly decreases sum',
        'Asked for minimal length meeting a sum constraint',
        'Dynamic sliding window where we expand right to satisfy the condition, then shrink left to minimize length'
      ],
      trigger_words: ['minimal length', 'sum greater than or equal', 'positive integers', 'shrink left', 'expand right'],
      brute_force: {
        approach: 'For each starting index i, iterate j from i to n - 1, computing running sum. As soon as sum >= target_threshold, record j - i + 1 as candidate minimal length and break inner loop.',
        why_it_is_too_slow: 'Quadratic O(N^2) worst-case time requires up to 10 billion operations when no subarray or only the full array reaches the target.',
        time_complexity: 'O(N^2)',
        space_complexity: 'O(1)',
        language: 'python',
        code: `def min_subarray_len_exceeding_target(target_threshold, energy_readings):
    n = len(energy_readings)
    min_len = float('inf')
    for i in range(n):
        curr_sum = 0
        for j in range(i, n):
            curr_sum += energy_readings[j]
            if curr_sum >= target_threshold:
                min_len = min(min_len, j - i + 1)
                break
    return min_len if min_len != float('inf') else 0`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Maintain a sliding window [left, right] and a running current_sum. Expand right and add energy_readings[right]. Whenever current_sum >= target_threshold, record minimal length right - left + 1, subtract energy_readings[left], and advance left until sum falls below target. Return 0 if min_len was never updated.',
        time_complexity: 'O(N)',
        space_complexity: 'O(1)',
        why_this_works: 'Because all numbers are positive, current_sum is strictly monotonic with respect to window boundaries. Both left and right advance at most N times, leading to 2N total pointer steps and O(N) total runtime.',
        subgoals: [
          {
            title: 'Initialize window bounds and min length tracker',
            explanation: 'Set left = 0, current_sum = 0, and min_len = infinity.',
            line_range: [2, 4]
          },
          {
            title: 'Expand right pointer and accumulate sum',
            explanation: 'Loop right across array, adding incoming element to current_sum.',
            line_range: [5, 6]
          },
          {
            title: 'Shrink left pointer while condition satisfied',
            explanation: 'While current_sum >= target_threshold, record minimal window size and shrink from left.',
            line_range: [7, 12]
          },
          {
            title: 'Return minimal length or zero fallback',
            explanation: 'Return min_len if found, or 0 if entire array sum is below target.',
            line_range: [13, 13]
          }
        ],
        code: `def min_subarray_len_exceeding_target(target_threshold, energy_readings):
    left = 0
    current_sum = 0
    min_len = float("inf")
    for right in range(len(energy_readings)):
        current_sum += energy_readings[right]
        while current_sum >= target_threshold:
            window_len = right - left + 1
            if window_len < min_len:
                min_len = window_len
            current_sum -= energy_readings[left]
            left += 1
    return min_len if min_len != float("inf") else 0`,
        code_lines: [
          { line_number: 1, code: 'def min_subarray_len_exceeding_target(target_threshold, energy_readings):', why_this_line: 'Declares function returning minimal contiguous subarray length reaching target threshold.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    left = 0', why_this_line: 'Initializes left window boundary at start of array.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    current_sum = 0', why_this_line: 'Initializes running window sum accumulator.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    min_len = float("inf")', why_this_line: 'Initializes minimal length with infinity so any valid window will be smaller.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    for right in range(len(energy_readings)):', why_this_line: 'Advances right window boundary from index 0 to len-1.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '        current_sum += energy_readings[right]', why_this_line: 'Adds new incoming element to running window sum.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '        while current_sum >= target_threshold:', why_this_line: 'Shrinks window from the left as long as the sum remains >= target.', is_high_risk: true, risk_note: 'Must be a while loop, not an if statement, to shrink as many elements as possible.' },
          { line_number: 8, code: '            window_len = right - left + 1', why_this_line: 'Calculates length of the current valid window.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '            if window_len < min_len:', why_this_line: 'Checks if current window length improves historical minimum.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '                min_len = window_len', why_this_line: 'Updates minimal valid length found so far.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '            current_sum -= energy_readings[left]', why_this_line: 'Subtracts outgoing element before advancing left pointer.', is_high_risk: true, risk_note: 'Must subtract energy_readings[left] BEFORE incrementing left.' },
          { line_number: 12, code: '            left += 1', why_this_line: 'Advances left boundary to shrink window.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '    return min_len if min_len != float("inf") else 0', why_this_line: 'Returns 0 if no valid subarray reached target_threshold, otherwise returns min_len.', is_high_risk: true, risk_note: 'Must return 0 if no valid window exists.' }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 7,
          code: 'while current_sum >= target_threshold:',
          why_it_is_tricky: 'Using if instead of while will only shrink one element per step, missing the true minimum subarray length.',
          recommended_tests: ['Large single element [1, 1, 1, 100] with target 10 (must return 1, not 4)']
        },
        {
          line_number: 13,
          code: 'return min_len if min_len != float("inf") else 0',
          why_it_is_tricky: 'Returning min_len directly when no valid subarray exists returns infinity instead of 0.',
          recommended_tests: ['Array sum strictly less than target [1, 2, 3] with target 100 (must return 0)']
        }
      ],
      hints: [
        'Because all numbers are positive, expanding the window always increases the sum, and shrinking always decreases it.',
        'When the window sum reaches or exceeds target, can you shrink from the left to see if a shorter window also qualifies?',
        'Remember to return 0 if no contiguous subarray reaches target.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['minimal subarray', 'sliding window', 'threshold', 'current_sum'],
      starter_code: `def min_subarray_len_exceeding_target(target_threshold: int, energy_readings: list[int]) -> int:
    """
    Return minimal length of subarray with sum >= target_threshold, or 0.
    """
    pass
`
    },
    {
      id: 'sw-004',
      slug: 'continuous-substream-binary-flip-span',
      title: 'Continuous Substream Binary Flip Span',
      pattern: 'sliding_window',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'Given a binary array binary_signals and an integer max_flips, return the maximum number of consecutive 1s in the array if you can flip at most max_flips 0s to 1s.',
        input_format: 'binary_signals: list[int], max_flips: int',
        output_format: 'int representing maximum consecutive 1s achievable',
        examples: [
          {
            input: 'binary_signals = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], max_flips = 2',
            output: '6',
            explanation: 'Flip the two 0s at indices 4 and 5 to produce [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0] with 6 consecutive 1s from index 5 to 10.'
          },
          {
            input: 'binary_signals = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], max_flips = 3',
            output: '10',
            explanation: 'Flipping 3 zeros from index 5 to index 11 creates a contiguous run of 10 ones.'
          }
        ],
        constraints: [
          '1 <= binary_signals.length <= 100,000',
          'binary_signals[i] is either 0 or 1',
          '0 <= max_flips <= binary_signals.length'
        ]
      },
      pattern_clues: [
        'Equivalent to finding the longest contiguous subarray containing at most max_flips zeros',
        'Contiguous subarray constraint on a sequence points directly to sliding window',
        'Expand right and count zeros; when zeros exceed max_flips, shrink left until zero count is valid'
      ],
      trigger_words: ['flip at most k', 'binary array', 'longest consecutive ones', 'at most k zeros', 'sliding window'],
      brute_force: {
        approach: 'Check all subarrays [i..j]. For each subarray, count how many 0s it contains; if zero_count <= max_flips, update the maximum length with j - i + 1.',
        why_it_is_too_slow: 'Quadratic O(N^2) time requires up to 10 billion operations for N = 100,000, causing a timeout.',
        time_complexity: 'O(N^2)',
        space_complexity: 'O(1)',
        language: 'python',
        code: `def longest_ones_after_k_flips(binary_signals, max_flips):
    n = len(binary_signals)
    max_ones = 0
    for i in range(n):
        zeros = 0
        for j in range(i, n):
            if binary_signals[j] == 0:
                zeros += 1
            if zeros <= max_flips:
                max_ones = max(max_ones, j - i + 1)
            else:
                break
    return max_ones`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Maintain a window [left, right] and count zero_count of zeros in the window. Advance right: if binary_signals[right] == 0, increment zero_count. While zero_count > max_flips, if binary_signals[left] == 0, decrement zero_count, and increment left. At each step, update max_consecutive = max(max_consecutive, right - left + 1).',
        time_complexity: 'O(N)',
        space_complexity: 'O(1)',
        why_this_works: 'Each element enters the window via right and leaves at most once via left. Both pointers move monotonically forward, guaranteeing O(N) total operations.',
        subgoals: [
          {
            title: 'Initialize window pointers and zero counter',
            explanation: 'Set left = 0, zero_count = 0, and max_consecutive = 0.',
            line_range: [2, 4]
          },
          {
            title: 'Expand right pointer and count zeros',
            explanation: 'Loop right across array and increment zero_count when encountering 0.',
            line_range: [5, 7]
          },
          {
            title: 'Shrink left pointer to restore flip budget',
            explanation: 'While zero_count exceeds max_flips, decrement zero_count if left was 0, and advance left.',
            line_range: [8, 11]
          },
          {
            title: 'Update and return maximum window span',
            explanation: 'Record maximum window span right - left + 1 and return result.',
            line_range: [12, 14]
          }
        ],
        code: `def longest_ones_after_k_flips(binary_signals, max_flips):
    left = 0
    zero_count = 0
    max_consecutive = 0
    for right in range(len(binary_signals)):
        if binary_signals[right] == 0:
            zero_count += 1
        while zero_count > max_flips:
            if binary_signals[left] == 0:
                zero_count -= 1
            left += 1
        curr_len = right - left + 1
        if curr_len > max_consecutive:
            max_consecutive = curr_len
    return max_consecutive`,
        code_lines: [
          { line_number: 1, code: 'def longest_ones_after_k_flips(binary_signals, max_flips):', why_this_line: 'Declares function computing longest consecutive ones possible with at most max_flips.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    left = 0', why_this_line: 'Initializes left window boundary.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    zero_count = 0', why_this_line: 'Tracks total number of zeros currently enclosed in the window.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    max_consecutive = 0', why_this_line: 'Accumulator for maximum valid window length seen.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    for right in range(len(binary_signals)):', why_this_line: 'Expands right window boundary across the array.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '        if binary_signals[right] == 0:', why_this_line: 'Checks if incoming element is a zero requiring a flip.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '            zero_count += 1', why_this_line: 'Increments count of zeros in window.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '        while zero_count > max_flips:', why_this_line: 'Shrinks window until the number of zeros does not exceed allowed flips.', is_high_risk: true, risk_note: 'While loop restores window validity by evicting zeros from the left.' },
          { line_number: 9, code: '            if binary_signals[left] == 0:', why_this_line: 'Checks if the evicted left element was a zero.', is_high_risk: true, risk_note: 'Only decrement zero_count if the evicted element was actually zero.' },
          { line_number: 10, code: '                zero_count -= 1', why_this_line: 'Decrements count of zeros as it leaves the window.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '            left += 1', why_this_line: 'Advances left boundary inward.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '        curr_len = right - left + 1', why_this_line: 'Calculates length of current valid window containing <= max_flips zeros.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '        if curr_len > max_consecutive:', why_this_line: 'Checks if current valid span exceeds historical maximum.', is_high_risk: false, risk_note: null },
          { line_number: 14, code: '            max_consecutive = curr_len', why_this_line: 'Updates peak consecutive span.', is_high_risk: false, risk_note: null },
          { line_number: 15, code: '    return max_consecutive', why_this_line: 'Returns maximum consecutive ones achievable.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 8,
          code: 'while zero_count > max_flips:',
          why_it_is_tricky: 'Using >= instead of > shrinks the window prematurely when zero_count is exactly equal to max_flips (which is completely legal).',
          recommended_tests: ['max_flips = 0 on [1, 0, 1, 1, 0, 1]', 'max_flips >= len(binary_signals) on [0, 0, 0] (must return 3)']
        },
        {
          line_number: 9,
          code: 'if binary_signals[left] == 0:',
          why_it_is_tricky: 'Decrementing zero_count unconditionally when evicting a 1 causes zero_count to become negative.',
          recommended_tests: ['Consecutive 1s before zeros [1, 1, 1, 0, 0] with max_flips 1']
        }
      ],
      hints: [
        'Reframe the question: What is the longest subarray that contains at most max_flips zeros?',
        'As you expand right, keep track of how many zeros are inside the window.',
        'When the number of zeros exceeds max_flips, advance left until the zero count drops back to max_flips.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['flip', 'binary', 'consecutive', 'zeros'],
      starter_code: `def longest_ones_after_k_flips(binary_signals: list[int], max_flips: int) -> int:
    """
    Return maximum number of consecutive 1s achievable with at most max_flips.
    """
    pass
`
    },
    {
      id: 'sw-005',
      slug: 'sliding-window-exact-monotonic-quota',
      title: 'Sliding Window Exact Monotonic Quota',
      pattern: 'sliding_window',
      difficulty: 'Medium',
      estimated_minutes: 30,
      statement: {
        description: 'Given a string packet_stream and an integer max_distinct, return the length of the longest substring of packet_stream that contains at most max_distinct distinct characters.\\n\\nIf max_distinct is 0 or packet_stream is empty, return 0.',
        input_format: 'packet_stream: str, max_distinct: int',
        output_format: 'int representing length of longest valid substring',
        examples: [
          {
            input: 'packet_stream = "eceba", max_distinct = 2',
            output: '3',
            explanation: 'The substring is "ece" with length 3 containing 2 distinct characters (e and c).'
          },
          {
            input: 'packet_stream = "aa", max_distinct = 1',
            output: '2',
            explanation: 'The substring is "aa" with length 2 containing 1 distinct character (a).'
          }
        ],
        constraints: [
          '0 <= packet_stream.length <= 100,000',
          '0 <= max_distinct <= 50',
          'packet_stream consists of lowercase English letters'
        ]
      },
      pattern_clues: [
        'Contiguous substring with a constraint on number of unique characters',
        'Expanding right adds distinct characters; when unique count > max_distinct, window is invalid',
        'Shrinking left reduces frequencies; deleting characters reaching 0 count restores validity'
      ],
      trigger_words: ['at most k distinct', 'longest substring', 'distinct characters', 'frequency map', 'sliding window'],
      brute_force: {
        approach: 'Check all substrings packet_stream[i:j + 1]. For each substring, count distinct characters using set(packet_stream[i:j + 1]); if len(set) <= max_distinct, update max_len.',
        why_it_is_too_slow: 'Checking O(N^2) substrings each taking up to O(N) time requires O(N^3) time, timing out completely for N = 100,000.',
        time_complexity: 'O(N^3)',
        space_complexity: 'O(K)',
        language: 'python',
        code: `def longest_substring_k_distinct(packet_stream, max_distinct):
    if max_distinct == 0 or not packet_stream:
        return 0
    n = len(packet_stream)
    max_len = 0
    for i in range(n):
        char_set = set()
        for j in range(i, n):
            char_set.add(packet_stream[j])
            if len(char_set) <= max_distinct:
                max_len = max(max_len, j - i + 1)
            else:
                break
    return max_len`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Use a sliding window [left, right] with a frequency hash map counts. As right advances, add packet_stream[right] to counts. If len(counts) > max_distinct, decrement counts[packet_stream[left]], delete it if 0, and advance left. Update max_len = max(max_len, right - left + 1).',
        time_complexity: 'O(N)',
        space_complexity: 'O(K)',
        why_this_works: 'The frequency map tracks distinct characters in the current window in O(1). Both left and right advance at most N times, keeping time strictly O(N) while space is bounded by O(K) where K <= 26.',
        subgoals: [
          {
            title: 'Base case and state initialization',
            explanation: 'Return 0 if max_distinct == 0 or stream empty; initialize counts map and left pointer.',
            line_range: [2, 6]
          },
          {
            title: 'Expand right pointer and update character frequency',
            explanation: 'Loop right across string and increment character frequency in hash map.',
            line_range: [7, 9]
          },
          {
            title: 'Shrink left pointer to satisfy distinct quota',
            explanation: 'While unique character count > max_distinct, decrement left frequency, delete if zero, and advance left.',
            line_range: [10, 14]
          },
          {
            title: 'Update and return maximum valid window length',
            explanation: 'Record maximum window span right - left + 1 and return result.',
            line_range: [15, 17]
          }
        ],
        code: `def longest_substring_k_distinct(packet_stream, max_distinct):
    if max_distinct == 0 or not packet_stream:
        return 0
    counts = {}
    left = 0
    max_len = 0
    for right in range(len(packet_stream)):
        char = packet_stream[right]
        counts[char] = counts.get(char, 0) + 1
        while len(counts) > max_distinct:
            left_char = packet_stream[left]
            counts[left_char] -= 1
            if counts[left_char] == 0:
                del counts[left_char]
            left += 1
        curr_len = right - left + 1
        if curr_len > max_len:
            max_len = curr_len
    return max_len`,
        code_lines: [
          { line_number: 1, code: 'def longest_substring_k_distinct(packet_stream, max_distinct):', why_this_line: 'Declares function to find longest substring containing at most max_distinct distinct characters.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    if max_distinct == 0 or not packet_stream:', why_this_line: 'Edge case guard: if budget is 0 or stream is empty, no valid non-empty substring exists.', is_high_risk: true, risk_note: 'Must return 0 immediately if max_distinct == 0.' },
          { line_number: 3, code: '        return 0', why_this_line: 'Returns 0 for empty or 0-budget input.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    counts = {}', why_this_line: 'Hash map tracking character frequencies in active window.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    left = 0', why_this_line: 'Initializes left window boundary.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '    max_len = 0', why_this_line: 'Tracks maximum valid window span observed.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '    for right in range(len(packet_stream)):', why_this_line: 'Iterates right window boundary across string.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '        char = packet_stream[right]', why_this_line: 'Extracts incoming character at right boundary.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '        counts[char] = counts.get(char, 0) + 1', why_this_line: 'Increments frequency count for incoming character.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '        while len(counts) > max_distinct:', why_this_line: 'Shrinks window as long as number of unique keys in counts exceeds allowed quota.', is_high_risk: true, risk_note: 'Window is invalid when len(counts) > max_distinct.' },
          { line_number: 11, code: '            left_char = packet_stream[left]', why_this_line: 'Identifies exiting character at left boundary.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '            counts[left_char] -= 1', why_this_line: 'Decrements frequency of exiting character.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '            if counts[left_char] == 0:', why_this_line: 'Checks if character frequency has reached zero.', is_high_risk: true, risk_note: 'Must del key from dictionary when count hits 0 so len(counts) reflects true distinct count.' },
          { line_number: 14, code: '                del counts[left_char]', why_this_line: 'Deletes key from dictionary to decrease distinct character count.', is_high_risk: false, risk_note: null },
          { line_number: 15, code: '            left += 1', why_this_line: 'Advances left window boundary.', is_high_risk: false, risk_note: null },
          { line_number: 16, code: '        curr_len = right - left + 1', why_this_line: 'Calculates length of current valid window.', is_high_risk: false, risk_note: null },
          { line_number: 17, code: '        if curr_len > max_len:', why_this_line: 'Checks if current window improves historical maximum.', is_high_risk: false, risk_note: null },
          { line_number: 18, code: '            max_len = curr_len', why_this_line: 'Updates maximum length with new peak window size.', is_high_risk: false, risk_note: null },
          { line_number: 19, code: '    return max_len', why_this_line: 'Returns length of longest substring satisfying quota.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 13,
          code: 'if counts[left_char] == 0: del counts[left_char]',
          why_it_is_tricky: 'Leaving key with value 0 in the dictionary means len(counts) still counts that character, causing infinite loop in shrinking.',
          recommended_tests: ['All distinct characters "abcdef" with max_distinct 2', 'Single character repeated "aaaa" with max_distinct 2']
        },
        {
          line_number: 2,
          code: 'if max_distinct == 0 or not packet_stream: return 0',
          why_it_is_tricky: 'Failing to guard max_distinct == 0 causes the while loop to shrink until left exceeds right or crash on empty string.',
          recommended_tests: ['max_distinct = 0 with string "abc" (must return 0)', 'Empty string "" with max_distinct 5 (must return 0)']
        }
      ],
      hints: [
        'How can you track the number of distinct characters in the current window? Use a frequency dictionary where len(dict) is the distinct count.',
        'When len(counts) exceeds max_distinct, what must you do to reduce the distinct count? Evict characters from the left until one character frequency reaches 0, then delete it.',
        'Remember that deleting the key from the dictionary is required for len(counts) to decrease.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['distinct', 'sliding window', 'quota', 'substring'],
      starter_code: `def longest_substring_k_distinct(packet_stream: str, max_distinct: int) -> int:
    """
    Return length of longest substring with at most max_distinct distinct characters.
    """
    pass
`
    }
  ];
}
