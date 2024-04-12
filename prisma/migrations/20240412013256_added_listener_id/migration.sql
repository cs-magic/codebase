/*
  Warnings:

  - You are about to drop the column `wechatUserId` on the `WechatMessage` table. All the data in the column will be lost.
  - Added the required column `listenerId` to the `WechatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WechatMessage" DROP CONSTRAINT "WechatMessage_wechatUserId_fkey";

-- AlterTable
ALTER TABLE "WechatMessage" DROP COLUMN "wechatUserId",
ADD COLUMN     "listenerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WechatMessage" ADD CONSTRAINT "WechatMessage_listenerId_fkey" FOREIGN KEY ("listenerId") REFERENCES "WechatUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
