import fs from 'node:fs';

const normal = JSON.parse(fs.readFileSync('backend/data/all_normal_problems_list.json', 'utf8'));
const mastery = JSON.parse(fs.readFileSync('data/mastery/prism_code_first_25_problems.json', 'utf8'));

console.log('--- Deep semantic and title check between current Mastery and Normal Problems ---');

for (const p of mastery.problems) {
  const words = p.title
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3 && !['with', 'from', 'into', 'array', 'string', 'sorted'].includes(w));

  const similar = normal.filter((np) => {
    const npLower = np.title.toLowerCase();
    if (npLower === p.title.toLowerCase()) return true;
    const matchCount = words.filter((w) => npLower.includes(w)).length;
    return matchCount >= 2;
  });

  if (similar.length > 0) {
    console.log(`Mastery [${p.id}] "${p.title}" matches or is close to:`, similar.map((s) => s.title));
  }
}
