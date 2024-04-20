-- AlterTable
ALTER TABLE "WechatUser" ADD COLUMN     "chatbotEnabled" BOOLEAN DEFAULT false,
ADD COLUMN     "chatbotTopic" TEXT;
