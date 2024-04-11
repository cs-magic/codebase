-- CreateTable
CREATE TABLE "WechatMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "talkerId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,
    "mentionIdList" TEXT[],
    "wechatUserId" TEXT NOT NULL,

    CONSTRAINT "WechatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WechatUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "WechatUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WechatMessage" ADD CONSTRAINT "WechatMessage_wechatUserId_fkey" FOREIGN KEY ("wechatUserId") REFERENCES "WechatUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
