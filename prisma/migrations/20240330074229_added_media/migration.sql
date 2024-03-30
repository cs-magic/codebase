-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('image', 'video', 'iFrame');

-- AlterTable
ALTER TABLE "WechatArticle" ADD COLUMN     "coverId" TEXT;

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 320,
    "height" INTEGER NOT NULL DEFAULT 240,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WechatArticle" ADD CONSTRAINT "WechatArticle_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
