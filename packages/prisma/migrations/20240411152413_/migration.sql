/*
  Warnings:

  - Made the column `text` on table `WechatMessage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WechatMessage" ALTER COLUMN "text" SET NOT NULL;
