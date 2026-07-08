CREATE TABLE "teams" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "acronym" TEXT,
  "imageUrl" TEXT,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "tournaments" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL
);

ALTER TABLE "matches" ADD COLUMN "tournamentId" TEXT;
INSERT INTO "tournaments" ("id", "name")
SELECT 'legacy-' || md5("tournament"), "tournament" FROM "matches" GROUP BY "tournament";
UPDATE "matches" SET "tournamentId" = 'legacy-' || md5("tournament");
ALTER TABLE "matches" ALTER COLUMN "tournamentId" SET NOT NULL;
ALTER TABLE "matches" ADD CONSTRAINT "matches_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "players" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "nickname" TEXT NOT NULL,
  "firstName" TEXT,
  "lastName" TEXT,
  "role" TEXT,
  "nationality" TEXT,
  "imageUrl" TEXT,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "match_teams" (
  "matchId" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "position" INTEGER NOT NULL,
  PRIMARY KEY ("matchId", "teamId"),
  CONSTRAINT "match_teams_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "match_teams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "match_teams_matchId_position_key" ON "match_teams"("matchId", "position");
CREATE INDEX "match_teams_teamId_idx" ON "match_teams"("teamId");

INSERT INTO "teams" ("id", "name", "acronym", "imageUrl", "updatedAt")
SELECT DISTINCT ON (team->>'id')
  team->>'id', team->>'name', team->>'code', team->>'logoUrl', CURRENT_TIMESTAMP
FROM "matches", jsonb_array_elements("teams") AS team
WHERE team->>'id' IS NOT NULL
ORDER BY team->>'id';

INSERT INTO "match_teams" ("matchId", "teamId", "position")
SELECT match."id", team.value->>'id', (team.ordinality - 1)::INTEGER
FROM "matches" AS match
CROSS JOIN LATERAL jsonb_array_elements(match."teams") WITH ORDINALITY AS team(value, ordinality)
WHERE team.value->>'id' IS NOT NULL;

CREATE TABLE "rosters" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "teamId" TEXT NOT NULL,
  "tournamentId" TEXT,
  "source" TEXT NOT NULL,
  "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "rosters_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "rosters_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "rosters_teamId_tournamentId_key" ON "rosters"("teamId", "tournamentId");
CREATE INDEX "rosters_teamId_fetchedAt_idx" ON "rosters"("teamId", "fetchedAt");

CREATE TABLE "roster_memberships" (
  "rosterId" TEXT NOT NULL,
  "playerId" TEXT NOT NULL,
  "substitute" BOOLEAN,
  PRIMARY KEY ("rosterId", "playerId"),
  CONSTRAINT "roster_memberships_rosterId_fkey" FOREIGN KEY ("rosterId") REFERENCES "rosters"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "roster_memberships_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "roster_memberships_playerId_idx" ON "roster_memberships"("playerId");
