/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Friends` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Friends" ADD COLUMN     "username" VARCHAR(50) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Friends_username_key" ON "Friends"("username");
