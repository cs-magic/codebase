-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "roomId" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "WechatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
