import fs from 'node:fs';

const normal = JSON.parse(fs.readFileSync('backend/data/all_normal_problems_list.json', 'utf8'));
const normalTitles = new Set(normal.map((p) => p.title.toLowerCase().replace(/[^a-z0-9]/g, '')));

const mastery = JSON.parse(fs.readFileSync('data/mastery/prism_code_first_25_problems.json', 'utf8'));

console.log('Comparing 25 Mastery problems against 408 Normal problems:');

const overlaps = [];

for (const p of mastery.problems) {
  const normKey = p.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const matched = normal.find((np) => {
    const npKey = np.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    return npKey === normKey || npKey.includes(normKey) || normKey.includes(npKey);
  });
  if (matched) {
    overlaps.push({
      masteryId: p.id,
      masteryTitle: p.title,
      normalId: matched.id,
      normalTitle: matched.title,
    });
  }
}

console.log(`Found ${overlaps.length} exact or sub-string overlaps:`);
for (const o of overlaps) {
  console.log(`  Mastery: "${o.masteryTitle}" (${o.masteryId}) <--> Normal: "${o.normalTitle}" (${o.normalId})`);
}
