/*
  Warnings:

  - You are about to drop the column `conversationId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `toConversationId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "conversationId",
ADD COLUMN     "toConversationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_toConversationId_fkey" FOREIGN KEY ("toConversationId") REFERENCES "Conversation"("appId") ON DELETE RESTRICT ON UPDATE CASCADE;
