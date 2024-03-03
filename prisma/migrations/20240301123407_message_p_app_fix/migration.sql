/*
  Warnings:

  - You are about to drop the column `conversationModelId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `pAppId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationModelId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "conversationModelId",
ADD COLUMN     "pAppId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_pAppId_fkey" FOREIGN KEY ("pAppId") REFERENCES "PApp"("appId") ON DELETE CASCADE ON UPDATE CASCADE;
