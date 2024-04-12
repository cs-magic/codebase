-- DropForeignKey
ALTER TABLE "WechatMessage" DROP CONSTRAINT "WechatMessage_listenerId_fkey";

-- AlterTable
ALTER TABLE "WechatMessage" ALTER COLUMN "listenerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WechatMessage" ADD CONSTRAINT "WechatMessage_listenerId_fkey" FOREIGN KEY ("listenerId") REFERENCES "WechatUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
