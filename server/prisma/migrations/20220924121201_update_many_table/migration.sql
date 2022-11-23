-- CreateTable
CREATE TABLE "campus" (
    "id" SERIAL NOT NULL,
    "campusTh" TEXT NOT NULL,
    "campusEn" TEXT,
    "descriptionCampus" TEXT,
    "imageCampus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buildings" (
    "id" SERIAL NOT NULL,
    "buildingTh" TEXT NOT NULL,
    "buildingEn" TEXT,
    "descriptionBuilding" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "campus_id" INTEGER NOT NULL,

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "roomTh" TEXT NOT NULL,
    "roomEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "building_id" INTEGER NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statusMissingItems" (
    "id" SERIAL NOT NULL,
    "statusTh" TEXT NOT NULL,
    "statusEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "statusMissingItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "missingItems" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageItem" TEXT NOT NULL,
    "buildingOther" TEXT,
    "roomOther" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "statusMissing_id" INTEGER NOT NULL,
    "campus_id" INTEGER NOT NULL,

    CONSTRAINT "missingItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messageMissingItems" (
    "id" SERIAL NOT NULL,
    "textMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "missingItem_id" INTEGER NOT NULL,

    CONSTRAINT "messageMissingItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messageMissingItemGuests" (
    "id" SERIAL NOT NULL,
    "textMessage" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "missingItem_id" INTEGER NOT NULL,

    CONSTRAINT "messageMissingItemGuests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "campus_campusTh_key" ON "campus"("campusTh");

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_statusMissing_id_fkey" FOREIGN KEY ("statusMissing_id") REFERENCES "statusMissingItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missingItems" ADD CONSTRAINT "missingItems_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageMissingItems" ADD CONSTRAINT "messageMissingItems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageMissingItems" ADD CONSTRAINT "messageMissingItems_missingItem_id_fkey" FOREIGN KEY ("missingItem_id") REFERENCES "missingItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageMissingItemGuests" ADD CONSTRAINT "messageMissingItemGuests_missingItem_id_fkey" FOREIGN KEY ("missingItem_id") REFERENCES "missingItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
