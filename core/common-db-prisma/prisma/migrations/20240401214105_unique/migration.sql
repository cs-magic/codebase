/*
  Warnings:

  - A unique constraint covering the columns `[platformType,platformId]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Card_platformType_platformId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Card_platformType_platformId_key" ON "Card"("platformType", "platformId");
