/*
  Warnings:

  - Made the column `frequencyPenalty` on table `App` required. This step will fail if there are existing NULL values in that column.
  - Made the column `presencePenalty` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "App" ALTER COLUMN "frequencyPenalty" SET NOT NULL,
ALTER COLUMN "frequencyPenalty" SET DEFAULT 0,
ALTER COLUMN "presencePenalty" SET NOT NULL,
ALTER COLUMN "presencePenalty" SET DEFAULT 0;
