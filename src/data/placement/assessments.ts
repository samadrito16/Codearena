import { CompanyAssessment, CodingPlacementQuestion } from '../../types/placement';
import { APTITUDE_QUESTION_BANK } from './questions/aptitudeQuestions';
import { CS_QUESTION_BANK } from './questions/csQuestions';

// ==========================================
// Standard I/O (stdin / stdout) Coding Questions for Campus OAs
// ==========================================

const CODING_TCS_NINJA: CodingPlacementQuestion = {
  id: 'tcs-code-ninja-1',
  type: 'coding',
  section: 'coding',
  subject: 'cs_pseudocode',
  subtopic: 'Array Processing',
  difficulty: 'Easy',
  marks: 15,
  negativeMarks: 0,
  problemId: 'two-sum',
  title: 'Target Pair Identification',
  isStdinStdout: true,
  inputFormat: 'Line 1: N (array length) and Target (separated by space). Line 2: N space-separated integers.',
  outputFormat: 'Print the two 0-based indices separated by a space on a single line.',
  description:
    'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input has exactly one valid solution, and you may not use the same element twice. Read inputs from standard input and print the space-separated indices to standard output.',
  constraints: [
    '2 <= N <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Exactly one valid answer exists.',
  ],
  examples: [
    {
      input: '4 9\n2 7 11 15',
      output: '0 1',
      explanation: 'nums[0] + nums[1] == 2 + 7 == 9, so output is 0 1.',
    },
    {
      input: '3 6\n3 2 4',
      output: '1 2',
      explanation: 'nums[1] + nums[2] == 2 + 4 == 6, so output is 1 2.',
    },
  ],
  starterCode: {
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    // Write your solution here
    // Example: cout << 0 << " " << 1 << "\n";
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int target = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }

        // Write your solution here
        // Example: System.out.println("0 1");
    }
}`,
    python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n, target = int(tokens[0]), int(tokens[1])
    nums = [int(x) for x in tokens[2:2 + n]]

    # Write your solution here
    # Example: print(0, 1)

if __name__ == '__main__':
    main()`,
    javascript: `const fs = require('fs');

function main() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0]);
    const target = parseInt(tokens[1]);
    const nums = tokens.slice(2, 2 + n).map(Number);

    // Write your solution here
    // Example: console.log(0, 1);
}

main();`,
  },
  testCases: [
    {
      caseNumber: 1,
      input: '4 9\n2 7 11 15',
      expected: '0 1',
      isHidden: false,
    },
    {
      caseNumber: 2,
      input: '3 6\n3 2 4',
      expected: '1 2',
      isHidden: false,
    },
    {
      caseNumber: 3,
      input: '2 6\n3 3',
      expected: '0 1',
      isHidden: true,
    },
  ],
  referenceCode: {
    language: 'python',
    code: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n, target = int(tokens[0]), int(tokens[1])
    nums = [int(x) for x in tokens[2:2 + n]]
    lookup = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in lookup:
            print(f"{lookup[diff]} {i}")
            return
        lookup[num] = i

if __name__ == '__main__':
    main()`,
  },
  explanation: {
    summary: 'Use a hash map to achieve O(N) time complexity by looking up the complement for each element.',
    steps: [
      'Parse N and Target from stdin, followed by the N integers.',
      'Maintain a dictionary mapping each number to its index.',
      'For each element, check if (target - num) was seen. If yes, print both indices and exit.',
    ],
    formulaOrShortcut: 'O(N) Time Complexity, O(N) Space Complexity using Hash Table.',
  },
};

const CODING_TCS_DIGITAL: CodingPlacementQuestion = {
  id: 'tcs-code-digital-1',
  type: 'coding',
  section: 'coding',
  subject: 'cs_pseudocode',
  subtopic: 'Dynamic Programming & Arrays',
  difficulty: 'Medium',
  marks: 25,
  negativeMarks: 0,
  problemId: 'maximum-subarray',
  title: 'Maximum Contiguous Subarray Sum',
  isStdinStdout: true,
  inputFormat: 'Line 1: N (number of elements). Line 2: N space-separated integers.',
  outputFormat: 'Print the maximum contiguous subarray sum on a single line.',
  description:
    'Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and print its sum to standard output.',
  constraints: [
    '1 <= N <= 10^5',
    '-10^4 <= nums[i] <= 10^4',
  ],
  examples: [
    {
      input: '9\n-2 1 -3 4 -1 2 1 -5 4',
      output: '6',
      explanation: 'The subarray [4, -1, 2, 1] has the largest sum 6.',
    },
    {
      input: '1\n1',
      output: '1',
      explanation: 'Single element array.',
    },
    {
      input: '5\n5 4 -1 7 8',
      output: '23',
      explanation: 'Entire array sum is 23.',
    },
  ],
  starterCode: {
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    // Write your solution here
    // Example: cout << 0 << "\n";
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        // Write your solution here
        // Example: System.out.println(0);
    }
}`,
    python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:1 + n]]

    # Write your solution here
    # Example: print(0)

if __name__ == '__main__':
    main()`,
    javascript: `const fs = require('fs');

function main() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!tokens.length) return;
    const n = parseInt(tokens[0]);
    const nums = tokens.slice(1, 1 + n).map(Number);

    // Write your solution here
    // Example: console.log(0);
}

main();`,
  },
  testCases: [
    {
      caseNumber: 1,
      input: '9\n-2 1 -3 4 -1 2 1 -5 4',
      expected: '6',
      isHidden: false,
    },
    {
      caseNumber: 2,
      input: '5\n5 4 -1 7 8',
      expected: '23',
      isHidden: false,
    },
    {
      caseNumber: 3,
      input: '3\n-1 -2 -3',
      expected: '-1',
      isHidden: true,
    },
  ],
  referenceCode: {
    language: 'python',
    code: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:1 + n]]
    max_so_far = nums[0]
    curr_max = nums[0]
    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    print(max_so_far)

if __name__ == '__main__':
    main()`,
  },
  explanation: {
    summary: "Kadane's algorithm solves this in linear time O(N) and O(1) auxiliary space.",
    steps: [
      'Maintain two variables: `curr_max` and `max_so_far`.',
      'For each element, decide whether to add it to existing subarray or start fresh.',
      'Update `max_so_far = max(max_so_far, curr_max)`.',
    ],
    formulaOrShortcut: "Kadane's algorithm: O(N) Time, O(1) Space.",
  },
};

const CODING_INFOSYS_1: CodingPlacementQuestion = {
  id: 'infy-code-1',
  type: 'coding',
  section: 'coding',
  subject: 'cs_pseudocode',
  subtopic: 'Greedy Algorithms',
  difficulty: 'Medium',
  marks: 20,
  negativeMarks: 0,
  problemId: 'jump-game',
  title: 'Minimum Energy Jump Game',
  isStdinStdout: true,
  inputFormat: 'Line 1: N (number of positions). Line 2: N space-separated integers.',
  outputFormat: 'Print "true" if the last index is reachable, otherwise "false".',
  description:
    'You are given an integer array `nums` representing the maximum jump length at each position starting from index 0. Print `true` if you can reach the last index, or `false` otherwise.',
  constraints: [
    '1 <= N <= 10^4',
    '0 <= nums[i] <= 10^5',
  ],
  examples: [
    {
      input: '5\n2 3 1 1 4',
      output: 'true',
      explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.',
    },
    {
      input: '5\n3 2 1 0 4',
      output: 'false',
      explanation: 'Arriving at index 3 with jump length 0 makes it impossible to reach the end.',
    },
  ],
  starterCode: {
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    // Write your solution here
    // Print "true" or "false"
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        // Write your solution here
        // Print "true" or "false"
    }
}`,
    python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:1 + n]]

    # Write your solution here
    # Print "true" or "false"

if __name__ == '__main__':
    main()`,
    javascript: `const fs = require('fs');

function main() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (!tokens.length) return;
    const n = parseInt(tokens[0]);
    const nums = tokens.slice(1, 1 + n).map(Number);

    // Write your solution here
    // Print "true" or "false"
}

main();`,
  },
  testCases: [
    {
      caseNumber: 1,
      input: '5\n2 3 1 1 4',
      expected: 'true',
      isHidden: false,
    },
    {
      caseNumber: 2,
      input: '5\n3 2 1 0 4',
      expected: 'false',
      isHidden: false,
    },
    {
      caseNumber: 3,
      input: '1\n0',
      expected: 'true',
      isHidden: true,
    },
  ],
  referenceCode: {
    language: 'python',
    code: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:1 + n]]
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            print("false")
            return
        max_reach = max(max_reach, i + jump)
    print("true")

if __name__ == '__main__':
    main()`,
  },
  explanation: {
    summary: 'Greedy tracking of maximum reachable index.',
    steps: [
      'Initialize `max_reach = 0`.',
      'Traverse array: if current index `i > max_reach`, cannot advance, print false.',
      'Otherwise update `max_reach = max(max_reach, i + nums[i])`.',
    ],
    formulaOrShortcut: 'Greedy approach: O(N) Time, O(1) Space.',
  },
};

const CODING_ACCENTURE_1: CodingPlacementQuestion = {
  id: 'acc-code-1',
  type: 'coding',
  section: 'coding',
  subject: 'cs_pseudocode',
  subtopic: 'String Manipulation',
  difficulty: 'Easy',
  marks: 15,
  negativeMarks: 0,
  problemId: 'valid-parentheses',
  title: 'Balanced Bracket Validator',
  isStdinStdout: true,
  inputFormat: 'A single line containing the string S.',
  outputFormat: 'Print "true" if the brackets are balanced, otherwise "false".',
  description:
    'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. Read string from stdin and print "true" or "false" to stdout.',
  constraints: [
    '1 <= s.length <= 10^4',
    's consists of parentheses only "()[]{}"',
  ],
  examples: [
    {
      input: '()',
      output: 'true',
    },
    {
      input: '()[]{}',
      output: 'true',
    },
    {
      input: '(]',
      output: 'false',
    },
  ],
  starterCode: {
    cpp: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;

    // Write your solution here
    // Print "true" or "false"
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();

        // Write your solution here
        // Print "true" or "false"
    }
}`,
    python: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s: return

    # Write your solution here
    # Print "true" or "false"

if __name__ == '__main__':
    main()`,
    javascript: `const fs = require('fs');

function main() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;

    // Write your solution here
    // Print "true" or "false"
}

main();`,
  },
  testCases: [
    {
      caseNumber: 1,
      input: '()',
      expected: 'true',
      isHidden: false,
    },
    {
      caseNumber: 2,
      input: '(]',
      expected: 'false',
      isHidden: false,
    },
    {
      caseNumber: 3,
      input: '{[]}',
      expected: 'true',
      isHidden: true,
    },
  ],
  referenceCode: {
    language: 'python',
    code: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s: return
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                print("false")
                return
        else:
            stack.append(char)
    print("true" if not stack else "false")

if __name__ == '__main__':
    main()`,
  },
  explanation: {
    summary: 'Use a LIFO stack to match closing brackets with recent opening brackets.',
    steps: [
      'Push opening brackets onto stack.',
      'When encounter closing bracket, pop from stack and check match.',
      'At end, stack must be empty for string to be balanced.',
    ],
    formulaOrShortcut: 'Stack LIFO: O(N) Time, O(N) Space.',
  },
};

// Zoho Signature Question: Run-Length Expansion (Pure algorithmic string decode)
const CODING_ZOHO_1: CodingPlacementQuestion = {
  id: 'zoho-code-1',
  type: 'coding',
  section: 'coding',
  subject: 'cs_pseudocode',
  subtopic: 'String Parsing & Arithmetic',
  difficulty: 'Easy',
  marks: 20,
  negativeMarks: 0,
  problemId: 'zoho-run-length-decode',
  title: 'Run-Length Character Expander',
  isStdinStdout: true,
  inputFormat: 'A single string S where each alphabet is followed by its occurrence count (e.g. "a2b3c1").',
  outputFormat: 'Print the fully expanded string on a single line.',
  description:
    'A classic Zoho campus elimination problem: Given a compressed string where characters are followed by their frequency count (e.g. `a3b2c1`), expand the string such that each character appears consecutive times equal to its count (e.g. `aaabbc`). The frequency count can be multi-digit (e.g. `a10`). You must implement this with raw loops without using built-in regular expression libraries.',
  constraints: [
    '1 <= S.length <= 100',
    'Characters are lowercase English letters followed by positive integers (1 to 100).',
  ],
  examples: [
    {
      input: 'a2b3',
      output: 'aabbb',
      explanation: 'a is repeated 2 times, b is repeated 3 times.',
    },
    {
      input: 'b3c6',
      output: 'bbbcccccc',
      explanation: 'b is repeated 3 times, c is repeated 6 times.',
    },
  ],
  starterCode: {
    cpp: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;

    // Write your solution here
    // Expand characters based on following integer count
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();

        // Write your solution here
        // Example: System.out.println("aabbb");
    }
}`,
    python: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s: return

    # Write your solution here
    # Example: print("aabbb")

if __name__ == '__main__':
    main()`,
    javascript: `const fs = require('fs');

function main() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;

    // Write your solution here
    // Example: console.log("aabbb");
}

main();`,
  },
  testCases: [
    {
      caseNumber: 1,
      input: 'a2b3',
      expected: 'aabbb',
      isHidden: false,
    },
    {
      caseNumber: 2,
      input: 'b3c6',
      expected: 'bbbcccccc',
      isHidden: false,
    },
    {
      caseNumber: 3,
      input: 'x1y2z3',
      expected: 'xyyzzz',
      isHidden: true,
    },
  ],
  referenceCode: {
    language: 'python',
    code: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s: return
    res = []
    i = 0
    n = len(s)
    while i < n:
        char = s[i]
        i += 1
        num_str = ''
        while i < n and s[i].isdigit():
            num_str += s[i]
            i += 1
        count = int(num_str) if num_str else 1
        res.append(char * count)
    print(''.join(res))

if __name__ == '__main__':
    main()`,
  },
  explanation: {
    summary: 'Iterate through the string, parsing characters and multi-digit counts sequentially.',
    steps: [
      'Track the current alphabetical character.',
      'Accumulate subsequent digit characters into a numerical count.',
      'Append the character multiplied by the count to the result.',
    ],
    formulaOrShortcut: 'Linear traversal O(L) where L is output length.',
  },
};

// Persistent Systems Signature Question: Array Rotation & Query
const CODING_PERSISTENT_1: CodingPlacementQuestion = {
  id: 'persistent-code-1',
  type: 'coding',
  section: 'coding',
  subject: 'cs_pseudocode',
  subtopic: 'Array Rotation & Modulo Arithmetic',
  difficulty: 'Medium',
  marks: 20,
  negativeMarks: 0,
  problemId: 'rotate-array-k',
  title: 'Cyclic Array Rotation by K Positions',
  isStdinStdout: true,
  inputFormat: 'Line 1: N (size of array) and K (number of right rotation steps). Line 2: N space-separated integers.',
  outputFormat: 'Print the array elements after right rotation, separated by space on a single line.',
  description:
    'Given an array of integers and a non-negative integer `k`, rotate the array to the right by `k` steps in-place with O(1) extra memory. Print the resulting array to stdout.',
  constraints: [
    '1 <= N <= 10^5',
    '0 <= K <= 10^5',
    '-10^4 <= nums[i] <= 10^4',
  ],
  examples: [
    {
      input: '7 3\n1 2 3 4 5 6 7',
      output: '5 6 7 1 2 3 4',
      explanation: 'Rotate 1 step: [7,1,2,3,4,5,6]. Rotate 2 steps: [6,7,1,2,3,4,5]. Rotate 3 steps: [5,6,7,1,2,3,4].',
    },
    {
      input: '4 2\n-1 -100 3 99',
      output: '3 99 -1 -100',
      explanation: 'Rotate 2 steps: [3, 99, -1, -100].',
    },
  ],
  starterCode: {
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    // Write your solution here
    // Print rotated array separated by space
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        // Write your solution here
    }
}`,
    python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n, k = int(tokens[0]), int(tokens[1])
    nums = [int(x) for x in tokens[2:2 + n]]

    # Write your solution here
    # Print space-separated rotated numbers

if __name__ == '__main__':
    main()`,
    javascript: `const fs = require('fs');

function main() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
    if (tokens.length < 2) return;
    const n = parseInt(tokens[0]);
    const k = parseInt(tokens[1]);
    const nums = tokens.slice(2, 2 + n).map(Number);

    // Write your solution here
}

main();`,
  },
  testCases: [
    {
      caseNumber: 1,
      input: '7 3\n1 2 3 4 5 6 7',
      expected: '5 6 7 1 2 3 4',
      isHidden: false,
    },
    {
      caseNumber: 2,
      input: '4 2\n-1 -100 3 99',
      expected: '3 99 -1 -100',
      isHidden: false,
    },
    {
      caseNumber: 3,
      input: '3 4\n1 2 3',
      expected: '3 1 2',
      isHidden: true,
    },
  ],
  referenceCode: {
    language: 'python',
    code: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n, k = int(tokens[0]), int(tokens[1])
    nums = [int(x) for x in tokens[2:2 + n]]
    k = k % n
    rotated = nums[n - k:] + nums[:n - k]
    print(' '.join(map(str, rotated)))

if __name__ == '__main__':
    main()`,
  },
  explanation: {
    summary: 'Modulo k by n and use 3-step array reversal to achieve O(N) runtime and O(1) extra memory.',
    steps: [
      '`k = k % n` to handle rotations larger than array size.',
      'Reverse the whole array.',
      'Reverse first `k` elements, then reverse remaining `n - k` elements.',
    ],
    formulaOrShortcut: 'Reversal Algorithm: O(N) time, O(1) space.',
  },
};

// ==========================================
// 5 FLAGSHIP COMPANY ASSESSMENTS
// ==========================================

export const COMPANY_ASSESSMENTS: CompanyAssessment[] = [
  // 1. TCS NQT
  {
    id: 'tcs-nqt-mock-1',
    companyId: 'tcs',
    companyName: 'Tata Consultancy Services',
    title: 'TCS NQT Complete Assessment (Ninja & Digital)',
    track: 'Ninja & Digital',
    tierLabel: 'Flagship Qualifier',
    description:
      'Realistic simulation of the TCS National Qualifier Test. Features Cognitive Foundation (Numerical & Reasoning), CS Core (OOP, DBMS, OS, Networks), and 2 Hands-on Coding questions.',
    difficulty: 'Intermediate',
    totalDurationMinutes: 75,
    enforceSectionLock: true,
    allowBacktrackingWithinSection: true,
    totalMarks: 60,
    tags: ['TCS iON', 'Ninja ₹3.6 LPA', 'Digital ₹7.5 LPA', 'Calculator Enabled'],
    cutoffTiers: [
      {
        trackName: 'TCS Ninja Shortlist',
        minOverallPercentage: 62,
        badgeColor: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
        description: 'Qualifies for Ninja Interview Round (₹3.6 LPA package).',
      },
      {
        trackName: 'TCS Digital Shortlist',
        minOverallPercentage: 80,
        badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
        description: 'Elite Digital Interview Round (₹7.0 - ₹7.5 LPA package). Requires strong CS Core and passing both coding questions.',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Below national qualifying threshold. Review weak subjects in the diagnostic breakdown.',
      },
    ],
    sections: [
      {
        id: 'sec-tcs-1',
        title: 'Section 1: Numerical Ability',
        type: 'quantitative',
        durationMinutes: 20,
        allowCalculator: true,
        instructions: 'Numerical questions with on-screen calculator access. No negative marks.',
        questions: APTITUDE_QUESTION_BANK.filter((q) => q.section === 'quantitative').slice(0, 5),
      },
      {
        id: 'sec-tcs-2',
        title: 'Section 2: Reasoning & Verbal Ability',
        type: 'reasoning',
        durationMinutes: 20,
        allowCalculator: false,
        instructions: 'Logical deduction, syllogisms, and sentence construction.',
        questions: [
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'reasoning').slice(0, 3),
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'verbal').slice(0, 2),
        ],
      },
      {
        id: 'sec-tcs-3',
        title: 'Section 3: Advanced CS Fundamentals',
        type: 'cs_fundamentals',
        durationMinutes: 15,
        allowCalculator: false,
        instructions: 'Core engineering concepts: OOPs virtual dispatch, DBMS ACID, OS scheduling & paging.',
        questions: CS_QUESTION_BANK.filter((q) => q.section === 'cs_fundamentals').slice(0, 4),
      },
      {
        id: 'sec-tcs-4',
        title: 'Section 4: Hands-on Coding (2 Problems)',
        type: 'coding',
        durationMinutes: 20,
        allowCalculator: false,
        instructions: 'Problem 1 is Ninja standard; Problem 2 is Digital standard.',
        questions: [CODING_TCS_NINJA, CODING_TCS_DIGITAL],
      },
    ],
  },

  // 2. INFOSYS
  {
    id: 'infosys-sp-mock-1',
    companyId: 'infosys',
    companyName: 'Infosys Limited',
    title: 'Infosys Specialist Programmer & DSE Mock',
    track: 'Systems Engineer & SP',
    tierLabel: 'InfyTQ Simulation',
    description:
      'Challenging assessment emphasizing recursive pseudocode tracing, bitwise puzzles, logical seating arrangements, and dynamic programming.',
    difficulty: 'Challenging',
    totalDurationMinutes: 70,
    enforceSectionLock: true,
    allowBacktrackingWithinSection: true,
    totalMarks: 55,
    tags: ['InfyTQ', 'Specialist ₹9.5 LPA', 'DSE ₹6.5 LPA', 'Negative Marking'],
    cutoffTiers: [
      {
        trackName: 'Infosys Systems Engineer',
        minOverallPercentage: 60,
        badgeColor: 'text-sky-500 bg-sky-500/10 border-sky-500/30',
        description: 'Qualifies for Systems Engineer profile.',
      },
      {
        trackName: 'Infosys DSE / Specialist Programmer',
        minOverallPercentage: 78,
        badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
        description: 'Direct shortlist for Specialist Programmer (SP) or Digital Specialist Engineer (DSE).',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Review pseudocode stack tracing and recurrence relations.',
      },
    ],
    sections: [
      {
        id: 'sec-infy-1',
        title: 'Section 1: Logical & Analytical Reasoning',
        type: 'reasoning',
        durationMinutes: 20,
        allowCalculator: false,
        questions: APTITUDE_QUESTION_BANK.filter((q) => q.section === 'reasoning').slice(0, 4),
      },
      {
        id: 'sec-infy-2',
        title: 'Section 2: Technical Pseudocode Tracing',
        type: 'pseudocode',
        durationMinutes: 20,
        allowCalculator: false,
        questions: CS_QUESTION_BANK.filter((q) => q.section === 'pseudocode').slice(0, 3),
      },
      {
        id: 'sec-infy-3',
        title: 'Section 3: Algorithmic Coding Challenge',
        type: 'coding',
        durationMinutes: 30,
        allowCalculator: false,
        questions: [CODING_INFOSYS_1, CODING_TCS_DIGITAL],
      },
    ],
  },

  // 3. ACCENTURE
  {
    id: 'accenture-tech-mock-1',
    companyId: 'accenture',
    companyName: 'Accenture',
    title: 'Accenture Cognitive & Technical Assessment',
    track: 'ASE & Advanced ASE',
    tierLabel: 'Two-Stage Selection',
    description:
      'Tests Critical Reasoning, English Verbal Ability, Cloud/Network fundamentals, and Hands-on Coding.',
    difficulty: 'Intermediate',
    totalDurationMinutes: 60,
    enforceSectionLock: false,
    allowBacktrackingWithinSection: true,
    totalMarks: 50,
    tags: ['Cognitive Round', 'Cloud & Networks', 'ASE ₹4.5 LPA', 'A-ASE ₹6.5 LPA'],
    cutoffTiers: [
      {
        trackName: 'Accenture ASE Cleared',
        minOverallPercentage: 65,
        badgeColor: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
        description: 'Cleared cognitive and tech cutoff for Associate Software Engineer.',
      },
      {
        trackName: 'Accenture Advanced ASE Cleared',
        minOverallPercentage: 82,
        badgeColor: 'text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/30',
        description: 'Shortlisted for Advanced ASE role.',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Below cutoff.',
      },
    ],
    sections: [
      {
        id: 'sec-acc-1',
        title: 'Section 1: Critical Thinking & English',
        type: 'verbal',
        durationMinutes: 20,
        questions: [
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'verbal'),
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'reasoning').slice(0, 2),
        ],
      },
      {
        id: 'sec-acc-2',
        title: 'Section 2: Technical Fundamentals & Networks',
        type: 'cs_fundamentals',
        durationMinutes: 20,
        questions: [
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_networks'),
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_dbms'),
        ],
      },
      {
        id: 'sec-acc-3',
        title: 'Section 3: Coding Assessment',
        type: 'coding',
        durationMinutes: 20,
        questions: [CODING_ACCENTURE_1, CODING_TCS_NINJA],
      },
    ],
  },

  // 4. WIPRO
  {
    id: 'wipro-elite-mock-1',
    companyId: 'wipro',
    companyName: 'Wipro Limited',
    title: 'Wipro Elite NTH Assessment',
    track: 'Project Engineer & Turbo',
    tierLabel: 'AMCAT Pattern',
    description:
      'AMCAT-pattern mock exam covering Quantitative Aptitude, Logical Reasoning, Computer Programming principles, and two coding problems.',
    difficulty: 'Intermediate',
    totalDurationMinutes: 65,
    enforceSectionLock: true,
    allowBacktrackingWithinSection: true,
    totalMarks: 50,
    tags: ['AMCAT', 'Elite NTH', 'Turbo ₹7 LPA', 'Negative Marking'],
    cutoffTiers: [
      {
        trackName: 'Wipro Elite Shortlist',
        minOverallPercentage: 60,
        badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
        description: 'Qualifies for Project Engineer role.',
      },
      {
        trackName: 'Wipro Turbo Upgrade',
        minOverallPercentage: 78,
        badgeColor: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
        description: 'Turbo upgrade interview invitation (₹6.5 - ₹7.0 LPA).',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Below national cutoff.',
      },
    ],
    sections: [
      {
        id: 'sec-wipro-1',
        title: 'Section 1: Quantitative & Numerical Ability',
        type: 'quantitative',
        durationMinutes: 20,
        questions: APTITUDE_QUESTION_BANK.filter((q) => q.section === 'quantitative').slice(2, 6),
      },
      {
        id: 'sec-wipro-2',
        title: 'Section 2: Computer Science Concepts',
        type: 'cs_fundamentals',
        durationMinutes: 20,
        questions: CS_QUESTION_BANK.filter((q) => q.section === 'cs_fundamentals').slice(1, 5),
      },
      {
        id: 'sec-wipro-3',
        title: 'Section 3: Coding Round',
        type: 'coding',
        durationMinutes: 25,
        questions: [CODING_ACCENTURE_1, CODING_TCS_NINJA],
      },
    ],
  },

  // 5. COGNIZANT
  {
    id: 'cognizant-genc-mock-1',
    companyId: 'cognizant',
    companyName: 'Cognizant Technology Solutions',
    title: 'Cognizant GenC & GenC Next Selection Drive',
    track: 'GenC & GenC Next',
    tierLabel: 'Campus Drive',
    description:
      'High-yield test assessing Analytical Thinking, Quantitative Acumen, Core CS Concepts (DBMS, OS, OOPs), and Coding.',
    difficulty: 'Intermediate',
    totalDurationMinutes: 65,
    enforceSectionLock: false,
    allowBacktrackingWithinSection: true,
    totalMarks: 50,
    tags: ['GenC ₹4.0 LPA', 'GenC Next ₹7.0 LPA', 'Core CS'],
    cutoffTiers: [
      {
        trackName: 'Cognizant GenC Cleared',
        minOverallPercentage: 62,
        badgeColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/30',
        description: 'Qualifies for GenC Core Developer offer.',
      },
      {
        trackName: 'Cognizant GenC Next Shortlist',
        minOverallPercentage: 80,
        badgeColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30',
        description: 'Selected for GenC Next high-package track (₹6.75 - ₹7.0 LPA).',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Below qualification benchmark.',
      },
    ],
    sections: [
      {
        id: 'sec-cog-1',
        title: 'Section 1: Analytical & Numerical Reasoning',
        type: 'quantitative',
        durationMinutes: 20,
        questions: [
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'quantitative').slice(0, 3),
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'reasoning').slice(0, 2),
        ],
      },
      {
        id: 'sec-cog-2',
        title: 'Section 2: CS Core Engineering',
        type: 'cs_fundamentals',
        durationMinutes: 20,
        questions: [
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_oops'),
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_os'),
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_dbms'),
        ],
      },
      {
        id: 'sec-cog-3',
        title: 'Section 3: Hands-on Coding',
        type: 'coding',
        durationMinutes: 25,
        questions: [CODING_TCS_NINJA, CODING_INFOSYS_1],
      },
    ],
  },

  // 6. Zoho Corporation (Mid-Size Product)
  {
    id: 'zoho-dev-mock-1',
    companyId: 'zoho',
    companyName: 'Zoho Corporation',
    title: 'Zoho Software Developer L1 & L2 Assessment',
    track: 'Software Developer (L1/L2)',
    tierLabel: 'Mid-Size Product Qualifier',
    description:
      'Rigorous Zoho campus recruitment simulation. Evaluates general numerical speed, C/Java output tracing, and standard I/O algorithmic problem solving without built-in libraries.',
    difficulty: 'Intermediate',
    totalDurationMinutes: 80,
    enforceSectionLock: false,
    allowBacktrackingWithinSection: true,
    totalMarks: 60,
    tags: ['Mid-Size IT', 'Zoho L1 ₹6.5 LPA', 'Zoho L2 ₹10 LPA', 'Standard I/O'],
    cutoffTiers: [
      {
        trackName: 'Zoho L1 Cleared',
        minOverallPercentage: 65,
        badgeColor: 'text-red-500 bg-red-500/10 border-red-500/30',
        description: 'Qualifies for Zoho L2 Advanced Programming round (₹6.5 LPA package).',
      },
      {
        trackName: 'Zoho L2 Top Shortlist',
        minOverallPercentage: 82,
        badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
        description: 'Qualifies for Member Technical Staff offer (₹8.4 - ₹10.0 LPA package).',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Below Zoho qualifying standard. Practice loops and pointer arithmetic.',
      },
    ],
    sections: [
      {
        id: 'sec-zoho-1',
        title: 'Section 1: General Aptitude & Number Logic',
        type: 'quantitative',
        durationMinutes: 20,
        questions: APTITUDE_QUESTION_BANK.filter((q) => q.section === 'quantitative').slice(0, 4),
      },
      {
        id: 'sec-zoho-2',
        title: 'Section 2: C / Java Output Tracing & OOPs',
        type: 'cs_fundamentals',
        durationMinutes: 25,
        questions: [
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_oops'),
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_pseudocode'),
        ],
      },
      {
        id: 'sec-zoho-3',
        title: 'Section 3: Standard I/O Coding Challenge',
        type: 'coding',
        durationMinutes: 35,
        questions: [CODING_ZOHO_1, CODING_PERSISTENT_1],
      },
    ],
  },

  // 7. Persistent Systems (Mid-Size Tech)
  {
    id: 'persistent-martian-mock-1',
    companyId: 'persistent',
    companyName: 'Persistent Systems',
    title: 'Persistent Systems Martian Campus Assessment',
    track: 'Martian & Software Engineer',
    tierLabel: 'Mid-Size Tech Qualifier',
    description:
      'Full Persistent drive simulation. Evaluates analytical reasoning, operating systems, DBMS concepts, and standard I/O array algorithms.',
    difficulty: 'Intermediate',
    totalDurationMinutes: 75,
    enforceSectionLock: false,
    allowBacktrackingWithinSection: true,
    totalMarks: 55,
    tags: ['Mid-Size IT', 'Software Engineer ₹5.0 LPA', 'Martian ₹8.5 LPA', 'Core CS'],
    cutoffTiers: [
      {
        trackName: 'Persistent SE Cleared',
        minOverallPercentage: 62,
        badgeColor: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
        description: 'Qualifies for Persistent Software Engineer interview (₹5.0 LPA).',
      },
      {
        trackName: 'Persistent Martian Track',
        minOverallPercentage: 80,
        badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
        description: 'Shortlisted for Elite Martian Track (₹7.5 - ₹9.0 LPA).',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Below qualifying benchmark.',
      },
    ],
    sections: [
      {
        id: 'sec-per-1',
        title: 'Section 1: Quantitative & Reasoning Acumen',
        type: 'quantitative',
        durationMinutes: 20,
        questions: [
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'quantitative').slice(1, 4),
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'reasoning').slice(0, 2),
        ],
      },
      {
        id: 'sec-per-2',
        title: 'Section 2: Computer Science Core & DBMS',
        type: 'cs_fundamentals',
        durationMinutes: 25,
        questions: [
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_os'),
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_dbms'),
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_networks'),
        ],
      },
      {
        id: 'sec-per-3',
        title: 'Section 3: Algorithmic Hands-on Coding',
        type: 'coding',
        durationMinutes: 30,
        questions: [CODING_PERSISTENT_1, CODING_TCS_DIGITAL],
      },
    ],
  },

  // 8. Capgemini (Mid-Size Tech)
  {
    id: 'capgemini-exceller-mock-1',
    companyId: 'capgemini',
    companyName: 'Capgemini',
    title: 'Capgemini Exceller Campus Recruitment Assessment',
    track: 'Analyst & Senior Analyst (A4/A5)',
    tierLabel: 'Pooled Campus Drive',
    description:
      'Realistic Capgemini Exceller drive simulation testing English ability, game-based logical reasoning, technical pseudocode bitwise tracing, and standard I/O coding.',
    difficulty: 'Intermediate',
    totalDurationMinutes: 70,
    enforceSectionLock: false,
    allowBacktrackingWithinSection: true,
    totalMarks: 50,
    tags: ['Mid-Size IT', 'Analyst ₹4.25 LPA', 'Senior Analyst ₹7.0 LPA', 'Exceller Drive'],
    cutoffTiers: [
      {
        trackName: 'Capgemini Analyst Cleared',
        minOverallPercentage: 60,
        badgeColor: 'text-sky-500 bg-sky-500/10 border-sky-500/30',
        description: 'Qualifies for Capgemini Analyst (A4) interview.',
      },
      {
        trackName: 'Capgemini Senior Analyst Shortlist',
        minOverallPercentage: 78,
        badgeColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30',
        description: 'Qualifies for Senior Analyst (A5) high-package role (₹5.75 - ₹7.5 LPA).',
      },
      {
        trackName: 'Needs Practice',
        minOverallPercentage: 0,
        badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
        description: 'Below qualifying benchmark.',
      },
    ],
    sections: [
      {
        id: 'sec-cap-1',
        title: 'Section 1: English & Communication Ability',
        type: 'verbal',
        durationMinutes: 20,
        questions: APTITUDE_QUESTION_BANK.filter((q) => q.section === 'verbal'),
      },
      {
        id: 'sec-cap-2',
        title: 'Section 2: Logical Reasoning & Technical Pseudocode',
        type: 'reasoning',
        durationMinutes: 25,
        questions: [
          ...APTITUDE_QUESTION_BANK.filter((q) => q.section === 'reasoning').slice(0, 3),
          ...CS_QUESTION_BANK.filter((q) => q.subject === 'cs_pseudocode'),
        ],
      },
      {
        id: 'sec-cap-3',
        title: 'Section 3: Hands-on Coding Challenge',
        type: 'coding',
        durationMinutes: 25,
        questions: [CODING_ACCENTURE_1, CODING_TCS_NINJA],
      },
    ],
  },
];
