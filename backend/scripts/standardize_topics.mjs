import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CANONICAL_TOPIC_MAP = {
  'Arrays': 'Array',
  'Graphs': 'Graph',
  'Strings': 'String',
  'Trees': 'Tree',
  'Breadth-First Search': 'BFS',
  'Depth-First Search': 'DFS',
};

function canonicalizeTopic(topic) {
  if (!topic || typeof topic !== 'string') return topic;
  const trimmed = topic.trim();
  if (CANONICAL_TOPIC_MAP[trimmed]) {
    return CANONICAL_TOPIC_MAP[trimmed];
  }
  const lower = trimmed.toLowerCase();
  for (const [k, v] of Object.entries(CANONICAL_TOPIC_MAP)) {
    if (k.toLowerCase() === lower) {
      return v;
    }
  }
  return trimmed;
}

function normalizeTopics(topics) {
  if (!Array.isArray(topics)) return [];
  const normalized = topics.map(canonicalizeTopic);
  return Array.from(new Set(normalized));
}

// 1. Update backend/data/db.json
const dbPath = path.resolve(__dirname, '../data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
let dbUpdatedCount = 0;
for (const p of db.problems) {
  const orig = JSON.stringify(p.topics);
  p.topics = normalizeTopics(p.topics);
  if (JSON.stringify(p.topics) !== orig) {
    dbUpdatedCount++;
  }
}
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2) + '\n');
console.log(`[1] Updated ${dbUpdatedCount} problems in backend/data/db.json`);

// 2. Update backend/data/all_normal_problems_list.json if it exists
const normalPath = path.resolve(__dirname, '../data/all_normal_problems_list.json');
if (fs.existsSync(normalPath)) {
  const normalProblems = JSON.parse(fs.readFileSync(normalPath, 'utf-8'));
  let normalCount = 0;
  for (const p of normalProblems) {
    const orig = JSON.stringify(p.topics);
    p.topics = normalizeTopics(p.topics);
    if (JSON.stringify(p.topics) !== orig) {
      normalCount++;
    }
  }
  fs.writeFileSync(normalPath, JSON.stringify(normalProblems, null, 2) + '\n');
  console.log(`[2] Updated ${normalCount} problems in backend/data/all_normal_problems_list.json`);
}

// 3. Write backend/src/db/seeds.ts
const seedsPath = path.resolve(__dirname, '../src/db/seeds.ts');
const seedsContent = `import type { Problem } from '../types/index.js';\n\nexport const initialProblems: Problem[] = ${JSON.stringify(db.problems, null, 2)};\n`;
fs.writeFileSync(seedsPath, seedsContent, 'utf-8');
console.log(`[3] Updated backend/src/db/seeds.ts with all ${db.problems.length} canonicalized problems`);

// 4. Write src/data/problems.ts
const frontendProblemsPath = path.resolve(__dirname, '../../src/data/problems.ts');
const frontendContent = `import type { Problem } from '../types';\n\nexport const initialProblems: Problem[] = ${JSON.stringify(db.problems, null, 2)};\n\nexport const problems: Problem[] = initialProblems;\n\nexport function getProblemById(id: string): Problem | undefined {\n  return problems.find((p) => p.id === id);\n}\n\nexport function getProblemBySlug(slug: string): Problem | undefined {\n  return problems.find((p) => p.id === slug);\n}\n`;
fs.writeFileSync(frontendProblemsPath, frontendContent, 'utf-8');
console.log(`[4] Updated src/data/problems.ts with all ${db.problems.length} canonicalized problems`);

// 5. Verification
const verifyTopicCounts = {};
for (const p of db.problems) {
  for (const t of p.topics) {
    verifyTopicCounts[t] = (verifyTopicCounts[t] || 0) + 1;
  }
}
console.log('\n--- VERIFICATION STATS ---');
console.log('Graph count:', verifyTopicCounts['Graph'], '(should be 53)');
console.log('Array count:', verifyTopicCounts['Array'], '(should be 118)');
console.log('String count:', verifyTopicCounts['String'], '(should be 94)');
console.log('Tree count:', verifyTopicCounts['Tree'], '(should be 14)');
console.log('BFS count:', verifyTopicCounts['BFS'], '(should be 40)');
console.log('Arrays count:', verifyTopicCounts['Arrays'] || 0, '(should be 0)');
console.log('Graphs count:', verifyTopicCounts['Graphs'] || 0, '(should be 0)');
console.log('Strings count:', verifyTopicCounts['Strings'] || 0, '(should be 0)');
console.log('Trees count:', verifyTopicCounts['Trees'] || 0, '(should be 0)');
console.log('Breadth-First Search count:', verifyTopicCounts['Breadth-First Search'] || 0, '(should be 0)');
