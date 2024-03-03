/*
  Warnings:

  - You are about to drop the `QueryConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QueryConv` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QueryRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QueryResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QueryConfig" DROP CONSTRAINT "QueryConfig_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "QueryConfig" DROP CONSTRAINT "QueryConfig_modelId_fkey";

-- DropForeignKey
ALTER TABLE "QueryConv" DROP CONSTRAINT "QueryConv_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "QueryRequest" DROP CONSTRAINT "QueryRequest_convId_fkey";

-- DropForeignKey
ALTER TABLE "QueryResponse" DROP CONSTRAINT "QueryResponse_configId_fkey";

-- DropForeignKey
ALTER TABLE "QueryResponse" DROP CONSTRAINT "QueryResponse_requestId_fkey";

-- DropTable
DROP TABLE "QueryConfig";

-- DropTable
DROP TABLE "QueryConv";

-- DropTable
DROP TABLE "QueryRequest";

-- DropTable
DROP TABLE "QueryResponse";

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "title" TEXT,
    "modelId" TEXT NOT NULL,
    "systemPrompt" TEXT,
    "temperature" DOUBLE PRECISION,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conv" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "title" TEXT,

    CONSTRAINT "Conv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "context" JSONB NOT NULL,
    "convId" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestId" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "response" TEXT,
    "error" TEXT,
    "tTrigger" TIMESTAMP(3),
    "tStart" TIMESTAMP(3),
    "tEnd" TIMESTAMP(3),

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conv" ADD CONSTRAINT "Conv_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_convId_fkey" FOREIGN KEY ("convId") REFERENCES "Conv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;
