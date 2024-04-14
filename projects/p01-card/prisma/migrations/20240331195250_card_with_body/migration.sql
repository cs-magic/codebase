/*
  Warnings:

  - You are about to drop the column `wechatArticleId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `WechatArticle` table. All the data in the column will be lost.
  - Added the required column `platform` to the `WechatArticle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_wechatArticleId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "wechatArticleId",
ADD COLUMN     "bodyId" TEXT;

-- AlterTable
ALTER TABLE "WechatArticle" DROP COLUMN "comments",
ADD COLUMN     "platform" JSONB NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_bodyId_fkey" FOREIGN KEY ("bodyId") REFERENCES "WechatArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
