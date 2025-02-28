/*
  Warnings:

  - You are about to alter the column `name` on the `Friends` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `surname` on the `Friends` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - The `birthdayDate` column on the `Friends` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `department` on the `Friends` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `eventsAttended` on the `Friends` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `email` on the `Friends` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `password` on the `Friends` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Friends" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "surname" SET DATA TYPE VARCHAR(50),
DROP COLUMN "birthdayDate",
ADD COLUMN     "birthdayDate" TIMESTAMP(3),
ALTER COLUMN "profilePhoto" SET DEFAULT 'default.jpg',
ALTER COLUMN "department" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "actionNumber" SET DEFAULT 0,
ALTER COLUMN "eventsAttended" SET DATA TYPE VARCHAR(36)[],
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(100);
