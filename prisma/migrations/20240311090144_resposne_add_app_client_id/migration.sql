/*
  Warnings:

  - Added the required column `appClientId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "appClientId" TEXT NOT NULL;
