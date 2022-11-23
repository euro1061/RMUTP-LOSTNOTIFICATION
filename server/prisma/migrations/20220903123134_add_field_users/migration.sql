/*
  Warnings:

  - A unique constraint covering the columns `[prefixTh]` on the table `prefixs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stuId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stuId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "facebookUrl" TEXT,
ADD COLUMN     "lineId" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "stuId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "prefixs_prefixTh_key" ON "prefixs"("prefixTh");

-- CreateIndex
CREATE UNIQUE INDEX "users_stuId_key" ON "users"("stuId");
