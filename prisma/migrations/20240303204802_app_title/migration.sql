/*
  Warnings:

  - Made the column `title` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "App" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT '未命名';
