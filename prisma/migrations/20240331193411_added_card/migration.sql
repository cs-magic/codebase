/*
  Warnings:

  - You are about to drop the column `contentHtml` on the `WechatArticle` table. All the data in the column will be lost.
  - You are about to drop the column `platformUserId` on the `WechatArticle` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `WechatArticle` table. All the data in the column will be lost.
  - You are about to drop the column `summaryContent` on the `WechatArticle` table. All the data in the column will be lost.
  - You are about to drop the `PlatformUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WechatArticle" DROP CONSTRAINT "WechatArticle_platformUserId_fkey";

-- AlterTable
ALTER TABLE "WechatArticle" DROP COLUMN "contentHtml",
DROP COLUMN "platformUserId",
DROP COLUMN "source",
DROP COLUMN "summaryContent";

-- DropTable
DROP TABLE "PlatformUser";

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "wechatArticleId" TEXT,
    "user" JSONB,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_wechatArticleId_fkey" FOREIGN KEY ("wechatArticleId") REFERENCES "WechatArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
