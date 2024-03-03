/*
  Warnings:

  - You are about to drop the column `userId` on the `QueryConfig` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `QueryConv` table. All the data in the column will be lost.
  - Added the required column `fromUserId` to the `QueryConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formUserId` to the `QueryConv` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QueryConfig" DROP CONSTRAINT "QueryConfig_userId_fkey";

-- DropForeignKey
ALTER TABLE "QueryConv" DROP CONSTRAINT "QueryConv_userId_fkey";

-- AlterTable
ALTER TABLE "QueryConfig" DROP COLUMN "userId",
ADD COLUMN     "fromUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QueryConv" DROP COLUMN "userId",
ADD COLUMN     "formUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QueryConfig" ADD CONSTRAINT "QueryConfig_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueryConv" ADD CONSTRAINT "QueryConv_formUserId_fkey" FOREIGN KEY ("formUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
