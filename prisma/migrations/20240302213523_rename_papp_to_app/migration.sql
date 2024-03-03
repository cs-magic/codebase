/*
  Warnings:

  - You are about to drop the `PApp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ConversationToPApp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_pAppId_fkey";

-- DropForeignKey
ALTER TABLE "PApp" DROP CONSTRAINT "PApp_modelId_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationToPApp" DROP CONSTRAINT "_ConversationToPApp_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationToPApp" DROP CONSTRAINT "_ConversationToPApp_B_fkey";

-- DropTable
DROP TABLE "PApp";

-- DropTable
DROP TABLE "_ConversationToPApp";

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "modelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "prompt" TEXT,
    "temperature" DOUBLE PRECISION,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AppToConversation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AppToConversation_AB_unique" ON "_AppToConversation"("A", "B");

-- CreateIndex
CREATE INDEX "_AppToConversation_B_index" ON "_AppToConversation"("B");

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_pAppId_fkey" FOREIGN KEY ("pAppId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToConversation" ADD CONSTRAINT "_AppToConversation_A_fkey" FOREIGN KEY ("A") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToConversation" ADD CONSTRAINT "_AppToConversation_B_fkey" FOREIGN KEY ("B") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
