/*
  Warnings:

  - You are about to drop the `ConvTitleResponse` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[convId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `convId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConvTitleResponse" DROP CONSTRAINT "ConvTitleResponse_convId_fkey";

-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "convId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ConvTitleResponse";

-- CreateIndex
CREATE UNIQUE INDEX "Response_convId_key" ON "Response"("convId");

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_convId_fkey" FOREIGN KEY ("convId") REFERENCES "Conv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
