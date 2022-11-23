/*
  Warnings:

  - Added the required column `building_id` to the `losingItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `losingItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `building_id` to the `missingItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `missingItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "losingItem" ADD COLUMN     "building_id" INTEGER NOT NULL,
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "missingItems" ADD COLUMN     "building_id" INTEGER NOT NULL,
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "losingItem" ADD CONSTRAINT "losingItem_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "losingItem" ADD CONSTRAINT "losingItem_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
