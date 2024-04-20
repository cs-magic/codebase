-- AlterTable
ALTER TABLE "WechatRoom" ADD COLUMN     "uniParserEnabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "WechatUser" ADD COLUMN     "uniParserEnabled" BOOLEAN DEFAULT false;
