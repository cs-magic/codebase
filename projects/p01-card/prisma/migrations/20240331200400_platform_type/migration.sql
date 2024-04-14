/*
  Warnings:

  - You are about to drop the column `platform` on the `CardBody` table. All the data in the column will be lost.
  - Added the required column `platformId` to the `CardBody` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformType` to the `CardBody` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('wechatArticle', 'bilibiliVideo', 'xiaohongshuNote');

-- AlterTable
ALTER TABLE "CardBody" DROP COLUMN "platform",
ADD COLUMN     "platformData" JSONB,
ADD COLUMN     "platformId" TEXT NOT NULL,
ADD COLUMN     "platformType" "PlatformType" NOT NULL;

-- CreateIndex
CREATE INDEX "CardBody_platformType_platformId_idx" ON "CardBody"("platformType", "platformId");
