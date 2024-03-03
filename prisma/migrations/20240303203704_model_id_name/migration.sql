/*
  Warnings:

  - You are about to drop the column `modelId` on the `App` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_modelId_fkey";

-- AlterTable
ALTER TABLE "App" DROP COLUMN "modelId",
ALTER COLUMN "modelName" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_modelName_fkey" FOREIGN KEY ("modelName") REFERENCES "Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;
