UPDATE "users"
SET "favoriteCompetitions" = array_append("favoriteCompetitions", 'EWC')
WHERE NOT ('EWC' = ANY("favoriteCompetitions"));

ALTER TABLE "users"
ALTER COLUMN "favoriteCompetitions" SET DEFAULT ARRAY['EWC']::TEXT[];
