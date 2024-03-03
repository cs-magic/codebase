-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "logo" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "logo" TEXT,
    "url" TEXT,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueryConfig" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "modelId" TEXT NOT NULL,
    "systemPrompt" TEXT,
    "temperature" DOUBLE PRECISION,

    CONSTRAINT "QueryConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueryConversation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,

    CONSTRAINT "QueryConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueryRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "context" JSONB NOT NULL,
    "conversationId" TEXT NOT NULL,

    CONSTRAINT "QueryRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueryResponse" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestId" TEXT NOT NULL,
    "configId" TEXT NOT NULL,
    "response" TEXT,
    "error" TEXT,
    "tTrigger" TIMESTAMP(3),
    "tStart" TIMESTAMP(3),
    "tEnd" TIMESTAMP(3),

    CONSTRAINT "QueryResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueryConfig" ADD CONSTRAINT "QueryConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueryConfig" ADD CONSTRAINT "QueryConfig_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueryConversation" ADD CONSTRAINT "QueryConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueryRequest" ADD CONSTRAINT "QueryRequest_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "QueryConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueryResponse" ADD CONSTRAINT "QueryResponse_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "QueryRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueryResponse" ADD CONSTRAINT "QueryResponse_configId_fkey" FOREIGN KEY ("configId") REFERENCES "QueryConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
