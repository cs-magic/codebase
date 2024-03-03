/*
  Warnings:

  - Made the column `maxTokens` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "App" ALTER COLUMN "maxTokens" SET NOT NULL,
ALTER COLUMN "maxTokens" SET DEFAULT 4096;
