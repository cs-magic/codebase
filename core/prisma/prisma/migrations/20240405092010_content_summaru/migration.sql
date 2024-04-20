/*
  Warnings:

  - You are about to drop the column `summary` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "summary",
ADD COLUMN     "contentSummary" TEXT;
