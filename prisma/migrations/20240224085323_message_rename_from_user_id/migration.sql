/*
  Warnings:

  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `fromUserId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "userId",
ADD COLUMN     "fromUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("appId") ON DELETE CASCADE ON UPDATE CASCADE;
