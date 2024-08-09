/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `WechatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WechatUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_roomId_fkey";

-- DropForeignKey
ALTER TABLE "WechatMessage" DROP CONSTRAINT "WechatMessage_listenerId_fkey";

-- DropForeignKey
ALTER TABLE "WechatMessage" DROP CONSTRAINT "WechatMessage_roomId_fkey";

-- DropForeignKey
ALTER TABLE "WechatMessage" DROP CONSTRAINT "WechatMessage_talkerId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "ownerId",
DROP COLUMN "roomId",
ADD COLUMN     "convId" TEXT;

-- DropTable
DROP TABLE "WechatRoom";

-- DropTable
DROP TABLE "WechatUser";

-- CreateTable
CREATE TABLE "WechatConv" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "friend" BOOLEAN,
    "gender" INTEGER,
    "type" INTEGER,
    "weixin" TEXT,
    "alias" TEXT,
    "city" TEXT,
    "province" TEXT,
    "signature" TEXT,
    "phone" TEXT[],
    "address" TEXT,
    "star" BOOLEAN,
    "adminIdList" TEXT[],
    "memberIdList" TEXT[],
    "topic" TEXT,
    "ownerId" TEXT,
    "preference" JSONB,
    "data" JSONB,

    CONSTRAINT "WechatConv_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_convId_fkey" FOREIGN KEY ("convId") REFERENCES "WechatConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WechatMessage" ADD CONSTRAINT "WechatMessage_talkerId_fkey" FOREIGN KEY ("talkerId") REFERENCES "WechatConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WechatMessage" ADD CONSTRAINT "WechatMessage_listenerId_fkey" FOREIGN KEY ("listenerId") REFERENCES "WechatConv"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WechatMessage" ADD CONSTRAINT "WechatMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "WechatConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
