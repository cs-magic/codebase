/*
  Warnings:

  - You are about to drop the column `bodyId` on the `Card` table. All the data in the column will be lost.
  - The primary key for the `CardBody` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CardBody` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_bodyId_fkey";

-- DropIndex
DROP INDEX "CardBody_platformType_platformId_idx";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "bodyId",
ADD COLUMN     "bodyPlatformId" TEXT,
ADD COLUMN     "bodyPlatformType" "PlatformType";

-- AlterTable
ALTER TABLE "CardBody" DROP CONSTRAINT "CardBody_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CardBody_pkey" PRIMARY KEY ("platformType", "platformId");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_bodyPlatformType_bodyPlatformId_fkey" FOREIGN KEY ("bodyPlatformType", "bodyPlatformId") REFERENCES "CardBody"("platformType", "platformId") ON DELETE SET NULL ON UPDATE CASCADE;
