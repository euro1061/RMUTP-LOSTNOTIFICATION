/*
  Warnings:

  - Added the required column `email` to the `userMissingItemDrops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userMissingItemDrops" ADD COLUMN     "email" TEXT NOT NULL;
