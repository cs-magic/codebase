/*
  Warnings:

  - You are about to drop the column `contentSummary` on the `WechatArticle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WechatArticle" DROP COLUMN "contentSummary",
ADD COLUMN     "summary" JSONB;
