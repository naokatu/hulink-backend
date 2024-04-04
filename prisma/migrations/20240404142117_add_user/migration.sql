/*
  Warnings:

  - Added the required column `createdUserId` to the `LinkUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `LinkUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LinkUser" ADD COLUMN     "createdUserId" UUID NOT NULL,
ADD COLUMN     "updatedUserId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdUserId" UUID NOT NULL,
ADD COLUMN     "updatedUserId" UUID NOT NULL;
