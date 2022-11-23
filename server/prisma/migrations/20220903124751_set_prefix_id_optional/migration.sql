-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_prefix_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "prefix_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_prefix_id_fkey" FOREIGN KEY ("prefix_id") REFERENCES "prefixs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
