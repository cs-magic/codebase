/*
  Warnings:

  - You are about to drop the column `formUserId` on the `QueryConv` table. All the data in the column will be lost.
  - Added the required column `fromUserId` to the `QueryConv` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QueryConv" DROP CONSTRAINT "QueryConv_formUserId_fkey";

-- AlterTable
ALTER TABLE "QueryConv" DROP COLUMN "formUserId",
ADD COLUMN     "fromUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QueryConv" ADD CONSTRAINT "QueryConv_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
