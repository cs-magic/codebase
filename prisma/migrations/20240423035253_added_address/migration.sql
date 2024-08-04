-- AlterTable
ALTER TABLE "WechatUser" ADD COLUMN     "address" TEXT,
ALTER COLUMN "avatar" DROP NOT NULL;
