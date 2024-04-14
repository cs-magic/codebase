/*
  Warnings:

  - You are about to drop the column `wechatUserId` on the `WechatMessage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WechatMessage" DROP CONSTRAINT "WechatMessage_wechatUserId_fkey";

-- AlterTable
ALTER TABLE "WechatMessage" DROP COLUMN "wechatUserId";

-- AddForeignKey
ALTER TABLE "WechatMessage" ADD CONSTRAINT "WechatMessage_talkerId_fkey" FOREIGN KEY ("talkerId") REFERENCES "WechatUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
