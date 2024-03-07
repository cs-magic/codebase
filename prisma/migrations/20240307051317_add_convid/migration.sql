/*
  Warnings:

  - You are about to drop the column `conclusionRequestId` on the `Conv` table. All the data in the column will be lost.
  - The primary key for the `Response` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[convId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Response` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Conv" DROP CONSTRAINT "Conv_conclusionRequestId_fkey";

-- DropIndex
DROP INDEX "Conv_conclusionRequestId_key";

-- AlterTable
ALTER TABLE "Conv" DROP COLUMN "conclusionRequestId";

-- AlterTable
ALTER TABLE "Response" DROP CONSTRAINT "Response_pkey",
ADD COLUMN     "convId" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "appId" DROP NOT NULL,
ADD CONSTRAINT "Response_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Response_convId_key" ON "Response"("convId");

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_convId_fkey" FOREIGN KEY ("convId") REFERENCES "Conv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
