-- CreateTable
CREATE TABLE "WechatRoom" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "chatbotTopic" TEXT,

    CONSTRAINT "WechatRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WechatMessage" ADD CONSTRAINT "WechatMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "WechatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
