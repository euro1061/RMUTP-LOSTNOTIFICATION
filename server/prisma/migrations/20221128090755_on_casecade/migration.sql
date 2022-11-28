-- DropForeignKey
ALTER TABLE "userMissingItemDrops" DROP CONSTRAINT "userMissingItemDrops_missingItem_id_fkey";

-- AddForeignKey
ALTER TABLE "userMissingItemDrops" ADD CONSTRAINT "userMissingItemDrops_missingItem_id_fkey" FOREIGN KEY ("missingItem_id") REFERENCES "missingItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
