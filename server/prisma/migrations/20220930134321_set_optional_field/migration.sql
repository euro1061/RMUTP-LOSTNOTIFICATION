-- DropForeignKey
ALTER TABLE "missingItems" DROP CONSTRAINT "missingItems_building_id_fkey";

-- DropForeignKey
ALTER TABLE "missingItems" DROP CONSTRAINT "missingItems_room_id_fkey";

-- AlterTable
ALTER TABLE "missingItems" ALTER COLUMN "building_id" DROP NOT NULL,
ALTER COLUMN "room_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
