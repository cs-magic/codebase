/*
  Warnings:

  - Made the column `openAIApiKey` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "App" ALTER COLUMN "openAIApiKey" SET NOT NULL,
ALTER COLUMN "openAIApiKey" SET DEFAULT '';
