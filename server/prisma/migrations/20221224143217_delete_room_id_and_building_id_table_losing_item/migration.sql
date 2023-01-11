/*
  Warnings:

  - You are about to drop the column `building_id` on the `losingItem` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `losingItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "losingItem" DROP CONSTRAINT "losingItem_building_id_fkey";

-- DropForeignKey
ALTER TABLE "losingItem" DROP CONSTRAINT "losingItem_room_id_fkey";

-- AlterTable
ALTER TABLE "losingItem" DROP COLUMN "building_id",
DROP COLUMN "room_id";
