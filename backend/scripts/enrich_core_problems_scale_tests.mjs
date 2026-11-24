import fs from 'node:fs';
import path from 'node:path';

console.log('=== Enriching Core Problems with High-N Scale Stress Tests ===\n');

const dbPath = path.resolve('backend/data/db.json');
const problemsTsPath = path.resolve('src/data/problems.ts');

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Specific Scale Stress Test Case definitions for key algorithmic problems
const specificScaleTests = {
  'two-sum': [
    {
      caseNumber: 3,
      input: 'nums = [-1, -2, -3, -4, -5], target = -8',
      expected: '[2, 4]',
      isHidden: false,
    },
    {
      caseNumber: 4,
      input: 'nums = [0, 4, 3, 0], target = 0',
      expected: '[0, 3]',
      isHidden: false,
    },
    {
      caseNumber: 5,
      input: `nums = [${Array.from({ length: 20000 }, (_, i) => i + 1).join(', ')}], target = 39999`,
      expected: '[19998, 19999]',
      isHidden: true, // Scale Stress Test (O(N) in 12ms, O(N^2) TLEs at 200M pairs)
    },
  ],
  'valid-parentheses': [
    {
      caseNumber: 3,
      input: 's = "["',
      expected: 'false',
      isHidden: false,
    },
    {
      caseNumber: 4,
      input: 's = "{[()]}"',
      expected: 'true',
      isHidden: false,
    },
    {
      caseNumber: 5,
      input: `s = "${'('.repeat(15000)}${')'.repeat(15000)}"`,
      expected: 'true',
      isHidden: true, // Scale Stress Test (N = 30,000)
    },
  ],
  'longest-substring': [
    {
      caseNumber: 4,
      input: 's = ""',
      expected: '0',
      isHidden: false,
    },
    {
      caseNumber: 5,
      input: 's = "bbbbb"',
      expected: '1',
      isHidden: false,
    },
    {
      caseNumber: 6,
      input: `s = "${'abcdefghijklmnopqrstuvwxyz'.repeat(961)}"`,
      expected: '26',
      isHidden: true, // Scale Stress Test (N = 25,000)
    },
  ],
  'container-water': [
    {
      caseNumber: 3,
      input: 'height = [1, 1]',
      expected: '1',
      isHidden: false,
    },
    {
      caseNumber: 4,
      input: 'height = [4, 3, 2, 1]',
      expected: '4',
      isHidden: false,
    },
    {
      caseNumber: 5,
      input: `height = [10000, ${new Array(19998).fill(1).join(', ')}, 10000]`,
      expected: '199990000',
      isHidden: true, // Scale Stress Test (N = 20,000, O(N^2) TLEs)
    },
  ],
  'climbing-stairs': [
    {
      caseNumber: 3,
      input: 'n = 1',
      expected: '1',
      isHidden: false,
    },
    {
      caseNumber: 4,
      input: 'n = 10',
      expected: '89',
      isHidden: false,
    },
    {
      caseNumber: 5,
      input: 'n = 40',
      expected: '165580141',
      isHidden: true, // Scale Stress Test (O(2^N) recursion branches into 4.3*10^8 calls and TLEs)
    },
  ],
  'maximum-subarray': [
    {
      caseNumber: 3,
      input: 'nums = [-5, -1, -8, -9]',
      expected: '-1',
      isHidden: false,
    },
    {
      caseNumber: 4,
      input: 'nums = [1]',
      expected: '1',
      isHidden: false,
    },
    {
      caseNumber: 5,
      input: `nums = [${new Array(25000).fill(1).join(', ')}]`,
      expected: '25000',
      isHidden: true, // Scale Stress Test (N = 25,000)
    },
  ],
  'move-zeroes': [
    {
      caseNumber: 3,
      input: 'nums = [1, 2, 3]',
      expected: '[1, 2, 3]',
      isHidden: false,
    },
    {
      caseNumber: 4,
      input: 'nums = [0, 0, 0]',
      expected: '[0, 0, 0]',
      isHidden: false,
    },
    {
      caseNumber: 5,
      input: `nums = [${Array.from({ length: 20000 }, (_, i) => (i % 2 === 0 ? 0 : 1)).join(', ')}]`,
      expected: `[${new Array(10000).fill(1).join(', ')}, ${new Array(10000).fill(0).join(', ')}]`,
      isHidden: true, // Scale Stress Test (N = 20,000)
    },
  ],
  'contiguous-array': [
    {
      caseNumber: 3,
      input: `nums = [${new Array(10000).fill(0).concat(new Array(10000).fill(1)).join(', ')}]`,
      expected: '20000',
      isHidden: true, // Scale Stress Test (N = 20,000)
    },
  ],
  'subarray-sums-divisible-by-k': [
    {
      caseNumber: 3,
      input: `nums = [${new Array(20000).fill(5).join(', ')}], k = 5`,
      expected: '200010000',
      isHidden: true, // Scale Stress Test (N = 20,000)
    },
  ],
};

let enrichedCount = 0;

for (const p of db.problems) {
  if (specificScaleTests[p.id]) {
    const existing = p.testCases || [];
    const existingInputs = new Set(existing.map((tc) => tc.input));
    const newTests = specificScaleTests[p.id].filter((t) => !existingInputs.has(t.input));
    
    // Append and renumber
    const combined = [...existing, ...newTests].map((tc, idx) => ({
      ...tc,
      caseNumber: idx + 1,
    }));
    
    p.testCases = combined;
    enrichedCount++;
  }
}

// Write to backend/data/db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`✓ Enriched ${enrichedCount} core algorithmic problems with high-N scale stress tests in ${dbPath}`);

// Also update initialProblems in src/data/problems.ts so frontend matches
const problemsTsContent = `import type { Problem } from '../types';

export const initialProblems: Problem[] = ${JSON.stringify(db.problems, null, 2)};
`;
fs.writeFileSync(problemsTsPath, problemsTsContent, 'utf8');
console.log(`✓ Synchronized high-N scale stress tests to ${problemsTsPath}`);
