import fs from 'node:fs';

const normal = JSON.parse(fs.readFileSync('backend/data/all_normal_problems_list.json', 'utf8'));

console.log(`Analyzing ${normal.length} normal problems...`);

const normalTitleMap = new Map();
const normalizedTitleSet = new Set();
const normalSlugSet = new Set();

for (const p of normal) {
  const cleanTitle = p.title.trim().toLowerCase();
  const slug = p.id.trim().toLowerCase();
  const stripped = cleanTitle.replace(/[^a-z0-9]/g, '');

  normalTitleMap.set(cleanTitle, p);
  normalizedTitleSet.add(stripped);
  normalSlugSet.add(slug);
}

fs.writeFileSync(
  'backend/data/normal_problem_keys.json',
  JSON.stringify({
    count: normal.length,
    normalizedTitles: Array.from(normalizedTitleSet),
    slugs: Array.from(normalSlugSet),
    rawTitles: normal.map((p) => p.title),
  }, null, 2)
);

console.log('Saved exclusion sets to backend/data/normal_problem_keys.json');
