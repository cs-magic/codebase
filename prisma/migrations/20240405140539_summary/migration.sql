/*
  Warnings:

  - You are about to drop the column `model` on the `Card` table. All the data in the column will be lost.
  - The `contentSummary` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "model",
DROP COLUMN "contentSummary",
ADD COLUMN     "contentSummary" JSONB;
