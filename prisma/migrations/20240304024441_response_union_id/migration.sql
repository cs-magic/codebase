/*
  Warnings:

  - The primary key for the `Response` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Response` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Response" DROP CONSTRAINT "Response_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Response_pkey" PRIMARY KEY ("requestId", "appId");
