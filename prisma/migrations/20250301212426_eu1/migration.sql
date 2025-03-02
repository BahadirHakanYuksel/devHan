/*
  Warnings:

  - The `category` column on the `Events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `Events` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "category",
ADD COLUMN     "category" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Events_id_key" ON "Events"("id");
