/*
  Warnings:

  - You are about to drop the column `conversationId` on the `QueryRequest` table. All the data in the column will be lost.
  - You are about to drop the `QueryConversation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `convId` to the `QueryRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QueryConversation" DROP CONSTRAINT "QueryConversation_userId_fkey";

-- DropForeignKey
ALTER TABLE "QueryRequest" DROP CONSTRAINT "QueryRequest_conversationId_fkey";

-- AlterTable
ALTER TABLE "QueryRequest" DROP COLUMN "conversationId",
ADD COLUMN     "convId" TEXT NOT NULL;

-- DropTable
DROP TABLE "QueryConversation";

-- CreateTable
CREATE TABLE "QueryConv" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,

    CONSTRAINT "QueryConv_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QueryConv" ADD CONSTRAINT "QueryConv_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueryRequest" ADD CONSTRAINT "QueryRequest_convId_fkey" FOREIGN KEY ("convId") REFERENCES "QueryConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
