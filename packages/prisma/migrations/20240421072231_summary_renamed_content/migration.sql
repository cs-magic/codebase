/*
  Warnings:

  - You are about to drop the column `contentSummary` on the `Summary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Summary" DROP COLUMN "contentSummary",
ADD COLUMN     "content" JSONB;
