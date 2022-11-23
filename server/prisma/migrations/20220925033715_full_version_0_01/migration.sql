/*
  Warnings:

  - Added the required column `department_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "missingItems" ADD COLUMN     "userMissingItemDrop_id" INTEGER,
ADD COLUMN     "userMissingItemReceived_id" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "department_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "departmentTh" TEXT NOT NULL,
    "departmentEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userMissingItemDrops" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "lineId" TEXT,
    "facebookUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "missingItem_id" INTEGER NOT NULL,

    CONSTRAINT "userMissingItemDrops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userMissingItemReceiveds" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "lineId" TEXT,
    "facebookUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "missingItem_id" INTEGER NOT NULL,

    CONSTRAINT "userMissingItemReceiveds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statusLosingItems" (
    "id" SERIAL NOT NULL,
    "statusTh" TEXT NOT NULL,
    "statusEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "statusLosingItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "losingItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageItem" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "statusLosingItem_id" INTEGER NOT NULL,
    "campus_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_received_id" INTEGER,
    "userDrop_id" INTEGER,

    CONSTRAINT "losingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userLosingItemDrops" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "lineId" TEXT,
    "facebookUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "losingItem_id" INTEGER NOT NULL,

    CONSTRAINT "userLosingItemDrops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messageLosingItems" (
    "id" SERIAL NOT NULL,
    "textMessage" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "losingItem_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messageLosingItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messageLosingItemGuests" (
    "id" SERIAL NOT NULL,
    "textMessage" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "losingItem_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messageLosingItemGuests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_userMissingItemReceived_id_fkey" FOREIGN KEY ("userMissingItemReceived_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_userMissingItemDrop_id_fkey" FOREIGN KEY ("userMissingItemDrop_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userMissingItemDrops" ADD CONSTRAINT "userMissingItemDrops_missingItem_id_fkey" FOREIGN KEY ("missingItem_id") REFERENCES "missingItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userMissingItemReceiveds" ADD CONSTRAINT "userMissingItemReceiveds_missingItem_id_fkey" FOREIGN KEY ("missingItem_id") REFERENCES "missingItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "losingItem" ADD CONSTRAINT "losingItem_statusLosingItem_id_fkey" FOREIGN KEY ("statusLosingItem_id") REFERENCES "statusLosingItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "losingItem" ADD CONSTRAINT "losingItem_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "losingItem" ADD CONSTRAINT "losingItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "losingItem" ADD CONSTRAINT "losingItem_user_received_id_fkey" FOREIGN KEY ("user_received_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "losingItem" ADD CONSTRAINT "losingItem_userDrop_id_fkey" FOREIGN KEY ("userDrop_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLosingItemDrops" ADD CONSTRAINT "userLosingItemDrops_losingItem_id_fkey" FOREIGN KEY ("losingItem_id") REFERENCES "losingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageLosingItems" ADD CONSTRAINT "messageLosingItems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageLosingItems" ADD CONSTRAINT "messageLosingItems_losingItem_id_fkey" FOREIGN KEY ("losingItem_id") REFERENCES "losingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageLosingItemGuests" ADD CONSTRAINT "messageLosingItemGuests_losingItem_id_fkey" FOREIGN KEY ("losingItem_id") REFERENCES "losingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
