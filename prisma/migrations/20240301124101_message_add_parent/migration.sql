-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Message"("appId") ON DELETE CASCADE ON UPDATE CASCADE;
