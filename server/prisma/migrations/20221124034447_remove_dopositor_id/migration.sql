/*
  Warnings:

  - You are about to drop the column `depositor_id` on the `missingItems` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "missingItems" DROP CONSTRAINT "missingItems_depositor_id_fkey";

-- AlterTable
ALTER TABLE "missingItems" DROP COLUMN "depositor_id";
