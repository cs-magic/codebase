/*
  Warnings:

  - A unique constraint covering the columns `[convId,requestId,appId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Response_convId_requestId_appId_key" ON "Response"("convId", "requestId", "appId");
