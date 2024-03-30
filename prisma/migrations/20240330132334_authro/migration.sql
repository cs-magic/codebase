/*
  Warnings:

  - The `author` column on the `WechatArticle` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "WechatArticle" DROP COLUMN "author",
ADD COLUMN     "author" JSONB;
