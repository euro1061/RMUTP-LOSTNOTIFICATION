-- DropForeignKey
ALTER TABLE "userMissingItemReceiveds" DROP CONSTRAINT "userMissingItemReceiveds_missingItem_id_fkey";

-- AlterTable
ALTER TABLE "userMissingItemReceiveds" ADD COLUMN     "email" TEXT,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "userMissingItemReceiveds" ADD CONSTRAINT "userMissingItemReceiveds_missingItem_id_fkey" FOREIGN KEY ("missingItem_id") REFERENCES "missingItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
