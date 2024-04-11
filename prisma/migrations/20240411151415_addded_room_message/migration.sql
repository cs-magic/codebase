/*
  Warnings:

  - Added the required column `avatar` to the `WechatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `WechatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `WechatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alias` to the `WechatUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `WechatUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friend` to the `WechatUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `WechatUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `WechatUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `WechatUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `WechatUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weixin` to the `WechatUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WechatRoom" ADD COLUMN     "adminIdList" TEXT[],
ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "memberIdList" TEXT[],
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WechatUser" ADD COLUMN     "alias" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "friend" BOOLEAN NOT NULL,
ADD COLUMN     "gender" INTEGER NOT NULL,
ADD COLUMN     "phone" TEXT[],
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "signature" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL,
ADD COLUMN     "weixin" TEXT NOT NULL;
