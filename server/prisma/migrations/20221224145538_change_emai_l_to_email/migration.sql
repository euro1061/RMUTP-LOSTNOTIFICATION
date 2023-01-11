/*
  Warnings:

  - You are about to drop the column `emaiL` on the `userLosingItemDrops` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userLosingItemDrops" DROP COLUMN "emaiL",
ADD COLUMN     "email" TEXT;
