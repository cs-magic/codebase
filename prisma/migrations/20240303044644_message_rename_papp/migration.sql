/*
  Warnings:

  - You are about to drop the column `pAppId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_pAppId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "pAppId",
ADD COLUMN     "appId" TEXT;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;
