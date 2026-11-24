/**
 * Hash Maps & Sets Pattern Mastery Blueprints (5 Curated Production Blueprints)
 * Zero placeholder content. Full executable brute force & optimal solutions.
 */

export function getCuratedHashMaps() {
  return [
    {
      id: 'hm-001',
      slug: 'complement-value-index-lookup-table',
      title: 'Complement Value Index Lookup Table',
      pattern: 'hash_maps',
      difficulty: 'Easy',
      estimated_minutes: 15,
      statement: {
        description: 'Given an array of integers sensor_metrics and an integer target_balance, return indices of the two numbers such that they add up to target_balance.\\n\\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\\n\\nYou can return the answer in any order.',
        input_format: 'sensor_metrics: list[int], target_balance: int',
        output_format: 'list[int] of length 2 containing 0-based indices [i, j]',
        examples: [
          {
            input: 'sensor_metrics = [14, 7, 22, 11, 3], target_balance = 18',
            output: '[1, 3]',
            explanation: 'sensor_metrics[1] + sensor_metrics[3] = 7 + 11 = 18, so return [1, 3].'
          },
          {
            input: 'sensor_metrics = [3, 3], target_balance = 6',
            output: '[0, 1]',
            explanation: 'sensor_metrics[0] + sensor_metrics[1] = 3 + 3 = 6, so return [0, 1].'
          }
        ],
        constraints: [
          '2 <= sensor_metrics.length <= 100,000',
          '-10^9 <= sensor_metrics[i] <= 10^9',
          '-10^9 <= target_balance <= 10^9',
          'Exactly one valid answer exists'
        ]
      },
      pattern_clues: [
        'Input array is unsorted, making two-pointer inward convergence impossible without O(N log N) sorting',
        'Looking for a pair summing to target: value_A + value_B = target => value_B = target - value_A',
        'A hash map can store previously visited elements and their indices for O(1) complement lookup'
      ],
      trigger_words: ['unsorted pair sum', 'complement lookup', 'hash table index cache', 'single pass', 'O(1) search'],
      brute_force: {
        approach: 'Use two nested loops to check all distinct index pairs (i, j) with i < j. If sensor_metrics[i] + sensor_metrics[j] == target_balance, return [i, j].',
        why_it_is_too_slow: 'Quadratic O(N^2) time evaluates up to 5 billion pairs for N = 100,000, timing out.',
        time_complexity: 'O(N^2)',
        space_complexity: 'O(1)',
        language: 'python',
        code: `def find_complement_index_pair(sensor_metrics, target_balance):
    n = len(sensor_metrics)
    for i in range(n):
        for j in range(i + 1, n):
            if sensor_metrics[i] + sensor_metrics[j] == target_balance:
                return [i, j]
    return []`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Iterate through sensor_metrics once while maintaining a hash map seen_indices mapping value -> index. For each value, compute complement = target_balance - value. If complement is in seen_indices, return [seen_indices[complement], index]. Otherwise, store seen_indices[value] = index.',
        time_complexity: 'O(N)',
        space_complexity: 'O(N)',
        why_this_works: 'Checking whether a complement exists in a hash table takes O(1) average time. Inserting each element after checking prevents an element from pairing with itself and guarantees a single pass.',
        subgoals: [
          {
            title: 'Initialize lookup dictionary',
            explanation: 'Create empty hash map seen_indices to record visited values and their indices.',
            line_range: [2, 2]
          },
          {
            title: 'Iterate with complement existence check',
            explanation: 'For each index and value, calculate complement; query hash map in O(1) for previous occurrence.',
            line_range: [3, 6]
          },
          {
            title: 'Register current value or return match',
            explanation: 'Return matched index pair upon hit; otherwise register current value into map.',
            line_range: [5, 7]
          }
        ],
        code: `def find_complement_index_pair(sensor_metrics, target_balance):
    seen_indices = {}
    for index, value in enumerate(sensor_metrics):
        complement = target_balance - value
        if complement in seen_indices:
            return [seen_indices[complement], index]
        seen_indices[value] = index
    return []`,
        code_lines: [
          { line_number: 1, code: 'def find_complement_index_pair(sensor_metrics, target_balance):', why_this_line: 'Declares function finding 0-based indices of two values summing to target balance.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    seen_indices = {}', why_this_line: 'Hash map storing previously seen values mapped to their 0-based array index.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    for index, value in enumerate(sensor_metrics):', why_this_line: 'Iterates through array once while providing both index and value.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '        complement = target_balance - value', why_this_line: 'Calculates the exact value required to reach target balance.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '        if complement in seen_indices:', why_this_line: 'Checks if required complement was previously registered in O(1) average time.', is_high_risk: true, risk_note: 'Must check membership before registering current value to avoid pairing an element with itself.' },
          { line_number: 6, code: '            return [seen_indices[complement], index]', why_this_line: 'Returns the index of the previously seen complement and the current index.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '        seen_indices[value] = index', why_this_line: 'Registers current value and index into hash map for future elements to query.', is_high_risk: true, risk_note: 'Inserting after the check correctly handles duplicate numbers like [3, 3] with target 6.' },
          { line_number: 8, code: '    return []', why_this_line: 'Fallback returning empty list if no pair exists.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 5,
          code: 'if complement in seen_indices:',
          why_it_is_tricky: 'If seen_indices is pre-populated before iterating, target = 6 with [3, 2, 4] will match index 0 with itself.',
          recommended_tests: ['Identical numbers summing to target [3, 3] with target 6', 'Target is double first element but pair is elsewhere [3, 2, 4] with target 6 (must return [1, 2])']
        },
        {
          line_number: 7,
          code: 'seen_indices[value] = index',
          why_it_is_tricky: 'Storing index as key and value as value inverts lookup, causing KeyError or wrong returns.',
          recommended_tests: ['Negative numbers [-10, 7, 12, -3] with target -13 (must return [0, 3])']
        }
      ],
      hints: [
        'Can you determine what partner number is needed for each element? That is target_balance - value.',
        'If you check whether that partner has already been seen as you iterate through the list, what data structure gives you O(1) lookup?',
        'Make sure you insert the current element into your map AFTER checking for its complement so it cannot pair with itself.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['complement', 'hash map', 'two sum', 'seen_indices'],
      starter_code: `def find_complement_index_pair(sensor_metrics: list[int], target_balance: int) -> list[int]:
    """
    Find indices of two readings summing to target_balance in single-pass O(N).
    """
    pass
`
    },
    {
      id: 'hm-002',
      slug: 'canonical-signature-anagram-clustering',
      title: 'Canonical Signature Anagram Clustering',
      pattern: 'hash_maps',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'Given an array of strings telemetry_tokens, group the anagrams together. You can return the answer in any order.\\n\\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
        input_format: 'telemetry_tokens: list[str]',
        output_format: 'list[list[str]] of clustered anagram groups',
        examples: [
          {
            input: 'telemetry_tokens = ["eat", "tea", "tan", "ate", "nat", "bat"]',
            output: '[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]',
            explanation: 'Grouped by common character composition: "aet" -> ["eat", "tea", "ate"], "ant" -> ["tan", "nat"], "abt" -> ["bat"].'
          },
          {
            input: 'telemetry_tokens = ["a"]',
            output: '[["a"]]',
            explanation: 'Single token forms its own solitary cluster.'
          }
        ],
        constraints: [
          '1 <= telemetry_tokens.length <= 10,000',
          '0 <= telemetry_tokens[i].length <= 100',
          'telemetry_tokens[i] consists of lowercase English letters'
        ]
      },
      pattern_clues: [
        'Anagrams share identical character counts and sorted letter signatures',
        'Grouping items by an equivalence relation maps directly to hash map bucketing (key = canonical form, value = list of words)',
        'Sorting each word of length L takes O(L log L) to produce the canonical dictionary key'
      ],
      trigger_words: ['group anagrams', 'canonical signature', 'sorted characters', 'hash map buckets', 'character frequency'],
      brute_force: {
        approach: 'Iterate through tokens. For each token, check if it is an anagram of the first word in any existing group by comparing sorted character lists. If matching group found, append token; otherwise start a new group.',
        why_it_is_too_slow: 'Comparing each word against up to N existing groups takes O(N^2 * L log L) time, taking over 100 million operations for N = 10,000.',
        time_complexity: 'O(N^2 * L log L)',
        space_complexity: 'O(N * L)',
        language: 'python',
        code: `def group_anagram_signatures(telemetry_tokens):
    groups = []
    for token in telemetry_tokens:
        sorted_token = sorted(token)
        found = False
        for g in groups:
            if sorted(g[0]) == sorted_token:
                g.append(token)
                found = True
                break
        if not found:
            groups.append([token])
    # Normalize sorting for comparison
    return sorted([sorted(g) for g in groups], key=lambda x: (len(x), x[0]))`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Use a hash map clusters where the key is the sorted character signature "".join(sorted(token)) and value is a list of matching tokens. Iterate through telemetry_tokens once, appending each token to its signature bucket in O(1) average lookup time.',
        time_complexity: 'O(N * L log L)',
        space_complexity: 'O(N * L)',
        why_this_works: 'All permutations of the same letters sort to the exact same canonical string. A hash map provides O(1) bucket retrieval, grouping all N words in a single linear pass over the token list.',
        subgoals: [
          {
            title: 'Initialize cluster hash map',
            explanation: 'Create empty dictionary clusters mapping canonical string signature -> list of tokens.',
            line_range: [2, 2]
          },
          {
            title: 'Group tokens by sorted canonical signature',
            explanation: 'For each token, compute sorted signature key; append token to corresponding dictionary bucket.',
            line_range: [3, 8]
          },
          {
            title: 'Return clustered groups',
            explanation: 'Extract all bucket lists and return grouped anagram collections.',
            line_range: [9, 9]
          }
        ],
        code: `def group_anagram_signatures(telemetry_tokens):
    clusters = {}
    for token in telemetry_tokens:
        signature = "".join(sorted(token))
        if signature not in clusters:
            clusters[signature] = []
        clusters[signature].append(token)
    return sorted([sorted(g) for g in clusters.values()], key=lambda x: (len(x), x[0]))`,
        code_lines: [
          { line_number: 1, code: 'def group_anagram_signatures(telemetry_tokens):', why_this_line: 'Declares function to cluster anagram strings into groups.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    clusters = {}', why_this_line: 'Hash map storing sorted string signature as key and list of original tokens as value.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    for token in telemetry_tokens:', why_this_line: 'Iterates through each token in the input list.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '        signature = "".join(sorted(token))', why_this_line: 'Sorts characters of token and joins into a string to produce canonical hashable key.', is_high_risk: true, risk_note: 'Sorted string signature is canonical: all anagrams produce the exact same key.' },
          { line_number: 5, code: '        if signature not in clusters:', why_this_line: 'Checks if this canonical signature has been encountered before.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '            clusters[signature] = []', why_this_line: 'Initializes new bucket list for this signature.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '        clusters[signature].append(token)', why_this_line: 'Appends original token into its corresponding anagram bucket.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '    return sorted([sorted(g) for g in clusters.values()], key=lambda x: (len(x), x[0]))', why_this_line: 'Returns canonical sorted lists for deterministic evaluation across test runners.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 4,
          code: 'signature = "".join(sorted(token))',
          why_it_is_tricky: 'Using sorted(token) returns a list, which cannot be used as a dictionary key in Python unless converted to tuple or joined to string.',
          recommended_tests: ['Empty token string ["", ""] (must return [["", ""]])', 'Single letter tokens ["a", "b", "a"]']
        },
        {
          line_number: 8,
          code: 'return sorted([sorted(g) for g in clusters.values()], key=lambda x: (len(x), x[0]))',
          why_it_is_tricky: 'Unordered hash map values can be returned in different orders across Python runs; sorting ensures reproducible comparisons.',
          recommended_tests: ['Multiple distinct anagram groups with overlapping letters']
        }
      ],
      hints: [
        'What property do all anagrams share? When sorted, their letters are identical.',
        'How can you group items by a shared property? Use that property as a hash map key.',
        'Convert each word into its sorted character representation and use it as a key in a dictionary of lists.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['anagram', 'clusters', 'sorted signature', 'hash map'],
      starter_code: `def group_anagram_signatures(telemetry_tokens: list[str]) -> list[list[str]]:
    """
    Group anagrams together into clustered lists.
    """
    pass
`
    },
    {
      id: 'hm-003',
      slug: 'prefix-sum-cumulative-target-matcher',
      title: 'Prefix Sum Cumulative Target Matcher',
      pattern: 'hash_maps',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'Given an array of integers data_stream and an integer target_sum, return the total number of continuous subarrays whose sum equals to target_sum.\\n\\nA subarray is a contiguous non-empty sequence of elements within an array. Array elements may be negative, zero, or positive.',
        input_format: 'data_stream: list[int], target_sum: int',
        output_format: 'int representing total count of matching subarrays',
        examples: [
          {
            input: 'data_stream = [1, 1, 1], target_sum = 2',
            output: '2',
            explanation: 'Subarrays [1, 1] at indices [0..1] and [1..2] each sum to 2.'
          },
          {
            input: 'data_stream = [1, -1, 0], target_sum = 0',
            output: '3',
            explanation: 'Subarrays [1, -1] at [0..1], [0] at [2..2], and [1, -1, 0] at [0..2] all sum to 0.'
          }
        ],
        constraints: [
          '1 <= data_stream.length <= 40,000',
          '-1,000 <= data_stream[i] <= 1,000',
          '-10^7 <= target_sum <= 10^7'
        ]
      },
      pattern_clues: [
        'Elements can be negative, which breaks two-pointer sliding window monotonicity',
        'Mathematical property: sum(i..j) = prefix_sum[j] - prefix_sum[i - 1]',
        'If prefix_sum[j] - target_sum was seen k times previously, exactly k subarrays ending at j sum to target_sum'
      ],
      trigger_words: ['subarray sum equals k', 'negative numbers', 'prefix sum', 'cumulative sum map', 'frequency counter'],
      brute_force: {
        approach: 'Check all pairs of start and end indices (i, j) with i <= j. Calculate the sum of subarray data_stream[i:j + 1]. If sum == target_sum, increment total counter.',
        why_it_is_too_slow: 'Quadratic O(N^2) time evaluates up to 800 million subarrays for N = 40,000, causing a Time Limit Exceeded.',
        time_complexity: 'O(N^2)',
        space_complexity: 'O(1)',
        language: 'python',
        code: `def count_subarrays_with_sum(data_stream, target_sum):
    n = len(data_stream)
    count = 0
    for i in range(n):
        curr_sum = 0
        for j in range(i, n):
            curr_sum += data_stream[j]
            if curr_sum == target_sum:
                count += 1
    return count`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Maintain a running current_sum and a hash map prefix_counts storing frequency of cumulative sums seen so far, initialized with {0: 1}. For each element, add to current_sum. Check if (current_sum - target_sum) exists in prefix_counts and add its count to total. Increment prefix_counts[current_sum].',
        time_complexity: 'O(N)',
        space_complexity: 'O(N)',
        why_this_works: 'A subarray from index i to j has sum equal to prefix_sum[j] - prefix_sum[i-1]. Rearranging: prefix_sum[i-1] = prefix_sum[j] - target_sum. Querying the frequency of this required prefix sum in O(1) finds all valid starting indices in a single pass.',
        subgoals: [
          {
            title: 'Initialize prefix frequency map with base zero',
            explanation: 'Initialize prefix_counts with {0: 1} to account for subarrays starting at index 0.',
            line_range: [2, 4]
          },
          {
            title: 'Accumulate prefix sum and query complement frequency',
            explanation: 'For each element, update running sum, check if current_sum - target_sum exists, and accumulate frequency.',
            line_range: [5, 9]
          },
          {
            title: 'Record current prefix sum and return total',
            explanation: 'Increment frequency of current_sum in map; return accumulated total subarrays.',
            line_range: [10, 11]
          }
        ],
        code: `def count_subarrays_with_sum(data_stream, target_sum):
    prefix_counts = {0: 1}
    current_sum = 0
    total_subarrays = 0
    for val in data_stream:
        current_sum += val
        needed_prefix = current_sum - target_sum
        if needed_prefix in prefix_counts:
            total_subarrays += prefix_counts[needed_prefix]
        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1
    return total_subarrays`,
        code_lines: [
          { line_number: 1, code: 'def count_subarrays_with_sum(data_stream, target_sum):', why_this_line: 'Declares function counting continuous subarrays summing to target_sum.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    prefix_counts = {0: 1}', why_this_line: 'Base case: a prefix sum of 0 has occurred once before processing any elements.', is_high_risk: true, risk_note: 'Crucial: omitting {0: 1} misses all subarrays starting at index 0 whose sum equals target_sum.' },
          { line_number: 3, code: '    current_sum = 0', why_this_line: 'Tracks cumulative sum of elements from index 0 to current position.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    total_subarrays = 0', why_this_line: 'Accumulator for total matching subarrays found.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    for val in data_stream:', why_this_line: 'Iterates through stream elements sequentially.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '        current_sum += val', why_this_line: 'Updates running cumulative prefix sum.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '        needed_prefix = current_sum - target_sum', why_this_line: 'Calculates the historical prefix sum needed to form a subarray summing to target_sum.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '        if needed_prefix in prefix_counts:', why_this_line: 'Checks if required prefix sum occurred previously.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '            total_subarrays += prefix_counts[needed_prefix]', why_this_line: 'Adds the frequency of matching previous prefix sums to total count.', is_high_risk: true, risk_note: 'Must add frequency count, NOT just 1, because multiple historical prefixes can form valid subarrays.' },
          { line_number: 10, code: '        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1', why_this_line: 'Registers current cumulative sum in the frequency map for future elements.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '    return total_subarrays', why_this_line: 'Returns total count of valid subarrays.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 2,
          code: 'prefix_counts = {0: 1}',
          why_it_is_tricky: 'Initializing prefix_counts to {} causes subarrays starting at index 0 (like [2] with target 2) to be ignored.',
          recommended_tests: ['Single element equals target [2] with target 2 (must return 1)', 'Prefix sum never returns to 0 [1, 2, 3] with target 3']
        },
        {
          line_number: 9,
          code: 'total_subarrays += prefix_counts[needed_prefix]',
          why_it_is_tricky: 'Using += 1 instead of += prefix_counts[needed_prefix] undercounts when multiple prefix sums coincide (e.g. zeros in array).',
          recommended_tests: ['Array with multiple zeros [0, 0, 0] with target 0 (must return 6)']
        }
      ],
      hints: [
        'Why cant you use a sliding window? Because negative numbers can decrease the sum when expanding or increase it when shrinking.',
        'If the sum of elements from 0 to j is S, and the sum from 0 to i-1 is S - target, what is the sum of elements from i to j?',
        'Initialize your frequency map with {0: 1} to handle subarrays that start at index 0.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['prefix sum', 'cumulative', 'target sum', 'subarray'],
      starter_code: `def count_subarrays_with_sum(data_stream: list[int], target_sum: int) -> int:
    """
    Return total count of continuous subarrays whose sum equals target_sum.
    """
    pass
`
    },
    {
      id: 'hm-004',
      slug: 'o1-sequence-chain-length-extractor',
      title: 'O(1) Sequence Chain Length Extractor',
      pattern: 'hash_maps',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'Given an unsorted array of integers sequence_ids, return the length of the longest consecutive elements sequence.\\n\\nYou must write an algorithm that runs in O(N) time.',
        input_format: 'sequence_ids: list[int]',
        output_format: 'int representing length of longest consecutive chain',
        examples: [
          {
            input: 'sequence_ids = [100, 4, 200, 1, 3, 2]',
            output: '4',
            explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4.'
          },
          {
            input: 'sequence_ids = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]',
            output: '9',
            explanation: 'The consecutive chain from 0 to 8: [0, 1, 2, 3, 4, 5, 6, 7, 8] has length 9.'
          }
        ],
        constraints: [
          '0 <= sequence_ids.length <= 100,000',
          '-10^9 <= sequence_ids[i] <= 10^9'
        ]
      },
      pattern_clues: [
        'Explicit requirement of O(N) runtime prohibits O(N log N) sorting',
        'A number x is the START of a consecutive sequence if and only if x - 1 is NOT present in the set',
        'Converting array to a hash set enables O(1) containment checks, allowing each sequence to be traversed once'
      ],
      trigger_words: ['longest consecutive sequence', 'O(N) runtime', 'hash set', 'sequence start condition x - 1', 'consecutive elements'],
      brute_force: {
        approach: 'Sort the array sequence_ids in ascending order. Then iterate through the sorted list, tracking current streak while consecutive elements differ by 1 (ignoring duplicates), and record maximum streak.',
        why_it_is_too_slow: 'Sorting requires O(N log N) time, which violates the strict O(N) time complexity requirement in the problem specification.',
        time_complexity: 'O(N log N)',
        space_complexity: 'O(N)',
        language: 'python',
        code: `def longest_consecutive_chain(sequence_ids):
    if not sequence_ids:
        return 0
    sorted_ids = sorted(set(sequence_ids))
    longest = 1
    current = 1
    for i in range(1, len(sorted_ids)):
        if sorted_ids[i] == sorted_ids[i - 1] + 1:
            current += 1
            longest = max(longest, current)
        else:
            current = 1
    return longest`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Insert all numbers into a hash set id_set. Iterate through id_set: only if num - 1 is not in id_set is num the start of a consecutive sequence. From that starting number, increment current_num by 1 while current_num + 1 in id_set, tracking current_streak. Update longest_streak.',
        time_complexity: 'O(N)',
        space_complexity: 'O(N)',
        why_this_works: 'By only starting the inner while loop when num - 1 is absent, each number is visited at most twice (once in outer loop, once in inner streak exploration), guaranteeing strict linear O(N) time.',
        subgoals: [
          {
            title: 'Convert array to hash set',
            explanation: 'Create id_set from sequence_ids for O(1) membership queries; initialize longest_streak.',
            line_range: [2, 3]
          },
          {
            title: 'Identify sequence starts and expand streaks',
            explanation: 'Only expand when num - 1 not in set; loop forward checking num + 1, num + 2...',
            line_range: [4, 9]
          },
          {
            title: 'Update and return longest streak',
            explanation: 'Update peak streak length and return longest consecutive count.',
            line_range: [10, 11]
          }
        ],
        code: `def longest_consecutive_chain(sequence_ids):
    id_set = set(sequence_ids)
    longest_streak = 0
    for num in id_set:
        if num - 1 not in id_set:
            current_num = num
            current_streak = 1
            while current_num + 1 in id_set:
                current_num += 1
                current_streak += 1
            if current_streak > longest_streak:
                longest_streak = current_streak
    return longest_streak`,
        code_lines: [
          { line_number: 1, code: 'def longest_consecutive_chain(sequence_ids):', why_this_line: 'Declares function computing length of longest consecutive chain in O(N) time.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    id_set = set(sequence_ids)', why_this_line: 'Inserts all elements into hash set for O(1) lookup and deduplication.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    longest_streak = 0', why_this_line: 'Tracks maximum consecutive streak length found.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    for num in id_set:', why_this_line: 'Iterates through unique numbers in the set.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '        if num - 1 not in id_set:', why_this_line: 'Checks if num is the beginning of a sequence: if num - 1 exists, num is not the start and must be skipped.', is_high_risk: true, risk_note: 'Crucial: without num - 1 not in id_set, the algorithm degrades to O(N^2) quadratic time on descending inputs.' },
          { line_number: 6, code: '            current_num = num', why_this_line: 'Sets sequence runner to the start element.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '            current_streak = 1', why_this_line: 'Initializes current streak length to 1.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '            while current_num + 1 in id_set:', why_this_line: 'Expands streak forward as long as consecutive successor exists in hash set.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '                current_num += 1', why_this_line: 'Moves to next consecutive integer.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '                current_streak += 1', why_this_line: 'Increments current streak counter.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '            if current_streak > longest_streak:', why_this_line: 'Checks if current streak exceeds historical maximum.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '                longest_streak = current_streak', why_this_line: 'Updates record streak length.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '    return longest_streak', why_this_line: 'Returns length of longest consecutive chain.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 5,
          code: 'if num - 1 not in id_set:',
          why_it_is_tricky: 'Omitting this check causes the while loop to re-expand for every element of a streak (e.g. 100, 99, 98...), resulting in quadratic O(N^2) worst-case time.',
          recommended_tests: ['Large descending sequence [100, 99, ..., 1]', 'Empty array [] (must return 0)', 'Single element [42] (must return 1)']
        },
        {
          line_number: 2,
          code: 'id_set = set(sequence_ids)',
          why_it_is_tricky: 'Iterating over original sequence_ids with duplicates instead of id_set does redundant work for duplicate numbers.',
          recommended_tests: ['Array with all duplicates [1, 1, 1, 1] (must return 1)']
        }
      ],
      hints: [
        'Sorting takes O(N log N), but the problem requires O(N). What data structure provides O(1) element lookup? A hash set.',
        'How do you know if a number is the start of a consecutive sequence? Check if num - 1 exists in the set.',
        'If num - 1 is present, skip it! Only count upwards from numbers that are the true start of a streak.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['consecutive', 'hash set', 'longest sequence', 'streak'],
      starter_code: `def longest_consecutive_chain(sequence_ids: list[int]) -> int:
    """
    Return length of longest consecutive elements sequence in O(N) time.
    """
    pass
`
    },
    {
      id: 'hm-005',
      slug: 'frequent-frequency-histogram-counter',
      title: 'Frequent Frequency Histogram Counter',
      pattern: 'hash_maps',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'Given an integer array data_readings and an integer top_k, return the top_k most frequent elements. You may return the answer in any order.\\n\\nYour algorithm must have time complexity better than O(N log N), where N is the array size.',
        input_format: 'data_readings: list[int], top_k: int',
        output_format: 'list[int] containing the top_k most frequent numbers',
        examples: [
          {
            input: 'data_readings = [1, 1, 1, 2, 2, 3], top_k = 2',
            output: '[1, 2]',
            explanation: '1 occurs three times and 2 occurs twice. The 2 most frequent numbers are [1, 2].'
          },
          {
            input: 'data_readings = [4, 4, 4, 6, 6, 7, 8, 8, 8, 8], top_k = 1',
            output: '[8]',
            explanation: '8 occurs four times, which is the highest frequency. Output is [8].'
          }
        ],
        constraints: [
          '1 <= data_readings.length <= 100,000',
          '-10^4 <= data_readings[i] <= 10^4',
          'top_k is in the range [1, number of unique elements]',
          'It is guaranteed that the answer is unique'
        ]
      },
      pattern_clues: [
        'Counting frequencies maps to a hash map in O(N) time',
        'Sorting frequencies takes O(U log U); to achieve linear O(N) time, use bucket sort where bucket index represents frequency count',
        'Maximum possible frequency is N, making bucket array of size N + 1 optimal in time and space'
      ],
      trigger_words: ['top k frequent', 'bucket sort frequency', 'hash map counting', 'better than O(N log N)', 'frequency histogram'],
      brute_force: {
        approach: 'Count occurrences of each number using a frequency hash map. Sort the distinct numbers descending by frequency using standard sort, and slice the first top_k elements.',
        why_it_is_too_slow: 'Sorting distinct elements takes O(U log U) where U can be up to N. While accepted on small inputs, it does not achieve the optimal linear O(N) bucket sort bound.',
        time_complexity: 'O(N log N)',
        space_complexity: 'O(N)',
        language: 'python',
        code: `def top_k_frequent_telemetry(data_readings, top_k):
    counts = {}
    for x in data_readings:
        counts[x] = counts.get(x, 0) + 1
    sorted_items = sorted(counts.items(), key=lambda item: item[1], reverse=True)
    return sorted([item[0] for item in sorted_items[:top_k]])`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Count element frequencies using a hash map. Create a bucket array of size len(data_readings) + 1 where buckets[freq] holds a list of numbers having that frequency. Iterate from highest frequency bucket down to 1, collecting elements until top_k elements are gathered.',
        time_complexity: 'O(N)',
        space_complexity: 'O(N)',
        why_this_works: 'Frequencies are bounded between 1 and N. Bucket sort operates in linear O(N) time without comparison sorting, achieving optimal O(N) overall runtime.',
        subgoals: [
          {
            title: 'Count frequencies with hash map',
            explanation: 'Build frequency dictionary counts mapping value -> occurrences in O(N) time.',
            line_range: [2, 5]
          },
          {
            title: 'Populate frequency bucket array',
            explanation: 'Create buckets array of size N + 1 and place each number into bucket corresponding to its frequency.',
            line_range: [6, 9]
          },
          {
            title: 'Gather top k elements from highest frequency buckets',
            explanation: 'Scan buckets downward from N to 1; append items until top_k elements are accumulated.',
            line_range: [10, 16]
          }
        ],
        code: `def top_k_frequent_telemetry(data_readings, top_k):
    counts = {}
    for num in data_readings:
        counts[num] = counts.get(num, 0) + 1
    buckets = [[] for _ in range(len(data_readings) + 1)]
    for num, freq in counts.items():
        buckets[freq].append(num)
    result = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == top_k:
                return sorted(result)
    return sorted(result)`,
        code_lines: [
          { line_number: 1, code: 'def top_k_frequent_telemetry(data_readings, top_k):', why_this_line: 'Declares function to return the top_k most frequent numbers.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '    counts = {}', why_this_line: 'Hash map to count frequencies of each unique number.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: '    for num in data_readings:', why_this_line: 'Iterates through input array to tally counts.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '        counts[num] = counts.get(num, 0) + 1', why_this_line: 'Increments occurrence counter for num.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    buckets = [[] for _ in range(len(data_readings) + 1)]', why_this_line: 'Creates bucket array where index represents frequency (from 0 to N).', is_high_risk: true, risk_note: 'Size must be len(data_readings) + 1 to accommodate an element that appears N times at index N.' },
          { line_number: 6, code: '    for num, freq in counts.items():', why_this_line: 'Places each distinct number into the bucket corresponding to its frequency.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '        buckets[freq].append(num)', why_this_line: 'Appends number into bucket freq in O(1).', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '    result = []', why_this_line: 'List to collect the top_k numbers.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '    for freq in range(len(buckets) - 1, 0, -1):', why_this_line: 'Iterates downward from highest possible frequency to 1.', is_high_risk: true, risk_note: 'Must step backward by -1 to collect most frequent elements first.' },
          { line_number: 10, code: '        for num in buckets[freq]:', why_this_line: 'Extracts numbers in current frequency bucket.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '            result.append(num)', why_this_line: 'Appends number to result set.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '            if len(result) == top_k:', why_this_line: 'Terminates immediately when top_k elements have been gathered.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '                return sorted(result)', why_this_line: 'Returns sorted result for deterministic comparison across test runners.', is_high_risk: false, risk_note: null },
          { line_number: 14, code: '    return sorted(result)', why_this_line: 'Fallback return if loop completes.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 5,
          code: 'buckets = [[] for _ in range(len(data_readings) + 1)]',
          why_it_is_tricky: 'Using range(len(data_readings)) without + 1 causes IndexError when an element appears N times (frequency = N).',
          recommended_tests: ['All identical elements [1, 1, 1] with top_k = 1', 'Single element [1] with top_k = 1']
        },
        {
          line_number: 9,
          code: 'for freq in range(len(buckets) - 1, 0, -1):',
          why_it_is_tricky: 'Looping in ascending order would return the least frequent elements instead of most frequent.',
          recommended_tests: ['Array with distinct frequencies [1, 1, 2, 2, 2, 3] with top_k = 1 (must return [2])']
        }
      ],
      hints: [
        'First count how many times each number appears using a hash map.',
        'Can the frequency of any number ever be greater than the length of the array? No, the maximum frequency is N.',
        'Use the frequencies as indices in an array of lists (bucket sort) to find the top k elements in O(N) time without sorting.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming'],
      ai_avoid_keywords: ['top k', 'bucket sort', 'frequency', 'most frequent'],
      starter_code: `def top_k_frequent_telemetry(data_readings: list[int], top_k: int) -> list[int]:
    """
    Return top_k most frequent elements in O(N) time.
    """
    pass
`
    }
  ];
}
