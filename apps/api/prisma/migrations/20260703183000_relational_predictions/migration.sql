ALTER TABLE "predictions" ADD COLUMN "userId" TEXT;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "predictions" p
    WHERE (SELECT COUNT(*) FROM "users" u WHERE u."displayName" = p."playerName") <> 1
  ) THEN
    RAISE EXCEPTION 'Each existing prediction must match exactly one user by displayName';
  END IF;
END $$;

UPDATE "predictions" p
SET "userId" = (
  SELECT u."id"
  FROM "users" u
  WHERE u."displayName" = p."playerName"
  LIMIT 1
);

DROP INDEX "predictions_playerName_idx";
DROP INDEX "predictions_matchId_playerName_key";
ALTER TABLE "predictions" ALTER COLUMN "userId" SET NOT NULL;
ALTER TABLE "predictions" DROP COLUMN "playerName";

CREATE INDEX "predictions_userId_idx" ON "predictions"("userId");
CREATE UNIQUE INDEX "predictions_matchId_userId_key" ON "predictions"("matchId", "userId");

ALTER TABLE "predictions"
ADD CONSTRAINT "predictions_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "predictions"
ADD CONSTRAINT "predictions_matchId_fkey"
FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
