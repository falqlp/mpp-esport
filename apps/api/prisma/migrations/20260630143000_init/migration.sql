CREATE TABLE "predictions" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "winnerId" TEXT NOT NULL,
    "scoreA" INTEGER NOT NULL,
    "scoreB" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "predictions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "predictions_matchId_playerName_key" ON "predictions"("matchId", "playerName");
CREATE INDEX "predictions_playerName_idx" ON "predictions"("playerName");
