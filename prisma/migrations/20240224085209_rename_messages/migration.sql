/*
  Warnings:

  - You are about to drop the `ChatMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatRoomToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ConversationType" AS ENUM ('LLM', 'Room', 'Notification');

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_chatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ChatRoomToUser" DROP CONSTRAINT "_ChatRoomToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatRoomToUser" DROP CONSTRAINT "_ChatRoomToUser_B_fkey";

-- DropTable
DROP TABLE "ChatMessage";

-- DropTable
DROP TABLE "ChatRoom";

-- DropTable
DROP TABLE "_ChatRoomToUser";

-- CreateTable
CREATE TABLE "Conversation" (
    "appId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "ConversationType" NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("appId")
);

-- CreateTable
CREATE TABLE "Message" (
    "appId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("appId")
);

-- CreateTable
CREATE TABLE "_ConversationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationToUser_AB_unique" ON "_ConversationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationToUser_B_index" ON "_ConversationToUser"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("appId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("appId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD CONSTRAINT "_ConversationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("appId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD CONSTRAINT "_ConversationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("appId") ON DELETE CASCADE ON UPDATE CASCADE;
