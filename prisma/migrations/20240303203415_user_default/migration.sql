/*
  Warnings:

  - Made the column `user` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "App" ALTER COLUMN "user" SET NOT NULL,
ALTER COLUMN "user" SET DEFAULT '';
