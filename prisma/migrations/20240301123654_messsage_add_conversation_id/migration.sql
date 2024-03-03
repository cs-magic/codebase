/*
  Warnings:

  - Added the required column `conversationId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "conversationId" TEXT NOT NULL,
ALTER COLUMN "pAppId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("appId") ON DELETE CASCADE ON UPDATE CASCADE;
