/*
  Warnings:

  - The values [Room,Notification] on the enum `ConversationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_ConversationToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fromUserId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConversationType_new" AS ENUM ('LLM', 'chat', 'notification');
ALTER TABLE "Conversation" ALTER COLUMN "type" TYPE "ConversationType_new" USING ("type"::text::"ConversationType_new");
ALTER TYPE "ConversationType" RENAME TO "ConversationType_old";
ALTER TYPE "ConversationType_new" RENAME TO "ConversationType";
DROP TYPE "ConversationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_ConversationToUser" DROP CONSTRAINT "_ConversationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationToUser" DROP CONSTRAINT "_ConversationToUser_B_fkey";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "fromUserId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ConversationToUser";

-- CreateTable
CREATE TABLE "Company" (
    "appId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "logo" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("appId")
);

-- CreateTable
CREATE TABLE "ConversationModel" (
    "appId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "modelId" TEXT NOT NULL,
    "conversationId" TEXT,
    "prompt" TEXT,
    "temperature" DOUBLE PRECISION,

    CONSTRAINT "ConversationModel_pkey" PRIMARY KEY ("appId")
);

-- CreateTable
CREATE TABLE "Model" (
    "appId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "logo" TEXT,
    "url" TEXT,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("appId")
);

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("appId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationModel" ADD CONSTRAINT "ConversationModel_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("appId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationModel" ADD CONSTRAINT "ConversationModel_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("appId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("appId") ON DELETE CASCADE ON UPDATE CASCADE;
