/*
  Warnings:

  - Added the required column `depositor_id` to the `missingItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "missingItems" ADD COLUMN     "depositor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_depositor_id_fkey" FOREIGN KEY ("depositor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
