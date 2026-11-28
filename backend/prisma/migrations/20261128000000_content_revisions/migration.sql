CREATE TABLE "ContentEntry" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "revision" INTEGER NOT NULL,
    "publishedRevision" INTEGER,
    "order" INTEGER,
    CONSTRAINT "ContentEntry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ContentRevision" (
    "entryId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "body" JSONB NOT NULL,
    "actor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContentRevision_pkey" PRIMARY KEY ("entryId", "number")
);

CREATE TABLE "ContentEvent" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "revision" INTEGER NOT NULL,
    "actor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContentEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ContentEntry_kind_order_idx" ON "ContentEntry"("kind", "order");
CREATE UNIQUE INDEX "ContentEntry_kind_slug_key" ON "ContentEntry"("kind", "slug");
CREATE INDEX "ContentEvent_entryId_createdAt_idx" ON "ContentEvent"("entryId", "createdAt");

ALTER TABLE "ContentRevision" ADD CONSTRAINT "ContentRevision_entryId_fkey"
  FOREIGN KEY ("entryId") REFERENCES "ContentEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ContentEvent" ADD CONSTRAINT "ContentEvent_entryId_fkey"
  FOREIGN KEY ("entryId") REFERENCES "ContentEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
