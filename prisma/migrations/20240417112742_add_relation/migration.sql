/*
  Warnings:

  - Added the required column `userId` to the `LinkUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LinkUser" ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "LinkUser" ADD CONSTRAINT "LinkUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
