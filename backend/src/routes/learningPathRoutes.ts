import { Router } from 'express';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { contentDatabase } from '../db/prisma.js';
import { contentSlug, ensurePracticeReferences, learningPathSchema } from '../data/learningPathSchema.js';
import { requireRole } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

export const learningPathRouter = Router();
export const adminLearningPathRouter = Router();
const kind = 'learning-path';
const selector = (slug: string) => ({ kind_slug: { kind, slug } });
const requireDatabase = () => {
  const database = contentDatabase();
  if (!database) throw new AppError('Configure PostgreSQL to manage learning paths.', 503, 'CONTENT_UNAVAILABLE');
  return database;
};

learningPathRouter.get('/', async (_req, res, next) => {
  try {
    // Transitional development mode while the cloud database is being prepared.
    const database = contentDatabase();
    if (!database) return res.status(503).json({ error: { code: 'CONTENT_UNCONFIGURED', message: 'PostgreSQL is not configured.' } });
    const rows = await database.$queryRaw<{ body: Prisma.JsonValue }[]>`
      SELECT revision.body FROM "ContentEntry" AS entry
      JOIN "ContentRevision" AS revision
        ON revision."entryId" = entry.id AND revision.number = entry."publishedRevision"
      WHERE entry.kind = ${kind}
      ORDER BY entry."order", entry.slug
    `;
    res.json(rows.map(row => row.body));
  } catch (error) {
    next(error);
  }
});

adminLearningPathRouter.use(requireRole('admin'));
adminLearningPathRouter.get('/', async (_req, res, next) => {
  try {
    const entries = await requireDatabase().contentEntry.findMany({
      where: { kind },
      orderBy: { slug: 'asc' },
      include: { revisions: { orderBy: { number: 'desc' }, take: 1, select: { body: true } } },
    });
    res.json(entries.map(({ revisions, ...entry }) => ({ ...entry, draft: revisions[0]?.body })));
  } catch (error) {
    next(error);
  }
});

adminLearningPathRouter.get('/:slug/history', async (req, res, next) => {
  try {
    const entry = await requireDatabase().contentEntry.findUnique({
      where: selector(contentSlug.parse(req.params.slug)),
      select: { events: { orderBy: { createdAt: 'desc' }, take: 50 }, revisions: { orderBy: { number: 'desc' }, take: 50 } },
    });
    if (!entry) throw new AppError('Learning path not found.', 404, 'NOT_FOUND');
    res.json(entry);
  } catch (error) {
    next(error);
  }
});

const operation = z.discriminatedUnion('action', [
  z.object({ action: z.literal('save'), expectedVersion: z.number().int().nonnegative(), body: learningPathSchema }),
  z.object({ action: z.literal('publish'), expectedVersion: z.number().int().positive() }),
  z.object({ action: z.literal('archive'), expectedVersion: z.number().int().positive() }),
  z.object({ action: z.literal('restore'), expectedVersion: z.number().int().positive(), revision: z.number().int().positive() }),
]);

adminLearningPathRouter.post('/:slug', async (req, res, next) => {
  const conflict = () => new AppError('This learning path changed. Reload it before saving again.', 409, 'CONTENT_CONFLICT');

  try {
    const slug = contentSlug.parse(req.params.slug);
    const change = operation.parse(req.body);
    const actor = req.user!.id;
    if (change.action === 'save' && change.body.id !== slug) {
      throw new AppError('An existing learning path ID cannot be renamed.', 400, 'INVALID_CONTENT_ID');
    }

    await requireDatabase().$transaction(async (tx) => {
      if (change.action === 'save' && change.expectedVersion === 0) {
        await tx.contentEntry.create({
          data: { kind, slug, revision: 1, revisions: { create: { number: 1, body: change.body, actor } },
            events: { create: { action: 'save', revision: 1, actor } } },
        });
        return;
      }

      const entry = await tx.contentEntry.findUnique({ where: selector(slug) });
      if (!entry) throw new AppError('Learning path not found.', 404, 'NOT_FOUND');
      if (entry.version !== change.expectedVersion) throw conflict();
      const locked = await tx.contentEntry.updateMany({
        where: { id: entry.id, version: change.expectedVersion },
        data: { version: { increment: 1 } },
      });
      if (locked.count !== 1) throw conflict();

      const revision = entry.revision;
      if (change.action === 'save' || change.action === 'restore') {
        const body = change.action === 'save' ? change.body : (await tx.contentRevision.findUnique({
          where: { entryId_number: { entryId: entry.id, number: change.revision } },
        }))?.body;
        if (!body) throw new AppError('Revision not found.', 404, 'NOT_FOUND');
        const nextRevision = revision + 1;
        await tx.contentRevision.create({ data: { entryId: entry.id, number: nextRevision, body, actor } });
        await tx.contentEntry.update({ where: { id: entry.id }, data: { revision: nextRevision } });
        await tx.contentEvent.create({ data: { entryId: entry.id, action: change.action, revision: nextRevision, actor } });
        return;
      }

      if (change.action === 'publish') {
        const draft = await tx.contentRevision.findUniqueOrThrow({
          where: { entryId_number: { entryId: entry.id, number: revision } },
        });
        const path = learningPathSchema.parse(draft.body);
        ensurePracticeReferences(path);
        await tx.contentEntry.update({ where: { id: entry.id }, data: { publishedRevision: revision, order: path.order } });
      } else {
        await tx.contentEntry.update({ where: { id: entry.id }, data: { publishedRevision: null, order: null } });
      }
      await tx.contentEvent.create({ data: {
        entryId: entry.id,
        action: change.action,
        revision: change.action === 'archive' ? entry.publishedRevision ?? revision : revision,
        actor,
      } });
    });

    res.status(204).end();
  } catch (error) {
    const uniqueViolation = error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
    next(uniqueViolation ? conflict() : error);
  }
});
