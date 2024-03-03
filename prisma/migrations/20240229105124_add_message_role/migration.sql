/*
  Warnings:

  - You are about to drop the column `fromUserId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `toConversationId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `conversationModelId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('user', 'assistant', 'system');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_toConversationId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "fromUserId",
DROP COLUMN "toConversationId",
ADD COLUMN     "conversationModelId" TEXT NOT NULL,
ADD COLUMN     "role" "MessageRole" NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationModelId_fkey" FOREIGN KEY ("conversationModelId") REFERENCES "ConversationModel"("appId") ON DELETE CASCADE ON UPDATE CASCADE;
