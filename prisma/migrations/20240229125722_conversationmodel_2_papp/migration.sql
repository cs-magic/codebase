/*
  Warnings:

  - You are about to drop the `ConversationModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConversationModel" DROP CONSTRAINT "ConversationModel_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "ConversationModel" DROP CONSTRAINT "ConversationModel_modelId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationModelId_fkey";

-- DropTable
DROP TABLE "ConversationModel";

-- CreateTable
CREATE TABLE "PApp" (
    "appId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "modelId" TEXT NOT NULL,
    "prompt" TEXT,
    "temperature" DOUBLE PRECISION,

    CONSTRAINT "PApp_pkey" PRIMARY KEY ("appId")
);

-- CreateTable
CREATE TABLE "_ConversationToPApp" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationToPApp_AB_unique" ON "_ConversationToPApp"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationToPApp_B_index" ON "_ConversationToPApp"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationModelId_fkey" FOREIGN KEY ("conversationModelId") REFERENCES "PApp"("appId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PApp" ADD CONSTRAINT "PApp_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("appId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToPApp" ADD CONSTRAINT "_ConversationToPApp_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("appId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToPApp" ADD CONSTRAINT "_ConversationToPApp_B_fkey" FOREIGN KEY ("B") REFERENCES "PApp"("appId") ON DELETE CASCADE ON UPDATE CASCADE;
