CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "league" TEXT NOT NULL,
    "tournament" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "format" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "teams" JSONB NOT NULL,
    "winnerId" TEXT,
    "scoreA" INTEGER,
    "scoreB" INTEGER,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "matches_status_startsAt_idx" ON "matches"("status", "startsAt");
