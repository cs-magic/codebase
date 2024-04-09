/*
  Warnings:

  - The `contentSummary` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "contentSummary",
ADD COLUMN     "contentSummary" JSONB;
