/*
  Warnings:

  - A unique constraint covering the columns `[conclusionRequestId]` on the table `Conv` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Conv" ADD COLUMN     "conclusionRequestId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Conv_conclusionRequestId_key" ON "Conv"("conclusionRequestId");

-- AddForeignKey
ALTER TABLE "Conv" ADD CONSTRAINT "Conv_conclusionRequestId_fkey" FOREIGN KEY ("conclusionRequestId") REFERENCES "Request"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
