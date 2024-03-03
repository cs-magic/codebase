/*
  Warnings:

  - You are about to drop the column `fromUserId` on the `App` table. All the data in the column will be lost.
  - Made the column `user` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_fromUserId_fkey";

-- AlterTable
ALTER TABLE "App" DROP COLUMN "fromUserId",
ALTER COLUMN "user" SET NOT NULL,
ALTER COLUMN "user" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
