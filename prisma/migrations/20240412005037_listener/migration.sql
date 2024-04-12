/*
  Warnings:

  - Added the required column `wechatUserId` to the `WechatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WechatMessage" ADD COLUMN     "wechatUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WechatMessage" ADD CONSTRAINT "WechatMessage_wechatUserId_fkey" FOREIGN KEY ("wechatUserId") REFERENCES "WechatUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
