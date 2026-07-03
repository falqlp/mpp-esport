CREATE TABLE "groups" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "competition" TEXT NOT NULL,
  "isPublic" BOOLEAN NOT NULL DEFAULT false,
  "invitationCode" TEXT NOT NULL,
  "ownerId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "group_memberships" (
  "groupId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "group_memberships_pkey" PRIMARY KEY ("groupId", "userId")
);

CREATE UNIQUE INDEX "groups_invitationCode_key" ON "groups"("invitationCode");
CREATE INDEX "groups_isPublic_name_idx" ON "groups"("isPublic", "name");
CREATE INDEX "groups_ownerId_idx" ON "groups"("ownerId");
CREATE INDEX "group_memberships_userId_idx" ON "group_memberships"("userId");
ALTER TABLE "groups" ADD CONSTRAINT "groups_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "group_memberships" ADD CONSTRAINT "group_memberships_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "group_memberships" ADD CONSTRAINT "group_memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
