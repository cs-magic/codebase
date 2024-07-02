/*
  Warnings:

  - You are about to drop the `Summary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Summary" DROP CONSTRAINT "Summary_cardId_fkey";

-- DropTable
DROP TABLE "Summary";

-- CreateTable
CREATE TABLE "LlmResponse" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cardId" TEXT NOT NULL,
    "response" JSONB,

    CONSTRAINT "LlmResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LlmResponse" ADD CONSTRAINT "LlmResponse_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
