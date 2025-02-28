/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Friends` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Friends` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Events" ALTER COLUMN "description" SET DEFAULT 'Lafı uzatmaya gerek yok, katılın ve eğlenin!',
ALTER COLUMN "googleMapsLink" SET DEFAULT '',
ALTER COLUMN "eventImg" SET DEFAULT '',
ALTER COLUMN "participants" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "reactions" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Friends" ALTER COLUMN "profilePhoto" SET DEFAULT '',
ALTER COLUMN "actionNumber" SET DEFAULT 0,
ALTER COLUMN "eventsAttended" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "email" DROP DEFAULT,
ALTER COLUMN "password" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Friends_id_key" ON "Friends"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Friends_email_key" ON "Friends"("email");
