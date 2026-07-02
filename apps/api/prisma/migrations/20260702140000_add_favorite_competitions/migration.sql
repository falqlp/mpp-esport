ALTER TABLE "users"
ADD COLUMN "favoriteCompetitions" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
