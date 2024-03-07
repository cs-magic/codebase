/*
  Warnings:

  - You are about to drop the column `title` on the `Conv` table. All the data in the column will be lost.
  - You are about to drop the column `convId` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `response` on the `Response` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_convId_fkey";

-- DropIndex
DROP INDEX "Response_convId_key";

-- DropIndex
DROP INDEX "Response_convId_requestId_appId_key";

-- AlterTable
ALTER TABLE "Conv" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "convId",
DROP COLUMN "response",
ADD COLUMN     "content" TEXT;

-- CreateTable
CREATE TABLE "ConvTitleResponse" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "convId" TEXT NOT NULL,
    "content" TEXT,
    "error" TEXT,
    "tTrigger" TIMESTAMP(3),
    "tStart" TIMESTAMP(3),
    "tEnd" TIMESTAMP(3),

    CONSTRAINT "ConvTitleResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConvTitleResponse_convId_key" ON "ConvTitleResponse"("convId");

-- CreateIndex
CREATE INDEX "Response_requestId_appId_idx" ON "Response"("requestId", "appId");

-- AddForeignKey
ALTER TABLE "ConvTitleResponse" ADD CONSTRAINT "ConvTitleResponse_convId_fkey" FOREIGN KEY ("convId") REFERENCES "Conv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
