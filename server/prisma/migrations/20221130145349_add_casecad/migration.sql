-- DropForeignKey
ALTER TABLE "missingItems" DROP CONSTRAINT "missingItems_userMissingItemDrop_id_fkey";

-- DropForeignKey
ALTER TABLE "missingItems" DROP CONSTRAINT "missingItems_userMissingItemReceived_id_fkey";

-- DropForeignKey
ALTER TABLE "missingItems" DROP CONSTRAINT "missingItems_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_department_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_prefix_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_prefix_id_fkey" FOREIGN KEY ("prefix_id") REFERENCES "prefixs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_userMissingItemReceived_id_fkey" FOREIGN KEY ("userMissingItemReceived_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_userMissingItemDrop_id_fkey" FOREIGN KEY ("userMissingItemDrop_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
