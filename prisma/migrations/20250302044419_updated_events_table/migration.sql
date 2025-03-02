/*
  Warnings:

  - You are about to drop the column `creatorName` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "creatorName",
ADD COLUMN     "creatorId" TEXT NOT NULL DEFAULT '';
