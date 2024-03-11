-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "interruptedAt" TIMESTAMP(3),
ADD COLUMN     "isDraft" BOOLEAN DEFAULT false;
