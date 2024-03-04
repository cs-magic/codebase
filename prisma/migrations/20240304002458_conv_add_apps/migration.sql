-- CreateTable
CREATE TABLE "_AppToConv" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AppToConv_AB_unique" ON "_AppToConv"("A", "B");

-- CreateIndex
CREATE INDEX "_AppToConv_B_index" ON "_AppToConv"("B");

-- AddForeignKey
ALTER TABLE "_AppToConv" ADD CONSTRAINT "_AppToConv_A_fkey" FOREIGN KEY ("A") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToConv" ADD CONSTRAINT "_AppToConv_B_fkey" FOREIGN KEY ("B") REFERENCES "Conv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
