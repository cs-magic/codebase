-- AlterTable
ALTER TABLE "WechatArticle" ADD COLUMN     "iFrames" JSONB[],
ADD COLUMN     "images" JSONB[],
ADD COLUMN     "videos" JSONB[];
