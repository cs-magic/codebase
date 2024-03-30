/*
  Warnings:

  - You are about to drop the column `coverId` on the `WechatArticle` table. All the data in the column will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WechatArticle" DROP CONSTRAINT "WechatArticle_coverId_fkey";

-- AlterTable
ALTER TABLE "WechatArticle" DROP COLUMN "coverId",
ADD COLUMN     "cover" JSONB;

-- DropTable
DROP TABLE "Media";

-- DropEnum
DROP TYPE "MediaType";
