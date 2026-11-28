import { z } from 'zod';
import { findCatalogProblem } from './questionCatalog.js';

export const contentSlug = z.string().max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const label = z.string().trim().min(1).max(200);
const text = z.string().trim().min(1).max(6000);
const order = z.number().int().positive().max(10_000);

export const learningPathSchema = z.object({
  id: contentSlug,
  title: label,
  subtitle: label,
  description: text,
  order,
  topics: z.array(label).max(50),
  estimatedHours: label,
  accent: z.enum(['a', 'b', 'c']),
  modules: z.array(z.object({
    id: contentSlug,
    title: label,
    summary: text,
    order,
    concepts: z.array(label).max(50),
    problemIds: z.array(contentSlug).max(100),
    topicTags: z.array(label).max(50),
  }).strict()).min(1).max(100),
}).strict().superRefine(({ modules }, ctx) => {
  const ids = new Set<string>();
  const orders = new Set<number>();
  for (const [index, module] of modules.entries()) {
    if (ids.has(module.id) || orders.has(module.order)) {
      ctx.addIssue({ code: 'custom', path: ['modules', index], message: 'Module IDs and order numbers must be unique.' });
    }
    ids.add(module.id);
    orders.add(module.order);
  }
});

export function ensurePracticeReferences(path: z.infer<typeof learningPathSchema>): void {
  for (const module of path.modules) {
    for (const id of module.problemIds) {
      if (findCatalogProblem(id)?.owner !== 'practice') {
        throw new z.ZodError([{ code: 'custom', path: ['modules', module.id, 'problemIds'], message: `Unknown practice problem: ${id}` }]);
      }
    }
  }
}
