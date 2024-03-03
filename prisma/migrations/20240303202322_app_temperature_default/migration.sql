/*
  Warnings:

  - Made the column `temperature` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "App" ALTER COLUMN "temperature" SET NOT NULL,
ALTER COLUMN "temperature" SET DEFAULT 0.7;
