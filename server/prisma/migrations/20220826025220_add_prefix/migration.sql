/*
  Warnings:

  - Added the required column `prefix_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "prefix_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "prefix" (
    "id" SERIAL NOT NULL,
    "prefixTh" TEXT NOT NULL,
    "prefixEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prefix_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_prefix_id_fkey" FOREIGN KEY ("prefix_id") REFERENCES "prefix"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
