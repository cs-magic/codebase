-- CreateTable
CREATE TABLE "WechatArticle" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "contentHtml" TEXT,
    "contentMd" TEXT,
    "contentSummary" TEXT,
    "stat" JSONB,
    "comments" JSONB[],

    CONSTRAINT "WechatArticle_pkey" PRIMARY KEY ("id")
);
