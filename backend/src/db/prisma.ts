import { PrismaClient } from '@prisma/client';
import '../config.js';

let client: PrismaClient | undefined;

export function contentDatabase(): PrismaClient | undefined {
  if (!process.env.DATABASE_URL) return;
  client ??= new PrismaClient();
  return client;
}
