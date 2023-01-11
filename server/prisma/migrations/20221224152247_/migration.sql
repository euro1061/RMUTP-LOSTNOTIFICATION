-- DropForeignKey
ALTER TABLE "userLosingItemDrops" DROP CONSTRAINT "userLosingItemDrops_losingItem_id_fkey";

-- AddForeignKey
ALTER TABLE "userLosingItemDrops" ADD CONSTRAINT "userLosingItemDrops_losingItem_id_fkey" FOREIGN KEY ("losingItem_id") REFERENCES "losingItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
