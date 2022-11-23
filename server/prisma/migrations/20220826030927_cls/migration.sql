/*
  Warnings:

  - You are about to drop the `prefix` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_prefix_id_fkey";

-- DropTable
DROP TABLE "prefix";

-- CreateTable
CREATE TABLE "prefixs" (
    "id" SERIAL NOT NULL,
    "prefixTh" TEXT NOT NULL,
    "prefixEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prefixs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_prefix_id_fkey" FOREIGN KEY ("prefix_id") REFERENCES "prefixs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
