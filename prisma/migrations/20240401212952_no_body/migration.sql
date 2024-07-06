/*
  Warnings:

  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bodyPlatformId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `bodyPlatformType` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `CardBody` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `platformId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformType` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_bodyPlatformType_bodyPlatformId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP CONSTRAINT "Card_pkey",
DROP COLUMN "bodyPlatformId",
DROP COLUMN "bodyPlatformType",
DROP COLUMN "user",
ADD COLUMN     "author" JSONB,
ADD COLUMN     "contentMd" TEXT,
ADD COLUMN     "cover" JSONB,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "iFrames" JSONB[],
ADD COLUMN     "images" JSONB[],
ADD COLUMN     "platformData" JSONB,
ADD COLUMN     "platformId" TEXT NOT NULL,
ADD COLUMN     "platformType" "PlatformType" NOT NULL,
ADD COLUMN     "sourceUrl" TEXT,
ADD COLUMN     "stat" JSONB,
ADD COLUMN     "summary" JSONB,
ADD COLUMN     "time" TIMESTAMP(3),
ADD COLUMN     "title" TEXT,
ADD COLUMN     "videos" JSONB[],
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Card_id_seq";

-- DropTable
DROP TABLE "CardBody";

-- CreateIndex
CREATE INDEX "Card_platformType_platformId_idx" ON "Card"("platformType", "platformId");
