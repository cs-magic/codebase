/*
  Warnings:

  - Made the column `topP` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "App" ALTER COLUMN "topP" SET NOT NULL,
ALTER COLUMN "topP" SET DEFAULT 0.5;
