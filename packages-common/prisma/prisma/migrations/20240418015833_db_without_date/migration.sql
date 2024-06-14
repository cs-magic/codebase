/*
  Warnings:

  - Made the column `createdAt` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `WechatMessage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `WechatMessage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `WechatRoom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `WechatRoom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `WechatUser` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `WechatUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "WechatMessage" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "WechatRoom" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "WechatUser" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
