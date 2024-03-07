/*
  Warnings:

  - Made the column `temperature` on table `App` required. This step will fail if there are existing NULL values in that column.
  - Made the column `frequencyPenalty` on table `App` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxTokens` on table `App` required. This step will fail if there are existing NULL values in that column.
  - Made the column `n` on table `App` required. This step will fail if there are existing NULL values in that column.
  - Made the column `presencePenalty` on table `App` required. This step will fail if there are existing NULL values in that column.
  - Made the column `streaming` on table `App` required. This step will fail if there are existing NULL values in that column.
  - Made the column `timeout` on table `App` required. This step will fail if there are existing NULL values in that column.
  - Made the column `topP` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "App" ALTER COLUMN "temperature" SET NOT NULL,
ALTER COLUMN "frequencyPenalty" SET NOT NULL,
ALTER COLUMN "maxTokens" SET NOT NULL,
ALTER COLUMN "n" SET NOT NULL,
ALTER COLUMN "presencePenalty" SET NOT NULL,
ALTER COLUMN "streaming" SET NOT NULL,
ALTER COLUMN "timeout" SET NOT NULL,
ALTER COLUMN "topP" SET NOT NULL;
