/*
  Warnings:

  - The values [wechatArticle,xiaohongshuNote] on the enum `PlatformType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlatformType_new" AS ENUM ('wxmpArticle', 'bilibiliVideo', 'xhsNote');
ALTER TABLE "Card" ALTER COLUMN "platformType" TYPE "PlatformType_new" USING ("platformType"::text::"PlatformType_new");
ALTER TYPE "PlatformType" RENAME TO "PlatformType_old";
ALTER TYPE "PlatformType_new" RENAME TO "PlatformType";
DROP TYPE "PlatformType_old";
COMMIT;
