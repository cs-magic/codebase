-- AlterTable
ALTER TABLE "WechatArticle" ADD COLUMN     "platformUserId" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "PlatformUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "platform" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,

    CONSTRAINT "PlatformUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WechatArticle" ADD CONSTRAINT "WechatArticle_platformUserId_fkey" FOREIGN KEY ("platformUserId") REFERENCES "PlatformUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
