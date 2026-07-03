ALTER TABLE "groups" ADD COLUMN "league" TEXT;
ALTER TABLE "groups" ADD COLUMN "tournament" TEXT;

UPDATE "groups" AS g
SET
  "league" = g."competition",
  "tournament" = COALESCE(
    (
      SELECT m."tournament"
      FROM "matches" AS m
      WHERE m."league" = g."competition"
      ORDER BY (m."status" = 'upcoming') DESC, m."startsAt" ASC
      LIMIT 1
    ),
    g."competition"
  );

ALTER TABLE "groups" ALTER COLUMN "league" SET NOT NULL;
ALTER TABLE "groups" ALTER COLUMN "tournament" SET NOT NULL;
ALTER TABLE "groups" DROP COLUMN "competition";
CREATE INDEX "groups_league_tournament_idx" ON "groups"("league", "tournament");
