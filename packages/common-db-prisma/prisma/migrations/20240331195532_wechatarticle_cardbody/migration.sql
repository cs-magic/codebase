/*
  Warnings:

  - You are about to drop the `WechatArticle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_bodyId_fkey";

-- DropTable
DROP TABLE "WechatArticle";

-- CreateTable
CREATE TABLE "CardBody" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "platform" JSONB NOT NULL,
    "sourceUrl" TEXT,
    "author" JSONB,
    "time" TIMESTAMP(3),
    "title" TEXT,
    "cover" JSONB,
    "images" JSONB[],
    "iFrames" JSONB[],
    "videos" JSONB[],
    "contentMd" TEXT,
    "summary" JSONB,
    "stat" JSONB,

    CONSTRAINT "CardBody_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_bodyId_fkey" FOREIGN KEY ("bodyId") REFERENCES "CardBody"("id") ON DELETE CASCADE ON UPDATE CASCADE;
