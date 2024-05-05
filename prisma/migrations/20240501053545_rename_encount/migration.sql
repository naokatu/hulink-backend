/*
  Warnings:

  - You are about to drop the column `encount` on the `LinkUser` table. All the data in the column will be lost.
  - Added the required column `weight` to the `LinkUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LinkUser" DROP COLUMN "encount",
ADD COLUMN     "weight" INTEGER NOT NULL;
