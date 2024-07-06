/*
  Warnings:

  - You are about to drop the column `chatbotEnabled` on the `WechatRoom` table. All the data in the column will be lost.
  - You are about to drop the column `chatbotTopic` on the `WechatRoom` table. All the data in the column will be lost.
  - You are about to drop the column `uniParserEnabled` on the `WechatRoom` table. All the data in the column will be lost.
  - You are about to drop the column `chatbotEnabled` on the `WechatUser` table. All the data in the column will be lost.
  - You are about to drop the column `chatbotTopic` on the `WechatUser` table. All the data in the column will be lost.
  - You are about to drop the column `uniParserEnabled` on the `WechatUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WechatRoom" DROP COLUMN "chatbotEnabled",
DROP COLUMN "chatbotTopic",
DROP COLUMN "uniParserEnabled";

-- AlterTable
ALTER TABLE "WechatUser" DROP COLUMN "chatbotEnabled",
DROP COLUMN "chatbotTopic",
DROP COLUMN "uniParserEnabled";
