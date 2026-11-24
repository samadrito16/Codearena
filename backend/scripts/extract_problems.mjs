import fs from 'node:fs';

const dbData = JSON.parse(fs.readFileSync('backend/data/db.json', 'utf8'));
const dbProblems = dbData.problems || [];

console.log(`Loaded ${dbProblems.length} problems from backend/data/db.json`);

const normalProblems = dbProblems.map((p) => ({
  id: p.id,
  title: p.title.trim(),
  normalizedTitle: p.title.trim().toLowerCase(),
  difficulty: p.difficulty,
  topics: p.topics || [],
}));

fs.writeFileSync('backend/data/all_normal_problems_list.json', JSON.stringify(normalProblems, null, 2));

console.log(`Saved ${normalProblems.length} normal problems to backend/data/all_normal_problems_list.json`);
