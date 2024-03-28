/*
  Warnings:

  - Added the required column `encount` to the `LinkUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `LinkUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `LinkUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LinkUser" ADD COLUMN     "encount" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL;
