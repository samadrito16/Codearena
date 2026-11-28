import { learningPaths } from '../../src/data/learningPaths.js';
import { contentDatabase } from '../src/db/prisma.js';
import { ensurePracticeReferences, learningPathSchema } from '../src/data/learningPathSchema.js';

const paths = learningPaths.map(candidate => {
  const path = learningPathSchema.parse(candidate);
  ensurePracticeReferences(path);
  return path;
});

async function seed() {
  const database = contentDatabase();
  if (!database) throw new Error('Set DATABASE_URL before importing learning paths.');

  try {
    const inserted = await database.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT 1 FROM (SELECT pg_advisory_xact_lock(673832120)) AS seed_lock`;
      let count = 0;
      for (const path of paths) {
        const existing = await tx.contentEntry.findUnique({
          where: { kind_slug: { kind: 'learning-path', slug: path.id } },
        });
        if (existing) continue;
        await tx.contentEntry.create({
          data: {
            kind: 'learning-path', slug: path.id, order: path.order,
            revision: 1, publishedRevision: 1,
            revisions: { create: { number: 1, body: path } },
          },
        });
        count++;
      }
      return count;
    }, { timeout: 30_000 });
    console.log(`Imported ${inserted} learning paths. Skipped ${paths.length - inserted} existing entries.`);
  } finally {
    await database.$disconnect();
  }
}

if (process.argv.includes('--check')) console.log(`Validated ${paths.length} learning paths and their practice references.`);
else await seed();
